# add-20261023-ml52 裁定（情緒薄格策展線・恍惚：2000s R&B ballad／slow jam 續集＋ml49 剩餘 quiet storm 成人抒情、女聲慢板 R&B）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 11 輪，本工作階段負責 ml52、mc39（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml52 列；可擴寫：ml49 剩餘的 quiet storm 成人抒情、2000s 慢板 neo-soul、女聲慢板 R&B），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml52.json`（54）→ 主線汰 0（`master-override-ml52.json` 空）→ `master-ml52.json`（MB 回查 54/54 釘住、人工 0；flag 1 見下）→ `pick.json`（45，候補 9）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml52-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 20521–20530、b 20531–20540、c 20541–20550、d 20551–20560、e 20561–20570、鉤子 20571–20580、寫作 20581–20590、主線 20591–20600。**
---

## 主線策展（不佔條號）
- 策展 54（2000s 男聲 slow jam 二線 26、老將 2000s quiet storm 慢盤 15、女聲慢板 R&B 13）；moodGuess 全過邊距（x 2.0–2.6、y 0.8–1.0、z 1.0–1.6），y 有 40 張正好 0.8。去重：seed 與所有 curation-*.json 0 撞。
- **頭牌不提**：Joe、Dru Hill、Brian McKnight、Donell Jones、112、Ginuwine、Musiq Soulchild、Tyrese、Monica、Brandy、Tamia、Faith Evans 池中判輕、x≈3 或快慢各半。主力為池中同人已落恍惚（y 0.6–0.9）的歌手其他盤與池中沒有的二線。
- **候補 9（不入 pick，研究汰換時從這裡補）**：Avant《The Letter》《Face the Music》（同人勻量；池中 y 0.6）、Ronald Isley《Here I Am: Isley Meets Bacharach》（管弦乾淨判輕風險）、Will Downing《After Tonight》（smooth jazz 風險，ml49 先例）、Jaheim《Appreciation Day》、Anthony Hamilton《What I'm Feelin'》（同人勻量、聲音資料少）、Jon B.《Pleasures U Like》（製作乾淨）、Tank《One Man》（數位製作、同人勻量）、Angie Stone《Stone Love》（中板數首）。
- **MB flag**：Lalah Hathaway《Where It All Begins》MB 首發 2010-01-01 為佔位值，策展填 2011（Concord／Stax 2011-10），研究層核對。'Bout It、Baby Makin' Music、Ain't Nobody Worryin' MB 正題彎引號，卡用 ASCII 撇號。

## 研究 e 組
- 20561：Lalah《Where It All Begins》年份核對：MB 2010-01-01 為佔位值，維基與 Stax 發行為 2011-10-18，策展填 2011 正確。
- 20562：moodGuess 存疑（快慢各半或乾淨數位，建議汰換）：Regina Belle《Believe in Me》（E-Smooth／Mike & Manni 節奏製作，AllMusic 稱生涯節奏推力最強）、Lalah（AllMusic：harder beats、disco-funk 最佳曲，九組製作人）、Vivian Green《Vivian》（Storch 數位鼓點，兩支單曲舞曲榜冠軍）、Keke Wyatt《Soul Sista》（Huff 的 groove／中板，樂評稱公式化）、Syleena Johnson《Chapter 2》（〈Guess What〉約 82 BPM 中速，Hi-Tek 等拼盤，含 Busta Rhymes 混音）、Miki Howard《Pillow Talk》（AllMusic：drum loops 或 smooth jazz 編曲，含 Which Way Is Up 等快板）。
- 20563：輕度存疑：Vivian Green《Beautiful》（AllMusic：heavily synthesized、programmed，So Far Gone 為中板，慢歌比例無來源）、Marsha Ambrosius《Friends & Lovers》（前段為 slow jam，後段有〈Stronger〉Dr. Dre／DJ Premier 式硬拍，19 首含 5 段插曲，約六成慢，可保留）。
- 20564：大致成立：Kelly Price《Soul of a Woman》（NYT：多數為 languorous ballads；但有 R. Kelly／Stevie J. 中板單曲與 2 段插曲）。
- 20565：推翻策展層一處：Keke Wyatt curatorWhy 稱本盤有〈My First Love〉；該曲是 Avant 的單曲、Keke 客串，不在本盤，Avant 在本盤客串為 Nothing in This World、I Can't Wait、Bad Boy 三首。
- 20566：日期與銷量衝突取捨：Regina Belle MB 1998-09-22 對維基 1998-06-09，Kelly Price MB 1998-01-01（佔位）對維基 1998-08-11，寫作層一律只寫年份；Keke Wyatt 藝人頁稱逾百萬張，專輯頁為 RIAA 金唱片／SoundScan 約 56.6 萬，採專輯頁；Kelly Price 廠牌寫 T-Neck（Island 發行）最穩。
- 20567：Vivian、Vivian Green《Beautiful》、Miki Howard 標 status thin（聲音的逐首速度查不到來源，其餘身分、年份、廠牌皆對）；AllMusic／SoulTracks 全文 403，未取 Discogs。

