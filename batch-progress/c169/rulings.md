# c-169 裁定（Blue Note 1985 年後線・列舉漏切補批之一）

本批與 `c170` 都不是原始列舉切出來的，是 **2026-09-18 查出列舉腳本曲風判錯層級**之後的補批。
背景見 `batch-progress/enum/blue-note-unknown-genre.md`
與 `batch-progress/CURATION-BRIEF-bluenote-post1985.md` 的 2026-09-18 附錄。

## 第 1557 條（主線，**新立；c168／c169／c170 共用**）：**列舉漏切的 75 張 `jazz-missing` 全部補成 slice——這是「失敗與正常長得一樣」在**列舉層**的一次應驗**

- **根因**：列舉腳本讀 **artist 端**的 genres 來判曲風，而不是 **release-group 端**。
  97 張進 `unknown` 的盤裡，**artist 端 92／97 是空的**，**RG 端卻有 54／97 明寫 `jazz`／`hard bop`／`post-bop`**。
  `blue-note.json` 的 `generated` 是 **2026-09-15**，**不是舊資料**——腳本當天就讀錯了層。
- **形狀**：`unknown` 這個值本身沒有錯，**「MB 真的沒標曲風」與「我讀錯層所以沒讀到」回報的是同一個值**。
  整條線因此少切 75 張、而且**沒有任何一道檢查會亮燈**（卡池對得起來、dedup 全清、chk-prop 四道全過）。
  **列入第 1370／1371／1433 條那一族。**
- **處置**：
  - **1985–1999 的 17 張 → `c168/slice.json`**（18 張：另含 Don Byron《Nu Blaxploitation》的真 RG
    `6aab4e1b-5c96-32e8-a3ba-328fcd8f1c50`，原判 `jazz-dup` 是因為對到了錯的 RG）。
  - **#96 Wilkins《Live at the Village Vanguard Vol. 1》→ 補進 `c167/slice.json`**，
    否則本線會出現**只有 Vol. 2、Vol. 3 沒有 Vol. 1 的斷號**。
  - **其餘 57 張 → `c169`（41 張，a 21／b 20）＋ `c170`（16 張，a 8／b 8）**，切法見下一條。
- ⚠ **同一支腳本產出的其他廠牌線可能有同樣的缺口。** 雲端這邊沒有重跑列舉的權限，
  **建議本機用 `release-group?inc=genres+tags` 重跑各線的 `unknown` 列**，逐線比對數字。

## 第 1558 條（主線）：**c169／c170 的切批界線取 2020 年，唯一例外是 Kandace Springs 整組移後**

- **2000–2019 → c169（41）；2020 年以後 → c170（16）。**
- **例外**：**Kandace Springs 的三張（2016 Soul Eyes／2018 Indigo／2020 The Women Who Raised Me）整組移進 c170。**
  理由：她與 Joel Ross（2020／2022／2024／2026 四張）是本線**卡池裡一張卡都沒有**的兩條線，
  整條落在同一批，**反同構條款與掛名判定各只需做一次**，也避開第 1418 條「同一位藝人被兩批各判一次掛名」的風險。
- **c170 是本線最小的一批（16 張），不再往下拆。**
- 兩批 slice 的 `genre` 欄統一 `jazz`；人工判定的細曲風存 `triageGenre`，
  `triageN` 保留 `blue-note-unknown-genre.md` 的編號以便回查；
  `note` 欄逐張寫明「列舉層曲風判錯層級（讀藝人端而非 RG 端）而漏切」＋人工判定值。

## 第 1559 條（主線，**策展層必讀**）：**本批有四種「邊界張」，判準與既有裁定的對應**

`blue-note-unknown-genre.md` 標了 ⚠「邊界張，可逆」的，在 c169 落了 5 張：
**Jackie Allen《Tangled》**（人聲爵士唱 folk-rock 曲目）、
**Anna-Mari Kähärän Orkesteri** 同名盤（爵士×北歐民謠）、
**Kitty Hoff & Forêt-Noire《Zuhause》**（德語 chanson-jazz）、
**Emma Salokoski & UMO《Rytmihyrrä / Rytmyra》**（大樂團演兒童歌曲企劃）、
**Sunaga t Experience《STE》**（DJ 企劃 jazzdance）。

- 這五張**已經通過 jazz／non-jazz 判準進了 slice**，策展層**不要再拿曲風把它們退掉**；
  要退只能靠**收藏線判準六句（甲～己）**或 published gate。
- **c170 另有 `lophiile《The Good Days Between》（2023，8 軌 17 分鐘）**——
  **EP 收不收由策展層當場定並寫進 rulings**（裁定權下放）；判準先看池中同形狀的前例。

## 第 1560-AD 條（主線，**c-160 策展 a 提出的 `Blue Note Label Group` 疑慮已全線稽核；結論：前面各批乾淨**）

c-160 策展 a 新立第 1631／1633 條：**`Blue Note Label Group [2eb19785]` 不是 imprint，是 EMI 2006 年起的部門名**，
懷疑列舉檔可能因此把 Manhattan／Narada／Angel 的碟混進前面幾批。
**主線已對全 repo 做逐 RG 稽核**（MB 拉該實體全部 12 筆 release → 折成 11 個 RG →
比對 `enum/blue-note.json`、所有 `batch-progress/c*/`{`slice`,`prop-a`,`prop-b`}`.json`、
以及 `desc-tools/batches/cards/` 全部卡單）。

**結論：已發卡的各批（c-148～c-159）一張都沒有混進來。** 11 個 RG 的落點：

| RG | 落點 |
| --- | --- |
| Amos Lee《Last Days at the Lodge》／Priscilla Ahn《A Good Day》／the bird and the bee／Gregory Porter《Liquid Spirit》／Alejandro Escovedo《Real Animal》／Ambrose Akinmusire《on the tender spot…》 | **只在 `enum/blue-note.json`，未進任何 slice** |
| Various《The Best of Capitol Rare》／Marc Moulin《Into The Dark》／Norah Jones《Live in 2007》 | **連列舉檔都沒有**（前兩筆是合輯與非本線盤；Norah 那張在 c160 的是另一個 RG） |
| **Anoushka Shankar & Karsh Kale《Breathing Under Water》** | **c160/slice.json ——已由 c-160 策展 a 依第 1631 條退掉，正確** |
| **Dr. John and the Lower 911《Sippiana Hericane》** | **c169/slice.json（主線補批）——見下條** |

**→ 第 1631 條的風險是真的，但只在 2006 年以後的批次才碰得到，而本線 c-160 之前全是 2005 年以前的碟。**
c-160 策展 a 建議「用 label id 重跑 1,812 列過濾」**在雲端這一段已無必要**；
**c-161 以後（2008+）仍要逐批照第 1631 條的分界檢查。**

## 第 1560-AE 條（主線，**裁定**）：**Dr. John《Sippiana Hericane》留在 c169，但要標成 EP**

依第 1631／1633 條的分界逐項查：
- **MB 三筆 release 沒有任何一筆掛 `713c4a95`**（XE 掛 EMI、US 掛 `Blue Note Label Group:45687`、XW 掛 Parlophone）。
- **但 Discogs 美版零售條目（`0946 3 45687 2 2`）的廠牌鏈第一格逐字是 `Blue Note`**，
  另有一筆 2005 年的 `Blue Note` 宣傳 CDr。

**裁定：收。** 第 1631 條的分界是「**有沒有任何一版真的掛過 Blue Note**」，
**Anoushka 那張退掉是因為零售第一格逐字 `Manhattan Records`＋Billboard 榜欄逐字 `MANHATTAN 09539 /BLG`，
兩邊都指向別的 imprint；這張的零售第一格就是 Blue Note，方向相反。**
**MB 的 label-info 在 2005–08 這段本來就常把 `713c4a95` 記成 `2eb19785`（部門名蓋掉 imprint），
不能拿 MB 單邊的缺漏當退件理由。**

⚠ **但要標一件事：這張是 EP。** MB 兩筆 release 都是 **7 軌、總長約 25 分鐘**
（〈Clean Water〉2:31／〈Wade: Hurricane Suite〉四段／〈Sweet Home New Orleans〉8:14／〈Clean Water (reprise)〉0:25），
**Discogs 三筆零售條目的 format 欄都逐字帶 `EP`。** 這是卡崔娜風災的募款企劃盤。

**→ 已在 `batch-progress/c169/slice.json` 的該筆 `note` 標註。**
**收不收 EP 由 c-169 策展層當場定**（與 c170 的 `lophiile《The Good Days Between》`，8 軌 17 分鐘，同一個問題）
——**兩張一起決定，不要一張收一張退。** 判準先看池中同形狀的前例。

---

# c-169 **a 組（21 張，2000–2009）** 裁定　2026-09-19

*（編號 2126–2185 為 a 組專用區間；b 組用 2186–2245。本段以 append 寫入，未動前面第 1557–1560-AE 條。）*

## 第 2126 條（a 組，**總表**）：**21 張＝收 20 ／ 退 1**

| | 張 |
|---|---:|
| **`prop-a.json` 收件** | **20** |
| **退件** | **1**（Dr. John and the Lower 911《Sippiana Hericane》，理由分類：**非 Album 形態（EP），未落在 §5.5 白名單**） |
| **合計** | **21** ✔（第 315 條結算通過） |

**收件 20 張逐筆**（依 `prop-a.json` 順序）：Supergenerous《Supergenerous》2000／Thierry Lang《Guide Me Home》2000／Booster《Loop in Release》2001／Trio Focan feat. Mika Mylläri & Mikko Helevä《standard a'la Turc》**2002**／U-Street All Stars《Helsinki Sessions》2002／Scolohofo《Oh!》**2002**／Θάνος Μικρούτσικος《Music Stories》2003／Jackie Allen《Tangled》**2006**／U-Street All Stars《Bowling》2004／Anna-Mari Kähärän Orkesteri《Anna-Mari Kähärän Orkesteri》2005／Brisa Roché《The Chase》2005／**Paolo Fresu Quintet**《Kosmopolites》2005／Joona Toivanen Trio《Frost》2006／**Paolo Fresu Quintet**《Thinking》2006／Alice Ricciardi《Comes Love》2008／Franco D’Andrea Quartet《The Siena Concert》2008／High Five Quintet《Five for Fun》2008／Musica Nuda《55/21》2008／Juliano Rossi《Free Runner》2009／Kitty Hoff & Forêt-Noire《Zuhause》2009。

**20 張、18 位掛名**（`U-Street All Stars` 與 `Paolo Fresu Quintet` 各兩張）。

---

## 第 2127 條（a 組，**裁定；第 1560-AE 條授權本層當場定**）：**EP 一律不收——Dr. John《Sippiana Hericane》退，c170 的 lophiile《The Good Days Between》同判**

第 1560-AE 條把「收不收 EP」下放給本層，並要求「兩張一起決定，不要一張收一張退」，判準「先看池中同形狀的前例」。**實查前例，四筆一致指向不收**：

| 前例 | 逐字 |
|---|---|
| **共通五條第 4 條**（`CURATION-BRIEF-c128-c130.md` 第〇節，本線經 `c131` → `c127` 鏈引） | **「EP 不收，除非落在 §5.5 白名單（`electronic`／`hardcore-7inch`／`asia-mini-album`）」** |
| **c-093 第 1 段** | Slint「只剩 1994 年同名 EP」→ 判 **「目錄已滿（EP 不進一般卡池）」** |
| **c-131 C 段** | 秋吉敏子的 EP `f13fc3f9`《Toshiko…》→ **不收**（與大樂團、合輯、合掛並列在同一段） |
| **c-112 第 9 條** | **「這一組只收 `primary-type=Album`，EP 一律不碰」** |

**Blue Note 爵士線不在 §5.5 的三個白名單裡。**

### 本張的形態覆核（不是照抄第 1560-AE 條，是重查）

- **MB 兩筆實體 release 都是 7 軌、總長 25 分 25 秒**（〈Clean Water〉2:31／〈Wade: Hurricane Suite〉四段 3:18＋3:49＋3:28＋3:40／〈Sweet Home New Orleans〉8:14／〈Clean Water (reprise)〉0:25）；XW 數位版 9 軌 33 分。
- **Discogs 美版零售條目 4207906 的 `format` 欄逐字 `CD, EP`**（4 軌，它把 Hurricane Suite 併成一軌）。
- ⚠ **MB 的 `primary-type` 逐字是 `Album`**——**這正是「MB 與盤面不一致」的那一格**。**判準取盤面／零售條目的 `format` 欄（第 1734 條的同一句：看 Discogs `format` 欄，不看 MB 的型別欄）**，加上 25 分鐘的實測時長，**判定為 EP。**

### 裁定

**退。** 理由分類：**非 Album 形態（EP），未落在 §5.5 白名單。**

- **對照組（同組 6～7 軌但不是 EP）**：`Franco D’Andrea Quartet《The Siena Concert》`（6 軌 **77 分**，Discogs format 逐字 `CD, Album, Stereo`）與 `Anna-Mari Kähärän Orkesteri` 同名盤（7 軌 **46 分**，format 逐字 `CD, Album`）——**分界在時長與 `format` 欄，不在軌數。**
- ⚠ **退這張不傷目錄深度**：`Dr. John` 池中已有 **10 張**（seed 6：Gris-Gris／In the Right Place／Desitively Bonnaroo／Goin' Back to New Orleans／Dr. John's Gumbo（apex `hall`）／Locked Down；待上架 4：c-156《Duke Elegant》、c-157《Creole Moon》、c-159《N’Awlinz》、c-159《Mercernary》），**2005 這一年前後左右都已補齊。**
- ⚠ **本張的掛名 `Dr. John and the Lower 911` 是池中沒有的第二個字串**（seed 與待上架批次的十張全是裸名 `Dr. John`）。**退掉這張等於本線不新立這個字串**——**若 c170／後批遇到同一團的另一張 Album，掛名要照 MB 的 `Dr. John and the Lower 911`（ecaca7ba，Group／US），不要合併進裸名。**

### **→ 給 c-170 策展層（第 1560-AE 條要求兩張一起定）**

**`lophiile《The Good Days Between》`（2023，8 軌 17 分鐘）依同一判準退，理由分類相同。** 17 分鐘比本張還短，**不必再重查一次，照本條執行**；若 c-170 查到它的 Discogs `format` 欄逐字是 `Album` 而非 `EP`，**以時長為準仍判 EP**（17 分鐘沒有任何一條前例把它當 Album 收過）。

---

## 第 2128 條（a 組，**掛名**）：**沿用池中既有字串 1、照既有裁定的先例 1（共 2 張卡）、新字串 15；新造分裂 0**

### （一）沿用池中既有字串 1
**`Θάνος Μικρούτσικος`**（seed 1 列：《Ο Σταυρός του Νότου》1979，c-62 a 已上線）——見第 2131 條。

### （二）照既有裁定的先例 1 個字串／2 張卡
**`Paolo Fresu Quintet`**（c-160 b 已建卡單，《Rosso, verde, giallo e blu》2007）——見第 2129 條。

### （三）新字串 15（三形都掃過，seed 與所有待上架批次皆 0 列）
| 掛名 | MB 實體 | 第 307 條反查 |
|---|---|---|
| `Supergenerous` | 4044ccb7 Group（member：Cyro Baptista、Kevin Breit） | 同字串單一實體；裸名 `Kevin Breit`／`Cyro Baptista` 池中亦 0 列 |
| `Thierry Lang` | aa3a0a69 Person／CH | 同字串單一實體 |
| `Booster` | 32fbb6e4 Person／FR（disambiguation 逐字 `FR jazz artist Olivier Armbuster`） | ⚠ **極短通用字串（第 179／250 條）**，池中有無只看完整字串 |
| `Trio Focan feat. Mika Mylläri & Mikko Helevä` | 5ee6a1bd Group／TR ＋ c5f85b3b ＋ a58449e3 | ⚠ **`Önder Focan` 裸名池中已有 2 張**（c-153 b／c-155 b）——**第 1131 條：不同編制各自成立，那兩張一個字都不動** |
| `U-Street All Stars` | eccdde08 Group／FI（disambiguation `Finnish jazz band`） | **本組兩張卡共用同一字串** |
| `Scolohofo` | 0d1f449a Group（member：Al Foster、Dave Holland、Joe Lovano、John Scofield） | ⚠ **四位成員的既有字串全部不動**（`Joe Lovano` 光是本線就 24 張、`John Scofield` 8 張、`Dave Holland Quartet` 2 張 seed、`Al Foster` 另計）——第 1131 條 |
| `Jackie Allen` | 13d4fb5a Person／US | ⚠ **Discogs 寫 `Jackie Allen (2)`，括號裡是 Discogs 的同名消歧編號、不是掛名的一部分**（第 250 條同形） |
| `Anna-Mari Kähärän Orkesteri` | 2210a5a3 Group／FI | ⚠ **掛名等於盤名（`selfTitled: true`）**，下游引用務必帶年份 |
| `Brisa Roché` | 26183789 Person／FR | 同字串單一實體 |
| `Joona Toivanen Trio` | bc719e76 Group／FI | 裸名 `Joona Toivanen` 池中亦 0 列 |
| `Alice Ricciardi` | d30aa77d Person／IT | 同字串單一實體 |
| `Franco D’Andrea Quartet` | 8145fd7d Group／IT | ⚠ **含 U+2019**；Discogs 與 Apple 用 ASCII `'`，兩形都進 `queryAlias` |
| `High Five Quintet` | 6e062659 Group／IT | ⚠ **Discogs 用 `The High Five Quintet`＋anv `High Five`**，三形；取 MB／slice 形 |
| `Musica Nuda` | b7840712 Group／IT | **跨組定案，見第 2130 條** |
| `Juliano Rossi` | 72ee0d29 Person | 同字串單一實體 |
| `Kitty Hoff & Forêt-Noire` | 117b1d13 Group／DE | 四邊逐字一致，**無 `and` 形** |

### （四）新造分裂 0。**聯名新造 0**（本組沒有任何一張是兩位並列藝人共同掛名——見第 2129／2131 條）。

---

## 第 2129 條（a 組，**⚠ ⚠ 派工信第三點與既有先例牴觸；照先例**）：**兩張 Paolo Fresu 判 `Paolo Fresu Quintet`，不取 MB 串接形**

**派工信第三節第 3 點逐字寫：「掛名取 MB credited-name 串接那一種（第 1539 條原文，不是「取 `&`」）」。照這句執行會得到兩個掛名字串：**
`Paolo Fresu 5et Plays the music of Roberto Cipelli` 與 `Paolo Fresu 5et Plays the music of Ettore Fioravanti`。

### ⚠ 但 c-160 b 對**完全同形**的一筆已經判過，而且判的是相反方向

| | c-160 b 已建卡單的那張 | 本組兩張 |
|---|---|---|
| RG | `48da0c29`《Rosso, verde, giallo e blu》2007 | `c9f31697`《Kosmopolites》2005／`ed889e2a`《Thinking》2006 |
| MB artist-credit 第一格 | **`Paolo Fresu Quintet` `8799705f`，credited-name 逐字 `Paolo Fresu 5et`** | **同一個 `8799705f`，credited-name 同樣逐字 `Paolo Fresu 5et`** |
| joinphrase | **逐字 ` Plays the music of `** | **逐字 ` Plays the music of `** |
| 第二格 | `Paolo Fresu` `c7301466`（本人） | `Roberto Cipelli` `ecf0246e`／`Ettore Fioravanti` `3e8e8b57` |
| 串接形 | `Paolo Fresu 5et Plays the music of Paolo Fresu` | `…Roberto Cipelli`／`…Ettore Fioravanti` |
| **c-160 b 判的掛名** | **`Paolo Fresu Quintet`** | — |

**有先例照先例（裁定權下放的第 1 條判準）。判 `Paolo Fresu Quintet`。**

### 三項獨立佐證

1. **Discogs 四筆條目（3412494／28206658／24926006／32858634 ＋《Thinking》的 5148183）的 `artists` 欄逐字全是 `Paolo Fresu Quintet`、`anv` 逐字 `Paolo Fresu 5et`**；**「Plays The Music Of …」是印在 `title` 欄裡的**（逐字 `Kosmopolites (Plays The Music Of Roberto Cipelli)`／`Thinking (Plays The Music Of Ettore Fioravanti)`）。**那句話是盤名的一部分，不是掛名。**
2. **Apple 三店（it／us／fr）同一 id 713684432／714246276，掛名逐字都是裸名 `Paolo Fresu`**——**沒有任何一邊把 Cipelli 或 Fioravanti 當共同掛名。**
3. **第 1745-B 條**：`Paolo Fresu 5et Plays the music of Roberto Cipelli` 這個**掛名**字串**只有 MB 一邊有**，四邊都沒有的不可新造；且照串接會與池中 c-160 b 的 `Paolo Fresu Quintet` **分裂**（第 307／1418 條）。

### ⚠ 為什麼第 1539 條在這裡不適用

**第 1539 條原文（`c158/rulings.md`）處理的是「並列聯名的連接形」**——Renee Rosnes 與 DR Big Band 是**兩個共同掛名的演出者**，爭的是 `and the`／逗號／`With` 哪一形。**本例的第二格是作曲者兼團員（Cipelli 是本團鋼琴手、Fioravanti 是本團鼓手），joinphrase 是一句盤名片語而不是連接符。** 第 1539 條的判準句（第 1745-B 條更正後的版本）逐字是「**並列聯名**的連接形，取 MB `credited-name` 與 joinphrase 串接出來的那一種」——**本例不是並列聯名，前提不成立。**

**→ 給後批：`… Plays the music of X` 這個 joinphrase 形狀在 Paolo Fresu 的 Blue Note 目錄裡至少三筆（2005／2006／2007），一律判成團名掛名 `Paolo Fresu Quintet`、把「Plays the music of X」留給 `queryAlias`。** 這個判定是**可逆的**（只動卡單的掛名欄，不動卡池結構）。

---

## 第 2130 條（a 組，**跨組定案；b 組必讀**）：**`Musica Nuda` 三張共用一個掛名字串**

第 1418 條點名「同一位藝人被兩組各判一次掛名是已知的分裂來源」。本團在 c-169 落三張：**a 組 1 張（2008《55/21》）、b 組 2 張（2011《Complici》／2013《Banda larga》）。a 組先判，b 組照抄。**

**判 `Musica Nuda`。** 四邊實查，**無分歧**：

| 來源 | 逐字 |
|---|---|
| **MB artist-credit** | **單一 Group 實體 `Musica Nuda`（`b7840712-9e9a-4acb-a40a-8e337bd060f3`，IT，disambiguation 逐字 `Petra Magoni & Ferruccio Spinetti`，member：Petra Magoni 主唱、Ferruccio Spinetti 低音提琴）** |
| **Discogs 3387869（2008 法版原壓）／9406580（2012 義版再發）** | **`Musica Nuda`，無 anv** |
| **Apple fr 332543854（55/21）／425341018（Complici）** | **`Musica Nuda`** |
| **slice.json** | **`Musica Nuda`** |

**池中 0 列**（`Musica Nuda`／`Petra Magoni`／`Ferruccio Spinetti` 三形都掃過；子字串命中的 `Petra —《Petra》`(1974)、`Petra —《Come and Join Us》`(1977) 是 c-72 的美國基督搖滾團，假陽性）。

⚠ ⚠ **b 組要注意的那個鄰居**：**他們 2004–06 年的碟在 Apple 上掛的是 `Petra Magoni & Ferruccio Spinetti`**（178823140《Musica nuda》2004、205274814《Musica Nuda (Bonus Track Version)》2004、260702636《Musica nuda - Live à Fip》2006）。**那是舊掛名，不是本線的字串。** 日後若那幾張進批次，照第 1131 條當成不同時期的掛名另立，**不得回頭改這三張卡**。

---

## 第 2131 條（a 組，**裁定**）：**`Θάνος Μικρούτσικος《Music Stories》`——Gary Burton 不進掛名，三比一但仍取希臘文單掛名**

| 來源 | 掛名欄逐字 |
|---|---|
| **MB artist-credit** | **單一實體 `Θάνος Μικρούτσικος`（`1ba86abf`，Person／GR）** |
| ⚠ **Discogs 3264997** | **兩格：`Thanos Mikroutsikos` ＋ join 逐字 `/` ＋ `Gary Burton`** |
| ⚠ **Apple fr 1383518011** | **`Thanos Mikroutsikos & Gary Burton`** |
| ⚠ Spotify／RYM | 同樣並列（`Thanos Mikroutsikos, Gary Burton`／`thanos-mikroutsikos-gary-burton`） |
| **slice.json** | `Θάνος Μικρούτσικος` |

**判 `Θάνος Μικρούτσικος`（希臘文單掛名）。** 三個理由：

1. **第 307 條**：**池中 seed 已有這個字串**（`Θάνος Μικρούτσικος —《Ο Σταυρός του Νότου》1979`，c-62 a 已上線）。並列會造第二個字串。
2. **第 1745-B 條**：**「希臘文 ＋ Gary Burton」這個混字形字串四邊都沒有**——Discogs 與 Apple 的並列形都是**羅馬轉寫**（`Thanos Mikroutsikos / Gary Burton`），要並列就得連主名一起換成羅馬字，**那會直接與池中那張分裂**。
3. **Burton 在盤面上的身分是獨奏者不是共同領班**：Discogs credits 欄逐字 `Gary Burton=Vibraphone`、`Thanos Mikroutsikos=Composed By`、`Alexandre Myrat=Conductor`、`Kamerata Orchestra Of The Friends Of Music=Orchestra`。**這是「作曲家＋協奏獨奏者」的形狀，不是第 1539 條的並列聯名。**

⚠ **`Gary Burton` 池中已有三張 seed（`Gary Burton & Chick Corea`：Crystal Silence 1973／Duet 1979／The ECM Recordings 1972–79 2009），裸名 `Gary Burton` 0 列——本卡不動那三張，也不新立裸名。** 兩種並列寫法全部進 `queryAlias`。

⚠ **掃卡池時希臘文原字串與羅馬轉寫兩種字形都掃過**（`Μικρούτσικος` 命中 3 筆＝seed／c62-cards／c62 prop 的同一張 1979 年碟；`Mikroutsikos` 0 筆）。**`dedup-crossbatch` 的正規化用 `\p{L}\p{N}` 保留非拉丁文字**（腳本開頭註解逐字記了 c-53／c-62 那次把希臘文壓成空字串、誤報 76 筆的修法），本卡入表無誤。

---

## 第 2132 條（a 組，**年份改判 2 筆、覆核成立 18 筆**）

⚠ **本條在 2026-09-19 主線中途補充之後追加了第三筆改判（Scolohofo《Oh!》2003 → 2002），見第 2146 條；改判合計 3 筆、覆核成立 17 筆。**

### （一）`Jackie Allen《Tangled》`：**2004 → 2006**

| 層 | 逐字 |
|---|---|
| slice／MB frd | **2004**（來源是 MB release `5d797c5e`＝GB 版） |
| Discogs 2270010／master 1232342 | **年份欄 2004**（UK，catno `0946 3 30081 2 0`） |
| **Apple us／gb／de 三店同一 id 716517015** | **releaseDate 逐字 `2006-01-01`、copyright 逐字 `℗ 2006 Blue Note Records`** |
| **AllMusic／零售條目（Amazon barcode 0094633008021）** | **2006** |
| **目錄號配號** | **`0946 3 30080 2 1`（US）與 `0946 3 30081 2 0`（UK）連號＝同一次配號**；EMI 的 `0946 3 xxxxx 2 x` 段是 **2005 年以後**才啟用（同組佐證：Brisa Roché《The Chase》`0946 3 35930 2 2`＝2005-10、Joona Toivanen《Frost》`0946 3 52099 2 1`＝2006-01） |
| Discogs 10798559（US 2006） | format 逐字帶 `Reissue`，**但軌目與軌長與 UK 版 12 軌逐秒相同**——兩者是同一張碟的兩地發行，不是隔兩年的再發 |

**判 2006。** Discogs 那一欄的 2004 是年份欄誤植（**第 550／570／708 條**），MB frd 抄了它。**可逆**（只動 `year`）。

### （二）`Trio Focan feat.…《standard a'la Turc》`：**2001 → 2002**

| 層 | 逐字 |
|---|---|
| slice／MB frd／Discogs 14930583 | **2001**（Discogs 年份欄無月日） |
| **Discogs 14930583 的 notes** | **`Recorded live and mixed on November 18-19-20th 2001`** |
| **Apple tr／fi 同一 id 1457831663** | **releaseDate 逐字 `2002-01-18`**（**不是 01-01 佔位值，也不是錄音日**——第 484 條的兩種假陽性都不成立）、copyright 逐字 `℗ 2002 Universal Music Türkiye` |
| **同批卡帶版 Discogs 17440579** | catno `MD 5378284`（與 CD 的 `CD 5378282` 連號），**年份欄 2002** |

**判 2002。** 錄音與混音到 2001-11-20 才結束，距年底只剩五週；**兩個 2002 的獨立訊號（Apple 的精確日 ＋ 連號卡帶）壓過 Discogs 一格沒有月日的年份欄。可逆**（只動 `year`；若本機端拿到 2001 年 12 月的土耳其發行證據，改回即可）。

### （三）覆核成立 17 筆（原記 18 筆，扣掉後來改判的 Scolohofo）
其餘 18 張的 MB frd／Discogs 原壓群／Apple ℗ 三層一致（Apple 的 `-01-01` 一律當佔位值只取年）。**2000 年後這一段紙本不是主要來源，`yearVerified` 一律寫到「Discogs 原壓群 ＋ Apple ℗ ＋ MB frd」這一層**（簡報第二節）。⚠ **`Anna-Mari Kähärän Orkesteri` 那張只有兩層**（Apple 查無），已在卡的 `risk` 註明。

---

## 第 2133 條（a 組）：**六句判準（甲～己）逐張跑過的結果——(甲) 0、(乙) 0、(丙) 0（訊號亮 3 次全部不成立）、(丁) 1、(戊) 0、(己) 0，另加第七種退件 1（EP）**

| 句 | 成立 | 說明 |
|---|---:|---|
| **(甲) 從未發行過 → 收** | **0** | 依第 1734 條**看 Discogs `format` 欄有沒有 `Reissue`／`Compilation`，不看軌數比例**：20 張收件的零售原壓 `format` 欄逐字全是 `CD, Album`（或加 `Copy Protected`／`Stereo`／`Limited Edition`／`Jewel Case`／`Promo`），**無一筆帶 `Reissue`**。**2000–09 這一格本來就沒有庫藏首發。** ⚠ 唯一「錄音早、發行晚」的 `Paolo Fresu Quintet《Thinking》`（2004-10 錄、2006 發）只隔一年半，沒有庫藏性質，第 1553／1734／1766 條三種認法一個都不成立 |
| **(乙) 母體在 BN／Liberty／UA／Solid State → 退** | **0** | 本組無再發盤；唯一的再發形 `Scolohofo《Oh!》` 2023 Tone Poet 雙黑膠已折進原盤 RG，本卡釘 2003 原盤 |
| **(丙) 母體在真正的他廠 → 收、`year` 取他廠版** | **0** | **訊號亮 3 次全部不成立**（見下） |
| **(丁) 部分重疊／形狀不同 → 收** | **1** | **`Θάνος Μικρούτσικος《Music Stories》`**——見第 2141 條 |
| **(戊) Pacific Jazz／Capitol Jazz／West Coast Classics／Roulette Jazz 再發系列 → 退** | **0** | 四條復刻線本組 0 筆（這一段是現役目錄）；`Blue Note Compagnie`（`BNS-`）與 `Blue Note Digital`（label `0293ae5c`、barcode 810211 段）亦 0 筆。逐張閘門見第 2134 條 |
| **(己) 載體只有影像 → 退** | **0** | 本組 20 張全部是 CD 主體，無 DVD／Blu-ray 版本 |
| ⚠ **第七種（不在六句裡）：非 Album 形態** | **1** | **Dr. John《Sippiana Hericane》（EP）**——第 2127 條。**六句判準沒有涵蓋 EP，因為它假設「碟已經確定是一張專輯」；這個假設在 2005 年的募款企劃盤上破了。給後批：六句判準之前除了第 1792 條的 imprint 前置閘，還要再加一道「形態閘」（看零售條目 `format` 欄有沒有 `EP`／`Single`，並實算總長）。** |

### ⚠ (丙) 的三次訊號，逐一為什麼不成立

| # | 卡 | 訊號 | 查完 |
|---|---|---|---|
| 1 | **`Brisa Roché《The Chase》`** | **Apple ℗ 欄逐字 `The copyright in this sound recording is owned by Capitol Music, a division of Parlophone Music France`**；Discogs 美版廠牌鏈第一格逐字 `Metro Blue` | **`Capitol Music` 是 EMI 法國的發行部門（地區發行公司型假陽性，第 1748 條第五種）**；**`Metro Blue` 是 Blue Note 自家 1994 年起的副廠牌**，第二格逐字就是 `Blue Note`，**法版零售條目第一格逐字 `Blue Note`** |
| 2 | **`Musica Nuda《55/21》`** | **Apple ℗ 欄逐字 `℗ 2008 Magoni-Spinetti under exclusive license to Bonsai Music`** | **藝人自己的名義 ＋ `under exclusive license`——第 1748 條列的第一種假陽性，一律過閘**；Discogs 法版廠牌鏈第一格逐字 `Blue Note` |
| 3 | **`Juliano Rossi《Free Runner》`** | **Apple ℗ 欄逐字 `℗ 2009 Oliver Perau`** | **`Oliver Perau` 是本盤的作詞者兼製作夥伴的個人名義**（Discogs notes 逐字 `Lyrics by Oliver Perau`），同第 1 種假陽性；Discogs 廠牌欄逐字單一 `Blue Note` |

⚠ **本組沒有出現「碟先在別家發、Blue Note 後來才拿到」的真 (丙)。** 三次訊號三次都是第 1748 條已經寫死的那兩類（藝人／製作方自己的名義、地區發行公司）。

---

## 第 2134 條（a 組）：**(戊)／imprint 前置閘逐張跑過——20 張全過；訊號不乾淨的 5 張靠第 1445 條第二層證據過閘**

**MB `label-info` 逐字：20 張裡 19 張是 `Blue Note [713c4a95]`（正規 imprint，不是部門名 `2eb19785`）；唯一的例外是 `Brisa Roché《The Chase》` 的法版 release（`bd10e348`＝`EMI Music France [d2d352a2]`、`df737ff0`＝`Parlophone France [0b81e41d]`、`e29352ca`＝無 label-info），但同 RG 的美版 `c1f18271` 逐字就是 `Blue Note [713c4a95]`。**

