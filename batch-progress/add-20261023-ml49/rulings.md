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

## 鉤子層（a–c）（20171–20175）
- **20171** 交件：`desc-tools/batches/hooks/add-20261023-ml49-hooks-a.json`（4）、`-b.json`（7）、`-c.json`（7），key 逐字、順序同研究稿（汰除後 18 張）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Intro《New Life》）上限 170、其餘 230。逐筆（預算／hook 加權／hook 原始字元）：New Life（thin）167／22／25｜Tonight 226／20.5／23｜Still Climbing 216／21.5／27｜Inside of You 227／20.5／23｜Personal Conversation 219／22／26｜Ghetto Hymns 211／20.5／27｜Chicago '85 225／18／18｜Love & Consequences 220／17.5／29｜Gerald's World 229／22／28｜Kenny Lattimore 207／21／29｜From the Soul of Man 229／19／27｜Precious 230／21／24｜A Love Supreme 228／19／19｜This Moment Is Mine 229／22.5／30｜Things That Lovers Do 210／16／16｜Passion 214／22／22｜Reachin' Back 227／18／18｜Love's the Place 229／20／27。初稿 16 張超標（最高 335），整格捨去：New Life 榜位與 1997 暫停活動；Silk 的 Allamby 被找來的緣由（會點名同批 Levert）；Brownstone 英國榜與另兩位團員名；Aaron Hall 吶喊唱法影響一句；Case 製作人十多位與〈Happily Ever After〉；Ghetto Hymns 的 McDonald 翻唱與〈Tom's Diner〉；Chicago '85 的 Larrabee／Grundman；L&C 的製作人群與 EastWest；Gerald's World 的 Mike City／Campbell；Lattimore 首作製作人；From the Soul of Man 的〈Days Like This〉；Precious 的 61 週；This Moment 的〈One Bad Apple〉內插；Things 的 Mauldin 起意；Passion 的 Kool Moe Dee；Reachin' Back 的三組製作分工細目；Downing 的 Rachelle Ferrell 對唱。壓完回核 hook 依賴格：New Life 家暴前移 g2、Brownstone「最後一張」前移 g1、Gerald's World 隱藏曲前移 g2、Lattimore〈For You〉前移 g2、This Moment 的 J.Lo 前移 g2、Reachin' Back 真弦樂前移 g2、Downing 口琴前移 g2、Ghetto Hymns 補「離團後」進 g1、Silk 補「隔四年」進 g1；其餘本在 g1／g2。hook 自驗改字：Precious「簽走」→「簽下」（她是被 Warner 放掉，不是被搶走）；Passion「同時」→「隔年」（《阿拉丁》1992、專輯 1993）；A Love Supreme「多達十五位」→「約十五位」（研究稿為約數）。
- **20172** 骨架歸屬（18 張 18 條，只在擁有者 note 寫歸屬句）：New Life＝第二張轉向內省並把家暴寫進情歌盤；Tonight＝隔四年為爭創作掌控權回歸；Still Climbing＝換團員後的最後一張；Inside of You＝團體主唱單飛延續舊團慢歌路線；Personal Conversation＝廠牌定調說故事的概念盤＋本人日後自評；Ghetto Hymns＝離團後首作、hip-hop 製作配福音壓軸；Chicago '85＝盤名與錄音地反差（歌手自製）；Love & Consequences＝跨團體歌手與名家對唱翻唱；Gerald's World＝隱藏曲長碟；Kenny Lattimore＝慢熱首作靠第三支單曲創榜紀錄；From the Soul of Man＝多年後紀錄片帶動銷量（後世流傳，標時序）；Precious＝被大廠擱置、新廠牌第一號簽約；A Love Supreme＝十多位製作人串成歌曲循環；This Moment Is Mine＝暫別與人事停擺後回歸＋讓出的單曲；Things That Lovers Do＝戀人對唱翻唱盤（封底警語）；Passion＝動畫主題曲收進個人盤；Reachin' Back＝致敬翻唱盤（真弦樂只一首）；Love's the Place＝爵士一線樂手伴奏＋名家口琴。d／e 組請避開以上 18 條。hook 四型：懸疑（Tonight、This Moment、Gerald's World、Chicago '85）／斷言（Inside of You、Personal Conversation、A Love Supreme、Reachin' Back、New Life）／場景（Things、From the Soul of Man、Love's the Place、Passion）／人物定調（Still Climbing、Ghetto Hymns、L&C、Precious、Kenny Lattimore）。
- **20173** 同藝人分軸與「他／她」引入：Moore（3＋合作盤）——Precious 帶生平（1967 舊金山、12 歲搬聖地牙哥）＋hook「她」；A Love Supreme 作曲欄（與 Moultrie 合寫 8 首、共同執行製作）；This Moment 親屬（暫別期間生女）；Things 以兩人名字並列＋戀人關係。Lattimore（2＋合作盤）——首作學歷（Howard）；From the Soul of Man 引本人說法（lyric album）。Hollister——Ghetto Hymns 帶出身（芝加哥、Blackstreet 四人之一）＋hook「他」；Chicago '85 名字領句＋自製，聚焦錄音地。Levert——L&C 團體資歷（LeVert、LSG；避開池中《Groove On》已用的 O'Jays 父親句）；Gerald's World 嗓音（男中音）。Belle——Passion 成長背景（教會、學歌劇；避開池中《Stay With Me》的製作分路與「女歌手」句）；Reachin' Back 出道經歷（Manhattans 開場歌手）。Silk 改用五部和聲句、Downing 改用出道年句，避開池中 ml6 已上架的「亞特蘭大男聲團／Keith Sweat 發掘」與「1963 年生於布魯克林的男中音」。第二句句型 18 種逐張配死：樂種年代／和聲／編制＋執行製作／團體職位／作品序／出身＋團體／名字＋自製／團體資歷／嗓音／學歷／自述／生年出生地／作曲欄／親屬／兩人關係／成長背景／出道經歷／出道年。
- **20174** 日期「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Tonight 日交、Still Climbing 日美、Inside of You 日經、Personal Conversation 日透、Ghetto Hymns 日開、L&C 日出、Kenny Lattimore 日面、Precious 日終、A Love Supreme 日以、Things 日趕、Passion 日首、Reachin' Back 日正、Love's the Place 日登；New Life、Chicago '85、Gerald's World、From the Soul of Man、This Moment 只寫到年或月。初稿與 d／e 已交件的「由／推／發／上／問／，／在」撞 7 處，全部改在本側。研究層禁區照辦：所有速度、殘響、弦樂墊、低頻厚度不進 note（研究稿無來源）；New Life 不寫翻唱；Gerald's World 不寫〈Funny〉；From the Soul of Man 不寫 Harrison 原曲與發行日（MB／維基衝突）；Reachin' Back 不寫精確翻唱曲數；Passion 不寫認證；Downing 廠牌寫「PolyGram 旗下」；A Love Supreme 不連 Coltrane；Levert 2006 辭世、Greene 2001 病逝皆屬無關後續，不進。媒體名與媒體榜單名次（含排名文章）一律不進 note，樂評一律寫「樂評說」；分數星等 0。
- **20175** 自查：hook 之間（本側 18 張＋d／e 10 張）中文 4-gram 0；開頭前四字對 add-2026102* 全部 hooks 0 撞（改掉「唱片公司」撞 ml5／ml10、「Mich」撞 md7／ml19、「Stev」撞 md7、「Def 」撞 ml3）；對池中他批 hooks 殘留 4-gram 只剩各 ×1 的「唱了一首」「隔了四年」「一段故事」「離開後他」「芝加哥錄」「是洛杉磯」「紀錄片裡」（已改掉「唱片公司」×38、「最後一首」×28、「的主題曲」×12、「在洛杉磯」×11、「的製作人」×11、「壓軸那首」×6 等）；hook 與自卡 note 只共用專名，無逐字句重複。`node qa-batch.mjs hooks add-20261023-ml49`：全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml49`：✓ 全部通過（5 組 28 張）。輔助腳本：scratchpad `hook-ml49-abc/`（ml49-abc-{a,b,c}.mjs、ml49-abc-emit.mjs、ml49-abc-gram.mjs）。

## 鉤子層（d–e）
- **20176** 交件：`desc-tools/batches/hooks/add-20261023-ml49-hooks-d.json`（6）、`-hooks-e.json`（4），key 逐字照研究稿、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（d2 Miki Howard）。逐筆（預算／hook 加權／hook 原始字元）：d1 I Refuse to Be Lonely 221／19／19、d2 Femme Fatale 170／22.5／30（thin）、d3 Angela Winbush 230／22／29、d4 Outrun the Sky 228／15／15、d5 Self Portrait 215／23.5／29、d6 The Love Experience 230／21.5／29、e1 Love Behind the Melody 224／20.5／25、e2 Late Nights & Early Mornings 224／17／22、e3 World Outside My Window 212／23／30、e4 Love Stories 228／21／27。初稿 10 張全超標（250–436），整格捨去：Hyman 錄音室名單、Gamble／Huff 執行製作、Nancy Wilson 內頁、曲長；Howard 的 Giant 以外製作陣容與 R&B 冠軍單曲；Winbush 替 Mills／Isleys 寫歌、九首超過 5 分鐘、〈Treat U Rite〉名次；Outrun 的 Joe Sample 合作與作曲數；Self Portrait 的 Terrace Martin、曲數；DeVaughn 首作的 Kenny Dope／Scarborough 片段與名次；Love Behind 的 Chucky Thompson、曲數與首週銷量；Ambrosius 的 Floetry 破裂經過與 J Records 結束營運；Glenn Lewis 的 Juno 提名、雙簧管英國管；McComb 的 MoJazz 擱置、樂器清單、曲目包夾。壓完回核：hook 依賴全在 g1／g2（d5 的「前十」由 g5 前移到 g1；d1「五個月」在 g2→g3）。媒體名、樂評人名、評分一律不進 note（評語只留聲音描述：Love Behind「中慢板、假音」、Glenn Lewis「慵懶的慢步調」、Self Portrait「中板、原聲與 slow jam」）；排行一律寫「R&B 專輯榜／美國專輯總榜」，不寫媒體名。
- **20177** 骨架歸屬（10 張 10 條；只有擁有者寫歸屬句）：d1＝身後發行（錄完不久辭世、五個月後出版）；d2＝銀幕角色與唱片互文（同年演 Billie Holiday、翻唱 Holiday）；d3＝夫妻檔（新婚丈夫兼經理人掛執行製作、對唱）；d4＝被大廠放人、相隔十年回來；d5＝轉投老牌靈魂廠牌、首次進前十；d6＝地方場景（華府 U Street 現場圈→簽約）；e1＝唯一客串饒舌＋先行單曲葛萊美提名；e2＝首週名次只被大熱專輯擋下；e3＝嗓音酷似前輩被當成對嘴；e4＝唱片公司拿不定定位（靈魂或 smooth jazz）＋貴人牽線大廠。與 a–c 對照後改兩處：e4 拿掉「MoJazz 錄音遭擱置」（與 Chanté Moore《Precious》、Lattimore 同名作的「錄音擱置」同構）；e2 拿掉「Floetry 破裂、單飛」（與 Hollister《Ghetto Hymns》離團首作同構），Floetry 只留在第二句當身分。hook 四型：懸疑 d4、e4／場景 d1、d2、e3／人物定調 d3、d6／斷言 d5、e1、e2。
- **20178** 「他／她」引入法與第二句句型配表：**Lalah Hathaway ×2 分軸**——d4 帶生平（廠牌關係領句：1990 年在 Virgin 出道；1994 年被放人），d5 帶錄音細節（客席領句：貝斯手 Marcus Miller 助陣；Rideout 製作、弦樂）；「Donny Hathaway 的女兒」已在 ml6《A Moment》當第二句，本批兩張都不指派。**Raheem DeVaughn ×2 分軸**——d6 帶生平（自稱領句：R&B hippie neo-soul rock star；U Street、Jive 簽約），e1 帶錄音細節（親屬領句：父親爵士大提琴手 Abdul Wadud；客串、製作、名次）。其餘：d1 舞台經歷（《Sophisticated Ladies》、東尼獎入圍）、d2 影響來源（受爵士歌手影響的芝加哥歌手）、d3 伴唱團經歷（Wonderlove）、e2 國籍（英國 R&B 歌手、出身 Floetry）、e3 成長城市（多倫多長大的加拿大歌手）、e4 樂器（自己彈 Rhodes 與 Moog）。避開 a–c 已用的「年生於」（Aaron Hall／Lattimore／Chanté／Regina Belle）、「原是」（Reachin' Back）、「本作是第 N 張」（Case／Downing）；Miki Howard、Phyllis Hyman 避開 ml6 已上架卡的雙親福音、Side Effect、生年費城、女低音。「日」後一字：d1 辭、d2 推、d3 與、d4 發、d5 由、d6 開、e1 釋、e2 將、e3 美，e4 只寫到年月；與 a–c 的交／在／經／，／上／問／出／面／終／以／趕／首／正／登互異（初稿 d6 上、e1 問、e2 ，、e3 在與 a–c 撞，已改）。
- **20179** 自查：開頭前四字對全 hooks 目錄互異（初稿 e1「Big 」撞 ts5、ml16，e4「唱片公司」撞 8 筆，已改）。hook 之間中文 4-gram：本組 10 張對全批 28 張 hook 0 條（初稿 d5「她的專輯」撞 Chanté《Precious》、已改）；本組 hook 對全批 note 0 條（初稿 e4「唱片公司」對 Brownstone note、已改）；對其他批 hook 只剩「了五個月」「最後錄的」「專輯榜的」各 1 筆泛用殘片（初稿「這批錄音」×12、「的第一張」×34、「整張只有」×11、「出現一次」×8、「錄音室專輯」×4 已改）。hook 與自己 note 無 4-gram 重複（初稿 e3「高中才藝」、e4「靈魂樂還是」已改）。note 無否定校對痕跡；Miki Howard〈Ain't Nobody Like You〉Hot 100 名次、Winbush 標題重音、Outrun 廠牌、McComb「出道作」皆照研究層處理（未指派）。
- **20180** 腳本：`node qa-batch.mjs hooks add-20261023-ml49`：全部通過 ✓（5 組 28 張）；`node chk-hook-crossgroup.mjs add-20261023-ml49`：全部通過 ✓（hook 加權 15–23.5、note 165–240）。
