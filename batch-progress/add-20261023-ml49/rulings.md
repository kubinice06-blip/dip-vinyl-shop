# add-20261023-ml49 裁定（情緒薄格策展線・恍惚：90s R&B slow jam／ballad 二線＋2000s slow jam＋alt R&B 濕暖剩餘）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 10 輪，本工作階段負責 ml49、mc38（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml49 列；可擴寫：2000s R&B slow jam 二線、ml8 alt R&B 濕暖剩餘），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml49.json`（53）→ 主線汰 1（`master-override-ml49.json`）→ `master-ml49.json`（MB 回查 52/52 釘住、人工 0；flag 2 見下）→ `pick.json`（45，候補 7）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml49-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 20121–20130、b 20131–20140、c 20141–20150、d 20151–20160、e 20161–20170、鉤子 20171–20180、寫作 20181–20190、主線 20191–20200。**
---

## 主線策展（不佔條號）
- 策展 53（90s 慢歌合唱團 9、90s 男聲 slow jam 二線 13、90s quiet storm 成人抒情 15、2000s 擴寫 12、2010s 濕暖 alt R&B 4）；moodGuess 全過邊距（x 2.2–2.5、y 0.8–1.1、z 0.7–1.5），但 y 大多正好 0.8，貼格線風險高。
- **主場景頭牌池中多判輕**：Jodeci、H-Town、Shai、Tony! Toni! Toné!、Jade、Dru Hill、Total、Xscape、Blackstreet、Keith Sweat、Guy、Joe、McKnight、Benét、K-Ci & JoJo、112、Avant、Jaheim 池中 y −0.6～+0.3，策展未提；主力改池中沒有的二線藝人與 ml6 已收、池中 y 0.6–0.9 的 quiet storm 歌手其他盤（同藝人不設上限，非重複專輯）。
- **主線汰 1**：Rome《Rome》（與池中新民謠 Rome 同名不同人，藝人介紹與去重都會撞，不收）。
- **候補 7（不入 pick）**：中快板／乾淨製作風險較高的 Donnie《The Colored Section》、Kut Klose《Surrender》（Keith Sweat 製作，池中 Sweat y ≤ 0）、Sam Salter（LaFace 乾淨）、Leela James（中速 groove）、JMSN《Whatever Makes U Happy》（funk 中速）、Kindred《Surrender to Love》、Men of Vizion《MOV》。研究汰換時從這裡補。
- **MB flag**：Brownstone《Still Climbing》MB 1996-12-16 vs 策展 1997（維基 1997-06）、Angela Winbush 同名作 MB 正題「Àngela Winbush」疑誤植，採常用拼法（queryAlias 留原題），研究層核對。


## 研究 d 組

- **20151**　Angela Winbush 同名作標題核對：MB 與 Discogs 正題皆為「Àngela Winbush」，Discogs 的盤面印刷寫法（ANV）欄同為 Àngela，重音符是封面實際印法，不是 MB 誤植；藝人名仍 Angela。卡片沿用常用拼法，queryAlias 保留。
- **20152**　moodGuess 存疑（建議主線試聽後再定、必要時從候補補）：Keith Washington《KW》（AllMusic「high-tech, hip-hop-influenced production」、Billboard 提 midtempo、Darkchild／Fred Jerkins III 數位時期製作）、Teddy Pendergrass《A Little More Magic》（Calloway 兄弟／Levert／Booker 製作，維基稱〈Believe in Love〉為 new jack swing，Discogs 標 Electronic／Disco）、Freddie Jackson《Time for Love》（維基風格 funk／soul／hip-hop，Vincent Herbert 製作一首）；輕度存疑：Miki Howard《Femme Fatale》、Angela Winbush、Lalah Hathaway 兩張、Raheem DeVaughn、Phyllis Hyman（樂評「縈繞不去」字眼偏暗）。九張都找不到逐曲速度來源，慢歌比例皆未驗。
- **20153**　廠牌更正建議：Lalah Hathaway《Outrun the Sky》版權頁為 Mesa/Bluemoon Recordings（Pyramid Music Corp.／AGU Entertainment，ARK 21／UMVD 發行），卡單「Pyramid Records」建議改。Phyllis Hyman 首發為 Zoo Entertainment／Philadelphia International 合發，卡單 PIR 不算錯。
- **20154**　聲音來源薄，status 標 thin：Miki Howard《Femme Fatale》、Freddie Jackson《Time for Love》（僅製作人、客席樂手與風格標籤，無逐曲聲音描述）。
- **20155**　維基互相矛盾處不寫入 facts：Miki Howard〈Ain't Nobody Like You〉Hot 100 名次（64／84）、Keith Washington《KW》R&B 榜名次（26／27）、Freddie Jackson 發行日（維基 08-03／MB 08-11）、Raheem DeVaughn 銷量（維基標需引用）。
- **20156**　Phyllis Hyman 辭世屬與作品直接綁定事件（身後發行），facts 簡述並標時序；Hyman、Pendergrass 之外未觸及作品後的無關生平事件。

