// c-47 三軸基線＋listeners：打 worker /album-rating（Last.fm 冷門度＋AI 經典/硬蕊基線）。
// 這只是「基線」——最終三軸由主線在逐張審核時定案；listeners 是 pearl 門檻的必要數據。
// 注意：這會把 AI 基線寫進 rating4: KV 快取；之後上架時 manifest 的定案三軸會覆寫（同 c-46 做法）。
import fs from 'node:fs';
const R = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const all = JSON.parse(fs.readFileSync(`${R}/batch-progress/c47/cand-all.json`, 'utf8'));
const OUT = `${R}/batch-progress/c47/ratings.json`;
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
        const r = await fetch(`${W}/album-rating?artist=${encodeURIComponent(a.artist)}&album=${encodeURIComponent(a.album)}`, { signal: AbortSignal.timeout(45000) });
        if (r.ok) {
          const j = await r.json();
          prev[k] = { ...j, _cache: r.headers.get('x-cache') };
          break;
        }
      } catch { /* retry */ }
      await sleep(2000 * (i + 1));
    }
    if (!prev[k]) { fail++; prev[k] = null; }
    done++;
    if (done % 20 === 0) {
      fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
      console.log(`${done}/${all.length}（失敗 ${fail}）`);
    }
    await sleep(400);
  }
}
await Promise.all([worker(), worker(), worker()]);
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
const got = Object.values(prev).filter(v => v && v.obscurity).length;
const lastfm = Object.values(prev).filter(v => v && v._obscuritySource === 'lastfm').length;
console.log(`完成｜有三軸 ${got}/${all.length}｜其中 Last.fm 實測冷門度 ${lastfm}｜失敗 ${fail}`);
