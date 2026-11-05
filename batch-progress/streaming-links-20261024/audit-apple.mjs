import fs from 'node:fs';
const norm = v => String(v || '').normalize('NFKD').toLowerCase().replace(/[̀-ͯ]/g, '');
const src = fs.readFileSync('dip-player.js', 'utf8');
const fn = src.match(/function normalizePreviewText\(value\) \{([\s\S]*?)\n  \}/)[1];
const normalizePreviewText = new Function('value', fn);
const key = (a, b) => `${normalizePreviewText(a)}\u0000${normalizePreviewText(b)}`;
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const rt = JSON.parse(fs.readFileSync('data/apple-audio-runtime-v1.json', 'utf8')).entries;
const mp = JSON.parse(fs.readFileSync('data/apple-audio-map-v1.json', 'utf8')).entries;
const mpBy = new Map(Object.values(mp).map(e => [key(e.artist, e.album), e]));
let have = 0; const miss = []; const st = {};
for (const r of seed) { const k = key(r[0], r[1]); if (rt[k]) { have++; continue; } const e = mpBy.get(k); const s = e?.status || '（索引沒列）'; st[s] = (st[s] || 0) + 1; miss.push([r[0], r[1], s, (e?.notes || []).join(',')]); }
console.log('卡池', seed.length, 'Apple 有直連', have, '灰', miss.length, JSON.stringify(st));
console.log(miss.filter(m => /Wun Two|Fishmans/.test(m[0])));
fs.writeFileSync(process.argv[2], JSON.stringify(miss));
