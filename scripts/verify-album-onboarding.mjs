#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const FIRESTORE = process.env.DIP_ONBOARD_FIRESTORE_BASE || 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
const WORKER = process.env.DIP_ONBOARD_WORKER_BASE || 'https://dip-vinyl-worker.kubinice06.workers.dev';
const RARITY = score => score >= 10 ? 'legendary' : score >= 8 ? 'epic' : score >= 6 ? 'uncommon' : score >= 4 ? 'rare' : 'common';
const TIERS = new Set(['hall', 'pearl', 'heresy']);
const PREVIEW_STATUSES = new Set(['ready', 'unavailable', 'disabled']);
const COVER_SOURCES = new Set(['bandcamp', 'spotify', 'caa', 'manual']);
// 曲風 release type 例外（白名單制）：非 Album 只開放給有 12 吋／mix 文化的曲風，見 ALBUM_ONBOARDING.md
const EXCEPTION_RELEASE_TYPES = new Set(['EP', 'Single', 'DJ-mix']);
const EXCEPTION_GENRES = new Set(['electronic']);
const PREVIEW_SOURCES = new Set(['apple', 'youtube']);
const BANNED = /(融合多種元素|具有代表性|層次豐富|傑作|必聽|里程碑|獨樹一格)/;
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uac00-\ud7af]/;

function usage(exitCode = 0) {
  console.log('用法: node scripts/verify-album-onboarding.mjs <manifest.json|-> [--published]');
  console.log('  預設只驗上架前資料；--published 會回讀 repo、Firestore、Worker KV 與網址。');
  process.exit(exitCode);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) usage(0);
const publishedMode = args.includes('--published');
const input = args.find(x => !x.startsWith('--'));
if (!input) usage(1);

const raw = input === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(path.resolve(input), 'utf8');
let manifest;
try { manifest = JSON.parse(raw); }
catch (error) { console.error(`ERROR manifest JSON 無法解析：${error.message}`); process.exit(1); }

const errors = [];
const warnings = [];
const err = (label, message) => errors.push(`${label}: ${message}`);
const warn = (label, message) => warnings.push(`${label}: ${message}`);
const isObj = value => value && typeof value === 'object' && !Array.isArray(value);
const isHttps = value => typeof value === 'string' && /^https:\/\//i.test(value);
// 靜態試聽路徑 helper：與 dip-player.js appleAudioKey / card-preview-status.js 鍵一致
const previewNorm = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, '');
let _staticMap, _staticStatus;
function staticAudioMap() {
  if (_staticMap !== undefined) return _staticMap;
  try { _staticMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'apple-audio-runtime-v1.json'), 'utf8')); }
  catch { _staticMap = null; }
  return _staticMap;
}
function staticPreviewStatus() {
  if (_staticStatus) return _staticStatus;
  _staticStatus = {};
  try {
    const src = fs.readFileSync(path.join(ROOT, 'card-preview-status.js'), 'utf8');
    const body = src.match(/Object\.freeze\((\{[\s\S]*?\})\)/);
    if (body) _staticStatus = JSON.parse(body[1].replace(/,(\s*)\}/g, "$1}"));
  } catch {}
  return _staticStatus;
}
const charCount = value => Array.from(String(value || '')).length;
const clean = value => String(value || '').trim();
const keyOf = (artist, album) => `${artist}|${album}`.toLocaleLowerCase().replace(/\//g, '-').trim();
const norm = value => clean(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().replace(/\bvol(?:ume)?\b/g, 'volume').replace(/[^\p{L}\p{N}]+/gu, '');

function previewUrlMatchesSource(value, source) {
  try {
    const host = new URL(value).hostname.toLocaleLowerCase();
    if (source === 'youtube') return host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com');
    if (source === 'apple') return host === 'apple.com' || host.endsWith('.apple.com') || host === 'mzstatic.com' || host.endsWith('.mzstatic.com');
  } catch {}
  return false;
}

function validIso(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function uniqueHttps(list, minimum, label) {
  if (!Array.isArray(list)) { err(label, '必須是網址陣列'); return; }
  const unique = new Set(list.map(clean).filter(Boolean));
  if (unique.size < minimum) err(label, `至少需要 ${minimum} 個不同來源網址`);
  for (const url of unique) if (!isHttps(url)) err(label, `只接受 HTTPS：${url}`);
}

function firestoreValue(value) {
  if (!isObj(value)) return undefined;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) return (value.arrayValue.values || []).map(firestoreValue);
  if ('mapValue' in value) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([k, v]) => [k, firestoreValue(v)]));
  return undefined;
}

