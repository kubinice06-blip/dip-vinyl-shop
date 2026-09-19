# c-164 a 組裁定（編號 1840–）

⚠ **本檔尚未寫完，是續跑安全用的中途檢查點**（`CLAUDE.md`「容器會不定時重啟」那節）。
交件版會把 1840–1869 號段內的各條補齊。

**本組 23 筆**（`batch-progress/c164/slice.json` 的 `g: "a"` 切片），年份分布 2016×1、2017×12、2018×10，
`slice.json` 的 `genre` 欄 23 筆全部逐字 `jazz`。
沿用 `c158`～`c162` 各批裁定、`c163/rulings.md` 與 **`c163/rulings-mainline.md`（第 1718–1730 條）**，條文一字未改。
**b 組另從 1870 起 append，本檔不碰那個號段。**

---
---

# c-164 **b 組**裁定（編號 **1870–1882**）

**本段由 b 組策展棒寫入，從檔尾 append。上方 a 組（1840–1869 號段）的內容一行未動，`prop-a.json` 未碰。**

**本組 22 筆**（`batch-progress/c164/slice.json` 的 `g: "b"` 切片），年份分布 2018×4、2019×9、2020×9，
`slice.json` 的 `genre` 欄 22 筆全部逐字 `jazz`。
沿用 `c158`～`c162` 各批裁定、`c163/rulings.md` 與 **`c163/rulings-mainline.md`（第 1718–1730 條）**，條文一字未改。
**正本三份（`ALBUM_ONBOARDING.md`／`REMOTE_RUNBOOK.md`／`CLAUDE.md`）開工前已完整讀過**；本信與正本牴觸之處見第 1877 條。

---

## 第 1870 條：**交件總表**

| 項 | 數 |
|---|---:|
| 派下 | **22** |
| **收** | **19** |
| **退** | **3** |
| **退貨率** | **13.6%**（3/22） |
| **年份改判** | **1**（`Rick Margitza —《Hope》` **2020 → 1991**，見第 1876 條） |
| 新掛名字串 | **5**（`Thomas Dutronc & Les Esprits Manouches`／`Bill Frisell`／`Yaron Herman Trio`／`Ron Carter & Danny Simmons`／`The Nels Cline Singers`） |
| 沿用池中／卡單既有掛名 | **13 張／13 位** |
| `chk-prop b` 標記 | **0**（127 批、5,127 卡；跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0） |
| 撞陳列（軌名或盤名＝池中卡名） | **收下的 19 張共 23 處／12 張**；⚠ **撞 apex 王牌 0 處**（盤名層 0、軌名層 0） |
| 盤名逐字撞卡 | **1 處**（`Bill Frisell —《Harmony》` ↔ seed `The Wake —《Harmony》(1982)`，掛名不同、非 apex） |
| 用掉的號段 | **1870–1882**（1870 起，未動 1840–1869） |

### 六句收碟規則的分布（19 收／3 退）

| 句 | 收 | 退 | 備註 |
|---|---:|---:|---|
| **(甲) 從未發行過的錄音首次以錄音發行** | **1** | — | `Art Blakey & The Jazz Messengers —《Just Coolin'》`，見第 1875 條 |
| **(乙) 母體原在 BN／Liberty／UA／Solid State** | — | **2** | Stanley Turrentine、Jimmy Smith，見第 1873 條 |
| **(丙) 母體其實在真正的他廠** | **0 退**（訊號亮 **7** 次，逐筆查完 **6** 次不成立） | **1** | ⚠ **`Ai Kuwabara…《Live at Blue Note Tokyo》` 是本線第二次 (丙) 真的成立**，見第 1874 條 |
| **(丁) 部分重疊／形狀不同** | **0** | — | ⚠ `Just Coolin'` 曾是候選（四首曲子與池中《At the Jazz Corner of the World》同曲），**查完是不同演出、不是同一份母帶，維持 (甲)**，見第 1875 條 |
| **(戊) 四條再發系列** | — | **1**（與 (乙) 併計在 Turrentine 那一筆） | ⚠ **`Lonnie Smith —《All in My Mind》` 的 `reissueSeries` 逐字掛著 `Blue Note Tone Poet Series` 卻是收不是退**，見第 1872 條 |
| **(己) 載體只有影像** | — | **0** | `Charles Lloyd`／`山中千尋`／`Norah Jones` 三張帶 DVD，但都有純聲音的零售條目，(己) 不成立 |

### 一般卡／身分欄

- `releaseType` **19 張全部 `Album`**，`exceptionReason` 與 `exceptionEvidenceUrls` **全部留空**（無合輯、無 §5.5 例外）。
  ⚠ **兩張差點翻過去**：`Norah Jones —《Begin Again》`（Discogs `format` 欄逐字帶 `Compilation`）與
  `GoGo Penguin —《Live from Studio 2》`（Discogs `format` 欄逐字帶 `EP`），**兩張都依 `ALBUM_ONBOARDING.md` §1／§5.6 以 MB `primary-type` 為身分正本，判 `Album`**，理由寫在各自的 `risk`。
- `selfTitled` 19 張全部 `false`（無同名碟）。
- `reissuedBy` 19 張全部留空。

---

## 第 1871 條：**退表逐筆（3 筆）**

| # | 卡 | `rgMbid` | 判 | 逐字依據 |
|---|---|---|---|---|
| 1 | **`Stanley Turrentine —《Up at "Minton's", Vol. 2》`**（slice `g:"b"` 第 12 筆，2019） | `26026a87-313a-4518-b549-918c2894775c` | **(乙)＋(戊)＋撞已發卡，三重成立** | **原盤是 Blue Note 1961／1962：Discogs 16127081 逐字 `released: 1962-12-00`、`country: US`、`Vinyl, LP, Stereo`、廠牌欄逐字 `Blue Note` catno `BST 84070`；Apple us/jp `1436190027` 的 ℗ 欄逐字 `A Blue Note Records Release; ℗ 1961 Capitol Records, LLC`、`releaseDate` 逐字 `1961-04-19`。** 本筆是 **2019-07-17 的日版 CD `UCCQ-9530`（MB `ed88ba24`，僅 JP，4 軌）**，`slice.json` 的 `reissueSeries` 欄逐字 `["BLUE NOTE 80 MORE 60 WORKS"]`（**(戊) 名單上的第二條**）。**⚠ 而且原盤已經發過卡**：seed 逐字 `["Stanley Turrentine","Up at Minton's, Volume 2",…,1962]`，`c138/prop-b.json` 與 `c138-cards.json` 亦有 |
| 2 | **`Jimmy Smith —《Groovin' At Smalls' Paradise (Volume 2)》`**（第 13 筆，2019） | `4f9271b0-d709-443f-ae5b-dd9429bbe395` | **(乙)** | **原盤是 Blue Note 1958：Discogs 3402871 逐字 `released: 1958-08-00`、`country: US`、`Vinyl, LP, Album, Mono`、廠牌欄兩格逐字 `Blue Note` catno `1586` ＋ `Blue Note` catno `BLP 1586`、companies 逐字 `Recorded At: Small's Paradise`、notes 逐字 `Recorded at "Smalls' Paradise", NYC, on November 15, 1957.`；Apple us/jp `1476591394` 的 ℗ 欄逐字 `A Blue Note Records Release; ℗ 1957 Capitol Records LLC`。** 本筆是 **2019-08-14 的日版 CD `UCCQ-9552`（MB `8d92d7a0`，僅 JP，5 軌）**。⚠ **Discogs 同一次搜尋另外撈到 `Volume 1` 的 2019 年 `Blue Note 80 Vinyl Reissue Series` 黑膠（14526495），坐實這個號段就是 Blue Note 80 那一輪的復刻線** |
| 3 | ⚠ ⚠ **`Ai Kuwabara with Steve Gadd and Will Lee —《Live at Blue Note Tokyo》`**（第 5 筆，2019） | `a4aaed2f-d3ab-4b55-a3fc-fb4380dc8b6a` | **(丙) 母體其實在真正的他廠** | **見第 1874 條全文。一句話：唯一的實體零售條目掛 `Verve Records`，盤名裡的 `Blue Note` 是演出場地不是廠牌** |

⚠ **三筆都不是「資料查不到」而退**，三筆的 ②④ 兩層都查得很完整。
⚠ **`Dr. Lonnie Smith —《All in My Mind》` 原本是派工信預告的第三筆退件，實查是收**，見第 1872 條。

