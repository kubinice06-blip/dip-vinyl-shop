#!/usr/bin/env node
// §8 的四處寫入做完之後，把 manifest 的 published 旗標翻成 true，讓 published gate 能收尾。
//
// 這支**不是**「宣告完成」的橡皮圖章：seedCards／apexPool 兩個旗標是**實際去卡池裡查**
// 得到的結果，查不到就維持 false，讓 gate 當場擋下來。cardCatalog／descriptionKv／
// albumOverride 三個要由呼叫端明講（--catalog --kv --preview），因為那三處的真值
// 分別在 Firestore、KV 與靜態地圖，各自有自己的回讀步驟。
//
// 用法：node scripts/mark-manifest-published.mjs <manifest.json> --catalog --kv --preview
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith('--'));
if (!file) { console.error('用法: node scripts/mark-manifest-published.mjs <manifest.json> [--catalog] [--kv] [--preview]'); process.exit(1); }

const poolKeyOf = (a, b) => [a, b].map(s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-').normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '')).join('|');

const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
const inPool = new Map();
for (const r of seed) inPool.set(poolKeyOf(r[0], r[1]), r[8] || 'normal');

const m = JSON.parse(fs.readFileSync(file, 'utf8'));
let ok = 0, missing = 0;
for (const a of m.albums || []) {
  const tier = inPool.get(poolKeyOf(a.artist, a.album));
  const isApex = a.apexAssessment?.eligible === true;
  a.published = {
    cardCatalog: argv.includes('--catalog'),
    descriptionKv: argv.includes('--kv'),
    albumOverride: argv.includes('--preview'),
    seedCards: tier !== undefined && !isApex,
    apexPool: tier !== undefined && isApex,
  };
  if (tier === undefined) { missing++; console.log(`  ✗ 卡池查無：${a.artist} — ${a.album}`); } else ok++;
}
fs.writeFileSync(file, JSON.stringify(m, null, 1));
console.log(`${path.basename(file)}｜卡池已有 ${ok}｜卡池查無 ${missing}`);
process.exit(missing ? 1 : 0);
