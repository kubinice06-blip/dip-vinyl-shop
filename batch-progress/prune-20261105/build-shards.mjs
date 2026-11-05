// 把 worklist＋listeners 切成 shards/S01..S10.json（精簡欄位給子代理判）。
import fs from 'node:fs';
const D = 'batch-progress/prune-20261105';
const rows = JSON.parse(fs.readFileSync(`${D}/worklist.json`, 'utf8'));
const L = JSON.parse(fs.readFileSync(`${D}/listeners.json`, 'utf8'));
rows.sort((p, q) => (p.g || '').localeCompare(q.g || '') || p.a.localeCompare(q.a) || (p.y || 0) - (q.y || 0));
const K = 10, size = Math.ceil(rows.length / K);
fs.mkdirSync(`${D}/shards`, { recursive: true }); fs.mkdirSync(`${D}/out`, { recursive: true });
for (let k = 0; k < K; k++) {
  const part = rows.slice(k * size, (k + 1) * size).map(r => ({ i: r.i, a: r.a, b: r.b, y: r.y, g: r.gs.join('/'), sub: r.sub.at(-1) || null,
    c: r.c, o: r.o, h: r.h, m: r.m, L: L[`${r.a}|${r.b}`] ?? null, A: r.scopeA, B: r.scopeB, solo: r.solo }));
  fs.writeFileSync(`${D}/shards/S${String(k + 1).padStart(2, '0')}.json`, part.map(x => JSON.stringify(x)).join('\n') + '\n');
  console.log(k + 1, part.length, part[0].g, part.at(-1).g);
}
