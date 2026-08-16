// 李雙澤《敬！李雙澤 唱自己的歌》上架開關：追加進 seed_cards.json（一般卡）。
//
// 這張客觀符合 pearl 門檻（obscurity=5、listeners=16），但本批判定作一般卡：
// pearl 的敘事是「流通被截斷的遺珠」，本張是 2008 年正常發行的紀念輯；且店主指定
// 李雙澤必須進池，一般卡的抽卡曝光遠高於 apex（約 3% 且需同曲風命中）。店主可推翻。
//
//   node scripts/publish-lishuangze.mjs --dry
//   node scripts/publish-lishuangze.mjs
//
// seed_cards.json 是自訂單行格式（每行一筆、首筆與開頭 [ 同行、末筆與結尾 ] 同行），
// 不是 indent=1 也不是壓縮 JSON，所以走字串替換＋三道防呆，絕不 re-stringify 整檔。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'seed_cards.json');
const DRY = process.argv.includes('--dry');

// [artist, album, classic, obscurity, accessibility, genres[], year]
const ROW = ['李雙澤', '敬！李雙澤 唱自己的歌', 4, 5, 2, ['folk'], 2008];
const rowJson = JSON.stringify(ROW);

const before = fs.readFileSync(FILE, 'utf8');
const parsed = JSON.parse(before);
const n = parsed.length;

if (parsed.some(r => r[0] === ROW[0] && r[1] === ROW[1])) {
  console.log('已在 seed 卡池，無需重複追加。');
  process.exit(0);
}

// 錨點：末筆 + 收尾的 ']'
const lastJson = JSON.stringify(parsed[n - 1]);
const anchor = lastJson + ']';
const hits = before.split(anchor).length - 1;
if (hits !== 1) { console.error(`防呆①失敗：錨點出現 ${hits} 次，預期 1`); process.exit(1); }

const after = before.replace(anchor, lastJson + ',\n' + rowJson + ']');

// 防呆②：長度只增加「新列 + 逗號 + 換行」
const delta = after.length - before.length;
if (delta !== rowJson.length + 2) { console.error(`防呆②失敗：長度變化 ${delta}，預期 ${rowJson.length + 2}`); process.exit(1); }

// 防呆③：筆數 +1、末筆是新卡、前面每一筆逐字未動
const re = JSON.parse(after);
const ok = re.length === n + 1
  && JSON.stringify(re[n]) === rowJson
  && JSON.stringify(re.slice(0, n)) === JSON.stringify(parsed);
if (!ok) { console.error('防呆③失敗：內容與預期不符'); process.exit(1); }

console.log(`seed ${n} → ${re.length}｜行數 ${before.split('\n').length} → ${after.split('\n').length}`);
console.log('追加列:', rowJson);
if (DRY) { console.log('\n(--dry 未寫檔)'); process.exit(0); }
fs.writeFileSync(FILE, after, 'utf8');
console.log('已寫入 seed_cards.json');
