# c-165 a 組裁定（編號 1900–1922）

本檔記錄 **c-165 a 組（`slice.json` 的 `g: "a"`，23 筆）** 策展期間的全部裁定。
**號段 1900–1929 為 a 組專用；b 組另從 1930 起，本組一條都不碰。**

- **筆數**：23（收 23、退 0）。
- **年份分布**：`slice.json` 原記 2020 十筆、2021 十三筆；**本組改判一筆（`Charles Pasi《Zebra》` 2021 → 2020）後為 2020 十一筆、2021 十二筆。**
- **曲風**：全部來自 Blue Note 線，`slice.json` 的 `genre` 欄一律 `jazz`；**實判 `['jazz']` 12 張、`['jazz','pop']` 5 張、`['jazz','world']` 2 張、`['jazz','blues']`／`['jazz','hiphop']`／`['jazz','soul']` 各 1 張、`['soul','pop']` 1 張（本組唯一不含 jazz 的卡）。**
- **沿用的判準**：`batch-progress/c158`～`c162/rulings.md`、`c163/rulings.md` 與 **`c163/rulings-mainline.md`（第 1718–1733 條）**，條文一字未改。
  `c164/rulings.md` 只讀不寫（該檔由 c-164 兩組同時寫入）。
- **正本**：`ALBUM_ONBOARDING.md`／`REMOTE_RUNBOOK.md`／`CLAUDE.md` 三份開工前已完整讀過；**本組發現派工信與正本／既有裁定牴觸三處，逐條寫在第 1920 條。**

---

## 第 1900 條（交件總表）

| 項目 | 數 |
|---|---:|
| 候選（`g: "a"`） | **23** |
| **收** | **23** |
| **退** | **0** |
| **退貨率** | **0%** |
| 年份改判 | **1**（`Charles Pasi《Zebra》` 2021 → 2020） |
| **(甲) 從未發行過的錄音首次以錄音發行** | **1**（`Art Blakey & The Jazz Messengers《First Flight to Tokyo》`） |
| **(乙) 母體原在 Blue Note／Liberty／UA／Solid State 的純庫藏、再發** | **成立 0**（訊號亮 2 次：Art Blakey 的 1961 年母帶、Joe Chambers 的 1960 年代側手史，逐筆查完都不是庫藏） |
| **(丙) 母體其實在真正的他廠** | **訊號亮 12 張、成立 0**（見第 1911 條） |
| **(丁) 與既有卡部分重疊／形狀不同** | **0**（Art Blakey 逐字確認是純 (甲)、不轉 (丁)，見第 1903 條） |
| **(戊) 四條再發系列** | **訊號亮 2 次、成立 0**（`Blue Note Tone Poet Series` ＋ `Vinyl Me, Please. Exclusive Pressing`，見第 1902／1912 條） |
| **(己) 載體只有影像** | **訊號亮 1 次、成立 0**（`山中千尋《Rosa》` 的初回限定盤帶 DVD） |
| **現場盤** | **3 純現場**（`Gerald Clayton《Happening》`、`Norah Jones《…'Til We Meet Again》`、`Art Blakey《First Flight to Tokyo》`，MB `secondary-types` 逐字都帶 `Live`）**＋ 1 半現場**（`Lonnie Smith《Breathe》` 八軌裡六軌逐字帶 `(live)`） |
| **撞陳列** | **35 處／16 張**（盤名逐字撞卡 4 處、其中 1 處撞 apex `hall`；軌名撞卡 31 處、其中 1 處撞 apex `hall`。見第 1914 條） |
| **新掛名** | **10 個新字串**（9 個裸名／團名 ＋ 1 個聯名新造）；**沿用池中既有字串 11 個、涵蓋 13 張卡；新造分裂 0**（見第 1905 條） |
| **`selfTitled: true`** | **1**（`ARTEMIS《ARTEMIS》`） |
| **`node batch-progress/c165/chk-prop.mjs a`** | **標記 0**（23 張、21 位；跨批 128 批／5,158 卡，跨批撞卡 0、同 rgMbid 不同掛名 0、共用目錄號 0） |
| 用掉的號段 | **1900–1922**（1923–1929 未用） |

**產出檔案**：`batch-progress/c165/prop-a.json`（23 筆）、`batch-progress/c165/rulings.md`（本檔）、
`batch-progress/c165/evidence-a/`（`SOURCES.md`／`mb.json`／`apple.json`／`dg.json`／`tracks.json`／`append.mjs`）。

---

## 第 1901 條（退表）：**本組退 0 筆——這是本線第一次整組零退貨，原因寫在這裡**

**沒有退表。** 23 筆全收。**不是判得鬆，是這一組的形狀本來就乾淨**：

1. **全部是 2020–2021 年的新錄音**，(乙)（庫藏／再發／日版 CD 化／45 轉復刻）與 (己)（只有影像載體）這兩條在定義上就幾乎不可能成立——它們擋的是舊母帶。
2. **全部走 Blue Note 正規 imprint**：23 張的 Discogs 零售條目與 MB `label-info` 逐字都含 `Blue Note`（id `713c4a95`），**零筆 `Nihon Blue Note`（`76903afe`）、零筆歐洲公版再發廠（`EJC`／`AJC`／`WaxTime`／`Jazz Wax Records`／`Blue Moon`）**——(丙) 的 12 次訊號全部是既有的四種假陽性。
3. **`slice.json` 的 `reissueSeries` 欄只有一筆非空**（`Charles Lloyd《Tone Poem》` 的 `Blue Note Tone Poet Series`），**而那一筆查完是新錄音**（第 1902 條）。

⚠ **給後批的提醒**：**「2015 年以後的 slice」這個區段的退貨率結構性偏低，不要拿它跟 1950–70 年代那幾批的退貨率互比。** 真正要花工時的不是收退判斷，是**掛名、標點碼位、版本／軌數釘定與年份覆核**——本組的 `risk` 欄平均 2,216 字元、`why` 平均 720 字元，幾乎全部花在這四件事上。

---

## 第 1902 條（**派工信的地雷 1；本條會被後批引用，判斷過程逐層寫下**）：**`Charles Lloyd & The Marvels《Tone Poem》2021` 不是再發，(戊) 不成立，收**

`slice.json` 的 `note` 與 `reissueSeries` 欄逐字都標了 **`Blue Note Tone Poet Series`**，而 **Tone Poet 在 (戊) 的四條再發系列名單上**（Blue Note 75／80、**Tone Poet**、Classic Vinyl、Blue Note Review）。**照名單字面走，這張要退。本棒判不退。四層證據逐字列在下面。**

### （一）③ 廠牌官網——最決定性的一層

`https://www.bluenote.com/artist/charles-lloyd/`（回 200）內文逐字：

> **`Lloyd reconvened The Marvels for his 2021 album Tone Poem, the vinyl edition of which was the first new release to be featured as part of the Tone Poet Audiophile Vinyl Series.`**

**這一句同時回答了兩件事**：**(a) 這是 2021 年的新作**；**(b) 它的黑膠是 Tone Poet 系列史上第一次拿來壓新錄音。**
**換句話說，系列名在本碟上標示的是母帶／壓片規格（Joe Harley 主持、RTI 壓片、Bernie Grundman／Cohearent 母帶），不是「把舊母帶重新壓片」。**

### （二）② Discogs `format` 欄——四筆零售條目一個 `Reissue` 都沒有

| Discogs id | 載體 | `format` 欄逐字 | `series` 欄逐字 |
|---|---|---|---|
| 17814862 | Worldwide 180g LP | `Vinyl, LP, Album, Stereo`（text `180g`） | **`Blue Note Tone Poet Series`** |
| 18033388 | 美版 test pressing | `Vinyl, LP, Album, Test Pressing, White Label` | **`Blue Note Tone Poet Series`** |
| 17824627 | 歐版 CD | `CD, Album, Stereo` | **空陣列** |
| 18645595 | 美版 CD | `CD` | **空陣列** |

**四筆全部沒有 `Reissue` 描述詞；系列標記只掛在兩筆黑膠上，CD 完全沒有。**

### （三）MB——沒有任何早於 2021 的東西

RG `e311be0a-0f83-42ed-b797-4170acd81ea3`：`first-release-date` 逐字 **`2021-03-12`**、`primary-type` 逐字 `Album`、
**`secondary-types` 逐字空陣列（沒有 `Compilation`）**、**轄下五筆 release 的日期逐字全部是 2021**。

### （四）錄音本身是新的

Discogs 17814862 的 notes 欄逐字：`Tracks A1-C1, D1 recorded at East West Studios, Los Angeles, CA`、
`Track C2 recorded at Noches del Botánico, Madrid, Spain`、`Track D2 recorded at Santa Barbara Sound Design, Santa Barbara, CA`。

### 裁定與通則

**判：(戊) 不成立，收；`reissuedBy` 欄留空。**

⚠ ⚠ **本條把 (戊) 的分界寫死成一句，供後批直接引用**：
**「(戊) 擋的是『把舊母帶重新壓片』這件事，不是『盤面上印了哪個系列名』。」**
**操作上照第 1798 條的兩層檢查**：**(1) Discogs `format` 欄有沒有 `Reissue`；(2) 該 LP 的年份與 RG 的 `frd` 差多少。**
**本張兩層都乾淨：零個 `Reissue`、LP 年份與 `frd` 逐日相同（`2021-03-12`，差 0 天）。**
⚠ **反面對照**：第 1783 條的 `Grant Green《Gooden's Corner》` 是 `Music Matters` 45 轉復刻，**原盤 1961、復刻 2010 年代，兩層都亮**——那才是要退的形狀。

