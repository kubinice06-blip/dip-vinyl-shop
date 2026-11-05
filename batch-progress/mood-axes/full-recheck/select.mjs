// 全池再檢查（2026-10-29 店主：「統整調整過的專輯，梳理一下整體歸類規則，並且全部再檢查一次」）。
// 照 RULES.md 逐張看全池，排除 104 張錨點與店主親點／親裁的卡。依藝人排序切份。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const seed = J('seed_cards.json'), v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json');
const picks = J('batch-progress/mood-axes/owner-review/picks.json'), anchors = J('batch-progress/mood-axes/anchors-v1.json');
const T = v0._thresholds; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '暴躁') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const anc = new Set((Array.isArray(anchors) ? anchors : anchors.anchors || Object.values(anchors)).map(a => a.id || idOf(a.artist, a.album)).filter(Boolean));
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist', ...anc]);
const out = [], seen = new Set(); let skipped = 0;
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (seen.has(id)) continue; seen.add(id);
  const v = v0.cards[id]; if (!v) continue;
  const o = ov[id]; if (LOCK.has(id) || (o && /店主/.test(o.why || ''))) { skipped++; continue; }
  const [x, y, z] = o ? [o.x, o.y, o.z] : v;
  const sb = (subs[r[0] + '|' + r[1]] || []).slice(0, 3).join(',');
  const w = o ? (o.why || '').split('｜').pop().replace(/^2026-\d\d-\d\d\s*/, '').slice(0, 34) : '';
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb, ...(w ? { w } : {}) });
}
out.sort((p, q) => p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const per = 450, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/full-recheck/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
console.log('cards', out.length, 'locked/anchor skipped', skipped, 'anchors', anc.size, 'chunks', n);
