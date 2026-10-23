# add-20261023-mc42 裁定（情緒薄格策展線・冷冽：自由即興打擊／鼓獨奏＋鼓手領軍小編制＋當代古典打擊擴寫）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 ml56、mc42（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc42 列；主線定可擴寫：鼓手領軍／打擊為主體的自由即興小編制、當代古典打擊獨奏的無調作品），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x ≥ 3.3、y ≤ 0.2、z ≤ −0.3。
> 策展：`curation-mc42.json`（50）→ 主線汰 13（`master-override-mc42.json`）→ `master-mc42.json`（MB 回查 37/37 釘住、人工 0）→ `pick.json`（37）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc42-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 37、§1 人工 0。
> **預留：研究 a 21401–21410、b 21411–21420、c 21421–21430、d 21431–21440、e 21441–21450、鉤子 21451–21460、寫作 21461–21470、主線 21471–21480。**
---

## 主線策展（不佔條號）
- 策展 50：獨奏 12、雙鼓／多打擊 5、鼓＋單一樂器二重奏 12、鼓手掛名小編制 13、當代古典打擊 8；moodGuess 全過邊距（x 3.3–3.8、y −0.5～+0.2、z −1.7～−0.5）。策展層先擋現場約 40 張（Lovens、Sommer、Oxley、Bennink、Turner、Hemingway、Corsano、Graves《Bäbi》等，多數 MB 未標 Live、看 Discogs 記事）；池中富樫雅彥全系列 x 1.8–2.8、Bill Dixon 判靜，不提。
- 主線汰 13：
  - 判暖（池中 Milford Graves《Grand Unification》z +0.1 落雀躍先例：手鼓複節奏語彙往暖）：Graves《Stories》（獨奏）、Cyrille／Graves《Dialogue of the Drums》、Clarke／Cyrille／Graves／Moye《Pieces of Time》（四鼓手、含搖擺語彙，估 z −0.5 貼邊）。
  - 判重（池中 Les Percussions de Strasbourg《Xenakis: Pléïades》y 0.8 落暴躁、Oxley Quintet《Baptised Traveller》y 0.6 先例）：Les Percussions de Strasbourg ×4（大編制打擊樂團、大鼓與金屬共鳴）、Pedro Carneiro《Psappha / Rebonds》（Xenakis 大鼓）、Z'EV《Production and Decay of Spacial Relations》（金屬工業撞擊）、David Murray & Milford Graves《Real Deal》（次中音薩克斯風厚、全力合奏）。
  - 身分／場景：Stockhausen《Zyklus – Refrain / Transición II》（MB 實為 Stockhausen／Kagel 拼盤、掛名四位演奏者，掛名不清）、Chris Cutler／Lutz Glandien《Domestic Stories》（RIO 歌曲編制，非即興）、Fritz Hauser《Zwei》（含詩文朗誦）。
- 定案 37。去重：seed、所有 curation／cards、origin 各 `claude/*` 分支 seed＋10-22／10-23 卡單全 0 撞。
- 風險（交研究層查）：x 貼 3.3–3.4 的長音／弓擦型（Nakatani ×2、Parker／Prévost ×2、Smith／Sommer《Wisdom in Time》、Lê Quan Ninh、Hauser《Solodrumming》）可能判靜；Graves 參與的《Percussion Ensemble》《Beyond Quantum》可能判暖或重；Schick《Born to Be Wild》大鼓可能判重；Bennink 與管樂二重奏是否借曲（Serpentine、Dissonant Characters、Eleven Ghosts）；所有盤是否實為現場。

