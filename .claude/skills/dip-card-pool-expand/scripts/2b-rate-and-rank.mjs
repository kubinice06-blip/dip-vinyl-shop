// 步驟 2b（精選模式專用）：候選多、只想留精華時，先評分排序、再對短名單解封面——
// 不要對整批候選（可能上千張）都跑封面解析鏈，那對「反正大部分會被砍掉」的候選是浪費。
// 用法：node 2b-rate-and-rank.mjs <步驟1輸出檔> <保留張數> [輸出檔]
//
// 排序鍵：classic 分數（既有 /album-rating 樂評共識分）為主，同分用 Last.fm listeners 當熱門度輔助。
// 這是三盲鼠精簡時驗證過的排序法，見 SKILL.md「實績」。
import fs from 'fs';

const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const inPath = process.argv[2];
const keepN = parseInt(process.argv[3], 10);
const outPath = process.argv[4] || inPath.replace(/\.json$/, '-ranked.json');
if (!inPath || !keepN) { console.error('用法: node 2b-rate-and-rank.mjs <步驟1輸出檔> <保留張數> [輸出檔]'); process.exit(1); }

const SEED = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/seed_cards.json';
const norm = s => s.toLowerCase().replace(/[^a-z0-9ぁ-ヿ一-鿿]/g, '');
const seed = JSON.parse(fs.readFileSync(SEED, 'utf-8'));
// 2026-08-30 卡池合併：王牌就是同一份檔裡第 9 欄有 tier 的列，一次比完
// （合併前王牌另存 apex_pool.json，漏比會一卡兩身分，2026-07-22 工業批踩過）
const seedKeys = new Set(seed.map(([a, b]) => norm(a) + '|' + norm(b)));

let rows = JSON.parse(fs.readFileSync(inPath, 'utf-8'));
const before = rows.length;
rows = rows.filter(r => !seedKeys.has(norm(r.artist) + '|' + norm(r.title)));
console.log(`候選 ${before} 張，排除與現有卡池重複 ${before - rows.length} 張 → 待評分 ${rows.length} 張`);

async function rate(artist, album) {
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(`${W}/album-rating?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`, { signal: AbortSignal.timeout(20000) });
      if (r.ok) { const j = await r.json(); if (j.classic && j.obscurity && j.accessibility) return j; }
    } catch (e) { }
    await sleep(1000);
  }
  return null;
}

const rated = [];
let done = 0;
for (const r of rows) {
  const rate1 = await rate(r.artist, r.title);
  if (rate1) rated.push({ artist: r.artist, album: r.title, date: r.date, ids: r.ids, classic: rate1.classic, obscurity: rate1.obscurity, accessibility: rate1.accessibility, listeners: rate1._listeners ?? null, obSrc: rate1._obscuritySource });
  done++;
  if (done % 50 === 0) { console.log(`評分進度 ${done}/${rows.length}（已評分成功 ${rated.length}）`); fs.writeFileSync(outPath + '.partial.json', JSON.stringify(rated, null, 1)); }
  await sleep(150);
}
console.log(`評分完成 ${rated.length}/${rows.length}`);

rated.sort((a, b) => (b.classic - a.classic) || ((b.listeners ?? -1) - (a.listeners ?? -1)));
const keep = rated.slice(0, keepN);
fs.writeFileSync(outPath, JSON.stringify(keep, null, 1));
fs.writeFileSync(outPath.replace(/\.json$/, '-full-ranked.json'), JSON.stringify(rated, null, 1));

const dist = f => keep.reduce((m, c) => (m[f(c)] = (m[f(c)] || 0) + 1, m), {});
console.log(`\n取前 ${keep.length} 張 → ${outPath}（完整排序備份於 -full-ranked.json，若品質不足可調整保留數）`);
console.log('classic 分布', JSON.stringify(dist(c => c.classic)));
console.log('最低 classic 分數（門檻線）:', keep[keep.length - 1]?.classic);
