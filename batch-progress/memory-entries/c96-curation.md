## 2026-09-05 — dip-vinyl-shop — c-96 策展提案（靈魂／放克／嘻哈目錄深度）

- **改動摘要**：新增 `batch-progress/c96/prop-a.json`（20 張）與 `batch-progress/c96/prop-b.json`（25 張），
  合計 **45 張、27 位藝人**，`lineType: 廣度`。
  - **a 組＝嘻哈正典目錄深度（20 張、13 位）**：
    N.W.A 1（N.W.A. and the Posse 1987）、The Notorious B.I.G. 1（Born Again 1999）、
    JAY-Z 4（In My Lifetime, Vol. 1 1997／Vol. 2... Hard Knock Life 1998／American Gangster 2007／4:44 2017）、
    Raekwon 2（Immobilarity 1999／Only Built 4 Cuban Linx... Pt. II 2009）、
    GZA 2（Words From the Genius 1991／Beneath the Surface 1999）、Black Star 1（No Fear of Time 2022）、
    Bone Thugs-n-Harmony 2（The Art of War 1997／BTNHResurrection 2000）、
    Lil' Kim 2（The Notorious K.I.M. 2000／La Bella Mafia 2003）、
    Grandmaster Flash & The Furious Five 1（On the Strength 1988）、Snoop Dogg 1（Tha Last Meal 2000）、
    Ultramagnetic MC's 1（The Four Horsemen 1993）、Souls of Mischief 1（No Man's Land 1995）、
    Wu-Tang Clan 1（Iron Flag 2001）。
  - **b 組＝靈魂與放克目錄深度（25 張、14 位掛名／11 條藝人線）**：
    Frank Ocean 1（Endless 2016）、Jill Scott 3（Beautifully Human Vol. 2 2004／The Real Thing Vol. 3 2007／
    The Light of the Sun 2011）、Dusty Springfield 3（A Girl Called Dusty 1964／Ev'rything's Coming Up Dusty 1965／
    A Brand New Me 1970）、Miracles 線 3（The Miracles《Hi... We're the Miracles》1961／《Doin' Mickey's Monkey》1963／
    Smokey Robinson & the Miracles《Special Occasion》1968）、Labelle 2（Labelle 1971／Chameleon 1976）、
    Gil Scott-Heron 線 3（Small Talk at 125th and Lenox 1970／Free Will 1972／
    & Brian Jackson《The First Minute of a New Day》1975）、Rufus 線 3（Rufus 1973／
    Rufus featuring Chaka Khan 1975／Rufus & Chaka Khan《Masterjam》1979）、
    Jerry Butler 2（Jerry Butler, Esq. 1959／He Will Break Your Heart 1960）、
    Martha Reeves & the Vandellas 3（Come and Get These Memories 1963／Ridin' High 1968／Natural Resources 1970）、
    Boyz II Men 2（Evolution 1997／Nathan Michael Shawn Wanya 2000）。
  - **合輯 0 張**：本批無一張 `releaseType: "Compilation"`、無一張走 §5.6 舉證。
    兩張 `primary-type=Album` ＋ `secondary-types=[Compilation]`（N.W.A《and the Posse》、
    B.I.G.《Born Again》）依 §5.6 明文與 c-90 裁定第 3 條，照一般 Album 寫、不填例外欄位。
    另有兩張帶其他 secondary-type：Gil Scott-Heron《Small Talk》[Live]、Frank Ocean《Endless》[Soundtrack]，
    兩張都是刻意釘定，理由見 `rulings.md` 第 4 條。
- **主要檔案**：`batch-progress/c96/prop-a.json`、`batch-progress/c96/prop-b.json`、
  `batch-progress/c96/rulings.md`、`batch-progress/memory-entries/c96-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c96/chk-prop.mjs a b` → **45 張、27 位、標記 0**；
  跨批去重掃到 46 批（其中 5 批讀 prop）、2,133 張卡，**跨批撞卡 0**。
  45 張全部釘住 release-group MBID，並**逐一回問
  `release-group/<id>?fmt=json&inc=artist-credits+releases`**（第 41 條）確認 `primary-type=Album`、
  標題、artist-credit、`secondary-types` 與轄下 release 的國別／status。
  藝人目錄一律走 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）——
  本批最極端的是 Snoop Dogg 582 個 RG、JAY-Z 212 個、Dusty Springfield 160 個，
  若用預設 25 筆的 browse 會得出大量假查無。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上逐位藝人實掃，**每位都用兩種以上掛名寫法**
  （主名／全名／feat. 全稱／MB 實體名），真撞卡 0。
  **封面**：45 張的 CAA release-group 端點**全部實測 200**（45/45）。
  **試聽**：Apple 命中 38/45（84%），7 張查無。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放）

完整 11 條見 `batch-progress/c96/rulings.md`。最重要的兩條：

1. **Apple 的 `search` 端點對嘻哈卡有系統性的 cleaned 偏差。** 用
   `search?term=<藝人> <盤名>&entity=album` 跑 a 組，得到 cleaned 10／explicit 0；
   改用 `lookup?id=<artistId>&entity=album&limit=200` 列全目錄後，**十筆裡九筆同時有 explicit 與 cleaned
   兩個條目，而 search 從來只回 cleaned 那一筆**。這是 `audits/cleaned-previews-hiphop.md`
   那 273 張的成因——不是「自動配對隨機挑中」，是查法本身就偏。
   **裁定：嘻哈與 R&B 的 explicitness 一律以 artist lookup 為準，search 結果不得作為「只有淨化版」的依據。**
   本批全 45 張的分佈因此是 **explicit 18、notExplicit 20、Apple 查無 7、cleaned 0**。
2. **掛名分裂一律沿用池中既有主寫法**（十組，見 rulings 第 3 條）。理由是可逆性與
   `audits/pool-artist-name-splits.md` 已有七組待修，不再引入第四種寫法。
   MB 的 artist-credit 全部進 `queryAlias`。

### 未收清單（釘不住 MB／目錄已滿）

| 藝人 | 情況 |
|---|---|
| Dr. Dre | **不是查無，是目錄已滿。** MB 名下 127 個 RG 分頁全列，個人正規專輯就是池中那三張。 |
| Madvillain | 只有《Madvillainy》一張（《Madvillainy 2》是 remix 版）。MF DOOM 相關化名專案池中已有 5 張。 |
| Lauryn Hill | MB 名下 29 個 RG，除《The Miseducation》外全為 Live 與 Compilation。《MTV Unplugged № 2.0》(2002) 是 Album＋Live，依派工「Live 屬對照組」不收。 |
| The Pharcyde | 池中 2 張，MB 上第三張《Plain Rap》(2000) 評價與流通度都不足以進廣度批，本批不收。 |

**本批無「MB 查無」而落到 §1 補遺批的候選——45 張全部釘得住 release-group。**

### 撞卡未收清單

**真撞卡 0 張**（所有候選在實掃後都確認池中沒有）。但抓到一筆**池中既有的重複建檔**：

- `Mos Def & Talib Kweli — Black Star`（1998）與 `Black Star — Mos Def & Talib Kweli Are Black Star`（1998）
  **是同一張碟**，掛名與盤名互換，任何以 `artist|album` 為鍵的去重都抓不到（第 71 條的形狀）。
  本批只新增《No Fear of Time》(2022)，**不動既有那兩筆**——`seed_cards.json` 是雲端禁碰檔。
  **交本機處理。**
