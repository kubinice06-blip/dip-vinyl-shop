// 研究層交件後主線汰換：從卡單與研究稿移除指定卡，存進 batch-progress/<批>/dropped-{cards,research}.json。冪等。
//   node batch-progress/mood-cells-20261022/drop-research-ml78.mjs add-20261106-ml79 "藝人|盤名=理由" ...
import fs from 'node:fs';
const [batch, ...specs] = process.argv.slice(2);
const n = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const CF = `desc-tools/batches/cards/${batch}-cards.json`, D = `batch-progress/${batch}/`;
const rd = (f, d) => fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : d;
let cards = rd(CF), dc = rd(D + 'dropped-cards.json', []), dr = rd(D + 'dropped-research.json', []);
for (const s of specs) {
  const [ab, reason] = s.split('='); const [a, b] = ab.split('|');
  const c = cards.find(x => n(x.artist) === n(a) && n(x.album) === n(b));
  if (!c) { console.log('（已汰或不在卡單）', ab); continue; }
  cards = cards.filter(x => x !== c); dc.push({ ...c, dropReason: reason });
  for (const f of fs.readdirSync('desc-tools/batches/research').filter(f => f.startsWith(batch + '-'))) {
    const p = 'desc-tools/batches/research/' + f; const r = rd(p); const hit = r.find(x => x.key === c.key);
    if (hit) { dr.push({ ...hit, dropReason: reason }); fs.writeFileSync(p, JSON.stringify(r.filter(x => x.key !== c.key), null, 1)); }
  }
  console.log('汰', c.key, '—', reason);
}
fs.writeFileSync(CF, JSON.stringify(cards, null, 1)); fs.writeFileSync(D + 'dropped-cards.json', JSON.stringify(dc, null, 1)); fs.writeFileSync(D + 'dropped-research.json', JSON.stringify(dr, null, 1));
console.log(batch, '剩', cards.length);
