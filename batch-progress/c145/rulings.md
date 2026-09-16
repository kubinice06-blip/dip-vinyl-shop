# c-145 裁定（a 組，Blue Note 1979–81 第一段，編號 810–839）

策展層 a 組，2026-09-16。交件 `batch-progress/c145/prop-a.json`（`g: "a"`），
`node batch-progress/c145/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、
跨批撞卡 0／109 批 4,481 張、同 rgMbid 不同掛名 0）。
23 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`、**23 個 rgMbid 各用一次**，欄位鍵與 `c141/prop-b.json` 完全一致。

## 第 810 條（c-145 a 組交件）：**23 筆 → 收 23、退 0；年份改判 1 張；盤名改判 3 張；掛名新聯名字串 1；撞陳列 4 張**

- **收 23 張、16 位**（Hank Mobley 3、Jackie McLean 2＋1 聯名、Lee Morgan 2、Grant Green 2、Stanley Turrentine 2、Kenny Burrell 2，其餘 10 位各 1）。
- **退 0**（第 811 條說明四個「看起來該退卻不該退」的位置）。**第 315 條：prop 23 ＋ 退表 0 ＝ 23 ✓。**
- **年份改判 1 張**：**Stanley Turrentine《In Memory Of》1979→1980**（第 813 條）。另**推翻兩個單一來源**：
  jazzdisco 的 LT-1081＝1981（實際 1980）、維基的《Freedom》＝1980（實際 1979）。
- **盤名改判 3 張**（第 814 條）：`Tippin’ the Scales`→`Tippin' the Scales`、`K. B. Blues`→`K.B. Blues`、`With A Song In My Heart`→`With a Song in My Heart`。
- **`releaseType`**：23 張全是 Album，**合輯 0**；**LT 系列與日本 GXF 系列全部覆核為庫存首發、一筆都不走 §5.6**（第 812 條）。
- **`label` 改他廠 1 張**：**Earl Klugh《Heart String》原盤是 United Artists UA-LA942-H**，Blue Note 首發是 2000 年的 CD（第 817 條）。
- **掛名**：**新聯名字串 1**（`Jackie McLean & Tina Brooks`），**其餘 22 張全部沿用池中既有字串**；**自行合併 0、新造分裂 0**（第 815 條）。
- **現場 0**；**庫存／延遲首發 22 張**（23 張裡只有《Heart String》是當年就正常上市的新錄音）。
- **撞陳列 4 張**（第 816 條）：《Street Singer》4/6 軌、《Spiral》兩處、《Confirmation》同兩場、《Landslide》1/7 軌。
- **CAA 20/23 有圖**（16 張的來源是原壓，4 張不是）；**3 張 RG 層 404、零圖**（第 819 條）。
- **店面命中 17/23**（第 819 條）。
- **紙本**：本層自抓 **Billboard 1980-01-05→1981-12-26 共 103 期、Cash Box 同區間 103 期**收進 repo（第 820 條）。
- `why` 均長 **588**／`risk` **1,199**／`mbNote` **940** 字元（`c141/prop-b` 為 556／933／784）。

## 第 811 條（同批）：**退表 0 筆——四個「看起來該退」的位置逐一被證偽**

| 候選 | 為什麼看起來該退 | 為什麼不退 |
|---|---|---|
| `Jackie McLean & Tina Brooks —《Street Singer》` | **六軌裡四軌已在池中**（三軌在 c131《Jackie's Bag》、一軌在 seed《Back to the Tracks》） | **撞的是陳列不是碟**：GXF 3067 是獨立的 RG、獨立的商品、獨立的掛名字串，`chk-prop` 四種鍵都不撞。**第 738 條的處理方式是寫進 `risk` 互指，不是退卡**（Miles BLP 1501「12/12 曲名全在池中」仍收的先例） |
| `Earl Klugh —《Heart String》` | **原盤是 United Artists，不是 Blue Note**，Blue Note 名下只有 2000 年的 CD | **簡報第一節第 3 點明文規定這種盤的處理是「`year` 取他廠首發年、`label` 寫原廠、`risk` 註明 Blue Note 版年份」，不是退卡** |
| `Hank Mobley —《Poppin'》` | 列舉檔 `country: "US"`、MB 建了一張「1980 US BLP 1620」，查下去**那張美國盤不存在** | **不存在的是那筆 MB release，不是這張碟**：1980 年日本 GXF 3066 是實打實的首發（Discogs 三筆原壓＋jazzdisco＋維基）。改 `country` 認知即可（第 817 條） |
| `Sonny Clark —《Blues in the Night》` | **MB 只登 7 軌、jazzdisco 說 8 軌**，兩邊打架，且 MB 的 catno 整個空著 | **Discogs 原壓 29395174 的軌目逐軌可查＝8 軌**，notes 還逐軌標錄音日；**catno GXF 3051 由 jazzdisco＋Discogs 兩邊補齊**。資料缺不是收不收的理由 |

**c-143 b 退 1、c-144 a 退 2、c-144 b 退 0、本組退 0。**
**這一段（1979–81 的庫存首發）結構上就不容易撞池**——**因為池裡本來就沒有人收過「從沒發行過的母帶」。**

## 第 812 條（同批，**第 783 條的續證並補正一處**）：**LT 系列不只 1979 那十張；1980 年整年有五則各自獨立的廠牌檔期廣告**

c-144 b 第 783 條把 1979 年「Back to Blue Note」十張釘死（Cash Box 1979-09-15 ＋ 11-10），並要後批直接用。**本層照用，並補三件事**：

1. **1979 那波另有兩份紙本，本層新找到**：
   - **Billboard 1979-08-04**：EMI-America／UA 成立 r&b 部門、Varnell Johnson 主管，「a special **'Back To Blue Note'** campaign featuring a 10 album fall Blue Note release」。
   - **Billboard 1979-09-22**：十張逐一列名（見下）。
   - **Cash Box 1979-10-06**：「Beginning this week, the company will spotlight **ten previously unreleased jazz masters**」——**這一則把上市週定在 1979 年 10 月第一週**，是整波最精確的時間點。
   - **Billboard 1979-11-24**：Johnson 的續訪，「a 'Back To Blue Note' campaign involving a push of 10 LPs from that envied vault of masters」。
   ⚠ **這五則加上第 783 條的兩則，總共七則，仍然只是同一個企劃的同一份檔期文件**（第 509c／614 條）——**不得當成七個獨立來源。**
