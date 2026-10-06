#!/usr/bin/env node
// 門市版簡介（只給實體店用，不進卡池／KV）：把草稿合併成 data/shop/descs.json。
// 規則見 data/shop/SHOP_DESC_RULES.md。後台「🏪 實體店庫存」讀這份當預設稿；
// 店主在後台改過的版本存 Firestore settings/shopDescs.byKey[key]，優先於這份。
//
// 用法：node scripts/build-shop-descs.mjs <草稿.json> [...]
//   草稿格式：[{ artist, album, text, ids?: [Notion 頁面 id], sources?: [] }]
// 同 key 後來者覆蓋前者；key = 卡池鍵正規化（與 sync-shop-inventory.mjs 相同）。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const norm = s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-')
  .normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '');
const key = (a, b) => norm(a) + '|' + norm(b);
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(R, 'data/shop/descs.json');
const BANNED = /也就是|意思是|(?<!證)據|同一篇|部落格|說明稱/;

const cur = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { v: 1, items: [] };
const byKey = new Map(cur.items.map(it => [it.key, it]));
const errors = [];
for (const f of process.argv.slice(2)) {
  for (const d of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    const k = key(d.artist, d.album);
    const text = String(d.text || '').trim();
    const len = [...text].length;
    if (!text) { errors.push(`空白：${d.artist}《${d.album}》`); continue; }
    if (BANNED.test(text)) errors.push(`禁語：${d.artist}《${d.album}》→ ${text.match(BANNED)[0]}`);
    if (len < 100 || len > 250) errors.push(`字數 ${len}：${d.artist}《${d.album}》`);
    const old = byKey.get(k);
    byKey.set(k, { key: k, artist: d.artist, album: d.album, ids: [...new Set([...(old?.ids || []), ...(d.ids || [])])], text, sources: d.sources || old?.sources || [] });
  }
}
if (errors.length) { console.error(errors.map(e => '✗ ' + e).join('\n')); process.exit(1); }
const items = [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));
fs.writeFileSync(OUT, JSON.stringify({ v: 1, rules: 'data/shop/SHOP_DESC_RULES.md', count: items.length, items }, null, 1) + '\n');
console.log(`已寫入 ${path.relative(R, OUT)}：${items.length} 張`);
