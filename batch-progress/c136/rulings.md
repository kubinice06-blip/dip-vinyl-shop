
## 第 480 條（2026-09-15，c-136 b 組）：**《Birks' Works》退——列舉假陽性，Blue Note 的關聯是 MB 把一張 Various Artists 合輯掛錯 RG**

列舉檔 note 標「BN 首發 1993，原盤 1957 可能他廠」。回問 release 端點：RG e7dfd8de 轄下 8 筆，原盤是 **Verve MGV 8222**（1957／58 US）、
其餘是 Verve 澳／法／日再發；唯一掛 Blue Note 的是 78586965（1993 GB CD，0777 7 89032 2 2）。
**Discogs 以 catno 反查：0777 7 89032 2 2 是「Various – Birks' Works」——Blue Note／EMI UK 1993 的合輯 CD**，
與 Gillespie 的 Verve 專輯只是同名。MB 把它掛進 Verve 專輯的 RG，列舉腳本因此把一張 Verve 盤算成 Blue Note 目錄。
**不是簡報第一節第 3 點「原盤他廠、取他廠年」那個形狀**（那是 Blue Note 確實再發過的 Pacific Jazz／Roulette 材料），
Blue Note 從未持有這張。**退掉，理由分類：列舉假陽性（MB release 掛錯 RG）。**
另記：這張本身值得收（Discogs master 591539 記 1958、維基 1958；池中 Gillespie 7 張、1957 Verve 大樂團只有 at Newport），
**留給 Verve 線當 §1 候選**，rgMbid e7dfd8de-c018-4c66-a0f4-b67047813593，年份要判 1957／1958。
掛名亦要處理：MB 建成獨立群組實體 `Dizzy Gillespie Big Band`（9ff4c13a），依第 363 條第 2 形應收攏到池中 `Dizzy Gillespie`。

## 第 481 條（同批）：**《Hank Mobley Quintet》同碟兩個 RG，掛 Cedar Walton 那個退**

4ce8c3f5（credit「Cedar Walton & Hank Mobley Quintet」，1 筆 release「BN 1550」Vinyl 6 軌）與 210fc978（credit「Hank Mobley」，
BLP 1550，4 筆 release）是同一張碟：同 catno、同 6 軌、同 1957。Cedar Walton 1957 年不在 Blue Note（Apple 上「The Cedar Walton/Hank Mobley Quintet」
是 1972 Cobblestone 的《Breakthrough!》），MB 那筆是把 1972 的聯名團當成 1957 的掛名建進去的錯 RG，連 `Hank Mobley Quintet` 群組實體（440b4265）都只掛它。
**釘 210fc978，4ce8c3f5 退，理由分類：同碟重複 RG（MB 掛名建錯）。** 簡報二.1 說「盤名＋掛名撞了先查是不是同一個 RG」——這次是**同盤名、不同掛名、不同 RG，仍是同一張碟**，
`chk-prop` 的 rgMbid 掃描抓不到（兩個 UUID 不同），要靠 catno＋軌數對。

## 第 482 條（同批）：**編制掛名一律收攏到池中多數寫法——本組四張，並提醒 a 組與 c-135 同形**

依第 363 條第 2 形：
| MB credit | 本卡掛名 | 池中依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組實體 e9ac5139）《The Stylings of Silver》 | `Horace Silver` | 池中 8 張含 MB 同樣掛 Quintet 的《6 Pieces of Silver》 |
| `Hank Mobley Sextet`（群組實體 48bc1b2a）《Hank》 | `Hank Mobley` | 池中 10 張 |
| `Lou Donaldson Quintet with Donald Byrd, Herman Foster, John "Peck" Morrison & Art Taylor`《Wailing With Lou》 | `Lou Donaldson` | 池中 8 張，無 Quintet 字串 |
| `Art Blakey`《Orgy in Rhythm, Volume Two》 | `Art Blakey` | 照 MB；池中 `Art Blakey` 1 張先例（Child's Dance），**不掛進任一 Messengers 字串**（audits 第 1 組分裂形） |

