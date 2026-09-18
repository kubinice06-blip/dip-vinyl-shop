# c-149 裁定（Blue Note 1985 後，第二批）

**編號區間 960–989。** a 組（23 張，1987–89）的裁定記在本檔；b 組另行 append。

---

## 第 960 條（c-149 a 組交件）：**23 筆 → 收 22、退 1；年份改判 4 張；盤名改判 1 張；新掛名 10 個字串；撞陳列 3 張**

- **交件 22 張、21 位**（`batch-progress/c149/prop-a.json`）；**退 1 張**（第 961 條）。
  **22 ＋ 1 = 23**，第 315 條的等式成立。`node batch-progress/c149/chk-prop.mjs a` **標記 0**。
- **年份改判 4 張**（第 962 條）：Charlie Parker《Charlie Parker at Storyville》1988→**1985**、
  Bill Evans《The Paris Concert, Edition Two》1989→**1984**、McCoy Tyner《Revelations》1988→**1989**、
  Don Grolnick《Weaver of Dreams》1989→**1990**。
- **盤名改判 1 張**（第 963 條）：`A Weaver of Dreams` → **`Weaver of Dreams`**。
- **掛名**（第 964 條）：**新掛名 10 個字串**（含 2 個聯名、2 個群組），收攏 0，新造分裂 0。
- **紙本**（第 965 條）：**自己掃了 Billboard 與 Cash Box 1987、1988–89 四份 OCR、共 303 期**，
  已存進 `batch-progress/enum/` 並 append 進 `SOURCES-billboard-cashbox.md`。
  **收工前另以別棒剛落地的 1985h2–1987 與 1990 兩份 OCR 覆核，兩張年份改判升級為紙本確認、
  訂正一個目錄號**（第 979 條）。
- **撞陳列 3 張**（第 967 條）、**紙本假陽性 5 處**（第 968 條）、**店面查無 4 張**（第 966 條）。

---

## 第 961 條（同批）：**退 1 張——《Complete Blue Note Sessions with Art Blakey》是重編，不是新盤**

| 退掉的 | rgMbid | 理由分類 | 判準與證據 |
|---|---|---|---|
| `The Horace Silver Trio` —《Complete Blue Note Sessions with Art Blakey》（列舉檔 1989，Blue Note CDP 7 81520 2） | `ab86de5a-f5f5-3222-b81d-d33f2ce21753` | **重編／再發（§874）＋撞卡** | 見下 |

**判準是第 874 條（舊料重編的比例門檻）：「先前已成盤發行的軌數過半」就是重編。本張是 16/16。**

- **16 軌全部出自 1952-10-09／1953-10-20／1954-11-23 三場 Horace Silver 三重奏錄音**
  （Horoscope／Safari／Thou Swell／Quicksilver／Ecaroh〔MB 誤拼 Eearoh〕／Yeah／Knowledge Box／
  Prelude to a Kiss／I Remember You／Opus de Funk／Day In Day Out／Silverware／How About You／
  Buhaina／Message From Kenya／Nothing But The Soul），**那三場在 1953–56 年就已經以
  BLP 5018／5034／1520 成盤發行過**。目錄號 `81520` 就是 12 吋 `BLP 1520` 的 CD 號。
- **實掃卡池：三張都已在池中**——`Horace Silver`《New Faces New Sounds》1953（c-135 a）、
  《Horace Silver Trio, Vol. 2》1954（c-135 b）、《Horace Silver Trio》1956（c-136 a）。
- ⚠ **這是第 611 條第一種盲區（群組掛名 vs 個人掛名）的活樣本**：本張 MB credit 是
  **`The Horace Silver Trio`（e8c90011 Group）**，池中三張都是 **`Horace Silver`（Person）**，
  **`chk-prop` 的鍵是「掛名｜盤名」，兩邊一個字都對不上，標記照樣是 0。**
  **退卡的依據是逐軌比對，不是 chk-prop。**
- ⚠ **MB 兩個 release 的軌序不同**（5937946b 與 ab2ee5cc 的第 9–16 軌互換），內容相同——
  不是兩張不同的碟。
- **不補別張**（清單已固定，bluenote 簡報 §一.2）。

---

## 第 962 條（同批）：**年份改判 4 張——四張的失效方式各不相同，四種都要記**

### （一）Charlie Parker《Charlie Parker at Storyville》**1988 → 1985**：MB 只建了 CD，沒建首發的 LP

- 列舉檔的 1988 來自 **MB frd 1988-11-16**，而 MB 這個 RG **三個 release 全是 CD 或數位**
  （CDP 7 85108 2／D 100801／XW Digital）——**MB 根本沒建 1985 年的黑膠與卡帶 BT 85108**。
- **首發是 Blue Note BT 85108，1985 年**：Discogs master 156635 的美國原壓群、
  RateYourMusic 的 `BT-85108` 條目、1985 年卡帶實物。
  **85100 系列就是 Blue Note 1985 年 2 月重啟後的檔案系列**——同系列的 BT 85104
  《A Night in Copenhagen》已由 c-146 第 873 條釘在 1985。
- **錄音 1953-03-10／09-22（Storyville, Boston），首次商業發行 1985**——
  照 c-145 的庫存盤寫法：`year` 取首次商業發行年，`risk` 記錄音年與原定目錄號。