---

## 第 1872 條（**派工信地雷 1 的反例；新立，給後批照抄**）：**`reissueSeries` 欄非空不等於 (戊)——要逐字看那個系列掛在哪一筆 release、那一筆是不是首發**

**觸發**：`slice.json` 的 `Dr. Lonnie Smith —《All in My Mind》` 逐字帶 `reissueSeries: ["Blue Note Tone Poet Series"]`，
而 `Blue Note Tone Poet Series` 是 **(戊) 四條名單上的第三條**。派工信因此把它列為「幾乎確定要退」的三筆之一，
但同時留了但書（逐字「若 2018 年的首發本身是新錄音的現場盤、Tone Poet 只是後來的復刻版，那就是收不是退」）。**實查完全落在但書那一側。**

| 層 | 逐字 |
|---|---|
| **② Discogs `11994944`（2018 美版 CD）** | **`released` 逐字 `2018`、`format` 欄逐字 `CD, Album`（⚠ **無 `Reissue`**）、⚠ ⚠ **`series` 欄逐字空陣列**、廠牌欄逐字單格 `Blue Note` catno `0602567218722`、7 軌** |
| **② Discogs `15188414`（2020 黑膠）** | **`released` 逐字 `2020-04-24`、`format` 欄逐字 `Vinyl, LP, Album, Reissue, Stereo`、⚠ ⚠ **`series` 欄逐字 `Blue Note Tone Poet Series`**、catno `B0031576-01`、**5 軌**、notes 欄逐字 `A Blue Note Records release: ℗ 2018 © 2020 UMG Recordings, Inc.`** |
| **MB 轄下三筆 release** | **`6e0db6bc` 2018-01-12 AF Digital 7 軌／`346000b7` 2018-01-19 FR CD 7 軌／`0e28fcb7` 2020-04-24 XW 12" Vinyl **5 軌** catno `B0031576-01`** |
| **④ Apple us `1440907508`** | **`releaseDate` 逐字 `2018-01-12T08:00:00Z`、℗ 欄逐字 `Blue Note Records; ℗ 2018 UMG Recordings, Inc.`、7 軌** |

**→ 判：收，`year` 2018，`reissuedBy` 留空。**

**三條理由**：
1. **首發是 2018 年的新錄音**，℗ 年逐字 `2018`（連 2020 那張 Tone Poet 自己的 notes 都逐字寫 `℗ 2018 © 2020`）。
2. **`Blue Note Tone Poet Series` 只掛在 2020 年那一筆黑膠復刻上**，2018 年的 CD 條目 `series` 欄逐字是**空陣列**。
3. **兩者連曲目都不同**（7 軌 vs 5 軌，黑膠版整個抽掉〈Alhambra〉與〈All In My Mind〉）——**若它們是同一件事，曲目不會差兩軌。**

⚠ ⚠ **根因是 `slice.json` 的 `reissueSeries` 欄是「把 RG 底下所有 release 的系列欄折上來」的結果**
（`batch-progress/enum/blue-note.json` 的 `source` 欄逐字「**折疊 release-group**」、`entities` 欄逐字把 Tone Poet 註記為
「**再發系列（MB series 實體，非 label）；成員折進原盤 RG**」）。
**所以 `reissueSeries` 非空只代表「這個 RG 底下某一筆 release 走過某個再發系列」，不代表「這張碟本身是那個系列的產品」。**
**(戊) 要退的是「這張卡指的那一版就是再發系列的產品」**——判準是**那個系列掛在不掛在首發那一筆 release 上**。

⚠ **對照本組退掉的 Turrentine（第 1871 條第 1 筆）就清楚了**：那張的 `reissueSeries` 逐字 `["BLUE NOTE 80 MORE 60 WORKS"]`，
而它**轄下只有一筆 release，就是 2019 年那張日版 CD 本身**——系列直接掛在這張卡指的那一版上，(戊) 成立。
**兩張的差別不在「有沒有 `reissueSeries`」，在「那個系列掛在哪一筆」。**

**可逆性**：改的是 manifest 欄位與退表一行，不動卡池結構，屬「可逆」，依裁定權下放第 2 條當場定、不上呈。

---

## 第 1873 條：**Turrentine 與 Jimmy Smith 兩張退——第 1763 條的快捷查法在本組兩次都不成立，改用 ②＋④ 兩層坐實**

派工信逐字建議用 **第 1763 條的快捷查法**（「MB `label-info` 並列老號段與日版號段即成立」）。**本組兩張都跑不通，原因寫在這裡給後批**：

| 卡 | MB `label-info` 逐字 | 第 1763 條可用? |
|---|---|---|
| `Stanley Turrentine —《Up at "Minton's", Vol. 2》` | **只有一格：`Blue Note [713c4a95] catno=UCCQ-9530`** | ❌ **沒有並列老號段** |
| `Jimmy Smith —《Groovin' At Smalls' Paradise (Volume 2)》` | **只有一格：`Blue Note [713c4a95] catno=UCCQ-9552`** | ❌ **同上** |

⚠ **兩張的 MB RG 轄下都只有一筆 release（就是那張日版 CD），MB 端根本沒有 1961／1958 年的原盤條目可以並列。**
**第 1763 條那個捷徑的前提是「MB 把原盤與再發建在同一筆 release 的 label-info 裡」，本組這兩張是「MB 只建了再發、原盤完全不在 MB 這個 RG 底下」——是另一種形狀。**

**改用的查法（兩層，逐字）**：
1. **② Discogs 搜原盤**：Turrentine → `16127081`（`1962-12-00` US `Blue Note BST 84070`）；Jimmy Smith → `3402871`（`1958-08-00` US `Blue Note 1586`／`BLP 1586`）。
2. **④ Apple 的 ℗ 年**：Turrentine → `1436190027` 逐字 `A Blue Note Records Release; ℗ 1961 Capitol Records, LLC`；
   Jimmy Smith → `1476591394` 逐字 `A Blue Note Records Release; ℗ 1957 Capitol Records LLC`。
   ⚠ **Apple 的 ℗ 年在這種老 Blue Note 碟上特別好用——它保留的是原始錄音年的權利年，不是再發年**（與第 1601 條「2005 年後 ℗ 欄常寫現在的權利人」那個陷阱相反，老碟這一邊是可靠的）。

**→ 本條新立一句給後批**：**當 MB RG 轄下只有日版再發那一筆 release 時，第 1763 條的捷徑失效；改跑「② 搜原盤目錄號 ＋ ④ 看 ℗ 年」兩層，兩層對上就 (乙) 成立。**

⚠ **Turrentine 那張另有第三重**：**原盤已經在 `seed_cards.json` 裡**（逐字 `Up at Minton's, Volume 2`，1962）。
⚠ ⚠ **但 `chk-prop` 抓不到它**——本卡的盤名折鍵是 `upatmintonsvol2`、池中那張是 `upatmintonsvolume2`，
**`Vol.` 與 `Volume` 折出兩個不同的鍵（`chk-prop` 盲點四）**。**若這張不是先被 (乙)／(戊) 擋下，它會一路過四道進池變成重複卡。** 記在這裡。

---

## 第 1874 條（**本組最重要的一條；(丙) 在本線第二次真的成立**）：**`Ai Kuwabara with Steve Gadd and Will Lee —《Live at Blue Note Tokyo》` 退——盤名裡的 `Blue Note` 是演出場地，唯一的實體零售盤掛 `Verve Records`**

**觸發**：這張碟是派工信地雷 3 點名的四筆之一（主線第 1721 條觀察名單）。
**跑年份覆核時訊號是假的（見下），但跑 imprint 前置閘時撞到一個更根本的問題：這張碟可能根本不是 Blue Note 的碟。**

**逐層實查**：

