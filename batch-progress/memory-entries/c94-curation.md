## 2026-09-05 — dip-vinyl-shop — c-94 策展提案（搖滾正典目錄深度 II：金屬／硬蕊／龐克／emo／日本另類）

- **改動摘要**：新增 `batch-progress/c94/prop-a.json`（23 張）與 `batch-progress/c94/prop-b.json`（20 張），
  合計 **43 張、34 位藝人**，`lineType: 廣度`。
  - **a 組＝金屬與硬蕊目錄深度**（23 張、18 位）：Voivod 2（War and Pain 1984／Nothingface 1989）、
    Accept 2（Breaker 1981／Metal Heart 1985）、Deafheaven 2（Roads to Judah 2011／
    Ordinary Corrupt Human Love 2018）、Eyehategod 2（In the Name of Suffering 1990／
    Confederacy of Ruined Lives 2000）、Deathspell Omega 2（Paracletus 2010／
    The Furnaces of Palingenesia 2019）、Killswitch Engage 1（The End of Heartache 2004）、
    King Diamond 1（"Them" 1988）、Anthrax 1（Persistence of Time 1990）、
    Burzum 1（Det som engang var 1993）、Enslaved 1（Frost 1994）、Neurosis 1（Souls at Zero 1992）、
    Godflesh 1（Selfless 1994）、Kyuss 1（Wretch 1991）、Isis 1（Celestial 2000）、
    Cult of Luna 1（Vertikal 2013）、Cathedral 1（The Ethereal Mirror 1993）、
    Khanate 1（Things Viral 2003）、Uriah Heep 1（Look at Yourself 1971）。
  - **b 組＝龐克、emo、60–70s 美國另類與日本另類**（20 張、16 位）：
    At the Drive-In 2（Acrobatic Tenement 1996／In/Casino/Out 1998）、
    The Microphones 2（Don't Wake Me Up 1999／It Was Hot, We Stayed in the Water 2000）、
    Gene Clark 2（Gene Clark with the Gosdin Brothers 1967／White Light 1971）、
    Flower Travellin' Band 2（Anywhere 1970／Make Up 1973）、
    Refused 1、American Football 1（LP2 2016）、Bikini Kill / Huggy Bear 1（split 1992）、
    Jawbreaker 1（Bivouac 1992）、Mineral 1（EndSerenading 1998）、
    Big Brother & the Holding Company 1（同名首張 1967）、Love 1（Four Sail 1969）、
    Aphrodite's Child 1（End of the World 1968）、FRICTION 1（Skin Deep 1982）、
    ゆらゆら帝国 1（3×3×3 1998）、ザ・スターリン 1（虫 1983）、RCサクセション 1（シングル・マン 1976）。
  - **合輯 0 張**（43 張全部 `primary-type=Album` 且 `secondary-types` 為空，無一張走 §5.6，
    也無一張填例外欄位）。
- **主要檔案**：`batch-progress/c94/prop-a.json`、`batch-progress/c94/prop-b.json`、
  `batch-progress/c94/rulings.md`、`batch-progress/memory-entries/c94-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c94/chk-prop.mjs a b` → 43 張、34 位、**標記 0**；
  跨批去重掃到 46 批（其中 5 批讀 prop）、2,163 張卡，**跨批撞卡 0**。
  43 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?inc=artist-credits+releases`**，
  確認 `primary-type=Album`、`secondary-types` 為空、artist-credit、first-release-date、
  轄下 release 的國別／status 與廠牌／編號（另以 `release?release-group=<id>&inc=labels&limit=100` 取廠牌）。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` **分頁取完**（第 116 條），
  Voivod 名下 100 個、Uriah Heep 27 個正規盤、ザ・スターリン 18 個都靠這條路才拿全。
  撞卡檢查實掃 `seed_cards.json` 全 14,424 列，日文藝人（FRICTION／Flower Travellin' Band／
  はっぴいえんど／ゆらゆら帝国／ザ・スターリン／RCサクセション）**假名、漢字、羅馬拼音三種寫法都掃過**（第 49 條）。

### 這批的裁定

