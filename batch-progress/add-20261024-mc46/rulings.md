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