⚠ **附帶**：**Tone Poet 系列從本張起同時包含「舊碟重刻」與「當年新作」兩種內容，後批只要在 `reissueSeries` 看到 `Blue Note Tone Poet Series`，一律要跑上面這四層，不得直接退。**

---

## 第 1903 條（**派工信的地雷 2**）：**`Art Blakey & The Jazz Messengers《First Flight to Tokyo: The Lost 1961 Recordings》2021` 是純 (甲)，不轉 (丁)**

派工信要求逐字確認「從未發行過」；**若其中某些軌先前以單曲或合輯出過，就改判 (丁)。實查四層，沒有任何一層有「先前發行過」的痕跡。**

| 層 | 逐字 |
|---|---|
| **③ `bluenote.com/art-blakey-the-jazz-messengers-first-flight-to-tokyo-the-lost-1961-recordings/`** | **`a thrilling previously unreleased live recording of Art Blakey & The Jazz Messengers`**；`captured at Hibiya Public Hall in Tokyo on January 14, 1961`；編制 `the legendary drummer with Lee Morgan on trumpet, Wayne Shorter on tenor saxophone, Bobby Timmons on piano, and Jymie Merritt on bass`；`On December 10, Blue Note Records will release …` |
| **② Discogs 20895925（2LP）notes** | **`Never before released limited edition double-LP …`** ＋ `Original ¼" reels discove[red by Zev Feldman]` |
| **② Discogs 21031093（歐版 2CD）notes** | **`Never before released, includes 56-page book.`** |
| **② Discogs 21315745（美加版 2CD）notes** | **`Previously unissued 2 CD sdet with a 56page book.`** |
| **② Discogs 21267682（美版 2LP）腰帶** | **`Never-Before Released Art Blakey Live in Japa[n]`** |
| **MB RG `931d6707`** | `secondary-types` 逐字 **只有 `Live`（沒有 `Compilation`）**；**轄下三筆 release 逐字全部是 2021 年首發，沒有任何早於 2021 的 release** |

**判純 (甲)，不標 (丁)。** ⚠ **四筆 Discogs 條目各自獨立寫了同一件事，這不是單一來源的複述——這是本線目前為止 (甲) 證據最硬的一張。**

⚠ ⚠ **曲目與池中既有 Blakey 卡的關係，是撞陳列不是 (丁)**：
**〈Moanin'〉折鍵後撞 seed `Art Blakey and the Jazz Messengers —《Moanin'》(1958)`、〈A Night in Tunisia〉撞 `…—《A Night in Tunisia》(1961)`（MB 逐字誤拼成 `A Night in Tunesia`）。**
**那是同一批曲目的兩次不同演奏，零軌重疊（沒有共用任何一條 recording）——(丁) 要的是「與既有卡部分重疊」，指的是同一份錄音被兩張卡共用，不是同一首曲子被彈了兩次。**
**下游簡介寫這兩軌時必須寫明是 1961 年的東京現場版本。**

⚠ ⚠ **掛名與 c-164 b 的《Just Coolin'》(2020) 逐字一致**：**兩批的 `slice.json` 都給 `Art Blakey & The Jazz Messengers`，c-164 b 的 `prop-b.json` 已逐字採用同一串**（實讀確認）；**seed 另有 5 列逐字同形**（《Not Yet》《I Get A Kick Out Of Bu》《The Big Beat》《Buhaina's Delight》《Indestructible》）。**第 307 條沿用，兩張同形狀同掛名的卡字串一致。**

---

## 第 1904 條（**派工信的地雷 3 ＋ 協調者中途更正**）：**第 1721 條的觀察名單本組有 2 筆，一筆維持、一筆改判——分界不在訊號，在「② 那一層的實體條目落在哪一年」**

派工信原寫本組只有 1 筆（`Trijntje Oosterhuis《Everchanging Times》`）。
**工作進行中協調者更正為 2 筆，補上 `Charles Pasi《Zebra》`，並指出原篩選條件多加的 `nReleases === 1` 太嚴、真正的訊號與 release 數無關。**
⚠ **本棒在收到更正之前，已在逐筆跑 ② Discogs 時獨立抓到 `Zebra` 這一筆並完成年份覆核**——兩邊結論相同，記在這裡當交叉驗證。

### 兩筆的三層對照

| | **`Trijntje Oosterhuis《Everchanging Times: Burt Bacharach Songbook III》`** | **`Charles Pasi《Zebra》`** |
|---|---|---|
| MB release 形狀 | 1 筆、`Digital Media`、`XW`、catno 空 | **3 筆、全部 `Digital Media`、全部 `XW`、catno 全空** |
| **MB `frd`** | `2021-11-26` | `2021-02-05` |
| **② Discogs 實體條目** | **CD 21535753 `released` 逐字 `2021-10-22`；LP 21129190 逐字 `2021-11-26`** | **LP 16205694 `released` 逐字 `2020-09-14`；CD 15984963 `year` 逐字 `2020`；⚠ Discogs 上這張碟沒有任何 2021 的條目** |
| **④ Apple `releaseDate`** | `2021-11-26T08:00:00Z` | `2021-02-05T08:00:00Z`（us／fr／de／gb 四個 storefront 同值） |
| **④ Apple ℗ 年** | `2021` | **`2020`** |
| **③ 廠牌官網** | 404（歐陸線） | `universal-music.de/charles-pasi/musik/zebra-587235` 逐字 **`VÖ: 05. Februar 2021`** |
| **→ 判** | **維持 2021，不改判** | **改判 2021 → 2020** |

### 分界

**協調者給的那一句成立，本棒實測同向：「② 有沒有比 MB `frd` 更早的實體條目」。**
- **`Everchanging Times`：沒有**（Discogs 的兩筆實體與 `frd` 同年、其中一筆同日）→ **訊號亮但不改判。這正是第 1721 條那句「2021 年的碟本來就很可能只有數位進 MB」的實例。**
- **`Zebra`：有**（兩筆實體零售條目都在 2020，比 `frd` 早近五個月）→ **改判。**

### `Zebra` 改判的完整理由（兩邊的層都列出來）

**主張 2020 的**：② Discogs 兩筆實體零售條目（LP `2020-09-14`、CD `2020`，廠牌欄第一格逐字 `Blue Note`，companies 的 ℗© 兩格逐字 `Blue Note France`）；Apple 四個 storefront 的 ℗ 欄逐字都是 `℗ 2020`；Discogs notes 逐字 `Recorded and mixed between October 2019 and January 2020 in Paris.`；
**⑥ `paris-move.com/reviews/charles-pasi-zebra/` 的評論刊出日逐字 `PARIS-MOVE, February 28th 2020`、廠牌列逐字 `BLUE NOTE / UNIVERSAL`、街頭日逐字 `27 mars`**；`parisjazzclub.net` 的場次逐字 `Charles Pasi : Zebra｜Friday October, 9th 2020`。

**主張 2021 的**：MB `frd` `2021-02-05`；Apple 四個 storefront 的 `releaseDate` `2021-02-05`；③ `universal-music.de` 逐字 `VÖ: 05. Februar 2021`；⑥ `afrik.com`（刊出日逐字 `Publié le 30 janvier 2021 à 12h41`）內文逐字 `la sortie officielle de cette œuvre musicale est prévue le 5 février prochain`。

**判 2020，三條理由**：
1. **來源權重 ② Discogs 是版本級的地基層**（第 1728 條調整後仍是第一位），**而它的兩筆都是實體零售條目、都在 2020，2021 年一筆都沒有。**
2. **℗ 年是盤面上的法定年份**，四個 storefront 逐字都是 2020。
3. **一張 2020 年 2 月就被樂評寫過、2020 年 10 月就在辦巡演的碟，`year` 寫 2021 明顯錯。** 最合理的還原是：原定 2020-03-27 街頭、疫情延到 2020 年 9 月出實體，**2021-02-05 是德國與國際數位的補發日**——③ 那一層是 Universal 的德國分站，**第 1794 條假陽性 (c)「地區分工」的同一個實體**，不是原始街頭日。

⚠ **這一筆請本機覆核**：改的是 manifest 的 `year` 欄（可逆，依裁定權下放第 2 條當場定）；若本機能取得法國實體盤的確切街頭日，以那個為準。

⚠ **給後批的一句（新立）**：**第 1791 條的偵測訊號要改成「所有 release 都是 `Digital Media` ＋ `country: XW` ＋ `catno` 空」，把 `nReleases === 1` 這個條件拿掉**——MB 的 release 數會隨社群補資料而變（協調者實測 c-164 b 有 slice 記 1、MB 現在是 2 的例子；本組的 `Zebra` 是 slice 記 2、MB 實查 3）。

---

## 第 1905 條：**掛名總表——新字串 10、沿用 11（涵蓋 13 張卡）、新造分裂 0**

### （一）新字串 10

| 掛名 | 形狀 | 四邊逐字 | 第 307 條反查 |
|---|---|---|---|
| **`Gerald Clayton`** | 裸名 | MB／Discogs 三筆／Apple us・jp 全部同形 | 池中 0 列 |
| **`ARTEMIS`** | 全大寫團名 | **MB RG 與六筆 release、③ 官網內文全大寫；⚠ Apple `collectionName` 與 Discogs 盤名逐字是首字大寫的 `Artemis`** | 兩形皆 0 列（見第 1910 條） |
| **`Thomas Dutronc`** | 裸名 | MB 五筆 release／Discogs 四筆／Apple 兩筆**全部是裸名，零個聯名** | 裸名 0 列；⚠ **c-164 b 已有 `Thomas Dutronc & Les Esprits Manouches`（另一個字串、另一組編制，第 1131 條）** |
| **`Ben l'Oncle Soul`** | 裸名（ASCII 撇號） | 見第 1910 條 | 三形皆 0 列 |
| **`Nduduzo Makhathini`** | 裸名 | 四邊同形 | 0 列 |
| **`Immanuel Wilkins`** | 裸名 | 四邊同形 | 0 列（⚠ seed 的 `Reverend Robert Wilkins` 是另一位） |
| **`Ron Miles`** | 裸名 | 四邊同形 | 0 列 |
| **`Charles Pasi`** | 裸名 | 四邊同形 | 0 列 |
| **`André Manoukian`** | 裸名（帶 `é`） | 四邊同形 | 0 列；`é` 是 `chk-prop` 不擋的非 ASCII 字元（與第 1746 條（五）的 `Götz Alsmann` 同形） |
| **`Arturo O'Farrill, The Afro Latin Jazz Ensemble`** | **聯名新造（逗號並列）** | 見第 1907 條 | 兩個成分皆 0 列 |

