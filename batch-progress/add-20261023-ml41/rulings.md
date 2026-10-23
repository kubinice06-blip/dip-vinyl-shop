# add-20261023-ml41 裁定（情緒薄格策展線・恍惚：日本 dub／downtempo 暖盤＋ml37 UK dub 剩餘）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 7 輪，本工作階段負責 ml41、ml35；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml41 列，可擴寫 ml37），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml41.json`（兩輪 30 張）→ `master-ml41.json`（MB 回查 27/27 釘住、人工 3）→ 主線汰 3 → `pick.json`（27）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml41-cards.json`（27 張；研究 a–d 各 6、e 3）。身分：MB 釘住 24、§1 人工 3（LITTLE TEMPO《Ron Riddim In Dub》、Likkle Mai《Dub Is the Universe》、松永孝義《The Main Man》）。
> **預留：研究 a 19241–19250、b 19251–19260、c 19261–19270、d 19271–19280、e 19281–19290、鉤子 19291–19300、寫作 19301–19310、主線 19311–19320。**
---

## 主線策展（不佔條號）
- 策展第一輪 21 張（主場景 jp-dub 6、jp-downtempo 9；擴寫 ml37 UK dub 6），第二輪主線裁定往日本 jazzy／instrumental beat downtempo 與日本 reggae 人聲兩池補 9（jp-beats 8、jp-dub 1）。挖不到 54，照實交、不湊數。
- **主場景見底的原因**（池中三軸先擋）：Mute Beat、こだま和文、Dry & Heavy、Oki Dub Ainu Band 判冷（z −0.4 上下）；Audio Active x 2.9 貼邊；Kyoto Jazz Massive／Sextet、Cro-Magnon、Jazztronik、Mondo Grosso、FreeTEMPO 落雀躍；CALM、Rei Harakami、砂原良徳判輕；DJ Krush 全冷。UK dub 二線（Zion Train、Dub Syndicate、Alpha & Omega、Bush Chemists、Disciples、Rootsman、Jah Shaka）池中全落頹靡——只收 lovers dub 與人聲盤。LITTLE TEMPO 只收 dub 版（原盤《Ron Riddim》池中 y 0.2）。
- **主線汰 3**：Nomak《Calm》、Michita《Dawning》（y 估 0.8 剛好在邊距、同型 Uyama Hiroto／Fat Jon／Emancipator 池中 y 0.5–0.7）；Hollie Cook《Twice》**撞卡**——ml40 分支（`claude/mood-cells-ml40-mc22`）卡單已收，讓給該批。
- Samurai Champloo 兩張原聲（Tsutchie）MB 為 Album＋Soundtrack：原創配樂專輯、池中同系列《departure》已在，照先例收，不走 §5.6。
- Polaris《Union》《Music》ml4 曾因「同團留三張」汰掉，非聲音理由；池中同團兩張 y、z 0.9–1.0，收。
- 跨分支去重：對 origin 前 40 個 `claude/*` 分支與 main 的 seed 與卡單，除 Hollie Cook《Twice》外 0 撞（ml38 分支尚未推出，寫入前再查一次）。

