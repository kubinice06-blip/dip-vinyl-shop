## 2026-09-06 — dip-vinyl-shop — c-117 走完雲端段（英國 folk-rock 私壓，43 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 深掘`。
  **43 張、34 位掛名**（a acid folk 私壓 22／b electric folk 與 traditional 21），
  年份 1968–1978，曲風全部 folk。
  **零 §1 人工身分、零跨批撞卡、43/43 釘住 release-group、§5.6 合輯 0 張。**
  與 c-68／c-71 逐筆讀完 90 張、重複 0；**轉出 §1 候選 0 張。**
- **主要檔案**：`batch-progress/c117/`（prop-{a,b}、caa.json、chk-prop.mjs、rulings.md、
  HANDOFF.md、apple-candidates.md）、`desc-tools/batches/research/c117-{a,b}.json`、
  `hooks/c117-hooks-{a,b}.json`、`input/c117-writer-{1,2}.json`、`output/c117-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**補 2 筆、撤 2 筆**）。
- **驗證結果**：`qa-batch research/hooks/out c117` 全過、`chk-hook-crossgroup c117` 43 張
  （hook 加權 21–32.5、note 239–332）、`fix-spacing` 兩檔補 0。
  out-1 22 張 178–231、out-2 21 張 182–232。
  主線一次性複驗：**43 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
  資料庫名／榜單評分／彎撇三類皆 0 次。
  **封面 43/43（CAA 40 ＋ Apple 補 3）、試聽 28/43（gb 27／de 1）。**
- **這批的裁定與教訓**：
  1. **第 217 條的發源（本輪最重要的工具修正）**：**`chk-prop` 的正規化刪 `&` 卻留 `and`**，
     `Shirley & Dolly Collins` 與 `Shirley and Dolly Collins` 摺出兩個不同的鍵——
     **這道檢查從來沒抓到過任何一組 `&`／`and` 撞卡，而 `audits` 記了六組。**
     19 份 `chk-prop` 已全部補上，修完重跑十五批標記仍全是 0。
     **與第 163／169／170／171／181 條同族：一道檢查在某個維度上從來沒生效過，而它每次都回報通過。**
  2. **第 218／219／220 條也在這批誕生**：實掃要掃掛名與盤名兩個鍵、
     CAA 與 Apple 漏的不是同一批碟（CAA 獨有 13／Apple 獨有 3，聯集比任何一邊高）、
     英國私壓在 MB 上有成類的「以再發日期建檔」RG。
     **⚠ 但第 220 條在本批研究層逐張回問後抓到 0 張**——策展層事前排除的 4 張就是全部。
  3. **第 226 條的一半**：英國 1970s 民謠私壓的 MB 建檔率意外高，**§1 候選 0 張**
     （與 c-118 一起收斂成「MB 對 1970 年代後的歐美獨立場景覆蓋接近完整」）。
  4. **探測層配對錯誤 3 張**，其中 Bridget St John《Jumblequeen》**連同名曲都缺**還被判成 ready。
     **「ready」不等於配對正確**在這條線又一次應驗。
  5. **第 218 條的實際收益**：Martin Carthy & Dave Swarbrick《But Two Came By》
     **八個店面全回 0**，因為店面把 Swarbrick 塞進 `(feat.)` 後綴——走藝人目錄 lookup 才找到。
  6. **短掛名回問擋下 71 個同名別實體**，**三個「score 最高的是錯的」**：
     `Heron` 被 Gil Scott-Heron 壓過、`Trees` 被 Screaming Trees 壓過、
     **`Forest` 連前八名都進不去**。
  7. **字數：兩組初稿超標合計只有 1 張**——「一律整格捨、未逐句削字」是第 230／242 條
     目前收到的最好結果。
