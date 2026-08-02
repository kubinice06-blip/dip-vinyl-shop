// 卡池封面稽核 步驟 3b：改從 Spotify 的 embed 頁取回專輯名與藝人。
//
// 為什麼需要這條備援：步驟 2 把六千多張未快取的卡補完之後，api.spotify.com 就被限流了
// （/v1/albums/{id} 回 429、Retry-After 約 21 小時；/v1/search 約 5 小時），
// 步驟 3 只抓到 575 筆就卡死。open.spotify.com/embed/album/{id} 是另一套基礎設施、
// 不吃 API 額度，頁面內的 __NEXT_DATA__ 直接帶 name 與 subtitle（藝人）。
//
// 代價：拿不到 album_type 與 release_date，所以「合輯且年份差」「年份差」這兩條判準
// （B／C 級）對這批卡失效；A 級靠的是名稱包含關係、藝人比對與名稱裡的精選輯字樣，
// 完全不受影響——要量化的主症狀因此仍然掃得到。等限流解除可再跑步驟 3 補齊年份與型別。
//
// 用法：node scripts/cover-audit/3b-fetch-embed-meta.mjs [--conc 3] [--gap 600]
// 產出：scripts/cover-audit/data/spotify-meta.json（與步驟 3 共用，已存在的不覆寫）
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const METAFILE = path.join(OUT, 'spotify-meta.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? Number(argv[i + 1]) : d; };
const CONC = argOf('--conc', 3), GAP = argOf('--gap', 600);

const read = f => { const p = path.join(OUT, f); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {}; };
const ids = new Set();
for (const src of [read('kv-covers.json'), read('fill-progress.json')]) {
  for (const v of Object.values(src)) {
    const m = v?.spotifyUrl?.match(/album\/([A-Za-z0-9]+)/);
    if (m) ids.add(m[1]);
  }
}
const meta = read('spotify-meta.json');
const todo = [...ids].filter(id => !(id in meta) || meta[id] == null);
console.log(`album id 共 ${ids.size}｜已有 ${ids.size - todo.length}｜待抓 ${todo.length}`);
if (!todo.length) process.exit(0);

let n = 0, fail = 0, cursor = 0;
const save = () => fs.writeFileSync(METAFILE, JSON.stringify(meta, null, 1));

async function grab(id) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(`https://open.spotify.com/embed/album/${id}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36' }
      });
      if (r.status === 429) { await sleep(30000); continue; }
      if (!r.ok) { await sleep(1000 * attempt); continue; }
      const m = (await r.text()).match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if (!m) { await sleep(1000 * attempt); continue; }
      const e = JSON.parse(m[1])?.props?.pageProps?.state?.data?.entity;
      if (!e?.name) return null;
      return {
        id, name: e.name, albumType: null, releaseDate: e.releaseDate || null,
        totalTracks: null, artists: e.subtitle ? [e.subtitle] : [], label: null, source: 'embed'
      };
    } catch { await sleep(1000 * attempt); }
  }
  return null;
}

const lane = async () => {
  while (cursor < todo.length) {
    const id = todo[cursor++];
    await sleep(GAP);
    const got = await grab(id);
    if (got) meta[id] = got; else { meta[id] = null; fail++; }
    if (++n % 50 === 0) { save(); process.stdout.write(`\r${n}/${todo.length}（失敗 ${fail}）`); }
  }
};
await Promise.all(Array.from({ length: CONC }, lane));
save();
console.log(`\n完成，spotify-meta.json 共 ${Object.keys(meta).length} 筆（本輪失敗 ${fail}）`);
