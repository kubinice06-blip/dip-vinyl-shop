## 2026-09-03 — dip-vinyl-shop — c-69 策展提案（深掘：美國私壓 SSW 與 loner folk 二線 1968–80）

- **改動摘要**：新增 `batch-progress/c69/prop-a.json`（20 張）與 `batch-progress/c69/prop-b.json`（18 張），
  合計 **38 張、34 位藝人**（Michael Yonkers、Terry Allen 各 2 張同組；Jim Spencer、Will Beeley 各跨 a／b 組 2 張），
  `lineType: 深掘`，合輯 0 張。
  - a 組＝1968–73：ESP／Straight／Skye／Sundown／Vanguard／Tumbleweed 這類小廠盤 8 張、自壓盤 12 張
    （Dave Bixby、Mistress Mary、Deerfield、Vernon Wray、Dennis the Fox、Maitreya Kali、
    Will Beeley、Jim Spencer、Tom Nehls、Bill Madison、Sandy Harless、Collie Ryan；Caroline Peyton 的 Bar-B-Q 與 Dennis the Fox 的 MusArt 是地方小廠；Bill Wilson 是 Columbia 商業失敗盤，走第 47 條）。
  - b 組＝1974–80：自壓與自營廠牌盤 17 張（Yonkers ×2、Grudzien、Spencer、Terry Allen ×2、Brigman、Folsom、
    Villemonte、Gary Wilson、Jimmy Carter and Dallas County Green、Saucedo、Emerson、Beeley、Tree People、Wachs、Crandell、Kenny Knight）。
  - 挖掘路徑：Numero《Wayfaring Strangers》四張合輯（Lonesome Heroes／Ladies From the Canyon／Guitar Soli／Cosmic American Music）
    逐軌回查原盤 16 張命中；再發廠牌 Numero 7、Tompkins Square 4、Light in the Attic 3、Paradise of Bachelors 3、Guerssen 3、
    Sebastian Speaks 2、Now-Again／Future Days／Anthology／De Stijl／Companion／Sundazed／Omnivore／Drag City／Gear Fab／
    Modern Harmonic／Motel／Anopheles／Subliminal Sounds／Yoga／Secret Seven 各 1；Maitreya Kali 零授權再發，改以 Mike Stax 的傳記舉證（第 43／82 條）。
- **主要檔案**：`batch-progress/c69/prop-a.json`、`batch-progress/c69/prop-b.json`、`batch-progress/memory-entries/c69-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c69/chk-prop.mjs a b` → 38 張、34 位、**標記 0**（含跨批去重 15 批 665 張 0 撞）。
  38 張全部釘住 release-group MBID 並逐一回問 `release-group/<id>?inc=releases` 確認 primary-type=Album 與標題（第 41 條）；
  對照組（Apache / Inca 合輯、Still Dreamin' Wild、The Rainbow Records 套裝、Jungle Rot 併輯、Garden of Love）皆在 `mbNote` 明寫刻意不釘。
  `seed_cards.json` 全 13,913 列實掃：34 位藝人皆 0 張；原候選 Shira Small《The Line of Time and the Plane of Now》已在池中、
  Kathy Heideman 與 Willie Wright 亦已在池，全部剔除（第 27 條第六次應驗）。
  年份與 MB 脫鉤 9 張（MB 只建再發或年份無佐證，依第 95／127 條取 Discogs 原盤年，`risk` 已標）；
  Discogs 版本頁逐張看過授權狀態，未授權再發一律不採為背書（第 43／57／65／66 條）。
  Apple 抽驗 38 張：34 張查得到條目（其中 12 張配到含額外曲的重製版，本機要看版本）、4 張查無
  （Deerfield、Vernon Wray、Goodby Sunball、Gallivantin'）；兩張自我同名卡（Bob Frank、The Tree People）皆完全相等才收。
- **未收清單**：Jeff Cowell《Lucky Strikes and Liquid Gold》（MB primary-type null，第 118 條）；
  Stephen David Heitkotter《Heitkotter》（自我同名、Apple 只有再發改名的《Black Orchid》）；
  Jerry Solomon《Past the 20th Century》、Ilene Rappaport、Chuck & Mary Perrin、Emily Bindiger、Angel Oak、Jim Schoenfeld、
  George Cromarty、Dana Westover（MB 查無）；Pisces、Elyse Weinberg《Greasepaint Smile》、Timmothy、Bruce Langhorne、
  Ed Askew《Little Eyes》、Mark Fosson（原盤未發行或首發年在 2000 年後）；Harvest Flight、Arthur Lee Harper、Plain Jane、
  Kathy Smith、Linda Cohen、Jack Hardy、William Eaton、Doug Firebaugh、Black Canyon Gang、Dan Pavlides、Ethel Ann Powell、
  Becky Severson、Jim Ransom（無授權再發或只有 Fallout／Big Pink 類再發）；Bob Carpenter、Willie Dunn（加拿大）、
  Mark Fry、Gary Farr、Tucker Zimmerman（英國盤）；Lewis《L'Amour》（1983，超出年限）。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`；
  零串流再發的 Maitreya Kali、Goodby Sunball、Gallivantin'、Deerfield、Vernon Wray 是冷門軸 5 分候選）、
  頂點資格評估、封面、簡介、固定試聽、Firestore／KV／`seed_cards.json` 寫入。
