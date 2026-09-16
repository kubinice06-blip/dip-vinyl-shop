# c-141 裁定（Blue Note 1967–1968，Liberty 期開端）

第 570 起為 a 組，第 580 起為 b 組；兩組皆 append。

# a 組（Blue Note 1967–1968：BLP 4196 ＋ BLP／BST 4249–4294 ＋ Pacific Jazz 原盤 2 張 ＋ Capitol 原盤 3 張 ＋ vault 盤 2 張，23 筆覆核）

策展層 a 組，2026-09-15。交件 `batch-progress/c141/prop-a.json`（`g: "a"`），
`node batch-progress/c141/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／104 批 4,292 張、同 rgMbid 不同掛名 0）。
rgMbid 與 c-140 b 組 `prop-b.json`（12 張）程式交叉：**重疊 0**；掛名＋盤名折疊鍵交叉：**重疊 0**。號段 **570–579**。

## 第 570 條（2026-09-15，c-141 a 組）：**23 筆覆核結果——實收 20、退 3；rgMbid 全部照 enum，無一釘錯；年份改判 9 張；CAA 20/20**

23 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，再對 20 張收件的原盤 release 打 `release/<id>?inc=recordings` 取原 LP 軌序；
CAA 打 RG 端點；年份另核 jazzdisco 4200 目錄頁（`scratchpad/c140a/web/jd-4200.html`，BLP 4196 用 c-139a 的 jd-4100.html）、維基 infobox（引 Billboard 期刊頁）、Discogs `database/search`（catno／master 反查，不帶 token 每 3.2 秒一次）。
**enum 的 rgMbid 沒有一筆釘錯。**
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`（合計 18,869 列），掛名 23 個關鍵字子字串雙向、盤名 25 個關鍵字（卷號統一、撇號摺 ASCII）、另以 rgMbid 直比各批 prop：
**23 筆撞池 0**（enum `inPool: false` 全部成立）。盤名層命中全是他人假陽性（John Coltrane《Lush Life》、Kenny Dorham《Jazz Contrasts》、Szigeti《Bartók: Contrasts》、六張他人《Standards》、Boogie Down Productions《Ghetto Music》）。
c-131 b 組第 365 條列為額度外候補的《Hi Voltage》《Tender Moments》這批照 enum 順序補上（c-131 沒收，實掃確認零張）。

**退掉 3 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Nancy Wilson《Lush Life》1967 | 6670b49f-4d94-3d73-81b4-49e8c16ead29 | **第 313 條：Capitol 自家藝人，Blue Note 只在 1985 後再發掛名** | 原盤 Capitol ST 2757（US 1967-08，Dave Cavanaugh 製作，Discogs master 276123）；RG 轄下三筆，掛 Blue Note 的只有 1995-08-01 US CD 63c37fa0（同號另一筆掛 Capitol Jazz）。關聯始於 1995。與 c-140 a 第 550 條《Yesterday's Love Songs / Today's Blues》同人同形。 |
| 2 | Nancy Wilson《Welcome to My Love》1967 | 94343818-f104-3066-b843-484e9969722e | **第 313 條：Capitol 自家藝人** | 原盤 Capitol ST 2844（US 1968-01，Billboard 1968-01-20 評論、Top LPs 第 115 名；Discogs master 242125）；RG 轄下只有原盤＋1994-06-14 Blue Note CD 172d8b7a（無國別無 catno）。關聯始於 1994。CAA 404。⚠ enum 把它排在 1967（MB frd 1967＝錄音年），實為 1968-01 出版——若日後開 Capitol 人聲線，年份要改 1968。 |
| 3 | The Cannonball Adderley Quintet《74 Miles Away》1967（live） | 643fd9d8-27a0-362b-82ca-8cd0e97af747 | **第 313 條：Capitol 自家藝人（Adderley 1964 起簽 Capitol），Blue Note 只在 2008 數位掛名** | 原盤 Capitol ST 2822《74 Miles Away / Walk Tall》（US 1967-11，David Axelrod 製作，Billboard 1967-11-11；MB 只建 DE SMK 74418 那筆原盤）；RG 轄下掛 Blue Note 的只有 2008 NL Digital 6c0e3553。關聯始於 2008。⚠ 另記：維基 infobox 標 studio、MB 標 [Live]——這張是 1967-06／07 Capitol Studios 對邀請觀眾的錄音（與《Mercy, Mercy, Mercy!》同手法），第 485 條形；池中 `Cannonball Adderley` 8＋Quintet 兩字串 4 張的三向分裂第 543 條已記，若日後 Capitol 線收它掛名要一起定。 |

沒有撞池退件、沒有合輯退件、沒有列舉假陽性（bootleg／掛錯 RG）；「原盤他廠」5 張裡 Pacific Jazz 2 張改 `label` 收、Capitol 3 張退（第 572 條）。

## 第 571 條（同批）：**年份改判 9 張——這一段 MB `first-release-date` 幾乎全是錄音年，jazzdisco 目錄年也有四張與 Billboard 站不同邊；另兩張是 vault 盤被 bare release 拉回錄音年**

| 盤 | catno | 錄音 | MB frd | jazzdisco | 改 | 依據 |
|---|---|---|---|---|---|---|
| Hank Mobley《Hi Voltage》 | BST 84273 | 1967-10-09 | 1967 | **1968** | **1968** | 維基引 Billboard 1968-03-09；jazzdisco 1968；⚠ Discogs master／三筆美國原壓標 1967（c-131 第 364 條當時記「Discogs 1968」是反的） |
| Donald Byrd《Slow Drag》 | BST 84292 | 1967-05-12 | 1967 | **1968** | **1968** | 維基引 Billboard 1968-12-21；Discogs 美德義原壓全 1968；目錄號在 84275（1968-09）後 |
| Larry Young《Contrasts》 | BST 84266 | 1967-09-18 | 1967 | 1967 | **1968** | 維基引 Billboard 1968-06-01；Discogs stereo 原壓 1968（mono 條目 1967）；9 月錄、年內出不合節奏 |
| Stanley Turrentine《Easy Walker》 | BLP 4268 | 1966-07-08 | 1967 | 1967 | **1968** | 維基引 Billboard 1968-02-10；Discogs 唯一原盤條目（mono promo）1968；Apple 1968-02-01 |
| Jack Wilson《Easterly Winds》 | BST 84270 | 1967-09-22 | 1967（兩筆原盤皆錄音年） | 1967 | **1968** | 維基引 Billboard 1968-02-10；Discogs 三筆美國原壓全 1968 |
| Jackie McLean《New and Old Gospel》 | BST 84262 | 1967-03-24 | 1967 | 1967 | **1968** | 維基引 Billboard 1968-01-27；⚠ Discogs mono promo 1967——**本批最弱的改判之一**（1 月底評論，實際上市可能 1967 年底），risk 已寫 1967 說 |
| Donald Byrd《Blackjack》 | BLP 4259 | 1967-01-09 | 1967 | 1967 | **1968** | 維基引 Billboard 1968-03-09（與 Hi Voltage 同期）；⚠ Discogs mono 原壓 1967、目錄號夾在 4258（1967）與 4262 之間——**最弱的另一張**，risk 已寫 1967 說 |
| Lou Donaldson《Lush Life》 | GXF 3068（JP）／BST 84254 | 1967-01-20 | 1967 | **1986**（BST-84254） | **1980** | MB e0ae63a3「1967 US BST 84254」是錯登（該號實體是 1986 Manhattan 再發，Discogs 三筆全 1986）；世界首發 1980 JP King GXF 3068《Sweet Slumber》（MB 32230f1e、Discogs 4414989、維基）——vault 盤、日本首發、原題不同 |
| Lee Morgan《Standards》 | CDP 7243 8 23213 2 3 | 1967-01-13 | 1967 | — | **1998** | MB 7e39eb82「1967 US Vinyl、Blue Note 23213」是 bare 建檔（23213 是 CD 號）；Discogs master 592734 唯一原盤 1998 CD；維基 1998-02-10——第 551 條 Joy Spring 形 |

**其餘 11 張 MB＝Discogs 原壓＝jazzdisco（＝Billboard，有的話）**：Boss Horn 1967（Billboard 10-28）、Blue Spirits 1967（Billboard 02-18；目錄號 4196 是 1965 配的號、壓兩年）、A New Conception 1967-11（Billboard 11-11；⚠ Discogs 兩筆 mono 標 1966＝錄音年）、
The Jody Grind 1967（Billboard 03-04）、The Witch Doctor 1967（錄音 1961-03-14——Lion 期錄音、Liberty 期出版）、Structurally Sound 1967（Billboard 04-08）、Sweet Honey Bee 1967、I'm Movin' On 1967-08（錄音 1963-01-31，同上型）、
Tender Moments 1968（Schwann，弱）、Ghetto Music 1968。**兩說照 MB 一張**：Jazz Crusaders《The Festival Album》MB 1967＝Discogs 三筆原壓（一筆 1966）vs 維基 infobox 1966（引已下線的 jazzdisco Pacific Jazz 目錄頁）——依第 364 條第三型照 MB，1966 說寫 risk。

