## 2026-09-03 — dip-vinyl-shop — c-72 策展提案（深掘：美國耶穌搖滾與 Xian 私壓 1969–80）

- **改動摘要**：`batch-progress/c72/prop-a.json` 由 17 張補到 **19 張**（1969–74），
  新增 `batch-progress/c72/prop-b.json` **23 張**（1975–80），合計 **42 張、31 位藝人**，`lineType: 深掘`。
  - 這是續跑：前一支代理撞 API 額度上限中止，已定案的 17 張全部保留、未覆寫。
  - a 組＝耶穌運動的第一波自壓與客壓（Century／Voice of Elijah／Mark／Renrut／Elco／Destiny／NRS／
    Discovery／American Artists／Rock the World、New Song、Good News、One Way、Myrrh 早期）。
  - b 組＝1975–80 的教會廠牌與藝人自營廠牌（Maranatha! 4、Solid Rock 4、Good News 2、Light 1、
    Myrrh 2、Star Song 1、Birdwing 1、Messianic 1、Pomegranate 1、Pure Joy 1、Chrism 1、
    Tunesmith 1、Palmfrond 1、Seed 1）。
- **本次的裁定**（依 2026-09-02 下放，寫檔即算定案）：
  1. **Petra 收兩張**。共用簡報的排除清單指的是「Word 主線的大廠盤」；1974 年首作與 1977 年
     《Come and Join Us》是 Myrrh 1970 年代賣不動的搖滾盤，屬 §0.8 錨點 3 的形狀，收；
     1980 年代之後的 CCM 正典不收。Larry Norman 同理：Capitol／MGM 盤不收，自營 One Way 與
     Solid Rock 的兩張收。
  2. **改收 Wilson McKinley《On Stage》（1970）**。前一支代理在《Spirit of Elijah》卡裡寫
     「本批不收／刻意不釘」，本次改收為獨立一卡（Rite Record Productions 客壓、無廠牌無編號，
     形狀比 1971 那張更純），並同步把該卡的 `risk`／`mbNote` 敘述改成「同批另收、各自釘各自的
     release-group」——這是本次唯一動到已定案張的地方。
  3. **自我同名照第 90 條硬判**：Chuck Girard《Chuck Girard》（Apple 362432113）與
     Gentle Faith《Gentle Faith》（716170525）標題與藝人名完全相等，收；
     Daniel Amos 同名首作在 Apple 只有《…(30th Anniversary Edition)》《…(Collector's Edition)》
     兩個帶副標的條目，不相等，**不收**，改收《Shotgun Angel》。
     The Exkursions 同名盤在 Apple 只有《The Exkursions - Legends Remastered, Vol. 3》，同樣不收。
  4. **Sweet Comfort Band 的掛名取 MB 實體**（第 6／70 條）：原盤封面與 Discogs 寫「Sweet Comfort」，
     MB 與 Apple 用「Sweet Comfort Band」，卡片取後者、盤名維持《Sweet Comfort》，
     Discogs 寫法填進 `queryAlias`。
  5. **年份分歧兩筆自己定**：Bob Ayala《Joy by Surprise》取原盤 Pure Joy 版的 1976（MB 的
     1977-06 是 Myrrh 再發日）；Mustard Seed Faith《Sail On Sailor》與 Sweet Comfort《Sweet Comfort》
     的 MB release-group 未填日期，年份取 Discogs master（1975／1977）。依第 91 條，
     rgMbid 是身分鍵不是年份來源。
  6. **The Christ Tree 的曲風只留 folk**。原本標了 folk＋world，但「東方樂器」的說法手上沒有可查證
     來源，且共用簡報明令不得為了宗教性硬標 world，收回。
  7. **合輯 0 張**，`releaseType` 全為 Album，無 §5.5／§5.6 例外卡。
- **主要檔案**：`batch-progress/c72/prop-a.json`、`batch-progress/c72/prop-b.json`、
  `batch-progress/memory-entries/c72-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c72/chk-prop.mjs a b` → a 19 張 17 位、b 23 張 19 位、
  合計 42 張 31 位、**標記 0**，跨批去重 0。
  42 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`
  確認 `primary-type=Album`、標題、artist-credit 與 release 的 status（第 41 條）；
  合輯、現場、雙專輯 CD 等對照組 MBID 在 `mbNote` 逐筆註明「刻意不釘」（第 99／126 條）。
  另以 `seed_cards.json` 全 13,913 列實掃 31 位藝人，池中命中只有字串同名的
  英國 trip-hop 團 Lamb（1996 年同名專輯），與本批的彌賽亞猶太組合 Lamb
  （MBID d0cd81a5-0d64-404e-9bd3-932c019694b3）是兩個實體，已寫進該卡 `risk`。
  手動比對 c67–c86 其他 10 個 `prop-*.json`，撞卡 0、同藝人 0。
- **未收清單（釘不住 MB 或不符門檻）**：
  - Randy Stonehill《Born Twice》（1971）——MB 只有 2021 年《Born Twice [Deluxe]》，`primary-type` 為 null。
  - Daniel Amos《Daniel Amos》（1976）、The Exkursions《The Exkursions》（1971）——自我同名，Apple 無標題相等的條目。
  - Barnabas——MB 名下最早是 1982 年《Find Your Heart a Home》，超出 1969–80。
  - Karen Lafferty、Danny Taylor、John Fischer、Ken Medema、Selah、Country Faith、Sheep、
    The Sons of Thunder、Bright Morning Star、Ark《Voyages》、Dogwood《After the Flood, Before the Fire》、
    Erick Nelson、Bethlehem、Pantano-Salsbury、Joy《Beginnings》——MB 上查無可釘的 release-group
    （或 0 個 release-group），依共用簡報這 20 批不開 §1 人工身分路線，不收。
  - Children of the Day——MB 名下只有 1975 年的耶誕專輯，不收。
  - Parable《Illustrations》《More Than Words》——MB 三筆 release-group 全無 first-release-date，
    年份釘不住，不收。
  - Fraction《Moon Blood》——池中已有，不重收（實掃結果，也是這個場景原本在池中的唯一一張）。
- **因規則排除**：Larry Norman 的 Capitol／MGM 盤、Glass Harp 的 Decca 盤、Petra 1980 年代之後的 Word 主線；
  英國與北歐的 Malcolm & Alwyn、Caedmon、Water into Wine Band、Jerusalem。
- **封面與試聽預估**：42 張裡 Apple 上有把握取到原盤數位條目的約 15 張
  （Maranatha!／Solid Rock／Myrrh／Light 這幾條線的再發最完整）；
  純自壓與客壓的約 12 張預估 `unavailable`（最可能被留置的是 Wilson McKinley《On Stage》、
  Hope of Glory 兩張、Trees Community《The Christ Tree》、Fireworks《Shatter the Darkness》、
  Paul Clark《Aim for the Heart》）。封面方面 Discogs 幾乎都有原盤掃圖，但 CAA 命中率預估偏低，
  本機探測時要有一批要走 Apple 封面路線。
- **地位證據最薄、可優先砍的兩張**：Fireworks《Shatter the Darkness》（無任何再發）、
  Hope of Glory《Under the Spout Where the Glory Comes Out》（無任何再發），兩卡的 `risk` 已寫明。
- **場景飽和度**：這個場景在池中原本只有 Fraction《Moon Blood》一張，等於整片為零；
  本批的 42 張把 1969–80 的主幹（Calvary Chapel／Maranatha!、Solid Rock、JPUSA、Love Inn、
  地方教會客壓）鋪出來之後仍遠談不上飽和，1981–85 的 Xian 私壓與 Xian metal／synth 那一段完全沒碰。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity、頂點資格評估、封面、簡介、固定試聽、
  Firestore／KV／`seed_cards.json` 寫入。本次未動 git。
