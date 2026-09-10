import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(url,tries=5){
  for(let i=0;i<tries;i++){
    try{const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});
      if(r.ok)return await r.json(); if(r.status===503){await sleep(2500*(i+1));continue;} return {_http:r.status};
    }catch{await sleep(1800*(i+1));}
  }
  return {_http:'timeout'};
}
const OUT='batch-progress/c122/cat-probe.json';
const ids=JSON.parse(fs.readFileSync('batch-progress/c122/cat-ids.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
for(const {id,name} of ids){
  if(out[id]&&!out[id]._http) {console.log('skip',name);continue;}
  let all=[],off=0;
  for(;;){
    const j=await mb(`https://musicbrainz.org/ws/2/release-group?artist=${id}&limit=100&offset=${off}&fmt=json`);
    if(j._http){out[id]={_http:j._http,name};break;}
    all=all.concat((j['release-groups']||[]).map(g=>({id:g.id,title:g.title,pt:g['primary-type']||null,st:g['secondary-types']||[],d:g['first-release-date']||null})));
    off+=100; await sleep(1100);
    if(off>=(j['release-group-count']||0))break;
  }
  if(!out[id]||!out[id]._http) out[id]={name,count:all.length,rgs:all};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(name, out[id].count!=null?out[id].count:'ERR');
}
