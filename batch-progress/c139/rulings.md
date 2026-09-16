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

# b 組（Blue Note 1962–1963：BLP 4082／4108／4120–4161 ＋ UA／Pacific Jazz／Riverside／Capitol／Odeon 轉來 6 張 ＋ 1986 庫存首發 1 張，22 筆覆核）

策展層 b 組，2026-09-15。交件 `batch-progress/c139/prop-b.json`（`g: "b"`），
`node batch-progress/c139/chk-prop.mjs b` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／102 批 4,248 張、同 rgMbid 不同掛名 0）。
rgMbid 與同批 a 組 `prop-a.json`（22）、c-138 `prop-a`（5）／`prop-b`（22）程式交叉：**重疊 0**；掛名＋盤名折疊鍵交叉：**重疊 0**。號段 **540–549**。

## 第 540 條（2026-09-15，c-139 b 組）：**22 筆覆核結果——收 20、退 2；rgMbid 全部照 enum，無一釘錯；年份改判 5 張**

22 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits+recordings`，title／credit／frd／catno／載體／軌數逐筆對過，**enum 的 rgMbid 沒有一筆釘錯**。
實掃卡池（`seed_cards.json` 16,450 列＋`desc-tools/batches/cards/c1*.json`＋`batch-progress/c12x–c13x/prop-*.json`，合計 18,719 列；掛名 19 組關鍵字＋盤名雙向子字串＋rgMbid 直比）：
**22 筆撞池 0**；盤名層命中全是他人假陽性（Placebo《Never Let Me Go》、Rolling Stones／Harold Melvin《Black and Blue》、Hutcherson《San Francisco》）；
Strayhorn 那張依第 490 條用 RG title「The Peaceful Side of Jazz」與原盤題「The Peaceful Side」各掃一次，都零。掛名層命中都是同人不同碟（見第 549 條）。

**退掉 2 張（逐筆）**：

| 筆 | rgMbid | 理由分類 | 說明 |
|---|---|---|---|
| Lou Rawls《Black and Blue》1963 | ec2501cb-d15b-4763-a394-17dbfe64f8a9 | **原盤 Capitol 主流人聲、Blue Note 只在數位再發（第 509a 條第 1 點）** | 原盤 Capitol T-1824／ST 1824（1963，12 軌，Onzy Matthews 大樂團伴奏的藍調人聲盤）；RG 轄下 Blue Note 只有 2017-02-17 數位版 00ebe5f0（13 軌）。與 c-137 Peggy Lee 完全同形。⚠ 同批 a 組第 533 條收了 Rawls《Stormy Monday》（Capitol T 1714，與 Les McCann Ltd. 聯名、有 1990 Blue Note 實體 CD）並標「主線可退」——本張連實體 CD 都沒有，退得更直接；兩張的差別只在「有沒有 Blue Note 實體」，主線若把 Stormy Monday 也退掉是一致的。池中 `Lou Rawls` 3 張是 soul 線的卡，本張若要收應走 soul／blues 線，不是 Blue Note 目錄。 |
| Marcos Valle《Samba "demais"》1963 | 703b582b-1a26-3adc-a8b6-72adef36567f | **原盤 Odeon（巴西）bossa nova、Blue Note 只是 EMI 家族 2008 再發的掛名（第 509a 條延伸）** | 原盤 Odeon MOFB 3376（BR 1963，12 軌；enum 的「MOFB 3372」是 Discogs 反查另一張聖誕合輯，MB release 88691124 記 3376 才對）；RG 轄下 Blue Note 只有 2008-06-16 GB CD fe092a8a（barcode 5099921674228＝Discogs 4151465「EMI／Celebrate 50 Years Bossa Nova」系列，MB 把系列掛名登成 Blue Note）。第 509a 條的判準是「原盤非 Blue Note 併購／授權進目錄的爵士盤，Blue Note 只是再發 badge」——Capitol 人聲是一例，EMI 巴西的 bossa nova 是同一形。**退；但這張本身值得收**（Valle 出道盤，池中已有他 1970–73 三張），**轉線候補：巴西線**，rgMbid 已釘、release 端點已回問（scratchpad/c139b/c139b-mb/rel-703b582b…）。 |

沒有撞池退件、沒有判為合輯退件、沒有列舉假陽性（a 組第 530 條的 bootleg 形本組沒有：20 張的原盤 release 全部 status Official，唯一無 status 的是 Blue John 的 1963 test pressing 筆，見第 541 條）。
「原盤他廠」6 張裡 4 張改 `label` 收、2 張退（第 542 條）。

## 第 541 條（同批）：**年份改判 5 張——4 張是「MB 把錄音年填成原盤年」（4125／4139／4158／4161 全落在 1963 錄、1964 出的那一段），1 張是 1963 年 test pressing 被建成正式發行**

| 碟 | enum／MB | 改判 | 依據 |
|---|---|---|---|
| Lou Donaldson《Good Gracious!》BLP 4125 | 1963（兩筆原盤 release 都填 1963＝錄音年 1963-01-24） | **1964** | Discogs master 260188／3701727 1964；jazzdisco 4100 索引 BLP 4125＝1964；維基 infobox「Early June 1964」引 Billboard |
| Grant Green《Am I Blue》BLP 4139 | 1963（同號兩筆：3b4cb051 BST 84139「1963」無來源／d482a08b BLP 4139「1964-06」；frd 取最早的那筆——c-136 第 478 條第 2 點的形） | **1964** | Discogs master 163275／1055780 1964；jazzdisco BLP 4139＝1964；維基「Late June 1964」引 Billboard |
| Freddie Roach《Good Move!》BLP 4158 | 1963（原盤 release c34acb71 填錄音年；**維基 infobox 也寫 1963、無來源**） | **1964** | 第二場錄音 1963-12-09，同年上市不可能；Discogs 2201078／1058094／master 259364 全 1964；jazzdisco BLP 4158＝1964；目錄號 4157 Sidewinder（1964-07）之後 |
| George Braith《Soul Stream》BLP 4161 | 1963（原盤 release 724d28f5 填錄音年；**Discogs 1101030 也標 1963、但 notes 只寫「Recorded on December 16, 1963」——同一個錄音年來源**） | **1964** | jazzdisco BLP 4161＝1964；維基 infobox 1964、George Braith 條目「1963 [1964]」；12-16 錄音 |
| Big John Patton《Blue John》BST 84143 | 1963（release b74022f2「1963 US 12" Vinyl BST 84143，credit “Big” John Patton，**無 status**」） | **1986** | 那筆＝Discogs 14223083／30306110「1963 mono／stereo **test pressing**」（notes「Original mono test pressing from 1963」）；市售首發 Discogs 30853602「1986 US BST 84143，Manhattan Records，DMM，previously unreleased」；jazzdisco BST-84143＝1986；維基「not released until 1986」 |

**維持 MB 的兩說 2 張**：
- Cannonball Adderley《Jazz Workshop Revisited》：MB 1963（RM 444／RS 9444 兩筆）＝Discogs 三筆原盤 1963；**維基 infobox 1962，且引 Whitburn《Top LPs 1955–1996》說「1962 年進榜、1963 年到第 11 名」**——若 1962 年已進 Billboard 榜，上市可能是 1962-12。依第 364 條「相差一年照 MB」取 1963，1962 說寫進 risk；⚠ 這是 c-133 第 431 條講的「紙本」級證據站在另一邊的例子，研究層若拿到 Billboard 原刊的進榜週，改 1962 是可逆的。
- Don Wilkerson《Elder Don》：MB 1963＝Discogs 2311730 1963＝jazzdisco BLP 4121＝1963；維基 infobox 1962 無來源（＝錄音年 1962-05-03），且同條目正文說它比《Preach Brother!》（BLP 4107，1962）晚出——與 1963 相容，取 1963。

其餘 13 張 MB／Discogs／jazzdisco／維基（有的話）一致。月份小差不改年：Never Let Me Go MB 1963-10 vs Billboard 11 月底；Natural Soul MB 1963-03＝Billboard；Rockin' the Boat MB 1963-09。

方法論：
1. **BLP 4125～4161 這一段是「1963 錄、1964 出」的密集區**：4124 New Perspective、4125、4133 Swingin' Affair、4138、4139、4144、4147、4149、4150、4151、4152、4153、4157、4158、4161 jazzdisco 全記 1964，**enum 按 MB 年份把它們排進 1963 段**（第 531 條第 1 點同形）。後批（1964–66）會反過來：MB 記 1964 的可能是 1965／66 出版（4160、4169、4191、4194、4197 jazzdisco 記「1966+」）。
2. **Discogs 也會用錄音年**（Soul Stream 1101030）——Discogs 條目 notes 只有錄音日而無出版來源時，它與 MB 是同源，不算第二個來源（第 431 條）。
3. **MB 把 test pressing 建成無 status 的正式 release**（Blue John）：RG 轄下年份最早那筆若無 status、無 barcode、credit 與其他筆不同，先查 Discogs 是不是 test pressing／acetate。

## 第 542 條（同批）：**「原盤可能他廠」6 張逐張判——4 張成立改 `label` 收、2 張成立退；另 1 張 enum 沒標的是 Blue Note 自家 1986 美國首發庫存盤**

| 碟 | enum note | 判定 | `label`／`year` | 形 |
|---|---|---|---|---|
| Billy Strayhorn《The Peaceful Side of Jazz》 | BN 首發 2019、原盤可能他廠 | **成立**：United Artists Jazz UAJ 14010／UAJS 14010（1963）；Blue Note 只在 2019-05-03 數位版 | United Artists Jazz UAJ 14010／1963 | UA 數位掛名（第 502 條；a 組第 533 條 Alan Douglas 1962–63 UA Jazz 系列同批） |
| Ken McIntyre《'Way, 'Way Out》 | BN 首發 2019、原盤可能他廠 | **成立**：United Artists UAL 3336／UAS 6336（1963）；Blue Note 只在 2019-02-08 數位版（MB 國別「AF」） | United Artists UAL 3336／1963 | UA 數位掛名；與 a 組《Year of the Iron Sheep》成對 |
| Curtis Amy & Dupree Bolton《Katanga!》 | BN 首發 2021、原盤可能他廠 | **成立**：Pacific Jazz PJ-70／ST-70（1963）；Blue Note 只在 2021 數位版，2021 Tone Poet 黑膠 MB 掛 Pacific Jazz | Pacific Jazz PJ-70／1963 | Pacific Jazz Tone Poet（第 455／472 條） |
| Cannonball Adderley《Jazz Workshop Revisited》 | live；BN 首發 2001、原盤可能他廠 | **成立**：Riverside RM 444／RS 9444（1963）；Blue Note 2001-01-23 CD 294412（barcode 724352944125）＋數位 | Riverside RM 444／1963 | **Riverside**（a 組第 533 條《Cannonball's Bossa Nova》是本線第一張，本張第二張）；Discogs 以 label=Blue Note 反查零命中，MB 那筆 2001 CD 的來歷研究層核。**收，主線可退**——第 509a 條第 1 點的判準是「Capitol 主流人聲／流行」，本張是爵士現場盤；但 Riverside 母帶屬 Fantasy／Concord 系，與 UA／Pacific Jazz「被 EMI 併進 Blue Note」的距離不同，**若主線判 Riverside 不歸此線，a 組 Bossa Nova 與本張要一起退** |
| Lou Rawls《Black and Blue》 | BN 首發 2017、原盤可能他廠 | **成立→退**：Capitol T-1824（1963）；Blue Note 只在 2017 數位版 | — | 第 509a 條第 1 點（第 540 條退表） |
| Marcos Valle《Samba "demais"》 | BN 首發 2008、原盤可能他廠 | **成立→退**：Odeon MOFB 3376（BR 1963）；Blue Note 只在 2008 GB CD（EMI「Celebrate 50 Years Bossa Nova」系列） | — | 第 509a 條延伸（第 540 條退表） |
| Big John Patton《Blue John》 | （無） | **enum 漏標**：MB 把 1963 test pressing 建成原盤，enum 因此沒觸發「晚 3 年」規則；實為 **Blue Note 自家庫存盤、1986 美國首發**（不是日本 GXF／BNJ 型），完整 session 專輯非 outtakes | Blue Note BST 84143（US 1986）／1986 | 第 509a 條第 2 點「完整 session 專輯就收」 |

**本段 enum 22 筆裡 16 筆是 Blue Note 自家原盤**（4082、4108、4120、4121、4125、4126、4128、4129、4131、4136、4139、4141、4143、4148、4158、4161），比 a 組的 10/23 密得多——4100 段是 Lion 期自家錄音的主體，他廠轉來的只剩零星幾張。

## 第 543 條（同批）：**掛名：收攏 4、分裂處理 2、聯名 1、新掛名 4 反查**

| MB credit | 本卡掛名 | 依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組 e9ac5139）《Silver's Serenade》 | `Horace Silver` | 池中 8 張；c-136 第 482 條／c-137 第 503 條 |
| `Solomon Ilori and His Afro-Drum Ensemble`（群組 1b44ad7c）《African High Life》 | `Solomon Ilori` | 第 452 條領班本名；a 組第 534 條把《The African Beat》的 Afro-Drum Ensemble 收攏到 `Art Blakey` 同理；MB 另有 Person 52e26337 |
| `Cannonball Adderley Sextet featuring Nat Adderley and Yusef Lateef`（群組 93be8f4b「1962–1963」＋兩個 Person）《Jazz Workshop Revisited》 | `Cannonball Adderley` | 第 363 條第二型；池中 `Cannonball Adderley` 8 ＞ `The Cannonball Adderley Quintet` 2 ＝ `Cannonball Adderley Quintet` 2；a 組第 534 條 Bossa Nova 同收攏。⚠ **Cannonball 三向分裂**（audits 未列）留本機 |
| `The Incredible Jimmy Smith`（原盤 release credit；RG credit 是 Jimmy Smith）《Rockin' the Boat》 | `Jimmy Smith` | 池中 23 張；盤面掛名進 queryAlias |
| `John Patton`（RG credit）／`“Big” John Patton`（1963 test pressing）／`'Big' John Patton`（1989 CD）《Blue John》 | **`Big John Patton`** | ⚠ 池中分裂：`Big John Patton` 3（Let 'em Roll、Oh Baby!、Got a Good Thing Goin'）vs `John Patton` 1（Along Came John）——照多數；**《Along Came John》那張留本機統一**，Apple 也掛 Big John Patton |
| `Horace Parlan`《Up & Down》 | `Horace Parlan` | 池中 9 vs `The Horace Parlan Trio` 1（audits 未列的編制分裂），MB credit 同字串 |
| `Curtis Amy & Dupree Bolton`（兩個 Person，join &）《Katanga!》 | **照 MB 聯名** | 第 363 條第 1 型；c-138 b《Curtis Amy & Frank Butler》同形；不計入 Amy 單人目錄 |

新掛名四個（池中零張，都過第 307 條反查）：
- **`Solomon Ilori`**：MB 52e26337 Person、US、1935–；搜尋只回本人＋群組，無同字串不同人。
- **`George Braith`**：MB c5afb6db Person、US、1939-06-27–（本名 Braithwaite）；搜尋只回 1 筆。兩張（Two Souls in One、Soul Stream）同掛。
- **`Billy Strayhorn`**：MB 23ec9ce1 Person、US、1915–1967；搜尋另回 Billy Strayhorn Trio／Billy Strayhorn's All Stars 兩個群組，不撞。
- **`Dupree Bolton`**：MB fe5c87bf Person、US、1929-03-03–1993-06-05；搜尋只回 1 筆。只在聯名字串裡出現。

既有字串沿用：`Freddie Roach`（MB d2d260d5，alias Freddy Roach）、`Don Wilkerson`（MB d8be2328「US jazz/R&B saxophonist」；⚠ MB 另有同名 Person 3ae17c82「engineer, Island Jazz, Buffalo, NY」——不同人、無發行，第 250 條以 disambiguation 定，池中字串指的是本人）、`Ken McIntyre`（MB 113950c4，alias Makanda Ken McIntyre；池中《Home》1975 同人）。

## 第 544 條（同批）：**盤名：印刷體撇號改 ASCII 3 張、現場盤取短名 1 張、RG title 是再發名 1 張（照 MB、原題進 queryAlias）**

| MB RG title | 本卡盤名 | 依據 |
|---|---|---|
| `Mo’ Greens Please`／`Rockin’ the Boat`／`‘Way, ‘Way Out` | ASCII 撇號 | 第 506 條 Peggy Lee 先例、a 組第 535 條同形；⚠ McIntyre 那張的撇號在字首（'Way＝Away 的省略），標題比對要用去撇號版再比一次 |
| `Jazz Workshop Revisited: Recorded ‘live’ in San Francisco` | **《Jazz Workshop Revisited》** | 副題是盤面小字，Apple／Discogs／Landmark／2001 CD 主名都是短名；第 91／95 條「RG 標題與卡片盤名不必相等」，長名與荷蘭 Fontana 改題《San Francisco Revisited》進 queryAlias |
| `The Peaceful Side of Jazz` | **照 MB** | ⚠ 第 490 條的形：原盤 UAJ 14010 與 Solid State、1996 Capitol Jazz CD 都題《The Peaceful Side》，「…of Jazz」是英國 World Record Club T 128 與 2019 Blue Note 數位版的題名（MB 把四筆 release 全登成 of Jazz）；1968 Solid State 又題《The Peaceful Side of Billy Strayhorn》。依第 506 條照 MB RG title（現行數位流通名），兩個變體進 queryAlias，**研究層若改回原題不影響 MBID**；撞池已用兩題各掃一次 |
| `Up & Down` | 照 MB | jazzdisco「Up And Down」、Apple「Up and Down」進 queryAlias；chk-prop 折疊鍵已把 & 換 and |
| `Good Move!`／`Katanga!` | 照 MB 帶驚嘆號 | 2024 Tone Poet／Apple 去驚嘆號版進 queryAlias |
| `Blue John`／`Am I Blue`／`Never Let Me Go`／`Silver's Serenade`／`It Just Got to Be` | 照 MB | 同名撞擊見第 546 條 |

