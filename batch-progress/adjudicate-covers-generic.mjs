// 封面裁決：worker 的搜尋會回「查得到的最像的東西」，不是「同一張碟」。
// 實測 12 個命中裡 5 個錯配，錯法有三類，全部在這裡擋掉：
//   (1) 單曲冒充專輯：《Kebyar Kebyar》《Menghitung Bintang》都配到 1 軌單曲。
//       這與 2026-08-31 在 Apple 試聽探測抓到的是同一個病，來源換了、病沒換。
//   (2) 卷號撞名：Panbers《Volume 1》配到英國廠牌的《Chav Bangers Volume 1》——
//       「Volume 1」這種標題本身沒有識別力，只有加上藝人才有。
//   (3) 別的作品／合集冒充原盤：Koes Plus《Volume 4》配到《Pop Melayu Volume 4》(1976)、
//       Zainal Abidin 1991 原盤配到 43 軌的 2013 合集。
import fs from 'node:fs';
const [IN, OUT] = process.argv.slice(2);
if (!IN || !OUT) { console.error('用法: node batch-progress/adjudicate-covers-generic.mjs <covers.json> <out.json>'); process.exit(1); }
const rows = JSON.parse(fs.readFileSync(IN, 'utf8'));

const norm = s => (s || '').toLowerCase().normalize('NFKD')
  .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
const tokens = s => new Set((s || '').toLowerCase()
  .replace(/[^a-z0-9一-鿿]+/g, ' ').trim().split(/\s+/).filter(Boolean));

// 從 og:title 取出來源端的作品名：「X - Album by Y | Spotify」「X, by Y」
const srcWork = (t, source) => {
  if (!t) return '';
  if (source === 'spotify') return t.replace(/\s*-\s*(Album|Single|EP|Compilation)\s+by\s.*$/i, '').trim();
  return t.replace(/,\s*by\s.*$/i, '').trim();
};
const srcArtist = (t, source) => {
  if (!t) return '';
  const m = source === 'spotify' ? t.match(/\bby\s+(.*?)\s*\|\s*Spotify/i) : t.match(/,\s*by\s+(.*)$/i);
  return (m && m[1] || '').trim();
};

const verdicts = [];
for (const r of rows) {
  if (!r.cover) { verdicts.push({ ...r, verdict: 'none' }); continue; }
  const c = r.cover, reasons = [];
  const work = srcWork(c.srcTitle, c.source);
  const artist = srcArtist(c.srcTitle, c.source);
  const desc = c.srcDesc || '';

  // (1) 單曲／單軌
  const isSingle = /·\s*single\s*·/i.test(desc) || /\bSingle by\b/i.test(c.srcTitle);
  const trackM = desc.match(/(\d+)\s+(songs?|track)/i);
  const tracks = trackM ? Number(trackM[1]) : null;
  // 「軌數少」不能當否決理由：長篇作品本來就一到兩軌。拿線上 2,173 張有 Spotify
  // 中繼資料的卡實測，≤2 軌的 11 張裡有 6 張是正確配對——Klaus Schulze《Timewind》、
  // Miles Davis《In a Silent Way》《A Tribute to Jack Johnson》《Pangaea》、
  // Pharoah Sanders《Black Unity》都是整面一首的碟。可靠的訊號是 Spotify 自己標的
  // albumType=single 或標題帶「- Single」，不是軌數。
  if (isSingle) reasons.push('來源是單曲，不是專輯');
  else if (tracks !== null && tracks <= 2) reasons.push(`來源只有 ${tracks} 軌（長篇作品可能正常，需確認）`);
  if (tracks !== null && tracks >= 25) reasons.push(`來源 ${tracks} 軌，像合集不像原盤`);

  // (2)(3) 作品名比對：來源作品名必須「等於」或「以卡片名結尾」（容許 Soneta: X, Vol. N 這種前後綴）
  const a = norm(r.album), w = norm(work);
  const titleOk = w === a || w.includes(a);
  if (!titleOk) reasons.push(`作品名對不上：來源《${work}》`);
  // 來源名比卡片名長很多時，多出來的字可能是「別的作品」而不是版本後綴
  if (titleOk && w.length > a.length + 12) reasons.push(`來源作品名比卡片名長很多（《${work}》），需確認不是別作`);

  // 藝人比對：詞集合要有交集（Various Artists 與合輯除外）
  if (artist && !/various artists/i.test(r.artist)) {
    const ta = tokens(r.artist), tb = tokens(artist);
    const overlap = [...ta].some(t => tb.has(t));
    if (!overlap) reasons.push(`藝人對不上：來源掛「${artist}」`);
  }
  if (c.httpStatus < 200 || c.httpStatus >= 400) reasons.push(`圖檔 HTTP ${c.httpStatus}`);

  // 硬否決＝可證明是別的東西；其餘旗標只代表「要人看」，不代表錯
  //（Rhoma Irama《Santai》的來源名是「Soneta Group: Santai, Vol. 7」，
  //  長度旗標會誤殺，但那就是同一張碟——所以長度與藝人差異一律落到 ruling）
  const HARD = [/來源是單曲/, /像合集不像原盤/, /作品名對不上/, /圖檔 HTTP/];
  const hard = reasons.filter(x => HARD.some(re => re.test(x)));
  const verdict = hard.length ? 'reject' : (reasons.length || c.yearMismatch ? 'ruling' : 'accept');
  verdicts.push({ ...r, verdict, reasons, srcWork: work, srcArtist: artist, tracks });
}
fs.writeFileSync(OUT, JSON.stringify(verdicts, null, 1));
for (const v of ['accept', 'ruling', 'reject']) {
  const list = verdicts.filter(x => x.verdict === v);
  console.log(`\n== ${v.toUpperCase()} (${list.length}) ==`);
  for (const x of list) console.log(` ${x.artist} 《${x.album}》` +
    (x.reasons?.length ? '\n     ✗ ' + x.reasons.join('；') : '') +
    (x.cover?.yearMismatch && v === 'ruling' ? '\n     ⚠ ' + x.cover.yearMismatch + '｜來源《' + x.srcWork + '》' + x.tracks + ' 軌' : ''));
}
console.log(`\n無封面 ${verdicts.filter(x => x.verdict === 'none').length}`);
