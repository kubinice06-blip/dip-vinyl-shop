#!/usr/bin/env node
// 試聽改播「該專輯最紅的那首」（2026-11-05 店主：「試聽播出時都是播在該專輯最紅的歌或片段上」）。
//
// Apple 的 30 秒試聽片段由 Apple 決定，前台改不了起點；能改的是「播哪一首」。
// 以前 build-apple-audio-map／fix-cleaned-previews 一律取第一軌（previews[0]），
// 第一軌常是前奏、短曲或非主打。本工具改成：
//   熱度來源 1（主）：Deezer 單曲 rank（search/track 帶 artist:"" album:""，同名曲跨版本取最高）。
//   熱度來源 2（備）：Apple Music 專輯頁的熱門星號 showPopularityIndicator（同商店、Apple 自己的播放量）。
//   都查不到：保留原本那首；原本那首若是 60 秒以下的前奏／短曲，改成第一首 ≥90 秒的歌。
//
// 子命令（皆可中斷續跑，結果逐筆 append 進 JSONL）：
//   node scripts/popular-preview.mjs apple   <outDir> [--only=keys.json]   # iTunes lookup，10 張一批
//   node scripts/popular-preview.mjs deezer  <outDir> [--only=keys.json]   # Deezer rank
//   node scripts/popular-preview.mjs amp     <outDir>                      # Deezer 落空者抓 Apple Music 頁星號
//   node scripts/popular-preview.mjs pick    <outDir>                      # 合併 → picks.json＋報告
//   node scripts/popular-preview.mjs apply   <outDir> [--dry]              # 寫回 apple-audio-map＋manifest
//
// 新卡上架：manifest 寫好 preview（ready、Apple collectionId）後跑
//   node scripts/popular-preview.mjs manifest <manifest.json>
// 會就地把 preview.url 換成該盤最紅那首（同一 collectionId、同一商店），並寫 preview.trackName／popularity。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAP_FILE = path.join(ROOT, 'data', 'apple-audio-map-v1.json');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- 文字正規化 ----------
const VARIANT_WORDS = 'remaster(?:ed)?|re-?master|mono|stereo|version|edit|mix|remix|live|demo|take|feat\\.?|featuring|ft\\.|with|bonus|single|explicit|clean|deluxe|from|soundtrack|original|instrumental|acoustic|session|radio|album|extended|reprise version|bbc|outtake|alternate|alt\\.?|early|rough|unreleased|mono mix|stereo mix|19\\d\\d|20\\d\\d';
const VARIANT_BRACKET = new RegExp(`[\\(\\[\\{（【][^\\)\\]\\}）】]*(?:${VARIANT_WORDS})[^\\)\\]\\}）】]*[\\)\\]\\}）】]`, 'gi');
const VARIANT_DASH = new RegExp(`\\s[-–—]\\s.*(?:${VARIANT_WORDS}).*$`, 'i');
const FLAG_VARIANT = /\b(demo|live|remix|instrumental|karaoke|a ?cappella|acapella|alternate|outtake|rough|take \d|session|rehearsal|bbc|radio edit|backing track|mono)\b/i;

