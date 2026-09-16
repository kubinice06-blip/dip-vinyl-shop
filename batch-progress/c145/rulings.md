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

## 第 840 條（c-145 b 組交件）：**22 筆 → 收 21、退 1；年份改判 2 張、維持 enum 值但有相反證據 2 張；撞陳列 6 張；紙本沿用 a 組已掃的 1980–81**

- **收 21 張、16 位**（Bobby Hutcherson 3、Earl Klugh 2、Jimmy Smith 2、Grant Green 2，其餘 12 位各 1）。
- **退 1**（Art Pepper《Omega Alpha》，第 841 條）。**第 315 條：prop 21 ＋ 退表 1 ＝ 22 ✓。**
- **年份改判 2 張**（第 846 條）：**Grant Green《Remembering》1981 → 1980**、**Grant Green《Gooden's Corner》1981 → 1979**
  ——兩張列舉檔釘的都是 **1981 年的 GXK 換號再發**，首發是 King 的 GXF 號（**執行 a 組第 822 條判準 1**）。
- **年份維持 enum 值但有相反紙本 2 張**（第 847 條）：《Vertigo》《Medina》（Cash Box 的 1981 年第一季發片表把兩張都排在一月）。
- **`releaseType`**：**21 張全是 Album，合輯 0**；**現場 2 張**（Jimmy Smith《Cool Blues》、Jean-Luc Ponty《Live at Donte's》，兩張 MB 的 `secondary-types` 都有 Live ✓）；
  **庫存／延遲首發 17 張**、**同期新作 4 張**（Klugh 2、Ronnie Laws 1、以及沒有一張走 §5.6）。
- **`label` 改他廠 3 張**（第 849 條）：Earl Klugh 兩張（Liberty）、Ronnie Laws 一張（United Artists）。
- **掛名**：**新掛名 0 位**（16 位全部沿用池中既有字串）、**群組字串收攏 1 張**（Africaine，第 848 條）、**自行合併 0、新造分裂 0**。
- **CAA 20/22 有圖**（退掉的那張不計則 19/21），**2 張 RG 層 404 零圖**（Congo Lament、The Creeper）；**店面命中 14/21**（第 851 條）。
- **紙本**：**沒有自抓**——a 組已把 1980-01-05→1981-12-26 兩刊掃完並歸檔，**本層覆核過關鍵字確實涵蓋 b 組 22 筆的全部盤名、人名與目錄號**（第 852 條）。
- `why` 均長 **547**／`risk` **980**／`mbNote` **996** 字元（`c141/prop-b` 為 556／933／784）。

## 第 841 條（同批）：**退表 1 筆——Art Pepper《Omega Alpha》(LT-1064, 1981)：LT 系列裡真正的舊料重編**

| 盤 | rgMbid | 退的理由 | 證據 |
|---|---|---|---|
| **Art Pepper —《Omega Alpha》** | 756a7f13-63cb-4457-b635-b312a270c716 | **舊料重編（第 312 條），不是庫存首發** | **Discogs 4021846 的 notes 逐軌交代出處：「Track B1 previously issued on [m843544]; all others previously issued on [m583714]」**——`m583714`＝**Art Pepper Quartet《The Art of Pepper》（Omega Records, 1957）**、`m843544`＝**《The Art of Pepper Vol. II》（同廠同年）**。七軌全部先前已發行。 |

**查證過程（不是只看一條 notes）**：
1. **jazzdisco LT-1064 條**：全部七軌出自 **1957-04-01 Audio Arts Studio, Hollywood** 同一場，matrix 欄是 **雙號 `AA2872-1 | IM-3980`** 形——`IM-` 是 **Intro／Aladdin 的母帶號**，**母帶號被配出去就代表當年排過發行**。
2. **該頁七軌沒有一軌標 `(alternate take)`**——jazzdisco 在 1500／4000／LT 各系列都會標，**這裡沒標，等於不是未發行的另一 take**。
3. **Discogs 兩個 master 的曲目與本盤逐首對上**（Too Close for Comfort／Webb City／Surfride／Body and Soul／Begin the Beguine 在 Vol.1；Fascinatin' Rhythm 在 Vol.II）。
4. **池中已有同一位領班的 Aladdin 期兩張**（seed《Modern Art》＝Intro ILP-606，1956-12-28／1957-01-14 兩場；c-137《The Return of Art Pepper》）——**本盤那一場（4 月 1 日）與這兩張不同場，但它本身就是 1957 年 Omega 那兩張的重編**。

→ **不走 §5.6**：§5.6 要的是「歷史重要性 ＋ 可追溯證據」，**一張 1981 年把 1957 年兩張 Omega LP 重新排一遍、換個新名字的盤不符合**；
要收的是 **《The Art of Pepper》（Omega, 1957）本身**，那不在本批清單上。**可逆：日後若決定收 Omega 原盤，本卡的查證直接可用。**

## 第 842 條（同批，**收窄第 783 條**）：**LT 系列不是整段 previously-unreleased——至少三個號是舊料重編，判定一律回到逐張文案**

c-144 b 第 783 條寫「**LT 系列（1979 起）＝Back to Blue Note 企劃，整段是庫存首發**」。**本層在同一份 jazzdisco LT 全頁上找到三個反例**：

| 號 | 盤 | jazzdisco／Discogs 原文 |
|---|---|---|
| **LT-1064** | Art Pepper《Omega Alpha》 | Discogs：七軌全部 previously issued（Omega《The Art of Pepper》Vol.1／II，1957） |
| **LT-1100** | Bob Brookmeyer & Bill Evans《As Time Goes By》 | **jazzdisco 直接寫「originally released on *The Ivory Hunters*, United Artists UAL 3044 in 1959」** |
| **LT-1101** | Gerry Mulligan《Freeway》 | 1952 年 Pacific Jazz 母帶（PJ-206／209／218–223），**那批是 Mulligan 四重奏最著名的已發行單曲群** |

