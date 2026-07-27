// 卡池發行年份回填：MusicBrainz release-group 的 first-release-date 為準（原始發行年），
// Apple /lookup 的 releaseDate 只當交叉驗證——Apple 對老盤常回再版／remaster 年份，不可當主來源。
//
//   node scripts/build-release-years.mjs --sample 50     # 分層抽樣試跑，只輸出報告
//   node scripts/build-release-years.mjs                 # 全池，寫出 data/release-years-v1.json
//
// 判定：ok = MB 命中且（無 Apple 或兩者差 <= 2 年）；check = 兩者差 > 2 年，需人工看一眼；
//       miss = MB 沒有可信匹配，留給後續消歧義流程。
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// --sample=50 與 --sample 50 都要吃，否則後者會讓 sample 變空字串→靜靜跑成全池（踩過一次）
const args = new Map();
const argv = process.argv.slice(2);
for (let index = 0; index < argv.length; index++) {
  const found = argv[index].match(/^--([^=]+)(?:=(.*))?$/);
  if (!found) continue;
  if (found[2] !== undefined) { args.set(found[1], found[2]); continue; }
  const next = argv[index + 1];
  if (next && !next.startsWith('--')) { args.set(found[1], next); index++; }
  else args.set(found[1], '');
}
const sampleSize = Number(args.get('sample') || 0);
const skipApple = args.has('no-apple');
const recheck = args.has('recheck');
const onlyPath = args.get('only') || '';       // 指定清單檔（[{artist,album}]）只補跑那幾張
const outputPath = path.join(root, 'data', 'release-years-v1.json');
const reportPath = path.join(root, 'data', 'release-years-report.json');
const recheckReportPath = path.join(root, 'data', 'release-years-recheck-report.json');

const UA = 'dip-vinyl-year-backfill/1.0 ( kubinice06@gmail.com )';
const MB_DELAY = 1100;   // MusicBrainz 要求 1 req/s，抓 1.1s 留餘裕
const APPLE_BATCH = 100; // /lookup 單次上限

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Node 的 fetch 預設不會逾時，遇到對方悶著不回就整支腳本卡死（跑批最忌諱這個）→ 一律帶 AbortSignal。
async function fetchWithTimeout(url, options = {}, ms = 15000) {
  return fetch(url, { ...options, signal:AbortSignal.timeout(ms) });
}

// 與 build-apple-audio-map.mjs 同一套正規化，才能對上既有的 Apple runtime map key
const normalized = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, '');
const hasCjk = value => /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(value || '');
const albumCore = value => normalized(String(value || '')
  .replace(/[\(\[\{][^\)\]\}]*(?:remaster(?:ed)?|deluxe|expanded|anniversary|reissue|edition|live)[^\)\]\}]*[\)\]\}]/gi, ' ')
  .replace(/\b(?:remaster(?:ed)?(?:\s+version)?|deluxe(?:\s+edition)?|expanded(?:\s+edition)?|anniversary(?:\s+edition)?|mono|stereo|reissue|edition|live)\b/gi, ' '));
const cardKey = ({ artist, album }) => `${normalized(artist)}\u0000${normalized(album)}`;
const stableRank = card => createHash('sha256').update(cardKey(card)).digest('hex');
const yearOf = value => {
  const found = String(value || '').match(/^(\d{4})/);
  return found ? Number(found[1]) : null;
};

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function writeJsonAtomically(file, value) {
  await fs.mkdir(path.dirname(file), { recursive:true });
  const temporaryPath = `${file}.${process.pid}.tmp`;
  try {
    await fs.writeFile(temporaryPath, `${JSON.stringify(value, null, 1)}\n`, 'utf8');
    await fs.rename(temporaryPath, file);
  } catch (error) {
    await fs.rm(temporaryPath, { force:true }).catch(() => {});
    throw error;
  }
}

// ── 卡池 ──
const seed = await readJson(path.join(root, 'seed_cards.json'));
const apex = await readJson(path.join(root, 'apex_pool.json'));
const cards = [];
for (const [artist, album] of seed) cards.push({ artist, album, pool:'seed' });
for (const tier of ['hall', 'pearl', 'heresy']) {
  for (const [artist, album] of (apex?.[tier] || [])) cards.push({ artist, album, pool:tier });
}

