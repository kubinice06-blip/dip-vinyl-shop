// 只讀：Apple 試聽索引要修的鍵（wrong／gone）找替代值 → <WORK>/ap-fix.json（逐筆寫回，可接續）
//   gone 但其他店面仍有 → 換 storefront（同 collectionId、同 previewUrl）
//   其他 → iTunes Search（TW→US→JP）找藝人吻合、專輯名吻合、無錯版本字樣的專輯，再 lookup 取第一首有預覽的歌
import fs from 'node:fs';
import { DEF_WORK, albumMatch, artistMatch, badWords } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const targets = JSON.parse(fs.readFileSync(`${WORK}/ap-fix-targets.json`, 'utf8'));
const RC = JSON.parse(fs.readFileSync(`${WORK}/ap-recheck.json`, 'utf8'));
const OUT = `${WORK}/ap-fix.json`, done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url) {
  for (let a = 0; a < 6; a++) {
    try { const r = await fetch(url, { signal: AbortSignal.timeout(30000) }); if (r.ok) { const j = await r.json(); await sleep(3200); return j; }
      await sleep(r.status === 403 || r.status === 429 ? 60000 : 5000); } catch { await sleep(5000); }
  }
  return null;
}
const slugOf = u => (u || '').match(/\/album\/([^/]+)\/\d+/)?.[1] || null;
async function tracksOf(id, sf) {
  const j = await get(`https://itunes.apple.com/lookup?id=${id}&entity=song&country=${sf}&limit=200`);
  const col = (j?.results || []).find(x => x.wrapperType === 'collection');
  const tr = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl).sort((a, b) => (a.discNumber - b.discNumber) || (a.trackNumber - b.trackNumber));
  return { col, first: tr[0] };
}
for (const t of targets) {
  if (done[t.key]) continue;
  let res = null;
  const stores = Object.entries(RC.col[t.collectionId] || {}).filter(([, x]) => x).map(([s]) => s);
  if (t.verdict === 'gone' && stores.length) {
    const sf = ['TW', 'US', 'JP', 'GB', 'KR'].find(s => stores.includes(s));
    const { col } = await tracksOf(t.collectionId, sf);
    res = { kind: 'switch-storefront', value: [sf, t.collectionId, t.previewUrl, slugOf(col?.collectionViewUrl) || ''], name: col ? `${col.artistName} — ${col.collectionName}` : null };
  } else {
    for (const sf of ['TW', 'US', 'JP']) {
      const j = await get(`https://itunes.apple.com/search?term=${encodeURIComponent(`${t.artist} ${t.album}`)}&entity=album&limit=25&country=${sf}`);
      const cands = (j?.results || []).filter(x => String(x.collectionId) !== String(t.collectionId) &&
        ['exact', 'partial'].includes(artistMatch(t.artist, [x.artistName, slugOf(x.artistViewUrl?.replace('/artist/', '/album/'))])) &&
        ['exact', 'loose'].includes(albumMatch(t.album, x.collectionName)) && !badWords(x.collectionName, t.album, t.artist).length &&
        !/ - (Single|EP)$/.test(x.collectionName));
      cands.sort((a, b) => (albumMatch(t.album, b.collectionName) === 'exact') - (albumMatch(t.album, a.collectionName) === 'exact') || (b.trackCount || 0) - (a.trackCount || 0));
      const c = cands[0];
      if (c) {
        const { first } = await tracksOf(c.collectionId, sf);
        if (first) { res = { kind: 'replace', value: [sf, String(c.collectionId), first.previewUrl, slugOf(c.collectionViewUrl) || ''], name: `${c.artistName} — ${c.collectionName}` }; break; }
      }
    }
    if (!res) res = { kind: 'none' };
  }
  done[t.key] = res;
  fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
  console.log(t.artist, '|', t.album, '→', res.kind, res.name || '');
}
console.log('done', Object.keys(done).length);
