// 古典／前衛偏誤重判（2026-10-29 店主：Jonathan Harvey《Tombeau de Messiaen》不是平靜，「解析一下標準 再抓遺漏的」）。
// 成因：10-23「撤回推力」（沒有打擊在推不算躁）把它拉回靜，之後店主改成「緊繃、不和諧、不可預測，再安靜也是躁」，
// 但體感重判只改差 0.4 或換格且偏保守，10-27 曲風偏誤只掃了爵士與中日韓。挑同形狀、仍在靜（x < 3）的卡：
//   ① 主曲風古典（全部子類）；② 電子的 noise／industrial／glitch／concrete／electroacoustic；
//   ③ 任何曲風的 free／avant 爵士（BRIEF 說自由爵士一律不在靜，仍有漏網）；④ why 含「撤回推力」的卡。
// 不挑：店主親點／裁定過（why 含「店主」）與 owner-review 鎖定的。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const seed = J('seed_cards.json'), v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json');
const picks = J('batch-progress/mood-axes/owner-review/picks.json');
const T = v0._thresholds, G = v0._genres; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '暴躁') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist']);
const EL = /^electronic\/(noise|industrial|idm\/glitch|.*concrete|.*electroacoustic)/;
const FREE = /^jazz\/free/;
const out = [], seen = new Set();
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (seen.has(id) || LOCK.has(id)) continue; seen.add(id);
  const v = v0.cards[id]; if (!v) continue;
  const o = ov[id]; if (o && /店主/.test(o.why || '')) continue;
  const [x, y, z] = o ? [o.x, o.y, o.z] : v;
  if (x >= T.x) continue;
  const all = subs[r[0] + '|' + r[1]] || [];
  const grp = G[v[3]] === 'classical' ? 'classical' : all.some(s => FREE.test(s)) ? 'free-jazz' : all.some(s => EL.test(s)) ? 'noise-electronic' : /撤回推力/.test(o?.why || '') ? 'withdrawn' : null;
  if (!grp) continue;
  const sb = all.filter(s => s.split('/').length >= 2).slice(0, 3).map(s => s.split('/').slice(1).join('/'));
  out.push({ id, a: r[0], b: r[1], yr: r[6] || null, x: +(+x).toFixed(1), y: +(+y).toFixed(1), z: +(+z).toFixed(1), c: cell(x, y, z), g: sb.join(','), grp });
}
out.sort((p, q) => p.grp.localeCompare(q.grp) || p.a.localeCompare(q.a) || (p.yr || 0) - (q.yr || 0));
const per = 250, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/classical-rejudge/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per)));
const by = {}; for (const c of out) by[c.grp] = (by[c.grp] || 0) + 1;
console.log('cards', out.length, JSON.stringify(by), 'chunks', n);