- ⚠ **交件前補到了同期紙本第三腳（見第 979 條）**：**Billboard 1985-12-07 評介欄
  「CHARLIE PARKER — Charlie Parker At Storyville, PRODUCER: Bob Porter, Blue Note BT 85108」**，
  內文寫明「Bird 第一次出現在 Blue Note，靠的是 1953 年在波士頓 Storyville 的兩段 air shots」；
  **Billboard 1986-06-28 的 Blue Note 全目錄廣告亦把 BT 85108 列在 85100 系列中**。
  兩則出自 **`enum/billboard-bn-1985h2-1987-ocr.txt`（c-148 掃，本棒收工前才落地）**。
  **1985 從「沒有第三腳的推定」升級為「同期紙本直接確認」。**
  本棒自掃的 1987–1989 四份 OCR 裡 `85108` 零命中，與「1985 年底發行」相符。

### （二）Bill Evans《The Paris Concert, Edition Two》**1989 → 1984**：原盤是他廠

- MB frd 1989 是 **MB 建的最早那個 release 的年份**（1989 年歐洲 Elektra CD），不是首發年。
- **首發是 Elektra／Musician 60311，1984 年**（維基；Discogs 五筆 1984 年美國原壓
  r5242006／r3225369／r2618114／r4506451／r2432460；Apple ℗ 1984 Craft）。
- 依 `CURATION-BRIEF-bluenote.md` §1.3 處理：**`year` 1984、`label` 以 Elektra／Musician 為首，
  Blue Note 的 2001 年歐洲 CD（7243 5 28673 2 5）只寫成授權再發。**
- ⚠ **這是本線「原盤他廠」的極端形**：Blue Note 從頭到尾只出過 2001 年那一版再發，
  這張進清單純粹是列舉檔按 Blue Note 目錄拉的。**判為可逆**（改的是 manifest 的
  `year`／`label` 欄，不是卡池結構）——**若主線日後決定「只收 Blue Note 原發」，撤掉本卡成本低。**
  依裁定權下放的三條判準（有先例／可逆／卡住整條線），**先例（108 張他廠原盤）＋可逆，直接定。**
- ⚠ 順手記一個**不屬於本棒範圍**的疑點交主線：**池中《The Paris Concert, Edition One》記 1982，
  但 Apple ℗ 與 Discogs 原壓群都指 1983**。本棒不改別張卡。

### （三）McCoy Tyner《Revelations》**1988 → 1989**：MB 把 releaseDate 填成 session date

- MB frd **1988-10-25** 是**錄音期**（維基：1988 年 10 月 Merkin Hall，三天錄十三首）——第 484 條的典型形。
- **同期紙本三處全指 1989**：Billboard **1989-03-11 p142 評介欄**（製作人 Michael Cuscuna，Blue Note 91651）、
  Billboard **1989-04-29 p47 Blue Note／Capitol 整版廣告**、
  Billboard Top Jazz Albums **1989-04-01 p64 NEW**（→04-15 等，連掛至 06-24）；
  Cash Box 爵士榜 1989-03-11 起十六期同步。
- 依階序（**廠牌廣告／同期紙本 ＞ 榜位 ＞ Discogs ＞ MB frd**）取 **1989**。
- ⚠ **Apple 條目 `1443518283` 三個欄位全不可用**：releaseDate 1988-08-01（既非錄音月也非發行月）、
  ℗ 2015（2015 數位重發的版權年）、盤名作「Revelations (Live)」。

### （四）Don Grolnick《Weaver of Dreams》**1989 → 1990**：MB 的 frd 是錄音年，而且紙本的沉默可以當證據

- **jazzdisco 的 Blue Note 1989–1990 頁明記「錄音 1989-02-14～16 Skyline Studios NYC，released 1990」**；
  Blue Note 官方藝人頁、daveholland.com 錄音表同指 1990；
  **Jazz Journal 的評介登在 1991 年 1 月號**（晚於 1990 年發行合理，晚於 1989 年則差兩年）。
- ⚠ **交件前補到了決定性紙本（見第 979 條）**：**Billboard 1990-08-11 的爵士／新世紀新片欄登
  「DON GROLNICK Weaver Of Dreams CD Blue Note B2-94591 CA B4-94591」**
  ——**盤名無冠詞、發行年 1990、目錄號 B2-94591／B4-94591，三件事一次釘死**
  （出自 `enum/billboard-bn-1990-ocr.txt`，本棒收工前才落地）。
  **這同時訂正了本棒原本從 Discogs 猜的 catno `CDP 7 93178 2`——那是錯的。**
- ⚠ **紙本的沉默在這裡也是正證據（第 704 條的反面用法），而且事後被證實**：本棒新掃的
  1987／1988–89 四份 OCR 裡 `Grolnick` 命中 **16 則，全部是他當製作人或側人的報導**
  （James Taylor《Never Die Young》、Michael Brecker 首張、Steps Ahead）——**沒有一則是本盤。
  一張 1989 年發行的 Blue Note 爵士盤不可能整年在 Billboard 爵士新片欄零命中**，
  而 1990-08-11 的新片欄證明了它就是 1990 年才上市。
- ⚠ **MB 這個 release 幾乎是空殼**：`0759ff6b` 的 media format 是 `null`、label-info 無 catalog-number、
  無 barcode，只有八軌軌目與 US／1989。**第 642 條已換 `inc=media+labels+recordings+artist-credits`
  確認是 MB 沒有，不是端點問題。**
- ⚠ **本卡年份 1990 越出本段區間**（其餘 21 張都在 1984–89）——列舉檔切批時按 MB 的錯誤 frd
  把它排進了 1989 段。**併批與排序時要注意。**

### 覆核成立、不改的（列出來省得下一批重查）

Song Everlasting 1987／Ever Since the World Ended 1987／Other Aspects 1987／Inferno 1987／
Romance and Revolution 1987／Bordertown 1988／The Eternal Triangle 1988／No Question About It 1988／
Angel Street 1988／Michel Plays Petrucciani 1988／Pieces of Blue and the Blues 1988／
Foreign Affairs 1988／The Nearness of You 1988／La Place 1989／Times Are Changing 1989／
Beauty Within 1989／New Beginnings 1989／Triangular 1989。

