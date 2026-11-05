// 補策展後擴卡單：保留既有卡的研究組別，新卡給指定組。用法：node extend-cards.mjs <批> <master> <新組字母>
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const [batch, master, g] = process.argv.slice(2);
const D = `batch-progress/${batch}/`, CF = `desc-tools/batches/cards/${batch}-cards.json`;
const old = JSON.parse(fs.readFileSync(CF, 'utf8')); const og = new Map(old.map(c => [c.key, c.group]));
const m = JSON.parse(fs.readFileSync(master, 'utf8'));
fs.writeFileSync(D + 'pick.json', JSON.stringify(m.map(x => x.artist + '|' + x.album), null, 1));
execFileSync('node', ['batch-progress/mood-cells-20261022/build-cards.mjs', batch, D + 'pick.json', master], { stdio: 'inherit' });
const c = JSON.parse(fs.readFileSync(CF, 'utf8'));
for (const x of c) { x.group = og.get(x.key) || g; x.scene = x.scene.replace('薄細項策展線', '新頂點盤線（異端）'); }
fs.writeFileSync(CF, JSON.stringify(c, null, 1));
console.log(batch, c.length, JSON.stringify(c.reduce((o, x) => (o[x.group] = (o[x.group] || 0) + 1, o), {})));
