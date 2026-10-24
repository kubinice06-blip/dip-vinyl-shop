# add-20261024-mc48 裁定（情緒薄格策展線・冷冽：美國當代作曲尖細）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 15 輪（全線最後一個工作階段，做完暫停盤點），本工作階段負責 ml59、mc48。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc48 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc48.json`（50 張）→ 主線汰 5（`master-override-mc48.json`）→ `master-mc48.json`（MB 釘住 10、§1 人工 35）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261024-mc48-cards.json`（45 張；研究 a–e 各 9）。
> **預留：研究 a 22441–22450、b 22451–22460、c 22461–22470、d 22471–22480、e 22481–22490、鉤子 22491–22500、寫作 22501–22510、主線 22511–22520。**
---

## 主線策展（不佔條號）
- 策展 50 張（目標 54，主場景到此見底，未湊數）：uptown-solo 25、uptown-chamber 13、uptown-quartet 10、擴寫（美國新複雜／Schoenberg 美國期）2。moodGuess x 3.4–3.6、y −0.7～−0.3、z −1.6～−1.3，邊距 50/50 過。去重擋掉的大名：Carter（Juilliard、Arditti、Pacifica、Rosen、Oppens、NEM、GCM《Eight Compositions》）、Babbitt（Taub、《Occasional Variations》、《Philomel》）、Wolpe（GCM、Holzman）、Wuorinen（《Six Trios》、Brentano）、GCM《Sessions》、Davidovsky、Eckardt 既有盤。
- 池中同作曲家錨點：Carter 室內樂 x 3.3–3.8 全落冷冽（Arditti 2&3 x 2.7、NEM 協奏 x 2.7 例外）；Holzman《Wolpe: Compositions for Piano》x 2.9 落平靜；Pollini《Schoenberg: Piano Works》x 2.2；Crawford Seeger《Portrait》x 2.3；Babbitt《Philomel》x 2.6（人聲＋磁帶）。
- **主線汰 5**：Paul Jacobs《Carter: Sonata for Flute, Oboe, Cello & Harpsichord / Sonata for Cello & Piano》（1948 大提琴奏鳴曲約 21 分鐘占半張、抒情、低音樂器）、Robert Black《Shapey: Fromm Variations》（和弦厚重，y 風險）、GCM《Druckman: String Quartets nos. 2 & 3 / Reflections…》（馬林巴獨奏約 15 分鐘，打擊占四分之一）、Madge《Wolpe: Piano Music》（池中 Holzman 同作曲家鋼琴盤 x 2.9 判靜，且含爵士節奏小品）、Fred Sherry SQ《Schoenberg: String Quartets nos. 3 & 4…》（擴寫；池中 Schoenberg 器樂 x 2.2 判靜，慢章兩段）。
- 掛名／盤名改（`master-override-mc48.json` fix）：New Music Concerts 盤名改「Carter: 100th Anniversary Release」（MB 原名拼作 Elliot）；Helps／Zukofsky／Wuorinen 合掛名改「Robert Helps, Paul Zukofsky & Charles Wuorinen」；Robert Miller／CCP 改「Robert Miller & The Contemporary Chamber Players」（掛名不用斜線，id 會被改寫）。
- 交研究層把關：Orion《Kirchner: Complete String Quartets》第三號含電子磁帶約 16 分鐘；Ars Combinatoria《Babbitt: String Quartets》自發數位盤，確認非現場；GCM《Martino》1994 Discogs 標 Remastered，確認非舊錄音重發；Seelye《Sheer Pluck》末曲含磁帶 11 分鐘；Continuum《Enactments》三鋼琴可能判厚；Emerson《Imbrie / Schuller》抒情慢段；Chang《Transformations》Sessions 慢章；Crawford 四重奏第三樂章慢段。**聲音明顯不符（現場、大編制、電子／打擊占大段、抒情／極弱占大段、低音樂器獨奏）直接在報告列「moodGuess 存疑」，主線汰換。**