| 層 | 逐字 |
|---|---|
| ⚠ ⚠ **② Discogs `13373984`（**唯一一筆實體零售條目**，2019-03-20 Japan SHM-CD）** | **廠牌欄逐字單格 `Verve Records` catno `UCCJ-2164`，`entity_type_name` 逐字 `Label`。⚠ 廠牌鏈裡一個 Blue Note 都沒有。** companies 欄逐字 `Record Company: Universal Classics & Jazz`、`Phonographic Copyright (p): Universal Music LLC`、⚠ ⚠ **`Recorded At: The Blue Note Tokyo`**（**那是 `companies` 欄的錄音場地，`entity_type_name` 不是 Label**）；notes 欄逐字 `Recorded live at Blue Note, Tokyo, Japan, September 23, 2018.` |
| **④ Apple jp `1453471226`** | `artistName` 逐字 `桑原あい, スティーヴ・ガッド & ウィル・リー`、9 軌、`releaseDate` 逐字 `2019-03-20T07:00:00Z`、**℗ 欄逐字 `℗ 2019 UNIVERSAL MUSIC LLC`——沒有 Blue Note**；⚠ **Apple us 查無** |
| ⚠ **③ 廠牌官網（日本線走 `universal-music.co.jp`）** | **產品頁 `universal-music.co.jp/kuwabara-ai/products/uccj-2164/` 回 200，`<title>` 逐字 `Live at Blue Note Tokyo [SHM-CD][CD] - 桑原あい with スティーヴ・ガッド and ウィル・リー - UNIVERSAL MUSIC JAPAN`；⚠ ⚠ **規格表的「レーベル」欄逐字 `Universal Music`**，藝人頁側欄的廠牌標籤逐字 **`UNIVERSAL JAZZ`**——**兩處都沒有 Blue Note／ブルーノート** |
| **③ `bluenote.com/artist/ai-kuwabara/`** | **404** |
| ⚠ **MB** | 轄下 **2** 筆 release：**`70459271`（2019-03-20 **JP** Official SHM-CD 9 軌，label-info 逐字 **`Verve [99a24d71]` catno `UCCJ-2164`**，barcode `4988031320273`）** ＋ **`965374bf`（2019-03-20 **XW** Official **Digital Media** 9 軌，label-info 逐字 `Blue Note [713c4a95]` catno=null，barcode `602577466229`）** |

**→ 判：(丙) 成立，退。**

**這張碟逐列對上第 1784 條 `Leon Russell《Life Journey》`（退）那一欄，不是第 1792 條 `Fabian Almazan《Rhizome》`（收）那一欄**：

| | **Rhizome（第 1792 條，收）** | **Life Journey（第 1784 條，退）** | ⚠ **本張** |
|---|---|---|---|
| Discogs 零售條目數 | 1 | 5 | **1** |
| **廠牌鏈出現 `Blue Note` 的** | **1／1（第二格）** | **0／5** | ⚠ **0／1** |
| Apple ℗ 欄 | `Blue Note/ArtistShare` | `Universal Music Enterprises` | ⚠ **`UNIVERSAL MUSIC LLC`** |
| bluenote.com | 兩篇新聞稿 | 藝人頁 404 ＋ 站內搜尋 0 | ⚠ **藝人頁 404** |
| **MB 掛 `713c4a95` 的 release** | 1／1 | **1／4（只有數位那一筆）** | ⚠ ⚠ **1／2（只有數位那一筆；實體 JP 盤掛 `Verve [99a24d71]`）** |

**五列逐列相同。第 1794 條的閘（「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note」）在本張的答案是「沒有」——
唯一掛 Blue Note 的是 MB 那一筆 XW 數位 release，而那正是第 1784 條判退時明文排除的那一種。**

⚠ ⚠ **`The Blue Note Tokyo` 是場地，不是廠牌，這一點要寫死**：
Discogs 把它放在 **`companies` 欄**、前綴逐字 `Recorded At:`；**`labels` 欄裡沒有它**。
**Blue Note Tokyo 是東京的爵士俱樂部（Blue Note 紐約俱樂部的授權分店），與 Blue Note Records 這個廠牌是兩件事。**
**這與第 1817 條的日本線陷阱（`Nihon Blue Note [76903afe]` ≠ `Blue Note [713c4a95]`）是同一個家族的第二種形狀：
第一種是 MB 端有兩個相近的 label 實體，第二種是「Blue Note」三個字出現在盤名／場地欄而不是廠牌欄。**

⚠ ⚠ **本條最有說服力的一筆佐證，是同組另一張卡的對照**：
**`山中千尋 —《Prima del Tramonto》` 走的是同一間公司、同一個 `UCCJ-` 號段（`UCCJ-2167`，與本張的 `UCCJ-2164` 只差三號）、同一年（2019）、同一套 companies（`Record Company: Universal Classics & Jazz`、`Phonographic Copyright (p): Universal Music LLC`）——
但 Discogs `13802015` 的廠牌欄逐字是 `Blue Note`（`entity_type_name` 逐字 `Label`），MB 四筆 release 的 label-info 逐字也全部是 `Blue Note [713c4a95]`。**
**同號段、同公司、同年，Discogs 的編輯在兩張碟上做了不同的標記——那個差別不是雜訊，是真的。**
**所以本條不是「日本線一律退」，是「日本線要逐張看廠牌欄」：`UCCJ-2167` 收，`UCCJ-2164` 退。**

⚠ **附帶：本張的年份覆核順便跑完了，訊號是假的**——
**MB frd 逐字 `2019-03-20`、Discogs `released` 逐字 `2019-03-20`、Apple jp `releaseDate` 逐字 `2019-03-20T07:00:00Z`，三層同到日；
而且 `slice.json` 的 `nReleases: 1` 已過期（MB 現在是 2 筆，含一筆 JP 實體 SHM-CD）。**
**若這張碟廠牌過得了閘，`year: 2019` 是對的。退的理由與年份無關。**

⚠ **掛名層本棒也查完了，一併記下供日後若翻案時用**：**依 `ALBUM_ONBOARDING.md` §0.5（日籍藝人用日文漢字／假名本名），
`Ai Kuwabara` 應寫成 `桑原あい`**——**MB artist 實體 `a58a6930` 的名稱逐字就是 `桑原あい`、Apple jp 的 `artistName` 逐字是 `桑原あい, スティーヴ・ガッド & ウィル・リー`、UMJ 官網 `<title>` 逐字 `桑原あい with スティーヴ・ガッド and ウィル・リー`**；
**池中 `桑原あい`／`Ai Kuwabara`／`桑原あいトリオ・プロジェクト` 三形皆 0 列**（第 307 條無可沿用對象）。
**`with Steve Gadd and Will Lee` 依第 1703 條收斂的那一句（「池中有沒有同系列前作」）應判不留**——池中 0 列、
而 Apple 另有 `Ai Kuwabara The Project —《Making Us Alive》(2022)` 這條長期並行的線，
**留 feat. 式子句會讓同一個主體裂成兩個字串，與第 1720 條 `THE SPHÈRES` 同形。**
⚠ **這一段是備查，本張已退，不進 `prop-b.json`。**

**可逆性**：改的是退表一行與 manifest 欄位，不動卡池結構，屬「可逆」，依裁定權下放第 2 條當場定、不上呈。
⚠ ⚠ **本條是本組唯一一條「主線可能想覆核」的裁定**：若主線認為 MB 那一筆 XW 數位 release 的 `Blue Note [713c4a95]` 足以過閘，
把這張碟加回來只要補一筆 prop 條目即可，證據上面全部備妥。

---

## 第 1875 條（**派工信地雷 2**）：**`Art Blakey & The Jazz Messengers —《Just Coolin'》` 判 (甲)——Discogs 的 notes 欄逐字寫死了「All tracks previously unissued.」；曲目與池中一張既有卡重疊四首，但那是另一次演出，(丁) 不成立**

**(甲) 的逐字依據**：**Discogs `15639198` 的 notes 欄逐字兩句**——
`Recorded at Van Gelder Studio, Hackensack, NJ on March 8, 1959.` ＋ **`All tracks previously unissued.`**
（companies 欄逐字亦有 `Recorded At: Van Gelder Studio, Hackensack, New Jersey`）。
**MB frd 逐字 `2020-07-17`、Apple us `1500694273` 的 `releaseDate` 逐字 `2020-07-17T07:00:00Z`、℗ 欄逐字 `Blue Note Records; ℗ 2020 UMG Recordings, Inc.`。**
**「從未發行過的錄音首次以錄音發行」六個字一字不差 → (甲) 成立。**

⚠ ⚠ **派工信要求「務必逐字確認『從未發行過』，若其中某些軌先前以單曲或合輯出過，就不是純 (甲)，要改判 (丁)」。逐字查完，結論分兩層**：

