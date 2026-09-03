const UA='dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(u){for(let i=0;i<6;i++){const r=await fetch(u,{headers:{'User-Agent':UA}});if(r.ok)return r.json();if(r.status===404)return null;await sleep(1500*(i+1));}return null;}
for(const id of process.argv.slice(2)){
  const g=await get(`https://musicbrainz.org/ws/2/release-group/${id}?inc=releases+artist-credits+release-rels&fmt=json`);
  if(!g){console.log(`${id} FAIL`);await sleep(1200);continue;}
  const st=(g['secondary-types']||[]).join('+');
  console.log(`\n=== ${JSON.stringify(g.title)} | ${g['first-release-date']} | ${g['primary-type']}${st?'/'+st:''} | ${id}`);
  console.log(`  credit: ${(g['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('')}`);
  const rels=(g.releases||[]).filter(r=>String(r.date||'').slice(0,4)<= String(Number(String(g['first-release-date']).slice(0,4))+1));
  // fetch label for earliest release
  const first=(g.releases||[]).slice().sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999')))[0];
  if(first){
    const rr=await get(`https://musicbrainz.org/ws/2/release/${first.id}?inc=labels&fmt=json`);
    console.log(`  earliest release: ${first.date||'?'} ${first.country||'??'} | ${first.title} | labels: ${(rr&&rr['label-info']||[]).map(l=>(l.label&&l.label.name||'?')+' '+(l['catalog-number']||'')).join(' ; ')}`);
    await sleep(1200);
  }
  await sleep(1200);
}
