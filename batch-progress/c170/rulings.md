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

# c-170 追記：**Blue Note 1985 後線・列舉層缺口稽核（藝人軸重掃）**（編號 2481–2540）

本節**只產報告，不建 slice、不建卡單、不把缺口接進管線**——接不接、怎麼切批由主線定。
產出兩檔：`batch-progress/enum/blue-note-artist-axis-audit.md` ＋ `.json`。
起因是本檔第 2356 條（`Joel Ross《KingMaker》` 一列都不在列舉檔裡）。
**本節一律 append 於檔末，未覆寫任何既有行（第 1806-B 條）。**

---

## 第 2481 條（**總表**）：**藝人軸掃完 541／541 位藝人，查出 25 筆真缺口**

| | 數 |
|---|---:|
| 藝人宇宙（相異 MB artist MBID） | **541** |
| 由本線已知 release-group 反解、全數成功 | 1,231 ／ 1,231 |
| 藝人軸看到的 1985 年後 Album（扣掉 secondary-type／無日期後） | **8,937** |
| 以 `rgMbid` 命中四處既有資料 | 1,128 |
| 以（藝人, 盤名）命中 | 176 |
| **四處都沒有、進入 Blue Note 家族判定** | **7,184** |
| ├ MB 掛著非 Blue Note 廠牌（整批篩掉） | 6,159 |
| ├ MB `label-info` 全空 | 609 |
| ├ MB `label-info` 部分空 | 416 |
| └ **MB 掛著 Blue Note 家族廠牌卻不在列舉檔裡** | **0** |
| **Discogs 逐筆覆核** | **1,025 ／ 1,025（跑完，無 `unclear`）** |
| **`gap`** | **25** |
| **`not-blue-note`** | **1,000** |

**`unclear` 0 筆、`already-covered` 不另列**（1,304 筆是在比對階段就命中四處而未進入判定，不算逐筆裁定）。

---

## 第 2482 條（**方法**）：**藝人 MBID 不用 `artist?query=` 解，改由已知 `rgMbid` 整批反解——同名實體問題直接消失**

派工信第二節要求「用 MB `artist?query=` 或既有卡的 `mbNote` 取得 artist MBID，
⚠ 同名實體要靠 `type` ＋ `disambiguation` 分辨（`Joel Ross` 在 MB 有兩個）」。
**本層沒有照這一句做，因為有更硬的解法**：本線每一列都帶 `rgMbid`，
用 `release-group?query=rgid:(A OR B OR …)`（每批 20 個）把 **1,231 個已知 release-group 的 `artist-credit` 整批反解**，
**直接拿到 artist MBID**。

- **1,231 個 RG 全數解析成功、0 筆落空**，得到 **541 個相異 artist MBID**。
- **完全不需要靠 `type`＋`disambiguation` 猜**：`Joel Ross` 回來的就是 `6d09039b`（Person／US vibraphonist），
  另一個 `02f84b16`（pianist, conductor, choral arranger）根本不會出現，因為沒有任何一筆本線 RG 掛他。
- 附帶好處：**掛名字串的分裂不影響結果**。`Tony Allen` 與 `Tony Allen & Jeff Mills`、
  `Trijntje Oosterhuis` 的七種寫法、`Wayne Shorter` 與 `Wayne Shorter Quartet`——
  539 個掛名字串收斂成 541 個 MBID（群組與個人是不同實體，所以數字反而略增），**沒有一個靠字串猜**。

**裁定：這一線之後要再做藝人軸稽核，一律走 rgid 反解，不要走 `artist?query=`。**
判準依第 2 條（可逆）與第 3 條（卡住整條線）：名字比對錯一個就整位藝人漏掉，成本太高。

---

## 第 2483 條（**⚠ 派工信與檔案實況不符之一**）：**`seed_cards.json` 根本沒有 `label` 或 `scene` 欄位**

派工信第二節第 3 點逐字要求：「`seed_cards.json`（**唯讀**）裡 `label` 或 `scene` 與 Blue Note 相關、
且 `year >= 1985` 的卡的 `artist` 欄」。