## 研究 d 組
- 19271：BudaMunk《Movin' Scent》**推翻卡單年份**：MB 2019-08-29 為筆誤，Discogs 實物 CD（Dogear DERCD-071）2018-08-29、iTunes ℗ 2018、OTOTOY 與 P-Vine 黑膠新聞皆 2018，year 應改 2018、label 填 Dogear Records；curatorWhy 的「沖繩民謠 dub」為場景樣板、與本盤無關。**moodGuess 存疑：z**（廠方稱先行曲 dark、5 首有 rapper 來賓；機器分析多為 80–90 BPM 半拍、低頻厚，x／y 相符）。
- 19272：mabanua《Done Already》身分無誤（2008，日期 MB 10-10／iTunes 11-19 兩說，寫 2008 年即可）。**moodGuess 存疑：x／y**（人聲曲佔多、頻譜偏亮、低頻佔比比 beat 盤低；BPM 集中 92；z 暖成立）。
- 19273：《masta》**不是 Tsutchie 個人曲為主**：前 9 首 Force of Nature、後 10 首 Tsutchie（MB 曲目藝人欄與 Wikipedia 一致）。**moodGuess 存疑：整張偏動**（Wikipedia 稱 Masta 為 Departure 的「陽」、高速高能，FoN 曲用於打鬥；機器分析前半能量與頻譜重心都高於 Playlist），建議汰換或降優先。
- 19274：《playlist》全盤 Tsutchie 一人（含〈Fly〉feat. AZUMA RIKI），非合輯；機器分析低頻佔比高、rms 全組最低、多數 85–100 BPM，是本組最穩的一張；〈Strike Back〉等 129–136 BPM 少數偏快曲。
- 19275：Tsutchie《THANKS FOR LISTENING》與 19276《this is a recording》**聲音完全查無來源**（未上 Apple／Spotify 無法機器分析；Discogs 僅風格標籤 Downtempo／Instrumental,Breaks,Abstract；tower.jp 403、CDJournal 503）。status thin，**moodGuess 存疑：全盤無事證**，《this is a recording》的 Breaks／Abstract 標籤與 x 2.5 有衝突風險，建議列「無法驗證」優先汰換。
- 19277：聲音機器分析（librosa 對 iTunes 30 秒試聽片段，只進 notes 不進 facts）：Movin' Scent 中位約 83 BPM；Done Already 約 92；Masta 前半 86–99 且有 129 的偏快曲；Playlist 85–100。報告的 150–200 BPM 數值多為倍速誤判。
- 19278：研究層 WebSearch 共用 8 次（超過每張 3 次的總量不致，卡數 6）；Discogs API、MB、iTunes lookup 可用，ja Wikipedia 部分頁 404。

## 研究 e 組
- 19281：DJ Deckstream《Soundtracks》《Soundtracks 2》兩張實際都是「每曲一位美國 MC／歌手領唱」的 jazzy hip-hop／R&B 企劃盤（Discogs 風格含 Contemporary R&B、RnB/Swing），不是器樂 beat 盤；BPM、取樣 dusty 程度、低頻、殘響、類比或數位皆查無樂評，facts 只寫可考的客座、混音、曲長與風格標籤，status thin，兩張都寫「moodGuess 存疑」。
- 19282：Likkle Mai《MW》身分核對無誤（2007-07-21、MK Starliner、MKD-001、9 曲）；Discogs 風格標 Dub，但無來源證實有 dub 版曲目（curatorWhy 的「dub 混音」存疑）；編制為樂團＋銅管，多首用 drum programming，「重」與速度無來源。likklemai.com 已被賭博站接管，不當來源。
- 19283：研究層 WebSearch 用 3 次；樂評站（CDJournal、Tower、Billboard Japan、ototoy 商品頁）多數打不開或無此盤，不硬湊聲音事實。

## 研究 c 組
- 19261：Mad Professor《Bitter Sweet Dub》（Part.3）身分核對無誤（2008、Ariwa、日本盤 VICP64559，16 首＋日本盤額外曲 Midnight Dub）。本集查無任何樂評或逐曲聲音描述，聲音只能從系列定位推（第二集內頁寫明橋接 dub 與 lovers 聽眾、1997 第一集有 Carroll Thompson、John McLean 等人聲參與），status thin；寫「moodGuess 存疑」：器樂 dub 是否有旋律主奏與暖度無來源。
- 19262：Hollie Cook《Hollie Cook》聲音有據（老派 reggae／dub、回音、復古合成器；單曲 That Very Night 被評 pulsating, dark, psychedelic），full；速度無來源。BBC 頁 403，只用 Wikipedia 轉述；母親身分不寫（Wikipedia 寫 Jeni、Culture Club 和聲，與策展常見的 Belle Stars 說法不一致）。
- 19263：Horace Andy《Midnight Rocker》Hot Press 以 joyous、gentle、skank 鍵盤、銅管爆擊形容，偏輕快；寫「moodGuess 存疑」於 y；2022 年 Midnight Scorchers 為另一張 dub 延伸，勿混。
- 19264：Horace Andy & Mad Professor《From the Roots》PopMatters 稱 rootsy、somber，帶 dub 質感，是人聲歌曲專輯而非 dub 器樂；2 首俏皮 dancehall。Sly & Robbie 掛名僅 Discogs 單源，facts 以限定語寫。MB 2004-10-18，PopMatters 稱 11 月，寫 2004。
- 19265：松永孝義《The Main Man》身分核對無誤：Discogs master 3833391／release 8074427，Overheat Records OVE-0091，2004-07-09（Apple 日本站同），10 首約 45 分；卡單 label 欄空白，建議補 Overheat Records。樂評找不到，聲音靠樂手名單（烏克麗麗、鋼棒吉他、曼陀林、單簧管、薩克斯風、長號）、曲目（夏威夷、探戈）與 OTOTOY 對其貝斯 warm 的形容，status partial；速度與 dub 程度「moodGuess 存疑」。
- 19266：BudaMunk & J.Lamotta《Searching Skies》評論偏 airy、floating、soothing synths，只偶爾有硬小鼓，寫「moodGuess 存疑」：偏輕盈通透，非 dusty 厚糊。實為東京製作人＋柏林歌手的合作盤。
- 19267：研究層 WebSearch 用 3 次以內（Mad Professor 2 次、Hollie Cook 1 次、Horace Andy 2 次、松永 2 次、BudaMunk 1 次，略超；理由：兩張 Mad Professor 相關卡與日文冷門盤需交叉驗證）；Discogs API 直連可用。

