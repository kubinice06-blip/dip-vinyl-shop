// hook 層跨組檢查：開頭互異、同構關鍵詞、校對痕跡、分數星等、禁語。
// 用法：node chk-hook-crossgroup.mjs r-11
//
// ⚠⚠ 這是**常設工具，不是臨時腳本**。
// 收尾步驟寫的是「清掉殘留的 chk-*.mjs 臨時腳本」，而這支的檔名剛好符合那個 pattern——
// 2026-08-14 主線跑 `rm -f chk-*.mjs` 把它一起刪掉了，重建於此。
// **清理臨時檔時請用 `rm -f chk-w*-*.mjs chk-r*-*.mjs`（帶批次與組別前綴的才是臨時檔），
// 不要用 `rm -f chk-*.mjs`。**
import fs from 'node:fs';

const batch = process.argv[2];
if (!batch) { console.error('用法: node chk-hook-crossgroup.mjs r-11'); process.exit(1); }

const groups = ['a', 'b', 'c', 'd', 'e']
  .filter(g => fs.existsSync(`batches/hooks/${batch}-hooks-${g}.json`));
if (!groups.length) { console.error(`找不到 batches/hooks/${batch}-hooks-*.json`); process.exit(1); }

const all = [];
for (const g of groups) {
  for (const x of JSON.parse(fs.readFileSync(`batches/hooks/${batch}-hooks-${g}.json`, 'utf8'))) {
    all.push({ ...x, g, k: x.key.replace('desc2:', '') });
  }
}
console.log(`${batch}｜${groups.length} 組｜${all.length} 張\n`);
let issues = 0;
const flag = (label, rows, show = r => r.k) => {
  if (!rows.length) return;
  issues += rows.length;
  console.log(`⚠ ${label}（${rows.length}）`);
  rows.forEach(r => console.log('   ' + show(r)));
  console.log();
};

// ── 1. 跨組開頭前四字互異 ────────────────────────────────
const heads = new Map();
for (const r of all) {
  const h = Array.from(r.hook).slice(0, 4).join('');
  if (!heads.has(h)) heads.set(h, []);
  heads.get(h).push(r);
}
flag('開頭前四字相同', [...heads].filter(([, v]) => v.length > 1)
  .map(([h, v]) => ({ k: `「${h}」 → ${v.map(r => `[${r.g}] ${r.k}`).join(' ／ ')}` })));

// ── 2. 同構關鍵詞：同一個骨架短語出現在多張 ────────────────
// 只掃「敘事骨架」型的說法，不掃廠牌名與曲風名（那兩類 2026-08-02／08-08 起沒有配額）。
const SKELETON = [
  '離開原樂團', '另起爐灶', '自己當起領班', '皈依伊斯蘭', '改名',
  '錄完擱置', '塵封多年', '多年後才發行', '母帶擱', '生前最後',
  '遺作', '辭世', '晚年', '首度以自己的名字', '第一張領銜',
  '同一場錄音', '同一夜', '拆成兩張', '拆成三張',
  '首度加入', '首次合作', '唯一一次', '最後一次合作',
  '無鋼琴', '沒有鼓', '不設貝斯', '無伴奏', '一人包辦',
];
// ⚠ 排除條款會造成大量假陽性（2026-08-14 實測：r-11 的 7 項命中全部是這個）。
// note 的排除句寫法是「遺作歸《Passion》」「鍵盤樂器改名歸《Atlantis》」——
// 那是在**交代這張不要寫什麼**，不是在寫它。掃描前先把排除段落剝掉，
// 否則同一批裡三張 Seifert 會因為兩張的排除句而被判成「遺作 ×3 同構」。
const strip = s => s
  .replace(/(同藝人分軸|指派排除|排除條款)[:：][^。]*。?/g, '')
  // 「歸」與「《」之間常插一段字（「生平與辭世軸歸**同批**《Rosemary's Baby》」），
  // 舊版要求兩者相鄰，因此漏掉這種寫法（2026-08-14 在 r-14 實測到）。
  .replace(/[^。]*?歸[^。《]*《[^》]*》[^。]*。?/g, '');

