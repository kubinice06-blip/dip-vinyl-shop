// c-50「目錄深度第二輪」第一批的目標名單產生器。
// 用法：node batch-progress/c50/build-targets.mjs
//
// 藍圖（MUSIC_DATABASE_ROADMAP.md 第七節）說補「前 1,500 位正典藝人」到平均 6 張。
// 實作時要注意兩件事：
//
// 1. **前 1,500 位 ≒ 卡數 ≥3 的藝人**（第 1,500 名門檻實測是 3 張）。但 ≥5 張那群
//    平均已經 7.1 張、早就達標，真正的缺口在 **3–5 張**那一層。
// 2. 稽核報告第五節反模式第一條是「先確認每位藝人**第一張該有的**在不在，再談深度」，
//    而它舉的例子（Strokes 有《Room on Fire》卻缺《Is This It》、a-ha 缺
//    《Hunting High and Low》）全是淺收藏藝人，不是深收藏藝人。
//
// 因此第一批鎖定的是交集：**招牌作已進頂點池、普卡目錄卻只有 3–5 張**的藝人。
// 他們的正典地位已由頂點卡驗證過，canon 明確、MB 覆蓋好，是深度補完裡把握最高的一群。
//
// 欄位順序有陷阱：seed_cards 是 [artist, album, classic, obscurity, accessibility, genres[], year]，
// apex_pool 是 [artist, album, genres[], year]——兩者的 genres 與 year 索引不同。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c50');
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const apex = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));

const m = new Map();
const add = (artist, album, genres, year, src) => {
  if (!m.has(artist)) m.set(artist, { artist, genres: new Set(), albums: [] });
  const o = m.get(artist);
  (Array.isArray(genres) ? genres : []).forEach(g => o.genres.add(g));
  o.albums.push({ album, year, src });
};
for (const r of seed) add(r[0], r[1], r[5], r[6], 'seed');
for (const tier of ['hall', 'pearl', 'heresy']) for (const r of apex[tier]) add(r[0], r[1], r[2], r[3], tier);

// Various Artists 是合輯桶不是藝人，深度補完不適用
const mid = [...m.values()]
  .filter(x => x.albums.length >= 3 && x.albums.length <= 5 && x.artist !== 'Various Artists')
  .map(x => ({
    artist: x.artist, n: x.albums.length, genres: [...x.genres],
    albums: x.albums.sort((p, q) => (p.year || 0) - (q.year || 0)),
  }))
  .sort((p, q) => q.n - p.n || p.artist.localeCompare(q.artist));
fs.writeFileSync(path.join(DIR, 'artists-3to5.json'), JSON.stringify(mid, null, 1));

const targets = mid.filter(x => x.albums.some(z => z.src !== 'seed'));
console.log(`3–5 張的藝人 ${mid.length} 位｜其中有頂點卡的 ${targets.length} 位（本批目標）`);
console.log(`目標群目前持有 ${targets.reduce((p, c) => p + c.n, 0)} 張｜補到 6 的理論上限 +${targets.reduce((p, c) => p + (6 - c.n), 0)}`);

// 依主曲風輪流分派到五組，讓每組的曲風組成接近（避免某組全是搖滾、某組全是爵士）
const byGenre = {};
for (const x of targets) (byGenre[x.genres[0] || '(none)'] ||= []).push(x);
const KEYS = ['a', 'b', 'c', 'd', 'e'];
const groups = Object.fromEntries(KEYS.map(k => [k, []]));
let i = 0;
for (const [, list] of Object.entries(byGenre).sort((p, q) => q[1].length - p[1].length)) {
  for (const x of list) groups[KEYS[i++ % 5]].push(x);
}
for (const k of KEYS) {
  fs.writeFileSync(path.join(DIR, `cur-${k}.json`), JSON.stringify(groups[k], null, 1));
  const g = {};
  groups[k].forEach(x => { g[x.genres[0] || '?'] = (g[x.genres[0] || '?'] || 0) + 1; });
  console.log(`  cur-${k}: ${groups[k].length} 位（${Object.entries(g).map(e => e.join(' ')).join('、')}）`);
}
