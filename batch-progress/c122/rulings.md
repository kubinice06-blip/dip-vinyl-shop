# c-122 紐約硬蕊與 straight edge 的 7 吋、split 與 demo：策展層裁定（2026-09-08）

交件：`prop-a.json` **23 張／19 位**、`prop-b.json` **20 張／14 位**，合計 **43 張、33 位掛名**。
年份範圍 **1983–1999**（prop-a 1983–1997、prop-b 1985–1999）。
`node batch-progress/c122/chk-prop.mjs a b` → **標記 0**
（線上池撞卡 0、跨組重複 0、跨批去重 73 批／3,286 張撞卡 0；另手動與 c-120 的 44 張逐鍵比對，撞卡 0）。

**這批是 c-120 第 4.1 節那份未收清單的兌現。** 店主 2026-09-08 為 hardcore 開 §5.5 白名單
（`hardcore-7inch`），c-120 因白名單未開而整批退掉的 101 筆／99 個 release-group／33 支團，
本批從中選出 43 張建卡。**`releaseType` 分佈：EP 40 張、Other 1 張、Album 2 張。**

---

## 一、本批立的裁定

### 第 1 條：**九支「c-120 全滅」的團，收回八支；Straight Ahead 開了白名單仍然是零**

派工信第 2 點指定的九支團，實跑結果：

| 團 | 本批收到 | 所釘的碟 |
|---|---:|---|
| Chain of Strength | **2** | True Till Death (1989)、The One Thing That Still Holds True (1995) |
| Inside Out（LA／橙縣） | **1** | No Spiritual Surrender (1990) |
| Raw Deal | **1** | Raw Deal (1988，CAA 404，唯一實體) |
| Krakdown | **1** | Krakdown (1989) |
| Outburst | **1** | Miles to Go (1989) |
| The Icemen | **1** | Rest in Peace E.P. (1991，CAA 404，唯一實體) |
| Life's Blood | **1** | Defiance (1988) |
| Side by Side | **1** | You're Only Young Once... (1988) |
| **Straight Ahead** | **0** | —— |

**Straight Ahead 是本批唯一沒能救回來的一支，而且原因與白名單無關。**
回問藝人實體 1fd60d7c 名下三個 release-group，逐筆拉 `inc=releases+media` 之後：

- `43e45d0d`《Spirit Of Youth》——`first-release-date` 為 null，**唯一 release 是 US Bootleg 7 吋**。
- `55bd854d`《1987-03: CBGB, NY》——**唯一 release 是 US Bootleg 數位**（Other＋Live）。
- `443e4c64`《Straight Ahead / NYC Mayhem》——**唯一 release 是 XE Bootleg 12 吋**（null＋Compilation）。

**三個 release-group 全部只有 Bootleg release，依裁定 43／57 一律不收。**
c-120 第 1 條把 Straight Ahead 歸因於「《Breakaway》是 Single」，本批回問後更正：
**MB 上根本沒有《Breakaway》這個 release-group**，這支團在 MB 的三個實體全是私製盤。
**裁定：Straight Ahead 不是白名單能解決的缺口，是 MB 建檔本身沒有可釘的官方實體；
本批不收，記入第四節，留給日後 MB 端有官方發行建檔後再處理。**

### 第 2 條（新）：**MB 標 `Album` 的兩張 7 吋，走一般 Album 路徑，例外欄位必須留空**

c-120 第 2 條把 Gorilla Biscuits 同名 7 吋（96ae45ee）與 Side by Side《You're Only Young Once...》
（d217f68a）以「MB 標 Album、實體是 7 吋」為由退掉。**白名單開了之後，退它們的理由消失了——
但不是因為 §5.5 收了它們，而是因為它們在 MB 的型別本來就是 `Album`，本來就合格。**

這裡有個會踩到的縫：派工信要求「每一張都要填四個欄位」，但 `chk-prop` 的分支是
**`releaseType === 'Album'` 且帶 `exceptionReason` 或 `exceptionEvidenceUrls` → 亮「非合輯卻帶例外欄位」**。
兩張都填反而過不了。

