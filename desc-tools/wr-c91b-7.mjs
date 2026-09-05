import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:血肉果汁機 Flesh Juicer|GIGO", artist:"血肉果汁機 Flesh Juicer", album:"GIGO",
 facts:[
  {f:"MusicBrainz release-group f4c8d09b 的欄位：title《GIGO》、artist-credit「Flesh Juicer」（英文，不是中文團名）、first-release-date 2015-06-01、primary-type Album、secondary-types 空、轄下 1 個 TW／Official release，13 軌，廠牌欄空白。",src:"https://musicbrainz.org/release-group/f4c8d09b-6b42-4ecd-a2c4-4009dfb07c18"},
  {f:"十三軌的曲序：〈帶上血肉〉〈瘋狂大老二〉〈仙人掌B區〉〈研究猴子〉〈回到未來〉〈登陸月球〉〈清光計畫〉〈天崩大事件〉〈上山〉〈泡茶〉〈血肉宮〉〈新世界革命〉〈大年開始〉。",src:"https://musicbrainz.org/release/25727c36-c19c-4a68-8cbc-ff1b074fa86e"},
  {f:"中文維基〈血肉果汁機〉的作品表替每一軌附了英文副題，其中〈帶上血肉〉是 UFO Tour、〈上山〉是 Funeral、〈泡茶〉是 UFO Tour Rest、〈血肉宮〉是 Flesh Temple、〈新世界革命〉是 New World Against Order、〈大年開始〉是 Annuit Coeptis；同表記本張數位發行 2015 年 6 月 8 日、實體專輯 2015 年 8 月 5 日、發行公司禾廣娛樂、語言類型台語。",src:"https://zh.wikipedia.org/zh-tw/%E8%A1%80%E8%82%89%E6%9E%9C%E6%B1%81%E6%A9%9F"},
  {f:"同條目記樂團 2015 年發行首張專輯《GIGO》，在傳統廟會與喪禮伴奏裡獲得啟發；樂團出道地點台中、活躍年代自 2006 年起，創團初期是輾核與死核、特色是極重的吉他音牆加 blast-beat 與豬吠唱腔，自《GIGO》開始轉變為金屬核但仍使用豬吠。",src:"https://zh.wikipedia.org/zh-tw/%E8%A1%80%E8%82%89%E6%9E%9C%E6%B1%81%E6%A9%9F"},
  {f:"第 6 屆金音創作獎（2015 年）最佳搖滾專輯獎由血肉果汁機《GIGO》得獎；同屆該碟入圍最佳樂團獎未得獎，並以〈血肉宮〉入圍最佳搖滾單曲獎未得獎。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC6%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"第 27 屆金曲獎（2016 年）最佳專輯包裝獎，趙奕翔以血肉果汁機《GIGO》入圍未得獎，報名單位禾廣娛樂股份有限公司，得獎者為林緯銘的昏鴉《一切不滅定律》。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC27%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"十三軌的曲長從〈泡茶〉的 1:33 到〈天崩大事件〉的 4:24。",src:"https://musicbrainz.org/release/25727c36-c19c-4a68-8cbc-ff1b074fa86e"},
  {f:"Apple Music 台灣店面的條目（collectionId 1578470615）：標題《GIGO》、掛名血肉果汁機、13 軌、releaseDate 2015-06-10、copyright「℗ 2015 Flesh Juicer」、collectionExplicitness explicit，逐軌有八軌標 explicit、五軌標 notExplicit。",src:"https://music.apple.com/tw/album/1578470615"}
 ],
 hookCandidates:["靈感來自廟會陣頭與喪禮的伴奏，做出來的是金屬核","碟上每個中文曲名背後都掛著一個對不上字面的英文副題"],
 sound:"十三軌的曲長從 1:33 到 4:24。樂團自這張起從輾核與死核轉向金屬核，仍留著豬吠唱腔；碟上八軌被 Apple 標為 explicit。（本欄由 MB release 的逐軌曲長、中文維基的樂風段落與 Apple 條目的逐軌標記歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["血肉宮","帶上血肉","大年開始"],
 status:"full",
 notes:"**獎項逐項分開（第 5 條）**：第 6 屆金音創作獎最佳搖滾專輯獎**得獎**，同屆最佳樂團獎與最佳搖滾單曲獎**入圍未得獎**；第 27 屆金曲獎最佳專輯包裝獎**入圍未得獎，而且入圍者是設計者趙奕翔、不是樂團**。**行文不得寫成「拿下金曲獎」。**\n**發行日三說**：MB first-release-date 2015-06-01、中文維基數位版 2015-06-08／實體 2015-08-05、Apple releaseDate 2015-06-10。**卡片年份取 2015，行文不得寫到日**（第 77 條）。\n**廠牌**：MB 的 TW release 廠牌欄空白，中文維基與金曲獎報名單位都指向**禾廣娛樂**。可寫，但要說是發行公司／報名單位而不是 MB 的欄位。\n**豬吠（pig squeal）與輾核／死核／金屬核是中文維基樂風段落的原句**，屬曲風源流可寫（研究層共用規則的曲風源流條）。\n⚠ **試聽——這張的 `unavailable` 是真的搜不到，但碟確實在 Apple 上**：修過重試的 `probe-previews` 重探後，八個店面仍全是 `0→0`。本層另外用五種字串在 tw 店面實搜（`血肉果汁機 Flesh Juicer GIGO`／`血肉果汁機 GIGO`／`Flesh Juicer GIGO`／`血肉果汁機 血肉宮`／單獨的 `血肉果汁機`）——**前四種回 0 筆；單獨用團名搜回 11 筆，全是單曲與遊戲原聲帶，三張正規專輯一張都沒出現**。但 `lookup?id=1578470615&country=tw&entity=song` **回 13 軌、每一軌都帶 previewUrl**，逐軌與 MB 的 13 軌 release 曲名、曲序、曲長相符（第 1 軌兩邊都是〈帶上血肉〉）。\n**判定：這是「碟在 Apple 上、但 search API 索引不到」的形狀**，不是搜尋字串問題也不是店面問題（第 152／158 條都涵蓋不到）。**建議本機走第 134／137 條的 `apple-verified-collection` 路徑，用 collectionId 1578470615 直查補試聽**，`verifiedReason` 記本段的逐軌核對。**同一個形狀在本組另外三張上也成立**（見《深海童話》《城市》《玖肆伍參》的 notes），**建議主線立成一條裁定**。\n**explicit 已核（§6）**：Apple 條目本身標 explicit、逐軌有八軌標 explicit，**不是淨化版**；search 也沒有找到同碟的第二個版本。\n**互斥分派——本張獨占「廟會與喪禮的靈感來源」「輾核轉金屬核」「逐軌英文副題」三條線。** 同批《深海童話》不得重述樂風轉向與英文副題。",
});
W({
 key:"desc4:血肉果汁機 Flesh Juicer|深海童話", artist:"血肉果汁機 Flesh Juicer", album:"深海童話",
 facts:[
  {f:"MusicBrainz release-group fc56d0b4 的欄位：title《深海童話》、artist-credit「Flesh Juicer」、first-release-date 2018-07-27、primary-type Album、secondary-types 空、轄下 1 個 TW／Official release，由好有感覺音樂發行、編號 FJ007，11 軌。",src:"https://musicbrainz.org/release-group/fc56d0b4-2d78-4507-b950-2a9cf63273d6"},
  {f:"十一軌的曲序：〈海底騎士〉〈打開太陽〉〈深海洋〉〈執政官入侵〉〈黑暗人〉〈索倫發言人〉〈海盜〉〈馬里亞納〉〈一起下地獄〉〈關閉太陽〉〈海底城〉——〈打開太陽〉與〈關閉太陽〉分別排在第 2 軌與第 10 軌。",src:"https://musicbrainz.org/release/032bce8a-21a1-4bde-8103-df79d5210f2d"},
  {f:"中文維基〈血肉果汁機〉的作品表把這張的完整標題記作《深海童話 Fairy Tales of Ocean Deep》、發行日期 2018 年 7 月 27 日、唱片發行好有感覺音樂、語言類型台語。",src:"https://zh.wikipedia.org/zh-tw/%E8%A1%80%E8%82%89%E6%9E%9C%E6%B1%81%E6%A9%9F"},
  {f:"第 30 屆金曲獎（2019 年）最佳樂團獎，血肉果汁機以《深海童話》入圍未得獎，報名單位「好球娛樂有限公司」，該獎由閃靈《政治》拿下；同屆該獎的其他入圍者為南瓜妮歌迷俱樂部、落日飛車、旺福、美秀集團《電火王》與 Tizzy Bac。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC30%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"第 9 屆金音創作獎（2018 年）血肉果汁機以《深海童話》入圍最佳樂團獎，未得獎。",src:"https://zh.wikipedia.org/zh-tw/%E8%A1%80%E8%82%89%E6%9E%9C%E6%B1%81%E6%A9%9F"},
  {f:"十一軌的曲長從〈海底騎士〉的 2:44 到〈一起下地獄〉的 5:48。",src:"https://musicbrainz.org/release/032bce8a-21a1-4bde-8103-df79d5210f2d"},
  {f:"Apple Music 台灣店面的條目（collectionId 1398909746）：標題《深海童話》、掛名血肉果汁機、11 軌、releaseDate 2018-06-19、copyright「℗ 2018 Flesh Juicer」、collectionExplicitness explicit，逐軌有七軌標 explicit；Apple 第 3 軌作〈深海洋〉、MB 作〈深海〉。",src:"https://music.apple.com/tw/album/1398909746"}
 ],
 hookCandidates:["第二軌把太陽打開，第十軌再把它關掉","入圍金曲獎最佳樂團那一屆，報名單位的名字跟唱片上的廠牌不是同一家"],
 sound:"十一軌的曲長從 2:44 到 5:48，曲名幾乎全繞著海——海底騎士、深海洋、馬里亞納、海盜、海底城；Apple 上七軌標 explicit。（本欄由 MB release 的曲目表與逐軌曲長、Apple 條目的逐軌標記歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["打開太陽","馬里亞納","海底城"],
 status:"full",
 notes:"**獎項逐項分開（第 5 條）**：本張的兩筆紀錄**都是入圍未得獎**（第 30 屆金曲獎最佳樂團獎、第 9 屆金音創作獎最佳樂團獎）。**行文絕不可用「獲得」帶過。** 樂團的最佳樂團獎得獎紀錄屬 2021 年《GOLDEN 太子 BRO》（第 33 屆金曲獎、第 12 屆金音創作獎），**那張已在池中，本卡不寫**。\n⚠ **發行方兩說，本層推翻策展層的單一寫法**：MB 的 TW release 掛好有感覺音樂（FJ007）、中文維基作品表也寫好有感覺音樂，**但第 30 屆金曲獎入圍名單上的報名單位是「好球娛樂有限公司」**——名字只差一個字、是兩個不同的實體。**行文可以寫廠牌是好有感覺音樂，但不得寫「由好有感覺音樂送件參賽」。**\n⚠ **中文維基那張獎項表有格式錯亂**：2018 年那幾列的 rowspan 把「第 15 屆台灣原創流行音樂大獎 河洛語組首獎」與一筆「最佳現場演出獎」擠在同一格，**兩筆的歸屬讀不出來**，本層因此**不把台灣原創流行音樂大獎寫進 facts**（第 156 條的精神：讀不清就不算一票）。\n**英文盤名有兩種來源**：中文維基作品表的《深海童話 Fairy Tales of Ocean Deep》與 MB 的 Pseudo-Release「Fairy Tales of the Ocean Deep」（多一個 the）。**兩種都進去重表，正式盤名仍是中文。**\n**曲名一處差異**：Apple 第 3 軌〈深海洋〉、MB 第 3 軌〈深海〉。**facts 兩種都記了，行文取哪一種都要一致。**\n**發行日兩說**：MB 2018-07-27、Apple 2018-06-19，差五週。**卡片年份取 2018，行文不得寫到日。**\n⚠ **試聽——與《GIGO》同一個形狀**：修過重試的 `probe-previews` 重探後，八個店面仍全是 `0→0`；本層另以 `血肉果汁機 Flesh Juicer 深海童話`、`血肉果汁機 深海童話` 兩種字串在 tw 實搜，**都是 0 筆**，單獨用團名搜的 11 筆結果裡也沒有這張。但 `lookup?id=1398909746&country=tw&entity=song` **回 11 軌、每一軌都帶 previewUrl**，逐軌與 MB 相符（第 1 軌兩邊都是〈海底騎士〉）。**建議本機走 `apple-verified-collection` 路徑，用 collectionId 1398909746 補試聽。**\n**explicit 已核（§6）**：Apple 標 explicit、逐軌七軌 explicit，**不是淨化版**。\n**互斥分派——本張獨占「打開／關閉太陽的對稱」「報名單位與廠牌一字之差」兩條線。**\n**本張禁用**：廟會與喪禮的靈感、輾核轉金屬核、逐軌英文副題、第 6 屆金音創作獎、第 27 屆金曲獎包裝獎（全部分派給《GIGO》）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
