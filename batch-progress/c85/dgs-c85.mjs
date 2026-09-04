import { dg } from './dg-c85.mjs';
const q = process.argv.slice(2).join(' ');
const j = await dg(`/database/search?type=release&q=${encodeURIComponent(q)}&per_page=10`);
if (j.__err) { console.log('ERR', j.__err); process.exit(1); }
for (const r of j.results||[]) console.log([r.id, r.year||'-', (r.label||[]).slice(0,2).join('/'), (r.catno||'-'), r.country||'-', (r.format||[]).join('+'), '::', r.title, ':: master', r.master_id||'-'].join(' | '));
