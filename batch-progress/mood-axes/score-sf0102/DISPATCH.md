# 店主 Spotify 追蹤藝人補卡池 sf01／sf02 上線當天評分派工（score-sf0102）

工單：`chunk-sf01.json`（36）、`chunk-sf02.json`（45），由 `select.mjs add-20261030-sf0X` 從 seed 切出。
判準以 **`batch-progress/mood-axes/RULES.md`** 為準（2026-10-29 統整、遇衝突以它為準）；輸出格式與作業方式照 `batch-progress/mood-axes/score500/BRIEF.md`（id／x／y／z／why／conf，一位小數）。
輸出 `out/chunk-sf0X.json`。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋（聲音事實可讀 `desc-tools/batches/research/add-20261030-sf0X-*.json` 的 facts 與簡介成品 `desc-tools/batches/output/add-20261030-sf0X-out-*.json`）。
這條線**不算落格率**、沒有目標格：憑聲音打分即可。
交件後主線跑 `merge.mjs` → `build-priors.mjs` → `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
