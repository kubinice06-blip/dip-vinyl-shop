# add-20261023-mc28 裁定（情緒薄格策展線・冷冽：歐陸自由即興＋mc34 日本前衛即興）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 6 輪，本工作階段負責 ml32、mc28。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc28 列，可擴寫 mc34），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc28.json`（44 張）→ `master-mc28.json`（MB 回查 44/44 釘住）→ 主線汰 5（`master-override-mc28.json`）→ `pick.json`（39）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc28-cards.json`（39 張；研究 a–d 各 8、e 7）。身分：MB 釘住 39、§1 人工 0。
> **預留：研究 a 13161–13170、b 13171–13180、c 13181–13190、d 13191–13200、e 13201–13210、鉤子 13211–13220、寫作 13221–13230、主線 13231–13240。**
---

## 主線策展（不佔條號）
- 策展 44 張（Incus 系 20、FMP／Intakt 系 12、ICP 系小編制 6、日本音響派 6）；主場景 38、擴寫 mc34 6。WebSearch 0 次。
- **ICP Orchestra 與 Globe Unity 一張都沒收**：ICP Orchestra 的盤不是 MB 標現場，就是 Monk／Ellington 改編旋律清楚（往暖落雀躍）或大合奏太厚（落暴躁，池中 Globe Unity 4.8,1.7）；主力改小編制 duo／solo。MB 標 Live 的盤一律不收（Mengelberg／Bennink 多張、阿部薫未入池盤、EPEAE 後兩張）。
- **主線汰 5**：
  - 讓給並行的 mc33（`origin/claude/mood-ml34-mc33` 的 `curation-mc33.json` 已提）：Ikue Mori《Hex Kitchen》《Garden》（鼓機電子，屬 glitch／microsound 場景正位）。
  - x 貼邊：Paul Rutherford / Paul Lovens（池中 Rutherford 獨奏 x 2.2 落平靜）、Sachiko M《Sine Wave Solo》（極靜正弦波，體感可能判靜）、Hans Reichel《Bonobo》（MB 只有 2017 重發，且與《Wichlinghauser Blues》同型 x／z 雙貼邊，留一張）。
- 年份取原盤年（MB 首發日為重發或誤植，build-master flags 5）：Bailey & Bennink《Han》1988、Company《Company 5》1978、《Fables》1980、Bailey《Lot 74》1974、Butcher《Thirteen Friendly Numbers》1992（MB 盤名《13 Friendly Numbers》）。
- 跨分支去重：對 origin 65 個 `claude/*` 分支與 main 的 seed 與卡單 0 撞。
- 研究層重點查：《Topography of the Lungs》、Tony Oxley 同名、Alterations 的密度與厚度（y）；Barry Guy、Léandre 低音提琴獨奏（y）；Company 4、SME、News From the Shed、King Übü、大友《Cathode》稀疏段（x）；Mengelberg、Schweizer 的 Monk／township 動機（z）。

## 研究 a 組
- **13161**：Bennink《Solo》Discogs 完整盤名《Solo – Voor Masje》（ICP 011，1974）；錄音 1971–72 在自家馬廄自錄。年份維持 MB／Discogs 的 1974，維基／scaruffi 的 1970／1972 不採。
- **13162**：Mengelberg《Impromptus》年份三源不一（MB 1989、Discogs 1990、維基 1994），錄音確定 1988-06-04 FMP 柏林錄音室。卡單 year 1989 沿用不動；寫作層建議寫「1988 年錄成」。status thin（找不到樂評，旋律／Monk 動機無法由文字確認，z 存疑留給主線）。
- **13163**：Bennink《Tempo Comodo》策展層「偶有單簧管尖嘯」Discogs 無單簧管署名（只登 Drums、Other Stuff），moodGuess 存疑，列報告；status thin。
- **13164**：《Han Bennink & Derek Bailey》1969-07-30 錄音室錄製、1971 出版；維基 Bennink 頁的 1972 與 scaruffi 的 1969 年份不採。
- **13165**：Bailey／Bennink《Han》Incus CD02，1988 原盤成立（維基 Incus 頁佐證 CD02），MB 1998 為誤植。**實質現場錄音**（1986-03 巡演，Part 1 為三場觀眾私錄），MB 未標 Live；依派工規則請主線決定汰留。
- **13166**：《Instant Composers Pool》是 ICP 002，不是策展層寫的「廠牌第一號」（ICP 001＝Bennink／Breuker《New Acoustic Swing Duo》）；寫作層不可寫第一號。推翻策展層 1 處。
- **13167**：《The Topography of the Lungs》Parker 並非全程高音：維基列 3 首次中音、3 首高音（單源）；寫作層寫「次中音與高音」。y 風險無來源可判。
- **13168**：Parker《Six of One》錄音 1980、發行 1982；維基稱 live，MB／Discogs 未標，地點是教堂，含殘響。不動，知會主線。

