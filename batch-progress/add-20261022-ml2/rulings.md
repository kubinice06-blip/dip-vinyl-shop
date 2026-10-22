# add-20261022-ml2 裁定（情緒薄格策展線・恍惚：暖 shoegaze／dream pop／新迷幻）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。恍惚線第一次跑（與 ml1 同一工作階段）。
> 策展：`curation-ml2.json`（54 張＋主線回饋後補 12 張＝66：暖 dream pop、暖 shoegaze 柔牆、新迷幻慢而濕、夢幻 ambient／電子 shoegaze）→ `master-ml2.json`（MB 回查 66/66 釘住、人工 0、flags 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml2-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 14081–14090、b 14091–14100、c 14101–14110、d 14111–14120、e 14121–14130、鉤子 14131–14140、寫作 14141–14150、主線 14151–14160。**
---

## 主線策展（不佔條號）
- 54 張全過 moodGuess 邊距（x 1.2–2.6、y 0.9–1.5、z 0.4–1.0）。**主線對照池中同藝人已評分的三軸**：dream pop 的**色溫**常被評中性偏冷（Mazzy Star −0.3～0、Slowdive −1～0.2、Beach House −0.3～0.5、Damon & Naomi −0.1、Spacemen 3 −0.5、Spiritualized −0.3～0.8、Atlas Sound 0.1），質地也有被評輕的（jj《n° 2》−0.6、Hope Sandoval《Bavarian Fruit Bread》0.4、Yo La Tengo 0.1–0.6）。策展層的 z 估計明顯比池中評分樂觀，所以：
  - **色溫汰 11 張**：z 估 0.4 的 8 張（The Black Ryder、Lotus Plaza、Engineers、A Sunny Day in Glasgow、Monster Movie、Atlas Sound《Parallax》、Spacemen 3《Recurring》、Pure X《Crawling Up the Stairs》）＋Mazzy Star《Seasons of Your Day》、Damon & Naomi、Slowdive《everything is alive》（池中同藝人 z ≤ 0.2）。
  - **質地汰 3 張**：jj《jj n° 3》、Yo La Tengo《Summer Sun》、Hope Sandoval《Through the Devil Softly》（池中同藝人 y < 0.5）。
  - 回頭叫策展代理補 12 張（條件收緊：z ≥ 0.7、y ≥ 1.0，溫熱、慵懶、靈魂／爵士和弦／熱帶感的濕迷幻），全收進 master。
  - **再汰 7 張湊到 45**：Alcest《Shelter》、Boogarins（x 2.6 貼邊；池中 Alcest 2.6–3.2）、Memoryhouse（y 0.9、製作偏清）、Swallow、Mojave 3、Hammock《Kenotic》、Spectrum《Soul Kiss》（z 0.5–0.6，英式／ambient 偏中性）。
- **留下的邊緣張**（研究層要特別寫聲音事實）：Sun Araw《On Patrol》、Vanishing Twin（z 0.7）、The Marías《CINEMA》（x 2.5、y 0.9）、Men I Trust《Untourable Album》（池中《Oncle Jazz》z 0.3）、Bibio 兩張（民謠成分，y 可能偏輕）、Robin Guthrie 兩張與 The Moon and the Melodies、Jónsi & Alex、Ulrich Schnauss & Jonas Munk（ambient 系，z 可能近 0）。
- 跨場景：Men I Trust、The Marías、Youth Lagoon 可能與 ml12 重疊；Nick Hakim、Kadhja Bonet 可能與 ml10 重疊；Harold Budd 合作盤、Jónsi & Alex 可能與 ml30 重疊——照「SCENES.md 先出現的批為準」歸本批。
- 研究層每支 WebSearch ≤3；facts 必含 2–3 條聲音事實（鼓、速度、殘響、合成器墊、冷暖）；與 moodGuess 不符的標「moodGuess 存疑」。


## 研究 b 組
- **14091**　Songs in A&E 的 moodGuess 明顯存疑：維基稱這張是樂團史上「噪音場景最少、歌最精簡」，18 首中 6 首不到 2 分鐘，另有 garage 快歌（〈Yeah Yeah〉）與慢歌（〈Baby I'm Just a Fool〉），節奏與厚度未必落恍惚格。卡單廠牌 Spaceland 與維基的 Sanctuary／Fontana 不一致，MB 未核對，facts 採維基。
- **14092**　Ulrich Schnauss《Goodbye》標 thin：聲音第一手描述查無（Pitchfork、Domino、Bandcamp 抓取失敗），卡單「殘響牆淹沒拍子」的節拍與速度無來源，moodGuess 存疑；市面常見 2008 修訂版（12 首、66 分，加 Chapterhouse 客座），寫作以 2007 原版 10 首為準。
- **14093**　Helado Negro《Far In》標 thin（官網、Guardian、Pitchfork、NPR 抓取失敗，聲音僅 Guardian 一句與 Bandcamp 留言）；樂評說「要大聲播」「groovy」，暗示律動比卡單「慢、霧化」活。《This Is How You Smile》y 0.9 存疑：來源皆未講速度，編制含電子班卓、顫音琴，被稱 synth-folk，質地可能偏輕。
- **14094**　Pure X《Pleasure》色溫存疑：同期 BPM 樂評明寫「strikingly cold, yet colorful」，後評才說吉他邊緣「柔軟而溫暖」；質地（慢、厚、殘響）與預估相符。
- **14095**　Terno Rei《Violeta》y 存疑：維基與樂評都說偏流行、合成器變多、吉他轉輕巧、聽感比前作更振奮，質地可能偏輕而非厚霧。
- **14096**　Yo La Tengo《Riot》y 輕度存疑：無鼓組重擊（手打打擊樂為主），FACT 稱部分小品單薄低語。製作人搜尋摘要稱 James McNew，但兩篇原文未點名，單一來源不寫。
- **14097**　Spiritualized《And Nothing Hurt》輕度存疑：〈Let's Dance〉〈The Morning After〉有銅管與搖滾推進，偏動；色溫暖、質地厚有 NME 支撐。聲音事實來自 NME、Flood（維基未描述聲音）。
- **14098**　Youth Lagoon 發行日 MB 9-26、維基 9-27，facts 並列不下斷言；聲音與 moodGuess 相符（Alesis SR16 鼓機、車庫／淋浴間殘響室）。
- **14099**　全組 9 張 facts 9–10 條、全 https、無推翻身分；無千分位逗號、無簡體字。QA（`qa-batch.mjs research`）b 組零標記。
