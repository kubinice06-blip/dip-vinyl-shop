// 套用主線審稿改動：node apply-review.mjs <batch> <edits.json>；edits = [{key, old, new, why}]
import fs from 'node:fs';
const [batch, ef] = process.argv.slice(2);
const edits = JSON.parse(fs.readFileSync(ef, 'utf8'));
const files = fs.readdirSync('desc-tools/batches/output').filter(f => new RegExp('^' + batch + '-out-\\d+\\.json$').test(f)).map(f => 'desc-tools/batches/output/' + f);
let n = 0;
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const e of edits) { const r = o.find(x => x.key === e.key); if (!r) continue;
    const c = r.desc.split(e.old).length - 1; if (c !== 1) { console.log('✗ 找不到或不唯一', e.key, e.old); continue; }
    r.desc = r.desc.replace(e.old, e.new); n++; console.log('✓', e.key, [...r.desc].length); }
  fs.writeFileSync(f, JSON.stringify(o, null, 1));
}
console.log(`套用 ${n}/${edits.length}`);