2. **⚠ 補正第 783 條的名單**：**Billboard 1979-09-22 把 Donald Byrd 那張寫成「You're Next」，Cash Box 兩則都寫「Chant」。**
   查 jazzdisco：**〈You're Next〉是 LT-991《Chant》的第二軌**——**Billboard 把曲名當成了盤名。**
   → **第 783 條的十張名單以 Cash Box 為準（Chant，LT-991）**；同時 **Billboard 與 Cash Box 09-15 都把 LT-994 印成複數的「Consequences」，只有 Cash Box 1979-11-10 印對單數「Consequence」**。
3. **1980 年這一波是新的、而且有五則各自獨立的 Liberty／UA 新片廣告與價目表**（**這些才是 1980 年那批碟的年份依據**）：

| 紙本 | 內容 | 釘住的碟 |
|---|---|---|
| **Billboard 1980-02-23 p13** | Liberty/UA 整版新片廣告 | **LT-1028 Midnight Sun**（a 組）、LT-1030 Dance With Death（b 組）、LT-1020／1024／1025 |
| **Billboard 1980-03-08 p34** | 整版「**fourteen unreleased masters**」廣告，列 12 個可辨識的盤名 | 1979 那十張 ＋ **Midnight Sun／Taru／Nigeria／Dance With Death** 四張新的 |
| **Billboard 1980-03-29 p6** | 整版新片廣告 | **LT-1031 Taru、LT-1032 Nigeria**（皆 a 組） |
| **Billboard 1980-04-26 p13** | 整版新片廣告 | **LT-1037 In Memory Of**（a 組，**年份改判的依據**）、LT-1038 Mother Ship（b 組） |
| **Billboard 1980-11-01 p35** | 整版新片廣告 | **LT-1075 Mr. Natural、LT-1081 Third Season**（皆 a 組）、LT-1076 Rollin' With Leo、LT-1082 Step Light（皆 b 組） |

另有三則爵士價目表（**Billboard 1980-05-03 p14**：Nigeria／Taru；**1980-07-26 p17**：Landslide／With a Song in My Heart；
**1980-09-20 p14**：Take Aim；**1980-11-15 p19**：Mr. Natural／Third Season／Step Light）
與兩則 Cash Box 評論欄（**1980-04-12 p15** Midnight Sun；**1980-04-26 p14** Nigeria；**1980-08-16 p11** With a Song in My Heart）。
→ **判定**：**1980 年的 LT 系列是一波一波出的，不是一次十四張。廣告、價目表、評論欄是三種不同欄位，可以互相佐證。**
→ **§5.6 仍然不適用**：這些全是「unreleased masters」，`releaseType` 一律 Album。

## 第 813 條（同批）：**年份——改判 1 張、推翻兩個單一來源；LT 號段的年份不能照號推**

### 1. **改判：Stanley Turrentine《In Memory Of》LT-1037，1979 → 1980**

| 方向 | 來源 |
|---|---|
| 說 1979（**四個**） | MB `first-release-date` 1979；jazzdisco LT 系列頁 1979；**維基 infobox 1979**；Apple `releaseDate` 1979-01-01；列舉檔 1979 |
| 說 1980（**兩個，但階序高**） | **Billboard 1980-04-26 p13 的 EMI-America／UA 檔期整版廣告逐字印「STANLEY TURRENTINE / In Memory Of LT-1037 8LT-1037 4LT-1037」**；**Discogs 三筆美國原壓（LP×2＋卡帶 4LT 1037）全部 1980** |

→ **依第 612 條階序「廠牌檔期廣告 ＞ 榜位 ＞ 評論欄 ＞ Discogs 原壓群 ＞ jazzdisco／MB」取 1980。**
⚠ **成因可還原**：LT-1037 的號夾在 1980 年 2–3 月出的 LT-1028／1030／1031／1032 與 4 月出的 LT-1038 中間，
**四個資料庫卻一致記成 1979——因為它被算進了 1979 年「Back to Blue Note」那一波的宣傳語境**。
**這是第 753 條「同一次配號分兩年出」的反向樣本：號段連續、上市也連續，錯的是資料庫把它併進了前一年的企劃。**

### 2. **推翻的兩個單一來源**

| 盤 | 被推翻的 | 取值依據 |
|---|---|---|
| Hank Mobley《Third Season》LT-1081 | **jazzdisco 的 1981** | **Billboard 1980-11-01 p35 廣告 ＋ 1980-11-15 p19 價目表 ＋ Discogs 三筆美國原壓 1980 ＋ MB frd 1980 ＋ 維基 1980**，五比一取 **1980** |
| Kenny Burrell《Freedom》GXF 3057 | **維基 infobox 的 1980** | **jazzdisco「GXF-3057 … 1979」＋ Discogs 兩筆日本原壓 1979 ＋ MB frd 1979**，三比一取 **1979** |

⚠ **第 470 條要收窄**：c-144 a 記「jazzdisco 在 BN-LA 段年份欄準」，**但在 LT 段它至少錯一次（LT-1081）**。
→ **後批做 LT-1085 以後那幾張時，jazzdisco 的年份欄一律要用 1980–81 的紙本覆核**（紙本已入庫，第 820 條）。

### 3. **其餘 20 張的 `year` 全部維持列舉檔值**，其中：
- **1979 年 11 張**：LT 那五張（Sonic Boom／Confirmation／Consequence／A Slice of the Top／Spiral，檔期文件）＋
  **日本首發六張**（Tippin' the Scales GXF 3062／Blues in the Night GXF 3051／K.B. Blues GXF 3052／Freedom GXF 3057／Lonely Town GP 3186）＋ Heart String（UA）。
- **1980 年 12 張**：LT 八張（Midnight Sun／Taru／Nigeria／In Memory Of／Landslide／With a Song in My Heart／Take Aim／Mr. Natural／Third Season 共九張，其中 In Memory Of 為改判）＋
  **日本首發三張**（Poppin' GXF 3066／Oleo GXF 3065／Street Singer GXF 3067）。
- ⚠ **「日本首發」在這一段是主流不是例外**：23 張裡 **8 張的首發國是日本**（第 786 條那個「新形狀」到 1979–81 已經變成常態，第 822 條）。

## 第 814 條（同批）：**盤名三則改判，三則的判準都是「池中多數寫法」**

