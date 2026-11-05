// 合併 out/*.jsonl → candidates.json、kept-near.json、stats.json。
import fs from 'node:fs';
const D = 'batch-progress/prune-20261105';
const rows = JSON.parse(fs.readFileSync(`${D}/worklist.json`, 'utf8'));
const L = JSON.parse(fs.readFileSync(`${D}/listeners.json`, 'utf8'));
const ov = fs.existsSync(`${D}/main-overrides.json`) ? JSON.parse(fs.readFileSync(`${D}/main-overrides.json`, 'utf8')) : {};
const byI = new Map(rows.map(r => [r.i, r]));
const judged = new Map();
for (const f of fs.readdirSync(`${D}/out`).filter(f => f.endsWith('.jsonl')).sort())
  for (const line of fs.readFileSync(`${D}/out/${f}`, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { const j = JSON.parse(line); if (byI.has(j.i)) judged.set(j.i, { ...j, shard: f.slice(0, 3) }); } catch { console.error('bad line', f, line.slice(0, 80)); }
  }
// 主線機械規則：聽眾 ≥40 萬不算「不夠有名」→ 保留；15–40 萬 → borderline；B 類非 soul 曲風 → borderline（三軸皆 ≤3 者改 A）。
const auto = { keepL: 0, blL: 0, nonSoulB: 0 };
for (const [i, j] of judged) { const r = byI.get(i), l = L[`${r.a}|${r.b}`];
  if (j.v === 'keep') continue;
  if (typeof l === 'number' && l >= 400000) { j.v = 'keep'; j.why = `聽眾 ${Math.round(l / 1e4)} 萬，不算不有名`; j.mainRule = 'L400k'; auto.keepL++; continue; }
  if (typeof l === 'number' && l >= 150000 && !j.bl) { j.bl = true; j.mainRule = 'L150k'; auto.blL++; }
  if (j.v === 'B' && !r.gs.includes('soul')) { if (r.scopeA) j.v = 'A'; if (!j.bl) { j.bl = true; } j.mainRule = 'nonSoulB'; auto.nonSoulB++; } }
for (const [i, o] of Object.entries(ov)) judged.set(+i, { ...judged.get(+i), ...o, main: true });
const missing = rows.filter(r => !judged.has(r.i));
const rec = (r, j) => ({ a: r.a, b: r.b, y: r.y, g: r.g, c: r.c, o: r.o, h: r.h, m: r.m, cls: j.v, why: j.why, borderline: !!j.bl, solo: r.solo, listeners: L[`${r.a}|${r.b}`] ?? null });
const order = (p, q) => p.m.localeCompare(q.m) || (p.g || '').localeCompare(q.g || '') || p.a.localeCompare(q.a) || (p.y || 0) - (q.y || 0);
const cands = [], near = [];
for (const r of rows) { const j = judged.get(r.i); if (!j) continue;
  if (j.v === 'A' || j.v === 'B') { if (j.v === 'A' && !r.scopeA) j.v = 'B'; cands.push(rec(r, j)); }
  else if (j.near) near.push({ ...rec(r, j), cls: 'keep' }); }
cands.sort(order); near.sort(order);
fs.writeFileSync(`${D}/candidates.json`, '[\n' + cands.map(x => JSON.stringify(x)).join(',\n') + '\n]\n');
fs.writeFileSync(`${D}/kept-near.json`, '[\n' + near.map(x => JSON.stringify(x)).join(',\n') + '\n]\n');
const st = { auto, overrides: Object.keys(ov).length, judged: judged.size, missing: missing.length, cands: cands.length,
  A: cands.filter(x => x.cls === 'A').length, B: cands.filter(x => x.cls === 'B').length,
  borderline: cands.filter(x => x.borderline).length, firm: cands.filter(x => !x.borderline).length,
  solo: cands.filter(x => x.solo).length, near: near.length, byMood: {}, byGenre: {} };
for (const x of cands) { st.byMood[x.m] = st.byMood[x.m] || { all: 0, firm: 0 }; st.byMood[x.m].all++; if (!x.borderline) st.byMood[x.m].firm++;
  const k = `${x.m}/${x.g}`; st.byGenre[k] = (st.byGenre[k] || 0) + 1; }
fs.writeFileSync(`${D}/stats.json`, JSON.stringify(st, null, 1));
console.log(JSON.stringify(st));
