# add-20261023-mc7 裁定（情緒薄格策展線・冷冽：minimal techno 快而薄＋mc8 IDM 快而乾）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 3 輪收窄到大場景、3 個工作階段並行（`batch-progress/mood-cells-20261022/SCENES.md`「第 2 輪起的調整」），本批＝主場景 mc7＋可擴寫場景 mc8。交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<+0.5）＋冷（z<0）**。
> 策展：`curation-mc7.json`（第一輪 34＋主線回饋後補 15＝49）→ `master-mc7.json`（MB 回查 49/49 釘住、人工 0、flag 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc7-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 11481–11490、b 11491–11500、c 11501–11510、d 11511–11520、e 11521–11530、鉤子 11531–11540、寫作 11541–11550、主線 11551–11560。**
---

## 主線策展（不佔條號）
- **邊距調整**：策展第一輪照 moodGuess y ≤ 0 的邊距，把 Robert Hood、Jeff Mills 全部排除。主線查池中已評分：Hood 8 張 y 0.2–0.6、x 3.8–4.0（多數落冷冽）、Mills 快盤 y 0.2–0.5、Hawtin DE9 系 y 0.2–0.3，**格線是 y<0.5**，故第二輪改為「同藝人池中盤 y≤0.4、x≥3.4、z≤−0.5 的，不在池的快盤可提，moodGuess y ≤0.2」。Monolake（池中 y 0.4–1.3）、Plastikman、Basic Channel、Surgeon／Regis 系池中判重，不提；Plaid 池中判暖、Arovane 判靜、Autechre 早期 y 0.3–1.3，IDM 只收快而乾的少數。
- **汰 4 張**：Thomas Brinkmann《Studio 1 - Variationen》（Voigt 原作的變奏再製，近 remix）、Concept 1《96:01 - 96:12》（12 張月刊 12 吋的合集）、Robert Hood《Omega: Alive》（Discogs 標 Mixed CD）、Elektro Guzzi《Observatory》（樂團編制三張留兩張，先看前兩張評分）。
- **留下的邊緣張**（研究層要特別寫聲音事實：kick 厚薄、低頻、速度、有無和弦暖墊或人聲）：Jeff Mills ×5、Pacou ×2、Damon Wild、Oliver Ho ×2（部族打擊、z）、Robert Hood《Hoodlum》（2×12 吋 9 軌，MB 列 Album）、Elektro Guzzi ×2（真鼓樂團）、Brandt Brauer Frick（原聲樂器）、Mark Fell、SND、Beatrice Dillon、TV Victor、Kit Clayton（x）、Atom™《HD》、Funkstörung、Rian Treanor《File Under UK Metaplasm》（z）。
- `genres` 一律 `electronic`。
- 研究層每支 WebSearch ≤3；facts 必含 2–3 條聲音事實；與 moodGuess 不符的標「moodGuess 存疑」——**特別是 kick 厚重、工業硬、dub 化殘響、ambient 化慢段多、house 和弦或人聲暖的**。


## 研究 a 組
- 11481：Grounded in Existence 的 Discogs 風格為 IDM／Downtempo，RA 稱低調點頭，判斷 x 可能低於 3.0，列「moodGuess 存疑・汰換候選」，facts 照實寫。
- 11482：Live Extracts 年份以 2003（Discogs／MB／Apple）為準，不採 Wikipedia 的 2002；Grounded 以 2005 為準，不採 Wikipedia 的 2004。
- 11483：Gaiser 國籍三源衝突（RA 美國、MB 德國、起始地 Grand Rapids），facts 只寫起始地，不寫國籍；「M_nus 首張專輯」查不到，不寫。
- 11484：Restore 卡單 label 空白，補 M_nus（Minus Inc.）；Houle 三張與 Tokyo+1、Live Extracts 因缺專屬樂評標 thin，聲音事實用藝人整體風格描述並在 facts 內標明非專屬。
- 11485：WebSearch 3 次用於 Klick、Blank Fade（無結果）、Stabiles；Pitchfork 被封鎖、RA 搜尋頁無內文，Tokyo+1 的人聲切片比例無法證實。

## 研究 e 組
- 11521：TV Victor《Timeless Deceleration》是 70 分鐘單曲＋55 分鐘＋10 分鐘的雙 CD，兩張皆為更早氛圍專輯（1999 限量 CD、1994 BMG）的重發合併，Discogs 風格 Ambient／Minimal／Trip Hop；列「moodGuess 嚴重存疑・建議汰換」，facts 照實寫。
- 11522：Jeff Mills《Chronicles of Possible Worlds》Discogs 風格為 Abstract／Ambient 且有後製小提琴，推翻 curatorWhy「快拍 techno」；年份 MB／Discogs 2014，版權行與維基 2013，facts 兩者並陳。
- 11523：Pacou《No Computer Involved》curatorWhy「全類比硬體」無來源（維基只說是對 Ejay 類預設軟體的聲明），推翻；Pacou 生年採維基 1972，不推算年齡；Tresor 廠牌成立月三源不一（Discogs 7 月、維基 10 月），只寫「同年」。
- 11524：Damon Wild《Colortheory》RA 小傳寫 1998，Discogs／MB 皆 2001，採 2001；Oliver Ho 兩張與 Damon Wild 因查無針對這張的聲音樂評，聲音事實限於 Discogs 風格標籤與廠牌簡介，status 標 thin。Prima Materia 實為 2×12 吋 EP（MB 列 Album），寫作層寫雙 12 吋。
- 11525：Kit Clayton《Repetition and Nonsense》Discogs 6 首、Scaruffi 7 首，採 Discogs；風格含 Dub Techno，Scaruffi 稱重點在旋律與動態、含 downtempo 段，x 可能 <3.0，moodGuess 存疑。
- 11526：WebSearch 3 次用於 TV Victor、Oliver Ho Prima Materia、Kit Clayton（皆無專屬樂評）；Pitchfork／AllMusic／Discogs 網頁 403，RA 評論頁無這幾張，Jeff Mills 兩張 BPM 與 kick 厚薄全組查無來源。

