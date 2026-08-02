// 卡池封面稽核 步驟 4：比對「卡池專輯名」與「Spotify 實際回傳的專輯名」，標出可疑配對。
//
// 判準的核心是「還原 worker 的寬鬆比對，然後扣掉它刻意要吃下的那些差異」：
//   worker 的 albumOK 是正規化後互相包含，為的是吃下 (Deluxe Edition)／(Remastered) 這類副標。
//   所以這裡先把 Spotify 名字上的**版本後綴**剝掉再比 —— 剝完還對得上的就是它想吃的那種，判 OK；
//   剝完 Spotify 名仍嚴格包住卡池名、且多出實質內容的，就是 Nina Simone《Gifted & Black》
//   被《Forever Young, Gifted & Black: Songs of Freedom and Spirit》吃掉的那一類，判可疑。
//
// 分級：
//   A 高度可疑 —— 剝完後仍多出 ≥8 個正規化字元，或長度比 ≥1.4。多出來的是實質字詞，不是版本標記。
//   B 中度可疑 —— 藝人對不上、或 compilation 且與卡池年份差 ≥3 年、或卡池名反被截短 ≥8 字元。
//   C 參考 —— 名稱完全吻合但年份差 ≥5 年（多半是重發盤，封面通常仍正確）。
//
// 用法：node scripts/cover-audit/4-score.mjs [--csv]
// 產出：scripts/cover-audit/data/suspects.json（＋ suspects.csv）
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const read = f => { const p = path.join(OUT, f); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {}; };

const cards = JSON.parse(fs.readFileSync(path.join(OUT, 'cards.json'), 'utf8'));
const kv = read('kv-covers.json');
const fill = read('fill-progress.json');
const meta = read('spotify-meta.json');

// ── 與 worker 同一套正規化（src/index.js 的 /spotify-search）──
const normalize = s => (s || '').toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/\byr\b\.?/g, 'your')
  .replace(/[^a-z0-9　-鿿가-힯]/g, '');

// 版本後綴：worker 的寬鬆比對就是為了吃下這些，稽核時要先剝掉才不會誤報。
// 原聲帶標記也算——《The Mack》《The Good, the Bad and the Ugly》這類卡池只寫片名、
// Spotify 掛「Original Motion Picture Soundtrack」，封面其實是對的。
const EDITION = /(remaster|remastered|deluxe|expanded|edition|anniversary|bonus|version|reissue|\bmono\b|\bstereo\b|explicit|special|legacy|collector|digital|super\s*deluxe|redux|\bcd\b|\blp\b|\d{4}\s*mix|original\s*recording|soundtrack|original\s*score|motion\s*picture|\blive\b)/i;

// 精選／合體盤標記：出現在 Spotify 名而卡池名沒有，幾乎必然是配到別張
const COMPILATION_MARK = /(best of|greatest hits|selected hits|very best|anthology|discography|collection|essential|hits\b|singles collection|retrospective)/i;
function stripEdition(raw) {
  let s = (raw || '').trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/\s*[\(\[]([^()\[\]]*)[\)\]]\s*$/, (m, inner) => EDITION.test(inner) ? '' : m);
    s = s.replace(/\s*[-–—]\s*([^-–—]*)$/, (m, tail) => EDITION.test(tail) ? '' : m);
    if (s === before) break;
  }
  return s.trim() || raw;
}

const yearOf = d => { const m = /^(\d{4})/.exec(d || ''); return m ? Number(m[1]) : null; };

const rows = [];
const stat = { total: 0, noCover: 0, caa: 0, noSpotify: 0, noMeta: 0, exact: 0, benignEdition: 0, A: 0, B: 0, C: 0, ok: 0 };

