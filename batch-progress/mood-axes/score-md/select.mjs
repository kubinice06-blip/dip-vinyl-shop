// 情緒薄格策展線 md1–md4 新卡上線當天補情緒三軸（HANDOFF-mood-cells-line §二第 9 步）。
//   做法同 score-ts：seed 裡尚未評分的卡；本批只取指定批卡單上的卡，一批一份工單。
//   node batch-progress/mood-axes/score-md/select.mjs add-20261022-md1   → chunk-md1.json
import fs from 'node:fs';
const R = p => new URL(p, import.meta.url);
const batch = process.argv[2], tag = batch.split('-').pop();
const seed = JSON.parse(fs.readFileSync(R('../../../seed_cards.json'), 'utf8'));
const subs = JSON.parse(fs.readFileSync(R('../../../card-subgenres.json'), 'utf8'));
const want = new Set(JSON.parse(fs.readFileSync(R(`../../../desc-tools/batches/cards/${batch}-cards.json`), 'utf8')).map(c => c.artist + '|' + c.album));
const idOf = (a, b) => ((a || '') + '|' + (b || '')).toLowerCase().replace(/\//g, '-').trim();
const done = new Set(JSON.parse(fs.readFileSync(R('../anchors-v1.json'), 'utf8')).anchors.map(a => idOf(a.artist, a.album)));
for (const f of ['../score500/scored-500.json', '../score3000/scored-3000.json', '../score10k/scored-10k.json', '../score-rest/scored-rest.json', '../score-ts/scored-ts.json', '../score-ts2/scored-ts2.json'])
  for (const s of JSON.parse(fs.readFileSync(R(f), 'utf8'))) done.add(s.id);
const cards = seed.filter(r => want.has(r[0] + '|' + r[1])).map(r => ({ id: idOf(r[0], r[1]), artist: r[0], album: r[1], year: r[6] || null, genres: r[5] || [], sub: subs[r[0] + '|' + r[1]] || [] }))
  .filter(c => !done.has(c.id))
  .sort((a, b) => (a.genres[0] || '~').localeCompare(b.genres[0] || '~') || (a.sub[0] || '~').localeCompare(b.sub[0] || '~') || a.artist.localeCompare(b.artist) || (a.year || 0) - (b.year || 0));
fs.writeFileSync(R(`./chunk-${tag}.json`), JSON.stringify(cards, null, 1));
console.log(batch, 'want', want.size, 'chunk', cards.length);
