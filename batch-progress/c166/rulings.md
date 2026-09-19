
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

---

## c-166 a 組 研究層裁定　號段 2246–2295

（本節一律 append 於檔末，不整檔覆寫、不碰 a 組策展的 1960–1989 與 b 組的 1990–2007——第 1743-B(四) 條。）

### 第 2246 條（交件總表）

| 項目 | 值 |
|---|---|
| 產出檔 | `desc-tools/batches/research/c166-a.json` |
| 張數 | **23／23**（`key` 逐字複製自 `desc-tools/batches/cards/c166-cards.json` 的 `group === "a"`，含 22 個 `desc2:` 與 1 個 `desc4:`（`山中千尋`）前綴） |
| `facts` 條數分佈 | **12 條 ×21 張、13 條 ×2 張**（`Dolce Vita`／`The Sky Will Still Be There Tomorrow`），合計 **278 條**，每條都帶完整 `https` `src`，`qa-batch` 的「src 不是完整 https 網址」0 筆 |
| `status`／`coverage` | **23 張全部 `full`**（兩欄同值並存） |
| `hookCandidates` | 每張 2 條，未超上限 |
| `node qa-batch.mjs research c166` | **a 組旗標 0**（過程中出現過的兩筆已修掉，見第 2252 條）；`互指?` **0 行**（該檢查只在 hook／out 兩階段輸出，research 階段結構上不會產生，第 1763-B 條無可判讀之處） |
| 用掉的號段 | **2246–2254**（2255–2295 未用） |

### 第 2247 條：③ 來源層各查法的命中率——`wp-json/wp/v2/posts` 是本批的主力

派工信給的優先序逐一實測（查詢字串一律去掉撇號，**`O%27Farrill` 回 0 筆、`Ofarrill` 回 3 筆，撇號會讓 `search` 落空**）：

| 查法 | 覆蓋張數 | 說明 |
|---|---:|---|
| **(1) `bluenote.com/wp-json/wp/v2/posts?search=`** | **19／23** | 回 `content.rendered` 全文，發片稿、單曲稿與獎項稿都在裡面；本批絕大多數的引號逐字都出自這一層 |
| **(2) `bluenote.com/artist/<slug>/`** | **1／23 為決定性**（`Erik Truffaz`，兩張碟都靠它的傳記段） | 其餘藝人頁的內容都被 (1) 涵蓋 |
| (3) `bluenote.com/?s=` | 0（本棒未再用，(1) 已足） | — |
| **(4) `universal-music.co.jp`** | **1／23**（`山中千尋《Dolce Vita》`，`chihiro-yamanaka` 200） | 該頁是本卡唯一的官方敘事來源，含編制、錄音年月、錄音地與題旨 |
| (5) 藝人官網 | **0／1 成功**（`markknopfler.com` 的 `/biography/` 是 JS 渲染、`wp-json` 的 `posts` 回 0 筆，只有 `pages/54` 一筆標題為 `One Deep River` 但無 `content` 欄） | `eriktruffaz.com` 回 526、`bluenote.fr` 被 proxy 擋 |

**③ 層整批落空的只有 3 張**：`Erik Truffaz` 兩張（法國線，`wp-json` 以 `Truffaz`／`Rollin`／`Clap` 查皆 0 筆，只有藝人傳記頁）與 `Norah Jones《Little Broken Hearts: Live at Allaire Studios》`（`wp-json` 以 `Allaire`／`Little Broken Hearts` 查只回母體專輯與豪華版的稿，沒有本碟專屬稿）。**這三張的專輯層事實改以 Discogs 條目的 `credits`／`companies`／`notes` 欄為主**，已逐張寫進 `notes`。

### 第 2248 條：獎項逐項核定——本批 6 筆，全部分清屆數／類別／入圍或得獎

| 卡 | 獎項 | 判 | 交叉核 |
|---|---|---|---|
| `Meshell Ndegeocello《The Omnichord Real Book》` | 第 66 屆葛萊美 **最佳另類爵士專輯** | **先入圍（2023-11-10 公布）後得獎（2024-02-05 官方稿），且是該獎項首屆得主** | 英文維基第 66 屆條目該類別第一筆（粗體＝得主）逐字就是本碟 |
| `Julian Lage《Speak to Me》` | 第 67 屆葛萊美 **最佳當代器樂專輯** | **入圍，未得獎** | 得主為 Taylor Eigsti《Plot Armor》（維基第 67 屆該類別粗體條目） |
| `Gregory Porter《Christmas Wish》` | 第 67 屆葛萊美 **最佳傳統流行人聲專輯** | **入圍，未得獎** | 得主為 Norah Jones《Visions》 |
| `Mark Knopfler《One Deep River》` | 第 67 屆葛萊美 **最佳美式根源歌曲**，單位是〈Ahead of the Game〉這**首歌**不是專輯 | **入圍，未得獎** | 得主為 Sierra Ferrell 與 Melody Walker 的〈American Dreaming〉 |
| `Ron Miles《Old Main Chapel》`（藝人生涯） | 第 61 屆葛萊美 **最佳爵士器樂專輯**，以樂手身分列名 Joshua Redman《Still Dreaming》 | **入圍，未得獎** | 得主為 The Wayne Shorter Quartet《Emanon》 |
| `Chris Botti《Vol. 1》`（藝人生涯） | 第 55 屆葛萊美 **最佳流行器樂專輯**，作品《Impressions》 | **得獎**（2013-02-10）；另《Italia》2008 年入圍同類別、《Chris Botti in Boston》2010 年三項入圍 | 英文維基 Chris Botti 條目的獎項表 |

**兩筆累計型的宣稱已標明「是累計得獎數、與本碟無關」**：`Arturo O'Farrill` 的 `the 8-time GRAMMY-winner`（另補一項可逐項核到的得獎：2015 年最佳拉丁爵士專輯《The Offense of the Drum》）與 `Norah Jones《Playing Along》` 的 `9-time GRAMMY Award winning`。
**其餘 15 張逐一查過，本碟本身無任何葛萊美入圍或得獎紀錄**（第 66／67 屆的 Blue Note 官方入圍名單兩篇已全文讀過）。
**非葛萊美的獎項兩筆**：`Erik Truffaz` 的 1991 年 Prix Special（官網傳記逐字 bestowed，**得獎**）、`Harold López-Nussa` 的 2005 年蒙特勒爵士鋼琴大賽（官方稿逐字 winning，**得獎**）。

### 第 2249 條：**策展層（`prop-a.json`）被推翻或補正的逐筆清單——硬錯誤 1 處、不精確 2 處，其餘 20 張零推翻**

派工信要求「策展層的 `why`／`risk` 若與你查到的衝突，以你的來源為準，並逐筆寫進交件回報」。逐張比對後：

1. ⚠ **`Chris Botti《Vol. 1》` 的 `why` 把合作名單寫成含 `Steven Tyler`。** 本棒抓到的三份 2023 年發片稿（`chris-botti-announces-blue-note-debut-vol-1`／`chris-botti-my-funny-valentine-featuring-joshua-bell`／`chris-botti-teams-with-singer-john-splithoff-on-romantic-new-single-paris`）**逐字名單是 Sting、Paul Simon、Barbra Streisand、Lady Gaga、Tony Bennett、Frank Sinatra、Aretha Franklin、Bette Midler、Joni Mitchell、Andrea Bocelli、Herbie Hancock、Yo-Yo Ma，沒有 Steven Tyler**（策展層引的是藝人頁的傳記段，本棒引的是發片稿，兩者不同源）。**本稿不引用該名單**，改引可逐字核到的其他事實。
2. ⚠ **`Arturo O'Farrill《Legacies》` 的 `why` 把〈Obsession〉歸進「Herbie Hancock、Monk、Sonny Rollins、Bud Powell 與 Carla Bley 的曲目」那一串。** 官網逐字把它歸給**波多黎各作曲家 Pedro Flores**，另把〈Pure Emotion〉歸給他父親 Chico O'Farrill。**本稿照官網寫。**
3. ⚠ **`Chris Botti《Vol. 1》` 的 `why` 把〈Paris〉當成一般單曲列出，未寫明它是全碟唯一的人聲曲。** 官網逐字 `the vocal feature "Paris" with John Splithoff`。**本稿補上。**

**另有 3 處是策展層沒查、本棒補進來的關鍵事實**（不算推翻，但下游會用到）：`Dave McMurray《Grateful Deadication 2》` 的錄音地與工程師（Clubhouse Studios、Elliot Scheiner、四天四夜）與出版公司 Ice Nine（Grateful Dead 自己的出版社）；`Ron Miles《Old Main Chapel》` 的製作人 Hans Wendl 與五位解說執筆者；`山中千尋《Dolce Vita》` 的**整張碟是 Wayne Shorter 致敬盤、末兩軌另悼坂本龍一**——**這一點策展層的 `why`／`risk` 完全沒有，而它是本卡的主故事。**

**策展層的軌數釘定、掛名判定、碼位判定、(甲)～(己) 判定，本棒逐張複核後全部成立，零推翻。**

### 第 2250 條：**本派工信與 base 檔／既有裁定牴觸之處——2 處**

1. ⚠ **派工信第三節說「`③` 來源層的查法優先序⋯(2) `bluenote.com/artist/<slug>/`，裸名與團名兩種形式都試」並附第 1751-B 條「一個樣本只證明一件事」的警語——這一句沒錯，但本批的實況是 (1) `wp-json` 幾乎把 (2) 完全覆蓋**（19／23 張的決定性逐字出自 (1)，(2) 只在 `Erik Truffaz` 一位身上是決定性的）。**不是牴觸，是優先序的權重在本批與派工信的預期不同，記下供後批參考。**
2. ⚠ **派工信第四節第 3 點要求「`互指?` 逐筆人工判讀，第 1763-B 條」——`qa-batch.mjs` 的 `互指?` 只在 hook（第 265 行）與 out（第 332 行）兩個階段輸出，`research` 階段結構上不會產生任何 `互指?` 行。** 實跑 `node qa-batch.mjs research c166` 逐字確認 0 行。**這一句對研究層是空指令，建議主線在研究層的派工信裡拿掉，或改寫成「若有才判」。**

