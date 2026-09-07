# c-120 紐約硬蕊與 90s straight edge：策展層裁定（2026-09-07）

交件：`prop-a.json` **22 張／16 位**、`prop-b.json` **22 張／19 位**，合計 **44 張、35 位**。
年份範圍 **1984–2017**（prop-a 1984–1995，prop-b 1987–2017；2017 那一張見第 3 條）。
`node batch-progress/c120/chk-prop.mjs a b` → **標記 0**
（線上池撞卡 0、跨組重複 0、跨批去重 72 批／3,245 張撞卡 0）。

---

## 一、本批立的裁定

### 第 1 條：**「不開 §5.5 白名單」的實測代價是 99 個 release-group、33 支團**

派工信與 `CURATION-BRIEF-c119plus.md` 第四節已定調：照 c-116 第 1 條的先例，本批不為 hardcore 開
§5.5 白名單，**只收 `primary-type=Album` 且 `secondary-types` 為空的碟**。實跑之後的數字：

- 掃 **77 個藝人實體、1,090 個 release-group**（骨幹 54 位＋外圍 23 位，皆以
  `release-group?artist=<MBID>&limit=100&offset=` 分頁全列，未用 `inc=release-groups`）。
- **因 7 吋 EP／split／demo 卡帶而未收：101 筆、99 個唯一 RG、涵蓋 33 支團**（清單見第四節）。
  其中 **CAA 回 200 的有 60 個、404 的有 39 個**——**六成的未收品項封面已經備妥，店主一旦開白名單，
  那 60 張可以直接建卡。**
- **整支團因此一張都收不進來的有 9 支**：
  Chain of Strength（名下 3 個 RG 全是 EP）、Inside Out（LA，名下唯一非 Live 的實體是
  1990 年 7 吋《No Spiritual Surrender》）、Raw Deal（唯一 RG 是 1988 年 7 吋）、
  Krakdown（唯一 RG 是 1989 年 7 吋）、Outburst（唯一 RG 是 1989 年 7 吋《Miles to Go》）、
  The Icemen（唯一 RG 是 1991 年 7 吋）、Life's Blood（1988《Defiance》primary-type 為 null）、
  Straight Ahead（1987《Breakaway》是 Single）、Side by Side（見第 2 條）。
  **這九支裡有六支是紐約硬蕊 1988–1990 年公認的核心實體**，本批完全空手。

**裁定：照派工信執行，不自行擴大白名單；但把上述數字與清單完整交出，
讓收尾時能一併向店主提報「這條線的損失規模」。**

### 第 2 條（新）：**`secondary-types` 為空、`primary-type=Album`，仍可能是 7 吋——要看轄下 release 的 `media.format`**

裁定 227 說的是「`secondary-types` 為空不代表是原盤」（整編盤常常沒標）。本批遇到**反過來的形狀**：
MB 把實體是 **7 吋** 的碟建成 `Album`，型別欄完全乾淨，只有拉出轄下 release 的 `media` 才看得出來。

| 碟 | RG | MB 型別 | 轄下 release 實體 |
|---|---|---|---|
| Side by Side《You're Only Young Once…》(1988) | d217f68a | Album，secondary 空 | **7" Vinyl × 7 軌**（兩筆）＋ 2018 數位 10 軌 |
| Gorilla Biscuits《Gorilla Biscuits》(1988) | 96ae45ee | Album，secondary 空 | **US 1988 Vinyl × 7 軌**（7 吋），1991 起德版才變 CD 12 軌 |
| Youth of Today《Can't Close My Eyes》(1988) | 076b41ca | Album，secondary 空 | 1988 US 12" × 9 軌，實為 1985 年 7 吋（e056c9e5）的 12 吋擴充版 |

**裁定：本批的形態判定一律以 `release-group?inc=releases+media` 回問到的
`media.format` 為準，不以 `primary-type` 為準。** 上表三張全部不收，記入第四節。
**這條要往後批帶：`inc=media` 應該併進所有深掘批的固定回問參數。**

### 第 3 條（新）：**當一支團的核心實體全是 7 吋時，收的是「唯一收得進來的碟」而不是「最重要的碟」——要在卡上寫明**

Burn 是最清楚的例子：這支團 1990 年的同名 Revelation 發行、1992 年《Last Great Sea》、
2003 年《Cleanse》**全部是 EP**，名下 6 個 RG 只有兩個 Album，其中 2005 年那張同名《Burn》
是整編（裁定 126 的同名雙胞胎）。**唯一形態乾淨、可上架的只有 2017 年 Deathwish 的《Do or Die》。**

**裁定：這種情形照收，但 `why` 欄必須明寫「收這張不是因為它是這支團最重要的碟，
而是因為在不開白名單的前提下它是唯一收得進來的實體」**，不得讓卡片看起來像是策展層認為
2017 年那張比 1990 年那張重要。本批只有 Burn 一張適用（prop-b）。

### 第 4 條（裁定 250 的四個新實例）：**score 排序在本批完全不可用，`disambiguation` 是唯一判準**

38 個短掛名回問共回傳 **1,894 個藝人實體，擋下 1,856 個同名實體**。
最極端的四組：

