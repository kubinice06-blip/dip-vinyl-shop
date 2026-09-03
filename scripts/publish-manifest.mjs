#!/usr/bin/env node
// 把一份 onboarding manifest 上架。取代逐張手工操作——c-44/c-45 這種 200+ 張的批次
// 靠手工跑五個目的地不切實際，而 seed_cards.json 的自訂排版又很容易被寫壞。
//
// 用法：
//   node scripts/publish-manifest.mjs <manifest.json>                 # 乾跑，只產 payload 不動任何檔案
//   node scripts/publish-manifest.mjs <manifest.json> --write-preview # 寫靜態試聽（Git 檔）
//   node scripts/publish-manifest.mjs <manifest.json> --write-pool    # 追加 seed/apex（上架開關）
//
// 為什麼分成兩個 --write 階段：ALBUM_ONBOARDING §8 規定 seed_cards／apex_pool 是**最後**
// 一步的上架開關，前面的資料沒寫完就推 seed，卡片會以缺圖缺簡介的狀態曝光。
// 這支腳本不讓你一次做完兩件事。
//
// 這支「不做」的事，以及為什麼：
//   - Firestore card_catalog：需要 API key，只產出 REST PATCH 的 payload 供本機執行
//   - album_overrides：規則是 allow write: if isAdmin()，REST 實測 403，只能走 admin.html 後台。
//     所以試聽改走 §6 的「靜態路徑」（data/apple-audio-map-v1.json），那是 Git 檔案，本腳本可安全處理
//   - Worker KV 固定簡介：轉檔腳本在另一個 repo（dip-vinyl-worker），不重複實作，只提示指令
//
// 冪等：已在 seed／apex／靜態地圖裡的卡會被跳過，可重複執行。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const manifestPath = argv.find(a => !a.startsWith('--'));
const WRITE_PREVIEW = argv.includes('--write-preview');
const WRITE_POOL = argv.includes('--write-pool');

if (!manifestPath) {
  console.error('用法: node scripts/publish-manifest.mjs <manifest.json> [--write-preview|--write-pool]');
  process.exit(1);
}
if (WRITE_PREVIEW && WRITE_POOL) {
  console.error('中止：--write-preview 與 --write-pool 不可同時使用。');
  console.error('§8 規定 seed/apex 是最後一步的上架開關，前面的資料要先寫完並回讀確認。');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const albums = manifest.albums || [];
const stageDir = path.join(ROOT, 'publish-stage', path.basename(manifestPath, '.json'));

// --- 各處的鍵規則（三套都不同，不要互相套用）--------------------------------
// Firestore 文件 id：見 index.html 的 cardIdOf，與 Worker /album-rating 同規則
const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();
// 靜態試聽地圖：見 scripts/build-apple-audio-map.mjs 的 cardKey（NUL 分隔，保留 CJK）
const normalized = v => String(v || '').normalize('NFKD').toLowerCase()
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯\u0370-\u03ff\u1f00-\u1fff\u0400-\u052f\u0530-\u058f\u0590-\u05ff\u0600-\u06ff\u0750-\u077f\u0900-\u097f\u0980-\u09ff\u0e00-\u0e7f\u0e80-\u0eff\u1000-\u109f\u10a0-\u10ff\u1200-\u137f\u1780-\u17ff]+/g, '');
const audioKeyOf = (artist, album) => `${normalized(artist)}\u0000${normalized(album)}`;
// 去重比對用：與 scripts/pool-keys.mjs 同規則（摺 U+2010–2015 連字號，否則 a-ha 這類必然漏判）
const poolKeyOf = (a, b) => [a, b].map(s => String(s || '').toLowerCase()
  .replace(/[‐-―－]/g, '-').normalize('NFKC')
  .replace(/[^\p{L}\p{N}]+/gu, '')).join('|');

const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
let changed = false;

// --- 1. card_catalog：產出 Firestore REST PATCH payload ----------------------
const fsValue = v => typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v })
  : typeof v === 'boolean' ? { booleanValue: v } : { stringValue: String(v) };
const catalogPatches = albums.map(a => {
  const fields = {
    classic: a.ratings.classic, obscurity: a.ratings.obscurity, accessibility: a.ratings.accessibility,
    rarity: a.rarity, coverUrl: a.cover.url,
  };
  if (a.identity?.rgMbid) fields.rgMbid = a.identity.rgMbid;
  if (a.identity?.upc) fields.upc = a.identity.upc;
  return {
    docId: cardIdOf(a.artist, a.album),
    // updateMask 確保不會蓋掉後台手動改過的其他欄位（§8 第 1 步明文要求）
    updateMask: Object.keys(fields),
    body: { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, fsValue(v)])) },
  };
});