| 卡 | 不乾淨的訊號 | 第 1445 條的第二層證據 | 判 |
|---|---|---|---|
| **Thierry Lang《Guide Me Home》** | **Discogs 瑞士原壓 3987761 的廠牌鏈第一格逐字 `EMI`**、第二格才是 `Blue Note` | **日本零售盤 6474752 的第一格逐字 `Blue Note`（TOCJ-66099）** ＋ MB label-info 逐字 `Blue Note [713c4a95]` | **過** |
| **Trio Focan《standard a'la Turc》** | **Discogs 14930583 的廠牌鏈第一格逐字 `EMI`**、第二格 `Blue Note`（第三格起是 `EMI-Kent Elektronik San. Ve Tic. A.Ş.`＝土耳其製造商） | MB label-info 逐字 `Blue Note [713c4a95]` ＋ 簡報 2026-09-18 附錄逐字查實「2000 年後的歐洲分支查到的全是正規發行」 | **過** |
| **Brisa Roché《The Chase》** | **美版廠牌鏈第一格 `Metro Blue`**；Apple ℗ 第一格 `Capitol Music` | **法版零售條目 1285705 的第一格逐字 `Blue Note`**；美版 MB release label-info 逐字 `Blue Note [713c4a95]`；**`Metro Blue` 是 Blue Note 自家副廠牌，不是第 1631 條點名的部門名，也不是附錄點名的兩個非家族廠牌** | **過** |
| ⚠ **Kitty Hoff & Forêt-Noire《Zuhause》** | **Discogs 5688942 的廠牌鏈第一格逐字 `Blue Note Germany`——不是裸的 `Blue Note`** | **這是 Blue Note 的德國分支標記，與本組芬蘭／義大利分支的 `Oy EMI Finland Ab`／`EMI Music Italy` 同形**；barcode `5099969662324` 屬 EMI 的 `50999` 段，**不是 `Blue Note Digital` 的 `810211` 段**，也沒有 `Blue Note Compagnie` 的 `BNS-` 目錄號；MB label-info 逐字 `Blue Note [713c4a95]` | **過** |
| **Juliano Rossi《Free Runner》** | Apple ℗ 第一格 `Oliver Perau` | Discogs 8203661 廠牌欄逐字單一 `Blue Note`；MB label-info 逐字 `Blue Note [713c4a95]` | **過** |

⚠ ⚠ **新立一句（本組第一次遇到，後批照抄）**：**「廠牌鏈第一格是 `Blue Note <國名>`（如 `Blue Note Germany`）的，屬正規 imprint 的國別分支標記，過閘。」**
**與第 1631 條那個要退的形狀的分界**：`Blue Note Label Group [2eb19785]` 是 **EMI 2006 年起的部門名**（一個實體，涵蓋 Manhattan／Narada／Angel），**`Blue Note Germany` 則是同一個 imprint 的地區標記**——**判準是看 barcode 段與 MB 的 label id，不是看名字長短。**

⚠ **`Blue Note Label Group [2eb19785]` 在本組出現 1 次**：**`Dr. John《Sippiana Hericane》` 的美版 `355972fb`（catno `45687`）**——第 1560-AE 條已逐項查過並判「收」，**本層是以 EP 形態退掉它，與 imprint 無關**（第 2127 條）。

---

## 第 2135 條（a 組，**⚠ MB 的缺口**）：**只建了一個版本／欄位整格空的，本組 5 筆**

**第 642 條要求「MB 取不到某欄位時，先換一種端點組合再說 MB 沒有」——五筆都換過 `release?release-group=<id>&inc=media+labels+recordings+artist-credits&limit=100`，仍然缺。這是 MB 真的缺，不是沒問到。**

| 卡 | MB 的缺口 | 補法 |
|---|---|---|
| **`Alice Ricciardi《Comes Love》`** | **只建了日版 `3e48ed76`（TOCJ-66445，country 欄空）；義版原盤 `50999-512842-2-0` 完全沒有** | Discogs 5973930／38237157（零售）／31184011（宣傳），已寫進卡的 `label` |
| **`High Five Quintet《Five for Fun》`** | **只建了日版 `5a296e60`（TOCJ-66462）；義版 `50999-227843-2-2` 完全沒有** | Discogs 16217874，已寫進卡的 `label`。⚠ **「首發地是義大利還是日本」本層無法定案**（兩版同為 2008，`year` 不受影響），研究層若拿到義版精確日要回填 |
| **`Joona Toivanen Trio《Frost》`** | **`catalog-number` 欄填的是 barcode `094635209921`**，真正的目錄號 `0946 3 52099 2 1` 只有 Discogs 有 | Discogs 1024748 |
| **`Juliano Rossi《Free Runner》`** | **`catalog-number` 欄整格空**，且**13 軌的 `length` 全部為空**（算出來總長 0 分） | Discogs 8203661。⚠ **那個 0 分是 MB 缺資料，不是碟很短——判 EP 與否不得用它** |
| **`Kitty Hoff & Forêt-Noire《Zuhause》`** | **`catalog-number` 欄整格空** | Discogs 5688942 |

⚠ **另記**：**本組 20 張裡有 6 張的 release-group 端 `genres` 與 `tags` 都是空陣列**（Supergenerous／Trio Focan／Anna-Mari Kähärän Orkesteri／Joona Toivanen Trio／High Five Quintet／Kitty Hoff & Forêt-Noire）——**這正是第 1557 條講的那批「RG 端也空、藝人端更空」的碟**。曲風一律改讀 Discogs 的 `genres`／`styles` 欄。

---

## 第 2136 條（a 組，**⚠ 給下游**）：**同一張碟在不同版本之間軌數不同的，本組 7 筆——正文不得把 bonus 寫成原盤曲目**

| 卡 | 軌數分歧 | 差異來源（已逐軌比對） |
|---|---|---|
| **Thierry Lang《Guide Me Home》** | MB 9＋4＝13／Discogs 15 | MB 是雙碟（正盤 9 ＋ Freddie Mercury 紀錄片配樂 4）；**Discogs 那 15 軌的差額未核** |
| ⚠ ⚠ **Brisa Roché《The Chase》** | **法版 18／美版 17／另一法版 18（53 分）／數位 21** | **美版拿掉三段〈Intermission〉、把隱藏軌〈Ride 600〉排成第 12 軌；數位版多出〈Du bout des yeux〉與〈Summer surprise〉。本卡釘 2005 法版 `bd10e348`** |
| **Θάνος Μικρούτσικος《Music Stories》** | 一致 9 軌 | — |
| **Alice Ricciardi《Comes Love》** | 義版 13／MB 日版 14／Discogs 日版 15／Apple 14 | 日版 OBI 帶版本的 bonus |
| **High Five Quintet《Five for Fun》** | Discogs 義版 10／MB 日版 12／Discogs 日版 13 | 日版 bonus |
| **Juliano Rossi《Free Runner》** | MB 13／Discogs 13／**Apple 15** | **多出的兩軌來源未核** |
| **Scolohofo《Oh!》** | CD 11／Tone Poet 雙黑膠 5＋6＝11 | 同軌目，只是分面 |

---

## 第 2137 條（a 組）：**第 1250 條在本組應驗三種形狀——「目錄號＋廠牌」以外的任何反查都不可信**

1. **裸數字**：`Supergenerous` 的列舉檔 `catno` 只留 `24633`，反查撞 Giant Records 的 Big Mountain《Resistance》（slice 的 `note` 已先標）。本卡以 `Blue Note ＋ 7243 5 24633 2 9` 為準。
2. **catno 欄填的是 barcode**：`Joona Toivanen Trio《Frost》`（MB 填 `094635209921`）、`Juliano Rossi《Free Runner》`（Discogs 填 `5099969316623`）。
3. **catno 欄整格空**：`Juliano Rossi`、`Kitty Hoff & Forêt-Noire`（MB 側）。
4. ⚠ **空格切法不同不等於兩張碟**：`U-Street All Stars《Helsinki Sessions》` 列舉檔 `7243 5 40052 2 0` vs Discogs `7243 540052 2 0`——同一組數字。

**盤名反查的假陽性本組同樣高**：`Bowling`、`Five for Fun`、`Comes Love`、`Frost`、`Thinking`、`Zuhause`、`The Chase` 七個盤名在 Apple 或池中都撞到別碟，**逐筆核完真的同碟 0 筆**。

---

## 第 2138 條（a 組）：**三種店面查法的觀察（只寫觀察不下結論——第 254 條）**

| | 張 |
|---|---:|
| **Apple 至少一個市場命中本盤** | **17 / 20** |
| ⚠ **Apple 三種查法（盤名＋掛名／掛名目錄／盤名單查）在所有試過的市場全部查無** | **3**：Thierry Lang《Guide Me Home》（ch／fr／jp 三店）、Anna-Mari Kähärän Orkesteri 同名盤（fi／us 兩店）、High Five Quintet《Five for Fun》（it／jp／us 三店） |
| **CAA release-group 層有圖** | **10 / 20**：Booster 2、Trio Focan **8**、Scolohofo 2、Music Stories 1、Jackie Allen 1、Brisa Roché 1、Kosmopolites 3、Frost 1、Thinking 3、Musica Nuda 1 |
| **CAA 404（0 圖）** | **10 / 20**：Supergenerous／Thierry Lang／U-Street ×2／Anna-Mari／Alice Ricciardi／Franco D’Andrea／High Five／Juliano Rossi／Kitty Hoff |

⚠ **這一段的店面命中率遠低於簡報第三節的預期（「現役目錄，命中率應該很高」）**——**原因是本批幾乎全是 Blue Note 各國分支的本地出品**（芬蘭 4、義大利 4、德國 2、法國 2、瑞士 1、土耳其 1、希臘 1，美國本部只有 Supergenerous 與 Scolohofo 兩張），**不是美國本部目錄**。給後批：**c-169／c-170 這兩個補批的店面與 CAA 覆蓋率要照「歐洲分支」而不是「Blue Note 正廠」來預期。**

⚠ **第 254 條那個坑本組踩到三次**：
1. **盤名搜尋落空、換掛名才中**——`Paolo Fresu 5et Plays the music of…` 在三店全部落空，改用 `Paolo Fresu Kosmopolites` 才命中。
2. **同一市場兩個條目指向兩個軌數**——`Brisa Roché《The Chase》` 的 Apple us 有 693750621（21 軌）與 843420174（19 軌）。
3. ⚠ **CAA 的圖不是原壓的圖**——`Brisa Roché` 的 CAA 來源 release 逐字是 `df737ff0`（XW 數位版）、`Jackie Allen` 的是 `5d797c5e`（英版），**研究層看版式時要先確認來源 release**。

⚠ **店面上的同名不同碟，本組列進「絕對不得採用」的有 6 筆**：`Kevin Breit & Supergenerous —《São Paulo Slim》`(2008)、`Jalen Johnson —《Super Generous - EP》`(2026)、`Ronald Baker Quintet —《Five for Fun》`(2004 Cristal)、`Joona Toivanen Trio —《Gravity》`(2025 We Jazz)、`High Five —《Live For Fun》`(2009 TOCJ-66496)、`Paolo Fresu —《LAMPONE (feat. Roberto Cipelli, Ettore Fioravanti…)》`(2024 單曲)。

---

## 第 2139 條（a 組）：**現場盤 1 張、四層一致——第 1771 條那三種毛病本組一次都沒中**

| 碟 | MB `secondary-types` | slice `live` | Apple 盤名 | Discogs |
|---|---|---|---|---|
| **Franco D’Andrea Quartet《The Siena Concert》** | **`["Live"]`** | **true** | **`The Siena Concert (Live)`**（fr 713545183） | notes 逐字 `The concert was recorded live on July 26t…` |

**`releaseType` 照 MB 原值寫 `Album`（第 1797 條先例），現場身分寫在 `risk` 與 `queryAlias`。**

⚠ **另外 19 張的 `secondary-types` 逐字都是空陣列。** 兩張 notes 帶 `live` 字樣但**不是現場**，已逐筆查明並寫進卡：
- **`Scolohofo《Oh!》`**——`Recorded live to two-track` 指直錄兩軌母帶，地點 Sear Sound 是錄音室。
- **`Trio Focan《standard a'la Turc》`**——`Recorded live and mixed` 指在錄音室一次過收音，地點逐字 `the Master Recording Oy in Helsinki`。

**→ 第 1771 條第 1 點（是現場卻沒標）本組 0 張；第 3 點（盤名帶 Live 卻不是現場）0 張；但「notes 帶 live 卻不是現場」出現 2 次——這是第 1771 條沒寫過的第四種形狀，記下給後批。**

---

## 第 2140 條（a 組）：**曲風——`['jazz']` 13 張、兩層 7 張；邊界張 3 張全部照收，因曲風退件 0**

- **第 1559 條在 c169 點名的五張邊界張，落在 a 組的有 3 張**：`Jackie Allen《Tangled》`（人聲爵士唱 folk-rock 曲目）、`Anna-Mari Kähärän Orkesteri` 同名盤（爵士×北歐民謠）、`Kitty Hoff & Forêt-Noire《Zuhause》`（德語 chanson-jazz）。**三張全部照收，本層沒有拿曲風退任何一張**（另兩張 `Emma Salokoski & UMO`、`Sunaga t Experience` 在 b 組）。
- **兩層 6 張**：`Booster`＝`['jazz','electronic']`／`Θάνος Μικρούτσικος`＝`['jazz','classical']`／`Jackie Allen`＝`['jazz','folk']`／`Anna-Mari Kähärän Orkesteri`＝`['jazz','folk']`／`Brisa Roché`＝`['jazz','rock']`／`Musica Nuda`＝`['jazz','pop']`／`Kitty Hoff & Forêt-Noire`＝`['jazz','pop']`（共 7 張，其餘 13 張 `['jazz']`）。
- ⚠ **6 張的 MB RG 端 `genres`／`tags` 都是空的**（第 2135 條末段），曲風改讀 Discogs 的 `genres`／`styles`。
- ⚠ **本組沒有任何一張不含 `jazz`。**

---

## 第 2141 條（a 組，**合輯風險逐張核；判為合輯 0，(丁) 1**）

簡報第一節第 2 點要求「盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的一律細看，判準只讀逐張文案與軌目來源，不讀標題、不看尾碼」。**本組 20 張沒有任何一張的盤名帶那些字眼**，但有兩張的**形狀**觸發了合輯判定，逐筆核完：

### （一）`Booster《Loop in Release》`——**Apple 把掛名登成 `Multi-interprètes`（Various Artists），不是合輯**
- **Apple fr 693636945 的 `artistName` 逐字 `Multi-interprètes`。**
- 核完：**Discogs 718356 的 `artists` 欄逐字單一 `Booster`、`format` 逐字 `CD, Album`（無 `Compilation`／`Reissue`）、notes 逐字寫明整張由 Booster 一人在自宅與 Studio Tex Avril 錄音與混音**；**MB primary-type `Album`、secondary-types 空陣列**。
- **判：不是合輯。** Apple 的 Various 標記是客座人聲多所致的店面 metadata 誤登。
- ⚠ ⚠ **新立一句**：**第 782 條講的是「Discogs 的 `format` 欄會錯」，第 397 條講的是「MB 的 `secondary-types` 兩個方向都會漏」——本例是第三種：Apple 把單一製作人的碟登成 Various Artists。給後批：Apple 的 `artistName` 欄不可拿來判合輯。**

### （二）`Θάνος Μικρούτσικος《Music Stories》`——**9 軌裡 3 軌是 1985 年的舊錄音，仍判 Album（(丁)）**
- **Discogs 3264997 的 notes 逐字**：`Tracks 1 to 6 recorded at the Friend's of Music Hall on November 2nd and 3rd 2001` ／ **`Tracks 7 to 9 recorded at the "Action" studio in 1985`**。
- 7–9 軌是〈Duo: Moderato／Largo／Presto〉，credits 欄的對應演出者是 `David Lynch (3)=Alto Saxophone` 與 `Giorgos Fakanas=Electric Bass`；**jazzlibrary.gr 的他個人目錄列有一張 1986 年《Duo For Alto Saxophone And Electric Bass / Opera for One》**——**這三軌很可能是那張希臘盤的再收錄。**
- **判：收，`releaseType` 判 `Album` 不判 `Compilation`。** 理由：**主體六軌（36 分／53 分）是 2001 年的新錄音、2003 年首發**；MB primary-type `Album`、secondary-types 空陣列；**Discogs `format` 逐字 `CD, Album`，無 `Compilation`／`Reissue`**。**形狀屬 (丁)「部分重疊／形狀不同 → 收」**（第 1796 條）。
- ⚠ **與第 1412 條退掉的《Live at the Lighthouse》的分界**：那張是「**整張 1967 年 LP** ＋ 八軌 bonus」（主體是舊的），本張是「**主體是 2001 年新錄音** ＋ 三軌舊作」（主體是新的）。
- ⚠ **研究層必做**：核 1986 那張《Duo For Alto Saxophone And Electric Bass》是否同一份錄音。**正文不得把 7–9 軌寫成 2001 年錄的。**

⚠ **`Scolohofo《Oh!》` 的 2023 Tone Poet 雙黑膠（RG 內的 `01cdc37a`／Discogs 25705846，series 欄逐字 `Blue Note Tone Poet Series`、format 帶 `Reissue`）是再發、不是另一張碟**——軌目與 2003 CD 完全相同，本卡釘 2003 原盤，Tone Poet 只寫進 `label` 與 `risk`。

---

## 第 2142 條（a 組）：**`chk-prop` 與 `dedup-crossbatch` 的結果**

- **`node batch-progress/c169/chk-prop.mjs a`：`prop-a.json`：20 張、18 位｜標記 0。**
- **第五道（盤名逐字撞 apex、掛名不同，只報不擋）：0 處。** ⚠ 逐筆人工複掃過——本組 20 個盤名（Supergenerous／Guide Me Home／Loop in Release／standard a'la Turc／Helsinki Sessions／Oh!／Music Stories／Tangled／Bowling／Anna-Mari Kähärän Orkesteri／The Chase／Kosmopolites／Frost／Thinking／Comes Love／The Siena Concert／Five for Fun／55/21／Free Runner／Zuhause）**沒有一個逐字撞到 apex 王牌的盤名**。
- **`node batch-progress/dedup-crossbatch.mjs c169`：1 批（讀 prop）｜卡數 30｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0。**（執行時 b 組已寫入 10 張。）
- **全域 `dedup-crossbatch`（chk-prop 串跑）：132 批｜卡數 5287｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0。**
- ⚠ **第 611 條：標記 0 不等於沒撞卡。** 五種盲區逐一人工掃過：**群組掛名 vs 個人掛名**（Scolohofo 的四位成員、Trio Focan 的 Önder Focan、Musica Nuda 的 Magoni／Spinetti、Paolo Fresu 的三個編制字串、Supergenerous 的 Breit／Baptista——**全部查過，沒有一張是同碟**）；**同名但不同盤的 Volume 碟**（0 筆）；**MB 把同一張碟建成兩個 RG**（0 筆，20 個 rgMbid 互不重複且與其他批不重複）；**斜線掛名**（`Θάνος Μικρούτσικος` 在 Discogs 是斜線並列形，池中那張 1979 年碟是單掛名——**不同碟**）；**同名但不同盤**（第 2137 條末段的七個盤名，逐筆核完真的同碟 0 筆）。

---

## 第 2143 條（a 組）：**第 315 條結算**

**`prop-a.json` 20 筆 ＋ 本段退表 1 筆 ＝ 21 ＝ `slice.json` 的 `g === "a"` 筆數。✔**

### 退表（逐筆、附理由分類）

| # | 卡 | 理由分類 | 條 |
|---|---|---|---|
| 1 | **Dr. John and the Lower 911《Sippiana Hericane》2005**（RG `46d6e500`） | **非 Album 形態（EP，7 軌 25 分／Discogs `format` 逐字 `CD, EP`），未落在 §5.5 白名單** | **第 2127 條** |

**因撞池退 0、判為合輯退 0、原盤他廠改判退 0、非 Blue Note imprint 退 0、曲風退 0。**

---

## 第 2144 條（a 組，**⚠ 派工信與原文／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與原文牴觸，以原文為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到一句**：

> **派工信第三節第 3 點：「`Paolo Fresu 5et Plays the music of Roberto Cipelli《Kosmopolites》2005` 與 `…Plays the music of Ettore Fioravanti《Thinking》2006`——MB 把「Plays the music of X」寫進了 artist credit。**掛名取 MB credited-name 串接那一種**（第 1539 條原文，不是「取 `&`」）。」

**這一句有兩處錯**：

1. **它把第 1539 條的適用範圍寫寬了。** 第 1539 條（`c158/rulings.md`）原文處理的是**並列聯名的連接形**；**本例的第二格是作曲者兼團員、joinphrase 是一句盤名片語**，不是並列聯名，前提不成立。**第 1745-B 條更正後的判準句逐字是「並列聯名的連接形，取 MB `credited-name` 與 joinphrase 串接出來的那一種」——「並列聯名」四個字是條件。**
2. ⚠ ⚠ **它與 c-160 b 已建卡單的先例直接牴觸。** **`Paolo Fresu Quintet《Rosso, verde, giallo e blu》`（RG `48da0c29`，c-160 b／`c160-cards.json` 已有）是完全同形的一筆**（同一個 MB 實體 `8799705f`、同一個 credited-name `Paolo Fresu 5et`、同一個 joinphrase ` Plays the music of `），**c-160 b 判的是 `Paolo Fresu Quintet`**。照派工信執行會**在同一位藝人的同一個編制上造出兩種字串**——正是第 1418 條點名的那種分裂。

**→ 本棒照原文與先例判 `Paolo Fresu Quintet`（第 2129 條）。**

⚠ **另記兩句不算牴觸、但與實況有出入的**：
- 派工信第三節第 4 點說 U-Street 等芬蘭／歐洲分支「不要因為是歐洲分支就排除」——**正確，本棒一張都沒有因此退**；但**簡報第三節「這一段店面命中率應該很高」在本批不成立**（20 張裡 6 張 Apple 三種查法全部查無、10 張 CAA 404），原因見第 2138 條。
- 派工信第三節第 5 點說希臘文掛名要「卡池掃描兩種字形都掃」——**已照做**（第 2131 條）；但它沒提到 **Discogs／Apple 把 Gary Burton 並列進掛名**這件事，那才是這張真正的掛名爭點。

---

# c-169 a 組・**主線 2026-09-19 中途補充（三條）的處理結果**　第 2145–2149 條

主線在 a 組交件後補來三條（源自 c-168 策展交件），逐條處理如下。

## 第 2145 條（a 組）：**三條補充的落點總表**

| 主線補充 | 本組受影響 | 處置 |
|---|---|---|
| **① 派工信第三節第 2 點引第 307 條時寫窄了；第 964／196／197 條明文要求「個人字串與群組字串並存、不收攏」，照 MB RG credit 原樣寫** | **`Musica Nuda`、`U-Street All Stars` ×2：無影響**（本層寫的**就是** MB RG credit 原樣）。**兩張 Paolo Fresu：需要覆核** | **維持 `Paolo Fresu Quintet`，理由見第 2148 條**；`Musica Nuda`／`U-Street All Stars` 不動 |
| **② slice 的 `note` 寫「僅 XX 盤」一律不可信** | **中 2 筆**（Alice Ricciardi、High Five Quintet，`note` 逐字都寫「僅 JP 盤」） | **兩筆都查實是錯的，已寫進卡的 `risk`**；見第 2147 條 |
| **③「MB 只有一筆 release」與「這張碟只發過一次」在回傳裡長得一樣，年份定案前把 Discogs 原壓群掃過** | **中 1 筆年份改判 ＋ 5 筆版本補正** | **Scolohofo《Oh!》2003 → 2002**（第 2146 條）；版本補正見第 2149 條 |

**→ 三條全部照辦。②③ 直接改到卡上，①覆核後維持原判並把反轉路徑交給主線。**

---

## 第 2146 條（a 組，**年份第三筆改判；主線補充③ 命中**）：**`Scolohofo《Oh!》` 2003 → 2002——日本 TOCJ-66204 是零售先發**

**MB 轄下只有三個 release：2003 US `a0fba138`／2003-01-30 DE `b7ae9977`／2023 Tone Poet `01cdc37a`。日版整個沒建。**
照主線補充③ 回頭掃 Discogs 全 release 群，抓到：

| | 逐字 |
|---|---|
| **Discogs 15672011** | **`Blue Note TOCJ-66204`，country `Japan`，`released` 欄逐字 `2002-12-26`，format 逐字 `CD, Album`（零售），barcode `4988006807631`，11 軌（與美版相同）** |
| **Discogs 24174836** | 同號**宣傳**變體（format 逐字 `CD, Album, Promo`，`SAMPLE NOT FOR SALE`）——**依第 1505 條不當依據，但它與零售版同日、互相佐證** |
| **兩筆的 notes 都逐字寫** | **`Advance release in Japan (stated on obi)`** |

**依 c-131 簡報第三節第 3 點「`year` 取全球首發」，判 2002。**

- ⚠ **盤面 ℗© 逐字 2002**，剛好等於正解——**但那是錄音年，不是依據**（第 550／570／708 條）。依據是日版的 `released` 欄。
- ⚠ **Apple us 1454547323 的 copyright 逐字 `℗ 2003 Capitol Records, LLC`**——那是美版年，**不推翻日版首發**。
- ⚠ **另附帶查到一筆歐版宣傳盤**（catno `CD 7243 5 42081 2 6V`，2002 Europe）——**宣傳盤，不當首發依據**（第 1505 條）。
- ⚠ **日版盤面把團名同時印成小寫 `scolohofo` 與 `ScoLoHoFo`**（Discogs notes 逐字）——**掛名仍取 MB／Discogs 六筆／Apple 兩店一致的 `Scolohofo`**，另兩形進 `queryAlias`。
- **可逆**（只動 `year`）。

⚠ **這一筆如果沒有主線補充③ 就會漏掉**：本層原本的 Discogs 查法是「先用 MB 的 barcode 反查、查不到才用盤名」——**日版的 barcode（`4988006807631`）與美歐版（`724354208126`）不同，MB 又沒建日版，於是 barcode 反查永遠碰不到它**。**給後批：barcode 反查不足以當「Discogs 原壓群掃過」，必須另跑一次 `artist + release_title` 的全 release 掃描。**

---

## 第 2147 條（a 組，**主線補充② 命中 2 筆，兩筆都錯**）：**slice 的「僅 JP 盤」在本組是 0／2 正確**

| slice 筆 | `note` 逐字 | 實況 |
|---|---|---|
| **Alice Ricciardi《Comes Love》** | **「僅 JP 盤」** | ❌ **錯。義大利版 `50999-512842-2-0` 才是原盤**（Discogs 5973930／38237157 零售、31184011 宣傳 `50999-512842-2-9`，barcode 5099951284220）。日版 TOCJ-66445 是同年（2008-05-14）的另一版 |
| **High Five Quintet《Five for Fun》** | **「僅 JP 盤」不是排除理由** | ❌ **前半句錯。義大利版 `50999-227843-2-2` 存在**（Discogs 16217874，barcode 5099922784322，廠牌鏈逐字 `Blue Note` ＋ `EMI Music Italy S.r.l.`）。後半句（不是排除理由）成立 |

**兩筆的 `year` 都不受影響（義日同為 2008）**，但**「僅 JP 盤」這個敘述已寫進兩張卡的 `risk` 標明是錯的**，避免研究層照抄。

⚠ **根因與 c-168 第 2088 條完全相同**：**slice 的 `note` 是從 MB 的 release 清單寫出來的，而 MB 只建了日版。**「MB 只建了一筆」與「只發過一版」回報的是同一個值——**第 1557 條那一族的第三種形狀（前兩種是曲風讀錯層、`unknown` 與「沒問」同形）。**

**→ 給後批：`slice.json` 的 `note` 只要出現「僅 XX 盤」「只有 XX 版」「MB 只有一筆」，一律當成未經查證，回 Discogs 跑一次全 release 掃描再判。**

---

## 第 2148 條（a 組，**主線補充① 覆核後維持原判；把反轉路徑交給主線**）：**兩張 Paolo Fresu 仍判 `Paolo Fresu Quintet`**

**已讀原文（c-149 第 964 條、c-150 第 196／197 條、c-168 第 2078／2098 條）。** 964 原文的兩句規矩是：

> ①「`Ralph Peterson Trio` 的 type 是 `null`……**不收攏成 `Ralph Peterson`**（那是他個人字串）」
> ②「`Bobby Watson & Horizon` 被建成單一 artist 實體、type 標 `Person`……**照 MB credit 字串原樣用**（第 307 條：不自行拆、不自行合併）」
> 另附「同一個 RG 內部 credit 不一致」表：**取 RG 層，release 層的變體進 `queryAlias`**。

### ⚠ 本層的判定**沒有**違反這兩句

**`Paolo Fresu Quintet` 就是 MB 群組實體 `8799705f` 的實體名——它是群組字串，不是個人字串。**
本層**沒有**把它收攏成個人字串 `Paolo Fresu`（`c7301466`），也**沒有**動池中另外兩個群組字串（`Paolo Fresu & Uri Caine`、`Paolo Fresu Devil Quartet`）。
**964 要防的「群組 → 個人」收攏，本組 0 次。** 主線補充① 的**理由**在本卡不成立，只有**字面**（「照 MB RG credit 原樣寫」）指向另一個結果。

### 維持原判的決定性事實：**c-160 b 的卡單已經建好了**

`desc-tools/batches/cards/c160-cards.json` 內**逐字**有：
**`{"artist":"Paolo Fresu Quintet","album":"Rosso, verde, giallo e blu","year":2007}`**
——而那張的 MB RG（`48da0c29`）**credit 形狀與本組兩張一模一樣**：同一個實體 `8799705f`、同一個 credited-name `Paolo Fresu 5et`、同一個 joinphrase ` Plays the music of `。

**若本組改寫成 MB 串接形，同一個 MB 實體 `8799705f` 在池中就會有三個字串**：
`Paolo Fresu Quintet`（c-160，**卡單已建**）／`Paolo Fresu 5et Plays the music of Roberto Cipelli`（c-169）／`Paolo Fresu 5et Plays the music of Ettore Fioravanti`（c-169）。
**這不是 964 講的「個人與群組並存」（那是兩個不同的 MB 實體），而是同一個實體的三種寫法——正是第 1418 條點名的分裂。**

另兩項佐證未變：**Discogs 五筆的 `artists` 欄逐字 `Paolo Fresu Quintet`、`anv` 逐字 `Paolo Fresu 5et`，「Plays The Music Of X」印在 `title` 欄**；**Apple 三店逐字裸名 `Paolo Fresu`**。

### **→ 交給主線的一鍵反轉（可逆、成本已算好）**

**若主線仍要照 MB RG credit 原樣寫，本層不反對——但那是三張卡一起改，不是兩張：**

| 檔 | 要改的欄 | 改成 |
|---|---|---|
| `batch-progress/c169/prop-a.json` | 《Kosmopolites》的 `artist` | `Paolo Fresu 5et Plays the music of Roberto Cipelli` |
| `batch-progress/c169/prop-a.json` | 《Thinking》的 `artist` | `Paolo Fresu 5et Plays the music of Ettore Fioravanti` |
| ⚠ **`desc-tools/batches/cards/c160-cards.json`**（**已建卡單**） | 《Rosso, verde, giallo e blu》的 `artist` | `Paolo Fresu 5et Plays the music of Paolo Fresu` |
| 連帶 | `batch-progress/c160/prop-b.json` 同一筆 | 同上 |

**三張一起改才不分裂；只改本組兩張會更糟。** 本層選擇維持 `Paolo Fresu Quintet`，**因為那是「不動已建卡單、且池中只有一個字串」的那一邊**，也是第一條判準（有先例照先例）指的方向。**兩邊都只動掛名欄，卡池結構不受影響。**

⚠ **`Musica Nuda`（第 2130 條）與 `U-Street All Stars`（兩張）不受本條影響**——**那兩個字串本來就是 MB RG credit 原樣**（MB 的 artist-credit 就是單一群組實體、沒有 joinphrase），**與主線補充① 完全一致，不需要改。**

---

## 第 2149 條（a 組，**主線補充③ 的副產品**）：**補跑全 release 掃描後新增的版本，5 筆——年份都不變，但要寫進 `label`**

barcode 反查掃不到的版本，用 `artist + release_title` 全掃補上：

| 卡 | 補到的版本 | 影響 |
|---|---|---|
| **Scolohofo《Oh!》** | **2002-12-26 JP `TOCJ-66204`（零售＋宣傳）** ＋ 2002 歐版宣傳 `CD 7243 5 42081 2 6V` | **年份改判 2002**（第 2146 條） |
| **Booster《Loop in Release》** | **2001 US 黑膠 Blue Note `531576 1`** ＋ 2001 法版無編號宣傳 CDr | 年份不變；`label` 已補 |
| **Musica Nuda《55/21》** | **2008 法版黑膠 `50999 21373 1 0`（Bonsaï ＋ Blue Note）** ＋ 2008 宣傳 CD `509992274822 5` ＋ 2010 法版 Bonsaï 單掛再發 `BON100101` ＋ 2008 歐版 Edel `0212254MGO` | 年份不變；⚠ **後兩者的廠牌鏈都沒有 Blue Note，不當依據** |
| **U-Street All Stars《Helsinki Sessions》** | **2020 芬蘭黑膠再發 `LIPPOLEVY 068`**（format 逐字 `Reissue`／`Limited Edition`／`Numbered`） ＋ 一筆 2002 US 同目錄號條目 | 年份不變；**再發，不另立卡** |
| **Brisa Roché《The Chase》** | 2005 法版宣傳 `094633572126` ＋ **2005 法版 `NV807171`（Capitol Records ＋ Naïve）** ＋ 美版俱樂部再壓（Metro Blue ＋ EMI France，年份欄空） | 年份不變；⚠ **`NV807171` 的廠牌鏈第一格不是 Blue Note，是另一條流通線，不當依據** |

⚠ **另兩筆值得記的**：`Supergenerous` 有 2000 俄版非官方盤（`G. & P. Essential Music`，format 逐字 `Unofficial Release`）、`Thierry Lang` 有 2000 俄版非官方盤（`PN-242`）——**兩者 format 都逐字帶 `Unofficial Release`，一律不當任何一層的依據。**