| 掛名 | MB 回傳實體數 | 為什麼 score 沒用 |
|---|---:|---|
| **Beyond** | 542 | 目標實體 340936fb（「New York hardcore punk band」）**score 只有 72，排在第 4**，前三名都是別人 |
| **Burn** | 405 | 目標 502429d5 score 87，**排在 Karma to Burn（score 94）之後** |
| **Judge** | 149 | 目標 3827fbb6 score 90，第二名 81——差 9 分，不足以當判準 |
| **Shelter** | 107 | 目標 d5157104 score 100 vs 另一支美國團 11db9b9a（80s AOR）score 83，兩者都叫 Shelter、都在美國 |

其餘上百級：Battery 88、Bane 78、Breakdown 71、Bold 66、Trial 55。

**同時記下第 250 條的另一半（「連 disambiguation 都沒填的實體，不得背書本名」）在本批的唯一實例：
Born Against（983825cd）的 disambiguation 是空白的**，同名的另兩個實體反而都有填。
本批仍釘 983825cd，判準改用名下目錄實證（12 個 RG 全是 Vermiform／Gern Blandsten 系的紐約發行），
但**該卡的 `risk` 已標明：行文不得以 disambiguation 背書本名**，簡介只能寫可查證的廠牌與發行事實。

### 第 5 條（新）：**MB 實體字形與卡池寫法衝突時，掛名與盤名一律取卡池多數形（ASCII 標點）**

本批撞到三處：

- **Cro-Mags**：MB 藝人實體名與 artist-credit 都是 `Cro‐Mags`（**U+2010**），
  RG 標題 `Alpha‐Omega` 同樣是 U+2010。**`chk-prop` 對 `artist` 與 `album` 兩欄都掃非 ASCII 連字號，
  照 MB 原字形寫會直接亮紅燈。**
- **Murphy's Law**：MB 實體主名用 `Murphy’s Law`（U+2019），而 **ASCII 寫法的
  `Murphy's Law` 在 MB 上是另一個實體**（56311624，dnb 二人組）。
- **Warzone《Don't Forget the Struggle, Don't Forget the Streets》**、
  **Side by Side《You're Only Young Once…》**：MB 用彎引號。

實掃卡池：`seed_cards.json` 全 14,424 列裡，**ASCII 直引號 868 張、彎引號只有 53 張**。

**裁定：掛名與盤名一律寫 ASCII 連字號與 ASCII 直引號**（`Cro-Mags`、`Alpha-Omega`、
`Murphy's Law`、`Don't Forget…`），MB 原字形寫進 `mbNote`、另一形寫進 `queryAlias`。
理由：(a) `chk-prop` 的 `k()` 會把標點整組剝掉，兩形同鍵、不會分裂出重複卡；
(b) 卡池顯示要一致；(c) 裁定 186／217 的方向本來就是往 ASCII 收斂。
**這與裁定 6／70／120「盤名用 MB 實體文字」不衝突——那條管的是用哪個字串，這條管的是標點的字形。**

### 第 6 條（裁定 220 的三個新形狀）：**Revelation／Victory／New Age 系的再發年份**

派工信預告的形狀全部應驗，且多了一種：

- **黑膠比 CD 晚十八年**：CIV《Set Your Goals》1995 年首版是 Lava／Atlantic **CD**，
  MB 名下**唯一的黑膠是 2013 年 Revelation 的 REV 41 再發**。照「取黑膠版」的直覺會把年份寫成 2013。
- **`first-release-date` 掛在數位再發上**：Integrity《Those Who Fear Tomorrow》的
  1991-10-31 那一筆其實是 **XW 數位 Deluxe Edition**，實體首版是 1991 US CD；
  Warzone《Don't Forget the Struggle》的 1987-01-01 也掛在 XW 數位那一筆。
- **Apple 年份與 MB 差一年、方向兩邊都有**：Youth of Today《Break Down the Walls》Apple 寫 1986（早一年）、
  108《Songs of Separation》Apple 寫 1995（晚一年）、Unbroken《Life. Love. Regret.》Apple 寫 1993（早一年）、
  Merauder《Master Killer》Apple 寫 1996（晚一年）。

**裁定：`year` 一律取 MB `first-release-date` 的年份，並在每張的 `risk` 欄逐筆交代再發年與 Apple 年份的差異**（44 張全部已寫）。

### 第 7 條（裁定 251／174 的本批形狀）：**硬蕊的 CD 版把 7 吋併進去，軌數差到一倍**

本批 44 張裡有 **11 張**出現同一張碟不同載體軌數不同，最大的一組是
Underdog《Vanishing Point》：**1989 年 12 吋 11 軌 vs 1998 年 CD 24 軌**。
其他：Sick of It All《Blood, Sweat, and No Tears》12 吋 17 軌／CD 19 軌、
Judge《Bringin' It Down》12 吋 9 軌／CD 14 軌、Gorilla Biscuits《Start Today》黑膠 14 軌／卡帶 12 軌／
1994 CD 42 軌、Ressurection《I Refuse.》12 吋 9 軌／CD 12 軌。
**44 張的 `label` 欄全部已寫明釘的是哪一版（載體＋軌數＋國別＋catno）。**

