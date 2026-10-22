// 情緒薄格策展線（md／mc／ml）：master.json 的指定張 → 一批卡單，再分研究 a–e 組。
//   node batch-progress/mood-cells-20261022/build-cards.mjs add-20261020-ts1 <選取檔.json> <master-xx.json>
// 選取檔：["artist|album", …]（主線依地區配額挑出，寫進 rulings）。
import fs from 'node:fs';
const D = 'batch-progress/mood-cells-20261022/';
const [batch, pickFile, masterFile] = process.argv.slice(2);
const m = JSON.parse(fs.readFileSync(masterFile, 'utf8'));
const want = JSON.parse(fs.readFileSync(pickFile, 'utf8'));
const by = new Map(m.map(a => [a.artist + '|' + a.album, a]));
const n = s => String(s || '').toLowerCase().replace(/[‐-―－]/g, '-').normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const cjk = s => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(s);
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const hit = a => seed.filter(r => n(r[1]) === n(a.album) && (n(r[0]).includes(n(a.artist)) || n(a.artist).includes(n(r[0])))).length;
const list = want.map(k => { const a = by.get(k); if (!a) throw new Error('master 無 ' + k); return a; });
const per = Math.ceil(list.length / 5);
const cards = list.map((a, j) => {
  if (hit(a)) throw new Error(`撞池 ${a.artist}《${a.album}》`);
  const pre = cjk(a.artist) || cjk(a.album) ? 'desc4' : 'desc2';
  const manual = !a.mbRgMbid;
  const alias = [...new Set([a.queryAlias, a.mb?.title, a.mb?.credit].flatMap(x => String(x || '').split('；')).filter(x => x && n(x) !== n(a.album) && n(x) !== n(a.artist)))];
  return {
    key: `${pre}:${a.artist}|${a.album}`, artist: a.artist, album: a.album, year: a.year,
    genre: a.genres[0], genres: a.genres, label: a.label, country: a.country, moodGuess: a.moodGuess || null,
    rgMbid: a.mbRgMbid || '', identitySource: manual ? 'manual' : 'pinned',
    ...(manual ? { mbAbsenceProof: a.mbAbsenceProof, manualEvidenceUrls: a.manualEvidenceUrls } : {}),
    curatorWhy: `${a.factionZh}：${a.why}`,
    curatorRisk: a.uncertain ? `⚠ ${a.uncertain}` : '',
    mbNote: manual ? `MB 查無（${a.mbAbsenceProof?.conclusion || ''}），走 §1 人工身分。證據：${[...(a.manualEvidenceUrls || []), ...(a.evidence || [])].join(' ')}`
      : `MB release-group ${a.mbRgMbid}：title「${a.mb?.title}」、${a.mb?.type}${a.mb?.sec?.length ? '＋' + a.mb.sec.join('＋') : ''}、first-release-date ${a.mb?.date || '（空）'}、artist-credit「${a.mb?.credit}」。證據：${(a.evidence || []).join(' ')}`,
    releaseType: a.releaseException ? 'Compilation' : 'Album', exceptionReason: a.releaseException || '', exceptionEvidenceUrls: a.releaseException ? (a.evidence || []) : [], genreException: '',
    selfTitled: n(a.artist) === n(a.album), apex: null, group: 'abcde'[Math.floor(j / per)],
    lineType: '廣度', scene: `薄細項策展線（${a.factionZh}）`, queryAlias: alias.join('；'), republic: '', cover: null,
  };
});
fs.mkdirSync(`batch-progress/${batch}`, { recursive: true });
fs.writeFileSync(`desc-tools/batches/cards/${batch}-cards.json`, JSON.stringify(cards, null, 1));
const g = cards.reduce((o, c) => (o[c.group] = (o[c.group] || 0) + 1, o), {});
const cc = cards.reduce((o, c) => (o[c.country] = (o[c.country] || 0) + 1, o), {});
console.log(batch, cards.length, JSON.stringify(g), JSON.stringify(cc), '人工', cards.filter(c => c.identitySource === 'manual').length);
