// 暫用腳本（c82 b 組寫作層）：以輸入檔的 hook 原字串為前綴，接上 body，產生 out-2。
// 已有部分內容時接續補完，不從頭重寫。
import fs from 'node:fs';
const IN = 'batches/input/c82-writer-2.json';
const OUT = 'batches/output/c82-out-2.json';
const inputs = JSON.parse(fs.readFileSync(IN, 'utf8'));
const bodies = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); // { "<idx>": "body..." }
let existing = [];
if (fs.existsSync(OUT)) { try { existing = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {} }
const byKey = new Map(existing.map(r => [r.key, r.desc]));
for (const [i, body] of Object.entries(bodies)) {
  const src = inputs[Number(i)];
  byKey.set(src.key, src.hook + body);
}
const rows = inputs.filter(x => byKey.has(x.key)).map(x => ({ key: x.key, desc: byKey.get(x.key) }));
fs.writeFileSync(OUT, JSON.stringify(rows, null, 2) + '\n');
for (const r of rows) console.log(String(inputs.findIndex(x => x.key === r.key)).padStart(2), Array.from(r.desc).length, r.key);
console.log('共', rows.length, '筆');
