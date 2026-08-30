#!/usr/bin/env node
// 重建全池 artist|album 鍵檔。
// 2026-08-23 修正兩個曾經漏掉的來源／寫法問題：
//   1) apex_pool.json 是「物件（hall/pearl/heresy 三個陣列）」不是陣列，
//      舊版用 for..of 直接迭代會拋錯，被 try/catch 吞掉 → 634 張王牌從未進入去重集。
//   2) 正規化沒有摺 U+2010–2015 連字號，a‐ha／Drive‐By Truckers／B‐52s 這類
//      在 ASCII grep 下必然零命中，會被誤判為「池內沒有」。
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
// 路徑相對於本腳本，本機與雲端都能跑（原本寫死 /home/user/dip-vinyl-shop，只有雲端環境能用）
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// 原本寫死某次雲端工作階段的 /tmp 路徑，本機跑必然失敗。改成 repo 內的 gitignore 目錄。
const OUT = path.join(R, 'batch-progress', 'pool-data');

export const norm = s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-')       // U+2010..U+2015 與全形連字號
  .normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '');
export const key = (a, b) => norm(a) + '|' + norm(b);

const raw = [];   // 原字，供人工閱讀
const keys = new Set();
const add = (a, b, src) => { raw.push(`${a}|${b}`); keys.add(key(a, b)); };

// 2026-08-30 起單一卡池檔：每列第 9 欄有 tier 的就是王牌（合併前王牌另存 apex_pool.json）
let apexN = 0;
for (const r of JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'))) {
  add(r[0], r[1], r[8] ? `apex:${r[8]}` : 'seed');
  if (r[8]) apexN++;
}
let manN = 0;
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x)))
  for (const a of (JSON.parse(fs.readFileSync(`${R}/${f}`, 'utf8')).albums || [])) { add(a.artist, a.album, f); manN++; }

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/pool-all-keys.txt`, raw.join('\n') + '\n');
fs.writeFileSync(`${OUT}/pool-all-keys-normalized.txt`, [...keys].sort().join('\n') + '\n');
console.log(`seed ${raw.length - apexN - manN} ＋ apex ${apexN} ＋ manifest ${manN} = ${raw.length} 筆原字`);
console.log(`正規化後不重複鍵 ${keys.size}（差額 ${raw.length - keys.size} 是池內既有的重複或同碟異名）`);
