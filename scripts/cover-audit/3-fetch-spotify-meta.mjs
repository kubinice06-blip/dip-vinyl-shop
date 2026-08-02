// 卡池封面稽核 步驟 3：把配到的 Spotify album id 換成「Spotify 那一端的真實專輯資料」。
//
// 兩條原本更省的路都走不通，實測記錄在此免得下次再試一遍：
//   1. open.spotify.com 的 og:title／og:description —— 現在的 web player 不再對一般 fetch
//      輸出這些 meta（回來的 HTML 只有 og:site_name），任務原本設想的抓法已失效。
//   2. /v1/albums?ids=（一次 20 張）—— 本 app 的 client-credentials token 對這個
//      「several objects」端點回 403 Forbidden，單張的 /v1/albums/{id} 卻是 200。
// 所以走單張端點：一張一個請求，但拿得到 album_type（compilation 判定）、
// release_date（年份落差判定）、artists、total_tracks、label，判準可以做得比純比字串精細。
// 節流成單線程 300ms，因為步驟 2 的補齊同時也在間接消耗 Spotify 額度。
//
// 用法：node scripts/cover-audit/3-fetch-spotify-meta.mjs
// 產出：scripts/cover-audit/data/spotify-meta.json（albumId → 專輯資料），可續跑
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const METAFILE = path.join(OUT, 'spotify-meta.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

const kv = JSON.parse(fs.readFileSync(path.join(OUT, 'kv-covers.json'), 'utf8'));
const fillPath = path.join(OUT, 'fill-progress.json');
const fill = fs.existsSync(fillPath) ? JSON.parse(fs.readFileSync(fillPath, 'utf8')) : {};

const ids = new Set();
for (const src of [kv, fill]) {
  for (const v of Object.values(src)) {
    const m = v?.spotifyUrl?.match(/album\/([A-Za-z0-9]+)/);
    if (m) ids.add(m[1]);
  }
}
const meta = fs.existsSync(METAFILE) ? JSON.parse(fs.readFileSync(METAFILE, 'utf8')) : {};
const todo = [...ids].filter(id => !(id in meta));
console.log(`Spotify album id：${ids.size} 個（已有 ${ids.size - todo.length}、待抓 ${todo.length}）`);
if (!todo.length) process.exit(0);

let token = (await (await fetch('https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token')).json()).access_token;
if (!token) { console.error('拿不到 Spotify token'); process.exit(1); }

let n = 0, fail = 0;
for (const id of todo) {
  let got = null;
  for (let attempt = 1; attempt <= 4 && !got; attempt++) {
    const r = await fetch(`https://api.spotify.com/v1/albums/${id}?market=TW`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    if (r.ok) { got = await r.json(); break; }
    if (r.status === 429) {                       // 尊重 Retry-After，別硬打
      const wait = Number(r.headers.get('retry-after') || 30);
      console.log(`\n⚠ 429，等 ${wait}s`);
      await sleep((wait + 1) * 1000);
    } else if (r.status === 401) {                // token 過期（50 分）→ 換一顆再試
      token = (await (await fetch('https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token')).json()).access_token;
    } else if (r.status === 404) { break; }       // 專輯下架：記成 null，不重試
    else await sleep(1200 * attempt);
  }
  if (got) {
    meta[id] = {
      id: got.id, name: got.name, albumType: got.album_type, releaseDate: got.release_date,
      totalTracks: got.total_tracks, artists: (got.artists || []).map(x => x.name), label: got.label || null
    };
  } else { meta[id] = null; fail++; }
  n++;
  if (n % 25 === 0) {
    fs.writeFileSync(METAFILE, JSON.stringify(meta, null, 1));
    process.stdout.write(`\r已抓 ${n}/${todo.length}（失敗 ${fail}）`);
  }
  await sleep(300);
}
fs.writeFileSync(METAFILE, JSON.stringify(meta, null, 1));
console.log(`\n完成，spotify-meta.json 共 ${Object.keys(meta).length} 筆（失敗 ${fail}）`);
