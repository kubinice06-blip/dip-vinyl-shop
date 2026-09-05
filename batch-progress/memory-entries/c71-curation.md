## 2026-09-03 — dip-vinyl-shop — c-71 策展提案（深掘：英國自主爵士與即興廠牌 1969–85）

- **改動摘要**：新增 `batch-progress/c71/prop-a.json`（22 張）與 `batch-progress/c71/prop-b.json`（23 張），
  合計 **45 張、41 位藝人**，`lineType: 深掘`，年份 1969–1980，合輯 0 張、自我同名 1 張（Brotherhood of Breath 1971，Apple 有條目）。
  - a 組＝Ogun 與南非流亡圈（Ogun 12：Brotherhood of Breath、Harry Miller、Mike Osborne Trio ×2、Ninesense ×2、
    Elton Dean Quartet、Rogue Element、Blue Notes、Louis Moholo Octet、Chris McGregor、Keith Tippett's Ark；
    Pukwana 2、RCA Neon 1）＋ Cadillac／Steam（Original、Joy Unlimited、Westbrook《Live》、Captain Adventure、TNT）
    ＋ Dandelion《Ear of Beholder》、Utopia《Sunset Glow》。
  - b 組＝Turtle 全部三張、Mosaic 4、Incus 6（Company 1、Parker/Lytton、Guy/LJCO《Ode》、Music Improvisation Company、
    SME《Biosystem》、Wheeler《Song for Someone》）、CBS《The Baptised Traveller》、Bead 2、Piano 1、Transatlantic《Prayer for Peace》、
    Spotlite 2（No Fear、Arbeia）、Deram／Deram Nova／Vertigo 二線 3（Skidmore、Lowther、Nucleus《We'll Talk About It Later》）。
- **主要檔案**：`batch-progress/c71/prop-a.json`、`batch-progress/c71/prop-b.json`、`batch-progress/memory-entries/c71-curation.md`（本檔）。
  中間檔（Discogs 廠牌目錄掃描 Ogun／Incus／Cadillac／Turtle／Mosaic／Steam／Spotlite／Bead／Emanem／Impetus／Piano／Tangent／Leo、
  MB 藝人 browse 約 120 位、Apple／CAA 探測）留在 scratchpad `c71/`。
- **驗證結果**：`node batch-progress/c71/chk-prop.mjs a b` → 45 張、41 位、**標記 0**，跨批去重 19 批 830 張撞卡 0。
  45 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`（第 41 條）；
  `seed_cards.json` 全 13,913 列實掃，41 位藝人皆未達 3 張上限（Kenny Wheeler 與 SME 本批各補到第 3 張）。
- **池中現況**：這個場景在池中幾乎全空——只有 Derek Bailey 3（達上限）、Evan Parker 2、SME 2、Kenny Wheeler 2、
  Tony Oxley 1、Paul Rutherford 1、AMM 1；Ogun／Cadillac／Turtle／Mosaic／Spotlite／Bead 整批廠牌零張。
- **封面與試聽預估**：CAA 有圖 31/45；CAA 404 的 14 張裡 6 張 Apple 有條目可補（Original、Captain Adventure、Collier 三張、
  Baptised Traveller），**8 張要掃圖**（Border Crossing、All Night Long、TNT、Outback、Flight、Company 1、White String's Attached、
  The Bath of Surprise）。Apple gb 命中 20/45（全在 `gb`），Ogun 目錄大多不在 Apple，試聽預估約 40%。
- **年份裁定**（寫進各卡 `risk`）：MB 只建再發的 4 張採 Discogs 原盤年（Willisau 1974、Bath of Surprise 1980、Company 1 1977、
  Ear of Beholder 1971）；Diamond Express 記美國 Arista/Freedom 首發 1977、廠牌欄記製作方 Freedom（第 85 條）。
- **釘不住 MB 而未收**：Brotherhood of Breath《Procession》、Isipingo《Family Affair》、Voice《Voice》、Nicra、Mark Charig《Pipedream》、
  Coxhill《Diverse》、Watts《Cynosure》、Amalgam《Innovation》《Wipe Out》《Closer to You》、Osborne《Marcel's Muse》、
  Elton Dean《The Bologna Tape》、Riley《Synopsis》《Shaped》《Intertwine》《The Other Side》、Mick Pyne、Eddie Prévost Band《Now Here This Then》、
  Tubby Hayes《A Tribute: Tubbs》、Rendell《Earth Music》《Live at the Avgarde Gallery》、Stevens《Application Interaction And...》、
  Tracey《The Bracknell Connection》《Salisbury Suite》、Westbrook《The Westbrook Blake》《Piano》、《Facets》、Bead 的 Milk Teeth／
  Fire Without Bricks／Cholagogues／Still Outside／Fonetiks／Bird Jumps Into Wood、Minton & Turner《Ammo》、Nicols & Nu、Bobby Wellins 兩張、
  Company 5／7（《Epiphany》primary-type null）。自我同名且 Apple 查無而不收：Iskra 1903、Ovary Lodge、Tony Oxley（Incus 8）、Balance、
  Alterations、S.O.S.（MB 亦無實體）。Mike Taylor《Pendulum》《Trio》釘得住但為 1966–67，超出本批年限。
- **與池中撞卡而未收**：0 張；因藝人上限割捨：Derek Bailey 名下 Incus 各盤（含 Bailey/Coe《Time》）、SME《The Source》《Face to Face》。
- **資料齊全、純因名額割捨（可直接補批）**：Ogun 的《Alone at Wigmore Hall》《Blue Notes in Concert》《Bracknell Breakdown》
  《In Conference》《The Cheque Is in the Mail》《The Longest Night Vol. 1》《The Joy of Paranoia》《Memories of Bacares》《Home From Home》；
  Mosaic《Krark》《New Conditions》；Incus《At the Unity Theatre》《Statements V-XI》；Bead《Marsh Gas》《Chamberpot》；
  Spotlite《Thames Suite》《Kandeen Love Song》；Impetus《Backwards and Forwards》；以及一整條**大廠英國爵士線 1969–72**
  （Rendell/Carr《Change Is》《Live》、Harriott & D'Silva《Hum Dono》、D'Silva《Integration》、Garrick《Troppo》《Home Stretch Blues》
  《The Heart Is a Lotus》、Winstone《Edge of Time》、Ardley《Kaleidoscope of Rainbows》《A Symphony of Amaranths》、Beck《Gyroscope》、
  Ricotti《Our Point of View》、Surman《How Many Clouds》《Tales of the Algonquin》、Skidmore《TCB》、Beckett《Flare Up》《Warm Smiles》、
  Downes《Electric City》《Diversions》、Russell《Rites and Rituals》、Gibbs《Tanglewood 63》、Westbrook《Metropolis》《Citadel/Room 315》
  《The Cortège》、Keith Tippett Group《Dedicated to You…》、Tippett《Blueprint》、Elastic Rock、Solar Plexus）——全部 MB 釘得住、
  多數 CAA 有圖且有 Vocalion／BGO／Esoteric／Jazzman 的 Official 再發，足以獨立成一批。
- **飽和度**：還很空——45 張收進去後，同場景仍有 40 張以上釘得住的候選。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（照 §0.8 錨點制、`manual:depth-rubric`）、頂點資格評估、封面、簡介、
  固定試聽、Firestore／KV／`seed_cards.json` 寫入。
