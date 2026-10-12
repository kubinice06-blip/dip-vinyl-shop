# 新世代爵士（2010–）策展線交接（add-20261012-nj1…nj5）

店主 2026-10-11：「新爵士2010年後到2026的也很缺 現在nu jazz都不是新世代的 為何」→「像kokoroko 一個低音號當leader的這些也都是新世代的爵士 我上面指的就是爵士 不是downtempo」；看過策展摘要後 2026-10-12 回「開跑」。
**全線 197 張、5 批**（策展 219 張，主線刪老世代 15、偏離爵士 6、MB 查無 1，見 `batch-progress/newjazz-20261011/rulings.md` 9341–9348）。
裁定權已下放（CLAUDE.md「接力任務」）：中途不回報，策展／研究／管線裁定自己定、寫進各批 rulings.md；**店主 2026-10-10：PR 綠燈就直接合併，不用問**。
照 CLAUDE.md「每個工作階段跑 2 批就換」：**一個工作階段跑 2 批**，跑完在本檔「一、進度」更新狀態再收工，下一個工作階段接著跑。

## 一、進度

| 批 | 內容 | 張數 | 狀態 |
|---|---|---:|---|
| nj1 | 英國：倫敦南區（Theon Cross、Binker and Moses、Joe Armon-Jones…）、Afro／加勒比、Gondwana | 40 | 卡單已備 |
| nj2 | 英國後段（broken beat、Dinosaur、Fergus McCreadie…）＋美國 LA West Coast Get Down、爵士×嘻哈、芝加哥前段 | 40 | 卡單已備 |
| nj3 | 芝加哥後段、紐約 post-bop、大樂團、豎琴、歌手、北歐前段（Elephant9…Hedvig Mollestad） | 39 | 卡單已備 |
| nj4 | 北歐後段、波蘭（EABS）、德奧瑞、法國、南非、以色列、拉美（Amaro Freitas…Metá Metá） | 39 | 卡單已備 |
| nj5 | 拉美尾段、加澳、日本（H ZETTRIO、fox capture plan、挾間美帆、黒田卓也…）、韓國、印尼 | 39 | 卡單已備 |

卡單：`desc-tools/batches/cards/add-20261012-nj{1..5}-cards.json`（研究 a–e 各 7–8 張；身分全 pinned，MB 已回查，`batch-progress/newjazz-20261011/master.json`）。
各批 `batch-progress/add-20261012-njN/rulings.md` 還沒建——照 `batch-progress/add-20261011-dt2/rulings.md` 的檔頭格式建。**條號**：nj1 9361–9440、nj2 9441–9520、nj3 9521–9600、nj4 9601–9680、nj5 9681–9760（每批 80 條：研究 a–e 各 10、鉤子 10、寫作 10、主線 10）。downtempo 線 dt3–dt5 用 9101–9340，兩條線不撞號。

## 二、每批的固定流程

腳本：`batch-progress/newjazz-20261011/build-manifest.mjs` 與三份派工單（RES／HOOK／WRITER-DISPATCH.md）在 newjazz 目錄；`meta.mjs`、`picks.mjs`、`add-registry.mjs`、`cover-sheet.cjs` 沿用 `batch-progress/downtempo-20261011/`（只吃批名）。

