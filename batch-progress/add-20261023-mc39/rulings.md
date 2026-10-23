# add-20261023-mc39 裁定（情緒薄格策展線・冷冽：自由爵士管樂獨奏與二重奏＋管樂／打擊輕編制）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 11 輪，本工作階段負責 ml52、mc39（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc39 列；可擴寫：mc31 AACM／loft 小編制剩餘、mc22 原聲小編制），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc39.json`（54）→ 主線汰 0（`master-override-mc39.json` 空）→ `master-mc39.json`（MB 回查 54/54 釘住、人工 0；flag 2 見下）→ `pick.json`（45，候補 9）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc39-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 20681–20690、b 20691–20700、c 20701–20710、d 20711–20720、e 20721–20730、鉤子 20731–20740、寫作 20741–20750、主線 20751–20760。**
---

## 主線策展（不佔條號）
- 策展 54（管樂獨奏 22、無鼓二重奏＋少數室內三重奏 24、管樂＋打擊輕編制 8）；moodGuess x 3.3–3.8、y −1.0～+0.1、z −1.8～−1.0。策展端已剔除約 30 張現場盤；去重 seed 與所有 curation-*.json 0 撞。
- **候補 9（不入 pick）**：Steve Lacy《Straws》《Hocus Pocus》（池中 Lacy 獨奏 x 3.0–3.2 貼線、主題有輪廓）、Butcher／Durrant／Lee《Intentions》（安靜段多，x 貼邊）、Roscoe Mitchell《Solo [3]》（2 首現場＋長笛段偏靜；池中 Mitchell x 3.0–3.2）、Vandermark《Furniture Music》（5 首現場）、Brötzmann《14 Love Poems》（Lonely Woman 主題旋律清楚，z 風險）、Gustafsson／Guy／Lovens《Mouth Eating Trees》（低音提琴＋鼓，y 風險）、Wadada & Moholo《Ancestors》（鼓推力強）、Voigt & Braxton《Kol Nidre》（拉格泰姆末曲）。
- **MB flag**：Lacy《Hocus Pocus》MB rg 日期為 2008 再版（已移候補）；McPhee & Heward《Voices》MB 無日期，策展 2008，研究層核對。
- 研究層請核：Braxton／Larner（Crowell Concert Hall）、Parker／Lewis（Art Workers' Guild）、Butcher／Graewe（Akademie der Künste）是否公開演出；Mitchell《Sound Songs》、Butcher／Minton《Apples of Gomorrah》部分曲目現場的比例。

## 研究 e 組
- 20721：9 張全為錄音室錄音（Discogs 記事／評述可證），無現場、無多軌疊錄；Fuchs《So - und? So!》為 FMP 錄音室單人獨奏（1985-06-15–17）。
- 20722：Perelman／Mahall《Kindred Spirits》策展層寫「雙簧管」為誤植，實為次中音薩克斯風＋低音單簧管；寫作層勿寫雙簧管。
- 20723：Perelman／Shipp《Art of the Duet》《Callas》評述皆指克制安靜、非尖叫轟炸；《Corpo》動態大（耳語、抒情、稀疏段、尖鳴並存）；moodGuess 存疑：x 恐偏低（Art of the Duet、Callas 明顯，Corpo 部分）。Callas z 也可能偏暖。
- 20724：Wadada Smith／Golia／Turetzky《Prataksis》評述「安靜的傑作、通透」，木質管樂（杜杜克、英國管、篠笛）偏暖；moodGuess 存疑：x 偏低、z 恐不夠冷。
- 20725：Perelman／Maneri《Two Men Walking》兩線同步纏繞、未見尖叫描述；moodGuess 存疑：x 或偏低。微分音未取得來源，不寫。
- 20726：Vandermark《Collected Fiction》評述含兇猛、bop、很克制三種；moodGuess 存疑：x、z 皆可能偏離。錄音師 Bob Weston 僅出自搜尋摘要（AAJ 403），不寫；Discogs 第 2-7 與 2-11 同名〈Torus IV〉疑為登錄錯誤；「少量作曲主題」無來源。
- 20727：Rothenberg／Feldman／Courvoisier《In Cahoots》錄音室（Studio Lulu）、全即興、無鼓無貝斯；細線室內樂，moodGuess 存疑：x 恐偏低。
- 20728：Fuchs 出生資料只有 Squid's Ear 摘要一處（頁面 403），status 標 thin；本盤無直接評述，聲音為樂器與同人另一張 FMP 專輯評述的間接推論。

