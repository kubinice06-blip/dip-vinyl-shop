import fs from 'node:fs';
const SP=process.argv[2];
const norm=s=>String(s||"").toLowerCase().replace(/[‐-―－]/g,"-").normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");
const pool=new Set(fs.readFileSync("batch-progress/pool-data/pool-all-keys-normalized.txt","utf8").split("\n"));
const removed=new Set(JSON.parse(fs.readFileSync("data/pool-removed.json","utf8")).entries.map(e=>e.key));
const bad=/\b(live|remix(es)?|edits?|mix(ed)?|compilation|collection|best of|anthology|vol\.?\s*\d|volume|selections|sampler|reworks?|ep|deluxe|instrumentals|beat ?tape|soundtrack|ost|presents|remastered|anniversary)\b/i;
const files=["downtempo-top","downtempo_trip-hop","downtempo_chillout","downtempo_ambient","downtempo_electronica","downtempo_jazz"];
const map=new Map();const dubOnly=new Set(JSON.parse(fs.readFileSync(SP+"/bc/downtempo_dub.json","utf8")).map(r=>norm(r.artist)+"|"+norm(r.album)));
let st={pool:0,removed:0,bad:0,va:0};
for(const f of files){const tag=f.replace("downtempo_","").replace("downtempo-top","downtempo");
 JSON.parse(fs.readFileSync(`${SP}/bc/${f}.json`,"utf8")).forEach((r,i)=>{const k=norm(r.artist)+"|"+norm(r.album);
  if(map.has(k)){map.get(k).tags.push(tag);return}
  if(pool.has(k)){st.pool++;return} if(removed.has(k)){st.removed++;return}
  if(/various|^v\/?a$|^va$/i.test(r.artist)){st.va++;return} if(bad.test(r.album)){st.bad++;return}
  map.set(k,{...r,key:k,tags:[tag],rank:i,dubTag:dubOnly.has(k)})})}
const out=[...map.values()];console.log(st,"cand",out.length);
fs.writeFileSync(SP+"/bc/cand-all.json",JSON.stringify(out,null,1));
