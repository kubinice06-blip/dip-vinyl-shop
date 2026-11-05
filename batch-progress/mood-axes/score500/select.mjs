// 挑 500 張主要專輯做情緒三軸模型評分（2026-10-15 店主：「先評分五百張主要專輯 放上去看」）
//   經典度 5 的 1,318 張裡，依主曲風配額、冷門度低者優先（最多人認得的先上）；另保留 60 個亞洲名額（經典度 ≥4）。
//   排除 104 張錨點。輸出 cards.json 與 10 份 50 張的工單 chunk-01..10.json。
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors;
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const anchorIds = new Set(anchors.map(a => idOf(a.artist, a.album)));
const ASIA = /jrock-asia|jp-pop|c-pop|t-pop|k-pop|tw-folk|asia-rap|jp-jazz|sea-pop/;
const QUOTA = { rock: 108, jazz: 70, electronic: 50, soul: 45, hiphop: 40, pop: 32, folk: 35, classical: 25, world: 20, blues: 15 };
const rows = seed.map(r => ({ artist: r[0], album: r[1], classic: r[2], obscurity: r[3], accessibility: r[4], genres: r[5] || [], year: r[6] || null,
  sub: subs[r[0] + '|' + r[1]] || [], id: idOf(r[0], r[1]) })).filter(r => !anchorIds.has(r.id));
const isAsia = r => r.sub.some(t => ASIA.test(t));
const byFame = (a, b) => (a.obscurity - b.obscurity) || (b.classic - a.classic) || (a.accessibility - b.accessibility) || a.id.localeCompare(b.id);
const picked = new Map();
// 亞洲 60
for (const r of rows.filter(r => r.classic >= 4 && isAsia(r)).sort(byFame)) { if (picked.size >= 60) break; picked.set(r.id, r); }
// 各曲風配額：經典度 5 先，不足再用 4
for (const [g, q] of Object.entries(QUOTA)) {
  let n = 0;
  for (const c of [5, 4]) for (const r of rows.filter(r => r.classic === c && r.genres[0] === g && !isAsia(r)).sort(byFame)) {
    if (n >= q) break; if (picked.has(r.id)) continue; picked.set(r.id, r); n++;
  }
}
const cards = [...picked.values()].map(r => ({ id: r.id, artist: r.artist, album: r.album, year: r.year, genres: r.genres, sub: r.sub }));
fs.writeFileSync(R('./cards.json'), JSON.stringify(cards, null, 1));
for (let i = 0; i < 10; i++) fs.writeFileSync(R(`./chunk-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(cards.slice(i * 50, i * 50 + 50), null, 1));
const cnt = {}; for (const c of cards) cnt[c.genres[0]] = (cnt[c.genres[0]] || 0) + 1;
console.log(cards.length, JSON.stringify(cnt), 'asia', cards.filter(c => c.sub.some(t => ASIA.test(t))).length);