export function normText(value) {
  return String(value || '').normalize('NFKD').toLowerCase()
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-ϿЀ-ԯ֐-ۿऀ-ॿ฀-๿]+/g, '');
}
// tier 1：只拿掉版本註記；tier 2：拿掉所有括號與破折號後綴
export function titleCore(title) {
  return normText(String(title || '').replace(VARIANT_BRACKET, ' ').replace(VARIANT_DASH, ' '));
}
export function titleBare(title) {
  return normText(String(title || '').replace(/[\(\[\{（【][^\)\]\}）】]*[\)\]\}）】]/g, ' ').replace(/\s[-–—]\s.*$/, ' '));
}
const ALBUM_EDITION = /[\(\[\{（【][^\)\]\}）】]*(?:remaster|deluxe|expanded|anniversary|reissue|edition|version|bonus|mono|stereo|legacy|collector|special)[^\)\]\}）】]*[\)\]\}）】]/gi;
function albumCore(value) {
  return normText(String(value || '').replace(ALBUM_EDITION, ' ').replace(/\s[-–—]\s.*(?:remaster|deluxe|edition|anniversary|version).*$/i, ' '));
}
function albumMatches(candidate, wanted) {
  const c = albumCore(candidate), w = albumCore(wanted);
  if (!c || !w) return false;
  if (c === w) return true;
  // 「OK Computer OKNOTOK 1997 2017」這類加尾巴的再版：開頭相同且原名夠長才算
  return w.length >= 6 && c.startsWith(w) && c.length - w.length <= 24;
}
function artistMatches(candidate, wanted) {
  const c = normText(candidate), w = normText(wanted);
  if (!c || !w) return false;
  return c === w || (Math.min(c.length, w.length) >= 3 && (c.includes(w) || w.includes(c)));
}
const mzaf = url => String(url || '').match(/mzaf_(\d+)/)?.[1] || '';

// ---------- I/O ----------
const readJson = f => JSON.parse(fs.readFileSync(f, 'utf8'));
function readJsonl(file) {
  const out = new Map();
  if (!fs.existsSync(file)) return out;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { const row = JSON.parse(line); out.set(row.key, row); } catch (_) {}
  }
  return out;
}
const append = (file, row) => fs.appendFileSync(file, JSON.stringify(row) + '\n');

async function getJson(url, { tries = 6, label = '' } = {}) {
  let wait = 2000;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' }, signal: AbortSignal.timeout(20000) });
      if (res.status === 403 || res.status === 429 || res.status >= 500) throw new Error(`http-${res.status}`);
      if (!res.ok) return { __error: `http-${res.status}` };
      const text = await res.text();
      const json = JSON.parse(text);
      if (json?.error?.code === 4) throw new Error('deezer-quota'); // Deezer 配額：回 200 但 error.code=4
      return json;
    } catch (e) {
      if (i === tries - 1) return { __error: String(e.message || e) };
      await sleep(wait); wait = Math.min(wait * 2, 60000);
    }
  }
}

function targetsFromMap(onlyFile) {
  const map = readJson(MAP_FILE).entries;
  const only = onlyFile ? new Set(readJson(onlyFile)) : null;
  const list = [];
  for (const [key, e] of Object.entries(map)) {
    if (e.status !== 'matched' || !e.collectionId || !e.previewUrl) continue;
    if (only && !only.has(key)) continue;
    list.push({ key, artist: e.artist, album: e.album, storefront: String(e.storefront || 'US').toUpperCase(), collectionId: String(e.collectionId), previewUrl: e.previewUrl, artistName: e.artistName || '', collectionName: e.collectionName || '' });
  }
  return list;
}

