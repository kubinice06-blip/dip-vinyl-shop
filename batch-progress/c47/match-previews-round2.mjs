#!/usr/bin/env node
// 試聽配對第二輪：第一輪靠 UPC 直查拿到 107 張，副產品是 107 個已驗證的 Apple artistId。
// 這輪用那些 artistId 拉整份藝人目錄（/lookup?entity=album，不碰被封鎖的 /search），
// 替同藝人的其他卡、以及 UPC 查不到的卡補配對。
//
// 比對規則：名稱正規化相等 → 年份最接近 → 排除 cleaned。
// 找不到就維持 unavailable（寧缺勿錯，§6 的版本核對要求）。
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
const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
// 藝人 → 已知 appleArtistId（第一輪 UPC 命中的副產品）
const aid = new Map();
for (const a of all) {
  const r = prev[a.artist + '|' + a.album];
  if (r?.appleArtistId) aid.set(a.artist, r.appleArtistId);
}
console.log(`已知 Apple artistId 的藝人：${aid.size} 位`);
const todo = all.filter(a => prev[a.artist + '|' + a.album]?.status !== 'ready' && aid.has(a.artist));
console.log(`可用目錄補配的卡：${todo.length} 張\n`);

const cache = new Map();
let got = 0;
for (const a of todo) {
  const id = aid.get(a.artist);
  let list = cache.get(id);
  if (!list) {
    list = [];
    for (const st of ['TW', 'US']) {
      const j = await itunes(`https://itunes.apple.com/lookup?id=${id}&entity=album&limit=200&country=${st}`);
      const l = (j?.results || []).filter(x => x.wrapperType === 'collection').map(x => ({ ...x, _store: st }));
      list.push(...l);
      await sleep(400);
    }
    cache.set(id, list);
  }
  const hit = list.filter(x => norm(x.collectionName) === norm(a.album) && x.collectionExplicitness !== 'cleaned');
  if (!hit.length) { prev[a.artist + '|' + a.album].note = '目錄無同名（UPC 亦未命中）'; continue; }
  const pick = hit.sort((x, y) =>
    Math.abs(new Date(x.releaseDate || 0).getFullYear() - a.suggestedYear) -
    Math.abs(new Date(y.releaseDate || 0).getFullYear() - a.suggestedYear))[0];
  // 取首軌試聽
  let pv = null;
  for (const st of [pick._store, pick._store === 'TW' ? 'US' : 'TW']) {
    const j = await itunes(`https://itunes.apple.com/lookup?id=${pick.collectionId}&entity=song&limit=200&country=${st}`);
    const tr = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl)
      .sort((x, y) => (x.discNumber - y.discNumber) || (x.trackNumber - y.trackNumber));
    if (tr.length) { pv = { url: tr[0].previewUrl, store: st, firstTrack: tr[0].trackName }; break; }
    await sleep(350);
  }
  if (!pv) { prev[a.artist + '|' + a.album].note = `目錄命中 ${pick.collectionId} 但無試聽`; continue; }
  prev[a.artist + '|' + a.album] = {
    status: 'ready', url: pv.url, source: 'apple', storefront: pv.store,
    appleCollectionId: String(pick.collectionId), appleCollectionName: pick.collectionName,
    appleArtistId: String(pick.artistId || id), explicitness: pick.collectionExplicitness,
    trackCount: pick.trackCount, appleYear: String(pick.releaseDate || '').slice(0, 4),
    firstTrack: pv.firstTrack, matchedVia: 'catalog', note: '',
  };
  got++;
  console.log(`  ✓ ${a.artist} — ${a.album}（Apple: ${pick.collectionName}, ${String(pick.releaseDate || '').slice(0, 4)}）`);
  await sleep(400);
}
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1));
const ready = Object.values(prev).filter(v => v.status === 'ready').length;
console.log(`\n第二輪新增 ${got} 張｜總 ready ${ready}/${all.length}`);
