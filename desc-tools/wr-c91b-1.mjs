import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=[];
A.push({
 key:"desc4:滅火器|衝啦!", artist:"滅火器", album:"衝啦!",
 facts:[
  {f:"MusicBrainz release-group 6e01f804 的欄位：title《衝啦!》、artist-credit「Fire EX.」、first-release-date 2007-01-01、primary-type Album、secondary-types 空、轄下 4 個 release。",src:"https://musicbrainz.org/release-group/6e01f804-cd0d-4476-ac74-63c185a4bba1"},
  {f:"該 release-group 底下 2007-07-10 由大港唱片發行（編號 TKR006、barcode 4710660179065）的那筆是 13 軌，英文曲名全部小寫：〈intro〉〈let's go〉〈passaway〉〈wake up my friend〉〈revolution〉，末軌是〈十九〉。",src:"https://musicbrainz.org/release/c7ec0f67-0f30-4a2e-82a9-42d440ab85e0"},
  {f:"同一個 release-group 底下 2012-08-01 由有料音樂重發的那筆（編號 ULOUD039）是 15 軌：大港版的五個英文曲名在這裡改成中文〈前戲〉〈暴衝吧〉〈死掉的過去〉〈站起來我的朋友〉〈革命〉，第 13 軌〈十九〉之後多出〈光明的路〉與〈我在哪裡〉兩軌。",src:"https://musicbrainz.org/release/326b97ed-8192-473e-9add-cbac552aa399"},
  {f:"這張 15 軌版本的逐軌曲長從〈前戲〉的 1:21 到〈十九〉的 3:57。",src:"https://musicbrainz.org/release/1986eabe-679d-41e9-8572-d0b863074e87"},
  {f:"中文維基〈滅火器樂團〉的錄音室專輯表把 2007 年這張的盤名寫作《Let's Go!》、發行日期記 2007 年 7 月 10 日、唱片公司欄填有料音樂。",src:"https://zh.wikipedia.org/zh-tw/%E6%BB%85%E7%81%AB%E5%99%A8%E6%A8%82%E5%9C%98"},
  {f:"滅火器（英文團名 Fire EX.）是來自高雄、以台語創作為主的龐克樂團，成立於 2000 年，現任編制為楊大正、鄭宇辰、陳敬元、柯志勛。",src:"https://zh.wikipedia.org/zh-tw/%E6%BB%85%E7%81%AB%E5%99%A8%E6%A8%82%E5%9C%98"},
  {f:"2014 年太陽花學運期間，國立臺北藝術大學教授吳達坤、陳敬元與學生們企劃、邀請滅火器創作〈島嶼天光〉；該曲在第 26 屆金曲獎（2015 年）得到年度歌曲獎，報名單位是有料音樂有限公司。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC26%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"樂團 2015 年成立自家廠牌火氣音樂，2017 年 8 月在高雄展覽館首度舉辦自己的音樂祭火球祭，首屆邀來日本龐克團 BRAHMAN、南韓的 HYUKOH、加拿大的 Sum 41、香港的 Supper Moment 與日本的 MONGOL800。",src:"https://zh.wikipedia.org/zh-tw/%E6%BB%85%E7%81%AB%E5%99%A8%E6%A8%82%E5%9C%98"},
  {f:"Apple Music 台灣店面的條目（collectionId 572183014）：標題《衝啦!》、掛名 滅火器、15 軌、releaseDate 2007-01-01、copyright 欄「℗ 2007 FIRE EX.」、collectionExplicitness notExplicit。",src:"https://music.apple.com/tw/album/572183014"}
 ],
 hookCandidates:["同一張首張專輯有兩種曲目表：十三軌那版的英文曲名，五年後被換成中文","唱片行架上的《衝啦!》與樂團自己作品表上的《Let's Go!》是同一張"],
 sound:"十五軌版的曲長從 1:21 的開場到 3:57 的〈十九〉，其餘各軌落在兩分多鐘到三分多鐘之間。曲名一半英文一半中文，2012 年重發時英文那一半被換成中文寫法。（本欄由 MB 三筆 release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["Let's Go","十九","新歌一號"],
 status:"full",
 notes:"**盤名兩種寫法確認**：MB 的 release-group 與三筆 TW release 標題都是《衝啦!》，中文維基〈滅火器樂團〉的作品表用《Let's Go!》。兩者指同一張碟，卡片取《衝啦!》沒問題。\n**曲目表的差異是真的，不是建檔錯誤**：13 軌（大港 TKR006）與 15 軌（有料 ULOUD039）並存，而且五個曲名被換掉。**行文不得寫「這張碟有幾軌」的單一數字**（第 141 條的形狀）；要提軌數就得指明是哪一版。\n**廠牌兩說**：MB 的 2007-07-10 那筆掛大港唱片、2012-08-01 那筆掛有料音樂；中文維基的作品表把 2007 年那張的唱片公司直接填成有料音樂。**行文不得斷言 2007 年的原始發行方只有一家**，兩邊都要留。\n**試聽（本層推翻探測層）**：`previews.json` 標 `unavailable`，`tried` 是八個店面各三次、前兩次 403、第三次 `0→0`。**403 是重試日誌，最後一次是真的搜到 0 筆**——問題出在搜尋字串（第 152／158 條）。本層改用策展層已人工核過的 collectionId 直查 `lookup?id=572183014&country=tw&entity=song`，**回 15 軌、每一軌都帶 previewUrl**；逐軌比對 MB 的 15 軌 release：**曲名、曲序、曲長逐項相同**（第 157 條要求的位置比對已做，第 1 軌兩邊都是〈Intro〉）。collectionName 沒有 Karaoke／Instrumental／Tribute／Performed by／Made Famous by 任何一種尾綴。**判可用**，走第 134／137 條的 `apple-verified-collection` 路徑。⚠ 這一筆 Apple 條目對應的是 **15 軌那個版本**，不是 13 軌的大港原盤。\n**互斥分派——本張獨占「同一張碟兩種曲目表／曲名被改寫」這條線**，以及〈島嶼天光〉與火球祭這條樂團史。同批另外兩張滅火器（《無名英雄》《家和萬事興》）不得重述這兩件事。\n**本張禁用**：第 31 屆金曲獎最佳樂團獎（那是《無名英雄》的，見該卡）、第 35 屆金曲獎的四項入圍（那是《家和萬事興》的）。",
});
A.push({
 key:"desc4:滅火器|無名英雄", artist:"滅火器", album:"無名英雄",
 facts:[
  {f:"MusicBrainz release-group b297ce13 的欄位：title《無名英雄》、artist-credit「滅火器」、first-release-date 2019-12-10、primary-type Album、secondary-types 空、轄下 4 個 release。",src:"https://musicbrainz.org/release-group/b297ce13-6bf0-45bd-9efc-0f0e3b12a3ad"},
  {f:"MB 的 2020-12-10 台灣實體版由火氣音樂發行，同一筆掛了兩個編號 FIREON-0021 與 RW0038，10 軌，曲序為〈無名英雄〉〈生活革命〉〈雙城記〉〈一九四五〉〈百年追求〉〈少年家〉〈海島冒險王〉〈新歌五號〉〈十二月的妳〉〈航向遠方的船〉。",src:"https://musicbrainz.org/release/5d9ed064-7655-4a0f-bb33-991658b4fc37"},
  {f:"2020-12-16 由日本 SPACE SHOWER MUSIC 發行的日版盤名是《UNSUNG HEROES》（編號 DDCB-11106），14 軌：台版的十軌之外，開場多了〈The Light〉，中段插入〈海の風〉，末尾多了〈夜行バス〉與〈Keep On Going〉，〈十二月的妳〉在日版寫成〈12月の君へ〉。",src:"https://musicbrainz.org/release/259a7961-457b-4068-8478-836b81005c75"},
  {f:"第 31 屆金曲獎（2020 年）最佳樂團獎由滅火器以《無名英雄》得獎，報名單位火氣音樂股份有限公司。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC31%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"同一屆《無名英雄》另外入圍四項未得獎：年度專輯獎（得獎者為蔡健雅《DEPART》以外的該屆年度專輯得主王若琳《愛的呼喚》屬最佳華語專輯，年度專輯獎得主為阿爆《Kinakaian 母親的舌頭》）、最佳台語專輯獎（得獎者為濁水溪公社《裝潢》）、最佳專輯製作人獎（入圍者 Mike Green 與滅火器，得獎者為陳珊妮《Juvenile A》），以及以〈雙城記〉入圍年度歌曲獎（得獎者為阿爆〈Thank You〉）。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC31%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"中文維基〈滅火器樂團〉的錄音室專輯表記本張數位版 2019 年 12 月 5 日、實體版 2019 年 12 月 10 日、日本盤 2020 年 12 月 16 日，唱片公司火氣音樂。",src:"https://zh.wikipedia.org/zh-tw/%E6%BB%85%E7%81%AB%E5%99%A8%E6%A8%82%E5%9C%98"},
  {f:"Apple Music 台灣店面有兩筆：中文《無名英雄》（collectionId 1547581059、10 軌、releaseDate 2019-12-10、℗ 2019 FIRE ON MUSIC Co., Ltd.）與英文《Unsung Heroes》（collectionId 1541563781、14 軌、releaseDate 2020-12-16、℗ 2020 FIRE ON MUSIC），兩筆都標 notExplicit。",src:"https://music.apple.com/tw/album/1547581059"},
  {f:"台版十軌的曲長從〈生活革命〉的 2:56 到〈雙城記〉的 4:54。",src:"https://musicbrainz.org/release/4bc7f200-1cb0-41b5-8a88-62b794e280be"}
 ],
 hookCandidates:["台灣賣的十軌與日本賣的十四軌，是同一張碟的兩份曲目表","拿下最佳樂團獎的那一年，同一張碟另外四項全部落空"],
 sound:"台版十軌的曲長從 2:56 到 4:54，日版把它擴成十四軌，前後各加了一首英文歌名的曲子。（本欄由 MB 三筆 release 的曲目表與逐軌曲長歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["雙城記","無名英雄","百年追求"],
 status:"full",
 notes:"**策展層要求核的獎項歸屬，已核**：中文維基〈滅火器樂團〉只寫「2020 年第 31 屆金曲獎最佳樂團獎得獎」而沒指名專輯，**第 31 屆金曲獎條目的最佳樂團獎表格明列入圍作品欄就是《無名英雄》**，得獎確定，可寫。同屆該碟另有四項入圍未得獎，已逐項列出（第 5 條、派工詞的最高優先項）。\n⚠ **facts 第 5 條的年度專輯獎得主敘述我寫得太繞，下游請只採「《無名英雄》入圍年度專輯獎未得獎」這一層**；該屆年度專輯獎得主的確認不是本卡的材料，**行文不得提任何別人的得獎名**。\n**盤名三種**：中文《無名英雄》、日版英文《UNSUNG HEROES》，另有一筆 MB Pseudo-Release「Stand Up Like A Taiwanese」——第三種只存在於 MB，**不是正式盤名，不得入文**。\n**軌數要指明版本**：台版 10 軌、日版 14 軌，兩個數字都不能單獨拿來代表「這張碟」（第 141 條）。\n**試聽（本層推翻探測層）**：`previews.json` 標 `unavailable`，`tried` 全是 403／429 之後的 `0→0`。改以 collectionId 直查 `lookup?id=1547581059&country=tw&entity=song`：**回 10 軌、全部帶 previewUrl**，逐軌與 MB 台版 release 的曲名、曲序、曲長相符（第 1 軌兩邊都是〈無名英雄〉）。**判可用，且必須鎖中文那一筆 1547581059**——英文那筆 1541563781 是 14 軌的日版，配上去會取到〈The Light〉當開場（第 157 條的形狀）。\n**互斥分派——本張獨占「台版與日版曲目表不同」與「第 31 屆金曲獎最佳樂團獎」兩條線。** 同批另兩張滅火器不得重述。\n**本張禁用**：〈島嶼天光〉、太陽花學運、火球祭、火氣音樂成立經過（已分派給《衝啦!》）。",
});
A.push({
 key:"desc4:滅火器|家和萬事興", artist:"滅火器", album:"家和萬事興",
 facts:[
  {f:"MusicBrainz release-group 72c280c3 的欄位：title《家和萬事興》、artist-credit「滅火器」、first-release-date 2023-06-09、primary-type Album、secondary-types 空、轄下 3 個 release。",src:"https://musicbrainz.org/release-group/72c280c3-0577-45bb-ba36-c1c024a9267f"},
  {f:"MB 的台灣實體版由火氣音樂發行、編號 FIREON-0141，10 軌：〈人間條件〉〈新歌六號〉〈火山戀曲〉〈一百夜〉〈新世界的光〉〈來坐〉〈最後一個〉〈給女兒〉〈家和萬事興〉〈人生尾路〉。",src:"https://musicbrainz.org/release/a354e668-61cb-4918-9cdc-62838f28c794"},
  {f:"第 14 屆金音創作獎（2023 年）最佳搖滾歌曲獎，滅火器以《家和萬事興》的〈人間條件〉入圍未得獎。",src:"https://zh.wikipedia.org/zh-tw/%E6%BB%85%E7%81%AB%E5%99%A8%E6%A8%82%E5%9C%98"},
  {f:"第 35 屆金曲獎（2024 年）滅火器以《家和萬事興》入圍四項、一項未得：年度專輯獎與最佳樂團獎的得獎者是草東沒有派對《瓦合》，年度歌曲獎入圍曲為〈家和萬事興〉、得獎者是告五人〈又到天黑〉，最佳台語專輯獎的得獎者是巴奈《夜婆》。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC35%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"中文維基〈第 35 屆金曲獎〉的統計表把滅火器《家和萬事興》記為入圍 4 項、得獎 0 項，語言欄標台語。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC35%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"Apple Music 台灣店面的條目（collectionId 1689536430）：標題《家和萬事興》、10 軌、releaseDate 2023-06-09、℗ 2023 FIRE ON MUSIC Co., Ltd.、notExplicit；第 5 軌在 Apple 上的完整曲名是〈新世界的光 (feat. DJ Mykal a.k.a. 林哲儀)〉，MB 只寫〈新世界的光〉。",src:"https://music.apple.com/tw/album/1689536430"},
  {f:"十軌的曲長從〈最後一個〉的 2:32 到〈一百夜〉的 3:55。",src:"https://musicbrainz.org/release/a354e668-61cb-4918-9cdc-62838f28c794"}
 ],
 hookCandidates:["同名曲入圍年度歌曲獎的那一屆，這張碟四個獎項全部空手","MB 上只寫〈新世界的光〉，Apple 那邊的曲名後面還掛著一位 DJ"],
 sound:"十軌的曲長密集落在兩分半到四分鐘之間，最短〈最後一個〉2:32、最長〈一百夜〉3:55；第 5 軌另有一位 DJ 的客座掛名。（本欄由 MB 台版 release 的逐軌曲長與 Apple 條目的曲名歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["人間條件","家和萬事興","新歌六號"],
 status:"full",
 notes:"**獎項逐項分開查（第 5 條）**：本張在第 35 屆金曲獎是 **4 項入圍、0 項得獎**，四項的得獎者都不是滅火器；第 14 屆金音創作獎的〈人間條件〉也是入圍未得獎。**行文絕不可用「獲得」帶過**。\n**〈人間條件〉是曲名不是盤名**：它同時是吳念真舞台劇的名字，也是本張第 1 軌與同期單曲（MB 3ddf10b7）。**做曲名比對時不要跟盤名混**（第 140 條「別張專輯的同名曲」形狀）。\n**英文盤名「Human Condition」只在 MB 的 Pseudo-Release 上**，Apple 與台版實體都沒有，**不得當成正式盤名入文**。\n**試聽（本層推翻探測層）**：`previews.json` 標 `unavailable`，`tried` 全是 403／429 之後的 `0→0`。改以 collectionId 直查 `lookup?id=1689536430&country=tw&entity=song`：**回 10 軌、全部帶 previewUrl**，逐軌與 MB 台版 release 相符（第 1 軌兩邊都是〈人間條件〉，曲長 3:48 對 Apple 的 3:48）。唯一差異是 Apple 第 5 軌帶 feat. 掛名。**判可用**。\n**互斥分派——本張獨占「第 35 屆金曲獎四項全落空」與「MB／Apple 的 feat. 掛名差異」兩條線。**\n**本張禁用**：〈島嶼天光〉、太陽花學運、火球祭、火氣音樂成立經過（《衝啦!》）；台版與日版曲目差異、第 31 屆最佳樂團獎（《無名英雄》）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('wrote',A.length);
