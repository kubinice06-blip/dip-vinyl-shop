#!/usr/bin/env node
// 推 publish-stage/audit-20261102/card-catalog-patches.json：PATCH 帶各筆 updateMask＋currentDocument.exists=true（不建空殼）。
// mask 裡有、body 沒帶的欄位（降級卡的 tier／apex）會被刪除。
// 用法：node batch-progress/audit-20261102/push-catalog.mjs [--verify N]
import fs from 'node:fs';
const F = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const KEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const patches = JSON.parse(fs.readFileSync('publish-stage/audit-20261102/card-catalog-patches.json', 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const vi = parseInt((process.argv[process.argv.indexOf('--verify') + 1]) || '0', 10);
if (process.argv.includes('--verify')) {
  // 抽 N 張讀回：降級／升級／只改三軸各取一部分
  const pick = []; const groups = [patches.filter(p => !p.body.fields.tier && p.body.fields.seed), patches.filter(p => p.body.fields.tier), patches.filter(p => !p.body.fields.tier && !p.body.fields.seed)];
  for (let i = 0; pick.length < vi; i++) { const g = groups[i % 3]; if (g.length) pick.push(g[Math.floor(Math.random() * g.length)]); }
  let ok = 0;
  for (const p of pick) {
    const d = await (await fetch(F + encodeURIComponent(p.docId) + '?key=' + KEY)).json(); const f = d.fields || {};
    const want = p.body.fields; const bad = [];
    for (const k of ['classic', 'obscurity', 'accessibility']) if (f[k]?.integerValue !== want[k].integerValue) bad.push(k);
    if (f.rarity?.stringValue !== want.rarity.stringValue) bad.push('rarity');
    if ((f.tier?.stringValue || null) !== (want.tier?.stringValue || null)) bad.push('tier');
    if ((f.apex?.booleanValue || false) !== (want.apex?.booleanValue || false)) bad.push('apex');
    console.log(bad.length ? '✗' : '✓', p.key, want.tier?.stringValue || '-', want.classic.integerValue + '/' + want.obscurity.integerValue + '/' + want.accessibility.integerValue, want.rarity.stringValue, bad.join(','));
    if (!bad.length) ok++;
  }
  console.log(`讀回 ${ok}／${pick.length} 一致`); process.exit(ok === pick.length ? 0 : 1);
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
