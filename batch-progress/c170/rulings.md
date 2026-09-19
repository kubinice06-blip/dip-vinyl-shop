# c-170 裁定（Blue Note 1985 年後線・列舉漏切補批之三；a 組 8 張＋b 組 8 張，兩組同一棒）

本批與 `c168`／`c169` 都不是原始列舉切出來的，是 **2026-09-18 查出列舉腳本曲風判錯層級**之後的補批。
共用背景見 **`batch-progress/c169/rulings.md` 第 1557／1558／1559／1560-AD／1560-AE 條**
與 `batch-progress/CURATION-BRIEF-bluenote-post1985.md` 的 2026-09-18 附錄。
判準沿用 `CURATION-BRIEF-bluenote-post1985.md` → `CURATION-BRIEF-bluenote.md` 第〇節
→ `c131` → `c127` → `c126` → `c103plus` → `c93plus`，一字未改。
**本批是本線最小的一批（16 張，2020 年以後，唯一例外是 Kandace Springs 整組移進來的 2016／2018 兩張），兩組由同一棒做完。編號區間 2346–2400。**

---

## 第 2346 條（**總表**）：**16 張＝收 15 ／ 退 1；退的那一張是 c-169 a 第 2127 條已經先判好的**

| | 張 |
|---|---:|
| `slice.json` `g: "a"` | 8 |
| **`prop-a.json` 收件** | **7** |
| **a 組退件** | **1**（lophiile《The Good Days Between》，**非 Album 形態（EP）**） |
| `slice.json` `g: "b"` | 8 |
| **`prop-b.json` 收件** | **8** |
| **b 組退件** | **0** |
| **合計** | **15 收 ＋ 1 退 ＝ 16** ✔（第 315 條結算通過，見第 2399 條） |

**a 組收件 7 張**（依 `prop-a.json` 順序）：Kandace Springs《Soul Eyes》2016／《Indigo》2018／`_BY.ALEXANDER`《000 CHANNEL BLACK》2020／Joel Ross《Who Are You?》2020／Kandace Springs《The Women Who Raised Me》2020／R+R=NOW《R+R=NOW Live》2021／Joel Ross《The Parable of the Poet》2022。

**b 組收件 8 張**（依 `prop-b.json` 順序）：Joel Ross《nublues》2024／Out Of/Into《Motion I》2024／Maya Delilah《The Long Way Round》2025／Nate Mercereau, Josh Johnson & Carlos Niño《Openness Trio》2025／Out Of/Into《Motion II》2025／Paul Cornish《You're Exaggerating!》2025／FATHERS《FATHERS》2026／Joel Ross《Gospel Music》2026。

**15 張、9 個掛名字串**（`Kandace Springs` 3 張、`Joel Ross` 4 張、`Out Of/Into` 2 張，其餘 6 個各 1 張）。
**年份改判 0 筆、覆核成立 15 筆**（理由見第 2352 條）。

---

## 第 2347 條（a 組，**退件；照 c-169 a 第 2127 條執行，不重查、不翻案**）：**`lophiile《The Good Days Between》`（2023）退——非 Album 形態（EP），未落在 §5.5 白名單**

第 1560-AE 條把「收不收 EP」下放給 c-169 策展層，並要求「兩張一起決定」；**c-169 a 第 2127 條已判「EP 一律不收」，並在該條末段逐字指名：「`lophiile《The Good Days Between》`（2023，8 軌 17 分鐘）依同一判準退，理由分類相同。17 分鐘比本張還短，**不必再重查一次，照本條執行**」。** 本層照辦。

**本層只做一次形狀覆核（不是重查判準，是確認 slice 的數字沒有寫錯）**：

| 層 | 逐字 |
|---|---|
| **MB**（RG `5d29475f`，`release?release-group=…&inc=media+recordings`） | **轄下唯一一筆 release `2bf484bb`（2023-06-09 XW Digital Media），8 軌，逐軌 length 相加＝1,077,397 ms＝17 分 57 秒**（八軌逐字〈Player Shit〉〈On My 1's〉〈Off 2 Heaven〉〈Couldn't Let U Go〉〈Goldfoil〉〈In Some Way〉〈Red Giant〉〈Truth (outro)〉）；primary-type `Album`、secondary-types 空陣列；label-info 逐字 `Blue Note [713c4a95]` ＋ `No Tricks [cc2500ee]` |
| **Discogs**（`artist=lophiile` 全 release 掃描，第 1800-B 條的第二種查法） | **這張零命中**；同藝人只有一筆 2019 年的 **`Blue Note EP-LO-001-19`《To Forgive》，format 欄逐字 `CDr, EP, Promo`** |
| **Apple** | `lookup?upc=602455253248` 命中 **1688250303**，`trackCount` 逐字 8、releaseDate 逐字 `2023-06-09T07:00:00Z`、℗ 欄逐字 `No Tricks/Blue Note Records; ℗ 2023 UMG Recordings, Inc.`；**collectionName 沒有 `- EP` 尾碼** |

**判：退。理由分類：非 Album 形態（EP），未落在 §5.5 白名單（`electronic`／`hardcore-7inch`／`asia-mini-album`）。**

- **第 2127 條已預先處理掉唯一的反向訊號**：該條逐字寫「若 c-170 查到它的 Discogs `format` 欄逐字是 `Album` 而非 `EP`，**以時長為準仍判 EP**（17 分鐘沒有任何一條前例把它當 Album 收過）」。**本層查到的是更弱的情形——Discogs 上根本沒有這張碟的條目、Apple 也沒有 `- EP` 尾碼，也就是說「format 欄逐字 `EP`」這個訊號兩邊都取不到，只剩時長。17 分 57 秒。判 EP。**
- ⚠ **本批另一張 8 軌的碟（`FATHERS《FATHERS》`，27 分 17 秒）判的是 Album**——**分界在時長與 `format` 欄，不在軌數**（第 2127 條原文）。兩張的差別逐項見第 2348 條。
- ⚠ **退這張不傷本線的目錄深度**：lophiile 在池中 0 張、在 MB 的 Blue Note 目錄裡也只有這一張與 2019 年那張宣傳 EP，**本線因此不新立 `lophiile` 這個掛名字串**。若日後他有正規長度的專輯進批次，掛名照 MB RG credit 的全小寫 `lophiile`（MB `3320ab5f`，Person／US）。

---

## 第 2348 條（b 組，**裁定；可逆**）：**`FATHERS《FATHERS》`（8 軌 27 分 17 秒）判 Album 收下——形態閘的兩個訊號都不在 EP 那一側**

c-169 a 第 2133 條末段新立的「形態閘」要求「六句判準之前先看零售條目 `format` 欄有無 `EP`／`Single` 並實算總長」。**本張逐項跑過：**

| 訊號 | 本張（FATHERS） | 對照組：第 2127 條退掉的 Dr. John《Sippiana Hericane》 | 對照組：本批退掉的 lophiile |
|---|---|---|---|
| 軌數 | 8 | 7 | 8 |
| **實算總長** | **27 分 17 秒**（MB 逐軌 length 相加＝1,636,788 ms） | **25 分 25 秒** | **17 分 57 秒**（1,077,397 ms） |
| **Discogs `format` 欄** | **`CD (Album)`（37859667）／`Vinyl (LP/Album/Stereo)`（37844577）／`Vinyl (LP/Album/Limited Edition)`（37909314）——三筆都沒有 `EP`** | **逐字 `CD, EP`** | **Discogs 上沒有條目** |
| MB primary-type | Album | Album（第 2127 條已指出這一格與盤面不一致） | Album |
| 實體壓片 | **CD ＋ 兩款黑膠 LP** | CD | **無（純數位）** |

**判：收，`releaseType` 寫 `Album`。** 三個理由：

1. **第 2127 條原文的分界句逐字是「分界在時長與 `format` 欄，不在軌數」**——本張的 `format` 欄三筆全 `Album`、時長 27 分落在 Album 區間（該條的對照組 `Anna-Mari Kähärän Orkesteri` 同名盤是 7 軌 46 分判 Album，`Franco D'Andrea Quartet` 是 6 軌 77 分判 Album；**EP 那一側的兩個實例是 25 分帶 `EP` 欄、17 分無零售條目**）。
2. **有實體 LP 壓片**：兩款黑膠的 format 欄逐字都帶 `LP` 與 `Album`。**EP 不會壓成 LP。**
3. **可逆**：退回去只要把這一筆從 `prop-b.json` 移進退表，不動卡池結構。

⚠ **本條與第 2127 條不牴觸，是同一條規則的另一側。** 本層把三張並列記下來，是為了讓後批不必再把「8 軌算不算 EP」重算一次：**軌數不是判準，27 分是目前本線判 Album 的最短實例、25 分是判 EP 的最長實例。**

---

## 第 2349 條（**掛名總表**）：**9 個字串；照 MB RG artist-credit 原樣 9、沿用池中既有字串 1、收攏 0、新造分裂 0**

規則照 **c-168 第 2078 條**（本線 2026-09-19 的統一規則，明文適用於 c-168／c-169／c-170）：
**掛名照 MB RG artist-credit 原樣寫；當 MB 的群組實體與池中既有的個人字串是兩個不同實體時，兩個字串並存，不收攏、不合併。**
上游是 c-149 a 第 964 條、c-150 a 第 196／197 條，與 c-169 a 第 2128／2129 條、c-169 b 第 2188 條同向。
⚠ **派工信第三節第 6 點已把這一點寫對了**（逐字「個人字串與群組字串並存、不收攏；第 307 條『絕不新造分裂』防的是同一實體的多種寫法，不是不同實體的並存」）——**本批因此沒有出現 c-168／c-169 那種「派工信把第 307 條寫窄」的牴觸。**