1. **`Tippin' the Scales`（ASCII 直撇號），不是列舉檔／MB RG 的 `Tippin’ the Scales`（U+2019）。**
   依據：**`seed_cards.json` 的專輯名用 ASCII 撇號 860 列、用 U+2019 只有 32 列**（實測）；第 45／666 條取池中多數。
   ⚠ **`chk-prop` 不擋 U+2019**（它只擋非 ASCII 連字號與被誤用的 U+30FC），**這一類要靠人工看。**
   → **給後批：b 組的《Rollin’ With Leo》《Gooden’s Corner》與列舉檔裡其他帶 U+2019 的盤名，一律照本條改成 ASCII。**
2. **`K.B. Blues`（縮寫不加內部空格），不是 MB RG 的 `K. B. Blues`。**
   依據：**Discogs 日本原壓 5759955 盤面作「K.B.Blues」、jazzdisco 作「K.B. Blues」、2023 Tone Poet 作「K.B. Blues」**——**MB 的空格式是四方裡唯一的一個**；
   池中縮寫既有寫法是 `B.B. King`／`J.J. Cale`／`A.T.'s Delight`／`S.F. Sorrow`／`W.C. Handy`／`M.F. Horn`，**全部不加內部空格、但在最後一個句點後加一個空格**。
3. **`With a Song in My Heart`（介系詞與冠詞小寫），不是列舉檔／MB RG 的 `With A Song In My Heart`。**
   依據：**池中 seed 已有 `Stevie Wonder —《With a Song in My Heart》`**——第 666 條「同一個詞在池中不能兩種寫法」。
   ⚠ **改完之後兩張卡的 `chk-prop` 盤名鍵相同（掛名不同所以不亮燈）**，**店面比對一律連掛名帶 LT-1052。**

**另外覆核後維持原樣的**：`In Memory Of`（維基與 jazzdisco 同，`Of` 是句尾字）、`Poppin'`／`Blues in the Night`／`Mr. Natural`／`A Slice of the Top`／`Heart String`（皆已是池中式）。

## 第 815 條（同批）：**掛名——新聯名字串 1，其餘 22 張沿用池中；本組沒有任何一筆需要收攏或拆分**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `Jackie McLean` ＋ joinphrase「 & 」＋ `Tina Brooks`（5b6993ef ＋ aa0bb932，皆 Person US） | **`Jackie McLean & Tina Brooks`（新聯名字串）** | 池中已有三個同形聯名：`Jackie McLean & Dexter Gordon`（seed）、`Kenny Burrell & John Coltrane`（seed）、`Kenny Dorham & Jackie McLean`（c139）。**第 307 條照池中先例走：不拆成兩張卡、也不收攏成 `Jackie McLean`。** ⚠ **jazzdisco 用逗號式「Jackie McLean, Tina Brooks」、Discogs 與 MB 用 `&`**——`&`／`and`／`,` 分裂是第 611 條盲區第四種，兩種寫法都進 `queryAlias` |
| 其餘 22 張 | **全部沿用池中既有字串** | `Jackie McLean`(18 列)／`Jimmy Smith`(29)／`Bobby Hutcherson`(17)／`Stanley Turrentine`(18)／`Sonny Clark`(6)／`Kenny Burrell`(8)／`Tommy Flanagan`(7)／`Hank Mobley`(19)／`Lee Morgan`(25)／`Grant Green`(21)／`Lou Donaldson`(26)／`Dexter Gordon`(16)／`Ike Quebec`(5)／`Harold Land`(4)／`Earl Klugh`(**線上池 0／未上架批次 3**，c-144 b 第 784 條新立) |

⚠ **第 409b 條**：上表的數字**全部是「線上池（`seed_cards.json` 16,450 列）＋未上架批次（`desc-tools/batches/cards/` 183 檔 ＋ 各批 prop，合計實掃 26,176 列）」的合計唯一值**。逐位拆開見各卡 `why`。
**只有 `Earl Klugh` 是「線上池 0」**——它的三張全在 c-144 的卡單裡，還沒上架。

⚠ **本組沒有踩到第 611 條第一種盲區（群組掛名 vs 個人掛名）**：23 個 RG 的 credit **全部是 Person**，沒有一個是 `… Quintet`／`… Trio` 之類的 credited-as 字串。
⚠ **同名撞擊核過的兩位**：`Harold Land`（MB `artist:"Harold Land"` 只回本人，不必消歧）、`Dexter Gordon`（MB 另有 `Dexter Gordon Quartet` 等實體，**本 RG 用的是 Person cc1588e1**，池中 `Dexter Gordon Quartet` 那一列是另一張碟，不合併）。

## 第 816 條（同批，**本批最重要的產出**）：**撞陳列逐張結論——`chk-prop` 一張都不會亮燈**

派工信預告的「第五種盲區」（LT 的內容可能與池中既有的正盤同場同曲）**在本批中了四次**。
**全部以 jazzdisco 的 take 號／matrix 號比對（不是曲名），四張的 `risk` 已寫成硬約束：**

| 卡 | 與池中誰同場 | 重疊程度 | 寫作層的硬約束 |
|---|---|---|---|
| **`Jackie McLean & Tina Brooks —《Street Singer》`**（GXF 3067，1960-09-01） | **c131 `Jackie McLean —《Jackie's Bag》`（BLP 4051）** ＋ **seed `Tina Brooks —《Back to the Tracks》`（BLP 4052，apex 4）** | **6 軌中 4 軌重疊**：tk.5〈Appointment in Ghana〉／tk.11〈Isle of Java〉／tk.15〈A Ballad for Doll〉在 BLP 4051；tk.12〈Street Singer〉在 BLP 4052。**只有 tk.3〈Melonae's Dance〉與 tk.6〈Medina〉是池中沒有的** | **絕不得寫成「六軌首度公開」**；可寫的是「同一場的完整版本、按 take 號順序排列」 |
| **`Bobby Hutcherson —《Spiral》`**（LT-996） | (1) **seed `Bobby Hutcherson —《Dialogue》`（BLP 4198）**：1965-04-03 同場，六個 take 中五個在《Dialogue》、只有 tk.11〈Jasper〉留給本張。(2) **b 組 `Bobby Hutcherson —《Medina》`（LT-1086）**：1968-11-25 的〈Spiral〉tk.8 與〈Ruth〉tk.28 **在 1998 年的 Medina CD（7243 4 97508 2 1）裡也收了** | 1965 那場 1/6；1968 那場**LP 層零重疊、CD 層兩軌重疊** | **不得把 1965 那場寫成本張獨有**；**a／b 兩卡 risk 已互指** |
| **`Jimmy Smith —《Confirmation》`**（LT-992） | **seed 《The Sermon!》（BLP 4011）＋《House Party》（BLP 4002）** 是同樣的兩個晚上（1957-08-25、1958-02-25） | **逐軌零重複**，但**三張碟共用兩個晚上**；1957-08-25 的 tk.6〈Little Girl Blue〉還往 b 組的《On the Sunny Side》（LT-1092）延伸 | **不得把本張寫成獨立的一場錄音**，也不得把〈The Sermon〉那晚的說法搬過來 |
| **`Dexter Gordon —《Landslide》`**（LT-1051） | **seed 《Dexter Calling…》（BLP 4083）**：1961-05-09 同場，八個 take 中七個在 BLP 4083（另三軌又進了 1975 年的 BN-LA393-H2） | **7 軌中 1 軌**（tk.4〈Landslide〉） | **不得把 1961 那場寫成本張獨有**；**1962 年那兩場的鋼琴是 Sir Charles Thompson 與 Sonny Clark，不是 Kenny Drew** |

