# c-172 裁定（Blue Note 1985 年後線・**最後補遺**；a 組 **2 張**，1998／2004）

本批不是列舉檔切出來的，也不是藝人軸稽核找出來的，**是 `c-171` a／b 兩組跑完之後順手掃同藝人目錄掃到的線索**
（`batch-progress/c171/rulings.md` 第 2774 條表列第 1、2 兩筆）。**兩張各是一種列舉失效形狀，成因不同。**
判準沿用 `CURATION-BRIEF-bluenote-post1985.md`（含**附錄二：雲端線實測的查證路徑更正**）→ `CURATION-BRIEF-bluenote.md` 第〇節
→ `c131` → `c127` → `c126` → `c103plus` → `c93plus`，一字未改；外加 c-171 新立的 **第 2693 條（Discogs 覆核三關）**、
**第 2754 條（`labels` 與 `companies` 分開看）**、**第 2761／2769 條**。
**a 組 2 張，編號區間 3601–3640，本檔用到 3617。**

---

## 第 3601 條（**總表**）：**2 張＝收 2 ／ 退 0**

| | 張 |
|---|---:|
| `slice.json` `g: "a"` | **2** |
| **`prop-a.json` 收件** | **2** |
| **a 組退件** | **0** |
| **合計** | **2 收 ＋ 0 退 ＝ 2** ✔（第 315 條結算通過，見第 3615 條） |

**收件 2 張**（依 `prop-a.json` 順序＝slice 順序）：

| # | 卡 | 掛名來源 | 年份 | 列舉失效形狀 |
|---:|---|---|---:|---|
| 1 | **`Stefano Di Battista Quintet《A prima vista》`** | **MB 群組實體，本批新立** | **1998**（覆核成立） | **MB `primary-type` 欄未設**（第六種） |
| 2 | **`Stefano Di Battista《Parker's Mood》`** | 沿用池中既有字串 | **2004**（本層重新定年，結論同主線） | **enum 那一列 `year` 為 null，切批時掉出去** |

**2 張、2 個相異掛名字串**（無一重複）。**年份改判 0 筆、覆核成立 2 筆。** **退件 0 筆，因此本檔沒有退表。**
⚠ **兩張都不是「1985 前錄音的再發」**（簡報第一節第 1 點那個主要風險）：錄音年逐字 1998-08 與 2004-04，都在 1985 之後。

---

## 第 3602 條（**第 1 張的列舉失效形狀；覆核 c-171 第 2774 條的第 1 筆：成立**）：**`A prima vista` 的 MB RG `primary-type` 逐字 `null`，廠牌軸與藝人軸兩條路同時失效**

c-171 b 第 2774 條把這一筆列為「**第六種列舉失效形狀的候選**」。**本層逐欄複核，成立，而且比那條寫的更嚴重——兩條軸各自失效的原因還不一樣：**

| 軸 | 失效點（逐字） |
|---|---|
| **廠牌軸** | MB 唯一那筆 release `1eaa4e09` 的 `label-info` 逐字 **`[('EMI Music France', '7243 4 97945 2 8')]`**——**掛的是母公司，不是 Blue Note**。這是第 2487 條「掛錯層級」的形狀，**與同藝人 c-171 b《Round About Roma》（MB 掛 `EMI`）一模一樣**。`enum/blue-note.json` **1,812 列逐字 0 命中**，本層程式複核成立。 |
| **藝人軸** | RG `81f84659` 的 **`primary-type` 逐字 `null`、`primary-type-id` 逐字 `null`**（不是缺欄，是空值）——**`release-group?artist=<id>&type=album` 這種帶 `type` 過濾的 browse 一定漏掉它**。 |

**→ 兩條軸都建在 MB 上，兩個欄位各壞一個，這張碟因此對兩條軸同時隱形。**
**裁定：第 2774 條的「第六種形狀」判定成立，`prop-a.json` 照收。** 判準第 1 條（有先例：本線對 MB 欄位殘缺的碟一律照 Discogs 補齊後收）與第 3 條（卡住整條線）。

⚠ **順帶釘死 `releaseType` 怎麼寫**（避免下游重查）：**MB 沒設 `primary-type`，所以 `releaseType: "Album"` 是本層判的，不是抄 MB 的。**
依**第 1811-B 條的判準順序（零售條目的 `format` 欄 ＞ 總長）**：三筆 Discogs 條目的 `formats.descriptions` 逐字都含 `Album`、都不含 `EP`／`Single`，12 軌實算 **58 分 59 秒**。
**這一格可逆**——日後若 MB 把 `primary-type` 補上，下游照 MB 回填即可。

⚠ **給主線的一條推論**：**`primary-type` 未設這一格，`enum/blue-note.json` 那一支腳本與藝人軸稽核那一支都沒有防**。
**建議把「`primary-type` 為 null 的 RG」單獨掃一次**——它們既不會出現在 `type=album` 的 browse 裡，也不會被任何以 primary-type 分流的統計算到，**是一個系統性的盲區，不只這一張。**

---

## 第 3603 條（**第 2 張的列舉失效形狀；覆核 c-171 第 2774 條的第 2 筆：成立，並補上它沒查的根因**）：**`Parker's Mood` 的 `year` 為 null，根因是 MB 的 `first-release-date` 逐字是空字串**

c-171 b 第 2774 條寫「**不是列舉漏抓，是『`year` 為 null 的列在依年份排序切批時掉出去』**」，並建議主線查 enum 裡還有多少列 `year` 是 null。**本層兩件都做了：**

**（一）那一列的逐字**（`enum/blue-note.json`）：
```
{"artist": "Stefano Di Battista", "album": "Parker's Mood", "year": null,
 "rgMbid": "9069a449-c6d2-3d1d-8cde-e47a58829ab5", "country": "XE", "format": "CD",
 "live": false, "inPool": false, "period": "unknown", "genre": "jazz",
 "countries": ["XE"], "formats": ["CD"], "catno": ["8661712"], "nReleases": 1, "reissueSeries": []}
```

**（二）根因在 MB，不在腳本**：**RG `9069a449` 的 `first-release-date` 欄逐字是空字串 `""`**——不是缺欄、不是 null，是空值。
列舉腳本照抄成 `year: null`，`period` 因此判 `unknown`，**依年份排序切批時整筆掉出去**。**成因與第 3602 條那張是兩回事：那張是 `primary-type` 空，這張是 `first-release-date` 空。**

**（三）主線那句「整份 enum 裡 `year` 為 null 的只有兩列」：本層程式複核成立。** 掃 1,812 列，`year is None` 的**逐字只有兩列**：
本張，以及 `George Lewis and his New Orleans Stompers《Concert!》`（`rgMbid 9f3477cb`、DE、`12" Vinyl`、catno 逐字 `BST 81 208 K`、`period` 逐字 `unknown`）。
**後者是 1950 年代錄音的德版再發，屬 1985 前線，不收進本批**（派工信這一句正確）。

⚠ **但要給主線一句更重要的**：**`year` 為 null 只有兩列，不代表切批漏掉的只有兩張。**
**`period` 欄逐字 `unknown` 的列才是真正該掃的面**——本張與 George Lewis 那張的 `period` 都是 `unknown`，而 `period` 是由 `year` 推的。
**建議主線改掃 `period == "unknown"`，而不是只掃 `year == null`**；`first-release-date` 為空字串的 RG 在 MB 上不只兩個，只是其他的未必都掛得到 Blue Note 廠牌軸上。

---

## 第 3604 條（**掛名，兩張逐張判；本批最需要寫清楚的一條**）：**`Stefano Di Battista Quintet`（群組）與 `Stefano Di Battista`（個人）並存，不收攏**

派工信要求「**兩張的掛名判定請逐張寫進裁定**」。**兩張的結論相反，因為 MB 那一端是兩個不同的實體。**

| | **第 1 張《A prima vista》** | **第 2 張《Parker's Mood》** |
|---|---|---|
| **MB RG artist-credit** | **單一實體**、`name` 逐字 **`Stefano Di Battista Quintet`** | **單一實體**、`name` 逐字 **`Stefano Di Battista`** |
| **MB 實體** | **`88131738-b6e2-4434-874a-19b6da32ea77`**，`type` 逐字 **`Group`**、`country` 逐字 `IT`、sort-name 逐字 `Di Battista, Stefano Quintet` | **`f6c8ec20-2761-434d-a812-0a9385edc120`**，`type` 逐字 **`Person`**、`country` 逐字 `IT`、sort-name 逐字 `Di Battista, Stefano` |
| **Discogs `artists` 欄** | 三筆條目逐字全是 `Stefano Di Battista Quintet`（同團 1997 年《Volare》兩筆亦同） | 九筆條目逐字全是小寫 `Stefano di Battista` |
| **Apple `artistName`** | 逐字 `Stefano di Battista`（**不帶 Quintet**）／jp 逐字 `ステファノ・ディ・バティスタ` | 逐字 `Stefano di Battista` |
| **池中既有** | **四處逐字 0 張——本卡新立** | **3 張**：c-157《Stefano di Battista》(2000)／c-160《Trouble Shootin'》(2007)／**c-171 b《Round About Roma》(2002)** |
| **裁定** | **`Stefano Di Battista Quintet`** | **`Stefano Di Battista`**（沿用） |

**（甲）為什麼不把《A prima vista》收攏成 `Stefano Di Battista`：** `88131738`（Group）與 `f6c8ec20`（Person）**是 MB 的兩個實體**，
依**第 964／196／197 條**不同實體並存；**第 307 條防的是同一實體的多種寫法，本例不適用**。
**先例整齊**：c-171 a 第 2698 條（`Ron Carter` 與 `Ron Carter Trio` 並存）、第 2701 條（`Don Pullen` 與 `Don Pullen & The African-Brazilian Connection` 等五個字串並存）。

**（乙）為什麼《Parker's Mood》一定要沿用而不能新造：** 它的 RG credit 掛的**就是池中三張所掛的同一個實體 `f6c8ec20`**，
**這才是第 307 條的正例**（同一實體，沿用池中既有寫法）。Discogs 與 Apple 的小寫 `di` 是同一字串的大小寫差異，**不新造第三形**，小寫形進 `queryAlias`。

⚠ **本層自覺的取捨，寫明**：Apple 把《A prima vista》也掛成 `Stefano di Battista`（不帶 Quintet）。
**本層不採 Apple 這一邊**——理由是 **MB 與 Discogs 兩邊都逐字帶 Quintet，二比一**，且 MB 那一端是獨立的 Group 實體（有 type、有 country、有 sort-name），不是 credit 欄的別寫。
**這一格可逆**（改的是卡單的 `artist` 值），但**改了就必須連《Volare》(1997, Label Bleu) 那張日後若進池一起改**。

