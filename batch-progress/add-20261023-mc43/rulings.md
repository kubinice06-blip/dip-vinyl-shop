# add-20261023-mc43 裁定（情緒薄格策展線・冷冽：現代室內樂尖細二線＋mc4 續集）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 mc43、md31。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc43 列，可擴寫 mc4 當代古典快而冷、現代獨奏作品），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc43.json`（54 張）→ `master-mc43.json`（MB 回查 54/54 釘住、8 flag 皆為 artist credit 多掛作曲家，非撞）→ 主線汰 9（`master-override-mc43.json`）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc43-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。古典卡照 §0.7（mc32 先例）：artist＝演奏者／團體，盤名＝「作曲家: MB 正規名」，另帶 composer 欄；MB 只掛作曲家的盤（Dillon、Poppe《Interzone》、Nancarrow Vol.4）artist 照 MB 填作曲家。
> **預留：研究 a 21481–21490、b 21491–21500、c 21501–21510、d 21511–21520、e 21521–21530、鉤子 21531–21540、寫作 21541–21550、主線 21551–21560。**
---

## 主線策展（不佔條號）
- 策展 54 張（室內樂團 18、弦樂四重奏 14、獨奏與二重奏 13、鋼琴獨奏 6、人聲劇場 2、即時電子 1）全數 MB 釘住；moodGuess x 3.4–4.2、y −0.9～−0.2、z −1.9～−0.9。WebSearch 0 次。照 mc32 評分回饋優先收密集刮擦型（Lachenmann、Ferneyhough 系、Carter、Xenakis 系），少收極弱點描型。
- 去重：對 seed、全部 curation（含 mc32／mc4／mc40）0 撞；主線另對 origin 近 3 天所有 `claude/*` 分支 seed 與 10-22／10-23 卡單 0 撞；作曲家關鍵字對池再掃一次，無同演奏者同作品。Irvine Arditti《Caprices》mc40 已提，策展自撤。
- **主線汰 9**：
  - 同作品池中已有（mc32 同作品去重先例）：Berio Sequenza 兩套（Naxos《Sequenzas I-XIV》、Mode《The Complete Sequenzas…》；池有 EIC DG 版）、Ullén《Ligeti: The Complete Piano Music, Volume I》（池有 Aimard、Driver 的練習曲）、Pacifica《Carter: String Quartets nos. 2, 3 and 4》（池有 Arditti／Juilliard；留含第 5 號的《nos. 1 and 5》）、Nancarrow《Player Piano 5, Volume 3》（池有 1969 原錄音、MB 無日期；留 Vol.4）。
  - 能量貼邊（x 估 3.4，極弱／稀疏型評分常判靜）：Kwan《Haas: Trois Hommages》（微分音雙鋼琴偏催眠）、Arditti《Birtwistle: Complete String Quartets》、Diotima《Gervasoni / Pesson / Poppe》。
  - 色溫貼邊：Ensemble Recherche《Grisey: Vortex temporum / Taléa》（光譜派包覆，z −0.9）。
  - Saariaho 兩張（Descharmes 大提琴、Meta4 弦樂）x 估 3.4 貼邊，但是場景點名作曲家，留。

## 研究 b 組
- 21491　Aperghis《Works for Piano》（Hodges）：年份取 2009（Discogs／Europadisc／AllMusic 2009，錄音 2008-01；MB 2010-03-23 疑為 CD 上市日），yearVerified 2009。moodGuess 部分存疑：作曲家要求〈Les secrets élémentaires〉『不要彈得歇斯底里』，廠商文案強調『赤裸誠實、凝練』。
- 21492　Holliger《Lieder ohne Worte》：身分無誤（ECM 1618，1996-06 蘇黎世 Radio DRS 錄，1997-10-01 發行）。moodGuess 存疑：19 軌中 10 軌短於 3 分鐘，多為極弱短章；密集刮擦只有〈Trema〉（約 13 分鐘）。
- 21493　《The spectacular Heinz Holliger…》：編制與長度取自 NYPL 館藏紀錄（單一來源，Discogs 403）；並非全盤獨奏，有 Ursula Holliger 豎琴、Serge Collot 中提琴、Jürg Wyttenbach 大鍵琴／鋼琴參與的二、三重奏。年份 1970（MB／Discogs），NYPL 記荷蘭版 1971。聲音證據 thin，moodGuess『尖嘯、循環換氣』無來源。
- 21494　Holliger／Carter／Yun《Lauds and Lamentations》：ECM 1848/49 雙 CD（2001–02 蘇黎世）。moodGuess 一半成立：Carter 一碟機智尖細；尹伊桑〈Piri〉約 15 分鐘與慢樂章『幾乎飄浮』偏連綿，建議視為混合型。
- 21495　Diotima《Liturgia fractal》：Kairos 2009-06，2009-01-27～29 柏林錄音（錄音日期來源為搜尋摘要所引 Paladino PDF，我未能直接開啟，單一來源）。聲音證據僅〈Arborescencias〉一首現場樂評（開頭極弱、能量堆疊、安靜收尾），Kairos 頁面把曲名拼成 Aborescencias（誤）。moodGuess 部分存疑。
- 21496　Diotima《Simaku: Con-Ri-Sonanza》：無任何樂評或廠牌聲音描述（BIS 頁面不可開啟），只有樂章速度標示（Furioso、Vigoroso brutale 與 Adagio doloroso desolato、Calmo 交替）；moodGuess『一路高張力、無旋律』無法證實，status thin。
- 21497　Poppe《Chamber Music》：卡單 curatorRisk『取 ensemble mosaik』只部分成立：〈Tier〉是 Kairos Quartett、〈Rad〉是 Kobler／Surberg 兩位鋼琴家，mosaik 只演〈Holz〉〈Gelöschte Lieder〉。聲音查無第三方描述，『微分音、碎拍』無來源，thin。
- 21498　Poppe《Schrank》：編制混雜（虛擬 Hammond 電風琴、人聲獨唱 Wespe、鋼琴三重奏 Trauben、九人團體十一個極短樂章 Schrank、長曲 Salz），與『密集合奏、尖銳木管』預估有落差。發行年 MB 2012-06 對 Kairos 官網 2013-06，暫取 2012，uncertain。
- 21499　Michel-Dansac《14 Récitations》：**現場錄音**（Wien Modern 2001-11-16 首次完整演出，col legno 2006 出版，Discogs 明載 live recording），違反『只收錄音室正規專輯』，建議移除；若留，有『首度完整演出實況、Wien Modern Edition 第 1 號』的歷史定位，或改釘 Michel-Dansac 2016 Umlaut 錄音室版（未查 MB）。
- 21500　本組 WebSearch 用 3 次（Hodges、Posadas、Holliger 1970）；其餘靠 MB／Discogs API 與 WebFetch。Simaku、Poppe 兩張的聲音因額度用盡而 thin，如需補強請另派。