| 層 | 結果 |
|---|---|
| **錄音（母帶）層** | **從未發行過**——Discogs notes 逐字 `All tracks previously unissued.` |
| ⚠ **曲目（作品）層** | **六軌裡有四首與池中一張既有卡同曲**：seed 的 **`Art Blakey and the Jazz Messengers —《At the Jazz Corner of the World》(1959)`**（`c137/prop-b.json` 與 `c137-cards.json` 亦有）收有〈Hipsippy Blues〉〈M&M〉〈Just Coolin'〉〈Close Your Eyes〉 |

**→ (丁) 不成立、(甲) 維持。** 理由一句：**那張是 1959 年 4 月 15 日在 Birdland 的現場，本張是同年 3 月 8 日在 Van Gelder 錄音室的 session——同一批曲子的兩次不同演出，不是同一份母帶。**
**(丁) 說的「部分重疊」指的是錄音重疊，不是曲目重疊；若曲目重疊就算 (丁)，本線每一張爵士標準曲的碟都會是 (丁)。**

⚠ ⚠ **但這一層必須寫進 `risk` 並交給下游敘事層當硬要求**（已寫）：
**簡介要寫明本張是「錄音室版、當年未發」，不得與那張現場盤的同名曲混談。**
⚠ **`chk-prop` 完全抓不到這個重疊**——它比的是「掛名｜盤名」折鍵，曲目層不在它的視野裡。

⚠ **(甲) 卡的 `year` 取「首次發行年」而不是「錄音年」**：本卡 `year: 2020`（不是 1959）。
**照的是本線既有 (甲) 卡的同一條**（`Art Blakey —《Drums Around the Corner》(1999)`（c-156 a）、
`Charlie Parker & Dizzy Gillespie —《Diz ’n Bird at Carnegie Hall》(1997)`（c-153 b，主線第 1721 條逐字覆核過））。
⚠ **派工信提到「(甲) 目前有六種辨識形狀，最新的第 1704 條」——本張不屬第 1704 條那一種**（先前只以影像載體發行過），
**它是最基本的第一種：整場 session 壓根沒發過。**

---

## 第 1876 條（**派工信地雷 3；主線第 1721 條觀察名單四筆的結算**）：**四筆逐筆跑完年份覆核，三筆維持、一筆改判——`Rick Margitza —《Hope》` 2020 → 1991**

主線第 1721 條把本組四筆列為觀察名單（`Ai Kuwabara`／`Jacky Terrasson`／`GoGo Penguin`／`Rick Margitza`），
四筆在 `slice.json` 裡都是 **`nReleases: 1` ＋ `formats: ["Digital Media"]` ＋ `country: "XW"` ＋ `catno: []`**，四個訊號全中。
⚠ **主線同一條也逐字提醒「訊號亮不代表要改判，逐筆看」。四筆逐筆跑完，結果三比一。**

| 卡 | MB `frd` | ② Discogs `released` | ④ Apple `releaseDate` ／ ℗ 年 | 判 |
|---|---|---|---|---|
| `Ai Kuwabara…《Live at Blue Note Tokyo》` | `2019-03-20` | **`2019-03-20`**（JP 實體 SHM-CD `13373984`） | `2019-03-20T07:00:00Z`／℗ 2019 | **維持 2019**（⚠ 該卡另因 (丙) 退，見第 1874 條）；⚠ **`nReleases: 1` 已過期，MB 現在是 2 筆** |
| `Jacky Terrasson —《53》` | `2019-09-27` | **`2019`**（歐版實體 CD `14200033`，catno `0808196`） | `2019-09-27T07:00:00Z`／℗ 2019 | **維持 2019**；⚠ **`nReleases: 1` 已過期，MB 現在是 2 筆（含一筆 CD）** |
| `GoGo Penguin —《Live from Studio 2》` | `2020-11-27` | **`2020-11-27`**（兩筆數位 `37556118`／`16278491`） | `2020-11-27T08:00:00Z`／℗ 2020 | **維持 2020**；⚠ **這張確實只有數位，沒有實體零售盤——但演出本身就在 2020 年**（Discogs notes 逐字 `(Live from Studio 2, Abbey Road Studios, London / 2020)`） |
| ⚠ ⚠ **`Rick Margitza —《Hope》`** | ⚠ **`2020-04-10`** | ⚠ ⚠ **`1991`**（**五筆 1991 年的實體條目**） | ⚠ ⚠ **`1991-01-01T08:00:00Z`／℗ 欄逐字 `A Blue Note Records Release; ℗ 1991 Capitol Records, LLC`** | ⚠ ⚠ **改判 1991** |

### `Rick Margitza —《Hope》` 改判的逐字依據

- **MB RG `b997a7b7-46b2-4aa8-9575-523c94cfd360` 轄下只有 1 個 release**：`6070288c`（**2020-04-10 XW Official Digital Media 11 軌**，`Blue Note [713c4a95]` catno=null，barcode `602508924392`）。
  **MB 沒有為 1991 年的任何一筆實體建 release，`first-release-date` 因此被整個拉到 2020。**
- **② Discogs 有五筆 1991 年的實體條目，四個不同的目錄號**：
  **`1749772`（1991 US CD `Blue Note CDP7948582`，barcode `077779485826`，11 軌）**／
  `11567938`（1991 US 卡帶 `B4-94858`）／`16029789`（1991 US 宣傳卡帶）／`38010000`（1991 US Columbia House CD `CDP-594858`）／
  **`21540820`（1991 Japan CD `Blue Note TOCJ-5285`，東芝 EMI）**。
- **④ Apple us/fr `1506295924`**：**℗ 欄逐字 `A Blue Note Records Release; ℗ 1991 Capitol Records, LLC`**、11 軌；
  ⚠ `releaseDate` 逐字 `1991-01-01T08:00:00Z` 是**第 1601 條的年初佔位日**，**只取年不取日**。
- ⚠ ⚠ **曲目同一性對得上**：**MB 2020 數位那筆 11 軌，與 Discogs 1991 美版／日版 CD 的 11 軌逐字逐序完全相同**
  （The Journey 6:55／Song Of Hope 5:59／Stepping Stone 8:46／The Princess 5:05／Walls 6:49／Mother's Day 1:23／Recess 4:41／Heritage 5:28／The Old Country 8:40／We The People 4:01／Cornfed 8:15）——**是同一張碟，不是兩張同名碟。**

**→ 依「三層對照、兩層以上取多數」判 `year: 1991`。**

⚠ **改判之後 (乙) 要重跑一次，結論是不成立、照收**：**1991 年的 Blue Note `CDP7948582` 就是這張碟的首發原盤**，
不是庫藏、不是再發、不是日版 CD 化（`TOCJ-5285` 是同年的日版首刷）。
**(乙) 擋的是「母體原在 Blue Note 的純庫藏／再發」，本張的母體就是 Blue Note 的當代新錄音，正是本線要收的東西。**
⚠ **本張與 `c149/prop-b.json`《Color》(1989)、`c150/prop-b.json`《This Is New》(1991) 構成 Margitza 在 Blue Note 的三張線，三張不重複。**

⚠ ⚠ **本條是主線第 1785／1791 條那個偵測訊號在本線的第二次真陽性**（第一次是 c-163 a 的 `Tim Hagans《Audible Architecture》2014 → 1995`）。
**主線第 1721 條的觀察名單 11 筆裡，本組這四筆已結清：1 筆改判、2 筆維持、1 筆因其他理由退。**
⚠ **給後續批次（c-165 a／c-167 a,b／c-170 a,b）的一句**：**這個訊號的真陽性率目前是 1／4。分辨的關鍵在 ② Discogs——
「Discogs 有沒有比 MB `frd` 更早的實體條目」一查就知道，比看 MB 的 release 數量可靠得多。**

⚠ **另一個副產品**：**`slice.json` 的 `nReleases` 欄在本組四筆裡有兩筆已過期**（Kuwabara 與 Terrasson 現在都是 2 筆）。
**`slice.json` 是 2026-09-15 產的，MB 這三個月又長了東西。`nReleases: 1` 這個訊號要當「切片時的快照」看，不是現況。**

---

## 第 1877 條（**回報派工信與正本／實況的牴觸，派工信逐字要求**）：**三處**

### （一）派工信「池中幾乎確定已有卡的」名單，八筆裡有四筆實掃是 0 列

派工信地雷 7 逐字列出：「`Norah Jones`（本組兩張）／`Mark Knopfler`／`Bill Frisell`／`Gregory Porter`／`Charles Lloyd`／`Ron Carter`／`Götz Alsmann`／`Derrick Hodge`」。
**逐一實掃 `seed_cards.json` 17,248 列（折鍵 ＋ 子字串兩種掃法）結果**：

