# add-20261023-ml32 裁定（情緒薄格策展線・恍惚：拉丁 bolero／慢板浪漫＋ml25 80s 慢板 reggae 歌）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 6 輪，本工作階段負責 ml32、mc28。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml32 列，可擴寫 ml25），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml32.json`（31 張）→ `master-ml32.json`（MB 回查 31/31 釘住）→ 主線汰 0 → `pick.json`（31）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml32-cards.json`（31 張；研究 a–d 各 7、e 3）。身分：MB 釘住 31、§1 人工 0。
> **預留：研究 a 16481–16490、b 16491–16500、c 16501–16510、d 16511–16520、e 16521–16530、鉤子 16531–16540、寫作 16541–16550、主線 16551–16560。**
---

## 主線策展（不佔條號）
- 策展 31 張（主場景 18：Chicano／lowrider sweet soul 復興 7、夢幻／迷幻化 bolero 與拉丁慢板浪漫 7、拉丁 dub 4；擴寫 ml25 80s 類比濕混音 roots 人聲 13）。挖不到 54，照實交、不湊數。
- **主場景見底的原因**：池中拉丁卡 193 張只有 2 張落恍惚（Adrian Quesada《Boleros psicodélicos》I／II）；經典 bolero（Luis Miguel《Romance》、Omara《Flor de Amor》、Los Ángeles Negros 三張）全判輕落放鬆。經典三重唱、吉他小編制、70s 迷幻 bolero 一律不提，只收殘響厚的當代復興盤。
- **主線汰 0**：池中同藝人三軸查核——Bobby Oroza、Kali Uchis、Quesada、Quantic 池中落恍惚；roots 人聲 9 位（Horace Andy、Don Carlos、Junior Delgado、Sugar Minott、Linval Thompson、Wailing Souls、Misty in Roots、Johnny Osbourne）池中多數盤落恍惚（y 0.7–1.3、z 0.4–1.2）。同藝人跨批（ml1／ml5／ml9 已收其他盤）不影響：規則是「同一藝人沒有張數上限」，只去重同一張盤。
- 跨分支去重：對 origin 65 個 `claude/*` 分支與 main 的 seed 與卡單 0 撞。
- 研究層重點查：sweet soul 復興盤的乾淨度（The Altons、Thee Marloes）、Buscabulla／Chancha 的中速曲比重（x）、Don Carlos／Johnny Osbourne《Nightfall》的混音濕度（y）、Junior Delgado 1986 是否數位。

## 研究 e 組（條號 16521–16530）
- 16521：Misty in Roots《Wise and Foolish》moodGuess 存疑——「厚低頻與殘響」查無來源，唯二聲音描述（killyourpetpuppy、Brighton 場地介紹）稱比早期更 mellow／jazzy／soulful，y 可能偏低；status thin，主線聽試聽再判。發行年 Discogs／Wikipedia／MB 為 1981，Apple／roots-archives 為 1982，沿用 1981。
- 16522：Lacksley Castell《Morning Glory》moodGuess 輕度存疑——dub 版是另一張（Sly & Robbie《Dub Rockers Delight》），原盤為人聲版，濕度可能略低；速度與殘響無樂評可引，status thin。死亡年份來源不一（1983／1984），facts 不寫年份。
- 16523：Johnny Osbourne《Nightfall》moodGuess 成立——unitedreggae 與 Apple Music 樂評一致指低音突出、最重、Scientist dub 混音、rub-a-dub 空曠節奏；curatorRisk「y 貼邊」解除。King Tubby's 混音地點為 Discogs 單一來源，facts 標「Discogs 登記」。status full。
- 推翻策展層：0 處（身分、年份、廠牌全數吻合）。

