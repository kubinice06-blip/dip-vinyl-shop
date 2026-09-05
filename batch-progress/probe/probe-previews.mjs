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
// c-93～c-102（2026-09-05，A 線目錄深度第二輪 ＋ 遊戲／動畫原聲）。
// 這十批是**廣度線**：補的是已經在池裡的正典藝人，發行權絕大多數在英美，
// 所以預設就是 USB／UKB，只有三批要改：
// - 戰前藍調與爵士（c-95）：整編輯的發行權幾乎全在美國（Columbia／Yazoo／Document／Sony Legacy），
//   但 Django 與 Bechet 的原廠目錄在法國、Ayler 的在丹麥／瑞典 → us 之後補 fr／dk／se。
// - 世界音樂（c-99）：非洲、加勒比、中東、南亞、拉美各有本國市場，
//   再發權則落在英美法（Analog Africa、Soundway、Strut、Ostinato、Sublime Frequencies）。
// - 遊戲／動畫原聲（c-101／c-102）：**jp 排第一**，日本原聲的 Apple 覆蓋率在 jp 明顯高於 us；
//   西方獨立遊戲（Undertale、Celeste、Hades、Minecraft）則落在 us，所以 jp→us 兩強並列。
const BLU = ['us', 'gb', 'fr', 'dk', 'se', 'de', 'nl', 'jp', 'ca', 'au'];
// 2026-09-05：`cu` 每一次都回 HTTP 400——**Apple 沒有古巴店面**（c-99 策展層實測 16 個店面時發現）。
// 留著只會讓每張卡多花一次退避重試，且 400 不在重試白名單裡、會直接記成 `cu:400` 污染 `tried`。移除。
const WLD = ['us', 'gb', 'fr', 'ng', 'za', 'ci', 'sn', 'jm', 'eg', 'in', 'mx', 'co', 'br', 'de', 'ca'];
const GAME = ['jp', 'us', 'gb', 'de', 'fr', 'ca', 'au'];
const LINE_FRONTS = { c67: JPN, c68: UKB, c69: USB, c70: JPN, c71: UKB, c72: USB, c73: JPN, c74: UKB, c75: USB,
  c76: JPN, c77: UKB, c78: USB, c79: JPN, c80: UKB, c81: USB, c82: JPN, c83: UKB, c84: USB, c85: UKB, c86: USB,
  c87: JPN, c88: OST,
  c89: TWN, c90: TWN, c91: TWN, c92: TWN,
  c93: UKB, c94: USB, c95: BLU, c96: USB, c97: UKB, c98: USB, c99: WLD, c100: UKB, c101: GAME, c102: GAME };

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
      // 2026-09-05：原本寫死 `b.slice(0, 3)`，**批號進到三位數（c-100 起）就會被截成 `c10`**，
      // 十批裡有三批（c-100／c-101／c-102）會一起掉進同一個不存在的鍵、靜默退回 GEN。
      // 改成抓開頭的 `c` 加全部數字。
      : LINE_FRONTS[(String(b).match(/^c\d+/) || [])[0]] || GEN });

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

// 2026-09-05：原本這裡一次都不重試——403／429 回來就放棄那個查詢字串。
// Apple 對連續請求會限流，而本腳本一跑就是上百張 × 八個店面 × 兩種寫法；
// 台灣線那一輪 63 張 unavailable 裡，**19 張每個店面的每個字串都被限流擋掉、
// 20 張有店面全被擋**，卻全部記成乾淨的「查到 0 筆」。
// 裁定第 28／98 條講的就是這件事：查詢失敗不是查無。加退避重試。
const get = async (url, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (r.ok) return await r.json();
      // 403／429 是限流、5xx 是暫時性——都退避重來；4xx 的其他碼才是真的請求有問題
      if (r.status === 403 || r.status === 429 || r.status >= 500) {
        await new Promise(res => setTimeout(res, 1500 * (i + 1) * (i + 1)));
        continue;
      }
      return { _http: r.status };
    } catch (e) {
      const name = String(e.name || e).slice(0, 30);
      if (i === tries - 1) return { _err: name };
      await new Promise(res => setTimeout(res, 1500 * (i + 1) * (i + 1)));
    }
  }
  return { _http: 'ratelimited-after-retries' };
};


