import fs from 'node:fs';
const SP=process.argv[2];
const norm=s=>String(s||"").toLowerCase().replace(/[‐-―－]/g,"-").normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu,"");
const pool=new Set(fs.readFileSync("batch-progress/pool-data/pool-all-keys-normalized.txt","utf8").split("\n"));
const removed=new Set(JSON.parse(fs.readFileSync("data/pool-removed.json","utf8")).entries.map(e=>e.key));
const bad=/\b(live|remix(es)?|edits?|mix(ed)?|compilation|collection|best of|anthology|vol\.?\s*\d|volume|selections|sampler|reworks?|ep|deluxe|instrumentals|beat ?tape|soundtrack|ost|presents|remastered|anniversary)\b/i;
const old=new Map(JSON.parse(fs.readFileSync(SP+"/bc/cand-ranked.json","utf8")).map(r=>[r.key,r]));
const map=new Map();let st={pool:0,removed:0,bad:0,va:0,old:0};
for(const f of fs.readdirSync(SP+"/bc/r2")){const tag=f.replace(".json","").replace("downtempo-deep","downtempo");
 JSON.parse(fs.readFileSync(`${SP}/bc/r2/${f}`,"utf8")).forEach(r=>{const k=norm(r.artist)+"|"+norm(r.album);
  if(old.has(k)){st.old++;return} if(map.has(k)){map.get(k).tags.push(tag);return}
  if(pool.has(k)){st.pool++;return} if(removed.has(k)){st.removed++;return}
  if(/various|^v\/?a$|^va$/i.test(r.artist)){st.va++;return} if(bad.test(r.album)){st.bad++;return}
  map.set(k,{...r,key:k,tags:[tag]})})}
const out=[...map.values()];console.log(st,"new",out.length);
fs.writeFileSync(SP+"/bc/cand-new.json",JSON.stringify(out,null,1));
