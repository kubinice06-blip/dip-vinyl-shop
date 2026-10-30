# 店主 Spotify 追蹤藝人補卡池（2026-10-30 起）

店主指示（2026-10-30，`/dip-card-create`）：依 `batch-progress/spotify-follow-gap-2026-10-29/gap.json` 補卡池。
1. 先上 `favoriteAlbums` 38 張，指定盤就是那張。
2. 再處理 `missingArtists` 361 位：每位挑 1–2 張代表作（生涯最受肯定、最具代表性的**錄音室專輯**），依場景分批、每批約 40 張。
3. 每位藝人先做身分與去重（清單是 Spotify 的羅馬拼音／英文名，卡池可能用原文名，例 Jo-Yu Chen＝陳珊妮、Layton Wu＝吳卓源）。池中已有就跳過，寫進該批 rulings.md。
4. 走 `ALBUM_ONBOARDING.md` 完整流程：封面、三軸、頂點判定、簡介、試聽、情緒三軸（照 `batch-progress/mood-axes/RULES.md`）、published gate。
5. 新上架藝人補藝人介紹（roster tier D、`addedBy` 標批名、跑 `dip-artist-intro`）。
6. 一路接力，不中途回報；裁定自己決定、寫進 rulings.md；每個工作階段最多 2 批，額度用完交接本檔。

## 分批（`batches.json`）

| 批 | 場景（只是為了效率，分錯場景照收，不搬批） | 藝人數 | 藝人介紹批號 | 狀態 |
|---|---|---:|---|---|
| sf01 | favoriteAlbums 38 張（指定盤） | 38 張 | ar-d-201（✅ 介紹上線 29／skipped 1） | ✅ 上線 36（跳過 1 張已在池：椎名林檎《無罪モラトリアム》；不收 1：Vayda 查無此盤）；新藝人 30 位 → ar-d-201 cut |
| sf02 | 日本：搖滾、獨立、流行、偶像、金屬 | 30 | ar-d-202（✅ 介紹上線 26／skipped 4） | ✅ 上線 45（跳過 0 位已在池；30 位全收）；新藝人 30 位 → ar-d-202 cut |
| sf03 | 日本：地下、迷幻、即興、和樂器 | 20 | ar-d-203 | ✅ 上線 23（跳過 0 位已在池；20 位全收；試聽 ready 19／unavailable 4；頂點 0；藝人介紹 20 位 → ar-d-203 cut） |
| sf04 | 日本：電子、ambient、嘻哈、lo-fi、YMO 周邊 | 28 | ar-d-204 | ✅ 上線 28（跳過 0 位已在池；收 26 位，不收 2 位：ILL BONE 無合格錄音室作、Buddhablessyou 查無；試聽 ready 24／unavailable 4；頂點 0；藝人介紹 26 位 → ar-d-204 cut） |
| sf05 | 台灣華語：流行、R&B、獨立樂團 | 27 | ar-d-205（✅ 介紹上線 17／skipped 3） | ✅ 上線 24（跳過 1 位已在池；不收 6 位） |
| sf06 | 華語其他、港、韓、泰；未確定身分的華語名 | 29 | ar-d-206 | 派→Spotify 補卡 sf06、sf08 |
| sf07 | 西洋 60–80 年代：迷幻、prog、硬搖滾、krautrock、post-punk | 35 | ar-d-207（✅ 介紹上線 32／skipped 0） | ✅ 上線 47（跳過 0 位已在池；不收 3 位） |
| sf08 | 西洋 90 年代至今：獨立、alt、迷幻、shoegaze、民謠 | 41 | ar-d-208 | 派→Spotify 補卡 sf06、sf08 |
| sf09 | 爵士（含日韓爵士、ECM、世界爵士） | 41 | ar-d-209 | ✅ 上線 39（跳過 4 位已在池；收 32 位，不收 2 位：Jon Christensen 無領銜盤、Multiverse 是台灣嘻哈廠牌帳號；頂點 0；藝人介紹 32 位 cut） |
| sf10 | 電子、實驗、新古典鋼琴、house | 33 | ar-d-210 | ✅ 上線 37（跳過 0 位已在池；收 32 位，不收 1 位：Gibran Alcocer 只有 EP；頂點 0；藝人介紹 33 位 cut） |
| sf11 | 冷門與身分待查（電子、lo-fi、小廠牌） | 35 | ar-d-211 | 派→Spotify 補卡 sf11、sf12 |
| sf12 | 嘻哈、R&B、靈魂、流行、以色列 | 32 | ar-d-212 | 派→Spotify 補卡 sf11、sf12 |

