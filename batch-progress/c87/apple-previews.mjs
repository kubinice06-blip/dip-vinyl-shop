// c-87（§1 人工身分補遺批）的試聽補完。
//
// 一般批次的 probe-previews 走 search + 標題比對，這在本批會漏：策展層人工核對過的
// 16 個 collectionId 裡，有 6 張的 Apple 盤名與卡片盤名對不上（丸山繁雄兩張是「+3」「+2」
// 加曲版、菅野邦彦《Date in Daté》的 Apple 盤名是「BLACK ORPHEUS DATE IN DATE」、
// 与世山澄子《Introducing》是片假名「イントロデューシング」），search 找得到也會被
// 標題比對擋掉。
//
// 封面已經走 §4 的 apple-verified-collection 例外，用確切 collectionId 直查；
// 試聽用同一個 collectionId 走 lookup?entity=song 取第一軌的 previewUrl，
// 比模糊搜尋嚴格（是人工核對過的那張碟，不是名字像的另一張），因此沿用同一個例外。
// 只補「原本 unavailable、但有 collectionId」的卡，已 ready 的不動。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const P = path.join(ROOT, 'batch-progress/c87/previews.json');
const prev = JSON.parse(fs.readFileSync(P, 'utf8'));
const art = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/c87/apple-art.json'), 'utf8'));

let filled = 0;
for (const [key, a] of Object.entries(art)) {
  const cur = prev[key];
  if (cur?.previewUrl) continue;                 // 已 ready，不動
  if (!a.collectionId) continue;
  const j = await fetch(`https://itunes.apple.com/lookup?id=${a.collectionId}&entity=song&limit=200`)
    .then(r => r.json()).catch(() => null);
  await sleep(800);
  const tracks = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl);
  if (!tracks.length) { console.log(`✗ ${key}：lookup ${a.collectionId} 無可用試聽`); continue; }
  const t = tracks.sort((x, y) => (x.trackNumber || 99) - (y.trackNumber || 99))[0];
  prev[key] = {
    batch: 'c87',
    tried: [...(cur?.tried || []), `lookup:${a.collectionId}`],
    front: 'jp',
    collectionId: a.collectionId,
    appleTitle: a.appleTitle,
    appleArtist: a.appleArtist,
    appleYear: a.appleYear,
    explicitness: t.trackExplicitness || 'notExplicit',
    trackCount: a.trackCount,
    previewUrl: t.previewUrl,
    cleanedOnly: false,
    reissueTitle: false,
    previewSource: 'apple-verified-collection',
    status: 'ready',
  };
  filled++;
  console.log(`✓ ${key} → ${a.appleTitle}／tr${t.trackNumber} ${t.trackName}`);
}
fs.writeFileSync(P, JSON.stringify(prev, null, 1));
const e = Object.values(prev);
console.log(`\n補進 ${filled} 張｜全批 ready ${e.filter(x => x.previewUrl).length}／${e.length}`);
