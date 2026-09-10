## 2026-09-06 — dip-vinyl-shop — c-114 走完雲端段（美國福音 Nashboro §1，40 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`，**§1 人工身分批**。
  **40 張、17 位掛名**（a Nashboro 本家 1960–68 20／b 後期與 Creed／Gospel Roots／Peacock 20），
  年份 1960–1980，曲風全部 soul。
  **40 張全部 §1、零跨批撞卡。** §1 舉證張張齊備、**沒有一張只靠 Discogs**。
- **主要檔案**：`batch-progress/c114/`（prop-{a,b}、chk-prop.mjs、rulings.md、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c114-{a,b}.json`、
  `hooks/c114-hooks-{a,b}.json`、`input/c114-writer-{1,2}.json`、`output/c114-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**補 3 筆**）。
- **驗證結果**：`qa-batch research/hooks/out c114` 全過、`chk-hook-crossgroup c114` 40 張
  （hook 加權 15.5–28、note 224–350）、`fix-spacing` 兩檔待補 0。
  out-1 20 張 139–180、out-2 20 張 161–239，thin 卡 3 張全部 ≤180。
  主線一次性複驗：**40 張 `desc` 開頭與 `hook` 逐字相符**、**四位中文數字年 0 筆**、
  資料庫名與榜單評分兩類皆 0 次。
  **試聽 7/40（全部 us）；封面 39 張 manual-scan ＋ 1 張 apple-verified-collection。**
- **⚠ 本機的工作量**：**39 張封面要從 Discogs 掃圖**（40 張條目都附實體掃圖，27 張有 4 張圖），
  策展層已逐張把掃圖數記在 `risk` 欄。
- **這批的裁定與教訓**：
  1. **第 202 條的發源**：**美國線 §1 的標準第二來源是 bsnpubs 的廠牌專輯目錄**，40 張全靠它。
     同時排除三個來源：45worlds／45cat 整站 Cloudflare 403、
     LoC 的 `fo=json` 回非 JSON、Internet Archive 只有 78 轉單面。
  2. **第 204 條的發源與實測復現**：**`The Brooklyn All Stars` 分寫與帶連字號的 score 100
     都回サザンオールスターズ**。含 All Stars 的掛名三種寫法都要跑。
  3. **第 203／205 條的發源**：Apple 上還在賣不等於 MB 有建檔（§1 資格只看 MB）；
     福音線的同名先行 7 吋單曲是常態，**年份一律取 LP**。
  4. **第 235 條的第二個實例**：**§1 的舉證連結會指錯碟**——
     Supreme Angels《Shame On You》引的 Apple id 是 1996 年生涯精選，
     14 軌只有 2 軌與 1974 原盤重合。`coverSourceHint` 已改回 `manual-scan`。
  5. **策展層的目錄數量全錯 5 處、傳記事實錯 5 處**——
     五個「這位藝人一共出過幾張」全部偏低或偏高。
     **`curatorWhy` 的目錄數量要與序數同級當成待查證欄位。**
  6. **第 242 條在這批完全成立**：兩支寫作層都是**上限吃緊、無一張掉下限**
     （writer-2 有 11/20 初稿超上限）。§1 批不必然要防下限，看的是曲名的字元寬度。
