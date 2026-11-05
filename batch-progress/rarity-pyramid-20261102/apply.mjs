#!/usr/bin/env node
// 稀有度門檻改方案 A（2026-11-02 店主定案）：公式不變 score = classic + accessibility + (obscurity>=5 ? 1 : 0)，
// 門檻 10/8/6/4 → 9/8/7/6（≤5 普通）。
//   (1) 全池分布前後對照（seed_cards.json，頂點卡另計）→ distribution.json
//   (2) --write：所有 manifest（根目錄＋batch-progress/add-*/onboarding-manifest.json）只改 rarity 欄
//   (3) --catalog <dump.json>：依 card_catalog 現值產生只含 rarity 一欄的 patch（只動已存 rarity 且與新門檻不符者）
// 冪等：重跑只會改仍不符新門檻的值。
import fs from 'node:fs';
const D = 'batch-progress/rarity-pyramid-20261102/';
const WRITE = process.argv.includes('--write');
const ci = process.argv.indexOf('--catalog'), DUMP = ci > 0 ? process.argv[ci + 1] : null;
const score = (c, o, a) => c + a + (o >= 5 ? 1 : 0);
const OLD = s => s >= 10 ? 'legendary' : s >= 8 ? 'epic' : s >= 6 ? 'uncommon' : s >= 4 ? 'rare' : 'common';
const NEW = s => s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common';
const TIERS = ['legendary', 'epic', 'uncommon', 'rare', 'common'];
const cardIdOf = (artist, album) => `${artist}|${album}`.toLowerCase().replace(/\//g, '-').trim();

// (1) 全池
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const dist = { apex: {}, old: {}, new: {}, transitions: {}, changed: 0, total: seed.length };
for (const r of seed) {
  if (typeof r[8] === 'string') { dist.apex[r[8]] = (dist.apex[r[8]] || 0) + 1; continue; }
  const s = score(r[2], r[3], r[4]), o = OLD(s), n = NEW(s);
  dist.old[o] = (dist.old[o] || 0) + 1; dist.new[n] = (dist.new[n] || 0) + 1;
  if (o !== n) { dist.changed++; dist.transitions[`${o}→${n}`] = (dist.transitions[`${o}→${n}`] || 0) + 1; }
}
fs.writeFileSync(D + 'distribution.json', JSON.stringify(dist, null, 1) + '\n');
console.log('全池', seed.length, '頂點', JSON.stringify(dist.apex));
console.log('舊', TIERS.map(t => `${t} ${dist.old[t] || 0}`).join('、'));
console.log('新', TIERS.map(t => `${t} ${dist.new[t] || 0}`).join('、'));
console.log('變動', dist.changed, JSON.stringify(dist.transitions));

// (2) manifests
const files = [
  ...fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f)).sort(),
  ...fs.readdirSync('batch-progress').filter(d => /^add-/.test(d) && fs.existsSync(`batch-progress/${d}/onboarding-manifest.json`)).sort().map(d => `batch-progress/${d}/onboarding-manifest.json`),
];
let mf = 0, mc = 0, total = 0; const mt = {};
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8'), m = JSON.parse(raw);
  const ind = (raw.match(/^\{\r?\n( +|\t)/) || [, ' '])[1];
  let n = 0;
  for (const a of m.albums || []) {
    total++;
    const r = a.ratings; if (!r) throw new Error('缺 ratings ' + f + ' ' + a.artist);
    const nw = NEW(score(r.classic, r.obscurity, r.accessibility));
    if (a.rarity !== nw) { mt[`${a.rarity}→${nw}`] = (mt[`${a.rarity}→${nw}`] || 0) + 1; a.rarity = nw; n++; }
  }
  if (n) {
    mf++; mc += n;
    const out = JSON.stringify(m, null, ind) + (raw.endsWith('\n') ? '\n' : '');
    // 防呆：除 rarity 值外逐字相同
    const strip = s => s.replace(/"rarity": ?"[a-z]+"/g, '"rarity":"_"');
    if (strip(out) !== strip(raw)) throw new Error('rarity 以外有變動 ' + f);
    if (WRITE) fs.writeFileSync(f, out);
  }
}
console.log(`manifest ${files.length} 檔、${total} 筆｜要改 ${mf} 檔、${mc} 筆 ${JSON.stringify(mt)}${WRITE ? '（已寫入）' : '（乾跑）'}`);

// (3) card_catalog patch
if (DUMP) {
  const cat = JSON.parse(fs.readFileSync(DUMP, 'utf8'));
  const byId = new Map(seed.map(r => [cardIdOf(r[0], r[1]), r]));
  const patches = [], ct = {}; let apexN = 0, noRar = 0, notPool = 0;
  for (const d of cat) {
    const r = byId.get(d.id); if (!r) { notPool++; continue; }
    if (!d.rarity) { noRar++; continue; }
    const nw = NEW(score(r[2], r[3], r[4]));
    if (d.rarity === nw) continue;
    const apex = typeof r[8] === 'string'; if (apex) apexN++;
    ct[`${d.rarity}→${nw}${apex ? '（頂點）' : ''}`] = (ct[`${d.rarity}→${nw}${apex ? '（頂點）' : ''}`] || 0) + 1;
    patches.push({ docId: d.id, updateMask: ['rarity'], body: { fields: { rarity: { stringValue: nw } } }, from: d.rarity });
  }
  fs.writeFileSync(D + 'card-catalog-patches.json', JSON.stringify(patches) + '\n');
  console.log(`card_catalog ${cat.length} 文件｜patch ${patches.length}（頂點 ${apexN}）｜無 rarity 欄略過 ${noRar}｜不在卡池略過 ${notPool}`, JSON.stringify(ct));
}
