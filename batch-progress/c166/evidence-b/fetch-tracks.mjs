import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c166/evidence-b';
const mb=JSON.parse(fs.readFileSync(DIR+'/mb.json','utf8'));
const OUT=DIR+'/tracks.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<4;i++){const r=await fetch(u,{headers:{'User-Agent':UA,Accept:'application/json'}});if(r.ok)return r.json();await sleep(2000*(i+1));}throw new Error('fail '+u);}
let n=0;
for(const [rg,v] of Object.entries(mb)){
  if(out[rg])continue;
  const best=v.releases.slice().sort((a,b)=>((b.media||[]).reduce((s,m)=>s+(m['track-count']||0),0))-((a.media||[]).reduce((s,m)=>s+(m['track-count']||0),0)))[0];
  if(!best){out[rg]={err:'no release'};continue;}
  const r=await j(`https://musicbrainz.org/ws/2/release/${best.id}?fmt=json&inc=recordings`);
  await sleep(1100);
  out[rg]={slice:v.slice, releaseId:best.id, date:best.date, country:best.country, tracks:(r.media||[]).flatMap(m=>(m.tracks||[]).map(t=>t.title))};
  n++; if(n%3===0){fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log('saved',Object.keys(out).length);}
}
fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log('done',Object.keys(out).length);
