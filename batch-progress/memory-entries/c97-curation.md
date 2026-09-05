## 2026-09-05 — dip-vinyl-shop — c-97 策展提案（電子目錄深度）

- **改動摘要**：新增 `batch-progress/c97/prop-a.json`（19 張）與 `batch-progress/c97/prop-b.json`（25 張），
  合計 **44 張、23 位藝人**，`lineType: 廣度`。另修 `batch-progress/c97/chk-prop.mjs`（加 §5.5 electronic 分支）、
  新增 `batch-progress/c97/rulings.md`（9 條＋1 附錄）。
  - **a 組＝house／techno／12 吋（19 張、12 位）**：
    Rhythim Is Rhythim 2（Nude Photo 1987／It Is What It Is 1988）、Derrick May 1（Mix-Up, Volume 5 1997）、
    Phuture 1（We Are Phuture 1988）、Basic Channel 2（Phylyps Trak 1993／BCD-2 2008）、
    Rhythm & Sound 2（Rhythm & Sound 2001／See Mi Yah 2005）、F.U.S.E. 1（Dimension Intrusion 1993）、
    Richie Hawtin 2（DE9: Closer to the Edit 2001／DE9: Transitions 2005）、
    Frankie Knuckles 2（Choice: A Collection of Classics 2000／A New Reality 2004）、
    Frankie Knuckles presents Satoshi Tomiie 1（Tears 1989）、
    Sasha & John Digweed 3（Northern Exposure 2 1997／Northern Exposure: Expeditions 1999／Communicate 2000）、
    Akufen 1（Fabric 17 2004）、Jam City 1（Dream a Garden 2015）。
  - **b 組＝氛圍／具象音樂／downtempo（25 張、11 位）**：
    Burial 2（South London Boroughs 2005／Antidawn 2022）、Coldcut 2（Some Like It Cold 1990／Sound Mirrors 2006）、
    Throbbing Gristle 3（Heathen Earth 1980／Journey Through a Body 1982／Part Two: The Endless Not 2007）、
    Merzbow 3（Antimonument 1986／Rainbow Electronics 1990／Noisembryo 1994）、
    The Art of Noise 3（Into Battle with the Art of Noise 1983／In No Sense? Nonsense! 1987／
    The Seduction of Claude Debussy 1999）、Global Communication 1（Fabric 26 2006）、
    Reload 1（A Collection of Short Stories 1993）、Pierre Henry 2（Le Voyage 1967／Messe de Liverpool 1970）、
    Bernard Parmegiani 2（Chants magnétiques 1974／Dedans dehors 1979）、
    Enya 3（The Celts 1986／The Memory of Trees 1995／A Day Without Rain 2000）、
    Harold Budd 3（Abandoned Cities 1984／Lovely Thunder 1986／The White Arcades 1988）。
  - **§5.5 electronic 白名單 8 張**（primary-type 逐張明寫在 `mbNote`）：
    Single 2（Nude Photo／Tears）、EP 6（It Is What It Is／We Are Phuture／Phylyps Trak／
    South London Boroughs／Antidawn／Into Battle with the Art of Noise）。
  - **`releaseType: "Compilation"` 0 張。** 14 張是 `primary-type=Album` ＋ `secondary-types` 含
    Compilation／DJ-mix，依 §5.6 明文與 c-90 裁定第 3 條照一般 Album 寫法、不填例外欄位。
