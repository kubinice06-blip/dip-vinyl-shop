// 質地尺改判（2026-10-22 店主：「落日飛車確實是恍惚（dream pop 大部分也都是恍惚）重新評斷」）
//   新規則：暖慢音樂的「包覆感」（殘響霧、chorus 夢幻吉他、厚合成器墊、慢板靈魂樂的厚低頻與弦樂墊）算重。
//   範圍：目前落放鬆／平靜（靜＋輕）的非錨點卡，子曲風屬 dream pop／shoegaze／chillwave／city pop／soft rock／
//   慢板靈魂與 R&B／neo-soul，加上點名藝人。只重判質地 y；能量、色溫不動。
//   輸出 candidates.json 與 80 張一份的 chunk-NN.json（每筆附目前 x/y/z 與原評分理由）。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const cm = J('data/mood/card-moods-v0.json'), anc = J('batch-progress/mood-axes/anchors-v1.json'), ov = J('data/mood/overrides.json');
const T = anc._regionRule.thresholds;
const seed = J('seed_cards.json'), subs = J('card-subgenres.json');
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const ancIds = new Set(anc.anchors.map(a => idOf(a.artist, a.album)));
const why = new Map();
for (const f of ['score500/scored-500.json', 'score3000/scored-3000.json', 'score10k/scored-10k.json', 'score-rest/scored-rest.json', 'score-ts/scored-ts.json'])
  for (const s of J('batch-progress/mood-axes/' + f)) why.set(s.id, s.why);
const SUB = /^(rock\/dream-post\/(dream-pop|shoegaze)|rock\/dream-post$|pop\/art-pop\/dream|electronic\/downtempo\/chillwave|pop\/jp-pop\/city-pop|rock\/roots-other\/soft-rock|soul\/(philly|southern|neo-soul|classic-rnb|classic-rnb\/(smooth|neo-contemporary|southern|chicago))$|hiphop\/rnb(\/(contemporary|neo-soul|alt))?$)/;
const NAMED = /^(落日飛車|老王樂隊|9m88|lamp|zero 7|al green|anita baker|teddy pendergrass|luther vandross|jill scott|bill withers|men i trust|mac demarco|suchmos|zion\.t|crush|dean|sade|d'angelo|erykah badu|minnie riperton|curtis mayfield|isaac hayes|beach house|cocteau twins|mazzy star|slowdive|cigarettes after sex|deca joins|甜約翰|溫蒂漫步)/i;
const out = [];
for (const r of seed) {
  const id = idOf(r[0], r[1]); if (ancIds.has(id)) continue;
  const v = cm.cards[id]; if (!v) continue;
  let [x, y, z] = v; const o = ov[id]; if (o) { x = o.x; y = o.y; z = o.z; }
  if (!(x < T.x && y < T.y)) continue;                 // 只看靜＋輕
  const sb = subs[r[0] + '|' + r[1]] || [];
  if (!sb.some(s => SUB.test(s)) && !NAMED.test(r[0])) continue;
  out.push({ id, artist: r[0], album: r[1], year: r[6] || null, sub: sb.filter(s => s.split('/').length >= 2).slice(0, 4), x: +x.toFixed(1), y: +y.toFixed(1), z: +z.toFixed(1), why: why.get(id) || '' });
}
out.sort((a, b) => a.artist.localeCompare(b.artist) || (a.year || 0) - (b.year || 0));
fs.writeFileSync('batch-progress/mood-axes/texture-rejudge/candidates.json', JSON.stringify(out, null, 1));
const per = 80, n = Math.ceil(out.length / per);
for (let i = 0; i < n; i++) fs.writeFileSync(`batch-progress/mood-axes/texture-rejudge/chunk-${String(i + 1).padStart(2, '0')}.json`, JSON.stringify(out.slice(i * per, i * per + per), null, 1));
const warm = out.filter(o => o.z >= 0).length;
console.log('candidates', out.length, 'warm(→恍惚 if heavy)', warm, 'cold(→頹靡 if heavy)', out.length - warm, 'chunks', n);
