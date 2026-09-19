// 跨批去重（2026-09-02，c-65 發現）。
// `chk-prop` 只比對「線上池」與「批內跨組」，**不比對其他待上架的批次**——
// 這個縫隙讓 c-58／c-59／c-60 與 c-65 之間漏了 5 筆重複。
//
// 比對用的正規化要保留所有文字系統：第一版用 [^a-z0-9...] 過濾，
// 把西里爾與希臘文整個壓成空字串，於是 c-53 的 69 張與 c-62 的 38 張
// 彼此「全部撞卡」——誤報 76 筆。改用 \p{L}\p{N} 就對了。
//
// 用法：node batch-progress/dedup-crossbatch.mjs [批名...]（省略＝掃全部 c5x／c6x）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { ROOT } from './lib.mjs';

// 2026-09-03（c-73 策展層回報）：原本只掃 `desc-tools/batches/cards/*-cards.json`，
// 但**策展已定稿、卡單還沒建**的批次不在那裡——它們的候選只存在於
// `batch-progress/c<批>/prop-*.json`。二十批並行時這個縫隙比第 119 條那次更寬：
// c-73 交件時有六批處於「prop 有、cards 沒有」的狀態，等於六批彼此看不見。
// 現在兩種來源都掃：卡單優先（已建卡單的批次以卡單為準），沒有卡單才回退讀 prop。
const DIR = path.join(ROOT, 'desc-tools/batches/cards');
const PROP = path.join(ROOT, 'batch-progress');
// 2026-09-14（c-129 b 組實掃 manifest 才抓到）：原本的 `^c\d+-cards\.json$` 只認
// 「c＋純數字」的批名，於是**十五份卡單從來沒有進過跨批去重**——
// c48a/b/c、c49a/b、c50a/b/c、c51a/b/c/d 這些帶字母尾碼的，以及 c-SEA 的
// cseaa/cseab/cseac。c-SEA 那 99 張裡有 18 張至今沒進 manifest 也沒進 seed，
// 所以連「線上池」那一側也擋不住它們。
// **後果是所有批次回報的「跨批撞卡 0」都只是部分結論**，不是全域的。
// 批名允許數字後接字母（`-cards.json` 這個後綴已經擋掉了 `-a.json` 那些分組檔）。
const cardBatches = fs.readdirSync(DIR).filter(f => /^c[0-9a-z]+-cards\.json$/.test(f)).map(f => f.replace('-cards.json', ''));
const propBatches = fs.readdirSync(PROP, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^c[0-9a-z]+$/.test(d.name))   // 同上：批名可帶字母尾碼
  .filter(d => fs.readdirSync(path.join(PROP, d.name)).some(f => /^prop-[a-z]\.json$/.test(f)))
  .map(d => d.name);
// 2026-09-14：早期的大批被切成帶字母尾碼的子批——`batch-progress/c51/` 底下是
// prop-a…prop-d，而卡單是 `c51a-cards.json`…`c51d-cards.json`。修好上面那個 regex 之後，
// 同一批會**同時從 prop 側（c51）與卡單側（c51a–d）各算一次**，於是整批自己跟自己撞卡。
// 規則：卡單側存在 `<批名><字母>-cards.json` 時，prop 側那個母批名視為已被取代。
// （字母才算子批；`c120` 對 `c12` 是數字，不算。）
const supersededProp = new Set(
  propBatches.filter(b => cardBatches.some(c => c !== b && c.startsWith(b) && /^[a-z]/.test(c.slice(b.length)))));
const batches = process.argv.slice(2).length ? process.argv.slice(2)
  : [...new Set([...cardBatches, ...propBatches.filter(b => !supersededProp.has(b))])].sort();
if (supersededProp.size)
  console.log(`（${[...supersededProp].sort().join('、')} 的 prop 已被同名子批的卡單取代，不重複計入）`);

// 一個批次的候選：優先讀卡單，沒有就讀該批所有 prop-*.json。
const rowsOf = b => {
  const f = path.join(DIR, `${b}-cards.json`);
  if (fs.existsSync(f)) return { src: 'cards', rows: JSON.parse(fs.readFileSync(f, 'utf8')) };
  const d = path.join(PROP, b);
  if (!fs.existsSync(d)) return null;
  const props = fs.readdirSync(d).filter(x => /^prop-[a-z]\.json$/.test(x)).sort();
  if (!props.length) return null;
  return { src: 'prop', rows: props.flatMap(x => JSON.parse(fs.readFileSync(path.join(d, x), 'utf8'))) };
};