**裁定：形態判定看 `media.format`（c-120 第 2 條不變），但欄位怎麼填看 MB 的 `primary-type`。**
這兩張 `releaseType: "Album"`、`genreException`／`exceptionReason` 空字串、`exceptionEvidenceUrls` 空陣列，
**「實體是 7 吋」這件事寫進 `risk` 與 `mbNote`，不寫進例外欄位。**
本批適用兩張，其餘 41 張走 §5.5（40 張 EP＋1 張 Other）。

### 第 3 條（新，延伸 c-120 第 5 條）：**ASCII 收斂也適用於省略號**

c-120 第 5 條把「掛名與盤名一律取卡池多數形（ASCII 標點）」限定在連字號與引號。
本批撞到第三種：Side by Side 的 MB 標題是 **`You’re Only Young Once…`**，
同時用了 **U+2019 彎引號**與 **U+2026 省略號**。

實掃 `seed_cards.json` 全 14,424 列：

| 字形 | 張數 |
|---|---:|
| ASCII 直引號 `'` | **774** |
| U+2019 彎引號 `’` | 26 |
| ASCII 三點 `...` | **82** |
| U+2026 省略號 `…` | 26 |

**兩項都是 ASCII 為多數形，比例接近 30:1 與 3:1。**
另一個獨立佐證：**Apple us 店命中的 collectionId 1606212228，標題就寫成 ASCII 的
`You're Only Young Once...`。**

**裁定：盤名寫 `You're Only Young Once...`（ASCII 直引號＋三個 ASCII 句點），
MB 原字形記入 `queryAlias`。** 理由與 c-120 第 5 條完全相同：`chk-prop` 的 `k()` 會把標點整組剝掉，
兩形同鍵不會分裂；卡池顯示要一致；裁定 186／217 的方向本來就是往 ASCII 收斂。
**這條不改「盤名用 MB 實體文字」（裁定 6／70／120）——那條管用哪個字串，這條管標點的字形。**

### 第 4 條（新）：**同名不同團在同一組裡並存：兩個 `Inside Out` 必須分開處理**

b 組同時收了兩張掛「Inside Out」的碟，**但那是兩支不同的團**：

| 卡 | 所釘實體 | disambiguation | 搜尋排名 |
|---|---|---|---|
| Inside Out —《No Spiritual Surrender》(1990) | **0049c4d7** | 「Los Angeles area hardcore band」 | 排 1、score 100 |
| Alone in a Crowd / Inside Out（1989 split） | **ed113a79** | 「New York hardcore band」 | **排 7、score 94** |

`artist:"Inside Out"` 回 **15 個同名實體**，目標之一排在第 7 名——**又一個 score 排序不可用的實例**。

**裁定：兩張都收，但掛名字串必須不同。** split 那張照 MB 的 joint artist-credit 寫成
`Alone in a Crowd / Inside Out`，與單獨的 `Inside Out` 在 `chk-prop` 的 `k()` 下是不同鍵，
不會折成同一張卡。**兩張的 `risk` 都已互相點名對方，明寫「不是同一支團」，
避免研究層或寫作層把兩支團的沿革寫混。**

### 第 5 條（裁定 250 的本批實測）：**Judge 149 個、Breakdown 71 個；`score` 再次不可用**

36 個掛名回問共回傳 **420 個藝人實體，擋下 384 個同名實體**。回傳超過 10 個的十組：

| 掛名 | 同名實體 | 目標排名 | score |
|---|---:|---:|---:|
| **Judge** | **149** | **第 4** | 90 |
| **Breakdown** | **71** | 第 1 | 100 |
| Neanderthal | 27 | 第 1 | 100 |
| Integrity | 18 | 第 1 | 100 |
| Rorschach | 17 | 第 1 | 100 |
| **108** | 17 | 第 1 | 100 |
| Absolution | 16 | 第 1 | 100 |
| **Inside Out** | 15 | **第 7**（紐約）／第 1（洛杉磯） | 94／100 |
| Outburst | 12 | 第 1 | 100 |
| The Icemen | 4 | **第 3** | 98 |

