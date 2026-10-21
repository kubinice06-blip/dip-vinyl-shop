// 情緒三軸刻度（MOOD_SCALE_PLAN §1–§2）：原始值 → 全池百分位 p（0–100 整數，後台數值）；八格照語意門檻判定。
//   店主 2026-10-15：「不要為了平均而改變原本的屬性」——八格只看原始值對固定門檻（能量 3.0／質地 +0.5／色溫 0），
//   不依分布挪門檻；分布平均改在抽卡層處理（MOOD_SCALE_PLAN §2）。p 只是排名，給星圖定位與後台用，不決定格子。
//   輸入：data/mood/card-moods-{ver}.json 的 cards[id] = [rawX, rawY, rawZ, genreIdx, isAnchor]
//   輸出：data/mood/scale-{ver}.json（每軸 101 斷點＋語意門檻），並把 [pX, pY, pZ] 接在每張卡後面寫回 card-moods。
//   並列：以卡鍵雜湊當第二排序鍵（確定性，重跑不變）。
// 用法：node batch-progress/mood-axes/build-scale.mjs [v0]
import fs from 'node:fs';
const ver = process.argv[2] || 'v0';
const R = p => new URL(p, import.meta.url);
const moodsPath = R(`../../data/mood/card-moods-${ver}.json`);
const moods = JSON.parse(fs.readFileSync(moodsPath, 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('./anchors-v1.json'), 'utf8'));
const T = anchors._regionRule.thresholds, CELL = anchors._regionRule.cells, NAME = anchors._regionRule.names;
const cellOf = (x, y, z) => CELL[(x >= T.x ? '躁' : '靜') + (y >= T.y ? '重' : '輕') + (z >= T.z ? '暖' : '冷')];

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
// 語意門檻落在全池第幾百分位（只給星圖畫星雲位置用）
const thresholdP = Object.fromEntries(['x', 'y', 'z'].map((ax, a) => [ax, Math.round(ids.filter(id => raw(id)[a] < T[ax]).length / n * 100)]));

// 2. 八格：原始值對語意門檻
const cnt = {}; for (const id of ids) { const c = cellOf(...raw(id).slice(0, 3)); cnt[c] = (cnt[c] || 0) + 1; }

const scale = { _v: `scale-${ver}`, _built: new Date().toISOString().slice(0, 10), _source: `card-moods-${ver} / ${n} 張`,
  _note: '百分位刻度（MOOD_SCALE_PLAN §1.3）。p 是全池排名，後台數值，不給玩家看、不決定八格。八格＝原始值對 thresholds（語意門檻）；thresholdP 是門檻落在第幾百分位，只供星圖畫位置。',
  breaks, thresholds: T, thresholdP, cells: CELL, names: NAME };
fs.writeFileSync(R(`../../data/mood/scale-${ver}.json`), JSON.stringify(scale));
for (const id of ids) moods.cards[id] = [...raw(id).slice(0, 5), ...P[id]];
moods._v = moods._v.replace(/\+p$/, '') + '+p'; moods._scale = `scale-${ver}`;
moods._note = (moods._note || '').replace(/；build-scale.*$/, '') + '；build-scale.mjs 接上 [pX, pY, pZ]（全池百分位 0–100，後台數值）';
fs.writeFileSync(moodsPath, JSON.stringify(moods));

// 3. 錨點對照（語意門檻下應全數同格）
const idOf = x => ((x.artist || '') + '|' + (x.album || '')).toLowerCase().replace(/\//g, '-').trim();
let hit = 0, tot = 0;
for (const a of anchors.anchors) { const v = moods.cards[idOf(a)]; if (!v) continue; tot++; if (cellOf(...v.slice(0, 3)) === a.region) hit++; }
const report = { n, thresholds: T, thresholdP,
  cells: Object.fromEntries(Object.keys(NAME).map(k => [NAME[k], cnt[k] || 0])),
  cellsPct: Object.fromEntries(Object.keys(NAME).map(k => [NAME[k], +((cnt[k] || 0) / n * 100).toFixed(1)])),
  anchorsSameCell: `${hit}/${tot}` };
fs.writeFileSync(R(`./scale-${ver}-report.json`), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