## 研究 d 組
- **13191**：Minton《A Doughnut in One Hand》身分成立（FMP CD 91、1998-06-11，錄於 1998-01 Welwyn Garden City 教友會聚會所）。encyclopedia.com 寫 1996 年「第一張個人專輯」與 Discogs／MB 1998 及 Jurek「第二張」矛盾，不採。Jurek 原文出處為 QQ 音樂頁轉載，只取事實不引原句。
- **13192**：Minton Quartet《Mouthfull Of Ecstasy》推翻策展層 moodGuess 一處：編制是人聲、鋼琴、薩克斯風、鼓（Minton／Weston／Butcher／Turner），**沒有小提琴**；有鼓且樂評形容「密集、吵鬧」，y 可能比 -0.4 更厚。棚錄（1996-01-04 倫敦）。針對專輯本身無樂評，聽感引自 2014 Café OTO 演出節目頁。
- **13193**：Schweizer《Hexensabbat》A 面為 1977-10-08 柏林現場（Discogs），B 面棚錄；維基只把〈Rapunzel〉算現場，範圍不一致，採 Discogs。MB 未標 Live，請主線決定。Scaruffi「folkish and oneiric」、Waxman「flowering European classicism」顯示非全程尖厲，x 3.9 存疑。
- **13194**：Schweizer《Piano Solo, Volume 1》1990-05-23/24 Boswil 老教堂錄、1992 發行。Penguin 稱有最輕樂句與「冥想般的靜止」，y 存疑；曲名含 Blues／Polka／Mazurka，z 把握不高。維基標 live、Scaruffi 暗示 Vol.1 是短小品，現場與否不確定。
- **13195**：Schweizer《Many and One Direction》1996-04-04 Boswil 錄；維基標 live，MB 未標。含 Carla Bley〈Ictus〉與 Monk〈Chordially〉兩首他人曲（旋律清楚），Loewy 說強度「調低一兩格」、Scaruffi 說失去龐克勁道，**moodGuess 明顯存疑（x 偏高、z 風險大於預估）**，建議主線降 x 或汰換。
- **13196**：Schweizer《Chicago Piano Solo》**現場錄音**（Empty Bottle 俱樂部），MB 未標 Live，請主線決定。錄音日期衝突：Intakt 官網與 Swissinfo 2000-02-16、Discogs 與維基 08-16，採 Intakt。Waxman 描述可哼唱的 Don Cherry 放克曲、Monk 味切分、swing，**moodGuess 存疑（z 偏冷把握低）**，建議汰換或下修。
- **13197**：Schweizer／Carl《The Very Centre of Middle Europe》Hat Hut 目錄號 X、1978；1978-10-28 巴塞爾劇院小舞台錄，Schweizer 作品年表標 live（MB 未標），請主線決定。Schweizer 在此**兼打鼓**，Carl 以單簧管、低音單簧管、手風琴為主（薩克斯風只是其一），推翻 moodGuess 「鋼琴音簇對薩克斯風尖嘯」的說法。無任何聲音樂評，status thin。
- **13198**：Lytton《The Inclined Stick》Po Torch 由 Lovens 與 Lytton 1976 合辦（Discogs），非 Lytton 單獨創辦。第二首為 1977-12-16 亞琛 Neue Galerie 現場，其餘 1979 年夏在 Lytton 比利時家中錄成；樂器為自製打擊與現場電子，非傳統鼓組。除 Scaruffi 兩句外無樂評，疏密與安靜段比重無依據，status thin。
- **13199**：本組 MB 標 Live 的卡 0 張；但實質含現場錄音者 5 張（Hexensabbat A 面、Piano Solo Vol.1 疑、Many and One 疑、Chicago、Very Centre，加 Lytton 一首），已逐張寫進 notes。Discogs／WebFetch 的 AllMusic、Squidco、jazzmusicarchives 一律 403，Discogs API 直連可用。
- WebSearch 本組共用 8 次（每支 ≤3）。

## 研究 e 組
- **13201**：Reichel《Wichlinghauser Blues》身分無誤（Discogs master 517789，FMP 0150，1973-11-23）。B2〈Abendlied〉是青年中心現場錄、其餘錄音室或自家錄；MB 未標 Live，整張算錄音室，不汰。z 存疑（滑稽、近似甘美朗與散拍的叮噹質地）留給主線。
- **13202**：Johansson《Schlingerland》樂評（All About Jazz、Quietus、Exclaim!）一致說「低調安靜、質地導向」，與 moodGuess x 3.6 明顯相反，列為 x 存疑建議降或汰。
- **13203**：King Übü《Binaurality》1992-06 柏林藝術學院東院錄音、1993 FMP CD 49；十位樂手；樂團做法是「聲音的點描」低音量，x 3.5 存疑，建議主線降 x 或汰。
- **13204**：Léandre《Les Douze Sons》推翻策展層「低音提琴＋人聲獨奏」：實為與 Barre Phillips、Bailey、Schweizer、Lewis、Reijseger、Nozati 的二、三重奏與人聲拼盤（含歌舞廳式橋段、一隻狗客串）。1983-06 Théâtre Dunois「Carte Noire」系列期間錄成，未能確認有無觀眾，MB 未標 Live。y、z、x 三軸皆存疑，建議複審。
- **13205**：大友《Cathode》推翻策展層「唱盤、吉他、薩克斯風」：Discogs 逐首名單為笙、正弦波、三味線、弦樂、準備鋼琴、人聲、口哨與電子，大友本人僅作曲、混音、剪輯、製作。頭尾兩首極小編制，x 有被判靜風險。
- **13206**：大友《Anode》策展層「十人」實為九位列名演奏者（六打擊＋杉本拓＋Sachiko M＋秋山徹次），「圖形指令」查無來源不寫。Olewnick 簡介稱「超安靜、處在聽覺邊緣」，與 x 3.6 方向相反，x 存疑建議降或汰（簡介內容取自搜尋摘要，原頁 403）。
- **13207**：吉田アミ《Tiger Thrush》日文名《虎鶫》，IMJ-504，2003-07，錄音 2003-01～03（Ftarri 英文頁內文寫 2002，採日文頁與頁首資料）。99 首 Untitled，keyTracks 留空。已讀 Ftarri 日文頁（Shift-JIS 原文）。
- 組內 WebSearch 用量：8 次（Reichel 1、Johansson 1、King Übü 1、Léandre 1、Cathode 2、Anode 2、Tiger Thrush 1，皆在每支 3 次以內）。