### 第 8 條：**§5.6 開啟數 0**

掃 1,090 個 release-group，`primary-type=Compilation` **0 個**——與 c-116 第 2 條的結果相同
（裁定 167／190 的第七次應驗）：這條線的整編盤在 MB 上全部建成 `Album` ＋ `secondary-types=["Compilation"]`，
依裁定 167 照一般 Album 寫、例外欄位留空。**本批 `releaseType: "Compilation"` 0 張、`exceptionReason` 全空。**

---

## 二、與既有批的實掃對照

### 池中現況（實掃 `seed_cards.json` 全 14,424 列，不是抽測）

| 藝人 | 池中張數 | 卡片 |
|---|---:|---|
| Bad Brains | 3 | 《Bad Brains》《Rock for Light》《I Against I》 |
| Minor Threat | 1 | 《Out of Step》 |
| Quicksand | 1 | 《Slip》 |
| **紐約硬蕊小計** | **5** | 骨幹名單其餘 **26 位全為 0 張** |

外圍實體同樣是零：Sick of It All、Agnostic Front、Cro-Mags、Warzone、Leeway、Murphy's Law、
Killing Time、Madball、Merauder、Vision of Disorder、Youth of Today、Gorilla Biscuits、Judge、
Bold、Side by Side、Straight Ahead、Underdog、Token Entry、Raw Deal、Absolution、Burn、
Rorschach、Born Against、Citizens Arrest、Life's Blood、Supertouch、Sheer Terror、Nausea、
Chain of Strength、Inside Out、Shelter、108、Earth Crisis、Snapcase、Unbroken、Integrity、
Turning Point、Mouthpiece、Ressurection、CIV、Texas Is the Reason、Into Another —— **全部 0**。

### 與硬規則指定的兩批對照

- **c-90**：實查 `batch-progress/c90/prop-*.json`，內容是**台灣獨立與地下搖滾**
  （零與聲音解放組織、四分衛、1976、Tizzy Bac 等 31 張），與本批**零交集**。
  （派工信把 c-90 記成「金屬／龐克／另類」，與檔案實際內容不符，本批以檔案為準。）
- **c-81**：實查 `batch-progress/c81/prop-*.json`，是 **SST／Dischord／Touch and Go／Homestead**
  那一圈（Saccharine Trust、Scream、Gray Matter、Soulside、Shudder to Think、Die Kreuzen、
  Killdozer 等 44 張），**華府那一段（Scream／Gray Matter／Beefeater／Soulside）確實在 c-81**，
  本批一張華府團都沒收，**零交集**。
- **Bad Brains 的兩個時期**：池中三張未分期，本批不動它們，也不補 Bad Brains 任何碟——
  避免在「華府 c-81／紐約 c-120」的分界上製造爭議。
- `dedup-crossbatch.mjs` 串跑 **72 批、3,245 張，撞卡 0**。

### 池中易誤中的字串（實掃時以完整掛名比對排除）

- `Burn` → R.L. Burnside(4)、Burning Spear(3)、Burna Boy、Van Cliburn、Cedric Burnside、
  Amos Milburn、Burnin Red Ivanhoe、Master Wilburn Burchette，共 **13 張**。
- `Bold` → Boldy James & The Alchemist(1)。`Murphy` → Mark Murphy(2)。
- `Resurrection` → Resurrection Band(1)（本批的團拼作 `Ressurection`，兩形都要查）。
- `Life's Blood` → Tony Williams Lifetime、Westlife、Marcel Khalife、Carbon Based Lifeforms。
- **這幾組都不是撞卡**，但字串包含比對會全部誤報，往後批要注意。

---

## 三、短掛名回問實測（裁定 179／250）

查 38 個短掛名，MB `artist/?query=` 共回 **1,894 個實體**，**擋下 1,856 個同名實體**。
上百級的九個：

| 掛名 | 回傳 | 採用的實體 | disambiguation |
|---|---:|---|---|
| Beyond | 542 | 340936fb | New York hardcore punk band（**score 72、排第 4**） |
| Burn | 405 | 502429d5 | US hardcore punk band（**score 87、排 Karma to Burn 之後**） |
| Terror | 533 | —（用完整掛名 `Sheer Terror` 才定位到 11a683e2） | — |
| Judge | 149 | 3827fbb6 | US straight edge punk band |
| Shelter | 107 | d5157104 | US Hare Krishna hardcore punk band |
| Battery | 88 | 172d89ba | straight edge hardcore band from Washington, D.C.（本批未收，DC 屬 c-81 那一側） |
| Bane | 78 | adf5ac61 | US hardcore punk band（本批未收，波士頓） |
| Breakdown | 71 | 6ae8d2e0 | USA punk band |
| Bold | 66 | b024b1bd | NYC based Hardcore-Band |