### （二）沿用池中既有字串 11 個、涵蓋 13 張卡

`Trijntje Oosterhuis`（**本組兩張**，見第 1906 條）／`Bill Frisell`（c-164 b《Harmony》）／`山中千尋`（c-163 三張＋c-164 b 一張，主線第 1672 條）／
`Terence Blanchard`（池中裸名四張，見第 1905-B 條）／`Norah Jones`（**本組兩張**，池中七張）／`Art Blakey & The Jazz Messengers`（seed 5 列＋c-164 b，第 1903 條）／
`Bill Charlap Trio`（seed 1 列＋卡單三張，見第 1908 條）／`Tony Allen`（seed 1 列）／`Charles Lloyd & The Marvels`（c-163 b《I Long to See You》，主線第 1727 條）／
`Joe Chambers`（c-155 a《Mirrors》）／`Lonnie Smith`（裸名，見第 1909 條）。

### （三）新造分裂 0

**21 個掛名字串逐一對 seed 17,248 列 ＋ 卡單／prop 共 27,160 列折鍵反查（`&`／`＆`→`and` 後剝非字母數字），無一與池中既有字串折出不同鍵。**
`chk-prop a` 的線上池比對與跨批去重（128 批／5,158 卡）**標記 0**。

## 第 1905-B 條：**`Terence Blanchard《Absence》` 判裸名，而 c-163 b 的《Breathless》用長形——兩張都對**

**本張**：MB RG 與兩筆 release 的 artist-credit、Apple us 的 `artistName` 逐字都是裸名 **`Terence Blanchard`**；
**只有 ② Discogs 兩筆用長形**（21465961 逐字 `Terence Blanchard Featuring` ＋ `The E-Collective And The` ＋ `Turtle Island String Quartet`；34995467 逐字把樂團寫成 `Turtle Island Quartet*`）。
**一層對兩層，且第 307 條同向（池中裸名已有四張：c-158《Bounce》、c-159《Flow》、c-160《A Tale of God's Will》、c-162《Magnetic》）→ 取裸名。**
⚠ **《Breathless》用長形是因為那一張的 MB artist-credit 本身就是長形**——**第 1131 條：逐碟判、不逐藝人判。**
⚠ **順帶一記**：Discogs 兩筆對同一個弦樂四重奏的寫法自己就不一致（`Turtle Island String Quartet` vs `Turtle Island Quartet`），**這一層在本張本來就不穩。**

---

## 第 1906 條（**派工信要求「兩張都要各自交代」**）：**本組兩張 `Trijntje Oosterhuis` 都判裸名，但依據不同；三張同掛名不同碟不算重複**

### （一）`Wonderful Christmastime`（2020，與 Jazz Orchestra Of The Concertgebouw）

⚠ ⚠ **第 1746 條（四）的理由 (a)「三邊未達門檻」在本張不成立**：
**MB RG 與兩筆 release 的 artist-credit 逐字 `Trijntje Oosterhuis & Jazz Orchestra Of The Concertgebouw`、Apple us 1536934133 的 `artistName` 逐字 `Trijntje Oosterhuis & Jazz Orchestra of the Concertgebouw`、Discogs 兩筆逐字兩段式——三邊本次全部給長聯名。**
**本棒只靠理由 (b)（第 307 條）**：實掃池中 `Trijntje` 共 **14 列／7 張不重複**（seed 0 列；卡單與 prop 各 7 張），**其中六張是裸名 `Trijntje Oosterhuis`**（c-160 a《The Look of Love》、c-160 b《Who'll Speak for Love》、c-161 a《Ken je mij》、c-161 b《Never Can Say Goodbye》《This is the Season》、c-162 a《Sundays in New York》；另一張是 c-159 a 的 `Trijntje Oosterhuis with Amsterdam Sinfonietta and The Houdini's`）。
**主線第 1703 條那一句「池中有沒有同系列前作」在這裡答案是有，而且是六張——取長形會讓同一個主體在池中裂成第三個字串。**

### （二）`Everchanging Times: Burt Bacharach Songbook III`（2021，與 Metropole Orkest）

**這一張的依據比 (一) 硬得多，而且是本組最漂亮的一條先例**：
**池中已有這個歌本系列的第一、二集——`Trijntje Oosterhuis —《The Look of Love: Burt Bacharach Songbook》(2006)`（c-160 a）與《Who'll Speak for Love: Burt Bacharach Songbook II》(2007)（c-160 b），兩張都是裸名。**
⚠ ⚠ **決定性的一層**：**Apple 上第一集（`713208188`）的 `artistName` 逐字就是 `Trijntje Oosterhuis & Metropole Orkest`——同一個聯名、同一個樂團，池中那張卡卻是裸名。**
**本張若取聯名形，同一個歌本系列會在池中出現兩種掛名。第 1703 條那一句在這裡是最字面的成立。**

### （三）為什麼三張同掛名不同碟不算重複

`chk-prop` 的折鍵是 **`掛名|盤名` 複合鍵**：
`trijntjeoosterhuis|wonderfulchristmastime`、`trijntjeoosterhuis|everchangingtimesburtbacharachsongbookiii` 與池中六張的鍵**兩兩互不相同**，
`chk-prop a` 的線上池比對與跨批去重**實測 0 命中**。**第 1131 條：同一位藝人的不同碟本來就各自成卡。**
⚠ **同樣的道理適用本組的 `Norah Jones` 兩張**（池中／卡單另有七張，共 9 張不重複）。

---

## 第 1907 條（**派工信的地雷 5 第一項；⚠ 本條與派工信明文相反，理由寫在這裡給主線覆核**）：**`Arturo O'Farrill, The Afro Latin Jazz Ensemble` 取逗號並列形，不取 `&`**

派工信逐字寫：「`Arturo O'Farrill, The Afro Latin Jazz Ensemble`（**逗號式並列——第 1539 條取 `&`**，但要先確認 MB `artist-credit` 逐字）」。
**本棒照它要求先查了 MB，查完的結論是：不能取 `&`。**

### （一）第 1539 條的原文判準不是「取 `&`」

第 1539 條（c-158）的標題逐字是「**Renee Rosnes 的聯名——四種盤面寫法，取 MB credited-name 串接那一種**」，
**它的結論字串是 `Renee Rosnes and the Danish Radio Big Band`——用的是 `and the`，不是 `&`。**
c-162 a 第 1746 條（三）之所以對 `Bill Charlap & Renee Rosnes` 取 `&`，是因為**那一張的 MB RG 與 Apple 三市場逐字都用 `&`、只有 Discogs 用逗號**。
**「取 `&`」是那兩張碟的結果，不是規則本身。規則是「取 MB credited-name 串接 ＝ 盤面 ＝ slice 三者相同的那一種」。**

### （二）本張四邊實查，零個 `&`

| 來源 | 逐字 |
|---|---|
| **MB RG artist-credit 串接** | **`Arturo O’Farrill, The Afro Latin Jazz Ensemble`**（逗號 joinphrase，撇號 U+2019） |
| `slice.json` | **逐字相同** |
| **② Discogs 20844604 `artists` 欄** | **`Arturo O'Farrill ,` ＋ `The Afro Latin Jazz Ensemble`**（逗號 join，撇號 ASCII） |
| **④ Apple us 1577846867** | `artistName` 逐字只有裸名 **`Arturo O'Farrill`**；樂團被放進盤名的 `(feat. The Afro Latin Jazz Ensemble)` |

**四邊沒有任何一層寫 `&`。改成 `&` 等於新造一個沒有出處的字串。**

