// 補遺線第 4 堆重篩（c-196 a 第 7561 條 → 主線第 2010-B 條）：`hoyi-foreign-origin.mjs` 判「乙」的碟裡，
// 有一形其實是日本原盤——**外國版是日本原盤的授權版，但 MB 上那一版的日期只填到年，排在有完整日期的日本版前面**
// （King／Paddle Wheel 委託西德 Bellaphon 代工的版本、Alfa 的荷蘭 Limetree 版）。修正後重跑 `--recheck-yi` 翻成「不明」的，
// 加上 MB 上日本版被建成晚一年（或根本沒建原壓）而仍判乙的 `jp-king` 西德形，切成一批給策展層逐筆看 ℗ 行。
// 用法：node batch-progress/slice-hoyi-recheck.mjs <批號>
import fs from 'node:fs';
const b = Number(process.argv[2]);
if (!b) { console.log('用法：node batch-progress/slice-hoyi-recheck.mjs <批號>'); process.exit(1); }
const norm = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const done = new Set();   // 已經切進補遺線任何一批的
for (let i = 192; i < b; i++) { try { for (const r of JSON.parse(fs.readFileSync(`batch-progress/c${i}/slice.json`, 'utf8'))) done.add(r.rgMbid || norm(r.artist) + '|' + norm(r.album)); } catch {} }
const coll = JSON.parse(fs.readFileSync('batch-progress/enum/known-pool-collisions.json', 'utf8')).items;
const collHit = (rg, a, t) => coll.some(c => c.rgMbid && rg.startsWith(c.rgMbid) || norm(c.artist) === norm(a) && norm(t).startsWith(norm(c.album)));
const orig = JSON.parse(fs.readFileSync('batch-progress/enum/hoyi-foreign-origin.json', 'utf8'));
const rows = [];
for (const [rg, o] of Object.entries(orig)) {
  const flipped = o.verdict === '不明' && /只到/.test(o.why);
  const kingDE = o.verdict === '乙' && o.slug === 'jp-king' && /最早 \d{4} DE(\/US)?$/.test(o.why);
  if (!flipped && !kingDE) continue;
  if (done.has(rg) || o.year > 1989) continue;
  if (collHit(rg, o.artist, o.album)) { console.log(`撞池登記簿：${o.artist}《${o.album}》`); continue; }
  rows.push({ pile: 4, artist: o.artist, album: o.album, year: o.year, rgMbid: rg, house: o.slug.replace('jp-', ''), hint: flipped ? '重篩翻成不明（外國版只到年／月）' : 'jp-king 西德形（Bellaphon 代工？）——看 ℗ 行', source: `hoyi-foreign-origin 重篩：${o.verdict}（${o.why}）` });
}
rows.sort((x, y) => (x.artist === 'Manhattan Jazz Quintet') - (y.artist === 'Manhattan Jazz Quintet') || x.year - y.year);
// MJQ 八張與 George Young 三張放 b 組（同一條 King 企劃線，一位代理一起看），其餘 a 組
rows.forEach(r => r.g = /Manhattan Jazz Quintet|George Young/.test(r.artist) ? 'b' : 'a');
fs.mkdirSync(`batch-progress/c${b}`, { recursive: true });
fs.writeFileSync(`batch-progress/c${b}/slice.json`, JSON.stringify(rows, null, 1) + '\n');
console.log(`c${b}：${rows.length} 張｜a ${rows.filter(r => r.g === 'a').length}｜b ${rows.filter(r => r.g === 'b').length}`);
for (const r of rows) console.log(r.g, r.year, r.artist, '|', r.album, '|', r.hint);
