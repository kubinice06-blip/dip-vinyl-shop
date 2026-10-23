# add-20261023-ml54 裁定（情緒薄格策展線・恍惚：lo-fi／chillhop 第四波＋暖 dub 化 downtempo／jazzy instrumental hip-hop）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml54、md29；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml54 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml54.json`（54 張）→ `master-ml54.json`（MB 回查 54/54 釘住、0 flag）→ 主線汰 19 → `pick.json`（35）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml54-cards.json`（35 張；研究 a–e 各 7）。身分：MB 釘住 35、§1 人工 0。
> **預留：研究 a 20841–20850、b 20851–20860、c 20861–20870、d 20871–20880、e 20881–20890、鉤子 20891–20900、寫作 20901–20910、主線 20911–20920。**
---

## 主線策展（不佔條號）
- 策展 54 張全數 MB 釘住（Album、無 secondary type）：lofi-chillhop 21、korean-lofi 3（NOGYMX）、warm-downtempo 7、jazzy-ihh 8、dub-downtempo 11、warm-reverb-guitar 4。moodGuess x 1.8–2.7、y 0.8–1.4、z 0.5–1.0。策展對 seed 與全部 curation 去重 0 撞；主線另對 origin 所有 `claude/*` 分支 seed 與 10-22 起卡單去重 0 撞（同盤名不同人 5 筆，非撞）。
- 主場景見底：Sleepy Fish 五張全在 ml42、其餘 EP；Idealism《amaranthine》MB 為 EP、《nobody else》16 分；eevee beat tape 01–13 皆 <25 分且 Apple 未上架，只收《TIME.》；韓國 lo-fi 二線幾乎全 EP 長度，只收 NOGYMX 三張。不足處往擴寫場景補（dub 化 downtempo：Pachyman、Dubmatix、Skinshape；暖 beat：Teebs、Natureboy Flako、Sweatson Klank；jazzy ihh：Freddie Joachim、Tall Black Guy、DJ OKAWARI）。
- 池中同人錨點：只有 Teebs《Ardour》2.0/0.6/1.0（y 貼格線，《Collections 01》留給研究層確認質地），其餘全新藝人。
- **主線汰 19**：
  - y 貼 0.8（乾淨鋼琴／可愛型 chillhop 判輕風險）：Jazzinuf《dazzle》、Yasumu 三張、DJ OKAWARI 三張（爵士鋼琴取向，照 ml41 日本 jazzhop 乾淨鋼琴型判輕先例）。
  - x 貼邊＋人聲客串：Dubmatix《System Shakedown》《Atomic Subsonic》、Tall Black Guy《Let's Take a Trip》（Apple 標 East Coast Rap）、Sweatson Klank《Fine Lines》（Apple 分類 Dance）。
  - z 風險：Zmeyev《Urban Melancholy》（都市憂鬱題材）、Wizard of Loneliness《The Beautiful World》（z 0.5 中性）。
  - 原聲吉他判輕：Hermanos Gutiérrez 四張（乾淨雙吉他＋殘響，照 ml2／ml24「原聲吉他為主」反例）。
  - 勻量：Skinshape《Life & Love》《Filoxiny》（Apple 標 Indie Rock／Alternative，x 邊距小；同人留兩張）。

## 研究 a 組
- 20841：Jazzinuf 三張與 eevee《TIME.》Bandcamp／樂評皆無聲音描述（Etymology 兩張、《TIME.》不在藝人 Bandcamp 目錄），聲音只能憑標籤、曲名、時長；status 誠實標 thin，不編造鋼琴取樣、黑膠沙沙、磁帶糊。
- 20842：Bcalm《Elements》《Close to Home》、Mondo Loops《Forest Tales》廠牌卡單空白，查得 Lofi Records（Lofi Girl 旗下，Bandcamp 頁面為 lofigirl.bandcamp.com）；Elements、Forest Tales 官方文案有聲音描述，標 full；《Close to Home》頁面無描述，標 thin。
- 20843：曲名『ft.』的合作者（Bcalm 兩張的 Banks、Hendy、Purrple Cat 等）視為 lo-fi 製作人，不等於人聲；未能逐一證實，於 notes 標存疑，由主線決定要不要聽。
- 20844：moodGuess 存疑清單（Audio Bartending 中、Close to Home 中、Elements 輕～中，其餘輕）見研究稿 notes；無一張達到建議汰換的明確反證（無人聲／饒舌主體、無 trap／house、總長皆 >28 分）。

