// 封面「版本」稽核 步驟 10：找出封面可能抽到非預期壓片的卡。
//
// 背景（2026-08-29，Ry Cooder《Paris, Texas》實例）：card_catalog.coverUrl 多數存的是
// coverartarchive.org/release-group/<rg>/front，而 **CAA 這個端點回的是該群組底下
// 任意一筆 release 的圖**。那張抽到 1985 德版 12" 的車牌封面，而美版是劇照拼貼。
// 全部 manifest 有 3,751 張（94.7%）用這種網址，任何多壓片專輯都可能顯示非預期版本。
//
// 這一步只抓中繼資料、不下載圖，因此便宜：
//   - MusicBrainz browse（1 次／release-group）→ 該群組所有 release 的年份、國別、廠牌、
//     以及 **cover-art-archive 旗標**（哪些 release 真的有正面圖）。這一欄讓我們不必
//     逐 release 去問 CAA，把 19,000 次請求壓成 3,750 次。
//   - CAA release-group JSON（1 次／release-group）→ 目前這個網址**實際服務的是哪一筆 release**。
//
// MusicBrainz 要求 1 req/s 且需具識別性的 User-Agent，所以整批約需一小時。
// 可續跑：結果逐批寫入 data/edition-scan.json，中斷後重跑會跳過已完成的。
//
// 用法：node scripts/cover-audit/10-edition-scan.mjs [--limit N]
// 產出：scripts/cover-audit/data/edition-scan.json
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'scripts', 'cover-audit', 'data');
const CACHE = path.join(OUT, 'edition-scan.json');
const UA = { 'User-Agent': 'dip-vinyl-cover-audit/1.0 (kubinice06@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const argv = process.argv.slice(2);
const li = argv.indexOf('--limit');
const LIMIT = li >= 0 ? Number(argv[li + 1]) : Infinity;

// ── 收集待掃的 release-group ──
const targets = new Map();
for (const f of fs.readdirSync(ROOT)) {
  if (!/^onboarding-manifest-.*\.json$/.test(f)) continue;
  for (const a of (JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8')).albums || [])) {
    const m = (a.cover?.url || '').match(/\/release-group\/([0-9a-f-]{36})\/front/);
    if (!m) continue;
    if (!targets.has(m[1])) targets.set(m[1], { rg: m[1], cards: [] });
    targets.get(m[1]).cards.push({ artist: a.artist, album: a.album, batch: f.replace(/^onboarding-manifest-|\.json$/g, '') });
  }
}

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
const todo = [...targets.values()].filter(t => !cache[t.rg]).slice(0, LIMIT);
console.log(`release-group 共 ${targets.size}，已完成 ${Object.keys(cache).length}，本次待跑 ${todo.length}`);

async function getJson(url, { headers = {}, tries = 4, allow404 = false } = {}) {
  let last = 0;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(25000) });
      last = r.status;
      if (r.ok) return { status: r.status, data: await r.json() };
      if (r.status === 404) return { status: 404, data: null };
      if (r.status !== 429 && r.status < 500) return { status: r.status, data: null };
    } catch { /* timeout → 重試 */ }
    await sleep(2000 * (i + 1));
  }
  return { status: last, data: null };
}

let done = 0, failed = 0;
const t0 = Date.now();
for (const t of todo) {
  // MusicBrainz：1 req/s
  const mb = await getJson(`https://musicbrainz.org/ws/2/release?release-group=${t.rg}&inc=labels+media&fmt=json&limit=100`, { headers: UA });
  const releases = (mb.data?.releases || []).map(x => ({
    id: x.id,
    date: x.date || '',
    country: x.country || '',
    format: (x.media || []).map(m => m.format).filter(Boolean).join('+'),
    label: (x['label-info'] || []).map(l => l.label?.name).filter(Boolean).join(' / '),
    catno: (x['label-info'] || []).map(l => l['catalog-number']).filter(Boolean).join(' / '),
    front: !!x['cover-art-archive']?.front,
  }));
  // CAA：目前這個網址實際服務哪一筆 release
  const caa = await getJson(`https://coverartarchive.org/release-group/${t.rg}`, { allow404: true });
  const servedRelease = (caa.data?.release || '').split('/').pop() || null;

  cache[t.rg] = {
    rg: t.rg, cards: t.cards, releases,
    mbStatus: mb.status, caaStatus: caa.status,
    served: servedRelease,
    artCount: releases.filter(r => r.front).length,
    checkedAt: new Date().toISOString(),
  };
  if (mb.status !== 200) failed++;
  done++;
  if (done % 25 === 0 || done === todo.length) {
    fs.writeFileSync(CACHE, JSON.stringify(cache));
    const rate = done / ((Date.now() - t0) / 1000);
    const left = Math.round((todo.length - done) / Math.max(rate, 0.001) / 60);
    console.log(`  ${done}/${todo.length}｜失敗 ${failed}｜約剩 ${left} 分鐘`);
  }
  await sleep(1100);   // MB 的 1 req/s 底線
}
fs.writeFileSync(CACHE, JSON.stringify(cache));
console.log(`完成｜本次 ${done} 筆、失敗 ${failed}｜快取共 ${Object.keys(cache).length} 筆 → ${CACHE}`);
