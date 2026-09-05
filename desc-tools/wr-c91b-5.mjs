import fs from 'fs';
const OUT='/home/user/dip-vinyl-shop/desc-tools/batches/research/c91-b.json';
const A=JSON.parse(fs.readFileSync(OUT,'utf8'));
const W=(o)=>A.push(o);
W({
 key:"desc4:百合花 Lilium|不是路", artist:"百合花 Lilium", album:"不是路",
 facts:[
  {f:"MusicBrainz release-group eb333d7a 的欄位：title《不是路》、artist-credit「百合花」、first-release-date 2021-12-24、primary-type Album、secondary-types 空、轄下 1 個 XW／Official release，9 軌，廠牌欄空白。",src:"https://musicbrainz.org/release-group/eb333d7a-a0d7-4226-a1f8-a091f9c7889d"},
  {f:"九軌的曲序：〈靈光〉〈拜六〉〈掠猴之歌〉〈假幸福〉〈蝴蝶雙飛〉〈物仔〉〈聽伊的〉〈到遮看破〉〈不是路〉；開場〈靈光〉1:41、末軌同名曲〈不是路〉6:12。",src:"https://musicbrainz.org/release/89ca0536-ac15-4475-ba15-725bb75bfc19"},
  {f:"第 33 屆金曲獎（2022 年）最佳台語專輯獎由百合花《不是路》得獎，報名單位滾石國際音樂股份有限公司；同屆同獎的其他入圍者為新寶島康樂隊《新寶島康樂隊 第12張剪剪花》、血肉果汁機《GOLDEN 太子 BRO》、王俊傑《看無》、江惠儀《空》、張涵雅《下半場》。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC33%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"同屆《不是路》另拿下最佳裝幀設計獎（入圍者陳念瑩），另有三項入圍未得獎：年度專輯獎（得獎者蔡健雅《DEPART》）、最佳編曲人獎（入圍者鄭各均、林奕碩、林威佐、陳奕欣，入圍作品〈拜六〉）、最佳專輯製作人獎（入圍者鄭各均）。中文維基〈第 33 屆金曲獎〉的統計表把百合花《不是路》記為入圍 5 項、得獎 2 項。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC33%E5%B1%86%E9%87%91%E6%9B%B2%E7%8D%8E"},
  {f:"第 13 屆金音創作獎（2022 年）本張有兩筆入圍未得獎：最佳現場演出獎（入圍作品《百合花不是路專輯發片專場》）與最佳搖滾歌曲獎（入圍作品〈不是路〉）。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC13%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"中文維基〈百合花 (樂隊)〉記樂團 2011 年開始在 YouTube 上傳試聽帶、兩年後著手台語創作，現由林奕碩（主唱兼吉他）、林威佐（貝斯）、陳奕欣（鼓組）組成；infobox 的演奏樂器欄除電吉他、電貝斯、鼓組外，另列北管鑼鼓、北管嗩吶、高音直笛與長柄月琴，音樂類型欄列搖滾、台語流行音樂、北管、南管與唸歌。",src:"https://zh.wikipedia.org/zh-tw/%E7%99%BE%E5%90%88%E8%8A%B1_(%E6%A8%82%E9%9A%8A)"},
  {f:"同條目記樂團 2019 年 9 月發行首張錄音室專輯《燒金蕉》，該碟拿下第 10 屆金音創作獎最佳新人（團）獎與最佳搖滾專輯獎兩座，並入圍第 31 屆金曲獎最佳台語專輯獎與年度專輯獎。",src:"https://zh.wikipedia.org/zh-tw/%E7%99%BE%E5%90%88%E8%8A%B1_(%E6%A8%82%E9%9A%8A)"},
  {f:"九軌的曲長從 1:41 到 6:12。",src:"https://musicbrainz.org/release/89ca0536-ac15-4475-ba15-725bb75bfc19"},
  {f:"Apple Music 台灣店面的條目（collectionId 1719745856）：標題《不是路》、掛名百合花、9 軌、releaseDate 2021-12-24、notExplicit。",src:"https://music.apple.com/tw/album/1719745856"}
 ],
 hookCandidates:["電吉他旁邊擺著北管嗩吶與長柄月琴","九首歌裡，最後那首同名曲一個人佔掉六分鐘"],
 sound:"九軌的曲長從開場〈靈光〉的 1:41 到末軌同名曲的 6:12；編制把北管鑼鼓、嗩吶與長柄月琴放進搖滾三件式裡，唱的是台語。（本欄由 MB release 的逐軌曲長與中文維基 infobox 的樂器欄歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["不是路","拜六","靈光"],
 status:"full",
 notes:"**⚠ 派工詞點名的那件事，本層正著查了、確認無誤**：**第 33 屆金曲獎最佳台語專輯獎的得獎者就是百合花《不是路》**（`zh.wikipedia.org/zh-tw/第33屆金曲獎` 的該獎表格上，金點標在《不是路》那一列，報名單位滾石國際音樂）。**裝咖人《夜官巡場》同屆只入圍最佳新人獎、且未得獎**（該屆最佳新人獎得主是珂拉琪《MEmento·MORI》），**它從頭到尾沒有出現在最佳台語專輯獎的名單上**。主線先前的候選清單記錯了，本層以獎項官方名單為準推翻它。\n**得獎與入圍逐項分開（第 5 條）**：本張在第 33 屆是**入圍 5 項、得獎 2 項**——得獎的是最佳台語專輯獎與最佳裝幀設計獎，落空的是年度專輯獎、最佳編曲人獎、最佳專輯製作人獎。第 13 屆金音創作獎的兩筆都是**入圍未得獎**。**行文若只寫「拿下金曲獎」會抹掉這個分野，要寫清是哪一個獎。**\n**最佳裝幀設計獎的得獎人是陳念瑩、不是樂團**，行文要指名。\n**《燒金蕉》的年份分歧（給本機的一筆）**：中文維基〈百合花 (樂隊)〉正文與作品表都記 **2019 年 9 月**，且該碟是以**第 31 屆金曲獎（2020）**與**第 10 屆金音創作獎（2019）**參賽——兩個屆次都指向 2019 年發行。**池中《燒金蕉》記 2019 是對的，MB release-group 0001ceab 的 2018 才是可疑的那一個**，本機端不必改池中卡片。（策展層已提出，本層以兩個獎項屆次補上第二重證據。）\n**MB 廠牌欄空白**：滾石國際音樂是金曲獎的**報名單位**，不等於發行廠牌。**行文不得斷言廠牌**。\n**試聽**：`previews.json` 標 ready、`tw:4→1`、collectionId 1719745856、9 軌，逐軌與 MB 相符（第 1 軌兩邊都是〈靈光〉）。**無異議**。\n**互斥分派——本張獨占「第 33 屆金曲獎兩座」「傳統樂器進搖滾編制」「《燒金蕉》的獎項前史」三條線。** 同批《萬事美妙》不得重述樂器編制與《燒金蕉》。",
});
W({
 key:"desc4:百合花 Lilium|萬事美妙", artist:"百合花 Lilium", album:"萬事美妙",
 facts:[
  {f:"MusicBrainz release-group d37f4cf8 的欄位：release-group 標題是英文的《Everything Will Go Wonderfully》、artist-credit「百合花」、first-release-date 2024-09-13、primary-type Album、secondary-types 空；轄下兩個 Official release 各用一種盤名——TW 那筆標題《Everything Will Go Wonderfully》、XW 那筆標題《萬事美妙》，兩筆都是 13 軌。",src:"https://musicbrainz.org/release-group/d37f4cf8-4ea5-4807-8dff-8b000f5b78b1"},
  {f:"十三軌的曲序：〈自由自在〉〈萬事美妙〉〈生分人〉〈怪味〉〈出來〉〈顛倒是非〉〈無剉〉〈龍眼〉〈過場〉〈失戀歌〉〈追追追〉〈假使我是一個女人〉〈重新出發〉；第 9 軌〈過場〉只有 0:20。",src:"https://musicbrainz.org/release/59f97e25-bb57-48bb-98ab-b865efb98328"},
  {f:"中文維基〈百合花 (樂隊)〉的曲目表把第 8 軌記作〈龍眼 feat. 伍悅 Marko Woo〉。",src:"https://zh.wikipedia.org/zh-tw/%E7%99%BE%E5%90%88%E8%8A%B1_(%E6%A8%82%E9%9A%8A)"},
  {f:"第 16 屆金音創作獎（2025 年）百合花《萬事美妙》拿下最佳專輯獎，同屆並獲評審團獎（頒給《萬事美妙》）。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC16%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"同屆本張另有四項入圍未得獎：最佳樂團獎（得獎者 Robot Swing）、最佳搖滾專輯獎（得獎者 FUTURE AFTER A SECOND《『異骨』Xenobones》）、以〈萬事美妙〉入圍最佳搖滾歌曲獎（得獎者貓膽汁〈失望〉）、以〈怪味〉入圍最佳另類流行歌曲獎（得獎者 LÜCY〈Nothing ever stops me〉）；主唱林奕碩另以《萬事美妙》入圍最佳創作歌手獎，得獎者為林以樂《素顏的樣子》。",src:"https://zh.wikipedia.org/zh-tw/%E7%AC%AC16%E5%B1%86%E9%87%91%E9%9F%B3%E5%89%B5%E4%BD%9C%E7%8D%8E"},
  {f:"十三軌的曲長從〈過場〉的 0:20 到〈追追追〉的 4:45。",src:"https://musicbrainz.org/release/59f97e25-bb57-48bb-98ab-b865efb98328"},
  {f:"Apple Music 台灣店面的條目（collectionId 1764559132）：標題《萬事美妙》、掛名百合花、13 軌、releaseDate 2024-09-13、notExplicit。",src:"https://music.apple.com/tw/album/1764559132"}
 ],
 hookCandidates:["同一張碟在台灣掛中文名、在國際店面掛英文名","十三軌裡有一軌只有二十秒，名字就叫〈過場〉"],
 sound:"十三軌的曲長從 0:20 的〈過場〉到 4:45 的〈追追追〉，中段那一軌短到只夠當一次呼吸；第 8 軌有客座掛名。（本欄由 MB release 的逐軌曲長與中文維基曲目表歸納，構成它的原始值都在 facts 裡。）",
 keyTracks:["萬事美妙","怪味","追追追"],
 status:"full",
 notes:"**盤名中英取捨（策展層的可逆裁定，本層支持中文）**：MB 的 release-group 標題與 TW 實體 release 都是英文《Everything Will Go Wonderfully》，只有 XW 數位版與 Apple TW 用中文《萬事美妙》。金音創作獎的入圍名單全部用中文《萬事美妙》——**這是第三個站在中文那一邊的來源**，比策展層原本的兩票再多一票。維持中文為主名。\n**獎項逐項分開（第 5 條）**：本張在第 16 屆金音創作獎是**兩座得獎（最佳專輯獎、評審團獎）＋四項入圍未得獎**，另有主唱個人的最佳創作歌手獎入圍未得獎。⚠ **中文維基〈百合花 (樂隊)〉的獎項表把最佳專輯獎寫成「年度專輯獎」——金音創作獎沒有這個獎項名**，以獎項條目的正式名稱「最佳專輯獎」為準，本層已推翻藝人條目那個寫法。\n**本張查無金曲獎紀錄**：第 36 屆金曲獎（2025）的完整名單裡沒有百合花。**行文不得暗示它入圍過金曲獎。**\n**〈追追追〉與〈假使我是一個女人〉這兩個曲名在台語歌史上另有同名前作**，但**本層查不到本張這兩軌與那些前作的關係**，**行文不得寫成翻唱或致敬**（第 110 條）。\n**MB 廠牌欄空白**，`label` 留空是對的。\n**試聽**：`previews.json` 標 ready、`tw:2→1`、collectionId 1764559132、13 軌，逐軌與 MB 相符（第 1 軌兩邊都是〈自由自在〉）。**無異議**。\n**互斥分派——本張獨占「中英兩種盤名並存」「第 16 屆金音創作獎兩座」「二十秒的〈過場〉」三條線。**\n**本張禁用**：北管與傳統樂器編制、《燒金蕉》的年份與獎項、第 33 屆金曲獎（全部分派給《不是路》）。",
});
fs.writeFileSync(OUT, JSON.stringify(A,null,1));
console.log('now',A.length);
