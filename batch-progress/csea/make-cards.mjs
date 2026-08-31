// c-50 切卡單：cand.json（127 張）→ desc-tools/batches/cards/c50{a,b,c}-cards.json
//
// 兩個約束：
// 1. 每批 50 張上限（dip-desc-restyle skill 規定）。
// 2. **同一藝人的多張卡必須落在同一批**——hook 層要在 note 裡互寫排除條款
//    （「某軸歸《某張》」），跨批就失效，寫作層會把同一個故事寫兩遍。
//    本批有 Santana、RHCP、Arca、Nilsson、Wynton Marsalis、BTS、Vangelis 等多張卡的藝人。
// 3. 盡量讓同曲風集中，方便 hook 層規劃反同構的通論帳本。
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib.mjs';

const CJK = /[㐀-鿿぀-ヿ가-힯]/;
const OUT = path.join(ROOT, 'desc-tools/batches/cards');
fs.mkdirSync(OUT, { recursive: true });

const cand = JSON.parse(fs.readFileSync(path.join(ROOT, 'batch-progress/csea/cand.json'), 'utf8'));

// 先按藝人分組（同藝人不可拆），再按主曲風排序讓同曲風相鄰
const byArtist = new Map();
for (const a of cand.albums) {
  if (!byArtist.has(a.artist)) byArtist.set(a.artist, []);
  byArtist.get(a.artist).push(a);
}
const units = [...byArtist.values()].sort((x, y) => {
  const g = (x[0].genres || [])[0] || '', h = (y[0].genres || [])[0] || '';
  return g.localeCompare(h) || y.length - x.length;
});

// 貪婪裝箱成三批，每批 ≤50，且盡量平均
const CAP = 50, N = 3;
const bins = Array.from({ length: N }, () => []);
for (const u of units) {
  const target = bins
    .map((b, i) => ({ i, n: b.reduce((p, c) => p + c.length, 0) }))
    .filter(b => b.n + u.length <= CAP)
    .sort((p, q) => p.n - q.n)[0];
  if (!target) throw new Error(`裝不下：${u[0].artist} ${u.length} 張`);
  bins[target.i].push(u);
}

const names = ['cseaa', 'cseab', 'cseac'];
let grand = 0;
bins.forEach((bin, i) => {
  const cards = bin.flat().map(a => {
    const raw = `${a.artist}|${a.album}`;
    return {
      key: (CJK.test(raw) ? 'desc4:' : 'desc2:') + raw,
      artist: a.artist, album: a.album, year: a.suggestedYear,
      genre: (a.genres || [])[0] || '',
      label: a.label || '',
      rgMbid: a.rgMbid, mbTitle: a.mbTitle, mbFirstRelease: a.mbFirstRelease,
      // 派工特注的素材：策展層的收錄理由與風險，研究層據此查證而非重新猜
      curatorWhy: a.curatorWhy, curatorRisk: a.curatorRisk, mbNote: a.mbNote,
      selfTitled: a.selfTitled,
      apex: null,   // 本批全為普卡；頂點評估在本機做
    };
  });
  fs.writeFileSync(path.join(OUT, `${names[i]}-cards.json`), JSON.stringify(cards, null, 1));
  const gs = {}; cards.forEach(c => { gs[c.genre] = (gs[c.genre] || 0) + 1; });
  const multi = bin.filter(u => u.length > 1).map(u => `${u[0].artist}×${u.length}`);
  console.log(`${names[i]}-cards.json：${cards.length} 張｜${Object.entries(gs).sort((p, q) => q[1] - p[1]).map(e => e[0] + ' ' + e[1]).join('、')}`);
  if (multi.length) console.log(`    同藝人多卡（已保證同批）：${multi.join('、')}`);
  grand += cards.length;
});
console.log(`\n合計 ${grand} 張`);

// 鍵唯一性——重複鍵會讓 KV 後寫的蓋掉先寫的，靜默掉卡
const all = names.flatMap(n => JSON.parse(fs.readFileSync(path.join(OUT, `${n}-cards.json`), 'utf8')).map(c => c.key));
const dup = all.filter((k, i) => all.indexOf(k) !== i);
console.log(dup.length ? `⚠ 重複鍵 ${dup.length}：${[...new Set(dup)].join('、')}` : '鍵唯一性檢查：通過');
// 同藝人跨批檢查
const artistBin = new Map();
names.forEach(n => JSON.parse(fs.readFileSync(path.join(OUT, `${n}-cards.json`), 'utf8'))
  .forEach(c => { if (!artistBin.has(c.artist)) artistBin.set(c.artist, new Set()); artistBin.get(c.artist).add(n); }));
const split = [...artistBin].filter(([, s]) => s.size > 1);
console.log(split.length ? `⚠ 同藝人跨批：${split.map(([a, s]) => a + ' → ' + [...s].join('/')).join('；')}` : '同藝人同批檢查：通過');

// ── 研究小組切分 ────────────────────────────────────────────────
// 每批再切五組派給研究子代理。原本是臨時指令做的，沒進版本控制；
// 2026-08-30 修 MBID 時得重出卡單，才發現小組檔沒有腳本可以重生，
// 只能反推出「照卡單順序連續切」才敢覆蓋。切分規則寫進來，下次直接重跑。
// 順序切分是刻意的：卡單已按藝人成塊排好，連續切能讓同藝人的卡盡量落在同一組，
// 研究層才看得到彼此、寫得出排除條款。
const NG = 5;
for (const batch of names) {
  const cards = JSON.parse(fs.readFileSync(path.join(OUT, `${batch}-cards.json`), 'utf8'));
  const per = Math.ceil(cards.length / NG);
  let pos = 0;
  const sizes = [];
  for (let i = 0; i < NG; i++) {
    const g = String.fromCharCode(97 + i);
    const chunk = cards.slice(pos, pos + per);
    pos += chunk.length;
    fs.writeFileSync(path.join(OUT, `${batch}-${g}.json`), JSON.stringify(chunk, null, 1));
    sizes.push(`${g}:${chunk.length}`);
  }
  if (pos !== cards.length) throw new Error(`${batch} 小組切分漏卡：${pos}/${cards.length}`);
  console.log(`${batch} 小組切分 ${sizes.join('、')}`);
}
