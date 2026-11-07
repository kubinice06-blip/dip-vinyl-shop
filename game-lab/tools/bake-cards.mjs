// bake-cards.mjs：把 tools/deck-lists.json 的專輯清單烘成 game-lab/cards.js（SPEC §4.3、§7.2）。
//
//   node game-lab/tools/bake-cards.mjs              # 解析 seed＋Apple 試聽索引＋Firestore 封面，驗證後寫 cards.js
//   node game-lab/tools/bake-cards.mjs --no-verify  # 不逐一驗證封面／試聽網址（只在離線時用）
//   node game-lab/tools/bake-cards.mjs --links-only # v2：只補四平台連結（appleUrl／spotifyUrl／bandcampUrl），其他欄位原封不動
//   node game-lab/tools/bake-cards.mjs --covers-only # v2 fix：只套 LOCAL_COVER_SKIP（本機封面是錯的那幾張改用遠端 coverUrl），不打 Firestore、不重抓連結
//
// v2（SPEC-v2 §4.3）：唱片資訊的平台鈕在烘焙時就把連結烘進 cards.js，執行期不打網路。
//   appleUrl    ← Apple 試聽索引的專輯 id＋slug＋國別（https://music.apple.com/<cc>/album/<slug>/<id>）；沒有就空（畫面上退回搜尋連結）
//   spotifyUrl  ← dip-vinyl-worker /spotify-search，沒有再問 /spotify-album-link（店裡唱片櫃同一套）
//   bandcampUrl ← dip-vinyl-worker /bandcamp-search，而且 bandcamp 子網域要對得上藝人名（搜尋常回別人的翻唱／現場頁，對不上就不烘）
//
// 來源（全部唯讀）：
//   ../seed_cards.json                    三軸星數（seed 原值）、曲風、年份、apex tier
//   ../data/apple-audio-runtime-v1.json   固定試聽 previewUrl（只在烘焙時讀；頁面執行期不載這份 4.3 MB 索引）
//   Firestore card_catalog（公開 REST）     coverUrl（只在烘焙時讀；頁面執行期不碰 Firestore）
//   iTunes lookup                         Firestore 封面在 CAA／archive.org（慢、偶爾 500）、沒封面或打不開時，用 Apple 索引裡的專輯 id 取 300px 封面
//   ../art/covers/<slug>.jpg              本機封面（有就給 localCover）
//   tools/pitches.json                    推薦語 {cardId:{text, tag}}
//
// 規則：王牌改 NEO 星數 7/1/1、1/7/1、1/1/7；非王牌組不得用到 apex 卡；每張卡一定要有能開的封面與試聽，否則失敗（exit 1）。
// 從 $S/design/ref/build-cards.mjs 擴寫。
import fs from 'fs';
import path from 'path';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAB = path.resolve(HERE, '..');
const ROOT = path.resolve(LAB, '..') + '/';
const ARGV = new Set(process.argv.slice(2));
const VERIFY = !ARGV.has('--no-verify');
const LINKS_ONLY = ARGV.has('--links-only');
const COVERS_ONLY = ARGV.has('--covers-only');
const REUSE = LINKS_ONLY || COVERS_ONLY;      // 拿現有的 cards.js 當底
// 本機封面（art/covers）是別的版本、看不出是哪張專輯的：不給 localCover，改用遠端 coverUrl（店主：封面要看得出專輯）
//   art/covers 那張檔案本身也要在主站換掉（不在 game-lab 範圍）
const LOCAL_COVER_SKIP = {
  'john-coltrane-blue-train': '本機圖是 10 CD 合輯的封面，不是 Blue Note 1577（v2 fix O9）'
};
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';

const seed = JSON.parse(fs.readFileSync(ROOT + 'seed_cards.json', 'utf8'));
const apple = JSON.parse(fs.readFileSync(ROOT + 'data/apple-audio-runtime-v1.json', 'utf8')).entries;
const lists = JSON.parse(fs.readFileSync(path.join(HERE, 'deck-lists.json'), 'utf8'));
const pitches = fs.existsSync(path.join(HERE, 'pitches.json')) ? JSON.parse(fs.readFileSync(path.join(HERE, 'pitches.json'), 'utf8')) : {};

