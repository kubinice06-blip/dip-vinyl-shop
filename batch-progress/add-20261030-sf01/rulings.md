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

## 鉤子層（a、b、c；條號 30151–30155）
- **30151** 交件：`desc-tools/batches/hooks/add-20261030-sf01-hooks-a.json`、`-b.json`、`-c.json` 各 8 張，key 與順序照研究稿。公式照 HOOK-DISPATCH：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（同一把尺回量 d、e 12 張，逐格重現 30156 的數字）；full 上限 230、thin 上限 170（thin＝Klimeks、Corporate、Fifth World Recordings、宮沢明子、Reuthe、張震嶽）。逐筆（預算／hook 加權／hook 原始字元）：
  - a：Hard Groove 223／26／26；Tension 203／20／20；Clerks 225／19／19；Czarface Meets Ghostface 228／18／18；The Happy Puppy 218／23.5／28；Overnites 165／26／26（thin）；A5 EP 169／24.5／28（thin）；Floret Silva 229／26／26。
  - b：Dome 2 221／23.5／26；Charged 217／26／26；Ránki Chopin 229／21／21；Dost 2 216／25.5／29；Fifth World Recordings 168／20／22（thin）；Sonatinen 163／26／26（thin）；Klavier Solo I 169／21／21（thin）；Beat Bouquet 229／23／23。
  - c：Ligeti Études 227／24／24；Electric Dreams 224／24／24；Eon 224／17／22；Hope You're Well 217／26／26；單飛 230／26／26；遠走高飛 152／21／21（thin）；Moksha 217／19／19；Amanita 223／23.5／29。
  - 初稿 21 張超標（只有 Tension、單飛、遠走高飛一次過），一律整格捨去：Hard Groove 的〈I'll Stay〉翻唱與葛萊美入圍、《Habana》盤名；Clerks 的 Columbia 母廠、〈Got Me Wrong〉榜名次、Sundance；Czarface 的曲數與 boom bap 一格；Happy Puppy 的 Metronome Studio；Overnites 的 wavemob 自營（那條骨架歸 Smasher）；A5 EP 的 Discogs 標籤與 Play Me 沿革；Dome 2 的側脊顛倒與〈Keep It〉曲長；Charged 的曲數全長；Ránki 的聲音一格；Dost 2 的樂手名單；Sonatinen 的 Tower Hall 與 Op. 36；Electric Dreams 的 Sanborn、節奏組、錄音室名；Eon 的 Tristano、〈Places〉、錄音室名；Hope You're Well 的長線旋律自述後半（Deep House 移進第二句）；Moksha 的主曲長度與聲音描述；Amanita 的 Jason Cox 與毒蠅傘。
  - 壓完逐張回核 hook 依賴格：初稿有 6 張靠在 g3 以後（Tension 的編制、Czarface 的曲名、Happy Puppy 的十二首、Floret Silva 的擱置、Sonatinen 的教材曲、單飛 的樂團重編），已把那一格前移到 g1／g2，24 張全部站得住。hook 事實自驗：Ránki「不滿二十歲」照研究稿 30113 的保守寫法，不寫十九歲；Moksha 間奏長 1 分 45 秒到 2 分 37 秒，hook 從「一兩分鐘」改成「約兩分鐘」。
  - 媒體名與媒體榜單名次全數不進 note（紐約時報、Birmingham Post、Soul in Stereo、EARMILK、PANM360、MusicWeb、Gramophone、AllMusic 星等、Angry Metal Guy 皆未指派；Overnites 與 Ligeti 的樂評內容寫成「樂評」不具名）。單源細節未指派：Moksha 德國榜第 69 名、Fifth World 的 Jon Hassell 致敬、Project Pablo 的溫哥華／蒙特婁生平、Ligeti 14a 首錄。逝者：只有單飛（遺作紀念盤，標克制）；Hargrove、Mangelsdorff、Bent Fabric、近藤等則、宮沢明子的逝世與作品無關，不寫。