方法論（給 1967–84 段後批）：
1. **BST 842xx 這一段 MB 的 frd 幾乎全等於錄音年**（23 筆裡只有 A New Conception、I'm Movin' On 帶月），enum 依它分段，所以 **1968 年出版的碟有 7 張被排進「1967」**；反過來 1968 段的 slice 會少掉它們，**後批看到本組這 9 個 rgMbid 一律退（同 RG 已收）**。
2. **jazzdisco 4200 目錄頁的「年」是目錄年，本組四張（4262、4266、4268、84270）與 Billboard 新片欄站不同邊**（第 531 條方法論 3 的形狀在 Liberty 期更常見：Lion 退休後出版節奏變慢、年底錄的碟隔年才出）——**有 Billboard 引用時取紙本**，但 1 月底／3 月初評論的（New and Old Gospel、Blackjack）上市月可能在前一年年底，risk 都標了，研究層拿 Billboard 原刊或 Schwann 覆核可改回。
3. **vault 盤兩種 bare 形**：(a) MB 把 1985 後再發的目錄號（BST 84254）登成「1967 US」——年份與 catno 都對不上實體；(b) MB 把 CD 號當黑膠 catno 登成「1967 Vinyl」（Standards 23213）。兩種都是「RG 轄下最早那筆沒有可對應的實體」——**看到無 barcode、無月日、catno 與載體不合的最早筆先查 Discogs**（第 262／541 條延伸）。
4. Apple 的 releaseDate 本組 20 張裡 12 張是錄音日或 01-01 placeholder（New and Old Gospel 1967-03-24、A New Conception 1966-10-11、I'm Movin' On 1963-01-31、Structurally Sound 1966-12-01、Blackjack 1998-01-01＝CD 年……）——第 484 條再證；帶月日且與 Billboard 同月的（Jody Grind 03-01、Easy Walker 02-01、Tender Moments 09-01）可能同源（第 431 條）。

## 第 572 條（同批）：**「原盤可能他廠」5 張逐張判——Pacific Jazz 2 張成立改 `label` 收、Capitol 3 張依第 313 條退；另 2 張 enum 沒標的其實是 vault 盤**

| 盤 | enum note | 判定 | 處置 |
|---|---|---|---|
| Booker Ervin《Structurally Sound》 | BN 首發 2001、原盤可能他廠 | 成立：Pacific Jazz PJ-10119／ST-20119（1967-04） | 收，`label` Pacific Jazz、`year` 1967；Blue Note 只有 2001 CD（12 軌） |
| The Jazz Crusaders《The Festival Album》 | live；BN 首發 2005 | 成立：Pacific Jazz PJ-10115／ST-20115（1967） | 收，`label` Pacific Jazz、`year` 1967；Blue Note 只有 2005 CD（7 軌） |
| Nancy Wilson《Lush Life》 | BN 首發 1995 | 成立：Capitol ST 2757（1967） | **退**（第 313 條，第 570 條退表 #1） |
| Nancy Wilson《Welcome to My Love》 | BN 首發 1994 | 成立：Capitol ST 2844（1968-01） | **退**（#2） |
| The Cannonball Adderley Quintet《74 Miles Away》 | live；BN 首發 2008 | 成立：Capitol ST 2822（1967-11） | **退**（#3） |
| Lou Donaldson《Lush Life》 | （無） | **enum 漏標**：MB 把 1986 再發號登成 1967 原盤，enum 沒觸發「晚 3 年」規則；實為 Blue Note 自家庫存盤、1980 日本首發 | 收，`year` 1980、`label` 寫 GXF 3068（JP）為世界首發＋BST 84254（US 1986） |
| Lee Morgan《Standards》 | （無） | **enum 漏標**：bare release 把 1998 CD 首發拉回 1967 | 收，`year` 1998、`label` 寫 CD 號；完整 session、非 outtakes（第 509a 條第 2 點） |

**第 313 條在本組的判法**：Pacific Jazz 兩張都**沒有 1985 前的 BN 目錄號再發**（與 c-140 a《For Django》同形），本層依主線第 539a 條「Pacific Jazz 是 Liberty 併購的爵士目錄、關聯始於 1960 年代」照收，且本張出版時（1967）Pacific Jazz 與 Blue Note 已同屬 Liberty——**若主線把判準收緊到「該張本身 1985 前有沒有 BN 號」，這兩張與 For Django 要一起退**（可逆，risk 已標）。
Capitol 三張（含 Adderley 這張爵士現場盤）全退——第 313 條不分人聲／爵士（c-140 a 第 552 條 Stan Tracey 先例）。
⚠ **Adderley 的 Capitol 目錄（1964–1975 十幾張）會在 1985 後段整批出現在 enum**（2008 起數位全掛 Blue Note），照這條退；Nancy Wilson 亦同。

## 第 573 條（同批）：**掛名：群組實體收攏 2、盤面掛名收攏 1、既有雙字串照盤面年代 1、新掛名 1 過第 307 條、同字串預警 1**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Horace Silver Quintet / Sextet`（群組 e9ac5139 ＋ 群組 8efa0fa8「Horace Silver Sextet」，join「 / 」）《The Jody Grind》 | **`Horace Silver`** | 第 482／503／525／543 條；池中 seed 8＋各批 14；MB 這是第一次出現「兩個編制群組並列」的 credit，一樣收攏、兩字串進 queryAlias |
| `Art Blakey and The Jazz Messengers`（群組 209ddf15）《The Witch Doctor》 | **`Art Blakey and the Jazz Messengers`** | 第 470／525／553 條；池中 `and the` 6 seed＋各批 14 ＞ `& The` 5；MB credit 的大寫 The 進 queryAlias |
| `Jimmy Smith`（RG）／「The Incredible Jimmy Smith」（原盤與 1995 CD credit）《I'm Movin' On》 | **`Jimmy Smith`** | 第 543／553 條（Rockin' the Boat、Softly 先例） |
| `The Jazz Crusaders`（credit）掛在群組 fcb79f1a `The Crusaders`（1971–2010，alias The Jazz Crusaders）《The Festival Album》 | **`The Jazz Crusaders`** | 池中 `The Jazz Crusaders` 1（Freedom Sound 1961）／`The Crusaders` 5（1971 後）——是改名前後的既有分法、不是分裂（audits 未列，也不該列）；1967 盤面印 The Jazz Crusaders，照盤面年代 |
| `Eddie Gale`《Eddie Gale's Ghetto Music》 | **`Eddie Gale`**（新掛名） | MB 13f630fb Person，US，1941-08-15–2020-07-10；MB 另有 Eddie Gale Band／Inner Peace Orchestra 群組不收攏；池中零張、反查無同字串不同人 |
| `Jack Wilson`《Easterly Winds》 | **`Jack Wilson`**（既有字串 1 張） | MB 219c17de Person「jazz pianist」1936–2007＝池中《Something Personal》（BLP 4251）同人；**⚠ 第 307 條預警：MB 同字串九個實體，搜尋分數最高（100）的是製作音樂作曲家 4b2dc66f，另有奧斯汀民謠搖滾歌手、雷鬼、Fickle Friends 鍵盤手……池中這個字串目前只指鋼琴家，日後任何 `Jack Wilson` 進池要先帶消歧** |
| `Hank Mobley`／`Blue Mitchell`／`Freddie Hubbard`／`Jackie McLean`／`Lou Donaldson`／`Sam Rivers`／`Larry Young`／`Stanley Turrentine`／`Booker Ervin`／`Donald Byrd`／`Duke Pearson`／`Lee Morgan`／`McCoy Tyner` | 照 MB＝照池中 | 同字串 |

退件的 `The Cannonball Adderley Quintet`（群組 19a4c591）沒進池——池中 `Cannonball Adderley` 8／`The Cannonball Adderley Quintet` 2／`Cannonball Adderley Quintet` 2 的三向分裂（第 543／549 條）仍留本機。

## 第 574 條（同批）：**盤名：印刷體撇號改 ASCII 2 張、盤名含掛名 1 張、首發題名與 RG title 不同 1 張、其餘照 MB RG title**

| MB RG title | 卡上盤名 | 說明 |
|---|---|---|
| `I’m Movin’ On`（U+2019 ×2） | **I'm Movin' On** | 第 473／506 條；mono 原盤 release title 本來就是 ASCII |
| `Eddie Gale’s Ghetto Music`（U+2019） | **Eddie Gale's Ghetto Music** | 同上；維基條目名與 2003 Water CD 用短名《Ghetto Music》進 queryAlias；盤名含掛名但字串不等，selfTitled false |
| `Lush Life`（Donaldson） | 照 RG | 1980 日本首發題《Sweet Slumber》（唯一 1985 前實體）進 queryAlias；RG title、2007 RVG、2014 LP、Apple 都是 Lush Life（第 45 條現行流通名）——研究層若依「首發題名」改回不影響 MBID |
| `The Witch Doctor` | 照 RG | 1981 Applause 再發題《Witch Doctor》進 queryAlias |
| `Standards`／`Contrasts`／`Lush Life` | 照 RG | 同名撞擊見第 576 條 |
其餘 15 張照 MB RG title 逐字。

## 第 575 條（同批）：**Live 1 張（Newport／Costa Mesa 音樂節，MB 有標）；Lion 期錄音、Liberty 期出版 3 張；vault 盤 2 張**

- **《The Festival Album》**：MB [Live]、enum `live: true`——Newport Jazz Festival 1966-07-04 與 Pacific Jazz Festival（Costa Mesa）1966-10-08 都是真演出場地，卡單標現場、mbNote 寫演出日。
- **退件的《74 Miles Away》**MB [Live] 但維基標 studio（Capitol Studios 邀請觀眾）——第 485 條「錄音場地標 Live」的形，已退、不影響本批。
- 其餘 19 張 secondary-types 空、全是 Van Gelder（17）／Pacific Jazz Los Angeles（1）錄音室盤，沒有第 397 條「MB 沒標的現場」。
- **Lion 期錄音、Liberty 期出版**（派工信坑 1，正文不得寫成出版年錄音）：《The Witch Doctor》（1961-03 錄、1967 出）、《I'm Movin' On》（1963-01 錄、1967 出）、《Blue Spirits》（1965／66 錄、1967 出）。
- **vault 盤**：《Lush Life》（1967→1980 JP）、《Standards》（1967→1998 CD）——`year` 取首發，錄音年進 risk／正文（第 364／551 條）。**Standards 是本線第一張首發載體為 CD 的卡**，`label` 寫 CD 號。

