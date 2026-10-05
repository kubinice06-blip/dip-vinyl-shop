// jp-1 線 slice 補強 v2。2026-09-21（第 1856-B／1858-B 條）。
//
// v1（jp1-pool-recheck.mjs）用 `artist?query=artist:"<名>"` 找同義字串，**兩個方向都錯**：
//   ① MB 的 `artist:` 欄位查詢**不比對 alias**——`Mina Aoe`、`Takehiro Honda` 都回 count 0，
//      於是漢字掛名整個掃不到（c-174 b 組第 3820 條實證：池中 `青江三奈` 2 張完全沒掃到）；
//   ② 回得到的也可能是**別的實體**——`Sadao Watanabe` 回的是 `Sadao Watanabe Quintet`，
//      它的 alias 裡沒有 `渡辺貞夫`，等於拿錯人的同義字串去掃池。
//
// v2 改成**從 rgMbid 反查**，不用名字搜尋：
//   pass 1：`release-group/<id>?inc=artist-credits+releases` → 藝人 MBID（權威）＋ 全部 release 的日期與標題；
//   pass 2：`artist/<mbid>?inc=aliases` → 該藝人的全部同義字串。
// 順帶解掉「RG title 取自再發」（c-174 b 實測 33%）：把**日期最早那筆 release 的 title**掛進 slice 當提示。
// ⚠ 一樣**只報不判**：最早的 release 未必是日本原壓（可能是他國先發或 pseudo-release），由策展層人工定。
//
// 用法：node batch-progress/jp1-slice-enrich.mjs c175 c176 …
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const RGC = path.join(ROOT, 'batch-progress/enum/jp-1-rg-cache.json');
const ARC = path.join(ROOT, 'batch-progress/enum/jp-1-artist-cache.json');
const batches = process.argv.slice(2);
if (!batches.length) { console.error('要給批次號'); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s).toLowerCase().replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const get = async u => (await fetch(u, { headers: { 'User-Agent': UA } })).json();

const rgc = fs.existsSync(RGC) ? JSON.parse(fs.readFileSync(RGC, 'utf8')) : {};
const arc = fs.existsSync(ARC) ? JSON.parse(fs.readFileSync(ARC, 'utf8')) : {};

