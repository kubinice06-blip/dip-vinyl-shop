import fs from 'node:fs';
const OUT='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c90b';
const UA='dip-vinyl-research/1.0 (kubinice06@gmail.com)';
const cards=JSON.parse(fs.readFileSync('batches/cards/c90-cards.json','utf8')).filter(x=>x.group==='b');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=5){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA}});
      if(r.status===503||r.status===429){await sleep(2500*(i+1));continue;}
      if(!r.ok){console.error('HTTP',r.status,url);await sleep(1500);continue;}
      return await r.json();
    }catch(e){console.error('ERR',e.message,url);await sleep(2000);}
  }
  return {__error:true,url};
}
const res={};
for(const c of cards){
  const id=c.rgMbid;
  const key=c.key;
  const rg=await get(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+releases+url-rels&fmt=json`);
  await sleep(1100);
  const rels=await get(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=labels+media+recordings+artist-credits&fmt=json&limit=25`);
  await sleep(1100);
  res[key]={rg,rels};
  console.log('done',key, rg.title||'?', '| releases:', (rels.releases||[]).length);
  fs.writeFileSync(`${OUT}/mb.json`,JSON.stringify(res,null,1));
}
console.log('ALL DONE');
