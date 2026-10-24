# add-20261024-mc46 裁定（情緒薄格策展線・冷冽：現代室內樂尖細第三波）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 15 輪（全線最後一輪），本工作階段負責 mc46、md33。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc46 列；獨奏盤留給並行的 mc47），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc46.json`（38 張，主場景見底）→ `master-mc46.json`（MB 回查 38/38 釘住；flag 皆為 artist credit 多掛作曲家，非撞）→ 主線汰 8、改掛名 30（`master-override-mc46.json`）→ `pick.json`（30）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261024-mc46-cards.json`（30 張；研究 a–e 各 6）。身分：MB 釘住 30、§1 人工 0。古典卡照 §0.7（mc32／mc43 先例）：artist＝演奏者／團體，盤名＝「作曲家: MB 正規名」（多作曲家合輯用「A / B: 標題」），另帶 composer 欄；MB 只掛作曲家或掛名分散的盤 artist 填作曲家。
> **預留：研究 a 22041–22050、b 22051–22060、c 22061–22070、d 22071–22080、e 22081–22090、鉤子 22091–22100、寫作 22101–22110、主線 22111–22120。**
---

## 主線策展（不佔條號）
- 策展 38 張（室內樂團 23、弦樂四重奏／三重奏 10、作曲家肖像 5）全數 MB 釘住；moodGuess x 3.3–4.0、y −0.8～0.0、z −1.7～−0.8。策展代理掛名寫成作曲家｜MB 標題，主線照 §0.7 全部改成演奏者｜「作曲家: 標題」（override fix 30 筆）。
- 去重：seed（改名後重跑）0 撞；對 origin `claude/mood-mc47-md34`（mc47 獨奏盤）、`claude/mood-mc44-md32` 的 curation 0 撞（mc47 只有 Kociuban《Penderecki / Xenakis》獨奏盤，不重疊）。
- **主線汰 8**：
  - 同作品池中已有（mc43 先例）：EIC／Boulez《Ligeti: Chamber Concerto…》（池有 de Leeuw 版）、Ensemble Modern／Eötvös《Pierrot Lunaire》（池有 Boulez 版）。
  - 池中同人判靜／判重：Babbitt《Quatrains…》（池中《Philomel》x 2.6 落平靜）、Penderecki 四重奏盤（池中《Threnody》y 1.8 落頹靡；x 估 3.4 貼邊）、Haas《Works for Ensemble》（池中《in vain》落頹靡；x 估 3.3）、Czernowin《Wintersongs》（池中《Heart Chamber》落頹靡；x 估 3.4）。
  - x 貼邊：Minguet《Rihm: String Quartets Vol. 4》（x 3.4，池中 Rihm《Jagden und Formen》y 0.6 判重；留 Arditti 版 III／VIII／V）、Aleph Gitarrenquartett Vol. 2（x 3.3）。
- 留但列研究重點：Liza Lim（池中《Extinction Events》x 2.6 落平靜，本盤 ELISION 密集刮擦型）、JACK《Zorn 四重奏全集》（池中 JACK《Xenakis》y 0.6 判重）、Widmann／Eötvös／Kagel／Dusapin／Donatoni（z 估 −0.8～−1.0，旋律或劇場性風險）、Czernowin《Shu Hai》（MB credit 含 Basel Sinfonietta，查是否大編制）、Kerschbaumer／Haubenstock-Ramati／Gerhard／Kagel／Jarrell（x 估 3.4）。