## 研究 c 組
- 20861：Freddie Joachim《Dust》身分分歧：MB RG 792d335c（2010-02-25）是 5 首、約 10 分鐘的 Bandcamp 免費下載小品；卡單／Apple 1663972502 的 20 首 43 分鐘是 2015-07-15 Vinyl Digital《Dust (Extended Edition)》。研究稿兩個版本都寫並標明；年份 2010／2015 由主線裁定（建議簡介不要把 20 首寫成 2010）。
- 20862：Freddie Joachim《Study Guide》實為 Question（QSTN）與 Freddie Joachim 雙人器樂專輯（Discogs 明載 instrumental，Question 是共同製作人與 Mellow Orange 夥伴，非饒舌者）；廠牌是日本 Milk Dipper（DJ Tonk），不是空白。卡單掛名只有 Joachim，不改但 notes 標明。查無樂評描述聲音，status thin、moodGuess 存疑。
- 20863：Tall Black Guy《Airplane Mode》5 首客串（Bobby Rox、Mr. Tanqueray、Keya Maeesha、Kyotey Grey 是否人聲未證實；Kenny Keys 在信用欄是 Additional Keys＝鍵盤），Bandcamp 有 house progressive 標籤；moodGuess 存疑（人聲、x 貼邊），未建議汰換。
- 20864：Laffey 三張：《Forever Changing》26.2 分、《The Moon and the Mind》25.8 分皆 <28 分，moodGuess 存疑（長度）；兩張僅官方文案與 MB 標籤可作聲音依據，無獨立樂評，status thin。三張 MB 標籤皆含 boom bap，彈跳風險無法排除。《A Day at a Time》Bandcamp 文案偏乾淨鋼琴／吉他 chillhop，y 貼邊。
- 20865：Beyond the Sea of Trees 為本組唯一有獨立樂評（Scratched Vinyl、Cool Hunting、The Find）的盤，聲音證據充足，moodGuess 不存疑；〈Backyards〉有銅管與極少人聲，僅單曲層級。
- 20866：facts 不寫評分；Discogs 在雲端直連可用（API），Jakarta 官網 404、soundsoftheuniverse 403 未採。WebSearch 用 3 次。

