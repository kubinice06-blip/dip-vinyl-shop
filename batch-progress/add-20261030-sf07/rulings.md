# add-20261030-sf07 裁定（Spotify 追蹤藝人補卡池・西洋 60–80 年代迷幻、prog、硬搖滾、krautrock、post-punk）

> 店主 2026-10-30「依 Spotify 追蹤藝人補卡池」（`/dip-card-create`），交接 `batch-progress/spotify-follow-20261030/PLAN.md`；本工作階段負責 sf05、sf07。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，策展層改 `CUR-DISPATCH-SF.md`；**不做 moodGuess 邊距檢查**，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率。
> 策展：`curation-sf07a.json`（25 張）＋`curation-sf07b.json`（22）＋主線改收 `curation-sf07m.json`（3）→ 主線汰 2、更正 3（`master-override-sf07asf07bsf07m.json`）→ `master-sf07asf07bsf07m.json`（MB 釘住 45、§1 人工 2）→ `pick.json`（47）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf07-cards.json`（47 張；研究 a–d 各 10、e 7）。
> **預留：研究 a 30701–30710、b 30711–30720、c 30721–30730、d 30731–30740、e 30741–30750、鉤子 30751–30760、寫作 30761–30770、主線 30771–30790。**
---

## 主線策展（不佔條號）
- 清單 35 位：**收 32 位 47 張**、**跳過（已在池）0 位**、**不收 3 位**。
- **不收**：Mellow Yellow（MB 有芬蘭、丹麥、日本、比利時、牙買加多組同名，無可辨識的正規專輯，身分不明）、Destroy All Monsters（《November 22, 1963》Discogs 判彙編，其餘為現場／彙編）、Antena（只有 5 首迷你專輯《Camino del Sol》與彙編，不滿 6 首長 EP 門檻）。
- **主線改收 3 張**：The West Coast Pop Art Experimental Band《Volume One》（1966 私壓）→《Volume 2》（1967 Reprise，迷幻轉向最徹底、評價最高）；Paul Davis《Southern Tracks and Fantasies》→《Singer of Songs • Teller of Tales》（1977，收〈I Go Crazy〉）；Willie West《Lost Soul》由人工身分改 MB 釘住（RG 85436f9c）。
- **更正 2**：Eyeless In Gaza → MB 正規寫法 `Eyeless in Gaza`（兩張）。
- **同名裁定**：Khan＝英國 Steve Hillage 1972《Space Shanty》；Ikarus＝德國 1971；Pierrot Lunaire＝義大利；Affinity＝英國 1970；Black Widow＝英國《Sacrifice》；Nine Days' Wonder＝德國；Tully＝澳洲；Zaratustra＝墨西哥 1970《Su Música... Su Filosofía...》（Discogs Zaratustra (2)，§1 人工）；Martin & Garp＝2020 年代當代 AOR 團《Sentimental Fools》（不是 70 年代，§1 人工；國別待研究層確認）。
- **例外**：Mike Ratledge《Riddles of the Sphinx》（2013 Mordant Music，1977 Mulvey／Wollen 電影配樂）——MB 次類型 Soundtrack，是 Ratledge 唯一的個人署名作品，以配樂例外收。The Cosmic Jokers 兩張是 Rolf-Ulrich Kaiser 未經樂手同意發行的爭議盤，照收，正文要寫明。
- 交研究層把關：Pierrot Lunaire 兩張廠牌（策展憑記憶填 Grog）、Ikarus 廠牌、Eyeless in Gaza《Pale Hands》首發年（MB 空）、Peter Kaukonen 封面（CAA 無，用 Discogs）、Slow Dancer 國別、Tully／Paul Davis 廠牌。
- 跨分支去重：對 origin/main 與 10-28 後更新的 `claude/*` 分支 seed 查藝人名、別名、Spotify 寫法，0 撞。

## 研究 e 組（30741–30750）
- 30741：Sugarcubes《Here Today, Tomorrow Next Week!》卡單廠牌 One Little Independent 是 2020 年改名後現名，1989 原名 One Little Indian（美國版 Elektra）；正文寫原名或「後改名」，不算推翻。
- 30742：WCPAEB《Volume 2》正式名《Vol. 2 (Breaking Through)》，樂團第三張、Reprise 第二張；策展 curatorWhy「評價最高」不成立（維基與樂評傳記以《Volume 3》為最成熟），寫作勿稱最高評價。
- 30743：Mick Karn《Dreams of Reason Produce Monsters》發行日維基 1987-02-16、MB 1987-03-09，錄於 1986-04/05；年份維持 1987。moodGuess「低沉貝斯」存疑：貝斯退居次要，實為器樂為主的新古典藝術流行（輕度，不建議汰換）。
- 30744：Mick Karn《Titles》、Paul Davis、Jazz Butcher 兩張、Sugarcubes 皆為正規錄音室專輯，身分、年份、廠牌核對無誤；無需汰換。Davis 專輯確為〈I Go Crazy〉所在（維基歌曲條目）。
- 30745：Karn Titles、WCPAEB、Davis 缺專輯級樂評，status 標 partial；聲音描述取自人員表與傳記。
- 本組未含 Willie West（在 d 組）。

## 主線（條號 30771–30790）
- **30771** WCPAEB《Volume 2》curatorWhy 去掉「評價最高」（研究 e：維基與樂團傳記以《Volume 3》為最成熟，《Vol. 2》是最有野心的一張；正式名《Vol. 2 (Breaking Through)》）。仍收《Part One》＋《Volume 2》兩張，正文不得寫「評價最高／最佳」。Sugarcubes 廠牌正文寫原名 One Little Indian。