## 研究 d 組（20711–20720）
- **20711**　McPhee & Heward《Voices》：Discogs／Mode 官頁皆 2008（MB rg 無日期），年份照策展；錄音 2006-06-15/16 The Pines, Montreal，錄音室二重奏、非現場。moodGuess 存疑：樂評一致形容飄、空靈、克制、氣音與輕敲（卡林巴、水碗），僅第三段強力對話，躁度可能不到 x 3.0，屬稀疏留白型；請主線聽感評分，必要時汰換。薩克斯風種類 Mode 寫中音、Free Jazz Blog 寫高音，facts 採中音。
- **20712**　Gustafsson《Parrot Fish Eye》：推翻策展 scene：前 8 首是對打擊樂（Zerang）二重奏、後 5 首與低音單簧管＋吉他／手風琴／打擊三重奏，並非無鼓純管樂二重奏；moodGuess 存疑（有打擊推進、音色層次多）。錄音室（Sparrow Sound, 1994-10）非現場。樂評原文全無，status thin。
- **20713**　Gustafsson《Impropositions》：1996-06 斯德哥爾摩 Radiohuset Studio 2 雙軌錄音，非現場；樂器含 alto flute／flageolet／fluteophone，並非全薩克斯風尖嘯。不得寫『無疊錄』（記事只寫 20-bit two track）。樂評原文全無，status thin，聲音預估無法證實。
- **20714**　Gustafsson & Guy《Frogging》：Maya 官網證實 1997-06-19 AirWave Studios 錄音室一個下午，非現場（前一晚 WNUR 電台現場是另一場）。樂評：身體感強、緊張、不吵、無旋律主題；與預估大致相符，y（輕）取決低音提琴低頻份量，輕度存疑。
- **20715**　Rothenberg《Trials of the Argo》：1980–81 紐約錄音室，單人中音薩克斯風，記事明寫原聲即時、無磁帶／電子加工；兩首各約 20 分鐘長篇。樂評無，status thin，緊繃或留白無從驗證。
- **20716**　Rothenberg《Trespass》：推翻策展層：Discogs 無尺八，但多列 John Zorn（中音薩克斯風）→ 至少部分為二重奏而非純獨奏；moodGuess 存疑（獨奏假設與尺八假設皆不成立）。Zorn 出現在哪幾首未能確認。status thin。
- **20717**　Rothenberg《The Crux》：封底原文『direct to 2-track digital, no overdubbing』，可寫無疊錄；Brooklyn 錄音室非現場。moodGuess 輕度存疑：〈Maceo〉〈Epistrophical Notions〉致意放克／Monk 可能帶律動與旋律輪廓，尺八段（〈Sokaku Reibo〉11 分＋〈Do Omoi〉）約 1/3，躁度可能被拉低。
- **20718**　Rothenberg《Intervals》：雙 CD 19 首（尺八／單簧管／低音單簧管 11＋中音薩克斯風 8）約兩小時；2001 錄、2002 發行（Discogs／MB），官網寫 2001 為錄音年。moodGuess 存疑：曲名標〈Melody Won/Too〉、〈T.C.〉悼念曲；Ned 自述受尺八本曲靜默與空間啟發，稀疏留白型證據，躁度可能低於預估。
- **20719**　Rothenberg《World of Odd Harmonics》：全是單簧管與低音單簧管（無薩克斯風）；錄於 Academy of Arts and Letters，有無觀眾未證實，Discogs 無 Live，有 Edited／Mixed By，**不寫『無疊錄』**；樂評稱有穩定脈動、響亮有力段、結尾像合成器，並非稀疏留白，躁度成立但音色未必尖細。
- **20720**　預留未用。本組 WebSearch 用 3 次（Odd Harmonics、Frogging、Voices）；AAJ、AllMusic、Squidco、Discogs 網頁均 403，引言多轉自 Mode／Maya／Ned 官網，非原文。

