## 2026-09-03 — dip-vinyl-shop — c-68 策展提案（深掘：英國私壓與小廠 prog／psych 1969–75）

- **改動摘要**：`batch-progress/c68/prop-a.json`（9 張）與 `batch-progress/c68/prop-b.json`（36 張），
  合計 **45 張、45 位藝人**，`lineType: 深掘`。本批由兩支代理接力完成（第一支被容器重啟殺掉，
  留下 a 組 9 張、b 組 24 張；第二支接續補 b 組 12 張，未覆寫既有定案）。
  - a 組＝私壓與客製壓片：Deroy（Complex、Parameter）、SRT（Grannie）、Holyground（Bill Nelson、
    Lightyears Away / Thundermother）、Sindelfingen、Bodkin、Oberon、Cirkus。
  - b 組＝小廠：Deram Nova 6、Vertigo swirl 冷門 5（Cressida、Tudor Lodge、Clear Blue Sky、Dr. Z、Catapilla）、
    Dawn 4、Neon 4、Middle Earth 2、Morgan Blue Town 2、Youngblood 2、Pegasus 2、
    Nepentha／Evolution／Penny Farthing／Windmill／Mushroom／Stable／Head／Decca Nova／B&C 各 1。
    自我同名卡 12 張，每張都已在 Apple 查到條目。
  - 合輯 0 張。年份與 MB 脫鉤的卡：Black Cat Bones 採 Discogs 原盤 1970（MB 1969-11，第 127 條）、
    Steel Mill 採德國首發 1972（英國版 1975）、Sam Gopal 採 1969（1968 為 promo 白標）。
- **主要檔案**：`batch-progress/c68/prop-a.json`、`batch-progress/c68/prop-b.json`、
  `batch-progress/memory-entries/c68-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c68/chk-prop.mjs a b` → 45 張、45 位、**標記 0**（含跨批去重 17 批 749 張零撞卡）。
  45 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>` 確認 primary-type=Album 與標題（第 41 條）；
  對照組（EP、單曲、二合一、改題再發）在 `mbNote` 明寫刻意不釘。45 位藝人在 `seed_cards.json` 全 13,913 列實掃下皆零張。
  c-60 已收的 Dark、Fresh Maggots、Jan Dukes de Grey 未重收。
- **未收清單**：
  - 自我同名且 Apple 查無（簡報第二節）：Tonton Macoute、Spring、Czar、Leviathan、Gracious!（1970）、Complex《Complex》（1971 首張）、Affinity（Apple 只有 55 軌合集）。
  - 池中已有：Stone Angel、Ithaca、Agincourt、Simon Finn、Forest、Trees、Comus、Dando Shaft、Mellow Candle、Trader Horne、Spirogyra。
  - 再發全屬未授權或可疑（第 43／78 條）：Candida Pax《Day》（Deroy 1971，MB 釘得住、CAA 有圖，但唯一再發是 Shadoks）。
  - 原盤當年未出版、只有考古首發（無原盤年）：Please、Iron Claw。
  - 大廠或範圍外未收：Black Widow（CBS）、High Tide（Liberty）、Skin Alley（CBS）、Hard Meat（WB）、Ellis（Epic）、
    Gnidrolog（RCA）、Tea & Symphony（Harvest）、T2（Decca 主線）、Quintessence（Island）；Jonesy《No Alternative》（Dawn，MB 666808cf、Apple 有）為額度外備選。
  - 釘不住 MB 而未收：無（本批候選全部釘得住）。
- **封面與試聽預估**：新補 12 張 CAA 全部回 307；全批 45 張只有 a 組 Complex 與 Parameter 兩張 CAA 404，要靠 Bandcamp／掃圖，其餘 43 張 CAA 有圖。
  試聽：Apple 查無的 8 張（Complex、Sindelfingen、Oberon、Lightyears Away / Thundermother、Parameter、Steel Mill、Second Hand、Room），其餘 37 張預估可得（Catapilla、Fuchsia 只有 gb storefront）。
- **場景飽和度**：英國小廠端（Vertigo／Dawn／Neon／Pegasus／Deram Nova）這批收完後已接近飽和，剩下的多是大廠或自我同名查無；
  私壓端（Deroy／SRT／Holyground 目錄裡的 Moths、Motiffe、Pepper、Jumble Lane 等）還很空，但受限於再發授權與 MB 建檔，能收的不多。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（§0.8 錨點制、`manual:depth-rubric`）、頂點資格評估、封面、簡介、
  固定試聽、Firestore／KV／`seed_cards.json` 寫入。**不動 git。**
