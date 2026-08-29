// MusicBrainz release-group 查詢器（雲端段策展用）。
// 用法：node batch-progress/mb.mjs <seed.json> <out.json>
// seed.json：[{ "artist": "...", "album": "...", "query": "選填，覆寫查詢字串" }, ...]
// 輸出每筆的前 5 個候選（含 primary/secondary type 與 first-release-date），供主線逐筆裁定。
// MB 規定 1 req/sec 且必須帶可辨識的 User-Agent。
import fs from 'node:fs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/([+\-!(){}\[\]^"~*?:\\/])/g, '\\$1');

async function mb(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      if (r.ok) return r.json();
      if (r.status === 503) { await sleep(2000 * (i + 1)); continue; }   // MB 限流
      return { _http: r.status };
    } catch { await sleep(1500 * (i + 1)); }
  }
  return { _http: 'timeout' };
}

const seedFile = process.argv[2], outFile = process.argv[3];
const seeds = JSON.parse(fs.readFileSync(seedFile, 'utf8'));
const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};

let n = 0;
for (const s of seeds) {
  const k = `${s.artist}|${s.album}`;
  if (out[k]) { n++; continue; }                       // 可續跑
  const q = s.query || `artist:"${esc(s.artist)}" AND releasegroup:"${esc(s.album)}"`;
  const j = await mb(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(q)}&fmt=json&limit=5`);
  out[k] = (j['release-groups'] || []).map(g => ({
    id: g.id,
    title: g.title,
    artist: (g['artist-credit'] || []).map(c => c.name + (c.joinphrase || '')).join(''),
    primaryType: g['primary-type'] || null,
    secondaryTypes: g['secondary-types'] || [],
    firstRelease: g['first-release-date'] || null,
    score: g.score,
  }));
  if (j._http) out[k] = { _error: j._http };
  n++;
  if (n % 10 === 0) { fs.writeFileSync(outFile, JSON.stringify(out, null, 1)); console.error(`${n}/${seeds.length}`); }
  await sleep(1100);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
const hit = Object.values(out).filter(v => Array.isArray(v) && v.length).length;
console.error(`完成｜${seeds.length} 筆查詢｜有結果 ${hit}｜零結果 ${Object.values(out).filter(v => Array.isArray(v) && !v.length).length}｜錯誤 ${Object.values(out).filter(v => v && v._error).length}`);
