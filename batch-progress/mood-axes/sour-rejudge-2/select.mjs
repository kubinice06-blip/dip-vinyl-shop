// 酸冷重判第二輪（2026-10-23 店主：「增加的太少了吧？是不是有漏，有些自由爵士或實驗音樂可能整首歌沒什麼聲音，但就是有寒氣」
//   「Scott Walker 的 The Drift 歸類在哪？我覺得很有可能歸錯」）。
// 第一輪只抓窄標籤（jazz/free/avant、noise、no-wave…），The Drift（art-rock＋Last.fm experimental）整個沒進候選。
// 這輪：除了已在冷冽／亢奮（冷＋躁，酸已到位）以外的格，凡廣義實驗／前衛／現代古典／dark ambient 標籤，
// 或評語有寒氣字眼的，且第一輪沒判過的，全部逐張判。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), subs = J('card-subgenres.json'), seed = J('seed_cards.json'), raw = J('data/rawgenres-cache.json'), anc = J('batch-progress/mood-axes/anchors-v1.json');
const done = new Set(J('batch-progress/mood-axes/sour-rejudge/candidates.json').map(c => c.id));
const T = v0._thresholds; const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '亢奮') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const ancIds = new Set(anc.anchors.map(a => idOf(a.artist, a.album)));
const why = new Map();
for (const d of fs.readdirSync('batch-progress/mood-axes').filter(d => /^score/.test(d) && fs.statSync('batch-progress/mood-axes/' + d).isDirectory()))
  for (const g of fs.readdirSync('batch-progress/mood-axes/' + d).filter(x => x.endsWith('.json'))) { try { const a = J(`batch-progress/mood-axes/${d}/${g}`); const arr = Array.isArray(a) ? a : (a.cards || a.rows || []); for (const r of arr) if (r && r.id && r.why) why.set(r.id, r.why); } catch {} }
const SUB = /^(jazz\/free|jazz\/ecm|jazz\/contemporary\/free|classical\/contemporary|classical\/modern|electronic\/(ambient\/dark|ambient\/drone|noise|experimental|industrial|idm|glitch)|rock\/(psych-prog\/art-rock|experimental|avant|punk-wave\/no-wave|punk-wave\/post-punk|psych-prog\/krautrock)|folk\/(avant|experimental))/;
const RAW = /^(experimental|avant-garde|avant-garde jazz|avant-jazz|free jazz|free improvisation|contemporary classical|modern classical|drone|dark ambient|sound art|musique concrète|musique concrete|electroacoustic|post-industrial|industrial|experimental rock|avant-prog|rio|no wave|scary|creepy|dark|atonal|dissonant)$/i;
const CHILL = /陰森|森冷|駭人|恐怖|不安|詭異|詭譎|冷峻|疏離|無調|不和諧|不協和|刺耳|尖|刮擦|留白|稀疏|寒|冰冷|冷硬|荒涼|死寂|幽閉|窒息|壓迫|怪異|扭曲/;
const out = [];
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (done.has(id) || ancIds.has(id)) continue;
  const v = v0.cards[id]; if (!v) continue;
  let [x, y, z] = v; const o = ov[id]; if (o) { x = o.x; y = o.y; z = o.z; }
  const c = cell(x, y, z); if (c === '冷冽' || c === '亢奮') continue;
  const sb = subs[r[0] + '|' + r[1]] || []; const rg = raw[id]?.rawGenres || []; const w = why.get(id) || '';
  if (!(sb.some(s => SUB.test(s)) || rg.some(g => RAW.test(g)) || CHILL.test(w))) continue;
  const tags = [...new Set([...sb.filter(s => s.split('/').length >= 2).slice(0, 3), ...rg.filter(g => RAW.test(g)).map(g => g.toLowerCase())])].slice(0, 5).join(',');
  out.push({ id, artist: r[0], album: r[1], year: r[6] || null, x, y, z, cell: c, tags, why: w.slice(0, 60) });
}
out.sort((a, b) => a.artist.localeCompare(b.artist) || (a.year || 0) - (b.year || 0));
fs.writeFileSync('batch-progress/mood-axes/sour-rejudge-2/candidates.json', JSON.stringify(out, null, 1));
const per = 300, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/sour-rejudge-2/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per), null, 1));
const byCell = {}; for (const o of out) byCell[o.cell] = (byCell[o.cell] || 0) + 1;
console.log('candidates', out.length, byCell, 'chunks', n);
