# add-20261106-md44 裁定（情緒薄格線・頹靡：Bandcamp downtempo「有鼓」名單第三輪 md44）

> 店主 2026-11-06「有些要死不活的音樂也會有鼓推進」「全都上架吧」：前兩輪因「有拍推進」被研究層汰掉、或因標籤被先篩掉的 473 張切十批（ml74–81、md44–45），五個工作階段並行；本工作階段做 md44＋md45。卡單 `batch-progress/bandcamp-dt-20261105/pick-md44.json`（48 張）即策展結果，不派策展代理；說明見同目錄 `README.md` 第三輪段。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`。**本輪判準（CUR-DISPATCH「有鼓不等於躁」）**：慢、拖、無力的鼓（冷 trip-hop、慢 dub techno、拖拍 downtempo、半拍 dubstep、boom bap）仍算靜，不因有鼓汰；只汰 (1) 鼓＋攻擊性（失真牆、嘶吼、音壓貼臉）、(2) 舞池推進（四拍底鼓的 house／techno、breakbeat 跳舞律動、明顯中快速）。**判暖、判輕不再是汰換理由**（店主「全都上架」）：照實上架、照實評分，落別格就落別格。
> 流程：卡單 48 → 主線初篩（身分、去重、同人、文案直述舞池）→ `curation-md44.json`（30）→ `master-md44.json`（MB 釘住 29、§1 人工 1）→ `build-cards.mjs` → 研究 a 11、b 10（新查）、c 9（沿用前兩輪研究稿，補鼓型）。
> **預留：研究 a 25001–25010、b 25011–25020、c 25021–25030、鉤子 25031–25040、寫作 25041–25050、主線 25051–25060。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：逐張抓 Bandcamp 專輯頁 ld+json（發行日、曲數、發行者、文案、曲目）＋ MB release-group 查詢（score 100）比對。MB 釘住 29；Brael & Tokyo Bloodworm《Living Language》MB 查無 → §1 人工身分（Discogs master 172656：2008 年 Moteer CD moteer::013cd；卡單 2011 是 Bandcamp 上架日，年份改 2008）。
- 去重：`dedup-md37.mjs --file curation-md44.json` 撞 10，全是前兩輪 curation 提名後被汰的同一張（本輪重上），seed／manifest／pool-removed 0 撞。
- 名稱照 MB／池中既有寫法：No Man → **No-Man**（ASCII 連字號）、christ. → **Christ.**《Blue Shift Emissions》（池中同人寫法）、Martina Topley Bird → **Martina Topley-Bird**、URBS → **Urbs**；盤名大小寫照 MB（Swim Team、The Final Nail in the Coffin、Afterthought）。
- 年份以原盤首發為準：No-Man《Flowermouth》1994（卡單 2024 是三十週年黑膠重發）、Brael & Tokyo Bloodworm 2008。
- **主線初篩汰 18**（卡單 48 → 30）：
  - 資格：XXYYXX《XXYYXX》、Area 3《Area 3》（自我同名；Area 3 文案另自述是 sketches／outtakes）、Sync24《Ambient Archive [1996-2002]》《Random Archive [2001-2009]》（MB 標 Compilation，文案「released and unreleased tracks」）、ASURA《Atmosphere》（九軌全是 Final Mix／Edit／Remix／Unreleased Version 版本集）、Polygonia《Living Patterns》（MB 標 EP，30 分 6 首；文案「avant-garde dance music」）、Daily Bread《Across the Burning Sky》（MB 標 EP、文案自稱 EP）。
  - 舞池推進（文案或研究直述）：ETNOBOTANIKA（md39 研究：俱樂部 techno／house 鼓點）、Perishing Thirst（文案「Montreal's favourite rave band」）、Black Jazz Consortium（Fred P 的 deep house；MB 未標類型）、Nadia Struiwigh《Lenticular》（md42 研究：RA 寫有鼓 techno、末曲硬派 techno）、Pitch Black《Third Light》（文案「beats ranging from slinky to slamming」「between dance floor and brain food」、techno／drum'n'bass）。
  - 同人超量（池中＋本線＋並行卡單一起算，本線每位最多一張）：Arms and Sleepers《FIND THE RIGHT PLACE》《former kingdoms》（留聽眾最多的《Swim Team》；並行 ml74、ml78 另有兩張）、AES DANA《Inks》（留《Perimeters》）、Halou《Brutalism For Lovers》（留 1999 首張《Sans Soucie》）、Zane Alexander《Midrealm》（md45 留《A Time Like This》）、Bluetech《Phoenix Rising》（池中已三張、並行 ml79 另兩張）。
- **保留但標風險的**（判不出來的留，交研究與評分）：Earthen Sea《Mirage》（md39 研究：每分鐘 117–123 拍 dub techno 大鼓——照店主「慢 dub techno 仍算靜」留）、Ness《Planet D》（標籤 deep／hypnotic techno，鼓型無來源，研究層查）、Symbolico（psytrance／psytrap 標籤）、Khotin《New Tab》（ambient house）、AgonyOST、Dillard（future garage／dubstep）、Chris Imler（鼓手、kraut）。逐張寫在卡單 `curatorRisk`。
- 同人在池：Puma Blue（2）、Christ.（1）、AES DANA（1）、Martina Topley-Bird（1）、Arms and Sleepers（1）、Khotin（2）、Wax Tailor（2）、Halou（2）、Odd Nosdam（2）、Disparition（1）；本線各只加一張。並行卡單同人（Ochre ml75／77／79、Khotin ml74／81、Odd Nosdam ml74／75／79、Wax Tailor ml76 等）各工作階段自行勻，藝人介紹以先上 main 的為準。

## 研究 c 組（沿用稿補件）

- 25021 Christ.《Blue Shift Emissions》：補鼓型 fact（IDM 碎拍，Bandcamp 標 idm／downtempo／lofi，無 BPM 來源）；第三輪重判不建議汰（判輕判暖不汰）。
- 25022 AES DANA《Perimeters》：已有鼓型 fact；notes 加重判：碎裂 downtempo 鼓為主、中段 prog-psy 脈動，不建議汰（風險交評分）。
- 25023 Public Memory《Elegiac Beat》：補鼓型 fact（電子鼓機混有機打擊，krautwave／trip-hop 標籤）；不建議汰。
- 25024 Now Always Fades《Coalesce》：已有鼓型；重判慢 MPC 鼓／鬆散 breakbeat，不建議汰。
- 25025 Locust《Spectral+》：已有鼓型（反拍鼓點、穩定脈動）；不建議汰。
- 25026 Earthen Sea《Mirage》：已有鼓型（約 120 BPM dub techno 大鼓，時隱時現）；依「慢 dub techno 仍算靜」不建議汰，風險寫明。
- 25027 Monophona《The Spy》：已有鼓型（真鼓手＋碎拍 trip hop）；不建議汰。
- 25028 Ness《Planet D》：補「鼓型不明」fact（Bandcamp 標 dub／deep／hypnotic techno，7 首 5–9 分鐘；WebSearch 與 MB 皆無四拍底鼓來源）；依判準不建議汰，待主線聽確認，風險中。
- 25029 Disparition《Granicha》：補鼓型 fact（Bernstein programming＋Tim Monaghan 打擊樂 5 首，非舞池）；不建議汰。
- 25030 本小節 WebSearch 用 3 次（兩次無關結果），餘靠 Bandcamp ld+json 與 MB 標籤。

## 研究 b 組（25011–25020）
- 25011 Brael & Tokyo Bloodworm《Living Language》：§1 人工身分核對通過——Discogs master 172656／release 1322120（Moteer moteer::013cd，CD Album，2008-04-25）；Bandcamp 2011-04-29 是上架日，年份維持 2008。Bandcamp 版多 4 首 remix（11 首），以原盤 7 首為準。鼓型：精簡打擊、microbeats，近無鼓；不建議汰。
- 25012 Chris Imler《The Internet Will Break My Heart》：建議汰：舞池推進（證據偏弱）——Libération「dance dans les pieds」、NTS 與 Kraftwerk／DAF／NEU! 並列，皆文案轉述；曲短、鼓機推進、帶人聲、無 BPM。信心中低，主線可改以評分為準。moodGuess「實驗 dubstep」與來源不符。
- 25013 Urbs《Geheimland》：label 更正為 Compost Records（CPT603）；慢拍 trip-hop，作者自述偏好慢；不建議汰。
- 25014 Transparent Man《Puppets》：label 更正為 S!X Music（獨家授權）；四首真人鼓（Thomas Kostoulas）＋律動拍＋管弦；不建議汰。
- 25015 Symbolico《Connectika》：鼓型不明（自述 groovy rhythms，標籤 psytrance／psytrap／dub，無 BPM）；舞池風險僅有標籤證據，不建議汰；label self-released。
- 25016 Dillard《Empress LP》：鼓型不明偏半拍（標籤「140」＋dubstep，無一手 BPM）；不建議汰；self-released。
- 25017 I Awake《Zenith》：鼓型不明（僅標題曲有現場鼓，標籤 dubstep／glitch hop）；不建議汰。Merkaba Music 偏 psytrance 為二手說法，未入 facts。
- 25018 Gi Gi《Lamella Pressed》：慢中速 dub／UK stepping＋LA beat，〈Palm Slick〉breaksy；非舞池；不建議汰。與池中 Gigi 為不同人，維持分開。
- 25019 Ugress、Odd Nosdam：Ugress trip-hop 下行拍、self-released；Odd Nosdam sampler 嘻哈鼓＋氛圍（Anticon 共同創辦人）、self-released；皆不建議汰，無推翻。
- 25020 本支 WebSearch 用 3 次（Imler 評論、I Awake、Urbs），其餘靠 Bandcamp ld+json、MB、Discogs API、WebFetch；多張只有廠牌／Bandcamp 文案，status 多為 thin（Brael、Urbs 為 ok）。

## 研究 a 組
- 25001 Halou《Sans Soucie》：建議汰：資格。維基稱「非專輯曲目合輯」，Bandcamp 含 Original Demo、Edit、同曲多版；MB 標 Album 無次要類型，兩邊矛盾，主線再裁。另推翻 rulings 初篩「1999 首張」：首張是 1998《We Only Love You》（Bedazzled）。
- 25002 Martina Topley-Bird《Some Place Simple》：15 首中 11 首為前作重錄、4 首新曲（維基）；MB Album、Honest Jon's 正式發行，判可留，不建議汰。聲音實為烏克麗麗＋人聲＋輕打擊，非 trip-hop 電子拍，moodGuess「冷 trip-hop」存疑。label 更正 Honest Jon's。
- 25003 No-Man《Flowermouth》：原盤 1994 One Little Indian（label 更正）；2024 為黑膠重發。確定有鼓者僅第 1、9 曲（Chris Maitland），其餘鼓型不明，不建議汰。
- 25004 Arms and Sleepers《Swim Team》：moodGuess 存疑——廠牌文案直述 upbeat rhythms、focus on beats，x 2.5 可能偏高；器樂嘻哈節拍非四拍，不建議汰。label Fake Chapter。
- 25005 Khotin《New Tab》：作者自標 some beats later on、emotional ambient；house／techno 標籤無四拍證據，不建議汰。label 自行發行（MB 無廠牌；2018 加拿大版 Pacific Rhythm）。
- 25006 AgonyOST《The Final Nail in the Coffin》：標籤 UKG、warehouse rave、lofi house，但無 BPM／四拍來源，曲名自嘲 No Rave；證據不足不建議汰，鼓型不明。self-released。
- 25007 Wax Tailor《The Shadow of Their Suns》：取樣式 hip hop／trip hop 鼓（boom bap 傾向），速度無來源；不建議汰；饒舌曲可能拉高 x。label Lab'Oratoire。
- 25008 Puma Blue《Holy Waters》（Blue Flowers Music）、Ochre《Beyond the Outer Loop》（Aura Materia；IDM／techno 標籤無四拍證據，鼓型不明）、Zenzile《Totem》（Small Axe 2002；dub 反拍樂隊）、So Below《Afterthought》（self-released）：皆不建議汰。
- 25009 鼓型來源薄：Ochre、Khotin、AgonyOST、So Below、Halou 的 BPM 與四拍與否皆無一手來源，status 標 thin，交評分時以 Bandcamp 標籤與文案為準。
- 25010 本支 WebSearch 3 次（AgonyOST、Khotin、Ochre）皆無有用評論；其餘靠 Bandcamp ld+json、MB API、維基（en／fr）與 WebFetch。Discogs、Pitchfork 不可達。

## 主線研究後汰換（不佔條號；2026-11-06）
- 判準照檔頭：只汰攻擊性鼓、舞池推進、資格；判暖判輕不汰。
- **汰 1 張**（存 `dropped-cards.json`／`dropped-research.json`）：Halou《Sans Soucie》（研究 a：維基稱是非專輯曲目集，Bandcamp 版含 Original Demo 與 Edit；首張其實是 1998《We Only Love You》，主線初篩寫「1999 首張」有誤，更正）。MB 標 Album 與維基矛盾，以內容（demo／edit／非專輯曲）為準，照合輯先例汰。
- **留下的邊界卡**（交評分）：Chris Imler（研究 b 建議汰，證據只有 Libération「dance dans les pieds」與 NTS 把他與 Kraftwerk／DAF／NEU! 並列，皆文案轉述、無 BPM——判不出來的留）、AgonyOST（UKG／warehouse rave 標籤，無四拍來源）、Symbolico、Dillard、I Awake、Ness（鼓型不明）、Earthen Sea（約 120 BPM dub techno 大鼓，照「慢 dub techno 仍算靜」）、Arms and Sleepers（廠牌文案 upbeat rhythms）、Wax Tailor（客座饒舌）。
- Martina Topley-Bird《Some Place Simple》：15 首中 11 首是前作重錄、4 首新曲，烏克麗麗＋人聲＋輕打擊；MB 標 Album、Honest Jon's 正式發行，留。
- **label 更正已改進卡單**：Puma Blue → Blue Flowers Music、No-Man → One Little Indian、Martina Topley-Bird → Honest Jon's、Ochre → Aura Materia、Arms and Sleepers → Fake Chapter、Zenzile → Small Axe、Wax Tailor → Lab'Oratoire、Urbs → Compost Records、Transparent Man → S!X Music；Khotin、AgonyOST、So Below、Symbolico、Ugress、Dillard、Odd Nosdam 為自行發行。
- 不補位。定案 **29 張**（a 10、b 10、c 9）。

## 鉤子層（a、b）（25031–25035）
- **25031** 交件：`desc-tools/batches/hooks/add-20261106-md44-hooks-a.json`（10）、`-hooks-b.json`（10），key 與順序照研究稿。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；上限依研究稿 status：thin 170、full／ok 230（ok＝Brael、Urbs 按 full）。逐筆（預算／hook 原始字元／加權）：Puma Blue 196／24／19；No-Man 230／26／16；Martina Topley-Bird 222／18／18；Ochre 149／18／18（thin）；Arms and Sleepers 219／16／16；Khotin 163／18／18（thin）；Zenzile 202／21／19；AgonyOST 168／30／20.5（thin）；Wax Tailor 226／24／18.5；So Below 166／22／16.5（thin）｜I Awake 168／19／16（thin）；Symbolico 156／17／17（thin）；Ugress 149／28／20（thin）；Gi Gi 168／28／21.5（thin）；Odd Nosdam 170／17／17（thin）；Brael & Tokyo Bloodworm 202／19／19；Urbs 218／16／16；Dillard 152／17／17（thin）；Chris Imler 164／26／21.5（thin）；Transparent Man 164／18／18（thin）。初稿 13 張超標（No-Man 420 最高），整格捨去：No-Man 的錄音室地名與錄音月份、Mel Collins／Ian Carr／Barbieri／Gerrard、開場曲長、Epic/Sony；Puma Blue 的首尾曲名與前作盤名；Arms 的八〇年代童年靈感與點名曲；Ochre 的 Pocket Operators 等與地名曲名；Khotin 的 Deep Blue、talking over drones、drone 開頭；Wax Tailor 的 Del／Rosemary Standley；AgonyOST 的〈8Ball〉；I Awake 的《The Core》盤名、Per Boysen；Ugress 的 Cinema electronica 簡介、恐怖科幻取樣；Gi Gi 的〈Lilted Song〉與曲長；Odd Nosdam 的〈KEL〉〈AIN〉；Brael 的 Moteer 比較、〈Saturn Shrine〉（曲名兩說）與載體（CD／CDr 兩說，一律不寫）；Urbs 的〈Levitation〉；Dillard 的〈Reconcile〉；Chris Imler 的 Guardian、Benedict Frey、Naomi Klaus；Transparent Man 的客座兩名與曲名。壓完回核：hook 依賴格全在 g1／g2 或 hook 自足（Martina 的 11 首舊歌移到 g2；Ugress 的 Gnosis／tracker、Odd Nosdam 的三字母曲名、AgonyOST 的曲名由 hook 自足）。
- **25032** 骨架歸屬（20 張 20 條，c 組 9 張已讀過避開：BoC 圈署名、修道院駐村、一人包辦、三位女聲、Seefeel 成員回到歌曲、首張完整黑膠、盧森堡首張、無規劃憑直覺、兩小時雙專輯）：Puma Blue＝獨行製作轉固定樂隊整團錄；No-Man＝大牌客席雲集、最暢銷後隨即離開廠牌（作品綁定，標時序）；Martina＝舊歌拆成極簡版重錄；Ochre＝器材清單當說明（器物）；Arms＝睽違後刻意轉向節拍；Khotin＝作者標籤預告拍子晚到；Zenzile＝客座歌手補 dub 少詞；AgonyOST＝自嘲反舞池的曲名；Wax Tailor＝自家廠牌老將隔五年帶新陣容；So Below＝AI 客座；I Awake＝只有標題曲有現場鼓；Symbolico＝一句宇宙文案；Ugress＝tracker 模組場景出身；Gi Gi＝顫音琴手做 downtempo（樂器）；Odd Nosdam＝四個月手作、三字母曲名；Brael＝隔地互寄來回混音；Urbs＝封城育兒夜晚、兒子造的盤名；Dillard＝科羅拉多雪山的地方感；Chris Imler＝替人造節奏的幕後人自己出作品；Transparent Man＝傀儡概念首張 LP。hook 四型：懸疑（Khotin、AgonyOST）／斷言（No-Man、Martina、Arms、Zenzile、I Awake、Odd Nosdam、Urbs、Transparent Man）／場景（Ochre、So Below、Symbolico、Brael、Dillard）／人物定調（Puma Blue、Wax Tailor、Ugress、Gi Gi、Chris Imler）。
- **25033** 同人：本批無同人兩張，不配「他／她」表。性別：Martina 用「她」；AgonyOST、Gi Gi、Dillard、Transparent Man、Symbolico 性別無來源，note 不用代名詞（Transparent Man hook 改被動句）；So Below、Brael 為兩人／兩組。跨批同人已上架首兩句已避開：Puma Blue 不寫「以 Puma Blue 為藝名的倫敦音樂人」「南倫敦出身」，改以七歲學鼓領句；Khotin 不寫「來自加拿大艾德蒙頓…以 Khotin 為藝名」「加拿大電子音樂人」；Odd Nosdam 不寫 Cincinnati、Anticon 共同創辦人、cLOUDDEAD，改本名＋生年；Martina 不寫 Tricky 牆頭、「Tricky 的女主唱」，改水星獎入圍。第二句句型配表：Puma Blue「…起學打鼓…」；No-Man「…組成的英國雙人組」；Martina「這是…的第三張錄音室專輯」；Ochre「用…這個名字做…」；Arms「由…在…年成立」；Khotin「在…錄了…」；Zenzile「…年在…成軍，團名取自…」；AgonyOST「信用欄只寫…」；Wax Tailor「…的藝名，…年創立…」；So Below「…是…的 A 與 B」；I Awake「首張…由…發行」；Symbolico「…是…的 X，自稱…」；Ugress「…的電子計畫…，主腦是…」；Gi Gi「廠牌…介紹…走…」；Odd Nosdam「本名…，…年生」；Brael「A 與 B 是兩組…，分居…」；Urbs「…是…的製作人，…年從…起步」；Dillard「…的簡介說…」；Chris Imler「媒體說他…」；Transparent Man「…的首張 LP 是…」。
- **25034** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`，連 c 組一起配死、0 撞）：Puma Blue 由、Ochre 推、Arms 經、Khotin 自、AgonyOST 放、Wax Tailor 問、So Below 發、I Awake 交、Symbolico 上、Ugress 面、Gi Gi 出、Odd Nosdam 公、Brael 成、Urbs 在、Dillard 獨、Chris Imler 登、Transparent Man 透；No-Man、Martina、Zenzile 只寫到年或月。原稿 Urbs「日以」撞 c 組 Monophona、Dillard「日釋」撞 c 組 Disparition，已改。
- **25035** 自查：29 個 hook 互掃中文 4-gram 0 撞；本組 hook 對全批 note 0 撞（So Below「客座歌手」撞 Zenzile note，hook 改「客座」）；hook 與自己 note 只剩樂器名「烏克麗麗」（Gi Gi「顫音琴手」、Brael「錄音帶與檔案」、Transparent Man「壓抑情緒的人」已改 note）。對 `hooks/add-202611*` 既有 hook＋note 掃出 14 處，hook 全改歸零（Ochre「上合成器」、Arms「這對雙人組」、AgonyOST「最短的一首」「有一首曲」、So Below「客座歌手」、I Awake「分鐘的長」「十二首約」「是標題曲」「註明現場」、Ugress「九〇年代初」「年代初就」「在年代初」、開頭「1990」撞 md45 c）；剩「顫音琴手」「科羅拉多」屬樂器／地名。開頭前四字全批與既有 add-202611* 互異。事實自驗：Martina 原 hook「改用烏克麗麗重唱」過度概括（她同時彈鍵盤、Gerrand 打鼓），改「剝成極簡的骨架重錄」；I Awake「十二首長曲」與最短 2 分 32 秒矛盾，改。研究稿「建議汰」「moodGuess 存疑」未進 note；Gil Scott-Heron（已故，研究稿寫「合作」）不指派。腳本：`node qa-batch.mjs hooks add-20261106-md44` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-md44` 全部通過（3 組 29 張；hook 加權 16–26、note 146–232；只報不擋的否定句 1 筆在 c 組）。

## 鉤子層（c）
- **25036** 交件 `desc-tools/batches/hooks/add-20261106-md44-hooks-c.json` 9 張，key 與順序照研究稿。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 上限 170（Christ.、Public Memory、Now Always Fades、Ness，依研究稿 status）、full 230。逐筆（預算／hook 原始字元／加權）：Christ. 168／29／22.5；AES DANA 230／25／25；Public Memory 165／26／26；Now Always Fades 169／22／20.5；Locust 229／30／24；Earthen Sea 230／27／24.5；Monophona 230／29／21.5；Ness 163／20／20；Disparition 221／23／23。初稿全超（thin 214–293、full 267–337），整格捨去：Christ. 的 John Peel 安可、Hyperact 早期作、雙黑膠與真空管重製、曲長；AES DANA 的 Christoph Berg 合寫〈Anthrazit〉、Field Rotation、inre045、74 分鐘連續混音、2025 重製；Public Memory 的 Irisarri 母帶、felte、封面與歌詞 Insert、〈Tall In My Room〉；Now Always Fades 的三位女聲名字、Olive Kimoto（也避開與 Locust 互指）、前作《Into The Doldrums》、九首 37 分鐘、〈Faceless Angel〉〈Dummy〉；Locust 的 R&S、錄音帶時期、Griff Spex、〈Long Distance Lover〉曲名、TODO Records；Earthen Sea 的 LR004、數位多兩首、Martin-McCormick 全名；Monophona 的 Björk／Edie Brickell 比較、挖孔紙套、PIAS／Rough Trade、2016 德國版；Ness 的「懸在真實與超現實之間」、AudioSol、曲名；Disparition 的歌手名單、官網風格清單、〈Root Under Stone〉。研究稿【第三輪重判】為準，舊「建議汰換」「moodVerdict drop」不採；情緒評語不進 hook，hook 全用聲音或製作事實。
- **25037** 骨架歸屬（9 張 9 條，各張 note 只寫自己的歸屬句）：Christ.＝替名團共寫後要求撤名（懸疑）；AES DANA＝修道院駐村收錄回聲（場景）；Public Memory＝既有招牌聲音上加新元素（斷言；獨力寫錄放 g1，避開 a 組 Ochre「一手包」與 Khotin 的同型）；Now Always Fades＝同盤兩極的鼓與貝斯（場景；原擬「三位女聲輪唱、本人只唱一首」與 a 組 Zenzile「請歌手來補」近似，讓出改寫）；Locust＝一台跟了三十多年的舊合成器（器物；與 a 組 Ochre 的「合成器型號清單」分開：一張是清單、一張是單一舊機）；Earthen Sea＝大鼓速度與時隱時現（斷言）；Monophona＝drum 'n' bass 製作人遇上吉他女聲組團（人物定調）；Ness＝不預排音色、靈感帶路的錄音流程（斷言）；Disparition＝饒舌到女高音的兩小時雙專輯（懸疑）。開頭前四字全批 29 張互異。
- **25038** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Christ. 終、AES DANA 先、Public Memory 全、Now Always Fades 掛、Locust 首、Monophona 以、Ness 落、Disparition 釋；Earthen Sea 只寫到月。與 a（由／推／經／自／放／問／發）、b（交／上／面／出／公／成／在／獨／登／透）全不撞；初稿的 經／自／交／問 撞 a、b 後改掉。
- **25039** 第二句句型（避開 a、b 與 md43 用過的「…的藝名」「是…的 A 與 B」「…是…的 X，自稱」「掛著…這個名號」等）：Christ.「藝名帶句點，本人來自…」；AES DANA「三種身分都屬於…」；Public Memory「…的每一環都是…」；Now Always Fades「撐起…的是…」；Locust「…的化名之一，他…生於…」；Earthen Sea「在…彈過貝斯的…，…是他用了多年的化名」；Monophona「國名＋三人分工」；Ness「標籤掛在…之間」（無國籍來源，以樂種補身分）；Disparition「樂器分工清單＋是他的個人名義」（避開池中《Transmutations》的「立足洛城的名義」、池中 AES DANA《Memory Shell》的「Ultimae 創辦人、法國作曲家」）。全批 c 組無同人兩張，不配「他／她」表；9 張 hook 皆不帶藝名，一律由 note g1 具名補身分（哪裡人或樂種）。
- **25040** 自查：c 組 hook 互掃與 hook 對本批 a、b 的 hook／note 中文 4-gram 0 撞；hook 與自己 note 0 共用 4-gram（AES DANA「修道院改建的音樂廳」、Now Always Fades「標題曲的」已改）；對 `hooks/add-202611*` 既有檔掃出的跨批殘片已改掉「的音樂廳」「進錄音室」「爵士放克」「合成器底下」「的製作人」「年代初就」「的貝斯線」，剩「類比合成器」「合成器」一類樂器名。hook 事實回核：Christ. 撤名是 Warp 2002 重發應他要求；Locust〈Soul Sky〉用 90 年代初就有的合成器；Earthen Sea 120 出頭與大鼓淡出出自 RA（〈Velvet Grey〉，放 g2）；Disparition 饒舌／女高音出自官網引用 Brainwashed（放 g2）。腳本：`qa-batch hooks` 全部通過；`chk-hook-crossgroup` 3 組 29 張全部通過（只報不擋：Earthen Sea「〈Venus〉整首沒有節拍」屬內容）。

## 寫作層（writer-2）（25046–25050）
- **25046** 交件：`desc-tools/batches/output/add-20261106-md44-out-2.json` 14 張，key 與順序照輸入。逐張字數：Brael 195、Urbs 215（ok 按 full）；AES DANA 232、Locust 229、Earthen Sea 225、Monophona 239、Disparition 200（full）；Dillard 150、Chris Imler 144、Transparent Man 152、Christ. 168、Public Memory 160、Now Always Fades 175、Ness 155（thin）。初稿只有 Christ. 超出 thin 帶（198），整格捨去盤名《Blue Shift Emissions》並把「撤下了他的名字」「底下墊著層層疊起」收短為 168；其餘一稿落帶。
- **25047** 第二句全照鉤子層配表（25033／25039）；「日」後一字全照 25034／25038（成／在／獨／登／透／終／先／全／掛／首／以／落／釋；Earthen Sea 只寫到月）。日期前一字（第三欄）逐張互異：力／半／感／寫／鼓／輯／動／曲／的／他／張／鐘／然。Dillard 原擬「整張」領日期，與 Monophona「首張」撞「張年月日」，改為句號後直接以日期領句。
- **25048** 代稱具名：Chris Imler 的 hook 已說 Peaches 與柏林，第二句改成具名＋「靈魂是 Kraut、雙腳在跳舞」，第三句只補 Golden Showers，不再重提 Peaches／柏林；Transparent Man 第三句寫「傀儡指的是…的人」收 hook 懸念，不重述「壓抑情緒」；Monophona 以「2010 年 Chook 與 Claudine 相遇」點明 hook 的「他」是 Chook；AES DANA 的駐村句不重提「牆內回聲」，只寫氛圍融進作品；Urbs 收尾補「Geheimland 的意思是祕密之地」回應 hook。
- **25049** 來源不進正文：Brael 的 Norman Records 評語寫成陳述句（打擊精簡、樂器漂浮）；Disparition 的 Brainwashed 寫成「被樂評形容成」；Chris Imler 的 Libération 照鉤子層配表寫「媒體說」；Dillard 照配表保留「Dillard 的簡介說」（藝人自述，非轉述引導詞；主線審稿可再看）。Earthen Sea「〈Venus〉則整首沒有節拍」是 note 指定的聲音內容，照寫（鉤子層 25040 已標只報不擋）。
- **25050** 自掃：本檔 14 張＋兩檔輸入的 hook／note（扣骨架語）＋writer-1 已交的 5 張，han() 中文 4-gram 跨張 0 撞。途中拆掉「首約分鐘」（與 writer-1 note 共 10 張）、「收首約分」、「共首約分」、「長約分鐘」、「張年月日」、「在與之間」（Public Memory 改「橫跨…兩邊」、Ness 改「三者之間」）、「首各長到分鐘」「在到分鐘」（Locust 改「每首」、Earthen Sea 改「介於」），各張曲數／時長句法改成互異。腳本：`qa-batch out` 本檔 14 張 144–239、thin 全 ≤180（只報 writer-1 未交齊的張數不符）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。

## 寫作層（writer-1）（25041–25045）
- **25041** 交件：`desc-tools/batches/output/add-20261106-md44-out-1.json` 15 張（full 6：180–225；thin 9：139–176）。逐張：Puma Blue 203、No-Man 216、Martina 206、Ochre 149、Arms 214、Khotin 176、Zenzile 180、AgonyOST 175、Wax Tailor 225、So Below 158、I Awake 161、Symbolico 149、Ugress 139、Gi Gi 168、Odd Nosdam 164。初稿 0 張出界，無整格捨去；note 各項全寫進正文，sound／facts 未入 note 的一律不寫。
- **25042** 第二句句型全照鉤子層 25033 配表；「日」後一字全照 25034（由／推／經／自／放／問／發／交／上／面／出／公；No-Man、Martina、Zenzile 只寫到年或月）。跨批避開照 25033：Puma Blue 寫「以 Puma Blue 之名在倫敦發表作品」（不寫南倫敦、不寫「為藝名的倫敦音樂人」）；Khotin 以「Edmonton 製作人＋本名」領句，不寫「加拿大電子音樂人」；Odd Nosdam 只寫本名、生年、地下嘻哈；Martina 只寫水星獎入圍。
- **25043** hook 代稱具名：No-Man 第二句補全名 Robert Fripp 並帶出 Steve Jansen；Martina 不重述「11 首」，改寫 15 首裡另 4 首新寫；Arms 不重述「重心／節拍」，改寫 Ramic 說的精簡與換合成器音色；Ochre 具名 DSI Evolver、Virus TI2；Khotin 補標籤原文 some beats later on；Zenzile 具名兩位常態歌手；AgonyOST 以「全盤最短 2 分 21 秒」收 hook；So Below 具名〈What We Like〉與 GrimesAI；I Awake 具名打鼓的 Lundberg；Symbolico 點明 hook 是專輯文案；Gi Gi 以廠牌介紹具名「德州顫音琴手」；Odd Nosdam 以〈BOM〉收「三個大寫字母」。性別未知的 AgonyOST、Gi Gi、Symbolico 正文不用代名詞（Gi Gi 用「這位樂手」）。
- **25044** No-Man「隨即離開這家廠牌」屬作品綁定的後續事件，正文以「專輯推出之後」標時序；Epic/Sony 照鉤子層捨去不寫。AgonyOST「放上 Bandcamp」是 note 指定的發行處，照寫（非資料來源點名）。
- **25045** 自掃：本檔 15 張＋writer-2 已交 14 張，han() 中文 4-gram 跨張 0 撞。途中拆掉「首約分鐘」×3（Arms／I Awake／Symbolico，各改「約莫」「播放時間約」「曲子約」）、「首張專輯在」「專輯在年」（I Awake／Ugress）、「的錄音室」（Martina 改「那間錄音室」、Wax Tailor 改「錄音室作品裡排第六」）、「電子音樂」（AgonyOST 改「電子樂創作者」）、日期前一字黏合「人年月日」「了年月日」「與年月日」「的年月日」「張年月日」「寫年月日」，以及與 writer-2 撞的「長約分鐘」「首加起來約」「分鐘左右」「分鐘上下」「混在一起」。跨歷批只剩「錄音室專輯」「第二張專輯」「年月日由」這類通用串（指派句型帶出）。腳本：`qa-batch out` 兩檔 29 張全部通過（out-1 139–225、thin 全 ≤180）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。

## 主線審稿（25051；2026-11-06）
- **25051** 逐張審 29 張（out-1／out-2 全文印出，對研究稿 a、b、c 與 ar-d-815 補洞稿）。改 4 張 4 處，皆為單源或來源不可靠的事實，**已同步**研究稿、hooks、writer 輸入三層：
  - `Ugress|Boulevard of Broken Dystopias`：刪「首張《Resound》在 2002 年拿下挪威榜第 2 名」→「2000 年起以這個名字活動」。依據：榜名次只有英文維基與其鏡像（ar-d-815 補洞同樣判單源不採）。
  - `AgonyOST|The Final Nail in the Coffin`：「背後是一位美國的電子樂創作者」→「背後是單獨一位電子樂創作者」。依據：國籍只出自韓文粉絲維基（namu），研究稿自己也標「僅供參考」。
  - `Locust|Spectral+`：「他 1966 年生於倫敦」→「他是英國人」。依據：生年只有英文維基一源（ar-d-815 補洞判單源）。
  - `Wax Tailor|The Shadow of Their Suns`：刪「法國專輯榜最高第 14 名」。依據：只有維基一源，且本線慣例榜單名次不進正文。
  - 照准：So Below 的 Maddie North 與 Bradley Hale（Bandcamp 專輯 credits 一手）；Odd Nosdam 1976 年生（維基＋研究稿）；Dillard「簡介說」是藝人自述非轉述詞；Earthen Sea「〈Venus〉整首沒有節拍」（note 指定的聲音事實）；AgonyOST「放上 Bandcamp」是發行處。
  - `qa-batch hooks／out`、`chk-hook-crossgroup` 全部通過；`qa-check-research` 兩檔標記 0、`fix-spacing` 0；「據」、平台名 0。

## 三軸、試聽、封面（主線，不佔條號）
- 三軸 `ratings-override.json` 29 張全依 §0.8.1 人工錨點：經典 3／4＝23／6、冷門 2／3／4＝1／12／16、硬蕊 2／3／4＝14／13／2。經典 3 佔 79%（自檢線七成）：已用 Bandcamp 候選檔（1,901 張含同人多張）逐人比對聽眾排序，本張是同人聽眾最多或唯一 LP 的升 4（Puma Blue、Khotin、AgonyOST、Transparent Man、Christ.、No-Man）；其餘多是同人非代表作（Ochre 第四、Arms and Sleepers 第四、Public Memory 第四、AES DANA 第四、Odd Nosdam、Wax Tailor）或單一張無代表作依據，維持 3。
- 試聽：Apple 28 ready／1 unavailable（Brael & Tokyo Bloodworm，Apple 查無；Bandcamp 有數位版）。Wax Tailor 在 Apple 只有《Extended with Instrumentals》27 軌版（前 13 首即原盤），照收並記 note。
- 封面：CAA 26＋Bandcamp 3（Brael §1 人工身分、Urbs 與 Earthen Sea CAA 404），縮圖表目視全數與盤名相符（Earthen Sea 封面印 Lovers Rock no.4 2014）。頂點 0。