⚠ **`why` 的數字寫法**（第 409b／439 條）：**`Stefano Di Battista` 池中 漢字 0／羅馬字 0／英文字串 3，且 3 張全部在未上架批次、`seed_cards.json` 裡 0 張。**
⚠ **更正派工信一處**：派工信第三節寫「`Stefano Di Battista` 池中已有卡：c-160 的《Trouble Shootin'》、**c-169 b 的《Round About Roma》**」。
**《Round About Roma》在 `c-171` b，不是 c-169 b**（`batch-progress/c171/prop-b.json` 第 4 筆，c-171 第 2751／2755 條逐字在案）；**而且派工信漏了 c-157《Stefano di Battista》(2000)，實掃是 3 張不是 2 張。** 見第 3616 條。

---

## 第 3605 條（**年份，第 1 張**）：**`A prima vista` 1998，覆核成立；第 1800-B 條的兩種掃描都跑了**

| 掃描 | 結果 |
|---|---|
| **(甲) barcode 反查** `barcode=724349794528` | **回 2 筆**——⚠ **其中一筆的 `type` 欄逐字是 `master`**（見第 3607 條）。**真正的零售條目只有 Discogs 7095518**（France 1998、`Blue Note 7243 4 97945 2 8`） |
| **(乙) 全 release 掃描** `artist=Stefano Di Battista&release_title=A prima vista&per_page=50` | **回 4 筆**（3 release ＋ 1 master） |
| **(丙) `artist=` 單欄全掃** `artist=Stefano Di Battista&type=release&per_page=100` | **回 51 筆**（整份 Discogs 目錄）——**本碟只有三個實體版本**：7095518（France 1998 零售）、32254434（France **`released` 逐字 `1998-11-00`** 宣傳 CD-ROM）、17872195（Japan **`released` 逐字 `2001-03-24`**，`TOCJ-66022`） |
| **(丁) master 2029279 的 `versions`** | **逐字 3 筆**，與 (丙) 一致，**沒有更早的版本** |

**四層旁證**：錄音 **1998-08-27／28／29**（Discogs 7095518 notes 逐字 `Recorded at Gil Evans studio Amiens, France on August 27,28,29 1998`）；
MB RG `first-release-date` 逐字 `1998`；**Apple fr／it／jp 的 `releaseDate` 逐字 `1998-10-01T00:00:00Z`、`copyright` 逐字 `℗ 1998 Parlophone Music France`**；
en/fr 維基作品列表逐字 1998（fr.wikipedia 另逐字給出五重奏名單）。

⚠ **紙本這一層是空的**：`batch-progress/enum/billboard-bn-1998-ocr.txt.gz`、`billboard-bn-1999-ocr.txt.gz`、`cashbox-bn-1996-ocr.txt.gz` 逐字 grep `di battista`／`prima vista`，**各 0 命中**。
**這與簡報附錄二那條「`bluenote.com` 有沒有專頁，分界不是年代、是碟的出身地」同向**——本張是 Blue Note 法國支線的碟，美國紙本不報。
**依簡報第二節的階序，紙本不可得時改用 Discogs 原壓群（第 531 條）＋ 廠牌／權利人 ℗ 標示**，`yearVerified` 這一層要寫「Discogs 原壓群 ＋ Apple ℗ ＋ 錄音日」。
⚠ **`℗ 1998 Parlophone Music France` 只能當年份旁證，不能當廠牌依據**——Parlophone 是 2013 年之後才接手的權利人，1998 年那一刻的廠牌是 Blue Note／EMI France。

**裁定：`year: 1998`，不改判。** 判準第 1 條（有先例）與第 2 條（可逆）。

---

## 第 3606 條（**年份，第 2 張；派工信點名要重新定年的那一筆**）：**`Parker's Mood` 2004——本層重新定，結論與主線補的值相同；⚠ 但美版是 2005 年 1 月才上市**

派工信逐字：「⚠ **`Parker's Mood` 的 enum 那一列 `year` 是 null，2004 是主線從別處補的——請自己重新定年。**」**重新定完如下。**

**（一）第 1800-B 條的兩種掃描**

| 掃描 | 結果 |
|---|---|
| **(甲) barcode 反查** `barcode=724386617125`（MB 唯一有 barcode 的 release） | **回 1 筆**：歐版 11187856——**`year` 欄逐字 `0`、`released` 逐字 `None`**。**這一種查法在本張等於白跑。** |
| **(乙) 全 release 掃描** `artist=Stefano Di Battista&release_title=Parker's Mood&per_page=50` | **回 10 筆**（9 release ＋ 1 master 749899） |
| **(丙) `artist=` 單欄全掃** | 51 筆，與 (乙) 一致 |
| **(丁) master 749899 的 `versions`** | **逐字 9 筆**：US 1033040／16104344（俱樂部版）／26272526（Advance 宣傳）／30961297（宣傳）、**Japan 34074079（`released` 逐字 `2004-11-17`）**、Europe 11187856／6222692（**兩筆 `released` 皆逐字 `None`**）、Russia 14808534／6922184 |

**→ 九個版本裡有日期的全部是 2004，沒有一筆早於 2004。**

**（二）四層互證，取 2004**

1. **錄音 2004-04-10／11／12**、混音 2004-05-09／10／27、母帶 2004-05-28（Discogs 1033040 notes 逐字）——**物理上不可能早於 2004。**
2. **Apple fr `collectionId` 696450658 的 `releaseDate` 逐字 `2004-09-17T07:00:00Z`、`copyright` 逐字 `℗ 2004 Parlophone Music France`。**
3. **日版 TOCJ-66248 的 `released` 逐字 `2004-11-17`。**
4. en/fr 維基作品列表逐字 2004（fr.wikipedia 逐字 `album hommage à Charlie Parker, un demi-siècle après sa disparition`）。

**首發地是法國（2004-09-17），`year` 取首發地首發年 **2004**（第 817 條）。**

**（三）⚠ ⚠ 本層查到、主線沒有的那一層：美版是 2005 年 1 月 25 日才上市**

`batch-progress/enum/billboard-bn-2005-ocr.txt.gz`（**Billboard 2005-01-29 第 33 頁 Essential Reviews**）逐字：
> `STEFANO DI BATTISTA Parker's Mood PRODUCER: Yves Chamberland Blue Note 7243 8 66740 **RELEASE DATE: Jan. 25**`
> （評介逐字另有 `Alto sax man Stefano di Battista may have grown up in Rome, but like many alto players, his heart is fixed on Charlie "Bird" Parker`）

**Discogs 把美版四筆全標成 2004，那是盤面 ℗© 年，不是上市日**——**第 550／570／708 條的典型**。
⚠ **`batch-progress/enum/billboard-bn-2004-ocr.txt.gz` 逐字 grep `di battista`／`parker's mood` 0 命中**，2004 年那一側的紙本是空的（碟是法國先出的，美國紙本要等到 2005 才報）。

**裁定：`year: 2004`（首發地法國），不改判；美版 2005-01-25 寫進 `risk`。**
⚠ **正文不得寫成「2004 年美日歐同步發行」，也不得把美版寫成 2004 年上市。**
判準第 1 條（有先例：c-171 a 第 3088 條《Cruisin'》同一形狀——日版先出、美版晚大半年，`year` 取首發地）與第 3 條。

---

## 第 3607 條（**⚠ 方法論；本批唯一一次真正踩到的坑，補第 1824-B 條**）：**Discogs `search` 回的結果裡混著 `type: "master"`，照 `releases/<id>` 打下去會抓到完全不相干的另一張碟**

第 1824-B 條要求「**判『是不是 Blue Note 家族』要打 `releases/<id>`，把 `labels` 與 `companies` 分開看**」。**這條規則本身正確，但它漏講了一步：先看 `type` 欄。**

**本層實跑的逐字**：`barcode=724349794528` 回 2 筆——

| id | `type` 欄逐字 | `master_id` | 打 `api.discogs.com/releases/<id>` 回什麼 |
|---|---|---|---|
| **7095518** | **`release`** | 2029279 | ✔ `A Prima Vista`／France 1998／`labels` 逐字 `[('Blue Note','7243 4 97945 2 8','Label')]` |
| **2029279** | **`master`** | 2029279 | ✘ **`Timeless`／`John Abercrombie`・`Jan Hammer`・`Jack DeJohnette`／Germany／`labels` 逐字 `[('ECM Records','ECM 1047'),('ECM Records','829 114-2')]`／barcode 逐字 `042282911421`** |

**→ master id 與 release id 在 Discogs 是兩個互不相干的號碼空間，同一個數字在兩邊都合法。**
**`search` 的摘要欄（`title`／`label`／`catno`／`barcode`）在 master 那一筆上顯示的是本碟的資料，所以光看摘要完全看不出來；一打 `releases/<id>` 就換成另一張碟，而且它一樣會回 200。**

⚠ **這個坑比 c-171 第 2692 條那個「引錯碟」更難防**：那一筆靠第 2693 條的第三關（盤名）擋得住，
**本筆的盤名、掛名、廠牌、目錄號、barcode 在 `search` 摘要上全部正確，三關全過**——**只有 `type` 欄看得出來。**

**裁定（新增，補在第 1824-B 條之後）：**
1. **對 `search` 的每一筆結果，先讀 `type` 欄；只對 `type == "release"` 的打 `api.discogs.com/releases/<id>`。**
2. **`type == "master"` 的要改打 `api.discogs.com/masters/<id>` 與 `/masters/<id>/versions`**——**後者是這一批最有用的一支端點**：本層兩張各跑一次，一次回 3 筆、一次回 9 筆，**把 `artist`＋`release_title` 兩欄查漏掉的版本一次補齊，而且每一筆都直接帶 `released`／`country`／`catno`**。
3. **計算「Discogs 有幾筆條目」時，master 不計入實體版本數。**（本批：《A prima vista》**3 筆實體條目**不是 4 筆；《Parker's Mood》**9 筆實體條目**不是 10 筆。）

判準第 3 條（卡住整條線：不先分 type，家族判定與年份判定都會抓到別張碟）。**⚠ 建議主線把 `/masters/<id>/versions` 列為第 1800-B 條的第三種掃描。**

---

## 第 3608 條（**逐張覆核「這張是 Blue Note 家族」；派工信點名要做的**）：**2 張全部成立，但兩張的證據層次不同**

方法照 c-171 第 2754 條：**凡 `search` 的 `label` 陣列出現 Blue Note，一律再打 `api.discogs.com/releases/<id>`，把 `labels`（entity_type_name 逐字 `Label`）與 `companies`（帶 role）分開看，且只認 `labels` 的第一格**；
外加本層第 3607 條的前置步驟（先分 `type`）。

### 第 1 張《A prima vista》：✔ 成立，**但 MB 那一端掛的是母公司**

