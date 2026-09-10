## 2026-09-07 — dip-vinyl-shop — c-120 走完雲端段（紐約硬蕊與 90s straight edge，44 張）

- **改動摘要**：店主 2026-09-07「台語獨立先　再來紐約硬蕊　日本地下即興」三條線的第二條，
  `lineType: 深掘`。**44 張、35 位掛名**（a 紐約硬蕊 22／b youth crew・straight edge・Revelation 系 22），
  年份 1984–2017。**零 §1、零跨批撞卡、44/44 釘住 release-group MBID。**
  池中原本只有 5 張（Bad Brains 3、Minor Threat 1、Quicksand 1），骨幹其餘 26 位全零。
  與 c-90（1988–2003 台北地下）、c-81（SST／Dischord 圈）零交集。
- **主要檔案**：`batch-progress/c120/`（prop-{a,b}、chk-prop.mjs、caa.json、rulings.md、
  HANDOFF.md、apple-candidates.md）、`desc-tools/batches/research/c120-{a,b}.json`、
  `hooks/c120-hooks-{a,b}.json`、`input/c120-writer-{1,2}.json`、
  `output/c120-out-{1,2}.json`、`batch-progress/probe/previews.json`（**補 8 筆**）。
- **驗證結果**：`qa-batch research/hooks/out c120` 全過、`chk-hook-crossgroup c120` 跨組開頭雷同 0 處
  （hook 加權 16–34、note 268–349）、`fix-spacing --write` 兩檔待補 0。
  out-1 22 張 151–237、out-2 22 張 152–239，>260 零筆，**44 張全部落在所屬字數帶**。
  主線一次性複驗：**44 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
  資料庫名與榜單評分皆 0 次、**施工單洩漏 0 筆**（新增的檢查，見下）。
  **封面 38/44；試聽 28 → 36/44（us 35｜de 1）。**
- **⚠ 要店主裁定**：**不開 hardcore §5.5 白名單的代價已量化**——
  **101 筆／99 個 release-group／33 支團**收不進來，**其中 60 個的 CAA 已回 200**；
  整支團一張都收不到的有 9 支（Chain of Strength、Inside Out、Raw Deal、Krakdown、
  Outburst、The Icemen、Life's Blood、Straight Ahead、Side by Side）。
  清單在 `c120/rulings.md` 第 4.1 節，逐筆附 rgMbid 與封面狀態，開白名單即可直接建卡。
  （c-116 第 1 條提過同一題、店主未裁示；主線依裁定權下放三條判準照 c-116 先例決定不開。）
- **研究層擋下策展層 44 張卡、124 處**（a 59／b 65，本輪單批最高）：
  AF《One Voice》「解散前最後一張」後面還有 10 張；AF《Cause for Alarm》五個 release
  沒有一筆掛 Combat Core；Sheer Terror 掛 Blackout! 的是 1993 不是 1991；
  SOIA 的 CD 只多兩軌不是把八軌 7 吋併進去；Gorilla Biscuits 的 99 軌是隱藏索引、
  42 軌是本張加靜音軌；Ressurection 的 CD 多出三軌全無曲名；序數三連錯。
  **人名與區級地名系統性下架 30 張，簡介裡一個人名都沒有。**
- **這批的裁定與教訓**：
  1. **本批第 2 條（新）**：`secondary-types` 為空、`primary-type=Album`，
     **仍可能是 7 吋**——要看轄下 release 的 `media.format`。這是裁定 227 的第三個方向。
  2. **本批第 3 條（新）**：當一支團的核心實體全是 7 吋時，
     **收進來的是「唯一收得進來的碟」而不是「最重要的碟」——要在卡上寫明**。
  3. **本批第 5 條（新）**：MB 實體字形與卡池寫法衝突時，
     **掛名與盤名一律取卡池多數形（ASCII 標點）**。
  4. **裁定 250 的四個新實例**：短掛名回問 38 個掛名、MB 回 1,894 個實體、擋下 1,856 個；
     `Beyond` 542、`Terror` 533、`Burn` 405。**目標實體在 Beyond 排第 4（score 72）**、
     Burn 排在 Karma to Burn 之後——**score 完全不可用，disambiguation 是唯一判準**。
  5. **裁定 248 的最強實例**：Quicksand《Manic Compression》被策展層判「三店皆回 0 筆」，
     研究層以 collectionId 端點覆核發現 **us／gb 兩店都在、十二軌一秒不差**。
     **策展層宣告「三店皆 MISS」的 8 張裡有 5 張其實有完整上架版本。**
  6. **`chk-hook-crossgroup` 新標的「note 有校對痕跡風險」22 項**（全在 b 組）——
     那是 note 的禁令體例本身會被寫作層誤抄的風險。
     **處置：寫作層派工加一條「note 的 ⚠ 條目是禁令清單不是素材」，
     並在主線複驗加掃 `⚠`／「不得寫」／「別寫」。實測 44 張洩漏 0 筆。**
     ⚠ **`qa-batch` 另誤報一筆「非拉丁亂碼 Фоно」——那是 Sick of It All 2004 年俄版的廠牌名，
     是真實資料，不是亂碼。這是該檢查的誤報形狀。**
