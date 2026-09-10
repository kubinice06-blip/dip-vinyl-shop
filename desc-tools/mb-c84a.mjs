import {j} from './fetch-c84a.mjs';
const ids=process.argv.slice(2);
for(const id of ids){
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+genres+ratings+url-rels&fmt=json`);
  console.log('### RG',id,'https://musicbrainz.org/release-group/'+id);
  console.log(JSON.stringify({title:rg.title,disamb:rg.disambiguation,fr:rg['first-release-date'],pt:rg['primary-type'],st:rg['secondary-types'],
    ac:(rg['artist-credit']||[]).map(a=>a.name+'|'+(a.artist&&a.artist.id)),rating:rg.rating,genres:(rg.genres||[]).map(g=>g.name+':'+g.count),
    rels:(rg.relations||[]).map(r=>r.type+' -> '+(r.url&&r.url.resource))},null,1));
  const rl=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=recordings+labels+media+artist-credits&limit=100&fmt=json`);
  console.log('--- releases count', rl['release-count']);
  for(const r of (rl.releases||[])){
    console.log(JSON.stringify({id:r.id,title:r.title,disamb:r.disambiguation,date:r.date,country:r.country,status:r.status,barcode:r.barcode,packaging:r.packaging,
      labels:(r['label-info']||[]).map(l=>((l.label&&l.label.name)||'?')+' / '+(l['catalog-number']||'?')),
      ac:(r['artist-credit']||[]).map(a=>a.name).join(''),
      media:(r.media||[]).map(m=>m.format+' x'+(m['track-count'])),
      tracks:(r.media||[]).map(m=>(m.tracks||[]).map(t=>t.position+'. '+t.title+' ['+(t.length?Math.round(t.length/1000):'?')+'s]'))},null,1));
  }
  console.log();
}