**另外 19 張逐 take 比對結果：池中零軌重複。**
⚠ **唯一一張比不了的是 `Harold Land —《Take Aim》`**——**jazzdisco 的 Radio Recorders 那一條沒有 take 號也沒有 matrix**（只有日期、地點、personnel、六個曲名），
**只能退回曲名比對**（結果亦零重複），已寫進該卡 `risk`。

⚠ **同盤名／子字串撞擊另有五組（`chk-prop` 全部不亮燈）**：
1. **`Jimmy Smith —《Confirmation》` ↔ seed `Tommy Flanagan —《Confirmation》`（apex 4）**——**而 Tommy Flanagan 自己也在本批（《Lonely Town》）**。這是本組形狀最怪的一組：**同一批同時收了「與池中某卡同名的別人的碟」與「那位藝人自己的新卡」。**
2. `Lou Donaldson —《Midnight Sun》` ↔ seed `山本剛トリオ —《Midnight Sun》`。
3. `Ike Quebec —《With a Song in My Heart》` ↔ seed `Stevie Wonder —《With a Song in My Heart》`（**改名後兩者的盤名鍵完全相同**，第 814 條）。
4. `Kenny Burrell —《Freedom》` ↔ 池中 16 列含 `Freedom` 的碟（**但沒有一張的盤名正好是 `Freedom`**）。
5. `Lee Morgan —《Taru》` ↔ seed `Toby Fox —《DELTARUNE Chapter 1 OST》`（**子字串 `TARU`**，全字串鍵不撞，但任何 `LIKE '%taru%'` 檢索會撞）；
   另 `Grant Green —《Oleo》`／`《Nigeria》` 的盤名在池中各有多筆近似串。

## 第 817 條（同批，新立）：**MB 建了一張從來不存在的美國原盤，列舉檔照抄成 `country: "US"`——比第 787 條的「漏建」更難查的一種**

**Hank Mobley《Poppin'》**：MB 的 **6c04421a 標「1980 US 12" Vinyl 5 軌，Blue Note **BLP 1620**」**，列舉檔因此把 `country` 寫成 `US`、把 `catno` 的第二筆寫成 `BLP 1620`。

**三路查證，那張美國盤不存在**：
1. **Discogs `artist=Hank Mobley & release_title=Poppin'` 反查 13 筆**，1980–81 年的四筆**全部是日本盤**（GXF 3066×3、GXK 8163×1），**美國壓片一筆都沒有**。
2. **Discogs `catno=BLP 1620` 反查：Blue Note 名下 0 筆**（回的是新馬、捷克、波蘭的無關碟）。
3. **Billboard／Cash Box 1980–81 共 206 期命中頁**搜 `Poppin'`＋`Mobley`＋`BLP 1620`／`BN 1620`：**全部零命中**。

→ **判定**：**BLP 1620 是 1957 年配了卻沒用的號**（維基 infobox 把它與 GXF 3066 並列，MB 的編輯照抄成一筆 release）。
**《Poppin'》的首發是 1980 年日本 GXF 3066，`country` 應為 JP。**

⚠ **同形的第二例（性質較輕）**：**`Kenny Burrell —《K.B. Blues》` 的列舉檔 `catno` 四筆全是 2023 年 Tone Poet 的號**，其中 **「BLP 3052」「BN 3052」同樣是不存在的號段**（Blue Note 的 BLP 是 1500／4000 系列，沒有 3000 段）——**那是 Tone Poet 沿用日本 GXF-3052 的尾數再冠上 BLP**。**不得把本張寫成 1950 年代就配過 BLP 3052 的盤。**

⚠ **這一條與第 787 條第 1 點（MB 只建了加拿大壓、列舉檔把美國盤標成加拿大盤）是一對**：
**那次是「建錯國家」，這次是「建了一張不存在的盤」。兩者在列舉檔上長得一模一樣，都只有回查 Discogs 反向目錄號才抓得到。**
→ **給後批：`country` 與 `catno` 對不上盤史時（例：號段屬 1950 年代、發行年卻是 1980），一律用 `catno=` 反查 Discogs 確認那個號真的存在。**

## 第 818 條（同批）：**資料庫與紙本的錯誤清單（23 筆裡查出 31 處）**