| 掛名 | MB 實體 | 池中既有 | 處理 | 條 |
|---|---|---|---|---|
| **`Kandace Springs`** | `03c36fe6` **Person**／US | **0** | 新字串，本批三張共用（第 2350 條） | 2350 |
| **`Joel Ross`** | `6d09039b` **Person**／US（disambiguation 逐字 `US vibraphonist`） | **0** | 新字串，本批四張共用（第 2350 條） | 2350 |
| **`_BY.ALEXANDER`** | credited-name 逐字 `_BY.ALEXANDER`；**底層 artist 實體 `0d40af7f` 主名逐字 `Alex da Kid`**（Person／GB） | 0（四種字形都掃過） | **取 credited-name**（第 2351 條） | 2351 |
| **`R+R=NOW`** | `88e39d68` **Group**／US | **2 列 1 張**（c-169 b《Collagically Speaking》2018，卡單已建） | **一字不改沿用**（第 307 條） | 2349 |
| **`Out Of/Into`** | `897b9986` **Group**（area 欄空） | 0 | 新字串，本批兩張共用；**斜線是團名的一部分，不是斜線串接** | 2349 |
| **`Maya Delilah`** | `6b0d2727` **Person** | 0 | 新字串；MB 同名反查唯一實體 | — |
| **`Nate Mercereau, Josh Johnson & Carlos Niño`** | `900efa6c` ＋ joinphrase `, ` ＋ `37b60764` ＋ joinphrase ` & ` ＋ `f6e8d274`（三個 Person） | 0（三人個別字串亦 0） | **真並列聯名，依第 1539／1745-B 條取串接形**（第 2353 條） | 2353 |
| **`Paul Cornish`** | `104721c5` **Person**／US | 0 | 新字串；MB 同名反查唯一實體 | — |
| **`FATHERS`** | `8bda4e58` **Group**（disambiguation 逐字 `Nate Smith, Kiefer, CARRTOONS & Kenny Beats`） | 0 | 新字串；⚠ **MB 上另有四個同族 `Fathers` 實體**（第 2354 條） | 2354 |

### （一）`chk-prop` 的 `&`／`and` 盲區（第 611 條）已逐字串手查

`Out Of Into`、`Out of / Into`、`Nate Mercereau, Josh Johnson and Carlos Niño`、`Nate Mercereau & Josh Johnson & Carlos Niño`、`R+R=Now`、`RR=NOW`、`_by.ALEXANDER`、`Alex da Kid`、`Alexander Grant`、`Fathers`、`The Fathers`、`Nate Smith` 十二種替代寫法**在 seed 17,248 列、`desc-tools/batches/cards/` 全部卡單與各批 `prop-*.json`（含尚未上架的 c148–c169）皆 0 精確命中。**

### （二）新造分裂 0；收攏 0

**本批沒有任何一張出現「MB 的群組實體 vs 池中的個人字串」那種相撞**（c-168 第 2080 條的 `Ron Carter Trio`、c-169 b 第 2193／2194／2195 條的三筆）——**九個字串裡有八個在池中是全新的、第九個（`R+R=NOW`）逐字沿用**。

---

## 第 2350 條（**反同構條款與掛名判定，兩人各做一次；第 1558 條指定本批一次做完**）：**`Kandace Springs` 三張、`Joel Ross` 四張，各判一個字串**

第 1558 條把 Kandace Springs 整組移進本批，理由逐字是「她與 Joel Ross 是本線**卡池裡一張卡都沒有**的兩條線，整條落在同一批，**反同構條款與掛名判定各只需做一次**，也避開第 1418 條『同一位藝人被兩批各判一次掛名』的風險」。**本層照辦，兩人的掛名字串在此一次定完。**

### （一）`Kandace Springs` —— 四邊逐字一致，判 `Kandace Springs`

| 來源 | 逐字 |
|---|---|
| **MB RG artist-credit**（三張 RG 皆同） | 單一 Person 實體 `Kandace Springs`（`03c36fe6-ec96-402b-8366-5038f08c75db`，US）；**MB 同名反查只有這一個實體** |
| **Discogs**（三張合計 28 筆條目） | `artists` 欄逐字全是 `Kandace Springs`，無 anv、無消歧編號 |
| **Apple**（us／gb） | `artistName` 逐字 `Kandace Springs`；⚠ **jp 三店逐字是 `キャンディス・スプリングス`** |
| **slice.json** | `Kandace Springs` |

**判 `Kandace Springs`。** 片假名形進三張卡的 `queryAlias`。
⚠ **2026-08-11 東亞藝人名裁定（有漢字照漢字）不適用**：她是美國人，片假名是 Apple 日本店的音譯，不是本名（同 c-169 b 第 2197 條第 3 點的處理方向）。
⚠ **她 2022 年後的碟（《My Name Is Sheba》Subplay Creative、《Run Your Race》與《Lady in Satin》SRP Records）不是 Blue Note 發行，不在本線範圍**；2014 年那張同名 EP 依第 2347 條的 EP 規則不收。**→ 本批三張就是她完整的 Blue Note 目錄。**

### （二）`Joel Ross` —— 四邊逐字一致，判 `Joel Ross`；⚠ MB 有第二個同名實體

| 來源 | 逐字 |
|---|---|
| **MB RG artist-credit**（四張 RG 皆同） | 單一 Person 實體 `Joel Ross`（`6d09039b`，US，**disambiguation 逐字 `US vibraphonist`**） |
| ⚠ **MB 同名反查** | **另有 `02f84b16`（Person／US，disambiguation 逐字 `American pianist, conductor, choral arranger`）與 `aa237e30`（`Joel Ross-Adjie`，澳洲）**——依第 179／250／324 條核 type／area／disambiguation、**不看 score**，本批四張全部釘 `6d09039b` |
| **Discogs**（四張合計 18 筆條目） | `artists` 欄逐字全是 **`Joel Ross (3)`**——**括號裡的 `(3)` 是 Discogs 的同名消歧編號，不是掛名的一部分**（與 c-169 a 第 2128 條 `Jackie Allen (2)`、本批 `Josh Johnson (13)`／`Fathers (6)` 同形） |
| **Apple**（us／gb） | `artistName` 逐字 `Joel Ross`；⚠ jp 逐字 `ジョエル・ロス` |

**判 `Joel Ross`。** `Joel Ross (3)` 與片假名形進四張卡的 `queryAlias`。
⚠ **第 2 個同名實體是本批最容易誤判的一格**：那位是合唱指揮／編曲者，而本批第四張的盤名剛好是《Gospel Music》。**四張已逐字核過 artist id，全部是 `6d09039b`。日後那位進池要帶消歧。**
⚠ **反向適用**：Joel Ross 同時是 b 組《Motion I》《Motion II》那支 **`Out Of/Into`** 五重奏的顫音琴手——**那兩張的掛名是團名，不得收攏成 `Joel Ross`，`Joel Ross` 也不得因此改寫**（第 1131 條：不同編制各自成立）。

---

## 第 2351 條（a 組，**裁定；可逆；本批唯一一筆「MB 實體名 ≠ RG credited-name」**）：**`_BY.ALEXANDER` 取 RG credited-name，不取實體主名 `Alex da Kid`**

| 層 | 逐字 |
|---|---|
| **MB RG `5c6fb4ce` 的 artist-credit** | **成分的 `name`（credited-name）逐字 `_BY.ALEXANDER`**；**底下的 `artist.name` 逐字 `Alex da Kid`**（`0d40af7f`，Person／GB，disambiguation 逐字 `UK musician, record producer, songwriter, record executive & fashion designer`） |
| **Apple**（us／gb，`attribute=artistTerm`） | `artistName` 逐字 **`_BY.ALEXANDER`**（全大寫 BY）——見 1525818189〈TRUMPETS (feat. 070 Shake)〉、1525815464〈le merveilleux résumé〉、6776416122 |
| ⚠ **Discogs**（32272356／32972946／35705428） | `artists` 欄逐字 **`_by.ALEXANDER`**（小寫 by） |
| **slice.json** | `_BY.ALEXANDER` |

**判 `_BY.ALEXANDER`。** 三個理由：

1. **第 2078 條的規則句逐字是「掛名照 MB RG artist-credit 原樣寫」——`artist-credit` 指的就是 credit 那一層，不是底下的實體主名。** c-169 a 第 2129 條處理 `Paolo Fresu 5et` 時之所以**反過來**取實體名，是因為那裡的 credited-name 串接後會與**池中已建的卡單**分裂；**本例池中 0 張，沒有先例可撞，也就沒有那個反向理由。**
2. **實體層與店面層都用 `_BY.ALEXANDER`**：Apple 三筆逐字全大寫 BY，**二比一**壓過 Discogs 的小寫形。
3. **可逆**：只動卡單掛名欄。

⚠ **`Alex da Kid` 不寫進掛名欄，但要寫進 `queryAlias` 與 `mbNote`**——**這是「同一個 MB 實體的兩個名字」，不是兩個實體**，所以**不是**第 964 條講的並存；**日後若 Alex da Kid 的流行／製作人身分作品進池，那時才會變成同一實體的兩個字串並存，依第 196／197 條不得事後合併本卡。**
⚠ **`slice.json` 的 `country: "AF"` 照抄了 MB 的建檔誤值**（MB release `dc0d7e17` 的 country 欄逐字 `AF`，實際是 XW 全球數位發行）——**已寫進卡的 `risk`，下游不得據以寫發行地。**

---

## 第 2352 條（**年份**）：**改判 0 筆、覆核成立 15 筆——⚠ 但第 1800-B 條的第二種掃描仍然有用，15／15 張補出 MB 沒建的版本，其中 3 張是「MB 連 barcode 都沒有，第一種查法根本跑不起來」**

### （一）為什麼本批一筆都沒改

**這 15 張全部是 2016–2026 年的現役目錄，四層的日期粒度都到「日」，而且互相對得上**：MB `first-release-date`／Discogs 原壓群的 `released` 欄／Apple `releaseDate`／℗ 欄。
**與 c-168（3 改）、c-169（3 改）最大的差別是：那兩批改判的六筆全部出在「日版先發、MB 沒建日版」（`TOCJ-`／`UCCQ-` 號段），而本批查到的六張日版全部與歐美同日或更晚。**

| 本批查到的 MB 沒建的日版 | Discogs `released` 逐字 | 歐美首發 | 差 |
|---|---|---|---|
| Kandace Springs《Soul Eyes》`UCCQ-1063` | **2016-07-01** | 2016-06-24（美版） | **晚 7 天** |
| Kandace Springs《Indigo》`UCCQ-1087` | **2018-09-07** | 2018-09-07 | 同日 |
| Kandace Springs《The Women Who Raised Me》`UCCQ-1118` | **2020-03-27** | 2020-03-27 | 同日 |
| R+R=NOW《R+R=NOW Live》`UCCQ-1132` | **2021-02-12** | 2021-02-12 | 同日 |
| Out Of/Into《Motion I》`UCCQ-1215` | **2024-12-10** | 2024-12-06 | **晚 4 天** |
| Maya Delilah《The Long Way Round》`UCCQ-1216` | **2025-03-28** | 2025-03-28 | 同日 |

**→ 第 1696 條（「Somethin' Else／東芝EMI／EMI Music Japan 的碟，年份一律先假設日本比歐美早半年到一年」）在 2016 年以後不再成立。**
**根因可解釋：UMG 接手後全球同步發行成為常態，`UCCQ-` 是 Universal Music LLC（日本）的同步配號，不是東芝EMI 時代的先行配號。給後批：`TOCJ-` 要查、`UCCQ-` 在 2015 年以後可以只當版本補正，不必當年份風險。**

