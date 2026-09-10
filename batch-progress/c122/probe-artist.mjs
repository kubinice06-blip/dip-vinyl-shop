import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mb(url,tries=5){for(let i=0;i<tries;i++){try{const r=await fetch(url,{headers:{'User-Agent':UA},signal:AbortSignal.timeout(30000)});if(r.ok)return await r.json();if(r.status===503){await sleep(2500*(i+1));continue;}return {_http:r.status};}catch{await sleep(1800*(i+1));}}return{_http:'timeout'};}
const list=JSON.parse(fs.readFileSync('batch-progress/c122/artist-ids.json','utf8'));
const OUT='batch-progress/c122/artist-probe.json';
const out=fs.existsSync(OUT)?JSON.parse(fs.readFileSync(OUT,'utf8')):{};
for(const a of list){
  if(out[a.id]){console.log('skip',a.name);continue;}
  // 1) 目標實體本身
  const ent=await mb(`https://musicbrainz.org/ws/2/artist/${a.id}?fmt=json`); await sleep(1100);
  // 2) 同名回問（裁定 179／250）：count 是同名實體總數，score 排序不可用，只看 disambiguation
  const q=await mb(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent('artist:"'+a.name.replace(/"/g,'')+'"')}&fmt=json&limit=25`); await sleep(1100);
  const arr=(q.artists||[]);
  const rank=arr.findIndex(x=>x.id===a.id);
  out[a.id]={
    name:a.name,
    mbName:ent.name||null, dis:ent.disambiguation||'', area:(ent.area&&ent.area.name)||null,
    type:ent.type||null, begin:(ent['life-span']||{}).begin||null,
    hits:q.count!=null?q.count:'?', rank:rank<0?'>25':rank+1,
    score:rank>=0?arr[rank].score:null,
    top3:arr.slice(0,3).map(x=>`${x.name}[${x.score}]${x.disambiguation?' — '+x.disambiguation:''}`)
  };
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(`${a.name.padEnd(24)} hits=${String(out[a.id].hits).padStart(4)} rank=${String(out[a.id].rank).padStart(3)} score=${out[a.id].score} dis="${out[a.id].dis}"`);
}