## 研究 a 組
- 21481　Arditti《Neuwirth: Chamber Music》：moodGuess 存疑。六曲只有兩首弦樂四重奏（約 18 分鐘），其餘為小提琴＋鋼琴、獨奏中提琴達摩爾、兩小提琴＋getabera、鋼琴＋錄音帶；Kairos 只說『斷裂、變形、突轉』，無樂評證實刮擦密集。2001 年 7 月科隆錄音、2005 發行，原創錄音室專輯。Kairos 與 Discogs 對第 4 首編制不一（getabera／鋼琴），facts 採 Kairos。
- 21482　Arditti《Nancarrow: Quartets and Studies》：moodGuess 部分存疑。14 軌中 4 軌是 Nancarrow 遺產 Ampico 自動鋼琴播放（非弦樂），第 1 號四重奏為早期作品（含 Andante moderato 慢樂章），只有第 3 號與研究曲改編是速度卡農；沒有可開啟的樂評。第 1 號年份來源三處不同（約 1942／1945／1942-45），facts 不寫。
- 21483　Arditti《Haas: Ein Schattenspiel / SQ 4 & 7》：moodGuess 存疑（x 可能偏高）。來源描述為現場電子延遲疊影、微分音混合、後段七和弦、音團收尾，無任何『刮擦、刺耳』說法；三首各 23-26 分鐘長曲，聽感可能偏持續音場。發行日 2020-02-19（Discogs）採用，搜尋摘要的 2021 視為零售上架日。
- 21484　Arditti《Guerrero: Zayin》：moodGuess 存疑，『密集刮擦』無來源。八首中三重奏五首、四重奏兩首、獨奏小提琴一首（16 分半）；Guerrero 1997-10-19 辭世，錄音（1997-12 起）為身後錄音。Zayin 各首年份 Discogs 與兩種維基三處不一，facts 只採 Discogs 曲目表標示。西文維基未載跟 Xenakis 學習，不寫師承。
- 21485　Klangforum Wien《Aperghis: Contratemps…》：status thin。無樂評或聲音文案（Kairos 只說譜面雙譜表、技術艱難）；四曲為女高音＋樂團、樂團兩首、獨奏低音提琴。誰指揮哪首、Michel-Dansac 與 Fussenegger 對應曲目，來源未分，facts 不配對。拼寫 Contretemps（Kairos、Discogs）勝 MB 的 Contratemps。moodGuess『抽搐、口技』未獲本盤證實。
- 21486　Klangforum Wien《Neuwirth: Vampyrotheone…》：moodGuess 存疑（y）。Discogs 編制二十多位演奏者含銅管五支、電吉他、手風琴、現場電子與 CD 播放器，無取樣器；屬厚重大編制。三段 Instrumental-Inseln 抽自歌劇《Bählamms Fest》。發行月份 Kairos 2001-12、MB 2001-11，年份同為 2001。
- 21487　Cassidy《The Crutch of Memory》（ELISION）：moodGuess 部分存疑。全盤為獨奏與小型編制（小提琴、人聲、低音單簧管、薩克斯風、長號），非室內樂團合奏；長號 13 分鐘是強音器高音域輕聲哀鳴；樂評確有『鞭打般突轉』『猛烈怪誕』。MusicWeb 負評與 New Music USA 正評並列。
- 21488　ensemble recherche《Illés: Watercolors and Psychograms》：moodGuess 部分存疑。Kairos 文案確認『身體手勢、能量』，但沒有說快或密；三首 Psychogram 是 10-13 分鐘獨奏，Watercolors 第一樂章僅 1 分鐘，可能極稀疏；找不到獨立樂評。獨奏者與 Psychogram 的對應未見來源，facts 不配對。
- 21489　Arditti《Reynolds: Coconino… / Visions》：盤名簡化，實為 2 CD 五首（另含 Kokoro 獨奏小提琴、Ariadne's Thread 加電子、Focus a Beam 獨奏大提琴），共 97 分 40 秒；卡單盤名只列前兩首。moodGuess 部分存疑：段落標示一半 Fierce／Relentless／Anguished，一半 Tranquil／Glowing／Floating／Quietest，是動靜交替，非全程緊繃。無獨立樂評。錄音 1994/96、出版 2000，是否首發未查證。
- 21490　本組 WebSearch 用 3 次（Haas 評論、Cassidy 評論、Nancarrow 評論）；其餘靠 MB／Discogs API 與 WebFetch。九張皆為錄音室正規專輯（無現場、無精選）；推翻策展層：0 處年份／廠牌／盤名，唯 Reynolds 盤名不完整。聲音事實薄的 Aperghis 標 thin，如需補強請另派。

