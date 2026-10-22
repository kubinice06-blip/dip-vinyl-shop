# 情緒薄格策展線交接（add-20261022-md1…md4 → mc1…mc4 → ml1…ml4）

店主 2026-10-22：「可以開始補缺少的頻率了 再策一次計畫」。計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`（10-22 v2 定案節）。
裁定權已下放（CLAUDE.md「接力任務」）：中途不回報，策展／研究／管線裁定自己定、寫進各批 rulings.md；雲端開 PR 後自己合併（2026-10-21 起）。

## 一、進度

| 批 | 場景 | 目標格 | 狀態 |
|---|---|---|---|
| md1 | dark ambient／drone／工業 drone | 頹靡 | ✅ 2026-10-22 上線 45；落頹靡 43/45＝95.6%（2 張落恍惚：Basinski、Belong 色溫判中性） |
| md2 | slowcore／sadcore 二線＋dark jazz | 頹靡 | ✅ 2026-10-22 上線 45；落頹靡 41/45＝91.1%（4 張乾編制 sadcore 落平靜：Arab Strap ×2、Germano、Songs: Ohia） |
| md3 | darkwave／goth 慢盤＋無鼓 drone metal／funeral doom | 頹靡 | 策展派工已寫 |
| md4 | 暗色嘻哈／cloud rap／暗 R&B＋dub techno＋亞洲 | 頹靡 | 策展派工已寫 |
| mc1–mc4 | 冷冽線（minimal synth／coldwave、post-punk／no wave、冷爵士、當代古典＋亞洲 synth-pop） | 冷冽 | 待寫 `CUR-DISPATCH-mc.md`（場景見計畫 §2.3） |
| ml1–ml4 | 恍惚線（lovers rock／roots、暖 shoegaze／dream pop、beats／dusty 饒舌、東亞恍惚） | 恍惚 | 待寫 `CUR-DISPATCH-ml.md`（場景見計畫 §2.2；質地尺改判後 dream pop／neo-soul 命中率升到 40%+） |

**條號**：md1 10681–10760、md2 10761–10840、md3 10841–10920、md4 10921–11000、mc1 11001 起每批 80。每批預留：研究 a–e 各 10、鉤子 10、寫作 10、主線 10。
**工作階段**：每個工作階段跑 2 批（WebSearch 200 次共用）。策展 4 組可在同一個工作階段先全派（每組 ≤6 次）。

## 二、每批流程（腳本在 `batch-progress/mood-cells-20261022/`，複製自薄細項線，只差兩處：卡單多 `moodGuess`、研究層要寫聲音事實）

0. 策展：派工讀 `CUR-DISPATCH.md`（md 線）。4 組同時派：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/mood-cells-20261022/CUR-DISPATCH.md` 並照做。組別：md1。」交件後 `node batch-progress/mood-cells-20261022/build-master.mjs md1` → `master-md1.json`（每批一組，不混組）。主線刪改寫 `master-override.json`（`{drop:[[藝人,盤]], fix:{"藝人|盤":{…}}}`）。
1. **主線挑 45 張**：先跑 **moodGuess 邊距檢查**（下面的指令），貼邊的先汰；再看 MB 回查（type 不是 Album、年份差很多的汰）、同藝人太多的勻一勻。寫 `batch-progress/<批>/pick.json`（`["藝人|盤",…]`），`node batch-progress/mood-cells-20261022/build-cards.mjs <批> <pick.json> <master>`；建 `batch-progress/<批>/rulings.md`（檔頭格式照 `batch-progress/add-20261022-ts6/rulings.md`，條號照上表）。
   ```
   node -e 'const m=require("./batch-progress/mood-cells-20261022/master-md1.json");for(const a of m){const g=a.moodGuess||{};const ok=g.x<=2.7&&g.y>=0.8&&g.z<=-0.3;if(!ok)console.log("貼邊/出格",a.artist,"|",a.album,JSON.stringify(g))}'
   ```
