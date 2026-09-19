
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

---

## c-166 a 組（23 筆，2023–2024 全 jazz）策展裁定　號段 1960–1989

⚠ **本節以 append 置於 b 組之後，不是體例倒置**：開工時 `batch-progress/c166/rulings.md` 已由 b 組建立並寫入 1990 起的條目。
依第 1743-B(四) 條「共用的 `rulings.md` 一律只 append、不整檔覆寫」，a 組不把自己插到檔首（那需要重寫整檔、會吃掉 b 組同時間追加的位元組）。
**號段仍是 1960–1989，b 組的 1990 起一條未碰。**

- **筆數**：23（收 23、退 0）。
- **年份分布**：`slice.json` 原記 2023 十六筆、2024 七筆；**本組年份改判 0 筆，分布不變。**
- **曲風**：`slice.json` 的 `genre` 欄一律 `jazz`；**實判 `['jazz']` 16 張、`['jazz','pop']` 3 張、`['jazz','soul']` 2 張、`['jazz','world']` 2 張（`Harold López-Nussa`／`Nduduzo Makhathini`）、`['rock']` 1 張（`Mark Knopfler`，本組唯一不含 jazz 的卡）。** 合計 24＞23 是因為 `Mark Knopfler` 不含 jazz、其餘 22 張含 jazz。
- **正本**：`ALBUM_ONBOARDING.md`／`REMOTE_RUNBOOK.md`／`CLAUDE.md` 三份開工前已完整讀過。
- **沿用的判準**：`batch-progress/c158`～`c165/rulings.md` 與 **`c163/rulings-mainline.md`（第 1718–1747 條）**，條文一字未改。

---

### 第 1960 條（交件總表）

| 項目 | 數 |
|---|---:|
| 候選（`g: "a"`） | **23** |
| **收** | **23** |
| **退** | **0** |
| **退貨率** | **0%** |
| 年份改判 | **0** |
| **(甲) 從未發行過的錄音首次以錄音發行** | **1**（`Ron Miles《Old Main Chapel》`，見第 1962 條） |
| **(乙) Blue Note／Liberty／UA／Solid State 的純庫藏、再發** | **成立 0**（訊號亮 1 次：`Joe Chambers` 的 1960 年代側手史，查完是 2023 新錄音） |
| **(丙) 母體其實在真正的他廠** | **訊號亮 9 張、成立 0**（見第 1968 條） |
| **(丁) 與既有卡部分重疊／形狀不同** | **1**（`Norah Jones《Little Broken Hearts: Live at Allaire Studios》`，見第 1963 條） |
| **(戊) 四條再發系列** | **訊號亮 1 次、成立 0**（`Charles Lloyd《The Sky Will Still Be There Tomorrow》` 的 `Supervision: The Tone Poet` 掛名，見第 1969 條） |
| **(己) 載體只有影像** | **訊號亮 3 次、成立 0**（`Norah Jones《Playing Along》` 的 podcast 出身、`山中千尋《Dolce Vita》` 限定盤的 DVD、`Mark Knopfler《One Deep River》` 的 Blu-ray，見第 1964 條） |
| **現場盤** | **3 張**（`Norah Jones《Playing Along》`、`Norah Jones《Little Broken Hearts: Live at Allaire Studios》`、`Ron Miles《Old Main Chapel》`，MB `secondary-types` 逐字都帶 `Live`） |
| **撞陳列** | **19 處／11 張**（**全部是軌名撞盤名，盤名層 0 處**；其中 1 處撞 apex `hall`——`Erik Truffaz《Rollin'》` 的〈Ascenseur pour l'échafaud〉↔ `Miles Davis` 的同名卡。見第 1975 條） |
| **新掛名** | **8 個新字串**（`Chris Botti`／`Kendrick Scott, Reuben Rogers, Walter Smith III`／`Walter Smith III`／`Harold López-Nussa`／`Meshell Ndegeocello`／`Cautious Clay`／`Ethan Iverson`／`Julian Lage`）；**沿用既有字串 11 個、涵蓋 15 張卡；新造分裂 0**（見第 1972 條） |
| **`selfTitled: true`** | **0** |
| **`releaseType`** | **23 張全部 `Album`**（0 張 Compilation、0 張走 §5.5／§5.6 例外） |
| **`node batch-progress/c166/chk-prop.mjs a`** | **自身四道 ＋ 第五道全部 0**（23 張、21 位）；**唯一的 `標記 1` 來自串跑的跨批去重，而那 15 筆全是 `c165/prop-b.json` 被污染的複本，不是真撞卡——見第 1981 條** |
| 用掉的號段 | **1960–1985**（1986–1989 未用） |

**產出檔案**：`batch-progress/c166/prop-a.json`（23 筆）、`batch-progress/c166/rulings.md`（本節）、
`batch-progress/c166/evidence-a/`（`SOURCES.md`／`mb.json`／`apple.json`／`dg.json`／`tracks.json`／`bluenote.json`／`fetch-mb.mjs`／`fetch-tracks.mjs`／`fetch-apple.mjs`／`fetch-dg.mjs`／`fetch-bn.mjs`／`append.mjs`）。

---

### 第 1961 條（退表）：**本組退 0 筆**

**沒有退表。** 23 筆全收。與 c-165 a 第 1901 條記的理由同一個結構，且本組更極端：

1. **23 張全部是 2023–2024 的新錄音**，(乙)（庫藏／再發／日版 CD 化／45 轉復刻）與 (戊)（四條再發系列）在定義上幾乎不可能成立——它們擋的是舊母帶。**唯一沾到舊錄音的是 `Ron Miles《Old Main Chapel》`（2011 年的現場），而那張正好是 (甲)。**
2. **(丙) 的九次訊號全部是既有的假陽性型態**（第 1753(4)／1770 條的 `℗ 藝人本人 under exclusive license to …`，以及第 1794／1919 條的「廠牌鏈第一格不是 Blue Note」）。
3. **(己) 的三次訊號都是「某一個版本帶影像」而不是「載體只有影像」。**

⚠ **給後批的提醒（接 c-165 a 的同一句）**：**2015 年以後的區段退貨率結構性偏低，不要拿它跟 1950–70 年代那幾批互比。** 真正吃工時的是**掛名／標點碼位／版本與軌數釘定／店面覆蓋**四件事——本組 23 張裡有 **6 張有兩種以上軌數**、**2 張 Apple 完全查無**、**2 張只能靠 UPC lookup 命中**。

---

### 第 1962 條（**派工信的地雷 2**）：**`Ron Miles《Old Main Chapel》2024` 判 (甲)，不轉 (丁)**

派工信要求「逐字確認『從未發行過』：是就 (甲) 收；若部分軌先前出過改判 (丁)」。**逐字確認的結果是 (甲)，而且「部分軌先前出過」這一句在本碟不成立——重疊的是曲目，不是錄音。**

**四層證據**（逐字）：

1. **③ 新聞稿頁**（藝人頁 `bluenote.com/artist/ron-miles/` 回 200 但只有摘要，**決定性逐字在站內搜尋 `?s=Old+Main+Chapel` 找到的新聞稿頁** `https://www.bluenote.com/blue-note-to-release-ron-miles-live-recording-old-main-chapel-featuring-bill-frisell-brian-blade/`，回 200、頁面日期逐字 `May 10, 2024`）：
   > **`Old Main Chapel was recorded live at the venue of the same name in Boulder, Colorado on September 21, 2011, the night before the trio would go into the studio to record their debut album Quiver .`**
   > **`The seven-track set presents six of Miles’ indelible original compositions including longer versions of five pieces that would appear on Quiver , as well as the stunning “I Will Be Free” and beguiling “New Medium.”`**
2. **MB**：RG `0eefd78b-b9e0-422d-835c-b3e6b06f6c05` 轄下只有兩筆 release，`date` 欄逐字都是 `2024-05-10`，**沒有任何早於 2024 的條目**。
3. **Discogs**：三筆（30660295 CD／30650407 FLAC／37376250 ALAC）的 `year` 欄逐字都是 `2024`，`format` 欄無 `Reissue`、`series` 欄逐字空陣列；notes 欄逐字 `Recorded live at the Old Main Chapel in Boulder, Colorado on September 21, 2011.`。
4. **Apple**：us／jp 只有 `1735388614` 一筆，`releaseDate` 逐字 `2024-05-10T07:00:00Z`。

**為什麼不轉 (丁)**：(甲) 的定義是「從未發行過的**錄音**首次以錄音發行」。官網那句說的是**五首曲子的「更長的版本」**——《Quiver》(2012) 是隔天進錄音室做的**另一份錄音**。
**而且 `Ron Miles《Quiver》` 不在池中**：seed 17,248 列 `Ron Miles` 0 命中，各批 prop／cand 10,582 列只有 c-165 a 的《Rainbow Sign》。**折鍵 `ronmiles|quiver` 不存在，(丁) 的「與既有卡重疊」在資料上也不成立。**
**（下游簡介仍要寫明那五首的錄音室版收在隔年的《Quiver》。）**

**(甲) 的形狀對照（第 1704 條為第六種）**：本碟屬「錄了但一直沒發的母帶首次以錄音發行」，**不是第 1704 條那種「先前只以影像載體發行過」**——查無任何影像先發，官網頁上唯一的影片是 2024 年的宣傳片（逐字 `https://www.youtube.com/watch?v=a6X6f4MrZpQ`）。

**(乙) 亦不成立**：③ 官網逐字 `Ron Miles has previously recorded as a leader for the Prolific, Capri, Gramavision, and Sterling Circle labels`、他的 Blue Note 首作是 2020 年的《Rainbow Sign》——**2011 年的母帶不是 Blue Note 庫藏，是 Hans Wendl 為 Miles 自己錄的**（官網逐字 `The album was produced for release by Miles’ longtime manager and producer Hans Wendl`）。

**掛名沿用 `Ron Miles`**（c-165 a《Rainbow Sign》同形，第 307 條）。**`year` 取 2024（首次發行年），錄音年 2011 寫進簡介。**

---

### 第 1963 條（**派工信的地雷 3 第一張**）：**`Norah Jones《Little Broken Hearts: Live at Allaire Studios》2023` 判 (丁)，重疊處逐字記錄**

**判 (丁) 收。重疊程度是本線目前最高的一筆：曲目與曲序 12／12 完全相同。**

| | 母體卡 | 本卡 |
|---|---|---|
| 掛名／盤名 | `Norah Jones —《…Little Broken Hearts》`（**開頭 U+2026**） | `Norah Jones —《Little Broken Hearts: Live at Allaire Studios》`（**無刪節號**） |
| 在哪 | **c-162 b `prop-b.json`**（待上架） | 本組 |
| 年 | 2012 | 2023 |
| MB RG | `785cb865-c4b7-44ac-bab4-4159db869828` | `62c6265a-807e-4e5a-9c74-c2635af674cd` |
| 錄音 | 2012，洛杉磯 Mondo Studio／Electro-Vox，Danger Mouse 合製 | **2022-03-05，紐約 Shokan 的 Allaire Studios**（Discogs 26860898 notes 逐字 `Recorded... at Allaire Studios, Shokan, NY, March 5th, 2022`） |
| 發行 | 正規專輯 | **Record Store Day 2023 限量白膠 2,500 張**（兩筆 Discogs 的 notes 逐字 `Record Store Day 2023 release. Limited edition of 2,500 copies.`） |
| 曲目 | 12 軌 | **同 12 軌、同序** |

**折鍵可分**：`norahjones|littlebrokenheartsliveatallairestudios` vs `norahjones|littlebrokenhearts`（母體的 U+2026 折鍵時被剝掉）。**`chk-prop` 的複合鍵不會亮，這是正確的**；但正因為不會亮，**下游引用一定要帶完整副標題**。
⚠ **串跑的跨批去重第三道（同掛名盤名詞元包含）有亮，只報不擋**：逐字 `⚠ 同掛名盤名詞元包含（只報不擋）：… Norah Jones《Little Broken Hearts: Live at Allaire Studios》 ←→ c162 Norah Jones《…Little Broken Hearts》`——**那一道抓對了，就是本條寫的關係。**

**盤名取 MB RG title**：Discogs 兩筆逐字分別是 `...Little Broken Hearts Live...At Allaire Studios` 與 `...Little Broken Hearts Live (...At Allaire Studios)`（**兩筆自己就不一致**），Apple 無條目。
⚠ **本張不套 c-165 a 第 1910 條的「刪節號取 U+2026」house style**——那條處理的是「同一個刪節號在三邊有三種碼位」，**本張的 MB 題名根本沒有刪節號，不是碼位歧異。**

**另一處要人工記住**：軌名〈Little Broken Hearts〉折鍵後就是母體的盤名折鍵 `littlebrokenhearts`。**不是撞卡（軌名不是鍵），但下游引用這個軌名時要寫明它同時是母體專輯的名字。**

---

