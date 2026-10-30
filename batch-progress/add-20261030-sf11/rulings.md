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
- **49836**（Super Besse）主線採納 49835 建議，卡單改為《63610*》（MB 1be7a8d9，2015-05-25，I Love You Records ILOVEYOUREC017，10 首，首張錄音室專輯）；研究稿 la nuit* 整筆換成 63610*。聲音只有 Bandcamp 標籤（coldwave／post-punk／synthwave）與 Last.fm 團級描述，status thin；『house』『experimental』標籤無第二來源，不引。Young and Cold Records 僅黑膠歐洲出貨方，非發行廠牌。

## 鉤子層（a、b、c）（49851–49855）
- **49851** 交件：`desc-tools/batches/hooks/add-20261030-sf11-hooks-a.json`（5）、`-hooks-b.json`（5）、`-hooks-c.json`（4，pololu 已汰），key 逐字照研究稿、順序不變、欄位只有 key／hook／note。預算公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（NUUAMM、Parks、Nicknack、ERISTHEPLANET、Posh Inverse）上限 170，其餘 230。逐筆（預算｜hook 原始字元／加權）：a——Moot! 202｜27／23.5、w/ave 154/170｜25／21.5、DREAM SOUP 195｜25／25、Stay Proud of Me 228｜26／19.5、II 223｜20／20；b——Against Illusions 166/170｜20／20、The Offset: Spectacles 211｜22／22、Dearly Departed 168/170｜28／26、Balance 230｜26／25、Sky Islands 218｜29／29；c——Outside 219｜27／25、Doctor Butcher 228｜27／22.5、IT REALLY DO BE THAT DAMN PHONE 152/170｜17／17、我想要的都在這裡 164/170｜29／19。初稿 9 張超標，整格捨去：Moin 的兩人全名與〈Right Is Alright〉鼓、Mindchatter 的〈Nothing On Me〉與總長、NoSo 的大學作業銅管弦樂與「身兼」、Natural Magic 無、Parks 的封面插畫與曲長、Offset 的 Rob Ferrier 與首上串流、Nicknack 的 CEO 與兼差、Mad Keys 的中學和哥哥做節拍、Caldera 的 Carlos Vega 與編制、DJ Toner 的〈Flama〉與個人首作、Doctor Butcher 的《A Living Hell》原名與回歸 Savatage。壓完回核：hook 依賴格全在 g1／g2（Doctor Butcher 把 Atlantic 二選一從 g3 前移到 g2）；NoSo、Mad Keys、Posh 的 hook 事實為 hook 自帶（研究稿 facts 有 src）。
- **49852** 骨架歸屬（14 張 14 條，只擁有者寫歸屬句）：Moot!＝電子組合加真人鼓手轉向搖滾；w/ave＝唱作歌手與 GEZAN 主唱的搭檔／給人與幽靈之間者的原聲帶；DREAM SOUP＝先行單曲一首一種性格；Stay Proud of Me＝臥室自製歌被廠牌簽下；II＝深夜即興錄音再疊錄、隔十年第二張；Against Illusions＝一人錄混母帶的 DIY；The Offset: Spectacles＝無鼓手的幽靈節奏（移居北京放第二句）；Dearly Departed＝DJ 自開廠牌；Balance＝古典小提琴手做爵士嘻哈節拍、找家鄉樂手現場錄；Sky Islands＝拉美樂手在美國組融合團；Outside＝老將 DJ 與爵士小號客座；Doctor Butcher＝大廠二選一被放掉的副業團；IT REALLY DO＝八首版擴充成十二首；我想要的都在這裡＝曲名中英並列的台北四人團。對 d／e 已交 10 張 hook 比對：Posh 原 hook 寫曲長（撞 Super Besse「十首塞進 31 分半」的曲長骨架），改中英曲名；Parks 一人錄混與 PUZZLEMAN、記號士不同形。Mindchatter 不帶「一人寫製唱」（讓給 Parks 的一人 DIY 骨架）。hook 四型：斷言（Moot!、DREAM SOUP、Sky Islands、IT REALLY DO）／懸疑（Offset、Doctor Butcher）／場景（II、Against Illusions、Outside、Posh）／人物定調（w/ave、Stay Proud of Me、Dearly Departed、Balance）。
- **49853** 引入法與第二句句型配表（同藝人本組無跨張）：Moin＝名字由來；NUUAMM＝兩人名字直接領句（Mahito the People 與青葉市子）；Mindchatter＝計畫名（是字句＋序數）；NoSo＝身分（是字句，行文以 Hwong 或 NoSo 稱呼、無性別代名詞）；Natural Magic＝出身地（奧勒岡州波特蘭）；Parks＝樂種（臥室 dream pop／衝浪吉他流行＋自稱）；Offset＝移居地（粵語、香港三人團、2009 移居北京）；Nicknack＝本名（德州 DJ）；Mad Keys＝自稱路線（analog warmth meets finesse）；Caldera＝序數（這是…第二張）；DJ Toner＝本名（Antonio Herrera）；Doctor Butcher＝編制（Oliva／Caffery＋前衛與力量金屬）；ERISTHEPLANET＝廠牌（EQT Recordings 的嘻哈專輯）；Posh Inverse＝樂種（台北獨立與數學搖滾四人團）。hook 只帶代稱／不帶身分的（Natural Magic、Parks、Offset、Doctor Butcher、ERIS、Posh、NoSo）第二句全指派補國別／城市或樂種。研究層推翻照辦：Offset 寫香港、Trouble In Mind 只寫 2021 重發；Posh 不用「優雅逆轉」、不寫首張；DJ Toner 只寫 Truffaz（不帶 Colom、Pardo）；ERIS 不寫國別與音色；Mad Keys 不寫首張；Caldera 不寫城市、Reeves 客唱照寫；Natural Magic 不帶 JD Twitch 與卡帶；Parks 不寫國名；NUUAMM 只寫商品文案的描述。媒體名與媒體榜單名次（RA、Jazz Journal、Cashbox、AllMusic、EDM.com、EDM Identity、Test Pressing、Billboard JAPAN、Austin Chronicle、星等與分數）全未進 hook／note。
- **49854** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Moin 日倫、NUUAMM 日十、Mindchatter 日正、NoSo 日發、Natural Magic 日上、Parks 日放、Offset 日在、Nicknack 日全、Mad Keys 日釋、Caldera 日，、ERIS 日的；DJ Toner、Doctor Butcher、Posh 只寫到月或年。對 d／e（交、自、經、問、起、面、推、由、登）讓開：本組原稿撞 自／問／起／推／由 五處，全改本組。自查（中文 4-gram）：hook×hook（a–e 24 張）0 條；hook 前四字 24 張互異，也與 repo 既有 hooks 開頭不撞（途中改掉「錄音、混」「整張沒有」「唱片公司」「九首歌從」「沒有鼓手」「兩把吉他」六個撞頭）；對既有 sf 批 hook 拆掉「電子二人」「交出第二」「爵士小號」「兩把吉他」「一把貝斯」；hook×note 剩專名「青葉市子」與樂種「佛朗明哥」；hook×d/e note 拆掉「出十一首」（Mad Keys note 對記號士 hook）。hook 原文未逐字出現在 note。
- **49855** 腳本：`node qa-batch.mjs hooks add-20261030-sf11` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261030-sf11`（5 組 24 張）✓ 全部通過，只報不擋一筆（Doctor Butcher note「當時沒有美國版」為內容，非校對痕跡）。輔助腳本在 scratchpad `hook-sf11-ac/`（sf11ac-budget.py、sf11ac-ngram.py、draft-a/b/c.json）。

## 鉤子層（d、e；條號 49856–49860）
- **49856** 交件：`desc-tools/batches/hooks/add-20261030-sf11-hooks-d.json`（5）、`-hooks-e.json`（5），key 與順序照研究稿。公式照 HOOK-DISPATCH：`Array.from(hook)+Array.from(note) − 主故事： − 每個 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170。逐筆（預算／hook 加權／hook 原始字元）：
  - d：睏前愛用PUZZLEMAN 168／19／19（thin）；鏡中鏡 229／23／23；Simulation Of An Overloaded World 215／24／24；Hot Cakes 170／21.5／24（thin）；63610* 170／20／22（thin）。
  - e：El Hajar 230／22／22；Ephemera 168／17／17（thin）；為時間做過的註解 164／24／24（thin）；爆誕 219／23／29；US 169／17／17（thin）。
  - 初稿 9 張超標，一律整格捨去：PUZZLEMAN 的《上山採樣》後續與「聲音只寫⋯」指示句；Skip Skip Ben Ben 的盯鞋音樂節、2010 首作、〈愛的幻覺〉兩部曲；Sonia Calico 的目錄號、〈Club Simulation〉曲名、專輯主題；Space Raiders 的〈Beautiful Crazy〉曲目格；Super Besse 的逐曲長度；Dudu Tassa 的母親獻聲、數位前作、樂器編排；記號士的《重建》《第二個記號》後續；特撮的〈13階の女〉翻唱、可愛版、出道單曲、鼓手、大槻自評、極簡與 power ballad；ULTRA SUNN 的 Front 242 同台、Acid House、自錄自混、Records 字樣。壓完逐張回核 hook 依賴格：全部在 g1／g2（Sonia 補回「巡迴亞洲」與倫敦進 g1；特撮的 smooth jazz 補進 g2；Super Besse 的俄語拼音與 31 分半前移到 g2；Space Raiders 的 DAT 細節只在 hook，g1 留萬聖節首演）。
  - 媒體名與媒體榜名次 0：Super Besse 的兩本雜誌「Best New Blood」、Dudu Tassa 的法國雜誌評語、Skip Skip Ben Ben 的前作評論網站皆未指派；Spotify／Bandcamp 標籤／MB 等資料平台名也不進 hook 與 note。Space Raiders 留英國單曲榜第 68 名（銷售榜）。