## 第 576 條（同批）：**關聯組 6 組（正文陣容不得互抄）＋同名撞擊 4 處**

1. **Byrd《Blackjack》（1967-01-09）↔《Slow Drag》（1967-05-12）**：同 Sonny Red／Walton／Booker／Higgins 班底，前者多 Hank Mobley——各算一張、互指。
2. **Pearson 編曲的 1967 年初三張**：《Boss Horn》（1966-11-17）、《Lush Life》（1967-01-20）、《Standards》（1967-01-13）——後兩張是同一週的「標準曲企劃」且都被壓下，正文可寫成一對、不得寫成同場。
3. **Blakey《The Witch Doctor》（1961-03-14）↔ c-140 a《The Freedom Rider》（1961-02／05）↔《Roots & Herbs》（BST 84303，1970，後批）**：同班底三張，第 555 條第 1 點已預告。
4. **Tyner 四處**：《Tender Moments》領班（1967-12-01）、《Easy Walker》（1966-07）、《Lush Life》（1967-01）側人——不同場。
5. **Hicks／McLean／Higgins／Cranshaw 1967 下半的交叉**：《Hi Voltage》（10-09）、《Easterly Winds》（09-22）、《New and Old Gospel》（03-24，Higgins）、《Structurally Sound》（Hicks，Pacific Jazz）——四張各寫各的。
6. **Tyrone Washington**：《The Jody Grind》《Contrasts》側人、《Natural Essence》（BST 84274，後批）領班——不同場。
同名撞擊（正文與試聽比對務必帶 catno）：**《Lush Life》**（同批 Donaldson 收／Nancy Wilson 退，池中另有 Coltrane）；**《Standards》**（池中六張他人，Apple search 混入 Sidewinder／Cornbread）；**《Contrasts》**（池中 Dorham《Jazz Contrasts》、Szigeti）；**《Blackjack》**（維基第一次抓到 1979 Polydor 樂團同名盤，研究層搜尋要帶 Byrd）；另《Ghetto Music》↔ Boogie Down Productions、2017 Gale 重錄版《The Remake and Beyond》掛在同 RG（上架只認 5 軌形）。

## 第 577 條（同批）：**MB 資料層面的坑 8 個（本層不改 MB）**

1. **《Lush Life》e0ae63a3**：「1967 US 12" Vinyl，BST 84254」——該號實體是 1986 年，1967 無發行；RG frd 與 enum 分段都被它帶偏。
2. **《Standards》7e39eb82**：「1967 US Vinyl，Blue Note 23213」——catno 是 1998 CD 的號，bare 建檔（第 551 條 Joy Spring 形）。
3. **frd＝錄音年的原盤 release**：Contrasts（兩筆）、Easterly Winds（兩筆）、Slow Drag、Hi Voltage、Easy Walker、Blackjack、New and Old Gospel——這一段 MB 幾乎沒有一筆帶月日。
4. **只建 mono、stereo 沒建**：Boss Horn（BLP 4257）、The Jody Grind（BLP 4250）、Sweet Honey Bee（BLP 4252）；**只建 stereo、mono 沒建**：Blackjack（BST 84259）、New and Old Gospel（BST 84262）——卡上兩號並列，另一號出自 Discogs／維基。
5. **catno 無前綴**：A New Conception「4249」、Easy Walker「4268」。
6. **《I'm Movin' On》stereo 原盤 cfda8f91 登 8 軌**（原 LP 6 軌，8 是 1995 CD 形）；mono 3f824fef 與《New and Old Gospel》fd4dc90b 的 status 空。
7. **重複建檔**：Slow Drag 1993 JP CD 兩筆同 barcode（52804fd1／801515e2）；Ghetto Music 2017 黑膠 4b965c27 登成 3＋2 軌兩片、status 空，且 2017 MEPCO 重錄版 5776460f 掛在同 RG。
8. **軌長未填**：Slow Drag、Easterly Winds 原盤 release——寫作層不得引軌長。
另：《74 Miles Away》（退）MB 只建 DE SMK 74418 當原盤，US ST 2822 沒建；《Welcome to My Love》（退）Blue Note CD 172d8b7a 無國別無 catno。

## 第 578 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 一種查法 20/20 命中（4 張要換詞）；CAA 20/20，但 8 張的圖來源是再發不是原盤**

- **命中且形狀與原盤一致**：Boss Horn（716323306 RVG 6 軌）、Blue Spirits（1443174543 5 軌）、Lush Life（1442936579 7 軌）、New and Old Gospel（716131477 3 軌）、A New Conception（1438777837）、The Jody Grind（724499900，掛 Horace Silver）、Contrasts（1765629518）、Blackjack（1442924491）、Slow Drag（723533139 RVG）、Sweet Honey Bee（1443611357）、Easterly Winds（724752432）、Standards（725210711 7 軌）、I'm Movin' On（1442927914 6 軌）、Tender Moments（715643790）、Ghetto Music（1443132957 5 軌）、Hi Voltage（724925658 RVG 6 軌）。
- **命中但只有 CD／擴充形**：Easy Walker（724359914，11 軌＝1997 CD，前 6 軌）、The Witch Doctor（724724135，7 軌，前 6 軌，掛 Art Blakey & The Jazz Messengers）、Structurally Sound（724552151，12 軌＝2001 CD，前 8 軌）、The Festival Album（716029917，7 軌＝2005 CD，**原盤是第 2–5 軌、不是前 N 軌**）——留研究層逐軌比。
- **第一個搜尋詞落空、換詞才中**（第 254 條）：I'm Movin' On（撇號盤名撞 Camila Cabello／John Denver 同名曲）、Standards（要加 Blue Note）、Hi Voltage／New and Old Gospel／A New Conception 等 8 張第一輪回空 body（Apple 限流，間隔拉到 6 秒重跑才回）。
- **店面掛名與本卡不同**：Art Blakey & The Jazz Messengers、Horace Silver（同）、Cannonball Adderley Quintet（退件）。
- **CAA：20/20 有 front**；**來源不是原盤圖的 8 張**：Blue Spirits（2004 RVG CD）、New and Old Gospel（1996 XE CD）、Easy Walker（1997 CD）、Blackjack（1998 NL CD）、Sweet Honey Bee（2004 數位）、Ghetto Music（2003 Water CD）、Lush Life（來源是年份錯登的 e0ae63a3，圖應為 1986 版式）、Standards（來源是 bare 筆，圖應為 1998 CD）——研究層看版式，各卡 risk 已列 Discogs 原盤條目；Tender Moments 來源是 1968 IT 壓片（版式同原盤）。退件 3 張裡《Welcome to My Love》404。
- 維基 API 本組抓取間隔 3.5 秒、23＋3 個條目零限流（派工信坑 5 的做法有效）；jazzdisco Pacific Jazz 目錄頁（維基引的 `/pacific-jazz-records/catalog-10100-series/`）已下線（404），Pacific Jazz 原盤的年份只剩 Discogs／Billboard。

## 第 579 條（同批）：**交件數字、中間檔、給 b 組與後批**

- **交件 20 張、19 位；退 3**（第 570 條：第 313 條 Capitol 3）；年份改判 9（第 571 條）；`label` 改他廠 2（第 572 條）；掛名收攏 3、新掛名 1、同字串預警 1（第 573 條）；盤名 ASCII 2（第 574 條）；現場 1、vault 2、Lion 期錄音 Liberty 期出版 3（第 575 條）；CAA 20/20（第 578 條）。
- `chk-prop a` 標記 0；與 c-140 b 組 prop-b（12 張）rgMbid 與折疊鍵交叉 0。
- 掛名層實掃：Hank Mobley 9＋待上架 13／Blue Mitchell 4＋1／Freddie Hubbard 11＋2／Jackie McLean 9＋6（＋聯名 2）／Lou Donaldson 8＋16／Sam Rivers 4／Horace Silver 8＋14（＋apex 1）／Larry Young 3／Stanley Turrentine 5＋8／Art Blakey and the 6＋14、& The 5、個人 1＋6／Booker Ervin 4／Donald Byrd 14＋11／Duke Pearson 1＋3／Jack Wilson 1／Lee Morgan 12＋9／Jimmy Smith 11＋23／Nancy Wilson 0／Cannonball 8＋Quintet 4／The Jazz Crusaders 1＋The Crusaders 5／McCoy Tyner 6＋3／Eddie Gale 0。
- 中間檔 `scratchpad/c141a/`：c141a-mbfetch.mjs／mb/（23 個 RG 的 release-group＋release＋CAA 回傳＋7 個 artist／RG 搜尋）、c141a-mbsum.txt（逐張摘要）、c141a-tracks.json（20 張原盤＋5 張 CD 軌序）、c141a-poolscan.txt（實掃全文）、wiki/（26 個維基 infobox＋track listing＋personnel）、discogs/（33 個 catno／master 反查）、c141a-apple.json（店面 search 兩輪）、c141a-build1～4.mjs（卡單產生）。jazzdisco 4200 頁沿用 c140a 的抓取。
- **給 b 組**：(1) 本組改判為 1968 的 7 張（Hi Voltage、Slow Drag、Contrasts、Easy Walker、Easterly Winds、New and Old Gospel、Blackjack，rgMbid 見 prop-a）若出現在 b 組 1968 段的 slice，是同 RG、退；(2) BST 842xx 後段的 MB frd 一律先當錄音年，jazzdisco 目錄年再對 Billboard；(3) `Jack Wilson` 字串的第 307 條預警。
- **給後批（1968–84 段）**：(1) Blakey《Roots & Herbs》BST 84303 與本組 Witch Doctor、c-140 a Freedom Rider 互指；(2) Gale《Black Rhythm Happening》BST 84320 掛名沿用 `Eddie Gale`；(3) Tyrone Washington《Natural Essence》BST 84274 領班盤新掛名；(4) Adderley／Nancy Wilson 的 Capitol 目錄在 1985 後段整批出現，照第 313 條退；(5) 「Blue Note 自家 vault 首發是 CD」的形（Standards）在 1985 後段會很多（1990 年代 Connoisseur／Cuscuna 系列），`label` 寫 CD 號、`year` 取 CD 年。

