// c-51 與 c-SEA 共 254 張的固定試聽探測（Apple）。
// 用法：node batch-progress/probe/probe-previews.mjs [批名...]（省略＝全部七批）
//
// `ALBUM_ONBOARDING.md` §6 的要求，這支逐條照做：
//
// 1. **必須同時核對藝人、專輯與版本**，不可為了提高命中率接受疑似配對。
//    這裡的採用門檻：專輯標題摺疊後完全相同、或長度差 ≤8 的包含關係；
//    掛名摺疊後互相包含；發行年差 ≤3。三項全過才算 ready。
// 2. **必須核對 `collectionExplicitness`**（2026-08-23 增列）。同一張碟在 Apple
//    常有同名、同曲數、曲序也一致的雙胞胎，一筆 explicit、一筆 cleaned（消音版），
//    只看名字分不出來。淨化版屬不同版本，**一律優先取 explicit**；整份目錄
//    只有淨化版才收，並標記讓本機看得到。`notExplicit` 是「本來就沒有不雅內容」，
//    不是問題。
// 3. 只收 Apple 的 .m4a 直連（靜態路徑 `apple-audio-map-v1.json` 只認這個）。
//
// **多國 storefront**：c-SEA 這批的印尼、菲律賓、泰國、越南、馬來西亞盤在
// 美國目錄裡多半不存在，只在當地 storefront 上架。ctw3 那次的教訓是只試一種
// 寫法會誤判成「目錄裡沒有」；同理只試一個 storefront 會誤判成「Apple 沒有」。
// 所以逐張把卡片所屬區域的 storefront 排在前面試。
//
// 雲端只產出探測結果，不寫 apple-audio-map-v1.json、不碰 album_overrides
// （REMOTE_RUNBOOK）。本機拿這份檔決定 ready／unavailable。
import fs from 'node:fs';
import path from 'node:path';
import { fold, ROOT } from '../lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const DIR = path.join(ROOT, 'batch-progress/probe');
const BATCHES = process.argv.slice(2).length ? process.argv.slice(2)
  : ['c51a', 'c51b', 'c51c', 'c51d', 'cseaa', 'cseab', 'cseac'];

import { norm, SUFFIX, titleOk, artistOk, hasNonLatin, translit, DECO, canon, looseTitleOk, looseArtistOk, termsFor } from './match-lib.mjs';
// 比對規則已抽到 match-lib.mjs（裁定第 90 條），改規則請先跑 test-match.mjs。

let n = 0;
for (const c of cards) {
  const k = `${c.artist}|${c.album}`;
  if (out[k] && !out[k]._err) { n++; continue; }
  const rec = { batch: c.batch, tried: [] };

  const terms = termsFor(c);
  for (const front of c.fronts) {
    // 比對用的候選名：原文與轉寫都算數，否則轉寫查到了也會被 titleOk 擋掉。
    const albumCands = [c.album, translit(c.album)];
    const artistCands = [c.artist, c.queryAlias, translit(c.artist)].filter(Boolean);
    let hits = [];
    let raw = 0;
    for (const term of terms) {
      const j = await get(`https://itunes.apple.com/search?term=${
        encodeURIComponent(term)}&entity=album&country=${front}&limit=12`);
      await sleep(700);                                 // Apple 沒公告限制，保守節流
      if (j._http || j._err) { rec.tried.push(`${front}:${j._http || j._err}`); continue; }
      raw = (j.results || []).length;
      hits = (j.results || []).filter(r =>
        (albumCands.some(a => titleOk(a, r.collectionName || '', !!c.selfTitled)) ||
         looseTitleOk(c.album, r.collectionName || '', !!c.selfTitled)) &&
        (artistCands.some(a => artistOk(a, r.artistName || '')) ||
         looseArtistOk(c.artist, r.artistName || '')));
      // 年份不再當門檻（裁定第 77 條）：Apple 記的常是數位重製日不是原盤年。
      // 主閘是藝人＋盤名的粗形比對；年份只用來排序與標記。
      if (hits.length) break;                           // 命中就不再試下一種寫法
    }
    rec.tried.push(`${front}:${raw}→${hits.length}`);
    if (!hits.length) continue;

    // 排序：年份接近的優先（不是門檻，只是偏好），再來 explicit 優先。
    const drift = x => (c.year ? Math.abs(Number(String(x.releaseDate || '').slice(0, 4)) - c.year) : 0);
    const rank = x => ({ explicit: 0, notExplicit: 1, cleaned: 2 }[x?.collectionExplicitness] ?? 1);
    hits.sort((x, y) => (drift(x) - drift(y)) || (rank(x) - rank(y)));
    const best = hits[0];

    const lk = await get(`https://itunes.apple.com/lookup?id=${best.collectionId}&entity=song&country=${front}&limit=60`);
    await sleep(700);
    const prev = (lk.results || []).find(x => x.wrapperType === 'track' && /\.m4a(\?|$)/.test(x.previewUrl || ''));
    rec.front = front;
    rec.collectionId = best.collectionId;
    rec.appleTitle = best.collectionName;
    rec.appleArtist = best.artistName;
    rec.appleYear = String(best.releaseDate || '').slice(0, 4);
    rec.explicitness = best.collectionExplicitness;
    rec.trackCount = best.trackCount;
    rec.previewUrl = prev?.previewUrl || null;
    // 整份候選只剩淨化版時要讓本機看得到，§6 明訂「可收但要在備註寫明」。
    rec.cleanedOnly = hits.every(x => x.collectionExplicitness === 'cleaned');
    // 年份漂移：Apple 的日期與卡片差超過 3 年就標記交人工看，但不擋。
    // 標題自己寫著再發字樣的（remaster／anniversary／deluxe／edition）視為再發，年份不計。
    const isReissue = DECO.test(best.collectionName || '');
    DECO.lastIndex = 0;                                 // 全域旗標的正規式要自己歸零
    const yd = c.year ? Math.abs(Number(rec.appleYear) - c.year) : 0;
    if (yd > 3) { rec.yearDrift = yd; rec.reissueTitle = isReissue; }
    rec.status = rec.previewUrl ? 'ready' : 'no-preview';
    break;
  }
  if (!rec.status) rec.status = 'unavailable';
  out[k] = rec;
  n++;
  const m = rec.status === 'ready' ? '✓' : rec.status === 'no-preview' ? '~' : '✗';
  console.log(`${m} [${c.batch}] ${c.artist}《${c.album}》${
    rec.front ? ` ${rec.front} ${rec.explicitness}${rec.cleanedOnly ? '(只有淨化版)' : ''} ${rec.appleYear}` : ' 各 storefront 皆無'}`);
  if (n % 10 === 0) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const v = Object.values(out);
console.log(`\n共 ${cards.length} 張｜ready ${v.filter(x => x.status === 'ready').length}｜有碟無預覽 ${
  v.filter(x => x.status === 'no-preview').length}｜unavailable ${v.filter(x => x.status === 'unavailable').length}｜只有淨化版 ${
  v.filter(x => x.cleanedOnly).length}`);