## 研究 b 組
- 19251：Likkle Mai《Roots Candy》身分核對無誤（2006-02-08、Beat Records BRC-141，MB／Discogs／Tower 一致）。Tower 聽眾評論與 bounce 顯示整張不是純 roots／dub：約一半是 reggae dub，另有近 bossa 與流行曲 → 寫「moodGuess 存疑：y 1.0 可能偏高（0.5–0.8）」；暖度（女聲、鋼鼓、長笛、迪吉里杜管）有據。速度無來源。
- 19252：Likkle Mai《mairation》身分核對無誤（2009-11-04、MK Starliner MKD-002）。bounce 樂評描述為人力樂團、引用 1970 年代 riddim 的躍動 roots rock reggae，加 dubwise 混音 → 寫「moodGuess 存疑：偏躍動而非慢沉，x、y 可能偏樂觀」。混音森俊也與內田直之（Dry & Heavy 的 dub controls）見 Tower；Discogs 無內頁人員。
- 19253：Likkle Mai《Dub Is the Universe》身分核對無誤（Discogs 7733102、Tower 3103095：2012-07-04、MKD-003、11 首）。TuneCore／Irie 寫 2010 年與 Tower／Discogs／3rd-in 的 2012 衝突 → 取 2012（有發售日與編號為證），2010 應為 Scientist 混音版年份。標題雖有 dub，來源只證實 2 首由 Scientist 混音，「全以 dub 處理」查無 → 寫「moodGuess 存疑」，status thin；建議主線以評分結果決定去留。
- 19254：Polaris《Union》身分核對無誤（2005-08-03、Familysong MTCA-5018）；第三張全長、新鼓手荒木ゆうこ首作。聲音有據（Tower／bounce：力道較前作強、色彩濃、漂浮感仍在，曲長 6–12 分鐘）。moodGuess 輕度存疑：x 可能略高。2011 年盤文案（Billboard JAPAN）不採。
- 19255：Polaris《Music》身分核對無誤（2015-02-18、UVCA-6003）。OTOTOY 訪談提供錄法與母帶細節（貝斯拖拍、手作土味、柏原譲自行母帶）；「dub 基調」只見於搜尋轉述，不寫入 facts。y 0.9 在邊界，標輕度存疑。
- 19256：Mad Professor & The Mad Men Band《Dub You Crazy With Love (Part 2)》身分核對無誤（2000、Ariwa ARICD132，18 首）。「lovers dub」定性來自 Discogs 收錄的內頁文字與曲名，查無樂評；Spaceflight 2001 等曲可能偏硬，速度無來源 → 輕度存疑。與 ml38 撞提風險由主線寫入前再查。
- 19257：本組 WebSearch 共用 9 次（Likkle Mai 5、Polaris 2、Mad Professor 1，另 1 次無結果）；HMV／Tower／日本站的 WebFetch 被 403，改以瀏覽器 UA 的 curl 取得商品文案。

