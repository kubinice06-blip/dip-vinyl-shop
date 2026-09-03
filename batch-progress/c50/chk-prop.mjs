// 策展提案的機器驗證。用法：node batch-progress/c50/chk-prop.mjs [a b c d e]
//
// 擋三類問題：欄位缺漏／格式不對、與線上池撞卡、以及非 ASCII 連字號
// （MB 自己用 U+2010，抄名字時很容易一起抄進來——2026-08-10 全池 32 張污染就是這樣）。
import fs from 'node:fs';
import path from 'node:path';
import { key, ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c50');
const groups = process.argv.slice(2).length ? process.argv.slice(2) : ['a', 'b', 'c', 'd', 'e'];

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const apex = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));
const live = new Map();
const addLive = (a, b, src) => live.set(key(a) + '|' + key(b), `${a} — ${b} [${src}]`);
for (const r of seed) addLive(r[0], r[1], 'seed');
for (const t of ['hall', 'pearl', 'heresy']) for (const r of apex[t]) addLive(r[0], r[1], t);

const BAD_HYPHEN = /[‐‑‒–—―－]/;
let err = 0, warn = 0, total = 0;
const seen = new Map();

for (const g of groups) {
  const p = path.join(DIR, `prop-${g}.json`);
  if (!fs.existsSync(p)) { console.log(`⚠ prop-${g}.json 缺檔`); warn++; continue; }
  let rows;
  try { rows = JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.log(`✖ prop-${g}.json JSON 損壞：${e.message}`); err++; continue; }
  console.log(`\n=== prop-${g}：${rows.length} 張、${new Set(rows.map(r => r.artist)).size} 位藝人 ===`);
  total += rows.length;
  for (const r of rows) {
    const tag = `[${g}] ${r.artist} — ${r.album}`;
    for (const f of ['artist', 'album', 'why']) {
      if (!String(r[f] || '').trim()) { console.log(`  ✖ ${tag}：缺 ${f}`); err++; }
    }
    if (!Array.isArray(r.genres) || !r.genres.length) { console.log(`  ✖ ${tag}：缺 genres`); err++; }
    if (BAD_HYPHEN.test(r.artist) || BAD_HYPHEN.test(r.album)) {
      console.log(`  ✖ ${tag}：含非 ASCII 連字號`); err++;
    }
    const k = key(r.artist) + '|' + key(r.album);
    if (live.has(k)) { console.log(`  ✖ ${tag}：與線上池撞卡 → ${live.get(k)}`); err++; }
    if (seen.has(k)) { console.log(`  ✖ ${tag}：與 ${seen.get(k)} 組內重複`); err++; }
    else seen.set(k, `[${g}]`);
    if (r.selfTitled) { console.log(`  ？ ${tag}：自我同名作，待主線覆核`); warn++; }
    if (/live|現場/i.test(r.risk || '')) { console.log(`  ？ ${tag}：risk 提到現場盤，待主線覆核`); warn++; }
  }
}
// 跨批去重（2026-09-02 新增，裁定第 119 條）：chk-prop 原本只比「線上池」與「批內跨組」，
// 漏掉「其他待上架批次」。這裡在結尾串跑共用的 dedup-crossbatch.mjs。
import { execFileSync } from 'node:child_process';
try {
  execFileSync(process.execPath, [path.join(ROOT, 'batch-progress/dedup-crossbatch.mjs')], { stdio: 'inherit' });
} catch { bad++; console.log('  ⚠ 跨批去重未通過（見上）'); }

console.log(`\n合計 ${total} 張｜ERROR ${err}｜待覆核 ${warn}`);
process.exit(err ? 1 : 0);