- **49857** 骨架歸屬（10 張 10 條，只有擁有者寫歸屬句）：PUZZLEMAN＝節拍製作人專輯裡掛名客座歌手；Skip Skip Ben Ben＝台北起源、北京活動的兩地樂團；Sonia Calico＝海外廠牌創辦人巡迴途中進工作室合作成盤；Space Raiders＝變裝對錄音帶跳舞的首演到簽進名人廠牌；Super Besse＝俄語拼音短曲首作；Dudu Tassa＝孫輩取樣祖輩原始錄音；The Luvmenauts＝替想像中的電影寫配樂；記號士＝單曲之後的首張由大廠掛版權；特撮＝硬核失真吉他與 smooth jazz 同盤；ULTRA SUNN＝承接比利時 New Beat／EBM 傳統。特撮**不走「主唱離開名團另組」**（讓給 c 組 Doctor Butcher；note 改寫成「找回筋肉少女帯時期的老戰友」，不寫「離開」）。提醒主線：NUUAMM（a）「獻給⋯的原聲帶」、Natural Magic（a）「公路旅行的原聲帶」與 Luvmenauts 的想像電影配樂同屬「原聲帶」意象，三張各在不同格（前兩張是 g2／g3 的自述，Luvmenauts 是 hook 與骨架），寫作層合掃時留意「的原聲帶」。
- **49858** 引入法／代稱（本組無同藝人跨卡）：PUZZLEMAN「他」、Skip Skip Ben Ben「這團人」、Sonia「她」、Space Raiders「他們」、Super Besse「他們」、Dudu Tassa「他」、Luvmenauts「他們」、記號士「他們」、特撮「這支樂團」、ULTRA SUNN「兩人」。四張「他們」由第二句句型分開（見 49859）。Dudu Tassa 單人名義卡在 sf12b，不同批、不互指。
- **49859** 第二句句型（逐張配死）：PUZZLEMAN＝身分＋廠牌（台灣節拍製作人、顏社是台北獨立嘻哈廠牌）；Skip Skip Ben Ben＝出身地＋活動地；Sonia＝城市＋職業（台北的夜店製作人）；Space Raiders＝樂種＋團名（big beat 團體）；Super Besse＝國別＋團名（白俄羅斯樂團）；Dudu Tassa＝國籍＋樂手身分（以色列搖滾樂手）；Luvmenauts＝城市＋編制類型（多倫多的器樂樂團）；記號士＝團名雙寫；特撮＝主唱的新樂團；ULTRA SUNN＝風格＋編制人數（coldwave 二人組）。hook 只帶代稱或不帶名字的 7 張（PUZZLEMAN、Sonia、Space Raiders、Super Besse、Dudu、Luvmenauts、特撮），身分都由第二句補；Skip Skip Ben Ben、記號士、ULTRA SUNN 的 hook 已帶樂種或國別。日期「日」後一字：交 PUZZLEMAN／自 Skip Skip Ben Ben／經 Sonia／問 Super Besse／起 Dudu Tassa／面 Luvmenauts／推 記號士／由 特撮／登 ULTRA SUNN；Space Raiders 只到年。與 a–c 已用的 倫、十、正、發、上、放、在、全、釋、，、的 無重複。
- **49860** 自查：hook 間中文 4-gram（a–e 24 張）0 條；開頭前四字 24 張互異；hook 與自身 note 無逐字重複句（Skip Skip Ben Ben「噪音流行團」、Sonia「巡迴亞洲」、ULTRA SUNN「服裝設計」初稿重複，已改寫）。note 跨 a–e 合掃後拆掉：「首約分鐘」（PUZZLEMAN／Luvmenauts／記號士 改寫，剩 a–c 三張）、「自行發行」（PUZZLEMAN 改「自己發過」）、「數位發行」（Skip Skip Ben Ben 改「以數位形式發行」）、「首張專輯」×3（Sonia 出道專輯／Super Besse 頭一張專輯／ULTRA SUNN 首張正規專輯）、「第一張專」（記號士改首作、特撮改樂團首作）、「第二張專」（Luvmenauts 改樂團第二張）、「專輯發行」（記號士改「版權方是」）。`qa-batch hooks add-20261030-sf11`：全部通過；`chk-hook-crossgroup`（5 組 24 張）：全部通過，hook 加權 17–29、note 154–234。

