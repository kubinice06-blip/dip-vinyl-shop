#!/usr/bin/env node
// 店內販售區：把 Notion「唱片庫存售價表（販售中）」的快照對到卡池，產出 data/shop/inventory.json。
//
// 其他功能要知道「哪些卡店裡有在賣」，一律讀 data/shop/inventory.json（status === 'in_stock'），
// 用 cardKey（= scripts/pool-keys.mjs 的 key(artist, album)）比對卡池列。
//
// 更新流程：
//   1. 由 Claude 以 Notion MCP 查表，覆寫 data/shop/notion-snapshot.json
//      ——只留公開欄位（頁面 id、品名、演出者、年份、品相、售價、卡池鍵→poolKey）；成本、利潤、抽成、群組不進 repo。
//   2. node scripts/sync-shop-inventory.mjs           （乾跑，只報告）
//      node scripts/sync-shop-inventory.mjs --write   （寫入 inventory.json）
//
// 對應規則：先看 Notion「卡池鍵」欄（poolKey），再看 OVERRIDES（Notion 頁面 id → 卡池 [藝人, 專輯]），再自動比對
// （品名去掉「2LP」後與盤名正規化全等，且藝人名互相包含）。
// 對不到的列：在 PENDING_NEW 裡的記為 pending_card（等新卡上架），其餘一律報錯、exit 1。
// 快照裡消失的列不刪，改記 sold ＋ soldAt，舊連結與統計才不會斷。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 與 scripts/pool-keys.mjs 的 norm／key 相同（那支 import 時會順手重建鍵檔，故不直接引用）
const norm = s => String(s || '').toLowerCase()
  .replace(/[\u2010-\u2015\uff0d]/g, '-')
  .normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '');
const key = (a, b) => norm(a) + '|' + norm(b);

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNAP = path.join(R, 'data/shop/notion-snapshot.json');
const OUT = path.join(R, 'data/shop/inventory.json');
const WRITE = process.argv.includes('--write');

// 自動比對對不上、需人工指定的列（2026-10-04 店主確認）。
const OVERRIDES = {
  // Notion 誤植「零孤徒」；卡池為「零狐徒」
  '3ee0ad0255ff8150aae7d1fff94122fd': ['三上寛', '1972／コンサートライブ零狐徒'],
  // Notion 品名截斷，實為 1978 Galaxy《Crossings》
  '3ee0ad0255ff818f924dd849be3239b1': ['Red Garland / Ron Carter / Philly Joe Jones', 'Crossings'],
  // 1976 Prestige 雙 LP 再版，掛 1963 原盤卡
  '3ee0ad0255ff81d2bf41fdd906461b64': ['Kenny Burrell & John Coltrane', 'Kenny Burrell & John Coltrane'],
  // Notion 用新字體「浜田」，卡池為「濱田」
  '3ee0ad0255ff81668a74d3448af000fe': ['濱田金吾', 'Mugshot'],
  // 封面印 The New George Otsuka Trio；卡池照池中先例掛日文團名（add-20261004-shop 第 8592 條）
  '3ee0ad0255ff8175b3c8f5f06e26186c': ['ジョージ大塚トリオ', 'You Are My Sunshine'],
};
const NOTES = {
  '3ee0ad0255ff81d2bf41fdd906461b64': '1976 Prestige 雙 LP 再版',
};
// 卡池尚無、走 dip-card-create 新建中的列。上架後移到 OVERRIDES 或讓自動比對接手。
const PENDING_NEW = new Set([
  // add-20261005-shop（2026-10-05 Notion 新進 12 張）
  '3f00ad0255ff801aba1cf344d7dded98',
  '3f00ad0255ff805dab62ce2cf1c59625',
  '3f00ad0255ff801d80efd2749b256f8f',
  '3f00ad0255ff80a4925cd52cdcd52c5a',
  '3f00ad0255ff80918ab9cdb1b140b38a',
  '3f00ad0255ff80aeb3cfc690a280157b',
  '3f00ad0255ff8077ad7ed244edf6792b',
  '3f00ad0255ff801a82e6d36027faadfa',
  '3f00ad0255ff8003b6e1c2427c01a236',
  '3f00ad0255ff806182f4c53b96fdbaf1',
  '3f00ad0255ff80b7bac6d97d94cf1922',
  '3ef0ad0255ff803f8228ee791b32cb17',
]);

