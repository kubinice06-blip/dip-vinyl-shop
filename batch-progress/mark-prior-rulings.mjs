// 切進本批的 RG 若在更早批次的 rulings.md 裡出現過（多半是退件），在 slice 標出來給策展層看。
//
// ⚠ 2026-09-27（c-189 b 第 6570 條，主線第 1991-B 條）：`石川晶《Lupin III》` 的 RG
// 在 c-180 b 第 4872 條已經退過（動畫翻奏盤），jp-2 切批時又被切進來——
// jp-1 那十批的退件只寫在 rulings.md 裡，不在任何機器欄位上，`known-pool-collisions.json`
// 只收「撞池」不收「退件」。這支用 rgMbid 前 8 碼掃全部批次的 rulings.md。
// **只標不剔**：退件理由可能只適用於那一條線（例：jp-1 的「原壓不在四大廠」在 jp-2 反而成立）。
//
// 用法：node batch-progress/mark-prior-rulings.mjs c190 c191
import fs from 'node:fs';
import path from 'node:path';
const files = fs.readdirSync('batch-progress').filter(d => /^c\d+$/.test(d))
  .map(d => path.join('batch-progress', d, 'rulings.md')).filter(f => fs.existsSync(f));
const texts = files.map(f => [f, fs.readFileSync(f, 'utf8').split('\n')]);
for (const b of process.argv.slice(2)) {
  const p = `batch-progress/${b}/slice.json`;
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  let n = 0;
  for (const r of rows) {
    const k = String(r.rgMbid || '').slice(0, 8);
    if (!k) continue;
    const hits = [];
    for (const [f, lines] of texts) {
      if (f.includes(`/${b}/`)) continue;
      lines.forEach((l, i) => { if (l.includes(k) && /^## \d{4}/.test(l)) hits.push(`${f.split('/')[1]}：${l.slice(0, 140)}`); });
    }
    if (hits.length) { r.priorRulingHits = hits; n++; console.log(`[${b}] ${r.artist}《${r.album}》\n   ${hits.join('\n   ')}`); }
    else delete r.priorRulingHits;
  }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1) + '\n');
  console.log(`${b}：${n} 筆在更早批次的裁定標題裡出現過\n`);
}
