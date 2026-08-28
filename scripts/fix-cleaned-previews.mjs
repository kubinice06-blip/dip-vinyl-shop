#!/usr/bin/env node
// 把配到淨化版（collectionExplicitness=cleaned）的固定試聽換成原版（explicit）。
//
// 背景見 audits/cleaned-previews-hiphop.md：Apple 上同一張專輯常有同名、同曲數、
// 曲序也一致的雙胞胎，一筆 explicit 一筆 cleaned，單看名稱與曲數分不出來。
// 線上嘻哈卡掃 1,062 張，273 張（25.7%）配到淨化版，含《The Blueprint》《DAMN.》《Take Care》。
// 淨化版不只消音，還會整首抽掉曲目——對嘻哈這個類型等於換掉作品內容。
//
// 為什麼不用 iTunes /search：本機 IP 對 /search 有長效封鎖（2026-07 起實測），
// 只有 /lookup 與 CDN 可用。改走「/lookup 取 artistId → /lookup 該藝人整份專輯目錄
// （entity=album）→ 在目錄裡找同名同曲數的 explicit 那筆」，全程不碰 /search。
//
// 用法：
//   node scripts/fix-cleaned-previews.mjs                 # 只查、產報告，不寫檔
//   node scripts/fix-cleaned-previews.mjs --write         # 把查到的原版寫回靜態試聽地圖
//   node scripts/fix-cleaned-previews.mjs --limit 20      # 先跑前 20 筆試水溫
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const WRITE = argv.includes('--write');
const LIMIT = (() => { const i = argv.indexOf('--limit'); return i >= 0 ? Number(argv[i + 1]) : Infinity; })();
const REPORT = path.join(ROOT, 'audits', 'cleaned-previews-fix.json');
const CONCURRENCY = 3;

const sleep = ms => new Promise(r => setTimeout(r, ms));
// iTunes 對單一 IP 有速率限制，撞到會回 403。退避重試，別把整批打死。
async function itunes(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (r.ok) {
        const text = await r.text();
        try { return JSON.parse(text); } catch { return null; }
      }
      if (r.status === 403 || r.status === 429) { await sleep(4000 * (i + 1)); continue; }
      return null;
    } catch { await sleep(2000 * (i + 1)); }
  }
  return null;
}

// 版本字樣要剝掉再比名稱：淨化版與原版常一個掛 (Deluxe Version) 一個沒掛。
const EDITION = /\s*[\(\[][^)\]]*(deluxe|expanded|explicit|clean|edited|remaster(ed)?|anniversary|bonus|special|edition|version|reissue)[^)\]]*[\)\]]/gi;
const normName = s => String(s || '').replace(EDITION, '')
  .toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿ가-힯]+/g, '');

const catalogCache = new Map();
async function artistAlbums(artistId, country) {
  const k = `${artistId}|${country}`;
  if (catalogCache.has(k)) return catalogCache.get(k);
  const j = await itunes(`https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=200&country=${country}`);
  const list = (j?.results || []).filter(x => x.wrapperType === 'collection');
  catalogCache.set(k, list);
  return list;
}

const all = JSON.parse(fs.readFileSync(path.join(ROOT, 'audits', 'cleaned-previews-hiphop.json'), 'utf8'));
const targets = all.filter(x => x.expl === 'cleaned').slice(0, LIMIT);
const dead = all.filter(x => x.expl === 'notfound');
console.log(`淨化版 ${all.filter(x => x.expl === 'cleaned').length} 張｜本次處理 ${targets.length}｜另有失效 collectionId ${dead.length} 張\n`);

const fixed = [], failed = [];
let cursor = 0, done = 0;