- **30152** 骨架歸屬（24 張 24 條，只有擁有者寫歸屬句；與 d、e 的 12 條不重疊）：Hard Groove＝爵士名手回頭向童年的嘻哈致意；Tension＝無鋼琴、三管並列的編制；Clerks＝台詞軌與歌曲交錯的電影原聲；Czarface＝曲序做成摔角／英雄片的開場與片尾彩蛋；Happy Puppy＝紅曲之後的跟進專輯、紅曲本身不收；Overnites＝聲音細節（木魚般輕敲、降調人聲切片）＋樂評想像饒舌手上陣；A5 EP＝三首掛三種曲風標籤；Floret Silva＝錄完擱置、多年後在異國首發（d 組 AGP 已讓出）；Dome 2＝母團停擺期間的支線計畫；Charged＝四座城市錄音室接力；Ránki＝在學學生的錄音拿下國際唱片大獎；Dost 2＝兩部曲下集、改以團員個體為主軸；Fifth World＝黑膠一面一首的兩段長篇；Sonatinen＝鋼琴教材曲交給全集級演奏者；Klavier Solo I＝受作曲家之邀赴異國任教的演奏者；Beat Bouquet＝真樂團的演奏被處理成節拍；Ligeti＝演奏者的詮釋取捨（表情記號優先於節拍器）；Electric Dreams＝把兩段時期舊樂團的人接進新團；Eon＝作曲科班出身的鋼琴手（開場長篇標準曲作 hook）；Hope You're Well＝巡演途中一人寫錄混；單飛＝朋友樂團替逝者舊人聲重新編曲；遠走高飛＝睽違多年回到情歌路線；Moksha＝主曲與間奏交錯的結構；Amanita＝CD 與黑膠分屬兩家廠牌、黑膠多兩首。型別：Clerks 原聲合輯、Overnites／A5 EP／Hope You're Well／遠走高飛 EP，皆在 note 末寫「型別寫成⋯」。
  - 避撞：Overnites 的自營廠牌與 Smasher 同形狀，整格捨去；Moksha 的「曲名取自梵文元素」只作一格、hook 不靠它（AGP 的 hook 是顏色曲名）；Moksha 鼓手兼製作與 Yank Crime 同形狀，不指派；Eon 的「A 面借曲、B 面自作」與青春大衛「前後兩半」同形狀，不作骨架。SKELETON 字串（無鋼琴／遺作／辭世等）24 張各自至多一張命中。
- **30153** 同藝人分軸與代稱：Bardo Pond 三張照 30158 預設——Amanita 帶生平（1991 費城成軍、團名《西藏度亡經》、轉 Matador 進入國際發行），聲音只寫「嗡鳴吉他與回饋噪音」，不寫長笛與人聲（那串字屬 Selections 第二句）；代稱「這團人」（Selections 用「他們」、AGP 不用代稱）；Clint Takeda 的樂器研究稿兩處不一，不寫。本組其餘 21 位藝人各一張。hook 用代稱者：宮沢明子「她」、Electric Dreams／Hope You're Well／遠走高飛「他」，第二句一律具名。
- **30154** 第二句句型（逐張配死，與 d、e 的 12 種互異）：是字句＋首張＝Hard Groove；生年＋出生地＝Tension；電影出處＝Clerks；團員組成＋客座＝Czarface；廠牌創辦人身分＝Happy Puppy；年輕＋國籍製作人＝Overnites；廠牌旗下製作人＝A5 EP；國籍＋出生地＋樂器＝Floret Silva；英國後龐克雙人組兩人具名＝Dome 2；領銜者國籍樂器＋三人合作＝Charged；在學身分＋同學具名＝Ránki；樂團成軍年＋兩部曲下集＝Dost 2；兩城具名＝Fifth World；比賽名次＝Sonatinen；曲目跨三時代＝Klavier Solo I；三成員與樂器具名＝Beat Bouquet；師承＝Ligeti；領班帶的爵士搖滾樂團＝Electric Dreams；學歷＝Eon；製作名義＝本名＝Hope You're Well；樂團職位＝單飛；族群＋出身地＝遠走高飛；成軍年＋自稱風格＝Moksha；團名出處＝Amanita。日期「日」後一字：面 Hard Groove／發 Clerks／，Czarface／釋 Overnites／掛 A5 EP／於 Charged／出 Fifth World／自 Beat Bouquet／亮 Hope You're Well／因 單飛／滾 遠走高飛／歐 Moksha，其餘 12 張只寫到年或月；與 d、e 的 10 字（問經在以推交上由先才）全不重疊。
- **30155** 自查：hook 間中文 4-gram（36 張全批）只剩樂器名「薩克斯風」（Tension 對青春大衛）；初稿 Hope You're Well「的錄音室」撞頽廃芸術展 hook，已改寫本組 hook。hook 與自身 note 無逐字重複句（Hard Groove「拿過兩座葛萊美」、Charged 城市清單、Electric Dreams「小提琴手出自」、Hope You're Well「蒙特婁的錄音室」初稿重複，已改寫 note）。開頭前四字 36 張互異。`qa-batch hooks`：全部通過（5 組）；`chk-hook-crossgroup`（5 組 36 張）：全部通過，hook 加權 17–26、note 157–237；只報不擋的一般否定句 1 筆（Dome 2「幾乎沒有常規鼓組」，是聲音內容，非校對痕跡）。

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

