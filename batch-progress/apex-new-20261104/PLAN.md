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
| ax1 | 異端 A：harsh noise／power electronics／工業／日本噪音 | 40 | ar-d-261（✅ 介紹上線 26／skipped 3） | ✅ 上線 32（heresy 13／一般 19）；研究汰 5、補策展 0；試聽 ready 4 |
| ax2 | 異端 B：極端現代音樂、激進即興、聲音藝術、極端電子、反結構金屬 | 40 | ar-d-262（✅ 介紹上線 32／skipped 3） | ✅ 上線 37（heresy 11／一般 26）；研究汰 7、補策展收 4；試聽 ready 17 |
| ax3 | 流亡 A：歐美私壓（迷幻、民謠、福音、靈魂放克、地下爵士） | 30 | ar-d-263（✅ 介紹上線 16／skipped 9） | ✅ 上線 26（pearl 21／一般 5） |
| ax4 | 流亡 B：亞洲、拉美、非洲、東歐、早期電子私壓 | 30 | ar-d-264（✅ 介紹上線 15／skipped 3） | ✅ 上線 20（pearl 15／一般 5） |
| ax5 | 異端 C：卡池既有自由爵士／即興升格＋新上架美國自由爵士（店主 11-04 撤銷「不收能量型自由爵士」） | 升格 32＋新卡 42 | ar-d-266（✅ 介紹上線 4／skipped 0；267 未用） | ✅ 異端 +13（升格 6、新上架 7 全 heresy）；新卡研究 30 汰 23 |
| ax6 | 異端 C：卡池沒有的藝人——美國以外自由爵士／即興（店主點名 Kowald Quintet、姜泰煥）＋war metal、noisegrind、raw BM、drone doom、噪音搖滾、具象／現代音樂 | 50（8 組策展） | ar-d-268、ar-d-269（✅ 介紹上線 14＋3／skipped 0） | ✅ 上線 18（heresy 18／一般 0）；研究汰 32（none 不轉一般卡，52071）；試聽 ready 11 |
| ax7 | 異端 D：卡池既有卡升格（放寬後標準；ax5 汰掉的升格候選、q2 刷掉的、店主點名裸のラリーズ、卡池自由爵士／即興／噪音盤重掃） | 升格候選 43 張／20 組＋舊研究稿重判約 40 張 | 不需（升格不新增藝人） | ✅ 升格 8（heresy 8）；異端 140 → 148 |
| ax8 | 異端 D（店主 11-04 放寬：可信來源描述出具體、持續整張的高強度聽感即可）：卡池沒有的藝人——附文作品（Russolo、Group Ongaku、Schaeffer、Vomir《Proanomie》）、噪音史開創、harsh noise／PE、自由即興／噪音搖滾、極端金屬／noisecore／極端電子＋ax6 汰換稿重判 | 32（6 組＋ax6 撿回 5） | ar-d-270（✅ 介紹上線 8／skipped 0；271 未用） | ✅ 上線 10（heresy 10／一般 0）；Vomir《Claustration》改一般卡；研究汰 22；試聽 ready 1 |
| ax10 | 異端 E（店主 11-04「應該還有地下冷門 hardcore punk」）：**美國、加拿大、英國、愛爾蘭、澳洲、紐西蘭** hardcore／punk——noise punk、thrashcore／powerviolence、noisecore、chaos punk；升格（ax10u）＋新上架；可改設流亡；7 吋／demo 走 `hardcore-7inch`（ax9 另一工作階段管日亞歐陸拉美） | 升格 5＋新卡 28（2 組策展） | ar-d-273、ar-d-274 | 進行中 |

- 提名數比目標多約兩成，留給研究層汰換。
- 一個工作階段跑 2 批（ax1＋ax2、ax3＋ax4），照 CLAUDE.md 的併行規則。
- 藝人介紹批號用 ar-d-261～264，溢出用 265～268。**不要用 ar-d-1xx、201～212、241～245**。

## 條號與資料夾（ax12 工作階段 2026-11-04 定）

- 條號：axN → 51401＋N×100 起，每批 80 條（ax1 51501–51580、ax2 51601–51680、ax3 51701–51780、ax4 51801–51880）。目前各批 rulings 最大號是 51401 段。
- 批資料夾：`batch-progress/add-20261104-ax1/`、`-ax2/`（ax3、ax4 同形）。

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

## ax1／ax2 收工筆記（2026-11-04）
- **異端 85 → 109（+24），離 150 還差約 41。** 照實上架，沒有放寬標準湊數。
- **標準更正**：上一個工作階段寫的 `RES-APEX.md` 要求「7 星／史上最難入耳之一」，比店主 11-03 裁定 3 嚴，研究層頭三組 27 張全判 none；主線改回裁定 3（accessibility 5＋可信資料支持極端／刺耳／反結構）後重判（ax1 rulings 51571）。
- **命中率低的原因**：(1) 噪音卡帶、CD-R 多半只有 Discogs 與小站資料，沒有可引的樂評；(2) 現代音樂、聲音藝術、lowercase、drone 聽感克制，硬蕊度只到 3–4；(3) 雲端抓不到 AllMusic（403）、Pitchfork（被擋）、The Wire 部分頁面，補策展 ax1d 交 0、ax2d 交 6。
- **下一輪要補異端**：從本機（能讀 AllMusic／Pitchfork／The Wire）挑「公認最極端」的盤直接點名，研究層只做證據核實；或把方向轉向已有大量樂評的極端金屬、noise rock、新複雜主義鋼琴作品。
- 頂點寫入：card_catalog 帶 tier＋apex:true；`album_overrides.tier` 留給本機後台「依卡池同步頂點旗標」。
- 情緒評分 `score-ax12` 69 張：ax1 暴躁 30／頹靡 2；ax2 暴躁 23／冷冽 9／頹靡 4／平靜 1。
- 藝人介紹補洞層的 pubIssues 回頭修了 5 張已上線簡介（Hair Police、Taint、Impetuous Ritual、Karkowski、Tsunoda），KV 已重寫。

