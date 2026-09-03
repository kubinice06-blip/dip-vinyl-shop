// 缺封面、但試聽探測已經釘到 Apple collectionId 的卡，改用那張碟的官方封面。
//
// 依 ALBUM_ONBOARDING §4 的 2026-09-02 例外（c-64 增列）：可用人工核對過的
// Apple 專輯頁當封面來源，要件是記下確切的 collectionId。這裡的 collectionId
// 不是模糊搜尋來的——它是試聽探測用 match-lib 的嚴格規則配到、且逐筆核對過的
// 同一張碟，所以「這張碟在 Apple 上是哪一筆」這件事已經確定，只是先前沒去取封面。
//
// 用法：node batch-progress/apple-cover-from-preview.mjs <批名> [--write]
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!batch) { console.error('用法: node batch-progress/apple-cover-from-preview.mjs <批名> [--write]'); process.exit(1); }
const dir = `${ROOT}/batch-progress/${batch}`;
const P = `${dir}/covers.json`;
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));
const probe = JSON.parse(fs.readFileSync(`${dir}/previews.json`, 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let got = 0, tried = 0;
for (const r of rows) {
  if (r.cover) continue;
  const p = probe[r.artist + '|' + r.album];
  if (!p || !p.collectionId) continue;
  tried++;
  const front = String(p.front || 'us').toLowerCase();
  let art = null, name = '', who = '';
  for (let i = 0; i < 3; i++) {
    try {
      const u = `https://itunes.apple.com/lookup?id=${p.collectionId}&country=${front}&entity=album`;
      const res = await fetch(u, { signal: AbortSignal.timeout(25000) });
      if (res.ok) {
        const j = await res.json();
        const hit = (j.results || []).find(x => x.collectionType || x.collectionName);
        if (hit) {
          art = String(hit.artworkUrl100 || '').replace(/\/\d+x\d+bb\.(jpg|png)$/, '/600x600bb.$1');
          name = hit.collectionName || ''; who = hit.artistName || '';
        }
        break;
      }
    } catch { /* retry */ }
    await sleep(1500 * (i + 1));
  }
  if (art) {
    r.cover = {
      url: art, source: 'apple-verified-collection',
      note: `試聽探測釘定的 collectionId ${p.collectionId}（${front}）：${who} — ${name}`,
    };
    r.appleCollectionId = String(p.collectionId);
    got++;
    console.log(`  ✓ ${r.artist} — ${r.album}  ←  ${who} — ${name}`);
  } else {
    console.log(`  ✗ lookup 無結果：${r.artist} — ${r.album}（cid ${p.collectionId}）`);
  }
  await sleep(400);
}
console.log(`${batch}｜可救 ${tried} 張，取到封面 ${got} 張`);
if (WRITE && got) { fs.writeFileSync(P, JSON.stringify(rows, null, 1)); console.log('已寫回'); }
else if (!WRITE) console.log('（乾跑）');
