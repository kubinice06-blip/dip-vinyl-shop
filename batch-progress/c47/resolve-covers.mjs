// c-47 封面解析：候選都帶 rgMbid，走「CAA release-group front 直取 → 驗證 → 不行再 Spotify／Bandcamp」。
// 用法：node batch-progress/c47/resolve-covers.mjs <cand-*.json 或合併檔> [輸出檔]
//
// 與 dip-card-pool-expand/scripts/2-resolve-covers.mjs 的差別：那支是「沒有 mbid、從搜尋起步」
// 的通用鏈；本批已在身分階段釘好 rgMbid，直接打 CAA 快且準。
// 已知陷阱（c-44～c-46 實測十餘筆）：**CAA 的 release-group front 回的是該 RG 底下任意一筆
// release 的圖**，可能是宣傳盤套、日版側標、重發版——所以每張都要記下實際命中的 release，
// 之後人工抽驗；HEAD 不可靠，一律 GET；302 轉 archive.org 那層會間歇 500，重試 5 次。
import fs from 'node:fs';

const inPath = process.argv[2];
const outPath = process.argv[3] || inPath.replace(/\.json$/, '-covers.json');
if (!inPath) { console.error('用法: node resolve-covers.mjs <cand.json> [out]'); process.exit(1); }
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const src = JSON.parse(fs.readFileSync(inPath, 'utf8'));
const albums = Array.isArray(src) ? src : src.albums;
console.log(`${albums.length} 張`);

async function grab(url, tries = 5) {
  let last = 0;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
      last = r.status;
      if (r.ok) return r;
      if (r.status < 500) return r;       // 4xx 是真的沒有，別重試
    } catch { /* timeout */ }
    await sleep(1200 * (i + 1));
  }
  return { ok: false, status: last };
}

const out = [];
for (const [i, a] of albums.entries()) {
  const rec = { artist: a.artist, album: a.album, rgMbid: a.rgMbid, cover: null };
  // 1) CAA release-group front
  if (a.rgMbid) {
    const url = `https://coverartarchive.org/release-group/${a.rgMbid}/front`;
    const r = await grab(url);
    if (r.ok) rec.cover = { url, source: 'caa', note: 'rg front（回 RG 底下任意 release 的圖，需人工抽驗版本）' };
    await sleep(1100);                     // CAA/MB 禮儀
  }
  // 2) Spotify（worker 代理；429 期回空不代表查無）
  if (!rec.cover) {
    try {
      const j = await (await fetch(`${W}/spotify-search?artist=${encodeURIComponent(a.artist)}&album=${encodeURIComponent(a.album)}`, { signal: AbortSignal.timeout(20000) })).json();
      // worker 回的欄位是 imageUrl，不是 coverUrl。原本只讀 coverUrl，這條後備從寫下來
      // 就沒生效過——c-47 因為 178 張裡 177 張都在 CAA 命中而沒露出來，c-49 才炸開。
      const img = j && (j.imageUrl || j.coverUrl);
      if (img) rec.cover = { url: img, source: 'spotify', note: j.spotifyUrl || j.albumName || '' };
    } catch { /* next */ }
  }
  // 3) Bandcamp（這批命中率低，聊備一格）
  if (!rec.cover) {
    try {
      const j = await (await fetch(`${W}/bandcamp-search?artist=${encodeURIComponent(a.artist)}&album=${encodeURIComponent(a.album)}`, { signal: AbortSignal.timeout(20000) })).json();
      const img = j && (j.imageUrl || j.coverUrl);       // 同上：欄位是 imageUrl
      if (img) rec.cover = { url: img, source: 'bandcamp', note: j.bandcampUrl || j.albumName || '' };
    } catch { /* miss */ }
  }
  out.push(rec);
  if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${albums.length}（有封面 ${out.filter(x => x.cover).length}）`);
}
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
const miss = out.filter(x => !x.cover);
console.log(`\n完成｜有封面 ${out.length - miss.length}／${out.length}`);
miss.forEach(m => console.log('  ✗ 無封面：' + m.artist + ' — ' + m.album));
console.log(`→ ${outPath}`);
