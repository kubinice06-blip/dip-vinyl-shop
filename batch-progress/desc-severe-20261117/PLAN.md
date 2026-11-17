# 一般卡嚴重簡介重寫（desc-severe-20261117，批名 sd-XX）

店主 2026-11-17 看到林強《驚蟄》整段只講軌序和曲長：「這介紹跟沒介紹一樣，這到底是什麼專輯？故事在哪？概念在哪？……檢查是不是很多都這樣。」
抽查 400 張一般卡：severe 17%、rewrite 48%、keep 35%（`batch-progress/desc-audit-20261117/`）。店主：「修嚴重的先」。

**規則全在 `desc-tools/prompts/general-desc-base.md`**（檢查標準、研究三塊、寫作骨架、審稿）。語氣、格式、審稿四問沿用 `desc-tools/prompts/apex-desc-base.md`。
派工詞不要重打規則，叫代理先讀那兩份。

## 範圍

seed 裡**沒有 tier** 的一般卡，第 0 步判為 `severe` 的全部（推估約 3,600 張）。`rewrite` 級另案，等店主決定。
以第 0 步當下的 `origin/main` seed 為準；之後新上架的卡不在本線。

## 流程

### 第 0 步：全卡池判定（第一個工作階段做）

1. 讀現行簡介：`node batch-progress/desc-audit-20261117/dump-descs.mjs <輸出目錄>`（寫到 `<輸出目錄>/da/descs.json`，中斷重跑會接續）（Cloudflare KV bulk get，desc2 → desc4；需 `kv-token-check` 通過）。**不要用 `/album-desc` 大量讀。**
2. 一般卡切成每份約 300 張（`{k, artist, album, year, desc}`），Sonnet 子代理照 general-desc-base 第一節判 severe／rewrite／keep，附 codes 與 why（≤25 字）。不上網。
   每做完 50 張寫進輸出檔；輸出檔已有內容就接續。同時最多 8 支在飛。→ `triage/triage-NNN.json`，合併成 `triage.json`。
3. 主線抽查：severe 至少抽 40 張、keep 至少抽 40 張，對照 `desc-audit-20261117/sample-400.json` 的判準；偏鬆或偏嚴就調整派工詞重判那幾份。
4. severe 清單切批，**每批 30 張**，順序：**中日韓台的卡先**（藝人或盤名有 CJK 字）→ 經典度 ≥4 → 其餘；同一藝人盡量同批。批名 `sd-001`、`sd-002`…，寫進 `batches.json` 與本檔「分批表」。

### 每一批（30 張）

照 `batch-progress/apex-desc-20261104/PLAN.md`「每一批」的七步，差別：

- 卡單 → `desc-tools/batches/cards/sd-XXX-cards.json`（含現行簡介）。
- 研究層 3 支 Sonnet 各 10 張，照 **general-desc-base 第二節**（MB／Discogs 只確認身分，不當 facts 主體）。每做完 3 張寫進輸出檔；已有內容就接續。
- 寫作層 2 支 Opus 各 15 張，照 **general-desc-base 第三節**，字數 180–240。每寫完 5 張寫進輸出檔；已有內容就接續。
- 機器 QA：字數、禁簡體、全形標點、fix-spacing，**再加一條：全文不得出現軌序／曲長（`\d+:\d\d`）／盤號／目錄號**。
- **主線逐張審稿**（不派子代理），照 general-desc-base 第四節，紀錄寫進本目錄 `rulings.md`。
- 寫 KV：`kv-token-check` exit 0 才寫。**一律寫 desc2**，該卡原本有 desc4 的也同步寫 desc4；寫前存 `kv-before-sd-XXX.json`；bulk put 後逐字回讀；抽 3 張前台確認。
- onboarding manifest 有這張卡的 `description.text`，同步改。
- 工具可沿用 `batch-progress/apex-desc-20261104/tools/`（`ad.mjs cards|before|bulk|manifest`、`apply-review.mjs`、`front-check.mjs`、`check-curated.mjs`），複製到本目錄 `tools/` 改批名與路徑後用。
  **非 CJK 卡注意 worker 的 CURATED_DESCS 會蓋過 desc2**（apex 線《Kind of Blue》前例）——`front-check` 對不上的列進「待店主處理」。

## 工作階段分配

- 第一個工作階段：第 0 步＋sd-001、sd-002。
- 之後協調工作階段一次開 3 個，各領兩批（批號寫在派工詞）。
- 每個工作階段做 2 批（60 張）就收工：開 PR、merge origin/main 解衝突、自己合併；本檔分批表標完成、`PROJECT_MEMORY.md` 最上方追加一筆。
- 容器會重啟：派子代理一律加「每做完 N 筆寫進輸出檔」「輸出檔已有內容就接續」。

## 分批表

（第 0 步完成後由第一個工作階段填）

| 批 | 範圍 | 張數 | 工作階段 | 狀態 |
|---|---|---:|---|---|
