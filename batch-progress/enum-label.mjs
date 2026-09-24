// jp-2 線的廠牌列舉：一家一檔，照 `batch-progress/enum/jp-2.md` 開頭那段的方法。
//
//   MB `release?label=<mbid>` 逐頁到底 → 折疊到 release-group
//   → 只留 primary=Album、無 Compilation/Soundtrack 次類型、status=Official（Live 留、另標）
//   → 曲風用 RG tags／藝人 tags（jazz 票數佔前段或 ≥25%），判不出的進 `pendingGenre`
//   → 與今天的池比對（`seed_cards.json` ＋ `desc-tools/batches/cards/c*-cards.json`）
//   → 「本土」＝掛名藝人 country=JP，或 RG 初版國家含 JP。
//
// ⚠ 這支是 2026-09-24 補寫的：jp-2.md 那十家是 2026-09-15 用一份沒有留下來的腳本跑的，
// 而 DOMO／ALM／discomate／URC／KENWOOD 五家當時沒列。**方法照抄那段說明，不是重新發明。**
//
// 用法：node batch-progress/enum-label.mjs <slug> <labelMbid>[,<labelMbid>…]
import fs from 'node:fs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slug = process.argv[2];
const labelIds = (process.argv[3] || '').split(',').filter(Boolean);
if (!slug || !labelIds.length) { console.log('用法：node batch-progress/enum-label.mjs <slug> <mbid>[,<mbid>…]'); process.exit(1); }

async function mb(path) {
  for (let i = 0; i < 5; i++) {
    const r = await fetch(`https://musicbrainz.org/ws/2/${path}`, { headers: { 'User-Agent': UA } });
    if (r.status === 503 || r.status === 429) { await sleep(2000 * (i + 1)); continue; }
    if (!r.ok) throw new Error(`${r.status} ${path}`);
    return r.json();
  }
  throw new Error(`retry exhausted ${path}`);
}

// ── 1. 逐頁拉 release ────────────────────────────────────
const releases = [];
const entities = [];
for (const id of labelIds) {
  const info = await mb(`label/${id}?fmt=json`); await sleep(1100);
  let off = 0, total = Infinity;
  while (off < total) {
    const j = await mb(`release?label=${id}&inc=release-groups+artist-credits+media&limit=100&offset=${off}&fmt=json`);
    total = j['release-count'];
    for (const r of (j.releases || [])) releases.push({ ...r, _entity: info.name });
    off += 100;
    await sleep(1100);
    process.stderr.write(`\r${slug} ${info.name}: ${Math.min(off, total)}/${total}   `);
  }
  entities.push({ id, name: info.name, type: info.type || null, releases: total });
  process.stderr.write('\n');
}

// ── 2. 折疊到 release-group，只留 Album ──────────────────
const rgs = new Map();
for (const r of releases) {
  const rg = r['release-group']; if (!rg) continue;
  if (rg['primary-type'] !== 'Album') continue;
  const sec = rg['secondary-types'] || [];
  if (sec.some(s => /Compilation|Soundtrack|Live/.test(s) && s !== 'Live')) continue;
  const date = r.date || rg['first-release-date'] || '';
  const prev = rgs.get(rg.id);
  const row = {
    artist: (r['artist-credit'] || []).map(a => a.name + (a.joinphrase || '')).join(''),
    artistIds: (r['artist-credit'] || []).map(a => a.artist?.id).filter(Boolean),
    album: rg.title,
    year: Number(String(rg['first-release-date'] || date).slice(0, 4)) || null,
    rgMbid: rg.id,
    country: r.country || '',
    format: (r.media || []).map(m => m.format).filter(Boolean).join('+'),
    live: sec.includes('Live'),
    labelYear: Number(String(date).slice(0, 4)) || null,
    entity: r._entity,
    status: r.status || '',
    countries: [r.country || ''].filter(Boolean),
  };
  if (!prev) rgs.set(rg.id, row);
  else { prev.countries = [...new Set(prev.countries.concat(row.countries))];
         if (!prev.labelYear || (row.labelYear && row.labelYear < prev.labelYear)) prev.labelYear = row.labelYear; }
}
const albums = [...rgs.values()].filter(r => !r.status || r.status === 'Official');

