// add-20261014：店主指定溫蒂漫步兩張、事後菸（Cigarettes After Sex）補兩張。
//   node batch-progress/add-20261014/build-cards.mjs
import fs from 'node:fs';
const n = s => String(s || '').toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, '');
const seed = JSON.parse(fs.readFileSync('seed_cards.json', 'utf8'));
const L = [
 { artist: '溫蒂漫步 Wendy Wander', album: 'Spring Spring', year: 2020, genres: ['pop', 'rock'], label: '睦木文化', rg: '0e3a67c7-c098-4964-b278-9cc0099d7353', upc: '4711099640874', mbTitle: 'Spring Spring', credit: '溫蒂漫步', date: '2020-11-04', why: '台北雙主唱樂團的首張專輯，dream pop／synth-pop 的慵懶夜色；店主點名為「要死不活」情緒區例子', ev: ['https://www.last.fm/music/%E6%BA%AB%E8%92%82%E6%BC%AB%E6%AD%A5'] },
 { artist: '溫蒂漫步 Wendy Wander', album: 'Midnight Blue', year: 2023, genres: ['pop', 'rock'], label: '睦木文化／魔岩文化', rg: '43abdb54-8481-4fcb-ad57-f3fdef55ca88', upc: '4711232864891', mbTitle: 'Midnight Blue', credit: '溫蒂漫步', date: '2023-12-02', why: '第二張專輯，延續夜晚與藍色調的 dream pop', ev: [] },
 { artist: 'Cigarettes After Sex', album: 'Cry', year: 2019, genres: ['pop', 'rock'], label: 'Partisan Records', rg: '21759bba-54bc-4357-8f17-a6bcd50e0aa3', upc: '720841217305', mbTitle: 'Cry', credit: 'Cigarettes After Sex', date: '2019-10-25', why: '事後菸（台灣通稱）第二張專輯，慢板 ambient pop／dream pop；同名首張已在池', ev: ['https://en.wikipedia.org/wiki/Cry_(Cigarettes_After_Sex_album)'] },
 { artist: 'Cigarettes After Sex', album: "X's", year: 2024, genres: ['pop', 'rock'], label: 'Partisan Records', rg: '34d33075-e1ae-4bca-aacb-ee20857f2672', upc: '0720841303503', mbTitle: 'X’s', credit: 'Cigarettes After Sex', date: '2024-07-12', why: '事後菸第三張專輯，失戀題材的 dream pop', ev: ['https://en.wikipedia.org/wiki/X%27s_(album)'] },
];
const cjk = s => /[぀-ヿ㐀-鿿豈-﫿가-힯]/.test(s);
const cards = L.map(a => {
  const hit = seed.filter(r => n(r[1]) === n(a.album) && (n(r[0]).includes(n(a.artist)) || n(a.artist).includes(n(r[0])) || n(r[0]).includes('wendywander') || n(r[0]).includes('溫蒂漫步')));
  if (hit.length) throw new Error('撞池 ' + a.artist + ' ' + a.album);
  const pre = cjk(a.artist) || cjk(a.album) ? 'desc4' : 'desc2';
  return { key: `${pre}:${a.artist}|${a.album}`, artist: a.artist, album: a.album, year: a.year, genre: a.genres[0], genres: a.genres, label: a.label,
    rgMbid: a.rg, upc: a.upc, identitySource: 'pinned', curatorWhy: `店主指定：${a.why}`,
    curatorRisk: a.mbTitle !== a.album ? `⚠ MB 標題「${a.mbTitle}」用彎引號，卡名照卡池多數寫法改直引號` : '',
    mbNote: `MB release-group ${a.rg}：title「${a.mbTitle}」、Album、first-release-date ${a.date}、artist-credit「${a.credit}」。證據：${['https://musicbrainz.org/release-group/' + a.rg, ...a.ev].join(' ')}`,
    releaseType: 'Album', exceptionReason: '', exceptionEvidenceUrls: [], genreException: '', selfTitled: false, apex: null, group: 'a',
    lineType: '廣度', scene: '店主指定（情緒三軸「要死不活」例子）', queryAlias: a.artist.startsWith('溫蒂') ? 'Wendy Wander；溫蒂漫步' : '事後菸', republic: '', cover: null };
});
fs.writeFileSync('desc-tools/batches/cards/add-20261014-cards.json', JSON.stringify(cards, null, 1));
console.log(cards.map(c => c.key).join('\n'));
