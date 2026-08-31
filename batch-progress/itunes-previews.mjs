// 固定試聽配對（iTunes）。
//
// c47/match-previews.mjs 當時只能走 UPC 或已知 artistId，因為本機 IP 對 iTunes /search
// 有封鎖；**2026-08-31 實測 /search 已可用**，所以這支直接用 artist+album 查專輯，
// 再 /lookup?id=<collectionId>&entity=song 取該碟的曲目與 previewUrl。
//
// 紀律沿用 c-45 至 c-47：
//   - 一律排除 collectionExplicitness === 'cleaned'（淨化版是不同版本）。
//   - 藝人與專輯都要正規化後對得上；短專輯名另要求藝人完全吻合。
//   - 取第一軌的 previewUrl；沒有 previewUrl 就往後找，全碟都沒有才記 unavailable。
//   - 命中的 collectionName／artistName 一律記下來供人工抽驗。
// 可續跑：previews.json 已有的卡跳過。
//
// 用法：node batch-progress/itunes-previews.mjs <批名>
import fs from 'node:fs';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const batch = process.argv[2];
if (!batch) { console.error('用法: node batch-progress/itunes-previews.mjs <批名>'); process.exit(1); }

const cand = JSON.parse(fs.readFileSync(`${ROOT}/batch-progress/${batch}/cand-all.json`, 'utf8'));
const coversPath = `${ROOT}/batch-progress/${batch}/covers.json`;
const covers = fs.existsSync(coversPath) ? JSON.parse(fs.readFileSync(coversPath, 'utf8')) : [];
// 補封面時已經查到的 collectionId 直接沿用，省一次查詢也避免兩邊挑到不同版本
const known = new Map(covers.filter(c => c.itunes).map(c => [c.artist + '|' + c.album, c.itunes]));

const OUT = `${ROOT}/batch-progress/${batch}/previews.json`;
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s || '').toLowerCase()
  .replace(/[（）()【】\[\]・·,，。.\s'’"”:：!！?？\-–—_/／]/g, '');

async function itunes(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (r.ok) return await r.json();
      if (r.status === 403) return null;              // 被擋就別重試
    } catch { /* retry */ }
    await sleep(1500 * (i + 1));
  }
  return null;
}

function pickAlbum(results, artist, album) {
  const na = norm(artist), nb = norm(album);
  const cand = (results || []).filter(r => r.collectionExplicitness !== 'cleaned' && r.collectionId);
  const artistOK = r => { const ra = norm(r.artistName); return ra === na || ra.includes(na) || na.includes(ra); };
  const exact = cand.find(r => artistOK(r) && norm(r.collectionName) === nb);
  if (exact) return exact;
  return cand.find(r => artistOK(r) &&
    (norm(r.collectionName).includes(nb) || nb.includes(norm(r.collectionName))) &&
    (nb.length >= 4 || norm(r.artistName) === na)) || null;
}

let done = 0, ready = 0, un = 0;
for (const a of cand) {
  const k = a.artist + '|' + a.album;
  if (prev[k]) { done++; if (prev[k].status === 'ready') ready++; else un++; continue; }

  let col = known.get(k) || null;
  if (!col) {
    const j = await itunes(`https://itunes.apple.com/search?term=${encodeURIComponent(a.artist + ' ' + a.album)}&entity=album&country=tw&limit=25`);
    const hit = pickAlbum(j?.results, a.artist, a.album);
    if (hit) col = { collectionId: hit.collectionId, collectionName: hit.collectionName, artistName: hit.artistName };
    await sleep(350);
  }
  if (!col) { prev[k] = { status: 'unavailable', note: 'iTunes 查無對得上的專輯' }; un++; done++; continue; }

  const lk = await itunes(`https://itunes.apple.com/lookup?id=${col.collectionId}&entity=song&country=tw&limit=60`);
  const songs = (lk?.results || []).filter(r => r.wrapperType === 'track' && r.previewUrl);
  if (!songs.length) {
    prev[k] = { status: 'unavailable', note: `命中 ${col.collectionName} 但該碟無 previewUrl` };
    un++;
  } else {
    songs.sort((x, y) => (x.trackNumber || 99) - (y.trackNumber || 99));
    const t = songs[0];
    prev[k] = {
      status: 'ready', source: 'apple', storefront: 'TW', url: t.previewUrl,
      appleCollectionId: String(col.collectionId), appleCollectionName: col.collectionName,
      appleArtistName: col.artistName, firstTrack: t.trackName,
      explicitness: t.trackExplicitness || '', matchedVia: 'search',
    };
    ready++;
  }
  done++;
  await sleep(400);
  if (done % 20 === 0) { fs.writeFileSync(OUT, JSON.stringify(prev, null, 1)); console.log(`  ${done}/${cand.length}（ready ${ready}／unavailable ${un}）`); }
}
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
console.log(`${batch}｜ready ${ready}｜unavailable ${un}｜共 ${cand.length}`);
