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

## 鉤子層（a、b、c）（20891–20895）
- **20891** 交件：`desc-tools/batches/hooks/add-20261023-ml54-hooks-a.json`（6）、`-hooks-b.json`（6）、`-hooks-c.json`（4），key 逐字照研究稿現況（汰換後 a 6、b 6、c 4）、順序不變。公式照 1793-B（只扣 `主故事：`／所有 `→`／`正文只寫上列各項。`／`這條骨架全批只走本張。`）；thin 上限 170、full 230。逐筆（預算／hook 加權／hook 原始字元）：a1 Snow in My Shoe 168／19／19（thin）、a2 Sun Dance 170／18／26（thin）、a3 TIME. 167／24.5／27（thin）、a4 Elements 228／18／25、a5 Close to Home 167／17／17（thin）、a6 Forest Tales 213／19／19；b1 Golden Age 152／18.5／23（thin）、b2 Cocoon 204／22／22、b3 Postcards 220／21.5／23、b4 NO EMPERORS 161／21.5／25（thin）、b5 Eien's Fable 210／21／24、b6 Locus 158／20.5／24（thin）；c1 Beyond the Sea of Trees 219／20／20、c2 Study Guide 163／20.5／22（thin）、c3 A Day at a Time 218／17.5／25、c4 Forever Changing 168／23／30（thin）。初稿 14 張超標，整格捨去：Snow 曲數與「當興趣」；Sun Dance 發行月與 jazz hop 標籤；TIME. 獨力完成、〈RemSleep〉時長；Elements Kainbeats；Close to Home Hendy／Banks 掛名數；Forest Tales〈Dusty Records〉〈Videotapes〉；Golden Age 同年 Stereofox EP；Cocoon《Plush》《Hologramophone》盤名與三台合成器；Postcards Topanga Canyon、Sketchbook、35 張販售與不再版；NO EMPERORS Emancipator；Locus YouTube beat 圈；Beyond Elijah Fox；Study Guide Mellow Orange、Question 現場鼓、Joachim 母帶；Forever Changing 房間做 beat。hook 原始超 30 的三句（Snow、Golden Age、A Day at a Time）改寫縮短。**壓完回核抓到 5 處 hook 踩空或依賴落在 g3 以後**：Forest Tales 文案（吉他鋼琴輪替、悶鼓）前移 g2；Postcards 50 張手工外套前移 g2；Eien 補「守門人講述被遺忘的文明」；Locus 補「中間停了約五年」；Study Guide 日本 CD 首發移 g1、德國黑膠 g2。
- **20892** 骨架歸屬（16 張 16 條，各張 note 只寫自己的歸屬句）：Snow＝冬季曲名拼貼（壁爐、冰湖、冰屋）；Sun Dance＝曲名指向古典作曲家（〈Gymnopedie No.77〉→薩替，是否取樣一格不寫）＋創作者集體廠牌的宗旨；TIME.＝一天作息的曲序（〈Hi〉開場、〈Bye〉收尾）；Elements＝九位同廠製作人輪番搭檔；Close to Home＝曲長整齊（15 首都在兩分鐘上下）；Forest Tales＝吉他與鋼琴輪替、悶鼓（文案把專輯比成森林）；Golden Age＝吉他教學 YouTube 頻道起家；Cocoon＝私人語音留言（移民律師簽證電話）混進曲中；Postcards＝古董明信片手工外套限量黑膠；NO EMPERORS＝曲名取自民間傳說（KUMIHO 九尾狐）；Eien's Fable＝虛構文明的故事專輯；Locus＝空窗五年後一年連發；Beyond＝樂評的慢熱觀察（旋律慢慢浮現）；Study Guide＝日本首發、六年後德國才有黑膠；A Day at a Time＝頻道改名後 13 天上架；Forever Changing＝製作人的 lo-fi 美學自述（粗糙不完美）。與 d、e 組 6 條（20897）不重；Eien 原稿「作曲、混音、演奏都署 Nogymx」與 In Dub 的一人包辦同構，已改成只寫〈Beyond Time〉鋼琴客串。hook 四型：場景（Snow、TIME.、Forest Tales、Postcards、Eien）／斷言（Sun Dance、Close to Home、NO EMPERORS、Study Guide、A Day at a Time、Beyond）／懸疑（Cocoon、Golden Age、Locus；收尾分別在 g2 簽證電話、g1 轉全職、g1–g2 五年空窗與 2019 兩張）／人物定調（Elements、Forever Changing）。
- **20893** 同藝人分軸與「他／她」引入法：Jazzinuf——Snow 帶生平（2012 年起、紐約），第二句年份領句；Sun Dance 帶廠牌（Etymology 2019 紐約創作者集體），第二句廠牌領句。Bcalm——Elements 國籍領句（英國 lo-fi beatmaker）、帶合作網與文案；Close to Home 日期領句（2024-08-15 回到 Lofi Records）、帶曲長。Mondo Loops——Forest Tales 樂器身分領句（切斯特的吉他手與製作人）、帶聲音文案；Golden Age 地區領句（英格蘭西北部）、帶生平起點。NOGYMX 三張——NO EMPERORS 影響來源領句（Nujabes、Shlohmo）、Eien 居住年數領句（在韓國住約八年的愛爾蘭 beatmaker）、Locus 計畫原名領句（No Gimmicks）；三張都寫愛爾蘭人、旅居首爾，「韓國」只出現在居住地與九尾狐傳說。Freddie Joachim——Beyond 收藏者身分領句（加州、90 年代中期 DJ）、帶錄音細節；Study Guide 合作夥伴領句（與 Question 同掛製作）、帶發行史。Laffey——A Day at a Time 城市領句（多倫多）；Forever Changing 音樂養成領句（經典搖滾→鋼琴→爵士）。其餘：TIME. 作品數領句（13 張 beat tape）、Cocoon 發行慣例領句（每年秋天在 Chillhop）、Postcards DJ 舊名領句（Take One）。第二句句型 16 種互異，也與 d、e 組（名字／續作／一人計畫／出生地／樂團身分／本名）不重——Postcards 原「出生地」、NO EMPERORS 原「本名」撞 e1、e3，已改。eevee 用「她」（Complex 原文）；Aviino 國籍不寫。
- **20894** 「日」後一字：Snow 由、Elements ，、Close to Home 回、Forest Tales 面、Golden Age 上、Cocoon 在、Postcards 問、NO EMPERORS 放、Eien 發、Locus 推、Beyond 經、A Day at a Time 宣／出（改名日與發行日兩處）、Forever Changing 以；Sun Dance、TIME.、Study Guide 只寫到年或月。與 d、e（自、續、先、交、接）不重——Eien 原稿「日接」撞 e3，改「日發」。自查：16 句 hook 開頭前四字互異；hook 之間中文 4-gram 0 條（連 d、e 共 22 句）；hook 對全批 note：初稿 e3 hook「畫家兼製作人」對 Forest Tales note「吉他手兼製作人」撞「兼製作人」，改「吉他手與製作人」，現 0 條；hook 與 note 無逐字重複句；無「不是／並非」、無分數星等。媒體名與媒體榜單不進 note（Complex、EDM.com、Nialler9、Stereofox 介紹、Scratched Vinyl、Cool Hunting、The Find 一律不具名，Beyond 寫「樂評」）；Scratched Vinyl 8/10 不寫。研究層存疑格（moodGuess、客串是否人聲、Banks 等身分、Raciti／Matchbox Youth、eevee 城市、Jazzinuf 出身地、Satie 是否取樣、Study Guide 25 曲 Deluxe 版）一律不指派。
- **20895** 腳本：`node qa-batch.mjs hooks add-20261023-ml54` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-ml54`（5 組 22 張）全部通過 ✓。輔助腳本：scratchpad `hook-ml54-abc/ml54abc-budget.mjs`、`ml54abc-ngram.cjs`。

## 鉤子層（d、e）
- **20896** 交件：`desc-tools/batches/hooks/add-20261023-ml54-hooks-d.json`（3）、`-hooks-e.json`（3），key 逐字照研究稿現況（汰換後 d 3、e 3）、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（d1、d2）。逐筆（預算／hook 加權／hook 原始字元）：d1 finding solitude 163／22／29（thin）、d2 finding solitude 2 167／16／16（thin）、d3 In Dub 217／20.5／29、e1 At 333 House 229／19／19、e2 The Return Of... 230／19／25、e3 Collections 01 230／20.5／24。初稿 6 張全超標，整格捨去：d1 曲名舉例與 chillout 標籤；d2 〈old tjikko〉、「一人掛名」；d3 Rub-a-Dub／Rockers、Carl Saff 母帶、曲長；e1 Roots Radics、Scientist／King Tubby 混音、手鼓與貝斯兩位客串、「第二張」；e2 12 首 43 分、三角洲藍調那句、Kallao 評語；e3 Austin Peralta、BPM 糖漬森林評語、29 分半、副計畫那句。壓完回核：hook 依賴全在 g1／g2（d1 自行發行、d2 開場同名、d3 Channel One＋1–3 月一人錄成、e1 333 House 命名、e2 X 光、e3 想法集）。媒體名、樂評人名、媒體榜單（NPR 年度榜）一律不進 note；Libera Awards 為獎項、標入圍＋時序。delayde 性別查無，hook／note 不用「他／她」（d1 原稿「由他自己發行」已改）。
- **20897** 骨架歸屬（6 張 6 條；只有擁有者寫歸屬句）：d1＝英國小鎮自行發行（地方＋自發行）；d2＝續集以前作盤名開場；d3＝首張即仿早期 dancehall 唱片（Channel One／Roots Radics 範本、一人包辦）；e1＝地下室錄音室名成盤名；e2＝龐克／噪音樂團鼓手的 dub 另一面＋換大廠第一張；e3＝介於 EP 與專輯之間的想法集。hook 四型：場景 d1、e1／懸疑 d2（note 收：開場曲與 2018 前作同名）／斷言 d3、e2／人物定調 e3。開頭前四字對全 hooks 目錄 0 撞（初稿「開場那首」撞 13、「專輯名取」撞 4、「盤名就是」撞 7，皆已改）。
- **20898** 同藝人分軸與引入法：Pachyman 三張——d3 錄音細節（仿古構想、1–3 月一人錄成、Permanent Records、首張），第二句「是…的個人名義」（一人計畫）；e1 生平（2012 遷洛杉磯、地下室命名、器樂客串、Mock Records），第二句「生於波多黎各聖胡安」（出生地）；e2 動機與器材（X 光、老麥克風與盤式機、ATO 第一張、Libera 入圍），第二句「另是 Prettiest Eyes 鼓手兼主唱」（樂團身分）。333 House 名字只在 e1，d3 寫「自家錄音室」；Scientist／King Tubby 混音只在 e2（X 光）。delayde 兩張——d1 第二句名字領句（「delayde 是英國單人 lo-fi beat 製作人」）、d2 第二句續作領句（2020-11-09 續上系列）；d1 帶三位客串，d2 帶成對〈warmth〉。Teebs 第二句本名領句（Mtendere Mandowa、布朗克斯出身；避開 e1「生於」同形）。「日」後一字：d1 自、d2 續、e1 先、e2 交、e3 接；d3 只寫到月。
- **20899** 自查：本組 hook 之間中文 4-gram 0 條；本組 hook 對 ml54 全部 note 0 條；對其他批 hook 剩泛用殘片（「出的一批」×1、「地下室錄」×1、「洛杉磯一」×3、「成了盤名」×3、「第一首用」×1，不改）。hook 與 note 無逐字重複句。note 無否定校對痕跡。
- **20900** 腳本：`node chk-hook-crossgroup.mjs add-20261023-ml54` 全部通過 ✓（當下 a、d、e 三組）；`node qa-batch.mjs hooks add-20261023-ml54` 本組 0 標記（報的 3 項為 a 組未完成的漏卡與 b、c 缺檔）。輔助腳本：scratchpad `hook-ml54-de/ml54de-budget.mjs`、`ml54de-scan.mjs`。

## 寫作層（writer-2）（20906–20910）
- **20906** 交件 `desc-tools/batches/output/add-20261023-ml54-out-2.json`（11 張，key 逐字同序）。字數（Array.from）：Locus 169（thin）、Beyond the Sea of Trees 229、Study Guide 179（thin）、A Day at a Time 228、Forever Changing 168（thin）、finding solitude 171（thin）、finding solitude 2 171（thin）、In Dub 219、At 333 House 230、The Return Of... 214、Collections 01 222。full 214–230、thin 168–179，全在帶內；Study Guide 初稿 181 超 thin 上限，整格捨去「合力」二字的子句措辭收回 179。
- **20907** 媒體與樂評：Beyond 的 hook「樂評說…」照抄；正文不再寫單一樂評評價句，把 note「樂評聽到旋律、和聲、貝斯線與對旋律層層鋪開」改成不掛來源的聲音陳述（收 hook 的懸念）。A Day at a Time、Forever Changing 的「廠牌文案寫…」去掉轉述引導詞，直接寫成聲音陳述。無媒體名、媒體榜單、「據說／據傳」。
- **20908** 句型配表照鉤子層 20893／20894／20898：第二句依 note 指定（計畫原名／收藏者身分／合作夥伴／城市／音樂養成／名字／續作／一人計畫／出生地／樂團身分／本名）；「日」後一字 Locus 推、Beyond 經、A Day 宣／出、Forever Changing 以、finding solitude 自、finding solitude 2 續、At 333 House 先、The Return Of... 交、Collections 01 接；Study Guide、In Dub 只寫到年月。
- **20909** 自掃（han() 剝非漢字後中文 4-gram，合 out-1）：初稿 3 張以上同構——「首約分鐘」（兩檔 13 張）、「發行首約」、「的愛爾蘭」；本檔把 4 張曲數＋時長句各換一種寫法（曲子共約／全長約／加總約／總長約／長度約／加起來約／播完約），Locus 改「來自愛爾蘭、住在首爾」。另拆 2 張殘片：「多倫多製作人」、「是洛杉磯／洛杉磯樂」、「的第一張」、「這批曲子」、「間年月日」（Teebs 改句序）、「的方向走」（對 out-1 Close to Home）、「器樂嘻哈」（對 out-1 Sun Dance）。定稿本檔 3 張以上 0 條；仍屬 3 張以上的「首約分鐘」×9、「發行首約」×3 全在 out-1。
- **20910** 腳本：`qa-batch out` 本檔 0 標記（報的 thin 超 180 為 out-1 的 Snow in My Shoe、Sun Dance）；`qa-check-research` 11 張 0 標記；`fix-spacing` 待補 0。輔助腳本：scratchpad `wr-ml54-2/ml54-2-descs.py`、`ml54-2-scan.cjs`。

## 寫作層（writer-1）（20901–20905）
- **20901** 交件 `desc-tools/batches/output/add-20261023-ml54-out-1.json`（11 張，key 逐字同序）。full 5 張 203–238（Elements 238、Forest Tales 225、Cocoon 236、Postcards 221、Eien's Fable 203）；thin 6 張 156–180（Snow 179、Sun Dance 180、TIME. 179、Close to Home 165、Golden Age 156、NO EMPERORS 161）。初稿 4 張出帶（Snow 195／Sun Dance 185 thin 超 180；Elements 241、Cocoon 243），整格捨去：Snow 的「住在」與三場景複述、Sun Dance 的「這幾條根」與 beatmaker 的城市、Cocoon 的「在同廠牌」改「在該廠牌」並把曲長併成一短語。
- **20902** 第二句領句全照鉤子層 20893 指派（年份／廠牌／作品數／國籍／日期／樂器身分／地區／發行慣例／DJ 舊名／影響來源／居住年數）；「日」後一字全照 20894（由、，、回、面、上、在、問、放、發；Sun Dance、TIME. 只寫到年）。NOGYMX 兩張只寫愛爾蘭籍、旅居首爾（Eien 照 note 寫「旅韓約八年」），「韓國」只出現在居住地與九尾狐傳說；KUMIHO 只寫「出自韓國傳說」（note 無「民間」二字，已刪）。
- **20903** 媒體名、媒體榜單、單一樂評評價一律未寫（note 本無）；轉述引導詞 grep「據」0。廠牌文案的比喻（Elements 山頂、Forest Tales 森林）寫成「廠牌把…比作」的陳述句，非轉述引導。Aviino「陪人下班收心」轉成間接敘述「把整張設想成⋯的陪伴」。Postcards 結尾「明信片外套正好接上這個題目」是銜接語，不是新事實；Sun Dance「替古典那一頭留了名字」把曲名指涉接回廠牌宗旨，未寫是否取樣。
- **20904** 自掃（`han()` 剝非漢字後中文 4-gram，合 out-2 現況＋全批 hooks）：初稿主要撞「首約分鐘」×13（「N 首約 N 分鐘」樣板，連 out-2）、「的愛爾蘭」×3、「在洛杉磯」、「廠牌文案」、「鋼琴和弦」、「的方向走」等；把本檔 9 處曲數＋時長逐張換成不同句型（合計／排進／共⋯左右／排滿／內塞進／9 軌、約／攤開約／拉到約／共收⋯時間約），Close to Home 避開 hook 的「分鐘上下」。定稿與 out-2 現況合掃，涉本檔的 2 張以上 4-gram 0 條。out-2 交件後若再改動，請主線收件時重跑合掃。
- **20905** 腳本：`node qa-batch.mjs out add-20261023-ml54` 全部通過 ✓；`qa-check-research` 本檔 0 標記；`fix-spacing` 待補 0。輔助腳本：scratchpad `wr-ml54-1/ml54w1-scan.mjs`、`ml54w1-build.py`、`ml54w1-bodies.json`。

## 主線審稿（20911–20913；2026-10-23）
- 20911：逐張審 22 張（out-1 11、out-2 11），逐句對回研究稿；qa-batch out、qa-check-research（兩檔各 0 標記）、fix-spacing 0 補；正文無媒體名、無「據」字。
- 20912：改 2 張（`desc-override.json`）：
  - `Freddie Joachim|Beyond the Sea of Trees`：開頭「樂評說它得耐著性子聽…」是單一樂評（研究 c 組一篇）的評價句，改成不掛來源的聽感描述，並刪掉後文重複的「耐心聽下去…一層層鋪開」→ 218 字。
  - `Laffey|A Day at a Time`：「掛在法國直播頻道 ChilledCow 名下」與 MB／Apple 廠牌（Lofi Records）不符，改為「交給法國直播頻道旗下的 Lofi Records」並補「從 ChilledCow 改名」；刪「每首都收在 3 分 30 秒以內」壓回 240 內 → 226 字。
- 20913：核過未改——eevee《Lo-Fi Minnie》（研究 a 組）、Sweatson Klank 生於巴黎（研究 b 組）、Pachyman Libera Awards 入圍（獎項非媒體榜，研究 e 組）、Teebs 豎琴手 Rebekah Raff（研究 e 組）；Sun Dance、Postcards 結尾兩句是寫作層自加的銜接語，不含新事實，留。

## 上線與評分（2026-10-23，主線）（條號 20914–20916）
- **20914**：上線 22 張：card_catalog 22／22、KV 22 鍵回讀逐字一致（stamp 20261023r12）、試聽 22 ready（Study Guide 走 preview-override：Apple jp 310847481 17 軌對上 MB 前 17 軌）、seed +22、prepare／published gate 0 error（22 warning 皆 UPC 盡力而為）。封面 CAA 20（Forest Tales 原圖 live-check 500 改 front-500）、Apple 2（eevee《TIME.》、Study Guide CAA 404），live-check 全 200、縮圖表目視相符。上線前對 origin 所有 `claude/*` 分支 seed＋10-23 卡單去重 0 撞。
- **20915**：子曲風 warm-batch 22／22 有標籤；推不出節點的 9 個掛名補進 `genre-l3-artist-map.json`（hiphop/underground/instrumental：Jazzinuf、eevee、Aviino、NOGYMX、Nogymx、Freddie Joachim；electronic/downtempo/beats：Bcalm、Mondo Loops、delayde），22／22 落位。
- **20916**：**落格率 21/22＝95%**（`batch-progress/mood-axes/score-ml54/`，照 10-23 體感標準）。評分 x 1.8–2.6、y 0.4–1.8、z 0.2–1.3；conf mid 9、low 13。出格 Bcalm《Elements》y 0.4 落放鬆（官方文案「鋼琴和弦配吉他與軟鼓」判乾淨，與主線預判的 Lofi Records 乾淨 chillhop 風險相符）。貼邊：Pachyman《The Return Of...》z 0.2（旋律退後的骨架 dub）、Bcalm《Close to Home》與 Laffey《A Day at a Time》y 0.6。恍惚格 1,538 → 1,559。

## 本批新藝人（無介紹，未切；並行時子工作階段不切）
Jazzinuf、eevee、Bcalm、Mondo Loops、Aviino、Sweatson Klank、NOGYMX／Nogymx（同一人兩種寫法）、Freddie Joachim、Laffey、delayde、Pachyman、Teebs（12 位）。