**⚠ 同批 c-135 與 c-136 a 組的 slice 裡有 `The Horace Silver Trio`／`The Horace Silver Quintet`／`Horace Silver Trio And Art Blakey`／
`Lou Donaldson Sextet`／`Jutta Hipp Quintet`／`The Art Blakey Quintet`／`The Jazz Messengers` 等編制掛名**——若照 slice 字串直接交件，
池中會多出五六組新分裂。建議主線收件時統一：**個人編制（Trio／Quintet／Sextet）收攏到本人；`The Jazz Messengers`／`The Art Blakey Quintet` 另議**
（Messengers 那兩個字串在池中本來就分裂成 `and the`／`& The` 兩邊，第 362 條已記）。

**聯名維持**：`Cliff Jordan & John Gilmore`《Blowing in From Chicago》照 MB 聯名（第 363 條第 1 形），credited-name「Cliff」照 MB；
同組 BLP 1565 的本人卡掛 `Clifford Jordan`（池中字串），兩者 risk 互指、不算分裂。

## 第 483 條（同批）：**盤名照 MB RG title 逐字，變體全進 queryAlias——五張的坑列出來給研究層決定要不要改**

| 本卡盤名（MB RG title） | 店面／封面／維基寫法 |
|---|---|
| Jutta Hipp《With Zoot Sims》 | 全部寫「Jutta Hipp With Zoot Sims」（Discogs 連掛名都寫成這串） |
| Lee Morgan《Volume 2, Sextet》 | Apple「Lee Morgan Sextet, Vol. 2」、維基「Lee Morgan, Volume 2」、Discogs「Volume 2 - Sextet」 |
| Lee Morgan《Vol. 3》 | 1957 原盤 release title「Volume 3」、維基「Lee Morgan, Vol. 3」；池中同形先例 `Sonny Rollins, Volume 2`（盤名帶掛名） |
| Hank Mobley《Hank Mobley Quintet》 | 1957 原盤 release title「Hank Mobley With Farmer, Silver, Watkins, Blakey」、2019 Music Matters「Quintet」 |
| Jimmy Smith《Jimmy Smith at the Organ: Plays Pretty Just for You》 | Discogs／Apple／維基全用短名「Plays Pretty Just for You」（第 45 條「現行流通名」可能是短名） |

MBID 都已釘，改盤名不影響身分。**本組不自行改，留研究層／主線一次決定**（Blue Note 1500 系列前段 c-135／c-136 a 組同形很多，該一批一起定）。

## 第 484 條（同批）：**年份改判一張（City Lights 1957→1958），四張兩說維持 MB**

- **《City Lights》BLP 1575 改 1958**：MB first-release-date 1957 但原盤 release 無月日；Discogs master 298362 主版本 1958、
  維基「recorded August 25, 1957 and released the following year」、Apple 1958-06-01——三邊 1958，MB 的 1957 是錄音年形（第 364 條、第 366 條《Playboys》先例）。
  正文可寫 1957 年 8 月錄音、不得斷言發行月。
- **維持 MB 的四張**：《Indeed!》1957（MB 1957-02 帶月，維基說 1956）；《Jimmy Smith at the Organ, Volume 1》1957（MB＋維基 1957，Discogs 主版本 1958）；
  《Blowing in From Chicago》1957（MB 1957-05，維基說 7 月——年一致、月不寫）；《Quartet/Quintet/Sextet》1957（MB 的 1957-05-24 出自 2017 數位版、
  Apple 同日期是**同源不是交叉驗證**，第 431 條）。
- **Apple 的 releaseDate 在這批幾乎全是錄音日或 01-01 placeholder**（All Stars 1957-01-13、Stylings 1957-05-08、Plays Pretty 1957-05-08、
  Cliff Jordan 1957-06-02、Hank 1957-02-03 甚至早於錄音日）——**Blue Note 目錄的店面日期不能當年份來源**，只能當觀察。

## 第 485 條（同批）：**《A Date With Jimmy Smith》Vol. 1／2 的 Live 標記存疑——Manhattan Towers 是錄音場地不是演出場所**

MB secondary-types 兩張都是 [Live]，列舉檔跟著標 live。但維基只記 1957-02-11～13 錄音日與人員、無場地與觀眾描述；
同三天錄出的《The Sounds of Jimmy Smith》《At the Organ Vol. 1》MB 都是錄音室盤；Discogs 把同月的《Orgy in Rhythm》主版本的 Manhattan Towers 記成 studio credit。
**本組照第 397 條兩邊都不下結論：卡單仍依列舉檔標 live，risk 寫明存疑，正文不得寫成演唱會，研究層以實體盤背面說明核定。**
這是 secondary-types 「非空不代表現場」的方向（第 253 條的鏡像方向、第 397 條）。

