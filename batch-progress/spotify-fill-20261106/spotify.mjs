// Spotify 搜尋補連結（可續跑，每日批次）。比對規則與錯案對照見 match.mjs 開頭。
// 用法：node spotify.mjs <每日呼叫上限> [own]
//   own＝用雲端代理注入的 Spotify 憑證（accounts.spotify.com client_credentials；Node fetch 不會被注入，token 走 curl）。
//   與正式站共用同一個 app 配額（店主 11-06：一個帳號只能一組 client id），預設每天 400 次、留六成給正式站；遇 429 立即停。
//
// 防錯（2026-11-07 店主：「搜尋關鍵字寫錯或語言用錯，以前犯過的錯不要再犯」）：
//   1. 查詢字串先清掉《》「」引號等符號；album:"…" 精準查不到才換「藝人＋去版本後綴的專輯名」一般查詢。
//   2. 依卡名語系送 Accept-Language（日文卡 ja、韓文 ko、中文 zh-TW、其餘 en），Spotify 回的名稱才會跟卡池同語言。
//   3. 中英並列的卡名拆語段、CJK 藝人加 data/artist-romanization.json 的羅馬字別名；別名查詢只在原名查無時才用。
//   4. 藝人必須正規化後完全相同（不收子字串，草東案）；專輯名完全相同或只差版本後綴（不收續作、現場、Taylor's Version…）。
//   5. album_type 是 single 不收；compilation 只在卡名本身是精選時收。
//   6. Spotify 年份早於卡片年份 1 年以上不收；自題專輯／藝人名 ≤4 字／專輯名 ≤3 字這類同名高風險卡，年份差 >2 年也不收。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { normalize, titleMatch, nameVariants, langOf, stripEdition } from './match.mjs';
const D = path.dirname(fileURLToPath(import.meta.url)) + '/';
const ROOT = path.resolve(D, '..', '..');
const [budgetArg, mode] = process.argv.slice(2);
const BUDGET = Number.isFinite(+budgetArg) && budgetArg !== undefined ? +budgetArg : 400;
const aliases = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/artist-romanization.json'), 'utf8')).entries || {};

const done = new Map();
if (fs.existsSync(D + 'spotify.jsonl')) for (const l of fs.readFileSync(D + 'spotify.jsonl', 'utf8').split('\n')) if (l.trim()) { const r = JSON.parse(l); done.set(r.key, r); }
const filled = new Set();
for (const f of fs.readdirSync(D)) if (/^applied-.*\.json$/.test(f)) for (const p of JSON.parse(fs.readFileSync(D + f, 'utf8'))) filled.add(p.key);
// 舊規則（11-06 第一版）查過但沒收的，用新規則重查一次（v2）
const todo = JSON.parse(fs.readFileSync(D + 'missing.json', 'utf8')).filter(m => !filled.has(m.key) && (!done.has(m.key) || (!done.get(m.key).url && !done.get(m.key).v2)));
console.log(`todo ${todo.length}, budget ${BUDGET}, mode ${mode || 'worker-app'}`);

let token = '';
function getToken() {
  if (mode === 'own') {
    const out = execFileSync('curl', ['-s', '-X', 'POST', '-H', 'Content-Type: application/x-www-form-urlencoded', '-d', 'grant_type=client_credentials', 'https://accounts.spotify.com/api/token']).toString();
    token = JSON.parse(out).access_token || '';
  } else token = JSON.parse(execFileSync('curl', ['-s', 'https://dip-vinyl-worker.kubinice06.workers.dev/spotify-token']).toString()).access_token || '';
  if (!token) throw new Error('no token');
}
getToken();

