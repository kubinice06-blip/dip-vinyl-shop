// 為 第三輪 shard 補 Last.fm listeners（worker /album-rating 的 _listeners，KV 快取）。
// 用法：node batch-progress/rerate-20261103/fetch-listeners.mjs s01 [s02 ...]
// 只補 listeners 為 null 的列，寫回 shard 的 listenersKV 欄；每秒最多 2 次；可重跑（已有 listenersKV 的跳過）。
import fs from 'node:fs';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));
for (const s of process.argv.slice(2)) {
  const p = `batch-progress/rerate-20261103/shards/${s}.json`;
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  let n = 0;
  for (const r of rows) {
    if (r.listeners != null || r.listenersKV !== undefined) continue;
    try {
      const res = await fetch(`${W}/album-rating?artist=${encodeURIComponent(r.artist)}&album=${encodeURIComponent(r.album)}`, { signal: AbortSignal.timeout(20000) });
      const j = await res.json();
      r.listenersKV = typeof j._listeners === 'number' ? j._listeners : null;
      r.obscuritySourceKV = j._obscuritySource ?? null;
    } catch { r.listenersKV = null; }
    if (++n % 20 === 0) fs.writeFileSync(p, JSON.stringify(rows));
    await sleep(500);
  }
  fs.writeFileSync(p, JSON.stringify(rows));
  console.log(s, 'filled', n);
}
