## 2026-09-04 — dip-vinyl-shop — c-86 策展提案（深掘：美國自主爵士廠牌 1969–82）

- **改動摘要**：新增 `batch-progress/c86/prop-a.json`（22 張）與 `batch-progress/c86/prop-b.json`（23 張），
  合計 **45 張、45 位藝人**（掛名字串全不重複），`lineType: 深掘`，年份 **1972–1981**。
  這批延續「B 面」概念——挖的是這些自營廠牌目錄裡的第二、三順位，
  刻意避開 Black Jazz 的 Doug Carn 三張代表作、Strata-East 的 Gil Scott-Heron《Winter in America》
  與 Charles Tolliver／Music Inc. 各盤、Saturn 的 Sun Ra 名盤（Sun Ra 池中 14 張，本批一張未收，
  理由是 El Saturn 的碟在池中已有 Atlantis／Lanquidity／Sleeping Beauty 等，且該廠牌的碟幾乎全掛同一人，
  「B 面」空間反而比其他廠牌小）。
  **本批未因藝人張數上限割捨任何候選**（裁定第 150 條，簡報第 46 行那條 2026-09-04 已作廢）。
  - **a 組＝黑人自營廠牌的 spiritual 側（22 張，1973–1981）**，`label` 欄採原盤條目第一順位：
    Black Jazz Records 9（Henry Franklin《The Skipper at Home》、Walter Bishop, Jr.'s 4th Cycle《Keeper of My Soul》、
    Gene Russell《Talk to My Lady》、Calvin Keys《Proceed With Caution》、Rudolph Johnson《The Second Coming》、
    The Awakening《Mirage》、Kellee Patterson《Maiden Voyage》、Roland Haynes《2nd Wave》、
    Cleveland Eaton《Plenty Good Eaton》）、
    Nimbus West Records 4（Creative Arts Ensemble《One Step Out》、Linda Hill《Lullaby for Linda》、
    Pan Afrikan Peoples Arkestra《Flight 17》、Horace Tapscott with The Pan-Afrikan Peoples Arkestra《Live at I.U.C.C.》）、
    Tribe 3（Phil Ranelin《The Time Is Now!》、Harold McKinney《Voices and Rhythms of the Creative Profile》、
    Mixed Bag《Mixed Bag's First Album》）、
    Strata Records（底特律）3（Maulawi《Maulawi》、The Contemporary Jazz Quintet《Location》、Sphere《Inside Ourselves》）、
    Black Fire 3（Oneness of Juju《Space Jungle Luv》、Wayne Davis《Wayne Davis》、Experience Unlimited《Free Yourself》）。
  - **b 組＝紐約東岸自營與 loft／自由即興側（23 張，1972–1979）**：
    Strata-East 9（The John Betsch Society《Earth Blossom》、Brother Ah《Sound Awareness》、Charles Sullivan《Genesis》、
    Muriel Winston《A Fresh Viewpoint》、Dick Griffin《The Eighth Wonder》、Harold Vick《Don't Look Back》、
    Shirley Scott《One for Me》、Sonny Fortune《Long Before Our Mothers Cried》、John Gordon《Erotica Suite》）、
    Survival Records 4（Rashied Ali & Frank Lowe《Duo Exchange》、Rashied Ali Quartet《New Directions in Modern Music》、
    Rashied Ali / Le Roy Jenkins《Swift Are the Winds of Life》、Joe Lee Wilson & Bond Street《What Would It Be Without You》）、
    Nessa Records 4（Von Freeman《Have No Fear》、Air《Air Time》、Roscoe Mitchell《Nonaah》、Leo Smith《Spirit Catcher》）、
    India Navigation 3（Alan Braufman《Valley of Search》、Hamiet Bluiett《Birthright: A Solo Blues Concert》、
    Chico Freeman《Spirit Sensitive》）、
    Improvising Artists Inc. 1（Steve Lacy & Michael Smith《Sidelines》）、
    Muntu Records 1（Ensemble Muntu《First Feeding》）、Adelphi Records 1（Black Arthur Blythe《Bush Baby》）。
