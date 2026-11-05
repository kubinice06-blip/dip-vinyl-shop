// 薄細項策展線 ts1–ts11 新卡補情緒三軸（2026-10-21 店主：「頻率也要做 前面沒做的補上 也放上星圖中」）
//   已評：104 錨點＋score500／score3000／score10k／score-rest。本批＝seed 裡其餘全部（ts1–ts11 上架的 342 張）。
//   排序同 score-rest：主曲風 → 子曲風 → 藝人 → 年份，切 6 份。
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const done = new Set(JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors.map(a => idOf(a.artist, a.album)));
for (const f of ['../score500/scored-500.json', '../score3000/scored-3000.json', '../score10k/scored-10k.json', '../score-rest/scored-rest.json'])
  for (const s of JSON.parse(fs.readFileSync(R(f), 'utf8'))) done.add(s.id);
const cards = seed.map(r => ({ id: idOf(r[0], r[1]), artist: r[0], album: r[1], year: r[6] || null, genres: r[5] || [], sub: subs[r[0] + '|' + r[1]] || [] }))
  .filter(c => !done.has(c.id))
  .sort((a, b) => (a.genres[0] || '~').localeCompare(b.genres[0] || '~') || (a.sub[0] || '~').localeCompare(b.sub[0] || '~')
    || a.artist.localeCompare(b.artist) || (a.year || 0) - (b.year || 0) || a.id.localeCompare(b.id));
fs.writeFileSync(R('./cards.json'), JSON.stringify(cards, null, 1));
const N = 6, per = Math.ceil(cards.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(R(`./chunk-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(cards.slice(i * per, i * per + per), null, 1));
const g = {}; for (const c of cards) g[c.genres[0] || '無'] = (g[c.genres[0] || '無'] || 0) + 1;
console.log('seed', seed.length, 'done', done.size, 'rest', cards.length, 'per', per, JSON.stringify(g));
