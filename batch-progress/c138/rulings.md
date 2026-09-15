# c-138 裁定（a 組 510 起、b 組 520 起，append）


## 第 520 條（2026-09-15，c-138 b 組）：**22 筆覆核結果——實收 22、退 0；rgMbid 全部照 enum 檔，無一釘錯；年份改判 4；CAA 21/22**

`slice.json` 的 `g: "b"` 22 筆（1960–61，BLP 4036–4102 ＋ Pacific Jazz／Capitol 原盤 5 張）逐筆回問 MB `release-group`（inc=artist-credits+releases）
與 `release?release-group=…&inc=media+labels+artist-credits`，title／artist-credit／first-release-date／catno／載體／軌數逐筆對過；
CAA 打 `coverartarchive.org/release-group/<id>`。**enum 的 rgMbid 沒有一筆釘錯。**
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c13x/prop-*.json`（合計 18,650 列），
掛名 24 個關鍵字子字串雙向（Blakey／Messengers／Three Sounds／Parlan／Montgomery／Shearing／Boland／Sinatra……）、盤名 28 個關鍵字（含 `Vol.`／`Volume` 卷號統一、印刷體引號摺 ASCII）——
**22 筆撞池 0**（enum `inPool: false` 全部成立，本組沒有假陰性）。命中的都是不同的碟：《At the Half Note Cafe, Vol. 1》（池中，本組收 Vol. 2）、
`The Three Sounds — Introducing the Three Sounds`（池中 1 張，本組三張同字串）、日野皓正／Jessie Mae Hemphill 的同名《Feelin' Good》（不同掛名）。
b 組 22 個 rgMbid 與本批 a 組 slice 23 個、c-137 slice 45 個交叉：**重疊 0**（程式比對）。
`node batch-progress/c138/chk-prop.mjs b`：22 張、17 位，欄位 0、線上池撞卡 0、跨組 0、跨批 0（三筆舊帳是 c49b／cseab 的）、同 rgMbid 不同掛名 0——**標記 0**。

**退掉 0 張。** 最接近退件的一筆是 Sinatra（第 526 條），照簡報一.3 收、標為可逆。

⚠ 實掃順帶抓到 `scratchpad/c138b/c138b-poolscan.mjs` 的一個坑：卷號統一把 `three`→`3`，於是掛名 `The Three Sounds` 被摺成 `the 3 sounds`、子字串 `three sounds` 命中 0——
**卷號摺疊只能套在盤名、不能套在掛名**，已另以 grep 補核（池中確有 1 張）。後批用同款腳本要留意。

## 第 521 條（同批）：**年份改判 4 張——MB `first-release-date` 三張＝錄音／演出日、一張＝placeholder（vault 盤）**

| 盤 | catno | 錄音 | MB | 改 | 依據 |
|---|---|---|---|---|---|
| Donald Byrd《At the Half Note Cafe, Volume 2》 | BLP 4061 | 1960-11-11（演出） | 1960-11-11 | **1961** | 唯一原盤 release 的 date 直接填演出日；維基兩集皆 1961；池中姊妹卡 Vol. 1 與 enum 對 Vol. 1 的 RG 都是 1961 |
| Donald Byrd《Royal Flush》 | BLP 4101 | 1961-09-21 | 1961-09-21 | **1962** | 原盤 release date＝session 日；維基 1962-09、Discogs 原壓 1962；4100 號段是 1962 的碟；⚠ Apple 715588020 同標 1961-09-21——同源（第 431 條） |
| The Three Sounds《Hey There!》 | BLP 4102 | 1961-08-13 | 1961-08-13 | **1962** | 同上形；維基 1962-08、Discogs 1962；目錄號在 4101 之後 |
| The Three Sounds《Babe's Blues》 | BST 84434 | 1961-08-13／1962-03-08 | 1961-01-01 | **1986** | 唯一 release 的 date 是「錄音年＋01-01」placeholder；維基「not released until 1986」、Discogs 原壓 1986；84434 是 1985–87 Capitol 期的庫存首發號段 |

**其餘 18 張 MB＝維基＝Discogs 原壓**（1960 ×2、1961 ×16），照 MB；其中 Sunny Side Up（1961-01）、Shades of Redd（1961-05）、Doin' the Thing（1961-08）、Let Me Tell You 'Bout It（1961-12）原盤 release 帶月份，
Goin' Up（維基 1961-05）、Grant's First Stand（維基 1961-05）、Jazz Corner Vol. 1（維基 1961-07）、Feelin' Good（維基 1961-09）、Carmell Jones（jazzdisco 1961-09）月份只寫 risk。
⚠ **《Babe's Blues》是 enum 分段的反向錯誤**：簡報提的 18 張是「MB 年份落 1985 後、號屬 Lion 期」被歸回；這張是「號屬 Capitol 期、MB 年份卻標 1961」被排進 Lion 期——
enum 的 note 判準（BN 首發晚原盤 3 年以上）抓不到它，因為 MB 只有一筆 release、年份就是 placeholder。**4000 系列後段可能還有同形（LT／84400 號段的 vault 盤），後批看到 BST 844xx 一律先疑。**
⚠ Apple 的 releaseDate 本組又一次幾乎全是錄音日或 01-01（Goin' Up 1960-11-06、Grant's First Stand 1961-01-28、Here 'Tis 1961-01-23、Royal Flush 1961-09-21）——第 484 條的形狀，不採。

## 第 522 條（同批）：**「原盤可能他廠」5 張逐張判——4 張成立（Pacific Jazz ×3、Capitol ×1）、1 張不成立（《The Golden Eight》原盤就是 Blue Note）**

| 盤 | enum note | 判 | `label` | Blue Note 的關聯 |
|---|---|---|---|---|
| 《Montgomeryland》 | BN 首發 2020 | 成立 | Pacific Jazz PJ-5（1960） | 只有 2020-02-21 數位再發（credit Wes Montgomery） |
| 《The Remarkable Carmell Jones》 | BN 首發 2023 | 成立 | Pacific Jazz PJ-29／ST-29（1961） | 2023-03 Tone Poet |
| 《Groovin' Blue》 | BN 首發 2025 | 成立 | Pacific Jazz PJ-19（1961） | 2025-03-07 Tone Poet ＋ 數位 |
| 《Sinatra's Swingin' Session!!!》 | BN 首發 1997 | 成立（但見第 526 條） | Capitol W-1491（1961-01-03） | 只有 1997 ES CD dabd0226 掛 Blue Note（同號 CDP 7 46573 2 的 1987 US 版掛 Capitol） |
| 《The Golden Eight》 | BN 首發 2015 | **不成立** | **Blue Note BLP 4092（1961）** | 原盤就是 Blue Note：Discogs master 700386、LondonJazzCollector 兩篇實體盤面；MB 那筆 1961 release（ddc913ba）**label-info 與 media.format 都空、credit 只寫 Kenny Clarke**，列舉腳本因此只看到 2015 Music Matters |

另《White Satin》enum 沒標 note（MB 數位版無日期），實查原盤 Capitol ST 1334（1960）、Blue Note 只有一筆無日期數位版——同第 472 條處理，`label` Capitol、`year` 1960。
**enum 的「他廠」判準只看 Blue Note 那筆 release 的年份，MB 原盤 release 沒填廠牌時會誤報**（Golden Eight），**Blue Note 數位版沒填日期時會漏報**（White Satin）——兩個方向都要逐張看。

## 第 523 條（同批）：**Live 標記——4 張 MB 標了、1 張 MB 漏標、1 張場地是咖啡館不標**

- **MB [Live] 且場地是真演出場地，照標**：Half Note Cafe Vol. 2（Half Note Cafe, NYC，1960-11-11）、Doin' the Thing（Village Gate，1961-05-19／20）、Up at Minton's Vol. 1／2（Minton's Playhouse，1961-02-23）。
- **MB 漏標（secondary-types 空、enum `live: false`）但實為現場**：《Meet You at the Jazz Corner of the World, Volume 1》——1960-09-14 Birdland（維基；盤名即 Birdland 招牌語「the Jazz Corner of the World」；2002 合併 CD 收 Pee Wee Marquette 報幕）。
  第 397 條「兩個方向都會漏」的實例，本卡當現場盤處理、mbNote 標明；**Vol. 2（BLP 4055，enum 1962 段）同形，下一批要一併標**。
- **不標**：《The Golden Eight》——LondonJazzCollector 寫「recorded live in Gigi Campi's gelateria」，但那是把科隆的咖啡館當錄音場地（第 485 條 Manhattan Towers 的鏡像），MB secondary-types 空、無觀眾記錄；risk 已寫「正文不得寫成現場」。
（prop 欄位沒有 `live` 欄；依第 253 條在 `mbNote` 寫明現場與演奏日、`risk` 標場地性質。）

## 第 524 條（同批）：**同場拆盤與同碟重複 RG——本組 3 對互指、2 個重複 RG 給後批**

同場拆兩張（各算一張、`risk` 互指、正文不得寫成兩場）：
- Half Note Cafe Vol. 1（池中，RG 4b997be7）↔ **Vol. 2（本組）**；
- Up at Minton's Vol. 1 ↔ Vol. 2（本組兩張）；
- Jazz Corner of the World Vol. 1（本組）↔ Vol. 2（RG 76752ee1，BLP 4055，1962-05，**enum 1962 段、下一批**）。
同日錄音拆兩張（不同曲目、發行相隔 25 年）：《Hey There!》（1962）↔《Babe's Blues》第 2–10 軌（1986）——各算一張，正文不得互抄曲目。
同班底相隔五天的兩場：《Here 'Tis》（1961-01-23）↔《Grant's First Stand》（1961-01-28），Willette／Green，正文不得互抄成同場。

**同碟重複 RG（第 481 條形狀，chk-prop 抓不到），留給後批退**：
1. **26026a87**《Up at "Minton's", Vol. 2》——只掛 2019 JP CD UCCQ-9530（enum 2019 段、「僅 JP 盤」），與本組釘的 d3af3051（BLP 4070）是同一張碟。
2. **236ad61d**《At the Half Note Cafe, Volumes 1 & 2》（1997 合併 CD，enum 1997 段、inPool 被 Vol. 1 子字串誤判 true）與 **d9c8c46a**《Meet You at the Jazz Corner of the World》（2002 合併 CD，enum 2002 段）、**96ddfbe9**《Up at "Minton's"》（1994 合併 CD）——三張是 Vol. 1＋2 合併再發，不是新碟，後批應退（理由分類：合併再發）。

## 第 525 條（同批）：**掛名裁定——編制實體收攏到本人 4 張、側人並列收攏到領班 3 張、對等聯名 2 張、新掛名 5 個過第 307 條**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組 e9ac5139）《Doin' the Thing》 | **`Horace Silver`** | 第 482 條先例（Stylings of Silver）；池中 14 張；**a 組《Horace-Scope》同掛 Quintet，主線對齊** |
| `Horace Parlan Quintet`（群組 cfb32858） | **`Horace Parlan`** | 池中 8 張（`The Horace Parlan Trio` 1 張是既有分裂，不往那邊加）；1998 CD credit 只寫本人 |
| `Freddie Redd Quintet`（群組 b2c51717） | **`Freddie Redd`**（MB Person f30eb5d7） | 第 462 條；池中零張；**a 組《The Music From The Connection》slice 掛「Freddie Redd Quartet」，主線收件時同收攏，否則第一張就分裂** |
| `The George Shearing Quintet and Orchestra`（群組 61947bfa） | **`George Shearing`** | 池中 1 張（Beauty and the Beat!）；**c-137 a 組《Black Satin》《The Shearing Piano》同字串** |
| `Art Blakey & The Jazz Messengers`（群組 209ddf15） | **`Art Blakey and the Jazz Messengers`** | 第 470 條；池中 12 ＞ 5，不往 `&` 加 |
| `Donald Byrd with Pepper Adams, Duke Pearson, Laymon Jackson & Lex Humphries` | **`Donald Byrd`** | 第 462 條側人並列；池中 Vol. 1 同掛 |
| `Carmell Jones also featuring Harold Land` | **`Carmell Jones`**（Person 7c2b9eb2） | featured 側人不是聯名；新掛名，第 307 條反查無同字串 |
| 七人並列《Montgomeryland》 | **`Wes Montgomery`** | 見下段 |
| `Curtis Amy & Frank Butler` | **`Curtis Amy & Frank Butler`** | 第 363 條第 1 型對等雙領班，`&` 照 MB；兩位皆新掛名，反查無同字串 |
| `Kenny Clarke with Francy Boland and Company` | **`Kenny Clarke & Francy Boland`** | 對等雙領班（封面「Kenny Clarke – Francy Boland And Company」），MB join phrase 不是 `&`，依第 452 條聯名用 `&`；**刻意不用群組 `The Kenny Clarke - Francy Boland Big Band`（df282891，1963 後的大樂團）**；兩位皆池中零張 |
| `Leo Parker`／`The Three Sounds`／`Stanley Turrentine`／`Grant Green`／`Lou Donaldson`／`Freddie Hubbard`／`Frank Sinatra` | 照 MB＝照池中 | 同字串；`Leo Parker` 新掛名反查無同字串 |

**《Montgomeryland》是本組唯一需要研究層再看的掛名**：MB 與 Discogs 都是七個 Person 並列，沒有單一領班；但 jazzdisco 記兩場都是 Wes Montgomery 領班的五重奏、1990 後所有再發（Pacific Jazz CD《Far Wes》、JP 盤、Blue Note 2020 數位、Apple）只掛 Wes——
依第 462 條「側人並列收攏到領班」＋第 45 條現行流通名掛 `Wes Montgomery`（池中 8 張）；七人 credit 與 `The Montgomery Brothers`（MB 群組 90459508，池中零張，那是 1960 後 Fantasy／Riverside 的三兄弟編制）全進 queryAlias。
判準 2（可逆：改卡單值）當場定。

## 第 526 條（同批）：**《Sinatra's Swingin' Session!!!》收——但這是本批 Blue Note 關聯最弱的一筆，主線可退**

MB 轄下 8 筆只有 dabd0226（1997 ES CD，CDP 7 46573 2）label 掛 Blue Note；todocoleccion 有「CD BLUE NOTE – Sinatra's Swingin' Session! And More」西班牙實體、Discogs release 6523152（1997 CD）存在，
本層 Discogs 403 未核到 label 欄。**這不是第 480 條那種「掛錯 RG 的別張合輯」**（release 內容確實是本碟 15 軌），也不是第 472 條那種「Blue Note 買下母帶」（Sinatra 母帶在 Capitol），
而是 EMI 西班牙 1990 年代把 Capitol 人聲目錄套進 Blue Note 系列包裝。簡報一.3 的規則是「原盤他廠 → 原廠年、原廠 label」，沒有「Blue Note 只是包裝方就退」的條款，
且池中 Sinatra 12 張裡 Swingin' 三部曲缺這第三張——**照規則收、`label` Capitol、`year` 1961、曲風 jazz＋pop（池中先例）**；
主線若判 Blue Note 線不收 Capitol 流行人聲，刪卡單即可（判準 2 可逆）。**同形會在 Capitol 期（1985 後）大量出現（Nat King Cole、Peggy Lee、June Christy 的數位再發全掛 Blue Note）**，c-137 a／b 的 June Christy、Peggy Lee 已經是了——建議主線一次定「Capitol 人聲目錄走不走這條線」。

## 第 527 條（同批）：**盤名——三張印刷體引號換 ASCII、一張取原盤題名對齊姊妹卡、其餘照 MB RG title**

- 印刷體 `’`→ASCII（第 473 條）：《Let Me Tell You 'Bout It》《Goin' Up》《Grant's First Stand》《Here 'Tis》《Sinatra's Swingin' Session!!!》（1961 原盤 release title 本來就是 ASCII，MB RG title 才用印刷體）。
- **《Up at Minton's, Volume 1》**：MB RG title 是「Up at "Minton's", Vol. 1」（帶引號＋Vol.），但 1961 原盤 release 99d61c8c 題「Up at Minton's, Volume 1」、Vol. 2 的 RG title 也是「…, Volume 2」——
  依第 473 條取原盤題名、與姊妹卡同形；MB RG title 與 Apple 寫法進 queryAlias，要改回只改卡單值。
- 照 MB RG title 但變體很多、留研究層（第 483 條）：《Doin' the Thing: Live at the Village Gate》（原盤「- At the Village Gate」、維基／Apple「The Horace Silver Quintet at the Village Gate」、RVG「(At the Village Gate)」）、
  《The Golden Eight》（Discogs／維基「The Golden 8」）、《At the Half Note Cafe, Volume 2》（池中姊妹卡寫 Vol. 1，第 473 條 Birdland 先例：卷號統一後不撞、不為對齊改）、
  《Meet You at the Jazz Corner of the World, Volume 1》（原盤「(Volume 1)」）。

## 第 528 條（同批）：**MB 資料層面的坑 4 個（本層不改 MB）**

1. **Half Note Cafe Vol. 2 的 catno 登錄成「11」**（release 4bdc08a7）——enum 說 4000 系列「MB 查無 4061」就是這筆造成的；卡上寫 BLP 4061。
2. **《The Golden Eight》1961 原盤 release（ddc913ba）label-info、media.format 全空、credit 只寫 Kenny Clarke**——enum 誤判他廠（第 522 條）。
3. **Doin' the Thing 的 BLP 4076 那筆記 5 軌**（可能把 Cool Eyes 主題拆算），原 LP 4 軌。
4. **first-release-date＝錄音日的三張＋placeholder 一張**（第 521 條）：Blue Note 4000 系列後段（4100 起）MB 這個欄位幾乎不能直接用，**後批一律先看轄下原盤 release 的 date 是不是與錄音日相同**。

## 第 529 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 一種查法 19/22 命中；CAA 21/22**

- 命中且形狀與原盤一致：Half Note Vol. 2（1443125518）、White Satin（1392586813）、Carmell Jones（1450312743）、Royal Flush（715588020）、Goin' Up（723410188）、Minton's Vol. 1／2（1436091771／1436190027）、Feelin' Good（1361824678）、Sunny Side Up（1442821674）、Groovin' Blue（1799309174）、Hey There（1379052334）、Babe's Blues（1455685290）、Montgomeryland（1498968787，11 軌 Far Wes 形）。
- 命中但只有 RVG／擴充版：Let Me Tell You 'Bout It（715978965，9 軌）、Doin' the Thing（715516295，6 軌）、Grant's First Stand（715929361）、Here 'Tis（721286185，6 軌）、Sinatra（723604164，15 軌 And More）——「前 N 軌對應原盤」留研究層逐軌比。
- **一種查法未命中 3 張**：《On the Spur of the Moment》（只回 Speakin' My Piece，且 Apple 把 Parlan 五重奏另立 artist）、《Shades of Redd》（只回 Connection 兩張）、《The Golden Eight》（只回續集 Encore!）；
  《Meet You at the Jazz Corner… Vol. 1》原 5 軌形未命中（只回 2002 合併 13 軌與 1959 那張）——只是觀察，研究層走藝人目錄與 collectionId。
- CAA：21/22 有 front；**404 一張＝《Up at Minton's, Volume 2》**（MB 轄下只有 1961 原盤一筆、無圖），可走 Discogs Vol. 2 原盤條目或 2019 JP 盤的圖。5 張的圖來源是再發（Let Me Tell You 'Bout It 2005 CD、Doin' the Thing 1988 CD、Minton's Vol. 1 2011 SACD、Feelin' Good 2004 JP CD、Golden Eight 2015 MM）——研究層看版式。

**中間檔**：`scratchpad/c138b/`（c138b-mbfetch.mjs／mb/*.json 22 個 RG 的兩端點＋CAA 回傳、c138b-mbsum.txt 摘要、c138b-poolscan.txt 實掃全文、c138b-apple.json 店面 search、c138b-build1/2.mjs 卡單產生）。

## 第 510 條（2026-09-15，c-138 a 組）：**a 組 23 筆覆核結果——實收 23、退 0；rgMbid 全部照 enum 檔，無一釘錯；年份改判 6；CAA 22/23**

`slice.json` 的 `g: "a"` 23 筆（1959–1960，BLP 4021–4088 ＋ World Pacific／United Artists／Pacific Jazz 原盤 9 張）逐筆回問 MB `release-group`（inc=artist-credits+releases）
與 `release?release-group=…&inc=media+labels+artist-credits`，再對每張的原盤 release 打 `release/<id>?inc=recordings` 取原 LP 軌序；CAA 打 RG 端點（404 的再打 release 端點）。
**enum 的 rgMbid 沒有一筆釘錯**（含 enum 標「原盤可能他廠」的 9 張，RG 本身都對，只是 enum 拿 Blue Note 那筆 release 的年份當 note）。
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c1xx/prop-*.json`（合計 19,458 列），
掛名 30 個關鍵字子字串雙向（含 Coltrane、Jim Hall／Red Mitchell／Red Kelly 這種可能以側人名字進池的）、盤名 26 個關鍵字（卷號統一、`&`→and、彎撇號摺 ASCII）——
**23 筆撞池 0**（enum `inPool: false` 全部成立）。命中的都是不同的碟：Bix Beiderbecke《Singin' the Blues》、Eric Dolphy《At the Five Spot》、ELO《Out of the Blue》、Ahmad Jamal《Happy Moods》（c-131）、
`Booker Little — Booker Little`（1960 Time，與本批 1959 UA 出道盤不同）、`John Coltrane` 30 張裡**沒有《Coltrane Time》**（見第 515 條）。
a 組 23 個 rgMbid 與 c-137 slice 45 個、c-138 b 組 22 個交叉：**重疊 0**（程式比對）；盤名＋掛名鍵也零重疊。
`node batch-progress/c138/chk-prop.mjs a`：23 張、21 位，欄位 0、線上池撞卡 0、跨組 0、跨批 0（三筆舊帳是 c49b／cseab 的）、同 rgMbid 不同掛名 0——**標記 0**。

