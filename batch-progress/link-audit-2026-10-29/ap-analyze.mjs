// 合併 HEAD 與 Lookup 結果，判定 Apple 預覽的失效／錯專輯／錯藝人／錯版本 → <WORK>/ap-issues.json
import fs from 'node:fs';
import { ROOT, DEF_WORK, previewKey, albumMatch, artistMatch, badWords } from './common.mjs';
const WORK = process.argv[2] || DEF_WORK;
const rt = JSON.parse(fs.readFileSync(`${ROOT}/data/apple-audio-runtime-v1.json`, 'utf8')).entries;
const mp = JSON.parse(fs.readFileSync(`${ROOT}/data/apple-audio-map-v1.json`, 'utf8')).entries;
const seed = JSON.parse(fs.readFileSync(`${ROOT}/seed_cards.json`, 'utf8'));
const seedBy = new Map(); for (const r of seed) seedBy.set(previewKey(r[0], r[1]), r);
const head = JSON.parse(fs.readFileSync(`${WORK}/ap-head.json`, 'utf8'));
const look = JSON.parse(fs.readFileSync(`${WORK}/ap-lookup.json`, 'utf8'));
const RC = fs.existsSync(`${WORK}/ap-recheck.json`) ? JSON.parse(fs.readFileSync(`${WORK}/ap-recheck.json`, 'utf8')) : { col: {}, art: {} };
const issues = [], stat = { total: 0, inSeed: 0, alive: 0, dead: 0, lookupMissing: 0, wrongVersion: 0, albumMismatch: 0, albumPartial: 0, artistMismatch: 0, various: 0, notInSeed: 0 };
for (const [k, v] of Object.entries(rt)) {
  stat.total++;
  const [sf, id, url, slug] = v; const m = mp[k] || {}; const card = seedBy.get(k);
  const artist = card?.[0] ?? m.artist, album = card?.[1] ?? m.album;
  if (card) stat.inSeed++; else stat.notInSeed++;
  const h = head[k]; const alive = h === 200 || h === 206; alive ? stat.alive++ : stat.dead++;
  const L = look[`${sf}:${id}`];
  const flags = [];
  if (!alive) flags.push('preview-dead:' + h);
  if (!card) flags.push('not-in-seed');
  let am = null, rm = null, bw = [];
  const rc = Object.values(RC.col[id] || {}).filter(Boolean);
  const otherStores = Object.entries(RC.col[id] || {}).filter(([, x]) => x).map(([s]) => s);
  const artNames = [...new Set(rc.map(x => x.aid).filter(Boolean))].flatMap(aid => Object.values(RC.art[aid] || {}).filter(Boolean));
  if (L === null) { flags.push(otherStores.length ? 'collection-gone-in-storefront(其他店面仍有:' + otherStores.join('/') + ')' : 'collection-gone'); stat.lookupMissing++; }
  const LL = L || rc[0] && { collectionName: rc[0].c, artistName: rc[0].a };
  if (LL) {
    const albumCands = [LL.collectionName, m.collectionName, LL.albumSlug?.replace(/-/g, ' '), ...rc.map(x => x.c)];
    const ams = albumCands.filter(Boolean).map(c => albumMatch(album, c));
    am = ams.includes('exact') ? 'exact' : ams.includes('loose') ? 'loose' : ams.includes('partial') ? 'partial' : ams[0];
    rm = artistMatch(artist, [LL.artistName, m.artistName, LL.artistSlug, ...rc.map(x => x.a), ...artNames]);
    bw = badWords(LL.collectionName, album, artist);
    if (bw.length) { flags.push('wrong-version:' + bw.join('+')); stat.wrongVersion++; }
    if (am === 'mismatch') { flags.push('album-mismatch'); stat.albumMismatch++; }
    else if (am === 'partial') { flags.push('album-partial'); stat.albumPartial++; }
    if (rm === 'mismatch') { flags.push('artist-mismatch'); stat.artistMismatch++; }
    if (rm === 'various') { flags.push('artist-various'); stat.various++; }
  }
  if (flags.length) issues.push({ key: k, artist, album, storefront: sf, collectionId: id, previewUrl: url, head: h,
    apple: L ? { artistName: L.artistName, collectionName: L.collectionName, artistSlug: L.artistSlug, trackCount: L.trackCount, releaseDate: L.releaseDate?.slice(0, 10) } : L,
    otherStoreNames: rc.length ? [...new Set(rc.map(x => `${x.a} — ${x.c}`))].slice(0, 4) : undefined, artistAliases: artNames.length ? [...new Set(artNames)].slice(0, 6) : undefined,
    albumMatch: am, artistMatch: rm, flags });
}
fs.writeFileSync(`${WORK}/ap-issues.json`, JSON.stringify({ stat, issues }, null, 1));
console.log(stat, issues.length);
