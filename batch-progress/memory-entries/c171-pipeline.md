### 2026-09-19｜dip-vinyl-shop｜c-171（藝人軸稽核補批）五層管線走完，20 張

**改動摘要**：這一批**不是列舉檔切出來的**——是改用**藝人軸**重掃 541 位藝人、8,937 張 1985 後 Album
才找出的 25 張缺口（**MB 的 `label-info` 沒填或掛錯層級，廠牌軸列舉永遠碰不到，重跑列舉也補不到**）。
**收 20 退 5**（兩張不是 Blue Note、一張撞 c-154、一張合輯、一張非爵士）。
身分 20/20 pinned、簡介 20/20 全 full（192–238）、**封面 14/20、串流 14/20**（回撈七張只救回一張）。
本批 apex 0 張、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c171-*.json`、
`batch-progress/c171/{prop-a,prop-b,slice,caa,apple-candidates,rulings,HANDOFF}`、
`batch-progress/enum/blue-note-artist-axis-audit.{md,json}`。

**驗證結果**：`chk-prop` 兩組標記 0、`qa-batch research/hooks/out c171` 全清、
`chk-hook-crossgroup c171` 20 張全過、`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、
**首句與 hook 逐字相符 20/20**；六個刻意不寫的字串全批實掃 0 命中。

**三條值得記住的**：
1. ⚠ ⚠ **列舉層失敗的第五種形狀：`label-info` 是空陣列或掛錯層級的碟，以廠牌為軸的腳本永遠碰不到，
   而且任何對列舉檔做的檢查都不會亮**（`chk-prop`、`dedup`、tier 稽核全部照過）。
   **7,184 個候選裡沒有任何一個「MB 掛著 Blue Note 家族廠牌」的 RG 被漏掉**
   ——**enum 的 label 軸沒有漏抓，盲區在 MB 那一端。只有改軸才找得到。**
2. ⚠ **稽核產物本身也會錯，3／25**：**一筆引錯碟**（佐證指向另一張同名系列碟）、
   **一筆正規化沒沿用 `chk-prop.mjs` 的 `&`→`and` 而漏掉撞批次**、
   **兩筆把 Discogs `companies` 欄的角色讀成廠牌**（`The Blue Note Tokyo` 的 role 逐字 `Recorded At`＝演出場地）。
   **→ 用稽核產物開批時，策展層必須逐筆點開佐證核對是不是同一張碟；
   任何自訂的比對正規化一律抄 `chk-prop.mjs` 的 `k()`；判家族只讀 `labels` 欄第一格，不讀 `companies`。**
3. ⚠ **「資料缺失高度相關」只在店面／封面那一層成立**：
   本批封面 14/20、串流 14/20（本線最低），**但文字史料完全不受影響，20 張全 `full`、無一張 thin**
   ——**`label-info` 缺失影響的是「以廠牌為軸的列舉」，不影響「以藝人為軸的查證」。**
