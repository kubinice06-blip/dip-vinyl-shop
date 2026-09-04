// 暫存：c-88 a 組（writer-1）逐筆組稿與長度檢查。收尾時刪除。
import fs from 'node:fs';
const inputs = JSON.parse(fs.readFileSync('batches/input/c88-writer-1.json', 'utf8'));
const OUT = 'batches/output/c88-out-1.json';
const descs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); // { key-index: desc }
const rows = [];
for (let i = 0; i < inputs.length; i++) {
  const d = descs[String(i + 1)];
  if (d == null) continue;
  rows.push({ key: inputs[i].key, desc: d });
}
fs.writeFileSync(OUT, JSON.stringify(rows, null, 2) + '\n');
for (const r of rows) {
  const n = Array.from(r.desc).length;
  const src = inputs.find(x => x.key === r.key);
  const hookOk = r.desc.replace(/ /g, '').startsWith(src.hook.replace(/ /g, ''));
  console.log((n < 180 || n > 240 ? '!!' : (n < 215 || n > 235 ? ' ~' : '  ')), n, hookOk ? 'hook✓' : 'HOOK✗', r.key.slice(6, 50));
}
console.log('寫入', rows.length, '筆');
