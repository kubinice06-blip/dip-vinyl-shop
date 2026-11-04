# 新上架頂點盤：異端補到 150、流亡補到 300（2026-11-04）

**店主（2026-11-04）**：「要不要另外上架新盤來補異端／流亡」→「好」。同時定案：玩家卡冊裡已有的頂點卡照舊不動（「1」）。

## 目標

| tier | 現在 | 目標 | 要新上架 |
|---|---:|---:|---:|
| 異端 heresy | 85 | ~150 | **~65** |
| 流亡 pearl | 254 | ~300 | **~46** |

頂點規則：同一級內一位藝人只收一張。新盤的藝人不能已經在同一級出現（跨級可以）。

## 標準（照 `batch-progress/apex-rebalance-20261103/PLAN.md` 裁定 3）

- **異端**：硬蕊度 5，而且要有可信資料支持它極端前衛、噪音或結構上難入耳。挑該場景公認最極端的代表盤。
  - 方向：harsh noise／power electronics、noise wall、極端實驗電子、無調現代音樂的激進作、極端自由即興、工業噪音、反音樂、聲音藝術、極端金屬裡反結構的作品。
  - 不收：聽得下去的前衛作品、能量型自由爵士、一般碾核。
- **流亡**：Last.fm 累積 listeners 必須是有效數值，且 1–299；不能是錯配；冷門度 5（私壓或極小廠，沒有串流再發）。挑該場景公認的地下名作，例如收藏圈聖杯、考古廠重發過的私壓。
  - 場景要分散：迷幻、民謠、福音、靈魂／放克私壓、地下爵士、亞洲地下、拉美、非洲、東歐、早期電子等，每個場景都要有幾張。
  - listeners 查法：worker `/album-rating`（`_listeners`），或 Last.fm 頁面。

## 分批

| 批 | 內容 | 提名 | 藝人介紹批號 | 狀態 |
|---|---|---:|---|---|
| ax1 | 異端 A：harsh noise／power electronics／工業／日本噪音 | 40 | ar-d-261 | |
| ax2 | 異端 B：極端現代音樂、激進即興、聲音藝術、極端電子、反結構金屬 | 40 | ar-d-262 | |
| ax3 | 流亡 A：歐美私壓（迷幻、民謠、福音、靈魂放克、地下爵士） | 30 | ar-d-263（✅ 介紹上線 16／skipped 9） | ✅ 上線 26（pearl 21／一般 5） |
| ax4 | 流亡 B：亞洲、拉美、非洲、東歐、早期電子私壓 | 30 | ar-d-264（✅ 介紹上線 15／skipped 3） | ✅ 上線 20（pearl 15／一般 5） |

- 提名數比目標多約兩成，留給研究層汰換。
- 一個工作階段跑 2 批（ax1＋ax2、ax3＋ax4），照 CLAUDE.md 的併行規則。
- 藝人介紹批號用 ar-d-261～264，溢出用 265～268。**不要用 ar-d-1xx、201～212、241～245**。

## 每批流程

沿用情緒薄格與鐵幕爵士線的整套流程，見 `batch-progress/HANDOFF-mood-cells-line.md` §二～§四、`batch-progress/eastbloc-jazz-20261101/PLAN.md`。差別如下：

1. **策展**：讀 `CUR-DISPATCH-AX.md`。產出寫到 `batch-progress/mood-cells-20261022/curation-<組>.json`，組別如 `ax1a`／`ax1b`。批資料夾是 `batch-progress/add-20261104-<批>/`。
2. **頂點**：這批任務**明確採用頂點**。研究層查證後，合格的卡 seed 第 9 欄直接填 `heresy`／`pearl`；不合格的照一般卡上架，或汰換掉。
   - 流亡沒有有效 listeners、或 listeners ≥300，一律不當流亡。
   - `apexAssessment` 寫明依據與證據網址。
3. **不做 moodGuess 邊距檢查**。上線當天照 §二第 9 步打情緒分。
4. **card_catalog** 寫 tier＋apex:true。`album_overrides.tier` 留給本機後台「依卡池同步頂點旗標」。
5. 收工在分批表寫 `✅ 上線 N（heresy a／pearl b／一般 c）`，並更新 `PROJECT_MEMORY.md`。

## 共用規矩

- 寫 card_catalog／KV 前，對 origin 所有 `claude/*` 分支的 seed 再跑一次去重。
- 只有 `kv-token-check` 通過才寫 KV。審稿由主線自己做。推自己的分支、開 PR、自己合併；不訂閱 PR。
- 派代理一律加一句「每做完 N 筆寫檔／已有內容就接續」。每過一層就 commit＋push 一次。
- 會跳權限確認的指令，改用不需確認的做法；真的繞不過就跳過，寫進交接留給本機。

## ax3／ax4 工作階段筆記（2026-11-04）

- 分支 `claude/apex-new-ax34`。條號預留：**ax3 51701–51780、ax4 51801–51880**（eb4 用到 514xx；51501–51680 留給 ax1／ax2）。
- 策展四組：ax3a 迷幻／民謠私壓、ax3b 福音／靈魂放克／地下爵士私壓、ax4a 亞洲＋非洲、ax4b 拉美＋東歐＋早期電子。

## ax3／ax4 收工筆記（2026-11-04）
- **流亡 254 → 290**（+36：ax3 21、ax4 15）。兩批共上線 46 張（pearl 36、一般 10：大廠發行或已有串流）。研究層汰 5 張（ax4：3 張其實是七吋單曲／EP、Kluster 現場同源、Dissevelt 真 LP 掛名雙人且 listeners 538）。
- **流亡判準落地**：「冷門度 5」嚴守字面＝私壓或獨立小廠；Mercury、CBS、UNI、Ranwood、國營 Pronit 一律轉一般卡。考古廠黑膠／CD 重發不算串流再發；單曲收進跨盤選輯（Mike Nyoni、Lundsten）也不算。
- **雲端查證限制**：Last.fm 專輯頁幾乎全回 600，listeners 一律取 worker `_listeners`；Bandcamp／Spotify 打不開，只查了 Apple 多店面。之後若要抽查 Spotify 得留給本機。
- **私壓盤的 seed 曲風欄會空**：`build-seed-genres` 從 worker 拿不到標籤就寫 `[]`（首頁抽不到）。本批 13 張寫進 `ALBUM_GENRE_FIX`；另 4 張（Circulation、Probe、Smack、Ghostdance）被同名團標籤污染成電子／哥德／嘻哈，一併覆寫，子曲風改走 `genre-l3-artist-map.json`。**之後流亡線上架後一定要掃一次空曲風欄與明顯錯類。**
- **人工身分卡 gate 前用 MB 重查**：Cedrón、Krzak、Eloy、Maxfield 其實有 RG，改釘住（`mbproof.mjs` 在 scratchpad，三組查詢寫進 mbAbsenceProof）。
- 藝人介紹在上線前就從卡單切批（不等 manifest），補洞與鉤子／寫作層並行，省一輪等待。私壓盤藝人 skipped 率高（12／43）。
- 異端 ax1／ax2 在 `claude/apex-new-ax12` 另一工作階段。
