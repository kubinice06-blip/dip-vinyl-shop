## 2026-09-04 — dip-vinyl-shop — c-85 策展提案（深掘：英國 lovers rock／UK roots 小廠 1975–88 與 1990s UK dub 小廠）

- **改動摘要**：新增 `batch-progress/c85/prop-a.json`（22 張）與 `batch-progress/c85/prop-b.json`（23 張），
  合計 **45 張、43 位藝人**，`lineType: 深掘`，年份 1975–1999。
  本批沿用 c-81／c-83 的「B 面」概念——**避開這些廠牌的代表作與正典側**：
  Ariwa 只取歌手盤（不取 Mad Professor 的《Dub Me Crazy》系列，池中已有第一張）、
  On-U Sound 只取 Revolutionary Dub Warriors 與 Audio Active（不取 African Head Charge／Dub Syndicate，
  池中已有 African Head Charge《My Life in a Hole in the Ground》）、
  Jah Shaka 只取他自營廠牌替**別人**出的盤（不取他本人的《Commandments of Dub》系列，池中已有一張）。
  - **a 組＝lovers rock 與 UK roots 小廠 1975–88（22 張、22 位）**：
    Burning Sounds 5（Leroy Smart、Mystic Eyes、Jimmy Riley、Phil Pratt、Al Campbell）、
    Cha Cha 3（Earth & Stone、The Overnight Players、Johnny Osbourne）、
    Third World Records 3（Prince Jazzbo、Owen Gray、Jah Stitch）、
    Ariwa 2（Johnny Clarke、Ranking Ann）、Studio 16 2（Winston Edwards & Blackbeard、The Well Pack Band）、
    Ballistic 2（The Royals、The Force of Music）、
    Body Music 1（Sylvia Tella）、Vista Sounds 1（Count Ossie & The Rasta Family）、
    ADE.J 1（Jean Adebambo）、Special Request 1（Victor Romero Evans）、Venture Records 1（Tradition）。
  - **b 組＝1990s UK dub 小廠（23 張、21 位）**：
    Conscious Sounds 4（Bush Chemists ×2、King General、Centry）、Dubhead 4（Culture Freeman、The Disciples、
    Armagideon、Dub Ghecko）、Third Eye Music 3（Dayjah、The Rootsman ×2）、
    Universal Egg 3（Zion Train ×2、Jah Free）、Jah Warrior Records 2、On-U Sound 2、
    Jah Shaka Music 2（Dread & Fred、Willi Williams）、
    Alpha & Omega Records 1、Nubian Records 1、Youth Sound Records 1。
- **主要檔案**：`batch-progress/c85/prop-a.json`、`batch-progress/c85/prop-b.json`、
  `batch-progress/c85/chk-prop.mjs`（既有）、
  暫存腳本 `batch-progress/c85/{mb,lab,labs,lbl,lblrel,art,ent,ver,caa,apl,dg,dgs,dgb,scan,pool}-c85.mjs`、
  `batch-progress/memory-entries/c85-curation.md`（本檔）。
