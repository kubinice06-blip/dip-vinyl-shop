#!/usr/bin/env node
// 第二輪 B1：兩張線上簡介是退件說明的卡（Coleman Hawkins《Body and Soul》、Odyssey《Odyssey》）。
// release-group 與封面在 2026-08-23 就已經重配正確，但簡介、三軸、年份、曲風、UPC 都停在重配之前
// ——那些欄位當時是對「配錯的那張碟」寫的佔位值。這支把它們一次補齊。
//
// 用法：node audits/pub-fix/round2-b1-apply.mjs            乾跑
//       node audits/pub-fix/round2-b1-apply.mjs --write    改本機檔案、PATCH card_catalog、寫出 KV bulk 檔
//       node audits/pub-fix/round2-b1-apply.mjs --verify   回讀 KV 與 card_catalog
import fs from 'node:fs';

const WRITE = process.argv.includes('--write'), VERIFY = process.argv.includes('--verify');
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
const AUTH = { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN };
const KV = `https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}`;
const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents';
const FKEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const OUT = 'publish-stage/pub-fix-20261004';
const SUBGENRE = { 'Odyssey|Odyssey': ['soul/disco'] };   // 原本被歸在 rock/metal/prog-metal（同名法國前衛金屬團的標籤）
const REJECT = /建議退回重配|本列所配的 release-group/;   // 舊簡介必須還是退件說明才覆寫

const jobs = JSON.parse(fs.readFileSync('audits/pub-fix/round2-b1.json', 'utf8'));
const base = j => `${j.artist}|${j.album}`.toLowerCase();
const kvGet = async keys => {
  const r = await (await fetch(`${KV}/bulk/get`, { method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' }, body: JSON.stringify({ keys }) })).json();
  if (!r.success) throw new Error(JSON.stringify(r.errors));
  return r.result.values;
};
const catGet = async id => {
  const d = await (await fetch(`${FS}/card_catalog/${encodeURIComponent(id)}?key=${FKEY}`)).json();
  return Object.fromEntries(Object.entries(d.fields || {}).map(([k, v]) => [k, Object.values(v)[0]]));
};

// 目標值
const want = jobs.map(j => {
  const b = base(j);
  return { j, b,
    desc: JSON.stringify({ desc: j.newDesc }),
    cat: { classic: j.seed.classic, obscurity: j.seed.obscurity, accessibility: j.seed.accessibility, rarity: j.rarity, upc: j.upc } };
});
const live = await kvGet(want.flatMap(w => ['desc2:' + w.b, 'mapgenre3:' + w.b]));
for (const w of want) {
  const mg = JSON.parse(live['mapgenre3:' + w.b] || '{}');
  w.mapgenre = JSON.stringify({ ...mg, genres: w.j.mapGenres, rawGenres: w.j.rawGenres || mg.rawGenres || [] });
}

if (VERIFY) {
  let bad = 0;
  for (const w of want) {
    const okD = live['desc2:' + w.b] === w.desc, okM = live['mapgenre3:' + w.b] === w.mapgenre;
    const c = await catGet(w.b);
    const okC = Object.entries(w.cat).every(([k, v]) => String(c[k]) === String(v));
    console.log(`${w.j.artist}《${w.j.album}》 desc2 ${okD ? '✓' : '✗'}｜mapgenre3 ${okM ? '✓' : '✗'}｜card_catalog ${okC ? '✓' : '✗ ' + JSON.stringify(c)}`);
    if (!(okD && okM && okC)) bad++;
  }
  process.exit(bad ? 1 : 0);
}

// 卡池（逐位元組保留排版）
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8'), seed = JSON.parse(seedRaw);
const eol = /\r\n/.test(seedRaw) ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(seedRaw)?.[0] || '';
const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
if (render(seed) !== seedRaw) { console.error('✗ seed_cards.json 排版自檢失敗'); process.exit(1); }

const puts = [], patches = [];
for (const w of want) {
  const { j, b } = w;
  const rows = seed.filter(r => r[0] === j.artist && r[1] === j.album);
  if (rows.length !== 1) { console.error(`✗ ${b} 命中 ${rows.length} 列`); process.exit(1); }
  const row = rows[0], before = JSON.stringify(row);
  [row[2], row[3], row[4], row[5], row[6]] = [j.seed.classic, j.seed.obscurity, j.seed.accessibility, j.seed.genres, j.seed.year];
  console.log(`\n${j.artist}《${j.album}》`);
  console.log(`  seed  ${before}\n     →  ${JSON.stringify(row)}`);
  const cur = live['desc2:' + b];
  if (cur === w.desc) console.log('  desc2 已是新稿');
  else if (!REJECT.test(cur || '')) { console.error('  ✗ desc2 現值不是退件說明，不覆寫：' + String(cur).slice(0, 80)); process.exit(1); }
  else { puts.push({ key: 'desc2:' + b, value: w.desc }); console.log(`  desc2 ${[...j.newDesc].length} 字　${j.newDesc}`); }
  if (live['mapgenre3:' + b] !== w.mapgenre) { puts.push({ key: 'mapgenre3:' + b, value: w.mapgenre }); console.log(`  mapgenre3  ${live['mapgenre3:' + b]}\n          →  ${w.mapgenre}`); }
  const c = await catGet(b);
  const diff = Object.entries(w.cat).filter(([k, v]) => String(c[k]) !== String(v));
  console.log('  card_catalog  ' + (diff.length ? diff.map(([k, v]) => `${k} ${c[k]}→${v}`).join('、') : '無差異'));
  if (diff.length) patches.push({ docId: b, updateMask: Object.keys(w.cat), body: { fields: {
    classic: { integerValue: String(w.cat.classic) }, obscurity: { integerValue: String(w.cat.obscurity) },
    accessibility: { integerValue: String(w.cat.accessibility) }, rarity: { stringValue: w.cat.rarity }, upc: { stringValue: w.cat.upc } } } });
}
let sub = fs.readFileSync('card-subgenres.json', 'utf8');
for (const [k, v] of Object.entries(SUBGENRE)) {
  const m = new RegExp(JSON.stringify(k).replace(/[|]/g, '\\|') + ':\\[[^\\]]*\\]').exec(sub);
  if (!m) { console.error('✗ card-subgenres 找不到 ' + k); process.exit(1); }
  const to = JSON.stringify(k) + ':' + JSON.stringify(v);
  if (m[0] !== to) { console.log(`\ncard-subgenres  ${m[0]} → ${to}`); sub = sub.replace(m[0], () => to); }
}

if (!WRITE) { console.log(`\n乾跑：KV 要寫 ${puts.length} 個鍵、card_catalog 要 PATCH ${patches.length} 筆。加 --write 執行。`); process.exit(0); }

fs.writeFileSync('seed_cards.backup-before-round2-b1.json', seedRaw);
fs.writeFileSync('seed_cards.json', render(seed));
fs.writeFileSync('card-subgenres.json', sub);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/b1-kv-puts.json`, JSON.stringify(puts));
fs.writeFileSync(`${OUT}/b1-kv-backup.json`, JSON.stringify(Object.fromEntries(puts.map(p => [p.key, live[p.key]])), null, 1));
fs.writeFileSync(`${OUT}/b1-catalog-patches.json`, JSON.stringify(patches, null, 1));
console.log(`\n✓ 已改 seed_cards.json 與 card-subgenres.json；KV bulk 檔與 card_catalog 補丁寫在 ${OUT}/`);