## 研究 a 組
- 20121　Intro《Intro》：曲序前半約五首是 new jack swing 中快板、後半才是慢歌（Soulbounce），慢歌約一半或不到，與策展『整張慢板』不符；moodGuess 存疑，建議汰換或降候補。MB 1993-04-06 vs Wikipedia 1993-03，年份 1993 不變。
- 20122　Intro《New Life》：聲音面僅有 Shazam／Apple 藝人簡介（放慢、內省、抒情為主）與 Soulbounce「更成熟內省」，無逐曲速度、無弦樂／殘響來源，status 標 thin。策展稱〈Funny How Time Flies〉為翻唱，未找到證據，facts 不寫。
- 20123　Silk《Tonight》：AllMusic「ballad-heavy、略過度製作」；17 曲含 interlude 與訪談，中板曲（〈Baby Check Your Friend〉〈Playa Road〉〈Turn-U-Out〉）速度無來源；弦樂／Rhodes 墊無來源。輕度存疑。
- 20124　Men of Vizion《Personal》：new jack swing 風格、Vibe「tight, bouncy production」、單曲為 Riley／Jerkins 中快板；乾淨明亮的數位鼓機型。moodGuess 存疑，建議汰換。
- 20125　Changing Faces《All Day All Night》：AllMusic「smooth urban R&B with light hip-hop influences」，含律動曲〈No Stoppin' This Groove〉〈Baby Tonight〉，單曲偏短；R. Kelly 稀疏鼓機風險成立。moodGuess 存疑，建議汰換。
- 20126　Brownstone《From the Bottom Up》：AllMusic「funk workouts 與 slinky slow jams 交替」，〈Pass the Lovin'〉為 New Jill Swing、〈Sometimes Dancin'〉雷鬼節奏、十幾位製作人。存疑，建議汰換。**年份推翻**：美國版 1995-01-10（Wikipedia），MB 1994-12-22（奧地利版），卡單 1994；留給主線裁定年份。
- 20127　Brownstone《Still Climbing》：USA Today「慢歌遠多於快歌」支持 moodGuess；Jerkins／Tricky Stewart 為乾淨數位質地，溫熱混響無來源。MB 1996-12-16 是日本版，美國版 1997-06-23，卡單 1997 無誤（解除主線 flag）。保留。
- 20128　Aaron Hall《The Truth》：Wikipedia 標 R&B／new jack swing／soul，製作含 Hank Shocklee、Gary G-Wiz，〈Do Anything〉〈Open Up〉〈Get a Little Freaky With Me〉可能中快板，慢歌約一半；存疑，建議汰換或降候補。2023 年對 Hall 的未經證實指控與專輯無關，不入 facts。
- 20129　Aaron Hall《Inside of You》：Henderson「去掉 Guy 專輯裡快的 new jack swing 就接近這張」支持慢歌為主；但 Wikipedia 風格標含 new jack swing、無聲音描述，Wilson／Johnson 屬乾淨數位製作。大致成立，慢歌占比未逐曲驗證。保留。
- 20130　全組共同：AllMusic 頁 403、Discogs 未用；樂評無一使用陰暗／冷峻／憂鬱字眼。「弦樂墊、濕殘響、厚低頻」這類策展 why 全組找不到來源，facts 一律不寫。

