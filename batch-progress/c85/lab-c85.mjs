import { mb } from './mb-c85.mjs';
const label = process.argv[2];
const lim = Number(process.argv[3] || 100);
const off = Number(process.argv[4] || 0);
const j = await mb(`release?query=${encodeURIComponent(`label:"${label}"`)}&limit=${lim}&offset=${off}`);
if (j.__err) { console.log('ERR', j.__err, j.__url); process.exit(1); }
console.log(`count=${j.count} shown=${j.releases.length}`);
const seen = new Set();
for (const r of j.releases) {
  const ac = (r['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('');
  const rg = r['release-group']||{};
  const key = rg.id;
  if (seen.has(key)) continue; seen.add(key);
  const labs = (r['label-info']||[]).map(l=>`${l.label?.name||'?'}${l['catalog-number']?' '+l['catalog-number']:''}`).join('; ');
  console.log([rg['primary-type']||'-', (rg['secondary-types']||[]).join('/')||'-', r.date||'-', r.country||'-', ac, '::', r.title, '::', labs, '::', rg.id].join(' | '));
}
