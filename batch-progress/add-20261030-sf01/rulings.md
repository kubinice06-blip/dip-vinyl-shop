# add-20261030-sf01 裁定（店主 Spotify 追蹤藝人補卡池・favoriteAlbums 38 張指定盤）

> 店主 2026-10-30 `/dip-card-create`：先上 Spotify 收藏專輯中藝人不在卡池的 38 張，**指定盤就是那張**。交接 `batch-progress/spotify-follow-20261030/PLAN.md`；流程沿用 `batch-progress/HANDOFF-mood-cells-line.md` §二（不做 moodGuess 邊距檢查，情緒評分照 `batch-progress/mood-axes/RULES.md`、不算落格率）。本工作階段負責 sf01、sf02。
> 策展：`curation-sf01a.json`（索引 0–18：收 18、不收 1）＋`curation-sf01b.json`（索引 19–37：收 18、跳過 1）→ 主線改 3（`master-override-sf01asf01b.json`）→ `master-sf01asf01b.json`（MB 釘住 28、§1 人工 8）→ `pick.json`（36）→ `build-cards.mjs`，再依 `release-types.json` 改 release type／例外欄、補古典作曲家欄、人工身分 `mbAbsenceProof` 改成驗證器格式（直接改卡單，**不要重跑 build-cards**）。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf01-cards.json`（36 張；研究 a–d 各 8、e 4）。
> **預留：研究 a 30101–30110、b 30111–30120、c 30121–30130、d 30131–30140、e 30141–30150、鉤子 30151–30160、寫作 30161–30170、主線 30171–30180。**（spotify-follow 線條號＝30000＋批號×100。）
---

## 主線策展（不佔條號）
- **sf01 去重以「這張盤」為單位**（指定盤；藝人已在池照收）：38 張中**跳過 1**（椎名林檎《無罪モラトリアム》池中已有同盤）、**不收 1**（Vayda《Dont Lose The Groove》：MB、Discogs、iTunes 皆查無此盤，只見 SoundCloud 同名單曲，無封面來源）→ 收 36。主線對 origin/main 與 146 條 `claude/*` 分支的 seed 與 10-30 卡單再跑盤層去重：0 撞（藝人層命中 Ghostface Killah、Albert Mangelsdorff、Richie Beirach、John McLaughlin、İdil Biret、椎名林檎、陳奕迅皆為同人他盤，照收）。
- 身分還原：
  - 古典照池中慣例掛演奏者：Spotify「Frédéric Chopin｜Chopin: Etudes, Op. 10…」＝**Dezső Ránki**（Hungaroton 1971，iTunes 同名盤＋Discogs 12754253）；「György Ligeti｜Ligeti, G.: Etudes, Books 1 and 2」是 Naxos 命名，Naxos 此曲目只有 **İdil Biret** 2003 錄音（MB 釘住）；Meiko Miyazawa＝**宮沢明子**（Audio Lab 1974《Sonatinen》）；Manfred Reuthe《Klavier Solo I》（Bella Musica）。作曲家欄：Ránki→Frédéric Chopin、Biret→György Ligeti；宮沢明子（庫勞、克萊門蒂、杜塞克）與 Reuthe（多位浪漫派）為選輯型，留空。
  - 原聲帶：Original Soundtrack《Clerks》→ Various Artists《Clerks: Music from the Motion Picture》。
  - 合作掛名照 MB：Czarface & Ghostface Killah；Toshinori Kondo, Eraldo Bernocchi & Bill Laswell《Charged》；Arthur Flink & Son of Chi；John McLaughlin & The One Truth Band；Bardo Pond, Acid Mothers Temple & Guru Guru《Acid Guru Pond》（Spotify 掛 Bardo Pond）；Juzzy Orange & GoodieK（汁橙音樂，MB 盤名《A Soulless Engineer》＝《沒有靈魂的工程師》）。
  - Patrick Holland《Hope You're Well》＝**Project Pablo**（Patrick Holland 的製作名義，MB 釘住 2017 EP），掛 MB 名義，queryAlias 帶 Patrick Holland。
  - Zhang Zhen Yue＝張震嶽《遠走高飛》（2019，5 首）；Young David＝青春大衛《第一到六天》；Elva Hsiao「蕭亞軒--」推定為 1999 首張同名專輯《蕭亞軒》（MB 題名「蕭亞軒同名專輯」；Spotify 的「--」應是同名專輯的佔位寫法）；Eason Chan「陳奕迅2011 "?" 國語專輯」＝《？》（全形，queryAlias 帶半形 ?）；Richard Beirach＝Richie Beirach（池中慣用寫法）；Dome「2」＝《Dome 2》。
- release type（`release-types.json`；全部註明「店主 Spotify 收藏指定盤」）：
  - EP＋`electronic`：Corporate《A5 EP》（3 首）、Project Pablo《Hope You're Well》。Single＋`electronic`：Smasher《So High》（英國 grime／UK garage 數位單曲，Discogs 16198751）——**例外白名單的精選門檻原本要歷史地位，本線以店主明確指定收藏盤為依據放行**（可逆：日後店主不要就下架這一張）。
  - EP＋`asia-mini-album`：張震嶽《遠走高飛》、烏賊紳士《狗》（7 首）——白名單原文寫日本ミニアルバム與韓國 EP，台灣迷你專輯同形狀（市場上當新作發行宣傳），本線依店主指定盤延用，記此。
  - Compilation（§5.6）：Clerks 原聲合輯、Bardo Pond《Selections: Volumes I-IV》。
  - 照 Album：椎名林檎《唄ひ手冥利〜其ノ壱〜》（翻唱輯，MB Album）、《Acid Guru Pond》（三團合作錄音室盤）、Arthur Flink《The Fifth World Recordings》（iTunes 標 EP、MB 標 Album，取 MB）。
- 待研究層核對：Ligeti 演奏者為推定；宮沢明子年份與 Spotify 版是否同錄音；冠宇《單飛》只有 iTunes HK 一個來源；Smasher 身分（英國 grime）為推定；Kay Hoffman 國籍（瑞士巴塞爾）；Dome 2 首發 1980。

## 研究 d 組
- 30131：人間椅子兩張後藤マスヒロ加入年份三處不一（日文維基單盤條目「本作起」、樂團條目 1996、英文維基 1993），facts 一律不寫加入年；《頽廃芸術展》label 補 Trycle（2003 再版 Teichiku）、《怪人二十面相》補 Meldac。電影院錄音為日文維基單一來源。
- 30132：Bardo Pond《Selections》實為自發 Volume I–IV CDR（2000 起）的約半數精選（Discogs 樂團自述），curatorWhy 寫「歷年單曲／EP 精選」不對，已更正；有定位，不建議移除。
- 30133：《Acid Guru Pond》Discogs 署名含 The Melting Paraiso UFO；Discogs 備註錄於 9/3/07（單一來源，日期格式不明），2016-04-16 Fire Records FIRELP434 發行。
- 30134：汁橙音樂／GoodieK 查無樂評與訪談（4 次搜尋抓取皆空），status thin；GoodieK＝Goodie 為推定，facts 不下斷語；Apple 掛名 Juzzy Orange Presents GoodieK。
- 30135：Smasher 身分成立——Discogs artist 240905 為倫敦哈克尼 DJ／製作人 Jeff Russell（本名），經營 On Top Records；單曲 2017-08-11 ONTOP002、3:19（iTunes）。iTunes 標 Hip-Hop/Rap，Discogs 標 Grime／UK Garage，facts 只寫 Discogs。thin。
- 30136：蕭亞軒推定成立——MB／Apple TW／中文維基曲目（10 首）與年份（1999-11-17）完全一致，Virgin（維京音樂）；銷量 50 萬為維基單一來源。
- 30137：Drive Like Jehu 無推翻；評價類名次（Rolling Stone 第 16 等）與 Pitchfork 分數只放 notes。
- 推翻策展層：2 處（Bardo Pond Selections 性質；兩張人間椅子 label 空缺補齊）。moodGuess 存疑：Smasher（只有類型標籤無聲音來源）、汁橙／GoodieK（無法驗證）、蕭亞軒（整張偏慢歌者多，建議取中間偏緩）。

## 研究 e 組
- 30141：青春大衛＝Young David，新竹搖滾／民謠樂團（StreetVoice young_david 新竹市、2009-11 加入），主唱楊大葳；與美國同名動畫無關。《第一到六天》StreetVoice 2014-07-16 為 8 首，Spotify 為 10 首（多〈笑〉〈五月雪〉）。卡單 label 禾廣查無來源，寫作層不寫廠牌。status thin（無樂評、成軍年、成員全名單）。
- 30142：烏賊紳士＝Gentle Squid，台南四人團（陳致丞／林郁晉／葉杰翰／留介廷，StreetVoice）；《狗》7 首約 22 分鐘，為迷你專輯；發行日各平台 4/20、5/1、5/2、5/5 不一，只寫 2016 年春。label 禾廣無證據（Apple 版權 Da Cao Music Studio、發行商 StreetVoice）。「後龐克」僅出自博客來商品分類與簡介（發行端文案），status thin。
- 30143：椎名林檎《唄ひ手冥利〜其ノ壱〜》身分成立（2002-05-27 東芝 EMI 雙碟翻唱專輯），寫作層須寫成翻唱輯；兩碟編曲者不同（亀田誠治／森俊之）。status full。
- 30144：陳奕迅《？》MB 半形、維基全形，採全形；曲目取 MB 12 首（2 粵 1 英），中文維基文字描述與曲目表自相矛盾；金曲獎為入圍。聲音層證據偏薄（鋼琴襯底只有新聞網摘要），status full 但 sound 屬保守推定。
- 推翻策展層：0 處年份／盤名；卡單 label 禾廣（兩張台灣盤）未證實。moodGuess 存疑：烏賊紳士（缺獨立樂評，僅發行端文案支持緊繃）；其餘不推翻。

## 研究 c 組
- 30121：Ligeti 核對成立：Spotify「Ligeti, G.: Etudes, Books 1 and 2」＝İdil Biret 的 Naxos 8.555777（2003；Discogs 1430046 曲目 6＋8＋14a＝15 軌，Naxos 目錄此曲目唯一）。官網 403、iTunes 搜尋不通，未能逐軌比對 Spotify，依盤名＋結構＋唯一性認定。14a 說法衝突（MusicWeb 稱首錄且為自動鋼琴構想、維基稱原版太難而重寫）：facts 只寫「首錄」。
- 30122：冠宇《單飛》＝董事長樂團前主唱何志盛（1969–2000）遺作紀念專輯，2003 角頭音樂（TCM025）。第二來源：TCM 官網、好有感覺音樂、中文維基董事長樂團、Hit Radio、博客來（摘要）。**推翻策展層**：genre pop／moodGuess 流行舞曲 R&B 不成立，實為國台語搖滾（Apple 歸華語搖滾）；建議卡單 genre 改 rock、label 填角頭音樂，moodGuess 重估。官方盤名《冠宇單飛》，Spotify 為《單飛》；發行日三源不一（9/1、9/19、9/22），facts 只寫 9/22 官方。
- 30123：Project Pablo EP 照實寫 EP（4 首 12 吋，Technicolour TCLR025，2017-10-20）；Patrick Holland＝Project Pablo 出自 Discogs 署名，溫哥華／蒙特婁背景僅見搜尋摘要。聲音為藝人自述「數位合成、乾淨高傳真」，不是 lo-fi：moodGuess 暖輕大致可，但勿寫 lo-fi。
- 30124：張震嶽《遠走高飛》EP 照實（5 首約 18 分鐘，2019-10-18 滾石）；製作人／編曲／錄音皆查無來源，聲音僅 Apple Music 編輯文一源（輕聲饒舌＋簡單電子節拍），status 標 thin，寫作層不得捏造製作人。
- 30125：Electric Dreams 錄音 1978-11/12（維基）、發行 1979；維基頁尾冒出的 Tom Stevens／Billy Cobham／Jerry Goodman 與 Discogs 不符，不採。Eon 錄音 1974-11 於 Generation Sound，三重奏 Beirach／Tusa／Williams，維基編輯註的 Liebman／Jan Hammer 不採；「第一張個人名義專輯」單源未寫。
- 30126：Moksha 器樂身分出自德文維基；間奏有吟誦與銅管、大提琴客座，勿寫「完全無人聲」。德國榜第 69 名單源。Bardo Pond《Amanita》LP 為 Drunken Fish、CD 為 Matador（Discogs 同目錄號並列），卡單 label Matador 可接受；英文維基日期 4/3 對 MB／Discogs 4/9，寫作層寫「1996 年 4 月」。
- 推翻策展層：1 處（冠宇 genre／moodGuess／label）；moodGuess 存疑：冠宇（見 30122）。

## 研究 b 組（研究層，30111–30120）
- 30111 **Misc《Beat Bouquet》推翻策展層**：不是「加拿大製作人 beat tape」，是蒙特婁三人爵士樂團（Jérôme Beaulieu 鋼琴合成器、William Côté 鼓、Jérémi Roy 貝斯，自稱 mutant jazz，PANM360 歸 Electro-Jazz），有真鼓、被處理成 glitch／lo-fi 節拍。身分（MB 4137dc7e、2025-05-28、自行發行）成立。genres 的 hiphop 無來源，建議主線酌改；moodGuess 大致可用。
- 30112 **宮沢明子《Sonatinen Album I》**：Apple 各區（us/jp/de/gb/tw/hk/au/ca/fr）藝人頁 382111188 共 27 張，無此盤、無 collectionId；Spotify 條目無法開啟。原錄音年只能對到 Discogs 11430327（Audio Lab. Record ALC 1017~8，1974 日本 2LP，13 首小奏鳴曲，Tower Hall 青山）。Spotify 版是否同一錄音（可能是 Trio Records 數位重發）未證實；year 1974 僅對 Discogs 版。Discogs 演奏欄標 Fortepiano 未證實，facts 僅括號註記。
- 30113 **Ránki**：演奏者、1971、Hungaroton 成立；卡單 manualEvidenceUrls 的 Discogs 12754253 是法國 BAM 授權版（年 0），原版為 Discogs 5412320（Hungaroton LPX／SLPX 11555，1971）；Discogs master 1136644。yearVerified 1971。
- 30114 **Reuthe**：iTunes 978521330 為 2015-02-27 Bella Musica；曲目是 Longo 編號鍵盤奏鳴曲、蕭邦 Op.36／Op.60、德布西《版畫》、夏布里埃，與 curatorWhy「浪漫派與印象派」只對一半；Arkiv『V 2: Klavier Solo』（BM312462）頁已 404，是否同盤未證實。錄音日未查到。
- 30115 **Fifth World Recordings**：兩首各約 21 分鐘、無鼓；樂評稱 fourth-world／ambient jazz，無任何來源用 spiritual jazz／soul；Jon Hassell 致敬僅零售商一個來源；Jacobus Derwort 過世年份來源衝突（2018／2019）未寫。MB Album、iTunes EP、Discogs LP Album。
- 30116 **Charged**：Apollo（R&S 旗下，比利時），Laswell 貝斯僅 1–4、8 首；有程式鼓。曲風 Wikipedia 標 jazz-funk、Discogs 標 Future Jazz／Drum n Bass，facts 取 Discogs。
- 30117 **Dome 2**：Blackwing Studio 1980 年 8 月錄音；Spotify「2」＝MB 2019-05-31 數位 release，發行者未證實；無鼓、偏安靜，moodGuess y 0.9 若指能量則偏高。
- 30118 **Dost 2**：Hamburg 錄音說法無來源，未寫；Rough Trade 稱第三張專輯未能確認；有鼓、暖。
- moodGuess 存疑：Misc（有真鼓與 glitch，非純柔軟）、Dome 2（y 偏高）。其餘相符。

## 研究 a 組（研究層，30101–30110）
- 30101 **RH Factor《Hard Groove》**：MB 855640e4／Discogs master 159239 對得上，2003-05-20 Verve，未推翻。〈I'll Stay〉為 2004 年葛萊美入圍（非得獎）。RH Factor 成軍原因、Strength EP 葛萊美入圍年份均查不到，未寫。moodGuess 大致可，但中段偏慢板新靈魂，非全程高能。
- 30102 **Mangelsdorff《Tension》推翻策展層兩處**：(1) label L+R 是 Spotify／iTunes 的 1979 再版版權，原始首發為 CBS 62336（1963，MB／Discogs 一致），年份 1963 無誤；(2) moodGuess 寫「小號長號交錯」，實際編制無小號，是長號＋中音與次中音薩克斯風＋貝斯＋鼓，無鋼琴。錄音 1963-07-08／11 Walldorf Tonstudio 法蘭克福。
- 30103 **Clerks 原聲帶**：MB 標 Album＋Soundtrack、iTunes 標 Compilation，掛 Various Artists，20 軌（13 音樂＋7 對白）。〈Got Me Wrong〉是 1992 年 EP《Sap》舊作，非新錄。Scott Angley 錄製說法單源（Smith 臉書貼文），已標明。
- 30104 **Czarface Meets Ghostface**：身分成立。卡單 mbNote 的 iTunes 連結是 Instrumentals 版，非本盤。逐曲取樣來源查無，sound 勿寫具體取樣。評分未進 facts。
- 30105 **Bent Fabric《The Happy Puppy》**：易誤讀點——〈Alley Cat〉不在本盤（在 Atco 33-148《Alley Cat》），本盤 ATCO 33-155。〈Alley Cat〉1963 年（第 5 屆）葛萊美最佳搖滾錄音，得獎。專輯逐軌樂手與編制查無，聲音只寫鋼琴小品。
- 30106 **Klimeks《Overnites》推翻策展層**：不是專輯，是 5 首約 18 分鐘的數位 EP（Discogs「File, MP3, EP」），首發 2013-11-04 wavemob WAVE002；MB／串流的 2014-08-04 是上架日（iTunes ℗ 2013 wavemob）。主線須決定 releaseType 改 EP（走 electronic EP 例外，同 Corporate 先例）與年份取 2013 或 2014。wavemob 為 Klimeks 自己經營（Discogs label 簡介，單源）。Bandcamp／Last.fm 擋，藝人生平查無，status thin。
- 30107 **Corporate《A5 EP》**：身分成立（MB／Discogs 18223729／Bandcamp／iTunes），3 首約 12 分鐘 EP，Play Me Records PLAY136，2016-04-18。藝人生平與樂評幾乎查不到，status thin。**moodGuess 存疑**：預估「失真重低音」無任何來源證實，標籤互相矛盾（Trap／Breaks／Glitch Hop／DnB／Bass Music），建議以實聽為準。
- 30108 **Kay Hoffman《Floret Silva》推翻策展層**：國籍——Discogs 寫「American national born in Basel in 1949」，是美國籍、生於巴塞爾，不是「瑞士鍵盤手」；MB 無國別。錄音 1977 夏／1978 冬於佛羅倫斯 Maurizio Pieri 家庭錄音室（Robot Records、Soundohm 兩頁），1978 年 RCA Italy 擱置，1985 年日本 Belle Antique BELLE 8502 首發。人員含 Pierrot Lunaire 的 Jacqueline Darby、Gaio Chiocchio。moodGuess 大致可，但編制遠比「鍵盤與人聲」雜（管樂、鼓、電吉他、合唱）。
- 30109 **總結**：8 張，推翻策展層 3 處（Mangelsdorff label／樂器、Klimeks 型別與年份、Kay Hoffman 國籍）；moodGuess 存疑：Mangelsdorff（樂器描述）、Corporate（失真）。

## 主線研究裁定（不佔條號；2026-10-30）
研究層 36 張全收（指定盤不換、本線不以 moodGuess 汰卡）。照研究層改卡單：
- Klimeks《Overnites》：研究層查明是 5 首約 18 分鐘數位 EP（wavemob WAVE002，2013-11-04 首發；MB 2014-08-04 是串流上架日）→ releaseType EP＋`electronic`、年份 **2013**。
- 冠宇《單飛》：冠宇＝董事長樂團前主唱何志盛（1969–2000）的遺作紀念專輯（角頭音樂 TCM025，2003）→ genres rock、label 角頭音樂；官方盤名《冠宇單飛》，卡上沿用 Spotify／Apple 的《單飛》（queryAlias 不動）。
- Misc《Beat Bouquet》：不是 beat tape，是蒙特婁三人 mutant jazz 樂團 → genres jazz／electronic。
- 廠牌與國別：Mangelsdorff《Tension》CBS（L+R 為 1979 再版）；Ránki 改用 Hungaroton 原版 Discogs 5412320 作身分證據、label Hungaroton；Kay Hoffman 國別 us（美籍、生於巴塞爾）；青春大衛 label 清空（查無廠牌）、烏賊紳士 Da Cao Music Studio、陳奕迅 Universal Music Taiwan、人間椅子《怪人二十面相》Meldac。
- 宮沢明子：Apple 找不到這張（藝人頁 27 張皆非），身分只對 Discogs 11430327（Audio Lab 1974，2LP 13 首小奏鳴曲）；第二證據改 Apple 藝人頁（同一演奏者），原卡上 1329367209 是《Chopin Nocturnes》已撤。年份 1974 只對 Discogs 版。
- Ligeti 確認 İdil Biret Naxos 8.555777（Naxos 此曲目唯一版本）；Smasher＝倫敦 Hackney 製作人 Jeff Russell（On Top Records）；蕭亞軒推定成立（1999-11-17 維京，10 首與 MB／Apple 一致）。
- 寫作層照研究稿：Mangelsdorff 編制無小號；Bent Fabric 本盤不含〈Alley Cat〉；Project Pablo 不寫 lo-fi；Bardo Pond《Selections》是 Volume 系列 CDR 精選；椎名林檎寫成翻唱輯；張震嶽、Project Pablo、Klimeks、Corporate 寫成 EP、Smasher 寫成單曲、烏賊紳士寫成迷你專輯。

## 鉤子層（d、e；條號 30156–30160）
- **30156** 交件：`desc-tools/batches/hooks/add-20261030-sf01-hooks-d.json`（8）、`-hooks-e.json`（4），key 與順序照研究稿。公式照 HOOK-DISPATCH：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin＝汁橙／GoodieK、Smasher、青春大衛、烏賊紳士）。逐筆（預算／hook 加權／hook 原始字元）：
  - d：頽廃芸術展 208／20／20；怪人二十面相 224／23／23；Selections 228／21／25；Acid Guru Pond 223／23／23；沒有靈魂的工程師 167／21／23（thin）；So High 166／23.5／26（thin）；蕭亞軒 211／23／25；Yank Crime 227／21／28。
  - e：第一到六天 165／24／24（thin）；狗 168／19／19（thin）；唄ひ手冥利 224／22／22；？ 229／25／25。
  - 初稿 10 張超標，一律整格捨去：頽廃的 Trycle 倒閉＋Teichiku 再版、怪人的〈名探偵登場〉與節目名、AGP 的川田／津山 2006 合組前史與 Lemur House、限量 1000 套、Yank Crime 的〈Luau〉曲長與 Rob Crow、蕭亞軒的三位製作人、Smasher 的 2018–2021 後續單曲、椎名的 Oricon 週榜、青春大衛的 Spotify 10 首版。壓完逐張回核 hook 依賴格：全部在 g1／g2（Yank Crime 初稿 note 沒有 Trombino，已補進 g2；AGP 的顏色曲名前移到 g2）。
  - 媒體名與媒體榜名次全數不進 note（研究稿的 Rolling Stone／Magnet／1001 Albums／Pitchfork、G-Music、勁歌金榜名次、全球華語歌曲排行榜皆未指派）；銷量 50 萬（單源）未指派。
- **30157** 骨架歸屬（12 張 12 條，只有擁有者寫歸屬句）：頽廃芸術展＝故鄉歇業電影院自錄自混；怪人二十面相＝團名出處擴成整張概念盤；Selections＝限量自發 CDR 收編成正式廠牌合輯；Acid Guru Pond＝三國三團合作（**不走「錄完擱置多年」**——那條讓給 a 組 Kay Hoffman，AGP note 不寫 2007 錄音年）；沒有靈魂的工程師＝製作人集團成員當主角、人聲曲全掛客座；So High＝自營廠牌的編號發行；蕭亞軒＝海外選秀落選後被製作人引薦出道；Yank Crime＝鼓手兼錄音混音、大廠首作即最後一張；第一到六天＝一張專輯前後兩半換編制；狗＝標題曲歌詞的自嘲意象；唄ひ手冥利＝兩碟兩位編曲家的鏡像對照（復出作一格，不作骨架）；？＝宣傳期撞上唱片公司與電視台的版權爭議。型別：Selections 合輯、So High 單曲、狗 迷你專輯、唄ひ手冥利 翻唱輯，皆在 note 末寫「型別寫成⋯」。
- **30158** 同藝人分軸與代稱：人間椅子 怪人二十面相＝生平（1987 弘前成軍、團名出自亂步、1989 上節目被稱文藝搖滾），第二句「成軍年＋弘前出身」、代稱「他們」；頽廃芸術展＝錄音細節（電影院、自混、標題表態），第二句「向 Black Sabbath 看齊的日本硬搖滾三人團」，成軍與團名這一格不寫。Bardo Pond 三張（請 a–c 對照）：預設 c 組《Amanita》帶生平（1991 費城成軍、團名《西藏度亡經》、轉 Matador）；Selections 只帶自發 CDR 管道，第二句「費城迷幻樂團＋吉他迴授上飄長笛與人聲」（編制領句），代稱「他們」，1991 與團名這一格不寫；Acid Guru Pond 只帶三團合作，第二句「三團團名與國別」，Bardo Pond 成員名單不寫。
- **30159** 第二句句型（逐張配死）：樂種＋編制＝頽廃；成軍年＋出身地＝怪人；樂種＋樂器編制＝Selections；三團國別＝AGP；製作人身分＝汁橙（GoodieK）；風格標記＝Smasher；歌手身分＋主打曲風＝蕭亞軒；地區＋樂種＝Yank Crime（聖地牙哥後硬核）；所在地樂團身分＝青春大衛（新竹）；城市樂團身分＝烏賊紳士（台南）；國籍＋創作歌手＝椎名；歌手＋語種專輯＝陳奕迅。hook 只帶名字或不帶名字的 12 張，身分都由第二句補。日期「日」後一字：問 頽廃／經 怪人／在 AGP／以 Smasher／推 蕭亞軒／交 Yank Crime／上 青春大衛／由 椎名／先、才 陳奕迅；Selections、汁橙、烏賊紳士只寫到年或月（a–c 請避開以上 10 字）。
- **30160** 自查：hook 間中文 4-gram 0 條（d、e 12 張）；hook 與自身 note 無逐字重複句（Smasher「哈克尼的 DJ」、AGP「曲名都是顏色」初稿重複，已改寫；Yank Crime 只剩人名 Trombino）。開頭前四字 12 張互異。`qa-batch hooks`：d、e 無標記（總標記 3＝a、b、c 缺檔）；`chk-hook-crossgroup`（2 組 12 張）：全部通過，hook 加權 19–25、note 165–232。
  - 30160 補記（續跑後再核）：a 組 8 張交件後對照——hook 間 4-gram 0 條、開頭前四字 20 張互異、「日」後一字 a（發／面／登／放／透）與 d–e 無重疊；Floret Silva 走擱置發行，AGP 已讓開。b、c 尚未交件，《Amanita》分軸照 30158 預設，待主線合核。三組合跑 `chk-hook-crossgroup` 全部通過、`qa-batch hooks` 只剩 b、c 缺檔。

## 鉤子層（a、b、c；條號 30151–30155）
- **30151** 交件：`desc-tools/batches/hooks/add-20261030-sf01-hooks-a.json`、`-b.json`、`-c.json`（各 8），key 與順序照研究稿。公式照 HOOK-DISPATCH：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（thin＝Klimeks、Corporate、Fifth World、宮沢明子、Reuthe、張震嶽）。逐筆（預算／hook 加權／hook 原始字元）：
  - a：Hard Groove 220／22／29；Tension 208／22.5／29；Clerks 225／28／28；Czarface 220／23／28；Happy Puppy 203／23.5／28；Overnites 168／25.5／30（thin）；A5 EP 157／25／28（thin）；Floret Silva 215／24／24。
  - b：Dome 2 215／21.5／24；Charged 216／19／19；Ránki 214／22／25；Dost 2 225／25.5／29；Fifth World 166／22／24（thin）；宮沢明子 151／23／23（thin）；Reuthe 153／23／23（thin）；Beat Bouquet 226／25／29。
  - c：Biret 225／25／30；Electric Dreams 220／22／28；Eon 227／23／29；Hope You're Well 216／19.5／25；單飛 191／25／25；遠走高飛 141／22／22（thin）；Moksha 224／22／22；Amanita 226／26／30。
  - 初稿 a 組 7 張、c 組 6 張超標，整格捨去：RH Factor 的 Wurlitzer 與曲長、Clerks 的 Quick Stop 店名與 Got Me Wrong 單曲榜、Czarface 成軍年與 Independent Albums 名次、Bent Fabric 的 Omkring et flygel 原名與 Metronome Studio、Corporate 的廠牌沿革、Kay Hoffman 的 Pierrot Lunaire 吉他手與 Pieri、Misc 的影響來源、McLaughlin 錄音室與 Billboard 名次、Eon 的 Eicher 與目錄號、Project Pablo 舊廠牌、Moksha 首度上榜句、Amanita 取團名者。壓完回核 hook 依賴格：全部在 g1／g2（Project Pablo 的「蒙特婁錄音室」壓完後一度踩空，已補回 g1）。
  - 媒體名與媒體榜名次全數不進 note（紐約時報、EARMILK、PANM360、MusicWeb、Gramophone、AllMusic、Angry Metal Guy 皆只寫成「樂評」）；Billboard 銷售榜只留 Bent Fabric 的 Hot 100。逝者（Hargrove、Mangelsdorff、Bent Fabric、近藤、宮沢、Weigand）的辭世與作品無綁定，全不指派；冠宇屬遺作，必寫、標克制。
- **30152** 骨架歸屬（24 張 24 條，只有擁有者寫歸屬句；已避開 d、e 的 30157）：Hard Groove＝爵士樂手向童年樂種（嘻哈）致意；Tension＝無鋼琴三管前線的編制；Clerks＝低成本電影原聲串起一個樂種場景（另類搖滾）；Czarface＝系列企劃第二回；Happy Puppy＝一曲成名後的跟進盤（紅曲不在本盤）；Overnites＝空著饒舌位子的器樂節拍；A5 EP＝平台分類各歸一格；Floret Silva＝錄完擱置多年、異國首發（d、e 讓出）＋中世紀詩集入樂；Dome 2＝主團停擺期間的支線雙人組；Charged＝分處四城的遠端錄音；Ránki＝不滿二十歲學生錄音獲唱片大獎；Dost 2＝移民第二代在海外延續故鄉樂器；Fifth World＝一面一首的長篇；宮沢明子＝教材曲目的名家錄音；Reuthe＝曲目由古排到近的時代巡禮；Beat Bouquet＝原聲三重奏把真鼓做成 beat；Biret＝演奏者在樂譜矛盾時的取捨；Electric Dreams＝兩段舊班底合流；Eon＝老曲開場、B 面全自作的 A／B 面分工；Hope You're Well＝巡演途中錄成、進入大廠牌支線的第一份；單飛＝遺作：朋友樂團替遺留人聲重新編曲；遠走高飛＝民謠唱腔改輕聲饒舌回到情歌（「睽違」只作一格，不作骨架，避開椎名復出）；Moksha＝梵文元素命名的概念盤；Amanita＝地下團轉進國際發行。型別：Clerks 原聲合輯、Klimeks／Corporate／Project Pablo 皆在 note 寫「型別寫成 EP」；張震嶽由第二句以 EP 領句；古典三張（Ránki、宮沢、Reuthe）＋Biret 主角皆為演奏者與錄音。
- **30153** 同藝人分軸與代稱：Bardo Pond 照 30158 配——《Amanita》帶生平（1991 費城成軍、團名出自《西藏度亡經》在 hook、轉 Matador），直呼團名，第二句「成員自述：畢業後靠自由即興湊成一團」（與 Selections 的編制領句、AGP 的三團國別錯開）。其餘 a–c 無跨卡藝人。
- **30154** 第二句句型（逐張配死，已避開 30159）：日期＝Hard Groove；生年＝Tension；導演＋「在」＝Clerks；「同屬 Wu-Tang Clan」＝Czarface；本名＝Happy Puppy；樂評比較（外人之口）＝Overnites；廠牌替⋯發行＝A5 EP；樂器＝Floret Silva；主團＋分工＝Dome 2；國籍身分＝Charged；出生地＝Ránki；「成立於」＝Dost 2；城市並列＝Fifth World；比賽名次＝宮沢；邀請人（尹伊桑）＝Reuthe；「由⋯組成」＝Beat Bouquet；師承＝Biret；樂種＝Electric Dreams；掛名欄＝Eon；「是⋯的名義」＝Project Pablo；年齡（克制）＝單飛；型別＝遠走高飛；自稱＝Moksha；成員自述＝Amanita。日期「日」後一字：發 Hard Groove／面 Clerks／登 Czarface／放 Overnites／透 A5／出 Charged／全 Dost 2／荷 Fifth World／自 Beat Bouquet／開 Hope You're Well／正 單飛／滾 遠走高飛／於 Moksha；其餘只寫到年或月。全批 36 張 23 字互不重複。
- **30155** 自查：36 張 hook 間中文 4-gram 0 條；開頭前四字 36 張互異；hook 與自身 note 無逐字重複句（Reuthe「的鍵盤奏鳴曲」改成「Longo 編號的短曲」）。事實自驗：Ránki「不滿二十歲」照研究層保守版（發行時）；Reuthe hook 不寫「十餘首」（實數約 10 首）；Charged 用「分頭錄成」不寫接力順序；Moksha hook 不寫「不唱」（間奏有吟誦）。`qa-batch hooks`：全部通過；`chk-hook-crossgroup`（5 組 36 張）：全部通過，只報不擋 2 筆否定句（Dome 2「沒有常規鼓組」、Fifth World「沒有鼓」，屬聲音內容非校對痕跡）；hook 加權 19–28、note 145–232。

## 寫作層（writer-2）
- **30166** 交件：`desc-tools/batches/output/add-20261030-sf01-out-2.json` 18 張（full 13：206–240；thin 5：張震嶽 141、汁橙／GoodieK 176、Smasher 162、青春大衛 143、烏賊紳士 158）。`qa-batch out`（兩檔 36 張）全部通過；`qa-check-research` 0；`fix-spacing` 待補 0。初稿 Eon 270、Moksha 249 超標，整格捨去／縮句（Eon 拆掉「翻到 B 面」與時間子句，Moksha 拆掉間奏「穿插其間」與「六首」）。
- **30167** 第二句全照 30158／30159／30153／30154 指派（掛名欄＝Eon、「是⋯的名義」＝Project Pablo、年齡克制＝冠宇、型別＝張震嶽 EP 領句、自稱＝Moksha、成員自述＝Amanita、樂種＋編制＝頽廃、成軍年＋弘前＝怪人、編制＝Selections、三團國別＝AGP、製作人身分＝GoodieK、風格＝Smasher、歌手＋主打 R&B＝蕭亞軒、聖地牙哥後硬核＝Yank Crime、新竹樂團＝青春大衛、台南樂團＝烏賊紳士、日本創作歌手＝椎名、香港歌手＋國語專輯＝陳奕迅）。「日」後一字照表：開／正／滾／於／問／經／在／以／推／交／上／由／先、才；Eon、Amanita、Selections、汁橙、烏賊紳士只寫到年或月。日期前一字逐張不同，「在年月日」「輯年月日」兩條殘片已拆。
- **30168** 型別照 note：Project Pablo、張震嶽寫 EP；Selections 寫雙 CD 合輯；Smasher 寫單曲；烏賊紳士寫迷你專輯；椎名寫翻唱輯。正文不點名來源平台：汁橙的「Apple 掛 Juzzy Orange Presents GoodieK」寫成「多數曲目掛在⋯名下」；烏賊紳士的「商品介紹寫⋯」直接寫成陳述句。青春大衛的 StreetVoice 是上架管道（note 指定），保留。媒體名與媒體榜名次 0 處；Mogwai 的 Braithwaite 屬樂手、轉成間接敘述。
- **30169** 自掃（han() 4-gram，本檔 18 張＋writer-1 out 18 張合掃）：3 張以上 0 條；2 張殘片只剩專名與樂器（金曲獎獎名：冠宇×陳奕迅；薩克斯風）與同藝人人間椅子兩張共用的「第 N 張錄音室專輯」（note 指定、事實不可換）。途中拆掉「首約分鐘」×4、「專輯年月日」×3、「推出這張」「製作人是」「交給自家」「長約分秒」「自己經營」「發行目錄號」「的第二張」「一張專輯」「全盤最長的」「在紐約錄」「錄於紐約」「任製作年」「樂團自己」「是樂團第」「是他們第」「自行發行」「搖滾樂團」「後來入圍」「分鐘上下」等。writer-1 若再改稿，請主線收件時合掃一次。
- **30170** 判斷記錄：冠宇第二句 31 歲辭世照 note 寫、不加渲染；蕭亞軒「未進前 5」屬否定句、hook 已帶「止步 12 強」，不再寫，改以選拔名稱具名；Smasher 的「編號 002」hook 已帶，正文寫完整目錄號 ONTOP002 具名；Amanita 以「成員回憶」領句（note 指定成員自述，非轉述引導詞）。

## 寫作層（writer-1）
- **30161** 交件：`desc-tools/batches/output/add-20261030-sf01-out-1.json` 18 張，key 逐字同序。full 13 張 216–240（Hard Groove 237、Tension 233、Clerks 238、Czarface 237、Happy Puppy 240、Floret Silva 223、Dome 2 234、Charged 216、Ránki 229、Dost 2 229、Beat Bouquet 237、Biret 234、Electric Dreams 240）；thin 5 張 155–170（Overnites 170、A5 EP 155、Fifth World 163、宮沢明子 158、Reuthe 166）。初稿 Hard Groove／Tension／Clerks／Happy Puppy／Electric Dreams 超標（最高 270），以縮句與併句壓回，未捨事實格；Electric Dreams 初稿誤加「六人」（note 無），已刪。`qa-batch out`：全部通過；`qa-check-research`：標記 0；`fix-spacing`：0 處；「據」字 0。
- **30162** 第二句領句與「日」後一字全照 30152／30154：日期領句＝Hard Groove（日發）；生年＝Tension；導演＋在＝Clerks（日面）；同屬 Wu-Tang Clan＝Czarface（日登）；本名＝Happy Puppy；樂評比較＝Overnites（日放）；廠牌替⋯推出＝A5 EP（日透）；樂器＝Floret Silva；主團＋分工＝Dome 2；國籍身分＝Charged（日出）；出生地＝Ránki；成立於＝Dost 2（日全）；城市並列＝Fifth World（日荷）；比賽名次＝宮沢明子；邀請人＝Reuthe；由⋯組成＝Beat Bouquet（日自）；師承＝Biret；樂種＝Electric Dreams。
- **30163** 跨兩檔 han() 4-gram 合掃（含 out-2 現況）：3 張以上 0 條；2 張只剩樂器名「薩克斯風」。依先交件規則把 2 張殘片當 3 張拆：「年由發行」（Tension 改「CBS 當年就推出了唱片」）、「首約分鐘」「長約分鐘」「計約分鐘」「首加起來」（Charged 時長句四改，定為「全長 52 分鐘左右，共九首」）、「手與貝斯」（Beat Bouquet 改括號標樂器）、「專輯年月日」「成年月日」「在年月日」「三人年月」「來年月日」（Beat Bouquet 日期句前一字五改，定為「樂團」）。out-2 若再動，請主線收件時合掃一次。
- **30164** 否定句改正面：Dome 2「沒有常規鼓組」寫成「合成器長音與機械式重複脈衝代替常規鼓組推著曲子前進」；Fifth World「沒有鼓」整格以「長音、循環與聲景在底下鋪開」承載，未寫否定。媒體名不進正文（Overnites、Biret 只寫「樂評」）；Hot 100 依 30151 保留且不寫 Billboard。A5 EP 正文不再提 Apple（hook 已有）。
- **30165** 型別：Clerks 寫「原聲合輯」、Overnites／A5 EP 寫 EP；Floret Silva、Fifth World 未標型別。古典四張（Ránki、宮沢明子、Reuthe、Biret）以演奏者與錄音為主體，作品背景未展開。Floret Silva 錄音地點寫明佛羅倫斯（初稿「當地」會被讀成巴塞爾，已改）。

## 主線審稿（2026-10-30，cloud-main）
- 逐張審 36 張，抽核關鍵事實回研究稿（Ránki 查爾·克羅大獎與師承、Mangelsdorff 編制無鋼琴與 CBS 62336、冠宇＝何志盛與金曲入圍、蕭亞軒 1998 新秀大賽與 1999-11-17、Smasher 本名與 ONTOP002、Kay Hoffman 錄音與 1985 首發）皆一致。
- 改 6 處（存 `desc-override.json`；只刪改正文，研究稿 facts 保留）：
  - `desc2:Corporate|A5 EP`：「Apple 把它們分進嘻哈、碎拍與舞曲」「被歸在／歸／落進」→「分類標籤橫跨嘻哈、碎拍與舞曲」「標的是…」——正文不點名資料平台；155→149。
  - `desc2:Klimeks|Overnites`：刪「樂評拿它和 Clams Casino 相比，想像 A$AP Rocky 在這些節拍上饒舌。」——單一樂評的比較評價句；170→125。
  - `desc2:İdil Biret|Ligeti: Études…`：刪「樂評認為這個取捨有點爭議，整體評價仍然很高。」——單源評價句；234→212。
  - `desc2:Bardo Pond|Amanita`：刪「Mogwai 的 Stuart Braithwaite 形容它像一整首巨大的音樂。」——單人評價引語；240→199。
  - `desc4:張震嶽|遠走高飛`：刪「〈酒鬼〉與〈絕對〉讓人想起他的〈思念是一種病〉。」——唯一來源是平台編輯文的比較評價；141→117。
- 其餘 30 張逐張審過，未改字。
