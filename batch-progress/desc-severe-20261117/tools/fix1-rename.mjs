#!/usr/bin/env node
// sd-fix-1（2026-11-17，協調端裁定、店主授權）：張露《繁星點點 張露》改掛名為張璐《繁星點點》。
// 身分：Discogs release 33707097＝台灣環球唱片 1977 年 1 月 LP（ULP-5125），歌手張璐；串流「張露、1973-10-23」是誤掛。
// 照 audits/pool-fix-20261016/README.md 第四節的六處（scripts/apply-pub-fix-cards.mjs 開頭註解）：
//   1 seed（藝人、盤名、年份 1977、曲風 pop）  4 card-preview-status.js  5 data/apple-audio-map-v1.json  6 card-subgenres.json（本卡原本沒有）
//   2 KV：desc2／desc4 寫新稿、rating4 照搬、cover6 改 Discogs 原版封面、mapgenre3 不照搬（原標籤是張露的時代曲標籤）→ 新寫；舊鍵只列待刪
//   3 card_catalog：scripts/migrate-card-catalog-ids.mjs --map（已擴充 oldAlbum／newAlbum）＋另 PATCH coverUrl
// 用法：node …/fix1-rename.mjs [--write] [--live]
//   乾跑；--write 改本機檔＋寫 KV 工作檔；--live 寫 KV 並回讀（kv-token-check 須先過）
import fs from 'node:fs';
const WRITE = process.argv.includes('--write'), LIVE = process.argv.includes('--live');
const DIR = 'batch-progress/desc-severe-20261117';
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const OLD = { a: '張露', b: '繁星點點 張露' }, NEW = { a: '張璐', b: '繁星點點' };
const YEAR = 1977, GENRES = ['pop'];
const COVER = 'https://i.discogs.com/158Uy5HJEKKY3lmXx76ELNOX-ljrFlBkn2KSAjV7DzY/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMzNzA3/MDk3LTE3NDQ3Mjk1/NDgtMzIyOS5qcGVn.jpeg';
const kvBase = (a, b) => `${a}|${b}`.toLowerCase();
const cardId = (a, b) => `${a}|${b}`.toLowerCase().replace(/\//g, '-').trim();
const audioNorm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿᄀ-ᇿ㄰-㆏가-힯Ͱ-Ͽἀ-῿Ѐ-ԯ԰-֏֐-׿؀-ۿݐ-ݿऀ-ॿঀ-৿฀-๿຀-໿က-႟Ⴀ-ჿሀ-፿ក-៿]+/g, '');
const audioKey = (a, b) => `${audioNorm(a)}\u0000${audioNorm(b)}`;
const desc = JSON.parse(fs.readFileSync('desc-tools/batches/output/sd-fix-1-out-1.json', 'utf8')).find(r => r.key === kvBase(NEW.a, NEW.b)).desc;

// ── seed ──
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) throw new Error('seed 排版自檢失敗');
const row = seed.find(r => r[0] === OLD.a && r[1] === OLD.b);
const done = seed.find(r => r[0] === NEW.a && r[1] === NEW.b);
if (!row && !done) throw new Error('seed 找不到新舊兩列');
if (row) console.log('seed 舊列', JSON.stringify(row));

// ── KV ──
const PRE = ['desc', 'desc1', 'desc2', 'desc3', 'desc4', 'rating', 'rating2', 'rating3', 'rating4', 'mapgenre1', 'mapgenre2', 'mapgenre3',
  'cover', 'cover2', 'cover3', 'cover4', 'cover5', 'cover6', 'bc1', 'bc2'];
const probe = PRE.flatMap(p => [`${p}:${kvBase(OLD.a, OLD.b)}`, `${p}:${kvBase(NEW.a, NEW.b)}`]);
const j = await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: probe }) })).json();
if (!j.success) throw new Error(JSON.stringify(j.errors));
const kv = j.result.values;
const n = p => `${p}:${kvBase(NEW.a, NEW.b)}`, o = p => `${p}:${kvBase(OLD.a, OLD.b)}`;
const puts = [], dels = [];
for (const p of PRE) {
  if (kv[o(p)] == null) continue;
  dels.push(o(p));
  if (['desc2', 'desc4', 'mapgenre3', 'cover6'].includes(p)) continue;   // 這幾個下面另寫
  puts.push({ key: n(p), value: typeof kv[o(p)] === 'string' ? kv[o(p)] : JSON.stringify(kv[o(p)]) });
}
puts.push({ key: n('desc2'), value: JSON.stringify({ desc }) }, { key: n('desc4'), value: JSON.stringify({ desc }) });
puts.push({ key: n('mapgenre3'), value: JSON.stringify({ genres: GENRES, rawGenres: ['mandopop', 'c-pop', 'taiwanese', 'female vocalists', '70s'] }) });
puts.push({ key: n('cover6'), value: JSON.stringify({ imageUrl: COVER, coverSource: 'discogs', discogsReleaseId: '33707097' }) });
console.log('KV 寫', puts.map(p => p.key).join('、'), '｜舊鍵待刪', dels.length);