## ax5 收工筆記（2026-11-04）
- **異端 +13**（升格 6：Frank Lowe、Frank Wright Trio、Charles Gayle、Ayler《Bells》、Dave Burrell《Echo》、Ornette《Free Jazz》；新上架 7：Alan Silva《Luna Surface》、Milford Graves《Bäbi》、Flaherty & Corsano、William Hooker、Little Women、Gato Barbieri ESP、Sun Ra《Strange Strings》）。離「ax5 補約 45」差很多，照實上架，沒放寬證據門檻。
- **命中率**：升格 6／32、新卡 7／30。撤銷「能量型」排除後，研究層仍要具體極端證據；ESP／BYG 時代多數盤的樂評講「前衛但有結構、聽得下去」（Sun Ra《Magic City》、Globe Unity、Giuseppi Logan、Burton Greene、Marzette Watts、Patty Waters 等都被樂評本身否掉）；2000 年後美國極端即興多半只有 Bandcamp／小站，過不了可信來源門檻。
- **要再往 200 推**：只剩兩條路——(1) 從本機（讀得到 AllMusic／The Wire 全文）點名、研究層只核證據；(2) 店主放寬成「整張高強度」不必有具名極端評語。都需要店主決定。
## ax6 收工筆記（2026-11-04，分支 `claude/apex-new-ax6`）
- **異端 109 → 127（+18）**（本工作階段開工時 seed 109；ax5 另計）。提名 50、汰 32，命中 36%。照實上架，沒有放寬標準湊數。
- **店主撤銷「不收能量型自由爵士」**（11-04），但歐洲、日本、南非的自由爵士藝人卡池幾乎都已有卡（歸 ax5 升格）；ax6 只上卡池沒有的藝人，自由爵士只收到 Kowald Quintet、강태환、Okkyung Lee 三張。
- 店主點名的 Kowald Quintet、강태환 研究層判 none（評語溫和），主線依點名收（52074），簡介只寫編制與手法事實。
- 研究汰換主因：查不到「針對這張」的具名 harsh／extreme 樂評（現代音樂、聲音詩、war metal 二線、lowercase 幾乎全軍覆沒）。下一輪要補異端，從本機（能讀 AllMusic／Pitchfork／The Wire）點名、研究層只做核實，命中率會高很多。
- 研究層判 none 的卡**直接汰換、不轉一般卡**（52071），研究稿都留在 `desc-tools/batches/research/add-20261104-ax6-*.json`，日後可當一般卡撿回。
## ax8 收工筆記（2026-11-04，分支 `claude/apex-new-ax8`）
- **異端 140 → 149**（新上架 +10、Vomir《Claustration》改一般卡 −1）。店主放寬後仍只收到 10：提名 32、研究汰 22。
- **卡池已極深**：開工掃 190 位常見噪音／即興／極端金屬名字，過半已有卡（異端或一般卡→歸 ax7）。卡池沒有的二線多半只有 Discogs、零售文案、社群評論，或只有局部激烈（Thurston Moore、Z'EV、Kluster、小杉武久、Chatham）。
- 放寬標準實際撿回的是「地位型」（Russolo、Schaeffer、Group Ongaku）與「負評但描述具體」（Revenge）；ax6 汰換稿重判撿回 5。
- 店主附文作品：Cage《4'33"》不收（Cage 已在異端）；Avraamov、Nuova Consonanza《The Feed-back》MB 無專輯；Schaeffer 卡池原卡《Musique concrète》實為 GRM 多人合輯（研究推斷 BAM LD 070），與《5 études》不重疊，不算取代。
- 再往 200 推只剩 ax7 的升格路線；新上架這條在雲端已見底。

## 異端標準放寬（店主 2026-11-04，ax7／ax8 起適用）
- ax5／ax6 照「要有樂評明確說它極端」只補到 140。店主看過後決定「**稍微放寬**」：要有可信來源**描述出具體、持續整張的高強度聽感**就收（全程無調、沒有固定節拍、集體即興密度極高、回授／失真音牆、尖叫式吹奏、超長篇不間斷、極端音量），**不再要求樂評下「極端／刺耳」的結論**。
- 仍不收：有清楚結構、聽得下去的前衛；spiritual／modal 爵士；一般碾核、技術死金；只有局部段落激烈的盤。同級一藝人一張，不同寫法算同一位。
- 已寫進 `ALBUM_ONBOARDING.md` §3。分工：ax7 只做卡池已有盤升格（條號 52101–52180，`batch-progress/add-20261104-ax7/`）；ax8 只做新上架。

## ax7 收工筆記（2026-11-04，分支 `claude/apex-new-ax7`）
- **異端 140 → 148（+8，全為升格）**：'77 Live、April Is the Cruellest Month、Eternity Set Aflame、Musica Transonic、Touch Food、Modern Jester、Screech Owl、Impetuous Ritual。目標「ax7 約 30」差很多，照實。
- 卡池裡的自由爵士／即興／噪音一般卡（acc≥4、相關子曲風 520 張）已掃過；剩下的不是結構清楚、spiritual，就是只有 Discogs 標籤沒有聽感描述的卡帶。再往 200 推只能靠新上架（ax8）。
