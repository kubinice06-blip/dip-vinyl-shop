const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url){
  for(let i=0;i<6;i++){
    const r=await fetch(url,{headers:{'User-Agent':UA}});
    if(r.ok) return r.json();
    await sleep(1500*(i+1));
  }
  return null;
}
for(const n of process.argv.slice(2)){
  const j=await get(`https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(n)}&fmt=json&limit=4`);
  console.log(`\n### ${n}`);
  if(!j){console.log('  FAIL');}
  else (j.artists||[]).forEach(a=>console.log(`  ${a.score} | ${a.name} | ${a.country||'??'} | ${a.type||''} | ${a.disambiguation||''} | ${a.id}`));
  await sleep(1400);
}
