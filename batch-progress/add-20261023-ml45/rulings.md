# add-20261023-ml45 裁定（情緒薄格策展線・恍惚：rocksteady／early reggae 慢歌＋lovers rock 剩餘）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 9 輪，本工作階段負責 ml42、ml45；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml45 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml45.json`（25 張）→ `master-ml45.json`（MB 回查 24 釘住、人工 1、flag 4）→ 主線全收 → `pick.json`（25）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml45-cards.json`（25 張；研究 a–e 各 5）。身分：MB 釘住 24、§1 人工 1（Delroy Wilson《Worth Your Weight in Gold》，MB 只有 1978 同名單曲）。
> **預留：研究 a 19561–19570、b 19571–19580、c 19581–19590、d 19591–19600、e 19601–19610、鉤子 19611–19620、寫作 19621–19630、主線 19631–19640。**
---

## 主線策展（不佔條號）
- **主場景是半個死池**：主線先查池中三軸——rocksteady／60s–70s 初 reggae 與 lovers rock 幾乎全落放鬆（Alton Ellis 三張 y −0.4～−0.6、Ken Boothe −0.6／−0.8、Phyllis Dillon −0.8、John Holt《1000 Volts》−0.8、Paragons、Melodians、Heptones 同名、Bob Andy、Hopeton Lewis、Marcia Griffiths、Carroll Thompson、Janet Kay 全負）；落恍惚的只有低頻厚、濕混音的（Heptones《Party Time》y 1.2、Gregory《Cool Ruler》0.8、John Holt《Police in Helicopter》0.8、Horace Andy 70s 末–80s 0.9–1.5）。策展照此只收 rocksteady 歌手**後期的濕混音慢板盤**（Junjo／Roots Radics、Channel One、Tubby／Jammy、showcase／disco mix）與 rocksteady 復興盤，乾淨明亮的 60 年代 Treasure Isle／Studio One 原錄音一張不收。
- 策展 25 張（目標 54，主場景見底照實交）：rocksteady-wet 16（John Holt 7、Delroy Wilson 2、Horace Andy 2、Justin Hinds、Johnny Osbourne、Wailing Souls、Cornell Campbell、Alton Ellis）、rocksteady-revival 7（The Frightnrs 3、Cornell Campbell 2、Jah Wobble 合作盤 2）、lovers-dub 2（Hollie Cook dub 版 2）。moodGuess x 2.3–2.6、y 0.9–1.3、z 0.8–1.3。
- **flag 4 張裁定**：Johnny Osbourne《Never Stop Fighting》（MB 首發日 2010、原盤 1982 Greensleeves）、Wailing Souls《On the Rocks》（MB 1997、原盤 1983）——MB release-group 只掛了再版，年份照原盤首發年，收。Hollie Cook《Prince Fatty Presents Hollie Cook in Dub》《Happy Hour in Dub》MB 為 Album＋Remix：原製作人做的 dub 版伴奏專輯是 reggae 的正規專輯形式（池中 In Dub Conference、Bob Andy's Dub Book 先例；Remix 次類型先例 mc11 Kraftwerk《The Mix》），收。
- 去重：seed 0 撞；ml1 提過被汰的盤未重提；對 origin 前 60 個 `claude/*` 分支 seed 與卡單、本工作階段 ml42 卡單 0 撞。
- 研究層重點查 y：Alton Ellis《A New Day》、Delroy《Go Away Dream》、John Holt《My Desire》只有製作證據；The John Holt Showcase 是否 flying cymbal 輕快鼓型；Frightnrs《Nothing More to Say》仿 Studio One 可能偏乾；Jah Wobble 兩張 Cleopatra 企劃盤只有廠牌文案。

