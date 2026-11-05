// 去重：node batch-progress/mood-cells-20261022/dupchk.mjs "藝人" "專輯" ["藝人2" "專輯2" ...]
// 比對 seed_cards（藝人互為子字串＋同盤名）、onboarding-manifest-*、data/pool-removed.json、所有 curation-*.json 提名；另列池中同藝人卡數與 v0 三軸。
import fs from 'node:fs'; import path from 'node:path';
const R = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const rows = [];
for (const r of J(R + '/seed_cards.json')) rows.push([r[0], r[1], 'seed']);
for (const f of fs.readdirSync(R).filter(x => /^onboarding-manifest-.*json$/.test(x))) for (const a of (J(R + '/' + f).albums || [])) rows.push([a.artist, a.album, 'manifest']);
const rm = J(R + '/data/pool-removed.json').entries; for (const e of (Array.isArray(rm) ? rm : Object.values(rm))) { const k = typeof e === 'string' ? e : (e.key || ''); const [a, b] = k.includes('|') ? k.split('|') : [e.artist, e.album]; rows.push([a, b, 'removed']); }
const D = R + '/batch-progress/mood-cells-20261022/';
for (const f of fs.readdirSync(D).filter(x => /^curation-.*\.json$/.test(x))) { try { for (const a of J(D + f).albums || []) rows.push([a.artist, a.album, f]); } catch {} }
const mv = J(R + '/data/mood/card-moods-v0.json').cards || {};
const a = process.argv.slice(2);
for (let i = 0; i < a.length; i += 2) {
  const A = n(a[i]), B = n(a[i + 1]);
  const hit = rows.filter(([x, y]) => n(y) === B && (n(x).includes(A) || A.includes(n(x)))).map(r => r[2]);
  const same = Object.entries(mv).filter(([k]) => n(k.split('|')[0]) === A).map(([k, v]) => `${k.split('|')[1]}(${v[0]},${v[1]},${v[2]})`);
  console.log(`${hit.length ? 'DUP ' + [...new Set(hit)].join(',') : 'OK'}\t${a[i]}《${a[i + 1]}》\t池中同人 ${same.length}${same.length ? '：' + same.slice(0, 6).join('；') : ''}`);
}
