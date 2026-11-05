// ax10：查藝人在卡池（任何 tier）是否已有卡。用法：node batch-progress/add-20261104-ax6/chk-artist.mjs "名1" "別名2" ...
// 正規化後：完全相同、或互為子字串（較短一方 ≥4 字元）都列出。輸出 0 筆＝卡池沒有這位藝人。
import fs from 'node:fs';
const s = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const n = x => String(x).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
const hits = new Map();
for (const q of process.argv.slice(2)) {
  const a = n(q); if (!a) continue;
  for (const r of s) {
    const b = n(r[0]);
    const sub = (a.length >= 4 && b.includes(a)) || (b.length >= 4 && a.includes(b));
    if (a === b || sub) hits.set(r[0] + '|' + r[1], (r[8] || '-'));
  }
}
console.log(hits.size ? [...hits].map(([k, t]) => `${t}\t${k}`).join('\n') : '0');