// 抽樣：sha256 排序 → 確定性、可重跑、分散全池。CJK 另外分層，因為那是已知的高風險區
// （華語盤在各家資料庫的收錄與命名都比較亂），混在隨機樣本裡會被稀釋到看不出來。
let targets = cards;
// --recheck：只重跑上一輪報告裡的非 ok 卡。ok 桶的年份有 Apple 交叉驗證背書
// （MB 與 Apple 差 ≤2 年），就算 MB 挑錯 release-group，年份本身仍是對的，不必重查。
if (recheck) {
  const previous = await readJson(reportPath);
  targets = (previous.rows || []).map(row => ({ artist:row.artist, album:row.album, pool:row.pool }));
  process.stdout.write(`recheck: 從上一輪報告載入 ${targets.length} 張待重查\n`);
} else if (onlyPath) {
  targets = await readJson(path.resolve(root, onlyPath));
  process.stdout.write(`only: 從 ${onlyPath} 載入 ${targets.length} 張補跑\n`);
} else if (sampleSize > 0) {
  const cjkShare = Math.min(10, Math.floor(sampleSize / 5));
  const sorted = [...cards].sort((left, right) => stableRank(left).localeCompare(stableRank(right)));
  const cjk = sorted.filter(card => hasCjk(card.artist) || hasCjk(card.album)).slice(0, cjkShare);
  const chosen = new Set(cjk.map(cardKey));
  const rest = sorted.filter(card => !chosen.has(cardKey(card))).slice(0, sampleSize - cjk.length);
  targets = [...rest, ...cjk].map(card => ({ ...card, stratum:hasCjk(card.artist) || hasCjk(card.album) ? 'cjk' : 'random' }));
}

// ── Apple collectionId（既有 runtime map，零額外請求就拿得到）──
const runtime = await readJson(path.join(root, 'data', 'apple-audio-runtime-v1.json'));
const appleIndex = new Map(Object.entries(runtime.entries || {}));