- **主要檔案**：`batch-progress/c86/prop-a.json`、`batch-progress/c86/prop-b.json`、
  `batch-progress/memory-entries/c86-curation.md`（本檔）。
  `batch-progress/c86/chk-prop.mjs` 為既有檔，未改動。**未動 git、未碰 `seed_cards.json` 等禁令檔。**
- **驗證結果**：
  - `node batch-progress/c86/chk-prop.mjs` → a 22 張／22 位、b 23 張／23 位，**標記 0**。
  - 串跑 `dedup-crossbatch.mjs` → **39 批（其中 4 批讀 prop）、1,887 張、跨批撞卡 0**；c86 以 prop 來源被納入。
  - 45 張全部釘住 release-group MBID（**45 個互不重複**）並逐個回問
    `release-group/<id>?inc=artist-credits+releases` 確認 **primary-type=Album**、標題與 artist-credit（第 41 條）；
    探測錯誤 0。帶 secondary-type 的有 3 張，全是 **Live**：Tapscott《Live at I.U.C.C.》、
    Sphere《Inside Ourselves》、Hamiet Bluiett《Birthright》——皆為原始現場錄音盤，非二合一套裝。
  - **合輯 0 張**（`releaseType` 全為 Album，`exceptionReason` 全空，§5.6 本批未用到）。**EP 0 張。**
  - **入口方法照裁定第 149 條**：以 `release?query=label:"<廠牌名>"&limit=100` 反查開場，
    掃過 Nimbus West／Black Jazz／Tribe／Strata／Strata-East／Black Fire／Survival／India Navigation／
    Improvising Artists／Nessa／Sackville／Bee Hive／Adelphi／Saturn／Muntu／Onari／Universal Justice 十七家；
    藝人名查詢只用來補漏。自營爵士廠牌目錄短，這個方法一次撈得乾淨。
  - **實掃 `seed_cards.json` 全檔（14,424 列）**，三種鍵各掃一次：
    掛名＋盤名複合鍵**完全相等 0 筆**；**以盤名為主鍵**（第 71 條，掃描器加 `length>=4` 守衛）
    完全相等 0 筆、子字串 20 筆（《Mirage》4、《Genesis》4、《Maiden Voyage》2、《Don't Look Back》1、
    《Turning Point》類 4、其餘 5），逐筆人眼核對**皆為不同的碟**；
    **掛名去 The 之後**完全相等 12 筆（Henry Franklin、Gene Russell、Calvin Keys、Rudolph Johnson、
    The Awakening、Harold Vick、Shirley Scott、Hamiet Bluiett、Air、Roscoe Mitchell、Leo Smith、Oneness of Juju），
    逐筆核對後**沒有一筆是同一張碟**。
  - **封面實測**：CAA release-group front **42/45（93%）**、無圖 3、探測錯誤 0。
    無圖的三張是 Henry Franklin《The Skipper at Home》、The Contemporary Jazz Quintet《Location》、
    Joe Lee Wilson & Bond Street《What Would It Be Without You》；前兩張 Apple us 有條目可補，第三張兩邊都空。
  - **試聽實測**：Apple `search?entity=album` 以「藝人＋盤名」比對 **34/45（76%）**，
    命中的 storefront 是 **us 32、jp 1（Linda Hill《Lullaby for Linda》）、gb 1（Chico Freeman《Spirit Sensitive》）**
    ——後兩張若不帶 `country` 參數就會誤判為查無（第 137 條）。這是**專輯存在**的數字，
    實際可用試聽會低於此，探測層要照常跑 `probe-previews`。空的 11 張已逐張寫進該卡的 `risk`。
  - **自我同名 2 張**：Maulawi《Maulawi》（Apple 四個 storefront 全空，身分靠 rgMbid，CAA 有封面）與
    Wayne Davis《Wayne Davis》（Apple us 有 collectionId 1524569657）。兩張皆依 §1 的 2026-09-04 放寬條款
    以 `identity.rgMbid` 當身分證據，`selfTitledVerified` 由下游填。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **Sackville、Onari、Bee Hive 三家最後都沒收**。派工信把它們列為同形狀的起點，但 Sackville 與 Onari 是多倫多廠牌、
     Bee Hive 的目錄以 bebop 老將的新錄音為主，與「1969–82 美國自主爵士」這個場景的重心不同；
     45 張的額度先給美國自營廠牌，三家寫進「查得到但本批未收」。可逆，改回去只是加卡。
  2. **Saturn 一張未收。** 該廠牌的碟幾乎全掛 Sun Ra 一人，而池中 Sun Ra 已有 14 張（含 apex:heresy 一張），
     其中 Atlantis、Lanquidity、Sleeping Beauty 正是 El Saturn 盤——**這不是藝人上限**（第 150 條已作廢），
     是「這家廠牌的 B 面在池中已經被開過」。同樣的額度放在 Survival／Nessa／Muntu（池中零張）產出更高。
  3. **分量依據只剩稀有度的一律不收（第 109 條）**，本批剔掉 9 張：
     Leroy Jenkins《Solo Concert》(IN 1028)、James Newton《Paseo Del Mar》(IN 1037)、
     Anthony Davis Quartet《Song for the Old World》(IN 1036)、Chico Freeman《Kings of Mali》(IN 1035)、
     Jessica Williams《The Portal of Antrim》(Adelphi AD 5003)、The Brass Company《Colors》(SES-19752)、
     Keno Duke / Contemporaries《Sense of Values》(SES-7416)、Warren Smith / Composers Workshop Ensemble (SES-1972-3)、
     Jazz Contemporaries《Reasons in Tonality》(SES 1972-2)。
     九張都釘得住 MB，但 Discogs 版本頁上零筆授權再發、也查不到署名樂評，只剩「版本很少」可寫。
  4. **考古再發的背書判定以「這一次再發」為單位（第 43／57／65／78 條）**，三張帶未授權版本的碟照收但寫進 `mbNote`：
     Pan Afrikan Peoples Arkestra《Flight 17》（MB 轄下 2019 GB 標 **Bootleg**，背書改採 1997 Nimbus West CD 與 2019 UGMAA 版）、
     Tapscott《Live at I.U.C.C.》（MB 轄下 2019-03-26 GB 標 Bootleg；Discogs 上 Outernational Sounds OTR-007 標
     **Partially Unofficial**，背書改採 Nimbus West 2006 CD 與 Soul Jazz 2019 SJR CD424）、
     Rashied Ali Quartet《New Directions in Modern Music》（Discogs 上 Klimt Records 兩筆皆 **Unofficial**，
     背書只採 Knit Classics KCR-3022）。另 Rashied Ali & Frank Lowe《Duo Exchange》的 2016 年
     Survival Records **(10)** SR 101 標 Unofficial——**Discogs 上有兩個同名 Survival Records 實體**，
     (2) 是原廠、(10) 發未授權盤，引用一律帶括號序號。
  5. **掛名採 MB 的 artist-credit，撇號一律 ASCII，MB 的 U+2019 寫進 `queryAlias` 與 `risk`**：
     Walter Bishop, Jr.'s 4th Cycle、Mixed Bag《Mixed Bag's First Album》（比照 c-84 第 3 項）。
  6. **「團體名 vs 領班名」與改名一律兩種寫法都備查（第 151 條）**，本批有五組：
     Pan Afrikan Peoples Arkestra／Pan-Afrikan Peoples Arkestra／Horace Tapscott with…；
     Phil Ranelin／Phillip Ranelin；Juju／Oneness of Juju／Plunky and Oneness of Juju；
     Ensemble Muntu／Jemeel Moondoc & Muntu（**池中既有卡就是後者，本卡是前者、不同碟**）；
     Leo Smith／Wadada Leo Smith；Black Arthur Blythe／Arthur Blythe（**池中既有卡是後者**）。
     六組全部填進 `queryAlias`。
  7. **盤名兩邊不同套命名的，兩種都進 `queryAlias`**：Harold McKinney《Voices and Rhythms…》(MB) vs
     《Voices & Rhythms…》(Discogs)、Calvin Keys《Proceed With Caution》(MB) vs《Proceed With Caution!》(Discogs)、
     Hamiet Bluiett《Birthright: A Solo Blues Concert》(MB 冒號) vs《Birthright (A Solo Blues Concert)》(Discogs 括號)。
  8. **Charles Tyler《Saga of the Outlaws》(1978, Nessa n-16) 撞 c-59，換成 John Gordon《Erotica Suite》(1978, SES-19780)。**
     `chk-prop` 的跨批去重當場抓到，換完重跑標記 0。
  9. **Roscoe Mitchell《Nonaah》的雙 LP 照收**：第 129 條禁的是「把兩張專輯併成一片」的二合一套裝，
     本張的雙碟是單一作品的原始形態，可以收，但已在 `risk` 寫明下游做軌數比對要以雙碟為準。
