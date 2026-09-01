// 落實 c-53 c 組（蘇聯爵士）研究層的更正。冪等。
import fs from 'node:fs';
const FIX = [
  // Архангельск《Portrait》：MB 把「錄音日」填進了 first-release-date，
  // 卡片的 1991 因此是錄音年不是發行年。三處來源都同意錄於 1991-11-28 英國 Leicester；
  // 發行年 Leo 官網記 1992、Discogs 記 1995。**採廠牌自己的 1992**——
  // Leo 是這張的發行方，比第三方資料庫優先。
  { key: 'Архангельск|Portrait', year: 1992,
    why: '蘇聯／後蘇聯自由即興的代表錄音之一，1991 年 11 月 28 日錄於英國 Leicester，Leo Records 發行。注意：MusicBrainz 把錄音日填進了 first-release-date，1991 是錄音年不是發行年；也不能寫成「北方港城的現場」——錄音地在英國。' },
  // Raimonds Pauls：封面副標印「Estrādes melodiju popūrijs／A medley of popular tunes」，
  // 演出含拉脫維亞電視廣播綜藝管弦樂團，碟上沒有爵士三重奏編制，
  // Discogs 曲風標 Easy Listening／Free Improvisation／Schlager。
  // 掛 jazz 與唱片實際內容不符，改 pop（estrada 就是蘇聯的流行歌體例）。
  { key: 'Raimonds Pauls|Melodija, improvizācija, ritms', genres: ['pop'],
    why: '拉脫維亞 estrada 的代表作，封面副標印「Estrādes melodiju popūrijs」（流行旋律組曲），由拉脫維亞電視廣播綜藝管弦樂團演出。注意：原策展理由稱本作是「他爵士面向唯一完整的一張唱片」不成立——碟上沒有爵士三重奏編制，曲風實為 estrada 與輕音樂，曲風欄因此由 jazz 改為 pop。' },
  // Мустафазаде：Мелодия 有三張同名的《Джазовые композиции》（1974／1975／1979），
  // 只有目錄號能區分，「生前最主要的一張正式發行」的最高級說法不成立。
  { key: 'Вагиф Мустафазаде|Джазовые Композиции',
    why: '亞塞拜然的 jazz-mugham 代表人物，本作是鋼琴三重奏加人聲（Эльза Мустафа-заде），曲目並置兩首亞塞拜然民歌與 Monk 的〈Bemsha Swing〉。注意：Мелодия 有三張同名的《Джазовые композиции》（1974／1975／1979），只有目錄號能區分，不得稱本張為「生前最主要的一張正式發行」。' },
];
let n = 0;
for (const p of ['batch-progress/c53/prop-c.json', 'desc-tools/batches/cards/c53-cards.json']) {
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const r of rows) for (const f of FIX) {
    if (`${r.artist}|${r.album}` !== f.key) continue;
    if (f.year != null && r.year !== f.year) { r.year = f.year; n++; }
    if (f.genres) {
      if (JSON.stringify(r.genres) !== JSON.stringify(f.genres)) { r.genres = [...f.genres]; n++; }
      if ('genre' in r && r.genre !== f.genres[0]) { r.genre = f.genres[0]; n++; }
    }
    const field = 'curatorWhy' in r ? 'curatorWhy' : 'why';
    if (r[field] !== f.why) { r[field] = f.why; n++; }
  }
  fs.writeFileSync(p, JSON.stringify(rows, null, 1));
}
console.log(`更正 ${n} 處`);