## 研究 b 組（20691–20700）
- **20691**　Parker／Stevens《Corner to Corner》：1993-06-08 Angel Studio 錄音室、直錄 U-Matic 母帶，非現場；推翻策展層：Stevens 1994-09-13 辭世，距錄音約一年多（策展寫「兩年」），且 Discogs 只寫 direct to U-Matic、未寫雙軌。Stevens 兼吹小號（Discogs 稱 trumpet、Waxman 稱 cornet）。moodGuess 存疑：整套鼓組在打、曲子偏短、鼓「更鈍更尖」，y 可能比預估更動。
- **20692**　Parker／Rothenberg《Monkey Puzzle》：推翻策展層：沒有雙簧管，Rothenberg 吹低音單簧管＋中音薩克斯風；錄音室（Gateway Studio，1997-05-17），Cafe OTO 稱 studio live，無聽眾證據。moodGuess 存疑：低音單簧管與次中音偏厚，尖細感弱。曲名是英國謎題填字出題者筆名（Ximenes、Araucaria、Afrit 等，維基交叉證實；Custos 未證）。無專門樂評，status thin。Gateway Studio 地點查不到不寫。
- **20693**　Parker／Shipp《Abbey Road Duos》：2006-07-19 Abbey Road Studios 錄音室，非現場。策展寫「中音組曲」：曲名確實印 Alto Suite，但兩位樂評稱 soprano suite，Discogs 樂器欄只有 tenor／soprano，曲名與樂器對不上，facts 照曲名寫並以樂評說法描述。moodGuess 存疑：次中音組曲有鋼琴「節拍器般重擊」，整體沉暗、靜默多，偏重與留白而非尖細。
- **20694**　Parker／McPhee《Chicago Tenor Duets》：1998-05-11 Airwave Studio 錄音室、2002 Okka Disk 首發（策展 2002 正確）；Dusty Groove 的 Chicago Cultural Center 現場文案屬 2003 年《Sweet Nothings》，不可混入。moodGuess 存疑：Taylor 稱「最線性、最抒情」，Litweiler 稱有「漫遊」段落，兩支次中音偏低偏厚，非尖細緊繃。
- **20695**　Tchicai／Parker《Clapham Duos》：2005-05-18 Sonic Studio Clapham 錄音室，非現場；發行年各源不一（MB 2015-12、Soundohm 2016、Bandcamp 2023-09-26 疑數位版），照卡單 2015。零售商稱九首，Discogs／Bandcamp 皆八首，採八首。Tchicai 2012 辭世，專輯為身後發行。moodGuess 存疑：商品說明稱「內省又愉快」，Tchicai 兼低音單簧管，音色與句子比預估柔。
- **20696**　Mitchell《L-R-G / The Maze / S II Examples》：1978 Nessa，三件作品分別在 Van Gelder 錄音室、Columbia（CBS 30th Street）、Streeterville Studios 錄音，皆非公開演出；〈The Maze〉為八位打擊樂手一次錄成。moodGuess 存疑：非單人獨奏，是管樂銅管三重奏（含低音銅管）＋八人打擊＋單人高音薩克斯風三種質地，是有結構的作品而非純自由爵士。AllMusic 星等取自維基整理，未直接核對原頁。
- **20697**　Mitchell《Sound Songs》：雙 CD 26 首約 122 分鐘，三首標明現場（Full Frontal Saxophone、Near And Far、Closer，約 37 分鐘，約三成）；moodGuess 存疑：含現場、含打擊與竹製薩克斯風、長度鬆散。AllMusic 錄音地點（Hot House、Riverside Studio、威斯康辛大學）來自搜尋摘要，原頁 403，未逐曲對應。Clouds and Clocks 的「first overdub」指《Solo [3]》而非本盤；疊錄與否查不到。status thin（7 條）。
- **20698**　Mitchell／Aoki《First Look: Chicago Duos》：Sparrow Sound Design 錄音室三天（Discogs 末日 2004-02-14，維基 2004-02-12，facts 並列），非現場；無鼓。moodGuess 存疑：Kelman 說「很少變得刺耳」，兼長笛與鈴、風鈴，動態範圍寬，較預估溫和。
- **20699**　Mitchell《Duets with Tyshawn Sorey and Special Guest Hugh Ragin》：推翻策展層：名為二重奏實為三人（Ragin 為來賓、部分曲目三人共同署名）；Sorey 維基列為鼓，策展寫鋼琴與打擊，樂器欄 Discogs 註明「未列入」，facts 並列；製作人維基寫 Steve Lake、Discogs 寫 Gregory Howe，衝突故不寫。Wide Hive 錄音室，非現場。moodGuess 存疑：AllMusic 稱「耐心、破碎、漂浮」、「比攻擊性更多的是玩心」，有鼓，偏柔和稀疏。
- **20700**　預留未用。本組 WebSearch 共用 7 次（超出 3 次上限：Corner、L-R-G、Abbey Road、Monkey Puzzle、Chicago Tenor、Clapham、Sound Songs），之後改用 WebFetch／API；AAJ、AllMusic、Discogs 網頁、Delmark 官頁均 403／404。無重大推翻年份／廠牌。