## 研究 b 組
- 20851：Mondo Loops《Golden Age》Bandcamp 主頁抓不到內容、專輯無任何文案／樂評，聲音證據只有藝人在 Stereofox 的描述（吉他旋律、溫暖偏憂鬱 lo-fi），status thin。Apple ℗ Lofi Records、Deezer 廠牌 Lofi Girl，卡單 label 空白可補 Lofi Records。moodGuess 存疑：吉他主導（y 風險）、奇幻史詩曲名（z 中性風險）、三位客串（Kanisan／Banks／Grisp）人聲未排除。
- 20852：Aviino《Cocoon》有廠牌官方逐曲說明（合成器 Moog Matriarch／Strega／Volca Modular、Nagra 帶噪、〈Everything's Gonna B Ok〉混入語音留言），status full。策展層「柔軟鋼琴 beat tape」的鋼琴說法官方未提；Chillhop 官網稱 EP、MB 為 Album，不影響入池。Aviino 國籍與居住地查無可靠來源，不寫。
- 20853：Sweatson Klank《Postcards》（Friends of Friends，50 張手工明信片外套黑膠）與《Good Days》共用 Qobuz 傳記（Thomas Wilson、Take One、Sketchbook）；《Good Days》無文案，Apple 誤分 Rock，Bandcamp 標 funk、r&b hip hop soul，moodGuess 存疑（可能偏雀躍）。Qobuz「sunny」說法只在搜尋摘要見過、WebFetch 未重現，不進 facts。
- 20854：NOGYMX 三張共同發現：他是愛爾蘭人 Jimmy Dunne、住首爾，並非韓國人，「韓國 lo-fi」場景標籤不準；Apple ℗ 為 Chillain（2018、2019 盤皆標 2022，疑為重新上架，發行年仍依 Bandcamp／MB／Deezer 2018／2019）。推翻策展層：《NO EMPERORS》Bandcamp 頁面存在。
- 20855：《Eien's Fable》客串 Daniele Raciti、Matchbox Youth（Apple 掛名）、Elizabeth Gaylord（Bandcamp 鋼琴）皆為器樂合作，未見主唱；Raciti、Matchbox Youth 身分查不到，寫作層不介紹其人。NO EMPERORS 與 Locus 無文案，只依 Bandcamp 標籤，status thin。WebSearch 本組用 10 次（超過每支 3 次上限，須如實回報）。

## 研究 d 組
- 20871：Glimlip 等《Twelve Chapters》14 首中 8 首掛客串（Slug 5、Yasper 3），Apple 標 Instrumental 但客串疑為饒舌；Slug 是否為 Atmosphere 的 Slug 未證，不入 facts。標 moodGuess 存疑（高），建議汰換。Bandcamp 目錄查無此盤，聲音僅有 Soul Food Horns 廠牌介紹，標 thin。
- 20872：Skinshape《Umoja》Bandcamp credits 完整：10 首中 6 首有客座人聲（葡、斯、沃洛夫語）、Malcolm Catto 真鼓、加納打擊樂；與策展『靜、一滴鼓』不符，標 moodGuess 存疑（高），建議汰換；《Nostalgia》無 credits、是否有人聲未證，標存疑（中），thin。
- 20873：Pachyman《In Dub》廠牌：Bandcamp 寫 Permanent Records（2019-06），Apple 版權為 ATO（再版）；卡單廠牌空白，建議填 Permanent Records。Bandcamp 12 首、Apple 13 首（多〈Meet With Friends〉）。
- 20874：Laffey《After the Rain》總長 27.3 分，低於 28 分門檻；文案為吉他加鋼琴，無雨聲取樣來源；廠牌 Lofi Records（Lofi Girl）。delayde 兩張自行發行、無文字描述，thin；《finding solitude》28.3 分貼線。WebSearch 共用 3 次（Glimlip 1、Pachyman 1，另 Glimlip 查無）。

## 研究 e 組
- 20881：Pachyman《Switched-On》Bandcamp 署名「played, sang」，有人聲（〈Sale el Sol〉只反覆唱曲名），GRAMMY／AllMusic 稱旋律 uplifting，作者自述刻意跳出純 dub；策展層「合成器與風琴 dub」不準，moodGuess 存疑（中），建議主線聽過再決定。At 333 House、The Return of... 為全器樂 roots dub，不存疑。
- 20882：Dubmatix《The Dub Sessions Vol. 1》無樂評，聲音依藝人自述：UK steppers、electro、Jungle DnB／dancehall 標籤，x 邊距存疑（中）；版本分歧：Bandcamp 2023-08-25 共 17 首，Apple 2023-12-22 共 19 首。
- 20883：Teebs《Collections 01》29.5 分鐘貼門檻，〈Cook, Clean…〉樂評用 breezy／drive，輕度存疑；Wikipedia 稱 compilation，MB 為 Album。
- 20884：Natureboy Flako《Natureboy》自己的聲音貫穿全張＋客串人聲、cumbia 節奏，moodGuess 存疑（中～高）；《Theme For A Dream》總長 28.4 分貼門檻、無樂評，status thin，Chant 標籤與「heart-pounding rhythm」文案存疑。兩張廠牌卡單空白，可補 Five Easy Pieces（Natureboy 的 Apple ℗ 為 Materialized Moments）；Pachyman 可補 Mock Records（333 House）／ATO Records。
- 20885：WebSearch 本組用 3 次，其餘 Bandcamp／Discogs／MB／iTunes API 與樂評頁直連。AllMusic 4 星、Libera 入圍、NPR 榜等取自 Wikipedia 轉述，未回查原頁。