## 研究 c 組（13181–13190；Incus 系 6＋第二代細聲 2）
- 13181　**News From the Shed（x 嚴重存疑，建議汰換或降 x）**：Wire／Butcher 官網摘錄的樂評一致說音量很低、沉默佔大比重、Russell 幾乎不擴音，部分曲目（〈Everything Stops For Tea〉）近乎無聲。moodGuess x 3.4 很可能判成靜；y -0.6 成立。
- 13182　**Alterations 現場性待定**：MB 未標 Live；Discogs 寫 A 面 recorded from The Premises（Norwich）、B 面 recorded at LMC，曲名按城市編號，極可能是演出錄音但無來源寫明。facts 只寫「錄於」，不寫現場／錄音室。密度與厚度（y +0.4 疑慮）無逐曲樂評，無法證實或推翻。
- 13183　**Tony Oxley 非單一場次**：六首錄於 1971–75 四年間（Discogs 逐曲年份），且部分是與他人的團體即興；Discogs 人員欄只列 Oxley。facts 不指稱哪首獨奏。y 風險（擴音金屬、環形調變器）無來源可量化。母帶丟失一說只是留言者，不入 facts。
- 13184　**SME《So, What Do You Think?》**：發行 1973（MB、FJ Collective 一致），錄音 1971-01-27，取 1973。Emanem 的 Davidson 稱「打擊樂主導混音」，與預估的稀而細有拉扯，x／y 都存疑；SME 的「昆蟲即興」安靜美學為全團通論，非本張專論。刪去 Holland 與 Miles Davis 一條（來源未驗到）。
- 13185　**Barry Guy《Statements V-XI》**：年份取 MB／Discogs 1977（Maya 官方目錄標 1976；錄音 1976-10-30，Riverside Studios 錄音室）。找不到任何本張專評，sound 欄依 AAJ 總述與 Discogs 寫，「弓擦高把位尖嘶」無法證實，y 風險（低音提琴獨奏判厚與否）無證據。
- 13186　**Butcher《Thirteen Friendly Numbers》**：取原盤年 1992（官網寫錄於 1991，評論寫 1992）。四首疊錄（四次中音、六高音等）比單人獨奏厚，可能拉低「輕」；Penguin Guide 的「脆而易碎的泛音」與預估相合。curator 的「哨音、啵聲」無來源，未寫。
- 13187　**Company《Fables》**：MB 無首發日，取 Discogs 1980。編制無鼓無鋼琴（Discogs 人員欄），錄於倫敦 Art Workers' Guild（非錄音室也未標現場）。找不到樂評量化疏密。
- 13188　**Bailey《Lot 74》**：年份取原盤 1974（MB 2009 是 CD 重發）。錄於私人住宅（Catford 與 Hackney），非現場；A 面立體聲電聲、B 面未擴音 19 弦吉他，疏密不一致。Squidco 兩台擴大機／兩個踏板一條取自搜尋摘要，頁面 403 未親見。
- 13189　**推翻策展層**：0 處（年份、廠牌、掛名皆與卡單一致）。無選輯、無重複卡；8 張全為原創專輯，無建議移除。
- 13190　**WebSearch 用量**：本組 19 次（含 1 次報錯；每張 ≤3 次），WebFetch 另計；Discogs／MB API 直連可用，Squidco、AllMusic 多為 403。