| 層 | 逐字 |
|---|---|
| Discogs **7095518**（France 1998 零售） | **`labels` 只有一格：`('Blue Note', '7243 4 97945 2 8', 'Label')`** |
| Discogs **17872195**（Japan 2001-03-24） | **`labels` 只有一格：`('Blue Note', 'TOCJ-66022', 'Label')`** |
| Discogs **32254434**（France 1998-11 宣傳 CD-ROM） | **`labels` 只有一格：`('Blue Note', 'none', 'Label')`** |
| **`companies` 欄（三筆合併，全部排掉）** | `EMI Music France`（Phonographic Copyright (p)／Copyright (c)）、`EMI Music`（Distributed By）、**`Studio Gil Evans`（Recorded At ＝錄音室）**、`Dyam Music S.A.`（Mastered At）、`Toshiba EMI Ltd`（Manufactured By） |
| ⚠ **MB 那一端** | release `1eaa4e09` 的 `label-info` 逐字 **`[('EMI Music France', '7243 4 97945 2 8')]`**——**不是 Blue Note**（第 2487 條型） |

⚠ **`search` 的 `label` 陣列逐字是 `['Blue Note', 'EMI Music France', 'EMI Music France', 'EMI Music', 'Studio Gil Evans', 'Dyam Music S.A.']`**——
**六格裡只有第一格是廠牌，其餘五格全是 company。** **這正是 c-171 第 2754 條末段那個 25% 命中率的形狀，本批第 1 張又中一次。**

### 第 2 張《Parker's Mood》：✔ 成立，**而且 MB 這一次掛對了**

| 層 | 逐字 |
|---|---|
| Discogs **1033040**（US 零售） | **`labels` 只有一格：`('Blue Note', '7243 8 66740 2 9', 'Label')`** |
| Discogs **34074079**（Japan 2004-11-17） | **`labels` 只有一格：`('Blue Note', 'TOCJ-66248', 'Label')`** |
| Discogs **11187856**（Europe 限定版 12 軌） | `labels` 兩格、**兩格都是 `Blue Note`**（`8661712` 與 `724386617125`） |
| Discogs **6222692**（Europe 10 軌） | **`labels` 只有一格：`('Blue Note', '8661852', 'Label')`** |
| Discogs 16104344／26272526／30961297（俱樂部版與兩款宣傳） | `labels` 第一格逐字皆 `Blue Note` |
| **MB** | release `3c5ef34e` 的 `label-info` 逐字 **`[('Blue Note', '8661712')]`** ✔ |
| **`companies` 欄（全部排掉）** | **`Officine Meccaniche`（Recorded At ＝米蘭錄音室）**、`Studio Davout`（Mixed At）、`Marwan Manley Mastering`（Mastered At）、`Mediamotion`（Pressed By）、`EMI Music France`（℗©）、`Capitol`／`Toshiba EMI Ltd`（Manufactured By）、`BMG Direct`（俱樂部版） |
| ⚠ **兩筆俄版不採信** | 14808534（`labels` 逐字 `Par Media Music`）、6922184（`format` 逐字帶 `Unofficial Release`） |

### 兩張共通的排除檢查

- **`Blue Note Compagnie`（`BNS-` 目錄號）：兩張各 0 命中。**
- **`Blue Note Digital`（MB label `0293ae5c`、barcode 810211 段）：兩張各 0 命中。**
- **演出場地字樣（`club`／`cafe`／`jazz club`／`<城市名> Blue Note`，第 2490／2752 條）：兩張各 0 命中。**
  ⚠ **本批 `companies` 欄裡的 `Recorded At` 全部是錄音室（Gil Evans studio、Officine Meccaniche），不是俱樂部**——**形狀與 c-171 b 第 2752 條的 `The Blue Note Tokyo` 相同，但這一次不會誤判成廠牌，因為兩張的 `labels` 欄本來就只有 Blue Note 一格。**

**裁定：兩張的 Blue Note 家族閘皆過。**

---

## 第 3609 條（**形態閘；判準順序照第 1811-B 條：零售條目的 `format` 欄 ＞ 總長**）：**2 張全過，0 退**

| 卡 | 零售 `formats.descriptions` 逐字 | 軌數 | 實算總長 | 判 |
|---|---|---:|---:|---|
| **A prima vista** | `['Album']`（三筆條目皆然；宣傳盤另帶 `CD-ROM`／`Promo`） | 12 | **58:59** | **Album** |
| **Parker's Mood** | `['Album']`（九筆條目皆然） | **10（美／歐 8661852）／12（日版與歐限定版）** | **51:36 ／ 65:04** | **Album** |

**兩張的 `format` 欄都不含 `EP`／`Single`，總長全部 ≥51 分鐘。本批不需要動用判準順序。**
⚠ **數軌數前先濾掉 `position` 為空的標題列**（簡報附錄二第 3 點），本層兩張都照辦，濾掉 0 列。
⚠ ⚠ **《Parker's Mood》的軌數分歧要寫給下游**：**美版與歐版 `8661852` 是 10 軌；日版 `TOCJ-66248` 與歐洲限定版 `8661712` 是 12 軌**（多〈Love for Sale〉6:21 與〈April in Paris〉7:07）。
**MB 兩筆 release 剛好一筆一形**（`31b8516a` 10 軌、`3c5ef34e` 12 軌）。**試聽比對與封面挑版都要先辨版。**
⚠ **`A prima vista` 的 `releaseType` 是本層判的不是抄 MB**，理由見第 3602 條末段。

---

## 第 3610 條（**合輯閘與現場閘**）：**合輯 0 張、現場 0 張；⚠ 但《Parker's Mood》的形狀必須細判過才能說它不是合輯**

### （一）合輯閘

**兩張的 MB `secondary-types` 逐字都是空陣列；十二筆 Discogs 條目的 `formats.descriptions` 無一含 `Compilation`／`Sampler`。**
**盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的：0 張。**

⚠ **《Parker's Mood》形狀可疑，細判如下**：**十軌全部是別人的曲目**（Parker 原創與他留下印記的標準曲，結在 Monk 的〈'Round Midnight〉）。
**判 Album，不是合輯。** 理由：**Discogs 1033040 notes 逐字 `Recorded at Studio Officine Meccaniche, Milano, Italia on April 10-12, 2004.`——十軌是同一次三日錄音的新錄音**，
整筆 `extraartists` 逐字是同一組人（Di Battista as/ss、Kenny Barron p〔1 to 7, 9, 10〕、Bonaccorso b、Herlin Riley d、Flavio Boltro tp〔1, 3, 5, 8〕、Yves Chamberland producer）。
**先例（判準第 1 條）：c-171 b 第 2761 條的 `Gonzalo Rubalcaba《The Trio》`（七軌全標準曲）判 Album，逐字理由「重訪曲庫是企劃方向，不是把舊錄音集合起來」——本張同族。**
⚠ ⚠ **正文不得寫成「收錄 Charlie Parker 的經典錄音」——Parker 本人一個音都沒有出現在這張碟上。**

《A prima vista》十二軌裡**十一軌是團員原創**（Di Battista 7／Bonaccorso 2／Legnini 1／Boltro 1），只有〈Lush Life〉是 Billy Strayhorn 的曲，**更沒有合輯疑慮。**

### （二）現場閘

⚠ **`c172/slice.json` 的 `live` 欄兩張都逐字是 `null`——那是「沒查」不是 `false`**（派工信明講，本層複核成立，**與 c-171 第 2762 條記的「稽核層填預設值 `false`」是不同的形狀，要分開記**）。
**本層實查：兩張都不是現場盤。** MB `secondary-types` 皆空；錄音地點逐字都是錄音室（**Gil Evans studio, Amiens** ／ **Studio Officine Meccaniche, Milano**）。
**`releaseType` 兩張都寫 `Album`。**

---

## 第 3611 條（**盤名字形，兩張都有歧形**）：**一律取 MB RG 的 `title` 原樣，其他形進 `queryAlias`**（與第 2708／2766 條同判）

| 卡 | **MB RG `title` 逐字（採用）** | 其他形逐字 | 取捨 |
|---|---|---|---|
| **A prima vista** | **`A prima vista`（小寫 p、小寫 v）** | Discogs 三筆與 Apple 逐字 `A Prima Vista`（首字母全大寫） | **取 MB。** 大小寫差異不新造字串；slice 本來就寫 MB 形，一致 |
| **Parker's Mood** | **`Parker's Mood`（ASCII U+0027 直撇號）** | **`c172/slice.json` 與派工信逐字 `Parker’s Mood`（U+2019 彎撇號）** | **取 MB 的 ASCII 形，四比一** |

⚠ **《Parker's Mood》這一格要講清楚，因為它與 slice 不一致**：
**`enum/blue-note.json` 那一列的 `album` 欄逐字是 ASCII 撇號**、**MB RG title 逐字 ASCII**、**Discogs 九筆條目逐字 ASCII**、**Billboard 2005-01-29 紙本逐字 ASCII**；
**只有 `c172/slice.json` 與派工信是 U+2019——那一形是切批時引進的，不是任何一個來源的原字。**
**裁定：`album` 欄寫 ASCII 形，U+2019 形進 `queryAlias`。**
⚠ **這個差異不影響任何比對與結算**：`chk-prop.mjs` 的 `k()` 逐字 `.replace(/[^\p{L}\p{N}]+/gu,'')` 會把兩種撇號都剝掉，**兩形同鍵 `parkersmood`**；第 315 條是按列數結算，不按字串。

⚠ **非 ASCII 連字號（`‐ ‑ ‒ – — ― －`）與 U+30FC 誤用**：兩張的 `artist` 與 `album` 逐字掃過，**各 0 命中**，`chk-prop` 的四道字形檢查亦 0。

⚠ **同名軌（給下游）**：《Parker's Mood》第 4 軌的曲名逐字就叫〈Parker's Mood〉，**與盤名同字**。
**`selfTitled` 仍寫 `false`**——該欄的定義是「團名／人名與盤名同字」，本張不是；**但下游任何「盤名 → 軌」的比對在這一筆上會與盤名同值，要寫進 risk**（已寫）。

---

## 第 3612 條（**卡池實掃：方法、比對面與第 611 條五種盲區**）：**兩張四處皆 0，真同碟 0 筆**

**比對面**：`seed_cards.json`（**唯讀**）＋ `desc-tools/batches/cards/*.json`（全部）＋ `batch-progress/c*/prop-*.json`（全部）＋ `batch-progress/c*/slice.json`（全部）＋ `cand-*.json`，
**合計 35,387 列**（比 c-171 的 30,184 列多，因為 c-168～c-171 的卡單與 prop 已經進來了）。
**正規化直接抄 `chk-prop.mjs` 的 `k()`**（第 1823-B 條）：逐字 `s.toLowerCase().replace(/[&＆]/g,'and').replace(/[^\p{L}\p{N}]+/gu,'')`，**未自寫第二套**。
**判「已收」一律比對 `album` 欄逐字（第 1819-B 條），全程未用 grep 認定任何一筆。**

| 卡 | 複合鍵（掛名＋盤名）命中 | **盤名逐字命中** | 真同碟 |
|---|---:|---:|---:|
| `Stefano Di Battista Quintet《A prima vista》` | 1（**本批自己的 slice 那一列**） | **1**（同上） | **0** |
| `Stefano Di Battista《Parker's Mood》` | 1（**本批自己的 slice 那一列**） | **1**（同上） | **0** |

