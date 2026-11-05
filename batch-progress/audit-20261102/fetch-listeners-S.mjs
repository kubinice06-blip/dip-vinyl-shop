// 為 S01／S02 抽樣卡補 Last.fm listeners（worker /album-rating 的 _listeners）。
// 用法：node batch-progress/audit-20261102/fetch-listeners-S.mjs
// 輸出 batch-progress/audit-20261102/listeners-S.json：{key: listeners|null}；每秒最多 2 次；可重跑（已有的 key 跳過）。
import fs from 'node:fs';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const OUT = 'batch-progress/audit-20261102/listeners-S.json';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
let n = 0;
for (const s of ['S01', 'S02']) {
  const rows = JSON.parse(fs.readFileSync(`batch-progress/audit-20261102/shards/${s}.json`, 'utf8'));
  for (const r of rows) {
    if (r.key in out) continue;
    if (typeof r.listeners === 'number') { out[r.key] = r.listeners; continue; }
    try {
      const res = await fetch(`${W}/album-rating?artist=${encodeURIComponent(r.artist)}&album=${encodeURIComponent(r.album)}`, { signal: AbortSignal.timeout(20000) });
      const j = await res.json();
      out[r.key] = typeof j._listeners === 'number' ? j._listeners : null;
    } catch { out[r.key] = null; }
    if (++n % 20 === 0) fs.writeFileSync(OUT, JSON.stringify(out, null, 0));
    await sleep(500);
  }
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 0));
const vals = Object.values(out);
console.log('S filled', n, 'total', vals.length, 'numeric', vals.filter(v => typeof v === 'number').length);