## 研究 b 組（13171–13180；Parker 獨奏／電聲 5＋Company 3）
- 13171　**Snake Decides 年份**：Discogs／MB／維基藝人頁皆 1986（錄音 1986-01-30），維基專輯條目寫 1988-05 發行（引 EFI 目錄，EFI 網站連不上無法核對）。取卡單 1986，notes 標 uncertain，facts 只寫錄音日與 Incus 49，不寫發行年。
- 13172　**Process and Reality 多軌疊錄**：只有 All About Jazz 一則搜尋摘要（網頁 403）說獨奏薩克斯風採多軌疊錄，Discogs 只列高音薩克斯風。curatorRisk「含次中音」未獲證實，推翻一處（待證）；疊錄寫進 facts 並標來源為 AAJ，notes 標 uncertain，y 風險留給主線。
- 13173　**Chicago Solo 是純次中音**：Discogs 載明首張完整次中音獨奏，音色較厚重（Penguin Guide 稱「音色重量」），moodGuess y -0.2 存疑（尖細預設不符）。錄音地點（Airwave Studios）與廠牌所在地沒查到可靠來源，facts 不寫「芝加哥」。
- 13174　**Toward the Margins**：moodGuess x、y 皆存疑。有疏的段落與小組合短篇，樂評提到漫無目的；六人加電子處理比獨奏厚。錄音 1996-05 Gateway Studios（Surrey），非現場。
- 13175　**Company 4 x 嚴重存疑，建議降權或汰換**：Potter（Contact 19，1978）明寫「Much of the playing on Incus 26 is much sparser than on Bailey's previous duo records」，兩條細線加大量留白，x 3.4 很可能被判靜。錄音日取 Discogs 1976-11-11（MB 關係日期 1977-11-11 疑為錯植），卡單年份 1977 為發行年，保留。
- 13176　**Company 5 是現場錄音，MB 未標 Live**：Discogs 載明 1977-05-26 ICA 錄成，Potter 證實取自首屆 Company Week。依本批「MB 標 Live 才排除」的規則它不在排除之列，但實質為現場，交主線自行決定保留與否。
- 13177　**推翻策展層（Company 5 掛名）**：curatorWhy 列 Wachsmann，Discogs、維基、Contact 評論皆是 Leo Smith、Altena、Honsinger、Braxton、Bailey、Lacy、Parker 七人，無 Wachsmann。Company 5 的 MB rg 首發日 2001 為誤植，Discogs master 1978，取 1978。
- 13178　**Company 2**：錄音 1976-08-22 Riverside Studios（錄音室），Incus 23，發行 1977（MB、Discogs），維基 Bailey 頁列 1976，卡單 1977 保留。編制 Bailey＋Braxton＋Parker 與策展層一致，低音單簧管讓低頻不全尖細，y 有小幅風險。
- 13179　**推翻策展層合計**：2 處（Process and Reality 次中音疊錄、Company 5 的 Wachsmann）；存疑 4 處（Company 4 x、Chicago Solo y、Toward the Margins x／y、Process and Reality y）。無選輯、無重複卡，8 張皆原創專輯，無建議移除。MB 標 Live 的盤：0 張（Company 5 為實質現場，見 13176）。
- 13180　**WebSearch 用量**：本組 3 次（Process and Reality 2、Company 4 1）；Wikipedia API 頻繁 429，改用 Discogs／MB API 直連，WebFetch 對 AAJ、EFI 403／連不上。Contact 期刊 PDF 以 pdftotext 讀出，作為 Company 4、5 的主要樂評來源。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 17 張**（研究層聲音或錄音形態反證；冷冽線最怕「靜」與「旋律清楚」，存疑一律汰）：
  - 現場演出錄音（共同規則只收正規專輯、不收現場；MB 未標 Live 但研究層查實）：Company《Company 5》（1977 首屆 Company Week ICA 現場）、Bailey & Bennink《Han》（1986 巡演四場剪輯、含觀眾私錄）、Schweizer《Chicago Piano Solo》（Empty Bottle 現場；另有可哼唱的 Don Cherry 曲與 Monk 式切分）、Schweizer & Carl《The Very Centre of Middle Europe》（巴塞爾劇院現場）、Schweizer《Hexensabbat》（A 面柏林現場；樂評稱 folkish、oneiric）。
  - x 判靜風險（稀疏、極弱、低音量）：Company《Company 4》（Contact 期刊：比 Bailey 先前二重奏更稀疏）、Malfatti 等《News From the Shed》（音量極低、沉默佔大比重）、Sven-Åke Johansson《Schlingerland》（多家樂評：出乎意料地低調安靜）、大友良英《Anode》（超安靜、聽覺邊緣）《Cathode》（頭尾只有笙＋正弦波、稀疏比重大）、King Übü Örchestrü《Binaurality》（低音量點描）、Schweizer《Piano Solo, Volume 1》（冥想般的靜止）《Many and One Direction》（強度調低、收 Monk／Carla Bley 旋律曲）、EPEAE《Toward the Margins》（疏段多、六人加電子偏厚）。
  - 三軸皆疑：Léandre《Les Douze Sons》（實為二／三重奏與人聲拼盤、含歌舞廳橋段）、Reichel《Wichlinghauser Blues》（滑稽、甘美朗與散拍的叮噹質地，z 往暖）、Phil Minton Quartet《Mouthfull Of Ecstasy》（有鼓、密集吵鬧，y 判重）。
- **留下的存疑張**：Mengelberg《Impromptus》（Monk 動機無法文字確認）、Parker《Chicago Solo》（純次中音、音色重量）《Process and Reality》（疊錄）、Butcher（四首疊錄）、Oxley 同名（擴音金屬＋環形調變）、SME《So, What Do You Think?》（打擊主導混音）、《Topography of the Lungs》、Lytton《The Inclined Stick》（第二首 1977 現場，其餘家中錄音，整張算錄音室）、Alterations（錄於兩地演出場所，無來源寫明現場，正文只寫「錄於」）——評分看實測。
- **研究層推翻策展層照改**：《Instant Composers Pool》是 ICP 002（ICP 001 是 Bennink／Breuker《New Acoustic Swing Duo》），正文不寫「第一號」；Company 5 已汰。年份維持卡單（研究層核對 1974／1992／1977／1973 原盤年成立）。
- 不補位：策展候補多為 MB 標現場或同型稀疏，再補也是貼邊。
- 定案 **22 張**（a 7、b 5、c 7、d 2、e 1）。日本這半只剩吉田アミ《Tiger Thrush》1 張（音響派多判靜）。汰除卡存 `dropped-cards.json`，研究稿條目移出研究檔。研究 qa-batch 全過。