十條，全文在 `batch-progress/c94/rulings.md`。最重要的四條：

1. **American Football 2016 那張取《American Football (LP2)》**——四張正規盤在 MB 上標題全部相同、
   池中已有 1999 那張，照原樣取必撞卡。依第 132 條的括號白名單先例（池中 `Peter Gabriel (Car)`／
   `(Security)`），且 LP2 不是自創——Apple 自己的 collectionName 就是《American Football (Lp2)》。
2. **Gene Clark 1971 那張取《White Light》**——MB 的 RG 標題是自我同名的《Gene Clark》，
   但同一 RG 底下有一筆 release 標題就是《White Light》，Apple 也只有這個名字。第 45／91 條。
3. **はっぴいえんど 本批零收，因為它已經滿了**——三張正規盤全部在池中，MB 名下其餘只有合輯與現場。
4. **池中 0 張的藝人不收**（NYHC 那一整段、riot grrrl 第二圈、90s post-hardcore）——
   這十批是**目錄深度**不是覆蓋，第 69 條的反向套用。已查齊資料、列為後續補遺批的現成候選。

### 順帶抓到：**池中有三組重複卡、一組掛名分裂**（線上資料，雲端不動，留給本機）

| 重複的兩筆 | MB release-group | 說明 |
|---|---|---|
| `Happy End《Kazemachi Roman》(1971)` ／ `はっぴいえんど《風街ろまん》(1971)` | `14cfc058` | **同一張碟** |
| `Happy End《Happy End》(1973)` ／ `はっぴいえんど《HAPPY END》(1973)` | `c66cc3a8` | **同一張碟** |
| `Big Brother & The Holding Company《Cheap Thrills》` ／ `Big Brother and the Holding Company《Cheap Thrills》` | `02de8887` | **同一張碟，兩筆都掛頂點卡 hall** |
| `BOREDOMS`（2 張）／ `Boredoms`（2 張） | — | 掛名分裂，非重複卡 |

前三組是**重複卡不只是分裂鍵**，正規化掛名時要一併刪掉重複的那三張。
建議記進 `audits/pool-artist-name-splits.md`。這是第 49 條第一種形狀的又一次應驗。

### §1 候選清單（釘不住 MB 而未收）

**本批 0 筆。** 43 張全部釘得住 release-group MBID，沒有任何一張要走 §1。
（本批的骨幹名單全是英美日的正典藝人，MB 建檔完整；這與 c-95 戰前藍調、c-99 演歌那幾批的形狀相反。）

### 與池中撞卡而未收的清單

- **骨幹名單裡「已經滿了」的三位**：
  - **はっぴいえんど**——《はっぴいえんど》(1970)、《風街ろまん》(1971)、《HAPPY END》(1973) 三張全在池中
    （其中後兩張以 `Happy End` 拼法重複存在，見上表）。MB 名下其餘是《CITY》(1973 Compilation)、
    《Singles Happy End》(1974 Compilation)、三張現場輯與一張 BOX。**這位在池中已飽和。**
  - **Bikini Kill**——《Pussy Whipped》(1993)、《Reject All American》(1996) 兩張在池中，
    第三個 `primary-type=Album` 條目就是本批收的那張 split。**收完之後也飽和。**
  - **Big Brother & the Holding Company**——《Cheap Thrills》在池中（兩種掛名各一筆）。