## 研究 c 組
- 21501　Michel-Dansac《Aperghis: Machinations》：樂評（LaFolia 2006）稱此碟為現場演出的聲音，MB 未標 live；研究稿照實寫「演出聲音」，上線前請主線決定是否標現場。作品 2000-05-06 Witten 首演，唱片 2003-04-29 Accord。聲音符合躁／輕／冷，但樂評亦用「感官、誘人」，非純冰冷。
- 21502　Kreutzer《Finnissy: Second & Third String Quartets》moodGuess 存疑：第三號占全碟約七成（44 分），逐漸碎裂、遲疑，結尾由錄音鳥聲取代樂手，BBC 樂評稱「令人振奮」；只有第二號（19 分）較貼近粗礪躁動。作曲年份未查到不寫。
- 21503　Ruck《Mahnkopf: Hommage à György Kurtág》moodGuess 存疑且 thin：查無樂評，只證實 63 分鐘的吉他協奏曲、五位次要獨奏、八分之一音旋律，作曲家描述 Kurtág 為憂鬱、回顧；密度速度無來源。發行日三說（MB 2013、Apple 2013-10-18、Radio Times 2014-01-20）。建議視為可汰換候補。
- 21504　Veale《Mahnkopf: Pynchon Cycle》：聲音最符合預估（Courier's Tragedy 刮擦嗡鳴、W.A.S.T.E. 靜電嘶聲、D.E.A.T.H. 電子持續音）；唯 Tristero System 為約 14 人厚重編制。Tristero System 年份 MB 曲名 2002、shipwrecklibrary 2001，兩說並存；卡單 Veale 只演第三首，另有 Franklin Cox（大提琴）、SurPlus／Avery（第一首），已寫入 facts。聲音全來自單一部落格轉述樂評，寫作請用「樂評形容」口吻。
- 21505　asamisimasa《Steen-Andersen: Pretty Sound》moodGuess 部分存疑：貼麥克風的氣音、嘶聲、膠帶鋼琴、擴音器警笛，偏即興稀疏而非持續緊繃；Audiophile Audition 評其「分析多於享受」。發行日 Dacapo 2011-01、Europadisc 2011-02-28，取 2011。
- 21506　Klangforum Wien《Lachenmann: Mouvement…》：推翻 curatorRisk 的演奏者一節——Mouvement 與 zwei Gefühle 是 Klangforum／Hans Zender，Consolation I/II 是 Ensemble Aisthesis＋Schola Heidelberg（Consolation II 為 Walter Nussbaum 指揮），為人聲合唱曲；zwei Gefühle 有朗讀者。moodGuess 存疑：Mouvement 開頭稀疏點描加靜默，約四分之三處才有塔蘭泰拉式高潮，全碟 1／3 為人聲曲。錄音年份 1995–2000（Wikipedia 稱 1998），首發 MB 2001。
- 21507　Sugawara《Lachenmann: Got Lost》moodGuess 存疑：Got Lost 是女高音（Yuko Kakuta）與鋼琴，以氣息低語為主；String Trio 是 1965 早期作；Serynade 為 30 分鐘七段鋼琴獨奏。未查到鋼琴內部刮擦的證據。Sugawara 是作曲家妻子、鋼琴手。錄音日期（搜尋片段稱 2016-01）無可開啟頁面佐證，只寫在 notes。
- 21508　Poll《Berio / Schnittke / Boulez: Solo Violin Works》thin：EMI Digital Debut 數位專輯（MB 格式 Digital Media，2012-02-20），查無樂評與錄音細節；Boulez Anthèmes 實際有長而靜止的和聲音與激動段落交替，非全程急促。moodGuess 無法驗證，列汰換候補。
- 21509　Descharmes《Saariaho: L'œuvre pour violoncelle》moodGuess 存疑：MusicWeb 描述海景、波浪、漸弱、易逝的蝴蝶，僅 Près 中段詼諧曲有力量，與策展自陳「x 3.4 貼邊」一致；列汰換候補。錄音 2004-09 IRCAM。
- 21510　本組 WebSearch 共 13 次（Machinations 2、Finnissy 1、Ruck 1、Veale 2、asamisimasa 1、Mouvement 1、Got Lost 1、Poll 2、Saariaho 1，另有一次與 Ruck 同卡），每張皆未逾 3 次；Discogs 403、DuckDuckGo 被驗證擋，主要靠 WebFetch 與 MB API。

## 研究 e 組
- 21521　Klangforum Wien《Reiter》thin：聲音面查無樂評或廠方描述，只有編制（五首接電子／踏板／transducer）；moodGuess 存疑——策展寫的「古大提琴」六首編制裡沒有（實為低音直笛、低音長笛、單弦琴 dan bao、踏板），「氣音、刮擦、碎拍」無來源。Allmusic 標 2019-01-04，廠方與 MB 為 2018-12，取 2018。
- 21522　Bieri《Contrechant》moodGuess 存疑：MusicWeb 稱整體「大多相當輕柔、短慢稀疏、旋律近乎缺席」，屬極弱稀疏型為主，僅 Holliger〈Contrechant〉與 Carter〈Gra〉急促炫技；x 3.5 偏高，建議降或視邊緣。專輯正式名《Contrechant: Music for clarinet solo》，ECM 2209，2010-09 錄於 Propstei St. Gerold。
- 21523　Damiens 專輯：原版是 1988 Adda 581066（Discogs），MB 掛的 Accord 為 1996 再版，名稱以 Adda 為準；Discogs 標 Donatoni〈Clair〉為 1972 疑誤，facts 不寫其年份。聲音面無樂評，靠作品資料（Domaines 游移電聲般音效與顫音、In Freundschaft pp／ff 兩層）；Stravinsky 三首與 Berio〈Lied〉偏旋律，輕度存疑。
- 21524　Yejin Gil《Fulgurances》推翻策展層：Boulez 實為〈Incises〉（1994／2001），非奏鳴曲；Ligeti 為練習曲第三集四首，Messiaen 為《四首節奏練習曲》加《二十凝視》第六首。聲音大致成立（陳銀淑、Messiaen 快密硬），Ligeti 第三集與 Messiaen 末曲偏稀疏。
- 21525　Dillon《The Soadie Waste》：演奏者 Noriko Kawai、Hiroaki Takenouchi、Irvine Arditti、Arditti Quartet（MB 只掛作曲家）。「強奏頻繁、有力圖形織體」支持躁；「冷」「無旋律」只靠新複雜主義標籤，標題曲是舞廳意象，色溫存疑；Traumwerk、black/nebulae 查無樂評。
- 21526　Meta4《Saariaho Vol.1》moodGuess 強烈存疑，建議汰換：評論明指全盤「輕柔開始、輕柔結束、缺乏節奏能量」，Tocar 旋律性、Vent nocturne 抒情、Calices 有奏鳴曲式，錄音溫暖平衡；且只有 Nymphéa 是四重奏。推翻策展層：《Terra Memoria》在第二集（ODE 1242-2，2016），不在本集。
- 21527　Oslo Sinfonietta《Chambered Music》thin：Praesens 噪音質地、標題曲含近乎聽不見的舞台外長號（極弱）；Amid、Besides 聲音查無描述。2026 Premio Abbiati 得獎、2025 Charles Cros Coup de Coeur。部分 moodGuess 存疑。
- 21528　Aleph《Recital》thin、moodGuess 存疑：「刮弦與碎拍」無來源；Haas 一首是純泛音和弦對微分音拍頻，偏迷濛震盪；Furrer 含女高音、Hechtle 含單簧管、Oehring 含預錄帶，並非純四把吉他；聲音面查無樂評。
- 21529　Poppe《Interzone》：artist 掛作曲家，演奏者 Omar Ebrahim、Neue Vocalsolisten、ensemble mosaik、Stockhammer。錄於 2004-09 Haus der Berliner Festspiele，是否現場未能確認（策展說錄音室未證實）。MusicWeb 負評，描述音高彎曲、音群、碎小重複，但有相對平靜的引子與 12 分鐘長木管線條的〈Broken Pieces〉；「微分音人聲」未證實，輕度存疑。
- 21530　本組 WebSearch 共 13 次，每張皆不超過 3 次；皆為錄音室專輯、無選輯或重複卡、無建議移除。thin 為 Reiter、Oslo、Aleph（聲音面無樂評）。

