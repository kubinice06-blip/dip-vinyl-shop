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

## 研究 c 組
- 20781 Syd《Broken Hearts Club》：MB 釘住，Columbia 2022-04-08。Pitchfork：『pillowy、'80s-nodding』『sunny acoustic guitar and velvety beats』『quiet storm（CYBAH）』；Rolling Stone『lush production』。**moodGuess 存疑（中）**：『厚合成墊』不是來源描述的主角（主角是原聲吉他＋柔鼓），〈Tie the Knot〉等跳躍，y 可能 0.5–0.7；z 暖成立。
- 20782 Alex Isley & Jack Dine《Marigold》：MB 釘住，獨立發行 2022-03-30（維基 self-released，卡單 label 空維持）。聲音只有 Oswegonian：Dine 製作、『hollow』、人聲重殘響、後段愈沉；Uproxx『warm』、全盤約半小時。**moodGuess 存疑（輕）**：『Rhodes』『糊濾波』無來源；〈Square Zero〉upbeat；Bandcamp／MB 頁被擋。
- 20783 Leon Thomas (R&B)《Electric Dusk》：MB 釘住，EZMNY／Motown 2023-08-18（iTunes 版權確認）。同名拆卡確認：1993 年布魯克林出生、童星／Victorious／The Rascals 那位。Backward Noise 專訪：幾乎一人寫作混音、自述『psych-rock elements mixed in with R&B』；曲數專訪 11、iTunes 12，facts 標版本。**moodGuess 存疑（中）**：『厚低頻』無來源，〈X-Rated〉有硬饒舌、〈Crash & Burn〉groove，曲間不均。
- 20784 Liniker《Indigo Borboleta Anil》：MB 釘住，2021-09-09（MB 無廠牌，卡單空維持）。pt 維基：製作 Liniker＋Júlio Feijuca＋Gustavo Ruiz，兩支管弦團（Jazz Sinfônica、Orkestra Rumpilezz），Milton Nascimento 客座〈Lalange〉；2022 拉丁葛萊美最佳 MPB 專輯得獎。**聲音無樂評可驗證**（速度、厚度、色溫皆無字眼，TMDQA 訪談 404）。status partial。**moodGuess 存疑**：『慢、quiet storm』無來源，管弦團是大編制，不等於厚重；專輯含 reggae／samba 元素。
- 20785 Luedji Luna《Bom mesmo é estar debaixo d'água》：MB 釘住，2020-10-14。**策展層廠牌 YB Music 無任何來源可證**（維基、MB 皆空），勿寫廠牌。製作人 Kato Change＋Luedji（維基）；『less percussive, more jazzy』出自論文摘要，頁面 500 未開，不入 facts。status thin。**moodGuess 存疑（強度待聽）**：『低頻厚、溫』無來源，y 風險 0.5–0.7 成立。
- 20786 UA《AMETORA》：MB 釘住，Speedstar（VICL-60190）1998-04-22；第二張錄音室專輯；Oricon 專輯榜最高第 2 名、約 43 萬 4930 張（英維 discography 引 Oricon）。dub 證據只有間接：〈あめふりヒヤデス〉alternate mix 出自 little tempo、Brixton 混音、單曲有 Dub 版；〈悲しみジョニー〉是朝本浩文製作、真樂隊＋Wurlitzer 的編制。**moodGuess 存疑（中強）**：整張 dub 化／厚低頻未證實，〈ミルクティー〉〈青空〉走流行路線；MB 風格標籤 downtempo／acid jazz／broken beat 為社群標籤。status partial。
- 本組推翻策展層：1 處廠牌無來源（Luedji YB Music）；moodGuess 存疑 6 張（Syd 中、Marigold 輕、Leon 中、Liniker 無法驗證、Luedji 無法驗證、UA 中強）。

