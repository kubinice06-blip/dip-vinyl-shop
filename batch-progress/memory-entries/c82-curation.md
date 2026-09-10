## 2026-09-04 — dip-vinyl-shop — c-82 策展提案（深掘：日本 1990s 地下 techno／ambient 廠牌）

- **改動摘要**：新增 `batch-progress/c82/prop-a.json`（20 張）與 `batch-progress/c82/prop-b.json`（25 張），
  合計 **45 張、40 位藝人**，`lineType: 深掘`，年份 1994–2001，**合輯 0 張、EP 0 張**。
  簡報列的五家（Sublime、Frogman、Transonic、Reel Musiq、Syzygy）當起點，往外挖到 Music Mine（Sublime 的
  日本發行母體）、Soup-Disk、Zero Gravity（Transonic 的 ZGV 支線）與 細野晴臣 的 Daisyworld Discs，
  九家廠牌的分佈是：Zero Gravity 11、Transonic 10、Frogman 5、Soup-Disk 5、Sublime 4、Syzygy 4、
  Daisyworld 3、Music Mine 2、Reel Musiq 1。
  - **a 組＝techno／electro／breaks 側**（20 張、19 位）：Sublime／Reel Musiq／Music Mine 這條互相搭橋的
    編號線 7 張（Yoshihiro Sawasaki、AKIO / OKIHIDE、Dan Curtin、Max Brennan、Co-Fusion、Captain Funk、
    Blind Light）、Syzygy 4 張（Web、Okihide、Ura Ura、Takayuki Shiraishi）、Frogman 5 張、Soup-Disk 4 張。
  - **b 組＝ambient／experimental 側**（25 張、21 位）：Transonic 創始年那批 TRS-250xx 起頭，
    接 Zero Gravity 的 ZGV-001 到 ZGV-026 整條支線（本組 11 張），再接 Soup-Disk 與 Daisyworld 各兩三張，
    以 ZGV 的最後一號 Toshimaru Nakamura《No-Input Mixing Board》（2000）收尾。
- **主要檔案**：`batch-progress/c82/prop-a.json`、`batch-progress/c82/prop-b.json`、
  `batch-progress/c82/chk-prop.mjs`（既有，批次名已為 c82）、
  `batch-progress/memory-entries/c82-curation.md`（本檔）。
