# c-139 裁定（Blue Note 1961–1962）

第 530 起為 a 組，第 540 起為 b 組；兩組皆 append。

# a 組（Blue Note 1961–1962：BLP 4055–4113、4155／4197 錯排段、9001／9002 人聲系列 ＋ UA／Capitol／Pacific Jazz／Riverside 轉來 12 張，23 筆覆核）

策展層 a 組，2026-09-15。交件 `batch-progress/c139/prop-a.json`，
`node batch-progress/c139/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／102 批 4,238 張、同 rgMbid 不同掛名 0）。
rgMbid 與 c-135／c-136／c-137 的 prop 與 c-138 的 slice＋prop-b（共 345 筆）逐一交叉：**重疊 0**。號段 **530–539**。

## 第 530 條（2026-09-15，c-139 a 組）：**23 筆覆核結果——收 22、退 1；rgMbid 全部照 enum，無一釘錯；年份改判 4 張**

23 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，
title／credit／frd／catno／載體／軌數逐筆對過，**enum 的 rgMbid 沒有一筆釘錯**。
實掃卡池（`seed_cards.json` 16,450 列＋`desc-tools/batches/cards/c1*.json`＋`batch-progress/c12x–c13x/prop-*.json`，合計 18,719 列；掛名 25 個關鍵字、盤名 25 個關鍵字雙向子字串）：
**23 筆撞池 0**；盤名層命中全是他人假陽性（Rainbow《Down to Earth》、Sarah Vaughan／The Weeknd《After Hours》、Larry Young《Into Somethin'》、Supremes／Bing Crosby《Merry Christmas》、Monk／Evans／Braxton 的 Town Hall……），
掛名層命中都是同人不同碟（見第 539 條）。**第 490 條那種「RG title 是再發名、原盤已在池」的假陰性本組實掃了兩張（Three Blind Mice、Ladylove）的原名與再發名，都零命中。**

退掉 1 張：

| 筆 | rgMbid | 理由分類 | 說明 |
|---|---|---|---|
| Kenny Dorham《Blue Lament》1961 | 91accc98-4846-4929-9bcf-457c98bd88b7 | **列舉假陽性（非官方發行）** | RG 轄下唯一 release 7b29d1b0 是 **status Bootleg、Digital Media、disambiguation「rejected session」、1961-03-19**——Blue Note 沒發過的 1961 年 Dorham 被退回的錄音，被人建成數位 bootleg 掛在 Blue Note 名下。無 catno、無 barcode、CAA 404、Apple 零命中、Discogs 查無、維基無條目。enum 只濾 secondary-types，沒濾 release status，所以進了清單。**退；同形通則：RG 只有一筆 release 且 status≠Official 的一律先看 status。** |

沒有撞池退件、沒有判為合輯退件；「原盤他廠」12 張全部是改 `label` 不是退（第 533 條）。

## 第 531 條（同批）：**年份改判 4 張——兩張 Three Sounds 是 Blue Note 壓盤兩年／四年的庫存例，MB 把錄音年填成原盤年、還把 catno 打錯**

| 碟 | enum／MB | 改判 | 依據 |
|---|---|---|---|
| The Three Sounds《Black Orchid》 | 1962（原盤 release 0dfa5c72「1962、Blue Note **4165**」） | **1964** | Discogs master 202468／原壓 1296894 標 1964-04；jazzdisco 4100 系列索引 **BLP 4155**＝1964；維基引 Billboard 1964-04-25。**MB 的 catno 4165 是 McLean《Destination... Out!》的號**，本卡 label 以 4155 為準 |
| The Three Sounds《Out of This World》 | 1962（原盤 release 3a30c8c6） | **1966** | Discogs 三筆 BLP 4197 全 1966；jazzdisco「1966+」；維基引 Billboard 1966-04-16。錄音 1962-02／03，壓了四年（第 492 條 Fuller《Volume 3》同型） |
| Sheila Jordan《Portrait of Sheila》BLP 9002 | 1962（MB 無月日；jazzdisco 也記 1962） | **1963** | Discogs master 313791／原壓 655568「released 1963」；維基引 Billboard 1963-01-19 四星評論；錄音 10-12 才結束。**這是本線第一次 jazzdisco 與 Billboard 同期紙本站不同邊**——取紙本，1962 說留 risk |
| Cannonball Adderley《Cannonball's Bossa Nova》 | 1962（RM 455／RS 9455 兩筆都填 1962） | **1963** | Discogs master 118122 1963；維基引 Billboard 1963-07-27；錄音 1962-12-07～11，MB 填的是錄音年 |

《The Latin Bit》1963 是 enum 本來就對的（MB 1963-04、Billboard 1963-05-18），不算改判。
**維持 MB 的兩說一張**：Dodo Greene《My Hour of Need》BLP 9001——MB 1962、Discogs 3364010 1962、jazzdisco 1962 vs 維基 infobox 1963（無來源）；照第 364 條「相差一年照 MB」且目錄頁同邊，取 1962。
其餘 17 張 MB／Discogs／維基／jazzdisco 一致（月份小差：African Beat MB 10 月 vs Billboard 12 月初；Latin Bit MB 4 月 vs Billboard 5 月；Nancy Wilson MB 9 月 vs 維基 2 月——年都一致，正文不寫月）。

方法論：
1. **BLP 4000 系列中段的 enum 排序被 MB 錯年份拖進來兩張 1964／1966 的碟**（4155、4197）——列舉檔按 MB 年份排段，這段以後「目錄號明顯超前」的（4155 落 1962 段、4197 落 1962 段）先疑年份。
2. **MB 原盤 release 的 catno 也會錯**（4165 vs 4155），上架比對 catno 要以 Discogs／jazzdisco 為準，不能只信 MB。
3. jazzdisco 目錄頁在 9000 系列這段標 1962 的兩張，一張（9002）被 Billboard 紙本推翻——**jazzdisco 的年份是「目錄年」不一定是上市年**，遇到年底錄音的要再看紙本。

## 第 532 條（同批）：**《Blue Lament》之外，還有一張 MB 建檔的 catno／軌數錯登錄要記給上架比對**

- Dodo Greene《My Hour of Need》原盤 release c7ca050c「1962 12" Vinyl **16 軌**」——那是 1996 Connoisseur CD 的軌數填進原盤，原 LP 10 軌（Discogs 3364010、MB eacc70a3 BST 89001 都是 10 軌）；CD 第 11–16 軌是 1962 下半年另錄的續集素材（Eddie Chamblee／Edwin Swanston 陣容），**不是本張的 alt take**，正文不得寫進本張。1996 CD MB 未建。
- Black Orchid 的 4165（第 531 條）。
- Byrd《The Cat Walk》9a46cc37、Turrentine《That's Where It's At》dd7bcf4b、Blakey《The African Beat》a6e57c72：MB 原盤 release 只登錄立體聲號 BST 84075／84096／84097，mono BLP 號沒獨立建檔——`label` 兩號並列。
- Vi Redd《Bird Call》兩筆原盤 release 的 1962-05-22 疑為錄音日（第 492 條「帶月日也可能是錄音日」形），Apple 同日期是同源（第 431 條）；年份沒受影響。

## 第 533 條（同批）：**「原盤可能他廠」12 張逐張判——11 張成立改 `label`，1 張是 bootleg 退件；四個廠牌四種距離**

| 碟 | 原廠 catno | 年 | Blue Note 的關聯 | 形 |
|---|---|---|---|---|
| Stan Kenton《A Merry Christmas!》 | Capitol T/ST 1621 | 1961 | 2003 CD 84646（與 Capitol Jazz 並列） | Capitol 數位／CD 掛名（第 494 條） |
| Billie Holiday《Ladylove》 | United Artists Jazz UAJ 14014 | 1962 | 1988 CD 改題《Billie's Blues》15／16 軌 | UA 目錄（第 502 條） |
| Richard "Groove" Holmes《After Hours》 | Pacific Jazz PJ-59 | 1962 | 1996 CD | Pacific Jazz 母帶（第 472 條） |
| Cannonball Adderley《Cannonball's Bossa Nova》 | **Riverside RM 455／RS 9455** | 1963 | Capitol 1968 ST-2877 再發→2000 Capitol Jazz CD→2006 Blue Note CD 527292 | **本線第一次碰到 Riverside**：母帶怎麼落到 Capitol 本層沒核，研究層要寫來歷另查 |
| Charles Mingus《Town Hall Concert》 | United Artists Jazz UAJ 14024／UAJS 15024 | 1962 | 1994 CD 改題《The Complete Town Hall Concert》12 軌 | UA 目錄 |
| Kenny Dorham & Jackie McLean《Inta Somethin'》 | Pacific Jazz PJ 41 | 1962 | 2024 Tone Poet＋JP UHQCD | Pacific Jazz Tone Poet（第 455 條 Konitz） |
| Nancy Wilson & Cannonball Adderley《Nancy Wilson / Cannonball Adderley》 | Capitol T/ST 1657 | 1962 | 1993 CD 812042A（與 Capitol Jazz 並列）＋數位 | Capitol |
| Art Blakey and the Jazz Messengers《Three Blind Mice》 | United Artists Jazz UAJ 14002 | 1962 | 1990 CD 拆成 Vol. 1／2 | UA 目錄；**RG title 是再發名**（第 535 條） |
| Lou Rawls with Les McCann Ltd.《Stormy Monday》 | Capitol T/ST 1714 | 1962 | 1990 CD（MB 只建 1995 DE 筆） | Capitol |
| Ken McIntyre《Year of the Iron Sheep》 | United Artists Jazz UAJ 14015／UAJS 15015 | 1962 | 2019 數位（2010 JP CD 掛 Liberty） | UA 數位掛名 |
| Stan Kenton《Adventures in Jazz》 | Capitol T/ST 1796 | 1962 | 1999 CD（與 Capitol Jazz 並列） | Capitol |
| Vi Redd《Bird Call》 | United Artists Jazz UAJ 14016／UAJS 15016 | 1962 | 2019 數位（2010 JP CD 掛 Liberty） | UA 數位掛名 |
| Kenny Dorham《Blue Lament》 | — | — | 數位 bootleg | **退**（第 530 條） |

**這一段 enum 的 23 筆裡只有 10 筆是 Blue Note 自家原盤**（4055、4075、4096、4097、4111、4113、4155、4197、9001、9002），其餘 13 筆全是他廠——1961–62 是 UA Jazz（Alan Douglas 製作那一年）與 Capitol 轉來最密的一段。
⚠ **兩張與 Blue Note 目錄本體距離最遠的**：Kenton《A Merry Christmas!》（Capitol 大樂團聖誕盤）與 Rawls《Stormy Monday》（Capitol R&B 歌手出道盤）——本組照簡報一.3 收，**主線若判不歸這條線，退掉是可逆的**（第 502 條 Peggy Lee 同型）。

## 第 534 條（同批）：**掛名：收攏 3、聯名 4、新掛名 3、字元正規化 1**

| MB credit | 本卡掛名 | 依據 |
|---|---|---|
| `Art Blakey & The Jazz Messengers`（群組 209ddf15）×2（Meet You Vol. 2、Three Blind Mice） | `Art Blakey and the Jazz Messengers` | 池中 and the 6 ＞ & The 5（audits 第 1 組），c-136／137／138 同形 |
| `Art Blakey & The Afro-Drum Ensemble`（群組 8609c022）《The African Beat》 | `Art Blakey` | 第 452 條領班本名＋c-137 第 495 條 Orgy／Holiday for Skins 先例；個人 1 張，不掛進 Messengers |
| `Cannonball Adderley with the Bossa Rio Sextet of Brazil`（Cannonball＋Bossa Rio 群組，join「with the … of Brazil」） | `Cannonball Adderley` | 第 455 條 Konitz 形（join 不是 &、對方是伴奏團）；2000／2006 CD 本來就單掛 |
| `Kenny Dorham & Jackie McLean`（兩個 Person，join &） | **照 MB 聯名** | 第 363 條第 1 形；不計入兩人的目錄深度 |
| `Nancy Wilson / Cannonball Adderley`（join「 / 」） | **`Nancy Wilson & Cannonball Adderley`** | 第 452 條「A - B」→`&` 同理（斜線會與盤名分隔混淆）；1988 Capitol CD 與 XW 數位 credit 本來就是 &；**盤名保留斜線**，selfTitled true |
| `Lou Rawls with Les McCann Ltd.`（Rawls＋McCann Ltd. 群組，join with） | **照 MB 聯名** | c-137 第 493 條《John Jenkins with Kenny Burrell》先例；研究層若判 McCann Ltd. 是伴奏可改單掛 `Lou Rawls`（3 張），MBID 不變 |
| `Richard “Groove” Holmes`（印刷體引號） | **`Richard "Groove" Holmes`**（ASCII） | 池中既有字串 2 張，第 473 條引號正規化 |

新掛名三個（池中零張，都過第 307 條反查）：
- **`Dodo Greene`**：MB c5f4fda2 Person、US、1924–2006。反查：`Dodo Marmarosa` 是另一字串，不撞。
- **`Sheila Jordan`**：MB 92d3929a Person、US、1928–2025。池中聯名 `Sheila Jordan & Arild Andersen` 是第 363 條第 1 形的獨立聯名，不算分裂。
- **`Vi Redd`**：MB 06defc41 Person、US、1928–2022、「jazz saxophonist and vocalist」。兩字母 `Vi` 掃池會亂命中，用全字串掃。
⚠ **`Nancy Wilson` 第 307 條預警**：MB 另有 Heart 的 Nancy Wilson（d1153c78，1954–）——本卡用聯名字串所以不撞，但**日後收她個人盤（Capitol 1960 年代十幾張）掛名要帶消歧**，否則會與未來的 Heart 卡合併。

## 第 535 條（同批）：**盤名：兩張取原盤名而非 RG title、一張向姊妹卡對齊、三張印刷體撇號改 ASCII**

| MB RG title | 本卡盤名 | 依據 |
|---|---|---|
| `Three Blind Mice, Volume 1` | **《Three Blind Mice》** | RG title 是 1990 Blue Note 拆 CD 時的名；1962 UA 原盤 release title「Three Blind Mice」（封面「3 Blind Mice」）、2021 JP CD 也回原名——第 490 條方法論「拿 release 端點最早那筆的 title」；**Vol. 2 是另一 RG 80c962fc（1990 新編＋1961 Village Gate 兩軌），不釘、不算原盤拆盤** |
| `Town Hall Concert` | 照 MB | 原盤名；1994 起流通名《The Complete Town Hall Concert》進 queryAlias（第 363 條 Playboys 原名先例） |
| `Meet You At The Jazz Corner Of The World (Volume 2)` | **《Meet You at the Jazz Corner of the World, Volume 2》** | c-138 b 組 Vol. 1 的 RG title 是「…of the World, Volume 1」；2019 Blue Note 再發 release 12db6e9d 已改小寫；只動大小寫與卷號標點、不動字——與第 473 條「不為了對齊改 MB 文字」的界線在此 |
| `That’s Where It’s At`／`Cannonball’s Bossa Nova` | ASCII 撇號 | 第 506 條 Peggy Lee 先例 |
| `Ladylove` | 照 MB 一字 | 1988 CD 改題《Billie's Blues》、歐洲再發「Lady Love」兩字全進 queryAlias |
| `Bird Call` | 照 MB 兩字 | 1962 原盤 release title「Birdcall」一字進 queryAlias |
| `Nancy Wilson / Cannonball Adderley` | 照 MB 含斜線 | 原盤封面即此 |

## 第 536 條（同批）：**現場 5 張——三張 MB 有標、一張 MB 沒標、一張是「公開錄音會」**

- 《Ladylove》（MB [Live]）：1954-02 科隆 Jazz Club U.S.A. 巡演——**演出場地與精確日期本層沒核到一手**，研究層以 UAJ 14014 背面或 1988 CD 內頁核，核不到只寫「1954 年歐洲巡演現場」；year 取 1962 出版年，錄音 1954 只寫 risk（第 454 條 78 轉整編盤同理）。
- 《Inta Somethin'》（MB [Live]）：Jazz Workshop SF 1961-11-13。
- 《Three Blind Mice》（MB [Live]）：Renaissance Club Hollywood 1962-03-18。
- 《Town Hall Concert》（MB [Live]）：Town Hall 1962-10-12——**正文要寫成「公開錄音會」的形式**（Mingus 要錄音會、Wein 要演唱會，那是這張出名的原因）。
- **《Meet You at the Jazz Corner of the World, Volume 2》MB secondary-types 空**，Birdland 1960-09-14——第 397 條「沒標不代表不是現場」（c-137 第 504 條、c-138 b Vol. 1 同型），卡單標現場。
第 485 條那種「錄音場地標 Live」的形狀本組沒有。

## 第 537 條（同批）：**同場拆盤三組（一組跨批、一組同組、一組跨 1957–62 三張打擊盤）＋一個高風險同名**

- **Meet You at the Jazz Corner of the World Vol. 2（本組）↔ Vol. 1（c-138 b，47bfc480）**：1960-09-14 同晚，各算一張，risk 互指；**寫作層各寫各的五軌**，2002 2CD 合訂 RG d9c8c46a 刻意不釘。
- **Black Orchid ↔ Out of This World（皆本組）**：1962-02-04／03-07／03-08 三天素材同時出在兩張（分別 1964、1966 出版），維基兩條目 recorded 欄重疊——各算一張、risk 互指、**正文不得寫成兩場**，分卷曲目照維基、研究層以盤面核。
- **The African Beat（本組）↔ Orgy in Rhythm Vol. One／Two（c-137 a／c-136 b）↔ Holiday for Skins Vol. 1／2（c-137 a）**：不是同場，是 Blakey 三組打擊盤（1957 古巴系 Sabu／Barretto、1958 同、1962 奈及利亞系 Ilori／Chief Bey）——**正文不得寫成同一組樂手**，三組 risk 互指。
- **⚠ 同名高風險《Town Hall Concert》**：Mingus 另有 1964-04-04 Town Hall 五重奏現場同名盤（Jazz Workshop JWS 005／Fantasy，Discogs master 176937），**Apple search 回的 1442827600「Town Hall Concert (Live)」2 軌 ℗1964 就是那張**——正文與試聽比對務必帶 UAJ 14024 與 1962-10-12、大樂團陣容；池中目前兩張都沒有。
- 其他同名（正文帶 catno）：《Down to Earth》vs Rainbow；《After Hours》vs Sarah Vaughan 1961／The Weeknd；《Inta Somethin'》vs Larry Young《Into Somethin'》BLP 4187（差一字母）；《Adventures in Jazz》vs 同系列 Adventures in Time／Blues；《A Merry Christmas!》vs Supremes／Crosby。

## 第 538 條（同批）：**CAA 21/22 命中；店面觀察（第 254 條，只寫觀察）Apple us `search` 一種查法 20/22 命中，7 張只命中再發形**

- **CAA RG 層 front 21/22**；**404 一張：《Black Orchid》**（RG 三筆 release 都沒圖）——研究層從 Discogs 1296894／19687519 取 BLP 4155 圖。
  命中 21 張裡 **7 張來源不是原盤圖**，研究層看版式：A Merry Christmas!（1970 Creative World 再發）、Ladylove（1962 法國盤）、The Cat Walk（2007 RVG）、That's Where It's At（1988 CD）、After Hours（1996 CD）、Year of the Iron Sheep（2010 JP CD）、My Hour of Need（BST 89001 立體聲，版式同）。
- Apple `search`：**未命中 2 張**：After Hours（回 Soul Message／Blues All Day Long 等）、Meet You Vol. 2（只有 2002 合訂條目 723618161，本卷無獨立條目）——只是觀察，研究層走藝人目錄與 collectionId。
- **Apple 只命中再發形／合訂形的**：Merry Christmas（12 軌合輯形）、Ladylove（16 軌《Lady Love (Billie's Blues)》）、Town Hall（12 軌 Complete）、Three Blind Mice（8 軌 Vol. 1）、Stormy Monday（13 軌）、Adventures in Jazz（10 軌）、Bossa Nova（10 軌）——「前 N 軌對應原盤」要逐軌比，**Ladylove／Town Hall／Three Blind Mice 的 CD 把 bonus 插進原序，寫作層按曲名配、不得寫「前 N 軌」**。
- **Apple releaseDate 本組 22 張裡 12 張是錄音日或 01-01 placeholder**（Down to Earth 08-23、Cat Walk 05-02、That's Where 01-02、African Beat 01-24、Latin Bit 04-26、Black Orchid 09-14、Bird Call 05-22＝MB 同源；Ladylove／Inta／Iron Sheep／Stormy Monday／Bossa Nova 01-01；Adventures 1963-01-01 年還錯）——第 484 條再證。
- 店面 artistId：Art Blakey 在 Apple 掛「Art Blakey & The Jazz Messengers」（Three Blind Mice）與「Art Blakey」（African Beat）兩個（第 434 條形）。

## 第 539 條（同批）：**實掃與交件數字、MB 建檔觀察、中間檔**

- 掛名層實掃：Stan Kenton 2／Kenny Dorham 7／Freddie Roach 1／Billie Holiday 8（含 Lady Day 王牌）／Donald Byrd 19（含 c-136～138 待上架 4）／Stanley Turrentine 7（含 c-138 b 2）／Art Blakey and the 6＋& The 5＋個人 1（＋c-136／137 打擊盤 5）／The Three Sounds 1＋待上架 6／
  `Richard "Groove" Holmes` 2／Dodo Greene 0／Sheila Jordan 個人 0（聯名 1）／Cannonball Adderley 8＋Quintet 4／Charles Mingus 20（含 c-137 b）／Jackie McLean 14（含 c-131 2）／Nancy Wilson 0／Lou Rawls 3／Les McCann 聯名 1／Ken McIntyre 1／Vi Redd 0／Grant Green 19（含 c-138 b）。
- **交件 22 張、19 位；退 1**（第 530 條，列舉假陽性）；年份改判 4（第 531 條）；`label` 改他廠 11（第 533 條）；掛名收攏 3、聯名 4、新掛名 3（第 534 條）；盤名取原名 1＋對齊 1（第 535 條）；現場 5（第 536 條）；CAA 21/22（第 538 條）。
- `chk-prop a`：標記 0。與 c-135／136／137／138 rgMbid 交叉：重疊 0。
- MB 建檔觀察（只報不改）：《Blue Lament》bootleg 建檔（第 530 條）；Black Orchid catno 4165（第 531 條）；My Hour of Need 原盤 16 軌（第 532 條）；Latin Bit 2007 RVG 同 catno 建四筆（717cbfc8／88e6dc9a／8d43dba1／2544a7bd）；Ladylove 1988 CD 同 barcode 兩筆各記 15／16 軌；
  殘缺建檔：A Merry Christmas! c0df343f、Ladylove ff951544、African Beat 79c846ee、Three Blind Mice 859c8d36／98aaf63e；Out of This World 2014 黑膠與 1995 JP CD 未建、Stormy Monday 1990 US CD 未建、My Hour of Need 1996 CD 未建。
- **給 b 組與後批**：(1) enum 的 1961–62 段裡 **UA Jazz 1962 那一年（Alan Douglas 製作：UAJ 14002／14014／14015／14016／14024）成批出現**，通則照第 502 條；(2) **RG 唯一 release 的 status 要看**（Bootleg 的退）；(3) 4155／4197 那種「目錄號超前段位」先疑年份；(4) jazzdisco 4100 系列頁已抓到 `scratchpad/c139a/web/jd-4100.html`（含 catalog 頁 jd-4100-cat.html 有逐號錄音日）、9000 系列 jd-9000.html／jd-9000-cat.html。
- 中間檔 `scratchpad/c139a/`：c139a-poolscan.txt（實掃 165 筆命中）、mb/（23 個 RG 的 release-group＋release＋CAA＋Apple 回傳）、c139a-mbsumm.txt（逐張摘要）、c139a-artists.txt（10 個 artist 實體＋4 個搜尋）、wiki/（23 個條目 infobox＋track listing＋personnel）、discogs/（27 個 catno／master 反查）、web/（jazzdisco 4000／4100／9000 索引與 catalog 頁）、c139a-build-1～4.mjs（prop 產生器）。

## 第 539a 條（主線 2026-09-15，a 組交件後）：**依第 313 條退五張——Capitol 四張＋Riverside 一張**

Stan Kenton《A Merry Christmas!》《Adventures in Jazz》、Nancy Wilson & Cannonball Adderley《Nancy Wilson / Cannonball Adderley》、
Lou Rawls with Les McCann Ltd.《Stormy Monday》（四張 Capitol 原盤）、Cannonball Adderley《Cannonball's Bossa Nova》（Riverside 原盤）。
**五張的 Blue Note 關聯都始於 1985 後的再發**，不歸此線。a 組 22 → **17**。
其餘：Kenny Dorham《Blue Lament》Bootleg 退（第 530 條）、年份改判四張（第 531 條，含壓盤四年的《Out of This World》1966）、
UA Jazz／Pacific Jazz 原盤七張照收——**這些是 Liberty／UA 併購後以 BN 目錄號再發的，關聯始於 1960–70 年代，歸此線。**
