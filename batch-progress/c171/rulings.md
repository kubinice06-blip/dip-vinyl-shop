# c-171 裁定（Blue Note 1985 年後線・**藝人軸稽核補批**；a 組 13 張，1989–1998）

本批與 `c168`／`c169`／`c170` 都不是列舉檔切出來的，**是 `batch-progress/enum/blue-note-artist-axis-audit.md`（藝人軸稽核）找出來的 25 筆真缺口**
——**這 25 張連一列都不在 `enum/blue-note.json` 裡**（c-170 第 1812-B／1818-B／2486／2488 條）。
成因是 MB 的 `label-info` 沒填（18 筆）或掛錯層級（7 筆），**以廠牌為軸的列舉腳本永遠碰不到它們**。
判準沿用 `CURATION-BRIEF-bluenote-post1985.md` → `CURATION-BRIEF-bluenote.md` 第〇節 → `c131` → `c127` → `c126` → `c103plus` → `c93plus`，一字未改。
**a 組 13 張（1989–1998），編號區間 2691–2750，本檔用到 2711。**

---

## 第 2691 條（**總表**）：**13 張＝收 10 ／ 退 3**

| | 張 |
|---|---:|
| `slice.json` `g: "a"` | 13 |
| **`prop-a.json` 收件** | **10** |
| **a 組退件** | **3** |
| **合計** | **10 收 ＋ 3 退 ＝ 13** ✔（第 315 條結算通過） |

**收件 10 張**（依 `prop-a.json` 順序）：
`Tommy Smith《Step By Step》`1989／`Tommy Smith《Paris》`1992／`Don Pullen & The African-Brazilian Connection《Ode to Life》`1993／
`大西順子《Cruisin'》`1993／`Ron Carter《Jazz, My Romance》`1994／`Kevin Eubanks《Spiritalk 2: Revelations》`1995／
`Jackie McLean Meets Junko Onishi《Hat Trick》`1996／`Dianne Reeves《That Day…》`1997／`Ron Carter《Brandenburg Concerto》`**1996**（年份改判）／
`Brian Blade Fellowship《Brian Blade Fellowship》`1998。

**退件 3 張、三種不同的理由分類**：

| # | 卡 | 理由分類 | 條 |
|---:|---|---|---|
| 1 | `Dexter Gordon《Tenor Titans》`(1997) | **非 Blue Note 家族**（Storyville，丹麥廠）——**推翻稽核層的 `gap` 判定** | 2692 |
| 2 | `Jackie McLean《Fire and Love》`(1997) | **撞批次**——與 c-154 已收的《Fire & Love》是同一張碟，MB 建了兩個 RG | 2694 |
| 3 | `Elvin Jones《At This Point in Time》`(1998) | **合輯＋撞陳列**——Discogs 三個條目全標 `Compilation`，7 軌中 4 軌出自池中已收的《The Prime Element》 | 2696 |

**10 張、10 個相異掛名字串**（無一重複）。**年份改判 1 筆（第 2703 條）、覆核成立 9 筆。**
**⚠ 稽核層對這 13 張的「是 Blue Note 家族」判定，本層覆核結果是 12 成立、1 不成立**（第 2705 條）。

---

## 第 2692 條（a 組，**退件一；本批最重要的一條**）：**`Dexter Gordon《Tenor Titans》`(1997) 退——它是 Storyville 的盤，不是 Blue Note；稽核層的 `gap` 判定在這一筆上是錯的**

稽核層（`blue-note-artist-axis-audit.md` §三.8）把它判成 `gap`，**佐證只舉了一筆 Discogs**：
> **Discogs release 1742763**：`Dexter Gordon, Sonny Rollins, John Coltrane — The Three Tenors - Titans Of The Tenor Sax. Blue Notables Vol. 1`，`label` 含 `Blue Note`、catno `7243 8 53223 2 7`、UK & Europe **1996 CD／Compilation／Sampler**

**那是另一張碟。** 本層逐筆重查：

| 層 | 逐字 |
|---|---|
| MB RG `03d9e3b3-32d3-426b-a173-44b7a94341f3` | title「Tenor Titans」、**artist-credit 是 `Dexter Gordon & Ben Webster`（兩個實體，joinphrase ` & `）**，frd 1997、primary-type Album |
| MB release `cf4672bc`（1997、**DK**） | **`label-info` 逐字 `Storyville Records`／catno `STCD 8288`**，barcode 717101828821 |
| MB release `f710e1f0`（2016-03-26、JP） | `SOLID RECORDS`／catno `CDSOL-6975` |
| MB release `986f22ec`（2022-10-26、XW） | `label-info` 逐字 `[]`（數位） |
| Discogs `artist=Dexter Gordon&release_title=Tenor Titans&per_page=50` | **回 4 筆。前 3 筆是 `Dexter Gordon And Ben Webster — Tenor Titans`：11346705（Denmark 1997、`label` 逐字 `['Storyville']`、`STCD 8288`）、34823165（Japan 2007、Storyville／M & I／Pony Canyon、`MYCJ-30530`）、16275247（Japan 2016、Solid Records／Storyville Jazz Classics、`CDSOL-6975`）。第 4 筆才是稽核層引的 1742763，盤名不同、掛名不同、形態是 Compilation／Sampler。** |
| Discogs 11346705 的 `labels` 陣列（逐筆展開） | **只有一個元素：`Storyville`（label id 45469）。整張碟沒有任何 Blue Note 實體。** |

**→ `Tenor Titans` 的每一個實體版本（1997 丹麥原盤、2007 日版、2016 日版）都掛 Storyville，沒有一個掛 Blue Note。**
**判定：`not-blue-note`，退件。** 判準依 §一（Blue Note 家族閘）與判準第 3 條（卡住整條線，必須當場定）。

⚠ **順帶把兩件事釘死**（避免下游重查）：
1. **錄音年 1969／1972，不是 1997**（第 2697 條）。
2. **稽核層 25 筆 `gap` 裡至少這一筆要撤回**；**b 組與主線都不要再把它列進缺口**。

---

## 第 2693 條（**方法論；更正 c-170 第 2492 條**）：**Discogs 覆核的守門只有「年份差 ≤2」與「掛名出現在標題裡」兩關是不夠的——必須加第三關：盤名**

