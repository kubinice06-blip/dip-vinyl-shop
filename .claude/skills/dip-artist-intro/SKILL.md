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

## 每批步驟（2026-10-03 省額度版）

1. **切批與萃取**：卡單寫進 `batches/artist/cut/<批>.txt`（progress.json 的 keys），再 `node artist-extract.mjs --lean <批> --file batches/artist/cut/<批>.txt`。
2. **維基預抓**：`node artist-wiki.mjs <批>` → `batches/artist/cache/<批>-wiki.json`（cache/ 不入版控，可重抓；輸出已有的會跳過）。
3. **補洞**：`node artist-prompt.mjs <批> gap N > <scratchpad>/gap-<批>-N.txt`，後面附上本批特注（國籍、同名、死因、在世者），
   派 4 支 Sonnet，**派工訊息只給檔案路徑**（「先用 Read 讀 <路徑>，照它做完；回報限 10 行」），不要把整段派工詞貼進主線。
4. **補洞 QA**：`node qa-artist.mjs gap <批>`，只處理 ⚠。
5. **寫作摘要**：`node artist-digest.mjs <批> 1` 與 `2` → `cache/<批>-digest-1|2.txt`；`node artist-prompt.mjs <批> write N` 存檔、附本組補充，派 2 支 Opus，同樣只給路徑。
6. **審稿**：`node qa-artist.mjs out <批>` 到 0 處，主線逐位審（同上，不外包）。截止日後的事實用 WebSearch 核實並記進 rulings。
7. **上架**：progress 標 `published`＋`reviewFixes` → `node artist-alias.mjs` → `node artist-issues.mjs` → `node ../scripts/build-artist-intros.mjs`（cwd 回 repo 根）→
   逐一 `git add` 本批檔案（**絕不 `git add -A`**）→ commit → push。

### 省額度要點（2026-10-03 實測，ar-c-005～007）

舊法每批約：補洞 4,150 萬、寫作 680 萬、主線 1,340 萬快取讀取 token。新法（ar-c-007）：1,100 萬、510 萬、450 萬，thin 6／40，品質不降。
- **並行發請求是最大的一招**：補洞代理回合數 70 → 20 左右。上限維持每位 8 次、失敗不計入（ar-c-006 試過 5 次含失敗，thin 倍增，已撤回）。
- 維基預抓＋必擋網域（寫在派工範本裡）省掉三成白抓與重抓。寫作讀摘要檔，回合數 33 → 20。
- 主線：派工只給路徑、代理回報限 10 行、進行中的 research／output 用 `.git/info/exclude` 暫時排除（驗收時 `git add -f`），避免 stop hook 逼出 checkpoint 回合。
  **主線上下文超過約 25 萬就開新工作階段**；狀態都在 progress.json、rulings 與 cache/，換場不丟東西。

## 接力節奏（同時最多兩批在飛、尖峰 6 支；每工作階段 2 批就換場，WebSearch 共用 200 次額度）

批 N 補洞交齊 → 派批 N 寫作 2 支 ＋ 批 N+1 補洞前 2 組；批 N 寫作交件 → 派批 N+1 補洞後 2 組，主線審批 N、上架批 N。
上架嚴格照批號順序，一次只審一批。長接力用 `send_later` 排 25 分鐘自我 check-in。
**中途不回報**，只在需要店主裁定或整條線收尾時回聊天（CLAUDE.md「接力任務不要中途回報」）。

## 這條線不改的東西

藝人介紹這條線只產出藝人介紹，**不順手改卡池與專輯簡介**：上線簡介的錯記在補洞稿的 `pubIssues`，
`node artist-issues.mjs` 彙整成 `audits/ARTIST-PUB-ISSUES.md`，另外排修。
（雲端的寫入邊界已在 2026-10-10 放寬——可寫 `seed_cards.json`／`PROJECT_MEMORY.md`／`card_catalog`，KV 要有可寫 token；
見 `REMOTE_RUNBOOK.md`。本線收尾時要在自己的分支補一筆 `PROJECT_MEMORY.md`，推分支、開 PR、由店主合併。）