## 研究 a 組
- 21401　8 張全為錄音室／單人錄音，Discogs 記事與 MB 都無現場標記，無需汰換；身分（盤名、年份、廠牌）與卡單吻合，Hauser 年份取 Discogs 1985（MB 空白）。
- 21402　moodGuess 存疑（交主線）：Nakatani《Abiogenesis》INDY Week 專訪明說是 37–40 吋巨鑼低頻、錄音者不適、『比部分金屬更具壓迫感』，與策展層『尖細高頻』相反，傾向判重；《Primal Communication》57 分鐘單軌，同樣可能判重或靜；Lê Quan Ninh 含頌缽、風鈴、大鼓共鳴，可能判靜；Hauser 七秒殘響與策展層『乾』相左，可能偏靜或偏飄；Cyrille《The Loop》可能有節奏動機或律動，偏暖風險；Corsano《Another Dull Dawn》Discogs 類別含 Electronic，聲音資料最薄。
- 21403　Cyrille《The Loop》與 Corsano《Another Dull Dawn》標 thin：無可讀樂評（AllMusic、RYM、Discogs master 皆 403）；聲音 facts 僅 Discogs 記事與曲名。
- 21404　Hot Cars Warp 為 Corsano 自營廠牌，依據 Discogs 藝人頁『Operated』標示（單一來源，已入 facts 並以 Discogs 為 src）；Dennis Tyfus 與 Ultra Eczema 關係未驗證，不入 facts。

## 研究 b 組
- 21411　8 張皆非現場（Discogs 記事與 Bandcamp／廠牌頁皆為錄音室或廳內逐位錄音）；Dialogues 只有 2020 重發版多一首現場曲 PWP Music，不在本盤。身分（盤名、廠牌）全數吻合。
- 21412　推翻卡單年份：Eleven Ghosts 錄音 1994、Discogs 盤面與維基皆 1997 發行，MB 1996，建議卡片改 1997。Percussion Ensemble 錄音 1965、維基稱 1966 發行（單一來源），卡片可維持 1965。
- 21413　moodGuess 存疑（強烈，建議汰換或待聽感覆核）：Eleven Ghosts（含 Leroy Carr 的 How Long Blues、Joplin 的 Maple Leaf Rag，AllMusic 稱起點是藍調／boogie／stride、比預期好聽，疑判暖）；Serpentine（13 首含 Too Close For Comfort、Young And Foolish、Cherokee 三首標準曲，Alap 11 分半被評內省，疑判暖或部分靜）；Dissonant Characters（Discogs 作曲欄列 Monk，Let's Cool One、Brilliant Corners 為 Monk 曲，卡單『無主題』與之衝突）。
- 21414　moodGuess 存疑（中）：Percussion Ensemble（不規則拍號疊層、鈴與鑼，Graves 先例疑判暖，或稀疏段判靜）；Cedarhead（七首中電子／錄音帶兩首約 27 分鐘、nay 與 darbuka，大廳殘響，疑判重或靜）；Dialogues 與 Abanaba（大量鑼鈸殘響，疑判靜或重；Abanaba 無任何樂評，標 thin）。
- 21415　Directly to Pyjamas 標 thin：找不到專輯樂評，聲音靠編制與兩人風格；長號／小提琴／Casio keyboard 與滑稽感疑偏輕鬆。Cedarhead 的 Raed Yassin 樂器，Discogs 寫雙低音提琴、廠牌 Bandcamp 寫錄音帶與電子，採廠牌版本。
- 21416　WebSearch 3 次已用完；AllMusic、Discogs 網頁、MB 網頁 403，改走 Discogs API／MB API／Wikipedia／廠牌頁。

