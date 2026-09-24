// jp-2 線：重算 `domestic`，因為列舉層那一欄整欄失效。
//
// ⚠ 2026-09-24（c-183 a 組開線第一批就抓到，主線第 1953-B 條）：
// 列舉時的判準是「掛名藝人 country=JP **或** RG 初版國家含 JP」，
// **而後半那一句把「在日本發過片的外國藝人」全部標成本土**
// ——Miles Davis／Archie Shepp／Cecil Taylor／Jack DeJohnette 在 CBS/Sony・Denon・Trio 的
// 日本盤全是 `domestic: true`。c-183 a 組 19 張裡 4 張（21%）是外國藝人。
// ⚠ **jp-1 的四家列舉檔用的是另一支腳本、欄位叫 `foreignArtist`，那一欄是對的**
// （jp-1 因此正確剔掉 412 張）；**出錯的是 jp-2 這十五家。**
//
// 改法：**只認掛名藝人的 country**（MB `artist/<id>` 的 `country`／`area`），不看 release 國家。
// ⚠ **MB 沒給 country 的藝人**（日本獨立廠牌的樂手很常見）→ 退回看別名：
// **有假名／漢字變體就當本土**，兩者都沒有才標成非本土並列進報告給人看。
//
// 用法：node batch-progress/jp2-fix-domestic.mjs c184 c185 …   （不給批次就只印報告）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const RGC = path.join(ROOT, 'batch-progress/enum/jp-1-rg-cache.json');
const CNT = path.join(ROOT, 'batch-progress/enum/jp-artist-country.json');
const rgc = JSON.parse(fs.readFileSync(RGC, 'utf8'));
const arc = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/enum/jp-1-artist-cache.json'), 'utf8'));
let cnt = {}; try { cnt = JSON.parse(fs.readFileSync(CNT, 'utf8')); } catch {}

const batches = process.argv.slice(2);
const slices = {};
for (const b of batches) slices[b] = JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/c${b.replace(/^c/, '')}/slice.json`), 'utf8'));

// 先把要查的藝人湊齊
const need = new Set();
for (const rows of Object.values(slices)) for (const r of rows)
  for (const id of (rgc[r.rgMbid]?.artistIds || [])) if (!(id in cnt)) need.add(id);
let n = 0;
for (const id of need) {
  n++;
  try {
    const res = await fetch(`https://musicbrainz.org/ws/2/artist/${id}?fmt=json`, { headers: { 'User-Agent': UA } });
    if (res.ok) { const j = await res.json(); cnt[id] = j.country || j.area?.iso_3166_1_codes?.[0] || ''; }
    else cnt[id] = '';
  } catch { cnt[id] = ''; }
  await sleep(1100);
  if (n % 25 === 0) { fs.writeFileSync(CNT, JSON.stringify(cnt, null, 1)); process.stderr.write(`\r藝人國別 ${n}/${need.size}   `); }
}
fs.writeFileSync(CNT, JSON.stringify(cnt, null, 1));
process.stderr.write('\n');

const CJK = s => /[぀-ヿ一-鿿]/.test(String(s || ''));
const verdict = r => {
  const ids = rgc[r.rgMbid]?.artistIds || [];
  const cs = ids.map(id => cnt[id]).filter(Boolean);
  if (cs.includes('JP')) return { domestic: true, how: 'artist country=JP' };
  if (cs.length) return { domestic: false, how: `artist country=${[...new Set(cs)].join('/')}` };
  const vars = ids.flatMap(id => arc[id]?.variants || []).concat([r.artist]);
  if (vars.some(CJK)) return { domestic: true, how: '無 country，但別名有假名／漢字' };
  return { domestic: false, how: '無 country、別名全羅馬字' };
};

let flipped = 0, total = 0;
const report = [];
for (const [b, rows] of Object.entries(slices)) {
  for (const r of rows) {
    total++;
    const v = verdict(r);
    r.domesticRecheck = v;
    if (!v.domestic) { flipped++; report.push(`[${b}] ${r.artist} —《${r.album}》${r.year}｜${r.house}｜${v.how}`); }
  }
  fs.writeFileSync(path.join(ROOT, `batch-progress/${b}/slice.json`), JSON.stringify(rows, null, 1) + '\n');
}
console.log(`重算 ${total} 張｜判成非本土 ${flipped} 張（${(flipped / total * 100).toFixed(0)}%）\n`);
for (const line of report) console.log('  ' + line);
