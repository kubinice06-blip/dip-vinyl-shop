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

## 鉤子層（a–e）（41551–41560）
- **41551** 交件：`desc-tools/batches/hooks/add-20261030-sf06-hooks-{a,b,c,d,e}.json`（各 4，共 20；key 逐字複製研究稿、順序不變）。`qa-batch hooks` 全部通過、`chk-hook-crossgroup` 全部通過（hook 加權 16–30、note 141–233）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170。
- **41552** 逐筆預算（預算／hook 加權／hook 原始字元）：a1 劉以達 thin 135／19／19；a2 雞蛋蒸肉餅 202／24／24；a3 張亞東 thin 162／26／26；a4 AB'S 228／23／23；b1 Everfor thin 158／25.5／27；b2 Kaishandao 220／23.5／28；b3 亂彈阿翔 thin 147／30／30；b4 盧家齊 224／21／27；c1 Shaa Khan 217／22／22；c2 The Cheers Cheers thin 169／24／26；c3 Fishdoll 226／19／19；c4 Juggaknots 211／23.5／28；d1 Glen Check 225／27／27；d2 강태환 216／19.5／21；d3 Superstar Quamallah 228／22／26；d4 7FO 227／25／25；e1 Monique Chao 227／28／28；e2 JUU4E 223／20.5／23；e3 dotzio thin 154／16／16；e4 Championxiii thin 169／18.5／21。初稿 13 張超標（b1、b2、c1–c4、d1–d4、e1、e3、e4；a 組無），一律整格捨去：Everfor B 面曲、Kaishandao 祖父母封面照、Shaa Khan 翻唱起家與吉他手名、Cheers 廠牌自稱與拉丁名、Fishdoll Drew Hart 貝斯、Juggaknots 銅管取樣與 MF DOOM 廠牌關係與 A／B 面名、Glen Check 一個曲名、강태환 最長曲時長、Quamallah 西岸合作與靈感年代、7FO See 系列合作說明與總長、Monique 編制細數與〈Whale Fall〉、dotzio 致謝合奏、Championxiii 曲長與開場位置。壓完逐張回核 hook 依賴：張亞東「隔年」補回王菲 1999《只愛陌生人》一格；其餘 hook 依賴格皆仍在 note 或研究稿 g1。
- **41553** 骨架歸屬（20 張 20 條，各張 note 只寫「這條骨架全批只走本張」）：劉以達＝發片派對上宣布搭檔樂隊復合；雞蛋蒸肉餅＝首支入圍金曲最佳樂團的香港樂隊；張亞東＝自己的曲名先成了別人的專輯名；AB'S＝雙吉他對決＋英語主唱；Everfor＝單曲先壓 7 吋再收進專輯；Kaishandao＝青年旅館房間當錄音室；亂彈阿翔＝主題曲選集拿下歌手獎；盧家齊＝限量雙卡帶作品集；Shaa Khan＝鼓手包辦作曲；The Cheers Cheers＝玩笑廠牌（CD 附桌遊）；Fishdoll＝城市日常寫進曲名；Juggaknots＝手足組成的嘻哈團；Glen Check＝出國參考街頭打擊再回家錄；강태환＝一人一把薩克斯風的雙 CD 獨奏；Superstar Quamallah＝父子兩代（靈魂風琴→饒舌）；7FO＝展覽作品、只在展場販售；Monique Chao＝動畫典故入曲；JUU4E＝跨國翻唱（泰國 trap 翻鄧麗君）；dotzio＝人生最初幾首歌；Championxiii＝社群片段擴寫成歌。「首張即代表作」本批無人擁有：hook 一律不寫「首張」，note 只在 Shaa Khan（第一張 LP）、雞蛋蒸肉餅（頭一張正規專輯）、JUU4E（EM 第二張）各留一格、字面錯開。
- **41554** hook 四型：懸疑（張亞東、Monique Chao、Championxiii、dotzio）／斷言（雞蛋蒸肉餅、亂彈阿翔、JUU4E、Shaa Khan、Everfor）／場景（劉以達、Kaishandao、盧家齊、The Cheers Cheers、Glen Check、7FO）／人物定調（AB'S 聲音定調、Fishdoll、Juggaknots、강태환、Superstar Quamallah）。開頭前四字 20 張互異，也與 sf05／sf07／sf08／sf09 已交 hook 開頭互異（AB'S 初稿「兩把吉他」撞 sf09-b，改「雙吉他對決」；Kaishandao 初稿「的錄音室」撞 sf01 正文、「錄音的地方」撞 sf08 hook，改「被她拿來錄這張 EP」）。
- **41555** 第二句句型配表（逐張一種，讓不懂的人知道哪裡人、什麼樂種）：劉以達＝搭檔領句（香港二人組達明一派的結他手兼作曲）；雞蛋蒸肉餅＝編制領句（四個女生、2012 香港、數學搖滾加民謠）；張亞東＝生年領句（1969 山西天鎮）；AB'S＝成軍年領句（1982 日本樂團、團名由來）；Everfor＝藝名領句（台灣創作者蘇偉安、city pop）；Kaishandao＝器材領句（威靈頓出生、落腳成都、breaks／techno）；亂彈阿翔＝舊團領句（宜蘭工專組的搖滾樂團亂彈）；盧家齊＝團體名領句（台灣 drone metal／krautrock 二人組破地獄）；Shaa Khan＝地名領句（魯爾區杜伊斯堡、Gentle Rock 前衛搖滾）；The Cheers Cheers＝主業領句（City Flanker 主唱王小宇、jangle pop／C86）；Fishdoll＝廠牌形容領句（外人之口：電子靈魂樂）；Juggaknots＝團體身分領句（紐約嘻哈、Smith 家手足）；Glen Check＝參照樂團領句（首爾合成流行雙人組）；강태환＝年齡領句（67 歲、韓國自由爵士）；Quamallah＝本名領句（布魯克林出生、加州）；7FO＝讀音領句（nana-f-o、大阪、dub／ambient）；Monique Chao＝出身領句（生於台灣、定居米蘭、18 人大樂團）；JUU4E＝廠牌領句（大阪 EM Records、泰國饒舌手）；dotzio＝自述領句；Championxiii＝影片系列領句（美國饒舌歌手）。「饒舌手兼製作人」初稿三張撞 4-gram，改成 Quamallah「饒舌手、DJ、製作人」、Championxiii「饒舌歌手」、JUU4E 保留。
- **41556** 「他／她」引入法：本批無同一藝人跨兩張，不需分軸。代詞配定：Kaishandao、Fishdoll、Monique Chao 用「她」（研究稿 facts 用她）；dotzio 性別未知，note 指派「全文不用性別代詞」；其餘用「他／他們」。
- **41557** 日期「日」後一字逐張配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：劉以達 日，（「1996 年 1 月 29 日，主角是…」）、雞蛋蒸肉餅 日港、AB'S 日出、Everfor 日數、Fishdoll 日經、Glen Check 日推、강태환 日首、JUU4E 日發、Championxiii 日由；Monique Chao 日在（「12、13 日在」形，尺外，全批唯一）；其餘十張只寫到月或年。
- **41558** 媒體與 thin 處理：媒體名與媒體榜單名次全部不進 note（Glen Check 的 IZM／Weiv 評語、Fishdoll 引述的 Indie Current、Juggaknots 的三家樂評名、Quamallah 的 Gilles Peterson 年度節目、雞蛋蒸肉餅的香港樂評年度樂團皆不派；樂評描述的聲音只取事實不具名）。thin 七張（劉以達、張亞東、Everfor、亂彈阿翔、The Cheers Cheers、dotzio、Championxiii）照研究稿標 thin 捨格：聲音無來源者不派聲音格（劉以達、張亞東、亂彈阿翔），〈繾綣28800BPS〉只寫曲名、不寫「數據機速率」詮釋（研究稿 sound 欄推論，不在 facts）。dotzio 地點無直接來源（台灣只由 Discogs 另一張 EP 登錄國別間接支持），第二句改交代「中文寫詞、lo-fi 獨立流行」，不寫台灣；Hsuan Chang 的漢字「張軒」未派。Superstar Quamallah 的「柏克萊教授」時序不明，只寫「長時間不錄音、在高中教書」（一句）。亂彈阿翔照主線 41571 寫成主題曲選集。
- **41559** 時序與逝者：Quamallah 2024 Be With 首度黑膠標「標時序」（作品流傳）；Monique Chao 末曲致敬 Chester Bennington 標「口氣克制」。
- **41560** n-gram 自查（中文 4-gram，ASCII 與標點切斷）：hook↔hook 0 條；hook↔他張 note 0 條；note↔note（剝掉指派句與「第二句以…：」領句標籤）0 條；hook↔自張 note 只剩專名「達明一派」「只愛陌生人」與樂器「薩克斯風」（無逐字重複句）；對 sf05／sf07／sf08／sf09 hook 與 sf01–sf09 已出 out 檔頭兩句只剩樂器名「薩克斯風／中音薩克斯」。兩支腳本：`node qa-batch.mjs hooks add-20261030-sf06` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261030-sf06` ✓ 全部通過。

## 寫作層（writer-1）（41561–41565）
- **41561** 交件：`desc-tools/batches/output/add-20261030-sf06-out-1.json` 10 張（full 5：雞蛋蒸肉餅 221、AB'S 231、Kaishandao 239、盧家齊 227、Shaa Khan 224；thin 5：劉以達 130、張亞東 173、Everfor 154、亂彈阿翔 156、The Cheers Cheers 175）。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（0）皆通過。初稿無超標；Kaishandao 拆同構時改長到 242，刪「裡的」「上」兩處虛字回 239。
- **41562** 第二句領句全照 41555 指派；日期「日」後一字照 41557（劉以達 日，、雞蛋蒸肉餅 日港、AB'S 日出、Everfor 日數），其餘只寫到月或年，日期前一字逐張錯開（辦在／同年／底，／同年 8 月，／，2020／分鐘上下前的「首」等）。
- **41563** 台灣正體：note 的「結他」「樂隊」正文改寫「吉他」「樂團」（hook 原文「香港樂隊」不動）；盧家齊盤名照台灣正體寫《Circle = 圓》（卡單 album 欄為簡體「圆」，key 不動）。藝人名照卡單：亂彈阿翔、張亞東、劉以達。
- **41564** 否定句轉正：雞蛋蒸肉餅 note「入圍未得獎」寫成「最後停在入圍」；盧家齊 note「唱片說明形容」去掉轉述引導，改成「聲音是⋯，被歸為⋯」被動句。Shaa Khan 第二句走地名領句，hook 的「鼓手」在第三句具名 Walter Kaulhausen。
- **41565** 自掃 han() 4-gram：本檔內跨張 0 條（拆掉「首約分鐘」「發行共首」）；對 out-2 拆掉「自己製作」「個人專輯」「之外還有」三條，合掃 out-1↔out-2 0 條（out-2 檔內另有「長約分鐘」「的這張是」「人的計畫」各 2 張，屬 writer-2）。對 sf01–sf09 已出 out 檔另拆「年月替他」「長約分鐘」；剩「年月日出」（41557 指派）、「第屆金曲」「前衛搖滾」等通用樂種／獎名殘片未動。

## 寫作層（writer-2）（41566–41570）
- **41566** 交件：`desc-tools/batches/output/add-20261030-sf06-out-2.json` 10 張（full 8：Fishdoll 227、Juggaknots 216、Glen Check 238、강태환 223、Superstar Quamallah 239、7FO 239、Monique Chao 225、JUU4E 226；thin 2：dotzio 141、Championxiii 180）。`qa-batch out`、`qa-check-research`、`fix-spacing` 皆 0 處；「據」字 grep 0。初稿僅 Quamallah 243、Championxiii 182 兩張出界，逐格壓回（Quamallah 刪「直到…它才」語助、併句；Championxiii 刪「聽得出」改回 note 原意「受…影響」）。
- **41567** 第二句領句全照 41555；日期「日」後一字照 41557（Fishdoll 日經、강태환 日首、JUU4E 日發、Championxiii 日由、Monique「12、13 日在」），**例外 Glen Check 改「日把」**：「日推出／月日推」跨 sf01–sf09 已 7 張，改成「Glen Check 2012 年 2 月 28 日把它推向市面」，本批內唯一，可逆。其餘四張只寫到年月（7FO「那批黑膠 2016 年 10 月開賣」、Monique「2024 年 9 月出版」、Quamallah「2009 年的發行方是」、dotzio「2018 年 8 月放上」）。
- **41568** 自掃 han() 4-gram（含 out-1 與 sf01–sf09 已交 out）：本批跨張 2 次以上 0 條（拆掉對 out-1 的「之外還有」「自己製作」「個人專輯」「個人名義」「其中一首」與本檔內「人的計畫」「的這張是」「長約分鐘」「計約分鐘」）；跨批 3 次以上只剩樂器名「薩克斯風」、41557 指派的日期尾巴（年月日經／發／由／在）與 note 指派詞「兼製作人」「獨立流行」。
- **41569** 用語：JUU4E note「解說稱它反對…自我東方主義」去掉轉述詞，寫成陳述「取向是反對…」；note「在該廠牌的第二張個人專輯」改「為該廠牌錄的第二張個人盤」（避開對 out-1 張亞東「個人專輯」）；dotzio 的「按自述」寫成「dotzio 自述」、全文無性別代詞；「Bandcamp」作為發行管道照 note 保留（非來源平台引用），主線可改「放上網路」。
- **41570** Monique Chao 錄音句補主詞「樂團」並刪第二個「義大利」（第二句已寫在義大利創立）；Chester Bennington 只寫「最後一首獻給」，口氣克制。媒體名與榜單名次 0 處。

## 主線審稿（2026-10-30，雲端主線，20 張）
- 41575：逐張讀全文、對回研究稿與 note，**逐張審過，未改字**。抽查兩處單源事實：雞蛋蒸肉餅「首隊入圍金曲獎最佳樂團的香港樂隊」——主線讀中文維基原文（2017 年 5 月第 28 屆入圍，「成為首隊入圍該獎項的香港樂隊」）屬實；盧家齊為破地獄（Scattered Purgatory）核心成員——研究 b 組有 Discogs／廠牌兩源。dotzio「放上 Bandcamp」是發行管道、非來源平台，放行。張亞東 key 內盤名、盧家齊 album 欄保留官方「圆」字，正文寫《Circle = 圓》。
- `qa-batch out` 通過、`qa-check-research` 兩檔 0、`fix-spacing` 待補 0；媒體名、媒體榜單名次、「據說／據傳」grep 0。
