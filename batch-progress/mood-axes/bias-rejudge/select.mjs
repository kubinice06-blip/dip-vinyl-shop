// 曲風偏誤重判（2026-10-27 店主：鳳飛飛《掌聲響起》該是雀躍、Akinmusire《The Imagined Savior…》很煩躁、
// Mulatu《Ethio Jazz》絕不輕鬆）。三張都是模型評分就落在「靜」、之後幾輪都沒動。挑同形狀的卡：
//   ① 主曲風爵士、落在靜（x < 3）；② 藝人或專輯名是中日韓文字、落在靜。
// 不挑：店主親點／店主裁定過的（why 含「店主」）。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const seed = J('seed_cards.json'), v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json');
const picks = J('batch-progress/mood-axes/owner-review/picks.json');
const T = v0._thresholds, G = v0._genres; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '暴躁') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist']);
const CJK = /[぀-ヿ㐀-鿿가-힯]/;
const out = [], seen = new Set();
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (seen.has(id) || LOCK.has(id)) continue; seen.add(id);
  const v = v0.cards[id]; if (!v) continue;
  const o = ov[id]; if (o && /店主/.test(o.why || '')) continue;
  const [x, y, z] = o ? [o.x, o.y, o.z] : v;
  if (x >= T.x) continue;
  const jazz = G[v[3]] === 'jazz', cjk = CJK.test(r[0] + r[1]);
  if (!jazz && !cjk) continue;
  const sb = (subs[r[0] + '|' + r[1]] || []).filter(s => s.split('/').length >= 2).slice(0, 3).map(s => s.split('/').slice(1).join('/'));
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb.join(','), grp: jazz ? 'jazz' : 'cjk' });
}
out.sort((p, q) => p.grp.localeCompare(q.grp) || p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const per = 350, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/bias-rejudge/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
console.log('cards', out.length, 'jazz', out.filter(c => c.grp === 'jazz').length, 'cjk', out.filter(c => c.grp === 'cjk').length, 'chunks', n);
