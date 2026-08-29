// 中英數字間補半形空格（審稿層自動補丁）
// 用法：node fix-spacing.mjs <檔案> [--field desc|hook] [--write]
// 預設 dry-run，只印出會改動的卡；加 --write 才實際寫檔。
import fs from 'node:fs';

const file = process.argv[2];
const field = (process.argv.includes('--field') ? process.argv[process.argv.indexOf('--field') + 1] : 'desc');
const write = process.argv.includes('--write');
if (!file) { console.error('用法: node fix-spacing.mjs <檔案> [--field desc|hook] [--write]'); process.exit(1); }

const CJK = '㐀-鿿぀-ヿ';

// 中文夾拉丁的**專名**不可拆——頑童MJ116 是卡池藝人欄、さんピンCAMP 是活動名，
// 補了空格就跟卡片標題或原始寫法對不上。（2026-08-11 cjk-06 實測）
// 保護清單＝卡池裡「中文與拉丁直接相鄰」的藝人欄與專輯名，加上手動補的活動／廠牌名。
const EXTRA_PROTECTED = ['さんピンCAMP'];
// 保護清單的來源卡池：本機在 dip-vinyl-shop 下、雲端則與本腳本同 repo（desc-tools/ 的上一層）。
// 兩邊都試，讀不到就略過（下面的 try/catch 會 continue，只是保護清單較短）。
const POOL = [
  'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/seed_cards.json',
  'C:/Users/User/dip-vinyl-home/dip-vinyl-shop/apex_pool.json',
  new URL('../seed_cards.json', import.meta.url).pathname.replace(/^/([A-Za-z]:)/, '$1'),
  new URL('../apex_pool.json', import.meta.url).pathname.replace(/^/([A-Za-z]:)/, '$1'),
];
const adjacent = new RegExp(`[${CJK}][A-Za-z0-9]|[A-Za-z0-9][${CJK}]`);
const protectedTokens = (() => {
  const out = new Set(EXTRA_PROTECTED);
  for (const p of POOL) {
    let raw; try { raw = JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { continue; }
    const rows = Array.isArray(raw) ? raw : Object.values(raw).flat();
    for (const r of rows) for (const s of [r[0], r[1]]) if (typeof s === 'string' && adjacent.test(s)) out.add(s);
  }
  // 長的先比，避免短字串先咬掉長專名的一半
  return [...out].sort((a, b) => b.length - a.length);
})();
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const protectedRx = protectedTokens.length ? new RegExp(`(${protectedTokens.map(esc).join('|')})`) : null;

// 《》〈〉裡是專輯名與曲名，原文怎麼寫就怎麼留——〈SAKURAドロップス〉不該變成
// 〈SAKURA ドロップス〉。CJK 批次幾乎每張都有這種拉丁夾假名的曲名，
// 不豁免就會每批都跳一堆不能套用的建議。（2026-08-11 cjk-03 實測）
export function spacer(s) {
  return String(s).split(/(《[^》]*》|〈[^〉]*〉)/)
    .map((seg, i) => (i % 2 ? seg : protectSpans(seg)))
    .join('')
    .trim();
}

// 把保護清單裡的專名切出來原樣保留，其餘部分才補空格。
function protectSpans(s) {
  if (!protectedRx) return spaceOutside(s);
  return String(s).split(protectedRx)
    .map((seg, i) => (i % 2 ? seg : spaceOutside(seg)))
    .join('');
}

function spaceOutside(s) {
  return String(s)
    .replace(new RegExp(`([${CJK}])([A-Za-z0-9])`, 'g'), '$1 $2')
    .replace(new RegExp(`([A-Za-z0-9%\\)])([${CJK}])`, 'g'), '$1 $2')
    // 中黑點（U+30FB）落在上面的假名範圍內，會被誤判成「中文字」而在兩側補空格，
    // 但它在日文專名裡是連字符號：CBS・Sony、キャラメル・ママ、ジョージ川口とビッグ4。
    // 補完再一律收掉它兩側的空格（2026-08-11 cjk-02 實測，w2 批無 CJK 卡故不受影響）。
    .replace(/ *・ */g, '・')
    .replace(/ {2,}/g, ' ');
}

const rows = JSON.parse(fs.readFileSync(file, 'utf-8'));
let n = 0;
for (const r of rows) {
  const before = r[field];
  if (typeof before !== 'string') continue;
  const after = spacer(before);
  if (after !== before) {
    n++;
    const lb = Array.from(before).length, la = Array.from(after).length;
    console.log(`• ${r.key}（${lb}→${la}）`);
    const diffs = [];
    for (let i = 0, j = 0; i < before.length && diffs.length < 6; i++, j++) {
      if (before[i] !== after[j]) { diffs.push(after.slice(Math.max(0, j - 6), j + 6)); j++; }
    }
    console.log('   ', diffs.join(' ／ '));
    if (write) r[field] = after;
  }
}
if (write && n) fs.writeFileSync(file, JSON.stringify(rows, null, 1));
console.log(`${write ? '已補' : '待補'} ${n} 張（欄位 ${field}）`);