## 研究 c 組
- 11501：Atom™《HD》找不到可開的樂評（WebSearch 額度在前三張用完，Pitchfork／AllMusic／Discogs 網頁 403），聲音層只有 Bandcamp 廠方說明與 Discogs 人聲／吉他／貝斯客座名單，status 標 thin；moodGuess 存疑：含 Jamie Lidell 主唱、The Who〈My Generation〉翻唱、Jorge González 吉他與貝斯，y／z 可能偏暖偏重。
- 11502：Phoenecia《Brownout》Bandcamp 新聞稿稱「電子 dub 唱片」、質地近 1970 年代 roots dub，12 首約 74 分鐘、多為 5 至 9 分鐘長曲，推翻 curatorWhy「抽搐 electro 鼓機、乾冷合成器」的單一印象；moodGuess 存疑（dub 化、長曲），建議以實聽評分為準，y>0.4 或 x<3.4 就汰換。發行日 Bandcamp 4/19、MB 2001-08，年份同為 2001。
- 11503：Phoenecia《Demissions》Discogs 風格標 Dub／IDM／Experimental／Ambient，10 首約 73 分鐘含兩首超過 10 分鐘與 tabla 人聲，moodGuess 存疑（重）：ambient／dub 慢段多，x 可能低於 3.0；無樂評，status thin。實為 Schematic（SCH079）與 Detroit Underground（DUCD02）聯合發行。
- 11504：Richard Devine《Lipswitch》在 Discogs 是 Mini-Album（8 首約 38 分鐘），Schematic SCH015 與 Warp WAP139 聯合發行，curatorWhy「Warp 專輯」與卡單 label Schematic 並非矛盾；年份 MB 2001-01-15、Discogs 多版本 2000 與 2001，facts 並陳，卡單 2001 可留。查無任何聲音樂評，「高速金屬碎拍」無法驗證，status thin，moodGuess 存疑。
- 11505：SND《Atavism》卡單 why「切碎 R&B 律動」與樂評不符（Igloo：拿掉 garage 搖擺、回到 bleep techno、幾乎無低音、全在中高頻），聲音事實以 Igloo 與 FACT 為準；x 3.4 貼邊疑慮成立。
- 11506：Beatrice Dillon《Workaround》「150bpm」只有 The Quietus 單一來源，其餘未見 bpm；原聲打擊（tabla、kora）與大提琴、薩克斯風、Laurel Halo 人聲、Untold 吉他使 z 可能判中性（curatorRisk 成立）；Discogs 2/6、維基 2/7，採 2020。
- 11507：Frank Bretschneider《Super.Trigger》Cyclic Defrost 與 Captain Fez 皆稱〈Big.Hopes〉〈Day.Dream〉大鼓「震得動窗」、〈Over.Load〉偏 dub 低音，moodGuess 存疑（低頻不薄，y 可能高於 −0.5）；標題曲是 Disscoxx 2007 作品的未發表混音，〈Over.Load〉是 2003 舊作改良版。
- 11508：Mark Fell《Multistability》curatorWhy 的 FM 音色查無來源，facts 不寫；樂評稱乾淨數位合成加類比打擊，局部有底特律銅管刺音，整體仍乾冷。
- 11509：Funkstörung《Appetite for Disctruction》含 MC Triple H、Greenwood 說唱與 Carin 人聲，z 可能貼 −0.3 以上（curatorRisk 成立）；樂評層僅 AllMusic、CMJ 的維基轉引，BPM 與低頻查無。
- 11510：WebSearch 3 次用於 Super.Trigger、Multistability、SND Atavism（其餘六張改用 Discogs／MB／iTunes API、Bandcamp、維基、The Quietus、Igloo、FACT 的 WebFetch）；Pitchfork／Guardian／AllMusic／Discogs 網頁 403 或被擋。thin 四張：Atom™ HD、Brownout、Demissions、Lipswitch；full 五張。無推翻身分，沒有建議移除。