## 寫作層（writer-2）（49866–49870）
- **49866** 交件：`desc-tools/batches/output/add-20261030-sf11-out-2.json` 12 張（full 4：Skip Skip Ben Ben 232、Sonia Calico 234、Dudu Tassa 239、特撮 202；thin 8：ERISTHEPLANET 169、Posh Inverse 165、PUZZLEMAN 173、Space Raiders 176、Super Besse 157、Luvmenauts 169、記號士 158、ULTRA SUNN 162）。無超標、無回頭整格捨去。`qa-batch out`（out-2 部分）0 標記（唯一一筆是 out-1 尚未交齊的張數不符）、`qa-check-research` 0、`fix-spacing` 0；「據」「也就是」「原聲帶」grep 0。
- **49867** 第二句全照鉤子層 49853／49859 指派領句；「日」後一字照 49854／49859：ERIS 日的、PUZZLEMAN 日交、Skip 日自、Sonia 日經、Super Besse 日問、Dudu 日起、Luvmenauts 日面、記號士 日推、特撮 日由、ULTRA SUNN 日登；Posh、Space Raiders 只到年。日期前一字逐張不同（鐘／牌／人／曲／張／自／品／行／作／統）。
- **49868** 原聲帶意象：Luvmenauts 正文只用「配樂」「替只存在想像中的電影作曲」，全檔不出現「原聲帶」，讓開 writer-1 的 NUUAMM、Natural Magic。媒體名、媒體榜名次、資料平台名 0；Space Raiders 留英國單曲榜第 68 名（官方榜）。hook 已說過的數字不重述：Luvmenauts 不再寫 10 首、記號士不再寫 11 首、Super Besse 不再寫 10 首與 31 分半。
- **49869** 自掃（han() 4-gram，跨 out-1 已交 5 張＋out-2 12 張）：拆掉「人年月日」（PUZZLEMAN×Skip）、「專輯共首」（Sonia×Space Raiders）、「長約分鐘」（Luvmenauts×記號士）、「品年月日」、「專輯年月日」（Dudu×NUUAMM，Dudu 改「World Circuit 自⋯起推出」）、「片年月日」（PUZZLEMAN×NUUAMM）、「發行的這張」、「是台北的獨立」；定稿 2 張以上 0 條。out-1 仍在寫，主線收件時請再合掃一次。
- **49870** 小處：Dudu Tassa 第三句主詞具名為 Tassa（前句主詞是祖父兄弟，避免「他」指涉不清）；記號士藝人名用 note 指派的「記號士（The Sign Of Human）」雙寫；ERIS 盤的年份只寫月日（note 只列 8 月 21 日）。
