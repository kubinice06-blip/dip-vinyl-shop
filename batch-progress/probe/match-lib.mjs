// 試聽比對的純函式集合（2026-09-02 自 probe-previews.mjs 抽出）。
// 抽出來的理由是裁定第 90 條：規則改動要先過已知實例再跑批——
// 比對邏輯留在主程式頂層時測不到。這裡不做網路請求、不讀檔案，test-match.mjs 直接 import。
import { fold } from '../lib.mjs';

export const norm = s => fold(s).replace(/[^\p{L}\p{N}]+/gu, '');

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
