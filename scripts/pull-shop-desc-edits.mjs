#!/usr/bin/env node
// 把後台改過的門市版介紹（Firestore settings/shopDescs.byKey，公開可讀）併回 data/shop/descs.json。
// 印刷檔只讀 descs.json，所以重出印刷檔前先跑這支；網站本身會即時疊上後台改動，不需要它。
// 用法：node scripts/pull-shop-desc-edits.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');
const FILE = path.join(R, 'data/shop/descs.json');
const URL = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/settings/shopDescs';

const res = await fetch(URL);
if (!res.ok) { console.error(`讀不到 Firestore：HTTP ${res.status}`); process.exit(1); }
const by = (await res.json()).fields?.byKey?.mapValue?.fields || {};
const descs = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const byKey = new Map(descs.items.map(i => [i.key, i]));

let changed = 0;
for (const [key, v] of Object.entries(by)) {
  const f = v.mapValue?.fields || {};
  const text = f.text?.stringValue;
  if (!text) continue;
  const item = byKey.get(key);
  if (!item) { console.warn(`  descs.json 沒有這個鍵，略過：${key}`); continue; }
  if (item.text === text) continue;
  console.log(`  更新：${item.artist}《${item.album}》`);
  item.text = text;
  changed++;
}
console.log(`後台改動 ${Object.keys(by).length} 篇，併回 ${changed} 篇${DRY ? '（--dry，未寫檔）' : ''}`);
if (changed && !DRY) fs.writeFileSync(FILE, JSON.stringify(descs, null, 1) + '\n');
