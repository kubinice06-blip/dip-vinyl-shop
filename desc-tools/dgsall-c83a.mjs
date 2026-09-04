import {j} from './fetch-c83a.mjs';
import fs from 'fs';
const cards=JSON.parse(fs.readFileSync('./batches/cards/c83-cards.json','utf8')).filter(x=>x.group==='a');
for(let i=0;i<cards.length;i++){
  const c=cards[i];
  const q=`${c.artist.replace(/[’']/g,'')} ${c.album.replace(/[’']/g,'')}`;
  const o=await j(`https://api.discogs.com/database/search?q=${encodeURIComponent(q)}&type=release&per_page=30`);
  console.log('###',i+1,c.artist,'—',c.album,'| label='+c.label);
  if(!o.results){console.log('  FAIL',JSON.stringify(o).slice(0,200));continue;}
  for(const r of o.results) console.log(' ',[r.id,r.year,r.country,(r.format||[]).join('/'),(r.label||[]).slice(0,2).join('/'),(r.catno||''),r.title].join(' | '));
}
