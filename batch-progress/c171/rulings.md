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

---
---

# c-171 b 組裁定（2026-09-19，12 張、1998–2019；編號 2751–2810）

**a 組已於本檔寫入 2691–2750 區間的 2691–2712 條，本節用 append 接在其後、未覆寫任何一行。**
判準沿用 `CURATION-BRIEF-bluenote-post1985.md` → `CURATION-BRIEF-bluenote.md` 第〇節 → `c131` → `c127` → `c126` → `c103plus` → `c93plus`，
外加 a 組本批新立的 **第 2693 條（Discogs 覆核三關）** 與 **第 2698 條（`Ron Carter` 掛名）**。

---

## 第 2751 條（**總表**）：**12 張＝收 10 ／ 退 2；兩筆退件都是「稽核層的判定在這一筆上不成立」，與 a 組第 2692 條同族**

| | 張 |
|---|---:|
| `slice.json` `g: "b"` | **12** |
| **`prop-b.json` 收件** | **10** |
| **b 組退件** | **2** |
| **合計** | **10 收 ＋ 2 退 ＝ 12** ✔（第 315 條結算通過，見第 2770 條） |

**收件 10 張**（依 `prop-b.json` 順序＝slice 順序）：
`Gonzalo Rubalcaba《The Trio》`**1997**（年份改判）／`Prysm《Time》`1999／`Ron Carter《Stardust》`2001／
`Stefano Di Battista《Round About Roma》`2002／`Jason Moran《The Bandwagon》`2003／
`Bill Charlap & Sandy Stewart《Love Is Here to Stay》`2005／`Ruben Hein《Live》`2011／
`James Francies《Flight》`2018／`Joel Ross《KingMaker》`2019／`Kendrick Scott Oracle《A Wall Becomes a Bridge》`2019。

**10 張、10 個相異掛名字串**（無一重複）。**年份改判 1 筆、覆核成立 9 筆。**

**退件 2 張**：

| # | 卡 | 理由分類 |
|---:|---|---|
| 1 | `Michel Petrucciani《Trio in Tokyo》`(1999) | **不是 Blue Note 家族**——`The Blue Note Tokyo` 是**演出場地**不是廠牌（第 2490 條），真廠牌是 Dreyfus Jazz。第 2752 條 |
| 2 | `Van Morrison《Born to Sing: No Plan B》`(2012) | **曲風閘：非爵士**——MB／Discogs 10 筆／Apple 四邊**零 jazz 訊號**。第 2753 條 |

⚠ **合起來看：稽核層 25 筆 `gap` 裡，a 組撤回 1 筆（Tenor Titans）、b 組撤回 1 筆（Trio in Tokyo），另各有 1 筆因撞批次／合輯、1 筆因曲風退件。**
**「`gap` 判定成立」與「這一批該收」是兩件事，不要混為一談。**

---

## 第 2752 條（b 組，**退件一；本組最重要的一條**）：**`Michel Petrucciani《Trio in Tokyo》`(1999) 退——`The Blue Note Tokyo` 是演出場地，不是廠牌；稽核層的 `gap` 判定在這一筆上是錯的**

稽核層（`blue-note-artist-axis-audit.md` §三.15）把它判成 `gap`，**佐證舉了三筆 Discogs，三筆的 `label` 陣列裡都有 `The Blue Note Tokyo`**：
> Discogs 776573／8390770／5811384 的 `label` 逐字 `['Dreyfus Jazz', 'Disques Dreyfus', 'Disques Dreyfus', **'The Blue Note Tokyo'**, 'Studios Ferber', …]`

**那一格不是廠牌，是演出場地。本層逐筆重查：**

| 層 | 逐字 |
|---|---|
| MB RG `8b89c2f8-8d7a-3147-af17-1fd33f7d5d2d` | title「Trio in Tokyo」、artist-credit 三位 `Michel Petrucciani • Steve Gadd • Anthony Jackson`、frd 1999-10-15、primary-type Album、**secondary-types 逐字 `["Live"]`** |
| MB 轄下 5 筆 release | `b4109b5f`（1999 FR，**Dreyfus Jazz／FDM 36605-2**）、`ed7b1841`（1999-10-15 JP，**Disques Dreyfus／VACR-2039**）、`3b2a0d4f`（2009 FR，**Dreyfus Jazz**）、`4752d0fc`（2009-01-19 DE，**Dreyfus Jazz**）、`51e5f847`（1999-11-16 US，`label-info` 逐字 `[]`）。**五筆沒有一筆掛 Blue Note 家族實體。** |
| Discogs `artist=Michel Petrucciani&release_title=Trio in Tokyo&per_page=50` | **回 12 筆**（France／US／Japan／Russia，1999–2025，含 2025 年 Diggers Factory 黑膠再發）。**12 筆的廠牌一律是 `Dreyfus Jazz`／`Disques Dreyfus`／`Francis Dreyfus Music`／`BMG`／`Diggers Factory`；沒有任何一筆掛 Blue Note。** |
| **Discogs 776573 的 `companies` 欄逐字展開（決定性的一句）** | **`Recorded At: The Blue Note Tokyo`**；`labels` 欄逐字**只有一格** `Dreyfus Jazz / FDM 36605-2`；notes 逐字 `Live recorded at Blue Note, Tokyo in November 1997.` |

**→ 這張碟與 Blue Note 唯一的關係，是 1997 年 11 月在東京 Blue Note 俱樂部錄的音。廠牌自始至終是法國獨立廠 Dreyfus Jazz。**
**判定：`not-blue-note`，退件。** 判準依簡報 §一（Blue Note 家族閘）、**第 2490 條**（白名單並明列排除 `club`／`cafe`／`jazz club` 字樣）與判準第 3 條（卡住整條線，必須當場定）。

⚠ **第 2490 條預言過這件事，逐字**：「**盤名裡帶 `Live At The Blue Note` 的碟，在這一線會反覆出現這個假陽性**」。
**本筆是它的變形——盤名裡沒有 `Blue Note`，是 `label` 陣列裡的場地格把它帶進來的**；稽核層自己在第 2490 條寫了白名單，**但那 3 次 `The Blue Note Jazz Club` 的命中與本筆的 `The Blue Note Tokyo` 是同族不同字串，白名單沒有涵蓋到東京那家。**
**→ 給主線：白名單要改成「含 `club`／`cafe`／`jazz club`／`<城市名> Blue Note` 的一律先當場地」，或更直接——只採 Discogs `release` 端點 `labels` 欄（entity_type `Label`）那一格，不要採 search API 混合過的 `label` 陣列。**

⚠ **順帶釘死三件事，避免下游重查**：
1. **錄音是 1997 年 11 月，發行是 1999-10-15**（Petrucciani 1999-01-06 辭世，**這是身後發行的現場盤**）——派工信第三節要求分清錄音年與發行年，答案在這裡。
2. **稽核層 25 筆 `gap` 裡這一筆要撤回**；a 組與主線都不要再把它列進缺口。
3. **這張碟仍然是一張值得收的 Petrucciani 現場盤，只是不屬於 Blue Note 線**——`rgMbid 8b89c2f8`、Dreyfus Jazz `FDM 36605-2`、8 軌 62 分 03 秒，**主線若要另開法國廠牌線可直接用**。

---

## 第 2753 條（b 組，**退件二；派工信第三節指名要跑的那一道閘**）：**`Van Morrison《Born to Sing: No Plan B》`(2012) 退——曲風閘，四邊零 jazz 訊號**

派工信逐字要求：「⚠ ⚠ **曲風閘**：Van Morrison 不是爵士線的常客，**這張要逐筆查 RG 端與 Discogs 的 genre／style**；**判不是爵士就退並寫進 rulings**。」**逐筆查完如下：**

| 來源 | genre／style 逐字 | 有 jazz？ |
|---|---|:--:|
| **MB RG `de243950` 的 `genres`／`tags`** | **`blues:1`／`folk rock:1`／`rock:1`** | **✘** |
| Discogs 4230148（US 零售） | genre `['Rock','Blues','Pop']`、style `['Soul']` | ✘ |
| Discogs 3917807（Europe 零售） | genre `['Rock','Blues','Pop']`、style `[]` | ✘ |
| Discogs 6663848（Canada）／13715157（Argentina）／12319738・27504015（Russia） | genre 逐字全 `['Rock','Blues','Pop']` | ✘ |
| Discogs 8960423（Australia） | genre `['Rock','Blues','Pop','Folk, World, & Country']`、style `['Celtic','Blues Rock']` | ✘ |
| Discogs 10435447・3868014（宣傳）／14918715（2020 數位再發） | `['Rock','Blues']`／`['Blues']`／`['Rock','Blues','Pop']`＋style `['Soul']` | ✘ |
| **Apple gb `collectionId` 1828525834** | **`primaryGenreName` 逐字 `Rock`** | **✘** |

