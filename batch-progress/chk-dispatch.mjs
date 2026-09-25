// 派工信自檢：同一個檔名在信裡出現多次而模板替換只改了一處，是本線第十四次派工信出錯的根因
// （主線第 1955-B 條）。`dispatch-stats.mjs` 擋數字，擋不到這個。
//
// 用法：node batch-progress/chk-dispatch.mjs <信的路徑> <批次> <組別 a|b|1|2>
//   例：node batch-progress/chk-dispatch.mjs /tmp/…/c185-b.md c185 b
//
// 檢查四件：
//   1. `prop-<組>.json`／`out-<組>.json`／`<批>-<組>.json` 這幾種「自己的檔」有沒有被寫成對方的；
//   2. 批次號有沒有殘留上一批的；
//   3. 「你負責 X 組」與組別參數一致；
//   4. 裁定條號區間有沒有與「另一組用」的區間重疊。
import fs from 'node:fs';

const [file, batch, group] = process.argv.slice(2);
if (!file || !batch || !group) { console.log('用法：node batch-progress/chk-dispatch.mjs <信> <批次> <組別>'); process.exit(1); }
const s = fs.readFileSync(file, 'utf8');
const other = { a: 'b', b: 'a', 1: '2', 2: '1' }[group];
let bad = 0;
const warn = (...m) => { bad++; console.log('⚠', ...m); };

// 1. 自己的檔 vs 對方的檔
// ⚠ 只看「本批路徑下」的檔名：引用上一批的 `c183/prop-a.json`、`prop-b.json` 當先例是正常的，
// 出錯的形狀是**本批路徑下出現對方那一組的檔**（c-184 b 組的信裡「邊界」那節寫成 prop-a.json）。
const own = [`prop-${group}.json`, `out-${group}.json`, `${batch}-${group}.json`, `writer-${group}.json`];
const theirs = [`prop-${other}.json`, `out-${other}.json`, `${batch}-${other}.json`, `writer-${other}.json`];
for (let i = 0; i < own.length; i++) {
  // 本批路徑（`batch-progress/<批>/…` 或 `batches/<層>/<批>-…`）底下的提及
  const mineHits = (s.match(new RegExp(`\\b${batch}/${own[i].replace('.', '\\.')}|batches/[a-z]+/${own[i].replace('.', '\\.')}|${own[i].replace('.', '\\.')}`, 'g')) || []);
  const theirHitLines = s.split('\n').filter(l => l.includes(theirs[i]) && l.includes(batch));
  if (!mineHits.length && !theirHitLines.length) continue;
  console.log(`  ${own[i]} ×${mineHits.length}｜本批路徑下出現 ${theirs[i]} 的行 ×${theirHitLines.length}`);
  for (const l of theirHitLines) {
    if (/不要碰|只准讀|不准寫|另一組|對方|他的檔/.test(l)) continue;
    warn(`本批路徑下寫成對方那一組的檔：\n     ${l.trim()}`);
  }
}

// 2. 殘留的舊批次號
for (const m of new Set(s.match(/c-?1\d\d/g) || [])) {
  const n = m.replace('-', '');
  if (n === batch) continue;
  const cnt = (s.match(new RegExp(m, 'g')) || []).length;
  // 引用別批的裁定與倒量參考是正常的，只在「本批」附近出現才算問題
  const nearSelf = new RegExp(`本批[^\\n]{0,20}${m}|${m}[^\\n]{0,10}的 ?(a|b) ?組的 ?\\d`, 'g');
  if (nearSelf.test(s)) warn(`「本批」附近出現別批的批號 ${m}`);
  else console.log(`  （引用別批 ${m} ×${cnt}，正常）`);
}

// 3. 組別一致
const gm = s.match(/你負責 \*\*(?:writer-[12]（)?([ab]) 組/);
if (gm && gm[1] !== group && !['1', '2'].includes(group)) warn(`「你負責 ${gm[1]} 組」與參數 ${group} 不符`);

// 4. 條號區間重疊
const mineRange = s.match(/條號 \*\*(\d+)[–-](\d+)\*\*/);
const otherRange = s.match(/另一(?:組|位寫作代理)用 (\d+)[–-](\d+)/);
if (mineRange && otherRange) {
  const [a1, a2] = [Number(mineRange[1]), Number(mineRange[2])], [b1, b2] = [Number(otherRange[1]), Number(otherRange[2])];
  if (a1 <= b2 && b1 <= a2) warn(`條號區間重疊：自己 ${a1}–${a2}、另一組 ${b1}–${b2}`);
  else console.log(`  條號 ${a1}–${a2}／另一組 ${b1}–${b2}，不重疊 ✓`);
}
console.log(bad ? `\n標記 ${bad}` : '\n全部通過 ✓');
