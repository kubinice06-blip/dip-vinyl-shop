// 主線第 1975-B／1977-B 條：把 `enum/name-corrections.json` 的對照表掃過卡單與 prop。
//
// 為什麼要有這支：**人名錯字會跨批傳染**——下一批的策展層拿上一批的 `prop` 當掛名與 `risk` 密度的先例，
// 所以 c-184 改掉的四個名字，在 c-185 的卡單裡又出現了一次。
// ⚠ 只改 **卡單與 prop**（下游三層讀的是它們與研究稿）；**不改 rulings.md**（那是各層自己的紀錄）。
//
// 用法：node batch-progress/fix-names.mjs c185 c186 c187      （不給批次就掃全部 c1xx）
import fs from 'node:fs';
import path from 'node:path';

const T = JSON.parse(fs.readFileSync('batch-progress/enum/name-corrections.json', 'utf8'));
// ⚠ ⚠ **`_to_romaji` 絕對不掃**（主線第 1979-B 條，我自己試過一次然後全部還原）：
// 「查不到漢字就寫羅馬字」是**那一張卡、那一層當下的判斷**，不是「這個漢字寫法全域錯誤」。
// 實測後果：`吉澤典夫` 在 c-185 b 查不到來源，但 c-177／c-178（ビクター Invitation 的錄音師）
// 的策展層當時是有依據的——盲掃會把已收線批次裡正確的漢字降級成羅馬字。
// **`pairs` 才是「已證實寫錯」的對照，那個可以全域掃。**
const pairs = T.pairs.map(([a, b]) => [a, b]);
let batches = process.argv.slice(2);
if (!batches.length) {
  batches = fs.readdirSync('batch-progress').filter(d => /^c\d+$/.test(d)).sort();
}
let grand = 0;
for (const b of batches) {
  const files = [
    `desc-tools/batches/cards/${b}-cards.json`,
    `batch-progress/${b}/prop-a.json`,
    `batch-progress/${b}/prop-b.json`,
  ].filter(f => fs.existsSync(f));
  for (const f of files) {
    let t = fs.readFileSync(f, 'utf8');
    let n = 0; const hits = [];
    for (const [bad, good] of pairs) {
      const c = (t.match(new RegExp(bad, 'g')) || []).length;
      if (c) { t = t.split(bad).join(good); n += c; hits.push(`${bad}→${good}×${c}`); }
    }
    if (n) {
      JSON.parse(t); // 壞掉就丟例外，不寫出去
      fs.writeFileSync(f, t);
      console.log(`✓ ${f}  ${n} 處  ${hits.join('、')}`);
      grand += n;
    }
  }
}
console.log(grand ? `\n合計改 ${grand} 處` : '\n全部乾淨，0 處要改');
