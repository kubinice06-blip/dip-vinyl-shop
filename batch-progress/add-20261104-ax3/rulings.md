# add-20261104-ax3 裁定（新頂點盤線・流亡 A：歐美私壓——迷幻、民謠、福音、靈魂放克、地下爵士）

> 店主 2026-11-04：同意另外上架新盤，把流亡從 254 補到約 300。交接 `batch-progress/apex-new-20261104/PLAN.md`。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；**本批明確採用頂點**：研究層確認 listeners 有效且 1–299、非錯配、冷門度 5（無串流授權再發）者 seed 第 9 欄填 `pearl`，不合格照一般卡上架或汰換。
> 策展：`curation-ax3a.json`（迷幻＋民謠 18）＋`curation-ax3b.json`（福音／靈魂放克／地下爵士 9）→ 主線汰 1（`master-override-ax3aax3b.json`）→ `master-ax3aax3b.json`（26 張：MB 18、§1 人工 8）→ `pick.json`（26）→ `build-cards.mjs`，再改分研究 a–c 三組。
> 本批卡單：`desc-tools/batches/cards/add-20261104-ax3-cards.json`（26 張；研究 a 9、b 9、c 8）。
> **預留：研究 a 51701–51710、b 51711–51720、c 51721–51730、鉤子 51751–51760、寫作 51761–51770、主線 51771–51780。**
---

## 主線策展（不佔條號）
- 汰 1：Kenny Cox《Multidirection》撞池（池中掛名 The Contemporary Jazz Quintet，1970）。
- 福音私壓 0 張：策展層約 90 個候選，真私壓盤 Last.fm 多半無資料或 0，有值的 Apple 都已上架（ax3b 回報）。本批照實不收福音。
- 盤名照 MB：Heaven & Earth《Heaven and Earth》；Mtume Umoja Ensemble《Alkebu-Lan: Land of the Blacks》（現場原盤，Ganelin 先例開 releaseException；「Live at the East」進 queryAlias）。
- 交研究層把關（流亡資格）：David Lewis《Just Mollie and Me…》worker listeners 回 0（盤名含 `…`，策展層查到 5），要對 Last.fm 頁；Heaven & Earth（Mercury 發行）、Joe Bonner（Muse）、Inner Dialogue（Ranwood）、Circulation（Deroy）、Probe（Eborp）不是嚴格自費，查是否有數位再發；Ghostdance 與 Apple 上的 Ghost Dance 是否同團。

## 研究 a 組
- 51701：流亡資格查證結果。8 張合格、1 張不合格（Stefan Gnys：Apple Music 已有 2024 年正式數位版《Horizoning》，且 2024 年 We Are Busy Bodies 黑膠重發，違反「無正式串流再發」；建議汰換或轉一般卡）。
- 51702：Last.fm 專輯頁在雲端環境一律回 600 / WebFetch 載入失敗，listeners 一律取 dip worker `_listeners`；逐張以 Discogs API（master/versions）核實再發版本、Apple（iTunes search）與 Deezer 搜尋核實無串流。Bandcamp 搜尋頁無法載入，未直接查。
- 51703：David Lewis《Just Mollie and Me…》worker 對含「…」盤名回 0，去掉省略號回 5（同藝人同盤）；判合格（listeners 5）。Last.fm 頁未能直接核對，請主線有網時補驗。Discogs 藝人名為 David Earl Lewis；Tiger Lily 小廠、Roulette 發行，非嚴格自費，僅有 2012／2013 日韓 CD 再發，無串流。
- 51704：McAllen：worker 以 Bob McAllen 回 64、以 McAllen 回 2，皆 1–299；queryAlias Bob McAllen 保留。
- 51705：Ghostdance 與 Apple 的 Ghost Dance（英國哥德搖滾團）、Bill Miller《Ghostdance》皆非同團，已排除錯配。
- 51706：Jeremy Dormouse 國別為加拿大，卡單 scene 寫「美國民謠私壓」不符；原版標籤印 1968 年版權，部落格稱 1968 發行，facts 不寫發行年。
- 51707：moodGuess 存疑：Sly Boots、David Lewis、Ghostdance、Drnwyn 實際有鼓與電貝斯或整團編制，不是純輕柔木吉他。
- 51708：Sly Boots 在 Apple 上同名藝人（2014《Bad News Walkin'》）為另一組，非此盤。

