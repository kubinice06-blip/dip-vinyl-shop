const UA={'User-Agent':'dip-vinyl-shop/1.0 (kubinice06@gmail.com)'};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function j(u){for(let i=0;i<5;i++){try{const r=await fetch(u,{headers:UA});if(r.ok)return await r.json();if(r.status===503||r.status===429){await sleep(2000);continue}return {__err:r.status}}catch(e){await sleep(1500)}}return {__err:'fail'}}
const rgs=process.argv.slice(2);
for(const rg of rgs){
  const g=await j(`https://musicbrainz.org/ws/2/release-group/${rg}?inc=artist-credits+url-rels+genres&fmt=json`);
  await sleep(1100);
  const rel=await j(`https://musicbrainz.org/ws/2/release?release-group=${rg}&inc=recordings+labels+media+artist-credits&limit=100&fmt=json`);
  await sleep(1100);
  console.log('#### RG',rg,'|',g.title,'| frd',g['first-release-date'],'| type',g['primary-type'],JSON.stringify(g['secondary-types']),'| ac',(g['artist-credit']||[]).map(a=>a.name).join(''),'| genres',(g.genres||[]).map(x=>x.name+':'+x.count).join(','),'| rels',JSON.stringify((g.relations||[]).map(r=>r.type+'='+(r.url&&r.url.resource))));
  for(const r of (rel.releases||[])){
    console.log('  REL',r.id,'|',r.title,'|',r.date,'|',r.country,'|',r.status,'|',r.barcode,'|',(r['label-info']||[]).map(l=>(l.label&&l.label.name)+' '+l['catalog-number']).join(' ; '),'|',(r.media||[]).map(m=>m.format+' x'+m['track-count']).join(' + '),'| disamb',r.disambiguation);
    for(const m of (r.media||[])) for(const t of (m.tracks||[])) console.log('     ',t.position,t.title,t.length?Math.floor(t.length/60000)+':'+String(Math.round(t.length%60000/1000)).padStart(2,'0'):'-');
  }
}
