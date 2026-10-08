#!/usr/bin/env node
// 店內販售區：把 Notion「唱片庫存售價表（販售中）」的快照對到卡池，產出 data/shop/inventory.json。
//
// 其他功能要知道「哪些卡店裡有在賣」，一律讀 data/shop/inventory.json（status === 'in_stock'），
// 用 cardKey（= scripts/pool-keys.mjs 的 key(artist, album)）比對卡池列。
//
// 更新流程：
//   1. 由 Claude 以 Notion MCP 查表，覆寫 data/shop/notion-snapshot.json
//      ——只留公開欄位（頁面 id、品名、演出者、年份、品相、售價、卡池鍵→poolKey、曲風→genres）；成本、利潤、抽成、群組不進 repo。
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
  // Notion 寫綽號 The Bronx Nightingale；店主 2026-10-05 確認實物是 1982 自製盤《Let's Do It》
  '3f00ad0255ff80918ab9cdb1b140b38a': ['Jonny Holtzman', "Let's Do It"],
  // 今田勝 1982《Blue Marine》（日文副題《誘われてシーサイド》）；店主 2026-10-06 確認店內實物是專輯，Notion 品名已改正
  '3f00ad0255ff801a82e6d36027faadfa': ['今田勝', 'Blue Marine'],
  // 宮沢昭《Bull Trout》＝池中《いわな》（同目錄號 SMJX-10068，add-20261006-shop 策展裁定）
  '3f10ad0255ff804ba972c1e0fb194f4f': ['宮沢昭', 'いわな'],
  // 店主 2026-10-05 確認：Notion「Bellaphon」是德國 Bellaphon 版《More Lasting Than Bronze》
  '3f00ad0255ff801aba1cf344d7dded98': ['John Coltrane', 'More Lasting Than Bronze'],
  // 封面印 The New George Otsuka Trio；卡池照池中先例掛日文團名（add-20261004-shop 第 8592 條）
  '3ee0ad0255ff8175b3c8f5f06e26186c': ['ジョージ大塚トリオ', 'You Are My Sunshine'],
};
const NOTES = {
  '3ee0ad0255ff81d2bf41fdd906461b64': '1976 Prestige 雙 LP 再版',
};
// 卡池尚無、走 dip-card-create 新建中的列。上架後移到 OVERRIDES 或讓自動比對接手。
const PENDING_NEW = new Set([
  // 2026-10-08 進貨，卡池尚無（走 dip-card-create）
  '3f30ad0255ff80ac8b80cc8ad54df6cc', // Joe Sample / Ray Brown / Shelly Manne《The Three》
  '3f30ad0255ff800b850adf07be4ce9b7', // Santana《Silver Dreams Golden Reality》
  '3f30ad0255ff809da307c5c2629f4b90', // Yufu《To My Pan Pal》
  '3f30ad0255ff800c9fb8ca4bc56ede28', // 破地獄《芒神》
  '3f30ad0255ff806bacb1d559ca3d707b', // 坂本龍一《Playing The Piano 12122020》
  '3f30ad0255ff8097bfeffc24858f6187', // りりィ《Love Letter》
  '3f30ad0255ff80ad82f2dc21ab9aeb4e', // 渡辺真知子《Fog Lamp》
  '3f30ad0255ff80789940f55bc3a0d13b', // キャンディーズ《その気にさせないで》
  '3f30ad0255ff802fa892d580db9d2073', // Phoebe Snow《Phoebe Snow》
  '3f30ad0255ff807b9d96f5f1f98f0202', // 小坂明子《あなた》
  '3f30ad0255ff8074b6efdc0dedfc072b', // 真芽正恵《真芽正恵と小さな詩》
  '3f30ad0255ff80f087d5d2cb9b9bfcc4', // 吉田拓郎《元気です》
  '3f30ad0255ff8004bf51dfb45e22944c', // 高田真樹子《First》
  '3f30ad0255ff802e925fc4d31d8b6539', // かぐや姫《Live》
  '3f30ad0255ff8037abbdc7f8218b44fa', // 太田裕美《思い出を置く 君を置く》
  '3f30ad0255ff80039521dc56ffac1c8d', // 桃井かおり《Four》
  '3f30ad0255ff8032a06dc6dcec72d0f0', // ゴールデン・ハーフ《ゴールデン・ハーフでーす》
  '3f30ad0255ff801384dcfa684e1fb033', // 伊武雅刀《Mon-jah》
  '3f30ad0255ff80c3be66f4b8556b81b0', // 高橋真梨子《Triad》
  '3f30ad0255ff8057af4fdc81d4f60a46', // Culture Club《It's a Miracle / Miss Me Blind》（單曲）
  '3f30ad0255ff803aaf93fb4c4814d49e', // Marlene《It's Magic》
  '3f30ad0255ff800a8aa6cbeafa8de620', // 小柳ルミ子《愛に甦える》
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
    if (!card && !PENDING_NEW.has(row.id)) errors.push(`卡池鍵指向卡池不存在的卡：${row.id} → ${pinned.join('｜')}`);
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
    genres: Array.isArray(row.genres) ? row.genres : [],
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
// 店內挖寶・心情選歌的卡 → 心情對照（data/shop/mood-map.json）。沒列到的卡前端會用三軸＋曲風粗估，
// 能跑但不準，所以只提醒、不擋。
const MOODS = path.join(R, 'data/shop/mood-map.json');
if (fs.existsSync(MOODS)) {
  const moodMap = JSON.parse(fs.readFileSync(MOODS, 'utf8')).map || {};
  const noMood = items.filter(i => i.status === 'in_stock' && !moodMap[i.cardKey]);
  for (const i of noMood) console.log(`  ⚠ 心情未配：${i.artist}《${i.album}》（${i.cardKey}）→ 補進 data/shop/mood-map.json`);
}
if (errors.length) { console.error(errors.map(e => '✗ ' + e).join('\n')); process.exit(1); }

if (WRITE) {
  const out = { v: 1, source: snap.source, snapshotAt: snap.fetchedAt, count: items.length, items };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
  console.log(`已寫入 ${path.relative(R, OUT)}`);
}