### 第 1964 條（**派工信的地雷 3 第二張，外加 (己) 的另兩次訊號**）：**`Norah Jones《Playing Along》2023` 是唱片，不走 (己)**

派工信要求「先確認這是不是唱片（可能是 podcast 系列的衍生品）。若載體只有影像或只是節目，走 (己) 退」。**確認結果：是實體唱片，收。**

- **MB** 唯一一筆 release 的 `media[0].format` 逐字 **`Phonograph record`**、`country` 逐字 `US`、`barcode` 逐字 `602455728791`。
- **Discogs** 兩筆（29062285 美版／29001586 Worldwide）的 `formats[0].name` 欄逐字都是 **`Vinyl`**，descriptions 逐字 `LP, Record Store Day`；29062285 的 notes 欄逐字 `Music from her podcast is now available for the first time on turquoise vinyl exclusively for RSD Black Friday 2023.`，29001586 逐字 `RSD Black Friday 2023 limited edition of 3000 copies`。
- **③ 官網** `https://www.bluenote.com/norah-jones-record-store-day-lp-playing-along/`（200，頁面日期逐字 `October 2, 2023`）逐字 `On Nov. 24, Norah Jones will release a Black Friday Record Store Day exclusive LP featuring songs from her podcast Norah Jones Is Playing Along .`，並逐字列出十二軌與每軌的合作者。

**podcast 是曲目的來源，不是本碟的載體。**
⚠ **形狀補述（接近 (丁) 但不標記）**：十二軌中至少四軌先前已以數位單曲發行（Apple 實查 `1710049109`／`1670501046`／`1680085196`／`1488043432`）——**那些是單曲、不是卡片；實掃 seed 與各批 prop／cand 都沒有複合折鍵重疊，所以不走 (丁)，只在 `risk` 寫明來源關係。**
⚠ **`releaseType` 填 `Album`**：MB `primary-type` 逐字 `Album`、`secondary-types` 逐字 `["Live"]`、**`Compilation` 不在其中，不走 §5.6。**

**(己) 的另兩次訊號，同樣不成立**（(己) 擋的是「載體只有影像」，不是「有一個版本帶影像」）：

- **`山中千尋《Dolce Vita》`**：限定盤 `UCCJ-9243` 帶一張 DVD-Video（MB 記 `HQCD+DVD-Video` 17 軌）——通常盤 SHM-CD、2LP、數位版都是純音訊。**與 c-165 a 給《Rosa》初回限定盤 DVD 的處置相同。**
- **`Mark Knopfler《One Deep River》`**：MB 轄下有一筆 `2024-04-12 GB Blu-ray 17 軌 barcode 602465079739 British Grove Records catno EMIBLU 2113`——那是高解析音訊碟，且 CD／LP／卡帶／數位全部存在。

---

### 第 1965 條（**派工信的地雷 1**）：**`Harold López-Nussa` 取 ASCII 連字號**

| 層 | 逐字 |
|---|---|
| **MB** RG artist-credit（`name` 與 `artist.name`） | **`Harold López‐Nussa`（U+2010 HYPHEN）** |
| `slice.json` 的 `artist` 欄 | 同上（照抄 MB） |
| **② Discogs** 四筆的 `artists[0].name` | **`Harold López-Nussa`（ASCII U+002D）** |
| **④ Apple us** `1689333711` 的 `artistName` | **`Harold López-Nussa`（ASCII）** |
| **④ Apple jp** 同一個 id 的 `artistName` | `Harold Lopez-Nussa`（ASCII，**另去掉重音符**） |
| **③ 官網** `bluenote.com/artist/harold-lopez-nussa/`（200） | `Harold López-Nussa`（ASCII） |

**判 `Harold López-Nussa`（ASCII 連字號、保留重音符 `ó`）。** 依第 1702／1769(五) 條，以及 c-163 b 與 c-164 a 兩次處理 `The E-Collective`（U+2010）的同形先例——**三次的結論都是取 ASCII。** 重音符依 MB／Discogs／Apple us／官網四邊多數保留（只有 Apple jp 去掉）。
**池中先例這一項是空的**：seed 17,248 列 `Harold` ＋ `Nussa` 0 命中（唯一含 `López` 的是 `Orlando "Cachaíto" López`，不同人），各批 prop／cand 10,582 列 0 命中——**沒有既有形可沿用，所以走「四邊多數」而不是第 307 條。**

**盤名同時處理**：MB／Discogs 黑膠兩筆／Apple 逐字 `Timba a la Americana`（介系詞小寫），**Discogs 兩筆 CD 條目寫成 `Timba A La Americana`——Discogs 的字首大寫慣例，不跟**（同第 1746 條（二）的 `Gare du Nord`）。

---

### 第 1966 條（**派工信的地雷 5 第一項**）：**`Kendrick Scott, Reuben Rogers, Walter Smith III《Corridors》` 取逗號並列形；`Walter Smith III` 同時有裸名領班盤不算分裂**

**(一) 並列聯名依第 1539 條（第 1745-B 條更正後的正確寫法）**——取 **MB `artist-credit` 的 `credited-name` 與 joinphrase 串接出來的那一種**，不是「取 `&`」：

- MB RG 的三個成分 `credited-name` 逐字 `Kendrick Scott`／`Reuben Rogers`／`Walter Smith III`，joinphrase 逐字 `, `／`, `／``（空）→ **串接結果逐字 `Kendrick Scott, Reuben Rogers, Walter Smith III`**。
- **② Discogs 四筆的 `artists` 欄 join 逐字都是 `,`**，三個成分名逐字相同 → **與 MB 同形。**
- **④ Apple us／jp `1664317680` 的 `artistName` 逐字只有 `Kendrick Scott`**，兩位夥伴被塞進盤名 `Corridors (feat. Reuben Rogers & Walter Smith III)`。
- **③ `bluenote.com/artist/kendrick-scott/`（200）** 逐字 `Scott’s 2023 Blue Note album Corridors finds him paring down to a trio with saxophonist Walter Smith III and bassist Reuben Rogers.`（散文句，不是掛名字串）。

**判逗號並列形。四邊零個 `&`，不新造連接符（第 1745-B 條）。**
⚠ **MB 轄下四筆 release 的 artist-credit 有三種寫法**（三人並列 ×2、`Kendrick Scott feat. Reuben Rogers & Walter Smith III` ×1、裸名 `Kendrick Scott` ×1）——**第 1539 條指的是 RG 層的 artist-credit，取 RG 那一種。**

**(二) `Walter Smith III` 在本組出現兩次，不算分裂。** 一次是本張的並列成分、一次是裸名領班盤《return to casual》。
**兩張是不同的發行品、不同的掛名主體**：本張四邊都把三人並列為共同領銜（Discogs 的 `artists` 陣列就是三個實體），《return to casual》四邊都是他一人領銜、③ 官網逐字 `his remarkable 2023 Blue Note debut return to casual`、`on which he also served as producer`。
**各照各自發行品的掛名，正是第 1539 條與第 307 條要求的結果**；**若硬把本張改成裸名 `Kendrick Scott`，反而會造出四邊都沒有的字串。**
**兩個字串在池中都是全新的**（`Kendrick Scott`／`Reuben Rogers`／`Walter Smith III` 三個成分於 seed 與各批 prop／cand 各 0 命中），**沒有既有形被分裂。**

---

### 第 1967 條（**派工信的地雷 5 第二項**）：**`Arturo O'Farrill《Legacies》` 取裸名，不改寫 c-165 a 的逗號式並列卡**

- **本卡**：MB RG artist-credit 單一成分、逐字 `Arturo O’Farrill`（U+2019），Discogs 三筆與 Apple us 逐字 `Arturo O'Farrill`（ASCII），Apple jp 逐字 `Arturo O’FARRILL`（姓氏全大寫）。**取 `Arturo O'Farrill`（ASCII 撇號）**——第 1910 條的 house style（撇號取 ASCII），且**與 c-165 a 第 1907 條在同一個藝人身上定的撇號形逐字一致**（該卡的 `artist` 欄實測碼位為 `4f 27 46`，ASCII）。
- **c-165 a 的那張**是 `Arturo O'Farrill, The Afro Latin Jazz Ensemble —《…dreaming in lions…》`，第 1907 條已逐字裁定取逗號並列形，理由是 Apple 上另有四張掛 `… & The Afro Latin Jazz Orchestra` 的碟、**Ensemble 與 Orchestra 是兩個編制不可混**。
- **本卡是裸名的鋼琴獨奏／三重奏盤**（③ 官網逐字 `Arturo O’Farrill returns to his first love—the piano—on his new Blue Note album Legacies out today.`、`a 9-song set that juxtaposes stunning solo piano flights and dynamic`），**沒有 Ensemble、沒有 Orchestra。**

**判：兩個字串並存，`Arturo O'Farrill`（裸名，本卡）與 `Arturo O'Farrill, The Afro Latin Jazz Ensemble`（c-165 a）各照各自的發行品，不改寫 c-165 那張。**
**序數依第 1732 條處理**：官網同一頁逐字記他的 Blue Note 首作是 `…dreaming in lions…`（即 c-165 a 那張），**本卡只寫「不是首作」這層身分關係，不寫「第 N 張」。**

---

### 第 1968 條：**(丙) 的九次訊號逐張記錄，成立 0——其中 `Mark Knopfler` 是本組唯一需要走完第 1794／1919 條全套的一張**

| 卡 | 訊號逐字 | 判 |
|---|---|---|
| `Kendrick Scott…《Corridors》` | Apple ℗ 欄逐字 `Blue Note Records; ℗ 2023 Capitol Records, LLC` | 過（Capitol 是母公司，第 1753(4)／1770 條） |
| `Erik Truffaz《Rollin'》` | Apple ℗ 逐字 `℗ 2023 Foufino Productions, under Exclusive License to Decca Records France`；MB 法版 CD `label-info` 三格含 `Decca Records`；Discogs 26913761 廠牌欄逐字 `Universal Music Division Decca Records France` | 過（℗ 型態假陽性＋**零售條目 4／5 的鏈第一格逐字 `Blue Note`**） |
| `Erik Truffaz《Clap!》` | 同上 ℗；**MB 的數位 release `label-info` 逐字只有 `Universal Music France`、完全沒有 Blue Note** | 過（**只看那一筆 MB release 會誤退；Discogs 三筆零售條目的鏈第一格逐字全是 `Blue Note`**——第 1919 條形狀的鏡像） |
| `Gregory Porter《Christmas Wish》` | **Discogs 美版 CD 28966057 的鏈第一格逐字 `Verve Records`、英歐版 CD 28840117 逐字 `Decca`**；℗ 逐字 `℗ © 2023 Gregory Porter under exclusive license to Decca Records France.` | 過（**掃整條鏈後兩筆的第二格都逐字 `Blue Note`**，黑膠三筆第一格直接是 Blue Note；③ 官網逐字 `out now on Blue Note/Decca Records`） |
| `Norah Jones《Playing Along》` | 鏈上 `Capitol Records, LLC` ×2 | 過（母公司） |
| `Norah Jones《…Allaire Studios》` | ℗© 逐字 `A Blue Note Records release; ℗© 2023 Capitol Records, LLC.`；鏈上 `UMe` | 過（母公司；且版權行自己逐字寫 `A Blue Note Records release`） |
| `Cautious Clay《KARPEH》` | ℗ 逐字 `… ℗ 2023 Cautious Clay Music, LLC, under exclusive license to UMG Recordings, Inc.`；**Discogs 28227754 的鏈第一格逐字 `Cautious Clay Music, LLC`** | 過（℗ 型態假陽性；**掃整條鏈後第二格逐字 `Blue Note Records`**，其餘八筆第一格逐字 `Blue Note`） |
| `Charles Lloyd《The Sky…》` | ℗ 逐字 `℗ © 2024 Charles Lloyd under exclusive license to UMG Recordings, Inc.` | 過（℗ 型態假陽性） |
| **`Mark Knopfler《One Deep River》`** | **(a)** Apple ℗ 逐字 `A British Grove Records / EMI release; ℗ 2024 Will D. Side Limited, under exclusive licence to Universal Music Operations Limited`——**整句沒有 Blue Note**；**(b) MB 轄下八筆 release 只有一筆（美版 CD）的 `label-info` 有 Blue Note**，其餘逐字 `EMI`／`British Grove Records`／`Universal Music`；**(c)** Discogs 前五筆完整條目有三筆的鏈第一格逐字 `EMI` | **過，但要走完全套**（見下） |

