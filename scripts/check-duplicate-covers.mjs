// 同一張封面圖被兩張卡用到 → 幾乎一定有一張是錯的。
//
// **為什麼要單獨查這個**：封面補救的每一層都是「逐張去外部找圖」，沒有任何一層看得到
// 別張卡拿到什麼。實測抓到三種形狀，兩種都是 Apple 層造成的：
//   1. 探測層把同一個 collectionId 配給兩張不同的碟（The Swanee Quintet 的
//      《What About Me》與《Anniversary Album》都配到 1992 年那張二合一 CD）；
//   2. iTunes 模糊搜尋把 A 碟配到 B 碟的專輯頁（四分衛《W》拿到《世界》的圖）；
//   3. Discogs 的 release 圖是另一個版次的殼（趙一豪改題重發那張）。
// 這三種靠「看單張圖對不對」都很難發現——圖本身是真的唱片封面，只是屬於別張卡。
//
// 用法：node scripts/check-duplicate-covers.mjs [批名...]
//   不給批名就掃 batch-progress 底下每一批。回傳非 0 表示有撞圖。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BP = path.join(ROOT, 'batch-progress');
const args = process.argv.slice(2);
const batches = args.length ? args
  : fs.readdirSync(BP).filter(d => fs.existsSync(path.join(BP, d, 'covers.json')));

const seen = new Map();
const dups = [];
for (const b of batches) {
  const p = path.join(BP, b, 'covers.json');
  if (!fs.existsSync(p)) continue;
  // 舊批的 covers.json 有幾份是物件（鍵是「藝人|盤名」）而不是陣列，兩種都要吃
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const rows = Array.isArray(raw) ? raw
    : Object.entries(raw).map(([k, v]) => ({ artist: k.split('|')[0], album: k.split('|').slice(1).join('|'), ...v }));
  for (const r of rows) {
    if (!r.cover || !r.cover.url) continue;
    const prev = seen.get(r.cover.url);
    const here = { batch: b, artist: r.artist, album: r.album, source: r.cover.source };
    // 同一批同一張卡在兩份檔裡出現不算（跨批重收的卡另有去重機制擋）
    if (prev && !(prev.artist === r.artist && prev.album === r.album)) dups.push([prev, here]);
    else if (!prev) seen.set(r.cover.url, here);
  }
}

console.log(`掃 ${batches.length} 批｜有封面 ${seen.size} 張｜撞圖 ${dups.length} 組`);
for (const [a, b] of dups) {
  console.log(`  ${a.batch} ${a.artist}《${a.album}》[${a.source}]`);
  console.log(`  ${b.batch} ${b.artist}《${b.album}》[${b.source}]`);
  console.log('  ---');
}
process.exit(dups.length ? 1 : 0);
