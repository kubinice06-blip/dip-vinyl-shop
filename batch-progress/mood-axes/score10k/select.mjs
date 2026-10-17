// 補到一萬張已評分（2026-10-15 店主：「直接跑到一萬張 接力跑」）
//   已評：104 錨點＋score500＋score3000（以 cards.json 為準，不等評完）。本批 = 10,000 − 已評。
//   從其餘卡依全池曲風比例配額、知名度（冷門度低、經典度高）優先；亞洲名額照全池亞洲占比再加權 1.3。
//   輸出 cards.json 與 100 張一份的工單 chunk-01..NN.json。
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const done = new Set([
  ...JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors.map(a => idOf(a.artist, a.album)),
  ...JSON.parse(fs.readFileSync(R('../score500/cards.json'), 'utf8')).map(c => c.id),
  ...JSON.parse(fs.readFileSync(R('../score3000/cards.json'), 'utf8')).map(c => c.id)]);
const TARGET = 10000 - done.size;
const ASIA = /jrock-asia|jp-pop|c-pop|t-pop|k-pop|tw-folk|asia-rap|jp-jazz|sea-pop/;
const rows = seed.map(r => ({ artist: r[0], album: r[1], classic: r[2], obscurity: r[3], accessibility: r[4], genres: r[5] || [], year: r[6] || null,
  sub: subs[r[0] + '|' + r[1]] || [], id: idOf(r[0], r[1]) })).filter(r => !done.has(r.id));
const isAsia = r => r.sub.some(t => ASIA.test(t));
const fame = r => r.classic * 2 - r.obscurity;          // 經典度權重 2、冷門度扣分
const byFame = (a, b) => (fame(b) - fame(a)) || (a.obscurity - b.obscurity) || a.id.localeCompare(b.id);
// 曲風配額 ∝ 全池剩餘占比；亞洲另計
const asiaAll = rows.filter(isAsia), rest = rows.filter(r => !isAsia(r));
const asiaQ = Math.min(asiaAll.length, Math.round(TARGET * asiaAll.length / rows.length * 1.3));
const gCount = {}; for (const r of rest) { const g = r.genres[0] || 'other'; gCount[g] = (gCount[g] || 0) + 1; }
const picked = new Map();
for (const r of asiaAll.sort(byFame).slice(0, asiaQ)) picked.set(r.id, r);
const restQ = TARGET - picked.size;
for (const [g, n] of Object.entries(gCount)) {
  const q = Math.round(restQ * n / rest.length);
  for (const r of rest.filter(r => (r.genres[0] || 'other') === g).sort(byFame).slice(0, q)) picked.set(r.id, r);
}
for (const r of rows.slice().sort(byFame)) { if (picked.size >= TARGET) break; if (!picked.has(r.id)) picked.set(r.id, r); }
const cards = [...picked.values()].slice(0, TARGET).map(r => ({ id: r.id, artist: r.artist, album: r.album, year: r.year, genres: r.genres, sub: r.sub }));
fs.writeFileSync(R('./cards.json'), JSON.stringify(cards, null, 1));
const nChunks = Math.ceil(cards.length / 100);
for (let i = 0; i < nChunks; i++) fs.writeFileSync(R(`./chunk-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(cards.slice(i * 100, i * 100 + 100), null, 1));
const cnt = {}, cl = {}; for (const c of cards) cnt[c.genres[0]] = (cnt[c.genres[0]] || 0) + 1;
for (const r of picked.values()) cl[r.classic] = (cl[r.classic] || 0) + 1;
console.log('done-before', done.size, 'target', TARGET, 'picked', cards.length, 'chunks', nChunks, JSON.stringify(cnt), 'asia', cards.filter(c => c.sub.some(t => ASIA.test(t))).length, 'classic', JSON.stringify(cl));