**`Mark Knopfler` 的判斷逐層**：依第 1794 條「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note，要掃整條鏈」逐筆查十四筆 Discogs 搜尋結果——
**30523858（美版 CD digisleeve）、30543211（美版卡帶）、30727289（美版 45 轉 2LP）、36831376（台版 CD）四筆的廠牌鏈第一格逐字都是 `Blue Note`**；MB 的美版 CD release `label-info` 兩格逐字 `Blue Note`（`713c4a95`）＋ `British Grove Records`（`d65abd9f`）。
**③ 官網把關係寫死了**：`bluenote.com/artist/mark-knopfler/` 與 `bluenote.com/releases/one-deep-river/` 都回 **404**，但站內搜尋 `?s=Mark+Knopfler`（200）找到前作新聞稿 `https://www.bluenote.com/mark-knopfler-down-the-road-wherever-out-now/`（200），內文逐字：
> **`Down The Road Wherever , the ninth solo studio album from Mark Knopfler , is out now on British Grove Records via Blue Note .`**

**`on British Grove Records via Blue Note` ——不是「其實在他廠」，是「同一張碟在北美由 Blue Note 發行」。判收。**
⚠ **兩筆非零售條目已排除**（`format` 欄逐字帶 `Unofficial Release` 的俄羅斯盤）：`Chris Botti《Vol. 1》` 的 Discogs 28894627、`Mark Knopfler《One Deep River》` 的 30787650。**依第 1794 條的「零售條目」定義不列入 imprint 計數，也不得拿它們的廠牌鏈當證據。**
⚠ **日本線陷阱（第 1817 條）全數核過**：本組出現日版條目的四張（`Chris Botti`／`山中千尋`／`Meshell Ndegeocello`／`Cautious Clay`／`Julian Lage`）的 MB `label-info` 與 Discogs 廠牌欄逐字都是 `Blue Note`（MB id `713c4a95`），**零筆 `Nihon Blue Note`（`76903afe`）、零筆歐洲公版再發廠（`EJC`／`AJC`／`WaxTime`／`Jazz Wax Records`／`Blue Moon`）。**

---

### 第 1969 條：**`Charles Lloyd《The Sky Will Still Be There Tomorrow》2024` 的 (戊) 訊號在 notes 欄、不在 `series` 欄——(戊) 不成立**

`slice.json` 的 `reissueSeries` 欄逐字是**空陣列**、**Discogs 六筆的 `series` 欄逐字也全部是空陣列**。
**訊號出在 Discogs 34462336（美版雙 CD）的 notes 欄，逐字有一行 `Supervision: The Tone Poet, [...]`。**

依第 1737-B／1902 條：**(戊) 擋的是「把舊母帶重新壓片」，不是「盤面印了哪個系列名／掛了誰的名字」**。`The Tone Poet` 在這裡是製作人 Joe Harley 的綽號與職稱，**不是把本碟編進 Tone Poet 再發系列**。
本碟是 2024 年的全新錄音：MB `first-release-date` 逐字 `2024-03-15`、兩筆 release 的 `date` 逐字都是 2024、Discogs 六筆的 `year` 欄逐字都是 `2024`、notes 欄逐字 `Recorded & Mixed by [...], Santa Barbara Sound Design, Santa Barbara, CA`。
**判 (戊) 不成立，收，`reissuedBy` 欄留空。**

⚠ **與 c-165 a 第 1902 條的差別要記住**：那次《Tone Poem》的訊號在 **`series` 欄**（Discogs 兩筆黑膠逐字 `Blue Note Tone Poet Series`），本次的訊號在 **notes 欄的人名職稱**。**兩者都不成立，但後者更弱——後批遇到 notes 欄的 `Tone Poet` 字樣，先看 `series` 欄是不是空的。**

---

### 第 1970 條：**`Gregory Porter《Christmas Wish》` 釘 2023 的 12 軌原版；Apple 上那一版已經沒有了**

- **MB** 轄下六筆 release：五筆逐字 `2023-11-03`、**12 軌**；**第六筆逐字 `2024-06-12 XW Digital Media 15 軌 barcode 602475370963 label-info 逐字 Decca Records catno 00602475370963`**（2024 擴充版）。
- **Discogs** 五筆完整條目的 `tracklist` 欄逐字都是 **12 軌**（〈Silent Night〉…〈Heart for Christmas〉），`released` 逐字全部 `2023-11-03`。
- ⚠ ⚠ **Apple us／jp 目前只剩 `1779846239`**，`collectionName` 逐字 `Christmas Wish (Deluxe)`、`releaseDate` 逐字 `2024-12-06T08:00:00Z`、`trackCount: 15`。**四個 UPC（`602455669230`／`00602458382792`／`602455987372`／`00602455987389`）lookup 逐字全部回那一筆 Deluxe，2023 年的 12 軌原版在 Apple 已查無**（已實測）。

**判**：卡上的 `year` 取 **2023**（MB＋Discogs 兩層一致到日；Apple 那一層不可採，因為它指向另一個版本）。
**上架固定試聽的處置寫進 `risk`**：**若取 `1779846239` 等於配到另一個版本，必須人工另尋 12 軌版，或明確在備註寫明取的是 Deluxe（第 646／865 條）。** 多出的三軌逐字是〈We Have All the Time in the World (Cam Blackwood & Swindle version)〉〈Christmas Will Really Be Christmas〉〈We Have All the Time in the World〉。

---

### 第 1971 條：**`Cautious Clay《KARPEH》` 的 Apple 淨化／未淨化雙胞胎——本組唯一一筆，取 `1692470376`（explicit）**

`ALBUM_ONBOARDING` §6 的 `collectionExplicitness` 條款在本組命中一次，**而且是最難分的那種形態**。
`itunes.apple.com/lookup?id=1692484931,1692470376&country=us` 逐字回兩筆：

| id | `collectionName` | `releaseDate` | `trackCount` | `copyright` | **`collectionExplicitness`** |
|---|---|---|---|---|---|
| `1692484931` | `KARPEH` | `2023-08-18T07:00:00Z` | 15 | `Blue Note Records; ℗ 2023 Cautious Clay Music, LLC, under exclusive license to UMG Recordings, Inc.` | **`cleaned`** |
| `1692470376` | `KARPEH` | `2023-08-18T07:00:00Z` | 15 | 同左，逐字相同 | **`explicit`** |

**除了 `collectionExplicitness` 這一個欄位，兩筆的所有欄位逐字相同。**
⚠ **關鍵字搜尋與三個 UPC lookup（`00602455877628`／`00602455877666`／`602455742964`）回的都是 `1692484931`（淨化版）在前**——**上架固定試聽一律取 `1692470376`，不得用搜尋的第一筆。** 已寫進該卡的 `risk`。

---

### 第 1972 條：**掛名總表——8 個新字串、沿用 11 個、新造分裂 0**

**先講方法（第 1746-C 條）**：派工信的地雷 7 給的是**掃描清單，不是結論**。逐一以**複合折鍵 `k(掛名)|k(盤名)`** 掃 `seed_cards.json`（17,248 列）與各批 `prop-*.json`／`cand-*.json`（10,582 列）。**複合鍵命中才是撞卡；掛名命中而盤名不同，只代表要沿用既有掛名字串（第 307 條）。**

**掃描清單的實況**（派工信列的七位）：

| 掛名 | seed | 待上架各批 | 複合折鍵撞卡 |
|---|---:|---:|---:|
| `Norah Jones` | **4**（《Come Away with Me》《Feels Like Home》《The Fall》《Visions》） | **8**（c-160 a ×2、c-162 b、c-163 b、c-164 b ×2、c-165 a ×2） | **0** |
| `Mark Knopfler` | **1**（《Sailing to Philadelphia》） | **1**（c-164 b《Down the Road Wherever》） | **0** |
| `Charles Lloyd` | **6**（含聯名形 `Charles Lloyd & the Marvels Featuring Lucinda Williams`） | **4**（c-146 a／c-163 a／c-163 b／c-164 b／c-165 a） | **0** |
| `Julian Lage` | **0** | **0** | **0** |
| `Gregory Porter` | **4** | **2**（c-164 a／c-164 b） | **0** |
| `Meshell Ndegeocello` | **0** | **0** | **0** |
| `Chris Botti` | **0** | **0** | **0** |

⚠ **七位裡有三位（`Julian Lage`／`Meshell Ndegeocello`／`Chris Botti`）在池中與待上架層都是 0 列**——**與第 1746-C 條記的 c-165 a 情形完全一樣，派工信的掃描清單只能當提示。**
⚠ **照派工信字面「撞到就退」會誤退四張**（`Norah Jones` 兩張、`Mark Knopfler`、`Charles Lloyd`、`Gregory Porter`）。**本棒沒照字面做。**

**8 個新字串**：`Chris Botti`／`Kendrick Scott, Reuben Rogers, Walter Smith III`／`Walter Smith III`／`Harold López-Nussa`／`Meshell Ndegeocello`／`Cautious Clay`／`Ethan Iverson`／`Julian Lage`。
**沿用既有字串 11 個、涵蓋 15 張卡**：`Arturo O'Farrill`（**與 c-165 a 的並列形是兩個字串，見第 1967 條**）／`Dave McMurray`（c-164 a）／`Erik Truffaz`（十張，c-154～c-162）／`Gregory Porter`（seed 4 ＋ c-164 兩張）／`Norah Jones`（seed 4 ＋ 八張）／`Joe Chambers`（c-155 a／c-165 a）／`ARTEMIS`（c-165 a）／`山中千尋`（七張，c-163～c-165）／`Aaron Parks`（c-161 a）／`Ron Miles`（c-165 a）／`Nduduzo Makhathini`（c-165 a）／`Mark Knopfler`（seed ＋ c-164 b）／`Charles Lloyd`（seed 6 ＋ 四張）。
**新造分裂 0。**

**四處人工核掉的分裂（`chk-prop` 全部抓不到）**：

1. **`Dave McMurray`** —— Discogs 五筆的 `artists[0].name` 逐字 `David McMurray`、`anv` 欄逐字 `Dave McMurray`。**折鍵 `davidmcmurray` ≠ `davemcmurray`，第一道抓不到。** 取 `Dave McMurray`（MB／Apple／官網／c-164 a 四邊一致）。
2. **`Meshell Ndegeocello`** —— Discogs 五筆逐字 `Me'Shell NdegéOcello`（舊藝名寫法）、`anv` 欄逐字 `Meshell Ndegeocello`。**折鍵含重音 `é`，不同鍵。** 取 `Meshell Ndegeocello`（MB／Apple／官網＋Discogs 自己的 `anv`）。
3. **`ARTEMIS`** —— Discogs 五筆逐字 `Artemis (24)`（消歧義編號）、③ 官網 Releases 區逐字 `In Real Time - ARTEMIS - Renee Rosnes`（把團長並列）。取全大寫 `ARTEMIS`（MB／Apple 兩層＋c-165 a 先例）；**官網那個並列形依第 1747-B(一) 條不採（三邊一致時不因官網版面慣例改寫）。**
4. **`Charles Lloyd`** —— **Apple jp 的 `artistName` 逐字 `チャールス・ロイド・クァルテット`（把編制寫進掛名）**，us 逐字裸名。取裸名（多數＋池中十張的體例）。

**外加一處跨文字系統（盲點六，第 1672 條）**：**`山中千尋`** —— MB RG 的 `credited-name` 逐字是羅馬字 `Chihiro Yamanaka`、**`artist.name` 才逐字是漢字 `山中千尋`**；Discogs 三筆逐字羅馬字；**Apple jp `1697492694` 的 `artistName` 逐字 `山中千尋`**；③ `universal-music.co.jp/chihiro-yamanaka/products/uccj-2227/`（200）標題逐字 `山中千尋`、下方併記羅馬字。
**取漢字**：`ALBUM_ONBOARDING` §0.5 明訂日籍藝人用日文漢字本名，**且待上架七張先例全部是 `山中千尋`（第 307 條）。**

---

### 第 1973 條（**派工信的地雷 6**）：**標點與特殊字元逐字元核，`chk-prop` 標記 0 不等於沒問題**

`chk-prop` 只擋連字號類字元（`‐‑‒–—―－`）與被當破折號用的 U+30FC；**撇號（U+0027／U+2018／U+2019）、大小寫、刪節號一律摺掉。** 本組七處人工判：

| 欄位逐字 | 四邊分歧 | 判 | 依據 |
|---|---|---|---|
| `Arturo O'Farrill` | MB／Apple jp U+2019（jp 另全大寫姓氏）；**Discogs ＋ Apple us ASCII** | **ASCII 撇號** | 第 1702／1910 條 house style；與 c-165 a 同藝人卡一致 |
| `Rollin'` | MB／slice U+2019；**Discogs 五筆 ＋ Apple us／jp ASCII** | **ASCII 撇號** | 同上（二比一） |
| `Clap!` | 四邊逐字一致 | 照留驚嘆號 | 無分歧 |
| `uNomkhubulwane` | 四邊逐字一致（isiZulu 名詞前綴 `u-`） | **照抄小寫開頭** | 盲點二，人工核 |
| `return to casual` | MB／Apple us／jp／③ 官網逐字全小寫；**Discogs 五筆 Title Case** | **全小寫** | 三比一；Discogs 字首大寫是建檔慣例（第 1746 條（二）） |
| `KARPEH` | MB／Apple 兩筆／③ 官網逐字全大寫；**Discogs 四筆 `Karpeh`、一筆全大寫** | **全大寫** | 三比一 |
| `Vol. 1` | MB／Discogs／Apple 逐字 `Vol. 1`；**③ 官網內文逐字 `Vol.1`（無空格）** | **`Vol. 1`** | 三比一；官網是內文排版、不是題名 |

