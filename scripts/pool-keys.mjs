#!/usr/bin/env node
// 重建全池 artist|album 鍵檔。
// 2026-08-23 修正兩個曾經漏掉的來源／寫法問題：
//   1) apex_pool.json 是「物件（hall/pearl/heresy 三個陣列）」不是陣列，
//      舊版用 for..of 直接迭代會拋錯，被 try/catch 吞掉 → 634 張王牌從未進入去重集。
//   2) 正規化沒有摺 U+2010–2015 連字號，a‐ha／Drive‐By Truckers／B‐52s 這類
//      在 ASCII grep 下必然零命中，會被誤判為「池內沒有」。
import fs from 'node:fs';
const R = '/home/user/dip-vinyl-shop';
const OUT = '/tmp/claude-0/-home-user-dip-vinyl-shop/aa6a484f-781a-53fb-8821-e33e901fb76d/scratchpad/pool-data';

export const norm = s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-')       // U+2010..U+2015 與全形連字號
  .normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '');
export const key = (a, b) => norm(a) + '|' + norm(b);

const raw = [];   // 原字，供人工閱讀
const keys = new Set();
const add = (a, b, src) => { raw.push(`${a}|${b}`); keys.add(key(a, b)); };

for (const r of JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'))) add(r[0], r[1], 'seed');
const apex = JSON.parse(fs.readFileSync(`${R}/apex_pool.json`, 'utf8'));
let apexN = 0;
for (const tier of Object.keys(apex)) for (const r of apex[tier]) { add(r[0], r[1], `apex:${tier}`); apexN++; }
let manN = 0;
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x)))
  for (const a of (JSON.parse(fs.readFileSync(`${R}/${f}`, 'utf8')).albums || [])) { add(a.artist, a.album, f); manN++; }

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/pool-all-keys.txt`, raw.join('\n') + '\n');
fs.writeFileSync(`${OUT}/pool-all-keys-normalized.txt`, [...keys].sort().join('\n') + '\n');
console.log(`seed ${raw.length - apexN - manN} ＋ apex ${apexN} ＋ manifest ${manN} = ${raw.length} 筆原字`);
console.log(`正規化後不重複鍵 ${keys.size}（差額 ${raw.length - keys.size} 是池內既有的重複或同碟異名）`);
