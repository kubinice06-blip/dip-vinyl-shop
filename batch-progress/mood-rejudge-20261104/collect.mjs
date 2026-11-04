// 撈候選：恍惚／頹靡裡的 hiphop、world(reggae)；鄰格貼邊的 electronic。
import fs from 'node:fs';
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const v0 = JSON.parse(fs.readFileSync('data/mood/card-moods-v0.json', 'utf8'));
const ov = JSON.parse(fs.readFileSync('data/mood/overrides.json', 'utf8'));
const T = v0._thresholds;
const cellOf = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? 'boil' : 'charge') : (z >= T.z ? 'lift' : 'crisp')) : (y >= T.y ? (z >= T.z ? 'languid' : 'decay') : (z >= T.z ? 'calm' : 'still')));
const anchors = new Set(JSON.parse(fs.readFileSync('batch-progress/mood-axes/anchors-v1.json', 'utf8')).anchors.map(a => idOf(a.artist, a.album)));
// 店主逐張點名的改判：鎖住不動
const ownerLocked = w => /^2026-10-2\d (店主|比照店主)/.test(w || '');
const out = { A: [], B: [], locked: [] };
for (const r of seed) {
  const id = idOf(r[0], r[1]);
  const m = v0.cards[id]; const o = ov[id];
  let x, y, z;
  if (o && typeof o.x === 'number') ({ x, y, z } = o); else if (m) [x, y, z] = m; else continue;
  x = +x.toFixed(1); y = +y.toFixed(1); z = +z.toFixed(1);
  const cell = cellOf(x, y, z); const g = r[5] || []; const g0 = g[0];
  const locked = anchors.has(id) || (m && m[4] === 1) || (o && ownerLocked(o.why));
  const rec = { id, artist: r[0], album: r[1], year: r[6], genres: g, cell, x, y, z, prevWhy: o?.why || '' };
  if ((cell === 'languid' || cell === 'decay') && (g0 === 'hiphop' || g0 === 'world')) { if (locked) out.locked.push(rec); else out.A.push(rec); }
  else if (['calm', 'still', 'lift', 'crisp', 'charge'].includes(cell) && g0 === 'electronic' && ((x >= 2.6 && x <= 3.3) || (y >= 0.2 && y <= 0.8))) { if (locked) out.locked.push(rec); else out.B.push(rec); }
}
fs.writeFileSync('batch-progress/mood-rejudge-20261104/candidates.json', JSON.stringify(out, null, 1));
const tally = a => a.reduce((t, r) => (t[r.cell + ':' + r.genres[0]] = (t[r.cell + ':' + r.genres[0]] || 0) + 1, t), {});
console.log('A', out.A.length, tally(out.A)); console.log('B', out.B.length, tally(out.B)); console.log('locked', out.locked.length, out.locked.map(r => r.artist + '《' + r.album + '》' + r.cell).join('；'));
