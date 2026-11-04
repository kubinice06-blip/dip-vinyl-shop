// 八格張數＋恍惚／頹靡曲風比例（照 build-card-moods 的取值：overrides 優先）
import fs from 'node:fs';
process.chdir('/home/user/dip-vinyl-shop');
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const v0 = JSON.parse(fs.readFileSync('data/mood/card-moods-v0.json', 'utf8'));
const ov = JSON.parse(fs.readFileSync('data/mood/overrides.json', 'utf8'));
const T = v0._thresholds;
const cellOf = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? 'boil' : 'charge') : (z >= T.z ? 'lift' : 'crisp')) : (y >= T.y ? (z >= T.z ? 'languid' : 'decay') : (z >= T.z ? 'calm' : 'still')));
const cnt = {}, gen = { languid: {}, decay: {} };
for (const r of seed) { const id = idOf(r[0], r[1]); const o = ov[id]; let m = o && typeof o.x === 'number' ? [o.x, o.y, o.z] : v0.cards[id]; if (!m) continue;
  const c = cellOf(+m[0].toFixed(1), +m[1].toFixed(1), +m[2].toFixed(1)); cnt[c] = (cnt[c] || 0) + 1;
  if (gen[c]) { const g = (r[5] || [])[0] || '?'; gen[c][g] = (gen[c][g] || 0) + 1; } }
const res = { cells: cnt, genres: gen };
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(res, null, 1));
console.log(JSON.stringify(cnt)); for (const c of ['languid', 'decay']) { const tot = cnt[c]; console.log(c, tot, Object.entries(gen[c]).sort((a, b) => b[1] - a[1]).map(([g, n]) => `${g} ${n} (${(100 * n / tot).toFixed(1)}%)`).join('、')); }
