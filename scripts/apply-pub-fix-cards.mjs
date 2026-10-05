#!/usr/bin/env node
// 套用 audits/pub-fix/card-fixes.json 的卡片修正（雲端 2026-09-30 定案）：年份 11 張＋拆卡 16 張，
// 另含 Lou Rawls《Lou Rawls Live!》改綁 1966 Capitol 版的年份（封面另案處理）。
//
// 用法：node scripts/apply-pub-fix-cards.mjs            乾跑
//       node scripts/apply-pub-fix-cards.mjs --write    改本機檔案，並寫出 KV／Firestore 的工作檔
//
// ⚠ 改藝人欄會連動六處，缺一就會出現孤兒或前台讀不到（2026-08-11 掛名更動、09-10 簡轉繁的教訓）：
//   1. seed_cards.json 的 artist 欄
//   2. KV 所有前綴（key = `<前綴>:<artist>|<album>` 全小寫、**斜線不動**）
//   3. Firestore card_catalog 的文件 id（= 同字串但 `/` 換成 `-`）→ 交給 migrate-card-catalog-ids.mjs
//   4. card-preview-status.js（鍵＝card id）
//   5. data/apple-audio-map-v1.json（鍵＝NFKD 正規化的 artist\0album）→ 之後重建 runtime 檔
//   6. card-subgenres.json（鍵＝原字 `Artist|Album`）
// 這支只動 1、4、5、6，並把 2、3 的工作檔寫到 publish-stage/pub-fix-<日期>/。
import fs from 'node:fs';

const WRITE = process.argv.includes('--write');
const STAMP = '20261004', OUT = `publish-stage/pub-fix-${STAMP}`;
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;

const kvBase = (a, b) => `${a}|${b}`.toLowerCase();
const cardId = (a, b) => `${a}|${b}`.toLowerCase().replace(/\//g, '-').trim();
// 與 scripts/build-apple-audio-map.mjs 的 normalized() 同一把尺
const audioNorm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-Ͽἀ-῿Ѐ-ԯ԰-֏֐-׿؀-ۿݐ-ݿऀ-ॿঀ-৿฀-๿຀-໿က-႟Ⴀ-ჿሀ-፿ក-៿]+/g, '');
const audioKey = (a, b) => `${audioNorm(a)}\u0000${audioNorm(b)}`;

// ── 卡池（逐位元組保留排版）──────────────────────────────────────
const SEED = 'seed_cards.json';
const seedRaw = fs.readFileSync(SEED, 'utf8');
const seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n';
const tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) { console.error('✗ seed_cards.json 排版自檢失敗，中止（不想把整個檔重排）'); process.exit(1); }

// ── 讀定案 ───────────────────────────────────────────────────────
const fixes = JSON.parse(fs.readFileSync('audits/pub-fix/card-fixes.json', 'utf8')).filter(f => f.action === 'change');
const years = [], splits = [];
let fatal = 0;
for (const f of fixes) {
  const album = f.type === 'split' ? f.cardRef.slice(f.from.length + 1) : f.cardRef.slice(f.cardRef.indexOf('|') + 1);
  const artist = f.type === 'split' ? f.from : f.cardRef.slice(0, f.cardRef.indexOf('|'));
  const hits = seed.filter(r => r[0] === artist && r[1] === album);
  if (hits.length !== 1) { console.error(`✗ ${f.cardRef} 命中 ${hits.length} 列，預期 1`); fatal++; continue; }
  const row = hits[0];
  if (f.type === 'year' && f.field !== 'year') continue;   // Lou Rawls 那筆是「year／release group」複合欄，下面另外處理
  if (f.type === 'year') {
    if (row[6] === f.to) continue;                     // 已改過
    if (row[6] !== f.from) { console.error(`✗ ${f.cardRef} 年份現值 ${row[6]}，定案寫的是 ${f.from}→${f.to}`); fatal++; continue; }
    years.push({ row, artist, album, from: f.from, to: f.to });
  } else if (f.type === 'split') {
    if (seed.some(r => r[0] === f.to && r[1] === album)) { console.error(`✗ ${f.to}《${album}》已存在，會撞卡`); fatal++; continue; }
    splits.push({ row, album, oldA: artist, newA: f.to });
  }
}
// Lou Rawls《Lou Rawls Live!》：卡名帶驚嘆號的是 1966 Capitol 版，池中卻標 1978（費城國際的《Live》）
const lr = seed.find(r => r[0] === 'Lou Rawls' && r[1] === 'Lou Rawls Live!');
if (lr && lr[6] === 1978) years.push({ row: lr, artist: 'Lou Rawls', album: 'Lou Rawls Live!', from: 1978, to: 1966 });
// Supershy《Happy Music》是浩室／迪斯可，原本跟著 Tom Misch 標成 jazz（定案檔「建議曲風標籤由 jazz 改 electronic」）
const GENRE = new Map([['Supershy|Happy Music', ['electronic']]]);

if (fatal) { console.error(`✗ ${fatal} 筆定位失敗，中止`); process.exit(1); }
console.log(`年份 ${years.length} 張：`);
for (const y of years) console.log(`   ${y.artist}《${y.album}》 ${y.from} → ${y.to}`);
console.log(`拆卡 ${splits.length} 張：`);
for (const s of splits) console.log(`   ${s.oldA} → ${s.newA}  《${s.album}》`);

// ── KV 現況：每個前綴都探一次 ────────────────────────────────────
const PRE = ['desc', 'desc1', 'desc2', 'desc4', 'rating', 'rating2', 'rating3', 'rating4', 'mapgenre1', 'mapgenre2', 'mapgenre3',
  'cover', 'cover2', 'cover3', 'cover4', 'cover5', 'cover6', 'bc1', 'bc2'];