2. 研究層 5 支 Sonnet：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/mood-cells-20261022/RES-DISPATCH.md` 並照做。批名：<批>；組別：a。」同時背景跑 `node batch-progress/mood-cells-20261022/meta.mjs <批>`。
3. 研究交件後：看報告裡「moodGuess 存疑」的卡——聲音跟預估不符的**直接汰換**（補候補），不要硬留；照研究層推翻的改卡單 → `cd desc-tools && node qa-batch.mjs research <批>`。
4. 鉤子 2 支 Opus（a–c、d–e）讀 `HOOK-DISPATCH.md` → `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。派工加一句：媒體名與媒體榜單名次不進正文。
5. 寫作 2 支 Opus 讀 `WRITER-DISPATCH.md` → `qa-batch out`、`qa-check-research`、`fix-spacing`。派工加：「note 裡的媒體名與媒體榜單名次整句不寫，不要只換掉媒體名；不用『據說／據傳』」。
6. 主線：試聽（`preview-override.json` → `picks.mjs`）、封面（人工身分卡一定要 `covers.json`；上線前 **live-check 每張封面 URL**，CAA 原圖 500 就換 `/release/<id>/<imgid>-500.jpg` 縮圖或 Apple／Discogs）、三軸（冷門軸錨點制 §0.8，`ratings-override.json`）、逐張審稿（媒體年終榜整句刪、「據說」刪、單源評價句刪）→ `build-manifest.mjs <批>` → `scripts/verify-album-onboarding.mjs`。
7. 寫入照 `REMOTE_RUNBOOK.md` 與 ts11 先例：`cp` manifest 到根目錄 → `publish-manifest`（乾跑）→ `push-card-catalog-patches publish-stage/<manifest 名>/card-catalog-patches.json` → `kv-token-check` → `kv-from-manifest` → `wrangler@4 kv bulk put … --remote` → `verify-wave-kv` → `--write-preview` → `build-apple-audio-runtime-map` → `--write-pool` → `build-seed-genres` → `mark-manifest-published --catalog --kv --preview` → `verify --published`。
8. 子曲風：`node batch-progress/mood-cells-20261022/warm-batch.mjs https://dip-vinyl-worker.kubinice06.workers.dev <批>` → `build-genre-tree.mjs --pull --write` → `build-draw-covers.mjs --pull --write`。標籤推不出節點的藝人寫進 `genre-l3-artist-map.json`。
9. **情緒評分（這條線的驗收）**：上線當天照 `batch-progress/mood-axes/score-ts/` 的做法切工單（45 張一份即可）、代理照 `score500/BRIEF.md` 打分（**含 10-22 的兩條新規則**）→ merge → 加進 `build-priors.mjs` 來源層 → `build-scale.mjs v0` → `scripts/build-card-moods.mjs` gate 綠。
   **算落格率＝落目標格張數／上線張數，寫進該批 rulings.md 與本檔進度表**。低於 40% 的場景下一批換場景；低於 30% 的線停下來回報店主。
10. 藝人介紹：照 `cut-artist-intros.mjs` 的邏輯把新藝人補進 roster、切 ar-d 批（**只切不寫**——店主 2026-10-22：藝人介紹用別的對話做）。
11. PROJECT_MEMORY → 逐檔 git add → commit → push → 開 PR → 自己合併 → 退訂 PR。

## 三、坑（沿用薄細項線）
- md1／md2 實跑（2026-10-22）：研究層聲音存疑是真的有用——md2 汰 7 張（鼓機／碎拍／synthwave）、md1 汰 4 張（KTL、Kreng、Desiderii、Hecker 有拍又兇），補位從 master 候補同位置替入、再派一支補研究 append 進各組檔（qa-batch 只認 a–e 五組，不要開第六組）。上線後評分 84/90 落格，遠高於預估；下一批可以把 45 張的 20% 汰換額度降到 10%。
- 評分工單 `batch-progress/mood-axes/score-md/`（select／merge 仿 score-ts2；`build-priors.mjs` 來源層已加 `scored-md.json`），md3／md4 直接 `select.mjs <批>` 切 chunk、派 Opus 照 BRIEF 打分、`merge.mjs` → priors → scale v0 → `build-card-moods`。
- 藝人介紹切批用 `cut-artist-intros.mjs`（已改成讀 `onboarding-manifest-add-2026102?-md?-*.json`，批序 md1→md4），md3／md4 上線後再跑一次會接著切 ar-d-138 起（冪等，roster 已有的鍵不重加）。
- 乾編制 sadcore（Arab Strap、Lisa Germano、Songs: Ohia 那型）質地判輕落平靜；slowcore 要收霧狀 lo-fi／doomgaze 與 dark jazz 才落頹靡。
- 容器會重啟：派工都加「每做完 N 筆寫檔」「已有內容就接續」；代理腳本放各自的 scratchpad 子資料夾。
- `push-card-catalog-patches` 要吃 `publish-stage/<manifest 名>/card-catalog-patches.json`，不是 manifest。
- Apple 專輯搜尋常回空：走 `entity=musicArtist` → `lookup?id=<artistId>&entity=album`。
- 同名藝人上線前查 `data/artist-intros`（Carl Perkins 先例）。
- 正文不點名資料平台、媒體名、媒體年度榜——寫作層仍會漏，主線審稿要掃。
- 封面上線前 live-check（ts10／ts11 各換過 1–2 張 CAA 500）。
