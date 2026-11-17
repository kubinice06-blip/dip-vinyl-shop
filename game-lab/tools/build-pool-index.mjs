// build-pool-index.mjs：遊戲卡池索引 game-lab/pool-index.json（v5 第六項第一期，2026-11-15；第 B 波 v2，2026-11-16）。
//
//   node game-lab/tools/build-pool-index.mjs           # 從 content.js 的整池（C.cards）重產 pool-index.json
//   node game-lab/tools/build-pool-index.mjs --check   # 只比對：跟整池不一致就 exit 1（check-content.mjs 也跑同一份比對）
//
// 格式 v2（第 B 波 SPEC-B §1.2、§2.4）：{ "v": 2, "n": 張數, "h": [fnv1a32(catalogId)…由小到大] }
//   卡片 id 已經就是主站 catalogId（index.html cardIdOf＝bake-cards.mjs catalogId＝Firestore 唱片櫃的文件 id）：
//   (藝人 + '|' + 專輯).toLowerCase()，斜線換成連字號。不必再對照，只要讓主站知道「這張遊戲裡有」→ 只放雜湊（物件形狀 83 KB gz → 24 KB gz）。
//   fnv1a32＝engine.js／dip-tune.js 同一條（UTF-16 code unit、0x811c9dc5、0x01000193）。撞號 → 失敗（實測 0）。
//   舊格式 v1 是 { 主站 cardId: 遊戲卡 id } 物件；主站 index.html 兩種形狀都吃（WP6）。
// 收：C.cards 裡沒有 tier、不是傳奇的卡（扣掉三張王牌與頂點試做、125 張傳奇）；王牌、頂點卡不能當種子（engine.canSeed），傳奇帶上場太好打、
//   店裡不收（主線 M2；ui.js bringOk）——放進來的話主站照樣出鈕、點了一定被擋。
// 用途：主站頻率光譜結果頁的卡在這份裡，才出「⚔ 帶去店裡對決」（連到 game-lab/?card=<catalogId>）。
// 整池一律讀 require('content.js').cards（核心 cards.js＋cards-pool.js 展開）；cards.js 只有核心 368，讀它會寫出 323 筆的索引。
// 重烘 cards.js／cards-pool.js 之後重跑一次；漏了 check-content 會擋。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..');
const require = createRequire(import.meta.url);
export const POOL_INDEX = path.join(LAB, 'pool-index.json');

export const catalogId = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
export const fnv1a32 = s => { let h = 0x811c9dc5; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0; };

const allCards = () => require(path.join(LAB, 'content.js')).cards;
const EN = require(path.join(LAB, 'engine.js'));
// 帶得進遊戲的：非頂點、不是傳奇（＝ui.js bringOk 的卡池那半；canSeed＝卡在、沒有 tier）
const nonApexIds = cards => Object.keys(cards).filter(id => cards[id] && !cards[id].tier && EN.rarity(cards[id]) !== 'legendary');

// cards（C.cards：id → 卡）→ { v: 2, n, h }（h 排序、去重；撞號時 h 會比 n 少，poolIndexProblems 擋）
export function poolIndexOf(cards) {
  const ids = nonApexIds(cards);
  const h = [...new Set(ids.map(fnv1a32))].sort((a, b) => a - b);
  return { v: 2, n: ids.length, h };
}
// 一行一個雜湊（diff 好看）
export function poolIndexText(cards) {
  const ix = poolIndexOf(cards);
  return '{"v":2,"n":' + ix.n + ',"h":[\n' + ix.h.join(',\n') + '\n]}\n';
}

// 比對：檔案在、可以解析、是 v2 形狀、跟整池算出來的一模一樣；張數＝非頂點、非傳奇張數、0 撞號；每張的 id＝catalogId(藝人, 專輯)、主站卡池（seed_cards.json）找得到
export function poolIndexProblems(cards) {
  cards = cards || allCards();
  const probs = [];
  let file = null;
  try { file = JSON.parse(fs.readFileSync(POOL_INDEX, 'utf8')); } catch (e) { return ['pool-index.json 讀不到或不是 JSON（node game-lab/tools/build-pool-index.mjs 重產）：' + e.message]; }
  const want = poolIndexOf(cards);
  const ids = nonApexIds(cards);
  if (!file || file.v !== 2 || !Array.isArray(file.h)) probs.push('pool-index.json 不是 v2 形狀 {v:2, n, h:[…]}（node game-lab/tools/build-pool-index.mjs 重產）');
  if (want.h.length !== ids.length) {
    const by = new Map(); for (const id of ids) { const k = fnv1a32(id); by.set(k, (by.get(k) || []).concat(id)); }
    probs.push('fnv1a32 撞號 ' + (ids.length - want.h.length) + ' 組：' + [...by.values()].filter(a => a.length > 1).slice(0, 3).map(a => a.join(' ／ ')).join('、'));
  }
  if (file && (file.n !== want.n || JSON.stringify(file.h) !== JSON.stringify(want.h))) probs.push(`pool-index.json 跟整池不一致（檔案 ${file.n} 張／${(file.h || []).length} 個雜湊、整池 ${want.n} 張／${want.h.length} 個）；node game-lab/tools/build-pool-index.mjs 重產`);
  const badId = ids.filter(id => id !== catalogId(cards[id].artist, cards[id].album));
  if (badId.length) probs.push(`${badId.length} 張卡的 id 不等於 catalogId(藝人, 專輯)（主站算出來的對不上）：${badId.slice(0, 5).join('、')}`);
  try {
    const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
    const have = new Set(seed.map(r => catalogId(r[0], r[1])));
    const lost = ids.filter(id => !have.has(id));
    if (lost.length) probs.push(`${lost.length} 張主站卡池（seed_cards.json）找不到，主站不會出「帶去店裡對決」：${lost.slice(0, 5).join('、')}`);
  } catch (e) { probs.push('seed_cards.json 讀不到：' + e.message); }
  return probs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cards = allCards();
  if (process.argv.includes('--check')) {
    const p = poolIndexProblems(cards);
    if (p.length) { console.error(p.join('\n')); process.exit(1); }
    console.log(`pool-index.json OK（v2：${poolIndexOf(cards).n} 張，扣掉王牌、頂點卡與傳奇）`);
  } else {
    fs.writeFileSync(POOL_INDEX, poolIndexText(cards));
    console.log(`寫入 ${path.relative(ROOT, POOL_INDEX)}：v2、${poolIndexOf(cards).n} 張（扣掉王牌、頂點卡與傳奇）`);
    const p = poolIndexProblems(cards);
    if (p.length) { console.error(p.join('\n')); process.exit(1); }
  }
}