## 研究 d 組
- 11511：Richard Devine《Aleamapper》原廠牌是 Schematic（美版 2001-12），卡單 label P-VINE 取自 MB 最早的日本盤（2001-09-25，18 首，多〈Itsuko〉〈Pulsion Mirror〉）；建議上架用 Schematic。Discogs 風格含 Dark Ambient／Drone，無樂評與 BPM（Pitchfork、AllMusic、RA 皆無法開啟），moodGuess 存疑，status thin。
- 11512：Sutekh《periods.make.sense.》全無曲名，只查到 Discogs 風格 Techno／Noise／Experimental 與藝人生平；「click 碎拍、乾」無來源可證，moodGuess 存疑，status thin；hook 只留一條（曾有的「最後一批 LP」說法是推論，已刪）。
- 11513：Rian Treanor《ATAXIA》Igloo（冷、硬、無鋪底）與 Planet Mu／Quietus（Max/MSP、切分底鼓、16 小節循環）可互證；Igloo 稱十首、Discogs／MB 九首，採九首；Igloo 稱以口語人聲取樣為基礎、Quietus 只有 B2 用人聲，facts 只採 Quietus。BPM 三源皆無，x 3.9 無法證實。
- 11514：Rian Treanor《File Under UK Metaplasm》烏干達坎帕拉 Boutique Studio 一事採 Quietus 專輯宣布文；樂評文（Quietus、Igloo）描述 dub／dancehall 殘影與滑音式音色，moodGuess 存疑（低頻可能偏厚、z 不明），BPM 無。
- 11515：Robert Hood《Paradygm Shift》Optimistic Underground 稱「暖的音色」，Exclaim! 稱 house 底鼓與極簡放克，Dekmantel 稱電子放克，moodGuess 存疑（z 可能不到 -1.1、y 可能 0.3–0.4，curatorRisk 成立）。Dekmantel 商品頁顯示 2026-04-19 與曲名 Magnet，與 MB／Rush Hour／FACT 不合，採後三者。
- 11516：Robert Hood《Hoodlum》2×12 吋 9 首（含 Interlude、Nightime Mix），Discogs 該版無 LP／Album 標記，MB 列 Album，介於長篇 EP 與專輯之間；所有可開的來源都沒有聲音描述（Discogs 風格含 House），聲音事實不足，status thin，moodGuess 存疑。
- 11517：Jeff Mills《From the 21st》MB 首發日 1999-01-30 為日本盤，碟上 ℗1998 Axis，維基列 1998，首發年有疑，facts 兩者並陳；Discogs 風格含 Ambient，有 1:39、2:38 小品，「快速循環」無來源，moodGuess 存疑，status thin；第 4 首音訊與 Preview（TW-001）B1〈Here〉相同。
- 11518：Jeff Mills《Cycle 30》**建議汰換**：Discogs 為單張 12 吋 Special Cut（A 面 8 段鎖槽加 B 面 3 首），維基作品表標 EP，推翻卡單「專輯」定性；MB 雖列 Album，實質不符專輯卡池。
- 11519：Jeff Mills《The Power》14 首 CD 專輯（Axis AXCD-042，2011-04-19），附 Mills 寫的 16 頁原創故事；Axis 官網的 The Sleeper 系列有一章叫 The Power，但頁面未明說與這張專輯的關係，facts 只寫並列事實、不寫因果；維基同年另有同名 EP。無聲音描述，moodGuess 存疑（可能含氛圍段），status thin。
- 11520：本組 WebSearch 用 3 次（Rian Treanor ATAXIA、File Under UK Metaplasm、Paradygm Shift）；Pitchfork 被封鎖、AllMusic／Discogs 網頁／RYM／Sputnikmusic／RA 評論頁皆 403 或無，Discogs 與 MB 改走 API；Richard Devine、Sutekh、Hood《Hoodlum》、Mills 四張因此只有 Discogs 風格與曲目事實，聲音事實（2–3 條）未達要求，已在各卡 notes 與報告列明。