## 寫作層（writer-1）
- **30161** 交件：`desc-tools/batches/output/add-20261030-sf01-out-1.json` 18 張（key 逐字同序）。full 13 張 216–240（Hard Groove 231、Tension 223、Clerks 235、Czarface 240、Happy Puppy 216、Floret Silva 240、Dome 2 227、Charged 240、Ránki 231、Dost 2 228、Beat Bouquet 227、Ligeti 226、Electric Dreams 236）；thin 5 張 148–172（Overnites 166、A5 EP 148、Fifth World 162、Sonatinen 155、Klavier Solo I 172）。初稿 5 張超標（Clerks 243、Czarface 244、Floret Silva 244、Charged 256、Electric Dreams 250），一律整格捨去：Clerks 的「共 20 軌」（20 軌＝13＋7 與 hook 重複）、Floret Silva 的「他在⋯錄完整張」改短句、Charged 的搭檔全名子句（改成姓氏短句帶入）、Electric Dreams 的「鍵盤手」重複稱謂、Czarface 的曲名修飾。`qa-batch out`（兩檔）全部通過；`qa-check-research` 標記 0；`fix-spacing` 0 處；「據」字 grep 0。
- **30162** 第二句全照鉤子層 note 指派（30154）。日期「日」後一字照 30154：Hard Groove 面、Clerks 發、Czarface ，、Overnites 釋、A5 EP 掛、Charged 於、Fifth World 出、Beat Bouquet 自；其餘只寫到年或月。Overnites 的日期改由「wavemob 讓它」領起（「在年月日」撞 Smasher、「位年月日」撞蕭亞軒）。
- **30163** 跨兩檔合掃（han() 4-gram，out-1 18 張＋out-2 18 張）：3 張以上 0 條；2 張只剩樂器名「薩克斯風」（Tension 對青春大衛）。途中拆掉：「在紐約錄」×3（Hard Groove／Electric Dreams／Eon，本組兩張改寫）、「首張專輯」（對冠宇）、「年月日發」（Clerks 對 Czarface，Czarface 改「Silver Age 把它推上市」）、「輯年月日」（對 Moksha）、「出自他的」（Tension 對 Electric Dreams hook，改 Tension）、「錄音在年」「年由發行」「他年生於」「發行這張」「年成軍的」「曲目只有」「自行發行」「的第二張」「長約分鐘」「約分鐘數」「首年月日」「搖滾樂團」「分鐘上下」。「約分鐘的」的 out-1 端是 Fifth World 的 hook 原文，本組無權改，out-2 端（狗）合計只 2 張。
- **30164** 型別照主線研究裁定：Clerks 寫「原聲合輯」、Overnites／A5 EP 寫「數位 EP」；其餘照 Album。原聲帶規則：Clerks 第二句點出 Kevin Smith 首部長片《Clerks》與拍攝地（note 無台灣片名，不補）。媒體名與媒體榜單名次 0（Overnites 的樂評不具名）；A5 EP 的平台名只在 hook，正文不重提。Mangelsdorff 編制只寫長號與兩支薩克斯風；Bent Fabric 寫成「那首紅曲另收在一張同名專輯裡」（正面表述）。
- **30165** 開頭兩句補身分：Czarface 補「嘻哈團體」、Ránki 補「蕭邦獨奏」在第四句（第二句已是在學身分＋同學，前兩句由 hook 的「匈牙利鋼琴學生」承擔）、Ligeti 第二句補「Ligeti 的鋼琴練習曲」、Electric Dreams 補「爵士搖滾團」。宮沢明子照卡單藝人欄取漢字形「宮沢明子」。Charged 的 Bernocchi／Laswell 只以姓氏帶入（全名在藝人欄）。「嘻哈團體」「爵士搖滾團」為由卡單曲風推得的樂種描述，可逆。