// ── 2026-09-05：Apple 的 `search` 端點對嘻哈盤會系統性地騙人 ─────────────────
// c-96 策展層回報「十筆有九筆只回 cleaned」，主線用四張實測複驗，結果比回報的還糟：
//   N.W.A《Straight Outta Compton》 search 只有 cleaned（id 1478946356）；
//     藝人頁 lookup 有同 13 軌的 explicit（id 1440816032）。
//   JAY-Z《The Blueprint》 同形，search 三張 Blueprint 全是 cleaned，藝人頁三張都有 explicit。
//   **GZA《Liquid Swords》 search 根本查不到**——回的是《Legend of the Liquid Sword》，
//     是另一張碟；藝人頁上《Liquid Swords》(13 軌 explicit) 好端端地在。
//   The Notorious B.I.G.《Life After Death》 search 的前幾筆全是別的藝人的同名碟。
// 這正是 `audits/cleaned-previews-hiphop.md` 那 273 張的成因：
// **管線一路走 search，就會系統性地取到淨化版，或整張碟判成查無。**
// 兩道補救都走藝人頁 `lookup?id=<artistId>&entity=album`：
//   (1) 選到 cleaned 時，回藝人頁找同名同軌數的 explicit 雙胞胎；
//   (2) search 完全落空時，回藝人頁把整份目錄撈下來再比一次盤名。
const artistAlbumCache = new Map();
const artistAlbums = async (artistId, front) => {
  const ck = `${artistId}|${front}`;
  if (artistAlbumCache.has(ck)) return artistAlbumCache.get(ck);
  const j = await get(`https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=200&country=${front}`);
  await sleep(700);
  const list = (j.results || []).filter(x => x.wrapperType === 'collection');
  artistAlbumCache.set(ck, list);
  return list;
};
// 找同一張碟的 explicit 雙胞胎：盤名要過 titleOk，軌數要相等（差一軌也不算，
// 差一軌通常是 Deluxe／Expanded 版——那是別的 release，第 140 條）。
const explicitTwin = async (best, front, albumCands, selfTitled) => {
  if (!best.artistId) return null;
  const list = await artistAlbums(best.artistId, front);
  return list.find(x => x.collectionExplicitness === 'explicit'
    && x.collectionId !== best.collectionId
    && x.trackCount === best.trackCount
    && albumCands.some(a => titleOk(a, x.collectionName || '', selfTitled))) || null;
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
    // queryAlias 可能是盤名的別名（見 match-lib 的 termsFor 註解），比對時也要算進候選盤名，
    // 否則字串查到了、titleOk 這一關還是會把它擋掉。
    const albumCands = [c.album, translit(c.album), c.queryAlias].filter(Boolean);
    const artistCands = [c.artist, c.queryAlias, translit(c.artist)].filter(Boolean);
    let hits = [];
    let raw = 0;
    // 2026-09-05：`raw` 的初值 0 會讓「每個 term 都 HTTP 失敗」印成 `front:0→0`，
    // 與「真的查過、回 0 筆」長得一模一樣。台灣線 63 張 unavailable 裡，
    // **19 張每個店面的所有查詢都失敗、20 張有店面全失敗**，全部被記成乾淨的 0 筆。
    // 三個研究層代理各自懷疑過這件事，我拿「最後那個 0→0 才是答案」推翻了三次——
    // 我錯了，那個 0→0 根本不保證有查詢成功過。改成明確記錄有沒有查成。
    let okQueries = 0;
    for (const term of terms) {
      const j = await get(`https://itunes.apple.com/search?term=${
        encodeURIComponent(term)}&entity=album&country=${front}&limit=12`);
      await sleep(700);                                 // Apple 沒公告限制，保守節流
      if (j._http || j._err) { rec.tried.push(`${front}:${j._http || j._err}`); continue; }
      okQueries++;
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
    // `NOQUERY` ＝ 這個店面一次都沒查成，不是查到 0 筆。下游判「查無」時必須排除它。
    rec.tried.push(okQueries ? `${front}:${raw}→${hits.length}` : `${front}:NOQUERY`);

    // search 落空但這個店面確實查成過 → 走藝人頁把整份目錄撈下來再比一次（見上方註解的 GZA 例）。
    // 只在 search 真的有回應時做（`NOQUERY` 代表被限流，那要留給重試而不是換路）。
    if (!hits.length && okQueries) {
      const aj = await get(`https://itunes.apple.com/search?term=${
        encodeURIComponent(c.queryAlias || c.artist)}&entity=musicArtist&country=${front}&limit=8`);
      await sleep(700);
      const artists = (aj.results || []).filter(x =>
        artistCands.some(a => artistOk(a, x.artistName || '')) || looseArtistOk(c.artist, x.artistName || ''));
      for (const a of artists.slice(0, 2)) {
        const list = await artistAlbums(a.artistId, front);
        const found = list.filter(x =>
          albumCands.some(al => titleOk(al, x.collectionName || '', !!c.selfTitled)) ||
          looseTitleOk(c.album, x.collectionName || '', !!c.selfTitled));
        if (found.length) { hits = found; rec.tried.push(`${front}:artistPage→${found.length}`); break; }
      }
    }
    if (!hits.length) continue;

    // 排序：年份接近的優先（不是門檻，只是偏好），再來 explicit 優先。
    const drift = x => (c.year ? Math.abs(Number(String(x.releaseDate || '').slice(0, 4)) - c.year) : 0);
    const rank = x => ({ explicit: 0, notExplicit: 1, cleaned: 2 }[x?.collectionExplicitness] ?? 1);
    hits.sort((x, y) => (drift(x) - drift(y)) || (rank(x) - rank(y)));
    let best = hits[0];
    // 排序後最好的還是 cleaned → 回藝人頁找同名同軌數的 explicit 雙胞胎（見上方註解）。
    if (best?.collectionExplicitness === 'cleaned') {
      const tw = await explicitTwin(best, front, albumCands, !!c.selfTitled);
      if (tw) { rec.explicitTwinRecovered = best.collectionId; best = tw; hits = [tw, ...hits]; }
    }

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