⚠ ⚠ **方法論（新立，後批照抄）**：**「掃過 Discogs 原壓群」不等於「用 MB 的 barcode 反查過」。**
**日本／歐洲／俱樂部版的 barcode 與美版不同，MB 又常常只建其中一個地區**——**barcode 反查在這種情形下永遠碰不到首發那一版**。
**至少要跑兩種查法：① `barcode=<MB 每一筆的 barcode>`；② `artist=<掛名>&release_title=<盤名>&per_page=50`。** 本組跑了②之後，20 張裡有 **1 張改年份、5 張補版本**。

---

# c-169 **b 組（20 張，2009–2019）** 裁定　2026-09-19

*（編號 2186–2245 為 b 組專用區間；a 組用 2126–2185。本段以 append 寫入，未動前面第 1557–1560-AE 條與 a 組的第 2126–2144 條。）*

## 第 2186 條（b 組，**總表**）：**20 張＝收 20 ／ 退 0**

| | 張 |
|---|---:|
| **`prop-b.json` 收件** | **20** |
| **退件** | **0** |
| **合計** | **20** ✔（第 315 條結算通過，見第 2207 條） |

**收件 20 張逐筆**（依 `prop-b.json` 順序）：
The Blue Note 7《Mosaic: A Celebration Of Blue Note Records》**2008**（年份改判，見第 2196 條）／Ruben Hein《Loose Fit》2010／Emma Salokoski & UMO《Rytmihyrrä / Rytmyra》2011／Musica Nuda《Complici》2011／**Erik Truffaz Quartet**《El tiempo de la revolución》2012／The Northern Governors《This Is the Northern Governors》2012／Jon Cowherd《Mercy》2013／Musica Nuda《Banda larga》2013／Otis Brown III《The Thought of You》2014／Kendrick Scott Oracle《We Are the Drum》2015／Sunaga t Experience《STE》2015／Logan Richardson《Shift》**2015**（年份改判，見第 2196 條）／Aron Ottignon《Team Aquatic》2017／**Blue Note All-Stars**《Our Point of View》2017／Chris Dave and The Drumhedz《Chris Dave and The Drumhedz》2018／**Kenny Barron Quintet**《Concentric Circles》2018／R+R=NOW《Collagically Speaking》2018／**The Charles Lloyd New Quartet**《Passin' Thru》**2017**（年份改判，見第 2196 條）／Sarah McCoy《Blood Siren》2019／The James Carter Organ Trio《Live From Newport Jazz》2019。

**20 張、19 個掛名字串**（`Musica Nuda` 兩張）。**因撞池退 0、判為合輯退 0、非 Blue Note imprint 退 0、EP 退 0、曲風退 0。**

---

## 第 2187 條（b 組，**本批最需要細判的一張；裁定**）：**`The Blue Note 7《Mosaic: A Celebration Of Blue Note Records》` 不是合輯，收成 `Album`——但同一張碟的 2 CD 版在 MB 是另一個 RG，而那個 RG 掛 `Compilation` 是對的**

派工信第三節第 1 點要求「合輯條款（第 397／613／782 條）判準只讀逐張文案與軌目來源，不讀標題，逐軌核完再定」。**逐軌核完的結果如下。**

### （一）釘住的 RG：八軌全是 2008 年的新錄音

| 逐軌回問 MB `recording` 端點 | 結果 |
|---|---|
| `8c9c925b`〈Mosaic〉 | `artist-credit` 逐字 **`The Blue Note 7`**、`first-release-date` 逐字 **`2009-01-12`** |
| `e6e39798`〈Idle Moments〉 | 同上 |
| `dd0bf2de`〈Criss Cross〉 | 同上 |
| 其餘五軌（`2cc3aa7a`／`fae7c884`／`1d785531`／`1f7b2e4f`／`12c258d2`） | 同形，**八軌都只出現在本盤與下述 2 CD 版上** |

**釘住的 RG `7edc4d0d` 轄下只有一筆 release（`e4480f14`，GB 2009-01-12，單 CD 8 軌），`secondary-types` 逐字空陣列。**
**Discogs 單 CD 條目 `3235910`（歐版）與 `10750267`（美版）的 `formats` descriptions 逐字只有 `Album`**，無 `Compilation`、無 `Reissue`。
維基 `Mosaic: A Celebration of Blue Note Records` 逐字：「The group recorded Mosaic in 2008, which was released in 2009 on Blue Note Records/EMI」「the group plays the music of Blue Note Records, with arrangements by members of the band and Renee Rosnes」。
bluenote.com 本盤頁逐字：「These are clearly reimagined tunes, faithful to the precepts of Blue Note」。

**→ 新錄音的翻奏盤，不是舊錄音集結。判 `Album`。**

### （二）⚠ ⚠ 但 MB 把同一張碟建成兩個 RG，而另一個真的該掛 `Compilation`

| | 本卡釘的 RG | 刻意不釘的 RG |
|---|---|---|
| MBID | **`7edc4d0d-d04e-36dc-a94b-0a4390c3c273`** | `770967e1-03cc-4fcf-8312-82d816049f45` |
| title | `Mosaic: A Celebration Of Blue Note Records` | `Mosaic: A Celebration of Blue Note Records`（**小寫 of**） |
| frd | `2009-01-12` | `2009-01-13` |
| secondary-types | **逐字空陣列** | **逐字 `["Compilation"]`** |
| 轄下 release | `e4480f14`（GB，單 CD 8 軌，catno `2281232`） | `c6eb2f30`（US，**2 CD**，barcode `5099926619422`，catno `50999 2 66194 2 2`） |

**`c6eb2f30` 的 medium 1 title 逐字 `Mosaic`（八首新錄音，recording MBID 與本卡完全相同）、medium 2 title 逐字 `The Original Sessions`（八首原版母帶）。**
逐軌回問 medium 2：`edfe8650`〈Mosaic〉credit 逐字 **`Art Blakey & The Jazz Messengers`**／frd 逐字 `1961-10-02`；`a742306c`〈Idle Moments〉逐字 **`Grant Green`**／frd `1964`；`8cf58584`〈Little B's Poem〉逐字 **`Bobby Hutcherson`**／frd `1965`。
**Discogs `4339923`（2 CD Special Edition）的 `format` 欄逐字 `CD, Album, CD, Compilation, All Media, Special Edition`——它自己就把兩片分開標了。**

**→ `Compilation` 標在 `770967e1` 上是對的、標在 `7edc4d0d` 上會是錯的。本卡釘單 CD 版，2 CD 那個 RG 在 `mbNote` 明寫「刻意不釘」。**

### （三）給下游的兩句

1. **封面、試聽、上架比對一律以 8 軌形為準**；**抓到 16 軌的就是 2 CD Special Edition，不是本卡。**
2. **正文不得寫成「收錄 Blue Note 經典錄音」**——那會把讀者導向 2 CD 版的第二片。要寫成「七人團重新錄製」。

⚠ **第 611 條盲區三（「MB 把同一張碟建成兩個 RG」）在本線的第一次應驗**；`chk-prop` 的 rgMbid 掃描不會亮（兩個 RG 只有一個在清單裡）。

---

## 第 2188 條（b 組，**掛名總表**）：**19 個字串；照 MB RG credit 原樣 19、收攏 0、新造分裂 0**

**規則照 c-168 第 2078 條**（本線 2026-09-19 的統一規則）：**掛名照 MB RG artist-credit 原樣寫；當 MB 的群組實體與池中既有的個人字串是兩個不同實體時，兩個字串並存，不收攏、不合併。**
上游是 **c-149 a 第 964 條**、**c-150 a 第 196／197 條**、**c-168 第 2080 條**，並與**同批 a 組第 2128／2129 條**同向。

| 掛名 | MB 實體 | 池中既有 | 處理 |
|---|---|---|---|
| `The Blue Note 7` | `6a8f2262` **Group**／US（life-span.begin `2008`） | 0 | 新字串；同字串反查無異人 |
| `Ruben Hein` | `347bd1f6` Person／NL | 0 | 新字串 |
| `Emma Salokoski & UMO` | `1d804fc5` Person／FI ＋ joinphrase ` & ` ＋ `dec63f48` **Orchestra**／FI | 0 | **依第 1539 條取 credited-name ＋ joinphrase 串接形**（真並列聯名，前提成立）；Apple 的 `Emma Salokoski & UMO Jazz Orchestra` 與 Discogs 的 `Emma Salokoski, Umo Jazz Orchestra` 只進 `queryAlias` |
| `Musica Nuda` | `b7840712` Group／IT | 0 | **照 a 組第 2130 條的跨組定案，一字不差**（見第 2192 條） |
| **`Erik Truffaz Quartet`** | `54da4dfb` **Group**／CH | **`Erik Truffaz` 34 列（12 張碟）** | **並存不收攏**（第 2193 條） |
| `The Northern Governors` | `136468a7` Group／FI | 0 | 新字串；定冠詞三邊一致 |
| `Jon Cowherd` | `2130c778` Person／US | 0 | 新字串 |
| `Otis Brown III` | `741eb270` Person | 0 | 新字串；⚠ **`Otis Brown` 裸名在 MB 另有 soul 歌手實體，日後進池要帶消歧** |
| `Kendrick Scott Oracle` | `71d3da26` **Group**／US | `Kendrick Scott, Reuben Rogers, Walter Smith III` 1 張（c-166 a） | **兩個不同掛名主體，不是分裂**（第 2191 條） |
| `Sunaga t Experience` | `6f9c7a65` Person | 0 | 新字串；**小寫 t 照 MB＝Apple**，Discogs 的大寫 T 進 `queryAlias`（第 2197 條） |
| `Logan Richardson` | `7208ea2f` Person／US | 0 | 新字串 |
| `Aron Ottignon` | `96bbc7f4` Person | 0 | 新字串 |
| **`Blue Note All-Stars`** | `a475738b` **Group**（disambiguation 逐字 `formed in 2014 for Blue Note's 75th anniversary, ft. Robert Glasper`） | 0 | **U+2010 正規化成 ASCII**（第 2189 條）；**與 c-168 的 `The Blue Note All Stars` 是兩團**（第 2190 條） |
| `Chris Dave and The Drumhedz` | `87e23315` **Group**／US | 0 | 新字串；**大寫 `The` 照 MB**，Discogs 的 `And The`、Apple 的 `and the` 進 `queryAlias` |
| **`Kenny Barron Quintet`** | `28d91e80` **Group** | **`Kenny Barron` 2 張（seed）** | **並存不收攏**（第 2194 條） |
| `R+R=NOW` | `88e39d68` **Group**／US | 0（c-170 slice 另有一張同掛名） | 新字串；Discogs 的 `R+R=Now`、Apple 的三名串接形進 `queryAlias` |
| **`The Charles Lloyd New Quartet`** | `c5c626e3` **Group** | **`Charles Lloyd` 22 列** | **並存不收攏；⚠ 與 c-146 判法相反**（第 2195 條） |
| `Sarah McCoy` | `1db39276` Person／US | 0 | 新字串；⚠ **常見人名，日後進池要帶消歧** |
| `The James Carter Organ Trio` | `9f82bfc6` **Group** | **`James Carter` 裸名 0 張** | 新字串；**池中沒有裸名，沒有分裂可避，照 MB RG credit**；⚠ MB 歐版 release 的 credit 少了定冠詞、Apple 只寫 `James Carter`，兩形進 `queryAlias` |

⚠ **`chk-prop` 的 `&`／`and` 盲區（第 611 條）已逐字串手查**：`Emma Salokoski and UMO`、`Chris Dave & The Drumhedz`、`Chris Dave and the Drumhedz`、`The Blue Note All Stars`、`Blue Note Allstars` 五種替代寫法在池中（seed ＋ 全部待上架批次）皆 0。

---

## 第 2189 條（b 組，**裁定；c-168 交件時點名要判的那一格**）：**`Blue Note All‐Stars` 的 U+2010 正規化成 ASCII `-`**

**MB artist 主名與 RG credited-name 逐字都是 `Blue Note All‐Stars`，中間那一格是 U+2010 HYPHEN。**
`chk-prop.mjs` 的反模式檢查（2026-09-06 起加掃 `artist` 欄）會**直接擋**。

**判：取 ASCII `Blue Note All-Stars`，MB 的 U+2010 形進 `queryAlias`。** 三個依據：

1. **c-110 第 1 條**（逐字）：「掛名照 `album` 欄同一個標準辦……MB 的 U+2013 寫法與 Apple 的無連接號寫法都進 `queryAlias`」，理由逐字是「池中 97% 是 ASCII（不製造第二種鍵），且原盤／實體 release 這一層就是 ASCII」。
2. **c-150 的同形處理**（逐字）：「MB 的 `Niels‐Henning Ørsted Pedersen` 用的是 U+2010 HYPHEN……**chk-prop 會直接擋**，池中既有三張 NHØP 卡一律 ASCII `-`，本卡照池中改」。
3. ⚠ **本張的旁證比那兩例更硬**：**Discogs 兩筆零售條目（`15843970` 美版／`10927547` 歐版）的 `artists` 欄逐字是 `Blue Note All-Stars`（ASCII）、Apple 三店的 `artistName` 逐字也是 `Blue Note All-Stars`（ASCII）**——**三邊只有 MB 用 U+2010，改 ASCII 不是我方新造字串，是回到實體那一層的寫法。**

⚠ **這條與第 2078 條「照 MB RG credit 原樣」不牴觸**：正規化的是**一個字元的碼位**，不是掛名的形狀（沒有把群組名改成個人名、沒有增刪詞）。
⚠ **c-110 第 3 條（「release-group 標題本身就是 U+2010 的碟，本批不收」）不適用**：那條管的是 `album` 欄，**本張的盤名 `Our Point of View` 全 ASCII**。

---

## 第 2190 條（b 組）：**`Blue Note All-Stars`（2017）與 c-168 的 `The Blue Note All Stars`（1996）是兩團——MB 上同族字串共四個實體**

派工信第三節第 2 點與 c-168 交件都要求不要合併、也不要判成撞卡。**逐實體核完，確認兩團無關**：

| MB artist | 字串逐字 | type | life-span／disambiguation | 落點 |
|---|---|---|---|---|
| **`a475738b-d51d-4a0d-9de2-724e909435c3`** | **`Blue Note All‐Stars`（U+2010）** | Group | disambiguation 逐字 `formed in 2014 for Blue Note's 75th anniversary, ft. Robert Glasper` | **本卡《Our Point of View》2017** |
| `232efc20-…` | `The Blue Note All Stars` | Group | — | **c-168 slice《Blue Spirit》1996**（RG `b4072123`） |
| `2f32fbfb-…` | `Blue Note All-Stars`（ASCII） | Group | life-span 逐字 `1976-06-28`～`1976-06-28`（**單日**） | 未進任何 slice |
| `8cbffb8c-…` | `Blue Spirit: The Blue Note All Stars` | Group | — | 未進任何 slice |

**依第 179／250／324 條核 `type`／`area`／`life-span`／`disambiguation`、不看 score：四個都是不同實體。**
**陣容也對不上**：本卡是 Glasper／Akinmusire／Strickland／Loueke／Hodge／Scott 六人（bluenote.com 本盤頁逐字），1996 那張是另一代。

⚠ **撞卡檢查**：`chk-prop` 的折鍵 `bluenoteallstars` 與 `thebluenoteallstars` **不相等**，且兩張的盤名不同（`Our Point of View` vs `Blue Spirit`），**複合鍵本來就不會亮**。
⚠ **`2f32fbfb` 的 ASCII 字串與本卡正規化後的字串逐字相同**——**若日後 1976 那場的碟進池，兩張卡會共用同一個掛名鍵**。**本條先記一筆：那時要靠年份與 `mbNote` 的 artist MBID 區分，不得把本卡改掛回 U+2010。**

---

## 第 2191 條（b 組）：**`Kendrick Scott Oracle` 與 c-166 的 `Kendrick Scott, Reuben Rogers, Walter Smith III` 是兩個掛名主體，不是分裂**

派工信第三節第 4 點要求「逐筆照 MB credited-name 判（第 1539 條）」。**逐筆判完**：

| | 本卡《We Are the Drum》2015 | c-166 a《Corridors》2023 |
|---|---|---|
| MB RG artist-credit | **單一成分**，credited-name 與 `artist.name` 逐字 **`Kendrick Scott Oracle`**（`71d3da26` **Group** US） | **三個成分**以 joinphrase `, ` 串接（`Kendrick Scott`／`Reuben Rogers`／`Walter Smith III`） |
| Discogs `artists` | `Kendrick Scott Oracle`（三筆零售條目 `8550212`／`10307891`／`19119046` 一致） | 三人以 `,` 並列 |
| Apple `artistName` | `Kendrick Scott Oracle` | `Kendrick Scott`（聯名被塞進 collectionName） |
| bluenote.com 藝人頁 | 逐字 **「Scott's first two releases on Blue Note as a leader presented his band Kendrick Scott Oracle: We Are The Drum (2015) and A Wall Becomes A Bridge (2019)」** | 逐字「Scott's 2023 Blue Note album Corridors finds him paring down to a trio…」 |

**→ 一個是他的樂團名（Group 實體），一個是三人並列聯名。四邊一致，各照各自發行品的掛名。**
**若硬改成裸名 `Kendrick Scott`，會造出四邊都沒有的字串**（第 1745-B 條）。
⚠ **`Kendrick Scott` 裸名在池中目前 0 張**；**日後他的裸名領班盤進池時照那張碟自己的 credit，不得回頭改本卡或 c-166 那張**（第 197 條）。
⚠ ⚠ **順帶**：bluenote.com 同頁逐字提到 **`A Wall Becomes A Bridge`（2019）也是 Kendrick Scott Oracle 的 Blue Note 盤**——**它不在 c-169 的 slice 上**。**建議主線回列舉檔查它有沒有被同一個曲風判錯層級的缺口漏掉。**

---

## 第 2192 條（b 組）：**`Musica Nuda` 兩張照 a 組第 2130 條，一字不差**

a 組先判、b 組照抄（第 1418 條）。**b 組獨立覆核的三邊也無分歧**：MB RG artist-credit 單一 Group 實體逐字 `Musica Nuda`（`b7840712`）、Discogs `3215014`／`6600079` 的 `artists` 欄逐字 `Musica Nuda`、Apple fr `425341018`／it `766422660`／fr `606220971` 的 `artistName` 逐字 `Musica Nuda`。
⚠ **Discogs 的條目標題寫成 `Musica Nuda = Petra Magoni & Ferruccio Spinetti`——那是 Discogs 的 alias 語法、不是掛名本身，不得採用**（與 a 組第 2130 條同向）。
⚠ **a 組第 2130 條提醒的那個鄰居（2004–06 年 Apple 上的 `Petra Magoni & Ferruccio Spinetti`）本組沒有碰到**，兩張都是 2011／2013。
⚠ **曲風也與 a 組一致**：a 組《55/21》逐字 `['jazz','pop']`，本組兩張同判（見第 2203 條）。

---

## 第 2193 條（b 組，**裁定；可逆**）：**`Erik Truffaz Quartet《El tiempo de la revolución》` 不收攏成池中的 `Erik Truffaz`**

池中／各批 `Erik Truffaz` 這個字串有 **34 列、12 張碟**（c-154／155／157／158／159／160／161／162／166），全部出自本線且本機尚未上架。**第 307 條的字面與 c-149／c-150／c-168 的「兩個 MB 實體不收攏」在這一張上正面相撞**——形狀與 **c-168 第 2080 條（`Ron Carter Trio` 對上池中 11 張 `Ron Carter`）完全相同**。

**判：取 `Erik Truffaz Quartet`（MB `54da4dfb` **Group** CH）。三個理由照第 2080 條的三段式：**

1. **有先例**：c-149 a 第 964 條、c-150 a 第 196／197 條、c-168 第 2078／2080 條、同批 a 組第 2128／2129 條，**方向一致**。
2. **實體證據與 MB 同向**：**Discogs `4052391` 的條目標題逐字是 `Erik Truffaz Quartet - El Tiempo De La Revolución`**。（Apple `artistName` 逐字只有 `Erik Truffaz`，**一比二**。）
3. **可逆**：只動卡單的掛名欄，不動卡池結構。

### ⚠ 為什麼池中那 12 張是裸名、而本張不是——不是前後不一致

**逐張回查 MB RG 的 artist-credit**：c-154／155／157／158／161／162／166 那幾張的 RG credit 逐字都是 **Person 實體 `Erik Truffaz`（`aecd2d93`）**；**c-160《Face à face》的 RG credit 逐字是 `Erik Truffaz Ladyland / Erik Truffaz Quartet`（兩個 Group 以斜線串接）**，c-160 b 依**第 611 條第四種盲區（斜線掛名）＋第 1600 條**收攏成裸名；**c-161《Paris》的 slice 原字串是 `Erik Truffaz / Sly Johnson`，也是斜線形。**
**→ 那些卡照 MB 原樣就是裸名，本卡照 MB 原樣就是 Quartet。「照 MB RG credit 原樣」這條規則在十三張上是同一條，結果不同是因為 MB 的 credit 本來就不同。**
⚠ **本張不是斜線形**，第 1600 條的前提不成立。

⚠ **反向適用**：收下之後 `Erik Truffaz` 與 `Erik Truffaz Quartet` 兩個字串並存，**日後絕不得事後合併**（第 197 條）。

---

## 第 2194 條（b 組，**裁定；可逆**）：**`Kenny Barron Quintet` 不收攏——⚠ 順帶更正列舉檔「Kenny Barron 零張」的錯誤**

### （一）⚠ ⚠ slice 的 note 寫錯了

`c169/slice.json` 該筆的 `note` 逐字寫：「實掃：池中與批次的 `Kenny` 開頭全是 Kenny Drew／Kenny Burrell，**Kenny Barron 零張**」。
**實掃結果相反**：**seed 有兩張精確命中的 `Kenny Barron` 卡——《Scratch》(1985)、《What If?》(1986)**，另有聯名 `Joe Locke & Kenny Barron —《But Beautiful》`。
**佐證是廠牌自己的文案**：bluenote.com 的《Concentric Circles》頁逐字寫「his critically acclaimed **1986 LP What If** with trumpeter Wallace Roney, saxophonist John Stubblefield, bassist Cecil McBee, and drummer Victor Lewis」——**就是池中那一張，同一位鋼琴家。**
⚠ **這是 c-168 交件第 4 點（「slice 的 `note` 寫『僅 XX 盤』的一律不可信」）的同一族毛病**，只是換成了「實掃結論不可信」：**`note` 欄裡任何「池中零張」「僅 XX 盤」的斷言，策展層都必須自己重掃一次。**

### （二）掛名判定

**判：取 `Kenny Barron Quintet`（MB `28d91e80` **Group**），與池中的 `Kenny Barron`（seed 2 張）並存。**
依據同第 2193 條的三段式：(1) 先例（第 964／196／197／2078／2080 條 ＋ 同批 a 組第 2128 條的 `Paolo Fresu Quintet`／`Joona Toivanen Trio`／`High Five Quintet`／`Franco D'Andrea Quartet`）；(2) **Discogs 兩筆零售條目 `11973964`／`12008078` 的 `artists` 欄逐字都是 `Kenny Barron Quintet`**；(3) 可逆。
⚠ **Apple `artistName` 逐字是 `The Kenny Barron Quintet`（第三種寫法，多一個定冠詞）——依 c-150 a 第 218 條「不得因店面的寫法造出第三種字串」，只進 `queryAlias`。**

---

## 第 2195 條（b 組，**裁定；可逆；⚠ 與 c-146 對同一位藝人的判法相反**）：**`The Charles Lloyd New Quartet《Passin' Thru》` 不收攏成池中的 `Charles Lloyd`**

**判：取 `The Charles Lloyd New Quartet`（MB `c5c626e3` **Group**），與池中的 `Charles Lloyd`（22 列）並存。**

### 三項佐證（第 2080 條三段式）

1. **有先例**：c-168 第 2078 條的統一規則 ＋ 第 964／196／197／2080 條 ＋ 同批 a 組第 2128／2129 條。
2. **實體證據與 MB 同向**：**Discogs 兩筆零售條目（`10745067` 美版／`10568881` 歐版）的藝人欄逐字是 `Charles Lloyd New Quartet*`、Apple 三店的 `artistName` 逐字是 `Charles Lloyd New Quartet`**——**兩邊都指這支四重奏，不是裸名。**（只有 Discogs master `1211978` 的 `artists` 欄逐字寫成 `The Charles Lloyd Quartet`，少了 `New`。）
3. **可逆**：只動卡單掛名欄。

### ⚠ ⚠ 與 c-146 的落差——本條明寫，不掩蓋

**c-146 a《A Night in Copenhagen》(1985) 的 MB RG credit 逐字是 `The Charles Lloyd Quartet`（`dbbc9be6` **Group** US、獨立實體），c-146 a 卻收攏成 `Charles Lloyd`**，risk 欄的理由逐字是「池中 seed 的《Forest Flower》(1967) 盤面同樣印 Charles Lloyd Quartet 卻用 `Charles Lloyd`」＋第 307／784 條。
**同一位藝人、同樣是 Group 實體、兩批判法相反。** 這正是 **c-168 第 2079 條**記下的「Ralph Peterson 同一個團兩張碟兩個字串」的同形落差。

**本棒依 c-168 第 2078 條的統一規則走**（那是本線 2026-09-19 最新、且明文適用於 c-168／c-169／c-170 的規則），**並且不動 c-146 那張**（不碰別批檔案）。
**→ 給本機：若要統一，只能連 c-146 那張一起改；只改本卡會把落差留在原地。**

⚠ **池中 Charles Lloyd 目前會有四個字串**：`Charles Lloyd`（22 列，其中 c-163／c-164／c-165／c-166 那幾張的 MB RG credit 本來就是 Person 實體 `b9b579ad`，**照 MB 原樣就是裸名，沒有違反第 2078 條**）、`Charles Lloyd & The Marvels`（c-163／c-165 三張）、`Charles Lloyd & the Marvels Featuring Lucinda Williams`（seed）、**`The Charles Lloyd New Quartet`（本卡）**。**第 1131 條：不同編制各自成立。日後絕不得事後合併。**

---

## 第 2196 條（b 組，**年份**）：**改判 3 筆、覆核成立 17 筆——⚠ 三筆的失效方式各不相同，而且有兩筆是第二種 Discogs 掃描才查出來的**

### 改判 1：`The Charles Lloyd New Quartet《Passin' Thru》` **2018 → 2017**（MB frd 的年份跳了一格，月日完全正確）

| 層 | 逐字 |
|---|---|
| **MB** | RG `first-release-date` **`2018-07-14`**；轄下唯一 release 的 `date` 亦 **`2018-07-14`** |
| **Discogs 原壓群** | 美版 `10745067` 的 `year` 逐字 **`2017`**、歐版 `10568881` 逐字 **`2017`**（**兩筆的 barcode 逐字就是 MB 那筆的 `602557649888`**）、**master `1211978` 的 `year` 逐字 `2017`**；**第二種掃描再補五筆全 2017**（日版 `16781841` `UCCQ-1071`、歐版黑膠 `10624706`、美歐版黑膠 `10590110`、宣傳 CDr `11272533`、FLAC `32459694`） |
| **Apple** | `1440884105` 的 `releaseDate` 逐字 **`2017-07-14T07:00:00Z`**（**月日與 MB 完全相同，只有年份差一**）、℗ 欄逐字 `℗ 2017 Charles Lloyd, under exclusive license to Blue Note Records` |
| **維基** | 逐字「recorded at the Montreux Jazz Festival and in Santa Fe in 2016 and **released on the Blue Note label in 2017**」 |

**依簡報第二節 2000 年後的階序（廠牌新聞稿／榜位 ＞ Discogs 原壓群 ＞ MB first-release-date）：取 2017。**
⚠ **`slice.json` 的 `year` 欄逐字 2018、`note` 欄逐字卻寫「2017 這張《Passin' Thru》缺」——列舉檔自己前後矛盾。**
⚠ **這個形狀值得記**：**MB 的日期不是亂填，是「月日對、年份跳一格」**——**光比月日會以為兩邊一致**，必須連年份一起逐字比。
⚠ **俄版 `11137083` 的 `formats` descriptions 逐字含 `Unofficial Release`，依 a 組的結論不當年份依據。**

### 改判 2：`The Blue Note 7《Mosaic: A Celebration Of Blue Note Records》` **2009 → 2008**（日版先發，MB 根本沒建日版）

**⚠ 這一筆是主線 2026-09-19 中途補下來的第二種掃描才查出來的**——**用 MB 的 barcode（`e4480f14` 根本沒有 barcode）反查，永遠碰不到日版。**

| 來源 | 逐字 |
|---|---|
| **原本看得到的四層（全是歐美）** | MB frd `2009-01-12`（GB）／MB 重複 RG `2009-01-13`（US）／Discogs 歐美四筆 `year` 全 2009／維基逐字「the 2009 debut album」「released in 2009」 |
| **第二種掃描補進來的四筆日版** | **零售單 CD `17285473`（`Blue Note TOCJ-66466`，`released` 欄逐字 `2008-12-26`，barcode `4988006868328`，**8 軌**）**／宣傳盤 `16099799`（同號，notes 逐字 `Japan official promo release. Identical to commercial release`）／**2 CD HQCD 限量版 `17955550`（`TOCJ-90007·08`，`released` 欄逐字 `2008-12-26`，18 軌）**／其宣傳盤 `11429270` |

**判：取 2008。** 依據三條：
1. **第 1696 條**（逐字：「`Somethin' Else`／東芝EMI／EMI Music Japan 的碟，年份一律先假設日本比歐美早半年到一年」，**c-161 兩張 Eliane Elias 已依此改判成功**）；**`TOCJ-` 正是 EMI Music Japan／東芝EMI 的 Blue Note 號段。**
2. **c-145 第 817 條**的同形處理（《Poppin'》取日本首發年）。
3. **c-156 第 1414 條要求的四項比對全過**：盤名同、掛名同、**軌數 8＝8**（與本卡釘的 GB 單 CD 同形）、封面同版式。
4. **兩筆獨立 Discogs 條目給出同一個精確街頭日 `2008-12-26`**，不是年份猜測。

⚠ **反向證據留著**：維基逐字 `released in 2009`、樂團宣傳巡演是 2009 年 1–4 月、歐美壓片全 2009。
⚠ **不引用 Apple**：`releaseDate 2008-01-01` 是年初佔位日（第 1447 條）、℗ 欄 `℗ 2008` 是錄音年（第 1601 條），**兩者都不是 2008 的獨立證據。**
⚠ ⚠ **本裁定是本組最可逆的一格**：若本機採「以歐美首發年為準」的慣例，只要把 `year` 改回 2009，`label` 與 `risk` 的日版段落照留。
⚠ **副作用**：這張因此落在 2008 年，**跨出了 b 組名義上的 2009–2019 年帶**（第 1558 條的切批界線是 2020 年，2008 仍在 c169 的 2000–2019 範圍內，**批次歸屬不變**）。

### 改判 3：`Logan Richardson《Shift》` **2016 → 2015**（日版 SHM-CD 先發四個月，MB 沒建日版）

| 來源 | 逐字 |
|---|---|
| **原本看得到的三層（全是歐美）** | MB frd `2016-02-26`（CD 與數位同日）／Discogs 美版 `9590844`、歐版 `8251979` 的 `year` 逐字 2016／Apple `releaseDate` 逐字 `2016-01-22` |
| **第二種掃描補進來的日版** | **`7658280`（`Blue Note UCCQ-1044`，SHM-CD，`released` 欄逐字 `2015-10-14`，barcode `4988031115695`，**13 軌**，notes 逐字 `Recorded December 4 & 5, 2013` ＋ `Tracks 12 & 13 are bonus tracks` ＋ `SHM-CD`）** |
| **旁證** | **Apple ℗ 欄逐字 `℗ 2015 Brain Child World`——與日版發行年同向**（本組九次 ℗ 異常裡，唯一一次 ℗ 的年份其實是對的） |

**判：取 2015。** 依第 1696 條 ＋ c-156 第 1414 條的四項比對：盤名同、掛名同、封面同版式、**軌數 13 vs 11（日版多兩首 bonus，同一張碟的 bonus 版）**。
⚠ **本張是雙重時間差**：**錄音 2013-12-04／05 → 日版 2015-10-14 → 歐美 2016-02-26**。**正文不得把錄音年寫成發行年，也不得把歐美年寫成首發年。**
⚠ **軌數以 11 軌的歐美原盤為準**，日版 13 軌形要標明。
⚠ **俄版 `8444720` 的 `formats` descriptions 逐字含 `Unofficial Release`，不當年份依據。**
⚠ **本裁定可逆**（改回 2016 只動一格）。

### 覆核成立 17 筆（無一改判）

**三層以上一致的 13 筆**；**MB 只有年份精度、靠 Discogs＋Apple 補日的 2 筆**（Jon Cowherd《Mercy》、Otis Brown III《The Thought of You》）；**MB 與 Apple 差幾天到三個月、同年故不影響的 4 筆**（Ruben Hein 差 7 天、Kendrick Scott 差 10 天、Musica Nuda《Complici》fr/us 差兩個月、Musica Nuda《Banda larga》差 3 個月）。
⚠ **本組有日版、但日版與歐美同年、故不影響年份的 5 筆**：Otis Brown III（`UCCQ-1020`）、Kendrick Scott Oracle（`UCCQ-1047`）、Blue Note All-Stars（`UCCQ-1072/3`）、Chris Dave（`UCCQ-1078`）、R+R=NOW（`UCCQ 1085`）——**五筆 MB 都沒建，全靠第二種掃描才看到。**
⚠ **宣傳盤早一年、但不採的 1 筆**：Chris Dave 的 `11859123`（`year` 逐字 2017、`formats` descriptions 逐字 `Album, Promo`）——**`year` 取首次商業發行年，宣傳 CDr 不算**，2018 不動。

### ⚠ 第 1447 條（Apple 年初佔位日）在本組應驗 **5 次**

| 卡 | Apple `releaseDate` 逐字 | 採用的年份來源 |
|---|---|---|
| The Blue Note 7 | `2008-01-01T08:00:00Z` | **日版 Discogs `released` 逐字 `2008-12-26`**（**佔位日的年份剛好對上，但那是巧合，不是證據**） |
| Ruben Hein（nl id） | `2011-01-01T08:00:00Z` | MB frd `2010-10-29` ＋ Discogs `2010` ＋ Apple gb `2010-11-05` |
| Emma Salokoski & UMO | `2011-01-01T08:00:00Z` | MB frd `2011-03-11` ＋ Discogs `2011` |
| The Northern Governors | `2012-01-01T08:00:00Z` | MB frd `2012-03-16` ＋ Discogs `2012` |
| Musica Nuda《Banda larga》（it id） | `2012-01-01T08:00:00Z`（**差一年**） | MB frd `2013-01-29` ＋ Discogs 五筆全 2013 ＋ Apple fr `2013-04-23` |