**→ 十筆 Discogs 條目、MB RG 兩欄、Apple 一欄，合計十三處，`jazz` 出現 0 次。**

**與既有先例的分界（判準第 1 條，這是本條最關鍵的一段）**：
**c-158 收了 `Van Morrison《What's Wrong With This Picture?》(2003)`**（`genres` 逐字 `["jazz","blues"]`），
理由照 c-157 b 第 1480 條 `Dr. John《Creole Moon》` 的先例。**但那張的 jazz 訊號是實際存在的**：

| | 《What's Wrong…》(2003，c-158 收) | 《Born to Sing》(2012，本層退) |
|---|---|---|
| MB RG genres | 九個裡有 **`jazz`** 與 **`jazz blues`** | **blues／folk rock／rock，無 jazz** |
| Discogs genre | **`Jazz, Rock`** | **`Rock, Blues, Pop`（10 筆一致）** |
| 同期紙本 | **Billboard 2003-09-20 p96 爵士專欄逐字 `the blues- and jazz-infused "What's Wrong With This Picture?"`** | 本層未查到任何把它歸爵士的同期來源 |
| 零售廠牌欄第一格 | **`Blue Note`**（美版） | **`Exile`**（美／歐版，`labels` 欄逐字只有一格） |

**→ 先例的三個支撐（slice 標 jazz／池中既有藝人／(戊) 閘乾淨）在本張只剩兩個，而「疑似非爵士」的那一項從「訊號不乾淨」變成「四邊零訊號」。先例的前提不成立。**
**判定：曲風閘不過，退件。** 判準依簡報第一節第 4 點（「撞到疑似非爵士的，退並寫進 rulings」）與判準第 3 條。

⚠ ⚠ **但要把兩件事寫清楚，因為這一筆完全可逆（判準第 2 條）**：
1. **它確實是 Blue Note 授權發行的碟，家族閘本身過得了**：Discogs 4230148／3917807 的 `companies` 欄逐字 `Licensed To: Blue Note Records`、`Manufactured By: Blue Note Records`，歐版 notes 逐字 `℗ 2012 The copyright in this sound recording is owned by Exile Records Ltd. **under exclusive license to Blue Note Records**.`——**與 c-158《What's Wrong…》靠 `Manufactured by Blue Note Records` 過第 1445 條那一層是同一種證據**。
2. ⚠ ⚠ **稽核層的 `label` 陣列在這一筆上又一次誤導**：它舉的 `['Exile', 'Blue Note Records', …]` 是 search API 混過 company 的陣列；**`release` 端點的 `labels` 欄（entity_type `Label`）逐字只有一格 `Exile`**。**這是第 2752 條同一個成因的第二次命中，本組 12 張裡就中了兩次。**
3. **主線若要收**：`rgMbid de243950-fafd-420f-bcf9-668241d61b45`、Blue Note 授權／Exile `509996 23491 2 3`、US 2012-10-02 CD 10 軌 59 分 54 秒（MB frd 逐字 `2012-09-29`、Apple `releaseDate` 逐字 `2012-09-29T07:00:00Z`）、`genres` 建議 `['rock','blues']`——**證據已備齊，改判只要新增一列，不必重查。**

---

## 第 2754 條（**覆核稽核層的「這張是 Blue Note 家族」判定，b 組 12 張逐筆**）：**10 成立、2 不成立**

派工信逐字要求「**你要逐張覆核稽核層的判定**」。方法照 a 組第 2705 條，**再加一道本層新增的**：
**凡 search API 的 `label` 陣列出現 Blue Note，一律再打 `api.discogs.com/releases/<id>` 把 `labels`（entity_type `Label`）與 `companies`（帶 role）分開看**——
**search API 的 `label` 陣列把 label／company／studio／演出場地混在一起（第 2490 條），分不開就會判錯。**

| # | 卡 | `releases/<id>` 的 `labels` 欄逐字 ＋ 目錄號 | 覆核 |
|---:|---|---|:--:|
| 1 | Gonzalo Rubalcaba《The Trio》 | 歐版 8259286 逐字 `Blue Note / 4944422`＋`Somethin' Else / 5591`；notes 兩次逐字 `Blue Note catalog no.` | ✔ |
| **2** | **Michel Petrucciani《Trio in Tokyo》** | **776573 逐字只有 `Dreyfus Jazz / FDM 36605-2`；`The Blue Note Tokyo` 在 `companies` 欄、role 逐字 `Recorded At`** | **✘ 退（第 2752 條）** |
| 3 | Prysm《Time》 | 930303 逐字**只有一格** `Blue Note / 7243 5 21886 2 8` | ✔ |
| 4 | Ron Carter《Stardust》 | 9780419 逐字 `Blue Note / 7243 5 37813 2 3`（日版 11783920 是 `Somethin' Else / TOCJ-68053`＝家族內日本線，第 2705 條末句） | ✔ |
| 5 | Stefano Di Battista《Round About Roma》 | 5074194 逐字**只有一格** `Blue Note / 7243 542406 2 1`；宣傳 CDr 7439042 亦 `Blue Note` | ✔（⚠ **MB 那端掛的是母公司 `EMI`**，第 2487 條型） |
| 6 | Jason Moran《The Bandwagon》 | 1872228 逐字 `Blue Note / 7243 5 80917 2 4`；歐版 442265 的 `companies` ℗© 逐字 `Blue Note Records` | ✔（⚠ `Village Vanguard` 在 `companies`、role `Recorded At`，**是場地不是廠牌**） |
| 7 | Bill Charlap & Sandy Stewart《Love Is Here to Stay》 | 8390356／13840437／5992975 逐字皆 `Blue Note`／`7243 5 60340 2 0`・`…60341 2 9`；Apple copyright 逐字 `℗ 2005 Blue Note Records` | ✔ |
| 8 | Ruben Hein《Live》 | 4604332 的 search `label` 陣列第一格 `EMI`、**第二格 `Blue Note`**；依第 1794／1919 條掃整條鏈過閘，且與同藝人 c-169 b 已收的《Loose Fit》（2983088 第一格逐字 `Blue Note`）是同一家荷蘭分支 | ✔（⚠ 鏈上另有 `Theater Carré`＝場地、`Optimal Media GmbH`＝壓片廠，**已排掉**） |
| **9** | **Van Morrison《Born to Sing: No Plan B》** | **4230148／3917807 的 `labels` 欄逐字只有一格 `Exile`；`Blue Note Records` 在 `companies` 欄、role 逐字 `Licensed To`／`Manufactured By`** | **✔（家族成立）但因曲風另案退**（第 2753 條） |
| 10 | James Francies《Flight》 | 34231921／13995462／14779127／12773093 四筆的 `label` 逐字**全部只有** `Blue Note`；`B002868602`／`00602567741343` | ✔（**本組最乾淨**） |
| 11 | Joel Ross《KingMaker》 | 13619280 逐字 `Blue Note / B003003802`（UMe 正規美版形制，非 `BNS-`）；日版 15183099 逐字 `Blue Note / UCCQ-1108`；Apple copyright 逐字 `Blue Note Records` | ✔ |
| 12 | Kendrick Scott Oracle《A Wall Becomes a Bridge》 | 14078627 逐字**只有一格** `Blue Note / 774920 6`；Apple copyright 逐字 `Blue Note Records` | ✔（⚠ **MB 那端掛成母公司 `Capitol Records`**，第 2487 條的原始樣本） |

⚠ **`Blue Note Compagnie`（`BNS-`）與 `Blue Note Digital`（MB label `0293ae5c`、barcode 810211 段）本組 12 張各 0 次命中**（與 a 組同）。
⚠ **`Somethin' Else` 照第 2705 條末句當家族內日本線**（本組第 1、4 兩張命中，同一位監製 Hitoshi Namekata）。
⚠ ⚠ **本組的新發現：12 張裡有 3 張的 search API `label` 陣列含 Blue Note、但 `releases/<id>` 的 `labels` 欄不含**（第 2、9 兩張是場地／授權方，第 8 張是第二格而非第一格）。**命中率 3／12 ＝ 25%——這個比例高到不能再用 search API 的 `label` 陣列直接判廠牌。**

---

## 第 2755 條（**掛名總表**）：**10 個字串；照 MB RG artist-credit 原樣 10、沿用池中既有字串 8、新立 2、收攏 0、新造分裂 0**