for (const c of cards) {
  const v = kv[c.key] ?? fill[c.key];
  if (v == null || v.fetchError) continue;               // 尚未掃到
  stat.total++;
  if (!v.imageUrl) { stat.noCover++; continue; }          // 查無此碟：不是配錯，另案
  if (v.coverSource === 'coverartarchive') { stat.caa++; continue; }
  const id = v.spotifyUrl?.match(/album\/([A-Za-z0-9]+)/)?.[1];
  if (!id) { stat.noSpotify++; continue; }
  const m = meta[id];
  if (!m) { stat.noMeta++; continue; }

  const nCard = normalize(c.album);
  const nSpot = normalize(m.name);
  let nSpotStripped = normalize(stripEdition(m.name));
  // Spotify 常把藝人名冠在專輯名前（"The Beach Boys Today!" vs 卡池的 "Today!"），
  // 這是同一張碟的正式全名，不是配錯，先扣掉再比。
  const nArtistPrefix = normalize(c.artist);
  if (nSpotStripped !== nCard && nSpotStripped.startsWith(nArtistPrefix) && nArtistPrefix.length > 2) {
    const cut = nSpotStripped.slice(nArtistPrefix.length);
    if (cut === nCard) nSpotStripped = cut;
  }
  const spotYear = yearOf(m.releaseDate);
  const yearGap = c.year && spotYear ? Math.abs(c.year - spotYear) : null;

  // 藝人：worker 用「正規化互相包含或前綴 fuzzy」，這裡用同樣寬鬆的標準判「有沒有一位對得上」
  // 藝人：改用「詞集合互為子集」而非 worker 的裸字串包含。
  // worker 只要互相包含就放行，於是 "Gong" 被 "GAFANIO GONGKIE" 吃掉、《You》配到一首無關單曲；
  // 但單純加長度護欄又會誤殺 "Buddy Holly" vs "Buddy Holly & The Crickets"、
  // "Sun Ra Arkestra" vs "Sun Ra"、"The Lightmen" vs "Bubbha Thomas & The Lightmen" 這些真的同一人。
  // 子集判定兩邊都吃得下，又擋得住「剛好被含在別人名字裡」的巧合。
  const nArtist = normalize(c.artist);
  const tokens = s => new Set((s || '').toLowerCase().replace(/&/g, ' and ')
    .replace(/[^a-z0-9　-鿿가-힯]+/g, ' ').trim().split(/\s+/)
    .filter(t => t && !['the', 'and', 'a', 'of'].includes(t)));
  const subset = (a, b) => a.size > 0 && [...a].every(t => b.has(t));
  const cardTok = tokens(c.artist);
  const artistOK = (m.artists || []).some(a => {
    const na = normalize(a);
    if (na && nArtist && na === nArtist) return true;
    const at = tokens(a);
    if (subset(cardTok, at) || subset(at, cardTok)) return true;
    // CJK 名字沒有空白可切詞，退回字串包含
    return /[぀-ヿ㐀-鿿가-힯]/.test(c.artist + a) && na && nArtist &&
      (na.includes(nArtist) || nArtist.includes(na));
  });

  const flags = [];
  let level = null;

  if (nSpot === nCard) stat.exact++;
  else if (nSpotStripped === nCard) stat.benignEdition++;
  else if (nSpotStripped.includes(nCard)) {
    // 剝完版本後綴，Spotify 名仍嚴格包住卡池名 → 「短名被長名吃掉」，本次要抓的主症狀
    const extra = nSpotStripped.length - nCard.length;
    const ratio = nSpotStripped.length / Math.max(1, nCard.length);
    const tail = nSpotStripped.slice(nCard.length);
    flags.push(`長名包短名 +${extra}字 ×${ratio.toFixed(2)}`);
    // 多出來的只是續作編號（Hot August Night → Hot August Night III）＝ 另一張專輯，
    // 字數差再小也是配錯，不能因為 +3 字就降級。
    const cardCJK = /[぀-ヿ㐀-鿿가-힯]/.test(c.album);
    if (/^(i{1,3}v?|vi{0,3}|\d{1,2}|part\d{1,2}|vol(ume)?\d{1,2})$/.test(tail)) {
      flags.push(`續作編號不同（多出「${tail}」）`); level = 'A';
    } else if (cardCJK && /^[a-z0-9]+$/.test(tail)) {
      // 華語卡常見：Spotify 名把英譯附在中文名後（「角度 Angle」「燒金蕉 Burnana」），
      // 多出來的全是拉丁字母 → 同一張碟的雙語標題，不是配錯。
      flags.push(`雙語標題（英譯「${tail}」）`); level = null;
    } else level = (extra >= 8 || ratio >= 1.4) ? 'A' : 'B';
  } else if (nCard.includes(nSpotStripped)) {
    // 反向：Spotify 名比卡池名短。多半是卡池帶了副標而 Spotify 沒有（無害），
    // 但短掉太多就可能是配到同名的別張（如帶副標的卡配到不帶副標的另一作）。
    const missing = nCard.length - nSpotStripped.length;
    if (missing >= 8) { flags.push(`卡池名被截短 -${missing}字`); level = 'B'; }
  } else {
    // 卡池寫羅馬拼音、Spotify 回原文（Fishmans《Uchu Nippon Setagaya》→《宇宙 日本 世田谷》）
    // 是 worker 跨語言補救層正常運作的樣子，字面上必然對不起來。這條路徑本來就有藝人 id
    // 綁定的護欄，所以只降級提示人工看，不當成配錯；藝人若也不符，下面會再拉回 A。
    const crossScript = /[぀-ヿ㐀-鿿가-힯]/.test(m.name) !== /[぀-ヿ㐀-鿿가-힯]/.test(c.album);
    if (crossScript) { flags.push('跨語言配對（需人工確認）'); level = 'B'; }
    else { flags.push('名稱不相容'); level = 'A'; }
  }

  if (!artistOK) { flags.push(`藝人不符：${(m.artists || []).join(', ')}`); level = 'A'; }
  // 精選輯／合體盤標記只出現在 Spotify 那一端 → 配到的是別張，不是這張碟的版本差異
  if (COMPILATION_MARK.test(m.name) && !COMPILATION_MARK.test(c.album)) {
    flags.push('Spotify 名帶精選輯標記'); level = 'A';
  }
  if (/\//.test(m.name) && !/\//.test(c.album) && nSpotStripped !== nCard) {
    flags.push('疑似兩張併一片的合體盤（名稱含 /）'); level = 'A';
  }
  if (m.albumType === 'compilation' && yearGap !== null && yearGap >= 3) {
    flags.push(`合輯且年份差 ${yearGap} 年`);
    // 名字一模一樣卻標 compilation，多半只是重發盤的中繼資料（Pawn Hearts、Mama Tried
    // 都屬此類，封面是對的），降到參考級；名字本來就對不上才需要人工看。
    if (level !== 'A') level = (nSpot === nCard || nSpotStripped === nCard) ? 'C' : 'B';
  }
  if (!level && yearGap !== null && yearGap >= 5) { flags.push(`年份差 ${yearGap} 年`); level = 'C'; }

  if (!level) { stat.ok++; continue; }
  stat[level]++;
  rows.push({
    level, key: c.key, artist: c.artist, album: c.album, year: c.year, sources: c.sources.join('+'),
    spotifyName: m.name, spotifyArtists: (m.artists || []).join(', '), albumType: m.albumType,
    releaseDate: m.releaseDate, label: m.label, spotifyUrl: v.spotifyUrl, imageUrl: v.imageUrl,
    flags: flags.join('；')
  });
}

