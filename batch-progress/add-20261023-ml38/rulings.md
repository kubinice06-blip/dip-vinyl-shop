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
