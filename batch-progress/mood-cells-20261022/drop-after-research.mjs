// 研究後汰換：從卡單與研究稿移除指定卡，存 dropped-cards.json／dropped-research.json。
//   node batch-progress/mood-cells-20261022/drop-after-research.mjs <批> "藝人|盤" ...
import fs from 'node:fs';
const [batch, ...ks] = process.argv.slice(2);
const want = new Set(ks);
const cf = `desc-tools/batches/cards/${batch}-cards.json`;
const cards = JSON.parse(fs.readFileSync(cf, 'utf8'));
const hit = cards.filter(c => want.has(c.artist + '|' + c.album));
if (hit.length !== want.size) { console.error('對不上', [...want].filter(k => !hit.some(c => c.artist + '|' + c.album === k))); process.exit(1); }
const D = `batch-progress/${batch}/`;
const prevC = fs.existsSync(D + 'dropped-cards.json') ? JSON.parse(fs.readFileSync(D + 'dropped-cards.json', 'utf8')) : [];
fs.writeFileSync(D + 'dropped-cards.json', JSON.stringify([...prevC, ...hit], null, 1));
fs.writeFileSync(cf, JSON.stringify(cards.filter(c => !hit.includes(c)), null, 1));
const keys = new Set(hit.map(c => c.key));
const prevR = fs.existsSync(D + 'dropped-research.json') ? JSON.parse(fs.readFileSync(D + 'dropped-research.json', 'utf8')) : [];
const dr = [...prevR];
for (const f of fs.readdirSync('desc-tools/batches/research').filter(f => f.startsWith(batch + '-'))) {
  const p = 'desc-tools/batches/research/' + f, r = JSON.parse(fs.readFileSync(p, 'utf8'));
  dr.push(...r.filter(x => keys.has(x.key)));
  fs.writeFileSync(p, JSON.stringify(r.filter(x => !keys.has(x.key)), null, 1));
}
fs.writeFileSync(D + 'dropped-research.json', JSON.stringify(dr, null, 1));
console.log('汰', hit.length, '剩', cards.length - hit.length);