## 研究 c 組
- 21421　8 張全為錄音室錄音（Discogs 記事皆有棚名與錄音日期），無現場；身分（盤名、年份、廠牌）全部吻合。Tsktsking 的 Soundohm 頁寫 2010，以 Discogs master／MB 2009 為準。
- 21422　推翻策展層：(1) Explore 實為十三首（非『九段』）；(2) Imponderable Evidence Discogs 只列 tenor sax，非『高音』薩克斯風；(3) Duology 的『Duology』是 Ted Daniel／Michael Marcus 雙人組名，Cyrille 掛名領軍僅依 MB artist-credit，Discogs 製作人署名為 Daniel 與 Marcus，寫作層別寫成 Cyrille 邀請兩位吹奏者。
- 21423　moodGuess 存疑（強烈，建議汰換）：Duology，Free Jazz Blog 稱開場旋律線明顯、Ornette／Cherry 式、〈Eclectic Autumns〉會 swing，疑判暖。
- 21424　moodGuess 存疑（中）：Tsktsking（Soundohm 稱細膩帶旋律感、不爆發，Norman 稱 bebop 式互動與律動，x 可能不足、z 偏暖）；Wisdom in Time（Free Jazz Blog 稱部族色彩與舞蹈感節奏，另有〈Pure Stillness〉等標題暗示極弱留白，且 Discogs 與樂評皆未提悶音）；Most Materiall（138 分鐘、單曲最長 29 分鐘，疑判靜或重）；Explore（曲名〈South Africa February Dance〉〈Moonstone〉等，旋律是否抒情無樂評可證，Battaglia 維基稱兼具浪漫旋律）；Imponderable Evidence（Prévost 鈸擦、長曲 15 分鐘，疑判靜）。
- 21425　thin：Fingerprints、Dada Da、Imponderable Evidence、Most Materiall、Explore 五張找不到樂評（AllAboutJazz、JazzMusicArchives、Squidco、Discogs 網頁 403；Free Jazz Blog 與 Leo／Intakt 站查無對應條目），聲音 facts 僅 Discogs 記事、曲名與藝人一般技法。All About Jazz 另有一筆同名《Fingerprints》D'Agaro（Setola di Maiale）是另一張，勿混。
- 21426　WebSearch 3 次已用完（Fingerprints、Tsktsking、Duology 各一）。本組只有 8 張（派工寫 9 張，卡單 c 組實為 8）。

## 研究 d 組
- 21431　8 張皆為錄音室錄音（Discogs 記事皆有錄音日期／棚名：Lumps 1974-09 STEIM 器材、4 Compositions 1970-02-07、Carpathes 1975 兩段柏林、Trap Street 2002-08-12 Gateway、Kochuu 2013-04 studioboerne45、And 1997-08 Moat、Synopsis 1974-04 AMIGA-Studio）；Ichnos 維基只寫 1969–70 錄音，無現場註記。身分（盤名、廠牌、年份）全數吻合；And 的 1999（Rectangle 維基與 Les presses du réel 寫 CD／出版 1999）為晚出版本，卡單 1997 照 Discogs LP／MB 不動。
- 21432　推翻策展層：And, 並非「吉他、鋼琴、鼓」——Discogs 與出版商皆寫 Steve Noble 只玩唱盤（Turntables）、Pat Thomas 為鍵盤／電子裝置，Discogs 風格 Noise／Experimental／Electronic。moodGuess 存疑（強烈，建議汰換或重聽）：電子／唱盤噪音疑判重，z、y 與預估差距大。
- 21433　moodGuess 存疑（強烈，建議汰換）：Synopsis，〈Kommt, Ihr G'spielen〉Discogs 作曲欄標 Traditional（借曲／民歌），〈Wenn Der Kleine Finger Nicht Wär〉標題似民謠語彙，〈Traumtänzer〉〈Post Aus Vogelsang〉可能有主題旋律，疑判暖。
- 21434　moodGuess 存疑（中）：Carpathes（低音單簧管音域低、木質偏暖，Pilz 掛名五首作曲可能有可辨主題；找不到樂評，聲音靠編制，未能確認是否現場，傾向棚錄）；Lumps（Lacy 作曲主題與 Bennink 有音高樂器 Wailophone、Vibra Pan，疑 z 偏暖；STEIM 合成器為脆裂噪音型，未見厚重）；Ichnos（Discogs 標 Amplified Percussion，疑 y 偏重，但 Ben Watson 評語偏音色與噪音而非音量）。
- 21435　thin：Trap Street（emanemdisc.com 頁面 503，Discogs 登錄 Beresford 為 Electronics／Objects，卡單 curatorRisk 的「玩具鋼琴」未得證；Beresford 諧趣傾向若出現可能偏暖）、Kochuu（聲音靠編制推論；curatorRisk 的長音／極弱靜態段無法驗證，若多為弓擦長音可能判靜，請聽感核對）。
- 21436　團員來歷有出入：Synopsis 的 Discogs 團體簡介說 1974 年創始成員退出後 Bauer 與 Petrowsky 才加入，Petrowsky 維基與個人簡介卻稱他為 1973 年共同創辦人；facts 只寫成立年，不寫誰是創始成員。Lovens 的 Po Torch 創立年 Discogs 寫 1976、維基寫 1967，採 Discogs。
- 21437　WebSearch 3 次已用完（And,、Synopsis、Lumps 各一）；Squidco、AllMusic、jazzmusicarchives、Discogs 網頁 403，改走 Discogs API 與 Wikipedia。