**四個 disambiguation 才分得出來、光看名字完全一樣的組**：
`Nausea`（NY 1985／LA grindcore 1987／日本／西雅圖，四支同名）、
`Inside Out`（LA 硬蕊 0049c4d7／**紐約硬蕊 ed113a79**／印搖／glam metal，四支同名）、
`Straight Ahead`（紐約硬蕊 d787be30／底特律女子爵士／法國龐克／另一支 USA punk）、
`108`（Krishna-hardcore 7f0c252a／bay area 嘻哈 3176046a，**純數字掛名**）。

**`risk` 欄標為「不得寫」的一張**：Born Against（983825cd，disambiguation 空白），見第一節第 4 條。

---

## 四、未收清單

### 4.1 因 7 吋／EP／split／demo 而未收（本批的關鍵數字）

**101 筆、99 個唯一 release-group、33 支團。CAA 回 200 的 60 個、404 的 39 個。**
店主日後若為 hardcore 開 §5.5 白名單，這份清單可以直接建卡（`rgMbid` 與封面狀態齊備）。

| 藝人 | 盤名 | 年 | MB 型別 | rgMbid | CAA |
|---|---|---|---|---|---|
| 108 | Curse of Instinct | 1996 | EP | 5b0f62c9-e89c-3b3d-b3eb-de9b6ed6438e | 200 |
| 108 | Serve And Defy | 1997 | EP | f08eebd1-287b-4d05-b48a-e2f09f0086eb | 200 |
| Agnostic Front | United Blood EP | 1983 | EP | e6bb9432-6e11-36dc-859a-3285de3411ce | 200 |
| Agnostic Front | Por Vida | 1997 | EP | e40521b4-ea41-3e70-abd8-b7cf0d887f32 | 200 |
| Agnostic Front | Puro Des Madre | 1998 | EP | 371262fc-6c5f-4abd-a7d4-a4477249e7d3 | 200 |
| Agnostic Front | Unity | 1999 | EP | 41aa4c07-1928-3280-bb56-f3e9198bc67e | 200 |
| Agnostic Front | Believe | 2003-05-30 | EP | b7127f70-c1ab-3594-956a-03a1f7e14419 | 200 |
| Sick of It All | Sick of It All | 1986 | Other+Demo | 37f85705-be9a-4642-b2be-092ee44a3e18 | 404 |
| Sick of It All | Sick of It All | 1987 | EP | 6f214e60-b1d8-3e79-8297-ed7ea762f10a | 200 |
| Sick of It All | We Stand Alone | 1991 | EP | d148f81c-29a2-3851-8d4a-2437b5d451a2 | 200 |
| Sick of It All | Breaking Barriers | 1992 | EP | 1fd111b1-c52b-43b6-a502-1c6f11ab952f | 200 |
| Warzone | Cause for Alarm / Warzone | 1983-01-01 | EP | 0cb26c46-2447-375e-9667-fa4df9ad0a54 | 200 |
| Warzone | Lower East Side Crew E.P. | 1987-04-05 | EP | 0f1b6901-351e-47ac-b342-39bf79c066c1 | 200 |
| Warzone | Live At CBGB | 1993 | EP+Live | 015f2e10-b3b8-44e3-b74f-cd7c9b276965 | 200 |
| Warzone | Lower East Side | 1996-03-15 | EP | 0ca305ab-db2f-3045-b4a7-3771e954fda6 | 200 |
| Leeway | Enforcer | 1985 | EP+Demo | 61ebb2b5-5859-40e3-8af3-89bbd5fdc947 | 404 |
| Killing Time | Happy Hour | 1991 | EP | 8396d5e4-4808-3dc1-b4ee-4612072e4e93 | 404 |
| Killing Time | Unavoidable | 1996 | EP | 10c8e33e-fcc9-486a-a91f-1b13cf55b5d9 | 404 |
| Madball | Ball of Destruction | 1989 | EP | a7340d4f-725b-357d-8da7-fb17e44bb220 | 200 |
| Madball | Droppin' Many Suckers | 1992 | EP | 3d87f25a-d0ec-35c1-880a-b2e4b96a0359 | 200 |
| Madball | N.Y.H.C. EP | 2003 | EP | bdbee3d1-2aa7-32ea-aae5-f03f07ee3607 | 200 |
| Merauder | Merauder | 1993 | EP+Demo | 886656d7-f903-4b2f-a0fb-4396992ce475 | 404 |
| Merauder | Demo (3 Songs) | 1994 | EP+Demo | 05f12c2e-d035-4785-a059-a9cbdfd8a3fd | 404 |
| Vision of Disorder | Demo '93 | 1993 | EP+Demo | eab1d55a-3f34-4e55-82ae-1bca5aa33ebb | 200 |
| Vision of Disorder | Demo '94 (The "Extra Shit" Demo) | 1994 | EP+Demo | 11bcb162-4233-43c9-bb01-66611e8d2221 | 200 |
| Vision of Disorder | Still | 1995 | EP | 0e7b2cbe-ec50-3c12-83ad-5c2df0b99137 | 200 |
| Vision of Disorder | Demo '95 | 1995 | EP+Demo | c1931dbd-f7d7-4553-bd6c-dfe65cd5799d | 200 |
| Vision of Disorder | Resurrecting Reality | 1998 | EP | 683a9915-69a0-4e7b-8406-f6deb2749c2d | 200 |
| Vision of Disorder | Vision of Disorder / Minor League / Wrongside | 1999 | EP | ff1b6d5a-39ee-4fcd-af58-2f07fadf885e | 200 |
| Vision of Disorder | 2-Song Sampler | 2001 | Other | 3e379c5d-e9a7-3296-8ae3-1b100c9d8099 | 200 |
| Youth of Today | Can't Close My Eyes EP | 1985 | EP | e056c9e5-04b3-4e49-bff7-da9dc0be6b28 | 200 |
| Youth of Today | Disengage | 1990-03-04 | EP | d79f8961-c97b-3606-a360-1354161d0887 | 404 |
| Youth of Today | Benefit 7" | 1991 | EP+Live | f6db3d13-57b9-4ad2-9e38-69d154d38abf | 404 |
| Gorilla Biscuits | demo 1987 | 1987 | EP+Demo | 1c997f24-75ad-3b2b-bfaa-1891c79fa790 | 200 |
| Gorilla Biscuits | We're Gorilla Biscuits From N.Y.C. And This Is Called .... A New Direction !!!! | 1991 | EP | 9725ccb2-212e-44dd-b603-a1b89fb42d25 | 200 |
| Judge | New York Crew | 1988 | EP | 1c287987-a434-4beb-9005-00d376698c42 | 200 |
| Judge | There Will Be Quiet... | 1990 | EP | a219a35b-85a8-35a1-b3e3-c5efcdaddbab | 200 |
| Bold | Bold | 1989 | null | ded535a9-a39c-4e21-b0ed-b63841f64b7c | 404 |
| Bold | Looking Back | 1993 | EP | df1cef0d-80be-310b-a249-78bc9df3d7ac | 404 |
| Straight Ahead (alt) | 1987-03: CBGB, NY | 1987-03 | Other+Live | 55bd854d-dc7d-4f3c-ab94-cb7ce1e8b192 | 404 |
| Straight Ahead (alt) | Straight Ahead / NYC Mayhem | 2001 | null+Compilation | 443e4c64-be6a-4450-a6d6-a36b1417aac4 | 404 |
| Raw Deal | Raw Deal | 1988 | EP | fbb20ba9-1e60-42ca-b413-5957d8b94143 | 404 |
| Absolution | Absolution | 1989 | EP | 7e131315-e373-4312-8d08-c939dda48adb | 200 |
| Burn | Burn | 1990 | EP | 9d1d0d85-07ef-3512-b381-ae37790064fd | 200 |
| Burn | Last Great Sea | 1992-04-02 | EP | 08280f25-cdef-36f2-8c5e-ec4e335e7d0c | 200 |
| Burn | Cleanse | 2003-11-13 | EP | ad1030cd-1a51-3083-8022-442f3c23e6ce | 200 |
| Rorschach | Rorschach / Neanderthal | 1991 | EP | a2a9e14f-a5c8-3b19-bedc-2baeb0aed83f | 200 |
| Born Against | My Country Tis of Thee, Enemy of All Tribes | 1989 | EP+Demo | d2800466-e27a-40ab-b5be-bfa4dba7063e | 404 |
| Born Against | Born Against | 1990 | EP | 1ce4cc19-22a3-410b-bbe6-0507f6a96ab5 | 200 |
| Born Against | Alive With Pleasure / Suckerpunch | 1991 | EP | de7bebc7-944b-4765-bb6e-0073c7690af7 | 404 |
| Born Against | Universal Order Of Armageddon / Born Against | 1993 | EP | 96a2eccb-8860-4e6e-b98d-d96c9604f283 | 404 |
| Born Against | Born Against / A Call For Consciousness | 1994 | EP | 88f82643-fb36-4dc4-86c9-dd6750207511 | 404 |
| Born Against | Screeching Weasel / Born Against | 1994 | EP | 98066280-ba2a-3582-97d6-d79f22357039 | 404 |
| Life's Blood | Defiance | 1988 | null | 26e6bbb4-fe97-4b57-9199-505bedbd093c | 200 |
| Chain of Strength | True Till Death | 1989 | EP | f84a15aa-5ea5-3880-ac3b-41cc029785de | 200 |
| Chain of Strength | What Holds Us Apart | 1990 | EP | 4da4d192-4986-40d4-97b6-49a7172afa43 | 404 |
| Chain of Strength | The One Thing That Still Holds True | 1995 | EP+Compilation | e37fc43e-3b87-38dd-8461-1f610b5249bb | 200 |
| Inside Out (LA) | Demo | 1989 | EP+Demo | 25ee1b30-870d-42aa-a367-d9e81a696764 | 404 |
| Inside Out (LA) | No Spiritual Surrender | 1990 | EP | 87d45a29-ae5e-351e-935e-1f0eb4ad8147 | 200 |
| Inside Out (LA) | Benefit 7" | 1991 | EP+Live | f6db3d13-57b9-4ad2-9e38-69d154d38abf | 404 |
| Inside Out (NY) | Alone in a Crowd / Inside Out | 1989 | EP | 23715865-c3a9-3afc-aeeb-6723d15fc2fe | 404 |
| Shelter | Bhajanas | 1991 | EP+Demo | 0684e1f4-b471-4431-ad46-1faebe710147 | 404 |
| Shelter | Shelter Bhajan | 1993 | EP+Demo | 36c615c6-d7fb-422f-bac8-4131d972856f | 404 |
| Shelter | Beyond Planet Earth | 1997 | EP | 5184003f-5ad0-44a2-bbca-45e89746c06a | 200 |
| Shelter | Chanting Prayers & Meditations | 1998 | EP | 47b5ab97-26ce-4532-b395-6f2c6c57698e | 200 |
| Shelter | The Power of Positive Thinking | 2001 | EP | 0015c77d-d13c-4477-a9c0-608cf3efbcf3 | 200 |
| Shelter | Brother Soul | 2001 | EP | 53794d7b-1f48-4a98-9475-9d0404fb7085 | 404 |
| Earth Crisis | All Out War | 1992 | EP | 6916eda3-6e2e-384a-8e33-8fbd7c44ae59 | 200 |
| Earth Crisis | Firestorm | 1993 | EP | 740d6f30-07cf-3176-9975-c5d879ead228 | 200 |
| Snapcase | Snapcase | 1991 | EP | f7f3de35-310d-4346-add5-70cadd9486c7 | 200 |
| Snapcase | Steps | 1995 | EP | 7f3f8ed1-974d-364c-9df4-dacd673a9823 | 200 |
| Snapcase | snapcase vs boysetsfire | 1999-07-27 | EP | 5e229884-8d49-3b6f-b349-71ca9f4207e4 | 200 |
| Snapcase | Two Songs | 2002 | EP | 274f0873-f63d-4172-80f4-13059e5dd767 | 200 |
| Integrity | Harder They Fall | 1989 | EP+Demo | 0aca9215-638b-43a6-8bc0-4b6f386f41b6 | 404 |
| Integrity | In Contrast of Sin | 1990 | EP | b6666c33-4091-48e2-b3c3-dad5b38a780c | 200 |
| Integrity | Scar of a Woman | 1991 | EP | 8eac40b8-dc96-46d7-891b-1f28d0443a03 | 404 |
| Integrity | Integrity | 1992 | EP+Demo | 55a2f96c-fd83-4f67-be34-f875d9a4eec9 | 404 |
| Integrity | Les 120 journees de Sodome | 1992 | EP | bf08a755-5b91-4204-b451-e139d79dfa66 | 404 |
| Turning Point | Split | 1991 | EP | 1d04e65f-986f-4420-9d70-fcccc2ddb0fc | 200 |
| Ressurection | Ressurection | 1991 | EP | 25770842-41a3-496d-818e-e56f0e9b6878 | 200 |
| Sheer Terror | Old, New, Borrowed And Blue | 1994-03-22 | EP | 4d503b52-4018-3def-ac84-351e7b8c6821 | 404 |
| Sheer Terror | Beaten by the Fists of God - Live at CBGB's October 10. 2004 | 2005-05-10 | Other+Live | c3f537cd-893b-453d-84c2-431feadbc994 | 404 |
| Cause for Alarm | Cause for Alarm / Warzone | 1983-01-01 | EP | 0cb26c46-2447-375e-9667-fa4df9ad0a54 | 200 |
| Cause for Alarm | Cause for Alarm | 1983-01-01 | EP | 6cab1499-cd7d-3bde-ada6-540734c7fa31 | 200 |
| Nausea | Smash Racism, Now | 1992 | null+Live | 43c0195c-561d-3405-86fc-dbb66e33cd67 | 404 |
| Nausea | Lie Cycle | 1992 | EP | 46030df7-1be0-4ea0-8a94-4e118d64fae4 | 404 |
| Supertouch | What Did We Learn | 1989 | EP | 5017e778-beaa-4ed0-a910-cc7d5f6a45f4 | 404 |
| Outburst | Miles to Go | 1989 | EP | 894458e4-72ca-4605-adfe-648a175f1b01 | 200 |
| Krakdown | Krakdown | 1989 | EP | 8482e32a-5a41-39cf-b567-b0fea6c0c6d5 | 200 |
| Breakdown | Runnin' Scared | 1989 | null+Demo | 00a35700-1bfa-4a44-b489-4483d7d4bbc3 | 404 |
| Breakdown | Blacklisted | 1997 | EP | baeda30c-894b-3e48-a378-73eb58326a4e | 200 |
| Maximum Penalty | Demo '89 | 1989 | null+Demo | 5add24e8-d90d-4dd1-b9e7-bcb33a00d2fd | 404 |
| Maximum Penalty | Demo EP | 1995 | EP | b8d2ab2d-70a7-40f6-babc-9c3941aab968 | 200 |
| Maximum Penalty | East Side Story | 1996 | EP | bd2cb750-3766-43f9-ad6d-ea64c823c594 | 404 |
| Crown of Thornz | Train Yard Blues | 1995-08-01 | EP | c1960bd0-7844-331f-8044-beb0003842db | 200 |
| Bulldoze | Cleaning Shit Up!! | 1993 | EP | 642337ab-cbd7-427c-a1d8-ae92370ba39c | 200 |
| Bulldoze | Remember Who's Strong | 1994 | EP | 7fdc3204-fb53-47ae-b1b3-0f96b3031022 | 200 |
| Into Another | Creepy Eepy EP | 1992 | EP | 308472ac-473a-30ee-a365-16c263bb71a7 | 404 |
| Into Another | Poison Fingers EP | 1995 | EP | 33077427-e9dc-3a0e-91ad-09907202c668 | 404 |
| Quicksand | Quicksand | 1990 | EP | 1859eb08-b460-319e-82f9-2ddb78ac0bba | 200 |
| The Icemen | Rest in Peace E.P. | 1991 | EP | bd95ebd4-64dd-4e33-bf98-194e5ac8897c | 404 |

