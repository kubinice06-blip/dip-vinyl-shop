import fs from 'node:fs';
const b = process.argv[2];
const R = p => { const j = JSON.parse(fs.readFileSync(p, 'utf8')); return Array.isArray(j) ? j : Object.values(j); };
const cards = R(`desc-tools/batches/cards/${b}-cards.json`);
const keys = new Set(cards.map(c => `${c.artist}|${c.album}`));
const caa = R(`batch-progress/${b}/caa.json`);
const cov = caa.filter(r => keys.has(`${r.artist}|${r.album}`) && r.art?.url);
const noCov = cards.filter(c => !cov.some(r => r.artist === c.artist && r.album === c.album)).map(c => c.album);
const pv = JSON.parse(fs.readFileSync('batch-progress/probe/previews.json', 'utf8'));
const ready = cards.filter(c => pv[`${c.artist}|${c.album}`]?.status === 'ready');
const noSrc = cards.filter(c => pv[`${c.artist}|${c.album}`]?.status !== 'ready').map(c => c.album);
const rec = ready.filter(c => pv[`${c.artist}|${c.album}`]?.recoveredBy).length;
const L = [];
for (const n of [1, 2]) for (const r of R(`desc-tools/batches/output/${b}-out-${n}.json`)) L.push(Array.from(r.desc).length);
const L1 = R(`desc-tools/batches/output/${b}-out-1.json`).map(r => Array.from(r.desc).length);
const L2 = R(`desc-tools/batches/output/${b}-out-2.json`).map(r => Array.from(r.desc).length);
const st = {}; for (const n of [1, 2]) for (const r of R(`desc-tools/batches/input/${b}-writer-${n}.json`)) st[r.status] = (st[r.status] || 0) + 1;
console.log(JSON.stringify({ cards: cards.length, a: cards.filter(c => c.group === 'a').length, b: cards.filter(c => c.group === 'b').length,
  pinned: cards.filter(c => /pinned/i.test(String(c.identitySource))).length, apex: cards.filter(c => c.apex).length,
  exc: cards.filter(c => c.exceptionReason || c.genreException).length, covers: cov.length, noCov, ready: ready.length, rec, noSrc,
  desc: `${Math.min(...L)}–${Math.max(...L)}`, a_desc: `${Math.min(...L1)}–${Math.max(...L1)}`, b_desc: `${Math.min(...L2)}–${Math.max(...L2)}`, status: st }, null, 1));