**外加兩處**：
- **`Harold López-Nussa`** 的連字號（見第 1965 條）——**這是本組唯一一個 `chk-prop` 真的會標記的字元，已改成 ASCII。**
- **`Julian Lage《Speak to Me》`**：MB RG title 逐字 `Speak to Me`（介系詞小寫），**Discogs 八筆與 Apple us／jp 逐字都是 `Speak To Me`**——**一比二，但本棒取 MB 形。** 理由：MB RG title 是盤面題名的權威來源、Discogs 與 Apple 的 Title Case 是各自的顯示慣例（與《return to casual》那一項同源），且**折鍵後同鍵、無下游風險**。**這是可逆的欄位值（第 2 條判準），本棒自行定案並記在此供覆核。**

⚠ **軌名層的碼位不進 `chk-prop`，但要知道**：`Erik Truffaz《Rollin'》` 的第 9 軌 MB 逐字是 `Quel temps fait‐il à Paris ?`（**含 U+2010**）、`Ethan Iverson` 的〈It’s Fine to Decline〉〈’Round Midnight〉逐字用 U+2019。**`chk-prop` 只掃 `artist`／`album` 兩欄，不受影響；`why` 欄裡已統一改寫成 ASCII 以維持本檔體例。**

---

### 第 1974 條：**年份覆核——23 張全部維持 `slice` 年份，改判 0；第 1721／1742-B 條的觀察名單本組命中 1 筆**

**三層一致到日的 19 張**：Arturo O'Farrill／Chris Botti／Dave McMurray／Kendrick Scott…／Walter Smith III／Erik Truffaz ×2／Joe Chambers／ARTEMIS／Harold López-Nussa／Meshell Ndegeocello／Cautious Clay／山中千尋（**四層，含 ③ 官網**）／Aaron Parks（**四層**）／Ron Miles／Mark Knopfler／Ethan Iverson／Charles Lloyd／Julian Lage。

**四張需要額外交代**：

1. **`Gregory Porter《Christmas Wish》`**：MB＋Discogs 兩層一致 `2023-11-03`；**④ Apple 那一層指向 2024 的 Deluxe，不可採**（第 1970 條）。
2. **`Norah Jones《Playing Along》`**：MB＋Discogs 兩層一致 `2023-11-24`；**④ Apple 整層落空**（UPC lookup 與關鍵字搜尋都回空／噪音，已實測）。**依「兩層以上取多數」成立 2023。**
3. **`Norah Jones《Little Broken Hearts: Live at Allaire Studios》`**：MB＋Discogs 兩層一致 `2023-04-22`；**④ Apple 整層落空。** 同上成立 2023。
4. **`Nduduzo Makhathini《uNomkhubulwane》`**：MB `2024-06-07`、Apple `2024-06-07`、**Discogs 三筆裡有一筆（FLAC 30893913）逐字 `2024-06-06`，早一天**——取多數 `2024-06-07`，年份不受影響。

**另外兩處日期歧異（年份不受影響，記下供本機覆核）**：
- **`山中千尋《Dolce Vita》`**：③ `universal-music.co.jp` 的 `オリジナル発売日` 欄逐字 **`2023.08.23`**，比 MB／Discogs／Apple 三層的 `2023-08-30` 早七天（同頁的「別バージョン」區則逐字把限定盤標 `2023.08.30`、2LP 標 `2023.10.25`）。
- **`Julian Lage《Speak to Me》`**：**Apple 的 `copyright` 欄逐字 `℗ 2023 UMG Recordings, Inc.`（℗ 年比發行年早一年）**，而 Discogs 29972578 的內頁逐字是 `℗© 2024 UMG Recordings, Inc.`；三層的 `frd`／`released`／`releaseDate` 一致為 `2024-03-01`。

**第 1601 條的 Apple 年初佔位日（`YYYY-01-01T08:00:00Z`）本組 0 筆**；c-165 a 實測的那種「年份整個錯 35 年」的更壞值本組亦 0 筆。

**第 1721／1742-B 條的觀察名單：派工信寫「本組 0 筆」，實查是 1 筆。**
**`Aaron Parks《Little Big III》`** 三個偵測條件全中：MB 轄下**只有 1 筆 release**、`media[0].format` 逐字 `Digital Media`、`catalog-number` 為 null（`country` 逐字是 `null` 而不是 `XW`，**比名單形狀還更空**）。
**依第 1742-B 條的分辨關鍵「Discogs 有沒有比 MB `frd` 更早的實體條目」逐筆查**：Discogs 三筆的 `released` 逐字是 `2024-10-18`（美版 LP）／`2024-10-18`（Worldwide CD）／`2025-04-17`（日版 SHM-CD）——**沒有任何一筆早於 MB 的 `2024-10-18`**；Apple 逐字 `2024-10-18T07:00:00Z`；③ 官網逐字 `the 2024 release of Little Big III`。**訊號亮但不改判**（與 c-164 a 對《Music Is Life》同結論，真陽性率維持在「亮了要查、不等於要改」）。

---

### 第 1975 條：**撞陳列 19 處／11 張，全部是軌名撞盤名，盤名層 0 處**

**盤名層**：23 個盤名折鍵後對 seed 17,248 列（含 917 列 apex）**逐字 0 命中**；**`chk-prop` 第五道（第 1744-B 條的「盤名逐字撞 apex 王牌、掛名不同」）亦 0 處。**

**軌名層 19 處**（曲名撞盤名，**不是撞卡**；下游引用這些曲名時要帶掛名並寫明是翻奏／同名）：

| 卡 | 軌名 → 撞到的卡 |
|---|---|
| Arturo O'Farrill《Legacies》 | 〈Obsession〉→ `EXO《OBSESSION》(2019)` |
| **Chris Botti《Vol. 1》** | 〈Someday My Prince Will Come〉→ `Miles Davis (1961)` ＋ `Wynton Kelly (1961)`；〈My Funny Valentine〉→ `Miles Davis (1965)`；〈Milestones〉（日版 bonus）→ `Miles Davis (1958)` |
| Walter Smith III《return to casual》 | 〈Contra〉→ `Vampire Weekend (2010)`；〈Shine〉→ `Crime & the City Solution (1988)`；〈REVIVE〉→ `IVE《REVIVE+》(2026)` |
| **Erik Truffaz《Rollin'》** | **〈Ascenseur pour l'échafaud〉→ `Miles Davis《Ascenseur pour l'échafaud》(1958) apex:hall`** |
| Norah Jones《Playing Along》 | 〈Friendship〉→ `Junipher Greene (1971)` |
| Joe Chambers《Dance Kobina》 | 〈This Is New〉→ `Kenny Drew (1957)`；〈Caravanserai〉→ `Santana (1972)`；**〈Power to the People〉→ `Joe Henderson (1969)`（同屬 Blue Note 線，特別要寫清楚）** |
| Norah Jones《…Allaire Studios》 | 〈Travelin' On〉→ `The Gospel Keynotes (1971)`（**外加〈Little Broken Hearts〉折鍵＝母體卡盤名，見第 1963 條**） |
| Meshell Ndegeocello《The Omnichord Real Book》 | 〈Virgo〉→ `Virgo Four (1989)` |
| Cautious Clay《KARPEH》 | 〈Blue Lips〉→ `ScHoolboy Q《BLUE LIPS》(2024)` |
| **山中千尋《Dolce Vita》** | 〈Infant Eyes〉→ `Doug Carn (1971)`；**〈Adam's Apple〉→ `Wayne Shorter (1967)`（撞的正是本碟致敬對象自己的同名專輯）**；〈One by One〉→ `Foo Fighters (2002)` ＋ `The Impressions (1965)`；〈E.S.P.〉（限定盤 DVD 曲）→ `Miles Davis (1965)` |
| Aaron Parks《Little Big III》 | 〈Locked Down〉→ `Dr. John (2012)`；〈Sports〉→ `Huey Lewis and the News (1983)`；〈Delusions〉→ `First Choice (1977)` |
| Ethan Iverson《Technically Acceptable》 | 〈'Round Midnight〉→ `Alan Broadbent (2004)` |

**唯一撞 apex 的是 `Erik Truffaz《Rollin'》` 的〈Ascenseur pour l'échafaud〉↔ `Miles Davis` 的 `hall` 卡**，已在該卡 `risk` 逐字要求下游寫明「翻奏 Miles Davis 1958 年同名配樂」。

**兩個需要下游帶掛名的短／泛盤名**：`Chris Botti《Vol. 1》`（折鍵 `vol1`，毫無辨識度）與 `Erik Truffaz《Clap!》`（折鍵 `clap`）。
**一個潛在的未來呼應**：`Julian Lage《Speak to Me》` 折鍵 `speaktome` 與 Pink Floyd《The Dark Side of the Moon》開場曲同名（池中那張目前沒有這個軌名的卡）。

---

### 第 1976 條：**曲風取捨——十類名單外的標籤逐張處置**

**`['jazz']` 16 張**、**`['jazz','pop']` 3 張**（Gregory Porter《Christmas Wish》／Norah Jones ×2）、**`['jazz','soul']` 2 張**（Meshell Ndegeocello／Cautious Clay）、**`['jazz','world']` 2 張**（Harold López-Nussa／Nduduzo Makhathini）、**`['rock']` 1 張**（Mark Knopfler）。

**丟掉的標籤與理由**：
- **`contemporary jazz`**（出現在 8 張的 Discogs `style` 或 MB tags）——**第 1572 條不跟。**
- **`post bop`／`post-bop`／`modal`／`smooth jazz`／`fusion`／`jazz-funk`／`avant-garde jazz`／`instrumental jazz`／`jazz fusion`／`soft rock`／`folk rock`／`holiday`／`ballad`／`vocal`／`latin jazz`／`afro-cuban jazz`／`contemporary r&b`／`rhythm & blues`／`soundtrack`／`stage & screen`**——**都不在十類名單。**
- **`Latin`（Discogs 大類，4／4 出現在 `Harold López-Nussa`）** → 落到 **`world`**，沿用 c-165 a 給 `Arturo O'Farrill《…dreaming in lions…》` 與 `Nduduzo Makhathini` 的先例。
- **`Funk / Soul`（Discogs 大類）** → 落到 **`soul`**，但**要五分之五才跟**：`Meshell Ndegeocello` 5／5 跟、`Cautious Clay` 加上 Apple `primaryGenreName` 逐字 `R&B/Soul` 跟；**`Walter Smith III《return to casual》` 只有 5／1（歐版 CD）不跟。**
- **`Hip Hop`（`Harold López-Nussa` 兩筆 CD 條目）** → **不跟**（`style` 欄零筆 hip-hop 類型）。
- **`Rock`（`Erik Truffaz《Rollin'》` 五筆中兩筆）** → **不跟**（未達多數，且與曲目性質＝電影配樂改編不符）。
- **`Blues`（`Cautious Clay` 九筆中一筆）** → 不跟。

**三個自己決定、可逆、與同藝人既有卡的關係要一併說明的**：

1. **`Arturo O'Farrill《Legacies》` 取 `['jazz']`，不跟 c-165 a 那張的 `['jazz','world']`。** 那張的 Discogs `style` 帶 Latin Jazz、編制是 Afro Latin Jazz Ensemble；**本張三筆的 `style` 欄逐字全是空陣列、`genre` 欄只有 `Jazz`，是鋼琴獨奏／三重奏盤。**（同 c-165 a 第 1917(5) 條對《Samba de Maracatu》的處置。）
2. **`Gregory Porter《Christmas Wish》` 取 `['jazz','pop']`，不跟同藝人前兩張的 `['jazz','soul']`。** **本碟兩筆 CD 條目的 Discogs `genre` 欄逐字都是 `Pop`（不是 Jazz）、五筆裡零筆出現 `Funk / Soul`**；與 c-165 a 給 `Norah Jones《I Dream of Christmas》` 的 `['jazz','pop']` 同形。
3. **`Mark Knopfler《One Deep River》` 取 `['rock']`，不加 `folk`。** Discogs `style` 四筆逐字 `Folk Rock`、MB tags 逐字 `folk rock`——**`folk rock` 不在十類名單，而 `folk` 只以這個複合形出現；`rock` 在 Discogs／Apple／MB 三層都有。** **沿用 c-164 b 給《Down the Road Wherever》的 `['rock']`（第 307 條的同藝人體例一致）。⚠ 若日後店主要把 folk rock 拆成兩軸，兩張 Knopfler 卡要一起改。**

