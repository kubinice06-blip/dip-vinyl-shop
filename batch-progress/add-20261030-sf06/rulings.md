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


## 研究 a 組（41501–41510）
- **41501**：劉以達《麻木》。MB release（1996 CD，Musician 非池中 MUS006-2）、Discogs、中文維基「錄音室專輯」三方一致為 1996 個人專輯、11 首新曲，支持主線 releaseException；廠牌「非池中」確認。聲音來源全無，status thin，moodGuess 存疑。
- **41502**：雞蛋蒸肉餅。年份維持 2016（維基 2016-12-17；MB 實體 2017-01-21 台／02-03 港）；廠牌 GDJYB Independent（維基）與 MB 的 Redline（紅線音樂，2016-04 簽約）並存。維基稱「數學搖滾加民謠」，與 moodGuess「電子與舞曲脈衝」不符，存疑。金音創作獎措辭含糊，不寫。
- **41503**：張亞東《Ya Tung》。維基、Discogs（Wings Music Win 2019-1，內圈 IFPI LD98）、Apple（℗ 1998）三方 1998，MB 1999-05-13 判為另一發行日，建議卡單維持 1998。聲音無任何描述，thin。
- **41504**：AB'S。Moon Records MOON-28007 由 MB 與 Discogs 實物版確認，解除「推定」。成員名 Discogs／日維基不一，facts 不點鼓手與鍵盤手名。聲音有日維基描述（雙吉他、假音和聲），合成器比重無來源。

## 研究 b 組（41511–41520）
- **41511**：Everfor《空中閣樓》。Apple ℗ 2021 蘇偉安，無廠牌；Discogs 另有 2019《浪漫的中華街》與 2020〈幸運淚〉7 吋（Big Romantic Records），故「MB 上唯一」只對 MB 成立。city pop 為唯一聲音線索，moodGuess 存疑。
- **41512**：Kaishandao《Homeland》。Bandcamp 自稱首張 EP，器材與標籤（Octatrack／Machinedrum、breaks／house／techno）顯示節拍導向，與 moodGuess「氛圍」不符，存疑；6 首約 31 分，長 EP 例外成立。
- **41513**：亂彈阿翔《把我換成你》。**推翻策展層**：正式盤名帶副題「十年幕後創作精華 電影電視主題歌曲專輯」，性質是主題曲選集（TVBS 得獎名單同）；廠牌為赤腳不辣（Chockablock），非相信音樂（MB 另載禾廣娛樂 BLA004）；年份 Apple 2011-11-01，維基 2012-02-03 疑為重發。第 23 屆金曲獎最佳國語男歌手為得獎。主線決定是否仍收選集。
- **41514**：盧家齊《Circle = 圓》。Discogs 明載為個人作品集結的雙卡帶（限量 100、2 小時 24 分），非單一概念長專；MB 標 Album。聲音（drone、部落打擊）與 moodGuess 吻合。Bandcamp 兩條事實由搜尋摘要而來，單一來源。

## 主線（條號 41571–41580）
- 41571：研究 b 組 41511 指出亂彈阿翔《把我換成你》全名《把我換成你-十年幕後創作精華 電影電視主題歌曲專輯》，是十年影視主題曲合集。**照收**：第 23 屆金曲獎（2012）以本盤頒最佳國語男歌手，是他個人名義的生涯代表作，Spotify 名下也只有這張長篇；卡單 `releaseType` 改 Compilation、寫 `exceptionReason`。廠牌照研究層改「赤腳不辣」（Apple 版權與得獎名單），年份維持 2011。
- 41572：盧家齊《Circle = 圓》研究層查到是雙卡帶作品集（WV Sorcerer WV 011、限量 100、2 小時 24 分）。改選 2024《Apex Union》不成立（MB 標 EP，且是與 Bungalovv 合作名義），**維持《Circle = 圓》**，它是 MB 上唯一一張個人 Album。
- 41573：劉以達《麻木》研究 a 組確認 11 首新曲、Musician 非池中 MUS006-2，照錄音室專輯收（承主線策展裁定）；卡單廠牌補「非池中」。雞蛋蒸肉餅廠牌改「紅線音樂」（實體 CD 發行商，研究 a 組），年份維持 2016。張亞東《Ya Tung》年份維持 1998（維基、Discogs IFPI LD98、Apple ℗ 1998 三方一致）。
