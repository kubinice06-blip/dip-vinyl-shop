# 新頂點盤線 ax5（美國自由爵士異端）上線當天評分派工（score-ax5）

工單：`chunk-ax5.json`（7 張：Luna Surface、Bäbi、The Hated Music、Hard Time、Throat、In Search of the Mystery、Strange Strings），由 `select.mjs add-20261104-ax5` 從 seed 切出。
判準以 **`batch-progress/mood-axes/RULES.md`** 為準，打分格式與尺照 `batch-progress/mood-axes/score500/BRIEF.md`；店主親裁表 `batch-progress/mood-axes/OWNER-CALIBRATION.md` 當校正錨。兩者衝突時 RULES.md 優先。不要因為「是異端」就一律打成躁重冷：尖嘯式集體即興屬躁；Strange Strings 是走音撥弦的質地，照聲音判。
可參考研究稿的聲音事實：`desc-tools/batches/research/add-20261104-ax5-{a,b,d}.json`，以及簡介 `desc-tools/batches/output/add-20261104-ax5-out-{1,2}.json`。
輸出 `out/chunk-ax5.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
交件後主線跑 `merge.mjs` → `build-priors.mjs` → `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