// ── MusicBrainz ──
const mbEscape = value => String(value || '').replace(/["\\]/g, '\\$&');

// 卡池的華語／日韓藝人常寫成複合名（「蘇打綠 sodagreen」「MC HotDog 熱狗」「茄子蛋 EggPlantEgg」），
// MB 收的是其中一邊 → 整串下去查 0 筆。拆成 CJK 段與拉丁段各試一次就 100 分命中。
function artistVariants(name) {
  const raw = String(name || '').trim();
  const out = [raw];
  const hasLatin = /[a-z]/i.test(raw);
  if (hasCjk(raw) && hasLatin) {
    const cjkPart = raw.replace(/[^\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, ' ').replace(/\s+/g, ' ').trim();
    const latinPart = raw.replace(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/g, ' ').replace(/\s+/g, ' ').trim();
    for (const part of [cjkPart, latinPart]) if (part.length >= 2 && part !== raw) out.push(part);
  }
  return out;
}

// 藝人名的年代差異（Tony Williams 早期掛 Anthony Williams）只能靠 token 重疊救。
// 單獨用會誤配，所以僅在專輯名完全相符時才採信，且一律標成 loose 送人工複查。
const artistTokens = value => new Set(String(value || '').toLowerCase().split(/[^a-z0-9\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]+/).filter(token => token.length >= 3));
// 冠詞與編制詞不能當識別依據：只共用一個 the 就配對，會讓 The Beach Boys 認到 The Swift；
// 只共用 trio 就配對，會讓 Vince Guaraldi Trio 認到 Eric Byrd Trio。
const STOPWORDS = new Set([
  'the', 'and', 'his', 'her', 'their', 'with', 'feat', 'all', 'for', 'from', 'you', 'new', 'plus', 'big',
  'los', 'las', 'les', 'der', 'die', 'das', 'und',
  'band', 'trio', 'quartet', 'quintet', 'sextet', 'septet', 'orchestra', 'ensemble', 'group', 'project',
  'jazz', 'blues', 'rock', 'soul', 'funk'
]);
function tokenOverlap(left, right) {
  const a = artistTokens(left), b = artistTokens(right);
  for (const token of a) if (b.has(token) && !STOPWORDS.has(token)) return true;
  return false;
}

async function mbSearch(query, limit) {
  const url = `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&fmt=json&limit=${limit}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt) await sleep(MB_DELAY * (attempt + 1));
    try {
      const response = await fetchWithTimeout(url, { headers:{ 'User-Agent':UA, Accept:'application/json' } });
      if (response.status === 503) continue;         // MB 限流 → 退避重試
      if (!response.ok) return { error:`HTTP ${response.status}` };
      const payload = await response.json();
      await sleep(MB_DELAY);                          // 每次請求後都要讓出 1 req/s
      return { groups:payload['release-groups'] || [] };
    } catch (error) { /* 網路波動 → 下一輪 */ }
  }
  return { error:'unreachable' };
}

function describe(groups) {
  return groups.map(group => {
    const credited = (group['artist-credit'] || []).map(part => part.name || part?.artist?.name || '').join(' ');
    const secondary = group['secondary-types'] || [];
    return {
      mbid:group.id,
      title:group.title,
      credited,
      secondaryTypes:secondary,
      date:group['first-release-date'] || '',
      score:group.score || 0,
      // 合輯／現場／重製不是我們要的「這張碟本身」，排在後面但不直接丟掉
      clean:group['primary-type'] === 'Album' && secondary.length === 0
    };
  });
}

// rawArtist 必須是「未正規化」的原字串：正規化會把空格吃掉（tony williams → tonywilliams），
// 那樣就永遠切不出跟 anthony williams 共同的 token，loose 這條路等於沒作用。
function choose(items, wantArtist, wantAlbum, { loose = false, rawArtist = '' } = {}) {
  const matched = items.filter(item => {
    if (albumCore(item.title) !== wantAlbum) return false;
    const credited = normalized(item.credited);
    // 正規化後可能是空字串——西里爾、希臘等字母全被濾掉，NFKD 還會把韓文音節拆成 Jamo 一併濾掉。
    // 空字串絕不能拿去比對：`任何字串.includes('')` 恆為真，會讓 Fela Kuti 認到 Тимати。
    if (!credited || !wantArtist) return loose && tokenOverlap(item.credited, rawArtist);
    if (credited === wantArtist) return true;
    // 冠詞差異要在長度規則之前處理：Can 的首版在 MB 掛「The Can」，
    // 而 'can' 只有 3 字會被下面的最小長度擋掉，害 1969 原版配不上（拿到 2012 再版）。
    if (credited.replace(/^the/, '') === wantArtist.replace(/^the/, '')) return true;
    // 包含關係對短名會誤配（'wire'.includes('wir') → Wire 認到 Wir）。
    // 拉丁名要求較短那邊至少 4 字；CJK 每字資訊量高，2 字就夠（「王菲」不能被擋掉）。
    const minLength = hasCjk(credited) || hasCjk(wantArtist) ? 2 : 4;
    if (Math.min(credited.length, wantArtist.length) >= minLength
      && (credited.includes(wantArtist) || wantArtist.includes(credited))) return true;
    return loose && tokenOverlap(item.credited, rawArtist);
  });
  // 同一張碟在 MB 常有多個 release-group（原版＋重製／紀念盤），MB 是按相關度排序回來的，
  // 取第一個會挑到再版年（Santana《Santana》拿到 1997 而不是 1969）。
  // 我們要的是「原始發行年」→ 一律取發行日最早的那個。
  const dated = matched.filter(item => yearOf(item.date));
  if (!dated.length) return null;
  const clean = dated.filter(item => item.clean);
  const pool = clean.length ? clean : dated;
  const pick = pool.reduce((best, item) => (yearOf(item.date) < yearOf(best.date) ? item : best), pool[0]);
  return { pick, ambiguous:pool.length > 1 };
}

async function musicbrainzYear(card) {
  const wantArtist = normalized(card.artist);
  const wantAlbum = albumCore(card.album);
  const seen = [];
  let requests = 0;

  // 熱門老盤在 MB 往往有一大票同名合輯／紀念盤，score 全是 100，原版被擠出前幾名
  // （查 Santana《Santana》前十筆全是 Compilation，1969 原版根本不在裡面）→ 直接在查詢層擋掉，
  // 讓 MB 只回原版錄音室專輯。卡池本身收的現場盤／EP 會被這層擋光，所以要有不過濾的第二階段。
  const STUDIO_ONLY = ' AND primarytype:album AND -secondarytype:compilation AND -secondarytype:live';

  for (const filter of [STUDIO_ONLY, '']) {
    for (const variant of artistVariants(card.artist)) {
      const result = await mbSearch(`artist:"${mbEscape(variant)}" AND releasegroup:"${mbEscape(card.album)}"${filter}`, 25);
      requests++;
      if (result.error) return { error:result.error, requests };
      const items = describe(result.groups);
      seen.push(...items);
      const hit = choose(items, normalized(variant), wantAlbum);
      if (hit) {
        return {
          year:yearOf(hit.pick.date), date:hit.pick.date, mbid:hit.pick.mbid,
          matchedTitle:hit.pick.title, matchedArtist:hit.pick.credited,
          clean:hit.pick.clean, ambiguous:hit.ambiguous,
          matchLevel:variant === card.artist ? (filter ? 'exact' : 'exact-any-type') : (filter ? 'split-artist' : 'split-artist-any-type'),
          queriedArtist:variant, requests
        };
      }
    }
  }

  // 第二輪：只查專輯名，靠 token 重疊認藝人 → 一律 loose，進 check 桶等人工
  const wide = await mbSearch(`releasegroup:"${mbEscape(card.album)}"`, 25);
  requests++;
  if (!wide.error) {
    const items = describe(wide.groups);
    seen.push(...items);
    const hit = choose(items, wantArtist, wantAlbum, { loose:true, rawArtist:card.artist });
    if (hit) {
      return {
        year:yearOf(hit.pick.date), date:hit.pick.date, mbid:hit.pick.mbid,
        matchedTitle:hit.pick.title, matchedArtist:hit.pick.credited,
        clean:hit.pick.clean, ambiguous:hit.ambiguous,
        matchLevel:'loose', requests
      };
    }
  }

  return {
    error:'no-match', requests,
    topCandidates:seen.slice(0, 4).map(item => ({ title:item.title, credited:item.credited, date:item.date, score:item.score }))
  };
}

// ── Apple /lookup 批次（100 個 id 一次，全 50 張只花 1 個請求）──
async function appleYears(ids, storefront) {
  const out = new Map();
  for (let index = 0; index < ids.length; index += APPLE_BATCH) {
    const chunk = ids.slice(index, index + APPLE_BATCH);
    const url = `https://itunes.apple.com/lookup?id=${chunk.join(',')}&country=${storefront}&entity=album`;
    try {
      const response = await fetchWithTimeout(url, { headers:{ 'User-Agent':UA } });
      if (!response.ok) { process.stdout.write(`apple lookup HTTP ${response.status}\n`); continue; }
      const payload = await response.json();
      for (const item of (payload.results || [])) {
        if (item.collectionId) out.set(String(item.collectionId), yearOf(item.releaseDate));
      }
    } catch (error) {
      // Apple 掛了或逾時就當沒有交叉驗證，不阻斷 MB 主流程
      process.stdout.write(`apple lookup failed: ${error.message}\n`);
    }
    await sleep(400);
  }
  return out;
}

const byStorefront = new Map();
for (const card of targets) {
  const entry = appleIndex.get(cardKey(card));
  if (!entry) continue;
  const [storefront, collectionId] = entry;
  if (!byStorefront.has(storefront)) byStorefront.set(storefront, []);
  byStorefront.get(storefront).push(collectionId);
}
const appleYearById = new Map();
if (!skipApple) {
  for (const [storefront, ids] of byStorefront) {
    process.stdout.write(`apple lookup ${storefront} ${ids.length} ids\n`);
    const found = await appleYears(ids, storefront);
    for (const [id, year] of found) appleYearById.set(id, year);
  }
  process.stdout.write(`apple years resolved: ${appleYearById.size}\n`);
}

// ── 主流程 ──
const rows = [];
for (let index = 0; index < targets.length; index++) {
  const card = targets[index];
  // 間隔已由 mbSearch 內部負責（一張可能發多次請求），這裡不能再 sleep，否則整體慢一倍
  const mb = await musicbrainzYear(card);
  const entry = appleIndex.get(cardKey(card));
  const appleYear = entry ? (appleYearById.get(entry[1]) ?? null) : null;

  let verdict = 'miss';
  let gap = null;
  if (mb.year) {
    // loose 是靠 token 重疊認的藝人，本身不夠格；但只要 Apple 這個獨立來源也給同一個年份，
    // 就等於兩邊互相背書（實測 91 張可對照者有 83 張相符），可以直接採信，不必人工。
    if (mb.matchLevel === 'loose') {
      verdict = (appleYear != null && Math.abs(appleYear - mb.year) <= 2) ? 'loose-confirmed' : 'check-loose';
    }
    else if (appleYear == null) verdict = 'ok-no-cross';
    else {
      gap = Math.abs(appleYear - mb.year);
      verdict = gap <= 2 ? 'ok' : 'check';
    }
  }
  rows.push({ ...card, mbYear:mb.year ?? null, appleYear, gap, verdict, matchLevel:mb.matchLevel || null, mb });
  process.stdout.write(`${String(index + 1).padStart(4)}/${targets.length}  ${verdict.padEnd(12)} MB:${String(mb.year ?? '----')} AP:${String(appleYear ?? '----')} ${(mb.matchLevel || '-').padEnd(13)} ${card.artist} — ${card.album}\n`);
}

const tally = rows.reduce((acc, row) => (acc[row.verdict] = (acc[row.verdict] || 0) + 1, acc), {});
const resolved = rows.filter(row => row.mbYear).length;

if (sampleSize > 0) {
  await writeJsonAtomically(reportPath, { generatedAt:new Date().toISOString(), sample:targets.length, tally, rows });
  console.log(JSON.stringify({
    mode:'sample',
    sample:targets.length,
    resolved,
    resolvedPct:`${(100 * resolved / targets.length).toFixed(1)}%`,
    tally,
    report:path.relative(root, reportPath).replace(/\\/g, '/')
  }, null, 1));
} else {
  // recheck／only 都只重跑一小批 → 要疊在既有資料檔上，不能整份覆寫掉沒重跑的部分
  const partial = recheck || Boolean(onlyPath);
  const years = partial ? { ...(await readJson(outputPath)).entries } : {};
  let removed = 0;
  for (const row of rows) {
    const key = cardKey(row);
    // 未經 Apple 背書的 loose 不進資料檔——它只是「專輯名對上、藝人名有共同字」，要人工點頭才算數
    if (row.mbYear && (row.matchLevel !== 'loose' || row.verdict === 'loose-confirmed')) years[key] = row.mbYear;
    else if (partial && key in years) { delete years[key]; removed++; }   // 修嚴後不再成立的舊值要撤掉
  }
  await writeJsonAtomically(outputPath, { version:1, generatedAt:new Date().toISOString(), entries:years });
  await writeJsonAtomically(partial ? recheckReportPath : reportPath, {
    generatedAt:new Date().toISOString(), total:targets.length, tally, rows:rows.filter(row => row.verdict !== 'ok')
  });
  console.log(JSON.stringify({
    mode:onlyPath ? 'only' : recheck ? 'recheck' : 'full',
    total:targets.length, resolved, tally,
    entriesInFile:Object.keys(years).length,
    ...(partial ? { removedStaleEntries:removed } : {}),
    output:path.relative(root, outputPath).replace(/\\/g, '/')
  }, null, 1));
}
