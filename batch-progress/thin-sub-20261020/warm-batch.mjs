// 薄細項策展線（ts）：新上線一批的卡逐張打 worker /album-genres（Last.fm 標籤寫進 KV mapgenre3），之後 build-genre-tree --pull 才分得進細項。
//   node batch-progress/thin-sub-20261020/warm-batch.mjs https://dip-vinyl-worker.kubinice06.workers.dev add-20261020-ts1
import fs from 'node:fs';
const W = process.argv[2], batch = process.argv[3];
const cards = JSON.parse(fs.readFileSync(`desc-tools/batches/cards/${batch}-cards.json`, 'utf8'));
let ok = 0, empty = 0;
for (const c of cards) {
  try {
    const r = await fetch(`${W}/album-genres?` + new URLSearchParams({ artist: c.artist, album: c.album }), { signal: AbortSignal.timeout(25000) });
    const j = await r.json(); const g = j.genres || j.tags || j;
    if (Array.isArray(g) ? g.length : Object.keys(g || {}).length) ok++; else empty++;
  } catch (e) { empty++; }
  await new Promise(r => setTimeout(r, 1100));
}
console.log(batch, 'tagged', ok, 'empty', empty);
