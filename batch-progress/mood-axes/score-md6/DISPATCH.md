# 情緒薄格策展線 md5／md6 上線當天評分派工（score-md5、score-md6）

一批一份工單：`score-md5/chunk-md5.json`、`score-md6/chunk-md6.json`（由各自 `select.mjs <批名>` 從 seed 切出，45 張；select 改成自動排除所有 `score*/scored-*.json` 已評的卡）。
代理照 `batch-progress/mood-axes/score500/BRIEF.md` 打分（**先把 X／Y／Z 三節含 2026-10-22 的兩條新規則讀完**：能量＝兇不兇優先於快不快，有攻擊沒拍仍是靜；質地＝包覆感也算重）。
輸出 `out/chunk-<tag>.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
**格子是結果不是目標**：這批卡是照「會落頹靡」挑的，但評分要憑聲音打，不要為了湊頹靡調數字——落格率就是這條線的驗收指標，灌水等於毀掉驗收。
交件後主線跑各自 `merge.mjs` → `build-priors.mjs`（自動讀所有 `score*/scored-*.json`）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs`，再 `landing.mjs <批名>` 算落格率。
