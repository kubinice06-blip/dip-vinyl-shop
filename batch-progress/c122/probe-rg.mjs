// c-122：逐筆回問 release-group（含 releases+media），可續跑、每筆落檔。
import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(url,tries=5){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});
      if(r.ok) return await r.json();
      if(r.status===503){await sleep(2500*(i+1));continue;}
      return {_http:r.status};
    }catch(e){await sleep(1800*(i+1));}
  }
  return {_http:'timeout'};
}
const OUT='batch-progress/c122/rg-probe.json';
const ids=JSON.parse(fs.readFileSync('batch-progress/c122/rg-ids.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
let n=0;
for(const {id,note} of ids){
  if(out[id]&&!out[id]._http){n++;continue;}
  const j=await mb(`https://musicbrainz.org/ws/2/release-group/${id}?fmt=json&inc=artist-credits+releases+media`);
  if(j._http){ out[id]={_http:j._http,note}; }
  else {
    out[id]={
      note,
      id:j.id,
      title:j.title,
      artist:(j['artist-credit']||[]).map(c=>c.name+(c.joinphrase||'')).join(''),
      artistIds:(j['artist-credit']||[]).map(c=>c.artist&&c.artist.id),
      primaryType:j['primary-type']||null,
      secondaryTypes:j['secondary-types']||[],
      firstRelease:j['first-release-date']||null,
      disambiguation:j.disambiguation||'',
      releases:(j.releases||[]).map(r=>({
        id:r.id,title:r.title,date:r.date||null,country:r.country||null,status:r.status||null,
        media:(r.media||[]).map(m=>`${m.format||'?'}×${m['track-count']}`).join('+')
      }))
    };
  }
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  n++;
  console.log(`${n}/${ids.length} ${id} ${out[id]._http?('HTTP '+out[id]._http):out[id].artist+' — '+out[id].title}`);
  await sleep(1100);
}
console.log('done',n);