**退掉 0 張。** 沒有一筆撞池、沒有合輯、沒有原盤他廠改判到要退的（他廠原盤依簡報一.3 是改 `label`／`year`，不是退）。

## 第 511 條（同批）：**年份改判 6 張——其中 2 張差兩年，列舉檔把 1962 年的碟排進了「1959–1960」這一段**

| 盤 | catno | 錄音 | MB frd | enum | 改 | 依據 |
|---|---|---|---|---|---|---|
| Art Blakey《Mosaic》 | BLP 4090 | 1961-10-02 | **1960-12-01**（數位版占位日，比錄音日早十個月） | 1960 | **1962** | 維基引 Billboard 1962-01-20；Discogs master 62494 記 1961（錄音年形）；轄下黑膠 960b525e 記 1961-10-02＝錄音日 |
| The Three Sounds《Here We Come》 | BLP 4088 | 1960-12-13／14 | 1960（＝錄音年） | 1960 | **1962** | 維基引 Billboard 1962-02-24；Discogs 1961；Apple 1961-12-24 |
| Duke Jordan《Flight to Jordan》 | BLP 4046 | 1960-08-04 | 1960-08-04（數位版占位日＝錄音日） | 1960 | **1961** | MB 轄下原盤黑膠 d7f4d415 自己記 1961-05；Discogs master 320425 記 1961 |
| The Three Sounds《Moods》 | BLP 4044 | 1960-06-28 | 1960-06-28（＝錄音日） | 1960 | **1961** | 維基 1961-02（引 RYM，弱）＋ Apple ℗ 1961 ＋ 目錄號夾在 4042（1960-09／11）與 4046（1961-05）之間；⚠ Discogs 記 1960，證據最弱的一張，研究層以 Billboard 覆核 |
| Kenny Burrell《On View at the Five Spot Cafe》 | BLP 4021 | 1959-08-25 | 1959（＝錄音年） | 1959 | **1960** | Discogs master 331502 與原壓 1960；Apple 1960-01-05／℗ 1960；維基 1959 無來源 |
| Dizzy Reece《Star Bright》 | BLP 4023 | 1959-11-19 | 1959（＝錄音年） | 1959 | **1960** | 維基 1960-03（正文「the following year」）、Apple 1960-03-02；⚠ Discogs 也記 1959——但錄音 11 月 19 日、同年出版不合節奏，且前一號 4021 已是 1960；研究層以 Billboard 覆核（第 431 條：維基與 Apple 的 3 月可能同源） |

