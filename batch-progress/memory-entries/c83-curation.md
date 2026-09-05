## 2026-09-04 — dip-vinyl-shop — c-83 策展提案（深掘：英國 1990 年代微廠二線的 B 面）

- **改動摘要**：新增 `batch-progress/c83/prop-a.json`（21 張）與 `batch-progress/c83/prop-b.json`（24 張），
  合計 **45 張、45 位藝人**，`lineType: 深掘`，年份 1991–1999。
  這批沿用 c-81 立下的「B 面」概念——不挖無名廠牌，挖**知名地下廠牌目錄裡沒人談的那些盤**；
  刻意避開 Stereolab／PJ Harvey／Broadcast／Mouse on Mars／Seefeel／Pram／Laika／Mogwai／Low／
  The Apples in Stereo／Windy & Carl 在這些廠牌的代表作（這 11 位藝人在池中共 37 張，全是正典側：Stereolab 3、PJ Harvey 8、Broadcast 3、
  Mouse on Mars 3、Seefeel 4、Pram 1、Laika 1、Mogwai 6、Low 6、The Apples in Stereo 1、Windy & Carl 1）。
  - **a 組＝吉他／歌曲側**：Too Pure 的二線 6（Th' Faith Healers、Voodoo Queens、Moonshake、
    Minxus、Long Fin Killie、Jack）、Ankst 的威爾斯語線 6（Y Cyrff、Ffa Coffi Pawb、Datblygu、
    Gorky's Zygotic Mynci、Rheinallt H. Rowlands、Ectogram）、Shinkansen 3、ché 2、
    Guided Missile／Slampt 2、Lissy's 1、Pickled Egg 1。
  - **b 組＝電子／實驗側**：Ochre 4、Wurlitzer Jukebox 的專輯編號 4（該廠 78 筆版本裡多數是 7 吋）、
    Earworm 4、Ash International 3、Worm Interface 2、Enraptured 2、Lo Recordings 2、
    Domino 早期 2、Rocket Girl 1。
- **主要檔案**：`batch-progress/c83/prop-a.json`、`batch-progress/c83/prop-b.json`、
  `batch-progress/c83/chk-prop.mjs`（既有，批次名已為 c83）、
  `batch-progress/memory-entries/c83-curation.md`（本檔）。
