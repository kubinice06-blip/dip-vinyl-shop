# add-20261023-ml38 裁定（情緒薄格策展線・恍惚：70s roots dub 二線＋ml37 UK dub／digital dub 90s）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 7 輪，本工作階段負責 ml38、md22；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml38 列，可擴寫 ml37），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml38.json`（36 張）→ `master-ml38.json`（MB 回查 35 釘住、人工 1）→ 主線汰 3 → `pick.json`（33）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml38-cards.json`（33 張；研究 a–d 各 7、e 5）。身分：MB 釘住 32、§1 人工 1（Bunny Wailer《Dubd’sco Vol. 1》）。
> **預留：研究 a 19001–19010、b 19011–19020、c 19021–19030、d 19031–19040、e 19041–19050、鉤子 19051–19060、寫作 19061–19070、主線 19071–19080。**
---

## 主線策展（不佔條號）
- 策展 36 張（旋律型 dub 9、二線製作人的濕混音人聲盤 16、Wackie's 5、Ariwa lovers 6）。挖不到 54，照實交、不湊數。
- **主場景見底的原因**：池中器樂重低音 dub 幾乎全判冷落頹靡——Scientist 全部（z −0.1～−0.5）、Yabby You、Keith Hudson 早期、Prince Far I、Upsetters 器樂、Joe Gibbs African Dub、Wackies Rhythm Force、Creation Rebel；擴寫場景的 steppers（Zion Train、Iration、Jah Shaka、Dub Syndicate、Alpha & Omega、Bush Chemists）也全判冷。能收的是旋律撐起來的 dub（Mudie 弦樂、Rico 長號、Pablo 口風琴）與二線製作人的類比濕混音人聲盤（ml9／ml32 先例 100% 落格）。
- **主線汰 3**：Horace Andy《In the Light Dub》（池中人聲原版《In the Light》z 0.4 貼邊，dub 版只會更冷）；Mad Professor《Dub You Crazy With Love (Part 2)》《Bitter Sweet Dub (Part 3)》——並行的 ml41（擴寫「ml37 剩餘」）卡單已提同兩張，為避免上線時 card_catalog／KV 互蓋，讓給對方。
- 跨分支去重：對 origin `claude/mood-cells-ml41-ml35`、`claude/mood-cells-ml40-mc22` 的 curation 檔逐張比對盤名與 rgMbid，除上述 2 張外 0 撞。
- 研究層重點查：Augustus Pablo《Authentic Golden Melodies》是否 1990 年代數位製作（ml9 曾以質地汰 1990 Pablo）；Horace Andy 兩張 90s Ariwa 是否偏數位；兩張 2023 Ariwa《Dub Showcase》是否舊錄音集結（是就汰）；Linval Thompson《Stay a Little Bit Longer》是否《Follow My Heart》改名重發；Gregory Isaacs《Slum (In Dub)》、Roland Alphonso《Roll On》、Barry Brown Jammy Showcase 的色溫；Meditations《I Love Jah》的混音濕度（池中同團 y 0.4–0.5）。