---

## 第 963 條（同批）：**盤名改判 1 張，維持 MB 原形 2 張**

| RG title | 卡單值 | 依據 |
|---|---|---|
| `A Weaver of Dreams` | **`Weaver of Dreams`** | **`A Weaver of Dreams` 是盤中第 3 軌的軌名**（Victor Young／Jack Elliott 的標準曲），盤名本身沒有冠詞；jazzdisco、Blue Note 官網、Discogs 原壓群一致。依**第 535 條「取原盤題名而非 RG title」**改判，MB 形進 `queryAlias`，**rgMbid 不動（第 483 條）** |
| `Bordertown` | **照 MB** | jazzdisco 與 **Billboard 1987-12-26 新片欄**作 `Border Town`（兩字），**盤內第 4 軌軌名也是兩字形**；但 MB RG title、Billboard 1988-07-09 評介、Apple、兩刊榜位都是一字形。依第 483／506 條照 RG title，兩字形進 `queryAlias`；**研究層若改回不影響 MBID** |
| `Charlie Parker at Storyville` | **照 MB** | Apple 作 `At Storyville (1953)`、Discogs master 作 `At Storyville`；RG title 是最長也最無歧義的一形，照用，兩個變體進 `queryAlias` |

---

## 第 964 條（同批）：**掛名 8 位新字串、0 收攏、0 分裂——兩個「MB 建錯 type」的案例要記下來**

**新掛名 10 個字串**（池中零列）：
`Mose Allison`（18b76828 Person）、`James Newton`（5fa6d546 Person）、`Bennie Wallace`（f820d0c3 Person）、
`Dianne Reeves`（069c1f30 Person）、`Don Grolnick`（497eeac9 Person）、`Charnett Moffett`（afa877bc Person）、
`The Don Pullen-George Adams Quartet`（7ac6c37d Group）、`Bobby Watson & Horizon`（72973c64，**type 標 Person**）、
`Ralph Peterson Trio featuring Geri Allen`（`Ralph Peterson Trio` c50c8d6e **type null** ＋ `Geri Allen` 4d688d75 Person）、
`Freddie Hubbard & Woody Shaw`（59ae7a1a ＋ 5cdab4ea，**聯名新字串**）。

**照池中先例沿用的**：`Eric Dolphy`（池中 10）、`Biréli Lagrène`（池中 1，重音兩處必須保留）、
`McCoy Tyner`（12）、`Tony Williams`（2，**不與 `Tony Williams Lifetime` 合併**）、
`Michel Petrucciani`（2）、`Charlie Parker`（5）、`Kenny Burrell`（13）、`Bill Evans`（22）、
`Stanley Turrentine`（20）、`Freddie Hubbard`（15）、`Don Pullen`（1）。

### ⚠ 兩個 MB 建檔錯誤，本棒**只記不改**

1. **`Bobby Watson & Horizon` 被建成單一 artist 實體、type 標 `Person`**——「某人 & 某團」登成一個「人」。
   **照 MB credit 字串原樣用**（第 307 條：不自行拆、不自行合併）。
   **日後若 Watson 的個人領班盤進池，要與本字串明確區分，不得事後合併。**
2. **`Ralph Peterson Trio` 的 type 是 `null`**。池中 `Ralph Peterson` 與 `Geri Allen` 皆零列、無先例，
   **不收攏成 `Ralph Peterson`**（那是他個人字串，池中沒有）。
   ⚠ **Discogs 兩個條目掛名不同**：CD r4476830 縮成 `Ralph Peterson Trio`、LP r2681940 用全稱。

### 三組「同一個 RG 內部 credit 不一致」的處理

| RG | RG 層 | release 層 | 取用 |
|---|---|---|---|
| The Eternal Triangle | `Freddie Hubbard & Woody Shaw` | `Freddie Hubbard/Woody Shaw`（五個 release 全是斜線形） | **RG 層的 `&` 形**，斜線形進 queryAlias |
| Triangular | `Ralph Peterson Trio featuring Geri Allen` | `Ralph Peterson Trio/Geri Allen` | **RG 層全稱**，斜線形進 queryAlias |
| Pieces of Blue and the Blues | `Kenny Burrell` | `Kenny Burrell` | **照池中 `Kenny Burrell`**；**Apple 掛成 `Kenny Burrell & The Jazz Guitar Band`**，樂團名進 queryAlias 與正文 |

⚠ **`&`／`and` 分裂（第 611 條盲區、`audits/pool-artist-name-splits.md`）**：本組兩個 `&` 字串
（`Freddie Hubbard & Woody Shaw`、`Bobby Watson & Horizon`）都已確認 chk-prop 的 `k()`
會先把 `&` 折成 `and` 再剝，**不會與 `and` 形分裂**。

### 需要消歧的同名反查（第 307 條）

- **`James Newton` ≠ `James Newton Howard`**（電影配樂作曲家）。Billboard **1987-01-17 p40** 的
  「Yammys」得獎名單講的是 Howard，不是本卡這位笛手。**日後任何 `James Newton` 進池要先帶消歧。**
- **`Bill Evans` 有兩位**：本組《Inferno》的側人是**次中音手 Bill Evans（b. 1958，Miles Davis 1980
  年代樂團）**，與池中 22 列、本組亦收其《The Paris Concert, Edition Two》的**鋼琴家 Bill Evans**
  完全無關。**兩卡 `risk` 已互指。**
- **`Tony Williams`** 亦是極常見人名（The Platters 主唱同名），日後進池要帶消歧。
- **Moffett 一家五口是五個實體**：`Charnett`（本卡）、父 `Charles Moffett`、兄 `Charles Moffett Jr.`、
  `Mondre Moffett`、`Codaryl Moffett`、妹 `Charisse Moffett`。

