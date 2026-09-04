## 2026-09-04 — dip-vinyl-shop — c-84 策展提案（深掘：美國 1990s lo-fi 卡帶與微廠）

- **改動摘要**：新增 `batch-progress/c84/prop-a.json`（22 張）與 `batch-progress/c84/prop-b.json`（22 張），
  合計 **44 張、41 位藝人**，`lineType: 深掘`，年份 1992–1998。
  這批延續「B 面」概念——挖的是知名地下廠牌目錄裡沒人談的那些盤，
  刻意避開 Guided by Voices／Sebadoh／Pavement／Beat Happening／Daniel Johnston 的代表作
  （這五位在池中共 16 張，全是正典側；Daniel Johnston 池中零張）。
  - **a 組＝卡帶廠與 4-track 側（22 張，年份 1992–1998）**，`label` 欄一律採原盤條目第一順位：
    Shrimper 7（Refrigerator、The Mountain Goats《The Hound Chronicles》與《Hot Garden Stomp》、Dump、
    John Davis、Wckr Spgt、The Secret Stars）、Siltbreeze 6（Charalambides、Temple of Bon Matin、
    Brother JT、The Tower Recordings、The Yips、Alan Licht）、
    Ajax Records 2（The Mountain Goats《Nothing for Juice》、East River Pipe）、
    Omphalos Records 1（Strapping Fieldhands）、Simple Machines 1（Franklin Bruno）、
    Scat Records 1（Nothing Painted Blue）、Catsup Plate 1（Charlie McAlister）、
    Feel Good All Over 1（Linda Smith）、Holy Kiss Rex 1（Soul-Junk）、Sing, Eunuchs! 1（Simon Joyner）。
  - **b 組＝七吋／LP 微廠側（22 張，年份 1992–1996）**：
    Simple Machines 9（Grenadine《Nopalitos》、Tsunami、Scrawl、Retsin、Ida、Danielle Howle、
    The Raymond Brake、The Mommyheads、Late!）、
    Teenbeat 4（Eggs、Versus、Tuscadero、Blast Off Country Style）、
    Harriet Records 4（Wimp Factor 14、Crayon、Vehicle Flips、Tullycraft）、
    Slumberland Records 2（Lorelei、Henry's Dress）、Shimmy Disc 1（Grenadine《Goya》，Teenbeat 共掛）、
    4AD 1（Air Miami，Teenbeat 共掛）、The Bus Stop Label 1（Allen Clapp and His Orchestra）。
- **主要檔案**：`batch-progress/c84/prop-a.json`、`batch-progress/c84/prop-b.json`、
  `batch-progress/memory-entries/c84-curation.md`（本檔）。
  `batch-progress/c84/chk-prop.mjs` 為既有檔，未改動。