const pool = JSON.parse(fs.readFileSync(path.join(R, 'seed_cards.json'), 'utf8'));
const byKey = new Map(pool.map(r => [key(r[0], r[1]), r]));
const snap = JSON.parse(fs.readFileSync(SNAP, 'utf8'));
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { items: [] };
const prevById = new Map(prev.items.map(it => [it.id, it]));
const today = new Date().toISOString().slice(0, 10);

const stripFmt = s => String(s || '').replace(/\s*\b\d?LP\b\s*$/i, '');
function autoMatch(row) {
  const t = norm(stripFmt(row.title)), a = norm(row.artist);
  if (!t || !a) return [];
  return pool.filter(r => norm(r[1]) === t && (norm(r[0]).includes(a) || a.includes(norm(r[0]))));
}

const items = [], errors = [];
const seen = new Set();
for (const row of snap.rows) {
  if (!row.id || !row.title) continue;                 // Notion 空白列
  seen.add(row.id);
  let card = null, how = null;
  // Notion「卡池鍵」欄（藝人|專輯，卡池原字）優先；其次 OVERRIDES，最後自動比對
  const pinned = row.poolKey ? row.poolKey.split('|') : OVERRIDES[row.id]
  if (row.poolKey && row.poolKey.split('|').length !== 2) errors.push(`卡池鍵格式錯（要「藝人|專輯」）：${row.poolKey}`)
  if (pinned) {
    card = byKey.get(key(...pinned));
    how = row.poolKey ? 'notion' : 'override';
    if (!card) errors.push(`卡池鍵指向卡池不存在的卡：${row.id} → ${pinned.join('｜')}`);
  } else {
    const hits = autoMatch(row);
    if (hits.length === 1) { card = hits[0]; how = 'auto'; }
    else if (hits.length > 1) errors.push(`多張候選：${row.artist}《${row.title}》→ ${hits.map(h => h[0] + '《' + h[1] + '》').join('、')}`);
  }
  const status = card ? 'in_stock' : PENDING_NEW.has(row.id) ? 'pending_card' : null;
  if (!status) { errors.push(`對不到卡池：${row.artist}《${row.title}》（${row.id}）`); continue; }
  const old = prevById.get(row.id);
  items.push({
    id: row.id,
    status,
    cardKey: card ? key(card[0], card[1]) : null,
    artist: card ? card[0] : null,
    album: card ? card[1] : null,
    match: how,
    listedTitle: row.title,
    listedArtist: row.artist,
    pressingYear: row.year ?? null,
    condition: row.condition ?? null,
    priceNT: row.priceNT ?? null,
    note: NOTES[row.id] || null,
    firstSeen: old?.firstSeen || today,
  });
}
for (const old of prev.items) {
  if (seen.has(old.id)) continue;
  items.push(old.status === 'sold' ? old : { ...old, status: 'sold', soldAt: today });
}

const cnt = s => items.filter(i => i.status === s).length;
console.log(`快照 ${snap.rows.length} 列 → in_stock ${cnt('in_stock')}、pending_card ${cnt('pending_card')}、sold ${cnt('sold')}`);
for (const i of items.filter(i => i.match === 'override')) console.log(`  人工：${i.listedArtist}《${i.listedTitle}》→ ${i.artist}《${i.album}》`);
for (const i of items.filter(i => i.status === 'pending_card')) console.log(`  待上架：${i.listedArtist}《${i.listedTitle}》`);
if (errors.length) { console.error(errors.map(e => '✗ ' + e).join('\n')); process.exit(1); }

if (WRITE) {
  const out = { v: 1, source: snap.source, snapshotAt: snap.fetchedAt, count: items.length, items };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
  console.log(`已寫入 ${path.relative(R, OUT)}`);
}
