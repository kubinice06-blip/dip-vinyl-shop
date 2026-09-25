// 主線第 1970-B 條（2026-09-25）：**派工前先由主線把 rulings.md 的骨架建好。**
//
// c-185 的 b 組 30 條裁定（5906–5935）被 a 組整份蓋掉，成因是兩支代理並行時**各自「建立」同一個檔**：
// b 組先建檔並寫入，a 組隨後跑 `git show HEAD:…` ＋ `ls` 兩者都「確認不存在」（那一刻 b 組還沒被提交、
// 而 a 組讀到的是自己那一輪的快取／時序在 b 組寫入之前），於是重新建檔覆寫。
// **主線的 checkpoint commit 沒有救到它**——第一次提交時 b 組那一段已經不在磁碟上。
// 救回來的是 b 組自己的草稿 `scratchpad/c185b/body-b.md`。
//
// → **骨架先存在，兩組就都只會 append，不會有人「建立」它。**
//
// 用法：node batch-progress/new-rulings.mjs c187 "日本爵士獨立廠牌線 jp-2・**第五批**；1979 年段" 5996 6025 6026 6055
import fs from 'node:fs';
import path from 'node:path';

// ⚠ 2026-09-25（c-187 a 第 6345 條後的補記，主線第 1987-B 條）：**配條號之前先取真正的全域最大值**。
// 我替 c-187 的研究層配了 6316–6345，而那時全域最大已經是 6405（c-186 寫作層）——沒撞號是運氣。
// 用法：node batch-progress/new-rulings.mjs --max     → 印出全域最大條號
if (process.argv[2] === '--max') {
  let max = 0;
  for (const d of fs.readdirSync('batch-progress')) {
    for (const f of ['rulings.md', 'rulings-mainline.md']) {
      const p = path.join('batch-progress', d, f);
      if (!fs.existsSync(p)) continue;
      for (const m of fs.readFileSync(p, 'utf8').matchAll(/^## (\d{4})/gm)) max = Math.max(max, Number(m[1]));
    }
  }
  console.log(`全域最大條號 ${max}；下一段從 ${max + 1} 開始配。`);
  process.exit(0);
}

const [batch, title, a1, a2, b1, b2] = process.argv.slice(2);
if (!batch || !title || !a1) {
  console.log('用法：node batch-progress/new-rulings.mjs <批次> <標題> <a起> <a訖> <b起> <b訖>');
  process.exit(1);
}
const p = path.join('batch-progress', batch, 'rulings.md');
if (fs.existsSync(p)) { console.log(`⚠ ${p} 已存在（${fs.readFileSync(p, 'utf8').split('\n').length} 行），不動它。`); process.exit(0); }
const b = batch.replace(/^c/, 'c-');
fs.writeFileSync(p, `# ${b} 裁定（${title}）

> ⚠ ⚠ **本檔由主線在派工前建立，兩組共用**（主線第 1970-B 條）。
> **a 組編號區間 ${a1}–${a2}、b 組 ${b1}–${b2}。**
> ⚠ ⚠ **這個檔已經存在了——不要「建立」它，只 append 自己那一段。**
> **絕不覆寫對方的段落**：c-185 的 b 組 30 條裁定就是被並行的另一組整份蓋掉的
> （兩支代理各自跑 \`git show HEAD:\` ＋ \`ls\`，兩者都回「不存在」，於是各自建檔）。
> ⚠ **append 之後自己驗一次**：\`grep -c '^## '\` 兩組的條數都在，而且對方的標題還在。

---

`);
console.log(`✓ 建好 ${p}（a ${a1}–${a2}／b ${b1}–${b2}）`);
