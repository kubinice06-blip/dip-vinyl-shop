const UA={'User-Agent':'dipvinylshop/1.0 +https://dipvinyl.example'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<5;i++){const r=await fetch(u,{headers:UA});if(r.ok)return await r.json();if(r.status===429){await sleep(4000);continue}return{__err:r.status,__u:u}}return{__err:'fail'}}
for(const id of process.argv.slice(2)){
  const d=await j(`https://api.discogs.com/releases/${id}`);
  if(d.__err){console.log('#### REL',id,'ERR',d.__err);continue}
  console.log('#### REL',id,'|',(d.artists||[]).map(a=>a.name).join(','),'|',d.title,'| year',d.year,'| released',d.released,'| country',d.country,'| formats',JSON.stringify((d.formats||[]).map(f=>f.name+' '+f.qty+' '+JSON.stringify(f.descriptions||[])+' '+(f.text||''))),'| labels',(d.labels||[]).map(l=>l.name+' '+l.catno).join(' ; '),'| master',d.master_id,'| genres',(d.genres||[]).join(','),'| styles',(d.styles||[]).join(','));
  console.log('  NOTES:',(d.notes||'').replace(/\n/g,' \\n '));
  console.log('  IDENT:',JSON.stringify((d.identifiers||[]).map(i=>i.type+'='+i.value+(i.description?'('+i.description+')':''))));
  console.log('  COMPANIES:',JSON.stringify((d.companies||[]).map(c=>c.entity_type_name+': '+c.name)));
  console.log('  CREDITS:',JSON.stringify((d.extraartists||[]).map(c=>c.role+': '+c.name+(c.tracks?' ['+c.tracks+']':''))));
  console.log('  TRACKS:',(d.tracklist||[]).length);
  for(const t of (d.tracklist||[])) console.log('    ',t.position,'|',t.title,'|',t.duration,'|',(t.extraartists||[]).map(x=>x.role+':'+x.name).join(','));
  await sleep(1200);
}
