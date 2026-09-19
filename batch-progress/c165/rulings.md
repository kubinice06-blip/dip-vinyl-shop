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

---

# c-165 **b 組**裁定（號段 **1930–1948**）

**a 組用 1900–1922，本段從 1930 起，只 append、未改動 a 組任何一行**（第 1743-B 條（四））。

---

## 第 1930 條（交件總表）：**22 筆全收、退 0 筆，退貨率 0%；`chk-prop b` 標記 0**

| 項 | 數 |
|---|---:|
| 派下 | **22** |
| 收 | **22** |
| 退 | **0**（退貨率 **0%**） |
| 年份改判 | **0** |
| 新掛名字串 | **5** |
| 沿用池中／卡單既有字串 | **13 筆卡、13 個字串位**（見第 1932 條） |
| 掛名判裸名（不採 slice／MB 的長形） | **4**（三張《Trios》＋《Where Are We》） |
| 掛名判裸團名（去掉 feat. 子句） | **1**（《Succession》） |
| `chk-prop b` 標記 | **0**（22 張、18 位；跨批撞卡 0） |

**為什麼退 0 筆是合理的**：本組 22 筆全部是 2021–2023 年的碟，其中 20 張是當代新錄音、2 張是 (甲) 的庫藏首次發行。
**(乙)（庫藏再發）與 (戊)（四條再發系列）這兩種退件理由在這個年份格裡結構性地不會出現**——
它們擋的是「把 1950–70 年代的母帶重新壓片」，而本組沒有任何一張是那個形狀。
⚠ **(丙) 的訊號亮了 5 次、(戊) 的訊號亮了 3 次，逐筆查完全部不成立**（第 1934／1935 條）。

---

## 第 1931 條（退表）：**本組退 0 筆，退表為空**

**逐筆確認過沒有任何一筆該退**：22 筆的 MB `label-info` 或 Discogs 零售條目廠牌鏈都有 `Blue Note [713c4a95]`（第 1794 條的 imprint 前置閘 22／22 過閘）；
沒有一筆的 Discogs `format` 欄帶 `Reissue`（**在本卡釘定的那一筆 release 上**）；
沒有一筆的載體只有影像；沒有一筆與池中既有卡指向同一批錄音。

---

## 第 1932 條：**掛名總表——新字串 5、沿用 13、裸名裁定 4、裸團名裁定 1、新造分裂 0**

### （一）新字串 5（seed 17,248 列與卡單／各批 prop 共 15,720 列**兩層都實掃過，皆 0 命中**）

| 掛名 | MB 實體 | 第 307 條反查 |
|---|---|---|
| **`Julian Lage`** | Person `c116b504-ce24-4264-96dc-d10a7458236f` | 兩層 0 列；本組兩張領班卡共用此字串 |
| **`James Francies`** | Person `604f0692-4d31-479b-a93a-e4c75be21f81` | 兩層 0 列；⚠ seed 的 `James —《Laid》(1993)` 是英國同名樂團，折鍵後不同鍵，不併 |
| **`Johnathan Blake`** | Person `11b75b19-1265-4ee6-85a3-b68a7dfa9b9b` | 兩層 0 列；本組兩張領班卡共用此字串 |
| **`Melissa Aldana`** | Person `faa21ccf-f0d3-4a84-95d4-ae596aa40744` | 兩層 0 列；⚠ 她是 c-165 a `ARTEMIS` 的團員，但那張判團名形，字串不重疊 |
| **`Ethan Iverson`** | Person `bd6637bd-38bf-491e-8036-3044c139aec1` | 兩層 0 列 |

### （二）沿用既有字串 13 筆卡

`Dave McMurray`（c-164 卡單《Music Is Life》）／`Charles Lloyd`（**seed 5 ＋ c-163《Wild Man Dance》＋ c-164《8: Kindred Spirits》＝ 7 筆**，本組三張《Trios》沿用）／
`Immanuel Wilkins`（c-165 a《Omega》）／`Donald Byrd`（**seed 28 ＋ 卡單 15**）／`Trombone Shorty`（c-164《Parking Lot Symphony》）／
`Gerald Clayton`（c-165 a《Happening》）／`Ronnie Foster`（**seed 5**）／`Nduduzo Makhathini`（c-165 a《Modes of Communication》）／
`Bill Frisell`（**⚠ seed 0 列、卡單 c-164《Harmony》＋ c-165 a《Valentine》**）／`Elvin Jones`（**seed 10 ＋ 卡單 8**）／
`Kyoto Jazz Sextet`（卡單 c-163《Mission》＋ c-164《Unity》）／`山中千尋`（**卡單 c-163 ×3 ＋ c-164 ×3 ＋ c-165 a《Rosa》＝ 7 筆**）／`Joshua Redman`（**seed 2**）。

### （三）新造分裂 **0**
**18 個掛名字串逐一對 seed 折鍵反查（`&`→`and` 後剝非字母數字），無一與池中既有字串折出不同鍵。**
⚠ **唯一的非 ASCII 掛名是 `山中千尋`（漢字），`chk-prop` 的四道都不擋漢字**（盲點六），**但它與卡單層七張同字串，是沿用不是新造。**

---

## 第 1933 條（**地雷 1，本組最大的題目**）：**三張《Trios》一律判裸名 `Charles Lloyd`**

**slice 給的三種掛名形互不相同**，這正是問題本身：

| 碟 | `slice.json`／MB artist-credit 逐字 |
|---|---|
| 《Trios: Chapel》 | `Charles Lloyd feat. Bill Frisell & Thomas Morgan` |
| 《Trios: Ocean》 | `Charles Lloyd, Gerald Clayton, Anthony Wilson` |
| 《Trios: Sacred Thread》 | `Charles Lloyd, Zakir Hussain, Julian Lage` |

**實查四邊，三邊給裸名**：

| 來源 | 逐字 |
|---|---|
| **② Discogs（三張各 2 筆零售條目 ＋ 3LP 盒 23712383 ＋ 日版三片裝 28076530）** | **`artists` 欄全部是單一實體 `Charles Lloyd`，一筆 feat. 子句都沒有** |
| **④ Apple us／gb（1623224880／1639930633／1651929174）** | **`artistName` 全部逐字 `Charles Lloyd`**；feat. 一律被放進 `collectionName` 的括號裡 |
| ⚠ **MB** | RG 給三種長形；**但《Sacred Thread》的 CD release `770bac99` 的 artist-credit 逐字只有 `Charles Lloyd`——同一個 RG 的 release 層與 RG 層自己打架** |
| ⚠ **Apple jp** | 三張逐字都是 `チャールス・ロイド・クァルテット`（**片假名，而且寫成「四重奏」，與三重奏的事實不符**），不採 |

**→ 判裸名 `Charles Lloyd`，三張一致。四層理由**：

1. **第 1746 條（四）(a)：三邊計票二比一**，而且 MB 這一票自己在內部就不一致（上表第三列）。
2. **第 307 條**：**池中 `Charles Lloyd` 裸名已有 7 筆**（seed 5 ＋ c-163 ＋ c-164），另有 `Charles Lloyd & the Marvels Featuring Lucinda Williams`(seed) 與 `Charles Lloyd & The Marvels`(c-163、c-165 a) 兩種團名形。
   **三張各留一個長形，這位藝人在池中就會有六種字串、其中三種各只掛一張卡。**
3. **保護三位成員的既有字串**：`Bill Frisell`（c-164＋c-165 a ＋本組《Four》）、`Gerald Clayton`（c-165 a ＋本組《Bells on Sand》）、`Julian Lage`（本組兩張領班卡）——
   **長形會讓四位藝人同時分裂。**
4. **先例完全同形**：第 1746 條（四）的 `Willie Nelson & Wynton Marsalis featuring Norah Jones` 與 `Trijntje Oosterhuis feat. The Clayton–Hamilton Jazz Orchestra` 都判裸名，理由一模一樣。

⚠ **另一個選項（三張各用一個長掛名）明確評估過並否決**：三種長形彼此不同形、無法收斂成一個團名，
**它不是「建一個團名形」，是「建三個一次性字串」**——第 1703 條的團名形分界（池中有沒有同系列前作）在這裡根本套不上，因為那三個字串各自只有一張碟。

⚠ **代價寫明**：成員名全部寫進三張卡的 `why`／`risk` 與 `queryAlias`；三張盤名共用 `Trios: ` 前綴，
`dedup-crossbatch` 第三道若日後報「同掛名盤名詞元包含」是**本裁定刻意造成的預期輸出**（與第 1768 條的 `Black Radio`／`Black Radio 2` 同形），不必處理。
⚠ **本次實跑 `chk-prop b` 該道對三張《Trios》** **0 命中**（`chapel`／`ocean`／`sacred`／`thread` 彼此不含）。

**可逆性**：改的是卡單的 `artist` 欄字串，不動卡池結構，屬「可逆」，依裁定權下放第 2 條當場定。

---

## 第 1934 條（**地雷 2**）：**兩張現場庫藏盤都判 (甲) 收，逐字確認「從未發行過」**

### （一）`Donald Byrd《Live: Cookin' with Blue Note at Montreux》2022`

**三層都查了，三層一致**：
- **MB 全庫反查** `artist:"Donald Byrd" AND releasegroup:Montreux` → **只回一個 RG**（`e674d134`，frd `2022-12-09`）。
- **② Discogs 兩次搜尋**（`Donald Byrd Montreux` 29 筆、`Cookin' With Blue Note At Montreux` 21 筆）→
  **Byrd 名下只有 2022 年那五筆**；**1974 年那一批逐字是 Bobbi Humphrey／Marlena Shaw／Ronnie Foster／Bobby Hutcherson 四位，沒有 Byrd。**
- **③ `bluenote.com/artist/donald-byrd/`（200）逐字**：`Donald Byrd's dynamic 1973 live recording Live: Cookin' with Blue Note at Montreux gets its first-ever official release today on what would have been the legendary trumpeter's 90th birthday.`

**→ (甲) 成立，不是 (丁)：六軌沒有一軌先前出過。** 曲名層與 seed 的 `Donald Byrd —《Black Byrd》(1973)` 撞一處，
**但那是同一年的錄音室版、不是同一次錄音**，屬撞陳列不屬 (丁)。

⚠ ⚠ **第 1736-B 條的但書本組唯一一次要跑（盤名含 `Blue Note`），跑完是「不可疑」**：
該條要看的三者——**實體零售條目廠牌欄（Discogs 五筆第一格全部 `Blue Note`）、店面 ℗ 欄（Apple 三市場逐字 `Blue Note Records; ℗ 2013 UMG Recordings, Inc.`）、發行方官網（200 且逐字報導本碟）**——**三者一致指向 Blue Note 本廠**，
與《Live at Blue Note Tokyo》那種「三者一致指向他廠」正好相反。
**而且本張的 `Blue Note` 不是場地名**（companies 逐字 `Recorded At: Montreux Jazz Festival`），是 1974 年那個系列的名字。

⚠ **(戊) 不成立**：Discogs 五筆的 `series` 欄逐字都是 `Cookin' With Blue Note At Montreux`，**但它不在四條再發系列名單上、也不是 `Music Matters`**；
依第 1737-B 條看系列掛在哪一筆——**五筆全部是 2022 年的首發、`format` 欄全部沒有 `Reissue`。**

### （二）`Elvin Jones《Revival (Live at Pookie's Pub)》2022`

- **MB 全庫反查** `artist:"Elvin Jones" AND (releasegroup:Pookie OR releasegroup:Revival)` → **只回一個 RG**（`872880e5`）。
- **② Discogs** `Elvin Jones Pookie` 4 筆 → 三筆是 2022 年的本碟，第四筆逐字是 `Various —《Instrumentalists - Almost Forgotten》(1983, Columbia)`，無關。
- **③ `bluenote.com/artist/elvin-jones/`（200）逐字**：`a thrilling previously unissued live recording of Elvin Jones' quartet`，
  並逐字說它 `captures the legendary drummer's emergence as a bandleader at a little-known club in New York City where he had a weekly residency after leaving John Coltrane's band in 1966`。

⚠ ⚠ **派工信要求的掃池做完了，不撞**：`Elvin Jones` seed 10 列（含《Live at the Lighthouse》1973）＋卡單 8 筆，
**十八個盤名折鍵後沒有一個與 `Revival (Live at Pookie's Pub)` 同鍵。**
**c-163 a 退掉的《Live at the Lighthouse Vol. 2》是 (乙)（母體 1973 年就發過、正篇已在池中），本卡是 1967 年從未發行的錄音，兩者不同形。**

⚠ ⚠ **一個容易混的同藝人條目**：**Discogs `25315255`（2022 日版 `UCCU-45066/7`，`format` 逐字 `CD, Album, Reissue`、`series` 逐字 `Elvin Jones On Blue Note` ＋ `The Blue Note Re-Issue Series`）
是《The Prime Element》(1976) 的 CD 化，不是本卡**（曲目完全不同，而且《The Prime Element》池中已有卡）。**那一筆才是 (乙)＋(戊) 的形狀。**

---

## 第 1935 條：**三道前置閘的實測——imprint 22／22 過閘；(丙) 亮 5 次、(戊) 亮 3 次，全部不成立**

### （一）imprint 前置閘（第 1794 條）：**22／22 過閘**
判準照第 1784 條收斂出來的動作——「Discogs 零售條目的廠牌鏈裡有沒有 `Blue Note`」。
⚠ **第 1817 條的日本線陷阱逐張查過**：兩張日本線（《Succession》《Today Is Another Day》）的 MB `label-info` 逐字都是 **`Blue Note [713c4a95]`**，**不是 `Nihon Blue Note [76903afe]`**。

### （二）(丙) 的訊號亮 5 次，逐筆查完全部不成立

| # | 卡 | 亮燈的那一格 | 查完是什麼 |
|---|---|---|---|
| 1–3 | **三張《Trios》** | Discogs ℗© 兩欄逐字都是 **`Charles Lloyd` 本人** | notes 同句逐字接 `under exclusive license to UMG Recordings Inc.`——第 1753 條第 4 點／第 1770 條 (a)；**c-163 a 第 1794 條第 3 列的《Wild Man Dance》是同一位藝人、同一形狀** |
| 4 | **`Nduduzo Makhathini《In the Spirit of Ntu》`** | ⚠ **三格同時亮**：Apple ℗ 逐字 `℗ 2022 Universal Music (Pty) Ltd South Africa`；MB `b350ca81` 的 label 逐字 **`Blue Note Africa [ad2e5c11]`**；Discogs 無損檔條目廠牌欄逐字只有 `Universal Music` | 兩筆實體零售條目第一格逐字都是 `Blue Note`、另兩筆 MB release 逐字 `Blue Note [713c4a95]`。**`Blue Note Africa` 是 Blue Note 自己的地區 imprint（與第 1817 條要擋的 `Nihon Blue Note` 是另一家公司，不同）**；南非 Universal 是第 1770 條 (c) 的地區分工。**與 c-163 b `Marcus Miller《Afrodeezia》` 南非版同形** |
| 5 | **`Joshua Redman《Where Are We》`** | Apple 三市場 ℗ 逐字 `℗ 2023 Creative Control Corp., under exclusive license to UMG Recordings, Inc.` | 藝人自己那一側的公司 ＋ 獨家授權，第 1753 條第 4 點；**同一句最前面逐字就是 `Blue Note Records`** |

⚠ **另有兩筆「地區發行體系」的訊號，歸在 (c) 不另計**：《Succession》的 ℗ 逐字 `Extra Freedom Ltd.`（沖野修也自己的公司，Discogs notes 逐字給了 `www.extra-freedom.co.jp`）＋ `UNIVERSAL MUSIC LLC`；
《Today Is Another Day》的 ℗© 逐字 `Universal Music LLC`。**兩張的 Discogs 廠牌欄逐字都是 `Blue Note`，與第 1736-B 條的對照組 `山中千尋《Prima del Tramonto》` 同形，照那筆先例過閘。**

### （三）(戊) 的訊號亮 3 次，逐筆查完全部不成立（**三次都是第 1737-B 條的形狀**）

| 卡 | `series` 欄逐字 | 掛在哪一筆 | 判 |
|---|---|---|---|
| **`Johnathan Blake《Homeward Bound》`** | **`Blue Note Tone Poet Series`**（Discogs 35773909，`format` 逐字帶 `Reissue`） | **2025 年的黑膠復刻**；2021 年首發 CD 的 `series` 逐字空陣列、`format` 無 `Reissue` | **收** |
| **`Trombone Shorty《Lifted》`** | `Tipitina's Record Club`（Discogs 23170415） | 紐奧良俱樂部的**黑膠訂閱會員盤**，不在四條名單上；首發 CD 的 `series` 逐字空陣列 | **收** |
| **`Donald Byrd《Live: Cookin'…》`** | `Cookin' With Blue Note At Montreux`（五筆都有） | **五筆全是 2022 年的首發**，`format` 全無 `Reissue` | **收** |