**實查：`seed_cards.json` 是 17,248 列的緊湊陣列，每列 7／8／9 個元素**
（`[artist, album, a, b, c, genres, year, (composer), (hall)]`），
**沒有 `label`，也沒有 `scene`**。`grep -ic "blue note"` 全檔只有 11 次，都在別的欄位裡。
派工信寫的那個形狀是 `desc-tools/batches/cards/*.json` 的卡單形狀，不是 seed 的。

**裁定：改用等效替代**——「seed 的（藝人, 盤名）能對到 `enum/blue-note.json`、且該列 `year >= 1985`」。
這樣撈出 **19 位藝人**併進宇宙。判準依第 1 條（有先例：第 1250／611 條一路都在講「欄位不能照字面信」）
與第 3 條（不決定就沒有第三個來源）。

---

## 第 2484 條（**⚠ 更正本檔第 2356(二) 條**）：**藝人端 `release-group?artist=` **回得到** `KingMaker`，第 2356 條寫的「回 `count: 0`」是錯的**

第 2356(二) 條逐字寫：「**`arid:6d09039b`（Joel Ross 本人）的 release-group 端點回 `count: 0`**，
也就是說連從藝人端補也補不到（MB 的 RG 與 artist 的關聯在這一筆上同樣殘缺）。」

**實查兩個端點都回得到**：

| 端點 | 回傳 |
|---|---|
| **browse** `release-group?artist=6d09039b-…&type=album&limit=100` | **`release-group-count: 7`，逐筆列出 `KingMaker`（`6cd0a509`、2019-05-03）** |
| **search** `release-group?query=arid:6d09039b-…` | `count: 15` |

**MB 的 RG↔artist 關聯在這一筆上是完整的，殘缺的只有 release 的 `label-info`。**

⚠ **這條更正很重要，因為它是本層整個能成立的前提**：
第 2356 條那一句若成立，藝人軸也補不到，這一棒根本不該派。
**推測第 2356 條當時打的是截短的 MBID（`0d190bc8` 那種前八碼形式），MB 會回 `Invalid mbid.`
——本層第一次試也踩到同一個坑**（`release/0d190bc8?...` 逐字回 `{"error": "Invalid mbid."}`）。
**「查無」與「MBID 打錯」在 MB 上長得不一樣，但在轉述時很容易併成一句「回 0」。**

**裁定：第 2356(二) 條末句作廢，其餘（`label-info` 為空、label 軸碰不到）維持。**

---

## 第 2485 條（**⚠ 派工信與實況不符之二；且它排掉的是一筆真缺口**）：**`Kendrick Scott Oracle《A Wall Becomes A Bridge》(2019)` 不在 `c166-cards.json` 裡，它是 `gap`**

派工信第三節逐字寫：「**已排除的一筆**：`Kendrick Scott Oracle《A Wall Becomes A Bridge》(2019)` 不是缺口，
**它在 `desc-tools/batches/cards/c166-cards.json` 裡**（c-169 b 提報時沒看到 c-166 的卡單）。」

**實查不成立。** 用正規化盤名對**全部** `c*/slice.json`、**全部** `c*-cards.json`、`enum/blue-note.json`、
`seed_cards.json`、以及全部 `c*/prop-*.json` 逐列比對，**沒有任何一筆記錄的 `album` 等於這張碟**。

`c166-cards.json` 裡確實出現這個字串，但它是**別張卡的 `label` 敘述文字引用到它**，逐字：
> `…and third album for Blue Note Records. The anticipated follow-up to A Wall Becomes A Bridge, Scott's much-lauded 2019 release with his band Oracle`

`c169/prop-b.json` 那一次同樣是 `curatorWhy` 的引文（逐字「…presented his band Kendrick Scott Oracle: We Are The Drum (2015) and A Wall Becomes A Bridge (2019)」）。

⚠ **這是第 611 條「盤名撞字串不等於撞卡」的反向形：字串命中被誤讀成卡片存在。**
第 611 條防的是「grep 到了所以以為撞卡」，**本條是「grep 到了所以以為已收」——同一個錯，方向相反，而且更危險，因為它會讓一筆真缺口被銷案。**