**兩個「題旨不進曲風欄」的處置**（同 c-165 a 第 1917(5) 條）：`Dave McMurray《Grateful Deadication 2》` 九軌全是 Grateful Dead 的歌，仍取 `['jazz']` 不加 `rock`；`Ethan Iverson《Technically Acceptable》` 末三軌是古典形式的鋼琴奏鳴曲，仍取 `['jazz']` 不加 `classical`（三層零筆 classical 標記）。

---

### 第 1977 條：**③ 廠牌官網的實際回應碼——22 個路徑 19 個 200、3 個 404**

`https://www.bluenote.com/artist/<藝人>/`（裸名形與團名形都試，第 1747-B(二) 條）：

- **200（19 個路徑，涵蓋 22 張卡）**：`arturo-ofarrill`／`chris-botti`／`dave-mcmurray`／`kendrick-scott`／`walter-smith-iii`／`erik-truffaz`／`gregory-porter`／`norah-jones`／`joe-chambers`／`artemis`／`harold-lopez-nussa`／`meshell-ndegeocello`／`cautious-clay`／`aaron-parks`／`ron-miles`／`nduduzo-makhathini`／`ethan-iverson`／`charles-lloyd`／`julian-lage`
- **404（3 個路徑）**：**`reuben-rogers`**（《Corridors》的並列成分之一——**但同碟的 `kendrick-scott` 與 `walter-smith-iii` 都是 200，證據不缺**）、**`chihiro-yamanaka`**（日本線，改走 `universal-music.co.jp`）、**`mark-knopfler`**（連 `bluenote.com/releases/one-deep-river/` 也是 404）

**兩條非藝人頁的路徑救回了兩張卡的決定性逐字**（第 1747-B(二) 條「藝人頁落空時值得試站內搜尋 `?s=` 與新聞稿頁」，本組再驗一次成立）：
- `?s=Old+Main+Chapel` → `https://www.bluenote.com/blue-note-to-release-ron-miles-live-recording-old-main-chapel-featuring-bill-frisell-brian-blade/`（**200**，(甲) 的決定性逐字，見第 1962 條）。⚠ **順帶記下：`bluenote.com/releases/old-main-chapel/` 也回 200，但只有標題與日期（逐字 `March 28, 2024`），沒有內文——`releases/` 路徑在本站是空殼頁，不要拿它當落空的結論。**
- `?s=Playing+Along+vinyl` → `https://www.bluenote.com/norah-jones-record-store-day-lp-playing-along/`（**200**，(己) 判斷與完整曲序的來源，見第 1964 條）。
- `?s=Mark+Knopfler` → `https://www.bluenote.com/mark-knopfler-down-the-road-wherever-out-now/`（**200**，(丙) 判斷的決定性逐字 `on British Grove Records via Blue Note`，見第 1968 條）。

**日本線（第 1800 條路徑三）**：`https://www.universal-music.co.jp/chihiro-yamanaka/products/uccj-2227/` → **200**（`yamanaka-chihiro` 形 → **404**，兩形都試過）。商品欄逐字 `レーベル Blue Note`／`品番 UCCJ-2227`／`オリジナル発売日 2023.08.23`／`録音年 2023年3月`／`録音場所 ニューヨーク`。

---

### 第 1978 條：**店面（④ Apple）覆蓋率——本組有兩張全空、兩張只能靠 UPC，這是給本機探測鏈的清單**

| 情形 | 張數 | 卡 |
|---|---:|---|
| 關鍵字搜尋即命中、us／jp 同一個 `collectionId` | **19** | 其餘各張 |
| **關鍵字搜尋落空，只有 UPC lookup 命中** | **1** | `Meshell Ndegeocello《The Omnichord Real Book》`（us／jp 關鍵字都回 0 筆；UPC `602455565310`／`602448968913`／`602448968920`／`602448968944` 逐字回 `1677237163`） |
| **只有 jp storefront 有條目** | **1** | `山中千尋《Dolce Vita》`（us 關鍵字回 0 筆；jp `1697492694`；us 端要靠 UPC `602455978837`） |
| ⚠ ⚠ **Apple 完全查無本專輯** | **2** | **`Norah Jones《Playing Along》`**（UPC `602455728791` lookup 回空、關鍵字只回同名的 2019 年單曲 `1488043432`）、**`Norah Jones《Little Broken Hearts: Live at Allaire Studios》`**（UPC `602448976796` lookup 回空、關鍵字回 0 筆） |

**兩張全空的卡**：固定試聽只能走 YouTube Music 官方 Album playlist 或標 `unavailable`；
⚠ **絕不可拿同名單曲 `1488043432` 或母體《…Little Broken Hearts》的 Apple 條目充數（第 528／707 條）。**

**三處要特別交代的店面狀況**：
- **`Kendrick Scott…《Corridors》`**：Apple 的 `artistName` 逐字只有 `Kendrick Scott`、`collectionName` 逐字 `Corridors (feat. Reuben Rogers & Walter Smith III)`——**用本卡的掛名字串直接搜會落空，要走 UPC**（`602445521944`／`0602445521890`／`602455173454` 三個逐字都回 `1664317680`，已實測）。
- **`Ron Miles《Old Main Chapel》`**：Apple 的 `collectionName` 逐字帶 `(Live)` 後綴。
- **`Erik Truffaz` 兩張與第 1433 條**：c-161 a《Paris》有一筆經裁定的人工試聽回收，用的是 **Apple 三碟合集 `1841638049` 的碟一**。**本組兩張各自有獨立條目（`1671502618`／`1700421426`），與 `1841638049` 無關，絕不重用那個 `collectionId`。已在兩張的 `risk` 逐字註明查過。**

---

### 第 1979 條：**軌數多版本釘定——23 張裡 6 張有兩種以上軌數**

| 卡 | 版本與軌數 | **釘** |
|---|---|---:|
| `Chris Botti《Vol. 1》` | 歐／美 CD 與 LP **10**；日版 SHM-CD `UCCQ-1192` **11**（多〈Milestones〉） | **10** |
| `Gregory Porter《Christmas Wish》` | 2023 原版 **12**；2024 擴充／Deluxe **15** | **12**（見第 1970 條） |
| `Meshell Ndegeocello《The Omnichord Real Book》` | 標準 **18**；日版 SHM-CD `UCCQ-1187` **19**（Discogs notes 逐字 `Track 19 is a Japanese bonus track.`） | **18** |
| `Cautious Clay《KARPEH》` | 標準 **15**；日版 SHM-CD `UCCQ-1190` **16**（notes 逐字 `+1 BONUS TRACK`） | **15** |
| `山中千尋《Dolce Vita》` | 通常盤／2LP／數位 **14**；限定盤 `UCCJ-9243` **17**（14 軌 UHQCD ＋ 3 軌 DVD） | **14** |
| `Aaron Parks《Little Big III》` | 標準 **9**；2025 日版 SHM-CD `UCCQ-1210` **10**（notes 逐字 `Take 10 'Japan Bonus Track'`） | **9** |
| **`Mark Knopfler《One Deep River》`（五種，本組最複雜）** | 標準 **12**；`EMICDY 2113` Deluxe 雙 CD 與 Blu-ray **17**；2024-08-12 數位 **21**；`EMIBOX 2113` 限量盒裝 **33** | **12**（Apple 取 `1718922576`，**不得取 21 軌的 `1759217201`**） |

依第 646／865 條全部釘最小／標準版。
⚠ **`evidence-a/tracks.json` 取的是「軌數最多的那一筆 release」**，因此 `Christmas Wish`（15）、`Dolce Vita`（17）、`One Deep River`（33）三筆的軌名清單**不是本卡釘的版本**——已在各卡 `mbNote` 逐字註明替代來源。

---

### 第 1980 條：**`slice.json` 欄位覆核（第 1743-B 條）——推翻三處**

`slice` 的欄位是切片器對 MB 的快照，不是發行實況，也不是查證結果。本組實查推翻：

1. **`Erik Truffaz《Clap!》` 的 `nReleases: 1`** → MB 現為 **2**；`countries: []` → MB 的 CD 那筆 `country` 確實是 `null`，但 Discogs 四筆分別標 `France`／`Europe`，**不是「只有數位」。**
2. **`Gregory Porter《Christmas Wish》` 的 `nReleases: 5`** → MB 現為 **6**（多出 2024-06-12 的 Decca 擴充版）。
3. ⚠ ⚠ **`Mark Knopfler《One Deep River》` 的 `nReleases: 1`、`formats: ["CD"]`、`countries: ["US"]`** → MB 現為 **8 筆**、格式含 12" Vinyl／CD／Cassette／Blu-ray／Digital Media、國別含 XE／GB／US／XW。**這是本線目前看過漂移最嚴重的一筆——照 slice 的快照會完全看不到英歐版的 EMI／British Grove 廠牌線，也就不會發現 (丙) 需要走全套（第 1968 條）。**

**另外兩處 slice 欄位是對的、但容易誤讀**：
- `Joe Chambers《Dance Kobina》` 的 `catno` 欄逐字含一個 **`[none]`**——那是 MB 數位那筆的 `catalog-number` 真的就是字串 `[none]`，是 MB 的填寫慣例、不是缺漏。
- `Julian Lage《Speak to Me》` 的 `formats` 欄逐字帶 **`CD-R`**——那是 MB 建的宣傳片條目，不是零售壓片。

**`note` 欄本組 23 筆全部是空字串**，沒有可覆核的推測。

---

### 第 1981 條（⚠ ⚠ **重大，要本機處理，不是我能修的**）：**`batch-progress/c165/prop-b.json` 裡混進了本組 15 筆 `g: "a"` 的卡，其中 5 筆已經進了 main**

**`node batch-progress/c166/chk-prop.mjs a` 的 `標記 1` 完全來自這件事，不是真撞卡。**

**現象**：串跑的 `dedup-crossbatch.mjs` 逐字印出 15 行
`⚠ c166 <掛名>《<盤名>》2023  ←→  c165 <同一個掛名>《<同一個盤名》2023`，
涵蓋本組第 1–15 張（`Legacies` 到 `KARPEH`）。

**實查**：`batch-progress/c165/prop-b.json`（工作區版本，22 筆）的**前 15 筆的 `g` 欄逐字都是 `"a"`，內容是本組的卡**（逐一 `JSON.stringify` 比對：**13 筆與 `c166/prop-a.json` 位元組完全相同**，另 2 筆是 `Dave McMurray`／`Kendrick Scott…` ——那兩筆正是本棒在第一波交件後修正過 release id 的，所以停在修正前的版本）。**c-165 b 組自己的卡只有後 7 筆**（`In the Spirit of Ntu`／`Four`／`Revival (Live at Pookie's Pub)`／`Succession`／`Today Is Another Day`／`Where Are We`／`Passage`），而 `c165/slice.json` 的 `g: "b"` 有 22 筆。

**已進 main**：`git show HEAD:batch-progress/c165/prop-b.json` 逐字是 **15 筆**，其中**前 5 筆的 `g` 欄是 `"a"`、就是本組的前 5 張**；提交是 `ca78a81`「中途檢查點：c165 策展 b 15/22、c166 策展 a 5 筆＋b 組證據層（尚未驗收）」。
**換句話說，那個提交把「c-165 b 已完成 15 筆」記錄下來，但其中 5 筆其實是 c-166 a 的卡。**

**本棒的處置**：
- **不動 `c165/prop-b.json`。** 它是別的工作階段未提交的工作（`git status` 逐字 ` M batch-progress/c165/prop-b.json`），`CLAUDE.md` 明訂不得掃走別人未提交的改動；本組的邊界也寫明不動 `prop-b`。
- **不用 `git reset`／`git revert`**（`CLAUDE.md` 風險操作那節）。
- **`batch-progress/c166/prop-a.json` 本身是乾淨的**：23 筆、`g` 欄全部 `"a"`、與 `seed_cards.json` 17,248 列複合折鍵 0 命中、**扣掉 `c165/prop-b.json` 那 15 筆污染後，對全部 129 批的跨批撞卡是 0**（已另外寫腳本實掃確認）。

**建議本機做的三件事**：(1) 把 `c165/prop-b.json` 裡 `g === "a"` 的 15 筆整批移除，讓它只剩 c-165 b 自己的卡；(2) 重新確認 c-165 b 的真實進度（不是 15／22，是 7／22）；(3) 查一下是哪支腳本把 `c166/prop-a.json` 併進去的——**本棒用的 `batch-progress/c166/evidence-a/append.mjs` 的 `OUT` 逐字是 `/home/user/dip-vinyl-shop/batch-progress/c166/prop-a.json`，不會寫到別處。**

---

### 第 1982 條（工具面，只報不擋的誤報）：**`dedup-crossbatch.mjs` 的目錄號擷取器把美國郵遞區號 `CA 90028` 當成目錄號**

