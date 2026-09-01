// hookCandidates 上限是 2（qa-batch 的規則），但我給研究代理的提示寫成「2–3 個」，
// 是提示寫錯不是代理寫錯。這裡把多出來的裁掉，保留前兩條（代理是照偏好排序的）。
import fs from 'node:fs';
let total = 0;
for (const g of ['a', 'b', 'c']) {
  const p = `desc-tools/batches/research/c52-${g}.json`;
  if (!fs.existsSync(p)) { console.log(`  ${g}: 尚未交件，略過`); continue; }
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  let n = 0;
  for (const r of rows) if (Array.isArray(r.hookCandidates) && r.hookCandidates.length > 2) {
    r.hookCandidates = r.hookCandidates.slice(0, 2); n++;
  }
  if (n) { fs.writeFileSync(p, JSON.stringify(rows, null, 1)); total += n; }
  console.log(`  ${g}: ${rows.length} 張，裁剪 ${n} 筆`);
}
console.log(`合計裁剪 ${total} 筆`);
