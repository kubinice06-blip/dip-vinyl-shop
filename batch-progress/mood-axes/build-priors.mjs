// 情緒三軸 v0「子曲風先驗」：全池每張卡一個暫定座標，給星圖實測（店主唱片櫃）用。
// 這是 MOOD_ENERGY_PLAN §3 三層產線的第一層（先驗），不是最終座標；音訊層、模型層之後會覆蓋。
//   1. 每個子曲風標籤一組 (x, y, z)（下方 TAG 表，主線人工定）；卡片取所有標籤平均，沒有子曲風就用主曲風。
//   2. 硬蕊度（舊三軸 accessibility）微調質地與色溫——104 張錨點量到 y～硬蕊 0.62、z～硬蕊 −0.61。係數用錨點最小平方擬合。
//   3. 模型評分（score500／score3000 的 scored-*.json，有就用）蓋過先驗；104 張錨點再蓋過一切。來源碼：0 先驗、1 錨點、2 模型評分。
//   4. 同標籤的卡會疊成一點，加 ±0.15 的確定性抖動（依卡鍵雜湊），只為了星圖看得出是一群。
// 用法：node batch-progress/mood-axes/build-priors.mjs   → 寫 data/mood/card-moods-v0.json
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../card-subgenres.json'), 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('./anchors-v1.json'), 'utf8'));
const T = anchors._regionRule.thresholds, CELL = anchors._regionRule.cells;
const cellOf = (x, y, z) => CELL[(x >= T.x ? '躁' : '靜') + (y >= T.y ? '重' : '輕') + (z >= T.z ? '暖' : '冷')];
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();