⚠ ⚠ **第 1743-B 條（一）在本組被反向印證一次**：**`Johnathan Blake《Homeward Bound》` 的 `slice.json` `reissueSeries` 欄逐字是空陣列，但 Discogs 上真的有 Tone Poet 復刻。**
**`reissueSeries` 沒亮不等於沒有系列，一定要自己去 Discogs 看 `series` 欄。**

---

## 第 1936 條（**地雷 3**）：**`Ronnie Foster《Reboot》` 判新錄音，收——③ 官網逐字就是判據**

③ `bluenote.com/artist/ronnie-foster/`（200）開頭逐字：
`The 2022 return of Ronnie Foster to Blue Note Records for his first new album in 36 years, Reboot, is an event of synergistic quintessence, completeness, and cool that brings the organ great back home to the label where he released his debut album Two Headed Freap in 1972.`

**`format`／`series` 兩欄逐字確認**：Discogs 五筆的 `format` 欄逐字 `Vinyl, LP, Album, Stereo`／`Vinyl, LP, Album, Limited Edition, Stereo`／`CD, Album`，
**五筆全部沒有 `Reissue`**；**`series` 欄逐字全部空陣列**；`slice.json` 的 `reissueSeries` 逐字空陣列。
**錄音地逐字 `Recorded and Mixed by Josh Connolly at Capitol Studios, Los Angeles, CA`（Discogs 23906579 notes）——2022 年新錄。**
⚠ **序數依第 1732 條（三）處理**：`his first new album in 36 years` 是間隔敘述，不是廠牌目錄序數，一層即可。

---

## 第 1937 條（**地雷 4**）：**`Kyoto Jazz Sextet Feat.Takeo Moriyama` 判裸團名 `Kyoto Jazz Sextet`，feat. 子句不留**

**(a) 第 307 條（最硬的一條）**：**`Kyoto Jazz Sextet` 這個字串卡單層已有兩張（c-163《Mission》2015、c-164《Unity》2017）。**
**(b) `森山威男` 的池中狀態實掃過，兩種文字系統都在**：
**`森山威男` 在 `seed_cards.json` 有 1 列（`《East Plants》(1983)`，⚠ `r[8]` 逐字 `pearl`，是王牌卡）、另有 `森山威男カルテット —《My Dear》(1982)`；卡單層另有 `森山威男 —《Hush-A-Bye》(1978)`（c-51 prop）。羅馬字形 `Takeo Moriyama` 在兩層共 32,968 列裡 0 命中。**
**→ 留 feat. 子句的兩條路都製造分裂**：寫羅馬字會與 §0.5 與池中的 `森山威男` 分裂；寫漢字會造出 `Kyoto Jazz Sextet Feat.森山威男` 這種混文字系統的第三個字串（`chk-prop` 盲點六）。
**(c) 三邊的「藝人欄」都給裸團名**：
- **③ `universal-music.co.jp/kyoto-jazz-sextet/products/uccj-2206/`（200）的 H1 逐字 `Kyoto Jazz Sextet`**；
  同頁掛名行逐字並列 `KYOTO JAZZ SEXTET feat. 森山威男` 與拉丁對照 `Kyoto Jazz Sextet featuring Takeo Moriyama`。
- **② Discogs 2024 LP 條目 31387427 的 artists 欄逐字 `Kyoto Jazz Sextet`**（三筆 2022 CD 條目逐字是切壞的 `Kyoto Jazz SextetFeat.` ＋ `Takeo Moriyama` 兩實體，**那是建檔雜訊不是盤面掛名**）。
- **④ Apple gb `artistName` 逐字 `Kyoto Jazz Sextet`**、jp 逐字 `KYOTO JAZZ SEXTET`（全大寫，折鍵後同鍵）；feat. 被放進 `collectionName`（逐字 `Succession (feat. Takeo Moriyama)`）。

⚠ **`Feat.` 後面沒有空格是 slice 的原樣，一個字都沒照抄進掛名。**
⚠ **`森山威男` 與 `Takeo Moriyama` 兩形都寫進 `queryAlias`。**
⚠ **盤名保留拉丁形 `Succession`**（第 1743-B 條（三）：官網是用來解決 MB／Discogs 歧異的，不是用來改寫池中既有體例的；UMJ 的 `SUCCESSION[CD]` 是商品頁排版）。

---

## 第 1938 條：**`山中千尋` 與盤名體例——照主線第 1672 條與第 1743-B 條（三），一字未改**

**掛名取漢字 `山中千尋`**：Apple jp `artistName` 逐字 `山中千尋`；③ UMJ `universal-music.co.jp/chihiro-yamanaka/products/uccj-2215/`（200）的掛名行逐字並列 `山中千尋` 與 `Chihiro Yamanaka`；
MB／Discogs／Apple gb 逐字都是 `Chihiro Yamanaka`（寫進 `queryAlias`，§0.5 明文要求串流與 Last.fm 查詢用這個拼法）。
**卡單層已有七張同字串**（c-163 ×3、c-164 ×3、c-165 a《Rosa》），本卡是第八張。

**盤名保留拉丁形 `Today Is Another Day`**：UMJ 的盤名逐字帶 `[通常盤] [SHM-CD]` 規格尾綴，那是商品頁排版；MB／Discogs／Apple 三邊逐字同形，取三邊同形的那一種。

---

## 第 1939 條：**年份覆核——22／22 三層一致，改判 0 筆；唯一亮燈的一筆是 `Donald Byrd`**

**三層對照全部做完**（MB `first-release-date` × Discogs `released`／`year` × Apple `releaseDate` ＋ ℗ 年）：

- **21 筆三層一致到日**（多數還與 ℗ 年同年）。
- ⚠ ⚠ **`Donald Byrd《Live: Cookin'…》` 是唯一的例外，兩層對一層取 2022**：
  **MB frd 逐字 `2022-12-09`、Discogs 五筆 `year` 逐字全部 `2022`**；
  **Apple us／gb／jp 的 `releaseDate` 逐字 `2013-01-01T00:00:00Z`（第 1601 條的年初佔位日形狀）、℗ 年逐字 2013。**
  **℗ 2013 的來歷查清楚了**：母帶 2013 年（Byrd 過世那年）才從 Blue Note 庫房被找出來並登錄權利，**Discogs 上 2013 年沒有任何條目**。
  **第 1791 條的三個偵測訊號只中第三個，訊號不齊，不改判。**

### ⚠ **第 1721／1742-B 條的觀察名單：派工信說本組 0 筆，實測成立**
**逐張跑過三條件（`formats` 全為 `Digital Media` ＋ `countries` 只有 `XW` ＋ `catno` 全空）**：

| 卡 | 中幾條 | 結論 |
|---|---|---|
| `Julian Lage《View With a Room》` | **2／3**（catno 四筆全 null、但有一筆 XE 實體 CD、countries 含 `DZ`／`XE`） | 不中 |
| `Joshua Redman《Where Are We》` | **2／3**（catno 四筆全 null、countries 全 `XW`／null、**但有一筆 XW 實體 CD**） | 不中 |
| `Donald Byrd《Live: Cookin'…》` | **1／3**（countries 只有 `XW`，但有實體 CD 且帶 catno） | 不中 |
| 其餘 19 筆 | 0／3 | 不中 |

**→ 三條件全中者 0 筆，派工信的預測成立。**
⚠ **但兩筆 2／3 的卡另外用第 1791 條（二）覆核過**（「Discogs 在 MB 那個年份上完全沒有條目」）：
**《View With a Room》2022 年有五筆實體零售條目、《Where Are We》2023 年有六筆**——**明確不成立，不改判。**
⚠ **`Dave McMurray` 與 `Immanuel Wilkins`／`Nduduzo Makhathini` 三位被第 1721／1742-B 條點名過，但點的是別批的別張碟**，本組這幾張三條件一個都不中。

---

## 第 1940 條：**撞陳列——盤名撞 4 處（全在一張卡上）、軌名撞 18 處／14 張；⚠ 軌名撞 apex 王牌 2 處**

**掃法**：取每張 RG 轄下軌數最多的那一筆 release 的全部軌名 ＋ 盤名，折鍵後對 `seed_cards.json` 的 **17,248 列**（其中 **917 列帶 apex 旗標，在 `r[8]`**）逐一比對。

### （一）⚠ ⚠ ⚠ 盤名撞卡 4 處，**全部集中在 `Bill Frisell《Four》`，而且 `chk-prop` 四道一道都不會亮**（掛名不同、折鍵後不同鍵）

| 撞到 | 年 | 等級 |
|---|---|---|
| `Blues Traveler —《Four》` | 1994 | seed，非 apex |
| `Bloc Party —《Four》` | 2012 | seed，非 apex |
| `One Direction —《Four》` | 2014 | seed，非 apex |
| ⚠ **`Hampton Hawes —《Four!》`** | 1958 | seed，非 apex（**帶驚嘆號，折鍵後同鍵，而且同為爵士卡**） |

**四張全部非 apex、零軌重疊、非同碟**；⚠ **Hampton Hawes 那張是同曲風，陳列與簡介層一定要寫清楚是哪一張**（第 1699／1747 條的形狀）。
**盤名獨立掃 apex：22 張全部 0 處。**

### （二）軌名撞卡 18 處／14 張，**其中 2 處撞 apex 王牌**

| 本組卡 | 軌 | 撞到 | 等級 |
|---|---|---|---|
| ⚠ ⚠ **`Ethan Iverson《Every Note Is True》`** | 〈Blue〉 | **`Joni Mitchell —《Blue》(1971)`** | **apex `hall`**（另撞 `The Jesus Lizard —《Blue》(1998)`） |
| ⚠ ⚠ **`Kyoto Jazz Sextet《Succession》`** | 〈Watarase〉 | **`板橋文夫 —《Watarase》(1982)`** | **apex `pearl`**（⚠ **本軌正是翻奏該曲，而且 `森山威男` 也在那條日本爵士脈絡裡——他自己的《East Plants》(1983) 同為 `pearl`**） |
| `Dave McMurray《Grateful Deadication》` | 〈Fire On The Mountain〉 | `Highwoods String Band —《Fire on the Mountain》(1973)` | seed |
| `James Francies《Purest Form》` | 〈My Favorite Things〉 | `John Coltrane —《My Favorite Things》(1961)` | seed |
| `Johnathan Blake《Homeward Bound》` | 〈Steppin' Out〉 | `Harold Vick —《Steppin' Out!》(1963)` | seed |
| `Julian Lage《View With a Room》` | 〈Echo〉 | `Tom Petty and the Heartbreakers —《Echo》(1999)`、`Dave Burrell —《Echo》(1969)` | seed ×2 |
| `Immanuel Wilkins《The 7th Hand》` | 〈Witness〉 | `Katy Perry —《Witness》(2017)` | seed |
| ⚠ **`Donald Byrd《Live: Cookin'…》`** | 〈Black Byrd〉 | **`Donald Byrd —《Black Byrd》(1973)`（同一位藝人）** | seed |
| `Trombone Shorty《Lifted》` | 〈Lie to Me〉 | `Jonny Lang —《Lie to Me》(1997)` | seed |
| `Melissa Aldana《12 Stars》` | 〈Intuition〉 | `Linx —《Intuition》(1981)` | seed |
| `Gerald Clayton《Bells on Sand》` | 〈Rip〉 | `Actress —《R.I.P.》(2012)` | seed（點被折掉後同鍵） |
| `Ronnie Foster《Reboot》` | 〈Swingin'〉 | `Kenny Burrell —《Swingin'》(1980)` | seed |
| `Bill Frisell《Four》` | 〈Holiday〉／〈Always〉 | `The Magnetic Fields —《Holiday》(1994)`／`BIGBANG —《ALWAYS》(2007)` | seed ×2 |
| `Elvin Jones《Revival…》` | 〈My Funny Valentine〉／〈Oleo〉 | `Miles Davis —《My Funny Valentine》(1965)`／`Grant Green —《Oleo》(1980)` | seed ×2（**兩張都是爵士卡**） |
| `Joshua Redman《Where Are We》` | 〈By the Time I Get to Phoenix〉／〈Where Are You?〉 | `Injury Reserve —《By the Time I Get to Phoenix》(2021)`／`Frank Sinatra —《Where Are You?》(1957)` | seed ×2 |

**零撞陳列的 8 張**：《Squint》《Trios: Chapel》《Trios: Ocean》《Trios: Sacred Thread》《In the Spirit of Ntu》《Today Is Another Day》《Passage》（＋盤名層 21 張）。

⚠ ⚠ **一組「同一次音樂節、兩張卡」的交叉，下游必須分清楚**：
**seed 的 `Ronnie Foster —《Live at Montreux》(1974)` 是 1974 年 `Cookin' With Blue Note At Montreux` 系列真的發出來的四張之一，
而本組的 `Donald Byrd —《Live: Cookin' with Blue Note at Montreux》(2022)` 正是同一屆（1973 年 7 月）音樂節裡當年沒發的那一場；
同時 `Ronnie Foster` 本組另有《Reboot》(2022)。** **三張卡的簡介都會提到蒙特勒。**

⚠ **另一組交叉**：**`Gerald Clayton《Bells on Sand》` 的 Discogs extraartists 逐字 `Saxophone: Charles Lloyd`，而 Clayton 又是《Trios: Ocean》的三重奏成員**——**兩個方向的客座都不進 `artist` 欄。**

---

## 第 1941 條：**曲風取捨——`['jazz']` 18、`['jazz','soul']` 3、`['jazz','world']` 1**

| 組合 | 張 | 卡 |
|---|---:|---|
| `['jazz']` | **18** | 其餘全部 |
| `['jazz','soul']` | **3** | `Donald Byrd《Live: Cookin'…》`／`Trombone Shorty《Lifted》`／`Ronnie Foster《Reboot》` |
| `['jazz','world']` | **1** | `Nduduzo Makhathini《In the Spirit of Ntu》` |

**三個 `soul` 的依據**：
- **Donald Byrd**：Discogs 五筆 `style` 欄逐字全部 `Jazz-Funk`、一筆 `genre` 逐字含 `Funk / Soul`；**先例就在同一位藝人身上**（seed 的《Black Byrd》《Places and Spaces》逐字都是 `["jazz","soul"]`）。
- **Ronnie Foster**：Discogs 23963204 `genre` 逐字 `Jazz`＋`Funk / Soul`、`style` 逐字 `Jazz-Funk`；**seed 的 Ronnie Foster 五張逐字全部 `["jazz","soul"]`**，取 `["jazz"]` 反而製造同藝人曲風分裂。
- **Trombone Shorty**：**Discogs 六筆零售條目的 `genre` 欄逐字全部是 `Jazz` ＋ `Funk / Soul`**（不是單筆雜訊），`style` 逐字 `Funk`／`Soul`／`Jazz-Funk`／`Contemporary R&B`。
  ⚠ **與 c-164 卡單《Parking Lot Symphony》的 `["jazz"]` 不同，本棒不回頭改那張**——曲風欄逐張判，本卡的證據明顯更強。

**`world` 的依據**：Discogs 三筆的 `genre` 欄逐字全部 `Jazz` ＋ `Folk, World, & Country`、`style` 逐字 `African`；**與 c-165 a《Modes of Communication》的 `["jazz","world"]` 一致。**

⚠ **`world` 考慮過但沒取的一張**：**`Charles Lloyd《Trios: Sacred Thread》`**——Zakir Hussain 的塔布拉鼓是結構性的、曲名帶 Saraswati 與 Rumi，
**但 MB 與 Discogs 兩邊都沒有給任何世界音樂標籤**，依「取到有依據為止」不自造（比照 c-163 b `Marcus Miller《Afrodeezia》` 的寫法）。
⚠ `soul` 考慮過但沒取的一張：`Dave McMurray《Grateful Deadication》`（只有歐版一筆的 `style` 有 `Soul-Jazz`，兩筆的 `genre` 欄都只給 `Jazz`，且 c-164《Music Is Life》逐字是 `["jazz"]`）。

⚠ **被剔掉的標籤**：`contemporary jazz`（第 1572 條不跟，本組 7 張有）、`post-bop`／`free jazz`／`spiritual jazz`／`avant-garde jazz`／`smooth jazz`／`vocal jazz`／`instrumental jazz`／`fusion`／`modal`（都不在十類名單）。

---

## 第 1942 條：**`chk-prop` 七個盲點的逐字元核——四道都不亮，但有五張要人眼看**

`node batch-progress/c165/chk-prop.mjs b` → **22 張、18 位｜標記 0｜跨批撞卡 0**。
**派工信的地雷 6 逐字元核過了**：