### （二）三層對不上但不影響年份的 2 筆

| 卡 | 分歧 | 處理 |
|---|---|---|
| **Joel Ross《Who Are You?》** | MB frd 與 Discogs 三筆逐字 **2020-10-23**；**Apple us／gb／jp 同一 id 1528266505 的 releaseDate 逐字 `2020-11-23T08:00:00Z`（晚一個月）** | **二比一取 2020-10-23**，年份不變 |
| **Joel Ross《nublues》** | Apple ℗ 欄逐字 **`℗ 2023`**（發行是 2024-02-09）；Discogs notes 逐字說明只有標題曲是 ℗2023（先行單曲〈nublues (fade)〉2023-12-08） | **第 1601 條：℗ 不是年份證據**，取 2024 |

⚠ **第 1447 條（Apple 年初佔位日 `-01-01`）在本批 0 次**——**15 張的 Apple releaseDate 全部是精確日**。這與 c-169 b（應驗 5 次）差很多，原因是本批全是 2016 年以後的碟。

### （三）⚠ 廠牌官網的年份不可信，本批踩到 1 次

**`Maya Delilah《The Long Way Round》`**：bluenote.com 藝人頁的摘讀把首發寫成「March 28」**2024**、Deluxe 寫成 **2025**-01-09；**四層一手資料（MB frd 2025-03-28／Discogs 五筆全 2025／Apple 1793003921 逐字 `2025-03-28T07:00:00Z`／Apple Deluxe 1868490452 逐字 `2026-01-08`）整整差一年。**
**→ 簡報第二節把「廠牌新聞稿」排在階序最前面，但那指的是**同期**的新聞稿；藝人頁是持續改寫的頁面，年份不可當一手依據。**已寫進該卡 `risk`。**

---

## 第 2353 條（b 組，**掛名裁定**）：**`Nate Mercereau, Josh Johnson & Carlos Niño` 取 MB 串接形——這一筆是真並列聯名，第 1539 條的前提成立**

| 來源 | 逐字 |
|---|---|
| **MB RG `1df797df` artist-credit** | **三個成分**：`Nate Mercereau`（900efa6c，Person，disambiguation 逐字 `US guitarist and songwriter`）＋joinphrase 逐字 **`, `**、`Josh Johnson`（37b60764，Person／US，disambiguation 逐字 `saxophone, keyboards, composer, USA, member of Holophonor`）＋joinphrase 逐字 **` & `**、`Carlos Niño`（f6e8d274，Person／US） |
| **Apple**（us／gb，1809012204） | `artistName` 逐字 **`Nate Mercereau, Josh Johnson & Carlos Niño`**——**與 MB 串接形逐字相同** |
| ⚠ **Discogs**（34564816／34587931／34843727） | `artists` 欄逐字 `Nate Mercereau ,Josh Johnson (13) ,Carlos Niño`——**三格逗號串接、沒有 `&`** |
| **slice.json** | `Nate Mercereau, Josh Johnson & Carlos Niño` |

**判 `Nate Mercereau, Josh Johnson & Carlos Niño`（MB＝Apple，二比一）。** Discogs 的無 `&` 形與三人個別字串都進 `queryAlias`。

### ⚠ 為什麼這一筆適用第 1539 條，而 c-169 a 第 2129 條那一筆不適用

**第 1745-B 條更正後的判準句逐字是「**並列聯名**的連接形，取 MB `credited-name` 與 joinphrase 串接出來的那一種」——「並列聯名」四個字是條件。**

| | 本例 | c-169 a 第 2129 條的 `Paolo Fresu 5et Plays the music of X` |
|---|---|---|
| 第二／三格的身分 | **三位共同領班**（Discogs credits 欄逐字：Mercereau 吉他／合成器／取樣＋製作＋混音，Johnson 中音／長笛／取樣器，Niño 打擊／鈸／貝殼／鑼；**三人共同 Written-By**） | 第二格是**作曲者兼團員**（Cipelli 是本團鋼琴手、Fioravanti 是鼓手） |
| joinphrase | **逐字 `, ` 與 ` & `——純連接符** | **逐字 ` Plays the music of `——一句盤名片語** |
| 店面 | **Apple 逐字就是串接形** | Apple 逐字是裸名 `Paolo Fresu`、Discogs 把那句話印在 `title` 欄 |
| 池中先例 | 0（三人個別字串亦 0） | c-160 b 已建卡單 `Paolo Fresu Quintet` |

**→ 前提成立，取串接形。** ⚠ **三人的個別字串日後若各自進池，與本卡的串接形並存、不得事後合併**（第 964／196／197／1131 條）。
⚠ **`Josh Johnson` 是極常見人名**（Discogs 已用到 `(13)` 這個消歧編號）——**日後他的裸名領班盤進池務必帶 MB artist id `37b60764` 區分**（第 179／250 條）。
⚠ ⚠ **他同時是本批 b 組《Gospel Music》的側人**（Joel Ross 六重奏的中音）——**兩張是不同的碟、不同的掛名主體，不是撞卡**，已在兩張卡的 `risk` 互指。

---

## 第 2354 條（b 組，**同名實體核對**）：**`FATHERS` 在 MB 上有五個同族實體，本卡釘 `8bda4e58`**

依第 179／250／324 條核 `type`／`area`／`disambiguation`，**不看 score**：

| MB artist | 字串逐字 | type／area | disambiguation 逐字 | 落點 |
|---|---|---|---|---|
| **`8bda4e58-1876-4f99-939c-362e57f7c04e`** | **`FATHERS`（全大寫）** | **Group**／area 空 | **`Nate Smith, Kiefer, CARRTOONS & Kenny Beats`** | **本卡《FATHERS》2026** |
| `4d9e78ff` | `Fathers` | Group／**US** | `post-hardcore band` | 未進任何 slice |
| `aec4b5f5` | `Fathers` | Group | `Toronto punk band` | 未進任何 slice |
| `08fbe163` | `Fathers` | Group／**FR** | `techno duo Jeremy Labille and Pieree Matelli` | 未進任何 slice |
| `c8a987d3` | `Fathers Day` | Group | — | 未進任何 slice |

⚠ **`chk-prop` 的折鍵會把大小寫壓掉**（`k()` 逐字是 `toLowerCase()` 再剝非字母數字），所以 `FATHERS`／`Fathers` 在卡池比對上是**同一個鍵 `fathers`**。**已人工掃過 seed 17,248 列與全部待上架批次：`fathers|fathers` 這個複合鍵 0 命中**（子字串命中的 `Father MC —《Father's Day》`、`Muddy Waters —《Fathers and Sons》`、`丸山繁雄 —《A Young Father's Song》` 三筆逐筆核完全是別碟）。**日後若上面那三支同名團的碟進池，兩張卡會共用同一個掛名鍵——那時要靠年份與 `mbNote` 的 artist MBID 區分**（形狀同 c-169 b 第 2190 條記的 `Blue Note All-Stars` 那一格）。

---

## 第 2355 條（b 組，**⚠ ⚠ `slice.json` 的 `note` 寫錯了一句；第 1796-B／1805-B 條在本批應驗**）：**`FATHERS《FATHERS》` 與 c-167 b 的 `Nate Smith《Fathers》` 是同一張碟，不是「同名不同碟」**

`c170/slice.json` 該筆的 `note` 逐字寫：

> 「⚠ 盤名 `FATHERS` 撞 `batch-progress/c167/slice.json` 的 Nate Smith 條目（**同名不同碟**）。」

**實況相反。** c-167 b **第 2024 條**已經逐項查實並把 `Nate Smith《Fathers》`（MB RG `6391b52e-fa14-4a9a-88d8-0e51d9b65244`）**退件**：

| 對得上的欄 | 逐字 |
|---|---|
| 目錄號 | **兩邊同為 `00199957415965`**（Discogs 37859667） |
| 發行日 | **兩邊同為 2026-07-10** |
| 廠牌 | **兩邊同為 Blue Note** |
| 軌數 | **兩邊同為 8** |
| 官網 | `bluenote.com/introducing-fathers-featuring-kenny-beats-kiefer-carrtoons-nate-smith/` 逐字「**FATHERS, the self-titled debut by a collective**」 |
| Apple | `6779502137` 的 collectionName 逐字 `FATHERS`、℗ 欄逐字「**℗ 2026 FATHERS**, under exclusive license to UMG Recordings, Inc.」 |

**→ MB 把四人合作團建成其中一位團員（Nate Smith）的個人作，而且另外建了一個 RG。這是第 611 條盲區三（MB 把同一張碟建成兩個 RG）在本批的唯一一次命中；`chk-prop` 的 rgMbid 掃描不會亮，因為兩個 RG 只有一個在清單裡。**
**本卡照第 2024 條與派工信第二點執行：釘 `458ef48c`、掛名 `FATHERS`、盤名《FATHERS》、`selfTitled: true`。**

⚠ **派工信第二點在這件事上是對的、`slice.json` 的 `note` 是錯的**——**依派工信第一節「原文勝過本信」的反向情形：這次是派工信勝過輸入檔。** 兩者相左時的順位仍照原文（c-167 rulings 第 2024 條），而它與派工信同向。

### ⚠ 本批 `note` 欄的其餘數量／範圍斷言，逐筆重掃的結果（第 1796-B 條要求）

| slice `note` 的斷言 | 實掃 | 判 |
|---|---|---|
| **Kandace Springs「她整條 Blue Note 線一張都沒進過批次」** | seed 0 列、全部卡單 0 張、各批 `prop-*.json` 0 張 | **✔ 成立** |
| **Joel Ross「本批共四張 Joel Ross 全在 unknown 裡」** | 四張確實都在 `blue-note-unknown-genre` 名單裡；**但他的 Blue Note 目錄是五張，見第 2356 條** | **✔ 成立但不完整** |
| **Joel Ross《Who Are You?》「盤名撞池中 The Who《Who Are You》，非同碟」** | seed 逐字有 `The Who —《Who Are You》(1978)`（**非 apex 王牌**），掛名不同 | **✔ 成立** |
| **lophiile「Discogs 零命中（數位發行）」** | `artist=lophiile&release_title=The Good Days Between` 回 0；`artist=lophiile` 單欄只回一筆 2019 宣傳 EP | **✔ 成立** |
| **`_BY.ALEXANDER`「Discogs 亦有 2024 年的 Blue Note 3509156 再版」** | Discogs 32972946，released 逐字 `2024-08-27` | **✔ 成立** |
| **Out Of/Into《Motion I》「日本壓 UCCQ-1215」** | Discogs 32758233／34949084 | **✔ 成立** |
| **Maya Delilah「MB genres 空、tag 只有 alternative；Discogs style 欄有 Soul-Jazz」** | 逐字相符 | **✔ 成立** |
| **FATHERS「盤名撞 c167 的 Nate Smith 條目（同名不同碟）」** | **同一張碟** | **❌ 錯，見本條** |
| **《nublues》「列舉檔 catno `5837662` 反查會撞 Pro-Zak Trax 的 583 766-2」** | 第 1250 條成立；真正的目錄號是 `00602458376623` | **✔ 成立** |

