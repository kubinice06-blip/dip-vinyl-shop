# 薄細項策展線（ts）交接（add-20261020-ts1…ts6）

店主 2026-10-20：「幫我掃描一下細項是否有些太少，比如越南搖滾只有一張；太少的策展增加卡池」→「開始跑」。
計畫：`batch-progress/EXPANSION-PLAN-thin-subgenres.md`。接力授權：中途不回報、裁定自己定、寫進各批 `rulings.md`（CLAUDE.md「接力任務」）。
雲端：推自己的分支、開 PR、自己合併（2026-10-21 起）；不訂閱 PR、不排 PR 檢查。

## 一、進度

| 步 | 內容 | 狀態 |
|---|---|---|
| 補標 | `genre-l3-artist-map.json`＋`build-genre-tree.mjs` 步驟 2.6；13 個節點過門檻 | ✅ 2026-10-20 提交 |
| 策展 a–g | 越柬新／泰菲馬／南亞內亞印尼／剛果／衣索比亞＋南部非洲／Fado＋Flamenco／Tango＋巴爾幹（`curation-{a..g}.json`） | ✅ |
| ts1 | 東南亞搖滾 42 張 | ✅ 上線（越南 1→15） |
| ts3 | 非洲 42 張 | ✅ 上線（衣索比亞 9→17；步驟 2.6 支援「藝人|專輯」條目） |
| ts4 | Fado、Flamenco、Tango、巴爾幹 44 張 | ✅ 上線（Tango 4→15 過門檻） |
| ts2 | 新加坡、馬來西亞、南亞、蒙古、印尼補缺 46 張 | ✅ 上線（新加坡 1→11、巴基斯坦 1→8、印度 0→7、蒙古 0→5；國別加孟加拉、尼泊爾） |
| ts5 | 嘻哈深度（台華、韓、法語、Bounce、Cloud） | ✅ 2026-10-22 上線 45 張（`add-20261022-ts5`）：台華 10→21、韓 11→21、法語 10→20、Bounce 16→23、Cloud 南方 32→35／地下 19→24 |
| ts6 | Neofolk、Psy／Goa、50 年代搖滾、Doo-wop 原盤 | ✅ 2026-10-22 上線 45 張（`add-20261022-ts6`）：Neofolk 12→24、Psy／Goa 14→26、50s 搖滾 14→25、Doo-wop 16→26；Carl Perkins 拆卡為「Carl Perkins (rockabilly)」 |
| ts7–ts10 | 越南／泰國／新加坡／蒙古搖滾補到各 50（店主 2026-10-20：「不能水掉，還是要讚的」）；策展 p／q（越）、r／s（泰）、t（新）、u（蒙），派工 `CUR-DISPATCH-ts7.md` | ✅ ts7／ts8／ts9 上線（泰 57、新 41、越 31、蒙 15；後三國是否放寬待店主） |
| ts10–ts11 | 店主 2026-10-21：越南／新加坡／蒙古「放寬」補到 50（門檻改為「場景裡有代表性」）；The HU《Live at Glastonbury》不收（店主：沒什麼特別的現場專就不用）。策展 vv／ss／mm，派工 `CUR-DISPATCH-ts10.md` | ✅ ts10（越 25＋新 13）／ts11（蒙 28）上線：泰 57、越 56、新 54、蒙 43（蒙古候選用盡）。待辦：mood 座標、§11 藝人介紹 |
| 收尾 | 情緒評分、藝人介紹 §11 | ✅ ts1–ts11：score-ts＋ar-d-129～134（10-21）；ts5／ts6：score-ts2＋ar-d-135～136（10-22，只切未寫）。**全線 11 批完成**；待辦只剩 ar-d-129～136 藝人介紹寫作（另開工作階段跑 dip-artist-intro） |

