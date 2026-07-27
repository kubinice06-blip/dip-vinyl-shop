// 用 Discogs 當第三方裁判，補 MusicBrainz 查不到的、以及 MB 與 Apple 分歧的年份。
// 不做全池重查——絕大多數卡已有 MB＋Apple 兩方背書，再查一次是純浪費 rate limit。
//
//   node scripts/verify-years-discogs.mjs --sample 30    # 試跑，只出報告
//   node scripts/verify-years-discogs.mjs                # 跑完整待驗清單
//
// 為什麼查 type=release 而不是 master：master 的 year 未必是原始發行年
// （山本剛トリオ《Speak Low》的 master 標 1999，原版是 1975）。改看所有壓片取最早，
// 再排除合輯與非官方盤，對 Santana《Santana》1969、Gap Band IV 1982 都答對。
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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

const reportPath = path.join(root, 'data', 'release-years-report.json');
const outputPath = path.join(root, 'data', 'discogs-years.json');
const outputReportPath = path.join(root, 'data', 'discogs-verify-report.json');
const romanizationPath = path.join(root, 'data', 'artist-romanization.json');

// token 只從環境變數或 gitignore 的本機檔案讀，絕不寫進任何進版控的檔案
const token = process.env.DISCOGS_TOKEN
  || (await fs.readFile(path.join(root, '.discogs-token'), 'utf8').catch(() => '')).trim();
if (!token) {
  console.error('缺少 Discogs token：設環境變數 DISCOGS_TOKEN，或放進 dip-vinyl-shop/.discogs-token');
  process.exit(1);
}

const UA = 'dip-vinyl-year-backfill/1.0 ( kubinice06@gmail.com )';
const HEADERS = { 'User-Agent':UA, Authorization:`Discogs token=${token}` };
const DELAY = 1100;                       // 認證後 60 req/min，抓 1.1s 留餘裕
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const hasCjk = value => /[㐀-鿿぀-ヿ가-힯]/.test(value || '');
const yearOf = value => {
  const found = String(value || '').match(/^(\d{4})/);
  return found ? Number(found[1]) : null;
};

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (fallback !== undefined) return fallback; throw error; }
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

