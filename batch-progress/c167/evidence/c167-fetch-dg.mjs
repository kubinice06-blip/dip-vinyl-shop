import fs from 'node:fs';
const DIR='/home/user/dip-vinyl-shop/batch-progress/c167/evidence';
const slice=JSON.parse(fs.readFileSync('/home/user/dip-vinyl-shop/batch-progress/c167/slice.json','utf8'));
const OUT=DIR+'/dg.json';
let out={}; try{out=JSON.parse(fs.readFileSync(OUT,'utf8'))}catch{}
const UA='dip-vinyl-shop/1.0 +kubinice06@gmail.com';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<5;i++){try{const r=await fetch(u,{headers:{'User-Agent':UA,Accept:'application/json'}});if(r.ok)return r.json(); if(r.status===429){await sleep(8000);continue;}}catch(e){}await sleep(2500*(i+1));}return null;}
const trim=r=>r?{id:r.id,uri:r.uri,title:r.title,year:r.year,released:r.released,country:r.country,
  artists:(r.artists||[]).map(a=>({name:a.name,anv:a.anv,join:a.join})),
  formats:(r.formats||[]).map(f=>({name:f.name,qty:f.qty,text:f.text,descriptions:f.descriptions})),
  labels:(r.labels||[]).map(l=>({name:l.name,catno:l.catno,entity_type_name:l.entity_type_name})),
  companies:(r.companies||[]).map(c=>({name:c.name,entity_type_name:c.entity_type_name})),
  extraartists:(r.extraartists||[]).slice(0,4).map(c=>({name:c.name,role:c.role})),
  series:(r.series||[]).map(s=>s.name), genres:r.genres, styles:r.styles, notes:(r.notes||'').slice(0,1200),
  tracklist:(r.tracklist||[]).map(t=>t.position+' '+t.title), identifiers:(r.identifiers||[]).slice(0,6)}:null;
for(const s of slice){
  const key=s.artist+' — '+s.album;
  if(out[key]&&out[key].full&&out[key].full.length)continue;
  const q=`https://api.discogs.com/database/search?type=release&artist=${encodeURIComponent(s.artist.replace(/[’‐]/g,c=>c==='’'?"'":'-'))}&release_title=${encodeURIComponent(s.album.replace(/[’]/g,"'"))}&per_page=25`;
  let sr=await j(q); await sleep(1400);
  if(!sr||!sr.results||!sr.results.length){
    sr=await j(`https://api.discogs.com/database/search?type=release&q=${encodeURIComponent(s.artist.replace(/[’‐]/g,c=>c==='’'?"'":'-')+' '+s.album.replace(/[’]/g,"'"))}&per_page=25`); await sleep(1400);
  }
  const results=(sr&&sr.results||[]).map(r=>({id:r.id,title:r.title,year:r.year,country:r.country,format:r.format,label:r.label,catno:r.catno,barcode:r.barcode,genre:r.genre,style:r.style,uri:r.uri}));
  const ids=results.slice(0,5).map(r=>r.id);
  const full=[];
  for(const id of ids){ const f=await j(`https://api.discogs.com/releases/${id}`); await sleep(1400); if(f)full.push(trim(f)); }
  out[key]={results,full};
  fs.writeFileSync(OUT,JSON.stringify(out,null,1));
  console.log('dg',key,results.length,full.length);
}
console.log('all',Object.keys(out).length);