## 主線研究後汰換（不佔條號；2026-10-23）
- 照 md28／md29 先例：**來源自己寫出稀疏極弱、抒情旋律、厚重大編制、現場錄音的汰**；只是查無樂評（thin）的留給評分驗收。**45 張汰 13**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 稀疏極弱／緩慢（體感判靜，mc32 Kurtág 格言小品先例）：Zehetmair《Holliger: Lieder ohne Worte》（多為極弱短章、安靜輓歌）、Arditti《Haas: Ein Schattenspiel…》（電子延遲疊影與持續音場、三首各 23–26 分）、Kreutzer《Finnissy: 2nd & 3rd》（第三號碎裂遲疑、鳥聲收尾）、Sugawara《Lachenmann: Got Lost》（氣息低語、30 分鐘鋼琴獨奏）、Descharmes《Saariaho: 大提琴》（海景、漸弱、蝴蝶）、Meta4《Saariaho Vol.1》（評者：輕柔開始輕柔結束、缺乏節奏能量）、Bieri《Contrechant》（大多輕柔、短慢稀疏）、Aleph《Haas / Furrer…》（泛音拍頻迷濛震盪、含女高音與預錄帶，無聲音來源）、Arditti《Harvey: Complete String Quartets & Trio》（頻譜式長線條、32 分鐘第四號＋電子）。
  - 抒情／旋律：Ruck《Mahnkopf: Hommage à Kurtág》（63 分鐘吉他協奏曲、憂鬱回顧）、Swiss Chamber Soloists《Happy Birthday Elliott Carter!》（女高音與長笛大提琴抒情段多）。
  - 厚重大編制：Klangforum Wien《Neuwirth: Vampyrotheone…》（二十多人、五支銅管＋電吉他＋手風琴＋電子，判重）。
  - 現場錄音：Michel-Dansac《Aperghis: 14 Récitations》（Wien Modern 2001-11-16 首次完整演出實況，研究 b 組）。
- 卡單更正：Damiens《Stravinsky / Boulez / Denisov / Stockhausen / Berio》廠牌 Accord→**Adda**（1988 原版 Adda 581066，Accord 是 1996 再版；研究 e 組）。研究 a 組：Reynolds 盤實為 2CD 五首；研究 c 組：Lachenmann《Mouvement》演奏另含 Ensemble Aisthesis＋Schola Heidelberg、指揮 Hans Zender；研究 e 組：Gil 盤的 Boulez 是〈Incises〉。下游以研究稿為準。
- 留 32（a 7、b 7、c 5、d 7、e 6）；叫回策展代理補 12 張候補（密集刮擦、急促炫技型，每張附文案／樂評原句證明緊繃密集）。

## 主線補候補（不佔條號；2026-10-24）
- 策展代理補 12 張（`supplement: round2`，每張附 `copyQuote` 證明緊繃密集；MB 釘住 8、§1 人工 4）。
- 主線汰 7：同作品池中已有（mc32 先例）——Han Chen、Thomas Hell、Ullén Vol.2 三套 Ligeti 練習曲（池有 Aimard、Driver）、JACK《Lachenmann: Complete String Quartets》（池有 Arditti 同三首）、Takahashi《Xenakis: Works for Piano》（池有 Thomopoulos 全集）；Takahashi《Xenakis: Works With Piano》（《Eonta》五支銅管，y −0.2 貼邊）；Arditti《Carter: Quintets and Voices》（兩首人聲作品，鋼琴五重奏與既有 Carter 盤重疊）。
- 收 5 張進卡單（c 組追加 3、e 組追加 2），卡單共 37 張；人工身分 3 張（Mode《Lachenmann: …zwei Gefühle… and Solo Works》、Huebner《Reynolds: Piano Etudes》、Veale《Mahnkopf: Music for Oboe》）。派兩支補研究 append 進 c、e 研究稿。