- `coveredBySf01`：Bardo Pond、My Sleeping Karma、Ningen Isu、Klimeks、Patrick Holland、冠宇、烏賊紳士。這幾位的指定盤在 sf01，sf02–12 不再挑。
- `skipLabels`：Flow State Records、War Child Records、Chicago Blues Radio 是廠牌或頻道，不是藝人，不收。其他看起來像廠牌或合輯帳號的（例 Tokimeki Records、Fresh Moods、Food-Spotter），在策展層查明後自行裁定，寫進 rulings。
- 藝人介紹批號預先保留 **ar-d-201～212**（每批一號；新藝人超過 45 位就把多出來的開 ar-d-221～232，對應 sf01～12）。店主另一個對話的藝人介紹線在 ar-d-1xx，**不要用 1xx 的號**。

## 每批流程

沿用情緒薄格線的整套腳本與派工詞（`batch-progress/mood-cells-20261022/`，流程見 `batch-progress/HANDOFF-mood-cells-line.md` §二、§三、§四）。只有三處不同：

1. **策展層換成 `batch-progress/spotify-follow-20261030/CUR-DISPATCH-SF.md`**。不挑場景、不看落格：照藝人清單做身分、去重、挑代表作。產出仍是 `batch-progress/mood-cells-20261022/curation-<批>.json`，格式相同，後面的 `build-master.mjs`、`build-cards.mjs`、研究、鉤子、寫作都直接沿用。組別就是批名，例 `sf02`。
   - 一批 40 位左右，派 **2 支 Sonnet**，各負責一半藝人（組別寫 `sf02a`、`sf02b`）；`build-master.mjs sf02a sf02b` 合併。
   - 批資料夾 `batch-progress/add-20261030-<批>/`（日期取開工當天）。
2. **不做 moodGuess 邊距檢查**。這條線不是補情緒格，策展填的 `moodGuess` 只是參考，不拿來汰卡。上線當天照 §二 第 9 步做情緒評分，判準以 **`batch-progress/mood-axes/RULES.md`** 為準，不算落格率。
3. **藝人介紹由專門的工作階段跑**。卡片工作階段在 rulings.md 末尾列出「本批新藝人（無介紹）」，並把名冊寫進 `batch-progress/artist-intro/roster-<批>.json`（tier D、`addedBy: add-20261030-<批>`），progress.json 追加預留的批號（`state: cut`）。補洞、寫作、上架由調度派的藝人介紹工作階段照 `dip-artist-intro` skill 跑。

## 共用規矩

- 合併前照 HANDOFF §三處理衝突：產生檔取 main 版再重跑，`PROJECT_MEMORY.md` 與本檔兩邊都留。
- **寫 card_catalog／KV 前，對 origin 所有 `claude/*` 分支的 seed 再跑一次去重**（md7／md8 撞卡先例）。
- 雲端邊界照 `REMOTE_RUNBOOK.md`：
  - `kv-token-check` 通過才寫 KV。
  - 審稿由主線自己做。
  - 推自己的分支、開 PR、自己合併，不訂閱 PR。
- 代理派工一律加兩句：「每做完 N 筆寫進輸出檔」「輸出檔已有內容就接續」。輔助腳本放 scratchpad 子資料夾。
- 收工時在本檔分批表的狀態欄寫 `✅ 上線 N（跳過 M 位已在池）`，並更新 `PROJECT_MEMORY.md`。

## sf05／sf07 收工筆記（2026-10-30）
- **PLAN 開頭的「Layton Wu＝吳卓源」是錯的**：Layton Wu 是另一位台灣創作者（雷頓狗），已照新藝人收。
- 驗 gate 時發現 `mbAbsenceProof` 必須是物件（queries／checkedAt／conclusion），策展與 build-cards 產的是字串——上線前要轉；重查時還抓到 2 張其實 MB 有條目（Karencici、Martin & Garp），改釘住。
- 藝人介紹名冊每批一檔 `batch-progress/artist-intro/roster-<批>.json`（格式：`{generatedAt, source, addedBy, artists, entries:[roster-20260929 同欄位]}`），progress.json 追加預留號 state cut、`desc-tools/batches/artist/cut/<號>.txt`。
- 情緒評分兩批共用 `batch-progress/mood-axes/score-sf0507/`（select／merge 複製自 score-ml59）。

## sf03／sf04 收工筆記（2026-10-30）
- **條號**：sf03 用 41201–41280、sf04 用 41301–41380（sfNN → 41001＋(NN−1)×100；30000＋批號×100 制的 303xx 已被舊 c 批佔用）。
- **策展給的「已在池」要回查 seed**：sf04b 把 U.TA屋塔判成「已在 curation-ml4」跳過，其實 ml4 研究層汰掉、從未上線；主線補收。判準只看 seed／卡池，不看別線的策展檔。
- **現場盤、EP 要研究層才抓得到**：スズキジュンゾ《Ode to a Blue Ghost》是三首現場 CD-R（換《Buried Sky, Spider Torn To Pieces》）；ILL BONE《死者》原版 4 曲 EP、《日本》是合輯＋現場 → 整位不收。
- 研究層偶爾交 `status: partial`，research-base 只認 full／thin，主線改值後 qa 才算數。
- `genre-l3-artist-map.json` 的 `_note` 欄已是逐字拆開的字元陣列（舊批遺留），不影響建樹，沒動。
