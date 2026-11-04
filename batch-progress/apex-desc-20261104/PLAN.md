# 頂點卡簡介全面檢查與重寫（apex-desc-20261104）

店主 2026-11-04：嫌《台客的復仇》簡介敷衍，「我覺得很多專輯也有相同的問題」；
看過照新方式（先多查資料、平實寫地位與聲音）重寫的版本後，答應頂點卡照這套做：「好 全部檢查一次」。

**規則全在 `desc-tools/prompts/apex-desc-base.md`**（檢查標準、研究三塊、寫作骨架與語氣、審稿四問、範本）。
派工詞不要重打規則，叫代理先讀那份。

## 範圍

seed 裡 tier 為 hall／heresy／pearl 的全部卡（開工時約殿堂 303、異端 85＋ax1/ax2 新卡、流亡 290）。
**以建工作清單當下的 `origin/main` seed 為準**；之後才上線的頂點卡另開尾批補。
《台客的復仇》已是店主定稿，**排除**。

## 流程

### 第 0 步：檢查（第一個工作階段做）

1. `build-worklist`：從 seed 撈全部頂點卡 → `worklist.json`（key 照 `ALBUM_ONBOARDING.md` §0.5 的 desc2／desc4 規則）。
2. 讀現行簡介：用 Cloudflare KV API 或 `wrangler@4 kv bulk get --remote`（需 `kv-token-check` 通過）。
   **不要用 `/album-desc` 大量讀**——缺鍵時會觸發重新生成並回寫。讀不到簡介的卡直接判 rewrite。
3. 檢查層：4 支 Sonnet 子代理平分，照 apex-desc-base 第一節逐張判 keep／rewrite＋一句理由，不上網。
   每做完 20 張寫進輸出檔；輸出檔已有內容就接續。→ `triage-{1..4}.json`，合併成 `triage.json`。
4. 主線抽查 keep 的卡（至少 20 張或全部 keep 的兩成），不同意就改判。
5. 把 rewrite 清單切批：**每批 30 張，殿堂先、異端次、流亡最後**，同一藝人盡量同批（方便查重複資料），
   批名 `ad-01`、`ad-02`…，寫進本檔「分批表」。

### 每一批（30 張）

1. 卡單 → `desc-tools/batches/cards/ad-XX-cards.json`（含現行簡介，研究層要知道舊稿說了什麼、哪裡可疑）。
2. **研究層：3 支 Sonnet，各 10 張**，照 apex-desc-base 第二節。每做完 3 張寫進輸出檔；已有內容就接續。
   → `desc-tools/batches/research/ad-XX-research-{a,b,c}.json`。
3. 主線看 coverage：三塊有 none 的卡，主線自己補查或在寫作特注標明「這塊只能薄寫」。
4. **寫作層：2 支 Opus，各 15 張**，照 apex-desc-base 第三節。每寫完 5 張寫進輸出檔；已有內容就接續。
   → `desc-tools/batches/output/ad-XX-out-{1,2}.json`（`{key, artist, album, desc}`）。
5. 機器 QA：字數 200–280、禁簡體、全形標點、fix-spacing。
6. **主線逐張審稿**（不派子代理），照 apex-desc-base 第四節與 `REMOTE_RUNBOOK.md` 審稿節，紀錄寫進 `batch-progress/apex-desc-20261104/rulings.md`。
7. 寫 KV：`kv-token-check` exit 0 才寫。
   - 鍵規則與讀取順序看 `scripts/apply-pub-fix-desc.mjs` 檔頭（worker 讀 desc2 → CURATED_DESCS → desc4）：
     **一律寫 desc2**（才能壓過 CURATED_DESCS），該卡原本有 desc4 的也同步寫 desc4。
   - 寫入前把舊值存進 `batch-progress/apex-desc-20261104/kv-before-ad-XX.json`（可回滾）。
   - `wrangler@4 kv bulk put … --remote`，親眼看到 `Success!`；bulk get 逐字回讀；抽 3 張用 `/album-desc` 確認前台讀到新稿。
   - onboarding manifest 有這張卡的 `description.text`，同步改（照 PR #340 台客那次的做法）。