| 字串 | 核什麼 | 結果 |
|---|---|---|
| `Live: Cookin' with Blue Note at Montreux` | 撇號碼位 | **ASCII U+0027**（逐字元掃 MB RG title，全欄無 >U+007E 字元） |
| `Revival (Live at Pookie's Pub)` | 撇號碼位 | **ASCII U+0027**，括號亦 ASCII |
| `Trios: Chapel`／`Trios: Ocean`／`Trios: Sacred Thread` | 冒號碼位 | **ASCII U+003A** |
| `Kyoto Jazz Sextet` | `Feat.` 有沒有被照抄 | **沒有**（feat. 子句整段不進 `artist` 欄） |
| `12 Stars` | 數字開頭 | **`chk-prop` 四道沒有一道針對數字開頭**；折鍵 `12stars`，對 seed 0 命中 |

**需要人眼看、機器不會亮的五處**（盲點二／六）：
1. **盲點二（大小寫）**：`View With a Room`（MB 小寫 `a` vs Apple／Discogs 大寫 `A`）、`Bells on Sand`（MB 小寫 `on`）、`In the Spirit of Ntu`（MB 小寫 `the`／`of`）、`Where Are We`（Apple 逐字全小寫 `where are we`）——**四張一律取 MB 形，寫進卡池的字元序列以 `album` 欄為準。**
2. **盲點六（跨文字系統）**：`山中千尋` 是漢字，`chk-prop` 不擋；**折鍵後與卡單層七張同鍵，是沿用不是新造。**
3. **盤名撞卡**：`Bill Frisell《Four》` 撞四張（第 1940 條（一））——**`chk-prop` 的任何一道都不會報。**

⚠ **一個「只報不擋」的已知良性輸出**：`共用目錄號 CA90028`——那是 Discogs notes 裡 Blue Note 好萊塢地址 `1750 North Vine Street, Hollywood, CA 90028` 被當成目錄號抓出來的，
**c-162 與 c-166 也各有一筆同樣的行**，不是真的共用目錄號。

---

## 第 1943 條：**六層證據的實測命中——② 22／22、④ 22／22、③ 20／22、①⑤⑥ 見下**

| 層 | 命中 | 備註 |
|---|---:|---|
| **② Discogs** | **22／22** | 每張至少兩筆零售條目，`format`／`series`／廠牌鏈／companies 四欄逐字取到 |
| **④ Apple** | **22／22** | ⚠ **兩張 `us` storefront 0 命中**（《Succession》《Today Is Another Day》，日本線常態），**jp／gb 有貨**；`Dave McMurray` 的 us 兩度回 403（代理端限流，不是店面查無） |
| **③ 廠牌官網** | **20／22**（見第 1944 條） | 日本線兩張改查 UMJ，**兩個 UMJ 路徑都回 200** |
| **① 紙本** | **本組不查** | 派工信明文：Billboard OCR 只覆蓋到 2015，本組全部 2021–2023，結構性查不到。**依第 1728 條（2），「紙本 0」不寫成缺失。** |
| **⑥ 維基** | 1（Donald Byrd 那張的旁證） | 只用來交叉確認「首次發行」，不當主要依據 |
| **⑤ AllMusic** | 0 | 未使用 |

---

## 第 1944 條：**③ `bluenote.com` 的實際回應碼——18 個路徑實測，15 個 200、2 個 404、1 個 301**

⚠ **派工信要求「實測後回報實況」（第 1738-B 條第 2 點），實測結果如下**（用不跟隨轉址的 `curl -o /dev/null -w '%{http_code}'`，依第 1731-B 條）：

| 路徑 | 碼 |
|---|---|
| `julian-lage`／`dave-mcmurray`／`james-francies`／`johnathan-blake`／`charles-lloyd`／`immanuel-wilkins`／`donald-byrd`／`trombone-shorty`／`melissa-aldana`／`ethan-iverson`／`gerald-clayton`／`ronnie-foster`／`nduduzo-makhathini`／`bill-frisell`／`elvin-jones` | **200**（15 個） |
| `kyoto-jazz-sextet` | **404** |
| `chihiro-yamanaka`（另測 `yamanaka-chihiro` 與漢字路徑，亦 404） | **404** |
| ⚠ **`joshua-redman`** | **301 → `bluenote.com/artist/joshua-redman-2/`（200）** |

⚠ ⚠ **`joshua-redman` 的 301 是本線第一次記錄到的形狀**：**後批查這位藝人要直接寫 `-2` 那個路徑**；
依第 1731-B 條，`curl -L` 會自動跟隨、看起來「還能用」，**但那是轉址撐著的，不是正確網址。**

**日本線兩張改查 UMJ，三個路徑全部 200**：
`universal-music.co.jp/kyoto-jazz-sextet/products/uccj-2206/`、
`universal-music.co.jp/chihiro-yamanaka/products/uccj-2215/`、
`universal-music.co.jp/chihiro-yamanaka/products/uccj-9241/`。

---

## 第 1945 條：**版本／軌數釘定——22 張裡 5 張有兩種以上軌數或載體，逐張釘一版**

| 卡 | 情形 | 釘哪一版 |
|---|---|---|
| `Immanuel Wilkins《The 7th Hand》` | CD／數位 7 軌；歐版 LP 兩面 4＋3 軌；**測試壓片只有 3 軌**（`sides C and D of the full album`） | **7 軌** |
| `Elvin Jones《Revival…》` | US CD 是兩片 5＋4 軌；數位單一媒體 9 軌；3LP 三片 | **9 軌** |
| `山中千尋《Today Is Another Day》` | 通常盤 SHM-CD 10 軌；限定盤 UHQCD 10 軌 **＋ DVD-Video 4 軌**；2023 LP 10 軌 | **10 軌** |
| `Kyoto Jazz Sextet《Succession》` | CD 7 軌；Universal Music Store 限定版 **CD 7 軌 ＋ DVD 現場 6 軌** | **7 軌** |
| 三張《Trios》 | 各自 5／4／7 軌；**另有 3LP 盒 `B003531401` 與日版三片裝 `UCCQ-1178/80` 把三張合裝** | **各釘自己那一版；合裝不另開卡、固定試聽不要配到盒裝的 id** |

⚠ **另有兩筆「同名但不是本卡」的店面條目，探測鏈要擋開**：
**`Johnathan Blake《Passage》` 的 Apple 先行單曲 `Passage - Single`（1693521721，1 軌，2023-07-07）**；
**`Julian Lage《View With a Room》` 同市場另回 `Nels Cline & Julian Lage —《ROOM》`（1850026648，2014，Mack Avenue）。**

⚠ **一張的店面標題長度差超過探測鏈門檻**：**`Kyoto Jazz Sextet《Succession》` 的 Apple `collectionName` 逐字 `Succession (feat. Takeo Moriyama)`，與卡上的 `Succession` 差 25 字，超過 `titleOk` 的 8 字門檻**——
**這會是第 1741-B 條的 `N→0` 形狀（碟在架上、標題比對沒過），本機拿到 `apple-candidates.md` 時直接人工覆核即可。**

---

## 第 1946 條：**本信（派工信）與正本／既有裁定牴觸之處——0 條**

**逐條核過，本次沒有發現派工信與 `ALBUM_ONBOARDING.md`／`REMOTE_RUNBOOK.md`／`CLAUDE.md` 或既有裁定牴觸的地方。**
派工信標「預期」的三處都實測了，**三處都與實況相符或更寬**：

1. **「第 1721／1742-B 條的觀察名單本組 0 筆」** → **實測成立**（第 1939 條）。
2. **「`slice.json` 的 `note` 欄是切片器的推測」** → **本組唯一一筆 `note`（《Succession》的「僅 JP 盤」）覆核後成立**，但要加一句：
   **MB 與 Discogs 確實只有日本條目，Apple 的 `us` 也 0 命中——但 `gb` 有貨，數位層是全球上架的。**「僅 JP 盤」對實體成立、對數位不成立。
3. **「③ 的 404 名單不是常數」** → **實測到一個派工信沒預告的形狀：`joshua-redman` 回 301**（第 1944 條）。

⚠ **一處派工信寫得比正本嚴、本棒照正本做**：派工信地雷 2 說「若部分軌先前出過就改判 (丁)」。
**兩張庫藏盤的軌名確實都與池中既有卡撞到**（Byrd 的〈Black Byrd〉、Elvin Jones 的〈My Funny Valentine〉〈Oleo〉〈Keiko's Birthday March〉），
**但那是「同一首曲子的不同次錄音」，不是「同一批母帶先前發過」**。
**(丁) 判的是錄音的重疊，不是曲名的重疊**——照正本的六句判準走，兩張都判 (甲) 收，撞到的部分寫進 `risk`。

---

## 第 1947 條（**操作事故與處置，必讀**）：**雲端 scratchpad 目錄與 c-166 的代理共用，中間檔被覆寫一次**

**事發經過**：本棒把分批寫好的提案存在 `<scratchpad>/parts/p1.json`～`p4.json`，每五筆合併一次寫進 `prop-b.json`（續跑安全的做法）。
**跑到第三個檢查點時發現 `prop-b.json` 的內容變成 c-166 a 組的 15 筆 ＋ 本組的 7 筆**——
實查 `<scratchpad>/parts/` 的檔案時間戳，**`p1.json`／`p2.json`／`p3.json` 三個檔在 04:26／04:31／04:35 被改寫，內容逐字是 c-166 a 組的碟**。
**根因：雲端 scratchpad 路徑對同一個工作階段底下的多支代理是共用的，而 `p1.json` 這種通用檔名必然相撞。**

**處置**：本棒把三個檔的內容從自己的上下文逐字重建，改存到 **`<scratchpad>/c165b-parts/c165b-p1.json`～`c165b-p4.json`**（帶批號與組別的檔名），
重新合併後 **逐筆驗過 22 筆的 `g` 欄全部是 `b`**，`chk-prop b` 重跑 **標記 0、跨批撞卡 0**。
⚠ **c-166 的檔案一個字都沒動**（`batch-progress/c166/prop-a.json` 15 筆、`prop-b.json` 6 筆維持原狀）。

**本條立為往後並行派工的體例（建議主線採納）**：
1. **中間檔的檔名一律帶批號與組別**（`c165b-p1.json`，不要用 `p1.json`／`part1.json` 這種通用名）。
2. **合併寫檔前要加一道自檢**：`if (all.length !== N) throw` ＋ `if (all.some(x => x.g !== '<本組>')) throw`。
   **本次就是靠「`g` 欄不是 `b`」這個特徵才一眼認出來的**——若兩組的 `g` 欄剛好相同，這個事故會靜靜通過。
3. ⚠ **`CLAUDE.md` 已經為 `PROJECT_MEMORY.md`、第 1743-B 條（四）已經為 `rulings.md` 訂了「不要整檔覆寫」的規矩，
   但那兩條管的是 repo 內的共用檔；本條是同一個毛病在 scratchpad 上的版本**，而 scratchpad 沒有 git 可以救。

---

## 第 1948 條（收尾）：**交件數字、本棒改動的檔案、號段**

**改動的檔案只有兩個**：
- **`batch-progress/c165/prop-b.json`**（新建，22 筆，170 KB 級）
- **`batch-progress/c165/rulings.md`**（**只在檔尾 append 第 1930–1948 條，a 組的 1900–1922 段一行未動**）

**沒有動**：`seed_cards.json`（唯讀掃描）／`PROJECT_MEMORY.md`／KV／Firestore／`prop-a.json`／`batch-progress/c166/` 底下任何檔案。
**沒有 commit、沒有 push、沒有 `git add`。**

**用掉的號段：1930–1948（19 條）。1923–1929 留空給 a 組或主線。**

**給下游的四句**：
1. **三張《Trios》全部掛裸名 `Charles Lloyd`**，成員名在 `why`／`risk` 裡，簡介務必寫明各是哪一組三重奏。
2. **`Bill Frisell《Four》` 的盤名撞四張卡**（含同曲風的 `Hampton Hawes —《Four!》`），陳列要迴避。
3. **兩張現場庫藏盤（Byrd 1973 蒙特勒、Elvin Jones 1967 Pookie's Pub）的「錄音年」與「發行年」差 49 與 55 年**，簡介兩個數字不要混用。
4. **`Kyoto Jazz Sextet《Succession》` 的固定試聽多半會是第 1741-B 條的 `N→0`**（Apple 標題帶 feat. 尾巴），本機直接人工覆核候選。

---

## 第 1947-A 條（補記，**給主線／本機**）：**中途檢查點 `ca78a81` 收進的 `c165/prop-b.json` 是被覆寫過的版本，不可使用**

第 1947 條那次覆寫剛好被一個中途檢查點提交進去了。實查兩個提交：

| 提交 | `c165/prop-b.json` | 內容 |
|---|---:|---|
| **`ca78a81`**（「c165 策展 b 15/22」） | 15 筆 | ⚠ ⚠ **`g` 欄有 `a` 也有 `b`**——**前 5 筆逐字是 c-166 a 組的碟**（Arturo O'Farrill《Legacies》／Chris Botti《Vol. 1》／Dave McMurray《Grateful Deadication 2》／Kendrick Scott…《Corridors》／Walter Smith III《return to casual》），後 10 筆才是本組的 |
| **`a4f72fd`**（「c165 策展 b 22 筆」，目前 HEAD） | **22 筆** | **全部 `g: "b"`，逐筆對得上 slice 的 b 組 22 筆，`chk-prop b` 標記 0** |

**→ 依第 1726 條「下游動作只能吃驗收版、不得吃檢查點」，`ca78a81` 那一版直接忽略即可；HEAD 這一版是正確的。**
⚠ **`c166/prop-a.json` 與 `c166/prop-b.json` 本棒一個字都沒動**，那 15 筆在 c-166 自己的檔案裡是完整的，沒有遺失。
⚠ **一眼認出來的特徵是 `g` 欄**：**往後並行批次的檢查點提交前，跑一次 `node -e "require('./batch-progress/<批>/prop-<組>.json').every(x=>x.g==='<組>')"` 就能擋住這一類。**

---

# c-165 研究 b 組（22 張）——第 1960–1966 條

## 第 1960 條（交件總表）：**22 張全 `full`，facts 264 條、`src` 全 https 264／264，`qa-batch research c165` 的 b 組警告 0**

| 項目 | 數字 |
|---|---|
| 張數 | **22／22**，`key` 與卡單 b 組逐字同序（程式比對 `JSON.stringify` 全等） |
| `status`／`coverage` | **22 張皆 `full`／`full`**，`thin` 0 |
| facts | **每張 12 條、合計 264 條**（上限 12，全部打滿） |
| `src` | **264／264 是完整 `https://` 網址**；38 個 `bluenote.com`／`universal-music.co.jp` 網址逐一以 `curl -o /dev/null -w '%{http_code}'` 實測，**全部 200**（其中一個是本棒自己拼錯後查出來並改正的，見第 1965 條） |
| `hookCandidates` | **每張 2 條**，無一張超過上限 |
| 禁字／字元 | 程式逐字掃過，禁字 0、千分位逗號 0；**日文新字體 `会` 一處（引 UMJ 商品名的「ライヴ会場限定盤」）被 `qa-batch` 擋下，已改寫成中文敘述** |
| `qa-batch research c165` | **b 組 22 張 0 警告**；唯一剩下的 `⚠ key 集合與卡單不一致` 是 **a 組尚在進行（當時 15／23）**造成的批次層警告，與 b 組無關 |

---

## 第 1961 條：**四張無串流全部覆核命中，三張《Trios》的 `collectionId` 互不相同**

**走的路徑一律是第 1753-B 條的第 1 步**——`batch-progress/c165/apple-candidates.md` 已有候選 id，直接 `itunes.apple.com/lookup?id=…&entity=song`，**四張一次命中，沒有用到第 2／3 步（藝人裸名反查、UPC 反查）**。

| 卡 | `collectionId` | 樂曲軌數 | 盤名 | 年份 | 判 |
|---|---|---|---|---|---|
| **`Charles Lloyd《Trios: Chapel》`** | **`1623224880`** | **5 對 5**（Discogs CD 23741012 五軌、MB 五軌、Apple `trackCount` 逐字 5，逐軌一一對應） | 店面逐字 `Trios: Chapel (Live) [feat. Bill Frisell & Thomas Morgan]`，差異只在 `(Live)` 與 feat. 子句 | MB frd 逐字 `2022-06-22`（美版）、Apple 逐字 `2022-06-24`，**差 2 天** | **命中** |
| **`Charles Lloyd《Trios: Ocean》`** | **`1639930633`** | **4 對 4** | 店面逐字 `Trios: Ocean (Live) [feat. Anthony Wilson & Gerald Clayton]` | 三邊逐字都是 `2022-09-23` | **命中** |
| **`Charles Lloyd《Trios: Sacred Thread》`** | **`1651929174`** | **7 對 7** | 店面逐字 `Trios: Sacred Thread (feat. Julian Lage & Zakir Hussain)` | 三邊逐字都是 `2022-11-18` | **命中** |
| **`Kyoto Jazz Sextet《Succession》`** | **`1615143143`** | **7 對 7** | 店面逐字 `Succession (feat. Takeo Moriyama)`，長度差 25（第 1945 條預告的形狀） | 三邊逐字都是 `2022-04-13` | **命中** |

