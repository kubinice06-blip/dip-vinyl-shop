// 卡池封面稽核 步驟 7：拿稽核清單回歸驗證 worker 的新判定邏輯。
//
// 要回答兩個問題：
//   1. 新的 artistMatches（詞集合子集）會不會誤殺現有正確配對？
//   2. 新的 albumEffectivelyExact 有沒有正確分流——正確配對走「直接信任」不勞動覆核層，
//      A 級可疑則落到「模糊命中」而會被 MB 覆核？
//
// 這裡的判定函式是從 `dip-vinyl-worker/src/index.js` 抄過來的。為了避免兩邊悄悄走鐘，
// 下面會先檢查 worker 原始碼裡仍含有幾段特徵字串，對不上就直接失敗。
//
// 用法：node scripts/cover-audit/7-verify-worker-logic.mjs
import fs from 'node:fs';
import path from 'node:path';

const WORKER = path.resolve(process.cwd(), '..', 'dip-vinyl-worker', 'src', 'index.js');
const src = fs.readFileSync(WORKER, 'utf8');
const SIGNATURES = [
  'const subsetOf = (a, b) => a.size > 0 && [...a].every(t => b.has(t))',
  'const albumEffectivelyExact = (name) => {',
  'const resolveFromCoverArt = async (requireExactTitle) => {',
  "(!requireExactTitle || normalize(g.title) === searchAlbum)",
  'pickedExact = picked.exact || albumEffectivelyExact(picked.item.name)'
];
const missing = SIGNATURES.filter(s => !src.includes(s));
if (missing.length) {
  console.error('worker 原始碼與本驗證腳本已不同步，缺少：');
  missing.forEach(s => console.error('  ' + s));
  process.exit(1);
}

// ── 以下與 worker 的 /spotify-search 同步 ──
const normalize = s => (s || '').toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/\byr\b\.?/g, 'your')
  .replace(/[^a-z0-9　-鿿가-힯]/g, '');
const hasCJK = s => /[぀-ヿ㐀-鿿가-힯]/.test(s || '');
const EDITION = /(remaster|remastered|deluxe|expanded|edition|anniversary|bonus|version|reissue|\bmono\b|\bstereo\b|explicit|special|legacy|collector|digital|redux|\d{4}\s*mix|original\s*recording|soundtrack|original\s*score|motion\s*picture)/i;
const stripEdition = (raw) => {
  let s = (raw || '').trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/\s*[\(\[]([^()\[\]]*)[\)\]]\s*$/, (m, inner) => EDITION.test(inner) ? '' : m);
    s = s.replace(/\s*[-–—]\s*([^-–—]*)$/, (m, tail) => EDITION.test(tail) ? '' : m);
    if (s === before) break;
  }
  return s.trim() || raw;
};
const STOPWORDS = ['the', 'and', 'a', 'of'];
const tokenize = s => new Set((s || '').toLowerCase().replace(/&/g, ' and ')
  .replace(/[^a-z0-9　-鿿가-힯]+/g, ' ').trim().split(/\s+/)
  .filter(t => t && !STOPWORDS.includes(t)));
const subsetOf = (a, b) => a.size > 0 && [...a].every(t => b.has(t));

const make = (artist, album) => {
  const searchArtist = normalize(artist), searchAlbum = normalize(album);
  const cardArtistTokens = tokenize(artist);
  const artistMatches = (names) => searchArtist.length > 2 && (names || []).some(nm => {
    const na = normalize(nm);
    if (na && na === searchArtist) return true;
    const at = tokenize(nm);
    if (subsetOf(cardArtistTokens, at) || subsetOf(at, cardArtistTokens)) return true;
    return hasCJK(artist + nm) && na && (na.includes(searchArtist) || searchArtist.includes(na));
  });
  const albumEffectivelyExact = (name) => {
    const n = normalize(stripEdition(name));
    if (n === searchAlbum) return true;
    return searchArtist.length > 2 && n.startsWith(searchArtist) && n.slice(searchArtist.length) === searchAlbum;
  };
  return { artistMatches, albumEffectivelyExact };
};

