// 頂點重整（店主 2026-11-03）：產出四份清單供判定。
// 用法：node batch-progress/apex-rebalance-20261103/build-lists.js
const fs = require('fs'), D = 'batch-progress/apex-rebalance-20261103/', A = 'batch-progress/audit-20261102/';
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const K = r => r[0] + '|' + r[1];
const loadDir = (dir, re) => { const m = new Map(); for (const f of fs.readdirSync(dir).filter(f => re.test(f))) { let j = JSON.parse(fs.readFileSync(dir + f)); if (!Array.isArray(j)) j = Object.values(j).find(Array.isArray) || []; for (const x of j) m.set(x.key, x); } return m; };
const v = loadDir(A + 'verdicts/', /-\d+-\d+\.json$/); for (const f of ['H01.json', 'H02.json', 'H03.json']) for (const x of JSON.parse(fs.readFileSync(A + 'verdicts/' + f))) v.set(x.key, x);
const z = loadDir(A + 'apex7/verdicts/', /\.json$/);
const L = new Map(); for (const f of fs.readdirSync(A + 'apex7/shards')) for (const r of JSON.parse(fs.readFileSync(A + 'apex7/shards/' + f))) { const l = r.listeners ?? r.listenersKV; if (typeof l === 'number') L.set(r.key, l); }
for (const f of fs.readdirSync(A + 'shards')) for (const r of JSON.parse(fs.readFileSync(A + 'shards/' + f))) if (typeof r.listeners === 'number' && !L.has(r.key)) L.set(r.key, r.listeners);
const row = r => ({ key: K(r), artist: r[0], album: r[1], year: r[6] ?? null, genres: r[5] ?? null, tier: r[8] || null, axes: [r[2], r[3], r[4]], listeners: L.get(K(r)) ?? null,
  audit: v.get(K(r)) ? { apex: v.get(K(r)).apex, strength: v.get(K(r)).strength, why: v.get(K(r)).why } : null,
  apex7: z.get(K(r)) ? { apex7: z.get(K(r)).apex7, strength: z.get(K(r)).strength, why: z.get(K(r)).why } : null });
// 1) 同藝人多張頂點：分組
const apex = seed.filter(r => r[8]); const byArt = new Map();
for (const r of apex) { if (!byArt.has(r[0])) byArt.set(r[0], []); byArt.get(r[0]).push(row(r)); }
const dupes = [...byArt].filter(([a, rs]) => rs.length > 1).map(([artist, cards]) => ({ artist, cards }));
fs.writeFileSync(D + 'dupes.json', JSON.stringify(dupes, null, 1));
const apexArtists = new Set(byArt.keys());
// 2) 殿堂備選：非頂點卡，稽核或 7 星重審判過 hall（含原殿堂被降級的），藝人不在任何頂點裡
const hallAlt = seed.filter(r => !r[8] && !apexArtists.has(r[0]) && ((v.get(K(r)) || {}).apex === 'hall' || (z.get(K(r)) || {}).apex7 === 'hall' || r[2] >= 5)).map(row);
fs.writeFileSync(D + 'hall-alternates.json', JSON.stringify(hallAlt));
// 3) 異端候選：非頂點卡，硬蕊度 5 或稽核／重審判過 heresy，藝人不在任何頂點裡
const herAlt = seed.filter(r => !r[8] && !apexArtists.has(r[0]) && (r[4] >= 5 || (v.get(K(r)) || {}).apex === 'heresy' || (z.get(K(r)) || {}).apex7 === 'heresy')).map(row);
fs.writeFileSync(D + 'heresy-candidates.json', JSON.stringify(herAlt));
// 4) 流亡候選：非頂點卡，冷門度 5，藝人不在任何頂點裡（listeners 由判定階段從 worker 補）
const pearlAlt = seed.filter(r => !r[8] && !apexArtists.has(r[0]) && r[3] >= 5).map(row);
fs.writeFileSync(D + 'pearl-candidates.json', JSON.stringify(pearlAlt));
const dupeExtra = dupes.reduce((s, d) => s + d.cards.length - 1, 0);
console.log('apex', apex.length, 'artists', byArt.size, 'dupe artists', dupes.length, 'cards to drop', dupeExtra);
console.log('hall alternates', hallAlt.length, 'artists', new Set(hallAlt.map(x => x.artist)).size);
console.log('heresy candidates', herAlt.length, 'artists', new Set(herAlt.map(x => x.artist)).size);
console.log('pearl candidates', pearlAlt.length, 'artists', new Set(pearlAlt.map(x => x.artist)).size, 'with listeners', pearlAlt.filter(x => x.listeners != null).length);
console.log('濁水溪', seed.filter(r => r[0].includes('濁水溪')).map(r => r[1] + ':' + (r[8] || '-') + ':' + r.slice(2, 5).join('/')).join(' | '));