## 研究 e 組
- 21441　5 張皆為錄音室錄音：C/D/E 1998-10-30 Pilot Recording Studios（Discogs、MB 錄音關係）；Beyond Quantum 2008-05-11 Laswell 的 Orange Music 棚內即興（樂評稱 impromptu session）；AGiiiiR 2005-10-04/05 VRT Studio Toots 布魯塞爾；Born to Be Wild 無錄音日期，Discogs 無 live 註記（判棚錄）；Nakamura 2007–08 慕尼黑 BR Studio 2（僅 UNT 圖書館紀錄）。身分（盤名、年份、廠牌）全吻合。
- 21442　推翻策展層：C/D/E 實為 10 首（非『十二段』），Ehrlich 吹高音與中音薩克斯風、單簧管、長笛（非只單簧管）；AGiiiiR 是四人並列，打擊手是 Lê Quan Ninh，Goudbeek 兼低音單簧管；Beyond Quantum 的 Orange Music 棚是錄音兼混音，不只混音。
- 21443　moodGuess 存疑（強烈，建議汰換）：C/D/E——Jazzword 稱『出奇地抒情』，Ehrlich 中音薩克斯風像 Cannonball Adderley、〈A Simple Melody〉〈Aubade〉旋律清楚、〈BBJC〉Dixieland 風，Cyrille 鼓如現代藍調樂團，疑判暖。Born to Be Wild——收尾是 John Kay 搖滾歌（Steppenwolf 名曲）David Lang 打擊改編（借曲、旋律清楚），另有兩首要演奏者朗誦（Toucher、To the Earth 用四個花盆）、Rebonds A 兩面大鼓、Anvil Chorus 重擊廢金屬，疑判暖或重。
- 21444　moodGuess 存疑（中）：Beyond Quantum（63 分鐘、Braxton 吹到 contrabass 薩克斯風、Graves 非洲複節奏與人聲呼喊、樂評多處講 groove 與 bop 藍調，疑判重或判暖，Graves 先例）；AGiiiiR（〈Jawadde〉近 24 分鐘含低音單簧管低顫音與低音提琴 pedal point ostinato，疑 y 偏重；Ninh 刮擦段落若判靜）；Nakamura（Eötvös《Thunder》低音踏板定音鼓、Rebonds 大鼓，疑 y 偏重；Kagel〈Solo〉含人聲與鈴鼓）。
- 21445　WebSearch 3 次已用完（Schick、Nakamura、Beyond Quantum 各一）；AllMusic、AAJ、Squidco、Discogs 網頁 403，改走 Discogs API、MB API、DuckDuckGo 摘要、Jazzword、廠牌／作曲家官網、silent-watcher 轉錄的 AAJ／AllMusic 原文。C/D/E 的 Jazzword 評語（Waxman，2001）與 AGiiiiR 小冊子（Waxman，2008）為主要聲音來源。Nakamura 生平單一來源（Neos 廠方文案經 Europadisc 轉載），Schick 錄音首作之說未能驗證、未採。

