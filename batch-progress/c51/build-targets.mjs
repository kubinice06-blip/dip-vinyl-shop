// c-51 目標名單：有王牌卡、但總卡數 ≤3 的藝人。
// 用法：node batch-progress/c51/build-targets.mjs
//
// 為什麼打這一層：路線圖反模式 #1 是「代表作缺席」——店裡有這位藝人的王牌，
// 卻沒有他其餘任何一張招牌作。U2 只有 1 張卡、Amy Winehouse 1 張、Dr. Dre 2 張，
// 客人搜這些名字只跑出一張，比缺一整個地區更難看。
//
// **算深度前必須先合併掛名分裂**，否則名單本身就是錯的：
// 卡池裡 `Bill Evans`(20) 與 `Bill Evans Trio`(1) 是兩個藝人、`The Stooges` 與
// `Iggy and The Stooges` 也是。照未合併的數字挑，會把「其實有 21 張」的 Bill Evans
// 當成 1 張的稀缺藝人，然後在分裂的名字底下繼續加卡、讓分裂更嚴重。
//
// 合併只用在**算深度**，不改卡池的 artist 欄——那要連 KV 的 desc 鍵一起重配，
// 是本機的工。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const rows = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));

// 主奏者＋編制字（Trio／Quartet／…）→ 併回主奏者
const ENS = /\s+(Trio|Quartet|Quintet|Sextet|Septet|Octet|Orchestra|Band|Group|Ensemble)$/i;
// 主名 ＋ and／& ／with ＋ 樂團（Tom Petty and the Heartbreakers → Tom Petty）
const WITH = /\s+(and|&|with|featuring|feat\.?)\s+.+$/i;

// 引號與連字號的字形差異也會造成分裂，而且**看起來完全一樣**：
// 卡池裡 `Jane's Addiction`（直撇，1 張 hall）與 `Jane’s Addiction`（彎撇，2 張）
// 是兩位藝人，`Guns N' Roses`／`Guns N’ Roses`、`The O'Jays`／`The O’Jays`、
// `Booker T. & the MG's`／`MG’s` 同理，共 7 組。
// 2026-08-31 實踩：沒正規化的第一版名單把 Jane's Addiction 記成「只有 1 張」，
// 策展層據此提了《Nothing's Shocking》——那張其實已經在池裡，只是掛在彎撇那個名字底下。
const glyph = s => String(s).replace(/[‘’ʼ´`]/g, "'").replace(/[“”]/g, '"').replace(/[‐‑‒–—―－]/g, '-');
const raw = new Set(rows.map(r => glyph(r[0])));
function canon(name) {
  name = glyph(name);
  for (const re of [ENS, WITH]) {
    const m = name.match(re);
    if (m) { const base = name.slice(0, m.index).trim(); if (raw.has(base)) return base; }
  }
  return name;
}

const byArtist = new Map();
for (const r of rows) {
  const a = canon(r[0]);   // r[0] 原寫法保留在 e.names 裡
  if (!byArtist.has(a)) byArtist.set(a, { n: 0, apex: [], names: new Set(), albums: [], genres: new Set() });
  const e = byArtist.get(a);
  e.n++; e.names.add(r[0]); e.albums.push({ album: r[1], year: r[6], tier: r[8] || null });
  if (r[8]) e.apex.push({ album: r[1], tier: r[8] });
  (Array.isArray(r[5]) ? r[5] : []).forEach(g => e.genres.add(g));
}

const targets = [...byArtist.entries()]
  .filter(([, e]) => e.apex.length > 0 && e.n <= 3)
  .map(([artist, e]) => ({
    artist, cards: e.n,
    aliases: [...e.names].filter(n => n !== artist),
    apex: e.apex, have: e.albums, genres: [...e.genres],
  }))
  .sort((a, b) => a.cards - b.cards || b.apex.length - a.apex.length);

const merged = [...byArtist.values()].filter(e => e.names.size > 1).length;
console.log(`卡池 ${rows.length} 列｜合併掛名後藝人 ${byArtist.size} 位（合併掉 ${merged} 組）`);
console.log(`有王牌且 ≤3 張的藝人：${targets.length} 位`);
console.log(`  其中 1 張 ${targets.filter(t => t.cards === 1).length}、2 張 ${targets.filter(t => t.cards === 2).length}、3 張 ${targets.filter(t => t.cards === 3).length}`);
const gc = {}; targets.forEach(t => t.genres.forEach(g => gc[g] = (gc[g] || 0) + 1));
console.log('曲風分佈：', Object.entries(gc).sort((a, b) => b[1] - a[1]).map(([g, n]) => `${g} ${n}`).join('、'));

fs.writeFileSync(path.join(ROOT, 'batch-progress/c51/targets.json'), JSON.stringify(targets, null, 1));
console.log(`\n已寫出 targets.json（${targets.length} 位）`);
console.log('\n只有 1 張卡的（前 25）：');
targets.filter(t => t.cards === 1).slice(0, 25).forEach(t =>
  console.log(`   ${t.artist}｜王牌《${t.apex[0].album}》[${t.apex[0].tier}]｜${t.genres.join('/')}`));
