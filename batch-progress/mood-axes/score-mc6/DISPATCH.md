# 情緒薄格策展線 mc6 批上線當天評分派工（score-mc6）

一批一份工單：`chunk-mc6.json`（由 `select.mjs <批名>` 從 seed 切出，本批上線張數）。
代理照 `batch-progress/mood-axes/score500/BRIEF.md` 打分（**先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完**：能量＝兇不兇優先於快不快，有攻擊沒拍仍是靜；質地＝包覆感也算重）。
輸出 `out/chunk-<tag>.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
**格子是結果不是目標**：這批卡是照「會落冷冽」挑的，但評分要憑聲音打，不要為了湊冷冽調數字——落格率就是這條線的驗收指標，灌水等於毀掉驗收。
交件後主線跑 `node batch-progress/mood-axes/score-mc6/merge.mjs` → `build-priors.mjs`（自動讀所有 score*/scored-*.json）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