## 研究 e 組
- **19041**　Cadogan《Dub Showcase》：查無任何來源說明錄音年份或是否舊錄音集結；僅證實〈You Turn Me On〉2008 年已有 Ariwa 單曲（B 面〈Dub On〉），〈Nice & Easy〉〈Fever〉為 1970s Perry 時期歌曲（2020 年《Storybook Revisited》另收同名曲），Discogs 樂手全是 Ariwa 班底。結論：非 70s Perry 重發，是 Ariwa 2000s 起的素材，具體年份未證實；不以『舊錄音集結』汰，標 moodGuess 存疑（類比濕混音、色溫皆無來源）；與姊妹盤 Sandra Cross 建議同進退。
- **19042**　Horace Andy《Roots and Branches》：Discogs 三個版本全是 CD（ARICD125，1997），無黑膠；Mad Professor 製作混音，鼓部同時掛 Fluxy、Sinclair McDonald 與『The Robotiks』，為真人加程式的混合，非全數位也非全類比。moodGuess 存疑（90s Ariwa 乾淨度、y 1.2 無聲音來源），建議主線保守看待。
- **19043**　Bunny Wailer《Dubd’sco Vol. 1》人工身分核對通過：Discogs master 1126789／release 681551（Solomonic 2537、JM、LP、7 曲，1978）；另有 1977 Cash & Carry 與 1979 Solomonic 版本，主條目維持 1978。素材改自《Blackheart Man》（1975 Aquarius 錄音）與兩支 12 吋單曲，非 1978 新錄。不可與 1998／1999 合輯混用。
- **19044**　Michael Prophet《Serious Reasoning》：身分對（Island ILPS 9606，1980）。策展層 curatorWhy 的『Channel One 錄音、King Tubby's 混音』Discogs 無任何錄音室／混音者署名，未能證實，寫作勿用；『Consciousness 為同盤換一曲』也未證實，不寫兩者關係。色溫可能偏哀，z 0.6 建議主線保守看待。
- **19045**　Wayne Jarrett《Chip In》：身分與班底（Junjo Lawes 製作、Scientist 混音、Roots Radics，Greensleeves GREL 28，1982）核對通過，無推翻；殘響與色溫為班底推論，未見專輯樂評逐曲驗證。

## 研究 a 組

- **19001**　Harry Mudie《In Dub Conference》三集：Discogs master 年份 1976／1977／1978（MB 同；Vol.2 MB 只有 2004 CD）。Wikipedia 兩個條目另寫 1975／1976／1977 與 1975／1977／1978，不一致，採 Discogs。Vol.1 混音由單一樂評主張是 Tubby 本人在其錄音室混，Vol.3 原版黑膠明載 King Tubby Mixed By；Vol.2 同樣掛名但無獨立聲音來源。聲音：Vol.1 樂評指節奏偏輕、爵士放克味、Tubby 手法克制溫和、有弦樂（Dub With A Difference、String Dub In Rema），僅個別曲有厚低音。**moodGuess 存疑（三集）**：y 1.3 偏高，建議 0.8–1.0（Vol.1 有來源；Vol.2／3 為系列推論）。Vol.2、Vol.3 找不到專談該集聲音的獨立樂評，status thin。Vol.3 卡單所稱『口琴』（harmonica）無任何來源，寫作勿用。Discogs CD 積分橫跨系列（The Englismen 弦樂、Anthony King 編曲等）不能逐集對號，facts 寫成『列出的參與樂手』。
- **19002**　Augustus Pablo《Authentic Golden Melodies》（回答 curatorRisk）：Discogs 註記錄音橫跨 1974–79（4 Track、Harry J、Randy's、Studio 17、Dynamic Sounds、Creative Sounds），格式標 Compilation（Rockers International CD RP 002，JM，1992）；故『1990 年代偏數位』疑慮不成立，是 1970s 類比錄音的廠牌自編選輯。MB 另有 1980 JM 版（無目錄號），原黑膠年份無可靠來源；卡單 year 1992 為 CD 年，主線可裁改 1980（MB first-release-date）或保留 1992 並於簡介寫『錄於 1974–79』。性質為選輯，但屬 Pablo 自家 Rockers 官方編選，有定位，不建議移除。聲音面沒有獨立樂評，moodGuess 存疑（僅類比錄音與 Pablo 風格推斷）。
- **19003**　Rico Rodriguez《Wareika Dub》：身分核對通過（Ghetto Rockers PRE LP 1, UK, 1977，與 Island 原專輯《Man from Wareika》九曲一一對應）；Discogs 註記為宣傳用預先發行版（plain stamped card sleeve）。與池中原版是不同張，不重複。原專輯：Karl Pitterson 製作，1976 年 5 月 Hammersmith＋9 月京斯敦 Joe Gibbs／Randy's 錄音，Basing Street 混音（來自 Wikipedia）；dub 版由誰混無來源，不寫。Wikipedia 該條『唯一在 Blue Note 發行的 roots reggae』與 Island 矛盾，疑為錯，未採。聲音無獨立樂評，moodGuess 存疑（y 1.3 可能偏高）。
- **19004**　Gregory Isaacs《Slum (In dub)》（回答 curatorRisk『混音是否偏冷硬』）：發行商文案（非獨立樂評）稱 Revolutionaries 伴奏『精簡』、〈Slum〉厚重、〈Reform Institution〉較亮、曲子前後流動；無混音者署名，無法就冷硬與否下結論。〈Public Eyes〉出自《Cool Ruler》的〈John Public〉；〈Leggo Beast〉沿用 Studio One 節奏。第七首曲名含冒犯字眼，facts 不引，寫作層請避開。moodGuess 存疑（z 0.4 邊距窄，無色溫來源），列為可汰換候選。
- **19005**　Linval Thompson《Negrea Love Dub》：身分核對通過（Trojan TRLS 153, UK, 1978）。**推翻策展層**：不是『交給 Tubby 混』，Kudos 文案稱節奏由 Revolutionaries 於 Channel One 錄成、在 King Tubby 的錄音室由 Prince Jammy 混；且它是同年人聲專輯《I Love Marijuana》（TRLS 151）的 dub 對應版，曲名（Natty Dread、Jah Jah Children、Roots、Africa Love）偏 roots，不是『情歌 love dub』。Roots-archives 稱無伴奏團登錄，與 Discogs 積分、Kudos 文案不全一致，facts 採後兩者。**moodGuess 存疑**：『情歌旋律殘片、甜』前提不成立，z 0.5 無來源；Channel One rockers 節奏偏硬，建議主線保守，必要時汰換。

