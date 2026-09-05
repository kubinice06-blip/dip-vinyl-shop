import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:珂拉琪|MEmento·MORI", artist:"珂拉琪", album:"MEmento·MORI",
 facts:[
  {f:"MusicBrainz release-group c225c3ab 的欄位：title《MEmento·MORI》、artist-credit「珂拉琪」、first-release-date 2021-12、primary-type Album、secondary-types 空、轄下 1 個 TW／Official release，9 軌，廠牌欄填街聲股份有限公司。",src:"https://musicbrainz.org/release-group/c225c3ab-14d1-4916-b555-6374b55dc5e6"},
  {f:"九軌的曲序：〈這該死的拘執佮愛〉〈葬予規路火烌猶在〉〈萬千花蕊慈母悲哀〉〈傷心地獄芳花引魂〉〈MALIYANG〉〈TALACOWA〉〈'ADINGO〉〈TORATORAW〉〈outro〉。",src:"https://musicbrainz.org/release/15eaf194-b69c-400c-9735-a2cc7224c59f"},
  {f:"Blow 吹音樂的發片報導寫盤名取自拉丁文，意指「記住你終將一死」，過去多用於基督教藝術作品；《MEmento·MORI》裡的大寫字母拼起來是「MEMORI」，對應日文的「メモリー」（回憶）。同報導記碟上收錄 8 首歌曲加 1 首 outro，2021 年 12 月 22 日先在 StreetVoice 上線、12 月 23 日正式上串流平台。",src:"https://blow.streetvoice.com/58236/"},
  {f:"同報導記〈'ADINGO〉的歌詞是阿美族語與日語交錯，〈TORATORAW〉全部使用阿美族語；封面由夏子繪製。",src:"https://blow.streetvoice.com/58236/"},
  {f:"中文維基〈珂拉琪 (音樂組合)〉的成員表列兩人的作詞語言：夏子·拉里又斯（Natsuko Lariyod）寫阿美語、日語、英語，王家權（Ông Ka-koân）寫台語、英語；兩人都掛作曲，曲繪由夏子負責。",src:"https://zh.wikipedia.org/zh-tw/%E7%8F%82%E6%8B%89%E7%90%AA_(%E9%9F%B3%E6%A8%82%E7%B5%84%E5%90%88)"},
  {f:"同條目記兩人的合作起點是 2018 年底閃靈樂團與 The Ball 主辦的「天下第一閃靈改造大會」，夏子與王家權以改編版〈合掌〉拿下社會組（19 歲以上）冠軍。",src:"https://zh.wikipedia.org/zh-tw/%E7%8F%82%E6%8B%89%E7%90%AA_(%E9%9F%B3%E6%A8%82%E7%B5%84%E5%90%88)"},
  {f:"第 33 屆金曲獎（2022 年）最佳新人獎由珂拉琪（夏子．拉里又斯、王家權）以《MEmento·MORI》得獎，報名單位街聲股份有限公司；該屆同獎的其他入圍者包括裝咖人《夜官巡場》、雷擎《Dive & Give》、當代電影大師、許光漢、呂彥良與 Haezee。頒獎典禮上珂拉琪以〈葬予規路火烌猶在〉演出得獎表演。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC33%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"第 13 屆金音創作獎（2022 年）珂拉琪以《MEmento・MORI》拿下評審團獎；同屆最佳新人獎入圍未得獎（得獎者 LÜCY《LÜCY》），並以〈傷心地獄芳花引魂〉入圍最佳搖滾歌曲獎未得獎。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC13%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"九軌的曲長從 outro 的 2:39 到〈葬予規路火烌猶在〉的 4:13。",src:"https://musicbrainz.org/release/15eaf194-b69c-400c-9735-a2cc7224c59f"},
  {f:"Apple Music 台灣店面的條目（collectionId 1783103459）掛名寫成「珂拉琪 Collage」，9 軌、releaseDate 2021-12-23、copyright 欄「℗ 2024 寫在邊緣有限公司」、notExplicit。",src:"https://music.apple.com/tw/album/1783103459"}
 ],
 hookCandidates:["盤名裡的大寫字母挑出來拼，是日文的「回憶」","一張碟上兩種語言各佔一半，寫詞的是兩個不同的人"],
 sound:"九軌的曲長從 2:39 到 4:13。前半的曲名是台語漢字，後半是全大寫的阿美族語詞，其中一首把阿美族語與日語交錯著唱；末軌是一段 outro。（本欄由 MB release 的曲目表與逐軌曲長、Blow 吹音樂的發片報導與中文維基的成員表歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["葬予規路火烌猶在","萬千花蕊慈母悲哀","TORATORAW"],
 status:"full",
 notes:"**語言標示（派工詞的專屬重點，已查證）**：這張碟**不是純台語**。碟上的語言至少三種——王家權寫台語、夏子寫阿美族語與日語（中文維基成員表的作詞語言欄），Blow 的發片報導點名〈'ADINGO〉是阿美族語與日語交錯、〈TORATORAW〉全阿美族語。**行文必須寫成台語與阿美族語（可加日語），不得一律寫成台語。** ⚠ 但 facts 沒有一條逐首指定每一軌的語言，**下游不得寫「前四首台語、後四首阿美語」這種逐軌分配**——那是從曲名字形推出來的，屬第 33／110 條禁止的推論。\n**得獎與入圍逐項分開（第 5 條）**：第 33 屆金曲獎最佳新人獎**得獎**；第 13 屆金音創作獎評審團獎**得獎**，同屆最佳新人獎與最佳搖滾歌曲獎**入圍未得獎**。⚠ **本張沒有入圍第 33 屆最佳原住民語專輯獎**——該獎那年的六筆入圍名單裡沒有它（夏子出現在該屆名單上是因為她參與了《N1》那屋瓦一號作品，那是別人的碟）。**行文不得把《N1》的任何紀錄算到本張頭上。**\n**Apple 的 ℗ 年份與廠牌都不能用來定年**：Apple 條目的 copyright 欄是「℗ 2024 寫在邊緣有限公司」——那是樂團 2024 年自組的公司回頭掛上去的，**本張 2021 年的原始發行方是街聲**（MB release 的廠牌欄與金曲獎報名單位一致）。**行文不得寫本張由寫在邊緣發行**（第 77 條的形狀）。\n**盤名的間隔號**：MB 與 Apple 用 U+00B7 的「MEmento·MORI」，金音創作獎名單用全形的「MEmento・MORI」。**兩種都要進去重表**，卡片維持 MB／Apple 的寫法。\n**試聽（本層推翻探測層）**：`previews.json` 標 `unavailable`，八個店面每個都是 403、403、`0→0`。**403 是重試日誌，真正落空的是搜尋字串**——`珂拉琪` 加上帶間隔號的盤名搜不到，而 **Apple 的掛名其實是「珂拉琪 Collage」**（多了英文），盤名大小寫又不規則。改以策展層人工核過的 collectionId 直查 `lookup?id=1783103459&country=tw&entity=song`：**回 9 軌、全部帶 previewUrl**，逐軌與 MB 相符（第 1 軌兩邊都是〈這該死的拘執佮愛〉；唯一差異是 Apple 第 7 軌用彎引號 ’ADINGO、MB 用直引號 'ADINGO）。**判可用。**\n**互斥分派——本張獨占「盤名字母拼成メモリー」「兩種語言各半」「閃靈改造大會的相遇」三條線。** 同批《Deus Ex Machina》不得重述團的相遇與命名玩法。",
});
W({
 key:"desc4:珂拉琪|Deus Ex Machina", artist:"珂拉琪", album:"Deus Ex Machina",
 facts:[
  {f:"MusicBrainz release-group 99d0de8e 的欄位：title《Deus Ex Machina》、artist-credit「珂拉琪」、first-release-date 2024-12-22、primary-type Album、secondary-types 空、轄下 1 個 TW／Official release，11 軌，廠牌欄填寫在邊緣有限公司。",src:"https://musicbrainz.org/release-group/99d0de8e-e4dc-4302-bc83-840223e5dbf7"},
  {f:"十一軌的曲序：〈徒花水月〉〈蓮花空行〉〈紅弁慶〉〈血母蔭身〉〈３月桃花〉〈空華亂墜〉〈謀殺石蓮〉〈鏨頭長命〉〈千屈菜〉〈極樂金花〉〈機械降神〉——末軌〈機械降神〉正是盤名 Deus Ex Machina 的中文說法。",src:"https://musicbrainz.org/release/1f00cb50-c9c0-489c-b91e-5deb1292a4e8"},
  {f:"中文維基〈珂拉琪 (音樂組合)〉的專輯表記本張發行日 2024 年 12 月 23 日、唱片公司寫在邊緣有限公司，是繼 2021 年《MEmento·MORI》之後的第 2 張專輯。",src:"https://zh.wikipedia.org/zh-tw/%E7%8F%82%E6%8B%89%E7%90%AA_(%E9%9F%B3%E6%A8%82%E7%B5%84%E5%90%88)"},
  {f:"第 36 屆金曲獎（2025 年）珂拉琪（夏子、王家權）以《Deus Ex Machina》入圍最佳演唱組合獎、未得獎，該獎由動力火車《結伴》（豪華版）拿下；同屆該獎的其他入圍者為恐龍的皮、Energy、丹丹猫猫與 Atarashii Gakko! 新學校領袖。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC36%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"中文維基〈珂拉琪 (音樂組合)〉的獎項表記碟上兩首各拿過一次街聲年度音樂趨勢大獎：〈血母蔭身〉獲 2025 年第 2 屆的年度二十大單曲，〈極樂金花〉獲 2026 年第 3 屆的年度十大單曲。",src:"https://zh.wikipedia.org/zh-tw/%E7%8F%82%E6%8B%89%E7%90%AA_(%E9%9F%B3%E6%A8%82%E7%B5%84%E5%90%88)"},
  {f:"十一軌的曲長從〈鏨頭長命〉的 2:47 到〈血母蔭身〉的 4:31。",src:"https://musicbrainz.org/release/1f00cb50-c9c0-489c-b91e-5deb1292a4e8"},
  {f:"Apple Music 台灣店面的條目（collectionId 1783690060）掛名寫成「珂拉琪 Collage」，標題《Deus Ex Machina》、11 軌、releaseDate 2024-12-23、℗ 2024 寫在邊緣有限公司、notExplicit。",src:"https://music.apple.com/tw/album/1783690060"}
 ],
 hookCandidates:["拉丁文的盤名，在最後一軌被翻成中文再唱一次","十一個曲名裡有九個是花草、器物或身體的漢字詞"],
 sound:"十一軌的曲長從 2:47 到 4:31，分佈比首張更集中；曲名清一色是漢字詞，末軌把拉丁文盤名譯回中文。（本欄由 MB release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["血母蔭身","極樂金花","機械降神"],
 status:"full",
 notes:"**獎項逐項查（第 5 條）**：第 36 屆金曲獎最佳演唱組合獎**入圍未得獎**。**行文不得寫成得獎。** 街聲年度音樂趨勢大獎的兩筆是單曲獎，**要指名是哪一首、哪一屆**。\n**發行方與首張不同家**：本張是樂團自組的寫在邊緣有限公司（MB release 廠牌欄與 Apple ℗ 欄一致），首張是街聲。這條可寫。\n**日期一天之差**：MB first-release-date 2024-12-22、Apple 與中文維基都記 2024-12-23。**卡片年份取 2024，行文不必寫到日**（第 77 條）。\n**曲名的字形要照抄**：MB 第 4 軌寫〈血母蘟身〉、Apple 與中文維基寫〈血母蔭身〉（「蔭」對「蘟」）；第 5 軌 MB 用全形〈３月桃花〉、Apple 用半形〈3月桃花〉。**facts 採 Apple／維基那一組寫法**，去重表兩種都要留。\n**〈機械降神〉是 Deus Ex Machina 的中文說法**——這一條是曲名與盤名的字面對應，**facts 只寫到「末軌叫〈機械降神〉」這個層次，行文不得就此展開成敘事裝置的評論**（第 110 條）。\n**試聽（本層推翻探測層）**：`previews.json` 標 `unavailable`，八個店面全是 403、403、`0→0`。與首張同一個形狀：**Apple 的掛名是「珂拉琪 Collage」而不是純中文，盤名又是高頻拉丁文成語**，搜尋配不上。改以 collectionId 直查 `lookup?id=1783690060&country=tw&entity=song`：**回 11 軌、全部帶 previewUrl**，逐軌與 MB 相符（第 1 軌兩邊都是〈徒花水月〉）。**判可用。**\n**互斥分派——本張獨占「盤名與末軌的對應」「兩張碟換了發行公司」「街聲趨勢大獎」三條線。**\n**本張禁用**：MEmento·MORI 的字母遊戲、閃靈改造大會、兩人的語言分工、第 33 屆金曲獎最佳新人獎（全部分派給首張）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