- **驗證結果**：
  - `node batch-progress/c85/chk-prop.mjs` → **45 張、43 位、標記 0**
    （43 位而非 45 位：The Bush Chemists 與 Zion Train 各兩張，兩組都是不同的碟）。
  - 串跑 `dedup-crossbatch.mjs` → **38 批（其中 4 批讀 prop）、1,842 張、跨批撞卡 0**；c85 以 prop 來源被納入。
  - 45 張全部釘住 release-group MBID 並**逐個回問** `release-group/<id>?inc=artist-credits+releases`
    確認 **primary-type=Album**、secondary-types 空、標題與 artist-credit（第 41 條）；探測錯誤 0。
  - **以盤名為主鍵掃全池**（第 71 條，掃描器加 `length>=4` 守衛）：**完全相等 2 筆**——
    Al Campbell《Diamonds》↔ Lil Peep《DIAMONDS》(2023)、Jean Adebambo《Feelings》↔ Stefano Torossi《Feelings》(1974)，
    逐筆人眼核對**皆為不同的碟，零撞卡**；兩筆都寫進該卡的 `risk`。
  - **掛名去 The 後完全相等 1 筆**：Johnny Osbourne（池中 2 張：《Truths and Rights》1980、《Water Pumping》1983），
    本批加的《In Nah Disco Style》(1981) 是**不同的碟**，依第 150 條藝人張數不構成排除理由。
  - **封面實測**：CAA release-group front **32/45（71%）**，a 組 15/22、b 組 17/23，無圖 13、探測錯誤 0。
    無圖的 13 張集中在只有一筆原盤 release、未見再發的碟（Owen Gray、Jean Adebambo、The Well Pack Band、
    Lidj Incorporated 等）。
  - **試聽實測**：Apple search 藝人＋盤名比對，四個 storefront（gb／us／jp／de）依序試——
    **24/45（53%）**，a 組 13/22、b 組 11/23，**24 個命中全部在 `gb`，`us`／`jp`／`de` 零命中**。
    與 c-83（英國微廠 29 個命中 28 個在 gb）方向一致，與 c-81（美國地下廠牌全在 us）相反：
    **下游 `probe-previews` 對本批一律以 `gb` 為主 storefront。**
    另有 **2 筆命中經人眼判定為假陽性、已從上列 24 剔除**：
    Jah Stitch 的命中是 50 軌的《Foundation Deejays: …》多碟合輯（collectionId 1798950864）、
    Tena Stelin 的命中是 2015 年的 6 軌 EP（該卡最終未收）。
  - **合輯 0 張**（`releaseType` 全為 Album，無 §5.6 卡、無 §5.5 EP）。
- **本批自下的裁定**（依 2026-09-02 店主下放，判準：有先例／可逆／卡住整條線）：
  1. **年份分歧時，Discogs 只有單一筆直記就保留 MB 值、把分歧寫進 `risk`**——
     Earth & Stone《Kool Roots》維持 MB 的 1978（Discogs 1445402 直記 1979、目錄號亦不同）、
     Dayjah & The Disciples《Storm Clouds》維持 MB 的 1995（Discogs 黑膠 TEMLP001 直記 1994）。
     依 c-83 第 3 點前例與第 141 條，**策展層不替它下結論**。
  2. **例外是 Centry《Thunder Mountain - A Dubwise Selection》取 1993 而非 MB 的 1995-02-24**——
     這一筆 Discogs（DNC002 黑膠）與 Apple（collectionId 87339801）**兩個獨立來源都直記 1993**，
     依第 127 條原盤年覆蓋 MB；廠牌欄同步依第 85 條取原始廠牌 Conscious Sounds（而非 1995 年 CD 的 Universal Egg）。
     盤名則依第 45 條取後來通行的《Thunder Mountain - A Dubwise Selection》，原盤寫法《In Dub: Thunder Mountain》
     填 `queryAlias`。**這張的年份與 rgMbid 的 first-release-date 刻意不一致，已在 `mbNote` 明寫**（第 91／95 條）。
  3. **掛名一律採 MB 藝人實體的寫法**（第 6／120 條），六處與 Discogs 分歧，另一種寫法全填進 `queryAlias`：
     **Phil Pratt**（Discogs 全作「Phill Pratt*」雙 l）、**Willi Williams**（Discogs 全作「Willie Williams*」雙 e，
     且同一人在同一家廠牌的 1993 年《See Me》上 MB 就寫成雙 e）、
     **Hughie Izachaar**（Discogs 作「Jah Warrior Presents Hughie Izachaar」）、
     **Tena Stelin／Prince Alla**（同型的「廠主 Presents 歌手」掛法，兩張最終未收）、
     **Dayjah & The Disciples**（Discogs 作「Dayjah Meets The Disciples (2)」）。
  4. **廠牌欄一律採原盤廠牌**（第 85 條）：Leroy Smart 記 Burning Sounds（非同內容的 Dread Hot 壓片）、
     Owen Gray 記 Third World（非同年的牙買加 Total Sounds 與加拿大 Monica's）、
     Winston Edwards & Blackbeard 記 Studio 16（MB 轄下唯一 release 的國別是 BE、Discogs 亦然，
     但廠牌是英國的 Studio 16；**行文不得寫成比利時盤**，已寫進 `risk`）。
  5. **非英國藝人只要原盤是英國小廠就收**：Audio Active（東京，On-U Sound ON-U CD 77）一張，
     依 c-83 第 9 點前例；`risk` 明寫國籍、**禁止行文寫成英國團體**。
  6. **`Blackbeard` 是 Dennis Bovell 的化名**，卡片採 MB／Discogs 的聯名字串「Winston Edwards & Blackbeard」，
     「Dennis Bovell」填進 `queryAlias`——池中沒有 Dennis Bovell 的卡，以本名查詢的下游會撈不到這張。