## 研究 c 組
- 51721：流亡資格查證結果。8 張全數合格（listeners 全在 1–299）：Ebony Rhythm Funk Campaign 68、Heaven & Earth 10、Joe Bonner 70、Prince Lasha Ensemble 68（以 Prince Lasha 名義查為 45，兩條目合計 113）、Odean Pope 99、Bobby Few 99、Mtume Umoja Ensemble 85／174（有無「(Live at the East)」後綴兩條目，合計 259）、Clifford Thornton 83／140（合計 223）。Last.fm 專輯頁在雲端環境回 600「Temporarily Unavailable」、WebFetch 載入失敗，listeners 一律取 worker `_listeners`；已用對不存在盤名回空 `{}` 驗證 worker 為專輯層級、非藝人層級回退。
- 51722：串流／再發查證：以 iTunes search（專輯與曲目）＋Discogs master versions＋release 查。八張 Apple 皆無該專輯。再發紀錄：Heaven & Earth 2012 荷蘭 PTG CD（PTG 34130）；Prince Lasha 2009 Dusty Groove America CD（DGA3023，Sony 授權隨需壓製）；Odean Pope 1990 Moers CD；Mtume 2016 非官方黑膠；其餘僅黑膠。均非正式串流再發。Spotify／Bandcamp 本環境無法開，未驗，請主線上線前自行補查。
- 51723：邊界案（合格但標邊界）：Heaven & Earth 為 Mercury（Phonogram）大廠發行，非私壓／極小廠，僅因 listeners 10、無串流而合格；Prince Lasha 為 CBS 大廠（英國），同理。主線若嚴守「私壓或極小廠」字面可汰換這兩張。
- 51724：推翻策展層：(1) Ebony Rhythm Funk Campaign 不是底特律、Mack Rice／Luther Ingram 圈，團出身印第安納波利斯再到洛杉磯，Wayne Henderson 製作；「Band Aide」是版權方而非廠牌，發行廠牌為 UNI。(2) Prince Lasha《Insight》廠牌只有 CBS（英國），「Birdseye」是 1970 年代後期現場盤的廠牌；錄於 1966 英國，Discogs 風格 Cool Jazz／Hard Bop，非「西岸 spiritual jazz」。建議卡單 label 改 CBS。(3) Bobby Few 首作與自營廠說法查無證據，Center of the World 是廠牌第三號。(4) Clifford Thornton：JCOA 非 Thornton 自營，「Harlem 社區」只見封面壁畫。(5) Odean Pope 為 1982 Moers，風格 Free Funk，非 1960s／spiritual。
- 51725：moodGuess 存疑：卡單 moodGuess 皆為 0 未評，無需據以汰換；聲音側註：Ebony、Heaven & Earth 為有鼓有人聲的舞池放克／靈魂，Odean Pope 為電貝斯＋鼓的 funk 自由爵士，Mtume 與 Thornton 為大編制含大量打擊樂。
- 51726：反向禁令：Bonner 2014 辭世、Few 2021 辭世、Thornton 後期 UNESCO 生涯、Mtume 團 Juicy Fruit 皆為與作品無關的後續生平，未入 facts。
- 51727：thin 三張：Heaven & Earth、Odean Pope、Bobby Few（無樂評、錄音細節缺）。

## 主線研究驗收・c 組（51771–）
- 51771 c 組 8 張研究層判合格，主線嚴守「冷門度 5＝私壓或極小廠」字面，大廠發行的 3 張轉一般卡（不填 pearl）：Ebony Rhythm Funk Campaign 同名作（UNI＝MCA 旗下）、Heaven & Earth《Heaven and Earth》（Mercury／Phonogram）、Prince Lasha Ensemble《Insight》（英國 CBS）。其餘 5 張（Joe Bonner／Muse、Odean Pope／Moers、Bobby Few／Center of the World、Mtume Umoja／Strata-East、Thornton／JCOA）皆獨立小廠，照採 pearl。
- 51772 卡單 label 依研究 c 更正：Prince Lasha《Insight》→ CBS（Birdseye 是後來現場盤廠牌）；Ebony Rhythm Funk Campaign → UNI（Band Aide 是版權方）。
- 51773 Mtume 與 Thornton 在 Last.fm 各有兩個條目（85／174、83／140），合計仍 <300，照合格。
- 51774 a 組：Stefan Gnys《English Oaks and Evangeline》Apple 有 2024 正式數位版（改名《Horizoning》），轉一般卡；其餘 8 張照採 pearl。Jeremy Dormouse 卡單國別已是 CA，正文照研究 a 寫加拿大。

