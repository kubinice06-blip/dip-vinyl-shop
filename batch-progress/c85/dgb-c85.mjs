import fs from 'node:fs';
import { dg } from './dg-c85.mjs';
const lines = fs.readFileSync(process.argv[2],'utf8').trim().split('\n').filter(Boolean);
const out=[];
for (const L of lines) {
  const [a,al] = L.split('|');
  const j = await dg(`/database/search?type=release&q=${encodeURIComponent(a+' '+al)}&per_page=12`);
  const rs = (j.results||[]).map(r=>({id:r.id,year:r.year,label:(r.label||[]).slice(0,2),catno:r.catno,country:r.country,fmt:(r.format||[]).join('+'),title:r.title,master:r.master_id}));
  out.push({a,al,err:j.__err,rs});
  console.log(`\n== ${a} — ${al}${j.__err?' ERR '+j.__err:''}`);
  rs.forEach(r=>console.log(`  ${r.id} | ${r.year||'-'} | ${r.label.join('/')} | ${r.catno} | ${r.country} | ${r.fmt} | ${r.title} | m${r.master||'-'}`));
  fs.writeFileSync(process.argv[3], JSON.stringify(out,null,1));
}
