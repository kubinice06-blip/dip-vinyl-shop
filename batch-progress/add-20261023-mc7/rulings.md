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
