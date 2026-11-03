#!/usr/bin/env node
// 三軸重評第三輪「套用」（2026-11-03）：
//   (A) 31 片 verdicts 合併 → 冷門度下限機械檢查（listenersKV）→ applied.json
//   (B) --write：seed_cards.json 三軸欄字串替換（tier 欄不動）＋三道防呆
//   (C) --catalog：card_catalog 四欄 patch（classic／obscurity／accessibility／rarity）→ publish-stage/rerate-20261103/card-catalog-patches.json
// 這批 7,525 張全是一般卡、無 manifest（全 repo manifest 掃過 0 命中），所以沒有 manifest 寫回。
// 用法：node batch-progress/rerate-20261103/apply.mjs [--write] [--catalog]
// 冪等：old 以既有 applied.json 為準；seed 已是新值者算「已是新值」略過。
import fs from 'node:fs';
const D = 'batch-progress/rerate-20261103/';
const AX = ['classic', 'obscurity', 'accessibility'];
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));

// 下限表（RUBRIC-ADDENDUM）；這批沒有試聽狀態 → 不套「無試聽 → 5」
function floorOf(L) {
  if (L == null || L === 0) return null; // 缺值／0（查詢漏抓）視同缺值
  if (L < 1000) return { min: 4, rule: 'L<1000 → ≥4' };
  if (L < 5000) return { min: 3, rule: 'L 1,000–4,999 → ≥3' };
  return null;
}
// 疑錯配：代理在 why 明寫錯配／拆名／漏抓等，且各片主線已覆核（ADDENDUM 例外條款）
const MISMATCH_WHY = /錯配|拆名|漏抓|視同缺值|不套下限|不套用下限|免套|豁免/;

const shard = {}; for (const f of fs.readdirSync(D + 'shards').filter(f => /^s\d\d\.json$/.test(f)).sort()) for (const x of J(D + 'shards/' + f)) shard[x.key] = x;
const verdict = {}; for (const f of fs.readdirSync(D + 'verdicts').filter(f => /^s\d\d-\d+-\d+\.json$/.test(f)).sort())
  for (const v of J(D + 'verdicts/' + f)) { if (verdict[v.key]) throw new Error('重複 ' + v.key); verdict[v.key] = { ...v, file: f }; }
for (const k in shard) if (!verdict[k]) throw new Error('缺 verdict ' + k);
for (const k in verdict) if (!shard[k]) throw new Error('verdict 多出 ' + k);
const prevA = fs.existsSync(D + 'applied.json') ? Object.fromEntries(J(D + 'applied.json').map(x => [x.key, x])) : {};

const applied = Object.keys(shard).map(k => {
  const s = shard[k], v = verdict[k];
  if (s.tier) throw new Error('這批應全是一般卡 ' + k);
  const old = prevA[k]?.old || { ...s.cur };
  const base = v.keep ? { ...old } : { classic: v.classic, obscurity: v.obscurity, accessibility: v.accessibility };
  const L = s.listenersKV ?? null, fl = floorOf(L);
  let floor;
  if (!fl) floor = { triggered: false, rule: null, ...(L === 0 ? { exempt: 'listeners=0 漏抓（視同缺值）' } : {}) };
  else if (base.obscurity >= fl.min) floor = { triggered: false, rule: fl.rule };
  else if (MISMATCH_WHY.test(v.why || '')) floor = { triggered: false, exempt: 'Last.fm 疑錯配（why 註明，主線覆核）', rule: fl.rule };
  else floor = { triggered: true, rule: fl.rule, from: base.obscurity };
  const nw = { ...base, obscurity: floor.triggered ? fl.min : base.obscurity };
  for (const ax of AX) if (!Number.isInteger(nw[ax]) || nw[ax] < 1 || nw[ax] > 5) throw new Error(`值錯 ${k} ${ax}`);
  return { key: k, artist: s.artist, album: s.album, shard: v.file.replace(/\.json$/, ''), year: s.year, listeners: L,
    old, verdict: { classic: v.classic, obscurity: v.obscurity, accessibility: v.accessibility }, new: nw,
    oldRarity: rarityOf(old.classic, old.obscurity, old.accessibility), newRarity: rarityOf(nw.classic, nw.obscurity, nw.accessibility),
    keep: !!v.keep, floor, changed: AX.some(a => old[a] !== nw[a]), why: v.why };
});
fs.writeFileSync(D + 'applied.json', JSON.stringify(applied, null, 1) + '\n');
const cnt = (xs, f) => xs.filter(f).length;
console.log(`第三輪 ${applied.length}｜三軸有變 ${cnt(applied, x => x.changed)}｜下限觸發 ${cnt(applied, x => x.floor.triggered)}｜疑錯配豁免 ${cnt(applied, x => /疑錯配/.test(x.floor.exempt || ''))}｜L=0 ${cnt(applied, x => x.listeners === 0)}｜L 缺 ${cnt(applied, x => x.listeners == null)}｜稀有度有變 ${cnt(applied, x => x.oldRarity !== x.newRarity)}｜keep ${cnt(applied, x => x.keep)}`);