## 研究 c 組
- 20141　Chanté Moore《Precious》：Rolling Stone 稱標題曲有「exhilarating stride」、〈Who Do I Turn To〉「infectious groove」，LA Times（1992 演唱會評）批「pop-ish arrangements」；12 首中 10 首 4:40 以上但無逐曲 BPM。moodGuess 存疑（輕～中），聲音來源皆 Wikipedia 轉述。
- 20142　Chanté Moore《A Love Supreme》：Washington Post「slow, deep grooves」、Sun Sentinel「mellow」支持慢暖；AllMusic 稱 mid-tempo grooves，另有 This Time／Soul Dance 舞曲向。moodGuess 存疑（輕）。
- 20143　Chanté Moore《This Moment Is Mine》：製作人含 Darkchild、Jermaine Dupri、Guy Roche，本人稱要脫離爵士味走更廣當代 R&B，主打單曲 Hot 100 前十、內插 One Bad Apple 的中速歌。moodGuess 存疑（中），建議主線判是否汰換（候補 7 可補）。
- 20144　Kenny Lattimore & Chanté Moore《Things That Lovers Do》：AllMusic「sweet slow-jam」「make-out album」，全盤對唱慢板，無存疑；EW 嫌缺熱度屬演唱溫度非速度。facts 不寫各曲原唱（未逐曲查證）。
- 20145　Regina Belle《Passion》：AllMusic「ballads and mid-tempo」；人員表顯示 Tango in Paris（Kool Moe Dee 饒舌）、The Deeper I Love（鼓機＋搖滾吉他）、Do You Wanna Get Serious／Love（銅管、拉丁打擊樂）偏中快，約 4 首；弦樂僅 3 首標示。moodGuess 存疑（中）。藝人頁稱白金、專輯頁稱約 38.9 萬張，兩頁衝突，不寫認證。
- 20146　Regina Belle《Reachin' Back》：人員表只有第 11 軌有真弦樂（Clare Fischer），其餘為合成器／鼓機程式或 Levert sequencing，與策展『厚弦樂、溫熱混響』不符。moodGuess 存疑（中）。MB 11 軌含 32 秒 intro，Wikipedia 稱 11 covers，寫作層避開精確曲數。
- 20147　Will Downing《Love's the Place to Be》：廠牌 MB 美國版為 Fourth and Broadway／PolyGram，Wikipedia 寫 Mercury，卡單不改、寫作層寫『PolyGram 旗下』。Sounds of Surprise「medium-tempo」、Daily Breeze「most tracks same speed and intensity」，樂手為爵士一線、聲部分明。moodGuess 存疑（中）。
- 20148　Will Downing《Invitation Only》：Discogs 風格 Smooth Jazz／Soul-Jazz，客串有 Goodfellaz（嘻哈團）、Family Stand，Marcus Miller、Yellowjackets 參與；聲音來源只有風格標籤與 Sounds of Surprise 一句，status thin。moodGuess 存疑（中），建議汰換候選。
- 20149　Will Downing《All the Man You Need》：AllMusic「beats hit a little harder」，Sounds of Surprise「modern R'n'B grooves」，PopMatters「D'Angelo-esque」，Questlove／Palladino／Poyser／Elevado 的 neo-soul 質地、全盤曲短（最長 5:07）。moodGuess 存疑（中～高），建議汰換。葛萊美：專輯頁第 43 屆入圍、藝人頁寫 2000，採專輯頁。
- 20150　全組共同：AllMusic 回 403、WebSearch 只用 1 次；樂評無一使用陰暗／冷峻／憂鬱字眼。Chanté Moore 三張＋合作盤、Passion、Reachin' Back 的『厚弦樂』描述多找不到來源。本組身分與年份、廠牌（除 20147 的 4th & Broadway／Mercury 表述）皆與卡單相符，無推翻。