⚠ **本批是本線少見的「盤名假陽性 0 次」**（c-171 a 是 19 次、b 組 26 次、c-170 全批 7 次）——
**原因是兩個盤名都不是通名**：`A prima vista` 是義大利文成語、`Parker's Mood` 帶所有格專名。**不是查得不夠，是本批運氣好。**

**第 611 條五種盲區逐一掃過**：

| 盲區 | 本批結果 |
|---|---|
| 一、**群組掛名 vs 個人掛名** | ⚠ **本批就是這個形狀，但不構成撞卡**：`Stefano Di Battista Quintet`（本卡新立）vs `Stefano Di Battista`（池中 3 張）——**逐筆展開比對，三張的盤名是《Stefano di Battista》(2000)／《Trouble Shootin'》(2007)／《Round About Roma》(2002)，與本批兩張各 0 筆撞卡**。程式另掃「掛名含 `dibattista`（正規化後）」的所有字串，**四處逐字只有這兩種**。 |
| 二、同名但不同盤的 Volume 碟 | **本批 0 張帶 Vol./Part 尾綴。** |
| 三、**MB 把同一張碟建成兩個 RG** | **掃過，0 筆。** 兩張各打一次 `release-group?query=artist:"<掛名>" AND releasegroup:"<盤名>"`，**count 皆 1**。⚠ **另外用 Discogs master 的 `versions` 交叉核過**（3 筆／9 筆），**沒有任何一個版本指向第二個 RG**。 |
| 四、斜線掛名 | **掃過，0 筆。** 四處含 `Stefano Di Battista` 的斜線／逗號聯名字串（`Stefano Di Battista / Jacky Terrasson / Elvin Jones / Rosario Bonaccorso` 等，Discogs 上的 2000 年同名盤）**在池中一筆都沒有**（c-157 的卡單已折成 `Stefano Di Battista`）。 |
| 五、同名但不同盤 | **掃過，命中 0 筆。** |

⚠ **`&`／`and` 分裂（第 2695 條那個成因）本批不可能發生**：兩個盤名與兩個掛名**都不含 `&`／`and`／`/`／`+`**。
⚠ **`chk-prop` 第五道（盤名逐字撞 apex 王牌、掛名不同，report-only）本批 0 處**（見第 3615 條的實跑貼字）。

---

## 第 3613 條（**派工信第五節交辦的順查；⚠ 本條推翻主線的判斷**）：**`Kevin Eubanks《Spirit Talk》`(1993) 在 MB 裡，MBID `b2295ebc-2cf2-4022-9c77-c5200c990ecd`——主線判的「第七種形狀：碟根本不在 MB 裡」不成立**

派工信逐字：「主線判這是**列舉失效的第七種形狀：碟根本不在 MB 裡，所以廠牌軸與藝人軸（兩者都建在 MB 上）都找不到它**。**請覆核這個判斷**（MB 真的沒有嗎？換幾種拼法與端點試）。」

**換了拼法之後第一次就查到了。逐字如下：**

| 查法 | 結果 |
|---|---|
| `release-group?query=artist:"Kevin Eubanks" AND releasegroup:"Spiritalk"`（**無空格**，＝c-171 第 2708 條與派工信用的寫法） | **`count: 0`** |
| **`release-group?query=artist:"Kevin Eubanks" AND releasegroup:"Spirit Talk"`（有空格）** | **`count: 1`**——**`b2295ebc-2cf2-4022-9c77-c5200c990ecd`**，`title` 逐字 **`Spirit Talk`**、`first-release-date` 逐字 **`1993-04-19`**、`primary-type` 逐字 `Album`、`secondary-types` 逐字空陣列、artist-credit 單一 `Kevin Eubanks`（`23e37f53-d40d-47c4-b247-d60727c25532`，Person，disambiguation 逐字 `American jazz & fusion guitarist, and composer`） |
| **`release-group?artist=23e37f53-…&type=album&limit=100`（藝人軸 browse，帶 `type=album` 過濾）** | **`count: 19`，`Spirit Talk` 逐字在列**——**藝人軸 browse 拿得到它** |
| `release?release-group=b2295ebc-…&inc=media+labels+artist-credits` | **`release-count: 1`**——`fc09d997-20ba-4c62-8bbc-cea559d4760e`（`date` 逐字 `1993-04-19`、`country` 逐字 `US`、`status` 逐字 `Official`、barcode 逐字 `077778928621`、CD 9 軌、**`label-info` 逐字 `[('Capitol Records', 'CDP 0777 7 89286 2 1')]`**） |

**→ 主線的判斷在兩件事上都不成立：**
1. **碟在 MB 裡**（RG `b2295ebc`，建檔完整，連 barcode 都有）。
2. **藝人軸並沒有找不到它**——`type=album` 的 browse 逐字回得到（**與第 3602 條那張《A prima vista》正好相反，那一張才是 `primary-type` 空、browse 真的漏掉**）。

**真正的兩個成因（本層改判）**：

| 軸 | 失效點 |
|---|---|
| **廠牌軸** | **MB 唯一那筆 release 的 `label-info` 逐字是 `Capitol Records`，不是 Blue Note**——**第 2487 條「掛母公司」的形狀，與第 3602 條那張的 `EMI Music France` 同族**。`enum/blue-note.json` 1,812 列逐字 0 命中，本層複核成立。 |
| **藝人軸（稽核層）** | **盤名拼法**：**MB 的 title 逐字是 `Spirit Talk`（有空格），而續作的 title 逐字是 `Spiritalk 2: Revelations`（無空格）**。c-171 第 2708 條末段記這個缺口時**逐字寫成 `Kevin Eubanks《Spiritalk》(1993, Blue Note)`——用的是續作的拼法**，任何以該字串為鍵的比對或查詢都會回 0。**「MB 查無」在這一筆上是拼法造成的假陰性，不是真的沒有。** |

**⇒ 沒有第七種形狀。這一筆是「第 2487 條（MB `label-info` 掛母公司）＋ 盤名拼法假陰性」兩件已知的事疊在一起。**

**（二）Discogs 那「五筆」的廠牌鏈第一格，逐筆核過**（派工信要求確認）：

| Discogs | `type` | 年／日期 | 國 | **`labels` 欄逐字（第一格）** | `companies` 欄逐字 |
|---|---|---|---|---|---|
| **12110512** | release | 1993 | US | **`('Blue Note', 'CDP 0777 7 89286 2 1', 'Label')`——只有一格** | `Capitol Records, Inc.`（℗／©）、`Sound On Sound, New York`（Recorded At）、`Sterling Sound`（Mastered At）、`Capitol Jax`（Pressed By） |
| **8053308** | release | 1993 | Netherlands | **`('Blue Note', 'CDP 0777 7 89286 2 1', 'Label')`——只有一格** | `Capitol Records, Inc.`（℗／©） |
| **26988783** | release | **1994-01-19** | Japan | **`('Blue Note', 'TOCJ-5868', 'Label')`——只有一格** | `Capitol Records, Inc.`（℗／©）、`Sound On Sound, New York`（Recorded At）、`Sterling Sound`（Mastered At）、`Toshiba EMI Ltd`（Manufactured By／Distributed By） |
| **34433635** | release | 1993 | US | **`('Blue Note', 'C 101579', 'Label')`＋`('Blue Note', 'C101579', 'Label')`——兩格都是 Blue Note**（BMG 俱樂部版卡帶） | `Capitol Records, Inc.`（℗／©）、`BMG Direct Marketing, Inc.`（Manufactured For） |
| **1376323** | **`master`** | 1993 | Netherlands | ⚠ **不是實體條目，`main_release` 指向 8053308**（第 3607 條） | — |

**→ 「五筆」裡實體條目是 4 筆、master 1 筆。四筆實體條目的 `labels` 第一格逐字全部是 `Blue Note`；`Capitol Records, Inc.` 一律在 `companies` 欄、role 逐字 `Phonographic Copyright (p)`／`Copyright (c)`。**
**Blue Note 家族：成立。** 錄音地 `Sound On Sound, New York` 是錄音室，不是俱樂部（第 2490 條 0 命中）。
**US 原盤 9 軌、實算 53 分 08 秒**（Discogs 12110512 逐軌：7:13／7:21／5:02／6:21／6:25／4:59／5:17／4:33／5:47），`format` 逐字 `CD, Album`——**形態閘會過。**

**（三）處置：照派工信，不加進 `prop-a.json`。**
⚠ **但派工信說「沒有 rgMbid 就得走 §1 人工」這個前提已經不成立了——它有 rgMbid `b2295ebc-2cf2-4022-9c77-c5200c990ecd`。**
**本線七批全部零人工這件事因此不必被這一筆破壞**：**主線可以直接把它當成一般批的一列切進去**（`artist` 逐字 `Kevin Eubanks`＝池中既有字串三張在案、`album` 逐字 `Spirit Talk`、`year` 1993、`rgMbid b2295ebc-…`、catno `CDP 0777 7 89286 2 1`、barcode 077778928621）。
**本層不代切，因為本批清單已固定**（判準第 2 條：可逆，主線新增一列即可）。
⚠ **另記**：續作《Spiritalk 2: Revelations》(1995) 已由 c-171 a 收；**第一集收進來，Eubanks 的 Blue Note 線就從《Turning Point》(1992)／《Spirit Talk》(1993)／《Live at Bradley's》(1994)／《Spiritalk 2》(1995) 連成四張不斷號。**

---

## 第 3614 條（**雲端環境實測；第 254 條只寫觀察不寫結論**）：**⚠ 派工信與 c-171 第 2709 條記的「`itunes.apple.com/search` 回 403」在本棒沒有重現**

