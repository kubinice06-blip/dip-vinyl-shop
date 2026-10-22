# add-20261022-ml4 裁定（情緒薄格策展線・恍惚：東亞——台日韓 dream pop／shoegaze／暖 dub／lo-fi R&B）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；交接 `batch-progress/HANDOFF-mood-cells-line.md`、場景 `batch-progress/mood-cells-20261022/SCENES.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。
> 策展：`curation-ml4.json`（兩輪共 35 張：jp-dream 12、jp-dub 10、kr-dream 5、tw-dream 8）→ `master-ml4.json`（MB 34、人工 1）→ `pick.json`（20）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml4-cards.json`（20 張；研究 a–e 各 4）。身分：MB 釘住 19、§1 人工 1（U.TA屋塔《緩飆公路 Highway Cruising》）。
> **預留：研究 a 14241–14250、b 14251–14260、c 14261–14270、d 14271–14280、e 14281–14290、鉤子 14291–14300、寫作 14301–14310、主線 14311–14320。**
---

## 主線策展（不佔條號）
- **場景挖不到 45 張，照實上 20**（不湊數）。場景核心大多已在池：落日飛車 6、Fishmans 4、Mute Beat 3、こだま和文 2、甜梅號 4、Parannoul 3、The Black Skirts 3、9m88 3、?te、공중도둑；主流 lo-fi R&B（Colde、Zion.T、SIRUP、iri、9m88 系）留給 ml20–22。
- 35 張全過 moodGuess 邊距，但亞洲卡策展把握度低（33/35 標 uncertain）。主線用**池中同藝人／同圈既有評分**（`data/mood/card-moods-v0.json`）比對，汰 15 張：
  - **色溫實際判冷**：MUTE BEAT《MARCH》、こだま和文《Something》（池中同人 4 張 z −0.6～0，器樂 dub 小號判冷）；Dry & Heavy《From Creation》（池中《Full Contact》z 0，留有人聲的首作一張）；Doodle《Sacrifice in Despair》（台灣 shoegaze 池中甜梅號 z −0.3～0.3，兩張只留一張）；細野晴臣《MEDICINE COMPILATION》（池中同期盤 z 0–0.2，且 ambient 判輕風險）；吳卓源《5 am》（夜感，策展自估可能判冷）。
  - **質地實際判輕**：wave to earth 兩張（池中《bad pieces》y −0.6）、?te《Way out》（池中前作 y 0.3）、HYUKOH & 落日飛車《AAA》（池中 HYUKOH《23》y 0.6／z 0.1、落日飛車多張 y 0.1）、Fishmans《Chappie, Don't Cry》《King Master George》《ORANGE》（早期乾淨 reggae-pop／中速 pop，池中後期盤才 y 0.8–1.0）、Polaris《Union》《Music》（估 y 0.9，同團留三張）。
- 掛名：`LITTLE TEMPO` 照 MB（Discogs 寫「Little Tempo Meets Henry Holder」），封面 CAA 無 → 走 Discogs（covers.json）。`U.TA屋塔` 走 §1 人工身分（MB 有藝人無此盤）。
- 同名不同人：bonobos（日本 dub-pop）≠ 池中 Bonobo；Polaris 用 MB 286431ba 日本樂團；Doodle、The Fur. 為台灣團。
- 台灣流行：吳卓源（Julia Wu，華語 R&B、台灣出產）上線後加 `tw-pop-artists.json`；Doodle／The Fur.／U.TA屋塔 是獨立樂團（rock）。

## 研究 e 組（條號 14281–14290）

- **14281**：LITTLE TEMPO 掛名查清——Discogs 主藝人 Little Tempo、join「Meets」、副名 Henry Holder；Henry Holder 職務僅「Mixed By [Dub]」，非演奏者。卡單掛 LITTLE TEMPO 維持；寫作層不得寫成雙人樂團。Henry Holder 國籍／背景單源（Needs Vote），facts 不寫。
- **14282**：吳卓源《1994 依舊舊事》moodGuess 嚴重存疑——樂評為 90s 復古 R&B（MIDI／合成鼓、New Jack Swing 重拍舞曲、Boyz II Men 式慢板），非 lo-fi 糊拍；x 恐破 3.0，建議汰換。廠牌華風數位（MB）vs ChynaHouse（zh wiki）未決，寫作層別寫廠牌。發行日取 2018-12-18（zh wiki 的 12-11 疑為預告日）。
- **14283**：Polaris《空間》moodGuess 部分存疑——Tower（經搜尋摘要）稱節奏組有「疾走感」，鼓手茂木欣一與あらきゆうこ；長曲（55 分 41 秒、8 首）不等於慢拍。tower.jp 403，屬間接來源。
- **14284**：Oki Dub Ainu Band《Himalayan Dub》為《Sakhalin Rock》（2010）的 dub 版（OKI vs 内田直之混音對決），非新錄音；卡單 label 可補 Chikar Studio（CKR-0117）。聲音事實缺針對本盤的樂評，status thin；z（暖）無來源、tonkori 空弦偏亮，可能判冷。

## 研究 c 組（14261–14270）
- **14261** Dry & Heavy：身分無誤（MB 47176d68／Discogs 3166216，1997-08-05，Olive Disk TGCS-354）。有人聲（Likkle Mai、Ao Inoue）與管樂（長號、薩克斯風、長笛），每首約 4 分鐘上下，非長 dub；拍速與回音長短查無可引來源。moodGuess 部分存疑（z 無法證實，池中同團 z 0）。七尾茂大、秋本武士的漢字取自策展層，未獨立驗證，寫作建議只用 Dry／Heavy 藝名。
- **14262** So!YoON!：身分無誤（2019-05-21，Magic Strawberry Sound／Bungabunga 發行）。**moodGuess 強烈存疑**：英文維基稱 indie rock／electronic／dream pop／alternative R&B 混合，採訪稱十首不限曲風，客串含 Zion.T、Sam Kim 等流行／R&B 人，並非統一的慢霧暖；只有收尾曲 Athena 確定是真鼓真貝斯。建議主線實聽或以池中同人評分決定去留。
- **14263** Shin Hae Gyeong《속꿈, 속꿈》：年份、盤名無誤（2020-06-16）。**廠牌三說矛盾**：卡單 MB 的 YOUNG,GIFTED&WACK、英文維基 Poclanos、Discogs 2020 版自行發行＋2021 Goodtime Media LP，查無第四來源；facts 只寫 Discogs。單人包辦製作與錄混。聲音（鼓、拍速、低頻）查無可引用的評論，moodGuess 輕度存疑。
- **14264** Doodle《Endless Dreamless》：身分無誤（Discogs 10678646，DG Records DG003，2016-04-08）。唯一直接的樂評證據寫的是前作《Sacrifice of Despair》，已在 facts 標明。有真鼓、長曲（近 10 分鐘），重量可能成立，色溫與拍速無證據；Discogs 標 Psychedelic Rock／Shoegaze，moodGuess 中度存疑。
- 本組 WebSearch 共用額度 5 次已用完（Shin 評論、So!YoON! 評論、Dry & Heavy、Doodle、Oki），其中 Dry & Heavy 與 Doodle 本張兩次搜尋無果，聲音事實多半只能由信用名單與類型標籤推得。

## 研究 d 組（14271–14280）
- **14271** The Fur.《Town》：推翻策展『台北』——中文維基為高雄。卡單 label 空白：2018 原版 Bandcamp 自行發行，2020-12-10 Hove 實體版 HSS001。**moodGuess 強烈存疑**：鼓機＋synthpop 標籤，真鼓只在 4 首，曲短（平均約 3 分 31 秒），y 恐不足 0.5，建議汰換。金曲獎最佳新人入圍（單一來源，非得獎）。
- **14272** The Fur.《Serene Reminder》：2020-12-10 Hove HSS002，無年份爭議。標籤 indie folk rock／synthpop，Discogs 僅標 Indie Rock／Pop，無霧狀吉他或慢拍的證據；status 標 thin，moodGuess 強烈存疑，建議汰換。Freshmusic Awards 的『獲獎』說法太含糊，不引用。
- **14273** U.TA屋塔（§1 人工身分核對）：Discogs 33801504（2015-12，CD Album，Hove UTA001）與 Bandcamp（首張專輯，2015 年 12 月）一致，盤名、年份、廠牌對得上；廠牌只見 Discogs。**推翻策展『唯一全長』**：另有 2009《good,night》、2014《捲 / Roll》、2018 三張發行，2020 年預告第二張。成立年 2006（Noise Artists）與 2013（Bandcamp）兩說並存。影響源含 Portishead／Massive Attack，色溫冷風險屬實，moodGuess 強烈存疑，status thin。
- **14274** Oki Dub Ainu Band：身分無誤（Discogs 5609015／MB 69cff270，2006-12-03，Chikar Studio CKR0112）。**補卡單 label 空白**。『首作』不成立（2004《Dub Ainu》、1990 年代個人專輯在先）。有真鼓、兩位打擊樂手與貝斯，Naoyuki Uchida 混音（與 Dry & Heavy 首作同一人），曲長平均約 5 分半；拍速、色溫無直接來源，後期陣容樂評提到 trip hop 比較，moodGuess 輕度存疑。

## 研究 a 組（14241–14250）
- **14241** sugar plant《Hiding Place》：卡單 label 寫 Pop Narcotic，實為美版（NARC 010）；日本原版是 Wonder Release Records（W.R.R.-29，1995-02-24）。facts 兩者並寫，建議上卡 label 註明；年份 1995 不動。Bandcamp 稱 1994 年錄音。
- **14242** sugar plant《Hiding Place》moodGuess 存疑：來源標籤是 slowcore／shoegazer（Galaxie 500、Low 一路），z 0.6 偏暖與 y 低頻厚度皆無來源，鼓與低頻只能推斷。
- **14243** sugar plant《after after hours》：英文維基列 1997（美版年），採 1996-08-21 Pony Canyon（MB／Discogs）。費城 Studio Red／Adam Lasus／1996-04 錄音、Sota Takagi 首度加入出自 Discogs 備註與唱片行再版文案。sound 有電子與 downtempo 取向，moodGuess 大致可信。
- **14244** UA《turbo》：moodGuess 存疑（x 2.5 恐破 2.7、y 薄）。查到 reggae-pop 標籤、倫敦錄音、dubwise 混音兩首，但另有 Disco Style 〈リンゴ追分〉與浅井健一寫的搖滾味曲；策展層『轉向 dub／迷幻的關鍵作』無來源，不可寫成 dub 專輯。第三張專輯、Oricon 6 位。
- **14245** bonobos《HOVER HOVER》：推翻策展『Fishmans 之後最像的承繼者』——只查到參加 2004 年 Fishmans 致敬盤，無樂評支持，上卡不得寫。聲音層 thin（無樂評），標 thin；moodGuess 存疑（有 groove 取向曲名，x、y 皆靠邊）。label MB 為 Teenage Symphony（Dreamusic 旗下）。
- **14246** WebSearch 本組共用額度：a、b 合計用 5 次（sugar plant、UA、bonobos、Polaris、Hotel Mexico），均已使用完畢。

## 研究 b 組（14251–14260）
- **14251** Hotel Mexico《His Jewelled Letter Box》：moodGuess 嚴重存疑——英文樂評明講有真鼓與滑順貝斯、可跳舞、不同於內向 chillwave，OTOTOY 也說易於跳舞；x 很可能 > 2.7、y 輕。建議汰換。年份：2010-08 限定店鋪首版，2011-03-09 全國再發行（MB／Discogs 取後者，卡單 2011 不動）。
- **14252** Polaris《Family》：原版 2003-11-06（MTCA-9004），另 2004-07-22（MTCA-5010）、2011 再版；性質未明。『Fishmans 貝斯手柏原譲』成立（ja 維基 Fishmans 條），オオヤユウスケ 是否 Fishmans 成員查無，不可寫。status thin（無樂評）。
- **14253** Polaris《Home》：2002-11-07 無爭議；策展層『承 Long Season 的漂浮感』無來源。10 首約 65 分鐘、4 首逾 10 分鐘。status thin；moodGuess 存疑（Discogs 標籤含 jazz-rock、post rock，鼓或偏活）。
- **14254** 小沢健二《Eclectic》：推翻策展『慢板 R&B、耳語唱腔、quiet storm、lo-fi R&B 先聲』——日文維基只寫 funk／soul／R&B，無慢板與耳語描述；原曲〈今夜はブギーバック〉中速，x 恐 2.5–3.0。label 補：EASTWORLD（東芝EMI）TOCT-24711（卡單 label 空）。Oricon 7 位。
- **14255** jp-proper-names.json 已 append 25 筆（本批日文專名）；未改既有項。

## 主線裁定（研究層交件後；條號 14311–14314）
- **14311**　研究層聲音存疑汰 9 張（不補位，場景候補已用盡）：吳卓源《1994 依舊舊事》（90s 復古 R&B、New Jack Swing 重拍）、Polaris《空間》（節奏組「疾走感」）、Hotel Mexico《His Jewelled Letter Box》（真鼓、可跳舞）、UA《turbo》（reggae-pop／disco 混雜，只有兩首 dubwise）、bonobos《HOVER HOVER》（聲音零來源、x／y 貼邊）、So!YoON!《So!YoON!》（多曲風混合、流行客串）、The Fur.《Serene Reminder》（indie folk rock 標籤，無霧狀證據）、U.TA屋塔《緩飆公路》（Portishead／Massive Attack 系、偏冷）、Oki Dub Ainu Band《Himalayan Dub》（前作 dub 版、聲音零來源，同團留首張）。卡單、pick.json、研究稿同步刪除；被汰卡留存 `dropped-cards.json`。**本批上線 11 張。**
- **14312**　留下的存疑卡與理由：The Fur.《Town》（鼓機＋synthpop，但屬 Men I Trust 型 chorus 吉他＋合成器墊，依 10-22 質地新規則 (2) 算包覆，先例 Men I Trust《Oncle Jazz》落恍惚）；小沢健二《Eclectic》（中慢 R&B，x 估 2.5–3.0 有風險，主線聽感判慢而濕，留）；sugar plant《Hiding Place》、Polaris 兩張（標籤 slowcore／post rock，暖無來源，以評分為準）。
- **14313**　廠牌更正：sugar plant《Hiding Place》→ Wonder Release Records（日本原版 W.R.R.-29；Pop Narcotic 是美版）、小沢健二《Eclectic》→ EASTWORLD、Oki Dub Ainu Band → Chikar Studio。신해경 廠牌三說（MB YOUNG,GIFTED&WACK／英文維基 Poclanos／Discogs 自發），卡單照 MB，正文不寫廠牌。
- **14314**　正文禁寫（研究層查無來源）：bonobos 以外，Polaris「承 Fishmans《Long Season》」、オオヤユウスケ 是 Fishmans 成員、小沢《Eclectic》是 quiet storm／lo-fi R&B 先聲、Oki「首作」（2004 已有《Dub Ainu》）、The Fur.「台北」（中文維基寫高雄）。LITTLE TEMPO 掛名照 MB；Henry Holder 是 dub 混音人，不是團員。