| 掛名 | seed 實掃 | 卡單／prop 實掃 | 派工信說法 |
|---|---:|---:|---|
| `Norah Jones` | **4 列** | 8 筆／4 張 | ✓ 對 |
| `Mark Knopfler` | **1 列** | 0 | ✓ 對 |
| `Gregory Porter` | **4 列** | 0 | ✓ 對 |
| `Charles Lloyd` | **5 列** | 7 筆／3 張 | ✓ 對 |
| ⚠ **`Bill Frisell`** | **0 列** | **0 筆** | ❌ **池中完全沒有** |
| ⚠ **`Ron Carter`** | **0 列**（裸名；只有 `Red Garland / Ron Carter / Philly Joe Jones`、`Jim Hall & Ron Carter` 兩個聯名別形） | 18 筆／9 張 | ⚠ **「已有卡」只在卡單層成立，seed 是 0** |
| ⚠ **`Götz Alsmann`** | **0 列** | 10 筆／5 張 | ⚠ **同上** |
| ⚠ **`Derrick Hodge`** | **0 列** | 4 筆／2 張 | ⚠ **同上** |

**不影響任何一張的判定**（四筆都不是撞卡，四筆都收），**但派工信那句「撞到就退」若照字面執行會誤退三張**。
⚠ **根因推測：派工信把「卡單／prop 裡有」與「seed 裡有」混為一談。這兩層在去重上都要掃（`chk-prop` 的線上池只掃 seed，跨批那一道才掃 prop），但「已有卡」這個說法要分清楚是哪一層。**

### （二）派工信說 `Dr. Lonnie Smith —《All in My Mind》`「幾乎確定要退」，實查是收

見第 1872 條全文。⚠ **派工信自己留了但書，本棒照但書走，不算牴觸，但結論與派工信的預期相反，依要求記在這裡。**

### （三）派工信地雷 4 要本棒判 `Ai Kuwabara` 的掛名，但那張碟在更前面的閘就退了

派工信要求「`Ai Kuwabara` 的掛名要照 §0.5 判 → `桑原あい`，並套第 1703／1768／1769（四）條決定 `with Steve Gadd and Will Lee` 要不要留」。
**本棒把這一層查完了**（結論：`桑原あい`、不留 feat. 子句，逐字證據寫在第 1874 條末段），
**但那張碟依 (丙) 退，掛名不進 `prop-b.json`。** ⚠ **這不是牴觸，是順序問題：imprint 前置閘跑在六句之前（第 1794 條），而掛名判定跑在收碟之後。**

⚠ ⚠ **另記一處「派工信與正本一致、但實測與既有裁定相反」的操作面事實**：
**`bluenote.com/artist/derrick-hodge/` 現在回 200**，而 **c-162 b 第 1750 條實測時逐字記錄它回 404**。
**官網在這段期間補上了這一頁。後批查 ③ 不要沿用舊的 404 結論，要重測。**

---

## 第 1878 條：**掛名總表——沿用池中／卡單既有 13、新字串 5、新造分裂 0**

### （一）沿用既有字串 13 張／13 位（第 307 條）

`Ambrose Akinmusire`（seed 1＋c-162 a／c-163 a 共 2 張）／`Mark Knopfler`（seed 1）／
⚠ **`Lonnie Smith`（seed 4＋c-142／c-153／c-163 b 共 3 張；**四邊都給 `Dr.` 形仍沿用裸名，依第 1815 條，該條正文逐字點名了本張**）**／
`Jacky Terrasson`（c-152～c-160 共 9 張）／`Norah Jones` ×2（seed 4＋c-160／c-162／c-163 共 4 張）／
`Charles Lloyd`（seed 5＋c-146／c-163 a 共 2 張，裸名）／`山中千尋`（c-163 a／c-163 b 共 3 張，**主線第 1672 條指定，一字未改**）／
`Derrick Hodge`（c-162 b／c-163 b 共 2 張）／`GoGo Penguin`（seed 3）／`Rick Margitza`（c-149 b／c-150 b 共 2 張）／
`Götz Alsmann`（c-160 a～c-163 a 共 5 張，帶 `ö` U+00F6）／`Gregory Porter`（seed 4）／
`Art Blakey & The Jazz Messengers`（**seed 5 列就是這個 `&` 形字串**；池中另有 `Art Blakey and the Jazz Messengers` 20 列與裸名 `Art Blakey` 7 列，**三形在 `chk-prop` 的 `k()` 下前兩形同鍵、裸名不同鍵，各自都是既有字串，本卡不動任何一張**）。

### （二）新字串 5（池中與卡單皆 0 列）

| 掛名 | 依據 | 第 307 條反查 |
|---|---|---|
| ⚠ **`Thomas Dutronc & Les Esprits Manouches`** | **四邊二比二，判長形**：MB RG＋release 兩層 artist-credit 逐字長形、Discogs 黑膠 `12836644` 的 `artists` 欄逐字兩格（join `&`）／Discogs CD `12560916` 與 Apple `1420613594` 逐字短形。**計票三比二；`Les Esprits Manouches` 是實名編制（MB Group 實體 `70593c54`）不是 feat. 子句；依第 1703 條「池中有沒有同系列前作」，答案是沒有→「建」的那一側** | 長形／短形／`Les Esprits Manouches` 三形皆 0 列；⚠ **池中 `Jacques Dutronc —《Jacques Dutronc》(1966)` 是其父，另一個人，不併** |
| **`Bill Frisell`** | 四邊一致，裸名（MB Person `a21318db`／Discogs／Apple 逐字同形） | 0 列（`frisell` 子字串亦 0） |
| **`Yaron Herman Trio`** | **團名形四邊一致**（MB **Group 實體 `50bb373d`**／Discogs `13513150`／Apple `1447099462` 逐字同形）；**依第 1703 條，Apple 那一側同時掛著 `Yaron Herman Trio` 的《Follow the White Rabbit》(2010)《A Time for Everything》(2007)《Muse》(2009)——這是長期並行的一條線，不是為這張碟新造的** | `Yaron Herman Trio` 0 列；裸名 `Yaron Herman` seed 0 列（卡單有 c-163 b《Everyday》1 張）；希伯來文形 0 列 |
| ⚠ **`Ron Carter & Danny Simmons`** | **三邊三種寫法，依第 1539 條取 `&`**：MB 逐字逗號式 `Ron Carter, Danny Simmons`／Discogs 逐字 `Ron Carter And Danny Simmons (3)`（⚠ `(3)` 是站內消歧碼，依第 1720 條掛名票不計，但 `And` 連接符可讀）／**Apple `1458903206` 逐字 `Ron Carter & Danny Simmons`**。⚠ **`&` 與 `And` 在 `chk-prop` 的 `k()` 下折成同鍵，取哪一種都不造成分裂；取 `&` 是與池中 `Jim Hall & Ron Carter` 同一套排版** | `Ron Carter` 裸名 seed 0 列（卡單 9 張）；`Danny Simmons` 兩形皆 0 列 |
| ⚠ ⚠ **`The Nels Cline Singers`** | **四邊一致的團名形**（MB **Group 實體 `fd23ad56`**／Discogs `19744789`／Apple `1531002091` 逐字同形）。**見下面（三）的三字串裁定** | 四形（`The Nels Cline Singers`／`Nels Cline Singers`／`Nels Cline`／`The Nels Cline 4`）在 seed 皆 0 列；卡單只有 c-163 b `Nels Cline —《Lovers》` 1 張 |

### （三）⚠ ⚠ **派工信地雷 5 的三組「裸名 vs 團名形」——三組全部判各自成立，不算分裂**