### ⚠ 第 1601 條（℗ 欄只當年份弱證據、絕不可判廠牌）在本組應驗 **9 次**

**廠牌全錯 7 次**：Ruben Hein `℗ 2011 Universal Music B.V.`／Musica Nuda《Complici》`℗ 2011 Magoni / Spinetti under exclusive license to Bonsai Music`／Erik Truffaz `℗ 2012 Foufino Productions`／Musica Nuda《Banda larga》`℗ 2012 Petra Magoni, Ferruccio Spinetti`／**Aron Ottignon `℗ 2017 Decca Records France`**／**Kenny Barron `℗ 2018 Decca Records France`**／Sarah McCoy `℗ 2019 Universal Music Jazz Germany, a division of Deutsche Grammophon GmbH, Berlin`。
**年份跑掉 2 次**：The Blue Note 7 `℗ 2008`（**錄音年；雖然與改判後的 2008 同年，仍不當證據**）／Logan Richardson `℗ 2015 Brain Child World`（**比歐美發行年早一年，而這一次它其實指到了日版的發行年**）。
⚠ **`Decca Records France` 連續兩次**——**這是 UMG 法國把旗下爵士發行的 ℗ 統一掛在 Decca France 名下造成的，不是廠牌判定的證據。**

---

## 第 2197 條（b 組）：**字形裁定三筆——撇號取 ASCII、斜線盤名照 MB、小寫 t 照 MB＝Apple**

1. **`Passin' Thru`**：MB RG title 逐字 `Passin’ Thru`（**U+2019**），**本卡取 ASCII `'`**。依 **c-110 第 5 條**（逐字：「兩張都取 ASCII 撇號，MB 的彎撇號寫法進 `queryAlias`」，理由逐字「池中 97% 是 ASCII」）與 **c-166 的同批先例**（slice 逐字 `Rollin’`、prop 層逐字改成 `Rollin'`）。**Apple 的 `collectionName` 逐字也是 ASCII 撇號。**
2. **`Rytmihyrrä / Rytmyra`**：MB RG title 用**斜線**、Discogs `10832336` 與 Apple `713954121` 逐字都用 **ASCII 連字號**（`Rytmihyrrä - Rytmyra`）。**取 MB 的斜線形**（第 6／70／120 條），連字號形進 `queryAlias`。⚠ **派工信第三節第 6 點要求「兩種寫法都要拿去掃卡池」——已照做，`Rytmihyrrä` 與 `Rytmyra` 各掃一次，皆 0 命中。**
3. **`Sunaga t Experience`**：MB 與 Apple 逐字都是**小寫 t**，Discogs `7058519` 的 `artists` 欄逐字是**大寫 T**（`Sunaga T Experience`）。**取 MB＝Apple 的小寫形**，大寫形進 `queryAlias`。
   ⚠ **2026-08-11 東亞藝人名裁定（有漢字照漢字）在這一張不適用**：**MB／Discogs／Apple 三邊逐字都是拉丁字串，這是「樂團企劃名」而不是「本人姓名」**；`須永辰緒` 進 `queryAlias`，**兩種寫法都已進去重表**。

⚠ **`chk-prop` 的四道字形檢查（非 ASCII 連字號 ×2、U+30FC 誤用、盤名撞 apex）本組全部不亮**，但**前三道之所以不亮，是因為第 2189 條與本條先把三個字形改掉了**——**「標記 0」在字形這一關同樣不等於乾淨**（第 611 條的同一句話）。

---

## 第 2198 條（b 組）：**合輯風險逐張核——判為合輯 0；三張細判過**

派工信與簡報第一節第 2 點要求「盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Blue Note Trip／Sidetracks 的一律細看；判準只讀逐張文案與軌目來源」。
**本組 20 張的 `secondary-types` 逐字核完：18 張空陣列、2 張 `["Live"]`（見第 2199 條）、`Compilation` 0 張。** 另外三張形狀可疑的細判過：

| 卡 | 可疑處 | 判定 |
|---|---|---|
| **The Blue Note 7《Mosaic: A Celebration Of Blue Note Records》** | 盤名帶 `Celebration`；**MB 另一個 RG 真的掛 `Compilation`** | **Album**（第 2187 條，逐軌核完） |
| **Sunaga t Experience《STE》** | DJ 選曲／再製企劃，第 1559 條列的邊界張 | **Album**——**十一軌 recording 的 frd 逐字全是 `2015-05-20`、credit 逐字全是 `Sunaga t Experience`**（實查 `f3d09f82`／`b6053689`）；`f3d09f82` 後來才出現在他 2016 年的《須永辰緒の夜ジャズ・外伝2》上，**那張才是集結盤、本張是它的來源**；Discogs `7058519` 的 `formats` descriptions 逐字只有 `Album`（無 `Compilation`／`Mixed`／`DJ Mix`） |
| **Emma Salokoski & UMO《Rytmihyrrä / Rytmyra》** | 42 軌兩片，形狀像套裝 | **Album**——**兩片是同一套 21 首曲目的芬蘭語版與瑞典語版**（Discogs `10832336` notes 逐字記瑞典語詞 `Mayvor Fridlund`），不是集結 |

⚠ **第 782 條（Discogs 的 `format` 欄會錯）本組沒有中**：20 張的 Discogs `format`／`formats` 欄與 MB 的 primary/secondary type 逐張對得上。**唯一一處「Discogs 標了 Compilation」是 The Blue Note 7 的 2 CD 條目——那一標是對的。**

---

## 第 2199 條（b 組）：**現場盤 2 張，`live: true` 收但要標；MB 這兩張都標對了**

| 卡 | MB `secondary-types` | 其他三層 |
|---|---|---|
| **The Charles Lloyd New Quartet《Passin' Thru》** | 逐字 `["Live"]` | Apple `collectionName` 逐字帶 `(Live)`；Discogs 廠牌鏈逐字含演出場地 `Montreux Jazz Festival`／`The Lensic, Santa Fe, NM`；維基逐字 `is a live album` |
| **The James Carter Organ Trio《Live From Newport Jazz》** | 逐字 `["Live"]` | 數位版六個軌名逐字全帶 `(Live)`；Discogs notes 逐字 `Recorded Live at Newport Jazz Festival, Newport, RI, USA on August 5, 2018.` |

⚠ ⚠ **`Passin' Thru` 不是單一場次的現場**：`slice.json` 的 `note` 逐字只寫「Montreux 現場」，**但 bluenote.com 本盤頁逐字寫第 1 軌〈Dream Weaver〉錄於 2016-06-30 的 Montreux、「The remaining six pieces were drawn from the band's sublime performance at The Lensi[c]」（聖塔菲）**。**正文不得把整張寫成 Montreux 一場。**（**又一筆 slice `note` 不可信的實例**，同 c-168 交件第 4 點。）
⚠ **第 397／613 條（`secondary-types` 兩個方向都會漏）本組沒有中**：兩張現場盤 MB 都標了，18 張非現場盤也沒有誤標。
⚠ **`releaseType` 兩張仍寫 `Album`**——照 MB 的 `primary-type`，與 c-164《8: Kindred Spirits (Live From the Lobero)》的既有寫法一致。

---

## 第 2200 條（b 組，**⚠ 給下游**）：**同一張碟在不同版本之間軌數不同的，本組 7 筆——正文與試聽比對不得抓錯形**

| 卡 | 原盤形 | 其他形 |
|---|---|---|
| **The Blue Note 7** | **CD 8 軌** | **2 CD Special Edition 16 軌**（第二片是原版母帶，第 2187 條） |
| **Ruben Hein** | **CD 12 軌** | Apple nl `715942743` 逐字 **16 軌**（`Loose Fit (Bonus Track Version)`） |
| **Erik Truffaz Quartet** | **CD 10 軌** | 限量版另附 **DVD-Video 9 軌**（曲目是舊曲現場，含〈In Between〉——池中 c-162 同名專輯的標題曲） |
| **Jon Cowherd** | **CD 11 軌** | Apple `739960265` 逐字 **12 軌** |
| **Musica Nuda《Banda larga》** | **CD 20 軌** | MB 數位 21 軌、Apple it 21 軌（多末軌〈I ricordi della sera〉）、Apple fr 20 軌 |
| **Aron Ottignon** | **CD 11 軌** | Apple `1442272798` 逐字 **14 軌** |
| **R+R=NOW** | **CD 11 軌** | **日本數位三筆逐字 12 軌**（多〈Reflect Reprise (MC Rob G version)〉） |

⚠ **另有兩筆「軌數看起來怪但四邊一致」，不算分歧**：Emma Salokoski & UMO **42 軌**（21×2 語言）、Blue Note All-Stars **6＋5＝11 軌**（兩片）。
⚠ **軌數單一、無分歧的 11 張**：Otis Brown III／Kendrick Scott Oracle／Sunaga t Experience／Logan Richardson／Chris Dave／Kenny Barron Quintet／Charles Lloyd／Sarah McCoy／James Carter／Musica Nuda《Complici》／The Northern Governors。

---

## 第 2201 條（b 組）：**imprint 前置閘（第 1560-AD／1631／1633 條的分界）逐張跑過——20 張全過**

**分界逐字是「有沒有任何一版真的掛過 Blue Note」。**

- **MB `label-info` 逐字 `Blue Note` `713c4a95` 的：19 張**（唯一例外見下）。
- **Discogs 廠牌鏈第一格逐字 `Blue Note`（或 `Blue Note France`）的：20 張全部。**
- ⚠ **`Blue Note Label Group [2eb19785]` 本組只出現 1 次**：The Blue Note 7 的 2 CD 條目廠牌鏈逐字 `Blue Note / EMI / The Blue Note Label Group`——**在鏈上但不在第一格，第一格逐字是 `Blue Note`**，**方向與被退掉的 Anoushka Shankar 那張（第一格逐字 `Manhattan Records`）相反，過閘。**
- ⚠ **`Blue Note France` 是正規 imprint**：Aron Ottignon（Discogs 廠牌鏈三格逐字全是 `Blue Note France`）與 Sarah McCoy 的 MB label id 逐字都是 **`713c4a95`**，**不是第 1560-AD 條列的兩個冒名廠牌**（`Blue Note Compagnie` 用 `BNS-` 目錄號、`Blue Note Digital` 是 MB label `0293ae5c`）。
- ⚠ **同一 RG 內兩筆 release 掛不同廠牌的 4 筆**：Emma Salokoski（數位掛 `EMI Finland` `4c418bbc`、CD 掛 Blue Note）、Musica Nuda《Complici》（法版掛 `Bonsaï Music`、德版掛 `edel`、**只有義大利原壓掛 Blue Note，而它就是 frd 那一版**）、Erik Truffaz（數位掛 `Parlophone France` `0b81e41d`、兩個實體版掛 Blue Note）、Logan Richardson（數位掛 `Universal Music` `13a464dc`、CD 掛 Blue Note）。**四張都有實體版掛 Blue Note，過閘。**
- ⚠ **MB `label-info` 逐字空的 3 筆**（裁定 259：「查無」與「沒問」長得一樣）：Chris Dave 的數位版、Kenny Barron 的數位版、James Carter 的數位版。**三張的實體版都掛了 Blue Note。**
- ⚠ **兩家並列共用同一目錄號的 2 筆**：Jon Cowherd（`ArtistShare` ＋ `Blue Note`，同為 `ASBN-0126`）、Chris Dave（`Blue Note` ＋ `GLOW365`，同為 `B002705302`）。**都是家族／自營廠牌並列，不是他廠。**
- ⚠ **Capitol／UMG／Deutsche Grammophon 出現在鏈上的 5 筆**（R+R=NOW、Chris Dave、James Carter、Kendrick Scott、Sarah McCoy）——**同集團母體，第 1753(4)／1770 條的既有假陽性型態，不成立。**

---

## 第 2202 條（b 組）：**第 1250 條（`catno` 不可反查）在本組應驗 8 次——其中兩筆是「目錄號記到別的載體上」**

| 卡 | 形狀 |
|---|---|
| **Aron Ottignon** | 列舉檔已標：`577682-0` 反查會撞 RCA 的 Westlife（barcode `828765776820` 內含同串數字）——**教科書例** |
| **The Blue Note 7** | 列舉檔 `catno` 只留 `2281232`，**全號是 `50999 2 28123 2 2`**；裸數字毫無唯一性 |
| **Erik Truffaz Quartet** | 列舉檔把 **barcode 當目錄號**放進 `catno`（`5099997903628`／`5099997903925`） |
| **Sarah McCoy** | 三個號只差末碼：CD `60025 6768576`／黑膠 `06025 6768577`／宣傳 CDr `00602567685760`；**MB 的 `catalog-number` 欄還是空的** |
| **Otis Brown III** | 歐版 `0602537877003`（＝barcode）vs 美版 `B002100202`，**兩形** |
| **Blue Note All-Stars** | MB 記 `B002709202JK02`（**帶 UMG 組件碼 `JK02`**）、Discogs 記 `B002709202` |

| **Ruben Hein** | ⚠ **列舉檔記的 `50999 9174741 9` 是荷蘭黑膠 `5278992` 的目錄號，CD `2983088` 是 `50999 9174742 6`**——**錯的不是位數而是載體**（第二種 Discogs 掃描才查出來，第 2209 條） |
| **Sunaga t Experience** | 2022 黑膠的 catno，**MB 記 `PROZ-7910/1`、Discogs `22953746` 記 `PROZ7-910/1`——連字號位置不同** |

**→ 本組一律以「目錄號＋廠牌」或 barcode 判同碟；盤名反查一次都沒有採用。**

⚠ **另記一個相反方向的毛病（本條新增）**：**Chris Dave《Chris Dave and The Drumhedz》的 barcode `602537794409` 前綴屬 2014 年前後的 UMG 配號，看起來像 2014 年的碟**——**四層核完全是 2018。條碼號段不是年份證據。**

---

## 第 2203 條（b 組）：**曲風——`['jazz']` 10 張、兩層 10 張；因曲風退件 0**

| 組合 | 張 | 名單 |
|---|---:|---|
| `['jazz']` | **10** | The Blue Note 7／Emma Salokoski & UMO／Jon Cowherd／Otis Brown III／Kendrick Scott Oracle／Logan Richardson／Blue Note All-Stars／Kenny Barron Quintet／Charles Lloyd／James Carter |
| `['jazz','soul']` | **4** | The Northern Governors／Chris Dave and The Drumhedz／R+R=NOW／Sarah McCoy |
| `['jazz','electronic']` | **3** | Erik Truffaz Quartet／Sunaga t Experience／Aron Ottignon |
| `['jazz','pop']` | **3** | Ruben Hein／Musica Nuda《Complici》／Musica Nuda《Banda larga》 |

**四條取捨規則**：

1. **`contemporary jazz`／`post-bop`／`hard bop`／`jazzdance`／`future jazz`／`soul jazz`／`avant-garde jazz`／`jazz-funk` 等子類一律不跟**（第 1572 條），因為十個合法值裡沒有它們。
2. **嘻哈成分折進 `soul`、不開 `hiphop`**——**Glasper 圈的既有先例**：seed 的《Black Radio》《In My Element》、c-162《Black Radio 2》《Live Today》、c-163《The Second》《ArtScience》《Nihil Novi》的 `genres` 欄逐字**全部是 `["jazz","soul"]`，沒有一張用 `hiphop`**。本組的 Chris Dave 與 R+R=NOW 同判（MB `genres` 都逐字含 `hip hop`）。
3. **Discogs 的 `genre` 欄與 MB 的 `genres` 打架時，取兩邊的交集**——**Sarah McCoy 是唯一一張兩個 Discogs 條目給出不同集合的碟**（CD `13318607` 逐字 `Jazz, Funk / Soul, Pop`；黑膠／master 那邊逐字 `Jazz, Funk / Soul, Blues`）：**交集是 `Jazz` ＋ `Funk / Soul`，故取 `['jazz','soul']`，不賭 `blues` 也不賭 `pop`。**
4. **非曲風的分類欄不跟**：Emma Salokoski 的 Discogs `genre` 逐字 `Jazz, Children's`，**`Children's` 不對應十個值裡的任何一個，也不折成 `pop`。**

⚠ **第 1559 條的兩張邊界張（Emma Salokoski & UMO、Sunaga t Experience）都收，沒有拿曲風退**。
⚠ **Musica Nuda 兩張的 `classical` 刻意不跟**：MB《Banda larga》的 `genres` 逐字含 `classical:1`（來自管弦編曲與〈Bach Aire〉那一路曲目），**跟了會讓同一組二重奏的兩張卡曲風不一致，也會讓 a 組《55/21》的 `['jazz','pop']` 對不上**（第 1418 條）。
⚠ **Ruben Hein 的 `pop` 是本組證據最弱的一格**（Discogs 只給 `Jazz`，`pop` 來自「人聲爵士唱自寫流行曲」的形狀），**本機審稿可退成 `['jazz']`，可逆。**

---

## 第 2204 條（b 組）：**三種店面查法的觀察（只寫觀察不下結論——第 254 條）**

**跑法**：每張用 `search`（`entity=album`，依碟的來源選 2–3 個市場，共涵蓋 us／gb／jp／fr／de／nl／fi／it 八個）＋ `lookup?upc=`（19 張有 barcode 可用，Jon Cowherd 的 MB 與 Discogs barcode 欄都空、這一種查法無從跑起）。**藝人目錄 `lookup?id=<artistId>&entity=album` 這一種留給研究層。**

| 覆蓋 | 張 | 名單 |
|---|---:|---|
| **所跑市場全中** | **12** | The Blue Note 7（us/gb/jp）／Erik Truffaz（fr/us/gb）／Jon Cowherd（us/gb/jp）／Otis Brown III／Kendrick Scott Oracle／Logan Richardson（us/gb/fr）／Blue Note All-Stars／Chris Dave／Kenny Barron／Charles Lloyd／Sarah McCoy（fr/de/us）／James Carter（us/gb/fr） |
| **部分市場空** | **7** | Ruben Hein（**us 空**）／Emma Salokoski（**us 空**）／Musica Nuda《Complici》（**it 空——義大利原壓的市場反而查不到**）／The Northern Governors（**us 空**）／Musica Nuda《Banda larga》（**us 空**）／Sunaga t Experience（**只有 jp**）／Aron Ottignon（**gb 空**） |
| ⚠ ⚠ **`search` 全空、靠 `lookup?upc=` 救回** | **1** | **R+R=NOW《Collagically Speaking》**——us／gb／jp 三市場用 `R+R=NOW Collagically Speaking` 全部 0 命中（**帶 `+` 與 `=` 的字串搜尋端點吃不下**），`lookup?upc=602567554318` 才回 `1383057057`（第 1605 條的救援在本組成立一次） |
| **四種查法全空** | **0** | — |

⚠ **`lookup?upc=` 的命中率：19 張裡 8 張命中**（The Blue Note 7、Emma Salokoski、Erik Truffaz〔兩個條碼只有數位那個通〕、The Northern Governors、Kendrick Scott、Blue Note All-Stars、Chris Dave、Kenny Barron、R+R=NOW、Sarah McCoy〔兩個條碼都通〕）——**與 c-159 b 第 1605 條「成功率不高」的經驗一致。**
⚠ **一個 UPC 回兩個 collectionId 的 1 筆**：**Chris Dave `lookup?upc=602537794409` 同時回 `1440881381` 與 `1442962527`，兩筆的 collectionName／trackCount／releaseDate／℗ 欄逐字全部相同**——**探測鏈要能容忍一碼兩 id。**
⚠ **兩個 collectionId、軌數不同的 3 筆**：Ruben Hein（gb 12 軌／nl 16 軌）、Musica Nuda《Banda larga》（fr 20 軌／it 21 軌）、Musica Nuda《Complici》（fr `425341018`／us `440255891`，同 14 軌但 releaseDate 差兩個月）。
⚠ **Apple 的 `artistName`／`collectionName` 與本卡掛名對不上、探測鏈會落空的 4 筆**：**R+R=NOW**（artistName 逐字 `R+R=NOW, Robert Glasper & Terrace Martin`）、**Blue Note All-Stars**（collectionName 逐字帶 `(feat. Lionel Loueke, Ambrose Akinmusire, Marcus Strickland, Kendrick Scott, Robert Glasper & Derrick Hodge)`）、**James Carter**（artistName 逐字只有 `James Carter`、collectionName 逐字 `James Carter Organ Trio: Live From Newport Jazz`）、**Kenny Barron**（artistName 逐字 `The Kenny Barron Quintet`）。
⚠ **日文片假名 artistName 的 5 筆**：`ブルーノート・セブン`／`ジョン・カウハード`／`オーティス・ブラウン3世`（**用半形阿拉伯數字 3 ＋「世」，不是 III**）／`ケンドリック・スコット・オラクル`／`ケニー・バロン・クインテット`／`クリス・デイヴ&ザ・ドラムヘッズ`／`チャールス・ロイド・ニュー・カルテット`／`ブルーノート・オールスターズ`（實為 8 筆，全部進 `queryAlias`）。

---

## 第 2205 條（b 組）：**CAA——RG 層有圖 15／20，但只有 6 張的來源是原盤或唯一版本**

| 狀態 | 張 | 名單 |
|---|---:|---|
| **有圖，來源是原盤或 RG 唯一的 release** | **6** | Ruben Hein（`b53f9b8a`）／Erik Truffaz（`7928f99e` 單 CD）／Kendrick Scott Oracle（`168e453c`）／Blue Note All-Stars（`055a7f13`）／Charles Lloyd（`32d3efe0`）／Sarah McCoy（`f4940eda`） |
| ⚠ **有圖，但來源是數位版或他版** | **9** | Emma Salokoski（數位 `084f4989`）／Musica Nuda《Complici》（**法版 Bonsaï 壓片 `6841ac94`，不是義大利原壓**）／The Northern Governors（數位）／Musica Nuda《Banda larga》（數位）／Logan Richardson（數位）／Chris Dave（數位）／Kenny Barron（數位）／**R+R=NOW（日本數位 12 軌版 `bd48bf5f`）**／James Carter（**歐版 `af1b1863`，不是美版**） |
| ⚠ **RG 層 HTTP 404、一張圖都沒有** | **5** | **The Blue Note 7／Jon Cowherd／Otis Brown III／Sunaga t Experience／Aron Ottignon** |

**→ 五張留 `pending-local`；九張「來源不是原盤」的要由研究層與封面層看版式**（Discogs 已記下版式的兩筆：Aron Ottignon 逐字 `4-panel digisleeve with a 12-page booklet`、Sarah McCoy 逐字 `Gatefold cardboard, including a 16-page booklet, inserted in left panel`）。

---

## 第 2206 條（b 組）：**`chk-prop` 與 `dedup-crossbatch` 的結果，以及第 611 條五種盲區的人工掃**

```
node batch-progress/c169/chk-prop.mjs b
  → prop-b.json：20 張、19 位
  → 132 批（其中 1 批讀 prop）｜卡數 5297｜跨批撞卡 0｜同 rgMbid 不同掛名 0
     ｜同掛名盤名詞元包含 0｜共用目錄號 0（後三項只報不擋）
  → 合計 20 張、19 位｜標記 0
node batch-progress/dedup-crossbatch.mjs c169
  → 1 批（其中 1 批讀 prop）｜卡數 40｜跨批撞卡 0｜同 rgMbid 不同掛名 0
     ｜同掛名盤名詞元包含 0｜共用目錄號 0
```

**第五道（盤名逐字撞 apex、掛名不同，report-only）：0 處。** 本組 20 個盤名折鍵後對 seed 裡所有 apex 卡皆無命中。

⚠ **第 611 條：標記 0 不等於沒撞卡。五種盲區逐一人工掃過**：

1. **群組掛名 vs 個人掛名**——**本組最密的一格**。逐筆掃過：`Erik Truffaz`（34 列，第 2193 條）、`Kenny Barron`（2 列，第 2194 條）、`Charles Lloyd`（22 列，第 2195 條）、`Kendrick Scott`（c-166 那張，第 2191 條）、`Robert Glasper`（12 列）、`Ambrose Akinmusire`（13 列）、`Lionel Loueke`（12 列）、`Derrick Hodge`（9 列）、`Bill Charlap`（3 列＋`Bill Charlap Trio`）、`Ravi Coltrane`（3 列）、`Pat Metheny`（5 列＋三種聯名）、`Jason Moran`（24 列）、`Brian Blade Fellowship`／`Brian Blade & the Fellowship Band`、`Marcus Strickland's Twi-Life`、`Christian Scott aTunde Adjuah`——**全部查過，沒有一張是同碟；側人身分不影響掛名。**
2. **同名但不同盤的 Volume 碟**——0 筆（本組沒有帶 Vol. 的碟）。
3. **MB 把同一張碟建成兩個 RG**——**1 筆，而且是本批最重要的一筆**：The Blue Note 7（`7edc4d0d` vs `770967e1`，第 2187 條）。**其餘 19 個 rgMbid 互不重複、也與其他批不重複。**
4. **斜線掛名**——0 筆（本組沒有斜線 credit；c-160／c-161 的 Truffaz 斜線形是別批的事）。
5. **同名但不同盤**——逐筆核完**真的同碟 0 筆**：`Mercy`（撞 seed 的 Armand Hammer《Mercy》2025 與 Don Covay《Mercy!》1964）、`Mosaic`（撞 seed／c-138 的 Art Blakey and the Jazz Messengers《Mosaic》1962）、`Shift`（子字串撞 Commodores《Nightshift》）、`Passin' Thru`（維基消歧義頁列的 James Gang 1972／Chico Hamilton 1962 兩張，**池中皆無**）、`Team Aquatic`（子字串撞 seed 三張 Aqua）、`Live From Newport Jazz`（子字串撞 seed 的樂團 `Live`）、`STE`（三字母短盤名，**必須帶掛名與 `UCCJ-2123` 才有意義**）。

⚠ **撞陳列（第 738／859／845 條，內容重疊但不是撞卡）4 處**，四張卡的 `risk` 已互指：

| 本組的軌 | 池中的原版 |
|---|---|
| The Blue Note 7〈Mosaic〉 | **seed／c-138 `Art Blakey and the Jazz Messengers —《Mosaic》(1962)`** |
| Blue Note All-Stars〈Bayyinah〉 | **c-162 b `Lionel Loueke —《Heritage》(2012)`**（bluenote.com 逐字：`originally recorded on Loueke's 2012 album Heritage`） |
| Blue Note All-Stars〈Henya〉 | **c-162 a `Ambrose Akinmusire —《When the Heart Emerges Glistening》(2011)`**（bluenote.com 逐字：`which first appeared on his 2011 debut`） |
| Charles Lloyd〈Dream Weaver〉 | **seed `Charles Lloyd —《Dream Weaver》(1966)`**（bluenote.com 逐字：`the song was originally recorded on his first quartet's 1966 debut album of the same name`） |

**四處都是同一首曲子的不同次錄音、不是同一段母帶**（第 845 條）；`chk-prop` 的任何一道都不會亮。

---

## 第 2207 條（b 組）：**第 315 條結算**

**`prop-b.json` 20 筆 ＋ 本段退表 0 筆 ＝ 20 ＝ `slice.json` 的 `g === "b"` 筆數。✔**

### 退表（逐筆、附理由分類）

**本組退 0 張。** 逐類清點：**撞池 0**（第 2206 條五種盲區掃完，真的同碟 0 筆）／**判為合輯 0**（第 2198 條）／**非 Album 形態（EP／Single）0**（20 張的軌數與總長都在 Album 區間，最短的是 James Carter 的 6 軌 54 分）／**非 Blue Note imprint 0**（第 2201 條 20 張全過閘）／**原盤他廠改判 0**（本段全是 1985 後的首發盤，沒有再發盤混入）／**曲風 0**（第 1559 條的兩張邊界張都收）／**非爵士 0**。

⚠ **a 組退了 1 張（Dr. John《Sippiana Hericane》，EP），b 組退 0**——**兩組合計 41 張＝收 40／退 1，與 `slice.json` 的 41 筆對得上。**
⚠ **a 組第 2127 條的 EP 裁定（EP 一律不收）本組沒有機會適用**，但**本組認可該裁定並沿用**：b 組 20 張沒有任何一張是 EP 形態。

---

## 第 2208 條（b 組，**⚠ 派工信與原文／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與它們牴觸，以它們為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到四處，其中兩處主線已在任務中途自行來信更正。**

### （一）⚠ ⚠ 第三節第 4 點把第 307 條寫窄了——**主線已在任務中途更正，本條記下更正後的版本**

派工信逐字：「**Glasper 圈的掛名要照池中先例（第 307 條）：……池中已有卡的一律沿用既有字串，絕不新造分裂。**」
**照這句字面執行，`Erik Truffaz Quartet`／`Kenny Barron Quintet`／`The Charles Lloyd New Quartet` 三張都會被收攏成裸名。**

**但第 964／196／197 條明文允許且要求「個人字串與群組字串並存、不收攏」**，**c-168 第 2078 條已把它定成本線（c-168／c-169／c-170）的統一規則**，**同批 a 組第 2128／2129 條也照這個方向判了五個字串**。
**主線在本棒進行中已來信更正**（逐字：「我那句話寫錯了，以原文為準」）。**本棒照更正後的規則走**——見第 2193／2194／2195 條。
**→ 這一句的正確版本是：「掛名照 MB RG artist-credit 原樣寫；MB 的群組實體與池中既有的個人字串是兩個不同實體時，兩個字串並存。」**

### （二）⚠ 第三節第 4 點的 Glasper 圈名單有一個字串在池中根本不存在

派工信逐字列出「`R+R=NOW`、`Chris Dave and The Drumhedz`、`Kendrick Scott Oracle`、`Otis Brown III`、`Logan Richardson`——**池中已有卡的一律沿用既有字串**」。
**實掃：這五個字串在 seed 17,248 列 ＋ cards 5,806 張 ＋ 各批 prop 5,512 張裡，全部 0 命中。**
**「池中已有卡」的是他們的**側人**——Glasper、Hodge、Loueke、Akinmusire——**不是這五個掛名本身。** 本組因此是**五個全新字串**，沒有可沿用的先例，也就沒有分裂風險。

### （三）⚠ 第三節第 7 點把 `Passin' Thru` 的年份寫成 2018、且把它寫成「Montreux 現場」

- **年份**：派工信與 `slice.json` 的 `year` 欄都寫 2018，**正確是 2017**（第 2196 條，四層來源）。⚠ **`slice.json` 的 `note` 欄自己寫的是「2017 這張《Passin' Thru》缺」——列舉檔前後矛盾。**
- **場次**：派工信逐字「`The Charles Lloyd New Quartet《Passin' Thru》2018` ⋯⋯ Montreux 現場」；**bluenote.com 逐字說只有第 1 軌〈Dream Weaver〉錄於 Montreux，其餘六軌錄於聖塔菲的 The Lensic**（第 2199 條）。

### （四）⚠ ⚠ 派工信第四節第 1 點的「實掃卡池」漏了一種 Discogs 查法——主線已在任務中途補下來

派工信第四節第 1 點只要求「實掃卡池」與跨批去重，**沒有規定 Discogs 要怎麼掃**；本棒原本只跑 `barcode=` 反查。
**主線 2026-09-19 從 a 組的 `Scolohofo《Oh!》` 查出這個缺口並來信要求補跑第二種掃描**（`artist=<掛名>&release_title=<盤名>&per_page=50`），**b 組補跑後 2 張改年份、18 張補出 MB 沒建的版本**（第 2209 條）。
**→ 建議把這一句寫進簡報第三節，成為固定動作。**

### ⚠ 另記三句不算牴觸、但與實況有出入的

- 派工信第三節第 5 點說第 1250 條「本線已應驗七次」——**本組又多 6 次**（第 2202 條），**而且多出一種相反方向的形狀：條碼號段看起來像 2014 年、碟其實是 2018 年的**（Chris Dave）。
- 派工信第三節第 7 點說《Passin’ Thru》是 2018——**第二種掃描下八筆 Discogs 條目（含日版）逐字全是 2017**，改判更硬了（第 2196 條）。
- 簡報第三節第 4 點說「這一段店面命中率應該很高（現役目錄）」——**本組確實高**（20 張只有 1 張 `search` 全空、0 張四種查法全空，與 a 組的 6 張全空相比落差很大），**但 CAA 反過來很差：15／20 有圖，其中只有 6 張的來源是原盤或唯一版本，5 張 404**（第 2205 條）。

### ⚠ 給主線的兩個回頭查建議

1. **`Kendrick Scott Oracle《A Wall Becomes A Bridge》(2019)`**（bluenote.com 藝人頁逐字點名的第二張 Oracle 專輯）**不在 c-169 的 slice 上**——**建議回列舉檔查它有沒有被同一個「讀藝人端曲風」的缺口漏掉。**
2. **`The Blue Note 7` 的重複 RG `770967e1`（掛 `Compilation`）在列舉檔裡有沒有被當成另一張碟切出去**——**建議比對 `enum/blue-note.json`。**

## 第 2209 條（b 組，**新立；主線 2026-09-19 從 a 組帶下來的查法缺口，在 b 組再次應驗**）：**「掃過 Discogs 原壓群」不等於「用 MB barcode 反查過」——20 張補跑第二種掃描，2 張改年份、18 張補出 MB 沒建的版本**

### 缺口的形狀

**第一種查法**（本棒原本跑的）：拿 **MB 每一筆 release 的 barcode** 去 `api.discogs.com/database/search?barcode=…` 反查。
**盲點**：**MB 沒建的版本沒有 barcode 可拿，於是那一版永遠不會出現在結果裡。** a 組的 `Scolohofo《Oh!》` 就是這樣漏掉日版 `TOCJ-66204`（`released` 逐字 `2002-12-26`）而把年份記成 2003。

**第二種查法**（補跑的）：`api.discogs.com/database/search?artist=<掛名>&release_title=<盤名>&type=release&per_page=50`，**拉全 release 列表**。

### b 組 20 張的結果