**判準**：第 471 條（MB＝錄音年、Discogs／Billboard 晚一年 → 取晚）＋第 364 條 placeholder 形。
**⚠ 給主線的結構性發現**：enum 依 MB `first-release-date` 排序，而 4000 系列這一段 MB 的 frd **有四張恰等於錄音日、兩張等於錄音年**（第 518 條），
所以 1961–62 年出版的碟會被排進 1960 段——本批 #10／#23 就是。後面 1961–62 段的 slice 也會反過來少掉這幾張（它們已經在本批收了），
**c-139／c-140 若在 slice 看到 BLP 4090《Mosaic》或 4088《Here We Come》，那是同 RG，已收，退。**
維持 MB 的兩說盤：《Sunset Eyes》（MB／維基 1960、Discogs 1961，第 364 條第三型照 MB）、《Singin' The Blues》（MB／Discogs 1959、維基引 Deffaa 說 World Pacific 1958 再發、Rip 1956 原發——Rip 與 1958 都沒有實體條目，照 MB）。
其餘 15 張 MB＝Discogs（＝Billboard，有的話）。

## 第 512 條（同批）：**「原盤可能他廠」9 張全部成立——World Pacific 1、United Artists 5、Pacific Jazz 3；Blue Note 的關聯分三種**

| 盤 | 原廠原盤 | 年 | Blue Note 的關聯 |
|---|---|---|---|
| Jimmy Witherspoon《Singin' The Blues》 | World Pacific WP-1267 | 1959 | 1998 XE CD（Pacific Jazz／Blue Note）——**買下的 Pacific Jazz 系母帶** |
| Booker Little & Max Roach《Booker Little 4 & Max Roach》 | United Artists UAL 4034／UAS 5034 | 1959 | 1991 CD ＋ 2024 Tone Poet ＋ 2024 JP HQCD——**買下的 United Artists 爵士母帶** |
| Bob Brookmeyer & Bill Evans《The Ivory Hunters》 | United Artists UAL-3044／UAS-6044 | 1959 | 1994 CD |
| Milt Jackson《Bags' Opus》 | United Artists UAL 4022／UAS 5022 | 1959 | 1991 CD ＋ 數位版；⚠ **MB 未建美國原盤**，只建 GB London SAH-T 6049（1959-11），`label` 的 UA 目錄號出自 Discogs master 240958 |
| Cecil Taylor《Hard Driving Jazz》 | United Artists UAL 4014／UAS 5014《Stereo Drive》 | 1959 | 1991 CD（題《Coltrane Time》掛 John Coltrane，見第 515 條） |
| Zoot Sims & Bob Brookmeyer《Stretching Out》 | United Artists UAL 4023／UAS 5023 | 1959 | 只有 2016-10-07 數位版——**數位目錄才算進來的** |
| Clifford Brown《Jazz Immortal》 | Pacific Jazz PJ-3 | 1960 | 1988 IT **宣傳** CD ＋ RVG 數位版 |
| The Modest Jazz Trio《Good Friday Blues》 | Pacific Jazz PJ 10 | 1960 | 只有 2024-09-06 Tone Poet |
| Teddy Edwards《Sunset Eyes》 | Pacific Jazz PJ-14 | 1960 | 只有 2025-04-04 Tone Poet |