## 第 486 條（同批）：**同三天錄音拆成四張——正文要分清編制，不得互抄陣容**

1957-02-11～13 Manhattan Towers 三天，Blue Note 拆出 BLP 1547／1548（A Date Vol. 1／2，全員 jam＋二重奏／三重奏）、1551／1552（At the Organ Vol. 1／2，
Donaldson／Burrell／Blakey 四重奏）、1556（The Sounds of Jimmy Smith，McFadden／Bailey 三重奏）。本組收 1547／1548／1551／1556 四張、1552 落下一批。
各算一張（簡報一.6），risk 五向互指；**寫作層每張只寫自己那張的編制**。
另兩組同形：Orgy in Rhythm Vol. Two（Vol. One a81322c9 落下一批）；Sonny Rollins Vol. 1（Vol. 2 已在池、**不同場**，正文不得寫成同場拆賣）。

## 第 487 條（同批）：**10 吋重組 12 吋：《Quartet/Quintet/Sextet》與 c-135 的兩張 10 吋 RG 是同一批錄音**

BLP 1537 是 1952–54 三場 10 吋錄音（BLP 5021／5030／5055）的 12 吋合訂，c-135 已以 10 吋 RG 各算一張（415c20a3、7cd2823a）。
依簡報二.3 各算一張，risk 互指；**Discogs 把它標成 Compilation、MB 與 Apple 當一般專輯，本卡 releaseType 照 MB 記 Album 不走 §5.6**——
1500 系列前段的 12 吋合訂是通例，走 §5.6 會把 c-135／c-136 a 組十幾張全部拖進舉證。

## 第 488 條（同批）：**實掃與交件數字**

- 實掃卡池（seed 16,450 列＋ c100–c134 cards）：**本組 22 筆撞池 0**；掛名層 Jimmy Smith 11／Lee Morgan 12／Lou Donaldson 8／Sonny Rollins 17／
  Hank Mobley 10／Art Blakey 個人 1／Horace Silver 8／Clifford Jordan 2／Jutta Hipp 0／John Gilmore 0——**十位裡 1956–1957 的 Blue Note 領銜盤全部是零**。
- rgMbid 與 c-135（45）、c-136 a（23）交叉：重疊 0。
- **交件 20 張、退 2 張**（第 480、481 條）；年份改判 1（第 484 條）；**CAA RG 層封面 20/20 命中**（front 皆 true；其中 4 張來源是再發 CD／數位而非原盤圖：
  Sounds of Jimmy Smith、Volume 2 Sextet、Quartet/Quintet/Sextet、Cliff Jordan——研究層看版式）。
- 店面觀察（Apple us `search` 一種查法）：17/20 命中、3 張未命中（Sounds of Jimmy Smith、Sonny Rollins Vol. 1、Blowing in From Chicago）——只是觀察，研究層走藝人目錄與 collectionId。
- `chk-prop b`：標記 0（跨批撞卡 0、同 rgMbid 不同掛名 0）。
- MB 端點觀察：release-group 的 first-release-date 在 1957 這段幾乎都無月份；**《Quartet/Quintet/Sextet》兩筆數位 release 重複建檔**（05f06da8／9005dbba 同 barcode）。

## 第 470 條（2026-09-15，c-136 a 組）：**a 組 23 筆全收、退 0；掛名依池中先例與第 363 條收攏，三個新掛名過第 307 條反查**

實掃 `seed_cards.json`（16,450 列）＋ `desc-tools/batches/cards/c1*.json`（c100–c134），掛名子字串雙向、盤名子字串雙向＋卷號統一（Volume／Vol.／One／1）：
**23 筆零撞卡**。三個子字串命中都是不同的碟（Chet Baker《Sings and Plays》↔ 池中《Chet Baker Sings》1954；
《Kenny Burrell》BLP 1543 ↔ 池中聯名《Kenny Burrell & John Coltrane》；《The Magnificent Thad Jones, Volume 3》↔ 池中《The Magnificent Thad Jones》BLP 1527），
`chk-prop a` 標記 0、跨批 0、同 rgMbid 0。