| 結果 | 張 | 名單 |
|---|---:|---|
| ⚠ ⚠ **改年份** | **2** | **The Blue Note 7 2009→2008**（日版 `TOCJ-66466`，`released` 逐字 `2008-12-26`）／**Logan Richardson 2016→2015**（日版 `UCCQ-1044` SHM-CD，`released` 逐字 `2015-10-14`）——**兩筆 MB 都沒建日版** |
| **補出 MB 沒建的版本、但年份不變** | **16** | Ruben Hein（荷版黑膠）／Musica Nuda《Complici》（義版黑膠、法版 CD、FLAC）／Erik Truffaz（法版黑膠、2016 Parlophone 再發 LP、Repress、FLAC）／The Northern Governors（芬蘭黑膠）／Musica Nuda《Banda larga》（歐版黑膠、法版 CD、Trecolori、Edel）／Otis Brown III（**日版 `UCCQ-1020`** ＋美版黑膠）／Kendrick Scott Oracle（**美／歐／日三個實體 CD**——MB 只建了數位）／Sunaga t Experience（2022 黑膠的 catno 逐字 `PROZ7-910/1`，與 MB 的 `PROZ-7910/1` 連字號位置不同）／Aron Ottignon（法國宣傳 CDr）／Blue Note All-Stars（**日版 2 CD `UCCQ-1072/3`** ＋美歐兩款黑膠＋宣傳 CDr）／Chris Dave（**日版 `UCCQ-1078`** ＋美歐兩款黑膠＋**2017 宣傳 CDr**）／Kenny Barron Quintet（法國宣傳 CDr、AIFF）／R+R=NOW（**日版 `UCCQ 1085`** ＋美歐兩款黑膠＋數位＋宣傳 CDr）／Charles Lloyd（**日版 `UCCQ-1071`** ＋兩款黑膠＋宣傳 CDr＋FLAC）／Sarah McCoy（黑膠、宣傳 CDr）／James Carter（德國版 CD） |
| **Discogs 上只有 MB 已有的版本** | **2** | Emma Salokoski & UMO（1 筆）／Jon Cowherd（1 筆，**而且沒有 barcode——第二種掃描是本張唯一能跑的 Discogs 查法**） |

**→ 20 張裡 18 張有 MB 沒建的版本，其中 6 張有 MB 沒建的日版，2 張的日版早於歐美而改了年份。**

### ⚠ 兩條副產物

1. **`Unofficial Release` 在本組出現 3 次**：Erik Truffaz 俄版 `28774099`、Logan Richardson 俄版 `8444720`、Charles Lloyd 俄版 `11137083`。**依 a 組的結論一律不當年份依據**（三筆的 catno／barcode 都是照抄歐版，最容易被第一種 barcode 查法撈進來當「原壓」）。
2. **列舉檔的 `catno` 又錯一格**：**Ruben Hein 的 `50999 9174741 9` 其實是荷蘭黑膠 `5278992` 的目錄號，CD `2983088` 是 `50999 9174742 6`**——**第 1250 條的同一族，只是這次錯的不是位數而是載體。**

### → 給後批的固定動作

**年份定案前，兩種 Discogs 查法都要跑**：
1. `barcode=<MB 每一筆 release 的 barcode>`（抓得到 MB 已建版本的細節）；
2. **`artist=<掛名>&release_title=<盤名>&per_page=50`（抓得到 MB 沒建的版本，尤其日版）。**
**只跑第一種，「掃過 Discogs 原壓群」這句話是假的。**
⚠ **掛名字串要用店面／Discogs 那一種**：本組 `Charles Lloyd New Quartet` 用卡上的 `The Charles Lloyd New Quartet` 查會回 **0 筆**，改用 `Charles Lloyd` 才回 8 筆。

---

# c-169 **a 組研究層（20 張，2000–2009）** 裁定　2026-09-19

*（編號 2851–2900 為 a 組研究層專用區間。本段以 append 寫入，未動前面第 1557–1560-AE 條、a 組策展第 2126–2149 條與 b 組策展第 2186–2209 條。）*

## 第 2851 條（a 組研究，**總表**）：**20 張全部 `full`；232 條 facts、每張 11–12 條；每張至少 2 個不同來源網域**

| | 值 |
|---|---|
| 交件張數 | **20／20**，`status` 與 `coverage` 兩欄並存同值，全部 `full` |
| facts 條數 | **總 232 條**；分佈 **11 條 8 張、12 條 12 張**（規定 8–12） |
| `hookCandidates` | 每張 **2 條**，無超額 |
| src 網域 | `discogs.com` 138／`en.wikipedia.org` 24／`musicbrainz.org` 20／`de.wikipedia.org` 7／**`bluenote.com` 6**／`fi.wikipedia.org` 4／`it.wikipedia.org` 4／`thierrylang.ch` 3／`fr.wikipedia.org` 3／`debaser.it` 3／其餘 11 個網域各 1–2 條 |
| 每張的不同網域數 | **最少 2（Brisa Roché）、最多 5（Juliano Rossi）**，全部達到 manifest gate 的「至少兩個 HTTPS 來源」 |

**派工信第三節第 1 點要求的「把 `api.discogs.com/releases/<id>` 的整筆逐軌 credits 當主力」已照做**：本層逐筆拉了 **27 個 Discogs release 的完整 JSON**（不是 `search` 摘要），本批 20 張裡**有 13 張的主故事是從整筆 credits 的 `extraartists` 或逐軌 `written-by` 欄挖出來的**——**`search` 的 `extraartists` 只回前四筆，這 13 條裡沒有一條會出現在前四筆裡。**

---

## 第 2852 條（a 組研究，**派工信第三節第 3 點指定必查的那一件；查證完成**）：**`Θάνος Μικρούτσικος《Music Stories》` 的 7–9 軌確實是 1985 年的〈Duo〉，最早發行在 1986 年的希臘盤——但「是否同一份母帶」無法鎖死**

| 項 | 逐字 |
|---|---|
| 本盤 notes（Discogs 3264997） | **`Tracks 7 to 9 recorded at the "Action" studio in 1985`** |
| 本盤 7–9 軌的演出者 | **`David Lynch (3)=Alto Saxophone(7 to 9)`／`Giorgos Fakanas=Electric Bass(7 to 9)`** |
| **1986 年那張（Discogs 9204561）** | **`Thanos Mikroutsikos — Duo For Alto Saxophone And Electric Bass / Opera For One`，label 逐字 `Εταιρία Νέας Μουσικής`，catno `CP 91019`，Greece，Vinyl LP，1986** |
| **該盤 A1 面逐字** | **`Duo For Alto Saxophone And Electric Bass` 14:48，演出者逐字 `David Lynch (3)=Alto Saxophone`／`Giorgos Fakanas=Electric Bass`** |
| 旁證 | **`jazzlibrary.gr` 的 Giorgos Fakanas 個人頁把 1986 年那張列在他的參與作品裡**；英文維基的 Μικρούτσικος 器樂作品目錄逐字含 **duets for saxophone and electric bass** |

**結論（三句，正文請照這三句寫）**：
1. **7–9 軌是 1985 年錄的，不是 2001 年。**（盤面 notes 逐字。）
2. **這套作品最早以 1986 年的希臘盤《Duo For Alto Saxophone And Electric Bass / Opera For One》問世，演出者是同樣兩位。**
3. ⚠ **不得斷言「就是 1986 年那張的同一條母帶」**：1986 年 LP 把它收成**單一段落 14:48**，本盤拆成三個樂章共 **16:26**（9:26 ＋ 5:05 ＋ 1:55），差 **1 分 38 秒**；兩邊的 notes 都沒有寫母帶來源，沒有任何一層能把「同一份錄音」鎖死。**保守寫法：「第 7 至 9 軌是 1985 年的錄音，這套二重奏最早以 1986 年的希臘盤問世。」**

⚠ **策展層第 2141 條的 (丁) 判定不受影響**：主體六軌是 2001 新錄音、2003 首發，`releaseType` 仍是 `Album`。
⚠ **另補一格策展層沒寫的**：**Gary Burton 的 credits 欄逐字只涵蓋第 1 至 6 軌**（`Vibraphone(1 to 6)`），7–9 軌完全沒有他——這比策展層第 2131 條「Burton 是獨奏者不是共同領班」更硬。

---

## 第 2853 條（a 組研究，**推翻策展層的逐筆清單：9 處，分佈在 9 張卡**）

| # | 卡 | 策展層寫的 | 查證結果 | 條 |
|---|---|---|---|---|
| 1 | **Paolo Fresu Quintet《Kosmopolites》** | 「整張 15 軌**全部**是鋼琴手 Roberto Cipelli 的作品」 | ❌ **末軌〈Lascia Ch'io Pianga〉是 Händel 的詠嘆調**，兩份義大利樂評逐字點名這是唯一例外 | 2854 |
| 2 | **同上** | 「這套系列⋯⋯**三張**同形」 | ❌ **樂評逐字 `una serie di cinque dischi`（五張）**，計畫橫跨三年 | 2854 |
| 3 | **Paolo Fresu Quintet《Thinking》** | 「12 軌 60 分鐘**全部**是鼓手 Ettore Fioravanti 的作品」 | ❌ **第 10 軌〈Danza Della Fata Dei Confetti (da "Lo Schiaccianoci")〉是柴可夫斯基《胡桃鉗》的〈糖梅仙子之舞〉** | 2855 |
| 4 | **High Five Quintet《Five for Fun》** | 「收了 **Kenny Dorham** 的〈Ojos de Rojo〉與 **Woody Shaw 系**的〈Inception〉」 | ❌ **兩筆 Discogs 條目的逐軌 written-by 逐字是 `Cedar Walton` 與 `McCoy Tyner`** | 2856 |
| 5 | **Brisa Roché《The Chase》** | 「美版拿掉**三段**〈Intermission〉」（第 2136 條） | ❌ **法版原壓只有兩段**〈Intermission 1〉0:48 與〈Intermission 2〉0:49 | 2857 |
| 6 | **Thierry Lang《Guide Me Home》** | 「Discogs 那 15 軌的**差額未核**」（第 2136 條） | ❌ **不是版本差異**：Discogs 的 15 列裡有兩列是標題列（`Guide Me Home`／`Bonus Cd`），實際曲目就是 9 ＋ 4 ＝ 13 軌，與 MB 一致 | 2858 |
| 7 | **Juliano Rossi《Free Runner》** | 「`Oliver Perau` 是本盤的**作詞者兼製作夥伴**的個人名義」（第 2133 條 (丙) 訊號 3） | ❌ **Oliver Perau 就是 Juliano Rossi 本人的本名**（laut.de 逐字）。**過閘結論不變，理由要改** | 2859 |
| 8 | **Franco D'Andrea《The Siena Concert》** | 「只有 6 軌卻是 77 分鐘——平均一軌近 13 分鐘，等於把整晚的長篇即興原樣留下」 | ❌ **那 6 個編號每一個都是 medley**，底下共 **17 首**子曲；不是六首長篇即興 | 2860 |
| 9 | **Anna-Mari Kähärän Orkesteri** 同名盤 | 軌目抄 MB 寫成〈A Lynmouth **Window**〉 | ❌ **Discogs 芬蘭原壓盤面逐字〈A Lynmouth Widow〉**（寡婦） | 2861 |

⚠ **另有 5 處「不算推翻、但策展層整層沒查到主故事」**：
| 卡 | 策展層沒查到的那條 |
|---|---|
| **Trio Focan《standard a'la Turc》** | **Önder Focan 是第一位替 Blue Note 錄音的土耳其音樂家（1998《Beneath the Stars》）**，本作是同一條線的第三張；他還在本作出版的同一年（2002）開了伊斯坦堡的 Nardis Jazz Club |
| **Thierry Lang《Guide Me Home》** | **1996 年美國巡演途中認識 Queen 的經紀人 Jim Beach，Beach 成為他的經紀人，他因此成為第一位簽下 Blue Note 藝人合約的瑞士人**——這正是那張 Freddie Mercury 附碟的由來，Beach 本人掛本盤 executive producer |
| **Anna-Mari Kähärän Orkesteri** | **七首的歌詞整批取自英語詩人**（Robert Louis Stevenson／Charles Bukowski／Elizabeth Siddal／Lorna Crozier／Amelia Josephine Burr／June Faith），而且**小提琴家 Pekka Kuusisto 全程參與** |
| **Joona Toivanen Trio《Frost》** | **8 首的作曲是鼓手 Olavi Louhivuori 寫 1–4 軌、鋼琴手 Joona Toivanen 寫 5–8 軌**，一人一半 |
| **Brisa Roché《The Chase》** | **製作 Daniel Yvinec、混音 Scott Harding、編曲兼多樂器 Michael Leonhart**，以及 **Erik Truffaz 客座第 13 軌〈Coco〉** |

---

## 第 2854 條（a 組研究，**裁定**）：**《Kosmopolites》的系列是五張、末軌是 Händel——正文兩句都要改**

- **Händel**：debaser 與 allaboutjazz 的義大利文樂評都逐字寫「唯一的例外是 Georg Friedrich Händel 的〈Lascia ch'io pianga〉」，且它是**收尾曲**。Discogs 軌目第 15 軌逐字就是〈Lascia Ch'io Pianga〉。
- **五張**：debaser 逐字 `una serie di cinque dischi, ciascuno dedicato alla musica scritta da uno dei componenti del gruppo`，並寫計畫橫跨三年。**五重奏五個人、一人一張，數字自洽。**
- ⚠ ⚠ **引用 debaser 那頁時只能取這兩點**：**該頁把團員名字寫錯了**（`Bruno Cipelli`／`Furio Zanchi`／`Adriano Fioravanti`／`Andrea Tacanna`）。編制一律照 Discogs 3412494 的盤面 credits：**Paolo Fresu 小號、柔音號、效果器｜Tino Tracanna 次中音與高音薩克斯風｜Roberto Cipelli 平台鋼琴｜Attilio Zanchi 低音提琴｜Ettore Fioravanti 鼓**。
- **可逆**（只動 facts 與正文措辭，不動卡池結構）。

---

## 第 2855 條（a 組研究，**裁定**）：**《Thinking》第 10 軌是柴可夫斯基；Discogs 的 credits 欄有兩處不可照抄**

- **第 10 軌盤面曲名逐字 `Danza Della Fata Dei Confetti (da "Lo Schiaccianoci")`**——《胡桃鉗》的〈糖梅仙子之舞〉。**與《Kosmopolites》的 Händel 是同一種安排：兩張各留一首古典曲當外來物。**
- ⚠ **Discogs 5148183 的 credits 欄兩處錯，不得照抄**：
  1. **`Attilio Zanchi=Contrabassoon`**（低音管）——Zanchi 是低音提琴手，《Kosmopolites》同一份編制逐字是 `Contrabass`。
  2. **`Paolo Fresu=Flugelhorn, Trombone`**（長號）——Fresu 吹小號與柔音號，《Kosmopolites》逐字 `Trumpet, Flugelhorn, Effects`。
  **→ 給後批：同一個編制的兩張碟，credits 欄要交叉比對；單張的樂器欄會錯。**
- ⚠ 第 2 軌盤面拼作〈DB Tinking〉（少一個 h），照盤面抄。

---

## 第 2856 條（a 組研究，**裁定**）：**《Five for Fun》的兩首外來曲是 Cedar Walton 與 McCoy Tyner，不是 Kenny Dorham 與 Woody Shaw**

**Discogs 義版 16217874 與日版 4149843 兩筆條目的逐軌 `written-by` 欄逐字**：
- 第 2 軌〈Ojos De Rojo〉＝ **`Cedar Walton`**
- 第 7 軌〈Inception〉＝ **`McCoy Tyner`**

**兩筆獨立條目一致，策展層那兩個名字沒有任何一層支撐。正文不得寫成 Kenny Dorham 或 Woody Shaw。**
⚠ 另補：**標題曲〈Five For Fun〉的作者欄逐字掛五個人**（全團集體創作），其餘由團員分寫；日版 bonus 兩首是 **Joe Henderson〈A Shade Of Jade〉** 與 **Antonio Carlos Jobim〈Ligia〉**。
⚠ 第 8 軌兩版拼法不同：義版〈Evan's Even〉、日版〈Evan' Seven〉。
⚠ **Fabrizio Bosso 同時是本卡的領班與本組第 15 筆 `Alice Ricciardi《Comes Love》` 的客座小號**——同年、同廠牌、同國，**兩張卡的 `risk` 應互指**（第 738／859 條的撞陳列型態，但那是客座不是同碟）。

---

## 第 2857 條（a 組研究，**更正第 2136 條的一格**）：**《The Chase》法版只有兩段〈Intermission〉**

**Discogs 法版原壓 1285705 的軌目逐字**：第 8 軌〈Intermission 1〉0:48、第 12 軌〈Intermission 2〉0:49，**沒有第三段**。
美版 36180364 的 17 軌是**把這兩段拿掉、並把隱藏軌〈Ride 600〉提成第 12 軌**。
法版第 18 個編號拆成 **18a〈Now That It's Long Over〉4:05 ／ 18b 靜默 0:25 ／ 18c〈Ride 600〉3:55**，notes 逐字 `CD contains hidden track "Ride 600"`。

⚠ **本卡最強的一條新事實**：**第 13 軌〈Coco〉的小號客座逐字是 `Erik Truffaz`**——池中 `Erik Truffaz` 這個字串有 12 張碟（c-154～c-166），**這是本線第一次出現「池中藝人以客座身分出現在另一張卡上」**。不是撞卡（不同碟、不同掛名），但下游寫作層若要用，要寫成客座。
⚠ 另補：製作與編曲 **Daniel Yvinec**、混音 **Scott Harding**（紐約）、母帶 **Greg Calbi**（Sterling Sound）、編曲兼多樂器 **Michael Leonhart**；第 3 軌〈Dans Le Vert De Ses Yeux〉的作者逐字是 **Adamo（Salvatore Adamo）**。

---

## 第 2858 條（a 組研究，**解掉第 2136 條的一格懸案**）：**《Guide Me Home》的「Discogs 15 軌」是計數方式，不是版本差異**

Discogs 瑞士原壓 3987761 的 `tracklist` 陣列有 15 個元素，**但其中兩個是 `position` 為空的標題列**（逐字 `Guide Me Home` 與 `Bonus Cd`）。
**扣掉這兩列，實際曲目就是 1-1～1-9（9 軌）＋ 2-1～2-4（4 軌）＝ 13 軌，與 MB 的 9 ＋ 4 完全一致。**
**日版 TOCJ-66099（Discogs 6474752）是同樣 13 首，只是連號成 1–13 收在單片上。**

**→ 給後批（新立一句）：Discogs 的 `tracklist` 陣列含 `type_=heading` 的標題列，逐張比軌數前必須先濾掉 `position` 為空的元素；本線已有兩次因此誤報版本分歧（本卡與 `Alice Ricciardi` 日版的 15 列）。**

⚠ 本卡的主故事另見第 2853 條下半：**Jim Beach → Blue Note → Freddie Mercury 附碟**這條線策展層四層都沒查到。
⚠ 錄音是 **1999-12-11 奧斯陸 Rainbow Studio**、**Jan Erik Kongshaug 錄音與混音**、Lang 彈 Steinway D——這三格也是策展層沒有的。
⚠ 標題曲〈Guide Me Home "Jazz"〉的原曲是 1988 年《Barcelona》裡 Freddie Mercury 與 Mike Moran 合寫的〈Guide Me Home〉。

---

## 第 2859 條（a 組研究，**更正第 2133 條 (丙) 訊號 3 的理由**）：**`Oliver Perau` 就是 Juliano Rossi 本人**

laut.de 的藝人頁逐字：**`Juliano Rossi aka Oliver Perau erblickt 1970 in Hannover das Licht der Welt`**。
**→ Apple ℗ 欄的 `℗ 2009 Oliver Perau` 是「藝人本人名義」，不是策展層寫的「作詞者兼製作夥伴的個人名義」。**
**過閘的結論完全不變**（第 1748 條第一種假陽性），**但理由要改**——正文若照策展層寫成「製作夥伴」會是事實錯誤。

⚠ **本卡的主故事也因此浮出來**：Perau **十七歲創了漢諾威搖滾團 Terry Hoax**（1988 成立、1996 解散前演過約 600 場，翻唱的〈Policy of Truth〉一度是 MTV 上播放次數最多的德國樂團錄影帶），**2003 年前後才改用 Juliano Rossi 這個藝名唱搖擺樂**。
⚠ 盤面 notes 的 `composed by Oliver & Lutz Krajenski` 裡的 `Oliver` 指的就是 Perau 自己——**這張碟的詞曲他都有份，署的是本名。**
⚠ 網路上另有「以第三位德國音樂家的身分簽進 Blue Note」的說法，**只在搜尋摘要層出現、找不到可開啟的一手頁面，未寫進 facts**（第 48 條「某廠牌史上第一張一律反查」的同一條規矩）。

---

## 第 2860 條（a 組研究，**補齊第 2139 條要求研究層補的那一格，並更正曲目形狀**）：**《The Siena Concert》演出日是 2006-07-26；六個編號其實是六段 medley、共 17 首**

- **完整 notes（策展層那邊被截成 `July 26t`）逐字**：`The concert was recorded live on July 26th 2006 at "Enoteca Italiana" during "Enoteca Jazz Club Festival" 12th Edition, organized by "Siena Jazz Foundation"`。**演出年 2006、發行年 2008，正文可以寫演出日期了。**
- ⚠ **形狀更正**：Discogs 2936002 的 6 個編號**每一個的 `title` 欄逐字都是 `Medley`**，底下共 17 首 `sub_tracks`：
  | 段 | 長 | 子曲 |
  |---|---|---|
  | 1 | 27:25 | Into The Mystery／Riff／Dancin' Thirds／Six Bars／Dancing Colours |
  | 2 | 12:16 | Monodic／Afro Abstraction／Deep |
  | 3 | 6:41 | Fragole／Monodic |
  | 4 | 12:50 | Slow Five／Another Riff |
  | 5 | 7:33 | Old Time Blues／**Goodbye Pork Pie Hat（1:00）** |
  | 6 | 10:15 | Altalena／March |
  **→ 不是「六首長篇即興」，是「六段連奏」。〈Monodic〉在整場出現兩次。Mingus 的〈Goodbye Pork Pie Hat〉只有 1 分鐘、是第五段的收尾而不是獨立一軌。**
- ⚠ **後製由樂團內部完成**：貝斯手 Aldo Mella 兼任剪輯與母帶。
- ⚠ D'Andrea 的 2010 年 Musicien Européen de l'année 與 2011 年 Italian Jazz Awards 榮譽獎**晚於本作且與本作無關**，依反向禁令未寫進 facts（只在 notes 記一筆）。

---

## 第 2861 條（a 組研究，**曲名更正 ＋ 主故事補上**）：**Anna-Mari Kähärän Orkesteri 同名盤**

- **曲名兩處更正**（策展層 `why` 與 `mbNote` 抄 MB 軌目）：〈A Lynmouth **Window**〉→ **〈A Lynmouth Widow〉**；〈Love is in your heart〉→ 盤面逐字 **〈Love Is In Your Heart〉**。
- **主故事（策展層整層沒有）**：**七首全部由 Kähärä 作曲，歌詞則整批取自英語詩人**——Robert Louis Stevenson（〈Requiem〉）、Amelia Josephine Burr（〈A Lynmouth Widow〉）、Charles Bukowski（〈War〉）、Lorna Crozier（〈So This Is Love〉）、Elizabeth Siddal（〈Dead Love〉）、June Faith（〈Love Is In Your Heart〉）。
- **第二格主故事**：**小提琴家 Pekka Kuusisto** 在盤上掛小提琴、電小提琴、電小提琴貝斯與曼陀林，還參與人聲——芬蘭最知名的小提琴家全程參與一張 Blue Note 爵士盤。
- **發行日補上 2005-03-30**（策展層只有年份，Apple 查無、MB frd 也只有年份）。
- **獎項逐項分開**：Yrjö 獎（2002-11，**得獎**，第一位獲此獎的女性）、芬蘭獎 Suomi-palkinto（2002-12，**得獎**）——**兩者都是給本人、不是給本作**；**Jazz-Emma（2005，提名，未得獎）** 才是本作的。

---

## 第 2862 條（a 組研究）：**《Frost》的作曲分工是一人一半；整張的製作其實都在瑞典**

- **Discogs 1024748 的逐軌 written-by 欄逐字**：**`Olavi Louhivuori=Written-By(1 to 4)`／`Joona Toivanen=Written-By(5 to 8)`**——鼓手寫前半張、鋼琴手寫後半張。**策展層只把 Louhivuori 寫成「後來成為北歐即興圈的主力」，沒發現他在本盤就寫了一半。**
- **錄音在瑞典 Kållered 的 Nilento Studio、混音與母帶在哥德堡 Studio Bunkern，三項全由 Johannes Lundberg 一人完成**——這張芬蘭 Blue Note 盤的製作整個在瑞典。
- **三人是童年在 Jyväskylä 認識、1990 年代中期還是少年時就成團，本作是第三張而不是首作。**
- ⚠ 封面設計 Janne Uotila 與 U-Street All Stars 兩張是同一位——**本組四張芬蘭盤（U-Street ×2、Joona Toivanen、Anna-Mari Kähärä）共用的側人不只 J-P Virtanen（行政製作）還有這一位。**

---

## 第 2863 條（a 組研究，**年份：對第 2132 條（一）提出反證，但建議維持改判**）：**`Jackie Allen《Tangled》` 仍取 2006**

**新查到的反證一條**：**英文維基的 Jackie Allen 條目逐字把《Tangled》寫成 `Released in 2004`**，與 Discogs 英版條目的年份欄、MB frd 同向。

**但策展層第 2132 條的四項依據本層逐項覆核，一項都沒被推翻**：
1. Apple us／gb／de 三店同一 id 716517015，℗ 逐字 2006 Blue Note Records；
2. 美版 Discogs 10798559 的年份欄 2006、℗© 與製造欄逐字 `Blue Note Records`；
3. 目錄號 30080／30081 連號＝同一次配號，`0946 3 xxxxx 2 x` 段是 2005 年以後才啟用（同組佐證兩筆）；
4. **兩版的 12 軌軌目與軌長逐秒相同**（本層逐軌比對過），是同一張碟的兩地發行。

**裁定：維持 2006。** 維基那一句沒有引註，且與它自己引的 Thom Jurek 評論（AllMusic，2006）矛盾。**可逆**（只動 `year`）。
⚠ **`risk` 請保留一句**：「英版可能 2004 年就在英國上市，本卡取全球零售年 2006」——本機端若拿到 2004 年英國的紙本或榜位，改回即可。
⚠ **另補兩格策展層寫偏的**：(一) 鋼琴不是只有 Laurence Hobgood，**Ben Lewis 彈的軌數還比較多**（第 1、2、4、6–8、10 軌 vs Hobgood 的第 3、9、11、12 軌）；(二) **Donald Fagen 的那一首是〈Do Wrong Shoes〉**，〈Solitary Moon〉的作曲是 **Johnny Mandel**。

---

## 第 2864 條（a 組研究）：**獎項逐項分「入圍／得獎」——本組查到 11 項，全部標明歸屬與年份**

| 卡 | 獎 | 年 | 入圍／得獎 | 給誰 |
|---|---|---|---|---|
| Anna-Mari Kähärän Orkesteri | Yrjö 獎（芬蘭爵士聯盟） | 2002-11 | **得獎**（第一位女性） | **本人** |
| 同上 | 芬蘭獎 Suomi-palkinto | 2002-12 | **得獎** | **本人** |
| 同上 | **Jazz-Emma** | **2005** | **提名（未得獎）** | **本作** |
| Alice Ricciardi | Montreux Jazz Festival International Vocal Competition | 2005-07 | **第二名**（不是首獎） | 本人 |
| Paolo Fresu ×2 | 《Musica Jazz》最佳義大利音樂家／最佳樂團／最佳唱片 | 1990 | **得獎** ×3 | 本人與五重奏 |
| 同上 | Bobby Jaspar 獎（Académie du Jazz）／Django d'Or 最佳歐洲爵士音樂家 | 1996 | **得獎** ×2 | 本人 |
| Paolo Fresu《Thinking》 | Nastro d'Argento 最佳配樂 | 2004 | **得獎** | 本人（電影配樂，與本作同年錄音） |
| High Five Quintet | 《Musica Jazz》最佳新人 | 1999 | **得獎** | Fabrizio Bosso 本人 |
| Musica Nuda《55/21》 | **Premio Tenco（interpreti 類）／MEI 最佳義大利巡演** | **2006** | **得獎** | ⚠ **給的是《Musica nuda 2》那張，不是本作** |
| Kitty Hoff | Lale Andersen 獎 | 2008 | **得獎** | 本人（本作前一年） |
| 同上 | 柏林全國歌唱比賽香頌／歌曲組 | — | **兩度首獎** | 本人 |

⚠ **「本作本身拿到獎」的只有 0 張**：20 張裡沒有任何一張查到頒給該專輯的獎項，Anna-Mari 那張是**提名**。**正文不得把藝人的生涯獎項寫成這張碟的獎項**——Musica Nuda 那一格最容易寫錯（得獎的是前一張）。

---

## 第 2865 條（a 組研究）：**「某某第一張／第一位」一律反查——採用 2 筆、退掉 2 筆**

| 宣稱 | 反查 | 處置 |
|---|---|---|
| **Önder Focan 是第一位替 Blue Note 錄音的土耳其音樂家（1998《Beneath the Stars》）** | 英文維基條目逐字寫明，且與池中 c-153 b／c-155 b 那兩張（1998／1999）的年份對得上 | ✔ **採用** |
| **Thierry Lang 是第一位簽下 Blue Note 藝人合約的瑞士人（1996）** | 他自己的官網傳記逐字 `le premier musicien suisse à obtenir un contrat d'artiste avec le célèbre label Blue Note`，與 1996 年首張同名專輯的時序對得上 | ✔ **採用**（並在 facts 寫成「第一位與 Blue Note 簽下藝人合約的瑞士音樂家」，不寫成「第一張瑞士碟」） |
| Alice Ricciardi 是「第一位在 Blue Note 錄音的義大利爵士女歌手」 | 廠牌官網無此頁；只在義大利媒體的轉述層出現，jazzitalia 的個人傳記整段沒有提到 Blue Note | ❌ **不寫進 facts** |
| Kitty Hoff 是「Blue Note Germany 的第一位德國女性簽約者」 | 只在搜尋摘要層出現，德文維基與 Discogs 都沒有；Blue Note Germany 本身是分支標記而非獨立廠牌，這個宣稱的分母定義不清 | ❌ **不寫進 facts** |
| Juliano Rossi「以第三位德國音樂家的身分簽進 Blue Note」 | 只在搜尋摘要層出現，laut.de 的藝人頁與唱片評論都沒有這一句 | ❌ **不寫進 facts** |

**→ 本條是第 48 條（「某廠牌史上第一張一律要反查廠牌沿革」）在本批的第五次應驗；五筆宣稱只有兩筆站得住。**

---

## 第 2866 條（a 組研究，**③ 來源層各查法命中率**）

| 查法 | 命中 | 說明 |
|---|---:|---|
| **`api.discogs.com/releases/<id>` 整筆** | **20／20** | **絕對主力**；27 個 release 全部 HTTP 200。**13 張的主故事來自 `extraartists` 或逐軌 `written-by`，而這些欄位在 `search` 摘要裡看不到**（`search` 的 `extraartists` 只回前四筆） |
| **`api.discogs.com/database/search?artist=…`（全 release 掃描）** | **1／1 需要時** | 只跑了 `Thanos Mikroutsikos` 一次（為了找 1986 年那張），**一次就命中**（Discogs 9204561） |
| **MusicBrainz release-group／release 端點** | **20／20** | UA 一律 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；⚠ **一次 release 端點回傳非預期結構（`media` 缺）**，依第 259 條當「沒問到」處理、改用 Discogs，未寫成「MB 沒有」 |
| ⚠ **`bluenote.com` 專頁** | **2／20** | **派工信說「幾乎沒有專頁」——這一句對，但不是零**：`bluenote.com/artist/supergenerous/` 與 `bluenote.com/artist/scolohofo/` **兩張都有專頁，而且兩張的成軍故事只有官網有**（見第 2867 條） |
| **英文維基（作品條目或藝人條目）** | **7／20** | Scolohofo《Oh!》、Brisa Roché、Thierry Lang、Jackie Allen、Önder Focan、U-Street All Stars、Franco D'Andrea、Paolo Fresu、Thanos Mikroutsikos（9 個條目、7 張卡） |
| **各國語維基（de／fi／it／fr／tr）** | **6／20** | Kitty Hoff（de）、Terry Hoax（de）、Anna-Mari Kähärä（fi）、Musica Nuda 與 Ferruccio Spinetti（it）、Booster（fr）、Zindanı Taştan Oyarlar（tr） |
| **藝人／樂團官網** | **2／20** | `thierrylang.ch`（決定性的 Jim Beach 那一段）、`fabriziobosso.eu` |
| **當地樂評／樂迷資料庫** | **5／20** | `debaser.it`（Kosmopolites 的五張系列與 Händel）、`mescalina.it`（55/21 的 cabala）、`laut.de`（Juliano Rossi 兩頁）、`win.jazzitalia.net`（Alice Ricciardi 的 Montreux 名次）、`jazzfinland.fi`（Anna-Mari 樂團簡介） |
| **本層另外動用的路徑** | — | **`jazzlibrary.gr`**（希臘爵士資料庫，用來旁證 1986 年那張）、**`secondhandsongs.com`**（用來鎖〈Guide Me Home〉的原作者與原盤）、**`wejazzrecords.bandcamp.com`**（Joona Toivanen Trio 的成團年代）、**`barattelli.it`**（Musica Nuda 的成軍經過） |
| ⚠ **被擋下的** | — | **`allmusic.com` 與 `allaboutjazz.com` 全部回 HTTP 403**（各試兩次），本層一條事實都沒有從這兩站取得 |

**→ 給後批（新立一句）：`allmusic.com` 與 `allaboutjazz.com` 在雲端這條線會回 403，不要把它們排進查證路徑；當地語系的樂評站（debaser／mescalina／laut.de／jazzitalia）與藝人官網是本批真正可用的第四層。**

---

## 第 2867 條（a 組研究，**更正派工信與第 2138 條的一個印象**）：**`bluenote.com` 對本批不是「幾乎沒有專頁」，美國本部那兩張都有，而且只有官網有主故事**

派工信第三節第 1 點逐字：「**`bluenote.com` 對這些本地出品幾乎沒有專頁**」；第 2138 條也把店面覆蓋率整個下修。
**這一句對本批 18 張歐洲分支盤成立，但對美國本部那兩張不成立**：

| 頁 | 只有官網有的那一格 |
|---|---|
| **`bluenote.com/artist/supergenerous/`** | **兩人在一場 Town Hall 演出上結識、在 Baptista 位於紐澤西的車庫開始寫曲、構想是「替一部不存在的電影配樂」**；另有 Craig Street 的身分說明與兩人的合作名單 |
| **`bluenote.com/artist/scolohofo/`** | **這個組合 1999 年在蒙特婁爵士節成形、1999 與 2002 兩度巡演之後才進錄音室**；**Foster 與 Scofield 1980 年代初同在 Miles Davis 團、Lovano 與 Scofield 的交情回到 1970 年代的波士頓** |

