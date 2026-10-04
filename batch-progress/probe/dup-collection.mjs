// 同一個 Apple `collectionId` 被兩張以上的卡引用 → 至少有一張是誤配。
//
// 為什麼要有這支（主線第 1938-B 條）：`match-lib` 的四道防呆全是「單張卡 vs 單筆結果」的比對，
// 看不到「這筆結果已經被別張卡用掉了」。c-181 的 `高中正義《Jungle Jane》` 與
// 《Jungle Jane Tour Live》同時被配到《Takanaka》1977，四道都抓不到
// ——證人與 Apple 盤名逐字相等，第四道的「片段」條件不成立。
// **但「同一張碟配給同一位藝人的兩張不同卡」是機器看得見的。**
//
// 只報不擋：真的有一種合法情形——**兩張卡其實是同一張碟的兩個沒折疊的 RG**
// （c-178 的 `森山威男《Smile》`／《スマイル》），那種要回頭併卡，不是改探測結果。
//
// 用法：node batch-progress/probe/dup-collection.mjs [批次…]（不給就掃全部）
import fs from 'node:fs';
const P = JSON.parse(fs.readFileSync('batch-progress/probe/previews.json', 'utf8'));
const only = process.argv.slice(2);
const byId = new Map();
for (const [k, v] of Object.entries(P)) {
  if (!v.collectionId || (v.status !== 'ready' && v.status !== 'no-preview')) continue;
  if (only.length && !only.includes(v.batch)) continue;
  if (!byId.has(v.collectionId)) byId.set(v.collectionId, []);
  byId.get(v.collectionId).push({ k, v });
}
let n = 0;
for (const [id, list] of byId) {
  if (list.length < 2) continue;
  n++;
  const sameArtist = new Set(list.map(x => x.k.split('|')[0])).size === 1;
  console.log(`\n⚠ collectionId ${id}（${list.length} 張卡引用${sameArtist ? '、且是同一位藝人' : ''}）`);
  console.log(`   Apple：${list[0].v.appleArtist} /《${list[0].v.appleTitle}》${list[0].v.appleYear}`);
  for (const x of list) console.log(`   - [${x.v.batch}] ${x.k}｜drift ${x.v.yearDrift || 0}${x.v.recoveredBy ? '｜人工回撈' : ''}${x.v.aliasOnlyTitle ? '｜aliasOnlyTitle' : ''}`);
}
console.log(`\n掃 ${byId.size} 個 collectionId｜被兩張以上的卡引用的有 ${n} 個（只報不擋）`);