→ **第 783 條要改成**：「**1979–81 年的 LT 系列以庫存首發為主，但混有舊料重編；`releaseType` 與 `year` 一律逐張讀文案（Discogs release notes 的 previously unissued／previously issued 一行、jazzdisco 的 `originally released on…` 一行），不可依系列名整段推定。**」
⚠ **這與第 782 條是同一條判準的兩個方向**：782 擋的是「標題寫 reissue、內容是首發」，**本條擋的是「系列被認定是首發、內容卻是 reissue」**。**兩個方向都只靠逐張文案。**
⚠ **本組 21 張收的碟逐張查過這一行**：Discogs release notes 明寫 previously unissued／released here for the first time 的有 **9 張**（Vertigo／Medina／Patterns／Thinking of Home／Mother Ship／Cool Blues／Infinity／The Creeper／Africaine／Congo Lament／Live at Donte's，計 11 張），
**《On the Sunny Side》是唯一的中間狀態**：「**A2 previously issued on Blue Note 45-1769；all other tunes previously unissued**」——**八軌裡一軌先出過單曲，仍判 Album**（單曲先發不改變「首度成盤」的性質），但寫進該卡 `risk`。

## 第 843 條（同批，新立）：**`LT-1000` 號段是 Liberty／UA 集團 1980 年起的共用號段，不是 Blue Note 專屬——光看 `LT-` 判不出廠牌**

本層在 1980–81 兩刊的廣告與榜列裡逐號查過，同一條號段上交錯著四家廠牌：

| 號 | 盤 | 廠牌 | 出處 |
|---|---|---|---|
| LT-1001 | Ronnie Laws《Every Generation》 | **United Artists** | BB 1980-01-26 廣告、BB／CB 榜列 |
| LT-1019／1025／1036／1042 | Gallagher／Dayton／Richard Leigh／The Dirt Band | **United Artists／Liberty** | BB 1980-02-23、05-17 廣告；CB 1980-09-27 榜 |
| LT-1030／1038／1044／1045／1054／1076／1081／1082／1085／1086／1088／1089／1091／1092／1096／1102 | Blue Note Classic 的庫存盤 | **Blue Note** | 本批與 a 批 |
| LT-1063／1074／1079／1090／1093／1097／1104／1105／1107／1110 | Eloise Laws／Billie Jo Spears／Earl Klugh／The Vapors／Cristy Lane／Bill Medley／Classix Nouveaux／Powder Blues／Robbie Patton／Freddie Hubbard | **Liberty／EMI-America** | BB 1980-11-01、1981-04-18、08-15 廣告 |

→ **判準**：**`LT-` 前綴只代表 Liberty/United 集團 1980 年起的統一編號，不代表 Blue Note**；
**Blue Note 的那些在盤面與廣告上另標「Blue Note CLASSIC」**——**要靠這個副標或廠牌欄分，不要靠號**。
⚠ **另一段**：**Liberty 1981 年另開 `LT-51xxx` 段**（本組 Earl Klugh《Crazy for You》＝LT-51113），**與 LT-1000 段無關**。
⚠ **Discogs `catno=LT-1001` 反查回 45 筆，其中十一筆是 Bowmar／Peerless／La Trebor 等完全無關的廠牌同號盤**——**查目錄號一律連廠牌帶盤名**（第 509c 條的延伸）。

## 第 844 條（同批，**第 782 條在 1980 年這一波的續證**）：**廠牌自己的廣告同時用了「unreleased masters」與「RE ISSUE SERIES」兩個相反的字**

本層取得 1980 年那一波的兩份廠牌文件，**兩份出自同一家公司、相隔十二週，用詞完全相反**：

1. **Billboard 1980-03-08 p34，EMI-America／United Artists 全版廣告**：十二張逐張列名＋「**ourteen unreleased masters**」（OCR 掉了字首 F，原文為 Fourteen unreleased masters）——
   **JACKIE McLEAN Consequence／ANDREW HILL Dance With Death／GRANT GREEN Solid／LOU DONALDSON Midnight Sun／WAYNE SHORTER The Soothsayer／STANLEY TURRENTINE New Time Shuffle／GRANT GREEN Nigeria／HANK MOBLEY A Slice Of The Top／JIMMY SMITH Confirmation／LEE MORGAN Taru／BOBBY HUTCHERSON Spiral／DEXTER GORDON Clubhouse**，每一張下面都印「**b Blue Note CLASSIC**」。
2. **Cash Box 1980-05-31 p47，Blue Note 半版廣告**：抬頭卻是「**THE BLUE NOTE RE ISSUE SERIES**」，推的是 **Bobby Hutcherson／Hank Mobley／Jazz Crusaders LT-1045／LT-1046** ——
   **但那三張的內容物全是首發**（Discogs：Patterns／Thinking of Home 皆「released here for the first time」）。

→ **第 782 條在 1980 年這一波再中一次，而且這次連廠牌自己的兩份文件都互相打架。**
**判準不變：讀逐張文案（哪幾軌、什麼時候錄的、有沒有發過），不讀廣告抬頭、不讀系列名。**
⚠ **附帶用途**：那則 3 月廣告的十二張名單**把 1979 年「Back to Blue Note」十張（第 783 條）與 1980 年的新一波接了起來**——
**《Dance With Death》《Nigeria》《Taru》《Midnight Sun》是 1980 年這一波的新增**，其餘八張是 1979 年那十張的延續廣告。**這一則廣告只能算一份來源，不是十二份**（第 509c／614 條）。

## 第 845 條（同批，**本批最重要的一條**）：**六張卡的母帶與池中既有正盤同場——撞的是陳列不是碟，逐軌 take 比對全部零重複**

派工信預警的形狀（c-147 第 738 條）在本組出現 **六次**。**方法：以 jazzdisco 的錄音日 ＋ take 號，逐軌比對本盤與池中正盤。**