## 研究 a 組（20681–20690）
- **20681**　Braxton《Saxophone Improvisations, Series F.》：身分吻合（America 1972，Studio Decca 巴黎錄音室，非現場）；Discogs 與 Wikipedia 只寫 saxophone，未指中音，facts 不寫『中音』；Penguin／Rolling Stone 星等兩處轉述互相矛盾，不寫星等。聲音無直接樂評佐證形容詞（AllMusic／AAJ 403），無矛盾。
- **20682**　Braxton《Alto Saxophone Improvisations 1979》：身分吻合；moodGuess 存疑（旋律辨識度）：含〈Red Top〉〈Along Came Betty〉〈Giant Steps〉三首標準曲約 20 分半（佔約四分之一），策展層『被拆成碎片』找不到來源證實；z 若評分偏暖可汰。Big Apple 錄音室，非現場。
- **20683**　Braxton／Lindberg《Six Duets (1982)》：身分吻合（Cecma 1005，Natali Sound Studios 佛羅倫斯，錄音室）；Discogs 末曲 6N 與 Wikipedia 末曲 No. 52 出入，facts 只列兩邊一致的編號；CD 再版加的兩段〈Four〉不屬原版 LP。『鋸齒主題』未證實。
- **20684**　Braxton／Larner《11 Compositions (Duo) 1995》：推翻策展層 curatorRisk 的未定：Wikipedia 稱 live album（1995-03-24 Crowell Concert Hall 音樂會），moodGuess 存疑（現場），建議主線汰換或降級；Loewy 評語為『精心編排』『略歪斜的 bop 感』，非純無調。Larner 國籍僅 Discogs 單一來源，不寫。
- **20685**　Stevens & Parker《The Longest Night, Vol. 1》：身分吻合；Discogs／Bandcamp 只寫錄於 Riverside Studios（倫敦展演場地），現場與否未證實，主線聽過再定；Jazzword 稱 Stevens『低調脆弱、音量克制』，與 y 偏輕相符，鼓為小件打擊與鈸鏈鈴，與『小鼓組碎拍』大致吻合。
- **20686**　Stevens & Parker《The Longest Night, Vol. 2》：推翻策展層『五段更短更密』：五首前三首 5–6 分，後兩首 10–12 分，並非整體更短；其餘同 Vol. 1。曲名時刻（21.25–23.40）是否鐘點來源未明寫，寫作層只寫『曲名是時刻』。
- **20687**　Parker／Lewis《From Saxophone & Trombone》：推翻策展層『乾冷』：錄於 Art Workers' Guild（喬治亞式大廳，挑高硬木地板、殘響長而亮），Wikipedia 稱 live duo album，Cafe Oto 未言有無觀眾。moodGuess 存疑（現場、殘響、z）。Cafe Oto 稱原版 LP 切錯轉速，曲長有出入，facts 僅寫約略長短。
- **20688**　Parker & Guy《Incision》：身分吻合（FMP SAJ-35，1981-03-14／15 柏林）；MB rg 端點讀取為空，但 release 清單對得上；Wikipedia 的 Parker 條目寫 1980，其餘來源皆 1981，採 1981。錄音性質（錄音室或現場）查無明文，不寫進 facts；策展層 y 0 偏高，要聽才知道。
- **20689**　Parker & Guy《Obliquities》：身分吻合（Maya MCD9501，Gateway Studio 錄音室，非現場）；錄音日 12 月 2 日（Parker 本人）與冊子 12 月 3 日有出入；Lake 內頁以『舞動、呼吸』描述互動，與策展層『緊、乾、無調』有落差，moodGuess 輕度存疑（z）。
- **20690**　預留未用。WebSearch 實用 7 次（超出每支 3 次上限，原因：多數卡需查現場與否與聲音，Discogs／AllMusic／AAJ 網頁 403 只能靠搜尋摘要）；引言多轉自 Wikipedia 與 Cafe Oto、Maya、Jazzword 頁面。

