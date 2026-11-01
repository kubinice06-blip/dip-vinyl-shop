#!/usr/bin/env node
// 三軸重評「套用」：合併 verdicts → applied.json → 改 seed_cards.json（字串替換）＋各 manifest ratings／rarity。
// 用法：node batch-progress/rerate-20261101/apply.mjs [--write]   （不帶 --write 只產 applied.json 並報數）
// 冪等：seed 已是新值的卡會被當成「舊值＝新值」略過；manifest 只在值不同時改寫並保留第一次的 previous。
import fs from 'node:fs';
const D = 'batch-progress/rerate-20261101/';
const WRITE = process.argv.includes('--write');
const SRC = 'manual:rerate-20261101';
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common'; };

const shard = {}; for (const f of fs.readdirSync(D + 'shards').sort()) for (const x of JSON.parse(fs.readFileSync(D + 'shards/' + f, 'utf8'))) shard[x.key] = x;
const verdict = {}; for (const f of fs.readdirSync(D + 'verdicts').filter(f => /^s\d\d-.*\.json$/.test(f)).sort())
  for (const v of JSON.parse(fs.readFileSync(D + 'verdicts/' + f, 'utf8'))) { if (verdict[v.key]) throw new Error('重複 ' + v.key); verdict[v.key] = v; }
for (const k in shard) if (!verdict[k]) throw new Error('缺 verdict ' + k);

// 以 applied.json 既有的 old 為準（重跑時 seed 可能已是新值）
const prevApplied = fs.existsSync(D + 'applied.json') ? Object.fromEntries(JSON.parse(fs.readFileSync(D + 'applied.json', 'utf8')).map(x => [x.key, x])) : {};
const applied = Object.keys(shard).map(k => {
  const s = shard[k], v = verdict[k];
  const old = prevApplied[k]?.old || { ...s.cur };
  const nw = v.keep ? { ...old } : { classic: v.classic, obscurity: v.obscurity, accessibility: v.accessibility };
  for (const ax of ['classic', 'obscurity', 'accessibility']) if (!Number.isInteger(nw[ax]) || nw[ax] < 1 || nw[ax] > 5) throw new Error(`值錯 ${k} ${ax}`);
  return { key: k, artist: s.artist, album: s.album, batch: s.batch, line: s.line, old, new: nw,
    oldRarity: rarityOf(old.classic, old.obscurity, old.accessibility), newRarity: rarityOf(nw.classic, nw.obscurity, nw.accessibility),
    keep: !!v.keep, mainline: !!v.mainline, changed: ['classic', 'obscurity', 'accessibility'].some(a => old[a] !== nw[a]), why: v.why };
});
fs.writeFileSync(D + 'applied.json', JSON.stringify(applied, null, 1) + '\n');
const changed = applied.filter(x => x.changed);
console.log(`applied ${applied.length}｜三軸有變 ${changed.length}｜keep ${applied.filter(x => x.keep).length}｜稀有度有變 ${applied.filter(x => x.oldRarity !== x.newRarity).length}`);
if (!WRITE) process.exit(0);

// --- seed_cards.json：字串替換 ---
const seedRaw = fs.readFileSync('seed_cards.json', 'utf8');
let out = seedRaw, hits = 0, already = 0;
for (const x of applied) {
  const head = '[' + JSON.stringify(x.artist) + ',' + JSON.stringify(x.album) + ',';
  const from = head + [x.old.classic, x.old.obscurity, x.old.accessibility].join(',') + ',';
  const to = head + [x.new.classic, x.new.obscurity, x.new.accessibility].join(',') + ',';
  if (from === to) continue;
  const n = out.split(from).length - 1;
  if (n === 1) { out = out.replace(from, () => to); hits++; continue; }
  if (n === 0 && out.split(to).length - 1 === 1) { already++; continue; }
  throw new Error(`seed 命中 ${n}：${x.key}`);
}
const before = JSON.parse(seedRaw), after = JSON.parse(out);
if (before.length !== after.length) throw new Error('總筆數變了');
if (hits + already !== changed.length) throw new Error(`命中 ${hits}+${already} ≠ 要改 ${changed.length}`);
if (Math.abs(out.length - seedRaw.length) > 0) console.log('seed 長度變化', out.length - seedRaw.length);
// 逐列比對：只有第 3–5 欄變、且只有本範圍的卡
const map = Object.fromEntries(applied.map(x => [x.key, x]));
for (let i = 0; i < before.length; i++) {
  const b = before[i], a = after[i], x = map[b[0] + '|' + b[1]];
  const rest = r => JSON.stringify([r[0], r[1], ...r.slice(5)]);
  if (rest(a) !== rest(b)) throw new Error('非三軸欄變動 ' + b[0]);
  if (!x) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + b[0]); continue; }
  if (a[2] !== x.new.classic || a[3] !== x.new.obscurity || a[4] !== x.new.accessibility) throw new Error('新值不符 ' + x.key);
}
fs.writeFileSync('seed_cards.json', out);
console.log(`seed：替換 ${hits}（已是新值 ${already}）｜總筆數 ${after.length} 不變｜長度 ${seedRaw.length}→${out.length}`);

// --- manifests（根目錄＋batch-progress 兩份）---
const roots = fs.readdirSync('.').filter(f => /^onboarding-manifest-add-2026(10|11)\d\d-(md|mc|ml|sf|eb)\d+-.*\.json$/.test(f));
let mfiles = 0, mcards = 0, seen = new Set();
for (const f of roots) {
  const b = f.match(/^onboarding-manifest-(add-.*?)-\d{8}\.json$/)[1];
  for (const p of [f, `batch-progress/${b}/onboarding-manifest.json`]) {
    if (!fs.existsSync(p)) continue;
    const raw = fs.readFileSync(p, 'utf8'); const m = JSON.parse(raw); let n = 0;
    for (const a of m.albums) {
      const x = map[a.artist + '|' + a.album]; if (!x) continue;
      if (p === f) seen.add(x.key);
      const r = a.ratings, nw = x.new;
      const same = r.classic === nw.classic && r.obscurity === nw.obscurity && r.accessibility === nw.accessibility && r.source === SRC;
      if (same && a.rarity === x.newRarity) continue;
      if (r.source !== SRC) r.previous = { classic: r.classic, obscurity: r.obscurity, accessibility: r.accessibility, source: r.source, checkedAt: r.checkedAt, ...(r.note ? { note: r.note } : {}), rarity: a.rarity };
      r.classic = nw.classic; r.obscurity = nw.obscurity; r.accessibility = nw.accessibility;
      r.source = SRC; r.checkedAt = '2026-11-01T00:00:00Z';
      r.note = (x.keep ? '重評沿用舊值：' : '三軸重評（RUBRIC 2026-11-01）：') + x.why;
      a.rarity = x.newRarity; n++;
    }
    if (n) { fs.writeFileSync(p, JSON.stringify(m, null, 1)); mfiles++; mcards += n; }
  }
}
if (seen.size !== applied.length) throw new Error(`manifest 覆蓋 ${seen.size} ≠ ${applied.length}`);
console.log(`manifest：改 ${mfiles} 檔、${mcards} 筆（兩份合計）`);