- **同藝人、池中已有而本批刻意不收**：Voivod《Killing Technology》《Dimension Hatröss》；
  Accept《Restless and Wild》《Balls to the Wall》；Deafheaven《Sunbather》《New Bermuda》；
  Eyehategod《Take as Needed for Pain》(hall)《Dopesick》；Deathspell Omega《Si monumentum requires,
  circumspice》《Fas - Ite, Maledicti, in Ignem Aeternum》(heresy)；Killswitch Engage《Alive or Just
  Breathing》；King Diamond《Abigail》；Anthrax《Among the Living》《Spreading the Disease》；
  Burzum《Filosofem》《Hvis lyset tar oss》；Enslaved《Vikingligr Veldi》《Below the Lights》；
  Neurosis《Through Silver in Blood》《Times of Grace》；Godflesh《Streetcleaner》《Pure》；
  Kyuss《Blues for the Red Sun》《Welcome to Sky Valley》；Isis《Oceanic》《Panopticon》；
  Cult of Luna《Somewhere Along the Highway》；Cathedral《Forest of Equilibrium》；
  Khanate《Khanate》(heresy)；Uriah Heep《Demons and Wizards》；Refused《The Shape of Punk to Come》；
  At the Drive-In《Relationship of Command》；American Football《American Football》(1999)；
  The Microphones《The Glow Pt. 2》(hall)《Mount Eerie》；Love《Love》《Da Capo》《Forever Changes》(hall)；
  Aphrodite's Child《666》《It's Five O'Clock》；Flower Travellin' Band《Satori》(hall)《Made in Japan》；
  FRICTION《軋轢》(hall)《Replicant Walk》；ゆらゆら帝国《ゆらゆら帝国のしびれ》《空洞です》；
  ザ・スターリン《STOP JAP》《trash》；RCサクセション《ラプソディー》《PLEASE》；
  Jawbreaker《24 Hour Revenge Therapy》《Dear You》；Mineral《The Power of Failing》。
- **刻意不釘的對照組**（逐張寫進各卡 `mbNote`，格式為「刻意不釘：<id>《盤名》（理由）、…」，
  且一律排在正面的「釘 release-group」宣告之後，第 162 條）：**43 張卡每一張都有，對照組 MBID 合計 124 筆**，
  最集中的三類是——**現場輯與 demo**（Voivod 名下光是 Album/Live 的日期型 release-group 就有十餘個、
  Khanate《Live Aktion Sampler》、FRICTION 兩張現場）、**精選與二合一**（Accept《I'm a Rebel / Breaker》、
  《Metal Heart / Kaizoku-Ban》、《Songs From the Big Chair / Metal Heart》、
  ザ・スターリン《STOP JAP + GO GO STALIN》、Voivod《The Best of Voivod》《Build Your Weapons》）、
  **同名雙胞胎與自我同名**（Killswitch Engage 2000／2009 兩張《Killswitch Engage》、
  Eyehategod 2014 自我同名、Burzum 1992 自我同名、Cult of Luna 2001 自我同名、
  Khanate 2001 自我同名、ゆらゆら帝国 1992／1994 兩張自我同名、
  Uriah Heep 1972／1995 兩個《The Magician's Birthday》、
  American Football 1999／2019／2026 三張同名、Trouble 1984／1990 兩張同名——最後一位本批未收）。
  另有 **Killswitch Engage《The End of Heartache》2007 年的同名 EP**、
  **Accept《Breaker》1981 年的同名單曲**、**King Diamond 的《Abigail II: The Revenge》**
  三筆是自動比對最容易換上去的形狀（第 126／129／153／162 條的四次事故都是這個形狀）。

### 封面與試聽預估

- **封面：CAA release-group 端點實測 43/43 全部 200。** 這是這輪擴充以來覆蓋最完整的一批
  （對照 c-91 是 34/44）——原因是本批全是英美日大廠與知名獨立廠牌的正典盤，CAA 建檔率高。
  **本機端封面應該不用掃圖。**
- **試聽：Apple 上有條目的 36/43（84%）**，逐張以 `search` 實測（每張各試 1–3 個 storefront，
  依第 158 條日本盤先試 `jp`、德國盤試 `de`、瑞典／挪威試 `se`／`no`、希臘與法國試 `gr`／`fr`）。
  **7 張 Apple 完全查無**（實測 `search` 正常回應、非 403 速率限制，第 98 條）：
  Accept《Breaker》、Godflesh《Selfless》、Kyuss《Wretch》、Cathedral《The Ethereal Mirror》、
  Flower Travellin' Band《Anywhere》、Bikini Kill / Huggy Bear 的 split、Jawbreaker《Bivouac》。
  **另有 6 張 Apple 只有加曲／擴充版**，本機採用前必須先開
  `release?release-group=<id>&inc=recordings` 核原盤軌數（第 141 條，本批一律**不填**
  `originalTrackCount`）：King Diamond《"Them"》（只有 Bonus Track Version）、
  Uriah Heep《Look at Yourself》（只有 24 軌 Expanded Version）、
  Gene Clark《Gene Clark with the Gosdin Brothers》（兩筆都 17 軌）、
  Gene Clark《White Light》（只有 Remastered 14 軌）、
  Flower Travellin' Band《Make Up》（原盤是雙碟、Apple 四筆全 10 軌）、
  ザ・スターリン《虫》（2003 那筆 16 軌是加曲再版）。
  **估 ready 約 28–32 / 43（65–74%）。**