## 第 579a 條（同批，接力代理覆核，2026-09-16）：**a 組 23 筆已全數處理完畢——「剩 3 筆」是第 570 條的 3 張退件，不是未做**

前一支 a 組代理撞 API 額度中斷，交接時只看到 `prop-a.json` 20 筆，誤判為「還剩 3 筆」。
接力代理程式比對 `slice.json`（`g: "a"` 23 筆）與 `prop-a.json`（20 筆，以 `mbNote` 第一個 UUID 為鍵）：
**差集恰為第 570 條退表的 3 個 rgMbid**（Nancy Wilson《Lush Life》6670b49f／《Welcome to My Love》94343818／Cannonball《74 Miles Away》643fd9d8），
`prop` 無 slice 外的多餘卡、與 `g: "b"` 22 筆重疊 0。**23 = 20 收 + 3 退，無遺漏。**

**三張退件獨立重驗（重打 MB `release-group` ＋ `release?inc=media+labels+artist-credits`）**，與第 570／572 條完全相符、第 313 條成立：
- 《Lush Life》：轄下 3 筆＝Capitol Records **ST 2757**（1967 US 12" Vinyl 11 軌）／Capitol Jazz CD（1995）／**Blue Note CD 1995-08-01**（12 軌，無 catno）——BN 關聯始於 1995。
- 《Welcome to My Love》：轄下 2 筆＝Capitol Records **ST 2844**（1967 US 12" Vinyl 11 軌）／**Blue Note CD 1994-06-14**（無國別無 catno）——BN 關聯始於 1994。
- 《74 Miles Away》：轄下 4 筆＝Capitol **SMK 74418**（1967 DE 12" Vinyl 5 軌）／**Blue Note 2008 NL Digital**（5 軌）／2011＋2021 JP CD（Capitol ST-2822／TOCJ-50153／UCCU-8271）——BN 關聯始於 2008；RG secondary-types `["Live"]` 確認（第 575 條的 studio-with-audience 保留意見不變）。
  ⚠ 補正第 577 條末句：**US ST-2822 這個號在 MB 有建**，但只出現在 2011／2021 兩筆日本 CD 的 label-info，1967 年的美國黑膠 release 確實沒建。

**交件狀態**：`node batch-progress/c141/chk-prop.mjs a` 重跑 → **20 張、19 位、標記 0**（跨批 104 批 4,292 張撞卡 0、同 rgMbid 不同掛名 0）；
20 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`；欄位鍵與 `c140/prop-a.json` 完全一致（`queryAlias` 為全形分號串字串，非陣列）；
`why` 均長 542／`risk` 705／`mbNote` 710 字元（c-140 a 為 468／707／708）——密度達標。**a 組結案，無待辦。**

# b 組（Blue Note 1968，Liberty 期：BLP／BST 4203＋4269–4315 ＋ Pacific Jazz 原盤 1 張 ＋ Solid State／Capitol 原盤各 1 張 ＋ 1955 合輯 1 張，22 筆覆核）

策展層 b 組，2026-09-16。交件 `batch-progress/c141/prop-b.json`（`g: "b"`），
`node batch-progress/c141/chk-prop.mjs a b` **標記 0**（a 20 張 19 位、b 19 張 17 位；欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／104 批 4,311 張、同 rgMbid 不同掛名 0；三筆舊帳是 c49b／cseab 的）。
b 組 19 個 rgMbid 與同批 a 組 20 個、c-135～c-140 各批 251 筆程式交叉：**重疊 0**。號段 **580–589**。
**前一支 b 組代理被 API 額度中斷**，磁碟上只留下 `scratchpad/c141b/c141b-mbfetch.mjs` 與 22 個 RG 的 MB 回傳（rg／rel／caa），`prop-b.json` 不存在——本支從 MB 回傳接續，其餘（jazzdisco、維基、Discogs、Apple、實掃、卡單）全部重跑。

## 第 580 條（2026-09-16，c-141 b 組）：**22 筆覆核結果——實收 19、退 3；rgMbid 全部照 enum，無一釘錯；年份改判 3；CAA 17/19**

22 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，
再對 19 張收件的原盤 release 打 `release/<id>?inc=recordings+media+labels` 取原 LP 軌序；CAA 打 RG 端點；
年份另核 **jazzdisco 4200 目錄頁**（沿用 `scratchpad/c140a/web/jd-4200.html`）＋ **本支新抓的 4300 目錄頁、1200 目錄頁、BN-LA 目錄頁，以及 4200／4300 兩張 session 頁**（`scratchpad/c141b/web/`，逐張取班底、錄音日與 matrix 號）、維基 infobox（引 Billboard 期刊頁，抓取間隔 3.5 秒，**零限流**）、Discogs `database/search`（catno／master 反查 28 筆，不帶 token 每 3.2 秒一次）。
**enum 的 rgMbid 沒有一筆釘錯**（22/22 盤名＋掛名與 MB RG 逐字相符）。
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`（含同批 `prop-a.json`；合計 **19,006 列**），掛名 31 個關鍵字子字串雙向、盤名 26 個關鍵字（卷號統一、撇號摺 ASCII）、另以 rgMbid 直比各批 prop：
**22 筆撞池 0**（enum `inPool: false` 全部成立）。盤名層命中全是他人假陽性（King Tubby《…Grass Roots of Dub》、Four Tops／Bacharach《Reach Out》、Mr. Lif《I Phantom》、Lloyd Webber《The Phantom of the Opera》、Grant Green／Cannonball 的 Lighthouse、五張他人《In Between》系列、池中既有的 Lou Donaldson《Midnight Creeper》）；掛名層命中都是同人不同碟或不同人（`Charley Patton` 2 張是子字串假陽性）。

**退掉 3 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Joe Williams & The Thad Jones & Mel Lewis Orchestra《Presenting Joe Williams and Thad Jones / Mel Lewis: The Jazz Orchestra》1968 | abbe53b6-c3b8-395c-a689-ab1e7f26907f | **第 313 條：他廠（Solid State／United Artists）原盤，1985 前無 BN 目錄號；且原盤年不在本段** | 原盤 **Solid State SS 18008**（UA 的爵士副牌），Discogs master 210978＝**1966**、維基 infobox「recorded 1966 September, New York City」；MB 1635c3d5 標「1968 US SS 18008」是 repress（Discogs 同號 1968 兩筆都標 Repress，1966 兩筆才是原壓）。RG 轄下只有這筆＋**1994-11-15 US CD Blue Note CDP 7243 8 30454 2 6（54645d3c）**——Blue Note 的關聯始於 1994。**本層另查了 jazzdisco BN-LA 目錄頁**：1975 年的 `BN-LA392-H2 Thad Jones/Mel Lewis` 只收了本場（1966-09-30）三軌進雙片精選，**SS 18008 這張碟本身從未配過 Blue Note 目錄號**，不符簡報第一節第 3 點「1960–80 年代以 BN 目錄號再發」。⚠ 與 a 組 Pacific Jazz 兩張的差別要記住：1967–68 年 Pacific Jazz 與 Blue Note 同屬 Liberty（第 572 條依主線第 539a 條照收），**但 1966 年 Solid State 屬 United Artists、Blue Note 屬 Liberty，兩家是不同公司**（Transamerica 1968–69 才把 Liberty 與 UA 併起來）——「同一集團」這個理由在本張不成立。⚠ 給後批：Thad Jones/Mel Lewis 的 Solid State 目錄後來確實轉進 Blue Note（BST 84346《Consummation》1970、BST 84355 Joe Williams《Worth Waiting For》1970，jazzdisco 4300 頁），**那些是 BN 自家號、照收**；池中已有 `Thad Jones & Mel Lewis`《Consummation》。rgMbid 已釘，若主線把第 313 條放寬到整個 Solid State 目錄，本張直接復用。 |
| 2 | Ella Fitzgerald《30 by Ella》1968 | 489936d4-889e-3e41-a993-57894a45b826 | **第 313 條：Capitol 自家藝人的原盤，Blue Note 只在 1985 後再發掛名** | 原盤 **Capitol ST 2960／T 2960**（US 1968，MB 1f84856e／840ec7e2 兩筆都建了；Discogs `catno:"ST 2960"` 回加拿大／美國／南非／紐西蘭／義大利多筆 1968–69 Capitol 壓片），錄音 1968-05-28～06-03（維基 infobox）。RG 轄下五筆裡掛 Blue Note 的只有 **1999-07-12 GB CD 5200902（8574347c，7 軌）**，另兩筆是 1987 US／CA Capitol CD——關聯始於 1999。與 c-137／c-138 Shearing／Christy／Sinatra／Peggy Lee、c-140 a Nancy Wilson、c-140 b Cannonball、c-141 a Nancy Wilson ×2＋Adderley 完全同形。⚠ 池中 `Ella Fitzgerald` 已有 12 張（含三張王牌），Capitol 時期零張——若日後開 Capitol 人聲線，rgMbid 已釘。 |
| 3 | Sidney Bechet with Bunk Johnson & Sidney De Paris《Jazz Classic Volume 2》1968 | f71548d7-0315-3e6a-9625-36cd3ec18380 | **合輯（MB 未標），且首發年 1955 不在本段——歸第 312 條 §5.6 子批** | **BST 81202 不是 1968 年的新專輯**：jazzdisco 1200 系列目錄頁 **`BLP 1202 Sidney Bechet - Jazz Classics Volume 2　1955`**，BST 81202 是 1960 年代末配的 stereo（電子模擬）號再發。Discogs `catno:"BST 81202"` 六筆**全部標 Compilation／Reissue**（1968 的 1971754、1973 的 8005079、1975 的 7023601、德國 4262779、1979 UK BNS 40002），`catno:"BLP 1202"` 則回一整串 1955 年起的 mono Compilation 壓片。內容是 1939–51 年 78 轉單曲與 10 吋盤（BLP 7001 一系）的選輯，**MB RG 的 `secondary-types` 是空的——這是第 397 條「兩個方向都會漏」在 Compilation 上的又一例**，列舉檔因此沒有把它濾掉。依第 312 條，這種「10 吋／78 轉重組成 12 吋 Volume」的 Blue Note 正典**不插隊、留給 1939–66 段跑完後的 §5.6 子批**（Miles《Volume 1》、Navarro《Vol. 2》已在排隊）；若日後走 §5.6，`year` 要取 **1955**、`label` 寫 BLP 1202，rgMbid 已釘。⚠ 池中 `Sidney Bechet` 已有 9 列（含 c-135 三張），《Jazz Classics》兩卷都不在。 |

