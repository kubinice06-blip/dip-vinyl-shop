# downtempo／chill dub 策展線交接（add-20261011-dt1…dt5）

店主 2026-10-11：「補強downtempo類型 很chill的音樂類型 策展」→「太少了 至少找好聽的200張以上 dub的chill也要」。
**全線 223 張、5 批**。dt1、dt2 已上線；**dt3–dt5 待跑**。店主 2026-10-12 裁定：接力線留在同一個工作階段跑到收尾，不必換新工作階段（見 PROJECT_MEMORY 同日條目）；研究層每支 WebSearch 壓到 3 次。
裁定權已下放（CLAUDE.md「接力任務」）：中途不回報，策展／研究／管線裁定自己定、寫進各批 rulings.md；**店主 2026-10-10：PR 綠燈就直接合併，不用問**。

## 一、進度

| 批 | 內容 | 張數 | 狀態 |
|---|---|---:|---|
| dt1 | chill dub（roots、On-U、英國 dub、dub techno） | 45 | ✅ 上線（PR #81） |
| dt2 | 日本 dub、ambient dub、英國 trip-hop、Ninja Tune 系、beat | 45 | 見 PROJECT_MEMORY 最上方 |
| dt3 | trip-hop／abstract hip-hop 後段＋歐陸前段（Fila Brazillia…Nouvelle Vague） | 45 | 卡單已備 |
| dt4 | 歐陸 downtempo／nu-jazz／Balearic／拉丁（Bebel Gilberto…Da Lata） | 44 | 卡單已備 |
| dt5 | 日本 lounge／nu-jazz、folktronica、chillwave（Fantastic Plastic Machine…Houses） | 44 | 卡單已備 |

卡單：`desc-tools/batches/cards/add-20261011-dt{3,4,5}-cards.json`（研究 a–e 各 9 張；身分全 pinned，MB 已回查）。
dt3–dt5 的 `batch-progress/add-20261011-dtN/rulings.md` 還沒建——照 dt2 的檔頭格式建，條號往後接（dt2 用到 9100；dt3 從 9101 起，每批 80 條：研究 a–e 各 10、鉤子 10、寫作 10、主線 10）。

## 二、每批的固定流程（全部腳本在 `batch-progress/downtempo-20261011/`）

1. **研究層**：5 支 Sonnet，派工詞只寫一句：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/downtempo-20261011/RES-DISPATCH.md` 並照做。批名：add-20261011-dtN；組別：x。」
   同時在背景跑 `node batch-progress/downtempo-20261011/meta.mjs add-20261011-dtN`（CAA、/album-rating listeners、MB 曲目表、Apple 候選；可續跑）。
   ⚠ **不要用 `pgrep -f` 等前一支 meta 結束**——等待迴圈自己的命令列也含那個字串，會永遠卡住（2026-10-11 卡了一次）。直接用 run_in_background 跑。
2. 研究層交件後：照研究層推翻的年份／廠牌改卡單（寫主線裁定），`cd desc-tools && node qa-batch.mjs research add-20261011-dtN`。
3. **鉤子層**：2 支 Opus（a–c 一支、d–e 一支），派工讀 `HOOK-DISPATCH.md`，並要求讀前幾批 rulings 的鉤子骨架表避開已用骨架。交件後 `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。
4. **寫作層**：2 支 Opus（writer-1、writer-2），派工讀 `WRITER-DISPATCH.md`，並要求把前幾批已上線的 out 檔納入 4-gram 自掃。交件後 `qa-batch out`、`qa-check-research`、`fix-spacing`。
5. **主線**（不派代理）：
   - 試聽：看 `meta.json` 的 Apple 候選，寫 `preview-override.json`（二合一 CD 取對應段落的軌、題名不同但曲目相符的照收、精選輯不當本盤），跑 `node batch-progress/downtempo-20261011/picks.mjs <批>`。
   - 封面：下載 CAA front-250 排縮圖表逐張目視（`batch-progress/downtempo-20261011/cover-sheet.cjs`，Playwright Chromium 排版，用法見檔頭）；CAA 缺圖或 500 的改 Apple 官方圖（`apple-verified-collection`，取已釘定試聽的 collectionId）或 Discogs（要登錄 registry），寫 `covers.json`，跑 `add-registry.mjs <批>` 與 `scripts/render-discogs-registry.mjs`。
   - 逐張審稿 45 篇（禁語、轉述引導詞、媒體名、卡面年份與正文發行年一致），寫主線裁定。
   - `node batch-progress/downtempo-20261011/build-manifest.mjs <批>` → `scripts/verify-album-onboarding.mjs`（prepare 0 error）。
6. **寫入**（順序不可倒）：複製成根目錄 `onboarding-manifest-<批>-<日期>.json` → `publish-manifest.mjs`（乾跑）→ `push-card-catalog-patches.mjs` → `kv-token-check.mjs` → `kv-from-manifest.mjs <manifest> publish-stage/kv-<批>-<日期>.json` → `npx -y wrangler@4 kv bulk put … --remote`（`CLOUDFLARE_ACCOUNT_ID=3a23f905e8f31d91c85050f2ed304321`）→ `verify-wave-kv.mjs <日期> <批>` → `publish-manifest.mjs --write-preview` → `build-apple-audio-runtime-map.mjs` → `publish-manifest.mjs --write-pool` → `build-seed-genres.mjs` → `mark-manifest-published.mjs --catalog --kv --preview` → `verify-album-onboarding.mjs --published`（0 error）。
7. 子曲風：對新 45 張逐張打 worker `/album-genres`（雲端沒有 `data/rawgenres-cache.json`，不要用 warm-album-genres.mjs），再 `scripts/build-genre-tree.mjs --pull --write`。
8. `PROJECT_MEMORY.md` 最上方補一筆 → 逐一 `git add` → commit → push → 開 PR → Cloudflare Pages 綠燈就合併 → 分支接回最新 main（`git checkout -B <分支> origin/main`）。

## 三、已知的坑
- MB 用 U+2010 連字號，名字照抄、連字號不能抄（build-master 已處理）。
- 研究層常推翻策展層的「chill 度」——照收、正文照研究稿寫實際聲音，不硬寫放鬆（dt1 9012、dt2 9091 先例）。
- 寫作層會把 note 裡的媒體名改成「樂評」——這是對的（writer-base 禁令優先於 note）。
- 經典 5 不自動給：build-manifest 會把機器基線的 classic 5 壓成 4。
- 同名藝人並存（英國 Mono vs 日本 Mono）無消歧先例，照 MB 掛名，正文寫清楚是誰。
