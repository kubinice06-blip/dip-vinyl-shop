# 薄細項策展線（ts）交接（add-20261020-ts1…ts6）

店主 2026-10-20：「幫我掃描一下細項是否有些太少，比如越南搖滾只有一張；太少的策展增加卡池」→「開始跑」。
計畫：`batch-progress/EXPANSION-PLAN-thin-subgenres.md`。接力授權：中途不回報、裁定自己定、寫進各批 `rulings.md`（CLAUDE.md「接力任務」）。
雲端：推 `claude/remote-runbook-album-onboarding-mszieh`、開 PR、店主合併；不訂閱 PR、不排 PR 檢查。

## 一、進度

| 步 | 內容 | 狀態 |
|---|---|---|
| 補標 | `genre-l3-artist-map.json`＋`build-genre-tree.mjs` 步驟 2.6；13 個節點過門檻 | ✅ 2026-10-20 提交 |
| 策展 a／b／c | 越柬新／泰菲馬／巴印蒙孟＋印尼補缺（`curation-{a,b,c}.json`） | 進行中 |
| ts1 | 東南亞搖滾 45 | 待策展交件 |
| ts2 | 南亞與內亞搖滾＋東南亞第二輪 | 待策展交件 |
| ts3 | 非洲（剛果、衣索比亞、南部非洲） | 未開始 |
| ts4 | Fado、Flamenco、Tango、巴爾幹 | 未開始 |
| ts5 | 嘻哈深度（台韓法、Bounce、Cloud） | 未開始 |
| ts6 | Neofolk、Psy、50 年代搖滾與 Doo-wop 原盤 | 未開始 |

## 二、每批流程（腳本在 `batch-progress/thin-sub-20261020/`，複製自 downtempo 線）

0. 策展：派工讀 `CUR-DISPATCH.md`（ts3 起要改分組表）。交件後 `build-master.mjs <組…>` 回查 MB；主線刪改寫 `master-override.json`（`{drop:[[藝人,盤]], fix:{"藝人|盤":{…}}}`）與 rulings。
1. 主線依地區配額寫選取檔 `batch-progress/<批>/pick.json`（`["藝人|盤",…]`），`build-cards.mjs <批> <pick.json>`；建 `batch-progress/<批>/rulings.md`（條號區間照 dt 線格式：研究 a–e 各 10、鉤子 10、寫作 10、主線 10）。
2. 研究層 5 支 Sonnet：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/thin-sub-20261020/RES-DISPATCH.md` 並照做。批名：<批>；組別：x。」同時背景跑 `meta.mjs <批>`。
3. 研究交件後照研究層推翻的改卡單 → `cd desc-tools && node qa-batch.mjs research <批>`。
4. 鉤子 2 支 Opus（a–c、d–e）讀 `HOOK-DISPATCH.md` → `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。
5. 寫作 2 支 Opus 讀 `WRITER-DISPATCH.md` → `qa-batch out`、`qa-check-research`、`fix-spacing`。
6. 主線：試聽（`preview-override.json` → `picks.mjs`）、封面（人工身分卡一定要 `covers.json`；CAA 縮圖表 `cover-sheet.cjs`；Discogs 封面 `add-registry.mjs` ＋ `scripts/render-discogs-registry.mjs`）、冷門軸錨點制（ALBUM_ONBOARDING §0.8，`ratings-override.json` 的 `source: manual:regional-rubric`）、逐張審稿 → `build-manifest.mjs <批>` → `scripts/verify-album-onboarding.mjs`。
7. 寫入照 `HANDOFF-downtempo-line.md` 第二節第 6 步（manifest → catalog patches → KV → verify → preview → audio map → pool → seed genres → mark published → published gate）。
8. **亞洲搖滾國別**：新藝人寫進 `rock-asia-country-map.json`（`scripts/build-asia-country-map.mjs` 列待裁定），再 `build-genre-tree.mjs --pull --write`、`build-draw-covers.mjs --pull --write`。
9. 情緒評分：切 45 張工單照 `batch-progress/mood-axes/score500/BRIEF.md` 評分、併進來源層、重跑 `build-priors.mjs`／`build-scale.mjs v0`。
10. 藝人介紹（ALBUM_ONBOARDING §11）→ PROJECT_MEMORY → 逐檔 git add → commit → push。