function firestoreFields(doc) {
  return Object.fromEntries(Object.entries(doc?.fields || {}).map(([key, value]) => [key, firestoreValue(value)]));
}

async function getJson(url, label, { allow404 = false } = {}) {
  try {
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
    if (!response.ok) {
      // allow404：文件不存在是合法狀態（如 album_overrides 缺文件時改驗靜態試聽路徑）
      if (!(allow404 && response.status === 404)) err(label, `HTTP ${response.status}`);
      return { response, data: null };
    }
    return { response, data: await response.json() };
  } catch (error) {
    err(label, `讀取失敗：${error.message}`);
    return { response: null, data: null };
  }
}

async function checkUrl(url, label) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(25000) });
    if (response.status < 200 || response.status >= 400) err(label, `實際 HTTP ${response.status}`);
  } catch (error) { err(label, `網址讀取失敗：${error.message}`); }
}

if (manifest?.schemaVersion !== 1) err('manifest', 'schemaVersion 必須是 1');
if (!clean(manifest?.batch)) err('manifest', '缺少 batch 名稱');
if (!Array.isArray(manifest?.albums) || manifest.albums.length === 0) err('manifest', 'albums 必須是非空陣列');

const albums = Array.isArray(manifest?.albums) ? manifest.albums : [];
const seen = new Set();
const seenAlbumOnly = new Map();