掛名裁定（**一律池中多數寫法，MB／店面寫法進 `queryAlias`**）：

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `Jay Jay Johnson` | **`J.J. Johnson`** | 池中 3 張全用 J.J.（含《…Volume 1》姊妹卡）；MB 實體主名也是 J.J. Johnson |
| `Kenny Drew Quartet` | **`Kenny Drew`** | 池中 `Kenny Drew` 4 ＞ `Kenny Drew Trio` 3；第 363 條第 2 款，不往 Trio 那邊加 |
| `The Jazz Messengers`（Cafe Bohemia ×2；MB 實體主名 Art Blakey & The Jazz Messengers） | **`Art Blakey and the Jazz Messengers`** | 池中 `and the` 6 ＞ `& The` 5（audits 型態三第 2 組既有分裂，不往 `&` 加）；Apple 掛 Art Blakey & The Jazz Messengers |
| `The Art Blakey Quintet`（Birdland Vol. 2；MB 獨立 Group 實體 9294b1df） | **`Art Blakey and the Jazz Messengers`** | 池中姊妹卡《A Night at Birdland, Vol. 1》就是這個字串；不新造 Quintet 掛名 |
| `Horace Silver`／`Jimmy Smith`／`Thad Jones`／`Kenny Burrell`／`Hank Mobley`／`Donald Byrd`／`Paul Chambers`／`Chet Baker` | 照 MB＝照池中 | 同字串 |

**新掛名 3 個**（池中零張）：`Jutta Hipp`（728aa0a2，Person，DE）、`Gil Mellé`（6cde5a82，Person，US；MB 實體主名帶重音，Apple 寫 Melle）、`Fats Navarro`（d2a135f4，Person）。
三個都反查過池中同字串不同人（第 307 條）：無。

## 第 471 條（同批）：**年份改判 8 張——MB `first-release-date` 在 1500 系列中段大量等於錄音年**

第 364 條的第一與第三種失真在這一段集中出現。判準：**MB 年＝最後一場錄音年、而 Discogs 原壓與（有的話）Billboard 同期紙本都晚一年 → 取晚的那年**；
另用 1500 系列的出版順序當旁證（Billboard：BLP 1523 1956-09、1522 1956-12、1540 1957-03-30、1543 1957-04-29，皆維基條目引）。

| 盤 | catno | 錄音 | MB | 改 | 依據 |
|---|---|---|---|---|---|
| J.J. Johnson《The Eminent Jay Jay Johnson, Volume 2》 | BLP 1506 | …1955-06-06 | 1955 | **1956** | Discogs 原壓 1956；維基 Vols. 1&2 條目 1956 |
| Kenny Drew《Talkin' & Walkin'》 | Jazz:West JWLP 4 | 1955-12 | 1955 | **1956** | Discogs 原壓 1956；維基 1956 |
| Jimmy Smith《At Club "Baby Grand"… Volume 1》 | BLP 1528 | 1956-08-04 | 1956 | **1957** | Discogs 原壓兩筆 1957；目錄號在 1522（1956-12）之後；⚠ 維基無來源記 1956，**留研究層以 Billboard 覆核** |
| Jimmy Smith《…Volume 2》 | BLP 1529 | 1956-08-04 | 1956 | **1957** | 同上 |
| Hank Mobley《Hank Mobley With Donald Byrd and Lee Morgan》 | BLP 1540 | 1956-11-25 | 1956 | **1957** | Billboard 1957-03-30；Discogs 1957；**MB 轄下同號兩筆各記 1956／1957**；Apple 1957-03-04 |
| Kenny Burrell《Kenny Burrell》 | BLP 1543 | 1956-03／05 | 1956 | **1957** | Billboard 1957-04-29；Discogs 1957；Apple 1957-06-03 |
| Thad Jones《The Magnificent Thad Jones, Volume 3》 | BLP 1546 | 1956-07-09／1957-02-02 | 1956 | **1957** | Discogs 原壓兩筆 1957；第二場錄音已是 1957-02；目錄號在 1543 之後 |
| Donald Byrd《Byrd Blows on Beacon Hill》 | Transition TRLP 17 | 1956-05-07 | 1956-01-01 | **1957** | MB 的日期是數位版 placeholder、Transition 原盤 MB 未建；Discogs 原壓 1957；維基 1957 |

