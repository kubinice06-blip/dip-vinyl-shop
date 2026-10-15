// 挑 3,000 張做情緒三軸模型評分（2026-10-15 店主：「再評三千張」）
//   從尚未評分（不在 104 錨點、不在 score500）的經典度 ≥4 卡裡，依全池曲風比例配額、冷門度低者優先；另保留 300 個亞洲名額。
//   輸出 cards.json 與 30 份 100 張的工單 chunk-01..30.json。
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors;
const s500 = JSON.parse(fs.readFileSync(R('../score500/scored-500.json'), 'utf8'));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const done = new Set([...anchors.map(a => idOf(a.artist, a.album)), ...s500.map(s => s.id)]);
const ASIA = /jrock-asia|jp-pop|c-pop|t-pop|k-pop|tw-folk|asia-rap|jp-jazz|sea-pop/;
const QUOTA = { rock: 620, jazz: 560, electronic: 300, soul: 250, hiphop: 220, folk: 220, classical: 150, pop: 150, world: 130, blues: 100 };
const rows = seed.map(r => ({ artist: r[0], album: r[1], classic: r[2], obscurity: r[3], accessibility: r[4], genres: r[5] || [], year: r[6] || null,
  sub: subs[r[0] + '|' + r[1]] || [], id: idOf(r[0], r[1]) })).filter(r => !done.has(r.id) && r.classic >= 4);
const isAsia = r => r.sub.some(t => ASIA.test(t));
const byFame = (a, b) => (a.obscurity - b.obscurity) || (b.classic - a.classic) || (a.accessibility - b.accessibility) || a.id.localeCompare(b.id);
const picked = new Map();
for (const r of rows.filter(isAsia).sort(byFame)) { if (picked.size >= 300) break; picked.set(r.id, r); }
for (const [g, q] of Object.entries(QUOTA)) {
  let n = 0;
  for (const r of rows.filter(r => r.genres[0] === g && !isAsia(r)).sort(byFame)) { if (n >= q) break; if (picked.has(r.id)) continue; picked.set(r.id, r); n++; }
}
// 配額不足（流行扣掉亞洲後不夠）時，從其餘經典度 ≥4 卡依知名度補到 3,000
for (const r of rows.slice().sort(byFame)) { if (picked.size >= 3000) break; if (!picked.has(r.id)) picked.set(r.id, r); }
const cards = [...picked.values()].map(r => ({ id: r.id, artist: r.artist, album: r.album, year: r.year, genres: r.genres, sub: r.sub }));
fs.writeFileSync(R('./cards.json'), JSON.stringify(cards, null, 1));
const nChunks = Math.ceil(cards.length / 100);
for (let i = 0; i < nChunks; i++) fs.writeFileSync(R(`./chunk-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(cards.slice(i * 100, i * 100 + 100), null, 1));
const cnt = {}; for (const c of cards) cnt[c.genres[0]] = (cnt[c.genres[0]] || 0) + 1;
console.log(cards.length, 'chunks', nChunks, JSON.stringify(cnt), 'asia', cards.filter(isAsia).length);