## 研究 b 組
- 20131　Case《Case》：取樣為 The Payback、P.S.K.、Raekwon、Method Man，AllMusic 用 tough／hard edge 並嫌力道不足；moodGuess 存疑（中高），傾向偏躁偏亮，建議汰換候補。身分無推翻。
- 20132　Case《Personal Conversation》：AllMusic（Promis）明說 Case 在中快板較強、慢歌弱；Vibe 提到快歌取樣；〈Scandalous〉feat. Cam'ron。moodGuess 存疑（中）。〈Happily Ever After〉榜位單一搜尋摘要，不採。
- 20133　Dave Hollister《Ghetto Hymns》：Sermon／Jazze Pha／Stevie J 的 hip-hop soul，Redman 與 Too $hort 客串，〈Baby Mama Drama〉7:51；『風琴墊』無來源，福音味僅〈Respect 2 Him〉。moodGuess 存疑（中）。
- 20134　Dave Hollister《Chicago '85... The Movie》：僅兩首明確抒情曲＋〈Doin' Wrong〉被形容 brooding（單曲級，非全盤陰暗字眼），其餘速度未查到。存疑（輕）；建議主線抽聽。
- 20135　Gerald Levert《Love & Consequences》：soulexpress 批快板與說唱客串曲（〈No Sense〉〈No Man's Land〉），稱慢歌最動人；弦樂無來源。存疑（中）。
- 20136　Gerald Levert《Gerald's World》：只有 AllMusic／Blender 對嗓音的描述，速度與低頻無來源；策展寫的〈Funny〉不在曲目表（以 MB 為準）。存疑（輕）。
- 20137　Kenny Lattimore《Kenny Lattimore》：Billboard『subdued』、EW 老派靈魂、〈For You〉Adult R&B 17 週冠軍，支持原判；弦樂／Rhodes 墊無來源。不存疑。維基把 Maniquin 首作寫 1998，採 1989。
- 20138　Kenny Lattimore《From the Soul of Man》：維基稱樂評見『ballads and upbeat grooves』，〈Days Like This〉有 Masters at Work 舞曲混音；日期維基 9/8 對 MB 10/20 並列；策展稱〈Days Like This〉為翻唱，查無來源。存疑（輕）。
- 20139　Kenny Lattimore《Weekend》：自述『fun, straight-up R&B』、派對快歌、Battlecat／Saadiq 製作、〈Rapture〉貝斯線。moodGuess 存疑（強），建議汰換。
- 20140　全組共同：AllMusic 回 403（評語取自維基轉述）；WebSearch 用 2 次；樂評無一使用陰暗／冷峻／憂鬱字眼。九張身分、年份、廠牌皆與卡單相符，無推翻。

## 研究 e 組
- 20161　Raheem DeVaughn《Love Behind the Melody》：PopMatters 8/10 評語指『mellow midtempo suites』（Marvin《I Want You》式假音），明確快歌僅〈Energy〉〈Friday〉（約 2–3 首／17 首含 3 個過門），Empty 合成器『buzzing』偏現代亮；SoulTracks 批缺變化、無陰暗字眼。moodGuess 輕度存疑（y 貼線）。Grammy 只寫提名。
- 20162　Calvin Richardson《2:35 PM》：Soul Express／PopMatters 一致指向風琴＋吉他＋擊掌的中板『鄉土 Stax』，慢歌僅〈More Than a Woman〉〈Not Like This〉等，PopMatters 稱比首作 less moody。moodGuess 存疑（中強），建議汰換。〈Keep On Pushin'〉製作歸屬兩源互衝，facts 不寫。
- 20163　Heather Headley《This Is Who I Am》：Windy City Times『ballads, funky tracks and dance numbers』，兩支單曲皆進舞曲榜前五，SoulTracks『churchy』『joyous』，策展層稱〈He Is〉為慢板與來源不符。moodGuess 存疑（中），建議汰換。
- 20164　Marsha Ambrosius《Late Nights & Early Mornings》：SoulTracks『mid-tempo groove』『sweet and dreamy』『bittersweet』，Ambrosius 自述 sensual/seductive；Slant『drab』指單調非陰暗；缺低頻殘響直接證據，〈Far Away〉7 分多。輕度，不列存疑。Floetry 銷量單源。
- 20165　Glenn Lewis《World Outside My Window》：BBC『rarely rises above a languorous pace』、〈One More Day〉為少數快歌，Larry Gold 弦樂在 5 首（Discogs 逐軌），SoulTracks『lazy beat』『Moog、cello』。支持原判，不存疑。Juno 說法兩源衝突，取 Wikipedia。
- 20166　Frank McComb《Love Stories》：Discogs 逐項樂器（Rhodes／Yamaha C7／Moog Prodigy／synth bass）、6 首長達 5–7 分、PopMatters『laid back neo-70s moog groove』；缺逐曲 tempo、無弦樂證據。輕度存疑。錄音年 1998（Discogs）對 1999（Wikipedia）衝突，不寫年份；勿稱出道作（MoJazz 更早錄音被擱置）。
- 20167　inc.《no world》：Pitchfork 用 velvet／Quiet Storm（暖），也用 grey guitars、cavernous、mystery、Cocteau Twins／This Mortal Coil；〈The Place〉〈5 Days〉有 trap 碎拍；《衛報》對前一張 EP 用 sepulchral／funereal。moodGuess 存疑（z 暖度），恐落頹靡而非恍惚。
- 20168　JMSN《Velvet》：沒有任何專文評論可查（AllMusic／Pitchfork／RYM／Bandcamp／Genius 皆擋或無頁），只有 Discogs 一人包辦、Apple 14 首／1 小時 3 分、單曲名；status thin，聲音完全無法驗證。建議汰換（候補另補）或先試聽。
- 20169　Ari Lennox《age/sex/location》：Pitchfork『groovy, upbeat』、Rolling Stone『brighter, full-on thumper』『bounce』『swinging』，慢歌僅〈Stop By〉〈Queen Space〉等；Vulture『hazy beats』偏暖。moodGuess 存疑（中），中快板估近半。
- 20170　全組共同：身分、年份、廠牌九張皆與卡單相符；AllMusic 全程 403、Slant Cloudflare、Pitchfork（inc.、Ari）改用 https 可讀；WebSearch 用 3 次。無樂評使用陰暗／冷峻字眼，唯 inc.（grey／cavernous）與其前作 EP（sepulchral）例外。


