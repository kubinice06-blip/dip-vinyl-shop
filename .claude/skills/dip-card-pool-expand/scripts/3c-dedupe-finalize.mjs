// 步驟 3c：出手前的最後去重 —— 精選流程用「rank 排序 + 分批解封面」，
// 前面幾步的重複比對只用「artist+album 完全一致」的 key，兩種常見漏網會滑過去：
//   1. 同一張碟被 MusicBrainz 拆成不同 artist-credit 字串（"Chet Baker" vs "Chet Baker Trio"、
//      "Sun Ra & Walt Dickerson" vs "Walt Dickerson & Sun Ra"）→ 同一批候選內部就重複了。
//   2. 藝人名字尾差一個詞（"Duke Jordan" vs "Duke Jordan Trio"）→ 專輯名完全一樣，
//      但因為 artist+album 組合 key 不同，逃過了「排除與現有卡池重複」那關。
// 用法：node 3c-dedupe-finalize.mjs <帶封面的候選清單.json（含 rank 或依序即為排名）> [輸出檔]
import fs from 'fs';

const SEED = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/seed_cards.json';
const norm = s => s.toLowerCase().replace(/[^a-z0-9ぁ-ヿ一-鿿]/g, '');
const albumKey = c => norm(c.title || c.album);

const inPath = process.argv[2];
const outPath = process.argv[3] || inPath.replace(/\.json$/, '-deduped.json');
if (!inPath) { console.error('用法: node 3c-dedupe-finalize.mjs <候選清單.json> [輸出檔]'); process.exit(1); }

let rows = JSON.parse(fs.readFileSync(inPath, 'utf-8'));
rows = rows.map((c, i) => ({ ...c, _rank: c.rank ?? i }));

// 1) 批次內部：同專輯名（忽略藝人寫法差異）只留 rank 最好的一筆
const byAlbum = new Map();
for (const c of rows) {
  const k = albumKey(c);
  if (!byAlbum.has(k) || c._rank < byAlbum.get(k)._rank) byAlbum.set(k, c);
}
const internalDrop = rows.length - byAlbum.size;
let kept = [...byAlbum.values()];

// 2) 對現有卡池：專輯名相同 + 藝人名有共同字詞（處理 "X" vs "X Trio" 這種尾綴差異）
//    apex_pool.json 也要比——王牌卡不在 seed 裡，漏比會造成一卡兩身分（2026-07-22 工業批實際踩到 5 張）
const APEX = SEED.replace(/seed_cards\.json$/, 'apex_pool.json');
const seed = JSON.parse(fs.readFileSync(SEED, 'utf-8'));
const apexPool = JSON.parse(fs.readFileSync(APEX, 'utf-8'));
const seedByAlbum = new Map();
for (const [artist, album] of [...seed, ...Object.values(apexPool).flat()]) {
  const k = norm(album);
  if (!seedByAlbum.has(k)) seedByAlbum.set(k, []);
  seedByAlbum.get(k).push(artist);
}
const artistTokens = a => norm(a).length ? [norm(a)] : [];
// 簡化：正規化後互相包含即視為同一位藝人的變體寫法（"dukejordan" 是 "dukejordantrio" 的前綴）
const sameArtist = (a, b) => {
  const na = norm(a), nb = norm(b);
  return na.length > 2 && nb.length > 2 && (na.includes(nb) || nb.includes(na));
};
const dupWithSeed = [];
kept = kept.filter(c => {
  const existing = seedByAlbum.get(albumKey(c)) || [];
  const clash = existing.some(a => sameArtist(a, c.artist));
  if (clash) dupWithSeed.push(c);
  return !clash;
});

fs.writeFileSync(outPath, JSON.stringify(kept, null, 1));
console.log(`批次內部同名去重: ${internalDrop} 筆`);
if (dupWithSeed.length) {
  console.log(`與現有卡池撞名（藝人名變體）: ${dupWithSeed.length} 筆`);
  dupWithSeed.forEach(c => console.log(`  ${c.artist} - ${c.title || c.album}`));
}
console.log(`最終 ${kept.length} 張 → ${outPath}`);