// 括號只在裡面**是再版裝飾詞**時才剝（2026-09-03）。原本無條件剝掉所有括號內容，
// 於是 Peter Gabriel 的《Peter Gabriel (Car)》與《Peter Gabriel (Security)》
// 雙雙變成 `petergabriel|petergabriel`，被判成撞卡——**括號裡正是區別兩張碟的東西**。
// 自我同名系列（Peter Gabriel 四張、Led Zeppelin、Weezer 的顏色盤）都是這個形狀。
const DECOR = /^\s*(\d{4}\s*)?(original\s+|digitally\s+)?(motion\s+picture\s+)?(remaster(ed)?|reissue|re-?issue|deluxe|expanded|edition|anniversary|version|mono|stereo|bonus\s+tracks?|sound\s*track|ost)\b/i;
const strip = s => String(s || '')
  .replace(/[（(\[]([^）)\]]*)[）)\]]/g, (m, inner) => DECOR.test(inner) ? ' ' : m)
  .replace(/\b(original\s+)?soundtrack\b/gi, ' ')
  .replace(/\b(remaster(ed)?|reissue|deluxe|expanded|edition|anniversary)\b/gi, ' ')
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, '');          // 保留所有文字系統，只丟標點與空白

// 2026-09-15：已知且本機已擋下的跨批重複（裁定 310），列在 dedup-known.json，
// 不再每批都紅——但仍印出來，讓人看得到它們還在。
const KNOWN = path.join(__dirname, 'dedup-known.json');
const known = fs.existsSync(KNOWN) ? JSON.parse(fs.readFileSync(KNOWN, 'utf8')).known : [];
const knownKey = new Set(known.map(k => strip(k.artist) + '|' + strip(k.album)));
const seen = new Map();
const dup = [];
const skipped = [];
const dupKnown = [];
let fromProp = 0;
for (const b of batches) {
  const got = rowsOf(b);
  if (!got) { console.log(`${b}：查無卡單也查無 prop，略過`); continue; }
  if (got.src === 'prop') fromProp++;
  for (const c of got.rows) {
    // 2026-09-14（c-130 a 組抓到）：三批並行時，某一組正在覆寫自己的 prop 檔，
    // 這裡就會讀到半寫入的陣列——空洞是 null、或是只有部分欄位的物件。
    // 從前這會讓 `strip(c.artist)` 直接炸掉，或把多筆壓成同一個 `'|'` 鍵而報成撞卡，
    // **於是所有並行批次的 chk-prop 會一起紅，看起來像真的撞卡**。
    // 跳過但要出聲：靜靜略過會把真正壞掉的資料也一起藏起來。
    if (!c || typeof c !== 'object' || (!c.artist && !c.album)) { skipped.push(b); continue; }
    const k = strip(c.artist) + '|' + strip(c.album);
    if (seen.has(k)) (knownKey.has(k) ? dupKnown : dup).push({ b, c, prev: seen.get(k) });
    else seen.set(k, { b, c });
  }
}
// 2026-09-15（c-132 a 組抓到）：**同一張碟被兩個掛名字串各收一次，鍵比對永遠抓不到**。
// 實例：池中 `菊地雅章《End for the Beginning》` 與 `Masabumi Kikuchi Quintet《End For The Beginning》`
// 是同一張 1973 Philips FX-8527、同一個 release-group。折疊鍵是掛名＋盤名，所以兩筆各自成立。
// 這裡改用 rgMbid 再掃一次（卡單有 `rgMbid`，prop 取 `mbNote` 裡第一個 UUID）。
// **只報不擋**：重複建檔的 RG 與「同碟兩卡」在資料上長得一樣，要人看過才算數。
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
const byMbid = new Map();
const dupMbid = [];
for (const [, v] of seen) {
  const c = v.c;
  const id = (c.rgMbid && UUID.test(c.rgMbid)) ? c.rgMbid.toLowerCase()
    : (String(c.mbNote || '').match(UUID) || [])[0]?.toLowerCase();
  if (!id) continue;
  if (byMbid.has(id)) dupMbid.push({ ...v, prev: byMbid.get(id), id });
  else byMbid.set(id, v);
}
for (const d of dupMbid)
  console.log(`⚠ 同 rgMbid 不同掛名：${d.b} ${d.c.artist}《${d.c.album}》 ←→ ${d.prev.b} ${d.prev.c.artist}《${d.prev.c.album}》（${d.id}）`);