**第一組（最複雜，三個字串散在兩批三組）**：
**`The Nels Cline Singers`（c-164 b，本組）／`The Nels Cline 4`（c-164 a，同時在跑）／`Nels Cline`（c-163 b《Lovers》2016 已收裸名）。**
**判：三個字串各自成立。四條理由**——
1. **折鍵後三個都是不同的鍵**（`thenelsclinesingers`／`thenelscline4`／`nelscline`）；**不是第 1702 條那種同一個名字的碼位差異，是三個不同的名字。**
2. **MB 端是不同的實體**：本張掛 **Group 實體 `fd23ad56`**，《Lovers》掛 Person 實體。**不是 credited-name 覆寫。**
3. **三者是三種真實存在、長期並行的編制**：Singers 是 2000 年起的五／六人電聲團、`The Nels Cline 4` 是 2018 年的四重奏、裸名是他個人掛名的作品（《Lovers》是大編制管弦樂計畫）。**第 1131 條「不同編制各自成立」，與主線第 1727 條處理 `Charles Lloyd & The Marvels` 用的同一條分界。**
4. **依第 1703 條「池中有沒有同系列前作」——`Nels Cline Singers` 在池中 0 列，這是「建」的那一側**（與 `Wayne Shorter Quartet`／`Julia Kadel Trio` 同形）；**與第 1768 條 `Robert Glasper Experiment` 判裸名那一側相反，因為那張的分界是「池中已有六張裸名前作」，本張池中裸名 seed 是 0 列。**
⚠ **四形全部寫進 `queryAlias`，供探測層與 c-164 a 交叉查。**

**第二組**：**`Yaron Herman Trio`（本組）vs `Yaron Herman`（c-163 b《Everyday》，另 c-164 a 有《Y》2017）。**
**判：各自成立。** 理由與上面（二）那一列相同——**MB 端是 Group 與 Person 兩個實體，三重奏是他長期並行的一條線（Apple 上有三張前作），池中裸名 seed 0 列。**

**第三組（雙人並列的連接符）**：**`Thomas Dutronc & Les Esprits Manouches`（判長形、`&`）與 `Ron Carter & Danny Simmons`（逗號式 → `&`，第 1539 條）。** 逐字依據見上面（二）。

### （四）新造分裂 0

**19 張逐一反查過：沒有任何一張造出「與池中既有主體折鍵後同鍵、但字串不同」的字串。**
⚠ **唯一需要盯住的是 `Art Blakey & The Jazz Messengers`**——池中同時有 `&` 形（5 列）與 `and` 形（20 列），
**兩形在 `chk-prop` 的 `k()` 下折成同一個鍵**，**本卡取的是池中已經存在的 `&` 形，沒有新造第三種寫法。**

---

## 第 1879 條（**派工信地雷 6**）：**標點與特殊字元逐字元核過——兩處判定與 MB 不同，`chk-prop` 兩處都不會亮**

派工信點名五個盤名。**逐字元（碼位）核完的結果**：

| 盤名 | 逐字元結果 | 判定 |
|---|---|---|
| ⚠ ⚠ **`Just Coolin'`** | **MB RG title 逐字 `Just Coolin’`（撇號是 **U+2019** 彎撇號）；② Discogs `15639198` 與 ④ Apple `1500694273` 逐字都是 **U+0027** ASCII** | ⚠ **取 ASCII `Just Coolin'`**。②＋④ 二比一；**而且池中同藝人與同線的既有盤名（`Moanin'`／`Buhaina's Delight`／`Home Cookin'`／`Prayer Meetin'`／`Rough 'n' Tumble`／`I'm Movin' On`）逐字元檢查過全部是 ASCII U+0027**。彎撇號形已進 `queryAlias` |
| ⚠ **`L.I.E.B.E.`** | **MB 與 Apple de `1535625211` 逐字都是全大寫 `L.I.E.B.E.`；② Discogs 三筆逐字都是 `L.i.e.b.e.`** | **取 `L.I.E.B.E.`**（第 1720 條計票 MB＋Apple 二比一）。⚠ **Discogs 那一票比平常有份量（`L.i.e.b.e.` 不是它的排版慣例產物），但 Discogs 自己兩筆條目的第一軌軌名逐字一筆 `L.i.e.b.e.`、一筆 `L.I.E.B.E.`，內部就不一致，未達獨立一票。** 五個句點都是 ASCII U+002E |
| **`Up at "Minton's", Vol. 2`** | **雙引號是 ASCII `"`（U+0022）、撇號是 ASCII `'`（U+0027），MB 與 slice 逐字相同** | **該卡已退（第 1871 條第 1 筆），不進 prop。**⚠ **但這一張留下一個要記的東西：它的折鍵是 `upatmintonsvol2`，池中原盤是 `upatmintonsvolume2`——`Vol.`／`Volume` 折出兩個鍵，`chk-prop` 盲點四，見第 1873 條末段** |
| **`Groovin' At Smalls' Paradise (Volume 2)`** | **兩個撇號都是 ASCII U+0027** | **該卡已退（第 1871 條第 2 筆）** |
| ⚠ **`8: Kindred Spirits (Live From the Lobero)`** | **冒號 ASCII U+003A、括號 ASCII U+0028/U+0029；MB 與 Apple `1491270957` 逐字零字差**；⚠ **② Discogs 五筆條目給了三種寫法（`…Live From The Lobero Theater`／`…Theatre`／`8 (Kindred Spirits Live From The Lobero Theater)`），彼此都不一致、且都多了 `Theater`／`Theatre`** | **取 MB＋Apple 的形**（第 1720 條：Discogs 那一側自己內部分裂，不計票） |

### 另外四處本棒自己加掃的

| 盤名／掛名 | 結果 |
|---|---|
| ⚠ **`COLOR OF NOIZE`** | **MB 與 Apple `1511790333` 逐字全大寫；Discogs 逐字 `Color Of Noize`。取全大寫**（第 1720 條二比一；Discogs 的全字首大寫是站內排版慣例，第 1698 條（四））。兩形折鍵後同鍵 |
| ⚠ **`Share the Wealth`** | **MB 逐字小寫 `the`；Discogs 與 Apple 都寫 `Share The Wealth`。取 MB 的小寫形**——**那兩邊各自都有全字首大寫的排版慣例，不是獨立的一票** |
| ⚠ **`All in My Mind`／`Down the Road Wherever`／`Live from Studio 2`／`Prima del Tramonto`／`Songs of the Degrees`／`Pick Me Up Off the Floor`** | **六張的介系詞小寫全部取 MB 形**；⚠ **其中 `Songs of the Degrees` 與 `Prima del Tramonto` 連 Apple 都是小寫形，三邊一致** |
| **`Götz Alsmann`／`山中千尋`** | **`ö` 是 U+00F6（與池中五張 prop 同碼位）；`山中千尋` 四個字都是常用漢字，無異體字風險** |

### ⚠ 非 ASCII 連字號與 U+30FC 掃描

**19 張的 `artist` 與 `album` 兩欄逐字元掃過 `‐ ‑ ‒ – — ― －` 七種非 ASCII 連字號與 U+30FC 長音記號：0 命中。**
**兩欄的全部非 ASCII 字元只有三處**：`Götz Alsmann` 的 `ö`（U+00F6）、`山中千尋` 的四個漢字（U+5C71 U+4E2D U+5343 U+5C0B）——**全部合法。**
**`chk-prop` 的那三道（非 ASCII 連字號 ×2、U+30FC）不會亮，而且這一次是真的沒有，不是被折鍵摺掉。**

---

## 第 1880 條：**撞陳列——收下的 19 張共 23 處／12 張；⚠ 撞 apex 王牌 0 處；⚠ 盤名逐字撞卡 1 處**

**掃法**（照第 738／859／1370 條）：**先印出 `seed_cards.json` 前兩列確認形狀**（逐字
`["The Rolling Stones","Some Girls",4,2,1,["rock","blues"],1978]`，**七欄的陣列的陣列，17,248 列，其中有第 9 格＝apex 層級的另計**），
再把 **seed 17,248 列 ＋ `batch-progress/*/prop-*.json` ＋ `desc-tools/batches/cards/*-cards.json` 合計 15,615 筆**
合成比對集，拿本組 **19 張的全部軌名（含各版本差異軌，合計 283 個去重軌名）＋19 個盤名** 逐一折鍵比對。

### ⚠ ⚠ 撞 apex 王牌：**盤名層 0 處、軌名層 0 處**

**23 處命中逐一回查 `seed_cards.json` 的第 9 格（tier），全部為空字串——本組沒有任何一處撞到 apex 卡。**
⚠ **派工信逐字要求「盤名也要獨立掃一次 apex（本線踩過兩次同名撞王牌）」——19 個盤名逐一手掃過，0 命中。**
⚠ **最接近的一次是 `L.I.E.B.E.`**：折鍵成 `liebe`，池中有五筆含 `liebe` 子字串的卡（含 apex `hall` 的 `Fritz Wunderlich —《Schumann: Dichterliebe》`），
**但沒有一筆的折鍵等於 `liebe`**——**子字串命中不是折鍵命中，不算撞卡；記在這裡是因為敘事層查資料時容易撈到。**

