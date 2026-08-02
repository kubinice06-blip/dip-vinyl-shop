// 卡池封面稽核 步驟 8：清掉配錯的 cover6: 快取，讓它們用新版比對邏輯重新解析。
//
// 為什麼需要這一步：worker 的新覆核邏輯只在 KV MISS 時才跑，已經配錯並永久快取的卡
// （如 Gong《You》）不會自己好，必須先刪鍵再重打一次。
//
// **執行前提：Spotify 必須沒有被限流。** 限流期間重新解析會全部落到 Cover Art Archive
// 補救層——封面是對的，但拿不到 spotifyUrl，等於白白丟掉直連。腳本開頭會自己檢查，
// 還在 429 就直接中止並印出剩餘時間。
//
// 用法：node scripts/cover-audit/8-refresh-suspects.mjs [--levels A,B] [--dry] [--gap 1500]
// 產出：scripts/cover-audit/data/refresh-result.json（逐張 before／after）
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const LEVELS = String(argOf('--levels', 'A')).split(',').map(s => s.trim());
const GAP = Number(argOf('--gap', 1500));
const DRY = argv.includes('--dry');

const ACCOUNT = '3a23f905e8f31d91c85050f2ed304321';
const NS = '5f65e74b17d644b68a3f542b08a5c105';
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
if (!TOKEN) { console.error('缺 CLOUDFLARE_API_TOKEN'); process.exit(1); }
const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces/${NS}`;
const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const WORKER = 'https://dip-vinyl-worker.kubinice06.workers.dev';

// ── 前提檢查：Spotify 還在限流就不要動 ──
const tok = await (await fetch(`${WORKER}/spotify-token`)).json();
if (!tok.access_token) { console.error('拿不到 Spotify token，中止'); process.exit(1); }
const probe = await fetch('https://api.spotify.com/v1/search?q=abbey%20road&type=album&limit=1&market=TW',
  { headers: { Authorization: 'Bearer ' + tok.access_token } });
if (probe.status === 429) {
  const h = (Number(probe.headers.get('retry-after') || 0) / 3600).toFixed(1);
  console.error(`Spotify 仍在限流（Retry-After 約 ${h} 小時）。現在重新解析會全部落到 CAA、丟掉 spotifyUrl，中止。`);
  process.exit(2);
}
if (!probe.ok) { console.error(`Spotify 探測回 ${probe.status}，中止`); process.exit(1); }
console.log('Spotify 可用，開始。');

const suspects = JSON.parse(fs.readFileSync(path.join(OUT, 'suspects.json'), 'utf8'))
  .filter(r => LEVELS.includes(r.level));
console.log(`目標 ${suspects.length} 張（等級 ${LEVELS.join('／')}）${DRY ? '｜乾跑' : ''}`);
if (!suspects.length) process.exit(0);

const keys = suspects.map(r => `cover6:${r.key}`);
if (DRY) {
  suspects.slice(0, 15).forEach(r => console.log(`  ${r.artist} / ${r.album} → 現值《${r.spotifyName}》`));
  console.log(`（乾跑，未刪除。實際執行請拿掉 --dry）`);
  process.exit(0);
}

// ── 刪除 ──
for (let i = 0; i < keys.length; i += 100) {
  const slice = keys.slice(i, i + 100);
  const r = await fetch(BASE + '/bulk/delete', { method: 'POST', headers: H, body: JSON.stringify(slice) });
  const j = await r.json();
  if (!j.success) { console.error('刪除失敗：', JSON.stringify(j.errors)); process.exit(1); }
  console.log(`已刪 ${Math.min(i + 100, keys.length)}/${keys.length}`);
}

// ── 重新解析（節流；每張都會走 MISS → 新版比對邏輯）──
const rows = [];
let changed = 0, stillSpotify = 0, nowCaa = 0, empty = 0;
for (let i = 0; i < suspects.length; i++) {
  const s = suspects[i];
  const u = `${WORKER}/spotify-search?artist=${encodeURIComponent(s.artist)}&album=${encodeURIComponent(s.album)}`;
  let after = null;
  for (let a = 1; a <= 3 && !after; a++) {
    try { const r = await fetch(u); if (r.ok) after = await r.json(); else await sleep(2000 * a); }
    catch { await sleep(2000 * a); }
  }
  after = after || {};
  if (after.coverSource === 'coverartarchive') nowCaa++;
  else if (after.spotifyUrl) stillSpotify++;
  else if (!after.imageUrl) empty++;
  if (after.imageUrl !== s.imageUrl) changed++;
  rows.push({
    key: s.key, artist: s.artist, album: s.album, level: s.level,
    beforeSpotifyName: s.spotifyName, beforeImage: s.imageUrl,
    afterImage: after.imageUrl || null, afterSpotifyUrl: after.spotifyUrl || null,
    afterSource: after.coverSource || 'spotify', replaced: after.replacedSpotifyAlbum || null
  });
  if (i % 10 === 9) process.stdout.write(`\r重解析 ${i + 1}/${suspects.length}`);
  await sleep(GAP);
}
fs.writeFileSync(path.join(OUT, 'refresh-result.json'), JSON.stringify(rows, null, 1));
console.log(`\n完成：封面有變 ${changed}｜改由 CAA 供圖 ${nowCaa}｜仍是 Spotify ${stillSpotify}｜無圖 ${empty}`);
console.log('逐張結果：data/refresh-result.json');