⚠ ⚠ **三張《Trios》的 id 逐字互不相同**（`1623224880` ≠ `1639930633` ≠ `1651929174`），第 1433 條的要求成立；**合裝的 `Trio Of Trios`（`1649706072`，16 軌）不是任何一張的 id，固定試聽不可配到它。**

⚠ ⚠ **《Succession》是第 1775-B 條第五種成因的又一例**：**`us` 市場的 `lookup` 直接回傳完整條目**（`artistName` 逐字 `Kyoto Jazz Sextet`），
**`jp`／`gb`／`us` 三個市場共用同一個 `collectionId`**——碟在架上，落空的只是搜尋索引與標題比對。**「`/search` 回 0」對上架狀態確實沒有證據力。**

⚠ **一個逐軌比對才看得出來的差異**：**四張的店面軌名每一軌都帶尾綴**——三張《Trios》帶 `(feat. …) [Live]`、《Succession》在 `jp` 帶 `(feat. 森山威男)`、在 `gb`／`us` 帶 `(feat. Takeo Moriyama)`。**比對前要先剝尾綴，否則字串長度全部不過。**

---

## 第 1962 條：**推翻策展層一處（`Julian Lage《Squint》` 的自作曲軌數）**

**卡單 `curatorWhy` 逐字寫「十一軌裡十軌是自作曲」，實查是九軌。**
依據是同一筆條目（Discogs `19106557`）自己的出版欄，逐字：

- `Tracks A1 to A4, A6 to B4: Published by Julian Lage Music [BMI]` → **A1、A2、A3、A4、A6、B1、B2、B3、B4 共 9 軌**
- `Track A5: Published by Primary Wave Songs [ASCAP]` → 第五軌〈Emily〉，`Written-By` 欄逐字 `Johnny Mandel` 與 `Johnny Mercer`
- `Track B5: Public Domain` → 末軌〈Call Of The Canyon〉，`Written-By` 欄逐字 `Billy Hill`

**③ 官網的曲目表（`julian-lage-shares-new-single-familiar-flower-announces-north-american-tour/`）逐字在括號裡標作曲人，同樣是 9＋2。**
**→ facts 寫九軌，`notes` 已標明推翻了哪一句。** 其餘 21 張與策展層的敘述逐條核對後**沒有需要推翻的地方**。

---

## 第 1963 條：**③ 四條路徑的實際回應碼——18 個 `bluenote.com` 藝人頁 ＋ 3 個 UMJ 商品頁 ＋ 22 篇新聞稿，全部實測**

### （一）藝人頁（`/artist/<slug>/`，不跟隨轉址）：**與第 1944 條完全一致**

| 路徑 | 碼 |
|---|---|
| `julian-lage`／`dave-mcmurray`／`james-francies`／`johnathan-blake`／`charles-lloyd`／`immanuel-wilkins`／`donald-byrd`／`trombone-shorty`／`melissa-aldana`／`ethan-iverson`／`gerald-clayton`／`ronnie-foster`／`nduduzo-makhathini`／`bill-frisell`／`elvin-jones` | **200**（15 個） |
| **`joshua-redman-2`** | **200**（照第 1933 條直接用 `-2`，本棒沒有再去踩那個 301） |
| `kyoto-jazz-sextet` | **404** |
| `chihiro-yamanaka` | **404** |

### （二）⚠ ⚠ **WP 路徑本棒改用 `posts` 端點，比 `search` 端點好用一個量級**

第 1752-B 條路徑 (1) 寫的是 `wp-json/wp/v2/search`，**那支只回標題與網址**。
**實測 `https://www.bluenote.com/wp-json/wp/v2/posts?search=<關鍵字>&per_page=2` 會直接回 `content.rendered` 全文**，
**22 張裡有 22 張靠它拿到發行方的逐字新聞稿**（含引述、編制、錄音時地、題獻對象）——**本組 264 條 facts 有超過三分之一出自這一層。**
⚠ **另一支更精準**：`…/posts?slug=<文章 slug>`，用 `search` 端點先取 slug、再用 `posts?slug=` 取全文，兩步就定位。
**建議後批的派工信把這兩支寫進第 1752-B 條路徑 (1)。**

### （三）日本線（路徑 (4)）：**三個 UMJ 路徑全部 200，slug 順序再次驗證第 1751-B 條**

| 路徑 | 碼 |
|---|---|
| `universal-music.co.jp/kyoto-jazz-sextet/products/uccj-2206/` | **200**（H1 逐字 `Kyoto Jazz Sextet`） |
| `universal-music.co.jp/chihiro-yamanaka/products/uccj-2215/` | **200**（H1 逐字 `山中千尋`） |
| `universal-music.co.jp/chihiro-yamanaka/products/uccj-9241/` | **200** |
| ⚠ `universal-music.co.jp/sextet-kyoto-jazz/products/uccj-2206/`（反序測試） | **404** |
| ⚠ `universal-music.co.jp/yamanaka-chihiro/products/uccj-2215/`（反序測試） | **404** |

⚠ **UMJ 頁給出兩筆 Discogs 與 Apple 都沒有的事實**：《Succession》的 `録音方式 オール・アナログ録音`、以及只在官方商店與演出現場賣的 DVD 付き版本（品番逐字 `D2CZ-1051`）。**日本線值得每張都查。**

---

## 第 1964 條：**本組自己下的六個裁定（照「裁定權下放」當場定，各一行）**

1. **`Squint` 的自作曲軌數取 9 不取 10**——出版欄逐字可數，策展層那句不採（第 1962 條）。
2. **`Trios: Chapel` 的年份以卡單的 2022 為準，不因 MB 美版 `2022-06-22` 與 Apple `2022-06-24` 差 2 天而另記**——同年同月，差異寫進 facts 即可。
3. **《Trios: Sacred Thread》的時長以 CD 條目為準**——黑膠條目 `25256662` 的 A2／A3／A4 時長明顯錯位，Apple 逐軌與 CD 條目 `25240642` 對得上。
4. **UMJ 商品名裡的日文新字體不照抄**——「ライヴ会場限定盤」被 `qa-batch` 當簡體字擋下，改寫成中文敘述；**專名照抄的原則讓位給 QA 硬標記，因為那是商品規格尾綴而不是作品名。**
5. **價格欄一律不寫進 facts**——UMJ 的 `¥3,300`／`¥4,400`／`¥4,070` 都帶千分位逗號，與禁令衝突，且對簡介無用。
6. **同姓但來源沒寫關係的一律不推斷**——`Indigo Lund`／`Lage Lund`（12 Stars）、`Jeff Clayton`／`John Clayton`（Bells on Sand）、`Kaylie Foster`／`Chris Foster`（Reboot）、`Omagugu Makhathini`／`Nduduzo Makhathini`（Ntu）四組只寫欄位字串；**有來源的三組才寫**（Blake 的父親 John Blake, Jr.、Clayton 的父親 John Clayton、Foster 的兒子 Chris Foster，官網三處皆逐字）。

---

## 第 1965 條（本棒自己的錯，已修正）：**我在一條 `src` 上憑印象補了前綴，網址回 404**

`Ronnie Foster《Reboot》` 那條引 `Isn't She Lovely` 新聞稿的 `src`，我寫成
`bluenote.com/organ-great-ronnie-foster-releases-new-version-of-stevie-wonders-isnt-she-lovely/`——
**`organ-great-` 是隔壁那篇的前綴，本篇的 slug 逐字是 `ronnie-foster-releases-new-version-of-…`。**

**交件前把 38 個 `bluenote.com`／UMJ 網址整批 `curl` 過一遍才抓到，改正後回 200。**
**本條立為研究層的交件前動作**：**`src` 只要不是從工具輸出原樣複製的，交件前一律整批驗一次回應碼**——
描述型 `src` 已經被第 1728 條擋掉了，但「看起來對、其實拼錯」的網址下游一樣打不開。

---

## 第 1966 條：**與正本牴觸之處——0 條；派工信的三處預告全部實測相符或更寬**

`desc-tools/prompts/research-base.md`（含開頭那節雲端三處例外）、`CLAUDE.md`、第 1718–1778 條與第 1900–1948 條逐條核過，**本次沒有發現派工信與正本牴觸的地方。**

派工信標為預期的三處，實測結果：

1. **「四張無串流全是 `0→0`、第一步查 `apple-candidates.md` 就能救」** → **成立，四張全部第一步命中**（第 1961 條）。
2. **「三張《Trios》的掛名一律裸名 `Charles Lloyd`」** → **成立**：Discogs 三張的 `artists` 欄、Apple 三個 id 的 `artistName` 逐字都是裸名；MB 的 RG 層才給長形。
3. **「`Kyoto Jazz Sextet《Succession》` 是 `N→0` 的近親」** → **比預期更寬**：標題長度差 25 確實成立，**但 `us` 市場的 `lookup` 本身就命中**，所以它其實是第 1775-B 條第五種成因（搜尋索引撈不到、店面有貨），不是純粹的標題比對失敗。

⚠ **一處派工信少講、實測補上的**：**第 1752-B 條路徑 (1) 的 WP 端點應該用 `posts` 而不是 `search`**（第 1963 條（二））——`search` 端點拿不到正文，本組若只用它，③ 這一層的命中會從 22 掉到 0。

---

# c-165 **鉤子層 a 組**（23 張）——第 2036–2048 條

**號段 2036–2075 為本棒專用，實際用到 2048，2049–2075 未用。只 append，未改動前面任何一行。**
產出：`desc-tools/batches/hooks/c165-hooks-a.json`（23 筆，`key` 與卡單 a 組逐字同序）。

---

## 第 2036 條（交件總表）

| 項目 | 數字 |
|---|---|
| 張數 | **23／23**，`key` 與卡單 a 組 `JSON.stringify` 全等同序 |
| 欄位 | 只有 `key`／`hook`／`note` 三欄 |
| **字元預算（`hook` ＋ Σ 各項目 ＋ 末尾會進正文的句子）** | **全部 ≤230；實測 209–230，中位數 219** |
| 預算分佈 | 200–209：**1**｜210–219：**11**｜220–229：**9**｜230：**2** |
| 主故事鏈項目數 | 四項 **19** 張、三項 **4** 張（`Omega`／`Rainbow Sign`／`…dreaming in lions…`／`…'Til We Meet Again`，都是整格捨去後的結果） |
| `hook` 加權長度（英數 0.5） | **19–35.5**，上限 50，無一張逼近 |
| `note` 原始字元 | **194–235**，上限 350，`qa-batch` 的 `note>350` 提示一次都沒觸發 |
| `node qa-batch.mjs hooks c165` | **a 組標記 0、`互指?` 0 行**（唯一的總標記是 `⚠ b 缺 hook 檔`，b 組尚未交件，與 a 組無關） |
| `node chk-hook-crossgroup.mjs c165` | 開頭前四字相同 **0**、校對痕跡 **0**、分數星等 **0**、禁語 **0**；同構關鍵詞待人工判斷 **1 項**（見第 2039 條） |

---

## 第 2037 條：**字元預算——本批的偏差方向是「心算低估」，幅度 5–41%，根因是拉丁專名密度**

依第 1780-B 條，**沒有沿用上一批的係數，23 張逐項用 `Array.from().length` 實際量。**
**第一輪草稿 23 張裡有 15 張超標**，實測值比動筆時的心算高 **5–41%**（最極端是 `Ron Miles《Rainbow Sign》`：心算約 222、實測 313）。

**根因量化**：本組 `hook` ＋各項目的字元裡，**拉丁字母與阿拉伯數字佔 37.4%**。
Blue Note 線的班底、錄音室、出版社全是拉丁專名，**一個 `Jazz Orchestra Of The Concertgebouw` 就是 36 個字元、抵得上 36 個漢字**，而心算時會把它當成「一個詞」。
⚠ **給後批的一句**：**2010 年代以後的 Blue Note 批，專名密度結構性偏高，草稿階段一律假設會超標，先寫三項、量完再決定要不要加第四項**，比先寫四項再砍便宜。

### 整格捨去清單（18 張各捨一至二格，逐張列出捨掉的是什麼）

| 卡 | 整格捨去的內容 |
|---|---|
| `ARTEMIS` | 六國成員名單（美、加、法、智利、以色列、日本）；末軌「由 Rosnes 重編」那半格 |
| `Trijntje《Wonderful Christmastime》` | 兩位鋼琴手分軌彈完整張碟 |
| `Thomas Dutronc` | 另五軌雙語標題的曲名；〈Get Lucky〉四位作者的名單 |
| `Ben l'Oncle Soul` | 三間錄音室全名（31db Studio／Studio K／Anchor Recording Studio），只留城市 |
| `Nduduzo Makhathini` | `SABC Studios` 與 12 月 19 至 22 日的確切日期，只留「12 月四天」 |
| `Bill Frisell《Valentine》` | 〈Baba Drame〉〈A Flower Is A Lovesome Thing〉〈What The World Needs Now Is Love〉三個曲名，只留三位作者 |
| `Immanuel Wilkins《Omega》` | **整格**：後四軌的編號樂章與同字末軌 |
| `Ron Miles` | **整格兩格**：五人班底名單；〈Like Those Who Dream〉15 分 56 秒的長度落差 |
| `山中千尋《Rosa》` | 〈Yardbird Suite〉〈Someday Somewhere〉兩個曲名；她自己的鋼琴與 Rhodes、John Davis 的鼓 |
| `Arturo O'Farrill` | **整格**：十人編制與三位打擊樂手；Adam O'Farrill 吹小號那半格 |
| `Terence Blanchard` | `Mo Ostin Recording Studio` 全名與「四天錄成」（後者另因骨架歸屬讓給 `Bill Charlap Trio`） |
| `Norah Jones《…'Til We Meet Again》` | **整格**：Pete Remm／Christopher Thomas／Brian Blade 的班底；里約那一晚的確切日期 |
| `Art Blakey` | **整格**：〈Now's The Time〉22 分 34 秒與兩段半分鐘的〈The Theme〉 |
| `Norah Jones《I Dream of Christmas》` | **整格**：Brian Blade 與 Russ Pahl 的班底；〈Christmastime〉〈You're Not Alone〉兩個曲名 |
| `Bill Charlap Trio` | 兩位 Washington 的全名（改寫成「兩位 Washington」，省 32 字元）；〈Street Of Dreams〉曲名（盤名同字，正文自會帶出） |
| `Tony Allen` | 客座名單（`Sampa The Great`／`Danny Brown`／`Lava La Rue`） |
| `André Manoukian` | **整格**：〈Sous Le Soleil Exactement〉與 Isabelle Adjani；純器樂那格的編制細目 |
| `Charles Lloyd《Tone Poem》` | **整格**：〈Dismal Swamp〉那軌改吹中音長笛；The Marvels 的貝斯與鼓 |
| `Joe Chambers` | **整格**：〈Never Let Me Go〉與 Stephanie Jordan；Andrew Hill 與 Brad Merritt 兩個名字 |
| `Lonnie Smith《Breathe》` | **整格**：Jonathan Kreisberg 與 Johnathan Blake（改寫成「回到三重奏」）；兩首錄音室曲的曲名 |

**捨的一律是整格或整串專名，沒有任何一張是把長句硬砍成半句留給寫作層。**

---

## 第 2038 條：**骨架歸屬——八條有爭議的骨架，八張卡各擁有一條；讓出的卡一個字都沒寫**

照 `hook-base.md` 雲端註記第 3 點：**只有擁有者在 `note` 裡寫「這條骨架全批只走本張」，讓出的卡不寫、也不點名歸給了誰。**
**哪條歸哪張列在這裡給主線與 b 組看。**