## 研究 d 組（16511–16520）
- **16511** Junior Delgado《Raggamuffin Year》：採 1986（Wikipedia／Discogs；AllMusic 1987 無法開頁）。標 moodGuess 存疑：同名單曲被稱「擁抱牙買加新風格」，Discogs 列 Pablo 合成器與三位鼓手，恐偏數位、非慢類比；facts 不寫推測。
- **16512** Milton Henry《Who Do You Think I Am?》：身分核對無誤（1985、Wackie's LP-2450），無獨立樂評，標 thin；聲音只確認 Wackies lo-fi、基礎軌兩地錄（Wackies／Channel One）。
- **16513** Sugar Minott《Sufferer's Choice》：採 1983（Discogs／Christgau 1983 Heartbeat；Wikipedia 誤列 1988）。節奏軌主要是 Sly & Robbie、僅兩首署名 Roots Radics，moodGuess 輕度存疑。
- **16514** Sugar Minott《Bitter Sweet》：推翻策展層「Studio One riddim」：Discogs 與 Wikipedia Prince Jammy 條顯示是 Prince Jammy 在 King Tubby's 製作混音的 1979 新錄音；製作人待驗已驗。
- **16515** Linval Thompson《Six Babylon》：實為美國 Clocktower Records（CTLP0111）版，Discogs 備註「compiled & edited」於 Bullwackie，Channel One 1979 錄音、Scientist 等混音；性質疑為彙整重混 LP，標 thin，建議主線核實，不列移除。卡單 label 空白實為 Clocktower。
- **16516** Wailing Souls《Stranded》：Discogs 列 Sly Dunbar 電子鼓與 Keith Sterling 合成器，moodGuess 存疑（非純類比 rub-a-dub）。
- **16517** The Viceroys《Brethren and Sistren》：curatorRisk 製作人待驗已驗＝Linval Thompson；伴奏名單來自 Discogs，Wikipedia 未證實 Roots Radics 參與本張。
- 研究 d 組合計推翻策展層 1 處（Bitter Sweet 伴奏性質）、存疑 4 張（Raggamuffin Year、Stranded、Sufferer's Choice、Bitter Sweet 輕度）。

## 研究 a 組（16481–16490）
- **16481** Adrian Quesada《Look At My Soul》：推翻年份——首發 2018-10-26 Nacional 黑膠 10 首（Discogs 主版本、維基、KUTX 一致），卡單 2021 取自 MB 2021-12-10 的 12 首數位擴充版；建議卡片年份改 2018、label 補 Nacional Records。性質為 Quesada 掛名的多位客席致敬專輯。moodGuess 存疑：曲名有 Boogaloo en Monterey、Funky Chick，x 風險高。
- **16482** Thee Marloes《Perak》：moodGuess 明顯存疑——Big Crown 說明為『高能量舞池曲與慢板抒情』來回（Midnight Hotline、Mungkin Saja 偏舞曲，Over 鼓重），編制是銅管長笛顫音琴、無弦樂，印尼語與英語混合，不屬 lowrider 譜系。建議主線優先實聽，必要時汰換。
- **16483** Thee Sacred Souls 兩張：樂評只說類比、有機（首作）與類比錄音室、陽光明亮（第二張），無一提殘響厚；y 預估偏濕查無來源，磁帶僅 Jambands 一篇指『類比錄音室』。首作 8/26（MB、Grammy）vs 維基正文 8/27，採 8/26。
- **16484** Bobby Oroza《Get on the Otherside》：2SER 稱『open analogue sound，鼓質地分明』，與預估『糊、殘響深』不符，標存疑；MB 數位 2022-06-10、LP 2022-08-26（deejay.de），年份 2022 不變。樂手名單與『reverb-drenched』只見單一搜尋摘要，未入 facts。
- **16485** Thee Sinseers & Joey Quinones《Sinseerly Yours》：署名實為 Thee Sinseers（Quiñones 為團長兼製作人），不是外部合作；首張全長成立；Bandcamp『Colemine 2023』與 2024 衝突，採 MB／Discogs 2024-03-22。錄於 Rialto 的 Second Hand Sounds（前牙醫診所），現場合奏為主；殘響與速度查無來源，標存疑。
- **16486** The Altons《Heartache in Room 14》：Discogs 登記 Bosco Mann 製作編曲並混音、含 Tape Op；樂評稱『安靜親密中速』『crisp, modern production』，y 風險（策展層已預警）成立一半——磁帶有，濕糊無。Joey Quiñones 同時在 Altons 專輯名單中。
- WebSearch 實際用了 6 次（超出每支 3 次：Sinseers／Altons 的維基與廠牌頁全 404，DuckDuckGo 驗證擋住，只能補搜）；其餘走 MB／Discogs API 與 WebFetch。
- 研究 a 組合計推翻策展層 2 處（Quesada 年份與廠牌、Sinseers 署名性質）、存疑 7 張全列（Marloes 偏高，其餘中度或輕度）。