## 補研究（e 組追加）
- 21528　補研究（Huebner《Reynolds: Piano Etudes》）thin、moodGuess 部分存疑：Mode 廠牌頁與 Reynolds 官網樂曲說明（Thomas May）確認 mode 329、十二首、2021、作曲家監督首錄；卡單盤名多「, Books I & II」副標（Discogs 命名，同一張）。Barrage、Mercurial、Migration、Insistence 密集快速成立，但 Web 作曲家明言非常安靜，Concatenation 後半、Field、Rips 偏慢冥想，且作曲家刻意避免「臨床」感，冷／乾硬無來源；錄音地點（UCSD Prebys）僅搜尋片段，不進 facts。無獨立樂評。
- 21529　補研究（Veale《Mahnkopf: Music for Oboe》）thin、moodGuess 部分存疑，列汰換候補：NEOS 11813、2018、Veale 雙簧管確認；末曲〈Hommage au hautbois〉有 ELISION 合奏（Ughetti 指揮），並非全是獨奏／二重奏。「硬、近乎殘暴、醜陋」只對 Pynchon 系列〈W.A.S.T.E. 2〉（雙簧管加磁帶）有作曲家自述支持；三首 Illuminations 是 mezza voce、踏板霧狀共鳴，Solitude-Nocturne 是「甜」的小雙簧管；無樂評、無錄音日期，非現場證據。
- 21530　補研究 WebSearch 共 2 次（Huebner 1、Veale 1），皆不超過 3 次；Discogs 403、UB 網頁 Access Denied、MB API busy，改靠 Mode、NEOS、Reynolds 官網與維基。兩張皆錄音室專輯、無重複卡。

## 補研究（c 組追加）
> 條號 21508–21510 已被 c 組原稿占用（Poll、Descharmes、WebSearch 統計），本小節沿用主線指定號碼，以 `-補` 區分：21508-補、21509-補、21510-補。
- 21508-補　Ensemble 21《Eckardt: Out of Chaos》（Mode 137，2004）：身分無誤。moodGuess 大致成立（高能量新複雜主義、五到七人小編制、爆發與近靜默交替），但 Tangled Loops 是爵士式薩克斯風追逐、A Glimpse Retraced 有稜角抒情與尖銳短笛旋律，After Serra 結尾與 Polarities 後段轉為安靜靜止，非全程無旋律或持續緊繃。錄音日期未查到，棚錄或現場無直接證據（樂評未提現場），暫視為棚錄。status solid。
- 21509-補　Arditti Quartet《Mexico: New Music for Strings》（Mode 165，2006）：身分無誤；錄於 2002 年墨西哥城 Radar 音樂節期間（Mode 頁），發行 2006，是否現場未明載。moodGuess 大致成立（橋上奏刮擦、微分音、白噪音、攻擊性動機），但 Paredes《Uy u'tan》被稱『光亮之美』、Waller 有狂想段落、Romero『粗礪的冥想』，並非一路尖細冷硬。獨奏小提琴三首為 Irvine Arditti，其餘三首四重奏。status solid。
- 21510-補　Lachenmann《„…zwei Gefühle…“ and Solo Works》（§1 人工，Mode 252）：核對無誤，盤名 Mode 頁作《Zwei Gefühle and Solo Works》、2012 年 CD（Discogs API 13642059 與 Silverton 樂評皆為 2012），錄於 2010-03-27/28 紐約州 Troy 的 EMPAC 音樂廳，Mode 明載『studio recordings』，非現場。演奏者：Lachenmann 本人（朗誦、鋼琴）、Lauren Radnofsky（大提琴）、Ensemble Signal／Brad Lubman。與前段 Klangforum Kairos 盤同曲不同錄音，非重複。moodGuess 部分存疑：Pression 與 zwei Gefühle 符合，但約 40 percent 篇幅是鋼琴短曲（Wiegenmusik、Guero、Ein Kinderspiel），Kinderspiel 七首多在最高音區，較稀疏輕巧，甚至帶玩笑。status solid。本次補研究未用 WebSearch（Mode 廠牌頁、MB API、Discogs API、維基已足夠）。

## 主線補研究後汰換（不佔條號；2026-10-24）
- 汰 1：Veale《Mahnkopf: Music for Oboe》（三首 Illuminations mezza voce、踏板霧狀共鳴，Solitude-Nocturne「甜」的小雙簧管；只有〈W.A.S.T.E. 2〉兇，整張偏柔偏稀疏）。
- 留 Eckardt、Arditti《Mexico》、Mode《Lachenmann》、Huebner《Reynolds》（皆「部分存疑」：主體緊繃密集、夾安靜段落，交評分驗收）。補研究條號與原組重號（21508–21510、21528–21530），以小節區分。
- **定案 36 張**（a 7、b 7、c 8、d 7、e 7）。主場景二線大多錄音是稀疏極弱型或與池中同作品；密集刮擦型已挖得差不多，**本場景見底，不再派**。

