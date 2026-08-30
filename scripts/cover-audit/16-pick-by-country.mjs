// 封面「版本」稽核 輔助工具：查某張卡在指定國別下最早的候選 release。
//
// 判讀時最常遇到的情況是「同視覺、但最早那筆的國別不是發行國」——例如 Iron Maiden 的
// 1980 CA/US 都有圖，英國團卻要取英版。這支就是用來把那個 releaseId 撈出來，
// 免得每次都要人工翻 edition-review.json。
//
// 用法：node scripts/cover-audit/16-pick-by-country.mjs 24:US 26:GB 30:FR
//   冒號前是 review 索引，冒號後是想要的國別（可給多個，逗號分隔，依序找）。
//   不給國別就列出該卡全部候選。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const review = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'cover-audit', 'data', 'edition-review.json'), 'utf8')).review;

for (const arg of process.argv.slice(2)) {
  const [iRaw, cRaw] = arg.split(':');
  const r = review[Number(iRaw)];
  if (!r) { console.log(`#${iRaw} 超出範圍`); continue; }
  const seen = new Set(), all = [];
  for (const o of [r.served, r.original, ...r.alternatives]) { if (!seen.has(o.id)) { seen.add(o.id); all.push(o); } }
  all.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  console.log(`#${iRaw} ${r.artist} — ${r.album}`);
  if (!cRaw) { for (const o of all) console.log(`   ${(o.date || '?').padEnd(10)} ${(o.country || '--').padEnd(3)} ${(o.format || '').padEnd(11)} ${(o.label || '').slice(0, 22)}  ${o.id}`); continue; }
  // 同國別內的排序：**卡帶排最後**（封面常被裁成方形或另作排版），其次偏好有完整日期的
  // （只寫年份的多半是資料不全的再版條目）。2026-08-30 實測：Billy Joel《The Nylon Curtain》
  // 若不排除卡帶，會挑到「1982 US Cassette」而不是「1982-09-23 US 12" Vinyl」。
  const rank = o => (/Cassette/i.test(o.format || '') ? 2 : 0) + (/^\d{4}-\d{2}/.test(o.date || '') ? 0 : 1);
  let hit = null;
  for (const want of cRaw.split(',')) {
    const cands = all.filter(o => o.country === want);
    if (!cands.length) continue;
    const minYear = Math.min(...cands.map(o => Number(String(o.date || '9999').slice(0, 4)) || 9999));
    const sameYear = cands.filter(o => (Number(String(o.date || '9999').slice(0, 4)) || 9999) === minYear);
    hit = sameYear.sort((a, b) => rank(a) - rank(b) || (a.date || '9999').localeCompare(b.date || '9999'))[0];
    break;
  }
  if (!hit) { console.log(`   ✗ 沒有 ${cRaw} 的候選；全部國別：${[...new Set(all.map(o => o.country || '--'))].join(' ')}`); continue; }
  console.log(`   → ${hit.date || '?'} ${hit.country} ${hit.format || ''} ${hit.label || ''}`);
  console.log(`     "releaseId": "${hit.id}"`);
}