## 研究 d 組
- 20791 Jamie Woon《Making Time》：MB 釘住。**推翻策展層廠牌**——策展填 PMR；英維專輯條目與 iTunes 版權皆為 Polydor（Jamie Woon 條目寫 signed to PMR，屬藝人層描述）；發行日 MB／iTunes 2015-10-30、維基專輯條目 6 November 2015，年份 2015 無誤。人員表（維基引 Tidal）：Dan See 全盤鼓、Dan Gulino 貝斯、銅管；Pitchfork 7.4『simple guitars, slinky bass lines』，Guardian 4 星『took the soul road』，2016 Mercury Prize 入圍。**moodGuess 存疑（輕～中）**：『混響』無來源，傳統簡編制偏乾淨，y 風險 0.5–0.7。
- 20792 mabanua《Blurred》：MB 釘住，origami PRODUCTIONS 2018-08-29；11 首，客座只有 Achico、Chara。證據全是廠方文案（OTOTOY：『太くタイトなビート』『淡く浮遊感』『ドリーミー』『切なさ』，一人演奏混音）；原版頁未取得、無獨立樂評，status partial。moodGuess 與文案吻合；z 偏邊（切なさ）。
- 20793 Kan Sano《Ghost Notes》：MB 釘住，origami 2019-05-22；Real Sound 訪談（本人談）。**推翻 curatorRisk 的『y 只 0.5–0.7』預警方向**：低頻很重（事後加 TR-808 大鼓、小鼓疊薄 synth、訪問者說『胃がせり上がる』），但音數少、避開合成器墊，用 Rhodes＋真鼓。寫作層不要寫成 Dilla 拖拍（Sano 說他偏好 Questlove 真鼓勝過 Dilla 做的曲子）。
- 20794 Groundation《Hebron Gate》：MB 釘住（首發 2003-01-21）。**年份裁定維持 2002**：Inside World Music（Young Tree YTR-1219 CD, 2002）、iTunes ℗ 2002、vinyl.com 2002 三源一致，樂團條目 discography 列表寫 2003、文內寫 2002；寫作層只寫『2002 年』不寫月日。樂評（Tom Orr）：『hypnotic』『rhythmically adventurous』、爵士影響、曲子從容；零售商稱 one-drop 底。**moodGuess 存疑（輕～中）**：『回音』無來源，y 風險同 curatorRisk。
- 20795 Groundation《Upon the Bridge》：MB 釘住，2006-10-16／17。**無專輯級樂評或專輯條目**（英維 Upon_the_Bridge 重導向樂團條目），聲音事實全屬樂團整體描述（類比、無合成器、爵士銅管、女聲和聲）。status thin。**moodGuess 存疑（中強）**：『dub 化、厚低頻、回音』本盤全無來源；池中《Dub Wars》的 dub 聽感不能類推。facts 不寫『第四張』序數。
- 20796 Midnite《Ras Mek Peace》：MB 釘住，1999-10-12（維基寫 1999 年 11 月）。**moodGuess 存疑（重大，建議汰換或降級）**：完整盤名 (Before Reverb and Without Delay)，維基載明現場一個房間直接錄雙軌類比帶，無混音台、無殘響、無壓縮、無 EQ、無疊錄（Mapleshade，Pierre Sprey）——與策展層『回音長』『低頻厚重』直接牴觸；每首 6–7.5 分鐘，極慢，x 靜成立，y 重與 z 暖皆無來源。原版廠牌未取得（iTunes 為 2026 Roots Archives 再版），卡單空維持。
- 本組推翻策展層：1 處廠牌（Woon PMR→Polydor）、年份 Hebron Gate 維持 2002（MB 2003 為差異）；moodGuess 存疑 6 張中 5 張（Jamie 輕～中、Hebron 輕～中、Upon 中強、Midnite 重大、Blurred 無異議但全屬廠方文案）；Kan Sano 的低頻預警被推翻（偏重）。

## 主線：研究後汰換（不佔條號）
- 研究五組 28 張，汰 11（卡單、研究稿、`pick.json` 同步移除；不重切組，a 4、b 5、c 4、d 3、e 1）：
  - 製作與預估直接牴觸：Midnite《Ras Mek Peace》（單房雙軌類比直錄、無殘響無混音，盤名全稱即「Before Reverb and Without Delay」→ 判輕）、Meshell《Comet, Come to Me》（dub 化無來源，樂評談 art pop、搖滾／靈魂吉他）、Lalah《Honestly》（trap 與電台都會流行製作）。
  - 舞曲／中快推進（判躁）：Moodswings《Moodfood》（house／alternative dance、進榜舞曲單曲）、Vanessa Daou《Zipless》（樂評稱要搭 club 重拍、MB 標 deep house）、Little Roy《Battle for Seattle》（樂評 sprightly、製作人刻意加快 tempo，ml45 bright／breezy 先例）、Capital Letters《Headline News》（粗礪吉他＋活躍打擊、無 dub 低頻證據）。
  - 原聲／簡編制（判輕，ml2 原聲吉他反例）：Syd《Broken Hearts Club》（原聲吉他＋柔鼓）、Jamie Woon《Making Time》（簡編制真樂隊、混響無來源）。
  - 聲音零來源且型別有風險：Groundation《Upon the Bridge》（無專輯級樂評，同人留《Hebron Gate》）、UA《AMETORA》（整張 dub 化未證實，〈ミルクティー〉走流行，J-pop 判輕風險）。