**另有一處派工信寫對、本棒實測確認的**：第三節第 1 點說的兩張真缺（`Norah Jones《Playing Along》` 與《Little Broken Hearts: Live at Allaire Studios》）屬實，本棒未重跑串流回撈、也未碰 `previews.json`；`Little Broken Hearts (Deluxe Edition)` 的第二／三碟確實是 **2012 年的 Austin City Limits**（官網逐字 `a previously unreleased live version of the album that was recorded for Austin City Limits in 2012`），**不是 Allaire，已逐字寫進該卡的 `notes` 當硬警告。**

### 第 2251 條：`Erik Truffaz` 兩張的反同構切角分配（同批同一個計畫的前後兩集）

依 base 檔「同一批裡多張同源流的卡各張要指定不同切入面向並互寫排除」：

- **《Rollin'》**：切角是**翻奏譜系**——Miles Davis 替 Louis Malle 寫的〈Ascenseur pour l'échafaud〉、Nino Rota／Michel Magne／John Barry／Morricone 的作者欄，以及演員 Sandrine Bonnaire 的人聲。
- **《Clap!》**：切角是**版本差異與樂手身分**——CD 與黑膠第 6／8 軌對調（法版 CD 的 notes 欄逐字 `Tracklist corrected!`）、Philippe Sarde／Georges Delerue／Michel Colombier／Peter Ivers 的作者欄，以及「他罕見地收起 drum'n'bass 與嘻哈的節奏實驗」。
- **兩張共用的生平段（父親的舞廳樂隊、十六歲聽《Kind of Blue》、2000 年簽進 Blue Note）只寫在《Rollin'》那張**，《Clap!》只取傳記裡的節奏實驗與鼓手更替兩句。**已在兩張的 `notes` 互相寫明排除。**

同理，`Norah Jones` 兩張（《Playing Along》的 podcast 合作集 vs《…Allaire Studios》的整張重演）與 `Dave McMurray` 的續集關係也已各自在 `notes` 標明切角與必須提到前作。

### 第 2252 條：`qa-batch` 結果——a 組旗標 0，唯一剩下的總標記來自 b 組缺 2 張

首跑逐字三筆警告：`⚠ research-a 簡體字: 会`、`⚠ research-a 千分位逗號: 2,500`、`⚠ key 集合與卡單不一致`。

1. **`会`** 出在 `山中千尋《Dolce Vita》` 一條 facts 逐字引用 `universal-music.co.jp` 商品頁的日文欄位 `発売元 ユニバーサル ミュージック合同会社`。**`会` 是日文新字體、與簡體字無法區分（base 檔字元條已預告這一類 QA 掃得到但語義上不是簡體）。** 本棒的處置是**改寫該句、不再逐字引用那個公司名**（改寫成「發行者是日本環球音樂」），保留同句其餘的 `SHM-CD`／`UCCJ-2227`／`Blue Note` 逐字。**旗標清掉。**
2. **`2,500`** 出在 `Norah Jones《…Allaire Studios》` 一條 facts 逐字引用 Discogs 的英文 notes `Limited edition of 2,500 copies.`。**base 檔「數字不用千分位逗號」是硬規，且該條的資訊量不依賴逐字引號**，改寫成「限量 2500 張」。**旗標清掉。**
3. **`key 集合與卡單不一致` 不是 a 組造成的**：`qa-batch` 第 211 行比的是 a＋b 兩組的 `key` 聯集對 45 張卡單，實跑逐字 `a 23`／`b 20`——**b 組目前是 20／22，缺 2 張**。a 組這一側逐張比對通過（`key 不在卡單` 0 筆）。**本棒不碰 `c166-b.json`（邊界明訂禁碰），這一項留給 b 組收尾。**

複跑結果逐字：`a 23 full×23`／`b 20 full×20`／`⚠ key 集合與卡單不一致`／`總標記 1`。

### 第 2253 條：三處交給下游的硬警告（都寫進了各卡的 `notes`，在此彙整供主線覆核）

1. **`Gregory Porter《Christmas Wish》`**：Apple 上 2023 年的 12 軌原版已下架，us／jp 現在只剩 2024-12-06 的 `Christmas Wish (Deluxe)`（15 軌，`1779846239`），四個 UPC lookup 全回那一筆。**卡上的年份取 2023、正文照 12 軌敘述；固定試聽若配到 Deluxe 必須在備註寫明（第 646／865 條）。**
2. **`Cautious Clay《KARPEH》`**：Apple 淨化／未淨化雙胞胎，關鍵字與三個 UPC 回的都是淨化版 `1692484931` 在前，**上架一律取 `1692470376`（explicit）**。
3. **`Norah Jones` 兩張**：Apple 完全查無。**絕不可拿同名單曲 `1488043432` 或母體《…Little Broken Hearts》的 Apple 條目充數（第 528／707 條）。**

另兩處提醒：**`Ron Miles《Old Main Chapel》` 的 `keyTracks` 只有〈I Will Be Free〉與〈New Medium〉兩首有官方逐字支撐**，另兩首取自 MB 軌名，已在 `notes` 標明供寫作層覆核；**`Charles Lloyd《The Sky Will Still Be There Tomorrow》` 的〈Balm in Gilead〉與〈Lift Every Voice〉在 Discogs 的版權欄逐字是 Public Domain**，正文若寫「全碟自作曲」會錯。

### 第 2254 條：號段結餘

**本節用掉 2246–2254，2255–2295 未用**，下一棒若沿用 a 組研究層的號段可從 2255 起。

### 第 2255 條（收尾前重跑，更新第 2252／2254 條）

交件前最後一次 `node qa-batch.mjs research c166`，**b 組已在此期間補齊到 22 張**，輸出逐字變成：
`a 23 full×23`／`b 22 full×22`／`key 與卡單完全一致 ✓`／`全部通過 ✓`。
**第 2252 條第 3 點記的那個 `⚠ key 集合與卡單不一致` 已自然消失，總標記 0；a 組這一側自始至終 0 旗標（兩筆字元類警告已於該條記載的方式修掉）。**
**本節實際用掉 2246–2255，2256–2295 未用。**

---

## c-166 b 組（22 筆）**研究層**裁定　號段 2296–2345

（本節一律 append，不整檔覆寫——第 1743-B(四) 條。開工時本檔已含 b 組策展（1990–2007）與 a 組策展（1960–1987）、a 組研究（2246–2255）三節，本棒接在最後。
⚠ **號段不連續是已知情況，不是越界**：本檔實際用到的最大號是 a 組研究的 2255，派工信給 b 組研究的號段是 2296–2345，中間 2256–2295 是 a 組保留而未用完的。依第 1794-B 條「主線給的號段靠不住」，本棒**照派工信給的區間用，不往下補洞**，以免與 a 組撞號。）

### 2296　交件總表

| 項目 | 值 |
|---|---|
| 完成張數 | **22／22** |
| `facts` 條數 | **每張 12 條，合計 264 條**（分佈：12×22，無一張落在 8–11） |
| 每條 `src` 皆為完整 https 網址 | **264／264** |
| `hookCandidates` | 每張 2 條（上限），合計 44 |
| `status`／`coverage` | 22 張皆 `full`／`full`（兩欄同值） |
| `key` 逐字複製 | 22／22 與 `c166-cards.json` 的 `group === "b"` 完全一致（含第 12 張的 `desc4:` 前綴） |
| `node qa-batch.mjs research c166` | **`a 23 full×23`／`b 22 full×22`／`key 與卡單完全一致 ✓`／`全部通過 ✓`**，**b 組旗標 0**、`互指?` **0 處**（研究層單獨跑時 hook／desc 兩段不觸發，故無互指可判讀） |
| 推翻策展層 | **1 處**（第 2297 條）；另有 3 處是「策展層沒寫、本棒補上」的缺漏，不算推翻 |
| 產出 | `desc-tools/batches/research/c166-b.json`（22 筆） |

⚠ **未碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`previews.json`／`caa.json`／`c166-a.json`／其他批次的檔案。**未 `git commit`、未 `git push`、未動 git 索引。**

### 2297　**推翻策展層一處**：`Meshell Ndegeocello《No More Water》` 的葛萊美是**得獎**，不是入圍

`prop-b.json` 第 4 張的 `why`／`risk` **完全沒有寫獎項**，而 ③ Blue Note 官網唯一提到本碟獎項的那一篇是 2024-11-08 的
`https://www.bluenote.com/2025-grammy-award-nominees/`（**入圍名單**，逐字 `BEST ALTERNATIVE JAZZ ALBUM : Meshell Ndegeocello No More Water`）。
**只讀官網會寫成「入圍」——那正是 base 檔獎項那節警告的最高頻錯誤。**

實查結果：**本作在 2025-02-02 的第 67 屆葛萊美獎「得獎」**，證據兩層——
`https://www.grammy.com/videos/meshell-ndegeocello-wins-best-alternative-jazz-album-2025-grammys`（得獎影片頁），
以及 Blue Note 自己 2026-07-15 的《Synonym》新聞稿逐字 `earning her the first two GRAMMY Awards to honor her own albums in her three-decade long recording career`。
同段另確認《The Omnichord Real Book》(2023) 是**首屆**該獎項的得主，也是得獎。

**處置**：facts 寫「得獎」並附 grammy.com 的 src，notes 標明官網那篇只到入圍階段。
**這一條對後批的意義**：**Blue Note 官網每年 11 月那篇「入圍名單」是本線最容易被當成結論的來源，它只證明入圍，不證明結果。**

### 2298　同批另外四張的葛萊美**全部是入圍未得獎**，得主已逐項查明

依第 2297 條的教訓，本組凡出現葛萊美字樣一律查到「誰得獎」為止：

| 卡 | 屆次／類別 | 結果 | 該屆得主 |
|---|---|---|---|
| `Bill Frisell《Orchestras》` | 第 67 屆（2025）最佳當代器樂專輯 | **入圍未得獎** | Taylor Eigsti《Plot Armor》 |
| `Immanuel Wilkins《Blues Blood》` | 第 68 屆（2026）最佳另類爵士專輯 | **入圍未得獎** | Nate Smith《LIVE-ACTION》 |
| `Branford Marsalis Quartet《Belonging》` | 第 68 屆（2026）最佳爵士器樂專輯 | **入圍未得獎** | Sullivan Fortner《Southern Nights》 |
| `Gerald Clayton《Ones & Twos》` | 第 68 屆（2026）最佳當代器樂專輯 | **入圍未得獎** | ARKAI《Brightside》 |