## 研究 c 組（20701–20710）
- **20701**　Brötzmann《Solo》：Discogs 記事「Recorded in Berlin, May 1976」、錄音 Jost Gebers，無觀眾字樣，判為錄音室獨奏、非現場；〈Piece For Two Clarinets〉是否疊錄查無來源，未寫。曲名典故（馬雅可夫斯基）無來源，未入 facts。moodGuess 無不符（y 可能 +0.3）。
- **20702**　Brötzmann《No Nothing》：FMP-Studio Berlin 1990-12-14／15 兩天，錄音室確定；AllMusic 標 1990-08，採 Discogs／MB 的 1991。樂器欄僅 JMA 單一來源（取自搜尋摘要）。moodGuess 無不符。
- **20703**　Brötzmann《Nothing to Say…》：1994-11-15／16 柏林，無觀眾字樣；樂器、聲音、是否疊錄查無來源，thin；moodGuess 存疑（未驗證，非證偽）。王爾德連結僅副標，曲名是否取自《瑞丁監獄之歌》查無來源，未寫。
- **20704**　Brötzmann《Solo - Right as Rain》：2000-08-19／20 柏林；獻給 6 月 21 日去世的 Werner Lüdi（de.wikipedia）。thin。moodGuess 存疑：用低音薩克斯風、低音單簧管，聲音可能比預估厚重（y 偏 +0.3 以上）。
- **20705**　Butcher《Invisible Ear》：Discogs 明載近距收音／擴大回授／多軌疊錄，另有 Korg 合成器；Butcher 站稱〈What remains〉疊五支次中音＋三支高音。moodGuess 存疑：疊錄＋合成器的曲子可能偏厚、偏電子，非純尖細。錄音室、非現場（第 12 首 1999 明斯特場合不明）。
- **20706**　Butcher／Minton《Apples of Gomorrah》：錄音全為 1999（tr1–12 Gateway Studio、tr13 LMC Sound、tr14–17 Red Rose，約 8 分 39 秒、佔不到兩成；Red Rose 是否公開演出查無來源，Butcher 站稱混有 studio 與 live 素材）。moodGuess 存疑：Penguin Guide 稱「出乎意料地浪漫」、AAJ 稱〈Wormleaf〉有靜止感，非全程尖刺；發行 2002（Discogs 4 月、MB 5 月）。
- **20707**　Butcher／Graewe《Light's View》：柏林藝術學院 1998-04-11，工程為 FMP 的 Gebers／Scheuermann，倫敦 LMC Sound 混音；是否公開演出查無來源（無觀眾、無 Live 字樣，也無反證）。thin。moodGuess 存疑（現場可能、密度與旋律性未驗）。
- **20708**　Butcher／van der Schyff《Points, Snags And Windings》：Blue Wave Studio（溫哥華）錄音室，日期「7/2/00」讀法不明故只寫 2000 年；僅 6 條 facts（來源單薄）。moodGuess 存疑：63 分鐘、多首 6–9 分鐘，非短曲急停；打擊是否碎拍未驗。
- **20709**　McPhee《Tenor》：維基標「live solo」，Soundohm 描述為晚飯後在大提琴家農舍的即興 recital（非正式、非音樂會），判為私人場合現場獨奏。Discogs 另列 Ntshoko（鼓）與 Snyder（合成器、人聲），與維基「唯一人員 McPhee」相左，疑為 Discogs 誤植，建議核對封底。moodGuess 存疑：〈Knox〉〈Good-Bye Tom B.〉抒情有輪廓、〈Tenor〉23 分鐘長篇無主題。
- **20710**　預留未用。本組 WebSearch 用 3 次（McPhee Tenor、Brötzmann No Nothing、Brötzmann Solo）；AllMusic、Discogs 網頁、JMA、Squidco 皆 403，Wikipedia 專輯條目多不存在，改用 Discogs／MB API、Butcher 官網、Soundohm、de.wikipedia。

## 主線：研究後汰換（不佔條號）
- 研究層聲音／錄音場合與 moodGuess 不符，直接汰 17（卡單、研究稿、`pick.json` 同步移除，45 → 28）：
  - 現場或音樂會（mc28 先例）：Braxton／Larner《11 Compositions (Duo) 1995》（Crowell Concert Hall 音樂會，維基列現場）、Parker／Lewis《From Saxophone & Trombone》（維基 live duo、會館殘響長）、Mitchell《Sound Songs》（三首現場約三成）、Butcher／Minton《Apples of Gomorrah》（混 live 素材、樂評「出乎意料地浪漫」）、McPhee《Tenor》（農舍私人場合現場、抒情段）。
  - 留白安靜／克制（判靜，mc31 留白型 x 3.0–3.1 已是下緣）：Tchicai & Parker《Clapham Duos》（內省愉快）、Mitchell／Aoki《First Look》（很少刺耳）、Mitchell《Duets with Sorey》（柔和稀疏）、McPhee & Heward《Voices》（飄、空靈、氣音與水碗）、Rothenberg《Intervals》（尺八本曲式靜默、〈Melody Won〉）、Perelman／Shipp《The Art of the Duet》《Callas》（克制、安靜、歌唱性）、Smith／Golia／Turetzky《Prataksis》（「安靜的傑作」、杜杜克與英國管偏暖）。
  - 疊錄／低音管厚（判重）：Brötzmann《Solo - Right as Rain》（低音薩克斯風＋低音單簧管）、Butcher《Invisible Ear》（八支薩克斯風疊錄＋合成器）。
  - 旋律／標準曲（判暖）：Braxton《Alto Saxophone Improvisations 1979》（三首標準曲約四分之一）、Vandermark et al.《Collected Fiction》（bop 與作曲主題）。