- 留下但存疑、交評分裁定：Malia & Boris Blank《Convergence》、Liniker、Luedji Luna（聲音無樂評）、Meshell《Ventriloquism》（翻唱中速律動）、The Internet《Feel Good》（數曲中速）、Leon Thomas (R&B)、Alex Isley & Jack Dine、Groundation《Hebron Gate》。
- 研究推翻照改卡單：One Dove 廠牌 FFRR→Boy's Own（London 發行）；Ego Ella May 廠牌補 UpperRoom Records；Luedji Luna 廠牌 YB Music 無來源→留空；Groundation《Hebron Gate》年份維持 2002（Young Tree YTR-1219 CD、iTunes 版權）、寫作層不寫月日。Anita Baker「找爵士樂手現場合錄」、YEBBA「弦樂與福音唱腔」查無來源，正文不寫。
- **定案 17 張**，無候補、不湊數。

## 鉤子層（d、e）
- **20816** 交件：`desc-tools/batches/hooks/add-20261023-ml53-hooks-d.json`（3）、`-hooks-e.json`（1），張數照汰換後研究稿（d 3、e 1）。預算公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（hook 原始字元／加權／note／預算）：mabanua《Blurred》21／21／228／222；Kan Sano《Ghost Notes》24／21.5／230／227；Groundation《Hebron Gate》30／23.5／224／228；Black Roots《Black Roots》30／24／210／214。皆非 thin，上限 230。初稿四張全超（252–370），整格捨去：mabanua 2008 個人計畫起點、其餘自唱；Kan Sano 前作年份、合成器樂句改吉他小號、808 與 70／90 年代之別、Questlove／Dilla 偏好；Groundation Jim Fox 與 RAS（《Dub Wars》已用）、類比不碰合成器、曲長；Black Roots militant pacifism、Denny Vidal 製作、A／B 面、BBC 主題曲與 Peel session（時序不明）。壓完回核：四張 hook 依賴格皆在 g1／g2（Groundation 客座格併入 g2）。
- **20817** 骨架歸屬（各張 note 只寫自己的歸屬句）：mabanua＝鼓手一人包辦全部樂器與混音；Kan Sano＝前作反動（全程式編寫→生樂器，再疊 808）；Groundation＝學院派與街頭的交會（爵士系同學玩 roots reggae、請牙買加老團歌手客座）；Black Roots＝地方場景（布里斯托 St. Paul's）＋大學巡演起家。hook 四型：斷言（mabanua）／場景兼懸疑（Kan Sano，收尾＝貝斯讓胃往上頂、留餘音）／人物定調（Groundation）／場景（Black Roots）。開頭前四字與 a 組四張互異。
- **20818** 「他／她」引入法與第二句句型（本組無同人跨張，Meshell 只剩一張）：mabanua＝生年與出生地（「1984 年生於埼玉縣的 mabanua 是 Ovall 的鼓手」，「是」句）；Kan Sano＝作品欄／前作（「在《k is s》之後⋯」句）；Groundation＝創團人（「由」句，note 只留 g1 本身，未另寫指派句）；Black Roots＝團名直接領句。四張 hook 皆帶身分或樂種（日本鼓手／808 大鼓＋g1 日本音樂人 neo-soul／雷鬼團／布里斯托），Kan Sano hook 只有「他」，第二句由 g1 補名字與樂種。
- **20819** 日期「日」後一字：mabanua 日恰（發行日與 1984-08-29 生日同日，兩源相加）、Kan Sano 日問（原配「日交」撞 a 組 Meshell，改）；Groundation 只寫 2002 年（照主線，不寫月日）、Black Roots 只寫到 1983 年 10 月。媒體名不進 note：Real Sound 寫「訪問者說」、OTOTOY 寫「發行方文案」、Inside World Music／Discogs 皆不具名；無「據說／據傳」。日本人名照原文（Chara、Achico 原即拉丁字）；mabanua 本名未指派。
- **20820** 自查與腳本：hook↔hook 中文 4-gram（含 a 組四張）0 條；本組 hook↔全批 note、本組 note↔全批 hook 0 條；hook 與 note 無逐字重複句。`qa-batch hooks`：僅報 b、c 缺檔（另一位未交）；`chk-hook-crossgroup`（a、d、e 三組 8 張）全部通過，hook 加權 19–24、note 161–230。b、c 交件後需重跑一次 cross-group。