**→ 九筆斷言 8 對 1 錯。** 命中率比 c-168（1／1 錯）、c-169（3／3 錯）好很多，**但錯的那一筆是本批最關鍵的一筆（它會讓策展層把兩個 RG 當成兩張碟）。第 1796-B 條「一律要自己重掃」的成本本批再一次划算。**

---

## 第 2356 條（**⚠ ⚠ 給主線的回頭查；本批最重要的一個線外發現**）：**`Joel Ross《KingMaker》(2019)` 是他的 Blue Note 首作，卻完全不在 `enum/blue-note.json` 的 1,812 列裡——這是與第 1557 條**不同**的第二種列舉缺口**

### （一）事實

- **bluenote.com 的 Joel Ross 藝人頁逐字列出他的五張 Blue Note 專輯**：`KingMaker`（2019）／`Who Are You?`（2020）／`The Parable of the Poet`（2022）／`nublues`（2024）／`Gospel Music`（2026）。**本批收的是後四張。**
- **`batch-progress/enum/blue-note.json` 的 1,812 列裡，`Joel Ross` 只有四筆**（本批這四張），**`KingMaker` 一個字都沒有。**
- **池中亦 0**（seed 17,248 列、全部卡單、各批 `prop-*.json` 逐字掃過）。
- **MB 上它存在**：release `0d190bc8-…`（2019-05-03，US，title 逐字 `KingMaker`），release-group `6cd0a509-b96a-40cc-a807-7b6025bc2a99`。

### （二）⚠ 根因與第 1557 條不同

**第 1557 條那 97 張是「曲風判錯層級」——它們在列舉檔裡，只是 `genre` 被判成 `unknown`。本張根本不在列舉檔裡。**
**實查原因：MB 那筆 release `0d190bc8` 的 `label-info` 逐字是空陣列。** 列舉腳本是**以 label 為軸**把 Blue Note 的 release 拉完再折成 RG 的——**一筆沒有 label-info 的 release，label 軸永遠碰不到它，那個 RG 就整個不存在於列舉檔裡。**
**`arid:6d09039b`（Joel Ross 本人）的 release-group 端點回 `count: 0`**，也就是說連從藝人端補也補不到（MB 的 RG 與 artist 的關聯在這一筆上同樣殘缺）。

### （三）⚠ 這是「失敗與正常長得一樣」在列舉層的**第三種**形狀

第 1557 條記了兩種（artist 端讀曲風、`unknown` 與「沒問」同形），c-168 第 2088 條記了第三種（`note` 的「僅 XX 盤」），c-169 第 2146／2209 條記了第四種（barcode 反查碰不到 MB 沒建的版本）。
**本條是第五種：「label 軸拉不到 label-info 為空的 release」——而且它比前四種更隱蔽，因為缺的那一張在列舉檔裡連一列都沒有，任何對列舉檔做的檢查（曲風、`inPool`、`chk-prop`、`dedup-crossbatch`）都不會亮。**

### （四）建議（雲端無權重跑列舉，只能建議）

1. **本機對 `enum/blue-note.json` 做一次「藝人補掃」**：對已經進過本線的每一位掛名，回問 MB 的 artist 端 release-group 列表，比對列舉檔有沒有漏。**本條這一張就是這樣查出來的。**
2. ⚠ **同一支腳本產出的其他廠牌線可能有同樣的缺口**——與第 1557 條末段的建議同向，但**這一種缺口用 `release-group?inc=genres+tags` 重跑是補不到的**，必須改軸。
3. **c-169 b 第 2208 條末段給主線的兩個回頭查（`Kendrick Scott Oracle《A Wall Becomes A Bridge》(2019)`、`The Blue Note 7` 的重複 RG `770967e1`）本層一併重申**——**`A Wall Becomes A Bridge` 與本條的 `KingMaker` 同為 2019 年、同樣不在任何 slice 上，很可能是同一種缺口。**

---

## 第 2357 條（**六句判準（甲～己）逐張跑過**）：**(甲) 0、(乙) 0、(丙) 0、(丁) 0、(戊) 0、(己) 0，另加形態閘退件 1**

| 句 | 成立 | 說明 |
|---|---:|---|
| **(甲) 從未發行過 → 收** | **0** | 依第 1734 條看 Discogs `format` 欄有沒有 `Reissue`／`Compilation`：15 張收件的零售原壓 `format` 欄逐字全是 `CD, Album`／`Vinyl, LP, Album`（或加 `Stereo`／`Limited Edition`／`Promo`），**無一筆帶 `Reissue`**。**2016–2026 這一段沒有庫藏首發。** |
| **(乙) 母體在 BN／Liberty／UA／Solid State → 退** | **0** | 15 張的錄音年全部在 2015 年以後，本線 0 再發盤。**唯一一筆帶 `Reissue` 性質的是 `_BY.ALEXANDER` 2024 年的 Blue Note 黑膠 `3509156`——那是本碟自己 2020 年數位版的實體化，同 RG、同 11 軌，不另立卡** |
| **(丙) 母體在真正的他廠 → 收、`year` 取他廠版** | **0** | **訊號亮 2 次，全部不成立**（見下） |
| **(丁) 部分重疊／形狀不同 → 收** | **0** | 本批沒有「主體是舊錄音」的碟；最接近的是《The Women Who Raised Me》（全翻唱盤），但十二軌全是 2019 年的新錄音，形狀是第 2092／2187 條那一族，判 Album 不判 (丁) |
| **(戊) Pacific Jazz／Capitol Jazz／West Coast Classics／Roulette Jazz 再發系列 → 退** | **0** | 四條復刻線本批 0 筆；`Blue Note Compagnie`（`BNS-`）與 `Blue Note Digital`（label `0293ae5c`、barcode 810211 段）亦 0 筆。逐張閘門見第 2358 條 |
| **(己) 載體只有影像 → 退** | **0** | 15 張全部有 CD 或黑膠或數位音訊主體，無 DVD／Blu-ray only |
| ⚠ **形態閘（c-169 a 第 2133 條末段新立，不在六句裡）** | **退 1** | **lophiile《The Good Days Between》（EP，8 軌 17 分 57 秒）**——第 2347 條 |

### ⚠ (丙) 的兩次訊號，逐一為什麼不成立

| # | 卡 | 訊號 | 查完 |
|---|---|---|---|
| 1 | **`_BY.ALEXANDER《000 CHANNEL BLACK》`** | **Discogs 32272356 的廠牌鏈第二格逐字 `_by.ALEXANDER records.`**（藝人自營廠牌） | **第 1748 條列的第一種假陽性（藝人自己的名義），一律過閘**；**第一格逐字就是 `Blue Note Records`**，MB label-info 逐字 `Blue Note [713c4a95]` |
| 2 | **`FATHERS《FATHERS》`** | **Discogs 37859667 的廠牌鏈第二、三格逐字 `Fathers`**（團名本身當廠牌）；Apple ℗ 欄逐字 `℗ 2026 FATHERS, under exclusive license to UMG Recordings, Inc.` | **同第一種假陽性**；**第一格逐字 `Blue Note`**，MB label-info 逐字 `Blue Note [713c4a95]` |

⚠ **本批沒有出現「碟先在別家發、Blue Note 後來才拿到」的真 (丙)**——與 c-169 a 第 2133 條的結論同向。

---

## 第 2358 條（**imprint 前置閘**）：**15 張全過；⚠ 新記一個 MB label 實體 `Blue Note Records [d3865f1e]`＝控股實體，不是第 1631 條要退的部門名**

**分界逐字照第 1560-AE 條：「有沒有任何一版真的掛過 Blue Note」。**

- **MB `label-info` 逐字 `Blue Note [713c4a95-6616-442b-9cf6-14e1ddfd5946]`（正規 imprint）的：15 張全部**（每張至少一筆 release）。
- **Discogs 廠牌鏈第一格逐字 `Blue Note` 或 `Blue Note Records` 的：15 張全部。**
- ⚠ **`Blue Note Label Group [2eb19785]`（第 1631 條點名的 EMI 部門名）在本批出現 0 次。**
- ⚠ **`Blue Note Compagnie`（`BNS-` 目錄號）與 `Blue Note Digital`（MB label `0293ae5c`、barcode 810211 段）本批 0 次。**

### ⚠ 新記的一格：`Blue Note Records [d3865f1e-ae0c-4a97-99b9-016966d49cb5]`

**`Kandace Springs《The Women Who Raised Me》` 的 XW 數位 release `3227545b` 的 label-info 逐字是這一個實體，不是平常的 `713c4a95`。** 實查該 label 端點：

> **`type` 逐字 `Holding`、`area` 逐字 `New York`、`life-span.begin` 逐字 `1939`、
> `disambiguation` 逐字 `this is the record company; for release labels use its imprint “Blue Note”`。**

**→ 這是同一家公司的控股實體（MB 自己在 disambiguation 裡指回 imprint `Blue Note`），不是部門名、不是冒名廠牌。過閘。**
**與第 1631 條要退的那個形狀的分界**：`Blue Note Label Group [2eb19785]` 是**EMI 2006 年起涵蓋 Manhattan／Narada／Angel 的部門**（一個實體蓋住多個 imprint）；`Blue Note Records [d3865f1e]` 是**同一個 imprint 的母公司**。**判準仍是看 MB 的 label type 與 disambiguation，不是看名字長短**（與 c-169 a 第 2134 條末段新立的 `Blue Note <國名>` 那一句同向）。
⚠ **同 RG 另兩筆 release 逐字就是 `Blue Note [713c4a95]`，所以本張即使照最嚴格的讀法也過閘。**

### ⚠ 同集團母體出現在廠牌鏈上、依第 1753(4)／1770 條不成立假陽性的：11 張

`UMG Recordings, Inc.`（Joel Ross 四張、Out Of/Into 兩張、Maya Delilah、Openness Trio、Paul Cornish、FATHERS）、`Capitol Records, LLC`（Kandace Springs《The Women Who Raised Me》《Indigo》美加黑膠、R+R=NOW）、`Universal International Music B.V.`（Kandace Springs《Indigo》歐版、Joel Ross《Gospel Music》）、`Universal Classics & Jazz`（Out Of/Into 日本盤）、`SRP Records`（Kandace Springs 三張的共同掛名——**是她自己的製作團隊 Evan Rogers／Carl Sturken 的廠牌，第 1748 條第一種假陽性**）、`Decca`（Kandace Springs 歐版與東南亞版的發行公司欄）、`No Tricks`（lophiile，已退）。