| 本批的卡 | 同場的池中正盤 | 錄音日 | 逐軌比對結果 |
|---|---|---|---|
| **Kenny Burrell《Swingin'》** | **`Kenny Burrell`（BLP 1543，c-136）** | 1956-03-12 Audio-Video | 本盤 tk.42；正盤 tk.10／13／27／43／64 — **零重複** |
| 同上 | **《Blue Lights, Volume 1／2》（BLP 1596／1597，c-137 兩卡）** | 1958-05-14 Manhattan Towers | 本盤 tk.1；正盤 tk.2／8／11／14／4／9／10／12 — **零重複** |
| 同上 | **《On View at the Five Spot Cafe》（BLP 4021，c-138）** | 1959-08-25 Five Spot（同一晚） | 本盤 tk.3／8／14（第 1／2／3 場）；正盤 tk.10／11／15／19／22（第 2／3／4／5 場）— **零重複，但同一晚同一批客人** |
| **Jackie McLean《Vertigo》** | **《New Soil》（BLP 4013，seed）** | 1959-05-02 | 本盤只有〈Formidable〉tk.5；**且該軌 1988 年被放進《New Soil》CD 當 bonus track** — **同一軌在兩張碟上，是本批唯一的真重複** |
| 同上 | **c-144《The Jackie McLean Quintet》／《Hipnosis》** | 1962-06-14（BLP 4116） | **只在 2000 年 Connoisseur CD（11 軌）上重疊，1980 年原盤 6 軌不含** |
| **Jimmy Smith《On the Sunny Side》** | **《House Party》（BLP 4002）／《The Sermon!》（BLP 4011）**（皆 seed）＋**a 組《Confirmation》(LT-992)** | 1957-08-25 | 本盤 tk.6 — **零重複** |
| 同上 | **《Home Cookin'》（BLP 4050，seed）** | 1958-07-15／1959-06-16 | 本盤 tk.2／3／7／10／14／18 — **零重複** |
| 同上 | **《Midnight Special》（BLP 4078）＋《Back at the Chicken Shack》（BLP 4117）**（皆 seed，同一天） | 1960-04-25 | 本盤 tk.10 — **零重複** |
| **Bobby Hutcherson《Medina》** | **a 組《Spiral》(LT-996)** | 1969-08-11 vs 1965／1968 | 錄音無關；**但 1998 年的 CD（11 軌）把兩張併成一張《Medina & Spiral》，Apple 上就是這個形** |
| **Art Blakey and the Jazz Messengers《Africaine》** | **《The Big Beat》（BLP 4029，seed）** | 1959-11-10 vs 1960-03-06 | **不同場，但〈Lester Left Town〉是同一首曲子的兩次錄音** — **撞的是曲目不是母帶** |
| **Ike Quebec《Congo Lament》** | （池中無，但）**《Easy Living》BST 84103（1987）** | 1962-01-20 | **1987 年那張是同一天的全集，本盤五軌全在裡面** — **日後收 Easy Living 必須互指** |

→ **三條給寫作層的硬規則**：
1. **正文一律寫明是哪一天、哪一場、哪一個 take 群**，不得寫成「未發表的新錄音」。
2. **《Vertigo》的〈Formidable〉是唯一真的在兩張碟上的一軌**——那一軌的正文必須寫清楚它後來去了《New Soil》的 CD。
3. **《Swingin'》與《On the Sunny Side》是「一張卡撞三到五張池中卡」的極端例**，上架後的相似推薦會互相打架，**兩卡的 `risk` 都已列全名單**。

## 第 846 條（同批）：**年份改判 2 張：GXK 是換號再發，GXF 才是首發——並訂正 a 組第 824 條對《Remembering》的兩處記述**

| 盤 | enum 年 | 改判 | 依據 |
|---|---|---|---|
| **Grant Green《Remembering》** | 1981（GXK 8167） | **1980**（GXF 3071） | Discogs 3936998 notes「**Renumbered issue of [r6021116] (GXF 3071)**」＋format 標 Reissue；Discogs 6021116＝1980；jazzdisco GXF-3071＝1980「also released on GXK-8167 in 1981」；**維基 infobox 亦作 1980／GXF 3071** |
| **Grant Green《Gooden's Corner》** | 1981（GXK 8168） | **1979**（GXF 3058） | Discogs 4414343 notes「**Renumbered issue of [r4411224] (GXF 3058)**」＋format 標 Reissue、℗ 1981；Discogs 4411224＝1979、**盤面 ℗ 1979 Jasrac**；jazzdisco GXF-3058＝1979 |

**兩張都是執行 a 組第 822 條判準 1（`year` 取 GXF／GP 的年、不取 GXK 的年）**，本層只是把它套到 b 組清單上。
⚠ **rgMbid 都不動**：MB 這兩個 RG 底下**只建了 1981 年的 GXK 再發、沒建 GXF 首發**，
所以 **MB 的 `first-release-date` 在這兩張上系統性晚一到兩年**——**後批凡是遇到 `GXK-81xx` 釘在 RG 上的，一律先回 jazzdisco／Discogs 查對應的 GXF 號。**
⚠ **維基在《Gooden's Corner》上錯一次**：條目寫 1980，**但它自己引的 jazzdisco 條寫 1979**（單一來源抄錯年，第 470／550 條形狀）。
⚠ **訂正 a 組第 824 條第 1 點兩處**：
1. **《Remembering》的錄音日是 1961-08-29，不是該條寫的 1961-11-26**（jazzdisco GXF-3071、Discogs 6021116 notes、維基 infobox 三邊一致）。
2. **《Remembering》不屬於「Grant Green ＋ Sonny Clark 四重奏」那條線**——**本盤是 Green／Wilbur Ware／Al Harewood 的三重奏，Sonny Clark 不在場**。
   那條線是《Gooden's Corner》（1961-12-23）／《Nigeria》（1962-01-13）／《Oleo》（1962-01-31）＋ 池中 seed《Solid》以外的幾場，**四場之說要扣掉 Remembering**。

## 第 847 條（同批）：**《Vertigo》《Medina》維持 1980——「發片表是計畫、不是出貨」，但相反證據寫進卡**

