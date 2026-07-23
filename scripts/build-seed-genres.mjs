// 為 seed_cards.json 補第 6 欄、apex_pool.json 補第 3 欄曲風標籤（音樂地圖 10 類 id 陣列）。
// 來源：worker /album-genres（Spotify→Last.fm，KV 永久快取；onboarding 已預播種，幾乎全 KV-HIT）。
// 可重複執行：已有曲風欄的列直接跳過——onboarding 追加新卡後重跑一次即可補齊。
// 用法：node scripts/build-seed-genres.mjs [--force]
import fs from 'node:fs';

const SEED = new URL('../seed_cards.json', import.meta.url);
const APEX = new URL('../apex_pool.json', import.meta.url);
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const MAP_GENRES = new Set(['jazz','rock','electronic','soul','hiphop','folk','classical','world','pop','blues']);
const CONCURRENCY = 8;
const force = process.argv.includes('--force');

const rows = JSON.parse(fs.readFileSync(SEED, 'utf8'));
const todo = rows.map((r, i) => ({ r, i })).filter(({ r }) => force || !Array.isArray(r[5]));
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
    if (!force && Array.isArray(list[i][2])) continue;
    const out = await fetchGenres(list[i][0], list[i][1]);
    if (out) { apex[tier][i] = [list[i][0], list[i][1], out.genres]; apexDone++; }
    else apexFailed++;
  }
}
if (apexDone || apexFailed) {
  const apexJson = '{\n' + ['hall', 'pearl', 'heresy']
    .map(t => JSON.stringify(t) + ': [' + (apex[t] || []).map(r => '\n' + JSON.stringify(r)).join(',') + '\n]').join(',\n') + '\n}';
  JSON.parse(apexJson);
  fs.writeFileSync(APEX, apexJson);
}
console.log(`apex tagged ${apexDone}, failed ${apexFailed}`);