---

## 第 2359 條（**合輯風險逐張核；判為合輯 0**）：**一張全翻唱盤與兩張「全明星團新錄音」細判過**

簡報第一節第 2 點要求「盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的一律細看；判準只讀逐張文案與軌目來源，不讀標題、不看尾碼」。
**本批 15 張沒有任何一張的盤名帶那些字眼；MB 的 `secondary-types` 逐字 15 張全部是空陣列、`Compilation` 0 張；Discogs 全部條目的 `format` 欄也沒有一筆帶 `Compilation`。** 三張形狀可疑的細判過：

| 卡 | 可疑處 | 判定 |
|---|---|---|
| **Kandace Springs《The Women Who Raised Me》** | **十二軌全部是翻唱**（Diana Krall〈Devil May Care〉／Ella Fitzgerald〈Angel Eyes〉／Nina Simone〈I Put a Spell on You〉／Sade〈Pearls〉／Lauryn Hill〈Ex-Factor〉／Bonnie Raitt〈I Can't Make You Love Me〉／Astrud Gilberto〈Gentle Rain〉／Billie Holiday〈Solitude〉〈Strange Fruit〉／Roberta Flack〈Killing Me Softly〉……），盤名又像致敬企劃 | **Album。** 十二軌是 2019 年 Springs 自己的新錄音（Discogs 15005394 credits 欄逐字同一組班底、同一位製作人 Larry Klein）；MB primary-type `Album`、secondary-types 空；Discogs 七筆 format 欄逐字全 `CD, Album`／`Vinyl, LP, Album`。**形狀與第 2092 條（《Superblue 2》重訪自家曲庫）、第 2187 條（The Blue Note 7 翻奏盤）完全相同：重訪曲庫是企劃方向，不是把舊錄音集合起來。**⚠ **正文不得寫成「收錄爵士名伶的經典錄音」。** |
| **Out Of/Into《Motion I》《Motion II》** | 「廠牌 85 週年全明星團」的形狀，與第 2187 條那張《Mosaic: A Celebration of Blue Note Records》同族（那張的 2 CD 版真的掛 `Compilation`） | **兩張都是 Album。** 十三軌全部是團員原創（兩張的 Discogs credits 欄逐字都把五人列為 Producer／Written-By），**沒有任何一軌是舊母帶**；**MB 上兩張各只有一個 RG，沒有第 2187 條那種「同碟兩個 RG、其中一個掛 Compilation」的情形**（已逐一核過 rgMbid）。⚠ **唯一的舊曲是《Motion I》日本盤的 bonus〈Infant Eyes〉（Wayne Shorter），那是 bonus 不是原盤軌。** |

⚠ **第 782 條（Discogs 的 `format` 欄會錯）本批中 1 次，但方向是「欄位空」不是「標錯」**：**Paul Cornish 美版 CD 34964609 的 `format` descriptions 整格空**（既沒有 `Album` 也沒有 `EP`）——**形態閘改看歐版 35508061（逐字 `CD, Album`）＋ 9 軌 42 分的實測時長。**
⚠ **c-169 a 第 2141 條新立的那一句（Apple 的 `artistName` 欄不可拿來判合輯）本批沒有機會適用**：15 張的 Apple `artistName` 沒有一筆是 `Various Artists`／`Multi-interprètes`。**派工信第八點提醒的那一格本批 0 次。**

---

## 第 2360 條（**現場盤**）：**1 張是現場，但 MB 漏標——第 397／1771 條第 1 點在本批應驗一次**

| 卡 | MB `secondary-types` | slice `live` | 其他三層 | 判 |
|---|---|---|---|---|
| **R+R=NOW《R+R=NOW Live》** | **逐字空陣列（漏標）** | **逐字 `false`（照抄 MB）** | **盤名逐字帶 `Live`**；**Discogs 歐版 17400898 的 notes 逐字 `Recorded at Blue Note Club, New York, NY.`**；**Apple 1548059327 的 collectionName 逐字帶 `(Live)`**；7 軌 72 分（末軌〈Resting Warrior〉25:21） | **是現場盤** |

**處置**：**`releaseType` 仍照 MB 的 `primary-type` 寫 `Album`**（第 1797／2139 條的既有寫法，與 c-164《8: Kindred Spirits (Live From the Lobero)》一致），**現場身分寫進卡的 `risk` 與 `queryAlias`**。
⚠ **正文必須寫成現場盤**：錄音是 2018 年 10 月在紐約 Blue Note 俱樂部的駐演，**發行年 2021 不是錄音年**。
⚠ **另外 14 張的 `secondary-types` 逐字都是空陣列，且四層核完確實都不是現場**——**第 1771 條第 3 點（盤名帶 Live 卻不是現場）本批 0 次。**
⚠ **c-169 b 第 2199 條記的第四種形狀（notes 帶 `live` 卻不是現場）本批 0 次。**

---

## 第 2361 條（**曲風**）：**`['jazz']` 10 張、兩層 5 張；因曲風退件 0；⚠ 兩格是本批最弱的證據**

| 組合 | 張 | 名單 |
|---|---:|---|
| `['jazz']` | **10** | Joel Ross 四張（Who Are You?／The Parable of the Poet／nublues／Gospel Music）／Kandace Springs《The Women Who Raised Me》／Out Of/Into 兩張／Openness Trio／Paul Cornish |
| `['jazz','soul']` | **4** | Kandace Springs《Soul Eyes》《Indigo》／R+R=NOW《R+R=NOW Live》／FATHERS |
| `['jazz','electronic']` | **1** | `_BY.ALEXANDER《000 CHANNEL BLACK》` |

**四條取捨規則（沿用 c-169 b 第 2203 條，一字不改）：**

1. **`contemporary jazz`／`post-bop`／`instrumental jazz`／`soul-jazz`／`smooth jazz`／`jazz-funk`／`avant-garde jazz`／`cool jazz`／`fusion`／`free improvisation` 等子類一律不跟**（第 1572 條，十個合法值裡沒有它們）。**本批中這些子類出現 20 次以上，一次都沒跟。**
2. **`r&b`／`hip hop`／`funk / soul`／`soul-jazz`／`jazz-funk` 折進 `soul`，不開 `hiphop`**——**Glasper 圈的既有先例**（seed《Black Radio》《In My Element》、c-162《Black Radio 2》《Live Today》、c-163《The Second》《ArtScience》《Nihil Novi》、**c-169 b《Collagically Speaking》**的 `genres` 欄逐字全部是 `["jazz","soul"]`）。**本批的 R+R=NOW 與 FATHERS 同判。**
3. **Discogs 條目之間打架時取交集**，MB 空欄時只讀 Discogs。
4. **非曲風的分類欄與雜誌標記不跟**：`jazzthing 160`／`jazzthing 162`／`jazzthing.de`／`ph_temp_checken`（本批四張的 MB tags 有這些）、Maya Delilah 的 MB tag `alternative`。

### ⚠ 兩格最弱的證據，逐一寫明（都可逆）

| 卡 | 判 | 為什麼弱 |
|---|---|---|
| **`_BY.ALEXANDER《000 CHANNEL BLACK》`** | `['jazz','electronic']` | **MB 的 genres／tags 都是空陣列；Discogs 兩筆條目的 genre 逐字都只有 `Jazz`、style 欄整格空。** `electronic` 取自 slice 的人工判定（逐字「modern jazz／electronic」）＋第三方樂評（hypebeast／INFINIT 逐字描述電子元素）＋**同藝人另一張 Discogs 條目 35705428 的 genre 逐字 `Electronic, Hip Hop, Jazz`**。**本機審稿可退成 `['jazz']`。** |
| **`Maya Delilah《The Long Way Round》`** | **`['jazz','soul']`** | **Discogs 五筆裡四筆的 genre 逐字 `Jazz, Funk / Soul, Pop`、一筆逐字 `Jazz, Pop`。嚴格取交集會得到 `Jazz + Pop`**，但 `Funk / Soul` 出現 4／5、style 欄的 `Soul-Jazz` 與 `Soul` 也出現 4 次，slice 的人工判定逐字是「soul-jazz／neo-soul」。**判 `['jazz','soul']`，`pop` 刻意不跟（不賭第三格，同第 2203 條第 3 點對 Sarah McCoy 的處理）。本機審稿可改成 `['jazz','pop']`，可逆。** |

⚠ **第 1559 條的「邊界張」在本批落 1 張**（`Maya Delilah《The Long Way Round》`，slice 逐字標「⚠ 邊界張，可逆」）——**照收，本層沒有拿曲風退任何一張。**
⚠ **`Kandace Springs` 三張的曲風不一致是刻意的**：前兩張 `['jazz','soul']`（MB genres 逐字都有 `r&b`、Discogs style 逐字都有 `Soul-Jazz`），**第三張《The Women Who Raised Me》判 `['jazz']`**——那一張的 MB genres 逐字只有 `jazz:1`、Discogs 七筆 genre 逐字全 `Jazz` 且 style 欄整格空，**四邊都沒有 `r&b`／`soul` 的訊號**。**這不是第 1418 條講的批內不一致（那指的是同一張碟或同一支團被判兩次），是三張碟的證據本來就不同。**
⚠ **`Joel Ross《Gospel Music》` 的盤名叫《Gospel Music》但曲風不折成別的**：`gospel` 不在十個合法值裡，十七軌是爵士六重奏的原創演奏。

---

## 第 2362 條（**第 1800-B 條的第二種掃描**）：**15 張全部補出 MB 沒建的版本，年份改判 0；⚠ 但有 3 張是「MB 連 barcode 都沒有，第一種查法完全跑不起來」**

### （一）兩種查法的實跑結果

**第一種**：`api.discogs.com/database/search?barcode=<MB 每一筆 release 的 barcode>`。
**第二種**：`api.discogs.com/database/search?artist=<掛名>&release_title=<盤名>&type=release&per_page=50`。