## 鉤子層（d、e）
- 21536　交件 `desc-tools/batches/hooks/add-20261023-mc43-hooks-d.json`（7）、`-hooks-e.json`（7），key 逐字照研究稿、順序不變。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 上限 170、full 230。逐筆（預算／hook 原始字元／加權）：d1 full 222／19／15.5、d2 full 226／29／25、d3 thin 160／25／20.5、d4 thin 168／23／21、d5 thin 169／21／18、d6 thin 162／18／18、d7 thin 165／24／22、e1 thin 170／21／21、e2 full 227／25／22、e3 full 218／23／23、e4 full 224／23／23、e5 thin 167／18／18、e6 full 222／20／20、e7 thin 164／17／17。初稿 14 張全數超標（英文專名密度高，thin 尤甚），一律整格捨去：Krannert 錄音地、Carter 曲目年代細目、Urlicht 廠牌、LaSalle 推廣第二維也納樂派、Hurel 十四人編制與《Opcit》、Nancarrow 打鋼琴捲動機（讓給 a2）與 Study 42／48、Knox 的 Kurtág／Dillon／Dusapin／Sciarrino 曲目、Reiter 的 Kairos 年份、Damiens 的 Stravinsky 小品與 Stephens 名字、Gil 的 Charles Cros 獎與末曲、Dillon 的標籤異議與 housie housie 副標、Steen-Andersen 的〈Praesens〉、Poppe 的指揮與錄音地、Reynolds 的「禪式專注」原話。壓完逐張回核 hook 依賴格：除 d5（獎項在 g3，全卡只三格）外都在 g1／g2；d3 的「序列時期」由 hook 自帶、facts 有 src。
- 21537　骨架歸屬（14 條各一張，各張 note 只寫自己的歸屬句）：d1＝全集首張即得 Grammy；d2＝同一批樂手輪番組隊錄作曲家近半世紀室內樂；d3＝序列時期的起點作品；d4＝受題獻者首演隔年出唱片；d5＝作曲家得大獎同年的作品集；d6＝委託人最後一次委託（布吉伍吉組曲）；d7＝四重奏前團員錄自己首演過的樂章；e1＝原聲樂器接電子／作曲獎促成委託；e2＝IRCAM 獨奏家一人吹遍二十世紀獨奏曲；e3＝大賽得名鋼琴家的三套練習曲；e4＝曲名來自家鄉老舞廳（地方場景：格拉斯哥）；e5＝舞台外幾乎聽不見的長號／早期作品回顧；e6＝小說當結構模型、三方合作；e7＝開放曲序、演奏者當共同創作者。對 a–c 已交件稿避讓：「作曲家身後開錄」歸 a3（d6 的 Study 48 身後首演整格不用）；「不滿人手改用自動鋼琴」歸 a2（d6 改走委託軸）；「首張個人專輯／錄音首作」a–c 已有 c5、c6 兩張（請主線複核這兩張是否同構），e3 因此拿掉「首張個人錄音」改走三套練習曲；「一位管樂手吹六位作曲家」與 b2 形近，e2 hook 改成「二十世紀的獨奏曲」。
- 21538　hook 四型：懸疑（e6、e7）／斷言（d1、d3、d5、e1）／場景（d2、d4、d6、e4、e5）／人物定調（d7、e2、e3）。開頭前四字 36 張互異，也對 hooks 目錄全部舊檔掃過（e1 原稿「六首裡有」撞 c184，已改）。古典卡開頭兩句交代作曲家與演奏者：hook 只帶身分或不帶名字的（d1、d4、d5、d6、e1、e3、e4、e5、e6、e7），第二句一律補名；artist 掛作曲家的 d6、e4、e6 也具名演奏者（d6 Hocker 只寫「掛名」，角色未查到）。媒體名與名次未進 note（Gramophone／MusicWeb／紐約時報等評語一律寫「樂評說」「被形容為」，Tim Page 不具名）。
- 21539　「他／她」引入法與第二句句型配表：Carter——d1 作品＋生年括號、d2 普立茲身分、d3 作曲欄；Nancarrow——d6 移居墨西哥（a2 用國籍＋動機）；Reynolds——e7 名字＋開放曲序（a7 用轉行＋普立茲）；Poppe——e6 三方合作（b6 生年學歷、b7 指揮職位）；Steen-Andersen——e5 樂器劇場身分、句首由樂團領（c3 用國籍生年）；Irvine Arditti——d2 小提琴手、e4 小提琴家（c7 創團者）；Boulez——d5 樂團創立者、e2 曲目欄、e3 大賽指定曲作者。第二句句型逐張：d1 作品與作曲家／d2 普立茲身分／d3 雙棲身分／d4 創團年地／d5「由」字句／d6 掛名者／d7 名字／e1 主修／e2 樂器身分／e3「她是」／e4 自學／e5 樂團／e6 三方合作／e7 揭曉答案；對 a–c 的國籍、學歷、移居年份、生年、生年與出生地各型都已避開（d3、d6、d7、e2、e5、e7 為此改過）。
- 21540　日期：14 張 note 全寫到月或年，「日」後一字無命中（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）。hook 間中文 4-gram 掃 36 張 0 條；hook 與自身 note 無逐字重句（只剩人名 Sessions）。研究層存疑項照辦：d1 Grammy 單源照「2009 年 Grammy 最佳室內樂演出」寫；d4 Rosenberg 不寫第幾號受委託；d6 不寫 Bösendorfer／重錄；d7 不掛 Naïve 唱片獎；e1 不寫古大提琴入編制（只作主修）；e3 Boulez 照研究稿寫〈Incises〉；e2 廠牌照主線更正寫 Adda、1988；e4 化學氣味保留「據說」；e7 盤名不帶 Books I & II、年份 2021 依 21528 補研究。`node qa-batch.mjs hooks add-20261023-mc43` 全部通過；`node chk-hook-crossgroup.mjs add-20261023-mc43`（5 組 36 張）全部通過。

