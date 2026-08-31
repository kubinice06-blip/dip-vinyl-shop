// 封面「版本」稽核 步驟 18：用步驟 17 對照圖上的字母記錄判定，直接併進 edition-picks.json。
//
// 步驟 15 吃的是 releaseId，但主線在對照圖上看到的是 a／b／c／d。
// 讓主線手抄 UUID 既慢又容易抄錯，所以這支用**與步驟 17 完全相同的候選排序**
// 把字母還原成 releaseId。兩邊的 pick() 必須一致，改一邊就要改另一邊。
//
// 用法：node scripts/cover-audit/18-record-picks.mjs "264:c 266:a 273:keep 268:c#英國團取英版"
//   <idx>:<a-d>    → 指定該候選（若剛好是現用版本，步驟 15 會自動歸為維持現狀）
//   <idx>:keep     → 維持現狀
//   <idx>:orig     → 換成最早那筆
//   後面接 #理由（可省略）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, 'data');
const review = JSON.parse(fs.readFileSync(path.join(DATA, 'edition-review.json'), 'utf8')).review;
const picksPath = path.join(DATA, 'edition-picks.json');
const picks = fs.existsSync(picksPath) ? JSON.parse(fs.readFileSync(picksPath, 'utf8')) : [];

const pick = r => {
  const all = [r.served, ...r.alternatives.filter(a => a.id !== r.served.id)]
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const must = new Set([r.served.id, r.original.id]);
  return [...all.filter(o => must.has(o.id)), ...all.filter(o => !must.has(o.id))]
    .slice(0, 4)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
};

const byIdx = new Map(picks.map(p => [p.i, p]));
let added = 0, replaced = 0;
const bad = [];

for (const tok of process.argv.slice(2).join(' ').split(/\s+/).filter(Boolean)) {
  const [head, why = ''] = tok.split('#');
  const m = head.match(/^(\d+):(.+)$/);
  if (!m) { bad.push(`${tok}：格式不對`); continue; }
  const i = Number(m[1]), what = m[2];
  const r = review[i];
  if (!r) { bad.push(`#${i} 超出 review 範圍`); continue; }

  let entry;
  if (what === 'keep' || what === 'orig') entry = { i, do: what };
  else {
    const n = 'abcd'.indexOf(what);
    const opts = pick(r);
    if (n < 0 || n >= opts.length) { bad.push(`#${i} 沒有候選 ${what}`); continue; }
    entry = { i, do: 'pick', releaseId: opts[n].id };
  }
  if (why) entry.why = why;
  if (byIdx.has(i)) { Object.assign(byIdx.get(i), entry); replaced++; }
  else { picks.push(entry); byIdx.set(i, entry); added++; }
}

picks.sort((a, b) => a.i - b.i);
fs.writeFileSync(picksPath, JSON.stringify(picks, null, 1));
console.log(`新增 ${added}｜覆寫 ${replaced}｜累計 ${picks.length}｜最大索引 ${Math.max(...picks.map(p => p.i))}`);
if (bad.length) { console.log('⚠'); bad.forEach(b => console.log('  ' + b)); process.exit(1); }