---

## 第 965 條（同批）：**1985-07 之後的第一份紙本——自己掃了 303 期，兩刊 1987–1989 全段**

派工信說「1988–89 你要自己抓」。實際掃的比這多一年：

| 檔案 | 期數 | 命中頁 | 缺期 |
|---|---|---|---|
| `enum/billboard-bn-1987-ocr.txt`（2.5 MB） | 51 | 272 | 1987-01-03 |
| `enum/billboard-bn-1988-1989-ocr.txt`（5.1 MB） | 102 | 559 | 1988-01-02／1988-12-31／1989-12-30 |
| `enum/cashbox-bn-1987-ocr.txt`（1.1 MB） | 50 | 133 | 1987-01-03／01-10 |
| `enum/cashbox-bn-1988-1989-ocr.txt`（2.1 MB） | 100 | 264 | 1988-01-02／01-09／**1988-06-04**／1989-01-07／01-14 |

已 **append** 進 `enum/SOURCES-billboard-cashbox.md`（沒有改別人的段落）。

- ⚠ **多掃 1987 是刻意的**：本組 23 張裡有 5 張是 1987 年盤，沒有 1987 紙本就沒有第三腳。
- ⚠ **收工時並行棒次的 `billboard/cashbox-bn-1985h2-1987-ocr.txt` 與 `*-bn-1990-ocr.txt` 已落地**
  ——**1985-07 → 1986-12 的洞補上了**，本組兩張年份改判因此升級為紙本確認（第 979 條）。
  ⚠ **1987 那一年兩邊重疊**（本層的 `*-bn-1987-ocr.txt` vs 那兩份 1985h2–1987）：
  **關鍵字集不同、命中頁也不同**——合併時先比對命中頁清單再決定留哪一份，**不要直接刪**。
- ⚠ **第 821／852 條續測成立**：1987-01 → 1989-12 兩刊各 156 個週六，
  **Billboard 全部 `BB-`、Cash Box 全部 `CB-`**，四種備援檔名一次都沒有用上。
  **缺期九則有八則落在年終雙數合刊那一週**，唯一例外是 Cash Box 1988-06-04——**缺得規律，不是檔名問題。**
- 掃法沿用 `batch-progress/c143a/scrape.py` 的形狀（`pymupdf` 直接讀文字層），
  四路 × 兩刊並行，303 期約 12 分鐘。**存的是命中頁不是全文**（第 879 條）。

---

## 第 966 條（同批）：**店面 22 張中 18 張命中、4 張查無；三個候選逐軌核不過**

**只寫觀察不寫結論（第 254 條）。**

- **Apple us `search` 一種查法命中 18 張**，其中 **14 張軌數＝原盤軌數**。
- **兩種查法都查無 4 張**：
  `Freddie Hubbard & Woody Shaw`《The Eternal Triangle》、
  `Dianne Reeves`《The Nearness of You》（日本限定盤）、
  `Don Grolnick`《Weaver of Dreams》、
  `Ralph Peterson Trio featuring Geri Allen`《Triangular》。
- ⚠ **三個候選逐軌核不過**（第 528／707／709／865 條的活樣本）：
  1. **《The Eternal Triangle》**：`search` 回的六筆全是別碟（《The Body & The Soul》1964 Impulse!、
     《Ready for Freddie》RVG、《Open Sesame》RVG、《Hub-Tones》RVG、《Red Clay》CTI、《Backlash》Atlantic），
     **其中四筆池中已有**；換查詞回的兩筆是 Timeless《Time Speaks》與 Savoy《Solid》。**一筆都不得採用。**
  2. **《Triangular》**：回的是 **`Triangular 2`（2000，Silva Screen 再發）與 `Triangular III (Live)`（2016，自主發行）**
     ——**兩張都是後續作品**。上架比對必須連 catno 92750 與年份 1989 一起帶。
  3. **《Pieces of Blue and the Blues》**：同頁另回五筆別碟，**其中三筆池中已有**
     （Midnight Blue RVG、The Cats、Kenny Burrell & John Coltrane）。
- ⚠ **Apple 的日期欄在這一段特別不可靠，四種壞法都撞到了**：
  | 碟 | Apple releaseDate | 實際 |
  |---|---|---|
  | Other Aspects | **1962-01-01** | 既非錄音年（1960／1964）也非發行年（1987）；℗ 欄才是 1987 |
  | Revelations | **1988-08-01** | 既非錄音月（1988-10）也非發行月（1989-03）；℗ 標 2015 |
  | Beauty Within | **1987-01-01** | 早了兩年；℗ 欄才是 1989 |
  | New Beginnings | **1988-12-12** | **接近錄音日 1988-12-16 但不等於它**（第 484 條的變體）；℗ 標 1988 |
  | Michel Plays Petrucciani | **1989-01-01** | 晚一年；℗ 標 1998（是 XE 再壓的版權年） |
  | The Paris Concert, Edition Two | **1983-01-01** | 那是 **Edition One** 的年份，Apple 把兩張寫混了 |
- **CAA**：RG 層有圖 17 張、**404（零圖）5 張**——
  `James Newton`《Romance and Revolution》、`Bennie Wallace`《Bordertown》、
  `Bobby Watson & Horizon`《No Question About It》、`Dianne Reeves`《The Nearness of You》、
  `Don Grolnick`《Weaver of Dreams》。**五張的封面都要走 Discogs 原壓條目。**