## 第 545 條（同批）：**現場 1 張；同場拆盤 0；關聯組 5 組（正文陣容不得互抄）**

- **現場**：《Jazz Workshop Revisited》MB secondary-types [Live]，Jazz Workshop, San Francisco 1962-09-22／23——演出場所，非第 485 條那種錄音場地，卡單標現場；原 LP 留了三段 Cannonball 口白（曲數 9 含口白），正文可寫。其餘 19 張全是 Van Gelder／Pacific Jazz／Barclay 錄音室，沒有第 397 條「MB 沒標的現場」。
- **同場拆盤**：本組 0（Vol. 拆盤形本段沒有）。
- **關聯組**（不同場、各算一張、risk 互指）：
  1. **Braith／Green／Gardner 1963 三張**：Two Souls in One（9-04，Donald Bailey 鼓）、Soul Stream（12-16，Hugh Walker 鼓）、**Blue John（7-11／8-02，Patton 領銜、Braith＋Green＋Ben Dixon，Gardner 不在）**——三張鼓手／風琴手都不同，正文不得互抄。
  2. **Donaldson／Green／Patton／Dixon 兩張**：The Natural Soul（1962-05-09，加 Tommy Turrentine）、Good Gracious!（1963-01-24，四重奏）——Patton 的唱片首演是前者。
  3. **Ilori ↔ a 組《The African Beat》**（1962-01-24，Blakey 領銜）：同一批奈及利亞鼓手（Ilori、Chief Bey）、不同場、不同領班（第 537 條三組打擊盤同理）。
  4. **Roach 三張 ↔ a 組 Down to Earth**：Mo' Greens（兩場兩編制）、Good Move（三重奏＋五重奏兩場）——正文不得把 Burrell／Mitchell／Mobley 寫成全程。
  5. **Three Sounds ↔ a 組 Black Orchid／Out of This World**：本張 1960-12 錄，那兩張 1962-02／03 錄——不同場。
