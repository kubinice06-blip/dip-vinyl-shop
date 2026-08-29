// 步驟 3b：挑「曲風分類器認得出來」的藝人名寫法
// 用法：node 3b-optimize-names.mjs <步驟3的輸出檔> [輸出檔]
//
// 為什麼需要這步：/album-genres 靠 Spotify／Last.fm 標籤，藝人名寫法不同結果差很多，
// 而且沒有單一規則可套（實測三盲鼠）：
//   Hideto Kanai & King's Roar → jazz ✓ ／ Hideto Kanai → 無 ✗   （縮短反而查不到）
//   Masaru Imada Trio +2 → 無 ✗ ／ Masaru Imada Trio → jazz ✓     （縮短才查得到）
// 曲風標籤會決定卡片屬於哪個曲風流派的抽牌池，所以要逐張試候選寫法、挑真的查得到的那個。
import fs from 'fs';

const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const inPath = process.argv[2];
const outPath = process.argv[3] || inPath.replace(/\.json$/, '-named.json');
// 期望曲風（本批的主題），命中它的寫法優先採用；不給就只要求「查得到任何曲風」
const WANT = process.argv[4] || null;
if (!inPath) { console.error('用法: node 3b-optimize-names.mjs <步驟3輸出檔> [輸出檔] [期望曲風如 jazz]'); process.exit(1); }

const cards = JSON.parse(fs.readFileSync(inPath, 'utf-8'));

function variants(c) {
  const orig = c.artistOriginal || c.artist;
  const set = new Set([c.artist, orig]);
  for (const base of [c.artist, orig]) {
    set.add(base.replace(/\s*\+\s*\d+\s*$/, '').trim());   // 去掉結尾 "+2" / "+ 1"
    set.add(base.replace(/\/.*$/, '').trim());              // "Quartet/Quintet" → "Quartet"
    set.add(base.split(/\s*&\s*/)[0].trim());               // 只留第一位掛名
  }
  return [...set].filter(Boolean);
}
async function genresOf(artist, album) {
  try {
    const r = await fetch(`${W}/album-genres?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`, { signal: AbortSignal.timeout(25000) });
    return r.ok ? ((await r.json()).genres || []) : [];
  } catch (e) { return []; }
}

let renamed = 0, none = 0;
for (const c of cards) {
  let best = null;
  for (const v of variants(c)) {
    const g = await genresOf(v, c.album);
    await sleep(250);
    if (WANT && g.includes(WANT)) { best = { name: v, genres: g }; break; }
    if (!WANT && g.length) { best = { name: v, genres: g }; break; }
    if (g.length && !best) best = { name: v, genres: g };
  }
  if (best) {
    if (best.name !== c.artist) { console.log(`↻ ${c.artist} → ${best.name}  [${best.genres}] (${c.album})`); c.artist = best.name; renamed++; }
    c.genres = best.genres;
  } else { none++; c.genres = []; console.log(`· 無曲風標籤: ${c.artist} - ${c.album}`); }
}
fs.writeFileSync(outPath, JSON.stringify(cards, null, 1));
console.log(`\n改名 ${renamed} 張；仍無曲風標籤 ${none} 張 → ${outPath}`);
if (WANT) console.log(`會被算進 ${WANT} 的: ${cards.filter(c => (c.genres || []).includes(WANT)).length}/${cards.length}`);

console.log(`
⚠ 人工覆核：改名有可能換到「查得到但分錯類」的寫法。
   實例：Shuko Mizuno's "Jazz Orchestra '75" 縮成 "Shuko Mizuno"（現代古典作曲家）→ 被判 classical，
   改用同專輯的樂團名 "Toshiyuki Miyama & The New Herd" 才正確回到 jazz。
   請掃一眼有沒有卡片被歸到與本批主題明顯不符的曲風。`);
