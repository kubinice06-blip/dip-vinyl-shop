// 把 manifest 濾成「還沒進卡池的卡」。
//
// **為什麼需要**：重跑舊批（補到封面、解除留置）時，build-manifest 產出的是整批，
// 但 prepare gate 對已在池中的卡會直接 error（「請先釐清是重跑或重複卡」），
// 而 publish-manifest 又會把它們當重複跳過。與其讓 gate 報一堆假錯，
// 不如先濾掉——留下來的才是這次真的要上架的。
//
// 用法：node scripts/filter-manifest-new.mjs <manifest.json> [...]
//   就地改寫；整批都已在池中的 manifest 會被刪掉（沒有東西要上架）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const poolKeyOf = (a, b) => [a, b].map(s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-').normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '')).join('|');

const files = process.argv.slice(2);
if (!files.length) { console.error('用法: node scripts/filter-manifest-new.mjs <manifest.json> [...]'); process.exit(1); }

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const inPool = new Set(seed.map(r => poolKeyOf(r[0], r[1])));

let total = 0;
for (const f of files) {
  const p = path.resolve(f);
  if (!fs.existsSync(p)) { console.log(`查無 ${f}`); continue; }
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const before = j.albums.length;
  j.albums = j.albums.filter(a => !inPool.has(poolKeyOf(a.artist, a.album)));
  if (!j.albums.length) {
    fs.unlinkSync(p);
    console.log(`${path.basename(f)}：${before} 張全部已在池中，刪掉空 manifest`);
    continue;
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 1));
  total += j.albums.length;
  console.log(`${path.basename(f)}：${before} → ${j.albums.length} 張待上架`);
}
console.log(`合計待上架 ${total} 張`);