// x 能量 1–5、y 質地 −2..+2（輕→重）、z 色溫 −2..+2（冷→暖）
const TAG = {
  'blues/blues-rock':[3.6,1.0,0.6],'blues/chicago':[3.2,0.6,0.8],'blues/classic-blues':[2.8,0.2,0.6],'blues/delta':[2.3,0.0,0.3],
  'blues/desert':[2.6,0.6,0.2],'blues/piano':[2.8,-0.3,0.9],'blues/texas':[3.3,0.4,0.7],
  'classical/baroque':[2.9,-1.0,0.6],'classical/classical-era':[2.8,-1.0,0.6],'classical/contemporary':[2.2,-0.2,-0.9],'classical/film':[2.4,0.0,0.3],
  'classical/modern':[2.8,0.2,-0.6],'classical/musical':[3.0,-0.4,1.2],'classical/opera':[2.8,0.3,0.4],'classical/romantic':[2.6,0.0,0.3],
  'electronic/ambient':[1.3,-0.9,0.2],'electronic/bass':[3.4,1.7,-0.8],'electronic/downtempo':[2.3,1.1,0.0],'electronic/house':[3.9,0.3,0.8],
  'electronic/idm':[3.0,0.4,-0.7],'electronic/industrial':[4.0,1.8,-1.4],'electronic/noise':[4.0,2.0,-1.3],'electronic/nu-disco':[3.8,-0.1,1.3],
  'electronic/synth':[3.6,-0.4,-0.5],'electronic/techno':[3.9,1.1,-1.0],'electronic/trance':[4.2,0.4,-0.1],
  'folk/americana':[2.6,-0.6,0.8],'folk/bluegrass':[3.4,-1.1,1.2],'folk/british':[2.4,-0.9,0.0],'folk/country':[2.8,-0.6,1.0],
  'folk/folk-rock':[2.9,-0.3,0.6],'folk/indie-folk':[2.2,-0.8,0.1],'folk/psych-folk':[2.2,-0.2,-0.2],'folk/songwriter':[2.3,-1.0,0.2],
  'folk/tw-folk':[2.3,-1.0,0.6],'folk/world-folk':[2.6,-0.7,0.4],
  'hiphop/asia-rap':[3.4,0.7,0.0],'hiphop/conscious':[2.9,0.8,0.8],'hiphop/east-coast':[3.1,0.9,0.3],'hiphop/gangsta':[3.3,1.0,-0.2],
  'hiphop/pop-rap':[3.6,0.3,0.9],'hiphop/rnb':[2.9,0.5,1.1],'hiphop/south':[3.4,1.0,0.2],'hiphop/uk-euro':[3.5,0.9,-0.3],
  'hiphop/underground':[2.7,1.1,0.3],'hiphop/west-coast':[3.2,0.8,0.7],
  'jazz/bop':[3.2,-0.4,0.5],'jazz/contemporary':[2.7,-0.5,0.1],'jazz/cool':[2.4,-1.0,-0.2],'jazz/ecm':[2.0,-0.9,-0.8],'jazz/free':[4.2,1.2,-0.6],
  'jazz/fusion':[3.6,0.6,0.6],'jazz/jp-jazz':[3.0,-0.4,0.2],'jazz/latin':[3.5,-0.3,1.3],'jazz/modal':[3.0,-0.3,-0.1],'jazz/soul-jazz':[3.2,0.2,1.2],
  'jazz/swing':[3.4,-0.5,1.3],'jazz/vocal':[2.4,-1.0,1.0],
  'pop/art-pop':[2.8,0.1,0.0],'pop/c-pop':[2.8,-0.5,0.8],'pop/chanson':[2.5,-0.8,0.6],'pop/india':[3.3,0.0,1.0],'pop/indie-pop':[2.8,0.0,0.4],
  'pop/jp-pop':[3.3,-0.5,0.8],'pop/k-pop':[3.8,-0.3,0.6],'pop/pop-rock':[3.4,0.0,0.8],'pop/sea-pop':[3.0,-0.4,0.9],'pop/synth':[3.6,-0.3,-0.2],'pop/t-pop':[2.9,-0.4,0.8],
  'rock/classic':[3.4,0.6,0.6],'rock/dream-post':[2.3,1.1,-0.1],'rock/dream-post/dream-pop':[2.2,1.0,0.3],'rock/dream-post/post-rock':[2.6,1.1,-0.5],
  'rock/dream-post/shoegaze':[2.8,1.7,0.0],'rock/dream-post/slowcore':[1.6,1.0,-0.6],'rock/indie-alt':[3.4,0.9,-0.3],'rock/jrock-asia':[3.6,0.8,0.1],
  'rock/metal':[4.1,1.8,-0.9],'rock/metal/alt-metal':[4.0,1.7,-0.7],'rock/metal/black':[4.6,2.0,-1.8],'rock/metal/death':[4.6,2.0,-1.4],
  'rock/metal/doom':[2.4,2.0,-1.3],'rock/metal/prog-metal':[4.0,1.6,-0.7],'rock/metal/thrash':[4.8,1.9,-1.1],'rock/metal/trad':[4.1,1.6,-0.4],
  'rock/psych-prog':[3.2,0.8,0.0],'rock/psych-prog/art-rock':[3.1,0.6,-0.2],'rock/psych-prog/krautrock':[3.5,0.9,-0.6],'rock/psych-prog/prog':[3.3,0.7,-0.2],
  'rock/psych-prog/psych':[3.0,1.0,0.3],'rock/psych-prog/space-rock':[3.3,1.3,-0.4],
  'rock/punk-wave':[4.0,1.2,-0.5],'rock/punk-wave/goth':[3.0,1.4,-1.5],'rock/punk-wave/industrial':[3.9,1.8,-1.5],'rock/punk-wave/new-wave':[3.7,0.1,-0.2],
  'rock/punk-wave/no-wave':[4.0,1.5,-1.2],'rock/punk-wave/post-punk':[3.6,1.2,-1.1],'rock/punk-wave/punk':[4.5,1.6,-0.4],'rock/roots-other':[3.2,0.4,0.8],
  'soul/classic-rnb':[3.1,-0.1,1.4],'soul/disco':[4.0,-0.3,1.6],'soul/funk':[3.8,0.6,1.4],'soul/gospel':[3.2,0.2,1.6],'soul/motown':[3.6,-0.4,1.7],
  'soul/neo-soul':[2.5,0.8,1.3],'soul/philly':[3.4,-0.3,1.6],'soul/psych-soul':[3.3,0.8,0.8],'soul/southern':[3.0,0.2,1.5],
  'world/african':[3.8,0.4,1.4],'world/arabic':[3.0,0.0,0.6],'world/asia':[2.6,-0.4,0.4],'world/brazil':[3.0,-0.8,1.4],'world/india':[2.6,0.0,0.6],
  'world/latin':[3.6,-0.2,1.4],'world/med':[3.0,-0.4,0.8],'world/reggae':[2.9,1.1,0.9],
};
const MAIN = { rock:[3.4,0.8,0.0], jazz:[3.0,-0.3,0.4], electronic:[3.2,0.6,-0.3], soul:[3.4,0.2,1.3], hiphop:[3.2,0.8,0.3],
  folk:[2.4,-0.8,0.5], classical:[2.6,-0.4,0.1], world:[3.1,0.0,1.0], pop:[3.2,-0.3,0.6], blues:[3.0,0.4,0.6] };
const GENRES = Object.keys(MAIN);

// 子曲風平均；子標籤（三段）比母標籤權重高一倍
function base(key, genres) {
  const tags = (subs[key] || subs[key.replace(/-/g, '/')] || []).filter(t => TAG[t]);
  if (!tags.length) { const g = (genres || []).find(g => MAIN[g]); return g ? { v: MAIN[g], src: 'genre' } : null; }
  let w = 0; const s = [0, 0, 0];
  for (const t of tags) { const k = t.split('/').length > 2 ? 2 : 1; w += k; TAG[t].forEach((v, i) => s[i] += v * k); }
  return { v: s.map(v => v / w), src: 'subgenre' };
}
// card-subgenres.json 的鍵格式
const subKey = (a, b) => a + '|' + b;