**Cash Box 1980-12-27 p17 的 1981 年第一季發片表**（EMIA/Liberty 欄）把 **「Jackie McLeon (Blue Note)」與「Hutcherson (Blue Note)」排在一月**；
**但同一份刊物 1980-09-27 p11 的 1980 年第四季表已經把「Bobby Hutcherson (Blue Note)」排在十一月**——**同一張盤被排了兩次。**

| 支持 1980 | 支持 1981-01 |
|---|---|
| MB frd 1980（Vertigo 甚至是 1980-01-01）、Discogs 美國原壓與卡帶皆 1980、jazzdisco 1980、維基 1980、**Vertigo 盤面 ℗ 1980 Liberty Records** | Cash Box 1980-12-27 的第一季表；**LT 號序**（LT-1081／1082＝1980-11，LT-1088／1089＝1981-02，1085／1086 夾在中間） |

→ **判：維持 1980**（enum 值），**一月上市說寫進兩張卡的 `risk`**。理由三條：
1. **發片表是廠牌給貿易刊的計畫清單，同一張盤在兩期裡被排了兩次，本身就證明它會滑動**；第 612 條講的「檔期廣告最硬」指的是**已經印出目錄號與售價的上市廣告**，不是季度預告表。
2. **℗ 年與五個資料來源同向**。
3. **可逆**（改的是卡單值），且**兩張的相反證據已完整寫在卡上**，日後要翻不必重查。
⚠ **給後批**：**LT-1083～1087 那一段（1980 年底／1981 年初）是這條線上年份最鬆的一格**，收到那幾號時請直接引本條。

## 第 848 條（同批）：**掛名——新掛名 0 位；群組字串收攏 1 張；Ponty 的 U+2010 連字號**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| **`Art Blakey & The Jazz Messengers`**（209ddf15 **Group** US 1954） | **`Art Blakey and the Jazz Messengers`**（**收攏成池中多數**） | 池中 **`and the` 30 列**（seed 6 ＋ c-136～c-142 二十四）vs **`& The` 5 列**（全在 seed）——第 307 條取多數，且與 c-136～c-142 七批一致。**兩個字串在 `chk-prop` 摺成同一個鍵（`&`→`and`），不影響撞卡偵測。不合併池中既有的另一個字串** |
| **`Jean‐Luc Ponty`（U+2010 連字號）**（44cd4e2e Person FR） | **`Jean-Luc Ponty`（ASCII `-`）** | 池中 c-142《King Kong》既有字串；**`chk-prop` 會擋非 ASCII 連字號**（c-110 CCCP 先例） |
| 其餘 19 張 | **全部沿用池中既有字串** | Kenny Burrell／Bobby Hutcherson／Andrew Hill／Earl Klugh／Hank Mobley／Jackie McLean／Jimmy Smith／Larry Young／Ronnie Laws／Leo Parker／Lee Morgan／Donald Byrd／Grant Green |

⚠ **`Earl Klugh` 是 c-144 第 784 條新立的字串，池中 6 列全在尚未上傳的 c-144 批次**——本組兩張沿用，**不是新掛名，但上線順序要排在 c-144 之後**。
⚠ **同名撞擊核過的兩位**：`Jimmy Smith`（MB 有多個同名，本人＝4f8a0d9b Person US）、`Larry Young`（81971abd Person US）——**核 type／area／life-span，不看 score**。
⚠ **`Art Blakey` 的第三個字串**（池中 13 列的純 `Art Blakey`，c-144《Live Messengers》用的就是它）**本卡不用**：本盤 MB credit 是 Group 實體，**不是 c-144 那種「Person 上掛 credited-as」的情形**（第 611 條第一種盲區在這裡沒有中）。

## 第 849 條（同批）：**`label` 改他廠 3 張——「Blue Note 目錄裡的非 Blue Note 盤」在 1980–81 佔了七分之一**

| 卡 | 列舉檔的 note | 覆核結果 | 原廠與原號 |
|---|---|---|---|
| Earl Klugh《Late Night Guitar》 | 「BN 首發 1999，原盤 1980 可能他廠」 | **屬實** | **Liberty LT-1079**（BB 1980-11-15 目錄頁「LP Liberty LT1079 $7.98」）；Blue Note 版＝1999 US CD |
| Earl Klugh《Crazy for You》 | 「BN 首發 1995，原盤 1981 可能他廠」 | **屬實** | **Liberty LT-51113**（BB 1981-11-07 評介、11-14／21 榜列）；Blue Note 版＝1995 NL CD |
| Ronnie Laws《Every Generation》 | 「BN 首發 2005，原盤 1980 可能他廠」 | **屬實** | **United Artists LT-1001**（BB 1980-01-26 廣告＋兩刊全年榜列）；Blue Note 版＝2005 CD |

→ **三張的 `year` 都取原廠首發年、`label` 寫原廠、Blue Note 版年份註在 `label` 欄尾與 `risk`**（簡報 §1.3）。
⚠ **維基在《Late Night Guitar》上把 label 欄寫成 Blue Note**——那是 1999 年 CD 的廠牌，**infobox 的 label 欄在再發盤上不可信**。
⚠ **這三張都不是「Blue Note 誤收」**：1980 年的 Blue Note 與 Liberty／UA 同屬 EMI 旗下同一個發行公司，**列舉檔把它們掃進來是因為 MB 的 Blue Note 再發 release**，**卡上要呈現的是原盤。**

## 第 850 條（同批）：**資料庫與紙本的錯誤清單（22 筆裡查出 24 處）**

