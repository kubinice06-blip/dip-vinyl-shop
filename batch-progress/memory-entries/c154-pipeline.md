## 2026-09-18 — dip-vinyl-shop — c-154 走完雲端段（Blue Note 1996–99，37 張）

- **改動摘要**：切片 45 張**收 37 退 8**。**封面 27/37、試聽 34/37（3 張固定無來源狀態）。**
- **主要檔案**：`batch-progress/c154/`（prop-{a,b}、chk-prop.mjs、slice.json、caa.json、rulings.md、
  apple-candidates.md、HANDOFF.md）、`desc-tools/batches/research/c154-{a,b}.json`、
  `hooks/c154-hooks-{a,b}.json`、`input/c154-writer-{1,2}.json`、`output/c154-out-{1,2}.json`。
- **驗證結果**：`chk-prop c154 a b` 37 張 33 位標記 0（**含新補的第四道「共用目錄號」檢查**）；
  `qa-batch out c154` 37 張與卡單相符、全部通過（out-1 220–239／out-2 229–240）；
  hooks 兩支全過（加權 16–29.5、note 317–350）；`fix-spacing` 待補 0。
  **發行年逐筆比對 37/37 相符。**
- **⚠ 本批最值得記的**：**兩張同三人、同場地、同封面畫家、同錄音師的現場盤，差在「年」**
  ——一張盤面只印「December 21 & 22」沒有年（**美版 Discogs 自己寫「(1996?)」**），
  **以發行日反推定死 1996**；另一張盤面逐字 `12/21/1997`。**盤面逐字勝過紙本敘述。**
- **⚠ 第 611 條盲區表的新變形**：**原盤帶重音、翻唱盤不帶**（`Déjà Vu` vs `Deja Vu`）
  ——**策展層兩筆「原盤不在池中」都是錯的**，兩張原盤都在 seed 裡。
  **通則：翻唱整張專輯的碟一律要查池中有沒有原盤，而且要去重音再查。**
- **⚠ 編制擋下 57 處**，極端案例是**一張碟的 10 軌就是 10 組不同搭檔、而美版 credits 漏印三個人、
  製作人欄全空**。另立**「Discogs 的 credits 空白只代表那一版的條目空白，換版本再查」**。
- **⚠ 新補的一道機器檢查**：`dedup-crossbatch` 的**第四道「共用目錄號」**就是這一批
  用人工 Discogs catno 反查抓到重複之後做的（第 1274 條）。
- **⚠ MB 的 `status: Promotion` 本身也會錯**（被標 Promotion 的其實是帶 obi 的零售盤）；
  **CAA 要逐張重探**（策展層寫「三試皆 404」的實測回 200）。
- **缺的**：封面 10 張（**兩張 Discogs 完全沒有可用 primary，走 Apple `600x600bb`**；
  **其中一筆的 primary 是卡帶殼照片**）、試聽 3 張走固定無來源狀態。
