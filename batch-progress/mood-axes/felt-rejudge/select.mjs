// 全池三軸重判（2026-10-23 店主：「用新標準全部重判，是讓人聽得很躁還是靜，是體感，不是音樂本身」）。
// 每筆附目前（含 overrides）x/y/z、格、子曲風、原評分理由；店主親手點選過的卡鎖住不送。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const seed = J('seed_cards.json'), v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json');
const picks = J('batch-progress/mood-axes/owner-review/picks.json');
const T = v0._thresholds; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '亢奮') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const why = new Map();
for (const d of fs.readdirSync('batch-progress/mood-axes').filter(d => /^score/.test(d) && fs.statSync('batch-progress/mood-axes/' + d).isDirectory()))
  for (const g of fs.readdirSync('batch-progress/mood-axes/' + d).filter(x => x.endsWith('.json'))) { try { const a = J(`batch-progress/mood-axes/${d}/${g}`); const arr = Array.isArray(a) ? a : (a.cards || a.rows || []); for (const r of arr) if (r && r.id && r.why) why.set(r.id, r.why); } catch {} }
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist']);
const out = []; let locked = 0;
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (LOCK.has(id)) { locked++; continue; }
  const v = v0.cards[id]; if (!v) continue;
  let [x, y, z] = v; const o = ov[id]; if (o) { x = o.x; y = o.y; z = o.z; }
  const sb = (subs[r[0] + '|' + r[1]] || []).filter(s => s.split('/').length >= 2).slice(0, 3).map(s => s.split('/').slice(1).join('/'));
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb.join(','), w: (why.get(id) || '').slice(0, 40) });
}
// 依藝人排，同一藝人的盤在同一份裡，判起來前後一致
out.sort((p, q) => p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const per = 400, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/felt-rejudge/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
console.log('cards', out.length, 'locked', locked, 'chunks', n);