**Judge 完全複製 c-120 的結果（149 個、排第 4、score 90）**，`Inside Out` 與 `The Icemen`
是本批新增的兩個「目標不在第一名」的實例。**判準一律只看 `disambiguation`。**

**裁定 250 後半（disambiguation 空白者不得背書本名）在本批命中 14 個實體**：
Cause for Alarm(2 個同名)、Life's Blood(3)、Madball(3)、Born Against(3)、Sick of It All(1)、
Krakdown(1)、Vision of Disorder(1)、Maximum Penalty(1)、Crown of Thornz(1)、Youth of Today(1)、
Chain of Strength(1)、Alone in a Crowd(1)、Snapcase(1)、Earth Crisis(1)。
**其中同名實體 >1 的四個（Cause for Alarm、Life's Blood、Madball、Born Against）
已在各卡 `risk` 逐筆標明「行文不得以 disambiguation 背書本名」**；其餘十個同名實體只有 1 個、
身分無分歧，但仍在 `risk` 註記改以名下目錄與 catno 為身分依據。

### 第 6 條（新）：**掛名字形分歧不只標點：`War Zone` vs `Warzone`**

Warzone《Lower East Side Crew E.P.》(0f1b6901) 的 **MB artist-credit 是 `War Zone`（中間有空格）**，
但所釘的藝人實體 496da466 主名是 `Warzone`。實測 `artist:"War Zone"` 回 2 個實體、
**目標不在前 25 名內**——因為那不是它的實體名，只是這一張的 credited-as。

**裁定：掛名寫 `Warzone`**，與 c-120 的另兩張 Warzone 卡一致，credited-as 形記入 `queryAlias`。
**這是 c-120 第 5 條的鄰居但不同類：那條處理標點字形，這條處理「credited-as 與實體名不同」。
往後遇到 credited-as 與實體主名分歧時，一律取實體主名並在 `queryAlias` 留下 credited-as。**

### 第 7 條（裁定 220／251 的本批形狀）：**7 吋的再發把軌數翻倍，年份也往後跑**

43 張裡 **19 張**出現同一張碟不同載體軌數不同，最大的幾組：

- **Madball《Ball of Destruction》**：1989 年 7 吋 8 軌 vs 1997 年 CD **23 軌**（把早期 EP 整批併進來）。
- **Outburst《Miles to Go》**：1989 年 7 吋 7 軌 vs 2000 年 CD 14 軌 vs 2017 數位 **15 軌**。
- **Gorilla Biscuits 同名**：1988 年黑膠 7 軌 vs 1991 年起各版 CD **12 軌**（併入 1987 年 demo）。
- **Inside Out《No Spiritual Surrender》**：1990 年黑膠 4 軌 vs 1994／1996 各版 **6 軌**。
- **Madball《Droppin' Many Suckers》**：CD 12 軌 vs XW 數位 **7 軌**（數位版反而更少）。

**43 張的 `label` 欄全部已寫明所釘的是哪一版（載體＋軌數＋國別＋catno）。**

年份方面，**Apple 與 MB 差一年以上的有四張**，方向兩邊都有：
Judge《New York Crew》MB 1988／Apple 1989、Earth Crisis《Firestorm》MB 1993／Apple 1995、
Crown of Thornz《Train Yard Blues》MB 1995／Apple 1996（且 Apple 上是與《Mentally Vexed》的併輯）、
Raw Deal MB 1988／Apple gb 店 2025。**`year` 一律取 MB `first-release-date`，43 張的 `risk` 已逐筆交代。**

另記 **裁定 220 的「日期掛在數位那筆」形狀**在本批的實例：
Cause for Alarm 同名 EP 的 `first-release-date` 1983-01-01 掛在 XW 數位 release 上，實體首版是 1983 US 7 吋。

### 第 8 條（新）：**Apple 的盤名字串比對在自名碟上會配到 split**

