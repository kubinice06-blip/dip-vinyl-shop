const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(u){for(let i=0;i<6;i++){const r=await fetch(u,{headers:{'User-Agent':UA}});if(r.ok)return r.json();await sleep(1500*(i+1));}return null;}
for(const id of process.argv.slice(2)){
  const j=await get(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=labels&fmt=json&limit=25`);
  console.log(`\n=== ${id}`);
  if(!j){console.log(' FAIL');continue;}
  (j.releases||[]).sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999')))
   .forEach(r=>console.log(`  ${(r.date||'?').padEnd(10)} ${r.country||'??'} | ${r.title} | ${(r['label-info']||[]).map(l=>(l.label&&l.label.name||'?')+' '+(l['catalog-number']||'')).join(' ; ')}`));
  await sleep(1300);
}