- ⚠ **CAA 有圖但來源不是原盤的 3 張**（研究層要看版式）：
  Inferno（來源是 US CD，不是 GB 原盤）、Angel Street（來源是 2016 數位）、
  The Paris Concert, Edition Two（來源是 2001 Blue Note CD，不是 1984 Elektra 原盤）。

---

## 第 967 條（同批）：**撞陳列 3 張——三張都是「同名軌不同錄音」，逐軌比對過 CD 那一層**

**第 738／859 條要求看到 CD／串流那一層，本組三張都比對到了。**

| 本組的碟 | 撞到的池中卡 | 判定 |
|---|---|---|
| Freddie Hubbard & Woody Shaw《The Eternal Triangle》第 3 軌〈The Moontrane〉 | `Woody Shaw`《The Moontrane》（1975，seed） | **不是同一個錄音**：池中那張是 1974-12 Muse 原版，本張是 1987-06 Van Gelder 新演奏。**收，兩卡 risk 互指；正文不得把本張的版本寫成 1974 年那個。** |
| Charlie Parker《Charlie Parker at Storyville》第 5 軌〈Now's the Time〉 | `Charlie Parker`《Now's the Time》（1957，seed） | **不是同一個錄音**：本張是 1953 年 Storyville 現場，池中那張是 1952–53 Verve 錄音室。**收，兩卡 risk 互指。** |
| Dianne Reeves《The Nearness of You》的五軌 | **尚未進池**的《I Remember》（1991） | **方向相反**：是 1991 年那張從本盤取用了五軌，不是本盤集結舊料。**收。若《I Remember》日後進池，兩卡必須以軌目互指，本卡是先出的那一張。** |

**逐軌比對後確認零重疊的**：Other Aspects（vs 池中 10 張 Dolphy，五軌全新）、
Michel Plays Petrucciani（vs 池中 2 張，九軌全新；〈Sahara〉與池中 `McCoy Tyner`《Sahara》同名不同曲）、
La Place（vs 池中 20 張 Turrentine，七軌全新）、Pieces of Blue and the Blues（vs 池中 13 張 Burrell）。

⚠ **`The Paris Concert, Edition One／Two` 是 Volume 拆盤**（bluenote 簡報 §2.6）：**各算一張，risk 互指**，
同一場 1979-11-26 的不同曲目，不是撞陳列。

---

## 第 968 條（同批）：**紙本假陽性 5 處——1985 後的目錄號進了五位數，撞郵遞區號與別廠號的機率大增**

**第 550 條在這一段的新形狀：Blue Note 1988 年起改用 `B1-9xxxx`／五位數 catno，
而五位數字串在 Billboard／Cash Box 裡同時是郵遞區號、別廠目錄號與錄影帶編號。**

| 誤中 | 出處 | 實際是什麼 |
|---|---|---|
| `48017`（The Eternal Triangle） | Billboard 1989-08-12 p63 | **密西根州 Clawson 的郵遞區號**（影片後製公司廣告地址） |
| `90262`（No Question About It） | Billboard 1988-09-24 p176 | **加州 Lynwood 的郵遞區號**（新成立舞曲廠牌的地址） |
| `92750`（Triangular） | Cash Box 1988-07-16 p100 | **加州 Santa Ana 的郵遞區號**（投幣式遊樂機材商名錄） |
| `91650`（Beauty Within） | Billboard 1989-07-08 p75 | **Fries Home Video《Denver the Last Dinosaur》錄影帶目錄號**（同頁還有 91660／91670／91680，ORDER DATE: AUGUST 1／STREET DATE: AUGUST 23）——**這一則最危險：它長得完全像一則廠牌發行排程** |
| `90905`（Times Are Changing） | Billboard 1988 年十餘則 | **M.C. Lyte《Lyte As A Rock》（First Priority 90905／Atlantic）的黑人專輯榜位** |

**給後批的操作結論：1985 後查紙本，catno 一定要連廠牌名（`Blue Note`）一起當條件，
單獨用五位數字串查，假陽性比真命中還多。**

另有一類是**片語誤中**（盤名太普通）：`Revelations`（福音榜的 `Rudolph Stanfield & New Revelations`、
MCA 新年願望專欄、Roulette 官司報導）、`Storyville`（Candid 廠的 Lee Konitz／Sidney Bechet
《Jazz at Storyville》新片欄、紐奧良的 Storyville Jazz Hall 場地報導）、`Paris Concert`、
`New Beginnings`、`Foreign Affairs`、`No Question About It`、`Other Aspects`。
**這幾張的年份全部改用 catno＋廠牌雙條件重查過。**

---

## 第 969 條（同批）：**「錄音年在 1985 前」的三種形狀——派工信說的兩種之外還有第三種**

派工信：「錄音年在 1985 前的，先假設它是再發——要嘛是前面十三批已收的碟，要嘛是庫存盤。」
**本組 6 張錄音年在 1985 前，實際分成三類：**

| 形狀 | 本組實例 | 處理 |
|---|---|---|
| **（一）庫存盤／首度公開** | `Eric Dolphy`《Other Aspects》（錄 1960／1964，1987 首發）、`Charlie Parker`《Charlie Parker at Storyville》（錄 1953，1985 首發） | **收**。照 c-145 寫法：`year` 取首次商業發行年，`risk` 寫錄音年與原定目錄號 |
| **（二）重編／再發** | `The Horace Silver Trio`《Complete Blue Note Sessions with Art Blakey》（16/16 舊軌） | **退**（第 961 條） |
| **（三）原盤他廠——派工信沒列到的第三種** | `Bill Evans`《The Paris Concert, Edition Two》（錄 1979，Elektra／Musician 1984 首發，Blue Note 2001 才授權再發） | **收**，但 `year` 取他廠首發年、`label` 寫原廠（`CURATION-BRIEF-bluenote.md` §1.3）。**判為可逆** |