| 掛名 | 來源 | 池中既有 |
|---|---|---|
| `Gonzalo Rubalcaba` | MB RG credit 單一實體 70053535 | **13 張**（c-150～c-161 卡單），沿用 |
| `Prysm` | MB RG credit 單一實體 94afe824（Group） | **3 張**（c-152／c-154／c-157），沿用 |
| `Ron Carter` | MB RG credit 單一實體 57db3f59 | **9 張**（c-150～c-161 卡單），沿用；**與 a 組第 2698 條一致** |
| `Stefano Di Battista` | MB RG credit 單一實體 f6c8ec20 | **2 張**（c-157／c-160），沿用 |
| `Jason Moran` | MB RG credit 單一實體 2f97f8ef | **8 張**（c-155～c-163），沿用 |
| **`Bill Charlap & Sandy Stewart`** | **MB RG credit 兩位串接**（第 2756 條） | **0 張——本批新立**；與 `Bill Charlap Trio`（6）／`Bill Charlap`（1）／`Bill Charlap & Renee Rosnes`（1）**並存不收攏** |
| `Ruben Hein` | MB RG credit 單一實體 347bd1f6 | **1 張**（c-169 b《Loose Fit》），沿用 |
| `James Francies` | MB RG credit 單一實體 604f0692 | **1 張**（c-165《Purest Form》），沿用 |
| `Joel Ross` | MB RG credit 單一實體 **6d09039b** | **4 張**（c-170 卡單），沿用；**MB 同名 `02f84b16` 不是本人** |
| `Kendrick Scott Oracle` | MB RG credit 單一實體 71d3da26（Group） | **1 張**（c-169 b《We Are the Drum》），沿用 |

⚠ **非 ASCII 連字號正規化**：10 個掛名與 10 個盤名逐字掃過，**`‐ ‑ ‒ – — ― －` 與 U+30FC 各 0 命中**，不需要正規化。
⚠ **Discogs 的同名消歧編號 `(2)`／`(3)` 一律不是名字的一部分**（本組命中 3 次：`Prysm (2)`、`Sandy Stewart (2)`、`Joel Ross (3)`），全部進 `queryAlias`。

---

## 第 2756 條（**掛名裁定；派工信第三節指名的那一筆**）：**`Bill Charlap & Sandy Stewart` 取 MB 串接形——「並列聯名」的前提成立**

派工信逐字：「⚠ ⚠ **Discogs 條目逐字是 `Sandy Stewart (2) & Bill Charlap`——這是不是聯名盤？掛名要照 MB RG credit 判**（第 1539／1745-B 條：**「並列聯名」是前提**，前提成立才取串接形）。」

**前提查驗：成立。**

| 來源 | 逐字 |
|---|---|
| **MB RG `6820c0ec` 的 `artist-credit`** | **兩位**：`Bill Charlap`（85cc88c3，Person，**joinphrase 逐字 ` & `**）＋`Sandy Stewart`（55ab06a1，Person，disambiguation 逐字 `1950s singer`，joinphrase 空） |
| **MB release `6b65b194` 的 `artist-credit`** | **逐字 `Bill Charlap & Sandy Stewart`** |
| **Apple us `collectionId` 715815913 的 `artistName`** | **逐字 `Bill Charlap & Sandy Stewart`** |
| Discogs 美版宣傳 10351326 標題 | 逐字 `Bill Charlap & Sandy Stewart (2)` |
| Discogs 美版零售 8390356／歐版 13840437／泰版 5992975 標題 | **逐字 `Sandy Stewart (2), Bill Charlap`（順序相反、逗號）** |

**裁定：`Bill Charlap & Sandy Stewart`。**
理由：**第 1539 條原文的判準是「取 MB `credited-name` 與 joinphrase 串接出來的那一種」**（第 1745-B 條已更正過「取 `&`」那句誤述）——
**本張串接出來的結果剛好帶 `&`，那是這一例的結果不是規則**；MB 與 Apple 兩邊一致、**且沒有新造任何一邊都沒有的連接符**。
**逆序逗號形三筆同源（同一次發行的三個地區版），已整組進 `queryAlias`。**

⚠ **派工信那一句「Discogs 條目逐字是 `Sandy Stewart (2) & Bill Charlap`」與實況不符**：**Discogs 逐字是 `Sandy Stewart (2), Bill Charlap`（逗號，不是 `&`）**，見第 2771 條。
⚠ **先例**：**`Bill Charlap & Renee Rosnes《Double Portrait》(2010)`（c-162）是同一形狀**——同一位鋼琴家的二重奏盤、同樣用 `&` 串接、同樣與 `Bill Charlap Trio` 並存。**本張照它走，池中因此有四個 Charlap 字串、四種編制**（第 964／1131／1801-B 條：不同 credit 並存不是第 1418 條的分裂）。

---

## 第 2757 條（**掛名，跨組協調；呼應 a 組第 2698 條**）：**`Ron Carter《Stardust》`(2001) 掛 `Ron Carter`，與 a 組兩張一致**

**開工時 `batch-progress/c171/rulings.md` 尚未建立（a 組還沒交件），本層依 MB RG credit 與池中先例先判 `Ron Carter`；收工前重讀本檔，a 組第 2698 條逐字裁定「`Ron Carter` 三張一律掛 `Ron Carter`」，兩組結論相同，不需要改。**
a 組第 2698 條末段亦逐字記「b 組已把《Stardust》(2001) 掛成 `Ron Carter`，與第 2698 條一致 ✔」。

**本層自己查到的三層證據**（與 a 組獨立取得，可互為覆核）：
1. MB RG `bfb6c1ec` 的 artist-credit 逐字**單一實體** `Ron Carter`（57db3f59，Person／`US jazz double-bassist`），joinphrase 空——**不是並列聯名，第 1539／1745-B 條的前提不成立**。
2. Discogs 六筆條目的 `artists` 欄逐字**都只有** `Ron Carter`。
3. 池中九張裸名卡（c-150／c-151／c-153／c-154／c-156／c-157／c-158／c-160／c-161），**`seed_cards.json` 裡 `Ron Carter` 掛頭 0 張**——**與 a 組第 2698 條的實掃數字一致（9，不是派工信寫的 11）。**

⚠ **`Ron Carter Trio`（c-168《So What》1998）／`Ron Carter & Danny Simmons`（c-164）／`Ron Carter, Ricky Dillard`（c-167）／seed 兩張斜線與 `&` 聯名，全部並存、不收攏。**

---

## 第 2758 條（**掛名，其餘八筆的沿用依據**）：**每一筆都實掃過池中字串，沒有一筆是憑印象沿用**

- **`Joel Ross`**：MB RG credit 逐字 `Joel Ross`／**`6d09039b`（Person／`US vibraphonist`）**；c-170 第 2350 條已判、卡單四張在案。**MB 同名 `02f84b16`（`American pianist, conductor, choral arranger`）名下無本碟**（第 179／250／324 條：只看 `type`／`disambiguation`，不看 score）。
  ⚠ **本層實測複驗第 1819-B／2484 條的更正成立**：`release-group?artist=6d09039b-…&type=album&fmt=json&limit=100` **回得到 `KingMaker`**；c-170 第 2356(二) 條寫的「回 `count: 0`」確實是錯的。
- **`Kendrick Scott Oracle`**：MB RG credit 逐字同、**Group `71d3da26`**；c-169 b 第 1804-B 條已判保留、與 c-166《Corridors》的三人並列 credit 是兩個掛名主體。**個人字串 `Kendrick Scott` 在四處逐字命中 0 筆**，不存在收攏問題。
- **`Ruben Hein`**：MB RG credit 逐字同；c-169 b《Loose Fit》在案。**Discogs 標題的 `Ruben Hein With The Metropole Orchestra* Conducted By Jules Buckley` 是盤面演出說明、不是 credit，不新造**（第 1745-B 條：四邊都沒有的字串一律不造）。⚠ **`Metropole Orkest` 在四處只出現在 `Trijntje Oosterhuis, Metropole Orkest`（c-160 slice）與 `Trijntje Oosterhuis & Metropole Orkest`（c-165 slice）兩個聯名字串裡，單獨字串 0 張。**
- **`James Francies`**：四邊（MB／Discogs 四筆／Apple／池中 c-165）逐字一致，**連 Discogs 消歧編號都沒有**。
- **`Gonzalo Rubalcaba`**：MB RG credit 單一實體；**Discogs 六筆標題逐字都是三人並列 `Gonzalo Rubalcaba, Dennis Chambers, Brian Bromberg`，但 MB RG credit 不是並列聯名**，前提不成立、不取串接形。
- **`Stefano Di Battista`**：MB 與池中兩張逐字同；**Discogs 與 Apple 逐字是小寫 `Stefano di Battista`——大小寫差異不新造字串**，小寫形進 `queryAlias`。
- **`Prysm`**：MB Group 實體 94afe824＝池中三張那一個；`Prysm (2)` 是 Discogs 消歧編號。
- **`Jason Moran`**：MB 與池中八張逐字同；**盤名與團名同字（`The Bandwagon`），但四邊沒有一個把 `Jason Moran & The Bandwagon` 當 credit，不造。**