全部依簡報一.3：`label` 寫原廠、`year` 取原廠年、Blue Note 版年份寫在 `risk`。**這一段的 United Artists 五張是新形狀**（c-136 第 472 條是 Pacific Jazz／Jazz:West／Transition）：
Blue Note 1991 年前後把 United Artists 1958–60 的爵士目錄（UAL 4000／UAS 5000 系列）整批 CD 化，enum 就把它們算進來；**往後 1958–61 段每批都會有幾張，照這條。**
United Artists 那五張的 RG 本身建得很完整（原盤 mono／stereo 都有），除《Bags' Opus》。

## 第 513 條（同批）：**掛名裁定——群組實體收攏到本人 5 張、feature／with 收攏到領班 2 張、對等聯名 3 張、一次性合作團照群組名 1 張、新掛名 6 個過第 307 條**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Cecil Taylor Quintet`（群組 c718232d） | **`Cecil Taylor`** | 第 462 條；池中 9 張（全 1965 後）；c-137 a／b 的《Jazz Advance》（Cecil Taylor Quartet）《Love for Sale》（Trio and Quintet）應同收攏 |
| `The Horace Silver Quintet`（群組 e9ac5139）《Horace-Scope》 | **`Horace Silver`** | 第 482 條；b 組第 525 條同裁定 |
| `Freddie Redd Quartet`（群組 28f9c774） | **`Freddie Redd`**（Person f30eb5d7） | 第 462 條；b 組《Shades of Redd》同收攏（第 525 條已預告） |
| `Zoot Sims - Bob Brookmeyer Octet`（群組 3e9368ee） | **`Zoot Sims & Bob Brookmeyer`** | 群組收攏＋第 452 條「A - B」join 改 `&`；先例 `Al Cohn & Zoot Sims`；「Octet」進 queryAlias |
| `Booker Little 4 & Max Roach`（群組 1b9ae554 ＋ Person 0b6aea55） | **`Booker Little & Max Roach`** | 群組收攏到本人＋第 363 條第 1 型對等聯名照 MB；同形先例 c-135 b《Gigi Gryce & Clifford Brown — Gigi Gryce Clifford Brown Sextet》；盤名保留「4」 |
| `Kenny Burrell with Art Blakey`（兩個 Person，join「with」） | **`Kenny Burrell`** | 第 462 條例外 3（Blakey 是客座 feature）；1959 原盤 release credit 只掛 Burrell；不往 `Art Blakey` 加 |
| `Clifford Brown featuring Zoot Sims`（兩個 Person，join「featuring」） | **`Clifford Brown`** | 同上；1960 原盤 release credit 只掛 Brown |
| `Bob Brookmeyer & Bill Evans` | **照 MB** | 第 363 條第 1 型；先例 `Bill Evans & Jim Hall`；**不塞進 `Bill Evans` 單人** |
| `Art Blakey & The Jazz Messengers`（群組 209ddf15） | **`Art Blakey and the Jazz Messengers`** | 第 470 條；池中 6＋c-136 3 ＞ `& The` 5 |
| `The Modest Jazz Trio`（群組 a2a4232a，US 1960） | **照群組名** | 三人（Jim Hall／Red Mitchell／Red Kelly）對等的一次性合作團，沒有領班可收攏；同形 `The Three Sounds`；三人名字全進 queryAlias |
| `Jimmy Witherspoon`／`Dizzy Reece`／`Milt Jackson`／`Donald Byrd`／`Duke Jordan`／`Horace Parlan`／`Sonny Red`／`Duke Pearson`／`The Three Sounds`／`Jackie McLean`／`Teddy Edwards` | 照 MB＝照池中 | 同字串；`Horace Parlan` 不往 `The Horace Parlan Trio`（1）加 |