### （三）裁定

**取 `Arturo O'Farrill, The Afro Latin Jazz Ensemble`（逗號、ASCII 撇號）。**
- **第 1539 條的原判準直接適用**：MB 串接 ＝ Discogs ＝ slice，三者相同。
- **第 1703 條的「池中有沒有同系列前作」答案是沒有**（`Arturo O'Farrill` 0 列、`The Afro Latin Jazz Ensemble` 0 列）→ **可以建並列形。**
- ⚠ ⚠ **而且建並列形在這裡是必要的**：Apple 上他另有四張掛 **`Arturo O'Farrill & The Afro Latin Jazz Orchestra`** 的碟（《Cuba: The Conversation Continues》《Fandango at the Wall》《The Offense of the Drum》《Four Questions》）——**`Orchestra` 與 `Ensemble` 是兩個不同編制**，若本卡判裸名，日後收 Orchestra 那條線時會分不開。

⚠ **請主線覆核**：若主線仍要取 `&` 形，改的是卡單值（可逆），但**請一併決定 Orchestra 那條線日後怎麼掛**。

---

## 第 1908 條（**派工信的地雷 5 第二項**）：**`Bill Charlap Trio` 沿用團名形；同一人在池中有三種字串，逐一掃過，不是分裂**

| 字串 | 池中列數 | 出處 |
|---|---:|---|
| **`Bill Charlap Trio`（本卡取這一形）** | **4 張** | seed《'S Wonderful》(1999)；卡單／prop c-157 a《Written in the Stars》(2000)、c-158 b《Somewhere: The Songs of Leonard Bernstein》(2004)、c-160 b《Live at the Village Vanguard》(2007) |
| `Bill Charlap`（裸名） | 1 張 | c-158 a《Stardust》(2002) |
| `Bill Charlap & Renee Rosnes` | 1 張 | c-162 a《Double Portrait》(2010)，第 1746 條（三）所建 |

**四邊同向**：MB RG 與六筆 release 的 artist-credit、Discogs 四筆的 `artists` 欄、Apple us・jp 的 `artistName` 逐字全部是 **`Bill Charlap Trio`**，**沒有一層給裸名。**
**主線第 1703 條：「池中有沒有同系列前作」答案是有、而且是四張同一個三重奏 → 沿用團名形。**
⚠ **三形並存不是分裂（第 1131 條）**：裸名那張是他的獨奏／大編制作品、`& Renee Rosnes` 那張是雙鋼琴，三種編制各自成立。
⚠ ⚠ **但折鍵後 `billcharlaptrio` 與 `billcharlap` 是兩個不同的鍵，`chk-prop` 的第三道（裸名／團名分裂）不會亮——這是盲點三，本組靠人工掃出來的。**

---

## 第 1909 條（**派工信的地雷 6**）：**`Dr. Lonnie Smith《Breathe》` 判裸名 `Lonnie Smith`——第 1815 條的第二次應驗，而且這次 ② 站在裸名這一邊**

**實掃池中 `Lonnie Smith` 共 13 列／9 張不重複**：
seed 6 列（《Move Your Hand》1970、《Think!》1968、《Drives》1970、《Turning Point》1969 為裸名；另有 `The Lonnie Smith = John Abercrombie Trio —《Afro Blue》(1994)` 與 `Lonnie Smith Trio —《Purple Haze》(1994)` 兩個帶尾綴的形）
＋ 卡單／prop 4 張（c-142 a《Turning Point》、c-153 a《Live at Club Mozambique》、c-163 b《Evolution》、c-164 b《All in My Mind》）。
**`Dr. Lonnie Smith` 這一形在池中逐字 0 列。第 307 條直接適用，取裸名。**

⚠ ⚠ **與 c-163 b 第 1815 條那次不同的地方**：
**那次是「四邊都給 `Dr.` 形仍然沿用池中裸名」（逆四邊）；本張的 ② Discogs 四筆條目的 `artists` 欄逐字就是裸名 `Lonnie Smith`**
——**地基層這次站在裸名這一邊，連逆四邊都不必。** `slice.json`／MB RG／五筆 release 的 artist-credit／Apple us 的 `artistName` 才是 `Dr.` 形。

⚠ **③ 的路徑要分開記**：**`bluenote.com/artist/dr-lonnie-smith/` 回 200**（本組實測）、**`bluenote.com/artist/lonnie-smith/` 依 c-163 b 第 1823 條實測為 404**。
**查詢路徑用 `Dr.` 形、卡池字串用裸名，兩件事不衝突。**

---

## 第 1910 條（**派工信的地雷 6 標點層；`chk-prop` 盲點二與盲點七**）：**五處標點／大小寫逐字元核完，四處取 ASCII、一處取 U+2026、一處取全大寫**

⚠ **`chk-prop` 只擋連字號類字元（`‐‑‒–—―－`）與被當破折號用的 U+30FC——撇號、刪節號、大小寫它一律摺掉。標記 0 不等於沒問題。**

| 卡 | 三邊逐字 | **本棒取** | 依據 |
|---|---|---|---|
| **`Ben l'Oncle Soul`** | MB `Ben l’Oncle Soul`（U+2019）／Discogs `Ben L'Oncle Soul`（ASCII、`L` 大寫）／**Apple us `Ben l'Oncle Soul`（ASCII、`l` 小寫）** | **`Ben l'Oncle Soul`** | 撇號：②④ 兩層 ASCII → 第 1702／1769（五）條取 ASCII；大小寫：MB＋Apple 的小寫 `l`（Discogs 慣例把字首都大寫，同第 1746 條（二）的 `Gare du Nord`） |
| **`Arturo O'Farrill`** | MB／Apple jp U+2019（jp 另把姓氏全大寫 `O’FARRILL`）／**Discogs 與 Apple us ASCII** | **`Arturo O'Farrill, …`** | 同上，取 ASCII |
| **`…'Til We Meet Again`** | **MB `…’Til`（U+2026＋U+2019）／Discogs `...'Til`（三個 ASCII 句點＋ASCII 撇號）／Apple us・jp `‘Til`（U+2018 左單引號、無刪節號）** | **`…'Til We Meet Again`**（U+2026 ＋ ASCII 撇號） | **刪節號取 MB 的 U+2026**（池中先例：`Norah Jones —《…Little Broken Hearts》` 與本組 `…dreaming in lions…`）；**撇號三邊三種碼位、沒有任何兩層在同一個彎引號上一致 → 取 ASCII** |
| **`…dreaming in lions…`** | **MB 與 Apple us 逐字都是 U+2026 兩端＋全小寫**／Discogs `...Dreaming in Lions...`（notes 自承 `Title stylised as "...dreaming in lions...."`） | **`…dreaming in lions…`** | MB＋Apple 兩層同形 |
| **`ARTEMIS`（掛名與盤名）** | **MB RG title 與 artist-credit、③ 官網內文全大寫**／Apple `artistName` 全大寫但 `collectionName` 逐字 `Artemis`／Discogs 盤名 `Artemis`、`artists` 逐字 `Artemis (24)` | **`ARTEMIS`／`ARTEMIS`** | 取 MB＋官網的全大寫（與第 1672 條把 `quasimode` 判成全小寫同一條：**掛名與盤名的大小寫以樂團自己的盤面書寫為準**）；⚠ `(24)` 是 Discogs 的同名消歧碼，不是團名的一部分 |

⚠ **其餘非 ASCII 字元**：`André Manoukian` 的 `é`（U+00E9）、`Choï Music`（只在 `label` 欄）、日文與片假名形（只在 `queryAlias`）——**全部不在 `chk-prop` 的字元集裡，且不影響折鍵。**
⚠ **23 張的 `artist` 與 `album` 兩欄已逐字元查過碼位：零個連字號類字元、零個 U+30FC。**

---

## 第 1911 條：**(丙) 的訊號亮 12 張、成立 0——本線連續五組零成立，而且本組出現一個「廠牌鏈第一格不是 Blue Note」的關鍵案例**