| 結果 | 張 | 名單 |
|---|---:|---|
| **改年份** | **0** | — |
| **補出 MB 沒建的版本、年份不變** | **15**（全部） | 見下表 |
| ⚠ **MB 的 release 全部沒有 barcode，第一種查法根本跑不起來** | **3** | **`Joel Ross《nublues》`**（兩筆 release 的 barcode 欄都空）／**`Out Of/Into《Motion I》`**（唯一一筆，barcode 與 catno 都空）／**`FATHERS《FATHERS》`**（唯一一筆，barcode 與 catno 都空） |
| ⚠ **MB 的 barcode 欄空、第二種掃描補出實體版本的還有** | **2** | `Kandace Springs《Indigo》`（兩筆 release 的 barcode 欄都空）／`Kandace Springs《The Women Who Raised Me》`（US CD 那筆的 barcode 欄空） |

| 卡 | 第二種掃描補到的 MB 沒建的版本 |
|---|---|
| Kandace Springs《Soul Eyes》 | **日本盤 `UCCQ-1063`** ＋美版 LP `B002518801` ＋歐版 LP ＋加拿大版 ＋東南亞版 ＋**四張宣傳 CDr** |
| Kandace Springs《Indigo》 | **日本盤 `UCCQ-1087`** ＋歐版 CD ＋歐版 LP ＋美加 LP `B002872101` ＋波蘭版 ＋辛巴威版 ＋兩張宣傳 CDr |
| `_BY.ALEXANDER`《000 CHANNEL BLACK》 | **2024-08-27 美加黑膠 Blue Note `3509156`** |
| Joel Ross《Who Are You?》 | 美版 LP `B0032228-01` |
| Kandace Springs《The Women Who Raised Me》 | **日本盤 `UCCQ-1118`（＋同號宣傳盤）** ＋歐版 CD ＋美歐兩款黑膠 |
| R+R=NOW《R+R=NOW Live》 | **日本盤 `UCCQ-1132`（＋同號宣傳盤）** ＋美歐兩款黑膠 ＋白標試壓 |
| Joel Ross《The Parable of the Poet》 | 三款黑膠（`B003467601`／限量 `B003467701`／歐版 `3891819`）＋試壓 |
| Joel Ross《nublues》 | 兩款黑膠 ＋法國宣傳 CD |
| Out Of/Into《Motion I》 | **實體 CD `00602465981971`** ＋**日本盤 `UCCQ-1215`（＋同號宣傳盤）** ＋歐美兩款黑膠 ＋FLAC ＋AAC |
| Maya Delilah《The Long Way Round》 | **日本盤 `UCCQ-1216`（＋同號宣傳盤）** ＋歐版限量 LP ＋美歐 LP |
| Openness Trio | 兩款黑膠（含限量版） |
| Out Of/Into《Motion II》 | **實體 CD `00602478346217`** ＋兩款黑膠 ＋AAC |
| Paul Cornish《You're Exaggerating!》 | 歐版 CD ＋美版 LP |
| **FATHERS《FATHERS》** | **實體 CD `00199957415965`（＝與 c-167 b 對上的那個目錄號）** ＋歐版 LP `15972` ＋Worldwide 限量藍膠 |
| Joel Ross《Gospel Music》 | 兩款黑膠（含限量版）＋FLAC |

### （二）⚠ 第二種掃描在本批的真正價值不是年份，是**同碟判定**

**`FATHERS《FATHERS》` 的 MB release 沒有 barcode、沒有 catalog-number——第一種查法完全跑不起來，而第二種掃描撈出的 `00199957415965` 正是讓本卡與 c-167 b 那筆對上的唯一依據**（第 2355 條）。
**→ 給後批：第 1800-B 條的第二種掃描不只是年份工具，它也是「MB 什麼都沒填時唯一能拿到目錄號的路」。**

### （三）⚠ 掛名字串要用 Discogs 那一種（派工信第四點的提醒，本批應驗兩次）

| 卡 | 用卡上的掛名查 | 改用 Discogs／店面那一種 |
|---|---|---|
| **R+R=NOW《R+R=NOW Live》** | `artist=R+R=NOW&release_title=R+R=NOW Live` → **0 筆**；`release_title=R+R=NOW Live` 單欄 → **0 筆** | **`artist=R+R=NOW` 單欄 → 17 筆**（Discogs 的 title 欄逐字只有 `Live`，帶盤名查永遠 0） |
| **FATHERS《FATHERS》** | — | `artist=Fathers&release_title=FATHERS` → **51 筆，其中 48 筆是別的 Fathers**（第 2354 條的四個同族實體）——**必須靠 catno 與日期挑，不能靠名次** |

### （四）⚠ 俄版 `Unofficial Release` 本批 0 次

c-169 出現 5 次，**本批一次都沒有**——**2016 年以後的碟沒有俄版非官方壓片進 Discogs**。

---

## 第 2363 條（**第 1250 條在本批應驗五種形狀**）：**「目錄號＋廠牌」以外的任何反查都不可信**

| # | 形狀 | 卡 | 逐字 |
|---|---|---|---|
| 1 | **裸數字** | **Joel Ross《nublues》** | 列舉檔與 MB 的 catalog-number 欄都只有 `5837662`，**反查撞 Pro-Zak Trax 的 `583 766-2`**（slice 的 `note` 已先標）。真號是 `00602458376623` |
| 2 | ⚠ **catno 欄填的是字串 `[none]`** | **Openness Trio** | **MB 的 catalog-number 欄逐字是 `[none]`**（不是空值、也不是真號），`slice.json` 的 `catno` 照抄成 `["[none]"]`。真號 `00602475821366`（CD）／`00602475821373`（LP） |
| 3 | ⚠ **catno 欄的打字錯誤** | **Out Of/Into《Motion II》** | **Discogs AAC 條目 35876923 的 catno 欄逐字 `nonbe`**（`none` 打錯） |
| 4 | **catno 欄整格空** | **6 張** | Kandace Springs《Soul Eyes》數位四筆／《Indigo》兩筆全空／Maya Delilah 三筆全空／Joel Ross《Gospel Music》兩筆全空／Out Of/Into 兩張／FATHERS |
| 5 | ⚠ **同一張碟的 CD 與數位 barcode 不同碼** | **Out Of/Into《Motion II》** | **MB 那筆數位的 barcode 逐字 `602478346248`，Discogs 實體 CD 逐字 `602478346217`**——`slice.json` 的 `note` 寫的是後者、MB 寫的是前者，**兩個都對，但拿其中一個反查只會回到一半的版本** |

⚠ **另記一個相反方向的形狀（本條新增）**：**`FATHERS《FATHERS》` 的三筆實體 barcode 逐字是 `1 99957 415…`，不在 UMG 慣用的 `602…` 序列裡**——**`itunes.apple.com/lookup?upc=199957415965` 回 0**，探測鏈不能假設 Blue Note 2020 年代的碟一定是 602 段。

**盤名反查的假陽性本批同樣高**：`Indigo`、`Who Are You?`、`Motion I`、`Motion II`、`Gospel Music`、`Live`、`FATHERS` 七個盤名在 Apple 或池中都撞到別碟，**逐筆核完真的同碟 0 筆**（唯一真的同碟是第 2355 條那一筆，而它是靠目錄號對上的、不是靠盤名）。

---

## 第 2364 條（**字形裁定兩筆**）：**撇號取 ASCII、斜線團名照 MB**

### （一）⚠ `Paul Cornish《You're Exaggerating!》`——取 ASCII 撇號，**而且這次 Apple 站在彎撇號那一邊**

| 來源 | 逐字 |
|---|---|
| **MB RG title** | **`You’re Exaggerating!`（U+2019 RIGHT SINGLE QUOTATION MARK）** |
| ⚠ **Apple us／gb `1817728467` 的 collectionName** | **`You’re Exaggerating!`（U+2019）** |
| **Discogs 34964609／35508061 的 title 欄** | **`You're Exaggerating!`（ASCII `'`）** |

**判 ASCII `You're Exaggerating!`，U+2019 形進 `queryAlias`。**
依據 **c-110 第 5 條**（逐字：「兩張都取 ASCII 撇號，MB 的彎撇號寫法進 `queryAlias`」，理由逐字「**池中 97% 是 ASCII**」）與 **c-166／c-169 第 2197 條第 1 點**的同形先例（`Rollin’`→`Rollin'`、`Passin’ Thru`→`Passin' Thru`）。

⚠ ⚠ **與第 2197 條那一筆的差別要寫明**：**那張的 Apple 是 ASCII（三比一），本張的 Apple 是彎撇號（二比一反向）。本層仍取 ASCII——理由是「池中一致性（不製造第二種鍵）」，不是票數。**
⚠ **`chk-prop` 的四道字形檢查只擋非 ASCII 連字號（`‐‑‒–—―－`）與 U+30FC 誤用，不擋 U+2019**——**這一格「標記 0」不等於乾淨**（第 611 條的同一句話，與第 2197 條末段同向）。

### （二）`Out Of/Into` 的斜線——照 MB 的無空格形，**而且這不是斜線串接掛名**

| 來源 | 逐字 |
|---|---|
| **MB** | artist 實體 `897b9986` 的 name 與 sort-name 逐字都是 **`Out Of/Into`**（**單一 Group 實體，不是兩個藝人以 `/` 串接**） |
| **Apple**（us／jp／de） | `artistName` 逐字 **`Out Of/Into`** |
| ⚠ **Discogs**（兩張合計十一筆） | `artists` 欄逐字 **`Out Of / Into`**（斜線兩側帶空格） |

**判 `Out Of/Into`（MB＝Apple，二比一），帶空格形進 `queryAlias`。**
⚠ **第 611 條第四種盲區（斜線掛名）在這一張不成立**：那個盲區防的是「MB 用 `/` 把兩個藝人串起來」（c-160《Face à face》的 `Erik Truffaz Ladyland / Erik Truffaz Quartet`、c-161《Paris》的 `Erik Truffaz / Sly Johnson`）；**本例的斜線是團名本身的一個字元，MB 只有一個成分。第 1600 條的前提不成立。**
⚠ **`chk-prop` 的折鍵會把 `/` 剝掉**，`Out Of/Into` 與 `Out Of / Into` 折出同一個鍵 `outofinto` ——**兩形在卡池都 0 命中，沒有分裂風險。**

### （三）其餘字形，四邊一致或已核過

`nublues`（**MB＝Apple 全小寫，Discogs 首字大寫 `Nublues`，取小寫**）／`FATHERS`（**MB＝Apple＝官網全大寫，Discogs `Fathers`，取全大寫**）／`The Parable of the Poet`（**MB 介系詞小寫，Discogs＝Apple 全大寫詞首，取 MB 形**）／`R+R=NOW Live`（**MB 形；Discogs 的 title 欄逐字只有 `Live`，Apple 逐字 `R+R=Now Live (Live) [feat. …]`，兩形進 `queryAlias`**）／`000 CHANNEL BLACK`（**MB＝Discogs 2020 條目全大寫，2024 黑膠條目逐字 `000 Channel Black ` 帶尾空格，取全大寫**）。
⚠ **非 ASCII 連字號（第 1804-B 條／c-110 第 1 條）本批 0 筆**：15 張的 `artist` 與 `album` 欄都不含 `‐‑‒–—―－`，`chk-prop` 的兩道連字號檢查不亮**且本層沒有動過任何一格**——與第 2364(一) 的撇號那一格不同。