| # | 骨架（句子結構） | **擁有者** | 讓出的卡（它們改走什麼軸） |
|---|---|---|---|
| 1 | **盤名的出處＋作者自述** | **`Ron Miles《Rainbow Sign》`** | `Gerald Clayton`（改走編制中途縮編）、`Arturo O'Farrill`（改走兩組曲換鼓手）、`Tony Allen`（改走節拍與身後發行） |
| 2 | **演奏者自述為何要留下現場錄音** | **`Lonnie Smith《Breathe》`** | `Gerald Clayton`（現場那一層只寫場地與編制，不引他談現場的話） |
| 3 | **一人包辦多個 credit 欄位** | **`Nduduzo Makhathini`** | `山中千尋`（改走三個週年）、`Charles Pasi`（改走缺席的貝斯聲部）、`Tony Allen`（改走時序） |
| 4 | **逝世使本作成為身後之作** | **`Tony Allen《There Is No End》`** | `Lonnie Smith`（改走「辭世與黑膠上市」的載體時序，不用遺作框架） |
| 5 | **與廠牌關係的回歸敘事** | **`Joe Chambers《Samba de Maracatu》`** | `Lonnie Smith`／`Charles Lloyd`／`Bill Charlap Trio`／`Bill Frisell`／`Gerald Clayton`／`Ron Miles` 六張全部讓出，一句「他在這個廠牌的第幾張／回到這個廠牌」都沒寫 |
| 6 | **同一個職位交給多人分擔** | **`Trijntje《Wonderful Christmastime》`**（六位編曲者） | `Ben l'Oncle Soul`（七位製作人那條讓出，改走封面縮名與跨城市錄音）、`Trijntje《Everchanging Times》`（改走 Bacharach 本人掛監修欄） |
| 7 | **全碟曲目出自單一他人之手** | **`André Manoukian`**（十二軌一位作者） | `Thomas Dutronc`（改走雙語標題）、`Bill Charlap Trio`（改走三個三分之一）、`Trijntje《Everchanging Times》`（改走監修欄） |
| 8 | **錄音在極短天數內完成** | **`Bill Charlap Trio`**（兩天） | `Nduduzo Makhathini`（四天，只留月份）、`Terence Blanchard`（四天，整句捨去） |

**其餘 15 張各自走的軸互不同構，不構成爭議，因此一句歸屬都沒寫**（照第 1787-B 條，沒有爭議就不要寫，寫了只會多出 `互指?` 要複核）。

⚠ **給 b 組的一句**：**上表第 5 條是本組最擁擠的一條**——Blue Note 線幾乎每張卡的官網稿都有「回到這個廠牌」那句話，
**a 組已經把它整條鎖在 `Joe Chambers` 上，b 組若也要用，請自己在 b 的號段裡另立一條、不要沿用本表。**

---

## 第 2039 條：**`chk-hook-crossgroup` 唯一的待判項——「辭世」×3，判為三種不同骨架，不改**

機器標的是 `Norah Jones《…'Til We Meet Again》`／`Tony Allen《There Is No End》`／`Lonnie Smith《Breathe》` 三張同時出現「辭世」。**逐張看過，三種形狀完全不同**：

1. **`…'Til We Meet Again`**：辭世的是**第三人** `Chris Cornell`，本碟末軌是在同一個場地、他辭世前幾天的演出後錄下的致敬——這是**場地與時序**的骨架。
2. **`There Is No End`**：辭世的是**作者本人**，節拍生前完成、人聲身後疊上——**身後之作**的骨架，本組的擁有者。
3. **`Breathe`**：辭世的也是本人，但軸是**載體時序**（多收一軌的雙黑膠版在他辭世後兩個多月才上市），`note` 的末尾寫的是「並寫明辭世與黑膠上市的時序」，沒有用遺作框架。

**三張都屬於反向禁令的第一類（與作品直接綁定），依題材原則『招牌事實必寫、克制不是跳過』一律寫入，並各自要求正文寫明時序。**
**不改寫、不刪除任何一張。** ⚠ 這條也是給後批的提醒：**`chk-hook-crossgroup` 的 `SKELETON` 表掃的是關鍵詞，同一個詞底下可以有完全不同的骨架，這個標記不能自動當成違規。**

---

## 第 2040 條：**`互指?` 0 行——不是機器沒跑，是逐字核過的結果**

`qa-batch hooks c165` 對 a 組的 23 張 `hook` 與 23 條 `note` 跑完事實對照，**硬標記 0、`互指?` 0 行。**
依第 1763-B 條「`互指?` 每一筆都要人工看過」，**本組是零筆，但仍把跨卡重疊的專名逐一人工核了一次**，因為零筆的成因可能是「兩張卡的研究稿都有這個名字、所以機器不報」：

| 跨卡重疊的專名 | 出現在 | 人工判讀 |
|---|---|---|
| `Bill Frisell` | `Tone Poem`（側手） | ✓ 正確：官網稿的 The Marvels 編制逐字有他；`Valentine` 那張才是他當主角，兩張沒有互換 |
| `Thomas Morgan`／`Rudy Royston` | `Valentine` | ✓ 正確：是 Frisell 三重奏的兩人，`Rainbow Sign` 的班底整格已捨去，不會混 |
| `Jason Moran` | `Omega`（製作人） | ✓ 正確：`Rainbow Sign` 的班底整格已捨去 |
| `Wayne Shorter` | `Absence`（致敬對象）／`First Flight to Tokyo`（台上樂手）／`Samba de Maracatu`（當年替他打鼓） | ✓ 三處各自成立，三張的研究稿都各有 `src` |
| `Iggy Pop` | `Frenchy`（對唱）／`Breathe`（頭尾兩軌合唱） | ✓ 兩處各自成立 |
| `John Clayton` | `Wonderful Christmastime`（〈Baby, It's Cold Outside〉的編曲） | ✓ **不是 `Gerald Clayton`**，兩人是不同的名字、不同的卡，逐字核過 |
| `Brian Blade` | `I Dream of Christmas` 的班底格已捨去 | ✓ 現在只剩零處 |

---

## 第 2041 條：**派工信與 `hook-base.md`（正本）牴觸之處——0 條；三處出入寫在這裡**

依派工信第一節「本信若與 base 檔牴觸，以它為準，並在回報裡指出本信哪一句寫錯了」逐條核過，**沒有一句與正本相反。** 三處值得記的出入：

1. **派工信第一節：「掃一遍 `rulings.md`（第 1917–1966 條在最後）」——號段寫得不完整。**
   本檔實際的區段是 **1900–1922（策展 a）、1930–1948 ＋ 1947-A（策展 b）、1960–1966（研究 b）**；
   **研究 a 組沒有留下任何裁定條文**（1949–1959 全空）。**本棒改為整檔讀過。**
   ⚠ 這不影響判斷，但**「第 1917–1966 條」這個範圍會讓後棒漏掉 1900–1916 那十七條**，其中第 1902／1903／1904 條正是本批三張卡的判準來源。
2. **派工信第三節第 3 點：「`互指?` 每一筆都要人工看過再判」——本組是零筆。**
   本棒仍照第 1763-B 條的用意做了等價的人工核（第 2040 條的表），**因為零筆本身也可能是假陰性。**
3. **派工信第三節第 5 點：「骨架歸屬照 hook-base 雲端註記第 3 點寫」——正本說的是「有爭議才寫」。**
   本棒因此**只在八張卡上寫歸屬句、其餘 15 張一句都沒寫**。若派工信的原意是「23 張每張都要寫一句」，那會與正本第 1787-B 條相反（每批多出十幾行 `互指?`），**以正本為準。**

---

## 第 2042 條：**hook 的四型輪換與開頭前四字**

- **四型分佈**：懸疑 **7**（`Wonderful Christmastime`／`Addicted to You`／`Modes of Communication`／`Omega`／`…dreaming in lions…`／`Zebra`／`Everchanging Times`）、場景 **5**（`ARTEMIS`／`…'Til We Meet Again`／`First Flight to Tokyo`／`I Dream of Christmas`／`Samba de Maracatu`）、人物定調 **2**（`Street of Dreams`／`Breathe`）、斷言 **9**。
  ⚠ **第一輪草稿有 17 張是斷言**，量完預算之後才回頭把四張改成問句型——**改成問句平均只多 1 至 4 個字元，是本批最便宜的一種調整。**
- **四個懸念型的 hook 全部在 `note` 的主故事鏈第一或第二格就收尾**（六個名字＝六位編曲者、六個欄位＝他一人、低音從哪來＝`Bass Moog` 合成器、監修欄為什麼也是他＝Bacharach 本人掛 `Supervised By`）。
- **開頭前四字 23 張互異**（`chk-hook-crossgroup` 第 1 項 0 命中）。⚠ 最接近的一組是 **「十三軌聖」（`Wonderful Christmastime`）與「十二軌的」（`Les Pianos de Gainsbourg`）**——機器判為互異，**但 b 組請避開「十N軌…」這個開頭形，三張就會開始看起來像同一支代理寫的。**

---

## 第 2043 條（本棒自己下的四個裁定，照「裁定權下放」當場定）

1. **週年數字用中文數字，不用阿拉伯數字**（`Rosa` 的「貝多芬兩百五十年、Charlie Parker 一百年、她自己出道十五年」）。
   依據：正本的規則是「**年月日與榜單名次**一律阿拉伯，**年代與概略數量**維持中文」——**週年數兩邊都不屬於**，本棒歸到「數量」那一邊。同理 `First Flight to Tokyo` 的「五十六頁的書」、`Wonderful Christmastime` 的「一千五百張」都用中文數字。**年齡則用阿拉伯**（`Tony Allen` 的 79 歲、`Immanuel Wilkins` 的 22 歲、`Lonnie Smith` 的 75 歲生日演出），因為那是可數的確切值且常與日期並列。
2. **研究層推翻策展層的五處，鉤子層一律照研究層寫**：`ARTEMIS` 的三處作曲歸屬、`Bill Frisell` 的〈Baba Drame〉與自作曲八軌、`Arturo O'Farrill` 的組曲來源（**不是 Rita Dove，是 Malpaso Dance Company 與 Hemingway**）與 14 軌、`Bill Charlap Trio` 的〈Your Host〉作者是 Kenny Burrell、`Joe Chambers` 的〈Visions〉歸 Bobby Hutcherson。**這些點有兩層獨立來源，策展層只有一層。**
3. **廠牌目錄序數 23 張一條都不寫。** 研究層對 `Bill Frisell`／`Charles Lloyd`／`Lonnie Smith` 三張都逐字記下官網稿有「第 N 張」，並依第 1732 條（一）判定 2020 年以後的碟沒有紙本那一層。**鉤子層照判，`note` 裡連「他在這個廠牌的第一張」這種身分敘述也只保留在 `Joe Chambers` 一張上**（那張的軸就是回歸本身）。
4. **`Charles Pasi《Zebra》` 的發行年寫 2020**，與卡單上游原記的 2021 不同，照策展層第 1904 條與研究層的改判。`note` 的年份指定句逐字寫「發行年寫 2020 年。」，並在主故事鏈裡寫明「2020 年 9 月 14 日實體上架」，讓寫作層不必知道 MB 的 2021 數位補發日。

---

## 第 2044 條：**兩處「否定讀者沒有的前提」的自我檢查結果**

依 2026-08-08 那條規則，對三個帶否定詞的寫法逐一自檢：

1. **`Zebra` 的 hook「三個人的編制裡沒有貝斯手，低音從哪裡來？」——保留。**
   讀者對「三重奏」確實有「應該有低音聲部」的前提，這個否定**指向的是編制事實本身**，不是研究層的更正外漏；而且它立刻被問句導向答案，`note` 第二格就交代是 `Fred Dupont` 用 `Bass Moog` 彈的。
2. **`Street of Dreams` 的「兩位 Washington 同姓但沒有親屬關係」——保留。**
   讀者看到兩個同姓的人**本來就會有親屬的前提**，而且官方發片稿自己加了那句括號說明，**這是原始事實不是校對痕跡。**
3. **`First Flight to Tokyo` 原草稿的「此前從未發行過」——改寫。**
   這一句是研究層「(甲) 從未發行過的錄音」判定的外漏，改成正面的「**2021 年首度發行**」，並在末尾的年份句補「寫成 1961 年的錄音在 2021 年首度發行」。**避免寫作層把「不是再版」表演給讀者看。**

---

## 第 2045 條（**操作事故，已無損失，但要記給主線**）：**中途檢查點 `f1fff21` 收進的 `c165-hooks-a.json` 是 5／23 的中間版本**

本棒依派工信第三節第 2 點「每做完 5 張就把整份輸出檔寫回磁碟」存檔，**主線在其中一次存檔之後就做了檢查點提交**（`f1fff21 checkpoint: c166 回撈候選表＋c165 鉤子 a 中途存檔`）。
**那個 commit 裡的 `c165-hooks-a.json` 是前五張的中間版本，而且那五張後來又因為四型輪換與專名去重改過 hook。**

**處置**：本棒收工時的工作區版本才是交件版（23 筆、預算全部 ≤230）。**未 `git add`、未 `git commit`、未 `git push`，由主線統一提交。**
⚠ **給主線的一句**：**續跑型代理的「每 N 筆存檔」與檢查點提交會互相踩到**（與第 1947-A 條同一個形狀）。
**檢查點提交若收進某個代理仍在跑的輸出檔，commit 訊息要寫明它是中間版本、不可直接餵下游。**

---

## 第 2046 條：**與 `hook-base.md` 各節的逐條對照——全過**

- 曲風源流／廠牌規則（2026-08-08／08-02）：**沒有任何一張因為「別張寫過」而不寫廠牌**；唯一的限制照規則走反同構（第 2038 條第 5 條）。
- 「派工詞裡的常識不算事實」（2026-08-11）：**23 張的每一個專名、日期、曲名、編制都能在該卡的 `facts` 或研究稿 `notes` 裡對到**，`qa-batch` 的事實對照 0 硬標記就是機器側的佐證。**沒有一條需要回報主線落空。**
- 「研究稿的卡池現值是過期快照」（2026-08-14）：**本組沒有把任何一處寫成「待主線處理的卡池問題」。** 唯一與卡池有關的是 `Zebra` 的年份，已照第 2043 條（4）寫成正面指派句。
- 古典卡通則：**本組 0 張古典卡**，`Rosa` 有兩軌貝多芬改編，但那是爵士盤裡的翻奏軌，照一般專輯規則寫。
- 分數與星等：**hook 與 note 全數 0 處**。`Omega` 的「紐約時報年度第一名」是榜單名次、`Happening` 的葛萊美兩項是入圍，兩者都不是評分。
- 正面表述：**23 條 `note` 沒有一句「不得寫」「禁補」「查無來源」「卡池標錯」「未能查證」。**

---

## 第 2047 條：**給 b 組的四句**

1. ⚠ ⚠ **第 2038 條的八條骨架已被 a 組鎖走**，尤其**第 5 條（廠牌回歸敘事）擠了六張讓出的卡**——b 組的 22 張裡 `Charles Lloyd` 三張《Trios》、`Ronnie Foster《Reboot》`、`Donald Byrd`、`Elvin Jones` 都極可能撞到，**請在 b 的號段裡另立一條並自己指定擁有者。**
2. ⚠ ⚠ **字元預算的心算在這條線上一定低估**：拉丁字元佔比 37.4%，**先寫三項、量完再決定加不加第四項。**
3. ⚠ **開頭前四字避開「十N軌…」與「他說…」兩種形**（a 組各用掉一個），也避開 `2018`／`1960`／`Tone` 三個已用掉的開頭。
4. ⚠ **`chk-hook-crossgroup` 的「同構骨架」標記不是旗標**：它掃關鍵詞，同一個詞底下可以有完全不同的骨架（第 2039 條），**逐張看過再判，不要為了清掉它而改寫正確的內容。**

---

## 第 2048 條（收尾）：**交件數字、本棒改動的檔案、號段**

**交件**：`desc-tools/batches/hooks/c165-hooks-a.json`，**23 筆**，`key` 與卡單 a 組逐字同序。
**`node qa-batch.mjs hooks c165` → a 組標記 0、`互指?` 0**（總標記 1 是 `⚠ b 缺 hook 檔`，b 組尚未交件）。
**`node chk-hook-crossgroup.mjs c165` → 開頭／校對痕跡／分數星等／禁語全 0，1 項同構關鍵詞經人工判為三種不同骨架、不改。**

**本棒新增／改動的檔案**：
- `desc-tools/batches/hooks/c165-hooks-a.json`（23 筆，覆蓋 `f1fff21` 收進的 5／23 中間版本）
- `batch-progress/c165/rulings.md`（本段，**號段 2036–2048，2049–2075 未用**）

**未碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`prop-a.json`／`prop-b.json`／
`c165-hooks-b.json`／`batch-progress/c164`／`c166`／`c167`／`c168` 的任何檔／1900–2035 的號段（只讀未改）。
**未執行**：`git add`／`git commit`／`git push`／`git reset`／`git revert`。
**臨時檔**：全部寫在雲端 scratchpad，檔名一律帶 `c165-ha-` 前綴（第 1947 條的教訓），repo 內沒有殘留。

---

# c-165 **鉤子層 b 組**裁定（號段 **2049–2066**）

**a 組用 2036–2048，本段從 2049 起，2071–2075 未用；1900–2048 只讀未改**（第 1743-B 條（四））。

---

