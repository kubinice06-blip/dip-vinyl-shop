import {j,ms} from './fetch-c88b.mjs';
const [,,cmd,id]=process.argv;
if(cmd==='rg'){
  const g=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits&fmt=json`);
  console.log('TITLE:',g.title,'| first:',g['first-release-date'],'| primary:',g['primary-type'],'| secondary:',(g['secondary-types']||[]).join(','));
  console.log('AC:',(g['artist-credit']||[]).map(a=>a.name+`(${a.artist.id}|${a.artist.name}|${a.artist.type}|${a.artist.disambiguation||''})`).join(' + '));
  const r=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=labels+media+artist-credits&fmt=json&limit=100`);
  console.log('releases:',r['release-count']);
  for(const x of r.releases||[]){
    const lbl=(x['label-info']||[]).map(l=>((l.label&&l.label.name)||'?')+' '+(l['catalog-number']||'')).join(' / ');
    const med=(x.media||[]).map(m=>m.format+':'+m['track-count']).join(' + ');
    console.log([x.id,x.date||'-',x.country||'-',x.status,x.barcode||'',lbl,med,x.title].join(' | '));
  }
} else if(cmd==='rel'){
  const x=await j(`https://musicbrainz.org/ws/2/release/${id}?inc=recordings+labels+artist-credits+release-groups+media&fmt=json`);
  console.log('TITLE:',x.title,'| date:',x.date,'| country:',x.country,'| status:',x.status,'| barcode:',x.barcode,'| packaging:',x.packaging);
  console.log('labels:',(x['label-info']||[]).map(l=>((l.label&&l.label.name)||'?')+' '+(l['catalog-number']||'')).join(' / '));
  console.log('AC:',(x['artist-credit']||[]).map(a=>a.name).join(' + '));
  for(const m of x.media||[]){
    console.log(`-- medium ${m.position} ${m.format} tracks=${m['track-count']}`);
    for(const t of m.tracks||[]) console.log(`  ${t.number}\t${ms(t.length)}\t${t.title}\t[${(t['artist-credit']||[]).map(a=>a.name).join(' + ')}]`);
  }
}
