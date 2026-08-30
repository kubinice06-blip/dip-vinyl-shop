// 針對「卡池裡仍然沒有年份」的殘餘，套 data/query-aliases.json 的名稱別名重查一次
// （MusicBrainz + Discogs）。三方全查無的卡多半不是資料庫沒收，而是卡在名稱寫法：
// 縮寫（OMD）、俗稱括號（Weezer (Blue Album)）、日文原名 vs 羅馬字（無罪モラトリアム）、
// 掛在別的團名下（Spinetta《Artaud》其實掛 Pescado Rabioso）。
//
//   node scripts/fill-missing-years.mjs            # 只查詢並列出結果，不寫檔
//   node scripts/fill-missing-years.mjs --write    # 同時把查到的併進 release-years-v1.json
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const write = process.argv.includes('--write');

const normalized = value => String(value || '').normalize('NFKD').toLowerCase()
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9㐀-鿿぀-ヿ가-힯]+/g, '');
const cardKey = (artist, album) => `${normalized(artist)}\u0000${normalized(album)}`;
const albumCore = value => normalized(String(value || '')
  .replace(/[\(\[\{][^\)\]\}]*(?:remaster(?:ed)?|deluxe|expanded|anniversary|reissue|edition|live)[^\)\]\}]*[\)\]\}]/gi, ' '));
const yearOf = value => { const m = String(value || '').match(/^(\d{4})/); return m ? Number(m[1]) : null; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const readJson = async (file, fallback) => {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (fallback !== undefined) return fallback; throw error; }
};

const token = process.env.DISCOGS_TOKEN
  || (await fs.readFile(path.join(root, '.discogs-token'), 'utf8').catch(() => '')).trim();
const UA = 'dip-vinyl-year-backfill/1.0 ( kubinice06@gmail.com )';

async function discogs(artist, album) {
  if (!token) return null;
  const url = `https://api.discogs.com/database/search?artist=${encodeURIComponent(artist)}`
    + `&release_title=${encodeURIComponent(album)}&type=release&per_page=100`;
  try {
    const response = await fetch(url, { headers:{ 'User-Agent':UA, Authorization:`Discogs token=${token}` }, signal:AbortSignal.timeout(20000) });
    if (!response.ok) return null;
    const payload = await response.json();
    const pressings = (payload.results || [])
      .filter(item => yearOf(item.year))
      .filter(item => !(item.format || []).some(format => /compilation|unofficial/i.test(format)));
    if (!pressings.length) return null;
    return Math.min(...pressings.map(item => yearOf(item.year)));
  } catch (error) { return null; }
}

async function musicbrainz(artist, album) {
  const query = `artist:"${artist.replace(/["\\]/g, '\\$&')}" AND releasegroup:"${album.replace(/["\\]/g, '\\$&')}"`
    + ' AND primarytype:album AND -secondarytype:compilation AND -secondarytype:live';
  const url = `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&fmt=json&limit=25`;
  try {
    const response = await fetch(url, { headers:{ 'User-Agent':UA, Accept:'application/json' }, signal:AbortSignal.timeout(20000) });
    if (!response.ok) return null;
    const payload = await response.json();
    const want = albumCore(album);
    const hits = (payload['release-groups'] || [])
      .filter(group => albumCore(group.title) === want)
      .map(group => yearOf(group['first-release-date']))
      .filter(Boolean);
    return hits.length ? Math.min(...hits) : null;
  } catch (error) { return null; }
}

// 卡池裡還沒有年份的卡
const seed = await readJson(path.join(root, 'seed_cards.json'));
// 2026-08-30 卡池合併：王牌已在 seed_cards.json 內（第 9 欄 tier），不再另讀 apex_pool.json
const missing = [];
for (const row of seed) if (!row[6]) missing.push({ artist:row[0], album:row[1] });

const aliases = await readJson(path.join(root, 'data', 'query-aliases.json'), { entries:[] });
const aliasOf = new Map((aliases.entries || []).map(entry => [`${entry.artist} ${entry.album}`, entry]));

console.log(`卡池缺年份 ${missing.length} 張，其中 ${missing.filter(m => aliasOf.has(`${m.artist} ${m.album}`)).length} 張有別名可試\n`);

const found = [];
for (const card of missing) {
  const alias = aliasOf.get(`${card.artist} ${card.album}`);
  const queryArtist = alias?.queryArtist || card.artist;
  const queryAlbum = alias?.queryAlbum || card.album;
  const usedAlias = queryArtist !== card.artist || queryAlbum !== card.album;

  const dcYear = await discogs(queryArtist, queryAlbum);
  await sleep(1100);
  const mbYear = await musicbrainz(queryArtist, queryAlbum);
  await sleep(1100);

  // 兩方都有就取較早（較晚那個通常是再版）；只有一方就用那一方
  const year = (dcYear && mbYear) ? Math.min(dcYear, mbYear) : (dcYear || mbYear);
  if (year) found.push({ ...card, year, dcYear, mbYear, usedAlias, queryArtist, queryAlbum });
  console.log(`${year ? '✓' : '·'} ${(card.artist + ' — ' + card.album).slice(0, 44).padEnd(46)} ${year || '查無'}`
    + `${year ? `  (MB:${mbYear ?? '--'} DC:${dcYear ?? '--'})` : ''}${usedAlias ? `  [別名 ${queryArtist} — ${queryAlbum}]`.slice(0, 50) : ''}`);
}

console.log(`\n查到 ${found.length}/${missing.length} 張`);

if (write && found.length) {
  const yearsPath = path.join(root, 'data', 'release-years-v1.json');
  const years = await readJson(yearsPath);
  for (const row of found) years.entries[cardKey(row.artist, row.album)] = row.year;
  years.generatedAt = new Date().toISOString();
  await fs.writeFile(yearsPath, `${JSON.stringify(years, null, 1)}\n`, 'utf8');
  console.log(`已併入 release-years-v1.json（共 ${Object.keys(years.entries).length} 筆）`);
}
