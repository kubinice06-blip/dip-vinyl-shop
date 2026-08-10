#!/usr/bin/env node
// 把藝人字串改名後留在舊文件 id 的 card_catalog 資料，搬到新的 id。
//
// 背景：card_catalog 與 album_overrides 的文件 id 都是
//   cardIdOf(artist, album) = (artist + '|' + album).toLowerCase().replace(/\//g, '-').trim()
// （見 index.html 的 cardIdOf，與 Worker /album-rating 同規則）。
// 所以只要改動藝人字串裡「轉小寫後仍不同」的字元（例如 U+2010 連字號換成 ASCII），
// 舊文件就會變成孤兒。大小寫與冠詞的改動不會——那類轉小寫後相同，不需要搬。
//
// 抽牌不受影響：抽卡讀的是 seed_cards.json / apex_pool.json，Firestore 只是封面與人工修正層。
// 真正會遺失的是「後台手動修過的封面」與「上架流程寫入的欄位」（seed/rarity/rgMbid/upc…）。
//
// album_overrides 是管理員寫入保護的，本腳本不碰，只會列出需要你在後台重設的項目。
//
// 用法：
//   node scripts/migrate-card-catalog-ids.mjs            # 乾跑，只列出要做什麼
//   node scripts/migrate-card-catalog-ids.mjs --write    # 實際搬移（會先整份備份）
//   node scripts/migrate-card-catalog-ids.mjs --write --delete-old   # 搬完並刪掉舊文件
//
// 對照表來源：--map <檔案>，格式 [{ "oldArtist": "...", "newArtist": "...", "album": "..." }, …]
// 未指定時使用內建的 2026-08-10 連字號正規化清單。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const FIRESTORE = process.env.DIP_ONBOARD_FIRESTORE_BASE
  || 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
const API_KEY = process.env.DIP_FIREBASE_API_KEY || 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const DELETE_OLD = args.includes('--delete-old');
const mapArg = args.indexOf('--map');

