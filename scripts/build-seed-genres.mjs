// 為 seed_cards.json 補第 6 欄、apex_pool.json 補第 3 欄曲風標籤（音樂地圖 10 類 id 陣列）。
// 來源：worker /album-genres（Spotify→Last.fm，KV 永久快取；onboarding 已預播種，幾乎全 KV-HIT）。
// 可重複執行：已有曲風欄的列直接跳過——onboarding 追加新卡後重跑一次即可補齊。
// 用法：node scripts/build-seed-genres.mjs [--force] [--fix-only]
//   --fix-only：不打 worker，只對既有曲風欄套用下方 SOUL_FIX 人工覆寫表。
import fs from 'node:fs';

// ---------- 人工覆寫：Last.fm 把「R&B」粗分成 hiphop，經典 soul 世代整批被誤標 ----------
// 這些藝人的卡一律移除 hiphop 標、保證帶 soul 標（當代 R&B 如 TLC/Usher/Mariah 維持 hiphop 標，
// 因為遊戲層 hiphop＋R&B 同一類）。每次重抓（--force 或新卡）後都會自動套用，不會被重新污染。
const SOUL_FIX = new Set([
  // 經典 soul / funk / disco / Motown / Stax
  'Al Green','Aretha Franklin','Barry White','Bill Withers','Bobby Womack','Cameo','Chic',
  'Commodores','Curtis Mayfield','Diana Ross','Donny Hathaway','Earth, Wind & Fire',
  'Gladys Knight & the Pips','Ike & Tina Turner','Isaac Hayes','James Brown','Kool & the Gang',
  'Luther Vandross','Marvin Gaye','Michael Jackson','Millie Jackson','Minnie Riperton',
  'Ohio Players','Otis Clay','Otis Redding','Parliament','Prince','Roberta Flack',
  'Roberta Flack & Donny Hathaway','Rufus & Chaka Khan','Sam & Dave','Sam Cooke','Sister Sledge',
  'Sly & The Family Stone','Sly & the Family Stone','Smokey Robinson','Solomon Burke',
  'Stevie Wonder','Swamp Dogg','Syl Johnson','Teddy Pendergrass','The Dramatics','The Gap Band',
  'The Impressions','The Isley Brothers','The O’Jays','The Spinners','The Supremes',
  'The Temptations','Wilson Pickett',
  // 復古 soul 復興
  'Sharon Jones & The Dap-Kings','Lee Fields','Charles Bradley','Durand Jones & The Indications',
  'Leon Bridges','Michael Kiwanuka','Cleo Sol','Jordan Rakei','Joss Stone','Janelle Monáe',
  // neo-soul（聲音本體是 soul；嘻哈淵源不足以歸嘻哈類）
  "D'Angelo",'Erykah Badu','Maxwell','Jill Scott','India.Arie','Musiq Soulchild','Bilal',
  'Dwele','Angie Stone','Anthony Hamilton','Raphael Saadiq',
  // 誤標離譜的流行歌手
  'Ed Sheeran','Charlie Puth','George Michael',
]);
function applySoulFix(artist, genres) {
  if (!SOUL_FIX.has(artist) || !Array.isArray(genres)) return genres;
  const g = genres.filter(x => x !== 'hiphop');
  if (!g.includes('soul')) g.unshift('soul');
  return g;
}
const fixOnly = process.argv.includes('--fix-only');

const SEED = new URL('../seed_cards.json', import.meta.url);
const APEX = new URL('../apex_pool.json', import.meta.url);
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const MAP_GENRES = new Set(['jazz','rock','electronic','soul','hiphop','folk','classical','world','pop','blues']);
const CONCURRENCY = 8;
const force = process.argv.includes('--force');

const rows = JSON.parse(fs.readFileSync(SEED, 'utf8'));
const todo = fixOnly ? [] : rows.map((r, i) => ({ r, i })).filter(({ r }) => force || !Array.isArray(r[5]));
console.log(`total ${rows.length} rows, to fetch: ${todo.length}`);

let done = 0, hits = 0, empty = 0, failed = 0;
async function fetchGenres(artist, album) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${WORKER}/album-genres?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`);
      if (!res.ok) throw new Error(`http ${res.status}`);
      const kvHit = res.headers.get('X-Cache') === 'KV-HIT';
      const genres = [...new Set(((await res.json()).genres || []).filter(g => MAP_GENRES.has(g)))];
      return { genres, kvHit };
    } catch (e) {
      if (attempt === 2) { console.warn('FAIL', artist, '—', album, String(e)); return null; }
      await new Promise(s => setTimeout(s, 1500 * (attempt + 1)));
    }
  }
}

let cursor = 0;
async function worker() {
  while (cursor < todo.length) {
    const { r, i } = todo[cursor++];
    const out = await fetchGenres(r[0], r[1]);
    if (out) {
      rows[i] = [r[0], r[1], r[2], r[3], r[4], out.genres];
      if (out.kvHit) hits++;
      if (!out.genres.length) empty++;
    } else failed++;
    if (++done % 250 === 0) console.log(`${done}/${todo.length} (KV-HIT ${hits}, empty ${empty}, failed ${failed})`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// 全表套用人工覆寫（含 --fix-only 模式：只做這一步）
let fixed = 0;
for (const r of rows) {
  if (!Array.isArray(r[5])) continue;
  const g = applySoulFix(r[0], r[5]);
  if (g !== r[5] && JSON.stringify(g) !== JSON.stringify(r[5])) { r[5] = g; fixed++; }
}
console.log(`soul-fix applied to ${fixed} seed rows`);

// 保持一列一卡的檔案格式（與現有 seed_cards.json 相同）
fs.writeFileSync(SEED, '[' + rows.map(r => JSON.stringify(r)).join(',\n') + ']');
console.log(`seed done ${done}: KV-HIT ${hits}, empty-genre ${empty}, failed(kept 5-col) ${failed}`);
const tagged = rows.filter(r => Array.isArray(r[5])).length;
console.log(`seed rows with genre column: ${tagged}/${rows.length}`);

// apex_pool：三分類各列補第 3 欄曲風（前端 pickApexCard 靠它在類型挑片挑同曲風王牌）
const apex = JSON.parse(fs.readFileSync(APEX, 'utf8'));
let apexDone = 0, apexFailed = 0;
for (const tier of ['hall', 'pearl', 'heresy']) {
  const list = apex[tier] || [];
  for (let i = 0; i < list.length; i++) {
    if (!fixOnly && (force || !Array.isArray(list[i][2]))) {
      const out = await fetchGenres(list[i][0], list[i][1]);
      if (out) { apex[tier][i] = [list[i][0], list[i][1], out.genres]; apexDone++; }
      else apexFailed++;
    }
    // 人工覆寫（含 --fix-only）
    const g = applySoulFix(list[i][0], list[i][2]);
    if (Array.isArray(g) && JSON.stringify(g) !== JSON.stringify(list[i][2])) { apex[tier][i] = [list[i][0], list[i][1], g]; apexDone++; }
  }
}
if (apexDone || apexFailed) {
  const apexJson = '{\n' + ['hall', 'pearl', 'heresy']
    .map(t => JSON.stringify(t) + ': [' + (apex[t] || []).map(r => '\n' + JSON.stringify(r)).join(',') + '\n]').join(',\n') + '\n}';
  JSON.parse(apexJson);
  fs.writeFileSync(APEX, apexJson);
}
console.log(`apex tagged ${apexDone}, failed ${apexFailed}`);