## 鉤子層（c、d、e；13216–13220）
- **13216** 交件：`desc-tools/batches/hooks/add-20261023-mc28-hooks-c.json`（7）、`-hooks-d.json`（2）、`-hooks-e.json`（1）。預算公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權／hook 原始字元）：Fables 219／21.5／30、Lot 74 225／25／29、Oxley 216／23／29、SME 224／24.5／28、Guy 228／20／24、Butcher 227／28／28、Alterations 226／22／22、Minton 210／24／24、Lytton（thin，上限 170）162／21.5／25、Tiger Thrush 223／25／27。初稿 10 張全數超標，整格捨去：Fables 的 Incus 老闆面向與 ATG 曲名、Lot 74 的 TAPS 錄音帶系列、Oxley 的 Sheffield 方位曲名與 Getz／Evans、SME 的五人名單與 Bailey 滿意度、Guy 的 Riley／Oxley 三重奏與 Ode、Butcher 的倫敦錄音地、Alterations 的 Slits／Flying Lizards 與第一／第二代即興者、Minton 的 Torquay 與 Westbrook 及錄音者 Weston、Lytton 的自兼製作封面、Tiger Thrush 的高頻描述與大友良英計畫。壓完後逐張回核 hook 依賴格都在 g1／g2（Lot 74 把 A／B 面樂器併入 g2；Oxley 把四個錄音年份提到 g1；SME 把拒絕重發提到 g2；Lytton 把自製打擊與現場電子放 g2）。
- **13217** 骨架歸屬（10 張 10 條，各張 note 只寫自己的歸屬句）：Fables＝Company 配對法帶進最年輕的美國 AACM 長號手；Lot 74＝同盤兩面兩種吉他配置（附壓片母帶倒放一句）；Oxley＝四年零散錄音收成一張；SME＝後人嫌混音拒絕重發（作品流傳類，標時序）；Guy＝古樂樂器 violone 進入低音提琴獨奏；Butcher＝讀物理的人放下粒子物理吹薩克斯風；Alterations＝玩具與雜物入樂的第二代即興團；Minton＝貼身麥克風收進的喉音與甜甜圈續集；Lytton＝自製打擊接現場電子；Tiger Thrush＝依素材分類的人聲圖鑑。避開 a、b 組已用的：Incus 創辦與第一號（Topography）、自家馬廄自錄（Bennink Solo）、教堂與廳堂回聲（Six of One、Snake、Conic）、多軌疊錄成合奏（Process and Reality；Butcher 的四首疊錄只當聲音細節一格）、第一張次中音獨奏（Chicago Solo；Butcher「第一張獨奏」與 Tiger Thrush「實質第一張個人專輯」整格捨去）、Riverside 錄音室的三人即興（Company 2；Guy 的 Riverside 只是錄音地一格）。Oxley「從未重發」讓給 SME 的骨架、Oxley note 不帶。Fables 不帶《Karyobin》重聚（讓給 SME）。
- **13218** 「他／她」引入法與第二句句型配表：Fables＝Company 計畫領句（hook 已具名 Lewis）；Lot 74＝「非慣用語法」這個自稱領句（Bailey）；Oxley＝Ronnie Scott's 領句；SME＝召集人 John Stevens 領句；Guy＝姓名與 Guildhall 學歷領句（hook 用「他」）；Butcher＝生年 1954 領句（hook 用「他」）；Alterations＝團名與成立年；Minton＝小號（器物）領句；Lytton＝二重奏搭檔（Evan Parker）領句；Tiger Thrush＝日文盤名《虎鶫》領句。跨張人物：Bailey 只在 Lot 74 當主角、Fables 以計畫發起人出場、SME 不帶；Parker 在 Fables、SME（被 Watts 頂替）、Lytton（二重奏搭檔）各一格，皆不帶生平；Holland 只在 Fables。與 a、b 組的第二句（父親職業、出生城市、樂器欄、「那位鼓手是」、廠牌名由來、創辦人名單、招牌技法、錄音日期與地點、「說這話的是」、樂團經歷、身分加錄音日期、「那人是」）無重複；Butcher 改掉「英國薩克斯風手＋姓名」以避開 Process and Reality 的同形。「日」後一字：Lot 74 日錄、Guy 日進，其餘本三組只寫到月或年；與 a、b 組（日於、日、、日走、日一、日獨、日的、日他、日在、日三）不撞。
- **13219** 事實自驗與研究層限制照辦：Lot 74 原稿 hook 寫成整個 B 面改用 19 弦吉他，研究稿只有兩首，改成「B 面有兩首」；Squidco 的兩台擴大機（搜尋摘要）不進 note，A 面只寫「立體聲電聲」。SME hook 的「主事者」對應研究稿「Emanem 的 Martin Davidson」。Alterations 只寫「錄於」兩地、不寫現場或錄音室；Lytton 第二首寫「取自 1977 年 12 月亞琛的演出」，整張以家中錄音為主。Oxley 不指明哪首獨奏、哪首團體。Guy 的 violone 不寫種類。Tiger Thrush 的ハウリング・ヴォイス寫 howling voice、ユタカワサキ不具名。媒體名與媒體榜單一律未進 note（Wire、Penguin Guide、BBC、AllMusic 改「樂評」或整格捨去；Kenneth Goldsmith 以詩人身分出場）。
- **13220** 自查與腳本：hook 之間中文 4-gram（全批 22 張）只剩樂器「薩克斯風」「音薩克斯」（Six of One／Company 2／Butcher），不算同構；本三組 hook 與自身 note 無 8 字以上逐字重複（Lot 74、SME 原稿各一處已改）。`node qa-batch.mjs hooks add-20261023-mc28` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-mc28`（5 組 22 張）全部通過 ✓，hook 加權 15–28、note 163–236。附帶：Company 2（b 組）hook「高音、中音薩克斯風」與其 note 首格有 8 字逐字重複，留給 b 組自查。

## 鉤子層（a、b；13211–13215）
- **13211** 交件：`desc-tools/batches/hooks/add-20261023-mc28-hooks-a.json`（7）、`-hooks-b.json`（5），key 逐字照研究稿、順序不變。預算公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權／hook 原始字元）：Solo 203／23／23、Impromptus（thin，上限 170）169／17.5／23、Tempo Comodo（thin）165／17／17、Han Bennink & Derek Bailey 221／20／20、Instant Composers Pool 227／19／19、Topography 227／18／18、Six of One 227／21／21、Snake Decides 227／23／23、Conic Sections 219／15／15、Process and Reality 230／21／21、Chicago Solo 226／18／18、Company 2 229／25／25。初稿 10 張超標（最高 331），整格捨去：Solo 的《Reconstructie》與 khène、木魚；Impromptus 的就學年份與曲長分佈；Tempo 的 Dick Lucas 與 Data Records；HB&DB 的錄音室名、白底棕紋與〈Good Morning, Derek I〉；ICP 的 Breuker、絲網封套設計與 B 面兩首；Topography 的 Walters、Fulham 與「無意賺錢」；Snake 的 B 面曲目與 George Murphy 木刻；Conic 的 70 分鐘與 Kunio Nakamura 獻詞；Process 的 Gebers 共同製作、曲長、發行月；Chicago 的 John Corbett；Company 2 的共同掛名作曲。壓完逐張回核：hook 依賴格全在 g1／g2（Solo 把叢林錄音帶、HB&DB 把手繪封套、Topography 把附信各自前移到 g2）。
- **13212** 骨架歸屬（12 張 12 條，只在擁有者 note 寫歸屬句）：Solo＝外來錄音帶混進鼓獨奏（作曲家 Peter Schat 轉交）；Tempo Comodo＝曲名即手法；HB&DB＝鼓手手繪的初版封套；ICP＝廠牌名的由來（即時作曲）；Topography＝樂手自營廠牌第一號＋收入歸樂手的附信；Six of One＝一支樂器聽成多聲部、日後大作的草稿；Snake Decides＝錄音師的耳朵成主角；Conic Sections＝房間反過來改變演奏；Process and Reality＝曲名獻詞連作；Chicago Solo＝高音八張後換次中音；Company 2＝一人輪吹多件簧管（Braxton）＋與 Bailey 的舊二重奏；Impromptus＝激浪派／Cage 出身的鋼琴家坐下即興。研究層定案照辦：ICP 寫 ICP 002、不寫「第一號」；Process 的多軌疊錄（單源、uncertain）整格捨去，hook 不靠它；Snake 不寫發行年（1986／1988 未定）；Impromptus 只寫 1988 年錄成。Company 計畫的「配對法」讓給 Fables、《Karyobin》讓給 SME，Company 2 只帶「Bailey 的即興計畫」一個名詞。
- **13213** 同藝人分軸與引入法配表：**Parker 6**——Topography＝廠牌創辦人名單（Incus）；Six of One＝招牌技法（循環換氣、分裂音）；Snake＝錄音日期與地點領句；Conic＝「說這話的是」替 hook 具名（自由即興樂手）；Process＝樂團經歷（Schlippenbach 三重奏）；Chicago＝名字直接領句帶國籍與八張高音獨奏；Company 2 只以同台者一格出現。「偽複音」只在 Snake，「三個聲部」只在 Six，Gerzon 的耳朵只在 Snake（Conic 只寫他訂場地）。**Bennink 5**——Solo＝親屬（父親古典打擊樂手）；Tempo＝樂器欄（鼓與其他東西）；HB&DB＝「那位鼓手是」替 hook 具名；ICP＝創辦人之一；Topography＝外人之口（樂評說能量由他推動）。**Bailey 3**——HB&DB＝1930 年生英國吉他手（「非慣用語法」讓給 Lot 74）；Topography＝Incus 創辦人；Company 2＝與 Braxton 的舊搭檔、計畫主人。**Mengelberg 2**——Impromptus＝出生城市（基輔）＋激浪派；ICP＝替廠牌取名的鋼琴手。四位的「英國即興薩克斯風手」只留 Snake 一處，其餘改寫以免寫作層 4-gram 撞。
- **13214** hook 四型：場景（Solo、HB&DB、Topography）／斷言（Tempo、ICP、Six、Company 2）／懸疑（Conic、Process）／人物定調（Impromptus、Snake、Chicago）。開頭前四字 12 張互異、對 c–e 與全 hooks 目錄已上架 hook 互異（Tempo 原「曲名寫的」撞 c59、Topography 原「唱片裡夾」撞 c98，已改）。「日」後一字：Impromptus 日於、Tempo 日、、HB&DB 日走、Topography 日一、Six 日獨、Snake 日的、Conic 日他、Chicago 日在、Company 2 日三；Solo、ICP、Process 不觸發（只寫到年或「13、14 日」「18 至 19 日」形）；與 c 組日錄、日進不撞。媒體名與榜單未進 note（Penguin Guide、BBC、Coda、AllMusic、Guardian 一律改「樂評」）。
- **13215** 自查與腳本：hook 之間中文 4-gram（全批 22 張）只剩樂器「薩克斯風／音薩克斯」（Six／Company 2／Butcher），不算同構；hook 與自身 note 最長逐字重複降到 7 字以下（Company 2 依 c 組 13220 提醒改成「兩種薩克斯風」，HB&DB、Solo 同步改寫）。note 無否定指派句、無 uncertain 格。`node qa-batch.mjs hooks add-20261023-mc28` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-mc28`（5 組 22 張）全部通過 ✓，hook 加權 15–28、note 163–236。

