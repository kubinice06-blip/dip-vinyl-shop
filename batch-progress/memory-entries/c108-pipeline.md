## 2026-09-06 — dip-vinyl-shop — c-108 走完雲端段（拉丁第二圈，45 張）

- **改動摘要**：店主 2026-09-06「接著跑完 16 批」的一批，`lineType: 廣度`。
  **45 張、22 位掛名**（a 秘魯 chicha 與亞馬遜 cumbia 21／b salsa dura、古巴、
  nueva canción、智利搖滾 24），年份 1954–2011。
  **chicha 與 cumbia 這兩塊在池中此前全零。**
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、§5.6 合輯 0 張。**
- **主要檔案**：`batch-progress/c108/`（prop-{a,b}、caa.json、chk-prop.mjs、HANDOFF.md、
  apple-candidates.md）、`desc-tools/batches/research/c108-{a,b}.json`、
  `hooks/c108-hooks-{a,b}.json`、`input/c108-writer-{1,2}.json`、`output/c108-out-{1,2}.json`、
  `batch-progress/probe/previews.json`（**5 筆人工改指**）。
- **驗證結果**：`qa-batch research/hooks/out c108` 全過、`chk-hook-crossgroup c108` 45 張
  （hook 加權 21–45.5、note 244–348）、`fix-spacing` 兩檔待補 0。
  out-1 21 張 192–240、out-2 24 張 153–240（partial 4 張 153／179 之間）。
  主線一次性複驗：**45 張 `desc` 開頭與 `hook` 逐字相符**；
  兩支寫作層各自掃過資料庫名、榜單評分、序數首創語，**三類都是 0 次**。
  **封面 39/45、試聽 41/45（pe 35／cl 3／us 2／gb 1）。**
- **這批的裁定與教訓**：
  1. **第 182 條的發源**（群星掛名的跨語言等價）與**第 183 條的發源**
     （再發權比原產國更能預測上架市場）。十店面實測 pe 30／cl 5／us 3，
     **`co mx ar gb es fr br` 七店零首次命中**——我原本把 `co` 排第二，理由是
     「哥倫比亞 cumbia 的原廠在哥倫比亞」，實測不成立。
  2. **第 184 條的發源**：`chk-prop` 只擋單向，把 Album 寫成 Compilation 它不會標。
     本批 45 張逐張回問 `primary-type`，**全部是 Album**，5 張帶 secondary `[Compilation]`、
     1 張帶 `[Live]`。這是第 167 條的第五批同結果。
  3. **探測層四處配對錯誤，兩處是「重製版／再版冒充原盤」**：
     Eddie Palmieri《Sentido》配到 6 軌 2025 重製版（曲序重排、三軌長度差 27 秒–2 分 8 秒）、
     Chabuca Granda《Dialogando...》配到 17 軌 ℗1995 版且掛名多一個 Fetiche。
     **拉丁老盤的線上版幾乎都是再版，逐軌長度是唯一可靠的鍵。**
  4. **兩張的線上版曲序與原盤 A／B 面整段對調**（Los Ángeles Negros），
     行文禁提曲序與軌號。**這是第 157 條在拉丁線的形狀。**
  5. **Los Jaivas《El volantín》十店面 search 全 0，只有藝人目錄撈得到**——
     第 185 條不限於非拉丁字母的盤名，西語盤也會中。
  6. **策展層的「第一／唯一／最早」被攻破 5 處無來源主張**，
     其中「Los Mirlos 是亞馬遜 cumbia 的創造者」這種創始權主張最危險，一律不入文。
