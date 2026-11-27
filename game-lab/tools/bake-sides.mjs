// bake-sides.mjs：第 E 波番外盤名單（SPEC-E §1.5）。tools/sides-list.json（唯一真本：id、type、why、src）→ content.js 的 C.sides.list（只有 id，照 id 排序）。
//
//   node game-lab/tools/bake-sides.mjs           # 檢查名單、寫進 content.js「// <sides-list>」與「// </sides-list>」兩行標記之間
//   node game-lab/tools/bake-sides.mjs --check   # 只比對：名單有錯、或 content.js 跟名單不一致就 exit 1（check-content.mjs sideProblems 也跑同一份比對）
//
// 檢查：每個 id 都在整池 C.cards（核心 cards.js＋cards-pool.js 展開）、不是頂點卡（tier 空）、不是三張 7 星王牌；種類只能是 C.sides.kinds 的鍵；一張只在一種裡。
//   有錯就不寫、印出來（exit 1）。卡池換版時新卡預設不是番外盤：要收就照 SPEC-E §1.3 逐張判、加進 sides-list.json、重跑這支（不做自動判）。
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const LIST = path.join(HERE, 'sides-list.json');
const CONTENT = path.join(ROOT, 'content.js');
const OPEN = '// <sides-list>', CLOSE = '// </sides-list>';

// 名單 → {live:[…], ost:[…], cover:[…]}（照 kinds 的順序、id 排序）＋問題清單
export function sidesFromList(C, items) {
  const kinds = Object.keys((C.sides && C.sides.kinds) || {}), aces = new Set(Object.values(C.aces || {}));
  const out = {}, seen = {}, bad = [];
  for (const t of kinds) out[t] = [];
  for (const x of Array.isArray(items) ? items : []) {
    const id = x && x.id, t = x && x.type, c = id && C.cards[id];
    if (typeof id !== 'string' || !id) { bad.push('沒有 id：' + JSON.stringify(x)); continue; }
    if (!kinds.includes(t)) { bad.push(id + '：種類「' + t + '」不在 C.sides.kinds'); continue; }
    if (!c) { bad.push(id + '：不在整池 C.cards'); continue; }
    if (c.tier) { bad.push(id + '：是頂點卡（' + c.tier + '），不貼'); continue; }
    if (aces.has(id)) { bad.push(id + '：是 7 星王牌'); continue; }
    if (seen[id]) { bad.push(id + '：同時在 ' + seen[id] + ' 和 ' + t); continue; }
    seen[id] = t; out[t].push(id);
  }
  for (const t of kinds) out[t].sort();
  return { list: out, bad };
}
// 寫進 content.js 的那幾行（兩行標記之間；每種一行）
export function listLines(list) {
  const kinds = Object.keys(list);
  return '    list: {\n' + kinds.map((t, k) => '      ' + t + ': ' + JSON.stringify(list[t]) + (k < kinds.length - 1 ? ',' : '')).join('\n') + '\n    },\n';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes('--check');
  const C = require(CONTENT);
  const items = JSON.parse(fs.readFileSync(LIST, 'utf8')).items;
  const { list, bad } = sidesFromList(C, items);
  if (bad.length) { console.error('sides-list.json 有 ' + bad.length + ' 個問題（沒寫進 content.js）：\n  ' + bad.join('\n  ')); process.exit(1); }
  const src = fs.readFileSync(CONTENT, 'utf8'), a = src.indexOf(OPEN), b = src.indexOf(CLOSE);
  if (a < 0 || b < a) { console.error('content.js 找不到 ' + OPEN + ' … ' + CLOSE + ' 標記'); process.exit(1); }
  const head = src.slice(0, src.indexOf('\n', a) + 1), tail = src.slice(src.lastIndexOf('\n', b) + 1);
  const next = head + listLines(list) + tail;
  const n = Object.values(list).reduce((s, x) => s + x.length, 0), by = Object.entries(list).map(([t, x]) => t + ' ' + x.length).join('、');
  if (check) {
    if (next !== src) { console.error('content.js 的 C.sides.list 跟 tools/sides-list.json 不一致：重跑 node game-lab/tools/bake-sides.mjs'); process.exit(1); }
    console.log('bake-sides --check：一致（' + n + ' 張：' + by + '）'); process.exit(0);
  }
  fs.writeFileSync(CONTENT, next);
  console.log('bake-sides：寫進 content.js ' + n + ' 張（' + by + '）');
}
