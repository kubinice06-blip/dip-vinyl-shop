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