**MB**：
- **建了不存在的 release 1 筆**：《Poppin'》的 6c04421a「1980 US BLP 1620」（第 817 條）。
- **漏軌 1 處**：《Blues in the Night》的 224c7983 **只登 7 軌**，**Discogs 原壓 29395174 與 jazzdisco 都是 8 軌**（少了 B4〈Gee Baby, Ain't I Good to You (Alternate Take)〉），且軌序與盤面不同。
- **catno 整個空著 2 筆**：《Blues in the Night》224c7983、《K.B. Blues》921ea852（label-info 只有「Blue Note」）——**列舉檔的 `catno` 因此一個原盤號都沒有，`format` 落成「?」**。
- **catno 撞號 1 處**：**TOCJ-50289 同時掛在《Landslide》的 2021 日本 CD（8eb0ef58）與《Spiral》的 2012 日本 CD（6d18965e）上**；Discogs 顯示 Landslide 的 2021 版是 UCCU-8148，**Landslide 那筆的 TOCJ-50289 是誤填**。
- **同一張碟建成兩個 release 3 處**：《Nigeria》1c8ff6be／3661e823（同 1980 US、同 LT-1032、同 5 軌）；《Poppin'》6d8f3e6e／79a29731（同 1996-11-27 JP、同 TOCJ-1620、同 barcode）；《Blues in the Night》b305e010／e5c95a67（同 UCCQ-9310）。
- **欄位缺漏 4 處**：《Sonic Boom》119149d1 **date／country／catno 全空**；《With a Song in My Heart》434089eb **date／country／status 全空、廠牌登成「EMI」**；《Blues in the Night》b305e010 **無媒體資料**；《Poppin'》0ecffe58 **日本號 TOCJ-1620 卻標 country ES**。
- **來歷可疑 1 筆**：《Freedom》5397d087 標 **country `AF`（阿富汗）**、廠牌「Reborn Recordings」、barcode 5056303000082——非 Blue Note 授權線，**正文與封面都不得用**。
- **漏建各國同年壓片 6 處以上**：《A Slice of the Top》1979 英國 LBR 1028；《Take Aim》1981 英國 LBR 1038 與 1981 日本 GXK 8174；《Third Season》1982 紐西蘭 WC 4468；《Taru》1998 日本 TOCJ-1631 與 2012 TOCJ-50283；《Oleo》1981 日本 GXK 8169；《Street Singer》1981 日本 GXK 8161；《With a Song in My Heart》1981 日本 GXK 8190 與 1980 紐西蘭壓；《Sonic Boom》《Spiral》的 1979 南非壓。
- **盤名大小寫／撇號 3 處**：`Tippin’ the Scales`（U+2019）、`K. B. Blues`（多空格）、`With A Song In My Heart`（介系詞大寫）——**三處皆已改判**（第 814 條）。

**jazzdisco**（第 470 條在 LT 段要收窄）：
- **年份錯 1 處**：**LT-1081《Third Season》記 1981，實際 1980**（第 813 條）。**這是 jazzdisco 年份欄在本條線上的第一次出錯。**
- **曲名與 MB 打架 6 處**：〈A Touch Of Blue〉vs MB〈A Touch of the Blues〉；〈Cute 'N Pretty〉vs〈Cute 'n Pretty〉；〈East Of Brooklyn (aka Night Watch)〉vs〈East of Brooklyn〉；〈Gettin' Into Something〉vs MB〈Getting Into Something〉；〈Love, Your Spell Is Everywhere〉（有逗號）vs MB 無逗號；〈Jodie's Cha Cha〉vs MB〈Jodi's Cha Cha〉；〈Steppin' Stone〉vs MB〈The Steppin' Stone〉。
- **整條缺 2 處**：**Tommy Flanagan《Lonely Town》的 1959-03-10 那場，分年 session 頁完全沒有**（只有 Toshiba／King 目錄頁列了曲名，無 take 號）；**Harold Land《Take Aim》的 1960-07-25 Radio Recorders 那場沒有 take 號與 matrix。**
- **曲名欄自相矛盾 1 處**：LT-994 的盤名欄作單數「Consequence」、曲目欄的 1687 tk.3 作複數「Consequences」。
- **軌序與盤面不同 4 處**（它以 take 號排、盤面不然）：LT-987／LT-1028／GXF-3065／LT-1081。

**紙本（第 509c 條，本組五處）**：
- **Billboard 1979-09-22 把 LT-991《Chant》寫成「You're Next」**（那是該盤的第二軌，第 812 條）。
- **Billboard 1979-09-22 與 Cash Box 1979-09-15 都把 LT-994 印成「Consequences」**（複數），Cash Box 1979-11-10 才印對。
- **Billboard 的 Soul LPs 榜自 1979-05-26 起連續數週把《Heart String》印成複數的「HEART STRINGS」，同一期的爵士榜卻印單數**——**1979-07-14 那期兩個榜同時出現兩種拼法**；目錄號也被印成「UALA-942」「UALA 942」等多種形。
- **Billboard 1980-11-01 的廣告把 Blue Mitchell 的《Step Lightly》印成「Step Light」**（封面圖上的字是 Step Lightly），**1980-11-15 的價目表照抄**——**同一刊兩週連錯，不算兩個獨立來源**。**後批做 LT-1082 時不得照抄。**
- **Cash Box 1980-04-26 的《Nigeria》評介把製作人記成 Alfred Lion**——**錄音是 Lion 製作沒錯，但 1980 年這次發行是 Michael Cuscuna 監製**（Cash Box 1979-11-10 已載明）。

**維基**：
- **年份錯 2 處**：《Freedom》infobox 記 1980（實際 1979）；《In Memory Of》infobox 記 1979（實際 1980）。
- **錄音日錯 1 處**：《Spiral》infobox 記 **November 11, 1968**，jazzdisco 記 **November 25, 1968**（jazzdisco 有 take 號）。
- **時長不是原盤 1 處**：《Take Aim》infobox 記 57:23，**原盤六軌合計約 36:52**（57 分是後來 CD 版加別 take 的長度）。
- **消歧義陷阱 5 處**（第 754／787 條那種，**寫作層不得引用**）：`In Memory Of`／`Blues in the Night`／`Nigeria`／`Mr. Natural`／`Oleo`／`Confirmation` 直查都會落到**消歧義頁或同名國家／曲名條目**，
  正確條目名是 `In Memory Of (Stanley Turrentine album)`／`Blues in the Night (Sonny Clark album)`／`Nigeria (Grant Green album)`／`Mr. Natural (Stanley Turrentine album)`／`Oleo (Grant Green album)`；
  **`Confirmation (Jimmy Smith album)`、`K.B. Blues`、`With a Song in My Heart (Ike Quebec album)` 三個條目根本不存在。**

**Discogs**：
- **format 欄錯 0 處**（23 張全部作 Album，與 MB 一致）——**本組沒有第 782 條那種 Compilation 誤標。**

## 第 819 條（同批）：**店面與封面觀察（第 254 條，只寫觀察不寫結論）**

- **CAA 20/23 有圖，3 張 RG 層 HTTP 404、零圖**（皆 `redirect: 'follow'` ＋重試三次確認是真 404，第 589a 條）：
  **Jimmy Smith《Confirmation》、Tommy Flanagan《Lonely Town》、Ike Quebec《With a Song in My Heart》**
  ——前兩張與第三張都建議取 Discogs 原壓條目（Lonely Town 只有日本原壓 4293365 可取）。