## 研究 d 組
- 19031：Meditations《I Love Jah》年份存疑。Discogs 有 1982 US L&L 510 黑膠（一版 White Label、一版註 Original 1982 release），但維基與 Forced Exposure 皆稱 2002 Wackies CD 為首度發行、錄於 1982。facts 只寫『錄於 1982』與兩說並陳；請主線裁定卡片 year 是否改 2002（可逆，改卡單值）。
- 19032：Annette Brissett《Love Power》年份採 1983（Discogs master、MB、Honest Jon's），不採維基的 1986。聲音是 Fabian Cooke 一人用鼓、合成器、合成貝斯的 boogie／迪斯可雷鬼 lovers rock，與策展『厚霧低頻』不符，列 moodGuess 存疑（建議降 y 或汰）。
- 19033：Roland Alphonso《Roll On》1984 無任何聲音文字來源，Discogs 名單無 synthesizer／drum machine 標註；moodGuess 存疑（未證實，非已推翻）。
- 19034：Horace Andy《Life Is for Living》（策展疑點：90s Ariwa 偏數位）查無樂評，類比／數位無從判定，y 1.1 無證據；moodGuess 存疑，建議對照池中其他 Ariwa Horace 盤。
- 19035：Mad Professor & Sandra Cross《Dub Showcase》（策展疑點：是否舊錄音集結）未見舊錄音證據，樂手為當代班底，判為 2023 新製作、保留；但是 2023 現代 crisp 錄混，非類比濕混音，moodGuess 存疑。日期兩說（Bandcamp 8/9、MB 10/12），寫作層只寫 2023。
- 19036：John Clarke 是 Wackie's 旗下歌手、非 Johnny Clarke（Hardwax 明說）；1979 類比時代，無推翻。Tyrone Evans 無配器文字，三軸全靠廠牌通論，thin。
- 19037：Meditations 混音濕度（池中同團 y 0.4–0.5）：只有行銷文案『Black Ark 氣氛、更柔』支持比池中其他盤更濕，無殘響量／速度來源，方向可信、數字未證實。
- 19038：研究層搜尋次數已超每支 3 次（共 4 次 WebSearch），其餘用 WebFetch 與 Discogs／MB API。