## 鉤子層（a、b、c）
- 21531　交件：`desc-tools/batches/hooks/add-20261023-mc43-hooks-a.json`（7）、`-b.json`（7）、`-c.json`（8），key 逐字照研究稿（汰換後現況）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權）：a1 211/27、a2 218/23、a3 224/24、a4 163/22（thin）、a5 205/21、a6 215/18、a7 217/23；b1 227/21、b2 215/21.5、b3 226/21.5、b4 224/16、b5 153/19（thin）、b6 163/18（thin）、b7 196/20；c1 226/19、c2 230/21、c3 227/16、c4 215/16、c5 169/23.5（thin）、c6 221/22、c7 212/24、c8 227/18。hook 原始字元 16–27，全數 ≤30。初稿全數超標，整格捨去：Neuwirth 的 IRCAM、Nancarrow 的 1989 舊錄、Guerrero 得年、Holliger 的作曲家名單、尹伊桑盤的世界首錄數、Posadas 首演、Simaku 的速度標示細目、Poppe《Schrank》的歌劇與 Beyer、Machinations 的 ATEM 與首演日期、Pynchon 的靜電處理、Lachenmann 的樂器要求與《zwei Gefühle》、Eckardt 的〈Tangled Loops〉、Mexico 盤的 Siemens 獎與 Sosa、Mode 盤的巡演。壓完後逐張回核：hook 依賴格全在 g1／g2（a5、a7 併格前移）。
- 21532　骨架歸屬（22 張 22 條，各張只寫自己的歸屬句）：a1 編制拼盤；a2 遺物樂器修復上陣；a3 作曲家身後錄音；a4 樂團盤裡的一首獨奏；a5 第一張專屬唱片；a6 情緒副題系列；a7 演奏者聲音轉成電子素材；b1 作曲家給演奏者的指示；b2 為演奏家而寫的曲目樣本；b3 政治迫害（綁架）的作曲家；b4 師承＋逐樂章碎形；b5 移民作曲家在場錄音；b6 掛名者只演部分；b7 拆軌編成戲劇；c1 音樂劇場只剩聲音；c2 記譜逼演奏者失敗；c3 改造樂器＋貼麥克風；c4 標題意象；c5 作品源自作曲家童年記憶（不走「新人首作」，讓給 e3）；c6 作曲家與鋼琴家共組樂團；c7 地方場景（墨西哥城音樂節）；c8 作曲家親自上場。hook 四型：懸疑 a3、b3、c2、c4／斷言 a4、a7、b4、b6、b7、c5／場景 a1、a2、b5、c1、c3、c7／人物定調 a5、a6、b1、b2、c6、c8。開頭前四字 36 張互異，也與 mc32／mc40／mc41 已寫成卡片首句不同。古典卡開頭兩句交代作曲家與演奏者：hook 只帶身分者，note「第二句」指派補名字。
- 21533　同人分軸與「他／她」引入法：Aperghis 三張——a4 獎項（首屆 Kagel 獎、生於雅典）、b1 生年＋雙親是希臘藝術家（Kagel 獎不帶）、c1 身分（音樂劇場作者，ATEM 已捨）。Holliger 兩張——b2 比賽成績（1959 日內瓦）、b3 樂器（雙簧管家）。Poppe 兩張（另有 e6）——b6 學歷（ZKM 演算法作曲）、b7 指揮台（不寫 1998 年與 mosaik 成員身分，讓給 e6）。Lachenmann 兩張——c4 美學主張（器樂具象音樂；Nono 學生與斯圖加特出生 mc32 已用，不帶）、c8 親自朗誦與彈琴。Arditti Quartet 五張——a1／a2／a7 只當演奏者、a3 委託者、c7 創團人 Irvine Arditti 獨奏（1974 創團、Siemens 獎都不帶）。跨組：Nancarrow 的「嫌人手／不滿演奏者限制」讓給 d6，a2 改走速度卡農；Steen-Andersen c3 走生年＋Rostrum、e5 走樂器劇場；Reynolds a7 走工程物理＋普立茲、e7 走練習曲次序；Eckardt 的重金屬吉他背景三張都沒派（c6 走 Ensemble 21 創團）。Guerrero（a3）與 Posadas（b4）同屬碎形源流：a3 寫先驅、b4 寫師承＋每首一種模型。
- 21534　第二句句型配表（逐張不同）：a1 國籍、a2 速度卡農、a3 委託、a4 獎項、a5 流派、a6 師承、a7 轉行經歷、b1 鋼琴家生年與出生地、b2 比賽成績、b3 寫完第一格（尹伊桑綁架與 Holliger 主奏合句）、b4 數學方法、b5 移居年份、b6 學歷、b7 指揮職位、c1 作品副題＋Michel-Dansac、c2 小說＋Veale、c3 作曲家親自指揮（e5 已由樂團領句，避開）、c4 美學主張、c5 生年與國籍、c6 創團年、c7 時間地點、c8 作曲家上場的身分。「日」後一字：只有 a3「19 日在」一處，其餘 21 張只寫到年或月。媒體名一律不進 note（寫「樂評形容」「廠方說」）；年度榜、Radio France 推薦、SoundStage 十大皆不派。研究稿「uncertain」格：b7 發行年（2012／2013）不寫，note 指定「年份只寫錄音年」；c1 是否現場不寫。Reynolds 照研究稿寫 2CD 五首；Lachenmann《Mouvement》寫 Klangforum＋Zender，合唱交給 Aisthesis＋Schola Heidelberg。
- 21535　自查：hook 之間 4-gram（含 d、e 兩組共 36 張）0 條；hook 對 mc32／mc40／mc41 已上架首句掃出的殘片已改掉「寫給這支」「四首曲子」「先錄好的」「一首曲子」「封面掛名」五處，剩下的是樂器名或「首四重奏」類編制詞。hook 與自己的 note 無逐字重複句（c4 note 不重述標題意思）。hook 自驗改了三處：a1 原稿「六種編制」（實有兩首四重奏）、b6 原稿「其餘交給四重奏與兩位鋼琴家」（小提琴練習曲演奏者未載、Surberg 也是 mosaik 成員）、a7「這四位樂手」改「四重奏團員」。`node qa-batch.mjs hooks add-20261023-mc43` 全部通過（一處「Consolation I／II」曲名誤判已拆寫）；`node chk-hook-crossgroup.mjs add-20261023-mc43` 36 張全部通過。

## 寫作層（writer-2）
- 21546　交件 `desc-tools/batches/output/add-20261023-mc43-out-2.json`（18 張，c5–c8、d1–d7、e1–e7，key 逐字同序）。字數：full／solid 9 張 211–237，thin 9 張 158–179（qa-batch 兩檔 thin 共 12 張，全 ≤180）。初稿 Carter《Chamber Music》252、Steen-Andersen 186、Dillon 244 超標，整格縮寫（去「法國廠牌」、去「唱片」主詞、去「小提琴家」頭銜）壓回。
- 21547　兩段鉤子層衝突以 a、b、c 段（21531–21535）為準；實際只碰到評語寫法：note 的「樂評形容／樂評說／被形容為／廠方說」（Eckardt、Mexico、Lachenmann、Gil、Dillon 五張）一律改成不掛來源的聲音描述，媒體名與名次 0 處。古典卡開頭兩句交代作曲家與演奏者：Damiens 把六位作曲家併進第二句、Gil 把陳銀淑／Ligeti／Messiaen 併進第二句、Poppe 把朗誦者與兩個團併進第二句、Dillon 把演奏者併進第二句。
- 21548　Dillon 的 hook 原文帶「據說」（21540 鉤子層 e4 保留），寫作層無權改 hook，照抄；正文其餘部分不用「據說／據傳」。請主線審稿決定是否改 hook。
- 21549　第二句句型照 note 指派逐張走；「作曲家」身分詞撞 `國作曲家` ×6（含 writer-1 兩張），我方四張改成「美國作曲人」「德國人」「美國人」「法國人」「這位丹麥人」；發行句逐張配不同領頭：交給 Mode 發行／到年由 Mode 推出／Mode 的 CD 晚兩年問世／首錄年由 Mode 出版／Montaigne 在年出版／Montaigne 年推出／Adès 年推出／NMC 的發行年份是。
- 21550　自掃：與 out-1 合掃中文 4-gram 3 次以上 0 條（最後一輪 writer-1 改稿後長出 `一把小提琴` ×3，我方 Mexico 那張已拆）。`qa-batch out` 全部通過、`qa-check-research` 標記 0、`fix-spacing` 待補 0。