// Discogs 幾乎不索引日文／中文藝人名（查「清水靖晃」0 筆，查 Yasuaki Shimizu 就命中 1982），
// 所以 CJK 藝人要先換成羅馬字。對照表由外部產生，這裡只負責查表；查不到就用原名硬試一次。
const romanization = await readJson(romanizationPath, { entries:{} });
function artistQueries(name) {
  const out = [];
  const mapped = romanization.entries?.[name];
  if (mapped) out.push(mapped);
  // 卡池不少華語藝人寫成中英複合名（「蘇打綠 sodagreen」「落日飛車 Sunset Rollercoaster」），
  // 而 Discogs 收的正是那個英文名 → 直接把拉丁段抽出來當查詢。
  if (hasCjk(name) && /[a-z]/i.test(name)) {
    const latin = name.replace(/[㐀-鿿぀-ヿ가-힯]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (latin.length >= 2) out.push(latin);
  }
  out.push(name);
  // 「山本剛トリオ」→「山本剛」：編制詞會讓命中率變差，去掉再試一次
  const stripped = String(name).replace(/(トリオ|カルテット|クインテット|セクステット|オーケストラ|グループ|樂團|樂隊|乐队)$/u, '').trim();
  if (stripped && stripped !== name) out.push(stripped);
  return [...new Set(out)];
}

async function discogsYear(artist, album) {
  for (const query of artistQueries(artist)) {
    // CJK 原名在 Discogs 基本查不到，沒有羅馬字對照就別浪費一次 rate limit
    if (hasCjk(query) && romanization.entries?.[artist]) continue;
    const url = `https://api.discogs.com/database/search?artist=${encodeURIComponent(query)}`
      + `&release_title=${encodeURIComponent(album)}&type=release&per_page=100`;
    let payload = null;
    for (let attempt = 0; attempt < 3 && !payload; attempt++) {
      if (attempt) await sleep(DELAY * (attempt + 1));
      try {
        const response = await fetchWithTimeout(url);
        if (response.status === 429) continue;                 // 撞到限流 → 退避重試
        if (!response.ok) return { error:`HTTP ${response.status}` };
        payload = await response.json();
      } catch (error) { /* 網路波動 → 下一輪 */ }
    }
    await sleep(DELAY);
    if (!payload) continue;

    // 合輯與非官方盤的年份不是我們要的「原始發行年」
    const pressings = (payload.results || [])
      .filter(item => yearOf(item.year))
      .filter(item => !(item.format || []).some(format => /compilation|unofficial/i.test(format)));
    if (!pressings.length) continue;

    const years = pressings.map(item => yearOf(item.year)).sort((left, right) => left - right);
    const earliest = pressings.find(item => yearOf(item.year) === years[0]);
    return {
      year:years[0],
      pressings:pressings.length,
      queriedArtist:query,
      matchedTitle:earliest?.title || '',
      spread:years[years.length - 1] - years[0]
    };
  }
  return { error:'no-match' };
}

async function fetchWithTimeout(url, ms = 20000) {
  return fetch(url, { headers:HEADERS, signal:AbortSignal.timeout(ms) });
}

// ── 待驗清單：只挑 MB 沒查到的，以及 MB 與 Apple 對不起來的 ──
const report = await readJson(reportPath);
const NEEDS_JUDGE = new Set(['miss', 'check', 'check-loose']);
let targets = (report.rows || []).filter(row => NEEDS_JUDGE.has(row.verdict));
if (sampleSize > 0) targets = targets.slice(0, sampleSize);

process.stdout.write(`待驗 ${targets.length} 張（miss／check／check-loose）\n`);
if (!romanization.entries || !Object.keys(romanization.entries).length) {
  const cjkCount = targets.filter(row => hasCjk(row.artist)).length;
  if (cjkCount) process.stdout.write(`注意：其中 ${cjkCount} 張是 CJK 藝人，但還沒有羅馬字對照表 → Discogs 大概率查不到\n`);
}

const rows = [];
for (let index = 0; index < targets.length; index++) {
  const card = targets[index];
  const discogs = await discogsYear(card.artist, card.album);

  // 三方投票：MB／Apple／Discogs
  const votes = [card.mbYear, card.appleYear, discogs.year].filter(year => year != null);
  const counts = new Map();
  for (const year of votes) counts.set(year, (counts.get(year) || 0) + 1);
  const agreed = [...counts.entries()].filter(([, count]) => count >= 2).sort((a, b) => a[0] - b[0])[0];

  let verdict = 'unresolved';
  let resolvedYear = null;
  if (agreed) { verdict = 'majority'; resolvedYear = agreed[0]; }
  else if (discogs.year && card.mbYear == null) { verdict = 'discogs-only'; resolvedYear = discogs.year; }
  else if (votes.length) verdict = 'three-way-split';

  rows.push({
    artist:card.artist, album:card.album, pool:card.pool, priorVerdict:card.verdict,
    mbYear:card.mbYear ?? null, appleYear:card.appleYear ?? null,
    discogsYear:discogs.year ?? null, discogsError:discogs.error || null,
    discogsPressings:discogs.pressings ?? null, discogsQueriedArtist:discogs.queriedArtist || null,
    verdict, resolvedYear
  });
  process.stdout.write(`${String(index + 1).padStart(4)}/${targets.length}  ${verdict.padEnd(16)} MB:${String(card.mbYear ?? '----')} AP:${String(card.appleYear ?? '----')} DC:${String(discogs.year ?? '----')}  ${card.artist} — ${card.album}\n`);
}

const tally = rows.reduce((acc, row) => (acc[row.verdict] = (acc[row.verdict] || 0) + 1, acc), {});
const resolved = rows.filter(row => row.resolvedYear != null);
await writeJsonAtomically(outputReportPath, { generatedAt:new Date().toISOString(), total:rows.length, tally, rows });
if (!sampleSize) {
  const entries = {};
  for (const row of resolved) entries[`${row.artist} ${row.album}`] = row.resolvedYear;
  await writeJsonAtomically(outputPath, { version:1, generatedAt:new Date().toISOString(), entries });
}
console.log(JSON.stringify({
  mode:sampleSize ? 'sample' : 'full',
  total:rows.length, resolved:resolved.length, tally,
  report:path.relative(root, outputReportPath).replace(/\\/g, '/')
}, null, 1));