## 研究 d 組
- 22471：全組 9 張 status 皆 thin。原因：聲音面（樂評、樂曲說明）在可達來源（Discogs API、維基、Dantalian 目錄）幾乎沒有；只有編制、時長、錄音地點日期有來源。AllMusic 403、New World 官網 404、Kyle Gann 頁 404、NMBX 擋爬。
- 22472：Berger／Wolpe 盤掛名建議改 Arthur Berger / Stefan Wolpe（Discogs 主藝人）；Miller 只彈《Five Pieces》，CCP 只演《Septet》，Wolpe 兩首另為 Sherman、Harbison。原錄音為 Acoustic Research 1970 年前後版，1980 年為 New World 重發。
- 22473：GCM《Martino》1994 Discogs 標 Remastered，判斷為新錄音的母帶處理（唯一 1994 版本、Dantalian 目錄為首發盤），非舊錄音重發；Lubman 指揮卡單有記、來源皆無，寫作層勿寫。
- 22474：Wuorinen GCM 盤 curatorRisk 的『Cello Variations II 大提琴獨奏』未證實，Albany 另一錄音顯示為大提琴加鋼琴。
- 22475：Holzman 盤 Discogs 盤名只寫《Donald Martino》，沿用策展層拼接盤名。
- 22476：Cuckson 盤《Romanza》年份 Discogs 2002、維基 2000，寫作層不寫年份。Babbitt 第二號四重奏年份 Discogs 1952、維基 1954，寫作層寫『1950 年代初』。
- 22477：moodGuess 存疑清單：Berger／Wolpe（Septet 第二樂章 Sostenuto、短曲多）、Cuckson（Romanza 9 分半疑似抒情、獨奏小提琴占 3/4）、Holzman（Twelve Preludes 時長未標、可能含慢曲）、GCM Martino（打擊參與、13 分鐘無伴奏長笛）；其餘低風險。無現場錄音、無電子磁帶、無低音樂器獨奏占大段（Cello Variations II 僅 7 分 25 秒）。

## 研究 c 組
- 22461：c 組九張身分全部核對 Discogs（2769054、14302603、8615909、13560497、14631711、3705952、11584076、11338478、7383133），盤名、年份、廠牌與卡單一致，無推翻；Todd Seelye 盤 Discogs 正名僅《Sheer Pluck》，卡單盤名帶作曲家列表，建議主線縮短。
- 22462：Wuorinen GCM《Chamber Works》是否現場：1988-11-25 單日在國會圖書館 Coolidge Auditorium 錄成（Elite Recordings 製作），New World 頁面與解說皆未說明現場與否，facts 不寫現場，notes 列風險。
- 22463：Ars Combinatoria Babbitt 為棚內製作（Andrew Munsey 錄音混音母帶），非現場；Carlson 頁面未標錄音場地與日期，年份只採 Discogs 的 2017-12-12 數位發行日。
- 22464：Seelye 末曲 Morris《To the Nine》Discogs 作者欄標 Tape，11 分 19 秒，約占全盤 78 分鐘的 14%，判定電子占比小，不汰換。
- 22465：Continuum《Enactments》三台鋼琴 31 分 29 秒（全盤約 41 分鐘的四分之三），編制仍屬小編制，無打擊、電子、低音樂器，僅標 y 厚度風險。
- 22466：Shapey 四重奏第七號 LP Discogs 未標各樂章與總長，策展推估 30–40 分鐘查無來源，不寫；status 標 thin（聲音描述查無獨立樂評）。
- 22467：moodGuess 存疑清單（中度）：Wuorinen《Chamber Works》（Third String Quartet 29 分鐘占 44%、自述從容、密度遞減、聖詠材料；Wuorinen 自述風格轉向音高中心、拍點更清楚；Fast Fantasy 有安靜中段）；Wolpe Vol. 4（雙簧管奏鳴曲 1937–41 早期，含 Molto adagio 5 分 40 秒；四重奏含 Quiet 樂章 8 分 13 秒與 Early Morning Music；三組錄音來自電台與文化中心）。輕度：Ars Babbitt（第六號被維基形容為寬廣抒情）、Seelye（Mamlok、Carter 小品）、Shapey SQ7（Largo、Passacaglia 約占一半）、Cuckson 兩盤（Cantabile、Bel Canto 短段）。
- 22468：無明顯不符：Goldray Babbitt 鋼琴（四首鋼琴獨奏，棚內分兩階段，1996-07 與 1997-01 於 Taplin Auditorium）；Cuckson 第二輯（Bard Sosnoff Theater 2010-01-04/05 棚內，非現場）。
- 22469：Goldray 的個人資料僅 Discogs 一句簡介，人物事實以 Babbitt 與錄音情況補足，status 仍標 full。

