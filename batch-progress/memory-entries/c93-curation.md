## 2026-09-05 — dip-vinyl-shop — c-93 策展提案（搖滾正典目錄深度 I）

- **改動摘要**：新增 `batch-progress/c93/prop-a.json`（20 張）與 `batch-progress/c93/prop-b.json`（25 張），
  合計 **45 張、22 位藝人**，`lineType: 廣度`。
  - **a 組＝後龐克與另類**：Joy Division 2（Substance 1988／Still 1981）、Devo 3（Duty Now for the Future 1979／
    New Traditionalists 1981／Oh, No! It's Devo 1982）、Pere Ubu 3（New Picnic Time 1979／The Art of Walking 1980／
    Song of the Bailing Man 1982）、Suicide 1（A Way of Life 1988）、The B-52's 3（Wild Planet 1980／Whammy! 1983／
    Cosmic Thing 1989）、Elvis Costello 5（Get Happy!! 1980／Trust 1981／Imperial Bedroom 1982／King of America 1986／
    Blood & Chocolate 1986）、Jane's Addiction 1（Strays 2003）、The Damned 1（The Black Album 1980）、
    Gang of Four 1（Songs of the Free 1982）。
  - **b 組＝前衛、車庫與 90s**：Magma 4（Kobaïa 1970／1001° Centigrades 1971／Ẁurdah Ïtah 1974／Üdü Wüdü 1976）、
    Robert Wyatt 3（The End of an Ear 1970／Ruth Is Stranger Than Richard 1975／Shleep 1997）、
    This Heat 2（Repeat 1993／Made Available: John Peel Sessions 1996）、Soft Machine 1（Fourth 1971）、
    Gentle Giant 2（Acquiring the Taste 1971／In a Glass House 1973）、The Flaming Lips 3（Transmissions From the
    Satellite Heart 1993／Clouds Taste Metallic 1995／Zaireeka 1997）、Spiritualized 2（Pure Phase 1995／
    Let It Come Down 2001）、Liz Phair 2（whitechocolatespaceegg 1998／Liz Phair 2003）、
    The Cranberries 2（To the Faithful Departed 1996／Bury the Hatchet 1999）、
    Jeff Buckley 1（Sketches for My Sweetheart the Drunk 1998）、
    Guns N' Roses 2（"The Spaghetti Incident?" 1993／Chinese Democracy 2008）、The Sonics 1（Boom 1966）。
  - **合輯 0 張**。三張（Joy Division《Substance》《Still》、Jeff Buckley《Sketches》）的 MB `primary-type` 是
    Album、`secondary-types` 含 Compilation，依 §5.6 明文照一般 Album 寫、不填例外欄位，**未動用 §5.6**。
  - 骨幹名單中 **The Stooges／The Stone Roses／New York Dolls／Neutral Milk Hotel／Slint 五位一張都不收**——
    實掃後確認正典目錄在池中已完整（見 rulings 第 2 條）。名單外自加 **The Damned／Gang of Four／
    Soft Machine／Gentle Giant／The Sonics** 五位（rulings 第 10 條）。
- **主要檔案**：`batch-progress/c93/prop-a.json`、`batch-progress/c93/prop-b.json`、
  `batch-progress/c93/rulings.md`（13 條裁定）、`batch-progress/memory-entries/c93-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c93/chk-prop.mjs a b` → 45 張、22 位、**標記 0**；
  跨批去重掃到 46 批（其中 5 批讀 prop）、2,158 張卡，**跨批撞卡 0**。
  45 張全部釘住 release-group MBID 並**逐一回問 `release-group/<id>?inc=artist-credits+releases`**
  確認 `primary-type=Album`、標題、artist-credit 與轄下 release 的國別／status（第 41 條）；
  每位藝人的目錄一律以 `release-group?artist=<MBID>&limit=100&offset=` 分頁列完（第 116 條，
  Guns N' Roses 313、Elvis Costello 三個實體合計 246、The Flaming Lips 175、The Cranberries 137、
  The Damned 137、Devo 123、Joy Division 123、Jeff Buckley 104——全部超過 25 筆上限）。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上做，並針對**撇號變體**（`’` vs `'`）另掃一次——
  Jane's Addiction 與 Guns N' Roses 兩組因此從「池中 1 張／未知」修正為 3 張與 4 張。
  MB 探測期間出現 11 次 503，全部以退避重試取得 200（第 28 條，未記為查無）。
- **釘不住 MB 而未收（＝§1 候選）：0 張。**
- **與池中撞卡而未收**：The Stooges 3、The Stone Roses 2、New York Dolls 2、Neutral Milk Hotel 2、Slint 2，
  以及 Suicide《Suicide (The Second Album)》（MB `a9069ea4`，池中盤名作《Suicide: Alan Vega and Martin Rev》）。
- **封面與試聽預估**：Apple 命中 **43/45**（`collectionId` 與命中店面已逐張寫進 `risk`）。
  兩張真查無（HTTP 200＋resultCount 0，非 403）：Spiritualized《Pure Phase》、Liz Phair《whitechocolatespaceegg》
  ——封面走 CAA／release-group，固定試聽預估 `unavailable`。
  另有 6 張 Apple 命中的是擴充／重製版（Cosmic Thing 30th、To the Faithful Departed Deluxe、
  Sketches Expanded、Soft Machine Fourth Remastered、Suicide A Way of Life 2005 Remaster、
  Magma 兩張 2020 Remastered），下游取試聽要在備註寫明版本。全批為英美歐大廠盤，CAA 命中率預估高，
  封面預估 40+/45、ready 試聽預估 40/45。
  **Guns N' Roses 兩張 `collectionExplicitness` 皆為 `explicit`**，且該團在 Apple 上確有 explicit／cleaned
  雙胞胎（《Live Era '87-'93》1452802799／1452868521），下游配試聽要逐張核（rulings 第 12 條）。
- **場景飽和度判斷**：**還沒飽和，但只剩「第二層」了。** 英美搖滾正典的**第一層**（每位的招牌作）
  在這批之後大致補齊；剩下的缺口是 Mercury Rev、Cheap Trick、Magazine、Killing Joke、Stereolab 這種
  「池中已有 1–4 張、還缺一到三張中期作」的第二層，以及本批因 45 張上限而讓出的 8 張
  （Magma《Attahk》、Wyatt《Comicopera》、Flaming Lips《Embryonic》、Spiritualized《Songs in A&E》、
  Gentle Giant《The Power and the Glory》、Pere Ubu《The Tenement Year》、Devo《Shout》、
  Henry Cow《Western Culture》）——**這些全部釘得住 MB、也都過得了撞卡檢查，可直接開續批**。