## 寫作層（writer-2）
- **30166** 交件：`desc-tools/batches/output/add-20261030-sf01-out-2.json` 18 張，key 逐字同序。full 13：198–239（Eon 238／Hope You're Well 205／單飛 199／Moksha 234／Amanita 223／頽廃芸術展 211／怪人二十面相 225／Selections 217／Acid Guru Pond 239／蕭亞軒 198／Yank Crime 236／唄ひ手冥利 220／？ 237）；thin 5：遠走高飛 131／沒有靈魂的工程師 175／So High 170／第一到六天 146／狗 169。`qa-batch out`（兩檔 36 張）全部通過、`qa-check-research` 標記 0、`fix-spacing` 待補 0。初稿 3 張超標（Eon 256、Moksha 245、Yank Crime 245），一律整格縮：Eon 拿掉「鋼琴」重複與生年句改寫、Moksha 併「自稱／全盤」一句、Yank Crime 把成軍句與 Trombino 具名併成一句。
- **30167** 第二句領句與日期「日」後一字全照 30154／30159（亮 Hope You're Well／因 單飛／滾 遠走高飛／歐 Moksha／問 頽廃／經 怪人／在 AGP／以 Smasher／推 蕭亞軒／交 Yank Crime／上 青春大衛／由 椎名／先、才 陳奕迅；Eon、Amanita、Selections、汁橙、烏賊紳士只到年或月）。代稱照 30153／30158：Amanita「這團人」、Selections「他們」、AGP 不用代稱；Yank Crime 第二句以樂團領句、句末「他正是團裡的鼓手」接回 hook 的 Trombino。
- **30168** 轉述與來源：汁橙 note 的「Apple 掛…」寫成「曲目大多掛在 Juzzy Orange Presents GoodieK 名下」，不點平台；張震嶽「唱片介紹說」、烏賊紳士「商品介紹寫」都改成直述；怪人二十面相的評審稱號轉成間接敘述（「評審把這種音樂叫作文藝搖滾」）。青春大衛的 StreetVoice 街聲是發行管道（note 指派），照寫。否定句改正面：單飛「樂團首作還沒開始宣傳」→「首作的宣傳還在前頭」、Selections「沒進正規專輯」→「正規專輯以外」、？「歌沒排上 TVB」→「宣傳期間歌曲因此缺席 TVB」；蕭亞軒「未進前 5」整格捨去（hook 已寫止步 12 強）。媒體名、榜單名次、據說／據傳 grep 0。
- **30169** 避免複述 hook：Hope You're Well 第二句不再寫「一人寫曲」，改補錄音、混音；青春大衛後半不重寫薩克斯風與大提琴、前半不重寫延遲音牆，改寫「搖滾曲加進鼓聲／古典吉他撐起懷舊民謠」；？ 的方大同改寫「同樣由方大同編曲」；遠走高飛不重寫輕聲吟唱，改寫電子節拍。
- **30170** 自掃（han() 4-gram，out-1＋out-2 合掃 36 張）：3 張以上 0 條；跨檔 2 張只剩樂器名「薩克斯風」（Tension hook 對 第一到六天 hook，兩邊都是 hook 原文）；本檔內 2 張只剩專名「人間椅子」。途中拆掉：是全盤最長（Eon／怪人）、首約分鐘（遠走高飛／頽廃、狗）、第張錄音室專輯（兩張人間椅子）、首張專輯（單飛／蕭亞軒）、專輯年月日（Moksha／？）、這張是他們（Amanita／怪人）、發行的這張（怪人／汁橙）、長約分秒（AGP／Smasher）、錄音與混音（Hope You're Well 對 Yank Crime hook，改本張正文）、混音也由（Hope You're Well／頽廃）。

## 主線（條號 30171–30180；2026-10-30）
- **30171 主線審稿**（36 張逐張審過，2026-10-30）：改 3 處。
  - `desc2:Corporate|A5 EP`：hook「三首歌在 Apple 上分屬三種曲風：嘻哈、碎拍與舞曲。」點名資料平台 → 「三首歌各走一路：嘻哈、碎拍與舞曲。」（hooks-a、out-1 同步）。
  - `desc2:Klimeks|Overnites`：刪「樂評聽出它近似 Clams Casino，想像饒舌手在這些節拍上開口。」——單一來源評價句（166→131，thin 帶內）。
  - `desc2:Richie Beirach|Eon`：第二句語序倒裝難讀，改為「爵士鋼琴手 Richie Beirach 1947 年生於紐約，1972 年拿到曼哈頓音樂學院作曲碩士，唱片署名寫作 Richard Beirach。」（事實不變）。
  - 其餘保留：writer-1 自推的「嘻哈團體」（Czarface）、「爵士搖滾團」（The One Truth Band）與卡單曲風一致、不構成新事實；青春大衛「上架 StreetVoice 街聲」是本盤唯一發行通路，屬發行事實非資料平台引用；Billboard Hot 100 名次為銷售榜。
