// edge-rejudge-2/out/chunk-NN.json 的 changes → data/mood/overrides.json（同 felt-rejudge/merge.mjs）。
// 印出：各份 done 是否到齊、改了幾張、格的移動統計。
import fs from 'node:fs';
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const D = 'batch-progress/mood-axes/edge-rejudge-2/';
const v0 = J('data/mood/card-moods-v0.json'), ov = J('data/mood/overrides.json'), picks = J('batch-progress/mood-axes/owner-review/picks.json');
const T = v0._thresholds;
const cell = (x, y, z) => (x >= T.x ? (y >= T.y ? (z >= T.z ? '沸騰' : '暴躁') : (z >= T.z ? '雀躍' : '冷冽')) : (y >= T.y ? (z >= T.z ? '恍惚' : '頹靡') : (z >= T.z ? '放鬆' : '平靜')));
const LOCK = new Set([...Object.keys(picks), 'celtic frost|monotheist']);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, +(+v).toFixed(1)));
const rep = { chunks: 0, complete: 0, incomplete: [], changes: 0, applied: 0, skippedLocked: 0, bad: [], moves: {} };
for (const f of fs.readdirSync(D).filter(x => /^chunk-\d+\.json$/.test(x)).sort()) {
  rep.chunks++; const inp = J(D + f); const byId = new Map(inp.map(c => [c.id, c]));
  let o; try { o = J(D + 'out/' + f); } catch { rep.incomplete.push(f + ' (none)'); continue; }
  if ((o.done || 0) < inp.length) rep.incomplete.push(`${f} ${o.done}/${inp.length}`); else rep.complete++;
  for (const ch of o.changes || []) {
    rep.changes++; const c = byId.get(ch.id); if (!c) { rep.bad.push(ch.id); continue; }
    if (LOCK.has(ch.id)) { rep.skippedLocked++; continue; }
    const x = clamp(ch.x ?? c.x, 1, 5), y = clamp(ch.y ?? c.y, -2, 2), z = clamp(ch.z ?? c.z, -2, 2);
    if (x === c.x && y === c.y && z === c.z) continue;
    const prev = ov[ch.id];
    ov[ch.id] = { x, y, z, why: `${prev?.why ? prev.why + '｜' : ''}2026-10-23 邊界卡重判二：${ch.why || ''}。原 (${c.x}, ${c.y}, ${c.z})` };
    rep.applied++; const k = c.c + '→' + cell(x, y, z); rep.moves[k] = (rep.moves[k] || 0) + 1;
  }
}
if (!process.argv.includes('--dry')) fs.writeFileSync('data/mood/overrides.json', JSON.stringify(ov, null, 1));
fs.writeFileSync(D + 'merge-report.json', JSON.stringify(rep, null, 1));
const mv = Object.entries(rep.moves).sort((a, b) => b[1] - a[1]);
console.log(JSON.stringify({ ...rep, moves: undefined }));
console.log(mv.map(m => m.join(':')).join('  '));
