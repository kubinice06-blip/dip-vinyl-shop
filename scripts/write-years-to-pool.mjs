// 把 release-years-v1.json 的年份寫進卡池本體：
//   seed_cards.json  第 7 欄（[artist, album, classic, obscurity, accessibility, genres, year]）
//   （2026-08-30 起王牌與一般卡同一份檔，不再有另一種列格式）
//
//   node scripts/write-years-to-pool.mjs --dry-run   # 只報告不寫檔
//   node scripts/write-years-to-pool.mjs             # 只補「卡池尚未有年份」的列
//   node scripts/write-years-to-pool.mjs --overwrite # 連已有年份的列也照資料集覆寫（危險，見下）
//
// ⚠ 2026-08-14：原本這支是**無條件覆寫**（`row[6] = year`），跑一次會改掉 106 張 seed
// 與 3 張 apex 的年份，其中包含人工查證後裁定的值——例如 Erroll Garner《Erroll Garner》
// 會被改回 1951（正確是 1953-02-27 錄音、1953-11-02 Columbia CL 535 發行）、
// Albert Ayler《Ghosts》會被改回 1964（正確是 1965 丹麥 Debut DEB 144 發行）。
// 資料集分不出「錄音年／首發年／重發年」，而卡池的年份是人工裁定過的。
// 因此**預設改為只補空缺**，衝突只列出來給人看，要覆寫得自己加 --overwrite。
//
// 放在卡池本體而不是另開一支檔案，是為了讓前端零額外請求就拿得到年份
// （index/battle/roguelike 開場本來就會載入這兩個檔）。
// 沒查到年份的列維持原長度，不補 null——解構時 r[6] 自然是 undefined，前端顯示空字串。
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dryRun = process.argv.includes('--dry-run');
const overwrite = process.argv.includes('--overwrite');
const conflicts = [];                                // 資料集與卡池不同、且卡池已有值的列

const normalized = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿ가-힯]+/g, '');
const cardKey = (artist, album) => `${normalized(artist)}\u0000${normalized(album)}`;

const readJson = async file => JSON.parse(await fs.readFile(file, 'utf8'));

const seedPath = path.join(root, 'seed_cards.json');
const years = (await readJson(path.join(root, 'data', 'release-years-v1.json'))).entries;

// ── seed_cards.json ──
const seed = await readJson(seedPath);
let seedFilled = 0, seedMissing = 0, seedChanged = 0;
for (const row of seed) {
  const year = years[cardKey(row[0], row[1])];
  if (!year) { seedMissing++; continue; }
  if (!Array.isArray(row[5])) row[5] = [];           // 第 6 欄必須先存在，年份才能佔第 7 位
  if (typeof row[6] === 'number') {                  // 卡池已有值＝人工裁定過，預設不動
    if (row[6] !== year) {
      conflicts.push({ pool: 'seed', artist: row[0], album: row[1], now: row[6], dataset: year });
      if (overwrite) { row[6] = year; seedChanged++; }
    }
    continue;
  }
  row[6] = year;
  seedFilled++;
}

// 2026-08-30 卡池合併後，王牌就是上面那份檔裡第 9 欄有 tier 的列，年份一樣在第 7 欄，
// 上面的迴圈已經全部涵蓋——原本這裡有一段結構不同的 apex 版本（年份在第 4 欄），
// 連同「兩支寫檔腳本排版必須同調、否則交替跑會整檔重排」那個坑，一起消失了。

if (!dryRun) {
  // 保持既有的一列一卡格式（與 build-seed-genres.mjs 寫出的格式一致，diff 才看得懂）
  await fs.writeFile(seedPath, '[' + seed.map(row => JSON.stringify(row)).join(',\n') + ']', 'utf8');
}

if (conflicts.length) {
  console.log(`⚠ 資料集與卡池現值不同的 ${conflicts.length} 列（${overwrite ? '已依 --overwrite 覆寫' : '未改動，卡池值優先'}）：`);
  for (const c of conflicts) console.log(`   [${c.pool}] ${c.artist} — ${c.album}：卡池 ${c.now} ／ 資料集 ${c.dataset}`);
}
console.log(JSON.stringify({
  mode:dryRun ? 'dry-run' : 'write',
  policy:overwrite ? 'overwrite' : 'fill-only',
  conflicts:conflicts.length,
  pool:{ total:seed.length, filled:seedFilled, missing:seedMissing, changed:seedChanged,
         apex:seed.filter(r => r[8]).length },
  // 覆蓋率＝跑完之後卡池裡實際有年份的比例（改成 fill-only 之後 filled 多半是 0，
  // 沿用舊算式會誤報 0.0%，所以直接數卡池現況）。
  coverage:(() => {
    const hasYear = seed.filter(r => typeof r[6] === 'number').length;
    return `${(100 * hasYear / seed.length).toFixed(1)}%（${hasYear}/${seed.length}）`;
  })()
}, null, 1));