**另外兩張錄音年晚於 1985 但發行年更晚的，不屬於這三類，不要誤套**：
`Kenny Burrell`《Pieces of Blue and the Blues》（錄 1986-10，1988 發行）、
`Don Grolnick`《Weaver of Dreams》（錄 1989-02，1990 發行）。

⚠ **給 c-150 之後**：本段（1987–89）的主體確實是 **Lundvall 時代的新簽約與新錄音**
（本組 22 張裡 19 張是 1986–89 的新錄音），**再發混進來的比例遠低於派工信的預警**。
**但混進來的那幾張都不是靠盤名看得出來的**——三張全部是靠「錄音年 ＋ 逐軌比對」抓到的。

---

## 第 970 條（同批）：**兩張的 `secondary-types` 方向相反——第 397 條的對照組**

| 碟 | MB `secondary-types` | 實際 | 處理 |
|---|---|---|---|
| `McCoy Tyner`《Revelations》 | **空** | **是現場**（1988-10 Merkin Hall 獨奏，Apple 盤名帶 `(Live)`，維基明記） | 列舉檔 `live` 欄也是 false。**卡片標明是現場，`releaseType` 仍照 MB 原值 `Album`** |
| `Charlie Parker`《Charlie Parker at Storyville》 | **`["Live"]`** ✓ | 是現場 | 照 MB |
| `Kenny Burrell`《Pieces of Blue and the Blues》 | **`["Live"]`** ✓ | 是現場 | 照 MB |
| `Bill Evans`《The Paris Concert, Edition Two》 | **`["Live"]`** ✓ | 是現場 | 照 MB |

**本組現場盤 4 張，MB 漏標 1 張（25%）——第 397 條「兩個方向都會漏」在這一段仍然成立，
但這次是「該標沒標」那個方向。**

---

## 第 971 條（同批）：**`releaseType` 全部照 MB 原值 `Album`，0 張走 §5.6**

22 張的 MB `primary-type` 全是 `Album`、`secondary-types` 無 `Compilation`。
**盤名帶 Best of／Greatest／Collection／Anthology／The Very Best 的：0 張。**
**唯一長得像合輯的是盤名帶 `Complete …Sessions` 的那張——已退**（第 961 條）。
`exceptionReason` 與 `exceptionEvidenceUrls` 22 張全空，chk-prop 的「非合輯卻帶例外欄位」檢查通過。

⚠ **但第 613／782 條的提醒在本組仍然中了一次**：**盤名裡沒有任何合輯訊號的
《Complete Blue Note Sessions with Art Blakey》，`primary-type` 是 `Album`、`secondary-types` 是空**
——**MB 完全沒有把它標成合輯。判準只能是逐軌文案與軌目來源，不能讀 MB 的型別欄。**

---

## 第 972 條（同批）：**軌數兩形 5 張——黑膠與 CD 不同內容，寫作層的硬約束**

| 碟 | 黑膠／卡帶 | CD／數位 | 差在哪 |
|---|---|---|---|
| `McCoy Tyner`《Revelations》 | LP 10 軌 | **CD 13 軌** | 多 Autumn Leaves／Peresina／When I Fall in Love（維基明記為 CD bonus）。**MB 只建 CD 那形** |
| `Freddie Hubbard & Woody Shaw`《The Eternal Triangle》 | LP／卡帶 6 軌 | **CD 8 軌** | 多 Sao Paulo／Reets and I。2014 數位版回到 6 軌 |
| `Don Pullen`《New Beginnings》 | **2025 黑膠 6 軌** | CD 7 軌 | **少〈Silence = Death〉**（10′20″，黑膠放不下） |
| `Bill Evans`《The Paris Concert, Edition Two》 | 原盤／1989 CD 6 軌 | **2001 Blue Note CD 7 軌** | 多一軌 `Interview`——**不是演出內容** |
| `Bennie Wallace`《Bordertown》 | 原盤 8 軌 | **Apple 條目 9 軌** | 疑為 CD 形，**研究層要逐軌核** |

**寫作層的硬約束：上表任一張的正文，都不得把多出來（或少掉）的軌目寫成原盤內容。**

---

## 第 973 條（同批）：**同批內部的側人交叉 6 組——正文不得互抄班底**

本組 22 張裡，**同一個人以不同身分出現在多張**的有六組。**每一組的兩卡 `risk` 都已互指。**

| 人 | 領班的那張 | 當側人的那張 | 是否同場 |
|---|---|---|---|
| `Bennie Wallace` | 《Bordertown》（1987-06，領班） | 《Ever Since the World Ended》（1987-05／06，Mose Allison 的次中音之一） | **不同場** |
| `Kenny Burrell` | 《Pieces of Blue and the Blues》（1986-10，領班） | 《Ever Since the World Ended》（吉他） | **不同場** |
| `Charnett Moffett` | 《Beauty Within》（1989，領班） | 《Angel Street》（1988-04，Tony Williams 的貝斯） | **不同場** |
| `Tony Williams` | 《Angel Street》（1988-04，領班） | 《New Beginnings》（1988-12-16，Don Pullen 三重奏的鼓） | **不同場** |
| `Freddie Hubbard` | 《Times Are Changing》（1989，領班） | 《The Eternal Triangle》（1987-06，與 Woody Shaw 聯名） | **不同場、不同掛名字串** |
| `Kenny Garrett` | （本組無領班盤） | 《The Eternal Triangle》（1987-06）與《Beauty Within》（1989） | **不同場** |