1. **研究層**：5 支 Sonnet，派工詞只寫一句：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/newjazz-20261011/RES-DISPATCH.md` 並照做。批名：add-20261012-njN；組別：x。」
   同時在背景跑 `node batch-progress/downtempo-20261011/meta.mjs add-20261012-njN`（CAA、/album-rating listeners、MB 曲目表、Apple 候選；可續跑）。
   ⚠ **不要用 `pgrep -f` 等前一支 meta 結束**——等待迴圈自己的命令列也含那個字串，會永遠卡住（2026-10-11 卡了一次）。直接用 run_in_background 跑。
2. 研究層交件後：照研究層推翻的年份／廠牌改卡單（寫主線裁定），`cd desc-tools && node qa-batch.mjs research add-20261012-njN`。
3. **鉤子層**：2 支 Opus（a–c 一支、d–e 一支），派工讀 `batch-progress/newjazz-20261011/HOOK-DISPATCH.md`，並要求讀前幾批 rulings 的鉤子骨架表避開已用骨架。交件後 `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。
4. **寫作層**：2 支 Opus（writer-1、writer-2），派工讀 `batch-progress/newjazz-20261011/WRITER-DISPATCH.md`，並要求把前幾批已上線的 out 檔納入 4-gram 自掃。交件後 `qa-batch out`、`qa-check-research`、`fix-spacing`。
5. **主線**（不派代理）：
   - 試聽：看 `meta.json` 的 Apple 候選，寫 `preview-override.json`（二合一 CD 取對應段落的軌、題名不同但曲目相符的照收、精選輯不當本盤），跑 `node batch-progress/downtempo-20261011/picks.mjs <批>`。
   - 封面：下載 CAA front-250 排縮圖表逐張目視（`batch-progress/downtempo-20261011/cover-sheet.cjs`，Playwright Chromium 排版，用法見檔頭）；CAA 缺圖或 500 的改 Apple 官方圖（`apple-verified-collection`，取已釘定試聽的 collectionId）或 Discogs（要登錄 registry），寫 `covers.json`，跑 `add-registry.mjs <批>` 與 `scripts/render-discogs-registry.mjs`。
   - 逐張審稿 39–40 篇（禁語、轉述引導詞、媒體名、卡面年份與正文發行年一致），寫主線裁定。
   - `node batch-progress/newjazz-20261011/build-manifest.mjs <批>`（這支在 newjazz 目錄；meta／picks／add-registry／cover-sheet 沿用 downtempo 目錄那幾支，與批名無關） → `scripts/verify-album-onboarding.mjs`（prepare 0 error）。
6. **寫入**（順序不可倒）：複製成根目錄 `onboarding-manifest-<批>-<日期>.json` → `publish-manifest.mjs`（乾跑）→ `push-card-catalog-patches.mjs` → `kv-token-check.mjs` → `kv-from-manifest.mjs <manifest> publish-stage/kv-<批>-<日期>.json` → `npx -y wrangler@4 kv bulk put … --remote`（`CLOUDFLARE_ACCOUNT_ID=3a23f905e8f31d91c85050f2ed304321`）→ `verify-wave-kv.mjs <日期> <批>` → `publish-manifest.mjs --write-preview` → `build-apple-audio-runtime-map.mjs` → `publish-manifest.mjs --write-pool` → `build-seed-genres.mjs` → `mark-manifest-published.mjs --catalog --kv --preview` → `verify-album-onboarding.mjs --published`（0 error）。
7. 子曲風：對新卡逐張打 worker `/album-genres`（雲端沒有 `data/rawgenres-cache.json`，不要用 warm-album-genres.mjs），再 `scripts/build-genre-tree.mjs --pull --write`。
8. `PROJECT_MEMORY.md` 最上方補一筆 → 逐一 `git add` → commit → push → 開 PR → Cloudflare Pages 綠燈就合併 → 分支接回最新 main（`git checkout -B <分支> origin/main`）。


## 三、已知的坑
- **跟 downtempo 線同時跑**：兩條線都會改 `seed_cards.json`、靜態試聽地圖、`data/card-subgenres*`、`data/discogs-cover-registry.json`、`PROJECT_MEMORY.md`。寫入（第 6 步）前先 `git fetch origin` 把最新 main 合進分支，PR 衝突用合併解、生成檔用腳本重建，不要手改。
- 不要用 `pgrep -f` 等前一支 meta 結束（等待迴圈自己的命令列也含那個字串，會永遠卡住）。直接用 run_in_background。
- MB 用 U+2010 連字號，名字照抄、連字號不能抄（build-master 已處理）。
- 寫作層會把 note 裡的媒體名改成「樂評」——這是對的（writer-base 禁令優先於 note）。
- 經典 5 不自動給：build-manifest 會把機器基線的 classic 5 壓成 4。
- 2010 年後的新作 CAA 封面多半有；新作在 Apple 常有 Explicit 版或 Deluxe 版，試聽照 dt 線先例取 notExplicit、曲目對 MB 的版本。
- 同場景卡多（倫敦南區一批就十幾張）：鉤子層要把「場景介紹」限一張當主軸，其他張寫人和聲音。
