// 人工身分卡的封面：依 §4 新增的 apple-verified-collection 例外（裁定第 96 條），
// 用策展層人工核對過的 collectionId 直接 lookup 取封面網址——**不是模糊搜尋**。
// 沒有 collectionId 的卡不處理（§4：抓不到可靠封面就停止該筆）。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
// c-92 是單組補遺批，只讀 prop-a。
const props = ['a'].flatMap(g =>
  JSON.parse(fs.readFileSync(path.join(ROOT, `batch-progress/c92/prop-${g}.json`), 'utf8')));
const out = {};
// 2026-09-05：原本這裡是「把整筆 prop 轉成字串、regex 撈第一個 collectionId」。
// 那會撈到**策展層在 risk 欄寫來當反例的 collectionId**——骨肉皮《快樂玩》的 risk
// 明寫「Apple 台灣藝人頁名下只有 1995 年那張（collectionId 6804890418），本盤 0 筆、
// 沒有 collectionId」，腳本照樣把 6804890418 撈走，配了一張別的碟的封面上去。
// **與 fix-rgmbid 那個「刻意不釘」被無視的 bug 是同一個形狀**（裁定第 153 條附錄），
// 只是這次發生在封面層。兩道防線：
//   (1) 反例排除——collectionId 後面若跟著否定語，不採用；
//   (2) 回名核對——lookup 回來的盤名與卡片盤名互不包含就不採用，印出讓人工判。
// NEG 只放**明確指向這個 id 不是本盤**的說法。第一版還放了「名下只有」與「無關」，
// 太寬——它會被「MB 上謝銘祐名下只有兩筆」這種在講 MB 的句子誤觸（那兩張最後還是配對了，
// 但日誌印出假警報）。窗口也從 200 收到 80 字。
const NEG = /(本盤|本卡)\s*0\s*筆|0\s*筆[，、]|沒有\s*collectionId|不是本(盤|卡|張)|別碟|刻意不釘/;
// 策展層在 id 附近寫「已人工核對」＝他逐項比對過曲目與 ℗ 行，回名對不上也採用
// （Apple 對台灣老盤常掛英譯名，例：陳達《民族樂手陳達和他的歌》→《Chen Da and His Songs》）。
const ATTESTED = /已人工核對|人工核對過|逐項核對/;
function pickCollectionId(r) {
  const text = `${r.risk || ''}\n${r.why || ''}\n${r.manualRuling || ''}`;
  const hits = [];
  for (const m of text.matchAll(/collectionId[^0-9]{0,8}(\d{6,})/g)) {
    const tail = text.slice(m.index, m.index + 80);
    if (NEG.test(tail)) { hits.push({ id: m[1], rejected: '反例（後文有否定語）' }); continue; }
    hits.push({ id: m[1], attested: ATTESTED.test(text.slice(m.index, m.index + 320)) });
  }
  const good = hits.find(h => !h.rejected);
  return { id: good && good.id, attested: !!(good && good.attested), rejected: hits.filter(h => h.rejected).map(h => h.id) };
}
const norm = s => String(s).toLowerCase().replace(/[\s\p{P}<>]/gu, '');
let mismatched = 0;
for (const r of props.filter(x => x.identitySource === 'manual')) {
  const { id, attested, rejected } = pickCollectionId(r);
  if (rejected.length) console.log(`  · ${r.album}：排除反例 collectionId ${rejected.join('、')}`);
  if (!id) { console.log(`— ${r.album}：無 collectionId，依 §4 不處理`); continue; }
  const j = await fetch(`https://itunes.apple.com/lookup?id=${id}`).then(r => r.json()).catch(() => null);
  await sleep(800);
  const a = (j?.results || [])[0];
  if (!a) { console.log(`✗ ${r.album}：lookup ${id} 無結果`); continue; }
  // 100x100 換成 1200x1200：Apple 的網址是可替換尺寸的固定格式
  // 回名核對：Apple 的盤名可能是英譯或帶副標，所以用互相包含判斷，不要求相等
  const titleOk = norm(a.collectionName).includes(norm(r.album)) || norm(r.album).includes(norm(a.collectionName));
  if (titleOk === false && attested) {
    console.log(`  · ${r.album}：Apple 盤名《${a.collectionName}》與卡片不同，但策展層註明已人工核對，採用`);
  } else if (!titleOk) {
    mismatched++;
    console.log(`⚠ ${r.album}：lookup ${id} 回的是《${a.collectionName}》(${String(a.releaseDate||'').slice(0,4)})，`
      + `盤名對不上，**不採用**——若確定是同一張碟（英譯名／副標差異），在 prop 的 risk 寫明後再跑一次`);
    continue;
  }
  const url = String(a.artworkUrl100 || '').replace(/\/100x100bb\.\w+$/, '/1200x1200bb.jpg');
  out[`${r.artist}|${r.album}`] = {
    collectionId: Number(id), appleArtist: a.artistName, appleTitle: a.collectionName,
    appleYear: String(a.releaseDate || '').slice(0, 4), trackCount: a.trackCount,
    art: url ? { url, source: 'apple-verified-collection', collectionId: Number(id) } : null,
  };
  console.log(`${url ? '✓' : '✗'} ${r.album} → ${a.artistName}《${a.collectionName}》${String(a.releaseDate||'').slice(0,4)} tr${a.trackCount}`);
}
fs.writeFileSync(path.join(ROOT, 'batch-progress/c92/apple-art.json'), JSON.stringify(out, null, 1));
console.log(`\n人工身分卡 ${props.filter(x => x.identitySource === 'manual').length} 張｜取到封面 ${Object.values(out).filter(x => x.art).length} 張｜盤名不符擋下 ${mismatched} 張`);