src：`https://www.grammy.com/news/2026-grammys-nominations-full-winners-nominees-list/`（2026 三筆）與
`https://www.grammy.com/awards/categories/best-contemporary-instrumental-album/`（2025 那筆）。
⚠ **官網沒有「得獎貼文」不等於沒得獎**，本棒不以此推論，四筆都另查了得主。

### 2299　`Blue Lab Beats` 的獎項：官網寫「入圍」、實況是該專輯「得獎」，但受獎人不是他們——只寫可查證的那一層

③ `bluenote.com/artist/blue-lab-beats/` 逐字 `a Grammy nomination for their work on the Angelique Kidjo album Mother Nature`。
實查 `https://www.grammy.com/news/angelique-kidjo-mother-nature-best-global-music-album-winner-2022-grammys`：
**《Mother Nature》在第 64 屆（2022）拿下最佳全球音樂專輯，是 Kidjo 生涯第五座。**
官網那段簡歷寫於 2022 年頒獎前、停在入圍階段。

**判**：最佳全球音樂專輯的受獎人是掛名藝人，**製作人是否列名受獎者本棒查不到明文**，所以
facts 只寫「他們參與製作的那張專輯得獎」這個可查證的層級，**不寫「雙人組拿到葛萊美」**。MOBO 2021 最佳爵士演出則是入圍。
（判準 2「可逆」：這是卡單值層級的敘述，本棒自行定案。）

### 2300　③ 來源層各查法的命中率（22 張實測）

| 查法 | 命中 | 備註 |
|---|---:|---|
| **(1) `bluenote.com/wp-json/wp/v2/posts?search=`** | **20／22** | 回 `content.rendered` 全文，**單篇新聞稿常同時帶完整曲序、編制、錄音／混音／母帶 credits 與藝人第一人稱引句**，是本層 CP 值最高的路徑 |
| **(2) `bluenote.com/artist/<slug>/`** | **21／22** | 21 個路徑實測全部 200（只有 `chihiro-yamanaka` 未試，第 2004 條已記為 404）。傳記段落補足「第幾張 Blue Note 專輯」「生平」「獎項沿革」這三類 (1) 不一定有的資料 |
| (3) `bluenote.com/?s=` | **0 次使用** | (1) 的涵蓋率已足，本組沒有一張需要退到站內搜尋 |
| **(4) `universal-music.co.jp`** | **1／1** | 只有第 12 張需要，見第 2301 條 |
| (5) 藝人官網 | **0／1** | 只試過 `bluelabbeats.com`（200 但整站 JS 渲染、去標籤後只剩 113 字元，等於零內容） |

⚠ **兩張例外要記下來**：

1. **`Blue Lab Beats《Blue Eclipse》`——(1)(2) 兩條路徑對「本碟」都是空的。** 以「Blue Eclipse Blue Lab Beats」搜 `wp-json` 回 **0 篇**，改搜「Blue Lab Beats」回 6 篇但全部與本碟無關；藝人頁 200，但 Releases 欄逐字只列《Motherland Journey》與《We Will Rise》。**第 1998 條記的「本碟在 Blue Note 官網零報導」本棒獨立複驗成立。** 本張的曲目與客座名單改走 ④ Apple 的 `lookup?id=…&entity=song`（一次回 12 軌的完整 feat. 名單），藝人背景走 ③ 藝人頁，曲風與包裝走 ② Discogs。
2. ⚠ **`Joshua Redman《Words Fall Short》`——關鍵字順序會決定成敗。** 用「Words Fall Short Joshua Redman」搜，回的 6 篇有一半是 **Paul Cornish 的新聞稿**（因為那些稿子提到本碟）；改用「**Joshua Redman Words Fall Short album**」才把本碟的三篇（公告稿＋兩支單曲稿）撈齊。**後批遇到「搜到的全是別人的稿子」時，把藝人名放到關鍵字最前面再搜一次。**

### 2301　日本線（第 12 張）：商品頁 slug 要從 `/discography/` 反查，`uccj-2245` 是 404

第 2004(2) 條已記「`universal-music.co.jp/chihiro-yamanaka/`（名在前）200、`yamanaka-chihiro/` 404」，本棒複驗成立。
**本條要補的是商品頁怎麼找**：直接猜 `/products/uccj-2245/` 回 **404**；
`https://www.universal-music.co.jp/chihiro-yamanaka/discography/`（200）的 HTML 裡可以用 `products/[a-z0-9-]+/` 一次抓出全部 slug，
本碟的三個是 **`uccj-2251`（SHM-CD 通常盤）／`uccj-9256`（UHQCD 初回限定盤）／`ucjj-9065`（2026 重量盤黑膠）**，三頁皆 200。
前兩頁內容相同，帶**演奏者、錄音地、製作人、母帶工程師與逐軌作曲者**——這些欄位 MB 與 Discogs 都沒有，是本張 facts 的主要來源。
**後批查日本線時，先抓 `/discography/` 的 slug 清單，不要猜品番。**

### 2302　兩個東亞人名**刻意不套 2026-08-11 漢字裁定**，維持羅馬字

base 檔的東亞人名裁定要求照原文漢字寫，**但前提是查得到可靠的寫法**；另一條「單一來源的人名要交叉驗證，驗不到就標 uncertain 或略去」在本組壓過它兩次：

1. **`Noriko Ueda`**（第 13 張 ARTEMIS 的低音提琴手）——網路上同時出現「上田典子」與「植田典子」兩種漢字寫法，其中一個來源是規則明令不可採信的 grokipedia。**facts 維持 ③ 官網的 `Noriko Ueda`。**
2. **`Kazutomi Aoki`**（第 16 張日版 CD 的內頁文案作者，Discogs 35437573／33670617 逐字）——查不到可交叉驗證的漢字寫法。**維持羅馬字。**

**兩筆都寫進該卡 notes**，若本機日後查到唱片公司或本人官網的漢字寫法再改。
（對照：**`山中千尋`／`筒美京平` 兩個名字有 `universal-music.co.jp` 的官方漢字頁，照裁定寫漢字，沒有例外。**）

### 2303　兩處來源互相打架，本棒當場定案

1. **`Horace Silver《Silver in Seattle》` 的 A 面錄音日**：Discogs 35470252（歐版黑膠）跨頁內頁逐字 `Side A Recorded 8/13/65`，
   但 35752099（美版黑膠）逐字 `Side A Recorded 8/12/65`，兩筆 CD（35468755 與日版 35900185）的 notes 逐字都是
   `August 12, 1965 (tracks 1 to 3)`。**三比一取 8 月 12 日**，歐版那筆疑為印刷誤植。（判準 2：可逆，寫進 facts 與 notes 供本機覆核。）
2. **`McCoy Tyner & Joe Henderson《Forces of Nature》` 的發行日**：MB 的 `first-release-date` 逐字 `2024-10-01`，
   ③ 官網新聞稿（`2024-11-22T00:01:57`，標題逐字 `OUT NOW`）、Discogs 四筆與 Apple 逐字都是 `2024-11-22`。
   **facts 取 11 月 22 日**；年份不受影響，與第 2007 條「同年、不改判」一致。

### 2304　本棒自行補查、官網沒寫的兩層事實

1. **`Walter Smith III《three of us are from Houston and Reuben is not》` 的那首 Sam Rivers 作品**：
   ③ 官網三篇都只寫 `an imaginative rendering of a Sam Rivers composition`，**沒說是哪一首、也沒說出自哪張碟**。
   本棒以 MB 交叉確認第 7 軌〈Point of Many Returns〉是 Rivers 的作品、原收於他 1967 年的 Blue Note 專輯《Contours》
   （RG `019093e2-0dd5-3564-a5f0-11a0dfb6202b`）。**兩層分開列成兩條 facts**，下游若只要一層可只用官網那條。
   ⚠ 這是一條 Blue Note 內部的源流（Blue Note 現役藝人翻 Blue Note 舊作），**依曲風源流／廠牌規則本來就該寫**。
2. **`Aaron Parks《By All Means》` 的第 1721／1742-B 條訊號**：第 2006(7) 條記「MB 端形狀近似觀察名單」。
   本棒實查：MB 端確實只有一筆 Digital Media release、`country` 空、`catno` 空，**但 Discogs 五筆實體零售條目的 `released`
   逐字都是 `2025-11-07`，與 MB frd 同日，沒有任何一筆更早**。**訊號亮但不改判**，與該條結論一致。

### 2305　字元與體例的程式化自檢（base 檔要求「不要用眼睛掃」）

交件前對 `c166-b.json` 全檔逐字元跑過一次，結果：

- **簡體字 0**（以常用簡體字集掃描，命中的 `表走缺向台菜通骨里角` 十個字在正繁兩體同形，非簡體）。
- **西里爾／希臘／天城體／諺文 0**，唯一的希臘字母是 **`Π professional Audio`**（馬德里錄音室的**專名**，Discogs 逐字，依字元條的專名例外保留）。
- **日文假名只剩一處**：`〈スニーカーぶる〜す〉`（第 12 張翻唱曲的**原曲名**，專名例外，首次出現處已併記碟上的拉丁題名〈Sneaker Blues〉）。
  **原本直引官網欄位的兩處描述性日文（「ジャズ・ピアニスト」「ジャンル ジャズ , 邦楽」）已全部改寫成中文。**
- **日文新字體 0**：`楽`／`沢`／`実`／`発`／`売` 全檔各 0 次（改寫時一律用 `樂`／`澤`／`實`）。**這一項 QA 掃不到，只能自檢。**
- **千分位逗號 0**（以 `\d{1,3},\d{3}` 掃描）。
- **`src` 全部 https**：264／264。

### 2306　本派工信與 base 檔／既有裁定牴觸之處

逐條核對後，**本信沒有與 base 檔或既有裁定實質牴觸的句子**；以下三點是「數字或預期與實測不同」，記錄如下：

1. **號段 2296–2345 與本檔的既有號段不連續**（本檔開工時最大號是 a 組研究的 2255，中間 2256–2295 空著）。
   派工信本身已用第 1794-B 條提醒「主線給的號段靠不住」，本棒**照給的區間用、不往下補洞**，見本節開頭。**這不是錯，只是要讓後批知道洞是刻意留的。**
