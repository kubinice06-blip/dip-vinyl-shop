// md37／md38 去重（策展子代理與主線共用）：seed、根目錄與 batch-progress 的 manifest、data/pool-removed.json、
// 所有 desc-tools 卡單（含並行批）、mood-cells 各組 curation。鍵規則同 scripts/pool-keys.mjs（藝人互為子字串也算撞）。
//   node batch-progress/mood-cells-20261022/dedup-md37.mjs "藝人" "專輯" [--self md37a]
//   node batch-progress/mood-cells-20261022/dedup-md37.mjs --artist "藝人"     （列池中同藝人已有的卡）
//   node batch-progress/mood-cells-20261022/dedup-md37.mjs --file curation-md37a.json [--self md37a]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const norm = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const args = process.argv.slice(2);
const selfIdx = args.indexOf('--self'); const self = selfIdx >= 0 ? args[selfIdx + 1] : null;
const rows = [];
const add = (a, b, src) => rows.push([norm(a), norm(b), src, a, b]);
for (const r of J(`${R}/seed_cards.json`)) add(r[0], r[1], 'seed');
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x))) for (const a of (J(`${R}/${f}`).albums || [])) add(a.artist, a.album, f);
for (const d of fs.readdirSync(`${R}/batch-progress`)) { const p = `${R}/batch-progress/${d}/onboarding-manifest.json`; if (fs.existsSync(p)) try { for (const a of (J(p).albums || [])) add(a.artist, a.album, d); } catch {} }
try { for (const e of J(`${R}/data/pool-removed.json`).entries) add(e.artist, e.album, 'pool-removed'); } catch {}
for (const f of fs.readdirSync(`${R}/desc-tools/batches/cards`)) { try { const c = J(`${R}/desc-tools/batches/cards/${f}`); for (const x of (Array.isArray(c) ? c : [])) if (x.artist) add(x.artist, x.album, 'cards:' + f); } catch {} }
const MD = `${R}/batch-progress/mood-cells-20261022`;
for (const f of fs.readdirSync(MD).filter(x => /^curation-.*\.json$/.test(x))) {
  if (self && f === `curation-${self}.json`) continue;
  try { for (const a of (J(`${MD}/${f}`).albums || [])) add(a.artist, a.album, f); } catch {}
}
const check = (a, b) => { const A = norm(a), B = norm(b); return rows.filter(r => r[1] === B && A && r[0] && (r[0].includes(A) || A.includes(r[0]))); };
if (args[0] === '--artist') {
  const A = norm(args[1]); const hits = rows.filter(r => r[0] === A || (A.length > 4 && r[0].includes(A)));
  const seen = new Set(); for (const h of hits) { const k = h[3] + '|' + h[4]; if (seen.has(k)) continue; seen.add(k); console.log(`${h[3]}｜${h[4]}\t(${h[2]})`); }
  if (!hits.length) console.log('（池中無）');
} else if (args[0] === '--file') {
  const j = J(path.isAbsolute(args[1]) ? args[1] : `${MD}/${args[1]}`); let bad = 0;
  for (const a of j.albums) { const h = check(a.artist, a.album); if (h.length) { bad++; console.log(`撞 ${a.artist}｜${a.album} ← ${[...new Set(h.map(x => x[2]))].join(', ')}`); } }
  console.log(`共 ${j.albums.length}，撞 ${bad}`);
} else {
  const h = check(args[0], args[1]);
  console.log(h.length); for (const x of h.slice(0, 5)) console.log('  ←', x[2], x[3], '|', x[4]);
}