---

## 第 2759 條（**年份**）：**改判 1 筆、覆核成立 9 筆；第 1800-B 條的兩種掃描 10／10 全跑，⚠ 其中 6 張「MB 連 barcode 都沒有，第一種查法根本跑不起來」**

### （一）改判的那一筆

**`Gonzalo Rubalcaba《The Trio》` 1998 → 1997。**

| 層 | 逐字 |
|---|---|
| slice／MB RG `first-release-date` | `1998` |
| MB 轄下唯一有日期的 release `d67f178e` | `1998`、JP、`somethin’else`／`4944422` |
| **Discogs 11564432（第二種掃描撈出，MB 未建）** | **`released` 逐字 `1997-12-22`、country 逐字 `Japan`、`labels` 逐字 `Somethin' Else / TOCJ-5591`、barcode `4988006736207`、`CD, Album`、7 軌 68:56** |
| Discogs 19230724（同號日本宣傳盤） | 1997 |
| Discogs 8259286（歐版 Blue Note 4944422） | `released` 逐字 `1998`（只到年） |

**日版早歐版約兩個月、七軌逐軌相同 → `year` 取 1997。**
⚠ **本張是 `TOCJ-`，不是 `UCCQ-`**——**第 1811-B 條那句「`UCCQ-` 在 2015 年後只當版本補正」不適用於本筆；同條逐字也寫著「`TOCJ-` 要查」。**
⚠ **MB 的 `first-release-date` 之所以是 1998，正是因為 MB 沒建日版**（與第 1800-B 條 `Scolohofo《Oh!》` 同一個成因）。

### （二）兩種掃描的實跑結果

| 卡 | 第一種（MB barcode 反查） | 第二種（`artist`＋`release_title` 全掃） | 補出的版本 | 改年份 |
|---|---|---|---|:--:|
| The Trio | **可跑**（724349444225） | 6 筆 | **日版 TOCJ-5591、歐版 Somethin' Else 5591、兩款俄版** | **✔ 1998→1997** |
| Time | 可跑（724352188628） | 1 筆＋`artist=` 單欄 22 筆 | 無（本碟只有一個版本） | ✘ |
| Stardust | **跑不起來（barcode 欄 null）** | 6 筆 | **美版原壓、BMG 俱樂部版、美版宣傳、日版 TOCJ-68053、歐版** | ✘ |
| Round About Roma | 可跑（724354240621） | 2 筆＋`artist=` 單欄 30 筆 | 英歐宣傳 CDr | ✘ |
| The Bandwagon | **跑不起來** | 4 筆 | **美版原壓、俱樂部版、Advance 宣傳、歐版** | ✘ |
| Love Is Here to Stay | **跑不起來** | **23 筆**（19 筆是別碟，見下） | **美版原壓、美版宣傳、歐版、泰版** | ✘ |
| Live | **跑不起來** | `artist`＋`title` 只回 2 筆（1 筆是別碟）→ **改 `artist=` 單欄才回 23 筆** | 荷蘭版 `50999 9410122 5` | ✘ |
| Flight | **跑不起來** | 4 筆 | 美版、歐版、英美版、宣傳 CDr | ✘ |
| KingMaker | **跑不起來** | 3 筆 | **日版 SHM-CD UCCQ-1108（2019-11-06，13 軌）**、數位 FLAC | ✘ |
| A Wall Becomes a Bridge | 可跑（602577492068） | 1 筆＋`artist=` 單欄 12 筆 | 無（本碟只有一個實體版本） | ✘ |

**→ 10 張裡 6 張的 MB release 完全沒有 barcode，第一種查法跑不起來**（c-170 第 2362 條記的是 3／15，**本組是 6／10，比例高得多**）——
**根因與本批 slice 的成因同源：MB 對這 25 張的建檔本來就殘缺，`label-info` 空與 barcode 空常常同時發生。**
**⚠ 第 1800-B 條的第二種掃描在本組是唯一可用的年份查法，不是補充。**

⚠ **`artist`＋`release_title` 兩欄查回 0／過少、要改單欄查的，本組命中 1 次**（`Ruben Hein《Live》`：Discogs 的標題逐字是 `Live (At The Royal Theatre Carré)`，兩欄查只回 2 筆且其中 1 筆是別碟）——**第 1811-B 條那句「有時要單欄查」再應驗一次。**
⚠ **俄版 `Unofficial Release` 本組出現 4 次**（The Trio 兩筆、Trio in Tokyo 一筆〔已退〕、Born to Sing 兩筆〔已退〕），**一律不當年份依據。**
⚠ **`UCCQ-` 在本組命中 1 次**（`KingMaker` 日版 UCCQ-1108，`released` 逐字 `2019-11-06`，**晚美版半年**）——**第 1811-B 條「2015 年後只當版本補正」再應驗一次，不改年份。**
⚠ **Apple 的 `releaseDate` 在本組有 2 筆不可當首發日**：`Round About Roma` 逐字 `2003-05-30`（**晚實體半年，是數位上架日**）、`Love Is Here to Stay` 逐字 `2005-01-01T08:00:00Z`（**只到年的占位值**）。

---

## 第 2760 條（**形態閘，判準順序照第 1811-B 條：零售條目的 `format` 欄 ＞ 總長**）：**10 張全過，0 退**

| 卡 | 零售 `format` 逐字 | 軌數 | 實算總長 | 判 |
|---|---|---:|---:|---|
| The Trio | `CD, Album` | 7 | **68:56** | Album |
| Time | `CD, Album`（`text: Copy Protected`） | 10 | 49:56 | Album |
| Stardust | `CD, Album` | 8 | 52:03 | Album |
| Round About Roma | `CD, Album`（`text: Copy Protected`） | 8 | 55:15 | Album |
| The Bandwagon | `CD, Album` | 10 | 58:32 | Album |
| Love Is Here to Stay | `CD, Album` | 11 | 56:51 | Album |
| **Live** | `CD, Album` | 10 | **40:54** | **Album（見下）** |
| Flight | `CD, Album, Stereo` | 11 | （Discogs 未逐軌標時長，**待本機補**） | Album |
| KingMaker | `CD, Album` | 12（日版 13） | 約 67 分 | Album |
| A Wall Becomes a Bridge | `CD, Album` | 12 | 約 52 分 | Album |

**十張的 `format` 欄都不含 `EP`／`Single`。**
⚠ **需要動用判準順序的是兩張**：
1. **`Ruben Hein《Live》` 10 軌 40 分 54 秒**是本組最短的——**但零售條目 `format` 欄逐字 `CD, Album`，依第 1811-B 條的順序判 Album**（與 c-170 第 2348 條 `FATHERS` 8 軌 27 分 17 秒判收同向，本張比它長 13 分鐘）。
2. **`James Francies《Flight》` Discogs 四筆都沒有逐軌時長**，**只剩 `format` 欄可判**——四筆的 `format` 欄逐字都是 `Album`，判 Album。**這是「零售 `format` 欄 ＞ 總長」這個順序真正起作用的一次**（與 c-169 a 第 2133 條 `lophiile` 那種「Discogs 零命中、只剩時長」正好相反）。
⚠ **`A Wall Becomes a Bridge` 有四軌是 1 分鐘上下的短接口**（〈BeLoved〉0:58／〈Horizons〉1:17／〈Plēh〉2:12／〈Windows〉2:55）——**不得被下游誤讀成 EP 形態或未完成片段**。

---

## 第 2761 條（**合輯風險逐張核；判為合輯 0**）：**兩張「全翻唱／全標準曲」與一張「舊曲目現場重演」細判過**

**10 張的 MB `secondary-types` 逐字都不含 `Compilation`；全部 Discogs 條目的 `format` 欄也沒有一筆帶 `Compilation`／`Sampler`。**
**盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的：0 張。** 三張形狀可疑的細判過：