| 來源 | 本棒實測 |
|---|---|
| `musicbrainz.org/ws/2` | **通。** 1 req/1.3s，全程 **0 次 503**，UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)` |
| `api.discogs.com`（`/database/search`、`/releases/<id>`、`/masters/<id>`、`/masters/<id>/versions`） | **通，無需 token。** 3s 間隔，全程 **0 次 429** |
| **`itunes.apple.com/search`** | ⚠ ⚠ **回 HTTP 200，不是 403。** us／fr／it／jp 四個店面各跑過，**全部 200**。**派工信第七節與 c-171 第 2709 條記的 403 是當時的狀態，本棒沒有重現** |
| `itunes.apple.com/lookup?upc=` | **通，但兩張都逐字回 `resultCount: 0`**（724349794528／724386617125）——**「回 0」是沒查到，不是不在架上** |
| `coverartarchive.org/release-group/<id>` | **通，⚠ 但直接打回 `307`，要跟轉址（`curl -L`）才拿得到 JSON**。跟了之後兩張都 200 |
| `en.wikipedia.org`／`fr.wikipedia.org` | **通**，兩張的年份與《A prima vista》的五重奏名單都取到了 |
| `allmusic.com`／`allaboutjazz.com` | **本棒未動用**（簡報附錄二第 1 點：雲端一律 403，不再排進查證路徑） |

**三種店面查法（第 254 條）的觀察，逐張**：

| 卡 | 查法 1（`search?term=掛名+盤名`） | 查法 2（改店面／單欄） | 查法 3（`lookup?upc=`） |
|---|---|---|---|
| **A prima vista** | **us 逐字 0 筆** | **fr／it／jp 各命中 1 筆**：`collectionId` 逐字 **696955471**、`trackCount` 逐字 **12**、`releaseDate` 逐字 `1998-10-01T00:00:00Z`、`copyright` 逐字 `℗ 1998 Parlophone Music France`、`primaryGenreName` 逐字 `Jazz`（jp 逐字 `ジャズ`）、**`artistName` 逐字 `Stefano di Battista`（不帶 Quintet）**；jp 的 `artistName` 逐字 `ステファノ・ディ・バティスタ` | **`724349794528` 逐字回 `resultCount: 0`** |
| **Parker's Mood** | — | **fr 命中 `collectionId` 逐字 696450658**、`trackCount` 逐字 **10**（＝10 軌形，**不是日版 12 軌形**）、`releaseDate` 逐字 `2004-09-17T07:00:00Z`、`copyright` 逐字 `℗ 2004 Parlophone Music France`、`primaryGenreName` 逐字 `Jazz` | **`724386617125` 逐字回 `resultCount: 0`** |

⚠ **「us 查不到」不可寫成「不在架上」**（派工信第七節、`REMOTE_RUNBOOK.md` 雲端硬規則第 1 條）。**兩張的店面身分都要本機覆核。**

**封面（CAA）本層跑了 RG 層一次，只寫觀察**：

| 卡 | RG 層圖數 | **來源 release** | 觀察 |
|---|---:|---|---|
| A prima vista | **1** | 逐字 `1eaa4e09` | **＝1998 FR 原盤** ✔ |
| Parker's Mood | **2** | 逐字 `3c5ef34e` | ⚠ **＝歐版 12 軌限定版（Blue Note 8661712），不是首發的法國／美國 10 軌形**——**本機挑封面要辨版** |

---

## 第 3615 條（**收工檢查**）

| 檢查 | 結果 |
|---|---|
| `node batch-progress/c172/chk-prop.mjs a` | **見本檔末尾的實跑貼字。標記 0、exit 0** ✔ |
| `node batch-progress/dedup-crossbatch.mjs c172` | **見本檔末尾的實跑貼字。跨批撞卡 0** ✔ |
| **第 315 條結算** | **`prop-a.json` 2 筆 ＋ 本檔退表 0 筆 ＝ 2 ＝ `slice.json` `g:"a"` 的筆數** ✔ |
| MBID 對齊 | **2／2 逐張等於 `mbNote` 裡第一個 UUID** |
| 禁碰清單 | `seed_cards.json` **只讀**、`apex_pool.json` 未開、`PROJECT_MEMORY.md` 未動、KV／Firestore 未碰、**`enum/blue-note.json` 只讀**、其他批次檔案 **只讀**、**無 `git commit`／`git push`／未動 git 索引** |
| 中間檔 | 全在 scratchpad 的 `c172a/` 子目錄（第 533 條），帶 `c172-`／`c172a` 前綴 |

---

## 第 3616 條（**⚠ 派工信與原文／既有裁定牴觸之處；依規定回報**）：**五處，其中三處是事實錯誤**

| # | 派工信原句 | 實查 | 影響 |
|---:|---|---|---|
| **1** | 第三節：「`Stefano Di Battista` 池中已有卡：**c-160 的《Trouble Shootin'》、c-169 b 的《Round About Roma》**」 | **兩處錯。**（甲）**《Round About Roma》在 `c-171` b，不是 c-169 b**（`batch-progress/c171/prop-b.json` 第 4 筆；c-171 第 2751／2755 條逐字在案，c-169 b 收的是 `Ruben Hein`／`Kendrick Scott Oracle` 那一組）。（乙）**派工信漏了 `c-157《Stefano di Battista》(2000)`，實掃是 3 張不是 2 張。** | 影響 `why` 的數字寫法（第 409b／439 條）。**本層照實掃寫「漢字 0／羅馬字 0／英文字串 3，且 3 張都還沒上架」**；掛名裁定不受影響（第 3604 條） |
| **2** | 第五節：「`Kevin Eubanks《Spirit Talk》`……**MB 的 release-group 搜尋回 0 筆**……主線判這是**列舉失效的第七種形狀：碟根本不在 MB 裡**」＋「**沒有 rgMbid 就得走 §1 人工**」 | **前提不成立。** **MB 有這個 RG：`b2295ebc-2cf2-4022-9c77-c5200c990ecd`**，`title` 逐字 `Spirit Talk`、frd 逐字 `1993-04-19`、primary-type Album，**而且藝人軸 `type=album` 的 browse 逐字回得到**。「回 0 筆」是**拼法造成的假陰性**（查的是無空格的 `Spiritalk`，MB 的 title 是有空格的 `Spirit Talk`） | ⚠ ⚠ **會讓一張建檔完整的碟被當成「MB 沒有」而丟去走 §1 人工。** 全文見第 3613 條；**主線可直接把它當一般批的一列切進去，本線七批零人工不必被這一筆破壞** |
| **3** | 第七節：「**`itunes.apple.com/search` 有時 403**（`/lookup` 通但需要先有 ID）」 | **本棒四個店面各跑一次，全部 HTTP 200。** 反而是 `lookup?upc=` 兩張都逐字回 `resultCount: 0` | 無害（派工信寫的是「有時」），但**下一棒不必預設 `search` 不可用**。第 3614 條 |
| 4 | 第二節表格：「`Stefano Di Battista Quintet《A prima vista》`……**連藝人軸稽核的 `type=album` 過濾都會漏掉**」 | **完全正確，本層複核成立**（`primary-type` 逐字 `null`）。⚠ **但同一句話不適用於第五節那張《Spirit Talk》**——**那張的 `primary-type` 逐字是 `Album`，browse 拿得到** | **不是錯，是範圍**。兩張的失效點不同，第 3602／3613 條已分開記 |
| 5 | 第二節與第三節通篇把第 2 張的盤名寫成 **`Parker’s Mood`（U+2019）** | **MB RG title、`enum/blue-note.json` 的 `album` 欄、Discogs 九筆、Billboard 2005-01-29 紙本，逐字全部是 ASCII 撇號 `Parker's Mood`**；U+2019 只出現在 `c172/slice.json` 與派工信 | **不影響結算**（`k()` 兩形同鍵）。本層 `album` 取 ASCII、U+2019 進 `queryAlias`。第 3611 條 |

**另外更正的是既有裁定、不是派工信**：
- **c-171 第 2708 條末段**把缺口逐字記成「`Kevin Eubanks《Spiritalk》(1993, Blue Note)`」——**用了續作的拼法**，MB 的 title 是 `Spirit Talk`（有空格）。**這一個字的差別讓主線誤判成「碟不在 MB 裡」**（第 3613 條）。
- **第 1824-B 條**「判家族要打 `releases/<id>`」**漏了一步前置**：**要先讀 `search` 結果的 `type` 欄**，`type == "master"` 的打 `releases/<id>` 會拿到另一張碟（第 3607 條）。

---

## 第 3617 條（**交件版本認定**）

**以工作區當下的 `batch-progress/c172/prop-a.json` 與本檔為交件版**（第 1803-B／2497／2712 條）。
本層在跑的過程中把 `prop-a.json` 整份寫回磁碟 **2 次**（第 1 筆、第 2 筆，照派工信第六節「每做完 1 筆就整份寫回」）。
**「筆數對了」不等於「定稿了」**——定稿的時點是 `chk-prop a` 標記 0、`dedup-crossbatch c172` 跨批撞卡 0、第 315 條結算 2＋0＝2 三者同時成立之後。
**本檔為新建（c-172 先前沒有 rulings.md），未覆寫任何既有檔案；未碰 `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／`enum/blue-note.json`／KV／Firestore／其他批次的檔案；未 `git commit`／`git push`／未動 git 索引。**

---

## 附：收工實跑

**`node batch-progress/c172/chk-prop.mjs a`**（2026-09-19 收工實跑，逐字）：

```
prop-a.json：2 張、2 位
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）
（已知，本機已擋：c49b 沈文程《心事誰人知》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：c49b 羅文《小李飛刀》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：cseab Sơn Ca《Băng nhạc Sơn Ca 8 (Tiếng hát Sơn Ca)》 ←→ c64；待本機標記後從 dedup-known.json 移除）

135 批（其中 1 批讀 prop）｜卡數 5334｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）

合計 2 張、2 位｜標記 0
```

**`標記 0`、`exit 0`** ✔。**第五道（盤名逐字撞 apex 王牌、掛名不同，report-only）本批 0 處。**

**`node batch-progress/dedup-crossbatch.mjs c172`**（單獨再跑一次，逐字）：

```
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）

1 批（其中 1 批讀 prop）｜卡數 2｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）
```

⚠ **`卡數 2` ＝ a 組 2 張，本批沒有 b 組**（`slice.json` 兩列的 `g` 欄逐字都是 `"a"`）。

---
---

# c-172 **第三列追加**（`Kevin Eubanks《Spirit Talk》`1993；編號 3618–3640，本節用到 3628）

**2026-09-19 主線中途指示**：本層第 3613 條對《Spirit Talk》的覆核成立，主線直查 MB 確認 RG `b2295ebc-2cf2-4022-9c77-c5200c990ecd`，
**「第八種形狀」（第 1841-B 條）作廢**；**既然有 rgMbid 就不必走 §1 人工，`c172/slice.json` 已由主線加成第三列（`g: "a"`），請接進本批。**
**本節以 append 寫入，未覆寫 3601–3617 任何一行**；`prop-a.json` 原有兩筆未動，第三筆以 append 加在末尾。

---

## 第 3618 條（**追加後的總表**）：**3 張＝收 3 ／ 退 0**

| | 張 |
|---|---:|
| `slice.json` `g: "a"`（**主線加列後**） | **3** |
| **`prop-a.json` 收件** | **3** |
| **a 組退件** | **0** |
| **合計** | **3 收 ＋ 0 退 ＝ 3** ✔（第 315 條結算通過，見第 3628 條） |

| # | 卡 | 掛名 | 年份 | 列舉失效形狀 |
|---:|---|---|---:|---|
| 1 | `Stefano Di Battista Quintet《A prima vista》` | 新立（Group 實體） | 1998 | MB `primary-type` 欄未設 |
| 2 | `Stefano Di Battista《Parker's Mood》` | 沿用 | 2004 | enum 那一列 `year` 為 null（MB frd 為空字串） |
| **3** | **`Kevin Eubanks《Spirit Talk》`** | **沿用** | **1993** | **MB `label-info` 掛母公司 `Capitol Records`（第 2487 條型）＋ 查詢欄名寫錯造成的假陰性** |