`Snapcase — Snapcase`（1991 卡帶 demo）以「掛名＋盤名」查 Apple us 店，
**配到的是 1999 年的 split《Snapcase vs. Boy Sets Fire - EP》（collectionId 493675039）——
那是本組另一張卡的碟。** 包含式比對在自名碟上必然誤中：`snapcase` 是
`snapcase vs boysetsfire` 的子字串。

**裁定：Snapcase 同名 demo 記為三店未命中**，該卡 `risk` 已寫明這個陷阱；
**兩張卡一律以 `collectionId` 或 `rgMbid` 分辨，不得用盤名字串。**
這是 c-120 第五節「`Set It Off`／`Mantra` 那幾個通用盤名」的同一條規則在**自名碟**上的新形狀：
**凡是 self-titled 又有 split／vs 類碟名的團，盤名比對一律失效。**

### 第 9 條：**§5.6 開啟數 0；`Live` 收 1 張、`Demo` 收 4 張**

43 張裡 `primary-type=Compilation` **0 個**（裁定 167／190 的第八次應驗）。
唯一帶 `Compilation` 的是 Chain of Strength《The One Thing That Still Holds True》，
**MB `primary-type` 是 `EP`、`secondary-types` 才是 `["Compilation"]`——依 primary-type 走 §5.5，不走 §5.6。**

`secondary-types` 含 **`Live` 1 張**（Warzone《Live At CBGB》，依裁定 253 照收，
`mbNote` 已註明是現場錄音、場地為紐約 CBGB，且 **MB 只給發行年 1993、未記演奏日期**，
卡上不得把發行年當演奏年斷言）。
含 **`Demo` 4 張**（Gorilla Biscuits《demo 1987》、Vision of Disorder《Demo '93》、
Raw Deal、Snapcase 1991 卡帶——後兩者 MB 未標 Demo 但實體是卡帶 demo）。

---

## 二、與既有批的實掃對照

### 池中現況（實掃 `seed_cards.json` 全 14,424 列，不是抽測）

**本批 33 個掛名，池中活卡合計 1 張。**

- **唯一命中：`Quicksand / Slip`。** 本批所收的是 1990 年的同名 EP（Revelation REV 018），
  與《Slip》(Polydor) 不同 release-group、不撞卡——而且《Slip》的來源正是這張 EP，
  補進去等於把池中那張孤卡接回自己的譜系。
- **其餘 32 個掛名全部 0 張**：Agnostic Front、Cause for Alarm、Sick of It All、Warzone、
  Raw Deal、Life's Blood、Krakdown、Outburst、Absolution、Madball、Born Against、The Icemen、
  Rorschach、Neanderthal、Vision of Disorder、Bulldoze、Maximum Penalty、Crown of Thornz、
  Breakdown、Youth of Today、Gorilla Biscuits、Judge、Side by Side、Chain of Strength、
  Alone in a Crowd、Inside Out、Integrity、Snapcase、Ressurection、Turning Point、No Escape、
  Earth Crisis、108、boysetsfire。
- **易誤中的字串已以完整掛名比對排除**：查 `Burn` 會命中 R.L. Burnside(4)／Burning Spear(2)／
  Van Cliburn／Amos Milburn 等 13 列；查 `Bold` 命中 `Boldy James & The Alchemist`；
  查 `CIV` 命中 `The Civil Wars`；查 `Life` 命中 Tony Williams Lifetime、Westlife 等 5 列；
  查 `Murphy` 命中 Mark Murphy(2)。**全部不是本批的團。**

### 與 c-120 的對照（最重要的一項）