- **驗證結果**：
  - `node batch-progress/c83/chk-prop.mjs` → 45 張、45 位、**標記 0**。
  - 串跑 `dedup-crossbatch.mjs` → **35 批（其中 3 批讀 prop）、1,708 張、跨批撞卡 0**；
    c83 以 prop 來源被納入。
  - 45 張全部釘住 release-group MBID 並**逐個回問** `release-group/<id>?inc=artist-credits+releases`
    確認 **primary-type=Album**、secondary-types 空、標題與 artist-credit（第 41 條）；探測錯誤 0。
  - **以盤名為主鍵掃全池**（第 71 條，掃描器加 `length>=4` 守衛）：子字串命中 45 筆、
    **完全相等 4 筆**（Long Fin Killie《Houdini》↔ Melvins 1993；Harvey Williams《California》↔
    Mr. Bungle 1999；Light《Turning》↔ Suzanne Ciani 1999；Hazard《North》↔ Darkstar 2010），
    逐筆人眼核對**皆為不同的碟，零撞卡**；四筆都寫進該卡的 `risk`。
  - **掛名去 The 後完全相等 4 筆**：Disco Inferno（池中 1 張）、Moonshake（1 張）、
    Blueboy（2 張）、Harvey Williams（1 張），四者本批各加 1 張，**皆在同一藝人上限 3 張內**
    （Blueboy 加完為 3 張，已用滿上限，後續批次不得再加）。
  - **封面實測**：CAA release-group front **33/45（73%）**，a 組 19/21、b 組 14/24，
    無圖 12、探測錯誤 0。無圖的 12 張全部集中在只有一筆原盤 release、未見再發的微廠碟。
  - **試聽實測**：Apple search 藝人＋盤名比對 **29/45（64%）**，a 組 15/21、b 組 14/24；
    **29 個命中裡 28 個在 `gb` storefront、1 個在 `de`，`us` 與 `jp` 零命中**——
    與 c-81（美國地下廠牌 28 個命中全在 `us`）**方向正好相反**，也與第 75 條一致：
    英國微廠的數位發行權留在英國。下游 `probe-previews` 對本批要以 `gb` 為主 storefront。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **Datblygu《Libertino》年份取 1993**，不採 MB first-release-date 的 1992
     （Discogs master 294704 與兩筆 Ankst 原壓 ANKST 037／037cd 皆直記 1993）——依第 127 條。
  2. **Electroscope《Homemade Electroscope》年份取 1997**，不採 MB 的 1995
     （Discogs master 245877 的三筆 WJ27 版本皆直記 1997，且 WJ27 落在該廠 1997 年的編號段）——同上。
  3. **Astral Engineering《Chronoglide》年份取 1994（Worm Interface wi01），維持與 rgMbid 一致**；
     Discogs 上另有一筆 1993 年的 Not On Label 自壓、且把 wi01 標成 Reissue，
     **這個分歧寫進 `risk` 交研究層裁**，策展層不替它下結論（第 141 條）。
  4. **廠牌欄一律採原盤廠牌**：The Yummy Fur《Night Club》記 Slampt（非同時編號的 Guided Missile）、
     Movietone《Day and Night》記 Domino（非美國同步的 Drag City）、
     Piano Magic《Low Birth Weight》記 Rocket Girl（MB 唯一那筆 release 的國別是 US，
     但 Discogs 原盤是英國 Rocket Girl）——依第 85 條。
  5. **撇號一律採 ASCII**：Th' Faith Healers、Gorky's Zygotic Mynci、
     Ectogram《I Can't Believe It's Not Reggae!》三處 MB 實體用 U+2019 彎引號——依 c-81 第 6 點前例；
     `chk-prop` 的 key 函式剝掉非字母數字故去重不受影響，受影響的是逐字元比對的下游。
  6. **Prolapse 盤名採 MB 的全小寫《backsaturday》**（Discogs master 作《Backsaturday》）——
     依 c-81 第 7 點前例，與 rgMbid 一致；大寫寫法填進 `queryAlias`。
  7. **Rheinallt H. Rowlands 採 MB 藝人實體的帶句點寫法**（本張 release-group 的 artist-credit
     是無句點的「Rheinallt H Rowlands」）——依第 6／120 條以實體為準，無句點寫法填 `queryAlias`。
  8. **Tånk 採 MB 的北歐字母寫法**（Discogs 廠牌頁作「Tank (2)」）。
     **這一組是第 49 條的新形狀**：`chk-prop` 的 key 函式把 å 當成字母，`tånk` 與 `tank`
     因此是**兩個不同的鍵**，跨批去重看不見這組差異，已寫進該卡的 `risk` 要求人工比對。
  9. **非英國藝人只要原盤是英國微廠就收**：Ma Chérie for Painting（MB 國別 DE，Earworm WORM 27）、
     Tånk（FR，Earworm WORM 46）、Hazard（SE，Ash International ASH 4.5）三張。
     這條線的主體是**廠牌與場景**，不是藝人國籍；三張的 `risk` 都明寫國別，禁止行文寫成英國樂團。
- **第 139 條（掛名的空格擺法造出「查無此團」）本批中三次**，且都靠藝人端點反查救回：
  - **Alpha Stone**：Discogs 與 Enraptured 目錄寫「Alphastone」（連寫），MB 實體是「Alpha Stone」（分寫）。
    以連寫查 `release-group?query=` 兩個方向都回 **count=0**，是乾乾淨淨的零筆。
  - **Soundsmith**：同一位藝人在 Wurlitzer Jukebox 的兩筆 7 吋（WJ.18／WJ24）被 Discogs 寫成
    「Sound Smith」（分寫）、在 WJ29 與 Enraptured RAPTCD35 寫成「Soundsmith」（連寫）。
  - **Ma Chérie for Painting**：以無重音的 `Ma Cherie for Painting` 查 release-group 回 count=0，
    改查藝人端點才命中（重音 + 空格兩種陷阱疊在一起）。
  三張的 `queryAlias` 都填了另一種寫法。