**3 張、3 個相異掛名字串**（無一重複）。**年份改判 0 筆、覆核成立 3 筆。退件 0 筆，本檔沒有退表。**

⚠ **第 3601 條寫「2 張」在寫下的當時是對的**（`slice.json` 當時只有兩列）；**本節生效後，本批的總數以本條為準。**
⚠ **三張各是一種不同的列舉失效形狀**——**這一批雖然只有三張，卻是本線目前為止形狀最分散的一批。**

---

## 第 3619 條（**⚠ 方法論，本節最重要的一條；更正主線與本層第 3613 條各一半**）：**MB search 回 0 筆的根因是「`title:` 不是 release-group 檢索面上的欄位」，不是索引假陰性、也不只是拼法**

**主線中途指示逐字**：「我自己跑的是 MB 的 **search** 端點（`query=artist:"Kevin Eubanks" AND title:"Spirit Talk"`，**有空格**），**回的是 `count: 0`**。所以不只是拼法問題——**MB 的 search 索引對這張碟本身就是假陰性，browse 才拿得到**。」

**本層照那個查詢重跑，確實逐字回 `count: 0`。但再往下一層就會發現：問題不在索引，也不在這張碟，在欄名。**

### （一）四組實跑，逐字

| # | 查詢 | 回 |
|---:|---|---|
| 1 | `release-group?query=artist:"Kevin Eubanks" AND **title**:"Spirit Talk"` | **`count: 0`** |
| 2 | `release-group?query=artist:"Kevin Eubanks" AND **releasegroup**:"Spirit Talk"` | **`count: 1`**——`b2295ebc-…`，score 100 |
| 3 | `release?query=artist:"Kevin Eubanks" AND **title**:"Spirit Talk"` | **`count: 0`** |
| 4 | `release?query=artist:"Kevin Eubanks" AND **release**:"Spirit Talk"` | **`count: 1`**——`fc09d997-…`，score 100 |

### （二）兩組對照實驗（**這一步才是決定性的**）

**拿兩張確定存在於 MB、而且池中已收的碟去跑同一個 `title:` 查法：**

| 對照 | `title:` | `releasegroup:` |
|---|---|---|
| `Kevin Eubanks《Turning Point》`（c-151 已收，RG `61e02a48`） | **`count: 0`** | **`count: 1`** ✔ |
| `Stefano Di Battista《Round About Roma》`（c-171 b 已收，RG `0762a45c`） | **`count: 0`** | （本層未重跑，c-171 第 2758 條已在案） |

**→ `title:` 對任何一張碟都回 0，不論它在不在、拼法對不對。**
**MB 的 Lucene 查詢解析器對不存在的欄名不報錯，直接回零結果**——**這是一個會靜默吃掉所有查詢的錯，不是這張碟的特例。**

### （三）裁定

1. ⚠ **`release-group` 檢索面的盤名欄是 `releasegroup:`，`release` 檢索面的是 `release:`。`title:` 兩邊都不是欄位，一律不要用。**
2. **主線那句「search 回 0 沒有證據力」在結論上成立，本層照收**；**但理由要改寫**——**不是「MB 的 search 索引對這張碟假陰性」（用對欄名它回得到，score 100），是「欄名寫錯，查詢從一開始就沒有生效」。**
   **這個差別很重要**：若照「索引假陰性」的說法，主線會推論「MB search 不可信、以後一律改用 browse」；**實情是 search 完全可用，只要欄名寫對**——而 browse 需要先有 artist MBID，**在「只知道藝人名與盤名」的場合仍然只有 search 走得通。**
3. **本層第 3613 條把成因寫成「盤名拼法假陰性」，也只對一半**：**拼法確實是另一個獨立的坑**（見第 3620 條（二）），**但主線那一次回 0 是欄名造成的，與拼法無關——他用的是有空格的正確拼法。**
4. ⚠ **與 Apple `/search` 不同型**：Apple 那邊是**地區店面覆蓋**問題（本批第 1 張 us 回 0、fr／it／jp 各回 1，第 3614 條），**換店面就有**；MB 這邊是**查詢語法**問題，**換欄名就有**。**兩者都不可拿「回 0」當「不存在」，但補救方式不一樣，不要混為一談。**

判準第 3 條（卡住整條線：不釘死這一條，下一次仍然會有人用 `title:` 查完宣告「MB 沒有」）。
⚠ **給主線：這一條值得回頭掃**——**凡是既有裁定裡以「MB search 回 0」為由判「MB 查無、不收」或「走 §1 人工」的，都要用 `releasegroup:` 重跑一次。**
**本層當場想到的一筆**：c-171 b 第 2774 條第 3 筆 `Ruben Hein Featuring Ernst Glerum @ Joost Patočka《Revisited》`(2012) 的判定逐字是
「`release-group?query=artist:"Ruben Hein" AND releasegroup:"Revisited"` 逐字回 `count: 0`——MB 沒建這個 RG」——**那一筆用的欄名是對的（`releasegroup:`），所以結論不受本條影響**；但**其他批次未必都用對了**。

---

## 第 3620 條（**《Spirit Talk》的列舉失效成因，兩層；覆核主線的撤回並補完第 3613 條**）

### （一）廠牌軸：**MB 的 `label-info` 逐字 `Capitol Records`，掛的是母公司**

MB 唯一那筆 release `fc09d997-20ba-4c62-8bbc-cea559d4760e` 的 `label-info` 逐字 **`[('Capitol Records', 'CDP 0777 7 89286 2 1')]`**。
**目錄號是 Blue Note 的號（`CDP 0777 7 89286 2 1`），廠牌格卻填成 Capitol**——**第 2487 條「掛錯層級／掛母公司」的形狀，與本批第 1 張《A prima vista》的 `EMI Music France` 同族。**
`enum/blue-note.json` 1,812 列逐字 **0 命中**，本層程式複核成立。
⚠ **Billboard 的榜單那一行逐字是 `BLUE NOTE 89286/CAPITOL`**——**紙本自己就把兩層寫在一起，MB 只取了後面那一半。**

### （二）藝人軸：**browse 拿得到；漏掉它的是「查法」，而且有兩個獨立的坑**

**`release-group?artist=23e37f53-…&type=album&limit=100` 逐字回 `count: 19`，`Spirit Talk` 在列。**
**⇒ 藝人軸的 browse 從來沒有漏掉它。** 漏掉它的是兩個查法上的坑：

| 坑 | 逐字 | 誰踩到 |
|---|---|---|
| **欄名寫錯** | `title:"Spirit Talk"` 回 0，`releasegroup:"Spirit Talk"` 回 1 | **主線**（第 3619 條） |
| **盤名拼法** | **MB 的 title 是 `Spirit Talk`（有空格），續作是 `Spiritalk 2: Revelations`（無空格）**。用無空格的 `releasegroup:"Spiritalk"` 去查，**逐字回 `count: 1`，但回的是續作 `d783536c`，不是本碟** | **c-171 第 2708 條**（把缺口記成《Spiritalk》） |

⚠ **第二個坑比第一個陰險**：**它不回 0，它回一張看起來很合理的碟**——同一位藝人、同一條企劃線、盤名只差一個空格與一個數字。
**若當時有人照那個結果往下走，會把 1995 年的續作當成 1993 年的第一集。**

**⇒ 沒有第八種形狀。這一筆是「第 2487 條（MB `label-info` 掛母公司）」加上「兩個查法坑」。主線撤回第 1841-B 條，本層覆核同意。**

---

## 第 3621 條（**掛名，第 3 張**）：**`Kevin Eubanks` 沿用池中既有字串；⚠ 主線這次沒給數字，本層實掃是 3 張**

主線中途指示逐字：「**掛名**：池中 `Kevin Eubanks` 有沒有卡請自己實掃（⚠ 我先前給的池中數字已經錯過兩次，這次不給數字）。」**實掃如下。**

| 層 | 逐字 |
|---|---|
| **MB RG artist-credit** | **單一實體** `Kevin Eubanks`（**`23e37f53-d40d-47c4-b247-d60727c25532`，`type` 逐字 `Person`、`country` 逐字 `US`、sort-name 逐字 `Eubanks, Kevin`、disambiguation 逐字 `American jazz & fusion guitarist, and composer`**），joinphrase 空 |
| **第 307 條同名反查** | `artist?query="Kevin Eubanks"` 逐字回 **`count: 1`**——**MB 上沒有第二個同名實體**，不需要消歧 |
| **Discogs** | 四筆實體條目的 `artists` 欄逐字都是 `Kevin Eubanks`（artist id 312668，**無消歧編號**） |
| **Apple** | us／gb／fr 逐字 `Kevin Eubanks`、jp 逐字 `ケヴィン・ユーバンクス` |
| **池中實掃**（35,390 列比對面） | **英文字串 3 張**：**c-151《Turning Point》(1992)／c-152《Live at Bradley's》(1994)／c-171 a《Spiritalk 2: Revelations》(1995)**；**漢字 0／羅馬字 0**；**`seed_cards.json` 裡 `Kevin Eubanks` 掛頭 0 張**，三張全部在未上架批次 |
| **同姓側人** | **四處含 `eubanks`（正規化後）的掛名字串逐字只有 `Kevin Eubanks` 這一種**——**沒有群組形、沒有聯名形，`Robin Eubanks` 單獨字串 0 張** |

**裁定：`Kevin Eubanks`，沿用。** 第 307 條正例（同一實體，用池中既有寫法）。
⚠ **胞兄 Robin Eubanks 是側人不是聯名**：MB credit 單一實體、Discogs `artists` 欄只有 Kevin，**依第 1131 條不立字串、不進 `artist` 欄**；正文要寫出他（他吹了五軌長號），但不得寫成聯名盤。
⚠ **`why` 的數字寫法（第 409b／439 條）：「漢字 0／羅馬字 0／英文字串 3，且 3 張都還沒上架」。**
⚠ **收進本張之後，Eubanks 的 Blue Note 線 1992《Turning Point》／1993《Spirit Talk》／1994《Live at Bradley's》／1995《Spiritalk 2: Revelations》四張連號不斷。**