- **c-120 的 44 張與本批 43 張逐鍵比對，撞卡 0。**
- **15 個掛名兩批都有，但碟不同**：Agnostic Front、Sick of It All、Warzone、Madball、
  Born Against、Quicksand、Vision of Disorder、Youth of Today、Gorilla Biscuits、Judge、
  Integrity、Snapcase、Ressurection、Earth Crisis、108。
  **這是刻意的：c-120 收的是長篇，本批收的是同一批團在長篇之前（或之間）的 7 吋、split 與 demo。**
  例如 Gorilla Biscuits 三級補齊（1987 demo → 1988 Revelation 7 吋 → c-120 的 1989《Start Today》）、
  Judge 三級補齊（1988《New York Crew》→ c-120 的 1989《Bringin' It Down》→ 1990《There Will Be Quiet...》）。
- **同一支團張數上限（派工信第 3 條，2–3 張）**：本批取 2 張的有十組——
  108、Warzone、Madball、Vision of Disorder、Bulldoze、Gorilla Biscuits、Judge、
  Chain of Strength、Snapcase、Earth Crisis；**沒有任何一支團在本批取到 3 張**
  （Snapcase 另有一張是 joint credit 的 `snapcase vs boysetsfire`，掛名字串不同）。

### 廠牌線覆蓋（本批的側產物）

本批把這條線的廠牌骨幹一次立起來，各廠牌在卡池中的第一張都由本批提供：

| 廠牌 | 本批張數 | 代表 catno |
|---|---:|---|
| Revelation Records | **8** | Revelation:1（Warzone）、Revelation:4（GB）、Revelation:5（Side by Side）、Revelation:10（CoS）、REV 003、REV 018、REV019、Revelation: 20 |
| Vermiform | 2 | Born Against 同名、VMFM 04.5 |
| Blackout! Records | 2 | BL-3、BL-11CD |
| Equal Vision Records | 2 | EVR020、EVR51 |
| Victory Records／Victory Europe | 2 | VR11、VE12 CD、VR024 CD |
| Lost and Found Records | 2 | LF 251CD、LF 254 |
| 其餘各 1 | 13 | AF 001、Schism Skiz-2、Positive Force Number 4、In-Effect、Wreck-Age WAR010-2、Combined Effort CER-03、Common Cause NR-18183、New Age NA10、Temperance TEMP-2、Flux FR-2、Dark Empire DARK 003-7、Hardway HR 04、Astor AR 99002、Striving for Togetherness SFT-10、Eyeball EB007、Conviction |

**MB label-info 未填廠牌的有 6 張**（Cause for Alarm 1983 7 吋、Raw Deal、Life's Blood、
Gorilla Biscuits demo、Vision of Disorder Demo '93、Bulldoze demo、Snapcase demo）——
全部是自製 demo 或早期私壓，`label` 欄已照實寫「MB label-info 未填廠牌」。

---

## 三、封面與店面

### 封面 CAA（逐張 `HEAD https://coverartarchive.org/release-group/<id>/front` 實測）

**43 張中 40 張回 200（93.0%）。** 回 404 的只有 3 張，**全部是派工信第 1 條允許的例外
——「整支團唯一收得進來的碟」**：

| 碟 | 為什麼仍然收 |
|---|---|
| Raw Deal —《Raw Deal》(1988) | 藝人實體 a940eaf6 名下**只有這 1 個 release-group**，其餘聲音全在改名 Killing Time 之後 |
| The Icemen —《Rest in Peace E.P.》(1991) | 藝人實體 b9cfa4ae 名下**只有這 1 個 release-group** |
| Alone in a Crowd / Inside Out（1989 split） | Alone in a Crowd 名下另一個 RG 是 2014 年數位版、`primary-type` 為 null，**這張是唯一收得進來的實體** |

**三張的 `why` 都已依 c-120 第 3 條寫明：收的是「唯一收得進來的碟」而不是「最重要的碟」。**

### Apple（`us` → `gb` → `de` 依序，非 `cleaned`）

**43 張中 13 筆有命中，扣掉 1 筆誤配與 1 筆存疑，實命中 11 張（25.6%）。**