2. **「本批 43/45 有來源」對 b 組而言是 22／22。** 派工信說真缺的兩張是 `Norah Jones` 的兩張 RSD 盤——**那兩張都在 a 組**，
   b 組 22 張在 `previews.json` 裡逐張都有 `collectionId` 與 `previewUrl`（`caa.json` 的 `art.url` 亦 22／22）。**b 組沒有無來源卡。**
3. **③ 查法優先序 (2) 的「裸名與團名兩種形式都試」在本組沒有需要動用的場合**：22 張裡有團名掛名的三張
   （`Bill Charlap Trio`／`Branford Marsalis Quartet`／`ARTEMIS`），**前兩張的團名形 404 已由策展層第 1995／2004 條實測記載**，
   本棒未重跑（那是掛名層的問題，不影響取材）；`artemis` 本身就是團名且 200。**派工信提醒的第 1751-B 條（一個樣本不是一條規律）成立，但本組沒有新樣本可加。**

⚠ **base 檔本身的衝突已由其開頭的「雲端例外」節解掉，本棒照例外走**：產出直接寫進 repo、每張 8–12 條 facts 而非 2 個來源、`key` 照卡單逐字複製（第 12 張是 `desc4:`）、`status` 與 `coverage` 兩欄並存。**其餘（獎項分入圍／得獎、禁簡體、禁千分位逗號、`hookCandidates` 上限 2、暫存檔帶批次組別前綴）全部照 base 檔原文。**

### 2307　暫存檔與工具（全部帶 `c166b-` 前綴，第 118 行規定）

放在本工作階段的 scratchpad，未進 repo：
`c166b-fetch-bn.mjs`（`wp-json` 抓取，可續跑）／`c166b-fetch-mb.mjs`（MB RG＋release＋軌名，可續跑）／
`c166b-fetch-url.mjs`（任意頁面抓取＋去標籤）／`c166b-digest.mjs`（把 MB／Discogs／新聞稿／藝人頁併成單卡摘要）／
`c166b-merge.mjs`（把 `c166b-cards/<1..22>.json` 依卡單順序併成 `c166-b.json`，併前逐張比對 `key`）。
**每張寫完就存成獨立的 `c166b-cards/N.json`，每三張跑一次 merge 寫回 repo**——容器若重啟，重派同一支代理可直接從缺號那張接續，不必重寫。
MusicBrainz User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，每次請求間隔 ≥1.1 秒，503 走重試不當查無。抓取日期：2026-09-19。

**本節實際用掉 2296–2307，2308–2345 未用。**

---

## c-166 a 組（23 筆）**鉤子層**裁定　號段 2401–2440

（本節一律 append 於檔末，不整檔覆寫、不碰既有的 1960–1987／1990–2007／2246–2255／2296–2307——第 1743-B(四)／第 1806-B 條。
開工前本檔已有 1153 行、四節，本棒只在檔末追加。）

### 第 2401 條（交件總表）

| 項目 | 值 |
|---|---|
| 產出檔 | `desc-tools/batches/hooks/c166-hooks-a.json` |
| 張數 | **23／23**，`key` 逐字複製自 `desc-tools/batches/research/c166-a.json`、**順序與研究稿完全相同**（22 個 `desc2:` ＋ 1 個 `desc4:`） |
| 與卡單比對 | `c166-cards.json` 的 `group === "a"` 23 張，**缺 0 多 0** |
| `hook` 加權字元（英數 0.5） | **16–25.5**，全部 ≤50 |
| `note` 原始字元（`Array.from`） | **203–232**，全部 ≤350 |
| **`note` 字元預算**（公式見第 2402 條） | **202–230，中位數 221，0 筆超標** |
| 骨架歸屬 | **11 張**寫「這條骨架全批只走本張。」，其餘 12 張一字不寫、不點名（見第 2404 條） |
| `node qa-batch.mjs hooks c166` | **a 組旗標 0**；`互指?` **0 行**（見第 2406 條） |
| `node chk-hook-crossgroup.mjs c166` | **`c166｜1 組｜23 張`／`hook 加權 16–25.5｜note 203–232`／`✓ 全部通過`** |
| 用掉的號段 | **2401–2407**（2408–2440 未用） |

⚠ **工作區當下版本才是交件版**（第 1803-B 條，本線已三次）：本節所有數字都是對**磁碟上當下那一份** `c166-hooks-a.json` 實跑出來的，不是中途快照。「筆數對了」與「定稿了」在本棒是同一個時點。

### 第 2402 條：**本棒實際用的字元預算公式（逐字，第 1793-B 條）**

照 `hook-base.md` 雲端註記第 2 點寫死的那條，一字未改、未自創係數：

```
預算 = Array.from(hook).length + Array.from(note).length
       − Array.from('主故事：').length            //  4
       − (note.match(/→/g)||[]).length            //  每個箭號扣 1
       − Array.from('正文只寫上列各項。').length   //  9（有才扣）
       − Array.from('這條骨架全批只走本張。').length // 11（有才扣）
```

**只扣這四樣，其餘一律算**：年份指定（「發行年寫 2023 年」）、軌數指定、引用限制（「引用盤名時帶完整副標題」）、
克制指示（「悼念的部分克制地寫」）、獎項寫法指定（「第 67 屆⋯寫成入圍」）**全部計入**。

⚠ **這把尺先在 `c165-hooks-a.json` 上倒回去驗過**：23 張逐格算出
`209,211,212,212,213,214,214,215,215,217,217,219,224,224,224,228,228,228,229,229,229,230,230`，
**分佈 1-11-9-2（<210／210–219／220–229／230）、中位數 219**——與 c-165 a 組回報、c-165 b 組復算的三方數字逐格相同。**確認同尺後才開始量本批。**

**本批 23 張的實測分佈**（同樣的四格切法）：

| 區間 | 張數 |
|---|---:|
| <210 | **3**（202／206／208） |
| 210–219 | **6** |
| 220–229 | **13** |
| 230 | **1** |
| 合計 | **23**（min 202、max 230、中位數 221） |

**逐格心算一次都沒用**，每改一次 note 就重跑一次腳本
（`/tmp/.../scratchpad/chk-c166-a-hooks.mjs`，同時檢 hook 加權、前四字互異、禁語、句末標點、否定句、千分位、key 順序）。
⚠ **實測再次證實「上一批的係數不可繼承」**：本批的專名密度比 c-165 a 高（大量拉丁字母人名與盤名，`Array.from` 一字一格不打折），
**第一版草稿全部在 245–313 之間、超標 15–36%**，全部是靠整格捨去壓下來的，不是靠字句潤飾。

### 第 2403 條：**整格捨去清單（在鉤子層就砍掉，不留給寫作層）**

`hook-base.md`：「算不下就在鉤子層整格捨去，不要留給寫作層砍」。本批 23 張**每一張都有捨去**，逐張記錄：

| 卡 | 整格捨去的項目 |
|---|---|
| `Arturo O'Farrill《Legacies》` | 獨奏／三重奏對應的兩處錄音地點；翻奏原作者名單（Hancock／Monk／Rollins／Powell／Bley）；貝斯手 Liany Mateo；混音與母帶工序；**「前一張才是首作」那句身分指派**（第 1732 條只是禁序數，不寫身分關係也不違規） |
| `Chris Botti《Vol. 1》` | 三張參照模型（《Kind of Blue》等）；日版第 11 軌〈Milestones〉；年度耶誕駐店檔期；〈Fix You〉是 Coldplay 的指派句；錄音室與母帶；**合作名單整格不寫**（見第 2405 條） |
| `Dave McMurray《Grateful Deadication 2》` | 三位客座（Jamey Johnson／Oteil Burbridge／Bob James）；底特律固定班底六人；1981 年 Was (Not Was) 的淵源；紐約時報對前作的評語；混音與母帶 |
| `Kendrick Scott…《Corridors》` | 委託人 Rio Sakairi 的名字；九個曲名連成門與走廊的敘事；他對兩位夥伴的人物評語；錄音室工序；美版灰膠限量 |
| `Walter Smith III《return to casual》` | 樂隊四人名單；側手資歷名單；In Common 計畫；〈River Styx〉的五重奏編制；Village Vanguard 首度領班駐演 |
| `Erik Truffaz《Rollin'》` | **配樂原作者整格名單**（Nino Rota／Michel Magne／John Barry／Morricone 等）；歌手 Camélia Jordana；解說執筆 Arnaud Robert；1991 年 Prix Special；全碟三十三分鐘；樂隊四人 |
| `Erik Truffaz《Clap!》` | 八軌的作者名單；Stone Jack Jones 的人聲吉他二重奏；2015 年之後的鼓手更替；解說與雙語；Discogs 的 Stage & Screen 分類 |
| `Gregory Porter《Christmas Wish》` | Stevie Wonder〈Someday at Christmas〉；製作人 Troy Miller 與樂隊七人；Sear Sound 與 Abbey Road 第一錄音室的兩地錄音；〈Everything's Not Lost〉的題旨引言；Royal Albert Hall 與 Kennedy Center 行程；他個人的兩座葛萊美 |
| `Norah Jones《Playing Along》` | 十二組搭檔中的九組；曲目與搭檔的對應表；她的動機引言；後製團隊；累計九座葛萊美（研究層已標與本碟無關） |
| `Joe Chambers《Dance Kobina》` | 六〇年代側手名單的其餘六張碟；共同製作人 Andrés Vial 與同名曲的作者身分；〈Power to the People〉與 Joe Henderson 的關係；剛果打擊樂手 Elli Miller Maboungou；混音與母帶 |
| `Harold López-Nussa《Timba a la Americana》` | 樂隊名單（Grégoire Maret／Luques Curtis／弟弟 Ruy Adrián）；2005 年蒙特勒冠軍；《Ninety Miles》；danzón 的馬坦薩斯來歷與 mambo 一格；〈Tumba la Timba〉的挑釁說法；美國巡演 |
| `Norah Jones《…Allaire Studios》` | 母體專輯與 Danger Mouse 的合作背景；她兩手空空進錄音室那句；〈Miriam〉；線上直播的兩位共同製作人；**Gus Seyffert 十年前參與過母體錄音那一層**（最後被預算擠掉） |
| `Meshell Ndegeocello《The Omnichord Real Book》` | 製作人 Josh Johnson；〈Clear Water〉與〈The 5th Dimension〉；末軌 Oliver Lake 的編曲；日版第 19 軌；她承接母親那份鬱的引言後半 |
| `Cautious Clay《KARPEH》` | 舅舅 Kai Eckhardt；長笛老師 Greg Pattillo；大學主修與 Soundcloud 出身；〈Yesterday's Price〉；〈Cold War〉被《London Boy》取用；Newport 演出 |
| `山中千尋《Dolce Vita》` | Shorter 曲目的逐首列舉；各軌樂手分工與 Fender Rhodes／B-3 的用法；限定盤與 2LP 的規格與品番；發行者與 SHM-CD 載體 |
| `Aaron Parks《Little Big III》` | 樂團三人名單；〈Sports〉與 Greg Tuohey；紐約時報評語；四十歲與身心狀態那一段；三首先行單曲的時程；巡演 |
| `Ron Miles《Old Main Chapel》` | Jason Moran 對那一晚的描述；解說五位執筆者；紐約時報對他音色的描述；生平與學歷；第 61 屆葛萊美入圍；《Rainbow Sign》；2021 年 Village Vanguard 那場 |
| `Nduduzo Makhathini《uNomkhubulwane》` | 三重奏兩位樂手；〈Omnyama〉的吟誦與吸氣音；〈Izinkonjana〉；《Modes of Communication》與紐約時報的選評；聽眾定位那串名字 |
| `Mark Knopfler《One Deep River》` | 節奏組與和聲人聲四人；十二軌曲名；盒裝的徽章、匹克與插頁；載體分佈（卡帶／Blu-ray）；版權公司 Will D. Side |
| `Ethan Iverson《Technically Acceptable》` | 〈Killing Me Softly With His Song〉；Jaki Byard；〈Conundrum〉與〈Who Are You, Really?〉；The Bad Plus；《Every Note Is True》與 Jack DeJohnette 的世代對照；Village Vanguard 檔期；**「用現代手法馴服古舊曲式」整格** |
| `Charles Lloyd《The Sky…》` | 六首新作的曲名；〈Defiant, Tender Warrior〉與〈Monk's Dance〉；Booker Little 的兩段引言；Big Ears 發片演出；錄音室與母帶；〈Balm in Gilead〉與〈Lift Every Voice〉的公版狀態；**「新舊各半」的結構句** |
| `Julian Lage《Speak to Me》` | Joe Henry 的履歷與他自己的引言；Lage 形容他「罩了一層力場」那句；〈Nothing Happens Here〉；色膠版 bonus track〈Cars/Colors〉；他同期的客座紀錄 |