## 研究 b 組
- 51711 b 組 9 張流亡判定：8 張合格、1 張不合格（Inner Dialogue《Friend》：Ranwood 為 Lawrence Welk 與前 Dot 社長 1968 年創辦的商業廠牌，非私壓或極小廠；2010 韓國 Big Pink 兩版 CD 與日本發行有正式再發）。listeners：Rin Eric 4、Circulation 23、Fairy Tale 13、Ton Vlasman 47、Princess Flower 25（Last.fm 頁兩次 Temporarily Unavailable，僅憑 worker）、Inner Dialogue 38、Smack 117、Ian A. Anderson 43、Probe 166。
- 51712 Smack 為常見同名，已核對 Last.fm 頁曲目為 Purple Haze，與 Audio House 1968 專輯一致，非錯配。Circulation 亦為多團同名，但 Tank Tracks 盤名獨一。
- 51713 串流驗證限制：Apple（iTunes search 六個店面）九張皆無；Spotify／Bandcamp 因工具限制（Bandcamp 403）未能驗證。風險最高：Smack（Shadoks 2011 LP／2012 CD）、Ian A. Anderson（Bonfire 2023）、Probe（SL Records 2024）、Ton Vlasman（Wah Wah 2009），建議主線上線前人工搜 Spotify。
- 51714 Rin Eric 於 Apple 有 2013–2017 年多張其他自發數位專輯，但 1972 年這張不在其中；照合格，註記同名同人待確認。
- 51715 Princess Flower：2012 Wah Wah 重發加了 1970 年未發行 C、D 面並以 Pataphysician Orchestra 署名；上架以 1968 年六首原版為準。Daevid Allen 掛名僅 Discogs 單一來源，寫作層用「團員之一」。
- 51716 Smack 壓量衝突：Discogs 版本註記約 150 張、藝人簡介約 2000 張，寫作層避免寫確切數字。Probe 年份：Veamusic 文案 1969，Discogs 與 MB 1971，採 1971。
- 51717 moodGuess 存疑：Inner Dialogue（曲目多為流行翻唱，含〈Raindrops Keep Fallin On My Head〉，迷幻成分薄）。
- 51775 b 組：Inner Dialogue《Friend》Ranwood 是商業廠牌、2010 有韓日正式 CD 再發，轉一般卡；其餘 8 張照採 pearl（考古廠黑膠／CD 重發不算串流再發）。Smack 壓量 150／2000 兩說衝突，正文不寫數字；Princess Flower 以 1968 六首原版為準，Daevid Allen 只寫「團員之一」。
- 51776 本批定案 26 張：pearl 21、一般 5（Stefan Gnys、Ebony Rhythm Funk Campaign、Heaven & Earth、Prince Lasha Ensemble、Inner Dialogue）。