**裁定：這一張是 `gap`，列進報告第一區。** 佐證：
MB RG `c8f8ec1c-1899-4495-a6a1-57a555df47c8`（2019-04-05）／
Discogs 回 1 筆 `Kendrick Scott Oracle - A Wall Becomes A Bridge`、US 2019 CD Album、`label` 逐字 `["Blue Note"]`、`catno` 逐字 `774920 6`。
**c-169 b 第 2208 條與本檔第 2356(四) 條把它列為「給主線的回頭查」是對的，派工信的排除是錯的。**

**同時裁定一條做法**：**「某張碟已經收了」不可以用 grep 認定，必須用「(正規化藝人名, 正規化盤名) 或 `rgMbid` 命中某一筆記錄的欄位」認定。**

---

## 第 2486 條（**本層最重要的結構性結論**）：**`bn-label-present` 掛零——列舉檔的 label 軸沒有漏抓，漏的是 MB 沒填**

7,184 個「四處都沒有」的候選，逐筆回問 `release?query=rgid:(…)` 取 `label-info` 之後：

| 形狀 | 筆 |
|---|---:|
| MB 掛著**非** Blue Note 廠牌 | 6,159 |
| MB `label-info` **全空** | 609 |
| MB `label-info` **部分空**（其餘掛他廠／母公司） | 416 |
| **MB 掛著 Blue Note 家族廠牌、卻不在列舉檔裡** | **0** |

**一筆都沒有。**

**這把第 2356(三) 條的推測收斂成一句可操作的結論**：
**`enum/blue-note.json` 的 label 軸，對「MB 那一端有把 Blue Note 填上去」的碟是完整的**
（它列舉了 13 個 Blue Note 名下的 label 實體，見該檔 `entities`，涵蓋得很乾淨）。
**它唯一的盲區，是 MB 那一端沒填。**

**推論（給主線）**：
1. **重跑列舉腳本補不到這 25 張**——不管加什麼 `inc=`，label 軸都碰不到 `label-info` 為空的 release。
2. **要補只有兩條路**：**藝人軸**（本層做的），或 **Discogs 反查**。
3. ⚠ **同一支腳本產的其他廠牌線有同樣的盲區，而且盲區大小與「那個廠牌在 MB 上的建檔品質」成反比**
   ——Blue Note 這種大廠 7,184 個候選才漏 25 張（0.35%），**小廠很可能高得多**。

---

## 第 2487 條（**「失敗與正常長得一樣」的第六種形狀**）：**MB 把廠牌掛成母公司，不是掛 imprint**

第 1557 條記了兩種、c-168 第 2088 條第三種、c-169 第 2146／2209 條第四種、
本檔第 2356(三) 條第五種（label 軸碰不到 `label-info` 空的 release）。

**本條是第六種，是第五種的變形，但更隱蔽**：
**release 有 `label-info`、也不是空的——掛的是母公司 `Capitol Records`，不是 Blue Note imprint。**

`Kendrick Scott Oracle《A Wall Becomes a Bridge》` 是標準樣本：

| MB release | `label-info` |
|---|---|
| `eef85a5d-7efc-4baf-bf61-d604cce54215` | **`Capitol Records`**（MB label `abea2d3e`）／catno `null`／barcode `602577492068` |
| `ac837ebb-d3ca-4cf3-a9b4-ccc43bd5de9a`（2019-04-05、US） | **`[]`（空陣列）** |

**兩筆都不掛 Blue Note 家族實體，所以 label 軸一樣碰不到，而且「有 label-info」讓它看起來比空的更正常。**

**25 筆缺口的成因分佈**：

| 成因 | 筆 |
|---|---:|
| **`label-info` 全空** | **18** |
| **只掛母公司／他廠、Blue Note 那一筆是空的** | **6** |
| **掛成母公司 `Capitol Records` ＋另一筆空**（本條樣本） | **1** |

**→ 七分之一的缺口不是「空」，是「掛錯層級」。** 之後做同類稽核，
**不可以只掃 `label-info == []`，必須把「有 label-info 但不含該廠牌家族實體」的也撈進來覆核。**

---

## 第 2488 條（**25 筆 `gap` 全表**）

