// 把每批卡單切成研究層五組（a–e）。分組檔放 batches/cards/<批名>-<g>.json，
// 讓每個代理拿到明確的卡單，不必靠「第幾到第幾張」這種容易錯位的指示。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const DIR = path.join(ROOT, 'desc-tools/batches/cards');
const batch = process.argv[2];
if (!batch) { console.error('用法: node split-groups.mjs <批名>'); process.exit(1); }
const cards = JSON.parse(fs.readFileSync(path.join(DIR, `${batch}-cards.json`), 'utf8'));
const G = ['a', 'b', 'c', 'd', 'e'];
const size = Math.ceil(cards.length / G.length);
for (let i = 0; i < G.length; i++) {
  const part = cards.slice(i * size, (i + 1) * size);
  if (!part.length) continue;
  fs.writeFileSync(path.join(DIR, `${batch}-${G[i]}.json`), JSON.stringify(part, null, 1));
  console.log(`  ${batch}-${G[i]}.json：${part.length} 張（${part[0].artist} … ${part[part.length - 1].artist}）`);
}
