# add-20261101-eb1 裁定（鐵幕爵士＋MPS 策展線・Kőrössy＋羅馬尼亞＋南斯拉夫＋保加利亞）

> 店主 2026-11-01：「Yancy Körössy* - Identification 收錄 並且擴展相關專輯」→「擴張到 200 張」（交接 `batch-progress/eastbloc-jazz-20261101/PLAN.md`）。本工作階段負責 eb1、eb2。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-eb1a.json`（23：Kőrössy＋羅馬尼亞）＋`curation-eb1b.json`（25：南斯拉夫＋保加利亞＋羅馬尼亞剩餘）→ 主線汰 8（`master-override-eb1aeb1b.json`）→ `master-eb1aeb1b.json`（40 張：MB 釘住 20、§1 人工 20）→ `pick.json`（40）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261101-eb1-cards.json`（40 張；研究 a–e 各 8）。
> **預留：研究 a 47001–47010、b 47011–47020、c 47021–47030、d 47031–47040、e 47041–47050、鉤子 47051–47060、寫作 47061–47070、主線 47071–47080。**（eb 線條號：ebN → 47001＋(N−1)×100 起，每批 80 條。）
---

## 主線策展（不佔條號）
- **策展 48 張 → 收 40 張；對 seed 與 origin 163 條 main／claude/* 分支 seed 去重 0 撞**（eb1b 自己剔除池中已有的 Leb i Sol《Leb i sol》）。
- **Kőrössy 統一掛名「Yancy Körössy」**：MPS《Identification》封面掛名；Electrecord《Seria Jazz Nr. 1》原掛 Jancsi Körössy、Qualiton 1964 原掛 Kőrössy János，三者同一人（匈牙利裔羅馬尼亞鋼琴手），原寫法放 queryAlias。《Identification》國別改 ro（藝人所屬場景；發行地西德寫在研究稿）。
- **《Identification》、《Seria Jazz Nr. 1》、Răducanu《Jazz în Trio》的 MB release-group 首發日是重發年**（2006 日本 CD、2011 數位重發），曲目經策展核對與原盤一致，照釘；年份填原盤首發 1970／1965／1967。
- **主線汰 8**：Aura Urziceanu《Aura》（1973，Discogs 標 smooth jazz，Aura 另收兩張）、Brigitte Petry／Oschanitzky 1966（流行舞曲人聲，爵士純度不足）、《Conexiuni Bop》（兩團各一面的 split 盤）、Tone Janša《Beogradski Jazz Festival '78》（音樂節現場、非其代表作，不開例外）、Jazz Quintet《Idea》（團名通用、成員資料薄）、Lyudmil Georgiev《Midnight Hour》（輕爵士）、Răducanu《Confesiuni》（第三張，Răducanu 已收兩張）、Trio Manusardi《Impresii din Vacanță》（Manusardi 另收 1968《Free Jazz》，義大利人只留一張）。
- Goykovich 1961 PGP 10 吋八重奏盤（與 Kenny Clarke）：策展填了 releaseException，主線清掉——10 吋六首是當時國營廠正規專輯形式，不是例外。1961「sastanak u studiju」系列另兩張（Roković、Dieval）同理照專輯收。
- 移民西方後的錄音（Goykovich MPS／Enja、Jazz Focus '65 MPS 盤、Roković《Ultra Native》、Vapirov Leo 盤）留給 eb5／eb4。

## 研究 a 組
- 47001：研究稿 `desc-tools/batches/research/add-20261101-eb1-a.json`（8 張）。Discogs API（master／release／artist）直連可用；維基 ro／en 用 `index.php?action=raw`（標題需 URL 編碼）；WebSearch 用 3 次（Weiner、Popp、Urziceanu 各一），另取 PopMatters、Sonar Kollektiv、Music Regular 三頁。
- 47002：身分核對 8 張盤名／年份／廠牌皆與卡單一致，無推翻。Seria Jazz Nr. 1 年份：Discogs 1965（錄音 1965-08、發行 1965-12）、羅馬尼亞維基寫 1966，照 Discogs 1965。Spirale：羅馬尼亞維基寫 1977，Discogs／MB 為 1976，照 1976。Nodul Gordian：維基寫 1983，Discogs／MB 1984，照 1984。
- 47003：《Kőrössy János És Együttese》Qualiton 1964 判為 thin：Discogs 無樂手 credits，樂團編制不明，facts 不寫成員；hook 已去掉「俄文標籤」與「出口市場」之類推測。《Oh, My Love》判 thin：只知 Orchestra Electrecord／Ron Rully 指揮，無樂手清單、無獨立樂評。
- 47004：moodGuess 存疑：Marius Popp《Nodul Gordian》（預估合成器；Discogs credits 只有鋼琴與電鋼琴，無合成器）。其餘 7 張無異議。不建議汰換。
- 47005：Aura《Oh, My Love》曲目為流行翻唱（含三首葡語曲名 Canto Triste／Reza／Dindi），原唱者未逐首查，facts 不指原唱。
- 47006：Weiner 四重奏成員取自 Discogs credits；維基只確認 Flora 咖啡館三重奏班底（Hromadka、Kamocsa、Butoi），兩者重疊但未見來源直接說明，寫作層宜保守。

## 研究 c 組
- 47021 Tiberian《Alone in Heaven》moodGuess 存疑：策展寫「獨奏鋼琴」，Discogs credits 是鋼琴＋薩克斯風＋貝斯＋鼓四重奏；錄音 1996 年 11 月、1998 年發行。
- 47022 Trumpets & Rhythm Unit moodGuess 存疑：策展寫「雙小號」，實際前線四把小號（Gojković／Fidri／Ugrin／Gut），Roković 全程電鋼琴；專輯 1979 年 5 月發行、3 月 16–17 日貝爾格勒錄。
- 47023 Gojković《Belgrade Blues》：1966-05-19 貝爾格勒錄、1967 發行（LPV 4201）；陣容是美國獨奏家（Nistico／Fontana／Pierce／Moore／Zito），Gojković 1956 起住西德，不是「在地南斯拉夫樂手」。Pierce 掛名單一來源；Herman 樂團成員說法未核證，未寫。
- 47024 Roković《III》與 Dieval《II》：Discogs 演奏者欄有可疑人員（Roković 盤的 Sydow／Hoitz；Dieval 盤列了五人卻稱四重奏），無第二來源，facts 用「Discogs 列出」保守寫，notes 要求寫作層不點名。
- 47025 國營廠盤（Gojković 1961、Roković、Dieval、TRU、Belgrade Blues）皆只有 Discogs＋編制／曲目／風格標籤，無樂評音色，status 全標 thin；Roković 生平查無可信頁，未寫。
- 47026 Parghel／Tavitian／Tiberian 身分與年份、廠牌（NABEL 4656／Casa Radio DDD 014／Intercont IMCD 1128）全部對上，無推翻。Parghel 只列 Vocals, Piano，是否另有伴奏未知；Discogs 簡介裡被拿來比較的歌手只剩連結代號，不寫名。
- 本組 8 張：full 1（Tavitian）、thin 7；推翻策展層 0 處，moodGuess 存疑 2（Tiberian、TRU）。

## 研究 e 組
- 47041 全組 8 張身分（盤名／年份／廠牌／目錄號）對 Discogs release 全部相符：Ugrin（LD 0479, 1979）、Gut（PGP RTB 2122596, 1987）、Jazz Focus 65（BTA 1006, 1967）、Septet Rousse（BTA 10490, 1980，MB RG 相符）、Denev（BTA 10449, 1980）、Nikolov（BTA 10359, 1979）、Focus Jazz Quartet（BTA 11676, 1986）、Spassov／Moutafchiev（ВНА 12215, 1986）。無年份或廠牌推翻。
- 47042 推翻策展層 2 處：(a) Focus Jazz Quartet 非「Jazz Focus 65 後繼」（成員為 1980 年代 Donchev 世代，唯 Simeon Shterev 兩團皆有；facts 不寫後繼）；(b) Jazz Focus 65「Balkanton 首張正規 LP」查無來源，未採信。另 Spassov「民謠融合爵士的起點」亦未採信。
- 47043 Jazz Focus 65：BTA 1006 vs 搜尋摘要另有 BTA 1098／1966 之說，Discogs 僅 1967，採 1967（4 月 Bulgaria 音樂廳現場）。樂手列名僅出自 alo.bg 二手商品頁（單源），寫作層需謹慎。與 MPS 西德盤（eb5）不同。
- 47044 moodGuess 存疑：Spassov／Moutafchiev《The Long Road》—— 盤中過半是民歌合奏團管弦與合唱，爵士只佔 A 面後段與 B 面開頭，爵士純度低，主線請考慮是否保留；Septet Rousse —— 電聲配置，可能比「自由」更近融合（輕度）。
- 47045 本組 8 張：full 1（Ugrin）、partial 5（Gut、Rousse、Denev、Nikolov、Spassov）、thin 2（Jazz Focus 65、Focus Jazz Quartet）。國營廠盤皆只有 Discogs 加維基（sl／bg／sr／en）與 BNR／BTA 摘要，無樂評；聲音事實以編制、器材、曲長、Discogs 風格標籤為主。

## 研究 d 組（47031–47040）
- 47031：輸出 `desc-tools/batches/research/add-20261101-eb1-d.json`（8 張）；status：Jazz Orkestar RTB full、Marković-Gut partial、Balkan Impressions partial、Izvorni folklor partial、Blue Sunset full、Zagreb JQ full、Toranj 77 thin、Birdland thin。
- 47032：Marković-Gut：Stjepko Gut 是小號手（Discogs、en 維基），非策展卡單所稱長號；Marković 次中音薩克斯風。已寫入 notes。
- 47033：Birdland：Discogs 團頁稱 1978 年春在瑞士伯恩由南斯拉夫留學生組成，非貝爾格勒本地團；country yu 保留，簡介不得寫貝爾格勒團。moodGuess「電聲厚」存疑（credits 只有 Piano／Guitar，無電子樂器）。
- 47034：Izvorni folklor 年份三源不一（Discogs 1986／en 維基 1985／官網 1987），卡單照 Discogs 1986；Discogs 藝人欄掛 Branislav Kovačev，與 Lala Kovačev 同一人。
- 47035：Lala Kovačev 也是 1963 年 RTB 大樂團專輯的鼓手（Discogs credits、en 維基），兩張卡可互見，不算同構。
- 47036：Zagreb JQ：錄音 1965-04-09 西德 Walldorf、Fontana NL 發行，製作 Lippmann+Rau；hr 維基稱經紀公司 Fritz & Rau，寫作層只寫 Discogs 封底的 Lippmann+Rau。
- 47037：Blue Sunset：目錄號 Discogs LSY-63041／MB SY 63841 不一致，簡介不寫目錄號；客席 Clark Terry、Art Farmer、Ernie Wilkins、Albert Mangelsdorff、Gianni Basso 出自 Discogs credits。
- 47038：Toranj 77：hr 維基無條目，僅 Discogs credits，thin；「札格拉布」團所在地僅卡單說法，寫作層寫「克羅埃西亞樂手」。
- 47039：Wikimedia 對此環境大量回 429，維基以 WebFetch／WebSearch 補；WebSearch 用 3 次。無推翻盤名、年份、廠牌。

## 研究 b 組（47011–47020）
- 47011：輸出 `desc-tools/batches/research/add-20261101-eb1-b.json`（8 張）；status：Alter Ego／Jazz în Trio／Free Jazz／Panpipe／Zboruri／Tavitian 為 full，Jazz în Țara Mea、Baciu Jr. 為 thin。facts 8–10 條。全組只有 Discogs（API）＋少量維基／Sonar Kollektiv／Dusty Groove 轉述，無樂評，聲音事實僅編制、曲長、風格標籤。
- 47012：身分全部對上，無推翻盤名／年份／廠牌。Baciu Jr.（manual）：Discogs master 999185／release 2413094，1981-11、ST-EDE 01896 與卡單一致；第二來源仍只有 Discogs 體系（藝人頁、Alter Ego credits 交叉），Bandcamp／重發廠頁查不到，curatorRisk 未解除，待主線補。
- 47013：年份衝突兩處，皆不改卡單：(a) Răducanu《Jazz în Țara Mea》en 維基寫 1967，Discogs／MB 為 1976，目錄號 STM-EDE 01186 與 1970 年代中期相符，採 1976；(b) Panpipe in Jazz ro 維基寫 1977，Discogs／MB 為 1979（01494 介於 1976 與 1981 之間），採 1979。另 Jazz în Trio 原盤為 10 吋 EDD 1164，Discogs 發行日 1967-11-03、錄音 1966（2011 重發盤註記），en 維基寫 1966，採卡單 1967；curatorRisk 的署名「Crețu Răducanu」不成問題（本姓 Răducan Crețu）。
- 47014：moodGuess 存疑：Manusardi《Free Jazz》（預估 z -1.2 無調；僅一份零售商文案稱偏抒情現代主義，2011 重發盤 Discogs 標 Post Bop，建議上線實聽打分）；Răducanu《Jazz în Țara Mea》（「民謠旋律」查無依據，且為七人三管樂團）；Panpipe（11 首中 6 首有女聲獨唱與合唱團，非純器樂）。其餘 5 張無異議，不建議汰換。
- 47015：Free Jazz 另有編號資訊：Sonar Kollektiv 稱 Seria Jazz Nr. 6、ST-EDE 01196，Discogs 為 EDD 1196；以 Discogs 為準。Dusty Groove 頁面 WebFetch 403，僅用 WebSearch 摘要轉述，已在 notes 標明。
- 47016：Alter Ego B 面作曲欄 Discogs 為 Unknown Artist，與搜尋摘要「八首皆 Mîndrilă 作曲」不一，facts 照 Discogs credits；RYM 年份 1978 不採。Tavitian 盤是 1985 年兩場現場、1986 Leo 發行，卡單 releaseException 已涵蓋，照卡單。
- 47017：WebSearch 用 3 次（Alter Ego、Manusardi、Baciu）；Wikimedia 對 curl 回 429，維基改走 WebFetch。Discogs 搜尋 API 不需 token 可用，藝人頁 profile 是最有用的人物來源。本組 8 張：full 6、thin 2；推翻策展層 0 處，moodGuess 存疑 3。

## 主線（條號 47071–47080）
- 47071：研究 d、e 組交了 8 張 `status: partial`（research-base 只認 full／thin），主線一律改 thin（d：Marković-Gut、Balkan Impressions、Izvorni folklor；e：Stjepko Gut、Septet Rousse、Denev、Don Juan、The Long Road）。`qa-batch research` 40/40、key 一致；唯一標記是 e 組 facts 內的保加利亞／塞爾維亞西里爾曲名，屬原文，寫作層不寫進正文。研究層 moodGuess 存疑 9 張（Popp《Nodul Gordian》、Tiberian、Trumpets & Rhythm Unit、Birdland、Manusardi、《Jazz în Țara Mea》、《Panpipe in Jazz》、Spassov、Septet Rousse）全部不汰（本線不做落格篩選）；Spassov／Moutafchiev《The Long Road》半張是民歌合奏與合唱，照民謠融合爵士收，genres 保留 jazz＋world 判斷待子曲風。
- 47072：封面。人工身分 20 張＋CAA 404 的 B.P. Convention《Blue Sunset》共 24 張取 Discogs master 主圖（`covers.json`，逐張 HTTP 200 image）；其餘 16 張 CAA release-group front 200。主線 2026-11-01 縮圖表 40 張逐張目視與盤名相符（Jazz Focus 65 的 Discogs 主圖是圈標中心貼紙＋放射紋封套，原盤即此形制，照用）。
