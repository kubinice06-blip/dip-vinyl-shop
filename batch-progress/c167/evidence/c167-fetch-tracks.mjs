import fs from 'node:fs';
const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c167/evidence';
const OUT=DIR+'/tracks.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const mb=JSON.parse(fs.readFileSync(DIR+'/mb.json','utf8'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
for(const [rg,v] of Object.entries(mb)){
  if(out[rg])continue;
  const rel=v.releases[0]; if(!rel)continue;
  const r=await fetch(`https://musicbrainz.org/ws/2/release/${rel.id}?fmt=json&inc=recordings+artist-credits`,{headers:{'User-Agent':UA}});
  const j=r.ok?await r.json():null;
  out[rg]={album:v.slice.album, tracks:j?(j.media||[]).flatMap(m=>(m.tracks||[]).map(t=>t.position+'. '+t.title)):[]};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log(v.slice.album, out[rg].tracks.length);
  await sleep(1100);
}
