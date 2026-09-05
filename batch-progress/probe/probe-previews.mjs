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

import { norm, SUFFIX, titleOk, artistOk, hasNonLatin, translit, DECO, canon, looseTitleOk, looseArtistOk, termsFor } from './match-lib.mjs';
// 比對規則已抽到 match-lib.mjs（裁定第 90 條），改規則請先跑 test-match.mjs。
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
// c-63 深掘民謠與藍調：英國民謠復振與美國 old-time／藍調為兩大宗，
// 再加愛爾蘭與伊比利、拉美 nueva canción 的發行國。依裁定第 75 條照發行國排。
const FOLKB = ['gb', 'us', 'ie', 'pt', 'es', 'uy', 'cl', 'ca', 'fr', 'de'];
// c-64 柬埔寨與越南：本地 storefront 先試（kh／vn），再發權多在美國考古廠牌
// （Dust-to-Digital、Sublime Frequencies）與法國（前殖民地的檔案），最後才是海外華越社群所在的 au／ca。
// 依第 75 條：storefront 賣的是發行權涵蓋的地區，不是聽眾在哪裡，所以移民市場放最後。
const INDOCH = ['kh', 'vn', 'us', 'fr', 'gb', 'th', 'sg', 'au', 'ca'];
// c-65 深掘電子與實驗：私壓電子與圖書館音樂的再發權多在英美（Trunk、Finders Keepers、
// Dark Entries、RVNG、Music From Memory 在荷）與法德（INA-GRM、Bureau B），日本盤在
// 環境／電子再發史上份量重（Light in the Attic 的 Kankyō 系列反而是美國發行）。
const ELEC = ['us', 'gb', 'de', 'fr', 'nl', 'jp', 'it', 'be', 'ca'];
// c-66 印度：本地 storefront 先試（in），Saregama／HMV India 的目錄在 in 最全；
// 再發權在英美（Finders Keepers、Bombay Connection、Light in the Attic）與英國的南亞社群發行；
// 古典線的 ECM／Navras／Nimbus 在 gb／de。依第 75 條，移民市場（gb／ca／ae）放在發行權之後。
const INDIA = ['in', 'us', 'gb', 'de', 'fr', 'ca', 'ae', 'sg', 'au'];
// c-67 起的日／英／美廠牌線（2026-09-03）：本國 storefront 先試，再發權常落在另外兩國
// （日本自主爵士的再發在英國 BBE、美國 Light in the Attic；英國 DIY 的再發在美國 Superior Viaduct；
// 美國私壓的再發在英國 Finders Keepers 等），所以三國互為第二順位，其後才是德法加澳。
const JPN = ['jp', 'us', 'gb', 'de', 'fr', 'ca', 'au'];
const UKB = ['gb', 'us', 'jp', 'de', 'fr', 'ie', 'ca', 'au'];
const USB = ['us', 'gb', 'jp', 'ca', 'de', 'fr', 'au'];
// c-88 電影原聲補遺（2026-09-04）：原聲帶的發行權跟著**電影的製片國**走，不是跟著作曲家。
// 好萊塢大片在 us；歐洲作者電影的原盤在 it／fr／de（Morricone、Rota、Delerue、Legrand 的
// 原廠目錄至今仍由義法的廠牌持有）；日本電影在 jp（且 MB／Apple 的日本原聲覆蓋率明顯偏低）；
// 蘇聯與東歐在 ru／pl。gb 放在 us 之後是因為大量歐洲片的英語版發行權落在英國。
const OST = ['us', 'gb', 'it', 'fr', 'de', 'jp', 'ru', 'pl', 'es', 'ca', 'au'];
// 台灣線（c-89～c-92）。第 158 條：用原文盤名去搜當地店面，tw 排第一。
// hk／sg／my 是華語發行權常見的鄰接市場。
// **cn 原本排在 my 後面**，理由是 c-89 策展層回報伍佰有五張在 MB 上是簡體建檔
// （诗情摇滚、单程车票、无尽闪亮的哀愁、让水倒流、纯白的起点），推測 Apple 條目
// 也可能落在簡體市場。**2026-09-05 實測推翻**：台灣線 143 張、61 個試聽命中，
// **cn 零命中**（tw 51、hk 7、jp 2、us 1、sg 1）——那五張在 Apple 上仍是繁體、落在 tw。
// **MB 的建檔語言不預測 Apple 的上架市場。** cn 移到最後，不刪（往後的中國搖滾線要用）。
const TWN = ['tw', 'hk', 'sg', 'my', 'us', 'jp', 'gb', 'cn'];
const LINE_FRONTS = { c67: JPN, c68: UKB, c69: USB, c70: JPN, c71: UKB, c72: USB, c73: JPN, c74: UKB, c75: USB,
  c76: JPN, c77: UKB, c78: USB, c79: JPN, c80: UKB, c81: USB, c82: JPN, c83: UKB, c84: USB, c85: UKB, c86: USB,
  c87: JPN, c88: OST,
  c89: TWN, c90: TWN, c91: TWN, c92: TWN };

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
      : b.startsWith('c62') ? GRC
      : b.startsWith('c63') ? FOLKB
      : b.startsWith('c64') ? INDOCH
      : b.startsWith('c65') ? ELEC
      : b.startsWith('c66') ? INDIA
      : LINE_FRONTS[b.slice(0, 3)] || GEN });

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