**MB**：
- **漏建首發盤 2 張**（本批最嚴重）：**GXF 3071《Remembering》與 GXF 3058《Gooden's Corner》的首發 release 一個都沒建**，RG 底下只有 1981 年的 GXK 再發 → **frd 直接晚一到兩年**（第 846 條）。
- **發行日抄成錄音日 1 處**：**《Remembering》release 1735379e 的 date ＝ 1981-08-29**，**月日與錄音日 1961-08-29 完全相同**（新錯誤型）。
- **欄位缺漏 5 處**：《Crazy for You》3f3982c7 **date 空**；《Live at Donte's》6608d9a5 **label-info 整個空**；《Medina》4ecd7df0 **catno 登成「[none]」**；《Live at Donte's》原盤四軌 **length 全空**；《Vertigo》6b9108cc **把 11 軌的數位版掛 1980-01-01**。
- **漏建同年他國壓片與載體 13 張以上**：Klugh 兩張（加／菲／新馬港／馬來西亞／墨／巴拿馬／印尼／西班牙《Loco Por Ti》）、Ronnie Laws（加／菲）、Thinking of Home（2009 再壓＋TOCJ-50288）、Infinity（TOCJ-1627）、The Creeper（2017 再壓）、Africaine（TOCJ-50299＋2009 再壓）、Congo Lament（4LT-1089 卡帶）、On the Sunny Side（4LT-1092＋TOCJ-50301）。
- **catno 寫法不一致 1 處**：《Remembering》MB 作無空格 `GXK8167`，《Gooden's Corner》作有空格 `GXK 8168`。

**jazzdisco**（第 470 條：年份欄在這一段很準，其他欄照樣錯）：
- **人名錯 1 處**：**《Mother Ship》的次中音印成「Herbert Mogan」，正確是 Herbert Morgan**。
- **曲名錯 2 處**：《Remembering》〈**If Had You**〉（漏 I）；《Congo Lament》〈Que's **Pill**〉（盤面是複數 Pills）。
- **曲序用 take 序而非盤面序 4 處**：《Mother Ship》《Gooden's Corner》《Africaine》《Inner Glow》——**四張都要以 MB＋Discogs 的盤面序為準**。
- **年份欄 0 錯**：本組 21 張逐張對過，**jazzdisco 的 LT 與 Toshiba／King 兩頁一張都沒錯**（含被維基推翻的《Gooden's Corner》1979）。

**維基**：
- **年份錯 1 處**：《Gooden's Corner》記 1980（實際 1979，第 846 條）。
- **infobox 與正文自打架 1 處**：**《Live at Donte's》infobox 的 released＝1969、label＝Pacific Jazz，正文卻寫「original release was on vinyl by Blue Note…released in vinyl in 1981」**。
- **把庫存首發寫成 compilation 1 處**：《Swingin'》正文「is a 1980 compilation album」（第 845 條已覆核為未發行 take 的首發）。
- **錄音日錯 1 處**：《Swingin'》infobox 的 Five Spot 那晚記 August 26（jazzdisco 與 Discogs 皆 25）。
- **label 欄抄再發廠 1 處**：《Late Night Guitar》寫 Blue Note（原廠 Liberty）。
- **條目不存在 3 處**：`Mother Ship (Larry Young album)`、`On the Sunny Side (Jimmy Smith album)`、`Omega Alpha` **全部沒有條目**；`On the Sunny Side (album)` 與 `Live at Donte's` 是**消歧義頁**，`Congo Lament` **轉址到《Easy Living》**——**寫作層引用前一定要看轉到哪裡**（c-144 第 787 條 `Phantazia` 陷阱的第三、四例）。

**Discogs**：
- **年份群體偏移 1 處**：《Late Night Guitar》有三筆美國壓標 1981（Masterdisk 刻版），**其餘同號原壓全 1980**。
- **format 欄 0 錯**（本組 21 張逐張看過，**沒有一張被誤標 Compilation**——與 c-144《Hipnosis》那次相反）。

**紙本**（第 509c 條）：
- **Billboard 1981-02-21 把 LT 1088 印成「Blue Note L? 1088」、$7.98 印成「57 98」**（同一頁的 LT1089 也印成「57.98」）。
- **Billboard 1980-11-01 的 Liberty 廣告把 LT-1079 那格的廠牌字樣印成「L?AJ LMERTY」**；**1980-12-13 把 KLUGH 印成「KLLGH」**。
- **Billboard 1980-02-16／03-08／03-29 三期把 United Artists 印成「United Mists」**（連續三週同一錯）。
- **Cash Box 1980-12-27 把 Jackie McLean 印成「Jackie McLeon」**。

## 第 851 條（同批）：**店面與封面觀察（第 254 條，只寫觀察不寫結論）**

- **CAA 20/22 有圖**（退掉的《Omega Alpha》RG 層 1 圖也計入），**2 張 RG 層 HTTP 404、零圖**：**Ike Quebec《Congo Lament》、Donald Byrd《The Creeper》**（皆 `redirect: 'follow'` ＋重試三次確認）——**兩張都建議取 Discogs 美國原壓條目（3357862／1211006）**。
- **20 張有圖的裡面，15 張的來源是美國原壓、3 張是日本原壓**（Swingin' GXF 3070／Inner Glow GXF 3073 是首發；**Remembering GXK8167／Gooden's Corner GXK 8168 是 1981 年的換號再發，封面與腰帶可能與 GXF 首發不同**），
  **2 張不是原壓**：**《Infinity》→1998 年美國 CD**、**《Vertigo》→XW 數位版**。
- **Apple us `search` 一種查法 21 張命中 14 張。零命中 7 張**：**Kenny Burrell《Swingin'》／Bobby Hutcherson《Inner Glow》／Ike Quebec《Congo Lament》／Jean-Luc Ponty《Live at Donte's》／Grant Green《Remembering》／Jimmy Smith《On the Sunny Side》（只回一首 2012 年的同名單曲）／Art Pepper《Omega Alpha》（已退）**
  ——**零命中的七張裡有四張是日本盤或只發過一版的庫存盤**，與 a 組第 819 條的分布一致。
- **命中的 14 張裡，8 張軌數等於原盤**（Late Night Guitar 13／Thinking of Home 5／Mother Ship 5／Every Generation 8／Rollin' With Leo 8／Crazy for You 8／Infinity 5／The Creeper 7／Gooden's Corner 6／Africaine 6），
  **4 張回的是加了 bonus 的 CD 形**（Dance With Death 7／Patterns 7／Vertigo 11／Cool Blues 8），**1 張回的是兩張碟的合併版**（**《Medina》→「Medina & Spiral」11 軌**）。
