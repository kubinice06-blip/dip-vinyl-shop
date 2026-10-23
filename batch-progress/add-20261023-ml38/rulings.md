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

## 研究 b 組
- 19011　Yabby You & Michael Prophet《Vocal & Dub》：身分吻合（1979、Vivian Jackson 廠牌）。Discogs 與 United Reggae 的 10 首曲名全以 Dub 結尾，分不出人聲曲；混音者兩源互斥（Jammy 未掛名 vs King Tubby）。moodGuess 存疑（可能整張偏器樂 dub，Yabby You dub 在池中判冷）；status thin，facts 只寫「資料庫記載」，建議主線聽過再留。
- 19012　Michael Prophet《Gunman》：1981 原版 LP 名《Michael Prophet》（Discogs master 309904），MB 2009 是 Greensleeves CD 重發（加 5 首 12 吋混音）；Junjo Lawes 製作、Roots Radics、Scientist 混音（名單取自 2009 CD 條目，寫作層只寫三項）。聲音支持 ml，未推翻；年份寫 1981。
- 19013　Wayne Wade《Black Is Our Colour》：MB 1977 vs Discogs master／Wikipedia／Roots Archives 1976（原版 Prophets 廠牌，1977 為 Vivian Jackson 廠牌重壓）。建議年份 1976。推翻策展層：Tubby 混音、Gladiators／Aggrovators 全無來源；僅知標題曲節奏為 Lee Perry 在 Black Ark 錄。moodGuess 存疑（無聲音來源），thin。
- 19014　Hugh Mundell《Jah Fire》：實為與 Lacksley Castell 的合輯 LP（Castell 約唱一半），Prince Jammy 製作，Sly & Robbie 等伴奏；1980 類比，未推翻 moodGuess。「Mundell 第三張」無來源不寫；「Jammy 濕混音」無來源。
- 19015　Linval Thompson《Don't Cut Off Your Dreadlocks》：Bunny Lee 製作、King Tubby 混音（Discogs），Channel One 錄音與「deep and heavy」僅零售文案。flying cymbal 疑慮查無證據，未證實也未排除；thin。
- 19016　Linval Thompson《Rocking Vibration》：補上 Burning Sounds BS 1027（UK 1978）、Sly & Robbie、Chinna Smith、Tubby 混音（Discogs）。moodGuess 存疑：Sly & Robbie 的 rockers 拍子可能比預估快（無來源，僅風險提示）；thin。
- 19017　Linval Thompson《Stay a Little Bit Longer》：確認是《Follow My Heart》（Burning Rockers BR 1006 LP，UK 1979，Discogs master 505914）的加拿大 Micron 1980 改名版，曲目相同、兩面對調。策展層「Channel One／Tubby／Scientist 世代」全無來源，作廢；moodGuess 存疑；建議主線裁定卡名與年份（原盤 Follow My Heart 1979 vs MB 1980）。
- 19018　b 組只有 7 張（派工寫 9 張以卡單為準）；facts 一律不寫 Prophet 2017、Yabby You 2010、Wade 後來移居荷蘭等晚近生平。