## 寫作層（writer-2）
- **13226** 交件：`desc-tools/batches/output/add-20261023-mc28-out-2.json` 11 張（full 10：201–234；thin 1：Lytton 160）。逐張：Company 2 218、Fables 214、Lot 74 218、Oxley 228、SME 228、Guy 201、Butcher 213、Alterations 225、Minton 221、Lytton 160、Tiger Thrush 234。初稿只有 Tiger Thrush 超標（248），整格捨去「這張《Tiger Thrush》的」改「本作的」；Fables 的「聽不到打擊樂」否定句整句拿掉。`qa-batch out` 唯一標記是 out-1 尚未交件造成的總張數 11 vs 22；`qa-check-research` 0、`fix-spacing` 0；「據說／據傳／也就是」0。
- **13227** 第二句領句全照鉤子層 13218 配表：Company 2「那人是」、Fables Company 計畫、Lot 74「非慣用語法」、Oxley Ronnie Scott's、SME 召集人 Stevens、Guy 姓名＋Guildhall、Butcher 生年 1954、Alterations 團名＋成立年、Minton 小號、Lytton 二重奏搭檔 Evan Parker、Tiger Thrush《虎鶫》。跨張人物引入法：Bailey＝Company 2「吉他手」／Fables 計畫主人（所有格）／Lot 74 自稱；Parker＝Company 2「同台的薩克斯風手」／Fables 所有格樂器／SME 被頂替者／Lytton 句首主語；Company 兩張各走 Braxton 與 Lewis，不重講計畫沿革以外的骨架。「日」後一字：Company 2 日、（→「日三人」）、Lot 74 日錄、Guy 日進，其餘只寫到月或年。
- **13228** 媒體名整句不寫：Guy 的 All About Jazz 寫成「樂評形容」，不帶媒體名與名次；Oxley「廠方附註」寫成「唱片的附註寫明」（掛名性質）；Minton 的 Kenneth Goldsmith 照 note 以詩人身分出場、不帶 New York Press。SME 的 Emanem 拒絕重發依 note 標時序，寫成「出版之後的事」，不寫「多年後」（無來源）。Oxley 不指明哪首獨奏、不寫「這幾年間」才開始擴音（擴音起點在 Riley 三重奏時期，note 未列）。
- **13229** 開頭兩句讓人知道是誰：Lytton 補「倫敦鼓手」、Tiger Thrush 補「日本聲音表演者」、Butcher 補「開始即興」、Fables 以 Company 計畫說明。代名詞就近具名：Lytton 第三句「他」改「Lytton」（前句主語是 Parker）；Guy、Minton 補上主語（「他」「整張」）。Lot 74 第三句原有「走的是立體聲電聲」複述 hook，拿掉。
- **13230** 自掃 han() 中文 4-gram（本檔 11 張）：3 張以上只剩樂器名「薩克斯風」；2 張殘片依「先交件要當 3 張處理」全拆（進倫敦的、錄於倫敦、的家裡錄、專輯在年、聲音唱片、年由出版、形容這張）。本組交件時 out-1 尚不存在，**跨檔合掃留給後交件的 writer-1／主線收件檢查**。輔助腳本：`/tmp/claude-0/-home-user-dip-vinyl-shop/f63a2fd0-1125-5703-bf88-4c82d4e3331a/scratchpad/wr-mc28-2/`（build-mc28-2.py、scan-mc28-2.py）。