**→ 給後批：本線的美國本部盤（不分年代）一律先試 `bluenote.com/artist/<slug>/`；歐洲分支盤才跳過這一層。** c-168 實測「18 張只有 1 張」與本批「20 張只有 2 張」的共同點不是年代，**是碟的出身地。**

---

## 第 2868 條（a 組研究）：**`qa-batch` 與字元自檢的結果**

```
cd desc-tools && node qa-batch.mjs research c169
  → a 20 full,full,full,…（20 個 full）
  → ⚠ key 集合與卡單不一致
  → 總標記 1
```
- ⚠ **那 1 個標記不是 a 組的**：`qa-batch.mjs` 第 211 行是**批次層**檢查（`[...all]` 對 `[...cardKeys]`），**b 組的 `c169-b.json` 還沒交件，40 個 key 只湊到 20 個，這個標記必然亮。a 組自己的三道（key 不在卡單／src 不是完整 https／hookCandidates 超過 2）全部 0。**
- ⚠ **`互指?` 不會在 research 階段輸出**（第 1807-B 條），本層未據此判斷。
- **字元自檢用程式跑，不用眼睛掃**（第 1808-B 條）：
  - 逐字掃 Cyrillic／Greek／Hangul／Kana／Devanagari／Arabic／Hebrew 七個字集：**只有 Greek 命中**，內容是 **`Θάνος Μικρούτσικος`（掛名）與 `Εταιρία Νέας Μουσικής`（1986 年那張的希臘廠牌名）**——兩者都是專名，依 research-base 字元條「專名本身就用非拉丁文字時合法且必須照原文保留」**合法**。
  - 簡體字：拿約 2,300 字的簡化字表逐字比對，命中 `只`／`向`／`游` 三個，**逐字覆核全部是正體字**（`只`＝副詞「僅」、`向`、`下游`），**真簡體 0 字**。
  - 日文新字體（`楽沢`等）：**0 字**。
  - 千分位逗號：**0 處**。
  - CJK 旁的半形逗號：**0 處**。
- **schema 自檢**：20 張、`key` 與卡單逐字相同且順序相同、`artist`／`album` 逐字相同、`status` 與 `coverage` 兩欄並存同值、每張 `hookCandidates` 2 條、每條 `src` 皆 `^https://` 完整網址、**每張至少 2 個不同來源網域**。

⚠ **本批有希臘文、芬蘭文、義大利文、土耳其文、法文、德文專名**，變音符與特殊字母（`ä ö å é è ê ç ñ ı ş ğ ü`）一律照原文保留、未做任何折換；`Franco D’Andrea` 的 U+2019 照卡單原樣。

---

## 第 2869 條（a 組研究，**⚠ 派工信與 base 檔／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與它牴觸，以它為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到三處**：

### （一）⚠ 第三節第 1 點：「`bluenote.com` 對這些本地出品**幾乎沒有專頁**」——對 18 張成立、對 2 張不成立

**`bluenote.com/artist/supergenerous/` 與 `bluenote.com/artist/scolohofo/` 兩頁都存在，而且是本批唯二能提供成軍故事的來源。** 照這句字面跳過官網，會漏掉這兩張的主故事。**正確版本見第 2867 條。**

### （二）⚠ 第三節第 2 點：「`Scolohofo《Oh!》` 2003→2002（日版 `TOCJ-66204`⋯⋯）」——改判正確，但派工信把日版寫成唯一依據，漏了一個反向事實

日版 `released` 逐字 `2002-12-26` 與 obi 的 `Advance release in Japan` 本層覆核成立；**但英文維基的作品條目逐字記美版 `January 27, 2003 (US) (CD)`**。兩者不衝突（日本先發、美國後發），**但正文寫「2002 年發行」時必須帶上「日本先發」四個字，否則會與所有英語資料對不上。**

### （三）⚠ 第三節第 6 點：「現場盤 1 張（`Franco D'Andrea《The Siena Concert》`，**四層一致**）」——四層一致成立，但派工信與第 2139 條都沒提到「這 6 軌其實是 6 段 medley」

**這不是牴觸，是漏**。但它直接影響正文：照「6 軌 77 分、平均一軌近 13 分鐘的長篇即興」去寫會是錯的（第 2860 條）。

### ⚠ 另記一句本信寫對、但方向要補的

- 派工信第三節第 1 點說「**請把 `api.discogs.com/releases/<id>` 的整筆逐軌 credits 當主力**」——**完全正確，而且低估了**：本批 **13／20 張的主故事**只存在於整筆的 `extraartists` 與逐軌 `written-by` 欄裡（策展層看的是 `search` 摘要與條目頁，所以第 2853 條那 9 處推翻有 6 處出在這兩個欄位上）。
- 派工信第三節第 5 點列的「MB 缺口 5 筆」**全部覆核成立**，本層沒有新增第 6 筆；但 **Discogs 這一側也有缺口**：`Kitty Hoff & Forêt-Noire《Zuhause》` 的德版條目 5688942 **`credits` 與 `notes` 兩欄整格是空的、軌長全缺**，是本批唯一一張連盤面 credits 都拿不到的碟（第 2870 條）。

---

## 第 2870 條（a 組研究，**資料最薄的一張與唯一一處無法定案**）

- **資料最薄**：**`Kitty Hoff & Forêt-Noire《Zuhause》`**。Discogs 德版 5688942 的 `credits`／`notes` 兩欄整格空、軌長全缺、MB 的 `catalog-number` 欄空。可查證的只剩曲目、發行日、目錄號、barcode 與藝人本人的來歷（德文維基）。**本卡仍達到 12 條 facts，但其中 6 條來自藝人條目而非盤面。**
- ⚠ **唯一一處查完仍無法定案**：**該團的鼓手是誰。** 德文維基的團員表逐字 `Beat Lee Burns`（Schlagzeug, Perkussion），**MusicBrainz 的 member 欄逐字 `Florian Achatzy`**；Discogs 沒有 credits 欄可以裁決。**正文不要點名鼓手。**
- ⚠ **另一處只寫到一半的**：`Musica Nuda《55/21》` **盤名的解法**。兩處義大利樂評都只寫到「rimanda alla cabala」（那不勒斯解夢數字），更細的對應在搜尋摘要層出現過但**找不到可開啟的一手頁面**（wuz.it 的原頁已 301 到 Feltrinelli 的檔案索引、內容不存在）。**facts 只寫到 cabala 為止，正文也不要往下寫。**

---

## 第 2871 條（a 組研究，**交件版本**）

⚠ **「筆數對了」不等於「定稿了」**（第 1803-B 條，本線已五次）。
**本棒的交件版就是工作區當下的 `desc-tools/batches/research/c169-a.json`**：20 筆、232 條 facts、`qa-batch` 的 a 組旗標 0、字元自檢 0。
**寫檔是分三次落地的**（1–5 張、6–10 張、11–20 張），**每一次都把完整陣列整份寫回**，因此任何一個中途版本都是合法 JSON；**若容器重啟後看到的檔案筆數少於 20，接續補完即可，不要從頭重寫。**
本層**未動** `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`previews.json`／`caa.json`／`c169-b.json`／其他批次的檔案，**未 `git commit`、未 `git push`、未動 git 索引**。暫存檔全部落在 scratchpad 且帶 `c169ra-` 前綴。

---

# c-169 **a 組鉤子層（20 張，2000–2009）** 裁定　2026-09-19

*（編號 3041–3080 為 a 組鉤子層專用區間。本段以 append 寫入，未動前面第 1557–1560-AE 條、a 組策展第 2126–2149 條、b 組策展第 2186–2209 條與 a 組研究第 2851–2871 條。）*

## 第 3041 條（a 組鉤子，**第 1793-B／1809-B／1816-B／2811 條的例行動作**）：**尺先倒回去量 c-168 a，逐格重現 209–229／中位 222.5／分佈 1-4-13-0**

本棒用的公式逐字是 `hook-base.md` 雲端註記第 2 點寫死的那一條，**只扣四樣、其餘一律算**：

```
預算 ＝ Array.from(hook).length ＋ Array.from(note).length
      − 「主故事：」 − 每一個「→」 − 「正文只寫上列各項。」 − 「這條骨架全批只走本張。」
```

**倒回去量 `desc-tools/batches/hooks/c168-hooks-a.json`（18 張）的結果：min 209、max 229、中位數 222.5，
四格分佈 ≤209 一張／210-219 四張／220-229 十三張／230+ 零張——與 c-168 a 第 2811 條回報的數字逐格相同。**
**→ 尺同、公式同，本組的數字可以與前批並排讀。**（年份指定、演出年指定、載體交代全部計入；本組沒有用到指派／排除句。）

**本組 20 張實測（程式產生，未手動歸類——第 1814-B 條）**：min **213**、max **229**、中位數 **226**、**超標 0**；
分佈 **≤209 零張／210-219 一張／220-229 十九張／230+ 零張**。
hook 加權 **19–31.5**（上限 50）、note 原始字元 **198–234**（上限 350）、**拉丁字母＋數字佔計入字元 34.3%**。

---

## 第 3042 條（a 組鉤子，**第 1816-B／2812 條在本批的實測；係數確實不可繼承**）：**第一版 20 張全部超標，幅度 3–63%，與 c-168 a 同向但幅度散得多**

第一版草稿（主故事鏈四到五格、編制與客座逐人點名）**20 張全部超標**：分佈 **237–374**，中位數 **313**。
最嚴重的三張是 Trio Focan **374**（超 63%）、High Five Quintet **352**（超 53%）、Kitty Hoff **349**（超 52%）；
最輕的 U-Street《Helsinki Sessions》**237**（超 3%）。**定稿中位數 226，整體砍掉約 28%。**

⚠ **與前批比對，方向與幅度都不能繼承**：c-165 a 低估 5–41%、c-166 a 超標 15–36%、c-166 b 只有 9／22 超標、
c-168 a 全超標 15–73%、**本組全超標但幅度分佈最散（3%～63%）**。
**散的原因是本批 20 張的專名密度落差極大**：Trio Focan 一張裡有土耳其人名、芬蘭人名、土耳其曲名與錄音室名四種；
U-Street《Helsinki Sessions》那張的事實密度低、天生就短。**「同一批內部」的係數也不可互相繼承。**

**→ 給 c-170 與後批：2000 年後的歐洲分支盤，note 只能容納三到四格，編制與客座合計最多點兩個人；
拉丁人名一個 11–22 字元，一格「五人編制逐一點名」就是 60–90 字元，等於整份預算的三到四成。**

---

## 第 3043 條（a 組鉤子，**整格捨去清單；第 1793-B 條末句：算不下就在鉤子層捨，不留給寫作層砍**）：**共 23 格**

| 碟 | 捨去的格 |
|---|---|
| Supergenerous | 盤面樂器欄逐字 `Percussion [Things]`／`Strings`；母帶 Greg Calbi ＋ 錄音師 Danny Kopelson；兩首標準曲縫進自作曲的軌目 |
| Guide Me Home | 錄音師 Jan Erik Kongshaug 與 Steinway D；標題曲原作者 Freddie Mercury 與 Mike Moran ＋《Barcelona》；日版 TOCJ-66099 |
| Loop in Release | 母帶工程 Alex Gopher（**與 U-Street 兩張的母帶軸撞模子，見第 3046 條**）；Studio Tex Avril；管樂客座名單只留兩人 |
| standard a'la Turc | 1998 年那張《Beneath the Stars》的盤名；Sezen Aksu 與 Zülfü Livaneli 兩位作者；器材那一格 |
| Helsinki Sessions | 五人編制逐一點名；作曲分配 |
| Oh! | 四人的舊帳（Miles Davis 樂團／波士頓）；錄音師 James Farber 與母帶 Greg Calbi；三位非 Blue Note 藝人的合約狀態 |
| Music Stories | Melina Mercouri；指揮 Alexandre Myrat 與 Kamerata Orchestra Of The Friends Of Music；1986 年那張的盤名與廠牌 |
| Tangled | 鋼琴由 Ben Lewis 與 Laurence Hobgood 分擔；製作人 Eric Hochberg；〈Solitary Moon〉的 Johnny Mandel |
| Bowling | EMI 防拷層那一格 |
| Anna-Mari Kähärän Orkesteri | 六位詩人只留兩位；Yrjö 獎與芬蘭獎（**第 3045 條**）；HIP Studiot 與母帶 Pauli Saastamoinen |
| The Chase | 法版 18 個編號、兩段〈Intermission〉與隱藏軌整格；混音 Scott Harding 與 Michael Leonhart |
| Kosmopolites | 五重奏編制逐一點名；錄音與混音日期 |
| Frost | Jyväskylä 以外的成團細節；封面設計 Janne Uotila |
| Thinking | 盤名副標 `Plays The Music Of Ettore Fioravanti`；曲名〈Danza…〉的括號副題 `(da "Lo Schiaccianoci")` |
| Comes Love | Fabrizio Bosso 客座（**見第 3047 條**）；七人編制逐一點名 |
| The Siena Concert | D'Andrea 的 Modern Art Trio 與 Perigeo 經歷；後製由 Aldo Mella 兼任；第一段 27 分 25 秒的五曲清單 |
| Five for Fun | 錄音與混音日期 ＋ House Recording Studio；五人編制逐一點名；日版 bonus 兩首 |
| 55/21 | 曲目橫跨的六位作者清單；Gianluca Petrella 等四組客座只留一組；17 軌 55 分鐘 |
| Free Runner | 第 2 軌〈I Wake Up Crying〉的 Burt Bacharach 與 Hal David；樂評的取樣／循環／嘻哈斷句那一句 |
| Zuhause | 第 11 軌〈En Planant - Près De Moi〉；〈Pension Fuchs〉；曲名小場景只留一個 |

**捨去的優先序照第 1809-B 條：先砍名單型（三人以上並列人名，每格 30–90 字元）→ 再砍與主故事鏈無關的第二層軼事 → 最後才動鏈上的格。**
**本組 20 張沒有一張靠潤飾句子壓下來，全部是整格捨去。**

⚠ **一格是改寫而不是捨去**：Thinking 的第 10 軌曲名由逐字全形（含 `(da "Lo Schiaccianoci")`）縮成〈Danza Della Fata Dei Confetti〉，
**同一格補上「柴可夫斯基《胡桃鉗》裡的〈糖梅仙子之舞〉」**——括號副題省下 24 字元，而「這是《胡桃鉗》的曲子」這個資訊一個字都沒少。

---

## 第 3044 條（a 組鉤子，**骨架歸屬；照雲端註記第 3 點，只有擁有者寫「這條骨架全批只走本張。」，讓出的卡什麼都不寫**）：**17 張擁有、3 張讓出**

**程式從輸出檔實掃（第 1802-B 條的新規：以 `*-hooks-*.json` 裡帶歸屬句的卡為準，不以本表為準；本表由程式產生、未手打）：17／20。**

| 擁有者 | 那一條骨架 |
|---|---|
| Supergenerous | **替一部並不存在的電影寫配樂** |
| Guide Me Home | **別的樂種的經紀人把樂手帶進這個廠牌** |
| Loop in Release | **一個人在自宅做完整張，客座卻是半個圈子** |
| standard a'la Turc | **某國第一位替 Blue Note 錄音的人** |
| Helsinki Sessions | **團名的字母取自一個地名** |
| Oh! | **直接錄到兩軌母帶、不做多軌後製** |
| Music Stories | **同一張碟收了相隔十六年的兩場錄音** |
| Tangled | **整個曲庫刻意避開標準曲** |
| Anna-Mari Kähärän Orkesteri | **歌詞整批取自別人（詩人）的文本** |
| The Chase | **街頭賣唱被發掘，最後簽進大廠** |
| Kosmopolites | **一套碟、每張獻給樂團裡一位團員的作曲** |
| Frost | **作曲前半張歸一人、後半張歸另一人** |
| The Siena Concert | **盤面上的「軌」其實是 medley，底下另有一層曲目** |
| Five for Fun | **標題曲由全團共同署名** |
| 55/21 | **樂團起於一次臨時代打** |
| Free Runner | **別的樂種的樂團主唱改藝名轉行** |
| Zuhause | **主唱在盤面掛著一件非常規樂器（鋸琴）** |

### 讓出的 3 張，逐張寫明讓給誰（**寫在裁定裡給主線與 b 組看，note 裡一個字都沒寫**）

| 讓出的卡 | 讓出的骨架 | 為什麼讓 |
|---|---|---|
| **U-Street All Stars《Bowling》** | **團名／樂團身世那條線** | **同批同團的《Helsinki Sessions》已擁有**；本張改走「第二張把錄音、混音與母帶集中到同一間錄音室」與「貝斯手在團的最後一年」 |
| **Paolo Fresu Quintet《Thinking》** | **「一套碟、每張獻給一位團員」那條系列骨架** | **同批的《Kosmopolites》已擁有**；本張改走「輪到鼓手」＋「第 10 軌是柴可夫斯基」＋「錄完兩年才發行」 |
| **Alice Ricciardi《Comes Love》** | **「領班／個人首作」那條骨架** | ⚠ **依第 1809-B 條讓給 b 組**：`prop-b.json` 裡**同形狀的卡有五張**（Jon Cowherd《Mercy》、Otis Brown III《The Thought of You》、Kendrick Scott Oracle《We Are the Drum》、Kenny Barron Quintet《Concentric Circles》、The James Carter Organ Trio《Live From Newport Jazz》，五張的 `why` 逐字都寫「領班首作」）。**a 組一張鎖住等於卡死 b 組五張。** 本張改走「Montreux 的比賽第二名」＋「唯一的義大利語曲」 |

⚠ **本組沒有任何一張在 note 裡點名骨架歸給哪一張**（雲端註記第 3 點）——`qa-batch hooks c169` 的 **`互指? 0 處`** 證實沒有把別張的盤名寫進 note。

### ⚠ 動手前掃過 `prop-b.json` 全 20 筆，另外主動避開的兩條（沒 claim 也沒用）

1. **「廠牌某國分部自己簽人、自己出盤」**——b 組有 Ruben Hein（荷蘭）、Aron Ottignon（法國簽紐西蘭人）、Sarah McCoy（法國）三張，
   **而 a 組 20 張裡 18 張都是歐洲分支盤**。**若 a 組把它寫成任何一張的主故事鏈，b 組那三張就全被鎖死。**
   **本組一張都不寫「這是 Blue Note 某國分部的出品」這條軸**，分支身分只以「Blue Note 義大利發行」這類發行事實出現在鏈上。
2. **「超級團／廠牌把名冊湊成一團」**——b 組有 The Blue Note 7、Blue Note All-Stars、R+R=NOW 三張。
   **a 組的 `Scolohofo` 是本組唯一的全明星團，改走「直接錄到兩軌母帶」**，成軍經過只寫「1999 年在蒙特婁爵士節成形、兩度巡演後才進錄音室」，**不展開「把名家湊成一團」那條軸。**

⚠ **第 1814-B 條（`hook` 本體用掉的形狀也算已占用）在本組的一處自我檢查**：
**b 組的 `R+R=NOW` 有「團名的字母各代表一個字」這條**（`prop-b.json` 逐字引 Glasper 的 `R+R stands for 'Reflect' and 'Respond'`）。
**a 組有兩張同形（《Helsinki Sessions》的 U＝街名、《Oh!》的四姓縮寫）**——**依第 1809-B 條，多的那一方不該把兩張都 claim 起來**：
**本組只由《Helsinki Sessions》claim 團名由來這條**；**《Oh!》的歸屬句給的是「直錄兩軌母帶」，它 note 裡的團名縮寫只是鏈上一格、不是它擁有的骨架。**
**→ b 組的 `R+R=NOW` 仍可寫團名解義。**

---

## 第 3045 條（a 組鉤子，**裁定；「第一位／第一張」型素材的處置**）：**研究層採用 2 筆、本層全部留下；「首張專輯」型的序數句壓到 4 張並逐張換說法**

派工信第五節第 4 點要求「本批有多張『第一位／第一張』型素材，自己盯，最多留兩張」。**逐筆處置如下。**

### （一）「某國第一位」型：研究層第 2865 條採用 2 筆，本層 2 筆全留，**但切入面向完全分開**

| 卡 | 素材 | 本層的處置 |
|---|---|---|
| **Trio Focan《standard a'la Turc》** | Önder Focan 是第一位替 Blue Note 錄音的土耳其音樂家（1998） | **當 hook 本體＋鏈的第一格**，**歸屬句給本張** |
| **Thierry Lang《Guide Me Home》** | 第一位與 Blue Note 簽下藝人合約的瑞士人（1996） | ⚠ **降成鏈上的第二格**，hook 走的是「Queen 的經紀人 Jim Beach」；**兩張的 hook 一個講國籍、一個講人，句子骨架不同形** |

**研究層退掉的 3 筆（Alice Ricciardi 的「第一位義大利爵士女歌手」、Kitty Hoff 的「Blue Note Germany 第一位德國女性」、Juliano Rossi 的「第三位德國音樂家」）本層一個字都沒寫**
——**照第 1815-B 條的處置：安靜地不寫，note 裡不出現任何否定句或「查無」字樣**（`chk-hook-crossgroup` 的校對痕跡那一道 0 命中）。

### （二）⚠ 真正的模子不是「第一位」，是「本作是他們的首張專輯」——第一版 7 張、壓到 4 張

第一版有 **7 張**寫了序數首作（Loop in Release／Helsinki Sessions／Anna-Mari／The Chase／Kosmopolites／Comes Love／Five for Fun）。
**`chk-hook-crossgroup` 對這個模子一次都不會亮**（定稿前後兩版該腳本都是 `✓ 全部通過`）。**判：壓到 4 張，而且四張的範圍與說法各不相同。**

| 卡 | 定稿的說法 | 範圍 |
|---|---|---|
| Helsinki Sessions | 「兩年後他們在 Blue Note 出了第一張」 | 樂團出道作 |
| Anna-Mari Kähärän Orkesteri | 「這是她的第一張個人專輯」 | 個人首作 |
| The Chase | 「本作是她第一張大廠專輯」 | 大廠首作 |
| Five for Fun | 「這是他們第一張出在 Blue Note 的碟」 | 廠牌首作 |
| ~~Loop in Release~~ | 改成「他 2000 年先替 Blue Note 編了兩卷目錄混音帶，**這回換成自己的碟**」 | **序數整格捨去** |
| ~~Kosmopolites~~ | hook 由「這是第一張」改成「**從鋼琴手開始**」 | **序數整格捨去** |
| ~~Comes Love~~ | 只在 hook 保留「換來一張 Blue Note **首作**」，note 整格不寫 | **note 側捨去；骨架讓給 b 組，見第 3044 條** |

---

## 第 3046 條（a 組鉤子，**`chk-hook-crossgroup` 看不到、只能自己盯的四種句型模子**）：**用程式掃自己的 20 份 note，四種全部壓到 2 次以內**

第 1764-B／1816-B／2818 條點名的是「同一句型三次以上也是同構」。**本棒定稿前寫了一支掃描逐詞數自己的 20 張，抓到四種。**

| 模子 | 第一版 | 定稿 | 怎麼壓的 |
|---|---:|---:|---|
| **「團名由來」** | **3**（Helsinki Sessions／Oh!／55/21） | **2** | 55/21 的「團名指的正是這種配置」改成「編制就只有這兩件」 |
| **「唯一的外來曲是 X」** | **5**（Kosmopolites／Thinking／The Siena Concert／Five for Fun／Free Runner） | **2** | Kosmopolites 改「唯一的例外」、Thinking 只點曲名不貼標籤、The Siena Concert 改「曲子幾乎都是 D'Andrea 自己的」、Free Runner 整格捨去 |
| **「唯一」二字本身** | **4** | **2** | Tangled 的「唯一一張 Blue Note 盤」改成「她只在 Blue Note 出過這一張」；Comes Love 的「唯一的義大利語曲」改成「只有收尾的〈Le Tue Mani〉唱義大利語」 |
| **「＜日期＞錄於＜地點＞」的獨立時地格**（第 2818 條） | **5 種同形** | **`錄於` 2／`錄音在` 1／`收音` 1／`在…完成` 1** | 五張各換一種句式；**本批 20 張裡 15 張有錄音時地，是資料形狀造成的（Discogs 整筆 credits 是主力），但句子形狀必須拆開** |
| **「某某一人寫了 N 首／一人完成」** | **3** | **2** | Bowling 的「Markus Holkko 一人寫了四首」改成「寫了其中四首」 |
| **「母帶工程掛給某某」** | **3** | **2** | Loop in Release 的 Alex Gopher 整格捨去，換成「10 軌裡有四首超過 9 分鐘」；**留下的兩處（Helsinki Sessions 的 Otto Donner／Bowling 的 Pauli Saastamoinen）是同一個團第一、二張的刻意對照，不是模子** |

⚠ **`chk-hook-crossgroup c169` 在壓之前與壓之後都是 `✓ 全部通過`**——**這六種模子它一次都沒亮。** 與第 1816-B 條的結論一致：**機器只看前四字與關鍵詞，句型層的同構只能靠人掃。**

---

## 第 3047 條（a 組鉤子，**四條硬限制與研究層九處推翻，逐條落實**）

### （一）派工信第四節的四條硬限制

| 限制 | 定稿怎麼寫 |
|---|---|
| **Music Stories 第 7–9 軌** | 逐字照研究層第 2852 條的保守寫法：「**第 7 至 9 軌是 1985 年的錄音**……**這套二重奏最早以 1986 年的希臘盤問世**」。**沒有寫成 2001 年錄的，也沒有任何一句斷言同一條母帶。** ⚠ 另照第 2852 條末段把 Gary Burton 限住：「**Gary Burton 的顫音琴獨奏只涵蓋這六軌**」 |
| **Scolohofo《Oh!》寫 2002 必須帶「日本先發」** | 鏈的末格逐字：「**日本先發，東芝 EMI 版 2002 年 12 月 26 日上市，美國版 2003 年 1 月 27 日才發**」；`發行年寫 2002 年。` 緊接其後 |
| **Kitty Hoff 的鼓手不要點名** | **整張 note 沒有鼓手，也沒有任何團員名**；只寫 Kitty Hoff 本人掛名的樂器 |
| **The Chase 的軌數版本分歧** | ⚠ **整格捨去**：法版 18 個編號、兩段〈Intermission〉、隱藏軌〈Ride 600〉**一個都不寫**。**因為 `正文只寫上列各項。` 在，寫作層拿不到任何軌目素材，就不可能把 bonus 寫成原盤曲目**（第 1814-B 條那個「軌名整格拿掉比留軌名再加引用指示便宜」的手法） |

### （二）研究層推翻策展層的 9 處，在 hook 層的落點

| # | 推翻 | 定稿 |
|---|---|---|
| 1 | Kosmopolites 末軌是 Händel | 鏈上逐字「唯一的例外是收尾的〈Lascia Ch'io Pianga〉，那是 Händel 的詠嘆調」 |
| 2 | 系列是五張不是三張 | 鏈上逐字「一套**五張**的企劃……計畫橫跨三年」 |
| 3 | Thinking 第 10 軌是柴可夫斯基 | hook 本體＋鏈上一格 |
| 4 | Five for Fun 是 Cedar Walton 與 McCoy Tyner | 鏈的末格逐字兩人；**Kenny Dorham／Woody Shaw 全篇 0 命中**（程式實掃） |
| 5 | The Chase 只有兩段〈Intermission〉 | **整格捨去**，正文碰不到這一格 |
| 6 | Guide Me Home 就是 13 軌 | **軌數整格不寫**（只寫「原壓是雙 CD，第二片 4 軌」，這是 MB 與 Discogs 一致的那一層） |
| 7 | **Oliver Perau 就是 Juliano Rossi 本人** | ⚠ 鏈的第一格逐字「**Juliano Rossi 的本名是 Oliver Perau**」；**「製作夥伴」「作詞者」這兩個說法全篇 0 命中**，不可能寫成兩個人 |
| 8 | The Siena Concert 是六段 medley、17 首 | hook 本體逐字「六個編號、七十七分鐘，底下其實是十七首曲子串成的六段連奏」；**「平均一軌十三分鐘」「長篇即興」0 命中**。⚠ Mingus 那首另寫「只有 1 分鐘」 |
| 9 | 〈A Lynmouth Widow〉 | **該曲名整格未寫**（Anna-Mari 那張只列詩人與 Kuusisto），錯字不可能外漏 |

**研究層補齊的 5 條「策展層整層沒查到的主故事」，本層 5 條全部當成該張的鏈上主軸**：
Trio Focan 的土耳其第一人＋Nardis Jazz Club／Thierry Lang 的 Jim Beach（**hook 本體**）／
Anna-Mari 的英語詩人歌詞（**hook 本體**）／Joona Toivanen 的作曲一人一半（**歸屬句**）／Brisa Roché 的 Erik Truffaz 客座第 13 軌。

---

## 第 3048 條（a 組鉤子，**兩支腳本的結果與 `互指?` 判讀**）

```
cd desc-tools && node qa-batch.mjs hooks c169
  → ⚠ b 缺 hook 檔
  → 總標記 1
cd desc-tools && node chk-hook-crossgroup.mjs c169
  → c169｜1 組｜20 張｜hook 加權 19–31.5｜note 198–234
  → ✓ 全部通過
```

- ⚠ **那 1 個標記不是 a 組的**：`b 組的 c169-hooks-b.json 還沒交件`，**`⚠ b 缺 hook 檔` 是管線形狀不是旗標**（第 1815-B 條末段、派工信第二節已預告）。
  **a 組自己的四道（hook key 不在卡單／hook 事實對照／note 事實對照／字元四掃描）全部 0。**
- **`互指? 0 處`。** 逐筆人工判讀（第 1763-B 條）：**本組 20 張的 note 裡沒有任何一個專名或曲名落在「本卡研究稿沒有、同批別張有」那一級**。
  ⚠ **三處刻意檢查過的同批鄰居，全部確認取自本卡自己的 `facts`**：
  1. **`Fabrizio Bosso` 同時是 High Five 的領班與 Alice Ricciardi 的客座小號**（研究層第 2856 條要求兩卡 `risk` 互指）——
     **本層在 Comes Love 那張整格不寫 Bosso**，High Five 那張也只寫 Bosso 自己的生平，**兩張零交叉**。
  2. **`Erik Truffaz` 出現在 The Chase 的第 13 軌**——**那一條在本卡 `facts[5]` 逐字有**，不是從 b 組那張 `Erik Truffaz Quartet` 搬來的；**b 組那張是不同碟、不同掛名**。
  3. **兩張 Paolo Fresu 與兩張 U-Street 各自的鏈**——**逐格回查各自的 `facts`**（第 2817 條的判準：同一個人在同批多張時，每一條生平都要回該卡自己的 facts 對一次）。
     **Thinking 的「五重奏的成員與前一張完全相同」取自本卡 `facts[3]`；Bowling 的「與首作相反的錄音室安排」取自本卡 `facts[1]`。**
- **字元自檢（程式，不用眼睛掃）**：`charScan` 對 `hooks-a` 的四道（非拉丁亂碼／簡體字／半形逗號貼中文／千分位逗號）**全部 0**。
  ⚠ **希臘文 `Θάνος Μικρούτσικος` 是掛名專名，依 base 檔字元條合法且必須照原文保留**；
  ⚠ **`Şımarık`／`Kållered`／`Jyväskylä`／`Mylläri`／`Près De Moi`／`Forêt-Noire`／`Brücke`／`Händel`／`Roché`／`Kähärä` 的變音符一律照原文保留、未做任何折換**；
  ⚠ **卡單掛名 `Franco D’Andrea Quartet` 的 U+2019 照卡單原樣**；note 內文寫 ASCII 形 `D'Andrea`（`qa-batch` 的 `norm` 兩形折同鍵，未誤報）。
- **schema 自檢**：20 筆、`[{key, hook, note}]`、**key 順序與研究稿逐字全等**（`JSON.stringify` 比對）、重複 key 0、
  **hook 開頭前四字 20／20 互異**、hook 句末全形標點 20／20、hook 禁語 0、hook 否定句 0、分數星等 0。

---

## 第 3049 條（a 組鉤子，**⚠ 派工信與 base 檔／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與它牴觸，以它為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到一處真牴觸、兩處與實況有出入。**

### （一）⚠ 真牴觸：第五節第 2 點把 c-168 的捨去優先序引成「**先砍名單型（三人以上並列人名）**」

**第 1809-B 條與 c-168 第 2811–2816 條的原文沒有「三人以上」這個門檻**，第 1809-B 條逐字是
「**先砍名單型（三人以上並列人名，每格 30–55 字元、密度最低）**」——**括號裡是當時那一批的實況描述，不是判準的條件。**
**照「三人以上」這個字面執行，本組會保不住預算**：實測本批**兩人並列的名單格就已經 30–50 字元**
（`Neal Miner 與 Will Terrill` 一格 28、`Ben Lewis 與 Laurence Hobgood` 一格 26、`Cedar Walton 與 McCoy Tyner` 一格 35），
**而本組 20 張要砍的 23 格裡有 9 格是兩人並列。**
**→ 本棒照原意執行（砍的是「名單型」這個形狀，不是「人數」），並在此更正判準句：
「名單型＝一格裡出現兩個以上只起點名作用的專名，密度最低者先砍」，門檻與人數無關。**
⚠ **這與第 1795-B 條同一族：主線把裁定的括號說明當成條件摘出來。**

### （二）與實況有出入、不算牴觸的兩句

1. **第三節第 9 點說「另有五張策展層主故事整層沒查到，研究層補齊了」——正確，而且低估了影響**：
   **那五條裡有兩條（Thierry Lang 的 Jim Beach、Anna-Mari 的英語詩人歌詞）直接成了該張的 hook 本體。**
   **照策展層的 `why` 寫，這兩張的 hook 會整個走偏。**
2. **第五節第 4 點說「本批有多張『第一位／第一張』型素材……最多留兩張」——方向對，但指錯了模子**：
   **真正會塌成同一個模子的是「本作是他們的首張專輯」那個序數句（第一版 7 張），不是「第一位」（研究層只採用了 2 筆，天生就只有兩張）。**
   **見第 3045 條。**

---

## 第 3050 條（a 組鉤子，**第 1803-B 條的交件聲明**）：**工作區當下的 `desc-tools/batches/hooks/c169-hooks-a.json` 才是交件版**