**兩組「同一位藝人、兩張碟、兩個掛名字串」尤其要盯**：
`Don Pullen`（《Song Everlasting》用群組字串 `The Don Pullen-George Adams Quartet`／
《New Beginnings》用個人字串 `Don Pullen`）、
`Freddie Hubbard`（《The Eternal Triangle》用聯名字串／《Times Are Changing》用個人字串）。
**兩組都不得互相收攏**（第 307 條）。

`Biréli Lagrène` 的兩張（《Inferno》1987-07／《Foreign Affairs》1988-08）班底幾乎全換，**只有 Cafe 留下**。

---

## 第 974 條（同批）：**四個「MB 沒建首發那一版」的案例——第 642 條在 1985 後的新形狀**

**1985 後 MB 的建檔品質整體較好，但它偏向建 CD 與數位、漏建當年的黑膠。本組四例：**

| 碟 | MB 建了什麼 | MB 沒建的首發版 | 號碼從哪來 |
|---|---|---|---|
| `Charlie Parker`《…at Storyville》 | 3 個 release，**全是 CD／數位** | **1985 LP／卡帶 BT 85108** | Discogs master 156635、RateYourMusic |
| `Eric Dolphy`《Other Aspects》 | CD CDP 7 48041 2 ＋ 數位 | **1987 LP BT 85131** | **Billboard 1987-03-28 評介欄** |
| `James Newton`《Romance and Revolution》 | 1 個 CD，catno 欄登 **`DIDX 989`** | **1987 LP BT 85134** | **Billboard 1987-03-07 評介欄＋1987-04 起的榜位** |
| `Bill Evans`《The Paris Concert, Edition Two》 | 最早是 1989 歐洲 CD | **1984 Elektra／Musician 60311 黑膠** | 維基＋Discogs 五筆原壓 |
| `Don Grolnick`《Weaver of Dreams》 | 1 個 release，**format `null`、無 catno、無 barcode** | **1990 Blue Note B2-94591（CD）／B4-94591（卡帶）** | **Billboard 1990-08-11 新片欄**＋jazzdisco＋Blue Note 官網 |

⚠ **`DIDX 989` 這一則要單獨記**：`DIDX` 是 **Disc Manufacturing Inc. 的壓片序號**，
**不是發行目錄號**。MB 把它填進了 `catalog-number` 欄。
**給後批：1980 年代末的美國 CD，MB 的 catno 欄若形如 `DIDX nnn`，那不是目錄號，要另查。**

**五例都已依第 642 條換過 `inc=media+labels+recordings+artist-credits` 端點組合確認**，
不是端點取不到，是 MB 真的沒建。

---

## 第 975 條（同批）：**首發地三張要自己核（第 817 條）——兩張 MB 會誤導**

| 碟 | MB 給的 | 實際首發地 | 怎麼核的 |
|---|---|---|---|
| `Tony Williams`《Angel Street》 | frd **1988-12-04**，那是 **JP 盤 CJ32-5028** 的日期；US release 只有年份 | **US** | **Billboard 1988-10-15 評介＋10-22 新片欄**，都早於 JP 盤兩個月。**只看 frd 會誤判成日本首發** |
| `Dianne Reeves`《The Nearness of You》 | frd 1988-07-06，JP CJ32-5020，`countries` 只有 JP | **JP，而且只有 JP** | 列舉檔 note 已標「僅 JP 盤」；Discogs 只有日本條目。**本張沒有美國版，不要去找 B1-／CDP 7 號** |
| `Charnett Moffett`《Beauty Within》 | 唯一 release 國別標 **CA（加拿大）** | **US**（疑 MB 取了加拿大壓片） | **Billboard 1989-11-11 新片欄是美國廠牌 release sheet**，barcode 也是美國形。**第 817 條的反向形** |

`Biréli Lagrène`《Inferno》則是**首發 GB、美國評介與榜位晚一季**（1987 GB → 1988-01 US 評介）——
**取 1987**，跨地時差寫進 risk。

---

## 第 976 條（同批）：**兩個「廠牌 release sheet 記的是排程、不是上市日」的案例**

階序把「廠牌新聞稿／同期紙本」放在最上面，**但 Billboard 新片欄的稿源是廠牌自己寄的 release sheet
（同欄位說明寫明），它記的是排程，可能與實際上市差半年。**

1. **`Bennie Wallace`《Bordertown》**：**Billboard 1987-12-26 p54 新片欄已經登了**
   （「BENNIE WALLACE Border Town LP Blue Note B1-48014／NA CA B4-48014／NA」），
   **但實際上市是 1988 年年中**——Blue Note 1988-06-25 整版廣告把它列在當期新品、
   Billboard 評介 1988-07-09、兩刊榜位同樣 1988-07 起，MB frd 與 Apple ℗ 也都是 1988。**取 1988。**
2. 反例：**`Stanley Turrentine`《La Place》與 `Charnett Moffett`《Beauty Within》的新片欄
   與評介／榜位都在同一季內**（1989-07 新片欄 → 08 評介 → 09 榜位；1989-11 新片欄 → 12 評介），
   **這種才是正常的節奏。**

**給後批的判準：新片欄與評介／榜位相距一季以內，取新片欄；相距超過兩季，
以評介＋榜位＋廠牌廣告的那一年為準，新片欄那則寫進 risk。**

---

## 第 977 條（同批）：**一則排版錯字、一個內部號形——不要拿去查**

- **Billboard 1988-06-25 p69 的 Blue Note 整版廣告把 Michel Petrucciani 的號碼排成 `BF-48619`**，
  正確是 **`B1-48679`**（MB、Discogs、CD 號 CDP 7 48679 2 三邊一致）。**比對時不要拿 48619 去查。**
  （同一則廣告的其他三個號碼 B1-90260／B1-48014／B1-48185 都正確，**只錯這一個。**）
