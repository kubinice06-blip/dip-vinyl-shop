// 為 worklist 補 Last.fm listeners（worker /album-rating 的 _listeners）。可重跑：已有的 key 跳過。
import fs from 'node:fs';
const D = 'batch-progress/prune-20261105';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const UA = 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)';
const OUT = `${D}/listeners.json`;
const rows = JSON.parse(fs.readFileSync(`${D}/worklist.json`, 'utf8'));
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const todo = rows.filter(r => !(`${r.a}|${r.b}` in out));
let n = 0;
async function one(r) {
  const k = `${r.a}|${r.b}`;
  try {
    const res = await fetch(`${W}/album-rating?artist=${encodeURIComponent(r.a)}&album=${encodeURIComponent(r.b)}`, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
    const j = await res.json();
    out[k] = typeof j._listeners === 'number' ? j._listeners : null;
  } catch { out[k] = null; }
  if (++n % 50 === 0) { fs.writeFileSync(OUT, JSON.stringify(out)); console.log(n, '/', todo.length); }
}
const C = 10; let idx = 0;
await Promise.all(Array.from({ length: C }, async () => { while (idx < todo.length) { const r = todo[idx++]; await one(r); await new Promise(s => setTimeout(s, 100)); } }));
fs.writeFileSync(OUT, JSON.stringify(out));
console.log('done', Object.values(out).filter(v => typeof v === 'number').length, '/', Object.keys(out).length);
