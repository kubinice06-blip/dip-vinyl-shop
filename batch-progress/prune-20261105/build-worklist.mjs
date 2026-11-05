// prune-20261105：建雀躍／放鬆非頂點、非店內庫存卡的工作清單（只讀 seed／card-moods／inventory）。
import fs from 'node:fs';
const D = 'batch-progress/prune-20261105';
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const moods = JSON.parse(fs.readFileSync('data/mood/card-moods.json', 'utf8'));
const inv = JSON.parse(fs.readFileSync('data/shop/inventory.json', 'utf8'));
const sub = JSON.parse(fs.readFileSync('card-subgenres.json', 'utf8'));
const T = moods.thresholds;
const n = v => String(v || '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9぀-ヿ㐀-鿿가-힯]/g, '');
const shop = new Set();
for (const it of inv.items) { shop.add(n(it.artist) + '|' + n(it.album)); if (it.cardKey) shop.add(it.cardKey); }
const artistCount = {};
for (const r of seed) artistCount[r[0]] = (artistCount[r[0]] || 0) + 1;
const rows = []; let apex = 0, inShop = 0;
seed.forEach((r, i) => {
  const [x, y, z] = moods.cards[i];
  const light = y < T.y, warm = z >= T.z;
  if (!light || !warm) return;
  const m = x >= T.x ? '雀躍' : '放鬆';
  if (r[8]) { apex++; return; }
  if (shop.has(n(r[0]) + '|' + n(r[1]))) { inShop++; return; }
  rows.push({ i, a: r[0], b: r[1], y: r[6] ?? null, g: (r[5] || [])[0] || null, gs: r[5] || [], sub: sub[`${r[0]}|${r[1]}`] || [],
    c: r[2], o: r[3], h: r[4], m, solo: artistCount[r[0]] === 1, mx: x, my: y, mz: z });
});
const cnt = { 雀躍: 0, 放鬆: 0 }; rows.forEach(r => cnt[r.m]++);
const lowAll = rows.filter(r => r.c <= 3 && r.o <= 3 && r.h <= 3).length;
const soul = rows.filter(r => r.y >= 1970 && r.y <= 1989 && r.gs.includes('soul')).length;
fs.writeFileSync(`${D}/worklist-all.json`, JSON.stringify(rows));
console.log({ total: rows.length, apex, inShop, cnt, lowAll, soul });
