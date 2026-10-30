# add-20261030-sf06 裁定（Spotify 追蹤藝人補卡池・華語其他、港、韓、泰；身分待查的華語名）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf06、sf08。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf06a.json`（11）＋`curation-sf06b.json`（9）→ 主線改 3（`master-override-sf06asf06b.json`）→ `master-sf06asf06b.json`（20 張：MB 釘住 20）→ `pick.json`（20）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf06-cards.json`（20 張；研究 a–e 各 4）。
> **預留：研究 a 41501–41510、b 41511–41520、c 41521–41530、d 41531–41540、e 41541–41550、鉤子 41551–41560、寫作 41561–41570、主線 41571–41580。**（sf 線條號：sfNN → 41001＋(NN−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **清單 29 位 → 收 20 位、20 張；跳過已在池 0 位；不收 9 位。** 每位只收 1 張（多數藝人只有一張正規專輯）。
- **身分核對**：gap.json 附的 Spotify 藝人連結逐位對 MB 藝人頁的 Spotify 連結（GDJYB、AB'S、Everfor、亂彈阿翔、Fishdoll、Juggaknots、Glen Check、강태환 對上）；MB 無 Spotify 連結的，抓 Spotify 藝人頁的專輯清單對盤名（Shaa Khan《The World Will End On Friday》、Kaishandao《Homeland》、The Cheers Cheers《不如搬去船底星》＝Carinae、Monique Chao《Time Chamber》、Superstar Quamallah《Invisible Man》、張亞東《Ya Tung》、劉以達《麻木》都在 Spotify 該藝人名下）。7FO、Lujiachi、dotzio、JUU4E、Championxiii 的盤在 Spotify 藝人頁前 12 張沒露出，但 MB 掛名唯一、類型與國別一致，照收。
- **主線改 3 處**（`master-override-sf06asf06b.json`）：
  - Glen Check：原選 2022《Bleach》→ 改 2012 首張正規專輯《Haute Couture》（MB 32136921），國別 jp → kr（首爾樂團，策展層誤寫東京）。
  - 劉以達《麻木》：MB 與 Spotify 都標 compilation，但中文維基「錄音室專輯」表列為 1996 年個人專輯（1996-01-29 發片派對上達明一派宣布復合），曲目為新作 → 照錄音室專輯收，寫 `releaseException`，廠牌補「非池中」。
  - 藝人名「乱彈阿翔」→ 台灣正寫「亂彈阿翔」。
- **跳過（池中已有）**：無。15＋14 位以 seed／`data/artist-intros`／aliases 與 origin 全部 `claude/*` 分支 seed 查過（Damon、Light 之類子字串誤中已人工排除）。劉以達池中只有達明一派，個人名義另收。
- **不收**：
  - Ni Jay：MB、iTunes 查無可靠身分。
  - Popstar Benny：美國 DIY 饒舌，自發行小品，沒有一張作為主要作品的正規專輯。
  - Tracey：同名者多（Tracey Thorn 池中已有、荷蘭製作人 Tracey），釘不住 Spotify 這位。
  - WHYNOT：同名多組，釘不住。
  - HH：同名多組（德、日、葡、台灣聲音藝術二人組姚仲涵＋葉廷皓），MB 無對應，釘不住。
  - Chill Qin：只有 2025 年節專輯一張。
  - เขียนไขและวานิช：MB、Discogs、網搜皆查無。
  - Food-Spotter：查明是單曲藝人（2018 兩支單曲），不是廠牌；沒有專輯。
  - B E N N：只有 EP《Entheos》（2021）。
- Kaishandao《Homeland》是 6 首長 EP，照 CUR-DISPATCH-SF 長 EP 例外收（`releaseException`）。