## 研究 c 組（16501–16510）
- **16501** Chancha Vía Circuito《Amansará》：訪談證實比前兩張慢、真樂器重錄（採樣無法清授權）、叢林錄音；但 Wonderwheel 文案有『pounding drums』『deep dancefloor』，中段曲 x 可能到 2.5–3.2。查無殘響／類比來源，y 的濕度屬未證實，製作環境是數位（錄音機＋電腦）。
- **16502** Chancha《Río Arriba》：Sounds and Colours 實證平均約 80 BPM、無常規打擊樂、『hypnotic』，curatorRisk（cumbia 拍判躁）風險低。殘響／低頻厚度無來源，標 uncertain。性質：11 首中 4 首為他人作品重混（維基另有 Río Arriba Mixtape 條目），MB 為 Album，保留；黑膠 2011 年 3 月才出（S&C），卡年 2010 沿用。
- **16503** Quantic presenta Flowering Inferno《Dog With a Rope》：moodGuess 明顯存疑——BBC 實證是真樂手（UB40／Steel Pulse 鼓手 Conrad Kelly）rocksteady／rumba／cumbia 擺盪、銅管清脆、直立貝斯，刻意做成 1974 前的暖乾老錄音；殘響與延遲只在 dub 版出現，不是整張的厚低頻回聲。x 可能近 3.0，建議主線實聽；z 暖度成立。錄音：Cali Sonido del Valle，銅管在巴拿馬 Panavox（Discogs LP 註記）。維基寫 2009、Discogs／Apple／MB 為 2010，採 2010。
- **16504** Quantic presenta Flowering Inferno《Death of the Revolution》：標 thin。找不到獨立樂評（AllMusic、RA 403，Tru Thoughts／Bandcamp 404），只確認 Cali 錄、Holland 一人掛滿多種樂器、有 dub／version 曲、Westbound Train 為翻玩。x、y 皆未證實，建議汰換優先序列後段。維基稱首作 self-titled 屬誤。
- **16505** Horace Andy《Exclusively》：與池中《Dance Hall Style》同源——Wackie's（Bronx）錄音，Lloyd Barnes 製作；維基說兩者是同張，Discogs 分開（DHS 7 首、Exclusively 10 首，共同 3 首）。我不列建議移除，但交主線決定是否留。聲音只證實 lo-fi，Bronx 小室；殘響／低頻厚度無來源。
- **16506** Don Carlos《Harvest Time》：卡單 label 空，應補 Negus Roots（NERLP 005）。moodGuess 存疑——Discogs 演奏者欄是 Sly Dunbar／Robbie Shakespeare／Lloyd Parks 等 Tuff Gong＋Channel One 班底，兩位鼓手都記 Electric Drums，另有合成器，非 Roots Radics 慢 rub-a-dub，可能偏亮偏推進。查無樂評，標 thin。
- **16507** Don Carlos & Gold《Them Never Know Natty Dread Have Him Credential》：最有支撐的一張（Roots Radics、Scientist 混音、Channel One、1985 前非數位）。維基記 1981 Channel One，Discogs／MB 為 1982 Hit Bound 美版，年份保守沿用 1982。Gold 身分查無來源，未展開。
- WebSearch 用了 3 次（Amansará、Río Arriba、Dog With a Rope 各一）；其餘走 MB／Discogs API 與 WebFetch，另用 curl 抓 BBC 樂評頁。
- 研究 c 組合計推翻策展層 1 處（Harvest Time 廠牌空白與伴奏性質）、moodGuess 存疑 5 張（Dog With a Rope 明顯、Harvest Time 明顯、Death of the Revolution、Exclusively、Amansará 輕度）。