## 研究 d 組
- 19591：Alton Ellis《A New Day》查無聲音樂評，只有 Discogs 製作證據（Channel One 錄、Roots Radics、長笛）；notes 標 moodGuess 存疑（y 無證據）。〈Why Birds Follow Spring〉為 1960s 舊歌重錄（6:04）。
- 19592：Cornell Campbell《Rock My Soul》身分一致；9 首中 5 首 dub，聲音僅憑名單與曲目，標 moodGuess 存疑（現代英國錄音厚度未知）。
- 19593：Cornell Campbell meets Soothsayers《Nothing Can Stop Us》PBS FM 評「開闊明亮、upbeat、Afrobeat 銅管」，只有結尾一首 dub outro；標 moodGuess 存疑，建議主線考慮汰換。
- 19594：Horace Andy & Jah Wobble《Timeless Roots》發行日來源衝突（Discogs／MB 2024-09-27，Soundshelter 8-8），年份 2024 不變；翻唱含輕快曲，標 moodGuess 存疑。
- 19595：Ken Boothe & Jah Wobble《Old Fashioned Ways》僅廠牌文案，Rough Trade 頁被 Cloudflare 擋；status thin，12 首多為 3 分鐘上下，標 moodGuess 存疑。

## 研究 e 組
- 19601　Frightnrs《Nothing More to Say》：樂評一致是明亮輕快的 sun-splashed rocksteady，無低頻／殘響證據，標 moodGuess 存疑（y 恐為負）；身分與年份（2016-09-02、Daptone）無誤。
- 19602　Frightnrs《More To Say Versions》：Axelrod 自混整張 dub，但無任何評論描述聲音，status thin；限量張數 Discogs 2000／Groovement 3000，兩者並陳。
- 19603　Frightnrs《Always》：年份 2022-05-27（Wikipedia Daptone 條寫 2023 為誤）；GRAMMY.com「sparse quality of dub」為唯一聲音證據。
- 19604　Hollie Cook《…in Dub》：Remix 次類型確認是原製作人 Prince Fatty 自己的 dub 版，收錄成立；DIY 有重低音、強殘響旁證，moodGuess 成立。
- 19605　Hollie Cook《Happy Hour in Dub》：查不到誰混（Discogs 製作名單 Ben McKone、Luke Allwood、Hollie Cook），不寫混音者；聲音僅有宣傳稿，thin，建議實聽。

## 研究 a 組
- 19561　Holt《Sweetie Come Brush Me》：身分與年份（Volcano Vol-001、1982）成立；Channel One 錄混、Junjo 製作、Radics 署名皆有 Discogs 證據；英國 Creole 版《Gold》曲序不同，已寫入 facts。「殘響濕、低頻厚」無樂評證據，moodGuess 存疑（僅製作間接證據）。
- 19562　Holt《For Lovers and Dancers》：Trojan TRLS 223、1984 吻合；Discogs master 年份為 0，以 MB 為準。只有署名（Radics、Sylvan Morris 錄、Blackbeard 混），無樂評，status thin，moodGuess 存疑。Blackbeard 署名為 Rodguel Sinclair，單一來源，不展開。
- 19563　Holt《Just the Two of Us》：Channel One 1982 年 3 月錄配混，製作人是 David White（策展層未提）；Radics 全班署名。無樂評，moodGuess 存疑（速度與低頻為推定）。
- 19564　Holt《A1 Disco Showcase》：Discogs 備註節奏在 Channel One 錄、混音與 dub 在美國 Blank Tapes 由 D. Spear 做（非牙買加 Tubby／Jammy）；全盤 41 分鐘，六首 5:57–8:17。年份採 1980（Wikipedia 1981 不採）。moodGuess 存疑：dub 長度、殘響量與拍子不明，Sly & Robbie 的 rockers 拍恐較輕快。
- 19565　Holt《The John Holt Showcase》：策展層「六首各接 dub 長版」查無證據（Discogs 僅六首、無時長、無 dub 標示）；製作署名 The Now Team，封面 Bunny Lee。moodGuess 存疑：1977 Bunny Lee 製作，flying cymbals 輕快鼓型風險高，建議主線汰換或降先序。

