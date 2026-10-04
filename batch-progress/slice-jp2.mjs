// jp-2 線切批：把 `batch-progress/enum/jp-*.json` 的爵士列合併、用**今天的池**重比、
// 篩出「本土 ＋ 1989 年前 ＋ 池中沒有」，依 年份 → 廠牌 → 掛名 → 盤名 排序後平均切開。
//
// ⚠ 照 jp-1 的切法（見 `batch-progress/CURATION-BRIEF-jp1.md` 第一節），兩處刻意不同：
//   ① **`inPool` 當場重算，不用列舉檔裡那一欄**——jp-1 就是因為那一欄是 2026-09-15 的舊值
//      而在 c-173 交件後才發現要重切（第 1849-B 條）。
//   ② **外國藝人的日本壓片（`domestic:false`）不切進來**，與 jp-1 同樣的理由：
//      那是日本壓片不是本家原盤，卡的身分應歸原盤。
//
// 用法：node batch-progress/slice-jp2.mjs <起始批號> [每批張數=37]
//   例：node batch-progress/slice-jp2.mjs 183 37
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const start = Number(process.argv[2]);
const per = Number(process.argv[3] || 37);
if (!start) { console.log('用法：node batch-progress/slice-jp2.mjs <起始批號> [每批張數]'); process.exit(1); }

// jp-1 的四家不在本線；-cache／-aliases／-rels／-deferred／-pool-recheck 是輔助檔不是列舉檔
const JP1 = new Set(['jp-victor', 'jp-toshiba', 'jp-columbia', 'jp-king']);
const HOUSE = {
  'jp-cbs-sony': 'CBS/Sony', 'jp-polydor-jp': 'Polydor JP', 'jp-alfa': 'Alfa',
  'jp-east-wind': 'East Wind', 'jp-trio': 'Trio／Whynot', 'jp-denon': 'Denon',
  'jp-nippon-crown': 'Nippon Crown', 'jp-kitty': 'Kitty', 'jp-union': 'Union',
  'jp-frasco': 'Frasco', 'jp-domo': 'DOMO', 'jp-alm': 'ALM', 'jp-discomate': 'discomate',
  'jp-urc': 'URC', 'jp-kenwood': 'KENWOOD',
};

const files = fs.readdirSync(path.join(ROOT, 'batch-progress/enum'))
  .filter(f => /^jp-[a-z-]+\.json$/.test(f))
  .map(f => f.replace(/\.json$/, ''))
  .filter(s => !JP1.has(s) && HOUSE[s]);

const byRg = new Map();
for (const s of files) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/enum/${s}.json`), 'utf8'));
  for (const r of (j.rows || [])) {
    const prev = byRg.get(r.rgMbid);
    if (prev) { prev.house = [...new Set(prev.house.split('／').concat(HOUSE[s]))].join('／'); continue; }
    byRg.set(r.rgMbid, { ...r, house: HOUSE[s], _slug: s });
  }
}

// ── 今天的池 ────────────────────────────────────────────
const norm = s => String(s || '').toLowerCase().replace(/[&＆]/g, 'and').replace(/[^\p{L}\p{N}]+/gu, '');
const pool = [];
for (const r of JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8')))
  pool.push({ a: norm(r[0]), b: norm(r[1]), s: `${r[0]}|${r[1]}` });
for (const f of fs.readdirSync(path.join(ROOT, 'desc-tools/batches/cards')).filter(x => /^c\d+-cards\.json$/.test(x))) {
  const arr = JSON.parse(fs.readFileSync(path.join(ROOT, 'desc-tools/batches/cards/' + f), 'utf8'));
  for (const c of (Array.isArray(arr) ? arr : Object.values(arr)))
    pool.push({ a: norm(c.artist), b: norm(c.album), s: `${c.artist}|${c.album}`, rg: c.rgMbid });
}
const poolRg = new Map(pool.filter(p => p.rg).map(p => [p.rg, p]));

let inPool = 0, foreign = 0, late = 0, noYear = 0;
const keep = [];
for (const r of byRg.values()) {
  const na = norm(r.artist), nb = norm(r.album);
  const hit = poolRg.get(r.rgMbid)
    || pool.find(p => p.b === nb && (p.a === na
        || (na.length >= 6 && p.a.includes(na)) || (p.a.length >= 6 && na.includes(p.a))));
  r.inPool = !!hit; r.poolString = hit ? hit.s : '';
  if (r.inPool) { inPool++; continue; }
  if (r.domestic === false) { foreign++; continue; }
  if (!r.year) { noYear++; continue; }
  if (r.year > 1989) { late++; continue; }
  keep.push(r);
}

keep.sort((x, y) => (x.year - y.year) || x.house.localeCompare(y.house)
  || String(x.artist).localeCompare(String(y.artist)) || String(x.album).localeCompare(String(y.album)));

console.log(`列舉檔 ${files.length} 家｜爵士 RG ${byRg.size} 筆`);
console.log(`剔除：池中已有 ${inPool}｜外國藝人日本壓片 ${foreign}｜1990 年後 ${late}｜無年份 ${noYear}`);
console.log(`→ 可切 ${keep.length} 張，每批 ${per}，共 ${Math.ceil(keep.length / per)} 批\n`);

const tpl = fs.readFileSync(path.join(ROOT, 'batch-progress/c182/chk-prop.mjs'), 'utf8');
let bi = start;
for (let i = 0; i < keep.length; i += per, bi++) {
  const chunk = keep.slice(i, i + per);
  const half = Math.ceil(chunk.length / 2);
  const rows = chunk.map((r, n) => ({
    artist: r.artist, album: r.album, year: r.year, rgMbid: r.rgMbid,
    country: r.country || '', format: r.format || '', live: !!r.live,
    inPool: false, poolString: '', house: r.house, entities: [r.entity].filter(Boolean),
    why: r.why || '', nReleases: null, note: r.note || '',
    period: 'jp-2', genre: 'jazz', g: n < half ? 'a' : 'b',
  }));
  const dir = path.join(ROOT, `batch-progress/c${bi}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'slice.json'), JSON.stringify(rows, null, 1) + '\n');
  fs.writeFileSync(path.join(dir, 'chk-prop.mjs'), tpl.replace(/c182/g, `c${bi}`).replace(/c-182/g, `c-${bi}`));
  const hs = {}; for (const r of chunk) hs[r.house] = (hs[r.house] || 0) + 1;
  console.log(`c-${bi}｜${chunk.length} 張（a ${half}／b ${chunk.length - half}）｜${chunk[0].year}–${chunk[chunk.length - 1].year}｜` +
    Object.entries(hs).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}${v}`).join(' '));
}
