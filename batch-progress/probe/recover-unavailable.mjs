// 2026-09-06：東亞線的 unavailable 大量是假的（裁定 185）。
// probe-previews 只走 `search` 端點，而盤名不是拉丁字母時 Apple 的 search 索引查不到——
// c-111 八張 unavailable 全是假的、c-112 三張全是假的，兩批的假陽性率都是 100%。
//
// 這支不改 previews.json，只產「候選報告」給研究層覆核：
//   1. 用藝人名在各店面找 Apple 的 artistId（藝人名通常查得到，查不到盤名的是 search 對標題的索引）
//   2. `lookup?id=<artistId>&entity=album&limit=200` 拉整份目錄（裁定 173）
//   3. 用「年份 ±1」與 titleOk／looseTitleOk 篩出候選，逐筆列出 collectionId、盤名、年份、軌數
// 軌數與年份都可能對不上（裁定 174／175），所以**一律不自動改 previews.json**，由研究層定奪。
//
// 用法：node batch-progress/probe/recover-unavailable.mjs c104 [店面…]
import fs from 'node:fs';
import path from 'node:path';
import { titleOk, looseTitleOk, artistOk, looseArtistOk, norm } from './match-lib.mjs';

const batch = process.argv[2];
if (!batch) { console.error('用法：node batch-progress/probe/recover-unavailable.mjs c104 [店面…]'); process.exit(1); }
const FRONTS = process.argv.slice(3).length ? process.argv.slice(3) : ['us', 'jp', 'kr', 'hk', 'tw', 'gb'];

const cardsPath = `desc-tools/batches/cards/${batch}-cards.json`;
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));
const prev = JSON.parse(fs.readFileSync('batch-progress/probe/previews.json', 'utf8'));
const todo = cards.filter(c => (prev[`${c.artist}|${c.album}`] || {}).status !== 'ready');
console.log(`${batch}：${cards.length} 張，其中 ${todo.length} 張未 ready，開始回撈`);

const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = async (u, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(u, { signal: AbortSignal.timeout(20000) }).catch(() => null);
    if (r && r.ok) return r.json();
    await sleep(1500 * (i + 1) * (i + 1));
  }
  return null;
};

// 藝人目錄快取：同一位藝人在同一店面只拉一次
const catalogue = new Map();
const catalogueOf = async (artist, alias, front) => {
  const ck = `${front}|${norm(artist)}`;
  if (catalogue.has(ck)) return catalogue.get(ck);
  let items = [];
  for (const term of [artist, alias].filter(Boolean)) {
    const s = await get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=musicArtist&limit=10&country=${front}`);
    await sleep(700);
    const arts = ((s && s.results) || []).filter(a => artistOk(term, a.artistName) || looseArtistOk(term, a.artistName));
    for (const a of arts.slice(0, 3)) {
      const l = await get(`https://itunes.apple.com/lookup?id=${a.artistId}&entity=album&limit=200&country=${front}`);
      await sleep(700);
      items.push(...((l && l.results) || []).filter(x => x.wrapperType === 'collection'));
    }
    if (items.length) break;
  }
  catalogue.set(ck, items);
  return items;
};

const lines = [];
let hit = 0;
let n = 0;
const flush = () => fs.writeFileSync(`batch-progress/${batch}/apple-candidates.md`,
  `# ${batch} Apple 候選回撈（裁定 173／185）\n\n` +
  `探測層判成 unavailable 的 ${todo.length} 張，改走「藝人目錄 lookup」重找。\n` +
  `**軌數與年份都可能對不上（裁定 174／175），這份是候選不是結論，請研究層逐筆覆核。**\n\n` +
  lines.join('\n'));

for (const c of todo) {
  n++;
  const found = [];
  for (const front of FRONTS) {
    const items = await catalogueOf(c.artist, c.queryAlias, front);
    for (const it of items) {
      const y = Number(String(it.releaseDate || '').slice(0, 4));
      const near = c.year && y && Math.abs(y - c.year) <= 1;
      const tOk = titleOk(c.album, it.collectionName, c.selfTitled) || looseTitleOk(c.album, it.collectionName, c.selfTitled);
      if (tOk || near) found.push({ front, id: it.collectionId, name: it.collectionName, y, tr: it.trackCount, why: tOk ? (near ? '盤名＋年份' : '盤名') : '年份' });
    }
    if (found.length) break;
  }
  const uniq = [...new Map(found.map(f => [f.id, f])).values()].slice(0, 8);
  if (uniq.length) hit++;
  lines.push(`## ${c.artist}《${c.album}》${c.year || ''}${uniq.length ? '' : ' — **目錄裡找不到**'}`);
  for (const f of uniq) lines.push(`- \`${f.id}\` ${f.front}｜《${f.name}》${f.y || '?'}｜${f.tr} 軌｜依據：${f.why}`);
  lines.push('');
  console.log(`[${n}/${todo.length}] ${c.artist}《${c.album}》→ ${uniq.length} 個候選`);
  if (n % 3 === 0) flush();
}
flush();
console.log(`\n${batch}｜未 ready ${todo.length} 張，其中 ${hit} 張在藝人目錄裡找到候選 → batch-progress/${batch}/apple-candidates.md`);
