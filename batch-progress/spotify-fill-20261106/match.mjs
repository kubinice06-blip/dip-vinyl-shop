// 專輯名比對：與 worker／kv-spotify-link-repair 同一套正規化與版本後綴剝除，另加「去冠詞」與「卡名是 Spotify 名的開頭＋版本／副標」。
// NFKD 去變音（Mëkanïk→mekanik，ø／æ／ß 另補），保留日中韓、西里爾、希臘
export const normalize = s => String(s || '').replace(/[øØ]/g, 'o').replace(/[æÆ]/g, 'ae').replace(/ß/g, 'ss')
  .normalize('NFKC').normalize('NFKD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
  .replace(/&/g, ' and ').replace(/\byr\b\.?/g, 'your').replace(/\bvol(ume)?\b\.?/g, 'vol')
  .replace(/[^a-z0-9Ͱ-ϿЀ-ӿ぀-ヿ㐀-鿿가-힯]/g, '');
const EDITION = /(remaster|remastered|deluxe|expanded|edition|anniversary|bonus|version|reissue|\bmono\b|\bstereo\b|explicit|special|legacy|collector|digital|redux|\d{4}\s*mix|original\s*recording|soundtrack|original\s*score|motion\s*picture|live|\d+(st|nd|rd|th)\s*album|the\s*\w+\s*album)/i;
export const stripEdition = raw => {
  let s = (raw || '').trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/\s*[\(\[（]([^()\[\]（）]*)[\)\]）]\s*$/, (m, inner) => EDITION.test(inner) ? '' : m);
    s = s.replace(/\s*[-–—:]\s*([^-–—:]*)$/, (m, tail) => EDITION.test(tail) ? '' : m);
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
  // Spotify 那筆是現場／EP／單曲而卡名不是 → 不同作品（Loretta Lynn《Coal Miner's Daughter》→ Ed Sullivan 現場、
  // Spandau Ballet《True》→ Digital E.P.、Donald Byrd《Black Byrd》→ Live）
  const KIND = /\b(live|e\.?\s?p\.?|single|demos?|instrumentals?|karaoke|remix(es)?|acoustic)\b/i;
  if (KIND.test(sp) && !KIND.test(card)) return '';
  const as = normalize(stripEdition(card)), bs = normalize(stripEdition(sp));
  if (as === bs || a === bs || as === b) return 'edition';
  if (dropArticle(as) === dropArticle(bs) && dropArticle(as).length >= 3) return 'edition';
  return '';
}