⚠ **捨去的原則**：先砍**名單型**（三人以上的並列人名，每格 30–55 字元、資訊密度最低），
再砍**與主故事鏈無關的第二層軼事**，最後才動主故事鏈上的格。**沒有任何一張是靠縮短句子解決的。**

### 第 2404 條（⚠ **給 b 組看的那張表**）：**骨架歸屬——11 張，以輸出檔為準**

⚠ **本表是對 `desc-tools/batches/hooks/c166-hooks-a.json` 當下版本程式化掃出來的**
（`note.includes('這條骨架全批只走本張。')`），**不是手抄**——第 1802-B 條：c-165 就是因為 rulings 的表與檔案不一致（表八條、檔案九張），害 b 組差點兩張一起撞。

| # | 卡 | 擁有的骨架（一句話，給 b 組判斷用） |
|---:|---|---|
| 1 | `Kendrick Scott, Reuben Rogers, Walter Smith III《Corridors》` | 以「從既有編制裡逐件刪掉樂器」定義這張碟 |
| 2 | `Walter Smith III《return to casual》` | 碟名與自己多年前另一張碟的碟名成對話 |
| 3 | `Erik Truffaz《Rollin'》` | 本國樂手回頭翻外國前輩替本國電影寫的曲子 |
| 4 | `Gregory Porter《Christmas Wish》` | 做某個類型的專輯卻刻意避開該類型最熱門的曲目 |
| 5 | `Norah Jones《Playing Along》` | 廣播／節目裡的合奏被集結成一張唱片 |
| 6 | `Joe Chambers《Dance Kobina》` | 當年回絕了廠牌創辦人的邀約，數十年後才以自己的名字回來 |
| 7 | `Norah Jones《Little Broken Hearts: Live at Allaire Studios》` | 多年後把一整張舊專輯同曲同序從頭演一次 |
| 8 | `Cautious Clay《KARPEH》` | 碟名是本名姓氏，家族口述錄音把全碟切成段落 |
| 9 | `山中千尋《Dolce Vita》` | 整張碟獻給同一個月過世的一位逝者，末兩軌另獻給第二位 |
| 10 | `Nduduzo Makhathini《uNomkhubulwane》` | 儀式中得到的一首歌長成一整套多樂章組曲 |
| 11 | `Ethan Iverson《Technically Acceptable》` | 碟名是作者對自己的評語 |

**其餘 12 張的 `note` 一字不寫、也不點名讓給了誰**（`hook-base.md` 雲端註記第 3 點）——
實掃確認這 12 張的 `note` 裡沒有任何別張卡的盤名，`qa-batch` 的 `互指?` 因此 0 行。

⚠ **本棒刻意沒有claim的兩條，理由記下來給 b 組**：

1. **`Harold López-Nussa《Timba a la Americana》` 的「離鄉驅動整張碟」不 claim**——
   b 組同批有同一位藝人的《Nueva Timba》(2025)，若 a 把這條鎖住，b 很可能整張無角可切。
   **可逆、不卡線，依裁定權下放判準 2 自己決定，不上呈。**（為此把該卡的 note 再砍 15 字元補回預算。）
2. **`Ron Miles《Old Main Chapel》` 的「多年前的庫藏錄音今天才首次發行」不 claim**——
   b 組第 1996 條已裁定該組有**三張**庫藏／現場盤同判 (甲)（`Wayne Shorter《Celebration, Volume 1 (Live)》`／
   `McCoy Tyner & Joe Henderson《Forces of Nature: Live at Slugs'》`／`Horace Silver《Silver in Seattle》`）。
   **一條骨架只能歸一張，但 b 組有三張非用不可**——a 若鎖住，等於一次卡死三張。
   本卡改走「**錄音當晚與隔天另一份錄音的時間關係**」這條更窄的線（hook 逐字不提「擱置多年」），
   **但不 claim**，把整個庫藏敘事的空間留給 b。

### 第 2405 條：**研究層推翻策展層的三處，在鉤子層的落點**

派工信第三節第 1 點列的三處，逐處交代處置（以研究層為準，不回頭引策展層）：

1. **`Chris Botti《Vol. 1》` 的合作名單沒有 Steven Tyler** —— **整格不寫**。
   理由不只是預算：`hook-base.md` 的「hook 不得否定讀者沒有的前提」與「note 一律用正面表述」兩條都要求
   **不得把「更正了什麼」表演給讀者看**。名單本身不在主故事鏈上，**最乾淨的處置是一個名字都不提**——
   note 裡沒有「名單」二字，寫作層沒有任何素材可以把 Steven Tyler 寫回去。
2. **`Arturo O'Farrill《Legacies》` 的〈Obsession〉是 Pedro Flores 的** —— **逐字寫進 note 的第三格**
   （「〈Obsession〉出自波多黎各作曲家 Pedro Flores」），**而那一串爵士名家的名單整格捨去**。
   這樣寫作層既拿不到錯誤的歸屬，也拿得到正確的那一條。研究層 `notes` 另記〈Obsession〉折鍵撞
   `EXO《OBSESSION》(2019)`，**帶作者名正好同時解掉撞陳列的引用要求**。
3. **`Chris Botti《Vol. 1》` 的〈Paris〉是全碟唯一人聲曲** —— **逐字寫進 note**（「全碟唯一的人聲曲是〈Paris〉」）。

**研究層另補的三處（策展層沒查）也逐一落地**：`Dave McMurray` 的 Clubhouse Studios／Elliot Scheiner 進了 hook 與 note 的第二格、Ice Nine 進了第四格；
`Ron Miles` 的製作人 Hans Wendl 進了 note 的末格（五位解說執筆者整格捨去）；
⚠ **`山中千尋《Dolce Vita》` 的 Wayne Shorter 致敬盤＋末兩軌另悼坂本龍一，整條就是本卡的 hook 與主故事鏈**——hook 逐字「整張碟獻給 3 月過世的那個人，末兩軌獻給另一個。」，note 四格全部在講這件事。

**獎項六筆照研究層第 2248 條原樣寫、一筆沒有重算**：
`Meshell《The Omnichord Real Book》` 寫「第 66 屆⋯最佳另類爵士專輯，而且是該獎項的首屆得主」（得獎）；
`Julian Lage《Speak to Me》` 與 `Gregory Porter《Christmas Wish》` 各寫「第 67 屆⋯寫成入圍」；
`Mark Knopfler《One Deep River》` 逐字寫「入圍單位寫成〈Ahead of the Game〉這首歌」（**單位是歌不是專輯**）；
`Ron Miles` 與 `Chris Botti` 的生涯獎項**整格捨去**（兩筆都與本碟無關，且都吃 40 字元以上）。
**兩筆累計型（O'Farrill 8 座、Norah Jones 9 座）一格未寫。**

### 第 2406 條：**`qa-batch` 結果與 `互指?` 判讀**

`cd desc-tools && node qa-batch.mjs hooks c166` 的輸出逐字只有四行：

```
（略過 qa-check-hooks.mjs：本 repo 無此檔。字數／禁語／開頭雷同／分數星等
  請改跑 node chk-hook-crossgroup.mjs c166，本階段只做事實對照與字元掃描。）
⚠ b 缺 hook 檔
總標記 1
```

- **a 組旗標 0**：簡體字 0、千分位逗號 0、`key` 與卡單不一致 0、事實對照 0。
- **`互指?` 0 行**（`grep -c 互指` 逐字回 `0`）。**沒有可判讀的行**，成因是第 2404 條的處置：讓出骨架的 12 張一字不寫、也不點名，`note` 裡零個別張卡的盤名。**這正是 `hook-base.md` 雲端註記第 3 點要達到的效果。**
- **唯一的 `總標記 1` 是 `⚠ b 缺 hook 檔`**——b 組的 `c166-hooks-b.json` 尚未產出，**該檔在本棒的禁碰清單上**，留給 b 組收尾（與第 2252 條第 3 點同形）。

