// c-92（台灣線 §1 人工身分補遺批）的試聽補完。改寫自 c-87 那支。
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
// c-92 是台灣線，tw 放第一（第 158 條）。cn 拿掉——本線 56 個試聽命中零個落在 cn。
const FRONTS = ['tw', 'hk', 'sg', 'my', 'us', 'jp', 'gb'];
// c-92 的試聽跟其他三批一起跑進了共用的 probe/previews.json，不是各批自己一份。
const P = path.join(ROOT, 'batch-progress/probe/previews.json');
const prev = JSON.parse(fs.readFileSync(P, 'utf8'));
const art = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/c92/apple-art.json'), 'utf8'));

let filled = 0;
for (const [key, a] of Object.entries(art)) {
  const cur = prev[key];
  if (cur?.previewUrl) continue;                 // 已 ready，不動
  if (!a.collectionId) continue;
  // lookup 不帶 country 時走美國 storefront。日本限定的碟在美國店面沒有上架，
  // 回來的是「專輯有、一軌都沒有」——看起來像「有碟無預覽」，其實是問錯了店面。
  // 与世山澄子《Introducing》就是這樣被判成 unavailable 的（裁定第 137 條）。
  let tracks = [], front = null;
  for (const f of FRONTS) {
    const j = await fetch(`https://itunes.apple.com/lookup?id=${a.collectionId}&entity=song&limit=200&country=${f}`)
      .then(r => r.json()).catch(() => null);
    await sleep(800);
    const t = (j?.results || []).filter(x => x.wrapperType === 'track' && x.previewUrl);
    if (t.length) { tracks = t; front = f; break; }
  }
  if (!tracks.length) { console.log(`✗ ${key}：lookup ${a.collectionId} 各 storefront 皆無可用試聽`); continue; }
  const t = tracks.sort((x, y) => (x.trackNumber || 99) - (y.trackNumber || 99))[0];
  prev[key] = {
    batch: 'c92',
    tried: [...(cur?.tried || []), `lookup:${a.collectionId}@${front}`],
    front,
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
  console.log(`✓ ${key} → ${a.appleTitle}／${front}／tr${t.trackNumber} ${t.trackName}`);
}
fs.writeFileSync(P, JSON.stringify(prev, null, 1));
const e = Object.values(prev).filter(x => x.batch === 'c92');
console.log(`\n補進 ${filled} 張｜c-92 ready ${e.filter(x => x.previewUrl).length}／${e.length}`);