沒有撞池退件、沒有列舉檔假陽性（19 張收件的原盤 release 全部 status Official）、沒有 bootleg。

## 第 581 條（同批）：**年份改判 3 張——全是「1968 年錄、1969 年才出」；另有 4 張的「兩說」被三比一擋下（維基單獨標另一年）**

| 盤 | catno | 錄音 | MB frd | jazzdisco | Discogs | 維基 | 改 |
|---|---|---|---|---|---|---|---|
| Stanley Turrentine feat. Shirley Scott《Common Touch》 | BST 84315 | 1968-08-30 | 1968 | 1968 | 原壓多筆 1968 | **1969-09（引 Billboard 1969-09-06）** | **1969** |
| McCoy Tyner《Time for Tyner》 | BST 84307 | 1968-05-17 | 1968 | **1969** | **master 92932＝1969、JP 原壓 30415250＝1969** | **1969-08（引 Billboard 1969-08-02）** | **1969** |
| The Contemporary Jazz Quintet《Introducing Kenny Cox…》 | BST 84302 | **1968-12-09** | 1968 | **1969** | master 1152720＝1968 | **1969** | **1969** |

- **Common Touch** 是三比一改判（MB＝jazzdisco＝Discogs 1968 vs 維基引 Billboard 1969-09-06），依第 571 條方法論 2「有 Billboard 引用時取紙本」；**旁證是目錄號鄰居**：jazzdisco 4300 頁 84313《Turning Point》＝1969、84317《Love Bug》＝1969、84318《Hot Dog》＝1969，84315 記 1968 在號段裡是孤例。
- **Time for Tyner** 四比一，沒有爭議。
- **Kenny Cox** 兩比二，**決定性的是錄音日**：1968-12-09 在底特律錄，Liberty 期 Blue Note 錄完到上市普遍 6–12 個月（同段 84301 1968-09 錄→1968 出、84303 1968-08 錄→1968 出），三週內出版不可能。

**「兩說」照多數、維基那一說寫進 risk 的 4 張**：
1. **Andrew Hill《Grass Roots》**：MB＝jazzdisco＝Discogs 五筆原壓 1968 vs **維基 infobox 1969（引 jazzdiscography.com 的 Hill 目錄，不是 Billboard）**——取 1968。
2. **Jackie McLean《\'Bout Soul》**：MB＝jazzdisco＝Discogs 四筆原壓 1968 vs **維基 1969-01（引《Schwann Monthly Guide to Stereo Records》1970 年版）**——Schwann 是月度目錄不是新片欄，證據力低於 Billboard（c-141 a《Tender Moments》同形已標「弱」），取 1968。
3. **The Three Sounds《Elegant Soul》**：維基 infobox 寫「September 21, 1968」，**而錄音日是 9 月 19–20 日**——發行日填在錄音後兩天，是第 311／571 條「把 session 資料填進發行欄」的再一例，只採其年（1968）。
4. **Duke Pearson《The Phantom》**：南非壓片 BLC 84293（MB 7b6af419）標 1969，是海外壓片、不影響首發年 1968。

**其餘 12 張 MB＝jazzdisco＝Discogs 原壓（＝Billboard，有的話）**：Andrew!!!（MB 難得帶月 1968-04）、Manhattan Fever、Reach Out!（Billboard 1968-11-02）、Natural Essence（Billboard 1968-06-01）、That Certain Feeling、Lighthouse \'68、!Caramba!（Billboard 1968-12-21）、Serenade to a Soul Sister（Billboard 1968-06-01）、Open House、Heads Up!（Billboard 1968-12-14）、Introducing Duke Pearson\'s Big Band、The In Between（Billboard 1968-11-09）。

**⚠ 方法論（給 1969–84 段）——與 c-140 第 561 條、c-141 a 第 571 條接續**：
1. **BLP/BST 4238–4262 段 MB 年份幾乎全＝錄音年（c-140 第 561 條）、84266–84294 段一半是錄音年（c-141 a 第 571 條），但 84269–84303 這一段 MB 與 jazzdisco 反而幾乎全對**——本組 22 筆裡 MB 只錯了 3 筆（全是 1969 盤被填成 1968）。**這一段的錯誤形狀變了：不再是「錄音年當發行年」，而是「跨年出版的碟被四捨五入到錄音年」**，只出現在 84302／84307／84315 這種「1968 下半年錄、1969 出」的碟上。**判準：看錄音月**——1968 年 5 月以後錄的 84300 以上號段，先假設 1969。
2. **jazzdisco 4300 目錄頁在 84302／84307 兩筆上比 MB 準**（都記 1969），但 84315 記 1968 又與 Billboard 站不同邊——**jazzdisco 4300 頁本身不是單一可信來源，要配號段鄰居一起看**。
3. Apple 的 releaseDate 本組 19 張裡 **11 張是錄音日**（Grass Roots 1968-08-05、Common Touch 08-30、Andrew!!! 1964-06-25、Manhattan Fever 03-21、Reach Out! 01-19、That Certain Feeling 03-08、Heads Up! 1967-11-17、The In Between 01-12、\'Bout Soul 1967-09-08……）、**5 張 01-01 placeholder**、Kenny Cox 是 CD 年（2007-01-01）、Time for Tyner 的 1968-08-01 **既非錄音日也非發行日**（第 484 條第三型）；**唯一與 Billboard 同月的是 !Caramba!（1968-12-01 vs Billboard 12-21）**，可能同源（第 431 條）。

## 第 582 條（同批）：**「原盤可能他廠」3 張逐張判——Pacific Jazz 1 張改 `label` 收、Solid State 與 Capitol 各 1 張依第 313 條退；enum 漏標 0**

| 盤 | enum note | 判定 | 處置 |
|---|---|---|---|
| The Jazz Crusaders《Lighthouse \'68》 | live；BN 首發 2004，原盤 1968 可能他廠 | 成立：**Pacific Jazz ST-20131／PJ-10131**（US 1968，Richard Bock 製作，Discogs 原壓 3099537／7497383／2846067） | **收**，`label` Pacific Jazz、`year` 1968；Blue Note 只有 2004 CD（86f3f9c3，10 軌，Pacific Jazz／Blue Note 雙掛名） |
| Joe Williams &…《Presenting Joe Williams and Thad Jones / Mel Lewis》 | BN 首發 1994，原盤 1968 可能他廠 | 成立但**年份也錯**：Solid State SS 18008（US **1966**） | **退**（第 580 條退表 #1） |
| Ella Fitzgerald《30 by Ella》 | BN 首發 1999，原盤 1968 可能他廠 | 成立：Capitol ST 2960（US 1968） | **退**（#2） |

**第 313 條在本組的判法**：與 c-141 a 第 572 條完全一致——**Pacific Jazz 收（1968 年 PJ 與 BN 同屬 Liberty，主線第 539a 條）、Capitol 退**；新增的一格是 **Solid State／United Artists**：1966 年 UA 與 Liberty 還是兩家公司，**不能套「同屬 Liberty」這個理由**，且該碟 1960–80 年代從未配過 BN 目錄號（本層查了 jazzdisco BN-LA 目錄頁核實），依簡報第一節第 3 點的字面（「以 BN 目錄號再發的照收」）退。
⚠ **給後批的判準表**（第 313 條的三格）：(a) 1985 前有 BN 目錄號 → 收，`label` 寫 BN；(b) 無 BN 號，但出版當時原廠與 BN 同屬 Liberty／UA 同一家（Pacific Jazz／World Pacific 1967 後） → 收，`label` 寫原廠（**可逆，主線收緊就一起退**）；(c) 其餘（Capitol、1968 前的 Solid State、EMI Columbia……） → 退。
⚠ **本組 enum 漏標 0**——與 c-140 b（Rajah）、c-141 a（Lush Life、Standards）不同，本組沒有「MB 把再發號／CD 號登成原盤」的 vault 形；84300 號段的年份錯是單純的跨年誤填。