| 卡 | 可疑處 | 判定 |
|---|---|---|
| **Gonzalo Rubalcaba《The Trio》** | **七軌全是標準曲庫**（〈Maiden Voyage〉〈Caravan〉〈On Green Dolphin Street〉〈Hot House〉〈Yesterdays〉〈Woodyn' You〉〈Manha De Carnaval〉） | **Album。** Discogs 8259286 的 credits 欄逐字是同一組三人（Rubalcaba 鋼琴兼製作、Bromberg 貝斯、Chambers 鼓）、同一次錄音；**與第 2359 條《The Women Who Raised Me》同族——重訪曲庫是企劃方向，不是把舊錄音集合起來**。⚠ **正文不得寫成「收錄經典錄音」。** |
| **Bill Charlap & Sandy Stewart《Love Is Here to Stay》** | **十一軌全是美國歌本老歌**，且有兩組併軌（〈Happiness Is Just a Thing Called Joe / A Sleepin' Bee〉〈I've Got a Crush on You / Do It Again〉） | **Album。** Discogs 13840437 notes 逐字 `Recorded on October 23 & 24, 2004 at Sound on Sound Studio A, New York.`——**十一軌都是那兩天的新錄音**；credits 欄逐字只有鋼琴與人聲兩件。**併軌是演奏上的串接，不是兩張碟的軌拼在一起。** |
| **Ruben Hein《Live》** | **十軌全部是他先前錄音室曲目的管弦樂版**（〈Elephants〉〈That's Not Life〉〈Say Bye〉在 Discogs 上另有 2010 年的單曲條目） | **Album（現場）。** MB `secondary-types` 逐字只有 `Live`；**同一晚的新演出，不是舊母帶集合**。⚠ **正文不得寫成「精選」。** |

---

## 第 2762 條（**現場盤**）：**2 張是現場，MB 兩張都標對了；⚠ 但 `slice.json` 的 `live` 欄兩張都是 `false`**

| 卡 | MB `secondary-types` | slice `live` | 其他層 | 判 |
|---|---|---|---|---|
| **Jason Moran《The Bandwagon》** | **逐字 `["Live"]`** | **逐字 `false`** | Discogs 1872228／442265 notes 逐字 `Recorded November 29-30, 2002 at The Village Vanguard.`；歐版 companies 逐字 `Recorded At: Village Vanguard` | **是現場盤** |
| **Ruben Hein《Live》** | **逐字 `["Live"]`** | **逐字 `false`** | MB release title 逐字 `Live`；Discogs 4604332 標題逐字 `Live (At The Royal Theatre Carré)`、companies 有 `Theater Carré` | **是現場盤** |

**處置**：**`releaseType` 仍照 MB `primary-type` 寫 `Album`**（第 253／1797／2139／2360 條的既有寫法），**現場身分寫進 `risk` 與 `queryAlias`**。
⚠ **正文必須寫成現場盤，且發行年不是錄音年**：Moran 錄音 2002-11-29／30、發行 2003-08-19。
⚠ ⚠ **`slice.json` 的 `live` 欄在本批兩張都與 MB 相反**——**本批的 slice 不是列舉檔產的，`live` 欄是稽核層填的預設值 `false`，不是實查結果**。
**第 1796-B／1805-B／1812-B 條擴大到本批：`c171/slice.json` 的 `live`／`country`／`format`／`catno`／`countries`／`formats`／`nReleases`／`reissueSeries` 八個欄位一律不可信，全部要自己查。**
⚠ **另外 8 張的 `secondary-types` 逐字都是空陣列，四層核完確實都不是現場**（**第 1771 條第 3 點「盤名帶 Live 卻不是現場」本組 0 次**）。

---

## 第 2763 條（**曲風**）：**`['jazz']` 9 張、`['jazz','pop']` 1 張；因曲風退件 1（第 2753 條）；⚠ 一格是本組最弱的證據**

| 組合 | 張 | 名單 |
|---|---:|---|
| `['jazz']` | **9** | The Trio／Time／Stardust／Round About Roma／The Bandwagon／Love Is Here to Stay／Flight／KingMaker／A Wall Becomes a Bridge |
| `['jazz','pop']` | **1** | Ruben Hein《Live》 |

**取捨規則沿用 c-169 b 第 2203 條與 c-170 第 2361 條，一字不改**：
1. **`contemporary jazz`／`post-bop`／`bop`／`bossa nova`／`latin`／`standards` 等子類與周邊詞一律不跟**（第 1572 條，十個合法值裡沒有它們）。**本組這些詞出現 20 次以上，一次都沒跟。**
2. Discogs 條目之間打架時取交集；MB 空欄時只讀 Discogs、再不足才讀 Apple。
3. 非曲風的分類欄不跟。

⚠ **Apple 的 `primaryGenreName` 本組出現一個十類沒有的值**：`Love Is Here to Stay` 逐字 `Standards`——**折進 `jazz`**（Discogs 歐版 genre 逐字 `Jazz`，兩邊不衝突）。
⚠ **`Gonzalo Rubalcaba《The Trio》` 的 Discogs genre 逐字是 `Jazz, Latin`、藝人層 MB genres 逐字含 `afro-cuban jazz`／`latin jazz`**——**`latin` 不在十個合法值裡，且池中 13 張 Rubalcaba 卡逐字全部是 `["jazz"]`**，**判 `['jazz']`，與先例一致、不開第二格。**

### ⚠ 最弱的一格，寫明（可逆）

| 卡 | 判 | 為什麼弱 |
|---|---|---|
| **`Ruben Hein《Live》`** | **`['jazz','pop']`** | **MB RG 的 `genres` 與 `tags` 兩欄逐字皆空陣列；本層在 Discogs 4604332 也沒有取到 genre／style。四邊沒有一邊直接給曲風。** 判的依據只有**同藝人同時期的既有先例**——**c-169 b《Loose Fit》(2010) 的 `genres` 逐字 `["jazz","pop"]`，而本碟十軌就是《Loose Fit》曲目的管弦樂現場版**。**本機審稿可退成 `['jazz']`，可逆。** |

---

## 第 2764 條（**第 611 條五種盲區的人工掃**）：**命中 1 筆（盲區三），其餘四種 0 筆**

**比對面**：`seed_cards.json`（**唯讀**，17,248 列）＋ `desc-tools/batches/cards/*.json`（全部）＋ `batch-progress/c*/prop-*.json`（全部）＋ `batch-progress/c*/slice.json`（全部），**合計 30,184 列**。
**判「已收」一律比對 `album` 欄逐字（正規化後），不用 grep 掃整份 JSON**（第 1819-B 條）。

| 盲區 | 結果 |
|---|---|
| 一、群組掛名 vs 個人掛名 | **掃過，0 筆撞卡。** `Bill Charlap` vs `Bill Charlap Trio` vs `Bill Charlap & Renee Rosnes` vs 本批 `Bill Charlap & Sandy Stewart`／`Kendrick Scott` vs `Kendrick Scott Oracle`／`Ron Carter` vs `Ron Carter Trio`／`Ruben Hein` vs `Ruben Hein & Metropole Orkest`／`Michel Petrucciani` vs `The Michel Petrucciani Trio`（c-153 slice）——**逐筆展開比對**。`Sandy Stewart`、`Kendrick Scott`、`Metropole Orkest` 三個單獨字串在四處各 0 張。 |
| 二、同名不同盤的 Volume 碟 | **本組 0 張帶 Vol./Part 尾綴。** |
| **三、MB 把同一張碟建成兩個 RG** | **⚠ 命中 1 筆：`Ruben Hein《Live》`**（第 2765 條）。其餘 9 張各打一次 `release-group?query=artist:"<掛名>" AND releasegroup:"<盤名>"`，**count 全部是 1**（`Bill Charlap` 回 2，第二筆是 Tony Bennett／Diana Krall 2018 那張同名別碟）。 |
| 四、斜線掛名 | **掃過，0 筆。** seed 的 `Red Garland / Ron Carter / Philly Joe Jones` 與本批 `Ron Carter` 不撞；`Stefon Harris / Jason Moran / Greg Osby / Mark Shim`（c-156）與本批 `Jason Moran` 不撞。 |
| 五、同名但不同盤 | **掃過，命中 26 筆字串、真的同碟 0 筆**（第 2767 條）。 |

---

## 第 2765 條（**盲區三的那一筆；裁定，可逆**）：**`Ruben Hein《Live》` 在 MB 有兩個 release-group，維持 slice 釘的 `d00a707f`，`47b79830` 明寫「刻意不釘」**