- **20 張有圖的裡面，16 張的來源是原壓**（9 張美國 LT、7 張日本 GXF／GP）；**4 張不是**：
  《In Memory Of》→2021 日本 CD、《Taru》→2000 美國 CD、《Landslide》→2021 數位版、**《Poppin'》→第 817 條那筆被推翻的「1980 美國盤」**（封面實體以 Discogs 日本原壓 GXF 3066 為準）。
- **Apple us `search` 一種查法 23 張命中 17 張。** 沒命中的六張：
  **《Confirmation》（回他盤）、《Lonely Town》（零）、《Freedom》（回別人的 Freedom）、《With a Song in My Heart》（零）、《Take Aim》（零）、《Midnight Sun》（回的是他自己的《Midnight Creeper》，盤名近似、不是同一張）。**
- **命中的 17 張裡 13 張軌數等於原盤**；**四張對不上**：
  **《Spiral》→ 唯一命中的是 716626996「Medina & Spiral」11 軌（1998 雙盤合體 CD），沒有單獨的 6 軌形**——**本批唯一一張「店面只找得到與別張合體的版本」**；
  《Tippin' the Scales》→9 軌（＝1989 CD 形）；《Blues in the Night》→14 軌（＝2017 CD 形）；《Sonic Boom》→13 軌（＝2003 CD 形）。
- ⚠ **`releaseDate` 只有 1 張與紙本對得上**（第 484 條在本組再中一次）：**《Nigeria》1980-04-11**（介於 Billboard 3-29 廣告與 Cash Box 4-26 評介之間）。
  其餘 16 張分三類：**錄音日 7 張**（Tippin'／Consequence／K.B. Blues／A Slice of the Top／Sonic Boom／Third Season）、**年頭佔位 7 張**、**兩者皆非 2 張**
  （**《Blues in the Night》1958-10-16** 與 **《Street Singer》1960-10-02**，兩者都落在該場錄音之後一到兩個月，成因不明）。
  ⚠ **最壞的一筆是《In Memory Of》的 1979-01-01——正好等於被推翻的那個錯年**（第 813 條）。
- ⚠ **店面同名干擾兩處**：《Sonic Boom》第二筆回的是 **Jackson State「Sonic Boom of the South」管樂隊**；《Landslide》命中兩筆同名同軌數（1552986102／1845419509），**同一張碟在店面上有兩個條目**。
- **`genres` 分派**：**`['jazz']` 22 張**（全部是 1957–68 年的 hard bop／soul jazz 庫存首發）、**`['jazz','soul']` 1 張**（Earl Klugh《Heart String》，見第 823 條）。

## 第 820 條（同批，**紙本入庫**）：**本層自抓 Billboard 1980-01-05→1981-12-26 共 103 期、Cash Box 同區間 103 期，兩刊至此 1955→1981 底無缺口**

| 檔案 | 來源 | 實際涵蓋 | 備註 |
|---|---|---|---|
| `batch-progress/enum/billboard-bn-1980-1981-ocr.txt`（19.7 MB） | Billboard | **1980-01-05 → 1981-12-26，104 期中 103 期的命中頁** | c-145 a 掃；缺 **1981-01-03** 一期 |
| `batch-progress/enum/cashbox-bn-1980-1981-ocr.txt`（11.4 MB） | Cash Box | **1980-01-05 → 1981-12-26，104 期中 103 期的命中頁** | c-145 a 掃；缺 **1981-01-03** 一期；**1980-09-06 那週的檔名是星期五的 `CB-1980-09-05.pdf`**（見第 821 條） |

- 關鍵字＝**c-145 全批（a＋b 兩組）的目錄號通配**（`LT-9xx`／`LT-10xx`／`LT-11xx`、`BN-LT`／`BN-LA`／`BNLA`、`GXF-3xxx`、`GXK-8xxx`、`GP-3xxx`、`BLP 1620`、`UA-LA942`）
  ＋ **45 個盤名**（a 組 23 ＋ b 組 22）＋ **25 個人名**＋ **`Back to Blue Note`** ＋ 廠牌詞 **`blue note`**。
  **「blue note」是通配關鍵字，1980-01→1981-12 任何提到 Blue Note 的頁都在裡面**——**b 組與後批查別的 Blue Note 碟大致夠用；1982 年以後仍須重抓。**
- 每期以 `######## BB-YYYY-MM-DD pages=N`／`######## CB-YYYY-MM-DD pages=N` 分隔，頁內以 `===== PAGE n =====` 分隔，
  **頁內文字已先 `' '.join(text.split())` 把換行摺成空白**（第 636 條），可直接跑跨行片語的正則。
- 兩刊 1980–81 的 PDF 都有文字層，`pymupdf` 直接讀；**四路並行跑 208 期約 6 分鐘。**
- ⚠ **OCR 把目錄號的連字號前後加了空格**：紙面的 `LT-1037` 在文字層裡是 **`LT -1037`**，`LT1032`（價目表）則完全不加符號。
  → **檢索一律用 `LT\s*-?\s*10\d\d` 這種寬鬆式；用 `LT-1037` 直查會漏掉整版廣告。**（本層第一次搜 `LT-987|LT-992|…` 在 1977–79 檔裡回 0 筆，就是踩到這個。）

## 第 821 條（同批，**訂正 SOURCES 表的檔名形狀結論**）：**1980–81 年 Billboard 與 Cash Box 都只有一種檔名形狀，但 Cash Box 有一週改用星期五日期**

| 年 | Billboard | Cash Box |
|---|---|---|
| **1980／1981** | `BB-YYYY-MM-DD.pdf`（**單一形狀**） | `CB-YYYY-MM-DD.pdf`（單一形狀） |

⚠ **這與 1977–79 相反**：**第 789 條實測 1977–79 的 Billboard 一律是 `Billboard%20YYYY-MM-DD.pdf`、`BB-` 全數 404；1980 年起整個反過來——`BB-` 全通、`Billboard%20` 全 404。**
→ **第 705 條「這個檔案館的檔名形狀沒有規律，一律兩種都試」再次成立，而且換形狀的年份界線就在 1979／1980 之間。**

⚠ **缺期兩則，成因不同**：
1. **1981-01-03：兩刊同時缺**（`BB-`／`Billboard%20`／`Billboard-` 三形與 `CB-`／`Cash-Box-` 兩形各試兩輪皆 404）。
   → **第 789 條的「年終雙數合刊那一週不出單期」在 1981 年變成兩刊同步**（1977–79 那三年只有 Billboard 缺、Cash Box 一期不缺）。