## 研究 b 組
- 11491：Gaiser《False Light》RA 新聞稿稱這是 Jon Gaiser 的第三張專輯（前兩張亦在 Minus），推翻卡單 curatorWhy「第二張 M_nus 專輯」；找不到本作樂評，聲音事實取 RA 藝人頁風格描述（氣氛感、低頻驅動）與前作《Blank Fade》樂評，status 標 thin；moodGuess 輕度存疑（低頻驅動、曲長七八分鐘，y 可能高於 0）。
- 11492：Troy Pierce《Gone Astray》RA 樂評收錄標題為「Gone Astray EP」，但評的曲目皆在本專輯曲單（含 Louderbach、Konrad Black 混音曲），照同批發行的評論使用並在 notes 提醒；樂評聽到厚、層疊、抽象、dub 式回音與 acid 線，並說非舞池導向，moodGuess 存疑（x 可能低於 3.6、y 可能高於 0）。
- 11493：Theorem《Nano》找不到本作樂評，聲音事實來自藝人簡介（近乎 ambient 的 house、ambient 與 dub 一面、Basic Channel 影響）；簡介之間有分歧（另一份稱 dub 轉向在《Nano》之後），facts 只寫 AllMusic 系說法並標為簡介說法；CD 九首／黑膠八首曲單不同（黑膠多〈Outcast〉、少〈Steem〉〈Aslan〉）；status 標 thin；moodGuess 明顯存疑（ambient／dub、73 分鐘長曲），建議評分前列汰換候選。
- 11494：Sterac《Secret Life of Machines》moodGuess 明顯存疑：RA 稱除〈Axion〉外皆溫暖、旋律導向，Textura 稱柔軟合成器、搖擺低音線，Exclaim! 稱黏稠溫潤的 Yamaha 音色，Discogs 另標 Dub Techno；無 BPM 來源。Exclaim! 寫原版七首，與 Discogs／MB 的 10 首不符，採 Discogs；Textura 稱「廠牌首發」未反查廠牌目錄，不寫。建議汰換或降 z 期望。
- 11495：Elektro Guzzi《Elektro Guzzi》moodGuess 中度存疑：RA 聽到 dub 影響的貝斯、混濁吉他質地、Pulsinger 混音的空間感、部族式邦戈鼓與低頻隆隆，y 可能偏高；樂評未明說冷暖。「現場錄成、沒有疊錄」來自版權頁註記與 RA 簡介。
- 11496：Elektro Guzzi《Parquet》RA 樂評明說真樂器未加暖意、保留機器精準並添危險感，且稱「較輕快、較凶猛」，對 x、z 有利；RA 寫 2011 年 10 月、MB 記 CD 11-14，facts 只寫年份與 MB 日期；德語維基列 EBBA Award 2012，單一來源、未查類別與得獎／入圍，不進 facts。
- 11497：Brandt Brauer Frick《You Make Me Real》RA（血氣溫熱）與 Groove（有機但冷靜克制）對冷暖判讀分歧，兩說並列於 facts；專輯中鋼琴只是預置鋼琴取樣，與 moodGuess why「原聲鋼琴」不盡相符；錄音在威斯巴登 Garage Studios（Discogs），Beathearts 稱母親車庫位於法蘭克福郊區，兩者相容並照來源說法各寫。moodGuess 輕度存疑（z 兩家分歧）。
- 11498：Efdemin《Efdemin》德語維基稱 Groove 讀者票選為 2007 年度專輯榜第一，屬媒體榜名次，只留 notes；Pitchfork 評論頁無法抓取未引用；RA 同時聽到深沉弦樂（〈La Ratafia〉）與迷幻暖意（〈April Fools〉），moodGuess 輕度存疑（z 有暖點、x 可能不到 3.5），與 curatorRisk 的 house 和弦暖相符。
- 11499：Audion《Suckfish》moodGuess 明顯存疑：Exclaim!、PopMatters 與 Ghostly 皆描述猛烈如鐵錘的底鼓、303 acid、Hoover 掃音、失真與噪音收尾，屬 kick 厚重、工業硬一類，建議汰換候選。版本三處：卡單 label Spectral Sound（MB SPC-33CD）與 Ghostly 官方頁寫的 Ghostly International 為母廠與分支關係；CD 11 首（含 Kisses、The Pong 與兩首帶粗口曲名，facts 不逐一列出）、雙黑膠 8 首含黑膠獨有〈Chance〉〈New J.〉。
- 11500：本組 WebSearch 用 3 次（Gaiser、Troy Pierce、Theorem 各一）；主要來源為 Discogs／MB API、Resident Advisor、Brave 搜尋結果頁（經 WebFetch）；AllMusic 與 Pitchfork 被拒（403／封鎖）；ra.co 藝人簡介與樂評頁可抓。

## 主線裁定（研究層交件後，2026-10-23）
- **11551**：照研究層的聲音事實汰 13 張（卡單與研究 a–e 檔已移除，原卡存 `dropped-cards.json`）：
  - 不快、ambient 化或 dub 化（x 判靜／y 判重）：Stewart Walker《Grounded in Existence》（Discogs IDM／Downtempo、低調點頭）、Theorem《Nano》（近 ambient 的 house、dub 一面）、Sterac《Secret Life of Machines》（樂評：溫暖旋律導向、柔黏合成器、Dub Techno 標籤）、Phoenecia《Brownout》《Demissions》（廠方稱電子 dub、長曲、tabla 與 bodhrán）、Richard Devine《Aleamapper》（Dark Ambient／Drone 標籤）、Jeff Mills《Chronicles of Possible Worlds》（Abstract／Ambient、後製小提琴）、TV Victor《Timeless Deceleration》（70／55／10 分三首長篇 ambient，且為舊作合併重發）、Kit Clayton《Repetition and Nonsense》（Dub Techno、downtempo 段）。
  - kick 厚重、工業硬（y 判重）：Audion《Suckfish》（鐵錘底鼓、303 acid、Hoover、失真）。
  - 人聲與樂團暖：Atom™《HD》（Jamie Lidell 主唱、翻唱〈My Generation〉、吉他貝斯）。
  - 不是專輯：Jeff Mills《Cycle 30》（單張 12 吋 Special Cut，維基標 EP）、Robert Hood《Hoodlum》（2×12 吋、House 標籤，介於 EP 與專輯）。