// ---------- 1. Apple lookup ----------
function appleTracks(results, cid) {
  return (results || []).filter(x => x.wrapperType === 'track' && String(x.collectionId) === cid && x.previewUrl)
    .map(x => ({ id: String(x.trackId), name: x.trackName || '', disc: x.discNumber || 1, n: x.trackNumber || 0, ms: x.trackTimeMillis || 0, url: x.previewUrl }))
    .sort((a, b) => (a.disc - b.disc) || (a.n - b.n));
}
async function cmdApple(outDir, onlyFile) {
  const file = path.join(outDir, 'apple.jsonl');
  const done = readJsonl(file);
  const todo = targetsFromMap(onlyFile).filter(t => !done.has(t.key));
  console.log(`apple: ${done.size} done, ${todo.length} todo`);
  const byStore = new Map();
  for (const t of todo) { if (!byStore.has(t.storefront)) byStore.set(t.storefront, []); byStore.get(t.storefront).push(t); }
  let n = 0;
  for (const [store, list] of byStore) {
    for (let i = 0; i < list.length; i += 8) {
      const batch = list.slice(i, i + 8);
      const ids = [...new Set(batch.map(t => t.collectionId))];
      let json = await getJson(`https://itunes.apple.com/lookup?id=${ids.join(',')}&entity=song&limit=200&country=${store}`);
      // 一批結果滿 200 筆可能被截斷 → 拆成單張重查
      const truncated = (json?.resultCount || 0) >= 200;
      for (const t of batch) {
        let tracks = json?.__error ? null : appleTracks(json?.results, t.collectionId);
        if (truncated || !tracks || !tracks.length) {
          const one = await getJson(`https://itunes.apple.com/lookup?id=${t.collectionId}&entity=song&limit=200&country=${store}`);
          tracks = one?.__error ? null : appleTracks(one?.results, t.collectionId);
          let usedStore = store;
          if (tracks && !tracks.length) { // 本店無試聽 → 換另一間（2Pac《All Eyez on Me》TW 無、US 有）
            const alt = store === 'US' ? 'TW' : 'US';
            const two = await getJson(`https://itunes.apple.com/lookup?id=${t.collectionId}&entity=song&limit=200&country=${alt}`);
            const t2 = two?.__error ? [] : appleTracks(two?.results, t.collectionId);
            if (t2.length) { tracks = t2; usedStore = alt; }
            await sleep(400);
          }
          append(file, { key: t.key, store: usedStore, tracks: tracks || [], error: tracks ? '' : (one?.__error || 'error') });
          await sleep(400);
        } else append(file, { key: t.key, store, tracks, error: '' });
        n++;
      }
      if (n % 400 < 8) console.log(`apple ${n}/${todo.length}`);
      await sleep(600);
    }
  }
  console.log('apple: finished');
}

// ---------- 2. Deezer ----------
function deezerFilter(data, artistNames, albumNames) {
  return (data || []).filter(x => x?.title && x.album && x.artist
    && artistNames.some(a => artistMatches(x.artist.name, a) || (x.contributors || []).some(c => artistMatches(c.name, a)))
    && albumNames.some(b => albumMatches(x.album.title, b)))
    .map(x => ({ title: x.title, rank: x.rank || 0, album: x.album.title, albumId: x.album.id }));
}
// Deezer 配額 50 次／5 秒：全域節流在每秒 8 次
let dzNext = 0;
async function dzGet(url) {
  const now = Date.now(); const at = Math.max(now, dzNext); dzNext = at + 125;
  if (at > now) await sleep(at - now);
  return getJson(url);
}
const topCache = new Map();
function artistTop(id) {
  if (!topCache.has(id)) topCache.set(id, dzGet(`https://api.deezer.com/artist/${id}/top?limit=100`).then(j => j?.data || []));
  return topCache.get(id);
}
// 主路徑：search/album 找到同一張專輯 → album/{id}/tracks 取整張曲目的 rank（完整，不像 search/track 會漏曲）
// 同名多版本（原版＋豪華版）最多取兩個版本，同曲取最高 rank。
export async function deezerFor(t) {
  const artists = [...new Set([t.artist, t.artistName].filter(Boolean))];
  const albums = [...new Set([t.album, t.collectionName].filter(Boolean))];
  const clean = b => String(b).replace(ALBUM_EDITION, ' ').replace(/\s+/g, ' ').trim();
  const queries = [];
  for (const a of artists) for (const b of albums) queries.push(`${a} ${clean(b)}`, `artist:"${a.replace(/"/g, '')}" album:"${clean(b).replace(/"/g, '')}"`);
  const seenQ = new Set();
  let lastError = '';
  for (const q of queries) {
    if (seenQ.has(q)) continue; seenQ.add(q);
    const json = await dzGet(`https://api.deezer.com/search/album?q=${encodeURIComponent(q)}&limit=25`);
    if (json?.__error) { lastError = json.__error; continue; }
    const hits = (json?.data || []).filter(x => artists.some(n => artistMatches(x.artist?.name, n)) && albums.some(n => albumMatches(x.title, n)));
    if (!hits.length) continue;
    // 先取盤名完全相同的，再取加尾巴的再版
    hits.sort((x, y) => (albums.some(n => albumCore(y.title) === albumCore(n)) - albums.some(n => albumCore(x.title) === albumCore(n))));
    const rows = [];
    for (const h of hits.slice(0, 2)) {
      const tr = await dzGet(`https://api.deezer.com/album/${h.id}/tracks?limit=300`);
      for (const x of tr?.data || []) rows.push({ title: x.title, rank: x.rank || 0, album: h.title, albumId: h.id });
    }
    // 藝人熱門榜：同一首歌在精選輯／單曲版的 rank 常遠高於這張專輯的版本
    //（Bob Seger《Night Moves》Deezer 是新上架再版，專輯內〈Rock and Roll Never Forgets〉24 萬 > 〈Night Moves〉18 萬；
    //  藝人榜上〈Night Moves〉64 萬）。歌的熱度＝所有版本中最高的 rank。top 列不計入覆蓋率。
    const artistId = hits[0]?.artist?.id;
    if (artistId && rows.length) for (const x of await artistTop(artistId)) rows.push({ title: x.title, rank: x.rank || 0, album: x.album?.title || '', albumId: 'top', top: true });
    if (rows.length) return { q, rows };
  }
  return { rows: [], error: lastError && !seenQ.size ? lastError : '' };
}
async function cmdDeezer(outDir, onlyFile) {
  const file = path.join(outDir, 'deezer.jsonl');
  const done = readJsonl(file);
  const todo = targetsFromMap(onlyFile).filter(t => !done.has(t.key) || done.get(t.key).error);
  console.log(`deezer: ${done.size} done, ${todo.length} todo`);
  let n = 0;
  const workers = 8;
  let idx = 0;
  await Promise.all(Array.from({ length: workers }, async () => {
    while (idx < todo.length) {
      const t = todo[idx++];
      const r = await deezerFor(t);
      append(file, { key: t.key, q: r.q || '', rows: r.rows || [], error: r.error || '' });
      if (++n % 500 === 0) console.log(`deezer ${n}/${todo.length}`);
    }
  }));
  console.log('deezer: finished');
}