## 主線：研究後汰換（不佔條號）
- 研究層聲音與 moodGuess 不符，直接汰 17（卡單、研究稿、`pick.json` 同步移除，45 → 28）：
  - 中快板／new jack swing 占半數以上、或硬拍取樣 hip-hop soul（判躁／判輕風險）：Intro《Intro》（前半 new jack）、Men of Vizion《Personal》（bouncy production）、Brownstone《From the Bottom Up》（放克律動交替）、Aaron Hall《The Truth》（Shocklee 製作、快慢各半）、Case《Case》（James Brown／Schoolly D 硬拍取樣）、Kenny Lattimore《Weekend》（派對快歌）、Teddy Pendergrass《A Little More Magic》（new jack、Discogs Electronic／Disco）、Freddie Jackson《Time for Love》（funk／hip-hop）、Heather Headley《This Is Who I Am》（舞曲榜單曲、dance numbers）、Ari Lennox《age/sex/location》（groovy, upbeat；池中同人 y 0.7 貼邊）。
  - 乾淨數位／聲部分明（判輕）：Changing Faces《All Day All Night》（R. Kelly 稀疏鼓機、smooth urban）、Keith Washington《KW》（high-tech production）、Will Downing《Invitation Only》（smooth jazz）、《All the Man You Need》（neo-soul 乾拍、曲短）、Calvin Richardson《2:35 PM》（中板鄉土 Stax、聲部乾實）。
  - 色溫判冷：inc.《no world》（grey guitars、cavernous、比 Cocteau Twins；研究稿陰冷字眼的 alt R&B 落頹靡先例）。
  - 無聲音來源：JMSN《Velvet》（thin）。
- 候補 7 張同樣是中快板／乾淨製作風險（策展層自己標的），不補位；照實上架 28。
- 留下但存疑、交評分裁定：Case《Personal Conversation》、Dave Hollister《Ghetto Hymns》、Gerald Levert《Love & Consequences》、Chanté Moore《This Moment Is Mine》、Regina Belle《Passion》《Reachin' Back》（合成器鼓機）、Will Downing《Love's the Place to Be》（中板）——慢歌為主、quiet storm 歌手池中同人 y 0.6–0.9 落格。
- 研究推翻照研究稿：Brownstone《Still Climbing》美國首發 1997-06-23（MB 1996-12 為日本版），flag 結案、年份 1997 不變；Angela Winbush 同名作盤面確印「Àngela Winbush」，卡用常用拼法、queryAlias 留原題；Lalah Hathaway《Outrun the Sky》廠牌改 Mesa/Bluemoon；Frank McComb《Love Stories》是 Columbia 首作、不是出道作。
- qa-batch research：28 張 key 一致、全過。