依年份排序。全部經過「MB `rgMbid` ＋（正規化藝人名, 正規化盤名）逐列比對四處皆 0 筆」＋「Discogs 廠牌鏈＋目錄號」雙重確認。

| # | 年 | 藝人 | 盤名 | RG MBID | 成因 |
|---:|---:|---|---|---|---|
| 1 | 1989 | Tommy Smith | Step By Step | `d9aafa98-b294-4940-bab0-0044c2d6dc4a` | label-info 空 |
| 2 | 1992 | Tommy Smith | Paris | `0fdc9ff7-28f1-4a70-8927-5fc558c02380` | label-info 空 |
| 3 | 1993 | Don Pullen & The African-Brazilian Connection | Ode to Life | `9ea8ad16-cfbb-382c-a4d9-b1382208cfff` | label-info 空 |
| 4 | 1993 | **大西順子** | Cruisin' | `e50b89cb-4c01-3c6c-99d8-69f4adb37814` | label-info 空（**羅馬字重查才撈到，見第 2493 條**） |
| 5 | 1994 | Ron Carter | Jazz, My Romance | `d4da0e99-768e-42bd-83f3-7d37b5149f6c` | label-info 空 |
| 6 | 1995 | Kevin Eubanks | Spiritalk 2: Revelations | `d783536c-ce83-378a-9211-ba829dee7003` | label-info 空 |
| 7 | 1996 | Jackie McLean | Hat Trick | `823b61c2-8402-4f27-a611-d95806fd703c` | label-info 空 |
| 8 | 1997 | Dexter Gordon | Tenor Titans | `03d9e3b3-32d3-426b-a173-44b7a94341f3` | label-info 空 |
| 9 | 1997 | Dianne Reeves | That Day… | `bb230b81-f930-3b99-9d16-9df70f85ea6a` | label-info 空 |
| 10 | 1997 | Jackie McLean | Fire and Love | `eca6903a-3e10-43ad-a40d-f480aa474255` | label-info 空 |
| 11 | 1997 | Ron Carter | Brandenburg Concerto | `3f03b660-8de5-33f8-a552-84365722a4d0` | label-info 空 |
| 12 | 1998 | Brian Blade Fellowship | Brian Blade Fellowship | `20765029-3ac1-3dae-bc61-76eefcf58e32` | label-info 空 |
| 13 | 1998 | Elvin Jones | At This Point in Time | `0351ea63-7b0f-31af-b871-8716589821ac` | label-info 空 |
| 14 | 1998 | Gonzalo Rubalcaba | The Trio | `8ebd5349-dd56-3257-9378-dff56259e57c` | label-info 空 |
| 15 | 1999 | Michel Petrucciani | Trio in Tokyo | `8b89c2f8-8d7a-3147-af17-1fd33f7d5d2d` | label-info 空 |
| 16 | 1999 | Prysm | Time | `1e8ff572-72cb-3a59-a31c-163b03c7acf7` | label-info 空 |
| 17 | 2001 | Ron Carter | Stardust | `bfb6c1ec-2f72-328e-a0f9-a844802cef07` | label-info 空 |
| 18 | 2002 | Stefano Di Battista | Round About Roma | `0762a45c-b1b7-3f51-9cb4-753b0746a011` | label-info 空 |
| 19 | 2003 | Jason Moran | The Bandwagon | `77690c69-cda4-3031-a834-bcdb3521a2b4` | label-info 空 |
| 20 | 2005 | Bill Charlap | Love Is Here to Stay | `6820c0ec-085b-4a2f-ab50-ac941198f509` | label-info 空 |
| 21 | 2011 | Ruben Hein | Live | `d00a707f-f318-434e-890a-dad529f8744b` | 只掛他廠＋空 |
| 22 | 2012 | Van Morrison | Born to Sing: No Plan B | `de243950-fafd-420f-bcf9-668241d61b45` | 只掛他廠＋空 |
| 23 | 2018 | James Francies | Flight | `f4539fe1-df19-4ad4-99d3-c2d5a2539471` | 只掛他廠＋空 |
| 24 | **2019** | **Joel Ross** | **KingMaker** | `6cd0a509-b96a-40cc-a807-7b6025bc2a99` | **label-info 空（第 2356 條的那一張）** |
| 25 | **2019** | **Kendrick Scott Oracle** | **A Wall Becomes a Bridge** | `c8f8ec1c-1899-4495-a6a1-57a555df47c8` | **掛成母公司 Capitol＋空（第 2487 條）** |

