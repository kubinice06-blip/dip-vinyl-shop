
---

## c-166 b 組（22 筆，2024–2025 全 jazz）策展裁定　號段 1990–

（b 組專用號段自 1990 起；1960–1989 為 a 組。本節一律 append，不整檔覆寫——第 1743-B 條。）

### 1990　`Bill Frisell feat. Brussels Philharmonic & Umbria Jazz Orchestra`《Orchestras》2024 的掛名：取裸名 `Bill Frisell`

第 1539 條（第 1745-B 條更正版）要取的是 MB `artist-credit` 的 `credited-name` 與 joinphrase
串接出來的那一種，本碟 RG 端串出來逐字是
`Bill Frisell feat. Brussels Philharmonic & Umbria Jazz Orchestra`。**不取**，理由是第 1746(四) 條的兩條都成立：

1. **三邊門檻不齊。** Discogs 30443669 的 notes 欄逐字
   `Disc One Recorded September 23 and 24, 2022 at De Bijloke, Ghent, Belgium and Flagey, Brussels, Belgium
   Commission by Muziekcentrum De Bijloke, Flagey and Brussels Philharmonic,`；
   `Recorded At` 欄另逐字帶 `Teatro Mancinelli`（Orvieto，Umbria Jazz 的場地）。
   **Brussels Philharmonic 只在第一張、Umbria Jazz Orchestra 只在第二張，沒有任何一邊貫穿全碟。**
2. **第 307 條。** `Bill Frisell` 這個字串在待上架層已有兩張
   （`c164-cards.json` ＋ `c164/prop-b.json` 的《Harmony》2019、`c165/prop-a.json` 的《Valentine》2020），
   取長形會讓同一主體裂成第三個字串。

**主線在派工信裡寫的「`Bill Frisell` 在 `seed_cards.json` 是 0 列」實掃屬實**（17,248 列 0 命中）。

四邊實測：**Discogs 兩筆零售條目的 `artists` 欄逐字都是單一 `Bill Frisell`（join 空）**、
**Apple us/jp 的 `artistName` 逐字 `Bill Frisell`**、**MB 那筆 XW Digital Media release 的
artist-credit 逐字也是 `Bill Frisell`**、③ `bluenote.com/artist/bill-frisell/`（200）releases 欄逐字
`BUY STREAM Orchestras - Bill Frisell`。只有 MB RG 與 XE CD release 用長形，**四比二取裸名**。
不新造四邊都沒有的連接符。

### 1991　`McCoy Tyner & Joe Henderson`《Forces of Nature: Live at Slugs'》2024 的掛名：照 MB 串接形收，`&` 不改

MB RG 端 artist-credit 兩段逐字「McCoy Tyner」+ joinphrase 逐字「 & 」+「Joe Henderson」，
**兩筆 release 的 AC 逐字亦同**，Apple us 的 `artistName` 逐字亦同。
Discogs 六筆的 `join` 逐字是 `,`（`McCoy Tyner, Joe Henderson`），**但 `chk-prop` 的折鍵先把 `&` 換成 `and`
再剝標點，兩形同鍵**，不影響去重。

**池中有現成先例，照先例走（裁定權下放判準 1）**：
`McCoy Tyner & Jackie McLean —《It's About Time》(1985，c148)`、
`McCoy Tyner & Bobby Hutcherson —《Manhattan Moods》(1994，c152)`——同一形狀的雙人 `&` 聯名。

Apple 的 `(feat. Henry Grimes & Jack DeJohnette)` 是**盤名後綴**、不是掛名的一部分，不採。

### 1992　`Charles Lloyd, Jason Moran, Marvin Sewell`《Figure in Blue》2025 的掛名：照 MB 的逗號串接形收

MB RG 端 artist-credit 三段逐字「Charles Lloyd」+「, 」+「Jason Moran」+「, 」+「Marvin Sewell」，
兩筆 release 的 AC 逐字亦同；**Discogs 三筆實體條目的 `artists` 欄 join 逐字也是 `,`**
（只有 35354812 那筆 ALAC 數位用 `With`／`&`）。

⚠ **Apple us 1831143513 的 `artistName` 逐字只有 `Charles Lloyd`**，③ `bluenote.com/artist/charles-lloyd/`
releases 欄逐字也只有 `Figure In Blue - Charles Lloyd`。**二比二，取 ② Discogs＋MB 這側**（權重 ② 最高）。

