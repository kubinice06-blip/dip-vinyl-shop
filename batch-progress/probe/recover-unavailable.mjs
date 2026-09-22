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
// 2026-09-13（c-126 踩到）：店面要「空白分隔」逐個傳，不是逗號串成一個。
// 主線那次傳成 `c126 tw,hk,sg,my,us,jp,gb,cn`，於是唯一的「店面」是那整串亂碼，
// 每一次請求都打到不存在的 country，Apple 回的是**合法的空結果**——
// 14 張全部「0 個候選」，跟「這些碟真的沒上架」長得一模一樣。
// 實際上那 14 張裡 Leo王四張在 tw 的藝人目錄裡一個不缺。改成開工先驗店面碼。
const FRONTS = process.argv.slice(3).length ? process.argv.slice(3) : ['us', 'jp', 'kr', 'hk', 'tw', 'gb'];
const badFronts = FRONTS.filter(f => !/^[a-z]{2}$/.test(f));
if (badFronts.length) {
  console.error(`店面碼不合法：${badFronts.join(' ')}\n` +
    `店面要用空白分隔逐個傳（例：… c126 tw hk sg us），不要用逗號串成一個。`);
  process.exit(1);
}

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
    await sleep(1200);
    const arts = ((s && s.results) || []).filter(a => artistOk(term, a.artistName) || looseArtistOk(term, a.artistName));
    for (const a of arts.slice(0, 3)) {
      const l = await get(`https://itunes.apple.com/lookup?id=${a.artistId}&entity=album&limit=200&country=${front}`);
      await sleep(1200);
      items.push(...((l && l.results) || []).filter(x => x.wrapperType === 'collection'));
    }
    if (items.length) break;
  }
  catalogue.set(ck, items);
  return items;
};

// ── 第三條路：盤名直接查 `entity=album`（2026-09-21，第 1859-B 條）────────────
// c-173 回撈層實證：上面那條「掛名→目錄」在日本盤會整條斷掉，兩個原因——
//   (1) `catalogueOf` 用 `artistOk`/`looseArtistOk` 過濾 `entity=musicArtist`，
//       **日文掛名對上羅馬字店面掛名過不了**，artistId 當場被丟；
//   (2) 更根本的是**新成因第 7 種**：店面把「盤名的片假名轉寫」當成掛名，
//       樂團名在整筆資料裡完全消失（`The Original Big Four` 的 `artistName`
//       逐字是 `オリジナル・ビッグ・フォア`）——**這種盤從掛名那端永遠找不到。**
// 所以補一條不經過掛名的路：拿盤名（與 queryAlias）直接打 `entity=album`。
// ⚠ 只在第一條路**一個候選都沒有**時才跑，且**必須盤名對得上**——
// 只靠年份會把那一年的所有專輯都收進來。
// 2026-09-21 追加（c-174 回撈層，第 1875-B 條）：**`queryAlias` 的括號內容要保留著查一次。**
// `match-lib.mjs` 的 `aliasParts()` 會把括號說明剝掉，於是 `Music Break (Live, 1967)`
// 這種**店面題逐字就是 alias** 的情形，探測鏈既查不到也比不上
// （比對那端 `digitResidual()` 會因為 `1967` 把它擋掉）。
// 這裡不動共用的 match-lib（它被一百多批共用，改了風險太大），
// 只在回撈這條路上：① 把帶括號的 alias 原字串也當查詢詞；② 店面題與 alias **逐字相同**就採用。
const aliasRaw = c => String(c.queryAlias || '').split(/[；;]/).map(x => x.trim()).filter(x => Array.from(x).length >= 2);
const albumSearch = async (c, front) => {
  const terms = [...new Set([c.album, ...aliasRaw(c), `${c.album} ${c.artist}`].filter(Boolean))];
  const out = [];
  for (const term of terms) {
    const s2 = await get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=25&country=${front}`);
    await sleep(1200);
    for (const it of ((s2 && s2.results) || [])) {
      const aliasExact = aliasRaw(c).some(a => norm(a) === norm(it.collectionName));
      const tOk = aliasExact
        || titleOk(c.album, it.collectionName, c.selfTitled)
        || looseTitleOk(c.album, it.collectionName, c.selfTitled);
      if (!tOk) continue;                       // 盤名對不上就不收，年份不足以單獨成立
      const y = Number(String(it.releaseDate || '').slice(0, 4));
      // ⚠ 2026-09-22（主線第 1935-B 條）：這條路**只驗盤名、不驗掛名**，
      // 所以候選裡混著「盤名對、掛名是另一個人」的碟（c-179 九個候選零成立，抬頭全是「盤名直查」）。
      // 這裡不擋——擋掉就失去「盤名直查」這條路的意義——**改成把掛名那一關的結果逐筆標出來**，
      // 讓覆核的人一眼看見哪幾筆連掛名都沒過。
      const aOk = artistOk(c.artist, it.artistName || '') || looseArtistOk(c.artist, it.artistName || '');
      out.push({ front, id: it.collectionId, name: it.collectionName, art: it.artistName || '', y, tr: it.trackCount,
        why: (c.year && y && Math.abs(y - c.year) <= 1) ? '盤名直查＋年份' : '盤名直查',
        artGate: aOk ? '掛名也過' : '**掛名沒過**' });
    }
    if (out.length) break;
  }
  return out;
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
      if (tOk || near) found.push({ front, id: it.collectionId, name: it.collectionName, art: it.artistName || '', y, tr: it.trackCount, why: tOk ? (near ? '盤名＋年份' : '盤名') : '年份', artGate: '走藝人目錄' });
    }
    if (found.length) break;
  }
  if (!found.length) {                          // 第一條路全空 → 走盤名直查
    for (const front of FRONTS) {
      found.push(...await albumSearch(c, front));
      if (found.length) break;
    }
  }
  const uniq = [...new Map(found.map(f => [f.id, f])).values()].slice(0, 8);
  if (uniq.length) hit++;
  lines.push(`## ${c.artist}《${c.album}》${c.year || ''}${uniq.length ? '' : ' — **目錄裡找不到**'}`);
  for (const f of uniq) lines.push(`- \`${f.id}\` ${f.front}｜《${f.name}》／${f.art || '?'}｜${f.y || '?'}｜${f.tr} 軌｜依據：${f.why}｜${f.artGate || ''}`);
  lines.push('');
  console.log(`[${n}/${todo.length}] ${c.artist}《${c.album}》→ ${uniq.length} 個候選`);
  if (n % 3 === 0) flush();
}
flush();
console.log(`\n${batch}｜未 ready ${todo.length} 張，其中 ${hit} 張在藝人目錄裡找到候選 → batch-progress/${batch}/apple-candidates.md`);