⚠ **年份分佈很說明問題**：**25 筆裡 20 筆在 1989–2005**，**2006 之後只有 5 筆**。
**MB 的 `label-info` 建檔品質是隨年份往後變好的**，所以這一類缺口集中在九〇年代到千禧年初。
**建議主線若要接，先接 1989–2005 那 20 張。**

⚠ **`Ron Carter` 一人 3 張、`Jackie McLean` 2 張、`Tommy Smith` 2 張**——
**同一位藝人連續漏，代表漏的不是隨機的單張，是「那一段時間那一位藝人的 MB 建檔習慣」。**

---

## 第 2489 條（**比對規則**）：**「四處都沒有」只認 `rgMbid` 與（正規化藝人名, 正規化盤名）兩種鍵，不認盤名單獨命中**

比對面涵蓋：`enum/blue-note.json`（1,812 列）、**全部** `batch-progress/c*/slice.json`、
**全部** `desc-tools/batches/cards/c*-cards.json`、`seed_cards.json`（17,248 列），
外加 `batch-progress/c*/prop-*.json` 當補充層。合計 `rgMbid` 鍵 5,514、（藝人, 盤名）鍵 17,579。

**不採「盤名單獨命中」**，因為第 1250 條在本層應驗得很兇：
`Love Is Here to Stay` 撞到 `八城一夫トリオ`（1968）、
`Flight` 撞到 `Howard Riley`（1971）、
`Cruisin'` 撞到 `Village People`（1978）、
`The Trio` 撞到 `本田竹広`（1970）、
`Time` 撞到 `鄭雙雙`（2024）、
`Stardust` 撞到 `山本剛`（1977）、
`Live` 撞到 `日野皓正クインテット`（1973）。
**七筆全是不同碟。** 若用盤名單獨命中當「已收」，這 25 筆會被銷案掉 7 筆。

**裁定：沿用第 1250 條的精神——判「同一張碟」只有「目錄號＋廠牌」或「MBID」有效；
判「已在我們手上」只有「`rgMbid`」或「(藝人, 盤名) 兩者同時」有效。**

---

## 第 2490 條（**Blue Note 家族邊界**）：**簡報第二節那兩個排除項在本層 0 次命中；但冒出第三個要排的東西——**演出場地**

簡報第二節排除 `Blue Note Compagnie`（`BNS-` 目錄號）與 `Blue Note Digital`（MB label `0293ae5c`）。
**本層 1,025 筆 Discogs 覆核，這兩者各 0 次命中**，不必動用。

⚠ **但冒出第三種要排的**。Discogs search result 的 `label` 陣列**混著 company／studio／演出場地**，不只廠牌。
全量掃過所有含 `blue note` 的字串只有六種：

| 字串 | 次 | 判定 |
|---|---:|---|
| `Blue Note` | 76 | 家族 |
| `Blue Note Records` | 11 | 家族 |
| `Blue Note International` | 7 | 家族 |
| **`The Blue Note Jazz Club`** | **3** | **⚠ 紐約那家俱樂部，不是廠牌** |
| `Blue Note 80 Vinyl Reissue Series` | 1 | 家族（再發系列） |
| `Elvin Jones On Blue Note` | 1 | 家族（套裝系列名） |

**`Kenny Werner《Democracy Live At The Blue Note》(2006)` 一度被判成 `gap`，實際廠牌是 `Half Note`**
——命中的是場地名。**改成白名單後正確退掉。**

**裁定：Blue Note 家族判定一律走白名單，並明列排除 `club`／`cafe`／`jazz club` 字樣。
⚠ 盤名裡帶 `Live At The Blue Note` 的碟，在這一線會反覆出現這個假陽性。**

---

## 第 2491 條（**Discogs 取用**）：**`api.discogs.com` 無需授權即可讀，`database/search` 直接回廠牌鏈與目錄號**