for (let index = 0; index < albums.length; index++) {
  const row = albums[index];
  const artist = clean(row?.artist);
  const album = clean(row?.album);
  const label = `albums[${index}] ${artist || '?'} — ${album || '?'}`;
  if (!artist) err(label, '缺 artist');
  if (!album) err(label, '缺 album');
  const key = keyOf(artist, album);
  if (seen.has(key)) err(label, 'manifest 內 artist+album 重複');
  seen.add(key);
  const albumNorm = norm(album);
  if (seenAlbumOnly.has(albumNorm) && seenAlbumOnly.get(albumNorm) !== norm(artist)) {
    warn(label, '同批有相同正規化專輯名但不同 artist-credit，請確認不是拆分 credit 的同一張碟');
  } else seenAlbumOnly.set(albumNorm, norm(artist));

  const identity = row?.identity;
  if (!isObj(identity)) err(label, '缺 identity');
  else {
    if (identity.releaseType === 'Album') {
      // 正規專輯：照原規則
    } else if (EXCEPTION_RELEASE_TYPES.has(identity.releaseType)) {
      // 曲風例外（白名單制）：非 Album 只開放給特定曲風，且走精選制
      if (!EXCEPTION_GENRES.has(identity.genreException)) {
        err(label, `releaseType=${identity.releaseType} 需要 genreException 在白名單內（目前開放：${[...EXCEPTION_GENRES].join('、')}）`);
      }
      if (charCount(identity.exceptionReason) < 12) err(label, '非 Album 例外必須在 identity.exceptionReason 留下具體歷史地位理由');
      const ev = identity.exceptionEvidenceUrls;
      if (!Array.isArray(ev) || ev.filter(u => isHttps(u)).length < 2) {
        err(label, '非 Album 例外採精選制：identity.exceptionEvidenceUrls 至少需要兩個 HTTPS 證據網址');
      }
    } else {
      err(label, `identity.releaseType 必須是 Album，或白名單曲風的例外類型（${[...EXCEPTION_RELEASE_TYPES].join('／')}）`);
    }
    if (identity.aliasesChecked !== true) err(label, '必須完成跨文字系統／artist-credit 別名檢查');
    if (charCount(identity.aliasReview) < 10) err(label, 'identity.aliasReview 必須留下人工檢查結論');
  }

  const cover = row?.cover;
  if (!isObj(cover)) err(label, '缺 cover');
  else {
    if (!isHttps(cover.url)) err(label, 'cover.url 必須是 HTTPS');
    if (!COVER_SOURCES.has(cover.source)) err(label, `cover.source 不支援：${cover.source}`);
    if (!Number.isInteger(cover.httpStatus) || cover.httpStatus < 200 || cover.httpStatus >= 400) err(label, 'cover.httpStatus 必須是 2xx/3xx');
    if (!validIso(cover.checkedAt)) err(label, 'cover.checkedAt 必須是 ISO 日期');
  }

  const ratings = row?.ratings;
  if (!isObj(ratings)) err(label, '缺 ratings');
  else {
    for (const axis of ['classic', 'obscurity', 'accessibility']) {
      if (!Number.isInteger(ratings[axis]) || ratings[axis] < 1 || ratings[axis] > 5) err(label, `ratings.${axis} 必須是 1–5 整數`);
    }
    if (!(ratings.listeners === null || (Number.isInteger(ratings.listeners) && ratings.listeners >= 0))) err(label, 'ratings.listeners 必須是非負整數或 null');
    if (charCount(ratings.source) < 5) err(label, 'ratings.source 必須記錄評分來源');
    if (!validIso(ratings.checkedAt)) err(label, 'ratings.checkedAt 必須是 ISO 日期');
    const expected = RARITY(Number(ratings.classic) + Number(ratings.accessibility) + (ratings.obscurity >= 5 ? 1 : 0));
    if (row?.rarity !== expected) err(label, `rarity 應為 ${expected}，目前是 ${row?.rarity}`);
  }

  const apex = row?.apexAssessment;
  if (!isObj(apex)) err(label, '缺 apexAssessment');
  else {
    if (typeof apex.eligible !== 'boolean') err(label, 'apexAssessment.eligible 必須是 boolean');
    if (charCount(apex.reason) < 12) err(label, 'apexAssessment.reason 必須留下具體判定理由');
    if (apex.eligible) {
      if (!TIERS.has(apex.tier)) err(label, '頂點候選 tier 必須是 hall／pearl／heresy');
      uniqueHttps(apex.evidenceUrls, 2, `${label} apexAssessment.evidenceUrls`);
      if (apex.tier === 'hall' && ratings?.classic !== 5) err(label, 'hall 候選必須 classic=5');
      if (apex.tier === 'pearl' && !(ratings?.obscurity === 5 && Number.isInteger(ratings?.listeners) && ratings.listeners < 300)) err(label, 'pearl 候選必須 obscurity=5 且 listeners < 300；查無資料不可算 0');
      if (apex.tier === 'heresy' && ratings?.accessibility !== 5) err(label, 'heresy 候選必須 accessibility=5');
    } else {
      if (apex.tier !== null) err(label, '非頂點候選的 tier 必須是 null');
      if (!Array.isArray(apex.evidenceUrls)) err(label, 'apexAssessment.evidenceUrls 必須是陣列');
    }
  }

  const description = row?.description;
  if (!isObj(description)) err(label, '缺 description');
  else {
    const length = charCount(description.text);
    if (length < 80) err(label, `description.text 長度必須至少 80 字，目前 ${length}`);
    // 2026-07-22 店主核定：超過 180 字允許，但必須經人工審核確認無冗贅字詞，
    // 以 description.lengthReviewed=true 留下審核紀錄；未標記仍照原上限擋下。
    else if (length > 180 && description.lengthReviewed !== true) {
      err(label, `description.text 超過 180 字（${length}）：需人工審核無冗贅字詞後標記 lengthReviewed=true`);
    }
    if (BANNED.test(description.text || '')) err(label, `description.text 含禁止用語：${description.text.match(BANNED)[0]}`);
    if (/^這張專輯/.test(clean(description.text))) err(label, 'description.text 不可用「這張專輯」開頭');
    uniqueHttps(description.sourceUrls, 2, `${label} description.sourceUrls`);
  }

  const preview = row?.preview;
  if (!isObj(preview)) err(label, '缺 preview');
  else {
    if (!PREVIEW_STATUSES.has(preview.status)) err(label, `preview.status 不支援：${preview.status}`);
    if (preview.status === 'ready') {
      if (!isHttps(preview.url)) err(label, 'ready preview 必須有 HTTPS url');
      if (!PREVIEW_SOURCES.has(preview.source)) err(label, 'ready preview.source 必須是 apple 或 youtube');
      else if (!previewUrlMatchesSource(preview.url, preview.source)) err(label, `preview.url 網域與 source=${preview.source} 不符`);
      if (!Number.isInteger(preview.httpStatus) || preview.httpStatus < 200 || preview.httpStatus >= 400) err(label, 'preview.httpStatus 必須是 2xx/3xx');
      if (!validIso(preview.checkedAt)) err(label, 'preview.checkedAt 必須是 ISO 日期');
    } else {
      if (clean(preview.url)) err(label, `${preview.status} 不可保留 preview.url`);
      if (preview.source !== 'none') err(label, `${preview.status} 的 source 必須是 none`);
    }
  }

  if (norm(artist) === norm(album) && !(identity?.selfTitledVerified === true && preview?.status === 'ready')) {
    err(label, '自我同名卡只有在 identity.selfTitledVerified=true 且固定試聽 ready 時才能上架');
  }

  if (publishedMode) {
    const pub = row?.published;
    if (!isObj(pub)) err(label, '--published 模式缺 published');
    else {
      for (const target of ['cardCatalog', 'descriptionKv', 'albumOverride']) if (pub[target] !== true) err(label, `published.${target} 必須是 true`);
      if ((pub.seedCards === true) === (pub.apexPool === true)) err(label, 'published.seedCards 與 apexPool 必須恰好一個 true');
      if (pub.apexPool === true && apex?.eligible !== true) err(label, '寫入 apexPool 前必須通過頂點候選判定');
    }
  }
}

