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
