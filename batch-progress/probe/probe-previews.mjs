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

import { norm, SUFFIX, titleOk, artistOk, hasNonLatin, translit, DECO, canon, looseTitleOk, looseArtistOk, termsFor, aliasParts } from './match-lib.mjs';
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
// c-103～c-118（2026-09-06，規劃書剩下的 16 批）。
// **kr 是這輪第一次用。** c-43 的教訓是「日版單曲會撞進來」，所以 kr 排第一、jp 排第二
// ——jp 留著是因為韓國 80s–90s 的正規盤有一批只在日本再發過。
const KOR = ['kr', 'jp', 'us', 'gb', 'hk', 'tw', 'de', 'au'];
// 中國搖滾：cn 排第一。台灣線實測 cn 零命中（見上面 TWN 的註解），但那批是台語與華語流行，
// **這批的發行權在中國本土**，形狀不同，cn 值得排第一；tw／hk 接著（魔岩是台灣廠牌）。
const CHN = ['cn', 'tw', 'hk', 'us', 'gb', 'jp', 'sg', 'my'];
// 拉丁第二圈。**順序依 c-108 策展層的十店面實測重排**（2026-09-06）：
// 命中分佈是 `pe` 30、`cl` 5、`us` 3，**`co mx ar gb es fr br` 七個店面零首次命中**
// ——原本把 `co` 排第二是照「哥倫比亞 cumbia 的原廠在哥倫比亞」推的，**實測不成立**：
// 哥倫比亞那三張反而落在 cl 與 us。再發權在英美這件事比原產國更能預測 Apple 的上架市場
// （與台灣線那次「MB 的建檔語言不預測 Apple 的上架市場」是同一個教訓）。
const LATAM = ['pe', 'cl', 'us', 'co', 'mx', 'ar', 'es', 'gb', 'fr', 'br'];
// 法語線：fr 第一，be／ch／ca 是法語圈的鄰接市場（Céline Dion 與魁北克那一支在 ca）。
const FRA = ['fr', 'be', 'ch', 'ca', 'us', 'gb', 'de', 'nl'];
// 德義線：一批同時涵蓋德語與義大利語，兩邊都要排前面。
// 2026-09-06：c-110 策展層實測回報——Falco 兩張命中在 **at** 不是 de、Grauzone 原盤登記在 **GB**、
// 義大利卡有一半靠 **gb** 命中（`it` 店面的 403 比例最高）。gb 因此從第七位提到第四位。
const DEIT = ['de', 'it', 'at', 'gb', 'ch', 'us', 'fr', 'nl'];
// 新譜（c-111／c-112）：發行權全球同步，用最寬的一組；tw／kr 補在後面接華語與韓語那半。
const NEW = ['us', 'gb', 'jp', 'de', 'fr', 'tw', 'kr', 'ca', 'au'];

// BN2K：Blue Note 1985 年後線（c159 起）。2026-09-18 裁定第 1560-C 條——
// 原本的八市場（us/gb/jp/de/fr/nl/ca/tw）漏掉北歐與南歐：
// Jukka Perko《Kaanaanmaa》八市場全 0 命中，只有 fi 店面有軌（9/9 都回得到 preview）。
// 本線大量是 Blue Note 歐洲／北歐分部發的碟（芬蘭、丹麥、義大利、法國），因此補上 fi/se/no/dk/it/es/pl。
const BN2K = ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw', 'fi', 'se', 'no', 'dk', 'it', 'es', 'pl'];