## 寫作層（writer-1）
- **13221** 交件：`desc-tools/batches/output/add-20261023-mc28-out-1.json` 11 張（full／partial 9：187–235；thin 2：Impromptus 143、Tempo Comodo 164）。逐張：Solo 211、Impromptus 143、Tempo Comodo 164、HB&DB 210、ICP 187、Topography 219、Six of One 221、Snake Decides 206、Conic Sections 208、Process and Reality 235、Chicago Solo 215。partial 卡照 full 帶（180–240）。初稿 0 張超標、0 張掉下限。`qa-batch out`（兩檔 22 張）全部通過、`qa-check-research` 0、`fix-spacing` 0；「據說／據傳／也就是」0；媒體名與媒體榜單整句未寫（樂評只寫評語內容，不帶出處）。
- **13222** 第二句領句全照鉤子層 13213 配表：Solo 父親職業、Impromptus 出生城市基輔、Tempo 樂器欄、HB&DB「那位鼓手是」、ICP 廠牌名由來、Topography 創辦人名單、Six 招牌技法、Snake 錄音日期與地點、Conic「說這話的是」、Process 樂團經歷、Chicago 名字直接領句。避免複述 hook：ICP 不再轉述「即興＝當下作曲」（hook 已說），第二句只交代名字出自誰；Chicago 的「八張高音獨奏」改寫成補上 hook 沒說的起點年 1975；Six 的「三個聲部」不重講，改寫成錯覺來自第二首的連奏線條；HB&DB 的螺旋改補 hook 沒說的「也有字母」。「日」後一字照 13214：Impromptus 於、Tempo 、（第二個日改「共」）、HB&DB 走、Topography 一、Snake 的、Conic 他、Chicago 在；Six 原「日獨」因前句改寫成「日，獨」（後字為「獨」，掃描器眼裡不變）；Process 改「日兩」以避開 Chicago 的「日在」；ICP 寫「13、14 日，」。
- **13223** 研究層限制照辦：ICP 只寫盤號 ICP 002、不寫第一號；Topography 寫「次中音與高音」；Impromptus 只寫錄音日（1988 年 6 月 4 日），不寫發行年；Snake 不寫發行年；Chicago 不寫「芝加哥」錄音地；Process 不寫多軌疊錄。HB&DB 的「1971 年出版」照 note，不寫間隔年數。
- **13224** 自掃 han() 中文 4-gram（本檔 11 張＋out-2 11 張合掃）：3 張以上只剩樂器名「薩克斯風／音薩克斯／高音薩克／克斯風手」；2 張殘片剩「曲名直接」（Tempo hook 原文對 Alterations 正文，寫作層無權改 hook，留主線）、「中音薩克」（樂器）、「循環換氣」（Six／Snake，技法名，鉤子層兩張 note 都指派）。拆掉的殘片：唱片到年才由、的年月日、人年月日、樂評形容（對 Guy）、即興薩克斯、斯風手年月（對 Company 2）、段高音薩、用高音薩、林的錄音（對 Solo hook）、柏林錄音室、荷蘭鼓手、出自荷蘭、六段獨奏、的薩克斯（對 Fables）。
- **13225** 輔助腳本：`/tmp/claude-0/-home-user-dip-vinyl-shop/f63a2fd0-1125-5703-bf88-4c82d4e3331a/scratchpad/wr-mc28-1/`（drafts-mc28-1.mjs、len-mc28-1.mjs、scan-mc28-1.mjs）。

