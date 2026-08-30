// 封面「版本」稽核 步驟 11：把步驟 10 的中繼資料分級，決定哪些真的需要人工看圖。
//
// 分級（由無疑慮到需覆核）：
//   ok-single    該群組只有一筆 release 有正面圖 → 不可能抽錯
//   ok-original  CAA 服務的正好是「最早且有圖」的那筆 → 視為原版
//   ok-same-era  服務的不是最早那筆，但同國別、同年份 → 幾乎必然是同一套視覺
//   review       其餘有兩筆以上有圖的 → 需要看圖
//   broken       沒有任何 release 有正面圖 → 封面網址會 404，要另外補
//   unknown      MB／CAA 查詢失敗 → 重跑步驟 10
//
// 評分（越高越可疑）。**缺日期不可當成第 0 年**——初版這樣寫，害「服務無日期的數位版」
// 全部算出兩千多分的假年份差，把真正的問題壓到後面（2026-08-29 實測）。
//   +100 國別不同（最強訊號：不同地區壓片常換視覺，Paris, Texas 就是這樣）
//   + 80 服務的是 Digital Media，或該筆沒有發行日期（數位重發最常換封面）
//   + 年份差（兩邊都有日期時才算，上限 60 分）
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const scan = JSON.parse(fs.readFileSync(path.join(OUT, 'edition-scan.json'), 'utf8'));
const year = d => Number(String(d || '').slice(0, 4)) || null;

const buckets = { 'ok-single': [], 'ok-original': [], 'ok-same-era': [], review: [], broken: [], unknown: [] };

for (const v of Object.values(scan)) {
  const card = v.cards[0];
  if (v.mbStatus !== 200) { buckets.unknown.push({ rg: v.rg, ...card, why: `MB HTTP ${v.mbStatus}` }); continue; }
  const withArt = v.releases.filter(r => r.front);
  if (!withArt.length) { buckets.broken.push({ rg: v.rg, ...card, why: '沒有任何 release 有正面圖' }); continue; }
  if (withArt.length === 1) { buckets['ok-single'].push(v); continue; }

  const served = v.releases.find(r => r.id === v.served);
  if (!served) { buckets.unknown.push({ rg: v.rg, ...card, why: 'CAA 服務的 release 不在 MB 清單內' }); continue; }
  const sorted = [...withArt].sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const original = sorted[0];
  if (served.id === original.id) { buckets['ok-original'].push(v); continue; }

  const ys = year(served.date), yo = year(original.date);
  const sameCountry = served.country && original.country && served.country === original.country;
  if (sameCountry && ys && yo && ys === yo) { buckets['ok-same-era'].push(v); continue; }

  const digital = /Digital Media/i.test(served.format || '') || !served.date;
  const gap = (ys && yo) ? Math.abs(ys - yo) : 0;
  const score = (sameCountry ? 0 : 100) + (digital ? 80 : 0) + Math.min(gap, 60);

  buckets.review.push({
    rg: v.rg, artist: card.artist, album: card.album, batch: card.batch,
    served, original,
    alternatives: sorted.filter(r => r.id !== served.id).slice(0, 8),
    diffCountry: !sameCountry, digital, yearGap: gap, score,
  });
}
buckets.review.sort((a, b) => b.score - a.score || a.artist.localeCompare(b.artist));

const total = Object.values(buckets).reduce((s, l) => s + l.length, 0);
console.log(`已掃 ${total} 個 release-group`);
for (const [k, l] of Object.entries(buckets)) console.log(`  ${k.padEnd(12)} ${String(l.length).padStart(5)}  (${(l.length / total * 100).toFixed(1)}%)`);
const R = buckets.review;
console.log(`\n需人工看圖 ${R.length} 張，分層：`);
console.log(`  國別不同＋數位重發  ${R.filter(r => r.diffCountry && r.digital).length}`);
console.log(`  只有國別不同        ${R.filter(r => r.diffCountry && !r.digital).length}`);
console.log(`  只有數位重發        ${R.filter(r => !r.diffCountry && r.digital).length}`);
console.log(`  同國別、只差年份    ${R.filter(r => !r.diffCountry && !r.digital).length}`);
console.log('\n最可疑的前 12 筆：');
for (const r of R.slice(0, 12)) {
  console.log(`  [${r.score}] ${r.artist} — ${r.album}`);
  console.log(`        服務: ${r.served.date || '無日期'} ${r.served.country || '--'} ${r.served.format || ''} ${r.served.label || ''}`);
  console.log(`        原版: ${r.original.date || '無日期'} ${r.original.country || '--'} ${r.original.format || ''} ${r.original.label || ''}`);
}
fs.writeFileSync(path.join(OUT, 'edition-review.json'), JSON.stringify(buckets, null, 1));
console.log(`\n→ data/edition-review.json`);
