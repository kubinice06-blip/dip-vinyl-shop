// 用「人工核對過的 collectionId」補一張碟的試聽，適用於一般批次
// （§1 補遺批走各自的 apple-previews.mjs）。
//
// 為什麼需要它：`probe-previews.mjs` 走 search ＋ 標題比對，比對是它唯一的防線
// ——search 沒辦法確認找到的是不是同一張碟，所以擋掉是對的。但當某一層
// **人工核對過** collectionId 指向的就是那張碟時，比對擋掉的是正確答案（裁定第 134 條）。
// 常見成因：Apple 的盤名或掛名用了另一種文字系統（羅馬拼音／片假名／異體字）。
//
// 用法：node batch-progress/apple-previews-verified.mjs <批> "<artist>|<album>" <collectionId> [理由]
// 一律依序試 storefront（裁定第 137 條：lookup 不帶 country 就是問美國店面）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const [batch, key, cid, reason] = process.argv.slice(2);
if (!batch || !key || !cid) {
  console.error('用法：node batch-progress/apple-previews-verified.mjs <批> "<artist>|<album>" <collectionId> [理由]');
  process.exit(1);
}
const FRONTS = ['jp', 'us', 'gb', 'de', 'fr', 'ca', 'au'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const P = path.join(ROOT, `batch-progress/${batch}/previews.json`);
const prev = JSON.parse(fs.readFileSync(P, 'utf8'));

if (prev[key]?.previewUrl) { console.log(`— ${key} 已經是 ready，不動`); process.exit(0); }

let tracks = [], album = null, front = null;
for (const f of FRONTS) {
  const j = await fetch(`https://itunes.apple.com/lookup?id=${cid}&entity=song&limit=200&country=${f}`)
    .then(r => r.json()).catch(() => null);
  await sleep(800);
  const t = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl);
  if (t.length) { tracks = t; album = (j.results || [])[0]; front = f; break; }
}
if (!tracks.length) { console.log(`✗ ${key}：lookup ${cid} 各 storefront 皆無可用試聽`); process.exit(1); }

const t = tracks.sort((a, b) => (a.trackNumber || 99) - (b.trackNumber || 99))[0];
prev[key] = {
  batch,
  tried: [...(prev[key]?.tried || []), `lookup:${cid}@${front}`],
  front,
  collectionId: Number(cid),
  appleTitle: album.collectionName,
  appleArtist: album.artistName,
  appleYear: String(album.releaseDate || '').slice(0, 4),
  explicitness: t.trackExplicitness || 'notExplicit',
  trackCount: album.trackCount,
  previewUrl: t.previewUrl,
  cleanedOnly: false,
  reissueTitle: false,
  previewSource: 'apple-verified-collection',
  verifiedReason: reason || '',
  status: 'ready',
};
fs.writeFileSync(P, JSON.stringify(prev, null, 1));
const e = Object.values(prev);
console.log(`✓ ${key} → ${album.artistName}《${album.collectionName}》${front}／tr${t.trackNumber} ${t.trackName}`);
console.log(`全批 ready ${e.filter(x => x.previewUrl).length}／${e.length}`);