- **Grant Green 本組出現在 9 張裡**（Am I Blue 領銜；Two Souls、Soul Stream、Blue John、Natural Soul、Good Gracious、Up & Down、Elder Don、My Point of View 側人）——c-137 第 509 條 Sonny Clark 的形，正文各寫各的編制。

## 第 546 條（同批）：**同名撞擊高風險三處，正文與試聽比對務必帶 catno**

- **《Never Let Me Go》**：池中已有 `Placebo — Never Let Me Go`（2022）——掛名不同、chk-prop 不撞，但標題搜尋會混；帶 BLP 4129 與 Shirley Scott。Apple 第一個搜尋詞（藝人＋盤名去撇號）零命中、第二個詞才命中 716038904——第 254 條「一種查法落空不等於沒有」再證。
- **《Am I Blue》**：與標準曲同名，Apple 搜尋撞到 Lana Del Rey／Massive Attack 等；帶 BLP 4139。
- **《Black and Blue》**（已退）：池中 Rolling Stones 1976、Harold Melvin《Black & Blue》1973——若日後走 soul 線收 Rawls 這張，鍵不撞但要帶 T-1824。
- 其他同名（正文帶 catno）：《Up & Down》（通名）、《Soul Stream》／《Two Souls in One》（Braith 兩張盤名相近）、《Silver's Serenade》（與同名曲同字）、《Katanga》（與同名曲同字）。