// Apple 索引的鍵：與 dip-player 同一套正規化
const norm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯]+/g, '');
const ACE_STATS = { hall: [7, 1, 1], pearl: [1, 7, 1], heresy: [1, 1, 7] };
const TW = /台灣|^(交工|生祥|林生祥|草東|美秀|deca joins|宇宙人|傷心欲絕|老王|濁水溪|陳珊妮|雷光夏|黃小楨|廢五金|林強|陳綺貞|張懸|閃靈|落日飛車|周杰倫|王菲|擊沉女孩|甜約翰|拍謝少年|血肉果汁機|Sorry Youth|DSPS|Elephant Gym|大象體操)/i;
const JP = /[぀-ヿ]|^(Fishmans|Cornelius|Melt-Banana|Keiji Haino|Ruins|Merzbow|Masonna|BOREDOMS|Boris|坂本龍一|細野晴臣|山下達郎|竹内まりや|大貫妙子|椎名林檎|宇多田|Anri|明田川|菊地|富樫|Masahiko|Ryuichi|Haruomi|Yellow Magic|Les Rallizes|灰野|Hiroshi Yoshimura|Midori Takada)/i;
// 卡片 id：拉丁字去重音、保留中日文
const cardId = (a, b) => (a + '-' + b).normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
  .replace(/[^a-z0-9㐀-鿿぀-ヿ]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
// art/covers 的檔名規則（scripts/fetch-shop-covers.py）：小寫、非英數換 -、截 60
const coverSlug = (a, b) => (a + '-' + b).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const catalogId = (a, b) => (a + '|' + b).toLowerCase().replace(/\//g, '-').trim();

const problems = [];
const cards = {};          // id -> card（依 deck-lists.json 第一次出現的順序）
const groupsOf = {};       // id -> [group]
const appleIdOf = {};

for (const [group, arr] of Object.entries(lists)) for (const s of arr) {
  const [a, b] = s.split('|');
  const r = seed.find(r => r[0] === a && r[1] === b) || seed.find(r => norm(r[0]) === norm(a) && norm(r[1]) === norm(b));
  if (!r) { problems.push('MISSING-IN-SEED ' + s + ' [' + group + ']'); continue; }
  const [artist, album, c, o, h, genres, year, , tier] = r;
  const aceTier = group.startsWith('ace_') ? group.slice(4) : null;
  if (tier && !aceTier) problems.push('APEX-AS-NORMAL ' + s + ' (' + tier + ') [' + group + ']');
  if (aceTier && tier !== aceTier) problems.push('ACE-TIER-MISMATCH ' + s + ' seed=' + tier + ' group=' + aceTier);
  const id = cardId(artist, album);
  (groupsOf[id] = groupsOf[id] || []).includes(group) || groupsOf[id].push(group);
  if (cards[id]) continue;
  const st = aceTier ? ACE_STATS[aceTier] : [c, o, h];
  const ap = apple[norm(artist) + '\u0000' + norm(album)] || [];
  const previewUrl = ap[2] || '';
  if (ap[1]) appleIdOf[id] = { id: ap[1], cc: ap[0] };
  if (!previewUrl) problems.push('NO-PREVIEW ' + s + ' [' + group + ']');
  const region = TW.test(artist) ? 'tw' : JP.test(artist) ? 'jp' : 'xx';
  const tags = (genres || []).map(g => 'g:' + g)
    .concat(year < 1980 ? ['y:<1980'] : year >= 2000 ? ['y:>=2000'] : [])
    .concat(region !== 'xx' ? ['r:' + region] : []);
  cards[id] = { id, artist, album, year, genres: genres || [], region, c: st[0], o: st[1], h: st[2], tier: aceTier,
    coverUrl: null, localCover: null, previewUrl, tags, pitch: null };
}
// 金邊池（店主私藏）：gold 標記
for (const id of Object.keys(cards)) if (groupsOf[id].includes('gold')) cards[id].gold = true;

// 推薦語
for (const [id, p] of Object.entries(pitches)) {
  if (id.startsWith('_')) continue;
  if (!cards[id]) { problems.push('PITCH-FOR-UNKNOWN-CARD ' + id); continue; }
  cards[id].pitch = p.text;
}
const needPitch = ['ace_hall', 'ace_pearl', 'ace_heresy', 'gift_hall', 'gift_pearl', 'gift_heresy', 'junk', 'gold'];
for (const id of Object.keys(cards)) if (groupsOf[id].some(g => needPitch.includes(g)) && !cards[id].pitch) problems.push('NO-PITCH ' + id);

// ---- 封面 ----
const rewrite = u => {
  if (!u) return '';
  u = String(u).trim();
  if (/coverartarchive\.org/.test(u)) {
    if (/\/front$/.test(u)) return u + '-250';
    if (/\/front-\d+(\.jpg)?$/.test(u)) return u.replace(/\/front-\d+(\.jpg)?$/, '/front-250');
    if (/\/(\d+)(-\d+)?\.jpg$/.test(u)) return u.replace(/\/(\d+)(-\d+)?\.jpg$/, '/$1-250.jpg');
    return u;
  }
  if (/i\.scdn\.co\/image\/ab67616d0000b273/.test(u)) return u.replace('ab67616d0000b273', 'ab67616d00001e02');
  if (/mzstatic\.com/.test(u)) return u.replace(/\/\d+x\d+(bb|cc|-\d+)?\.(jpg|png|webp)$/, '/300x300bb.$2');
  return u;
};

async function batchGetCovers(ids) {
  const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
  const name = id => 'projects/price-manager-e8846/databases/(default)/documents/card_catalog/' + catalogId(cards[id].artist, cards[id].album);
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const r = await fetch(FS + ':batchGet', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documents: chunk.map(name), mask: { fieldPaths: ['coverUrl'] } }) });
    if (!r.ok) throw new Error('batchGet HTTP ' + r.status);
    const byName = {};
    for (const x of await r.json()) if (x.found) byName[x.found.name] = (x.found.fields && x.found.fields.coverUrl && x.found.fields.coverUrl.stringValue) || '';
    for (const id of chunk) {
      // Firestore 回傳的 name 不一定跟送出的字串同樣編碼，兩種都比
      const n = name(id);
      out[id] = byName[n] != null ? byName[n] : (Object.entries(byName).find(([k]) => decodeURIComponent(k) === n) || [])[1] || '';
    }
  }
  return out;
}

