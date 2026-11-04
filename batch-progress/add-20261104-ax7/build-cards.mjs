// ax7 升格候選卡單：從 seed 取三軸，從 KV 取現行 desc2。  node batch-progress/add-20261104-ax7/build-cards.mjs
import fs from 'node:fs';
const ACC='3a23f905e8f31d91c85050f2ed304321',NS='5f65e74b17d644b68a3f542b08a5c105';
const seed=JSON.parse(fs.readFileSync('seed_cards.json','utf8'));
const groups=JSON.parse(fs.readFileSync('batch-progress/add-20261104-ax7/candidates.json','utf8'));
const keys=groups.flatMap(g=>g.keys);
const lk=k=>k.toLowerCase();
const j=await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`,{method:'POST',headers:{Authorization:'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({keys:keys.map(k=>'desc2:'+lk(k))})})).json();
if(!j.success)throw new Error(JSON.stringify(j.errors));
const out=[];
for(const g of groups)for(const k of g.keys){const r=seed.find(x=>x[0]+'|'+x[1]===k);if(!r)throw new Error('seed 無 '+k);if(r[8])throw new Error('已有 tier '+k);
 let d=j.result.values['desc2:'+lk(k)];try{d=JSON.parse(d).desc}catch{}
 out.push({key:k,artist:r[0],album:r[1],year:r[6],group:g.group,pickOne:g.keys.length>1,tier:'heresy-candidate',genres:r[5],axes:{classic:r[2],obscurity:r[3],accessibility:r[4]},currentDesc:d??null});}
fs.writeFileSync('desc-tools/batches/cards/ax7u-cards.json',JSON.stringify(out,null,1));
console.log(out.length,'張；無舊簡介',out.filter(x=>!x.currentDesc).map(x=>x.key));
