# Spotify 追蹤藝人補卡池 sf05／sf07 上線當天評分派工（score-sf0507）

工單：`chunk-sf05.json`（24 張）、`chunk-sf07.json`（47 張），由 `select.mjs add-20261030-sf05|sf07` 從 seed 切出。
判準以 **`batch-progress/mood-axes/RULES.md`** 為準（全檔讀完：八格門檻、三軸怎麼判、六個歸錯陷阱）；輸出格式照 `batch-progress/mood-axes/score500/BRIEF.md`（id／x／y／z／why／conf，一位小數）。
輸出 `out/chunk-<批>.json`。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋，憑你對這張唱片聲音的認識打；冷門盤可讀 `desc-tools/batches/research/add-20261030-<批>-*.json` 的 `sound` 欄與簡介。
這條線不是補情緒格，**不算落格率**，照聲音打就好。
交件後主線跑 `merge.mjs` → `build-priors.mjs` → `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