## 第 2049 條（交件總表）

| 項目 | 數字 |
|---|---|
| 張數 | **22／22**，`key` 與卡單 `group === "b"`、研究稿 `c165-b.json` 三邊 `JSON.stringify` 全等同序 |
| 欄位 | 只有 `key`／`hook`／`note` 三欄 |
| **字元預算（公式見第 2050 條）** | **全部 ≤230；實測 179–229，中位數 211** |
| 預算分佈 | 未滿 200：**4**｜200–209：**7**｜210–219：**4**｜220–229：**7**｜達 230：**0** |
| 主故事鏈項目數 | 三項 **3** 張、四項 **16** 張、五項 **3** 張 |
| `hook` 加權長度（英數 0.5） | **18–26**，上限 50 |
| `note` 原始字元 | **184–234**，上限 350，`note>350` 一次都沒觸發 |
| `node qa-batch.mjs hooks c165` | **全部通過 ✓**，b 組標記 **0**、`互指?` **0 行**（a 組交件後原本的 `⚠ b 缺 hook 檔` 也一併消失） |
| `node chk-hook-crossgroup.mjs c165` | 45 張全掃：開頭前四字相同 **0**、校對痕跡 **0**、分數星等 **0**、hook 禁語 **0**、hook 否定句 **0**、hook 句末缺標點 **0**、長度超標 **0**；待人工判斷 **1 項，全部落在 a 組**（「辭世」×3，第 2039 條已判，b 組 0 命中） |

---

## 第 2050 條：**字元預算的公式（本批用 a 組 23 張做過回歸驗證，逐字重現其數字）**

⚠ 派工信要求「交件時把你用的公式寫清楚」，並指出**主線與 a 組對「各項目」的界定差了最多 21 字元**。
**本棒沒有自己另訂一套，而是先把 a 組交件檔倒回去算，找出唯一能重現第 2036 條那組數字的公式，再套到 b 組。**

```
budget = Array.from(hook).length
       + Array.from( note 去掉「主故事：」前綴
                        、去掉所有「→」
                        、去掉「這條骨架全批只走本張。」
                        、去掉「正文只寫上列各項。」 ).length
```

**算進去的**：主故事鏈的每一格、末尾的**年份指定句**（「發行年寫 2022 年。」）、**引用／載體／時序交代句**
（「〈Watarase〉寫明是板橋文夫原曲的翻奏。」「寫成 1967 年的現場在 2022 年首度發行。」）。
**不算的**：`主故事：` 前綴、`→` 符號，以及兩句**指派／排除句**（骨架歸屬句與「正文只寫上列各項。」）——
它們不進正文，正合雲端註記第 2 點「指派／排除句不算」。

**回歸驗證（這是本條的重點）**：以上公式套 `c165-hooks-a.json` 的 23 張，得到
**範圍 209–230、中位數 219、分佈 200–209 一張／210–219 十一張／220–229 九張／230 兩張**——
**與第 2036 條的表逐格相同。** 因此本批 a、b 兩組的預算是同一把尺量的，可以直接並排比較。

### 本批的偏差方向與 a 組不同，再次印證「上一批的係數不可繼承」

- a 組實測**心算低估 5–41%**、拉丁字元佔 **37.4%**。
- **b 組實測拉丁字母與阿拉伯數字佔 32.5%（1,504／4,622），比 a 組低了 4.9 個百分點。**
  原因是 b 組有三張日本線／南非線的卡（`Kyoto Jazz Sextet`、`山中千尋`、`Nduduzo Makhathini`），
  漢字專名（森山威男、沖野修也、板橋文夫、財津和夫）與音譯（納許維爾、開普敦、紐奧良）把比例拉了下來。
- **但草稿仍然全面超標**：第一輪 22 張裡 **9 張超過 230**，最極端的 `Ronnie Foster《Reboot》` 草稿實測 **290**（超標 26%）——
  根因是那張的軸本身就由四個拉丁專名串成（`Two Headed Freap`／`Mystic Brew`／`A Tribe Called Quest`／`Electric Relaxation`），
  **一格就 66 個計入字元。**
- ⚠ **給後批的一句**：**低估的幅度會變，低估這件事不會變。** 照 a 組第 2037 條的做法「先寫三項、量完再決定加不加第四項」是對的；
  本棒補一句：**軸本身由專名串成的卡（取樣、系列名、跨廠牌），草稿階段直接假設要砍掉一整格。**

---

## 第 2051 條：**整格捨去清單（22 張全部有捨，逐張列出捨掉的是什麼）**

**捨的一律是整格或整串專名，沒有任何一張把長句砍成半句留給寫作層。**

| 卡 | 整格捨去的內容 |
|---|---|
| `Squint` | 〈Familiar Flower〉題獻 Charles Lloyd 那一格（題獻骨架讓給 `Passage`）；他點名的三張範本（`Idle Moments`／`Inner Urge`／`Time for Tyner`，36 個計入字元）；〈Day And Age〉盤面與曲目表的兩種寫法 |
| `Grateful Deadication` | 作曲欄那六個名字（Garcia／Hunter／Weir／Lesh／Kreutzmann／Hart）；他自己掛的六件樂器 |
| `Purest Form` | 六位客座名單（Wilkins／Ross／Moreno ＋ 三位歌手）**整格**；〈Rose Water〉的人聲加弦樂四重奏改編 |
| `Homeward Bound` | 兩首題獻曲**整格**（Ana Grace Marquez-Greene 與 Lawrence "Lo" Leathers）；首軌曲名〈In The Beginning Was The Drum〉（29 個計入字元）；Pentad 五人的姓名 |
| `View With a Room` | 「把低音壓到近乎管風琴」（只在研究稿 `sound` 欄、不在 `facts`，見第 2064 條）；錄音地 `The Bridge Studio` 與製作人位置與前作對調那一格 |
| `Trios: Chapel` | 五軌時長（7:24–12:20）；獻詞給 Phil Schaap；Joe Harley 的監修欄 |
| `Trios: Ocean` | 〈Jaramillo Blues〉題獻畫家夫婦**整格**；Lloyd 同時吹中音、次中音與中音長笛；黑膠壓片廠 |
| `Trios: Sacred Thread` | 「他說那是他聽見印度召喚的時候」那句自述；1973 年《Geeta》與當年 Billboard 評語**整格**；七軌由兩人分著寫；黑膠把〈Guman〉印成 Gunman |
| `The 7th Hand` | 封面意圖（南方黑人洗禮的重製）**整格**；Micah Thomas 的 Mellotron；前作在紐約時報的年度名次 |
| `Live: Cookin'…Montreux` | **整格**：Gilles Peterson 2013 年的 email 與 16 軌 2 吋類比母帶（庫藏骨架讓給 a 組，見第 2053 條）；當年那四張的四位藝人名單（省 55 個計入字元）；三首原創的曲名 |
| `Lifted` | **整格**：`Buckjump Studio` 與製作人 Chris Seefried；Lauren Daigle 那一軌的客座對應；他一人掛的多件樂器 |
| `12 Stars` | **整格**：2021 年 5 月 17 與 18 日的錄音日期（「極短天數」骨架 a 組已佔）；2013 年 Monk 大賽的紀錄與她父親 1991 年那屆；〈Intro To Emilia〉0:39 |
| `Every Note Is True` | 合唱名單裡的 Mark Morris、Isaac Mizrahi 等人名；〈Blue〉出自 Jack DeJohnette 那一格；封面畫作與畫家 |
| `Bells on Sand` | **整格**：錄音地 `Sam First` 與 `Santa Barbara Sound Design`；〈My Ideal〉在碟上出現兩次（讓給 `Grateful Deadication` 的〈Touch Of Grey〉）；他掛的四件樂器 |
| `Reboot` | **整格三格**：題獻 Dr. Lonnie Smith（見第 2056 條）；1970 年在 Grant Green 碟上當側手、Francis Wolff 因此注意到他那條廠牌起源；首軌鼓手是他兒子 Chris Foster。另捨〈Isn't She Lovely〉與〈Summer Soft〉兩個曲名 |
| `In the Spirit of Ntu` | **整格**：〈Senze'Nina〉與反種族隔離年代那句問句；六位南非團員的姓名；Jaleel Shaw 的名字（只留「全碟唯一的美國樂手」） |
| `Four` | **整格**：三首帶人名的題獻曲（Alan Woodard／Claude Utley／Hal Willner）；第十軌全碟唯一的鋼琴獨奏（讓給 `Homeward Bound`） |
| `Revival` | **整格**：Coltrane 1967 年 7 月 17 日辭世這個時間座標（見第 2056 條）；〈Gingerbread Boy〉的客座 Larry Young；四軌超過十八分鐘與各自的曲名；3LP／2CD 的書冊規格 |
| `Succession` | 〈Father Forest〉曲名；五位團員的姓名；限定盤的 DVD |
| `Today Is Another Day` | 其餘五位作曲者（Farrés／Telson／Zeitlin／Arlen／Jarrett 之外的）；錄音地 `East Side Sound` 與母帶 Greg Calbi；封面與內頁的分工 |
| `Where Are We` | **整格**：四位客座的姓名與各自對應的曲名（只留「兩位彈吉他、一位吹小號」）；碟末三軌 Alabama 那一組；節奏組三人的姓名 |
| `Passage` | **整格**：首軌〈Lament For Lo〉的獨奏開場（讓給 `Homeward Bound`）；第七、八軌那一組引子接正曲；鍵盤手換三種樂器（讓給 `Four`） |

---

## 第 2052 條：**骨架歸屬——b 組自立十條，十張卡各擁有一條；讓出的卡一個字都沒寫**

照 `hook-base.md` 雲端註記第 3 點與第 1787-B 條：**只有擁有者寫「這條骨架全批只走本張」，讓出的卡不寫、也不點名歸給了誰；沒有爭議的骨架一句都不寫。**
**22 張裡 10 張帶歸屬句、12 張沒有。** 哪條歸哪張列在這裡給主線看。

| # | 骨架（句子結構） | **擁有者** | 讓出的卡（它們改走什麼軸） |
|---|---|---|---|
| 1 | **廠牌敘事：新（副）廠牌的開張作** | **`In the Spirit of Ntu`** | 見第 2053 條，十張全部讓出 |
| 2 | **盤名指的是一件可數的實物** | **`12 Stars`**（女皇冠上的十二顆星） | 見第 2054 條 |
| 3 | **題獻（某軌或整碟獻給某人）** | **`Passage`**（同名曲出自父親之手） | `Homeward Bound`（改走開場獨奏與團名由來）、`Four`（改走封城筆記本）、`Reboot`（整格捨去）、`Lifted`（改寫成封面照片）、`Squint`（整格捨去）、`Trios: Ocean`（整格捨去） |
| 4 | **開場是一段獨奏，全團之後才進來** | **`Homeward Bound`** | `Passage`（整格捨去）、`Four`（鋼琴獨奏整格捨去）、`Reboot`（兩軌獨奏整格捨去） |
| 5 | **一人在同一張碟上換多種樂器** | **`Four`**（Greg Tardy 三種管樂） | `Trios: Ocean`、`Bells on Sand`、`Passage`、`Lifted`、`Grateful Deadication` 五張全部讓出 |
| 6 | **客座的出缺席分佈（誰進來了、誰沒進來）** | **`View With a Room`**（十軌中的七軌） | `Purest Form`（客座整格捨去）、`Lifted`（只留一位客座的一段獨奏） |
| 7 | **客座名單與另一個維度一一對應** | **`Where Are We`**（客座各對應一座城市） | `Purest Form`（三位歌手各唱一軌，整格捨去） |
| 8 | **編制少了一件標準樂器** | **`Trios: Chapel`**（場地撐不住鼓） | `Four` 讓出——**`Four` 的 `note` 一句「沒有貝斯」都沒寫**，改寫成正面的「台上就是四個人」 |
| 9 | **合作者的父輩身分構成敘事** | **`Trios: Sacred Thread`**（2001 年同台才知對方是 Alla Rakha 的兒子） | `Trios: Ocean`（父輩只留一格、軸改走空場直播）、`Bells on Sand`（父親只是四人之一）、`Reboot`（兒子那格整格捨去） |
| 10 | **疫情讓原本排不開的人湊在一起** | **`Every Note Is True`**（遠距合唱團＋檔期空出來） | `Trios: Ocean`／`Trios: Sacred Thread`（疫情只當時間定位）、`Four`（走的是封城期間的創作，方向相反，不算同構） |

**另有三條 a 組已擁有、b 組全部讓出的骨架，寫在第 2053／2054／2055 條。**
**其餘 12 張各自走的軸互不同構，不構成爭議，因此一句歸屬都沒寫。**

---

## 第 2053 條（**派工信明文要求本組另立**）：**「與廠牌關係」那條，b 組拆成一條「開張作」並指定擁有者；其餘十張一句都不寫**

派工信指出 a 組第 2038 條第 5 條（廠牌回歸敘事）已擠了六張讓出的卡，
並點名 **b 組的三張《Trios》、`Ronnie Foster`、`Donald Byrd`、`Elvin Jones` 極可能再撞**。
**實際掃過 22 張，帶廠牌關係素材的遠不止那六張，而是十一張**：
`Squint`（debut）、`Purest Form`（second release）、`Homeward Bound`（debut）、`View With a Room`（second）、
`Every Note Is True`（debut）、`12 Stars`（first album as a leader for the label）、`Bells on Sand`（second）、
`Reboot`（returns／first new album in 36 years／50 years after his 1972 debut）、`In the Spirit of Ntu`（tenth album／second on the label／**first on Blue Note Africa**）、
`Four`（3rd album since signing in 2019）、`Where Are We`（debut）、`Passage`（sophomore）。

### 裁定

1. ⚠ ⚠ **「離開多年後回到這個廠牌」這條回歸敘事，a 組第 2038 條第 5 條已鎖在 `Joe Chambers` 上，b 組 22 張一張都不走。**
   **這一條特別要盯的是 `Ronnie Foster《Reboot》`**：它與 `Joe Chambers` **形狀逐格相同**
   （1960–70 年代在這家廠牌當側手 → **被 Francis Wolff 注意到** → 自己的領班作 → 長期空白 → 多年後回來），
   **不是「題材相近」而是真正的同構。本棒因此把 `Reboot` 整條廠牌線整格捨去**，改走取樣那條（第 2055 條）。
2. **b 組另立的是一條形狀不同的子骨架：「一個新的（副）廠牌開張，第一張碟交給了誰」**，
   **擁有者 `In the Spirit of Ntu`**（`Blue Note Africa` 的第一張）。
   **它與回歸敘事的分界是「主詞是誰」**：回歸敘事的主詞是**樂手**（他回來了），開張敘事的主詞是**廠牌**（它開張了）。
3. **其餘十張的「第 N 張／首作／回歸」一句都不寫**——沿用 a 組第 2043 條（3）的先例
   （依主線第 1732 條（一），2020 年以後的碟沒有紙本那一層，目錄序數不寫）。
   ⚠ **`Ntu` 是本批唯一的例外，而它站得住**：第 1732 條要的兩層獨立來源**這張真的有**——
   官網的專輯新聞稿逐字 `the very first release on the newly formed imprint Blue Note Africa`，
   另一頁 2022-04-06 的副廠牌成立公告逐字 `Blue Note Africa will launch this Spring with the release of ... In The Spirit Of Ntu`，
   **兩頁互相對得上，且成立日期就在本作發行前一個多月**（研究層 `notes` 已逐字反查過）。

**可逆性**：改的是 `note` 的軸線指派，不動卡池結構，依裁定權下放第 2 條當場定。

---

## 第 2054 條：**「盤名的出處」——a 組的那條全批只走 `Ron Miles`，b 組一張都不引作者解釋盤名；另立的「可數實物」歸 `12 Stars`**

**b 組帶盤名由來素材的有九張**：`Purest Form`（他自己那段話）、`The 7th Hand`（6 與 7 的設問）、
`Trios: Sacred Thread`（`I call it a Sacred Thread`）、`Bells on Sand`（沙上的形狀）、`Lifted`（母親與封面）、
`12 Stars`（女皇冠上的十二顆星）、`Four`（四個人）、`Every Note Is True`（他妻子寫的歌詞）、`In the Spirit of Ntu`（Ntu 的哲學）。

**裁定三句**：
1. ⚠ **a 組第 2038 條第 1 條的形狀是「盤名的出處 ＋ 引作者本人解釋」，b 組 22 張一句都不寫。**
   `Purest Form`／`Bells on Sand`／`Sacred Thread`／`Lifted` 四張的作者引言**整句捨去**，改走別的軸。
2. **b 組另立的是「盤名指的是一件可數的實物」，擁有者 `12 Stars`**（`note` 逐字「盤名指的是女皇那張牌，冠上有十二顆星」）。
   **「盤名指的是⋯」這個句形全批只此一張。**
