# add-20261022-ml5 裁定（情緒薄格策展線・恍惚：neo-soul 二線＋alt R&B 2010s–20s）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 2 輪起收窄到大場景、3 個工作階段並行（本工作階段 ml5／mc6）。場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。主場景 ml5 neo-soul 二線，可擴寫 ml8 alt R&B（霧而暖）。
> 策展：`curation-ml5.json`（50 張：主場景 34、擴寫 16；neosoul 20、uk-neosoul 12、retro-neosoul 4、alt-rnb 14）→ `master-ml5.json`（MB 回查 50/50 釘住、人工 0；flag 1：Society of Soul《Brainchild》MB 無日期）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml5-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 14321–14330、b 14331–14340、c 14341–14350、d 14351–14360、e 14361–14370、鉤子 14371–14380、寫作 14381–14390、主線 14391–14400。**
---

## 主線策展（不佔條號）
- 50 張全過 moodGuess 邊距（x 1.9–2.5、y 1.0–1.4、z 0.5–1.1）。策展層已對照池中同藝人既有三軸、只收 y 估 ≥1.0（ml1／ml2 y 平均高估 0.3），池中判輕或判冷的藝人（Omar、Amel Larrieux、Jill Scott、Musiq、Dwele、Snoh Aalegra、Jordan Rakei、Meshell…）一律未提。主場景挖不到 54 張，照實交 50。
- **主線汰 5 張湊 45**（風險最高的先汰）：Taylor McFerrin《Early Riser》（z 估 0.5、夢幻電子感易判中性）、Adrian Younge Presents The Delfonics（池中 Delfonics 原盤 y −0.7～−1.1）、Dijon《Absolutely》（池中《Baby》x 3.0 落沸騰）、Charlotte Day Wilson《Cyan Blue》（z 估 0.6、可能判 0.3 上下；同藝人留《ALPHA》）、KeiyaA《hooke's law》（實驗段落、z 估 0.6；同藝人留《Forever, Ya Girl》）。
- 跨工作階段去重：對 origin 所有 `claude/*` 分支 seed 去重 0。
- 研究層要特別寫聲音事實的邊緣張：Les Nubians、Laura Mvula、Goapele（y 可能判輕）、Bobby Oroza（retro soul 乾淨製作風險）、Sa-Ra／Spacek／Jesse Boykins III & Melo X／Nick Hakim《WILL THIS MAKE ME GOOD》（z 估 0.6）、Yaya Bey《Remember Your North Star》（中速 reggae／highlife 段）。年份待核：Society of Soul《Brainchild》（MB 無日期，取 1995）、Goapele《Even Closer》（獨立首版 2001？MB 2002）、Gabriels《Angels & Queens》（2022 Part I／2023 完整版）；Jesse Boykins III《Love Apparatus》廠牌待補。