- **確實命中 11 張**：Cause for Alarm(804864429)、Outburst(1687344809)、Quicksand(91742212)、
  Crown of Thornz(661880635)、Gorilla Biscuits(90254613)、Judge《New York Crew》(1471235742)、
  Side by Side(1606212228)、Inside Out《No Spiritual Surrender》(91742440)、
  Earth Crisis《Firestorm》(1558948772)、Chain of Strength《One Thing》(91072229)、
  Snapcase《Steps》(1558948326)。**`collectionId` 已逐張寫進各卡 `risk`。**
- **誤配 1 張**：Snapcase 同名 demo → 配到 split（見第一節第 8 條），記為未命中。
- **存疑 1 張**：Raw Deal gb 店的 1818931687 標 **Apple 年份 2025**、與本張 1988 年相距 37 年，
  身分存疑，**不採為對應**，`risk` 已寫明。
- **其餘 30 張：us／gb／de 三店以「掛名＋盤名」搜尋皆未命中**（各卡 `risk` 已記下三店各回幾筆）。
  **依裁定 231，這只是初測，要隔時重試才能升級成「Apple 沒有這張」的事實。**
- 店面 `us`（其次 `gb`／`de`），依派工信。

**⚠ 給研究層的三個地雷**（都寫進了對應卡的 `risk`）：
1. `Snapcase`／`snapcase vs boysetsfire` — 盤名比對必然互相誤中，只能用 `collectionId`。
2. `108` — 純數字掛名，字串比對極易誤中，配對務必用 MBID。
3. `Judge`／`Breakdown`／`Inside Out` — 同名實體 149／71／15 個，只有 `disambiguation` 分得出來。

---

## 四、未收清單

本節的母體是 c-120 第 4.1 節的 101 筆／99 個 release-group。本批收 43 張，**未收 58 筆**，
分四類。**這份清單日後可以直接續建，`rgMbid` 與封面狀態齊備。**

### 4.1 CAA 404，且該團另有 CAA 200 的碟可收（依派工信第 1 條不收）——**22 筆**

| 藝人 | 盤名 | 年 | rgMbid | 該團本批／c-120 已收的替代 |
|---|---|---|---|---|
| Sick of It All | Sick of It All（demo） | 1986 | 37f85705 | 本批收 1987 年同名 7 吋（**且盤名同鍵，兩張不能並存**） |
| Leeway | Enforcer | 1985 | 61ebb2b5 | c-120《Born to Expire》 |
| Killing Time | Happy Hour | 1991 | 8396d5e4 | c-120《Brightside》 |
| Killing Time | Unavoidable | 1996 | 10c8e33e | 同上 |
| Merauder | Merauder（demo） | 1993 | 886656d7 | c-120《Master Killer》 |
| Merauder | Demo (3 Songs) | 1994 | 05f12c2e | 同上 |
| Youth of Today | Disengage | 1990 | d79f8961 | 本批《Can't Close My Eyes EP》 |
| Youth of Today | Benefit 7" | 1991 | f6db3d13 | 同上 |
| Bold | Bold | 1989 | ded535a9 | c-120《Speak Out》（本張另有 `primary-type` null、status 未填兩個問題） |
| Bold | Looking Back | 1993 | df1cef0d | 同上 |
| Born Against | My Country Tis of Thee… | 1989 | d2800466 | 本批同名 7 吋 |
| Born Against | Alive With Pleasure / Suckerpunch | 1991 | de7bebc7 | 同上 |
| Born Against | Universal Order Of Armageddon / Born Against | 1993 | 96a2eccb | 同上 |
| Born Against | Born Against / A Call For Consciousness | 1994 | 88f82643 | 同上 |
| Born Against | Screeching Weasel / Born Against | 1994 | 98066280 | 同上 |
| Chain of Strength | What Holds Us Apart | 1990 | 4da4d192 | 本批《True Till Death》＋《One Thing》 |
| Inside Out (LA) | Demo | 1989 | 25ee1b30 | 本批《No Spiritual Surrender》 |
| Shelter | Bhajanas | 1991 | 0684e1f4 | c-120《Perfection of Desire》《Mantra》 |
| Shelter | Shelter Bhajan | 1993 | 36c615c6 | 同上 |
| Shelter | Brother Soul | 2001 | 53794d7b | 同上 |
| Supertouch | What Did We Learn | 1989 | 5017e778 | c-120《The Earth Is Flat》（**這張是 Revelation REV 6，歷史地位高，封面補得到就該收**） |
| Integrity | Harder They Fall／Scar of a Woman／Integrity／Les 120 journees de Sodome | 1989–1992 | 0aca9215、8eac40b8、55a2f96c、bf08a755 | 本批《In Contrast of Sin》（**四筆併記為一列**） |
| Maximum Penalty | Demo '89 | 1989 | 5add24e8 | 本批《Demo EP》 |
| Maximum Penalty | East Side Story | 1996 | bd2cb750 | 同上 |
| Breakdown | Runnin' Scared | 1989 | 00a35700 | 本批《Blacklisted》 |
| Nausea | Smash Racism, Now／Lie Cycle | 1992 | 43c0195c、46030df7 | c-120《Extinction》 |
| Sheer Terror | Old, New, Borrowed And Blue／Beaten by the Fists of God | 1994、2005 | 4d503b52、c3f537cd | c-120《Just Can't Hate Enough》 |
| Into Another | Creepy Eepy EP／Poison Fingers EP | 1992、1995 | 308472ac、33077427 | c-120《Ignaurus》 |
| Inside Out (NY) | —— | —— | —— | 本批以 split 23715865 收入（見第一節第 4 條） |