## 第 547 條（同批）：**MB 建檔問題清單（本層不改 MB，留研究層／主線）**

1. Never Let Me Go 原盤 release 89da8999：載體「10" Vinyl」——BLP 4129 是 12 吋（Discogs 全部條目）；且只登立體聲號 BST-84129。
2. Blue John release b74022f2：1963 test pressing 建成無 status 的 release，RG frd 因此錯成 1963（第 541 條）。
3. Am I Blue：同號兩筆 3b4cb051（BST 84139「1963」）／d482a08b（BLP 4139「1964-06」），frd 被拉低。
4. Good Gracious!／Good Move!／Soul Stream 原盤 release 都填錄音年（第 541 條）。
5. Silver's Serenade 原盤 release f9fa3c24：無載體、無 catno、無 barcode 的 bare 登錄——RG 轄下沒有一筆帶 BLP 4131 原盤 catno 的完整 release。
6. African High Life d4b6fd3b／Elder Don dc252b34／Never Let Me Go 89da8999：原盤只登立體聲 BST 號，mono BLP 號沒建（a 組第 532 條同形）。
7. The Natural Soul 2003 XE CD ad36d1e3：artist-credit 列五位團員——那筆 release 的登錄方式，RG credit 仍單掛 Donaldson。
8. The Peaceful Side of Jazz：轄下 afaf4bdf「Piano Passion」（2020 數位 21 軌、無廠牌）疑為掛錯 RG 的合輯；四筆 release 全登成「of Jazz」、原盤題《The Peaceful Side》沒反映。
9. My Point of View：2020 Tone Poet 重複兩筆（32934bc4／b6685bf3）、1987 JP CD 兩個 catno（CP32-9526／CP32-9256）疑其一打錯。
10. It Just Got to Be／Two Souls in One：RG 各只有 1 筆 release，日本限定 CD（前者加 2 軌）與再壓都沒建；再發資料走 Discogs master 362345／344214。
11. Samba "demais"（已退）：2008 GB CD fe092a8a 的 label 登成 Blue Note，Discogs 4151465 是 EMI「Celebrate 50 Years Bossa Nova」系列——**enum 的 Blue Note 目錄裡混進 EMI 系列盤的來源就是這種登錄**，後批（1985 後那 873 張）會大量碰到。
12. 'Way, 'Way Out 2019 數位 release 70aaa6eb：國別「AF」——enum 的 country 欄因此變成 AF，不是原盤國。