// ── 資料檔 ──
const PVS = 'card-preview-status.js', AUD = 'data/apple-audio-map-v1.json', SUB = 'card-subgenres.json';
let pvs = fs.readFileSync(PVS, 'utf8'), sub = fs.readFileSync(SUB, 'utf8');
const audRaw = fs.readFileSync(AUD, 'utf8'), aud = JSON.parse(audRaw);
const audIndent = /^\{\r?\n( +)"/.exec(audRaw)?.[1]?.length ?? 0, audCRLF = /\r\n/.test(audRaw);
const renderAud = x => { const s = JSON.stringify(x, null, audIndent || undefined) + (/\n$/.test(audRaw) ? '\n' : ''); return audCRLF ? s.replace(/\n/g, '\r\n') : s; };
if (renderAud(aud) !== audRaw) throw new Error('apple-audio-map 排版自檢失敗');
const cnt = { pvs: 0, aud: 0, sub: 0 };
const oP = JSON.stringify(cardId(OLD.a, OLD.b)) + ':', nP = JSON.stringify(cardId(NEW.a, NEW.b)) + ':';
if (pvs.split(oP).length === 2) { pvs = pvs.replace(oP, () => nP); cnt.pvs++; }
const oS = JSON.stringify(`${OLD.a}|${OLD.b}`) + ':', nS = JSON.stringify(`${NEW.a}|${NEW.b}`) + ':';
if (sub.split(oS).length === 2) { sub = sub.replace(oS, () => nS); cnt.sub++; }
const oK = audioKey(OLD.a, OLD.b), nK = audioKey(NEW.a, NEW.b);
if (aud.entries[oK] && !aud.entries[nK]) {
  aud.entries = Object.fromEntries(Object.entries(aud.entries).map(([k, v]) => k === oK ? [nK, { ...v, artist: NEW.a, album: NEW.b }] : [k, v]));
  cnt.aud++;
}
console.log('資料檔', JSON.stringify(cnt));

if (WRITE) {
  if (row) { row[0] = NEW.a; row[1] = NEW.b; row[5] = GENRES; row[6] = YEAR; fs.writeFileSync('seed_cards.json', render(seed)); }
  fs.writeFileSync(PVS, pvs); fs.writeFileSync(SUB, sub); fs.writeFileSync(AUD, renderAud(aud));
  fs.writeFileSync(`${DIR}/kv-before-sd-fix-1-rename.json`, JSON.stringify(probe.map(k => ({ key: k, value: kv[k] ?? null })), null, 1));
  fs.writeFileSync(`${DIR}/sd-fix-1-kv-puts.json`, JSON.stringify(puts, null, 1));
  fs.writeFileSync(`${DIR}/sd-fix-1-kv-deletes-pending.json`, JSON.stringify(dels, null, 1));
  fs.writeFileSync(`${DIR}/sd-fix-1-catalog-map.json`, JSON.stringify([{ oldArtist: OLD.a, newArtist: NEW.a, oldAlbum: OLD.b, newAlbum: NEW.b }], null, 1));
  console.log('✓ 本機檔已寫');
}
if (LIVE) {
  const r = await (await fetch(`${BASE}/bulk`, { method: 'PUT', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify(puts) })).json();
  if (!r.success) throw new Error(JSON.stringify(r.errors));
  const v = (await (await fetch(`${BASE}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys: puts.map(p => p.key) }) })).json()).result.values;
  let ok = 0; for (const p of puts) { const g = typeof v[p.key] === 'string' ? v[p.key] : JSON.stringify(v[p.key]); if (JSON.stringify(JSON.parse(g)) === JSON.stringify(JSON.parse(p.value))) ok++; else console.log('不符', p.key); }
  console.log(`KV 回讀 ${ok}/${puts.length}`);
}