| # | 卡 | 亮燈的那一格（逐字） | 為什麼不成立 |
|---|---|---|---|
| 1 | `Trijntje Oosterhuis《Wonderful Christmastime》` | ℗ 欄第一格 `Train-Cha` | 她自己的公司（藝名 Traincha）；同句逐字 `under exclusive license to Universal Music B.V.` → 第 1753（4）／1770 條假陽性 (a)＋(c) |
| 2 | `Thomas Dutronc《Frenchy》` | ℗ 欄 `Tomdu Productions` ＋ `Under exclusive license to Barclay (France)` | 他自己的公司 ＋ Universal 法國的發行部門；Discogs companies 逐字 `Licensed To: Blue Note France` |
| 3 | `Ben l'Oncle Soul《Addicted to You》` | ℗© 兩格 `Decca Records France` | 與 c-163 b 第 1823 條第 1 筆 `Yaron Herman` 同形；四筆零售條目的廠牌鏈第一格逐字全是 `Blue Note`；同藝人 2019 年 EP 的 notes 逐字 `℗ & © 2019 - Blue Note France, a division of Universal Music France` |
| 4 | `Nduduzo Makhathini《Modes of Communication》` | ℗© 兩格 `Universal Music (Pty) Ltd South Africa` | Universal 南非分公司（第 1794 條 (c)，與 `Marcus Miller《Afrodeezia》` 南非版同形）；companies 逐字 `Licensed To: UMG Recordings, Inc.` |
| 5 | `山中千尋《Rosa》` | Apple ℗ 欄 `A Universal Classics & Jazz release` | Blue Note 的母公司部門名（第 1823 條第 3 筆 `José James` 同形） |
| 6 | `Charles Pasi《Zebra》` | Apple ℗ 欄 `Decca Records France` | **Discogs companies 的 ℗© 兩格逐字就是 `Blue Note France`** |
| 7 | `Trijntje Oosterhuis《Everchanging Times》` | ℗ 欄 `Train-Cha` ＋ `Metropole Orkest` | 同 #1 |
| 8 | `Norah Jones《…'Til We Meet Again》` | ℗© 兩格 `Capitol Records, LLC` | Capitol 是 Blue Note 在美國的母公司 |
| 9 | `Norah Jones《I Dream of Christmas》` | 同上 | 同上 |
| 10 | `Tony Allen《There Is No End》` | ℗© 兩格 `Decca Records France` | 同 #3 |
| 11 | **`André Manoukian《Les Pianos de Gainsbourg》`** | ⚠ ⚠ **Discogs 兩筆的廠牌鏈第一格逐字都是 `Decca`（不是 Blue Note）；℗© 兩格、盤面 notes、Apple ℗ 欄四處全部指向 `Decca Records France`** | **依第 1784／1794／1801（3）條的動作看「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note」：兩筆都逐字含 `Blue Note`（CD 在第三格、LP 在第二格），MB 三筆 release 的 `label-info` 亦逐字含 `Blue Note`。過閘。** |
| 12 | `Charles Lloyd & The Marvels《Tone Poem》` | ℗© 兩格 `Charles Lloyd` 本人 ＋ `under exclusive license to UMG Recordings, Inc.` | 假陽性 (a)＋(c)；c-163 b 第 1823 條第 6 筆對同一位藝人已判過 |

⚠ ⚠ **#11 是本組最值得記的一筆**：**它是第 1784 條那個動作（「有沒有任何一筆」而不是「第一格是不是」）的第二次關鍵應用——若只看第一格，這張會被誤退。**
⚠ **(丙) 在本線已經連續五組亮訊號、零成立**（c-162 b 3 次、c-163 a 5 次、c-163 b 6 次、本組 12 次）。**第 1823 條那句建議成立：「℗ 欄第一格不是 Blue Note」應該降級成「去查 Discogs 廠牌鏈」的提示，不要當 (丙) 的判據。**

⚠ **imprint 前置閘（跑在六句之前）：23／23 全過。** 逐張實查 Discogs 零售條目與 MB `label-info`，**零筆 `Nihon Blue Note`（`76903afe`）、零筆 `EJC`／`AJC`／`WaxTime`／`Jazz Wax Records`／`Blue Moon`。**

---

## 第 1912 條：**(乙)／(戊)／(己) 的訊號各亮幾次、全部不成立**

- **(乙) 亮 2 次**：`Art Blakey《First Flight to Tokyo》`（母體確實是 Blue Note 的 1961 年錄音）→ **從未發行過，(甲) 優先，見第 1903 條**；`Joe Chambers《Samba de Maracatu》`（他 1960 年代在 Blue Note 錄過大量側手）→ **那是別人掛名的碟，本張是 2021 年的新錄音**（Discogs companies 的 `Recorded At` 是兩間 2020 年代的錄音室）。
- **(戊) 亮 2 次**：`Charles Lloyd《Tone Poem》` 的 `Blue Note Tone Poet Series`（**第 1902 條，新錄音**）；**`Immanuel Wilkins《Omega》` 的 Discogs 18896191 `series` 欄逐字 `Vinyl Me, Please. Exclusive Pressing`**（**黑膠訂閱通路的專屬壓片，不在四條名單上，`format` 欄逐字 `Vinyl, LP, Album, Club Edition, Numbered, Stereo` 沒有 `Reissue`，內容與 2020 原版相同**）。
- **(己) 亮 1 次**：`山中千尋《Rosa》` 的初回限定盤帶 DVD-Video 3 項——**主載體是 UHQCD 10 軌，同日另有純 SHM-CD 與數位；(己) 只擋「這張碟本身的載體只有影像」**（與 c-163 b 對《Syncopation Hazard》《Guilty Pleasure》完全同形）。
- ⚠ **另有兩張的「同碟再版」帶 `Reissue`，但都不是本卡釘的那一筆**：`Trijntje Oosterhuis《Wonderful Christmastime》` 的 2022 綠膠（Discogs 25528945）、`Norah Jones《I Dream of Christmas》` 的 2022 Deluxe（Discogs 25095952，notes 逐字 `This compilation ℗© 2022`）。**兩張都釘 2021／2020 的首版。**
- ⚠ **`Thomas Dutronc《Frenchy》` 的 2020-12-04 加值版（Discogs 16789512）`format` 欄逐字含 `Reissue`**——**那是同年同碟的 21 軌擴充版，不是舊母帶重壓；本卡釘 2020-06-19 的 14 軌首版。**

---

## 第 1913 條：**年份覆核——23 張全跑，改判 1 張、其餘 22 張成立**

- **改判 1 張**：`Charles Pasi《Zebra》` 2021 → **2020**（第 1904 條）。
- **三層一致到日的 14 張**：Gerald Clayton／ARTEMIS／Trijntje《Wonderful Christmastime》／Thomas Dutronc／Ben l'Oncle Soul／Nduduzo Makhathini／Bill Frisell／Ron Miles／山中千尋（**四層**，含 universal-music.co.jp 的發売日）／Arturo O'Farrill／Terence Blanchard／Norah Jones《…'Til We Meet Again》／Bill Charlap Trio（同年、取多數日）／Charles Lloyd《Tone Poem》。
- **同年但層間日期分歧、不影響 `year` 的 8 張**：Immanuel Wilkins（黑膠晚一年首壓，Discogs `year` 欄寫 2021、notes 逐字仍是 `(P) (C) 2020`）／Trijntje《Everchanging Times》（CD 10-22、LP 與數位 11-26）／Art Blakey（歐版 11-05、美版 LP 12-03、北美 CD 12-10，③ 官網逐字 `On December 10`）／Norah Jones《I Dream of Christmas》（色膠 10-01、CD／LP 10-15、數位 frd 10-14）／Tony Allen（數位 04-30、實體 05-07，③ 官網逐字 `released on May 7`）／André Manoukian／Joe Chambers（美版 CD 01-15、數位與③官網 02-26）／Lonnie Smith（CD 03-26、日版 04-07、黑膠 12-17）。

⚠ ⚠ **兩個要記的壞值**：
1. **`Terence Blanchard《Absence》` 的 Apple us 1575807410 `releaseDate` 逐字 `1986-01-01T00:00:00Z`**——**Apple 端的錯誤佔位值，比第 1601 條的 `YYYY-01-01T08:00:00Z` 年初佔位日更壞（連年份都錯）。同一筆的 ℗ 欄逐字 `℗ 2021`、12 軌與實體一致。不可引用。**
2. **`Charles Pasi《Zebra》` 的 ℗ 年（2020）與 `releaseDate`（2021）差一年**——**第 1791 條的偵測訊號之一，本組唯一一次真陽性。**

---

## 第 1914 條：**撞陳列——35 處／16 張；⚠ 盤名逐字撞卡 4 處（1 處撞 apex `hall`）、軌名撞卡 31 處（1 處撞 apex `hall`）**

**掃法（照第 738／859／1370／1747 條）**：先印 `seed_cards.json` 前兩列確認形狀——逐字
`["The Rolling Stones","Some Girls",4,2,1,["rock","blues"],1978]` ＋ `["Bob Dylan","John Wesley Harding",4,2,2,["folk","rock"],1967]`，
**7 欄的陣列的陣列、17,248 列，其中 917 列有第 9 格＝apex 層級**；
再取每張 RG 轄下軌數最多的那一筆 release 的全部軌名（`evidence-a/tracks.json`），折鍵後對 17,248 列逐一比對，**盤名另外獨立掃一次。**

### （一）⚠ ⚠ 盤名逐字撞卡 4 處——`chk-prop` 四道全部不會亮（掛名不同、複合折鍵不同鍵）

| 本組卡 | 撞到 | 等級 |
|---|---|---|
| ⚠ ⚠ **`Immanuel Wilkins —《Omega》(2020)`** | **`Enrique Morente & Lagartija Nick —《Omega》(1996)`** | **apex `hall`** ＋ 另撞 `Robert Hood —《Omega》(2010)`（一般卡） |
| **`Terence Blanchard —《Absence》(2021)`** | `Dälek —《Absence》(2004)` | 一般卡 |
| **`Bill Charlap Trio —《Street of Dreams》(2021)`** | **`Grant Green —《Street of Dreams》(1967)`** | 一般卡（⚠ **同一個廠牌、同一首 1930 年代標準曲當盤名**） |
| **`Lonnie Smith —《Breathe》(2021)`** | `Faith Hill —《Breathe》(1999)` | 一般卡 |

