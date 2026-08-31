// 把雲端三批（c-48／c-49／c-50）的卡單與策展檔合併成上架用的候選檔。
//
// 雲端各批的策展產物擺法不同（c48 在 lock/out-*.json、c49 在 curation/out-*.json、
// c50 在 prop-*.json），但卡單一律是 desc-tools/batches/cards/<子批>-cards.json。
// 以卡單為準（那是簡介產線真正寫過的 310 張），再用 artist|album 去策展檔撈
// rgMbid／apexCandidate／年份註記。撈不到就標出來，不要靜默略過。
//
// 用法：node batch-progress/build-cand.mjs            # 三批全做
//       node batch-progress/build-cand.mjs c49        # 只做一批
// 產出：batch-progress/<批>/cand-all.json
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const CARDS = `${ROOT}/desc-tools/batches/cards`;

const BATCHES = {
  c48: { subs: ['c48a', 'c48b', 'c48c'], cur: `${ROOT}/batch-progress/c48/lock` },
  // c49 用 cand-*.json 而非 curation/out-*.json：只有前者帶 rgMbid（後者是策展敘述層）
  c49: { subs: ['c49a', 'c49b'], cur: `${ROOT}/batch-progress/c49` },
  // c50 的 rgMbid 在收斂後的 cand.json，prop-*.json 是策展提案、沒有 mbid
  c50: { subs: ['c50a', 'c50b', 'c50c'], cur: `${ROOT}/batch-progress/c50` },
};

const norm = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

// 策展檔的形狀不一：有的是 {albums:[…]}、有的直接是陣列，欄位名也各有各的。
// 一律攤平成 artist|album → 該筆物件。
function loadCuration(dir, batch) {
  const map = new Map();
  const files = fs.readdirSync(dir).filter(f => {
    if (batch === 'c50') return f === 'cand.json';
    // 排除 cand-all.json——那是本腳本自己的產出，讀回去會把 rgMbid 蓋成 null
    if (batch === 'c49') return /^cand-.*\.json$/.test(f) && f !== 'cand-all.json';
    return /^out-.*\.json$/.test(f);
  });
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const arr = Array.isArray(j) ? j : (j.albums || j.cards || Object.values(j).find(Array.isArray) || []);
    for (const r of arr) map.set(`${norm(r.artist)}|${norm(r.album)}`, r);
  }
  return { map, files };
}

const only = process.argv[2];
for (const [batch, cfg] of Object.entries(BATCHES)) {
  if (only && only !== batch) continue;
  const { map, files } = loadCuration(cfg.cur, batch);
  const out = [], missing = [];
  for (const sub of cfg.subs) {
    const cards = JSON.parse(fs.readFileSync(`${CARDS}/${sub}-cards.json`, 'utf8'));
    for (const c of cards) {
      const cur = map.get(`${norm(c.artist)}|${norm(c.album)}`);
      if (!cur) missing.push(`${c.artist}｜${c.album}`);
      out.push({
        sub, key: c.key, artist: c.artist, album: c.album,
        year: cur?.suggestedYear ?? c.year ?? null,
        genre: c.genre || null,
        composer: c.composer || null,
        rgMbid: cur?.rgMbid || cur?.mbid || null,
        releaseType: cur?.releaseType || null,
        upc: cur?.upc || null,
        apexCandidate: cur?.apexCandidate || null,
        genres: cur?.genres || cur?.g || null,
      });
    }
  }
  fs.writeFileSync(`${ROOT}/batch-progress/${batch}/cand-all.json`, JSON.stringify(out, null, 1));
  const withMbid = out.filter(x => x.rgMbid).length;
  console.log(`${batch}｜卡 ${out.length}｜策展檔 ${files.length} 份｜有 rgMbid ${withMbid}｜對不到策展 ${missing.length}`);
  if (missing.length) missing.slice(0, 12).forEach(m => console.log('   對不到：' + m));
}
