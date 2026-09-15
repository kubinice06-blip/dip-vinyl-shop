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
