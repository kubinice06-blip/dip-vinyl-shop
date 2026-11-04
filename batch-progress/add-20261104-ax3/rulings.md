# add-20261104-ax3 裁定（新頂點盤線・流亡 A：歐美私壓——迷幻、民謠、福音、靈魂放克、地下爵士）

> 店主 2026-11-04：同意另外上架新盤，把流亡從 254 補到約 300。交接 `batch-progress/apex-new-20261104/PLAN.md`。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；**本批明確採用頂點**：研究層確認 listeners 有效且 1–299、非錯配、冷門度 5（無串流授權再發）者 seed 第 9 欄填 `pearl`，不合格照一般卡上架或汰換。
> 策展：`curation-ax3a.json`（迷幻＋民謠 18）＋`curation-ax3b.json`（福音／靈魂放克／地下爵士 9）→ 主線汰 1（`master-override-ax3aax3b.json`）→ `master-ax3aax3b.json`（26 張：MB 18、§1 人工 8）→ `pick.json`（26）→ `build-cards.mjs`，再改分研究 a–c 三組。
> 本批卡單：`desc-tools/batches/cards/add-20261104-ax3-cards.json`（26 張；研究 a 9、b 9、c 8）。
> **預留：研究 a 51701–51710、b 51711–51720、c 51721–51730、鉤子 51751–51760、寫作 51761–51770、主線 51771–51780。**
---

## 主線策展（不佔條號）
- 汰 1：Kenny Cox《Multidirection》撞池（池中掛名 The Contemporary Jazz Quintet，1970）。
- 福音私壓 0 張：策展層約 90 個候選，真私壓盤 Last.fm 多半無資料或 0，有值的 Apple 都已上架（ax3b 回報）。本批照實不收福音。
- 盤名照 MB：Heaven & Earth《Heaven and Earth》；Mtume Umoja Ensemble《Alkebu-Lan: Land of the Blacks》（現場原盤，Ganelin 先例開 releaseException；「Live at the East」進 queryAlias）。
- 交研究層把關（流亡資格）：David Lewis《Just Mollie and Me…》worker listeners 回 0（盤名含 `…`，策展層查到 5），要對 Last.fm 頁；Heaven & Earth（Mercury 發行）、Joe Bonner（Muse）、Inner Dialogue（Ranwood）、Circulation（Deroy）、Probe（Eborp）不是嚴格自費，查是否有數位再發；Ghostdance 與 Apple 上的 Ghost Dance 是否同團。

## 研究 a 組
- 51701：流亡資格查證結果。8 張合格、1 張不合格（Stefan Gnys：Apple Music 已有 2024 年正式數位版《Horizoning》，且 2024 年 We Are Busy Bodies 黑膠重發，違反「無正式串流再發」；建議汰換或轉一般卡）。
- 51702：Last.fm 專輯頁在雲端環境一律回 600 / WebFetch 載入失敗，listeners 一律取 dip worker `_listeners`；逐張以 Discogs API（master/versions）核實再發版本、Apple（iTunes search）與 Deezer 搜尋核實無串流。Bandcamp 搜尋頁無法載入，未直接查。
- 51703：David Lewis《Just Mollie and Me…》worker 對含「…」盤名回 0，去掉省略號回 5（同藝人同盤）；判合格（listeners 5）。Last.fm 頁未能直接核對，請主線有網時補驗。Discogs 藝人名為 David Earl Lewis；Tiger Lily 小廠、Roulette 發行，非嚴格自費，僅有 2012／2013 日韓 CD 再發，無串流。
- 51704：McAllen：worker 以 Bob McAllen 回 64、以 McAllen 回 2，皆 1–299；queryAlias Bob McAllen 保留。
- 51705：Ghostdance 與 Apple 的 Ghost Dance（英國哥德搖滾團）、Bill Miller《Ghostdance》皆非同團，已排除錯配。
- 51706：Jeremy Dormouse 國別為加拿大，卡單 scene 寫「美國民謠私壓」不符；原版標籤印 1968 年版權，部落格稱 1968 發行，facts 不寫發行年。
- 51707：moodGuess 存疑：Sly Boots、David Lewis、Ghostdance、Drnwyn 實際有鼓與電貝斯或整團編制，不是純輕柔木吉他。
- 51708：Sly Boots 在 Apple 上同名藝人（2014《Bad News Walkin'》）為另一組，非此盤。
