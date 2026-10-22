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

## 鉤子層（a–e，一人全做；條號 14291–14299）
- **14291** 交件：`desc-tools/batches/hooks/add-20261022-ml4-hooks-{a,b,c,d,e}.json`（2／3／3／2／1＝11 張，key 逐字照研究稿、順序不變）。預算公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（只扣四樣；「第二句⋯」指派句照算）。逐筆（預算／hook 加權／hook 原始字元）：sugar plant《Hiding Place》218／21／27；《after after hours》222／23／28；Polaris《Family》159／18／28（thin 上限 170）；《Home》156／20.5／29（thin）；小沢健二《Eclectic》225／21／21；Dry & Heavy 229／14／19；신해경 217／15／15；Doodle 224／20／28；The Fur.《Town》216／19.5／24；Oki Dub Ainu Band 213／16／18；LITTLE TEMPO 227／16.5／21。初稿全數超標（234–343），一律整格捨去後回核 hook 依賴格都在 g1／g2。
- **14292** 捨去格（壓預算）：Hiding Place 的團名由來（川崎製糖廠，單源且與신해경藝名骨架撞）、10 首曲長、〈slowdown〉曲長；after after hours 的 Adam Lasus、rave／krautrock 靈感、Lollipop 評語；Family 的〈トリオ〉、〈深呼吸〉單曲；Home 的 Slow Motion 秒數（hook 已帶）、FUJI ROCK、Tide 自錄自混（避開 Doodle／신해경的自錄骨架）；Eclectic 的 EASTWORLD 廠牌名、スチャダラパー、非賣品黑膠、911 附註；Dry & Heavy 的 Burning Spear 團名由來、Vital Connection、曲長區間；Doodle 的暗色曲名、前作樂評（研究層已標屬前作）；Town 的成員名、〈Blueberry〉器樂、Hove 目錄號；Oki 的 Futoshi Ikabe 名、開場曲長、2008 北海道文化獎；LITTLE TEMPO 的 Hakase（前 Fishmans，避開 Home 的 Fishmans 軸）、〈Fudd's Dub〉、Seiji Big Bird 以外的細項。
- **14293** 骨架歸屬（11 張 11 條，只寫在擁有卡）：Hiding Place＝逆東京主流向美國獨立樂團取經；after after hours＝標題即情境（after-hours 散場時段）＋海外錄音室；Family＝樂團自創廠牌；Home＝前名團貝斯手另組新團＋長曲首張全長；Eclectic＝隱身海外後零宣傳復出；Dry & Heavy＝鼓／貝斯藝名掛帥擴編成真人整團＋混音臺做 dub；신해경＝藝名典故＋一人包辦臥室製作；Doodle＝停擺重組＋鼓手兼錄混；Town＝先網路自發、兩年後補實體（＋新人獎入圍）；Oki＝傳統弦樂器接上 dub（成年後得知血統）；LITTLE TEMPO＝原盤三個月後的整張 dub 改版、混音人掛副名。「名字由來」只給신해경；「首張全長」只在 Home 說，Dry & Heavy 寫「第一張專輯」，Town 不寫序數；内田直之（三張研究稿都有）只指派給 Dry & Heavy；Olive Disk & Records（Dry & Heavy／LITTLE TEMPO 同廠）只給 Dry & Heavy；「自行發行」只給 Town（신해경的自發數位版＋隔年 LP 整格不派，也合 14313 正文不寫廠牌）。
- **14294** hook 四型：懸疑（Eclectic、Town）／斷言（Hiding Place、Family、신해경、LITTLE TEMPO）／場景（after after hours、Home、Doodle）／人物定調（Dry & Heavy、Oki）。懸念收尾：Eclectic→g2 宣傳只靠廣播與雜誌訪談；Town→g2 Hove 實體版。開頭前四字 11 張互異，也與同日 md1–md4、ts5–ts6 已交 hook 開頭不同。hook 原始字元 15–29、全部 ≤30。
- **14295** 同藝人分軸與「他們／他」引入法：sugar plant——Hiding Place 帶生平（1993 東京、兩位創團者名＋樂器）、第二句以兩人名字領句；after after hours 帶錄音細節（費城、Sota Takagi 加入、曲長），第二句以「這支東京 dream pop 樂團」指示詞＋身分引入。Polaris——Family 以「日本 dub pop 樂團」樂種前置引入、帶廠牌；Home 以「由主唱 Yusuke Oya 與前 Fishmans 貝斯手柏原譲組成」的前團關係引入、帶曲長。第二句句型逐張配死：名字領（Hiding）／指示詞（after）／樂種前置（Family）／「由⋯組成」（Home）／時間領（Eclectic「1998 年後」）／「是⋯」判斷（Dry & Heavy）／生年（신해경「1990 年生」）／「是 2004 年成立的」（Doodle）／地點（Town「在高雄成軍」）／出生地（Oki）／「開始活動的」（LITTLE TEMPO）。신해경 性別代名詞不用，note 指派「以名字稱呼」。
- **14296** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：由（Hiding）／交（after）／上（Family）／問（Home）／發（Eclectic）／在（Dry & Heavy）／釋（신해경）／推（Doodle）／先、才（Town 兩個日期）／出（Oki）／接（LITTLE TEMPO），12 處 12 字互異。
- **14297** 主線 14311–14314 照辦：Polaris 兩張不寫《Long Season》、不寫 Yusuke Oya 與 Fishmans 的關係（只寫柏原譲出身）；Eclectic 只寫 funk、soul、R&B 路線，無 quiet storm／lo-fi R&B／慢板／耳語；Oki 不寫「首作」，改寫「樂團同名專輯」並帶 2004《Dub Ainu》在先；Town 寫高雄；LITTLE TEMPO 掛名照 MB 大寫，Henry Holder 只寫「掛副名、職務是把原盤混成 dub」。派工補充「媒體名與媒體榜單名次不進正文」：신해경 的 IZM／Music Y 年度第 8 名不派，只留「樂評稱它最親切、最舒服」；Doodle 的 Noise Artists 改「常被拿來和 Ride 比較」不具名。Oricon 第 7 名是銷售榜，保留。
- **14298** n-gram 自查（CJK 4-gram，排除指派樣板字）：hook 對 hook 0；全批 hook＋note 跨張 0（初稿撞的「第二張全」「主唱兼吉」「彈吉他並」「年起活動」「日本樂團」等已逐條改字）；hook 對自家 note 只剩專名「小沢健二」。hook 與 note 無逐字重複句。
- **14299** 腳本：`node qa-batch.mjs hooks add-20261022-ml4` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261022-ml4` 5 組 11 張 ✓ 全部通過（hook 加權 14–23、note 152–237）。`jp-proper-names.json` 未 append（内田直之、ブギーバック 片段 qa 未報）。

## 寫作層（writer-1；條號 14301–14310）
- **14301** 交件：`desc-tools/batches/output/add-20261022-ml4-out-1.json` 11 張（full 9：201–234；thin 2：Family 159、Home 159）。初稿無超標、無掉下限（222／229／159／164／226／222／216／232／207／201／222），自掃改字後微調至定稿數字。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（待補 0）全通過；「據說／據傳／據…」0（唯一「據」是 Eclectic 的「據點」）。
- **14302** 第二句領句全照 14295：名字領（Hiding Place：庄山ちなつ與小川真一）／指示詞（after after hours：這支東京 dream pop 樂團）／樂種前置（Family：日本 dub pop 樂團 Polaris）／「由⋯組成」（Home：由前 Fishmans 貝斯手柏原譲⋯）／時間領（Eclectic：1998 年後）／「是⋯」判斷（Dry & Heavy）／生年（신해경：1990 年生的）／「是 2004 年成立的」（Doodle）／地點（Town：在高雄成軍）／生年＋出生地（Oki）／「開始活動的」（LITTLE TEMPO）。「日」後一字逐張驗過，與 14296 全同（由／交／上／問／發／在／釋／推／先才／出／接）。
- **14303** 自掃 han() 4-gram：初稿跨張命中 `日本樂團`×3、`長約分鐘`×3、`專輯年月`／`輯年月日`×3、`分鐘最長`、`唱彈吉他`、`在年月日`、`全長年月`（Polaris 兩張），一律整個名詞拿掉或改語序：Dry & Heavy 改「來自日本的」、Home 改「Polaris 這個日本團」並刪日期前的「在」、신해경 改「全長作品」、Oki 改以 Chikar Studio 領句、Doodle 改「擔任主唱與吉他」、after 改「一首就拉到」、Family 改以日期領句。定稿跨張 2 張以上 0 條。
- **14304** 媒體名與媒體榜單照辦：신해경 正文只寫「樂評則形容整張最親切、也最舒服」，無媒體名、無年度榜名次、無星等；Oricon 第 7 名（銷售榜）照 14297 保留。The Fur. 的自我形容轉成間接敘述（不加引號）。
- **14305** 14314 禁寫照辦：Polaris 兩張無《Long Season》、Yusuke Oya 不連 Fishmans；Eclectic 只寫 funk、soul、R&B 路線；Oki 寫「2004 年就已有《Dub Ainu》」，不寫首作；Town 寫高雄；LITTLE TEMPO 照卡單大寫，Henry Holder 只寫掛副名與 dub 混音職務。Hiding Place 美國巡演只寫「橫越美國巡演」（facts 的「開車」note 未列，不寫），並以「隨後」標時序。
- **14306** 給主線看一眼：Oki 的 hook「後來才得知自己有阿伊努血統」，note 沒有給得知的時點，正文第二句直接接生年、出生地與 tonkori，沒有另寫收尾；若審稿認為懸念未收，可由主線在 note 補上時點。

## 主線審稿（2026-10-22；條號 14315–14318）
- **14315**　逐張審 11 張，逐句對回研究稿。改 3 張（皆為刪句，不動事實，研究／鉤子／輸入三層不需同步）：
  - `desc4:신해경|속꿈, 속꿈`：「；樂評則形容整張最親切、也最舒服」→ 刪（單一媒體評語句，研究稿出處是 IZM 單評）。
  - `desc2:Doodle|Endless Dreamless`：「，旋律性強、人聲輕，常被拿來和 Ride 比較」→ 刪（研究稿唯一出處是 Noise Artists 一篇導覽，「常被」不成立，屬單源評價）。
  - `desc2:The Fur.|Town`：「這張也入圍了第 30 屆金曲獎最佳新人獎。」→ 刪（研究稿自註單一來源中文維基，獎項未交叉驗證；且最佳新人是頒給藝人而非專輯）。
- **14316**　Oki 鉤子「後來才得知自己有阿伊努血統」出處日文維基即無時點，照原句保留，不補臆測時點。小沢健二「Oricon 最高第 7 名」是銷售榜，非媒體年終榜，保留。
- **14317**　其餘 8 張逐張審過，未改字。
- **14318**　試聽：7 ready／4 unavailable（Dry & Heavy、신해경、Oki Dub Ainu Band、LITTLE TEMPO：Apple jp／us／kr／tw 以藝人目錄逐盤核對均無對得上 MB 曲目的條目；Oki 的 Apple《Dub Ainu Deluxe》2006-12-03 同日但 8 首曲名全不同，不硬配）。封面：6 張 CAA、2 張 Apple 官方圖（Polaris《Home》、小沢健二《Eclectic》）、3 張 Discogs（Dry & Heavy CAA 500、신해경、LITTLE TEMPO），縮圖表目視全數與盤名相符。冷門軸全批照 §0.8 錨點制人工評（`ratings-override.json`）。