## 第 583 條（同批）：**掛名裁定——群組收攏 4 張、既有分裂取多數 1 張、盤面掛名收攏 1 張、聯名收攏 2 張；新掛名 2，第 307 條預警 2**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `Gene Harris & The Three Sounds`（**群組 9b58e361**）《Elegant Soul》 | **`The Three Sounds`** | 第 363 條第二型＋c-140 b 第 563 條（The 3 Sounds → The Three Sounds）；池中 `The Three Sounds` **21 列**（seed 1＋c-137～c-140 各批 10）、`Gene Harris` 個人只有 1 張。**MB 上這是兩個群組實體**（`The Three Sounds` cf2115e9 與本 RG 的 9b58e361），同一批人（Harris／Simpkins 自 1958 年）；2008 年 CD（791c951e）的 credit 本來就是 The Three Sounds |
| `The Duke Pearson Big Band`（群組 c67fa43c）《Introducing Duke Pearson\'s Big Band》 | **`Duke Pearson`** | 第 363 條第二型；池中 `Duke Pearson` 8 列（含 c-141 a《Sweet Honey Bee》）；與同批《The Phantom》同字串、兩卡互指 |
| `The Horace Silver Quintet with Stanley Turrentine`（群組 e9ac5139 ＋ Person 51e0df97）《Serenade to a Soul Sister》 | **`Horace Silver`** | c-141 a 第 573 條先例（The Horace Silver Quintet / Sextet → Horace Silver）；池中 25 列＋王牌 1。Turrentine 是聯名不是側人，正文要寫出他 |
| `Kenny Cox and the Contemporary Jazz Quintet`（Person fd303f18 ＋ **群組 16d697f2**）《Introducing Kenny Cox…》 | **`The Contemporary Jazz Quintet`** | **本批唯一「往群組收攏」而不是「往個人收攏」的一筆**：池中既有字串是群組 `The Contemporary Jazz Quintet`（《Location》1973，RG de2e8401，程式核對掛的就是 16d697f2），**池中沒有 `Kenny Cox`**。第 307 條「用池中既有寫法、不新造分裂」；改的是卡單值、可逆，主線若要以領班立卡，本張與池中《Location》一起改 |
| `Stanley Turrentine featuring Shirley Scott`（兩個 Person）《Common Touch》 | **`Stanley Turrentine`** | 第 543／553 條；池中 22 列。Scott 池中 4 張（都是她自己的碟），聯名不另立字串 |
| `John Patton`（RG／盤面／jazzdisco）《That Certain Feeling》 | **`Big John Patton`** | **既有分裂取多數**：池中 `Big John Patton` 7 列 ＞ `John Patton` 1 列（《Along Came John》seed），依 c-140 a 第 550 條先例；Apple 掛的也是 Big John Patton。⚠ 池中 `Charley Patton` 2 張是不同人 |
| `The Incredible Jimmy Smith`（RG 與原盤 credit）《Open House》 | **`Jimmy Smith`** | c-140 b 第 563 條、c-141 a 第 573 條同判；池中 40 列 |
| `The Jazz Crusaders`（credit，掛在群組 fcb79f1a `The Crusaders`）《Lighthouse \'68》 | **`The Jazz Crusaders`** | 照 c-141 a 第 573 條：改名前後的既有分法、不是分裂；池中 `The Jazz Crusaders` 1 seed＋c-141 a 1、`The Crusaders` 5（1971 後）。MB release 817a2781（Applause CD）credit 用「The Crusaders」 |
| `Frank Foster`《Manhattan Fever》 | **`Frank Foster`**（新掛名） | MB c62ceb28 Person，US，1928-09-23–2011-07-26，「saxophonist」；池中零張 |
| `Tyrone Washington`《Natural Essence》 | **`Tyrone Washington`**（新掛名） | MB 2c77572d Person，US，1944–；池中零張，**MB 同字串只有這一個實體**，無消歧問題 |
| `Andrew Hill` ×2／`Hank Mobley`／`McCoy Tyner`／`Lee Morgan`／`Duke Pearson`／`Blue Mitchell`／`Booker Ervin`／`Jackie McLean` | 照 MB＝照池中 | 同字串 |

**第 307 條預警 2 筆（寫給後批與本機）**：
1. **`Frank Foster`**：MB 同字串三個 Person——本卡的薩克斯手 c62ceb28、鄉村創作歌手 d9684478（score 95）、小提琴 cfa6f9c9，另有群組 `Frank Foster Quintet`／`Quartet`／`Sextet` 與 **`Frank Foster and The Loud Minority`（39d07a3b）**。⚠ **而且撞到同名盤**：Apple 同一次查詢回的 1806988030 是 Loud Minority 的《Manhattan Fever》（1978，4 軌）——**盤名與掛名子字串都撞，上架比對必須帶 catno BST 84278**。
2. **`The Contemporary Jazz Quintet`**：MB 有 US 16d697f2（Kenny Cox 的底特律團，本卡）與 **DK e6be0d2e（60 年代丹麥爵士）**兩個群組；`Kenny Cox` 同字串亦有三個 Person（US 爵士鋼琴 fd303f18、Stringtown 團員、英國搖滾吉他）。日後任何這兩個字串進池都要先帶消歧。

## 第 584 條（同批）：**Live 1 張（MB 有標）；vault 盤 2 張；「同場拆成兩張」1 對、「同一批錄音拼成一張」2 張**

- **《Lighthouse \'68》**：MB secondary-types `["Live"]`、enum `live: true`，演出場所 The Lighthouse（Hermosa Beach, CA）是真俱樂部，1967-11-10～13 連四晚——卡單標現場。其餘 18 張 secondary-types 空、盤面無現場跡象（Van Gelder 16 張、United Sound Systems Detroit 1 張、RPM International Studios LA 1 張），**沒有第 397 條「MB 沒標的現場」**。
- **vault 盤 2 張**（Lion 期錄音、Liberty 期出版，派工信坑 1、第 575 條）：**《Andrew!!!》**（1964-06-25 錄、1968-04 出，四年）與 **《Open House》**（1960-03-22 錄、1968 出，**八年**，本線 1967–84 段目前最長的一張）。兩張的 `year` 都取首發年，錄音年進正文。
- **《Open House》↔《Plain Talk》（BST 84296，1968-04）**：**同一天同一批人的一場錄音被拆成兩張 LP**（jazzdisco 4200 頁；1992 年 Blue Note CDP 7 84269 2 又把兩張合發）。**《Plain Talk》不在本批 slice、實掃池中亦零張**——留給後批，兩卡到時要 risk 互指、正文不得互抄（派工信坑 6 的變體：不是 Volume 拆盤，是「同場拆成兩個盤名」）。
- **「一張碟兩場」2 張**：《Serenade to a Soul Sister》（1968-02-23 Turrentine／Cranshaw／Roker 三軌 ＋ 1968-03-29 Maupin／John Williams／**Billy Cobham** 三軌）與《The Phantom》（1968-06-24 一軌，康加 Victor Pantoja ＋ 1968-09-11 五軌，康加 Carlos "Patato" Valdés）——**正文都不得寫成一場**。另《Elegant Soul》是連續兩天（09-19／20）同一編制，可寫成一次。

## 第 585 條（同批）：**同班底拆盤與跨卡互指——本組 7 組，正文不得互抄**

1. **Blue Mitchell《Heads Up!》（1967-11-17）↔ c-141 a《Boss Horn》（1966-11-17）**：**整整一年前的同一天**、同樣是 Duke Pearson 一脈編曲的大編制，Dodgion／Junior Cook／Pepper Adams／Priester／Gene Taylor 五人重疊——**但鋼琴（Boss Horn 是 Cedar Walton＋Chick Corea，本張是 McCoy Tyner）與鼓（Mickey Roker vs Al Foster）都不同**，兩卡 risk 已互指。
2. **Duke Pearson 三處**：《Introducing…Big Band》領班（1967-12-15 大樂團）、《The Phantom》領班（1968-06／09 拉丁小編制）、c-141 a《Sweet Honey Bee》——三場三編制，同字串三張卡。
3. **Woody Shaw 三處**：《\'Bout Soul》（1967-09-08）、《Natural Essence》（1967-12-29）、《Reach Out!》（1968-01-19）——都是側人，三場全不同。
4. **Booker Ervin 兩處**：《The In Between》領班（1968-01-12）↔《Grass Roots》側人（1968-08-05）；另 c-141 a《Structurally Sound》是 Pacific Jazz 的第三場。
5. **McCoy Tyner 兩處**：《Time for Tyner》領班（1968-05-17）↔《Heads Up!》側人（1967-11-17）；c-141 a《Tender Moments》（1967-12-01）是第三場。
6. **Stanley Turrentine 兩處**：《Common Touch》領班（1968-08-30，Shirley Scott）↔《Serenade to a Soul Sister》聯名（1968-02-23，Horace Silver）——同年兩種身分。
7. **Frank Foster 兩處**：《Manhattan Fever》領班（1968-03-21 六重奏）↔《Introducing Duke Pearson\'s Big Band》薩克斯組（1967-12-15）。
另 **Bob Cranshaw／Mickey Roker 在本組出現四次**（Manhattan Fever、Serenade、The Phantom、Big Band）、**Billy Higgins 兩次**（Reach Out!、!Caramba!）、**Freddie Waits 兩次**（Grass Roots、Time for Tyner）——正文寫節奏組時務必分場。
**再一組給後批**：《That Certain Feeling》（1968-03-08）與池中既有的 Lou Donaldson《Midnight Creeper》（BST 84280，1968-03-15）**只差一週、都在 Van Gelder，但班底完全不同**（Donaldson 那場是 Blue Mitchell／Lonnie Smith／George Benson／Leo Morris）。

## 第 586 條（同批）：**盤名——印刷體撇號摺 ASCII 1 張、倒驚嘆號照 RG 1 張、曲名拼法坑 2 處、其餘照 MB RG title**