2. **1980-09-06：`CB-1980-09-06.pdf` 404，但 `CB-1980-09-05.pdf`（星期五）存在且是同一期。**
   前一週 `CB-1980-08-30`、後一週 `CB-1980-09-13` 都是正常的星期六。
   → **不是缺期，是檔名的日期差一天。** 本層已補抓進檔（`######## CB-1980-09-05`）。
   → **給後批：Cash Box 1980 年代掃到 404 時，先試前後各一天再說缺期**（第 614／701 條「缺期規律得乾淨才是證據」的反例——**這一次的 404 不規律，所以它是檔名問題**）。

## 第 822 條（同批，新立）：**1979–81 的 Blue Note 有兩條平行的產線，日本那一條在數量上不輸美國——後批的年份與 `country` 都要照這個分**

本組 23 張裡 **美國 LT 系列 14 張、日本 King 系列 8 張、United Artists 1 張**。日本那一條的形狀：

| 系列 | 年份 | 性質 | 本組的碟 |
|---|---|---|---|
| **King `GXF-30xx`（「ブルーノート世界初登場1800シリーズ」）** | **1979–80** | **世界首發的庫存盤**，Discogs 的 series 欄就叫「世界初登場」 | GXF 3051 Blues in the Night／3052 K.B. Blues／3057 Freedom／3062 Tippin' the Scales（皆 1979）；3065 Oleo／3066 Poppin'／3067 Street Singer（皆 1980） |
| **King `GXK-81xx`（「Unissued Masters Series Part 1」）** | **1980–81** | **GXF 系列的再壓**，不是首發 | GXK 8154／8156／8160（1980）、8161／8163／8169／8170／8174／8176／8180／8190（1981） |
| **King `GP-31xx`** | 1979 | 另一個號段的庫存首發 | GP 3186 Lonely Town |

→ **判準三條**：
1. **`year` 取 GXF／GP 的年，不取 GXK 的年**——**GXK 是再壓**（jazzdisco 的 Toshiba／King 頁每一條都用「** also released on Blue Note (J) GXK-xxxx in 19xx」標明）。
2. **這些碟的 `country` 是 JP，而且多半只有 JP**；**美國紙本查無是正常的，不是「紙本沒有」**（第 704 條的反面用法）。本組有三張（Oleo／Street Singer／Poppin'）與五張 1979 年的日本盤屬此類。
3. **jazzdisco 的 toshiba-king 頁在這一段是完整的**（第 795 條第 4 點說它「只從 GXF-3023 起列」——**GXF-3051 到 3073 一條不缺，含曲目、take 號與 personnel**）。**GXF-3074 以後標「not released」的七條要小心，那些號後來改走 BNJ／DY 系列。**
⚠ **給後批**：**GXF-3063《Bennie Green - Minor Revelation》、3064《Curtis Fuller - Two Bones》、3068《Lou Donaldson - Sweet Slumber》、3069《Sonny Clark - The Art of the Trio》、3070《Kenny Burrell - Swingin'》（b 組已收）、3071《Grant Green - Remembering》（b 組已收）、3072《Tina Brooks - Minor Move》（池中 c137 已有）、3073《Bobby Hutcherson - Inner Glow》（b 組已收）**
——**這一段的缺口是 3063／3064／3068／3069，年份 jazzdisco 全記 1980。**

## 第 823 條（同批）：**`genres` 分派——22:1，本組不破例**

- **`['jazz']` 22 張**：全部是 1957–68 年錄音的 hard bop／soul jazz／post-bop 庫存首發。
  **即使是 Jimmy Smith 的管風琴盤、Lou Donaldson 的 boogaloo 前夜、Ike Quebec 的點唱機單曲場，一律 `['jazz']`**
  ——**理由是它們的錄音年代全在 1968 年以前，池中同期的 Blue Note 卡（c135–c142）也都是 `['jazz']`**，`year` 是 1979–80 不改變內容的年代歸屬。
- **`['jazz','soul']` 1 張**：**Earl Klugh《Heart String》**（1978 年錄音、1979 年發行的 crossover 盤，**進 Billboard Soul LPs 榜**）
  ——與 c-144 b 第 788 條給 Earl Klugh 另三張的分派完全一致。
- **`['jazz','rock']` 0 張**：**第 790 條的兩個條件（領班或核心編制來自搖滾 ＋ 同期紙本用 rock 這個字評它）本組一張都不符合**，不破例。

## 第 824 條（同批）：**四條交叉線——寫作層的互指清單**

**本批 23 張裡有 16 張至少與另一張共用樂手或場次。四條主線：**

1. **Grant Green ＋ Sonny Clark 四重奏（1961-11 到 1962-01 連錄四場，一場都沒發）**：
   本批的 **《Nigeria》（1962-01-13，鼓 Art Blakey）** 與 **《Oleo》（1962-01-31，鼓 Louis Hayes）** 是其中兩場；
   另兩場是 **GXF-3058《Gooden's Corner》（1961-12-23）** 與 **GXF-3071《Remembering》（1961-11-26）**，**b 組收了 Remembering 與 Gooden's Corner**。
   四場全部收進 Mosaic MR5-133。**逐 take 零重複，但正文不得把兩場寫成一場、不得把鼓手寫錯。**
2. **Sonny Clark 在本批出現四次**：**《Blues in the Night》是他自己的領班盤**，**《Tippin' the Scales》《Nigeria》《Oleo》三張他是側人鋼琴**。**四卡正文不得互抄。**
3. **Lee Morgan 在本批出現五次**：**《Sonic Boom》（1967）《Taru》（1968）是領班盤**；**《Confirmation》（1957／58）《A Slice of the Top》（1966）《Mr. Natural》（1964）他是側人**。
   ⚠ **1957 年 Manhattan Towers 那個十九歲的 Morgan 與 1968 年的不能寫成同一個階段。**
4. **Hank Mobley 三張是三個年代**：**《Poppin'》（1957-10-20 六重奏，日本首發）／《A Slice of the Top》（1966-03-18 八重奏，他唯一一次寫大編制）／《Third Season》（1967-02-24 七重奏，Sonny Greenwich 彈吉他）**。
   ⚠ **維基的 Third Season infobox 把 prev_title 指向《A Slice of the Top》——那是發行順序不是錄音順序**，正文不得寫成「上一張」。
   ⚠ 他還是 **《K.B. Blues》（1957-02-10）** 的次中音。