`label-info` 為空時，派工信要求「改看 Discogs 的廠牌鏈與目錄號」。
**實作**：`GET https://api.discogs.com/database/search?artist=<>&release_title=<>&type=release&per_page=25`，
UA 同 MB 那組，**不需要 token**，結果每筆直接帶 `label`（陣列）、`catno`、`country`、`year`、`format`、`barcode`、`uri`。
⚠ **網頁版 `www.discogs.com/master/...` 走 WebFetch 回 403**，API 則通。

**節流：未授權上限 25 req/min。** 本層用 3 支 worker、每支 `MIN_GAP=7.5s`（合計上限 24/min），
1,025 筆跑完只吃到 1 次 429，退避後即恢復。

**裁定：這一線之後要查 Discogs 廠牌鏈，一律走 API，不要走網頁。**

---

## 第 2492 條（**Discogs 覆核的守門**）：**搜尋結果必須同時過「年份差 ≤2 年」與「掛名字串出現在標題裡」兩關，才拿來判廠牌**

Discogs 的 `artist`＋`release_title` 搜尋會回同名不同碟。最乾淨的樣本是
**`Bill Charlap《Love Is Here to Stay》(2005)`**：同一次查詢回的 25 筆裡，
前四筆是 `Sandy Stewart, Bill Charlap`（2005、Blue Note、`7243 5 60340 2 0`）——**真的那張**，
第五、六筆是 **`Tony Bennett & Diana Krall With The Bill Charlap Trio`（2018、Verve／Columbia）**——**不同碟**。
**只看「有沒有 Blue Note」會對；只看「第一筆」會錯；只看年份或只看掛名都會漏。**

**裁定：兩關都要過才採信。** 本層照此判出 1,000 筆 `not-blue-note`、25 筆 `gap`。

---

## 第 2493 條（**⚠ 非拉丁掛名是一個獨立的失效模式；它讓 1 筆真缺口差點被判成 `not-blue-note`**）

本層 1,025 筆候選裡，**有 13 筆的掛名是日文漢字／假名**
（`大西順子`／`山中千尋` 6 張／`日野皓正` 2 張／`桑原あい`／`森山威男`／`菊地雅章` 2 張）。
**這 13 筆一開始全部被判成 `not-blue-note`，而且是錯的判法**，兩個原因疊在一起：

1. **Discogs 的 `artist=` 用日文漢字查，13 筆全部回 0 筆**——
   **「回 0 筆」在程式裡與「查過了、不是 Blue Note」長得一模一樣**（又一次「失敗與正常長得一樣」）。
2. **正規化函式把非 ASCII 全部剝掉**，`norm('大西順子')` 是**空字串**，
   於是「掛名必須出現在 Discogs 標題裡」這一關**恆不成立**，等於沒有守門。

**用羅馬字重查 13 筆之後**（`Junko Onishi`／`Chihiro Yamanaka`／`Terumasa Hino`／`Ai Kuwabara`／`Takeo Moriyama`／`Masabumi Kikuchi`），
**13 筆全部回到有結果的狀態，並且撈出 1 筆真缺口**：

- **`大西順子《Cruisin'》(1993)`**，RG `e50b89cb-4c01-3c6c-99d8-69f4adb37814`；
  Discogs 逐字 `Junko Onishi Trio - Cruisin'`、`label` 逐字 `['Blue Note', "Somethin' Else", 'Toshiba EMI Ltd']`、
  `catno` 逐字 `CDP 7243 8 28447 2 3`。四處比對 0 筆。

**裁定：本線只要對 Discogs 做掛名查詢，非拉丁掛名一律先轉羅馬字，並且「回 0 筆」要當成「沒查到」而不是「不是」。**
⚠ **這一條對日本盤很多的本線（`TOCJ-`／`UCCQ-`／`Somethin' Else` 那一段）影響面不小，建議寫進簡報第三節。**

---

## 第 2494 條（**範圍邊界，照派工信執行**）：**只產報告，沒有建 slice、沒有建卡單、沒有碰禁區**

