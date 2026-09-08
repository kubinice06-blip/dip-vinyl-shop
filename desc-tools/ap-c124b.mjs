// c-124 b 組：Apple 三種查法（search / 藝人目錄 / 直查 collectionId），2.5 秒間隔，逐筆落檔
import fs from 'node:fs';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const SD='/tmp/claude-0/-home-user-dip-vinyl-shop/f5085309-84aa-5485-a270-96aad3644d92/scratchpad/c124b';
const OUT=SD+'/apple.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
const save=()=>fs.writeFileSync(OUT,JSON.stringify(out,null,1));
async function get(url,tries=6){
  for(let i=0;i<tries;i++){
    try{
      const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(30000)});
      if(r.ok){const t=await r.text();try{return JSON.parse(t);}catch(e){return {_bad:t.slice(0,120)};}}
      if(r.status===429||r.status===403||r.status===503){await sleep(6000*(i+1));continue;}
      return {_http:r.status};
    }catch(e){await sleep(3000*(i+1));}
  }
  return {_http:'timeout'};
}
const jobs=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
for(const j of jobs){
  const id=j.id;
  if(out[id]&&!out[id]._http&&!out[id]._bad){console.log('skip',id);continue;}
  const r=await get(j.url);
  out[id]={url:j.url,rc:r.resultCount,results:(r.results||[]).map(x=>({
    wrapper:x.wrapperType,kind:x.kind||x.collectionType||null,
    aid:x.artistId,an:x.artistName,cid:x.collectionId,cn:x.collectionName,
    tid:x.trackId,tn:x.trackName,tno:x.trackNumber,tc:x.trackCount,
    ms:x.trackTimeMillis,date:x.releaseDate,ce:x.collectionExplicitness,
    cr:x.copyright,pn:x.primaryGenreName,country:x.country,disc:x.discNumber
  })),_http:r._http,_bad:r._bad};
  save();
  console.log(id,r._http||r._bad||('rc='+r.resultCount));
  await sleep(2600);
}
console.log('DONE');