**這一類裡最該優先回頭補的是 Supertouch《What Did We Learn》(Revelation REV 6)**——
它在 Revelation 目錄前段的位置，比本批收的好幾張都高，唯一的問題是封面。

### 4.2 名額用完（同團 2–3 張上限，形態與封面皆合格）——**14 筆**

- **Agnostic Front**：《Por Vida》(1997, e40521b4)、《Puro Des Madre》(1998, 371262fc)、
  《Unity》(1999, 41aa4c07)、《Believe》(2003, b7127f70)——**CAA 皆 200**，但屬後期，本批以 1983 年為準。
- **Warzone**：《Lower East Side》(1996, 0ca305ab)、
  《Cause for Alarm / Warzone》(1983, 0cb26c46——**1995 年才有 CD，無原盤黑膠 release**)。
- **Sick of It All**：《We Stand Alone》(1991, d148f81c)、《Breaking Barriers》(1992, 1fd111b1)。
- **Madball**：《N.Y.H.C. EP》(2003, bdbee3d1)。
- **Vision of Disorder**：《Demo '94》(11bcb162)、《Demo '95》(c1931dbd)、
  《Resurrecting Reality》(1998, 683a9915)、《VOD / Minor League / Wrongside》(1999, ff1b6d5a)、
  《2-Song Sampler》(2001, 3e379c5d)。
- **Snapcase**：《Two Songs》(2002, 274f0873)。
- **Bulldoze**：本批已取 2 張，無其餘。
- **108**：本批已取 2 張，無其餘。

### 4.3 status 非 Official（裁定 43／57）——**4 筆**

| 藝人 | 盤名 | 問題 | rgMbid |
|---|---|---|---|
| **Straight Ahead** | Spirit Of Youth | **唯一 release 是 US Bootleg 7 吋**，`first-release-date` 為 null | 43e45d0d |
| **Straight Ahead** | 1987-03: CBGB, NY | **唯一 release 是 US Bootleg 數位** | 55bd854d |
| **Straight Ahead / NYC Mayhem** | Straight Ahead / NYC Mayhem | **唯一 release 是 XE Bootleg 12 吋** | 443e4c64 |
| Shelter | Beyond Planet Earth | 回問確認**唯一 release 的 status 是 `Promotion`**（US 1997 卡帶）——c-120 清單記為 EP＋CAA 200，但形態上是宣傳品 | 5184003f |

**Straight Ahead 三筆是本批唯一一支「開了白名單仍然全滅」的團**（見第一節第 1 條）。

### 4.4 策展判斷不收（形態與封面合格，但不在本批範圍或碟本身較弱）——**18 筆**