## 研究 c 組
- 19021：Don Carlos《Spread Out》（1983 Burning Sounds）實為 1982 Jackpot《Pass Me the Lazer Beam》的英版再發；池中無原版，不重複，卡片年份 1983 維持。製作是 Bunny Lee／Aggrovators 班底，非 Roots Radics，moodGuess 的「Radics 慢拍」存疑。
- 19022：Don Carlos & Gold《Raving Tonight》（RAS 1983）是精選自 Negus Roots《Suffering》《Harvest Time》加兩首新錄音的美國選輯，無歷史定位，與池中《Suffering》、ml32 的《Harvest Time》重複，依常設裁定列「建議移除」。
- 19023：Lacksley Castell《Princess Lady》班底是 Ranchie McLean／Dougie Bryan／Robbie Lyn（合成器弦樂）＋Dean Fraser 管樂，Mad Professor 倫敦 Ariwa 混音，非 Roots Radics；moodGuess 的「Radics 慢拍」存疑。
- 19024：Barry Brown《Far East》年份 Discogs master 1981／MB 1982；Discogs 封底載 Channel One 錄混（Revolutionaries 班底＋管樂＋合成器），與 Wikipedia「1983 Studio One」說法並存，以 Discogs 為準；moodGuess x 2.6 偏高存疑。
- 19025：The Viceroys《We Must Unite》與 Barry Brown 兩張 Showcase 皆無樂評談聲音，facts 靠 Discogs 製作名單；Jammy Showcase 的 Jammy 混音以「clear sound」著稱，y 1.2 可能偏高，標存疑。
- 19026：本組 WebSearch 共 5 次（超過每支 3 次），其餘用 WebFetch 與 Discogs／MB API。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 7 張**（研究層聲音反證或身分不符；恍惚線最怕冷、乾、推進，存疑的器樂 dub 一律汰）：
  - 精選／彙整：Augustus Pablo《Authentic Golden Melodies》（Rockers 自編選輯，Discogs 標 Compilation）、Don Carlos & Gold《Raving Tonight》（RAS 美國精選，選自《Suffering》《Harvest Time》）。
  - 身分：Linval Thompson《Stay a Little Bit Longer》（《Follow My Heart》1979 的加拿大改名重發）。
  - 冷硬器樂 dub：Linval Thompson《Negrea Love Dub》（Channel One Revolutionaries 硬 rockers 節奏、roots 曲名，不是情歌 dub）、Gregory Isaacs《Slum (In dub)》（z 0.4 邊距窄、無混音者與色溫來源）、Yabby You & Michael Prophet《Vocal & Dub》（10 首全是 dub、池中 Yabby You 器樂 dub 全判冷）。
  - 合成器 boogie：Annette Brissett《Love Power》（Fabian Cooke 包辦鼓、合成器、合成貝斯，「synthy 80s boogie」）。
- **更正**：Wayne Wade《Black Is Our Colour》年份 1977→1976（Discogs master、Wikipedia、Roots Archives 一致；MB 1977 為重壓）。
- **留下的存疑張**：Mudie 三集（y 可能 0.8–1.0，仍在重格內）；Meditations《I Love Jah》（維基稱 2002 CD 才首發，Discogs 有 1982 L&L 510 黑膠，維持 1982）；兩張 2023 Ariwa《Dub Showcase》（查無舊錄音集結證據，Bandcamp 列為新發行；Mad Professor love dub 池中全落恍惚）；Roland Alphonso《Roll On》、Horace Andy 兩張 Ariwa（無反證）；Spread Out（Bunny Lee／Aggrovators）、Princess Lady（Ariwa 合成器弦樂）、Far East（Revolutionaries）伴奏與策展層不同，聲音無反證，評分看實測。
- 不補位：策展層已回報主場景見底。
- 定案 **26 張**（a 4、b 5、c 6、d 6、e 5）。汰除卡存 `dropped-cards.json`，研究稿條目移出研究檔。研究 qa-batch 全過。

