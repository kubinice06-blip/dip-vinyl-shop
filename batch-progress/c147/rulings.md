# c-147 裁定（Blue Note §5.6 合輯正典回撈，16 張：a 組 8 ＋ b 組 8）

號段 **720–749**，一支代理跑完兩組，append。
上游：`batch-progress/enum/blue-note-comp.md`（687 個被 Compilation 濾網擋掉的 album RG 分 tier）
＋ `batch-progress/c141/rulings.md` 第 597 條（主線裁定：`canon` 17 收 11、`vault` 7 收 5、`unknown` 3 全退 → 切成 c-147 十六張）。

交件 `batch-progress/c147/prop-a.json`（8 筆）與 `prop-b.json`（6 筆），
`node batch-progress/c147/chk-prop.mjs a b` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／107 批 4,406 張、同 rgMbid 不同掛名 0；三筆舊帳是 c49b／cseab 的）。
14 筆的 `mbNote` 第一個 UUID 全數等於 slice 的 `rgMbid`，欄位鍵與 `c141/prop-b.json` 完全一致。

---

## 第 720 條（2026-09-16，c-147 策展層）：**16 筆覆核結果——實收 14、退 2；年份改判 2 張；與池中內容重疊的 10 張**

16 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，
再對每一張的原盤 release 打 `release/<id>?inc=recordings` 取**逐軌曲目**（這一批非取不可——判斷內容重疊只能靠軌名比對）。
另回問 **16 個對照組 RG 的曲目**（池中或後批的同素材碟）：Bechet BLP 7001／7007／7009／7025／1207、Clifford Brown BLP 1526／5047、
Miles BLP 5013／5022／5040、Milt Jackson BLP 5011、Navarro BLP 5004／1531、Moody BLP 5006、Hall BLP 5026、Hodes LP 7015、
Burrell BLP 1543／LT-1056／GXF 3070、Mobley BLP 1550／Straight No Filter／A Slice of the Top／Third Season／Far Away Lands／Curtain Call、
Jimmy Smith BLP 1551／1552／1563／LT-992／LT-1092／Six Views／TOCJ-1615、Corea Circulus／The Song of Singing。
MB 守 1 req/s、UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，503 退避重試（第 28 條）。

年份另核 **repo 內的同期紙本**（`billboard-bn-1955-57-ocr.txt`、`billboard-bn-1957-59`、`billboard-bn-1967-69`、
`billboard-bn-1968h2-1970`、`billboard-bn-1969h2-1971q1`、`cashbox-bn-1968-69`、`cashbox-bn-1969h2`）、
`jazzdisco-bn-1500.txt`、Discogs `database/search?catno=`（14 個目錄號，不帶 token，第 531 條）。