8. 本檔分批表標完成；`PROJECT_MEMORY.md` 最上方追加一筆。

## 工作階段分配

- **每個工作階段做 2 批（60 張）**就收工：開 PR、merge origin/main 解衝突、自己合併。WebSearch 每工作階段 200 次額度。
- 第一個工作階段：第 0 步＋ad-01、ad-02。
- 之後由協調工作階段一次開兩個，各領兩批（批號寫在派工詞）。
- UA 不准放 email：`dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`。
- 容器會重啟：派子代理一律加「每做完 N 筆寫進輸出檔」「輸出檔已有內容就接續」。

## 已知事項（s1 留給後續工作階段）

- **worker 對非 CJK 卡先讀 CURATED_DESCS 再讀 desc2**（ad-01 實測：《Kind of Blue》寫了 desc2 前台仍是 CURATED）。CURATED 裡的卡寫 desc2 不會生效，要店主在 worker 拿掉該筆並部署。已知有《Kind of Blue》（ad-01）、《The Dark Side of the Moon》（後續批）。每批上線後用 `tools/front-check.mjs <批>` 逐張比對前台。
- 每批工具：`tools/ad.mjs cards|before|bulk|manifest`、`tools/apply-review.mjs`（審稿改動檔 `review-ad-XX.json`）、`tools/front-check.mjs`；派工詞 `prompt-research.md`、`prompt-writer.md`。研究檔名 `research/ad-XX-{a,b,c}.json`。
- 寫作層第一版普遍 300–500 字（英文字母計字），派工詞已要求先量再刪次要人名；仍有少數超字要主線壓。

## 分批表

第 0 步 2026-11-04 完成（s1）：頂點卡 677 張（排除台客）→ keep 3、rewrite 674；殿堂 300／異端 85／流亡 289。
明細 `triage.json`、各批 key `batches.json`、工作清單 `worklist.json`（含現行簡介與來源 desc2／desc4／curated）。

| 批 | tier | 張數 | 工作階段 | 狀態 |
|---|---|---:|---|---|
| ad-01 | 殿堂 | 30 | s1 | ✅ 上線 30（前台 29，Kind of Blue 待 worker 拿掉 CURATED） |
| ad-02 | 殿堂 | 30 | s1 | ✅ 上線 30（前台 30） |
| ad-03 | 殿堂 | 30 | s2 | ✅ 上線 30（前台 30） |
| ad-04 | 殿堂 | 30 | s2 | ✅ 上線 30（前台 29，Dark Side of the Moon 待 worker 拿掉 CURATED） |
| ad-05 | 殿堂 | 30 |  | 待派 |
| ad-06 | 殿堂 | 30 |  | 待派 |
| ad-07 | 殿堂 | 30 |  | 待派 |
| ad-08 | 殿堂 | 30 |  | 待派 |
| ad-09 | 殿堂 | 30 |  | 待派 |
| ad-10 | 殿堂 | 30 |  | 待派 |
| ad-11 | 異端 | 30 |  | 待派 |
| ad-12 | 異端 | 30 |  | 待派 |
| ad-13 | 異端 | 25 |  | 待派 |
| ad-14 | 流亡 | 30 |  | 待派 |
| ad-15 | 流亡 | 30 |  | 待派 |
| ad-16 | 流亡 | 30 |  | 待派 |
| ad-17 | 流亡 | 30 |  | 待派 |
| ad-18 | 流亡 | 30 |  | 待派 |
| ad-19 | 流亡 | 30 |  | 待派 |
| ad-20 | 流亡 | 30 |  | 待派 |
| ad-21 | 流亡 | 30 |  | 待派 |
| ad-22 | 流亡 | 30 |  | 待派 |
| ad-23 | 流亡 | 19 |  | 待派 |