## 研究 d 組
- 22071：Hölszky《Hängebrücken》年份不明。MB／Discogs 記 2013（cpo 999 112-2，錄音 1990/91、WDR 製作），AllMusic 摘要記 1994-04；卡單年份沿用 2013、yearVerified 註明衝突。盤中含六位定音鼓手的《Jagt die Wölfe zurück!》（約 13 分），moodGuess 有判重風險。
- 22072：Widmann《Works for Ensemble》三曲中《Oktett》為舒伯特八重奏的對應作品、《Sieben Abgesänge》有女高音，旋律／抒情風險高，建議列汰換候選；AllMusic 日期 2010-06-29 與 MB 2010-04-15 不同，取 MB。
- 22073：Zorn 全集（JACK）官方文案稱《The Remedy of Fortune》浪漫、《Kol Nidre》為 Masada 旋律，z 恐不夠冷；其餘為區塊式與龐克強度，仍可落躁。
- 22074：Gadenstätter 三碟長篇（單曲約 30 分），Lachenmann 傳承可能稀疏極弱判靜，Sad Songs 含電吉他與電子音響。聲音僅編制推論，標 thin。
- 22075：Zimmermann 為 DG 1993 彙編（1969 慕尼黑＋1979 漢堡）；《Perspectives》確為雙鋼琴版（無磁帶），策展層「磁帶」疑慮解除。
- 22076：《Fall》正名為《Fall》，卡單盤名是組合名；Bettison《Livre des sauvages》為大型樂團、占全盤約一半，編制大於一般室內樂，判重／近管弦風險。

## 研究 a 組
- 22041：Cerha《String Quartets 1-3》moodGuess 存疑（偏暖、有旋律）：BBC Music 樂評稱調性未全放棄、有旋律碎片；作曲家自述第一號以中提琴旋律線變奏（阿拉伯 maqam）、第三號有 Elegie 與兩個 sehr ruhig 樂章；碟內另加 8 首弦樂六重奏短樂章（Hölderlin 片段）。年份 1999、廠牌 CPO（MB: Classic Produktion Osnabrück）補入，Hölderlin 曲的首演年因來源歧異不寫。
- 22042：Kerschbaumer《schraffur》moodGuess 存疑（稀疏長音型可能判靜；含電子）：唯一聲音描述是傳記語「寬廣、半透明的聲音空間」；kritzung II 含電子裝置；標題曲是 14 人編制加四分音手風琴。Kairos 小冊與官網 404、無獨立樂評，status thin。MB 2019-08 與 Europadisc 2019-10-25 的日期並列。
- 22043：Haubenstock-Ramati 作品集 moodGuess 存疑（實為現場錄音、點描稀疏可能判靜）：搜尋摘要引小冊稱 ORF 於 Wien Modern 2010-10-30 Semper-Depot 現場收錄（小冊今已 404，間接來源，只寫在 notes）；Multiple 4 為「輕盈、脆弱」；Konstellationen 為圖形譜、三段樂團版共約 33 分鐘。status thin。
- 22044：Ofenbauer 四重奏全集 moodGuess 強存疑（稀疏極弱／長音，很可能判靜）：第四樂章「近乎僵硬的緩慢」、類 Feldman、無顫音（senza espressione），第五樂章從「非常輕的刮擦」開始，最長一首約 48 分鐘，全套約 2 小時 23 分；只有第五樂章後段 col legno 密集。年份 2015 無誤（Europadisc 與 mica 另有 2015-05-11／2017 的分歧，不採）。
- 22045：Fuentes 四重奏盤聲音證據偏薄（Tempo 樂評在付費牆、AllMusic 403）；只有作曲家自述「萬花筒般的混亂」與標題意象，status thin。排除同名者（CCCB 頁的 1979 年巴塞隆納影像創作者不是這位 1975 年墨西哥市出生的作曲家）。
- 22046：Poppe《Rundfunk》推翻策展層編制：實為九台合成器（九電腦＋九鍵盤），非十餘件樂器；三個樂章性格迥異（I 稀疏到脈動、II 緩慢近靜止白噪音、III 刺耳鑽頭般密集），可能分別落靜／重，Hanlon 另聽出迪斯可與前衛搖滾迴響（偏暖風險）。建議主線依評分結果取捨。
- 22047：本組 6 張 facts 條數 10–11 條、皆附 https 來源；status：Cerha full、Kerschbaumer thin、Haubenstock-Ramati thin、Ofenbauer full、Fuentes thin、Poppe full。卡單 group a 實為 6 張（派工訊息寫 9 張，以卡單為準）。
