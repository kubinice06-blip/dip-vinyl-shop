// 跨批去重（2026-09-02，c-65 發現）。
// `chk-prop` 只比對「線上池」與「批內跨組」，**不比對其他待上架的批次**——
// 這個縫隙讓 c-58／c-59／c-60 與 c-65 之間漏了 5 筆重複。
//
// 比對用的正規化要保留所有文字系統：第一版用 [^a-z0-9...] 過濾，
// 把西里爾與希臘文整個壓成空字串，於是 c-53 的 69 張與 c-62 的 38 張
// 彼此「全部撞卡」——誤報 76 筆。改用 \p{L}\p{N} 就對了。
//
// 用法：node batch-progress/dedup-crossbatch.mjs [批名...]（省略＝掃全部 c5x／c6x）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const DIR = path.join(ROOT, 'desc-tools/batches/cards');
const batches = process.argv.slice(2).length ? process.argv.slice(2)
  : fs.readdirSync(DIR).filter(f => /^c\d+-cards\.json$/.test(f)).map(f => f.replace('-cards.json', '')).sort();

const strip = s => String(s || '')
  .replace(/[（(\[][^）)\]]*[）)\]]/g, ' ')
  .replace(/\b(original\s+)?soundtrack\b/gi, ' ')
  .replace(/\b(remaster(ed)?|reissue|deluxe|expanded|edition|anniversary)\b/gi, ' ')
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, '');          // 保留所有文字系統，只丟標點與空白

const seen = new Map();
const dup = [];
for (const b of batches) {
  const f = path.join(DIR, `${b}-cards.json`);
  if (!fs.existsSync(f)) { console.log(`${b}：查無卡單，略過`); continue; }
  for (const c of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    const k = strip(c.artist) + '|' + strip(c.album);
    if (seen.has(k)) dup.push({ b, c, prev: seen.get(k) });
    else seen.set(k, { b, c });
  }
}
for (const d of dup)
  console.log(`⚠ ${d.b} ${d.c.artist}《${d.c.album}》${d.c.year}  ←→  ${d.prev.b} ${d.prev.c.artist}《${d.prev.c.album}》${d.prev.c.year}`);
console.log(`\n${batches.length} 批｜卡數 ${seen.size + dup.length}｜跨批撞卡 ${dup.length}`);
process.exit(dup.length ? 1 : 0);