- **第 149 條（以廠牌反查 MB）本批全程適用，是這一批做得成的原因**：
  兩組都用 `release?query=label:"<廠牌名>"&limit=100` 開場，逐家把目錄整份撈下來再挑，
  藝人名查詢只用來補漏。實測 Ariwa count=222、Third World 51、Burning Sounds 73、Cha Cha 56、
  Jah Shaka Music 85、Twinkle 92、Universal Egg／Conscious Sounds／Dubhead／Third Eye Music 各 20–30——
  **雷鬼線的化名、綽號、前綴（Prince／King／Ranking／Jah）與拼寫變體多到用藝人名開場必然漏，用廠牌名就穩定。**
- **第 139 條（乾淨的零筆 ≠ 查無）本批中兩次**：
  - **`label:"Fashion Records"`** 的搜尋被瑞典金屬廠牌 **No Fashion Records** 整版洗掉（回 45 筆全是黑金屬）；
    改以 `label?query=` 取到英國 Fashion Records 的 MBID `fc10863a-5066-4724-9c47-a49740c6f790`
    再走 `release?label=<mbid>` 才看到真實目錄——**只有 4 個 Album 型 release-group**，
    該廠牌的 LP 產量本來就小，本批因此一張未收。
  - **King General**：LP 掛「King General Bucks Up Pon De Bush Chemists」（動詞句），7 吋與 10 吋只掛「King General」，
    以短掛名查 release-group 回 count=0。
- **釘不住 MB 而未收**（一般批不開 §1 人工身分路線，依簡報第一節記入清單，**可進補遺批**）：
  本批**無**此類——以廠牌反查開場的結果是所有候選都先看到 MB 的 release-group 才進候選池。
- **與池中撞卡而未收**：**0 筆**。實掃 `seed_cards.json` 全檔（14,424 列）確認——
  本場景在池中原本只有 12 張且全在正典側（Mad Professor《Dub Me Crazy》、Jah Shaka《Commandments of Dub》、
  African Head Charge《My Life in a Hole in the Ground》、Prince Far I《Under Heavy Manners》、
  Matumbi《Seven Seals》、Aswad《New Chapter》、Misty in Roots、Steel Pulse 3、Janet Kay、Carroll Thompson），
  本批 45 張與這 12 張零重疊。
- **查得到 MB、但依第 109 條「稀有度不是收碟理由」而未收**（寫不出分量依據）：
  Lloyd Coxsone《Presenting the Coxsone Affair》(1977, Tribes Man)——Discogs 全站只有一筆條目、無編號、無再發；
  Sergeant Pepper《Judgement Day》(1983, Ariwa ARI LP 006)；Honey Boy《Lovers》(1976, Third World TWLP 108)；
  Desi Roots《Children in Exile》(1982, Hawkeye HLP 009，後續版本只有一筆標 Unofficial 的 CDr)；
  Shorty the President《High Ranking》(1978, Live and Love LAP 007)；
  Hortense Ellis《Jamaica's First Lady Of Songs》(1977, Third World TWS 918)；
  Dean Fraser《Pure Horn》(1979, Cha Cha CHALP 006)；Cornell Campbell《Stalowatt》(1976, Third World TWS-301)。