| | RG A（**本卡釘的**） | RG B |
|---|---|---|
| MBID | **`d00a707f-f318-434e-890a-dad529f8744b`** | `47b79830-e765-41bc-a98e-18c99e0bce38` |
| title | `Live` | `Live` |
| artist-credit | **`Ruben Hein`**（單一實體 347bd1f6） | **`Ruben Hein & Metropole Orkest`**（347bd1f6 ＋ 9f2ae371，joinphrase ` & `） |
| `secondary-types` | **逐字 `["Live"]`** | **逐字空陣列（漏標）** |
| frd | 2011 | 2011 |
| 轄下 release | `6c05749e`（**無國別、無 barcode、`label-info` 逐字空陣列**、CD 10 軌） | `e164a2da`（**NL、barcode 逐字 `5099994101225`、`label-info` 逐字 `EMI`**、CD 10 軌） |
| 十軌軌名 | — | **逐字 `Fear / Traffic Jam / Stand Up, Speak Out / Rosie / Elephants / Modest man / That's Not Life / Say Bye / No Matter What / Deaf, Dumb, Exposed`** |

**兩個 RG 的十軌軌名逐字相同，RG B 的 barcode `5099994101225` 逐字等於 Discogs 4604332 的目錄號 `50999 9410122 5`——是同一張碟，MB 建了兩次。**

**裁定：維持 `d00a707f`。** 三條判準：
1. **有先例**：簡報 c131 §一.1 逐字「`rgMbid` 用列舉檔的，不要自己另找」；**c-169 b 第 1804-B 條處理 `The Blue Note 7《Mosaic》` 雙 RG 時也是釘形狀對的那一個、另一個明寫「刻意不釘」**。**`d00a707f` 的 `secondary-types` 逐字 `["Live"]` 是對的，`47b79830` 漏標。**
2. **可逆**：改釘只是換 `mbNote` 裡第一個 UUID，成本極低。
3. **掛名後果**：改釘 `47b79830` 就必須把掛名改成 `Ruben Hein & Metropole Orkest`——**那是一個池中零張的新字串，且與派工信指定、c-169 b 已立的 `Ruben Hein` 衝突**（第 307／1418 條）。**收益不抵成本。**

⚠ ⚠ **但要把代價寫給本機**：**`d00a707f` 轄下那筆 release 沒有 barcode、沒有 `label-info`、沒有國別**——
**封面（CAA）與試聽（UPC）兩條探測鏈在這個 RG 上都可能撈不到東西；`47b79830`／`e164a2da` 才是帶 barcode `5099994101225` 與 `label-info` 的那一個。**
**本機若探測落空，先試 `47b79830`；更好的做法是到 MB 端把兩個 RG 合併。**

---

## 第 2766 條（**盤名取法，四筆有歧形**）：**一律取 MB RG 的 `title` 原樣，其他形進 `queryAlias`**（與 a 組第 2708 條同判）

| 卡 | MB RG `title` 逐字 | 其他形逐字 | 取 |
|---|---|---|---|
| Stefano Di Battista | `Round About Roma` | Discogs 零售 5074194 `'Round About Roma`（**前置撇號**）；宣傳 CDr 與 Apple 無撇號 | **`Round About Roma`**（三比一） |
| Ruben Hein | `Live` | Discogs 4604332 `Live (At The Royal Theatre Carré)` | **`Live`** |
| Kendrick Scott Oracle | `A Wall Becomes a Bridge`（**小寫 a**） | Discogs 14078627 `A Wall Becomes A Bridge`（大寫 A）；Apple 小寫 | **`A Wall Becomes a Bridge`**（二比一） |
| Gonzalo Rubalcaba | `The Trio` | Discogs 六筆標題都是 `Gonzalo Rubalcaba, Dennis Chambers, Brian Bromberg - The Trio`（**掛名並列在標題裡，盤名本身相同**） | **`The Trio`** |

⚠ **`Joel Ross《KingMaker》` 的駝峰字形 MB／Discogs／Apple 三邊逐字一致**（`KingMaker`，中間大寫 M），**不是筆誤、不要改成 `Kingmaker`**。
⚠ **非 ASCII 連字號與 U+30FC 全組 0 命中**（`chk-prop` 的四道字形檢查亦 0）。

---

## 第 2767 條（**撞陳列與同名假陽性；第 738／845／859／1819-B 條**）：**盤名字串命中 26 筆，真的同碟 0 筆；撞 apex 王牌 0 處**

**本組四張通名盤名的逐字（正規化）命中明細**：

| 盤名 | 四處命中 | 逐筆核完 |
|---|---:|---|
| **`The Trio`** | 4 | 全是 `本田竹広《The Trio》(1970)`（seed／c132 卡單／c132 prop-b），**同碟 0** |
| **`Time`** | 5 | `Electric Light Orchestra《Time》(1981)`（seed）、`鄭雙雙《Time》(2024)`（seed／c127 卡單／c127 prop-b），**同碟 0** |
| **`Live`** | 13 | Donny Hathaway 1972／日野皓正クインテット《Live!》1973／Fela Ransome-Kuti《Live!》1971／Mike Westbrook 1973／Ewa Demarczyk 1982／Terence Blanchard featuring The E-Collective 2018，**同碟 0** |
| **`Flight`** | 4 | 全是 `Howard Riley《Flight》(1971)`（seed／c71 卡單／c71 prop-b），**同碟 0** |

**另三筆非通名但命中的**：`Stardust` 9 筆（Willie Nelson 1978／The Sea Urchins 1992／山本剛《Star Dust》1977／**`Bill Charlap《Stardust》(2002)`**）、
`Love Is Here to Stay` 4 筆（全是 `八城一夫トリオ《LOVE IS HERE TO STAY》(1968)`）、`Round About Roma`／`The Bandwagon`／`KingMaker`／`A Wall Becomes a Bridge` 各 0 筆。

⚠ ⚠ **`Stardust` 是本組最需要下游注意的一格**：**`Ron Carter《Stardust》(2001)` 與池中 `Bill Charlap《Stardust》(2002)`（c-158 卡單）都是 Blue Note、只差一年、同一個盤名**——**下游引用時一定要帶掛名與年份。**
⚠ **`Love Is Here to Stay` 另有 `Tony Bennett & Diana Krall With The Bill Charlap Trio《Love Is Here to Stay》(2018，Verve／Columbia)`，Discogs 上 19 筆**——**同名、同一位鋼琴家、差 13 年、不同廠牌**。**c-170 第 2492 條就是拿這一組當守門樣本的**；本層兩關（＋a 組第 2693 條的第三關盤名）都套了，19 筆全部濾掉。**它不在池中，不構成撞卡，但下游敘述必須分得開。**
⚠ **`chk-prop` 第五道（盤名撞 apex 王牌、掛名不同）本組 0 處。**

**軌目層的撞陳列（不同次錄音不是撞卡，但正文引用軌名時要寫明版本）**：
〈Maiden Voyage〉〈Caravan〉〈On Green Dolphin Street〉〈Manha de Carnaval〉（The Trio）／〈Bohemia After Dark〉〈Blues in the Closet〉〈The Man I Love〉〈Stardust〉（Stardust）／
**〈Planet Rock〉（Afrika Bambaataa）與〈Out Front〉（Andrew Hill 同名 Blue Note 盤的曲子）**（The Bandwagon）／〈Ain't Nobody〉（Rufus & Chaka Khan）（Flight）／〈Romeo and Juliet〉（Round About Roma）。

**側人重疊（第 845 條：人脈重疊不是同一個企劃）**：
**`James Francies《Flight》(2018)` 的鐵琴手就是 `Joel Ross`、吉他手 Mike Moreno 又出現在 `Kendrick Scott Oracle《A Wall Becomes a Bridge》(2019)`、Derrick Hodge 是《Flight》的製作人又在《A Wall…》客座人聲**——**本組三張碟的人脈連成一圈，正文可互指，但不得寫成同一組人的同一個企劃。**
Immanuel Wilkins（KingMaker）在池中已有 6 張卡（c-165／c-166／c-167），客座身分不影響掛名（第 1131 條）。

---

## 第 2768 條（**第 254 條，三種店面查法的觀察；只寫觀察不下結論**）：**Apple 命中 4／10，全空 5，⚠ 這一段的覆蓋率與 c-170 那種現役目錄不是同一個數量級**

