// jp-1 線：把列舉檔的 inPool 重算一次。
// 2026-09-21（c-173 a 組第 3722 條）：列舉層的 inPool 是純子字串比對，
// **漢字掛名 vs 羅馬字掛名整類漏掉**——c-173 a 組 21 筆裡有 6 筆其實已在池中／待上架批次，
// 其中 5 筆是文字系統不同、1 筆逐字相同也漏。
//
// 作法：每個掛名向 MB 問一次 `artist?query=`，把 name／sort-name／aliases 全收成同義字串集，
// 再用整組同義字串去掃 seed_cards.json 與本機卡單。
// **盤名不自動判定**——跨文字系統的盤名比對不可靠，只報「這位藝人池中有這些盤」，由策展層人工比。
//
// 用法：node batch-progress/jp1-pool-recheck.mjs [--all]   （預設只算 c173–c182 那 408 張）
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const CACHE = path.join(ROOT, 'batch-progress/enum/jp-1-artist-aliases.json');
const OUT = path.join(ROOT, 'batch-progress/enum/jp-1-pool-recheck.json');
const all = process.argv.includes('--all');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s).toLowerCase().replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');

// ── 列舉列 ────────────────────────────────────────────────
const HOUSES = { Victor: 'jp-victor', 東芝: 'jp-toshiba', コロムビア: 'jp-columbia', King: 'jp-king' };
let rows = [];
for (const [house, f] of Object.entries(HOUSES)) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/enum/${f}.json`), 'utf8'));
  for (const r of d.rows) rows.push({ ...r, house });
}
rows = rows.filter(r => !r.foreignArtist);
if (!all) rows = rows.filter(r => r.year && r.year <= 1989);

// ── 池：seed_cards ＋ 本機卡單 ────────────────────────────
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
for (const p of pool) {
  const k = norm(p.artist);
  if (!byArtist.has(k)) byArtist.set(k, []);
  byArtist.get(k).push(p);
}
const poolRg = new Set(pool.filter(p => p.rgMbid).map(p => p.rgMbid));

// ── MB 同義字串（有快取就接續，不重抓）────────────────────
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
const names = [...new Set(rows.map(r => r.artist))];
let n = 0;
for (const name of names) {
  n++;
  if (cache[name]) continue;
  const u = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(`artist:"${name}"`)}&fmt=json&limit=5`;
  try {
    const j = await (await fetch(u, { headers: { 'User-Agent': UA } })).json();
    const hit = (j.artists || []).find(a => norm(a.name) === norm(name))
      || (j.artists || []).find(a => (a.aliases || []).some(x => norm(x.name) === norm(name)))
      || (j.artists || [])[0];
    cache[name] = hit
      ? { id: hit.id, variants: [...new Set([hit.name, hit['sort-name'], ...(hit.aliases || []).map(x => x.name)].filter(Boolean))] }
      : { id: null, variants: [] };
  } catch (e) { cache[name] = { id: null, variants: [], err: String(e).slice(0, 80) }; }
  if (n % 20 === 0) { fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1)); console.log(`  …${n}/${names.length}`); }
  await sleep(1100);
}
fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));

// ── 重算 ──────────────────────────────────────────────────
const out = [];
for (const r of rows) {
  const variants = [...new Set([r.artist, ...(cache[r.artist]?.variants || [])])];
  const hits = [];
  for (const v of variants) for (const p of (byArtist.get(norm(v)) || [])) hits.push(p);
  const seen = new Set(), uniq = hits.filter(h => { const k = h.src + '|' + norm(h.album); return seen.has(k) ? false : (seen.add(k), true); });
  const exact = uniq.filter(h => norm(h.album) === norm(r.album));
  out.push({
    artist: r.artist, album: r.album, year: r.year, rgMbid: r.rgMbid, house: r.house, why: r.why,
    enumInPool: !!r.inPool,
    rgInPool: poolRg.has(r.rgMbid),                       // 同一個 RG 已在本機卡單
    titleExact: exact.map(h => `${h.src}｜${h.artist}｜${h.album}｜${h.year}`),
    artistInPool: uniq.map(h => `${h.src}｜${h.artist}｜${h.album}｜${h.year}`),
    variants,
  });
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
const nExact = out.filter(o => o.titleExact.length || o.rgInPool).length;
const nArtist = out.filter(o => !o.titleExact.length && !o.rgInPool && o.artistInPool.length).length;
const nNew = out.filter(o => !o.artistInPool.length && !o.rgInPool).length;
console.log(`\n${rows.length} 列｜列舉層標 inPool ${out.filter(o => o.enumInPool).length}`);
console.log(`重算：**確定已在池中（盤名逐字同或同 RG）${nExact}**｜同藝人但盤名不同 ${nArtist}｜池中無此藝人 ${nNew}`);
console.log(`→ ${OUT}`);