## 研究 c 組
- 19581　Cornell Campbell《Boxing》：身分、年份、廠牌（Starlight SDLP 908、1982）成立；Discogs 盤註 Channel 1 錄、Tubby's 混與配唱，Bunny Lee 製、Jammy 混。聲音無樂評；曲目有 Gorgon 時期標題（〈The Gorgon Is Back〉〈Natty Dread〉），維基稱 Gorgon 期是 Santa Davis flying hi-hat，moodGuess 存疑（可能輕快）。維基說〈Boxing〉熱門單曲是 Joe Gibbs 製，與本盤製作人不同，寫作層勿混。
- 19582　Delroy Wilson《Go Away Dream》：身分成立（Black Music BMLP 803、1982）；reggae.be 證實 1982 年 5 月 Tubby's 剛錄完、Jammy 在場。全盤 12 首情歌，無 dub 段（dub 版在《Dubbing In The Backyard》）；鼓手同列 Sly 與 Santa Davis，Discogs 標 Lovers Rock，moodGuess 存疑；策展層『靈魂翻唱』無來源，不寫。
- 19583　Delroy Wilson《Worth Your Weight in Gold》：人工身分成立（Burning Sounds BS 1060、1984）；Discogs master 備註：原錄音 1969–1978、Gussie Clarke 處理成延長版，六首 6:31–9:55 約 48 分鐘。推翻策展層『1984 Sly & Robbie 偏乾淨』的前提：樂手是 70 年代末錄音的延長，Discogs 標 Dub，但維基稱 Clarke 追求光滑與 discomix，速度與鼓型無來源，moodGuess 存疑。
- 19584　Horace Andy《Sings for You and I》：Discogs 兩個 1978 版（牙買加 Total Sounds《…Yours》、美國 Clocktower《…I》）皆標 Compilation，三位鼓手兩位貝斯手並列，本質是 Bunny Lee × Tubby 彙編；仍保留（1978 同期原版、有定位），status thin。Santa Davis／Benbow 在列，flying cymbals 風險，moodGuess 存疑。維基列的 Striker Lee 1985 版是另一盤。
- 19585　Horace Andy《Showcase》：身分成立（Tad's TRD LP 52880、1980；維基 1984 Vista Sounds 為另版，年份採 1980）。**推翻策展層『人聲接 dub』**：Discogs 三版皆為十首人聲曲，dub 要到後來 Deluxe Edition 才首度出現。Roots Radics 伴奏支持慢重，但速度與殘響無樂評，建議聽感驗證。

## 研究 b 組
- 19571：Osbourne《Never Stop Fighting》年份照原盤 1982 Greensleeves GREL 38（MB 首發 2010 為再版；Discogs master／Roots Archives 皆 1982）。Wailing Souls《On the Rocks》照 1983 GREL 59（MB 1997-12 為美版再版）。
- 19572：推翻策展層『Osbourne 1969 年在 Studio One 以 rocksteady 出道』：Wikipedia 為 1967 年 The Wildcats、Studio One 出道單曲〈All I Have Is Love〉，未載 rocksteady；早年細節（Come Back Darling 年份）Wikipedia 與 United Reggae 兩說不一，facts 只取單一版本。
- 19573：moodGuess 存疑三張請主線汰換或實聽：Osbourne（Greene 樂評寫 brighter／breezy、Discogs 風格含 Dancehall，單曲約 3 分鐘，不像慢板；Torn Light／Forced Exposure 兩頁 WebFetch 被擋，內容取自搜尋摘要）；Wailing Souls（Sly & Robbie 同掛名、Reggae LP Archives 標 Rub-A-Dub，可能偏快；無樂評）；Holt《Introspective》（『Part 1&2 人聲接 dub』無來源明講，Channel One Style 可能偏硬鼓點）。Holt《My Desire》與 Hinds《Just In Time》只有錄混人員可證，無聲音描述；Hinds 含流行翻唱，速度存疑。
- 19574：Holt《Introspective》廠牌兩說並存（Discogs／Roots Archives No Entry DSR 2552；Wikipedia Dynamic Sounds），卡單 No Entry 不改；B 面曲名以 Discogs 註記為準（Brandy、Everybody's Talking，非 Roots Archives 的 Branded／Mr. Fix It）。
- 19575：WebSearch 用滿 3 次；Discogs API、MB API、Wikipedia、Roots Archives 以 curl 取得。My Desire 與 Introspective 標 thin（聲音查無樂評）。