**實掃卡池**：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/*.json`（含 c143）＋ `batch-progress/c*/prop-*.json`，
掛名 18 個關鍵字子字串雙向（含群組／個人兩種寫法）、盤名 16 個關鍵字，再以**逐軌曲目**比對 16 個對照組。

| 結果 | 張數 |
|---|---:|
| 收（prop-a 8 ＋ prop-b 6） | **14** |
| 退 | **2** |
| 年份改判 | **2**（BLP 1509 1955→1956、BLP 1532 1956→1957） |
| 內容與池中既有卡重疊（至少一軌） | **10**（見第 729 條） |
| 內容與池中完全不重疊 | 4（Bechet BLP 7022、George Lewis BLP 1206、Turrentine BST 84286、Dexter Gordon BT 85135；另 Corea《Early Circle》與 Jimmy Smith《Cherokee》只與**後批**重疊） |
| slice 的 `rgMbid` 釘錯 | **0**（16/16 盤名＋掛名與 MB RG 逐字相符） |

**第 315 條對數：prop 14 ＋ 退表 2 ＝ 16。**

---

## 第 721 條（同日）：**列舉層的人工 inPool 核對三筆「機器誤判、實際仍缺」全部成立，但它只答對了「是不是同一張碟」，沒答「內容是不是已經在池裡」**

`blue-note-comp.md` 指出三筆 inPool 是誤判（Bechet BLP 7020 對到 BLP 1207、Miles BLP 1502 對到 10 吋 BLP 5022、Kenny Burrell Vol. 3 對到 BLP 1543）。
**本層實掃三筆全部成立**——那三張碟確實不在池中。

**但這一批真正的風險不是「撞卡」，是「撞陳列」**：

- Bechet **BLP 7020 的六軌，全部在**池中 seed《The Fabulous Sidney Bechet》(BLP 1207) 裡。
- Miles **BLP 1502 的十一軌，有九軌**在池中三張 10 吋（BLP 5013／5022／5040，c135）裡。
- Kenny Burrell Vol. 3 **七軌全部**在 1979／1980 兩張已發行的碟裡（見第 731 條，已退）。

**→ 立一條**：§5.6 這類「重組盤」的覆核，**`inPool` 與 `chk-prop` 都只答「碟」這一層，答不了「內容」這一層**；
**軌名比對是這條線的必要步驟，不是加分項**。本批 16 張全部做了逐軌比對，成本是 16 個對照組 RG 的額外 MB 回問（約 40 次請求）。

---

## 第 722 條（同日）：**`releaseType` 一律照 MB 原值，14 張裡 13 張 `Compilation`、1 張 `Soundtrack`；`Soundtrack` 不觸發 §5.6 例外閘**

依第 397 條與派工指示，**不改 MB 的判斷，只在 `risk` 與 `exceptionReason` 說明**。

- **13 張 `Compilation`**：`chk-prop` 的 §5.6 門檻（`exceptionReason` ≥12 字 ＋ ≥2 個 https 證據網址）**逐張填齊**。
  證據一律取「MB release-group 端點」＋「一個實體／紙本來源」（Discogs 原壓 release、worldradiohistory 的 Billboard／Cash Box PDF），
  **不用兩個 MB 網址湊數**。
- **1 張 `Soundtrack`**（Dexter Gordon《The Other Side of Round Midnight》）：`chk-prop` 只對 `Compilation` 開例外閘，
  非 `Compilation` 卻帶例外欄位反而會被標記（`非合輯卻帶例外欄位`）。**裁定：`releaseType: "Soundtrack"`、
  `exceptionReason` 與 `exceptionEvidenceUrls` 留空，判斷寫進 `risk`。** 這是這條線第一次出現 `Soundtrack` 值（先前 prop 只有 Album／EP／Compilation／Single），先例立在這裡。

⚠ **一張是 MB 純粹標錯**：Stanley Turrentine《The Look of Love》(BST 84286) 是 1968 年的全新錄音室專輯
（Cash Box 1968-08-03 評介：「Utilizing a string background for the first time... tackles 10 strong tunes」；
Billboard 1968-07-27 新片＋四星評介；1968-09-07→11-16 連續進爵士暢銷 LP 榜），
**`releaseType` 仍照 MB 寫 `Compilation`**、判斷寫在 `exceptionReason` 與 `risk`（第 613 條反例）。

---

## 第 723 條（同日）：**年份改判 ①——Milt Jackson BLP 1509 從 1955 改到 1956，靠 Billboard 的新片評介**

列舉檔與 MB `first-release-date` 都寫 1955。三個來源指 1956：

1. **Billboard 1956-05-12 新片評介（評分 74）**：「MILT JACKSON 74 (1-12\") Blue Note BLP 1509 ... **Basically this is a re-mastering of a 10-inch LP (BLP 5011)**, adding one number not previously released」——同期紙本，最上位。
2. **jazzdisco `jazzdisco-bn-1500.txt` 第 235 行**：「BLP 1509 Milt Jackson And The Thelonious Monk Quintet **1956**」。
3. Discogs master 366884：一筆標 1955、**三筆標 1957**、其餘 1960／1961／1962／1966 重壓——**原壓群兩個方向都錯**（第 550 條），這一項不採。

依「同期紙本 ＞ Discogs 原壓群 ＞ jazzdisco ＞ MB」取 **1956**。
⚠ 附帶收穫：那則評介**自己寫明本張是 BLP 5011 的 re-mastering**——池中 c135 就有 BLP 5011，這是第 729 條重疊表最硬的一條佐證。

---

## 第 724 條（同日）：**年份改判 ②——Fats Navarro BLP 1532 從 1956 改到 1957；同一則紙本又踩到第 509c 條（目錄號誤植）**

列舉檔與 MB 寫 1956。三個獨立來源指 1957：

1. **Billboard 1957-07-01 新片評介（評分 76）**：「THE FABULOUS FAT**F** NAVARRO, **VOL 2** 76 (1-12\") Blue Note **1531** ...
   Original takes previously released as singles, on launch LP **5004** ... **1503**, plus alternate takes never before released」。
2. **Discogs 美國原壓三筆**（3367715／16608174／21970591）**全部標 1957**（第 531 條：同一目錄號的美國原壓整群同年，是這條線最硬的一種舉證）。
3. jazzdisco 第 681 行：「BLP 1532 The Fabulous Fats Navarro Volume 2 **1957**」。

→ 取 **1957**，與池中 Volume 1（c136，1957）同年。

⚠ **那則評介的目錄號印錯**：盤名寫 Vol. 2、目錄號卻印 1531（＝Volume 1 的號）。
判定依據是**內文**：它說素材取自「LP 5004 ... 1503 plus alternate takes」——BLP 1503 是《The Amazing Bud Powell, Volume One》，
而 Bouncing with Bud／Dance of the Infidels／The Skunk／Boperation 正是 **BLP 1532** 的曲目、**不在** BLP 1531 上。
**第 509c 條的又一例：靠編制／軌數／曲目交叉定位，不要只信印出來的號碼。**

---

## 第 725 條（同日）：**George Lewis《Volume 2》的 catno 由 Discogs 補成 BLP 1206；Billboard 同時把盤名與目錄號配錯**

MB release c3ceb905 的 `label-info` 有「Blue Note Records」但 **`catalog-number` 是 null**，`country` 也空、`format` 只寫 Vinyl，
列舉檔的 `catno` 欄因此是空陣列。

補法：Discogs `artist=George+Lewis&label=Blue+Note` 一次列出整段 —— **master 708290 =《Volume 2》，美國原壓 2504129 與 24030488 皆 1955、12" Vinyl**，
其後 1957／1959／1962／1966 同號重壓，立體聲再發 BST 81206。→ **catno 寫 BLP 1206、載體寫 12" Vinyl、年份 1955**（與 MB 的 1955 相符）。

⚠ **Billboard 1957-07-29 的爵士新片列表印「Echoes of New Orleans — George Lewis and His New Orleans Stompers — BLUE NOTE 1206」**，
但《Echoes of New Orleans》在 Discogs 是 **10 吋 LP 7010（1951）**、BLP 1206 的盤名是《Volume 2》。
**這是第 509c 條「紙本會誤植」的第三例，而且這次錯的是盤名與目錄號的配對，不是單一數字**——年份仍以 Discogs 原壓群＋MB 為準，不動。

⚠ 另記：**Volume 1（BLP 1205）不在 `blue-note.json` 也不在 `blue-note-comp.json`**（MB 根本沒建），
所以池中永遠不會出現 Volume 1。整個 Blue Note 目錄裡，紐奧良復興的 George Lewis 只剩《Concert!》(BLP 1208／BST 81 208 K) 排在後面的批次。
**卡面與正文不得寫成「與 Volume 1 成對」。**

---

## 第 726 條（同日）：**掛名 ①——`George Lewis` 是第 307 條「合併」的現行案例，本批差一步就踩上去**

池中已有字串 **`George Lewis`**，指的是 **1952 年生的 AACM 長號手**（seed 兩張：《George Lewis》1978、《Homage to Charles Parker》1979）。
本批這一張是 **1900 年生的紐奧良單簧管手**，MB 的實體是 group `George Lewis and his New Orleans Stompers`（1cd545d6, type Group）。

**裁定：掛名照 MB 的 group 字串原樣寫 `George Lewis and his New Orleans Stompers`，不得簡化成 `George Lewis`。**
理由就是第 307 條：**分裂看得見、可事後合；合併看不見、不能事後拆**——一旦兩位不同的人共用 `George Lewis` 這個池中字串，
`chk-prop` 的折疊鍵是「掛名＋盤名」，盤名不同就不會亮燈，之後誰都查不出那五張碟分別屬於誰。

⚠ 連帶：Apple 也把兩位 George Lewis 拆在不同 `artistId`；本層查的 `id=1188956636` 只有 4 筆、不是本人，
`search` 命中的 1052131645／1052109938 才是紐奧良那位（1994 年的 CD 形，11／14 軌）。**這一條寫進該卡 risk，研究層別查錯人。**

---

## 第 727 條（同日）：**掛名 ②——`Edmond Hall / Art Hodes`：MB 的 artist-credit 有四個實體，本層裁掉後兩個**

MB RG 852fa255 的 artist-credit 串起來是
「**Edmond Hall / Art Hodes, Edmond Hall's Blue Note Jazzmen / Art Hodes's Blue Note Jazzmen**」（79 字），四個實體：

| # | 實體 | id | type |
|---:|---|---|---|
| 1 | Edmond Hall | d0025855 | Person（美國爵士單簧管手、樂團領班） |
| 2 | Art Hodes | 913e5c9f | Person |
| 3 | Edmond Hall’s Blue Note Jazzmen | 79debc6c | Group（名字含 U+2019） |
| 4 | Art Hodes's Blue Note Jazzmen | 65ed2531 | type **null** |

**第 3、4 個是第 1、2 位的樂團名再掛一次**，不是第三、第四位樂手——同一張碟的兩位領班被算了兩遍。
Billboard 1969-04-05 的評介與新片列表、Discogs 美國原壓 3599683 的掛名都印「**Edmond Hall / Art Hodes**」。

**裁定：卡面掛名取 `Edmond Hall / Art Hodes`**（MB credit 的前兩個實體、joinphrase 照 MB 的「 / 」），
四實體全串與逐軌 credit 寫進 `mbNote` 與 `risk`。
形狀與本批另一張雙掛名 `James Moody / George Wallington`（MB 就只有兩個實體，照抄）一致，兩張卡的掛名形式因此統一。

**這不是「改 MB 的判斷」**：取的是 MB 自己 credit 裡的前兩個實體，沒有新造任何字串、沒有合併任何人。
⚠ 池中現況：`Edmond Hall`（c135）、`Edmond Hall & Sidney De Paris`（c135）、`Art Hodes`（c135）三個字串，
上架後多一個 `Edmond Hall / Art Hodes`——**屬分裂不屬合併**，且兩位在 MB 各只有一個 Person 實體、池中無同字串他人。

---

## 第 728 條（同日）：**掛名 ③——Milt Jackson 的長串是盤名不是掛名；Hank Mobley Quintet 的群組掛名是第 611 條第一種盲區的活樣本**

**(a) Milt Jackson BLP 1509**：MB **release-group 層**的 artist-credit 是 `Milt Jackson`（2e38e1de Person），
**RG title** 才是那 101 字的長串「Milt Jackson With John Lewis, Percy Heath, Kenny Clarke, Lou Donaldson and the Thelonious Monk Quintet」。
轄下有三筆 release 把長串寫進 artist-credit（三種不同寫法），**那是盤面 credit**。
→ **掛名取 RG 層的 `Milt Jackson`**（＝池中四張的字串），長串留在 `album` 欄（MB RG title 原文），短寫法放 `queryAlias`。

**(b) Hank Mobley Quintet**（本批已退，見第 732 條，但掛名結論仍要留給後批）：
MB 的 artist-credit 是 group 實體 `Hank Mobley Quintet`（440b4265, type Group, US）。
池中 19 張 Mobley 卡**全部掛 `Hank Mobley`**，其中 c136 還有一張**盤名**就叫《Hank Mobley Quintet》(BLP 1550)。
**若照 MB 掛 `Hank Mobley Quintet`，`chk-prop` 的折疊鍵是 `hankmobleyquintet|thefeelinsgood`，
與池中的 `hankmobley|hankmobleyquintet` 折不到同一個鍵——標記 0、實際撞的是同一位樂手**。
這正是第 611 條第一種盲區（群組掛名 vs 個人掛名）的活樣本。
→ **給後批的結論：Blue Note 這條線上凡 MB 掛 `<人名> Quintet／Sextet／All Stars` 而池中已有該人單名字串的，一律照池中先例掛單名**（第 307 條），
MB 的 group credit 寫進 `risk`。

---

## 第 729 條（同日）：**本批的核心風險是「與池中重疊」——10 張重疊，逐張列出**

| # | 收的碟 | 重疊對象（池中／後批） | 重疊程度 |
|---:|---|---|---|
| 1 | Bechet **BLP 7020**《12 Years On Blue Note》 | **池中 seed** BLP 1207《The Fabulous Sidney Bechet》(c95) | **6/6 軌全在內**（Original Dixieland One Step／Blues My Naughty Sweetie／Changes Made／That's a Plenty／Ballin' the Jack／Avalon） |
| 2 | Clifford Brown **BLP 5032**《New Star on the Horizon》 | **池中 seed** BLP 1526《Memorial Album》 | **5/6 軌**（只有〈Brownie Eyes〉不在） |
| 3 | Miles **BLP 1501**《Volume 1》 | **池中 c135** BLP 5013《Young Man With a Horn》＋ BLP 5022《Miles Davis, Vol. 2》 | **12 軌裡 11 軌的曲目已在兩張 10 吋上**（差別在替代版） |
| 4 | Miles **BLP 1502**《Volume 2》 | **池中 c135** BLP 5040《Vol. 3》全部 ＋ BLP 5022 的〈I Waited for You〉＋ BLP 5013 的兩軌 | **11 軌裡 9 軌**（只有 Ray's Idea／Tempus Fugit 的替代版是新的） |
| 5 | Milt Jackson **BLP 1509** | **池中 c135** BLP 5011《Wizard of the Vibes》（8 軌全在內，Billboard 評介自己寫明是 re-mastering）＋ **池中 c135** Monk《Genius of Modern Music, Volume 2》（後半五軌同場） | **12 軌裡 8 軌** |
| 6 | Fats Navarro **BLP 1532**《Vol. 2》 | **池中 c135** BLP 5004（Lady Bird／Double Talk）＋ **池中 c136** BLP 1531（Bouncing With Bud 正／替鏡像）＋ **池中 seed** BLP 1503《The Amazing Bud Powell, Volume One》（Bouncing with Bud／Dance of the Infidels／The Skunk／Boperation 同場） | 曲目重疊約 9/11，**唯 Jahbero／Symphonette 兩首（各正＋替）是池中沒有的** |
| 7 | **B 6503**《The Beginning and End of Bop》 | **池中 c135** BLP 5006《James Moody and His Modernists》 | **10 軌裡 6 軌**（A 面 Moody 全部；B 面 Wallington 四軌是新的） |
| 8 | **B-6504**《Original Blue Note Jazz, Volume 1》 | **池中 c135** BLP 7007《Jamming in Jazz》（掛 `Edmond Hall & Sidney De Paris`） | **A 面五軌的四種曲目**（High Society／Blues at Blue Note／Night Shift Blues／Royal Garden Blues）；B 面 Hodes 四種曲目與池中 LP 7015／BLP 5026 **零重疊** |
| 9 | Chick Corea《Early Circle》 | **後批** BN-LA882-J2《Circulus》（1978，`blue-note.json`） | **1/10 軌**（〈Percussion Piece〉，兩邊都是 5:52，同一個錄音） |
| 10 | Jimmy Smith《Cherokee》 | **後批** LT-992《Confirmation》(1979)、LT-1092《On the Sunny Side》(1981) | **曲名 3/7 重複，演奏全部不同**（What Is This Thing Called Love 7:04 vs 15:13；Cherokee 5:00 vs 20:20；On the Sunny Side 5:13 vs 5:45） |

**零重疊的 4 張**：Bechet BLP 7022《Port of Harlem Six》、George Lewis BLP 1206《Volume 2》、
Turrentine BST 84286《The Look of Love》、Dexter Gordon BT 85135《The Other Side of Round Midnight》。

**收的理由（一致適用第 1–8 項）**：簡報第二節第 3 點——**MB 分別建了 RG 就各算一張，但 `risk` 要互指、正文不得寫成兩批不同的錄音**。
本批 10 張的 `risk` 全部照這個格式寫齊，並在需要的地方點名「哪幾軌不得寫成本張樂手的領班錄音」
（BLP 1509 的 Monk 五軌、BLP 1532 的 Bud Powell 四軌、B 6503 的 Moody 六軌）。

---

## 第 730 條（同日）：**退表（2 張）**

| # | slice | rgMbid | 理由分類 | 一句話 |
|---:|---|---|---|---|
| 1 | Kenny Burrell《Kenny Burrell, Vol. 3》(LP-1609／TOCJ-1609, 1996) | 6a3a8a1a-03fd-4701-82c3-d633c49bb069 | **vault 前提被推翻：不是「錄音首度問世」，是 1979／1980 兩張已發行盤的重新排列**（＋與後批兩張重複陳列） | 七軌**全部**與 GXF 3070《Swingin'》(1980) 五軌與 LT-1056／BLP 3052《K. B. Blues》(1979) 兩軌**長度相差 ≤1 秒**——見第 731 條 |
| 2 | Hank Mobley Quintet《The Feelin's Good》(MMBST-84401, 2013) | a0df561d-7eb2-4ce5-b839-6e46a7506578 | **vault 前提被推翻：六軌在 1989 年的《Straight No Filter》CD 已全部發行**＋**四軌是池中兩張正盤的同場同曲**（第 597 條退《Alternate Takes》的同一條判準） | 見第 732 條 |

**兩張都不是「撞卡」**（`chk-prop` 兩張都不會亮燈），**是「撞陳列」＋「首發前提不成立」**。

---

## 第 731 條（同日）：**退 ①——Kenny Burrell《Vol. 3》：TOCJ-1609 就是 GXF 3070 ＋ LT-1056 的兩軌，七軌長度逐軌相差 ≤1 秒**

`blue-note-comp.md` 的 tierWhy 寫「**用 1500 系列保留號 1609 首發 1957 未發表場次**」，第 597 條照收。
**本層實掃推翻這個前提。**

| TOCJ-1609《Kenny Burrell, Vol. 3》(1996) | 先前發行 | 長度對照 |
|---|---|---|
| My Heart Stood Still 5:14 | GXF 3070《Swingin'》(JP 1980) | 5:15 |
| I Never Knew 12:37 | 同上 | 12:37 |
| Beef Stew Blues 4:37 | 同上（題《Beef Blues Stew》） | 4:36 |
| If You Could See Me Now 5:30 | 同上 | 5:29 |
| Swingin' 9:55 | 同上 | 9:56 |
| K.B. Blues 6:22 | LT-1056／BLP 3052《K. B. Blues》(US 1979) | 6:21 |
| D.B. Blues 5:49 | 同上 | 5:48 |

（資料：MB RG 79c2a92e release fd0e65a9；MB RG 9de49a54 release 921ea852；本批 RG 6a3a8a1a release e587cc0f。）

**七軌沒有一軌是 1996 年首度問世**——這張是 1979／1980 兩張已發行盤的重新排列，換上一個沒用過的 1500 系列保留號。

**判準來源就是第 597 條自己寫的那一句**：「**vault 盤收「錄音首度問世」，不收「同一張碟的另一個 take 集」**」。
第 597 條依此退掉 Clifford Brown BST 84428 與 Bud Powell BST 84430 兩張《Alternate Takes》；
本張不符「首度問世」的程度比那兩張更徹底（那兩張至少是未發表的 take，本張連 take 都不是新的）。

⚠ **這不是推翻主線裁定，是訂正列舉層填錯的事實前提**（`tierWhy` 的「首發」二字沒有查過）。
依裁定權下放的三條判準：**有先例**（第 597 條的 vault 判準）、**可逆**（改的是 slice 的一筆，不是卡池結構）、**不卡線**（其餘 15 張照跑）。

⚠ **前瞻**：GXF 3070《Swingin'》(1980) 與 LT-1056《K. B. Blues》(1979) **兩張都在 `blue-note.json`、都還沒派卡**。
若照原案收 TOCJ-1609，池中最後會出現**三張碟裝同七次演奏**。派那兩張時要回頭看本條。

---

## 第 732 條（同日）：**退 ②——Hank Mobley Quintet《The Feelin's Good》：六軌在 1989 年的《Straight No Filter》CD 已經全發過，其中四軌還與池中兩張正盤同場同曲**

`blue-note-comp.md` 的 tierWhy 寫「2013 年 Music Matters 用未啟用的 BST 84401 號發行……**內容跨場次，要另議**」，第 597 條收。
**本層實掃推翻「首度問世」這個前提。**

MB RG 13330fed 的 **1989 年 CD 版《Straight No Filter》**（release f4353e36，9 軌）曲目為：
Straight No Filter / Chain Reaction / Soft Impressions / **Old Word, New Imports** / **Up a Step** / **The Feelin's Good** / **East of the Village** / **Yes Indeed** / **The Good Life**
——**MMBST-84401 的六軌（The Feelin's Good／Up A Step／The Good Life／East Of The Village／Yes Indeed／Old World, New Imports）全部在內**，早了 24 年。

再往前一層，**四軌的曲目本身就在池中**：

- 〈East of the Village〉〈The Good Life〉→ **池中 seed**《The Turnaround》(BLP 4186, 1965)。
- 〈Up a Step〉〈Old World, New Imports〉→ **池中 seed**《No Room for Squares》(BLP 4149, 1964)。

MB 把 MMBST-84401 的這幾軌建成**與正盤不同的 recording 實體**（＝不同 take），
所以這張的性質就是**「同一批場次的另一個 take 集」**——正是第 597 條明文不收的那一類（退 Clifford Brown BST 84428／Bud Powell BST 84430 的同一條判準）。

⚠ 掛名問題另見第 728 條 (b)：若收，MB 的 `Hank Mobley Quintet` 群組掛名會在 `chk-prop` 底下折不到池中的 `Hank Mobley`，
**標記 0 但實際撞的是同一位樂手的同一批錄音**——第 611 條第一種盲區。

⚠ **前瞻**：《Straight No Filter》(BST 84435, 1986)、《A Slice of the Top》(LT-995)、《Third Season》(LT-1081)、
《Far Away Lands》(BST 84425)、《Curtain Call》(TOCJ-1611) 都在 `blue-note.json` 排在後面的批次。
**派《Straight No Filter》時，注意它有 6 軌 LP 版（1986）與 9 軌 CD 版（1989）兩種內容**，正文不能混談。

---

## 第 733 條（同日）：**給後面批次的提醒（本批查出來、但這一批不處理的）**

1. **重複 RG 兩筆**（簡報第二節第 1 點的漏折形狀）：
   - Milt Jackson《Milt Jackson (1948)》catno `CDP 7 81509 2`、年份 1989（`blue-note.json`）＝**本批 BLP 1509 的 CD 版被另建成獨立 RG**，不是另一張碟。
   - Miles Davis《All Stars Vol. 1》(TYCJ-81008, 2013) 與 BLP 1501 是重複 RG，第 597 條已裁定併入 1501 **不另派卡**。
2. **Jazz Classics 6500 系列**本批只收 B 6503／B 6504；同系列 **B 6501《DeParis Dixie》、B 6502《The Funky Piano of Art Hodes》、
   B 6505《Edmond Hall — Celestial Express》、B 6506《Original Blue Note Jazz, Vol. 2》、B 6509《Classics Vol. 1》** 都在 `blue-note.json`。
   Billboard 1969-04-05 有一則廠牌自述的企劃報導把整批列名（B 6501／6502／6503／6504／6505），1969-12-20 與 1970-01-03 另有 B 6506／B 6509 的評介與新片列表
   ——**這一整段的年份紙本證據已經在 repo 裡（`billboard-bn-1967-69-ocr.txt` 與 `billboard-bn-1968h2-1970-ocr.txt`），後批直接 grep `650` 即可。**
   ⚠ B 6505 掛 `Edmond Hall`、B 6509 掛 `Baby Dodds/Art Hodes/Edmond Hall`，**派前一定要回頭比 B-6504 的曲目**。
3. **Sidney Bechet《Jazz Classic Volume 2》(BST 81202, 1968)** 在 `blue-note.json`，掛名 `Sidney Bechet with Bunk Johnson & Sidney De Paris`
   ——那是 1200 系列的立體聲再發，**可能與本批 BLP 7022 的 1939 年場次重疊**，派前要比曲目。
4. **Chick Corea《Circulus》(BN-LA882-J2, 1978)** 與本批《Early Circle》共用〈Percussion Piece〉（同一個錄音，5:52）。
5. **Jimmy Smith LT-992《Confirmation》(1979)、LT-1092《On the Sunny Side》(1981)、TOCJ-1610、TOCJ-1615《Lonesome Road》**
   與本批《Cherokee》是同一段 1957–58 母帶的不同切法；**曲名會重複、演奏不同**，派前要比長度不要只比曲名。
6. **紙本涵蓋缺口**：1986／1992／1996／2013 這四年這條線**完全沒有紙本**（`SOURCES-billboard-cashbox.md` 最晚到 1985-06），
   本批的四張 vault／後期盤年份只能靠 MB＋Discogs 原壓群。**1952–54 年的 Billboard 也還沒有人抓**（`billboard-bn-1955-57` 從 1955-10 起），
   所以 BLP 7020／7022／5032 三張的年份是 MB＋Discogs 兩個來源，沒有紙本第三腳。

---

## 第 734 條（同日）：**店面與 CAA 觀察彙總（第 254 條：只寫觀察不寫結論）**

兩種查法（`search` 盤名＋掛名；藝人目錄 `lookup?id=<artistId>&entity=album`）都跑了，**第三種查法（直查 collectionId）留給研究層**。

| 碟 | `search` | 藝人目錄 | CAA（RG 層） |
|---|---|---|---|
| Bechet BLP 7020 | us／tw 各 12 筆，無本盤 | 222462（197 筆）只命中 BLP 1207 | 4 圖，來源 7aec7494（原盤） |
| Bechet BLP 7022 | us／tw 各 2 筆，無本盤 | 222462 無命中 | **404** |
| Brown BLP 5032 | us 1 筆命中 1443004119（6 軌，1953-01-01） | — | 1 圖，來源 9e8b81ac（原盤） |
| Miles BLP 1501 | us 命中 1443224843（12 軌，1955-01-01）；tw 前 12 筆未見 | 44984（183 筆）命中同一筆 | 1 圖，來源 7acd38f4（原盤） |
| Milt Jackson BLP 1509 | us 命中 1469463699（**17 軌**，1952-01-01＝錄音年）；tw 另有 720109052（17 軌） | 50103（91 筆）命中同一筆 | 4 圖，來源 **b1ea560c（1989 CD）非原盤** |
| George Lewis BLP 1206 | us 7／tw 8 筆，命中 1052131645（**11 軌**，1994-04-07 CD 形） | 1188956636（4 筆）無命中（**不是本人**，第 726 條） | **404** |
| Miles BLP 1502 | us 命中 1443091489（11 軌，1956-02-01）；tw 前 12 筆未見 | 44984 命中同一筆 | 1 圖，來源 **a38a6afb（2013 數位）非原盤** |
| Navarro BLP 1532 | us／tw 各 2 筆，命中 1444089312（11 軌，1957-01-01） | — | 2 圖，來源 **d962edab（1989 CD）非原盤** |
| Turrentine BST 84286 | us 3／tw 11 筆，**同碟兩筆日期打架**（1435548295＝1968-05-06、1577475407＝1968-07-12，皆 10 軌） | — | 4 圖，來源 79bf6222（原盤） |
| B 6503 | us／tw **各 0 筆** | 57053（46 筆）無命中 | **404** |
| B-6504 | us 0／tw 2 筆（皆 2011 年合輯，非本盤） | 1581510（14 筆）、1579550（43 筆）皆無命中 | **404** |
| Dexter BT 85135 | us 5／tw 10 筆，命中 723722495（9 軌，**1985-01-01＝錄音年**，第 484 條） | — | 1 圖，來源 02016f5d（原盤） |
| Corea《Early Circle》 | us／tw 各 12 筆，**無本盤** | 117338（137 筆）無命中 | 1 圖，來源 95ba3c12（原盤） |
| Jimmy Smith《Cherokee》 | us 1 筆命中 1374684887（**7 軌、1996-11-27，與 MB 完全相同**） | — | 2 圖，來源 dee0ec63（原盤） |

**兩種查法都落空的四張**：Bechet BLP 7022、B 6503、B-6504、Corea《Early Circle》
——依第 254 條**只寫觀察**，`risk` 裡明文寫「不得升級成『未上架』『無來源狀態』『要掃圖』」。

**CAA 404 的四張**：Bechet BLP 7022、George Lewis BLP 1206、B 6503、B-6504；
**CAA 有圖但來源不是原盤的三張**：BLP 1509（1989 CD）、BLP 1502（2013 數位）、BLP 1532（1989 CD）
——七張的 `risk` 都寫了 Discogs 原壓條目號給研究層看版式。

---

## 第 735 條（同日）：**交件對數**

- `prop-a.json` **8 筆**（Bechet BLP 7020／7022、Brown BLP 5032、Miles BLP 1501、Milt Jackson BLP 1509、George Lewis BLP 1206、Miles BLP 1502、Navarro BLP 1532），6 位藝人。
- `prop-b.json` **6 筆**（Turrentine BST 84286、B 6503、B-6504、Dexter BT 85135、Corea CDP 7 84465 2、Jimmy Smith TOCJ-1612），6 位藝人。
- 退表 **2 筆**（第 730／731／732 條）。
- **8 ＋ 6 ＋ 2 ＝ 16**，與 `slice.json` 對齊（第 315 條）。
- `node batch-progress/c147/chk-prop.mjs a b` → **合計 14 張、12 位｜標記 0**。

## 第 736 條（主線 2026-09-16，研究層交件後）：**《Early Circle》退——vault 前提實查是 10/10 已發行過，不是 1/10**

研究層逐軌以**母帶號**比對後發現：Chick Corea《Early Circle》(CDP 7 84465 2, 1992) **十軌全部已發行過**
——前九軌在 **1975 年《Circling In》(BN-LA472-H2)** 上、逐軌長度差 ≤8 秒（同母帶），
第十軌〈Percussion Piece〉在 **1978 年《Circulus》** 上。**策展層第 729 條記的「1/10 軌」是錯的。**

**主線裁定：退卡。** 形狀與第 731 條退掉的 Kenny Burrell《Vol. 3》完全相同，
**第 597 條自己立的 vault 判準（收「錄音首度問世」、不收「同一張碟的另一個 take 集」）在這裡直接適用。**
⚠ 而且《Circling In》在 `blue-note-comp.json`、《Circulus》在 `blue-note.json`，**兩張都還沒派卡**
——**三張都上架的話，池中會有三張碟裝同一批 1970-08 的 Circle 錄音。**

**c-147 因此從 14 張變 13 張**（a 組 8、b 組 5）。已從 `prop-b.json`、`c147-cards.json`、
`desc-tools/batches/research/c147-b.json` 移除；`chk-prop a b` 重跑 13 張 11 位標記 0、
`qa-batch research c147` 重跑全部通過。

**通則（第 611 條家族再一種）**：**列舉層／策展層寫的「首發」「未發表」，在軌目層級查過之前都只是待證的宣稱。**
本批三張 vault 盤有兩張的首發前提不成立（Kenny Burrell Vol. 3、Early Circle），
**只有 Jimmy Smith《Cherokee》實查成立**（jazzdisco 顯示七軌的發行欄全部只標 TOCJ-1612）。

## 第 737 條（同日）：**B 6503 的軌數照 MB 的 10 軌；兩處編制訂正**

**B 6503 的軌數 MB 與 jazzdisco 差一軌**（jazzdisco 把 BN572-3〈Summertime〉也算進去＝11 軌，MB 只有 10 軌）
——**研究層裁定照 MB 寫、不點名〈Summertime〉，主線追認。**

⚠ **B-6504 的 A 面那場鋼琴是 James P. Johnson 不是 Art Hodes**（掛名照 MB 的 credit 不動，但正文要寫對）。
⚠ **Bechet BLP 7020 的六軌是 1951-11-05 同一場，不是「十二年的精選」**——卡單與策展層的敘述要改。
⚠ **Dexter Gordon《The Other Side of Round Midnight》九軌裡 Gordon 只出現在四軌**
（〈Call Sheet Blues〉是 Wayne Shorter，最後兩軌是 1986-02 Herbie Hancock＋Bobby McFerrin，**完全沒有 Gordon**）。

## 第 738 條（同日）：**與池中重疊的逐張結論——這批最重要的產出**

研究層**全部以母帶號（不是曲名）比對**，修正策展層第 729 條多處：

| 碟 | 重疊 |
|---|---|
| Bechet BLP 7020 | **對 1958 年 BLP 1207 原盤 LP 是 5/6**（BN421-1〈Changes Made〉不在），對 MB 所建的 2001 CD 才是 6/6 |
| Bechet BLP 7022 | **零重疊**；**不得寫成 Bechet 的領班盤**（1939 那場團名是 Port of Harlem Jazzmen） |
| Brown BLP 5032 | 5/6 與 seed《Memorial Album》(BLP 1526) 同母帶。**訂正：c-135 的《Clifford Brown Quartet》是 BLP 5047 不是 1526** |
| **Miles BLP 1501** | **12/12 曲名全在池中**（策展層寫 11）——**沒有一軌可寫成獨有** |
| Milt Jackson BLP 1509 | 前 8 軌＝c-135 BLP 5011 全部；**只有〈Evidence〉(BN328-0) 是池中沒有的** |
| George Lewis BLP 1206 | 零重疊；**掛名絕不可簡化成 `George Lewis`**；**不得寫成「與 Volume 1 成對」**（BLP 1205 MB 沒建） |
| **Miles BLP 1502** | **11/11 曲名全在池中**（策展層寫 9）。⚠ **盤名與 c-135 的《Miles Davis, Vol. 2》幾乎相同，店面上要靠年份與軌數區分** |
| Navarro BLP 1532 | **只有〈Jahbero〉〈Symphonette〉各正替共 4 軌是獨有**。⚠〈Bouncing with Bud〉池中加本張共三個 take 分裝三張碟 |
| Turrentine BST 84286 | 零重疊。⚠ 編曲：〈Blues for Stan〉〈Smile〉是 Thad Jones，其餘八軌是 Duke Pearson |
| B 6503 | **A 面六軌與 c-135 BLP 5006 完全同母帶**；B 面 Wallington 四軌（1954-05-12，Quincy Jones 編曲）才是獨有 |
| B-6504 | **A 面 5 軌中 4 軌與 c-135 BLP 7007 同母帶**，只有 BN901-2〈High Society (alt take 2)〉是新的 |
| Jimmy Smith《Cherokee》 | vault 前提成立。⚠ 前瞻：〈Somebody Loves Me〉(tk.10) 與**後批的 BLP 1563《Plays Pretty Just for You》同一天同一場**（1957-05-08），派那張時要回頭比 |

**寫作層的硬約束**：**上表標「全在池中」「同母帶」的軌目，一律不得寫成本張的獨有內容，
也不得寫成本張樂手的領班錄音。**

## 第 739 條（同日）：**年份與紙本——1952–54 的第三腳實查不存在**

策展層兩張改判**覆核全部成立**：Milt Jackson BLP 1509 **1956**
（**Billboard 1956-05-12 評介自己寫明「re-mastering of BLP 5011，加一首未發表的〈Evidence〉與三首替代 take」
——與逐軌比對的結果一字不差**）；Navarro BLP 1532 **1957**。

**唯一有疑議的是 Miles BLP 1501**：卡單 1955，但**唯一的同期紙本是 Billboard 1956-02-04 的評論欄**。
**仍取 1955**（MB 給的是帶月份的 1955-11、Discogs 原壓群＋jazzdisco 都 1955；
**同一爵士欄 1956-03 才評到 BLP 1201／1503，該欄在 1500 系列這段普遍延遲 2–3 個月**）。已標可逆。

⚠ **第 704 條要的「直接抓原始 PDF」已做**：研究層抓了 Billboard 1952-08→1953-03 與 1953-08→1954-04
**共 66 期原始 PDF 逐頁掃過**，**BLP 7020／7022／5032 零命中**——**1952–54 的紙本第三腳實查不存在**，不是沒去找。

## 第 740 條（同日）：**串流採信 6 張、查無 8 張；兩個候選逐軌核不過**

**採信**：Brown BLP 5032 `1443004119`／Miles V1 `1443224843`／Miles V2 `1443091489`／
Navarro BLP 1532 `1444089312`／Turrentine `1435548295`／Dexter `723722495`／Jimmy Smith `1374684887`。
**查無 8 張**（走固定無來源狀態）：Bechet 7020／7022、George Lewis 1206、Milt Jackson 1509、B 6503、B-6504
（＋已退的 Early Circle），**以及 Turrentine 的重複條目 `1577475407`——內容與 `1435548295` 完全相同，記為不得被別卡採用**。

**兩個候選逐軌核不過**（第 528／707 條的活樣本）：
Milt Jackson `1469463699` 是 1989 年 CD 的 17 軌（缺 BLP 1509 的 4 軌、多 9 軌，**且與池中 BLP 5011 撞陳列**）；
George Lewis `1052131645`（11 軌）是 1994 年按完整 Climax 場次重排的版本，**BLP 1206 的三軌反而在它的 Vol. 1 裡**。

**缺封面 4 張的替代圖全部查實可用**（Discogs 美國原壓）：Bechet 7022 → `release/4107676`（4 圖）；
George Lewis 1206 → `release/2504129`（4 圖）；B 6503 → `release/2040078`（6 圖）；B-6504 → `release/3599683`（7 圖）。