if (!publishedMode && errors.length === 0) {
  const seeds = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
  const existing = new Set(seeds.map(row => keyOf(row[0], row[1])));
  for (const row of albums) if (existing.has(keyOf(row.artist, row.album))) err(`${row.artist} — ${row.album}`, 'prepare gate 發現已存在 seed_cards.json，請先釐清是重跑或重複卡');
  // apex_pool 也要查：2026-07-22 批次1有 5 張與 apex_pool.heresy 撞名仍被上架成普卡（一卡兩身分）
  const apexPool = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));
  const apexExisting = new Map();
  for (const [tier, list] of Object.entries(apexPool)) for (const [a, b] of list) apexExisting.set(keyOf(a, b), tier);
  for (const row of albums) {
    const tier = apexExisting.get(keyOf(row.artist, row.album));
    if (tier && row.published?.apexPool !== true) err(`${row.artist} — ${row.album}`, `已存在 apex_pool.${tier}（王牌），不得再以普卡上架；若確為同一張請改走 apexPool 入口或自本批移除`);
  }
}

if (publishedMode && errors.length === 0) {
  const seeds = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
  const apexPool = JSON.parse(fs.readFileSync(path.join(ROOT, 'apex_pool.json'), 'utf8'));
  for (const row of albums) {
    const label = `${row.artist} — ${row.album}`;
    const seedMatches = seeds.filter(x => keyOf(x[0], x[1]) === keyOf(row.artist, row.album));
    if (row.published.seedCards) {
      if (seedMatches.length !== 1) err(label, `seed_cards.json 應恰好 1 筆，目前 ${seedMatches.length}`);
      else {
        if (seedMatches[0].slice(2, 5).some((value, i) => value !== [row.ratings.classic, row.ratings.obscurity, row.ratings.accessibility][i])) err(label, 'seed_cards.json 三軸與 manifest 不一致');
        // 第 6 欄曲風陣列（類型挑片靠它過濾；追加後跑 scripts/build-seed-genres.mjs 補齊）
        if (!Array.isArray(seedMatches[0][5])) err(label, 'seed_cards.json 缺第 6 欄曲風陣列，請跑 scripts/build-seed-genres.mjs');
      }
    }
    if (row.published.apexPool) {
      const list = apexPool[row.apexAssessment.tier] || [];
      const matches = list.filter(x => keyOf(x[0], x[1]) === keyOf(row.artist, row.album));
      if (matches.length !== 1) err(label, `apex_pool.${row.apexAssessment.tier} 應恰好 1 筆，目前 ${matches.length}`);
      else if (!Array.isArray(matches[0][2])) err(label, `apex_pool.${row.apexAssessment.tier} 缺第 3 欄曲風陣列（類型挑片的特殊模式靠它過濾）`);
    }

    const docId = encodeURIComponent(keyOf(row.artist, row.album));
    const catalogResult = await getJson(`${FIRESTORE}/card_catalog/${docId}`, `${label} card_catalog`);
    if (catalogResult.data) {
      const fields = firestoreFields(catalogResult.data);
      for (const axis of ['classic', 'obscurity', 'accessibility']) if (fields[axis] !== row.ratings[axis]) err(label, `card_catalog.${axis} 不一致`);
      if (fields.rarity !== row.rarity) err(label, 'card_catalog.rarity 不一致');
      if (fields.coverUrl !== row.cover.url) err(label, 'card_catalog.coverUrl 不一致');
    }

    const overrideResult = await getJson(`${FIRESTORE}/album_overrides/${docId}`, `${label} album_overrides`, { allow404: true });
    if (overrideResult.data) {
      const fields = firestoreFields(overrideResult.data);
      if (fields.previewStatus !== row.preview.status) err(label, `album_overrides.previewStatus 應為 ${row.preview.status}`);
      if (row.preview.status === 'ready' && fields.previewUrl !== row.preview.url) err(label, 'album_overrides.previewUrl 不一致');
      if (row.preview.status !== 'ready' && clean(fields.previewUrl)) err(label, '負面試聽狀態不應留 previewUrl');
      if (row.published.apexPool && fields.tier !== row.apexAssessment.tier) err(label, 'album_overrides.tier 不一致');
    } else {
      // 靜態路徑（與 album_overrides 等價，見 ALBUM_ONBOARDING.md §6）：
      // ready → data/apple-audio-runtime-v1.json 需有相同 previewUrl；
      // unavailable/disabled → card-preview-status.js 需有對應狀態。
      if (row.preview.status === 'ready') {
        const mapKey = `${previewNorm(row.artist)}\u0000${previewNorm(row.album)}`;
        const entry = staticAudioMap()?.entries?.[mapKey];
        if (!entry) err(label, 'ready 但 album_overrides 與 apple-audio-runtime 靜態地圖皆無此卡');
        else if (entry[2] !== row.preview.url) err(label, '靜態地圖 previewUrl 與 manifest 不一致');
      } else {
        const status = staticPreviewStatus()[keyOf(row.artist, row.album)];
        if (status !== row.preview.status) err(label, `${row.preview.status} 但 album_overrides 與 card-preview-status.js 皆無對應狀態`);
      }
    }

    const descUrl = `${WORKER}/album-desc?artist=${encodeURIComponent(row.artist)}&album=${encodeURIComponent(row.album)}&verify=${Date.now()}`;
    const descResult = await getJson(descUrl, `${label} album-desc`);
    if (descResult.data) {
      if (descResult.data.desc !== row.description.text) err(label, '/album-desc 文字與 manifest 不一致');
      const cache = descResult.response?.headers.get('x-cache') || '';
      if (!['KV-HIT', 'CURATED'].includes(cache)) err(label, `/album-desc X-Cache=${cache || '(空)'}，仍可能是現場生成`);
    }

    await checkUrl(row.cover.url, `${label} coverUrl`);
    if (row.preview.status === 'ready') await checkUrl(row.preview.url, `${label} previewUrl`);
  }
}

for (const message of warnings) console.warn(`WARN ${message}`);
for (const message of errors) console.error(`ERROR ${message}`);
console.log(`檢查 ${albums.length} 張：${errors.length} error，${warnings.length} warning（phase=${publishedMode ? 'published' : 'prepare'}）`);
process.exit(errors.length ? 1 : 0);