⚠ **「筆數對了」不等於「定稿了」**（第 1803-B 條，本線已七次）。
**本棒的交件版就是工作區當下的那一份**：20 筆、預算 213–229／中位 226／超標 0、`qa-batch` 的 a 組旗標 0、`互指? 0 處`、`chk-hook-crossgroup` ✓ 全部通過。
**寫檔是分四次落地的**（5／10／15／20 張，**每一次都把完整陣列整份寫回**，因此任何一個中途版本都是合法 JSON）；
**筆數到 20 之後又改過三輪**（模子壓縮、事實校正、預算微調），**任何一個 20 筆的中途版本都不是定稿。**
**若容器重啟後看到的檔案筆數少於 20，接續補完即可，不要從頭重寫。**

本層**未動** `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`previews.json`／`caa.json`／
`c169-hooks-b.json`／`c169-b.json`／其他批次的檔案，**未 `git commit`、未 `git push`、未動 git 索引**。
暫存檔全部落在 scratchpad 且帶 `c169ha-` 前綴。

---
## 第 2991 條（b 組研究，**總表**）：**20 張全交，`facts` 235 條、平均 11.75 條，`src` 100% 為可開啟的 https 一手頁面**

| | 值 |
|---|---:|
| **交件張數** | **20／20**（`status` 與 `coverage` 兩欄並存同值，20 張全 `full`、`thin` 0） |
| **`facts` 總數** | **235** |
| **每張條數分佈** | **11 條 5 張**（The Blue Note 7／Ruben Hein／Emma Salokoski／Musica Nuda《Complici》／Musica Nuda《Banda larga》）、**12 條 15 張**；**低於 8 條者 0** |
| **`hookCandidates`** | 每張 2 條，**無一張超過 2** |
| **唯一 `src` 網域數** | **12**（59 個不重複網址） |

**`src` 網域分佈（依條數）**：`discogs.com` 88／`bluenote.com` 67／`en.wikipedia.org` 30／`it.wikipedia.org` 11／`universal-music.de` 9／`finland.fi` 7／`universal-music.co.jp` 7／`umohelsinki.fi` 5／`loop.co.nz` 5／`downbeat.com` 3／`artistshare.com` 2／`joncowherd.com` 1。

**每張的網域組合都至少兩個**，最少的一張是 Blue Note All-Stars（`bluenote.com`×11 ＋ `discogs.com`×1），
**沒有任何一張只靠單一網域**，滿足下游 manifest gate「每張至少兩個 HTTPS 來源」的硬性要求（第 201 行原文）。

---

## 第 2992 條（b 組研究，**覆核第 2208 條（二）；結論相同，另補六位團員的逐名重掃**）：**Glasper 圈五個掛名在池中確實 0 命中，池中有的是側人**

派工信第三節第 3 點與第 2208 條（二）都說派工信原句寫錯。**本棒不照抄結論，獨立重掃 `seed_cards.json`（17248 列）覆核**：

| 掃的字串 | seed 命中 | 命中的是什麼 |
|---|---:|---|
| `R+R=NOW`／`Chris Dave`／`Kendrick Scott`／`Otis Brown`／`Logan Richardson` | **0** | — |
| `Robert Glasper` | **5** | 《Black Radio》2012／《In My Element》2007／《Let Go》2024／《Canvas》2005／《Double Booked》2009 |
| `Christian Scott` | **6** | aTunde Adjuah 名義五張 ＋ 一張三人聯名《Ninety Miles》 |
| `Terrace Martin`／`Taylor McFerrin`／`Justin Tyson` | **0** | — |

**→ 第 2208 條（二）成立。** ⚠ **另記一筆方法論**：本條是**第 1796-B／1805-B／1812-B 條（「數量或範圍斷言一律自己重掃」）在本棒的第一次執行**，
**重掃的結果與策展層一致**——**這一次沒有推翻，但下一條就推翻了。**

---

## 第 2993 條（b 組研究，**⚠ 推翻第 2194 條與派工信的同一個數字**）：**seed 裡的 `Kenny Barron` 是 3 列不是 2 列——第三列是聯名卡，被兩邊都漏掉了**

派工信第三節第 4 點逐字：「**seed 實際有《Scratch》1985 與《What If?》1986 兩張**」；第 2194 條的表格逐字也記「**`Kenny Barron` 2 張（seed）**」。

**本棒重掃 `seed_cards.json` 的實際結果是 3 列**：

| seed 列 | 形狀 |
|---|---|
| `Kenny Barron —《Scratch》(1985)` | 裸名領班 |
| `Kenny Barron —《What If?》(1986)` | 裸名領班 |
| ⚠ **`Joe Locke & Kenny Barron —《But Beautiful》(1991)`** | **聯名，掛名字串不是裸名** |

**為什麼會漏**：兩邊都只掃了 `artist` 欄**等於**或**開頭為** `Kenny Barron` 的列，
**聯名形的 `Kenny Barron` 落在字串中段**，用前綴比對掃不到。

**判：第 2194 條的「不收攏」結論不受影響**（第三列是第三個掛名字串，與裸名／群組名之爭無關），
**但那張表的數字要改成 3**。**給後批的固定動作**：掃池中既有掛名時，**一律用「字串包含」掃一次、再用「欄位相等」掃一次**，兩個數字並列；
只跑後者會系統性漏掉所有 `A & B`／`A, B, C` 形的聯名卡。

⚠ **順帶一個撞陳列**：`bluenote.com/music/concentric-circles/` 逐字點名的 **1986 年《What If》**，
**就是 seed 那張《What If?》**（seed 帶問號、官網不帶）——**同一張碟**。下游若替本卡寫「他的五重奏傳統」，那是撞陳列不是撞卡（第 845 條）。

---

## 第 2994 條（b 組研究，**新立；把第 2867 條的分界線量化，並補一個例外**）：**`bluenote.com` 的覆蓋率分界是「碟的出身地」——美國本部 9／11，歐洲與日本分支 0／9**

第 2867 條（a 組研究）已經定出「不是年代、是出身地」這條分界。**b 組 20 張逐張測完，數字如下**：

| 出身 | 張 | `bluenote.com` 有頁 | 名單 |
|---|---:|---:|---|
| **美國本部** | **11** | **9** | 有頁：The Blue Note 7／Otis Brown III／Kendrick Scott Oracle／Blue Note All-Stars／Chris Dave／Kenny Barron／R+R=NOW／Charles Lloyd／James Carter |
| | | | ⚠ **無頁的 2 張**：**Jon Cowherd《Mercy》**（`/artist/jon-cowherd/` 與 `/music/mercy/` 皆 404——**這張是 ArtistShare／Blue Note 共同發行，不是純本部盤**）、**Logan Richardson《Shift》**（`/artist/logan-richardson/` 與 `/music/shift/` 皆 404，**他是本部簽約藝人，這一張是真正的例外**） |
| **歐洲與日本分支** | **9** | **0** | Ruben Hein（NL）／Emma Salokoski & UMO（FI）／Musica Nuda ×2（IT）／Erik Truffaz Quartet（FR）／The Northern Governors（FI）／Sunaga t Experience（JP）／Aron Ottignon（FR）／Sarah McCoy（DE）——**逐張測過 `/artist/<slug>/` 與 `/music/<slug>/` 兩種路徑，全部 HTTP 404** |

**→ 第 2867 條的分界線在 b 組成立，但要補一句：「美國本部」不等於「一定有頁」。**
**共同發行盤與個別藝人仍會落空，測到 404 不代表判錯 imprint。**

---

## 第 2995 條（b 組研究，**⚠ 派工信第四節的路徑清單漏了兩條，其中一條是本線盤頁的真正路徑**）

### （一）⚠ ⚠ **`bluenote.com` 的盤頁路徑是 `/music/<slug>/`，不是派工信與既有裁定慣用的 `/release/<slug>/`**

`/release/<slug>/` **會回 HTTP 301**，`Location` 逐字指到 `/music/<slug>/`。跟著轉址走得到同一頁，
**但寫進 `src` 的網址若停在 `/release/`，下游 manifest gate 拿到的就是一個 301**。**本棒交件前把 14 個 `bluenote.com` 網址全部改成轉址後的形。**

⚠ **同一個毛病在藝人頁上也有一例**：`/artist/erik-truffaz/` 301 → **`/artist/erik-truffaz-2/`**（帶 `-2` 尾碼），
**已改成轉址後的形。**

⚠ **`R+R=NOW` 的藝人頁 slug 是 `rrnow`**——**`+` 與 `=` 被整個吃掉**，猜 `r-r-now` 會 404。
**帶符號的掛名要猜 slug 時，先試「只留英數字」的形。**

### （二）**派工信沒列的第二條：`wp-json/wp/v2/types` 告訴我們官網只有 `posts` 與 `pages` 兩種公開型別**

**這解釋了派工信第四節第 1 點為什麼老是落空**：`wp-json/wp/v2/posts?search=` **只搜新聞稿，搜不到 `/music/` 與 `/artist/` 頁**——
**那兩種頁不是 `post`。** 本棒實測 4 次 `posts?search=`，只在**找新聞稿**時有用（2 次命中：James Carter 的發片稿、61 屆葛萊美入圍公告），
**拿它找盤頁則一次都沒中。**

**→ 給後批的正確順序**：**(1) 直接猜 `/music/<盤名 slug>/` → (2) 直接猜 `/artist/<掛名 slug>/` → (3) `posts?search=` 只用來找新聞稿。**

---

## 第 2996 條（b 組研究）：**③ 來源層各查法的實測命中率（含本棒另外動用的六條路徑）**

| 查法 | 用了幾次 | 命中 | 評語 |
|---|---:|---:|---|
| **`api.discogs.com/releases/<id>` 整筆** | **26 筆條目** | **26** | ⚠ **絕對主力，20 張全部用到，與 c-167／c-168 的結論完全一致。** 無需 token，雲端直通 |
| `api.discogs.com/database/search?artist=&release_title=` | 2 | 2 | **第 2209 條的第二種掃描在雲端無 token 可跑**（本棒實測 Ruben Hein 回 3 筆、Musica Nuda《Banda larga》回 5 筆） |
| **`bluenote.com/music/<slug>/`**（本棒新增的路徑） | 15 | **7** | 美國本部盤的主故事幾乎只在這裡 |
| `bluenote.com/artist/<slug>/` | 13 | **7** | 傳記線；Otis Brown III、Chris Dave、James Carter 三張的整段生平只有這裡有 |
| `bluenote.com/wp-json/wp/v2/posts?search=` | 4 | 2 | **只對新聞稿有效**（見第 2995 條（二）） |
| `bluenote.com/?s=` | **0** | — | 未動用；前批已證備援無效，本棒改走 `wp-json` |
| `universal-music.co.jp/<slug>/products/<品番>/` | 2 | **1** | ⚠ **對 `Sunaga t Experience《STE》` 決定性**——團員漢字名、「レコード番長」稱號、DJ 三十週年這三件事只有這一頁有。⚠ **路徑的第一段是「藝人 slug」而不是本名**：`sunaga-t-experience` 通、`sunaga-tatsuo` 404 |
| 藝人官網 | 1 | **1** | `joncowherd.com/music` 命中（標題逐字「Artist Share/Blue Note Releases…」）；本棒未遇到 JS 渲染的官網 |

### ⚠ 本棒另外動用、派工信沒列的六條路徑

| 路徑 | 用在哪 | 為什麼非它不可 |
|---|---|---|
| **`universal-music.de/<藝人>/biografie`** | **Sarah McCoy（12 條 facts 裡 9 條）** | ⚠ ⚠ **本棒最大的一個發現：`universal-music.co.jp` 那條路徑有德國版**。McCoy 是 Universal Music Jazz Germany 掛 Blue Note 發的歐洲盤，`bluenote.com` 完全沒有她，**整條傳記線（Pine Plains 出身、父親與祖母數日內相繼過世、紐奧良 Spotted Cat、Chilly Gonzales 在巴黎發現她）只有這一頁有**，頁尾還逐字註明「Stand: Januar 2019」與發行同期。**強烈建議把 `universal-music.de` 寫進簡報第三節，與日本版並列。** |
| **`finland.fi`**（芬蘭外交部 Finland Promotion Board） | **The Northern Governors（12 條裡 7 條）** | **這張是血緣家族團**——成員互為表親、全部是 Marjatta Pokela 與 Martti Pokela 的後代——**這件事 Discogs、MB、slice、策展層一個都沒寫到**，只有這一篇 2012 年的官方報導有 |
| **`umohelsinki.fi/album/<slug>/`**（樂團官方站） | Emma Salokoski & UMO（11 條裡 5 條） | **錄音室（Varistoteles Studios／Yle M1）、catno `50999 097943 2 0`、以及「據信是第一張把同一批歌用芬蘭兩種官方語言各唱一次的 CD」三項只有這一頁有** |
| **`artistshare.com/Projects/…`** | Jon Cowherd | **樂迷集資模式的實際內容（贊助者換到錄音影片與內頁署名）與「Blue Note/ArtistShare release」這個自稱** |
| **`downbeat.com/news/detail/…`** | The Blue Note 7（12 條裡 3 條） | **Bruce Lundvall 的發片語錄、巡演起訖（1 月 7 日 Yakima 起、五十座城市、四月中 Birdland 連演六晚）、以及「一人一首、只有兩首是 Renee Rosnes 編」** |
| **`it.wikipedia.org` 的 `w/api.php`** | Musica Nuda 兩張（共 11 條） | 英文維基沒有 `Musica Nuda` 條目（實測 MISSING），義大利文有，而且有專屬的《Banda larga (album)》頁 |

### ⚠ 三個查不到／被擋的

- **`allaboutjazz.com`：HTTP 403**（雲端被擋，`WebFetch` 與 `curl` 皆然）。維基引述的 John Kelman 評論只能透過維基轉引。
- **`jazzwise.com`：HTTP 403**。
- **`itunes.apple.com/search`：本棒未動用**——第 1823-B 條說雲端會 403，而策展層第 2204 條已把三種店面查法跑完，研究層沒有非跑不可的缺口。**因此本棒不提供任何「在不在架上」的斷言。**

---

## 第 2997 條（b 組研究，**新立；一個會讓整格 credits 消失的查法陷阱**）：**同一張碟要挑對版本條目才拿得到 Discogs 的 credits——本組中 2 次**

| 碟 | 錯的條目 | 對的條目 |
|---|---|---|
| **Kendrick Scott Oracle《We Are the Drum》** | **美版 `8550212` 的 `extraartists` 整格是空陣列**（連鼓手是誰都沒有） | **歐版 `10307891` 有完整的 21 筆 credits**（Taylor Eigsti／Mike Moreno／Joe Sanders／John Ellis／Derrick Hodge 製作／Don Was A&R／Lizz Wright 出借聲明／錄音室與版式） |
| **Musica Nuda《Banda larga》** | **義大利原壓 `6600079` 的 credits 只有一行**（`Arranged By, Conductor = Daniele Di Gregorio`） | **法版 Bonsaï `9820411` 有 13 筆**（Orchestre da Chambre des Marche、Di Gregorio 兼打馬林巴與巴拉風、Spinetti 兼彈 saz、三間錄音室、製作人二人） |

⚠ **這個陷阱與第 1250 條不同族**：那條管的是「目錄號不可反查」，**這條管的是「同一張碟的不同條目資訊量差一個數量級」**。
**形狀很陰險**：拉到的是**正確**那張碟、`formats` 與 `tracklist` 都對，**只有 credits 是空的**——**「抓到了」與「抓到空的」長得一樣**（第 1370／1371 條那一族在資料欄上的應驗）。

**→ 給後批的固定動作**：**`extraartists` 回空陣列或少於 3 筆時，不要當成「這張碟沒有 credits」**，
**改拉同一 master 底下的另一個地區版本再看一次。** 原壓不必然是資訊最全的那一版——本組兩次都是**非原壓**那一版才完整。

---

## 第 2998 條（b 組研究，**逐筆清單**）：**推翻或修正策展層／列舉檔／派工信的 6 處，另有 3 處「來源自己打架」只標不定案**

### （一）推翻或補正 6 處

| # | 出處 | 原句 | 本棒查到的 | 依據 |
|---|---|---|---|---|
| 1 | **派工信第三節第 4 點＋第 2194 條** | 「seed 實際有《Scratch》與《What If?》**兩張**」 | **3 列**，第三列是 `Joe Locke & Kenny Barron《But Beautiful》(1991)` | 重掃 seed 17248 列（第 2993 條） |
| 2 | **策展層 `Emma Salokoski & UMO` 的 `risk`** | 只寫「Discogs notes 記瑞典語詞 Mayvor Fridlund」，未指語言方向 | **瑞典語是原詞、芬蘭語是翻譯**；且姓名全名是 **`Mayvor Fridlund-Lintinen`**（帶連字號，與作曲者 Kirmo Lintinen 同姓） | `umohelsinki.fi` 逐字「laulujen sanoittaja Mayvor Fridlund-Lintinen. Suomenkielisestä käännöksestä vastaa useasti palkittu lastenkirjailija Hannele Huovi」 |
| 3 | **派工信第三節第 2 點** | `Passin' Thru` 是「Montreux 現場」 | **只有第 1 軌**錄於 Montreux（2016-06-30），其餘六軌錄於聖塔菲 The Lensic（2016-07-29） | `bluenote.com/music/passin-thru/` ＋ Discogs `10745067` 的 notes 逐字（與第 2199／2208 條同向，**本棒獨立再證一次**） |
| 4 | **派工信第四節** | 盤頁路徑寫成 `/release/<slug>/` | **真正的路徑是 `/music/<slug>/`**，`/release/` 回 301 | 逐一實測 14 個網址（第 2995 條） |
| 5 | **列舉檔 `Ruben Hein` 的 `catno`** | `50999 9174741 9` | **那是荷蘭黑膠 `5278992` 的號**；CD `2983088` 是 **`50999 9174742 6`**（barcode `5099991747426`） | Discogs 兩筆條目逐字（**與第 2209 條的結論一致，本棒獨立再證**） |
| 6 | **維基 `Jon Cowherd` 條目** | 「released in 2013 on **ArtistShare**」 | **是 Blue Note／ArtistShare 共同發行**：Discogs `5449947` 的 labels 欄逐字同時列兩家、共用目錄號 `ASBN-0126`；`joncowherd.com` 標題逐字「Artist Share/Blue Note Releases…」；ArtistShare 專案頁逐字「Blue Note/ArtistShare release」 | 三邊一致 |

### （二）來源自己打架、只標 uncertain 不定案 3 處

| # | 碟 | 兩邊各說什麼 | 處置 |
|---|---|---|---|
| 1 | **Erik Truffaz Quartet** | Discogs `4052391` 的 notes 逐字「Track 10.1 lasts for 5:05 before a period of silence」，**同頁 tracklist 卻把 10.1 記成 11:08** | `facts` 只寫「留白後藏一首未列名的曲子」，**不寫秒數** |
| 2 | **The Charles Lloyd New Quartet** | `bluenote.com` 把收尾那首寫成 **〈Shiva Dreams〉**，Discogs tracklist 逐字 **〈Shiva Prayer〉** | `facts` 避開曲名，只寫「收尾的祈禱曲是為 Judith McBean 寫的」 |
| 3 | **The James Carter Organ Trio** | Discogs notes 逐字說碟面把第 4、5 軌的時長印錯了並給出 11:41／08:31，**同頁 tracklist 卻是 7:12／6:27** | `facts` 只寫「碟面印錯」這個事實，**不寫哪一組數字才對** |

### （三）查不到而刻意不寫的 2 筆

1. **The Blue Note 7 的錄音日期與地點**：網路摘要普遍說「2008-05-27／28 於 Bennett Studios (Englewood, NJ)」，
   **但逐一開啟維基、DownBeat 與 `bluenote.com` 三個一手頁面都查不到這兩項**，不寫。
2. **Jon Cowherd《Mercy》的錄音年份**：Discogs notes 逐字只有「Recorded December 14-16」與「Mixed December 20-22」，**沒有年份**。
   `facts` 照原文只寫月日。

---

## 第 2999 條（b 組研究，**派工信第七節指定的覆核**）：**`The Blue Note 7` 的八軌來源，研究層獨立再核一次——結論與第 2187 條完全相同**

策展層第 2187 條是從 **MB 的 recording 端點**逐軌核的。**本棒改從 Discogs 的整筆條目核，等於換一個資料源做同一件事**：

| 核什麼 | 本棒查到的 |
|---|---|
| **歐版單 CD `3235910`** | `formats` 逐字 `CD: Album`（**無 `Compilation`、無 `Reissue`**）；八軌，`extraartists` 九筆**全是 The Blue Note 7 的七位團員加三位製作人**，沒有任何一筆是 1960 年代的樂手 |
| **日版單 CD `17285473`** | `released` 逐字 `2008-12-26`、catno 逐字 `Blue Note TOCJ-66466`、barcode `4988006868328`；**同樣八軌**，曲序與歐版逐軌相同（秒差 1–3 秒，是壓片差異）；`companies` 逐字 `Record Company: EMI Music Japan Inc`；credits 比歐版多一筆 `Liner Notes = Takao Ogawa`（日文解說） |
| **⚠ 2 CD Special Edition `4339923`** | `format` 逐字 **`CD, Album` ＋ `CD, Compilation` ＋ `All Media, Special Edition`**——**它自己就把兩片分開標了**；`notes` 逐字 **`Original Sessions produced by Alfred Lion.`**；credits 逐字分成 `Producer [The Blue Note 7] = Bill Charlap／Eli Wolf／Michael Cuscuna` 與 **`Producer [Original Sessions] = Alfred Lion`** 兩組；medium 2 的標題逐字 `The Original Sessions` |

**→ 三筆條目交叉核完，結論與第 2187 條一字不差：本卡釘的八軌形是 2008 年的全新錄音，`Album` 判定成立；
`Compilation` 只屬於 2 CD 版的第二片。** ⚠ **給下游的兩句照第 2187 條（三）不變**：**以 8 軌形為準，抓到 16 軌的就是 2 CD 版；正文不得寫成「收錄 Blue Note 經典錄音」。**

⚠ **本棒另補一格策展層沒記的**：**日版比歐美版多的不只是發行日，還多了 Takao Ogawa 的日文解說**——
**這是「日版是另一個商品而不只是另一個壓片」的第二個證據，可以加強年份改判 2008 的說服力。**

---

## 第 3000 條（b 組研究，**⚠ 給鉤子層與寫作層；本組最密的同構風險**）：**同批二十張裡有 5 組人脈重疊，研究層已先分好切角**

**本組的 20 張不是彼此獨立的**：Glasper 圈五張互為班底、兩張芬蘭盤共用同一群人、兩張 Musica Nuda 是同一組二重奏。
**研究層在 `facts` 這一層就先把重疊的段落拆開**，逐筆記在各卡的 `notes` 裡，下游不要再把它們寫回來：

| # | 重疊 | 誰寫 | 誰不寫 |
|---|---|---|---|
| 1 | **休士頓 HSPVA（Jason Moran／Robert Glasper／Beyoncé 的母校）** | **Kendrick Scott Oracle**（`bluenote.com` 藝人頁逐字列出校友名單） | **Chris Dave**（同校，但本卡只把 HSPVA 寫成生涯線上的一站，不重述校友名單） |
| 2 | **Blue Note All-Stars 這支團** | **Blue Note All-Stars《Our Point of View》** | **Kendrick Scott Oracle**（他是團員，但本卡不寫這一層） |
| 3 | **Emma Salokoski 與 Tuomo Prättälä／J.K. Louhivuori 的人脈**（Prättälä 曾共同領導她的樂團 Quintessence、Louhivuori 是她的姊夫） | **都不寫進 `facts`**，只記在 The Northern Governors 的 `notes` | 兩張皆不寫 |
| 4 | **Erik Truffaz 是《Musica nuda 2》第二片的客人** | **Musica Nuda《Complici》**（列在客人名單裡，一句帶過） | **Erik Truffaz Quartet**（本卡不提 Musica Nuda） |
| 5 | **Musica Nuda 這組二重奏本身** | 《Complici》寫「第一次整張唱自己的新歌」／《Banda larga》寫「第一次與管弦樂團合奏＋十週年」 | **兩卡的 `facts` 沒有任何共用段落** |

⚠ **另有兩處「同名不同物」，下游比對時會踩到**：

1. **〈Dream Weaver〉**：`Charles Lloyd《Passin' Thru》` 的開場曲（Lloyd 1966 年的曲子）**對上** `Logan Richardson《Shift》` 日版 bonus 第 12 軌（Discogs 的 `Composed By` 欄逐字是 **Logan Richardson**）——**同名不同曲。**
2. **`Nicholas Payton`**：在 `The Blue Note 7` 那張是**吹小號的團員**，在 `Otis Brown III` 那張是 Discogs 記的 **`Executive-Producer [Kickstarter Backer]`**——**同一個人、兩種完全不同的角色，不算同構。**

---

## 第 3001 條（b 組研究）：**`qa-batch` 與字元自檢的結果**

```
cd desc-tools && node qa-batch.mjs research c169
  a 20 full,full,…（20 個 full）
  b 20 full,full,…（20 個 full）
  key 與卡單完全一致 ✓
  全部通過 ✓
```

**b 組旗標 0。** ⚠ **`互指?` 沒有輸出，與第 1807-B 條一致**（那是鉤子階段才跑的檢查）。

**字元自檢一律用程式跑、沒有用眼睛掃**（第 126–129 行原文與本批的芬蘭文／日文密度都要求如此）。逐項結果：

| 掃什麼 | 樣式 | 命中 |
|---|---|---:|
| 簡體專用字 | `qa-batch.mjs` 的 `SIMP` 字表原樣 | **0** |
| 非拉丁亂碼 | `qa-batch.mjs` 的 `GARBAGE`（西里爾／天城體／諺文） | **0** |
| 千分位逗號 | `/\d{1,3}(?:,\d{3})+(?!\d)/` | **0** |
| 半形逗號貼中文 | `/[㐀-鿿],\|,[㐀-鿿]/` | **0** |
| `key` 逐字與順序 | 與卡單 `group==='b'` 的 20 個 `key` 全等比對 | **完全相同** |
| `status`／`coverage` 兩欄並存同值 | 逐張比對 | **20／20 一致** |
| `src` 全為 `https` | `/^https:\/\/\S+$/` | **235／235 通過** |
| `hookCandidates ≤ 2` | 逐張 | **20／20 通過** |
| **`src` 實際可開啟** | 59 個不重複網址逐一 `curl` | **見下** |

⚠ **`src` 連線實測的兩個發現（都已修）**：

1. **`bluenote.com` 的 14 個網址裡有 6 個回 301**（`/release/` → `/music/`，另一個是 `/artist/erik-truffaz/` → `/artist/erik-truffaz-2/`）——**已全部改成轉址後的形，現在全數 200。**
2. **`discogs.com/release/<id>-<slug>` 的 26 個網址在雲端一律回 HTTP 403**（換瀏覽器 UA 也一樣，是 Discogs 的 bot 防護，不是網址失效；同一批 release 的 `api.discogs.com` 端點全部 200）。
   **這是既有慣例**：c-167／c-168 的研究稿逐字用的就是同一種 `www.discogs.com/release/…` 形，**本棒照舊**，
   **但記一筆給主線**：若下游的 manifest gate 會對 `src` 發 HTTP 請求，**這 26 個網址會全部被判成失效**。

⚠ **本批的字元類風險點逐一處理過**（第 144 行「逐字引用是字元類違規的主要入口」）：

- **芬蘭文／瑞典文**（`Rytmihyrrä`／`Öronmaneten`／`Jättepandan`／`Ojajärvi`／`Päivinen`／`Långbacka`）：**拉丁變體，依規則合法且照原文保留。**
- **日文假名**（〈愛のバラード〉〈色彩のブルース〉〈キエフの空〉〈スランバー〉〈新千歳空港〉）：**曲名屬專名，依第 144 行的例外合法**；`qa-batch` 的 `GARBAGE` 樣式本來就不含假名，實測不亮。
- **日文漢字人名**依 2026-08-11 裁定照原文寫（須永辰緒／大野雄二／佐野 観／小泉P克人／太宰百合／小島 翔／西嶋 徹／藤井 摂／松岡「MATZZ」高廣），**每一個都有 `universal-music.co.jp` 逐字為據**；
  ⚠ **查不到漢字寫法的（Kazufumi Kodama／Junnosuke Fujita／Yusuke Orita）一律照 Discogs 的羅馬字原樣抄，不自行推回漢字**——**猜錯字形等於改掉人名，比違反字形規則更糟。**
- **法文重音**：James Carter 那張的 Discogs tracklist 把重音全拿掉，`facts` 內文補回原字形（〈Le Manoir de mes rêves〉），
  ⚠ **但 `keyTracks` 欄刻意照 Discogs 的無重音形**——那一欄下游要拿去折鍵比對盤面，補了重音反而對不上（第 30–33 行 `norm` 的 NFD 剝除只處理組合字元，來源兩形不同時仍會折出不同鍵）。

---

## 第 3002 條（b 組研究，**⚠ 派工信與 base 檔／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與它牴觸，以它為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到四處。**

### （一）⚠ 第三節第 2 點把 `Passin' Thru` 寫成「Montreux 現場」——**與第 2199／2208 條同向，派工信自己在第三節第 2 點的括號裡也更正了**

派工信第三節第 2 點的正文逐字先寫「⚠ **`Passin' Thru` 不是「Montreux 現場」**」再展開，**這一點派工信是對的**；
**真正寫錯的是 `slice.json` 的 `note`**（第 2208 條（三）已記）。**本棒實測 `bluenote.com/music/passin-thru/` 與 Discogs `10745067` 的 notes，兩邊都逐字支持「1 軌 Montreux ＋ 6 軌 The Lensic」。**

### （二）⚠ ⚠ 第四節的路徑清單把盤頁寫成 `/release/<slug>/`

**這是本棒唯一一處「照派工信做會做錯」的**：`/release/<slug>/` 回 301。**正確是 `/music/<slug>/`**（第 2995 條）。
**建議把這一句寫進簡報第三節，與第 2867 條的「出身地分界」並列。**

### （三）⚠ 第四節第 1 點「⚠ 關鍵字要把藝人名放最前面」這條建議在本棒無效——**原因不是關鍵字，是端點**

派工信教的是調整 `posts?search=` 的關鍵字順序。**本棒實測：`wp-json/wp/v2/types` 回的公開型別只有 `post` 與 `page`，
`/music/` 與 `/artist/` 兩種頁都不是 `post`**——**關鍵字怎麼排都搜不到盤頁，這是端點的邊界不是查詢技巧的問題**（第 2995 條（二））。
**「撇號會讓 search 落空」那一句本棒沒有機會驗證**（本組帶撇號的只有 `Passin' Thru`，而它的盤頁是用直接猜 slug 找到的）。

### （四）⚠ 第三節第 4 點「seed 實際有兩張 Kenny Barron」——**漏了第三列**（第 2993 條）

### ⚠ 另記三句不算牴觸、但與實況有出入的

- 派工信第四節說「c-168（1985–1999 段）實測 Discogs 整筆 18／18 是絕對主力、`bluenote.com` 只有 1／18」，並預測「你這一段的歐洲分支盤大概率也是這樣，Glasper 圈那幾張才回得到 `bluenote.com`」——
  **預測正確，但比例要修正**：b 組的 `bluenote.com` 是 **7／20**（美國本部 9／11、歐洲與日本分支 0／9），**比 c-168 高得多**，
  **因為 b 組的美國本部盤有 11 張、c-168 只有 1 張**。**Discogs 整筆仍是 20／20 的絕對主力。**
- 派工信第二節說策展層 b 組實測「15／20 有圖、只有 6 張來源是原盤或唯一版本、5 張 404」——**本棒未重驗封面，照抄第 2205 條**，
  但已把 Discogs 記到的兩筆版式（Aron Ottignon 的 `4-panel digisleeve with a 12-page booklet`、Sarah McCoy 的 `Gatefold cardboard, including a 16-page booklet`）寫進對應卡的 `notes` 供封面層使用。
- 派工信第五節第 6 點提醒 `itunes.apple.com/search` 會 403——**本棒完全沒有動用店面查法**（策展層第 2204 條已跑完），
  **因此本稿沒有任何一條 fact 涉及「在不在架上」。**

### ⚠ **第 1803-B 條的交件聲明**

**工作區當下的 `desc-tools/batches/research/c169-b.json` 才是交件版。**
本棒中途存檔 7 次（每 3 張一次，最後一次是 19–20 張），**交件前又整檔改過一輪 `src`（14 個 `bluenote.com` 網址改成轉址後的形）**——
**「筆數對了」不等於「定稿了」**：那一輪改動之後 `qa-batch` 與全部字元自檢都重跑過一次，**以磁碟上這一版為準。**

---

# c-169 **b 組鉤子層（20 張，2008–2019）** 裁定　2026-09-19

*（編號 3261–3300 為 b 組鉤子層專用區間。本段以 append 寫入，未動前面第 1557–1560-AE 條、
a 組策展第 2126–2149 條、b 組策展第 2186–2209 條、a 組研究第 2851–2871 條、
a 組鉤子第 3041–3050 條與 b 組研究第 2991–3002 條。）*

## 第 3261 條（b 組鉤子，**第 1793-B／1816-B／3041 條的例行動作**）：**尺先倒回去量 a 組，逐格重現 213–229／中位 226／分佈 0-1-19-0**

本棒用的公式逐字是 `hook-base.md` 雲端註記第 2 點寫死的那一條，**只扣四樣、其餘一律算**：

```
預算 ＝ Array.from(hook).length ＋ Array.from(note).length
      − 「主故事：」 − 每一個「→」 − 「正文只寫上列各項。」 − 「這條骨架全批只走本張。」
```

**倒回去量 `desc-tools/batches/hooks/c169-hooks-a.json`（20 張）的結果：min 213、max 229、中位數 226、
分佈 ≤209 零張／210-219 一張／220-229 十九張／230+ 零張——與第 3041／3050 條回報的數字逐格相同。**
**→ 尺同、公式同，本組的數字可以與 a 組並排讀。**

⚠ **另校準了 hook 加權的算法**：a 組回報 19–31.5，本棒先用 `/[A-Za-z0-9]/→0.5` 量到 19–33，
改用 **`/[\x00-\x7F]/→0.5`**（`chk-hook-crossgroup.mjs` 第 116 行的原樣，**半形空格與 ASCII 標點也折半**）
才逐格重現 19–31.5。**給後批：hook 加權一律照該行的 `[\x00-\x7F]`，不要只折英數。**