## 研究 d 組
- 20551：Silk《Always and Forever》：翻唱專輯，Houston Press 稱編曲逐音忠於原版；原版含 new jack（Nite and Day 1988）、合成器放克（Don't Disturb This Groove 1987）、舞曲（A Night to Remember 1982）三首中快板，其餘六七首慢歌。moodGuess 存疑（慢歌約六七成、製作承襲八〇年代數位鍵盤，非厚暖）。無逐曲 BPM 來源。
- 20552：Kenny Lattimore《Uncovered / Covered》：MB 單一發行為兩碟 24 軌，第二碟《Covered》11 首為 Fred Hammond 製作的福音（含 Rejoice (Clap Your Hands)、No Limit）；第一碟含 Tonight (2 Step)、Figure It Out。moodGuess 嚴重存疑，建議降級或汰換；MB 掛名「Kenny Lattimore & Chanté Moore」，留意池中重複。
- 20553：Kenny Lattimore《Timeless》：Barry J. Eastmond 一人製作的 11 首翻唱，Verve，Smooth Jazz Airplay 單曲；慢歌占多數但無逐曲速度，製作偏拋光，z 可能低於預估。小存疑。
- 20554：Will Downing《Emotions》：GRP、Jazz 與 Contemporary Jazz 專輯榜雙第 2；查無專輯級樂評與製作名單（AllMusic、SoulTracks、Discogs 403，Wikipedia 無獨立條目），status thin。與 ml49 汰掉 Downing 的 smooth jazz 盤同屬風險，moodGuess 存疑，建議降 z 或換候補。
- 20555：Freddie Jackson《Life After 30》：Orpheus 1999，製作人有 Force MDs 成員 Shawn Waters、Bayyan 兄弟、Paul Laurence；篇名與含混音版單曲顯示前半偏中速 R&B，後半 Laurence 四首較像慢歌；無樂評，status thin，moodGuess 存疑，建議降級或汰換。
- 20556：Phil Perry《The Heart of the Man》：推翻策展層「Perri 樂團」（實為 The Montclairs，1980 年代初與 Kevin Sanlin 雙人檔）；「假音」未見來源，不寫。Duke、Porcaro、Ritenour 等錄音室樂手，Call Me 登 Hot R&B Singles 第 1 名（單站互證）。大致成立，x 可能略偏低。
- 20557：Angie Stone《The Art of Love & War》：評論稱許多歌偏慢，同時稱「現代、數位質感」；Baby 為 Adult R&B 冠軍的中板單曲，Pop Pop、Play Wit It 等為中板。慢歌估七至九首，z 偏高，可降到 1.0–1.2；小存疑。
- 20558：Angie Stone《Unexpected》：推翻策展層「慢板為主、厚低頻合成墊」——Wikipedia 稱轉向舞曲流行、放克、上揚，Apple Music 評論稱 I Ain't Hearin' U、Hey Mr. DJ 是舞曲、Tell Me 是 Auto-Tune 夜店曲；製作為乾淨數位。moodGuess 嚴重存疑，建議汰換。MB 首發日 2009-01-01 為佔位，美國實際 2009-11-23。
- 20559：Chanté Moore《Love the Woman》：AllMusic Kellman 稱慢歌「彼此相似」並稱製作滑順，George Duke 製作 Give Me Time 與 Guess Who I Saw Today；Can't Do It 風格不搭、Special 可能為中板。大致成立，小存疑；R&B 榜名次專輯頁 14、藝人頁 15，採專輯頁。
- 20560：備註：本組可靠度——Silk 與 Downing 缺逐曲 BPM；Downing、Jackson 標 thin。SoulTracks（Silk 評論）僅來自搜尋摘要，不入 facts。

## 研究 c 組
- 20541：9 張 moodGuess 逐張核對，Rahsaan／Dwele／Stroke of Genius／Body Kiss／Baby Makin' Music／Mr. I 六張 notes 標「moodGuess 存疑」（快慢各半或中快板／R. Kelly、JD 式數位製作、嘻哈硬拍）；In My Songs 聲音證據薄（thin）；Do I Speak、Love Session 大致成立。
- 20542：《Do I Speak for the World》美國首發廠牌為 Elektra（2004-11-30），卡單 Atlantic 取自 MB 英國版；建議主線改 Elektra。年份不變。
- 20543：Body Kiss MB 首發 2003-01-01 為佔位，實際 2003-05-06；Rahsaan 美國版 2004-10-26 為 Artistry Music，卡單 Dome 為英國首發，兩者並存。
- 20544：Mr. I 年份 2010 屬 2000s 場景邊緣，留給主線。

