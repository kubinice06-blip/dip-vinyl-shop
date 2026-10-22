// 質地尺改判合併：out/chunk-NN.json → data/mood/overrides.json（只改 y；x、z 沿用目前值）。
//   驗收：每份筆數與 id 一一對應、y 範圍、changed 欄位；已在 overrides 的卡（#114 能量改判）保留其 x、把 y 疊上去。
//   用法：node batch-progress/mood-axes/texture-rejudge/merge.mjs [--write]
import fs from 'node:fs';
const D = 'batch-progress/mood-axes/texture-rejudge/';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const anc = J('batch-progress/mood-axes/anchors-v1.json'), T = anc._regionRule.thresholds, CELL = anc._regionRule.cells, NAME = anc._regionRule.names;
const cellOf = (x, y, z) => NAME[CELL[(x >= T.x ? '躁' : '靜') + (y >= T.y ? '重' : '輕') + (z >= T.z ? '暖' : '冷')]];
const OV = 'data/mood/overrides.json', ov = J(OV);
const chunks = fs.readdirSync(D).filter(f => /^chunk-\d+\.json$/.test(f)).sort();
const errs = [], moves = {}, changed = [];
for (const f of chunks) {
  const inp = J(D + f); let got;
  try { got = J(D + 'out/' + f); } catch { errs.push(`${f}: 沒有輸出`); continue; }
  const by = new Map(got.map(g => [g.id, g]));
  if (got.length !== inp.length) errs.push(`${f}: 筆數 ${got.length}／${inp.length}`);
  for (const c of inp) {
    const g = by.get(c.id); if (!g) { errs.push(`${f}: 缺 ${c.id}`); continue; }
    if (!(g.y >= -2 && g.y <= 2) || typeof g.changed !== 'boolean' || !g.why) { errs.push(`${f}: 欄位異常 ${c.id}`); continue; }
    const y = +(+g.y).toFixed(1); if (!g.changed || y === c.y) continue;
    const from = cellOf(c.x, c.y, c.z), to = cellOf(c.x, y, c.z); const k = from + '→' + to; moves[k] = (moves[k] || 0) + 1;
    changed.push({ id: c.id, artist: c.artist, album: c.album, x: c.x, y0: c.y, y, z: c.z, from, to, why: g.why, conf: g.conf });
  }
  for (const g of got) if (!inp.some(c => c.id === g.id)) errs.push(`${f}: 多出 ${g.id}`);
}
const report = { chunks: chunks.length, changed: changed.length, moves, errors: errs };
fs.writeFileSync(D + 'changed.json', JSON.stringify(changed, null, 1));
fs.writeFileSync(D + 'merge-report.json', JSON.stringify(report, null, 1));
console.log(JSON.stringify(report, null, 1));
if (process.argv.includes('--write') && !errs.length) {
  for (const c of changed) {
    const prev = ov[c.id];
    ov[c.id] = { x: prev ? prev.x : c.x, y: c.y, z: prev ? prev.z : c.z,
      why: (prev ? prev.why + '｜' : '') + `2026-10-22 質地尺改判（暖慢的包覆感算重）：${c.why}。原 y ${c.y0}（${c.from}→${c.to}）。` };
  }
  fs.writeFileSync(OV, JSON.stringify(ov, null, 1));
  console.log('overrides 寫入', changed.length, '筆，共', Object.keys(ov).length);
}