**其餘 15 張 MB＝Discogs 原壓（＝Billboard，有的話）**，照 MB。
⚠ 第 431 條的形狀本組撞到一次：《Byrd Blows on Beacon Hill》Apple 條目 1956-01-01／℗ 1956 與 MB 那筆 Blue Note 數位版逐日相符——**同一份 metadata，不是兩個來源**。
⚠ 維基不是一手來源，但本組引用的都是它**轉引 Billboard 期刊頁**的條目（books.google 連結在條目裡），研究層可直接循那個連結核實。

## 第 472 條（同批）：**「原盤可能他廠」4 張逐張判——全部是他廠原盤，`label` 寫原廠、`year` 取原廠年，Blue Note 版年份在 `risk`**

| 盤 | 原廠 | 原盤年 | Blue Note 的關聯 |
|---|---|---|---|
| Chet Baker《Chet Baker Sings and Plays》 | Pacific Jazz PJ-1202 | 1955 | 只有 2024-12-18 日本 HQCD UCCQ-9780（列舉檔「僅 JP 盤」指的就是這筆）；同 RG 轄下 29 筆 release 含原盤 |
| Kenny Drew《Talkin' & Walkin'》 | Jazz:West JWLP 4 | 1956 | 1989 CD CDP 7 84439 2（Blue Note 買下 Aladdin／Jazz:West 母帶） |
| Paul Chambers《Chambers' Music》 | Jazz:West JWLP 7 | 1956-09 | 1989 CD；⚠ MB 把 catno 打成 `CDP 7 844437 2`（多一個 4），實為 7 84437 2 |
| Donald Byrd《Byrd Blows on Beacon Hill》 | Transition TRLP 17 | 1957 | 2024-07-05 Tone Poet 602448819468 ＋ 數位版；**原盤 MB 未建檔，留本機補** |

四張的 rgMbid 都照列舉檔（RG 本身沒釘錯，只是列舉檔用 Blue Note 那筆 release 的年份當 note）。
這一段的「Blue Note 目錄」其實混了 Blue Note 1980 年代後買下的 Pacific Jazz／Aladdin 系母帶，**b 組與往後各批會一直碰到，照這條處理**。

## 第 473 條（同批）：**盤名裁定——MB RG title 去掉了盤面開頭的藝人名時，卡上照盤面／現行流通名；印刷體引號一律換 ASCII**

| MB RG title | 卡上盤名 | 依據 |
|---|---|---|
| `With Donald Byrd and Lee Morgan` | **《Hank Mobley With Donald Byrd and Lee Morgan》** | 盤面、Discogs、Apple 都帶 Hank Mobley 開頭；spine 名《Hank Mobley Sextet》進 queryAlias（第 91／95 條：RG 標題與卡片盤名不必相等） |
| `The Magnificent, Volume 3` | **《The Magnificent Thad Jones, Volume 3》** | 盤面、Discogs、Apple；與池中《The Magnificent Thad Jones》（BLP 1527）是不同錄音，Blue Note 沒出過 Volume 2 |
| `Sings and Plays With Bud Shank, Russ Freeman and Strings` | **《Chet Baker Sings and Plays》** | 現行流通名（Apple、2023 黑膠、維基），第 363 條《Playboys》那個「現行流通名」解法；全名進 queryAlias；池中先例《Chet Baker Sings》同形 |
| `At Club “Baby Grand” Wilmington, Delaware, Volume 1／2` | 彎引號換 ASCII `"` | c-50 反模式（非 ASCII 標點讓標題比對失準）同理 |
| `Chambers’ Music` | `Chambers' Music` | 同上 |
| `At The Hickory House Volume 1／2` | **照 MB 原樣**（含大寫 The、無逗號） | 沒有去掉藝人名、也沒有印刷體標點，不改 |
| `A Night at Birdland, Volume 2` | 照 MB | 池中姊妹卡寫 `Vol. 1`，卷號統一後不撞；不為了對齊改 MB 文字 |

## 第 474 條（同批）：**Volume 拆盤與 10 吋→12 吋重組——本組 5 對互指，其中 3 對跨到 c-135**

同場拆兩張（各算一張、`risk` 互指、正文不得寫成兩場）：Baby Grand 1528／1529（1956-08-04）、Hickory House 1515／1516（1956-04-05）、Cafe Bohemia 1507／1508（1955-11-23）。
三集不同錄音（各算一張、互指、正文不得寫成同一場）：Jimmy Smith 1512／1514／1525。