// ── 針對已知案例的定點測試 ──
const CASES = [
  // [卡池藝人, 卡池專輯, Spotify 藝人, Spotify 專輯, 期望 artistOK, 期望 effectivelyExact, 說明]
  ['Gong', 'You', 'GAFANIO GONGKIE', 'Your little flaws that attract me', false, false, '短名被含在別人名字裡（本次要修的）'],
  ['The Birthday Party', 'Junkyard', 'No Party For Cao Dong', '醜奴兒', false, false, '跨語言誤放行（本次要修的）'],
  ['Buddy Holly', 'The "Chirping" Crickets', 'Buddy Holly & The Crickets', 'The "Chirping" Crickets', true, true, '同一人，不可誤殺'],
  ['Sun Ra Arkestra', 'Sleeping Beauty', 'Sun Ra', 'Sleeping Beauty', true, true, '同一人，不可誤殺'],
  ['The Lightmen', 'Energy Control Center', 'Bubbha Thomas & The Lightmen', 'Energy Control Center', true, true, '同一人，不可誤殺'],
  ['Miles Davis', "Workin' with the Miles Davis Quintet", 'Miles Davis Quintet', "Workin' With The Miles Davis Quintet", true, true, '同一人，不可誤殺'],
  ['The Beatles', 'Abbey Road', 'The Beatles', 'Abbey Road (Remastered)', true, true, '版本後綴 → 直接信任，不勞動覆核'],
  ['The Beach Boys', 'Today!', 'The Beach Boys', 'The Beach Boys Today! (Remastered)', true, true, '藝人前綴 → 直接信任'],
  ['Willie Hutch', 'The Mack', 'Willie Hutch', 'The Mack - Original Motion Picture Soundtrack', true, true, '原聲帶後綴 → 直接信任'],
  ['Led Zeppelin', 'Led Zeppelin II', 'Led Zeppelin', 'Led Zeppelin III (Remaster)', true, false, '配到續作 → 必須落到覆核'],
  ['Santana', 'Santana', 'Santana', "Santana's Greatest Hits", true, false, '配到精選輯 → 必須落到覆核'],
  ['Nino Rota', 'The Godfather', 'Nino Rota', 'The Godfather Part II (Original Soundtrack Recording)', true, false, '配到續作 → 必須落到覆核'],
  ['Nina Simone', 'Gifted & Black', 'Nina Simone', 'Forever Young, Gifted & Black: Songs of Freedom and Spirit', true, false, '任務描述的原始案例'],
];
let pass = 0, fail = 0;
for (const [ca, cal, sa, sal, expArtist, expExact, note] of CASES) {
  const { artistMatches, albumEffectivelyExact } = make(ca, cal);
  const gotArtist = artistMatches([sa]);
  const gotExact = gotArtist && albumEffectivelyExact(sal);
  const ok = gotArtist === expArtist && gotExact === expExact;
  ok ? pass++ : fail++;
  if (!ok) console.log(`✗ ${ca} / ${cal} → ${sa} / ${sal}｜artistOK ${gotArtist}(期望 ${expArtist})、exact ${gotExact}(期望 ${expExact})｜${note}`);
}
console.log(`定點測試：通過 ${pass}／${pass + fail}`);

// ── 拿全稽核資料做回歸：正確配對會不會被改判？ ──
const D = path.join(process.cwd(), 'scripts', 'cover-audit', 'data');
const cards = JSON.parse(fs.readFileSync(path.join(D, 'cards.json'), 'utf8'));
const byKey = new Map(cards.map(c => [c.key, c]));
const meta = JSON.parse(fs.readFileSync(path.join(D, 'spotify-meta.json'), 'utf8'));
const suspects = new Map(JSON.parse(fs.readFileSync(path.join(D, 'suspects.json'), 'utf8')).map(r => [r.key, r]));
const read = f => JSON.parse(fs.readFileSync(path.join(D, f), 'utf8'));
const all = { ...read('kv-covers.json'), ...read('fill-progress.json') };

let trusted = 0, verify = 0, artistRejected = 0;
const rejectedGood = [], verifiedGood = [];
for (const [key, v] of Object.entries(all)) {
  if (!v?.spotifyUrl || v.coverSource === 'coverartarchive') continue;
  const id = v.spotifyUrl.match(/album\/([A-Za-z0-9]+)/)?.[1];
  const m = id && meta[id];
  if (!m) continue;
  const c = byKey.get(key);
  const { artistMatches, albumEffectivelyExact } = make(c.artist, c.album);
  const level = suspects.get(key)?.level ?? null;
  if (!artistMatches(m.artists || [])) {
    artistRejected++;
    if (!level) rejectedGood.push(`${c.artist} / ${c.album} → ${(m.artists || []).join(', ')} 《${m.name}》`);
    continue;
  }
  if (albumEffectivelyExact(m.name)) {
    trusted++;
    if (level === 'A') verifiedGood.push(`[漏網] ${c.artist} / ${c.album} → 《${m.name}》`);
  } else {
    verify++;
  }
}
console.log(`\n回歸（${trusted + verify + artistRejected} 張 Spotify 配對）：`);
console.log(`  直接信任、不跑覆核    ${trusted}`);
console.log(`  落到 MB 覆核          ${verify}`);
console.log(`  藝人比對就擋掉        ${artistRejected}`);
console.log(`\n被藝人比對擋掉、但稽核未標記為可疑的（需人工看是否誤殺）：${rejectedGood.length}`);
rejectedGood.slice(0, 20).forEach(s => console.log('   ' + s));
console.log(`\nA 級卻仍被判「直接信任」的漏網：${verifiedGood.length}`);
verifiedGood.slice(0, 20).forEach(s => console.log('   ' + s));
process.exit(fail ? 1 : 0);