### 4.2 MB 標 `Album` 但實體是 7 吋（第 2 條的三張）

| 藝人 | 盤名 | 年 | rgMbid | 實體 | CAA |
|---|---|---|---|---|---|
| Side by Side | You're Only Young Once… | 1988 | d217f68a-dc71-4608-9d20-94d2e4692a2f | 7" Vinyl × 7 軌（兩筆 US 1988） | 200 |
| Gorilla Biscuits | Gorilla Biscuits | 1988 | 96ae45ee-871c-40b1-9f50-ca0c6c4f5c16 | US 1988 Vinyl × 7 軌 | 200 |
| Youth of Today | Can't Close My Eyes | 1988 | 076b41ca-d17c-354b-8ab7-3812765c9219 | 1985 年 7 吋的 12 吋擴充版（9 軌） | 200 |

### 4.3 MB 查無原盤、只有再發或整編——可進 §1 補遺批

| 藝人 | 盤名 | 問題 | rgMbid |
|---|---|---|---|
| Citizens Arrest | Colossus | 1991 年 Wardance 的 LP 未建檔，MB 唯一 release 是 **2019 XW 數位** | 86b8c237-5e77-4f5c-a0f4-baf3745ff464 |
| Beyond | No Longer at Ease | 1989 年 Combined Effort 的 LP 未建檔，MB 唯一實體 release 是 **1997 US CD 24 軌**（整編） | 992a9bcf-b190-37f6-82c1-e262f0faceb8 |
| Token Entry | Jaybird | 1988 年 Hawker 的 LP 未建檔，MB `first-release-date` 是 **1998-12-29**、唯一 release 無國別 | a3a3d4cc-647f-3dda-93b1-568295c6f918 |
| Uppercut | Four Walls | RG **無日期**，唯一 release 的 format 為 null、無國別——年份與形態都取不到 | 20947f61-71d8-33b2-bf92-bf4d2e3ac4ff |
| Straight Ahead | Spirit Of Youth / Straight Ahead / NYC Mayhem | 該藝人實體（1fd60d7c）名下三個 RG 全是 null／Other／Compilation，無可釘的原盤 | 43e45d0d、443e4c64、55bd854d |

