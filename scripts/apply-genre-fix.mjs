#!/usr/bin/env node
// 套用 rock 誤標修正清單到 seed_cards.json。
// 用法: node apply-genre-fix.mjs [--dry]
// 預設 dry-run 只印摘要;加 --write 才真的改檔。
// 規則:只摘掉 rock,其餘標籤不動;清單標為「必補」的一併補上正確標籤,
// 絕不讓任何卡片變成無曲風(若發生就中止,不寫檔)。
import fs from 'node:fs';

const ROOT = '/home/user/dip-vinyl-shop';
const write = process.argv.includes('--write');
const fix = JSON.parse(fs.readFileSync(`${ROOT}/GENRE_FIX_ROCK_20260822.json`, 'utf8'));
const seed = JSON.parse(fs.readFileSync(`${ROOT}/seed_cards.json`, 'utf8'));

const key = (a, b) => `${a}|||${b}`;
const plan = new Map();
for (const c of fix.逐卡修正) plan.set(key(c.artist, c.album), c);
const mustAdd = new Map();
for (const c of fix.必補標籤) mustAdd.set(key(c.artist, c.album), c.必補);
// 「建議補」預設也一併套用:留著錯誤的殘餘標籤比補上正確的更糟
for (const c of fix.建議補標籤) mustAdd.set(key(c.artist, c.album), c.建議補);

let dropped = 0, added = 0, orphan = 0, missed = 0;
const orphans = [];
for (const row of seed) {
  const k = key(row[0], row[1]);
  const c = plan.get(k);
  if (!c) continue;
  if (!(row[5] || []).includes('rock')) { missed++; continue; }
  row[5] = row[5].filter(g => g !== 'rock');
  dropped++;
  const add = mustAdd.get(k);
  if (add && !row[5].includes(add)) { row[5].push(add); added++; }
  if (row[5].length === 0) { orphan++; orphans.push(k); }
}

console.log(`摘除 rock: ${dropped} 張 / 清單 ${fix.逐卡修正.length} 筆`);
console.log(`補上標籤: ${added} 張`);
console.log(`清單有但卡池找不到或本來就沒 rock: ${missed} 筆`);
console.log(`摘後無曲風: ${orphan} 張`);
if (orphan) { console.error('中止:有卡片會變成無曲風', orphans); process.exit(1); }

const rockAfter = seed.filter(r => (r[5] || []).includes('rock')).length;
console.log(`套用後 rock 標籤數: ${rockAfter}`);

if (write) {
  // 保持原檔「一行一張卡」的格式,否則 diff 會變成整檔重寫
  const body = seed.map(r => JSON.stringify(r)).join(',\n');
  fs.writeFileSync(`${ROOT}/seed_cards.json`, `[${body}]\n`);
  console.log('已寫入 seed_cards.json');
} else {
  console.log('(dry-run,未寫檔;確認無誤後加 --write)');
}
