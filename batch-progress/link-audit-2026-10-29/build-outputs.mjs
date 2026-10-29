// 彙整：classified.json + ap-fix.json + sp-fix.json → preview-issues.json / streaming-issues.json / fix-plan.json（寫進本批次夾）
import fs from 'node:fs';
import { DEF_WORK, ROOT } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const here = new URL('.', import.meta.url).pathname;
const C = JSON.parse(fs.readFileSync(`${WORK}/classified.json`, 'utf8'));
const apFix = JSON.parse(fs.readFileSync(`${WORK}/ap-fix.json`, 'utf8'));
const spFix = JSON.parse(fs.readFileSync(`${WORK}/sp-fix.json`, 'utf8'));
const look = JSON.parse(fs.readFileSync(`${WORK}/ap-lookup.json`, 'utf8'));
const rt = JSON.parse(fs.readFileSync(`${ROOT}/data/apple-audio-runtime-v1.json`, 'utf8')).entries;
const mp = JSON.parse(fs.readFileSync(`${ROOT}/data/apple-audio-map-v1.json`, 'utf8')).entries;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function alive(u) { for (let a = 0; a < 3; a++) { try { const r = await fetch(u, { method: 'HEAD', signal: AbortSignal.timeout(15000) }); if (r.status === 200 || r.status === 206) return true; if (r.status === 404) return false; } catch {} await sleep(1500); } return false; }
const TODAY = '2026-10-29';
const pick = (o, ks) => Object.fromEntries(ks.filter(k => o[k] !== undefined).map(k => [k, o[k]]));

