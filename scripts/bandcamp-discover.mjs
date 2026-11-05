#!/usr/bin/env node
// Bandcamp 標籤探索清單（discover 頁背後的 API；頁面本身是前端渲染，curl 抓不到清單）。
// 2026-11-05 店主：「Bandcamp 有 downtempo 分類，可以從那邊開始找」——情緒薄格線（恍惚／頹靡）的候選來源。
//
// 用法：node scripts/bandcamp-discover.mjs <tag>[,<tag2>…] [--slice top|new|rec] [--pages N] [--min-tracks 6] [--min-minutes 28] [--out file.json]
//   tag      Bandcamp 標籤的 norm name（網址 bandcamp.com/discover/<tag> 那段，如 downtempo、dark-ambient、slowcore）；多個用逗號＝交集
//   --slice  top＝暢銷（預設，最接近「有名」）；new＝新發行；rec＝編輯推薦
//   --pages  每頁 60 張，預設 3 頁
//   --min-tracks／--min-minutes  粗篩正規專輯（預設 6 首、28 分鐘）；EP、單曲、edit 會被擋掉
// 輸出：每張 {artist, album, url, released, tracks, minutes, location, image}（image＝封面縮圖網址）；只收 item_type a（專輯）。
// 注意：這只是提名池。上架前照 ALBUM_ONBOARDING 查身分、故事性（Bandcamp Daily 專文、樂評）與去重（scripts/pool-keys.mjs、data/pool-removed.json）。
import fs from 'node:fs';

const argv = process.argv.slice(2);
const tags = (argv[0] || '').split(',').map(s => s.trim()).filter(Boolean);
if (!tags.length) { console.error('用法：node scripts/bandcamp-discover.mjs <tag>[,<tag2>] [--slice top|new|rec] [--pages N] [--min-tracks N] [--min-minutes N] [--out file]'); process.exit(1); }
const opt = (k, d) => { const i = argv.indexOf(k); return i > 0 ? argv[i + 1] : d; };
const slice = opt('--slice', 'top'), pages = +opt('--pages', 3), minTracks = +opt('--min-tracks', 6), minMin = +opt('--min-minutes', 28), out = opt('--out', null);
const UA = 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const rows = [];
let cursor = '*';
for (let p = 0; p < pages && cursor; p++) {
  const r = await fetch('https://bandcamp.com/api/discover/1/discover_web', {
    method: 'POST', headers: { 'User-Agent': UA, 'Content-Type': 'application/json' },
    body: JSON.stringify({ category_id: 0, tag_norm_names: tags, geoname_id: 0, slice, cursor, size: 60, include_result_types: ['a'] }),
  });
  const j = await r.json();
  if (!j.results) { console.error('API 回應異常：', JSON.stringify(j).slice(0, 200)); break; }
  for (const x of j.results) {
    if (x.item_type !== 'a') continue;
    const minutes = Math.round((x.duration || 0) / 60);
    if ((x.track_count || 0) < minTracks || minutes < minMin) continue;
    rows.push({ artist: x.album_artist || x.band_name, album: x.title, url: (x.item_url || '').replace(/\?from=.*$/, ''), released: (x.release_date || '').slice(0, 10), tracks: x.track_count, minutes, location: x.band_location || '', image: x.primary_image?.image_id ? `https://f4.bcbits.com/img/a${x.primary_image.image_id}_9.jpg` : '' });
  }
  cursor = j.cursor;
  await sleep(1500);
}
if (out) fs.writeFileSync(out, JSON.stringify(rows, null, 1));
else for (const x of rows) console.log(`${x.artist}｜${x.album}｜${x.released}｜${x.tracks} 首 ${x.minutes} 分｜${x.location}｜${x.url}`);
console.error(`${tags.join('+')} ${slice}：${rows.length} 張（過濾 ${minTracks} 首／${minMin} 分以上）`);
