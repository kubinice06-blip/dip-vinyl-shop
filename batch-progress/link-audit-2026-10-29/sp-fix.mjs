// 只讀：對 <WORK>/sp-fix-targets.json 列的 KV 鍵，用 MusicBrainz release-group（rgMbid；沒有就以藝人＋專輯查 release-group，score≥90 且標題吻合）
// 底下各發行版的 url-rels 收 Spotify 連結，oEmbed 取標題，挑「標題吻合、沒有錯版本字樣」的那張 → <WORK>/sp-fix.json（逐筆寫回，可接續）
import fs from 'node:fs';
import { DEF_WORK, albumMatch, badWords, N } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const UA = { 'User-Agent': 'dip-vinyl-repair/1.0 (https://dipvinyl.tw)', Accept: 'application/json' };
const targets = JSON.parse(fs.readFileSync(`${WORK}/sp-fix-targets.json`, 'utf8'));
const OUT = `${WORK}/sp-fix.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const sleep = ms => new Promise(r => setTimeout(r, ms));
let lastMb = 0;
async function mb(url) {
  for (let a = 0; a < 5; a++) {
    const wait = lastMb + 1100 - Date.now(); if (wait > 0) await sleep(wait); lastMb = Date.now();
    try { const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) }); if (r.ok) return await r.json(); if (r.status === 404) return null; await sleep(3000 * (a + 1)); } catch { await sleep(3000); }
  }
  return undefined;
}
async function title(u) {
  for (let a = 0; a < 4; a++) {
    try { const r = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(u), { signal: AbortSignal.timeout(15000) }); if (r.ok) return (await r.json()).title; if (r.status === 404) return null; } catch {}
    await sleep(2000 * (a + 1));
  }
  return null;
}
for (const t of targets) {
  if (done[t.key]) continue;
  let rg = t.rgMbid, rgSource = rg ? 'kv-rgMbid' : null;
  if (!rg) {
    const q = `artist:"${t.artist.replace(/"/g, '')}" AND releasegroup:"${t.album.replace(/"/g, '')}"`;
    const j = await mb(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(q)}&fmt=json&limit=5`);
    const g = (j?.['release-groups'] || []).find(g => (g.score || 0) >= 90 && ['exact', 'loose'].includes(albumMatch(t.album, g.title)));
    if (g) { rg = g.id; rgSource = 'mb-search'; }
  }
  const urls = [];
  if (rg) for (let off = 0; off < 300; off += 100) {
    const j = await mb(`https://musicbrainz.org/ws/2/release?release-group=${rg}&inc=url-rels&fmt=json&limit=100&offset=${off}`);
    for (const rel of j?.releases || []) for (const x of rel.relations || []) { const u = (x.url?.resource || '').replace(/\?.*$/, ''); if (/^https:\/\/open\.spotify\.com\/album\/[A-Za-z0-9]{22}$/.test(u) && !urls.includes(u)) urls.push(u); }
    if (!j || (j['release-count'] || 0) <= off + 100) break;
  }
  const cands = [];
  for (const u of urls) cands.push({ u, t: u === t.spotifyUrl ? t.spotifyTitle : await title(u) });
  const ok = cands.filter(c => c.u !== t.spotifyUrl && c.t && !/\bE\.P\.|\s-\s(Single|EP)$/i.test(c.t) && !badWords(c.t, t.album, t.artist).length && ['exact', 'loose'].includes(albumMatch(t.album, c.t)));
  const pick = ok.find(c => albumMatch(t.album, c.t) === 'exact') || ok[0] || null;
  done[t.key] = { rg, rgSource, cands, pick };
  fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
  console.log(t.key, '→', pick ? `${pick.t} ${pick.u}` : '（無正確版本）', `[${cands.length} 候選]`);
}
console.log('done', Object.keys(done).length);
