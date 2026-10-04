## 2026-09-18 — dip-vinyl-shop — c-150 走完雲端段（Blue Note 1990–92 ＋ 一張 2002，38 張）

- **改動摘要**：Blue Note 重啟後第三段的新錄音，外加一張 2002 年才發行的 1969 白宮實況。
  切片 45 張**收 38 退 7**。**封面 32/38、試聽 25/38（13 張固定無來源狀態，是 1985 後五批最低）。**
- **主要檔案**：`batch-progress/c150/`（prop-{a,b}、chk-prop.mjs、slice.json、caa.json、rulings.md、
  apple-candidates.md、HANDOFF.md）、`desc-tools/batches/research/c150-{a,b}.json`、
  `hooks/c150-hooks-{a,b}.json`、`input/c150-writer-{1,2}.json`、`output/c150-out-{1,2}.json`。
- **驗證結果**：`chk-prop c150 a b` 38 張 33 位標記 0；`qa-batch out c150` 38 張與卡單相符、全部通過
  （out-1 222–240／out-2 228–240）；hooks 兩支全過（加權 18–33、note 282–348）；`fix-spacing` 待補 0。
  **發行年逐筆比對 38/38 相符。**
- **⚠ 這批最重要的事：八張的首發地是日本。** Somethin' Else 的 `TOCJ-5xxx` 常比美版早半年到一年
  ——**兩張因此年份改判 1991→1990**，另六張年份不變但首發地要改。
  ⚠ **《Stolen Moments》＝日版《Stairway To The Rainbow》是「同碟兩個盤名」**，
  **`chk-prop` 與跨批去重都抓不到**，已加 `queryAlias`。
  **通則：1990 年代前半的 Blue Note，後批一律先查 TOCJ 再下「首發地」的結論。**
- **⚠ 探測層的 `ready` 不保證是同一張碟**（第 1067 條）：研究層抽核出**兩張是錯碟**，已退回無來源。
  **`ready` 只保證「找到一個有預覽的條目」**——**「失敗與正常長得一樣」的又一種**。
  連帶：**Apple 的 `releaseDate` 會是批次 placeholder，不能當年份旁證。**
- **⚠ 研究層擋下策展層 11 處編制錯**，主要形狀是**「只吹一軌的客座被寫成常設團員」**，
  另有漏列、把獨奏盤寫成合奏、樂器寫錯（日野吹的是短號）。
- **⚠ 第 879 條修一半**（第 1068 條）：Billboard 1991–2002 確實分兩張爵士榜，
  **但 Cash Box 1991–92 只有一張混合的 `TOP 40 JAZZ ALBUMS`**——查 Cash Box 不必分兩張。
  另：**1992 年 Billboard 檔名是 `Billboard-` 不是 `BB-`；2002 年目錄是 `Billboard/00s/2002/`、全年單純 `BB-`。**
- **⚠ 掛名裁定（第 1131 條）**：`Benny Green`（Person）與 `The Benny Green Trio`（Group）
  **兩個字串都留，各卡照自己的 credit**——**這不是第 307 條的分裂**，同形狀先例是
  `Bobby Watson & Horizon` 與池中的 `Art Blakey and the Jazz Messengers`。
- **缺的**：封面 6 張（⚠ Here And Now 的兩個來源都低於 600px）、試聽 13 張走固定無來源狀態。