const order = { A: 0, B: 1, C: 2 };
rows.sort((a, b) => order[a.level] - order[b.level] || a.artist.localeCompare(b.artist));
fs.writeFileSync(path.join(OUT, 'suspects.json'), JSON.stringify(rows, null, 1));

if (process.argv.includes('--csv')) {
  const cols = ['level', 'artist', 'album', 'year', 'sources', 'spotifyName', 'spotifyArtists', 'albumType', 'releaseDate', 'label', 'flags', 'spotifyUrl'];
  const esc = s => `"${String(s ?? '').replace(/"/g, '""')}"`;
  fs.writeFileSync(path.join(OUT, 'suspects.csv'),
    '﻿' + [cols.join(','), ...rows.map(r => cols.map(c => esc(r[c])).join(','))].join('\n'));
}

fs.writeFileSync(path.join(OUT, 'scan-stats.json'), JSON.stringify(stat, null, 1));

console.log(`已掃 ${stat.total} 張`);
console.log(`  查無此碟（無封面）      ${stat.noCover}`);
console.log(`  Cover Art Archive 補救  ${stat.caa}`);
console.log(`  有圖但無 Spotify 連結   ${stat.noSpotify}`);
console.log(`  缺 Spotify 中繼資料     ${stat.noMeta}`);
console.log(`  名稱完全吻合            ${stat.exact}`);
console.log(`  僅差版本後綴（放行）    ${stat.benignEdition}`);
console.log(`  其他判定通過            ${stat.ok}`);
console.log(`─ 可疑 ─ A ${stat.A}｜B ${stat.B}｜C ${stat.C}｜合計 ${rows.length}`);
