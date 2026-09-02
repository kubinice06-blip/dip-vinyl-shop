// c-51 與 c-SEA 共 254 張的固定試聽探測（Apple）。
// 用法：node batch-progress/probe/probe-previews.mjs [批名...]（省略＝全部七批）
//
// `ALBUM_ONBOARDING.md` §6 的要求，這支逐條照做：
//
// 1. **必須同時核對藝人、專輯與版本**，不可為了提高命中率接受疑似配對。
//    這裡的採用門檻：專輯標題摺疊後完全相同、或長度差 ≤8 的包含關係；
//    掛名摺疊後互相包含；發行年差 ≤3。三項全過才算 ready。
// 2. **必須核對 `collectionExplicitness`**（2026-08-23 增列）。同一張碟在 Apple
//    常有同名、同曲數、曲序也一致的雙胞胎，一筆 explicit、一筆 cleaned（消音版），
//    只看名字分不出來。淨化版屬不同版本，**一律優先取 explicit**；整份目錄
//    只有淨化版才收，並標記讓本機看得到。`notExplicit` 是「本來就沒有不雅內容」，
//    不是問題。
// 3. 只收 Apple 的 .m4a 直連（靜態路徑 `apple-audio-map-v1.json` 只認這個）。
//
// **多國 storefront**：c-SEA 這批的印尼、菲律賓、泰國、越南、馬來西亞盤在
// 美國目錄裡多半不存在，只在當地 storefront 上架。ctw3 那次的教訓是只試一種
// 寫法會誤判成「目錄裡沒有」；同理只試一個 storefront 會誤判成「Apple 沒有」。
// 所以逐張把卡片所屬區域的 storefront 排在前面試。
//
// 雲端只產出探測結果，不寫 apple-audio-map-v1.json、不碰 album_overrides
// （REMOTE_RUNBOOK）。本機拿這份檔決定 ready／unavailable。
import fs from 'node:fs';
import path from 'node:path';
import { fold, ROOT } from '../lib.mjs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const DIR = path.join(ROOT, 'batch-progress/probe');
const BATCHES = process.argv.slice(2).length ? process.argv.slice(2)
  : ['c51a', 'c51b', 'c51c', 'c51d', 'cseaa', 'cseab', 'cseac'];

const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
// c-SEA 三批先試在地目錄再回退國際；c-51 是西方與東亞盤，us 命中率最高。
const SEA = ['id', 'ph', 'th', 'vn', 'my', 'sg', 'us', 'gb', 'jp'];
const GEN = ['us', 'gb', 'jp', 'tw', 'de', 'fr'];
// c-53 蘇聯／俄語圈：Apple 2022 年退出俄國市場，ru 不存在。抽驗時命中的四張都在 us，
// 代表這些錄音有國際數位發行；另補後蘇聯各國與 Leo Records 的歐洲市場。
const SOV = ['us', 'gb', 'de', 'lt', 'ee', 'lv', 'kz', 'am', 'fr'];
// c-54 南斯拉夫：先試各繼承國，再回退到德奧（大量前南移民市場）與國際。
const YUG = ['hr', 'si', 'rs', 'ba', 'mk', 'de', 'at', 'us', 'gb'];
// c-55 土耳其與阿拉伯世界：先試土耳其與海灣各國，再回退歐美。
const TRAB = ['tr', 'ae', 'sa', 'eg', 'lb', 'ma', 'dz', 'de', 'fr', 'us', 'gb'];
// c-56 中東歐：各繼承國 ＋ 德奧（大量移民市場）＋ 國際。
const CEU = ['cz', 'sk', 'hu', 'pl', 'ro', 'bg', 'de', 'at', 'us', 'gb'];
// c-57 牙買加：牙買加自身 ＋ 英國（Trojan／Island 的主場）＋ 美加。
const JAM = ['jm', 'gb', 'us', 'ca', 'de', 'jp'];
// c-58／c-59 深掘線：歐美原盤為主，日本盤在爵士與放克的再發史上份量很重。
const DIG = ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'br'];
// c-60 深掘搖滾與迷幻：北美私壓的再發多由美國考古廠牌操刀（us／ca），
// 歐陸地下走 gb／de／fr／it／se／nl，日本 underground 走 jp。
const PSY = ['us', 'ca', 'gb', 'de', 'fr', 'it', 'se', 'nl', 'jp'];
// c-61 深掘搖滾迷幻續批：義法地下 prog ＋ 北歐 progg ＋ 荷比澳紐。
// 先試各國本地，日本盤在 prog 的再發史上份量很重（Arcàngelo、Belle Antique、Strange Days）。
const EUR = ['it', 'fr', 'se', 'dk', 'no', 'fi', 'is', 'nl', 'be', 'au', 'nz', 'jp', 'de', 'gb', 'us'];
// c-62 希臘：先試希臘與賽普勒斯，再回退德澳（大量希臘移民市場）與國際。
const GRC = ['gr', 'cy', 'de', 'au', 'us', 'gb', 'ca', 'se'];