## 研究 e 組
- 22481：e 組九張皆確認為棚內錄音，Discogs notes 無現場註記；Feinberg 盤是 1994 年 12 月與 2003 年 6 月兩批錄音拼成；Macomber 為 1987／1991 年 Purchase 演奏廳；Composers Quartet 為 1988／1989 年 Purchase。
- 22482：全組無電子、磁帶、打擊占大段；唯一電子是 Sollberger 雙 LP 的 Trombly《Kinetics III》8 分 19 秒（約 77 分鐘的 11%）。Sollberger 雙 LP 並非全盤長笛獨奏（另有 Sophie Sollberger 長笛、Blustine 單簧管、Benjamin 小提琴、Wuorinen 鋼琴），Discogs 不分曲，寫作層不斷言哪首配哪件。
- 22483：moodGuess 存疑（輕度）清單：Taub CRI 461（Kirchner 奏鳴曲 Lento／Adagio 兩個慢樂章加 Bartók Sostenuto e pesante、Babbitt 第二首 ♩=54、Shifrin 中段漸慢）；Emerson Imbrie／Schuller（Imbrie 解說稱 restrained lyricism，各樂章速度查無）；Macomber Soliloquy（Sessions 33:46 占 51%，樂章速度查無；Hoffman、Adolphe 的速度查無）；Alan Marks（Boulez Lent、Sessions Lento ♩=50、Chávez Lentissimo 與 Adagio，快慢約各半）；Robert Black（無任何聲音面來源，Weber 被評抒情）。
- 22484：Robert Black 的 CRI SD 481 標 thin：聲音面無來源。Discogs 的 Robert Black (4) 是鋼琴家（1950–1993），不是低音提琴手 Robert Black（1956–2023），寫作層勿混。
- 22485：Weber《Variazioni quasi una fantasia》維基作品表寫 harpsichord、op.65、1974，與 Discogs 登記 Robert Black 彈鋼琴不一致；facts 兩邊各寫，寫作層不寫該曲樂器。Gideon《Sonata》年份（維基列 1983）與 1982 年錄音矛盾，不寫。
- 22486：Carter 第四號的「題獻給 Composers Quartet」只見於 Composers Quartet 維基條目，Carter 第四號條目只寫首演；facts 只寫首演。Discogs 盤名《Three American String Quartets》與 Babbitt 維基的《Three Contemporary American String Quartets》不同，以 Discogs 為準。
- 22487：Macomber 盤的 Bruce Adolphe 是否即 Soliloquy 作者無法由來源直接證明，facts 以同名引述並在 notes 提醒；Joel Hoffman 無來源，不寫生平。American Record Guide 稱讚為 Macomber 自己簡介轉述，facts 已標宣傳性質。
- 22488：Sollberger 的 WebSearch 之外，本組共用 4 次 WebSearch（超過每支 3 次的上限一次；已停手，其餘全走 Discogs API、Wikipedia 與 New World Records 頁）。
- 22489：未推翻策展層任何年份、廠牌、掛名；補了 Feinberg 兩次錄音年份、Chávez Estudio 時長、Emerson 盤 CD 重發編號。

