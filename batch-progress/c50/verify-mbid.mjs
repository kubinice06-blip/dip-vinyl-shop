// 逐張以 rgMbid 直接向 MusicBrainz 取 release-group，覆核收斂器選出來的碟。
// 用法：node batch-progress/c50/verify-mbid.mjs [--out 檔名]
//
// 為什麼要有這支：mb-raw.json 是**搜尋結果的快取**，收斂器是在那份快取上挑。
// 快取可能過期、搜尋可能沒回傳正解、挑選邏輯本身也可能有錯——2026-08-30 就因為
// 欄位命名錯配讓十張卡釘到單曲、合輯、現場盤與宣傳盤。用 ID 直接取才是獨立的第二來源：
// 它問的是「這個 ID 現在到底是什麼」，不是「當初搜尋回了什麼」。
//
// 逾時與 HTTP 錯誤一律不得當成「查無」或「通過」，全部列進 errors 並以非零狀態碼結束。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const DIR = path.join(ROOT, 'batch-progress/c50');
const UA = 'dip-vinyl-shop/1.0 (https://github.com/kubinice06-blip/dip-vinyl-shop)';
const BAD_SECONDARY = ['Compilation', 'Live', 'Soundtrack', 'Remix', 'DJ-mix', 'Demo', 'Interview'];
const ACCEPT = JSON.parse(fs.readFileSync(path.join(DIR, 'accept-secondary.json'), 'utf8'));

const cand = JSON.parse(fs.readFileSync(path.join(DIR, 'cand.json'), 'utf8'));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const outPath = path.join(DIR, 'verify-mbid-out.json');
const done = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};

for (const c of cand.albums) {
  const k = `${c.artist}|${c.album}`;
  if (done[k] && !done[k]._http) continue;
  const url = `https://musicbrainz.org/ws/2/release-group/${c.rgMbid}?inc=artist-credits&fmt=json`;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) { done[k] = { _http: r.status }; }
    else {
      const j = await r.json();
      done[k] = {
        title: j.title,
        primaryType: j['primary-type'],
        secondaryTypes: j['secondary-types'] || [],
        firstRelease: j['first-release-date'] || '',
        credit: (j['artist-credit'] || []).map(x => x.name).join(', '),
      };
    }
  } catch (e) { done[k] = { _http: String(e.message || e) }; }
  fs.writeFileSync(outPath, JSON.stringify(done, null, 1));
  await sleep(1100);   // MB 規定 1 req/s，留一成餘裕
}

const errors = [], mismatches = [];
for (const c of cand.albums) {
  const k = `${c.artist}|${c.album}`, v = done[k];
  if (!v) { errors.push(`${k}：未查詢`); continue; }
  if (v._http !== undefined) { errors.push(`${k}：查詢失敗 ${v._http}`); continue; }
  const bad = (v.secondaryTypes || []).filter(x => BAD_SECONDARY.includes(x));
  const why = ACCEPT[k];
  if (v.primaryType !== 'Album' && !why) mismatches.push(`${k}：primary-type 是 ${v.primaryType || '未登錄'}`);
  if (bad.length && !why) mismatches.push(`${k}：secondary-type 含 ${bad.join('/')}`);
  if (v.title !== c.mbTitle) mismatches.push(`${k}：MB 標題現為「${v.title}」，卡片記「${c.mbTitle}」`);
  if (v.firstRelease !== c.mbFirstRelease) mismatches.push(`${k}：首發現為 ${v.firstRelease || '未載'}，卡片記 ${c.mbFirstRelease || '未載'}`);
}
console.log(`覆核 ${cand.albums.length} 張｜查詢失敗 ${errors.length}｜與卡片不符 ${mismatches.length}`);
errors.forEach(e => console.log('  ✗', e));
mismatches.forEach(m => console.log('  ⚠', m));
process.exit(errors.length ? 2 : 0);
