import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:拍謝少年 Sorry Youth|海口味", artist:"拍謝少年 Sorry Youth", album:"海口味",
 facts:[
  {f:"MusicBrainz release-group 581ee5a8 的欄位：title《海口味》、artist-credit「拍謝少年」、first-release-date 2012-04-30、primary-type Album、secondary-types 空、轄下 3 個 release。",src:"https://musicbrainz.org/release-group/581ee5a8-e9e7-42fe-9206-fe2339c72962"},
  {f:"MB 轄下的兩筆 Official release：2012-04-30 的 XW 版由 StreetVoice 發行、2017-11-08 的台灣實體版由好有感覺音樂發行（編號 SYC1201），兩筆都是 9 軌，曲序為〈深海的你〉〈我們苦難的蘋果班〉〈貳伍這冬〉〈海馬迴〉〈新迪爵戀曲〉〈夢中見〉〈無題〉〈台十七〉〈湯姆熊〉。",src:"https://musicbrainz.org/release/49449f0d-2edb-4617-a61f-d130237840b2"},
  {f:"中文維基〈拍謝少年〉記樂團 2005 年春天吶喊過後開始組團，團名 Sorry Youth 是對美國搖滾樂團 Sonic Youth 的致敬；創團初期以樂器演奏為主，後來改以台語創作，才把團名以台語翻譯為「拍謝少年」。",src:"https://zh.wikipedia.org/zh-tw/%E6%8B%8D%E8%AC%9D%E5%B0%91%E5%B9%B4"},
  {f:"同條目的曲目表在〈我們苦難的蘋果班〉〈無題〉〈台十七〉三首後面加註「代表先前曾出現在 DEMO 內」。",src:"https://zh.wikipedia.org/zh-tw/%E6%8B%8D%E8%AC%9D%E5%B0%91%E5%B9%B4"},
  {f:"第 24 屆金曲獎（2013 年）最佳專輯包裝獎，蔡佳倫與廖俊裕以《海口味》入圍未得獎，報名單位小白兔橘子有限公司，得獎者為蕭青陽《卡片教堂的鐘聲》。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC24%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"九軌的曲長從〈台十七〉的 3:28 到〈夢中見〉的 5:59。",src:"https://musicbrainz.org/release/51bbfe0c-b327-476a-adc9-c793aeb46b06"},
  {f:"Apple Music 上這張碟的條目（collectionId 1753652737）掛名寫成拉丁字母的「Sorry Youth」而不是中文團名，9 軌、notExplicit。",src:"https://music.apple.com/tw/album/1753652737"}
 ],
 hookCandidates:["團名先有英文才有中文：致敬 Sonic Youth 的 Sorry Youth，改唱台語後才變成拍謝少年","九首歌裡有三首在正式發行前就已經在 DEMO 上流傳"],
 sound:"九軌的曲長從 3:28 到 5:59，超過五分鐘的有〈我們苦難的蘋果班〉〈夢中見〉〈無題〉。開場與收尾都是四分鐘上下的長句子。（本欄由 MB 兩筆 release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["台十七","夢中見","深海的你"],
 status:"full",
 notes:"**獎項逐項查（第 5 條）**：本張唯一的金曲獎紀錄是第 24 屆最佳專輯包裝獎的**入圍未得獎**，而且入圍者是兩位設計者、不是樂團。**行文不得寫成「拿下金曲獎」**。樂團的金曲獎得獎紀錄（第 29 屆最佳裝幀設計獎）屬於第二張《兄弟沒夢不應該》，那張已在池中，本卡不寫。\n**報名單位是小白兔橘子有限公司**，與 MB 上的兩個發行方（StreetVoice、好有感覺音樂）都不同——這是三個不同角色，**行文不得把它們合併成一家**。\n**英文盤名「Seafood」只存在於 MB 的 Pseudo-Release**，不得當正式盤名。\n**試聽（探測層判 ready，本層複核通過但要補一件事）**：`previews.json` 的 `front` 是 **`jp`** 不是 `tw`——`tried` 顯示台灣、香港、新加坡、馬來西亞、中國、美國六個店面都被 403／429 打回後回 `0→0`，最後在日本店面搜到 2 筆、配上 1 筆。配上的 collectionId 1753652737 是 9 軌、掛名「Sorry Youth」，**逐軌與 MB 的 9 軌 release 曲名、曲序相符**（第 1 軌兩邊都是〈深海的你〉）。**判可用**，但要記下這張碟是靠日本店面配到的（第 75／158 條）。\n**互斥分派——本張獨占「團名的英文先於中文／Sonic Youth 致敬」與「DEMO 曲目」兩條線。** 同批《噪音公寓》不得重述團名由來。\n**本張禁用**：募資紀錄、金音創作獎三連霸、海口味有限公司（全部分派給《噪音公寓》）。",
});
W({
 key:"desc4:拍謝少年 Sorry Youth|噪音公寓", artist:"拍謝少年 Sorry Youth", album:"噪音公寓",
 facts:[
  {f:"MusicBrainz release-group 2291541d 的欄位：title《噪音公寓》、artist-credit「拍謝少年」、first-release-date 2024-06-12、primary-type Album、secondary-types 空、轄下 3 筆全為 TW／Official 的 release（2024-06-12、2024-06-24、2024-11），三筆都是 9 軌。",src:"https://musicbrainz.org/release-group/2291541d-2358-4e8a-9781-12c223cc0ae3"},
  {f:"MB 的 2024-06-12 那筆由海口味有限公司發行，曲序為〈Intro〉〈噪音公寓〉〈佇驚惶中騎車〉〈共身軀完全放予去〉〈踅神夢〉〈袂赴啊〉〈我閣有偌濟時間〉〈愛是啥貨〉〈世界第一戇〉。",src:"https://musicbrainz.org/release/457547fe-0d05-4692-bb1e-e431ef3838b9"},
  {f:"中文維基〈拍謝少年〉的曲目表標出三位客座：〈共身軀完全放予去〉feat. 鄭宜農、〈袂赴啊〉feat. 曹雅雯、〈世界第一戇〉feat. 謝銘祐；同表也標出〈噪音公寓〉〈共身軀完全放予去〉〈踅神夢〉三首是先行單曲。",src:"https://zh.wikipedia.org/zh-tw/%E6%8B%8D%E8%AC%9D%E5%B0%91%E5%B9%B4"},
  {f:"這張碟的發行募資放在 flyingV 平台，專案名稱「拍謝少年《噪音公寓》專輯發行募資」，目標金額 NTD$1000000，募資期間 2024/04/11 至 2024/05/05，最終募得 6,616,540 元、贊助人數 4,888 人，達成率 661.65%。",src:"https://www.flyingv.cc/projects/35047/"},
  {f:"第 15 屆金音創作獎（2024 年）最佳搖滾專輯獎由拍謝少年《噪音公寓》得獎；同屆該碟另入圍最佳專輯獎與最佳樂團獎，兩項皆未得獎。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC15%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"樂團在金音創作獎最佳搖滾專輯獎的三次得獎分別是：第 9 屆（2018 年）《兄弟沒夢不應該》、第 12 屆（2021 年）《歹勢好勢》、第 15 屆（2024 年）《噪音公寓》。",src:"https://zh.wikipedia.org/zh-tw/%E6%8B%8D%E8%AC%9D%E5%B0%91%E5%B9%B4"},
  {f:"九軌的曲長從〈Intro〉的 1:55 到〈我閣有偌濟時間〉的 4:31。",src:"https://musicbrainz.org/release/457547fe-0d05-4692-bb1e-e431ef3838b9"},
  {f:"Apple Music 台灣店面的條目（collectionId 1748096203）：標題《噪音公寓》、掛名拍謝少年、9 軌、releaseDate 2024-06-12、notExplicit。",src:"https://music.apple.com/tw/album/1748096203"}
 ],
 hookCandidates:["四千八百多人先付了六百多萬，這張碟才被壓出來","金音創作獎的最佳搖滾專輯獎，他們每隔三屆就拿一次"],
 sound:"九軌從 1:55 的開場到 4:31 的最長一首，三首有客座歌手，末軌是與另一位台語創作者的合唱。（本欄由 MB release 的逐軌曲長與中文維基曲目表的客座掛名歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["世界第一戇","噪音公寓","袂赴啊"],
 status:"full",
 notes:"**策展層要求核的「連續三張獲金音最佳搖滾專輯」已逐屆確認成立**：第 9 屆《兄弟沒夢不應該》、第 12 屆《歹勢好勢》、第 15 屆《噪音公寓》，三次都是**得獎**（不是入圍）。**但那三屆不是連號**（9／12／15，每隔三屆），**行文不得寫成「連續三屆」**——中文維基用的字是「連續三張創作專輯」，指的是專輯序列不是屆次序列（第 110 條）。\n**募資數字全部有來源**：目標 100 萬、募得 6,616,540 元、4,888 人、2024/04/11–05/05。策展層說的「600 萬打破自身 2021 年 300 萬紀錄」中，**600 萬這一半可由 flyingV 頁面直接證實**（6,616,540），**「打破台灣樂團募資紀錄」與「2021 年 300 萬」那一半只有中文維基與新聞轉述、本層未取得原始資料**，`facts` 因此只寫得到的數字，**行文不得斷言這是台灣樂團的最高紀錄**。\n**跨卡連結**：末軌〈世界第一戇〉的客座是 **謝銘祐**，而謝銘祐有兩張卡在同一組（《城市》《舊年》）。中文維基〈謝銘祐〉的單曲表也把 2024 年〈世界第一戇〉ft. 拍謝少年 記為他自己的作品。**這條線分派給本卡**，謝銘祐那兩張不得重述。\n**試聽**：`previews.json` 標 ready、`tw:1→1`、collectionId 1748096203、9 軌、notExplicit。逐軌核對 MB 相符（第 1 軌兩邊都是〈Intro〉）。**無異議**。\n**互斥分派——本張獨占「募資」「金音三次得獎」「客座歌手」三條線。**\n**本張禁用**：團名由來與 Sonic Voice 致敬、DEMO 曲目、第 24 屆金曲獎（全部分派給《海口味》）。",
});
W({
 key:"desc4:茄子蛋 EggPlantEgg|我們以後要結婚", artist:"茄子蛋 EggPlantEgg", album:"我們以後要結婚",
 facts:[
  {f:"MusicBrainz release-group 5e86d9f3 的欄位：title《我們以後要結婚》、artist-credit「茄子蛋」、first-release-date 2019-09-03、primary-type Album、secondary-types 空、轄下 1 個 TW／Official release，11 軌。",src:"https://musicbrainz.org/release-group/5e86d9f3-9ea3-4a9d-82c7-c2c22b5051d1"},
  {f:"該 release 的曲序：〈阿明與我〉〈聞道有先後，術業有專攻〉〈這款自作多情〉〈Happy!!! 運將情歌〉〈窒息〉〈請問你敢欲做我的 Girlfriend〉〈孤獨的人我們一起出發〉〈現代的男女你如何看待〉〈用愛賺錢〉〈Outro 2nd〉〈浪流連〉——**〈浪流連〉排在最後一軌**。",src:"https://musicbrainz.org/release/b8af0adc-905d-4ddd-b193-00690bc08ef1"},
  {f:"〈浪流連〉入圍第 30 屆金曲獎（2019 年）年度歌曲獎但未得獎，得獎者為蔡依林〈玫瑰少年〉；該屆入圍名單上〈浪流連〉的「收錄專輯」欄填的是《浪流連》，報名單位艾格普蘭特艾格有限公司。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC30%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"第 31 屆金曲獎（2020 年）茄子蛋以《我們以後要結婚》入圍四項、全數未得獎：年度專輯獎、最佳台語專輯獎、最佳樂團獎，以及吳建龍入圍的最佳裝幀設計獎。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC31%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"中文維基〈茄子蛋〉記樂團 2012 年成立、原始五位成員都是松山高中畢業，目前團員組成自 2014 年開始運作，現任三人為黃奇斌（主唱、鍵盤）、蔡鎧任（吉他、和聲）、謝耀德（吉他、和聲），infobox 的活躍年代欄寫「2012 年－2022 年 9 月」。",src:"https://zh.wikipedia.org/zh-tw/%E8%8C%84%E5%AD%90%E8%9B%8B"},
  {f:"十一軌的曲長從〈聞道有先後，術業有專攻〉的 3:06 到〈這款自作多情〉的 4:50。",src:"https://musicbrainz.org/release/b8af0adc-905d-4ddd-b193-00690bc08ef1"},
  {f:"Apple Music 台灣店面的條目（collectionId 1726979655）：標題《我們以後要結婚》、掛名茄子蛋、11 軌、releaseDate 2019-09-03、notExplicit。",src:"https://music.apple.com/tw/album/1726979655"}
 ],
 hookCandidates:["入圍年度歌曲獎的那一首，在這張碟上排在最後一軌","四項入圍全部落空的那一屆，這張碟的裝幀也在名單上"],
 sound:"十一軌的曲長從 3:06 到 4:50，兩首以 Outro／Happy 的英文字入題，收尾是全碟最有名的一首。（本欄由 MB release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["浪流連","阿明與我","這款自作多情"],
 status:"full",
 notes:"**獎項的兩層要分開（第 5 條）**：〈浪流連〉的年度歌曲獎入圍是在**第 30 屆（2019）**、以**單曲《浪流連》**的名義報名的（該屆入圍表的「收錄專輯」欄就寫《浪流連》）；**本張專輯本身是在第 31 屆（2020）以四項入圍、全數落空**。兩件事屆次不同、報名單位相同、都不是得獎。**行文絕不可把〈浪流連〉的入圍寫成本張專輯的獎，也不可寫成得獎。**\n**〈浪流連〉與同團〈浪子回頭〉只差一字**，後者收在池中已有的《卡通人物》，**比對與行文都要逐字核**（策展層已提醒，本層確認 MB 曲目表上本張沒有〈浪子回頭〉）。\n**策展層兩處未能證實，已降級**：(a)「〈浪流連〉MV 2021 年 12 月破一億觀看」——中文維基〈茄子蛋〉現行版本查無此句，**不寫**；(b)「2022 年 9 月因主唱聲帶受損宣布休團」——現行條目只在 infobox 的活躍年代欄寫到「2022 年 9 月」，**沒有給原因**，facts 因此只寫得到那個欄位值，**行文不得寫休團原因**（第 110 條）。\n**廠牌欄**：MB 的 TW release 沒填廠牌；「艾格普蘭特艾格有限公司」是金曲獎入圍名單上的**報名單位**。**行文寫成「樂團自組的公司報名」或「發行方欄空白」都可以，不得斷言它是唱片廠牌**。\n**試聽**：`previews.json` 標 ready、`tw:1→1`、collectionId 1726979655、11 軌、notExplicit，逐軌與 MB 相符（第 1 軌兩邊都是〈阿明與我〉）。**無異議**。\n**互斥分派——本張獨占「〈浪流連〉兩屆兩種身分」這條線。**",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
