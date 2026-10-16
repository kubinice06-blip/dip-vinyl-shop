#!/usr/bin/env node
// 2026-10-16 卡池資料修正（店主：「順便修掉」）——情緒三軸一萬張評分時代理回報的卡池問題，主線逐筆查證後定案。
// 定案理由見同目錄 README.md。
//
// 用法：node audits/pool-fix-20261016/apply.mjs            乾跑（只讀 KV，不寫任何東西）
//       node audits/pool-fix-20261016/apply.mjs --write    只改本機檔：seed（刪重複、曲風、年份、合併評分）、
//                                                          子曲風快取；並把線上要做的寫成 *-pending.json
//       node audits/pool-fix-20261016/apply.mjs --live     寫 KV（pending 的 puts），再套用 In Orbit 改名
//                                                          （seed＋試聽狀態檔＋試聽對照表）。改名必須在 KV 搬完之後，
//                                                          否則那張卡會讀不到簡介與封面。舊鍵不刪，見 kv-deletes-pending.json。
//       node audits/pool-fix-20261016/apply.mjs --verify   回讀 KV 與 seed，逐項比對
//
// 2026-10-16 雲端只跑了 --write：KV 寫入與刪除都被雲端的權限擋下，--live 留給店主決定。
//
// 動到的地方：
//   seed_cards.json        刪 5 列重複卡、改 16 列曲風、2 列年份、1 列掛名、1 列合併評分
//   KV（--live）           重複卡：被刪那張有、留下那張沒有的值併過去；改名：所有前綴複製到新鍵；
//                          曲風：mapgenre3 換成這張碟自己的標籤（原標籤是同名他人的）；舊鍵只列待刪清單
//   card-preview-status.js、data/apple-audio-map-v1.json   改名那張換鍵
//   card_catalog（Firestore）不在這支：改名交給 scripts/migrate-card-catalog-ids.mjs、合併評分見 catalog-patch.json
import fs from 'node:fs';

const WRITE = process.argv.includes('--write'), LIVE = process.argv.includes('--live'), VERIFY = process.argv.includes('--verify');
const DIR = 'audits/pool-fix-20261016';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const H = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' };
const kvKey = (a, b) => `${a}|${b}`.toLowerCase();
const cardId = (a, b) => `${a}|${b}`.toLowerCase().replace(/\//g, '-').trim();
const audioNorm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-Ͽἀ-῿Ѐ-ԯ԰-֏֐-׿؀-ۿݐ-ݿऀ-ॿঀ-৿฀-๿຀-໿က-႟Ⴀ-ჿሀ-፿ក-៿]+/g, '');
const audioKey = (a, b) => `${audioNorm(a)}\u0000${audioNorm(b)}`;
const PRE = ['desc', 'desc1', 'desc2', 'desc3', 'desc4', 'rating', 'rating1', 'rating2', 'rating3', 'rating4',
  'mapgenre1', 'mapgenre2', 'mapgenre3', 'cover', 'cover2', 'cover3', 'cover4', 'cover5', 'cover6', 'bc1', 'bc2'];

// ── 定案 ─────────────────────────────────────────────────────────
// 重複卡：[刪, 留]。留下的一律是掛名合規範、資料較全的那張。
const DUPES = [
  [['Happy End', 'Kazemachi Roman'], ['はっぴいえんど', '風街ろまん']],
  [['Happy End', 'Happy End'], ['はっぴいえんど', 'HAPPY END']],
  [['Nick Cave and the Bad Seeds', 'Let Love In'], ['Nick Cave & the Bad Seeds', 'Let Love In']],
  [['Nick Cave and the Bad Seeds', 'Murder Ballads'], ['Nick Cave & the Bad Seeds', 'Murder Ballads']],
  [['Big Brother and the Holding Company', 'Cheap Thrills'], ['Big Brother & The Holding Company', 'Cheap Thrills']],
];
// 留下的 Cheap Thrills：掛名改 MB 寫法（小寫 the，與同團首張一致；轉小寫後鍵不變），
// 三軸取被刪那張的 5/1/3（經典 3 對一張八週榜首、葛萊美名人堂的唱片明顯低估）。
const BB = { from: ['Big Brother & The Holding Company', 'Cheap Thrills'], artist: 'Big Brother & the Holding Company', ratings: [5, 1, 3] };