**新掛名 6 個**（池中零張），第 307 條反查同字串不同人：`Dizzy Reece`（cbde4132，JM 1931；池中 Reece 只有 Alex Reece，不同字串）、`Sonny Red`（465406f7，US 1932；⚠ MB 另有法國金屬團與疑似美國 hip hop 同名實體，池中皆無，**往後那兩個進池要先處理**）、
`Freddie Redd`（f30eb5d7）、`Teddy Edwards`（8fc3c813，US 1924；MB 另有「Big Boy Teddy Edwards」藍調人，不同字串）、`The Modest Jazz Trio`、`Bob Brookmeyer`（只在兩個聯名字串裡出現，本組沒有他單獨的卡）——全部無同字串撞擊。
**跨批對齊**：`Dizzy Reece`（c-137 b《Blues in Trinity》）、`Duke Pearson`（c-137 b《Profile》）、`The Three Sounds`（c-137 b 兩張、c-138 b 三張）、`Cecil Taylor`（c-137 a／b）——四個字串兩批要一致。

## 第 514 條（同批）：**同碟重複 RG 3 個、10 吋→12 吋同錄音 1 對、MB 未建原盤 1 張——本層只釘一邊、其餘刻意不釘並在 risk 互指**

- **同碟重複 RG（第 481 條形狀，chk-prop 抓不到）**：
  1. **10ec1745**《Moods》掛「Gene Harris & The Three Sounds」——只有兩筆東芝 EMI 日本盤，同日（1960-06-28）同 8 軌，是同一張 BLP 4044 被日本再發的掛名另建了 RG。本卡釘 5b088bf0。
  2. **18dc45ff**《Good Friday Blues》掛「Jim Hall And His Modest Jazz Trio」（群組 727dcbf4，2011）——同一張 PJ 10 的再發另建 RG。本卡釘 52ddf695。
  3. **582ffbe9**《Hard Driving Jazz》2005（Cecil Taylor with John Coltrane，標 Compilation）與 **c709d413**《Hard Driving Jazz》2012（The Cecil Taylor Quintet，標 Compilation）——同題擴充再發，本卡釘 1959 原盤 RG d556e4a0。
  這三個 RG 若出現在 enum 的 2005／2011／2012／「僅 JP 盤」段，**後批應退（理由分類：同碟重複 RG）**。
