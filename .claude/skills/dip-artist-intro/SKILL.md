---
name: dip-artist-intro
description: 跑 dip vinyl 藝人介紹產線（點藝人名跳出的小視窗文字）——切批、萃取、補洞 4 組（Sonnet）、寫作 2 組（Opus）、機器 QA、主線逐位審稿、別名補鍵、建分片、提交。用於「跑藝人介紹」「先跑十批」「接力跑到 A 級做完」「繼續跑 ar-a-005」類請求。接受批次號或批數當參數。
---

# dip-artist-intro — 藝人介紹產線

工作目錄 `desc-tools/`（雲端 `/home/user/dip-vinyl-shop/desc-tools`）。規格全在：
`ARTIST_INTRO_PLAN.md` §4.3、§9；`prompts/artist-gap-base.md`、`prompts/artist-writer-base.md`、`prompts/artist-dispatch.md`。
歷來店主裁定：`batch-progress/artist-intro/ar-trial-*-rulings.md`；量產裁定寫進 `batch-progress/artist-intro/ar-a-rulings.md`（依分級換檔）。

## 狀態與續跑

`batches/artist/progress.json` 每批一筆，`state`：`cut → gap → written → published`。
**開工先讀它**：`gap` 就看 `research/<批>-g1..4.json` 缺誰、重派缺的組；`written` 同理看 `output/<批>-out-1/2.json`。
代理輸出檔已有內容會接續補完，所以重派同一組派工詞即可。

## 每批六步

1. **萃取**：`node artist-extract.mjs --lean <批> --file batches/artist/cut/<批>.txt`（卡單由 `artist-cut.mjs` 切好）。
2. **補洞**：`node artist-prompt.mjs <批> gap 1..4` 印出派工詞，4 支 Sonnet 背景派出。
3. **補洞 QA**：`node qa-artist.mjs gap <批>`，只處理 ⚠。
4. **寫作**：`node artist-prompt.mjs <批> write 1..2`，2 支 Opus（w1 讀 g1+g2、w2 讀 g3+g4）。
5. **審稿**：`node qa-artist.mjs out <批>` 到 0 處，再 `node artist-review.mjs <批>` 逐位對事實。
   **主線逐位審，不外包。** 重點：⚑ 標的數字、單一來源寫成定論、「一生」用在在世者、共同得獎寫成獨得、
   拆夥後的事寫成原因、notes／conflicts 標「不收」的值、同名混卡、轉述句、口語。改動直接改 output 檔，記進 rulings。
6. **上架**：`node artist-alias.mjs` → `node ../scripts/build-artist-intros.mjs`（cwd 回 repo 根）→ progress 標 `published` →
   逐一 `git add` 本批檔案（**絕不 `git add -A`**）→ commit → push 到本工作分支。

## 接力節奏（併行上限四支）

批 N 補洞交齊 → 派批 N 寫作 2 支 ＋ 批 N+1 補洞前 2 組；批 N 寫作交件 → 派批 N+1 補洞後 2 組，主線審批 N、上架批 N。
上架嚴格照批號順序，一次只審一批。長接力用 `send_later` 排 25 分鐘自我 check-in。
**中途不回報**，只在需要店主裁定或整條線收尾時回聊天（CLAUDE.md「接力任務不要中途回報」）。

## 不碰

雲端不碰 `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore。上線簡介的錯記在補洞稿的 `pubIssues`，
`node artist-issues.mjs` 彙整成 `audits/ARTIST-PUB-ISSUES.md` 交本機。
