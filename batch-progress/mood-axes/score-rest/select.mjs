// 評完剩下的全部卡（2026-10-16 店主：「繼續幫剩下的專輯評分」）
//   已評：104 錨點＋score500＋score3000＋score10k（以各批 scored／cards 為準）。本批＝seed 裡其餘全部。
//   排序：主曲風 → 第一個子曲風 → 藝人 → 年份，讓同一位藝人的專輯落在同一份工單，代理才拉得開彼此的差距。
//   輸出 cards.json 與 100 張一份的工單 chunk-01..NN.json。
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const done = new Set(JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors.map(a => idOf(a.artist, a.album)));
for (const f of ['../score500/scored-500.json', '../score3000/scored-3000.json', '../score10k/scored-10k.json'])
  for (const s of JSON.parse(fs.readFileSync(R(f), 'utf8'))) done.add(s.id);
const cards = seed.map(r => ({ id: idOf(r[0], r[1]), artist: r[0], album: r[1], year: r[6] || null, genres: r[5] || [], sub: subs[r[0] + '|' + r[1]] || [] }))
  .filter(c => !done.has(c.id))
  .sort((a, b) => (a.genres[0] || '~').localeCompare(b.genres[0] || '~') || (a.sub[0] || '~').localeCompare(b.sub[0] || '~')
    || a.artist.localeCompare(b.artist) || (a.year || 0) - (b.year || 0) || a.id.localeCompare(b.id));
fs.writeFileSync(R('./cards.json'), JSON.stringify(cards, null, 1));
const n = Math.ceil(cards.length / 100);
for (let i = 0; i < n; i++) fs.writeFileSync(R(`./chunk-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(cards.slice(i * 100, i * 100 + 100), null, 1));
const g = {}; for (const c of cards) g[c.genres[0] || '無'] = (g[c.genres[0] || '無'] || 0) + 1;
console.log('seed', seed.length, 'done', done.size, 'rest', cards.length, 'chunks', n, JSON.stringify(g));
