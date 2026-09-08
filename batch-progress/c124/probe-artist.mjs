// c-124：藝人搜尋回問（裁定 179／250：score 不可用，只看 disambiguation）。可續跑。
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
const OUT='batch-progress/c124/artist-probe.json';
const names=JSON.parse(fs.readFileSync('batch-progress/c124/artist-names.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
let n=0;
for(const nm of names){
  if(out[nm]&&!out[nm]._http){n++;continue;}
  const j=await mb(`https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(nm)}&fmt=json&limit=12`);
  if(j._http){ out[nm]={_http:j._http}; }
  else out[nm]={count:j.count,list:(j.artists||[]).map(a=>({id:a.id,name:a.name,score:a.score,dis:a.disambiguation||'',type:a.type||'',area:(a.area&&a.area.name)||'',begin:(a['life-span']||{}).begin||'',aliases:(a.aliases||[]).map(x=>x.name).slice(0,6)}))};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  n++; console.log(`${n}/${names.length} ${nm} → ${out[nm]._http?('HTTP '+out[nm]._http):out[nm].count+' 筆'}`);
  await sleep(1100);
}
console.log('done');