## 寫作層（writer-1）
- 21541　交件 `desc-tools/batches/output/add-20261023-mc43-out-1.json` 18 張（full 15：189–240；thin 3：Aperghis《Contretemps》152、Simaku 144、Poppe《Chamber Music》166）。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（0）全過。初稿無超標；自查時整格拿掉四處 note 以外的延伸描述（Neuwirth「難以預料」、Illés「隨肢體起落」、Reynolds「緊繃與飄浮輪流」、Poppe《Schrank》編制切換句——後兩者是 facts 有、note 沒列）與 Machinations 的「快速」。
- 21542　衝突裁定：rulings 鉤子層兩段描述衝突時以 a、b、c 段（21531–21535）為準；本組 18 張全落在 a–c 段的配表裡，第二句領句全照 note 指派。古典卡開頭兩句交代作曲家與演奏者：hook 未具名者第二句補齊（Cassidy 卡把 ELISION 併進第二句；Lauds 卡的 Holliger 併進尹伊桑那句；Pynchon 卡同句帶出 Veale；Machinations 卡同句帶出 Michel-Dansac）。
- 21543　樂評／廠方轉述一律改成不掛來源的陳述：Neuwirth「廠方形容…」→ 音樂充滿斷裂、變形與突轉；Cassidy「樂評稱第一張…」→ 直述為事實、「樂評形容輕聲哀鳴」→ 聲音壓得極輕；Lauds「樂評說驚人強度」→ 吹奏繃得極緊、強度驚人；Posadas「一篇樂評形容」→ 從近乎無聲的弱音一層層堆出巨大能量；Machinations「樂評形容」→ 人聲在哀鳴、吐氣…之間切換；Aperghis／Illés／Schrank 的「廠方說」→ 直述。媒體名與名次 0 處；「據」0 處。Posadas 的「被作曲家稱為」屬作曲家自述，改寫成直述編制（小提琴領頭、三人當弦樂三重奏陪襯）。
- 21544　跨張 4-gram（han() 剝非漢字）：本組 18 張＋writer-2 已交 18 張合掃，3 張以上 0 條（拆掉「國作曲家」×6、「的作曲家」、「作曲家的」、「室內作品」、「時間是年」、「奏小提琴」、「一把小提琴」、「家從年起」、「在年出版」等殘片；我方 Reynolds 原稿誤撞 Neuwirth hook「兩首四重奏之外」，已改）。對 mc32／mc40／mc41 已上架 out 檔：無任何 4-gram 與已上架 2 張以上同時撞。剩 2 張的多為樂器／編制詞（弦樂四重奏、低音提琴、普立茲音樂獎、新複雜主義）。發行句一張一種：推出／發行年是／交…出版／隔年收成一張／由…出版／面世／把它推出／上市／問世（黑膠於）／合成一套發行／當年上架／隔年發行／出版時間是／錄音在柏林完成（Schrank 只寫錄音年）／CD 出版／發行年份是／年發行／錄音問世。
- 21545　note 小處照辦與可逆處：Guerrero 辭世與開錄照 note 標時序、不渲染；Schrank 年份只寫 2011 年 2 月錄音；Poppe《Chamber Music》不寫廠牌（note 未列）；Simaku 卡第二句以「作曲家＋移居年份」領句，與 hook 的「移居」有一字重疊但補上具名與年份；Lauds 卡同台三人照 note 只寫姓。Cassidy 卡「新複雜主義」與 writer-2 Dillon 卡共用流派名，屬專名不算同構。主線收件時請兩檔統一再合掃一次（writer-2 若再改動結果會變）。

## 主線審稿（21551–21553；2026-10-24）
- 21551：逐張審 36 張（out-1 18、out-2 18），逐句對回研究稿；qa-batch out 全過、qa-check-research 兩檔各 0 標記、fix-spacing 0 補；正文無媒體名。抽核：Holliger 1959 日內瓦大賽第一名（研究 b 組維基）、Knox 首演 Ligeti〈Loop〉（研究 d 組維基）、Steen-Andersen 2026 Premio Abbiati del Disco 得獎（研究 e 組 Edition-S 新聞）、Simaku 2019-12 約克大學作曲家在場錄音（研究 b 組 Discogs）、Pacifica 2009 Grammy 最佳室內樂演出。
- 21552：改 3 張（`desc-override.json`）：
  - `James Dillon|Dillon: The Soadie Waste`：hook「據說舞跳熱了，化工廠舊址的氣味會從地下滲上來。」用了禁用的「據說」，改「老舞廳流傳的說法：舞一跳熱，地底就滲出化工廠的氣味。」（研究 e 組 NMC 頁：舞廳據說蓋在舊化工廠原址，是流傳說法，不寫成事實）；另「樂在強而有力的圖形化織體」語病改「織體強而有力、充滿圖形感」→ 240 字。hook 已同步 hooks 檔與 writer-2 input。
  - `Ensemble intercontemporain|Hurel…`：hook「獲大獎」與正文「Ernst von Siemens 音樂獎」——研究 e 組只有法文維基一源，且 1995 年 Hurel 得的是基金會的作曲家獎（Förderpreis），不是同名大獎；改 hook「得獎那一年」、正文「那個獎來自 Ernst von Siemens 音樂基金會」→ 163 字。hook 已同步。
  - `Oslo Sinfonietta|Steen-Andersen: Chambered Music`：「長號出現在標題曲〈Chambered Music〉暗示被壓住的話語；同曲也用」語病，改「標題曲〈Chambered Music〉用這把長號暗示被壓住的話語，也用」→ 177 字。
- 21553：核過未改——Yejin Gil 盤「聲音明亮、冰冷、堅硬」是研究 e 組對〈Incises〉的聲音描述，保留；Arditti《Mexico》寫「音樂節期間」錄音，未寫成現場（研究 c 組：是否現場未明載）。