⚠ **`qa-batch.mjs` 在 hooks 階段自己會說它不做字數／禁語／開頭雷同／分數星等**，要另跑 `chk-hook-crossgroup.mjs`。
本棒兩支都跑了：`node chk-hook-crossgroup.mjs c166` 逐字回 `c166｜1 組｜23 張`／`hook 加權 16–25.5｜note 203–232`／`✓ 全部通過`。
**建議主線在 hook 層派工信的第四節第 3 點把這一支一併寫進去**（與第 2250 條對研究層派工信的同型建議）。

另外自寫的機器自檢（不靠眼睛掃）逐項 0 筆：hook 加權 >50、note >350、預算 >230、句末缺全形標點、
以「這張專輯」開頭、hook 出現你我、七個禁語、引號整句包裹、note 出現否定句（不得／禁／查無／未能查證／卡池標錯）、
分數星等、千分位逗號、**開頭前四字相撞**（23 組前四字兩兩互異）、中英數之間缺半形空格（全檔 0 處）、
`key` 與研究稿順序不符。

### 第 2407 條：**本派工信與 `hook-base.md`／既有裁定牴觸之處——硬牴觸 0，需要記錄的 3 處**

1. **派工信第四節第 3 點「收工前 `node qa-batch.mjs hooks c166`（⋯`互指?` 逐筆人工判讀，第 1763-B 條）」**——
   **不是牴觸，但實況是該腳本在 hooks 階段只做事實對照與字元掃描**，並自己提示要改跑 `chk-hook-crossgroup.mjs`。
   `互指?` 本批 0 行（見第 2406 條）。**派工信少給了一支必跑的腳本。**
2. **派工信第三節第 4 點「`Erik Truffaz` 兩張的反同構切角，研究層已在第 2251 條分配好，照它走」**——
   照走了，但**第 2251 條給《Rollin'》的「翻奏譜系」切角裡那一整排配樂原作者名單，在 230 字元預算下放不進去**。
   依 `hook-base.md`「算不下就在鉤子層整格捨去」，本棒**整格捨去名單**，只留〈Ascenseur pour l'échafaud〉↔ Miles Davis ↔ 1958 年 Louis Malle 那一條譜系線（**那也是第 1975 條唯一撞 apex 的一處，必須帶翻奏交代**）。
   《Clap!》則照第 2251 條走「版本差異」（CD 與黑膠第 6／8 軌對調）＋「收起節奏實驗」。
   **兩張共用的生平段只寫在《Rollin'》**，《Clap!》一格未寫。**這不是牴觸，是預算與切角的取捨，記錄在案。**
3. **派工信第三節第 1 點把三處研究層更正描述成「以研究層為準」**——成立，但其中
   **`Chris Botti` 那一處是「排除性更正」**（名單裡沒有某人）。`hook-base.md`「hook 不得否定讀者沒有的前提」與
   「note 一律用正面表述」兩條合起來的結論是**不能寫成「名單裡沒有 X」**，
   **正確處置是整格不寫**（第 2405 條第 1 點）。**派工信沒寫錯，但字面照抄會踩校對痕跡。**

**派工信寫對、本棒實測確認的**：第三節第 5 點「③ 來源層整批落空 3 張」對鉤子層無影響（那三張的 note 全部取自研究稿 `facts`，本棒未上網補查、未碰 `previews.json`）；
第四節第 4 點「號段 2401–2440」實測未與任何既有條號相撞（本檔既有最大號是 b 組研究層的 2307）。

### 第 2408 條：號段結餘

**本節用掉 2401–2407，2408–2440 未用。**
**b 組鉤子層可逐張讀 `desc-tools/batches/hooks/c166-hooks-a.json` 做反同構**，
骨架歸屬以**第 2404 條的表**為準，而該表是對輸出檔程式化掃出來的，與檔案逐張一致（11 張）。

---

## c-166 b 組（22 筆）**鉤子層**裁定　號段 2441–2480

（本節一律 append 於檔末，不整檔覆寫、不碰既有的 1960–1987／1990–2007／2246–2255／2296–2307／2401–2408——第 1743-B(四)／第 1806-B 條。
開工前本檔已有 1350 行、五節，本棒只在檔末追加，並在動筆前**整檔讀過**，不只讀號段——第 1794-B 條。
⚠ **`batch-progress/c167/rulings.md` 的 2441–2490 是另一支代理的，本棒一字未碰。**）

### 第 2441 條（交件總表）

| 項目 | 值 |
|---|---|
| 產出檔 | `desc-tools/batches/hooks/c166-hooks-b.json` |
| 張數 | **22／22**，`key` 逐字複製自 `desc-tools/batches/research/c166-b.json`、**順序與研究稿完全相同**（21 個 `desc2:` ＋ 1 個 `desc4:`） |
| 與卡單比對 | `c166-cards.json` 的 `group === "b"` 22 張，**逐筆同序、缺 0 多 0** |
| `hook` 加權字元（英數 0.5） | **16–25**，全部 ≤50 |
| `note` 原始字元（`Array.from`） | **214–237**，全部 ≤350 |
| **`note` 字元預算**（公式見第 2442 條） | **206–229，中位數 218.5，0 筆超標** |
| 骨架歸屬 | **22 張全部**寫「這條骨架全批只走本張。」，**0 張讓出**（見第 2445 條，表由程式實掃輸出檔產生） |
| `node qa-batch.mjs hooks c166` | **`全部通過 ✓`**（a＋b 兩組旗標 0）；`互指?` **0 行** |
| `node chk-hook-crossgroup.mjs c166` | **`c166｜2 組｜45 張`／`hook 加權 16–25.5｜note 203–237`／`✓ 全部通過`** |
| 用掉的號段 | **2441–2453**（2454–2480 未用） |

⚠ **工作區當下版本才是交件版**（第 1803-B 條，本線已四次）：見第 2452 條——
**`main` 上 `84b9acb`「checkpoint: c166 鉤子 b 中途存檔」只有 15 筆**，那是本棒跑到一半時被主線撈去的中途檔，**不是交件版**。

### 第 2442 條：**本棒實際用的字元預算公式（逐字）**，以及**倒回去量 a 組 23 張的結果**

照 `hook-base.md` 雲端註記第 2 點（第 1793-B 條）寫死的那條，一字未改、未自創係數、未沿用上一批的任何比例：

```
預算 = Array.from(hook).length + Array.from(note).length
       − Array.from('主故事：').length              //  固定 4
       − (note.match(/→/g)||[]).length              //  每個箭號扣 1
       − Array.from('正文只寫上列各項。').length     //  9（有才扣）
       − Array.from('這條骨架全批只走本張。').length  // 11（有才扣）
```

**只扣這四樣，其餘一律算**：年份指定（「發行年寫 2024 年」）、發行日指定、軌數指定、
引用限制（「引用盤名時帶掛名」）、克制指示（「追念的部分克制地寫」）、
獎項寫法指定（「第 68 屆⋯寫成入圍」）、曲風指定（「曲風寫爵士與嘻哈兩類」）**全部計入**。

⚠ **開工先把這把尺倒回去量 `c166-hooks-a.json` 的 23 張**（第 2402 條要求的對尺動作），逐格結果：

```
202,206,206,208,210,217,219,219,220,220,220,221,221,222,223,223,224,226,227,228,229,229,230
```

**min 202／max 230／中位數 221** ——**與 a 組第 2401／2402 條回報的「202–230、中位數 221」逐字相同，兩組確認同尺**，
hook 加權 16–25.5、note 203–232 亦逐字相符。**對上之後才開始量本組。**

⚠ **順帶更正 a 組第 2402 條分佈表的一處分格（不影響同尺結論，也不是尺的問題）**：
該表記 `<210` 三張並列出「202／206／208」，**實際 `<210` 是四張——206 有兩張**（`Chris Botti` 與 `Nduduzo Makhathini`）。
連帶 `210–219` 是 4 張（210／217／219／219）、`220–229` 是 14 張。**四格實況 4-4-14-1，不是回報的 3-6-13-1。**
**a 組的 min／max／中位數三個數字全對，錯的只是手動歸格時漏數了一個重複值**；本條記下，讓主線知道兩組的尺一致。

### 第 2443 條：**本組 22 張的實測分佈**

| 區間 | 張數 |
|---|---:|
| <210 | **1**（206） |
| 210–219 | **11** |
| 220–229 | **10** |
| 230 | **0** |
| 合計 | **22**（min 206、max 229、中位數 218.5） |

逐格：`206,211,212,213,213,214,214,216,217,217,218,219,220,220,221,223,224,225,226,227,229,229`。

**逐格心算一次都沒用**，每改一次 note 就重跑一次腳本
（scratchpad 的 `c166b-build.mjs`／`c166b-selfcheck.mjs`，同時檢 hook 加權、note 上限、跨組前四字互異、
禁語、句末標點、hook 否定句、引號整句包裹、校對痕跡、分數星等、千分位、半形逗號、簡體字、日文新字體、
中英數之間半形空格、`key` 與研究稿及卡單同序）。

⚠ **「本批專名密度高，先假設你也會超標」——派工信這句對了一半。**
第一版草稿 22 張裡 **9 張超標（233–275，超標 1–20%）、13 張沒有超標**，
**與 a 組「23 張全部落在 245–313」的情形不同**。原因可辨識：本組有 8 張的主故事鏈是**引句或單一場景**
（Shorter 的命名、Wilkins 的盤名由來、Charlap 的樓梯間、Cline 的封城、Branford 的耳機），
**引句型的格子字元密度低於名單型**。**這再次說明上一批（甚至同批另一組）的係數不可繼承，只能實測。**

### 第 2444 條：**整格捨去清單（在鉤子層就砍掉，不留給寫作層）**

`hook-base.md`：「算不下就在鉤子層整格捨去」。第一版超標的 9 張逐張記錄，**沒有一張是靠潤飾句子解決的**：