// 2026-09-18（c-148 b 組第 936 條）：**上面兩道都是「鍵相等」或「rgMbid 相等」，
// 對「同一張碟被寫成兩個不同盤名字串」完全無感**。c-148 b 那批 `chk-prop` 標記 0，
// 實際卻有四筆撞到已在池中或已進卡單的碟——
// 《State of the Tenor Vol. 1》對上 seed 裡寫法不同的同一張、
// 《Cafe Bohemia Vol. I》對上 seed 的 BLP 1524、
// 《The Song of Singing》對上 c-143 卡單（MB 為同一張碟建了兩個 RG，rgMbid 也不同）。
// 這裡補第三道：**同一個掛名底下，兩個盤名的實詞互相包含就報**。
// 只報不擋，而且**只看還在策展中的批次（prop 來源）那一側**——
// 已定稿的卡單彼此比對會把 Vol. 1／Vol. 2 這類正常系列整批印出來，淹掉真的。
// 第一版用「盤名互為子字串」，對真正的案例無效：
// seed 是《'Round About Midnight at the Cafe Bohemia》、提案是《Cafe Bohemia Vol. I》，
// 剝完標點後 `cafebohemiavoli` 不是前者的子字串（卡在 `voli` 那個尾巴）。
// 改成**詞元包含**：短的那個盤名的「實詞」若全都出現在長的那個裡面就報。
// 實詞＝長度 ≥4 的詞，**扣掉卷次詞與序數**（vol／volume／part／one…、純數字與羅馬數字）
// ——正是這些尾巴讓字串比對失效的。至少要有兩個實詞才報，否則同掛名同主題的碟會整片亮。
const STOP = new Set(['vol', 'volume', 'part', 'pt', 'live', 'the', 'and', 'with', 'complete',
  'one', 'two', 'three', 'four', 'five', 'first', 'second', 'third', 'sessions', 'session']);
const ROMAN = /^[ivxlcdm]+$/;
const tokens = s => String(s || '')
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().split(/[^\p{L}\p{N}]+/u)
  .filter(w => w && !STOP.has(w) && !/^\d+$/.test(w) && !ROMAN.test(w) && Array.from(w).length >= 4);
const liveRows = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'seed_cards.json'), 'utf8'))
    .map(r => ({ artist: r[0], album: r[1], b: '線上池' })); } catch { return []; }
})();
const propSide = [...seen.values()].filter(v => propBatches.includes(v.b) && !cardBatches.includes(v.b))
  .map(v => ({ artist: v.c.artist, album: v.c.album, b: v.b }));
const otherSide = [...[...seen.values()].map(v => ({ artist: v.c.artist, album: v.c.album, b: v.b })), ...liveRows];
const byArtist = new Map();
for (const r of otherSide) {
  const a = strip(r.artist);
  if (!a) continue;
  if (!byArtist.has(a)) byArtist.set(a, []);
  byArtist.get(a).push(r);
}
const subHits = [];
for (const r of propSide) {
  const a = strip(r.artist), t = strip(r.album), tt = tokens(r.album);
  if (tt.length < 2) continue;
  for (const o of byArtist.get(a) || []) {
    const u = strip(o.album);
    if (!u || u === t) continue;                 // 完全相等的那道上面已經報過
    const ut = tokens(o.album);
    if (ut.length < 2) continue;
    const [short, long] = tt.length <= ut.length ? [tt, ut] : [ut, tt];
    if (short.every(w => long.includes(w)))
      subHits.push(`⚠ 同掛名盤名詞元包含（只報不擋）：${r.b} ${r.artist}《${r.album}》 ←→ ${o.b} ${o.artist}《${o.album}》`);
  }
}