- **主要檔案**：`batch-progress/c97/prop-a.json`、`batch-progress/c97/prop-b.json`、
  `batch-progress/c97/rulings.md`、`batch-progress/c97/chk-prop.mjs`（加 §5.5 分支）、
  `batch-progress/memory-entries/c97-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c97/chk-prop.mjs a b` → 44 張、23 位、**標記 0**；
  跨批去重掃到 50 批（其中 5 批讀 prop）、2,299 張卡，**跨批撞卡 0**。
  44 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?fmt=json&inc=artist-credits+releases`**
  確認 title、artist-credit、first-release-date、primary-type、secondary-types 與轄下 release 的國別／status；
  另逐張回問 `release?release-group=<id>&inc=labels` 取廠牌與目錄號。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）——
  Merzbow 名下 720 筆以上、Coldcut 322 筆、Enya 81 筆、Frankie Knuckles 69 筆、
  Throbbing Gristle 68 筆、Art of Noise 65 筆、Pierre Henry 58 筆、Burial 48 筆、Harold Budd 48 筆、
  Bernard Parmegiani 45 筆、Rhythm & Sound 42 筆、Richie Hawtin 41 筆，全部超過 25 筆的預設上限。
  實掃 `seed_cards.json` 全 14,424 列，骨幹名單 21 位＋五組化名共 14 個 MB 實體逐一比對，真撞卡 0。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放；全文見 `batch-progress/c97/rulings.md`）

1. **`c97/chk-prop.mjs` 加一支 §5.5 electronic 分支**——原版只認 §5.6，八張白名單卡會全部誤報
   「非合輯卻帶例外欄位」。形狀照 c-70 的 `asia-mini-album` 分支，門檻同 §5.6
   （`exceptionReason` ≥12 字、≥2 個 HTTPS 證據）。只動本批檔案。
2. **§5.5 的採納判準收緊成一句**：這一張要嘛**早於池中已有的專輯**，要嘛**該藝人在那個時期沒有專輯形態**。
   因此**沒有**收 Maurizio 的 M 系列 12 吋（曲目已在池中《Maurizio》1997 裡）、
   **沒有**收 Burial《Kindred》《Rival Dealer》（曲目已在池中《Tunes 2011-2019》裡）。
3. **14 張 primary=Album ＋ secondary 含 Compilation／DJ-mix 的卡不填例外欄位。**
4. **五組一人多掛名、14 個 MB 實體全部單獨掃過**；新收卡用 MB 實體的 artist-credit 文字
   （`F.U.S.E.`、`Reload`、`Rhythim Is Rhythim`），其餘化名進 `queryAlias` 與 `risk`。
   Reload 另過第 29 條檢查：MB 有五個以上同名不同對象，但池中無人佔用這個通行名。
5. **Frankie Knuckles《Tears》取合併 credit「Frankie Knuckles presents Satoshi Tomiie」**（第 51 條先例）；
   代價是這位藝人在池中會有兩個鍵，可逆（改一個字串）。
6. **三張盤名不取 MB release-group 標題**：TG《Heathen Earth》取原盤短名、
   Merzbow《Noisembryo》取封面短名（RG 副標含 U+2010）、
   Enya《The Celts》依第 45 條取再發名（原盤自我同名《Enya》，1987 年起 release 已作 The Celts）。
   另兩張把 U+2010 換成 ASCII：Derrick May《Mix-Up, Volume 5》、Basic Channel《BCD-2》。
7. **DE9 系列統一用冒號**（`DE9: Closer to the Edit`／`DE9: Transitions`），與池中既有的
   `DE9: Decks, EFX & 909` 一致；MB 與原盤的直線分隔號 `|` 在檔名與比對管線是語法字元，不入盤名。
8. **fabric 系列取《Fabric 17》《Fabric 26》**，不取 MB 的「Fabric NN: 藝人名」；
   先例是池中的 `Global Underground 006: Sydney`。數字是唯一分辨點，去重任何一層都不能剝掉。
9. **Coldcut《Sound Mirrors》年份取 2006 不取 MB 的 2005**——MB 的 2005 那筆是 `GB／Promotion` 宣傳盤，
   最早的 Official 是 2006-01-25（JP）與 2006-01-30（GB）。這是第 95 條那條線的**第五個實例、新形狀**：
   `first-release-date` 是轄下所有 release 日期的最小值，**它不看 status**。

### 未收清單

- **釘不住 MB 而未收（＝§1 候選）：0 張。** 本批查的每一張都在 MB 上，沒有走人工身分的需要。
- **與池中撞卡而未收**：骨幹名單裡有三位**已飽和、本批一張都沒補**——
  **Portishead**（三張錄音室專輯 Dummy／Portishead／Third 池中全有，只剩 Live 與精選可收，不取）、
  **The Avalanches**（三張專輯池中全有）、**Stardust**（只發過那一張 12 吋，池中已有）。
  另有八組是「同一張碟、池中用另一種字串」，`chk-prop` 一筆都不會報、全靠人眼擋下——
  Coldcut《Let Us Play!》↔《Let Us Play》、Burial《Tunes 2011 to 2019》↔《Tunes 2011-2019》、
  Global Communication《Blood Music: Pentamerous Metamorphosis》↔《Pentamerous Metamorphosis》、
  Parmegiani《De natura sonorum》《La création du monde》（大小寫）、
  Pierre Henry《Messe pour le temps présent et musiques concrètes》↔《Messe pour le temps présent》、
  TG《D.o.A. The Third and Final Report》↔《D.o.A: The Third and Final Report》、
  Richie Hawtin《Decks, EFX & 909》↔《DE9: Decks, EFX & 909》。
  **這是第 49 條的第五種形狀：同一套文字系統內的前後綴有無，而且方向是雙向的。**
  現行正規化（`\p{L}\p{N}`）處理得掉大小寫與標點，處理不掉前綴與後綴。
- **查得到但本批刻意不取，留給後續補遺**：
  Merzbow《Music for Bondage Performance》(1991，MB artist-credit 是「Merzbow / Right Brain Audile」合併掛名，
  收了會多開一個藝人鍵)、Bernard Parmegiani《Violostries / Bidule en ré / Capture éphémère》(1969 Philips 原盤，
  與 2003 年 INA-GRM 的同名 CD 整編 `bd5a5c45` 身分歧義)、
  Throbbing Gristle《Throbbing Gristle's Greatest Hits》(1981，primary=Album/secondary=Compilation，可收但本批已有三張 TG)、
  Coldcut《Philosophy》(1993)、Art of Noise《Below the Waste》(1989)、
  Harold Budd《Avalon Sutra》(2005)《The Room》(2000)。

### 封面與試聽預估

- **封面**：44 張全部釘住 rgMbid，CAA 這條路都走得通；另有 25 張查到 Apple `collectionId`
  可作 §4 的備援（其中 Merzbow《Noisembryo》那筆標題不相等、不採，實際可用 24 筆）。
- **固定試聽**：**預估 ready 23 張、unavailable 21 張。**
  unavailable 集中在兩類，都是可預期的：(a) **DJ 混音輯與整編**（Derrick May《Mix-Up, Volume 5》、
  兩張 DE9、Frankie Knuckles《Choice》、Sasha & Digweed 三張、Akufen《Fabric 17》、
  Global Communication《Fabric 26》）——串流授權普遍缺席；
  (b) **1960–90 年代法國 GRM／芝加哥 12 吋／小廠盤**（Pierre Henry 兩張、Parmegiani 兩張、
  Rhythim Is Rhythim 兩張、Frankie Knuckles《Tears》《A New Reality》、Reload、
  Art of Noise《Into Battle》）。
  **店面序照派工用 UKB（gb 排第一），實際命中 gb 23 筆、jp 1 筆、us 1 筆；
  de／nl／be／fr／ca／au 六個店面在 gb 沒中的那些字串上同樣 0 筆。**
  Burial《Antidawn》只在 **jp** 命中、TG《Part Two: The Endless Not》只在 **us** 命中——
  這兩筆是第 158 條「店面決定查不查得到」的實例，已寫進各自的 `risk`。
  三張已知的版本落差要在上架時人工核對：F.U.S.E.《Dimension Intrusion》Apple 只有 25／30 週年版、
  TG《Heathen Earth》只有 Remastered 版、Merzbow《Noisembryo》Apple 條目是 2021 年的
  《Noisembryo / Noise Matrix》合併版（標題不相等，不得直接採用）。

### 場景飽和度

**電子這個場景在池中已經相當深（1,122 位藝人帶 electronic 標籤），空的不是名單而是「已在名單上的人的第二、三張」**——
Detroit／Chicago 的第一代人物幾乎每位都只有代表作那一張（Marshall Jefferson、Adonis、Fingers Inc.、
Joe Smooth、Robert Owens、Lil Louis、Ten City、Derrick Carter、Larry Levan 各 1 張），
而具象音樂與早期氛圍（Luc Ferrari 2、François Bayle 1、Tod Dockstader 1、Morton Subotnick 1、
Muslimgauze 1、Zoviet France 1）更薄；本批補完的是骨幹名單那二十一位，
上述兩塊仍是下一輪廣度批最明確的洞。
