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
//   7. ⚠ 2026-09-25（主線第 1971-B 條，派工信第十八次出錯）：**「本組 <廠牌> N 張」回比 slice**；
//   8. ⚠ 2026-09-25（主線第 1976-B 條，派工信第十九次出錯）：**引到某一檔的條號要真的在那一檔裡**；
//   9. ⚠ 2026-09-25（主線第 1988-B 條，派工信第二十二次出錯）：**「N 張<掛名>」的掛名要在本批出現**。
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
// ⚠ 策展層的信要比 **slice**（prop 只裝收件，張數本來就會少）——用「輸出寫 prop-<組>.json」判斷是不是策展信。
const isCuration = new RegExp(`輸出[^\\n]{0,40}prop-[ab]\\.json`).test(s);
const rowsOf = g => {
  if (isCuration) {
    const sp = `batch-progress/${batch}/slice.json`;
    const all = readRows(sp);
    if (all) return { f: sp + `（g === "${g}"）`, rows: all.filter(r => r.g === g) };
  }
  for (const f of layerFiles(g)) { const r = readRows(f); if (r) return { f, rows: r }; }
  return null;
};
const mine = rowsOf(gl), theirsRows = rowsOf(ol);
if (mine) {
  const n = mine.rows.length;
  // 信裡宣稱的張數：「你負責 … N 張」與「本組N張」兩種寫法
  const CN = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12, 十三: 13, 十四: 14, 十五: 15 };
  const claims = [];
  for (const m of s.matchAll(/你負責[^\n]{0,40}?(\d+) 張/g)) claims.push({ what: '你負責', n: Number(m[1]), text: m[0] });
  // ⚠ 2026-09-25（派工信第二十次出錯）：**要吃得下「本組 12 張」這種帶空白的寫法**
  //  ——c-185 兩封寫作信的第六節逐字寫「本組 12 張」（那是 c-184 的張數），而第五道當時的正則沒有允許空白。
  for (const m of s.matchAll(/本組\s*(\d+|[一二三四五六七八九十]{1,3})\s*張/g)) claims.push({ what: '本組', n: Number(m[1]) || CN[m[1]] || 0, text: m[0] });
  for (const m of s.matchAll(/本(?:批|組)[^\n]{0,12}?(\d+)\s*張，每(?:寫|做)完/g)) claims.push({ what: '續跑那節', n: Number(m[1]), text: m[0] });
  // ⚠ 「本組N張」也會是子集的說法（「`渡辺貞夫` 本組三張」），所以只有**等於對方那組的張數**時才硬報
  // ——那正是「整段是對方那組的」的指紋（c-183 writer-2 逐字「本組五張」＝ a 組的 5 張）。
  const theirN = theirsRows ? theirsRows.rows.length : -1;
  for (const c of claims) {
    if (!c.n || c.n === n) continue;
    if (c.what === '你負責' || c.what === '續跑那節' || c.n === theirN) warn(`張數不符：信裡「${c.text}」，而 ${mine.f} 實際 ${n} 張${c.n === theirN ? `——⚠ 這個數字正好是對方那組的張數` : ''}`);
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
// 8. ⚠ 2026-09-25（主線第 1976-B 條，派工信第十九次出錯）：**「c1XX/rulings.md 的 NNNN–NNNN」要真的在那一檔裡**。
//    我在 c-187 兩封信裡把「5936–5995」寫成 c187/rulings.md，而那一檔當時零條裁定（實際在 c186）。
for (const m of s.matchAll(/`?(?:batch-progress\/)?(c\d+)\/rulings\.md`?[^\n]{0,40}?(\d{4})[–-](\d{4})/g)) {
  const [, bb, r1] = m;
  const f = `batch-progress/${bb}/rulings.md`;
  if (!fs.existsSync(f)) { warn(`信裡引 ${f} 的 ${r1}–，但那一檔不存在`); continue; }
  const t = fs.readFileSync(f, 'utf8');
  if (!new RegExp(`^## ${r1}`, 'm').test(t)) {
    // 骨架檔（本批自己的）只寫區間、還沒有條文，那是正常的
    const own = bb === batch;
    const msg = `信裡寫「${f} 的 ${r1}–${m[3]}」，而該檔沒有 ## ${r1}`;
    if (own) console.log(`  （只報不擋）${msg}——本批的骨架檔還沒有條文，正常`);
    else warn(`${msg}——**條號在別的批次檔裡，不是這一檔**`);
  }
}
// 9. ⚠ 2026-09-25（主線第 1988-B 條，派工信第二十二次出錯）：**信裡點名的掛名必須在本批出現**。
//    c-186 與 c-187 的鉤子派工信第八節都留著 c-185 的分軸清單
//    （逐字「四張深町純／三張山屋清／兩張山下洋輔／兩張渡辺貞夫／兩張高中正義怎麼分軸」），
//    兩批各只有一組成立。第五道擋不到，因為那些不是檔名也不是張數。
//
// ⚠ ⚠ **第一版是「抓 `N 張` 後面那一串當掛名」，那樣寫不能用**（回測印出八個假警報：
// 「28 張，你一個人做完兩組」「28 張是本線鉤子層最大的一批」「24 張三輪收斂」⋯
// ——`張` 後面接的是散文，不是名字，而「名字長什麼樣」沒辦法用字元類描述）。
// 改成**反向比對既有詞彙**：全 repo 的卡單／slice 湊一份掛名詞表，
// 只有「`N 張` 後面緊接著一個**別批出現過的真掛名**」才報。
// 散文不會命中詞表，複製來的分軸清單一定命中——這一道因此零假警報。
try {
  const CJK = x => /[぀-ヿ一-鿿]/.test(x);
  const mine = new Set(), all = new Set();
  const addFrom = (f, into) => { const r = readRows(f); if (r) for (const x of r) if (x?.artist) into.add(String(x.artist)); };
  for (const f of [`desc-tools/batches/cards/${batch}-cards.json`, `batch-progress/${batch}/slice.json`]) addFrom(f, mine);
  // 詞表：全部批次的卡單（掛名的權威寫法在卡單上）
  for (const d of ['desc-tools/batches/cards', 'batch-progress']) {
    let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch {}
    for (const e of es) {
      if (d === 'batch-progress') { if (e.isDirectory() && /^c\d+$/.test(e.name)) addFrom(`${d}/${e.name}/slice.json`, all); }
      else if (/-cards\.json$/.test(e.name)) addFrom(`${d}/${e.name}`, all);
    }
  }
  if (!mine.size) throw new Error('本批沒有卡單也沒有 slice，這一道跳過');
  // 詞表裡剔掉本批有的（含「本批掛名是詞表某個名字的一部分」，例如聯名形）
  const hay = [...mine].join('｜');
  const vocab = [...all].filter(n => n.length >= 2 && CJK(n) && !hay.includes(n))
    .sort((x, y) => y.length - x.length);   // 長的先比，免得 `富樫雅彦` 被 `富樫` 吃掉
  let hits = 0, seen = new Set();
  for (const m of s.matchAll(/[一二三四五六七八九十\d]+\s*張\s*`?/g)) {
    const rest = s.slice(m.index + m[0].length, m.index + m[0].length + 24);
    const n = vocab.find(v => rest.startsWith(v));
    if (!n || seen.has(n)) continue;
    seen.add(n); hits++;
    warn(`信裡寫「${m[0].trim()}${n}」，而本批的卡單／slice 裡沒有 \`${n}\`\n     ——**這個掛名在別批的卡單上，八成是複製過來的分軸清單**`);
  }
  if (!hits) console.log(`  「N 張<掛名>」回比：詞表 ${vocab.length} 個別批掛名，一個都沒被點名 ✓`);
} catch (e) { console.log(`  （第九道跳過：${e.message}）`); }
console.log(bad ? `\n標記 ${bad}` : '\n全部通過 ✓');