- **釘不住 MB 而未收**（一般批不開 §1 人工身分路線，依簡報第一節記入清單，**可進補遺批**）：
  1. **Badgewearer《Nowness》**（1997，Guided Missile GUIDE 15CD／AM 035）——MB 藝人實體
     214f18cf-a52f-497f-9e17-a2ef74c82703 存在、名下 6 個 release-group，但**沒有這一盤**。
  2. **Soundsmith《History in Our Heads》**（1999，Enraptured RAPTCD35）——MB 該藝人名下
     只有 1 個 release-group（本批已收的《Aquanaut》），此盤 count=0。
  3. **Richard Thomas《Shoes and Radios Attract Paint》**（1998，Lo Recordings LCD 06）——
     release-group 查詢 count=0；MB 上「Richard Thomas」有四個以上同名實體，身分釘不住。
  4. **Papa Sprain《May Reap Sea》**（Too Pure）——MB 藝人實體 8e767171 名下 4 個 release-group
     **全為 EP／Single**，無 primary-type=Album 的條目。
  5. **Flowchart《Multi-Personality Tabletop Vacuum》**（Wurlitzer Jukebox WJ28 線）——count=0。
  6. **Alphastone／Soundsmith／Ma Chérie 三張一度落在這個清單上**，依第 139 條改查寫法後救回，
    見上一節。
- **與池中撞卡而未收**：
  1. **Bola《Soup》**（1998，Skam SKALD 2）——池中**已有同一張**（Bola／Soup，1998），唯一一筆真撞卡。
  2. **同藝人已達上限 3 張，整條線不收**：Stereolab（池中 3，故 Too Pure PURE CD 11《Peng!》
     與整個 Duophonic UHF 目錄不收）、Broadcast（3，故 Too Pure 線不收）、
     Mouse on Mars（3，故 Too Pure 的《Iaora Tahiti》《Autoditacker》不收）。
  3. **該盤本身已在池中**：PJ Harvey《Dry》（Too Pure PURE CD10）、Seefeel《Quique》（pure cd28）、
     Pram《The Stars Are So Big...》（Purecd 26）、Laika《Silver Apples of the Moon》（RTD 121.1741.2）、
     Moonshake《Eva Luna》、Disco Inferno《D.I. Go Pop》、Windy & Carl《Depths》、
     The Apples in Stereo《Fun Trick Noisemaker》。
- **釘住 MB、但因兩組配額（45 張上限）未收，留給後續批次**：Hefner《Breaking God's Heart》、
  Scala《Compass Heart》、Bows《Blush》、Seely《Seconds》、The Delgados《Domestiques》、
  Lung Leg《Maid to Minx》、Solar Race《Homespun》、Boyracer《More Songs About Frustration and
  Self Hate》、Dawson《How to Follow So That Others Will Willingly Lead...》、
  Badgewearer《A Toy Gun in Safe Hands》、Bablicon《In a Different City》、Crescent《Now》、
  Ganger《Hammock Style》、Echo Park《The Revolution of Everyday Life》、
  Buddha on the Moon《The Last Autumn Day》、Himuro《Nichiyobi》、Family of God《We Are the World》、
  Stylus《The Last Seaweed Collecting Hut At Freshwater West》、
  The Serpents《You Have Just Been Poisoned By》、Twisted Science《The Sharpest Tool in the Box》。
- **型別不合而未收**：Hood《Structured Disasters》（secondary-type **Compilation**）、
  Glide《Space Age Freak Out》（secondary-type **Live**）、S.E.T.I.《Knowledge》（**EP**）、
  ISAN《Digitalis》（Liquefaction Empire duske11，12" MiniAlbum）、
  Sabine《Sabine》（1998，Wurlitzer Jukebox WJ50，**自我同名**且 Apple 上查不到——依簡報第二節不收）。
- **場景飽和度判斷**：**還很空。** 池中 1990–99 年共 2,241 張，但英國微廠這一層幾乎只有正典側
  （Stereolab 3、Mogwai 6、Broadcast 3、Mouse on Mars 3、Seefeel 4、PJ Harvey 8 都在池中，
  而 Ankst、Ochre、Earworm、Enraptured、Wurlitzer Jukebox、Worm Interface、Lo Recordings、
  Ash International、Shinkansen、Guided Missile、Pickled Egg 這十一家廠牌的目錄藝人
  在本批之前**池中零張**；Too Pure 池中有 7 張，全是上述正典側那幾位）。本批只用掉每家廠牌目錄的一小部分，上面「因配額未收」
  那 20 張加上這十二家廠牌尚未觸及的編號段，足夠再開一整批。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
