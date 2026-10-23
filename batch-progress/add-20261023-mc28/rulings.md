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