- **11552**：留下但標存疑（評分照聲音打）：Gaiser 兩張、Troy Pierce、Elektro Guzzi 首作（dub 貝斯）、Brandt Brauer Frick、Efdemin、Bretschneider《Super.Trigger》（大鼓震窗）、Funkstörung（說唱）、Beatrice Dillon（原聲打擊）、SND、Mark Fell、Rian Treanor《File Under UK Metaplasm》、Robert Hood《Paradygm Shift》（house 底鼓）、Jeff Mills《From the 21st》《The Power》《The Jungle Planet》、Damon Wild、Oliver Ho 兩張、Pacou 兩張、Marc Houle 三張、Brinkmann 兩張。
- **11553**：照研究層改卡單：Marc Houle《Restore》label 補 M_nus。Gaiser 國籍不寫（只寫起始地 Grand Rapids）、《False Light》是第三張（非第二張）；Richard Devine《Lipswitch》Schematic／Warp 聯合發行（Discogs 標 Mini-Album，MB 列 Album，收）；Jeff Mills《From the 21st》首發年 1998／1999 並陳不寫死；《The Jungle Planet》實體是 400 套 USB 方塊；Oliver Ho《Prima Materia》寫雙 12 吋——寫作層照研究稿。
- **11554**：**全批 32 張**（策展 49、主線汰 4、研究汰 13）。候補只剩 Elektro Guzzi《Observatory》等主線汰除者，不回補；照實上架。
- **11555**：再汰 Oliver Ho《Prima Materia》（Discogs master 1974 為 12 吋 EP、MB 首發 release 無 CAA 圖；研究 e 組已提醒「雙 12 吋」）。**全批 31 張**。

## 鉤子層（d、e）
- **11536** 交件：`desc-tools/batches/hooks/add-20261023-mc7-hooks-d.json`（6）、`-hooks-e.json`（5；主線 11555 汰《Prima Materia》後研究 e 剩 5 張，hook 已刪、骨架讓出）。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆預算（上限 full 230／thin 170）與 hook 加權／原始字元：Sutekh 164/170（18／24）、ATAXIA 217/230（18／18）、Metaplasm 226/230（21／21）、Paradygm Shift 217/230（22／25）、From the 21st 170/170（20.5／24）、The Power 159/170（21.5／25）、Jungle Planet 226/230（24／29）、Colortheory 169/170（25／28）、Universal 170/170（20／20）、Symbolic Language 222/230（23.5／29）、No Computer Involved 208/230（14／14）。初稿 11 張全超標，整格捨去：Sutekh 雙 LP 面別與《Incest Live》、ATAXIA 時長、Metaplasm〈Hypnic Jerks〉底鼓與「仍要能在俱樂部用」、Hood「隔五年／三張 EP 預告」（hook 隨之改寫成靠 g2 的廠牌說法）、Mills《From the 21st》曲數時長、《The Power》曲名鏈、Jungle Planet 目錄號與封面插畫、Colortheory 目錄號與 Synewave、Universal 手冊英文全句、Symbolic Language 目錄號與〈The Outer Rim〉、No Computer 目錄號與〈Dawn〉。壓完回核：Jungle Planet 的「400 套」原已被砍，補回 g1；ATAXIA hook「醫學詞」facts 無據，改成平敘盤名意思。媒體名一律不進 note（樂評描述改寫成無主語的聲音事實或「新聞稿／廠牌稱」）。
- **11537** 骨架歸屬（11 張 11 條）：Sutekh＝全碟無曲名；ATAXIA＝盤名概念主導節奏設計；Metaplasm＝異地駐錄（坎帕拉）帶回新作；Paradygm Shift＝回到自己早年藍本；From the 21st＝同一段音訊換名重出（＋發行年並陳）；The Power＝附書、故事先行；Jungle Planet＝特殊載體限量（USB 立方體）；Colortheory＝美國製作人交歐洲廠牌；Universal＝曲名排成主題敘事（演化）；Symbolic Language＝地方場景（東柏林金庫俱樂部）；No Computer Involved＝標題即宣言。隱藏曲只給 Symbolic Language；Untitled 只給 Sutekh。
- **11538** 「他」引入法配表：Jeff Mills ×3——From the 21st＝綽號（The Wizard 電台 DJ）、The Power＝廠牌關係（Axis 1992 創辦）、Jungle Planet＝器物（TR-909）；Rian Treanor ×2——ATAXIA＝生年（1988）、Metaplasm＝身分（自認視覺藝術家）＋器物 Max/MSP；Pacou ×2——Symbolic Language＝名字領句＋生年生地、No Computer＝生涯里程（1998 全職巡演、LL Records）。UR 只給 Hood（創始成員）；Mills 的 UR 經歷不指派。Mark Fell 為 Treanor 之父（研究 d2）不指派，避免與 c 組《Multistability》互指。第二句句型配表：Sutekh「X 是…的化名」、ATAXIA「做這張的…」、Metaplasm「自認…的 X」、Hood「年份生於…的 X」、From the 21st「早年用…之名」、The Power「Axis 是…」、Jungle Planet「DJ 現場慣用…的 X」、Colortheory「生於…、搬到…的 X」、Universal「倫敦 DJ X 某年出道」、Symbolic Language「X 某年生於…」、No Computer「某年開始…的柏林人 X」。
- **11539** 「日」後一字：ATAXIA 登、Metaplasm 亮、Hood「，」、From the 21st 發、The Power 開；其餘只寫到年月。避開 a 組已用的交／推／起／辦／在／以／上／由（初稿撞了由、交、上三處，已改）；b、c 交件後主線請再掃。
- **11540** n-gram 自查：d、e 11 句 hook 之間及對 a 組 8 句，中文 4-gram 0 條；hook 與 note 無逐字重複句；開頭前四字互異。`qa-batch hooks`：d、e 事實對照 0 標記（總標記 2＝b、c 缺檔）；`chk-hook-crossgroup`（a、d、e 三組 19 張）全部通過。