- 候補 9 都是同型風險（Lacy 主題輪廓、留白、現場、鼓推進、低音厚），不補位；照實上架 28。
- 留下但存疑、交評分裁定：Stevens & Parker《Corner to Corner》（整套鼓組）、Parker／Rothenberg《Monkey Puzzle》（低音單簧管）、Parker／Shipp《Abbey Road Duos》（留白）、Parker／McPhee《Chicago Tenor Duets》（線性抒情）、Gustafsson《Parrot Fish Eye》（前 8 首對打擊、後 5 首三重奏，推翻策展「無鼓二重奏」）、Rothenberg《Trespass》（含 Zorn 二重奏，推翻「純獨奏＋尺八」）、Rothenberg《World of Odd Harmonics》（全單簧管）、Perelman／Mahall《Kindred Spirits》（低音單簧管，推翻策展「雙簧管」）、《Corpo》（動態大）。
- 研究推翻照研究稿：Stevens 1994 辭世距錄音約一年多（非兩年）、Monkey Puzzle 無雙簧管、Abbey Road Duos 第二組實為高音薩克斯風組曲、Incision 年份 1981（維基 1980 不採）；McPhee《Voices》MB 無日期 flag 隨汰換結案。

## 鉤子層（a、b、c）
- **20731**　交件：`desc-tools/batches/hooks/add-20261023-mc39-hooks-a.json`（6）、`-b.json`（5）、`-c.json`（5），key 與順序照研究稿。預算公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆預算（hook 加權）：a1 229（22.5）、a2 208（24）、a3 224（21）、a4 230（20）、a5 226（20.5）、a6 223（19）；b1 230（24）、b2 166／thin 170（20）、b3 214（21）、b4 222（21）、b5 223（23）；c1 220（23）、c2 226（21.5）、c3 164／thin（21）、c4 170／thin（22）、c5 157／thin（19.5）。hook 原始字元 19–29。初稿 16 張全數超標，整格捨去：a1 聲音格、a3 錄音師與聲音格、a4 前三首曲長、a6 聲音格、b1 Angel Studio 與 Incus、b2 錄音師與錄音日、b3 錄音師與聲音格、b4 樂評格、b5 〈L-R-G〉〈S II〉聲音格、c1 Gebers 與樂器格、c2 製作錄音欄、c4 FMP 錄音師與 LMC 混音、c5 錄音師與曲長。壓完回核 hook 依賴格：全部在 g1／g2（a4 的收尾在 g3，已在 note 標「hook 的收尾」）。
- **20732**　骨架歸屬（16 張 16 條，各張 note 只寫自己的歸屬句）：a1＝前作方法的續篇（繼《For Alto》）；a2＝管樂手換三件樂器對單一低音提琴；a3＝一夜連錄、曲名即時刻；a4＝同一晚的後半段（時間差裡語彙變了）；a5＝二重奏催生三重奏；a6＝兩把琴配兩支管的分工；b1＝相隔十七年重錄＋搭檔身後發行（Stevens 1994-09 辭世、1995 發行，屬作品綁定，標時序克制）；b2＝曲名藏填字謎出題者；b3＝流行樂名棚（Abbey Road）；b4＝錄完擱四年才發；b5＝製作人長期籌備（每週末登門一年多）；c1＝獨奏系列的起點；c2＝廠牌自家錄音室；c3＝獻給文學家的組曲；c4＝物理學博士轉行；c5＝樂手兼做母帶。「無伴奏」「沒有鼓」「同一夜」「一人包辦」只留在 c1 hook 一處（掃描器關鍵詞）。
- **20733**　「他／她」引入法配表（Evan Parker 跨 8 張）：a3 生年與出生地（1944 布里斯托）／a4 作曲欄／a5 封面設計欄／a6 外人之口（Steve Lake）／b1 樂器（對面是高音薩克斯風手）／b2 由搭檔帶出（對上 Parker 的高音與次中音）／b3 身分（英國薩克斯風手，跨大西洋）／b4 名字直接領句。Stevens（a3 身分＝SME 創團鼓手之一、a4 作曲欄、b1 出生地 Brentford）；Brötzmann（c1 綽號 Machine Gun＋生年地、c2 造詞 brötzen、c3 美術學校出身的身分）；Butcher（c4 布萊頓出生＋物理博士、c5 由鼓手帶出）；Braxton（a1「只有」一人、a2 名字直接）；Guy（a5 樂器、a6 外人之口）。Rothenberg 在 b2 用掉「1956 年生於波士頓」、Shipp 在 b3 用掉「美國鋼琴家」，d、e 組勿再用同一引入法。
- **20734**　第二句句型配表（16 張各一種）：a1「只有」／a2 編制（這是…二重奏）／a3「由…」／a4 作曲欄（作曲欄寫的是…）／a5 封面（…自己做了封面設計）／a6 外人之口（Lake 說…）／b1 出生地（…出生的鼓手）／b2 生年（1956 年生於…）／b3 身分並列（英國…與美國…）／b4 名字直接（X 與 Y 都只吹…）／b5 生年與出生地（1940 年生於芝加哥的…）／c1 綽號（人稱「Machine Gun」的…）／c2 造詞（…多出「brötzen」一詞）／c3 身分（美術學校出身…）／c4「對面」／c5 國籍（加拿大鼓手…）。日期「日」後一字：a1 日在、a2 日於、b1 日直、b2 只寫到月、b3 日進、b4 日錄、c4 日柏；其餘只寫到年或月；與 d、e 已用的 日下／日三／日上 不撞。媒體名與媒體榜單名次一律不進 note（評語只寫「樂評」）；星等全數不帶。
- **20735**　n-gram 自查（中文 4-gram，專名與樂器名不算）：hook 對 hook 0（僅樂器「低音提琴」「薩克斯風」）；hook 對全批 note 0（已改掉 a4h～a6n「的語彙已」、a5h～b4n「張二重奏」、e1h～b4n「人第一次」、a3／b5 自身 hook-note 重複）；hook 與自己 note 無逐字重複句。`node qa-batch.mjs hooks add-20261023-mc39`：全部通過；`node chk-hook-crossgroup.mjs add-20261023-mc39`（5 組 28 張）：全部通過，只報不擋 1 筆（b4「沒有其他樂手」屬內容）。