- ⚠ **`releaseDate` 只有 2 張與紙本對得上**（第 484 條在本組再中一次）：**《Crazy for You》1981-12-01**（評介 1981-11-07，差一個月）與 **《Late Night Guitar》1980-01-01**（年頭佔位但年份對）。
  **其餘印的多半是錄音日**：Dance With Death 1968-10-11、Thinking of Home 1970-07-31、The Creeper 1967-10-05、Gooden's Corner 1961-12-23、Rollin' With Leo 1961-01-01、Cool Blues 1958-01-01、Vertigo 1963-01-01。
  **一張印錯年**：**《Africaine》1979-01-01**（實際 1981），**而且掛名印成 `Art Blakey` 不是團名**。
- **`genres` 分派**：**`['jazz']` 18 張**、**`['jazz','soul']` 3 張**（Earl Klugh 兩張、Ronnie Laws 一張）、**`['jazz','rock']` 0 張**
  ——**與 a 組第 823 條同一條界線**（錄音年代在 1968 年以前的庫存盤一律 `['jazz']`；1980–81 的 crossover 新作才加 `soul`；第 790 條的兩個破例條件本組一張都不符合）。

## 第 852 條（同批，**紙本沒有自抓**）：**a 組已掃的 1980–81 兩刊涵蓋 b 組全部 22 筆，本層逐項覆核後直接使用**

| 檔案 | 來源 | 實際涵蓋 | 誰掃的 |
|---|---|---|---|
| `batch-progress/enum/billboard-bn-1980-1981-ocr.txt`（19.7 MB） | Billboard | **1980-01-05 → 1981-12-26，103 期的命中頁** | **c-145 a** |
| `batch-progress/enum/cashbox-bn-1980-1981-ocr.txt`（11.4 MB） | Cash Box | **1980-01-05 → 1981-12-26，103 期的命中頁**（含補抓的 `CB-1980-09-05`） | **c-145 a** |

- **本層開工時先查 `SOURCES-billboard-cashbox.md`（當時尚無 1980 之後的列），再直接看 a 組 scratchpad 的 `np.py` 關鍵字表**——
  **實測 a 組的 `TITLES`／`NAMES` 兩張表已經把 b 組 22 筆的盤名（Swingin'／Inner Glow／Dance With Death／Patterns／Late Night Guitar／Thinking of Home／Vertigo／Cool Blues／Mother Ship／Every Generation／Rollin' With Leo／Medina／Crazy for You／Omega Alpha／Congo Lament／Infinity／On the Sunny Side／The Creeper／Live at Donte's／Remembering／Gooden's Corner／Africaine）與 16 位藝人全部列進去了**，
  **目錄號也有 `\bLT[\s\-\.]*(9\d\d|10\d\d|11\d\d)\b`／`GXF`／`GXK`／`GP` 四種通配**。
  → **`blue note` 也是通配關鍵字**，1980–81 兩刊任何提到 Blue Note 的頁都在檔內。**因此本層沒有重抓，省下 208 期的下載與 OCR。**
- **本層在歸檔後的兩個檔案上逐條複驗過所有引用**（`fourteen unreleased masters`、`THE BLUE NOTE RE ISSUE SERIES`、`QUEBEC, IKE Congo Lament LP Blue Note LT1089` 等）——**全部命中，與 scratchpad 版一致。**
- ⚠ **`SOURCES-billboard-cashbox.md` 的表在本層收工時仍寫「1980-01 之後還沒有人掃」**——**檔案已經在 `enum/` 裡了，表還沒更新**（a 組應會補）。**本層在表尾 append 了一段覆核說明，沒有動別人寫的段落。**
- ⚠ **給後批**：**1982-01 之後仍然沒有人掃**；1982 年起 Blue Note 幾乎停止新發（要到 1985 年重啟），**`cashbox-bn-1984-85-ocr.txt`（1984-09→1985-06，c-140 b 掃）接得上重啟那一段**，**中間 1982-01→1984-08 是空的。**

## 第 853 條（同批，**第 791 條在 1980–81 的續測**）：**庫存盤完全不進榜，進榜的全是同期新作——查榜順序仍是 Soul 先、Jazz 次、主榜也看**

| 盤 | Billboard Soul LPs | 爵士榜（BB／CB） | 主榜 Top LPs |
|---|---|---|---|
| **Ronnie Laws《Every Generation》(1980)** | **✓ 1980-02-16 進榜 → 最高 #3–4 區間（03-08 榜上第 3 格）** | **✓ Cash Box 爵士榜 1980-03-08 第 1 名**、BB 爵士榜前五 | **✓ 最高 #73（1980-04-19）** |
| **Earl Klugh《Late Night Guitar》(1980–81)** | **✓ SLP 40（1981-01-31）** | **✓ BB 爵士榜 #4–6（1981-01-31→02-14）**、CB 同步 | **✓ 最高 #122（1980-12-27）**，在榜到 1981-09 |
| **Earl Klugh《Crazy for You》(1981)** | **✓ SLP 22（1981-11-21）** | **✓ BB 爵士榜 #23→更高（1981-11-14）** | **✓ 最高 #98（1981-11-21）** |
| **其餘 18 張庫存盤** | — | — | — |

→ **判準（本條）**：**第 791 條「Soul 先、Jazz 次、主榜也看」在 1980–81 完全成立，三張同期新作全部三榜齊上**；
**但 Blue Note Classic 的庫存盤一張都沒進任何榜、也幾乎沒有評介**——
**1980 年那波還有廣告與評介（Dance With Death／Patterns／Thinking of Home／Mother Ship／Rollin' With Leo 五張），1981 年那波只剩 Billboard 的新片目錄頁（Africaine／Congo Lament 兩張），LT-1091 之後連目錄頁都沒有。**
→ **給後批：1981 年下半以後的 Blue Note 庫存盤，紙本查無是常態，不要因此懷疑年份**（第 704 條的反面用法）。