## 研究 a 組
- **19241**：LITTLE TEMPO《Kedaco Is Born》全名為《Kedaco Is Born - Dubwise》（Discogs 3598193，封面與碟面印 Dubwise）；12 首中僅〈Yuge Dub 81〉有人聲（Likkle Mai）。日文維基／weblio 把《Kedaco Sounds》與本張都寫 CTCR-11086，採 Discogs（Sounds＝11081、本張＝11086）。聲音只有編制與混音署名，無拍速／樂評文字。
- **19242**：《Ron Riddim In Dub》身分過關（Discogs 1616405，2000-01-12，Rhythm Republic RR12-88140，2×12"）；9 首曲名對應原盤《Ron Riddim》（1999-08-06，cutting edge）。Discogs 未載混音者與樂手，不寫誰混。**moodGuess 存疑**：全部聲音描述（慢、回音長、貝斯厚、鋼鼓旋律）皆無文字佐證，dub 版可能旋律被拆碎，偏冷硬。
- **19243**：Ryukyu Underground 首作（RES-60）：MB／Apple 日期 2002-03-27、Discogs 2002-04-10，年份同。Orlando Weekly 樂評提到 Talvin Singh〈OK〉，但日英版曲目皆無此曲且該文未寫盤名，不進 facts。**moodGuess 存疑**：宣傳文字列 jungle、hip-hop、Afrobeat、drum'n'bass，非單純慢 dub；慢與厚的證據只有兩首 Dub 曲名與 Discogs 標籤。
- **19244**：《Mo Ashibi》實際發行 2003-04-23（Apple、Discogs），MB 的 2003-08-23 疑誤植，卡單 year 2003 不受影響。**moodGuess 存疑**：風格標籤含 House，開場為 Extended Mix，快的 club 拍比例無法查證，x 可能偏高或偏輕。
- **19245**：《Shimadelica》身分過關（RES-110，2006-04-26）。AllMusic 頁 403 讀不到；**moodGuess 存疑**：「慢 dub 拍、迷幻回音厚」無文字佐證，Discogs 標 Ambient／Downtempo 可能更空靈。
- **19246**：《Umui》（ウムイ）身分過關（RES-148，2009-04-15）；Ryukyu Shimpo 2022 年的《ウムイ》是大城美佐子 best of，同名不同碟已排除。**moodGuess 存疑**：Discogs 風格不含 Dub（只 Ambient／Downtempo），10 首僅〈East Town Dub〉明寫 Dub，「島唄歌手人聲為主」查無客座歌手署名；低頻厚、殘響長缺證據，可能偏空靈偏輕。
- **19247**：Ryukyu Underground 四張共通——日文來源（CDJournal 搜尋無結果、Tower 403、Apple 無編輯評論）查不到專輯評論，聲音 facts 只到曲風標籤、曲名與宣傳文字；status 一律標 thin，建議主線視評分結果再決定是否保留這組（四張中 moodGuess 皆存疑）。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 15 張**（研究層聲音反證或聲音零來源；恍惚線存疑且有反證的一律汰，不硬留）：
  - 拍子快、club 化（x 風險）：Ryukyu Underground 首作（jungle、hip-hop、Afrobeat、drum'n'bass 混編）、《Mo Ashibi》（House 標籤、Extended Mix 開場）、Force of Nature / Tsutchie《masta》（前半 Force of Nature 為打鬥場面高能曲，Wikipedia 稱它是《Departure》的「陽」）、Likkle Mai《mairation》（躍動的 roots rock reggae、人力樂團）。
  - 輕、空靈、乾淨（y 風險）：Ryukyu Underground《Umui》（Discogs 不含 Dub、偏空靈）、Likkle Mai《Roots Candy》（約半數近 bossa 與流行曲）、《MW》（多首鼓機程式、dub 混音查無）、BudaMunk & J.Lamotta《Searching Skies》（airy、floating）、mabanua《Done Already》（人聲曲多、頻譜亮、低頻佔比低）、松永孝義《The Main Man》（夏威夷、探戈、烏克麗麗、單簧管，非慢 reggae）。
  - 偏冷：BudaMunk《Movin' Scent》（廠方自稱「ドープでダークでグルーヴィ」；年份另有 MB 筆誤 2019→2018）。
  - 性質不符或聲音零來源：DJ Deckstream《Soundtracks》《Soundtracks 2》（每曲美國 MC／R&B 歌手領唱的企劃盤，不是器樂 beat 盤）、Tsutchie《THANKS FOR LISTENING》《this is a recording》（聲音無任何來源、無 Apple 試聽，後者 Discogs 標 Breaks）。
