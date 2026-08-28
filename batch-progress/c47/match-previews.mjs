#!/usr/bin/env node
// c-47 固定試聽配對。
//
// 本機 IP 對 iTunes /search 有長效封鎖（2026-07 起實測），只有 /lookup 與 CDN 可用，
// 所以不能走一般的專輯搜尋。**第一版走「MB url-rels 找 Apple 連結」的路子整批落空
// （172/172）**——實測 MB 的 release-group relations 只有 AllMusic／Discogs／Last.fm／
// Genius／RYM，**沒有 Apple**，那條路徑根本不存在。改用下面兩條：
//
//   路徑 A（有 UPC 時）：/lookup?upc=<條碼> —— 直接命中該版本，最準。
//   路徑 B：先用任一已知 collectionId 或 UPC 取得 artistId，再
//           /lookup?id=<artistId>&entity=album&limit=200 拉整份目錄，名稱正規化比對。
//           artistId 的取得同樣不能靠 search，所以只有 A 成功過的藝人才有 B 可用；
//           其餘卡標 unavailable，留給店主後台補或下批處理。
//
// explicitness：一律排除 cleaned（c-45 教訓，淨化版是不同版本，寧缺勿錯）。
// 可續跑：previews.json 已有的卡跳過。
import fs from 'node:fs';
const R = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const OUT = `${R}/batch-progress/c47/previews.json`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function itunes(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (r.ok) { const t = await r.text(); try { return JSON.parse(t); } catch { return null; } }
      if (r.status === 403 || r.status === 429) { await sleep(4000 * (i + 1)); continue; }
      return null;
    } catch { await sleep(2500 * (i + 1)); }
  }
  return null;
}

const EDITION = /\s*[\(\[][^)\]]*(deluxe|expanded|explicit|clean|edited|remaster(ed)?|anniversary|bonus|special|edition|version|reissue|mono|stereo|soundtrack)[^)\]]*[\)\]]/gi;
const norm = s => String(s || '').replace(EDITION, '').replace(/&/g, 'and')
  .toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, '');

const all = JSON.parse(fs.readFileSync(`${R}/batch-progress/c47/cand-all.json`, 'utf8'));
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const artistCache = new Map();     // artistId -> 目錄

async function firstPreview(collectionId, store) {
  for (const st of [store, store === 'TW' ? 'US' : 'TW']) {
    const j = await itunes(`https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=200&country=${st}`);
    const tr = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl)
      .sort((a, b) => (a.discNumber - b.discNumber) || (a.trackNumber - b.trackNumber));
    if (tr.length) return { url: tr[0].previewUrl, store: st, firstTrack: tr[0].trackName };
    await sleep(350);
  }
  return null;
}

let done = 0, ready = 0, viaUpc = 0, viaCatalog = 0;
for (const a of all) {
  const key = a.artist + '|' + a.album;
  if (prev[key]) { done++; if (prev[key].status === 'ready') ready++; continue; }
  const rec = { status: 'unavailable', note: '' };
  let coll = null, store = 'TW';

  // 路徑 A：UPC 直查
  if (a.upc) {
    for (const st of ['TW', 'US']) {
      const j = await itunes(`https://itunes.apple.com/lookup?upc=${encodeURIComponent(a.upc)}&country=${st}`);
      const c = (j?.results || []).find(x => x.wrapperType === 'collection');
      if (c) { coll = c; store = st; viaUpc++; break; }
      await sleep(300);
    }
  }
  // 路徑 B：同藝人已知 artistId 的目錄
  if (!coll) {
    const known = all.find(x => x.artist === a.artist && prev[x.artist + '|' + x.album]?.appleArtistId);
    const aid = known ? prev[known.artist + '|' + known.album].appleArtistId : null;
    if (aid) {
      let list = artistCache.get(aid);
      if (!list) {
        const j = await itunes(`https://itunes.apple.com/lookup?id=${aid}&entity=album&limit=200&country=TW`);
        list = (j?.results || []).filter(x => x.wrapperType === 'collection');
        artistCache.set(aid, list);
      }
      const hit = list.filter(x => norm(x.collectionName) === norm(a.album) && x.collectionExplicitness !== 'cleaned');
      if (hit.length) { coll = hit.sort((x, y) => Math.abs(new Date(x.releaseDate || 0).getFullYear() - a.suggestedYear) - Math.abs(new Date(y.releaseDate || 0).getFullYear() - a.suggestedYear))[0]; viaCatalog++; }
    }
  }

  if (!coll) rec.note = a.upc ? 'UPC 與藝人目錄皆無命中' : '無 UPC 可查（本機 /search 被封鎖，無法用名稱搜尋）';
  else if (coll.collectionExplicitness === 'cleaned') rec.note = `命中 ${coll.collectionId} 但為淨化版，不採用`;
  else {
    const pv = await firstPreview(coll.collectionId, store);
    if (!pv) rec.note = `命中 ${coll.collectionId} 但兩商店皆無試聽`;
    else {
      ready++;
      Object.assign(rec, {
        status: 'ready', url: pv.url, source: 'apple', storefront: pv.store,
        appleCollectionId: String(coll.collectionId), appleCollectionName: coll.collectionName,
        appleArtistId: String(coll.artistId || ''), explicitness: coll.collectionExplicitness,
        trackCount: coll.trackCount, appleYear: String(coll.releaseDate || '').slice(0, 4),
        firstTrack: pv.firstTrack, matchedVia: a.upc && viaUpc ? 'upc' : 'catalog', note: '',
      });
    }
  }
  prev[key] = rec;
  done++;
  if (done % 20 === 0) { fs.writeFileSync(OUT, JSON.stringify(prev, null, 1)); console.log(`${done}/${all.length}（ready ${ready}）`); }
  await sleep(400);
}
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
console.log(`完成｜ready ${ready}/${all.length}｜UPC 命中 ${viaUpc}｜目錄命中 ${viaCatalog}`);