輸出逐字：`⚠ 共用目錄號 CA90028（只報不擋）：c162 Derrick Hodge《Live Today》 ←→ c165 ARTEMIS《In Real Time》 ←→ c165 Norah Jones《Little Broken Hearts: Live at Allaire Studios》`
（後兩筆的批名顯示為 `c165` 是第 1981 條那個污染造成的，實際是本組的卡。）

**成因**：本棒在這兩張卡的 `label` 欄逐字引用了 Blue Note 的版權行地址——
`Blue Note Records, 1750 North Vine Street, Hollywood, CA 90028.`（ARTEMIS，Discogs 30969523 的 notes）與
`℗© 2023 Capitol Records, LLC. 1750 N. Vine Street, Hollywood, CA 90028 - U.S.A.`（Norah Jones，Discogs 26860898 的 notes）。
`catnos()` 從 `label` 欄抽「大寫字母＋數字」的樣式，`CA 90028` 剛好符合，而 `COUNTRYDATE` 那條排除式（`^[A-Z]{0,5}(19|20)\d{2}…`）擋不住 `CA90028`（`90028` 不是 19xx／20xx 開頭）。

**處置：不改腳本**（工具是主線的，且這一道本來就只報不擋）。**本棒不因此刪掉逐字引用的版權行——那是 (丙) 判斷的一手證據。** 記在這裡，讓後批看到同一行時知道是誤報。
**建議主線**：在 `catnos()` 前先把 `\b[A-Z]{2}\s?\d{5}(-\d{4})?\b`（美國郵遞區號）與地址行剝掉。

---

### 第 1983 條：**派工信與正本／既有裁定牴觸之處——本組發現三處**

1. ⚠ **「第 1721／1742-B 條的觀察名單本組 0 筆」不成立，實查是 1 筆。** 派工信自己標了「預期」，本棒依指示實測後回報：**`Aaron Parks《Little Big III》` 三個偵測條件全中**（見第 1974 條）。**年份覆核已跑、不改判。** ⚠ **附帶更正一點**：派工信把形狀寫成「所有 release 都是 `Digital Media`＋`country: XW`＋`catno` 空」，**但本筆的 `country` 是 `null`、不是 `XW`**——**`null` 比 `XW` 更空，照字面比對會漏掉它。建議主線把條件改成「`country` 為 `XW` 或空」。**
2. ⚠ **地雷 7 的掃描清單有三位在池中與待上架層都是 0 列**（`Julian Lage`／`Meshell Ndegeocello`／`Chris Botti`）——**與第 1746-C 條記的 c-165 a 情形一樣。** 派工信這次已經改寫成「這是掃描清單，不是結論」，**寫法是對的**；本條只是記錄實況，不是指控。**照字面「撞到就退」會誤退四張**（見第 1972 條）。
3. ⚠ **`batch-progress/c166/rulings.md` 在本棒開工前就已經存在**，且已有 b 組寫入的 1990 起條目。派工信寫「`batch-progress/c166/rulings.md`（**新建**）」——**實況不是新建。** 依第 1743-B(四) 條「共用的 `rulings.md` 一律只 append、不整檔覆寫」，**本棒以 `>>` 追加在 b 組之後，沒有把自己插到檔首**（插到檔首要重寫整檔，會吃掉 b 組同時間追加的位元組——那正是 c-164 a 踩過的坑）。**號段 1960–1989 一條未越界，b 組的 1990 起一條未碰。**

**另外兩處不是牴觸、但派工信寫「預期」而實測不同的**：
- **③ 官網 404 名單**：派工信說「404 名單不是常數，實測後回報實況」——實測 22 個路徑 **19 個 200、3 個 404**（見第 1977 條）。
- **地雷 2 的「極可能是 (甲)」**：實測確認是 (甲)，**且「若部分軌先前出過改判 (丁)」那一句在本碟不適用**（重疊的是曲目不是錄音，且《Quiver》不在池中，見第 1962 條）。

---

### 第 1984 條：**紙本（①）本組整層跳過**

23 張全部是 2023–2024 的碟，Billboard OCR 只覆蓋到 2015（第 1723／1728 條）——**結構性查不到。** 依派工信與第 1728 條第 2 點，**不查、不計工時、不寫進任何一張卡的 `risk`**（各卡 `risk` 末尾只寫一句「依第 1728 條不查」，不當成缺失或疑點）。

---

### 第 1985 條：**證據層已全部入庫，不留在暫存目錄**

`batch-progress/c166/evidence-a/` 逐檔：

| 檔案 | 端點／來源 | 內容 |
|---|---|---|
| `mb.json` | `musicbrainz.org/ws/2/release-group/<rgMbid>?inc=artist-credits+tags` ＋ `ws/2/release?release-group=<rgMbid>&inc=labels+media+artist-credits&limit=100` | 23 筆 RG 的 title／artist-credit（含 `credited-name` 與 `artist.name` 兩欄）／`first-release-date`／primary-type／secondary-types／tags，以及轄下全部 release 的 date／country／barcode／label-info／media |
| `tracks.json` | `ws/2/release/<id>?inc=recordings` | 每張取「軌數最多的那一筆 release」的全部軌名 |
| `apple.json` | `itunes.apple.com/search?entity=album&country=us｜jp` ＋ `lookup?upc=<MB barcode>&country=us` | 23 筆的搜尋結果與**逐一 UPC 反查**（collectionId／artistName／collectionName／releaseDate／trackCount／copyright ℗ 欄／collectionExplicitness／primaryGenreName） |
| `dg.json` | `api.discogs.com/database/search?type=release` ＋ `api.discogs.com/releases/<id>` | 23 筆的搜尋結果與每筆前五個完整條目（`formats`／`series`／`labels` 整條廠牌鏈／`companies`／`extraartists`／`released`／`notes`／`genres`／`styles`／`tracklist`） |
| `bluenote.json` | `https://www.bluenote.com/artist/<藝人>/` | 22 個藝人頁的狀態碼與去標籤後的內文（19×200／3×404） |
| `fetch-mb.mjs`／`fetch-tracks.mjs`／`fetch-apple.mjs`／`fetch-dg.mjs`／`fetch-bn.mjs` | — | 上述四層的抓取腳本，**全部可續跑**（已抓到的鍵直接跳過） |
| `append.mjs` | — | 分批併進 `prop-a.json`（`OUT` 逐字 `batch-progress/c166/prop-a.json`，折鍵重複則覆蓋） |

MusicBrainz User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。抓取日期：2026-09-19。
⚠ **`SOURCES.md` 另記可追溯的單頁網址**（③ 官網三條新聞稿路徑、`universal-music.co.jp` 的日本線路徑、Apple 的雙胞胎 lookup 網址）。

### 1996　地雷 1：三張庫藏／現場盤的 (甲)/(乙) 分界——**三張全部是 (甲)，全收**

**分界的一句話**：**(乙) 擋的是「以前發行過、現在再發一次」。母帶年份落在 Blue Note 老時期
不是 (乙) 的要件；「從未發行過」就是 (甲)。** 三張逐張的逐字證據：

| 卡 | 母帶年 | 「從未發行過」的逐字證據 | 判 |
|---|---|---|---|
| `McCoy Tyner & Joe Henderson —《Forces of Nature: Live at Slugs'》2024` | 1966 | ③ `bluenote.com/artist/mccoy-tyner/`（200）標題逐字 `NEVER-BEFORE-ISSUED 1966 RECORDING OUT NOW`、內文逐字 `a never-before-issued live recording`；Discogs 32582682 的 notes 逐字記下腰封 `"Never-Before-Heard Blistering Live Set"` 與 `"Deluxe 2-CD set transferred from Jack DeJohnette's original tape reel"` | **(甲)** |
| `Horace Silver —《Silver in Seattle: Live at the Penthouse》2025` | 1965 | ③ `bluenote.com/artist/horace-silver/`（200）標題逐字 `NEVER-BEFORE-ISSUED 1965 LIVE HORACE SILVER ALBUM`、內文逐字 `a never-before-issued live recording of Blue Note legend Horace Silver captured 60 years ago`；Discogs 35468755 的 notes 逐字 `CD shrink wrap sticker (front cover) states "Previously unissued fiery live sets..."` | **(甲)** |
| `Wayne Shorter —《Celebration, Volume 1 (Live)》2024` | 2014 | ③ `bluenote.com/?s=Celebration+Volume+1`（200，2024-08-23 新聞稿）逐字 `the first in a series of archival releases that the legendary saxophonist and composer Wayne Shorter curated before he passed away in 2023. This thrilling 2014 live recording` | **(甲)** |

**三張的 Discogs `format` 欄逐字都沒有 `Reissue`。** 另注意 Forces of Nature 的母帶連 Blue Note 庫房都不是
（來自 Jack DeJohnette 私藏盤帶），更不可能是 (乙)。

**重疊覆核（派工信指定要查的三處，全部零重疊，因此不改判 (丁)）**：

- **Horace Silver 兩張庫藏盤**：`Live at Newport '58`（2008，c161）是 **1958-07-06 Newport**、五軌逐字為
  Willis Conover 開場介紹＋〈Tippin'〉〈The Outlaw〉〈Señor Blues〉〈Cool Eyes〉、編制 Louis Smith／Junior Cook／
  Gene Taylor／Louis Hayes；本卡是 **1965-08-12 與 08-19 西雅圖 The Penthouse**、六軌逐字為〈The Kicker〉
  〈Song for My Father〉〈The Cape Verdean Blues〉〈Sayonara Blues〉〈Band Introductions〉〈No Smokin'〉。
  **日期、場地、編制、曲目四項全不同，零軌重疊。** 兩張的掛名逐字都是裸名 `Horace Silver`
  （③ 官網 releases 欄兩張逐字都是 `- Horace Silver`），**一致。**
- **Wayne Shorter**：本卡是 2014-10-18 斯德哥爾摩；`Wayne Shorter Quartet —《Without a Net》`(2013，c162)
  是 2011 年巡演。**零錄音重疊**；但〈Orbits〉這個**曲名**兩張都有，且〈Zero Gravity to the …th Dimension〉
  與《Without a Net》的〈Zero Gravity to the Stars〉同屬一個命名系列——**寫進該卡 risk，要求下游分開敘述。**
- **McCoy Tyner／Joe Henderson**：seed 各有 12／11 列、卡單層另有十餘筆，**全部盤名不同，
  複合折鍵 `k(掛名)|k(盤名)` 零命中。**

### 1997　`DeJohnette Legacy Series` 不是 (戊)

Discogs 32371407／32582682／32399319／32671227 四筆的 `series` 欄逐字是 `DeJohnette Legacy Series`。
**這不在 (戊) 的四條再發系列名單裡**（Blue Note 75／80、Tone Poet、Classic Vinyl、Blue Note Review），
且依第 1737-B／1902 條，**(戊) 擋的是「把舊母帶重新壓片」的再發，不是「盤面印了哪個系列名」**——
本碟的**首發就在這個系列裡、這個系列本身是首刊企畫**。過閘，收。

### 1998　`Blue Lab Beats —《Blue Eclipse》2024` 的 (丙)：過閘、收，但官網零報導要交給店主看

**訊號**：Apple us 1739101269 的 ℗ 欄逐字
`A Blue Adventure Records Release; ℗ 2024 Blue Adventure, under Exclusive License to Decca Records France`；
Discogs 三筆的 companies 逐字 `Phonographic Copyright (p): Blue Adventure Records`／
`Copyright (c): Blue Adventure Records`／**`Licensed To: Decca Records France`**。

**兩條規則各自獨立讓它過閘**：

1. **第 1753(4)／1770 條假陽性**：℗ 第一格是藝人自有公司（`Blue Adventure Records` 是這對雙人組自己的廠牌）、
   後接 `under Exclusive License to …`，一律過閘。
2. **第 1794 條的 imprint 前置閘**：判準是「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note，要掃整條鏈」。
   **本碟三筆零售條目的鏈逐字都是 `Blue Note` → `Universal Music France` → `Blue Adventure`，
   Blue Note 還排在第一格**——比第 1919 條那個 `André Manoukian`（Blue Note 排第二／三格仍過閘）乾淨得多。
   MB 的 XE CD release `label-info` 也逐字三格帶 `Blue Note:00602458943184`（713c4a95）。

⚠ ⚠ **反向訊號（依規則不構成退件，但必須留紀錄）**：
**③ `bluenote.com/artist/blue-lab-beats/`（200）的 releases 欄逐字只列 `Motherland Journey` 與
`We Will Rise`，沒有《Blue Eclipse》**；站內搜尋 `bluenote.com/?s=Blue+Eclipse`（200）只回一則
2023-11-17 的 `TONE POET AUDIOPHILE VINYL REISSUE SERIES 2024 LINE-UP`（命中的是 `Blue` 這個字），
**本碟在 Blue Note 官網零報導**。依第 1747-B(一) 條，③ 官網只用來解決 MB／Discogs 的題法歧異、
**不是收退判準**，故不退件；**本機審稿時請店主看一眼這一條**（若店主認為這條 Blue Note 線不該收
Decca France 的授權盤，改判成本只是一筆卡單值，屬「可逆」）。