3. **另有兩張寫到盤名的意思，但句子結構逐字不同、也沒有「盤名指的是」這個句形，判不同構、不寫歸屬句**：
   - `The 7th Hand`：寫成**一個設問**（hook 逐字「如果六是人能到的極限，那第七隻手是誰的？」），懸念在 `note` 第一格就收尾（他把第七隻手想成神的介入）。
   - `Four`：寫成**台上的人數**（`note` 逐字「台上就是四個人：⋯」）。**草稿原寫「盤名指的是台上的四個人」，量完骨架後改掉**，就是為了把那個句形留給 `12 Stars`。

---

## 第 2055 條：**⚠ ⚠ 派工信的骨架表漏列了 a 組的第九條——`Art Blakey` 也帶歸屬句，而它正好撞上 b 組兩張**

**這是本組最重要的一條，請主線務必看。**

派工信第三節的表列了**八條**並寫「這八條 a 組已佔走」。
**實際逐張讀 `c165-hooks-a.json`，帶「這條骨架全批只走本張。」的是九張**——
表上八張之外，**還有 `Art Blakey & The Jazz Messengers《First Flight to Tokyo: The Lost 1961 Recordings》`**，
它的 hook 逐字是「一捲四分之一吋盤帶被找出來，裡面是 1961 年東京的那一晚。」，
**骨架是「庫藏盤帶被找出來 → 多年後首度發行」。**

⚠ **而 b 組正好有兩張完全同形的卡**：
- **`Donald Byrd《Live: Cookin' with Blue Note at Montreux》`**：1973 年的現場留在庫房、2022 年首度發行，
  研究稿還逐字給了 Gilles Peterson 2013 年的 email 與「16 軌 2 吋類比母帶」——**素材齊備，寫下去必撞。**
- **`Elvin Jones《Revival (Live at Pookie's Pub)》`**：1967 年的錄音、`previously unissued`，
  研究稿逐字有 Zev Feldman「2011 年就注意到這批錄音」的自述——**而 a 組那張的母帶正是同一位 Zev Feldman 找出來的，連人都一樣。**

### 裁定：兩張全部讓出，各改走別軸；「盤帶被找出來」這個句形 b 組零次

- **`Donald Byrd`** 改走 **1973 年那趟集體遠征**（廠牌把旗下樂手整批帶去 Montreux、當時的總裁 George Butler 統籌、
  同一趟出了四張而他那場不在裡面、台上十人、六軌裡三首只在這一場留下）。
  **Gilles Peterson 的 email 與母帶規格整格捨去**，`note` 只寫「2022 年 12 月 9 日才上市」這個時間事實。
  ⚠ **「那天本來會是他九十歲的生日」這句也一併不寫**——草稿原本拿它當 hook，寫下去會把逝世推到讀者面前，
  而本卡的軸並不需要它（題材原則要的是「招牌事實必寫」，逝世是 `Donald Byrd` 這位樂手的生平事實、不是本碟的招牌事實）。
- **`Elvin Jones`** 改走 **他從側手變成領班的那個轉折**（1966 年離開 Coltrane 的樂團 → 在一間小俱樂部有了每週檔期 →
  1967 年 7 月 28 至 30 日在那裡錄下九軌 → Don Was 稱它是通往他日後那個三重奏的關鍵一環）。

---

## 第 2056 條：**「辭世」在 b 組 0 次——不是跳過，是四張各自換了寫法**

派工信轉述 a 組的待判項時要求：**b 組若再出現「辭世」，要避開 a 組那三種切入面**（第三人辭世的場地時序／身後之作／載體時序）。
**b 組帶逝者素材的有五張**，逐張處理如下，**結果 `chk-hook-crossgroup` 的「辭世」在 b 組 0 命中**：

| 卡 | 素材 | 處置 |
|---|---|---|
| `Passage` | 父親 John Blake, Jr. 是題獻對象，同名曲是他寫的 | **寫**，但寫成正面的「獻給他的父親⋯他說這是為父親的一生與留下的東西而做」＋「同名曲正是父親的作品」。**不用「辭世」「遺作」「身後」任何一個詞**——這正好避開 a 組的第二種（身後之作） |
| `Homeward Bound` | Ana Grace Marquez-Greene 與 Lawrence "Lo" Leathers 兩首題獻曲 | **整格捨去**（題獻骨架歸 `Passage`，且研究稿本來就要求克制、只寫題獻與人物關係） |
| `Four` | Hal Willner 與 Alan Woodard 兩首題獻曲 | **整格捨去** |
| `Reboot` | 題獻 Dr. Lonnie Smith | ⚠ **整格捨去，理由有兩層**：(一) 題獻骨架歸 `Passage`；(二) **`Dr. Lonnie Smith` 正是 a 組《Breathe》那張卡的主角**，寫進來會在 `qa-batch` 製造一筆真正的跨組互指，而 a 組那張的軸恰好就是他的辭世與黑膠上市時序（第 2039 條第 3 項）——**兩張會直接撞上** |
| `Revival` | Coltrane 1967 年 7 月 17 日辭世，錄音在兩週後 | ⚠ **整格捨去**。這一格**與 a 組 `…'Til We Meet Again` 完全同構**（第三人辭世 ＋「就在幾天／兩週之後」的時序），第 2039 條第 1 項已鎖在那張。本卡改用 1966 年**離團**當時間起點，事實同樣有 ③ 官網逐字支撐 |

⚠ **這不違反題材原則的「招牌事實必寫、克制不是跳過」**：上列五筆的逝者**都是第三人**（題獻對象、時間座標），
**沒有一筆是本碟主角自己的逝世**；`Passage` 那一筆是本碟真正的題旨，已經寫了。

---

## 第 2057 條：**同藝人多卡的處理——不寫排除條款，只把軸拉開（沿用 a 組的實作）**

b 組有五組同藝人多卡：`Julian Lage` ×2、`Charles Lloyd` ×3、`Johnathan Blake` ×2、
另有 `Immanuel Wilkins`／`Gerald Clayton`／`Bill Frisell`／`Nduduzo Makhathini`／`山中千尋` 各與 a 組同藝人。

`hook-base.md` 寫「同藝人多卡互寫排除條款」，但**雲端註記第 3 點與第 1787-B 條要求讓出的卡一字不寫、不點名**，
兩者在寫法上會打架。**本棒照 a 組的實作走**——實讀 `c165-hooks-a.json`，
**a 組的 `Trijntje` ×2 與 `Norah Jones` ×2 都沒有寫任何排除句，只是把軸拉開**。
**b 組照辦：22 條 `note` 沒有一句「某軸歸《某張》」，因此 `qa-batch` 的 `互指?` 是 0 行。**

### 三張《Trios》的分軸（本組最擁擠的一組）

三張同系列、同藝人、同一年發行、都是無（實體）觀眾的現場，**只能靠軸拉開**：

| | 軸 | 場地那一層在 `note` 裡的角色 |
|---|---|---|
| **`Chapel`** | **場地決定了編制**（禮拜堂的聲響容不下鼓） | **就是軸本身** |
| **`Ocean`** | **對著空無一人的劇院演奏** | **就是軸本身**（家鄉、一百五十年的劇院、疫情第一年） |
| **`Sacred Thread`** | **跨越六十年才接上的因緣**（南加大時代 → 2001 年同台才知對方的父親是誰） | **只當一行定位**（Healdsburg 一間畫廊、對虛擬觀眾直播） |

⚠ **三張都寫了「《Trio of Trios》三張裡的第幾張」，這是身分定位不是故事骨架**，三處措辭各自不同
（「三張裡的第一張」／「《Trio of Trios》的第二張」／「《Trio of Trios》的最後一張」），**不寫歸屬句。**

---

## 第 2058 條：**hook 的四型輪換與開頭前四字**

- **四型分佈**：**斷言 8**（`Squint`／`Chapel`／`12 Stars`／`Ntu`／`Four`／`Succession`／`Where Are We`／`Passage`）、
  **懸疑 6**（`Purest Form`／`View With a Room`／`Sacred Thread`／`The 7th Hand`／`Reboot`／`Today Is Another Day`）、
  **場景 6**（`Grateful Deadication`／`Homeward Bound`／`Ocean`／`Byrd`／`Every Note Is True`／`Revival`）、
  **人物定調 2**（`Lifted`／`Bells on Sand`）。
- **六個懸疑型全部在 `note` 的第一或第二格收尾**（三個數字＝休士頓區碼／七軌才聽得到兩把吉他／
  2001 年同台才知 Alla Rakha 是他父親／第七隻手＝神的介入／公司名＝被取樣的那首曲子／其餘八首各有各的作者）。
- **開頭前四字 45 張互異**（`chk-hook-crossgroup` 第 1 項 0 命中）。**a 組第 2047 條第 3 句的四個禁區全部遵守**：
  - **沒有任何一張用「十N軌⋯」開頭**——⚠ `Squint` 的草稿 hook 原本是「十一軌走到最後⋯」，量完骨架後改成「碟的最後一軌⋯」。
  - **沒有「他說⋯」開頭。**
  - **沒有 `2018`／`1960`／`Tone` 開頭。** b 組唯一的數字開頭是 `Byrd` 的「1973」，與 a 組兩個都不同鍵。
  - ⚠ **另外自己避開一組**：`Homeward Bound` 草稿原本是「開場只有一組鼓⋯」，與 `Every Note Is True` 的「開場的合唱⋯」
    機器判互異但看起來像同一支代理寫的，**改成「頭一分鐘的台上⋯」。**

---

## 第 2059 條（本棒自己下的六個裁定，照「裁定權下放」當場定，各一行）

1. **`Bells on Sand` 的非自作軌數改判為五軌**：草稿照官網的印象寫「三軌」，逐字比對研究層 fact 6 的作曲欄——
   〈Elegia〉〈Damunt De Tu Només Les Flors〉〈My Ideal〉〈My Ideal 2〉與末軌共**五軌**（四首不同的曲子），`note` 改寫成「十軌裡有五軌不是他寫的」。
2. **`Trios: Ocean` 的四軌時長寫「八到十二分鐘」不寫「九到十二分鐘」**：fact 9 逐字 8:53／10:03／10:07／12:18，草稿的「九」把最短那軌寫錯了。
3. **`Where Are We` 的四位客座只寫「兩位彈吉他、一位吹小號」**：fact 4 逐字只給了 Rosenwinkel／Bernstein（吉他）與 Payton（小號）三人的樂器，
   第四位 `Ross` 的樂器不在同一條 fact 裡，**不補、不推斷**。
4. **`Squint` 的鼓手寫 `Dave King`**：Discogs 逐字 `David King`、官網逐字 `Dave King`，研究層 `notes` 明寫「下游擇一即可」，取官網形（與卡單一致）。
5. **`12 Stars` 的三位團員寫「鍵盤、貝斯與鼓」不寫「鋼琴」**：fact 4 逐字 `Sullivan Fortner on keyboards`。
6. **`Today Is Another Day` 不寫「樂團在紐約組成」**：那是本棒草稿的推斷，`facts` 只給了樂手名單與錄音室名，改寫成「班底是兩位貝斯手輪流上陣，加上鼓手 LaFrae Olivia Sci」。

---

## 第 2060 條：**「否定讀者沒有的前提」的自我檢查結果——三處，全部改寫或保留有據**

1. **`Four` 草稿的「這個四重奏沒有貝斯手」——改寫。** 這是研究層更正型的否定，而且**與 `Trios: Chapel` 的「沒有鼓」同構**
   （第 2052 條第 8 條），改成正面的「台上就是四個人：鋼琴、鼓、管樂，加上他自己」。
2. **`Trios: Chapel` 的「禮拜堂的聲響撐不住鼓，這個三重奏因此沒有鼓」——保留。**
   讀者對「爵士三重奏」**本來就有鼓的前提**（官網逐字 `knew it would not support drums or percussion`），
   而且這個否定**指向的是編制事實本身、並且同一句就給了原因**，不是校對痕跡。
3. **`Squint` 草稿的「碟收在一首沒有作者的老曲上」——改寫。** 〈Call Of The Canyon〉的作曲欄逐字是 Billy Hill，
   「沒有作者」是本棒自己寫錯的推斷，改成正面的「出版欄上寫的是公共領域」。

⚠ `chk-hook-crossgroup` 的「hook 用否定句」一項 b 組 **0 命中**（Chapel 那句寫的是「撐不住」與「沒有鼓」，不含機器掃的四個詞）。

---

## 第 2061 條：**`qa-batch` 的 `互指?` 0 行——依第 1763-B 條做了等價的人工核**

`node qa-batch.mjs hooks c165` 回「全部通過 ✓」，**b 組硬標記 0、`互指?` 0 行。**
零筆的成因可能是假陰性，因此**把 b 組 22 條 `note` 對「卡單 45 張的 artist／album 字串」逐一掃了一次**，
命中六處跨卡專名，逐處人工判讀：

| 跨卡重疊的專名 | 出現在 | 人工判讀 |
|---|---|---|
| `Bill Frisell` | `View With a Room`（第二把電吉他）／`Trios: Chapel`（三重奏成員） | ✓ 兩處都是該卡自己 fact 的逐字編制（`View` fact 2、`Chapel` fact 1）；他的領班卡《Four》另有自己的軸，三張沒有互換 |
| `Gerald Clayton` | `Trios: Ocean`（鋼琴）／`Four`（鋼琴） | ✓ 兩處都在該卡 fact 裡（`Ocean` fact 1、`Four` fact 2）；他的領班卡《Bells on Sand》走的是四種時間，不混 |
| `Julian Lage` | `Trios: Sacred Thread`（吉他） | ✓ fact 1 逐字；他的兩張領班卡各走公共領域末軌與客座出缺席 |
| `Charles Lloyd` | `Bells on Sand`（客座薩克斯風） | ✓ fact 2 逐字 `mentor Charles Lloyd on saxophone`；他的三張領班卡各有各的軸 |
| `Johnathan Blake` | `Four`（鼓） | ✓ fact 2 逐字；他的兩張領班卡走開場獨奏與題獻父親 |
| **零處** | **盤名** | ✓ **b 組 22 條 `note` 沒有任何一條寫進別張卡的盤名**——`Donald Byrd` 草稿裡那份「當年出了四張」的藝人名單（含 `Ronnie Foster`）已整格捨去，`Reboot` 的 `Dr. Lonnie Smith` 題獻也已整格捨去 |

---

## 第 2062 條：**`chk-hook-crossgroup` 的逐項結果與唯一待判項的判讀**

`node chk-hook-crossgroup.mjs c165` → **45 張全掃，共 1 項待人工判斷，該項 100% 落在 a 組。**

| 項目 | b 組命中 | 判讀 |
|---|---|---|
| 開頭前四字相同 | **0** | — |
| 同構骨架關鍵詞 | **1 項，三張全在 a 組**（「辭世」×3） | **維持 a 組第 2039 條的判定，不改。** b 組「辭世」**0 命中**（第 2056 條），因此這一項與 b 組無關。⚠ 另外確認：`SKELETON` 表裡的「沒有鼓」只有 `Trios: Chapel` 一張命中、「無伴奏」「一人包辦」「遺作」「生前最後」「首次合作」「唯一一次」全部 0 命中，**都是 b 組主動避開的結果**（第 2052／2056 條） |
| note 校對痕跡 | **0** | 22 條 `note` 沒有「卡池」「查無」「並非」「而非」「不得寫」「禁補」「未能查證」「標錯」任何一個 |
| 分數星等 | **0** | b 組唯一沾到評價的素材是 `The 7th Hand` 那條「前作被紐約時報選為年度第一」與三張卡的葛萊美入圍，**全部整格捨去**，不是因為它們違規（榜單名次與入圍都合法），而是預算與軸線都排不進去 |
| hook 禁語 | **0** | — |
| hook 句末缺標點 | **0** | — |
| hook 否定句 | **0** | 見第 2060 條 |
| hook 加權 >50／note >350 | **0／0** | 45 張加權 18–35.5、note 184–235 |

---

## 第 2063 條：**與 `hook-base.md` 各節的逐條對照——全過**

- **曲風源流／廠牌規則（2026-08-08／08-02）**：**沒有任何一張因為「別張寫過」而不寫廠牌**；
  唯一的限制照規則走反同構，並依派工信要求另立了第 2053 條。
- **「派工詞裡的常識不算事實」（2026-08-11）**：**22 張的每一個專名、日期、曲名、編制都在該卡的 `facts` 裡對得到**；
  **本棒自己違反過三次、三次都自行改掉**（第 2059 條第 3、6 項與第 2051 條 `View With a Room` 那格：
  「近乎管風琴」只在研究稿的 `sound` 欄、不在 `facts`，依「`notes`／`sound` 欄不等於 `facts` 欄」整句刪掉）。
  **沒有一條需要回報主線落空。**