## 研究 b 組（16491–16500）
- **16491** Chicano Batman《Cycles of Existential Rhyme》：moodGuess 明顯存疑——14 首短曲（6 首不到 2:30）、放克／cumbia 輕快換場、Martinez 說「沒有長獨奏、全部寫定」；全數位錄音（Arévalo 訪談）、風琴是 70 年代 Yamaha 而非 Farfisa；沒有任何來源提厚殘響或 fuzz。慢歌只有〈She Lives On My Block〉。建議汰換或降備選。廠牌自家 El Relleno（NBC 單一來源）。
- **16492** iLe《iLevitable》：x 存疑——NPR 稱 mid-tempo，mambo／boogaloo 並列，〈Te Quiero Con Bugalú〉有律動。『厚弦樂、濕殘響』只有 Vanguardia 提 60 年代式 reverb，無濕度證據。Grammy（2017.2）與拉丁 Grammy 新人提名皆有來源。
- **16493** Kali Uchis《Sin miedo》：moodGuess 存疑——13 首短曲（約 34 分），三首明確 reggaeton／dembow（Aquí Yo Mando、Te Pongo Mal、La Luz），多評論稱 bedroom pop／down-tempo；x 可能 3 上下。榜位來源互相矛盾，facts 只採 Billboard 200 第 52（維基單一來源）。
- **16494** Carla Morrison《Amor supremo》：最符合恍惚的一張——13 首平均近 5 分鐘、合成器氛圍加管樂、吉他退位。殘響濕度無直接來源。維基長度自相矛盾（57:33 對 62:48），寫約 62 分鐘。
- **16495** Carla Morrison《El renacimiento》：標 thin。Apple Music 說已離開 indie、走向主流現代流行，Discogs 黑膠版五位混音（含 Jaycen Joshua），curatorRisk『製作較亮』偏向成立，無殘響／速度描述。建議汰換。卡單 label 空白，建議填 Cosmica（Apple 寫 5020 Records 發行）。
- **16496** Buscabulla《Regresa》：moodGuess 明顯存疑——NME『slick grooves』『house 味』、Paper『Brooklyn 舞曲、salsa 夜店』、〈Ta Que Tiembla〉沉重踏步鼓；31 分鐘 11 首短曲，x 很可能超 3.0。NME 稱有同名曲，曲目無，NME 有誤，未採。
- **16497** Buscabulla《Se amaba así》：標 thin（7 條）。唯一聲音描述（Apple Music）寫 thumping drums、funky bassline，與慢板預估不符。廠牌衝突：Bandcamp／Apple 為 Domino，Discogs 為自行發行，卡單寫 Ribbon，建議改 Domino。
- WebSearch 本組用了 3 次（Chicano Batman、iLe、Kali Uchis 各一）；其餘走 MB／Discogs API、WebFetch。Wikipedia API 一度 429，改以間隔重試。Pitchfork／AllMusic／NYT 一律抓取失敗，評語數字多為維基轉述。
- 研究 b 組合計：推翻策展層 0 處（身分、年份均吻合，僅 Se amaba así 廠牌與 Chicano Batman 風琴型號與 moodGuess 描述不符）；moodGuess 存疑 6 張（Chicano Batman、iLe、Kali Uchis、El renacimiento、Regresa、Se amaba así），僅 Amor supremo 大致可信。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 15 張**（研究層聲音反證；恍惚線最怕乾淨／推進，存疑一律汰，不硬留）：
  - 乾、亮或推進（y／x 風險）：Thee Marloes《Perak》（舞池曲與慢歌來回、無弦樂）、Adrian Quesada《Look At My Soul》（boogaloo／funk 致敬盤，首發實為 2018 Nacional）、The Altons《Heartache in Room 14》（crisp modern production）、Chicano Batman《Cycles of Existential Rhyme》（全數位、短曲 funk／cumbia 輕快）、iLe《iLevitable》（中速 mambo／boogaloo）、Carla Morrison《El renacimiento》（主流現代流行製作）、Buscabulla《Regresa》《Se amaba así》（slick grooves、house 味、thumping drums）。
  - 刻意乾的復古錄音：Quantic presenta Flowering Inferno《Dog With a Rope》（1974 前式暖而乾、殘響只在 dub 版）、《Death of the Revolution》（同計畫同手法、聲音無來源，一併汰）。
  - 80s 中後期電子鼓／合成器：Don Carlos《Harvest Time》（Tuff Gong／Channel One 班底電子鼓＋合成器）、Junior Delgado《Raggamuffin Year》（新風格、Pablo 合成器）、Wailing Souls《Stranded》（Sly 電子鼓、合成器；池中同人 x 已 2.7–2.9 貼邊）。
  - 身分與聲音雙疑：Linval Thompson《Six Babylon》（Clocktower 美版，Bullwackie「compiled & edited」、跨三間錄音室混音，近彙整重混）、Misty in Roots《Wise and Foolish》（來源只說 mellow、jazzy，無厚低頻證據）。