**四張都收，但下游鉤子層與簡介層必須寫明本卡是哪一張，陳列要迴避誤連**（第 1699／1747 條的形狀）。
⚠ ⚠ **`Omega` 這一處撞的是 `hall` 級王牌——本線 c-159 a 以來第四次「盤名逐字撞 apex」，這個形狀已經連四批出現，建議主線把它做進 `chk-prop` 的第五道。**

### （二）軌名撞卡 31 處／15 張——只列撞 apex 與需要下游處理的

- ⚠ ⚠ **撞 apex `hall` 1 處**：**`Ben l'Oncle Soul` 第 9 軌〈Call Me〉↔ seed `Al Green —《Call Me》(1973)`（apex `hall`）**；同軌另撞 `Ann Peebles —《Call Me》(1989)`（一般卡）。**下游簡介不得讓這一軌的論述碰到 Al Green 那張王牌。**
- **翻奏曲名對原作者盤名（下游簡介必須寫明是翻奏）**：`ARTEMIS`〈The Sidewinder〉↔ `Lee Morgan —《The Sidewinder》(1964)`；`Thomas Dutronc`〈Un homme et une femme〉↔ `Francis Lai` 同名盤；`山中千尋`〈My Favorite Things〉↔ `John Coltrane` 同名盤；`Art Blakey`〈Now's the Time〉↔ `Charlie Parker` 同名盤、〈'Round About Midnight〉↔ `Miles Davis —《Round About Midnight》`；`Bill Frisell`〈We Shall Overcome〉↔ `Pete Seeger` 同名盤、〈What The World Needs Now Is Love〉↔ `The Staple Singers` 同名盤；`Lonnie Smith`〈Why Can't We Live Together〉↔ `Timmy Thomas` 同名盤、〈Sunshine Superman〉↔ `Donovan` 同名盤；`Charles Lloyd`〈Ramblin'〉↔ `Paul Bley —《Ramblin'》(1969)`。
- ⚠ ⚠ **兩處「同一位藝人自己撞自己」，要特別小心**：
  **(a) `Art Blakey`〈Moanin'〉與〈A Night in Tunisia〉↔ seed 的 `Art Blakey and the Jazz Messengers` 同名兩張**——**同曲不同演奏，零軌重疊，不是 (丁)**（第 1903 條）。
  **(b) `Lonnie Smith` 黑膠獨有的第九軌〈Move Your Hand〉↔ seed `Lonnie Smith —《Move Your Hand》(1970)`**——**本卡釘 8 軌的 CD 版、那一軌不在裡面；若下游要寫「他在生涯末年重錄 1970 年的招牌曲」，必須寫明是兩張不同的碟。**
- **其餘 16 處都是曲名對不相干的盤名、零軌重疊、非同碟**（`Joe Chambers`〈Visions〉一軌就撞五張、〈Rio〉↔ `Duran Duran`、`Bill Charlap Trio`〈Day Dream〉↔ `Daydream` 兩張等）。

### （三）0 撞的 7 張

`Gerald Clayton`／`Ron Miles`／`Arturo O'Farrill`／`Trijntje Oosterhuis《Everchanging Times》`／`Norah Jones《I Dream of Christmas》`（**掃的是 25 軌的 Deluxe 最大集合**）／`Tony Allen`／`André Manoukian`。

---

## 第 1915 條：**曲風取捨——`['jazz']` 12、`['jazz','pop']` 5、`['jazz','world']` 2、`['jazz','blues']`／`['jazz','hiphop']`／`['jazz','soul']`／`['soul','pop']` 各 1**

| 曲風 | 張數 | 卡 |
|---|---:|---|
| `['jazz']` | **12** | Gerald Clayton／ARTEMIS／Trijntje《Wonderful Christmastime》／Bill Frisell／Immanuel Wilkins／Ron Miles／山中千尋／Terence Blanchard／Art Blakey／Bill Charlap Trio／Charles Lloyd《Tone Poem》／Joe Chambers |
| `['jazz','pop']` | **5** | Thomas Dutronc／Trijntje《Everchanging Times》／Norah Jones ×2／André Manoukian |
| `['jazz','world']` | **2** | Nduduzo Makhathini／Arturo O'Farrill |
| `['jazz','blues']` | 1 | Charles Pasi |
| `['jazz','hiphop']` | 1 | Tony Allen |
| `['jazz','soul']` | 1 | Lonnie Smith |
| **`['soul','pop']`** | **1** | **Ben l'Oncle Soul（本組唯一不含 `jazz` 的卡）** |

**固定處理**：
- ⚠ **`contemporary jazz` 依第 1572 條不跟**——**本組 MB 或 Discogs 給了這個標籤的有 9 張，一張都沒跟。**
- **不在十類名單上的一律不跟**：`post bop`／`post-bop`（4 張）、`hard bop`（2）、`bop`／`swing`／`cool jazz`（Bill Charlap Trio）、`gypsy jazz`／`chanson`／`easy listening`（法國線）、`holiday`（兩張聖誕盤）、`spiritual jazz`／`african`（後者折到 `world`）、`latin jazz`（折到 `world`）、`avant-garde jazz`／`modern`／`modern creative`／`jazz pop`／`jazz blues`／`afrobeat`、以及 `jazzthing`／`jazzthing 140`／`jazzthing 141`／`offizielle charts`／`ph_temp_checken`／`award/qobuz/qobuzissime`（**德國雜誌期號與獎項標籤，根本不是曲風**）。
- ⚠ **`soul-jazz`／`jazz-funk` 一律折到 `soul`**（第 1824 條）：本組只有 `Lonnie Smith《Breathe》` 一張（Discogs `style` 逐字 `Hard Bop, Soul-Jazz`），與 seed 同藝人四張、c-163 b《Evolution》的 `["jazz","soul"]` 一致。
- ⚠ **`latin jazz`／`african` 折到 `world` 的池中先例**：`Machito`／`Tito Puente`／`Eddie Palmieri`／`Chucho Valdés`／`Cal Tjader` 的拉丁爵士卡逐字都是 `["jazz","world"]` 或 `["world","jazz"]`；`Abdullah Ibrahim《South Africa》《Good News From Africa》《Mantra Mode》《African River》` 逐字都是 `["jazz","world"]`。

⚠ ⚠ **五處刻意與「同一位藝人的其他卡」不同，各自寫在卡的 `risk` 裡**（第 1824 條「曲風欄逐張判、不逐藝人判」）：
1. **`Trijntje《Wonderful Christmastime》` 取 `['jazz']`，而她的另一張聖誕盤《This is the Season》(2010) 是 `['pop','soul']`**——那張是 pop-soul 製作，本張的 Discogs `genre` 欄逐字只有 `Jazz`、編制是 Concertgebouw 的大樂團。
2. **`Thomas Dutronc《Frenchy》` 取 `['jazz','pop']`，而 c-164 b 的《Live Is Love》是 `['jazz']`**——Discogs 四筆裡三筆的 `genre` 欄逐字帶 `Pop`。
3. **`Tony Allen《There Is No End》` 取 `['jazz','hiphop']`，而 seed 的《Lagos No Shaking》(2006) 是 `['world']`**——**Discogs 三筆的 `genre` 欄逐字全部是 `["Hip Hop","Jazz"]`、`style` 逐字 `Jazz-Funk, Jazzy Hip-Hop`，MB tags 的 `hip hop` 有 3 票；整張十二軌各配一位饒舌或歌手客座，形狀就是嘻哈合作盤。** ⚠ **請本機審稿時再看一眼：若店主偏好讓 Allen 兩張都進世界音樂抽牌池，改 `['jazz','world']` 或三值都是可逆的卡單值變更。**
4. **`Charles Lloyd《Tone Poem》` 取 `['jazz']`，而《I Long to See You》(2016) 是 `['jazz','folk']`、seed 的《Vanished Gardens》(2018) 是 `['folk','jazz']`**——那兩張都有歌手（Willie Nelson／Norah Jones／Lucinda Williams）把鄉村與民謠放到前景，本張是純器樂、Discogs 兩層都沒給 folk／country 標籤。
5. **`Joe Chambers《Samba de Maracatu》` 取 `['jazz']` 而不是 `['jazz','world']`，與同組 `Arturo O'Farrill` 對照**——**那一張的 Discogs `style` 欄逐字有 `Latin Jazz`，本張三筆的 `style` 欄逐字全部空陣列。巴西節奏是題旨，寫進簡介、不進曲風欄**（同 c-163 b 對《Syncopation Hazard》的 `ragtime`、本組對《Rosa》兩段貝多芬改編的處置）。

⚠ ⚠ **`Ben l'Oncle Soul` 判 `['soul','pop']` 的完整理由（本組最需要交代的一張）**：
**Discogs 四筆的 `genre` 欄逐字全部是 `["Hip Hop","Funk / Soul","Pop"]`、`style` 逐字 `Contemporary R&B`／`Rhythm & Blues`；MB tags 逐字 `contemporary r&b`／`hip hop`／`pop`——兩層都沒有任何 jazz 標籤，`slice.json` 的 `genre: jazz` 是廠牌線的預設值、不是這張碟的曲風。**
**`Hip Hop` 兩層都有但不跟**：整張唯一的饒舌是 IAM 的一軌客座，而**池中 17,248 列裡只有 37 列帶三個曲風值（0.2%），house style 是 1–2 個。**
**先例**：c-161 收的 `Hindi Zahra《Handmade》` 同屬 Blue Note France 的非爵士線，判 `['jazz','world']`——**該條先例證明這條線的卡本來就不必一律掛 jazz。**