## 第 548 條（同批）：**CAA 18/20 命中（原盤圖 9 張）；店面觀察（第 254 條，只寫觀察）Apple us `search` 20/20 命中、其中 2 張要換搜尋詞**

- **CAA RG 層 front 18/20**；**404 兩張：《It Just Got to Be》（RG 只一筆 release）、《Two Souls in One》（同）**——研究層從 Discogs 2885076／1061137 取原盤圖。
  命中 18 張裡 **來源是原盤 release 的 9 張**（Good Gracious a271a814、My Point of View 4c2f7969、Jazz Workshop Revisited a698a3ed、Up & Down da008f61、Natural Soul 05b1d8db、Elder Don dc252b34、Peaceful Side e50af3fd、Katanga 0edd91c7、'Way 'Way Out 11172301）；
  **疑原盤版式但來源筆有問題的 2 張**（Am I Blue 來自年份錯登的 BST 84139 筆、Blue John 來自 1963 test pressing 筆——圖可能是 1986 盤）；
  **非原盤圖 7 張**（African High Life 1994 JP CD、Silver's Serenade 1998 CD、Mo' Greens 2005 JP CD、Rockin' the Boat 1994 JP CD、Soul Stream 1994 JP CD、Never Let Me Go 1992 CD、Good Move 2000 CD）——研究層看版式，Discogs 各卡 risk 已列 id。
