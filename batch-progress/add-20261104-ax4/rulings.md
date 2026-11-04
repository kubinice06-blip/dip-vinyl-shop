# add-20261104-ax4 裁定（新頂點盤線・流亡 B：亞洲、拉美、非洲、東歐、早期電子私壓）

> 店主 2026-11-04：同意另外上架新盤，把流亡從 254 補到約 300。交接 `batch-progress/apex-new-20261104/PLAN.md`。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；**本批明確採用頂點**：研究層確認 listeners 有效且 1–299、非錯配、冷門度 5（無串流授權再發）者 seed 第 9 欄填 `pearl`，不合格照一般卡上架或汰換。
> 策展：`curation-ax4a.json`（亞洲＋非洲 15）＋`curation-ax4b.json`（拉美＋東歐＋早期電子 13）→ 主線汰 3（`master-override-ax4aax4b.json`）→ `master-ax4aax4b.json`（25 張：MB 7、§1 人工 18）→ `pick.json`（25）→ `build-cards.mjs`，再改分研究 a–c 三組。
> 本批卡單：`desc-tools/batches/cards/add-20261104-ax4-cards.json`（25 張；研究 a 9、b 9、c 7）。
> **預留：研究 a 51801–51810、b 51811–51820、c 51821–51830、鉤子 51851–51860、寫作 51861–51870、主線 51871–51880。**
---

## 主線策展（不佔條號）
- 汰 3：Marijata《This Is Marijata》（worker listeners 35,499、Apple 有 EP 版，策展層的 1 是錯配）；Sakhile《Sakhile》（Apple 有該團 1996 年同名盤，與 1982 Moonshine 原盤關係不明，listeners 268 貼上限，不冒險）；Judas《Judas》（Apple 有 Vicor 40 週年重發）。
- 掛名：Masabumi Kikuchi Sextet 改池中慣例「菊地雅章セクステット」（池中已有《Matrix》《Re-confirmation》），英文進 `queryAlias`。菊地雅章、강태환 池中已有卡但都不是 pearl，同級一人一張不受影響。
- 年份取原盤首發年：Jesper Siliya《Giant Steps》1978、Blackfoot《Youth Power》1975（MB 日期是近年重發）。《Hairpin Circus》MB 標 Album＋Soundtrack（同名電影配樂），照收。
- 交研究層把關（流亡資格）：每張 listeners 是否對到同一張盤（不是同名藝人）、Apple／Spotify／Bandcamp 數位是否有正式串流再發、壓量與重發史。

## 研究 a 組（51801–51810）
- 51801：Les Ambassadeurs《Mandjou》流亡不合格——Apple Music 有 Badmos International 2017 正式數位版（6 首《Mandjou》＋3 首 EP），且以 Ambassadeur International 查 listeners 為 450（>299）。建議不 pearl。
- 51802：Brigth Engelberts《Tolambo Funk》流亡不合格——Apple Music 有 Badmos 2017 同六首曲目、改名《Civilisation in the World》的正式數位版。listeners 29 有效，但有串流再發。建議不 pearl。
- 51803：《Hairpin Circus》卡單 manualEvidenceUrls 的 Discogs master/3419320 是 1972 年 7 吋單曲 FS-1707，專輯 LP 正確母版是 master/539078（MB 關聯亦指此）；掛名 worker 需用英文名查（日文名無回應）。合格。
- 51804：Blackfoot《Youth Power》合格，但 Spotify／Bandcamp 無法直接開頁驗證（WebSearch 與 LITA 頁皆無數位連結，iTunes 無）；建議主線再覆核。卡單的「The Blackfoot 287」是另一團，非本盤。
- 51805：Jesper Siliya《Giant Steps》合格，同上 Spotify／Bandcamp 未能直驗；iTunes 無，僅 2018 Shadoks 實體。
- 51806：Blackbuster 與 Fanny's Group 存疑：Blackbuster 3 實為舞曲串燒（附舞步海報），非卡單所述「被 DJ 圈挖出的 Pinoy funk」；Fanny's Group 無聲音來源，moodGuess 存疑，status 標 thin。
- 51807：Last.fm 頁面本機連線回 600，listeners 一律以 worker `_listeners` 為準。Urfalı Babi 卡單 key 為 desc2: 前綴（研究稿已照卡單）。