### 4.4 因 status 非 Official 而未收

| 藝人 | 盤名 | 年 | 問題 | rgMbid |
|---|---|---|---|---|
| Judge | No Apologies | 1992 | 回問確認**唯一 release 是德版 Bootleg**（裁定 43／57） | 898d0538-59e4-3b96-837f-f804ffa85e61 |
| Cro-Mags | Age Of Quarrel | 1985 | 轄下只有 US 卡帶 demo 與一筆 **Bootleg 12 吋**（與所釘的 eb781e95 是同名雙胞胎） | 16f15abd-1e78-3b5d-8643-a56bd7339b08 |

### 4.5 盤名有歧義、待本機裁定

| 藝人 | 盤名 | 問題 | rgMbid |
|---|---|---|---|
| Judge | Chung King Can Suck It **LP** | 實體成立（US 1989 12 吋 10 軌 Official，Revelation 的 110 張限量盤），但 **RG 標題把「LP」寫進盤名**；照裁定 6／70／120 取 MB 文字會得到怪盤名，改寫又違反該裁定。本批不釘，留給本機決定 | f8a7f887-aa59-3802-a844-cddbfe35c008 |

### 4.6 策展判斷不收（形態合格但不在本批範圍）

- **華府那一側**：Battery（DC，172d89ba，名下 3 張 Album 形態皆合格）——依硬規則第 1 條，
  華府屬 c-81 的範圍，本批是紐約，不收。