// ── 試聽 ──
const pv = C.preview.filter(x => x.verdict !== 'ok');
const previewIssues = {
  generatedAt: TODAY, source: 'data/apple-audio-runtime-v1.json（17,729 筆）× HEAD 探活 × iTunes Lookup（原店面＋TW/US/JP/KR/GB 複查）',
  stat: C.apStat, verdictCount: C.cnt.preview,
  verdictLegend: { wrong: '人工確認指錯（錯專輯／錯藝人／錯版本）', review: '存疑、待人工確認', gone: '專輯在該店面已下架（collectionId 查無）', orphan: '索引有、但卡池已無此卡', ok: '機器旗標、人工判定誤報（只列計數）' },
  items: pv.map(x => ({ verdict: x.verdict, reason: x.reason, artist: x.artist, album: x.album, key: x.key, storefront: x.storefront, collectionId: x.collectionId, previewUrl: x.previewUrl, head: x.head, apple: x.apple, otherStoreNames: x.otherStoreNames, knownGoneSince: mp[x.key]?.collectionGone || undefined, flags: x.flags })),
  mapStatusError: Object.entries(mp).filter(([, v]) => v.status === 'error').map(([k, v]) => ({ key: k, artist: v.artist, album: v.album, pool: v.pool, notes: v.notes, note: v.note })),
  mapStatusReview: Object.entries(mp).filter(([, v]) => v.status === 'review').map(([k, v]) => ({ key: k, artist: v.artist, album: v.album, pool: v.pool, candidate: v.candidate || pick(v, ['artistName', 'collectionName', 'storefront', 'collectionId', 'score']), note: v.note, notes: v.notes })),
};
const plan = { generatedAt: TODAY, note: '只讀稽核產出的修正建議，尚未寫入。preview 項改 data/apple-audio-map-v1.json 的 mapPatch 後跑 scripts/build-apple-audio-runtime-map.mjs 重建 runtime；streaming 項比照 sp-audit/apply.mjs：先 GET 備份、確認現值 = old 才 PUT、寫完讀回。', preview: [], streaming: [] };
for (const x of C.preview.filter(x => ['wrong', 'gone'].includes(x.verdict))) {
  const f = apFix[x.key] || { kind: 'none' }; const old = rt[x.key]; const known = !!mp[x.key]?.collectionGone;
  let e = null;
  if ((f.kind === 'replace' || f.kind === 'switch-storefront') && f.value) {
    const [sf, id, url, slug] = f.value;
    if (f.kind === 'replace' && !(await alive(url))) { console.log('new preview dead', x.key); }
    else e = { action: f.kind, priority: x.verdict === 'wrong' ? 'high' : known ? 'low' : 'medium', old, new: f.value, newAlbum: f.name,
      mapPatch: { storefront: sf, collectionId: id, previewUrl: url, ...(slug ? { collectionViewUrl: `https://music.apple.com/${sf.toLowerCase()}/album/${slug}/${id}` } : {}), collectionGone: null, note: `${TODAY} 連結稽核：${x.reason}；改配 ${f.name}` } };
  }
  if (!e) {
    if (x.verdict === 'wrong') e = { action: 'remove', priority: 'high', old, new: null, mapPatch: { status: 'unavailable', note: `${TODAY} 連結稽核：${x.reason}，找不到正確版本，撤下（前台改走搜尋備援、Apple 鈕變灰）` } };
    else if (!known) e = { action: 'mark-gone', priority: 'medium', old, new: [old[0], old[1], old[2], ''], mapPatch: { collectionGone: `${TODAY}T00:00:00.000Z` }, note: '試聽音檔仍可播，只把 Apple 專輯鈕改灰（避免連到下架頁）' };
  }
  if (e) plan.preview.push({ mapKey: x.key, artist: x.artist, album: x.album, verdict: x.verdict, reason: x.reason, ...e });
}
// 名稱段缺漏但 lookup 仍查得到的（不在旗標裡）
for (const [k, v] of Object.entries(rt)) if (!v[3] && !mp[k]?.collectionGone) {
  const L = look[`${v[0]}:${v[1]}`]; if (!L?.albumSlug) continue;
  plan.preview.push({ mapKey: k, artist: mp[k]?.artist, album: mp[k]?.album, verdict: 'missing-slug', reason: 'runtime 名稱段空白，Apple 鈕目前是灰的；lookup 仍查得到', action: 'fill-slug', priority: 'low', old: v, new: [v[0], v[1], v[2], encodeURIComponent(L.albumSlug)], mapPatch: { collectionViewUrl: `https://music.apple.com/${v[0].toLowerCase()}/album/${encodeURIComponent(L.albumSlug)}/${v[1]}` } });
}
// map 裡 status=review、候選其實正確（只差版本加註或譯名）的，建議轉正
const PROMOTE = { 'iggyandthestooges\u0000rawpower': 'Raw Power 50 週年版，藝人中文譯名', 'live\u0000throwingcopper': '藝人名大小寫不同', 'kiss\u0000alive': '原盤即現場盤，2025 remaster', 'dicklee\u0000themadchinaman': '李迪文＝Dick Lee', 'evelynking\u0000iminlove': 'Expanded Edition，藝人中文譯名', 'hermetopascoal\u0000zabumbebuma': 'Remasterizado，藝人中文譯名' };
for (const [k0, why] of Object.entries(PROMOTE)) {
  const k = JSON.parse(`"${k0}"`); const c = mp[k]?.candidate; if (!c?.previewUrl || !(await alive(c.previewUrl))) { console.log('promote skip', k); continue; }
  const j = await (await fetch(`https://itunes.apple.com/lookup?id=${c.collectionId}&country=${c.storefront}`)).json(); await sleep(3200);
  const col = (j.results || [])[0]; const slug = (col?.collectionViewUrl || '').match(/\/album\/([^/]+)\/\d+/)?.[1] || '';
  if (!col) { console.log('promote gone', k); continue; }
  plan.preview.push({ mapKey: k, artist: mp[k].artist, album: mp[k].album, verdict: 'map-review', reason: `map 狀態 review，候選「${c.artistName} — ${c.collectionName}」覆核正確（${why}）`, action: 'promote', priority: 'low', old: null, new: [c.storefront, String(c.collectionId), c.previewUrl, slug], newAlbum: `${col.artistName} — ${col.collectionName}`,
    mapPatch: { status: 'matched', storefront: c.storefront, collectionId: String(c.collectionId), previewUrl: c.previewUrl, artistName: c.artistName, collectionName: c.collectionName, ...(slug ? { collectionViewUrl: `https://music.apple.com/${c.storefront.toLowerCase()}/album/${slug}/${c.collectionId}` } : {}), note: `${TODAY} 連結稽核：人工覆核轉正（${why}）` } });
}
// ── 串流 ──
const sv = C.streaming.filter(x => x.verdict !== 'ok');
const streamingIssues = { generatedAt: TODAY, source: 'KV cover6:*（12,455 鍵）× Spotify oEmbed', stat: C.spStat, verdictCount: C.cnt.streaming,
  otherPlatformFields: 'cover6 值只有 imageUrl／coverSource／rgMbid／spotifyUrl／spotifyChecked／replacedSpotifyAlbum，沒有 Apple／YouTube 等其他平台欄位；Apple Music 鈕走試聽索引（見 preview-issues.json）。',
  items: sv.map(x => ({ verdict: x.verdict, reason: x.reason, key: x.key, artist: x.artist, album: x.album, inSeed: x.inSeed, spotifyUrl: x.spotifyUrl, spotifyTitle: x.spotifyTitle, oembedStatus: x.oembedStatus, rgMbid: x.rgMbid, spotifyChecked: x.spotifyChecked, flags: x.flags })) };
for (const x of C.streaming.filter(x => x.verdict === 'wrong' || x.verdict === 'dead')) {
  const f = spFix[x.key] || {};
  plan.streaming.push({ kvKey: x.key, artist: x.artist, album: x.album, inSeed: x.inSeed, verdict: x.verdict, reason: x.reason, action: f.pick ? 'replace' : 'clear',
    old: x.spotifyUrl, oldTitle: x.spotifyTitle, new: f.pick ? f.pick.u : '', newTitle: f.pick ? f.pick.t : null, mbReleaseGroup: f.rg || null, mbSource: f.rgSource || null, mbCandidates: (f.cands || []).length,
    spotifyChecked: `fix-${TODAY}-link-audit` });
}
plan.summary = {
  preview: Object.fromEntries(['replace', 'switch-storefront', 'remove', 'mark-gone', 'fill-slug', 'promote'].map(a => [a, plan.preview.filter(p => p.action === a).length])),
  streaming: { replace: plan.streaming.filter(p => p.action === 'replace').length, clear: plan.streaming.filter(p => p.action === 'clear').length },
};
fs.writeFileSync(`${here}preview-issues.json`, JSON.stringify(previewIssues, null, 1));
fs.writeFileSync(`${here}streaming-issues.json`, JSON.stringify(streamingIssues, null, 1));
fs.writeFileSync(`${here}fix-plan.json`, JSON.stringify(plan, null, 1));
console.log(JSON.stringify(plan.summary), 'preview items', previewIssues.items.length, 'streaming items', streamingIssues.items.length);
