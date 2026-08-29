// 年份調和：研究層的 yearVerified.year 是卡片年份的權威來源
// （research-base：「卡片上架的年份直接讀這欄」），策展層的 suggestedYear 只是開工假設。
// 兩者落差一律列出，並把候選檔改成研究層的值、在 yearNote 記錄原值與依據。
// 用法：node batch-progress/reconcile-year.mjs <批名> <候選檔...>   加 --write 才改檔
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const write = process.argv.includes('--write');
const [batch, ...files] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const RES = path.join(ROOT, 'desc-tools/batches/research');

const yv = new Map();
for (const g of ['a', 'b', 'c', 'd', 'e']) {
  const f = path.join(RES, `${batch}-${g}.json`);
  if (!fs.existsSync(f)) continue;
  for (const r of JSON.parse(fs.readFileSync(f, 'utf8'))) yv.set(`${r.artist}|${r.album}`, r.yearVerified || null);
}

let diff = 0, missing = 0, total = 0;
for (const f of files) {
  const p = path.join(ROOT, f);
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const a of j.albums || []) {
    total++;
    const v = yv.get(`${a.artist}|${a.album}`);
    if (!v) { missing++; console.log(`  ？ 無研究稿年份：${a.artist} — ${a.album}`); continue; }
    if (v.year != null && v.year !== a.suggestedYear) {
      console.log(`  ✎ ${a.artist} — ${a.album}：${a.suggestedYear} → ${v.year}`);
      console.log(`      依據：${String(v.note || '').slice(0, 140)}`);
      a.yearNote = `${a.yearNote || ''}｜【研究層覆核】原策展值 ${a.suggestedYear}，改用 ${v.year}（錄音 ${v.recorded ?? '?'}／首發 ${v.firstRelease ?? '?'}）：${v.note || ''}`.replace(/^｜/, '');
      a.suggestedYear = v.year;
      diff++;
    }
    a.yearVerified = v;
  }
  if (write) fs.writeFileSync(p, JSON.stringify(j, null, 1));
}
console.log(`\n檢查 ${total} 張｜年份改動 ${diff}｜無研究稿 ${missing}｜${write ? '已寫回' : '（乾跑）'}`);
