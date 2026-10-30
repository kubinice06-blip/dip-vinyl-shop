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

## 研究 c 組（41521–41530）
- **41521**：Shaa Khan《The World Will End on Friday》。身分以 MB／Discogs 3243630 確認：1978 Sky Records（漢堡）sky 015，補廠牌；國別 de（杜伊斯堡）。年份取 1978（德文維基正文寫 1977 為錄音年，Discogs 錄音 1977-08）。**moodGuess 存疑**：來源是德式 Gentle Rock／前衛搖滾（Genesis、Yes 影響），無太空搖滾證據。
- **41522**：The Cheers Cheers《Carinae》（Discogs 作《不如搬去船底星》）。Bandcamp：City Flanker 主唱王小宇的個人計畫、深圳 BoringProductions 004，標籤 jangle／C86／dream pop／shoegaze。**卡單「紹興」無來源**，不採用，country 維持 cn。搜尋兩次無結果，聲音只有 Bandcamp 單頁，status thin。
- **41523**：Fishdoll《Noonsense》。廠牌補 Paxico Records（MB、Bandcamp 一致）；北京身分由 Bandcamp 與 Discogs 證實。**moodGuess 存疑**：Bandcamp 稱 electro-soul、有歌唱與真人貝斯，不是 lo-fi 嘻哈節拍；MB 的 hip hop producer 與此不符。
- **41524**：Juggaknots《The Juggaknots》。MB／Discogs 1996 Fondle 'Em FE002 無誤。維基與樂評稱首作為《Clear Blue Skies》（曲名，2003《Re:Release》副題），與 MB 盤名《The Juggaknots》是同一批歌，卡單維持 MB 盤名。聲音有 Audiopile、AllMusic、SF Weekly 三處描述，與 moodGuess 吻合；y/z 值超尺不採。

## 研究 d 組（41531–41540）
- **41531**：Glen Check《Haute Couture》。廠牌補 Soundholic Entertainment SH1055（2012-03-06 另有 Beyond Music 數位授權版）；**得獎確認為得獎**：2013 年第 10 屆韓國大眾音樂獎最佳舞曲／電子專輯（韓文維基獎項表與英文專輯頁一致），第 11 屆是第二張《YOUTH!》。聲音：樂團自述 synth-pop，參照 Joy Division、New Order、Duran Duran；moodGuess「明亮 disco」小修為偏冷的有拍合成流行。
- **41532**：강태환《소리 (Sorefa)》。MB／Discogs 4220399：2011-12-29 Audioguy Records AGCD0031 雙 CD，補廠牌；Spotify 2020 為再上架，年份維持 2011。演奏者只掛姜泰煥一人（中音薩克斯風）、風格 Free Improvisation。Tokebi（1991，JVC／Zen）為備選盤。尖銳緊繃、無調等聲音描述無樂評來源，只能推論。無獎項細節。
- **41533**：Superstar Quamallah《Invisible Man》。Brick Records BRK-CR-094（2009）確認。**推翻策展層「與 DeQawn 共同署名」**：本張只掛個人名，DeQawn 是後來合作專輯。2024 Be With 首度黑膠（限量 500）與 Gilles Peterson 2009 年度節目屬實，後者為轉述來源。聲音證據為店方文案，缺獨立樂評。
- **41534**：7FO《Water Falls Into a Blank》。廠牌補 RVNG Intl.（CMMND002）；來自 Commend 空間的 See 系列，大阪（N. Kawata）。原版限量數 Discogs 10、RVNG 9，兩處不一。Apple 2026 版對應 RVNG 預告的 2026-11-06 數位版，卡單 year 維持 2016 原版。聲音：dub 加 ambient、「好奇安靜幽默」，細節缺。

## 研究 e 組（41541–41550）
- **41541**：Monique Chao Jazz Orchestra《Time Chamber》。**國別 it 確認**（Bandcamp About、MB）；**領隊身分**：mentelocale 載「由 Monique Chao 創立並指揮」，O's Place Jazz 載台灣出生、現居米蘭、作曲指揮鋼琴歌手，Bandcamp 只掛她製作人。無廠牌。DownBeat 之說摘要出現但無法驗證，不寫。
- **41542**：JUU4E《馬鹿世界》。**推翻策展層「首張專輯」**：Bandcamp 寫是在 EM Records（大阪）的第二張個人專輯；泰國人、孔敬錄音有 Bandcamp 明載，解除身分疑慮；廠牌補 EM Records。聲音：trap／嘻哈拍上疊泛亞取樣、翻唱鄧麗君。moodGuess「未聽證」，可評為有拍偏躁。
- **41543**：dotzio《The File You're Looking for No Longer Exist》。Bandcamp 自述為「人生最初幾首歌」，自行發行；tw 僅由 Discogs 另一張 2019 卡帶 EP 的登錄國別間接支持，無自述地點。性別未知。聲音只有標籤 lofi／indie 與一則聽眾留言，thin。**moodGuess 存疑**（策展層「實驗電子」與標籤不符）。
- **41544**：Championxiii《Champion Status》。MB 2019-06-03 Party Label，補廠牌；Shazam 簡介：靠 2018 年「Rappers Be Like」社群影片起家、〈Becky〉擴寫成曲、受 1980s R&B／嘻哈影響。本名不寫。**moodGuess 存疑**：無任何聲音來源支持 trap 重低頻攻擊性，曲短（2–3 分）、含 interlude，可能偏流行 rap，建議主線視情況汰換。

## 主線（條號 41571–41580）
- 41571：研究 b 組 41511 指出亂彈阿翔《把我換成你》全名《把我換成你-十年幕後創作精華 電影電視主題歌曲專輯》，是十年影視主題曲合集。**照收**：第 23 屆金曲獎（2012）以本盤頒最佳國語男歌手，是他個人名義的生涯代表作，Spotify 名下也只有這張長篇；卡單 `releaseType` 改 Compilation、寫 `exceptionReason`。廠牌照研究層改「赤腳不辣」（Apple 版權與得獎名單），年份維持 2011。
- 41572：盧家齊《Circle = 圓》研究層查到是雙卡帶作品集（WV Sorcerer WV 011、限量 100、2 小時 24 分）。改選 2024《Apex Union》不成立（MB 標 EP，且是與 Bungalovv 合作名義），**維持《Circle = 圓》**，它是 MB 上唯一一張個人 Album。
- 41573：劉以達《麻木》研究 a 組確認 11 首新曲、Musician 非池中 MUS006-2，照錄音室專輯收（承主線策展裁定）；卡單廠牌補「非池中」。雞蛋蒸肉餅廠牌改「紅線音樂」（實體 CD 發行商，研究 a 組），年份維持 2016。張亞東《Ya Tung》年份維持 1998（維基、Discogs IFPI LD98、Apple ℗ 1998 三方一致）。
- 41574：照研究 c–e 組改卡單：廠牌 Glen Check→Soundholic Entertainment、강태환→Audioguy Records、Shaa Khan→Sky Records、Fishdoll→Paxico Records、7FO→RVNG Intl.、Championxiii→Party Label、JUU4E→EM Records（大阪；泰國孔敬錄音）；JUU4E curatorWhy「首張」改「EM 第二張個人專輯」；Superstar Quamallah 刪「與 DeQawn 共同署名」疑點（只掛本人）；Fishdoll 主曲風 hiphop→electronic（第二 soul，Bandcamp 標 electro-soul、有歌唱）。The Cheers Cheers 的「紹興」查無來源不採。Championxiii facts 7 條（可查資料只有這些），qa 通過，照收。