**換工作階段**：WebSearch 額度整個工作階段共用；ts1–ts4 已在 2026-10-20 這個工作階段跑完，ts5／ts6 開新工作階段再跑。
ts5 策展派工：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/thin-sub-20261020/CUR-DISPATCH-ts5.md` 並照做。組別：h。」（i 同理；ts6 為 j、k）。交件後 `build-master.mjs h i` → 主線挑 45 張寫 `batch-progress/add-20261020-ts5/pick.json` → `build-cards.mjs`。
**亞洲以外的節點**：國別樹只管日亞搖滾；其他新卡要掛細項就寫進 `genre-l3-artist-map.json`（ts3、ts4 先例；Various Artists 用「藝人|專輯」）。主類型必須等於節點第一層。
**/album-genres 預熱**：`build-seed-genres` 不會打 worker；每批上線後跑 `batch-progress/thin-sub-20261020/warm-batch.mjs <worker> <批>`（逐張打 `/album-genres`，1.1 秒間隔）再 `build-genre-tree --pull --write`。

## 二、每批流程（腳本在 `batch-progress/thin-sub-20261020/`，複製自 downtempo 線）

0. 策展：派工讀 `CUR-DISPATCH.md`（ts3 起要改分組表）。交件後 `build-master.mjs <組…>` 回查 MB；主線刪改寫 `master-override.json`（`{drop:[[藝人,盤]], fix:{"藝人|盤":{…}}}`）與 rulings。
1. 主線依地區配額寫選取檔 `batch-progress/<批>/pick.json`（`["藝人|盤",…]`），`build-cards.mjs <批> <pick.json>`；建 `batch-progress/<批>/rulings.md`（條號區間照 dt 線格式：研究 a–e 各 10、鉤子 10、寫作 10、主線 10）。
2. 研究層 5 支 Sonnet：「工作目錄 /home/user/dip-vinyl-shop。先完整讀 `batch-progress/thin-sub-20261020/RES-DISPATCH.md` 並照做。批名：<批>；組別：x。」同時背景跑 `meta.mjs <批>`。
3. 研究交件後照研究層推翻的改卡單 → `cd desc-tools && node qa-batch.mjs research <批>`。
4. 鉤子 2 支 Opus（a–c、d–e）讀 `HOOK-DISPATCH.md` → `qa-batch hooks`、`chk-hook-crossgroup`、`merge-writer-input.mjs <批> --split=2`。
5. 寫作 2 支 Opus 讀 `WRITER-DISPATCH.md` → `qa-batch out`、`qa-check-research`、`fix-spacing`。
6. 主線：試聽（`preview-override.json` → `picks.mjs`）、封面（人工身分卡一定要 `covers.json`；CAA 縮圖表 `cover-sheet.cjs`；Discogs 封面 `add-registry.mjs` ＋ `scripts/render-discogs-registry.mjs`）、冷門軸錨點制（ALBUM_ONBOARDING §0.8，`ratings-override.json` 的 `source: manual:regional-rubric`）、逐張審稿 → `build-manifest.mjs <批>` → `scripts/verify-album-onboarding.mjs`。
7. 寫入照 `HANDOFF-downtempo-line.md` 第二節第 6 步（manifest → catalog patches → KV → verify → preview → audio map → pool → seed genres → mark published → published gate）。
8. **亞洲搖滾國別**：新藝人寫進 `rock-asia-country-map.json`（`scripts/build-asia-country-map.mjs` 列待裁定），再 `build-genre-tree.mjs --pull --write`、`build-draw-covers.mjs --pull --write`。
9. 情緒評分：切 45 張工單照 `batch-progress/mood-axes/score500/BRIEF.md` 評分、併進來源層、重跑 `build-priors.mjs`／`build-scale.mjs v0`。
10. 藝人介紹（ALBUM_ONBOARDING §11）→ PROJECT_MEMORY → 逐檔 git add → commit → push。

## 三、ts5／ts6 新踩的坑（2026-10-22）
- **Apple 專輯搜尋對多數盤回空**（Damso、$uicideboy$ 這種大盤也是）：改走「`entity=musicArtist` 搜藝人 → `lookup?id=<artistId>&entity=album` 列目錄 → `lookup?id=<collectionId>&entity=song` 逐首對 MB」。`meta.mjs` 的商店區表已補 tw／hk／kr／fr／be／se（cn 走 tw）。
- **kr 商店 lookup 不回傳曲目**：韓國盤用 us 商店同一 collectionId。
- **同名藝人要在上線前查 `data/artist-intros`**：藝人介紹以名字為鍵，同名不同人會跳錯人的介紹（Carl Perkins 爵士鋼琴手 vs rockabilly）。拆卡照 Air (US jazz trio) 先例，後進池者加括號；上線後才拆要搬 KV 三鍵、card_catalog（`migrate-card-catalog-ids.mjs --map … --write --delete-old`）、seed、card-subgenres、genre-l3、apple-audio-map、情緒工單 id。
- 正文不點名資料平台（「維基把…」）、媒體名與媒體年度選（Groove、Abcdr du Son、Complex）——寫作層仍會漏，主線審稿要掃。