- **留下的存疑張**：LITTLE TEMPO《Ron Riddim In Dub》（原盤池中 y 0.2，dub 版查無聲音來源；同團 dub 盤《ザ・ウェイ・バック・ホーム・イン・ダブ》池中 y 1.3 落恍惚）、Ryukyu Underground《Shimadelica》（Ambient／Downtempo，殘響無證）、Likkle Mai《Dub Is the Universe》（只兩首 Scientist 混音）、Polaris《Union》（新鼓手律動較紮實）、Mad Professor 兩張 lovers dub（只有內頁定性）、Horace Andy《Midnight Rocker》（joyous、skank 鍵盤）、《From the Roots》（somber）、Hollie Cook（〈That Very Night〉黑暗迷幻）。評分看實測。
- 不補位：策展兩輪已回報日本 dub／downtempo 見底。
- 定案 **12 張**（a 3、b 4、c 4、d 1、e 0）。汰除卡存 `dropped-cards.json`，研究稿條目移到 `dropped-research.json`。研究 qa-batch 全過。跨分支去重（含 `claude/mood-cells-ml38-md22`、`claude/mood-cells-ml40-mc22`）0 撞。

## 鉤子層（a–e；19291–19300）
- **19291** 交件：`desc-tools/batches/hooks/add-20261023-ml41-hooks-{a,b,c,d,e}.json`（3／4／4／1／0＝12；e 為 `[]`）。公式照第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。thin 上限 170（Ron Riddim In Dub、Shimadelica、Dub Is the Universe、Bitter Sweet Dub），其餘 230。hook 原始字元全 ≤30。
- **19292** 逐筆預算／hook 加權：KEDACO 207／23；Ron Riddim In Dub 169／18；Shimadelica 164／18；Dub Is the Universe 154／19；Union 217／16；Music 199／19；Dub You Crazy Part 2 203／17；Bitter Sweet 156／20；Hollie Cook 223／13.5；Midnight Rocker 224／20；From the Roots 213／19；Playlist 226／22。初稿 10 張超標，整格捨去：System Vertigo、完整盤名 Dubwise、Rhythm Republic、Shimadelica 曲長、MK Starliner、〈Open Your Eyes〉〈One More Kiss〉曲名、Urban Brass／人聲名單、〈Milk and Honey〉、Dennis Bovell、Shara Nelson、Style Scott／〈Mr. Bassie〉、前兩次合作盤名、Ariwa Sound Studios、渡辺選 hip-hop 音樂人與四組分擔。壓完回核：hook 依賴格都在 g1／g2（From the Roots 的「肅穆」在 g3，預算內未動）。
- **19293** 骨架歸屬（12 條各一）：KEDACO＝錄音師就是團員；Ron Riddim In Dub＝原盤全改 dub、只出黑膠；Shimadelica＝沖繩錄、洛杉磯混的檔案往返；Dub Is the Universe＝震災後的訊息盤；Union＝換鼓手後的新編制首作；Music＝停擺後重啟、在家錄；Part 2＝內頁寫給 dub 與 lovers 兩種聽眾；Bitter Sweet＝電器技師客廳起家；Hollie Cook＝龐克名人之女；Midnight Rocker＝翻唱自己長年合作樂團的歌（人聲遠端傳檔那格讓給 Shimadelica 的骨架，本張不寫）；From the Roots＝第三度合作；Playlist＝動畫原聲中唯一獨力之作。
- **19294** 同藝人分軸與「他／她」引入：LITTLE TEMPO——KEDACO 帶結成年與國籍（「LITTLE TEMPO 是」句型）、Ron Riddim 由器物 steel pan 帶出；Polaris——Union 帶成員與 Fishmans 淵源（樂器領句）、Music 帶停擺年份與錄法；Mad Professor——Part 2 由內頁之口與自營廠牌、Bitter Sweet 由前職與出生城市（生平軸只走本張）、From the Roots 由合作掛名；Horace Andy——Midnight Rocker 由 Massive Attack 淵源揭曉懸念、From the Roots 由「牙買加歌手」並列。避開已上架：ml1／ml32 的「唱的人是」「本名領句」、ml9 的「dub 最適合實驗」、ml4 Polaris《Home》的長曲 hook、ml4 LITTLE TEMPO dub 版的時序 hook。
- **19295** 第二句句型：是（KEDACO）／由器物帶出（Ron Riddim）／成員名字（Shimadelica）／出身地（Likkle Mai）／樂器（Union）／停擺年份（Music）／出處（Part 2）／出生城市（Bitter Sweet）／名字接生年（Hollie）／揭曉懸念（Midnight Rocker）／兩人並列（From the Roots）／前身分（Playlist）。
- **19296** 「日」後一字：由、在、交、推、發、問、面、上、與；Part 2、Bitter Sweet、From the Roots 只寫年。
- **19297** hook 四型：人物定調（KEDACO、Bitter Sweet、Hollie、Playlist）／場景（Ron Riddim、Shimadelica、Music、Likkle Mai）／斷言（Union、Part 2、From the Roots）／懸疑（Midnight Rocker，第二句收）。開頭前四字與全庫 hooks 互異（Midnight Rocker 原「Mass」撞 No Protection，改「一首 M」）。
- **19298** 媒體名與榜單名次不進 note（Tower／bounce／OTOTOY／Hot Press／PopMatters／BBC 一律寫「樂評」或不寫）；研究稿「moodGuess 存疑」未進 note；Hollie Cook 母親不寫；Sly & Robbie 寫「樂手名單列有」；Ron Riddim 不寫混音者。日本人名照原文（内田→內田直之照研究稿、柏原譲、荒木ゆうこ、松田タダシ、渡辺信一郎、土生剛）。
- **19299** 自查：hook 間 CJK 4-gram 0；hook 與 note 無逐字重複句（Hollie 的「父親是」改「的女兒」）。`qa-batch hooks` 全部通過；`chk-hook-crossgroup` 5 組 12 張全部通過（hook 加權 13.5–23、note 162–230）。

