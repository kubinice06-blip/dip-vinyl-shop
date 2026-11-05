// 邊界卡重判（2026-10-23 店主：한영애《바라본다》聽起來是雀躍卻在放鬆——「挑出來改」）。
// 挑：從沒被改判過（不在 overrides）、三軸裡至少兩軸卡在門檻附近的卡。這種卡只要一軸判偏就換格，
// 體感重判時又因為「差 0.4 以上或換格才改」被保守放過。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const seed = J('seed_cards.json'), v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json');
const picks = J('batch-progress/mood-axes/owner-review/picks.json');
const T = v0._thresholds; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '暴躁') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const NEAR = { x: 0.35, y: 0.3, z: 0.3 };
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist']);
const out = [];
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (LOCK.has(id) || ov[id]) continue;
  const v = v0.cards[id]; if (!v) continue;
  const [x, y, z] = v;
  const edge = (Math.abs(x - T.x) <= NEAR.x) + (Math.abs(y - T.y) <= NEAR.y) + (Math.abs(z - T.z) <= NEAR.z);
  if (edge < 2) continue;
  const sb = (subs[r[0] + '|' + r[1]] || []).filter(s => s.split('/').length >= 2).slice(0, 3).map(s => s.split('/').slice(1).join('/'));
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb.join(',') });
}
out.sort((p, q) => p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const n = 8, per = Math.ceil(out.length / n);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/edge-rejudge/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
console.log('cards', out.length, 'chunks', n, 'per', per);