c-170 第 2492 條裁定：「搜尋結果必須同時過『年份差 ≤2 年』與『掛名字串出現在標題裡』兩關，才拿來判廠牌。」

**第 2692 條那一筆兩關全過、結論仍然是錯的**：
- 年份：Discogs 1742763 標 **1996**，目標 1997，**差 1 年 ≤2** ✔
- 掛名：`Dexter Gordon` **逐字出現在標題裡**（`Dexter Gordon, Sonny Rollins, John Coltrane — …`）✔
- **但盤名是 `The Three Tenors - Titans Of The Tenor Sax. Blue Notables Vol. 1`，不是 `Tenor Titans`。**

**成因**：`Titans` 與 `Tenor` 兩個詞都在，Discogs 的全文檢索因此把它排進 `release_title=Tenor Titans` 的結果；
**而掛名關只要求「掛名出現在標題裡」，多藝人合輯的標題必然包含每一位參與者的名字——這一關對合輯等於不設防。**

**裁定（新增，取代第 2492 條的兩關版）：Discogs 覆核一律走三關**——
1. **年份差 ≤2 年**；
2. **掛名字串出現在標題裡**；
3. ⚠ **正規化後的盤名必須與目標盤名相等，或目標盤名是結果盤名的完整子字串**（不是分詞命中）。
**外加一條否決**：**結果的 `format` 欄含 `Compilation`／`Sampler` 而目標是 Album 時，一律不採信為廠牌佐證。**
判準依第 3 條（不改這一關，這一類錯會在剩下 12 筆 `gap` 裡繼續出現）。

---

## 第 2694 條（a 組，**退件二**）：**`Jackie McLean《Fire and Love》`(1997) 退——與 `c-154` 已收的《Fire & Love》是同一張碟（MB 建了兩個 release-group）**

| 層 | c-171 slice | c-154（已定稿） |
|---|---|---|
| `artist` | `Jackie McLean` | `Jackie McLean` |
| `album` | **`Fire and Love`** | **`Fire & Love`** |
| `year` | 1997 | 1997 |
| `rgMbid` | **`eca6903a-3e10-43ad-a40d-f480aa474255`** | **`9d5b5763-f9ed-4c6c-8266-fde9847c2148`** |
| RG credit | `Jackie McLean Septet`（單一實體 5b6993ef） | `Jackie McLean`（同一實體 5b6993ef） |
| 轄下 release | `9043f594`（1997 **JP** CD **7 軌**，barcode 4988006735545，`label-info` `[]`） | `74d17111`（1997 **US** CD **9 軌**，Blue Note `CDP 7243 4 93254 2 5`） |

**c-154 的 `prop-a.json` 已經把兩個形狀都寫進同一張卡**，逐字：
> 「**Seven track Japanese version. In Europe and the US a nine track version was released credited to Jackie McLean & The MacBand.**」——**日版 TOCJ-5590 七軌、掛 `Jackie McLean Septet`；美歐版九軌、掛 `Jackie McLean & The MacBand`**

**→ c-171 slice 這一筆指的就是 c-154 那張卡的「日版七軌形」。** 這是第 611 條第三種盲區（**MB 把同一張碟建成兩個 RG**）的教科書實例。
**判定：撞批次，退件。不補別張**（本批清單已固定）。判準依第 1 條（有先例：本線對雙 RG 一律退後者）與第 2 條（可逆）。

---

## 第 2695 條（**給主線：稽核層為什麼沒抓到第 2694 條那一筆**）：**正規化把 `&` 當標點剝掉，`Fire & Love` 與 `Fire and Love` 因此摺成兩個不同的鍵**

c-170 第 2489 條說「（正規化藝人名, 正規化盤名）兩種鍵」的比對面涵蓋全部 `c*/slice.json`、全部 `c*-cards.json`、`seed_cards.json`、全部 `c*/prop-*.json`——
**c-154 的三處記錄都在比對面裡，卻沒有命中。** 原因不在覆蓋面，在正規化函式：

| 字串 | 剝標點（稽核層） | **先 `&`→`and` 再剝**（本層） |
|---|---|---|
| `Fire & Love`（c-154） | `firelove` | `fireandlove` |
| `Fire and Love`（MB RG credit 那一支） | `fireandlove` | `fireandlove` |

**兩者在稽核層的鍵不相等，所以它被判成「四處都沒有」。**

⚠ **這正是 `batch-progress/c171/chk-prop.mjs` 檔頭註解裡那個 c-117 第 117 條踩過的坑**
（逐字：「原本的正規化把 `&` 當標點刪掉、卻留著 `and`……**`&`／`and` 分裂的撞卡一個都抓不到，標記 0 不等於沒撞卡**」）——
**`chk-prop` 早就修好了，稽核層那支一次性腳本沒有沿用。**

**裁定（給主線）**：
1. **稽核層 25 筆 `gap` 裡，凡盤名含 `&` 或 `and` 的都要用修正後的正規化重跑一次**——本批 13 張裡只有這一筆中，**但 b 組與剩下 12 筆沒掃過**。
2. **之後任何一次性比對腳本，正規化一律直接抄 `chk-prop.mjs` 的 `k()`**（`.replace(/[&＆]/g,'and')` 在剝標點之前），不要自己再寫一份。
3. ⚠ **推論**：c-170 第 2486 條「`bn-label-present` 掛零、列舉檔的 label 軸是完整的」那個結論**不受影響**（那是 label 軸的結論）；**但「四處都沒有 ⇒ 真缺口」這一步的假陽性率不是 0**——**本批 13 張裡實測 1 筆（7.7%）**。

---

## 第 2696 條（a 組，**退件三**）：**`Elvin Jones《At This Point in Time》`(1998) 退——合輯，且七軌中四軌與池中已收的《The Prime Element》重疊**

MB 標 `primary-type Album`／`secondary-types []`——**這正是簡報第一節第 2 點警告的「MB 的 `secondary-types` 兩個方向都會漏」（第 397 條）。**
**判準照簡報：只讀逐張文案與軌目來源，不讀標題、不看尾碼。** 逐筆展開 Discogs：

