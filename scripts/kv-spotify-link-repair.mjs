#!/usr/bin/env node
// 修復 Worker KV（COVER_CACHE）裡「有 Cover Art Archive 封面、Spotify 連結卻是空的」的 cover6:* 鍵。
//
// 來由（2026-10-21）：頻率選歌上線前，掃描時每閃過一張就打一次 /spotify-search，幾小時內把 Spotify 配額打爆
//（429 QUOTA_EXCEEDED、retry-after 四個多小時）。429 期間 worker 退到 CAA 仍補得到封面，舊寫法見到封面就永久寫進 KV，
// spotifyUrl 於是永遠是空的——掃出來 12,191 個封面鍵只有 3,252 有連結、8,644 個是 CAA 無 Spotify（U2《Achtung Baby》、
// Billy Joel、Justin Bieber 都灰掉）。worker 端已改成 Spotify 沒走完就只存 6 小時（dip-vinyl-worker），這支腳本補既有的洞。
//
// 做法：只「補連結」，不動封面、不刪鍵。每個候選鍵拿卡池的藝人／專輯名直接問 Spotify 一次（album:"…" artist:"…"），
// **只接受與 worker 同一套「完全吻合」判定**（藝人正規化相同＋專輯名剝掉版本後綴後相同，或藝人名冠在前）；
// 模糊命中一律不收、維持灰色（worker 線上遇到模糊命中會再拿 MusicBrainz 覆核，這裡沒有那層，寧缺勿錯）。
// 查過但沒有完全吻合的鍵寫上 spotifyChecked，下次不再查。
//
// 用法：
//   node scripts/kv-spotify-link-repair.mjs --dry-run                 # 只算候選數、不打 Spotify、不寫 KV
//   node scripts/kv-spotify-link-repair.mjs --limit 2000              # 這一輪最多查 2000 張（預設 2000），1.2 秒一張
//   node scripts/kv-spotify-link-repair.mjs --interval 1500 --all     # --all：不限卡池內的鍵（預設只修 seed_cards 裡的）
// 可重複執行：進度在 batch-progress/spotify-link-repair/state.json，每 50 張存一次；遇到 429 會印出要等多久後退出（exit 2）。
// 需要環境變數 CLOUDFLARE_API_TOKEN（KV 讀寫）；Spotify token 向 worker 的 /spotify-token 取。
import fs from 'node:fs';

const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const args = process.argv.slice(2);
const flag = n => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] != null ? args[i + 1] : d; };
const DRY = flag('--dry-run');
const LIMIT = +opt('--limit', 2000);
const INTERVAL = +opt('--interval', 1200);
const POOL_ONLY = !flag('--all');
const STATE_DIR = 'batch-progress/spotify-link-repair';
const STATE = STATE_DIR + '/state.json';
if (!TOKEN) { console.error('✘ 沒有 CLOUDFLARE_API_TOKEN'); process.exit(1); }

const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase();

// ── 與 worker /spotify-search 同一套比對（複製自 dip-vinyl-worker/src/index.js，改動要兩邊同步）──
const normalize = s => (s || '').toLowerCase().replace(/&/g, ' and ').replace(/\byr\b\.?/g, 'your').replace(/[^a-z0-9　-鿿가-힯]/g, '');
const EDITION = /(remaster|remastered|deluxe|expanded|edition|anniversary|bonus|version|reissue|\bmono\b|\bstereo\b|explicit|special|legacy|collector|digital|redux|\d{4}\s*mix|original\s*recording|soundtrack|original\s*score|motion\s*picture)/i;
const stripEdition = raw => {
  let s = (raw || '').trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/\s*[\(\[]([^()\[\]]*)[\)\]]\s*$/, (m, inner) => EDITION.test(inner) ? '' : m);
    s = s.replace(/\s*[-–—]\s*([^-–—]*)$/, (m, tail) => EDITION.test(tail) ? '' : m);
    if (s === before) break;
  }
  return s.trim() || raw;
};
// 完全吻合：藝人正規化同名，且專輯名相同／剝掉版本後綴相同／Spotify 把藝人名冠在前（"The Beach Boys Today!"）
function exactMatch(artist, album, items) {
  const sa = normalize(artist), sb = normalize(album);
  if (sa.length <= 2 || sb.length <= 1) return null;
  for (const it of items || []) {
    if (!(it.artists || []).some(a => normalize(a.name) === sa)) continue;
    const n = normalize(it.name), ns = normalize(stripEdition(it.name));
    const ok = n === sb || ns === sb || (ns.startsWith(sa) && ns.slice(sa.length) === sb);
    if (ok && it.external_urls?.spotify) return it;
  }
  return null;
}