const rows = seed.map(r => ({ artist: r[0], album: r[1], acc: r[4], genres: r[5] || [], id: idOf(r[0], r[1]), sk: subKey(r[0], r[1]) }));
const anchorById = new Map(anchors.anchors.map(a => [idOf(a.artist, a.album), a]));
let scored = [];
for (const f of ['./score500/scored-500.json', './score3000/scored-3000.json', './score10k/scored-10k.json', './score-rest/scored-rest.json', './score-ts/scored-ts.json', './score-ts2/scored-ts2.json', './score-md34/scored-md34.json']) { try { scored.push(...JSON.parse(fs.readFileSync(R(f), 'utf8'))); } catch {} }
const scoredById = new Map(scored.map(s => [s.id, s]));

// 擬合硬蕊度係數：殘差 = 錨點 − 子曲風先驗，對 (acc−3) 做無截距最小平方
const fit = [0, 0, 0]; { const num = [0, 0, 0]; let den = 0;
  for (const r of rows) { const a = anchorById.get(r.id); if (!a) continue; const b = base(r.sk, r.genres); if (!b) continue;
    const d = r.acc - 3; den += d * d; [a.x, a.y, a.z].forEach((v, i) => num[i] += (v - b.v[i]) * d); }
  for (let i = 0; i < 3; i++) fit[i] = den ? +(num[i] / den).toFixed(3) : 0; }

const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const r2 = v => Math.round(v * 100) / 100;   // 兩位小數：百分位化時才不會大量並列（MOOD_SCALE_PLAN §1.1）
function prior(r, jitter = true) {
  const b = base(r.sk, r.genres); if (!b) return null;
  const d = (r.acc || 3) - 3, h = hash(r.id);
  const j = i => jitter ? (((h >>> (i * 8)) & 255) / 255 - 0.5) * 0.3 : 0;
  return { v: [clamp(b.v[0] + fit[0] * d + j(0), 1, 5), clamp(b.v[1] + fit[1] * d + j(1), -2, 2), clamp(b.v[2] + fit[2] * d + j(2), -2, 2)], src: b.src };
}

// 校驗：先驗（不抖動）對 104 張錨點
let n = 0, same = 0; const err = [0, 0, 0], sign = [0, 0, 0]; const miss = [];
for (const r of rows) { const a = anchorById.get(r.id); if (!a) continue; const p = prior(r, false); if (!p) continue; n++;
  const [x, y, z] = p.v; err[0] += Math.abs(x - a.x); err[1] += Math.abs(y - a.y); err[2] += Math.abs(z - a.z);
  if ((x >= T.x) === (a.x >= T.x)) sign[0]++; if ((y >= T.y) === (a.y >= T.y)) sign[1]++; if ((z >= T.z) === (a.z >= T.z)) sign[2]++;
  const c = cellOf(x, y, z); if (c === a.region) same++; else miss.push(`${a.artist}《${a.album}》 錨點 ${anchors._regionRule.names[a.region]} → 先驗 ${anchors._regionRule.names[c]}`); }

const out = {}; const cnt = {}; let fromSub = 0, fromGenre = 0, fromAnchor = 0, fromScored = 0, none = 0;
for (const r of rows) {
  const a = anchorById.get(r.id); let v, src;
  const sc = scoredById.get(r.id);
  if (a) { v = [a.x, a.y, a.z]; src = 'anchor'; fromAnchor++; }
  else if (sc) { v = [sc.x, sc.y, sc.z]; src = 'scored'; fromScored++; }
  else { const p = prior(r); if (!p) { none++; continue; } v = p.v; src = p.src; src === 'subgenre' ? fromSub++ : fromGenre++; }
  const g = GENRES.indexOf((r.genres || []).find(g => MAIN[g]));
  out[r.id] = [r2(v[0]), r2(v[1]), r2(v[2]), g, src === 'anchor' ? 1 : src === 'scored' ? 2 : 0];
  const c = cellOf(...out[r.id].slice(0, 3)); cnt[c] = (cnt[c] || 0) + 1;
}
const file = { _v: 'v0-subgenre-prior', _built: new Date().toISOString().slice(0, 10),
  _note: '情緒三軸暫定座標（子曲風先驗＋硬蕊度微調＋104 張錨點）。[x 能量, y 質地, z 色溫（兩位小數原始值）, 主曲風序號, 來源（0 子曲風暫估／1 人工錨點／2 模型評分）]；build-scale.mjs 另補三個百分位 p。只給星圖實驗頁用，不是正式分類。',
  _genres: GENRES, _thresholds: T, cards: out };
fs.writeFileSync(R('../../data/mood/card-moods-v0.json'), JSON.stringify(file));
const report = { n, cellAgree: same, mae: err.map(e => +(e / n).toFixed(2)), sideAgree: sign, accFit: fit,
  coverage: { anchor: fromAnchor, scored: fromScored, subgenre: fromSub, genreOnly: fromGenre, none }, cells: Object.fromEntries(Object.entries(cnt).map(([k, v]) => [anchors._regionRule.names[k], v])), misses: miss };
fs.writeFileSync(R('./priors-v0-report.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify({ ...report, misses: miss.length }, null, 1));
