// downtempo 線：master.json → 5 批卡單（add-20261011-dt1…dt5），每批再分研究 a–e 組。
//   node batch-progress/downtempo-20261011/build-cards.mjs
import fs from 'node:fs';
const D = 'batch-progress/downtempo-20261011/';
const m = JSON.parse(fs.readFileSync(D + 'master.json', 'utf8'));
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const cjk = s => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(s);
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const hit = a => seed.filter(r => n(r[1]) === n(a.album) && (n(r[0]).includes(n(a.artist)) || n(a.artist).includes(n(r[0])))).length;
const SIZES = [45, 45, 45, 44, 44];
let i = 0;
const slices = SIZES.map((sz, b) => { const s = m.slice(i, i + sz); i += sz; return s; });
if (i !== m.length) throw new Error(`張數對不上 ${i}/${m.length}`);
slices.forEach((list, b) => {
  const batch = `add-20261011-dt${b + 1}`;
  const cards = list.map((a, j) => {
    if (hit(a)) throw new Error(`撞池 ${a.artist}《${a.album}》`);
    const pre = cjk(a.artist) || cjk(a.album) ? 'desc4' : 'desc2';
    const alias = [...new Set([a.mb.title, a.mb.credit].filter(x => x && n(x) !== n(a.album) && n(x) !== n(a.artist)))];
    return {
      key: `${pre}:${a.artist}|${a.album}`, artist: a.artist, album: a.album, year: a.year,
      genre: a.genres[0], genres: a.genres, label: a.label, rgMbid: a.mbRgMbid, identitySource: 'pinned',
      curatorWhy: `${a.factionZh}：${a.why}`,
      curatorRisk: a.uncertain ? `⚠ ${a.uncertain}` : '',
      mbNote: `MB release-group ${a.mbRgMbid}：title「${a.mb.title}」、${a.mb.type}${a.mb.sec.length ? '＋' + a.mb.sec.join('＋') : ''}、first-release-date ${a.mb.date || '（空）'}、artist-credit「${a.mb.credit}」。證據：${a.evidence.join(' ')}`,
      releaseType: 'Album', exceptionReason: '', exceptionEvidenceUrls: [], genreException: '',
      selfTitled: n(a.artist) === n(a.album), apex: null, group: 'abcde'[Math.floor(j / Math.ceil(list.length / 5))],
      lineType: '廣度', scene: `downtempo／chill dub 策展線（${a.factionZh}）`, queryAlias: alias.join('；'), republic: '', cover: null,
    };
  });
  fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
  const g = cards.reduce((o, c) => (o[c.group] = (o[c.group] || 0) + 1, o), {});
  console.log(batch, cards.length, JSON.stringify(g), cards[0].artist, '…', cards.at(-1).artist);
});
