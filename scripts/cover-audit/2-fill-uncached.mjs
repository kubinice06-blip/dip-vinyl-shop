// 卡池封面稽核 步驟 2：把 KV 尚未快取的卡，透過 worker /spotify-search 補齊配對結果。
//
// 節流理由：worker 每個 MISS 會打 1–3 次 Spotify（精準查詢 → 一般查詢 →（跨語言時）藝人查詢）。
// 2026-07-10 曾因並發過猛被 Spotify 限流 retry-after≈7.7 小時，期間全站封面都回空。
// 所以這裡刻意「單線程 + 固定間隔」，並在連續空結果暴增時自動長暫停（限流的典型徵狀）。
// cover6 是永久快取，中斷後重跑不會重打 Spotify；進度另存檔可續跑。
//
// 用法：node scripts/cover-audit/2-fill-uncached.mjs [--gap 900] [--limit N] [--conc 1]
// 產出：scripts/cover-audit/data/fill-progress.json（key → 配對結果）
// --conc 條 lane 各自以 --gap 為間隔發車，整體發車率 = conc / gap。
// 單線程 900ms 實測只有 25 張/分（worker 單張 MISS 來回約 2 秒），全池要四小時以上；
// conc 3 / gap 1500ms ≈ 2 張/秒，Spotify 端約 3–5 req/s，是實測不會被限流的區間。
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const PROGRESS = path.join(OUT, 'fill-progress.json');
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev/spotify-search';

const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? Number(argv[i + 1]) : d; };
const GAP = argOf('--gap', 900);
const LIMIT = argOf('--limit', Infinity);
const CONC = argOf('--conc', 1);

const cards = JSON.parse(fs.readFileSync(path.join(OUT, 'cards.json'), 'utf8'));
const kv = JSON.parse(fs.readFileSync(path.join(OUT, 'kv-covers.json'), 'utf8'));
const done = fs.existsSync(PROGRESS) ? JSON.parse(fs.readFileSync(PROGRESS, 'utf8')) : {};

const todo = cards.filter(c => kv[c.key] == null && !(c.key in done)).slice(0, LIMIT);
console.log(`待補 ${todo.length} 張（已完成 ${Object.keys(done).length}）｜間隔 ${GAP}ms`);

const sleep = ms => new Promise(r => setTimeout(r, ms));
const save = () => fs.writeFileSync(PROGRESS, JSON.stringify(done, null, 1));

let emptyStreak = 0, ok = 0, empty = 0, err = 0, n = 0, paused = false;

async function handle(c) {
  const u = `${WORKER}?artist=${encodeURIComponent(c.artist)}&album=${encodeURIComponent(c.album)}`;
  let res = null;
  for (let attempt = 1; attempt <= 3 && !res; attempt++) {
    try {
      const r = await fetch(u);
      if (r.ok) res = await r.json();
      else await sleep(2000 * attempt);
    } catch { await sleep(2000 * attempt); }
  }
  if (!res) { done[c.key] = { fetchError: true }; err++; }
  else {
    done[c.key] = res;
    if (res.imageUrl) { ok++; emptyStreak = 0; } else { empty++; emptyStreak++; }
  }
  // 連續 25 張空結果 ≈ Spotify 限流（正常情況冷門碟才空，不會連莊）。停 15 分鐘再續。
  if (emptyStreak >= 25 && !paused) {
    paused = true;
    console.log(`\n⚠ 連續 ${emptyStreak} 張空結果，疑似 Spotify 限流 → 暫停 15 分鐘`);
    save();
    await sleep(15 * 60 * 1000);
    emptyStreak = 0; paused = false;
  }
  if (++n % 25 === 0) {
    save();
    process.stdout.write(`\r${n}/${todo.length}｜有封面 ${ok}｜空 ${empty}｜錯 ${err}`);
  }
}

let cursor = 0;
const lane = async () => {
  while (cursor < todo.length) {
    const c = todo[cursor++];
    await sleep(GAP);                 // 每條 lane 各自的間隔；整體發車率 = CONC / GAP
    while (paused) await sleep(5000);
    await handle(c);
  }
};
await Promise.all(Array.from({ length: Math.max(1, CONC) }, lane));
save();
console.log(`\n完成｜有封面 ${ok}｜空 ${empty}｜錯 ${err}｜總進度 ${Object.keys(done).length}`);
