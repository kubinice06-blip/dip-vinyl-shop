// 補遺線重篩第二輪（主線第 2011-B 條）：`hoyi-us-labels.json` 裡最早那一版掛日本系美國字標的，
// 或最早那一版沒有廠牌、而日本版是本廠自己的（`Steps Ahead《Smokin' in the Pit》` 形），切成一批。
// 用法：node batch-progress/slice-hoyi-recheck-us.mjs <批號>
import fs from 'node:fs';
const b = Number(process.argv[2]);
if (!b) { console.log('用法：node batch-progress/slice-hoyi-recheck-us.mjs <批號>'); process.exit(1); }
const norm = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const done = new Set();
for (let i = 192; i < b; i++) { try { for (const r of JSON.parse(fs.readFileSync(`batch-progress/c${i}/slice.json`, 'utf8'))) done.add(r.rgMbid || norm(r.artist) + '|' + norm(r.album)); } catch {} }
const JPUS = /Paddle Wheel|ProJazz|Electric Bird|\bJVC JD-|GNP Crescendo Records GNPS 2169/;   // 最後一筆：David Matthews 的 Electric Bird 企劃，美國 GNP 是授權
const d = JSON.parse(fs.readFileSync('batch-progress/enum/hoyi-us-labels.json', 'utf8'));
const rows = [];
for (const [rg, v] of Object.entries(d)) {
  if (done.has(rg)) continue;
  const jpus = JPUS.test(v.firstNonJp);
  const blank = /^\d{4}\S* US\s*$/.test(v.firstNonJp) && /ELECTRIC BIRD|BETTER DAYS|JVC/.test(v.firstJp);
  if (!jpus && !blank) continue;
  const king = v.slug === 'jp-king';
  rows.push({ pile: 4, artist: v.artist, album: v.album, year: v.year, rgMbid: rg, house: v.slug.replace('jp-', ''), g: king ? 'a' : 'b',
    hint: `重篩第二輪：最早 ${v.firstNonJp || '?'}｜日本版 ${v.firstJp || 'MB 未建'}——看 ℗ 行`, source: `hoyi-us-labels（${v.why}）` });
}
rows.sort((x, y) => x.g.localeCompare(y.g) || x.year - y.year);
fs.mkdirSync(`batch-progress/c${b}`, { recursive: true });
fs.writeFileSync(`batch-progress/c${b}/slice.json`, JSON.stringify(rows, null, 1) + '\n');
console.log(`c${b}：${rows.length} 張｜a ${rows.filter(r => r.g === 'a').length}｜b ${rows.filter(r => r.g === 'b').length}`);
for (const r of rows) console.log(r.g, r.year, r.artist, '|', r.album);
