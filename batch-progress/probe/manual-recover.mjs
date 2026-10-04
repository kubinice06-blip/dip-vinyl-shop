// 主線手動回撈：把 `recover-unavailable.mjs` 列出的候選裡「掛名寫法不同但確實是本盤」的那幾筆寫進 previews.json。
//
// ⚠ ⚠ **`recoveredBy` 是 never-delete 不變量**（本線曾經差點把兩筆人工回撈成果整批刪掉）。
// ⚠ 用法：node batch-progress/probe/manual-recover.mjs '<藝人>|<盤名>' <collectionId> <front> '<理由>'
//   例：node batch-progress/probe/manual-recover.mjs 'Cosmic Pulsation Unity|C・P・U' 1853786046 us '掛名是三人本名、盤題含團名'
import fs from 'node:fs';
const [key, cid, front = 'us', why = ''] = process.argv.slice(2);
if (!key || !cid) { console.log('用法：node batch-progress/probe/manual-recover.mjs <key> <collectionId> [front] [理由]'); process.exit(1); }
const P = 'batch-progress/probe/previews.json';
const db = JSON.parse(fs.readFileSync(P, 'utf8'));
const prev = db[key];
if (!prev) { console.log(`⚠ previews.json 沒有這個鍵：${key}`); process.exit(1); }
if (prev.recoveredBy) { console.log(`⚠ 這一筆已經是人工回撈的（${prev.recoveredBy}），不覆寫。`); process.exit(1); }

const UA = 'dip-vinyl-shop/1.0 (kubinice06@gmail.com)';
const res = await fetch(`https://itunes.apple.com/lookup?id=${cid}&country=${front}&entity=song&limit=200`, { headers: { 'User-Agent': UA } });
if (!res.ok) { console.log(`⚠ lookup ${res.status}`); process.exit(1); }
const j = await res.json();
const coll = (j.results || []).find(r => r.wrapperType === 'collection');
const tracks = (j.results || []).filter(r => r.wrapperType === 'track');
if (!coll) { console.log('⚠ lookup 回不到 collection'); process.exit(1); }
const withPrev = tracks.find(t => t.previewUrl);

const out = {
  ...prev,
  tried: [...(prev.tried || []), `manual-lookup:${cid}`],
  status: withPrev ? 'ready' : 'noPreview',
  front,
  collectionId: coll.collectionId,
  appleTitle: coll.collectionName,
  appleArtist: coll.artistName,
  appleYear: String(coll.releaseDate || '').slice(0, 4),
  explicitness: coll.collectionExplicitness,
  trackCount: coll.trackCount,
  previewUrl: withPrev?.previewUrl || null,
  previewTrack: withPrev?.trackName || null,
  recoveredBy: 'manual-catalogue-lookup',
  recoverNote: why,
};
db[key] = out;
fs.writeFileSync(P, JSON.stringify(db, null, 1) + '\n');
console.log(`✓ ${key}\n  → ${out.appleArtist}《${out.appleTitle}》${out.appleYear}｜${out.trackCount} 軌｜${out.status}`);
console.log(`  previewUrl: ${out.previewUrl ? 'ok' : '⚠ 無'}｜理由：${why}`);