- **紐約以外的 90s straight edge 外圍**：Strife（洛杉磯）、Bane／American Nightmare（波士頓）、
  Trial（西雅圖）、Ten Yard Fight／In My Eyes（波士頓）、Floorpunch（新澤西）、
  Ringworm（Cleveland）、Hatebreed（康乃狄克）、Damnation A.D.（DC）、Iceburn（鹽湖城）、
  Deadguy／Starkweather（新澤西／費城）——形態全部合格（各有 1–3 張 `Album`＋secondary 空），
  但派工信定「本批以紐約為主」，名額給了紐約與 Revelation／Victory／Equal Vision／New Age 四條廠牌線。
  **這批人是下一輪「美國 90s metalcore／straight edge 外圍」批的現成骨幹，MBID 都已備妥。**
- **同一藝人的第二／第三張**：Agnostic Front《Another Voice》(2004)、Sick of It All《Scratch the Surface》(1994)、
  Leeway《Desperate Measures》(1991)、Rorschach《Protestant》(1993)、Born Against《Battle Hymns of the Race War》(1992)、
  Sheer Terror《Ugly and Proud》(1992)、Madball《Demonstrating My Style》(1996)、
  Into Another《Into Another》(1991)、Unbroken《Ritual》(1993)、108《Holyname》(1993)、
  Earth Crisis《Gomorrah's Season Ends》(1996)、Snapcase《Progression Through Unlearning》(1997)、
  Integrity《Systems Overload》(1995)、Shelter《Beyond Planet Earth》(1997)、
  Token Entry《The Weight of the World》(1990)、Warzone《Warzone》(1989)、
  Vision of Disorder《Imprint》(1998)——**全部已回問過形態合格**，本批名額用完，留給下一輪深掘。
