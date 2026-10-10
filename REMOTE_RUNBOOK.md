# REMOTE_RUNBOOK — 雲端工作階段的規則（2026-08-29 制定，2026-10-10 解除寫入禁區）

本文件是**雲端工作階段（claude.ai/code）的開工必讀**，與 `ALBUM_ONBOARDING.md` 並用——
流程規範仍以 onboarding 為準，本文件只規定「雲端可以做到哪、怎麼交件」。

**2026-10-10 店主裁定：雲端不再只做文字工作，整條上架線都可以在雲端跑完。**
原本「雲端不動 seed／apex／PROJECT_MEMORY、不碰 KV、Firestore 只能單張修」的禁區全部解除，換成下面三條：

1. **雲端可以寫** `seed_cards.json`（含第 9 欄的頂點 tier；`apex_pool.json` 已在 08-30 併進這一份）、
   `PROJECT_MEMORY.md`、Firestore `card_catalog`。
2. **KV 要有可寫的 token 才做**；沒有就不寫，也**不得寫 seed**（見「KV」一節）。
3. **雲端推自己的分支、開 PR，由店主合併。** 雲端不推 `main`、不自己合併 PR。

## 分工表

| 步驟 | 誰做 | 說明 |
|---|---|---|
| 策展（含 rgMbid 釘定、版本鎖定） | 雲端 | 只讀 MB／維基 |
| 研究層、hook 層、寫作層 | 雲端 | |
| 機器 QA（qa-batch 等） | 雲端 | 本機不必重跑，除非之後又改過稿 |
| **逐張審稿** | **雲端主線** | 不可交給子代理；要留紀錄（見「審稿」一節） |
| 封面 | 雲端 | 逐張 HTTP 實測＋主線看圖；抓不到可靠封面的留置 |
| 試聽配對 | 雲端 | Apple `/lookup` 逐軌對；連不到或對不上的標 unavailable，不硬配 |
| listeners（Last.fm） | 雲端先試 | 打 worker 的 `/album-rating`（Last.fm 由 worker 代查）；拿不到就留 `null`，**不得寫 0** |
| prepare gate | 雲端 | 0 error 才往下 |
| Firestore `card_catalog` | 雲端 | 公開 key 可寫（`scripts/push-card-catalog-patches.mjs`） |
| KV 固定簡介 | **雲端，有可寫 token 才做** | 否則留給本機，見「KV」一節 |
| 靜態試聽、`seed_cards.json`、`build-seed-genres` | 雲端 | **KV 寫完並逐字回讀之後**才寫 seed |
| published gate | 雲端 | seed 寫了才跑 |
| `build-genre-tree.mjs --pull --write` | 雲端，有 token 才做 | `--pull` 要從 KV 重建 `data/rawgenres-cache.json`；沒有 token 就留給本機 |
| `PROJECT_MEMORY.md` | 雲端 | 在自己的分支最上方插一筆 |
| 合併進 `main` | **店主** | 雲端只開 PR |
| `album_overrides`、`settings` 等管理員集合 | 店主（後台） | Firestore 規則是 `isAdmin()`，雲端沒有身分，也不設服務帳戶 |
| Worker 部署 | 店主（本機） | 這次沒有開放 |

## 開雲端工作階段的前置設定（第一次必做）

1. **網址 https://claude.ai/code**，用同一組 claude.ai 帳號登入，授權 GitHub，
   選 `kubinice06-blip/dip-vinyl-shop`。也可以在本機終端機打 `claude --cloud "任務描述"`
   （沿用當前分支；**雲端 clone 的是遠端分支，所以開之前本機要先 push**）。