---

## 第 1916 條：**六層證據的實測命中——② 23／23、④ 23／23、③ 16／23、①⑤⑥ 見下**

| 層 | 命中 | 說明 |
|---|---:|---|
| **② Discogs（地基）** | **23／23** | **連十五組 100%。** ⚠ **本組有五張的 Discogs 是決定性證據**：`Tone Poem`（`format` 無 `Reissue` ＋ `series` 只掛黑膠 → 第 1902 條）、`Art Blakey`（四筆 notes 各自逐字 `Never before released` → 第 1903 條）、`Zebra`（兩筆 2020 年實體條目 → 第 1904 條改判）、`André Manoukian`（廠牌鏈第一格是 `Decca`、第二／三格才是 `Blue Note` → 第 1911 條 #11）、`Lonnie Smith`（`artists` 欄逐字裸名 → 第 1909 條）。 |
| **④ Apple 店面** | **23／23** | ⚠ ⚠ **但有 5 張的關鍵字查法落空、要靠 UPC lookup 或精準詞才命中**：`ARTEMIS`（盤名是常見詞，`lookup?upc=602508937361` 才命中 `1522995342`）、`Ron Miles`、`Art Blakey First Flight`、`山中千尋 Rosa`（要用漢字掛名查 jp storefront）、`Trijntje Everchanging Times`。**探測鏈若失手，`evidence-a/SOURCES.md` 記了這五筆的 `collectionId`。** ⚠ **另有一筆壞值：`Terence Blanchard《Absence》` 的 `releaseDate` 逐字 `1986-01-01T00:00:00Z`（第 1913 條）。** |
| **③ 廠牌官網** | **16／23** | 見第 1917 條。 |
| **① 紙本 Billboard** | **不查** | ⚠ ⚠ **本組 23 筆全部是 2020–2021 的碟，Billboard OCR 只覆蓋到 2015（第 1723 條）——結構性查不到。依主線第 1728 條第 2 點，「紙本 0 命中」不寫進 `risk`、不花工時去抓。本組的 `risk` 欄一個字都沒提紙本。** |
| **⑤ AllMusic** | **0／23** | 連十五組 0。 |
| **⑥ 維基／樂評** | **3／23** | **只在 `Charles Pasi《Zebra》` 的年份爭議上動用**（paris-move.com 的 2020-02-28 樂評、afrik.com 的 2021-01-30 報導、parisjazzclub.net 的 2020-10-09 場次頁）——**②③④ 三層在那一張互相矛盾，第四層是必要的**（第 1904 條）。其餘 22 張都沒有需要第四層佐證的爭議。 |

---

## 第 1917 條（**回應協調者的中途更正第 2 點**）：**③ `bluenote.com` 的 404 名單實測——本組 14 個路徑 200、6 個路徑 404，與派工信的預測完全一致，但仍要實測**

派工信預測歐陸藝人（`Charles Pasi`／`André Manoukian`／`Thomas Dutronc`／`Ben l'Oncle Soul`／`Trijntje Oosterhuis`）會 404。
**本棒對 22 個路徑逐一 `curl -o /dev/null -w '%{http_code}'`（不跟隨轉址，第 1731-B 條）實測，結果如下：**

**回 200（14 個路徑、涵蓋 15 張卡）**：
`gerald-clayton`／`artemis`／`immanuel-wilkins`／`ron-miles`／`joe-chambers`／`dr-lonnie-smith`／`bill-charlap`／`norah-jones`／`terence-blanchard`／`bill-frisell`／`nduduzo-makhathini`／`tony-allen`／`arturo-ofarrill`／`charles-lloyd`（**另 `art-blakey` 亦 200，但本卡實際引用的是新聞稿頁**）。

**回 404（6 個路徑、涵蓋 7 張卡）**：
`thomas-dutronc`／`ben-loncle-soul`／`charles-pasi`／`andre-manoukian`／`trijntje-oosterhuis`／`chihiro-yamanaka`／**`bill-charlap-trio`**。

⚠ ⚠ **兩件實測出來、預測裡沒有的事**：
1. **`bill-charlap-trio`（團名形）404、`bill-charlap`（裸名）200**——**與第 1823 條的 `lonnie-smith`（裸名 404）／`dr-lonnie-smith`（200）恰好相反。** **→ 第 1800 條的路徑 (1) 要「裸名形與團名／頭銜形兩形都試」，不能只試 slice 給的那一形。**
2. **新聞稿頁（第 1800 條路徑 (2) 的變體）在本組立了大功**：`bluenote.com/art-blakey-the-jazz-messengers-first-flight-to-tokyo-the-lost-1961-recordings/` 與 `bluenote.com/releases/first-flight-to-tokyo-…/` 兩頁，**前者給出 (甲) 的決定性逐字證據**（第 1903 條）——**藝人頁查不到細節時，站內的 releases／新聞稿頁值得多試一次。**

⚠ **日本線（路徑 (3)）**：`universal-music.co.jp/chihiro-yamanaka/products/uccj-2181/` 回 200，給出商品名 `ローザ [通常盤] [SHM-CD]`、發売日 `2020-06-24`、品番 `UCCJ-2181`（見第 1920 條第 (二) 點）。
⚠ **歐陸線的替代站**：`universal-music.de/charles-pasi/musik/zebra-587235` 回 200，逐字 `VÖ: 05. Februar 2021`——**這是本線第一次用到 Universal 的德國分站；⚠ 但它給的是德國街頭日，不是原始街頭日（第 1904 條），引用時要標明。**

⚠ **序數**：**本組 23 張一張都沒寫廠牌目錄序數。** ③ 有 16 張命中，但**① 紙本這一層在 2020–2021 結構性不存在**，第 1714／1620-N 條的兩層門檻過不了。
**依第 1732 條（三）寫「身分敘述」的有 4 張**：`Gerald Clayton`（官網逐字 `made his Blue Note debut with the 2020 release of…`）、`Immanuel Wilkins`（`his stellar debut album`）、`Nduduzo Makhathini`（`Blue Note debut`）、`Joe Chambers`（`marks the notable Blue Note Records return of…` ＋ `his Blue Note debut, Mirrors, came out in 1998`）。

---

## 第 1918 條（**回應協調者的中途更正第 1 點**）：**派工信的「池中幾乎確定已有卡」名單實掃——七個名字裡有兩個在 `seed_cards.json` 是 0 列，照字面「撞到就退」會誤退**

派工信地雷 7 逐字列了七個：`Norah Jones`（本組兩張）／`Bill Frisell`／`Terence Blanchard`／`Tony Allen`／`Charles Lloyd`／`Dr. Lonnie Smith`／`Trijntje Oosterhuis`（「池中已有四張」）。
**本棒把七個名字（連同其餘 14 個）逐一對 seed 17,248 列 ＋ 卡單／prop 共 27,160 列折鍵實掃，結果：**

| 名字 | seed 列數 | 卡單／prop | 實況 |
|---|---:|---:|---|
| `Norah Jones` | **4** | 9 | 派工信對；本組兩張都是新盤名 |
| **`Bill Frisell`** | **0** | 1 | ⚠ **seed 0 列**，唯一一張在 c-164 b 的 prop 裡（《Harmony》2019，尚未上線） |
| **`Terence Blanchard`** | **0** | 10 | ⚠ **seed 0 列**，五張全在 c-158～c-163 的卡單／prop |
| `Tony Allen` | 1 | 0 | 派工信對 |
| `Charles Lloyd` | 6 | 6 | 派工信對 |
| `Dr. Lonnie Smith` | **0** | **0** | ⚠ ⚠ **這一形逐字 0 列；裸名 `Lonnie Smith` 才是 6 列**（第 1909 條） |
| **`Trijntje Oosterhuis`** | **0** | **14 列／7 張** | ⚠ **派工信寫「池中已有四張」，實掃是七張**（第 1746 條寫的四張是 c-162 當時的數字，之後 c-161 b 與 c-162 a 又各加了張） |

⚠ ⚠ **「撞到就退」這句不能照字面執行，兩個理由**：
1. **同一位藝人的不同碟本來就各自成卡（第 1131 條）**——**本組 23 張裡有 13 張的掛名在池中已有卡，如果撞到掛名就退，這一組會只剩 10 張。** **真正要退的是「掛名＋盤名複合折鍵」撞卡**，本組 **23 張的複合折鍵對 seed 17,248 列與跨批 128 批／5,158 卡實測 0 命中。**
2. **名單本身會過期**：`Trijntje` 從四張變七張、`Dr. Lonnie Smith` 這一形根本不在池中。

**→ 本條與第 1738-B 條同向：派工信的名單只當掃描清單，結論一律以實掃為準。**

---

## 第 1919 條：**版本／軌數釘定——23 張裡有 11 張有兩種以上軌數，逐張在 `risk` 寫明釘哪一版**

