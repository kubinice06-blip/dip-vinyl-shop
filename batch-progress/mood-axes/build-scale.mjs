// 情緒三軸刻度（MOOD_SCALE_PLAN §1–§2）：原始值 → 全池百分位 p（0–100 整數）→ 條件中位數八格（各 12.5%）。
//   輸入：data/mood/card-moods-{ver}.json 的 cards[id] = [rawX, rawY, rawZ, genreIdx, isAnchor]
//   輸出：data/mood/scale-{ver}.json（每軸 101 斷點＋七個門檻），並把 [pX, pY, pZ] 接在每張卡後面寫回 card-moods。
//   並列：以卡鍵雜湊當第二排序鍵（確定性，重跑不變）。
// 用法：node batch-progress/mood-axes/build-scale.mjs [v0]
import fs from 'node:fs';
const ver = process.argv[2] || 'v0';
const R = p => new URL(p, import.meta.url);
const movesPath = R(`../../data/mood/card-moods-${ver}.json`);
const moods = JSON.parse(fs.readFileSync(movesPath, 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('./anchors-v1.json'), 'utf8'));
const CELL = anchors._regionRule.cells, NAME = anchors._regionRule.names;

const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const ids = Object.keys(moods.cards), n = ids.length;
const raw = id => moods.cards[id];
const H = Object.fromEntries(ids.map(id => [id, hash(id)]));

// 1. 每軸百分位：排名 / (n−1) × 100，四捨五入成整數；斷點＝第 i 百分位對應的原始值
const breaks = {}, P = Object.fromEntries(ids.map(id => [id, [0, 0, 0]]));
['x', 'y', 'z'].forEach((ax, a) => {
  const order = ids.slice().sort((i, j) => (raw(i)[a] - raw(j)[a]) || (H[i] - H[j]));
  order.forEach((id, k) => { P[id][a] = Math.round(k / (n - 1) * 100); });
  breaks[ax] = Array.from({ length: 101 }, (_, i) => raw(order[Math.round(i / 100 * (n - 1))])[a]);
});

// 2. 八格門檻樹。三種切法並存（店主看過實驗頁再定，MOOD_SCALE_PLAN §2.4）：
//    equal    λ=1：條件中位數，八格各 12.5%。門檻 at={p,h}：p 大於門檻歸上半；p 相等時比卡鍵雜湊 h（≥ 歸上半），切點完全可重現。
//    half     λ=0.5：門檻取「語意門檻」與「條件中位數」的中點。
//    semantic λ=0：錨點用的固定語意門檻（x≥3.0、y≥0.5、z≥0）換成 p，不管分布。
//    λ<1 的門檻 h 一律 0（p ≥ 門檻即上半）。
const T = anchors._regionRule.thresholds;
const fixedP = [T.x, T.y, T.z].map((t, a) => Math.round(ids.filter(id => raw(id)[a] < t).length / n * 100));
const above = (p, h, at) => p > at.p || (p === at.p && h >= at.h);
function buildTree(L) {
  const at = (set, a) => {
    const s = set.slice().sort((i, j) => (P[i][a] - P[j][a]) || (H[i] - H[j]));
    const cut = s[Math.floor(s.length / 2)];
    return L === 1 ? { p: P[cut][a], h: H[cut] } : { p: Math.round(fixedP[a] + (P[cut][a] - fixedP[a]) * L), h: 0 };
  };
  const part = (set, a, t) => [set.filter(id => !above(P[id][a], H[id], t)), set.filter(id => above(P[id][a], H[id], t))];
  const tree = { x: at(ids, 0), y: {}, z: {} }, cell = {};
  const [lo, hi] = part(ids, 0, tree.x);
  for (const [ex, s1] of [['靜', lo], ['躁', hi]]) {
    tree.y[ex] = at(s1, 1); const [l2, h2] = part(s1, 1, tree.y[ex]);
    for (const [wy, s2] of [['輕', l2], ['重', h2]]) {
      tree.z[ex + wy] = at(s2, 2); const [l3, h3] = part(s2, 2, tree.z[ex + wy]);
      for (const [tz, s3] of [['冷', l3], ['暖', h3]]) for (const id of s3) cell[id] = CELL[ex + wy + tz];
    }
  }
  return { tree, cell };
}
const MODES = { equal: 1, half: 0.5, semantic: 0 };
const built = Object.fromEntries(Object.entries(MODES).map(([k, L]) => [k, buildTree(L)]));
const tree = built.equal.tree, cellOf = built.equal.cell;
// 前端判斷式與上面切法一致的自我檢查
let bad = 0;
for (const [k, { tree: t, cell }] of Object.entries(built)) for (const id of ids) {
  const [px, py, pz] = P[id], h = H[id];
  const ex = above(px, h, t.x) ? '躁' : '靜', wy = above(py, h, t.y[ex]) ? '重' : '輕', tz = above(pz, h, t.z[ex + wy]) ? '暖' : '冷';
  if (CELL[ex + wy + tz] !== cell[id]) bad++;
}