// ── Spotify token（向 worker 拿，與線上同一個 app；401 時重拿一次）──
let spToken = '';
async function refreshToken() {
  const r = await fetch(WORKER + '/spotify-token', { signal: AbortSignal.timeout(20000) });
  spToken = (await r.json()).access_token || '';
  if (!spToken) throw new Error('worker /spotify-token 沒給 token');
}
// 回 { items } 或 { retryAfter }（429）；其他錯誤丟出
async function spotifySearch(artist, album) {
  for (let attempt = 0; attempt < 2; attempt++) {
    if (!spToken) await refreshToken();
    const q = encodeURIComponent(`album:"${album}" artist:"${artist}"`);
    const r = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=album&limit=5&market=TW`, { headers: { Authorization: 'Bearer ' + spToken }, signal: AbortSignal.timeout(20000) });
    if (r.status === 401) { spToken = ''; continue; }
    if (r.status === 429) return { retryAfter: +(r.headers.get('retry-after') || 60) };
    if (!r.ok) throw new Error(`Spotify HTTP ${r.status}`);
    return { items: (await r.json()).albums?.items || [] };
  }
  throw new Error('Spotify token 連續 401');
}

// ── KV ──
async function listKeys(prefix) {
  const keys = []; let cursor = null;
  do {
    const u = new URL(KV + '/keys'); u.searchParams.set('prefix', prefix); u.searchParams.set('limit', '1000'); if (cursor) u.searchParams.set('cursor', cursor);
    const j = await (await fetch(u, { headers: H, signal: AbortSignal.timeout(30000) })).json();
    if (!j.success) throw new Error('KV list：' + JSON.stringify(j.errors));
    keys.push(...j.result.map(k => k.name)); cursor = j.result_info?.cursor || null;
    process.stderr.write(`  列鍵 ${keys.length}\r`);
  } while (cursor);
  process.stderr.write('\n');
  return keys;
}
async function bulkGet(keys) {
  const out = {};
  for (let i = 0; i < keys.length; i += 100) {
    const chunk = keys.slice(i, i + 100);
    const j = await (await fetch(KV + '/bulk/get', { method: 'POST', headers: H, body: JSON.stringify({ keys: chunk }), signal: AbortSignal.timeout(30000) })).json();
    if (!j.success) throw new Error('KV bulk get：' + JSON.stringify(j.errors));
    const vals = j.result?.values || {};
    for (const k of chunk) { const v = vals[k]; out[k] = v == null ? null : (typeof v === 'string' ? v : JSON.stringify(v)); }
    process.stderr.write(`  讀值 ${Math.min(i + 100, keys.length)}/${keys.length}\r`);
  }
  process.stderr.write('\n');
  return out;
}
// 永久寫（這些鍵本來就是永久的；補上連結後更沒理由過期）
async function bulkPut(pairs) {
  if (!pairs.length) return;
  const r = await fetch(KV + '/bulk', { method: 'PUT', headers: H, body: JSON.stringify(pairs.map(([key, value]) => ({ key, value }))), signal: AbortSignal.timeout(60000) });
  const j = await r.json();
  if (!j.success) throw new Error('KV bulk put：' + JSON.stringify(j.errors));
}

// ── 主流程 ──
fs.mkdirSync(STATE_DIR, { recursive: true });
const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : { runs: [], linked: {}, checkedNoExact: [], errors: {} };
const saveState = () => fs.writeFileSync(STATE, JSON.stringify(state, null, 1));

const seedRows = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const pool = new Set(seedRows.map(r => idOf(r[0], r[1])));
const origName = new Map(seedRows.map(r => [idOf(r[0], r[1]), [r[0], r[1]]]));   // KV 鍵是小寫的，查 Spotify 用卡池原寫法
console.log('列 KV cover6:* 鍵…');
const keys = await listKeys('cover6:');
const vals = await bulkGet(keys);
// 候選：CAA 封面、沒 spotifyUrl、不是覆核換掉的（replacedSpotifyAlbum 是 worker 刻意拿掉連結）、沒查過；
// 或 worker 新版標了 spotifyUnchecked 的（6 小時內自己會過期，順手一起補）
const candidates = [];
let skippedPool = 0;
for (const k of keys) {
  let o; try { o = JSON.parse(vals[k] || '{}'); } catch { continue; }
  if (o.spotifyUrl || o.spotifyChecked || o.replacedSpotifyAlbum) continue;
  if (!(o.coverSource === 'coverartarchive' || o.spotifyUnchecked)) continue;
  if (POOL_ONLY && !pool.has(k.slice('cover6:'.length))) { skippedPool++; continue; }
  candidates.push([k, o]);
}
console.log(`鍵 ${keys.length}，已有 Spotify ${keys.filter(k => { try { return !!JSON.parse(vals[k] || '{}').spotifyUrl; } catch { return false; } }).length}，候選 ${candidates.length}${POOL_ONLY ? `（卡池外略過 ${skippedPool}）` : ''}，已修 ${Object.keys(state.linked).length}，查過無精準命中 ${state.checkedNoExact.length}`);
if (DRY) process.exit(0);

// 先探一下配額
{
  const probe = await spotifySearch('Radiohead', 'OK Computer');
  if (probe.retryAfter) { console.log(`✘ Spotify 仍 429，retry-after ${probe.retryAfter} 秒（約 ${(probe.retryAfter / 3600).toFixed(1)} 小時）；這一輪不跑`); process.exit(2); }
}

const run = { started: new Date().toISOString(), linked: 0, noExact: 0, errors: 0, stoppedBy: '' };
state.runs.push(run);
let pending = [];
const flush = async () => { if (pending.length) { await bulkPut(pending); pending = []; } saveState(); };
let n = 0;
for (const [k, o] of candidates) {
  if (n >= LIMIT) { run.stoppedBy = `limit ${LIMIT}`; break; }
  const id = k.slice('cover6:'.length), bar = id.indexOf('|');
  const [artist, album] = origName.get(id) || [id.slice(0, bar), id.slice(bar + 1)];
  let res;
  try { res = await spotifySearch(artist, album); }
  catch (e) { run.errors++; state.errors[k] = String(e.message || e); n++; await sleep(INTERVAL); continue; }
  if (res.retryAfter) { run.stoppedBy = `429 retry-after ${res.retryAfter}s`; console.log(`\n✘ Spotify 429，retry-after ${res.retryAfter} 秒；先存進度退出`); await flush(); process.exit(2); }
  n++;
  const hit = exactMatch(artist, album, res.items);
  if (hit) {
    const { spotifyUnchecked, ...rest } = o;
    pending.push([k, JSON.stringify({ ...rest, spotifyUrl: hit.external_urls.spotify, spotifyChecked: 'repair-2026-10' })]);
    state.linked[k] = hit.external_urls.spotify; run.linked++;
  } else {
    const { spotifyUnchecked, ...rest } = o;
    pending.push([k, JSON.stringify({ ...rest, spotifyChecked: 'repair-2026-10' })]);
    state.checkedNoExact.push(k); run.noExact++;
  }
  process.stderr.write(`  ${n}/${Math.min(LIMIT, candidates.length)} 補上 ${run.linked}　無精準命中 ${run.noExact}　錯誤 ${run.errors}\r`);
  if (pending.length >= 50) await flush();
  await sleep(INTERVAL);
}
await flush();
run.finished = new Date().toISOString();
saveState();
console.log(`\n✔ 這一輪查 ${n} 張：補上連結 ${run.linked}、查過無精準命中 ${run.noExact}、錯誤 ${run.errors}${run.stoppedBy ? `（停在 ${run.stoppedBy}）` : ''}；剩餘候選 ${candidates.length - n}`);
