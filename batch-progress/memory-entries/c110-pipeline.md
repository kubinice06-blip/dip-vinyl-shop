## 2026-09-06 — dip-vinyl-shop — c-110 走完雲端段（德義搖滾流行，44 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`。
  **44 張、34 位掛名**（a 德語圈 22／b 義大利 22），年份 1971–2021。
  規劃書的「德語七位抽測全零」屬實；**池中義大利線原本只有地下 prog 17 ＋ cantautore 15 兩塊，
  中間的搖滾主線整段空白**，本批 b 組補的就是這塊，與 c-61／c-55／c-56 零重疊。
  **零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group、§5.6 合輯 0 張。**
- **主要檔案**：`batch-progress/c110/`（prop-{a,b}、caa.json、chk-prop.mjs、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c110-{a,b}.json`、
  `hooks/c110-hooks-{a,b}.json`、`input/c110-writer-{1,2}.json`、`output/c110-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**12 筆人工改指**）。
- **驗證結果**：`qa-batch research/hooks/out c110` 全過、`chk-hook-crossgroup c110` 44 張
  （hook 加權 18–32.5、note 259–350）、`fix-spacing` 兩檔待補 0。
  out-1 22 張 193–238、out-2 22 張 197–239。
  主線一次性複驗：**44 張 `desc` 開頭與 `hook` 逐字相符**；
  兩支寫作層各自掃過資料庫名、榜單評分、彎撇（另加掃 U+2013／U+2014），**三類都是 0 次**。
  **封面 44/44、試聽 44/44（de 43／it 1）——兩項都滿。**
- **這批的裁定與教訓**：
  1. **第 186 條的發源**：`CCCP` 的 MB artist-credit 中間是 U+2013，而 `chk-prop` 的
     非 ASCII 連字號檢查**只掃 `album`、不掃 `artist`**，整組漏過去。19 份 chk-prop 已補。
  2. **第 183 條的第三個實例**：Falco 命中在 `at`、Grauzone 原盤登記在 `GB`、
     **義大利卡有一半靠 `gb` 命中**。店面組依實測重排。
  3. **第 221 條的發源**：hook 層把「可捨的整格」寫進 `note`，
     寫作層初稿超標從 c-109 的 **15/24** 降到 **6/22 與 4/22**。做法有效，已立為通則。
  4. **八張的試聽指到加曲版**（Debil 18/13、Horrorschau 22/12、Trio 31/14、
     Andrea Doria 12/10、Opel-Gang 15、Palais Schaumburg 10、Afterhours 19、Diaframma 8）。
     **店面上沒有原盤那一版**——這與 c-109 的「重製版」是同一個病的另一種發作。
  5. **兩處代表單曲不在碟上**：Grauzone 的〈Eisbär〉、Trio 的〈Da Da Da〉。
     **這個形狀在單曲驅動的樂團身上是常態**，策展層兩次都沒提，研究層兩次都抓到。
  6. **回撈清單本身也會錯**（第 194 條的另一面）：兩處把找得到的碟寫成「目錄裡找不到」，
     一處建議改用改名再發版、其實原盤也在架上。**回撈清單是候選不是結論，兩個方向都要驗。**
  7. **Falco 的盤名取 `Junge Roemer` 不取 MB 的 `Junge Römer`**——
     10 筆 release 有 9 筆原盤印的就是 oe。**封面寫法不是查詢轉寫**（第 6／50 條）。