// ---------- 3. Apple Music 頁熱門星號 ----------
function ampStars(html) {
  const m = html.match(/<script type="application\/json" id="serialized-server-data">([\s\S]*?)<\/script>/);
  if (!m) return null;
  let data; try { data = JSON.parse(m[1]); } catch (_) { return null; }
  const out = [];
  const walk = o => {
    if (Array.isArray(o)) { for (const v of o) walk(v); return; }
    if (!o || typeof o !== 'object') return;
    if ('showPopularityIndicator' in o && o.title) out.push({ title: o.title, disc: o.discNumber || 1, n: o.trackNumber || 0, star: !!o.showPopularityIndicator });
    for (const v of Object.values(o)) walk(v);
  };
  walk(data);
  return out;
}
async function cmdAmp(outDir) {
  const file = path.join(outDir, 'amp.jsonl');
  const done = readJsonl(file);
  const apple = readJsonl(path.join(outDir, 'apple.jsonl'));
  const deezer = readJsonl(path.join(outDir, 'deezer.jsonl'));
  const targets = targetsFromMap();
  const todo = targets.filter(t => {
    if (done.has(t.key)) return false;
    const a = apple.get(t.key); if (!a || !a.tracks?.length || a.tracks.length < 2) return false;
    const d = deezer.get(t.key);
    return d && !deezerUsable(a.tracks, d.rows); // Deezer 還沒掃的先跳過（可分段續跑）
  });
  console.log(`amp: ${done.size} done, ${todo.length} todo`);
  let n = 0;
  for (const t of todo) {
    const store = apple.get(t.key).store.toLowerCase();
    let stars = null, error = '';
    for (let i = 0, wait = 3000; i < 5; i++) {
      try {
        const res = await fetch(`https://music.apple.com/${store}/album/${t.collectionId}`, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' }, signal: AbortSignal.timeout(25000) });
        if (res.status === 404) { error = 'http-404'; break; }
        if (!res.ok) throw new Error(`http-${res.status}`);
        stars = ampStars(await res.text());
        break;
      } catch (e) { error = String(e.message || e); await sleep(wait); wait *= 2; }
    }
    append(file, { key: t.key, stars: stars || [], error: stars ? '' : error });
    if (++n % 200 === 0) console.log(`amp ${n}/${todo.length}`);
    await sleep(700);
  }
  console.log('amp: finished');
}

// ---------- 4. 選曲 ----------
// 第三層：括號內的非版本副標題也當別名（「Bang a Gong (Get It On)」↔「Get It On」）
function titleAliases(title) {
  const t = String(title || '').replace(VARIANT_BRACKET, ' ');
  const out = new Set();
  for (const m of t.matchAll(/[\(\[\{（【]([^\)\]\}）】]+)[\)\]\}）】]/g)) { const k = normText(m[1]); if (k.length >= 4) out.add(k); }
  const outer = titleBare(t); if (outer.length >= 4) out.add(outer);
  return [...out];
}
function rankIndex(rows) {
  const core = new Map(), bare = new Map(), alias = new Map();
  const put = (m, k, v) => { if (k) m.set(k, Math.max(m.get(k) || 0, v)); };
  for (const r of rows) {
    put(core, titleCore(r.title), r.rank);
    put(bare, titleBare(r.title), r.rank);
    for (const a of titleAliases(r.title)) put(alias, a, r.rank);
  }
  return { core, bare, alias };
}
// 三層都查、取最高（同一首歌的不同寫法各自帶 rank，取最紅的版本）
function rankOf(idx, title) {
  const hits = [];
  const c = titleCore(title); if (c && idx.core.has(c)) hits.push(idx.core.get(c));
  const b = titleBare(title); if (b && idx.bare.has(b)) hits.push(idx.bare.get(b));
  for (const a of titleAliases(title)) if (idx.alias.has(a)) hits.push(idx.alias.get(a));
  return hits.length ? Math.max(...hits) : null;
}
function coverage(tracks, rows) {
  rows = (rows || []).filter(r => !r.top);
  if (!tracks?.length || !rows.length) return 0;
  const idx = rankIndex(rows);
  return tracks.filter(t => rankOf(idx, t.name) != null).length / tracks.length;
}
// Deezer 可用：Apple 這邊四成以上曲目對得到，或 Deezer 那張專輯六成以上曲目在 Apple 找得到
//（後者擋 Apple collection 其實是套裝盒、曲目遠多於原專輯的情況，例：Michael Jackson《Thriller》→ 655260476）
function deezerUsable(tracks, rows) {
  if (!tracks?.length || !rows?.length) return false;
  if (coverage(tracks, rows) >= 0.4) return true;
  const appleCores = new Set(tracks.flatMap(t => [titleCore(t.name), titleBare(t.name)]));
  const groups = new Map();
  for (const r of rows) { const c = titleCore(r.title); if (!c || r.top) continue; if (!groups.has(r.albumId)) groups.set(r.albumId, new Set()); groups.get(r.albumId).add(c); }
  return [...groups.values()].some(g => { const found = [...g].filter(c => appleCores.has(c)).length; return found >= 2 && found / g.size >= 0.6; });
}
// 在可選曲目中挑最紅的：短於 60 秒的前奏／小品，和 demo／live／remix 等變體版只在別無選擇時才選
function eligible(tracks) {
  const albumIsVariant = tracks.filter(t => FLAG_VARIANT.test(t.name)).length > tracks.length / 2; // 現場專輯整張都是 live
  return t => t.ms >= 60000 && (albumIsVariant || !FLAG_VARIANT.test(t.name));
}
export function choose(apple, deezerRows, stars, currentUrl) {
  const tracks = apple.tracks;
  const ok = eligible(tracks);
  const current = tracks.find(t => t.url === currentUrl) || tracks.find(t => mzaf(t.url) && mzaf(t.url) === mzaf(currentUrl)) || null;
  // 主：Deezer rank
  if (deezerUsable(tracks, deezerRows)) {
    const idx = rankIndex(deezerRows);
    // 候選曲必須在 Deezer「這張專輯」的曲目裡；藝人熱門榜只拿來加權。否則 Apple collection 是套裝盒時
    // 會選到盒內別張專輯的歌（Michael Jackson《Invincible》→〈Thriller〉、Bowie《Scary Monsters》→〈"Heroes"〉）。
    const albumIdx = rankIndex(deezerRows.filter(r => !r.top));
    const scored = tracks.filter(t => rankOf(albumIdx, t.name) != null)
      .map(t => ({ t, rank: rankOf(idx, t.name) })).filter(x => x.rank != null && x.rank > 0);
    const pool = scored.filter(x => ok(x.t)).length ? scored.filter(x => ok(x.t)) : scored;
    pool.sort((a, b) => (b.rank - a.rank) || (a.t.disc - b.t.disc) || (a.t.n - b.t.n));
    if (pool[0]) {
      const second = pool[1]?.rank || 0;
      return { track: pool[0].t, source: 'deezer-rank', rank: pool[0].rank, margin: second ? +(pool[0].rank / second).toFixed(3) : null, current };
    }
  }
  // 備：Apple Music 熱門星號（套裝盒＝3 片以上、40 軌以上時不用：星號可能落在盒內別張專輯）
  const boxLike = new Set(tracks.map(t => t.disc)).size >= 3 && tracks.length > 40;
  if (stars?.length && !boxLike) {
    const starred = stars.filter(s => s.star);
    const hit = starred.map(s => tracks.find(t => t.disc === s.disc && t.n === s.n) || tracks.find(t => titleBare(t.name) === titleBare(s.title))).filter(Boolean);
    const okHit = hit.filter(ok);
    // 多顆星：Deezer 若有部分 rank（覆蓋率不足但有對到的）就拿來排星號曲；否則取第一顆星
    const partial = deezerRows?.length ? rankIndex(deezerRows) : null;
    const byRank = (partial ? [...(okHit.length ? okHit : hit)].sort((x, y) => (rankOf(partial, y.name) || 0) - (rankOf(partial, x.name) || 0)) : []);
    const pickT = (partial && rankOf(partial, byRank[0]?.name)) ? byRank[0] : (okHit[0] || hit[0]);
    if (pickT) return { track: pickT, source: hit.length === 1 ? 'apple-star' : 'apple-star-multi', stars: hit.length, current };
  }
  // 都沒有：保留原曲；原曲是短前奏就換第一首 ≥90 秒的
  if (current && current.ms >= 60000) return { track: current, source: 'keep-no-signal', current };
  // 套裝盒又沒有熱度：第一首正曲多半屬於盒內別張專輯，原網址不動
  if (boxLike) return { track: null, source: 'box-untouched', current };
  const firstReal = tracks.find(t => t.ms >= 90000 && !FLAG_VARIANT.test(t.name)) || tracks.find(t => t.ms >= 90000) || current || tracks[0];
  return { track: firstReal, source: current ? 'skip-intro' : 'first-real', current };
}