| 卡 | 整格捨去的項目 |
|---|---|
| `Bill Frisell《Orchestras》` | 〈Lush Life〉〈We Shall Overcome〉兩個軌名與隨之而來的「引用軌名時帶掛名」指示（**軌名整格不寫，第 2005 條的引用要求自然消解**）；三重奏三人名單；Gibbs 的「開門的人」引句後半 |
| `Blue Lab Beats《Blue Eclipse》` | 客座名單（Daley／Kojey Radical／Camilla George 等十餘人）；版權歸自家公司與廠牌鏈第一格；封面設計與攝影 |
| `Meshell Ndegeocello《No More Water》` | **「發行日訂在 Baldwin 百年誕辰當天」整格**（見第 2446 條第 3 點，這條骨架 a 組已鎖住）；《The Fire Next Time》改變人生那句；口白與內頁文案的兩位執筆者；Audre Lorde 的六個自稱 |
| `Walter Smith III《three of us…》` | 〈610 Loop〉〈Montrose Nocturne〉〈Lone Star〉的地名串；〈Office Party Music〉與影集那場戲；〈Misanthrope's Hymn〉的單字考；三人同一所高中；盤名是翻開筆記本第一頁抄來的那層（**讓給第 2446 條的分工**） |
| `McCoy Tyner & Joe Henderson《Forces of Nature》` | **兩人 1960 年代互相參與對方 Blue Note 錄音的整格履歷**（〈In 'n Out〉的引用指示已承載同一層關係）；原始錄音者 Orville O'Brien；48 頁小冊與七位受訪樂手；Nate Chinen 的定位引句 |
| `Bill Charlap Trio《And Then Again》` | 八首曲目的作者名單（Kern／Brubeck／Van Heusen／Youmans／Gershwin／Victor Young）；兩位 Washington 同姓無親屬關係；他的父母與接替 Gerry Mulligan 席位的履歷；Vanguard「房間形狀」那段引句 |
| `Branford Marsalis Quartet《Belonging》` | 六首曲名；四重奏四人名單與各自入團年份；「室內樂團」那句定位；疫情打斷再重拾那一拍（**疫情骨架歸 `Nels Cline`**） |
| `Charles Lloyd…《Figure in Blue》` | 〈The Ghost of Lady Day〉與 Billie Holiday；**〈Hina Hanta〉與曾祖母 Sallie Sunflower Whitecloud 的 Choctaw 整段**；Moran 與 Sewell 的兩段人物評語；Sangam 三重奏譜系 |
| `Horace Silver《Silver in Seattle》` | **〈Song for My Father〉與〈The Cape Verdean Blues〉兩個軌名，連同第 2005 條要求的「寫明是 1965 年現場版」指示**（軌名整格不寫＋`正文只寫上列各項。`，下游不會寫到那兩軌）；Bob Blumenthal 與 Don Was 的兩段引句；鼓手 Roger Humphries 的回憶；小冊規格 |

⚠ **捨去的原則**（沿用 a 組第 2403 條，實測同樣有效）：先砍**名單型**（三人以上並列人名，每格 30–55 字元），
再砍**第二層軼事**，最後才動主故事鏈。
⚠ **本組多出一種 a 組沒有的捨去手法**：**把軌名整格拿掉，第 2005 條「引用這個軌名要帶掛名／寫明是現場版」的指示就一起消失**——
`note` 有 `正文只寫上列各項。`，寫作層不會寫到沒列出來的軌名。**這比留著軌名再加一句指示便宜 30–45 字元**（本組用了兩次：`Bill Frisell`、`Horace Silver`）。
**留著軌名的兩處是刻意的**：`McCoy Tyner & Joe Henderson` 的〈In 'n Out〉（它同時是同碟聯名者自己 1965 年專輯的名字，是本卡的賣點）、
`Branford Marsalis Quartet` 的盤名 `Belonging`（第 2001 條要求帶掛名，盤名砍不掉）。

### 第 2445 條：**骨架歸屬——b 組 22 張全部 claim，表由程式實掃輸出檔產生**

⚠ **本表是對 `desc-tools/batches/hooks/c166-hooks-b.json` 當下版本程式化掃出來的**
（`note.includes('這條骨架全批只走本張。')`），**不是手打**——第 1802-B 條。

| # | 卡 | 擁有的骨架（一句話） |
|---:|---|---|
| 1 | `Melissa Aldana《Echoes of the Inner Prophet》` | 父子兩代參加同一項比賽，一個止於準決賽、一個奪冠 |
| 2 | `Bill Frisell《Orchestras》` | 慣用的小編制被整個放進管弦樂團，編曲者是他半世紀的老師 |
| 3 | `Blue Lab Beats《Blue Eclipse》` | 全碟幾乎每一軌都帶客座，曲名連成一條旅行路線 |
| 4 | `Meshell Ndegeocello《No More Water》` | 覺得致敬對象的立場有缺口，於是在計畫裡另外請進一個聲音 |
| 5 | `Walter Smith III《three of us…》` | 曲名指向家鄉一處早已收掉的場所 |
| 6 | `Wayne Shorter《Celebration, Volume 1 (Live)》` | 逝者生前親自挑選並替自己的身後發行系列命名 |
| 7 | `Immanuel Wilkins《Blues Blood》` | 盤名保留了六十年前一位陌生人說過的一句話 |
| 8 | `McCoy Tyner & Joe Henderson《Forces of Nature》` | 一整晚只演了五首，單曲長度撐滿兩張碟 |
| 9 | `Bill Charlap Trio《And Then Again》` | 童年只能在門外偷聽的場地，後來成為他錄現場的地方 |
| 10 | `Aaron Parks《By All Means》` | 領班主動退到伴奏的位置，為新來的管樂手讓路 |
| 11 | `Nels Cline《Consentrik Quartet》` | 委創與補助都到手了，接著疫情把一切打斷 |
| 12 | `山中千尋《Ooh-La-La》` | 一整張外國曲目裡混進一首本國流行歌 |
| 13 | `ARTEMIS《Arboresque》` | 為某個節日臨時湊起來的團，多年後縮成固定編制 |
| 14 | `Gerald Clayton《Ones & Twos》` | 整張碟被設計成 A 面與 B 面可以同時播放 |
| 15 | `Brandon Woody《For the Love of It All》` | 開場數十秒做成走調的收音機，把聽者丟回某年某地 |
| 16 | `Branford Marsalis Quartet《Belonging》` | 同事在飛機上把耳機硬扣到他頭上，成為他的啟蒙 |
| 17 | `Johnathan Blake《My Life Matters》` | 碟上大部分曲名由委創單位的藝術總監聽完音樂後命名 |
| 18 | `Joshua Redman《Words Fall Short》` | 兩把同型樂器同台，他先把它定成對話而非較勁 |
| 19 | `Harold López-Nussa《Nueva Timba》` | 四代家人的作品與手藝擠進同一張唱片 |
| 20 | `Charles Lloyd…《Figure in Blue》` | 進錄音室的第一件事是吹一首給剛過世的老搭檔 |
| 21 | `Dave McMurray《I LOVE LIFE even when I'm hurting》` | 一首翻唱等了三十年，等的是心裡那個歌手長大 |
| 22 | `Horace Silver《Silver in Seattle》` | 多年前的庫藏錄音今天才首發（**a 組讓出的那條，見第 2446 條**） |

**b 組讓出 0 張。** 22 張的骨架兩兩互異，且與 a 組第 2404 條的 11 條無一重疊——
**claim 在預算上是零成本（公式會把那 11 個字扣掉），所以只要骨架真的獨有就該寫，寫了寫作層才知道不能挪用。**

⚠ **a 組那張表本棒自己實掃覆核過**：對 `c166-hooks-a.json` 跑同一段程式，
**逐字回 11 張，與第 2404 條的表逐列相同**（`Corridors`／`return to casual`／`Rollin'`／`Christmas Wish`／
`Playing Along`／`Dance Kobina`／`Little Broken Hearts: Live at Allaire Studios`／`KARPEH`／`Dolce Vita`／
`uNomkhubulwane`／`Technically Acceptable`）。**表與檔一致，c-165 第 1802-B 條那種落差本批沒有發生。**

### 第 2446 條：**a 組刻意讓出的兩條骨架，逐條交代處置**

1. **「多年前的庫藏錄音今天才首發」（a 組讓出 `Ron Miles《Old Main Chapel》`）→ 歸 `Horace Silver《Silver in Seattle》`（第 22 張）。**
   理由：本組三張 (甲) 裡，只有這張的**六十年時間差本身就是主故事**（1965 年錄、2025 年發），
   另兩張各有更窄、更具體的骨架可走（見第 2447 條）。**a 組的讓出沒有浪費。**
2. **「離鄉驅動整張碟」（a 組讓出 `Harold López-Nussa《Timba a la Americana》`）→ b 組主動不用，最後由 0 張 claim。**
   本棒把《Nueva Timba》的骨架定在**四代家人**（祖父的畫作當封面、叔叔的曲子、弟弟的木箱鼓、女兒的小提琴），
   那比「離鄉」窄、也更是這張碟獨有的形狀；**移居法國只當主故事鏈的第一格背景事實，不構成骨架**（第 1779-B 條：反同構限制的是骨架，不是題材）。
   **結果是 a、b 兩張 López-Nussa 的 note 都提到移居、都沒有 claim 它**——**這正是讓出條款要的效果，不是漏網。**
   （判準 2「可逆」：這是卡單值層級的取捨，本棒自行定案，不上呈。）
3. ⚠ **另有一條 a 組已鎖住、本組險些撞上的**：a 組 `Charles Lloyd《The Sky…》` 的 hook 是「發行日訂在 3 月 15 日，那天他滿八十六歲。」
   ——**「發行日訂在某人的生日／誕辰當天」這條骨架 a 組雖未 claim，但它已經是該卡的 hook 本體**。
   本組 `Meshell Ndegeocello《No More Water》` 的發行日正好是 James Baldwin 的百年誕辰，
   **本棒整格捨去該事實、改走「她認為致敬對象的女性主義還得再練，於是另請一個聲音」**。
   ⚠ **給後批的一句**：**a 組沒 claim 的骨架不等於可以用**——**hook 本體用掉的形狀也要當成已占用**，
   逐張讀完 a 組的 23 個 hook 才看得出來（第 1764-B 條要求逐張讀，本條是它的具體收益）。

### 第 2447 條：**第 1996 條的三張 (甲) 庫藏／現場盤，三個切入面向逐張分開（派工信第四節第 3 點）**