## 主線研究後汰換（不佔條號；2026-10-23）
- 25 張全查不到專輯級樂評，聲音只能靠製作鏈與樂手欄推定；**只憑查無不汰**（池中同人：Wailing Souls 四張、Osbourne 多張、Justin Hinds《Jezebel》、Hollie Cook 兩張、John Holt《Police in Helicopter》都落恍惚），**有反證的一律汰**。
- **汰 8 張**：
  - 輕快鼓型／明亮：John Holt《The John Holt Showcase》（1977 Bunny Lee、flying cymbals 年代、無 dub 證據）、Cornell Campbell《Boxing》（Gorgon 時期 flying hi-hat）、Johnny Osbourne《Never Stop Fighting》（樂評 brighter、breezy，Discogs 標 Dancehall）、The Frightnrs《Nothing More to Say》（樂評「sun-splashed joy」、輕盈 60 年代風）、《Always》（評為 sparse）、Cornell Campbell meets Soothsayers《Nothing Can Stop Us》（樂評「開闊明亮」、Afrobeat 銅管、upbeat）。
  - 非正規專輯：Horace Andy《Sings for You and I》（Discogs 兩個 1978 版都標 Compilation，三組鼓手、不同場次彙編）。
  - 證據最薄且偏輕：Ken Boothe & Jah Wobble《Old Fashioned Ways》（只有廠牌文案、3 分鐘流行翻唱〈My Girl〉〈Reggae Christmas〉；池中 Jah Wobble 盤 z 0.1–0.4 色溫貼邊）。
- 不補位：策展已回報主場景見底。
- 定案 **17 張**（a 4、b 4、c 3、d 3、e 3）：John Holt 6（Sweetie Come Brush Me、For Lovers and Dancers、Just the Two of Us、A1 Disco Showcase、My Desire、Introspective）、Justin Hinds《Just In Time》、Wailing Souls《On the Rocks》、Delroy Wilson 2、Horace Andy《Showcase》、Alton Ellis《A New Day》、Cornell Campbell《Rock My Soul》、Horace Andy & Jah Wobble《Timeless Roots》、Frightnrs《More To Say Versions》、Hollie Cook dub 版 2。汰除卡存 `dropped-cards.json`，研究稿移到 `dropped-research.json`。研究 qa-batch 全過。
- 研究層更正：Horace Andy《Showcase》與 John Holt《A1 Disco Showcase》以外的「人聲接 dub」說法查無（Showcase 三版本皆十首人聲曲）；A1 Disco Showcase 的 dub 混音在美國 Blank Tapes（D. Spear），不是 Tubby／Jammy；Just the Two of Us 製作人 David White。