## 研究 a 組
- 22441：Babbitt《Soli e Duettini》Koch 1996 版（Discogs 2943289）是雙 CD 約 108 分鐘，含〈Four Cavalier Settings〉與 Babbitt 22 分鐘談話；MB RG 的 Naxos 8.559259（2006）九軌約 75 分鐘、無談話。同一批 1994–95 錄音、盤名兩版皆成立；facts 兩版事實分開寫，notes 要求寫作層只寫兩版共有曲目。
- 22442：Soli e Duettini 演奏者逐軌取自 MB recording 關係（圓號 Purvis、薩克斯風 Taylor＋鋼琴 Abramovic、長笛 Rudich、小鼓 Jarvis、馬林巴 Kolor、中提琴 Martin、長笛＋吉他、小提琴 Macomber）；打擊獨奏約 8 分鐘（占約 11%），不汰換。
- 22443：Juilliard《Lerdahl／Martino》Discogs notes 明載兩首皆現場演出（1985-03、1986-04），MB 沒標；列「moodGuess 存疑（現場）」，建議主線汰換。
- 22444：Chang《Transformations》來源一致寫抒情、溫柔、溫暖（Sessions 奏鳴曲 Adagio 9:14、Kirchner 二重奏細緻抒情段），列「moodGuess 存疑（中度）」，建議汰換或降 x。全盤實為約 63 分鐘（策展層寫 54）。
- 22445：Orion《Kirchner 全集》第三號原作為弦樂加電子磁帶（約 16 分鐘，軌長 15:59 吻合），這版是否放磁帶 MB／Discogs／Albany 皆未答，未證實；加上三個 Adagio 約 16 分鐘（26%）與『安歇之島』評語，列「moodGuess 存疑」，建議汰換。
- 22446：Hudson／Ohlsson 曲目與策展層 curatorWhy 不符（實際：Blue Bamboula、Six Pieces、Spinoff、The Long and the Short、Fantasia；非 Duo、Violin Variations）。〈Blue Bamboula〉11:28 是鋼琴獨奏；〈Spinoff〉6:35 含低音大提琴與康加鼓；皆非大段，不汰換，寫作層以實際曲目為準。
- 22447：Asakawa 與 Swann 兩張僅 MB／維基一兩源，標 thin。Night Fantasies 以安靜夜曲段開頭並回返（維基），Boulez 第三號 Tropes／Miroir 逐段力度查無來源；兩張各列輕度存疑，建議評分時聽 Night Fantasies 與 Boulez 兩個 Miroir 確認。
- 22448：Fine Arts Quartet 與 Composers Quartet 兩張未見現場、電子、打擊、慢章大段證據，無存疑；Composers 第一號含 Adagio，占比未能細算，輕度。Babbitt 三號維基『18 分鐘以上』與唱片面長 21 分有差，facts 寫『約 21 分鐘』。
- 22449：Albany 官網評論欄文字無出處標示，facts 一律寫『有樂評』或轉述，不點刊物；Fanfare 之名已自 Chang 稿移除。
- 22450：本組 WebSearch 用 3 次（Kirchner 兩次、Asakawa 一次），其餘走 MB／Discogs API、Wikipedia、Albany／Bridge／Naumburg 頁。未推翻策展層年份、廠牌、掛名；僅推翻 Hudson 曲目描述與 Chang 時長（54→約 63 分鐘）。

