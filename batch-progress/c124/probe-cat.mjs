// c-124：藝人目錄分頁（裁定 116：絕不用 inc=release-groups）。可續跑。
import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(u,t=6){for(let i=0;i<t;i++){try{const r=await fetch(u,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});if(r.ok)return r.json();if(r.status===503){await sleep(2200*(i+1));continue;}return{_http:r.status};}catch(e){await sleep(1600*(i+1));}}return{_http:'timeout'};}
const OUT='batch-progress/c124/cat-probe.json';
const ids=JSON.parse(fs.readFileSync('batch-progress/c124/artist-ids.json','utf8'));
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
for(const {id,name} of ids){
  if(out[id]&&!out[id]._http){continue;}
  let off=0,all=[],total=null,err=null;
  while(true){
    const j=await mb(`https://musicbrainz.org/ws/2/release-group?artist=${id}&limit=100&offset=${off}&fmt=json`);
    if(j._http){err=j._http;break;}
    total=j['release-group-count'];
    all.push(...(j['release-groups']||[]).map(g=>({id:g.id,title:g.title,date:g['first-release-date']||null,pt:g['primary-type']||null,st:g['secondary-types']||[],dis:g.disambiguation||''})));
    off+=100; await sleep(1100);
    if(off>=total||!(j['release-groups']||[]).length)break;
  }
  out[id]=err?{_http:err,name}:{name,total,rgs:all};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(`${name} ${id} → ${err?('HTTP '+err):(all.length+'/'+total)}`);
  await sleep(400);
}
console.log('done');
