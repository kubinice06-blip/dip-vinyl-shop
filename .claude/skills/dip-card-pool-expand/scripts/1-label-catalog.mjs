// 步驟 1：廠牌目錄反查 —— 用 MusicBrainz 撈出整個廠牌的專輯清單
// 用法：node 1-label-catalog.mjs "Three Blind Mice" [輸出檔]
//       node 1-label-catalog.mjs --mbid <labelMbid> [輸出檔]
//
// 為何用廠牌反查而不是自己列專輯名：憑印象列清單會漏掉大半目錄，
// 也會把記錯的專輯名帶進流程（查不到封面時分不清是「沒收錄」還是「名字寫錯」）。
import fs from 'fs';

const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));   // MusicBrainz 硬性 1 req/s

const args = process.argv.slice(2);
let labelMbid = null, labelName = null, outPath = null;
if (args[0] === '--mbid') { labelMbid = args[1]; outPath = args[2]; }
else { labelName = args[0]; outPath = args[1]; }
if (!labelMbid && !labelName) { console.error('用法: node 1-label-catalog.mjs "<廠牌名>" [輸出檔]'); process.exit(1); }

async function mb(path, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(`https://musicbrainz.org/ws/2/${path}`, { headers: UA });
    await sleep(1100);
    if (r.ok) return r.json();
    // 503 是 MusicBrainz 暫時過載，不是查詢本身有問題，重試即可
    if (r.status === 503 && i < tries - 1) { await sleep(2000); continue; }
    throw new Error(`MusicBrainz HTTP ${r.status}`);
  }
}

if (!labelMbid) {
  const j = await mb(`label/?query=${encodeURIComponent(labelName)}&fmt=json&limit=5`);
  const labels = j.labels || [];
  if (!labels.length) { console.error(`找不到廠牌「${labelName}」`); process.exit(1); }
  console.log('候選廠牌：');
  labels.forEach((l, i) => console.log(`  ${i === 0 ? '→' : ' '} ${l.name} | ${l.id} | ${l.country || '?'} | ${l.disambiguation || ''}`));
  labelMbid = labels[0].id;
  labelName = labels[0].name;
  console.log(`\n採用第一筆：${labelName} (${labelMbid})`);
  console.log('※ 若選錯，改用 --mbid <正確 id> 重跑\n');
}

// 撈全目錄（分頁）。中途若某一頁持續失敗（重試 3 次仍 503），保留已抓到的頁數繼續，
// 不要讓整支腳本掛掉——大廠牌動輒十幾頁，沒必要因為一頁暫時故障就全部重來。
const all = [];
for (let off = 0; off < 5000; off += 100) {
  let j;
    try { j = await mb(`release/?label=${labelMbid}&fmt=json&limit=100&offset=${off}&inc=artist-credits+release-groups`); }
  catch (e) { console.error(`第 ${off}-${off + 99} 頁持續失敗（${e.message}），停在這裡`); break; }
  all.push(...(j.releases || []));
  if (all.length >= (j['release-count'] || 0)) break;
}
  console.log(`廠牌 release 總數：${all.length}`);

  // 廠牌目錄也包含 Single／EP／compilation；卡池只收 release-group type=Album。
  // release-groups 由上方 inc 一起取得，缺類型時保守排除，避免把非專輯送進後段流程。
  const albumReleases = all.filter(r => r['release-group']?.['primary-type'] === 'Album');
  console.log(`其中 Album release：${albumReleases.length}`);

// 同一張專輯常有多個 release（原盤／再版／日文與羅馬拼音掛名）→ 依標題歸群，保留所有 mbid 供後續逐個試封面
const norm = s => s.toLowerCase().replace(/[^a-z0-9ぁ-ヿ一-鿿]/g, '');
const byAlbum = new Map();
  for (const r of albumReleases) {
  const artist = (r['artist-credit'] || []).map(a => a.name).join(' & ') || '?';
  const key = norm(artist) + '|' + norm(r.title);
  if (!byAlbum.has(key)) byAlbum.set(key, { artist, title: r.title, ids: [], date: r.date || '' });
  const e = byAlbum.get(key);
  e.ids.push(r.id);
  if (r.date && (!e.date || r.date < e.date)) e.date = r.date;
}

// Various Artists 合輯不進卡池（卡牌是「一張專輯一位藝人」的單位）
const rows = [...byAlbum.values()].filter(r => !/various artists/i.test(r.artist));
console.log(`去重後 ${byAlbum.size} 張，排除合輯後 ${rows.length} 張`);

const out = outPath || `label-${(labelName || labelMbid).replace(/\s+/g, '-')}.json`;
fs.writeFileSync(out, JSON.stringify(rows, null, 1));
console.log(`→ 已寫入 ${out}`);