const probe = splits.flatMap(s => PRE.flatMap(p => [`${p}:${kvBase(s.oldA, s.album)}`, `${p}:${kvBase(s.newA, s.album)}`]));
const kv = {};
for (let i = 0; i < probe.length; i += 90) {
  const j = await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: probe.slice(i, i + 90) }) })).json();
  if (!j.success) { console.error('✗ KV 讀取失敗', JSON.stringify(j.errors).slice(0, 200)); process.exit(1); }
  Object.assign(kv, j.result.values);
}
const puts = [], dels = [];
for (const s of splits) for (const p of PRE) {
  const o = `${p}:${kvBase(s.oldA, s.album)}`, n = `${p}:${kvBase(s.newA, s.album)}`;
  if (kv[o] == null) continue;
  if (kv[n] != null) { console.error(`⚠ ${n} 已有值，跳過搬移（舊值保留待查）`); continue; }
  puts.push({ key: n, value: typeof kv[o] === 'string' ? kv[o] : JSON.stringify(kv[o]) });
  dels.push(o);
}
const byPre = {}; for (const p of puts) { const x = p.key.split(':')[0]; byPre[x] = (byPre[x] || 0) + 1; }
console.log(`\nKV：搬 ${puts.length} 個值、刪 ${dels.length} 個舊鍵　${JSON.stringify(byPre)}`);
const noDesc = splits.filter(s => kv[`desc2:${kvBase(s.oldA, s.album)}`] == null && kv[`desc4:${kvBase(s.oldA, s.album)}`] == null);
if (noDesc.length) console.log('   ⚠ 沒有簡介鍵的卡：' + noDesc.map(s => s.album).join('、'));

// ── 三個資料檔 ───────────────────────────────────────────────────
const SUB = 'card-subgenres.json', PVS = 'card-preview-status.js', AUD = 'data/apple-audio-map-v1.json';
let sub = fs.readFileSync(SUB, 'utf8'), pvs = fs.readFileSync(PVS, 'utf8');
const audRaw = fs.readFileSync(AUD, 'utf8'), aud = JSON.parse(audRaw);
// 工作區的這個檔是 CRLF（git autocrlf 轉的）、縮排 1 格；照原樣寫回，否則 diff 會是整個檔
const audIndent = /^\{\r?\n( +)"/.exec(audRaw)?.[1]?.length ?? 0;
const audCRLF = /\r\n/.test(audRaw);
const renderAud = o => {
  const s = JSON.stringify(o, null, audIndent || undefined) + (/\n$/.test(audRaw) ? '\n' : '');
  return audCRLF ? s.replace(/\n/g, '\r\n') : s;
};
if (renderAud(aud) !== audRaw) { console.error('✗ apple-audio-map-v1.json 排版自檢失敗，中止'); process.exit(1); }

const cnt = { sub: 0, pvs: 0, aud: 0 };
for (const s of splits) {
  const oS = JSON.stringify(`${s.oldA}|${s.album}`) + ':', nS = JSON.stringify(`${s.newA}|${s.album}`) + ':';
  if (sub.split(oS).length === 2) { sub = sub.replace(oS, () => nS); cnt.sub++; }
  const oP = JSON.stringify(cardId(s.oldA, s.album)) + ':', nP = JSON.stringify(cardId(s.newA, s.album)) + ':';
  if (pvs.split(oP).length === 2) { pvs = pvs.replace(oP, () => nP); cnt.pvs++; }
  const oK = audioKey(s.oldA, s.album), nK = audioKey(s.newA, s.album);
  if (aud.entries[oK] && !aud.entries[nK]) {
    // 原地換鍵，保持物件的鍵順序（重排會讓 diff 變成整個檔）
    aud.entries = Object.fromEntries(Object.entries(aud.entries).map(([k, v]) => k === oK ? [nK, { ...v, artist: s.newA }] : [k, v]));
    cnt.aud++;
  }
}
console.log(`資料檔：card-subgenres ${cnt.sub} 鍵｜card-preview-status ${cnt.pvs} 鍵｜apple-audio-map ${cnt.aud} 鍵`);

// ── Firestore 對照表 ─────────────────────────────────────────────
const fsMap = splits.map(s => ({ oldArtist: s.oldA, newArtist: s.newA, album: s.album }));

if (!WRITE) { console.log('\n乾跑結束，未寫入。要執行請加 --write'); process.exit(0); }

fs.writeFileSync(`seed_cards.backup-before-pubfix-${STAMP}.json`, seedRaw);
for (const y of years) y.row[6] = y.to;
for (const s of splits) {
  s.row[0] = s.newA;
  const g = GENRE.get(`${s.newA}|${s.album}`); if (g) s.row[5] = g;
}
fs.writeFileSync(SEED, render(seed));
fs.writeFileSync(SUB, sub); fs.writeFileSync(PVS, pvs); fs.writeFileSync(AUD, renderAud(aud));
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/kv-rename-puts.json`, JSON.stringify(puts));
fs.writeFileSync(`${OUT}/kv-rename-deletes.json`, JSON.stringify(dels));
fs.writeFileSync(`${OUT}/kv-rename-backup.json`, JSON.stringify(Object.fromEntries(dels.map(k => [k, kv[k]])), null, 1));
fs.writeFileSync(`${OUT}/catalog-map.json`, JSON.stringify(fsMap, null, 1));
console.log(`\n✓ 已寫入 seed_cards.json（${years.length} 張年份＋${splits.length} 張掛名）、三個資料檔，工作檔在 ${OUT}/`);