### 1999　盤名大小寫：四張要逐字元照盤面，`chk-prop` 全部抓不到

四張的折鍵都相同，四道全部不亮，**字元序列以 `prop-b.json` 的 `album` 欄為準**：

| 卡 | 本棒取的形 | 取的理由（逐字實測） |
|---|---|---|
| `Walter Smith III —《three of us are from Houston and Reuben is not》` | **全小寫** | MB RG title＋Apple `collectionName`＋③ 官網內文兩處逐字全小寫；只有 Discogs 三筆是 Title Case（Discogs 的自動題法） |
| `Dave McMurray —《I LOVE LIFE even when I'm hurting》` | **大小寫混排** | MB＋Apple＋③ 官網兩則新聞稿＋Discogs 35768737（數位）**五處逐字一致**；只有 Discogs 兩筆實體是 Title Case |
| `ARTEMIS —《Arboresque》` | **首字大寫** | MB RG title＋Discogs 兩筆逐字 `Arboresque`（權重 ② 那側）；Apple＋③ 官網逐字 `ARBORESQUE`。二比二取 ② |
| `Harold López-Nussa —《Nueva Timba》` | **首字大寫** | 同上形狀：MB＋Discogs 逐字 `Nueva Timba`；Apple＋③ 官網逐字 `NUEVA TIMBA` |

另**刻意不跟多數**的一張：`Brandon Woody —《For the Love of It All》` 取 MB 的虛詞小寫形，
不跟 Discogs／Apple／官網三邊的 Title Case。**理由是 Discogs 與 Apple 的 Title Case 是題法慣例、不是盤面**——
同批 `Walter Smith III` 那張是硬證據（盤面全小寫，Discogs 照樣印成 Title Case）。

### 2000　`Wayne Shorter —《Celebration, Volume 1 (Live)》` 的盤名：取 MB RG title

四邊逐字：MB `Celebration, Volume 1 (Live)`／Apple `Celebration, Volume 1 (Live)`／
Discogs 四筆 `Celebration Volume 1`（無逗號無後綴）／③ 官網 `Celebration, Volume 1`（有逗號無後綴）。
**四邊沒有三邊一致，不套第 1747-B(一) 條**，取 MB RG title。三形折鍵後同鍵。

### 2001　`Branford Marsalis Quartet —《Belonging》2025`：不是 (丙)，但盤名撞陳列，`chk-prop` 兩道都不亮

**不是 (丙)**：(丙) 擋的是「母體其實在真正的他廠」。本碟的母體是 **2024-03-25～29 在紐奧良
Ellis Marsalis Center 新錄的錄音**（Discogs 33747675 的 notes 逐字 `Recorded March 25-29, 2024.`），
不是 ECM 那張碟的母帶——是**不同樂團的不同錄音**，Blue Note 是首發廠牌。Discogs 33555156 的 notes
逐字寫明性質：`a full album interpretation of Keith Jarrett's 1974 ECM album of the same name which
introduced the pianist's European Quartet`。Discogs 五筆的 `format` 欄都沒有 `Reissue`——**重錄不是再版。**

**撞陳列**：seed 有 `Keith Jarrett —《Belonging》(1974)`，該列逐字
`["Keith Jarrett","Belonging",4,3,3,["jazz"],1974]`——**第 9 欄空、不是 apex**。
於是 **`chk-prop` 第四道（複合折鍵）不亮**（`branfordmarsalisquartet|belonging` ≠ `keithjarrett|belonging`）、
**第五道（盤名撞 apex）也不亮**（Jarrett 那張不是王牌）。**這一處完全靠人工掃出來。**
已寫進該卡 `risk`：**下游引用 `Belonging` 這個盤名時必須帶掛名。**
另第 6 軌〈Solstice〉↔ seed `Ralph Towner —《Solstice》(1974)`（同屬 1974 ECM 圈，非 apex）。

### 2002　`Gerald Clayton —《Ones & Twos》2025`：釘 12 軌標準版，不釘 21 軌 Expanded Edition

兩版逐字實況——**標準版**：Apple `collectionId` **1795560029**、`2025-04-11T07:00:00Z`、**12 軌**；
Discogs 33865029（CD）／33684858（LP）／36467689（綠膠 LP）皆 12 軌。
**擴充版**：Apple `collectionId` **1811722772**、`Ones & Twos (Expanded Edition)`、`2025-05-30T07:00:00Z`、
**21 軌**；Discogs 34429402（FLAC 24/96）逐字兩碟，Disc 1 十四軌（多〈Glass Half Warm〉〈Glass Half Cool〉）、
Disc 2 七軌全是 mashup（逐字如 `20 Glass Half Warm / Glass Half Cool`）；MB 那筆 21 軌 release 的
`disambiguation` 逐字 `Expanded Edition`、`label-info` 逐字 `Universal`。

**釘標準版**：first-release-date 是標準版的（2025-04-11），實體壓片（CD＋兩種 LP）**全部只有 12 軌**，
擴充版只有數位。⚠ **UPC `602475472551` 與 `00602475472605` 兩組 lookup 各回兩筆（兩版同時命中），
探測鏈不能只取第一筆。**

另有兩張的 Apple 目錄帶**先行單曲雙胞胎**，固定試聽會配錯，已寫進各自的 `risk`：
`Bill Charlap Trio —《And Then Again》`（專輯 1750814631／8 軌 ↔ 單曲 1750564571／**1 軌**）、
`Branford Marsalis Quartet —《Belonging》`（專輯 1790354778／6 軌 ↔ 單曲 1794907788／**1 軌**）、
`Horace Silver —《Silver in Seattle》`（專輯 1830639316／6 軌 ↔ EP 1837826392／**1 軌**）。

### 2003　曲風取捨：19 張純 `['jazz']`、3 張帶第二類

- **`Blue Lab Beats —《Blue Eclipse》` → `['jazz','hiphop']`**：Discogs **三筆零售條目的 `genre` 欄
  逐字全部是兩項 `Hip Hop`／`Jazz`**，③ 官網 biography 逐字 `blends boom-bap grooves and jazz-funk hooks
  ... inspired by the pioneers of hip-hop`。兩類都在十類名單內。
- **`Meshell Ndegeocello —《No More Water》` → `['jazz','soul']`**：Discogs 四筆逐字 `Jazz`／`Funk / Soul`，
  styles 逐字含 `Neo Soul`／`Jazz-Funk`。（日版那一筆逐字 `Funk / Soul`／`Blues`＋style `Gospel`，
  **`blues` 六筆裡只有一筆，不跟**。）
- **`Harold López-Nussa —《Nueva Timba》` → `['jazz','world']`**：Discogs 兩筆逐字 `Hip Hop`／`Jazz`／`Latin`、
  style 逐字 `Latin Jazz`；③ 官網逐字 `the future of Latin jazz`。`latin` 不在十類名單，
  **依池中先例映射到 `world`**（`Chucho Valdés` 逐字 `["jazz","world"]`、`Irakere` 逐字 `["world","jazz"]`、
  `Orlando "Cachaíto" López` 逐字 `["jazz","world"]`）。
  **`Hip Hop` 那一項不跟**——本碟無饒舌無取樣。

⚠ **`Hip Hop` 是 Discogs 在 Blue Note 2024–25 條目上反覆出現的雜訊**：本組三張命中
（Blue Lab Beats 三筆全中、Harold López-Nussa 兩筆全中、**Brandon Woody 四筆只有一筆中**）。
**判準：該碟全部零售條目都掛才跟，一筆掛三筆不掛就不跟**——故 Brandon Woody 那張維持 `['jazz']`。

`contemporary jazz` 依第 1572 條一律不跟（本組 8 張的 Discogs style 有這一項）。
`post bop`／`hard bop`／`bop`／`avant-garde jazz`／`modal`／`bossa nova`／`latin jazz`／`spiritual jazz`／
`instrumental jazz`／`orchestra`／`jazz rock`／`saxophone` 皆不在十類名單。
MB tags 出現多次的 `jazzthing 160`／`jazzthing 161`／`jazzthing.de`／`ph_temp_checken`／`ph_3_stars`
是德國樂評刊物 jazzthing 的機器標籤，**不是曲風，一律不跟**。

### 2004　③ 廠牌官網：28 個路徑的實際回應碼，以及**一個推翻派工信的實測**

`bluenote.com/artist/<slug>/` 逐一實測，**24 個 200、4 個 404**：

- **200（24）**：`melissa-aldana`／`bill-frisell`／`blue-lab-beats`／`meshell-ndegeocello`／`walter-smith-iii`／
  `wayne-shorter`／`immanuel-wilkins`／`mccoy-tyner`／`joe-henderson`／`bill-charlap`／`aaron-parks`／
  `nels-cline`／`artemis`／`gerald-clayton`／`brandon-woody`／`branford-marsalis`／`johnathan-blake`／
  `joshua-redman`／`harold-lopez-nussa`／`charles-lloyd`／`jason-moran`／**`marvin-sewell`**／`dave-mcmurray`／
  `horace-silver`（`melissa-aldana` 7,404 字、`horace-silver` 9,000 字上限、
  **`marvin-sewell` 雖然 200，正文 0 字、整頁只有導覽列**）。
- **404（4）**：`bill-charlap-trio`／`chihiro-yamanaka`／`the-branford-marsalis-quartet` 與 `branford-marsalis-quartet`（**團名形兩種寫法都 404**）。

**兩點實測結論**：

1. **第 1747-B／1750-B 條「裸名形與團名形兩形都要試」在本組再次被驗證**：
   `bill-charlap` **200**／`bill-charlap-trio` **404**（與該條記載的實測完全一致）；
   `branford-marsalis` **200**／`the-branford-marsalis-quartet` 與 `branford-marsalis-quartet` **都 404**。
2. ⚠ ⚠ **派工信引的「日本線 slug 是姓在前」在 `山中千尋` 身上是反的，請主線更正**：
   **`universal-music.co.jp/yamanaka-chihiro/` 回 404、`universal-music.co.jp/chihiro-yamanaka/` 回 200**
   （名在前）。該頁標題逐字 `山中千尋 | Chihiro Yamanaka`、頁尾逐字 `レーベル UNIVERSAL JAZZ`／
   `ジャンル ジャズ , 邦楽`，RELEASE 欄逐字列 `アナログ Ooh-La-La [重量盤] ... 品 番 UCJJ-9065`。
   **第 1747-B 條要求兩形都試，這條沒錯；錯的是把「姓在前」當成通則。**
   （`黒田卓也` → `kuroda-takuya` 那個實例仍然成立，只是不能外推。）

**站內搜尋也照第 1747-B 條各試一次**：`bluenote.com/?s=Celebration+Volume+1`（200，撈到 2024-08-23 的
Wayne Shorter 新聞稿，**那是本組地雷 1 第三張的 (甲) 唯一證據來源，藝人頁上沒有**）；
`?s=Blue+Eclipse`（200，零報導）；`?s=Chihiro+Yamanaka`（200，逐字回 `No posts has been found!`）。

### 2005　`Horace Silver —《Silver in Seattle》` 的兩處撞陳列：軌名撞**同一位藝人自己的**錄音室名盤

第 2 軌〈Song for My Father〉↔ seed **`Horace Silver —《Song for My Father》(1964)`**（同一掛名！
另有 `Claude Williamson Trio —《Song for My Father》(1994)`）；
第 3 軌〈The Cape Verdean Blues〉↔ seed **`Horace Silver —《The Cape Verdean Blues》(1966)`**（同一掛名！）。

**兩者都是同曲的不同演出**（1965 現場 vs 1964／1966 錄音室），**零錄音重疊，不套 (丁)**。
⚠ **`chk-prop` 抓不到**：複合折鍵比的是盤名不是軌名，而本卡盤名與那兩張完全不同；
MB 的軌名還帶 `(live at the Penthouse, Seattle, WA / 1965)` 後綴，連字串比對都對不上。
已寫進 risk：**下游簡介寫這兩軌時必須逐字寫明是 1965 年現場版。**

本組其餘的軌名撞盤名（全部非 apex、非同碟、零錄音重疊，已逐張寫進 risk）：
`Bill Frisell` 3 處（Lush Life ×2 張卡／Sweet Rain／We Shall Overcome）、
`Meshell Ndegeocello` 2 處（Trouble ×2 張卡／Love）、`Wayne Shorter` 1 處（Lotus ×2 張卡）、
`Immanuel Wilkins` 1 處（MOTION ×3 張卡）、`McCoy Tyner & Joe Henderson` 1 處（**In 'n Out ↔ 同碟聯名者
`Joe Henderson —《In 'n Out》(1965)`**）、`Bill Charlap Trio` 1 處（'Round Midnight）、
`ARTEMIS` 1 處（What the World Needs Now Is Love）、`Gerald Clayton` 1 處（Rush）、
`Branford Marsalis Quartet` 2 處（Belonging／Solstice）、`Charles Lloyd…` 1 處（Heaven）。

