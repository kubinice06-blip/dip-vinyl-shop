// 每日批次：把 spotify.jsonl 裡 v2 規則找到、還沒寫進 KV 的列整理成 plan-spotify-<N>.json；edition 類另列出來給主線過目
import fs from 'node:fs';
const D = new URL('.', import.meta.url).pathname;
const applied = new Set();
for (const f of fs.readdirSync(D)) if (/^applied-.*\.json$/.test(f)) for (const p of JSON.parse(fs.readFileSync(D + f, 'utf8'))) applied.add(p.key);
const rows = new Map();
for (const l of fs.readFileSync(D + 'spotify.jsonl', 'utf8').split('\n')) if (l.trim()) { const r = JSON.parse(l); rows.set(r.key, r); }
const plan = [...rows.values()].filter(r => r.v2 && r.url && !applied.has(r.key)).map(r => ({ key: r.key, url: r.url, via: 'spotify-v2-' + r.how }));
const n = fs.readdirSync(D).filter(f => /^plan-spotify-\d+\.json$/.test(f)).length + 1;
const file = `plan-spotify-${n}.json`;
fs.writeFileSync(D + file, JSON.stringify(plan, null, 1));
console.log(`${file}: ${plan.length}（exact ${plan.filter(p => p.via.endsWith('exact')).length}、edition ${plan.filter(p => p.via.endsWith('edition')).length}）`);
for (const r of [...rows.values()].filter(r => r.v2 && r.url && !applied.has(r.key) && r.how === 'edition')) console.log(`  edition: ${r.artist} — ${r.album}（${r.year}）→ ${r.spName}（${r.spYear}）`);
console.log(`剩餘未找到：${[...rows.values()].filter(r => !r.url).length}`);