**10 吋→12 吋同一批錄音兩個 RG（簡報第二節第 3 條），c-135 slice 在收 10 吋那邊**：
《Horace Silver Trio》BLP 1520 ↔ c-135 b《Horace Silver Trio And Art Blakey — Vol. 2》BLP 5034（65b3cbe6）；
《The Fabulous Fats Navarro, Volume 1》BLP 1531 ↔ c-135 a《Fats Navarro Memorial Album》BLP 5004（5bfd62fb）；
《A Night at Birdland, Volume 2》BLP 1522 ↔ 10 吋 BLP 5037–5039（c-135 slice 沒列，MB 可能沒分建）。
**a 組 23 個 rgMbid 與 c-135 slice 45 個零重疊**（實掃）。

## 第 475 條（同批）：**給 c-135 的四個通報（他們的 slice，本組不動）**

1. **c-135 b《Jay Jay Johnson — The Eminent Jay Jay Johnson, Volume 1》（84668b7b）池中已有**——`J.J. Johnson — The Eminent Jay Jay Johnson, Volume 1 (1955)`。
   列舉檔用「Jay Jay Johnson」子字串比對「J.J. Johnson」比不到，是假陰性；`chk-prop` 的掛名折疊也抓不到。**那張要退。**
2. **c-135 b 的掛名「Gill Mellé」（雙 l）**是某筆 10 吋 artist-credit 的盤面拼法，MB 實體主名是 `Gil Mellé`（6cde5a82）；本組《Patterns in Jazz》用 `Gil Mellé`。兩批同時上架會造成新分裂，**c-135 請改 `Gil Mellé`**。
3. **c-135 b 的編制掛名**`Kenny Drew Trio`（New Faces – New Sounds）、`Jutta Hipp Quintet`（New Faces – New Sounds From Germany）、`Horace Silver Trio And Art Blakey`、`The Horace Silver Quintet`——
   依第 363 條第 2 款應收攏到 `Kenny Drew`／`Jutta Hipp`／`Horace Silver`（本組三張都這樣掛）。`Horace Silver Trio And Art Blakey` 是雙人聯名（第 363 條第 1 款），可照 MB。
4. 第 474 條那三對 10 吋／12 吋同錄音 RG，兩邊 `risk` 要互指。

## 第 476 條（同批）：**實掃順帶抓到的既有卡問題（線上資料，本組不動，留本機）**

| 池中 | 問題 | 依據 |
|---|---|---|
| `Art Blakey and the Jazz Messengers — A Night at Birdland, Vol. 1` 年份 **1954** | 12 吋 BLP 1521 的 RG（dcb10e95）first-release-date 是 **1956-07**（Billboard 1956-08）；1954 是 10 吋 BLP 5037 年或錄音年。本組 Vol. 2 卡照 12 吋 RG 記 1956，姊妹卡會差兩年 | MB RG 端點；維基引 Billboard |
| `Donald Byrd — Byrds Eye View` 年份 **1955** | Transition TRLP 4，1955-12 錄音、**1956** 出版；1955 是錄音年 | Discogs／維基 |
| `Art Blakey and the Jazz Messengers`（6）／`Art Blakey & The Jazz Messengers`（5） | audits 型態三第 2 組分裂仍在，本組三張都掛 `and the`（多數），沒往 `&` 加 | 實掃 |
| `Paul Chambers — Whims of Chambers` | MB credit 是 `Paul Chambers Sextet`，池中已收攏成 `Paul Chambers`——**本組《Chambers' Music》照這個先例** | RG c7f5fc4a |
| `Kenny Drew — Kenny Drew Trio` 1956（Riverside） | 盤名含編制、掛名收攏成 `Kenny Drew`——本組《Talkin' & Walkin'》照這個先例 | 實掃 |

## 第 477 條（同批）：**店面三種查法觀察（只寫觀察）：22／23 找得到條目，20 張數位版前 N 軌與原盤逐軌同序**