**另外五組較短的**：
- **Stanley Turrentine 四處**：《In Memory Of》《Mr. Natural》是領班盤（**兩場都曾排進同一個沒發出去的 BLP 4234**）；他是 **《Freedom》1964-10-22 那場**的次中音（**與 Mr. Natural 那場只差七週**）。
- **Kenny Burrell 四處**：《K.B. Blues》《Freedom》是領班盤；他是 **《Confirmation》兩場**的吉他手。
- **Harold Land 兩處**：《Take Aim》是領班盤；他是 **《Spiral》1968-11-25 那場**的次中音。
- **Lou Donaldson 兩處**：《Midnight Sun》是領班盤；他是 **《Confirmation》1958-02-25 那場**的中音。
- **Tina Brooks 兩處**：**《Street Singer》是聯名領班**；她是 **《Confirmation》1958-02-25 那場**的次中音。**池中 c137 的《Minor Move》是 GXF-3072、同年同系列。**
- **Ray Barretto 兩處**（《Midnight Sun》《Mr. Natural》）、**Billy Higgins 六處**、**Bob Cranshaw 四處**——**這三位是本段 Blue Note 的棚內常客，正文不得因為名字重複就寫成同一個班底。**

## 第 825 條（同批）：**交件數字、中間檔、給 c-145 b 與後批**

- **交件 23 張、16 位；退 0**（第 811 條）；**年份改判 1**（第 813 條）、推翻單一來源 2 處；**盤名改判 3**（第 814 條）；
  **新聯名掛名 1、其餘 22 張沿用池中**（第 815 條）；**`label` 改他廠 1**（Heart String → United Artists）；
  **合輯 0、現場 0、庫存／延遲首發 22**；**撞陳列 4 張**（第 816 條）；CAA 20/23、店面 17/23。
- `chk-prop a`：**23 張 16 位、標記 0**；跨批 109 批 4,481 張撞卡 0、同 rgMbid 不同掛名 0。
- `why` 均長 **588**／`risk` **1,199**／`mbNote` **940** 字元（`c141/prop-b` 為 556／933／784）。
- 中間檔 `scratchpad/c145a/`：`mb-fetch.mjs`＋`mb.json`（23 個 RG 的 rg／rel／caa 回傳）、`mbsum.mjs`／`mbsum.txt`、`caa-retry.mjs`、
  `poolscan.mjs`／`poolscan.txt`／`poolrows.json`（實掃 **26,176 列**＝seed 16,450 ＋ 183 個卡單檔 ＋ 各批 prop）、
  `web/lt.txt`（jazzdisco LT 系列全頁）／`web/catalog-toshiba-king-series.txt`／`web/disc-1957-1958.txt`～`disc-1967-1968.txt`（**六個分年 session 頁，母帶號比對就靠這些**）／`web/jd-blocks.txt`，
  `sess.py`／`sess2.py`（**依錄音日反查「這一場的每個 take 後來去了哪張碟」的工具，第 816 條全靠它**）、
  `dg.mjs`／`dg2.mjs`＋`discogs/`（27 個 catno ＋ 10 組 artist+title 反查）、`wiki.mjs`／`wiki2.mjs`＋`wiki.json`（37 查 31 中）、
  `apple.mjs`＋`apple.json`、`np.py`＋`bb-s1/s2`・`cb-s3/s4`（四支 shard 的抓取器，含 `.done` 續跑檔）、`srch.py`／`srch80.py`（命中頁檢索工具）、
  `a1.mjs`～`a4.mjs`（卡單產生，**每 5／6／6／6 張寫回磁碟一次**）、`esc.py`（卡單腳本的引號轉義工具）。
- **給 c-145 b 與後批**：
  1. **紙本 1980–81 已入庫**（第 820 條），關鍵字含通配 `blue note` 與 **a、b 兩組 45 個盤名**；
     ⚠ **檢索目錄號一律用 `LT\s*-?\s*10\d\d` 這種寬鬆式**——OCR 會把 `LT-1037` 打成 `LT -1037`。
  2. **1980 年的年份依據是五則 Liberty／UA 新片廣告**（第 812 條第 3 點的表），**b 組的 LT-1030／1038／1044／1045／1054／1076／1082／1085／1086 全部可以在那幾則裡找到**。
  3. **jazzdisco 的年份欄在 LT 段會錯**（第 813 條第 2 點）——**b 組的 LT-1064／1065／1088／1089／1091／1092／1096／1102 一律用紙本覆核**。
  4. **U+2019 撇號一律改 ASCII**（第 814 條第 1 點）——**b 組的《Rollin’ With Leo》《Gooden’s Corner》直接適用**；
     **b 組的 `Jean‐Luc Ponty` 掛名帶的是 U+2010 連字號，`chk-prop` 會亮燈，必須改成 ASCII `-`。**
  5. **日本 GXF／GXK 兩個系列的分工照第 822 條**：`year` 取 GXF／GP、不取 GXK。
  6. **母帶比對的做法**：用 `scratchpad/c145a/sess2.py "<Month D, YYYY>"`，它會把那一場每個 take 的去向逐行印出來（第 816 條）。
     **b 組至少四張要跑**：《Patterns》《Medina》（Hutcherson 1968 那幾場，**與 a 組的《Spiral》在 1998 CD 上兩軌重疊**）、
     《Vertigo》（McLean 1962-1963，**與 a 組的《Tippin' the Scales》相鄰但不同場**）、《On the Sunny Side》（**與 a 組的《Confirmation》共用 1957-08-25 那一晚**）。
  7. **b 組已預約的互指**：`Bobby Hutcherson —《Medina》`↔a 組《Spiral》；`Jimmy Smith —《On the Sunny Side》`↔a 組《Confirmation》；
     `Grant Green —《Remembering》《Gooden's Corner》`↔a 組《Nigeria》《Oleo》；`Andrew Hill —《Dance With Death》`↔a 組《Spiral》（Hill 是 1965 那場的鋼琴）；
     `Leo Parker —《Rollin' With Leo》`↔a 組《Mr. Natural》（同一則 1980-11-01 廣告）；`Larry Young —《Mother Ship》`↔a 組《In Memory Of》（同一則 1980-04-26 廣告）。