## 主線審稿（13231–13240；2026-10-23）
- 13231：逐張審 22 張（out-1 11、out-2 11），逐句對回研究稿；事實層未改，hook 未動。
- 13232：刪 5 處單源評價句、去 1 處重複、補 2 處研究稿事實（字數回帶內）：
  - `Evan Parker, Derek Bailey & Han Bennink|The Topography of the Lungs`：刪「在樂評耳中，這股能量兇猛到近乎暴力，主要由 Bennink 推動，卻始終保有幽默。」（Warburton 單源評價）；補「原版 LP 只有四首，A 面整面是〈Titan Moon〉。」（研究稿 Discogs 曲目）→ 208 字。
  - `Evan Parker|Conic Sections`：刪「樂評則形容他像在演奏房間，房間也在演奏薩克斯風」（單源）→ 184 字。
  - `Evan Parker|Chicago Solo`：刪「樂評說音樂很專注，音色帶著令人畏懼的重量。」（Penguin 單源）→ 194 字。
  - `Phil Minton|A Doughnut in One Hand`：刪 Kenneth Goldsmith 的單源評價句；補「同年 6 月由柏林的自由即興廠牌 FMP 發行」（研究稿 Discogs／MB）→ 195 字。
  - `Spontaneous Music Ensemble|So, What Do You Think?`：末句「Emanem 那邊認為鼓聲主導了音樂，拒絕替它重發，則是出版之後的事」與 hook 重複，刪 → 193 字。
- 13233：未改但記錄——Six of One「樂評認為…早期草稿」是骨架本體（日後《Lines Burnt in Light》），保留；Barry Guy「樂評形容…擴充了低音提琴能發出的聲音」是技法描述，保留；Tempo Comodo hook「曲名直接」與 Alterations 正文 2 張殘片，不改。

## 上線與評分（2026-10-23，主線）（條號 13234–13236）
- **13234**：上線 22 張：card_catalog 22／22、KV 23 鍵（吉田アミ desc2＋desc4）回讀逐字一致、試聽 1 ready／21 unavailable（Incus／FMP／ICP 目錄幾乎不在 Apple；Butcher 用 Unsounds 2004 同錄音再發）、seed +22、published gate 0 error。封面 CAA 15、Discogs 7（已登錄 registry：Impromptus、Company 2、Lot 74、Tony Oxley、Alterations、Doughnut、Tiger Thrush，皆年份＋廠牌＋目錄號三項對上）。
- **13235**：類型樹 22／22 落位（ICP 三重奏、Minton、吉田アミ 補進 `jazz/free/free-improv`）；抽卡封面重建。
- **13236**：**落格率 19/22＝86%**（`batch-progress/mood-axes/score-mc28/`，照 10-23 體感標準）。出格 3：Mengelberg《Impromptus》x 2.7 落平靜（Monk 式歪斜、留白、沉思）；《Topography of the Lungs》y 0.8、Parker《Process and Reality》y 0.7 落暴躁（三人全力噪刮、多軌疊錄聲團糊）。極弱點描型（SME、Butcher、Bailey《Lot 74》、Conic Sections）評 x 3.0–3.3 貼邊仍落冷冽。**同場景下一批：獨奏與二重奏的乾、尖型最穩；疊錄、三人以上全力合奏判重；鋼琴獨奏帶 Monk 動機判靜。**

## 本批新藝人（無介紹，未切；並行時子工作階段不切）
Misha Mengelberg、Han Bennink、Barry Guy、John Butcher、Alterations、Phil Minton、Paul Lytton、吉田アミ（8 位）；另有 3 個合掛名需別名鍵：Derek Bailey & Han Bennink、Han Bennink / Misha Mengelberg / John Tchicai、Evan Parker, Derek Bailey & Han Bennink。