- **search＋artist lookup 都命中且 collection lookup 與原 LP 逐軌同序**（含 bonus 在後）：Chet Baker（前 10／11）、Detroit-New York Junction、New Sound Vol. 1／2、At the Organ Vol. 3、Hickory House Vol. 1（第 2–11 軌，第 1 軌是 Leonard Feather 開場）／Vol. 2、Patterns in Jazz、Introducing Kenny Burrell、Mobley 1540、Thad Jones Vol. 3、Cafe Bohemia Vol. 1／2（前 6／9）、Birdland Vol. 2（1442945042 全 5 軌；RVG 724836233 前 5／7）、Baby Grand Vol. 1（第 2–5 軌，第 1 軌 Mitch Thomas 開場）／Vol. 2、Byrd Blows、Chambers' Music、Fats Navarro Vol. 1。
- **軌序與原 LP 不同**：J.J. Johnson Vol. 2（只有 RVG 版 723622252，15 軌，把 1954-09-24 場次併入、原 LP 10 軌散在第 5–12 軌）；Horace Silver Trio（724469019／715951979 都是 16 軌、CD 序，12 軌全在）。**這兩張寫作層按曲名配，不得寫「前 N 軌」。**
- **Kenny Burrell BLP 1543**（1646558252）：8 軌同序，但第 3 軌〈Mexico City〉標「Live at Cafe Bohemia／Alternate Take」398 秒（原 LP 363 秒）——數位版第 3 軌是另一個 take，**寫作層不得引軌長**。
- **只有 artist lookup 才找得到**（search 落空）：At the Organ Vol. 3（1472776469）、Kenny Burrell 1543（1646558252）——第 254 條的形狀又一次。
- **兩種查法都落空、沒有 collectionId 可做第三種**：Kenny Drew《Talkin' & Walkin'》（search 撞到 Bennie Green 同名曲等多筆；term=Kenny Drew 200 筆 album 裡沒有）。只是觀察，不寫「未上架」。
- 同一位在店面的 artistId 不只一個（第 434 條）：Art Blakey 有 331584／292405881（Quintet）／999447（& The Jazz Messengers）三個。
- **CAA：23／23 都有 front**（含 Byrd Blows 的 2024 版）。

## 第 478 條（同批）：**兩個 MB 資料層面的坑，往後批次會再碰到**

1. **`secondary-types` 兩個方向都會漏（第 397 條）的實例**：《The Fabulous Fats Navarro, Volume 1》（1947–49 78 轉錄音的重組）secondary-types 空，
   而同形的 Vol. 2（68658859）標了 Compilation、被列舉檔濾掉。本組依 §5.6 明文照一般 Album 寫、不填例外欄位，但 `risk` 標明形態、正文不得寫成一場錄音室專輯。
   **Blue Note 1500 系列前段還有好幾張這種 78 轉重組盤（Bud Powell、Thelonious Monk、Milt Jackson 的 Volume 1／2），b 組與 c-135 照這條。**
2. **同一 catno 在 MB 轄下兩筆 release、年份不同**（BLP 1540：a2a1dce8 1956／afb110fa 1957）——`first-release-date` 取最早那筆，所以 RG 年份會被較早、無來源的那筆拉低。**看到 MB 年份＝錄音年，先看轄下 release 是不是有同號兩筆。**

## 第 489 條（主線 2026-09-15，研究層 a 組交件後）：**Billboard 同期紙本是這條線的硬證據——OCR 全文進 repo 共用**

研究層 a 組掃了 worldradiohistory 的 Billboard 1955-10～1957-09 共 105 期 OCR，
**策展層第 471 條改判的 8 張全部以「Billboard 評論日／廣告日」定案**（BLP 1528 Baby Grand Vol.1 評於 1957-03-09……）。
全文命中頁存在 **`batch-progress/enum/billboard-bn-1955-57-ocr.txt`**（2.1 MB），
**c-137 起的研究層直接 grep 目錄號，不必重掃。** 1957-10 以後的期數要另掃。

其餘：**Kenny Drew《Talkin' & Walkin'》採 PD 廠 Record Vault 版 `1893808868`**（gb／jp，9 軌逐軌相符；
c-131 第 359 條「灰色再發廠但曲目逐軌相符可採、發行資訊不引店面」先例）。
**⚠ b 組《A Date With Jimmy Smith》Vol.1／2 的 Live 不成立**（Manhattan Towers 是 Blue Note 1957–58 十幾場錄音的場地，
Billboard 評語無觀眾字樣）——**hook 層不得寫成現場**；卡單 `releaseType` 照 MB 不動（第 397 條）。
擋下策展層 9 處（Thad Jones Vol.3 陣容沒有 Burrell、Burrell 1543 是四個來源含現場一軌、Chambers' Music 原 LP 沒有 Pepper Adams、
Kenny Drew 原 LP 9 軌非 8 軌……）與無出處「唯一／第一」4 句，全在 notes。
