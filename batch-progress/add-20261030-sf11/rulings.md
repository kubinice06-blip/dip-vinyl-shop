# add-20261030-sf11 裁定（Spotify 追蹤藝人補卡池・冷門與身分待查：電子、lo-fi、小廠牌）

> 店主 2026-10-30 `/dip-card-create`：依 Spotify 追蹤藝人補卡池，每位缺漏藝人挑 1–2 張代表作（交接 `batch-progress/spotify-follow-20261030/PLAN.md`）。本工作階段負責 sf11、sf12。流程沿用情緒薄格線腳本（`batch-progress/HANDOFF-mood-cells-line.md` §二），**不做 moodGuess 邊距檢查**；情緒評分照 `batch-progress/mood-axes/RULES.md`，不算落格率。
> 策展：`curation-sf11a.json`（16）＋`curation-sf11b.json`（14）→ 主線汰 5、改 2（`master-override-sf11asf11b.json`）→ `master-sf11asf11b.json`（25 張；MB 21、人工 4）→ `pick.json`（25）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261030-sf11-cards.json`（25 張；研究 a–e 各 5）。
> **預留：研究 a 49801–49810、b 49811–49820、c 49821–49830、d 49831–49840、e 49841–49850、鉤子 49851–49860、寫作 49861–49870、主線 49871–49880。**（418xx／419xx 之後的 420xx–423xx 可能被並行的 sf03／04／06／08 取用，本批改用 498xx 避撞。）
---

## 主線策展（不佔條號）
- **清單 35 位 → 收 24 位、25 張；跳過已在池 1 位；不收 10 位。**
- **Spotify 藝人頁回查（主線全批 35 位）**：`open.spotify.com/embed/artist/<id>` 熱門曲逐位抓下（`scratchpad/spcheck/top.txt`）發回策展層核對。第一輪 sf11a 沒有熱門曲資料而把 9 位判不收，主線用熱門曲線索要求重查後補回 caldera（〈Sky Islands〉feat. Dianne Reeves＝洛杉磯拉丁爵士融合樂團 Caldera）、DJ Toner（與 Raynald Colom、Jorge Pardo、Erik Truffaz 合作的西班牙製作人）、Doctor Butcher（〈The Altar〉〈Season of the Witch〉＝1994 同名專輯的美國金屬樂團）、ERISTHEPLANET。Nicknack 熱門曲對應《Dearly Departed》（2010），策展改收該盤。
- **跳過（已在池）**：Scattered Purgatory → 池中寫法 破地獄（1 張）。
- **不收**：
  - Agosta——熱門曲全是 remix，查無正規專輯。
  - Declan McDermott——house 單曲與 remix。
  - North Downs——單曲與 EP（與 Maribou State 合作曲）。
  - Four Pens（四枝筆）——zh 維基與 MB 只有 EP、日本集結盤《One Day》與單曲，無正規錄音室專輯。
  - sloje（單曲與 4 首 EP）、ZipZap（單曲／EP，MB 那張無法確認是同一人）。
  - Whyte——只找到一張專輯，缺第二個身分來源。
  - Nice Face——熱門曲對不上任何可釘住的專輯。
  - Alexandra Atnif——策展提《Rhythmic Brutalism Vol.1》，但 Spotify 熱門曲（〈Side 2〉〈Undeciphered Distress Signal〉）對不上該盤或同年其他盤，國籍不明，身分無法與 Spotify 追蹤對象連起來，主線汰。
- **一位只收一張（主線汰第二張）**：Moin 汰《You Never End》留《Moot!》（AD 93 首作，評論集中）；Caldera 汰 1976 同名首作留《Sky Islands》（熱門曲標題曲）；特撮汰《ヌイグルマー》留出道作《爆誕》（MB 763d5913，2000-02-23）；ULTRA SUNN 汰新作《The Beast in You》留《US》。
- **改**：The Offset: Spectacles 國別 hk → us（Chicago Trouble In Mind 發行的美國一人計畫，研究層核實）。
- 交研究層把關：Posh Inverse 的中文團名「優雅逆轉」與 The Sign Of Human 的「記號士」是策展填的雙寫，研究層要找到官方來源，找不到就只用英文名；The Sign Of Human 台／港國別；skip skip ben ben 熱門曲（交雜隕石、無限大、海嘯列車）是否出自較新的專輯（MB 只到 2015《鏡中鏡》）；ERISTHEPLANET 盤名（策展寫《IT REALLY DO BE THAT DAMN PHONE》，MB 寫《IT BE THAT DAMN PHONE》）照封面與 Spotify 定；Sonia Calico 國別（熱門曲含中文）；The Luvmenauts 國別；pololu 熱門曲掛 Flow State Records（PLAN 列為廠牌、不收的那個帳號；pololu 本人是藝人，照收）；Mad Keys、Nicknack、PUZZLEMAN 無評論共識，代表作依完整度推定。

## 研究 a 組（49801–49810）
- **49801**（Moin《Moot!》）身分核實：MB 5f26ed11、AD 93、2021-07-09 皆對；真人鼓手（Magaletti）非鼓機，moodGuess 的 why 小修但方向不變（冷／躁）；留。
- **49802**（NUUAMM《w/ave》）推翻策展層：label 卡單寫 Kilikilivilla，MB／Billboard JAPAN／Discogs 皆為十三月（JSGM-019）；卡單 label 改十三月。年份 2017-06-28 成立（Last.fm 的 9 月不採）。聲音零可靠來源（僅廠方文案：迷幻、夢與現實之間），moodGuess 無法核實；status thin，寫作保守。
- **49803**（Mindchatter《DREAM SOUP》）身分、廠牌、年份皆對；第二張成立。moodGuess 輕度存疑：來源強調 indie pop 歌曲創作＋電子並重，非純律動舞曲；不為汰卡主因。
- **49804**（NoSo《Stay Proud of Me》）身分、廠牌、年份皆對；首作成立；Baek Hwong 為非二元，行文避性別代名詞。
- **49805**（Natural Magic《II》）身分、廠牌、年份皆對（LP 實體可能 3 月）；moodGuess 中度存疑：實為真人鼓＋貝斯的克勞特／太空搖滾即興，非『新世紀感舞曲』；『首作限量百卷卡帶』『JD Twitch 最後參與』查無頁面來源，不寫進 facts。
- 無建議汰卡；全組五張皆通過身分核實。

## 研究 b 組
- **49811**（Parks, Squares and Alleys《Against Illusions and Reality》）身分成立（MB RG 與 Bandcamp 皆 2015-05-29，自發行）。國別存疑：MB 藝人頁 RU（莫斯科／哈巴羅夫斯克），Bandcamp 所在地寫第比利斯；country 暫維持 ru，文案不寫國名。無樂評，status thin。
- **49812**（The Offset: Spectacles）**推翻主線國別改 us**：這是香港成員的三人團（Tom Ng、Vince Li、Ou Jian），曾在北京活動，並非 Chicago 的一人計畫；Trouble In Mind 只是 2021 十週年重發廠牌。建議 country 回 hk。專輯 2011-11-11 首發，原創專輯、無鼓，moodGuess 證實。
- **49813**（Nicknack《Dearly Departed》）身分成立：奧斯汀 DJ／製作人 Nick Malkiewicz，2010-06-15，自家廠牌 Crowd Control Records（卡單 label 可補）。無針對本盤評論，Spotify 追蹤對象是否同一人僅靠熱門曲比對；建議可汰（策展層已列風險）。
- **49814**（Mad Keys《Balance》）身分成立（聖路易、自發行、2020-01-09）；有真人貝斯鼓現場錄製。不寫「首張專輯」（2015 有《LoveWaves》），只寫他自稱 debut。「破百萬串流」單一自述來源。
- **49815**（Caldera《Sky Islands》）身分成立（Capitol，1977-04-28，原創專輯）。Dianne Reeves 客唱第 1、2 首僅 Wikipedia 專輯條目一源，行文保守；城市來源不一（LA vs NYC），文案只寫美國；「樂迷公認巔峰」無來源不採。
- 無必須汰卡者；Nicknack 與 Mad Keys 為弱案（只有一手資料），主線可擇汰。

## 研究 c 組（49821–49830）
- **49821**（DJ Toner《Outside》）身分成立（MB a2cbdc98、Tangential Music TAN0040ADG、2024）；**推翻策展層**：『與 Raynald Colom 合作』本盤查無，Colom 是 2026 年《DISCIPLINANTES MCM》的客座；本盤可證客座為 Erik Truffaz（Jorge Pardo 僅見專輯文案）。label 補 Tangential Music；Bandcamp 掛名 DJTONER Q4RTET，正文用 DJ Toner。moodGuess 吻合。
- **49822**（Doctor Butcher 同名專輯）身分成立（Jon Oliva＋Chris Caffery 副業，1994-12，GUN 050，原名《A Living Hell》，1994 年無美國版）。聲音來源只有維基歸類（前衛／力量金屬），評論頁 403，寫作勿編音色。
- **49823**（ERISTHEPLANET）盤名依 Apple Music／MB release 定為《IT REALLY DO BE THAT DAMN PHONE》（2026-08-21，12 首，EQT Recordings），MB 的 RG 名為 6 月 8 首原版；Rico Nasty 客座只在擴充版。國別 us 與 moodGuess 無來源（uncertain）；status thin，最適合汰的一張，建議主線視內容決定。
- **49824**（Posh Inverse）**推翻策展層**：(a) 《我想要的都在這裡》即 Bandcamp《This is all I need》（2016-07-01，MB 2016-06-28），但 Bandcamp 在它前面還有 2011《7 4/3》，『首張正規專輯』不成立；(b)『優雅逆轉』無官方來源，僅一筆活動資料庫場次標題暗示，建議藝人欄只用 Posh Inverse；(c) moodGuess『抒情嗓音』存疑，團是台北獨立／數學搖滾，同團 2020 年作被評為近乎無人聲後搖滾，此盤人聲未證。
- **49825**（pololu《A Ghost Shaped Lotus》）人工身分只靠 Apple Music TW 頁（2023-03-10，12 首，27 分鐘，℗ pololu）；Discogs 的 Pololu 只有 Monked Records 合輯曲目、無此專輯，兩者同一人無直接證據；『台灣』『Flow State Records 前身風格』皆無來源，label 維持空白；**建議汰**。

## 研究 e 組（49841–49850）
- **49841**（Dudu Tassa & the Kuwaitis《El Hajar》）身分、盤名成立；年份 MB 2019-01-25（World Circuit，數位）、英維基記 2018-10 以色列先行，卡單 2019 照 MB；樂評缺，來源為 Songlines 專題＋商店頁。無存疑。
- **49842**（The Luvmenauts《Ephemera》）推翻策展層：國別 it 不成立，Bandcamp 官方頁為加拿大多倫多樂團，卡單 country 改 ca，curatorWhy「義大利」須改；廠牌 Do Right! Music（MB 單源）。moodGuess 方向合理但『宇宙放克』措辭來源無，來源講 library music／surf／breaks；status thin。
- **49843**（The Sign Of Human 記號士《為時間做過的註解》）人工身分核實：Apple（2014-07-04、℗ Sony Music Taiwan、11 首含〈二十七樓大廈〉）＋Discogs 藝人頁；國別 tw 成立（非港）；「記號士」雙寫 Apple／Discogs 皆用，保留；首張專輯成立（此前僅 2012 單曲）；label 可填 Sony Music Taiwan。聲音來源幾乎沒有，thin，寫作保守。不建議汰。
- **49844**（特撮《爆誕》）身分、年份、廠牌成立（德間 Japan Communications，TKCA-71864）；首張專輯成立；Oricon／銷量查無不寫；曲風雜（含 smooth jazz、藍調、抒情），moodGuess 輕度存疑，不為汰卡主因。
- **49845**（ULTRA SUNN《US》）身分成立（MB 藝人註記比利時 coldwave／EBM 二人組、布魯塞爾）；廠牌 Artoffact；首張正規專輯成立；moodGuess 輕度存疑（訪談強調可唱可跳、九〇／千禧舞曲）；樂評正文未取得，thin。
- 無建議汰卡。

## 研究 d 組（49831–49840）
- **49831**（PUZZLEMAN《睏前愛用PUZZLEMAN》）人工身分核實：MB 無此藝人；Apple tw 1558991144＋iTunes lookup 證實盤名、2021-03-31、13 首、℗ 2021 KAO!INC.（顏社）；卡單 label 空白→顏社。Discogs 403 未開。聲音零來源（moodGuess 無法核實），status thin。資料極薄，建議主線斟酌是否汰；若留，寫作不得寫鼓／速度／採樣／暖調。
- **49832**（Skip Skip Ben Ben《鏡中鏡》）解決 curatorRisk：Spotify 熱門曲（交雜隕石、無限大、海嘯列車、小忞、穿越河流）逐曲比對 iTunes，全在《鏡中鏡》，並非較新專輯；團只有四張專輯（Bandcamp／MB 皆止於 2015），此盤即所求。國別 tw 保留（Bandcamp／MB 起源台北），但活動與北京地下圈相連，寫作層勿斷言單一地。moodGuess 輕度存疑：Bandcamp 標籤是車庫龐克／噪音流行／迷幻吉他，非合成器主導。label 無，留空。
- **49833**（Sonia Calico《Simulation Of An Overloaded World》）推翻策展層：國別 jp→tw（MB TW、area 台北、Bandcamp 台北市）；label 空白→More Time Records（倫敦，MTR032）；『東京民謠主題』不成立（只是〈Neo Tokyo Folk〉曲名）。首張專輯、2020-10-15、dancehall／kuduro／GQOM／trance＋東亞傳統樂器，與 moodGuess 吻合。
- **49834**（Space Raiders《Hot Cakes》）推翻策展層：〈Glam Raid〉在首作《Don't Be Daft》（1999，Skint BRASSIC 13CD），非本盤；Spotify 熱門八首對半分（本盤 4、首作 4，含最知名的〈Disko Doktor〉）。Hot Cakes 身分成立（2000、Skint BRASSIC 19CD）、可留；建議主線考慮加收或改收首作。『downtempo』無來源，只證實 big beat 分類。聲音零樂評，moodGuess 無法核實，status thin。
- **49835**（Super Besse《la nuit*》）重大推翻：Spotify 熱門八首中六首（Holod、Posmotri na Menia、Berlin Zoo、Prikazano、Mne Vse Odno、Tak Silno）在 2015《63610*》（MB 1be7a8d9-f28b-4fe6-a91c-b6d44ade85d2，I Love You Records，10 首），Rodina 在《Un Rêve》，只有 Yunost 在《la nuit*》。la nuit* 本身身分、年份、廠牌（I Love You Records ILOVEYOURE026）無誤、為第二張專輯；建議改收《63610*》或兩張並收。官網 supersuperbessebesse.com 已轉址到無關網域，不可引用。聲音僅 Last.fm 團級描述（Korg 合成器主導後龐克），moodGuess 無本張來源，存疑。
- 建議汰卡：無強制；PUZZLEMAN 資料過薄為首要候選。建議改收／加收：Super Besse→《63610*》、Space Raiders→加《Don't Be Daft》。

## 主線（研究交件後改卡單，條號 49871 起）
- 49871：照研究層推翻改卡單（`desc-tools/batches/cards/add-20261030-sf11-cards.json`）：
  - **汰 pololu《A Ghost Shaped Lotus》**（研究 c 49821–49825：身分只靠 Apple TW 商店頁，台灣國別與 Flow State 前身說法都無來源）。研究 c 檔同步刪該筆。sf11 改為收 23 位、24 張。
  - **Super Besse 改收 2015《63610*》**（研究 d：Spotify 熱門八首有六首在此盤，《la nuit*》只有一首），MB 1be7a8d9、I Love You Records。研究 d 同支代理重研此盤換掉原筆。
  - **The Offset: Spectacles 國別回 hk**：主線策展時改 us 是錯的（研究 b 49811：香港成員三人團，Trouble In Mind 只是 2021 年十週年重發廠牌）。
  - Posh Inverse 去掉「優雅逆轉」（研究 c：無官方來源），key 改 `desc4:Posh Inverse|我想要的都在這裡`，研究 c 檔同步。
  - The Luvmenauts 國別 it→ca（多倫多，研究 e 49842）；Sonia Calico jp→tw、label More Time Records（研究 d）；記號士 tw、label Sony Music Taiwan（研究 e 49843）。
  - label 補：NUUAMM 十三月（研究 a）、Nicknack Crowd Control Records（研究 b）、DJ Toner Tangential Music（研究 c）、ERISTHEPLANET EQT Recordings（研究 c，盤名照 Apple／MB release 定為《IT REALLY DO BE THAT DAMN PHONE》）、PUZZLEMAN 顏社（研究 d）、ULTRA SUNN Artoffact（研究 e 49845）。
  - Space Raiders 研究 d 建議加收首作《Don't Be Daft》：不加，照「一位一張」留《Hot Cakes》。PUZZLEMAN 研究 d 列為汰卡候選（資料極薄）：身分已由 Apple 與 iTunes lookup 核實，thin 照收。