**本組 20 張實測（程式產生，未手動歸類——第 1814-B 條）**：min **213**、max **229**、中位數 **225**、**超標 0**；
分佈 **≤209 零張／210-219 兩張／220-229 十八張／230+ 零張**。
hook 加權 **15–32**（上限 50）、note 原始字元 **208–237**（上限 350）。
**兩組合計 40 張：預算 213–229、超標 0。**

---

## 第 3262 條（b 組鉤子，**第 1816-B／3042 條在本批的實測；係數同樣不可繼承，而且本組是反方向**）：**第一版 20 張全部超標 267–351（16%–53%），中位數 323.5**

第一版草稿（主故事鏈四到六格、編制與客座逐人點名）**20 張全部超標**：分佈 **267–351**，中位數 **323.5**。
最嚴重的三張是 Blue Note All-Stars **351**（超 53%）、Otis Brown III **342**、Kendrick Scott **341**；
最輕的 R+R=NOW **267**（超 16%）。**定稿中位數 225，整體砍掉約 30%，共跑了四輪整格捨去。**

⚠ **與 a 組比對，幅度分佈不同**：a 組 237–374（3%–63%），**b 組 267–351（16%–53%）——
b 組的下緣高得多（最輕的一張也超 16%），因為 b 組 20 張的事實密度比 a 組平均**。
**a 組那種「天生就短」的卡（U-Street《Helsinki Sessions》237）在 b 組一張都沒有。**
**→ 第 3042 條「同一批內部的係數也不可互相繼承」在跨組這一層同樣成立：a 組的幅度分佈不能拿來預估 b 組。**

⚠ **本組的專名密度另有一種 a 組沒有的形狀**：**Glasper 圈五張的側人名單特別長**
（Blue Note All-Stars 六位團員一格 65 字元、Chris Dave 的 Drumhedz 名單一格 90+、
R+R=NOW 六位團員一格 62），**一格就是整份預算的三成。這三格全部整格捨去或壓成「六人團」四個字。**

---

## 第 3263 條（b 組鉤子，**整格捨去清單；第 1793-B 條末句：算不下就在鉤子層捨，不留給寫作層砍**）：**共 31 格**

| 碟 | 捨去的格 |
|---|---|
| Mosaic | 〈Search for Peace〉與〈Dolphin Dance〉兩首由團外 Renee Rosnes 編曲；Lundvall 的英文發片語錄；2009 年北美五十城巡演 |
| Loose Fit | 先行單曲〈Elephants〉；製作 Stefan Kruger 與 Fons Merkies；皇家音樂廳管弦樂團銅管組；2012 年《Revisited》重錄；1982 年生於荷蘭 |
| Rytmihyrrä / Rytmyra | Salokoski 是芬蘭瑞典語族、母語即瑞典語；二十一首的曲風清單（螞蟻藍調／企鵝森巴）；UMO 的創團沿革 |
| Complici | 六位外找作者裡的四位（Luigi Salerno／Alessio Bonomo／Massimiliano Casacci／Pasquale Ziccardi）；四首翻唱的原唱名單；義大利原壓版式 |
| El tiempo de la revolución | 《Bending New Corners》的法國銀唱片；錄音分 2011 年 9 月與 12 月兩段；限量版 DVD 的 Montreux 場次 |
| This Is the Northern Governors | 合音三位與客串饒舌 Redrama；七人編制逐一點名；發行方 Oy EMI Finland Ab；Prince／Miles Davis／Zappa 三位英雄 |
| Mercy | 四人錄音班底（Blade／Patitucci／Frisell）；〈Mercy Suite〉三樂章；父母的職業；1998 與 2000 兩張 Fellowship 碟的年份 |
| Banda larga | Di Gregorio 兼打的六種敲擊樂器與 Spinetti 的 saz；〈Spina Dorsale〉與 Joe Barbieri 的對唱；兩首翻唱的原作者 |
| The Thought of You | 福音那一格（Nikki Ross／Shedrick Mitchell／Glasper）；核心陣容逐一點名；Byrd 那句「改變一生」的自述 |
| We Are the Drum | DownBeat 學生獎與 Berklee 獎學金；五人編制逐一點名；歐版版式與 Lizz Wright 出借聲明 |
| STE | 芬蘭短號手 Jukka Eskola 與〈キエフの空〉；末軌〈スランバー〉翻 Lee Morgan；伴奏班底九位日本樂手逐一點名 |
| Shift | New School 的三位老師；貝斯 Harish Raghavan 與鼓 Nasheet Waits；SHIFT 這個團名的十年來歷 |
| Team Aquatic | Stromae 與 Woodkid 兩段合作；Aronas 與 ARIA 入圍；摩洛哥／西非／maloya 的節奏來源清單 |
| Our Point of View | 六位團員逐一點名；Monterey 首演；十一軌九十分鐘兩片；Glasper 與 Don Was 的兩段英文引語 |
| Chris Dave and The Drumhedz | 近五十人的 Drumhedz 名單；2013 年免費 Mixtape；Kingsize Soundlabs 包場一個多月；第 61 屆葛萊美入圍 |
| Concentric Circles | 側手時期的 Stanley Turrentine／Booker Ervin；新五重奏四位團員逐一點名；Systems Two 的錄音日 |
| Collagically Speaking | 六位團員逐一點名；客席人聲名單；Christian Scott 的那段英文引語 |
| Passin' Thru | 1965 年第一支四重奏（Jarrett／McBee／DeJohnette）；New Quartet 三位團員；獻給 Judith McBean；七軌裡五軌超過八分鐘 |
| Blood Siren | Oopsie Daisies 的塑膠桶貝斯；2014 年 OffBeat 入圍；Gonzales 在碟上彈的樂器清單；紀錄片導演 Bruno Moynie |
| Live From Newport Jazz | 六首曲名逐一列出；Don Was 的底特律同鄉線；管風琴三重奏的「底特律理由」那段自述；《Chasin' the Gypsy》續篇 |

**捨去的優先序照第 1809-B 條與 a 組第 3049 條更正後的判準句：
「名單型＝一格裡出現兩個以上只起點名作用的專名，密度最低者先砍」，門檻與人數無關。**
⚠ **本組實測再證 a 組那條更正**：**兩人並列的名單格 26–48 字元**
（`Stefan Kruger 與 Fons Merkies` 一格 28、`Gerard Gibbs 與 Alexander White` 一格 32、
`Jason Moran、Reuben Rogers 與 Eric Harland` 一格 41、`Marjatta Pokela 與 Martti Pokela` 一格 36），
**本組捨去的 31 格裡有 14 格是兩人並列。照「三人以上」那個字面執行，本組一格都砍不動。**
**本組 20 張沒有一張靠潤飾句子壓下來，全部是整格捨去（只有兩處是同義縮寫，見下）。**

⚠ **兩處是改寫而不是捨去**：
1. **Mosaic 的年份守門格**由「日版⋯最早上市，歐美版⋯才跟上」改成「**歐美版要到 2009 年 1 月才上架，日本 2008 年 12 月 26 日就先出了**」
   ——**字數幾乎相同，但句子的起點換成歐美**，避免與 Shift 那格的「日版先／歐美後」撞成同一個模子（第 3266 條）。
2. **We Are the Drum 的校名**由英文全稱 `High School for the Performing and Visual Arts`（44 字元）
   改成中文「當地的表演與視覺藝術高中」（12 字元），**省下 32 字元而資訊一個字都沒少**。
   ⚠ **不可改用縮寫 `HSPVA`**：那個字串四邊來源都沒有，`qa-batch` 的專名對照會硬標記。

---

## 第 3264 條（b 組鉤子，**骨架歸屬；照雲端註記第 3 點，只有擁有者寫「這條骨架全批只走本張。」**）：**20 張全部擁有、讓出 0**

**程式從輸出檔實掃（第 1802-B 條：以 `c169-hooks-b.json` 裡帶歸屬句的卡為準，不以本表為準；本表由程式產生、未手打）：20／20。**

| 擁有者 | 那一條骨架 |
|---|---|
| Mosaic | **廠牌為自己的週年，把旗下現役名冊組成一團，重錄自家舊目錄** |
| Loose Fit | **一張碟的聲音分頭在兩個國家接起來（本體在瑞典、弦樂在布拉格）** |
| Rytmihyrrä / Rytmyra | **同一批歌用一國的兩種官方語言各錄一次** |
| Complici | **靠剝光別人的名曲成名的組合，改請外面的人替自己寫新歌** |
| El tiempo de la revolución | **裸名發了十幾年唱片之後，第一次把樂團名放上封面** |
| This Is the Northern Governors | **整團是同一個音樂家族的血親後代** |
| Mercy | **唱片是樂迷先掏錢才錄成的（集資模式）** |
| Banda larga | **以極簡編制聞名的組合，週年時把一整個管弦樂團請上台** |
| The Thought of You | **把自己婚禮上的說話錄音放進一首曲子** |
| We Are the Drum | **同一所高中送出的同學名單** |
| STE | **放了三十年唱片的 DJ，把一路上有淵源的人全找回來錄一張** |
| Shift | **同一張碟有三個不相同的年份：錄音年、日版年、歐美年** |
| Team Aquatic | **整張的曲名都繞著同一個題材（水）** |
| Our Point of View | **唱片獻給一位已故的廠牌主事者，並把他的聲音放進開場曲** |
| Chris Dave and The Drumhedz | **先賣光了演出，手上卻一張唱片都還沒有** |
| Concentric Circles | **領班／個人首作**（⚠ a 組第 3044 條依第 1809-B 條讓給本組的那一條，見第 3265 條） |
| Collagically Speaking | **團名是一道算式／一句話**（⚠ a 組第 3044 條主動釋出的那一條，見第 3266 條） |
| Passin' Thru | **五十年前寫的一首曲子，五十年後被同一個人在台上拉長** |
| Blood Siren | **親人在幾天內相繼過世，接住她的是一架別人留下的鋼琴** |
| Live From Newport Jazz | **把某個外來樂種的整套曲目搬進一個完全不同的編制** |

**本組讓出 0 張、`note` 裡一個字都沒有點名骨架歸給哪一張**（雲端註記第 3 點）
——`qa-batch hooks c169` 的 **`互指? 0 處`** 證實沒有把別張的盤名寫進 note。

### ⚠ 動手前逐張讀過 a 組 20 張，確認與 a 組 17 條擁有骨架無一相撞

**兩處差點相撞、已改掉的**：

1. ⚠ ⚠ **`Sarah McCoy《Blood Siren》` 的天然骨架就是 a 組《The Chase》擁有的那一條**
   （**「街頭賣唱被發掘，最後簽進大廠」**——McCoy 在紐奧良街頭與 Spotted Cat 賣唱、被法國導演發現、最後簽進 Blue Note，**逐格同形**）。
   **本卡改走「親人驟逝後一架別人留下的鋼琴把她接住」**，Gonzales 那一段只寫成「巴黎的一次暖場之後當晚就進錄音室」的具體事件，
   **不寫成「被發掘」的弧線**；`facts` 裡的 Monterey 街頭賣藝、塑膠桶貝斯整格未寫。
2. ⚠ **`The Charles Lloyd New Quartet《Passin' Thru》` 的「兩場演出剪成一張碟」與 a 組《Music Stories》擁有的
   「同一張碟收了相隔十六年的兩場錄音」是同一條骨架。**
   **本卡改走〈Dream Weaver〉五十年後被拉長那一條**；**兩場演出仍寫進鏈上一格**
   （策展層第 2199 條與研究層第 2998 條都要求正文不得寫成 Montreux 單場，整格拿掉會讓寫作層失去防呆），
   **但它不是本卡的 hook 本體、也不是本卡擁有的骨架**——與 a 組《Oh!》把「團名縮寫」留在鏈上而歸屬句給別條的處理同形。

**另外主動避開、沒有任何一張 claim 的一條**：**「廠牌某國分部自己簽人、自己出盤」**。
a 組第 3044 條為了本組的 Ruben Hein（NL）／Aron Ottignon（FR）／Sarah McCoy（DE）三張主動不用它，
**但本組實際上一張都沒有把它寫成主故事鏈**——三張各自走了別的骨架，
**分支身分只以「這張由 Blue Note France 發行」這類發行事實出現在鏈上。**
**→ 給 c-170 與後批：這條骨架在 c-169 兩組都沒有被 claim，仍然是空的。**

---

## 第 3265 條（b 組鉤子，**裁定；a 組第 3044 條讓給本組的「領班／個人首作」五張同形怎麼分**）：**歸 `Kenny Barron Quintet`，其餘四張各換一條骨架、並把序數句整格拿掉**

`prop-b.json` 裡「領班首作」同形的**五張**（a 組第 3044 條點名，`why` 逐字都寫「領班首作」）：
`Jon Cowherd《Mercy》`／`Otis Brown III《The Thought of You》`／`Kendrick Scott Oracle《We Are the Drum》`／
`Kenny Barron Quintet《Concentric Circles》`／`The James Carter Organ Trio《Live From Newport Jazz》`。

**判：歸 `Kenny Barron Quintet`。** 三個理由：

1. **只有這一張的「首作」本身帶著一個反差**：**他 1967 年就在 Blue Note 的唱片上彈琴，只是身分是側手，領銜的第一張等了五十一年**
   （研究層 `facts[3]` 逐字）。另外四張的「首作」都只是一個序數，沒有第二層。
2. **另外四張各有一條比「首作」強得多的骨架**（見第 3264 條的歸屬表），**首作在它們身上是最弱的一格**。
3. **可逆**：改的是 `note` 的鏈，不是卡池結構。

### 其餘四張的處置：**序數句整格拿掉，不是降級**

| 卡 | 改走的骨架 | 「首作／第一張」在定稿裡出現幾次 |
|---|---|---:|
| Mercy | 樂迷集資 | **0**（`facts[4]` 的「第一張領班專輯」整格未寫） |
| The Thought of You | 婚禮口白錄音 | **0**（`facts[4]` 的「十五年側手／第一張領班作」整格未寫） |
| We Are the Drum | HSPVA 校友名單 | **0**（`facts[4]` 的「以領班身分在 Blue Note 的第一張」整格未寫） |
| Live From Newport Jazz | Django 曲目搬進管風琴三重奏 | **0**（`facts[1]` 的「以領班身分在 Blue Note 的第一張」整格未寫） |

⚠ **這比 a 組第 3045 條的處理更嚴**：a 組把序數句壓到 4 張、四張範圍各不相同；
**本組壓到 2 張**（`El tiempo de la revolución` 的「第一張把樂團名掛上封面的」＝掛名範圍、
`Concentric Circles` 的「在這個廠牌的第一張領班作」＝領班範圍），**兩張的範圍完全不重疊。**
**跨組合計 9 次**（a 7／b 2），**但 a 組那 7 次裡有 2 次是「某國第一位」而不是序數首作**。
⚠ **另記一處改寫**：`Passin' Thru` 原稿寫「他 1966 年**第一張**四重奏專輯的同名曲」，
**定稿改成「1966 年**那張**四重奏專輯」**——指的是 1966 年的舊碟不是本作，留著會讓序數句多一次、而且容易被誤讀成本作。

---

## 第 3266 條（b 組鉤子，**`chk-hook-crossgroup` 看不到、只能自己盯的句型模子；跨組逐條數**）：**a 組壓的六種本組全部守住，本組自己另壓下四種；只有兩種跨組到 3**

**動手前用程式把 a 組 20 張與本組 20 張串起來逐詞數**（第 1764-B／1816-B／3046 條）。**結果**：

| 模子 | a 組 | b 組 | 合計 | 處置 |
|---|---:|---:|---:|---|
| ① **團名由來／解義** | 2 | **1** | **3** | ⚠ **刻意超過 2，見下** |
| ② **「唯一的外來曲是 X」** | 2 | **0** | 2 | 本組五張有素材（Kendrick Scott 的 Flying Lotus／Sunaga 的 Lee Morgan／Logan Richardson 的 Bruno Mars／Banda larga 的兩首翻唱／Kenny Barron 的三首翻奏），**全部改寫成不帶「唯一／只有一首」的敘述或整格捨去** |
| ③ **「唯一」二字本身** | 2 | **0** | 2 | **程式實掃：本組 20 張的 hook 與 note 裡「唯一」0 次。** Aron Ottignon 的「唯一的例外是收尾的〈Rothesay Bay〉」改成「收尾的〈Rothesay Bay〉只剩他一個人彈鋼琴」 |
| ④ **獨立時地格** | 錄於 2／錄音在 2／收音 1／在…完成 2 | **0**（另用四種新句式） | — | 本組的錄音時地一律換句式：「主錄音落在…」「錄音是…兩天」「錄音只花四天」「這張是…的現場」「七軌剪自…兩場演出」**五種各 1 次，與 a 組的四種零重疊** |
| ⑤ **「某人一人寫／一人包辦」** | 2 | **0** | 2 | Emma Salokoski 的「Markku Veijonsuo 一人包辦錄音混音母帶」、Banda larga 的「Di Gregorio 一手包辦編曲指揮」**兩格都捨去** |
| ⑥ **「母帶掛給某某」** | 2 | **0** | 2 | 本組七張有母帶工程師（Dave Kutch ×2／Bernie Grundman／Ian Sefchick／Norman Nitzsche／Max Ross／Paul Blakemore），**七格全部捨去**（也是名單型，兩條規則同向） |

### ⚠ 本組自己另外抓到、a 組沒有的四種模子

| 模子 | 第一版 | 定稿 | 怎麼壓的 |
|---|---:|---:|---|
| **「入圍而非得獎」** | **5**（Ruben Hein 的 3FM／Otis Brown 的《Bird Songs》／Aron Ottignon 的 ARIA／Sarah McCoy 的 OffBeat／Chris Dave 的第 61 屆葛萊美） | **0** | **五格全部捨去。** 研究層每一張都逐項標了「入圍不是得獎」，照寫會讓五張的成績段長成同一個模子；**Chris Dave 那張改寫成「他參與的三張唱片各自拿下葛萊美」——那是得獎，而且獎是給那三張碟不是給本作** |
| **「日本先發／歐美後出」** | 3 | **2** | ⚠ **這兩次是事實強制的年份守門**（Mosaic 判 2008、Shift 判 2015，兩張的 MB 與歐美壓片都寫晚一年），**不寫就會被寫作層寫成 2009／2016**。**兩格的句子起點刻意相反**：Mosaic 從歐美講起、Shift 從日版講起。**跨組含 a 組《Oh!》共 3 次，本條明記，不掩蓋** |
| **「獻給／悼念已故者」** | 3 | **1** | Passin' Thru 的「獻給已故好友 Judith McBean」整格捨去（**收尾曲名本來就是研究層標 uncertain 的三處之一**），**只留 Our Point of View 的 Bruce Lundvall**；Blood Siren 的父親與祖母是傳記事件不是題獻，不同形 |
| **「校友／同學名單」** | 3 | **1** | Kendrick Scott 的 HSPVA 校友名單（Moran／Glasper／Beyoncé）**只由本張寫**；**Chris Dave 同校，本卡整格不寫學校**（照研究層第 3000 條的分配）；**Otis Brown III 的母親當校長的 Newark 藝術高中是 Sarah Vaughan 與 Wayne Shorter 的母校——那兩個名字整格捨去**，只留「母親後來是那所高中的校長」 |

### ⚠ ① 團名由來跨組到 3，這是本層的一個裁定，不是疏忽

**派工信第三節逐字要求「每種壓到 2 次以內——跨組也要算」，而 a 組已經用掉 2 次**
（《Helsinki Sessions》的 U＝街名、《Oh!》的四姓縮寫）。**照字面執行，`R+R=NOW` 不能寫團名解義。**

**判：仍由 `R+R=NOW` 寫，跨組來到 3 次。** 三個理由（裁定權下放的三條判準都指同一邊）：

1. **有先例，而且是 a 組自己立的**：**第 3044 條末段逐字寫「本組只由《Helsinki Sessions》claim 團名由來這條」「**→ b 組的 `R+R=NOW` 仍可寫團名解義**」**
   ——**a 組把《Oh!》那一次明確定性成「鏈上一格、不是它擁有的骨架」，並把這條骨架的第二個擁有權留給本組。**
   **以「擁有權」計，跨組是 2（Helsinki Sessions ／ R+R=NOW）；以「出現次數」計才是 3。**
2. **卡住整條線**：`R+R=NOW` 的 12 條 facts 裡，**團名算式與 Nina Simone 那句回答是唯一一條帶人物與立場的故事**
   （其餘是 SXSW 的成團經過、四天錄音、客席名單、六人各自的來歷——全是流程與名單）。
   **拿掉它，這張只剩「一場即興演出變成一張碟」，而那與 Chris Dave 的「先有演出後有唱片」直接撞。**
3. **可逆**：只動 `note` 的鏈。

⚠ **同時把本組另外兩張同形的整格壓掉**，否則會到 5 次：
- **`The Northern Governors`**：`facts[4]` 有「團名與奈及利亞的關聯？Prättälä 說那只是巧合」——**整格未寫。**
- **`Emma Salokoski & UMO`**：`facts[6]` 有「UMO＝Uuden Musiikin Orkesteri 的縮寫」——**整格未寫。**

⚠ **`chk-hook-crossgroup c169` 在壓之前與壓之後都是 `✓ 全部通過`，這十種模子它一次都沒亮。**
與第 1816-B／3046 條的結論一致：**機器只看前四字與關鍵詞，句型層的同構只能靠人掃。**

---

## 第 3267 條（b 組鉤子，**研究層第 3000 條那張「5 組人脈重疊的切角分配表」逐條落實**）

研究層第 3000 條是專門寫給本層的。**五條逐條對照定稿**：

| # | 重疊 | 研究層指定 | 定稿 |
|---|---|---|---|
| 1 | **休士頓 HSPVA** | Kendrick Scott 寫、Chris Dave 不重述校友名單 | ✔ **Kendrick Scott 的 hook 本體就是這條**；**Chris Dave 那張整格沒有學校**（連「HSPVA」四個字都沒有，只寫「中學時已經在休士頓替唱詩班打鼓」→ 後來連這一格也因預算捨去） |
| 2 | **Blue Note All-Stars 這支團** | All-Stars 那張寫、Kendrick Scott 不寫 | ✔ **Kendrick Scott 的 note 完全沒有 All-Stars**；All-Stars 那張的六位團員逐一點名也捨去了，只寫「這支六人團」 |
| 3 | **Salokoski 與 Prättälä／Louhivuori 的人脈** | 兩張都不寫 | ✔ **兩張都沒有。** Emma Salokoski 那張只寫 UMO 與 Lintinen，Northern Governors 那張只寫 Pokela 家族 |
| 4 | **Erik Truffaz 是《Musica nuda 2》第二片的客人** | Complici 寫、Truffaz 那張不寫 | ⚠ **兩張都不寫。** Complici 的客人名單是名單型、密度最低，**在第二輪整格捨去**；**Truffaz 那張本來就不提 Musica Nuda。** 研究層的分配沒有被違反（它要求的是「不要兩張都寫」） |
| 5 | **Musica Nuda 這組二重奏本身** | Complici 寫「改請外面的人寫新歌」／Banda larga 寫「十週年＋管弦樂團」 | ✔ **兩張的鏈零重疊**；⚠ **只有「Petra Magoni 加 Ferruccio Spinetti 的二重奏」這個編制說明兩張都有**——**那是識別這張碟所必需的，不是切角** |

⚠ **研究層另記的兩處「同名不同物」，本層的處置**：
1. **〈Dream Weaver〉**（Charles Lloyd 的開場曲 vs Logan Richardson 日版 bonus 的同名曲）——
   **Logan Richardson 那張的曲名整格未寫**（日版 bonus 只寫「多收兩首」不寫曲名），**曲名不可能被寫錯卡。**
2. **`Nicholas Payton`**（Blue Note 7 的團員 vs Otis Brown III 的 Kickstarter 贊助者）——
   **兩張都整格未寫他。** Blue Note 7 的七人只點名音樂總監 Bill Charlap，Otis Brown 那張的 Kickstarter 那一格整格捨去
   （**順帶避開與 Jon Cowherd 的集資骨架撞形**，見第 3268 條）。

---

## 第 3268 條（b 組鉤子，**派工信第四節的六條硬事實，逐條落實**）

| 派工信第四節 | 定稿怎麼寫 |
|---|---|
| **1. `The Blue Note 7《Mosaic》` 是 Album 不是合輯、年份 2008** | 鏈上逐字「**八首曲子全部取自 1950 到 1960 年代的自家目錄，由這七個人重新錄製**」——**「重錄」兩個字在 hook 本體與鏈上各出現一次**；**「收錄」「經典錄音」「原版母帶」「Special Edition」「16 軌」全篇 0 命中**（程式實掃），寫作層拿不到任何可以寫成合輯的素材。年份走「歐美版要到 2009 年 1 月才上架，日本 2008 年 12 月 26 日就先出了」＋`發行年寫 2008 年。` |
| **2. `Passin' Thru` 年份 2017、不是 Montreux 單場** | 鏈的末格逐字「**七軌剪自 2016 年夏天的兩場演出：Montreux 一軌，聖塔菲 The Lensic 六軌**」；`發行年寫 2017 年。` 緊接其後。**「Montreux 現場」這個說法全篇 0 命中** |
| **3. `Emma Salokoski & UMO` 瑞典語是原詞** | 鏈上逐字「**瑞典語是原詞、出自 Mayvor Fridlund-Lintinen，芬蘭語是 Hannele Huovi 的翻譯**」——**姓氏帶連字號的全名照研究層原樣**，語言方向明寫 |
| **4. `Jon Cowherd《Mercy》` 不是純 ArtistShare 盤** | 鏈的末格逐字「**目錄號同時掛 ArtistShare 與 Blue Note 兩個廠牌**」；集資那一格也寫成「走 ArtistShare 的樂迷集資」而不是「由 ArtistShare 發行」 |
| **5. `Kenny Barron` 在 seed 是 3 列不是 2 列** | ⚠ **本層沒有任何一張寫「池中既有數」**——那是掛名層與策展層的資訊，**不是寫給消費者的正文**。**這一條在鉤子層無落點**，記在此處供主線核對 |
| **6. 三處來源打架不寫進 `note`** | ✔ **三處全部 0 命中**（程式實掃）：Truffaz 隱藏曲只寫到「四重奏／客席」為止，**秒數與「隱藏曲」整格未寫**；Charles Lloyd **末軌曲名整格未寫**（〈Shiva Dreams〉與〈Shiva Prayer〉都沒有）；James Carter **第 4／5 軌時長與「碟面印錯」整格未寫**，只留開場曲的 11:29（那一格四層一致） |
| **7. 兩筆查不到而不寫** | ✔ **Blue Note 7 的 Bennett Studios 與錄音日期 0 命中**（本卡整張沒有錄音地點）；**Jon Cowherd 的錄音年份 0 命中**（本卡整張沒有錄音日期，連「12 月 14 到 16 日」都沒寫——**寫月日而不寫年份反而會誘發寫作層去補年份**） |

---

## 第 3269 條（b 組鉤子，**兩支腳本的結果與 `互指?` 判讀**）

```
cd desc-tools && node qa-batch.mjs hooks c169
  → （略過 qa-check-hooks.mjs：本 repo 無此檔）
  → 全部通過 ✓
cd desc-tools && node chk-hook-crossgroup.mjs c169
  → c169｜2 組｜40 張
  → hook 加權 15–32｜note 198–237
  → ✓ 全部通過
```

- **`qa-batch hooks c169` 總標記 0。** ⚠ **a 組交件時的那 1 個標記（`⚠ b 缺 hook 檔`）已消失**
  ——那是管線形狀不是旗標（第 1815-B 條、第 3048 條），**b 組交件後兩組合計 40 張、標記 0，與派工信第五節第 3 點的預期一致。**
- **`互指? 0 處`。** 逐筆人工判讀（第 1763-B 條）：**本組 20 張的 note 裡沒有任何一個專名或曲名落在「本卡研究稿沒有、同批別張有」那一級。**
  ⚠ **四處刻意檢查過的同批鄰居，全部確認取自本卡自己的 `facts`**：
  1. **`Robert Glasper`** 出現在 We Are the Drum 的 hook 與 note——**取自本卡 `facts[1]` 的 HSPVA 校友名單**，
     不是從 Collagically Speaking 那張搬來的；**Collagically Speaking 那張的 Glasper 取自它自己的 `facts[1]`。**
  2. **`Charles Lloyd`** 在 We Are the Drum 的研究稿 `facts[3]` 逐字有（他替 Lloyd 巡演過）——**本層那一格已整格捨去**，定稿只留 Herbie Hancock 與 Terence Blanchard，**兩張零交叉。**
  3. **`Kendrick Scott`** 是 Our Point of View 的團員——**All-Stars 那張的六位團員逐一點名整格捨去**，定稿只寫「這支六人團」，**兩張零交叉。**
  4. **兩張 Musica Nuda 各自的鏈**——**逐格回查各自的 `facts`**（第 2817 條）：Complici 的《Musica nuda 2》與 Premio Tenco 取自本卡 `facts[2]`，Banda larga 的十週年與管弦樂團取自本卡 `facts[1][3]`。
- **字元自檢（程式，不用眼睛掃）**：`qa-batch` 的 `charScan('hooks-b')` 四道（非拉丁亂碼／簡體字／半形逗號貼中文／千分位逗號）**全部 0**；
  本層另跑一次獨立掃描（西里爾／天城體／諺文／希伯來／阿拉伯五個字集）**亦 0**。
  ⚠ **日文假名與漢字是專名，依 base 檔字元條合法且必須照原文保留**：
  `レコード番長`／`須永辰緒の夜ジャズ`／`〈愛のバラード〉`／`《犬神家の一族》`／`須永辰緒`／`大野雄二`；
  **`qa-batch` 的 `GARBAGE` 樣式本來就不含假名，實測不亮。**
  ⚠ **變音符一律照原文保留、未做任何折換**：`Rytmihyrrä`／`Malmö`／`Benoît`／`Prättälä`／`Beyoncé`／`revolución`／`Läm`（無）。
  ⚠ **`Bruce’s Vibe` 與 `You’re Still the One` 的 U+2019 照研究稿原樣**；**卡單盤名 `Passin' Thru` 的 ASCII 撇號照第 2197 條。**
- **schema 自檢**：20 筆、`[{key, hook, note}]` 三欄、**key 順序與研究稿逐字全等**（`JSON.stringify` 比對）、重複 key 0、
  **key 全部在卡單內**、**hook 開頭前四字 40／40 跨組互異**、hook 句末全形標點 20／20、
  hook 禁語 0、hook 否定句 0、分數星等 0、note 校對痕跡 0。

---

## 第 3270 條（b 組鉤子，**⚠ 派工信與 base 檔／既有裁定牴觸之處**）

派工信第一節逐字要求「本信若與它牴觸，以它為準，並在交件回報裡指出本信哪一句寫錯了」。**本棒查到一處真牴觸、三處與實況有出入。**

### （一）⚠ 真牴觸：第三節最後一段的「六種模子每種壓到 2 次以內，跨組也要算」與 a 組第 3044 條末段直接相撞

派工信逐字：「**a 組已自查過「團名字母各代表一個字」這條（你的 `R+R=NOW` 有、它有兩張同形，**只由 `Helsinki Sessions` claim**）**」
——**這一句是對的**；但同一節上面又逐字寫「**每種壓到 2 次以內——跨組也要算**」。
**a 組的《Oh!》已經是第 2 次，照後面那句字面執行，`R+R=NOW` 就不能寫，而派工信自己前一句才說它可以寫。**

**→ 以 a 組第 3044 條的原文為準**（逐字：「**b 組的 `R+R=NOW` 仍可寫團名解義**」）。
**正確的計法是：「擁有權」跨組不超過 2，「鏈上一格」的出現次數另計。**
**本組照此執行，並把本組另外兩張同形（Northern Governors、Emma Salokoski）整格壓掉**（第 3266 條）。
⚠ **這與第 1795-B／3049 條同一族**：**把裁定的括號說明或另一節的摘要當成獨立條件，兩句就會互相打架。**

### （二）與實況有出入、不算牴觸的三句

1. **派工信第二節說「a 組 claim 17 張、讓出 3 張」——正確，本棒實掃 `c169-hooks-a.json` 覆核，帶歸屬句的是 17 張。**
   ⚠ **但「歸屬表在裁定第 3044 條」這句要補一格**：**第 3044 條的擁有者表只列了 17 列，
   而它同時寫「程式從輸出檔實掃⋯17／20」——兩者一致，覆核通過。**
2. **派工信第五節第 1 點說「a 組第一版 20／20 全超標 237–374（3–63%），幅度分佈是本線最散的一批」——正確，
   但「最散」這個形容對本組沒有預測力**：b 組第一版 267–351（16–53%），**幅度較窄而下緣高得多**（第 3262 條）。
   **要能預估的話，該看的是「每張有幾條 facts 帶名單」，不是上一組的百分比。**
3. **派工信第五節第 1 點說「a 組實測兩人並列的名單格就已 26–35 字元」——本組實測是 26–48 字元**
   （`Jason Moran、Reuben Rogers 與 Eric Harland` 一格 41、`Gerard Gibbs 與 Alexander White` 一格 32、
   `Marjatta Pokela 與 Martti Pokela` 一格 36）。**上緣比 a 組高，因為本組的英美人名比 a 組的芬蘭／義大利人名長。**

---

## 第 3271 條（b 組鉤子，**第 1803-B 條的交件聲明**）：**工作區當下的 `desc-tools/batches/hooks/c169-hooks-b.json` 才是交件版**

⚠ **「筆數對了」不等於「定稿了」**（第 1803-B 條，本線已七次）。
**本棒的交件版就是工作區當下的那一份**：20 筆、預算 213–229／中位 225／超標 0、
`qa-batch hooks c169` 全部通過（總標記 0）、`互指? 0 處`、`chk-hook-crossgroup c169` ✓ 全部通過（40 張）。
**寫檔是分四次落地的**（5／10／15／20 張，**每一次都把完整陣列整份寫回**，因此任何一個中途版本都是合法 JSON）；
**筆數到 20 之後又整份改過四輪**（整格捨去四輪、模子壓縮、事實校正、預算微調），
**任何一個 20 筆的中途版本都不是定稿。**
**若容器重啟後看到的檔案筆數少於 20，接續補完即可，不要從頭重寫。**

本層**未動** `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／`previews.json`／`caa.json`／
`c169-hooks-a.json`／`c169-b.json`／其他批次的檔案，**未 `git commit`、未 `git push`、未動 git 索引**。
暫存檔全部落在 scratchpad 且帶 `c169hb-` 前綴。

---