派工信要求「三張要各自不同的切入面向，不要三張都講母帶被找出來」。實際分配：

| 卡 | 切入面向 | hook 的落點 | 母帶／庫藏那一層擺在哪 |
|---|---|---|---|
| `Wayne Shorter《Celebration, Volume 1 (Live)》` | **逝者生前親自挑片並替系列命名**（《Unidentified Flying Objects》→《Celebration》） | 命名 | **整格不寫**；只留「工作人員把未發行錄音寄給他挑選」這個動作 |
| `McCoy Tyner & Joe Henderson《Forces of Nature》` | **演奏本身**：一整晚只演五首，單曲二十六與二十八分鐘，撐滿兩張碟 | 曲長 | **主故事鏈第三格、一句話**（母帶出自鼓手自己的收藏），不展開 |
| `Horace Silver《Silver in Seattle》` | **錄音的來歷**：錄它的是當地電台的主持人兼工程師，母帶是廣播規格 | 錄音者的身分 | **就是主故事鏈本身**（第 2446 條把庫藏骨架歸這張） |

**三張的 note 沒有任何共用的句構**；三張都沒有出現「塵封」「擱置」「終於出土」這類寫法
（`chk-hook-crossgroup` 的 `SKELETON` 掃描表在 45 張裡對 `母帶擱`／`塵封多年`／`多年後才發行` 命中 **1 次**，
就是 a 組 `Ron Miles` 那一張，**b 組 0 次，因此不構成「出現在多張」**）。

### 第 2448 條：**研究層推翻策展層那一處在鉤子層的落點，以及獎項五筆照抄不重算**

1. **`Meshell Ndegeocello《No More Water》` 的第 67 屆葛萊美是「得獎」不是入圍**（研究層第 2297 條）——
   **note 逐字寫成「第 67 屆葛萊美最佳另類爵士專輯寫成得獎。」**，不引策展層（策展層 `why`／`risk` 根本沒寫獎項）。
2. **同批另四張全部入圍未得獎，照研究層第 2298 條原樣寫、一筆沒有重算，也沒有去查得主是誰**：
   `Bill Frisell《Orchestras》`（第 67 屆最佳當代器樂）、`Immanuel Wilkins《Blues Blood》`（第 68 屆最佳另類爵士）、
   `Branford Marsalis Quartet《Belonging》`（第 68 屆最佳爵士器樂）、`Gerald Clayton《Ones & Twos》`（第 68 屆最佳當代器樂）
   ——**四張的 note 都只寫「寫成入圍」，得主名字整格不寫**（得主與本碟無關，且每個名字吃 15–25 字元）。
3. **`Blue Lab Beats` 的獎項整格不寫**：第 2299 條已裁定只能寫「他們參與製作的那張專輯得獎」這一層，
   **那層要交代清楚需要 40 字元以上（掛名藝人、專輯名、屆次、類別缺一不可，少一樣就會被讀成雙人組自己得獎）**，
   **在 230 預算下放不進去，整格捨去**。改寫他談簽進廠牌的那句引言。
4. **研究層另補的三處逐一落地**：`Walter Smith III` 的〈Point of Many Returns〉／Sam Rivers 1967 年《Contours》
   **兩層併成一格寫進 note 末格**（這是 Blue Note 現役藝人翻 Blue Note 舊作，依廠牌規則本來就該寫）；
   `Horace Silver` 的 A 面錄音日**逐字寫 8 月 12 日**（第 2303 條三比一）；
   `McCoy Tyner & Joe Henderson` 的**發行日逐字寫 2024 年 11 月 22 日**（第 2303 條）。

### 第 2449 條：**兩個東亞人名維持羅馬字，照研究層第 2302 條，未自行補漢字**

- **`Noriko Ueda`**（第 13 張 `ARTEMIS` 的低音提琴手、〈Komorebi〉的作曲者）——**note 逐字寫羅馬字**。
- **`Kazutomi Aoki`**（第 16 張日版 CD 內頁文案作者）——**整格未寫**（日版規格整格捨去），因此不生問題。
- **對照**：`山中千尋`／`筒美京平` 兩個有官方漢字頁的名字**照 base 檔寫漢字**，第 12 張的 note 兩個都用漢字。
- **第 12 張的日文原曲名〈スニーカーぶる〜す〉照研究稿原文保留**（專名例外），
  **同一格併記碟上的拉丁題名〈Sneaker Blues〉**，行文本身零個非拉丁外文字元。

### 第 2450 條：**兩支腳本的結果與 `互指?` 判讀**

`cd desc-tools && node qa-batch.mjs hooks c166` 輸出逐字三行：

```
（略過 qa-check-hooks.mjs：本 repo 無此檔。字數／禁語／開頭雷同／分數星等
  請改跑 node chk-hook-crossgroup.mjs c166，本階段只做事實對照與字元掃描。）
全部通過 ✓
```

- **b 組旗標 0**（簡體字 0、千分位逗號 0、`key` 與卡單一致、事實對照 0）；**a 組維持 0**；**總標記 0**。
  a 組第 2406 條那個 `⚠ b 缺 hook 檔` 已隨本檔產出消失。
- **`互指?` 0 行**（`node qa-batch.mjs hooks c166 | grep -c 互指` 逐字回 `0`）。
  **沒有可判讀的行**，成因是本組 22 張的 `note` 裡零個別張卡的盤名——另寫程式對 45 張卡的盤名逐一掃過 b 組 22 個 `note`，**0 命中**。
  唯一在 note 裡出現的外部盤名是 `Keith Jarrett《Belonging》`（第 16 張，`Belonging` 同時是本卡盤名）、
  `《My Song》`、`《Contours》`——**三者都不是本批任何一張卡**，不構成互指。

`node chk-hook-crossgroup.mjs c166`（**這支是必跑的**）逐字回：

```
c166｜2 組｜45 張

hook 加權 16–25.5｜note 203–237

✓ 全部通過
```

**六道全清**：跨組開頭前四字互異（45 張兩兩互異）、同構骨架關鍵詞 0 項（`母帶擱` 只有 a 組 1 張，未達「多張」）、
校對痕跡 0、分數星等 0、hook 禁語與句末標點 0、字數 0。

⚠ **`Brandon Woody` 那張的 `DownBeat` 四星評價是本組唯一踩到 `SCORE` 的素材，本棒整格不寫**
（研究稿 facts 逐字帶「四星」與整段引文）。依 hook-base「分數星等一律不得出現在 hook，也不得出現在 note 的指派句」，
**連改寫成「樂評正面」都省下來**——那張的預算已由走調收音機那條骨架填滿。

### 第 2451 條：**本派工信與 `hook-base.md`／既有裁定牴觸之處——硬牴觸 0，需要記錄的 4 處**

1. ⚠ **派工信第三節第 3 點「a 組實測預算 202–230（中位 221）」與「第一版草稿 23 張全部落在 245–313」都屬實**，
   但**推論「本批專名密度高，先假設你也會超標」只對 9／22 成立**（見第 2443 條）。**不是錯，是預期與實測不同。**
2. ⚠ **派工信第三節第 1 點說第 2404 條那張表「與檔案逐張一致」——本棒實掃覆核成立（11 張逐列相同）。**
   但**同一節第 2 點把 a 組的讓出描述成「這兩條你可以用」時，沒有提醒『a 組沒 claim 的骨架不等於可以用』**
   ——`Charles Lloyd《The Sky…》` 的「發行日訂在某人生日」雖未 claim，卻是該卡的 hook 本體，
   本組 `Meshell Ndegeocello` 差一點撞上（見第 2446 條第 3 點）。**建議主線在後批的鉤子層派工信補一句。**
3. ⚠ **派工信第五節第 5 點「只有擁有者寫、讓出的卡一字不寫」——本組讓出 0 張，22 張全 claim。**
   這與 a 組 11／23 的比例落差很大，**但不是違規**：claim 在預算公式上是零成本，判準只有「骨架是否真的獨有」。
   **本條記下比例落差的成因，免得主線以為 b 組漏了讓出的那一步。**
4. ⚠ **派工信第五節第 3 點把 `qa-batch` 的「`互指?` 逐筆人工判讀」寫成收工步驟**——
   實況是該腳本在 hooks 階段只做事實對照與字元掃描，`互指?` 本批 0 行（與 a 組第 2407 條第 1 點記的完全一樣）。
   **派工信這次已經把 `chk-hook-crossgroup.mjs` 補進來了（a 組回報主線漏給的那支），這一點已修正。**

**派工信寫對、本棒實測確認的**：第四節第 1 點的獎項更正（`Meshell` 得獎）與第 2 點的三處研究層補正（Sam Rivers 那首、
A 面錄音日 8/12、發行日 11/22）**逐條屬實且已落地**；第四節第 4 點的兩個羅馬字人名**照研究層寫、未補漢字**；
第四節第 3 點的三張 (甲) **切入面向已分開**（第 2447 條）。

### 第 2452 條（⚠ **交件狀態：工作區當下版本才是交件版**，第 1803-B 條）

本節所有數字都是對**磁碟上當下那一份** `desc-tools/batches/hooks/c166-hooks-b.json` 實跑出來的，不是中途快照。

⚠ **`main` 上已經有一個 15 筆的中途檔**：提交 `84b9acb`「checkpoint: c166 鉤子 b 中途存檔」
是主線在本棒跑到第 15 張時把工作區檔案撈去做的檢查點，**`git show HEAD:desc-tools/batches/hooks/c166-hooks-b.json` 逐字是 15 筆**。
**那不是交件版。** 實測比對：**那 15 筆與工作區當下版本逐字相同（`hook` 與 `note` 零差異），工作區另多出第 16–22 張共 7 筆。**
**交件版＝工作區的 22 筆**，請主線以工作區為準再提交一次。
（本棒依邊界規定**未 `git commit`、未 `git push`、未動 git 索引**；`git status --short` 當下逐字只有一行
` M desc-tools/batches/hooks/c166-hooks-b.json`，沒有掃到任何別的檔案。）

**未碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`previews.json`／`caa.json`／
`c166-hooks-a.json`／`batch-progress/c167/rulings.md`／其他批次的檔案。

### 第 2453 條：號段結餘

**本節用掉 2441–2453，2454–2480 未用。**
