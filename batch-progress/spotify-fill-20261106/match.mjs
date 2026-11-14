// Spotify 專輯比對規則（2026-11-07 店主：「以前犯過的錯不要再犯」）。每條規則都對應一個真實錯案：
//   錯藝人  The Birthday Party →草東沒有派對（藝人名子字串包含）、gap → Del Water Gap、Darius → Darius Lim、Gong → 同名別團
//           → 藝人必須「正規化後完全相同」，不收包含；同名短名／同名專輯另加年份檢查（見 spotify.mjs）。
//   錯版本  Taylor Swift《Fearless》→ Taylor's Version、Dexter Gordon《Go》／Loretta Lynn／Donald Byrd → 現場盤、
//           Bandana → Bandana Beats（純音樂）、葉啟田 → DJ Remix、King Crimson → Elemental Mixes、Spandau Ballet《True》→ EP
//           → Spotify 名帶下列「另一種作品」字樣而卡名沒有 → 不收。
//   錯張    Led Zeppelin《II》→《III》、Godfather → Part II、Prodigy → More Music for…、janet. → Janet Jackson
//           → 只收「完全相同」或「只差版本後綴（remaster／deluxe／anniversary…）／冠詞」，不做包含或模糊比對。
//   語言    卡池中文一律繁體（2026-09-06 店主裁定），Spotify 常是簡體 → 兩邊都先轉成簡體再比（異體字收斂）；變音符號（Mëkanïk）一律去掉；
//           日韓中卡用對應語系的 Accept-Language 查（見 spotify.mjs），羅馬字別名用 data/artist-romanization.json。
import { Converter } from 'opencc-js';
// 比對用：兩邊都轉成簡體（繁→簡是多對一，拚／拼、裏／裡、爲／為這類異體字會收斂成同一個字；簡→繁反而轉不回來）
const fold = Converter({ from: 'tw', to: 'cn' });

export const normalize = s => fold(String(s || ''))
  .replace(/[øØ]/g, 'o').replace(/[æÆ]/g, 'ae').replace(/ß/g, 'ss')
  .normalize('NFKC').normalize('NFKD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
  .replace(/&/g, ' and ').replace(/\byr\b\.?/g, 'your').replace(/\bvol(ume)?\b\.?/g, 'vol')
  .replace(/[^a-z0-9Ͱ-ϿЀ-ӿ぀-ヿ㐀-鿿가-힯]/g, '');

const EDITION = /(remaster|remastered|remasterise|deluxe|expanded|edition|anniversary|bonus|version|reissue|\bmono\b|\bstereo\b|explicit|special|legacy|collector|digital|\d{4}\s*mix|original\s*recording|soundtrack|original\s*score|motion\s*picture|\d+(st|nd|rd|th)\s*album|the\s*\w+\s*album|rudy\s*van\s*gelder|rvg)/i;
// 「另一種作品」：卡名沒有、Spotify 名卻有 → 不是同一張
export const OTHER_WORK = /\b(instrumentales?|highlights|live|e\.?\s?p\.?|single|demos?|instrumentals?|karaoke|remix(es|ed)?|acoustic|beats|taylor'?s\s*version|re-?recorded|sped\s*up|slowed|lullab(y|ies)|tribute|best\s*of|greatest\s*hits|the\s*hits|a\s*cappella|covers?|commentary|elemental\s*mix(es)?|piano\s*version|8-?bit|reimagined|redux|unplugged|sessions?)\b/i;

export const stripEdition = raw => {
  let s = (raw || '').trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/\s*[\(\[（]([^()\[\]（）]*)[\)\]）]\s*$/, (m, inner) => EDITION.test(inner) && !OTHER_WORK.test(inner) ? '' : m);
    s = s.replace(/\s*[-–—:]\s*([^-–—:]*)$/, (m, tail) => EDITION.test(tail) && !OTHER_WORK.test(tail) ? '' : m);
    if (s === before) break;
  }
  return s.trim() || raw;
};
const dropArticle = s => s.replace(/^(the|a|an|le|la|les|el|los|las|il|der|die|das)(?=[a-z0-9])/, '');

// 回傳 'exact' | 'edition' | ''
export function titleMatch(card, sp) {
  const a = normalize(card), b = normalize(sp);
  if (!a || !b) return '';
  if (a === b) return 'exact';
  if (OTHER_WORK.test(sp) && !OTHER_WORK.test(card)) return '';
  const as = normalize(stripEdition(card)), bs = normalize(stripEdition(sp));
  if (as === bs || a === bs || as === b) return 'edition';
  if (dropArticle(as) === dropArticle(bs) && dropArticle(as).length >= 3) return 'edition';
  return '';
}

// 卡名常是「中文 英文」並列（滅火器 Fire EX.、落日飛車 Sunset Rollercoaster）：拆出各語段，任一段相同即算同名
export function nameVariants(name, aliases = {}) {
  const raw = String(name || '').trim();
  const out = new Set([normalize(raw)]);
  const latin = raw.replace(/[^\x00-ɏ]+/g, ' ').trim();
  const cjk = raw.replace(/[\x00-ɏ]+/g, ' ').trim();
  if (latin && cjk) { out.add(normalize(latin)); out.add(normalize(cjk)); }
  if (aliases[raw]) out.add(normalize(aliases[raw]));
  for (const [k, v] of Object.entries(aliases)) if (normalize(v) === normalize(raw)) out.add(normalize(k));
  out.delete('');
  return out;
}

// 依卡名文字決定查詢語系，讓 Spotify 回傳的名稱跟卡池同一種語言（日文卡回日文名、中文卡回中文名）
export function langOf(text) {
  const s = String(text || '');
  if (/[぀-ヿ]/.test(s)) return 'ja';
  if (/[가-힯]/.test(s)) return 'ko';
  if (/[㐀-鿿]/.test(s)) return 'zh-TW';
  return 'en';
}