### ⚠ 盤名逐字撞卡 1 處（非 apex）

| 本組卡 | 撞到的 | 說明 |
|---|---|---|
| **`Bill Frisell —《Harmony》`** | **seed `The Wake —《Harmony》(1982)`** | **折鍵同為 `harmony`，掛名不同，`chk-prop` 的 `k(artist)\|k(album)` 配對鍵不會亮。**⚠ **這正是派工信要求「盤名獨立掃一次」的那個形狀，本組就中在這一張** |

### 軌名撞池中一般卡 22 處／11 張

| 卡 | 處 | 逐一 |
|---|---:|---|
| `Thomas Dutronc & Les Esprits Manouches` | 1 | 〈Love〉↔ seed `Love —《Love》(1966)` |
| `Lonnie Smith《All in My Mind》` | 1 | 〈Juju〉↔ seed `Wayne Shorter —《Juju》(1964)` ＋ `Siouxsie and the Banshees —《Juju》(1981)`（⚠ **本張那一軌正是 Shorter 那首曲子的改編，敘事層要寫明是翻奏**） |
| `Jacky Terrasson《53》` | 2 | 〈The Call〉↔ seed `Horace Tapscott with the Pan-Afrikan Peoples Arkestra —《The Call》(1978)`；⚠ **〈Mirror〉↔ 他自己的 c-160 a《Mirror》(2007)（同藝人自撞）** |
| **`Bill Frisell《Harmony》`** | 3（另加盤名 1） | 〈Everywhere〉↔ `Tim McGraw (1997)`；〈Hard Times〉↔ `Millie Jackson (1982)`；〈Lush Life〉↔ `John Coltrane (1961)` ＋ `Lou Donaldson (1980)`（亦在 c-141 prop） |
| `山中千尋《Prima del Tramonto》` | 1 | 〈Cherokee〉↔ seed `Jimmy Smith —《Cherokee》(1996)`（亦在 c-147 prop，**同一條 Blue Note 線**） |
| **`Charles Lloyd《8: Kindred Spirits》`** | **5** | ⚠ ⚠ **〈Dream Weaver〉↔ seed `Charles Lloyd —《Dream Weaver》(1966)`、〈Forest Flower〉↔ seed `Charles Lloyd —《Forest Flower》(1967)`（同藝人自撞兩處，那兩軌在 MB 的 12 軌加長版上）**；〈Requiem〉↔ `José Maurício Nunes Garcia (2008)` ＋ `Auto-Mod (1983)`；〈La Llorona〉↔ `Chavela Vargas (1993)`；〈Green Onions〉↔ `Booker T. & the MG's (1979)`（⚠ **Booker T. Jones 本人就在這場客座**） |
| `Derrick Hodge《COLOR OF NOIZE》` | 1 | 〈19〉↔ seed `Adele —《19》(2008)` |
| `GoGo Penguin《Live from Studio 2》` | 1 | 〈Protest〉↔ seed `Bunny Wailer —《Protest》(1977)`（亦在 c-57 prop） |
| **`Rick Margitza《Hope》`** | 3 | 〈Walls〉↔ `Apparat (2007)`；〈Heritage〉↔ `Eddie Henderson (1976)` ＋ **c-162 a `Lionel Loueke —《Heritage》(2012)`（同一條 Blue Note 線上的待上架卡）**；〈We The People〉↔ `Chuck Brown & the Soul Searchers (1972)` |
| **`Gregory Porter《All Rise》`** | 4 | 〈Phoenix〉↔ `Labelle (1975)`；〈Merry Go Round〉↔ `Elvin Jones —《Merry-Go-Round》(1972)`（**折鍵後同鍵，連字號被剝掉**）；〈Thank You〉↔ `Duran Duran (1995)`；〈Revival〉（Deluxe 差異軌）↔ `Selena Gomez`／`Eminem`／`Gillian Welch`／`Q65` 四張同名碟 |
| `Art Blakey《Just Coolin'》` | 1 | 〈Close Your Eyes〉↔ c-152 prop `Kurt Elling —《Close Your Eyes》(1995)` |

### ⚠ 曲目層的重疊（`chk-prop` 與上面這張表都抓不到）

| 本組卡 | 與池中／卡單重疊 | 下游敘事的硬要求 |
|---|---|---|
| ⚠ ⚠ **`Art Blakey《Just Coolin'》`** | **六軌裡四軌（〈Hipsippy Blues〉〈M&M〉〈Just Coolin'〉〈Close Your Eyes〉）與 seed `Art Blakey and the Jazz Messengers —《At the Jazz Corner of the World》(1959)` 同曲** | **必須寫明本張是 1959-03-08 的錄音室 session、那張是 1959-04-15 的 Birdland 現場，兩次不同演出**（見第 1875 條） |
| ⚠ **`GoGo Penguin《Live from Studio 2》`** | **七軌全部取自他們自己的舊碟，其中〈Totem〉〈Bardo〉〈Atomised〉〈F Maj Pixie〉出自 seed 已有的《Man Made Object》(2016) 與《Gogo Penguin》(2020)** | **必須寫明是現場重奏，不是那兩張的曲目重複上架** |
| ⚠ **`Charles Lloyd《8: Kindred Spirits》`** | **〈Dream Weaver〉〈Forest Flower〉是他 1966／1967 兩張同名碟的標題曲** | **必須寫明是 2018 年八十歲生日現場的重奏** |

### ⚠ `chk-prop b` 四道

**`node batch-progress/c164/chk-prop.mjs b` → 標記 0**（127 批、5,127 卡；**跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0**，後三項只報不擋）。
⚠ ⚠ **但本組有三處是「標記 0 不等於沒問題」的實例，逐一記在上面**：
盤名 `Harmony` 撞卡（掛名不同，配對鍵不亮）、`Just Coolin'` 的撇號碼位（折鍵摺掉）、
`Vol.`／`Volume` 折出兩個鍵（若 Turrentine 那張沒被 (乙)／(戊) 擋下就會過關）。

---

## 第 1881 條：**曲風——19 張裡 12 張 `['jazz']`、6 張帶第二個值；⚠ 其中一張完全不掛 jazz**

| 曲風欄 | 張數 | 卡 |
|---|---:|---|
| `['jazz']` | **12** | Dutronc／Lonnie Smith／Terrasson／Frisell／Yaron Herman Trio／Ron Carter & Danny Simmons／山中千尋／Charles Lloyd／Derrick Hodge／GoGo Penguin／Margitza／Art Blakey |
| `['jazz','pop']` | **3** | `Norah Jones《Begin Again》`／`Norah Jones《Pick Me Up Off the Floor》`／`Götz Alsmann《L.I.E.B.E.》` |
| `['jazz','hiphop']` | **1** | `Ambrose Akinmusire《Origami Harvest》` |
| `['jazz','soul']` | **1** | `Gregory Porter《All Rise》` |
| `['jazz','rock']` | **1** | `The Nels Cline Singers《Share the Wealth》` |
| ⚠ ⚠ **`['rock']`（不含 jazz）** | **1** | **`Mark Knopfler《Down the Road Wherever》`** |

⚠ ⚠ **`Mark Knopfler` 那一張是本組唯一不掛 jazz 的卡，這是刻意的**：
**MB `genres` 逐字 `rock`(2)／`soft rock`(2)／`folk rock`(1)／`jazz`(1)——最高票是 rock；
② Discogs `12821424`／`13349442` 的 `genres` 逐字都是 `["Rock"]`／`styles` 逐字 `["Soft Rock"]`，沒有 Jazz；
④ Apple 的 `primaryGenreName` 逐字 `Rock`。三邊都判搖滾。**
**`slice.json` 的 `genre: "jazz"` 是廠牌列舉檔的預設值（`blue-note.json` 全檔 1,365 列都標 jazz），不是曲風判定。**
⚠ **池中同藝人的《Sailing to Philadelphia》(2000) 逐字是 `["rock","blues"]`，本張沒有 blues 訊號，不照抄。**

### 嚴格照第 1602 條「兩邊都掛」的有 3 張，本棒放寬的有 2 張（逐張交代）