// 曲風：[藝人, 專輯, 池中曲風, mapgenre3 大類, 原始標籤]
const CICADA = ['散落的時光', '一起走吧', '邊境消逝', '仰望海平面', '不在的你們都去了哪裡', 'Farewell', '走入有霧的森林', '回返', '棲居在溪源之上', '凝視白色的邊界'];
const CICADA_TAGS = ['neoclassical', 'modern classical', 'post-rock', 'chamber music', 'ambient', 'taiwanese'];
const GENRES = [
  ...CICADA.map(al => ['Cicada', al, ['classical', 'electronic'], ['classical', 'electronic'], CICADA_TAGS]),
  ['The Ronettes', 'Presenting the Fabulous Ronettes', ['pop', 'soul'], ['pop', 'soul'], ['girl group', 'wall of sound', '60s', 'doo-wop', 'pop', 'soul', 'female vocalists']],
  ['Frost', 'Hispanic Causing Panic', ['hiphop'], ['hiphop'], ['west coast rap', 'chicano rap', 'latin rap', 'hip hop', 'gangsta rap']],
  ['Barbara', "L'Aigle noir", ['folk'], ['folk'], ['chanson', 'chanson francaise', 'singer-songwriter', 'french', 'female vocalists']],
  ['Pylon', 'Chomp', null, ['rock'], ['post-punk', 'new wave', 'jangle pop', 'athens', 'alternative rock', 'indie', '80s']],
  ['Ruth Brown', 'Blues on Broadway', ['jazz', 'blues'], ['jazz', 'blues'], ['vocal jazz', 'blues', 'rhythm and blues', 'jazz', 'female vocalists']],
  ['Ruth Brown', 'Miss Rhythm (Greatest Hits and More)', ['soul', 'blues'], ['soul', 'blues'], ['rhythm and blues', 'jump blues', 'r&b', 'blues', '50s', 'female vocalists']],
];
const YEARS = [['Justice', 'Cross', 1992, 2007], ['Peter Gabriel', 'Peter Gabriel (Melt)', 2009, 1980]];
// 改名：MB 與 Riverside 原盤封面的掛名是「Clark Terry with Thelonious Monk」
const RENAME = { oldA: 'Thelonious Monk', newA: 'Clark Terry with Thelonious Monk', album: 'In Orbit',
  mapgenre3: { genres: ['jazz'], rawGenres: ['hard bop', 'bebop', 'flugelhorn', 'post-bop', 'jazz'] } };

// ── 讀檔 ─────────────────────────────────────────────────────────
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) { console.error('✗ seed_cards.json 排版自檢失敗，中止'); process.exit(1); }
const find = (a, b) => { const h = seed.filter(r => r[0] === a && r[1] === b); if (h.length !== 1) { console.error(`✗ ${a}《${b}》命中 ${h.length} 列`); process.exit(1); } return h[0]; };

async function kvGet(keys) {
  const out = {};
  for (let i = 0; i < keys.length; i += 90) {
    const j = await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: H, body: JSON.stringify({ keys: keys.slice(i, i + 90) }) })).json();
    if (!j.success) throw new Error('KV 讀取失敗 ' + JSON.stringify(j.errors).slice(0, 200));
    for (const [k, v] of Object.entries(j.result.values)) if (v != null) out[k] = typeof v === 'string' ? v : JSON.stringify(v);
  }
  return out;
}

// ── 期望的 KV 終態 ───────────────────────────────────────────────
const probe = new Set();
for (const [d, k] of DUPES) for (const p of PRE) { probe.add(`${p}:${kvKey(...d)}`); probe.add(`${p}:${kvKey(...k)}`); }
for (const p of PRE) { probe.add(`${p}:${kvKey(RENAME.oldA, RENAME.album)}`); probe.add(`${p}:${kvKey(RENAME.newA, RENAME.album)}`); }
for (const g of GENRES) probe.add(`mapgenre3:${kvKey(g[0], g[1])}`);
const kv = await kvGet([...probe]);

const puts = new Map(), dels = new Set(), notes = [];
for (const [d, k] of DUPES) {
  for (const p of PRE) {
    const o = `${p}:${kvKey(...d)}`, n = `${p}:${kvKey(...k)}`;
    if (kv[o] == null) continue;
    const empty = v => v == null || v === '{}' || v === 'null';
    if (empty(kv[n]) && !empty(kv[o])) { puts.set(n, kv[o]); notes.push(`併入 ${n}`); }
    dels.add(o);
  }
}
for (const p of PRE) {
  const o = `${p}:${kvKey(RENAME.oldA, RENAME.album)}`, n = `${p}:${kvKey(RENAME.newA, RENAME.album)}`;
  if (p === 'mapgenre3') { puts.set(n, JSON.stringify(RENAME.mapgenre3)); if (kv[o] != null) dels.add(o); continue; }
  if (kv[o] == null) continue;
  if (kv[n] != null && kv[n] !== kv[o]) { console.error(`✗ ${n} 已有不同的值，中止`); process.exit(1); }
  puts.set(n, kv[o]); dels.add(o);
}
for (const g of GENRES) puts.set(`mapgenre3:${kvKey(g[0], g[1])}`, JSON.stringify({ genres: g[3], rawGenres: g[4] }));