- **10 吋→12 吋同錄音兩個 RG（第 453 條形狀 b）**：Clifford Brown《Jazz Immortal》PJ-3（1960，本批釘）↔ 10 吋 PJLP-19《Clifford Brown Ensemble Featuring Zoot Sims》（1955，RG 2f434e45，掛群組實體 Clifford Brown Ensemble）——
  10 吋不在 Blue Note enum 裡（沒有 Blue Note 版），這條線永遠排不到它；本卡 `year` 取 12 吋 1960、risk 寫明錄音 1954、正文不得寫成 1960 年錄音。
- **MB 未建原盤**：《Bags' Opus》美國 UAL 4022／UAS 5022 沒建，RG 轄下最早是 GB London SAH-T 6049（1959-11）——第 364 條第一型變體，`label` 出自 Discogs，研究層要在 MB 補建或改指。
- **同名不同碟（刻意不釘、queryAlias 不收）**：Witherspoon d69e3128《Singin' The Blues》2009（Jazz Beat 22 軌回顧輯）；Milt Jackson c5041a96《Bean Bags plus Bags' Opus》2011；Zoot Sims bb5de5de《Stretching Out / Kansas City Revisited》2007、bd22fa63《Four Classic Albums》2012；Blakey 2d42a629《Jazz Messengers!!!!! + Mosaic》2013；32eefcf7《Rejoice! + Good Friday Blues + Jazz Guitar》2016——全是二合一／擴充合輯。