async function itunesCover(id) {
  const a = appleIdOf[id]; if (!a) return '';
  try {
    const r = await fetch('https://itunes.apple.com/lookup?id=' + a.id + '&country=' + (a.cc || 'US').toLowerCase());
    if (!r.ok) return '';
    const j = await r.json(); const x = (j.results || [])[0];
    return x && x.artworkUrl100 ? x.artworkUrl100.replace(/\/\d+x\d+bb\.(jpg|png)$/, '/300x300bb.$1') : '';
  } catch (e) { return ''; }
}

async function probe(url, kind) {
  // kind: 'image' | 'audio'
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 25000);
  try {
    const r = await fetch(url, { redirect: 'follow', signal: ctl.signal, headers: kind === 'audio' ? { Range: 'bytes=0-2047' } : {} });
    const ct = r.headers.get('content-type') || '';
    try { await r.body.cancel(); } catch (e) {}
    const okType = kind === 'image' ? /^image\//.test(ct) : /^(audio\/|video\/mp4|application\/octet-stream)/.test(ct);
    return { ok: (r.status === 200 || r.status === 206) && okType, status: r.status, ct };
  } catch (e) { return { ok: false, status: 0, ct: String(e.name || e) }; }
  finally { clearTimeout(t); }
}
async function pool(items, n, fn) {
  const out = new Array(items.length); let k = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (k < items.length) { const i = k++; out[i] = await fn(items[i], i); } }));
  return out;
}

if (REUSE) {
  // 只補連結／只修本機封面：拿現有的 cards.js（封面、試聽、推薦語都不動）
  const { createRequire } = await import('module');
  const existing = createRequire(import.meta.url)(path.join(LAB, 'cards.js'));
  for (const k of Object.keys(cards)) delete cards[k];
  for (const [k, v] of Object.entries(existing)) cards[k] = Object.assign({}, v);
  problems.length = 0;
}
const ids = Object.keys(cards);
const fsCovers = REUSE ? {} : await batchGetCovers(ids);
if (!REUSE) for (const id of ids) {
  const c = cards[id];
  c.coverUrl = rewrite(fsCovers[id]) || null;
  const f = coverSlug(c.artist, c.album) + '.jpg';
  if (fs.existsSync(ROOT + 'art/covers/' + f) && !LOCAL_COVER_SKIP[id]) c.localCover = '../art/covers/' + f;
}
for (const id of Object.keys(LOCAL_COVER_SKIP)) {
  if (!cards[id]) continue;
  cards[id].localCover = null;
  if (!cards[id].coverUrl) problems.push('LOCAL-COVER-SKIPPED-BUT-NO-REMOTE ' + id);
}