- **釘不住 MB 而未收**（已排除第 28／98／116／122／139 條的五種假形狀：非 503／403、非 25 筆分頁截斷、
  非「回了不相干的東西」、拼法變體都試過）：
  - **Mus-I-Col 整條線**（哥倫布市的私壓爵士）：`label:"Mus-i-col"` count=0、`label:"Mus-I-Col Recording"` count=0、
    `label:"Musicol"` count=1 但回的是 1967 年一張無關的單曲（第 122 條形狀）。三種寫法都試過，這條線在 MB 上打不開。
    **可進補遺批走 §1。**
  - **Why Not（日本）這條線**：MB 的 `label:"Why Not"` 回的是英國龐克廠牌 Why Not? Records（第 122 條形狀），
    Discogs 上該廠牌寫成一個字「Whynot」，以廠牌反查在 MB 上打不開。
    Muhal Richard Abrams《Afrisong》可從 India Navigation IN 1058 那一側釘住（RG a296d236），
    但原盤廠牌到底是 Whynot WN 004 還是 India Navigation 未定，`label` 欄填不出來，本批不收。**可進補遺批。**
  - **Mike Nock, Bennie Maupin, Cecil McBee, Eddie Marshall《Almanac》**(1977, IAI)：
    RG 3af78ad2-f95c-3cfe-82e1-e32e477b510e 存在且 primary-type=Album，但 **MB 的 first-release-date 是 1967**
    （Discogs 原盤 1977，落差十年，是 MB 的資料錯誤而非年份分歧），且 artist-credit 是四人聯名字串。
    兩處都要下游特判，剔除。
  - **Lon Moshe & Southern Freedom Arkestra《Love Is Where the Spirit Lies》**(Black Fire BF 19804)：
    RG d2f98a26-fc43-4443-a2d9-2b515ec07950 存在，但 **MB 與 Discogs 的最早版本都記 1993**，
    而 Black Fire 的編號規則（19804）指向 1980，原盤年份釘不住，落在本批 1969–82 的窗外也說不定。
    Strut 2020 年 STRUT239LP 有授權復刻，**若研究層能定出原盤年可撈回**。