## 研究 b 組
- 22451：Carter《100th Anniversary Release》Discogs 記事載明第 1、10、2、5 首為現場錄音（約 34 分鐘、過半張），MB 沒標 Live；Dialogues 含鋼琴約 19 人、Mosaic 8 人，兩首大編制；Figment 兩首大提琴獨奏、低音單簧管。moodGuess 存疑（現場過半、大編制）。各來源作曲年不一（Mosaic 2004／2005、Gra 1993／1994），facts 未寫作曲年。
- 22452：Speculum Musicae／Martino／Wuorinen（Nonesuch H-71300）身分對上；兩首為 1972 Naumburg 首獎附帶委託作品。Notturno 編制各源不一（五人或七人含打擊），facts 寫「為主」。Notturno 帶 Dallapiccola 式抒情，慢段比重未查到，輕度存疑。
- 22453：Speculum Musicae 十五週年盤（Bridge BDG 2005）身分對上（NYPL 目錄與 Discogs 同載三首時間）。Spinoff 實為小提琴、低音提琴、打擊三重奏約 6.6 分鐘（解答策展層「編制待查」）。Lieberson《Lalita》與 Shifrin《The Nick of Time》各約 19 分鐘，編制與速度查不到，標 thin；慢段風險未排除。
- 22454：Eckardt《Passage》身分對上。主題為 CIA 感官剝奪，Testify 25 分鐘，可能有大段極弱或持續音；三部曲動態描述查無，標存疑。維基不稱 Ferneyhough 為師承，只寫新複雜主義。
- 22455：Sessions／Wuorinen LP 身分對上。Sessions 第三號奏鳴曲第一樂章多弱奏、音域在中央 C 以下（DRAM 引 Helps），搜尋摘要稱兩個克制的慢樂章夾詼諧曲，末樂章為甘迺迪輓歌；A 面 23 分鐘慢弱占比高，列 moodGuess 強存疑。Wuorinen《Duo》寫於 1966（New World 頁）。
- 22456：Zukofsky／Sessions／Blackwood（CP²/1、1976）身分對上，錄於華府國會圖書館（Discogs Recorded At）；Blackwood 第二號是 Op. 26（1975），非 Op. 7。是否現場未能查到，推定另行錄音。四個相連樂章的速度比重未查到。
- 22457：Holzman《Sessions & Shapey》身分對上；推翻策展層「Sessions 第一號仍為不協和寫法」：樂評稱其抒情、蹦跳、明亮，最調性（有調號）。第三號第一樂章多弱奏低音域。Mutations 內向。moodGuess 強存疑，建議降級或汰換。
- 22458：Skouras《Wuorinen: Chamber Music》身分對上（BR 2010 錄音室、NEOS 2016）。全為獨奏或二重奏，無電子打擊，低風險。作品獻詞取自作曲者目錄 PDF（stokar.com）。Six Pieces 時間缺。
- 22459：Parnassus（New World NW 306、1980）身分對上；策展層「Parnassus 首張 New World」與創團年 1969 查無來源，維基寫 1974。名單約 20 人輪替、兩位打擊、低音樂器多，Lundborg 與 Olan 兩首幾乎查無資料，標 thin；編制偏大，列弱項。
- 22460：本組 WebSearch 約 8 次，其餘走 MB／Discogs API、Wikipedia、Naumburg、New World、Bridge、MusicWeb 與作曲者目錄 PDF。

## 主線研究汰換（不佔條號；2026-10-24）
研究層交件後照各組「moodGuess 存疑」汰 14 → 定案 31（研究 a 6、b 5、c 7、d 8、e 5）。被汰卡移到 `dropped-cards.json`／`dropped-research.json`。
- **現場**：Juilliard SQ《Lerdahl / Martino》（Discogs notes 明載 1985、1986 音樂會實況）、New Music Concerts《Carter: 100th Anniversary Release》（半張現場＋《Dialogues》約 19 人編制、大提琴獨奏 10 分鐘）。
- **抒情／慢章占大段**：Chang《Transformations》（樂評一致寫抒情溫柔，Adagio 9 分鐘）、Orion《Kirchner: Complete String Quartets》（三個 Adagio 約 26%＋第三號磁帶 16 分鐘）、Holzman《Sessions & Shapey》（Sessions 第一號有調號、樂評稱明亮抒情）、Helps／Zukofsky／Wuorinen LP（A 面 Sessions 第三號兩慢章夾詼諧曲、輓歌終章）、GCM《Wuorinen: Chamber Works》（第三號四重奏 29 分鐘密度遞減、作曲家自述轉向音高中心）、《Stefan Wolpe Vol. 4》（1937–41 早期雙簧管奏鳴曲＋Quiet 樂章）、Taub（Kirchner Lento／Adagio、Bartók Sostenuto）、Alan Marks（Boulez 第一樂章無脈動、Sessions Lento、Chávez Lentissimo，快慢各半）、Emerson《Imbrie / Schuller》（restrained lyricism）、Robert Black（零聲音來源，Weber 樂評稱抒情）。
- **大編制／打擊／低音**：Parnassus《Parnassus Plays》（約 20 人輪替、兩位打擊、低音管群；廠牌稱 rich、rollicking）、Robert Miller & CCP《Berger / Wolpe》（Septet Sostenuto；四組演奏者分散，掛名也不成立）。
- 研究推翻併入卡單之外的事實：Hudson & Ohlsson 盤曲目為 Blue Bamboula／Six Pieces／Spinoff／The Long and the Short／Fantasia（寫作照研究稿）；Soli e Duettini Koch 1996 雙 CD 與 Naxos 2006 同一批 1994–95 錄音，寫作只寫共有曲目；Blackwood 第二號奏鳴曲 Op. 26（1975）；Parnassus 創團 1974（已汰）。