// --- 2. 試聽：ready 走靜態地圖，非 ready 走 card-preview-status.js -----------
const AUDIO_MAP = path.join(ROOT, 'data', 'apple-audio-map-v1.json');
const audioMap = readJson(AUDIO_MAP);
const ready = albums.filter(a => a.preview?.status === 'ready' && a.preview.url);
const negative = albums.filter(a => a.preview?.status && a.preview.status !== 'ready');

const audioAdds = [], audioSkips = [];
for (const a of ready) {
  const k = audioKeyOf(a.artist, a.album);
  if (audioMap.entries[k]) { audioSkips.push(`${a.artist} — ${a.album}`); continue; }
  audioAdds.push([k, {
    artist: a.artist, album: a.album, pool: 'seed', status: 'matched',
    storefront: (a.preview.storefront || 'US').toUpperCase(),
    collectionId: String(a.preview.appleCollectionId || a.preview.collectionId || ''),
    collectionName: a.preview.appleCollectionName || '',
    previewUrl: a.preview.url,
    matchedAt: new Date().toISOString(), source: 'onboarding-manifest',
    note: a.preview.note || '',
  }]);
}

const STATUS_FILE = path.join(ROOT, 'card-preview-status.js');
const statusRaw = fs.readFileSync(STATUS_FILE, 'utf8');
const negAdds = negative
  .filter(a => !statusRaw.includes(`"${cardIdOf(a.artist, a.album)}"`))
  .map(a => [cardIdOf(a.artist, a.album), a.preview.status]);

// --- 3. seed_cards / apex_pool（上架開關）------------------------------------
// 2026-08-30 卡池合併：只剩 seed_cards.json 一份，王牌是第 9 欄帶 tier 的同一種列。
const SEED = path.join(ROOT, 'seed_cards.json');
const seedRaw = fs.readFileSync(SEED, 'utf8');
const seedRows = JSON.parse(seedRaw);

// 防呆：seed_cards.json 是「一列一行」的自訂排版，不是 JSON.stringify(o,null,1)。
// 用標準 JSON 寫回會把 12,909 行整個重排，diff 會爆掉。先驗重建方式逐字相同再動手。
// 換行字元跟著檔案走：雲端在 Linux 寫的是 LF，本機 checkout 之後是 CRLF（core.autocrlf），
// 寫死 LF 會讓下面那道排版自檢在本機必然失敗——2026-09-01 實際擋下了 c-51 的上架。
const seedEol = seedRaw.includes('],\r\n[') ? ',\r\n' : ',\n';
const renderSeed = rows => '[' + rows.map(r => JSON.stringify(r)).join(seedEol) + ']';
if (renderSeed(seedRows) !== seedRaw) {
  console.error('中止：seed_cards.json 的排版與本腳本的重建方式不符，貿然寫回會重排整檔。');
  console.error('請先確認排版規則是否改過，再調整 renderSeed()。');
  process.exit(1);
}

const existing = new Set();
for (const r of seedRows) existing.add(poolKeyOf(r[0], r[1]));

const MAP_GENRES = new Set(['jazz','rock','electronic','soul','hiphop','folk','classical','world','pop','blues']);
const seedAdds = [], apexAdds = [], poolSkips = [];
for (const a of albums) {
  if (existing.has(poolKeyOf(a.artist, a.album))) { poolSkips.push(`${a.artist} — ${a.album}`); continue; }
  const year = a.research?.suggestedYear ?? null;
  const tier = a.apexAssessment?.eligible ? a.apexAssessment.tier : null;
  // 一般卡與王牌現在是同一種列，差別只在第 9 欄 tier：
  //   [artist, album, classic, obscurity, accessibility, genres[], year, composer|null, tier?]
  // 第 6 欄曲風：manifest 若帶了策展層的 genres 就直接寫進去（音樂地圖十類 id），
  // 沒帶才留 null 交給 build-seed-genres 問 worker。2026-08-31 有 29 張因為只能靠
  // worker 的 Spotify／Last.fm、而那些華語老盤在兩處都查無，留下空曲風欄。
  const g = Array.isArray(a.genres) && a.genres.length && a.genres.every(x => MAP_GENRES.has(x)) ? a.genres.slice() : null;
  const row = [a.artist, a.album, a.ratings.classic, a.ratings.obscurity, a.ratings.accessibility, g, year, a.composer || null];
  if (tier) { row.push(tier); apexAdds.push([tier, row]); }
  else { if (!a.composer) row.length = 7; seedAdds.push(row); }
}