// 2026-09-18（c-154 a 抓到，主線補第四道）：**前三道都抓不到「同一張碟、掛名字串不同、MB 又建了兩個 RG」**。
// 實例：c-154 a 的 `Jimmy Smith Trio featuring Kenny Burrell《The Master II》` 與 c-152 的
// `Jimmy Smith《The Master II》`——**六軌逐字相同、同 catno `7243 8 55466 2`**，
// 但掛名字串不同（鍵比對過）、rgMbid 不同（第二道過）、盤名相同所以詞元包含那道也只會報一筆偽陽性。
// **策展層是用 Discogs catno 反查才抓到的。** 這裡把它變成機器檢查：**從 `label` 抽目錄號，共用就報**。
// 只報不擋，一樣只看還在策展中的批次那一側。
const COUNTRYDATE = /^[A-Z]{0,5}(19|20)\d{2}(\d{2}(\d{2})?)?$/;   // 國別碼＋日期，不是目錄號
const NOTCAT = /^(MB|BC|RG|ISBN|UPC|EAN)/;
// 2026-09-19（c-166 a 抓到，主線第 1760-B 條）：**美國郵遞區號會被當成目錄號。**
// Blue Note 版權行的地址 `Hollywood, CA 90028` 逐字出現在多張卡的 `label` 欄，
// 被字母前綴型那條抓成 `CA90028`，於是「共用目錄號」報出四張毫無關係的卡
// （c162 Derrick Hodge／c165 Immanuel Wilkins／c166 ARTEMIS／c166 Norah Jones）。
// **先把「兩個大寫字母＋五位數（可帶 -四位）」整段剝掉再抽**——真正的目錄號前綴
// 幾乎都不是恰好兩碼字母配恰好五位數字，而美國地址一定是這個形狀。
const ZIP = /\b[A-Z]{2}\s?\d{5}(-\d{4})?\b/g;
const catnos = s => {
  const out = new Set();
  const txt = String(s || '').replace(ZIP, ' ');
  // 字母前綴型：CDP 7 84353 2、BLP 1595、TOCJ-5526、B1-92894、BNJ-61013、LT-1089
  for (const m of txt.matchAll(/\b([A-Z]{1,5})[\s-]?(\d[\d\s-]{2,14}\d)\b/g)) {
    const tok = (m[1] + m[2]).replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (tok.length >= 6 && !NOTCAT.test(tok) && !COUNTRYDATE.test(tok)) out.add(tok);
  }
  // EMI／Capitol 數字型：7243 8 55466 2、0946 3 …、00602 …
  for (const m of txt.matchAll(/\b(7243|72435|0946|00602)\s+\d[\d\s]{4,14}\d\b/g))
    out.add(m[0].replace(/\s+/g, ''));
  return [...out];
};
const labelOf = c => c.label || c.mbNote || '';
const catIndex = new Map();
for (const v of seen.values())
  for (const c of catnos(labelOf(v.c))) {
    if (!catIndex.has(c)) catIndex.set(c, []);
    catIndex.get(c).push(v);
  }
const catHits = [];
for (const [cat, list] of catIndex) {
  const uniq = [...new Map(list.map(x => [strip(x.c.artist) + '|' + strip(x.c.album), x])).values()];
  if (uniq.length < 2) continue;
  // 只在其中一側還在策展中時才報（已定稿的卡單彼此共用目錄號多半是 Volume 1／2 的雙片 CD，是正常的）
  if (!uniq.some(x => propBatches.includes(x.b) && !cardBatches.includes(x.b))) continue;
  catHits.push(`⚠ 共用目錄號 ${cat}（只報不擋）：` +
    uniq.map(x => `${x.b} ${x.c.artist}《${x.c.album}》`).join('  ←→  '));
}
for (const line of [...new Set(catHits)]) console.log(line);

for (const line of [...new Set(subHits)]) console.log(line);

for (const d of dupKnown)
  console.log(`（已知，本機已擋：${d.b} ${d.c.artist}《${d.c.album}》 ←→ ${d.prev.b}；待本機標記後從 dedup-known.json 移除）`);
for (const d of dup)
  console.log(`⚠ ${d.b} ${d.c.artist}《${d.c.album}》${d.c.year}  ←→  ${d.prev.b} ${d.prev.c.artist}《${d.prev.c.album}》${d.prev.c.year}`);
if (skipped.length) {
  const byBatch = [...new Set(skipped)].map(b => `${b}×${skipped.filter(x => x === b).length}`).join('、');
  console.log(`\n⚠ 略過 ${skipped.length} 筆空洞或缺掛名／盤名的列（${byBatch}）——`);
  console.log(`  若該批正在被策展代理覆寫，這是併行寫入的半成品，重跑一次即可；`);
  console.log(`  若沒有代理在跑，那就是 prop 檔真的壞了，要去看。`);
}
console.log(`\n${batches.length} 批（其中 ${fromProp} 批讀 prop）｜卡數 ${seen.size + dup.length}｜跨批撞卡 ${dup.length}｜同 rgMbid 不同掛名 ${dupMbid.length}｜同掛名盤名詞元包含 ${new Set(subHits).size}｜共用目錄號 ${new Set(catHits).size}（後三項只報不擋）`);
process.exit(dup.length ? 1 : 0);
