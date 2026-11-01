# 鐵幕爵士＋MPS 策展線 eb1／eb2 上線當天評分派工（score-eb12）

工單：`chunk-eb1.json`（40 張）、`chunk-eb2.json`（39 張），由 `select.mjs add-20261101-eb1|eb2` 從 seed 切出。
判準以 **`batch-progress/mood-axes/RULES.md`** 為準（現行統整規則，含作廢規則與六個歸錯陷阱），打分格式與尺照 `batch-progress/mood-axes/score500/BRIEF.md`；店主親裁表 `batch-progress/mood-axes/OWNER-CALIBRATION.md` 當校正錨。兩者衝突時 RULES.md 優先。特別注意：**自由爵士、前衛爵士、無調即興一律不在靜**；主流咆勃／硬咆勃有主題旋律 → 暖。
可參考研究稿的聲音事實：`desc-tools/batches/research/add-20261101-eb{1,2}-*.json`（facts 裡的編制、速度、樂器），以及寫好的簡介 `desc-tools/batches/output/add-20261101-eb{1,2}-out-*.json`。
輸出 `out/chunk-eb1.json`、`out/chunk-eb2.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
這條線不是補情緒格，**不算落格率**；照聲音打。
交件後主線跑 `merge.mjs` → `build-priors.mjs`（自動讀所有 score*/scored-*.json）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
