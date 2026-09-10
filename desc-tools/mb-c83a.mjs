import {j} from './fetch-c83a.mjs';
import fs from 'fs';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c83-cards.json','utf8')).filter(x=>x.group==='a');
const pick=process.argv.slice(2).map(Number);
for(let i=0;i<cards.length;i++){
  if(pick.length&&!pick.includes(i+1))continue;
  const c=cards[i];
  const id=c.rgMbid;
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+releases+url-rels+genres&fmt=json`);
  const rel=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=recordings+labels+media+artist-credits&fmt=json&limit=100`);
  const rs=(rel.releases||[]).map(r=>({id:r.id,date:r.date,country:r.country,status:r.status,title:r.title,barcode:r.barcode,pkg:r.packaging,
    labels:(r['label-info']||[]).map(l=>`${l.label&&l.label.name}|${l['catalog-number']}`),
    media:(r.media||[]).map(m=>({fmt:m.format,tc:m['track-count'],tracks:(m.tracks||[]).map(t=>`${t.position}. ${t.title} [${t.length?Math.round(t.length/1000):'?'}s]`)}))}));
  console.log('###',i+1,c.artist,'—',c.album,id);
  console.log(JSON.stringify({title:rg.title,frd:rg['first-release-date'],pt:rg['primary-type'],st:rg['secondary-types'],
    ac:(rg['artist-credit']||[]).map(a=>({credit:a.name,artist:a.artist&&a.artist.name,sort:a.artist&&a.artist['sort-name'],country:a.artist&&a.artist.country,type:a.artist&&a.artist.type,disamb:a.artist&&a.artist.disambiguation,id:a.artist&&a.artist.id})),
    urls:(rg.relations||[]).map(r=>r.type+': '+(r.url&&r.url.resource)),
    relCount:(rel.releases||[]).length,releases:rs},null,1));
}
