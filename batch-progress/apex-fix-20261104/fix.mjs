// apex-fix-20261104：沖至《しらさぎ》升異端、楊祖珺《楊祖珺》恢復流亡。
//   node batch-progress/apex-fix-20261104/fix.mjs before|catalog|catalog-verify|kv-bulk|kv-verify
import fs from 'node:fs';
const D='batch-progress/apex-fix-20261104';
const ACC='3a23f905e8f31d91c85050f2ed304321',NS='5f65e74b17d644b68a3f542b08a5c105';
const F='https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const KEY='AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const CARDS=[
 {key:'沖至|しらさぎ',tier:'heresy',classic:4,obscurity:4,accessibility:5},
 {key:'楊祖珺|楊祖珺',tier:'pearl',classic:4,obscurity:5,accessibility:2},
];
const rar=(c,o,x)=>{const s=c+x+(o>=5?1:0);return s>=9?'legendary':s>=8?'epic':s>=7?'uncommon':s>=6?'rare':'common';};
const idOf=k=>k.toLowerCase().replace(/\//g,'-').trim();
const lk=k=>k.toLowerCase();
async function bulkGet(ks){const j=await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`,{method:'POST',headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({keys:ks})})).json();if(!j.success)throw new Error(JSON.stringify(j.errors));return j.result.values;}
const cmd=process.argv[2];
if(cmd==='before'){
 const ks=CARDS.flatMap(c=>['desc2:'+lk(c.key),'desc4:'+lk(c.key)]);const v=await bulkGet(ks);
 const cat={};for(const c of CARDS){cat[c.key]=(await (await fetch(F+encodeURIComponent(idOf(c.key))+'?key='+KEY)).json()).fields;}
 fs.writeFileSync(`${D}/before.json`,JSON.stringify({kv:ks.map(k=>({key:k,value:v[k]??null})),cardCatalog:cat},null,1));
 console.log(JSON.stringify(ks.map(k=>[k,v[k]]),null,1));for(const k in cat)console.log(k,JSON.stringify(cat[k]));
}
if(cmd==='catalog'||cmd==='catalog-verify'){let bad=0;
 for(const c of CARDS){const fields={tier:{stringValue:c.tier},apex:{booleanValue:true},classic:{integerValue:String(c.classic)},obscurity:{integerValue:String(c.obscurity)},accessibility:{integerValue:String(c.accessibility)},rarity:{stringValue:rar(c.classic,c.obscurity,c.accessibility)}};
  if(cmd==='catalog-verify'){const f=(await (await fetch(F+encodeURIComponent(idOf(c.key))+'?key='+KEY)).json()).fields||{};const ok=Object.entries(fields).every(([k,v])=>JSON.stringify(f[k])===JSON.stringify(v));console.log(ok?'✓':'✗',c.key,JSON.stringify(Object.fromEntries(Object.keys(fields).map(k=>[k,f[k]]))));if(!ok)bad++;continue;}
  const u=`${F}${encodeURIComponent(idOf(c.key))}?${Object.keys(fields).map(m=>'updateMask.fieldPaths='+m).join('&')}&currentDocument.exists=true&key=${KEY}`;
  const r=await fetch(u,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields})});console.log(r.ok?'✓':'✗ '+r.status+' '+(await r.text()).slice(0,200),c.key);if(!r.ok)bad++;}
 process.exit(bad?1:0);}
const puts=()=>{const b=new Map(JSON.parse(fs.readFileSync(`${D}/before.json`,'utf8')).kv.map(x=>[x.key,x.value]));const out=JSON.parse(fs.readFileSync(`${D}/desc.json`,'utf8'));
 return CARDS.flatMap(c=>{const v=JSON.stringify({desc:out[c.key]});const p=[{key:'desc2:'+lk(c.key),value:v}];if(b.get('desc4:'+lk(c.key))!=null)p.push({key:'desc4:'+lk(c.key),value:v});return p;});};
if(cmd==='kv-bulk'){const p=puts();fs.mkdirSync('publish-stage',{recursive:true});fs.writeFileSync('publish-stage/kv-apex-fix-20261104.json',JSON.stringify(p));console.log(p.length,'鍵',p.map(x=>x.key).join(' '));}
if(cmd==='kv-verify'){const p=puts();const v=await bulkGet(p.map(x=>x.key));let ok=0;for(const x of p){if(v[x.key]===x.value)ok++;else console.log('不符',x.key);}console.log(`回讀 ${ok}/${p.length}`);process.exit(ok===p.length?0:1);}
