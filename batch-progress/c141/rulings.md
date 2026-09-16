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
