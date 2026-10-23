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