## 鉤子層（c）（51756–51760；a、b 那位代理用 51751–51755）
- **51756** 交件 `desc-tools/batches/hooks/add-20261104-ax3-hooks-c.json`（8 張，key／順序照研究稿）。公式照 hook-base 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（hook 原始字元／加權／預算）：Ebony 25／25／216、Heaven & Earth 29／25.5／169（thin）、Bonner 23／23／230、Lasha 25／25／225、Pope 30／25.5／164（thin）、Few 27／23.5／170（thin）、Mtume 28／26.5／225、Thornton 26／23／227。初稿 8 張全超，整格捨去：Lamp 簽約、Get It On 長度、Hanks／Massey 製作、McCoy Tyner 影響、Rick Laird、1967 回美、James Brown 伴奏、Pope 八首自作、Steve Lacy、A 面四首、Mtume 生年、Buster Williams、Baba Hengates 長度、Jack Jeffers、Cardona 名字。壓完回核 hook 依賴（四位貝斯手、五重奏、六首、21 分鐘、九十多分鐘、大樂隊、靈魂樂）都已補進 g1／g2 或該格。
- **51757** 骨架（各張只寫自己的歸屬句）：Ebony＝伴奏樂隊遷城換團名；Heaven & Earth＝兄弟組團＋錄音室大班底；Bonner＝鋼琴五重奏帶小提琴與人聲；Lasha＝客居倫敦借當地班底；Pope＝大師給第一份差事的樂手錄放克三重奏；Few＝巴黎流亡圈＋一面一曲；Mtume＝社區文化中心現場（地方場景）；Thornton＝學院派（世界音樂教職）與古巴／迦納打擊樂交會。hook 四型：人物定調（Ebony、Pope）／斷言（Heaven & Earth、Lasha）／場景（Bonner、Few、Mtume）／懸疑（Thornton，note 指派以教職與編制並列收尾、不寫因果）。
- **51758** 本組無掛名跨兩張，「他／她」引入法照第二句配：Ebony 前身是／Heaven & Earth 由兄弟組團／Bonner 生年與出生地／Lasha 本名／Pope 年齡（10 歲）帶出全名／Few 移居年（1969）／Mtume 父親（親屬）／Thornton 教職身分。Leroy Jenkins 同時在 Bonner 與 Mtume 名單，只指派給 Bonner；Cowell 只在 Mtume。
- **51759** 「日」後一字：Mtume 日於、Thornton 日錄；其餘只寫到月或年（Pope 生日改只寫年齡，避開 b 組可能的「日生」）。研究層禁區照辦：Ebony 不寫底特律圈、Few 不寫自營／首作、Bonner 不寫首張、Lasha 不寫靈性爵士、Pope 寫 1982 與放克／自由爵士、Thornton 不寫 Harlem 現場錄；後世生平（辭世、Juicy Fruit、UNESCO、Miles Davis）皆未進 note。媒體與資料庫名皆未進 note。
- **51760** 自查：hook 間中文 4-gram 0；c 組 hook 對 a／b 組 hook＋note 0；hook 與 note 無逐字重複句；開頭四字全批互異。`qa-batch hooks` 只標 a 組 The Eye of the Beholder「年份?1979」（非本組）；`chk-hook-crossgroup` 全部通過。

