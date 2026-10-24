// 邊界卡重判第二輪（2026-10-24 店主：「把這些分布在邊界的專輯掃描盤點一下看還有什麼標錯了」；
// 起因 Rubalcaba《Paseo》只有能量一軸卡邊就落錯格）。挑：從沒改判過、恰好一軸卡在門檻附近的卡
// （兩軸以上的上一輪 edge-rejudge 已看過）。
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
  if (edge !== 1) continue;
  const sb = (subs[r[0] + '|' + r[1]] || []).filter(s => s.split('/').length >= 2).slice(0, 3).map(s => s.split('/').slice(1).join('/'));
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb.join(',') });
}
out.sort((p, q) => p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const per = 400, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/edge-rejudge-2/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
console.log('cards', out.length, 'chunks', n, 'per', per);