// ── 3. 曲風：RG tags → 藝人 tags ─────────────────────────
const jazzy = tags => {
  if (!tags || !tags.length) return null;
  const tot = tags.reduce((s, t) => s + (t.count || 0), 0) || 1;
  const jz = tags.filter(t => /jazz|fusion|bebop|bop|swing|free improvis/i.test(t.name))
                 .reduce((s, t) => s + (t.count || 0), 0);
  if (!jz) return false;
  const top = [...tags].sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 3);
  return jz / tot >= 0.25 || top.some(t => /jazz|fusion|bebop|bop|swing/i.test(t.name));
};
const artistTagCache = new Map();
const rows = [], pendingGenre = [];
let nonJazz = 0, n = 0;
for (const a of albums) {
  n++; process.stderr.write(`\r${slug} 曲風 ${n}/${albums.length}   `);
  let verdict = null, why = '';
  try {
    const rg = await mb(`release-group/${a.rgMbid}?inc=tags+artist-credits&fmt=json`); await sleep(1100);
    verdict = jazzy(rg.tags); if (verdict !== null) why = 'rg-tag';
    if (verdict === null || verdict === false) {
      for (const id of a.artistIds) {
        if (!artistTagCache.has(id)) {
          const ar = await mb(`artist/${id}?inc=tags&fmt=json`); await sleep(1100);
          artistTagCache.set(id, { tags: ar.tags || [], country: ar.country || ar.area?.iso_3166_1_codes?.[0] || '' });
        }
        const c = artistTagCache.get(id);
        const v = jazzy(c.tags);
        if (v) { verdict = true; why = 'artist-tag'; break; }
        if (verdict === null && v === false) verdict = false;
      }
    }
    a.domestic = a.artistIds.some(id => artistTagCache.get(id)?.country === 'JP') || a.countries.includes('JP');
  } catch (e) { a.note = 'MB 查詢失敗：' + e.message; }
  a.why = why;
  if (verdict === true) rows.push(a);
  else if (verdict === null) pendingGenre.push(a);
  else nonJazz++;
}
process.stderr.write('\n');

// ── 4. 與今天的池比對 ────────────────────────────────────
const norm = s => String(s || '').toLowerCase().replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const pool = [];
for (const r of JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'))) pool.push({ a: norm(r[0]), b: norm(r[1]), s: `${r[0]}|${r[1]}` });
for (const f of fs.readdirSync('desc-tools/batches/cards').filter(x => /^c\d+-cards\.json$/.test(x))) {
  const arr = JSON.parse(fs.readFileSync('desc-tools/batches/cards/' + f, 'utf8'));
  for (const c of (Array.isArray(arr) ? arr : Object.values(arr))) pool.push({ a: norm(c.artist), b: norm(c.album), s: `${c.artist}|${c.album}`, rg: c.rgMbid });
}
const poolRg = new Set(pool.filter(p => p.rg).map(p => p.rg));
for (const list of [rows, pendingGenre]) for (const r of list) {
  const na = norm(r.artist), nb = norm(r.album);
  const hit = poolRg.has(r.rgMbid) ? pool.find(p => p.rg === r.rgMbid)
    : pool.find(p => p.b === nb && (p.a === na || (na.length >= 6 && p.a.includes(na)) || (p.a.length >= 6 && na.includes(p.a))));
  r.inPool = !!hit; r.poolString = hit ? hit.s : '';
  delete r.artistIds; delete r.countries; delete r.status;
}

const out = { label: slug, entities, rows, pendingGenre, nonJazzAlbumsExcluded: nonJazz,
  builtAt: new Date().toISOString().slice(0, 10), method: '見 batch-progress/enum-label.mjs 檔頭' };
fs.writeFileSync(`batch-progress/enum/${slug}.json`, JSON.stringify(out, null, 1));
const miss = rows.filter(r => !r.inPool && r.domestic);
console.log(`${slug}：release ${releases.length}｜純 Album RG ${albums.length}｜爵士 RG ${rows.length}｜待人工判 ${pendingGenre.length}｜非爵士剔除 ${nonJazz}`);
console.log(`  本土缺 ${miss.length}（1989 年前 ${miss.filter(r => r.year && r.year <= 1989).length}）`);