- **「研究稿的卡池現值是過期快照」（2026-08-14）**：**本組沒有把任何一處寫成「待主線處理的卡池問題」。**
  研究層唯一推翻策展層的一處（`Squint` 的自作曲軌數，第 1962 條：十軌 → **九軌**）**鉤子層照研究層寫**。
- **古典卡通則**：**本組 0 張古典卡。**
- **分數與星等**：**hook 與 note 全數 0 處**（第 2062 條）。
- **正面表述（2026-08-09）**：**22 條 `note` 沒有一句否定式的施工指示**；
  三處版本／軌數釘定全部寫成正面指派句（`Squint` 的十一軌、`The 7th Hand` 的七軌、`Succession` 的七軌與 `Today Is Another Day` 的十軌都直接寫數字）。
- **反向禁令兩分法（2026-08-01）**：b 組**沒有任何一張寫到晚於發行的事件**，因此兩類都不適用；
  `Byrd` 與 `Revival` 兩張是**早於發行**的錄音，`note` 都寫了「寫成 19XX 年的現場在 2022 年（首度）發行」的時序要求。
- **輸出紀律**：**每五張寫回磁碟一次**（11 張、17 張、22 張三次落盤），**沒有整批重寫**；
  超標的九張全部**只針對那一則做定點修改**。

---

## 第 2064 條：**本信（派工信）與正本／既有裁定牴觸之處——1 條（漏列），另有 2 處出入**

依派工信第一節逐條核過。

1. ⚠ ⚠ **牴觸（漏列）：派工信第三節的表寫「這八條 a 組已佔走」，實際是九條。**
   **漏掉的是 `Art Blakey & The Jazz Messengers《First Flight to Tokyo》` 的「庫藏盤帶被找出來→多年後首度發行」**
   （該卡的 `note` 逐字帶「這條骨架全批只走本張。」）。
   **這不是無害的疏漏——b 組的 `Donald Byrd` 與 `Elvin Jones` 正好是同一個形狀，照派工信的八條表走就會兩張一起撞上去。**
   **本棒以 `c165-hooks-a.json` 原檔為準，兩張全部讓出（第 2055 條）。**
   ⚠ **根因與第 2041 條第 1 項同形**：a 組第 2038 條的表本身只列「有爭議的」八條，
   而 `Art Blakey` 那張的歸屬句寫了、表上卻沒有它——**a 組的表與 a 組的檔案不一致，派工信照抄了表。**
   **給後批的一句：骨架歸屬一律以 `*-hooks-*.json` 裡帶歸屬句的卡為準，不以 `rulings.md` 的表為準。**
2. **出入：派工信第一節說「策展 a 1900–1922、策展 b 1930–1948＋1947-A、研究 b 1960–1966、鉤子 a 2036–2048，研究 a 沒有留下條文」——與本檔一致，這句是對的。**
   ⚠ 但它同時說「第 1902／1903／1904 條是本批判準的來源」，**這三條講的是策展層的收退判準（(戊) 的分界、(甲) 不轉 (丁)、年份改判），
   對鉤子層只有一處實際有用**：第 1903 條那句「重疊的是曲目不是錄音，下游簡介寫這兩軌時必須寫明是哪一次演奏」——
   **本棒照它處理了三處**（`Purest Form` 的〈My Favorite Things〉、`Succession` 的〈Watarase〉、`Byrd` 與 `Revival` 的時序句）。
3. **出入：派工信第四節第 1 點說「a 組實測本批心算低估 5–41%，拉丁字母與數字佔計入字元的 37.4%」。**
   **那是 a 組的實測值，b 組實測是 32.5%**（第 2050 條）。**派工信沒有寫錯，但照 37.4% 去反推會高估 b 組的專名壓力**——
   正因如此本棒沒有沿用任何係數，22 張逐張實量。

**除上述外，本信沒有任何一句與 `hook-base.md` 正本相反。**

---

## 第 2065 條（收尾）：**交件數字、本棒改動的檔案、號段**

**交件**：`desc-tools/batches/hooks/c165-hooks-b.json`，**22 筆**，`key` 與卡單 b 組、研究稿逐字同序。
**`node qa-batch.mjs hooks c165` → 全部通過 ✓，b 組標記 0、`互指?` 0 行。**
**`node chk-hook-crossgroup.mjs c165`（45 張，a＋b 同掃）→ 開頭／校對痕跡／分數星等／禁語／否定句／長度全 0；
1 項同構關鍵詞待人工判斷，三張全在 a 組（「辭世」×3），維持第 2039 條不改，b 組 0 命中。**

**本棒新增／改動的檔案**：
- `desc-tools/batches/hooks/c165-hooks-b.json`（新建，22 筆）
- `batch-progress/c165/rulings.md`（本段，**號段 2049–2066，2067–2075 未用**）

**未碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／
`c165-hooks-a.json`／`prop-a.json`／`prop-b.json`／`evidence-a/`／`slice.json`／
`batch-progress/c164`／`c166`／`c167`／`c168` 的任何檔／1900–2048 的號段（只讀未改）。
**未執行**：`git add`／`git commit`／`git push`／`git reset`／`git revert`。
**臨時檔**：全部寫在雲端 scratchpad，檔名一律帶 `c165-hb-` 前綴（第 1947 條的教訓），repo 內沒有殘留。

---

## 第 2066 條（**操作事故，已無損失，但要記給主線；與第 2045／1947-A 條同一個形狀，本線第三次**）：**檢查點 `872c4c0` 收進的 `c165-hooks-b.json` 是 22／22 但**未定稿**的中間版本**

本棒依派工信第四節第 2 點「每做完 5 張就把整份輸出檔寫回磁碟」存檔（11 張、17 張、22 張三次落盤），
**主線在第三次落盤之後、本棒收尾之前做了檢查點提交**
（`872c4c0 checkpoint: c169 b 策展／c165 鉤子 b／c166 研究 a 中途存檔`）。

⚠ ⚠ **那個 commit 裡的檔案筆數已經是 22，肉眼看像是完成品，但它不是**：
之後本棒還做了兩輪修改，**11 張卡的 `hook` 或 `note` 有異動**（`git diff` 對該檔為 11 insertions／11 deletions）：

1. **七處事實更正**（第 2059 條的六項 ＋ `View With a Room` 刪掉只在 `sound` 欄的「近乎管風琴」）——
   其中 `Bells on Sand` 的「三軌」→「五軌」、`Trios: Ocean` 的「九到十二分鐘」→「八到十二分鐘」、
   `Where Are We` 的「三位彈吉他」→「兩位彈吉他」**在檢查點版本裡都還是錯的**。
2. **兩處骨架調整**（`The 7th Hand` 與 `Reboot` 撤掉不該寫的歸屬句；`Four` 的「盤名指的是⋯」改寫，把句形讓給 `12 Stars`），
   以及 `Squint` 與 `Grateful Deadication` 的 hook 改寫（第 2058／2060 條）。

**處置**：**本棒收工時的工作區版本才是交件版**（22 筆、預算 179–229 全部 ≤230、兩支 QA 皆清）。
**未 `git add`、未 `git commit`、未 `git push`，由主線統一提交。**

⚠ **給主線的一句（比第 2045 條再強一次）**：**「筆數對了」不等於「定稿了」。**
續跑型代理的中途存檔在最後一輪之後仍會改；**檢查點提交若收進代理仍在跑的輸出檔，commit 訊息要寫明它是中間版本、不可直接餵下游**，
**下游取檔一律以代理交件回報當下的工作區版本為準。**

---

# c-165 a 組 writer-1（寫作層）裁定（編號 2067–2090）

本檔為 **c-165 a 組寫作層**（23 張，2020–2021 的當代爵士／歐陸爵士）的裁定，
實際用到 **2067–2083**（**2084–2090 未用**）。b 組 writer-2 的區間是 2091–2114。
判準沿用 `prompts/writer-base.md` 原文；派工信與 base 牴觸處一律以 base 為準。

---

## 第 2067 條：**`note` 結尾「正文只寫上列各項。」把 `sound` 欄排除在正文之外**

a 組 23 張的 `note` 全部以這句收尾，依 base 第 161 行「note 的嚴禁／禁寫／排除條款逐條照辦」，
判定 **`sound` 欄與 `facts` 裡未被 `note` 點到的事實都不進正文**。
base 的預算表把「一筆成績或聲音」列為第四格，本批一律取「成績／發行事實」那一支，**不取聲音描述**。
可逆（改的是卡單值不是卡池結構），且卡住整條線，當場定。

## 第 2068 條：**`note` 刻意不具名的廠牌，正文照樣不具名**

第 2 張（ARTEMIS，「Lee Morgan 1964 年替同一個廠牌寫的曲子」）、第 22 張（Joe Chambers，
「他在這個廠牌替 Wayne Shorter 與 Bobby Hutcherson 打鼓」「再次回到這個廠牌」）
的 `note` 都用不具名的指稱。**照寫成「同一家廠牌」，不自行補上廠牌名**——
補了就是寫 `note` 沒列的項，違反第 2067 條；而且第 22 張已點名 Alfred Lion 與 Francis Wolff，
讀者拿得到指認線索，不具名沒有資訊損失。

## 第 2069 條：**第 8 張（Immanuel Wilkins《Omega》）具名紐約時報，成立**

base 第 221 行禁樂評媒體名進正文，但第 241–243 行的例外二寫明
「那條定位非得靠出處才成立時（**年度榜**、名人堂、票選、十年百大），可以具名該媒體」。
「2020 年的年度第一名爵士專輯」去了頭就是無意義的名次，正是第 253 節要擋的殘句，**故具名**。
寫的是名次歸屬而非分數／星等，符合第 244–245 行。`qa-batch out` 的 UNSOURCED 七條樣式未觸發。

## 第 2070 條：**數字體例：日期、屆數、年齡、名次用阿拉伯；頁數、印量、週年數維持中文**

base 第 176 行只把「年月日與榜單名次」定為阿拉伯，並明言概略數量維持中文。
本批據此定：**阿拉伯**——2020 年 7 月 10 日類日期、第 63 屆、22 歲、79 歲、75 歲生日、
5 月 24 至 25 日、Hammond B3、Symphony No. 5；**中文**——五十六頁的書（第 16 張）、
只印一千五百張（第 3 張）、貝多芬兩百五十年與 Charlie Parker 一百年（第 10 張）、
出道十五年、跟了對方十五年。三處中文數字都與 `note` 原文一致。

## 第 2071 條：**三張涉及辭世的卡，指定三種互不同構的句型**

派工信第三節第 4 點要求三張都寫、句型不得雷同。定案：
- 第 15 張 Norah Jones《…'Til We Meet Again》：**第三人稱從句**，辭世者是他人（Chris Cornell），
  以「而 Cornell 正是在那場演出之後離世」收在末軌的歸屬句後面，不重複 hook 已給的「幾天之後」。
- 第 19 張 Tony Allen《There Is No End》：**年齡＋三段時序**（節拍／過世／發行），用「以 79 歲過世」。
- 第 23 張 Lonnie Smith《Breathe》：**確切日期＋遺作上市時序**，用「他於同年 9 月 28 日辭世，
  雙黑膠版 12 月 17 日才上市」。
三張分別落在「他人／本人年齡／本人日期」三個切入面，動詞取「離世／過世／辭世」三個不同的詞。

## 第 2072 條：**第 18 張捨去 `note` 的「聽的就是三個人合在一起」**

該句與 hook「這支樂團是三個三分之一，一人一份」是同一件事的兩種說法，
寫進去就違反 base 第 159 行「不得重述 hook 已說過的話」。
**整格捨去**（base 第 96 行：修剪以整格捨去），空出來的額度給 1997 年成軍與兩位 Washington 同姓。

## 第 2073 條：**第 11 張把鼓手歸屬句倒裝，先寫接手者**

`note` 原序「前五軌是 Vince Cherico，後九軌換成他的兒子 Zack O'Farrill」與 hook
「前五軌一位鼓手，後九軌由鋼琴家的兒子接手」逐字同構。**倒裝成「接手的是 Zack O'Farrill，
前面那位則是 Vince Cherico」**，事實一條不少，但不重述 hook 的分段。

## 第 2074 條：**第 14 張刪去「十三軌的作曲欄都有 Bacharach」**

hook 首句已經是「作曲欄每一軌都有他的名字」，重寫一次即違反第 159 行。
正文只留 hook 沒說的那半——**監修欄掛的是他與 Sue Main**，並補上十三軌與 Metropole Orkest 合錄。

## 第 2075 條：**第 15 張不重複 hook 的「幾天之後」**

hook 已寫「就在 Chris Cornell 在那裡演完的幾天之後」，正文若再寫「辭世的幾天之後」就是重述。
改為「而 Cornell 正是在那場演出之後離世」——**懸念（演完之後發生了什麼）收尾，時間間隔不重複。**

## 第 2076 條：**第 13 張的「三個聲部都掛合成器」照 `note` 寫，不從 `sound` 補樂器名**

`sound` 欄寫明是小號、鋼琴、貝斯三個位置，但 `note` 只寫「三個聲部都掛合成器」。
依第 2067 條，**取 `note` 的措辭**。同時省下的 12 字元留給 The E-Collective 與
Turtle Island Quartet 兩個團名（合計 40 字元），這兩個是 `note` 明列的項。

## 第 2077 條：**第 12 張的主語具名為 Charles Pasi**

`note` 的「他自己唱歌並吹口琴、彈吉他」前一句剛點過 Fred Dupont，代名詞會誤指。
依 base 第 164 行「寧可具名」，**正文寫 Charles Pasi**。這是卡單藝人欄的逐字寫法（第 196 行）。

## 第 2078 條：**`note` 明列的樂手清單，優先於 base 第 280 行的「專名壓到 3 個以內」**

base 第 271、280、289 行對爵士批次給的是 3–4 個專名的上限；但第 161 行要求 `note` 逐條照辦，
而第 16 張（Lee Morgan、Wayne Shorter、Bobby Timmons、Jymie Merritt 四位＋Zev Feldman）
與第 7 張（Boubacar Traore、Billy Strayhorn、Burt Bacharach 三位作曲者）的名單是 `note` 指名的主故事項。
判定：**專名上限是為了控字數的手段，`note` 指名是目的**；兩者衝突時照 `note` 寫，
只要實測落在 180–240 就不砍。兩張實測 189 與 212，成立。
base 第 156 行「清單一張最多留一組」仍守住——這兩張各只有一組名單。

## 第 2079 條：**字數以 base 的 180–240 為準，不追派工信轉述的 209–230**

派工信第三節第 1 點說鉤子層實測 209–230。**實際成品落在 189–219，全批無一張出區間。**
低於 209 的原因是第 2067 條把 `sound` 欄排除、第 2072–2075 條又砍掉四處重述 hook 的句子。
`writer-base.md` 第 205 行給的是 180–240，**以它為準，不為了湊 209 而把砍掉的重述句加回來**
（base 第 152 行：砍掉之後字數不夠，不是把第二個故事加回來）。

## 第 2080 條：**原題內的半形逗號與括號一律保留**

〈Baby, It's Cold Outside〉（第 3 張）、〈Beyond The Sea (La Mer)〉（第 4 張）、
〈Ferguson - An American Tradition〉與〈Mary Turner - An American Tradition〉（第 8 張）
照原文寫。依 base 第 173–175 行，真正禁的只有「半形逗號直接貼著中文字」。
`qa-check-research` 的 `半形標點貼中文` 樣式不掃 CJK 以外的相鄰字元，三張皆過。

## 第 2081 條：**第 5 張的 `Ben.` 保留句點，其後接全形逗號**

盤面掛名欄逐字就是 `Ben.`，hook 的懸念（「後面加一個句點」）非靠它收不了尾。
`Ben.，` 的半形句點＋全形逗號組合不觸發任何檢查樣式，`fix-spacing` 亦不動它。

## 第 2082 條：**三張要求「提到盤名時帶上掛名」的卡，掛名一律取卡單藝人欄逐字**

第 8 張寫「Immanuel Wilkins 的《Omega》」、第 13 張寫「Terence Blanchard 的《Absence》」、
第 18 張寫「《Street of Dreams》掛的是 Bill Charlap Trio」。
第 18 張另依 `note` 加註「2021 年的三重奏版本」，以與末軌那首 1930 年代的標準曲區隔。

## 第 2083 條：**第 14 張正文保留小寫的 `credit` 一詞**

`note` 的原文是「credit 的監修欄」，指的是盤面 credit 欄位這個具體位置，
換成中文「製作名單」會失去「欄位」的指涉。小寫開頭不觸發專名比對（正則要求首字大寫），
亦非禁語。保留。

---

（2084–2090 未使用。）