- **30172 試聽**：`preview-override.json` 改 13 張（Hard Groove 取 Roy Hargrove 掛名原盤、Czarface 取原版不取 Instrumentals、Ránki／Reuthe／冠宇／AGP／Smasher 等人工身分與 MB 無曲目者指定 collection、Eon 以 Richard Beirach 掛名、陳奕迅《？》hk 1443783500、椎名 jp 羅馬拼音盤名、烏賊紳士 tw）→ ready 31、unavailable 5（Bent Fabric、宮沢明子、İdil Biret、汁橙／GoodieK、青春大衛：Apple 未上架）。
- **30173 封面**：CAA 24、Apple 9、Discogs 2（宮沢明子 11430327、İdil Biret 1430046，已登錄 `data/discogs-cover-registry.json`）、manual 1（青春大衛：StreetVoice 官方專輯頁 og:image；verify 不收 `streetvoice` 來源字，記 `manual`）。人間椅子《頽廃芸術展》CAA 原圖 HEAD 500 → 改 Apple jp 1880369527。36 張縮圖表主線目視全數相符、live-check 全 200。
- **30174 三軸**（`ratings-override.json` 逐張附理由）：古典 4 張 `manual:classical-rubric`；華語／日語 10 張 `manual:regional-rubric`；考古／小量發行 7 張 `manual:depth-rubric`；其餘機器值校正（Last.fm 被合作掛名或 VA 壓低者，例 Clerks 130、Beirach 120、Czarface 2,881）。
- **30175 頂點**：無 classic 5／accessibility 5；唯一 obscurity 5 是宮沢明子（古典 pearl 須人工判定＋兩個證據網址，查無遺珠級證據），全列一般卡。稀有度 rare 20、uncommon 13、common 3。
- **30176 管線修補**：`build-manifest.mjs` 原本不把卡單 `genreException` 帶進 manifest，EP／單曲卡（Klimeks、Corporate、Project Pablo、張震嶽、Smasher、烏賊紳士）prepare gate 報錯 → identity 加一行 `...(c.genreException ? { genreException } : {})`（加法、不影響既有批）。
- **30177 去重與寫入**：盤層去重同 sf02 30277（0 撞）。prepare gate 0 error → card_catalog 36／36 → KV 47 鍵（stamp 202610300331）`Success!`、回讀逐字一致 → preview／Apple 網址／runtime map → seed +36 → seed genres → mark published → **published gate 0 error**。
- **30178 子曲風**：warm-batch tagged 26／empty 10；`genre-l3-artist-map.json` 補宮沢明子（classical-era）、Corporate（breakbeat）、Arthur Flink & Son of Chi（jazz/contemporary/euro）、Misc（nu-jazz）、汁橙（hiphop/asia-rap/tw-cn）、AGP（psych）；`rock-asia-country-map.json` 手寫冠宇、青春大衛、烏賊紳士 tw → 35／36 落位。**Bent Fabric《The Happy Puppy》未落位**：主類型 pop、pop 下無 easy listening／鋼琴輕音樂節點，硬掛會錯，留空（卡仍可依主類型抽到）。
- **30179 藝人介紹**：36 張扣掉 VA 與已有介紹的 Richie Beirach、椎名林檎、陳奕迅 → 30 位寫進 `roster-sf01.json`，progress.json 追加 **ar-d-201**（state cut）。
- **30180 情緒評分**：score-sf0102（同 sf02 30280）。

### 本批新藝人（無介紹）
The RH Factor、Albert Mangelsdorff Quintet、Czarface & Ghostface Killah、Bent Fabric、Klimeks、Corporate、Kay Hoffman、Dome、Toshinori Kondo, Eraldo Bernocchi & Bill Laswell、Dezső Ránki、Derya Yıldırım & Grup Şimşek、Arthur Flink & Son of Chi、Meiko Miyazawa 宮沢明子、Manfred Reuthe、Misc、İdil Biret、John McLaughlin & The One Truth Band、Project Pablo、冠宇、張震嶽、My Sleeping Karma、Bardo Pond、人間椅子、Bardo Pond, Acid Mothers Temple & Guru Guru、Juzzy Orange & GoodieK、Smasher、蕭亞軒、Drive Like Jehu、青春大衛、烏賊紳士（30 位 → ar-d-201）