| 卡 | 查法 1（`search?term=掛名+盤名`） | 查法 2（改用當地店面／單欄） | 查法 3（`lookup?upc=`） |
|---|---|---|---|
| The Trio | us 回 2 筆、**都不是本碟** | — | `724349444225` **逐字回空** |
| Time | fr 逐字 **0 筆** | — | `724352188628` 未命中 |
| Stardust | us 回 1 筆、**不是本碟**（The Desmond Legacy 2024 單曲） | — | **MB 無 barcode，跑不起來** |
| Round About Roma | **fr 命中 `695643919`**、`trackCount` 逐字 8 | — | 未跑（Apple 已命中） |
| The Bandwagon | us 逐字 **0 筆** | — | **MB 無 barcode，跑不起來** |
| Love Is Here to Stay | **us 命中 `715815913`**、`trackCount` 逐字 11、copyright 逐字 `℗ 2005 Blue Note Records` | 同一次查詢另回 `Something To Remember`(2012)、**是別碟** | **MB 無 barcode，跑不起來** |
| Live | nl 逐字 **0 筆** | `search?term=Ruben Hein Metropole Orchestra` 亦 **0 筆** | **MB 無 barcode，跑不起來** |
| Flight | **us 命中 `1434109899`**、`trackCount` 逐字 11 | — | **`602567741343` 命中同一筆** |
| KingMaker | **us 命中 `1456437395`**、`trackCount` 逐字 12、copyright 逐字 `Blue Note Records; ℗ 2019 UMG Recordings, Inc.` | — | `602577555282` **逐字回空** |
| A Wall Becomes a Bridge | **us 命中 `1454563813`**、`trackCount` 逐字 12 | — | **`602577492068` 命中同一筆** |

**命中 4（Round About Roma／Love Is Here to Stay／Flight／KingMaker／A Wall…，其中 Flight 與 A Wall 兩種查法都命中）、全空 5、命中到別碟 2。**
⚠ **分界很乾淨：2018 年以後的三張全部命中且軌數與實體相符；2011 年以前的七張只命中兩張。** 與第 1817-B 條同向。
⚠ **`lookup?upc=` 在本組只跑得起來 4 次**（6 張的 MB release 沒有 barcode）。
⚠ **本層只寫觀察、不下結論；封面（CAA）本層未跑**（雲端不逐張 HTTP 驗證，照 `REMOTE_RUNBOOK.md` 分工表歸本機）。

---

## 第 2769 條（**本批 slice 的特殊性；第 1250／1820-B 條**）：**`catno`／`countries`／`formats`／`nReleases`／`reissueSeries`／`country`／`format`／`live` 八欄全部是空或預設值，10 張的目錄號都是本層自己到 Discogs 補的**

第 1820-B 條逐字：「**`catno`／`countries`／`nReleases` 一律留空——這批的 slice 不是列舉檔產的，沒有那些欄位，策展層要自己去 Discogs 補。**」
**本層實查再加三欄**：`country` 與 `format` 逐字都是空字串、**`live` 逐字都是 `false`（兩張是現場盤，見第 2762 條）**。

**→ 本批完全沒有「列舉檔的 `catno` 不能直接反查」那個問題（第 1250 條），因為根本沒有 catno 可抄；
換來的是另一個：10 張的目錄號、國別、載體、軌數、總長，全部是本層第一手從 `api.discogs.com/releases/<id>` 取的，沒有經過任何中間層。**
**判「同一張碟」仍然只有「目錄號＋廠牌」或 MBID 有效**（第 1250／2489 條）——本層的雙 RG 判定（第 2765 條）用的就是 barcode `5099994101225` ↔ catno `50999 9410122 5`。

⚠ **第 1805-B 條記過「列舉檔把 Ruben Hein 的目錄號抄成黑膠號」**——**本批的 `50999 9410122 5` 未經列舉檔轉手，是直接從 Discogs 4604332 取的。**

---

## 第 2770 條（**第 315 條結算**）

| 項 | 數 |
|---|---:|
| `slice.json` `g: "b"` | **12** |
| `prop-b.json` 收件 | **10** |
| 本節退表筆數（第 2752＋2753 條） | **2** |
| **合計** | **12** ✔ |

**`node batch-progress/c171/chk-prop.mjs b`**：逐字「prop-b.json：10 張、10 位」、**「合計 10 張、10 位｜標記 0」**；
**第五道（盤名撞 apex 王牌、掛名不同）0 處**；串跑的 `dedup-crossbatch` 逐字「134 批｜卡數 5332｜**跨批撞卡 0**｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0」。
**`node batch-progress/dedup-crossbatch.mjs c171`** 另跑一次：逐字「**跨批撞卡 0**｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0」。
**MBID 10／10 逐張等於 `mbNote` 裡第一個 UUID。**

---

## 第 2771 條（**⚠ 派工信與原文／既有裁定牴觸之處；依規定回報**）：**四處，其中兩處是事實錯誤**

| # | 派工信原句 | 實查 | 影響 |
|---:|---|---|---|
| 1 | 第三節 Bill Charlap 那格：「**Discogs 條目逐字是 `Sandy Stewart (2) & Bill Charlap`**」 | **不是 `&`，是逗號。** Discogs 三筆零售條目（8390356／13840437／5992975）的標題逐字都是 **`Sandy Stewart (2), Bill Charlap`**；帶 `&` 的是**美版宣傳盤** 10351326，逐字 `Bill Charlap & Sandy Stewart (2)`（**而且順序相反**） | **不影響結論**（MB 串接形本來就是判準），但**若照派工信那句去比對，會以為 Discogs 支持 `&` 而少查一層**。第 2756 條 |
| 2 | 第三節 Ron Carter 那格：「**池中已有 `Ron Carter` 11 張**」 | **實掃是 9 張**，而且 **9 張全在未上架批次、`seed_cards.json` 裡 `Ron Carter` 掛頭 0 張** | 只影響 `why` 的數字寫法（第 409b／439 條）；**a 組第 2711 條已記同一處** |
| 3 | 第三節 Ruben Hein 那格：「**盤名逐字只有 `Live`**」 | **一半對**。MB RG 與 MB release 的 title 逐字確實只有 `Live`，**但 Discogs 零售條目的標題逐字是 `Live (At The Royal Theatre Carré)`**——**照「只有 `Live`」去跑第 1800-B 條的第二種掃描會回 0 筆有效結果**，本層改用 `artist=` 單欄查才撈到（第 1811-B 條那句「有時要單欄查」） | 影響年份查法的可執行性，已繞過 |
| 4 | 第二節：「⚠ **後果二**：『這張是不是 Blue Note 家族』不能靠 MB 的 `label-info` 判；⚠ **Discogs 的 `label` 陣列混著 company／studio／演出場地**——`The Blue Note Jazz Club` 是演出場地不是廠牌，第 2490 條」 | **這一句完全正確，而且是本組兩筆退件的直接依據**（第 2752／2753 條）。**但它舉的例子 `The Blue Note Jazz Club` 涵蓋不到本組真正命中的兩個字串**：**`The Blue Note Tokyo`**（Petrucciani，`Recorded At`）與 **`Blue Note Records` 出現在 `companies` 欄的 `Licensed To`／`Manufactured By`**（Van Morrison） | **不是錯，是範圍不足。** 處置寫在第 2752 條末段（白名單要改成看 `releases/<id>` 的 `labels` 欄，不看 search API 的 `label` 陣列） |

⚠ **另外更正的是既有裁定、不是派工信**：**`blue-note-artist-axis-audit.md` §三.15（Petrucciani）與 §三.22（Van Morrison）的 `gap` 判定，本層各撤回一筆**（第 2752／2753 條）。
**派工信第三節指名的三件事——Petrucciani 的錄音年／發行年、Van Morrison 的曲風閘、Joel Ross 的 `arid:6d09039b` 更正——本層都逐筆跑了，結論分別是：錄音 1997-11／發行 1999-10-15（但這張不屬本線）、非爵士退件、更正成立（browse 回得到 `KingMaker`）。**

---

## 第 2772 條（**交件版本認定**）

**以工作區當下的 `batch-progress/c171/prop-b.json` 與本檔為交件版**（第 1803-B／2497 條）。
本層在跑的過程中把 `prop-b.json` 寫回磁碟 **2 次**（第 5 筆、第 10 筆）；
**「筆數對了」不等於「定稿了」**——定稿時點是 `chk-prop b` 標記 0、`dedup-crossbatch c171` 跨批撞卡 0、第 315 條結算 10＋2＝12 三者同時成立之後。
**本節以 append 寫入，未覆寫 a 組的 2691–2712 條；未碰 `prop-a.json`、`seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`、`enum/blue-note.json`、KV、Firestore；未 `git commit`／`git push`／動索引。**
中間檔全部在 scratchpad 的 `c171b/` 子目錄。

---

## 第 2773 條（**主線 2026-09-19 中途指示的三點，逐點回覆**）：**佐證網址 12／12 逐筆點開核過；`&`→`and` 重掃 0 筆新撞卡；`Ron Carter` 兩組一致**

### （一）「有佐證網址」不等於「佐證對」——本組 12 筆逐筆核過，**碟本身 12／12 都對，錯的是廠牌欄的讀法**