const cards = [];
for (const b of BATCHES)
  for (const c of JSON.parse(fs.readFileSync(path.join(ROOT, `desc-tools/batches/cards/${b}-cards.json`), 'utf8')))
    // c52 是 c-SEA 的收尾批（印尼／泰／越／菲／星馬），同樣要先試在地 storefront
    cards.push({ ...c, batch: b, fronts:
      (b.startsWith('csea') || b.startsWith('c52')) ? SEA
      : b.startsWith('c53') ? SOV
      : b.startsWith('c54') ? YUG
      : b.startsWith('c55') ? TRAB
      : b.startsWith('c56') ? CEU
      : b.startsWith('c57') ? JAM
      : (b.startsWith('c58') || b.startsWith('c59')) ? DIG
      : b.startsWith('c60') ? PSY
      : b.startsWith('c61') ? EUR
      : b.startsWith('c62') ? GRC : GEN });

// 預設沿用共用的 previews.json；跑收尾批時用 PREVIEWS_OUT 指到另一個檔，
// 免得覆寫本機已經取用過的那份。
// 預設寫進「該批自己的」previews.json，不再落到 probe/ 底下的共用累積檔。
// 2026-09-02：c-60 那次沒帶 PREVIEWS_OUT，49 筆就直接混進了共用檔
// （該檔的基準內容只有 c51 與 c-SEA），事後得手動挑出來再還原。
// 單批執行時預設就該落在 batch-progress/<批>/previews.json；
// 一次跑多批或要匯總時再用 PREVIEWS_OUT 指定。
const OUT = process.env.PREVIEWS_OUT ? path.resolve(process.env.PREVIEWS_OUT)
  : BATCHES.length === 1 ? path.join(ROOT, `batch-progress/${BATCHES[0]}/previews.json`)
  : path.join(DIR, 'previews.json');
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

const get = async url => {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!r.ok) return { _http: r.status };
    return await r.json();
  } catch (e) { return { _err: String(e.name || e).slice(0, 30) }; }
};

// 標題與掛名的比對。寬鬆到能吃掉副標與掛名後綴，嚴格到不會配到同名的別張。
// Apple 會把單曲與 EP 的條目標成「某某 - Single」「某某 - EP」。摺疊後那個後綴
// 只多出 6–7 個字元，剛好落在下面的長度差容忍範圍內，於是**單曲條目會冒充專輯**。
// 2026-08-31 實測抓到兩筆：Elvy Sukaesih《Menghitung Bintang》配到一軌的單曲、
// f(x)《4 Walls》配到四軌的日本 EP《4 Walls / COWBOY - EP》而不是十一軌的正規盤。
// 卡片本身若就是 EP（§5.5 的 asia-mini-album 白名單）則卡名自己也會帶那個字，
// 所以比對的是「Apple 有、卡片沒有」才擋。
const SUFFIX = /[-–—]\s*(Single|EP)\s*$/i;
const titleOk = (want, got) => {
  if (SUFFIX.test(got) && !SUFFIX.test(want)) return false;
  const a = norm(want), b = norm(got);
  if (a === b) return true;
  return (a.includes(b) || b.includes(a)) && Math.abs(a.length - b.length) <= 8;
};
const artistOk = (want, got) => {
  const a = norm(want), b = norm(got);
  return a === b || a.includes(b) || b.includes(a);
};

// 非拉丁文字的搜尋回退（2026-09-02，c-62 希臘批發現）。
// 卡片的掛名與盤名依裁定第 6、70 條用原文字，MB 要的正是原文字；
// 但 Apple 反過來只認羅馬轉寫——c-62 用原文字查只中 4/38，
// 策展層自己用轉寫查是 17/38。這個轉寫**只用於查詢、不寫進任何資料**，
// 所以不違反裁定第 26 條（別名只填外部服務認得的字串、不自創）。
const GR = { α:'a', β:'v', γ:'g', δ:'d', ε:'e', ζ:'z', η:'i', θ:'th', ι:'i', κ:'k', λ:'l',
  μ:'m', ν:'n', ξ:'x', ο:'o', π:'p', ρ:'r', σ:'s', ς:'s', τ:'t', υ:'y', φ:'f', χ:'ch',
  ψ:'ps', ω:'o', ά:'a', έ:'e', ή:'i', ί:'i', ό:'o', ύ:'y', ώ:'o', ϊ:'i', ϋ:'y', ΐ:'i', ΰ:'y' };
