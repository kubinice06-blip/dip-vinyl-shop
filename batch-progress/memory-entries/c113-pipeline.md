## 2026-09-06 — dip-vinyl-shop — c-113 走完雲端段（沖繩民謡 §1，30 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`，**§1 人工身分批**。
  **30 張、14 位掛名**（單組 a），年份 1974–2007，曲風 folk 24／world 6。
  **30 張全部 §1**（`rgMbid` 空、`identitySource: "manual"`）、**零跨批撞卡**。
  §1 舉證張張齊備：**國立國會圖書館サーチ 24 張、Apple jp collectionId 19 張，無一張只靠 Discogs。**
- **主要檔案**：`batch-progress/c113/`（prop-a、chk-prop.mjs、rulings.md、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c113-a.json`、`hooks/c113-hooks-a.json`、
  `input/c113-writer-1.json`、`output/c113-out-1.json`、
  `batch-progress/probe/previews.json`（**5 筆人工改指**）。
- **驗證結果**：`qa-batch research/hooks/out c113` 全過、`chk-hook-crossgroup c113` 30 張
  （hook 加權 23–38、note 212–301）、`fix-spacing` 待補 0。
  out-1 30 張 132–229（full 16 張 185–229、partial＋thin 14 張 132–175），thin 卡 3 張全部 ≤180。
  主線一次性複驗：**30 張 `desc` 開頭與 `hook` 逐字相符**、
  資料庫名（含「資料庫／條目／建檔／登錄／館藏」）與榜單評分兩類皆 0 次。
  **試聽 19/30（全部命中 jp）；封面 19 張 apple-verified-collection ＋ 11 張 manual-scan。**
- **這批的裁定與教訓**：
  1. **第 197／198／199 條的發源**：§1 批的空 `rgMbid` 不需改 `chk-prop`（改了會弄丟第 186 條的檢查）；
     **日本線 §1 的標準第二來源是國立國會圖書館サーチ**（短盤名用 `title=` 不用 `any=`）；
     **Discogs 的 `type: master` 要打 `/masters/<id>`**（第一輪十二筆全抓錯）。
  2. **第 234 條的發源**：§1 的覆核要驗到**藝人實體層**。研究層 14 位全跑（不是抽驗），
     找到我如古より子與普久原恒勇各有兩個實體、松田弘一連藝人實體都沒有——
     策展層「《恋の花》是唯一建檔」因此不成立。
  3. **第 235 條的發源**：**§1 的舉證連結會指錯碟**——我如古より子《唄遊び》附的館藏記錄
     其實是 2004 年的《唄遊び2》。**研究層要逐筆點開核對盤名與年份。**
  4. **第 236 條的發源**：**§1 批的年份是最弱的一環**（6/30 不可斷言）。
     沒有 MB 的 `first-release-date` 可當第四票，只剩 Discogs／館藏／店面三票且常各說各話。
     《ありがとう》三來源三年份，簡介整張不出現年份。
  5. **§1 批的字數偏差方向與別批相反**：初稿超標 0 張，**三張 full 反而掉到下限以下**。
     **素材密度低的批，寫作層要防的是下限不是上限。**
  6. **只有 Discogs 一個來源的碟一律不收**（第 198 條）——因此犧牲了 11 張，
     含大工哲弘兩張 70／80 年代黑膠與ネーネーズ首張《IKAWU》，來源補齊後可接下一批。
