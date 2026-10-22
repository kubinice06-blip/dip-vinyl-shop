// 合併 score-ml3（ml3）全部評分 → scored-ml3.json，並做驗收檢查（同 score-rest/merge.mjs）。
// 用法：node batch-progress/mood-axes/score-ml3/merge.mjs
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const anchors = JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8'));
const T = anchors._regionRule.thresholds, CELL = anchors._regionRule.cells, NAME = anchors._regionRule.names;
const cellOf = (x, y, z) => CELL[(x >= T.x ? '躁' : '靜') + (y >= T.y ? '重' : '輕') + (z >= T.z ? '暖' : '冷')];
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const seedById = new Map(seed.map(r => [idOf(r[0], r[1]), r]));
const errs = [], out = [];
for (const nn of fs.readdirSync(new URL(".", import.meta.url)).filter(f => /^chunk-.*\.json$/.test(f)).map(f => f.slice(6, -5))) {
  const input = JSON.parse(fs.readFileSync(R(`./chunk-${nn}.json`), 'utf8'));
  let got = [];
  try { got = JSON.parse(fs.readFileSync(R(`./out/chunk-${nn}.json`), 'utf8')); } catch { errs.push(`chunk-${nn}: 沒有輸出`); continue; }
  const byId = new Map(got.map(g => [g.id, g]));
  for (const c of input) {
    const g = byId.get(c.id);
    if (!g) { errs.push(`chunk-${nn}: 缺 ${c.id}`); continue; }
    const bad = !(g.x >= 1 && g.x <= 5 && g.y >= -2 && g.y <= 2 && g.z >= -2 && g.z <= 2) || !g.why || !['high', 'mid', 'low'].includes(g.conf);
    if (bad) { errs.push(`chunk-${nn}: 欄位異常 ${c.id} ${JSON.stringify(g)}`); continue; }
    const s = seedById.get(c.id);
    out.push({ id: c.id, artist: c.artist, album: c.album, year: c.year, genre: (c.genres || [])[0], tier: s?.[8] || null,
      old: { classic: s?.[2], obscurity: s?.[3], accessibility: s?.[4] }, x: g.x, y: g.y, z: g.z, region: cellOf(g.x, g.y, g.z), why: g.why, conf: g.conf });
  }
  const extra = got.filter(g => !input.some(c => c.id === g.id)); if (extra.length) errs.push(`chunk-${nn}: 多出 ${extra.length} 筆不在卡單的 id`);
}
// 主線審稿覆寫（review.json）：保留原值於 orig
let review = {}; try { review = JSON.parse(fs.readFileSync(R('./review.json'), 'utf8')); } catch {}
let reviewed = 0;
for (const o of out) { const rv = review[o.id]; if (!rv) continue; o.orig = { x: o.x, y: o.y, z: o.z };
  for (const k of ['x', 'y', 'z']) if (rv[k] != null) o[k] = rv[k]; o.region = cellOf(o.x, o.y, o.z); o.review = rv.note; reviewed++; }
if (Object.keys(review).filter(k => k[0] !== '_').length !== reviewed) errs.push(`review.json 有 ${Object.keys(review).filter(k => k[0] !== '_').length - reviewed} 筆對不到卡單`);
fs.writeFileSync(R('./scored-ml3.json'), JSON.stringify(out, null, 1));

// 檢查
const n = out.length, cnt = {}, conf = {};
for (const o of out) { cnt[o.region] = (cnt[o.region] || 0) + 1; conf[o.conf] = (conf[o.conf] || 0) + 1; }
const stat = k => { const v = out.map(o => o[k]); const m = v.reduce((a, b) => a + b, 0) / n; return { mean: +m.toFixed(2), sd: +Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / n).toFixed(2), min: Math.min(...v), max: Math.max(...v) }; };
const rank = v => { const o = v.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0]); const r = Array(v.length); let i = 0; while (i < o.length) { let j = i; while (j + 1 < o.length && o[j + 1][0] === o[i][0]) j++; for (let k = i; k <= j; k++) r[o[k][1]] = (i + j) / 2; i = j + 1; } return r; };
const sp = (a, b) => { const ra = rank(a), rb = rank(b), m = (ra.length - 1) / 2; let s = 0, sa = 0, sb = 0; for (let i = 0; i < ra.length; i++) { s += (ra[i] - m) * (rb[i] - m); sa += (ra[i] - m) ** 2; sb += (rb[i] - m) ** 2; } return +(s / Math.sqrt(sa * sb)).toFixed(2); };
const ok = out.filter(o => o.old.classic != null);
const corr = {};
for (const ax of ['x', 'y', 'z']) for (const od of ['classic', 'obscurity', 'accessibility']) corr[`${ax}~${od}`] = sp(ok.map(o => o[ax]), ok.map(o => o.old[od]));
const report = { n, reviewed, errors: errs, conf, cells: Object.fromEntries(Object.keys(NAME).map(k => [NAME[k], cnt[k] || 0])),
  spread: { x: stat('x'), y: stat('y'), z: stat('z') }, anchorSpread: (() => { const a = anchors.anchors; const st = k => { const v = a.map(o => o[k]); const m = v.reduce((p, q) => p + q, 0) / v.length; return { mean: +m.toFixed(2), sd: +Math.sqrt(v.reduce((p, q) => p + (q - m) ** 2, 0) / v.length).toFixed(2) }; }; return { x: st('x'), y: st('y'), z: st('z') }; })(),
  corrWithOldAxes: corr, axisCorr: { 'x~y': sp(out.map(o => o.x), out.map(o => o.y)), 'x~z': sp(out.map(o => o.x), out.map(o => o.z)), 'y~z': sp(out.map(o => o.y), out.map(o => o.z)) } };
fs.writeFileSync(R('./merge-report.json'), JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