- **驗證結果**：
  - `node batch-progress/c84/chk-prop.mjs` → a 22 張／20 位、b 22 張／21 位，**標記 0**。
  - 串跑 `dedup-crossbatch.mjs` → **36 批（其中 3 批讀 prop）、1,752 張、跨批撞卡 0**；c84 以 prop 來源被納入。
  - 44 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`
    確認 **primary-type=Album**、標題與 artist-credit（第 41 條）；探測錯誤 0。
    唯一帶 secondary-type 的是 East River Pipe《Shining Hours in a Can》(Album/**Compilation**)，走 §5.6。
  - **合輯 1 張**（East River Pipe），`exceptionReason` 134 字元、`exceptionEvidenceUrls` 2 個 HTTPS（皆 Discogs release 頁）。
  - **以盤名為主鍵掃全池**（第 71 條，掃描器加 `length>=4` 守衛，c-79 教訓）：
    **完全相等 0 筆**、子字串 10 筆（Soul-Junk《1950》4、Charalambides《Union》4、
    Grenadine《Goya》1、Vehicle Flips《In Action》1），逐筆人眼核對**皆為不同的碟**。
  - **掛名完全相等 1 筆**：Ida（池中《Will You Find Me》2000），與本批的《Tales of Brave Ida》(1994) 不是同一張碟。
    **掛名去 The 之後完全相等 0 筆。**
  - **封面實測**：CAA release-group front **30/44（68%）**、無圖 14、探測錯誤 0。
    無圖集中在只有一筆原壓 release 的碟（Wckr Spgt、Alan Licht、Temple of Bon Matin、Vehicle Flips 等）。
  - **試聽預估**：Apple `search?entity=album` 以「藝人＋盤名」比對 **29/44（66%）**，
    `us` 命中 28、`gb` 命中 1（Grenadine《Goya》）。這是**專輯存在**的數字，
    實際可用試聽會低於此——探測層要照常跑 `probe-previews`。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **卡帶原盤年一律優先於 MB 的首發日**（第 1 條）：Refrigerator《How You Continue Dreaming》取 1994
     （Shrimper SHR 53 卡帶，MB 記 1995 的 Communion LP／CD）、Dump《That Skinny Motherfucker…》取 1998
     （SHR 106 卡帶，MB 記 2001 的 CD）、Danielle Howle《About to Burst》取 1995（SMR 36 黑膠，MB 只建 1996 GB CD）。
     三張的 `risk` 都寫明落差與來源，並明令行文不得斷言 MB 那個年份。
  2. **MB 與 Discogs 各有具體年份且互相矛盾時，兩個都標成爭議、行文不得斷言發行年**（第 127 條附錄）：
     Brother JT《Music for the Other Head》（MB 1996 vs Discogs 兩筆 SB41 原壓 1995，取 1995）、
     The Yips《Bonfire in a Dixie Cup》（MB 1996-04-23 vs Discogs CD 原壓 1995，取 1995）。
  3. **撇號一律採 ASCII，MB 的 U+2019 寫進 `queryAlias` 與 `risk`**：Henry's Dress《Bust 'em Green》
     （MB 實體為《Bust ’em Green》／「Henry’s Dress」）——比照 c-81 第 6 項 The Three O'Clock 的處理。
  4. **掛名採 MB 的 artist-credit**：Brother JT（Discogs 為「Brother JT & Vibrolux」，寫進 `queryAlias`）。
  5. **廠牌欄一律採原盤條目第一順位，不採共掛或後來收編的廠牌**（第 85 條）：
     Soul-Junk《1950》記 Holy Kiss Rex（非 Shrimper 的卡帶版）、Grenadine《Goya》記 Shimmy Disc（非 Teenbeat）、
     Strapping Fieldhands《Discus》記 Omphalos Records（非 Siltbreeze）、Air Miami《Me. Me. Me.》記 4AD（非 Teenbeat）。
  6. **The Secret Stars 改收《Genealogies》(1998)，不收自我同名的那張**——MB 上同名卡有兩個
     release-group（ff8dfe6b 1995-01-01 與 7f8a0f37 1994，皆 Album），且自我同名卡是
     `PROJECT_MEMORY.md` 2026-09-03 記的 28 張留置主因。
  7. **Slumberland 的正典側不收**：Lilys《In the Presence of Nothing》(RG ef409370) 與
     Rocketship《A Certain Smile, a Certain Sadness》(RG 06e5f3d1) 都已釘得住 MB、也都有 Frontier／
     Nonstop Co-op 的授權重發，但它們是該廠牌最常被談的兩張，依本批「B 面」原則改收
     Lorelei《Everyone Must Touch the Stove》與 Henry's Dress《Bust 'em Green》。
  8. **分量依據只剩稀有度的一律不收**（第 109 條）：Vomit Launch《Dogeared》(RG 4abbf31c) 與
     Bells Of《11:11》(RG b01926c7) 都釘得住 MB，但 Discogs 上零筆授權再發、也查不到署名樂評，
     只剩「版本很少」可寫，剔除。
  9. **聯名字串的卡不收**：Amps for Christ & Two Ambiguous Figures《The Beggar's Garden》(RG d271c6db)
     的 artist-credit 是聯名，且 MB 標題《The Beggar's Garden》與 Discogs《The Beggars Garden》撇號不一致，
     為免下游兩處都要特判，改以 The Secret Stars《Genealogies》補 Shrimper 的名額。
  10. **原盤不是微廠的不收**：Scrawl《Travel On, Rider》原盤是 Elektra（61934-2, 1996），
      Simple Machines 1997 年才做黑膠；改收同團 1993 年的《Velvet Hammer》(SMR 20)。
      Bugskull《Snakland》(RG a1711463) 原盤廠牌是加拿大 Scratch Records，不在本批場景。
      Destroyer《Thief》雖在 Catsup Plate (CPR 708)，但樂團非美國，同樣不收。
- **釘不住 MB 而未收**（`release-group?query=` 兩個方向皆 count=0，或型別不合；已排除第 28／98／116／122／139 條的五種假象）：
  - Diskothi-Q《The Wandering Jew》(1994, Shrimper SHR 55)——`DiskothiQ` 併寫也 0。
  - Bugskull《Subversives in the Midst》(1992, Shrimper SHR 29)——`Bügsküll` 變體也 0。
  - Sexual Milkshake《Sing Along in Hebrew》／《Sexual Milkshake》(1992, Teenbeat 75)——兩個盤名都 0。
  - Los Marauders《Every Song We Fuckin' Know》(1994, Teenbeat 122)。
  - Mike Rep and the Quotas《Stupor Hiatus Vol. 2》(1992, Siltbreeze SB 13)。
  - John Davis《Pure Night》(1994, Shrimper SHR 53)——MB 只有 2020 年的《Pure Night Plus》(Album/**Compilation**)，
    原盤沒有自己的 release-group；改收同藝人的《Blue Mountains》(1997)。
  - Jim Shepard《Picking Through the Wreckage With a Stick》(1995, Siltbreeze SB32)——
    RG 3d5cc8b1-8cb0-4441-9023-48157f07aed6 存在，但 **primary-type 是 null**、轄下 release 的 status 也是 null，
    不符合「primary-type=Album」的硬要求。**可進補遺批**（§1 人工身分不適用，因為 MB 上有條目）。
  - **Union Pole 整條線**（UP01–UP51，Discogs 89 筆幾乎全是卡帶）與
    **Catsup Plate 的卡帶線**（CPR 02–CPR26）——抽查的品項在 MB 上一律查無，只收得到 Catsup Plate
    少數幾張黑膠（本批取 Charlie McAlister《Mississippi Luau》）。**這兩條線可進補遺批走 §1**。
- **與池中撞卡而未收**：**0 張**。盤名完全相等 0、掛名＋盤名複合鍵 0、跨批去重 0；
  唯一的掛名相等是 Ida，但碟不同。（依 2026-09-04 店主更正，藝人張數上限已作廢，本批未因此割捨任何候選。）
- **場景飽和度**：**還很空**——池中這條線目前只有正典側的 Guided by Voices 4、Pavement 6、Sebadoh 4、
  Beat Happening 2 與少數 slowcore（Codeine 2、Bedhead 1、Red House Painters 4），
  Shrimper／Teenbeat／Simple Machines／Harriet／Siltbreeze／Slumberland 六家廠牌在本批之前**一張都沒有**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
