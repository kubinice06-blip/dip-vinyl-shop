// c-47 候選檔結構檢查：schema、rgMbid 格式、與現池撞鍵、U+2010 污染、
// 合輯例外條款、頂點證據數。用法：node chk-cand.mjs cand-latin.json [...]
import fs from 'node:fs';
const R = 'C:/Users/User/dip-vinyl-home/dip-vinyl-shop';
const MBID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const seed = JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8'));
// 2026-08-30 卡池合併：王牌不再另存 apex_pool.json，改成 seed_cards.json 第 9 欄 tier。
// 這裡就地重建成舊的 {hall,pearl,heresy} 結構，下游用法完全不必改。
const apex = (() => { const _r = JSON.parse(fs.readFileSync(`${R}/seed_cards.json`, 'utf8')); const _a = { hall: [], pearl: [], heresy: [] }; for (const _x of _r) if (_x[8] && _a[_x[8]]) _a[_x[8]].push([_x[0], _x[1], _x[5], _x[6]]); return _a; })();
const fold = s => String(s || '').replace(/[‐-―－]/g, '-').normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const poolKeys = new Set([
  ...seed.map(r => fold(r[0]) + '|' + fold(r[1])),
  ...['hall', 'pearl', 'heresy'].flatMap(t => apex[t].map(r => fold(r[0]) + '|' + fold(r[1]))),
]);
// 專輯名反查（掛名分裂偵測）
const byAlbum = new Map();
for (const r of seed) (byAlbum.get(fold(r[1])) ?? byAlbum.set(fold(r[1]), []).get(fold(r[1]))).push(r[0]);
for (const t of ['hall', 'pearl', 'heresy']) for (const r of apex[t]) (byAlbum.get(fold(r[1])) ?? byAlbum.set(fold(r[1]), []).get(fold(r[1]))).push(r[0]);

let total = 0, errs = 0, warns = 0;
const seenKeys = new Map();   // 跨檔去重
const seenMbid = new Map();
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(fs.readFileSync(`${R}/batch-progress/c47/${f}`, 'utf8'));
  console.log(`\n== ${f}：${j.albums.length} 張、skipped ${j.skipped?.length ?? 0} ==`);
  for (const a of j.albums) {
    total++;
    const k = `${a.artist} — ${a.album}`;
    const E = m => { errs++; console.log(`  ERROR ${k}: ${m}`); };
    const W = m => { warns++; console.log(`  WARN  ${k}: ${m}`); };
    for (const field of ['artist', 'album', 'rgMbid', 'suggestedYear', 'yearNote', 'curatorWhy', 'curatorRisk']) {
      if (!a[field] && a[field] !== 0) E(`缺 ${field}`);
    }
    if (a.rgMbid && !MBID.test(a.rgMbid)) E(`rgMbid 格式不對：${a.rgMbid}`);
    if (/[‐‑]/.test(a.artist + a.album)) E('含 U+2010/U+2011 連字號，未正規化');
    if (!Number.isInteger(a.suggestedYear) || a.suggestedYear < 1900 || a.suggestedYear > 2027) E(`年份異常 ${a.suggestedYear}`);
    const key = fold(a.artist) + '|' + fold(a.album);
    if (poolKeys.has(key)) E('與現池撞鍵（該 skip 沒 skip）');
    if (seenKeys.has(key)) E(`跨檔重複：與 ${seenKeys.get(key)} 同鍵`); else seenKeys.set(key, f);
    if (a.rgMbid) { if (seenMbid.has(a.rgMbid)) E(`rgMbid 重複：與 ${seenMbid.get(a.rgMbid)} 相同`); else seenMbid.set(a.rgMbid, k); }
    const others = byAlbum.get(fold(a.album)) || [];
    const near = others.filter(o => { const fo = fold(o), fa = fold(a.artist); return fo !== fa && (fo.includes(fa) || fa.includes(fo)); });
    if (near.length) W(`池內同名專輯掛名相近：${[...new Set(near)].join('、')}（人工確認非同一張）`);
    if (a.releaseType && a.releaseType !== 'Album') {
      if (!a.exceptionReason) E(`releaseType=${a.releaseType} 但無 exceptionReason`);
    }
    // 盲點修正（2026-08-28 實踩）：MB 的 Compilation 常掛在 secondaryTypes、primary 仍是 Album，
    // 只驗 releaseType 會放行六張精選輯。Live/Soundtrack/Cast 副型不算。
    if ((a.secondaryTypes || []).includes('Compilation') && !a.exceptionReason) {
      E('secondaryTypes 含 Compilation 但無 exceptionReason（§5.6）');
    }
    if (a.exceptionReason && !(a.apexCandidate?.evidenceUrls?.length >= 2 || (a.exceptionEvidence?.length >= 2))) {
      W('合輯例外需 ≥2 佐證網址（確認 evidenceUrls 或 exceptionEvidence 有帶）');
    }
    if (a.apexCandidate?.eligible) {
      const u = a.apexCandidate.evidenceUrls || [];
      if (new Set(u).size < 2) E('頂點候選證據不足兩個唯一網址');
      if (!['hall', 'pearl', 'heresy'].includes(a.apexCandidate.tier)) E(`頂點 tier 異常 ${a.apexCandidate.tier}`);
    }
    if (!a.upc) { /* warning 級，量大就不逐張印 */ }
  }
}
const noUpc = process.argv.slice(2).reduce((n, f) => {
  const j = JSON.parse(fs.readFileSync(`${R}/batch-progress/c47/${f}`, 'utf8'));
  return n + j.albums.filter(a => !a.upc).length;
}, 0);
console.log(`\n合計 ${total} 張｜ERROR ${errs}｜WARN ${warns}｜無 upc ${noUpc}（warning 級，可後補）`);
