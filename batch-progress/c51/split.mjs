// 把 378 位目標藝人切成五組派給策展代理。依主曲風分組，讓每組的判斷脈絡一致
// （爵士的「代表作」與電子的「代表作」是兩套標準）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';
const t = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/c51/targets.json'), 'utf8'));
// 只派 ≤2 張的（缺口最深），3 張的留給下一批
const pool = t.filter(x => x.cards <= 2);
const GROUPS = {
  a: ['rock'], b: ['electronic', 'hiphop'], c: ['jazz', 'blues'],
  d: ['folk', 'pop', 'soul'], e: ['world', 'classical'],
};
const assigned = new Set(), out = {};
for (const [g, gs] of Object.entries(GROUPS)) {
  out[g] = pool.filter(x => !assigned.has(x.artist) && x.genres.some(y => gs.includes(y)));
  out[g].forEach(x => assigned.add(x.artist));
}
const rest = pool.filter(x => !assigned.has(x.artist));
rest.forEach((x, i) => out[Object.keys(GROUPS)[i % 5]].push(x));
for (const [g, list] of Object.entries(out)) {
  fs.writeFileSync(path.join(ROOT, `batch-progress/c51/cur-${g}.json`), JSON.stringify(list, null, 1));
  console.log(`cur-${g}.json：${list.length} 位｜${[...new Set(list.flatMap(x => x.genres))].join('/')}`);
}
console.log(`\n合計 ${Object.values(out).reduce((s, l) => s + l.length, 0)} 位（≤2 張者；3 張的 ${t.length - pool.length} 位留下批）`);
