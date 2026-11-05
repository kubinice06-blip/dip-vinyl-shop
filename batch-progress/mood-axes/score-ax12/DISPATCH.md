# 新頂點盤線（異端）ax1／ax2 上線當天評分派工（score-ax12）

工單：`chunk-ax1.json`（32 張：harsh noise／HNW／power electronics／工業／日本噪音）、`chunk-ax2.json`（37 張：極端現代音樂、聲音詩、激進即興、極端電子、反結構金屬），由 `select.mjs add-20261104-ax1|ax2` 從 seed 切出。
判準以 **`batch-progress/mood-axes/RULES.md`** 為準（現行統整規則，含作廢規則與六個歸錯陷阱），打分格式與尺照 `batch-progress/mood-axes/score500/BRIEF.md`；店主親裁表 `batch-progress/mood-axes/OWNER-CALIBRATION.md` 當校正錨。兩者衝突時 RULES.md 優先。特別注意：harsh noise、無調、嘶吼屬躁；旋律不明、靠噪音／音色撐屬冷；極低音量的 lowercase／正弦波／場錄、極簡長音照 RULES 判，不要因為「是異端」就一律打成躁重冷。
可參考研究稿的聲音事實：`desc-tools/batches/research/add-20261104-ax{1,2}-*.json`（facts 與 notes 裡的編制、音量、有無鼓），以及寫好的簡介 `desc-tools/batches/output/add-20261104-ax{1,2}-out-*.json`。
輸出 `out/chunk-ax1.json`、`out/chunk-ax2.json`，格式照 BRIEF（id／x／y／z／why／conf，一位小數）。**每做完 5 張寫檔；已有內容就跳過已有 id 接續。** 不上網搜尋。
這條線不是補情緒格，**不算落格率**；照聲音打。
交件後主線跑 `merge.mjs` → `build-priors.mjs`（自動讀所有 score*/scored-*.json）→ `build-scale.mjs v0` → `scripts/build-card-moods.mjs`。