const report = { coversOk: 0, coverFallback: [], coverFail: [], previewOk: 0, previewFail: [], caaSwapped: [] };
if (LINKS_ONLY) {
  // 跳過封面／試聽驗證
} else if (COVERS_ONLY) {
  // 只驗改用遠端的那幾張
  if (VERIFY) for (const id of Object.keys(LOCAL_COVER_SKIP)) if (cards[id] && cards[id].coverUrl) {
    const res = await probe(cards[id].coverUrl, 'image');
    if (res.ok) report.coversOk++; else report.coverFail.push(id + ' ' + cards[id].coverUrl + ' → ' + res.status + ' ' + (res.ct || ''));
  }
} else if (VERIFY) {
  await pool(ids, 6, async id => {
    const c = cards[id];
    // CAA／archive.org 封面要先轉址兩次、2–3 秒、偶爾回 500 或斷線；Apple 有同一張專輯的 300px 封面就改用它（快、穩）
    if (c.coverUrl && /coverartarchive\.org|archive\.org/.test(c.coverUrl)) {
      const alt = await itunesCover(id);
      const r0 = alt ? await probe(alt, 'image') : { ok: false };
      if (r0.ok) { report.caaSwapped.push(id); c.coverUrl = alt; }
    }
    let res = c.coverUrl ? await probe(c.coverUrl, 'image') : { ok: false, status: 'none' };
    if (!res.ok) {
      const alt = await itunesCover(id);
      const r2 = alt ? await probe(alt, 'image') : { ok: false };
      if (r2.ok) { report.coverFallback.push(id + ' (' + (c.coverUrl || 'no coverUrl') + ' ' + res.status + ' → iTunes)'); c.coverUrl = alt; res = r2; }
    }
    if (res.ok) report.coversOk++;
    else if (c.localCover) { report.coverFallback.push(id + ' (remote failed, localCover only)'); c.coverUrl = null; report.coversOk++; }
    else report.coverFail.push(id + ' ' + (c.coverUrl || '(no coverUrl)') + ' → ' + res.status + ' ' + (res.ct || ''));
    if (c.previewUrl) {
      const p = await probe(c.previewUrl, 'audio');
      if (p.ok) report.previewOk++; else report.previewFail.push(id + ' → ' + p.status + ' ' + p.ct);
    }
  });
} else {
  for (const id of ids) if (!cards[id].coverUrl && !cards[id].localCover) report.coverFail.push(id + ' (no coverUrl)');
}
for (const x of report.coverFail) problems.push('NO-WORKING-COVER ' + x);
for (const x of report.previewFail) problems.push('PREVIEW-UNREACHABLE ' + x);

