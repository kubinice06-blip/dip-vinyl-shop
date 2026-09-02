// 試聽比對的純函式集合（2026-09-02 自 probe-previews.mjs 抽出）。
// 抽出來的理由是裁定第 90 條：規則改動要先過已知實例再跑批——
// 比對邏輯留在主程式頂層時測不到，只能改完直接跑 40 分鐘的批次再看。
// 這裡不做任何網路請求、不讀任何檔案，test-match.mjs 直接 import 驗證。
import { fold } from '../lib.mjs';

export const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');
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
      : b.startsWith('c66') ? INDIA : GEN });

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
export const SUFFIX = /[-–—]\s*(Single|EP)\s*$/i;
export const titleOk = (want, got, selfTitled = false) => {
  if (SUFFIX.test(got) && !SUFFIX.test(want)) return false;
  const a = norm(want), b = norm(got);
  if (a === b) return true;
  if (selfTitled) return false;                        // 自我同名：只接受完全相等
  if (/\d/.test(a) !== /\d/.test(b) && (a.includes(b) || b.includes(a))) return false; // 數字殘餘
  return (a.includes(b) || b.includes(a)) && Math.abs(a.length - b.length) <= 8;
};
export const artistOk = (want, got) => {
  const a = norm(want), b = norm(got);
  return a === b || a.includes(b) || b.includes(a);
};

// 非拉丁文字的搜尋回退（2026-09-02，c-62 希臘批發現）。
// 卡片的掛名與盤名依裁定第 6、70 條用原文字，MB 要的正是原文字；
// 但 Apple 反過來只認羅馬轉寫——c-62 用原文字查只中 4/38，
// 策展層自己用轉寫查是 17/38。這個轉寫**只用於查詢、不寫進任何資料**，
// 所以不違反裁定第 26 條（別名只填外部服務認得的字串、不自創）。
export const GR = { α:'a', β:'v', γ:'g', δ:'d', ε:'e', ζ:'z', η:'i', θ:'th', ι:'i', κ:'k', λ:'l',
  μ:'m', ν:'n', ξ:'x', ο:'o', π:'p', ρ:'r', σ:'s', ς:'s', τ:'t', υ:'y', φ:'f', χ:'ch',
  ψ:'ps', ω:'o', ά:'a', έ:'e', ή:'i', ί:'i', ό:'o', ύ:'y', ώ:'o', ϊ:'i', ϋ:'y', ΐ:'i', ΰ:'y' };
export const CY = { а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'e', ж:'zh', з:'z', и:'i', й:'y',
  к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t', у:'u', ф:'f', х:'kh',
  ц:'ts', ч:'ch', ш:'sh', щ:'shch', ъ:'', ы:'y', ь:'', э:'e', ю:'yu', я:'ya', і:'i', ї:'yi', є:'ye', ґ:'g' };
export const hasNonLatin = s => /[\u0370-\u03ff\u1f00-\u1fff\u0400-\u04ff]/.test(String(s || ''));
export const translit = s => Array.from(String(s || '')).map(ch => {
  const lo = ch.toLowerCase();
  const t = GR[lo] ?? CY[lo];
  if (t === undefined) return ch;
  return ch === lo ? t : (t.charAt(0).toUpperCase() + t.slice(1));
}).join('');

// 羅馬轉寫沒有單一標準，Apple 用的那一種不必然是我們算出來的那一種
// （實例：Θεοδωράκης《Ρωμιοσύνη》在 Apple 上是 Romiosini，我們的表算出 Romiosyni）。
// 比對前把兩邊都收斂成同一個粗形，只吸收希臘文轉寫最常見的幾組分歧。
// 這只影響比對，不影響任何存下來的資料。
// 再版尾綴要先拿掉，否則 titleOk 的長度差上限（8）會把
// 「Ρωμιοσύνη」與「Romiosini (Remastered)」判成不同（差 10）。
// 再發尾綴常帶年份或序數（「Remastered 2013」「30th Anniversary Edition」），
// 那些數字要跟著尾綴一起剝掉，否則會被下面的「數字殘餘」規則誤擋成別張碟。
// 年份可能在尾綴前（「2025 Remastered」）也可能在後（「Remastered 2013」），兩邊都吸收。
export const DECO = /\b(\d{4}\s+)?(\d{1,3}(st|nd|rd|th)\s+)?(digitally\s+)?(remaster(ed)?|reissue|deluxe|expanded|edition|anniversary|bonus\s+tracks?|version)(\s*\d{4})?\b/gi;
export const canon = s => norm(translit(String(s || '').replace(DECO, ' ')))
  .replace(/ph/g, 'f').replace(/kh/g, 'h').replace(/ch/g, 'h')
  .replace(/mp/g, 'b').replace(/nt/g, 'd').replace(/gk/g, 'g')
  .replace(/ou/g, 'u').replace(/ei/g, 'i').replace(/oi/g, 'i').replace(/ai/g, 'e')   // 希臘雙母音的通行轉寫
  .replace(/y/g, 'i').replace(/v/g, 'b')
  .replace(/(.)\1+/g, '$1');
// 年份不再當門檻之後（第 77 條），子字串比對會放進兩種錯配（c-55 實測）：
//   Moğollar《Moğollar》 → 《Moğollar'94》（1994 年的復出盤，不是 1976 那張）
//   3 Hür-El《3 Hür-El》 → 《1953 Hürel》（回顧合輯）
// 共同點是「Apple 標題＝卡片標題＋一段帶數字的殘餘」。再發尾綴（remastered 等）全是字母，
// 帶數字的殘餘幾乎一定是另一張碟（年份、Vol.、續作）。所以：殘餘含數字就擋。
// 自我同名卡更嚴：標題必須完全相等——「藝人名＋任何東西」都是別張碟。
export const digitResidual = (a, b) => {
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  const i = long.indexOf(short);
  if (i < 0) return false;
  const rest = long.slice(0, i) + long.slice(i + short.length);
  return /\d/.test(rest);
};
export const looseTitleOk = (want, got, selfTitled = false) => {
  if (SUFFIX.test(got) && !SUFFIX.test(want)) return false;
  const a = canon(want), b = canon(got);
  if (!a || !b) return false;
  if (a === b) return true;
  if (selfTitled) return false;
  if (digitResidual(a, b)) return false;
  return (a.includes(b) || b.includes(a)) && Math.abs(a.length - b.length) <= 8;
};
export const looseArtistOk = (want, got) => {
  const a = canon(want), b = canon(got);
  return !!a && !!b && (a === b || a.includes(b) || b.includes(a));
};

// 一張卡要試的查詢字串，依序：原文 → 別名＋原盤名 → 全轉寫。重複的去掉。
export function termsFor(c) {
  const list = [`${c.artist} ${c.album}`];
  if (c.queryAlias) list.push(`${c.queryAlias} ${c.album}`);
  if (hasNonLatin(c.artist) || hasNonLatin(c.album))
    list.push(`${c.queryAlias || translit(c.artist)} ${translit(c.album)}`);
  return [...new Set(list.map(x => x.trim()).filter(Boolean))];
}