- **與池中撞卡而未收**（實掃全檔，非取樣；括號內為池中既有卡）：
  - Tribe 4：Wendell Harrison《An Evening With the Devil》、Doug Hammond & David Durrah《Reflections in the Sea of Nurnen》、
    Phil Ranelin《Vibes from the Tribe》、**Marcus Belgrave《Gemini》(MB) ←→ 池中《Gemini II》**
    ——**同一張碟、兩個盤名**，字串去重看不見，是裁定第 151 條在本批的實例。
  - Strata-East 7：Shamek Farrah《First Impressions》、The Descendants of Mike and Phoebe《A Spirit Speaks》、
    Cecil McBee《Mutima》、Milton Marsh《Monism》、The Piano Choir《Handscapes》、
    Billy Parker's Fourth World《Freedom of Speech》、
    **The Ensemble Al Salaam《The Sojourner》←→ 池中「The Ensemble Al-Salaam」**（連字號差一個）。
  - India Navigation 3：Hamiet Bluiett《Endangered Species》、Arthur Blythe《The Grip》、David Murray《Flowers for Albert》。
  - Black Fire／Juju 3：Oneness of Juju《African Rhythms》、Juju《A Message From Mozambique》(apex:pearl)、Juju《Chapter Two: Nia》。
  - Black Jazz 10：Doug Carn 三張、Calvin Keys《Shawn-Neeq》、Rudolph Johnson《Spring Rain》、
    The Awakening《Hear, Sense and Feel》、Henry Franklin《The Skipper》、Walter Bishop Jr.《Coral Keys》、
    Gene Russell《New Direction》、Chester Thompson《Powerhouse》。
  - Nimbus West 3：Horace Tapscott《The Call》、Adele Sebastian《Desert Fairy Princess》、Nate Morgan《Journey Into Nigritia》。
  - Strata（底特律）1：The Lyman Woodard Organization《Saturday Night Special》。
  - Muntu 1：Jemeel Moondoc & Muntu《The Evening of the Blue Men》。
  - 跨批 1：Charles Tyler《Saga of the Outlaws》撞 c-59（已換卡，見裁定第 8 項）。
  - **合計 33 筆撞卡候選**。依 2026-09-04 店主更正，藝人張數上限已作廢，本批未因此割捨任何候選。