let n = 0;
for (const c of cards) {
  const k = `${c.artist}|${c.album}`;
  if (out[k] && !out[k]._err) { n++; continue; }
  const rec = { batch: c.batch, tried: [] };

  const terms = termsFor(c);
  let fallback = null;                                   // 配到碟但該 storefront 無試聽時的保底
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
        (albumCands.some(a => titleOk(a, r.collectionName || '', !!c.selfTitled)) ||
         looseTitleOk(c.album, r.collectionName || '', !!c.selfTitled)) &&
        (artistCands.some(a => artistOk(a, r.artistName || '')) ||
         looseArtistOk(c.artist, r.artistName || '')));
      // 年份不再當門檻（裁定第 77 條）：Apple 記的常是數位重製日不是原盤年。
      // 主閘是藝人＋盤名的粗形比對；年份只用來排序與標記。
      if (hits.length) break;                           // 命中就不再試下一種寫法
    }
    rec.tried.push(`${front}:${raw}→${hits.length}`);
    if (!hits.length) continue;

    // 排序：年份接近的優先（不是門檻，只是偏好），再來 explicit 優先。
    const drift = x => (c.year ? Math.abs(Number(String(x.releaseDate || '').slice(0, 4)) - c.year) : 0);
    const rank = x => ({ explicit: 0, notExplicit: 1, cleaned: 2 }[x?.collectionExplicitness] ?? 1);
    hits.sort((x, y) => (drift(x) - drift(y)) || (rank(x) - rank(y)));
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
    // 年份漂移：Apple 的日期與卡片差超過 3 年就標記交人工看，但不擋。
    // 標題自己寫著再發字樣的（remaster／anniversary／deluxe／edition）視為再發，年份不計。
    const isReissue = DECO.test(best.collectionName || '');
    DECO.lastIndex = 0;                                 // 全域旗標的正規式要自己歸零
    const yd = c.year ? Math.abs(Number(rec.appleYear) - c.year) : 0;
    if (yd > 3) { rec.yearDrift = yd; rec.reissueTitle = isReissue; }
    rec.status = rec.previewUrl ? 'ready' : 'no-preview';
    // 同一張碟在不同 storefront 的試聽授權不一樣（2026-09-02，c-53 實測）：
    // Матвеева《Какой большой ветер》的 collectionId 1509982713 在 de 有 .m4a、在 us 沒有。
    // 所以配對成功但拿不到試聽時，不要停——把它記下來當保底，繼續試剩下的 storefront。
    if (rec.status === 'ready') break;
    fallback = fallback || { ...rec };
    rec.front = undefined; rec.status = undefined;      // 讓下一輪重新填
  }
  if (!rec.status && fallback) Object.assign(rec, fallback);
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