## 第 854 條（同批）：**`chk-prop` 抓不到的五組同名／同碟關係——第 611 條盲區在本批的樣本**

1. **《Infinity》↔ 池中 8 張同名盤**（Journey 1978、Fall Out Boy《Infinity on High》、Swans、King Gizzard《Nonagon Infinity》、Souls of Mischief《93 'til Infinity》、The Dillinger Escape Plan、Big Thief《Double Infinity》、落日飛車《Infinity Sunset》）——**掛名各異，跨批與線上池全部回 0。**
2. **《Swingin'》↔ 池中 9 張同型盤名**（Jackie McLean《Swing, Swang, Swingin'》、Dexter Gordon《A Swingin' Affair》、Sinatra 兩張、Sarah Vaughan、Dean Martin……）——同上。
3. **《Patterns》↔ Gil Mellé《Patterns in Jazz》（c-136）／Lightnin' Hopkins《Free Form Patterns》／Death《Individual Thought Patterns》**；**《The Creeper》↔ Lou Donaldson《Midnight Creeper》**；**《Vertigo》↔ Groove Armada 與 Bernard Herrmann 兩張**——**子字串關係，`chk-prop` 用的是完整鍵，不亮燈。**
4. **《Remembering》↔ 1998 年美國 CD 改名《Standards》**，而**池中 c-141 已有 `Lee Morgan —《Standards》(1998)`**——**日後若收 Grant Green 那張 CD，兩張會同名不同掛名**，**收的時候必須加消歧**（c-144 第 792 條第 2 點的同型預約）。
5. **《Live at Donte's》↔ Joe Pass 的同名現場盤**（維基該頁是消歧義頁；**jazzdisco 的 LT-1103 正是 Joe Pass《Joy Spring》，同一批 Pacific Jazz 舊母帶**）——**收 Pass 那張時盤名要加消歧。**
→ **五組都已寫進各卡 risk。**

## 第 855 條（同批，新立）：**「同一天」不等於「同一場」——用錄音日反查母帶的方法會出假陽性，必須連錄音室與編制一起核**

本層用 jazzdisco 的錄音日對全部五個系列頁做反查（1500／4000／BN-LA／LT／Toshiba-King），**22 個日期裡有兩個是假陽性**：

| 日期 | 本批的碟 | 反查也命中的碟 | 判定 |
|---|---|---|---|
| 1968-03-14 | Bobby Hutcherson《Patterns》（**Van Gelder, Englewood Cliffs**） | Chick Corea《Circling In》BN-LA472-H2（**A&R Studios, NYC**） | **假陽性**：同一天、兩個城市、兩組人 |
| 1975-03-24／25 | Bobby Hutcherson《Inner Glow》（**United Artists Studio, Los Angeles**） | Ronnie Foster《Cheshire Cat》BN-LA425-G（**A&R Studios, NYC**） | **假陽性**：同上 |

→ **判準**：**反查命中之後，一定要再核「錄音室 ＋ 至少一位共同樂手」**；
**只有日期相同就當同場，會把兩個城市的兩場寫成一場**——**這種錯寫進正文是最難事後發現的一種**（比年份錯難查）。
⚠ **反過來，真的同場的六組（第 845 條）每一組都通過了「同錄音室＋同班底＋take 號互補」三重核對。**

## 第 856 條（同批）：**三條交叉線——寫作層的互指清單**

1. **Bobby Hutcherson 三張是三個年代、三組人**：**《Patterns》（1968-03-14，Spaulding／Cowell／Workman／Chambers）／《Medina》（1969-08-11，Harold Land／Cowell／Reggie Johnson／Chambers）／《Inner Glow》（1975-03-24–25，Brashear／Thurman Green／Land／Dwight Dickenson／Kent Brinkley／Larry Hancock）**——
   **Stanley Cowell 與 Joe Chambers 串起前兩張、Harold Land 串起後兩張，但沒有一位貫穿三張。** 往前接 c-144 的《Waiting》《The View From the Inside》《Knucklebean》（第 794 條）與 c-143 的《Live at Montreux》。
2. **Billy Higgins 在本批出現三次**（《Dance With Death》1968／《Infinity》1965／——以及 a 組多張），**Lee Morgan 出現兩次**（《Infinity》領班／《Mother Ship》側手，相隔三年半），**Jackie McLean 出現兩次**（《Vertigo》領班／《Infinity》側手，相隔兩年九個月）——**三組都不得因為名字重複就寫成同一個班底。**
3. **Kenny Burrell 在本批出現兩次**（《Swingin'》領班／**《On the Sunny Side》四場全部是他彈吉他**）——**兩張卡的 1957–60 段幾乎是同一批棚內日子**，正文互指時要寫清楚哪一張是誰的名義。
**另外兩組跨組的**：**《Medina》↔ a 組《Spiral》**（1998 年 CD 合併，第 845 條）、**《Gooden's Corner》↔ a 組《Nigeria》《Oleo》**（Green／Clark 四重奏連錄三場，第 846 條已訂正 a 組把《Remembering》算進去的記述）。

## 第 857 條（同批）：**交件數字、中間檔、給後批**

- **交件 21 張、16 位；退 1**（第 841 條）；**年份改判 2**（第 846 條）、**維持 enum 值但附相反證據 2**（第 847 條）；`label` 改他廠 3（第 849 條）；
  **新掛名 0、群組收攏 1**（第 848 條）；**合輯 0、現場 2、庫存／延遲首發 17、同期新作 4**；**撞陳列 6 張**（第 845 條）；CAA 20/22、店面 14/21。