| 卡 | 軌數分歧 | **釘** |
|---|---|---|
| `Gerald Clayton` | 歐／美 7 軌、日版 SHM-CD 8 軌（日本限定 bonus） | **7** |
| `Trijntje《Wonderful Christmastime》` | 黑膠 13 軌、荷版 CD 14 軌（**ghost track，未印在包裝上**） | **13** |
| **`Thomas Dutronc《Frenchy》`** | **2020-06-19 首版 14 軌、2020-12-04 加值版 21 軌（`format` 欄帶 `Reissue`）** | **14（Apple 1494289320）** |
| `Ben l'Oncle Soul` | CD／數位 11 軌、歐版 LP 12 軌 | **11** |
| `Nduduzo Makhathini` | 實體與 MB 11 軌、**Apple 逐字 12 軌** | **11** |
| `山中千尋《Rosa》` | 通常盤／LP 10 軌、初回限定盤 13 項（CD 10＋DVD 3） | **10** |
| `Arturo O'Farrill` | MB 數位與 Apple 14 軌、Discogs 歐版 CD 16 軌 | **14** |
| `Trijntje《Everchanging Times》` | CD／數位 13 軌、黑膠 15 軌 | **13** |
| `Norah Jones《…'Til We Meet Again》` | 美／歐 14 軌、日版 15 軌 | **14** |
| **`Norah Jones《I Dream of Christmas》`** | **標準 13、美版 CD／日版 14、Target 紅膠 15、2022 Deluxe 24–25** | **13（Apple jp 1586254158；⚠ 不要配到 1647472641 的 24 軌 Deluxe）** |
| `Charles Lloyd《Tone Poem》` | 美／歐 9 軌、日版 SHM-CD 10 軌 | **9** |
| `Tony Allen` | CD／數位 14 軌、黑膠 12 軌 | **14** |
| `Lonnie Smith《Breathe》` | CD／數位 8 軌、**黑膠 9 軌（多收〈Move Your Hand〉）** | **8** |

⚠ **`evidence-a/tracks.json` 取的是「軌數最多的那一筆 release」，所以撞陳列掃描用的是最大集合**——**掃得比實際上架的版本寬，不會漏；但下游選版要照上表。**

---

## 第 1920 條：**本信（派工信）與正本／既有裁定牴觸之處，三條**

依派工信第零節的要求（「你若發現本信與正本或既有裁定牴觸，以正本為準，並在回報裡指出來」）逐條列出。

### （一）**地雷 5「逗號式並列——第 1539 條取 `&`」——第 1539 條沒有這條規則**

第 1539 條的判準是「取 MB credited-name 串接那一種」，**它自己的結論字串用的是 `and the`。**
本張四邊零個 `&`，取 `&` 等於新造無出處的字串。**已照正本（第 1539 條原文）判逗號並列形，完整理由在第 1907 條。**

### （二）**第五節「日本線盤名以 `universal-music.co.jp` 為準」——本組不適用，已取拉丁形**

派工信逐字：「**日本線改查 `universal-music.co.jp/<藝人>/products/<目錄號>/`（`山中千尋` 走這條，日本線盤名以那裡為準）**」。
**該頁的商品名逐字是 `ローザ [通常盤] [SHM-CD]`。本棒仍取 `Rosa`，三個理由**：
1. **那個字串帶 `[通常盤] [SHM-CD]` 兩個版本裝飾詞，本來就不是可直接進卡池的盤名；**
2. **MB RG title、三筆日版 release title、Discogs 四筆、Apple jp 的 `collectionName` 逐字全部是 `Rosa`**，只有 MB 的 XW 數位 release 用 `ローザ`——**五比一**；
3. **第 1800／1801（7）條那條規則的來源案例是 quasimode，當時的情況是「MB 與 Discogs 的盤名都錯了，靠官網糾回來」——本張並沒有錯可糾。**

**`ローザ` 已寫進 `queryAlias`，與 c-163 b 對《Syncopation Hazard》寫 `シンコペーション・ハザード` 的處置一致。**
⚠ **建議把第 1801 條第 7 點那一句改寫成：「日本線的盤名，在 MB／Discogs 與官網不一致時以官網為準；兩者一致時不必因為官網用日文譯名就改。」**

### （三）**地雷 3「本組中 1 筆」與地雷 7「池中幾乎確定已有卡」——兩份名單都不完整**

前者已由協調者在工作中途更正為 2 筆（第 1904 條），後者的實掃結果見第 1918 條（七個名字裡有三個在 seed 是 0 列）。
**兩條都不是判斷錯誤，是「名單未經實掃就寫進派工信」——與第 1725／1738-B 條同一個毛病。**

⚠ **另記一處不算牴觸、但派工信少講了的**：**地雷 1 只提醒 `Tone Poem` 那一個系列名，但本組實際亮 `series` 欄的有兩張**——另一張是 `Immanuel Wilkins《Omega》` 的 `Vinyl Me, Please. Exclusive Pressing`（第 1912 條）。**後批的派工信對 (戊) 不要只點名 slice 的 `reissueSeries` 欄，Discogs 的 `series` 欄要逐張看。**

---

## 第 1921 條：**給 b 組與後批的七句**

1. ⚠ ⚠ **(戊) 的分界是「有沒有把舊母帶重新壓片」，不是「盤面印了哪個系列名」。** 看兩層：Discogs `format` 欄有沒有 `Reissue`、該版年份與 RG `frd` 差多少（第 1902 條）。**Tone Poet 從 2021 年起同時收舊碟重刻與當年新作。**
2. ⚠ ⚠ **第 1791 條的偵測訊號拿掉 `nReleases === 1`**：真正的訊號是「所有 release 都是 `Digital Media` ＋ `XW` ＋ `catno` 空」。**分辨真假陽性的那一句是「② Discogs 有沒有比 MB `frd` 更早的實體條目」**（第 1904 條的對照組）。
3. ⚠ ⚠ **(丙) 的判據只有一個：零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note（第 1784／1794 條的動作）。** **`André Manoukian` 是「第一格是 `Decca`、第二／三格才是 `Blue Note`」的關鍵案例**——只看第一格會誤退（第 1911 條 #11）。**℗ 欄第一格不是 Blue Note 只是「去查 Discogs 廠牌鏈」的提示。**
4. ⚠ **③ 的藝人頁要「裸名形與團名／頭銜形兩形都試」**（本組 `bill-charlap` 200／`bill-charlap-trio` 404，與第 1823 條的 `lonnie-smith` 恰好相反）；**藝人頁給不出細節時，站內的 releases／新聞稿頁值得多試一次**（第 1903 條的決定性證據就在新聞稿頁）。
5. ⚠ ⚠ **2016 年以後的批次不要查紙本、不要在 `risk` 寫「紙本 0」**（主線第 1728 條第 2 點）。**本組 23 張一個字都沒寫，`risk` 平均 2,216 字元全部花在掛名、標點碼位、版本釘定與年份覆核上。**
6. ⚠ ⚠ **標點碼位要逐字元核，`chk-prop` 標記 0 不等於沒問題**：它只擋連字號類字元與被當破折號用的 U+30FC，**撇號（U+0027／U+2018／U+2019）、刪節號（U+2026 vs `...`）、大小寫一律摺掉。** **本組五處都要人工判（第 1910 條）；house style 是「撇號取 ASCII、刪節號取 U+2026」。**
7. ⚠ **派工信的任何名單（觀察名單、池中已有卡名單、404 預測）都只當掃描清單**，結論一律以實掃為準（第 1918 條）。**「撞到就退」指的是掛名＋盤名複合折鍵撞卡，不是掛名撞卡。**

---

## 第 1922 條（收尾）：**交件數字、本棒改動的檔案、號段**

**交件**：`g: "a"` 23 筆全收、退 0、退貨率 0%。
**`node batch-progress/c165/chk-prop.mjs a` → 23 張、21 位、標記 0**（跨批 128 批／5,158 卡，跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0）。

**本棒新增／改動的檔案（全部在 `batch-progress/c165/` 底下，未 commit、未 push）**：
- `prop-a.json`（新建，23 筆，欄位與 `c163/prop-a.json` 逐字同構）
- `rulings.md`（新建，本檔，**號段 1900–1922，1923–1929 未用**）
- `evidence-a/SOURCES.md`（新建，來源清單與 ③ 實測狀態碼）
- `evidence-a/mb.json`／`apple.json`／`dg.json`／`tracks.json`（新建，批次抓取的原始資料，一抓完即入庫）
- `evidence-a/append.mjs`（新建，續跑用的併檔小工具）

**未碰**：`seed_cards.json`（只讀掃描）／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`prop-b.json`／`batch-progress/c164/` 任何檔／1930 起的號段。
**未執行**：`git commit`／`git push`／`git add`／`git reset`／`git revert`。

⚠ **留給本機的三件事**：
1. **`Charles Pasi《Zebra》` 的 `year: 2020` 覆核**（第 1904 條；若能取得法國實體盤的確切街頭日，以那個為準）。
2. **`Tony Allen《There Is No End》` 的 `['jazz','hiphop']` 覆核**（第 1915 條（3）；是否要讓他的兩張卡同時進世界音樂抽牌池）。
3. **`Joe Chambers《Mirrors》` 的年份**：③ 官網逐字 `his Blue Note debut, Mirrors, came out in 1998`，**而 c-155 a 的卡記 1999**——不是本組的卡，順手記在這裡。
