// 楊祖珺《楊祖珺》上架開關：把卡片追加進 apex_pool.json 的 pearl 池。已於 2026-08-16 執行完畢。
// ⚠ 2026-08-30 卡池合併後 apex_pool.json 已刪除，這支**不能再跑**（只作歷史紀錄保留）。
//   現在的作法：seed_cards.json 追加一列，列尾第 9 欄放 tier。
//
// 這支之所以獨立成一檔：原本規劃的固定試聽是 YouTube Music album playlist，依
// ALBUM_ONBOARDING §6 只能走後台路徑（album_overrides 規則 allow write: if isAdmin()，
// REST 實測 403），規範又要求「任一項缺失不得先上架」，所以先把上架開關留成一支待執行腳本。
// 後來店主指出 Apple Music 有這張，改走 §6 路徑1 的靜態地圖（data/apple-audio-map-v1.json，
// 店主指定試聽片段為〈美麗島〉），試聽當場落地，本腳本也就一併跑完了。保留檔案作為改動記錄；
// 冪等，重跑會偵測到已在池中並直接結束。
//
//   node scripts/publish-add-20260816.mjs --dry   # 先看會改什麼
//   node scripts/publish-add-20260816.mjs
//
// 格式安全：apex_pool.json 實測與 JSON.stringify(obj, null, 1) 逐字相同（不是 seed_cards
// 那種自訂單行格式），所以結構化追加後照同一組參數寫回即可；腳本仍會先驗 round-trip
// 一致才動手，格式若哪天改了會直接中止而不是默默重排整檔。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'apex_pool.json');
const DRY = process.argv.includes('--dry');

// [artist, album, genres[], year]
const ROW = ['楊祖珺', '楊祖珺', ['folk'], 1979];

const before = fs.readFileSync(FILE, 'utf8');
const pool = JSON.parse(before);

// 防呆①：格式必須就是 indent=1，否則寫回會重排整檔
if (JSON.stringify(pool, null, 1) !== before) {
  console.error('中止：apex_pool.json 的排版與 JSON.stringify(obj, null, 1) 不符，請改用字串替換法');
  process.exit(1);
}

if (pool.pearl.some(r => r[0] === ROW[0] && r[1] === ROW[1])) {
  console.log('已在 pearl 池，無需重複追加。');
  process.exit(0);
}

const counts = { hall: pool.hall.length, pearl: pool.pearl.length, heresy: pool.heresy.length };
pool.pearl.push(ROW);
const after = JSON.stringify(pool, null, 1);

// 防呆②：只有 pearl +1，其餘 tier 不動
if (pool.hall.length !== counts.hall || pool.heresy.length !== counts.heresy || pool.pearl.length !== counts.pearl + 1) {
  console.error('中止：tier 筆數不符預期');
  process.exit(1);
}
// 防呆③：新增內容只能是這一列（差異長度＝該列 JSON 長度＋逗號與縮排；用結構比對更嚴謹）
const reparsed = JSON.parse(after);
const diffOk = reparsed.pearl.length === counts.pearl + 1
  && JSON.stringify(reparsed.pearl[counts.pearl]) === JSON.stringify(ROW)
  && JSON.stringify(reparsed.pearl.slice(0, counts.pearl)) === JSON.stringify(JSON.parse(before).pearl);
if (!diffOk) { console.error('中止：追加後內容與預期不符'); process.exit(1); }

console.log(`pearl ${counts.pearl} → ${reparsed.pearl.length}｜hall ${counts.hall} 不變｜heresy ${counts.heresy} 不變`);
console.log('追加列:', JSON.stringify(ROW));
if (DRY) { console.log('\n(--dry 未寫檔)'); process.exit(0); }
fs.writeFileSync(FILE, after, 'utf8');
console.log('已寫入 apex_pool.json');