## 鉤子層（a、b、c）（19051–19055）
- **19051** 交件：`desc-tools/batches/hooks/add-20261023-ml38-hooks-a.json`（4）、`-b.json`（5）、`-c.json`（6），key 逐字、順序同研究稿（已移出汰除卡，15 張）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；研究稿 thin 的 7 張上限 170、其餘 230。逐筆（預算／hook 加權／hook 原始字元）：Mudie Vol.1 206／23／29｜Vol.2（thin）165／18.5／27｜Vol.3（thin）166／17.5／26｜Wareika Dub（thin）169／18／18｜Gunman 229／19／19｜Black Is Our Colour（thin）167／22／27｜Jah Fire 225／20／28｜Dreadlocks（thin）163／18／18｜Rocking Vibration（thin）166／12／12｜I'm Not So Lucky 214／18／20｜Jammy Showcase（thin）160／12／12｜Far East 229／18／24｜We Must Unite 205／20.5／25｜Princess Lady 220／21.5／29｜Spread Out 228／17／17。初稿 14 張超標（最高 348），整格捨去：Mudie 出生地與音響大聲響、Tubby 爵士試音、Vol.2 工程四人與曲長、Vol.3 卡帶與開場曲長；Gunman 評論的節奏組重量句與 2009 加曲；Wade 生年、Black Ark 節奏、Prophets 廠牌；Jah Fire 伴奏名單與 Striker Lee 舊節奏；Dreadlocks 曲數與 2026 重製；Rocking 年份細節與吉他手；Not So Lucky 伴奏團名；Far East 生年；Viceroys 另一首 discomix 曲名與「咬合」句；Princess Lady 的 Dean Fraser 與 Peckham；Spread Out 錄音室分工與樂手。壓完回核 hook 依賴格：全數在 g1／g2（Far East 把「標題曲節奏後來被 King Jammy 數位重製」從 g4 前移到 g2；Rocking 把法國重發前移到 g2）。
- **19052** 骨架歸屬（15 張 15 條，只在擁有者 note 寫歸屬句）：Mudie Vol.1＝把弦樂帶進雷鬼的製作人交出自家歌曲給混音師拆；Vol.2＝CD 掛名欄的弦樂與管樂陣容；Vol.3＝原版標籤「Instrumental Dub」＋系列終章；Wareika Dub＝無字卡紙套的宣傳預發片（離鄉 15 年回島錄音的 dub 版）；Gunman＝親身遭遇寫成標題曲（2009 改名只放（一句））；Black Is Our Colour＝製作人花最多時間栽培的少年歌手；Jah Fire＝兩位同區好友共用一張 LP（皆於 1983 過世）；Dreadlocks＝先學錄音工程再灌首作；Rocking Vibration＝海外（法國）廠牌接力重發；I'm Not So Lucky＝同行歌手開廠牌出的人聲＋dub 成對 showcase；Jammy Showcase＝混音師掛名呈獻的五首長版；Far East＝節奏後來被數位重製；We Must Unite＝熱門 discomix 收成專輯；Princess Lady＝京斯敦錄、倫敦客廳起家的 Ariwa 混；Spread Out＝一張唱片三個盤名（「改名」全批只此張用）。hook 四型：懸疑（Vol.3、Spread Out、Far East、Rocking）／斷言（Vol.1、Vol.2、Jammy、Viceroys）／場景（Wareika、Princess Lady、Not So Lucky、Jah Fire）／人物定調（Gunman、Wade、Dreadlocks）。開頭前四字 15 張互異，也與 add-2026102* 既有 hooks 開頭不同（掃描改掉「CD 版」撞 ml20、「整張只有」撞 md1、「這張首作」撞 md1、「同一張唱／一張唱片」撞 ts6／md8、「法國廠牌」「自己的歌」「的名單上」「首張專輯」「只有五首」撞既有 hook）。給 d／e：Junjo＋Radics＋Scientist 班底的「節奏組重量」軸本組捨去（Gunman 只留人聲提早退場），Chip In 可用；Castell 早逝只在 Jah Fire（合寫）與 Princess Lady（（一句））。
- **19053** 同藝人分軸與「他／他們」引入法：Mudie 三張——Vol.1 帶生平與弦樂起點（製作人身分領句）、Vol.2 帶 CD 掛名欄（系列序數領句）、Vol.3 帶原版標籤與篇幅（掛名欄領句）；Linval Thompson 兩張——Dreadlocks 帶學藝經歷（hook 用「他」，第二句學藝經歷領句；避開池中 ml1 已用的皇后區／布魯克林單曲／「歌手兼製作人」三句）、Rocking 帶掛名與重發（第二句「歌手兼製作人」身分領句，與 ml1《Baby Father》「牙買加 roots 界的歌手兼製作人」前四字不同，寫作層須換字）；Barry Brown 三張——Not So Lucky 廠牌關係（Sugar Minott 的 Black Roots，不寫 Lincoln Minott 以避 ml32《Sufferer's Choice》hook）、Jammy Showcase 混音師來歷（外人掛名）、Far East 成名曲〈Step It Up Youthman〉。其他第二句句型：Wareika 信仰＋樂器（避 ml9《That Man Is Forward》的哈瓦那出身）；Gunman 樂種＋搭檔製作人（避 ml9《Righteous》本名生日）；Wade 名字＋製作人本名 Vivian Jackson；Jah Fire 兩人交情（避 ml1 的律師之子、1962 生）；Viceroys 三位成員名（避 ml32《Brethren》的 1967 組團句）；Princess Lady 廠牌關係（避 ml32《Morning Glory》1959 生）；Spread Out 生年＋城市＋樂種（避 ml1／ml32 的 Black Uhuru 離團／創團句）。hook 只帶代稱或無主詞者（Vol.2、Vol.3、Wade、Dreadlocks、Rocking、Not So Lucky、Jammy、Far East、Viceroys、Spread Out），note 第二句全數指派身分與樂種。
- **19054** 日期：a–c 全只寫到年或月（Wareika 不寫錄音月），「日」後一字無命中。媒體名與榜單名次不進 note（AllMusic 式評論、United Reggae、Global Groove、Discogs 一律寫成「評論說／樂評說」或直述事實）。研究層存疑格不進 note：Vol.1 Tubby 本人坐檯、Vol.3 口琴與弦樂、Wade 的 Tubby 混音與 Gladiators、Jah Fire 的 Jammy 濕混音與「第三張」、Dreadlocks 的 Channel One 錄音（零售文案）、Far East 的 Studio One 說、Viceroys 的「首張以此團名」。時序標記：Gunman 2009 改名重發、Jah Fire 兩人 1983 過世（克制）、Rocking 法國重發、Far East 數位重製、Princess Lady 同年病逝（克制）、Spread Out 1999 改名。年份照主線更正：Wade 1976。
- **19055** 自查：hook 之間中文 4-gram 0；我方 hook 對既有 add-2026102* hooks 0；我方 hook 對我方 note 0；hook 與自卡 note 逐字重複 0；note×note 只剩「在牙買加」（Wade、Spread Out，地名片語）與指派語「語氣克制」（Jah Fire、Princess Lady，不進正文）。`node qa-batch.mjs hooks add-20261023-ml38`：a–c 0 標記，只報 d／e 缺檔；`node chk-hook-crossgroup.mjs add-20261023-ml38`：✓ 全部通過（3 組 15 張，hook 加權 12–23、note 163–236）。輔助腳本：scratchpad `hook-ml38-abc/`（ml38abc-gen.mjs、ml38abc-ngram.mjs）。

