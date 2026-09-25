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
//   4. 裁定條號區間有沒有與「另一組用」的區間重疊；
//   5. ⚠ 2026-09-25（主線第 1964-B 條，派工信第十五次出錯）：**張數與 hook 舉例是不是對方那一組的**；
//   6. ⚠ 2026-09-25（主線第 1970-B 條）：**本批的 rulings.md 在派工前就要存在**（並行覆寫過一次）；
//   7. ⚠ 2026-09-25（主線第 1971-B 條，派工信第十八次出錯）：**「本組 <廠牌> N 張」回比 slice**。
//      c-183 writer-2 的信裡 §二 逐字寫「本組五張的 hook 有四張是代稱開頭」並列了四個 a 組的 hook
//      ——**我用 `.replace()` 換那一段而字串沒對上，整段靜靜留著 a 組的內容**（第三次同一種失效）。
//      這一道用實際檔案的張數與 hook 原文回比，不靠我自己記得有沒有換到。
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
// 5. 張數與 hook 舉例
// 先找出這一批「自己這組」與「對方那組」的實際張數與 hook 原文
const gl = { a: 'a', b: 'b', 1: 'a', 2: 'b' }[group];
const ol = { a: 'b', b: 'a', 1: 'b', 2: 'a' }[group];
const readRows = f => { try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); return Array.isArray(j) ? j : Object.values(j); } catch { return null; } };
const layerFiles = g => [
  `desc-tools/batches/input/${batch}-writer-${g === 'a' ? 1 : 2}.json`,
  `desc-tools/batches/hooks/${batch}-hooks-${g}.json`,
  `desc-tools/batches/research/${batch}-${g}.json`,
  `batch-progress/${batch}/prop-${g}.json`,
];
const rowsOf = g => { for (const f of layerFiles(g)) { const r = readRows(f); if (r) return { f, rows: r }; } return null; };
const mine = rowsOf(gl), theirsRows = rowsOf(ol);
if (mine) {
  const n = mine.rows.length;
  // 信裡宣稱的張數：「你負責 … N 張」與「本組N張」兩種寫法
  const CN = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12, 十三: 13, 十四: 14, 十五: 15 };
  const claims = [];
  for (const m of s.matchAll(/你負責[^\n]{0,40}?(\d+) 張/g)) claims.push({ what: '你負責', n: Number(m[1]), text: m[0] });
  for (const m of s.matchAll(/本組(\d+|[一二三四五六七八九十]{1,3})張/g)) claims.push({ what: '本組', n: Number(m[1]) || CN[m[1]] || 0, text: m[0] });
  // ⚠ 「本組N張」也會是子集的說法（「`渡辺貞夫` 本組三張」），所以只有**等於對方那組的張數**時才硬報
  // ——那正是「整段是對方那組的」的指紋（c-183 writer-2 逐字「本組五張」＝ a 組的 5 張）。
  const theirN = theirsRows ? theirsRows.rows.length : -1;
  for (const c of claims) {
    if (!c.n || c.n === n) continue;
    if (c.what === '你負責' || c.n === theirN) warn(`張數不符：信裡「${c.text}」，而 ${mine.f} 實際 ${n} 張${c.n === theirN ? `——⚠ 這個數字正好是對方那組的張數` : ''}`);
    else console.log(`  （只報不擋）「${c.text}」不等於本組 ${n} 張，多半是子集的說法，自己看一眼`);
  }
  if (claims.length) console.log(`  張數宣稱 ${[...new Set(claims.map(c => c.n))].join('／')}｜實際 ${n}（${mine.f}）`);
}
// hook 舉例：信裡用反引號引的短字串，若逐字出現在對方那組的 hook 裡、而自己這組沒有，就是抄錯組
if (theirsRows && mine) {
  const txt = r => [r.hook, r.note, r.album, r.artist].filter(Boolean).join('　');
  const theirText = theirsRows.rows.map(txt).join('　');
  const myText = mine.rows.map(txt).join('　');
  const quoted = [...new Set((s.match(/`[^`\n]{3,20}`/g) || []).map(x => x.slice(1, -1)))];
  // ⚠ 兩種要放過：
  //  (a) **刻意告知對方那組有什麼**（「b 組 2 張：…」「不在你這一組，不要查」「跨兩組」）——那一行會自己說明；
  //  (b) 純 ASCII 且短的通用詞（`thin` 這種規格用語）。
  const lines = s.split('\n');
  const deliberate = q => lines.filter(l => l.includes('`' + q + '`'))
    .every(l => /[ab] 組|另一組|對方|不在你|不要查|跨兩組|跨組|只准讀/.test(l));
  const wrong = quoted.filter(q => theirText.includes(q) && !myText.includes(q)
    && !(!/[぀-ヿ一-鿿]/.test(q) && q.length <= 5) && !deliberate(q));
  for (const q of wrong) warn(`舉例 \`${q}\` 逐字出現在對方那組（${theirsRows.f}），自己這組沒有`);
  if (!wrong.length) console.log(`  反引號舉例 ${quoted.length} 個，沒有一個是對方那組的 ✓`);
}
// 6. ⚠ 2026-09-25（主線第 1970-B 條）：**本批的 rulings.md 必須在派工前就存在**
//    ——c-185 的 b 組 30 條被並行的 a 組整份蓋掉，成因是兩組各自「建立」同一個檔。
const rp = `batch-progress/${batch}/rulings.md`;
if (!fs.existsSync(rp)) warn(`${rp} 還不存在——**派工前先跑 `+'`node batch-progress/new-rulings.mjs`'+`**，不要讓兩支代理各自建檔（第 1970-B 條）`);
else {
  const t = fs.readFileSync(rp, 'utf8');
  const heads = (t.match(/^## \d+/gm) || []).length;
  console.log(`  ${rp} 已存在（${heads} 條裁定）✓`);
  if (mineRange && !new RegExp(`${mineRange[1]}[–-]${mineRange[2]}`).test(t))
    console.log(`  （只報不擋）rulings.md 的檔頭沒有寫到本組區間 ${mineRange[1]}–${mineRange[2]}`);
}
// 7. ⚠ 2026-09-25（主線第 1971-B 條，派工信第十八次出錯）：**「本組 <廠牌> N 張」要回比 slice**。
//    c-186 a 的信第二節寫的是 c-185 a 的廠牌分佈，而同一封信第六節自己給的是對的
//    ——第五道擋不到，因為那些數字不是檔名也不是 hook。
try {
  const sp = `batch-progress/${batch}/slice.json`;
  if (fs.existsSync(sp)) {
    const rows = JSON.parse(fs.readFileSync(sp, 'utf8')).filter(r => r.g === gl);
    const cnt = {};
    for (const r of rows) cnt[r.house] = (cnt[r.house] || 0) + 1;
    let checked = 0;
    for (const m of s.matchAll(/本組[^\n]{0,8}?`([^`\n]{2,20})`\s*(\d+)\s*張/g)) {
      const house = m[1], n = Number(m[2]);
      if (!(house in cnt)) continue;
      checked++;
      if (cnt[house] !== n) warn(`廠牌張數不符：信裡「本組 \`${house}\` ${n} 張」，而 ${sp} 的 ${gl} 組實際 ${cnt[house]} 張`);
    }
    if (checked) console.log(`  廠牌張數回比 ${checked} 處 ✓`);
  }
} catch {}
console.log(bad ? `\n標記 ${bad}` : '\n全部通過 ✓');