2. **把 Cloud environment 的網路層級改成 Full 或 Custom——這是最關鍵的一步。**
   預設是 `Trusted`，只放行套件庫與 GitHub，**musicbrainz.org、wikipedia.org 等一律連不到**。
   c-46 那次「查不到跨來源證據，把 40 張 classic=5 全作普卡」極可能就是這個預設造成的，
   不是模型能力問題。Custom 白名單至少要含：

   設定位置：claude.ai/code 訊息框上方那一列的雲朵圖示（顯示環境名稱）→ **Cloud** → 滑到環境上按右邊的齒輪
   → **Network access** 選 **Custom** → 在 **Allowed domains** 一行貼一個網域（`*.` 開頭代表所有子網域）
   → 勾 **Also include default list of common package managers**（不勾的話 npm 等預設網域會被擋）→ **Save changes**。
   改完大約一分鐘內對進行中的工作階段也生效。

   ```
   musicbrainz.org
   coverartarchive.org
   wikipedia.org
   *.wikipedia.org
   wikidata.org
   *.wikidata.org
   last.fm
   *.last.fm
   discogs.com
   *.discogs.com
   allmusic.com
   *.allmusic.com
   rollingstone.com
   *.rollingstone.com
   billboard.com
   *.billboard.com
   loc.gov
   *.loc.gov
   itunes.apple.com
   *.mzstatic.com
   *.itunes.apple.com
   archive.org
   *.archive.org
   firestore.googleapis.com
   api.cloudflare.com
   dip-vinyl-worker.kubinice06.workers.dev
   ```

   最後三個是寫 `card_catalog`、寫 KV、跑 gate 要用的；沒放行就只能做到 prepare gate。
   設好之後**開工第一件事是實測**：叫代理抓一個 MB release-group 與一個維基頁面，
   確認真的通得到再派工。不通就退回「查不到標 pending-local」規則。

3. **KV 的 token（要寫 KV 才需要）**：在 Cloud environment 的環境變數（齒輪對話框的 Environment variables，一行一個）設兩行：

   ```
   CLOUDFLARE_API_TOKEN=<權限含 Workers KV Storage Edit 的 API 權杖>
   CLOUDFLARE_ACCOUNT_ID=3a23f905e8f31d91c85050f2ed304321
   ```

   帳戶 ID 不是機密（腳本裡本來就寫著）；**token 的值永遠不印出來、不寫進任何檔案或 commit。**
   環境裡沒設 `CLOUDFLARE_ACCOUNT_ID` 時，指令前面自己帶：`CLOUDFLARE_ACCOUNT_ID=3a23f905e8f31d91c85050f2ed304321 npx -y wrangler@4 …`。

4. **skill 走 repo 內的 `.claude/skills/`**。雲端只讀 repo 內的 project skill，不會帶本機個人 skill 過去。

5. **簡介產線的工具在 `desc-tools/`**，cwd 要設在那裡，產物落 `desc-tools/batches/`。詳見 `desc-tools/README.md`。

其他已知限制：閒置久了 VM 會被回收（重開會用新 VM 還原對話）；用量計入帳號共用額度，平行開多個會等比例吃掉。
把雲端工作階段拉回本機用 `claude --teleport`。

## 雲端硬規則（踩過的坑，一條都不能少）

1. **頂點判定不得因「查不到」降級。** 網路層級沒設好時雲端會擋掉 AllMusic／Rolling Stone／Discogs／
   Last.fm／多數日文媒體（c-46 實測）。**先開白名單並實測**；仍連不到的來源，其 apexAssessment 一律標
   `"evidence": "pending-local"`，**不得判普卡**。c-46 有 40 張 classic=5 因此被誤作普卡，本機補證後 22 張升殿堂。
2. **listeners 拿不到就留 `null` 並在 handoff 標 `local`**，不要寫 0、不要猜。
   pearl（流亡）要 listeners 有效值低於 300，拿不到 listeners 的卡不得自行判 pearl。
3. **策展必查 secondaryTypes。** MB 的精選輯常是 primary=Album、Compilation 掛在 secondaryTypes
   （c-47 法義西德批一次掃出九張）。候選檔跑 `chk-cand.mjs` 已含此檢查。