const cnt = {}; for (const id of ids) cnt[cellOf[id]] = (cnt[cellOf[id]] || 0) + 1;
const scale = { _v: `scale-${ver}`, _built: new Date().toISOString().slice(0, 10), _source: `card-moods-${ver} / ${n} 張`,
  _note: '百分位刻度與八格門檻（MOOD_SCALE_PLAN §1.3、§2）。門檻 at = {p, h}：p 大於門檻歸上半；p 相等時比卡鍵 FNV-1a 雜湊 h，≥ 歸上半。trees 有 equal／half／semantic 三種切法，tree＝defaultTree。',
  breaks, tree, trees: Object.fromEntries(Object.entries(built).map(([k, v]) => [k, v.tree])), defaultTree: 'equal', lambda: MODES, cells: CELL, names: NAME };
fs.writeFileSync(R(`../../data/mood/scale-${ver}.json`), JSON.stringify(scale));
for (const id of ids) moods.cards[id] = [...raw(id).slice(0, 5), ...P[id]];
moods._v = `${moods._v}+p`; moods._scale = `scale-${ver}`;
moods._note = (moods._note || '').replace(/；build-scale.*$/, '') + '；build-scale.mjs 接上 [pX, pY, pZ]（全池百分位 0–100）';
fs.writeFileSync(movesPath, JSON.stringify(moods));

// 3. 錨點對照：人工意圖（固定門檻八格）vs 各切法
const idOf = x => ((x.artist || '') + '|' + (x.album || '')).toLowerCase().replace(/\//g, '-').trim();
const modes = {};
for (const [k, { tree: t, cell }] of Object.entries(built)) {
  const c = {}; for (const id of ids) c[cell[id]] = (c[cell[id]] || 0) + 1;
  let hit = 0, tot = 0; const moved = [];
  for (const a of anchors.anchors) { const id = idOf(a); if (!cell[id]) continue; tot++; if (cell[id] === a.region) hit++; else moved.push(`${a.artist}《${a.album}》 ${NAME[a.region]}→${NAME[cell[id]]}`); }
  modes[k] = { lambda: MODES[k], cells: Object.fromEntries(Object.keys(NAME).map(r => [NAME[r], c[r] || 0])),
    minMaxPct: [Math.min(...Object.values(c)), Math.max(...Object.values(c))].map(v => +(v / n * 100).toFixed(1)),
    tree: { x: t.x.p, y: Object.fromEntries(Object.entries(t.y).map(([q, v]) => [q, v.p])), z: Object.fromEntries(Object.entries(t.z).map(([q, v]) => [q, v.p])) },
    anchorsSameCell: `${hit}/${tot}`, anchorMoves: moved };
}
const report = { n, fixedThresholdAsP: fixedP, recomputeMismatch: bad, modes };
fs.writeFileSync(R(`./scale-${ver}-report.json`), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