const LINE_FRONTS = { c67: JPN, c68: UKB, c69: USB, c70: JPN, c71: UKB, c72: USB, c73: JPN, c74: UKB, c75: USB,
  c76: JPN, c77: UKB, c78: USB, c79: JPN, c80: UKB, c81: USB, c82: JPN, c83: UKB, c84: USB, c85: UKB, c86: USB,
  c87: JPN, c88: OST,
  c89: TWN, c90: TWN, c91: TWN, c92: TWN,
  c93: UKB, c94: USB, c95: BLU, c96: USB, c97: UKB, c98: USB, c99: WLD, c100: UKB, c101: GAME, c102: GAME,
  // c-103～c-118。c-113～c-115 是 §1 批（rgMbid 留空、不跑 fix-rgmbid 與 probe-caa），
  // 但試聽探測照跑——§1 的碟在 Apple 上有時反而找得到。
  c103: JPN, c104: KOR, c105: KOR, c106: TWN, c107: CHN, c108: LATAM, c109: FRA, c110: DEIT,
  c111: NEW, c112: NEW, c113: JPN, c114: USB, c115: UKB, c116: JPN, c117: UKB, c118: USB,
  // c-119～c-121（2026-09-07）：台語獨立走 TWN、紐約硬蕊走 USB、日本地下即興走 JPN。
  c119: TWN, c120: USB, c121: JPN, c122: USB,
  // c-123～c-125：波羅的海走 ee／lv／lt 再退回 ru／de；伊朗的碟多半只在 us／gb 上架；
  // 伊比利走 es／pt 優先。
  c123: ['ee', 'lv', 'lt', 'ru', 'de', 'fi', 'us', 'gb'],
  c124: ['us', 'gb', 'de', 'fr', 'nl', 'tr', 'ae', 'ca'],
  c125: ['es', 'pt', 'fr', 'gb', 'us', 'de', 'br', 'mx'],
  // c-126：台灣獨立 2010 後，tw 優先，再走華語圈其他店面與美日。
  c126: TWN,
  c127: TWN,
  c128: TWN,
  // c-129 東南亞：th／id／my／sg 優先，再退回 us／gb（再發廠牌多在西方）。
  c129: ['th', 'id', 'my', 'sg', 'jp', 'us', 'gb', 'fr'],
  // c-130 波蘭：pl 優先，再走中東歐與德法。
  c130: ['pl', 'de', 'cz', 'sk', 'hu', 'gb', 'us', 'fr'],
  // c-131 爵士深度：日本盤 jp 優先，再走美英歐。
  c131: ['jp', 'us', 'gb', 'de', 'fr', 'nl', 'tw', 'ca'],
  c132: ['jp', 'us', 'gb', 'de', 'fr', 'nl', 'tw', 'ca'],
  c133: ['jp', 'us', 'gb', 'de', 'fr', 'nl', 'tw', 'ca'],
  c134: ['jp', 'us', 'gb', 'de', 'fr', 'nl', 'tw', 'ca'],
  c135: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c136: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c137: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c138: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c139: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c140: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c141: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c142: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c143: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c144: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c145: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c146: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c147: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c148: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c149: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c150: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c151: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c152: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c153: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c154: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c155: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c156: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c157: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c158: ['us', 'gb', 'jp', 'de', 'fr', 'nl', 'ca', 'tw'],
  c159: BN2K,
  c160: BN2K,
  c161: BN2K,
  c162: BN2K,
  c163: BN2K,
  c164: BN2K,
  c165: BN2K,
  c166: BN2K,
  c167: BN2K,
  c168: BN2K,
  c169: BN2K,
  c170: BN2K,
  // ⚠ 2026-09-22（主線第 1943-B 條）：**jp-1 線（日本爵士四大廠）十批一直沒登記，整條線都落到 `GEN`**
  // （`GEN` 是 `us` 先、`jp` 排第三）。實測後果兩面都有：
  //   精準度——`MALTA《Malta》` 在 gb 配到瑞典流行團 Malta 的同名碟（℗1973 Parlophone Sweden、曲目全是瑞典文），
  //            `Native Son《Coast to Coast》` 配到蘇格蘭廠牌、`富樫雅彦〜高柳昌行` 配到美國歌手 JoJo；
  //   召回率——`阿川泰子《Night Line》` 的 2016 ビクター 數位版在 jp 與 us 都有，卻先在 us 配到別張二合一。
  // 這是**日本國內盤的線**，`jp` 必須排第一。
  c173: JPN, c174: JPN, c175: JPN, c176: JPN, c177: JPN,
  c178: JPN, c179: JPN, c180: JPN, c181: JPN, c182: JPN };

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