### 2006　本信（派工信）與正本／既有裁定牴觸之處，以及查證後與派工信不符的事實

1. **地雷 2 的兩句互相打架**：「照 MB `artist-credit` 逐字取形」與「不可留非 ASCII 連字號」——
   `Harold López‐Nussa` 的 MB AC 逐字就是 U+2010。**照後者走**（第 1702 條與 `chk-prop` 的硬檢查），
   且其餘三邊（Discogs／Apple／③ 官網）本來就是 ASCII。見第 1994 條。
2. **「日本線 slug 是姓在前」是錯的（至少對 `山中千尋` 是反的）**。見第 2004 條。
3. **「`Charles Lloyd` 池中 5 列」**——實掃 `seed_cards.json` 是 **6 列**
   （裸名 5＋`Charles Lloyd & the Marvels Featuring Lucinda Williams` 1）；
   派工信列的四筆是卡單／prop 層的，兩層要分開算。**不影響判斷，但數字更正。**
4. **「`Bill Frisell` 在 c-165 b 有《Four》」**——交件時 `batch-progress/c165/prop-b.json` 只有 5 筆
   （Julian Lage ×2、Dave McMurray、James Francies、Johnathan Blake），**沒有《Four》**；
   ③ 官網 releases 欄確實逐字有 `Four - Bill Frisell`，所以那張碟存在，只是還沒進 c-165 b。
   **不影響第 307 條的結論**（`Bill Frisell` 在 c164 卡單與 c165/prop-a 已是既有字串）。
5. **「本組 22 筆全 jazz」屬實**，但曲風欄有 3 張要帶第二類（見第 2003 條）。
6. **`chk-prop` 的第五道（盤名撞 apex）本組 0 處**——派工信推測「地雷 8 那張很可能會亮」，
   **實測不亮**，因為 `Keith Jarrett —《Belonging》` 不是 apex 卡。**該處仍是真的撞陳列，只是要人工掃。**
   見第 2001 條。
7. **第 1721／1742-B 條的觀察名單本組 0 筆，屬實**（形狀是「所有 release 都是 `Digital Media`＋
   `country: XW`＋`catno` 空」）。⚠ **但 `Aaron Parks —《By All Means》` 的 MB 端形狀近似**
   （唯一一筆 release 是 Digital Media、country 空、catno 空）——**Discogs 有六筆實體零售條目、
   Apple 有 `collectionId`，三層證據齊全，不觸發第 1791 條的年份覆核程序**；此處記下供本機審稿參考。

### 2007　b 組收退結論

**22 筆全收、退 0 筆、退貨率 0%。年份改判 0 筆**（22 張的 MB frd／Discogs `released`／Apple
`releaseDate` 三層全部落在 slice 給的年份；唯一有日期分歧的是
`McCoy Tyner & Joe Henderson`——MB frd 逐字 `2024-10-01`、Discogs 與 Apple 逐字 `2024-11-22`，**同年，不改判**）。
**第 1601 條的 Apple 年初佔位日（`YYYY-01-01T08:00:00Z`）本組 0 筆**；
**c-165 a 那種「Apple `releaseDate` 整個錯 35 年」的形狀本組 0 筆**——
22 張的 Apple `releaseDate` 逐字全部帶真實月日（最早 `2024-04-05T07:00:00Z`、最晚 `2025-11-14T08:00:00Z`）。

**新掛名 9 個**（seed 與卡單／prop 兩層都 0 命中）：`Melissa Aldana`／`Meshell Ndegeocello`／
`Walter Smith III`（a 組同批亦新增，已對齊）／`Brandon Woody`／**`Branford Marsalis Quartet`**／
`Harold López-Nussa`（a 組同批亦新增，已逐字元對齊）／**`McCoy Tyner & Joe Henderson`**／
**`Charles Lloyd, Jason Moran, Marvin Sewell`**／`Blue Lab Beats` 與 `Joshua Redman` 為 seed 既有、
`Bill Frisell`／`Bill Charlap Trio`／`Wayne Shorter`／`Horace Silver`／`Immanuel Wilkins`／`Aaron Parks`／
`Nels Cline`／`山中千尋`／`ARTEMIS`／`Gerald Clayton`／`Johnathan Blake`／`Dave McMurray` 為既有字串沿用。

**`chk-prop` 結果**：`node batch-progress/c166/chk-prop.mjs b` → **`合計 22 張、22 位｜標記 0`**；
`… a b` → **`合計 45 張、36 位｜標記 0`**（跨組重複 0）。
**第五道 `· 盤名撞 apex` 本組 0 處。**
跨批去重：`129 批（其中 2 批讀 prop）｜卡數 5225｜跨批撞卡 0｜同 rgMbid 不同掛名 0`。
（只報不擋的三筆「同掛名盤名詞元包含」與一筆「共用目錄號 CA90028」**全部是 a 組與既有批次的**，b 組 0 筆。）

**號段用掉 1990–2007**（本節結束於 2007，下一棒從 2008 起）。

### 2007-附註　本檔的段落順序（給讀檔的人）

b 組的裁定在本檔**分成兩段**，中間夾著 a 組的 1960–1985：
第 1990–1995 條在**檔案前段**（a 組那時還沒建檔，b 組的第一次 append 建了檔），
第 1996–2007 條在**檔案末段**。**兩段都是 b 組的，沒有內容遺失，也沒有覆寫任何 a 組的行**
（第 1743-B 條：一律 append、不整檔覆寫）。若日後要整理順序，請由主線一次處理，不要各組自己搬。

---

### 第 1986 條（交件前的最後一次覆核，**更新第 1960／1975／1981 條的三個數字**）

本節的第 1960–1985 條寫於交件流程的中段。收尾前重跑一次 `node batch-progress/c166/chk-prop.mjs a`，狀況變了三處，逐條更新如下（**原條文保留、不改寫，本條為準**）：

**(一) 第 1981 條的污染已被對面清掉，`chk-prop a` 現在逐字是 `標記 0`。**
主線在 `a4f72fd`「中途檢查點：c165 策展 b 22 筆、c166 策展 a 23／b 22 筆（皆待自檢）」之後，
`batch-progress/c165/prop-b.json` 逐字變成 **22 筆、`g === "a"` 的 0 筆**——本組那 15 筆複本已不在該檔。
**重跑結果逐字**：`129 批（其中 2 批讀 prop）｜卡數 5225｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 3｜共用目錄號 1（後三項只報不擋）` ＋ `合計 23 張、21 位｜標記 0`。
⚠ **第 1981 條仍然要看**：`ca78a81` 那個提交裡的 5 筆複本**還留在 main 的歷史上**，而該提交的訊息把 c-165 b 的進度記成 15／22（實際當時是 10／22）。**歷史紀錄的修正不是本棒能做的（`git reset`／`git revert` 屬 `CLAUDE.md` 風險操作，要先問店主），留給本機。**

**(二) 第 1975 條的「同掛名盤名詞元包含」從 1 處變成 3 處——多出來的兩處是同一件事的正反兩行。**
逐字：
`⚠ 同掛名盤名詞元包含（只報不擋）：c165 Dave McMurray《Grateful Deadication》 ←→ c166 Dave McMurray《Grateful Deadication 2》`
`⚠ 同掛名盤名詞元包含（只報不擋）：c166 Dave McMurray《Grateful Deadication 2》 ←→ c165 Dave McMurray《Grateful Deadication》`
**成因**：c-165 b 在本棒交件當日收了本碟的前作 `Dave McMurray —《Grateful Deadication》(2021)`。
**判：不是撞卡。** 折鍵 `davemcmurray|gratefuldeadication2` vs `davemcmurray|gratefuldeadication` **不同鍵**，MB RG 不同（本碟 `682ad3ad-992a-4d15-8f38-374fc74b8cad`；前作是 Discogs 19551832／30685009 對應的另一個 RG），**九軌曲目零重疊**。
**已回寫進該卡的 `why` 與 `risk`**：掛名沿用段改記「待上架層已有兩張同掛名的卡（c-164 a《Music Is Life》2018、c-165 b《Grateful Deadication》2021）」，`risk` 的撞陳列段加一句「下游簡介必須把『二』寫清楚，並提到前作」。
**第三處仍是 `Norah Jones《Little Broken Hearts: Live at Allaire Studios》 ←→ c162《…Little Broken Hearts》`，就是第 1963 條那個 (丁) 關係，抓對了。**

**(三) 第 1982 條的 `CA90028` 誤報多了一個受害者，成因確認。**
最新輸出逐字：`⚠ 共用目錄號 CA90028（只報不擋）：c162 Derrick Hodge《Live Today》 ←→ c165 Immanuel Wilkins《The 7th Hand》 ←→ c166 ARTEMIS《In Real Time》 ←→ c166 Norah Jones《Little Broken Hearts: Live at Allaire Studios》`。
**四筆分屬三個批次、三位不同的策展代理，共同點只有一個：`label` 欄逐字引用了 Blue Note 的版權行地址 `… Hollywood, CA 90028 …`。**
**這證實第 1982 條的診斷**（`catnos()` 把美國郵遞區號當目錄號），**並說明它會隨著「逐字引用版權行」這個正確做法而越來越常亮**。
**建議主線照第 1982 條的寫法在 `catnos()` 前剝掉 `\b[A-Z]{2}\s?\d{5}(-\d{4})?\b`。** 本棒不改主線的工具，也不因此刪掉那兩張卡的逐字引用。

**交件狀態**：`batch-progress/c166/prop-a.json` 逐字 23 筆、`g` 欄全部 `"a"`、欄位與 `batch-progress/c165/prop-a.json` 逐字同構（15 欄同名同序）、`chk-prop a` 標記 0、`盤名撞 apex` 0 處。

---

### 第 1987 條（**自我更正**，機器複驗後改正第 1960／1972／1976 條的兩組數字）

交件前對 `prop-a.json` 跑機器複驗（欄位同構、`mbNote` 第一個 UUID vs `slice.rgMbid`、曲風白名單、掛名逐一實掃），抓到本節前面寫錯的兩組計數。**原條文保留，本條為準。**

**(一) 曲風分布：`['jazz']` 是 15 張，不是 16 張。** 機器複算逐字：
`{"[\"jazz\"]":15,"[\"jazz\",\"pop\"]":3,"[\"jazz\",\"world\"]":2,"[\"jazz\",\"soul\"]":2,"[\"rock\"]":1}`，合計 23。
**含 jazz 的 22 張 ＋ 不含 jazz 的 1 張（`Mark Knopfler`）＝ 23。** 第 1960 條與第 1976 條寫的「16 張」是我加總時多算了一張，**其餘四項（pop 3／world 2／soul 2／rock 1）與逐卡實況相符。** 曲風越界 0、`mbNote` 第一個 UUID 對上 `slice.rgMbid` **23／23**、欄位與 `c165/prop-a.json` 逐字同構 **23／23**。

**(二) 掛名：新字串是 9 個、不是 8 個——漏算的是 `Arturo O'Farrill`（裸名）。**
第 1972 條把它列進「沿用既有字串」，**但那是與第 1967 條自相矛盾的**：第 1967 條已經逐字裁定
「兩個字串並存，`Arturo O'Farrill`（裸名，本卡）與 `Arturo O'Farrill, The Afro Latin Jazz Ensemble`（c-165 a）各照各自的發行品」——
**既然是兩個字串，裸名那個在池中與待上架層就都是 0 列，它是新字串。**（實掃：seed 17,248 列 0 命中；各批 prop／cand 只有 c-165 a 的並列形，折鍵 `arturoofarrill` ≠ `arturoofarrilltheafrolatinjazzensemble`。）

**更正後的掛名總計**：

| | 數 |
|---|---:|
| **新字串** | **9**（`Arturo O'Farrill`／`Chris Botti`／`Kendrick Scott, Reuben Rogers, Walter Smith III`／`Walter Smith III`／`Harold López-Nussa`／`Meshell Ndegeocello`／`Cautious Clay`／`Ethan Iverson`／`Julian Lage`），涵蓋 **9 張卡** |
| **沿用既有字串** | **12**（`Dave McMurray`／`Erik Truffaz`／`Gregory Porter`／`Norah Jones`／`Joe Chambers`／`ARTEMIS`／`山中千尋`／`Aaron Parks`／`Ron Miles`／`Nduduzo Makhathini`／`Mark Knopfler`／`Charles Lloyd`），涵蓋 **14 張卡**（`Erik Truffaz` 與 `Norah Jones` 各兩張） |
| 合計 | **21 個字串／23 張卡**（與 `chk-prop` 輸出的「23 張、21 位」逐字相符） |
| **新造分裂** | **0**（不變） |

**第 1972 條的其餘內容（掃描清單實況、四處人工核掉的分裂、一處跨文字系統）全部不變。**