⚠ **`Charles Lloyd` 是本線字串最多的藝人**：seed 6 列（裸名 5＋`Charles Lloyd & the Marvels Featuring
Lucinda Williams` 1）、卡單／prop 層另有《Wild Man Dance》2015 裸名、`Charles Lloyd & The Marvels`
《I Long to See You》2016 與《Tone Poem》2021、《8: Kindred Spirits (Live From the Lobero)》2020 裸名。
**本卡再加一形，這位藝人在池中會有四種字串。**取捨理由：這是**三人共同掛名的碟**（不是 Lloyd 帶團），
盤面與兩大資料庫都這樣印，硬併成裸名會讓 Moran 與 Sewell 從卡面消失；
且 **c-166 a 組同批已用同一形狀**（`Kendrick Scott, Reuben Rogers, Walter Smith III —《Corridors》2023`），
同批同形狀必須一致。

### 1993　`The Branford Marsalis Quartet`《Belonging》2025 的掛名：去掉 `The`，取 `Branford Marsalis Quartet`

四邊實測：**Discogs 五筆零售條目的 `artists` 欄逐字全部 `Branford Marsalis Quartet`**、
**Apple us 1790354778 的 `artistName` 逐字 `Branford Marsalis Quartet`**、
**MB 那筆 XW CD release 的 artist-credit 逐字也是 `Branford Marsalis Quartet`**；
③ `bluenote.com/artist/branford-marsalis/`（200）spotlight 標題逐字 `BRANFORD MARSALIS QUARTET “BELONGING”`、
影片標題逐字 `Branford Marsalis Quartet “The Windup” (Live)`。
**只有 MB RG 的 artist-credit 逐字帶 `The`**（`The Branford Marsalis Quartet`，Group 0655f21a）。
四比一，取無 `The` 形。池中先例亦偏無 `The`：`Wynton Marsalis Quartet —《The Magic Hour》(2004，c159)`。

### 1994　`Harold López‐Nussa`《Nueva Timba》2025 的掛名：連字號改 ASCII，取 `Harold López-Nussa`

⚠ **MB 的 `artist-credit` 逐字用的是 U+2010（`López‐Nussa`）**，slice 直接沿用，`chk-prop` 第三道會標記。
派工信說「照 MB `artist-credit` 逐字取形；若 MB 用 ASCII `-` 就用 ASCII。不可留非 ASCII 連字號」——
**這兩句在本卡互相打架**，照後半句（也照 `chk-prop` 的硬檢查與第 1702 條）走：**取 ASCII `-`**。

其餘三邊本來就是 ASCII，不是我單方面改寫：
**Apple us 1823100440 的 `artistName` 逐字 `Harold López-Nussa`（ASCII `-`）**、
**Discogs 35391205／36290872 的 `artists` 欄逐字 `Harold López-Nussa`（ASCII `-`）**、
③ `bluenote.com/artist/harold-lopez-nussa/`（200）內文逐字 `Harold López-Nussa`。
**Apple jp 逐字 `Harold Lopez-Nussa`（連 ó 都去掉），不採——`ó` 三邊都有。**

**與 a 組對齊**：a 組同批有《Timba a la Americana》2023（Apple us 1689333711 的 artistName 逐字亦
`Harold López-Nussa`）。交件前已讀 `batch-progress/c166/prop-a.json` 覆核。

### 1995　`Bill Charlap Trio`《And Then Again》2024 的掛名：取團名，並實測驗證第 1747-B／1750-B 條

MB RG 的 AC 逐字是單一 Group 實體 `Bill Charlap Trio`（8586b4ce）、兩筆 release 的 AC 亦同；
Discogs 三筆逐字 `Bill Charlap Trio`；Apple us／jp 逐字 `Bill Charlap Trio`。
只有 ③ 官網 releases 欄逐字用裸名（該欄整頁都用裸名），但同頁 spotlight 標題逐字
`BILL CHARLAP TRIO “AND THEN AGAIN”`。四邊三比一取團名，與池中五張既有卡的多數一致
（seed《'S Wonderful》1999 與卡單層三張都是 `Bill Charlap Trio`）。

⚠ **③ 路徑實測與第 1747-B／1750-B 條記載的完全一致**：
`bluenote.com/artist/bill-charlap/` **200**、`bluenote.com/artist/bill-charlap-trio/` **404**。
