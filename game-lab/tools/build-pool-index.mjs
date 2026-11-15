// build-pool-index.mjs：遊戲卡池索引 game-lab/pool-index.json（v5 第六項第一期，2026-11-15）。
//
//   node game-lab/tools/build-pool-index.mjs           # 從 cards.js 重產 pool-index.json
//   node game-lab/tools/build-pool-index.mjs --check   # 只比對：跟 cards.js 不一致就 exit 1（check-content.mjs 也跑同一份比對）
//
// 格式：{ 主站 cardId: 遊戲卡 id }。主站 cardId＝index.html cardIdOf（＝bake-cards.mjs catalogId＝Firestore 唱片櫃的文件 id）：
//   (藝人 + '|' + 專輯).toLowerCase()，斜線換成連字號；遊戲卡 id 是另一套 slug（316 張只有 40 張剛好等於 cardId 換字），不能用推的。
// 扣掉遊戲的三張王牌（tier）：王牌不能當種子（engine.canSeed），帶不進遊戲。
// 用途：主站頻率光譜結果頁的卡在這份裡，才出「⚔ 帶去店裡對決」（連到 game-lab/?card=<遊戲卡 id>）。
// 加卡、重烘 cards.js 之後重跑一次；漏了 check-content 會擋。
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

// cards（cards.js 的物件：id → 卡）→ { cardId: 遊戲卡 id }，鍵排序（diff 好看）
export function poolIndexOf(cards) {
  const out = {};
  for (const id of Object.keys(cards)) {
    const c = cards[id];
    if (!c || c.tier) continue;
    out[catalogId(c.artist, c.album)] = id;
  }
  return Object.fromEntries(Object.keys(out).sort().map(k => [k, out[k]]));
}
export function poolIndexText(cards) {
  const ix = poolIndexOf(cards);
  return '{\n' + Object.keys(ix).map(k => JSON.stringify(k) + ':' + JSON.stringify(ix[k])).join(',\n') + '\n}\n';
}

// 比對：檔案在、可以解析、跟 cards.js 算出來的一模一樣；每個 cardId 主站卡池（seed_cards.json）找得到；兩張遊戲卡不能撞同一個 cardId
export function poolIndexProblems(cards) {
  cards = cards || require(path.join(LAB, 'cards.js'));
  const probs = [];
  let file = null;
  try { file = JSON.parse(fs.readFileSync(POOL_INDEX, 'utf8')); } catch (e) { return ['pool-index.json 讀不到或不是 JSON（node game-lab/tools/build-pool-index.mjs 重產）：' + e.message]; }
  const want = poolIndexOf(cards);
  const nonApex = Object.keys(cards).filter(id => cards[id] && !cards[id].tier);
  if (Object.keys(want).length !== nonApex.length) probs.push(`兩張以上遊戲卡撞同一個 cardId（${nonApex.length} 張非王牌、索引 ${Object.keys(want).length} 筆）`);
  const fk = Object.keys(file), wk = Object.keys(want);
  const miss = wk.filter(k => file[k] !== want[k]), extra = fk.filter(k => !(k in want));
  if (miss.length || extra.length) probs.push(`pool-index.json 跟 cards.js 不一致（少／錯 ${miss.length}、多 ${extra.length}：${miss.concat(extra).slice(0, 5).join('、')}）；node game-lab/tools/build-pool-index.mjs 重產`);
  for (const id of Object.keys(file)) if (!cards[file[id]] || cards[file[id]].tier) probs.push(`pool-index.json 的 ${id} → ${file[id]} 不是可以帶的遊戲卡`);
  try {
    const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
    const ids = new Set(seed.map(r => catalogId(r[0], r[1])));
    const lost = wk.filter(k => !ids.has(k));
    if (lost.length) probs.push(`pool-index.json 有 ${lost.length} 張主站卡池（seed_cards.json）找不到，主站不會出「帶去店裡對決」：${lost.slice(0, 5).join('、')}`);
  } catch (e) { probs.push('seed_cards.json 讀不到：' + e.message); }
  return probs;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cards = require(path.join(LAB, 'cards.js'));
  if (process.argv.includes('--check')) {
    const p = poolIndexProblems(cards);
    if (p.length) { console.error(p.join('\n')); process.exit(1); }
    console.log(`pool-index.json OK（${Object.keys(poolIndexOf(cards)).length} 筆，扣掉王牌）`);
  } else {
    fs.writeFileSync(POOL_INDEX, poolIndexText(cards));
    console.log(`寫入 ${path.relative(ROOT, POOL_INDEX)}：${Object.keys(poolIndexOf(cards)).length} 筆（扣掉王牌）`);
    const p = poolIndexProblems(cards);
    if (p.length) { console.error(p.join('\n')); process.exit(1); }
  }
}