| Discogs | 年 | 形態（`format` 逐字） |
|---|---:|---|
| 13883750（US，`CDP 7243 4 93385 2 4`） | 1998 | **`['CD','Compilation']`** |
| 4963884（Europe，`7243 4 93385 2 4`） | 1998 | **`['CD','Compilation','Stereo']`** |
| 25315330（Japan，`UCCU-45065`，`Elvin Jones On Blue Note` 系列） | 2022 | **`['CD','Compilation','Reissue']`** |

**三個條目、三個地區、跨 24 年，`Compilation` 一致——不是第 782 條那種 Discogs `format` 欄寫錯的形狀。**

Discogs 13883750 的 notes **逐字**：
> Recorded on July 24 (#3-4), July 25 (#5-7) and July 26 (#1-2), **1973** at A&R Recording Studios, New York City.
> **#1-4 previously issued as part of the double album [r=2615364] (BN LA 506-2). #5-7 previously unissued.**

**`BN-LA506` 就是《The Prime Element》**，**池中已收**（`seed_cards.json` ＋ c-144 卡單與 `prop-a.json`，`Elvin Jones《The Prime Element》1976`）。
軌目重疊實算：7 軌 60:00 裡，**前 4 軌（At This Point in Time 7:32／Currents-Pollen 11:12／The Prime Element 8:16／Whims of Bal 12:22＝39:22，約 66% 的時長）是已發行過的同一份錄音**；
**第三軌的曲名逐字就叫〈The Prime Element〉。** 這是第 738／859 條的撞陳列，而且是靠軌目比對才看得到的那一種。

**判定：退件，理由分類「合輯（§5.6 未過）＋撞陳列」。** 未走 §5.6 精選制的理由：
- §5.6 要求合輯自己交代**歷史重要性**與**可追溯的證據**——本張是 1998 年 Bob Belden 監製的 Blue Note 目錄整理品（Ron McMaster 20-bit SBM 母帶、Peter Doell 重混），**不是有獨立歷史地位的精選盤**；
- 三軌未發行素材確實有價值，**但那不足以讓一張 66% 時長與池中既有卡重疊的碟單獨上架**；
- c-145 的「庫存盤寫法」（`year` 取首發年、`risk` 寫錄音年）**不適用**——c-145 的前提是**全碟未曾商業發行**，本張不是。

判準依第 1 條（有先例：本線對「與池中卡軌目重疊過半的再整理盤」一律退）與第 2 條（可逆：日後主線若要走 §5.6，改的是卡單值不是卡池結構）。

---

## 第 2697 條（**派工信第三節點名要查的兩張：錄音年判定**）

派工信要求「**(乙) 與簡報第一節第 1 點的『看錄音年』要當場查清楚**」。兩張都查了，**兩張都是 1985 年前的錄音，但退件理由各不相同**：

| 卡 | `year` 候選 | **錄音年（逐字來源）** | 是不是「庫存盤」 | 本層處置 |
|---|---:|---|---|---|
| `Dexter Gordon《Tenor Titans》` | 1997 | **1969 與 1972**——Discogs 11346705 notes 逐字：「Tracks 1-3: Concert, **Flensborg, March 23, 1972**. Tracks 4-7: Jazzstævnet, **Vallekilde Højskole, July/August, 1969**. **Previously unissued.**」 | **是**（`Previously unissued`，1997 首次商業發行） | **退**——但**不是因為錄音年**，是因為**非 Blue Note**（第 2692 條）。⚠ 若日後 Storyville 線開，這張照 c-145 寫法收：`year` 取 **1997**、`risk` 寫錄音年 1969／1972 與 catno `STCD 8288` |
| `Elvin Jones《At This Point in Time》` | 1998 | **1973-07-24／25／26**，A&R Recording Studios, NYC（Discogs 13883750 notes 逐字） | **否**——**7 軌中 4 軌 1976 年已隨《The Prime Element》(BN-LA506) 發行過**，只有 3 軌未發行 | **退**——合輯＋撞陳列（第 2696 條）。**c-145 的庫存盤寫法不適用**，前提（全碟未曾商業發行）不成立 |

⚠ **兩張都印證簡報第一節第 1 點**：「這一段的主要風險是**這張根本不是新錄音**」。
⚠ **同時多一條觀察**：這兩張都**不是**簡報講的「再發系列折不乾淨」那一種（沒有 RVG／Connoisseur／Tone Poet 尾碼），
**它們是『1985 後首發、但內容是 1985 前錄音』的第三種形狀**——**盤名與尾碼完全看不出來，只有 notes 的錄音日期看得出來**。
**裁定：這一段的每一張，錄音日期都要當成必查欄位，不能只在盤名可疑時才查。**

---

## 第 2698 條（**掛名，本批最需要協調的一筆；b 組讀本條**）：**`Ron Carter` 三張一律掛 `Ron Carter`；`Ron Carter Trio` 並存不收攏**

本批三張刻意跨在兩組：**a 組《Jazz, My Romance》(1994)、《Brandenburg Concerto》(1996)；b 組《Stardust》(2001)**。**三組必須一致。**

| 依據 | 逐字 |
|---|---|
| **(甲) MB RG credit** | 三張的 artist-credit 都是**單一實體**、`name` 欄逐字 `Ron Carter`（`57db3f59-9c58-4f68-a00e-e044666c4828` Person／US／`US jazz double-bassist`）。**《Stardust》的 RG `bfb6c1ec-2f72-328e-a0f9-a844802cef07` 由本層代查確認**：credit `Ron Carter`、frd 2001、primary-type Album、secondary-types 空。**沒有一張帶 Trio／Quartet 尾綴。** |
| **(乙) 池中先例（第 307 條）** | `Ron Carter` 這個字串在 **c-150《Ron Carter Meets Bach》** 立起（該卡 risk 逐字：「**本卡是池中第一張 `Ron Carter` 掛頭的卡，日後他的其他領班盤一律沿用這個字串，不得再造第三種**」），其後 c-151《Friends》／c-153《Mr. Bow-Tie》／c-154《The Bass and I》／c-156《Orfeu》／c-157《When Skies Are Grey》／c-158《The Golden Striker》／c-160《Dear Miles,》／c-161《Jazz & Bossa》沿用，**共 9 張** |
| **(丙) 並存字串** | `Ron Carter Trio`（c-168《So What》1998）、`Ron Carter & Danny Simmons`（c-164）、`Ron Carter, Ricky Dillard`（c-167）、seed 的 `Jim Hall & Ron Carter`／`Red Garland / Ron Carter / Philly Joe Jones`、c-151 slice 的 `Geri Allen Trio With Ron Carter, Tony Williams`——**全部並存、不收攏**（第 964／196／197 條；第 307 條防的是同一實體的多種寫法，不是不同 credit 並存） |

**裁定：`Ron Carter`。b 組不得把《Stardust》寫成 `Ron Carter Trio`／`Ron Carter Quartet`／`Ron Carter Nonet`。**

⚠ **同時更正派工信的一個數字**：派工信寫「池中已有 `Ron Carter` 11 張」。
**實掃是 9 張**（上表乙欄逐一列出），**而且 9 張全部在未上架批次（c-150～c-161 的 `*-cards.json` ＋ `prop-*.json`），`seed_cards.json` 裡 `Ron Carter` 掛頭的卡是 0 張。**
**依第 409b／439 條，`why` 欄一律寫成「漢字 0／羅馬字 0／英文字串 9，且 9 張都還沒上架」。**

⚠ **另給 b 組一個實查**：**《Stardust》的 MB RG 底下只有 1 筆 release `c8fe0162`，`country` 是 `RU`、`label-info` 逐字 `[]`。**
**派工信說「俄版 `Unofficial Release` 一律不當依據」——這一筆的 `status` 要自己再核一次，不要拿它當首發年或廠牌的依據，改用 Discogs 原壓群。**

---

## 第 2699 條（**掛名**）：**`大西順子` 取漢字，不取 MB credit 的 `Junko Onishi`**

MB 的 artist **實體名逐字是 `大西順子`**（`fc224843-542a-488e-b9e5-3dc7856d44e6` Person／JP／sort-name `Onishi, Junko`），
**但 RG 的 artist-credit `name` 欄逐字是羅馬字 `Junko Onishi`**，轄下日版 release `f494fcd9` 的 credit 又是 `Junko Onishi Trio`——**同一個實體、三種寫法。**

| 字形 | 池中張數 | 出處 |
|---|---:|---|
| **漢字 `大西順子`** | **3** | `seed`《WOW》1993／c-152 卡單＋`prop-a.json`《Live at the Village Vanguard》1994／c-161 卡單＋`prop-b.json`《Musical Moments》2009 |
| 羅馬字 `Junko Onishi` | 0 | 只出現在 `c161/slice.json`（卡單層已折成漢字） |
| 羅馬字 `Junko Onishi Trio` | 0 | 只出現在 `c152/slice.json`（卡單層已折成漢字） |
| 英文其他寫法 | 0 | — |

**這是第 307 條（同一實體的多種寫法）的正例**，與第 2698 條（丙）（不同實體並存）的形狀不同。
**裁定：`大西順子`。** 兩種羅馬字形進 `queryAlias`。`c171/slice.json` 本來就寫漢字，與本裁定一致。

⚠ **但下游查詢一律用羅馬字**（第 2493 條）：**本層實測 `api.discogs.com/database/search?artist=大西順子` 回 0 筆，改 `artist=Junko Onishi` 才回 3 筆。**
**「回 0 筆」是「沒查到」不是「不是」。** 卡池實掃本層**兩種字形都掃過**。

---

## 第 2700 條（**掛名**）：**`Jackie McLean Meets Junko Onishi` 照 MB credit 原樣，不折成 `Jackie McLean`**

MB RG `823b61c2` 的 artist-credit 是**兩段**：
`{name:"Jackie McLean", artist: 5b6993ef Person, joinphrase: " Meets "}` ＋ `{name:"Junko Onishi", artist: fc224843 Person（實體名 大西順子）}`。

**兩個實體 ⇒ 適用第 964／196／197 條（並存），不適用第 307 條（收攏）。** 池中先例整齊支持並存：
`Jackie McLean & Dexter Gordon`（seed）／`Jackie McLean & Tina Brooks`（seed＋c-145）／`Kenny Dorham & Jackie McLean`（seed＋c-139）／`McCoy Tyner & Jackie McLean`（c-148）
——**四個聯名字串都與單獨的 `Jackie McLean`（seed 21 張＋未上架批次 14 張）並存。**

⚠ **與 c-154《Fire & Love》的差別要講清楚，否則看起來像自相矛盾**：
c-154 把 `Jackie McLean Septet`／`Jackie McLean & The MacBand` 折成 `Jackie McLean`，**因為那兩形的 MB artist-credit 都只有一個實體**（`Jackie McLean Septet` 是 credit 欄的別寫，MB 沒有建 MacBand 這個 Group）。
**本張是兩個實體，形狀不同，處置因此不同。**

⚠ **本層自覺的取捨**：聯名字串裡的大西那一半用羅馬字 `Junko Onishi`（MB credit 原樣），
而她自己的卡（第 2699 條）用漢字 `大西順子`。**這是有意為之**：
**聯名字串照 MB credit 不拆改，不得自造 `Jackie McLean Meets 大西順子` 這種兩來源混拼的第三形**——那才是第 307 條要防的新造分裂。
漢字形已進 `queryAlias`。**Discogs 用小寫 `meets`，`artist` 取 MB 的大寫 `Meets`，小寫形進 `queryAlias`。**

---

## 第 2701 條（**掛名**）：**`Don Pullen & The African-Brazilian Connection` 是 MB 的 Group 實體，與 `Don Pullen` 並存**

MB `5f633e7f-12d1-4a91-a304-03275a144c16` 的 `type` 逐字是 **`Group`**、`name` 逐字是 `Don Pullen & The African-Brazilian Connection`（不是兩段 credit 串接）。
池中該字串已有 2 張（c-150《Kele Mou Bana》、c-152《Live...Again (Live at Montreux)》），
與 `Don Pullen`（seed 1＋批次 3）、`The Don Pullen-George Adams Quartet`（c-148／c-149）、`Don Pullen Featuring Sam Rivers`（seed）、`Don Pullen Quintet`（seed）**五個字串並存**。
**裁定：照 MB Group 原樣，不收攏。** 判準第 1 條（有先例：池中同一位藝人已有五種並存字串）。

⚠ **正文警語**：**George Adams 1992 年 11 月過世，本張是 1993 年 2 月錄的追悼盤，他沒有參與錄音**
——**不得把他寫成本張的演出者**（池中 `The Don Pullen-George Adams Quartet` 兩張才是兩人同台）。

---

## 第 2702 條（**同名專輯**）：**`Brian Blade Fellowship《Brian Blade Fellowship》`(1998) `selfTitled: true`**

團名與盤名逐字相同（MB RG credit `Brian Blade Fellowship`／`ad45a94c` **Group**；MB title `Brian Blade Fellowship`）。
**`selfTitled` 欄設 `true`**，並在 `risk` 寫明「下游任何『盤名 → 卡』的比對在這一筆上會與掛名同值」。

⚠ **掛名沿用池中多數寫法 `Brian Blade Fellowship`**（c-156《Perceptual》2000、c-164《Body and Shadow》2017）；
`c164/slice.json` 另有 `Brian Blade & the Fellowship Band` 一形，**c-164 卡單層已折成 `Brian Blade Fellowship`**——**本卡不新造第三形**，另一形進 `queryAlias`。

---

## 第 2703 條（**年份改判，本批唯一一筆**）：**`Ron Carter《Brandenburg Concerto》`1997 → **1996****

**MB 的 frd 1997 沒有任何 release 支持**：RG `3f03b660` 底下**唯一的** release `e8a7893f` **連 `date` 欄都沒有**（也沒有 `country`、沒有 barcode、`label-info` 逐字 `[]`）。

**第 1800-B 條要求的兩種掃描都跑了，兩種都指向 1996**：

| 掃描 | 結果 |
|---|---|
| **(甲) 全 release 掃描** `artist=Ron Carter&release_title=Brandenburg Concerto&type=release&per_page=50` | **回 5 筆，`year` 全部 1996**：9872057（US，Blue Note `CDP 7243 8 54559 26`）／17381494（US Promo 同號）／11424011（Canada BMG 俱樂部版 `CDP 7243 8 54559 2 6`）／27583047（Japan，EAU Records `TOCJ-6037`）／11783863（Japan Promo 同號） |
| **(乙) barcode 反查** `barcode=724385455926` | **回 2 筆，皆 1996 US** |
| 錄音日 | **1995-12-27**，Clinton Recording Studios, New York（Discogs 9872057 notes 逐字） |

**七筆零售條目、三個國家、零筆 1997。** 依簡報第二節的階序（**Discogs 原壓群 ＞ MB first-release-date**，第 531 條）與第 550／570／708 條的警示（MB／Discogs 的年份欄都會抄錯），**取 1996**。
判準第 2 條（可逆：改的是卡單的 `year` 值）與第 3 條（不定就沒辦法往下）。**MB 的 1997 寫進 `mbNote` 與 `risk`。**

---

## 第 2704 條（**曲風閘**）：**`Ron Carter《Brandenburg Concerto》` 判 `genres: ["jazz"]`，不加 `classical`**

派工信點名「古典曲目改編，**曲風閘要查**」。實查：

- Discogs 9872057 的 **`genres` 逐字 `['Jazz','Classical']`**、**`styles` 逐字 `['Baroque','Contemporary Jazz']`**（日版 11783863 同）。
- 曲目 6 首裡 5 首是古典改編（巴哈《布蘭登堡協奏曲第三號》、佛瑞〈Pavane〉、巴爾托克〈Joc cu bâtă〉、葛利格《霍爾堡組曲》的〈Aria〉、韓德爾〈Ombra mai fu〉），1 首自作（〈Vientos del Desierto〉）。
- 編制：Ron Carter 低音提琴與 piccolo bass ＋ 弦樂團，Kermit Moore 指揮，**Carter 自己編曲兼製作**。

**先例（判準第 1 條）**：**c-150《Ron Carter Meets Bach》(1992)** 的 `prop-b.json` risk 逐字：
> 「⚠ **曲風判定**：全碟是巴哈曲目，但**編制、編曲者與發行脈絡都是爵士**（Blue Note 主線目錄、Carter 自編、無古典樂團）……**genres 維持 `jazz`，不加 classical**」

本張與該張是**同一位藝人、同一條企劃線、同一間錄音室（Clinton）、同一位錄音師（Jim Anderson）、同一位東芝 EMI 監製（Hitoshi Namekata）**，
**唯一的差別是本張多了弦樂團**。**弦樂團不足以翻轉先例**——爵士領班盤配弦樂（with strings）是本線既有的常見形狀。

**裁定：`genres: ["jazz"]`。**
⚠ **但正文必須寫清楚這是「爵士低音提琴手改編古典曲目、由弦樂團伴奏」，不得寫成古典錄音，也不得寫成即興專輯**（全碟是寫定的編曲）。

---

## 第 2705 條（**覆核稽核層的「這張是 Blue Note 家族」判定，13 張逐筆**）：**12 成立、1 不成立**

派工信要求「**你要逐張覆核那個判定**」。方法：對每一張跑 `api.discogs.com/database/search`（`artist`＋`release_title`，`per_page=50`）＋ barcode 反查，
**把每一筆結果的 `label` 陣列整個展開**，再過第 2693 條的三關與第 2490 條的白名單（排除 `club`／`cafe`／`jazz club` 字樣）。

| # | 卡 | 家族證據（`label` 陣列逐字 ＋ 目錄號） | 覆核 |
|---:|---|---|:--:|
| 1 | Tommy Smith《Step By Step》 | `Blue Note`／`Blue Note International`；`B1-91930`／`BLT 1001`／`CDP 7919302` | ✔ |
| 2 | Tommy Smith《Paris》 | `Blue Note International`；`CD BLT 1005`／`TC-BLT1005`／`780612 1` | ✔ |
| 3 | Don Pullen & The A-B Connection《Ode to Life》 | `Blue Note`；`CDP 0777 7 89233 2 9`／`TOCJ5834` | ✔ |
| 4 | 大西順子《Cruisin'》 | `Blue Note`＋`Blue Note Records`（US 7578461）；`CDP 7243 8 28447 2 3`／`TOCJ-5555` | ✔（**須用羅馬字才查得到**） |
| 5 | Ron Carter《Jazz, My Romance》 | `Blue Note`＋`Blue Note Records`；`CDP 7243 8 30492 2 6`／`TOCJ-5560` | ✔ |
| 6 | Kevin Eubanks《Spiritalk 2》 | `Blue Note`；`CDP 7243 8 30132 2 7`／`CDP 530132` | ✔ |
| 7 | Jackie McLean Meets Junko Onishi《Hat Trick》 | `Blue Note`＋`Blue Note Records`；`CDP 7243 8 38363 2 1`／`TOCJ-5581` | ✔ |
| **8** | **Dexter Gordon《Tenor Titans》** | **`Storyville` 唯一，三個實體版本全無 Blue Note** | **✘ 退（第 2692 條）** |
| 9 | Dianne Reeves《That Day…》 | `Blue Note`；`CDP 7243 8 56973 2 6`／`TOCJ-6144` | ✔ |
| 10 | Jackie McLean《Fire and Love》 | `Blue Note`（美歐版）——**家族成立，但撞 c-154，另案退**（第 2694 條） | ✔（家族） |
| 11 | Ron Carter《Brandenburg Concerto》 | **美／加版 `Blue Note`（label id 281）`CDP 7243 8 54559 2 6`；⚠ 日版 `TOCJ-6037` 的 `label` 只有 `EAU Records`、沒有 Blue Note** | ✔（**限美／加版**） |
| 12 | Brian Blade Fellowship《Brian Blade Fellowship》 | `Blue Note`；`7243 8 59417 2 6`／`TOCJ-6192`／2020 再發 `0845480` | ✔ |
| 13 | Elvin Jones《At This Point in Time》 | `Blue Note`＋`Elvin Jones On Blue Note`——**家族成立，但是合輯，另案退**（第 2696 條） | ✔（家族） |

⚠ **`The Blue Note Jazz Club` 在本批 13 張的全部 Discogs 結果裡 0 次命中**（第 2490 條那個假陽性沒有出現）。
⚠ **`Blue Note Compagnie`（`BNS-`）與 `Blue Note Digital` 也各 0 次命中。**
⚠ **新增一個要在 `label` 欄寫清楚的形狀（第 11 筆）**：**同一張碟在美國掛 Blue Note、在日本掛第三方廠牌（`EAU Records`）**
——`label` 欄要寫成「美版 Blue Note／日版 EAU Records」，**不得寫成「全球 Blue Note 發行」**。
⚠ **`Somethin' Else` 一律當家族內的日本線看待**（本批 4／5／7 三張、同一位監製 Hitoshi Namekata、同一位錄音師 Jim Anderson），**不是要排除的第三方**。

---

## 第 2706 條（**形態閘，c-169 a 新立；10 張全過**）：**判準順序照第 1811-B 條——零售條目的 `format` 欄 ＞ 總長**

| 卡 | 零售 `format` 逐字 | 軌數 | 實算總長 | 判 |
|---|---|---:|---:|---|
| Step By Step | `['Vinyl','LP','Album']`／`['CD','Album']` | 6（LP）／8（CD） | 43:34（LP） | Album |
| Paris | `['CD','Album','Stereo']` | 12 | **73:53** | Album |
| Ode to Life | `['CD','Album']` | 7 | 59:00 | Album |
| Cruisin' | `['CD','Album']` | 9 | 61:37 | Album |
| Jazz, My Romance | `['CD','Album']` | 8 | 53:57 | Album |
| Spiritalk 2: Revelations | `['CD','Album']` | 9 | 50:08 | Album |
| Hat Trick | `['CD','Album']` | 9 | 53:57 | Album |
| That Day… | `['CD','Album']` | 10 | 52:13 | Album |
| **Brandenburg Concerto** | `['CD','Album']`（美日皆然） | **6（美）／4（日）** | **42:35（美）／33:49（日）** | Album |
| Brian Blade Fellowship | `['CD','Album']` | 8 | 61:43 | Album |

**十張的 `format` 欄都不含 `EP`／`Single`，總長全部 ≥42 分鐘。**
⚠ **唯一需要動用判準順序的是《Brandenburg Concerto》**：**日版 TOCJ-6037 只有 4 軌 33:49**（缺〈Pavane〉與〈Joc cu bâtă〉，**兩個日版條目都是 4 軌、不是漏建**），單看總長會靠近 EP 區間；
**但兩版的 `format` 欄都逐字寫 `Album`，且美版 6 軌 42:35 才是完整形**——**依第 1811-B 條的順序判 Album。**
⚠ **《Spiritalk 2》中段三首短曲（〈Earth〉2:42／〈Sun〉4:25／〈Moon〉1:47）是同一組三聯曲，不影響總長判定。**

---

## 第 2707 條（**卡池實掃：方法與第 611 條五種盲區**）：**唯一一筆撞卡靠 `&`→`and` 正規化抓到，其餘 12 張四處皆 0**

**比對面**：`seed_cards.json`（**唯讀**，17,248 列）＋ `desc-tools/batches/cards/*.json`（全部）＋ `batch-progress/c*/prop-*.json`（全部）＋ `batch-progress/c*/slice.json`（全部），**合計 30,184 列**。
**正規化直接抄 `chk-prop.mjs` 的 `k()`**（`NFKC` → 小寫 → **`&`→`and`** → 剝非文字非數字，`\p{L}\p{N}` 保留漢字與假名）。

⚠ **判「已收」一律比對 `album` 欄逐字（第 1819-B／2485／2489 條），不用 grep 掃整份 JSON。**
本層照辦，**結果驗證了這條規則的必要性**：13 張的盤名在 30,184 列裡命中 20 次，**逐筆核完真的同碟只有 1 筆**——

| 盤名 | 盤名命中 | 真同碟 | 假陽性是什麼 |
|---|---:|---:|---|
| `Paris` | 6 | 0 | Erik Truffaz《Paris》(2008, c-161)／Jacky Terrasson《À Paris》(2000, c-157) |
| `Cruisin'` | 1 | 0 | **Village People《Cruisin'》(1978, seed)**（第 2489 條已點名過） |
| `Fire and Love` | 3 | **1** | **c-154《Fire & Love》——真的同碟**（第 2694 條） |
| 其餘 10 張 | 各 0 | 0 | — |

**第 611 條五種盲區逐一掃過**：

| 盲區 | 本批結果 |
|---|---|
| 群組掛名 vs 個人掛名 | 掃過。`Don Pullen` vs `Don Pullen & The African-Brazilian Connection` vs `The Don Pullen-George Adams Quartet`／`Ron Carter` vs `Ron Carter Trio`／`Jackie McLean` vs 四個聯名字串／`Brian Blade Fellowship` vs `Brian Blade & the Fellowship Band`——**全部逐筆展開比對，0 筆撞卡** |
| 同名但不同盤的 Volume 碟 | 本批無 Volume 碟。⚠ 但《Spiritalk 2: Revelations》是續作，**第一集《Spiritalk》(1993) 池中與所有批次都沒有**（見第 2708 條） |
| **MB 把同一張碟建成兩個 RG** | **命中 1 筆**：`Fire and Love`（RG `eca6903a`）vs c-154 `Fire & Love`（RG `9d5b5763`）——**這一批唯一的撞卡**（第 2694 條） |
| 斜線掛名 | 掃過。`Red Garland / Ron Carter / Philly Joe Jones`（seed）與本批 `Ron Carter` 不撞 |
| 同名但不同盤 | 命中 7 次（上表），**真同碟 0** |

⚠ **`chk-prop` 第五道（盤名撞 apex，report-only）另見第 2710 條的執行結果。**
⚠ **跨批去重另跑 `node batch-progress/dedup-crossbatch.mjs c171`**（結果見第 2710 條）。

---

## 第 2708 條（**盤名取法，四筆有歧形**）：**一律取 MB RG 的 `title` 原樣，其他形進 `queryAlias`**

| 卡 | MB title（採用） | 其他形 | 處置 |
|---|---|---|---|
| Ode to Life | `Ode to Life` | 盤面／Discogs 全題 `Ode To Life (A Tribute To George Adams)`；日題「太陽の讃歌〜ジョージ・アダムスの魂に捧げる〜」 | 副題進 `queryAlias`，**正文可寫副題、`album` 不併** |
| Spiritalk 2: Revelations | `Spiritalk 2: Revelations`（**ASCII 冒號**） | Discogs `Spiritalk 2 - Revelations`（連字號） | 取冒號形（ASCII，不觸發 `chk-prop` 的非 ASCII 連字號閘） |
| That Day… | `That Day…`（**U+2026 單一省略號字元**） | Discogs 美版 `That Day...`（三個 ASCII 句點）／歐版與 repress `That Day` | 取 MB 原樣。**U+2026 不在 `chk-prop` 的非 ASCII 連字號清單裡**（該閘只擋 `‐‑‒–—―－` 與誤用的 `ー`），不觸發標記。**下游比對三形都要試** |
| Hat Trick | credit `Jackie McLean Meets Junko Onishi`（**大寫 Meets**） | Discogs 小寫 `meets` | 取 MB 大寫形（第 2700 條） |

⚠ **非 ASCII 連字號正規化成 ASCII**：本批 10 張的 `artist` 與 `album` **逐字檢查，無 `‐‑‒–—―－`、無誤用的 `ー`**，不需要改寫。

⚠ **另記一個缺口（給主線，不影響本批結算）**：**Kevin Eubanks《Spiritalk》(1993, Blue Note) 池中與所有批次都沒有**
（`Kevin Eubanks` 只有 c-151《Turning Point》1992、c-152《Live at Bradley's》1994，加本批第二集）。
**它與本批 13 張是同一種成因的機率很高，建議主線列進回頭查。**

---

## 第 2709 條（**雲端環境限制，第 254 條只寫觀察不寫結論**）

| 來源 | 實測 |
|---|---|
| `musicbrainz.org/ws/2` | **通**。1 req/1.2s，全程 0 次 503 |
| `api.discogs.com/database/search` 與 `/releases/<id>` | **通，無需 token**（第 2491 條成立）。本層用 3s 間隔，全程 0 次 429 |
| `coverartarchive.org/release-group/<id>` | **通**。10 張裡 **5 張有 front**（Step By Step 1 圖／Ode to Life 5 圖／Jazz, My Romance 1 圖／Hat Trick 2 圖／That Day… 1 圖，來源 release 全部是原盤 ✔），**5 張 RG 層 0 圖**（Paris／Cruisin'／Spiritalk 2／Brandenburg Concerto／Brian Blade Fellowship）——**封面待本機補** |
| **`itunes.apple.com/search`** | **⚠ 回 HTTP 403**（雲端 egress 被擋）。`itunes.apple.com/lookup?id=…` 通，但**沒有候選 ID 就用不上** |

**裁定：三種店面查法（第 254 條）本批整批留本機**，`prop-a.json` 每一張的 `risk` 都寫了「雲端 iTunes `search` 回 403，留本機」。
**不因查不到而降級任何判定**（`REMOTE_RUNBOOK.md` 雲端硬規則第 1 條）。
⚠ **本機接手時的兩個提醒**：(甲) **《Cruisin'》與《Hat Trick》要用羅馬字查**；(乙) **《Brandenburg Concerto》要辨認命中的是 6 軌美版還是 4 軌日版**；
(丙) **《Brian Blade Fellowship》要辨認是 1998 原盤還是 2020 Blue Note 80 再發**。

---

## 第 2710 條（**收工檢查**）

| 檢查 | 結果 |
|---|---|
| `node batch-progress/c171/chk-prop.mjs a` | **見本檔末尾的實跑貼字**（標記須為 0） |
| `node batch-progress/dedup-crossbatch.mjs c171` | **見本檔末尾的實跑貼字** |
| 第 315 條結算 | **`prop-a.json` 10 筆 ＋ 本檔退表 3 筆 ＝ 13 ＝ `slice.json` `g:"a"` 的筆數** ✔ |
| 禁碰清單 | `seed_cards.json` **只讀**、`apex_pool.json` 未開、`PROJECT_MEMORY.md` 未動、KV／Firestore 未碰、`enum/blue-note.json` **只讀**、**`prop-b.json` 未動**、其他批次檔案 **只讀**、**無 `git commit`／`git push`／未動索引** |
| 中間檔 | 全在 scratchpad 的 `c171a/` 子目錄（第 533 條） |

---

## 第 2711 條（**⚠ 派工信與原文／既有裁定牴觸之處；依規定回報**）

| # | 派工信原句 | 實查 | 影響 |
|---:|---|---|---|
| 1 | 第一節第 3 點：「**`batch-progress/c170/rulings.md` 整檔**（尤其第 2481–2497 條）」；該檔檔頭又寫「編號區間 **2346–2400**」 | **兩者都對，是檔頭過時**：該檔實際涵蓋 2346–2497，2481–2497 是稽核層後來 append 進去的。**派工信沒寫錯** | 無害，記一筆免得下一棒以為找錯檔 |
| 2 | 第三節表格把第 8 筆寫成「`Dexter Gordon《Tenor Titans》`……**高度懷疑是舊錄音的初次發行或再發**；若是庫存盤，照 c-145 的寫法」 | **懷疑的方向對、結論不對**：它**確實**是舊錄音（1969／1972）的初次發行，**但它根本不是 Blue Note 的盤**（Storyville）。**派工信預設了「它是 Blue Note、只要判是不是庫存盤」，這個前提不成立** | ⚠ **會讓一張非家族碟被當庫存盤收進來**（第 2692 條） |
| 3 | 第三節表格把第 13 筆寫成「`Elvin Jones《At This Point in Time》`……**高度懷疑是 1970 年代錄音的後發**，與 Dexter Gordon 同一種風險」 | **錄音年對（1973），但「與 Dexter Gordon 同一種風險」不對**：Dexter 那張是**全碟未發行**的庫存盤（可走 c-145 寫法），**本張 7 軌裡有 4 軌 1976 年已發行過、且與池中卡重疊**——**是合輯，不是庫存盤，c-145 寫法不適用** | ⚠ 若照派工信的歸類處理，**會用 c-145 的庫存盤寫法收一張合輯**（第 2696／2697 條） |
| 4 | 第三節警語：「⚠ ⚠ **Ron Carter 本批三張**……**池中已有 `Ron Carter` 11 張**」 | **11 是錯的，實掃是 9 張**（c-150／c-151／c-153／c-154／c-156／c-157／c-158／c-160／c-161 各 1 張），**而且 9 張全在未上架批次、`seed_cards.json` 裡 0 張** | 只影響 `why` 的數字寫法（第 409b／439 條要求註明有沒有算進未上傳批次）；**掛名裁定不受影響**（第 2698 條） |
| 5 | 第一節第 2 點：「`enum/blue-note-artist-axis-audit.md` 裡本組 13 張各自的小節——**每一張的佐證網址都在那裡**」 | **佐證網址確實都在，但第 8 筆的佐證指向的是另一張碟**（第 2692 條）——**「有佐證」不等於「佐證對」** | ⚠ 已在第 2692／2693 條處理 |
| 6 | 第四節第 1 點：「稽核層實測**盤名單獨命中的假陽性 7 次**」 | **在本組 13 張的範圍內是 20 次命中／19 次假陽性**（第 2707 條）。派工信引的 7 次是 c-170 第 2489 條在**全部 25 筆**上的數字，**不是本組的數字** | 無害，但**假陽性率比派工信轉述的更高**，第 1819-B 條的規則更該照做 |

**另外更正的是既有裁定、不是派工信**：**c-170 第 2492 條的「兩關」不足以擋掉第 2692 條那一筆，本層加第三關（盤名）與一條合輯否決**（第 2693 條）；
**稽核層的正規化沒有沿用 `chk-prop.mjs` 的 `&`→`and`，因此漏掉一筆撞批次**（第 2695 條）。

---

## 附：收工實跑

**`node batch-progress/c171/chk-prop.mjs a`**（2026-09-19 收工實跑，逐字）：

```
prop-a.json：10 張、8 位
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）
（已知，本機已擋：c49b 沈文程《心事誰人知》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：c49b 羅文《小李飛刀》 ←→ c106；待本機標記後從 dedup-known.json 移除）
（已知，本機已擋：cseab Sơn Ca《Băng nhạc Sơn Ca 8 (Tiếng hát Sơn Ca)》 ←→ c64；待本機標記後從 dedup-known.json 移除）

134 批（其中 1 批讀 prop）｜卡數 5332｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）

合計 10 張、8 位｜標記 0
```

**`標記 0`、`exit 0`** ✔。**第五道（盤名逐字撞 apex 王牌、掛名不同，report-only）本批 0 處**——
⚠ 這與第 2707 條的盤名假陽性表不衝突：那 19 筆假陽性撞的是**未上架批次的卡**，**不是線上池的 apex 王牌**。
**10 張、8 位相異掛名**（`Tommy Smith` 2 張、`Ron Carter` 2 張，其餘 6 個各 1 張）。

**`node batch-progress/dedup-crossbatch.mjs c171`**（單獨再跑一次，逐字）：

```
（c50、c51 的 prop 已被同名子批的卡單取代，不重複計入）

1 批（其中 1 批讀 prop）｜卡數 20｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）
```

⚠ **`卡數 20` ＝ a 組 10 ＋ b 組 10**，兩組被當成同一批讀，**批內 a／b 交集不在這支腳本的守備範圍**。
**本層另外手動核過一次 a／b 交集：`set()`（空）** ✔。
⚠ **b 組已把《Stardust》(2001) 掛成 `Ron Carter`，與第 2698 條一致** ✔——**三張的掛名字串統一，不需要再協調。**

---

## 第 2712 條（**交件版本認定**）

**以工作區當下的 `batch-progress/c171/prop-a.json` 與 `batch-progress/c171/rulings.md` 為交件版**（第 1803-B 條）。
本層在跑的過程中把 `prop-a.json` 寫回磁碟 **2 次**（第 5 筆、第 10 筆）；
**「筆數對了」不等於「定稿了」**——定稿的時點是 `chk-prop` 標記 0、`dedup-crossbatch` 跨批撞卡 0、第 315 條結算 10＋3＝13 三者同時成立之後。
**未碰 `prop-b.json`、未碰任何禁區、未動 git。**