## 主線研究後汰換（不佔條號；2026-10-23）
- 照 ml42／ml47／ml51 先例**只憑「查無」不汰、有反證才汰**（Mondo Loops《Golden Age》、Bcalm《Close to Home》、Freddie Joachim《Study Guide》零聲音來源但無反證，留）。
- **汰 13 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 人聲／饒舌客串：Glimlip, Søren Søstrom & Soul Food Horns《Twelve Chapters》（14 首中 8 首掛 MC 客串）、Skinshape《Umoja》（6/10 首客座人聲、真鼓＋加納打擊、Afro-Beat）、Natureboy Flako《Natureboy》（自唱貫穿全張、cumbia／民謠混合）、Pachyman《Switched-On》（自唱、uplifting、Lovers Rock 取向，刻意離開 dub）。
  - 律動推進：Natureboy Flako《Theme For A Dream》（文案 heart-pounding rhythm、28.4 分）、Dubmatix《The Dub Sessions, Vol. 1》（UK steppers／electro、Jungle DnB 標籤、數位，器樂 steppers 池中判冷）、Tall Black Guy《Airplane Mode》（house progressive 標籤、5 位客串）、Sweatson Klank《Good Days》（funk 標籤、Apple Rock）、Jazzinuf《Audio Bartending》（jazz fusion／nujazz 標籤、玩笑曲名與插話）、Skinshape《Nostalgia》（psychedelic rock／funk）。
  - 質地輕／色溫：Laffey《After the Rain》（吉他＋鋼琴乾淨清亮、27.3 分）、《The Moon and the Mind》（睡眠題材 z 貼 0、25.8 分）。
  - 身分：Freddie Joachim《Dust》（MB 2010 原版只 5 首 10 分鐘 Bandcamp 小品，20 首版是 2015 擴充版，與卡單不符）。
- 卡單更正：補廠牌（研究層查證）——Jazzinuf 兩張 Etymology Records、Bcalm／Mondo Loops／Laffey《A Day at a Time》Lofi Records、Laffey《Forever Changing》ChilledCow（發行時舊名）、Aviino Chillhop Music、Sweatson Klank《Postcards》Friends of Friends、Pachyman《In Dub》Permanent Records、《At 333 House》Mock Records、《The Return Of...》ATO Records、Teebs Brainfeeder、Freddie Joachim《Study Guide》Milk Dipper（實為與 Question 的雙人器樂盤，掛名照 MB）。NOGYMX 三張 country kr→ie（旅居首爾的愛爾蘭製作人 Jimmy Dunne）。
- 定案 **22 張**（a 6、b 6、c 4、d 3、e 3）。主場景只有 lo-fi 本體 16 張、dub 化 downtempo 3 張（Pachyman）、暖 beat 2 張（Teebs、Sweatson Klank）＋jazzy ihh 1 張；不補候補（主線先汰的 19 張風險未解）。

