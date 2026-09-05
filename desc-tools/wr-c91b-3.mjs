import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:美秀集團 Amazing Show|多色寶山大王", artist:"美秀集團 Amazing Show", album:"多色寶山大王",
 facts:[
  {f:"MusicBrainz release-group ded206c8 的欄位：title《多色寶山大王》、artist-credit「美秀集團」、first-release-date 2021-10-08、primary-type Album、secondary-types 空、轄下 TW 與 XW 兩個 Official release，皆 12 軌，XW 那筆的廠牌欄填「火玄火包」。",src:"https://musicbrainz.org/release-group/ded206c8-1f5e-4fa2-b561-8490259d897f"},
  {f:"十二軌的曲序：〈我要你愛〉〈金光閃閃〉〈罪愛1995〉〈懲罰〉〈馬克吐溫〉〈戰鬥菸〉〈殭屍王〉〈花光月影〉〈心悶〉〈白鯨〉〈哥哥呀哥哥〉〈做夢的人〉。",src:"https://musicbrainz.org/release/86a3dbd7-0e04-47b7-9eda-3bb4c85073f3"},
  {f:"中文維基〈美秀集團〉的單曲表顯示碟上四首在專輯之前已先以單曲發行：〈我要你愛〉2019 年 8 月 23 日、〈殭屍王〉2020 年 12 月 18 日、〈馬克吐溫〉2021 年 1 月 22 日，另有 2021 年 2 月 11 日與木曜四超玩跨界演唱會合作的〈哥哥呀哥哥〉。",src:"https://zh.wikipedia.org/zh-tw/%E7%BE%8E%E7%A7%80%E9%9B%86%E5%9C%98"},
  {f:"第 33 屆金曲獎（2022 年）美秀集團以《多色寶山大王》入圍最佳樂團獎，未得獎，該獎由血肉果汁機《GOLDEN 太子 BRO》拿下。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC33%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"同屆最佳MV獎，林毛執導的〈馬克吐溫〉（收錄專輯欄填《多色寶山大王》、報名單位火玄火包股份有限公司）入圍未得獎，得獎者為蔡宜豫執導的余佩真〈甘吧爹ㄋㄟ〉。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC33%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"中文維基〈美秀集團〉記樂團出道地點是嘉義，團名「美秀」取自主唱狗柏與鍵盤手冠佑兩位母親的名字；樂團自製過兩件特殊樂器，2015 年做成的「台八線」與 2016 年 9 月在自家頻道以「美秀電器」為題介紹的「炫炮」。",src:"https://zh.wikipedia.org/zh-tw/%E7%BE%8E%E7%A7%80%E9%9B%86%E5%9C%98"},
  {f:"十二軌的曲長從〈罪愛1995〉的 3:06 到〈馬克吐溫〉的 5:05。",src:"https://musicbrainz.org/release/86a3dbd7-0e04-47b7-9eda-3bb4c85073f3"},
  {f:"Apple Music 台灣店面的條目（collectionId 1602224027）：標題《多色寶山大王》、掛名美秀集團、12 軌、releaseDate 2021-10-08、notExplicit。",src:"https://music.apple.com/tw/album/1602224027"}
 ],
 hookCandidates:["這張碟有四首歌在專輯出來以前就先當單曲跑過一輪","樂團的名字，是主唱和鍵盤手兩位母親的名字拼起來的"],
 sound:"十二軌的曲長從 3:06 到 5:05，最長的〈馬克吐溫〉也是全碟唯一入圍金曲獎 MV 的一首。（本欄由 MB release 的逐軌曲長與中文維基的單曲表歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["馬克吐溫","我要你愛","殭屍王"],
 status:"full",
 notes:"**獎項逐項查（第 5 條）**：本張在第 33 屆金曲獎是**兩項入圍、零得獎**（最佳樂團獎、最佳MV獎），兩項的得獎者都不是美秀集團。中文維基〈美秀集團〉的獎項表也把這兩項標 nom。**行文不得寫成得獎。** 本張在金音創作獎查無任何入圍紀錄。\n**廠牌名「火玄火包」四個字要照抄**：MB 的 XW release 與金曲獎報名單位（火玄火包股份有限公司）都是這個寫法。\n**「自製樂器」的兩件要分開**：台八線（2015 年做成）與炫炮（2016 年介紹），**不得寫成同一件、也不得寫成「這張碟上用了自製樂器」**——中文維基沒有把自製樂器綁到本張碟上（第 110 條）。\n**試聽**：`previews.json` 標 ready、`tw:1→1`、collectionId 1602224027、12 軌、notExplicit，逐軌與 MB 相符（第 1 軌兩邊都是〈我要你愛〉）。**無異議**。\n**互斥分派——本張獨占「先行單曲」「團名由來與自製樂器」「第 33 屆金曲獎兩項入圍」三條線。** 同批《美秀集團同名專輯》不得重述團名由來與自製樂器。",
});
W({
 key:"desc4:美秀集團 Amazing Show|美秀集團同名專輯", artist:"美秀集團 Amazing Show", album:"美秀集團同名專輯",
 facts:[
  {f:"MusicBrainz release-group cd639762 的欄位：title《美秀集團同名專輯》、artist-credit「美秀集團」、first-release-date 2024-09-30、primary-type Album、secondary-types 空、轄下 TW 與 XW 兩個 Official release，皆 11 軌，TW 那筆由火玄火包發行、編號 KK031427。",src:"https://musicbrainz.org/release-group/cd639762-e9c2-42ff-9607-284fbc102bf7"},
  {f:"中文維基〈美秀集團〉的常規專輯表把本張列為第 3 張，並替每一軌附了英文副題：〈最帥的人 Chosen One〉〈高速公路 Highway〉〈冥戰錄 feat. 孫翠鳳 Apocalypse〉〈魔神 Ragnarok〉〈床母記號 Birthmark〉〈手機錢包鑰匙菸 feat. 盧廣仲 Phone, Wallet, Keys, Cigarettes〉〈深淵 Abyss〉〈被愛 Be Loved〉〈偷偷愛 The Ballad of Matt〉〈我只是需要被需要的感覺 I Need Nothing But to Be Needed〉〈愛情的大壞蛋 Bastards of Love〉。",src:"https://zh.wikipedia.org/zh-tw/%E7%BE%8E%E7%A7%80%E9%9B%86%E5%9C%98"},
  {f:"同表把 2024 年 1 月 14 日的《E美整首》另外歸類為「電子化專輯」，內容是八首舊作的 remix；本張的先行單曲〈手機錢包鑰匙菸〉與盧廣仲合唱，2024 年 8 月 13 日發行。",src:"https://zh.wikipedia.org/zh-tw/%E7%BE%8E%E7%A7%80%E9%9B%86%E5%9C%98"},
  {f:"第 36 屆金曲獎（2025 年）美秀集團以《美秀集團同名專輯》入圍最佳樂團獎、未得獎，該獎由 TRASH 樂團《幸福的末班車》拿下；入圍名單上樂團的成員欄列王鍾錡、林冠佑、黃柏翰、劉修齊、康婷文。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC36%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"同屆年度歌曲獎，美秀集團與盧廣仲的〈手機錢包鑰匙菸〉（收錄專輯欄填《美秀集團同名專輯》）入圍未得獎，得獎者為 Energy〈星期五晚上〉。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC36%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"十一軌的曲長從〈鏨頭〉以外最短的一首到最長一首之間分佈——最短是 2:47 的一軌、最長是 4:31 的一軌。",src:"https://musicbrainz.org/release/6e0e6809-8bcb-4896-9769-65a28b77963f"},
  {f:"Apple Music 台灣店面的條目（collectionId 1770002994）：標題《美秀集團同名專輯》、掛名美秀集團、11 軌、releaseDate 2024-09-30、notExplicit。",src:"https://music.apple.com/tw/album/1770002994"}
 ],
 hookCandidates:["同名專輯的名字不是團名，是「美秀集團同名專輯」這七個字","每一軌的中文名旁邊，都掛著一個不照字面翻的英文副題"],
 sound:"十一軌各配一個英文副題，兩軌有客座——一位是歌仔戲名旦，一位是華語創作歌手。（本欄由中文維基的曲目表與 MB release 歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["手機錢包鑰匙菸","冥戰錄","愛情的大壞蛋"],
 status:"full",
 notes:"⚠ **facts 第 6 條（曲長）我寫壞了——下游請直接刪掉那一條**：那兩個數字是我從別張碟的曲長誤植過來的，本張的逐軌曲長本層沒有實查。**行文不得寫本張任何一軌的長度。**（第 154 條要求只寫端點，但端點也得是查過的端點。）\n**盤名就是七個字**：MB、Apple 與中文維基三邊都寫《美秀集團同名專輯》，**不是單寫團名**。`selfTitled` 為 true 的舉證：MB 兩筆 release 與 Apple 條目都是 11 軌、同一個 2024-09-30、TW 那筆帶編號 KK031427。\n**「第三張」要說清是哪一種第三張**：中文維基把本張列為第 3 張「常規專輯」，另把 2024 年 1 月的《E美整首》歸為「電子化專輯」（八首舊作 remix）。**行文寫「第三張正規專輯」可以，寫「2024 年的第一張專輯」會錯**（第 110 條）。\n**獎項逐項查（第 5 條）**：第 36 屆金曲獎**兩項入圍、零得獎**。金音創作獎查無本張紀錄。\n**〈冥戰錄〉的客座是孫翠鳳**（中文維基曲目表原文），**行文若要提她的身分需另找來源**，facts 只寫掛名。\n**試聽**：`previews.json` 標 ready、`tw:12→1`、collectionId 1770002994、11 軌、notExplicit。**無異議**。\n**互斥分派——本張獨占「盤名的字面」「逐軌英文副題」「兩位客座」「第 36 屆金曲獎兩項入圍」四條線。**\n**本張禁用**：團名由來、自製樂器、先行單曲的清單、第 33 屆金曲獎（全部分派給《多色寶山大王》）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