if (VERIFY) {
  const now = await kvGet([...puts.keys(), ...dels]);
  const bad = [...puts].filter(([k, v]) => now[k] !== v).map(([k]) => '值不符 ' + k)
    .concat(process.argv.includes('--deleted') ? [...dels].filter(k => now[k] != null).map(k => '未刪 ' + k) : []);
  const s = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
  const has = (a, b) => s.some(r => r[0] === a && r[1] === b);
  for (const [d] of DUPES) if (has(...d)) bad.push('seed 仍有 ' + d.join('|'));
  if (!has(RENAME.newA, RENAME.album) || has(RENAME.oldA, RENAME.album)) bad.push('seed 改名未生效');
  console.log(`KV 寫 ${puts.size}／刪 ${dels.size}、seed 檢查：${bad.length ? '✗ ' + bad.length + ' 項不符' : '全部相符'}`);
  bad.forEach(b => console.log('  ✗ ' + b));
  process.exit(bad.length ? 1 : 0);
}

// ── seed 變更（不含改名）──────────────────────────────────────────
const log = [];
const drop = new Set(DUPES.map(([d]) => find(...d)));
for (const [d, k] of DUPES) { find(...k); log.push(`刪 ${d.join('《')}》（留 ${k.join('《')}》）`); }
const bb = find(...BB.from);
if (bb[0] !== BB.artist) log.push(`Cheap Thrills 掛名 ${bb[0]} → ${BB.artist}；三軸 ${bb.slice(2, 5)} → ${BB.ratings}`);
for (const [a, b, g] of GENRES) { if (!g) continue; const r = find(a, b); if (JSON.stringify(r[5]) !== JSON.stringify(g)) log.push(`曲風 ${a}《${b}》 ${JSON.stringify(r[5])} → ${JSON.stringify(g)}`); }
for (const [a, b, from, to] of YEARS) { const r = find(a, b); if (r[6] !== from && r[6] !== to) { console.error(`✗ ${a}《${b}》年份現值 ${r[6]}`); process.exit(1); } if (r[6] === from) log.push(`年份 ${a}《${b}》 ${from} → ${to}`); }
log.forEach(l => console.log(l));
console.log(`改名 ${RENAME.oldA}《${RENAME.album}》 → ${RENAME.newA}：--live 時套用`);
console.log(`\nKV（--live）：寫 ${puts.size} 鍵；舊鍵 ${dels.size} 個列入待刪`); notes.forEach(n => console.log('   ' + n));

// Firestore：留下的 Cheap Thrills 帶上被刪那張的上架欄位（push-card-catalog-patches.mjs 格式）；改名交給 migrate-card-catalog-ids.mjs
const iv = n => ({ integerValue: String(n) }), sv = v => ({ stringValue: v });
const catalogPatches = [{ docId: cardId(...BB.from), updateMask: ['artist', 'classic', 'obscurity', 'accessibility', 'rarity', 'rgMbid'],
  body: { fields: { artist: sv(BB.artist), classic: iv(5), obscurity: iv(1), accessibility: iv(3), rarity: sv('epic'), rgMbid: sv('02de8887-e93b-3ea6-8b6d-de072a159bba') } } }];
const renameMap = [{ oldArtist: RENAME.oldA, newArtist: RENAME.newA, album: RENAME.album }];