- **Apple `search` 20/20**，但 Never Let Me Go 與 It Just Got to Be 第一個搜尋詞落空、換詞才中（第 254 條）。命中形：RVG／Expanded 版 7 張（Silver's Serenade、Rockin' the Boat、Am I Blue、Never Let Me Go 8 軌、My Point of View 6 軌、Up & Down 7 軌、Natural Soul 7 軌）——bonus 全在原序之後，「前 N 軌對應原盤」可採（c-130 Perfect 先例）；African High Life 9 軌（2006 CD 形，前 6 軌對應）；Jazz Workshop Revisited 11 軌（2001 CD 形，原 LP 9 軌散在其中、寫作層按曲名配）；其餘 11 張軌數＝原盤。
- **Apple releaseDate 本組 20 張裡 16 張是錄音日或 01-01 placeholder**（Mo' Greens 03-31、Am I Blue 05-16、Up & Down 1961-06-18、Natural Soul 1962-05-09、Good Move 12-20、Two Souls 12-10、Soul Stream 03-16、Peaceful Side 1961-05-01、Katanga 05-01、Elder Don 1962-01-01、其餘 01-01；Blue John 1986-01-01 年對）——第 484 條再證，店面日期不當年份來源。

## 第 549 條（同批）：**交件數字、實掃順帶的既有卡問題、中間檔、給後批**

- **交件 20 張、17 位；退 2**（第 540 條）；年份改判 5（第 541 條）；`label` 改他廠 4（第 542 條）；掛名收攏 4、分裂處理 2、聯名 1、新掛名 4（第 543 條）；盤名 ASCII 3、短名 1（第 544 條）；現場 1（第 545 條）；CAA 18/20（第 548 條）。
- `chk-prop b`：標記 0（跨批 3 筆已知舊帳是 c49b↔c106／cseab↔c64，第 365 條）。與 a 組、c-138 a／b 交叉：rgMbid 0、折疊鍵 0。
- 掛名層實掃：Horace Silver 8＋王牌 1＋待上架 6／The Three Sounds 1＋待上架 4／Lou Donaldson 8＋待上架 8／Freddie Roach 1（＋a 組 1）／Jimmy Smith 12＋待上架 11／George Braith 0／Grant Green 18＋待上架 1（＋a 組 1）／Stanley Turrentine 5＋待上架 2（＋a 組 1）／Herbie Hancock 18＋王牌 1／Cannonball Adderley 8＋Quintet 4／Horace Parlan 9＋Trio 1＋聯名 2＋待上架 1／Don Wilkerson 1／Big John Patton 3＋John Patton 1／Billy Strayhorn 0／Curtis Amy 待上架 1（聯名）／Dupree Bolton 0／Ken McIntyre 1／Solomon Ilori 0。
- **實掃順帶抓到的既有卡問題（線上資料，本組不動，留本機）**：
  | 池中 | 問題 | 依據 |
  |---|---|---|
  | `Jimmy Smith — Back at the Chicken Shack` 年份 **1960** | BLP 4117 出版 **1963**（jazzdisco 4100 索引；維基 released 1963），1960 是錄音年（1960-04-25）——第 476 條 Birdland Vol. 1 同形 | jazzdisco jd-4100 |
  | `John Patton — Along Came John` vs `Big John Patton` ×3 | 掛名分裂，audits 未列；本組新卡掛 `Big John Patton`，那張要跟著改 | 實掃 |
  | `Cannonball Adderley` 8／`The Cannonball Adderley Quintet` 2／`Cannonball Adderley Quintet` 2 | 三向編制分裂，audits 未列 | 實掃 |
  | `Horace Parlan` 9／`The Horace Parlan Trio` 1 | 編制分裂，audits 未列 | 實掃 |
- 中間檔 `scratchpad/c139b/`：c139b-poolscan.mjs／.txt（實掃 273 行）、c139b-mb.mjs＋c139b-mb/（22 個 RG 的 release-group／release／CAA／Apple 回傳＋6 個 artist 實體＋12 個搜尋）、c139b-mb-summary.json（22 筆彙整）、c139b-discogs/（28 個 catno／藝人反查＋5 個 release 詳情）、c139b-web/（jazzdisco 4100 索引 jd-4100.html、30 個維基 raw）、c139b-upsert.mjs＋c139b-build-1～4.mjs＋c139b-patch-1.mjs（prop 產生器）。
- **給後批**：(1) **4160～4199 段 jazzdisco 記「1966+」的有 4160、4169、4191、4194、4197**——那些會被 enum 排進 1964 段，先疑年份；(2) **George Braith《Extension》BLP 4171（1964 錄、1967 出）**在 Liberty 期那一段，掛名沿用本組 `George Braith`；(3) **Riverside 形已兩張**（a 組 Bossa Nova、本組 JWR），主線裁一次就好；(4) **EMI 系列盤混進 Blue Note 目錄**（Samba "demais" 形）在 1985 後那 873 張裡會是主要的假陽性來源，enum 濾法要看 release 的 barcode 前綴／系列名而不只 label 名；(5) Marcos Valle《Samba "demais"》rgMbid 703b582b 已釘，轉巴西線時直接用。

## 第 549a 條（主線 2026-09-15，b 組交件後）：**Riverside《Jazz Workshop Revisited》依第 313 條退；本批 36 張**

