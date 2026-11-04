// ax10 新卡：card_catalog 補 tier=heresy、apex=true（publish-manifest 的 patch 不含頂點欄）。node … [--verify]
import fs from 'node:fs';
const F='https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const KEY='AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const m=JSON.parse(fs.readFileSync('onboarding-manifest-add-20261104-ax10-20261104.json','utf8'));
const idOf=k=>k.toLowerCase().replace(/\//g,'-').trim();
let bad=0;
for(const a of m.albums){ if(!a.apexAssessment.eligible) continue; const tier=a.apexAssessment.tier; const id=idOf(a.artist+'|'+a.album);
 if(process.argv.includes('--verify')){const d=await (await fetch(F+encodeURIComponent(id)+'?key='+KEY)).json();const f=d.fields||{};const ok=f.tier?.stringValue===tier&&f.apex?.booleanValue===true;console.log(ok?'✓':'✗',id,f.rarity?.stringValue,f.accessibility?.integerValue);if(!ok)bad++;continue;}
 const r=await fetch(`${F}${encodeURIComponent(id)}?updateMask.fieldPaths=tier&updateMask.fieldPaths=apex&currentDocument.exists=true&key=${KEY}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:{tier:{stringValue:tier},apex:{booleanValue:true}}})});
 console.log(r.ok?'✓':'✗ '+r.status,id);if(!r.ok)bad++;}
process.exit(bad?1:0);