const CY = { а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'e', ж:'zh', з:'z', и:'i', й:'y',
  к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'kh',
  ц:'ts', ч:'ch', ш:'sh', щ:'shch', ъ:'', ы:'y', ь:'', э:'e', ю:'yu', я:'ya', і:'i', ї:'yi', є:'ye', ґ:'g' };
const hasNonLatin = s => /[\u0370-\u03ff\u1f00-\u1fff\u0400-\u04ff]/.test(String(s || ''));
const translit = s => Array.from(String(s || '')).map(ch => {
  const lo = ch.toLowerCase();
  const t = GR[lo] ?? CY[lo];
  if (t === undefined) return ch;
  return ch === lo ? t : (t.charAt(0).toUpperCase() + t.slice(1));
}).join('');

// 一張卡要試的查詢字串，依序：原文 → 別名＋原盤名 → 全轉寫。重複的去掉。
function termsFor(c) {
  const list = [`${c.artist} ${c.album}`];
  if (c.queryAlias) list.push(`${c.queryAlias} ${c.album}`);
  if (hasNonLatin(c.artist) || hasNonLatin(c.album))
    list.push(`${c.queryAlias || translit(c.artist)} ${translit(c.album)}`);
  return [...new Set(list.map(x => x.trim()).filter(Boolean))];
}

let n = 0;
for (const c of cards) {
  const k = `${c.artist}|${c.album}`;
  if (out[k] && !out[k]._err) { n++; continue; }
  const rec = { batch: c.batch, tried: [] };

  const terms = termsFor(c);
  for (const front of c.fronts) {
    // 比對用的候選名：原文與轉寫都算數，否則轉寫查到了也會被 titleOk 擋掉。
    const albumCands = [c.album, translit(c.album)];
    const artistCands = [c.artist, c.queryAlias, translit(c.artist)].filter(Boolean);
    let hits = [];
    let raw = 0;
    for (const term of terms) {
      const j = await get(`https://itunes.apple.com/search?term=${
        encodeURIComponent(term)}&entity=album&country=${front}&limit=12`);
      await sleep(700);                                 // Apple 沒公告限制，保守節流
      if (j._http || j._err) { rec.tried.push(`${front}:${j._http || j._err}`); continue; }
      raw = (j.results || []).length;
      hits = (j.results || []).filter(r =>
        albumCands.some(a => titleOk(a, r.collectionName || '')) &&
        artistCands.some(a => artistOk(a, r.artistName || '')) &&
        (!c.year || Math.abs(Number(String(r.releaseDate || '').slice(0, 4)) - c.year) <= 3));
      if (hits.length) break;                           // 命中就不再試下一種寫法
    }
    rec.tried.push(`${front}:${raw}→${hits.length}`);
    if (!hits.length) continue;

    // 同名雙胞胎：explicit 優先，其次 notExplicit，最後才 cleaned。
    const rank = x => ({ explicit: 0, notExplicit: 1, cleaned: 2 }[x?.collectionExplicitness] ?? 1);
    hits.sort((x, y) => rank(x) - rank(y));
    const best = hits[0];

    const lk = await get(`https://itunes.apple.com/lookup?id=${best.collectionId}&entity=song&country=${front}&limit=60`);
    await sleep(700);
    const prev = (lk.results || []).find(x => x.wrapperType === 'track' && /\.m4a(\?|$)/.test(x.previewUrl || ''));
    rec.front = front;
    rec.collectionId = best.collectionId;
    rec.appleTitle = best.collectionName;
    rec.appleArtist = best.artistName;
    rec.appleYear = String(best.releaseDate || '').slice(0, 4);
    rec.explicitness = best.collectionExplicitness;
    rec.trackCount = best.trackCount;
    rec.previewUrl = prev?.previewUrl || null;
    // 整份候選只剩淨化版時要讓本機看得到，§6 明訂「可收但要在備註寫明」。
    rec.cleanedOnly = hits.every(x => x.collectionExplicitness === 'cleaned');
    rec.status = rec.previewUrl ? 'ready' : 'no-preview';
    break;
  }
  if (!rec.status) rec.status = 'unavailable';
  out[k] = rec;
  n++;
  const m = rec.status === 'ready' ? '✓' : rec.status === 'no-preview' ? '~' : '✗';
  console.log(`${m} [${c.batch}] ${c.artist}《${c.album}》${
    rec.front ? ` ${rec.front} ${rec.explicitness}${rec.cleanedOnly ? '(只有淨化版)' : ''} ${rec.appleYear}` : ' 各 storefront 皆無'}`);
  if (n % 10 === 0) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const v = Object.values(out);
console.log(`\n共 ${cards.length} 張｜ready ${v.filter(x => x.status === 'ready').length}｜有碟無預覽 ${
  v.filter(x => x.status === 'no-preview').length}｜unavailable ${v.filter(x => x.status === 'unavailable').length}｜只有淨化版 ${
  v.filter(x => x.cleanedOnly).length}`);