## 寫作層（writer-2）
- **19306** 交件 `desc-tools/batches/output/add-20261023-ml41-out-2.json`（6 張）：Part 2 234、Bitter Sweet（thin）166、Hollie Cook 232、Midnight Rocker 234、From the Roots 239、Playlist 234。初稿超標 3 張（Midnight Rocker 269、From the Roots 242、Bitter Sweet 191），整格捨去：盤名《Midnight Rocker》改「這 10 首新錄音」、藝名句縮成一句、Bitter Sweet 的系列全名與「dub 製作人」身分字。
- **19307** 第二句照鉤子層 19295 配表：Part 2 以「這句話印在⋯內頁」出處領句；Bitter Sweet 以「圭亞那喬治城是⋯出生地」領句；Hollie Cook 名字接生年；Midnight Rocker 以「唱〈Safe From Harm〉的是」揭曉（不帶 hook 的「這回」，避免複述）；From the Roots 兩人並列（Horace Andy 用「來自牙買加的 reggae 歌手」，避開 Midnight Rocker 的「牙買加歌手」）；Playlist 以「出身 hip-hop 團體」前身分領句。「日」後一字照 19296：面（Hollie）、上（Midnight Rocker）、與（Playlist），其餘三張只寫年。
- **19308** 媒體名與榜單名次整句不寫：Hot Press、PopMatters、BBC、Erik Magni、Mark Harris 全未進正文，評價只留 note 指派的內容，以「在樂評筆下」「評論把它聽成」陳述；BBC「2011 年至今最好聽的 reggae 專輯之一」與 PopMatters 分數不寫。無「據說／據傳」。日本人名照原文（渡辺信一郎）。
- **19309** 跨兩檔合掃中文 4-gram：我方 2 張殘片先當 3 張拆掉（`發行了這`、`由發行收`／`發行收首`、`樂評形容`、`樂評說它`、`的錄音室`）；定稿 3 張以上只剩 `日本樂團`（全在 writer-1 的 KEDACO／Ron Riddim／Music，本檔不涉）。
- **19310** 腳本：`qa-batch out` 全過（out-2 166–239，thin ≤180）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。只寫 note 項目：Part 2 未寫 Are We Mad 錄音室與班底；Hollie Cook 未寫 Mr Bongo、Dennis Bovell；Playlist 未寫 Geneon／黑膠重發。