| MB RG title | 卡上盤名 | 說明 |
|---|---|---|
| `’Bout Soul`（U+2019） | **\'Bout Soul** | 第 473／506／566 條；1968 原盤 release title 也是 U+2019，MB 原字串進 queryAlias |
| `!Caramba!` | **照 RG，前後各一個 ASCII 驚嘆號** | ⚠ Discogs 原壓與 jazzdisco 寫「Caramba」（無驚嘆號）、1996 CD 與 2022 黑膠寫 **「¡Caramba!」（倒驚嘆號 U+00A1）**——依第 556／566 條照 RG，兩種變體進 queryAlias；**倒驚嘆號會讓標題比對失準，上架務必用 RG 寫法** |
| `Introducing Duke Pearson’s Big Band`（RG 用 ASCII 撇號） | 照 RG，ASCII | Discogs 23036468 的條目名用 U+2019，不採 |
| `Andrew!!!` | 照 RG，三個驚嘆號 | 維基沒有本張條目（`Andrew!!!` 重導消歧義頁），年份與班底出自 jazzdisco＋Discogs master 360619＋Mosaic MR10-161 |
| `Introducing Kenny Cox and the Contemporary Jazz Quintet` | 照 RG 長題 | 與掛名字串不等，`selfTitled` false |
| 其餘 14 張 | 照 RG 逐字 | 同名撞擊見第 587 條 |

**曲名拼法 2 處（寫作層要照通行拼法、MB 不改）**：
1. **《Andrew!!!》第 1 軌**：MB 原盤登「The Groits」，**jazzdisco 明確註記「mistitled as The Groits」、正確是「The Griots」**。
2. **《Lighthouse \'68》第 1 軌**：MB 登「Oogo-Boo-Ga-Loo」，維基與當年單曲面是「Ooga-Boo-Ga-Loo」。
另《Open House》第 3 軌 MB「Sista Rebecca」／jazzdisco「Sister Rebecca」。

## 第 587 條（同批）：**MB 資料層面的坑 8 個（本層不改 MB）**

1. **《!Caramba!》b3ba26ce 登成「1968 US **CD** 6 軌」**——1968 年不可能有 CD，且六軌裡的〈A Baby\'s Smile〉維基明標「Bonus track on CD」、jazzdisco matrix 3005–3009 只有五首。**真正的原盤是 5 軌 LP。** ⚠ **這是第 567 條第 1 點（catno 號段與年份不相容）的新變體：不是 catno 對不上，是「載體與年份不相容」**——1948 前的「LP」、1982 前的「CD」、1993 前的「Digital Media」都該當場亮燈。**CAA 的圖也是掛在這筆。**
2. **《Presenting Joe Williams…》1635c3d5 把 1968 repress 當原盤**（Discogs 同號 1966 兩筆才是原壓，1968 兩筆都標 Repress）——RG frd 因此錯成 1968，enum 分段被帶偏。
3. **《Jazz Classic Volume 2》f71548d7 的 `secondary-types` 是空的**，而 Discogs 六筆 BST 81202 全標 Compilation——第 397 條在 Compilation 方向的再一例（第 580 條退表 #3）。
4. **只建 mono、stereo 沒建**：《Serenade to a Soul Sister》（e57e2c9b＝BLP 4277）；**反向（只建 stereo）**：本組其餘 17 張 Blue Note 盤全部只有 BST 號。**唯一兩號都建的是《Natural Essence》**（BLP 4274 b0dbb8c5 ＋ BST 84274 7a9ae7c5）。
5. **status 空／bare 建檔**：《The In Between》623c0b7a（**無日期無國別無廠牌無 catno** 的 CD）與 7779a5a5（1997 US CD，status 空）、《Time for Tyner》1bf35b36（1995 US CD，status 空）。
6. **同 barcode 重複建檔**：《Reach Out!》1997 US 5192975e 與 XE 20bd7ec2（724385996429）、《Time for Tyner》2005 US 2ceeeadb 與 3c80f08c（724356383920）、《!Caramba!》2022 b3cbc7e7 與 f7131d28（602438761852，一筆無國別）。
7. **無 catno**：《Introducing Duke Pearson\'s Big Band》1998 US CD 5b874c98（catno 7243 4 94508 2 0 出自 jazzdisco）、《!Caramba!》原盤 b3ba26ce、《\'Bout Soul》1997 CD eeafb8a0 無 barcode。
8. **RG 轄下只有 1–2 筆、CD 化史缺**：《Open House》（**1 筆**）、《Jazz Classic Volume 2》（1 筆）、《Natural Essence》（2 筆，連一張 CD 都沒有）、《Manhattan Fever》《That Certain Feeling》《Elegant Soul》《Heads Up!》《\'Bout Soul》（各 2 筆）——研究層以 Discogs master 補。
另：**19 張原盤 release 沒有一筆填軌長**，寫作層不得引軌長。

## 第 588 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 18/19 命中、1 張三種查法全落空；CAA 17/19，其中 7 張的圖來源是再發不是原盤**

- **命中且軌數與原盤一致**：Common Touch（724869927 7 軌＝1997 CD 形）、Reach Out!（781561645 RVG 6 軌）、Natural Essence（1467243764 6 軌）、That Certain Feeling（1438184740 6 軌，掛「Big John Patton」）、Time for Tyner（1443282060 6 軌）、Elegant Soul（716251274 9 軌）、Serenade to a Soul Sister（724490548 RVG 6 軌）、The Phantom（1445883152 6 軌）、Heads Up!（1438776424 6 軌）、The In Between（716627142 6 軌）、!Caramba!（724256045 6 軌＝CD 形）。
- **命中但只有 CD／擴充形**：Grass Roots（724719257 **10 軌**＝2000 CD，bonus 是 1968-04-19 另一場六重奏）、Andrew!!!（715987966 8 軌）、Manhattan Fever（715516448 **11 軌**，bonus 錄於 1969-01-31）、Introducing Kenny Cox（716068112 **12 軌**＝2007 Connoisseur）、Introducing Duke Pearson\'s Big Band（1443550883 **15 軌**，第 10–15 軌錄於 1968-12-03）、Lighthouse \'68（716096654 10 軌；**另有 1507011032 6 軌＝原盤形，兩個版本都在**）、\'Bout Soul（1361796571 6 軌）——bonus 全在原序之後，「前 N 軌對應原盤」可採（c-130 Perfect 先例），**但 Grass Roots／Manhattan Fever／Big Band 的 bonus 班底與場次都不同，寫作層要註明**。
- **換詞才中 1 張**：**《Serenade to a Soul Sister》**第一個查詞（藝人＋盤名）只回《Silver\'s Serenade》兩筆近似盤，換成完整句才命中。
- **⚠ 三種查法全落空 1 張**：**《Open House》**（「Jimmy Smith Open House」「Jimmy Smith Open House Blue Note」「The Incredible Jimmy Smith Open House」）——改查「Open House Plain Talk Jimmy Smith」只回**姊妹盤**《Plain Talk》（1443283445／1587407764，4 軌）。**本張疑似未上串流，而同場的另一半上了**——這是本組唯一店面掛零的。
- **本組 Apple 沒有出現空 body**（c-140 b 第 568 條那種），19 次查詢全部一次回應；**但同名盤混入一次**（Frank Foster and the Loud Minority《Manhattan Fever》1978）。
- **店面掛名與本卡不同**：Gene Harris & The Three Sounds、Duke Pearson (feat. Bobby Hutcherson)、Kenny Cox、Stanley Turrentine（無 featuring）——上架比對要用店面寫法。
- **CAA：19 張裡 17 張有 front**；**來源是原盤 release 的 10 張**（Common Touch d066156b、Andrew!!! d51d9cbb、Manhattan Fever e6bdb76b、Reach Out! 70b0e803、Natural Essence b0dbb8c5 mono、That Certain Feeling 928da3a6、Lighthouse \'68 575ce0a6、Elegant Soul acaa1a1c、The Phantom 7cdb19b4（1968 德國同期壓片）、Heads Up! c83895c2）；**非原盤圖 7 張**（Grass Roots 2000 XE CD、Kenny Cox 2007 CD、Time for Tyner 2005 US CD、!Caramba! 那筆登錯載體的 b3ba26ce、Serenade 1988 US CD、The In Between 1997 CD、\'Bout Soul 1997 CD）——研究層看版式，各卡 risk 已列 Discogs 原壓條目 id。
- **CAA 404 兩張**：**《Open House》**與 **《Introducing Duke Pearson\'s Big Band》**——封面研究層要另尋（Discogs 原壓 13057784／22807073）。
- ⚠ **CAA 的 500 要重抓**：《That Certain Feeling》e697d401 前一支代理存下的 `.caa.json` 是 **nginx 500 錯誤頁**，本層重抓（RG 端點回 307 轉址，跟隨後得到 4 圖、來源原盤）——**「沒有圖」與「伺服器炸了」長得一樣**（失敗與正常長得一樣家族），後批的 CAA 腳本要把 HTTP 狀態碼寫進輸出檔、且 `redirect: follow`。

## 第 589 條（同批）：**交件數字、實掃順帶、中間檔、給後批**