## 鉤子層（a、b）（51751–51755）
- **51751** 交件 `desc-tools/batches/hooks/add-20261104-ax3-hooks-a.json`（9）、`-hooks-b.json`（9），key／順序照研究稿。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 上限 170、full 230。逐筆（預算／hook 加權）：a｜Sly Boots 129／17、Turner 136／18.5、Free Enterprize 146／19、David Lewis 142／19、Ghostdance 143／18、Drnwyn 162／20、McAllen 165／17、Dormouse（full）210／19、Gnys 146／19.5。b｜Rin Eric 155／19.5、Circulation 156／22、Fairy Tale 168／20.5、Ton Vlasman 147／21.5、Princess Flower 170／20、Inner Dialogue 160／21、Smack（full）197／18、Ian A. Anderson（full）228／22、Probe（full）226／18。hook 原始字元 17–29。初稿 11 張超標，一律整格捨去（攝影師名、伴奏者名、錄音室／工程師、Royal York Crescent、Shirley Road、ALS／Jim Krein、Raindrops 曲名、Sunshine Of Your Love 等）；壓完回核 hook 依賴格都在 g1。
- **51752** 骨架歸屬（18 張 18 條）：Sly Boots＝同名系列曲一東一西分兩面；Turner＝同名曲首尾各一次；Free Enterprize＝曲名年份早於壓片年；David Lewis＝班底未署名；Ghostdance＝錄音時間記在滿月與冬至；Drnwyn＝核心一人包辦詞曲與封套文字；McAllen＝封面賽車對歌寫貓的反差；Dormouse＝客廳與語言實驗室兩種房間；Gnys＝只壓 12 張醋酸盤、2024 首次正式黑膠；Rin Eric＝手繪封套；Circulation＝最後一次同台；Fairy Tale＝唯一一張專輯；Ton Vlasman＝廠牌第 1 號；Princess Flower＝巴黎錄的長篇即興（Daevid Allen 只一句「團員之一」）；Inner Dialogue＝商業廠牌老闆背景；Smack＝暑期班學生一夜成團、整張翻唱；Anderson＝日後名團鼓手的早年伴奏；Probe＝團名倒寫成自營廠牌（「只出一張」讓給 Fairy Tale，Probe note 不帶）。hook 四型：懸疑（Turner、David Lewis、Circulation）／斷言（Free Enterprize、McAllen、Fairy Tale、Ton Vlasman、Gnys、Probe）／場景（Sly Boots、Ghostdance、Dormouse、Rin Eric、Princess Flower）／人物定調（Drnwyn、Inner Dialogue、Smack、Anderson）。
- **51753** 第二句句型（逐張配死，與 c 組 51758 不重）：Sly Boots 年份領句／Turner 錄音地點領句／Free Enterprize「署名的只有」／David Lewis 全名加樂器／Ghostdance「只有兩名成員」／Drnwyn「自費壓片的」／McAllen「自錄自製，還畫了封面」／Dormouse「藝名背後是」／Gnys「加拿大的」／Rin Eric「那是」／Circulation「主唱 X 兼」／Fairy Tale「製作欄掛的就是團名」／Ton Vlasman「X 是荷蘭民謠創作者」／Princess Flower 團名加「由」／Inner Dialogue 團名領句／Smack「他們都在堪薩斯」／Anderson 生年與出生地／Probe「從 1968 年冬天撐到 1972 年 5 月」。「他」引入法（單人掛名 9 張）：Turner 錄音地／Lewis 樂器／Hoag 掛名欄（作詞作曲）／McAllen 身兼工程與封面／Cuddy 藝名／Gnys 國別／Rin Eric 器物（彩色筆）／Vlasman 身分／Anderson 生年出生地；本組無掛名跨兩張。
- **51754** 「日」後一字：只有 Circulation「日星」（1969 年 7 月 8 日星期二）；其餘 17 張只寫到月或年（Anderson 生日改只寫 1947 年，Smack 寫「7 月下旬到 8 月初」）。主線 51775 照辦：Smack 壓量寫「極少量」不寫數字；Princess Flower 以 1968 六首原版為準；Dormouse 寫加拿大、年份只寫標籤 1968 年 6 月版權（51706）；Probe 發行年寫 1971；Gnys／Inner Dialogue 為一般卡照寫。媒體名、資料庫名、樂評與唱片行文案出處一律未進 note（Smack 的 fuzz 描述、Probe 的 wah-wah／phaser 只寫聲音本身）。Free Enterprize hook 原寫「1979 年夏天」被 qa 判「年份?」，改用曲名〈Summer Of 79〉。
- **51755** 自查：hook×hook 中文 4-gram（含 c 組）0；hook 對他張 note 原有「荷蘭小廠」（Vlasman hook×Fairy Tale note）已改 Fairy Tale note 消除；hook 前四字與 add-202610／11 已出 hook 比對，Turner「〈The」、Gnys「1969」、Anderson「後來的」三處撞舊批已改寫，a／b 現 0（c 組 Heaven & Earth「芝加哥」、Odean Pope「Colt」、Mtume「布魯克林」撞舊批，留給主線／c 組）。`qa-batch hooks` 全部通過 ✓；`chk-hook-crossgroup` 全部通過 ✓（只報不擋：Ton Vlasman「沒有鼓組」屬編制內容）。
- 51777 主線改 c 組 3 句 hook 開頭（前四字撞舊批）：Heaven & Earth、Odean Pope、Mtume 改語序，事實不變。

