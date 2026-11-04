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