- **交件 19 張、17 位；退 3**（第 580 條：第 313 條他廠 2＝Solid State 1／Capitol 1，第 312 條合輯 1）；年份改判 3（第 581 條）；`label` 改他廠 1（第 582 條）；掛名群組收攏 4、既有分裂取多數 1、盤面收攏 1、聯名收攏 2、**新掛名 2**、第 307 條預警 2（第 583 條）；現場 1、vault 2（第 584 條）；盤名 ASCII 1、倒驚嘆號 1（第 586 條）；CAA 17/19（第 588 條）。
- `chk-prop a b`：**標記 0**（a 20 張 19 位、b 19 張 17 位，合計 39 張 25 位；跨批 3 筆已知舊帳）；與同批 a 組及 c-135～c-140 的 251 個 rgMbid 交叉 **0**。
- 掛名層實掃：Andrew Hill 9 seed＋Trio 1／Stanley Turrentine 5 seed＋各批 17／Shirley Scott 4／Frank Foster **0**／Hank Mobley 9＋15／Kenny Cox **0**、The Contemporary Jazz Quintet 1／Tyrone Washington **0**／Big John Patton 3 seed＋4 ＋ John Patton 1／Joe Williams 1（＋Big Joe Williams 1 不同人）／Thad Jones & Mel Lewis 2＋Thad Jones 5／McCoy Tyner 6＋7／The Jazz Crusaders 1＋1、The Crusaders 5／Lee Morgan 12＋15／Gene Harris 1、The Three Sounds 1＋20／Ella Fitzgerald 12（含王牌 3）／Horace Silver 8＋17＋王牌 1／Duke Pearson 1＋7／Sidney Bechet 3＋各批 3、Bechet All Stars 1／Jimmy Smith 11＋29／Blue Mitchell 4＋3／Booker Ervin 4＋1／Jackie McLean 9＋9（＋兩個聯名字串 3）。
- 中間檔 `scratchpad/c141b/`：`c141b-mbfetch.mjs`＋`mb/`（22 個 RG 的 rg／rel／caa 回傳，前一支代理留下；本層另加 `art-*`／`rg-*`／`rel-*` 六個 MB 搜尋與重抓的 `e697d401.caa.json`）、`c141b-mbsum.mjs`／`.txt`（逐張摘要）、`c141b-tracks.mjs`／`.json`（19 張原盤軌序）、`c141b-poolscan.mjs`／`.txt`（實掃全文，19,006 列）、`c141b-wiki.mjs`＋`wiki/`（23＋3 個維基條目，含 infobox／track listing／personnel）、`c141b-discogs.mjs`＋`discogs/`（28 個 catno／master 反查）、`c141b-apple.mjs`／`c141b-apple.json`（店面 search）、`c141b-jd.mjs`／`c141b-jdsess.mjs`／`c141b-jdsess.txt`＋`web/`（jd-index、4300／1200／BN-LA 目錄頁、4200／4300 session 頁；**前一支代理抓的四個 `blue-note-catalog-*.html` 全是 404 空殼，URL 形狀錯，本層重抓時改用 `/blue-note-records/catalog-<n>-series/album-index/`**）、`c141b-build1～4.mjs`（卡單產生）。
- **給後批（1969–84 段）**：
  1. **1969 年出版、目錄號 84302／84307／84315 的三張已在本批收掉**（rgMbid 見 prop-b），1969 段的 slice 若再排到同 RG 一律退。
  2. **《Plain Talk》BST 84296（1968-04，與本組《Open House》同場）** 實掃池中零張、本批 slice 也沒有——**後批看到要收，兩卡 risk 互指**。
  3. **Booker Ervin 的第二張 Blue Note（BST 84314，1968-05-24 Woody Shaw／Kenny Barron／Jan Arnett／Billy Higgins，五軌）從未發行、MB 也無 RG**——正文可寫「Blue Note 只出過一張」，不得寫「只錄過一場」。
  4. **Thad Jones/Mel Lewis 與 Joe Williams 的 Blue Note 自家號**（BST 84346《Consummation》1970、BST 84355《Worth Waiting For》1970）照收；**Solid State 原盤照第 582 條判準表 (c) 退**。
  5. **Gene Harris／The Three Sounds 1969 後改叫 `A New Sound From The Three Sounds`（BST 84341《Soul Symphony》1969，jazzdisco）**——掛名要沿用池中 `The Three Sounds`。
  6. **Eddie Gale《Black Rhythm Happening》BST 84320（1969）、Andrew Hill《Lift Every Voice》BST 84330（1970）、Art Blakey《Roots & Herbs》BST 84347（1970）**——c-141 a 第 579 條把 Roots & Herbs 記成 84303，**實為 84347**（84303 是本組的《Grass Roots》），jazzdisco 4300 目錄頁可核。

## 第 589a 條（主線 2026-09-16，b 組交件後）：**三格判準表追認；管線的 CAA 腳本本來就防了 500**

1. **第 582 條的三格判準表追認**：(a) 1985 前有 BN 目錄號→收；(b) 無 BN 號但出版當時原廠與 Blue Note 同屬 Liberty／UA→收、`label` 寫原廠；(c) 其餘→退。
   **《Presenting Joe Williams and Thad Jones/Mel Lewis》退得對**——1966 年 UA 與 Liberty 還是兩家公司，套不上 (b)。
2. **b 組回報的「CAA 500 與沒有圖長得一樣」是代理自己臨時 curl 的問題，不是管線的**：
   `batch-progress/probe-caa-generic.mjs` 本來就有 `redirect: 'follow'`、`status >= 500` 重試三次、
   非 404 的失敗記進 `probeError` 並把 `probed` 設 false。**管線不改。**
   但**代理臨時抓取時要自己防**——這條寫進往後的策展派工信。
3. **第 567 條的判準擴充（b 組第 58x 條）**：不只「catno 號段與年份不相容」，還有**「載體與年份不相容」**——
   1948 前的 LP、1982 前的 CD、1993 前的 Digital Media 一律亮燈（《!Caramba!》被登成 1968 US CD 6 軌，
   真正的 LP 是 5 軌、第 6 軌是 CD bonus，**CAA 的圖還掛在那筆**）。
4. **這一段的年份錯誤形狀變了**：84269–84303 段資料庫與 jazzdisco 幾乎全對，錯的是
   **「跨年出版被四捨五入到錄音年」，只發生在 1968 年 5 月後錄的 84300+ 號段**——**判準是看錄音月**。
   ⚠ **jazzdisco 不是單一可信來源**（84302／84307 比資料庫準，84315 卻與同期紙本站反邊）——要配號段鄰居一起看。
5. **訂正 a 組第 579 條**：Blakey《Roots & Herbs》是 BST 84347（1970），不是 84303（那是《Grass Roots》）。
6. **《Plain Talk》BST 84296 池中零張、本批 slice 也沒有**（與《Open House》同一場 1960-03-22 錄音拆成兩張）——**後批要收**。

## 第 590 條（主線 2026-09-16，研究層 a 組交件後）：**a 組 20/20 full；19 張年份定死，並撤掉第 571 條兩張「最弱改判」的 risk**

**研究層的四處改動全部追認**（都往「證據變硬」的方向走）：
1. **撤掉《New and Old Gospel》與《Blackjack》的「最弱改判」risk**：
   前者有 Billboard 1968-01-13 新片欄 ＋ 01-27 兩刊整版廣告 ＋ 四星評論；
   後者有 **Billboard 爵士榜 1968-04-27→06-01 連續六週、最高 #17**。
2. **《The Festival Album》的「1966 說」不成立**（Cash Box 1967-02-25 發片預告＋1967-03-18 評介；
   第二場錄音才 1966-10-08）。
3. **推翻 Discogs 對《A New Conception》的 1966**（＝錄音年；Cash Box 1967-12-02 評介、Billboard 1967-12-09 新片欄）。
4. **《Tender Moments》從「Schwann，弱」換成 Billboard 1968-07-27 同期新片欄。**

**年份有疑議只剩 1 張**：Eddie Gale《Ghetto Music》——卡單 1968 是目錄年，但兩刊的評介都在 **1969-01-25**，
1968 年內查無新片欄或廣告。**維持 1968，但正文不得寫具體上市月。**

⚠ **第 58x 條（a 組立的，寫進 SOURCES 表）：Billboard 的「Best-Selling Jazz LP's」榜是判 1967–69 上市月最硬的一條。**
榜列印「在榜第幾週」，**一張碟不可能在上市隔年才以第 1 週進榜**。**有進榜的碟，榜位比評論欄、比新片欄都硬。**

## 第 591 條（同日）：**a 組四張缺試聽全部補齊；兩個下游要注意的坑**

**串流採信**：Hi Voltage `724925658`、Boss Horn `716323306`、New and Old Gospel `716131477`、Slow Drag `723533139`
——四張都逐軌對上原盤、全軌有 preview，主線已補進 `previews.json`。**c-141 試聽 36/39**（缺的 3 張在 b 組）。

⚠ **第 307 條（同名撞擊）又中一次**：《Easterly Winds》的 Jack Wilson，
scratchpad 抓到的是**英國樂團領班 Jack Wilson（1907–2006）**，本卡是**美國爵士鋼琴家（1936–2007）**。
**寫作層查生平務必走 `Jack Wilson (jazz pianist)`。**

⚠ **第 509c 條（紙本誤植目錄號）在這一段極密集**：Billboard 把《Blackjack》catno 印成 84250、
把《New and Old Gospel》印成 BLP 4252 **且掛名寫「Various Artists」**、把《Look of Love》配成 84268；
**Blue Note 自家廣告**把《Contrasts》的 84266 安給《The Gigolo》，**同一則錯誤同週登在兩刊**。
——**同一則錯誤同時出現在兩份刊物，不是兩個獨立來源**（第 431 條的紙本版）。各卡 notes 已逐條標。

## 第 592 條（同日）：**a 組自抓的 187 期紙本收進 repo，Cash Box 1966–69 至此無缺口**

- `batch-progress/enum/cashbox-bn-1968-69-ocr.txt`（4.3 MB，**1968-01-06 → 1969-06-28 共 77 期命中頁**）
- `batch-progress/enum/billboard-bn-1967-69-ocr.txt`（7.3 MB，**1967-01-07 → 1969-04-26 共 110 期命中頁**）

⚠ 這兩份存的是**關鍵字命中頁**（關鍵字是 c-141 a 的目錄號與盤名），**查別的碟要重抓或放寬關鍵字**。
抓取端兩個坑已寫進 SOURCES 表：**Billboard 1968-08 起、整個 1969 年改成 `BB-YYYY-MM-DD.pdf`**；
Cash Box 每期約 12 MB，`pymupdf` 直接讀文字層即可。
