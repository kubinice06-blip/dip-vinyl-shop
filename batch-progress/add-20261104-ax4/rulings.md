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

## 研究 b 組（51811–51820）

- 51811：Sagrado Coração da Terra 流亡不合格。Apple BR 已有 Marcus Viana 名下 1984 同名專輯，且 1985 Bemol 起多次再發。
- 51812：Color Humano《Sangre del Sol》不合格。Discogs master 是 1973 年 7 吋單曲（兩首），不是專輯；該團正式專輯 Apple 已上架。
- 51813：Marlui Miranda《Olho D'Água》不合格。Apple BR 有《Olhos D'Água》1979 串流，另有 2002 CD 再版。
- 51814：Magnetic Band 是 1980 年 Melodiya 7 吋 EP（兩首），不是 LP；listeners 35 與無串流兩條過，體裁不符，建議汰換。
- 51815：Mike Nyoni 判合格。2018 Now-Again 選輯《My Own Thing》在 Apple 只收其中 4 首，整張無單獨串流。原版廠牌 Discogs／Now-Again 指 Chris Editions（CL 012），卡單掛 ZMPL 51，建議廠牌欄改。
- 51816：Krzak《Paczka》判合格但存疑。listeners 238 貼上限；廠牌實為 Pronit（卡單 Muza）；卡單 manualEvidenceUrls 的 master／release id 對調（master 873309、release 2394903）。
- 51817：Cuarteto Cedrón 判合格。curatorWhy「流亡巴黎」與時序不符（1974 才移居法國，本盤 1972 西班牙壓片）。
- 51818：Last.fm 頁面經 proxy 一律 600 無法開啟，listeners 全取 worker `_listeners`（九張皆 1–299）；Tokyo Kid Brothers、Cool Knights 判合格（Apple 查無，Cool Knights 僅 2016 義大利非官方再版）。

## 研究 c 組（51821–51830）
- 51821：c 組 7 張逐張核對流亡資格。合格 3（Lutajuća Srca 12、Eloy 12、Maxfield 75）；不合格 4：Grupa 220《Sivilo Perona》（Discogs 全為 7" 單曲，非專輯）、Schnitzler《Eruption》（Apple 有 Bureau B 2012 Kluster《Eruption》同音源）、Dissevelt（卡單證據連到單曲 master 614758，真專輯為 master 178091／MB 4f7f8f29，且有 2012 Omni CD）、Lundsten（四張 CD 合輯在 Apple 串流含〈Mizar〉，邊緣）。
- 51822：Last.fm 直連多半回 600，listeners 以 worker `_listeners` 為準；Bandcamp 搜尋頁無法載入，Spotify 未核對，Eloy／Maxfield／Lutajuća Srca 為「暫時合格」。
- 51823：MB 實際有 Eloy（RG 67561f1f）、Maxfield（RG 85d86ba0）、Dissevelt（RG 4f7f8f29）條目，與卡單 mbAbsenceProof 不符，建議主線補 mbid。

## 主線研究驗收（51871–）
- 51871 汰 5（身分錯置，非整張專輯或不是這個掛名）：Grupa 220《Sivilo Perona》（Discogs master 426402 全是 1971 七吋）、Color Humano《Sangre del Sol》（Microfon 七吋兩首）、Magnetic Band《Magnetic Band》（Melodiya 七吋 EP）、Conrad Schnitzler《Eruption》（即 Kluster 1971 告別演出同一份音源，Bureau B 2012 以 Kluster 名義正式串流）、Tom Dissevelt《Song of the Second Moon》（卡單證據是七吋；真 LP 為 Limelight LS 86050、掛名 Tom Dissevelt & Kid Baltan，worker listeners 538，超過流亡上限）。卡單 25 → 20，研究稿同步刪。
- 51872 轉一般卡 5（不填 pearl）：Les Ambassadeurs《Mandjou》（以 Ambassadeur International 查 listeners 450、Badmos 2017 正式數位）、Brigth Engelberts《Tolambo Funk》（Badmos 2017 改名《Civilisation in the World》同曲目正式數位）、Sagrado Coração da Terra 同名作（Apple BR 有 1984 原盤串流）、Marlui Miranda《Olho D'Água》（Continental 正式商業廠、Apple BR 有串流）、Krzak《Paczka》（國營 Pronit、金唱片、1999 EMI／2005 Metal Mind 兩次 CD 再發，不符「私壓或極小廠」；listeners 238 貼上限）。
- 51873 流亡 15 張照研究層合格採用。兩個邊緣案例照收：Mike Nyoni《I Can't Understand You》——Now-Again 2018 選輯《My Own Thing》只收其中 4 首，整張無單獨串流；Ralph Lundsten《Elektronisk Musik》——只有〈Mizar〉一首收進 4CD 合輯串流。判準：「正式串流再發」指整張專輯，單曲收進跨盤選輯不算。主線另以 iTunes Search（jp／us）抽查 Hairpin Circus、강태환、Tokyo Kid Brothers、Cool Knights、Mike Nyoni，都沒有本盤。
- 51874 Hairpin Circus 身分證據改用 Discogs master 539078（研究 a：原 3419320 是 FS-1707 七吋）。