---

## 第 2365 條（**⚠ 給下游**）：**同一張碟在不同版本之間軌數不同的，本批 6 筆——正文與試聽比對不得抓錯形**

| 卡 | 原盤形 | 其他形 | 差異來源 |
|---|---|---|---|
| **Kandace Springs《Soul Eyes》** | **CD 11 軌 43 分** | **日本盤 15 軌 57 分**（Discogs 10467233）／**Apple jp `Soul Eyes (Deluxe)` 14 軌**（1442724249） | 日本 bonus，notes 逐字記〈The Windmills of Your Mind〉〈Stay With Me〉等翻唱 |
| **Kandace Springs《Indigo》** | **CD 13 軌 48 分** | **日本盤 14 軌**（第 14 軌〈Cold Summer〉，Discogs 12919209 notes 逐字 `Track 14 is a bonus track`）／**Apple jp 1415047230 亦 14 軌** | 日本 bonus |
| **Kandace Springs《The Women Who Raised Me》** | **CD 12 軌 53 分** | **日本盤 15 軌 63 分**（Discogs 15041298，notes 逐字「第 14 軌另在東京 Lab Recorders 補錄」）／**Apple jp 1497181017 14 軌** | 日本 bonus ＋當地補錄 |
| **Out Of/Into《Motion I》** | **CD 7 軌 46 分** | **日本盤 9 軌 50 分**（Discogs 32758233 的 tracklist 逐字有 `Bonus Track For Japan` 分隔行＋〈Infant Eyes〉） | 日本 bonus；⚠ **〈Infant Eyes〉是 Wayne Shorter 的曲子，不得寫成團員原創** |
| **Maya Delilah《The Long Way Round》** | **CD 12 軌 45 分** | **日本盤 15 軌**（bonus 是兩首 Studio Live 版）／**2026-01-09 Deluxe 16 軌 60 分（MB `aafd777d`、Apple 1868490452／1868491059）——與本卡同一個 RG** | 日本 bonus ＋豪華版；⚠ **本卡釘 2025 年的 12 軌原盤** |
| **Joel Ross《Gospel Music》** | **17 軌 78 分** | 黑膠是雙片 | 同軌目，只是分面 |

⚠ **軌數單一、四邊無分歧的 9 張**：`_BY.ALEXANDER`（11 軌）／Joel Ross《Who Are You?》（15）／R+R=NOW（7）／Joel Ross《The Parable of the Poet》（7）／《nublues》（10）／Openness Trio（5）／Out Of/Into《Motion II》（6）／Paul Cornish（9）／FATHERS（8）。

---

## 第 2366 條（**第 254 條，三種店面查法的觀察；只寫觀察不下結論**）：**Apple 命中 14／15，其中 1 張靠查法 3 才救回、1 張三種查法全空**

**跑法**＝(1) 掛名＋盤名 `search`（依碟的來源選 2–3 個市場，共涵蓋 us／gb／jp／de 四個）、(2) 只用盤名 `search`、(3) `lookup?id=<artistId>&entity=album` 拉整份藝人目錄（另對查無者追加 `attribute=artistTerm`），外加 `lookup?upc=`。

| 覆蓋 | 張 | 名單 |
|---|---:|---|
| **查法 1 在所跑市場全中** | **13** | Kandace Springs 三張／Joel Ross 四張／Out Of/Into 兩張／Maya Delilah／Openness Trio／Paul Cornish／FATHERS |
| ⚠ ⚠ **查法 1、2 與 `lookup?upc=` 全空，靠查法 3 救回** | **1** | **R+R=NOW《R+R=NOW Live》**——**`+` 與 `=` 這兩個字元 `search` 端點吃不下**（`R+R=NOW Live`／`R R NOW Live`／`RRNOW Live`／`Robert Glasper R+R=NOW Live` 在 us／jp 全部 0 命中或回完全無關的碟），`lookup?upc=602435461625` **也回 0**；**`lookup?id=1378738213&entity=album`（R+R=NOW 的藝人目錄）才回 1548059327**。**第 1605 條的救援在本批成立一次，形狀與 c-169 b 第 2204 條記的那一筆完全相同** |
| ⚠ **三種查法全空（專輯本身不在所跑市場的 Apple 目錄裡）** | **1** | **`_BY.ALEXANDER《000 CHANNEL BLACK》`**——查法 1／2 回的是 Alexander Kowalski 的〈Black Channel〉（**完全不同碟，絕對不得採用**）；**查法 3（`attribute=artistTerm=_by.ALEXANDER`）的 us／gb 兩店只回他的兩支 2020 單曲與一支 2026 單曲**，`lookup?upc=602435091563` 回 0 |

⚠ **`lookup?upc=` 的命中率：15 張裡 10 張命中**（Soul Eyes／Indigo／Who Are You?／The Women Who Raised Me／The Parable of the Poet／nublues／The Long Way Round／Openness Trio／You're Exaggerating!／Gospel Music）；**5 張回 0**（000 CHANNEL BLACK／R+R=NOW Live／Motion I／Motion II／FATHERS）——**與 c-159 b 第 1605 條、c-169 b 第 2204 條「成功率不高」的經驗一致。**
⚠ **一個 UPC 回四個 collectionId 的 1 筆**：**`Maya Delilah` 的 `lookup?upc=602475450795` 同時回 1868491059／1868490452（Deluxe 16 軌，2026-01-09／08）與 1793003921／1792968883（原盤 12 軌，2025-03-28）**——**探測鏈要能容忍一碼多 id，而且要挑 12 軌那兩個。**
⚠ ⚠ **Apple 的 `artistName`／`collectionName` 與本卡掛名對不上、探測鏈會落空的 4 筆**：
- **R+R=NOW**（artistName 逐字 `R+R=NOW, Robert Glasper & Terrace Martin`、collectionName 逐字 `R+R=Now Live (Live) [feat. Christian Scott aTunde Adjuah, Derrick Hodge, Taylor McFerrin & Justin Tyson]`）；
- **Out Of/Into 兩張**（collectionName 逐字帶 `(feat. Gerald Clayton, Immanuel Wilkins, Joel Ross, Kendrick Scott & Matt Brewer)`）；
- **FATHERS**（artistName 逐字 `Nate Smith, Kiefer, CARRTOONS & Kenny Beats`）。
⚠ **日文片假名 artistName 的 5 筆**：`キャンディス・スプリングス`（三張）／`ジョエル・ロス`（四張）／`アウト・オブ/イントゥ`（兩張）／`マヤ・デライラ`——**全部進 `queryAlias`。**

### ⚠ 派工信第九點與實況的對照

派工信逐字說「這一批是 2020 年後的現役目錄，**店面命中率應該比 c-169 好**（c-169 幾乎全是歐洲分支的本地出品，Apple 全查無 4／40、CAA 404 有 15／40）」。
**本批的數字：Apple 三種查法全空 1／15（c-169 是 4／40）、CAA 404 是 0／15（c-169 是 15／40）。**
**照第 254 條只寫觀察不寫結論：本批確實比 c-169 覆蓋得完整，而本批是美國本部目錄、c-169 幾乎全是歐洲分支的本地出品。**

---

## 第 2367 條（**CAA**）：**release-group 層 15／15 全部有圖——本線第一次零 404；但只有 4 張的來源是實體原壓**

| 狀態 | 張 | 名單（括號內是 CAA 的來源 release） |
|---|---:|---|
| **有圖，來源是實體原壓** | **4** | Kandace Springs《Soul Eyes》（**640d1b36 美版 CD**，2 圖）／Joel Ross《nublues》（609c8252 CD）／Paul Cornish（**2f716156 美版 CD**）／Joel Ross《Gospel Music》（f66ff9e7 CD） |
| **有圖，來源是 RG 唯一的 release（純數位發行，無他版可比）** | **5** | `_BY.ALEXANDER`（dc0d7e17）／Out Of/Into《Motion I》（ea26d0ab）／《Motion II》（29453d20）／Openness Trio（c1eadda4）／FATHERS（e7d2891e） |
| ⚠ **有圖，但來源是數位版或他版** | **6** | Kandace Springs《Indigo》（**88cb382c 美版數位**）／《The Women Who Raised Me》（**f267f3de 美版數位**）／Joel Ross《Who Are You?》（**ef0d0334 XW 數位**）／R+R=NOW（**60c6c9e5 美版數位**）／Joel Ross《The Parable of the Poet》（**efe8e061 歐版 CD，不是美版原壓**，3 圖）／Maya Delilah（**791b8fa3 XW 數位**） |
| **RG 層 HTTP 404** | **0** | — |

**→ 六張「來源不是實體原壓」的要由研究層與封面層看版式**，各卡 `risk` 已寫明該回哪個 Discogs 條目（Indigo→14347365、Women→15005394、Who Are You?→16150240、R+R=NOW→17547175、Parable→22989956、Long Way Round→33619413）。
⚠ **2020 年後的純數位首發碟，「原壓」這個概念本身要小心**：Out Of/Into 兩張、Openness Trio、FATHERS 的 MB 唯一版本就是數位，**實體 CD 與黑膠 MB 都沒建**——**CAA 的圖與實體的版式不一定相同。**

---

## 第 2368 條（**撞陳列；第 738／859／845 條**）：**7 處，四張卡的 `risk` 已互指；撞 apex 王牌 0 處**

| 本批的軌／碟 | 撞到 | 關係 |
|---|---|---|
| **R+R=NOW《R+R=NOW Live》的〈Change of Tone〉〈Perspectives/Postpartum〉〈Needed You Still〉** | **c-169 b `R+R=NOW —《Collagically Speaking》(2018)`（卡單已建）** | **同一批曲子的錄音室版與現場版，同一支團、兩張碟**——兩張卡的 `risk` 應互指 |
| R+R=NOW 的〈How Much a Dollar Cost〉 | Kendrick Lamar《To Pimp a Butterfly》 | 改編，不同次錄音 |
| **Joel Ross《nublues》的〈Equinox〉〈Central Park West〉** | 池中 Coltrane 各卡 | 標準曲，不同次錄音 |
| **Joel Ross《nublues》的〈Evidence〉** | 池中 Monk 各卡 | 同上 |
| Joel Ross《Who Are You?》的〈After the Rain〉 | 池中 Coltrane 各卡 | 同上 |
| **Kandace Springs《The Women Who Raised Me》十二軌全部** | 池中 Billie Holiday〈Strange Fruit〉〈Solitude〉、Roberta Flack〈Killing Me Softly〉、Lauryn Hill〈Ex-Factor〉、Nina Simone〈I Put a Spell on You〉、Sade〈Pearls〉等 | **全翻唱盤，十二軌都是不同次錄音**——**正文必須寫清楚是翻唱** |
| **Out Of/Into《Motion I》日本盤 bonus〈Infant Eyes〉** | 池中 Wayne Shorter《Speak No Evil》等 | **bonus 軌，不是原盤軌** |

