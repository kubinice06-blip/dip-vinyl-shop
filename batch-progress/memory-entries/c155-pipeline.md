## 2026-09-18 — dip-vinyl-shop — c-155 走完雲端段（Blue Note 1997–2000，36 張）

- **改動摘要**：切片 45 張**收 36 退 9**（b 組退貨率 4.5%，是這一段最低）。
  **封面 30/36、試聽 34/36（2 張固定無來源狀態）。**
- **主要檔案**：`batch-progress/c155/`（prop-{a,b}、chk-prop.mjs、slice.json、caa.json、rulings.md、
  apple-candidates.md、HANDOFF.md）、`desc-tools/batches/research/c155-{a,b}.json`、
  `hooks/c155-hooks-{a,b}.json`、`input/c155-writer-{1,2}.json`、`output/c155-out-{1,2}.json`。
- **驗證結果**：`chk-prop c155 a b` 36 張 34 位標記 0；`qa-batch out c155` 36 張與卡單相符、全部通過
  （out-1 229–239／out-2 220–239）；hooks 兩支全過（加權 18–30、note 279–349）；`fix-spacing` 待補 0。
  **發行年逐筆比對 36/36 相符。**
- **⚠ 本批最重要的通則（第 1367 條）：Discogs 的編制要讀 `tracklist[].extraartists`。**
  策展層說「編制查不到」的四張全是誤判——**其中一張逐軌欄有十二人，含 John Scofield 七軌。**
- **⚠ 「同一場錄音拆成兩張碟」在本線第二例**：《Live in New York》與池中《Cornucopia》的第 1–4 軌
  **是同一晚同一場，重疊的是六個人、連工程師與製作人都相同**，四首同名曲時長差 10–30 秒是重剪。
- **⚠ 兩張整張翻唱，原盤都在池中且都是 apex**（其中一張是 apex 5 的 Sly & the Family Stone
  ——**本線第一次撞到王牌**）。
- **⚠ 研究層自我更正（第 1370 條）：`seed_cards.json` 是「陣列的陣列」**，
  第一版腳本把 17,248 筆全讀成空白，**回報的「零命中」與「真的沒有」長得一模一樣**
  ——**後批掃卡池前先印一筆樣本確認形狀。**
- **⚠ 年份再改判一張**：《Antiguo》1998 US → **1997 JP**（世界首發是 `TOCJ-5588` 零售盤，
  美版盤面逐字 `Licensed To`）——**策展層只核了美國就判不採。**
  **但本批日版早於美版只有 2/36，「先查日版」是動作、不是預設。**
- **⚠ 店面新形狀（第 1371 條）：條目在架、`trackCount` 有值，但五個市場都回 0 軌、零 previewUrl**
  ——對的碟但拿不到預覽。**撈回的五張各靠不同一招**（UPC 查法／羅馬數字盤名／只有 jp 市場有）。
- **缺的**：封面 6 張（**兩張要避開全是 secondary 的條目**）、試聽 2 張走固定無來源狀態。