## 鉤子層（d、e）
- **20736**　交件：`desc-tools/batches/hooks/add-20261023-mc39-hooks-d.json`（7）、`-hooks-e.json`（5），key 逐字照研究稿、順序不變（研究稿已依主線汰換）。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin：Parrot Fish Eye、Impropositions、Trials of the Argo、Trespass、So - und? So!）。逐筆（預算／hook 加權／hook 原始字元）：d1 Parrot Fish Eye 151／20／20（thin）、d2 Impropositions 170／23.5／25（thin）、d3 Trials of the Argo 160／28／30（thin）、d4 Trespass 169／24／29（thin）、d5 The Crux 224／19.5／22、d6 World of Odd Harmonics 215／25.5／28、d7 Frogging 229／20／20、e1 In Cahoots 229／22／22、e2 Corpo 229／21／21、e3 Two Men Walking 224／16／16、e4 Kindred Spirits 221／17／17、e5 So - und? So! 170／24.5／30（thin）。初稿 12 張全超標，整格捨去：Parrot 的 O'Rourke／Coleman 人名與 Corbett 製作、Impropositions 的錄音日、Millroth 文章、樂器細目與曲長細目、Trials 的 B 面曲名與錄音室名、Trespass 的錄音工程師與〈Caeneus〉、Crux 的錄音日、New Winds 與副標、Odd Harmonics 的 Silas Brown 錄混與〈Odd Not Odd?〉的比附、Frogging 的 Guy 生年與 LJCO（a5 已用 LJCO）、WNUR 電台訪談、Alan Davie 封面、In Cahoots 的同名曲長與國別、Corpo 的歷年合作盤、Two Men Walking 的 5 歲學琴與後續合作、Kindred 的 Perelman 19 歲專注次中音、Fuchs 的樂器全列（hook 已帶）。壓完回核 hook 依賴：d1 芝加哥打擊樂手 g2、d2 精裝書 g1（初稿在 g4，已前移）、d3 兩面曲長 g2、d5 Monk g1／尺八名家 g2、d6 單簧管 g1、d7 五支管樂器 g2、e1 首度同錄 g2（初稿缺，已補）、e3 父親 g1、e4 一高一低 g2；d4 Zorn、d7 蛙學名、e2 封面合影、e5 樂器範圍為 hook 自帶事實（d4 note 指定 Zorn 只寫成演奏者欄上的名字，不分配曲目）。媒體名、樂評人名、星等與媒體評語（Crux「最重要的作品之一」、Frogging「比 Parker 更辛辣」）一律不進 note；聲音描述寫成「樂評聽出／評論寫到／樂評形容」，廠牌文案寫成「廠牌說」。Crux 的尺八家照原文漢字寫横山勝也、山口五郎。
- **20737**　骨架歸屬（12 張 12 條；只有擁有者寫歸屬句）：d1＝前半二重奏、後半三重奏的兩段編制（Okka Disk 只當事實帶「他在該廠的第一張」，b4 的 Okka 只寫發行）；d2＝隨書出版的 CD；d3＝兩面各一首長篇、全即時原聲；d4＝名家同行列在演奏者欄；d5＝題獻曲名單（Monk、Maceo Parker、兩位尺八家；b4 的「題獻一隻貓」屬其「擱四年」骨架下的一格，不衝突）；d6＝整張只用單簧管家族；d7＝蛙學名當曲名的主題概念盤（a1 編碼曲名、a3 時刻曲名、b2 填字謎筆名同屬曲名題材，但各自骨架不同，d7 是唯一以專輯名雙關成概念的）；e1＝三種來路的三人首度同錄；e2＝封面與宣傳照的視覺包裝；e3＝父子兩代（薩克斯風手之子拉中提琴）；e4＝一高一低的音域對置；e5＝一人輪換五種聲源的短曲集（曲名＝樂器縮寫只當一格，避開與 d7 同為曲名骨架）。hook 四型：懸疑 d1、d5、e3、e4（d1 g1 具名 Gustafsson、g2 具名 Zerang；d5 g2 收尺八家；e3 g1 收 Joe Maneri；e4 g1／g2 收兩件樂器）／斷言 d4、d6、d7、e5／場景 d2、d3、e1／人物定調 e2。
- **20738**　「他／她」引入法配表：**Rothenberg ×6**（含 b2）——b2 生年與出生地（a–c 已用）、d3 年齡（錄音時二十多歲）、d4 時間領句帶樂器、d5 學歷（Oberlin）、d6 錄音地點領句、e1 分工（管樂歸他，尺八在內）；「1956／波士頓」只在 b2。**Gustafsson ×3**——d1「來自」瑞典 Umeå、d2 團籍（1988 加入 Gush）、d7 只帶國別「瑞典的」。**Perelman ×3**——e2 原籍巴西、e3 只帶樂器、e4 只帶名字。**Barry Guy**（a5、a6 也有）：d7 只帶廠牌關係（與妻子經營 Maya Recordings）並寫「貝斯手」，避開 a 組「低音提琴手」。**Shipp**（b3 用掉「美國鋼琴家」）：e2 寫「鋼琴手」。**Courvoisier／Feldman**（mc38 已上架用過洛桑音樂院、納許維爾經歷）：e1 只用夫妻關係與分工。第二句句型（12 種）：「來自」／團籍／年齡／時間／學歷／錄音地點／廠牌關係／分工／原籍／親屬／學習路徑／創團；與 a–c 的 16 種（只有／編制／由／作曲欄／封面／外人之口／出生地／生年／身分並列／名字直接／生年與出生地／綽號／造詞／身分／對面／國籍）不撞（初稿 d4 樂器撞 b2、d6 名字直接撞 b4、d7 生年與出生地撞 b5、e2 國籍撞 c5、e4 出生地撞 b1，已改）。
- **20739**　自查：「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：d7 日下、e1 日三、e2 日上；d6「14、15 日」、d2／e5 只到月，不命中尺；與 a–c（在／於／直／進／錄／柏）不撞。開頭前四字 12 張互異，並對 hooks 目錄全部既有檔比對：初稿 d3「一支中音」撞 mc31、「兩面各一」撞 md6 等、d4「演奏者欄」撞 c191、d5「題獻對象」撞 ml11、d7「九首曲名」撞 md1 等，皆已改。hook 之間 4-gram（全批 28 張）只剩樂器名「薩克斯風」「低音提琴」與 a–c 內部的「曲名多半」（b2×c）；初稿 d1×d2「只有一位」、d1×b5「打擊樂手」、e4×e5「低音單簧」、d2×e3「克斯風手」已改。hook 對他卡 note：初稿 d6h×d1n「再加低音」、e5h×d5n「一人輪吹」、d4h×d5n「吹中音薩」、e1h×e3n「進錄音室」、e3h×c2n「的是薩克」已改，剩樂器動詞「吹薩克斯」（e3 hook）。d、e 自家 note 之間另拆「曲名就是」（×a3）、「年由發行」、「發行獻給」（×b4）、「最長的分秒」（×c）、「在柏林錄」、「樂評聽到」×3、「在布魯克」×4、「的錄音室」×3。hook 與自己 note 無逐字重複句。Corpo「沒有重錄」改正面「每段只錄一遍」。
- **20740**　腳本：`node qa-batch.mjs hooks add-20261023-mc39`：全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-mc39`（5 組 28 張）：全部通過 ✓（hook 加權 16–28、note 157–237；只報不擋 1 筆為 b4，屬內容）。輔助腳本：`/tmp/claude-0/-home-user-dip-vinyl-shop/52409e6f-bad3-51b0-88fd-9ac854278cd4/scratchpad/hook-mc39-de/mc39-de-chk.mjs`。