- **留下的存疑張**：Kali Uchis《Sin miedo》（3 首 dembow；池中同人《Red Moon in Venus》落恍惚 y 1.0，評分看實測）、Bobby Oroza（open analogue sound；池中《This Love》落恍惚）、Thee Sacred Souls ×2（類比、明亮，無厚殘響來源）、Horace Andy《Exclusively》（與池中《Dance Hall Style》共 3 首，但 MB／Discogs 是兩張不同 LP，保留）。
- 不補位：策展層已回報主場景見底、擴寫場景 ml25 剩下的是無封面無樂評薄盤。
- 定案 **16 張**（a 4、b 2、c 4、d 4、e 2）。汰除卡存 `dropped-cards.json`，研究稿條目移出研究檔。研究 qa-batch 全過。

## 鉤子層（d、e）（16536–16540）
- **16536** 交件：`desc-tools/batches/hooks/add-20261023-ml32-hooks-d.json`（4）、`-hooks-e.json`（2），key 逐字照研究稿。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權／hook 原始字元）：Who Do You Think I Am? 158／25／25（thin 上限 170）、Sufferer's Choice 229／22.5／28、Bitter Sweet 228／17／17、Brethren and Sistren 222／19.5／22、Morning Glory 166／19.5／26（thin）、Nightfall 228／19／19。初稿全數超標（最高 358），整格捨去：Milton Henry 和聲陣容（Max Romeo、Sugar Minott）；Sufferer's 倫敦錄的 B2、牙買加 Black Roots 原版、「唱得更好」；Bitter Sweet 曲目題材與 Chinna Smith、號手；Viceroys《We Must Unite》、合唱兩人；Castell 1979 單曲榜位、Channel One／Tuff Gong 錄音、早逝（thin 預算放不下，招牌事實改由寫作層看 facts 自行斟酌是否一句帶過——主線審稿請留意）；Osbourne 三首加長版與重發名。壓完逐張回核 hook 依賴格全在 g1。
- **16537** 骨架歸屬（6 張 6 條，只在擁有者 note 寫歸屬句）：Who Do You Think I Am?＝基礎軌跨海兩地錄、疊錄收回布朗克斯；Sufferer's Choice＝與四年前舊作對聽、見證雷鬼在變；Bitter Sweet＝封底副標牙買加版／英國版一字之差；Brethren and Sistren＝老和聲團壓軸曲與早年單曲同名；Morning Glory＝街區出身（Waterhouse、Black Uhuru 同鄉）＋好友引路的個人首張；Nightfall＝換製作人後最重、低音當主角的一張。Horace Andy《Exclusively》（c 組）的「同批錄音兩版流通」刻意不在 d／e 出現，Castell 的人聲版／dub 版分張只放第三格一句、不當骨架。
- **16538** hook 四型：場景（Milton Henry、Viceroys）／斷言（Sufferer's、Nightfall）／懸疑（Bitter Sweet，g1 收尾）／人物定調（Morning Glory）。開頭前四字 6 張互異；對已上架 ml／mc／md 與 c 線 hook 掃描後改掉三處（Viceroys 原「收尾那首」與 ml3 同開頭、Nightfall 原「推到最前面」撞 ml11、Bitter Sweet 原「到了英國」撞 ml1）。避開池中既有 roots 卡已用的開頭：Tony Tuff「四位貝斯手配四位鼓手」（故 Bitter Sweet 不用雙鼓雙貝斯當 hook）、Barrington Levy「盤名兩種拼法」（故 Bitter Sweet 寫副標不寫盤名）、Wackies Rhythm Force「布朗克斯這間錄音室」、Osbourne《Folly Ranking》多倫多身世與《Fally Lover》Dancehall Godfather。
- **16539** 「他」引入法與第二句句型配表：Sugar Minott 跨兩張分軸——Sufferer's 帶生平與節奏班底，第二句「製作欄的 Lincoln Minott 就是 Sugar Minott 本人」（掛名欄＋「就是」）；Bitter Sweet 帶錄音與混音，第二句「在 Studio One 當過歌手與吉他手的 Sugar Minott」（身分＋「在…的」）。其餘：Milton Henry「是」句（出身＋移居年）、Viceroys「這支…叫」、Castell 生年領句、Osbourne 本名領句。六張開頭兩句皆交代牙買加／金斯敦與 reggae。樂評兩處（Sufferer's 對照、Nightfall「最重」）一律寫成樂評的觀察、不具名媒體與評分（Christgau 的 B+ 不指派）。日期全批 d／e 只寫到年，無「日」後字。
- **16540** 自查：hook 之間中文 4-gram 0（專名「布朗克斯」對 ml9／c57 屬地名不計）；hook 與 note 無逐字重複句；note 無否定指派句、無 uncertain 格（Osbourne 的 King Tubby's 混音地點、Castell 死亡年份皆未進 note）。`node qa-batch.mjs hooks add-20261023-ml32`：d／e 無標記（只報 a、b、c 缺檔）；`node chk-hook-crossgroup.mjs add-20261023-ml32`（僅 d／e 6 張）全部通過，hook 加權 17–25、note 158–237。

