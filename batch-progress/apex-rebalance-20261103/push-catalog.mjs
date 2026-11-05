#!/usr/bin/env node
// 推 publish-stage/apex-rebalance-20261103/card-catalog-patches.json：PATCH 帶各筆 updateMask＋currentDocument.exists=true（不建空殼）。
// mask 裡有、body 沒帶的欄位（降級卡的 tier／apex）會被刪除。
// 用法：node batch-progress/apex-rebalance-20261103/push-catalog.mjs            # 推送
//       node batch-progress/apex-rebalance-20261103/push-catalog.mjs --verify 15 # 隨機抽 N 張讀回（升／降各半）
//       node batch-progress/apex-rebalance-20261103/push-catalog.mjs --relist     # 整份 card_catalog 重列，比對 202 張＋全池頂點旗標與 seed 第 9 欄
import fs from 'node:fs';
const BASE = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/';
const F = BASE + 'card_catalog/';
const KEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const patches = JSON.parse(fs.readFileSync('publish-stage/apex-rebalance-20261103/card-catalog-patches.json', 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const check = (f, want) => {
  const bad = [];
  if (f.rarity?.stringValue !== want.rarity.stringValue) bad.push('rarity');
  if ((f.tier?.stringValue || null) !== (want.tier?.stringValue || null)) bad.push('tier');
  if ((f.apex?.booleanValue || false) !== (want.apex?.booleanValue || false)) bad.push('apex');
  if (want.seed && f.seed?.booleanValue !== true) bad.push('seed');
  return bad;
};
if (process.argv.includes('--verify')) {
  const vi = parseInt(process.argv[process.argv.indexOf('--verify') + 1] || '15', 10);
  const groups = [patches.filter(p => p.body.fields.tier), patches.filter(p => !p.body.fields.tier)].map(g => [...g].sort(() => Math.random() - 0.5));
  const pick = []; for (let i = 0; pick.length < vi; i++) { const g = groups[i % 2]; if (g.length) pick.push(g.shift()); }
  let ok = 0;
  for (const p of pick) {
    const d = await (await fetch(F + encodeURIComponent(p.docId) + '?key=' + KEY)).json();
    const bad = check(d.fields || {}, p.body.fields);
    console.log(bad.length ? '✗' : '✓', p.key, p.body.fields.tier?.stringValue || '-', p.body.fields.rarity.stringValue, bad.join(','));
    if (!bad.length) ok++;
  }
  console.log(`讀回 ${ok}／${pick.length} 一致`); process.exit(ok === pick.length ? 0 : 1);
}
if (process.argv.includes('--relist')) {
  const docs = new Map(); let tok = '';
  do {
    const u = `${F}?pageSize=1000&mask.fieldPaths=tier&mask.fieldPaths=apex&mask.fieldPaths=rarity&mask.fieldPaths=seed&key=${KEY}` + (tok ? '&pageToken=' + encodeURIComponent(tok) : '');
    let d; for (let i = 1; i <= 5; i++) { try { d = await (await fetch(u, { signal: AbortSignal.timeout(60000) })).json(); if (d.documents || d.nextPageToken !== undefined || !d.error) break; } catch { } await sleep(2000 * i); }
    for (const x of d.documents || []) { const id = x.name.split('/card_catalog/')[1]; let k; try { k = decodeURIComponent(id); } catch { k = id; } docs.set(k, x.fields || {}); };
    tok = d.nextPageToken || '';
  } while (tok);
  let bad = 0, missing = 0;
  for (const p of patches) { const f = docs.get(p.docId); if (!f) { missing++; console.log('缺', p.docId); continue; } const b = check(f, p.body.fields); if (b.length) { bad++; console.log('✗', p.key, b.join(',')); } }
  // 全池：seed 第 9 欄 vs card_catalog tier
  const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
  const idOf = (a, b) => `${a}|${b}`.toLowerCase().replace(/\//g, '-').trim();
  let poolBad = 0; const cnt = {};
  for (const r of seed) { const f = docs.get(idOf(r[0], r[1])); if (!f) continue; const t = f.tier?.stringValue || null; if (t) cnt[t] = (cnt[t] || 0) + 1; if (t !== (r[8] || null)) { poolBad++; if (poolBad <= 20) console.log('池不符', r[0] + '|' + r[1], 'seed', r[8] || null, 'catalog', t); } }
  console.log(`重列 ${docs.size} 文件｜202 張：不符 ${bad}、缺 ${missing}｜全池 seed↔catalog tier 不符 ${poolBad}｜catalog 池內頂點`, cnt);
  process.exit(bad || missing ? 1 : 0);
}
async function one(p) {
  const url = `${F}${encodeURIComponent(p.docId)}?${p.updateMask.map(m => 'updateMask.fieldPaths=' + m).join('&')}&currentDocument.exists=true&key=${KEY}`;
  for (let i = 1; i <= 5; i++) {
    try {
      const r = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p.body), signal: AbortSignal.timeout(20000) });
      if (r.ok) return null;
      const t = (await r.text()).slice(0, 160);
      if ((r.status === 429 || r.status >= 500) && i < 5) { await sleep(1500 * i); continue; }
      return `${r.status} ${t}`;
    } catch (e) { if (i < 5) { await sleep(1500 * i); continue; } return String(e.message || e).slice(0, 160); }
  }
}
let cur = 0, ok = 0; const fails = [];
await Promise.all(Array.from({ length: 8 }, async () => {
  while (cur < patches.length) { const p = patches[cur++]; const e = await one(p); if (e) fails.push([p.docId, e]); else ok++; }
}));
console.log(`成功 ${ok}／${patches.length}｜失敗 ${fails.length}`);
for (const f of fails.slice(0, 30)) console.log('✗', ...f);
