// 把 CAA 重跑的結果併回卡單。不重跑 make-cards.mjs——那會把已落實的裁定
//（年份、策展理由、pinned 升級、封面版本存疑標記）全部洗掉。
import fs from 'node:fs';
const cards = JSON.parse(fs.readFileSync('desc-tools/batches/cards/c52-cards.json', 'utf8'));
const caa = JSON.parse(fs.readFileSync('batch-progress/c52/caa.json', 'utf8'));
const byKey = new Map(caa.map(r => [r.artist + '|' + r.album, r]));
let n = 0;
for (const c of cards) {
  const hit = byKey.get(c.artist + '|' + c.album);
  if (!hit?.art) continue;
  const next = { url: hit.art.url, source: hit.art.source };
  if (JSON.stringify(c.cover) === JSON.stringify(next)) continue;
  c.cover = next; n++;
}
fs.writeFileSync('desc-tools/batches/cards/c52-cards.json', JSON.stringify(cards, null, 1));
console.log(`更新封面 ${n} 張｜總計有封面 ${cards.filter(c => c.cover).length}／${cards.length}`);
console.log(`釘住身分 ${cards.filter(c => c.rgMbid).length}｜人工身分 ${cards.filter(c => !c.rgMbid).length}｜封面版本存疑 ${cards.filter(c => c.coverVersionDoubt).length}`);
for (const c of cards.filter(x => !x.cover)) console.log(`  ✗ 無封面：${c.artist} 《${c.album}》`);
