import {j} from './fetch-c83a.mjs';
import fs from 'fs';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c83-cards.json','utf8')).filter(x=>x.group==='a');
const pick=process.argv.slice(2).map(Number);
for(let i=0;i<cards.length;i++){
  if(pick.length&&!pick.includes(i+1))continue;
  const c=cards[i]; const id=c.rgMbid;
  const rg=await j(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+releases+url-rels+genres&fmt=json`);
  const rel=await j(`https://musicbrainz.org/ws/2/release?release-group=${id}&inc=recordings+labels+media+artist-credits&fmt=json&limit=100`);
  console.log(`### ${i+1} ${c.artist} — ${c.album} | rg=${id} | frd=${rg['first-release-date']} pt=${rg['primary-type']} st=[${(rg['secondary-types']||[]).join(',')}] title="${rg.title}" ac="${(rg['artist-credit']||[]).map(a=>a.name).join('')}"`);
  const relsS=(rel.releases||[]).slice().sort((a,b)=>String(a.date||'9').localeCompare(String(b.date||'9')));
  for(const r of relsS){
    const lab=(r['label-info']||[]).map(l=>`${l.label&&l.label.name}|${l['catalog-number']}`).join(' ; ');
    const med=(r.media||[]).map(m=>`${m.format}x${m['track-count']}`).join('+');
    console.log(`  REL ${r.id.slice(0,8)} ${r.date||'-'} ${r.country||'-'} ${r.status} [${med}] ${lab} bc=${r.barcode||'-'} "${r.title}"`);
  }
  const first=relsS[0];
  if(first) for(const m of (first.media||[])) console.log('  TRK('+first.id.slice(0,8)+') '+(m.tracks||[]).map(t=>`${t.position}.${t.title}[${t.length?Math.round(t.length/1000):'?'}]`).join(' | '));
}
