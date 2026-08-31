// 補封面：把 covers.json 裡沒有封面的卡，改走 worker 的 Spotify／Bandcamp 代理再撈一次。
//
// **為什麼要另外寫這支**：c47/resolve-covers.mjs 的後備分支讀的是 `j.coverUrl`，
// 但 worker 的 /spotify-search 與 /bandcamp-search 回的欄位叫 `imageUrl`——
// 那兩條後備從寫下來就沒有生效過。c-47 因為 178 張裡 177 張都在 CAA 命中，
// 這個缺陷一直沒露出來；c-49 有 52 張華語老唱片不在 CAA，才整批落空。
//
// 用法：node batch-progress/fill-covers.mjs <批名> [--write]
//   不加 --write 只回報可補幾張。
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const batch = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!batch) { console.error('用法: node batch-progress/fill-covers.mjs <批名> [--write]'); process.exit(1); }

const P = `${ROOT}/batch-progress/${batch}/covers.json`;
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));
const miss = rows.filter(r => !r.cover);
console.log(`${batch}｜共 ${rows.length}｜缺封面 ${miss.length}`);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function tryOne(path, a, b) {
  const url = `${W}/${path}?artist=${encodeURIComponent(a)}&album=${encodeURIComponent(b)}`;
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (res.ok) {
        const j = await res.json();
        // 兩個端點都回 imageUrl；coverUrl 留著是為了相容日後可能的改名
        const img = j.imageUrl || j.coverUrl;
        if (img) return { url: img, note: j.spotifyUrl || j.bandcampUrl || '' };
        return null;                       // 回 200 但沒圖＝真的查無
      }
      if (res.status === 429) await sleep(4000 * (i + 1));
    } catch { await sleep(2000 * (i + 1)); }
  }
  return null;
}

let got = 0;
for (const [i, r] of miss.entries()) {
  for (const [path, source] of [['spotify-search', 'spotify'], ['bandcamp-search', 'bandcamp']]) {
    const hit = await tryOne(path, r.artist, r.album);
    if (hit) { r.cover = { url: hit.url, source, note: hit.note }; got++; break; }
  }
  await sleep(400);
  if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${miss.length}（補到 ${got}）`);
}
console.log(`補到 ${got}／${miss.length}`);
if (WRITE) { fs.writeFileSync(P, JSON.stringify(rows, null, 1)); console.log('已寫回 ' + P); }
else console.log('（乾跑，未寫回。加 --write）');
rows.filter(r => !r.cover).forEach(r => console.log('  ✗ 仍無：' + r.artist + ' — ' + r.album));
