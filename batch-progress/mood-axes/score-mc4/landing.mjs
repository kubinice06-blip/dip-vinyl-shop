// 落格率：某批上線卡落目標格（頹靡）的張數／上線張數，並列出策展 moodGuess 與評分的差。
//   node batch-progress/mood-axes/score-mc4/landing.mjs add-20261022-mc4 冷冽
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const [batch, target = '頹靡'] = process.argv.slice(2);
const anchors = JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8'));
const T = anchors._regionRule.thresholds, CELL = anchors._regionRule.cells, NAME = anchors._regionRule.names;
const cellOf = (x, y, z) => NAME[CELL[(x >= T.x ? '躁' : '靜') + (y >= T.y ? '重' : '輕') + (z >= T.z ? '暖' : '冷')]];
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const cards = JSON.parse(fs.readFileSync(R(`../../../desc-tools/batches/cards/${batch}-cards.json`), 'utf8'));
const seed = new Set(JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8')).map(r => idOf(r[0], r[1])));
const scored = new Map(JSON.parse(fs.readFileSync(R('./scored-mc4.json'), 'utf8')).map(s => [s.id, s]));
const ov = fs.existsSync(R('../../../data/mood/overrides.json')) ? JSON.parse(fs.readFileSync(R('../../../data/mood/overrides.json'), 'utf8')) : {};
let live = 0, hit = 0; const byCell = {}, rows = [];
for (const c of cards) {
  const id = idOf(c.artist, c.album); if (!seed.has(id)) continue; live++;
  const s = scored.get(id); if (!s) { rows.push(`? 未評 ${c.artist}《${c.album}》`); continue; }
  const o = ov[id]; const x = o?.x ?? s.x, y = o?.y ?? s.y, z = o?.z ?? s.z;
  const cell = cellOf(x, y, z); byCell[cell] = (byCell[cell] || 0) + 1; if (cell === target) hit++;
  const g = c.moodGuess || {};
  rows.push(`${cell === target ? '✓' : '✗'} ${cell} ${c.artist}《${c.album}》 評 ${x}/${y}/${z} 估 ${g.x}/${g.y}/${g.z} ${s.conf} ｜${s.why}`);
}
console.log(rows.join('\n'));
console.log(`\n${batch} 上線 ${live}｜落${target} ${hit}（${live ? Math.round(hit / live * 100) : 0}%）｜${JSON.stringify(byCell)}`);
