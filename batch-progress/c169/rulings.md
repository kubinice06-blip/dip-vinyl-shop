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