- **驗證結果**：
  - `node batch-progress/c82/chk-prop.mjs` → 45 張、40 位、**標記 0**。
  - 串跑 `dedup-crossbatch.mjs` → **35 批（其中 4 批讀 prop）、1,677 張、跨批撞卡 0**；c82 以 prop 來源被納入。
  - 45 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>?inc=artist-credits+releases`
    確認 **primary-type=Album**、secondary-types 空、標題與 artist-credit（第 41 條）；探測錯誤 0。
  - **實掃 `seed_cards.json` 全檔（13,913 列）**：40 位候選藝人（日文卡三種寫法——假名／漢字／羅馬拼音——
    分別掃過）名下合計只有 1 張命中，即 Inoyama Land《Danzindan-Pojidon》（1983）；
    本批該掛名加 1 張，合計 2 張，在同一藝人上限 3 張內。其餘 39 位皆為 0。
  - **以盤名為主鍵掃全池**（第 71 條，掃描器加 `length>=4` 守衛，c-79 教訓）：完全相等 **2 筆**
    （Palomatic《Trill》↔ Bun B《Trill》2005、Suzukiski《Kamakura》↔ サザンオールスターズ《KAMAKURA》1985），
    逐筆人眼核對**皆為不同的碟，零撞卡**；子字串命中 22 筆，逐筆核對亦全數不同。
    《Am I》去符號後只有 3 字元、《Web》掛名只有 3 字元，兩者都落在 length>=4 守衛之外，
    撞卡判斷分別靠掛名與盤名的另一側完成，已寫進各自的 `risk`。
  - **封面實測**：CAA release-group front **21/45（47%）**，a 組 12/20、b 組 9/25，探測錯誤 0
    （Taichi《Am I》第一次回 500，重試後 200）。
  - **試聽實測**：Apple search 藝人＋盤名比對，**命中 19/45（42%）**，a 組 8/20、b 組 11/25，
    **19 個命中全部在 `jp` storefront，`us`／`gb` 零命中**——與 c-81 的美國批（28 個命中全在 `us`）
    正好相反，第 137 條（不帶 country 就是問美國店面）在這條線上是硬條件。
    另有 4 筆是**假命中**，已逐筆剔除並寫進該卡 `risk`：Web《Ivory Tower》→ Adept 的同名單曲、
    Co-Fusion《Co-fu》→ 續作《Co-Fu 2》、Quadra《Sketch From a Moment》→ 2016 年回顧合輯、
    Toshimaru Nakamura《No-Input Mixing Board》→ 另一張同系列的碟。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **Susumu Yokota 與 Ken Ishii 的別名一律不收**。池中實掃 Yokota 5 張、Ishii 3 張，兩位都已達或超過
     同一藝人上限；Sublime 與 Newstage 目錄裡的 Prism、Flare、Rising Sun、Yoga（Ishii）與 Ringo、
     Stevia、Anima Mundi（Yokota）是同一個人的別名，收了等於同一位在池中變成五到七張。
     **別名視同本人計數**——這是本批新立的判準，記在此處供後續批次沿用。
  2. **MB 的全大寫標題與掛名一律改回 Title Case**。日本 CD 目錄在 MB 上大量以全大寫登錄
     （《VIEW FROM THE EDGE》《TROPICAL SONGS gold》「MIND DESIGN」「TAMARU」），那是排版慣例不是名字本身，
     Discogs 與封面用的是 Title Case；大小寫在外部服務會被正規化（第 50／52 條）。MB 原字串一律填進 `queryAlias`。
  3. **非 ASCII 的連字號、短破折號與彎引號一律改 ASCII**：Co-Fusion 的 artist-credit 是「Co‐Fusion」（U+2010）、
     Interferon 的盤名是《SEANCE‐ROOM MUSIC》（U+2010）、Nina-Noho 掛名含 U+2010 而盤名
     《AMBIENT CLASSICS 1990–1992》含 U+2013、Mushroom Now! 的《TRAVELLER’S LIGHT》含 U+2019。
     `chk-prop.mjs` 對這一族符號有反模式檢查，卡片採 ASCII，MB 原字串填 `queryAlias`（沿用 c-81 第 6 條）。
  4. **Inoyama Land 採池中既有的兩字寫法**，不採 MB 實體的一字「INOYAMALAND」——池中已有該掛名 1 張，
     採同一寫法才數得到同一位藝人（第 139 條的正面應用）；MB 寫法填 `queryAlias`。
  5. **Masaaki Kikuchi 採 MB 的羅馬拼音**，不採漢字——Apple 日本店面寫「菊池雅晃」、Discogs 的 Soup-Disk
     條目寫「菊地雅晃」，**兩種漢字互相打架**（池／地），哪一種是正字沒有來源可判，兩種都填 `queryAlias`
     並在 `risk` 明令行文不得斷言。
  6. **松前公高 與 永田一直 採 MB 實體的漢字**（第 6／120 條），羅馬拼音填 `queryAlias`。
     松前公高 是第 139 條的教科書實例：以「Kimitaka Matsumae」下 release-group 搜尋，
     藝人與作品**兩個方向都回乾淨的 count=0、不回錯誤碼**，差點整位漏掉；改用漢字才命中。
     這一位是靠「以廠牌反查」（`release?query=label:"Transonic"&limit=100`）撈回來的——
     **一支 label 查詢一次回四十七個 release-group，比逐張猜掛名快、而且不會被拼寫擋住**，
     本批 b 組幾乎全部由這個方法產出，建議後續日本／非拉丁批照做。
  7. **年份一律採 MB 的 first-release-date**，唯一需要說明的是 HAT《Tokyo - Frankfurt - New York》：
     MB 轄下 1996-05-29 是德國 release、1996-12-21 才是日本 Daisyworld 那筆，兩者同年，卡片取 1996，
     並在 `risk` 明令行文不得把它寫成日本原盤。
  8. **兩張逾 2000 年的碟仍然收**（Hirofumi Goto《Geo Rhythm》2001、Toshimaru Nakamura
     《No-Input Mixing Board》2000），理由是它們各自是 Frogman 專輯線與 Zero Gravity 編號線的收尾位置；
     兩張的 `risk` 都明令行文不得把它們寫成 1990 年代的碟。
- **釘不住 MB 而未收**（六張，皆為 `release-group?query=release:"…" AND artist:"…"` 兩個方向 count=0，
  且已排除 503／403／分頁上限／回傳無關結果四種假象；**可進補遺批走 §1 人工身分路線**）：
  - Drawing Future Life《Spill-over LP》（1994，Syzygy SZY003LP，Discogs release 400520）
  - Atsutoshi Hirayama《Borderline LP》（1995，Syzygy SZY004LP，Discogs release 349194）
  - Arcars《The Surface Of Muclique》（1997，Syzygy SZY010CD，Discogs release 806961）
  - Sammansa《I'm Sweet》（1997，Syzygy SZY013CD，Discogs release 282104）
  - Ryo Arai《Again》（1996，Frogman frog 003cd，Discogs release 315362）——與本批收錄的 Riow Arai
    是**不同的掛名字串**，兩種寫法都查過、都是 count=0
  - The Anazaworld《Musicalcio Kick Off !!》（1998，Frogman frog 011cd，Discogs release 1079409）
- **MB 上有條目但型別不合而未收**（三張）：
  - Tanzmuzik《Version Citie Hi-Lights》（1998，Sublime SBLCD5027UK）——MB release-group
    4b7cb436-bc0a-35dc-9cc1-e417942b6b6d 的 **primary-type 是 null**，不符 §1 的 Album 硬要求。
  - Kitta《14 Compositions of New Jazz》（1998，Soup-Disk SOUP 008 CD）——同上，
    release-group e7792176-1e19-355a-be3d-64a4d22d31dd 的 primary-type 是 null。
  - Kagami《The Repaired Sequencer》（2000，Frogman FROG-017CD）——MB 登記 Album，
    但 Discogs 該筆標「CD, MiniAlbum, Mixed」，**兩個資料庫的型別互相矛盾**（第 127 條的形狀：
    兩邊各有具體記載且衝突，不是「有」換掉「無」），本批不收，並在 Kagami《The Broken Sequencer》
    的 `mbNote` 明寫它是刻意不釘的對照組（盤名只差一個字）。
- **與池中撞卡而未收**：**0 張**。池中沒有任何一張本批候選的碟；被排除的只有藝人上限那一類
  （Susumu Yokota 5 張、Ken Ishii 3 張，及其別名，見裁定 1），不是盤名撞卡。
- **場景飽和度判斷**：**這個場景在池中幾乎是空的。** 池中與這條線相關的只有 Susumu Yokota 5 張、
  Ken Ishii 3 張、Rei Harakami 5 張、電気グルーヴ 9 張、Ryoji Ikeda 10 張這五個「已經出海」的名字，
  而他們所在的九家廠牌（Sublime、Frogman、Transonic、Syzygy、Zero Gravity、Soup-Disk、Reel Musiq、
  Music Mine、Daisyworld）**在池中一張別的碟都沒有**；本批交的 45 張全部是這些目錄裡的第一張。
  同期還有 Newstage、Trigger、Amoebic 三條線沒有動（Newstage 的可收名單被別名規則吃掉，
  Amoebic 偏向即興／onkyo 一側，與本批的 techno／ambient 定位不同），**這個場景還很空**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