主線點名 a 組第 2692 條的形狀：**稽核層引的那筆 Discogs 是另一張碟**。
**本層對 b 組 12 筆全部打 `api.discogs.com/releases/<id>` 把稽核層引的每一個 release id 逐筆展開核對標題、掛名、軌數、目錄號：**

| 稽核層引的 id | 核對結果 |
|---|---|
| 8259286（The Trio） | ✔ 同碟（`The Trio`／Rubalcaba・Chambers・Bromberg／7 軌 68:56／`Blue Note 4944422`） |
| **776573・8390770・5811384（Trio in Tokyo）** | **✔ 同碟，但 `labels` 欄逐字只有 `Dreyfus Jazz`；`The Blue Note Tokyo` 在 `companies` 欄、role 逐字 `Recorded At`** |
| 930303（Time） | ✔ 同碟（`Blue Note 7243 5 21886 2 8`／10 軌 49:56） |
| 13146556・11904625・9780419（Stardust） | ✔ 三筆同碟（8 軌 52:03／`Blue Note 7243 5 37813 2 3`） |
| 5074194（Round About Roma） | ✔ 同碟（8 軌 55:15／`Blue Note 7243 542406 2 1`） |
| 442265・18142315・1872228（The Bandwagon） | ✔ 三筆同碟（10 軌 58:32／`Blue Note 7243 5 80917 2 4`・`…91893 2 1`） |
| 5992975・10351326・8390356（Love Is Here to Stay） | ✔ 三筆同碟（11 軌 56:51／`Blue Note 7243 5 60340 2 0`・`…60341 2 9`）**⚠ 且已與 Discogs 同一次查詢回的 19 筆 Tony Bennett／Diana Krall 2018 同名別碟分開** |
| 4604332（Live） | ✔ 同碟（10 軌／`50999 9410122 5`／十軌軌名與 MB RG `47b79830` 的 release 逐字相同，見第 2765 條） |
| **12319738・3917807・8960423（Born to Sing）** | **✔ 同碟，但 `labels` 欄逐字只有 `Exile`；`Blue Note Records` 在 `companies` 欄、role 逐字 `Licensed To`／`Manufactured By`；⚠ 12319738 的 format 逐字帶 `Unofficial Release`** |
| 34231921・13995462・14779127（Flight） | ✔ 三筆同碟（`Blue Note B002868602`／`00602567741343`） |
| 13619280（KingMaker） | ✔ 同碟（12 軌／`Blue Note B003003802`／barcode 602577555282） |
| 14078627（A Wall Becomes a Bridge） | ✔ 同碟（12 軌／`Blue Note 774920 6`／barcode 602577492068） |

**→ 與 a 組的失效模式不同**：a 組那一筆是**引錯碟**（盤名不同、掛名不同、形態是 Compilation），
**b 組這兩筆是引對碟、把 `companies` 欄的角色讀成廠牌**。
**兩種要分開記**：前者靠第 2693 條的第三關（盤名）擋得住，**後者擋不住——只能靠「打 `releases/<id>` 把 `labels` 與 `companies` 分開看」**（第 2754 條本層新增的那一道）。
⚠ **給主線：兩道要一起用，缺一不可。本組 12 張裡第二種命中 2 次、第一種 0 次；a 組 13 張裡第一種命中 1 次。**

### （二）`&`→`and` 正規化重掃：**0 筆新撞卡**

**本層的實掃腳本從一開始就用與 `chk-prop.mjs` 的 `k()` 完全相同的正規化**
（逐字 `s.toLowerCase().replace(/[&＆]/g,'and').replace(/[^\p{L}\p{N}]+/gu,'')`），**不是稽核層那一套**，因此第 2695 條那個成因在本層不存在。
**依主線指示再針對 `&`／`and`／斜線／`+` 的替代寫法重掃一次**：

- **10 個盤名裡含 `&`／`and`／`/`／`+` 的：0 個**（`The Trio`／`Time`／`Stardust`／`Round About Roma`／`The Bandwagon`／`Love Is Here to Stay`／`Live`／`Flight`／`KingMaker`／`A Wall Becomes a Bridge`）——**本批盤名這一側不可能有 `&`／`and` 分裂。**
- **10 個掛名裡含 `&` 的 1 個**：`Bill Charlap & Sandy Stewart` → 折鍵 `billcharlapandsandystewart`；**四處以該折鍵比對命中 1 筆（本批自己的 prop-b）**，`Bill Charlap and Sandy Stewart`／`Sandy Stewart & Bill Charlap`／`Sandy Stewart, Bill Charlap`／`Bill Charlap / Sandy Stewart` 四種替代寫法在四處**各 0 筆**。
- **斜線掛名側**：seed 的 `Red Garland / Ron Carter / Philly Joe Jones`、c-156 的 `Stefon Harris / Jason Moran / Greg Osby / Mark Shim`、c-166 的 `Kendrick Scott, Reuben Rogers, Walter Smith III` 三組**逐筆展開比對，與本批 10 張各 0 筆撞卡**。
- **雙 RG 這一側本層另用 MB 端查**（不靠字串）：10 張各打一次 `release-group?query=artist:"<掛名>" AND releasegroup:"<盤名>"`，**命中 1 筆雙 RG（`Ruben Hein《Live》`，第 2765 條）**——**這正是第 2694 條那個形狀，本層用 MB 端而不是字串比對抓到的。**

### （三）`Ron Carter`：**兩組一致，不改**（第 2757 條；`why` 的數字已照 9 張寫，不是派工信的 11）

### （四）盤名單獨命中的假陽性：**b 組 12 張是 26 次**（a 組 13 張是 19 次、c-170 全 25 筆是 7 次）

**本組四張通名盤名（`The Trio`／`Time`／`Live`／`Flight`）合計 26 次字串命中、真的同碟 0 筆**，逐筆明細見第 2767 條。
**判「已收」一律比對 `album` 欄逐字，本層全程未用 grep 認定任何一筆。**

---

## 第 2774 條（**⚠ 給主線：順手掃到三筆同形狀的線索，不影響本批結算**）

主線指示「如果你 12 張裡有同藝人的碟，順手看一眼有沒有同樣形狀的漏」。**掃了本組 10 個掛名的完整 Discogs 目錄，三筆值得回頭查：**

| # | 碟 | 狀態 | 建議 |
|---:|---|---|---|
| 1 | **`Stefano Di Battista Quintet《A prima vista》`(1998)** | **MB RG `81f84659-e4f4-3861-9ad1-e60fbc93bbcd`，credit 逐字 `Stefano Di Battista Quintet`、frd 1998、⚠ `primary-type` 欄逐字 undefined（未設）**；`enum/blue-note.json` 1,812 列逐字 **0 命中**；四處 0 命中。Discogs 7095518（France 1998、`label` 逐字 `['Blue Note','EMI Music France',…]`、catno `7243 4 97945 2 8`）＋17872195（Japan 2001、`Blue Note`／`TOCJ-66022`） | **與 Kevin Eubanks《Spiritalk》同形的新缺口，但成因多一層**：**`primary-type` 沒設，所以連藝人軸稽核的 `type=album` 過濾都會漏掉它。** ⚠ **這是第六種列舉失效形狀的候選，建議主線記一條。** |
| 2 | **`Stefano Di Battista《Parker's Mood》`(2004)** | **在 `enum/blue-note.json` 裡（rgMbid `9069a449-c6d2-3d1d-8cde-e47a58829ab5`），但該列的 `year` 欄逐字 `null`**；四處 0 命中。Discogs 1033040（US 2004、`Blue Note`／`7243 8 66740 2 9`）、34074079（Japan 2004、`Blue Note`／`TOCJ-66248`）、16104344、11187856、26272526、30961297 六筆 | **不是列舉漏抓，是「`year` 為 null 的列在依年份排序切批時掉出去」。** ⚠ **建議主線查一下 `enum/blue-note.json` 裡還有多少列 `year` 是 null——那可能是一整組被切批漏掉的碟。** |
| 3 | `Ruben Hein Featuring Ernst Glerum @ Joost Patočka《Revisited》`(2012) | Discogs 4604320（Netherlands 2012、`label` 逐字 `['EMI Music Netherlands','Blue Note']`、catno `5099 5595972 8`）；**MB `release-group?query=artist:"Ruben Hein" AND releasegroup:"Revisited"` 逐字回 `count: 0`——MB 沒建這個 RG** | **MB 查無，本線不收**（簡報：一般批查無就不收）。**記進未收清單，可進 §1 補遺批。** |

⚠ **三筆都不影響本批第 315 條結算**（12 ＝ 10 收 ＋ 2 退）。