if (LIVE) {
  // KV：只寫不刪
  const P = [...puts].map(([key, value]) => ({ key, value }));
  for (let i = 0; i < P.length; i += 100) {
    const j = await (await fetch(`${BASE}/bulk`, { method: 'PUT', headers: H, body: JSON.stringify(P.slice(i, i + 100)) })).json();
    if (!j.success) { console.error('✗ KV 寫入失敗', JSON.stringify(j.errors)); process.exit(1); }
  }
  const back = await kvGet(P.map(p => p.key));
  const miss = P.filter(p => back[p.key] !== p.value);
  if (miss.length) { console.error(`✗ KV 回讀 ${miss.length} 鍵不符，不套用改名`); process.exit(1); }
  console.log(`✓ KV 寫 ${P.length} 鍵，回讀一致`);
  // 改名：seed、試聽狀態檔、試聽對照表
  const rn = seed.find(r => r[0] === RENAME.oldA && r[1] === RENAME.album);
  if (rn) {
    if (seed.some(r => r[0] === RENAME.newA && r[1] === RENAME.album)) { console.error('✗ 改名目標已存在'); process.exit(1); }
    rn[0] = RENAME.newA; fs.writeFileSync('seed_cards.json', render(seed));
    const PVS = 'card-preview-status.js', AUD = 'data/apple-audio-map-v1.json';
    let pvs = fs.readFileSync(PVS, 'utf8');
    const oP = JSON.stringify(cardId(RENAME.oldA, RENAME.album)) + ':', nP = JSON.stringify(cardId(RENAME.newA, RENAME.album)) + ':';
    if (pvs.split(oP).length === 2) { pvs = pvs.replace(oP, () => nP); fs.writeFileSync(PVS, pvs); console.log('card-preview-status 換鍵 1'); }
    const audRaw = fs.readFileSync(AUD, 'utf8'), aud = JSON.parse(audRaw);
    const ind = /^\{\r?\n( +)"/.exec(audRaw)?.[1]?.length ?? 0;
    const renderAud = o => { const s = JSON.stringify(o, null, ind || undefined) + (/\n$/.test(audRaw) ? '\n' : ''); return /\r\n/.test(audRaw) ? s.replace(/\n/g, '\r\n') : s; };
    const oK = audioKey(RENAME.oldA, RENAME.album), nK = audioKey(RENAME.newA, RENAME.album);
    if (renderAud(aud) !== audRaw) console.error('⚠ apple-audio-map 排版自檢失敗，此檔未改');
    else if (aud.entries[oK] && !aud.entries[nK]) {
      aud.entries = Object.fromEntries(Object.entries(aud.entries).map(([k, v]) => k === oK ? [nK, { ...v, artist: RENAME.newA }] : [k, v]));
      fs.writeFileSync(AUD, renderAud(aud)); console.log('apple-audio-map 換鍵 1');
    }
    console.log(`✓ 改名套用。接著：node scripts/migrate-card-catalog-ids.mjs --map ${DIR}/catalog-rename-map.json --write`);
    console.log(`        node scripts/push-card-catalog-patches.mjs ${DIR}/catalog-patches-pending.json`);
    console.log('        node scripts/build-genre-tree.mjs --pull --write');
  }
  process.exit(0);
}

if (!WRITE) { console.log('\n乾跑結束。--write 只改本機檔；--live 寫 KV 並套用改名。'); process.exit(0); }

// ── --write：備份＋本機檔＋待套用清單 ─────────────────────────────
fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(`${DIR}/kv-backup.json`, JSON.stringify(Object.fromEntries([...new Set([...puts.keys(), ...dels])].map(k => [k, kv[k] ?? null])), null, 1));
fs.writeFileSync(`${DIR}/seed-rows-before.json`, JSON.stringify([...drop, bb, ...GENRES.map(g => find(g[0], g[1])), ...YEARS.map(y => find(y[0], y[1]))]));
fs.writeFileSync(`${DIR}/kv-puts-pending.json`, JSON.stringify([...puts].map(([key, value]) => ({ key, value })), null, 1));
fs.writeFileSync(`${DIR}/kv-deletes-pending.json`, JSON.stringify([...dels], null, 1));
fs.writeFileSync(`${DIR}/catalog-patches-pending.json`, JSON.stringify(catalogPatches, null, 1));
fs.writeFileSync(`${DIR}/catalog-rename-map.json`, JSON.stringify(renameMap, null, 1));

bb[0] = BB.artist; [bb[2], bb[3], bb[4]] = BB.ratings;
for (const [a, b, g] of GENRES) if (g) find(a, b)[5] = g;
for (const [a, b, , to] of YEARS) find(a, b)[6] = to;
const kept = seed.filter(r => !drop.has(r));
fs.writeFileSync('seed_cards.json', render(kept));

// 子曲風快取：先把要寫進 KV 的 mapgenre3 寫進本機快取，build-genre-tree 不加 --pull 就能重建出正確的子曲風表。
// （改名那張不放：它的新鍵要等 --live。之後有人 --pull 時，KV 若還沒寫，錯的標籤會回來——所以 --live 仍要跑。）
const CACHE = 'data/rawgenres-cache.json', cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
const renamedNew = kvKey(RENAME.newA, RENAME.album);
let nc = 0;
for (const [k, v] of puts) if (k.startsWith('mapgenre3:') && !k.endsWith(renamedNew)) { cache[k.slice(10)] = JSON.parse(v); nc++; }
for (const [d] of DUPES) delete cache[kvKey(...d)];
fs.writeFileSync(CACHE, JSON.stringify(cache), 'utf8');
console.log(`✓ seed ${seed.length} → ${kept.length} 列；子曲風快取改 ${nc} 筆；待套用清單寫在 ${DIR}/。接著：node scripts/build-genre-tree.mjs --write`);