- **紐約 beatdown／thugcore 那一區**（Bulldoze《The Final Beatdown》1996、Crown of Thornz
  《Mentally Vexed》1996、Dmize《Backlash》1995、Skarhead《Kings at Crime》1999、
  25 ta Life、Maximum Penalty、No Redeeming Social Value、Candiria、Indecision、Kill Your Idols、
  Most Precious Blood、SubZero、Shutdown、Neglect、Yuppicide、Bad Trip）——形態合格、MBID 已備妥，
  本批以 1984–1996 的正典為主，這一區整批留待下一輪。
- **紐約 crossover／金屬交界**（Carnivore《Carnivore》1985／《Retaliation》1987、Crumbsuckers
  《Life of Dreams》1986、Ludichrist《Immaculate Deception》1986、Nuclear Assault、Prong、
  Helmet、Life of Agony《River Runs Red》1993、Biohazard）——與池中已有的 Anthrax(2)、
  Type O Negative(4)、Helmet(1) 屬同一區塊，**若要補應與金屬線一起排，不宜夾在硬蕊批裡**。

---

## 五、店面與封面／試聽預估

- **店面 `us`**（其次 `gb`／`de`），依派工信。
- **封面 CAA：44 張中 38 張回 200（86.4%）**。404 的 6 張：
  Supertouch《The Earth Is Flat》、Into Another《Ignaurus》、108《Threefold Misery》、
  Turning Point《It's Always Darkest Before the Dawn》、Mouthpiece《What Was Said》、
  Ressurection《I Refuse.》。前四張可用 Apple artwork 補（collectionId 已寫進各卡 `risk`），
  **108《Threefold Misery》、Mouthpiece、Ressurection 三張 CAA 與 Apple 皆無，封面要人工補。**
- **Apple 命中：44 張中 29 張（65.9%）**，`collectionId` 已逐張寫進 `risk`；
  全部非 `cleaned`。**其中 Vision of Disorder 只在 `de` 店命中、`us` 店查無**（第 158 條的實例）。
- **15 張三店皆 MISS**：Agnostic Front《Victim in Pain》、Sick of It All《Blood, Sweat, and No Tears》、
  Warzone《Don't Forget the Struggle…》、Token Entry、Underdog、Sheer Terror、Madball《Set It Off》、
  Born Against、Burn、Quicksand《Manic Compression》、CIV、108《Threefold Misery》、
  Integrity《Those Who Fear Tomorrow》、Mouthpiece、Ressurection。
  **依第 231 條，這只是初測，要隔時重試才能升級成「Apple 沒有這張」的事實**；
  Quicksand《Manic Compression》三店都回 **0 筆**（不是配到別人的碟），最可疑，本機請重測。
- **`Set It Off`／`Mantra`／`Extinction`／`Brightside`／`Open Your Eyes` 這幾個通用盤名，
  Apple 配對一律用 `collectionId` 不得用盤名字串**——Madball《Set It Off》的 us 店搜尋結果
  全部是 Set It Off 樂團與 Offset（後者還是 `cleaned` 版）。

---

## 六、資料採集紀錄

- MusicBrainz：1 req/s，UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；
  503 一律退避重試、不當查無（裁定 28）。目錄一律 `release-group?artist=<MBID>&limit=100&offset=` 分頁，
  **未使用 `inc=release-groups`**（裁定 116）。
- 逐張回問 `release-group/<id>?fmt=json&inc=artist-credits+releases+media`，
  **`media` 是本批新加的參數**（見第一節第 2 條），另對 44 張的首版 release 各查一次
  `release/<id>?inc=labels+media` 取廠牌與 catno。
- 封面以 `HEAD https://coverartarchive.org/release-group/<id>/front` 實測，
  picks 44 個、未收清單 99 個全部跑過。
- Apple 以 `itunes.apple.com/search?entity=album` 在 `us`／`gb`／`de` 三店各跑一次，
  比對要求藝人與盤名正規化後互相包含且 `collectionExplicitness !== 'cleaned'`；
  MISS 的 15 張另以「只用盤名」與「只用藝人名」兩種查詢各重跑一次，結果不變。