## 鉤子層（a–e）（19611–19615）
- **19611** 交件：`desc-tools/batches/hooks/add-20261023-ml45-hooks-a.json`（4）、`-b.json`（4）、`-c.json`（3）、`-d.json`（3）、`-e.json`（3），key 逐字、順序同研究稿（汰除卡已移出，17 張）。本批只派一位鉤子代理，五組全做。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；研究稿 thin 的 6 張上限 170、其餘 230。逐筆（預算／hook 加權／hook 原始字元）：Sweetie 214／17.5／28｜For Lovers（thin）162／18／23｜Just the Two 220／20／26｜A1 Disco（thin）166／19／21｜My Desire（thin）154／13.5／18｜Introspective（thin）168／16.5／25｜Just In Time 217／20／30｜On the Rocks 225／17／17｜Go Away Dream 224／22／29｜Worth 220／22／30｜Showcase 221／21／27｜A New Day 197／17／24｜Rock My Soul 210／14／16｜Timeless Roots 227／18／24｜More To Say Versions（thin）165／18／22｜Hollie in Dub 226／20／26｜Happy Hour in Dub（thin）164／14／14。初稿 15 張超標（最高 322），整格捨去：Creole 版改名《Gold》與廠方榜首說、A1 曲長、Just the Two 的 Bo-Pee Bowen 與 CSLP 號、Introspective 的〈Lovely Woman〉（會點名同批 Horace Andy）、Hinds 的外來曲目與編制細目、Go Away 的鼓手貝斯手名單與 dub 盤、Worth 的曲長、Showcase 的製作欄與〈Strictly Rub-A-Dub〉、A New Day 的〈Why Birds Follow Spring〉重錄（與 Worth 的「延長」骨架相近，一併讓出）與 Gladstone Anderson、Rock My Soul 的逐首對應、Timeless 的口風琴與〈Skylarking〉、More To Say 的 11 首數與 6 月 6 日、Hollie in Dub 的三首新曲。壓完回核 hook 依賴格：Introspective 把「封底另印一行」補進 g1、More To Say 把「限量 3D 包裝」補進 g1、Rock My Soul 把假聲前移到 g2、Sweetie 把 Volcano Vol-001 前移到 g1；其餘本就在 g1／g2。
- **19612** 骨架歸屬（17 張 17 條，只在擁有者 note 寫歸屬句）：Sweetie＝製作人自營廠牌的 001 號（＋Holt 生平）；For Lovers＝十二年前的暢銷曲回到新盤；Just the Two＝錄、配唱、混音同月同室（封套載明時地）；A1 Disco＝牙買加錄節奏、美國做 dub 混音（跨海加工）；My Desire＝同年兩張之一＋兩間錄音室分工；Introspective＝封底的 Channel One Style 與兩段式曲目；Just In Time＝地方場景（Ocho Rios，京斯敦以外的製作人）；On the Rocks＝兩組節奏班底同掛；Go Away Dream＝紀錄片攝影機進錄音室；Worth＝舊錄音後來拉成延長版；Showcase＝唱片店老闆變製作人；A New Day＝長笛進 Radics 節奏（樂器）；Rock My Soul＝人聲接 dub 的 showcase 系列；Timeless Roots＝父子同錄；More To Say＝主唱身後的整張 version 盤（3D 限量包裝當 hook）；Hollie in Dub＝藝名致敬 Tubby 的製作人拆首張；Happy Hour in Dub＝歌手自述動機（帶到外太空）。研究層推翻照辦：Showcase 不寫人聲接 dub（十首人聲曲、dub 只在後來 Deluxe 版，標時序）；A1 的 dub 混音寫美國 Blank Tapes／D. Spear；Just the Two 製作人寫 David White；Introspective 的 Part 1 & 2 不寫成 dub；Happy Hour 不寫混音者。hook 四型：懸疑（Introspective、Go Away、Happy Hour、Timeless）／斷言（Sweetie、My Desire、On the Rocks、Worth、Rock My Soul）／場景（Just the Two、A1、Just In Time、Showcase、A New Day）／人物定調（For Lovers、More To Say、Hollie in Dub）。
- **19613** 同藝人分軸與引入法（Holt 6、Delroy 2、Hollie 2、Horace 2）：Holt 生平只走 Sweetie（1947 京斯敦、Paragons 主唱、Junjo 時期最暢銷；避開池中《Police in Helicopter》的 lovers rock 先驅句與《Still In Chains》的〈The Tide Is High〉）；其餘五張的身分句各一種——For Lovers「Paragons 出身的歌手」身分領句、Just the Two 製作人 David White 領句、A1 樂手欄（Sly & Robbie）領句、My Desire 廠牌（Jackpot）領句＋hook 用「他」、Introspective 名字領句（自己掛製作）。Delroy：Go Away 帶童星／〈Dancing Mood〉（避池中《Better Must Come》的 13 歲與〈Emy Lou〉），Worth 以製作人 Gussie Clarke 來歷領句、再帶出歌手。Horace：Showcase 帶簽約年（1970 Studio One，避池中本名、Massive Attack、〈Skylarking〉榜首、顫抖假音諸句），Timeless 以兩人並列身分領句，生平不重複。Hollie：in Dub 以合作起點（2007 客座 Prince Fatty）領句、Happy Hour 以自我定位（tropical pop）領句，Sex Pistols 父親與 The Slits 兩句池中已用，兩張皆不帶。其他第二句：Hinds 資歷（Treasure Isle 七十支單曲）／Wailing Souls 四位成員（避池中 Renegades、Joe Higgs、Scientific Dub Mix）／Alton 居住地（1972 起定居英國，避池中〈Rock Steady〉命名句）／Cornell 年齡（11 歲由 Rico 帶進錄音室）／Frightnrs 樂種。17 種不重複。
- **19614** 日期與禁區：「日」後一字只兩處——Hollie in Dub「日由」、Happy Hour「日推」；Timeless（來源衝突）、More To Say（MB／Discogs 差一個月）只寫年；Dan Klein 卒日壓預算時改到月。媒體名與媒體榜單名次一律不進 note（DIY、Juno、PBS、GRAMMY.com 寫成「樂評說／評介說」；Creole 版的廠方榜首說整格捨去）。研究層存疑與推定格不進：所有速度、殘響、低頻厚度；Discogs 的 Lovers Rock／Dancehall 風格標籤；Wailing Souls 四人誰實際參與錄音；Worth 的樂手年代；For Lovers 的重錄與否；Blackbeard 身分。逝者：More To Say 標「語氣克制」、屬與作品綁定的時序（本作在主唱身後發行）。Timeless 的「兒子們」以廠牌說法＋Wobble 本名 Wardle 承接，不自行推斷誰是誰。
- **19615** 自查：hook 之間中文 4-gram 0；hook 對池中全部既有 hooks 4-gram 0、開頭前四字對 add-2026102* 0 撞（改掉「Volc」撞 ml9、「John」撞 ts3、「製作人 」撞 md7／ml13、「Root」撞 ml38、「布朗克斯」撞 ml9，及「的暢銷曲」「印了一行」「三個名字」「錄完這張」「唱片行老闆」「一支長笛」「首裡五首」「的製作人」「在牙買加」「兩張專輯」等殘片）；hook 與自卡 note 逐字重複 0；note×note 只剩指派語（「第二句以」「以製作人」）。`node qa-batch.mjs hooks add-20261023-ml45`：全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml45`：✓ 全部通過（5 組 17 張，hook 加權 13.5–22、note 162–235）。輔助腳本：scratchpad `hook-ml45/`（ml45-gen.py、ml45-ngram.py）。

## 寫作層（writer-1）（19621–19625）
- **19621** 交件：`desc-tools/batches/output/add-20261023-ml45-out-1.json` 9 張（full 5：Sweetie 229、Just the Two 211、Just In Time 239、On the Rocks 234、Go Away 223；thin 4：For Lovers 175、A1 179、My Desire 163、Introspective 172）。`qa-batch out` 本檔 0 處（僅報總張數 9 vs 17，因 writer-2 未交）；`qa-check-research` 0；`fix-spacing` 0；「據」0。初稿只 A1 超出 thin 上限（189），整格改寫發行句（拿掉「發行這張的是…時間在」的冗句）壓到 179。
- **19622** 第二句全照鉤子層 note 指派（Sweetie 生年出生地、For Lovers「Paragons 出身的歌手」、Just the Two 製作人 David White、A1 樂手欄、My Desire 廠牌 Jackpot、Introspective 名字＋自掛製作、Just In Time 資歷、On the Rocks 四位成員、Go Away 童星）；hook 代稱逐張具名（For Lovers 具名〈Stick By Me〉、My Desire「其中一張」、Introspective「那行字」、Go Away「他」＝Delroy Wilson）。年份前一字逐張不同（。年生／，年代／作年以／，年又／是年／。年由／張年的／至年間／在年出／於年推／。年月），本檔自掃 han() 4-gram 跨張 0（拆掉「京斯敦的」「最暢銷的」「英國推出」「製作欄掛」四條 2 張殘片；先交件，2 張當 3 張處理）；對 writer-2 全部 hook 原文 4-gram 0。
- **19623** 只寫 note：所有聲音細節（速度、殘響、低頻）一句不寫；Go Away 的「同年」不加「稍後」等推斷；A1 只寫 Bronx 不補「紐約」；Sweetie 補「牙買加」二字定位京斯敦（facts 有）；Just the Two 不寫京斯敦與 CSLP 號。身分句為讓外行看懂而用「歌手」（Just the Two、Just In Time、Go Away）與 note 指定的「rocksteady 歌手」（A1、My Desire）。

## 寫作層（writer-2）（19626–19630）
- **19626** 交件：`desc-tools/batches/output/add-20261023-ml45-out-2.json` 8 張（full 6：Worth 213、Showcase 214、A New Day 223、Rock My Soul 231、Timeless 237、Hollie in Dub 196；thin 2：More To Say 178、Happy Hour 160）。`qa-batch out`（兩檔合計 17 張）、`qa-check-research`（標記 0）、`fix-spacing`（0）皆過；「據」0 處。初稿 2 張出界（Timeless 267、More To Say 186），整格捨去：Timeless 的盤名重提與「兒子們陪他錄完」（與 hook 重複）、More To Say 的「親手」「已」等贅字。Worth 自查時刪掉「六年後同樣的手法套到整張唱片」一句（note 沒列的推論）。
- **19627** 第二句全照鉤子層指派：Worth 以 Gussie Clarke 出道（1972、U-Roy 單曲）領句帶出 Delroy Wilson；Showcase 以 1970 簽入 Studio One 領句；A New Day 以 1972 起定居英國領句；Rock My Soul 以 11 歲由 Rico Rodriguez 帶進 Coxsone Dodd 錄音間領句；Timeless 兩人身分並列；More To Say 以 rocksteady 樂種領句；Hollie in Dub 以 2007 客串 Prince Fatty 專輯領句；Happy Hour 以自稱 tropical pop 領句。日期「日」後一字照 19614：Hollie in Dub「日由」、Happy Hour「日推」；Timeless、More To Say 只寫年。
- **19628** 身分補字（可逆）：Worth 寫「雷鬼歌手」、Rock My Soul 寫「唱雷鬼的」，取自 facts／sound 的 Reggae 風格標籤，note 只寫「歌手」；為滿足「開頭兩句讓不懂的人知道是誰」。Timeless 的「兒子們」寫成陳述＋本名 Wardle 承接，不寫「廠牌說」，不推斷誰是誰之子以外的關係；評價寫「評介形容」、Hollie in Dub 寫「樂評形容」，媒體名一律不進正文。
- **19629** 只寫 note：聲音細節只留 note 明列的（Hollie in Dub 的回音、頻率、低音持續不斷、人聲節制；Timeless 的深沉貝斯），速度、殘響量一句不寫；Showcase 照研究層推翻寫「十首都是人聲曲、dub 版到後來 Deluxe Edition 才首度發行」，不提 1984；A New Day 不寫〈Why Birds Follow Spring〉與 Gladstone Anderson；More To Say 不寫 11 首與 6 月 6 日、限量張數，主唱身後一句語氣克制。
- **19630** 跨檔合掃（han() 剝非漢字後中文 4-gram，對 out-1 全 9 張）：初掃 3 張命中「交給英國／給英國的」，2 張命中「雷鬼歌手」「英國的發行」「兩人合作」「混音由負責」「在年發行」「的錄音室」「樂評形容」；整個名詞拿掉後重掃 0 條。輔助腳本：scratchpad `wr-ml45-2/`（ml45-2-descs.py、ml45-2-emit.py、ml45-2-gram.py）。

## 主線審稿（19631–19640；2026-10-23）
- 19631：逐張審 17 張（out-1 9、out-2 8），逐句對回研究稿 facts；qa-batch out、qa-check-research（兩檔）、fix-spacing 皆 0 標記；正文無媒體名、無榜單名次、無「據」字。
- 19632：**逐張審過，未改字**。核過：Holt 生年／Paragons／Junjo 時期最暢銷（Wikipedia）、〈Stick By Me〉1972 年牙買加最暢銷（Wikipedia）、A1 Disco Showcase 的 Bronx Taurus 與 Blank Tapes／D. Spear（Discogs）、Wailing Souls 四人掛名（Discogs）、Channel 4《Deep Roots Music》1982 年 5 月拍攝 King Tubby's（reggae.be）、Delroy「牙買加第一位童星」（Wikipedia）、Tad Dawkins 布朗克斯唱片行（同篇報導）、Alton Ellis 1972 定居英國與「Godfather of Rocksteady」（Wikipedia）、Cornell Campbell 11 歲由 Rico 帶進 Dodd 錄音室（Wikipedia）、Dan Klein 2016-06 漸凍症過世與 3D 限量版（Daptone／Discogs）、Prince Fatty 藝名致意 King Tubby（Wikipedia）。
- 19633：writer-2 19628 提問「雷鬼歌手」「唱雷鬼的」取自研究稿 Reggae 標籤、note 只寫「歌手」——事實無誤、身分句需要樂種，保留。