- **`B2-590261`（La Place）與 `CDP 590905`（Times Are Changing）是 Capitol 那幾年的
  `B2-5xxxxx`／`CDP 5xxxxx` 內部號形**，軌目與正式號完全相同——
  **第 611 條盲區之一（同一張碟建成多個 release），已逐軌核過，不是不同版本。**

---

## 第 978 條（同批）：**給 c-150 之後的八條操作結論**

1. **1985 後查紙本，catno 必須連廠牌名一起當條件**（第 968 條）——五位數字串的假陽性比真命中多。
2. **MB 偏向建 CD 與數位、漏建當年的黑膠**（第 974 條）——**`frd` 常常是 CD 的年份**。
   判準：**若這個 RG 底下最早那張 release 是 CD 或數位，`year` 一定要重查。**（與 c-146 第 873 條同形，但成因不同。）
3. **Apple 的 `releaseDate` 在這一段有六種壞法**（第 966 條），**℗ 欄比 releaseDate 可靠，但也不是總對**。
4. **`secondary-types` 仍會漏標現場**（第 970 條，本組 4 張漏 1）。
5. **合輯判準只能讀逐軌文案與軌目來源**（第 971 條）——本組唯一的合輯，MB 型別欄完全乾淨。
6. **`chk-prop` 標記 0 不等於沒撞卡**（第 611 條）——本組唯一的退卡，就是靠群組掛名 vs 個人掛名這個盲區溜過去的。
7. **紙本的沉默可以當正證據**（第 962 條之四）——但**只有在該刊該欄對這類唱片有穩定覆蓋時**才成立
   （Billboard 爵士新片欄在 1987–89 對 Blue Note 的覆蓋是完整的）。
8. **1985-07 → 1986-12 的洞已由 c-148 補上**（第 979 條）——**兩張年份改判在收工前因此升級**。
   **教訓：交件前再掃一次 `enum/`，別人的紙本可能剛落地。**

---

## 第 979 條（同批，**收工前補記**）：**兩張年份改判在交件前被別棒的紙本直接證實，一個 catno 被訂正**

**收工跑 `git status` 時發現 `enum/` 裡多了三份本棒開工時還不存在的 OCR**
（`billboard-bn-1985h2-1987-ocr.txt` 127 期／`cashbox-bn-1985h2-1987-ocr.txt` 124 期／
`billboard-bn-1990-ocr.txt` 50 期，皆為 c-148 或其他並行棒次所掃、尚未提交）。
**拿本組四張年份改判逐一回查，命中兩張：**

| 本棒原本的依據 | 別棒紙本給的 | 結果 |
|---|---|---|
| Charlie Parker《…at Storyville》1985：**只有 Discogs 原壓群＋RateYourMusic＋系列旁證，記為「同期紙本實查不存在」** | **Billboard 1985-12-07 評介欄（BT 85108，製作 Bob Porter，「two air shots from 1953 at Storyville in Boston」，點名 Red Garland／Roy Haynes／Kenny Clarke）＋1986-06-28 Blue Note 全目錄廣告** | **1985 確認**。`risk` 已改寫，「沒有第三腳」那句撤掉；**另補一條：評介點的鼓手有 Roy Haynes 與 Kenny Clarke 兩位，分屬兩場，正文不得混寫** |
| Don Grolnick《Weaver of Dreams》1990：**jazzdisco＋官網＋JJ 1991-01 評介＋紙本沉默**，catno 從 Discogs 猜成 `CDP 7 93178 2` | **Billboard 1990-08-11 爵士／新世紀新片欄「DON GROLNICK Weaver Of Dreams CD Blue Note B2-94591 CA B4-94591」** | **1990 確認、盤名無冠詞確認**；**catno 訂正為 `B2-94591`／`B4-94591`——本棒原先猜的 `CDP 7 93178 2` 是錯的** |

另外兩張（Paris Concert Edition Two 1984、Revelations 1989）在這三份 OCR 裡無新證據，維持原判。

⚠ **這條要當成流程教訓記下來**：**並行棒次的中間產物會在你跑到一半時落地。**
**交件前重跑一次 `ls batch-progress/enum/` 與 `git status`，把新出現的紙本拿回去覆核自己的年份改判**
——本棒因此把一張「推定」升級成「確認」、把一個錯的目錄號攔了下來。

---

## 第 980 條（同批）：**本棒改動的檔案清單**

- **新增**：`batch-progress/c149/prop-a.json`（22 張）、`batch-progress/c149/rulings.md`（本檔）。
- **新增**：`batch-progress/enum/billboard-bn-1987-ocr.txt`、`billboard-bn-1988-1989-ocr.txt`、
  `cashbox-bn-1987-ocr.txt`、`cashbox-bn-1988-1989-ocr.txt`（四份共 10.8 MB）。
- **append**：`batch-progress/enum/SOURCES-billboard-cashbox.md`（只在檔尾追加一節，沒有改別人的段落）。
- **沒有碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／git。
- ⚠ **開工時 `git fetch origin` 顯示本機 HEAD 與 `origin/main` 已分岔**
  （本機有「Blue Note 1985 後：切成 c148–c167」那筆，origin 有 Pages 部署修復那幾筆，
  `git pull --ff-only` 被拒）。**本棒依派工信不碰 git，分岔留給主線處理。**
  ⚠ origin 那幾筆裡有一筆是「把 1977–79 的兩份 OCR 改存 `.gz`，解開 Pages 的 25 MiB 部署死結」，
  **但更後面一筆已改用 build command、產線目錄不再進部署**。本棒的四份 OCR 依本機現況存成純 `.txt`
  （與本機的 `billboard-bn-1982-1984-ocr.txt` 5.1 MB 同形）。**合併時若主線決定一律 `.gz`，這四份要一起改。**