4. **版本鎖定必須做完**：同名重錄輯（Brel 1959 vs 1972）、Highlights 精選 vs 完整版、電影版 vs 舞台版、
   身後精選 vs 生前原版。逐張向 MB 覆核 rgMbid 的 first-release-date 與類型，把裁定理由寫進候選檔的 `versionNote`。
5. **寫入只由主線做。** 子代理（策展、研究、hook、寫作）一律不碰 `seed_cards.json`、`PROJECT_MEMORY.md`、
   Firestore、KV，也不動 git；它們只寫自己的輸出檔。
6. **上架順序照 `ALBUM_ONBOARDING` §8，不得顛倒**：`card_catalog` → KV 固定簡介 → 靜態試聽 → 回讀 → seed。
   **seed 是上架開關，前面任何一步沒寫成就不寫 seed。**
7. **Firestore 與 KV 是即時生效的，不經過 PR。** 新卡在 seed 合併前不會被抽到，寫了沒有可見影響；
   但**改到已上線的卡**（換封面、改簡介）一寫就上線。所以：gate 先過再寫；寫了哪些鍵、哪些文件，逐項列在 PR 說明。

## 審稿（改由雲端主線做，要留紀錄）

逐張審稿不再等本機。**主線自己審，不派給子代理**——歷史上每批靠審稿抓到 3–9 處錯，機器 QA 驗不出「來源對不對」。

- 把整批全文印出來逐張讀，逐句對回研究稿；拿不準的事實當場上網查。高頻錯誤型態見 `dip-desc-restyle` skill 的審稿節。
- **一次只審一批，審完就往下走**，不要累積多批的稿子一起審。
- **紀錄寫進該批 `rulings.md` 的「主線審稿」段**，至少要有：
  - 審了幾張、審稿日期；
  - 每一處改動：key、原句 → 新句、依據（來源網址或研究稿的哪一條）；
  - 動到事實的改動，同步改 research／hooks／input 三層，並在紀錄註明已同步；
  - 沒有改動的批也要寫一行「逐張審過，未改字」。
- `handoff.json` 加 `"review": { "by": "cloud-main", "cards": N, "changed": ["<key>…"] }`。
- 店主合併 PR 前要看的就是這一段；所以寫給人看，不要只丟 diff。

## KV（有可寫的 token 才做）

```bash
node scripts/kv-token-check.mjs      # 會寫一個測試鍵、讀回、刪掉；exit 0 才算可寫
```

- **exit 0 → 雲端自己寫**：
  ```bash
  node scripts/kv-from-manifest.mjs <manifest.json> publish-stage/kv-<批>-<stamp>.json
  npx -y wrangler@4 kv bulk put publish-stage/kv-<批>-<stamp>.json --namespace-id 5f65e74b17d644b68a3f542b08a5c105 --remote
  node scripts/verify-wave-kv.mjs <stamp> <批…>
  ```
  **一定要寫 `wrangler@4`**：`--remote` 是 v4 的旗標，雲端沒有預裝 wrangler，裸的 `npx wrangler` 可能抓到 v3 而直接報錯
  （2026-10-10 雲端實跑 add-20261003 時踩到）。wrangler 還需要 `CLOUDFLARE_ACCOUNT_ID`（見前置設定第 3 點）。
  `--remote` 不能省（不加會寫到本機模擬區、照樣印 Success）；輸出不要截斷，要親眼看到 `Success!`。
  寫完 10–30 秒內回讀可能拿到舊值，第一次不符先等半分鐘再讀，**不要當場重寫**。
  回讀要逐字一致才往下寫 seed。驗證刪除一律用 bulk get，**不要用 `/album-desc`**（會觸發重新生成並回寫）。
