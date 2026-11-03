#!/usr/bin/env node
// 殿堂擴充補正：133 張新殿堂中 classic<5 的 16 張 → classic=5（ALBUM_ONBOARDING §頂點：hall 的 classic=5 是最低門檻；
// published gate「hall 候選必須 classic=5」）。先例：《台客的復仇》由店主指定殿堂時定 5/5/3。只動經典度，冷門度／硬蕊度不動。
// 用法（repo 根目錄）：node batch-progress/apex-rebalance-20261103/classic5-h.mjs --seed --manifest --catalog [--push] [--verify]
import fs from 'node:fs';
const D = 'batch-progress/apex-rebalance-20261103/';
const SRC = 'manual:hall-expansion-20261103', AT = '2026-11-03T00:00:00Z';
const J = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const rarityOf = (c, o, a) => { const s = c + a + (o >= 5 ? 1 : 0); return s >= 9 ? 'legendary' : s >= 8 ? 'epic' : s >= 7 ? 'uncommon' : s >= 6 ? 'rare' : 'common'; };
const arg = k => process.argv.includes(k);
const list = J(D + 'apply-h.json').filter(x => x.new.classic < 5);
const L = new Map(list.map(x => [x.key, x]));
const NOTE = '店主 2026-11-03 定案殿堂擴充：殿堂最低門檻 classic=5，經典度由 {c} 調為 5（只動經典度）';

if (arg('--seed')) {
  const raw = fs.readFileSync('seed_cards.json', 'utf8'), before = JSON.parse(raw);
  const eol = raw.includes('],\r\n[') ? ',\r\n' : ',\n', tail = /\r?\n$/.exec(raw)?.[0] || '';
  const render = rows => '[' + rows.map(r => JSON.stringify(r)).join(eol) + ']' + tail;
  if (render(before) !== raw) throw new Error('seed 排版自檢失敗');
  let hits = 0, already = 0;
  const after = before.map(r => {
    const x = L.get(r[0] + '|' + r[1]); if (!x) return r;
    if (r[8] !== 'hall') throw new Error('不是殿堂 ' + x.key);
    if (r[2] === 5) { already++; return r; }
    if (r[2] !== x.old.classic) throw new Error('經典度與 build 時不同 ' + x.key);
    hits++; const n = [...r]; n[2] = 5; return n;
  });
  // 三道防呆：總筆數不變、命中＝16、逐列只動第 3 欄
  if (after.length !== before.length) throw new Error('總筆數變了');
  if (hits + already !== list.length) throw new Error(`命中 ${hits}+${already} ≠ ${list.length}`);
  for (let i = 0; i < before.length; i++) {
    const b = [...before[i]], a = [...after[i]];
    if (L.has(b[0] + '|' + b[1])) { b[2] = 5; }
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('範圍外變動 ' + before[i][0]);
  }
  const out = render(after); if (out !== raw) fs.writeFileSync('seed_cards.json', out);
  console.log(`seed：改 ${hits}（已是 5 的 ${already}）`);
}

if (arg('--manifest')) {
  const files = fs.readdirSync('.').filter(f => /^onboarding-manifest-.*\.json$/.test(f)).sort();
  let n = 0; const seen = new Set();
  for (const f of files) {
    const b = (f.match(/^onboarding-manifest-(add-.*?)-\d{8}b?\.json$/) || [])[1];
    const paths = [f]; if (b && fs.existsSync(`batch-progress/${b}/onboarding-manifest.json`)) paths.push(`batch-progress/${b}/onboarding-manifest.json`);
    for (const p of paths) {
      const raw = fs.readFileSync(p, 'utf8'), m = JSON.parse(raw); let k = 0;
      const ind = (raw.match(/^\{\r?\n( +|\t)/) || [, ' '])[1];
      for (const a of m.albums || []) {
        const x = L.get(a.artist + '|' + a.album); if (!x) continue; seen.add(x.key);
        const r = a.ratings || {}; if (r.classic === 5) continue;
        const { previous, ...prev } = r;
        a.ratings = { ...r, classic: 5, source: SRC, checkedAt: AT, note: NOTE.replace('{c}', r.classic), previous: { ...prev, rarity: a.rarity } };
        a.rarity = rarityOf(5, r.obscurity, r.accessibility); k++;
      }
      if (k) { fs.writeFileSync(p, JSON.stringify(m, null, ind) + (raw.endsWith('\n') ? '\n' : '')); n += k; }
    }
  }
  console.log(`manifest：改 ${n} 筆｜16 張中有 manifest 的 ${seen.size}`);
}

const FS = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const FKEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const idOf = k => k.toLowerCase().replace(/\//g, '-').trim();
if (arg('--push')) {
  let ok = 0; const fail = [];
  for (const x of list) {
    const rar = rarityOf(5, x.new.obscurity, x.new.accessibility);
    const url = `${FS}${encodeURIComponent(idOf(x.key))}?updateMask.fieldPaths=classic&updateMask.fieldPaths=rarity&currentDocument.exists=true&key=${FKEY}`;
    const r = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { classic: { integerValue: '5' }, rarity: { stringValue: rar } } }) });
    if (r.ok) ok++; else fail.push(x.key + ' ' + r.status);
  }
  console.log(`card_catalog：${ok}／${list.length}｜失敗 ${fail.length}`, fail);
}
if (arg('--verify')) {
  let ok = 0;
  for (const x of list) {
    const f = (await (await fetch(FS + encodeURIComponent(idOf(x.key)) + '?key=' + FKEY)).json()).fields || {};
    const good = f.classic?.integerValue === '5' && f.rarity?.stringValue === rarityOf(5, x.new.obscurity, x.new.accessibility) && f.tier?.stringValue === 'hall';
    if (good) ok++; else console.log('✗', x.key, JSON.stringify({ c: f.classic, r: f.rarity, t: f.tier }));
  }
  console.log(`讀回 ${ok}／${list.length}`);
}