---

## 第 3622 條（**年份，第 3 張**）：**1993，覆核成立；⚠ 但 MB 的 `first-release-date` 逐字 `1993-04-19` 是錄音首日，不是發行日**

### （一）三種掃描（第 1800-B 條兩種 ＋ 本批新立的 master `versions` 第三種，第 3607 條）

| 掃描 | 結果 |
|---|---|
| **(甲) barcode 反查** `barcode=077778928621` | **回 3 筆**——⚠ **其中 1 筆 `type` 逐字 `master`（1376323）**，實體條目 2 筆（8053308 NL、12110512 US） |
| **(乙) 全 release 掃描** `artist=Kevin Eubanks&release_title=Spirit Talk&per_page=50` | **回 5 筆**（**4 release ＋ 1 master**，＝派工信說的「Discogs 有五筆條目」，**其中一筆不是實體條目**） |
| **(丙) `artist=` 單欄全掃** `artist=Kevin Eubanks&type=release&per_page=100` | **回 143 筆**（整份目錄，含 GRP 時期九張）——**本碟只有四個實體版本** |
| **(丁) master 1376323 的 `versions`** | **逐字 4 筆**：8053308（NL 1993）／12110512（US 1993）／34433635（US 1993 卡帶俱樂部版）／**26988783（JP，`released` 逐字 `1994-01-19`）**；`main_release` 逐字 8053308 |

**四筆實體條目全部 1993–1994，沒有一筆早於 1993。**

### （二）⚠ MB 的 `1993-04-19` 不可當發行日

**Discogs 12110512 的 notes 逐字**：
> `Recorded direct to 2-track at Sound On Sound Studios, New York City on **April 19-23, 1993**.`

**`1993-04-19` 與錄音期的第一天一字不差**——**這是第 484 條「把錄音日填成發行日」的形狀**（本線在 c-141、c-171 都踩過，這次是 MB 端而不是 Apple 端）。

### （三）紙本兩層把發行時點釘在 1993 年 10 月

| 來源 | 逐字 |
|---|---|
| **Cash Box 1993-10-16**（樂評） | `KEVIN EUBANKS: Spirit Talk (Blue Note CDP 0777 7 8928621). Producer Kevin Eubanks. There is an accessible etherealism pervasive throughout this album…` |
| **Billboard 1993-10-23** Top Jazz Albums | `NEW  KEVIN EUBANKS  BLUE NOTE 89286 /CAPITOL  SPIRIT TALK`——**新進榜第 24 名** |
| Billboard 1993-11-06 | `16  24  3`（本週 16、前週 24、在榜 3 週） |
| Billboard 1993-11-20 | `14  16  5`（本週 14、前週 16、在榜 5 週） |

**⇒ 上市在 1993 年 10 月上旬前後。`year` 取 1993 不變，但正文不得寫「1993 年 4 月發行」。**
⚠ **本批三張裡只有這一張的紙本是有東西的**——**前兩張（法國支線）在 Billboard／Cash Box 逐字 0 命中，本張（美國本部）兩份紙本都報**。
**這與簡報附錄二那條「分界不是年代、是碟的出身地」再次同向，而且這一次是紙本這一側的實例。**

### （四）榜位只寫觀察，不寫死

**本層取到三期：24（新進）／16／14。最高名次至少第 14 名**，但 **OCR 檔只到 1993-11-20**，**覆蓋不完整**——
**依第 254 條只寫觀察：`facts` 可寫「1993 年秋天進 Billboard 爵士榜、本層取到的三期最高第 14 名」，不得寫死「最高名次第 14 名」。**

**Apple 的 `releaseDate` 逐字 `1993-01-01T08:00:00Z` 是只到年的占位值**（與 c-171 第 2759 條記的 `Love Is Here to Stay` 同型），**不採**。
**Apple 的 `copyright` 逐字 `℗ 1993 Blue Note Records`** 只當年份旁證。

**裁定：`year: 1993`，不改判。**

---

## 第 3623 條（**Blue Note 家族覆核，第 3 張；派工信第五節原本就要求確認的**）：**成立——四筆實體條目的 `labels` 第一格全部逐字 `Blue Note`**

方法同第 3608 條（先讀 `type` → 只對 `release` 打 `releases/<id>` → `labels` 與 `companies` 分開看 → 只認 `labels` 第一格）。

| Discogs | `type` | 年／日期 | 國 | **`labels` 欄逐字** | `companies` 欄逐字（全部排掉） |
|---|---|---|---|---|---|
| **12110512** | release | 1993 | US | **`('Blue Note', 'CDP 0777 7 89286 2 1', 'Label')`——只有一格** | `Capitol Records, Inc.`（℗／©）、**`Sound On Sound, New York`（Recorded At ＝錄音室）**、`Sterling Sound`（Mastered At）、`Capitol Jax`（Pressed By） |
| **8053308** | release | 1993 | Netherlands | **同上，只有一格** | `Capitol Records, Inc.`（℗／©） |
| **34433635** | release | 1993 | US（卡帶） | **`('Blue Note', 'C 101579')`＋`('Blue Note', 'C101579')`——兩格都是 Blue Note** | `Capitol Records, Inc.`（℗／©）、`BMG Direct Marketing, Inc.`（Manufactured For） |
| **26988783** | release | **1994-01-19** | Japan | **`('Blue Note', 'TOCJ-5868', 'Label')`——只有一格** | `Capitol Records, Inc.`（℗／©）、`Sound On Sound, New York`（Recorded At）、`Sterling Sound`（Mastered At）、`Toshiba EMI Ltd`（Manufactured By／Distributed By） |
| 1376323 | **`master`** | 1993 | NL | ⚠ **不是實體條目**，`main_release` 逐字 8053308 | — |

⚠ **派工信說的「Discogs 有五筆條目」＝4 筆實體 ＋ 1 筆 master**（第 3607 條）。
⚠ **`Capitol Records, Inc.` 在每一筆都只出現在 `companies` 欄、role 逐字 `Phonographic Copyright (p)`／`Copyright (c)`**——**這正是第 2754 條要求「分開看」的理由：MB 把它填進 `label-info`，Discogs 把它擺在 `companies`，兩邊對同一件事的歸類不一樣，只有 Discogs 那邊是對的。**
⚠ **`Blue Note Compagnie`（`BNS-`）與 `Blue Note Digital` 各 0 命中；演出場地字樣（`club`／`cafe`／`jazz club`／`<城市名> Blue Note`）0 命中**——`Sound On Sound, New York` 是錄音室。

**裁定：Blue Note 家族閘過。**

---

## 第 3624 條（**形態閘，第 3 張；⚠ 並更正一個本層自己算錯的數字**）

| 卡 | 零售 `formats.descriptions` 逐字 | 軌數 | 實算總長 | 判 |
|---|---|---:|---:|---|
| **Spirit Talk** | `['Album']`（四筆條目皆然；卡帶版另帶 `Club Edition`、日版另帶 `Promo`） | **9** | **52:58** | **Album** |

**`format` 欄不含 `EP`／`Single`，不需要動用第 1811-B 條的判準順序。**
逐軌（Discogs 12110512，**MB 未填軌長**）：Landing 7:13／Contact 7:21／Union 5:02／Spirit Talk 6:21／Earth Party 6:25／Inside 4:59／Going Outside 5:17／Journey 4:33／Livin' 5:47。
**433＋441＋302＋381＋385＋299＋317＋273＋347 ＝ 3,178 秒 ＝ 52 分 58 秒。**

⚠ ⚠ **更正**：**`c172/slice.json` 第三列的 `note` 逐字寫「9 軌 53:08」——那是本層上一輪交件回報時算錯的數字，主線照抄進了 slice。正確是 52:58。**
**兩者都遠離 EP 區間，不影響任何判定**；但**下游若拿總長比對版本，要用 52:58**。
⚠ **數軌數前已先濾掉 `position` 為空的標題列**（簡報附錄二第 3 點），本張濾掉 0 列。

---

## 第 3625 條（**合輯閘、現場閘、曲風，第 3 張**）

**（一）合輯閘：不是合輯。** MB `secondary-types` 逐字空陣列；四筆 Discogs 條目的 `formats.descriptions` 無一含 `Compilation`／`Sampler`；
**九軌是 1993 年 4 月 19–23 同一週、`Recorded direct to 2-track`（直接錄成兩軌母帶、無多軌疊錄）的新錄音**，九軌全是 Eubanks 自己寫的。
⚠ **盤名不帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks。**

**（二）現場閘：不是現場盤。** ⚠ **slice 的 `live` 欄逐字 `null`（＝沒查，不是 false）**，本層實查——MB `secondary-types` 空、錄音地點是錄音室（Sound On Sound Studios, NYC）。
⚠ **但正文可以寫「等於一場錄音室現場」**——`direct to 2-track` 的意思就是九軌一次過、不修不疊，**這是本張最值得寫的一個技術事實**；**惟不得因此把 `releaseType` 或 `live` 寫成現場盤。**

**（三）曲風：`['jazz']`。**

| 來源 | 逐字 |
|---|---|
| MB RG `genres`／`tags` | **皆空陣列** |
| MB 藝人層 `23e37f53` 的 `genres` | `contemporary jazz`／`jazz`／`jazz fusion` |
| Discogs 12110512（US 原壓） | `genres` 逐字 `['Jazz']`、`styles` 逐字**空陣列** |
| Discogs 8053308（NL） | `genres` 逐字 `['Jazz']`、`styles` 逐字 `['Smooth Jazz', 'Soul-Jazz']` |
| Apple（四店面） | `primaryGenreName` 逐字 `Jazz` |

**`contemporary jazz`／`jazz fusion`／`smooth jazz`／`soul-jazz` 都不在十個合法值裡，一律不跟**（第 1572 條）。
**判 `['jazz']`，與池中三張 Eubanks 卡一致。**
⚠ **荷版那兩個 style 標籤（Smooth Jazz／Soul-Jazz）與本碟的實際內容落差很大**（原音吉他＋低音提琴＋長號＋長笛的室內編制）——**正文不得把它寫成 smooth jazz。**

---

## 第 3626 條（**⚠ 本卡最需要下游注意的一格；第 611 條第二種盲區的實例**）：**與池中已收的續作《Spiritalk 2: Revelations》(1995) 極易混——三種拼法、兩張都是 9 軌**

**兩張不是撞卡**：經 `chk-prop.mjs` 的 `k()` 正規化後折鍵分別是 **`spirittalk`** 與 **`spiritalk2revelations`**，**不相等，`chk-prop` 不會亮燈，本層實掃也確認真同碟 0 筆**。
**但下游一定會混，理由有三個：**

