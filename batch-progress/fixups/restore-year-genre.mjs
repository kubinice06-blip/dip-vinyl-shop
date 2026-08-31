// 補回 c-48／c-49／c-50 上架時掉的年份與曲風。
// 用法：node batch-progress/fixups/restore-year-genre.mjs [--write]
//
// 2026-08-30 三批上架後的健檢發現兩件事，兩件都只發生在這三批、其他批一張都沒有：
//
// 1. **269 張全部年份為空**。候選檔 310 張裡 310 張都有 suggestedYear，
//    所以年份是在上架那一段掉的，不是策展層沒給。這裡逐張從候選檔補回。
//    補回的值已包含本批的年份裁決（Albert Ayler 取首發年 1965 而非錄音年 1964 等）。
//
// 2. **29 張曲風欄為空**，首頁「類型挑片」抽不到，等於在那個入口是隱形的。
//    根因是卡單的 `genre` 欄寫的是批次內部標籤——c-49 全寫 `"chinese"`，
//    而卡池的曲風值域只有音樂地圖的十個 id
//    （rock／jazz／soul／electronic／pop／hiphop／folk／classical／world／blues）。
//    `chinese` 對應不到任何 id 就留空。**這是批次標籤外洩到卡池格式**，
//    不是上架程式的錯——下次切卡單時 genre 欄就該直接寫 id。
//
//    11 張古典的補 ["classical"]，與同批其他 70 張一致、無需判斷。
//    18 張華語逐張指定於下方 ZH_GENRES，理由寫在該表註解。
import fs from 'node:fs';
import path from 'node:path';
import { key, ROOT } from '../lib.mjs';

// 華語 18 張的曲風指派。卡池慣例：時代曲、國語流行、台語流行一律歸 pop
// （時代曲是華語流行的源頭，池中既有的鄧麗君《淡淡幽情》也是 pop）。
// 樂隊與帶明顯靈魂樂底的歌手才另掛第二個 id。
const ZH_GENRES = {
  // 時代曲與 1960–70 年代國語流行
  '吳鶯音|百代中國時代曲名典七：吳鶯音之二 明月千里寄相思': ['pop'],
  '潘秀瓊|百代中國時代曲名典43：潘秀瓊 情人的眼淚': ['pop'],
  '靜婷|百代中國時代曲名典42：靜婷 痴痴地等': ['pop'],
  '紫薇|綠島小夜曲': ['pop'],
  '青山|淚的小花': ['pop'],
  '劉文正|諾言': ['pop'],
  '鄧麗君 Teresa Teng|島國之情歌第一集': ['pop'],
  '鄧麗君 Teresa Teng|一封情書': ['pop'],
  '鄧麗君 Teresa Teng|償還': ['pop'],
  '鄧麗君 Teresa Teng|我只在乎你': ['pop'],
  // 台語流行
  '葉啟田|愛拚才會贏': ['pop'],
  '陳小雲|舞女': ['pop'],
  '陳小雲|愛情恰恰': ['pop'],
  '龍千玉|鄉愁': ['pop'],
  '陳雷|歡喜就好': ['pop'],
  // 樂隊：太極是香港搖滾樂隊，主體是搖滾編制
  '太極|迷': ['rock', 'pop'],
  // 杜麗莎的唱法出自靈魂樂與節奏藍調訓練，不是純流行唱腔
  '杜麗莎|The Magic of Teresa Carpio': ['pop', 'soul'],
  // 電影配樂按**聲音本體**分流（c-46 定的規則，不按「這是配樂」分）。
  // 《東邪西毒》是管弦為主體、加中國樂器音色，比照池中盧律銘《返校 電影原聲帶》→ classical。
  '陳勳奇|東邪西毒': ['classical', 'world'],
};
const VALID = ['rock', 'jazz', 'soul', 'electronic', 'pop', 'hiphop', 'folk', 'classical', 'world', 'blues'];
for (const [k, g] of Object.entries(ZH_GENRES)) {
  const bad = g.filter(x => !VALID.includes(x));
  if (bad.length) throw new Error(`${k} 的曲風 ${bad.join('、')} 不在音樂地圖值域`);
}

const write = process.argv.includes('--write');

// 候選檔＝年份的權威來源（含本批的年份裁決）
const cand = new Map();
for (const b of ['c48', 'c49', 'c50']) {
  const d = path.join(ROOT, 'batch-progress', b);
  for (const f of fs.readdirSync(d)) {
    if (!/^cand(-.*)?\.json$/.test(f)) continue;
    for (const a of JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')).albums || [])
      cand.set(key(a.artist) + '|' + key(a.album), a);
  }
}

const rows = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'));
let yFixed = 0, gFixed = 0;
const unresolved = [];
for (const r of rows) {
  const k = key(r[0]) + '|' + key(r[1]);
  const c = cand.get(k);
  if (r[6] === null || r[6] === undefined || r[6] === '') {
    if (c && c.suggestedYear) { r[6] = c.suggestedYear; yFixed++; }
    else unresolved.push(`年份補不回：${r[0]} — ${r[1]}`);
  }
  if (!Array.isArray(r[5]) || !r[5].length) {
    const zh = ZH_GENRES[`${r[0]}|${r[1]}`];
    // 候選檔的 genreFamily 是 classical 的，直接對應到同名 id
    const g = zh || (c && c.genreFamily === 'classical' ? ['classical'] : null);
    if (g) { r[5] = g; gFixed++; }
    else unresolved.push(`曲風補不回：${r[0]} — ${r[1]}`);
  }
}

console.log(`年份補回 ${yFixed} 張｜曲風補回 ${gFixed} 張｜仍未解 ${unresolved.length} 筆`);
unresolved.forEach(s => console.log('  ⚠ ' + s));

if (write) {
  // seed_cards.json 是「一列一行」的自訂排版（見 scripts/pool.mjs 的 savePool）。
  // 直接 JSON.stringify(rows, null, 2) 會把一萬三千列炸成十幾萬行、diff 完全不能看。
  fs.writeFileSync(path.join(ROOT, 'seed_cards.json'), JSON.stringify(rows).replace(/\],\[/g, '],\n['));
  console.log('已寫回 seed_cards.json');
}
process.exit(unresolved.length ? 1 : 0);