- `chk-prop b`：**21 張 16 位、標記 0**；跨批 109 批 4,492 張撞卡 0、同 rgMbid 不同掛名 0。
- `why` 均長 **547**／`risk` **980**／`mbNote` **996** 字元。
- 中間檔 `scratchpad/c145b/`：`mb-fetch.mjs`＋`mb.json`（22 個 RG 的 rg／rel／caa 回傳）、`mbsum.mjs`／`mbsum.txt`、
  `poolscan.mjs`／`poolscan.txt`／`poolrows.json`（實掃 **26,176 列**＝seed 16,450 ＋ 183 個卡單檔 ＋ 191 個 prop 檔）、
  `web/catalog-lt-series.txt`／`catalog-toshiba-king-series.txt`／`catalog-1500-series.txt`／`catalog-4000-series.txt`／`catalog-bn-la-series.txt`（**jazzdisco 五個系列全頁，第 845／855 條的逐軌比對就靠這五份**）、
  `dg.mjs`＋`discogs.json`（25 個 catno 反查）／`dgrel.mjs`＋`discogs-rel.json`（**21 個 release 的 notes 全文，第 841／842 條的判定來源**）、
  `wiki.mjs`＋`wiki.json`（43 查 35 中）、`apple.mjs`＋`apple.json`、`srch.py`／`s3.py`（**指向 a 組 1980–81 掃描檔的檢索工具**）、
  `b1.mjs`～`b5.mjs`（卡單產生，**每 5／5／5／3／3 張寫回磁碟一次**）。
- **給後批（1982 年以後與 King／BNJ 那一段）**：
  1. **第 842 條**：LT 系列**不是**整段 previously-unreleased，**逐張讀 Discogs release notes 與 jazzdisco 的 `originally released on…` 一行**。
  2. **第 843 條**：`LT-` 前綴不代表 Blue Note，**要看盤面有沒有「Blue Note CLASSIC」副標**。
  3. **第 846 條**：**`GXK-81xx` 釘在 RG 上的，一律先回查對應的 `GXF-30xx` 首發年**；MB 在這一段的 frd 系統性晚一到兩年。
  4. **第 845／855 條**：**庫存盤一律用錄音日＋take 號反查池中正盤，但要連錄音室與編制一起核**；撞到的寫進 `risk`，**不是退卡的理由**。
  5. **第 853 條**：1981 年下半以後的庫存盤**紙本查無是常態**。
  6. **紙本 1980–81 已入庫**（第 852 條，a 組掃），**1982-01→1984-08 仍是空的**。
  7. **本組已預約的互指**：`Grant Green —《Remembering》`↔`《Gooden's Corner》`↔ a 組《Nigeria》《Oleo》；
     `Bobby Hutcherson` 三張互指並往前接 c-144 三張；`Jimmy Smith —《On the Sunny Side》`↔ 池中 seed 五張（House Party／The Sermon!／Home Cookin'／Midnight Special／Back at the Chicken Shack）↔ a 組《Confirmation》；
     `Kenny Burrell —《Swingin'》`↔ 池中 c-136《Kenny Burrell》／c-137 兩張《Blue Lights》／c-138《On View at the Five Spot Cafe》；
     `Jackie McLean —《Vertigo》`↔ 池中 seed《New Soil》↔ c-144《The Jackie McLean Quintet》《Hipnosis》；
     `Bobby Hutcherson —《Medina》`↔ a 組《Spiral》；`Ike Quebec —《Congo Lament》`↔ 未收的《Easy Living》(BST 84103, 1987)；
     `Art Blakey and the Jazz Messengers —《Africaine》`↔ 池中 seed《The Big Beat》（〈Lester Left Town〉同曲不同錄音）；
     `Jean-Luc Ponty —《Live at Donte's》`↔ 未收的 Joe Pass《Live at Donte's》與 LT-1103《Joy Spring》。

## 第 858 條（同批，**回應 a 組第 814／817 條**）：**盤名大小寫兩則維持盤面式（池中 90:99 沒有多數）；`country` 逐張用 Discogs `catno=` 反查，本組 0 筆造假**

**一、盤名大小寫（執行第 814 條第 1 點、但第 3 點不套用）**
- **撇號已全部照第 814 條第 1 點改成 ASCII**：`Swingin'`／`Rollin' With Leo`／`Live at Donte's`／`Gooden's Corner` 四張，**MB 原題帶 U+2019 的兩張（Rollin’／Gooden’s）已改**。`chk-prop b` 標記 0。
- **但第 814 條第 3 點（介系詞小寫）不往這兩張套**：`Dance With Death`／`Rollin' With Leo` **維持大寫 With**。依據：
  **實測池中句中的 `with` 小寫 90 列、`With` 大寫 99 列——沒有多數**（`Cookin' with the Miles Davis Quintet`／`Thelonious Monk with John Coltrane` vs `Born to Be With You`／`A Date With…` 兩派並存）；
  第 814 條第 3 點成立是因為**池中已有 `With a Song in My Heart` 的同名卡**（第 666 條「同一個詞在同一張卡不能兩種寫法」），**本組這兩張池中沒有對應卡，就回到盤面與 MB**（MB／Discogs／盤面三邊都是大寫 With）。
  **維基的小寫寫法（`Dance with Death`／`Rollin' with Leo`）已進兩卡的 `queryAlias` 與 `risk`。可逆。**

**二、`country` 覆核（第 817 條的 b 組結果：0 筆造假）**
本組 21 張**逐張用 Discogs `catno=` 反查過首發號**，**每一個號都真的存在、國別也對得上**：
**JP 4 張**（GXF 3070／GXF 3073／GXF 3071／GXF 3058，四個號 Discogs 都回日本原壓，**且 GXF 3071／3058 的 1981 年 GXK 版另有獨立條目**）、
**US 17 張**（LT-1030／1038／1044／1045／1054／1076／1085／1086／1088／1089／1091／1092／1096／1102 ＋ Liberty LT-1079／LT-51113 ＋ United Artists LT-1001）。
→ **本組沒有出現第 817 條那種「MB 建出不存在的原盤」**；但**列舉檔的 `country`／`format`／`catno` 在三張上抄的是後來的 CD**（Late Night Guitar 抄 1999 US CD、Every Generation 抄 2005 GB CD、Crazy for You 抄 1995 NL CD，第 849 條），
**形狀不同但後果一樣——`country` 欄一律以「反查得到的首發號」為準，不以列舉檔為準。**