| # | 混淆點 | 逐字 |
|---:|---|---|
| 1 | **三種拼法** | **MB `Spiritalk 2: Revelations`（無空格＋冒號）／Discogs `Spiritalk 2 - Revelations`（無空格＋連字號）／Apple `Spirit Talk II - Revelations`（有空格＋羅馬數字）**——**Apple 那一形與本碟只差一個羅馬數字** |
| 2 | **Apple 同一次查詢兩張都回** | `term=Kevin Eubanks Spirit Talk&entity=album` 在 us／gb／jp／fr 四個店面**各回 2 筆**：本碟 `collectionId` 逐字 **715722796**、續作逐字 **1767714368** |
| 3 | ⚠ ⚠ **軌數分不開** | **兩張的 `trackCount` 逐字都是 9**（續作的 9 軌 50:08 見 c-171 第 2706 條）——**「9 軌」這個特徵在這兩張之間沒有鑑別力** |

**裁定（給本機與下游）：辨別本碟與續作，一律靠年份（1993 vs 1995）與目錄號（`CDP 0777 7 89286 2 1` vs `CDP 7243 8 30132 2 7`），不可靠盤名、不可靠軌數。**
**三種續作拼法已整組寫進本卡的 `queryAlias` 供比對，但 `album` 欄只寫 `Spirit Talk`。**
⚠ **`Spiritalk`（無空格）這個字串也進了 `queryAlias`，但要標明它在 MB 上指向的是續作**——**這是本卡 `queryAlias` 裡唯一一個「查得到但會查到別張碟」的別名，本層在該欄逐字註明了。**

---

## 第 3627 條（**卡池實掃與第 611 條五種盲區，第 3 張**）：**四處皆 0，真同碟 0 筆**

**比對面 35,390 列**（`seed_cards.json` 唯讀 ＋ `desc-tools/batches/cards/*.json` ＋ `batch-progress/c*/prop-*.json` ＋ `c*/slice.json` ＋ `cand-*.json`）。
**正規化直接抄 `chk-prop.mjs` 的 `k()`**（第 1823-B 條），**判「已收」逐字比 `album` 欄、全程未用 grep**（第 1819-B 條）。

| 檢查 | 結果 |
|---|---|
| 複合鍵（掛名＋盤名） | **命中 1 筆＝本批自己的 slice 那一列**，其餘 0 |
| **盤名 `Spirit Talk` 逐字命中** | **1 筆（同上）——池中、卡單、其他批次 0 筆** |

| 盲區 | 本張結果 |
|---|---|
| 一、群組掛名 vs 個人掛名 | **掃過，0 筆。** 四處含 `eubanks` 的掛名字串逐字**只有 `Kevin Eubanks` 一種**（無 `Kevin Eubanks Trio`／`Kevin Eubanks Group` 之類），`Robin Eubanks` 0 張 |
| **二、同名但不同盤的 Volume 碟** | ⚠ **本張就是這個形狀，但不構成撞卡**：續作《Spiritalk 2: Revelations》(1995) 在 c-171 a，折鍵不同（第 3626 條）。**這是本線少見的「第二種盲區真的命中、但判定為不撞卡」的實例** |
| 三、MB 把同一張碟建成兩個 RG | **掃過，0 筆。** `release-group?query=artist:"Kevin Eubanks" AND releasegroup:"Spirit Talk"` 逐字 `count: 1`；**藝人軸 browse 的 19 個 RG 逐筆看過，沒有第二個 `Spirit Talk`**；Discogs master 1376323 的 4 個版本也都指向同一個 RG |
| 四、斜線掛名 | **掃過，0 筆。** 四處無任何含 `Eubanks` 的斜線／逗號聯名字串 |
| 五、同名但不同盤 | **掃過，0 筆。** ⚠ **MB 上另有四個不同藝人的《Spirit Talk》**（`Coolangubra`／`John Moulder, Ken Hall`／`INSIDIUS`／`Def Sound, Saul Williams`，`release-group?query=releasegroup:"Spirit Talk"` 逐字回 5 筆）——**四張在池中與所有批次都 0 命中，不構成撞卡，但下游用盤名搜 MB 時要帶掛名** |

⚠ **`&`／`and` 分裂（第 2695 條）本張不可能發生**：掛名與盤名都不含 `&`／`and`／`/`／`+`。
⚠ **`chk-prop` 第五道（盤名逐字撞 apex 王牌、掛名不同，report-only）本張 0 處。**

---

## 第 3628 條（**收工檢查、第 315 條結算、交件版本認定，以及與主線中途指示牴觸之處**）

### （一）收工檢查

| 檢查 | 結果 |
|---|---|
| `node batch-progress/c172/chk-prop.mjs a` | **逐字「prop-a.json：3 張、3 位」、「合計 3 張、3 位｜標記 0」、exit 0** ✔（實跑貼字見本檔末尾） |
| `node batch-progress/dedup-crossbatch.mjs c172` | **逐字「1 批（其中 1 批讀 prop）｜卡數 3｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0」** ✔ |
| **第 315 條結算（主線指示改成 3）** | **`prop-a.json` 3 筆 ＋ 本檔退表 0 筆 ＝ 3 ＝ `slice.json` `g:"a"` 的筆數（三列的 `g` 逐字都是 `"a"`）** ✔ |
| MBID 對齊 | **3／3 逐張等於 `mbNote` 裡第一個 UUID** |
| 禁碰清單 | `seed_cards.json` **只讀**、`apex_pool.json` 未開、`PROJECT_MEMORY.md` 未動、KV／Firestore 未碰、**`enum/blue-note.json` 只讀**、**`slice.json` 只讀（主線加的第三列未動）**、其他批次檔案 **只讀**、**無 `git commit`／`git push`／未動 git 索引** |
| 中間檔 | 全在 scratchpad 的 `c172a/` 子目錄 |

### （二）主線中途指示的第 5 點另外交代的一件事，已確認

主線逐字：「⚠ **《Parker's Mood》那條『美版 2005-01-25 才上市、Discogs 的 2004 是盤面 ℗© 年』很重要，請確定它寫進了該卡的 `risk`**。」
**已在 `prop-a.json` 第 2 筆的 `risk` 裡，本節另補上可 grep 的日期字串**，該段逐字現為：
> ⚠ ⚠ **但美版是 2005 年 1 月才上市（街頭日 2005-01-25），這一點要寫給下游**：`batch-progress/enum/billboard-bn-2005-ocr.txt.gz`（Billboard 2005-01-29 第 33 頁 Essential Reviews）逐字「`STEFANO DI BATTISTA Parker's Mood PRODUCER: Yves Chamberland Blue Note 7243 8 66740 RELEASE DATE: Jan. 25`」——**Discogs 把美版標成 2004，那是盤面 ℗© 年，不是上市日**……**正文不得寫成「2004 年美日歐同步發行」，也不得把美版寫成 2004 年上市。**

### （三）⚠ 與主線中途指示牴觸之處（依規定回報）

| # | 主線原句 | 實查 | 影響 |
|---:|---|---|---|
| **1** | 「**MB 的 search 索引對這張碟本身就是假陰性，browse 才拿得到**。這與 Apple 的 `/search` 同型：**search 回 0 沒有證據力**」 | **結論成立，理由不成立。** **不是索引假陰性**——換成正確的欄名 `releasegroup:` 之後，**search 逐字回 `count: 1`、score 100**。回 0 的原因是 **`title:` 不是 release-group 檢索面上的欄位**，本層用兩張確定存在的碟做對照實驗證明（第 3619 條） | ⚠ **若照「索引假陰性」寫進主線判準，會推論出「MB search 不可信、一律改用 browse」——但 browse 需要先有 artist MBID，在「只知道藝人名與盤名」的場合仍然只有 search 走得通。** 應改寫成「**欄名一律用 `releasegroup:`／`release:`，`title:` 兩邊都不是欄位**」 |
| 2 | 「與 Apple 的 `/search` 同型」 | **不同型。** Apple 那邊是**地區店面覆蓋**（換店面就有，本批第 1 張 us 0 筆／fr・it・jp 各 1 筆）；MB 這邊是**查詢語法**（換欄名就有） | **兩者都不可拿「回 0」當「不存在」，但補救方式不同，不要併成一條規則** |
| 3 | `c172/slice.json` 第三列 `note` 逐字「9 軌 **53:08**」 | **正確是 52:58**（3,178 秒）。**這個數字是本層上一輪回報時算錯、主線照抄的**——**錯在本層，不在主線** | 不影響形態閘（兩者都遠離 EP 區間）；已在第 3624 條更正 |
| 4 | 派工信第五節原句「**沒有 rgMbid 就得走 §1 人工，本線七批全部零人工，這一筆留給本機定**」 | **前提已由主線自己撤回**（有 rgMbid `b2295ebc-…`），本張已接進管線 | **本線七批維持零人工** ✔ |

### （四）交件版本認定

**以工作區當下的 `batch-progress/c172/prop-a.json`（3 筆）與本檔為交件版**（第 1803-B／2497／2712／3617 條）。
本層在本節把 `prop-a.json` 整份寫回磁碟 **1 次**（第 3 筆，照派工信「每做完 1 筆就整份寫回」；前兩筆各寫回 1 次，本檔合計 3 次）。
**「筆數對了」不等於「定稿了」**——定稿時點是 `chk-prop a` 標記 0、`dedup-crossbatch c172` 跨批撞卡 0、第 315 條結算 3＋0＝3 三者同時成立之後。
**本節以 append 寫入，未覆寫 3601–3617 任何一行；`prop-a.json` 原有兩筆除了第 3628 條（二）那一處補字外未動。**

---

## 附：第三列追加後的收工實跑

**`node batch-progress/c172/chk-prop.mjs a`**（2026-09-19，逐字）：

```
prop-a.json：3 張、3 位
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）
（已知，本機已擋：c49b 沈文程《心事誰人知》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：c49b 羅文《小李飛刀》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：cseab Sơn Ca《Băng nhạc Sơn Ca 8 (Tiếng hát Sơn Ca)》 ←→ c64；待本機標記後從 dedup-known.json 移除）

135 批（其中 1 批讀 prop）｜卡數 5335｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）

合計 3 張、3 位｜標記 0
```

**`標記 0`、`exit 0`** ✔。**第五道（盤名逐字撞 apex 王牌、掛名不同，report-only）本批 0 處。**

**`node batch-progress/dedup-crossbatch.mjs c172`**（單獨再跑一次，逐字）：

```
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）

1 批（其中 1 批讀 prop）｜卡數 3｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）
```

⚠ **`卡數 3` ＝ a 組 3 張，本批沒有 b 組**（`slice.json` 三列的 `g` 欄逐字都是 `"a"`）。
