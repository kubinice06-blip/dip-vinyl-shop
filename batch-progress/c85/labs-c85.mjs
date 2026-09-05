import fs from 'node:fs';
import { mb } from './mb-c85.mjs';
// usage: node labs-c85.mjs <outfile> <y1> <y2> label1 label2 ...
const out = process.argv[2], y1 = +process.argv[3], y2 = +process.argv[4];
const labels = process.argv.slice(5);
let lines = [];
for (const L of labels) {
  const seen = new Map();
  for (let off = 0; off < 300; off += 100) {
    const j = await mb(`release?query=${encodeURIComponent(`label:"${L}"`)}&limit=100&offset=${off}`);
    if (j.__err) { lines.push(`### ${L} ERR ${j.__err}`); break; }
    if (off === 0) lines.push(`\n### ${L}  count=${j.count}`);
    for (const r of j.releases) {
      const rg = r['release-group'] || {};
      if (rg['primary-type'] !== 'Album') continue;
      if ((rg['secondary-types'] || []).length) continue;
      const yr = +(r.date || '').slice(0, 4);
      if (!yr || yr < y1 || yr > y2) continue;
      const ac = (r['artist-credit'] || []).map(a => a.name + (a.joinphrase || '')).join('');
      const labs = (r['label-info'] || []).map(l => `${l.label?.name || '?'}${l['catalog-number'] ? ' ' + l['catalog-number'] : ''}`).join('; ');
      const key = rg.id;
      if (seen.has(key)) continue;
      seen.set(key, 1);
      lines.push(`${yr} | ${r.country || '-'} | ${ac} :: ${r.title} :: ${labs} :: ${rg.id}`);
    }
    if (off + 100 >= j.count) break;
  }
}
fs.writeFileSync(out, lines.join('\n'));
console.log(lines.join('\n'));
