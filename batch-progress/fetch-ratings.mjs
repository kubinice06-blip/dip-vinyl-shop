// 三軸基線＋listeners：打 worker /album-rating（Last.fm 冷門度＋AI 經典/硬蕊基線）。
// c47 那支寫死了批名，這支吃參數；其餘行為照舊。
//
// 這只是「基線」——最終三軸由主線逐張審核時定案；listeners 是 pearl 門檻的必要數據。
// 注意：這會把 AI 基線寫進 rating4: KV 快取，之後上架時 manifest 的定案三軸會覆寫。
//
// 用法：node batch-progress/fetch-ratings.mjs <批名>      # 例：c49
// 產出／續跑檔：batch-progress/<批>/ratings.json
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const batch = process.argv[2];
if (!batch) { console.error('用法: node batch-progress/fetch-ratings.mjs <批名>'); process.exit(1); }

const all = JSON.parse(fs.readFileSync(`${ROOT}/batch-progress/${batch}/cand-all.json`, 'utf8'));
const OUT = `${ROOT}/batch-progress/${batch}/ratings.json`;
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const sleep = ms => new Promise(r => setTimeout(r, ms));

let cursor = 0, done = 0, fail = 0;
async function worker() {
  while (cursor < all.length) {
    const a = all[cursor++];
    const k = a.artist + '|' + a.album;
    if (prev[k] && prev[k].obscurity) { done++; continue; }   // 可續跑
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(`${W}/album-rating?artist=${encodeURIComponent(a.artist)}&album=${encodeURIComponent(a.album)}`,
          { signal: AbortSignal.timeout(45000) });
        if (r.ok) { prev[k] = { ...(await r.json()), _cache: r.headers.get('x-cache') }; break; }
      } catch { /* retry */ }
      await sleep(2000 * (i + 1));
    }
    if (!prev[k]) { fail++; prev[k] = null; }
    done++;
    if (done % 20 === 0) { fs.writeFileSync(OUT, JSON.stringify(prev, null, 1)); console.log(`  ${done}/${all.length}（失敗 ${fail}）`); }
  }
}
// 併發 4：worker 那端是單一 Cloudflare function，開太多只會互相排隊
await Promise.all(Array.from({ length: 4 }, worker));
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
const got = Object.values(prev).filter(v => v && v.obscurity).length;
console.log(`${batch}｜完成 ${got}／${all.length}｜失敗 ${fail}`);