const cardIdOf = (artist, album) => ((artist || '') + '|' + (album || '')).toLowerCase().replace(/\//g, '-').trim();

// 2026-08-10 的連字號／希臘 mu 正規化：U+2010→ASCII、U+03BC→U+00B5
const MU = String.fromCharCode(0x00b5);
const normArtist = a => a.replace(/[‐‑]/g, '-').replace(/μ/g, MU);

function buildMap() {
  if (mapArg >= 0) return JSON.parse(fs.readFileSync(args[mapArg + 1], 'utf8'));
  // 從備份的 seed_cards 推回：改名前的字串已經不在現行 seed_cards 裡，
  // 所以讀 backup-before-hyphen-normalize 當來源，與現行檔比對出 (舊, 新) 配對。
  const bak = path.join(ROOT, 'seed_cards.backup-before-hyphen-normalize.json');
  if (!fs.existsSync(bak)) {
    console.error('找不到 ' + bak + '，請改用 --map 指定對照表');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(bak, 'utf8'))
    .filter(r => normArtist(r[0]) !== r[0])
    .map(r => ({ oldArtist: r[0], newArtist: normArtist(r[0]), album: r[1] }));
}

const get = async (coll, id) => {
  const r = await fetch(`${FIRESTORE}/${coll}/${encodeURIComponent(id)}?key=${API_KEY}`);
  if (r.status === 404) return null;
  if (!r.ok) return { _err: r.status, _body: await r.text() };
  return r.json();
};

const rows = buildMap().map(x => ({
  ...x,
  oldId: cardIdOf(x.oldArtist, x.album),
  newId: cardIdOf(x.newArtist, x.album),
}));
console.log(`對照表 ${rows.length} 筆｜模式：${WRITE ? (DELETE_OLD ? '寫入並刪除舊文件' : '寫入') : '乾跑'}`);

// ── 1. 盤點 ──────────────────────────────────────────────
const ONBOARD_FIELDS = ['seed', 'classic', 'obscurity', 'rarity', 'accessibility', 'rgMbid', 'upc'];
const todo = [], overrides = [], backup = {};
for (const r of rows) {
  if (r.oldId === r.newId) continue;              // 轉小寫後相同 → 根本不需要搬
  const cat = await get('card_catalog', r.oldId);
  if (cat && !cat._err) {
    backup['card_catalog/' + r.oldId] = cat;
    const extras = ONBOARD_FIELDS.filter(k => cat.fields?.[k] !== undefined);
    todo.push({ ...r, doc: cat, extras });
  }
  const ov = await get('album_overrides', r.oldId);
  if (ov && !ov._err) {
    backup['album_overrides/' + r.oldId] = ov;
    overrides.push({ ...r, fields: Object.keys(ov.fields || {}) });
  }
}
console.log(`card_catalog 待搬 ${todo.length} 筆（其中 ${todo.filter(t => t.extras.length).length} 筆帶上架欄位）`);
console.log(`album_overrides ${overrides.length} 筆（本腳本不碰，需在後台重設）`);
for (const o of overrides) console.log(`  ⚠ ${o.newArtist} – ${o.album}｜欄位 ${o.fields.join(',')}`);
for (const t of todo.filter(t => t.extras.length)) console.log(`  ★ 帶上架欄位：${t.newId}（${t.extras.join(',')}）`);

if (!WRITE) {
  console.log('\n乾跑結束，未寫入任何東西。要實際執行請加 --write');
  process.exit(0);
}

// ── 2. 備份 ──────────────────────────────────────────────
const stamp = new Date().toISOString().slice(0, 10);
const bakPath = path.join(ROOT, `firestore-backup-cardids-${stamp}.json`);
fs.writeFileSync(bakPath, JSON.stringify(backup, null, 2));
console.log(`\n✓ 已備份 ${Object.keys(backup).length} 份文件 → ${path.basename(bakPath)}`);

// ── 3. 寫入新 id（只改 artist 與 cardId，其餘欄位原樣保留） ──
let ok = 0, fail = 0;
for (const t of todo) {
  const f = JSON.parse(JSON.stringify(t.doc.fields || {}));
  if (f.artist) f.artist = { stringValue: t.newArtist };
  if (f.cardId) f.cardId = { stringValue: t.newId };
  const res = await fetch(`${FIRESTORE}/card_catalog/${encodeURIComponent(t.newId)}?key=${API_KEY}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: f }),
  });
  if (res.ok) ok++;
  else { fail++; console.log(`  ✗ ${res.status} ${t.newId} ${(await res.text()).slice(0, 140)}`); }
}
console.log(`✓ 寫入新 id：成功 ${ok}｜失敗 ${fail}`);
if (fail) { console.log('有失敗，不進行刪除。'); process.exit(1); }

// ── 4. 逐筆驗證（coverUrl 與上架欄位都要在） ──────────────
let bad = 0;
for (const t of todo) {
  const d = await get('card_catalog', t.newId);
  if (!d || d._err) { bad++; console.log(`  ✗ 新 id 讀不到 ${t.newId}`); continue; }
  const a = t.doc.fields?.coverUrl?.stringValue || '';
  const b = d.fields?.coverUrl?.stringValue || '';
  const lost = t.extras.filter(k => d.fields?.[k] === undefined);
  if (a !== b || lost.length) {
    bad++;
    console.log(`  ✗ ${t.newId}${a === b ? '' : ' coverUrl 不符'}${lost.length ? ' 缺欄位 ' + lost.join(',') : ''}`);
  }
}
console.log(bad ? `✗ 驗證不符 ${bad} 筆，不進行刪除。` : `✓ 驗證：${todo.length} 筆逐筆相符`);
if (bad) process.exit(1);

// ── 5. 刪除舊文件（可選；不刪也無害，孤兒文件沒有任何讀取者） ──
if (!DELETE_OLD) {
  console.log('未加 --delete-old，舊文件保留（孤兒文件不會被任何程式讀到，留著無害）。');
  process.exit(0);
}
let del = 0, denied = 0;
for (const t of todo) {
  const res = await fetch(`${FIRESTORE}/card_catalog/${encodeURIComponent(t.oldId)}?key=${API_KEY}`, { method: 'DELETE' });
  if (res.ok) del++; else { denied++; if (denied <= 2) console.log(`  ✗ 刪除被拒 ${res.status} ${t.oldId}`); }
}
console.log(`刪除舊文件：成功 ${del}｜被拒 ${denied}`);
