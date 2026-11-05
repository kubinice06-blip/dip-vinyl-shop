# 情緒薄格策展線 ml59 上線當天評分派工（score-ml59）

工單：`chunk-ml59.json`（由 `select.mjs add-20261024-ml59` 從 seed 切出）。
代理照 `batch-progress/mood-axes/score500/BRIEF.md` 打分（**先把 X／Y／Z 三節，以 2026-10-23 店主「體感標準」為準：能量＝體感、色溫＝聲響溫度＋旋律清楚度與 104 張校正表讀完**）。
輸出 `out/chunk-ml59.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
**格子是結果不是目標**：這批卡是照「會落恍惚」挑的，但評分要憑聲音打，不要為了湊恍惚調數字——落格率是這條線的驗收指標，灌水等於毀掉驗收。
交件後主線跑 `merge.mjs` → `build-priors.mjs`（自動讀所有 score*/scored-*.json）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs`；落格率 `landing.mjs add-20261024-ml59 恍惚`。