const slices = batches.map(b => ({ b, rows: JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/${b}/slice.json`), 'utf8')) }));
const rgIds = [...new Set(slices.flatMap(s => s.rows.map(r => r.rgMbid)))];

// ── pass 1：RG → 藝人 MBID ＋ 最早 release ──────────────────
let n = 0;
for (const id of rgIds) {
  n++;
  if (rgc[id]) continue;
  try {
    const j = await get(`https://musicbrainz.org/ws/2/release-group/${id}?inc=artist-credits+releases&fmt=json`);
    const rels = (j.releases || []).filter(r => r.date).sort((a, b) => a.date.localeCompare(b.date));
    rgc[id] = {
      artistIds: (j['artist-credit'] || []).map(a => a.artist?.id).filter(Boolean),
      rgTitle: j.title || '',
      firstReleaseDate: j['first-release-date'] || '',
      earliest: rels[0] ? { date: rels[0].date, title: rels[0].title, country: rels[0].country || '' } : null,
      titlesSeen: [...new Set((j.releases || []).map(r => r.title))],
    };
  } catch (e) { rgc[id] = { err: String(e).slice(0, 80) }; }
  if (n % 20 === 0) { fs.writeFileSync(RGC, JSON.stringify(rgc, null, 1)); console.log(`  RG …${n}/${rgIds.length}`); }
  await sleep(1100);
}
fs.writeFileSync(RGC, JSON.stringify(rgc, null, 1));

// ── pass 2：藝人 MBID → aliases ────────────────────────────
const aIds = [...new Set(Object.values(rgc).flatMap(r => r.artistIds || []))];
n = 0;
for (const id of aIds) {
  n++;
  if (arc[id]) continue;
  try {
    const a = await get(`https://musicbrainz.org/ws/2/artist/${id}?inc=aliases&fmt=json`);
    arc[id] = { name: a.name, variants: [...new Set([a.name, a['sort-name'], ...(a.aliases || []).map(x => x.name)].filter(Boolean))] };
  } catch (e) { arc[id] = { name: '', variants: [], err: String(e).slice(0, 80) }; }
  if (n % 20 === 0) { fs.writeFileSync(ARC, JSON.stringify(arc, null, 1)); console.log(`  藝人 …${n}/${aIds.length}`); }
  await sleep(1100);
}
fs.writeFileSync(ARC, JSON.stringify(arc, null, 1));

// ── 池 ────────────────────────────────────────────────────
const pool = [];
for (const r of JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8')))
  pool.push({ artist: r[0], album: r[1], year: r[6], src: 'seed' });
const cdir = path.join(ROOT, 'desc-tools/batches/cards');
for (const f of fs.readdirSync(cdir).filter(x => /^c\d+-cards\.json$/.test(x))) {
  const a = JSON.parse(fs.readFileSync(path.join(cdir, f), 'utf8'));
  for (const c of (Array.isArray(a) ? a : Object.values(a)))
    pool.push({ artist: c.artist, album: c.album, year: c.year, rgMbid: c.rgMbid, src: f.replace('-cards.json', '') });
}
const byArtist = new Map();
for (const p of pool) { const k = norm(p.artist); if (!byArtist.has(k)) byArtist.set(k, []); byArtist.get(k).push(p); }
const poolRg = new Set(pool.filter(p => p.rgMbid).map(p => p.rgMbid));

// ── 寫回 slice ────────────────────────────────────────────
for (const { b, rows } of slices) {
  let hint = 0, coll = 0, retitle = 0;
  for (const r of rows) {
    const g = rgc[r.rgMbid] || {};
    const variants = [...new Set([r.artist, ...(g.artistIds || []).flatMap(id => arc[id]?.variants || [])])];
    const seen = new Set(), hits = [];
    for (const v of variants) for (const p of (byArtist.get(norm(v)) || [])) {
      const k = p.src + '|' + norm(p.album); if (!seen.has(k)) { seen.add(k); hits.push(p); }
    }
    const exact = hits.filter(h => norm(h.album) === norm(r.album));
    const inPoolNow = exact.length > 0 || poolRg.has(r.rgMbid);
    if (inPoolNow) coll++; else if (hits.length) hint++;
    r.artistVariants = variants;
    r.poolRecheck = inPoolNow
      ? { status: '⚠ 確定撞池——退', hit: exact.map(h => `${h.src}｜${h.artist}｜${h.album}｜${h.year}`), artistAlbumsInPool: hits.map(h => `${h.src}｜${h.artist}｜${h.album}｜${h.year}`) }
      : hits.length
        ? { status: '同藝人在池中，盤名不同——**逐張人工比**', artistAlbumsInPool: hits.map(h => `${h.src}｜${h.artist}｜${h.album}｜${h.year}`) }
        : { status: '池中查無此藝人（由 rgMbid 反查藝人 MBID、取其全部 alias 掃過）', artistAlbumsInPool: [] };
    if (g.earliest) {
      r.titleCheck = {
        rgTitle: g.rgTitle, firstReleaseDate: g.firstReleaseDate,
        earliestRelease: g.earliest, titlesSeen: g.titlesSeen || [],
        note: norm(g.earliest.title) !== norm(g.rgTitle)
          ? '⚠ **RG title 與最早 release 的 title 不同——很可能 RG 取了再發標題，逐張核**' : '',
      };
      if (r.titleCheck.note) retitle++;
    }
  }
  fs.writeFileSync(path.join(ROOT, `batch-progress/${b}/slice.json`), JSON.stringify(rows, null, 1) + '\n');
  console.log(`${b}：${rows.length} 張｜確定撞池 ${coll}｜同藝人待人工比 ${hint}｜RG title ≠ 最早 release title ${retitle}`);
}