Riverside 原盤、Blue Note 關聯始於 1985 後——與 a 組的《Cannonball's Bossa Nova》同判。b 組 20 → **19**，本批 a 17＋b 19＝**36**。
其餘全數追認：Blue John 1963→1986（MB 把 test pressing 建成正式 release，實為 1986 庫存盤首發，**完整 session 故收**）；
四張「1963 錄、1964 出」改判；Marcos Valle《Samba "demais"》轉巴西線候補（rgMbid 已釘）。
**既有卡問題留本機**：`Jimmy Smith — Back at the Chicken Shack` 年份 1960 應為 1963（jazzdisco BLP 4117）；`John Patton`／`Big John Patton` 分裂。
**給 c-140 的提醒**：4125–4161 段是「1963 錄、1964 出」密集區，4160–4199 的「1966+」要先疑年份。

## 第 550 條（主線 2026-09-16，研究層 b 組交件後）：**第 541 條的五張改判全部由同期紙本追認；Elder Don 定案 1963**

b 組 19 筆全 `full`、QA 清。本層自行抓了 **1963 全年 52 期 ＋ 1964 年 1–9 月共 91 期《Cash Box》**
（worldradiohistory PDF 有文字層，不必 OCR），**19 張裡 16 張拿到同期紙本**（專輯評論或 Blue Note 月度廣告），
另跑了 19 張的 Discogs catno 檢索（第 531 條）。

**第 541 條五張改判全部追認**：
Good Gracious!（CB 1964-07-18 評論）、Am I Blue（CB 1964-08-08）、
Good Move!（CB 1964-07-11，內文自稱「third LP on Blue Note」）、
Soul Stream（CB 1964-06-27，自稱「his second Blue Note offering」、鼓手 Hugh Walker 對得上）、
Blue John（**1986**；91 期 Cash Box 對「Blue John／4143」零命中，**反證當年未上市**）。
⚠ **Soul Stream 是本組唯一 Discogs 站錯邊的一張**——它的 1963 是錄音年回填（第 431 條同源）。
**「Discogs 原壓群」這條舉證不是萬能的：它也會整群繼承同一個錯誤的回填年。**

**策展層「維持兩說」的 Elder Don 定案 1963**：CB 1963-04-06 專輯評論 ＋ 維基引的《DownBeat》1963-05-23
兩份紙本，**維基 infobox 的 1962 是錄音年**。

**有疑議 1 張，維持卡單**：Ken McIntyre《'Way, 'Way Out》——盤面五筆（美／加、mono＋stereo）與 MB、維基全是 1963，
但 CB 1964-01-11 的 UA 業務會議報導把它列進「New UA albums」名單。**判仍取 1963**
（實體盤面一致；年初業務會議常推上一季的貨），已寫進 `yearVerified` 標明可逆。

## 第 551 條（同日）：**b 組缺試聽兩張都補上；缺封面兩張的替代圖來源已標**

**串流採信**：Jimmy Smith《Rockin' the Boat》**`716175252`**（7 軌全為原盤、無 bonus）；
Stanley Turrentine《Never Let Me Go》**`716038904`**（8 軌，本盤第一軌〈Trouble〉＝該條目第 1 軌，
前 7 軌為原盤軌序，第 8 軌是 CD bonus）。兩張都第一種查法即中並逐軌核過，主線已補進 `previews.json`。
**c-139 試聽 32/36**（缺的 4 張在 a 組，研究層仍在跑）。

**缺封面兩張的替代圖來源**（本機上傳時用）：
《It Just Got to Be》→ Discogs release 2885076 或 Apple `1362892401`；
《Two Souls in One》→ Discogs release 1061137 或 Apple `1438777060`。

## 第 552 條（同日，跨組與跨批）：**兩件從 b 組掃到的、不屬於 b 組的事**

1. **a 組《Year of the Iron Sheep》（UAJ 14015）的 1962 要再核**：Cash Box **1963-03-09** 有它的專輯評論
   （誤植成「United Artists 15015」，第 509c 條同形），而同系列號碼更小的《The Peaceful Side》UAJ 14010
   遲至 **1963-02-09** 才被評論。**已轉給仍在跑的 a 組代理，結論寫進 `yearVerified`。**
2. **池中既有卡 `Jimmy Smith — Back at the Chicken Shack` 年份 1960 應為 1963**（第 549 條已列），
   b 組以 CB 1963-03-09／04-13 廣告再證一次。**雲端不能改 `seed_cards.json`，列進本機待辦。**

**b 組掃到的 91 期 Cash Box 命中頁全文留在 scratchpad `c139b/research/cbtext/`**——
⚠ **scratchpad 不隨容器存活**，c-140 起若還要 1963–64 的紙本，要嘛趁容器還在時複用，要嘛比照
`batch-progress/enum/cashbox-bn-1960-62-ocr.txt` 收進 repo。

## 第 553 條（主線 2026-09-16，研究層 a 組交件後）：**UAJ 14000 系列的年份——兩張改判 1963，且這段目錄號讓第 531 條失效**

