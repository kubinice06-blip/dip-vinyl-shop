// add-20261103：濁水溪公社《台客的復仇》研究稿與寫作稿（主線單張，研究＋寫作由主線執行）
const fs = require('fs');
const path = require('path');
const DT = path.resolve(__dirname, '../../desc-tools/batches');
const key = 'desc4:濁水溪公社|台客的復仇';
const R = [{
  key, artist: '濁水溪公社', album: '台客的復仇',
  facts: [
    { f: 'MB release-group 500b56c7：Album、無 secondary type，first-release-date 1999-05-10、台灣、條碼 4719260991428，18 軌。', src: 'https://musicbrainz.org/release-group/500b56c7-1350-4876-966e-ebcd41d9cba7' },
    { f: 'MB release f174cde8 曲目：1〈農村出事情〉、3〈原住民最屌〉長 5 秒、8〈探功德〉、18〈探功德 2〉；全盤無同名曲。', src: 'https://musicbrainz.org/release/f174cde8-760e-42da-92bd-238e4b4b0c3a' },
    { f: "Discogs release 4813793：《台客的復仇 = Taik's Eye For An Eye》，Keboyin Music（喜樂音）99142，1999 台灣，同條碼。", src: 'https://www.discogs.com/release/4813793' },
    { f: '中文維基：1995《肛門樂慾期作品輯》（友善的狗）、1999《台客的復仇》（喜樂音唱片）、2001《臭死了》；本張是第二張專輯。〈農村出事情〉至今仍是社運場合常聽見的歌曲。', src: 'https://zh.wikipedia.org/wiki/濁水溪公社' },
    { f: '中文維基〈台客〉：1999 年五月獨立樂團濁水溪公社出版了《台客的復仇》搖滾台語專輯；專輯中並沒有同名歌曲。2005 年後社會開始為台客一詞去污名化。', src: 'https://zh.wikipedia.org/wiki/台客' },
    { f: "Taipei Times 2010-09-03：classic album Taik's Eye for an Eye melded nakashi melodies and punk with Hoklo lyrics；came out in 1999, well before taike became hip；taike used to be a derogatory term。柯仁堅台大時與同學、共同創團人蔡海恩參與學運，常為抗議編短劇、做道具。", src: 'https://www.taipeitimes.com/News/feat/archives/2010/09/03/2003481971' },
    { f: '〈農村出事情〉作者蔡海恩，收於《台客的復仇》（1999）。', src: 'https://vocus.cc/article/602f3f42d110b4bc8a07ca1a' },
    { f: '英文維基：蔡海恩與柯仁堅兩位吉他手共同擔任主唱，皆曾就讀台大。', src: 'https://en.wikipedia.org/wiki/LTK_Commune' },
  ],
  unverified: ['馬世芳拍賣本盤創台灣二手 CD 最高價（僅見搜尋摘要、原文 403，不採用）'],
}];
const desc = '盤名叫《台客的復仇》，十八首歌裡卻找不到一首同名曲。1999 年 5 月，濁水溪公社在喜樂音發行這第二張專輯，英文盤名取作 Taik\'s Eye For An Eye，把那卡西旋律、龐克與台語歌詞攪在一起。兩位吉他手柯仁堅與蔡海恩是台大同學，學運時就一起編短劇、做抗議道具。蔡海恩寫的〈農村出事情〉打頭陣，至今仍在社運場合被唱起；〈原住民最屌〉只有五秒，〈探功德〉則在第 8 軌與最後一軌各出現一次。那時「台客」還是罵人的話，要到 2005 年才被翻成時髦標籤。';
fs.writeFileSync(path.join(DT, 'research/add-20261103-a.json'), JSON.stringify(R, null, 1));
fs.writeFileSync(path.join(DT, 'output/add-20261103-out-1.json'), JSON.stringify([{ key, desc }], null, 1));
console.log('len', Array.from(desc).length);