- **沒有**建任何 `slice.json`、`prop-*.json`、卡單。
- **沒有**寫 `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`enum/blue-note.json`
  ——全部只讀。
- **沒有** `git commit`／`git push`／動索引。
- 暫存檔全在 scratchpad 且帶 `bn-audit-` 前綴。
- **產出只有兩個檔**：`batch-progress/enum/blue-note-artist-axis-audit.md` ＋ `.json`，
  加上本節 append 進 `batch-progress/c170/rulings.md`。

**接不接這 25 張、怎麼切批，由主線定。**

---

## 第 2495 條（**節流與併行**）：**MB 的「每秒 1 次」是速率不是併行度；分片跑完全程沒有被擋**

MB 端的實測瓶頸**不是**我們的節流，是**伺服器延遲**：
`release?query=rgid:(30 個 OR)` 這種查詢單發要 8–20 秒，單支 worker 只能做到 ~7 筆/分。
**7,184 筆這樣跑要 17 小時。**

**裁定：改用 3 支 worker、每支 `MIN_GAP=3.5s`（合計上限 ~0.86 req/s，仍在「每秒最多 1 次」之內），
批量從 15 個 rgid 提到 30 個並加分頁。** 結果：**7,184 筆在 ~45 分鐘跑完**，全程只在啟動瞬間吃到 3 次 503，退避後即恢復。

**判準**：**「每秒最多 1 次」約束的是送出速率，不是同時在途的請求數**；
只要把 per-worker 間隔乘上 worker 數仍 ≥1 秒，就沒有違反。
⚠ **但 503 會在三支同時發第一槍時集中出現**，所以退避必須留著（第 2 條：可逆，調回單支的成本只是慢）。

⚠ **另記一個實作坑**：用 `nohup … &` 從工具層起背景行程，**外層 wrapper 一結束會把子行程一起帶走**；
本層因此死了兩次。**要用 `setsid`。** 另外 **`pkill -f 'bn-audit…'` 會連自己那一行 shell 一起殺掉**（本層踩到一次，exit 144）。

---

## 第 2496 條（**⚠ 派工信與原文／既有裁定牴觸之處；依規定回報**）

派工信第六節要求交件回報指出「本信哪一句與既有裁定牴觸」。**本棒查出三處，其中兩處會改變結論：**

| # | 派工信原句 | 實查 | 影響 |
|---:|---|---|---|
| 1 | 第三節：「**已排除的一筆**：`Kendrick Scott Oracle《A Wall Becomes A Bridge》(2019)` 不是缺口，**它在 `desc-tools/batches/cards/c166-cards.json` 裡**」 | **錯。** 它只出現在**別張卡的敘述文字**裡，不是一筆卡；四處逐列比對 0 筆 | ⚠ **會漏掉一筆真缺口**（第 2485 條） |
| 2 | 第二節第 3 點：「`seed_cards.json` 裡 `label` 或 `scene` 與 Blue Note 相關…的卡的 `artist` 欄」 | **錯。** 該檔是緊湊陣列，**沒有 `label`，也沒有 `scene`** | 第三個來源無法照字面執行，改用等效替代（第 2483 條） |
| 3 | 第二節：「⚠ 同名實體要靠 `type` ＋ `disambiguation` 分辨」 | **本身沒錯，但本層用 rgid 反解後這一步完全不需要** | 無害；記為更好的做法（第 2482 條） |

**另外更正的是既有裁定、不是派工信**：**本檔第 2356(二) 條「藝人端回 `count: 0`」是錯的**（第 2484 條）。
⚠ **這一條若沒更正，這一棒本來不該存在**——派工信是對的，被更正的是它引用的那條裁定。

---

## 第 2497 條（**交件版本認定**）

**以工作區當下的 `batch-progress/enum/blue-note-artist-axis-audit.md` 與 `.json` 為交件版**
（第 1803-B 條：本線曾三次被中途檢查點撈走未定稿的版本）。
本層在跑的過程中把這兩檔**寫回磁碟四次**（種子 1 筆 → 藝人軸掃完 → 廠牌判定跑完 → Discogs 覆核跑完），
**中途版本的 `unclear` 數字會隨覆核進度變動，只有最後一版是 0。**
**「筆數對了」與「定稿了」在本棒是同一個時點：`Discogs 覆核 1,025／1,025`、`unclear 0`。**

---