// --- 輸出 --------------------------------------------------------------------
fs.mkdirSync(stageDir, { recursive: true });
fs.writeFileSync(path.join(stageDir, 'card-catalog-patches.json'), JSON.stringify(catalogPatches, null, 1));
fs.writeFileSync(path.join(stageDir, 'preview-static-additions.json'), JSON.stringify(Object.fromEntries(audioAdds), null, 1));
fs.writeFileSync(path.join(stageDir, 'preview-status-additions.json'), JSON.stringify(Object.fromEntries(negAdds), null, 1));

const rel = path.relative(ROOT, stageDir);
console.log(`manifest: ${path.basename(manifestPath)}　${albums.length} 張`);
console.log(`  card_catalog  payload ${catalogPatches.length} 筆 -> ${rel}/card-catalog-patches.json`);
console.log(`  靜態試聽      新增 ${audioAdds.length}、已存在略過 ${audioSkips.length}`);
console.log(`  負面試聽狀態  新增 ${negAdds.length}`);
console.log(`  卡池待追加    一般卡 ${seedAdds.length}`);
console.log(`  其中王牌      ${apexAdds.length}${apexAdds.length ? '（' + [...new Set(apexAdds.map(x => x[0]))].join('／') + '）' : ''}`);
console.log(`  已在池中略過  ${poolSkips.length}`);

if (WRITE_PREVIEW) {
  for (const [k, v] of audioAdds) audioMap.entries[k] = v;
  audioMap.generatedAt = new Date().toISOString();
  fs.writeFileSync(AUDIO_MAP, JSON.stringify(audioMap, null, 1));
  if (negAdds.length) {
    const lines = negAdds.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join('\n');
    // 交界防呆（2026-08-28 實踩）：既有檔案的最後一筆可能沒有尾逗號，
    // 直接往 `});` 前面塞新行會讓整檔語法壞掉。先確保交界處有逗號再附加。
    const next = statusRaw
      .replace(/("\s*:\s*"[a-z]+")(\s*\n\}\);\s*)$/, '$1,$2')
      .replace(/\n\}\);\s*$/, `\n${lines}\n});\n`);
    if (next === statusRaw) {
      console.error('中止：card-preview-status.js 的結尾格式不符預期，未寫入。');
      process.exit(1);
    }
    fs.writeFileSync(STATUS_FILE, next);
  }
  changed = true;
  console.log(`\n已寫入靜態試聽 ${audioAdds.length} 筆、負面狀態 ${negAdds.length} 筆。`);
  console.log('接著請跑： node scripts/build-apple-audio-runtime-map.mjs');
} else if (WRITE_POOL) {
  // 一般卡與王牌都追加進同一份檔（王牌的列尾多一個 tier 欄）
  for (const r of seedAdds) seedRows.push(r);
  for (const [, row] of apexAdds) seedRows.push(row);
  fs.writeFileSync(SEED, renderSeed(seedRows));
  changed = true;
  console.log(`\n已追加卡池 ${seedAdds.length + apexAdds.length} 列（一般卡 ${seedAdds.length}、王牌 ${apexAdds.length}）。`);
  console.log('接著請跑： node scripts/build-seed-genres.mjs   （補曲風欄，缺欄的卡首頁抽不到）');
} else {
  console.log('\n（乾跑，未動任何檔案）');
  console.log('下一步依 ALBUM_ONBOARDING §8 的順序：');
  console.log('  1. 用 card-catalog-patches.json 寫 Firestore（updateMask 已備好，不會蓋掉後台改過的欄位）');
  console.log('  2. KV 固定簡介：');
  console.log(`     node ../dip-vinyl-worker/scripts/desc-gen/from_onboarding_manifest.mjs ${path.basename(manifestPath)} kv-bulk.json`);
  console.log('     npx wrangler kv bulk put kv-bulk.json --namespace-id 5f65e74b17d644b68a3f542b08a5c105');
  console.log(`  3. 試聽： node scripts/publish-manifest.mjs ${path.basename(manifestPath)} --write-preview`);
  console.log('           node scripts/build-apple-audio-runtime-map.mjs');
  console.log('  4. 回讀 1-3 確認與 manifest 一致');
  console.log(`  5. 上架開關： node scripts/publish-manifest.mjs ${path.basename(manifestPath)} --write-pool`);
  console.log('               node scripts/build-seed-genres.mjs');
  console.log(`  6. node scripts/verify-album-onboarding.mjs ${path.basename(manifestPath)} --published`);
}
if (changed) console.log('\n請 git diff 確認改動範圍後再提交。');