⚠ **第五道（`chk-prop` 的「盤名逐字撞 apex 王牌但掛名不同」，report-only）：0 處。**
**已逐筆人工複掃**：本批 15 個盤名（Soul Eyes／Indigo／000 CHANNEL BLACK／Who Are You?／The Women Who Raised Me／R+R=NOW Live／The Parable of the Poet／nublues／Motion I／The Long Way Round／Openness Trio／Motion II／You're Exaggerating!／FATHERS／Gospel Music）折鍵後對 seed 裡 **914 個 apex 盤名鍵**逐一比對，**沒有一個命中**。
⚠ **`Who Are You?` 撞 seed 的 `The Who —《Who Are You》(1978)`——那張不是 apex 王牌**（seed 該列沒有第 9 格），所以第五道本來就不會亮；**但掛名不同、盤名折鍵後相同，下游引用這個盤名務必帶掛名與年份。**

---

## 第 2369 條（**第 611 條五種盲區的人工掃**）：**命中 1 筆（盲區三），其餘四種 0 筆**

`chk-prop` 的四道全過、`dedup-crossbatch` 四項全 0（第 2398 條），**但標記 0 不等於沒撞卡。五種已知盲區逐一人工掃過**：

1. **群組掛名 vs 個人掛名**——**本批最需要掃的一格，但一筆都沒撞**。逐筆掃過：`Out Of/Into` 五位團員的既有字串（`Gerald Clayton` 6 列 3 張 c-165／c-166、`Immanuel Wilkins` 12 列 6 張 c-165／c-166／c-167、`Kendrick Scott Oracle` 1 張 c-169 b、`Kendrick Scott, Reuben Rogers, Walter Smith III` 1 張 c-166 a、`Joel Ross` 本批四張、`Matt Brewer` 0 列）；`R+R=NOW` 六位團員（`Robert Glasper` 11 列、`Christian Scott aTunde Adjuah` 6 列 seed、`Derrick Hodge` 6 列、`Terrace Martin`／`Taylor McFerrin`／`Justin Tyson` 各 0 列）；`FATHERS` 四位團員（`Kiefer` 2 列 1 張 c-167 a《Memory Bomb》、`Nate Smith`／`CARRTOONS`／`Kenny Beats` 各 0 列）；`Openness Trio` 三位（全 0 列）；`_BY.ALEXANDER` 的 `Alex da Kid`／`Alexander Grant`（0 列）。**全部查過，沒有一張是同碟；側人與團員身分不影響掛名**（第 1131 條）。
2. **同名但不同盤的 Volume 碟**——**0 筆同碟**。**`Out Of/Into《Motion I》《Motion II》` 是同一支團的兩張不同錄音**（軌目完全不重疊，13 軌互斥），依簡報第二節第 6 點各算一張、`risk` 互指。
3. ⚠ ⚠ **MB 把同一張碟建成兩個 RG——命中 1 筆**：**`FATHERS《FATHERS》`（`458ef48c`）對上 c-167 b 已退的 `Nate Smith《Fathers》`（`6391b52e`）**，第 2355 條。**其餘 14 個 rgMbid 互不重複、也與其他批不重複。**
4. **斜線掛名**——**0 筆**。`Out Of/Into` 的斜線是團名的一個字元、不是 credit 串接（第 2364(二) 條）。
5. **同名但不同盤**——逐筆核完**真的同碟 0 筆**：`Who Are You?`（撞 seed 的 The Who 1978）／`Indigo`（撞 seed 的 Indigo Girls、Circuit des Yeux《Reaching for Indigo》、c-159 的 Gianluca Petrella《Indigo 4》）／`Gospel Music`（撞 c-114 的 Sister Lucille Pope《Our Silver Anniversary In Gospel Music》）／`FATHERS`（撞 seed 的 Father MC《Father's Day》、Muddy Waters《Fathers and Sons》、丸山繁雄《A Young Father's Song》）／`Motion I`／`Motion II`（Apple 上撞十餘筆 `Motion Picture Soundtrack`）／`Live`（R+R=NOW 的 Discogs title 形，**三個字母的盤名毫無唯一性，必須帶掛名與 `B003327402`**）。

---

## 第 2399 條（**第 315 條結算**）

**`prop-a.json` 7 筆 ＋ `prop-b.json` 8 筆 ＋ 本檔退表 1 筆 ＝ 16 ＝ `slice.json` 的 16 筆。✔**
（`g === "a"`：prop 7 ＋ 退 1 ＝ 8 ✔；`g === "b"`：prop 8 ＋ 退 0 ＝ 8 ✔）

### 退表（逐筆、附理由分類）

| # | 組 | 卡 | 理由分類 | 條 |
|---|---|---|---|---|
| 1 | **a** | **`lophiile《The Good Days Between》` 2023**（RG `5d29475f-6ccb-45bd-bf0f-7d03f602444c`） | **非 Album 形態（EP，8 軌 17 分 57 秒），未落在 §5.5 白名單** | **第 2347 條**（照 c-169 a 第 2127 條執行） |

**逐類清點**：
**撞池退 0**（第 2369 條五種盲區掃完，真的同碟 0 筆；**盲區三命中的那一筆對到的是 c-167 b 已退的重複 RG，本卡是該碟的正確形，不是撞卡**）／
**判為合輯退 0**（第 2359 條）／
**非 Blue Note imprint 退 0**（第 2358 條 15 張全過閘）／
**原盤他廠改判退 0**（第 2357 條 (丙) 兩次訊號都是第 1748 條的既有假陽性）／
**再發／庫存盤退 0**（第 2357 條 (乙)，15 張錄音年全在 2015 年以後）／
**曲風退 0**（第 2361 條，第 1559 條的邊界張 1 張照收）／
**非爵士退 0**／
**只有影像載體退 0**（第 2357 條 (己)）／
**非 Album 形態退 1**（本表）。

⚠ **本批的退件率 1／16。** c-168 是 0／18、c-169 是 1／41——**三個補批合計 75 張、退 2 張，兩張都是 EP，沒有一張是因為「不該在清單裡」而退。這與第 1557 條的處置預期一致：那 75 張本來就該在清單裡。**

---

## 第 2400 條（**⚠ 派工信與原文／既有裁定牴觸之處；依規定回報**）

派工信第一節逐字要求「本信若與它們牴觸，以它們為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查完 16 張，派工信沒有任何一句與簡報或既有裁定牴觸**——**這是本線三個補批裡第一次**（c-168 第 2098 條記了兩處轉述偏差、c-169 a 第 2144 條與 b 第 2208 條合計記了六處）。逐點對照如下：

| 派工信 | 實查 |
|---|---|
| 第三節第 1 點（lophiile 已由 c-169 a 第 2127 條判退，照判退不要翻案） | **✔ 逐字正確**，第 2127 條原文確實已預先指名這一張並寫明「不必再重查一次」（第 2347 條） |
| 第三節第 2 點（Nate Smith《Fathers》與 FATHERS《FATHERS》是同一張碟，釘 `458ef48c`＋`selfTitled: true`） | **✔ 逐字正確，與 c-167 b 第 2024 條完全相符**；⚠ **反而是 `slice.json` 的 `note` 寫錯了**（逐字「同名不同碟」）——見第 2355 條 |
| 第三節第 3 點（Kandace Springs 三張整組移進本批、與 Joel Ross 四張各只需做一次掛名判定） | **✔ 逐字正確**，與第 1558 條相符（第 2350 條） |
| 第三節第 4 點（第 1800-B 條必做；掛名字串要用 Discogs 那一種） | **✔ 正確且本批應驗兩次**（R+R=NOW 帶盤名查回 0、FATHERS 回 51 筆裡 48 筆是別團）——第 2362(三) 條 |
| 第三節第 5 點（`note` 的數量／範圍斷言一律重掃） | **✔ 正確**，九筆斷言查出 1 筆錯（第 2355 條末表） |
| 第三節第 6 點（掛名照 MB RG credit 原樣、個人與群組並存；第 307 條防的是同一實體的多種寫法） | **✔ 這一句把 c-168 第 2078 條與 c-169 第 2098／2144／2208 條反覆更正過的版本寫對了**，本批照它執行沒有問題（第 2349 條） |
| 第三節第 7 點（形態閘：六句判準之前先看 `format` 欄與總長） | **✔ 正確**，本批用它判掉兩張 8 軌碟的相反結果（第 2347／2348 條） |
| 第三節第 8 點（Apple 的 `artistName` 不可拿來判合輯） | **✔ 正確但本批 0 次**（第 2359 條末段） |
| 第三節第 9 點（店面命中率應該比 c-169 好，但只寫觀察不寫結論） | **✔ 正確**，數字見第 2366 條末段 |

### ⚠ 三句不算牴觸、但與實況有出入的

1. **派工信第三節第 4 點說「c-169 兩組跑完這一步，40 張裡 3 張改年份、23 張補出 MB 沒建的版本」**——**本批跑完是 0 張改年份、15 張（全部）補出版本**。**改年份掛零不是因為少做了什麼，是因為 2016 年以後日版不再先發**（第 2352(一) 條，`UCCQ-` 與 `TOCJ-` 的差別）。**建議把這一句寫進簡報第二節：`TOCJ-` 要查、`UCCQ-` 在 2015 年以後只當版本補正。**
2. **派工信第三節第 4 點說「俄版 `Unofficial Release` 一律不當依據（c-169 出現 5 次）」**——**本批 0 次**（第 2362(四) 條）。
3. **派工信第三節第 3 點說 Joel Ross 是「四張」**——**字面成立（本批確實是四張），但他的 Blue Note 目錄是五張**：**`KingMaker`（2019）完全不在 `enum/blue-note.json` 的 1,812 列裡**，而且缺的原因與第 1557 條那 75 張**不同**（那 75 張在列舉檔裡只是曲風判錯；這一張根本不在列舉檔裡，因為 MB 那筆 release 的 `label-info` 是空的、以 label 為軸的列舉腳本碰不到它）。**這是本棒最重要的線外發現，詳見第 2356 條。**

---
