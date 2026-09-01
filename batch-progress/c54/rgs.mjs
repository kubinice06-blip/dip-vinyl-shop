const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url){for(let i=0;i<6;i++){const r=await fetch(url,{headers:{'User-Agent':UA}});if(r.ok)return r.json();await sleep(1500*(i+1));}return null;}
const args=process.argv.slice(2);
for(let i=0;i<args.length;i+=2){
  const label=args[i],mbid=args[i+1];
  const j=await get(`https://musicbrainz.org/ws/2/release-group?artist=${mbid}&fmt=json&limit=100`);
  console.log(`\n### ${label}  (${j?j['release-group-count']:'FAIL'})`);
  if(j) (j['release-groups']||[]).filter(g=>!/Compilation|Live|Interview|Remix|Spokenword|DJ-mix/.test((g['secondary-types']||[]).join('+'))||true)
    .sort((a,b)=>String(a['first-release-date']).localeCompare(String(b['first-release-date'])))
    .forEach(g=>console.log(`  ${(g['first-release-date']||'?').padEnd(10)} | ${(g['primary-type']||'?')}${(g['secondary-types']||[]).length?'/'+g['secondary-types'].join('+'):''} | ${g.title} | ${g.id}`));
  await sleep(1400);
}
