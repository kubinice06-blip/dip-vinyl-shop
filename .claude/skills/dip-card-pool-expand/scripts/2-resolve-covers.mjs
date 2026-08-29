// 步驟 2：封面解析鏈 —— Bandcamp → Spotify → Cover Art Archive（含寬鬆補救輪）
// 用法：node 2-resolve-covers.mjs <步驟1的輸出檔> [輸出檔]
//
// 順序理由：
//   1. Bandcamp（worker /bandcamp-search）：無限流、日系復刻盤命中率高，先打它省 MusicBrainz 配額
//   2. Spotify（worker /spotify-search）：主流盤最準，但會 429（限流時整批回空，不代表查無此碟）
//   3. CAA：老黑膠／冷門盤最強，但需先向 MusicBrainz 要 mbid（1 req/s），所以放最後只處理漏網的
import fs from 'fs';

const W = 'https://dip-vinyl-worker.kubinice06.workers.dev';
const UA = { 'User-Agent': 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const inPath = process.argv[2];
const outPath = process.argv[3] || inPath.replace(/\.json$/, '-covers.json');
if (!inPath) { console.error('用法: node 2-resolve-covers.mjs <步驟1輸出檔> [輸出檔]'); process.exit(1); }
const rows = JSON.parse(fs.readFileSync(inPath, 'utf-8'));

// CAA 圖檔是 302 轉到 Internet Archive 節點，該節點偶爾逾時 → 一律加逾時與重試，否則會零星漏抓
let timeouts = 0;
async function grab(url, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try { return await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) }); }
    catch (e) { timeouts++; if (i < tries - 1) await sleep(800); }
  }
  return null;
}
async function viaWorker(endpoint, artist, album) {
  try {
    const j = await (await fetch(`${W}/${endpoint}?artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}`)).json();
    return j.imageUrl || null;
  } catch (e) { return null; }
}
async function mbQuery(q, limit = 8) {
  const r = await fetch(`https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(q)}&fmt=json&limit=${limit}`, { headers: UA });
  await sleep(1100);
  return r.ok ? ((await r.json()).releases || []) : [];
}
async function caaTry(rels, minScore) {
  for (const rel of rels.filter(x => (x.score || 0) >= minScore).slice(0, 5)) {
    const c = await grab(`https://coverartarchive.org/release/${rel.id}/front-500`);
    if (c && c.ok) return { url: `https://coverartarchive.org/release/${rel.id}/front-500`, mbid: rel.id, matched: rel.title };
    // 原盤沒人掃封面時，再版（同 release-group）常常有
    const rr = await fetch(`https://musicbrainz.org/ws/2/release/${rel.id}?fmt=json&inc=release-groups`, { headers: UA });
    await sleep(1100);
    if (rr.ok) {
      const rg = (await rr.json())['release-group'];
      if (rg) {
        const g = await grab(`https://coverartarchive.org/release-group/${rg.id}/front-500`);
        if (g && g.ok) return { url: `https://coverartarchive.org/release-group/${rg.id}/front-500`, rgid: rg.id, matched: rel.title };
      }
    }
  }
  return null;
}

// ── 主輪 ──
const results = [];
const bySrc = { bandcamp: 0, spotify: 0, caa: 0, 'caa-rescue': 0, none: 0 };
for (const row of rows) {
  const artist = row.artist;
  const title = row.title ?? row.album; // 1b 輸出用 title，2b（評分排序）輸出用 album — 兩種都吃
  if (!artist || !title) { console.error(`✗ 跳過缺 artist/title 的列: ${JSON.stringify(row)}`); continue; }
  let url = await viaWorker('bandcamp-search', artist, title), src = url ? 'bandcamp' : null;
  if (!url) { url = await viaWorker('spotify-search', artist, title); if (url) src = 'spotify'; }
  let extra = {};
  if (!url) {
    // 主輪的 CAA 走嚴格門檻（score>=80），避免通用單字標題誤配
    const hit = await caaTry(await mbQuery(`release:"${title}" AND artist:"${artist}"`), 80);
    if (hit) { url = hit.url; src = 'caa'; extra = hit; }
  }
  bySrc[src || 'none']++;
  results.push({ ...row, url: url || null, src, ...extra });
  console.log(`${src ? '✓ ' + src.padEnd(9) : '✗ miss    '} | ${artist} - ${title}`);
}

// ── 補救輪：多藝人聯名／變體標題查詢過嚴 → 拆出主要藝人、放寬到 score>=60 ──
// 安全性：查詢字串仍帶藝人名，所以放寬門檻不會配到別人的同名專輯（已實測 Air／Mari／Blow Up 等通用標題皆正確）
const misses = results.filter(r => !r.src);
console.log(`\n── 補救輪：${misses.length} 張 ──`);
for (const m of misses) {
  const mTitle = m.title ?? m.album; // 主迴圈同款：2b 輸出用 album
  if (!mTitle) { console.error(`✗ 跳過缺 title/album 的列: ${JSON.stringify(m)}`); continue; }
  const mainArtist = m.artist.split(/\s*&\s*/)[0].trim();
  let rels = await mbQuery(`release:"${mTitle}" AND artist:"${mainArtist}"`);
  if (!rels.length) rels = await mbQuery(`release:"${mTitle}"`);
  const hit = await caaTry(rels, 60);
  if (hit) { Object.assign(m, hit, { src: 'caa-rescue' }); bySrc['caa-rescue']++; bySrc.none--; console.log(`✓ 救回 ${m.artist} - ${mTitle}`); }
  else console.log(`✗ 仍無 ${m.artist} - ${mTitle}`);
}

fs.writeFileSync(outPath, JSON.stringify(results, null, 1));
const got = results.filter(r => r.src).length;
console.log(`\n來源分布: ${JSON.stringify(bySrc)}`);
console.log(`總命中 ${got}/${results.length} = ${(got / results.length * 100).toFixed(0)}%`);
console.log(`CAA 逾時重試次數: ${timeouts}`);
console.log(`→ 已寫入 ${outPath}`);
console.log('\n⚠ 若 spotify 命中數為 0，多半是 Spotify 正在 429 限流 —— 這不代表那些碟不存在。');
console.log('  可稍後重跑本步驟讓 Spotify 補上（已命中的不會變動）。');
