// ax9u 升格：card_catalog 寫 tier=heresy、apex=true、accessibility=5、rarity（依新三軸重算）。PATCH＋exists=true。
//   node batch-progress/add-20261104-ax9/ax9u-catalog.mjs [--dry|--verify]
import fs from 'node:fs';
const F='https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const KEY='AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const keys=JSON.parse(fs.readFileSync('batch-progress/add-20261104-ax9/upgrade-final.json','utf8'));
const seed=JSON.parse(fs.readFileSync('seed_cards.json','utf8'));
const rar=(c,o,x)=>{const s=c+x+(o>=5?1:0);return s>=9?'legendary':s>=8?'epic':s>=7?'uncommon':s>=6?'rare':'common';};
const idOf=k=>k.toLowerCase().replace(/\//g,'-').trim();
const P=keys.map(k=>{const r=seed.find(x=>x[0]+'|'+x[1]===k);return {key:k,docId:idOf(k),fields:{tier:{stringValue:'heresy'},apex:{booleanValue:true},accessibility:{integerValue:'5'},rarity:{stringValue:rar(r[2],r[3],5)}}};});
fs.mkdirSync('publish-stage',{recursive:true});fs.writeFileSync('publish-stage/card-catalog-ax9u.json',JSON.stringify(P,null,1));
if(process.argv.includes('--dry')){console.log(P.map(p=>p.key+' '+p.fields.rarity.stringValue).join('\n'));process.exit(0);}
let bad=0;
for(const p of P){
 if(process.argv.includes('--verify')){const d=await (await fetch(F+encodeURIComponent(p.docId)+'?key='+KEY)).json();const f=d.fields||{};const ok=f.tier?.stringValue==='heresy'&&f.apex?.booleanValue===true&&f.accessibility?.integerValue==='5'&&f.rarity?.stringValue===p.fields.rarity.stringValue;console.log(ok?'✓':'✗',p.key);if(!ok)bad++;continue;}
 const u=`${F}${encodeURIComponent(p.docId)}?${Object.keys(p.fields).map(m=>'updateMask.fieldPaths='+m).join('&')}&currentDocument.exists=true&key=${KEY}`;
 const r=await fetch(u,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:p.fields})});
 console.log(r.ok?'✓':'✗ '+r.status+' '+(await r.text()).slice(0,120),p.key);if(!r.ok)bad++;
}
process.exit(bad?1:0);