## 鉤子層（a、b、c）
- **11531** 交件：`desc-tools/batches/hooks/add-20261023-mc7-hooks-a.json`（8）、`-hooks-b.json`（6）、`-hooks-c.json`（6），key 逐字照研究稿、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（研究稿 status thin 的 8 張）上限 170，full 230。逐筆預算／hook 加權（原始字元）：a1 Klick 230/230・19（19）｜a2 Tokyo + 1 166/170・20（21）｜a3 Stabiles 230/230・23（27）｜a4 Live Extracts 169/170・22（22）｜a5 Restore 170/170・20（20）｜a6 Bay of Figs 170/170・21（21）｜a7 Drift 143/170・19（19）｜a8 Blank Fade 168/170・19（27）｜b1 False Light 158/170・22（22）｜b2 Gone Astray 226/230・20（20）｜b3 Elektro Guzzi 224/230・23（27）｜b4 Parquet 230/230・20（20）｜b5 You Make Me Real 218/230・19（19）｜b6 Efdemin 222/230・21（21）｜c1 Super.Trigger 229/230・18（18）｜c2 Multistability 221/230・21（21）｜c3 Atavism 229/230・23（25）｜c4 Workaround 229/230・19.5（22）｜c5 Appetite for Disctruction 228/230・22（25）｜c6 Lipswitch 164/170・18.5（21）。初稿 14 張超標（最高 c5 384），整格捨去：Klick 科隆／高低頻延伸、Stabiles 主唱志向與「推手」、Restore 曲數與芝加哥底特律影響、Blank Fade 最長曲與活躍年、Gone Astray 的 Louderbach／CD 獨有曲、Elektro Guzzi 三位成員名、BBF〈Bop〉與 Kanye 轉貼、Efdemin 維也納求學與本名首作、Super.Trigger 廠牌沿革細節與〈Machine.Gun〉、Multistability 錄音期與〈7-A〉、Atavism 團名 .snd／《Tplay》／時間碼曲名、Workaround 學藝術與 Laurel Halo、Funkstörung 派對相識／Wu-Tang 合輯／生物分解包裝、Lipswitch 曲長。壓完回核 hook 依賴：Tokyo + 1、Bay of Figs、Parquet、Funkstörung 把 hook 所靠的格前移到 g2；Restore 的「13 Below 由他主辦」寫錯（他是辦電玩之夜，俱樂部是 Hawtin 的），已改；Lipswitch hook 照 facts 改成「Warp 第一張美國音樂人作品」。
- **11532** 骨架歸屬（20 張 20 條，只有擁有者寫歸屬句）：Klick＝刀刻溝槽與唱盤當鼓組（器物）｜Tokyo + 1＝城市實地錄音＋盤名多一座島｜Stabiles＝雕塑構想的出道長盤｜Live Extracts＝現場派、美歐兩廠分區發行、移居柏林（標時序）｜Restore＝同城俱樂部人脈帶進廠牌｜Bay of Figs＝曲名日後與新廠牌同名（標時序，只寫同名）｜Drift＝錄音地換城市｜Blank Fade＝本名與別名分線｜False Light＝整張串成一個故事｜Gone Astray＝自況怪人＋鄰近大城場景的外圍出身｜Elektro Guzzi＝樂團編制手彈 techno、現場一次錄成｜Parquet＝續作：真樂器守住機器精準｜You Make Me Real＝學院派古典訓練接舞曲、車庫乾房間｜Efdemin＝化名的來歷＋首張署化名｜Super.Trigger＝東德出身的廠牌創辦人改從律動下手｜Multistability＝心理學概念盤（同素材兩版）｜Atavism＝唱片套電話被發掘、七年後換廠牌回望 Sheffield bleep｜Workaround＝單一速度（150 bpm）的限制寫作｜Funkstörung＝混音成名、自家專輯磨五年｜Lipswitch＝海外廠牌第一位美國音樂人。曲名形式（二進位）只給 Klick 一格；Items & Things 只給 Bay of Figs（Gone Astray、Drift 不帶）；「定居柏林」只給 Live Extracts。
- **11533** 「他」引入法與第二句句型配表：Brinkmann ×2——Klick 器物回指（「那些溝槽是…自己刻的」）／Tokyo + 1「這回」承接＋身分；Walker ×2——Stabiles「是」＋生年國別／Live Extracts 出生地＋「做的是」；Houle ×3——Restore 國別身分前置／Bay of Figs 成績（「靠這張打響名氣」）／Drift「這是…第三張」廠牌關係；Gaiser ×2——Blank Fade 本名／False Light「做」＋樂種，自述用「他說」；Elektro Guzzi ×2——首作「出身」領句（含底特律影響）／Parquet「這支…三人組」回指（成員名只在首作研究稿、兩張 note 皆不帶）；其餘：Gone Astray 成長地前置、BBF 成軍年份領句、Efdemin「就是」揭本名、Super.Trigger 廠牌關係前置、Multistability「來自」、Atavism「組成…的是」、Workaround 居住地前置＋「身兼」、Funkstörung 成員名字領句、Lipswitch「在…寫」。Fell×SND 不互點：Multistability 不寫 SND 團名、Atavism 不寫兩位成員名。所有 hook 只帶名字或不帶名的，note 第二句都補了城市／國別與樂種（開頭兩句規則）。媒體名與媒體榜名次全不進 note（The Wire 年度第一、Groove 讀者票選、A.V. Club、RA、FACT、Igloo 等）；Stabiles 的評論描述寫成「後來的評論提到」，Blank Fade 寫成「他一貫的聲音」。Gaiser 國籍照 11553 不寫，只寫起始地大急流城。
- **11534** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Tokyo + 1 交、Stabiles 推、Live Extracts 起／辦、Restore 在、Bay of Figs 以、Drift 上、Blank Fade 由、False Light 面、Gone Astray 經、Super.Trigger 那、Atavism 換、Funkstörung 問；其餘只寫到年月（Parquet RA／MB 兩說、Multistability 兩說、Workaround 兩說、Lipswitch 2000／2001 兩說皆降到年或不寫日）。與 d、e 交件版（登、亮、，、發、開）對過，初稿撞「發」（False Light）與「，」（Super.Trigger），已改成面、那。
- **11535** 自查與腳本：hook×hook 中文 4-gram 0 條（a–e 31 句全掃）；hook×他張 note 0 條（途中拆掉「首張專輯」×4、「的錄音室」、「在同一個」、「是他們的」、「是第一張」）；note×note 只剩專名「亞特蘭大」（Live Extracts／Lipswitch）；hook 與自己 note 無 6 字以上逐字重複；開頭前四字 20 張互異，也與 repo 既有全部 hooks 檔開頭不同（初稿撞 c139／c113／c160／dt3／c76／dt2 六處，已改）。`node qa-batch.mjs hooks add-20261023-mc7` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-mc7`（5 組 31 張）全部通過 ✓，只報不擋的否定句 4 筆（Klick 沒有常規底鼓、Elektro Guzzi 沒有疊錄、Multistability 沒有單一讀法、Atavism 幾乎沒有低音）皆為聲音內容、非校對痕跡。

## 寫作層（writer-2）
- **11546** 交件：`desc-tools/batches/output/add-20261023-mc7-out-2.json` 15 張（full 9：219–240；thin 6：159–179）。初稿 6 張出界（SND 247、Funkstörung 255、ATAXIA 248、Metaplasm 252、From the 21st 183、Universal 183），整格捨去：SND 盤名格、Funkstörung「替他們打開名號」、ATAXIA「他取這個詞」、Metaplasm 結尾盤名改「這張」與「照這個意思」、From the 21st「那首」、Universal 縮詞。`qa-batch out`（唯一標記是 out-1 未交、張數 15 vs 31）、`qa-check-research` 0、`fix-spacing` 0。
- **11547** 開頭兩句交代樂種（派工指示）：note 只放在第三格以後的樂種前移到第二句——Funkstörung IDM／glitch hop、Lipswitch glitch／IDM、Metaplasm footwork／singeli、No Computer「全職做 techno」；note 無樂種的取 facts 有據者：ATAXIA「稜角俱樂部節奏的英國電子製作人」、From the 21st「來自底特律、做 techno」、Paradygm Shift「極簡 techno 專輯《Minimal Nation》」、Universal「部族 techno」（Tribal／Techno 標籤＋Meta 廠牌簡介）、SND「極簡電子」、Sutekh「實驗電子與 techno」。媒體名與媒體榜名次全不進正文，無「據說／據傳」、無來源平台名。
- **11548** The Power 的 note 寫「〈Microbe〉開頭」與 facts 衝突（14 首以〈The Power (Theme)〉開場、〈Microbe〉是第 2 首），照 facts 寫成「開場的主題曲之後接上〈Microbe〉」。主線審稿請看一眼。
- **11549** 第二句領句全照 11533／11538 配表（Atavism「組成…的是」、Workaround 居住地＋身兼、Funkstörung 成員名領句、Lipswitch「在…寫」、Sutekh「X 是…的化名」、ATAXIA「做這張的…」、Metaplasm「自認…的 X」、Hood「1965 年生於…的 X」、From the 21st「早年用…之名」、The Power「Axis 是…」、Jungle Planet「DJ 現場慣用…的 X」、Colortheory「生於…、搬到…的 X」、Universal「倫敦 DJ X 某年出道」、Symbolic Language「X 某年生於…」、No Computer「某年開始…的柏林人 X」）。「日」後一字照 11534／11539：Atavism 換、Funkstörung 問、ATAXIA 登、Metaplasm 亮、Hood「，」、From the 21st 發、The Power 開；其餘只到年月。復述 hook 的第二格改為具名：From the 21st 具名〈Optima (Reason)〉與 Preview、Symbolic Language 只回指「1997 年推出的這一張」、Metaplasm「待了一個月」改「駐錄」、Workaround 不再寫曲數與 150 bpm。
- **11550** 自掃 han() 4-gram：本檔 15 張＋writer-1 的 16 句 hook，2 張以上 0 條（途中拆掉「張個人專」「一張專輯」「在年月日」「專輯年月日」「是年那張」（命中 Hood hook，改 Symbolic Language 正文）「是底特律」「由他一人」「製作混音」）。out-1 尚未交件，跨檔合掃留給後交的一方與主線。

## 寫作層（writer-1）
- **11541** 交件：`desc-tools/batches/output/add-20261023-mc7-out-1.json` 16 張（full 9：207–234；thin 7：148–172）。初稿只有 Parquet 出界（245），整格捨去 CD 版〈Reserva〉一格。`qa-batch out`（31 張與卡單相符）全部通過、`qa-check-research` 標記 0、`fix-spacing` 0；正文無「據說／據傳／據…」、無媒體名與媒體榜名次、無來源平台名。
- **11542** 開頭兩句交代樂種：一律用 note 自帶的樂種詞，前移到第二句——Klick「德國 techno 製作人」、Tokyo + 1「以極簡 techno 為底」、Stabiles／Live Extracts／Bay of Figs／Drift／False Light「極簡 techno」、Restore／Blank Fade／Gone Astray「techno 製作人」、Elektro Guzzi「受底特律 techno 影響的三人樂團」、Parquet「以吉他、貝斯與鼓演奏 techno」、BBF「舞曲的重複律動接上新古典音樂」、Efdemin「深沉的 techno 與 house」（由 note 第四格前移）、Super.Trigger「專攻電子聲響」、Multistability「做電子音樂」＋聲音格（數位合成配類比打擊、節奏不規則）前移。未去 facts 撈 note 沒有的樂種（與 writer-2 取 facts 的做法不同，主線審稿可擇一統一；Klick facts 另有 Minimal 標籤、Super.Trigger／Multistability 若要更明確可補）。
- **11543** 否定句處理：note 的「沒有常規底鼓」改正面寫「鼓點全是唱針的爆音…」；「沒有疊錄」寫「零疊錄」；「不用 loop」寫「堅持捨棄 loop」；Super.Trigger「不先找抽象音色」寫「抽象音色這次退到後面」。Multistability 的 Necker cube 保留 note 原詞「沒有單一讀法」（聲音／概念內容，非校對痕跡，同 11535）。
- **11544** 第二句句型照 11533 配表：Klick「那些溝槽是…自己刻的」、Tokyo + 1「這回」、Stabiles「是」＋生年國別、Live Extracts「做的音樂是」（「做的是極簡」撞 writer-2 兩張，改一字）、Restore 國別身分前置、Bay of Figs「靠這張打響名氣的，是…」、Drift「這是…第三張」、Blank Fade「本名…的 Gaiser」、False Light「做」、Gone Astray 成長地前置、Elektro Guzzi「出身」、Parquet「這支維也納三人組就是」、BBF 成軍年領句、Efdemin「就是」、Super.Trigger 廠牌關係前置、Multistability「來自」。「日」後一字照 11534（交、推、起／辦、在、經、上、由、面、那）；Bay of Figs 的「以」前加了逗號（「發片是 2006 年 9 月 21 日，以…」），為拆 Stabiles／From the 21st 的「在年月日」。Drift 的 note 同時有「2010 年冬天錄」與「2010 年 9 月 27 日上市」，照 note 寫，主線審稿請看一眼時序。
- **11545** 自掃 han() 4-gram：本檔 16 張＋writer-2 交件版 15 張合掃，2 張以上只剩專名／樂器名「亞特蘭大」（Live Extracts／Lipswitch）、「吉他貝斯」（Elektro Guzzi 兩張）。途中拆掉「製作人年」×3、「這位德國」、「首的曲名」（命中 Bay of Figs hook）、「他自己的」、「極簡製作人」、「發行的收」、「首約分鐘」×2、「是製作人」、「的製作人」（撞 Colortheory hook）、「在年月日」×2、「用吉他貝」（撞 Elektro Guzzi hook）、「自創的發行」「發行了這張」「年月發行」「極簡專輯」「一手包辦」「全長約分鐘」「製作混音」「混音與製作」「做的是極簡」。本檔後交，已跨兩檔合掃；writer-2 若再動，請主線收件時重跑。

## 主線審稿（2026-10-23，雲端主線，31 張逐張對研究稿）
- **11556**：審 31 張，改 2 處（只動正文措辭，事實層未變，research／hooks／input 不需同步）：
  - Stewart Walker《Stabiles》：「後來的評論提到稀疏推進的低音線、殘響與 dub 質地，力道收在低調、讓人點頭的程度。」→「低音線稀疏推進，帶著殘響與 dub 質地，力道收得低調。」（研究 a 組：出處是評精選輯的單篇樂評，改成直述聲音，不轉述評論）。201 字。
  - Elektro Guzzi《Parquet》：「真樂器保住了機器般的精準，也替冷硬的 techno 添了一點危險感。」→「真樂器保住了機器般的精準。」（研究 b 組：「危險感」是單源樂評評價句）。198 字。
- **11557**：寫作層提出的三處：(1) Super.Trigger「專攻電子聲響」、Multistability「做電子音樂」，研究稿沒有更精確的樂種來源，維持；(2) Drift「2010 年冬天錄於柏林」與「9 月 27 日上市」不矛盾（年初冬天錄、秋天發），維持；(3) Multistability「沒有單一讀法」是盤名概念的內容，維持。The Power 開場曲序照研究稿（主題曲後接〈Microbe〉），正確。全文無「據說／據傳」、無媒體名與媒體年終榜。