## 鉤子層（a、b、c）（16531–16535）
- **16531** 交件：`desc-tools/batches/hooks/add-20261023-ml32-hooks-a.json`（4）、`-hooks-b.json`（2）、`-hooks-c.json`（4），key 逐字、順序同研究稿；10 張研究稿皆 full，上限 230。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（預算／hook 加權／hook 原始字元）：Thee Sacred Souls 228／19／28｜Got a Story to Tell 220／15／15｜Get on the Otherside 215／16／16｜Sinseerly Yours 228／15／15｜Sin miedo 215／21.5／28｜Amor supremo 217／19／19｜Amansará 224／18／18｜Río Arriba 199／21／21｜Exclusively 223／21.5／26｜Them Never Know… 224／25／25。初稿全數超標（246–385），整格捨去：Sacred Souls 的 Roth 留空檔寫歌、Bosco Mann 化名、Fullerton 演出、樂評「類比」；Got a Story 的〈Waiting on the Right Time〉曲名（改「先行曲之一」）、迷幻、Curtis Mayfield 比較；Oroza 的 Timmion、移民街區、純伴奏版；Sinseers 的五年磨聲、1960 年代流行樂、曲數曲長；Kali 的 García Márquez 盤名、三地錄音、〈Telepatía〉TikTok 爆紅；Morrison 的 Jiménez 兄弟共製、Tecate 舊樂團「回到根」、〈Vez Primera〉獎項；Amansará 的 Lido Pimienta、ZZK 只做數位（ZZK 改歸 Río Arriba）；Río Arriba 的 Leda Valladares／Bolivia Manta 採樣、黑膠隔年；Exclusively 的 Bunny Lee、詞曲欄、2005 重發；Don Carlos 的 Flabba／Style Scott 人名、Eradication Squad、16 軌、Hit Bound 美版。壓完回核 hook 依賴格：demo＋Roth（g1／g2）、編制擴大（g2，補「編制比首作更鋪排」）、營建工（g2）、改建錄音室（g2）、開場翻唱（g2）、巡演後放下吉他（g2）、授權卡關改真樂器（g2）、無常規打擊樂（g2）、Wackie's 紐約製作（g2）、Sleng Teng 時序（g2）皆在。
- **16532** 骨架歸屬（10 張 10 條，只在擁有者 note 寫歸屬句；與 d／e 16537 六條不重）：Thee Sacred Souls＝社群貼 demo 被廠牌老闆發掘；Got a Story to Tell＝第二張擴編（弦樂銅管康加進類比錄音室）；Get on the Otherside＝疫情停擺去做工、歌轉向謙卑；Sinseerly Yours＝特殊錄音空間（牙醫診所改建）裡的現場合奏首張；Sin miedo＝開場翻唱古巴老 bolero（向前輩借曲）；Amor supremo＝長巡演後隱居、原聲吉他換合成器；Amansará＝採樣授權卡關、改用真樂器重錄；Río Arriba＝鼓全由採樣拼成的慢速 cumbia；Exclusively＝同源錄音英國另編曲目（與池中 c57《Dance Hall Style》的布朗克斯小錄音室／資金克難軸刻意分開，那條軸本卡不帶）；Them Never Know…＝數位 riddim 前夜的真人班底。hook 四型：懸疑（Sin miedo、Exclusively）／斷言（Got a Story、Amansará、Río Arriba、Them Never Know）／場景（Sacred Souls、Sinseerly Yours）／人物定調（Otherside、Amor supremo）。開頭前四字 16 張互異；對 add-2026102x 既有 hooks 掃描改掉三處（「廠牌老闆」撞 ts5、「多了弦樂」撞 ml24、「房間從前」「原本是一」撞 md6）。
- **16533** 同藝人分軸與「他／她／他們」引入法：Thee Sacred Souls 兩張——同名首作帶成團與發掘（城市＋三人編制領句、只具名 Garcia 與 Roth），《Got a Story to Tell》帶錄音與編制（三位成員＋樂器領句、Roth 以製作人身分出現）；Chancha 兩張——Amansará 帶身分（化名領句「以 Chancha Vía Circuito 為名的阿根廷製作人 Pedro Canale」）與授權重錄，Río Arriba 帶廠牌與聲音（ZZK 廠牌領句，Canale 在 g2 以「化名背後的」引入）。第二句句型配表：城市＋編制／成員＋樂器／學吉他來歷（Oroza；避開 ml5《This Love》已上架的「住在赫爾辛基，唱靈魂樂」）／團長名字（Sinseers）／專輯序數＋語言（Kali；避開 ml5《Red Moon》的「哥倫比亞裔歌手」）／國籍唱作身分＋生年出生地（Morrison）／化名（Amansará）／廠牌（Río Arriba）／「本名 X 的」（Horace Andy；d／e Osbourne 是「X 本名 Y」，前四字不撞）／所屬團體＋創團身分（Don Carlos；避開 ml1 已上架的「離開 Black Uhuru 之後單飛」）。hook 只帶代稱的（Oroza「他」、Morrison「她」、Amansará「他」）與無主詞的六張，note 第二句全數指派身分與樂種。
- **16534** 日期「日」後一字配死（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Sacred Souls 由、Got a Story 問、Otherside 先（數位首發日，LP 晚兩個多月不寫）、Sinseers 在、Sin miedo 交、Amor supremo 以、Amansará 上、Río Arriba 首；Exclusively、Don Carlos 只寫年（後者照研究 16507 寫 1982）；d／e 全只寫到年，全批無撞。媒體名與媒體榜單名次一律不進 note：Clash、Pitchfork、AllMusic、NME、NPR Alt.Latino、Club Fonograma、Billboard 各榜與分數全不指派，樂評一律寫「樂評說／樂評算出」。研究層 uncertain 格（各盤殘響濕度、Sinseers 速度、Exclusively 與 Dance Hall Style 是否同張）整格不進 note；Kali「1964 年古巴四重唱」由 hook 承載、note 只寫 Los Zafiros。Don Carlos 的 Sleng Teng 屬晚於發行的背景事件，note 標時序；Gold 身分無來源，只寫合掛名。
- **16535** 自查：hook 之間中文 4-gram 0；我方 hook 對全批 note 0；hook 與自卡 note 逐字重複 0（Don Carlos 原「第一個數位雷鬼節奏」hook／note 重複，note 改「數位 riddim 的起點」）；note×note 只剩地名「聖地牙哥」（同團兩張）、「玻利維亞」，途中拆掉「的第二張」×3、「發行的第」「張由發行」「的錄音室」「年英國發行」（撞 d 組 Viceroys）、「在金斯敦」「錄音混音」（撞 d／e Sufferer's、Castell、Nightfall）。`node qa-batch.mjs hooks add-20261023-ml32` 全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml32` ✓ 全部通過（5 組 16 張，hook 加權 15–25、note 158–240）。輔助腳本在 scratchpad `hook-ml32-abc/`（ml32abc-gen.mjs、ml32abc-ngram.mjs）。