- **版本或年份釘不住而未收**：
  **Keith Hudson《The Black Morphologist of Reggae》**——MB 記 1980、Discogs 上**兩筆條目都是 1983 且都標 Reissue**
  （Keja IGJ LP 001 與 Vista Sounds 同編號），原盤年與原廠牌都無法在策展層定下來（第 141 條）；
  **Demondo《Chalice Dub》**（1995, Reggae On Top ROTLP-006）——MB 掛 Demondo／盤名《Chalice Dub》，
  Discogs 的同一筆把掛名寫成「Chalice Dub」、盤名寫成《......Part One》，**藝人與盤名對調**，身分釘不住；
  **Black Slate《Sirens in the City》**（1981）——原盤是 Ensign（EMI 體系），**不屬本批的小廠形狀**。
- **釘住 MB、可收但因兩組配額（45 張上限）未收，留給後續批次**：
  Alpha & Omega《Everyday Life》(1993, A&O 093)、Dub Judah《Babylon Is A Trap》(1992, Dub Jockey DJLP 002)、
  Aisha《Daughters of Zion》(1993, Twinkle Music NG538)、Ism《Battered》(1999, Category One COLP001)、
  Extremadura《Pulses》(1996, Universal Egg WWLP018)、Prince Alla《Jah Children Gather Round》(1996, SHAKA 952)、
  Hughie Izachaar《Praise Jah - Vocals & Dub》(1996, Reggae On Top ROT-LP-009)、
  Tena Stelin《Lion Symbol》(1999, JWLP014)、The Rootsman《Into The Light》《52 Days To Timbuktu》《Realms of the Unseen》、
  Dayjah & The Disciples《Urban Jungle》(1997)、The Disciples《Part 2 - Addis Ababa》(1992)、
  Al Campbell《Rainy Days》(1978, Hawkeye HLP 003) 與《Loving Moods of Al Campbell》(1978, Ital IT 001)、
  Johnny Clarke《Give Thanks》(1985, Ariwa ARI LP 022)、Revolutionary Dub Warriors《Reaction Dub, Part 1》(1994)、
  Jah Shaka Music 的 Dub Salute 1–5 系列、Vista Sounds 的 Heptones／Floyd Lloyd／Michael Palmer 三張、
  Live and Love 的 Hugh Mundell《Jah Fire》與 Fatman Vrs. Shaka《In A Dub Conference》、
  Burning Sounds 的 Barrington Levy《Shine Eye Gal》《Don Carlos《Spread Out》《Pat Kelly《Lonely Man》。
- **本批全部 45 張都不填 `originalTrackCount`**（第 140／141 條）：dub 線最容易踩擴充版，
  以下 8 張已在 `risk` 明寫「我看到的是哪一版」，交研究層開原盤曲目表：
  Al Campbell《Diamonds》（Apple 是 19 軌的《Diamonds + Rainy Days》二合一）、
  Jah Stitch（Apple 是 50 軌多碟合輯）、Mystic Eyes（Apple 掛名多了 Hell & Fire、14 軌）、
  The Force of Music（Apple 16 軌）、Jah Free（Apple 17 軌）、Jah Warrior（Apple 17 軌）、
  Dread & Fred（1991 CD SHAKACD 915 是 Pt.1＋Pt.2 的二合一）、
  Alpha & Omega《Watch and Pray》（1992 CD A&OCD27 是與《Overstanding》的二合一，
  MB 上對應的兩個 Compilation release-group 已在 `mbNote` 明寫刻意不釘）。
- **場景飽和度判斷**：**還很空。** 池中 1975–88 年的英國雷鬼只有正典側 12 張（見上），
  而 Cha Cha、Burning Sounds、Third World Records、Vista Sounds、Live and Love、Studio 16、Ballistic、
  Body Music、Hawkeye、Ital、ADE.J 這十一家 1970–80 年代廠牌，以及 Conscious Sounds、Dubhead、
  Third Eye Music、Universal Egg、Jah Warrior、Alpha & Omega、Nubian、Youth Sound、Reggae On Top、
  Twinkle Music 這十家 1990 年代廠牌的目錄藝人，**在本批之前池中零張**。
  本批只用掉每家目錄的一小部分，上面「因配額未收」那二十餘張加上尚未觸及的編號段，**足夠再開一整批**。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際落檔、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