a 組 17 筆全 `full`、QA 清。**年份改判兩張，全部採信**：
**Ken McIntyre《Year of the Iron Sheep》（UAJ 14015）1962 → 1963**、
**Vi Redd《Bird Call》（UAJ 14016）1962 → 1963**——同一批貨、同一條證據鏈，**兩張一起改**。

證據鏈：錄音最後一場 1962-09-04；**1962-09 到 1963-01 之間兩家週刊完全沒有記載**
（期間唯一的 UA Jazz 新片是 Cash Box 1962-10-27 只列三張的廣告，兩盤都不在其中）；
Cash Box 1963-01-05 p7 記 UA 於 **1963-01-04 的 '63 Jamboree** 推出含「五張新 Jazz／Tale-Spinners」的 27 張新片；
**Billboard 1963-02-09 p29 一口氣評五張 UA Jazz（15007／15010／15015／15016／15019）**，
Cash Box 也在 1963-02-02、02-09、**03-09（Iron Sheep）**接連評出同一批。

⚠ **第 531 條在這段目錄號失效**：Discogs 的 UAJ 14007／14010／14001 都標 1963，
但《Coltrane Time》（14001）明明是 **1962-07** 首發——**這段 Discogs 的年份兩個方向都錯，多半抄封套 © 年**。
MB／維基／Apple 的 1962 三邊同源（第 431 條），一併不採。
另 **MB＋Apple 給《Bird Call》的「1962-05-22」不可能是上市日**（UA Jazz 首批 1962-07 才推出），判為 session 日。

**與第 550 條合起來是同一件事**：`Discogs 原壓群` 這條舉證**會整群繼承同一個錯誤的回填年**
（c-139 b 的《Soul Stream》、本組的整個 UAJ 14000 段）。**同期紙本永遠壓過它。**

## 第 554 條（同日）：**c-139 試聽補滿 36/36；a 組另擋下五處資料庫錯誤**

**串流採信 9 張 ＋ 缺試聽的 4 張全部解決**，主線已補進 `previews.json`：
Ladylove `1728555676`（合訂 16 軌，原盤十軌＝第 1–8 與 10–11 軌；⚠ **第 1 軌是 Leonard Feather 的報幕，
`previewUrl` 主線改取第 2 軌〈Blue Moon〉**）、Blakey Vol. 2 `723618161`（2002 兩張一套，
**本盤起始軌＝第 2 片第 2 軌**）、Three Blind Mice `724646592`（原盤六軌＝第 1–5 與第 7 軌）、
The Latin Bit `716598141`（原盤六軌＝第 1–6 軌）。
**不採信 4 張**（只跑 search 或曲序不符）：The Cat Walk、That's Where It's At、Town Hall Concert、After Hours
——**那四張探測層本來就有命中，維持探測層的 id**。
**缺封面的《Black Orchid》**：串流 `1379055147` 有完整封面與八軌試聽，**可作本機補圖線索**。

**擋下的資料庫錯誤五處**（已寫進各卡 notes）：
《Black Orchid》MB 原盤**目錄號 4165／年份 1962 兩欄都錯**（應 BLP 4155／1964）；
《Out of This World》MB 記 1962（**應 1966**，錄音年誤登）；《Portrait of Sheila》MB 與 jazzdisco 都記 1962（**應 1963**）；
《My Hour of Need》MB 原盤黑膠登成 16 軌（**原盤 10 軌**）；
Cat Walk／That's Where It's At／Iron Sheep 的 **MB 只收立體聲、沒收 mono 原盤**。

**第 509c 條（紙本誤植目錄號）本組中三次**：Billboard 1963-06-22 把 Ike Quebec《Blue & Sentimental》印成 4096（實為 4098）、
Billboard 1962-08-18 把《Three Blind Mice》印成 UAJ 14102（實為 14002）、
Cash Box 1963-03-09 把 Iron Sheep 印成「Year of the Sheep／United Artists 15015」。**這條已是常態。**

**佐證最弱的一張**：Richard "Groove" Holmes《After Hours》（PJ-59）——1962-05→1963-12、1964、1966 各段掃過，
只在 Cash Box 1966-08-27 的回顧廣告找到目錄號、無同期評論；靠 Pacific Jazz 同段號碼受評時間
（PJ-56＝1962-11-03）與 1962-04／07 兩則廣告夾出「1962 年 11 月之後」，**照 Discogs 原壓採 1962，正文不寫月份**。

## 第 555 條（同日）：**c-139 兩組掃的紙本收進 repo（180 期）**

- `batch-progress/enum/billboard-bn-1962-63-ocr.txt`（1.6 MB，**1962-06-02 → 1963-06-29 共 56 期**）
- `batch-progress/enum/cashbox-bn-1962-66-ocr.txt`（3.7 MB，**1962-05-05 → 1966-08-27 共 124 期**：
  1962 有 139 頁命中、1963 有 141、**1964 只有 62、1966 只有 119——後兩年是抽查段不是全掃**）

⚠ **1964–66 只是抽查**，c-140／c-141 要那幾年的紙本仍須自己補抓。涵蓋表已更新到
`batch-progress/enum/SOURCES-billboard-cashbox.md`（**開工看表不看檔名**，第 533 條）。