## 第 515 條（同批）：**《Hard Driving Jazz》＝《Stereo Drive》＝《Coltrane Time》——一張碟三個題名兩個掛名，本卡照原盤掛 Cecil Taylor，Coltrane 線要知道**

RG d556e4a0 轄下 10 筆 release：1959 United Artists 原盤 mono 題《Hard Driving Jazz》／stereo 題《Stereo Drive》掛「The Cecil Taylor Quintet」；1963 UAJ 14001 起（含 Blue Note 1991 CD、四張日本 CD、Solid State 1968）**全部改題《Coltrane Time》掛「John Coltrane」**；
2017／2023 公共領域數位版又回到原題原掛名。MB RG title／credit 取原盤。
裁定：**掛 `Cecil Taylor`、盤名《Hard Driving Jazz》**——理由：(1) RG 與原盤如此；(2) 這是 Taylor 領銜的錄音（1958-10-13，Taylor／Coltrane／Kenny Dorham／Chuck Israels／Louis Hayes），Coltrane 掛名是 1963 年 United Artists 的行銷改題；
(3) 池中 `Cecil Taylor` 1950 年代零張，掛到 Coltrane 名下會讓這條線的目標（補 Taylor 早期）落空。《Stereo Drive》《Coltrane Time》《John Coltrane》全進 queryAlias。
**⚠ 第 45 條「現行流通名」在這張上站在另一邊**：Apple／Blue Note 現行只有《Coltrane Time》（724624098，掛 John Coltrane，4 軌軌序與原 LP 不同），本層明知如此仍取原題，主線要改只改卡單值（判準 2 可逆）。
**⚠ 給往後 Coltrane 深掘線的警告**：池中 `John Coltrane` 30 張沒有《Coltrane Time》，任何《Coltrane Time》候選都是這張碟（同 RG），chk-prop 的掛名＋盤名鍵擋不住——上架前先查 rgMbid d556e4a0。

## 第 516 條（同批）：**盤名——印刷體撇號換 ASCII 2 張、RG title 與原盤 release title 不同的 1 張照 RG、引號題名照 MB 無引號、Booker Little 那張盤名幾乎等於掛名**

| MB RG title | 卡上盤名 | 說明 |
|---|---|---|
| `Tender Feelin’s`（U+2019） | **Tender Feelin's** | 第 473 條；JP CD 與數位版 release title 本來就是 ASCII |
| `Bags' Opus`（RG 是 ASCII，London 與數位 release 是 U+2019） | **Bags' Opus** | 照 RG |
| `On View at the Five Spot Cafe` | 照 RG | 1959 原盤 release title 是「At The Five Spot Cafe」（JP 2015 同）；Discogs／Apple／2025 Tone Poet 用 On View——短名進 queryAlias |
| `The Music From The Connection` | 照 RG | Discogs／維基寫 The Music from "The Connection"、Apple 用短名 Music from the Connection、2019 再發題《The Connection》——第 483 條，變體全進 queryAlias；⚠ Howard McGhee 在 Felsted 有同劇配樂《Music from the Connection》（MB 搜尋沒回，未建或另題），上架用盤名搜要連掛名 |
| `Booker Little 4 & Max Roach` | 照 RG | 盤名＝盤面掛名，卡上掛名收攏成 `Booker Little & Max Roach` 後兩者差一個「4」；selfTitled 記 false（字串不等），上架比對要連掛名看；再發名《The Defiant Ones》進 queryAlias |
| `Horace-Scope` | 照 RG | ASCII 連字號，chk-prop 不擋 |
| `Hard Driving Jazz` | 照 RG | 見第 515 條 |
其餘 16 張照 MB RG title 逐字。

## 第 517 條（同批）：**Live 只有一張（Five Spot Café，真演出場地）；《The Music From The Connection》是舞台劇配樂不是電影原聲帶，照一般 Album 收**