// ---- 四平台連結（v2）----
async function getJson(url, ms) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms || 15000);
  try { const r = await fetch(url, { signal: ctl.signal }); return r.ok ? await r.json() : {}; } catch (e) { return {}; } finally { clearTimeout(t); }
}
const loose = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '').replace(/^the\s+/, '').replace(/[^a-z0-9]+/g, '');
// 子網域對得上藝人、專輯 slug 去掉「再版／豪華版／年份」之後要等於專輯名（例：the-ascension-the-sequel ≠ The Ascension）
const BC_EXTRA = /^(?:\d+|th|st|nd|rd|remastered|remaster|deluxe|edition|anniversary|reissue|expanded|version|contemporaryrecords|records)*$/;
function bandcampMatches(url, artist, album) {
  const m = /^https?:\/\/([a-z0-9-]+)\.bandcamp\.com\/album\/([a-z0-9-]+)/i.exec(String(url || '')); if (!m) return false;
  const sub = m[1].toLowerCase().replace(/-/g, ''), a = loose(artist);
  if (!a) return false;
  const artistOk = a.length < 4 ? sub === a : (sub.includes(a) || a.includes(sub) || (a.length >= 6 && sub.includes(a.slice(0, 6))));
  if (!artistOk) return false;
  const slug = m[2].toLowerCase().replace(/-/g, ''), al = loose(album);
  if (!al || slug.indexOf(al) < 0) return false;
  return BC_EXTRA.test(slug.replace(al, '').replace(/^the/, ''));
}
async function bakeLinks(cards, ids) {
  const stat = { apple: 0, spotify: 0, bandcamp: 0 };
  for (const id of ids) {
    const c = cards[id];
    const ap = apple[norm(c.artist) + '\u0000' + norm(c.album)] || [];
    c.appleUrl = (ap[0] && ap[1]) ? 'https://music.apple.com/' + String(ap[0]).toLowerCase() + '/album/' + encodeURIComponent(ap[3] || 'album') + '/' + ap[1] : '';
    if (c.appleUrl) stat.apple++;
  }
  await pool(ids, 4, async id => {
    const c = cards[id];
    const q = 'artist=' + encodeURIComponent(c.artist) + '&album=' + encodeURIComponent(c.album);
    let sp = (await getJson(WORKER + '/spotify-search?' + q)).spotifyUrl || '';
    if (!sp) sp = (await getJson(WORKER + '/spotify-album-link?' + q)).url || '';
    c.spotifyUrl = /^https:\/\/open\.spotify\.com\/album\//.test(sp) ? sp : '';
    const bc = (await getJson(WORKER + '/bandcamp-search?' + q, 25000)).bandcampUrl || '';
    c.bandcampUrl = bandcampMatches(bc, c.artist, c.album) ? bc : '';
    if (c.spotifyUrl) stat.spotify++; if (c.bandcampUrl) stat.bandcamp++;
  });
  console.log('links: apple', stat.apple + '/' + ids.length, ' spotify', stat.spotify, ' bandcamp', stat.bandcamp);
}
if (!COVERS_ONLY) await bakeLinks(cards, ids);

// ---- 寫檔 ----
const FIELDS = ['id', 'artist', 'album', 'year', 'genres', 'region', 'c', 'o', 'h', 'tier', 'coverUrl', 'localCover', 'previewUrl', 'tags', 'pitch', 'gold', 'appleUrl', 'spotifyUrl', 'bandcampUrl'];
const OPTIONAL = new Set(['gold', 'appleUrl', 'spotifyUrl', 'bandcampUrl']);
const lines = ids.map(id => {
  const c = cards[id]; const o = {};
  for (const k of FIELDS) if (!OPTIONAL.has(k) || c[k]) o[k] = c[k];
  return '    ' + JSON.stringify(id) + ': ' + JSON.stringify(o);
});
const groupsSummary = Object.entries(lists).map(([g, arr]) => g + ' ' + arr.length).join('、');
const js = `/* cards.js：由 tools/bake-cards.mjs 產生，請勿手改（改 tools/deck-lists.json 或 tools/pitches.json 後重跑）。
 *   node game-lab/tools/bake-cards.mjs
 * ${ids.length} 張；三軸＝seed 原值（王牌改 7/1/1 系列）；封面＝Firestore card_catalog 預烘（CAA front-250／scdn 300px／mzstatic 300x300bb），
 * 本機有的另給 localCover；previewUrl＝Apple 固定試聽；appleUrl／spotifyUrl／bandcampUrl＝唱片資訊的平台鈕（有就烘）。分組：${groupsSummary}
 */
(function (root, factory) {
  var cards = factory();
  if (typeof module === 'object' && module.exports) module.exports = cards;
  else root.DipLabCards = cards;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  return {
${lines.join(',\n')}
  };
});
`;
if (problems.length) {
  console.log('PROBLEMS (' + problems.length + '):'); problems.forEach(p => console.log('  ' + p));
  console.log('cards.js NOT written.'); process.exitCode = 1;
} else {
  fs.writeFileSync(path.join(LAB, 'cards.js'), js);
  console.log('wrote cards.js:', ids.length, 'cards');
}
console.log('covers verified:', VERIFY ? report.coversOk + '/' + ids.length : 'skipped', ' previews verified:', VERIFY ? report.previewOk : 'skipped');
console.log('local covers:', ids.filter(id => cards[id].localCover).length, ' gold:', ids.filter(id => cards[id].gold).length);
if (report.caaSwapped.length) console.log('CAA/archive.org → Apple 300px:', report.caaSwapped.length, 'cards');
if (report.coverFallback.length) { console.log('cover fallbacks:'); report.coverFallback.forEach(x => console.log('  ' + x)); }