- **查得到、釘得住，但本批額度已滿（留作後續補遺）**：
  Universal Justice Records（聖路易 BAG 圈）The Human Arts Ensemble《Whisper of Dharma》(1972, UJ 103) 與
  Charles Bobo Shaw & Human Arts Ensemble《Çonceré Ntasiah》(1978, UJ101)；
  Onari（多倫多）Bill Smith & Stuart Broomer《Conversation Pieces》(1977, ONARI 002)；
  Sackville（多倫多）Anthony Davis《Of Blues and Dreams》(1979)、Barry Altschul Trio《Brahma》(1980)；
  Bee Hive（芝加哥）Sal Nistico《Neo/Nistico》(1978)、Ronnie Mathews《Roots, Branches & Dances》(1979)、
  Curtis Fuller《Fire and Filigree》(1979)、Dizzy Reece Sextet《Manhattan Project》(1978)；
  Adelphi AD 5000 爵士線 David Murray《Low Class Conspiracy》(AD 5002)、Steve Lacy《Raps》(AD 5004)；
  Strata-East 其餘 Weldon Irvine《In Harmony》(SES-19749，Luv N' Haight 1992／Think! 2018／P-Vine 2023 有再發)、
  Charles Rouse《Two Is One》、The Cosmic Twins《The Waterbearers》、The New York Bass Violin Choir 同名碟；
  Nimbus West 其餘 Horace Tapscott / Roberto Miranda / Sonship《Live at Lobero, Vol. II》(1981)；
  Black Jazz 其餘 Doug Carn《Adam's Apple》(1974, BJQD/21)。
- **場景飽和度：半滿。**
  以本批候選逐張比對出來的結果（`seed_cards.json` 沒有廠牌欄，這是逐張認出來的、不是欄位統計）：
  **正典側已相當厚**——Black Jazz 池中 10 張、Strata-East 10 張、Tribe 4 張、India Navigation 3 張、
  Nimbus West 3 張、Strata（底特律）1 張、Black Fire／Juju 3 張、Muntu 1 張，本批挖的是這些目錄的第二、三順位。
  **真正沒開過的是 loft／自由即興的自營廠牌**：Survival Records、Nessa Records、Improvising Artists Inc.、
  Adelphi 的 AD 5000 爵士線在本批之前**全部零張**，本批各補了 4／4／1／1。
  往下還能挖的是 Universal Justice（聖路易 BAG）、Sackville／Onari（多倫多）、Bee Hive（芝加哥）與
  Mus-I-Col／Whynot 兩條 MB 上打不開的線。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