async function cmdPick(outDir) {
  const apple = readJsonl(path.join(outDir, 'apple.jsonl'));
  const deezer = readJsonl(path.join(outDir, 'deezer.jsonl'));
  const amp = readJsonl(path.join(outDir, 'amp.jsonl'));
  const picks = {}, stats = {}, changed = [];
  let missingApple = 0;
  for (const t of targetsFromMap()) {
    const a = apple.get(t.key);
    if (!a || !a.tracks?.length) { missingApple++; continue; }
    const r = choose(a, deezer.get(t.key)?.rows, amp.get(t.key)?.stars, t.previewUrl);
    stats[r.source] = (stats[r.source] || 0) + 1;
    if (!r.track) continue;
    const same = r.current && r.current.id === r.track.id;
    picks[t.key] = {
      artist: t.artist, album: t.album, store: a.store, collectionId: t.collectionId,
      trackId: r.track.id, trackName: r.track.name, trackNumber: r.track.n, disc: r.track.disc, url: r.track.url,
      source: r.source, rank: r.rank ?? null, margin: r.margin ?? null, appleTracks: a.tracks.length,
      suspectBox: (() => { const dz = new Set((deezer.get(t.key)?.rows || []).filter(x => !x.top).map(x => titleCore(x.title))); const discs = new Set(a.tracks.map(x => x.disc)).size; return discs >= 3 && (a.tracks.length > 40 || (dz.size >= 4 && a.tracks.length > dz.size * 2.5)); })(),
      oldTrack: r.current ? `${r.current.n}. ${r.current.name}` : '(舊網址已不在 lookup 結果)', changed: !same,
    };
    if (!same) changed.push(t.key);
  }
  fs.writeFileSync(path.join(outDir, 'picks.json'), JSON.stringify(picks, null, 1));
  const firstTrackBefore = Object.values(picks).filter(p => /^1\. /.test(p.oldTrack)).length;
  const firstTrackAfter = Object.values(picks).filter(p => p.trackNumber === 1 && p.disc === 1).length;
  const suspectBox = Object.values(picks).filter(p => p.suspectBox).length;
  const summary = { total: Object.keys(picks).length, missingApple, changed: changed.length, bySource: stats, firstTrackBefore, firstTrackAfter, suspectBox };
  fs.writeFileSync(path.join(outDir, 'pick-summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

// ---------- 5. 寫回 ----------
async function cmdApply(outDir, dry) {
  const picks = readJson(fs.existsSync(path.join(outDir, 'picks.json')) ? path.join(outDir, 'picks.json') : path.join(outDir, '..', 'picks.json'));
  const mapDoc = readJson(MAP_FILE);
  const now = new Date().toISOString();
  const perKey = new Map(); // key → {before, after}（給 manifest 用）
  let mapChanged = 0, refreshed = 0;
  for (const [key, p] of Object.entries(picks)) {
    const e = mapDoc.entries[key];
    if (!e || e.status !== 'matched') continue;
    const before = e.previewUrl;
    perKey.set(key, { before, after: p.url });
    if (before !== p.url) { if (p.changed) mapChanged++; else refreshed++; }
    e.previewUrl = p.url;
    if (p.store && p.store !== String(e.storefront || '').toUpperCase()) e.storefront = p.store;
    e.previewTrackId = p.trackId;
    e.previewTrackName = p.trackName;
    e.previewPick = p.rank != null ? `${p.source}:${p.rank}` : p.source; // 例：deezer-rank:640568（日期見 PROJECT_MEMORY 2026-11-05）
  }
  mapDoc.generatedAt = now;
  // manifest：逐卡比對，preview.url 等於該卡舊地圖網址的才換新（published gate 比對「靜態地圖 previewUrl 與 manifest」）
  const src = fs.readFileSync(path.join(ROOT, 'dip-player.js'), 'utf8');
  const norm = eval('(' + src.match(/function normalizePreviewText\(value\) \{[\s\S]*?\n  \}/)[0] + ')');
  const manifests = fs.readdirSync(ROOT).filter(f => /^onboarding-manifest-.*\.json$/.test(f));
  let manFiles = 0, manRows = 0;
  for (const f of manifests) {
    const file = path.join(ROOT, f);
    let raw = fs.readFileSync(file, 'utf8');
    const doc = JSON.parse(raw);
    // 依文件順序列出每一列 preview.url 該變成什麼；同一網址被多張卡共用時（例：Swanee Quintet 兩張）逐次替換，
    // 不能整檔一次換。網址只出現在 preview.url；出現次數與列數對不上就整檔跳過、記下來。
    const plan = new Map(); // url → [新值或 null（不換）, …]，依出現順序
    for (const row of doc.albums || []) {
      const url = row.preview?.url;
      if (!url) continue;
      const sw = perKey.get(`${norm(row.artist)}\u0000${norm(row.album)}`);
      if (!plan.has(url)) plan.set(url, []);
      plan.get(url).push(sw && sw.before === url && sw.before !== sw.after ? sw.after : null);
    }
    let hits = 0, skipped = false;
    for (const [url, seq] of plan) {
      if (!seq.some(Boolean)) continue;
      const needle = JSON.stringify(url);
      const parts = raw.split(needle);
      if (parts.length - 1 !== seq.length) { skipped = true; console.warn(`skip ${f}: ${url} 出現 ${parts.length - 1} 次、列 ${seq.length}`); continue; }
      raw = parts.reduce((acc, part, i) => i === 0 ? part : acc + JSON.stringify(seq[i - 1] || url) + part, '');
      hits += seq.filter(Boolean).length;
    }
    if (hits) { manFiles++; manRows += hits; if (!dry) fs.writeFileSync(file, raw); }
  }
  if (!dry) fs.writeFileSync(MAP_FILE, JSON.stringify(mapDoc, null, 1) + '\n'); // 原檔是 1 格縮排
  console.log(JSON.stringify({ dry: !!dry, mapChanged, refreshedSameTrack: refreshed, manifestFiles: manFiles, manifestUrls: manRows }, null, 2));
}

// ---------- 新卡 manifest ----------
async function cmdManifest(file) {
  const doc = readJson(file);
  const albums = doc.albums || doc.cards || doc;
  let changed = 0;
  for (const a of albums) {
    const p = a.preview;
    if (p?.status !== 'ready' || !/itunes\.apple\.com/.test(p.url || '')) continue;
    const cid = String(p.appleCollectionId || p.collectionId || '');
    const store = String(p.storefront || 'US').toUpperCase();
    if (!cid) continue;
    const look = await getJson(`https://itunes.apple.com/lookup?id=${cid}&entity=song&limit=200&country=${store}`);
    const tracks = appleTracks(look?.results, cid);
    if (!tracks.length) continue;
    const dz = await deezerFor({ artist: a.artist, album: a.album, artistName: p.appleArtistName || '', collectionName: p.appleCollectionName || '' });
    let stars = null;
    if (!deezerUsable(tracks, dz.rows)) {
      try { stars = ampStars(await (await fetch(`https://music.apple.com/${store.toLowerCase()}/album/${cid}`, { headers: { 'User-Agent': UA } })).text()); } catch (_) {}
    }
    const r = choose({ tracks }, dz.rows, stars, p.url);
    if (!r.track) continue;
    if (r.track.url !== p.url) {
      const head = await fetch(r.track.url, { method: 'HEAD' }).catch(() => null);
      if (!head?.ok) { console.log(`${a.artist} — ${a.album}: 新網址 HEAD ${head?.status || 'fail'}，保留原網址`); continue; }
      changed++;
      p.httpStatus = head.status;
      p.checkedAt = new Date().toISOString();
    }
    p.url = r.track.url;
    p.trackName = r.track.name;
    p.popularity = r.source;
    console.log(`${a.artist} — ${a.album}: ${r.track.n}. ${r.track.name} [${r.source}${r.rank ? ' ' + r.rank : ''}]`);
    await sleep(500);
  }
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n');
  console.log(`manifest: ${changed} 張換成最紅那首`);
}

const [cmd, arg, ...rest] = process.argv.slice(2);
const only = rest.find(x => x.startsWith('--only='))?.slice(7);
if (import.meta.url === `file://${process.argv[1]}`) {
  if (cmd === 'manifest') await cmdManifest(arg);
  else {
    if (!arg) { console.error('usage: popular-preview.mjs <apple|deezer|amp|pick|apply> <outDir>'); process.exit(1); }
    fs.mkdirSync(arg, { recursive: true });
    if (cmd === 'apple') await cmdApple(arg, only);
    else if (cmd === 'deezer') await cmdDeezer(arg, only);
    else if (cmd === 'amp') await cmdAmp(arg);
    else if (cmd === 'pick') await cmdPick(arg);
    else if (cmd === 'apply') await cmdApply(arg, rest.includes('--dry'));
    else { console.error('unknown command'); process.exit(1); }
  }
}
