## 2026-09-04 — dip-vinyl-shop — c-77 策展提案（深掘：英國 DIY post-punk 與卡帶文化 1978–84）

- **改動摘要**：新增 `batch-progress/c77/prop-a.json`（21 張）與 `batch-progress/c77/prop-b.json`（22 張），
  合計 **43 張、39 位藝人**，`lineType: 深掘`。
  - **a 組＝自壓與獨立小廠的黑膠 LP（1978–82）**：曼徹斯特 Object Music 4 張（Spherical Objects、
    The Passage、Grow-Up、Indiscreet Music）、New Hormones 2 張（Ludus、The Diagram Brothers）、
    萊斯特 Mole Embalming 2 張（The Deep Freeze Mice）、其餘為一兩張就收攤的自營廠牌與郵購小廠
    （Fuck Off Records、NB Records、Drömm、Bugle、Small Wonder、United Dairies、Deptford Fun City、
    Woof、Fresh／Red、Y Records、無廠牌的 L. Voag），加 1 張 §5.6 場景合輯（雪菲爾《Bouquet of Steel》）。
  - **b 組＝卡帶廠牌與郵購網絡（1980–84）**：赫爾 YHR Tapes 4 張（Andrew Cox ×2、MFH、Paul Nagle）、
    In Phaze 4 張（Legendary Pink Dots ×2、Portion Control、The Living Daylights）、
    Recloose Organisation 2 張（Bourbonese Qualk、Muslimgauze）、Attrition 自營卡帶與 Third Mind 各 1 張，
    其餘為 Snatch Tapes、Sterile、Industrial Records 的 IRC 卡帶、United Dairies、Cause For Concern、
    Le Rey、A-Mission、Red Rhino、Initial Recording Company。
  - 刻意避開 c-74 已收的 1980s indie pop 微廠線（Sarah／él／Creation／Ron Johnson／In Tape／
    Midnight Music／Pop Aural）與 Rough Trade／*Messthetics*／近年復刻熱潮反覆挑走的那批
    （Desperate Bicycles、Swell Maps、Young Marble Giants、This Heat、Television Personalities）；
    池中已有 3 張的 Crass、Whitehouse、Nurse With Wound、Coil、Current 93 一律不碰。
- **主要檔案**：`batch-progress/c77/prop-a.json`、`batch-progress/c77/prop-b.json`、
  `batch-progress/c77/chk-prop.mjs`（自 c76 複製、批次名已改 c77）、
  `batch-progress/memory-entries/c77-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c77/chk-prop.mjs` → 43 張、39 位、**標記 0**；
  串跑的 `dedup-crossbatch.mjs` → **29 批（其中 3 批讀 prop）、卡數 1448、跨批撞卡 0**。
  43 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`
  確認 `primary-type=Album`、標題、artist-credit 與轄下 release（第 41 條）；藝人 browse 一律走
  `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）。
  以**盤名為主鍵**掃 `seed_cards.json` 全 13,913 列（第 71 條）→ 2 個標記，逐筆核對皆為誤報
  （Arcade Fire《The Suburbs》、Monk 與 Bregović 的《Underground》）；
  掛名去定冠詞、去 Discogs 消歧義編號後再掃一次 → 2 個標記，皆為已知（`Various Artists` 依第 72 條不計上限、
  `Clock DVA` 池中 1 張＋本批 1 張未達上限）。
- **本次下的裁定**（詳見兩份 prop 的 `risk` 欄）：
  1. **`:zoviet*france:` 改掛 `Zoviet France`**——c-65（先到）已用後者收《Mohnomishe》，
     照 MB 實體名收會製造分裂鍵（第 29／49／115 條），依先到先得（第 119 條）統一寫法。
  2. **與 c-65 撞卡的兩張剔除**：《Mohnomishe》與 The New Blockaders《Changez les Blockeurs》，
     依第 119 條先到先得，改補 Hula《Cut From Inside》與 Danielle Dax《Pop-Eyes》。
  3. **年份與 MB 脫鉤四張**，皆依第 86／95／127 條採有來源直接寫出的年份、並禁止行文斷言發行年：
     L. Voag《The Way Out》1979（MB 記 1980）、Alternative TV 1979（MB 記 1978）、
     Storm Bugs《A Safe Substitute》1980（MB 只建 2011 年 Harbinger 再發那一筆）、
     Nocturnal Emissions 一線的年份以 Discogs 原盤為準。
  4. **盤名取捨**：Indiscreet Music 保留原盤錯拼《Dubious Collaberations》（第 50 條，沒有再發訂正過它，
     不適用第 117 條）；The Cravats 取原盤《In Toytown》而非再發的《The Cravats in Toytown》；
     Attrition 取原捲《Death House》而非再發的《...This Death House》；
     Alternative TV 取原盤的括號全名《Vibing Up the Senile Man (Part One)》。
  5. **合輯只收 1 張**（第 84／72 條）：《Bouquet of Steel》(1980)，走 §5.6，年份取編輯版本首度問世年。
  6. **二合一套裝一律不釘**（第 129 條）：Spherical Objects、The Passage、Grow-Up、Ludus ×3、
     Metgumbnerbone、Zoviet France 的 2008／2019／2020 併輯，共 8 組已在 `mbNote` 明寫「刻意不釘」。
  7. **未授權再發三筆已標明不算背書**（第 43 條）：Metabolist 的 2017 墨西哥 EOS-443、
     Storm Bugs 的 2022 Rodent Tapes 數位版、Clock DVA 的 1980 德國 Not On Label。
- **封面與試聽實測**：CAA release-group front **34/43（79%）**，探測錯誤 0
  （Clock DVA 首測回 500、重測兩次皆 200，依第 28／98 條記為 200）；
  Apple 專輯命中 **19/43（44%）**，**19 個命中全部在 `gb`**，`us`／`de`／`nl`／`fr`／`be`／`ca`／`au`／`jp`
  八個 storefront 零命中——第 75 條再次成立，英國 DIY 與卡帶目錄的再發權在英國廠牌手上。
  **封面與試聽兩頭皆空 4 張**（全在 a 組）：Grow-Up《The Best Thing》、
  The Door and the Window《Detailed Twang》、Metabolist《Hansten Klork》、The Lines《Therapy》，
  本機要依 §4 順序改由 Bandcamp／Spotify 解析，解不出來就留置。
  **一筆 Apple 誤配已在卡層擋掉**（第 124 條的形狀）：The New Blockaders 會配到
  Nurse With Wound 的《Nww Play 'changez Les Blockeurs'`》——該卡已因與 c-65 撞卡剔除，記錄留著供後續批次參考。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際下載、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json`／`apex_pool.json` 寫入。
