# add-20261030-sf04 裁定（店主 Spotify 追蹤藝人補卡池・日本：電子、ambient、嘻哈、lo-fi、YMO 周邊）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf03、sf04。流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二，**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf04a.json`（14 位 16 張）＋`curation-sf04b.json`（14 位 12 張）＋主線補 `curation-sf04c.json`（1 張）→ 主線汰 1（`master-override-sf04asf04bsf04c.json`）→ `master-sf04asf04bsf04c.json`（28 張：MB 釘住 24、§1 人工 4）→ `pick.json`（28）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf04-cards.json`（28 張；研究 a–d 各 6、e 4）。
> **預留：研究 a 41301–41310、b 41311–41320、c 41321–41330、d 41331–41340、e 41341–41350、鉤子 41351–41360、寫作 41361–41370、主線 41371–41380。**
---

## 主線策展（不佔條號）
- **清單 28 位 → 收 26 位、28 張；跳過已在池 0 位；不收 2 位。** 主線對 origin/main 與全部 `claude/*` 分支 seed（22,168 列）跑藝人層與盤名層去重，命中全是誤中（Lily Chou-Chou、Miles Davis《Tutu》、Migos《Culture》、MFSB《Summertime》、Big Dipper／Diplo 之於 dip），0 撞。
- **U.TA屋塔（策展 b 判「已在 curation-ml4」跳過，主線推翻、補收）**：ml4 研究層以聲音偏冷汰掉（rulings 14311），從未上線，池中沒有這位。照 PLAN「池中已有才跳過」收《緩飆公路 Highway Cruising》（2015，Hove，§1 人工，ml4 研究 14273 已核 Discogs 33801504）。台灣樂團分在日本批，照 PLAN「分錯場景照收，不搬批」。
- **不收**：
  - ILL BONE——1985 年日本硬核／噪音團（策展核對 Apple 同頁有《死者》2015 重發）。唯一錄音室作品《死者》MB 記 EP、1985 原版 4 曲（12 曲是 2015 年加錄重發），不到長 EP 例外的 6 首；2024《日本》MB 記 Album＋Compilation＋Live，不是錄音室專輯。整位不收。
  - Buddhablessyou——MB／Discogs／iTunes 查無此名；iTunes 只有 Buddha Bless 的《BUDDHA BLESS YOU》（2009），掛名不同、對不上。身分不明不收。
- 身分：Hajime Tachibana＝立花ハジメ；Miharu Koshi＝越美晴；Hideko Okiyama＝沖山秀子；Ayako Shinozaki＝篠崎史子（豎琴演奏者；MB 掛名含武満徹等作曲者，卡上照古典慣例用演奏者）；Yasushi Ide＝井出靖；sibitt＝志人（降神）；Ironomi＝いろのみ；Chouchou＝日本電子雙人組（MB a18d9ff7），非 Lily Chou-Chou。
- **Tokimeki Records 收**：MB 與 Discogs 皆為原創 city pop／lo-fi 計畫兼廠牌名，不是翻唱或合輯帳號；收《透明なガール》（2022）。
- **SOFT**：京都器樂迷幻團，《Passing Tone》（2024，Discogs LP Album，結成 30 週年第 11 張）。只有 5 首長曲，但發行型別是正規專輯，不是 EP，不適用例外條款；§1 人工。
- 留兩張的：越美晴（《Tutu》《パラレリズム》）、SHAKKAZOMBIE（《HERO THE S.Z.》《JOURNEY OF FORESIGHT》）。
- 非日本藝人照收（分錯場景）：Emapea（波蘭）、Magamura（匈牙利，依廠牌推定）、concrete concrete（美國，研究層核國籍）、Chestnut Bakery（中國）、AKA lisa（瑞典）、U.TA屋塔（台灣）。
- 交研究層把關：Yasushi Ide 高峰在 Lonesome Echo Strings 名義，本卡收其個人名義《Cosmic Suite 2》，代表性要查；YPY、KUSO GVKI、Hoshina Anniversary、DOOPEES、kinoue64、Emapea、Ironomi、dip、in the blue shirt 代表作缺評論共識；Chouchou 盤名 MB 為「theme02 Night and Wanderer」；沖山秀子封面取 2006 再版；篠崎史子封面取 Apple。§1 人工 4 張（沖山秀子、Magamura、SOFT、U.TA屋塔），沖山秀子的 `mbAbsenceProof` 是字串，上線前轉物件。