## 寫作層（writer-1）（51761–51765）
- **51761** 交件 `desc-tools/batches/output/add-20261104-ax3-out-1.json` 13 張（thin 12：128–180；full 1：Dormouse 240）。逐張：Sly Boots 180、Turner 175、Free Enterprize 128、David Lewis 157、Ghostdance 165、Drnwyn 180、McAllen 169、Dormouse 240、Gnys 141、Rin Eric 165、Circulation 147、Fairy Tale 177、Ton Vlasman 156。初稿超標 2 張（Sly Boots 186、Drnwyn 182），整格縮寫回區間。`qa-batch out` 只報「13 vs 26」（等 out-2）；`qa-check-research` 標記 0；`fix-spacing` 0；「據」「也就是」「這張專輯」grep 0。
- **51762** 第二句全照 note／51753 指派領句。David Lewis 第二句以「David Earl Lewis 是美國歌手，主唱兼打鼓」領句，隨即具名 hook 的「班底」＝Mike Cochrane；Ghostdance「只有兩名成員的 Ghostdance」後具名兩人；Circulation 在第二句具名團名；Dormouse「藝名背後是 Cris Cuddy」。日期只有 Circulation 一處「日星」、Dormouse 只到「年 6 月」。
- **51763** 否定句轉正面：Ton Vlasman note「沒有鼓組」寫成「打擊只交給手鼓」；Free Enterprize「無廠牌」寫成「兩人在美國私壓發行」。媒體名、資料庫名、榜單皆未進正文。
- **51764** Dormouse 壓量：note 原寫「據稱約壓 500 張」，正文不用轉述詞，直述「約壓 500 張」（單一來源；主線審稿若嫌不穩可整格捨去，捨後仍 ≥180）。
- **51765** 自掃 han() 4-gram（本檔 13 張＋writer-2 hook）：3 張以上只剩「主奏吉他」（樂器名）；拆掉 2 張殘片「十二首歌」「自行發行」「與合成器」「奏吉他與」「小廠發行」「迷幻搖滾」「他彈吉他」「民謠搖滾」「迷幻民謠」（Turner 改 folk rock、Sly Boots 改「帶 acid rock 色彩的民謠搖滾」；Rin Eric 的「迷幻民謠」為 note 指派領句保留）。現況 2 張以上只剩「主奏吉他」×3；out-2 交件後請主線跨檔合掃一次。

## 寫作層（writer-2）（51766–51770）
- **51766** 交件 `desc-tools/batches/output/add-20261104-ax3-out-2.json` 13 張（full 8：205–239；thin 5：162–180）。逐張：Princess Flower 162、Inner Dialogue 176、Smack 205、Anderson 237、Probe 238、Ebony 227、Heaven & Earth 171、Bonner 239、Lasha 238、Pope 180、Few 179、Mtume 235、Thornton 221。`qa-batch out`、`qa-check-research`、`fix-spacing` 皆 0；「據」、資料庫與媒體名 grep 0。
- **51767** 初稿 4 張超標（Princess Flower 205（thin）、Bonner 257、Anderson 246、Probe 241），整格捨去：Princess Flower 捨〈Ancient Faces〉15 分 36 秒整格（hook 已帶「最長一首 15 分半」，留著即複述 hook）與「美國」；Bonner 把樂手分工改成並列短句；Anderson 錄音地改「等處」句。
- **51768** 避免複述 hook：Lasha 第二句不再寫「生於德州」只寫 1929 年出生；Heaven & Earth 不再寫「四位」，改「名單以 Louis Satterfield 打頭」；Mtume 不寫約 91 分鐘（hook 已有九十多分鐘），The East 寫成「帶黑人民族主義色彩、也兼辦教育」；Anderson 時序寫「Dire Straits 成軍是錄完這張之後的事」。Mtume 日期句寫「29 日，地點是」，與鉤子層 51759 預配的「日於」不同但全批唯一；Bonner 生年改「生於 1948 年的 Joe Bonner」以拆開 hook 尾字「女聲」與日期的黏合。
- **51769** 自掃（兩檔合掃、han() 4-gram）：3 張以上只剩樂器名「次中音薩克斯風」；途中拆掉跨檔 2 張殘片「錄下這張」「兩把吉他加」「風琴撐起」「貝斯與鼓」「與合成器」「兩位女聲」「這張唱片」「風琴口琴」「與電貝斯」「他吹長笛」，以及組內「拉小提琴」「吹次中音」「貝斯打鼓」。剩 2 張的「自由爵士」（曲風名）與「克斯風手」（樂器名）不動。
- **51770** 第二句領句全照 note 指派；身分補足：Princess Flower、Inner Dialogue、Probe 只用 note 內的編制描述（未從 facts 撈曲風）。
