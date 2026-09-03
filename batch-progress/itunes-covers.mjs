// 用 iTunes 補封面與試聽候選：CAA 與 Spotify 都撈不到的華語／台語老唱片走這條。
//
// **本機 IP 對 iTunes /search 的封鎖已解除**（2026-08-31 實測回 200，備忘錄裡
// 「/search 長效封鎖、只有 /lookup 可用」那條已過時）。/search 一次就能拿到
// artworkUrl100 與 collectionId，前者換成 600x600 當封面，後者供試聽配對用。
//
// 比對紀律（沿用 c-45 至 c-47 的教訓）：
//   - 藝人與專輯名都要正規化後互相包含才算命中，短名另要求藝人完全吻合，
//     免得《Penny》這種通用字配到別人的碟。
//   - 一律排除 collectionExplicitness 的 cleaned（淨化版是不同版本，寧缺勿錯）。
//   - 命中的 collectionName 一律記下來，供人工抽驗。
//
// 用法：node batch-progress/itunes-covers.mjs <批名> [--write]
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
const WRITE = process.argv.includes('--write');
if (!batch) { console.error('用法: node batch-progress/itunes-covers.mjs <批名> [--write]'); process.exit(1); }

const P = `${ROOT}/batch-progress/${batch}/covers.json`;
const rows = JSON.parse(fs.readFileSync(P, 'utf8'));
const miss = rows.filter(r => !r.cover);
console.log(`${batch}｜共 ${rows.length}｜缺封面 ${miss.length}`);
const sleep = ms => new Promise(r => setTimeout(r, ms));

const norm = s => String(s || '').toLowerCase()
  .replace(/[（）()【】\[\]・·,，。.\s'’"”:：!！?？\-–—_/／]/g, '');

// storefront 要跟著唱片的產地走。台灣店面查不到希臘 rebetiko 與蘇聯 Мелодия 的盤，
// 這不是「Apple 沒有這張碟」，是查錯了店面——c-62 的 7 張全空就是這樣來的。
// 用 --country=gr,us 指定，預設仍是 tw。
const ci = process.argv.findIndex(a => a.startsWith('--country='));
const COUNTRIES = ci >= 0 ? process.argv[ci].split('=')[1].split(',').filter(Boolean) : ['tw'];

async function search(term, entity = 'album') {
  for (const country of COUNTRIES) {
    const u = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&country=${country}&limit=25`;
    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(u, { signal: AbortSignal.timeout(25000) });
        if (r.ok) { const res = (await r.json()).results || []; if (res.length) return res; break; }
        if (r.status === 403) break;                   // 又被擋就別重試，換下一個店面
      } catch { /* retry */ }
      await sleep(1500 * (i + 1));
    }
  }
  return [];
}

function pick(results, artist, album) {
  const na = norm(artist), nb = norm(album);
  const cand = results.filter(r => r.collectionExplicitness !== 'cleaned');
  const artistOK = r => {
    const ra = norm(r.artistName);
    return ra === na || ra.includes(na) || na.includes(ra);
  };
  const albumOK = r => {
    const rb = norm(r.collectionName);
    return rb === nb || rb.includes(nb) || nb.includes(rb);
  };
  // 完全吻合優先；短專輯名（少於 4 個正規化字元）要求藝人完全吻合，免得配到通用字
  const exact = cand.find(r => artistOK(r) && norm(r.collectionName) === nb);
  if (exact) return { r: exact, exact: true };
  const fuzzy = cand.find(r => artistOK(r) && albumOK(r) &&
    (nb.length >= 4 || norm(r.artistName) === na));
  return fuzzy ? { r: fuzzy, exact: false } : null;
}

let got = 0;
for (const [i, row] of miss.entries()) {
  // 兩種查法：藝人＋專輯合併查最準；查不到再單查藝人、從整份目錄裡挑
  let hit = pick(await search(`${row.artist} ${row.album}`), row.artist, row.album);
  if (!hit) { await sleep(300); hit = pick(await search(row.artist), row.artist, row.album); }
  if (hit) {
    const art = String(hit.r.artworkUrl100 || '').replace(/\/\d+x\d+bb\.(jpg|png)$/, '/600x600bb.$1');
    if (art) {
      row.cover = {
        url: art, source: 'manual',
        note: `itunes ${hit.exact ? '完全吻合' : '模糊命中'}：${hit.r.artistName} — ${hit.r.collectionName}`,
      };
      row.itunes = { collectionId: hit.r.collectionId, collectionName: hit.r.collectionName, artistName: hit.r.artistName };
      got++;
    }
  }
  await sleep(400);
  if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${miss.length}（補到 ${got}）`);
}
console.log(`iTunes 補到 ${got}／${miss.length}`);
if (WRITE) { fs.writeFileSync(P, JSON.stringify(rows, null, 1)); console.log('已寫回'); }
else console.log('（乾跑）');
rows.filter(r => !r.cover).forEach(r => console.log('  ✗ 仍無：' + r.artist + ' — ' + r.album));
