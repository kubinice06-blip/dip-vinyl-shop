// 共用正規化與版本字樣判定
import fs from 'node:fs';
export const ROOT = '/home/user/dip-vinyl-shop';
export const DEF_WORK = '/tmp/claude-0/-home-user/f1503c39-7ef0-590a-82ba-a39436835848/scratchpad/link-audit';
const src = fs.readFileSync(`${ROOT}/dip-player.js`, 'utf8');
export const normalizePreviewText = new Function('value', src.match(/function normalizePreviewText\(value\) \{([\s\S]*?)\n  \}/)[1]);
export const previewKey = (a, b) => `${normalizePreviewText(a)}\u0000${normalizePreviewText(b)}`;
// 版本字樣（比對時忽略）
const VER = /remaster|deluxe|anniversary|edition|expanded|bonus|reissue|legacy|special|collector|mono|stereo|version|super|definitive|\b(19|20)\d\d\b|bicentennial|centennial|re-?issue|digital|hi-?res|mqa|24[- ]?bit|track|disc|vol(ume)?\.?\s*\d|explicit|clean|with bonus|original album|complete/i;
// 錯版本字樣（卡片專輯名本身沒有才算錯）
export const BAD = [
  ['instrumental', /instrumental|\binst\.?\b|インスト/i], ['karaoke', /karaoke|カラオケ|伴奏/i], ['live', /\blive\b|ライヴ|ライブ|現場|演唱會|en vivo|ao vivo|en directo|\blive at\b/i],
  ['remix', /混音|remix|\bremixes\b|\bremixed\b|\bmixes\b|reworks?\b|dub version|\bdubs\b/i], ['cover/tribute', /tribute|\bcovers?\b|\bsongs of\b|\bplays\b|\bperforms?\b|\bsalute\b|homage|in the style of|made famous|originally performed/i],
  ['a cappella', /a\s*cap+el+a|acapella/i], ['beats', /\bbeats\b/i], ['demo', /\bdemos?\b/i], ['commentary', /commentary|track by track|interview/i],
  ['sped/slowed', /sped up|slowed|\breverb\b|nightcore|8d audio/i], ['lullaby/piano', /lullaby|lullabies|rockabye|piano (tribute|versions?)|string quartet tribute|vitamin string/i],
  ['compilation', /\bbest of\b|greatest hits|精選|最精選|ベスト|\bthe best\b|selected hits|anthology|collection\b|original album series/i], ['single/EP', /\s-\s(single|ep)$|\((single|ep)\)$/i],
  ['reimagined', /reimagined|re-?recorded|\brevisited\b|taylor's version|\borchestral\b|symphonic|\bacoustic\b/i], ['sessions', /\bsessions?\b|peel session|bbc/i],
];
export function badWords(candidate, cardAlbum, cardArtist = '') {
  const out = [];
  for (const [name, re] of BAD) if (re.test(candidate) && !re.test(cardAlbum) && !(name === 'cover/tribute' && re.test(cardArtist))) out.push(name);
  return out;
}
const strip0 = s => String(s || '').normalize('NFKC');
// 把含版本字樣的括號段 / 「 - xxx」尾段拿掉
export function stripVersion(s) {
  let t = strip0(s);
  for (let k = 0; k < 3; k++) t = t.replace(/\s*[\(\[（【［]([^\)\]）】］]*)[\)\]）】］]/g, (m, inner) => VER.test(inner) ? '' : m);
  t = t.replace(/\s+[-–—:]\s+([^-–—:]*)$/, (m, inner) => VER.test(inner) ? '' : m);
  return t;
}
export const stripAllParens = s => strip0(s).replace(/\s*[\(\[（【［][^\)\]）】］]*[\)\]）】］]/g, '').replace(/\s+[-–—]\s+.*$/, '');
export const N = s => normalizePreviewText(strip0(s).replace(/&/g, ' and ').replace(/\+/g, ' and ')).replace(/^the/, '');
// 專輯名比對：exact / loose / partial / mismatch
export function albumMatch(card, cand) {
  const a = N(stripVersion(card)), b = N(stripVersion(cand));
  if (!a || !b) return 'unknown';
  if (a === b) return 'exact';
  const a2 = N(stripAllParens(card)), b2 = N(stripAllParens(cand));
  if (a2 && a2 === b2) return 'loose';
  if (N(card) === N(cand)) return 'exact';
  if ((a.length >= 4 && b.includes(a)) || (b.length >= 4 && a.includes(b)) || (a2.length >= 4 && b2.includes(a2)) || (b2.length >= 4 && a2.includes(b2))) return 'partial';
  return 'mismatch';
}
const ROM = JSON.parse(fs.readFileSync(`${ROOT}/data/artist-romanization.json`, 'utf8')).entries;
const tokens = s => strip0(s).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').split(/[^a-z0-9぀-ヿ㐀-鿿가-힯]+/).filter(w => w && !['the', 'and', 'feat', 'ft', 'with', 'his', 'her', 'orchestra', 'trio', 'quartet', 'band', 'group'].includes(w));
export function artistMatch(card, names) {
  const cands = names.filter(Boolean);
  const cardForms = [card, ROM[card]].filter(Boolean);
  for (const c of cardForms) {
    const a = N(c);
    for (const x of cands) {
      const b = N(String(x).replace(/-/g, ' '));
      if (!a || !b) continue;
      if (a === b) return 'exact';
      if (/^various|^variousartists|^群星|^ヴァリアス|^v\.?a\.?$/i.test(String(x))) continue;
      if ((a.length >= 3 && b.includes(a)) || (b.length >= 3 && a.includes(b))) return 'partial';
      const ta = tokens(c), tb = new Set(tokens(String(x).replace(/-/g, ' ')));
      if (ta.length && ta.filter(w => tb.has(w)).length >= Math.max(1, Math.ceil(ta.length / 2))) return 'partial';
    }
  }
  if (cands.some(x => /^various|群星|ヴァリアス|オムニバス/i.test(String(x)))) return 'various';
  return 'mismatch';
}