const map = Object.fromEntries(applied.map(x => [x.key, x]));
const todo = applied.filter(x => x.changed);

if (process.argv.includes('--write')) {
  const seedRaw = fs.readFileSync('seed_cards.json', 'utf8');
  let out = seedRaw, hits = 0, already = 0;
  for (const x of todo) {
    const head = '[' + JSON.stringify(x.artist) + ',' + JSON.stringify(x.album) + ',';
    const from = head + [x.old.classic, x.old.obscurity, x.old.accessibility].join(',') + ',';
    const to = head + [x.new.classic, x.new.obscurity, x.new.accessibility].join(',') + ',';
    const n = out.split(from).length - 1;
    if (n === 1) { out = out.replace(from, () => to); hits++; continue; }
    if (n === 0 && out.split(to).length - 1 === 1) { already++; continue; }
    throw new Error(`seed 命中 ${n}：${x.key}`);
  }
  const before = JSON.parse(seedRaw), after = JSON.parse(out);
  // 防呆 1：總筆數不變
  if (before.length !== after.length) throw new Error('總筆數變了');
  // 防呆 2：命中數＝要改數
  if (hits + already !== todo.length) throw new Error(`命中 ${hits}+${already} ≠ 要改 ${todo.length}`);
  // 防呆 3：逐列比對，只有第 3–5 欄變（tier 欄 index 8 等其餘欄逐字相同）、只有本範圍的卡、新值正確；範圍內每張都找得到列
  const found = new Set();
  for (let i = 0; i < before.length; i++) {
    const b = before[i], a = after[i];
    if (!Array.isArray(b)) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('非卡列變動 ' + i); continue; }
    const x = map[b[0] + '|' + b[1]];
    const rest = r => JSON.stringify([r[0], r[1], ...r.slice(5)]);
    if (rest(a) !== rest(b)) throw new Error('非三軸欄變動 ' + b[0]);
    if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
    if (b[8]) throw new Error('範圍內出現頂點列 ' + x.key);
    found.add(x.key);
    if (a[2] !== x.new.classic || a[3] !== x.new.obscurity || a[4] !== x.new.accessibility) throw new Error('新值不符 ' + x.key);
  }
  if (found.size !== applied.length) throw new Error(`seed 找到 ${found.size}／${applied.length}`);
  fs.writeFileSync('seed_cards.json', out);
  console.log(`seed：替換 ${hits}（已是新值 ${already}）｜總筆數 ${after.length} 不變｜範圍 ${found.size} 張全在｜長度 ${seedRaw.length}→${out.length}`);
}

if (process.argv.includes('--catalog')) {
  const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();
  const iv = n => ({ integerValue: String(n) });
  const patches = todo.map(x => ({ key: x.key, docId: cardIdOf(x.artist, x.album), updateMask: ['classic', 'obscurity', 'accessibility', 'rarity'],
    body: { fields: { classic: iv(x.new.classic), obscurity: iv(x.new.obscurity), accessibility: iv(x.new.accessibility), rarity: { stringValue: x.newRarity } } } }));
  fs.mkdirSync('publish-stage/rerate-20261103', { recursive: true });
  fs.writeFileSync('publish-stage/rerate-20261103/card-catalog-patches.json', JSON.stringify(patches, null, 0));
  console.log(`card_catalog payload ${patches.length} 筆`);
}
