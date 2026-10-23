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