const hits = new Map();
for (const r of all) {
  const body = strip(r.hook) + strip(r.note);
  for (const s of SKELETON) if (body.includes(s)) {
    if (!hits.has(s)) hits.set(s, []);
    hits.get(s).push(r);
  }
}
flag('同構骨架出現在多張（人工判斷是否已互寫排除）',
  [...hits].filter(([, v]) => v.length > 1)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([s, v]) => ({ k: `「${s}」×${v.length} → ${v.map(r => `[${r.g}] ${r.k}`).join(' ／ ')}` })));

// ── 3. 校對痕跡：研究層更正的否定句外漏進 note ────────────
const TRACE = /卡池|查無|並非|而非|無從查證|不得寫|禁補|未能查證|兩者是完全不同|標錯|有出入/;
flag('note 有校對痕跡風險（會被寫作層原樣寫進正文）',
  all.filter(r => TRACE.test(r.note)),
  r => `[${r.g}] ${r.k}\n        ${r.note.match(TRACE)[0]} … ${r.note.slice(Math.max(0, r.note.search(TRACE) - 12), r.note.search(TRACE) + 40)}`);

// ── 4. 分數星等（hook 與 note 指派句都不得出現） ──────────
// 「四星／五星」後面接「期」時是上榜週數不是星等（華語批常見：「商台四星期的叱咤冠軍歌」），
// 加負向前瞻排除。「滿分」保留為人工複核項——選秀比賽的評判給滿分屬生平事實，
// 規格禁的是樂評對唱片的評分，機器分不出來。
const SCORE = /\d\s*\/\s*10|Metacritic|Pitchfork\s*\d|\d\.\d\s*分|\d\s*顆星|滿分|[四五]星(?!期)/;
flag('分數或星等進入 hook 或 note', all.filter(r => SCORE.test(r.hook + r.note)),
  r => `[${r.g}] ${r.k}  →  ${(r.hook + r.note).match(SCORE)[0]}`);

// ── 5. hook 禁語與格式 ──────────────────────────────────
const BAN = /這張專輯|傑作|必聽|里程碑|獨樹一格|融合多種元素|具有代表性|層次豐富|你|我們/;
flag('hook 禁語', all.filter(r => BAN.test(r.hook)),
  r => `[${r.g}] ${r.k}  →  ${r.hook.match(BAN)[0]}`);
flag('hook 句末缺全形標點', all.filter(r => !/[。？！]$/.test(r.hook)),
  r => `[${r.g}] ${r.k}  →  …${r.hook.slice(-12)}`);

// hook 不得否定讀者沒有的前提（2026-08-08）
flag('hook 用否定句（讀者有這個前提嗎？）', all.filter(r => /不是|卻不是|並非|而不是/.test(r.hook)),
  r => `[${r.g}] ${r.k}  →  ${r.hook}`);

// ── 6. 字數 ─────────────────────────────────────────────
const w = s => Array.from(s).reduce((n, c) => n + (/[\x00-\x7F]/.test(c) ? 0.5 : 1), 0);
flag('hook 加權超過 50 字', all.filter(r => w(r.hook) > 50), r => `[${r.g}] ${r.k}  →  ${w(r.hook)}`);
flag('note 超過 350 字', all.filter(r => Array.from(r.note).length > 350),
  r => `[${r.g}] ${r.k}  →  ${Array.from(r.note).length}`);

const hw = all.map(r => w(r.hook)), nl = all.map(r => Array.from(r.note).length);
console.log(`hook 加權 ${Math.min(...hw)}–${Math.max(...hw)}｜note ${Math.min(...nl)}–${Math.max(...nl)}`);
console.log(issues ? `\n共 ${issues} 項待人工判斷` : '\n✓ 全部通過');