- **exit 非 0（沒設 token、權限不夠、連不到）→ 不寫 KV，也不寫 seed。**
  做到 `card_catalog` 為止，把 KV bulk 檔產好放進 `batch-progress/<批>/kv-bulk.json`，
  在 handoff 的 `pendingLocal` 寫明「KV、seed、published gate 待本機」。**不要重試、不要找別的路寫。**

## 分支與 PR

- 雲端在自己的分支上工作（工作階段給的 `claude/…`，或自取 `remote/<批名>`），**不 push `main`**。
- 收工前 `git fetch origin && git merge origin/main`，把衝突在自己的分支解掉，讓 PR 可以直接合併。
  `PROJECT_MEMORY.md` 人人都往最上方插一筆，衝突時**兩邊的條目都留**。
- 提交照 `CLAUDE.md`：逐一 `git add <file>`，不用 `git add -A`。
- 開 PR（`gh pr create`，或網頁按 Create PR）。**PR 說明固定寫這幾項**：
  1. 批名、張數（候選／上架／留置／頂點）；
  2. **已經即時生效的寫入**：`card_catalog` 幾筆、KV 幾鍵（有沒有動到已上線的卡，動了哪幾張）；
  3. 這個 PR 合併後才生效的：`seed_cards.json` 加了幾列、哪些卡帶 tier；
  4. gate 結果（prepare／published 各幾個 error）；
  5. 審稿改了幾處（指到 `rulings.md` 的段落）；
  6. **留給本機／店主的事**（KV 沒寫、listeners 沒拿到、子曲風表沒重建、要貼後台的 `album_overrides`…）。
- **雲端不合併自己的 PR。** 店主合併後 Cloudflare Pages 才部署，卡才真的進卡池。

## 交接檔

每批照舊在 `batch-progress/<批名>/` 留 `rulings.md`、`onboarding-manifest.json`、`handoff.json`。`handoff.json` 必含：

```json
{
 "batch": "…", "cards": 0,
 "written": { "cardCatalog": 0, "kvKeys": 0, "seedRows": 0, "previewReady": 0, "previewUnavailable": 0 },
 "review": { "by": "cloud-main", "cards": 0, "changed": [] },
 "qa": { "research": "pass", "hooks": "pass", "out": "pass", "prepareGate": "0 error", "publishedGate": "0 error｜未跑（原因）" },
 "pendingLocal": {
  "kv": "無｜待本機（kv-token-check 未過）",
  "listeners": ["<拿不到的 key>"],
  "apexEvidence": ["<標 pending-local 的 key>"],
  "genreTree": "已重建｜待本機",
  "albumOverrides": "<要店主貼後台的檔案，沒有就寫無>"
 }
}
```

## 本機／店主還要做的

雲端整條線跑完時，店主只需要**看 PR、合併**。下列情況才需要本機接手：

1. **KV 沒寫**（沒有可寫 token）：本機 `git fetch` → checkout 該分支 → 寫 KV 並回讀 → 寫 seed → published gate → 推回同一個分支，再由店主合併。
2. **listeners 沒拿到**、或有 `pending-local` 的頂點證據：本機補查後更新 manifest 與 seed。
3. **子曲風表沒重建**：合併後在本機跑 `node scripts/warm-album-genres.mjs`（分段）＋ `node scripts/build-genre-tree.mjs --pull --write`。
4. 要走後台的：`album_overrides`（YouTube 固定試聽等）、Worker 部署。

## 兩個對話怎麼串聯

- **主通道是 git 與 PR**：雲端 push 分支、開 PR，店主合併；需要本機補做時，本機 fetch 同一個分支接手。
- 本機兩個 Claude Code 對話可雙向互傳訊息；本機→雲端只能單向（雲端無法回話），
  故**不要**設計成「雲端跑完通知本機」——PR 就是通知。
- 雲端工作階段開工詞建議固定為：
  「讀 REMOTE_RUNBOOK.md 與 ALBUM_ONBOARDING.md，跑 <子域> 批，做到開 PR」。
