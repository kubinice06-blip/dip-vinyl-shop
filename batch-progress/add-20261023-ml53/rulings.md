# add-20261023-ml53 裁定（情緒薄格策展線・恍惚：爵士人聲 torch song／深夜 ballad 二線＋alt R&B 霧暖二線＋日本 neo-soul＋vocal dub／downtempo）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml53、mc40（評分照 10-23 體感標準）；店主 10-23「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml53 列；可擴寫：downtempo／vocal dub、ml22 日本 neo-soul、ml8 alt R&B、ml27），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ 0.8、z ≥ 0.3。
> 策展：`curation-ml53.json`（兩輪 19＋9＝28）→ 主線汰 0、更正 1（`master-override-ml53.json`）→ `master-ml53.json`（MB 回查 28/28 釘住、人工 0；flag 1 見下）→ `pick.json`（28，無候補）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml53-cards.json`（28 張；研究 a–d 各 6、e 4）。身分：MB 釘住 28、§1 人工 0。
> **預留：研究 a 20761–20770、b 20771–20780、c 20781–20790、d 20791–20800、e 20801–20810、鉤子 20811–20820、寫作 20821–20830、主線 20831–20840。**
---

## 主線策展（不佔條號）
- 策展兩輪 28：torch-thick 5（Anita Baker、Kem、Lalah、Malia & Boris Blank、Meshell）、torch-downtempo 4（Vanessa Daou、Meshell、One Dove、UA）、alt R&B 霧暖 10、日本 neo-soul 2（mabanua、Kan Sano）、vocal dub／roots 6、downtempo 1（Moodswings）；moodGuess 全過邊距（x 1.9–2.6、y 0.8–1.2、z 0.4–1.4）。去重：seed 與所有 curation-*.json 0 撞。
- **主場景是死池（ml31 先例再確認）**：池中 Julie London、Billie Holiday、Sinatra、Chet Baker、McRae、Vaughan、Dusty、Etta 的 torch／with strings 盤全判輕；Larry Klein／Craig Street 型（Peyroux、Cassandra Wilson、Norah Jones、Gardot）也判輕。主場景只收得到 quiet storm 爵士靈魂（池中 Anita Baker、Kem、Lalah 同人全落恍惚 y 0.6–1.0）與 downtempo 製作的 torch 歌手。ml27 sample-based ambient pop 0 張。
- **同名拆卡**：R&B 歌手 Leon Thomas（2023《Electric Dusk》）與池中 1969 爵士歌手 Leon Thomas 不同人，照 Carl Perkins／Air (US jazz trio) 先例，後進池者掛名改「Leon Thomas (R&B)」，queryAlias 留「Leon Thomas」。
- **MB flag**：Groundation《Hebron Gate》MB 首發 2003-01-21、策展填 2002（iTunes），研究層核對年份。
- 池中同人錨點：Groundation《Dub Wars》y 1.4 z 0.5、Black Roots《Natural Reaction》y 0.7 z 0.6、Dot Allison《Afterglow》z 0.2（One Dove 色溫風險）、Meshell 同人 y 0.3–1.3 分散。

## 研究 e 組
- 20801 Little Roy《Battle for Seattle》：MB／Discogs master 378910 對得上，廠牌 Ark Recordings（ARK024CD）確認，解策展層「廠牌待確認」；原創翻唱專輯，非重發。**moodGuess 存疑**：BBC 稱 sprightly vintage rhythms、維基稱 Prince Fatty 刻意加快 tempo，可能比 x 2.4 活潑；僅〈Come as You Are〉有明確 dubby 文字。facts 10 條 full。
- 20802 Capital Letters《Headline News》：Discogs master 148734，原版 LP 10 首；iTunes 17 軌＝CD 加 12 吋曲／EP 的版本（1992 CD 13 軌、2007 CD 19 軌），上架以 1979 原版敘述。**moodGuess 存疑**：粗礪吉他與活躍打擊，無 dub 低頻證據，y 0.8 缺來源。facts 9 條 full。
- 20803 Black Roots《Black Roots》：master 547706，廠牌 Kick（KIC LP02）確認；非重發。**moodGuess 存疑**：Discogs 團介紹「militant pacifism」、色溫恐低於 z 0.7，無 dub 低頻直接證據。facts 8 條 full。
- 20804 Moodswings《Moodfood》：master 130717，原創首作。**moodGuess 存疑（策展層預警屬實）**：風格含 house／alternative dance，〈Spiritual High〉是舞曲單曲，x 可能 2.7–3.2，非「慢 ambient-dub」；主線宜汰換或實聽。facts 9 條 full。
- 本組推翻策展層：0 處年份／廠牌／盤名（廠牌兩處待確認項已解）；4 張皆有 moodGuess 存疑註記。

## 研究 a 組
- 20761 Anita Baker《Compositions》：MB 1990-06／維基 1990-07-03，Elektra（MB 美國版廠牌欄列 Atlantic，採維基）。**推翻策展層**：『唯一找爵士樂手現場合錄的盤』查無來源——人員表是錄音室班底（Nathan East、Lawson／Ferrone、Phillinganes、Klugh）加 programming，六間錄音室分頭錄；寫作層不得寫爵士現場合錄。葛萊美最佳女性 R&B 人聲演出為得獎、最佳專輯包裝為入圍。moodGuess 輕度存疑（Rhodes 無來源、programming 在場）。facts 10 條 full。
- 20762 Kem《Love Always Wins》：MB 釘住，Motown 2020-08-28。策展層『第五張』vs 維基 sixth，facts 不寫序數。AllMusic Kellman：『more scuffed and groove-oriented than any previous Kem album』，與『輕刷鼓慢板』有落差——**moodGuess 存疑（輕～中）**。樂評來源薄（AllMusic／Pitchfork 403），facts 8 條 thin。
- 20763 Lalah Hathaway《Honestly》：**推翻策展層廠牌**——策展填 Hidden Beach，維基與 MB 皆指自家 Hathaway Entertainment，製作 Tiffany Gouché＋Lalah 全包。**moodGuess 存疑（強）**：SoulTracks『trap and other radio urban pop sounds』、Vibe『electronic-bluesy』，與『合成墊厚、慢中板』不符，建議主線汰換或降優先。第 61 屆葛萊美兩項皆入圍。facts 8 條 thin。
- 20764 Malia & Boris Blank《Convergence》：MB 釘住，EmArcy／Universal。**聲音無法驗證**：找不到談本盤音色的樂評，只有『Malia 嗓音 breathy and sensual』與 Blank『取樣拼貼加真人樂手』工法；moodGuess（x 1.9、z 0.6、長殘響、無重拍）全無來源，建議實聽或降優先。facts 8 條 thin。
- 20765 Meshell Ndegeocello《Ventriloquism》：MB 釘住，Naïve 2018-03-16。第 12 張錄音室專輯、11 首 80–90 年代 R&B 翻唱，葛萊美最佳都會當代專輯為入圍。**moodGuess 存疑（中）**：〈Atomic Dog 2017〉〈Waterfalls〉〈Don't Disturb This Groove〉原曲皆中速律動，『霧狀合成墊』無證據（編制是貝斯＋鍵盤＋鼓＋吉他）；樂評 NPR／AllMusic 皆抓不到。facts 8 條 thin。
- 20766 Vanessa Daou《Zipless》：**推翻策展層廠牌**——1994 原版是自家 Lotus Records，Krasnow Entertainment／MCA 是 1995 重發（維基 Vanessa Daou 條；Discogs master 記 1995，MB 與維基皆 1994，採 1994）。**moodGuess 存疑（中）**：Slant 稱要『club-thumping beat』才聽得進耳語人聲，MB 使用者標籤 deep house，策展層預警屬實，x 可能 2.7+；z 0.8 與 Slant 的 detached 有張力。Slant 取自搜尋摘要。facts 10 條 full。
- 本組推翻策展層：2 處廠牌（Lalah、Daou）、1 處說法（Anita Baker 現場合錄）；moodGuess 存疑 5 張（Lalah 強、Malia 無法驗證、其餘輕～中）。

## 研究 b 組
- 20771 Meshell Ndegeocello《Comet, Come to Me》：MB 釘住，Naïve 2014-06-02，製作署名 Smoke and Mirrors。**moodGuess 存疑（強）**：策展層『dub 化慢拍、低頻厚、回音長』查無來源——樂評稱『lushly produced art pop』（The Stranger）、『uncluttered』（AllMusic），Discogs 標 Rock／Free Funk，樂手為 Doyle Bramhall II、Jonathan Wilson、Shara Worden＋大提琴；疑與池中《Comfort Woman》混淆。建議主線汰換；寫作層不得提 dub／reggae。facts 8 條 full。
- 20772 One Dove《Morning Dove White》：MB 釘住，1993-09-05。**推翻策展層廠牌**：FFRR 無來源，Discogs 歐洲版 Boy's Own Productions／London（828 352-2），MB Boy's Own Recordings。AllMusic Raggett 直引『dub's deep echo』與 Allison『Siouxsie 的冷調到 Dolly Parton 的豐潤』，Mixmag『bittersweet comedown』；**moodGuess 存疑（輕～中）**：Discogs 風格含 House、Breaks，多首 7–10 分鐘中速可能 x 2.7+，色溫冷暖並存。facts 10 條 full。
- 20773 Jessie Ware《Tough Love》：MB 釘住，英國發行日 2014-10-13（維基）。聲音來源只支持『minimalistic』『sophisticated pop／R&B』『偏 MOR 抒情』，『厚合成墊與殘響』無直引；〈Say You Love Me〉等是中速單曲。**moodGuess 存疑（輕～中）**。Pitchfork 抓取被禁，樂評為維基轉引。facts 10 條 full。
- 20774 YEBBA《Dawn》：MB 釘住，RCA 2021-09-10，Electric Lady Studios 錄。**推翻策展層**：『弦樂與福音唱腔』所有來源皆未提，來源只支持 Voodoo 班底（Questlove、Palladino、Poyser）、電鋼琴、復古合成器、70 年代融合爵士；Kaytranada／Hudson Mohawke 掛名製作，〈Love Came Down〉有 strong kick drums，〈Louie Bag〉〈Far Away〉為嘻哈客串——**moodGuess 存疑（輕～中）**。最佳非古典錄音工程為入圍。facts 10 條 full。
- 20775 Ego Ella May《Honey for Wounds》：MB 釘住，**補策展層空白廠牌**：UpperRoom Records（John Boyega 創立，該廠首張專輯）。LoBF 8/10：『loose, open and hopeful』『warmer mood』；Jazzwise『warm, crystalline… velvety basslines』（搜尋摘要，二手）。**moodGuess 存疑（輕～中）**：y 0.9 與『airy』『loose』有落差，『霧狀低頻』無直引；z 暖有雙重支持。facts 10 條 full。
- 20776 The Internet《Feel Good》：MB 釘住（2013-09-20／iTunes 09-24，不衝突），Odd Future。**moodGuess 存疑（中）**：LoBF『robust and infectious groove』『slick bassline』（Neptunes 風〈Dontcha〉），〈Sunset〉calypso 風，非『慢鬆拍』；『Rhodes 墊厚』無來源。『sounds like a live record』『sun-splashed』支持暖。facts 9 條 full。
- 本組推翻策展層：1 處廠牌（One Dove）、補 1 處空白廠牌（Ego Ella May）、1 處編制說法（YEBBA 弦樂）；moodGuess 存疑 6 張（Comet 強，其餘輕～中）。