## 研究 b 組
- 20531：9 張逐張核 moodGuess。存疑偏嚴重（建議汰換）：Dave Hollister《Real Talk》（hip-hop infused、開場取樣 James Brown 硬拍、Karma 鼓更硬，慢歌證據僅 Pleased Tonight／Almost）、Raheem DeVaughn《Love & War MasterPeace》（概念盤，三段口白＋Ludacris／Wale 合作，無慢板為主的來源）、Tank《Force of Nature》（Timbaland 掛七首、EW 稱 leaden beats、快慢各半、乾淨數位）、Jesse Powell《'Bout It》（AllMusic 明寫 hip-hop-ish 製作＋medium-tempo groove，Rodney Jerkins；策展「慢板為主」不成立）。
- 20532：輕度存疑（快慢／製作乾淨）：Anthony Hamilton《The Point of It All》（Boston Phoenix 稱 clinical、programmed beats、一首接一首 mid-tempo；EW 稱 midtempo simmer；Vibe 稱 upbeat）、《Back to Love》（Hamilton 自述要 brighter、more mainstream；曲長短）、Case《Open Letter》（無任何速度來源，製作 Tim & Bob 偏數位）。
- 20533：大致成立：Anthony Hamilton《Ain't Nobody Worryin'》（dreamy／dreary／swampy hot、福音、Delta blues；但 Sista Big Bones 俏皮，非整張慢板）、Tank《Sex, Love & Pain》（roller coaster of ballads、Adult R&B 冠軍單曲、四首逾 5 分鐘；smooth urban contemporary 製作仍有乾淨數位風險）。
- 20534：推翻／更正策展層：(1) Point of It All 卡單 label「BMG」→ Wikipedia／MB 皆為 So So Def／Zomba／Mister's Music，建議改 So So Def；(2) 'Bout It 的 curatorWhy「慢板 ballad 為主」不成立；(3) 'Bout It 為 1998，屬 2000s 場景外延；MB 廠牌 MCA、Wikipedia Silas／MCA，卡單 Silas，並存。
- 20535：日期衝突：Case《Open Letter》MB 2001-04-04、Wikipedia 2001-04-24，寫作層只寫「2001 年 4 月」；Point of It All MB 兩個 release 12-15／12-16，Wikipedia 12-16，取 12-16。
- 20536：各盤的 AllMusic、SoulTracks 皆 403／503，評論多為 Wikipedia 轉述或搜尋摘要；NPR（Raheem、Hamilton Back to Love）503，未入 facts。無法逐曲核速度，曲名推測速度的句子只留在 notes（Force of Nature），不入 facts。
- 20537：Jesse Powell 的銷量認證（Wikipedia 內文 70 萬 vs 表格 50 萬）互相衝突，不寫；Powell 逝世屬無關後續事件，不寫。
- 20538：moodGuess 汰換建議優先序（高→低）：Jesse Powell、Tank Force of Nature、Raheem DeVaughn、Dave Hollister、Anthony Hamilton Point of It All、Anthony Hamilton Back to Love；保留：Hamilton Ain't Nobody Worryin'、Tank Sex Love & Pain、Case Open Letter（輕度）。

## 研究 a 組
- 20521：9 張 moodGuess 逐張核對，**九張全標「moodGuess 存疑」**，無一能證實「全盤慢歌」。重度：Still Ghetto（嘻哈客串與取樣硬拍多，慢歌約四到五首）、Makings of a Man（PopMatters 直指前半 R&B thug 取向，I've Changed 為加速取樣；慢歌約三首）、Things in the Game Done Changed（維基明言比前作更多 uptempo，It's Okay／No One Else／Baby Do Those Things 為中快板，慢歌約三分之一到一半）、Director（多製作人、Lil Wayne／Lloyd Banks／Dupri 客串，Avant 自言加了嘻哈）。中度：Ghetto Classics（Like a DJ 為 Storch 俱樂部硬拍，後三四首才是慢歌）、Let's Talk About It（AllMusic 稱更 upbeat、更光滑，17 位製作人偏光滑數位）、Private Room（The Pitch 稱慵懶但「central iciness」，Vibe 稱 midtempo，偏冷與乾淨合成器）。輕度：Another Round（Boston.com 稱拋光、克制、steady groove，標題曲衝榜取向）、So Much Better（AllMusic 稱 hip-hop-spiced grooves，Baby Cham 版 Oh No）。建議主線依此汰換或降級；Jaheim 前三張與 Hollister 製作屬取樣厚暖，不是乾淨數位，若入池至少 z 無虞。
- 20522：Director 推翻策展層：curatorWhy 寫「Steve Huff 製作的厚鍵盤墊」，實際 Huff 僅做約三首，其餘為 Dupri、Cox、Jerkins、The Underdogs、Ron Fair 等。
- 20523：發行日兩邊不一，年份皆不變：Still Ghetto（MB 11-04／維基 11-05）、Ghetto Classics（MB 2006-01-06／美版維基 2006-02-13）、Another Round（MB 02-08／維基 02-09）、Hollister（維基 2002-09-17／MB 10-15）。
- 20524：Carl Thomas《So Much Better》廠牌：MB 為 umbrella records、維基為 Umbrella Recordings 與 Unsung Entertainment（Bungalo／Universal 負責通路），卡單 Bungalo Records；建議卡面維持 Bungalo 或改 Umbrella，主線定奪。
- 20525：Another Round、Private Room、Let's Talk About It、So Much Better 四張因逐曲速度與慢歌比例查無來源，status 標 thin；AllMusic 全站 403、NYT／Vibe／BBC／EW 不可抓，已改用 PopMatters、Boston.com、The Pitch、DJBooth、Urban Bridgez 與維基引文。
