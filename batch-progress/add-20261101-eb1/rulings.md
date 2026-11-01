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

## 鉤子層（a、b、c）（47051–47055）
- **47051** 交件：`desc-tools/batches/hooks/add-20261101-eb1-hooks-{a,b,c}.json`（各 8 張，key／順序照研究稿）。預算公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；上限 full 230／thin 170（status 照研究稿）。逐筆預算（hook 原始字元／加權）：a1 230（28／25）、a2 228（24／22.5）、a3 thin 167（29／23.5）、a4 226（25／25）、a5 208（30／24）、a6 206（27／22.5）、a7 226（26／23）、a8 thin 165（26／23.5）；b1 214（30／24.5）、b2 214（21／21）、b3 thin 156（23／23）、b4 220（26／23）、b5 229（20／20）、b6 224（18／18）、b7 thin 166（25／23）、b8 223（22／22）；c1 223（23／23）、c2 thin 170（17／17）、c3 thin 164（30／22.5）、c4 thin 166（24／24）、c5 thin 165（28／21.5）、c6 thin 162（21／21）、c7 thin 170（30／27）、c8 thin 163（24／22.5）。初稿 18 張超標，全部整格捨去（Willi Fruth、系列延續到 1980 年代、Music Regular 評語、Hampton 同台、Nodul 前線人名、〈Iarna, Iarna〉、〈Killing Me Softly〉、All Stars Big Band、Mingus 曲、Red Mitchell、Leo Feigin 製作、〈Transylvanian Suite〉曲長、〈To Mircea Eliade〉、〈Bride's March〉、Edelhagen 首席、Gojković 求學年、〈Summertime〉、〈Ružan San〉等），壓完後逐張回核 hook 依賴格都在 g1／g2 或 hook 本身自足（b6 年齡兩段只在 hook）。
- **47052** 骨架歸屬（24 張 24 條，各張 note 只寫自己的歸屬句）：a1 離鄉那年的西德錄音；a2 系列第 1 號；a3 鄰國廠＋匈牙利語名序；a4 咖啡館駐場班底進錄音室；a5 建築師本業；a6 曲名借探險文學（Kon-Tiki／尼莫船長）；a7 母語唱 swing、民歌入七重奏；a8 英語流行／靈魂翻唱；b1 廠內管弦樂團老團員領銜；b2 鋼琴與鼓手輪替；b3 外國評論人給的封號＋擴編七人；b4 外國人移入布加勒斯特；b5 配器家把民間樂器帶進輕音樂（筆名）；b6 童年小提琴改排簫；b7 指揮之子的作曲盤；b8 鐵幕現場交倫敦廠發行＋自費空白卡帶重發；c1 圖書館爵士俱樂部主持人＋人人兼民間樂器；c2 大學爵士系創辦人；c3 論文寫 Parker、曲名取自羅馬尼亞各地；c4 旅外小號手回貝爾格勒、同台全美國人；c5 菜單上簽的推薦信（據報導）；c6 四把小號；c7 標準曲配本地譯名（Weill 主題）；c8 法國客帶隊、B 面全本地作曲。「國營廠」「鐵幕下的爵士」不當任何一張的骨架，note 全批不出現「國營廠」。
- **47053** 同藝人分軸與「他／她」引入法：**Kőrössy**（a1／a2／a3）——a1 外人之口（Connover 評語）＋錄音地與移居年；a2 樂器分派（「彈鋼琴的是 Körössy」）＋電台音樂廳與系列號；a3 生年與出生地（「他 1926 年生於 Cluj」）＋匈牙利名序與東歐受讚賞。**Popp**（a5／a6）——a5 生平（Sibiu、建築學院、1964 登台）＋廠牌關係句；a6 著作句（和聲書）＋曲名與前線。**Aura**（a7／a8）——a7 名字＋早年唱流行歌、1966 劇場節目；a8 出道年份（「1959 年，她…」）＋1972 卡內基。**Răducanu**（b2／b3）——b2 本名＋布勒伊拉；b3 外號＋「他出身羅姆人音樂世家」。**Tîrcolea**（b5／b6）——b5 只當排簫獨奏、主體歸 Tavernier；b6 器物（三種排簫）＋生平。**Tavitian**（b8／c1）——b8「由…組成」二重奏＋Leo／卡帶；c1 族裔＋圖書館俱樂部。**Goykovich**（c4／c5／c6）——c4「是…人」出身＋1956 赴西德；c5「領軍的…是」＋伯克利推薦信；c6「合組」＋與 Kovačev 共同領軍。第二句句型 24 張逐張配死（稱／彈…的是／他＋生於／讀的是／在…裡是常客／寫過…的／名字＋早年／年份逗號／吹…的＋生於／本名／他出身／先後待過／掛的是／在盤上吹／這位…叫／由…組成／族裔的…生在／…的，正是／她叫／是…人／領軍的…是／合組／封面寫的是／是…的法國鋼琴手）。
- **47054** 日期「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：a1 日在、b6 日開／日收、b8 日布／日錫、c1 日至（「10 日進」）、c4 日與（避開 d6 的日錄）；c6「16、17 日兩天」、c7「14、15 日於」、c8「4、5 日由」不被尺掃到但照樣一張一形；其餘只寫到年月。hook 開頭前四字對已交的 37 張互異，並對 repo 內全部既有 hooks 檔掃過一次（改掉撞 md5／c55／mc5／c65／c131／c140 的六個開頭）。hook 間中文 4-gram 只剩地名「羅馬尼亞」「布加勒斯特」「貝爾格勒」「南斯拉夫」與樂器「薩克斯風」；拆掉「亞四重奏」（a4×e3）、「支羅馬尼」（a4×b5）。hook 與 note 無逐字重複子句（≥6 字掃過）。
- **47055** 研究層禁區照辦：a3 不寫成員、俄文標籤、出口市場、布達佩斯；a4 只寫「三重奏夥伴也列在本盤」，不寫曲名對應具體頌歌；a6 不寫合成器、不延伸 Transferred By；a8 不指原唱；b1 不寫 B 面作曲；b2／b3 不寫 Seria Jazz 序號、不寫「民謠旋律」；b4 唱片行文案不具名；b7 不寫用戶留言；c1 不寫 Eliade 與專輯名關聯；c2 不寫辭世；c4 不寫 Woody Herman、Pierce 不點名；c5 不寫 Clarke-Boland 前身、軼事加「據報導」；c7 不點名 Sydow／Hoitz、不寫 Roković 國籍；c8 只點名 Dieval 與 Sađil／Ivanović。媒體名（POPMATTERS、Music Regular、Vreme、Dusty Groove、DownBeat）不進 note；b3 改寫成中文「羅馬尼亞爵士先生」以消 qa-batch 互指。腳本：`qa-batch hooks` a–c 0 標記（總標記 3 皆 e 組漏卡，另一位未交完）；`chk-hook-crossgroup` ✓ 全部通過。