- **本批試聽最危險的一張是 Killswitch Engage《The End of Heartache》**：Apple us 回八筆，
  **六筆是別的藝人翻唱或伴唱帶**（含一筆明寫「Karaoke Version Originally Performed by Killswitch Engage」），
  正是第 153 條附錄講的「逐軌核曲名擋不住、只有看掛名與尾綴才擋得住」的形狀。已在 `risk` 鎖定 214628864。
- **Apple 盤名與卡片盤名不相等而必然落空的三張**（已全部寫進 `queryAlias`）：
  Voivod《Nothingface》→ Apple 拆成兩個字的「Nothing Face」；
  At the Drive-In《In/Casino/Out》→ Apple 加了空格的「In / Casino / Out」；
  RCサクセション《シングル・マン》→ Apple 用羅馬拼音的「Single Man」而掛名仍是日文（第 158 條的形狀）。
- **`YYYY-01-01` 佔位日期 6 處**（Voivod ×2、Neurosis、Cult of Luna、Mineral、Love），
  `yearDrift` 算不出來，逐張複檢要看 ℗ 年與軌數（第 140 條附錄）。
- **`collectionExplicitness` 全部 `notExplicit`**，本批無嘻哈卡、無淨化版風險。

### 場景飽和度

**金屬那一塊其實比預期滿**——實掃發現 Black Sabbath 10、Judas Priest 9、Iron Maiden 9、Metallica 8、
Opeth 7、Sepultura 7、Motörhead 7、Death 6、Slayer 6、Megadeth 6、Meshuggah 6、Helloween 6 都已在池中，
真正淺的是**歐陸傳統重金屬的第二線**（Accept、Manowar、Diamond Head、Angel Witch、Saint Vitus、
Trouble 各 1–2 張）與**極端金屬的 2000 年後那一段**（Cult of Luna、Cathedral、Khanate 各 1 張）。
本批補的正是這兩塊。

**真正還很空的是硬蕊那一整條線**：紐約硬蕊（Cro-Mags、Agnostic Front、Youth of Today、Gorilla Biscuits）
與 90 年代 straight edge（Integrity、Earth Crisis、Snapcase）**池中全部 0 張**，
而 Black Flag(4)、Bad Brains(3)、Fugazi(6)、Hüsker Dü(6) 這幾位早就很深——
**同一個場景裡一半藝人六張、一半藝人零張**，這是覆蓋缺口不是深度缺口，要另開一批。
riot grrrl 第二圈（Bratmobile、Heavens to Betsy、Team Dresch、Huggy Bear、Le Tigre）與
90 年代 post-hardcore／math rock（Unwound、Drive Like Jehu、Hoover、Q and Not U、Faraquet、
Cap'n Jazz、Texas Is the Reason）也是同一個形狀，名單已寫進 `rulings.md` 第 8 條備用。

**日本另類這一塊本批之後仍偏淺**：ゆらゆら帝国、ザ・スターリン、RCサクセション、FRICTION、
Flower Travellin' Band 各補一到兩張之後都只有三到四張，而 あぶらだこ、eastern youth、
bloodthirsty butchers、Guitar Wolf、thee michelle gun elephant、灰野敬二（池中掛羅馬拼音）
在池中仍是 0 到 1 張。

- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity、頂點資格評估、封面實抓、固定簡介、
  固定試聽、Firestore／KV／`seed_cards.json`／`apex_pool.json` 寫入，以及
  `build-seed-genres.mjs` 與 `build-genre-tree.mjs --write`（第 147 條：後者必須排在 seed 上架之後）。