## 主線：研究後汰換（不佔條號）
- 研究五組 37 張，汰 24（卡單、研究稿、`pick.json` 同步移除；a 6、b 6、c 4、d 3、e 5）：
  - 長音／殘響／冥想留白（判靜；池中 Cyrille 獨奏《What About?》x 2.9 落平靜、Oxley《February Papers》x 2.6 先例）：Fritz Hauser《Solodrumming》（空中庭七秒殘響）、Lê Quan Ninh《Ustensiles》（頌缽、風鈴、大鼓共鳴）、Pierre Favre《Abanaba》（鑼鈸殘響）、Andrew Cyrille《The Loop》（節奏動機、獨奏先例）、Parker & Prévost《Most Materiall》（138 分鐘、長曲）、John Edwards / Chris Corsano《Tsktsking》（細膩、不爆發）、Smith / Sommer《Wisdom in Time》（〈Pure Stillness〉等極弱段、部族舞蹈節奏）。
  - 厚重／電子（判重）：Tatsuya Nakatani《Abiogenesis》（37–40 吋巨鑼低頻）、《Primal Communication》（57 分鐘單軌、Rhythmic Noise）、Corsano《Another Dull Dawn》（Electronic、零樂評）、Zerang《Cedarhead》（錄音帶／電子 27 分鐘、大廳殘響）、Bailey／Thomas／Noble《And,》（唱盤＋電子噪音，非原聲三重奏）、Braxton／Graves／Parker《Beyond Quantum》（63 分鐘高密度、contrabass 薩克斯風）、Steven Schick《Born to Be Wild》（兩面大鼓、廢金屬重擊、Steppenwolf 改編、朗誦）、Isao Nakamura（低音定音鼓〈Thunder〉、Rebonds 大鼓）、Goudbeek 等《AGiiiiR》（低音單簧管 pedal point、24 分鐘長曲）。
  - 借曲／旋律／搖擺（判暖）：Eskelin & Bennink《Dissonant Characters》（Monk 曲）、Melford & Bennink《Eleven Ghosts》（Leroy Carr、Joplin、boogie／stride）、Bennink + Douglas《Serpentine》（三首標準曲）、Cyrille《Duology》（旋律線、swing；實為 Ted Daniel／Michael Marcus 雙人組）、Lacy 等《Lumps》（Lacy 作曲主題、有音高樂器；池中 Lacy 多判靜）、Synopsis《Synopsis》（Traditional 借曲）、Cyrille／Dresser／Ehrlich《C/D/E》（「出奇地抒情」、Dixieland 曲）、Graves《Percussion Ensemble》（Graves 手鼓判暖先例）。
- 研究推翻（正文以研究稿為準，卡單欄位不動）：Explore 十三首；Imponderable Evidence Parker 吹次中音；Born to Be Wild、C/D/E 已汰。
- 留下但存疑、交評分裁定：Corsano《Cut》（改造簧管、弓拉持續音）、Favre & Centazzo《Dialogues》（鑼鈸）、Parker & Prévost《Imponderable Evidence》（鈸擦、15 分鐘）、Battaglia & Oxley《Explore》（Battaglia 兼浪漫旋律）、Pilz／Kowald／Lovens《Carpathes》（低音單簧管）、Oxley《Ichnos》（擴音打擊）、thin 多張（Fingerprints、Dada Da、Directly to Pyjamas、Trap Street、Kochuu 聲音只靠編制）。
- **定案 13 張**（a 2、b 2、c 4、d 5、e 0），不湊數。主場景見底：鼓獨奏多是現場（策展擋約 40）、或長音冥想（判靜）、或大鼓金屬（判重）；Graves／Cyrille 的手鼓與搖擺語彙往暖。能穩收的是**鼓＋單一尖細樂器的乾二重奏、鼓手領軍的歐陸自由即興小編制（Oxley、Turner、Lovens 系）**。**mc42 不再派**。
