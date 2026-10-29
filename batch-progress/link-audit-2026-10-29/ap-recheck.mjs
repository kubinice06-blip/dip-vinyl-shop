// 只讀：ap-issues.json 裡被旗標（錯藝人／錯專輯／查無）的 collectionId，再到 TW/US/JP/KR 各店面 lookup 一次收集各語系名稱，
// 並以 artistId 查各店面藝人名（台灣店常是中文譯名、日本店是片假名）→ <WORK>/ap-recheck.json
import fs from 'node:fs';
import { DEF_WORK } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const { issues } = JSON.parse(fs.readFileSync(`${WORK}/ap-issues.json`, 'utf8'));
const OUT = `${WORK}/ap-recheck.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { col: {}, art: {} };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function lookup(ids, sf) {
  for (let a = 0; a < 6; a++) {
    try { const r = await fetch(`https://itunes.apple.com/lookup?id=${ids.join(',')}&country=${sf}`, { signal: AbortSignal.timeout(30000) });
      if (r.ok) { const j = await r.json(); await sleep(3500); return j.results || []; } console.log('HTTP', r.status); await sleep(r.status === 403 || r.status === 429 ? 60000 : 5000); }
    catch (e) { await sleep(5000); }
  }
  return null;
}
const ids = [...new Set(issues.filter(i => i.flags.some(f => /artist-mismatch|album-mismatch|album-partial|collection-gone|artist-various|wrong-version/.test(f))).map(i => i.collectionId))];
const STORES = ['TW', 'US', 'JP', 'KR', 'GB'];
for (const sf of STORES) {
  const todo = ids.filter(id => !(done.col[id] && sf in done.col[id]));
  for (let i = 0; i < todo.length; i += 150) {
    const chunk = todo.slice(i, i + 150); const res = await lookup(chunk, sf); if (!res) continue;
    const got = {}; for (const x of res) if (x.wrapperType === 'collection') got[x.collectionId] = { a: x.artistName, c: x.collectionName, aid: x.artistId };
    for (const id of chunk) (done.col[id] ||= {})[sf] = got[id] || null;
    fs.writeFileSync(OUT, JSON.stringify(done)); console.log('col', sf, i + chunk.length, '/', todo.length);
  }
}
const aids = [...new Set(Object.values(done.col).flatMap(o => Object.values(o).filter(Boolean).map(x => x.aid)).filter(Boolean).map(String))];
for (const sf of ['US', 'TW', 'JP']) {
  const todo = aids.filter(id => !(done.art[id] && sf in done.art[id]));
  for (let i = 0; i < todo.length; i += 150) {
    const chunk = todo.slice(i, i + 150); const res = await lookup(chunk, sf); if (!res) continue;
    const got = {}; for (const x of res) if (x.wrapperType === 'artist') got[x.artistId] = x.artistName;
    for (const id of chunk) (done.art[id] ||= {})[sf] = got[id] || null;
    fs.writeFileSync(OUT, JSON.stringify(done)); console.log('art', sf, i + chunk.length, '/', todo.length);
  }
}
console.log('done', Object.keys(done.col).length, Object.keys(done.art).length);