- **《On View at the Five Spot Cafe》**：MB secondary-types [Live]、enum `live: true`，1959-08-25 紐約 Five Spot Café——是真正的俱樂部（第 485 條「錄音場地不是演出場所」的疑慮不適用），mbNote 寫明現場與演出日。本批唯一的現場盤；Burrell 池中 3＋c-136 2＋c-137 a 2 張全是錄音室，這張補的是他 Blue Note 期唯一的 live。
- **《The Music From The Connection》**：維基 infobox 標 soundtrack／studio album——那是 Jack Gelber 舞台劇《The Connection》的配樂，四重奏在 Living Theatre 台上演奏、1960-02-15 進 Van Gelder Studio 整場錄；MB secondary-types 空、primary Album。
  共通五條「電影／遊戲原聲帶不收」指的是電影原聲帶，這張是爵士四重奏的錄音室專輯，**收**；1961 年 Shirley Clarke 電影版的配樂是另一回事，正文不得混寫。
- 其餘 21 張 secondary-types 空、盤面無現場跡象。

## 第 518 條（同批）：**MB 資料層面的坑 6 個（本層不改 MB）——4000 系列前段的 `first-release-date` 有一半是錄音日**

1. **frd 恰等於錄音日（數位版占位或原盤 release 自己填錄音日）**：《Mosaic》1960-12-01（⚠ 比錄音日 1961-10-02 還早十個月——連錄音日都不是，純占位）、《Flight to Jordan》1960-08-04、《Moods》1960-06-28、《Soundin' Off》1960-05-12；**frd＝錄音年**：《Here We Come》1960、《Five Spot》1959、《Star Bright》1959。
   23 張裡 7 張——**看到 MB 年份帶月日又恰是 Van Gelder 錄音日，先當占位**（第 478 條第 2 點的延伸）。
2. **《Tender Feelin's》原盤 release 98c596bd 的 media.format 登錄成「Vinyl」**（不是 12" Vinyl），enum 的 `format: Vinyl` 照抄；實際是 12 吋 LP（Discogs 全部 LP）。同第 456 條形狀。
3. **《Soundin' Off》MB 轄下唯一原盤 release 掛 stereo 號 ST-84033**，Discogs 主版本是 mono BLP 4033；且 MB 只建 2 筆 release（Discogs 有 10 筆）——這張 MB 建檔最薄、CAA 也是零圖。
4. **《Bags' Opus》美國原盤未建**（第 514 條）。
5. **曲名錯字**：《Tender Feelin's》第 4 軌 MB 打成「When Sonny Gets Blue」（正確是 Sunny）；《Jazz Immortal》第 8 軌「Dahoud」（通行拼法 Daahoud，Apple 用後者）——寫作層引曲名時照通行拼法。
6. **原盤 release 的軌長多數是 0**（Witherspoon、Five Spot、Ivory Hunters、Bags' Opus、Byrd in Flight、Flight to Jordan、Tender Feelin's 七張）——MB 沒填，**軌長只能從 Apple 取、且已知《Good Friday Blues》第 4 軌 Apple 與 MB 差 61 秒、《Movin' & Groovin'》第 3 軌 Apple 標 Edit**，寫作層不得引軌長。

## 第 519 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 一種查法 19/23 命中、加藝人名再命中 4；CAA 22/23，但 6 張的圖來源是再發不是原盤**

- **search（盤名＋掛名）直接命中且 collection lookup 與原 LP 逐軌同序**（含 bonus 在後）：Singin' The Blues（前 11／12）、Star Bright、Booker Little（掛 Booker Little 單人）、Five Spot（掛 Kenny Burrell & Art Blakey，5 軌）、Ivory Hunters（掛 Brookmeyer 單人）、Bags' Opus、Byrd in Flight、Mosaic、Flight to Jordan（前 6／8）、Movin' & Groovin'、Out of the Blue（前 8／13）、Tender Feelin's、Moods、Connection、Capuchin Swing、Good Friday Blues（掛 Modest Jazz Trio 無 The）、Sunset Eyes（前 7／10）、Soundin' Off、Here We Come——19 張。
- **search 零命中、改「藝人名＋盤名」才命中**：Horace-Scope（723366394／RVG 724703792，7 軌同序）、Stretching Out（1494035662，掛 Zoot Sims & Bob Brookmeyer，6 軌同序）、Jazz Immortal（724184986，RVG 9 軌，**軌序與原 LP 不同**）、Hard Driving Jazz（只有《Coltrane Time》724624098 掛 John Coltrane，4 軌**軌序不同**）——後兩張寫作層按曲名配，不得寫「前 N 軌」。
- **Apple 的 releaseDate 在這批幾乎全是錄音日或 01-01 占位**（Booker Little 1958-11-04、Horace-Scope 1960-07-09、Jazz Immortal 1954-08-13、Byrd in Flight 1996-01-01＝CD 年）——第 484 條同樣的結論，不能當年份來源；℗ 年也不可靠（Booker Little ℗ 1958 是錄音年）。
- **CAA：22/23 有 front**；**《Soundin' Off》RG 與 release 端點都 404**（Discogs master 259242 有原盤圖）。
  ⚠ 有圖但**來源不是原盤**的 6 張：Stretching Out（2016 數位版）、Mosaic（數位 RVG 版）、Flight to Jordan（數位版）、Jazz Immortal（1988 IT 宣傳 CD）、Connection（1994 黑膠再發）、Bags' Opus（GB London 版）——研究層看版式，Discogs master 各有原盤圖。
- 同一位在店面的掛名不一（第 434 條）：Five Spot 掛「Kenny Burrell & Art Blakey」、Booker Little 只掛 Booker Little、Ivory Hunters 只掛 Bob Brookmeyer——店面掛名不影響本卡掛名。
