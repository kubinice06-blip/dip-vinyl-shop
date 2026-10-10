#!/usr/bin/env node
// 回讀一波上架寫進 KV 的固定簡介：publish-stage/kv-<批>-<stamp>.json 的每個鍵都要逐字一致。
// 用法：node scripts/verify-wave-kv.mjs <stamp> <批名...>
// KV 寫入後 10–30 秒內 bulk get 可能讀到舊值——第一次不符先等半分鐘再跑一次。
import fs from 'node:fs';
const [stamp, ...batches] = process.argv.slice(2);
const ACC = '3a23f905e8f31d91c85050f2ed304321', NS = '5f65e74b17d644b68a3f542b08a5c105';
let tot = 0, ok = 0; const bad = [];
for (const b of batches) {
  const f = `publish-stage/kv-${b}-${stamp}.json`; if (!fs.existsSync(f)) { console.log(`? 沒有 ${f}`); continue; }
  const puts = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (let i = 0; i < puts.length; i += 90) {
    const part = puts.slice(i, i + 90);
    const j = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACC}/storage/kv/namespaces/${NS}/bulk/get`, {
      method: 'POST', headers: { Authorization: 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys: part.map(p => p.key) }) })).json();
    for (const p of part) { tot++; const v = j.result.values[p.key]; const s = v == null ? null : (typeof v === 'string' ? v : JSON.stringify(v)); if (s === p.value) ok++; else bad.push(`${b} ${p.key}`); }
  }
}
console.log(`KV 回讀 ${tot} 個鍵：逐字一致 ${ok}｜不符 ${bad.length}`);
for (const x of bad.slice(0, 20)) console.log('  ✗ ' + x);
process.exit(bad.length ? 1 : 0);