const clean = s => String(s || '').replace(/[《》「」『』〈〉"“”]/g, ' ').replace(/\s+/g, ' ').trim();
let used = 0, linked = 0, stop = '', consecutiveErr = 0;
async function search(q, lang) {
  if (used >= BUDGET) { stop = 'budget'; return null; }
  for (let i = 0; i < 2; i++) {
    used++;
    const r = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album&limit=10&market=TW`, { headers: { Authorization: 'Bearer ' + token, 'Accept-Language': lang } });
    if (r.status === 401) { getToken(); continue; }
    if (r.status === 429) { stop = `429 retry-after ${r.headers.get('retry-after')}s`; return null; }
    if (!r.ok) {
      // 出錯也要等，連續出錯就停（11-07 limit=20 被拒時一路空打 201 次、寫了 100 列空結果）
      consecutiveErr++;
      if (consecutiveErr >= 3) stop = `HTTP ${r.status} 連續 3 次：${(await r.text()).slice(0, 80)}`;
      await new Promise(s => setTimeout(s, 1500));
      return { err: r.status, items: [] };
    }
    consecutiveErr = 0;
    await new Promise(s => setTimeout(s, 1500));
    return { items: (await r.json()).albums?.items || [] };
  }
  return { err: 401, items: [] };
}

function judge(m, items, artistSet) {
  const albumNorm = normalize(m.album);
  const isCompCard = /\b(best|greatest|hits|collection|anthology|essential)\b|精選|ベスト/i.test(m.album);
  const risky = artistSet.has(albumNorm) || [...artistSet].every(a => a.length <= 4) || albumNorm.length <= 3;
  const cardYear = +m.year || 0;
  let best = null;
  const rejects = [];
  for (const it of items) {
    const names = (it.artists || []).map(a => a.name);
    const artistOk = names.some(n => artistSet.has(normalize(n))) || artistSet.has(normalize(names.join(' & ')));
    if (!artistOk) continue;
    const how = titleMatch(m.album, it.name);
    if (!how) { rejects.push(`${it.name}`); continue; }
    if (it.album_type === 'single') { rejects.push(`${it.name} [single]`); continue; }
    if (it.album_type === 'compilation' && !isCompCard) { rejects.push(`${it.name} [compilation]`); continue; }
    const y = +(it.release_date || '').slice(0, 4) || 0;
    if (cardYear && y && y < cardYear - 1) { rejects.push(`${it.name} [${y}<${cardYear}]`); continue; }
    if (risky && cardYear && y && Math.abs(y - cardYear) > 2) { rejects.push(`${it.name} [同名高風險 ${y} vs ${cardYear}]`); continue; }
    const cand = { it, how, y };
    if (!best || (how === 'exact' && best.how !== 'exact')) best = cand;
    if (best.how === 'exact') break;
  }
  return { best, rejects };
}

for (const m of todo) {
  if (stop) break;
  const artistSet = nameVariants(m.artist, aliases);
  const lang = langOf(m.artist + m.album);
  const queries = [`album:"${clean(m.album)}" artist:"${clean(m.artist)}"`];
  const raw = String(m.artist);
  const latin = raw.replace(/[^\x00-ɏ]+/g, ' ').trim();
  const alt = aliases[raw] || (latin && latin !== raw ? latin : '');
  if (alt) queries.push(`album:"${clean(m.album)}" artist:"${clean(alt)}"`);
  const plainAlbum = clean(stripEdition(m.album).replace(/\s*[:：].*$/, ''));
  queries.push(`${clean(alt || m.artist)} ${plainAlbum}`);
  let res = null, rejects = [], usedQ = '', hadErr = false;
  for (const q of [...new Set(queries)]) {
    const r = await search(q, lang);
    if (!r) break;
    if (r.err) { hadErr = true; break; }
    const j = judge(m, r.items, artistSet);
    rejects.push(...j.rejects);
    if (j.best) { res = j.best; usedQ = q; break; }
  }
  if (stop && !res) break;
  if (hadErr && !res) continue;   // 查詢出錯不寫結果，下次重查
  const row = { key: m.key, artist: m.artist, album: m.album, year: m.year, v2: true,
    url: res?.it.external_urls?.spotify || '', spName: res?.it.name || '', spArtists: res ? res.it.artists.map(a => a.name).join(', ') : '',
    spYear: res?.y || '', how: res?.how || '', q: usedQ, rejected: [...new Set(rejects)].slice(0, 5) };
  fs.appendFileSync(D + 'spotify.jsonl', JSON.stringify(row) + '\n');
  if (row.url) linked++;
}
console.log(`used ${used}, linked ${linked}, stop ${stop || 'done'}`);