async function worker() {
  while (cursor < targets.length) {
    const t = targets[cursor++];
    const label = `${t.artist} — ${t.album}`;
    const country = t.store || 'TW';
    try {
      // 1) 目前這筆淨化版的中繼資料（要 artistId 與曲數）
      const cur = (await itunes(`https://itunes.apple.com/lookup?id=${t.cid}&country=${country}`))?.results?.[0];
      if (!cur?.artistId) { failed.push({ ...t, why: '查不到目前的 collectionId' }); continue; }

      // 2) 同一位藝人的整份專輯目錄裡找原版
      const cands = (await artistAlbums(cur.artistId, country))
        .filter(x => x.collectionExplicitness === 'explicit')
        .filter(x => normName(x.collectionName) === normName(cur.collectionName));
      if (!cands.length) { failed.push({ ...t, why: 'Apple 目錄裡沒有 explicit 版' }); continue; }
      // 曲數「不一致」才是常態：淨化版會整首抽掉曲目（稽核文件的 Pop Smoke 例子），
      // 所以原版通常比淨化版多幾軌。實測 Fugees 17 vs 15、Lil Wayne 18 vs 16、Common 17 vs 16。
      // 一開始要求曲數相等，反而把正確答案全部排除（273 張裡誤殺 61 張）。
      // 改成：取曲數最接近的那筆，同名優先；差距過大才拒收——那多半是 Deluxe 或另一個編輯版。
      const delta = x => Math.abs(x.trackCount - cur.trackCount);
      const cap = Math.max(6, Math.round(cur.trackCount * 0.4));
      const ranked = cands.slice().sort((a, b) =>
        delta(a) - delta(b) ||
        ((b.collectionName === cur.collectionName) - (a.collectionName === cur.collectionName)));
      const pick = ranked.find(x => delta(x) <= cap);
      if (!pick) {
        failed.push({ ...t, why: `${cands.length} 筆同名 explicit 的曲數都差太多（本卡 ${cur.trackCount} 軌，最接近 ${ranked[0].trackCount} 軌）` });
        continue;
      }

      // 3) 取原版的第一軌試聽網址。
      // 同一個 collectionId 在不同商店的供應狀況不同——本店查無試聽時換另一間再試一次
      // （實測 2Pac《All Eyez on Me》、Kendrick《Mr. Morale》在 TW 無試聽、US 有）。
      let tracks = [], usedStore = country;
      for (const st of [country, country === 'TW' ? 'US' : 'TW']) {
        const songs = (await itunes(`https://itunes.apple.com/lookup?id=${pick.collectionId}&entity=song&limit=200&country=${st}`))?.results || [];
        const t2 = songs.filter(x => x.wrapperType === 'track' && x.previewUrl);
        if (t2.length) { tracks = t2; usedStore = st; break; }
      }
      if (!tracks.length) { failed.push({ ...t, why: `原版 ${pick.collectionId} 在 ${country} 與備援商店都沒有可用試聽` }); continue; }
      tracks.sort((a, b) => (a.discNumber - b.discNumber) || (a.trackNumber - b.trackNumber));
      const first = tracks[0];

      fixed.push({
        artist: t.artist, album: t.album, store: usedStore,
        oldCid: String(t.cid), oldName: cur.collectionName, oldExpl: 'cleaned',
        newCid: String(pick.collectionId), newName: pick.collectionName, newExpl: pick.collectionExplicitness,
        trackCount: pick.trackCount, oldTrackCount: cur.trackCount, trackDelta: pick.trackCount - cur.trackCount,
        previewUrl: first.previewUrl, firstTrack: first.trackName,
      });
    } catch (e) {
      failed.push({ ...t, why: String(e.message || e).slice(0, 120) });
    }
    done++;
    if (done % 10 === 0) process.stdout.write(`\r  ${done}/${targets.length}（成功 ${fixed.length}、待處理 ${failed.length}）`);
    await sleep(350);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`\r  ${done}/${targets.length}（成功 ${fixed.length}、待處理 ${failed.length}）        \n`);

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, JSON.stringify({ fixed, failed, dead }, null, 1));
console.log(`報告 → ${path.relative(ROOT, REPORT)}`);

if (failed.length) {
  console.log(`\n查不到原版的 ${failed.length} 張（維持現狀，需人工看）：`);
  for (const f of failed.slice(0, 20)) console.log(`  ${f.artist} — ${f.album}：${f.why}`);
  if (failed.length > 20) console.log(`  …另 ${failed.length - 20} 張見報告`);
}

if (!WRITE) { console.log('\n（未寫檔。確認報告無誤後加 --write）'); process.exit(0); }

// ── 寫回靜態試聽地圖 ─────────────────────────────────────
// 鍵規則與 build-apple-audio-map.mjs 一致（NFKD、保留 CJK 與韓文 Jamo、NUL 分隔）
const normKey = v => String(v || '').normalize('NFKD').toLowerCase()
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯]+/g, '');
const SEP = String.fromCharCode(0);   // 分隔字元是 NUL，不是空白
const MAP = path.join(ROOT, 'data', 'apple-audio-map-v1.json');
const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
let wrote = 0, missing = 0;
for (const f of fixed) {
  const k = normKey(f.artist) + SEP + normKey(f.album);
  const e = map.entries[k];
  if (!e) { missing++; console.log(`  ⚠ 地圖裡沒有這張：${f.artist} — ${f.album}`); continue; }
  e.collectionId = f.newCid;
  e.collectionName = f.newName;
  e.previewUrl = f.previewUrl;
  e.storefront = f.store.toUpperCase();
  e.matchedAt = new Date().toISOString();
  e.source = 'cleaned-preview-fix';
  e.note = `原配到淨化版 ${f.oldCid}（${f.oldName}），改為 explicit 版 ${f.newCid}`;
  wrote++;
}
fs.writeFileSync(MAP, JSON.stringify(map, null, 1));
console.log(`\n已改寫靜態試聽 ${wrote} 筆｜地圖中找不到 ${missing} 筆`);
console.log('接著請跑： node scripts/build-apple-audio-runtime-map.mjs');