// ── 2026-09-05：**回寫前先重讀並合併，不要整檔覆寫** ────────────────────────────
// 這支腳本一開始把 previews.json 整個讀進 `out`，之後每 10 張就 `writeFileSync(OUT, out)`。
// 探測一批要跑數十分鐘，**期間主線若依研究層的回報去修別批的條目，就會被這支的舊副本蓋掉**。
// 實際損失：c-93 b 組覆核出來的五張（Spiritualized《Pure Phase》、
// Liz Phair《whitechocolatespaceegg》、Guns N' Roses《Chinese Democracy》、
// The Sonics《Boom》、This Heat《Repeat》）在 c-94／c-95 那一輪探測跑完後全部被還原成 unavailable，
// c-93 的 45/45 掉回 40/45，而且**沒有任何錯誤訊息**——檔案好好的，只是舊了。
// 改法：每次回寫都先重讀磁碟上的版本，**只把本次真正探測過的鍵寫回去**，其餘一律保留磁碟版。
const writeMerged = (touchedKeys) => {
  let disk = {};
  try { disk = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {}
  for (const k of touchedKeys) disk[k] = out[k];
  fs.writeFileSync(OUT, JSON.stringify(disk, null, 1));
};
const touched = new Set();

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
    // ⚠ 2026-09-21（c-176 回撈層抓到，主線第 1900-B 條）：**這兩行原本把整串 `queryAlias`
    // 當成一個候選名**，而 `queryAlias` 是用 `；` 串起來的多個別名
    // （逐字例：`Story Of Wind Behind Left；Story of Wind Behind Left；風の遺した物語；Masahiko Togashi；…`）。
    // `termsFor()` 那一端是用 `aliasParts()` 切開才送出去查的，**查得到，卻在這一關被擋掉**
    // ——`titleOk(整串, 'Story of Wind Behind Left')` 永遠 false。
    // 本批 6 張救回有 4 張是這個形狀（翻譯型盤名、平假名掛名），**`queryAlias` 裡本來就寫著命中的寫法**。
    // 改成與 `termsFor()` 同樣用 `aliasParts()` 切開後逐段比對。
    // ⚠ 2026-09-22（c-179 回撈層抓到，主線第 1935-B 條）：上面那一版把 `aparts` **同時**倒進
    // 兩個候選桶，於是**盤名的別名被當成掛名候選**——`Native Son《Coast to Coast (Live in USA)》`
    // 的 `queryAlias` 第一段逐字就是 `Coast to Coast`，它讓 de 店面一筆
    // `artistName "Coast To Coast"／collectionName "Coast To Coast"／2007／℗ Athens Of The North`
    // 的蘇格蘭放克考古盤兩關同時過，整筆判成 ready。
    // **`queryAlias` 的語意是「外部服務認得的字串」，沒有規定是掛名還是盤名**（第 25 條），
    // 所以兩種都試是對的；錯的是**同一段別名可以同時充當兩邊**。
    // → 倒進掛名桶之前先剔掉「長得像本張盤名」的段，倒進盤名桶之前先剔掉「長得像本張掛名」的段。
    // ⚠ 自我同名卡（掛名＝盤名）整個跳過這道，否則兩桶會被剔空。
    const aparts = aliasParts(c.queryAlias);
    const selfNamed = !!c.selfTitled || canon(c.artist) === canon(c.album);
    const albumLike  = a => titleOk(a, c.album, !!c.selfTitled)  || looseTitleOk(a, c.album, !!c.selfTitled);
    const artistLike = a => artistOk(a, c.artist) || looseArtistOk(a, c.artist);
    const albumParts  = selfNamed ? aparts : aparts.filter(a => !artistLike(a));
    const artistParts = selfNamed ? aparts : aparts.filter(a => !albumLike(a));
    const albumCands = [c.album, translit(c.album), ...albumParts].filter(Boolean);
    const artistCands = [c.artist, translit(c.artist), ...artistParts].filter(Boolean);
    // ⚠ 第二道（同一條裁定的後半）：**盤名那一關與掛名那一關不准靠同一段別名過。**
    // 只剔掉「盤名形的別名」還漏得掉另一種形狀——**掛名側的綽號同時頂過兩關**：
    // `富樫雅彦〜高柳昌行《パルセーション》` 的 alias 裡有高柳的綽號 `Jojo`，
    // 它既不像本張盤名（所以留在掛名桶）、也留在盤名桶，於是 `JoJo /《JoJo》2004` 兩關同時過。
    // → 命中的條件改成「存在一組**不同**的證人各自過一關」。
    // ⚠ 自我同名卡（掛名＝盤名）豁免這一道，否則它永遠不可能有兩個不同的證人。
    const pairOk = (gotT, gotA) => {
      const TW = albumCands.filter(a => titleOk(a, gotT, !!c.selfTitled));
      if (looseTitleOk(c.album, gotT, !!c.selfTitled)) TW.push(c.album);
      const AW = artistCands.filter(a => artistOk(a, gotA));
      if (looseArtistOk(c.artist, gotA)) AW.push(c.artist);
      if (!TW.length || !AW.length) return false;
      if (selfNamed) return true;
      return TW.some(t => AW.some(a => canon(t) !== canon(a)));
    };
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
      hits = (j.results || []).filter(r => pairOk(r.collectionName || '', r.artistName || ''));
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
        // ⚠ 2026-09-22（主線第 1935-B 條）：這條路原本**只驗盤名**，於是上面那兩道防呆全被繞過——
        // `富樫雅彦〜高柳昌行《パルセーション》` 的別名裡有高柳的綽號 `Jojo`，
        // 它把 Apple 上的藝人 `JoJo` 找出來，再拿同一段 `Jojo` 去比中該藝人的同名專輯《JoJo》。
        // → 這條路也走 `pairOk`，兩關要有不同的證人。
        const found = list.filter(x => pairOk(x.collectionName || '', x.artistName || ''));
        if (found.length) { hits = found; rec.tried.push(`${front}:artistPage→${found.length}`); break; }
      }
    }
    if (!hits.length) continue;

    // 排序：**沒有再發裝飾字樣的版本最優先**，再來年份接近的，最後 explicit 優先。
    // 2026-09-05（c-94 研究 a）：a 組 23 張探測**全判 ready**，逐張回 lookup 卻抓到四筆配錯版本——
    // Voivod《War and Pain》配到 31 軌的 Box Set（原盤 9 軌）、
    // Killswitch Engage《The End of Heartache》配到 Bonus Track Version（18 軌／原盤 12）、
    // Isis《Celestial》配到曲名全帶尾綴的 Remastered 版。
    // **`ready` 只代表「配到了某一筆」，不代表配對正確。** `DECO` 這個正規式本來就認得
    // remaster／deluxe／expanded／edition／anniversary／bonus tracks／version，
    // 之前只拿來判「年份不計」，現在讓它進排序：**同樣配得上的候選，素面的那個先。**
    const deco = x => { DECO.lastIndex = 0; const r = DECO.test(x?.collectionName || ''); DECO.lastIndex = 0; return r ? 1 : 0; };
    // ⚠ 2026-09-22（c-182 回撈層抓到，主線第 1947-B 條）：**同一位藝人底下多筆共用同一個上架日時，
    // 那個日期不是發行日，是「這一批一起上架」的日子**——`国府弘子` 有七筆再發被壓成同一個
    // `2006-08-02`，原始年份整個丟失。**年份本來就不是門檻（裁定第 77 條），但它還在排序裡**，
    // 壓扁的日期會讓排序誤以為某張「年份最接近」。→ 這種日期一律當成沒有年份（drift 0 不參與排序）。
    const dateCount = new Map();
    for (const x of hits) {
      const k = `${x.artistId || '?'}|${String(x.releaseDate || '').slice(0, 10)}`;
      dateCount.set(k, (dateCount.get(k) || 0) + 1);
    }
    const collapsed = x => (dateCount.get(`${x.artistId || '?'}|${String(x.releaseDate || '').slice(0, 10)}`) || 0) >= 3;
    const drift = x => (c.year && !collapsed(x) ? Math.abs(Number(String(x.releaseDate || '').slice(0, 4)) - c.year) : 0);
    const rank = x => ({ explicit: 0, notExplicit: 1, cleaned: 2 }[x?.collectionExplicitness] ?? 1);
    hits.sort((x, y) => (deco(x) - deco(y)) || (drift(x) - drift(y)) || (rank(x) - rank(y)));

    // ⚠ 2026-09-22 第二版（主線第 1942-B 條）：第三、四道原本寫在「選完 best、查完 lookup」之後，
    // 退掉就 `continue` 換下一個 storefront——**於是同一個 storefront 剩下的候選一起被丟掉。**
    // c-179 `阿川泰子《Night Line》` 在 jp 有四筆候選、正解就在裡面，
    // 卻因為排序後的第一筆（`Sunglow/Yasuko, Love-Bird` 那張二合一）被退而整批放棄。
    // → 改成**排序後當過濾器**：退掉的那筆剔除、換下一筆，整批都被剔除才換 storefront。
    // 這兩道只需要 search 結果就有的三個欄位，所以也省掉一次 lookup。
    const coreTitles = new Set([canon(c.album), canon(translit(c.album))]);
    const judge = x => {
      const gt = x.collectionName || '', ga = x.artistName || '';
      const tw = albumCands.filter(a => titleOk(a, gt, !!c.selfTitled));
      if (looseTitleOk(c.album, gt, !!c.selfTitled)) tw.push(c.album);
      const aliasOnly = tw.length > 0 && tw.every(t => !coreTitles.has(canon(t)));
      if (!aliasOnly) return { ok: true, aliasOnly };
      const sameNameEntry = canon(gt) === canon(ga) && canon(c.artist) !== canon(ga);
      const yd = c.year ? Math.abs(Number(String(x.releaseDate || '').slice(0, 4)) - c.year) : 0;
      const fragment = tw.every(t => canon(t) !== canon(gt) && canon(gt).includes(canon(t)));
      if (sameNameEntry) return { ok: false, aliasOnly, why: 'aliasOnlyTitle＋盤名掛名同名' };
      if (fragment && yd > 3) return { ok: false, aliasOnly, why: 'aliasOnlyTitle＋證人只是片段＋年份漂移' };
      return { ok: true, aliasOnly };
    };
    const dropped = [];
    const kept = [];
    for (const x of hits) {
      const v = judge(x);
      if (v.ok) { kept.push({ x, aliasOnly: v.aliasOnly }); continue; }
      dropped.push({ why: v.why, collectionId: x.collectionId, appleTitle: x.collectionName,
                     appleArtist: x.artistName, appleYear: String(x.releaseDate || '').slice(0, 4) });
    }
    if (!kept.length) {
      // ⚠ 2026-09-22（c-182 回撈層提出，主線第 1947-B 條）：原本只記第一筆，
      // 於是「`jp:8→1` 之後被退掉」的那幾張，另外七個候選下一位回撈層完全看不到、得重打一次。
      // 改成整批記下來。
      if (dropped.length) rec.rejectedMatch = dropped;
      rec.tried.push(`${front}:第1935-B條退${dropped.length}筆`);
      continue;
    }
    hits = kept.map(k => k.x);
    let best = hits[0];
    const bestAliasOnly = kept[0].aliasOnly;
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
    // ⚠ 只報不擋的旗標：盤名那一關**沒有任何「卡片本身的盤名」當證人**、整個靠 `queryAlias` 的某一段過關。
    // 真的再發（`The Good Bad Girl+6`、`IQ-179`、`Anokoro`）也會中，**所以不擋**；
    // 它只提示研究層回查。擋人的是上面那兩道，寫在排序之後、lookup 之前。
    if (bestAliasOnly) rec.aliasOnlyTitle = true;
    if (collapsed(best)) rec.collapsedDate = String(best.releaseDate || '').slice(0, 10);
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
  touched.add(k);
  n++;
  const m = rec.status === 'ready' ? '✓' : rec.status === 'no-preview' ? '~' : '✗';
  console.log(`${m} [${c.batch}] ${c.artist}《${c.album}》${
    rec.front ? ` ${rec.front} ${rec.explicitness}${rec.cleanedOnly ? '(只有淨化版)' : ''} ${rec.appleYear}` : ' 各 storefront 皆無'}`);
  if (n % 10 === 0) writeMerged(touched);
}
writeMerged(touched);
const v = Object.values(out);
console.log(`\n共 ${cards.length} 張｜ready ${v.filter(x => x.status === 'ready').length}｜有碟無預覽 ${
  v.filter(x => x.status === 'no-preview').length}｜unavailable ${v.filter(x => x.status === 'unavailable').length}｜只有淨化版 ${
  v.filter(x => x.cleanedOnly).length}`);