- **Shelter《The Power of Positive Thinking》(2001, 0015c77d)**——義大利 10 吋 Official、CAA 200，
  形態合格，但 Shelter 在 c-120 已有 2 張，且 2001 年這張在該團沿革上的位置遠不如前兩張。
- **Rorschach《Rorschach / Neanderthal》以外的 split**、**Cause for Alarm / Warzone 合體 CD**——
  併輯性質，無原盤黑膠 release。
- **c-120 第 4.6 節整批留待下一輪的三區**，本批同樣不動，理由不變：
  **華府那一側**（Battery 等，屬 c-81 範圍）、
  **紐約以外的 90s straight edge 外圍**（Strife／Bane／American Nightmare／Trial／
  Ten Yard Fight／In My Eyes／Floorpunch／Ringworm／Hatebreed／Damnation A.D./Iceburn／
  Deadguy／Starkweather——**MBID 已備妥，是下一輪的現成骨幹**）、
  **紐約 crossover／金屬交界**（Carnivore／Crumbsuckers／Ludichrist／Life of Agony／Biohazard——
  應與金屬線一起排，不宜夾在硬蕊批裡）。
- **c-120 第 4.3 節的五筆「MB 查無原盤」**（Citizens Arrest《Colossus》、Beyond《No Longer at Ease》、
  Token Entry《Jaybird》、Uppercut《Four Walls》、Straight Ahead 系）——本批未動，
  **仍建議走 §1 人工補遺批**。
- **c-120 第 4.5 節的 Judge《Chung King Can Suck It LP》(f8a7f887)**——RG 標題把「LP」寫進盤名，
  本批同樣不釘，留給本機決定。

---

## 五、資料採集紀錄

- **MusicBrainz**：1 req/s，UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；
  503 一律退避重試、不當查無（裁定 28）。**目錄一律
  `release-group?artist=<MBID>&limit=100&offset=` 分頁全列，未使用 `inc=release-groups`（裁定 116）。**
- **release-group 回問 66 個**（c-120 清單裡的候選 61 個＋補查 5 個），
  一律帶 `fmt=json&inc=artist-credits+releases+media`——**`media` 是判斷實體形態的唯一依據
  （c-120 第 2 條），本批全程使用。66 個之中 65 個仍在（1 個是自建的佔位 ID，回 404），
  無任何一個因 RG 合併而失效。**
- **藝人目錄分頁全列 13 支**（九支「全滅」團＋Alone in a Crowd 兩個 credit 實體＋NYC Mayhem
  ＋Inside Out），確認「唯一實體」的說法逐支成立。
- **掛名回問 36 個實體**，各跑一次 `artist/<id>` 與一次 `artist/?query=artist:"<name>"&limit=25`，
  **合計回傳 420 個藝人實體、擋下 384 個同名實體**。
- **封面**：`HEAD https://coverartarchive.org/release-group/<id>/front` 逐張實測 43 個，200／404 = 40／3。
- **廠牌與 catno**：對 43 張各釘一筆首版實體 release，查 `release/<id>?inc=labels+media` 取
  廠牌、catalog-number、國別、status 與軌數。**Digital Media 一律不作為所釘版本**，
  只有在該 RG 名下無實體 release 時才回退。
- **Apple**：`itunes.apple.com/search?entity=album` 在 `us`／`gb`／`de` 依序各跑一次，
  比對要求藝人與盤名正規化後互相包含且 `collectionExplicitness !== 'cleaned'`；
  **命中即停、不再往下一個店查**。
- **卡池**：`seed_cards.json` **全 14,424 列實掃**，33 個掛名逐一比對，
  另對 `Burn`／`Bold`／`CIV`／`Life`／`Murphy` 五個易誤中字串做包含式反查以排除假命中。
- 落檔：`rg-probe.json`、`cat-probe.json`、`caa-label.json`、`artist-probe.json`、`apple.json`
  皆為逐筆寫入、可續跑（容器重啟後重派同一支代理可接著跑）。