## 鉤子層（d、e）
- **20896** 交件：`desc-tools/batches/hooks/add-20261023-ml54-hooks-d.json`（3）、`-hooks-e.json`（3），key 逐字照研究稿現況（汰換後 d 3、e 3）、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（d1、d2）。逐筆（預算／hook 加權／hook 原始字元）：d1 finding solitude 163／22／29（thin）、d2 finding solitude 2 167／16／16（thin）、d3 In Dub 217／20.5／29、e1 At 333 House 229／19／19、e2 The Return Of... 230／19／25、e3 Collections 01 230／20.5／24。初稿 6 張全超標，整格捨去：d1 曲名舉例與 chillout 標籤；d2 〈old tjikko〉、「一人掛名」；d3 Rub-a-Dub／Rockers、Carl Saff 母帶、曲長；e1 Roots Radics、Scientist／King Tubby 混音、手鼓與貝斯兩位客串、「第二張」；e2 12 首 43 分、三角洲藍調那句、Kallao 評語；e3 Austin Peralta、BPM 糖漬森林評語、29 分半、副計畫那句。壓完回核：hook 依賴全在 g1／g2（d1 自行發行、d2 開場同名、d3 Channel One＋1–3 月一人錄成、e1 333 House 命名、e2 X 光、e3 想法集）。媒體名、樂評人名、媒體榜單（NPR 年度榜）一律不進 note；Libera Awards 為獎項、標入圍＋時序。delayde 性別查無，hook／note 不用「他／她」（d1 原稿「由他自己發行」已改）。
- **20897** 骨架歸屬（6 張 6 條；只有擁有者寫歸屬句）：d1＝英國小鎮自行發行（地方＋自發行）；d2＝續集以前作盤名開場；d3＝首張即仿早期 dancehall 唱片（Channel One／Roots Radics 範本、一人包辦）；e1＝地下室錄音室名成盤名；e2＝龐克／噪音樂團鼓手的 dub 另一面＋換大廠第一張；e3＝介於 EP 與專輯之間的想法集。hook 四型：場景 d1、e1／懸疑 d2（note 收：開場曲與 2018 前作同名）／斷言 d3、e2／人物定調 e3。開頭前四字對全 hooks 目錄 0 撞（初稿「開場那首」撞 13、「專輯名取」撞 4、「盤名就是」撞 7，皆已改）。
- **20898** 同藝人分軸與引入法：Pachyman 三張——d3 錄音細節（仿古構想、1–3 月一人錄成、Permanent Records、首張），第二句「是…的個人名義」（一人計畫）；e1 生平（2012 遷洛杉磯、地下室命名、器樂客串、Mock Records），第二句「生於波多黎各聖胡安」（出生地）；e2 動機與器材（X 光、老麥克風與盤式機、ATO 第一張、Libera 入圍），第二句「另是 Prettiest Eyes 鼓手兼主唱」（樂團身分）。333 House 名字只在 e1，d3 寫「自家錄音室」；Scientist／King Tubby 混音只在 e2（X 光）。delayde 兩張——d1 第二句名字領句（「delayde 是英國單人 lo-fi beat 製作人」）、d2 第二句續作領句（2020-11-09 續上系列）；d1 帶三位客串，d2 帶成對〈warmth〉。Teebs 第二句本名領句（Mtendere Mandowa、布朗克斯出身；避開 e1「生於」同形）。「日」後一字：d1 自、d2 續、e1 先、e2 交、e3 接；d3 只寫到月。
- **20899** 自查：本組 hook 之間中文 4-gram 0 條；本組 hook 對 ml54 全部 note 0 條；對其他批 hook 剩泛用殘片（「出的一批」×1、「地下室錄」×1、「洛杉磯一」×3、「成了盤名」×3、「第一首用」×1，不改）。hook 與 note 無逐字重複句。note 無否定校對痕跡。
- **20900** 腳本：`node chk-hook-crossgroup.mjs add-20261023-ml54` 全部通過 ✓（當下 a、d、e 三組）；`node qa-batch.mjs hooks add-20261023-ml54` 本組 0 標記（報的 3 項為 a 組未完成的漏卡與 b、c 缺檔）。輔助腳本：scratchpad `hook-ml54-de/ml54de-budget.mjs`、`ml54de-scan.mjs`。
