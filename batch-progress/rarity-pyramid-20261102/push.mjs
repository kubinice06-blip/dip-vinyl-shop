#!/usr/bin/env node
// 推 card-catalog-patches.json：PATCH 只帶 updateMask=rarity，加 currentDocument.exists=true（不存在的文件不會被建出空殼）。
// 用法：node batch-progress/rarity-pyramid-20261102/push.mjs [patches.json]
import fs from 'node:fs';
const F = 'https://firestore.googleapis.com/v1/projects/price-manager-e8846/databases/(default)/documents/card_catalog/';
const KEY = 'AIzaSyBpR5XKKHwT_eQoShtBPtFNRXz4ymzPWQg';
const patches = JSON.parse(fs.readFileSync(process.argv[2] || 'batch-progress/rarity-pyramid-20261102/card-catalog-patches.json', 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function one(p) {
  const url = `${F}${encodeURIComponent(p.docId)}?updateMask.fieldPaths=rarity&currentDocument.exists=true&key=${KEY}`;
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
  while (cur < patches.length) { const p = patches[cur++]; const e = await one(p); if (e) fails.push([p.docId, e]); else ok++; if ((ok + fails.length) % 1000 === 0) process.stderr.write(`\r${ok + fails.length}`); }
}));
console.log(`\n成功 ${ok}／${patches.length}｜失敗 ${fails.length}`);
for (const f of fails.slice(0, 30)) console.log('✗', ...f);
