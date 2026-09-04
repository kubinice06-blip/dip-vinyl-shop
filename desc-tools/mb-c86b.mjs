import {j} from './fetch-c86b.mjs';
const ids=process.argv.slice(2);
for(const id of ids){
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+genres+url-rels&fmt=json`);
  console.log('### RG',id);
  console.log(JSON.stringify({title:rg.title,ac:(rg['artist-credit']||[]).map(a=>a.name+'|'+a.artist?.id+'|'+a.artist?.name+'|'+a.artist?.type+'|'+a.artist?.country+'|'+(a.artist?.disambiguation||'')),
    frd:rg['first-release-date'],pt:rg['primary-type'],st:rg['secondary-types'],
    genres:(rg.genres||[]).map(g=>g.name+':'+g.count),
    rels:(rg.relations||[]).map(r=>r.type+' -> '+(r.url?.resource||''))},null,1));
  const rs=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=recordings+labels+media+artist-credits&limit=100&fmt=json`);
  console.log('## RELEASES count',rs['release-count']);
  for(const r of (rs.releases||[])){
    console.log(JSON.stringify({id:r.id,title:r.title,date:r.date,country:r.country,status:r.status,barcode:r.barcode,
      ac:(r['artist-credit']||[]).map(a=>a.name).join(''),
      labels:(r['label-info']||[]).map(l=>(l.label?.name||'?')+' | '+(l['catalog-number']||'')),
      media:(r.media||[]).map(m=>m.format+' x'+m['track-count']),
      tracks:(r.media||[]).flatMap(m=>(m.tracks||[]).map(t=>`${t.position}. ${t.title} ${t.length?Math.floor(t.length/60000)+':'+String(Math.floor((t.length%60000)/1000)).padStart(2,'0'):''}`))},null,1));
  }
}