## 鉤子層（d、e）（19056–19060）
- **19056** 交件：`desc-tools/batches/hooks/add-20261023-ml38-hooks-d.json`（6）、`-e.json`（5），key 逐字、順序同研究稿（汰除卡已移出，11 張）。預算公式同 19051（只扣「主故事：」、各「→」、「正文只寫上列各項。」、「這條骨架全批只走本張。」）；thin 上限 170、full 230。逐筆（預算／hook 加權／hook 原始字元）：Tyrone Evans（thin）159／18／18｜Visions of John Clarke 212／19.5／25｜I Love Jah（thin）169／17.5／29｜Roll On（thin）162／22.5／28｜Life Is for Living（thin）162／19.5／27｜Sandra Cross Dub Showcase（thin）165／20.5／30｜Susan Cadogan Dub Showcase（thin）166／18／24｜Chip In 230／17.5／29｜Roots and Branches（thin）162／16.5／22｜Dubd'sco Vol. 1 217／20／27｜Serious Reasoning 216／19.5／26。初稿 11 張全超標（最高 316），整格捨去：Tyrone 的 Studio One 時期；Clarke 的 Wackie's House Of Music 地名與 Love Joys 和聲；Meditations 的《No More Friend》對照與 Lee Perry 名；Roll On 的 Barnes 製作與班底輪替；Life 的倫敦錄混；Sandra 的銅管長笛名單；Cadogan 的 Perry 時期〈Fever〉〈Nice And Easy〉；Chip In 的拉斯塔、Allman Town、Junjo 偏好；Roots 的〈Papa Was A Rolling Stone〉〈Betcha By Golly Wow〉、樂手名單；Dubd'sco 的 Pitterson／Morris 工程與兩支 12 吋；Prophet 的原創曲名與銅管。壓完回核 hook 依賴格：全數在 g1／g2（Chip In 把 Radics／Scientist 從 g3／g4 前移到 g2；Dubd'sco 把「五首改自《Blackheart Man》」併入 g2）。
- **19057** 骨架歸屬（11 張 11 條，只在擁有者 note 寫歸屬句；與 a–c 的 15 條不重疊）：Tyrone＝老團創團成員移居紐約、詞曲與廠主合掛；Clarke＝發行權爭奪（Dodd 落空、Makossa 搶先）＋廠主自封後援會會長；I Love Jah＝和聲團從 Black Ark 換到 Bullwackie；Roll On＝ska 元老在紐約的器樂專輯（作品後來編入 EP，標時序）；Life＝跨界客座歌手（Massive Attack）回本行；Sandra＝lovers rock 老將與當年捧紅她的製作人再合作；Cadogan＝合作史跨三十年（1992 起、2008 單曲）；Chip In＝製作／樂隊／混音黃金班底配方（承接 19052 讓出的 Radics＋Scientist 軸）；Roots＝roots 歌單夾進靈魂歌名；Dubd'sco＝自家舊專輯拆成 Dubd'sco 混音；Serious Reasoning＝翻唱單曲打開首張專輯。Ariwa 創立沿革（客廳四軌／Peckham）a–c 已給 Princess Lady、池中 ml9 也用過，d／e 四張 Ariwa 卡一律不帶。Wackie's 沿革（1976 創立、lo-fi、Basic Channel 再發）池中 ml1／ml9 已用，d 四張 Wackie's 卡不帶，只用各自的人物故事。hook 四型：懸疑（Cadogan、Roots）／斷言（Tyrone、I Love Jah、Sandra、Dubd'sco、Serious）／場景（Clarke、Chip In）／人物定調（Roll On、Life）。
- **19058** 同藝人分軸與「他／他們」引入法：Horace Andy 兩張——Life 帶 Massive Attack 客座與出道（第二句出道年領句，避 ml1《Pure Ranking》「唱 roots、早在 Studio One」與 ml32《Exclusively》本名句）、Roots 帶嗓音與曲目（第二句嗓音領句）；Chip In 的「童年玩伴是 Horace Andy」只當身分句，不連兩張盤名。Michael Prophet（b《Gunman》搶劫自傳曲）——Serious Reasoning 帶出道場所與 Heptones 翻唱，避 ml9《Righteous》的 Yabby You 取藝名、本名生日嗓音。Wayne Jarrett 避 ml1《Bubble Up》的 Hartford 移居與 Lloyd Barnes 首錄。Bunny Wailer 避 ml1《Sings the Wailers》的「原團成員」與 ml9《Vol. 2》的「隔了五年」，改用三人各開廠牌。Susan Cadogan 避 ml1《Hurt So Good》的官司與 Magnet 重錄（〈Hurt So Good〉只留榜位當身分）。Mad Professor 在四張 Ariwa 卡只當製作人名出現（Sandra 卡以「他」承接）。第二句句型配表：所屬老團／移居紐約／和聲資歷／組團資歷／出道年／樂種地位／成名曲與榜位／童年玩伴／嗓音／各自開廠牌／出道場所——與 a–c 的 15 種不重複。
- **19059** 日期與禁區：d／e 全只寫到年或月（Dubd'sco「1975 年 8 月」），「日」後一字無命中；Sandra 的兩個發行日不進 note，只寫 2023。媒體名與榜單名次不進 note（Hard Wax、Forced Exposure、Jahtari、AllMusic、Bandcamp 一律不具名；英國單曲榜第 4 名是官方榜，留作 Cadogan 身分）。研究層「未能證實／查無」格整格不進：Serious Reasoning 的 Channel One／Tubby 錄混與《Consciousness》關係；Cadogan 人聲錄音年份與是否重錄；Roots 的 The Robotiks 是否鼓機；Tyrone 不套用《For Lovers Only》的 boogie 描述；I Love Jah 只寫「1982 年錄成」不寫發行。與作品無關的後續生平（Evans 2000、Alphonso 1998 逝世）不寫。qa-batch 互指 1 處：Dubd'sco 的「Bob Marley」為本卡研究稿事實（Marley、Tosh 各開廠牌），保留。
- **19060** 自查：全批 26 張 hook 之間中文 4-gram 0；d／e hook 對 add-2026102* 既有 hooks 開頭前四字 0 撞（改掉「其中一首」撞 mc32／mc33、「十一首裡」撞 md11、「五張專輯」撞 md16／ts8、「交出十首」撞 mc5）；hook 與自卡 note 逐字重複 0；note×note 跨組殘片改掉「十首全是器樂」（對 Mudie）、「首張專輯」「跟製作人」（對 Wade）、「本作七首」（兩張 Showcase 互撞）、「生於京斯敦」「第一支單曲」，剩「發行本作」「的牙買加」等指派用語。`node qa-batch.mjs hooks add-20261023-ml38`：全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml38`：✓ 全部通過（5 組 26 張）。輔助腳本：scratchpad `hook-ml38-de/`（budget-ml38-de.mjs、w-ml38-d.py、w-ml38-e.py）。

## 寫作層（writer-1）（19061–19065）
- **19061** 交件：`desc-tools/batches/output/add-20261023-ml38-out-1.json`（13 張，key 逐字同序）。字數（Array.from）：Mudie Vol.1 225｜Vol.2（thin）155｜Vol.3（thin）154｜Wareika Dub（thin）150｜Gunman 221｜Black Is Our Colour（thin）141｜Jah Fire 239｜Dreadlocks（thin）152｜Rocking Vibration（thin）169｜I'm Not So Lucky 223｜Jammy Showcase（thin）156｜Far East 229｜We Must Unite 239。範圍 141–239，全在帶內；初稿只有 We Must Unite 243 一張超標，整格捨去「三人」與發行句改寫壓回。
- **19062** 第二句句型照 19053 配表逐張走（製作人身分／系列序數／掛名欄／信仰＋樂器／樂種＋搭檔／名字＋本名／兩人交情／學藝經歷／歌手兼製作人／廠牌＋歌手身分／混音師來歷／成名曲／三位成員名）；Rocking 的身分句寫「身兼歌手與製作人的」，前四字與 ml1《Baby Father》不同。Wade 第二句由「這位歌手是」改「他叫」，避開與 Mudie Vol.1「這位牙買加製作人是」同形。
- **19063** 日期＋領頭名詞逐張配死：本作年出版／Moodisc 於年推出／唱片年問世／版本…年份是年／原版 LP／單曲年一推出／LP 年交由／年在英國廠牌上市／英國於年發行／地點…時間是年／年，他在自家廠牌／原盤年掛／英國的 Trojan 讓它年上架。
- **19064** note 外的取捨：Wade note 的「栽培一說出自 Jean Williams」不進正文（屬消息來源交代；hook 已直述栽培一事，正文不掛出處）。Jah Fire 的曲目歸屬寫「哪幾首歸他，說法並不一致」，不點各家媒體名。全檔不出現媒體名、媒體榜單名次、「據說／據傳」；樂評內容只寫成「樂評形容」「被形容得」。Mudie Vol.1 不寫 Tubby 本人坐檯（研究層存疑格）。
- **19065** 自掃：檔內跨張中文 4-gram 0；對 writer-2 卡單的 hook＋note 預掃，先拆掉 2 張的通用殘片「伴奏混音」「英國發行」「在牙買加」「牙買加的」「從牙買加」（先交件一方按 3 張處理）。`node qa-batch.mjs out add-20261023-ml38`：out-1 13 張 141–239、thin 7 張全 ≤180（僅報總張數 13 vs 26，待 out-2）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。輔助腳本：scratchpad `wr-ml38-1/`（gen-ml38-1.py、chk-ml38-1.mjs）。

## 寫作層（writer-2）（19066–19070）
- **19066** 交件：`desc-tools/batches/output/add-20261023-ml38-out-2.json`（13 張，key 逐字同序）。字數（Array.from）：Princess Lady 226｜Spread Out 238｜Tyrone Evans（thin）152｜Visions of John Clarke 238｜I Love Jah（thin）174｜Roll On（thin）166｜Life Is for Living（thin）168｜Sandra Cross Dub Showcase（thin）177｜Susan Cadogan Dub Showcase（thin）165｜Chip In 218｜Roots and Branches（thin）151｜Dubd'sco Vol. 1 225｜Serious Reasoning 205。full 6 張 205–238、thin 7 張 151–177。初稿 2 張出界，整格處理：Spread Out 249（砍「重發」二字與「三個版本背後」整句改成 Bunny Lee 經手製作）、Sandra 194（捨「廠牌賣得好的幾張之一」——hook 已說拉抬銷量，留著等於複述）。
- **19067** 第二句照 19053／19058 配表逐張走：廠牌關係／生年＋城市＋樂種／所屬老團／移居紐約／和聲資歷／組團資歷／出道年／樂種地位／成名曲與榜位／童年玩伴／嗓音／各自開廠牌／出道場所。hook 代稱具名：Tyrone 的「廠主」＝Lloyd Barnes；Cadogan 的「當中一首」＝〈You Turn Me On〉；Sandra 的《Country Life》補年代與製作人；Prophet 的翻唱補曲名〈Fight It To The Top〉；Dubd'sco 的「他」由第二句 Bunny Wailer 領句。hook 只帶代稱、身分沒寫出的兩張補身分詞：Roots and Branches、Life Is for Living 各加「歌手」，Cadogan 也加「歌手」（皆不出 note 範圍）。
- **19068** 日期＋領頭名詞逐張配死（han() 剝數字與拉丁後實測）：年交出（Castell）／年這批歌先在（Carlos）／Wackie's 在年把這張（Evans）／本作在年面世（Clarke）／年錄成（Meditations）／發行本作是年的事（Alphonso）／Ariwa 在年的出品（Life）／年的《…》共收（Sandra）／年本作問世（Cadogan）／年本作交由…於英國出版（Chip In）／年由 Ariwa 出版（Roots）／由 Solomonic 在年發行（Dubd'sco）／年英國讓這張出道作上市（Prophet）。「日」全批未出現。
- **19069** note 範圍與禁區：媒體名、媒體榜單名次一律未寫（note 本就無；Roots 的「顫抖假音」出自轉載短評，寫成直述、不掛出處）。保留兩個榜：Cadogan「英國單曲榜第 4 名」（官方榜）、Life「〈Skylarking〉登上牙買加榜首」（note 指派、未具名媒體，屬銷售／播放榜而非媒體選單；主線若判為媒體榜可整句刪，刪後 168→約 150 仍在 thin 帶內）。Clarke「與 Johnny Clarke 是兩個人」寫成正面句。無「據說／據傳」、無否定句；QA 互指 1 處（Dubd'sco 的 Bob Marley）為本卡 note 事實，同 19059 保留。
- **19070** 自掃：與 out-1 合掃（writer-1 已定稿）跨張中文 4-gram 0；途中拆掉「京斯敦的」「在京斯敦」「牙買加的」「在年推出」「的製作人」「本作在年」「他自己的」「發行本作」「推出七首」「英國發行」「於年發行」「是錄音室」「製作人是」「掛名製作」「英國廠牌」「在年發行」「擔任製作」「牙買加和聲團」「歌手在年」等殘片（一律整個名詞換掉）。對池中既有 add-2026102* out 的命中只剩通用語（「第二張專輯」「錄音與混音」「薩克斯風」等），同藝人舊卡（ml1／ml9／ml32／c57）開頭句型 0 撞。`node qa-batch.mjs out add-20261023-ml38`：全部通過（out-2 151–238）；`qa-check-research`：標記 0；`fix-spacing`：0 處。輔助腳本：scratchpad `wr-ml38-2/`（draft-ml38-2.mjs、scan-ml38-2.mjs）。

## 主線審稿（19071–19080；2026-10-23）
- 19071：逐張審 26 張（out-1 13、out-2 13），逐句對回研究稿；事實層未改，改的是單源評價句與無法核實的數字。hook 未動，research／hooks／input 不需同步。
- 19072：改 3 處：
  - `Hugh Mundell|Jah Fire`：刪「Mundell 唱的標題曲，用的是 Jammy 最好的節奏之一。」（唯一來源是 Global Groove 零售頁的評價句）→ 207 字。
  - `Barry Brown|Far East`：「〈Step It Up Youthman〉讓 Barry Brown 在 1979 年成名，他也被視為早期 dancehall 最成功的歌手之一。」→「〈Step It Up Youthman〉讓 reggae 歌手 Barry Brown 在 1979 年成名。」（「最成功的歌手之一」只有維基單源評價）→ 212 字。
  - `Horace Andy|Life Is for Living`：「《Mezzanine》裡有五首由他主唱，〈Angel〉也在其中。」→「《Mezzanine》的〈Angel〉就是他唱的。」（「五首」只見維基一處，《Mezzanine》署名主唱與此不符，拿掉數字）→ 161 字。
- 19073：未改但記錄——Viceroys〈They Can't Stop Us Now〉「又硬又重」是樂評部落格的聲音描述（非評價），保留；Horace Andy〈Skylarking〉牙買加榜首屬銷售榜、未點名媒體，保留；Tyrone Evans 封面用圓標（原盤 Wackie's 通用封套）。
- 19074：上線前檢查——`qa-batch out`、`qa-check-research`（兩檔各 0 標記）、`fix-spacing`（0）全過。
- 19075：上線前檢查——prepare gate 0 error（27 warning 皆 UPC 盡力而為等）；封面 live-check 26/26 HTTP 200（CAA 17、Apple 4、Discogs 5，Discogs 已登錄 registry）；對 origin 77 個 `claude/*` 分支與 main 的 seed＋卡單再去重 0 撞。

## 上線與評分（2026-10-23，主線）（條號 19076–19078）
- **19076**：上線 26 張：card_catalog 26／26、KV 26 鍵回讀逐字一致、試聽 16 ready（Don Carlos《Spread Out》以 Apple《Pass Me The Lazer Beam》人工配）、10 unavailable（Barry Brown 三張、Wade、Tyrone Evans、Alphonso、Bunny Wailer、Prophet《Serious Reasoning》、兩張 Ariwa Showcase：Apple 無對應）、seed +26、published gate 0 error。
- **19077**：類型樹 26／26 落位。Last.fm 把 4 張標錯（Rico《Wareika Dub》jazz/rock、Wade rock/world、兩張 Ariwa Showcase 空），seed 曲風欄改回 world 為首；`genre-l3-artist-map.json` 補 Rico、兩張 Showcase → world/reggae/dub，Wade、Tyrone Evans → world/reggae/roots。抽卡封面重建。
- **19078**：**落格率 26/26＝100%**（`batch-progress/mood-axes/score-ml38/`，照 10-23 體感標準）。評分 x 1.9–2.9、y 0.5–1.5、z 0.5–1.3；Roland Alphonso《Roll On》x 2.9／y 0.5 最貼邊。**研究後汰掉的 7 張是落格率的關鍵**——冷硬器樂 dub、合成器 boogie、精選全數擋下。

## 本批新藝人（無介紹，未切；並行時子工作階段不切）
Harry Mudie、Rico Rodriguez、Michael Prophet、Wayne Wade、Linval Thompson、Barry Brown、The Viceroys、Lacksley Castell、Don Carlos、Tyrone Evans、John Clarke（Wackie's 歌手，非 Johnny Clarke）、Roland Alphonso、Wayne Jarrett、Mad Professor & Sandra Cross、Mad Professor & Susan Cadogan（合掛名）（15 個掛名）。