| 卡 | 第 1602 條 | 本棒的判與理由 |
|---|---|---|
| `Ambrose Akinmusire《Origami Harvest》` | ✓ **兩邊都掛**（MB `hip hop`(1)、Discogs `genres` 逐字 `["Hip Hop","Jazz"]`） | `['jazz','hiphop']` |
| `The Nels Cline Singers《Share the Wealth》` | ✓ **兩邊都掛**（MB `rock`(1)、Discogs `genres` 逐字 `["Jazz","Rock"]`） | `['jazz','rock']` |
| `Norah Jones` ×2 | ✓ **Discogs `["Jazz","Pop"]` ＋ Apple `Pop`**；MB 那邊是 `vocal jazz`／`singer-songwriter`（同方向） | `['jazz','pop']`，**與池中《Come Away with Me》同形** |
| ⚠ **`Gregory Porter《All Rise》`** | ✗ **MB 逐字只有 `jazz`(1)** | ⚠ **仍判 `['jazz','soul']`**：**Discogs 同時在 `genres`（`["Jazz","Funk / Soul"]`）與 `styles`（`["Soul","Soul-Jazz"]`）兩欄給了三個 soul 訊號**，且**池中同藝人三張逐字都是 `["jazz","soul"]`**。**可逆（改的是卡單值）** |
| ⚠ **`Götz Alsmann《L.I.E.B.E.》`** | ✗ **兩邊給的都是 `easy listening`，不在十個合法值裡** | ⚠ **仍判 `['jazz','pop']`**：**c-160 a／c-161 a／c-161 b／c-162 a／c-163 a 五張同藝人卡逐字全部是 `["jazz","pop"]`，而本張的素材（1950–60 年代德國流行歌本）比那五張更靠流行那一側**。**`easy listening` 在本線的對映就是 `pop`。可逆** |

### ⚠ 依第 1572 條不跟的細分詞（本組共 9 種、出現 21 次）

**`contemporary jazz`（9 張中招，最多）／`post-bop`／`post bop`／`hard bop`／`soul jazz`／`jazz fusion`／`free improvisation`／`vocal jazz`／`singer-songwriter`／`soft rock`／`folk rock`／`easy listening`／`ballad`／`gospel`／`spoken word`／`beat poetry`／`Non-Music`——一個都沒有跟。**
⚠ **`Ron Carter & Danny Simmons` 那張特別值得記**：**Discogs `genres` 逐字 `["Jazz","Non-Music"]`、`styles` 逐字 `["Spoken Word"]`、MB 逐字 `beat poetry`(1)／`spoken word`(1)**——
**這張碟有一半是唸詩，但十個合法值裡沒有可對映的，只能留 `['jazz']`。** 記在這裡供日後若店主要開 spoken-word 這一格時參考。

⚠ **曲風欄逐張判、不逐藝人判**（c-163 b `Lionel Loueke《Gaïa》` 的先例）——本組有三張刻意與同藝人既有卡不同：
`Akinmusire`（池中《On the Tender Spot》是 `["jazz"]`）／`Charles Lloyd`（池中四張 1960–70 年代是 `["jazz","world"]`）／
`Derrick Hodge`（c-163 b《The Second》是 `["jazz","soul"]`）／`The Nels Cline Singers`（c-163 b《Lovers》是 `["jazz"]`）。

---

## 第 1882 條：**來源命中率與操作面結算**

### 五層命中率（22 筆全體，含退件）

| 層 | 命中 | 備註 |
|---|---:|---|
| **② Discogs** | **22／22** | **每一張都查到了零售條目，`format`／`series`／廠牌鏈／companies 四欄逐字可用。⚠ 本批的三次退件全部由這一層定案**（Turrentine 與 Jimmy Smith 的原盤條目、Kuwabara 的 `Verve Records` 廠牌欄） |
| **④ Apple** | **20／22** | ⚠ **兩張 0**：**`Ambrose Akinmusire《Origami Harvest》`（用盤名查 us 回 0 筆；改用 `Akinmusire` 掃全目錄回 25 筆、涵蓋他 2007–2026 的十張個人碟，唯獨沒有這張——**是真的不在店面，不是查法錯誤**）；`Götz Alsmann《L.I.E.B.E.》` 的 us 0（de 有貨，`1535625211`） |
| **③ 廠牌官網** | **15／21 位藝人** | **`bluenote.com/artist/<藝人>/` 逐一實測**：**200** ＝ ambrose-akinmusire／dr-lonnie-smith／jacky-terrasson／bill-frisell／norah-jones／ron-carter／charles-lloyd／derrick-hodge／gogo-penguin／rick-margitza／nels-cline／gregory-porter／art-blakey／stanley-turrentine／jimmy-smith；**404** ＝ thomas-dutronc／mark-knopfler／yaron-herman／gotz-alsmann／ai-kuwabara／chihiro-yamanaka／**lonnie-smith（裸名路徑，要走 `dr-lonnie-smith`）**。⚠ **404 的六位全是歐陸與日本線藝人**（第 1750／1775 條的形狀）；⚠ **`derrick-hodge` 現在回 200，與 c-162 b 第 1750 條記錄的 404 相反，見第 1877 條（四）** |
| **① 紙本** | **未執行（18 張）／1 張留給下游** | ⚠ ⚠ **依主線第 1728 條第 2 點，2016 年以後的碟紙本結構性查不到，「紙本 0 命中」不得寫成缺失或疑點，也不要花工時去抓——本組 18 張（2018–2020）直接跳過這一層，19 張的 `risk` 裡一律不交代紙本。**⚠ **唯一的例外是 `Rick Margitza《Hope》`**：**改判到 1991 之後落在 Billboard 有覆蓋的年段（1955→2015，第 1723 條）**，依第 1728 條第 3 點「紙本仍要查 2015 以前的碟」**這一張該查，本棒未執行，已在該卡 `risk` 註明留給下游** |
| **⑥ 維基／⑤ AllMusic** | **0** | 未使用（②④③ 三層已足以定案每一張） |

⚠ **本批的來源序列（主線第 1728 條起的新序）在實務上完全成立**：
**② Discogs 22／22，而且三次退件、兩次盤名裁定、一次年份改判全部由它定案；④ Apple 20／22，主要貢獻是 ℗ 年（Turrentine 的 `℗ 1961`、Jimmy Smith 的 `℗ 1957`、Margitza 的 `℗ 1991` 三筆都是決定性的）。**
⚠ ⚠ **本棒要補一句給後批：④ Apple 的 ℗ 欄在「老碟的日版再發」這個形狀上特別可靠**——
**它保留的是原始權利年而不是再發年**（Turrentine 那張的 Apple 條目 `releaseDate` 逐字是 `1961-04-19`，日版 CD 是 2019 年的事），
**與第 1601 條記錄的「2005 年後 ℗ 欄常寫現在的權利人」那個陷阱方向相反。兩個都要記，用哪一個看碟的年代。**

### 操作面（供後批直接抄）

- **MusicBrainz 的 User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，本批 22 個 RG ＋ 85 筆 release 明細共 107 次請求，零 503。** 節流 1.1 秒／次。
- **Discogs 的 `api.discogs.com` 免認證可用**（`database/search?type=release` 與 `releases/<id>` 兩個端點），
  ⚠ **節流要拉到 2.6 秒／次**，本批 22 次搜尋 ＋ 29 次 release 明細零 429。
- **`itunes.apple.com/search` 偶爾回空 body**（本批中過 5 次），**要包 retry 並檢查 `if(!t.trim())`，不要直接 `JSON.parse`**。
- **證據層一抓完就寫進 repo**（`CLAUDE.md` 續跑安全第 3 點）：
  **`batch-progress/c164/mb-b.json`（85 KB）／`apple-b.json`（36 KB）／`discogs-b.json`（164 KB）／`discogs-rel-b.json`（46 KB）**，
  四份都在檔案系統上，重啟後可直接續跑，不必重抓。

### barcode 取用（第 1674 條：MB release `barcode` > Discogs > slice `catno`）

**19 張的 `label` 欄逐一記了 barcode，全部取自 MB release 的 `barcode` 欄**；
⚠ **只有 `Jacky Terrasson《53》` 的實體 CD 那一筆例外**——**MB `75384baf` 的 `barcode` 逐字 `null`、`label-info` 逐字空陣列，改取 Discogs `14200033` 的 `602508081965`**（第二順位），已在該卡 `label` 欄註明。

