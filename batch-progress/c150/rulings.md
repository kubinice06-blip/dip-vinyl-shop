# c-150 裁定（Blue Note 1985 後，第三批）

**編號區間 1020–1049。** a 組（23 張，1990–91）的裁定記在本檔；b 組另行 append。
**本檔是新檔**，前一批（1987–90）的判準見 `batch-progress/c149/rulings.md` 第 960–998 條，**本段直接接著那一批**。

---

## 第 1020 條（c-150 a 組交件）：**23 筆 → 收 20、退 3；年份改判 1 張；盤名改判 2 張；新掛名 9 個字串；紙本自己掃了 1991-01→1992-03 兩刊共 125 期**

- **交件 20 張、19 位**（`batch-progress/c150/prop-a.json`）；**退 3 張**（第 1021／1022 條）。
  **20 ＋ 3 = 23**，第 315 條的等式成立。`node batch-progress/c150/chk-prop.mjs a` **標記 0**
  （欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／114 批 4,625 張、同 rgMbid 不同掛名 0）。
- **退 3 張**：Dexter Gordon《Nights at the Keystone, Volume 1》與《Volume 2》（**第 874 條重編**，第 1021 條）、
  Dianne Reeves《I Remember》（**第 874 條重編**，第 1022 條）。**三張都不是靠盤名看出來的。**
- **年份改判 1 張**（第 1023 條）：Biréli Lagrène《Acoustic Moments》1991 → **1990**。
- **盤名改判 2 張**（第 1024 條）：`Man Talk For Moderns Vol. X` → **`Man-Talk For Moderns Vol. X`**；
  另有三張維持 MB 原形但把原盤全稱寫進 `queryAlias`。
- **掛名**（第 1025 條）：**新字串 9 個**（含 1 個 Orchestra、2 個 Group），收攏 1，新造分裂 0。
- **rgMbid 全部照列舉檔，無一釘錯。**
- **紙本**（第 1026 條）：**1991 這一年開工時還沒有人掃**，本棒自己抓了
  **Billboard 1991-01-05 → 1992-03-28（64 期、505 個命中頁）** 與
  **Cash Box 1991-01-19 → 1992-03-28（61 期、137 個命中頁）**，已存進 `batch-progress/enum/`
  並 append 進 `SOURCES-billboard-cashbox.md`。
- **撞陳列 3 張**（第 1027 條）、**店面查無 5 張**（第 1028 條）、**Somethin' Else 授權線 5 張**（第 1029 條）。

---

## 第 1021 條（同批）：**退 2 張——Keystone Vol. 1／2 是 1985 年雙片黑膠的擴充再發，Vol. 3 才是新的**

| 退掉的 | rgMbid | 理由分類 | 比例 |
|---|---|---|---|
| `Dexter Gordon` —《Nights at the Keystone, Volume 1》（列舉檔 1990，Blue Note CDP 7 94848 2） | `c1986781-f7a6-3a4f-9325-3785e59f35e7` | **第 874 條：舊料重編（先前已成盤發行的軌數過半）** | **4 / 5** |
| `Dexter Gordon` —《Nights at the Keystone, Volume 2》（列舉檔 1990，Blue Note CDP 7 94849 2） | `ad75503d-291a-321f-a36e-828741a418e1` | 同上 | **3 / 5** |

**母體是 `Blue Note BABB-85112《Nights at the Keystone》（1985，US 雙片黑膠，7 軌，℗© 1985 Manhattan Records）**
（Discogs 2724160）。它的七軌是：Sophisticated Lady／It's You or No One／Antabus／Easy Living／
Tangerine／More Than You Know／Come Rain or Come Shine。

- **Vol. 1（5 軌）**：It's You or No One／Sophisticated Lady／Antabus／Easy Living **四軌全出自 BABB-85112**，
  只有〈Backstairs/LTD〉是新的。**Discogs 7182797 的 notes 自己寫明「#1 to 4 previously issued on
  [r=2724160] - Blue Note LP BABB-85112」。**
- **Vol. 2（5 軌）**：Tangerine／More Than You Know／Come Rain or Come Shine **三軌出自 BABB-85112**，
  只有〈The Panther〉與〈Ginger Bread Boy〉是新的。**Discogs 30664726 的 notes：「Tracks 2, 3, 5
  previously issued on Blue Note LP BABB-85112」。**
- **Vol. 3（4 軌）**：**Discogs 7366492 的 notes 寫「All selections previously unissued」——0/4，收**
  （見 `prop-a.json`）。

### ⚠ 這一件有**同期紙本的直接判定**，是本段第一次

**Billboard 1991-01-05 p100 的評介欄替 Vol. 3 寫的第一句就是：**
> 「DEXTER GORDON Nights At The Keystone Vol. 3 PRODUCER: Todd Barkan Blue Note 94850
> **Companion to live shot from 1978-79 (reissued in expanded form on Vols. 1-2)** finds the late
> tenorist in remarkable form on stage at the noted Bay area club.」

**「reissued in expanded form on Vols. 1-2」——同期紙本自己就把 Vol. 1–2 定義成再發。**
c-149 第 978 條結論 5 說「合輯判準只能讀逐軌文案與軌目來源」，**本件是那條在 1990 年代初的最強樣本：
逐軌來源（Discogs notes）與同期紙本（Billboard 評介）互相印證，兩邊都指向同一個答案。**

### ⚠ 三件事要交給主線

1. **`BABB-85112` 不在列舉檔裡，也不在 MB 上。** 以 `release?query=catno:BABB-85112` 回問 MB，**count = 0**。
   **這代表「Blue Note 1985 年的雙片黑膠《Nights at the Keystone》」這張碟在整條 Blue Note 線上是個洞**
   ——c-146～c-148 掃 1985 年那一段時不可能撿到它（MB 沒建），本棒又把它的兩張 CD 化身退掉。
   **若主線希望池中有這批 Keystone Korner 現場，應該直接以 BABB-85112 建卡，而不是撿回 Vol. 1／2。**
2. **Apple 把三張 Keystone 一律標成 `This Compilation ℗ 1990 Capitol Records, LLC`、releaseDate 一律標 1979-01-01**
   ——**Apple 的型別欄在這裡對 Vol. 1／2 剛好是對的、對 Vol. 3 是錯的**。**不可拿 Apple 的 Compilation 標記當判準**（第 782 條）。
3. **MB 完全沒有把 Vol. 1／2 標成合輯**：兩者的 `primary-type` 都是 `Album`、`secondary-types` 都是 `["Live"]`，
   **沒有 `Compilation`**——**第 613／782 條「MB 的 secondary-types 兩個方向都會漏」在本段再中一次**。
4. **`chk-prop` 標記 0**：三張 Volume 碟的掛名與盤名各不相同，**折鍵全不一樣，去重機制一個都抓不到**
   （第 611 條盲區之二「同名但不同盤的 Volume 碟」的反面形）。**退卡的依據是逐軌比對，不是 chk-prop。**

---

## 第 1022 條（同批）：**退 1 張——Dianne Reeves《I Remember》的九軌裡有五軌出自 1988 年的日本限定盤**

| 退掉的 | rgMbid | 理由分類 | 比例 |
|---|---|---|---|
| `Dianne Reeves` —《I Remember》（列舉檔 1991，Blue Note 0777 7 90264 2 5／CDP 7 90264 2） | `a66ab5f8-14c1-3c3e-b5a3-8748b6d09cdc` | **第 874 條：舊料重編（先前已成盤發行的軌數過半）** | **5 / 9** |

**母體是池中 c-149 a 已收、待上架的《The Nearness of You》（1988，Blue Note CJ32-5020，JP 限定，9 軌）。**

**Discogs 12921915 的 notes 逐軌標明錄音日期，切得乾乾淨淨：**

| I Remember 軌 | 錄音日 | 地點 | 是否已在《The Nearness of You》 |
|---|---|---|---|
| 1 Afro Blue | **1990-09-10** | Madhatter Studios, LA | 新 |
| 2 The Nearness of You / Misty | **1990-09-11** | Madhatter | **新錄的另一個版本**（原盤那個 3:20，本張 3:12） |
| 3 I Remember Sky | **1990-09-11** | Madhatter | 新 |
| 4 Love for Sale | **1990-09-11** | Madhatter | 新 |
| 5 Softly As In The Morning Sunrise | **1988-04-27** | Van Gelder Studio | **是** |
| 6 Like A Lover | **1988-04-27** | Van Gelder | **是** |
| 7 How High The Moon | **1988-05-09** | Van Gelder | **是** |
| 8 You Taught My Heart To Sing | **1988-04-28** | Van Gelder | **是** |
| 9 For All We Know | **1988-04-28** | Van Gelder | **是** |

**五軌的長度與 1988 年日本盤逐軌相差 0.3–4 秒（日本盤一律略長，是索引差不是不同錄音）**；
MB 的 recording id 有兩軌直接相同（`587158d9` Like a Lover、`193fd6fb` You Taught My Heart to Sing）。
**5 / 9 = 55.6%，過第 874 條的門檻。**

### ⚠ 這一件是本段第一個**「門檻邊緣」**的樣本，反向證據必須留著

- **Billboard 把它當新盤處理**：Top Jazz Albums **1991-04-27 p39 以 NEW 進榜**、
  **1991-05-04 p70 評介欄**（「Vocalist Reeves may deliver her most stylish recital yet here」），
  **全文沒有一個字提到 1988 年那張**。
- **理由是《The Nearness of You》只在日本發行**（c-149 a 第 975 條已釘：「本張沒有美國版」），
  **對 1991 年的美國樂迷而言那五軌確實是新的**。
- **但第 874 條的判準（c-149 第 993 條）是「這張碟裡的內容，聽眾在這一次之前買得到嗎」，不是「在哪個國家買得到」**
  ——1988 年的 CJ32-5020 是正式商業發行，**進口買得到**。
- **決定性的結構理由**：**池中已經有一張帶著那五軌的卡**（c-149 a 的《The Nearness of You》，待上架）。
  **同時收兩張＝池中兩張卡有 55% 的軌目是同一批錄音**，這正是第 874 條要防的事。

### ⚠ 這同時修正了 c-149 第 967 條的一句預期

c-149 第 967 條寫「**若《I Remember》日後進池，兩卡必須以軌目互指，本卡是先出的那一張**」
——**那是在還沒算比例時寫的預期，不是裁定。** 本條把比例算出來之後判為退。
**c-149 a《The Nearness of You》卡上的那句話不必改**（它說的是「若進池」），**但研究層不要據此去找 I Remember 的卡。**

**本判定為可逆（第 1049 條）**：撤銷只需把這一筆從退表移回清單，**不動卡池結構**。
若主線採「日本限定＝美國市場的新商品」這個讀法，**應該一併訂一條通則**，因為這一段（Blue Note 1985 後）
的日本限定盤很多，**不能只對這一張破例**。

---

## 第 1023 條（同批）：**年份改判 1 張——Biréli Lagrène《Acoustic Moments》1991 → 1990（歐洲原壓在前，美版晚一季）**

| 依據層 | 內容 | 指向 |
|---|---|---|
| MB frd | **1991**，但**這個 RG 只有一個 release，就是美版 CDP 7 95263 2** | 1991（美版） |
| **Discogs 歐洲原壓群（第 531 條）** | **黑膠 Blue Note／Blue Note International `7952631`（Discogs 3913094，Made in EEC，封套背面與唱片標籤都印 ℗ © 1990 EMI France）** ＋ **CD `7952632`（Discogs 15097340，Made in UK）**，**兩筆皆 1990** | **1990** |
| 錄音 | **1990 年 7 月，Studio Davout, Paris，全數位**（Discogs notes） | 1990 下半可發 |
| 美國紙本 | Billboard **1991-03-02 p80 評介**、Top Contemporary Jazz Albums **1991-03-30 p43 NEW 第 15 名** | 1991（**只證明美版**） |
| 其他地區 | 法國卡帶 B4-95263（1991）、日本 TOCJ-5281（1991） | 1991 |

**判準**：**第 978 條結論 2「若這個 RG 底下最早那張 release 是 CD 或數位，`year` 一定要重查」＋
c-149 第 994 條「`release-count` 是 1 的一律去 Discogs 補全世界視野」**——本張兩條都中。
**先例**：**c-149 第 975 條為同一位藝人立的《Inferno》「首發 GB、美國評介與榜位晚一季 → 取 1987」**。
**同形，取 1990。**

⚠ **弱點要寫明**：1990 只有 **Discogs 兩筆歐洲條目的 `released` 欄與盤面 ℗©** 支持，
而**第 550／570 條明說 Discogs 的年份欄會整群抄盤面 ℗© 年**。**判為可逆（第 1049 條）。**

### 覆核成立、不改的 19 張（列出來省得下一批重查）

Time on My Hands 1990（BB 1990-04-28 新片欄 B2-92894＋04-21 評介＋**Top Jazz No.1 三週**）、
Renee Rosnes 1990（BB 1990-02-03 新片欄 B1-93561＋兩刊評介）、Lineage 1990（BB 1990-06-23 新片欄 B2-93670）、
My Backyard 1990（兩刊 1990-05-26／06-02 評介）、America 1990（**兩刊零命中，Discogs 日美原壓群**）、
Random Thoughts 1990（BB 1990-08-11 新片欄 B2-94347＋09-29 評介）、
Nights at the Keystone Vol.3 1990（BB 1991-01-05 評介）、For the Moment 1990（**兩刊零命中，Discogs 原壓群**）、
Dream Keeper 1990（**日本 DIW 原盤**，見第 1030 條）、At Montreux 1990（**日本 Somethin' Else 原盤**，見第 1029 條）、
It's Supposed to Be Fun 1990（BB 1990-08 廣告「due out in September」＋10-20 八頁特輯＋11-10 Contemporary Jazz NEW）、
Eliane Elias Plays Jobim 1990（**Apple jp 標 1990-04-18**＋BB 1990-06-30 評介＋07-21 進榜）、
Stolen Moments 1991（BB 1991-11-30 新片欄 C2-97159＋同期評介＋12-21 進榜）、
Straight to My Heart 1991（BB 1991-10-26 廣告＋12-07 進榜）、In the Door 1991（**兩刊零命中，Discogs＋Apple ℗**）、
The Nurturer 1991（BB 1991-03-02 評介）、Man-Talk for Moderns Vol. X 1991（BB 1991-06-22 廣告印 B4-95414）、
Presents The Fo'tet 1991（BB 1991-03-02 評介＋12-21 年度回顧）、Meant to Be 1991（BB 1991-03-23 評介＋04-13 進榜）。

---

## 第 1024 條（同批）：**盤名改判 1 張，維持 MB 原形但記下全稱 3 張**

| RG title | 卡單值 | 依據 |
|---|---|---|
| `Man Talk For Moderns Vol. X` | **`Man-Talk For Moderns Vol. X`** | **Discogs 美歐兩地原壓（3606252／15092034／master 616606）、Apple（`Man - Talk For Moderns Vol. X`）與 Billboard 1991-06-22 廠牌廣告（印「MAN-TAL[K]」）三邊都有連字號**；**MB 自己的第 3 軌軌名也寫 `Man-Talk`**。依第 535 條「取原盤題名而非 RG title」改判，MB 形與 Apple 空格形進 `queryAlias`，**rgMbid 不動（第 483 條）**。連字號是 ASCII `-`，不觸第 50 條 |
| `Straight to My Heart: The Music of Sting` | **照 MB** | Discogs 原壓全稱是 `Straight To My Heart: The Bob Belden Ensemble Performs The Music Of Sting`、Billboard 榜單只印 `STRAIGHT TO MY HEART`——**三形擇中，照 RG title**，另兩形進 queryAlias |
| `Presents The Fo'tet` | **照 MB** | 原盤封面全稱 `Ralph Peterson Presents The Fo'tet`（藝人欄仍是 `Ralph Peterson`）；**Billboard 自己兩種都用過**（1991-03-02 評介印全稱、1991-12-21 年度回顧印「Ralph Peterson,『Presents The Fo'tet』」）——**照 RG title**，全稱進 queryAlias |
| `At Montreux` | **照 MB** | **日本原盤 TOCJ-5527 的題名就是 `At Montreux`**（＝原盤題名，第 535 條同向）；**美版改題《Discovery: Live at Montreux》**（Billboard 榜單 1991-05-25 印「LIVE AT MONTREUX」、06-08 起印「DISCOVERY: LIVE AT MONTREUX」，Apple 作「Discovery (Live At Montreux)」）——三種美版形進 queryAlias |

⚠ **`Eliane Elias Plays Jobim` 的盤名本身帶藝人名**（封面即如此，1998 年續作《Eliane Elias Sings Jobim》同形），
**卡片會顯示成「Eliane Elias — Eliane Elias Plays Jobim」，這是原盤題名，不改**。

---

## 第 1025 條（同批）：**掛名 9 個新字串、1 個收攏、0 新造分裂——三個「同一人兩個字串並存」的案例**

**新字串 9 個**（池中零列）：
`Renee Rosnes`（bff6007a Person）、`Benny Green`（28b5fcc9 Person）、`George Adams`（b1e7da08 Person）、
`Gonzalo Rubalcaba`（70053535 Person）、`Charlie Haden and The Liberation Music Orchestra`（底層單一實體
`Charlie Haden's Liberation Music Orchestra` 5214982b，**type `Orchestra`**）、
`The Bob Belden Ensemble`（94d65205 **Group**）、`Joey Calderazzo`（2be2cd01 Person）、
`Geri Allen`（4d688d75 Person）、`Ralph Peterson`（33283e4c Person）、`Greg Osby`（bbef05c0 Person）、
`John Scofield Quartet`（0ec5a8aa **Group**）——**合計 11 個字串是池中零列的**，其中
`Geri Allen` 與 `Ralph Peterson` 的底層實體在池中已以**聯名／群組**形式出現過（見下），故本條計為
**「全新的人／團」9 個 ＋「個人字串首次獨立進池」2 個**。

**收攏 1**：`Gonzalo Rubalcaba Trio`（日本原盤 release credit）→ **`Gonzalo Rubalcaba`**（MB RG credit，第 543／553 條）。

**照池中先例沿用的 8**：`John Scofield`（池中 1，seed《Blue Matter》）、`Mose Allison`（池中 1，c-149 a）、
`Don Pullen`（池中 2 個個人字串卡）、`Dexter Gordon`（池中 19）、`Lou Rawls`（池中 4）、
`Eliane Elias`（池中 2，c-148／c-149）、`Stanley Jordan`（池中 3，c-148／c-149）、`Biréli Lagrène`（池中 2，c-149 a，**兩處重音必須保留**）。

### ⚠ 三個「同一位藝人、兩個字串並存」——**全部不得互相收攏**（第 307 條）

| 人 | 池中／本組的個人字串 | 本組／池中的另一個字串 | 依據 |
|---|---|---|---|
| **John Scofield** | `John Scofield`（seed《Blue Matter》1986 ＋ 本組《Time on My Hands》1990） | **`John Scofield Quartet`**（本組《Meant to Be》1991） | MB RG credit 是 Group `0ec5a8aa`；**Discogs 六個版本的藝人欄全是 `The John Scofield Quartet*`**；**池中已有同形先例**——seed 的 `Dexter Gordon Quartet` 與 18 張 `Dexter Gordon` 並存、seed 的 `Don Pullen Quintet`／`Don Pullen Featuring Sam Rivers`／`Don Pullen` 三字串並存 |
| **Geri Allen** | **`Geri Allen`**（本組《The Nurturer》1991，**個人字串首次進池**） | `Ralph Peterson Trio featuring Geri Allen`（c-149 a《Triangular》1989） | c-149 第 964 條已明文「**不收攏成 `Ralph Peterson`**」，本條是它的反向適用 |
| **Ralph Peterson** | **`Ralph Peterson`**（MB **33283e4c** Person，本組《Presents The Fo'tet》1991） | `Ralph Peterson Trio`（MB **c50c8d6e**，type `null`，c-149 a《Triangular》） | **兩個不同的 MB 實體**；c-149 第 964 條已裁定不收攏 |

⚠ **`John Scofield Quartet` 的反向證據要留著**：**Billboard 1991-03-23 的評介欄與 Apple 的 artistName 都只印「JOHN SCOFIELD」**。
**若主線決定一律收攏到 `John Scofield`，只動 manifest 的 `artist` 欄，可逆（第 1049 條）。**

### ⚠ 兩個「MB credit name 與底層實體不同名」（第 997 條同形）

1. **`Charlie Haden and The Liberation Music Orchestra`**：credit name 是這一串，
   **底層只有一個實體 `Charlie Haden's Liberation Music Orchestra`（5214982b，type `Orchestra`）**。
   **池中 seed 的《Liberation Music Orchestra》（1970）掛的是 `Charlie Haden`**
   ——**兩個字串並存，且不得把 1970 那張改掛本字串。**
2. **`The Bob Belden Ensemble`**：Discogs 藝人欄、Billboard 榜單、Apple artistName 四處一致，照 credit 寫；
   **但日後若 Bob Belden 的個人領班盤進池，要與本字串明確區分，不得事後合併。**

### 需要消歧的同名反查（第 307 條）

- **`Benny Green` ≠ 英國長號手／樂評 Benny Green（1927–1998）**。
  ⚠ **Billboard 1990-01-27 p94 有一則專門的更正欄處理這個混淆**（「newcomer pianist (and not 'bonist extraordinaire)」），
  **同一則還訂正了「Blue Note 首張≠生涯首張」——他在 Criss Cross 已出過兩張。**
- **`George Adams`** 是極常見人名（另有同名鄉村與福音歌手）；本卡指的是 **1940–1992、Mingus 與 Gil Evans 樂團出身的次中音手**。
- **`Geri Allen`** 另有 `Gerri Allen`／`Jerry Allen` 等變體實體；本卡指的是 **1957–2017 的底特律鋼琴家**。
- **`Ralph Peterson`**：**Apple 上另有第三種寫法 `Ralph Peterson Jr and The Fo'tet`**——**不得因店面的寫法造出第三種字串。**

---

## 第 1026 條（同批）：**1991 年的紙本本層自己掃了，兩刊 125 期；順手多掃了 1992 年第一季**

派工信說「**1991 還沒有人掃**——你要自己抓」。實際掃的範圍是 **1991-01 → 1992-03**（多掃一季，理由見下）：

| 檔案 | 期數 | 命中頁 | 缺期 |
|---|---|---|---|
| `enum/billboard-bn-1991-1992q1-ocr.txt`（4.5 MB） | **64**（1991-01-05 → 1992-03-28） | **505** | **1991-12-28**（年終合刊週） |
| `enum/cashbox-bn-1991-1992q1-ocr.txt`（0.96 MB） | **61**（1991-01-19 → 1992-03-28） | **137** | 1991-01-05／01-12／1992-01-04／1992-01-11（皆年初合刊週） |

已 **append** 進 `enum/SOURCES-billboard-cashbox.md`（**只在檔尾追加一節，沒有改別人寫的段落**）。
**兩份都在 8 MiB 以下，依派工信的寫檔規則存成純 `.txt`，不壓縮。**

- ⚠ **與 c-150 b 的紙本重疊**：**兩棒同時在跑**，b 組的 `billboard/cashbox-bn-1991-1992-ocr.txt.gz`
  （涵蓋到 1992-12-26，命中頁 2,243／651）在本棒寫到一半時落地。**關鍵字集完全不同**
  （b 組用它自己的 23 個目錄號＋57 個詞；本棒用 a 組的 24 個目錄號＋50 個盤名／人名詞，含兩張爵士榜的榜名），
  **命中頁也不同**——**依 1987 年那一段的前例，合併時先比對命中頁清單再決定留哪一份，不要直接刪。**
  **查 1992 年 4 月之後的碟請用 b 組那兩份（本棒的只到 1992-03-28）。**
- ⚠ **多掃 1992 年第一季是刻意的**：本組有七張 1991 年下半的碟（Stolen Moments 11 月、Straight to My Heart 9 月……），
  **評介與榜位會落到隔年 1–3 月**。實測有用：**Billboard 1992-01-18 p15 的葛萊美入圍名單抓到了
  Charlie Haden《Dream Keeper》**，那是本組唯一的獎項證據。
- ⚠ **第 821／852 條的續測：檔名備援仍然沒有用上。** 1991-01 → 1992-03 兩刊各 65 個週六，
  **Billboard 全部 `BB-YYYY-MM-DD.pdf`、Cash Box 全部 `CB-YYYY-MM-DD.pdf`**；
  `Billboard-`／`Billboard%20`／`Cash-Box-`／`CB%20` 四種備援一次都沒命中。
  **→ 與 c-146（1982–85）、c-149（1987–89）一致：1980 年起實際不需要備援形。**
  ⚠ **但 c-148 在 1987 那一年實測過 `Billboard-` 形**（見 SOURCES 前一節），**所以規則仍要寫、只是這一段用不上。**
- ⚠ **缺期五則全部落在年終／年初合刊那一週**——**缺得規律，不是檔名問題**（第 789／821 條的判準續成立）。
- 掃法沿用 `c143a/scrape.py` → `c149b/harvest.py` 的形狀（`pymupdf` 直接讀文字層），
  四路 × 兩刊並行，130 期約 10 分鐘。**存的是命中頁不是全文**（第 879 條），
  格式沿用 c-149 b：每個 `===== PAGE n =====` 後面印 `hits=[…]` 命中詞清單。

### ⚠ 兩條 1990–91 專屬的紙本操作結論

1. **1991 年底起 Blue Note 的美國目錄號前綴從 `B2-`／`B4-` 換成 `C2-`／`C4-`。**
   本組唯一踩到的是 **Stanley Jordan《Stolen Moments》（Billboard 1991-11-30 新片欄印「Capitol/Blue Note C2-97159 CA C4-97159」）**；
   **1990 年那幾張全部是 `B2-`／`B4-`。****給後批：1991 年底之後查紙本，`B2-` 查不到要改試 `C2-`。**
2. **第 879 條（兩張爵士榜）在 1991 續成立，而且分野很清楚。**
   本組上 **`TOP JAZZ ALBUMS`** 的：Time on My Hands（**No.1 三週**）、Eliane Elias Plays Jobim、I Remember（已退）、
   Meant to Be、Discovery: Live at Montreux、Straight to My Heart。
   上 **`TOP CONTEMPORARY JAZZ ALBUMS`** 的：It's Supposed to Be Fun、Acoustic Moments、Stolen Moments。
   **同一張碟只會上其中一張，兩張都要查。**

---

## 第 1027 條（同批）：**撞陳列 3 張——全部是「同名不同錄音」，逐軌比對到 CD 那一層**

| 本組的碟 | 撞到的池中卡 | 判定 |
|---|---|---|
| `Stanley Jordan`《Stolen Moments》盤名與第 5 軌 | `Oliver Nelson`《Stolen Moments》（1975，seed）與 `Mark Murphy`《Stolen Moments》（1978，seed） | **盤名對盤名撞、內容零重疊**：本張是 1990-11 東京 Blue Note 俱樂部的吉他三重奏現場，池中兩張是完全不同的錄音。**收，三卡 risk 互指；正文不得把盤名的由來寫成翻唱 Nelson 那張專輯。**⚠ 另有 **Lee Ritenour《Stolen Moments》（GRP 9615）整個 1990 年都在 Billboard 爵士榜上**，紙本比對要用 catno 排除（第 968 條） |
| `Dexter Gordon`《Nights at the Keystone, Volume 3》 | seed《The Panther!》（1970）與 seed《More Than You Know》（1975） | **兩個同名曲都在已退的 Vol. 2 上，不在本卡**。**本卡四軌與池中 19 張 Dexter Gordon 零重疊。**⚠ **若主線日後要撿回 Vol. 2，必須先處理這兩處** |
| `Gonzalo Rubalcaba`《At Montreux》 | seed 的五張 1974 年《Live at Montreux》（Bobby Hutcherson／Marlena Shaw／Ronnie Foster／Bobbi Humphrey 等） | **同一個音樂節、不同年份、不同藝人，不是撞卡。****上架比對必須連 catno 與 1990 一起帶。** |

**逐軌比對後確認零重疊的**：Time on My Hands／Meant to Be（vs 池中 seed《Blue Matter》，兩張的十一軌全新）、
My Backyard（vs c-149 a《Ever Since the World Ended》，十二軌全新）、Random Thoughts（vs 池中 6 列 Don Pullen）、
Dream Keeper（vs seed《Liberation Music Orchestra》1970，五軌全新）、Acoustic Moments（vs c-149 a 兩張 Lagrène）、
Eliane Elias Plays Jobim（vs c-148／c-149 兩張 Elias）、It's Supposed to Be Fun（vs 池中 4 張 Lou Rawls，**Billboard 說的「pastiche of selections old and new」指的是選曲新舊，十四軌全部錄於 1990 年**）、
The Nurturer／Presents The Fo'tet（vs c-149 a《Triangular》，**三張碟沒有一張同場**）。

⚠ **本組內部的同名曲三處，兩卡各自 risk 互指**：〈Impressions〉（Acoustic Moments 第 6 軌／Stolen Moments 第 2 軌，都是 1990 年錄的 Coltrane 曲）、
〈All the Things You Are〉（Acoustic Moments 第 4 軌／At Montreux 第 7 軌）、〈Autumn Leaves〉（Stolen Moments）。

---

## 第 1028 條（同批）：**店面與封面——Apple 20 張中 14 張命中、5 張三種查法全空、1 張靠換國別救回；CAA 19 圖 1 缺**

**只寫觀察不寫結論（第 254 條）。**

- **Apple us `search`（第一種查法）命中 14 張**，其中 **13 張軌數＝原盤軌數**。
- **三種查法全空 5 張**：`Renee Rosnes`《For the Moment》、`Charlie Haden and The Liberation Music Orchestra`《Dream Keeper》、
  `George Adams`《America》、`Geri Allen`《The Nurturer》、`Biréli Lagrène`《Acoustic Moments`》。**五張的試聽都要走替代來源。**
- ⚠ **靠換國別店面救回 1 張**：**`Eliane Elias`《Eliane Elias Plays Jobim》us 店面兩種查法全空，換 jp 店面才命中
  1509394239（11 軌＝原盤軌數，releaseDate **1990-04-18**，℗ 1990，標「A Somethin' Else Records release」）**
  ——**這一則同時是本組最硬的一條日本首發日期證據**（與 c-149 b 第 996 條 Rita Reys 換 nl 店面同形）。
- ⚠ **候選給錯碟 3 張（第 528／707／709／865 條）**：
  1. **`Renee Rosnes`（同名首作）**：`search` 回的五筆**全是她 2010 年後的 Smoke Sessions 專輯與 Bill Charlap 聯名盤**，一筆都不是本張。
  2. **`Ralph Peterson`《Presents The Fo'tet》**：回的三筆全是後來的 Fo'tet 作品
     （2004 Criss Cross《The Fo'tet Augmented》、2000 Silva Screen《Back To Stay》、2014《Alive At Firehouse, Vol. 2》）
     ——**與 c-149 a 第 966 條《Triangular》回到《Triangular 2》《Triangular III》是同一種壞法。**
  3. **`George Adams`《America》**：回的五筆是 Mormon Tabernacle Choir、Huey Lewis 精選、九一一紀念合輯……**盤名太普通的極端形。**
- ⚠ **Apple 的日期欄在本段的壞法**（第 966／978 條續測）：
  | 碟 | Apple releaseDate | 實際 |
  |---|---|---|
  | Random Thoughts | **1990-03-23** | **＝錄音日**（第 484 條） |
  | Nights at the Keystone Vol. 3 | **1979-01-01** | **＝錄音年**；copyright 還標「This Compilation ℗ 1990」 |
  | Man-Talk for Moderns Vol. X | **1990-01-01** | 早一年；**℗ 欄才是 1991**（兩欄自相矛盾） |
  | I Remember（已退） | **1992-01-01** | 晚一年；℗ 標 2013 |
  | At Montreux | **1991-03-30** ＋ ℗ 1991 | **與 Discogs 的日本原盤 1990 正面衝突**（見第 1029 條） |
  | 其餘 8 張 | `YYYY-01-01` | 純 placeholder |
- **CAA**：RG 層**有圖 19 張**（front 全有）、**真 404 一張**（`The Bob Belden Ensemble`《Straight to My Heart》，
  已 `redirect: follow` 重試三次確認，第 589a 條）。**那張的封面要走 Discogs 原壓 6402447／1309377。**
- ⚠ **CAA 有圖但來源不是原盤的 4 張**（研究層要看版式）：
  **Random Thoughts**（來源是日本盤 TOCJ-5230）、**Dream Keeper**（來源是 **2007 Decca France 數位**，三版原盤都不是）、
  **At Montreux**（來源是 1991 美版，不是日本原盤）、**Acoustic Moments**（來源是 1991 美版，不是 1990 歐版原壓）。
  ⚠ **Eliane Elias Plays Jobim 的來源是 GB 版**（同為 1990，但不是日本原盤也不是美版）。

---

## 第 1029 條（同批）：**Somethin' Else 授權線——本組 20 張裡有 6 張，是這一段的新形狀，必須逐張核首發地**

**Billboard 1990-07-07 p59 的 Blue Note 專訪把整件事說清楚了**（受訪者是 Blue Note/Capitol Jazz 行銷兼 A&R 總監 Matt Pierson）：
> 「But the label has also been transfused with Japanese productions of American jazz artists.
> **Through an international licensing agreement with Toshiba/EMI, Blue Note gains access to albums
> on the somthin'else label from Japan**, which Pierson describes as being『their Blue Note.
> And once they're here, they're treated just like any other Blue Note records.』」

**本組屬於這條線的 6 張，首發地與年份各不相同——不可整批套同一個答案（第 817 條）：**

| 碟 | 日本原盤 | 美版 | 本卡取的 `year` | 依據強度 |
|---|---|---|---|---|
| `George Adams`《America》 | Somethin' Else **TOCJ-5517（1990）** | Blue Note CDP 7 93896 2（1990） | **1990** | 中（**兩刊零命中**，只有 Discogs 日美原壓群） |
| `Renee Rosnes`《For the Moment》 | Somethin' Else **TOCJ-5524（1991）** | Blue Note CDP 7 94859 2（**1990**） | **1990** | 中偏弱（**兩刊零命中**；**日本盤反而晚一年**） |
| `Eliane Elias`《Eliane Elias Plays Jobim》 | Somethin' Else **TOCJ-5519（1990-04-18）** | Blue Note／Something Else CDP-593089（1990） | **1990** | **強**（Apple jp 帶完整日期＋BB 1990-06-30 評介＋Top Jazz 1990-07-21 NEW） |
| `Gonzalo Rubalcaba`《At Montreux》 | Somethin' Else **TOCJ-5527（1990，℗© 1990 Toshiba-EMI）** | Blue Note CDP 7 95478 2（**1991**，改題《Discovery: Live at Montreux》） | **1990** | 中（**Apple ℗ 標 1991，與 Discogs 打架**） |
| `Geri Allen`《The Nurturer》 | —（盤面標「A Somethin'else Recording」，無獨立日本號） | Blue Note CDP 7 95139 2（1991） | **1991** | 中（BB 1991-03-02 評介） |
| `Ralph Peterson`《Presents The Fo'tet》 | —（Discogs 廠牌欄 Blue Note ＋ Somethin' Else **同號**） | Blue Note CDP 7 95475 2（1991-02-12） | **1991** | 中（BB 1991-03-02 評介＋12-21 年度回顧） |

**另有 `Renee Rosnes`（同名首作）與 `Stanley Jordan`《Stolen Moments》的 Discogs 廠牌欄也掛 Somethin' Else**
（兩張的執行製作都有 Hitoshi Namekata），**但兩張的首發地都是美國**（前者 BB 1990-02-03 新片欄、後者 BB 1991-11-30 新片欄，都是美國 release sheet）。

### ⚠ 給後批的四條操作結論

1. **`Kazunori Sugiyama`／`Hitoshi Namekata`／`Yoshio Okazaki`／`Kaoru Taku`／`Shigeru Uchiyama` 這一組名字
   出現在 credits 裡，就是 Somethin' Else 線的指紋**——**看到就去 Discogs 查有沒有 `TOCJ-5xxx` 的日本原盤。**
2. **Somethin' Else 線的碟多半不進 Billboard 的美國新片欄**（本組 America 與 For the Moment 兩刊全年零命中）
   ——**這是系統性沉默，不是年份可疑的單獨訊號**（第 704 條的限定用法）。
3. **日美先後不固定**：America 同為 1990、Plays Jobim 日本早兩個月、At Montreux 日本早一年、
   **For the Moment 反而是美國早一年**。**逐張核。**
4. **這條線與第 313 條（原盤他廠）不同**：Somethin' Else 是 Toshiba-EMI 旗下、與 Blue Note 同屬 EMI 集團，
   **美版是集團內授權、目錄號是 Blue Note 正式號段**——**不構成退件理由**。
   **真正要退的是集團外的廠牌**（c-149 b 的 Intima、veraBra、Jazz City）。

---

## 第 1030 條（同批）：**《Dream Keeper》——三大洲三家廠牌分工的一張，`year` 取日本原盤 1990**

**Billboard 1990-12-15 p20（Jeff Levenson 的 Jazz Blue Notes 專欄）把安排寫得很完整：**
> 「Haden is set to release his third album,『Dream Keeper』…… In an unusual arrangement,
> **the album was done for Japan's DIW Records, yet licensed in Europe by PolyGram France,
> and in the States and Canada by Blue Note.** …… three labels across as many continents
> sharing the cost of production and distribution for this latest title.」

| 版本 | 年 | 證據 |
|---|---|---|
| **DIW-844（JP CD）＋ DIW 8045（JP 黑膠）** | **1990** | Discogs master 284848／release 2511757，notes「**© ℗ 1990 disk UNION**」，20 頁日英對照內頁 |
| Polydor／PolyGram Jazz 847 876-2（FR／US） | 1990 | Discogs 3693556（France）／3412148 |
| **Blue Note CDP 7 95474 2（US/CA）** | **1991-01** | **Billboard 1991-01-12 p41 新片欄「CHARLIE HADEN & THE LIBERATION MUSIC ORCHESTRA The Dream Keeper CD Blue Note B2-95474 CA B4-95474」**；1991-02-02 p70 評介；Discogs 2419024 的 notes「℗ © 1991 Disk Union/DIW **under exclusive license to Capitol Records**」 |

**依 `CURATION-BRIEF-bluenote.md` §1.3「原盤若是他廠，`year` 取他廠首發年、`label` 寫原廠」，取 1990、`label` 以 DIW-844 為首。**
**先例**：c-149 b 的日野皓正《Bluestruck》（Somethin' Else JP 1989 → Blue Note US 1990，取 1989）。

⚠ **競爭讀法**：**Billboard 1990-12-15 用的是「is set to release」（當時尚未上市）**，
而 DIW 的 1990 只有盤面 ℗© 支持——**若主線認為那是第 550／570 條的 ℗ 年抄錄，改判 1991 只動 `year`／`label` 欄，可逆（第 1049 條）。**

⚠ **這張不是退件，與 c-149 b 的退件 #1／#4 形狀相反**：
c-149 b 第 991 條形狀 A／D 的判準是「**MB release 的 catalog-number、barcode、media format 三者同時為 null**」；
**本張的 Blue Note release a5b697a9 有完整 catno `CDP 7 95474 2` 與 barcode `077779547425`，Billboard 新片欄也確實登了**
——**是真實的授權發行，不是錯登的 Blue Note 掛名。**

⚠ **錄音 1990-04-04～05 Clinton Studios（追錄 Fantasy Studios）**，
**1992-01-18 Billboard p15 的葛萊美入圍名單有它**（Best Jazz Instrumental Performance, Large Ensemble）。

---

## 第 1031 條（同批）：**c-149 第 991 條形狀 A 的反例——《Stolen Moments》錄在東京 Blue Note 俱樂部，但廠牌真的是 Blue Note**

c-149 第 991 條給後批的第一條操作結論是：
「**盤名帶俱樂部名的（Blue Note Tokyo、Village Vanguard、Sweet Basil……）一律先查是不是場地**」，
第二條是「**catalog-number 是 null、barcode 是 null、media format 是 null 三者同時出現，先假設是錯登的 Blue Note 掛名**」。

**本組的 `Stanley Jordan`《Stolen Moments》剛好是那條規則的反例，要記下來，免得後批誤退：**

| 比較項 | c-149 b 退件 #1：Bill Evans《Let The Juice Loose ... Live At Blue Note Tokyo》 | 本組：Stanley Jordan《Stolen Moments》 |
|---|---|---|
| 錄音地 | 東京 Blue Note 俱樂部（1989-09-09） | **東京青山 Blue Note 俱樂部（1990-11-07～09）** |
| MB catalog-number | **null** | `CDP 7 97159 2` |
| MB barcode | **null** | `077779715923` |
| MB media format | **null** | CD |
| 實際廠牌 | **Jazz City 660.53.001** | **Blue Note** |
| 同期紙本 | Billboard 1990-07-07 的 **Jazz City 整版廣告** | **Billboard 1991-11-30 p55 新片欄「Capitol/Blue Note C2-97159 CA C4-97159」＋同期 p57 評介＋12-21 Contemporary Jazz 榜 NEW** |
| 判定 | **退** | **收** |

**判準精確化：不是「盤名或錄音地出現 Blue Note 就可疑」，是「catno＋barcode＋同期紙本三件齊全與否」。**
**錄音地在 Blue Note 俱樂部完全不影響廠牌判定。**

---

## 第 1032 條（同批）：**「錄音年早於發行年」在本組有四種成因，只有一種算再發**

派工信的預警是「**錄音年在 1985 前的，先假設它是再發或重編**」。**本組實測，錄音年早於發行年的有 9 張，分成四類：**

| 成因 | 本組實例 | 處理 |
|---|---|---|
| **（一）重編／擴充再發**（唯一該退的） | Keystone Vol. 1（錄 1978–79，母體 1985 BABB-85112）、Vol. 2（同）、I Remember（錄 1988，母體 1988 CJ32-5020） | **退**（第 1021／1022 條） |
| **（二）庫存盤／首度公開** | Keystone Vol. 3（錄 1978-09／1979-03，1990 首度公開，Discogs notes「All selections previously unissued」） | **收**，照 c-145 寫法：`year` 取首次商業發行年，`risk` 寫錄音年 |
| **（三）Somethin' Else 線的製作到發行時差** | The Nurturer（錄 1990-01、1991 出）、Presents The Fo'tet（錄 1989-12、1991 出）、America（錄 1989-05～07、1990 出） | **收**，正常時差，**不套第 969 條** |
| **（四）一般的錄音到發行時差** | My Backyard（錄 1989-12、1990 出）、Meant to Be（錄 1990-12、1991 出）、Time on My Hands（錄 1989-11、1990 出）、Stolen Moments（錄 1990-11、1991 出） | **收**，**正文不得把發行年寫成錄音年** |

⚠ **本組 20 張收件裡，19 張是 1989–91 年的新錄音**——**再發混進來的比例比派工信的預警低很多，與 c-149 第 969 條的觀察一致。**
**但混進來的那三張全部不是靠盤名看出來的**：Keystone 兩張靠 Discogs 的逐軌 notes ＋ Billboard 評介的一句話，
I Remember 靠 Discogs 的逐軌錄音日期表。**判準只能是逐軌來源。**

---

## 第 1033 條（同批）：**`releaseType` 全部照 MB 原值 `Album`，0 張走 §5.6；但兩張「長得像合輯」的要記**

20 張的 MB `primary-type` 全是 `Album`；`secondary-types` 有值的三張全是 `["Live"]`
（Keystone Vol. 3、At Montreux、Stolen Moments），**沒有一張帶 `Compilation`**。
`exceptionReason` 與 `exceptionEvidenceUrls` 20 張全空，chk-prop 的「非合輯卻帶例外欄位」檢查通過。

**盤名帶 Best of／Greatest／Collection／Anthology／The Very Best／Years／Anniversary 的：0 張。**

⚠ **兩張長得像合輯、實際不是，要記下來**：
1. **`The Bob Belden Ensemble`《Straight to My Heart: The Music of Sting》**——盤名帶「The Music of」、
   內容全是翻奏 Sting／The Police，**但十一軌是 1991 年為本盤新錄的演奏**（第 874 條比例 0/11）。
   **Discogs master 440563 的 format 欄也只標 `CD, Album`。收。**
2. **`George Adams`《America》**——十軌幾乎全是美國民謠與國歌，**但都是 1989 年新錄的演奏**，不是舊錄音集結。**收。**

⚠ **反過來，第 613／782 條在本組中了兩次**：**Keystone Vol. 1／2 的 MB `primary-type` 是 `Album`、
`secondary-types` 是 `["Live"]`，完全沒有合輯訊號**；**I Remember 的 `secondary-types` 是空**。
**三張都是重編，MB 的型別欄一個都沒標。**

---

## 第 1034 條（同批）：**軌數兩形 2 張、軌名錯 4 處——寫作層的硬約束**

### 軌數兩形

| 碟 | 少的那形 | 多的那形 | 差在哪 |
|---|---|---|---|
| `John Scofield`《Time on My Hands》 | **原 LP 8 軌**；**2015 年 75 週年黑膠再發（51569821）也是 8 軌** | **CD 11 軌** | Discogs 1953986 notes「**9 through 11 are bonus tracks on this CD, not available on the original LP release**」——多出的是〈Time And Tide〉〈Be Hear Now〉〈Fat Lip〉 |
| `Geri Allen`《The Nurturer》 | **MB 的 `track-count` 是 9** | **MB 自己列了 10 個軌名；Discogs 原壓 1299720 是 10 軌** | **MB 的 track-count 欄與軌目自相矛盾，以 Discogs 的 10 軌為準** |

**寫作層的硬約束：《Time on My Hands》的正文不得把後三軌寫成原 LP 內容。**

### 軌名錯（**MB／Discogs 拼法一律不改，寫作層照正確拼法**，第 483 條）

| 碟 | 錯的 | 正確 | 依據 |
|---|---|---|---|
| `Benny Green`《Lineage》第 9 軌 | MB「Repetition」 | **`Levitation`** | Discogs 原壓 1915622（Bud Powell 曲） |
| 同上第 12 軌 | MB「Grass Enclosure」 | **`Glass Enclosure`** | 同上（Bud Powell 1953 年的 Blue Note 名作） |
| `Geri Allen`《The Nurturer》第 10 軌 | MB／Discogs 都作「Lullaby of Isfahn」 | **`Lullaby of Isfahan`** | Strayhorn／Ellington《Far East Suite》的〈Isfahan〉 |
| `John Scofield Quartet`《Meant to Be》第 5 軌 | MB「The Guiness Spot」（單 n） | **`The Guinness Spot`** | Discogs 原壓 1309377 |

⚠ **Eliane Elias《Plays Jobim》的軌目另有一處**：**MB 的美國 release 7ce70bb5 列了 12 個軌名**，
末軌〈Don't Ever Go Away (Por Causa De Voce)〉**與第 5 軌〈Don't Ever Go Away〉是同曲異名**；
**Discogs 原壓是 11 軌**。**正文以 11 軌為準，不得寫成兩首不同的曲。**

---

## 第 1035 條（同批）：**同批內部的側人交叉 9 組——本組是整條 Blue Note 線到目前為止交叉最密的一批**

**原因很單純：1990–91 年的 Blue Note 花名冊就那麼大，Billboard 1990-06-16 p69 與 1990-11-10 p87 兩則整版廣告
把同一批人名列了兩次。****每一組的兩卡 `risk` 都已互指。**

| 人 | 領班的那張 | 當側人／別身分的那張 | 是否同場 |
|---|---|---|---|
| **Charlie Haden** | 《Dream Keeper》（1990-04 Clinton Studios） | 《Time on My Hands》（1989-11 Power Station，貝斯）＋《At Montreux》（1990-07-15，貝斯兼製作） | **三場互不相干** |
| **Paul Motian** | （本組無領班盤） | 《Dream Keeper》（1990-04，鼓）＋《At Montreux》（1990-07-15，鼓） | **不同場** |
| **Joe Lovano** | （本組無領班盤） | 《Time on My Hands》（1989-11）＋《Meant to Be》（1990-12） | **不同場、班底其餘全換** |
| **Joey Calderazzo** | 《In the Door》（1991，錄 ~1990） | 《Straight to My Heart》（1991，鋼琴） | **不同場** |
| **John Scofield** | 《Time on My Hands》（個人字串）＋《Meant to Be》（Quartet 字串） | 《Straight to My Heart》（吉他） | **三場互不相干、兩個掛名字串** |
| **Benny Green** | 《Lineage》（1990-01～02） | 《Straight to My Heart》（編曲） | **不同場、不同身分** |
| **Branford Marsalis** | （本組無領班盤） | 《Renee Rosnes》（1988–89 Van Gelder）＋《Dream Keeper》（1990-04）＋《In the Door》（~1990） | **三場互不相干** |
| **Charnett Moffett** | （本組無領班盤；他自己的《Beauty Within》1989 在 c-149 a） | 《Stolen Moments》（1990-11 東京，貝斯） | **不同場** |
| **Kenny Garrett** | （本組無領班盤） | 《The Nurturer》（1990-01，中音）；另在 c-149 a 的《The Eternal Triangle》（1987）與《Beauty Within》（1989） | **三場互不相干**（c-149 第 973 條已記過兩場，本條補第三場） |

**另有三組「同一位藝人、同一批、兩張碟」**：
`Renee Rosnes`（同名首作 1990 ＋《For the Moment》1990，**班底完全不同**）、
`John Scofield`（《Time on My Hands》＋《Meant to Be》，**兩個掛名字串**）、
`Dexter Gordon`（Keystone Vol. 3 收、Vol. 1／2 退）。

**還有兩組只是「同一位製作人」、不構成音樂關聯，正文不得寫成合作**：
Michael Cuscuna（《Random Thoughts》《Renee Rosnes》《It's Supposed to Be Fun》＋已退的《I Remember》）、
Matt Pierson（《Lineage》製作 ＋《Straight to My Heart》製作兼編曲；**他同時是 Billboard 1990-07-07 p59 那篇專訪的受訪者**）。

⚠ **Don Grolnick 是《Meant to Be》的製作人**，而**他自己的領班盤《Weaver of Dreams》已由 c-149 a 收（1990）**
——**只是同一個人，兩張碟無音樂上的關聯；本卡不得沿用 c-149 第 962 條之四為那張做的任何年份結論。**

---

## 第 1036 條（同批）：**MB 在本段的五種失效方式，全部中過**

| 失效方式 | 本組實例 | 怎麼發現的 |
|---|---|---|
| **（a）`first-release-date` ＝錄音日** | `For the Moment` frd **1990-02-15**（Discogs notes：錄音 1990-02-15～16） | Discogs 的錄音 notes |
| **（b）`first-release-date` ＝演出日** | `At Montreux` frd **1990-07-15**（＝Montreux 演出當天），且 country 標 `CH`（演出地） | Discogs 2389995 notes |
| **（c）`first-release-date` ＝較晚那一版的日期** | `Random Thoughts` frd **1990-10-24**（＝日本盤 TOCJ-5230 的日期），**但 Billboard 美國新片欄是 1990-08-11** | 紙本 |
| **（d）MB 沒建首發那一版**（第 974 條） | `America`（無 TOCJ-5517）、`Eliane Elias Plays Jobim`（無 TOCJ-5519）、`At Montreux`（無 TOCJ-5527）、**`Acoustic Moments`（無 1990 歐洲原壓 7952631／7952632）**、`Dream Keeper`（有建 DIW，但 CAA 取的是 2007 數位） | Discogs 版本群 |
| **（e）catalog-number 欄填了不可能的號碼** | `At Montreux` 的 e2b1b521 catno 填 **`UCCU-5947`——那是 2022 年 Universal Japan 再發的號碼**，1990 年不可能存在 | Discogs 版本群比對 |

⚠ **（e）是第 817 條「MB 會建出不存在的版本」的新變體**：**不是整個 release 是假的，是把後來再發的目錄號
回填到最早那一筆上**。**給後批：1985 後的日本盤，MB 的 catno 若形如 `UCCU-`／`UCCQ-`／`TOCJ-9xxxx`（五位數），
先確認那個號段的啟用年份——`TOCJ-5xxx` 是 1989–92、`TOCJ-8xxx` 是 1998、`UCCU-`／`UCCQ-` 是 2000 年代以後。**

⚠ **另外兩張的 MB release 是空殼但**不是**錯登**（與 c-149 第 991 條的判準要分開）：
`Meant to Be` 的 55d8ccde（media format null、無 barcode，**但 catno 有值、德版完整**）、
`Straight to My Heart` 的 36887852（**無日期、無國別、無 catno、無 barcode、format null**，
**但同 RG 的 2c7bc9a8 完整、Billboard 與 Discogs 都對得上**）。
**兩筆都判為 MB 的重複／不全建檔（第 611 條盲區之三），已逐軌核過軌數相同，不是不同版本。**

---

## 第 1037 條（同批）：**1985 後查紙本的假陽性，本段新增三類**

第 968 條記的是「五位數 catno 撞郵遞區號／別廠號／錄影帶號」。**本組 1990–91 這一格新增三類：**

| 類型 | 本組實例 | 實際是什麼 |
|---|---|---|
| **片語誤中（盤名太普通）** | `For the Moment`（BB 1991-01-26／02-16／05-25／07-27 共七則）、`In the Door`（BB 1991-03-02／03-09／03-30、1992-02-08／03-21 共七則）、`I Remember`（BB 1991 年一到三月十餘則**福音榜的 Shirley Caesar《I Remember Mama》**）、`Meant to Be`（BB 1991-03-02 兩則訪談） | 全部是無關報導與別榜的專輯 |
| **同名專輯佔據同一張榜** | **Lee Ritenour《Stolen Moments》（GRP 9615）整個 1990 年都在 Billboard 爵士榜上** | 與 Stanley Jordan 的同名盤無關 |
| **人名誤中別張碟的評介** | **Cash Box 1990-02-03 p9 的「BENNY GREEN: In This Direction (Criss Cross 1038)」** | 是他在 Criss Cross 的碟，**不是本組的《Lineage》** |

**操作結論（沿用並強化第 968 條）：1990 後查紙本，盤名與人名都要連廠牌名（`Blue Note`）或 catno 一起當條件；
只用盤名查，本組有四張的假陽性比真命中多。**

⚠ **另記一則 OCR 形變**（第 998 條三種形變的續測）：
**Billboard 1990-11-10 p87 的 Contemporary Jazz 榜把 Lou Rawls 的 `93841` 讀成 `9384`（掉了尾數）**，
**同一張碟在 1990-11-24 p92 讀對**。**單期 OCR 掉字元，不是紙本誤植。**

---

## 第 1038 條（同批）：**兩則同期紙本一手材料，寫作層可直接引用**

1. **Billboard 1990-07-07 p59，Blue Note/Capitol Jazz 行銷兼 A&R 總監 Matt Pierson 專訪**
   （Somethin' Else 授權協議的原文、World Pacific 廠牌重啟、「For projects we need support on, we get support」那段）
   ——**這是整條 1990 年代 Blue Note 線最有用的一則背景材料**，第 1029 條已全文引用關鍵句。
2. **Billboard 1990-12-15 p20，Charlie Haden 談《Dream Keeper》**
   （「presents music on behalf of the world's people who are fighting for freedom and for human rights」
   「Considering all the things that are going on in the world today, this album is probably a timely piece of work」，
   以及 Liberation Music Orchestra「three albums in 20 years」的樂團史）——第 1030 條已引。

⚠ **另有兩則可用的一手材料**：
**Billboard 1990-10-20 p33–p40 的 Lou Rawls 八頁生涯特輯**（他自己談《西貢小姐》那首〈The Last Night of the World〉
與留用 Cuscuna／Vera 的理由）；**Billboard 1990-05-05 p91／p94 的 Dexter Gordon 訃聞**
（1990-04-25 歿於費城，Bruce Lundvall 的談話「He was regal, dignified, elegant. He played that way. He lived that way.」）。

---

## 第 1039 條（同批）：**`John Scofield` 兩張、兩個掛名字串——這一件單獨記，因為它會重複出現**

Scofield 的 Blue Note 期共五張（Time on My Hands 1990／Meant to Be 1991／Grace Under Pressure 1992／
What We Do 1993／Hand Jive 1994），**其中至少三張的 MB credit 是 `John Scofield Quartet`**。
**本棒立的規則（第 1025 條）是「照 MB credit，兩個字串並存」，後批的 Scofield 碟一律照辦，不得改口。**

**理由與反例都在第 1025 條。此處只補一句操作提醒：**
⚠ **店面查不到 `John Scofield Quartet`**——Apple 的 artistName 是 `John Scofield`。
**上架比對與試聽一律用個人名加 catno，不要用團名查。**

---

## 第 1040 條（同批）：**給 c-151 之後的九條操作結論**

1. **1991 年底起 Blue Note 美國目錄號從 `B2-`／`B4-` 換成 `C2-`／`C4-`**（第 1026 條）——查紙本要兩形都試。
2. **`TOCJ-5xxx` 號段＝1989–92 的 Somethin' Else／Blue Note 日本盤**；`TOCJ-8xxx`＝1998、`UCCU-`／`UCCQ-`＝2000 年代
   ——**MB 的 catno 若出現晚於發行年的號段，那是回填，不是首發**（第 1036 條 e）。
3. **看到 `Kazunori Sugiyama`／`Hitoshi Namekata`／`Yoshio Okazaki`／`Kaoru Taku`／`Shigeru Uchiyama`
   就去查有沒有日本原盤**（第 1029 條）。
4. **Somethin' Else 授權線不構成退件理由**（集團內授權）；**集團外的原盤才退**（第 1029 條第 4 點）。
5. **第 874 條的門檻在本段第一次落在「邊緣」（5/9）**——**比例算完就照算，但要把反向證據寫進 rulings**（第 1022 條）。
6. **Discogs 的逐軌 notes 是 1985 後判再發最好用的一層**：本組三件退件有兩件直接靠它
   （「#1 to 4 previously issued on…」「Tracks 2, 3, 5 previously issued on…」「All selections previously unissued」）。
   **這一層在 1950–70 年代的條目上幾乎沒有，是 1985 後才有的優勢。**
7. **`release-count` 是 1 的一律去 Discogs 補全世界視野**（c-149 第 994 條續成立）——本組的年份改判就是這樣抓到的。
8. **兩張爵士榜的分野在 1991 很清楚**（第 1026 條）：直線爵士上 `TOP JAZZ ALBUMS`、
   有 R&B／流行成分的上 `TOP CONTEMPORARY JAZZ ALBUMS`。**查不到不要只查一張。**
9. **交件前重掃一次 `enum/` 與 `git status`**（c-149 第 978 條結論 8）——**本棒收工前已重掃，見第 1041 條。**

---

## 第 1041 條（同批，**收工前補記**）：**交件前重掃 `enum/`，沒有新的紙本落地**

依 c-149 第 979／998 條的流程教訓，收工前重跑了 `ls batch-progress/enum/` 與 `git status`，**而且這次真的撿到東西**：

- **並行的 c-150 b 棒在本棒寫到一半時落地了四份 OCR**：`billboard-bn-1991-1992-ocr.txt.gz`（9.1 MiB，102 期／2,243 命中頁）、
  `cashbox-bn-1991-1992-ocr.txt.gz`（2.1 MiB，100 期／651 命中頁）、`billboard-bn-1992-1993-ocr.txt.gz`、`cashbox-bn-1992-1993-ocr.txt`。
  **b 組那兩份 1991–92 的涵蓋比本棒長（到 1992-12-26），但關鍵字集是 b 組自己的 23 個目錄號＋57 個詞，
  本組 20 張的目錄號一個都不在裡面**——**拿本組四張「紙本零命中」的碟（America／For the Moment／In the Door／Lineage 的評介欄）
  回查，`93896`／`94859`／`95138`／`93670` 在 b 組的檔案裡同樣零命中，沒有可升級的來源。**
  **兩邊的檔案都保留**（第 1026 條已寫明合併原則）。
- **`git status` 另顯示 `batch-progress/c151/prop-a.json` 被別的工作階段改動中**——**本棒沒有碰它**（CLAUDE.md 的 git 規則）。
- ⚠ **`batch-progress/c150/rulings.md` 在 HEAD 裡已經有 c-150 b 組寫的第 1050–1079 條**（主線的「中途檢查點」提交）。
  **本棒收工時把 a 組的第 1020–1049 條放在檔首、b 組原文原封不動接在後面**，**沒有刪改 b 組的任何一個字**。

⚠ **本棒新增的兩份 OCR 反過來可以給別棒用**：
`billboard-bn-1991-1992q1-ocr.txt` 涵蓋到 **1992-03-28**，
**c-151～c-153 的 1991–92 年碟可以直接 grep，不必重抓。**

---

## 第 1042 條（同批）：**本棒改動的檔案清單**

- **新增**：`batch-progress/c150/prop-a.json`（20 張）、`batch-progress/c150/rulings.md`（本檔）。
- **新增**：`batch-progress/enum/billboard-bn-1991-1992q1-ocr.txt`（4.5 MB，64 期／505 命中頁）、
  `batch-progress/enum/cashbox-bn-1991-1992q1-ocr.txt`（0.96 MB，61 期／137 命中頁）。
  **兩份都在 8 MiB 以下，依派工信的寫檔規則存成純 `.txt`，不壓縮。**
  ⚠ **與 c-150 b 落地的 `*-bn-1991-1992-ocr.txt.gz` 重疊但關鍵字集不同，兩邊都留**（第 1026／1041 條）。
- **編輯（非覆寫）**：`batch-progress/c150/rulings.md` — **HEAD 裡已有 c-150 b 的第 1050–1079 條，本棒把 a 組的
  第 1020–1049 條放在檔首、b 組原文原封不動接在後面，沒有刪改 b 組任何一個字。**
- **append**：`batch-progress/enum/SOURCES-billboard-cashbox.md`（只在檔尾追加一節，**沒有改別人寫的段落**）。
- **沒有碰**：`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore／git／`prop-b.json`。

---

## 第 1049 條（同批）：**本棒判為「可逆」的四件，列表交主線**

依裁定權下放的三條判準（有先例／可逆／卡住整條線），**以下四件本棒當場定了，但改回去的成本都很低
（動的是 manifest 欄位或退表的一行，不是卡池結構）**：

| 件 | 本棒的決定 | 若要改回 | 競爭讀法 |
|---|---|---|---|
| `Dianne Reeves`《I Remember》 | **退**（第 874 條，5/9） | 把這一筆從退表移回清單 | 「日本限定＝美國市場的新商品」；Billboard 1991 年當新盤評介並進榜。**若採此讀法，必須一併訂通則**，這一段的日本限定盤很多 |
| `Biréli Lagrène`《Acoustic Moments》 | **年份 1991 → 1990** | 只動 `year` 欄 | 1990 只有 Discogs 兩筆歐洲條目的 `released` 欄與盤面 ℗© 支持（第 550／570 條） |
| `Charlie Haden and The Liberation Music Orchestra`《Dream Keeper》 | **年份 1990、`label` 以 DIW-844 為首** | 動 `year`／`label` 欄 | Billboard 1990-12-15 用「is set to release」；美加 Blue Note 版確定是 1991-01 |
| `John Scofield Quartet`《Meant to Be》 | **掛名用團名，與 `John Scofield` 並存** | 只動 `artist` 欄 | Billboard 評介與 Apple artistName 都只印「John Scofield」 |

**另有一件不是裁定、是缺漏，交主線處理**（第 1021 條）：
**Blue Note `BABB-85112`《Nights at the Keystone》（1985，雙片黑膠，7 軌）在 MB 上不存在（`catno:BABB-85112` 回 count=0），
因此不在列舉檔裡。** 本棒退掉它的兩張 CD 化身之後，**這批 Keystone Korner 現場在池中只剩 Vol. 3 的四軌**。
**若主線要補齊，應該直接以 BABB-85112 建卡。**

---

# c-150 b 組裁定（1050–1079）｜Blue Note 1991–92，22 張

**結果：收 18、退 4。年份改判 2 張（含一張改到 2002）、目錄號改判 3 張、撞陳列 2 件、掛名新字串 8 個。
新掃紙本兩份：Billboard 1991–1992、Cash Box 1991–1992（皆 `.txt.gz`）。**

## 第 1050 條：**退件四張，逐筆與理由分類**

| # | 盤 | 分類 | 證據 |
|---|---|---|---|
| 1 | **Chet Baker《The Best of Chet Baker Plays》**（rg ee380267，MB frd 1992-01-14） | **合輯＋廠牌不符**（雙重） | Discogs 七筆條目（2932271／15899223／13706928／12792581／10718336／21322390／25817638）**format 欄一致是 `Compilation`**，廠牌欄一致是 **Pacific Jazz**（`CDP 7 97161 2`／`B4-97161`），**不是 Blue Note**；內容是 Baker 1950 年代 Pacific Jazz 錄音的選輯。**列舉檔與 MB 的 catno 欄都是空的**——這正是本段簡報說的「以 1992 首發的樣子留在清單裡的再發」。**MB `secondary-types` 空、Discogs format 欄對**（第 782 條這次是反過來：MB 漏、Discogs 準）。 |
| 2 | **Everette Harp《Everette Harp》**（rg f031d718，MB 登 Blue Note `B2-96242`） | **原盤他廠**（第 991 條形狀 B／D） | **Discogs 七筆條目廠牌欄全部是 `Manhattan Records`**（`CDP 7 96242 2`／`B4-96242`／德國黑膠 `7 96242 1`），**沒有一筆是 Blue Note**；**Billboard 1992-07-04／07-18／08-01／08-15／08-29／09-12 的 TOP CONTEMPORARY JAZZ ALBUMS 榜列一律印「MANHATTAN 96242*/CAPITOL」**。⚠ **第 991 條第 2 點在本批第一次被實測命中**：Manhattan 與 Blue Note 在 96xxx 段共用號碼、MB 兩者互混。 |
| 3 | **Dizzy Gillespie《Dizzy Gilespie With Gil Fuller, The Monterey Jazz Festival Orchestra》**（rg 2008e225，`CDP 0777 7 80370 2 6`） | **再發**（錄音年 1965） | **Discogs 3450362 的 format 欄直接寫 `CD, Album, Reissue`**；原盤是 **Pacific Jazz `PJ-93`／`ST-93`（1965）**《Gil Fuller & The Monterey Jazz Festival Orchestra Featuring Dizzy Gillespie》，另有 1965 荷／英 Fontana 版《Man from Monterey》、1981 Pacific Jazz `LN-10060` 再壓、2008 Blue Note Connoisseur 版（format 欄 `Compilation`）。錄音年 <1985 → 本段簡報的判準直接適用。 |
| 4 | **Dizzy Gillespie《Live at the Village Vanguard》**（rg 6d2c3ddc，`CDP 0777 7 80507 2 8`，2CD） | **再發／擴充再發**（錄音 1967） | **Discogs 5277944 的 format 欄寫 `CD, Album, Reissue`**（藝人欄「Dizzy Gillespie Featuring Chick Corea & Elvin Jones」）；原盤是 **Solid State `SS-18034`（1968，US／德／日 SR-3018）**，1978–79 已有 Blue Note `BNS 40035`／`5C 038-60107` 再發，1985 另有 LRC Jazz Classics 卡帶。**第 874 條的門檻**：原 LP 的四軌 1968 年就買得到，1992 年 2CD 的七軌裡只有三軌是新增——**先前已成盤發行 4／7，過半，判再發**（與第 993 條 Art Pepper Vol. 3 同向）。 |

**⚠ 這四張沒有一張被 `chk-prop` 標記**（第 611 條再證：標記 0 不等於沒問題）。**抓出來的方法都不是盤名，是：(a) Discogs 的 `format` 欄、(b) Discogs 的廠牌欄、(c) Billboard 榜列印的廠牌名。**

## 第 1051 條：**本段最大的風險在本組長成三種形狀，只有一種是簡報預告的**

簡報預告的是「再發混在裡面」，本組實測 **四件退件裡只有兩件是再發**，另兩件是別的：

| 形狀 | 本組實例 | 怎麼抓 |
|---|---|---|
| **A. 真再發**（錄音 <1985，舊目錄號仍在） | Gil Fuller/Monterey（PJ-93, 1965）、Village Vanguard（SS-18034, 1968） | **Discogs 的 `format` 欄有 `Reissue`**；再用原目錄號回查 1965／1968 原壓群 |
| **B. 合輯偽裝成專輯，而且廠牌也不是 Blue Note** | Chet Baker《The Best of Chet Baker Plays》 | **Discogs `format` 欄 `Compilation` ＋ 廠牌欄 Pacific Jazz**；MB 的 `secondary-types` 空、catno 空 |
| **C. 原盤他廠，MB 誤掛 Blue Note** | Everette Harp（Manhattan 96242） | **Billboard／Cash Box 榜列印的廠牌名**——比 MB 與 Discogs 都直接 |

**給 c-151 之後的操作結論**：
1. **拿到一筆 1985 後的碟，第一件事是去 Discogs 看 `format` 欄有沒有 `Reissue`／`Compilation`**——本組四件退件有三件在這一欄就露出來，比讀盤名快得多。
2. **第二件事是比對「MB 的 label 欄」與「Discogs 廠牌欄／紙本榜列的廠牌名」**——三者不一致就先假設 MB 錯（本組 Everette Harp）。
3. ⚠ **`CDP 0777 7 803xx–805xx` 這一段在 1992 年同時裝了新錄音與 Solid State／Pacific Jazz 的再發**（本組 80370／80507 是再發、80510《Ron Carter Meets Bach》是新錄音）——**不能憑號段判定，一定要逐張查 format 欄與原壓群。**

## 第 1052 條：**年份改判兩張，一張是 MB 早一年、一張是 MB 早十年**

| 盤 | enum／MB | 改 | 依據 | 強度 |
|---|---|---|---|---|
| **Don Pullen & The African-Brazilian Connection《Kele Mou Bana》** | 1991 | **1992** | **Billboard 1992-02-29 p44 新片欄「Capitol/Blue Note Records 82-500-98166」**（release notice）＋1992-03-07 p30 專欄預告＋1992-03-14 p63 評介 ＋ Discogs 兩筆美國原壓皆 1992 ＋ Apple releaseDate 1992-05-07／℗1992 | **強**（新片欄＋Discogs＋Apple 三層） |
| **Duke Ellington《1969 All-Star White House Tribute》** | **1992** | **2002** | Discogs **六筆條目（美／歐／Club／兩張 Promo／日本 TOCJ-66133）全部 2002**，notes「℗&© 2002 Capitol Records」＋ **Apple「℗ 2002 Blue Note Records」** ＋ **號段鐵證：`7243 5 35249 2 0` 是 EMI 1990 年代末–2000 年代的號段，1992 年的 Blue Note 一律是 `CDP 0777 7 8xxxx`**（本組另外四張 1992 年碟都是後者） | **強**（Discogs 六筆＋Apple＋號段結構） |

**其餘 16 張（含退件）未改判**，年份層級逐張如下：
Playground 1991（**Discogs 完整日期 1991-06-06**＋BB 1991-07-20 新片欄＋07-27 評介＋08-03 Contemporary Jazz 進榜）、
But Not Farewell 1991（BB 1991-05-11 評介＋Discogs 美日原壓）、Ellis Marsalis Trio 1991（**MB frd 1991-04 帶月**＋BB 1991-06-22 Jazz 榜 NEW）、
Landmarks 1991（**MB frd 1991-06-04**＋BB 1991-06-29 評介＋07-06 Jazz 榜 NEW）、Standard Gonz 1991（**Discogs 完整日期 1991-04-29**，**紙本零命中**）、
Old Feeling 1991（Discogs＋MB，**紙本零命中**）、Earth Walk 1991（Discogs 三地原壓＋℗1991；**BB 新片欄 1992-02-15、上榜 1992-03-28 是美國檔期**）、
Here And Now 1991（**BB 1991-08-03 新片欄**）、This Is New 1991（見第 1053 條）、The Blessing 1991（**Discogs／Apple/MB 三處完整日期 1991-10-26**＋BB 1991-11-23 Jazz 榜 NEW）、
Images 1991（見第 1054 條）、Standards〔Tommy Smith〕1991（英國首發；**BB 新片欄 1992-02-15 是美國檔期**）、
Standards〔Lagrène 三人〕1992（℗1992 EMI France＋notes「June 1992」）、Fantasia 1992（Discogs＋MB 1992-09-22＋BB 1992-10-10 評介＋11-07 Contemporary Jazz 進榜＋Apple 1992-05-27）、
Ron Carter Meets Bach 1992（Discogs 美日兩筆皆 1992，**紙本零命中**）、Unforgettable 1992（**日本 TOCJ-5543 完整日期 1992-07-15**）。

## 第 1053 條：**「只有評介週、沒有新片欄」不足以推翻 ℗ 年——Rick Margitza《This Is New》維持 1991**

本張的紙本層看起來很硬：**Billboard 1992-01-11 評介、1992-02-01 TOP JAZZ ALBUMS 以 NEW 進榜、Cash Box 1992-02-08 第 34 名**。
但 **Discogs 美加原壓 ℗1991、MB frd 1991、Apple ℗1991 Capitol** 三層指 1991。**本層判 1991，理由寫死在這裡**：

- **第 994 條改判 McCoy Tyner 靠的是「新片欄（release notice）＋榜位＋Discogs」三層**，**本張沒有新片欄那一層**——兩刊 1991–92 逐期查過目錄號 97196 與「MARGITZA」，沒有任何一則零售新片列表。
- **評介週不是發行週**：1991 年 Billboard **12-28 那一期檔案館缺（年終合刊）**，12 月中出貨的碟評介被推到 1 月是這一段的常態。
- **同號段的鄰居可以校準**：`97197`（Rubalcaba《The Blessing》）Discogs 完整日期 1991-10-26、1991-11-23 進榜；`97196` 比它早一號卻晚三個月上榜——**合理解釋是 12 月出貨，不是隔年才出。**

**判準（給後批）**：**紙本壓過 Discogs 的前提是紙本提供的是「發行事實」（新片欄、廠牌廣告、預告短訊），不是「評論行為」（評介週）或「銷售結果」（榜位）。**
**只有評介與榜位、沒有發行事實時，℗ 年與原壓群不被推翻，但必須把兩邊都寫進 `risk`。**

## 第 1054 條：**MB 的 `first-release-date` 等於錄音日，本批又中一次——而且這次錄音日只涵蓋兩軌**

**Gonzalo Rubalcaba《Images: Live At Mt. Fuji》**：MB frd **1991-08-24**，MB 轄下第一筆 release 也標 1991-08-24（country=JP，卻掛美國目錄號 `CDP 7 99492 2`）。
**Discogs 3947428 的 notes 寫得很清楚：「Recorded live at Mt. Fuji Jazz Festival '91 with Blue Note on August 24 (tracks 6-7) & 25 (tracks 1 to 5, 8, 9), 1991」**
——**8 月 24 日只錄了九軌裡的兩軌**，把它當發行日連「錄音日」都算不準。
**真正的首發是 MB 自己的第二筆 release：日本 somethin' else `TOCJ-5540`，1991-12-04**（Apple 的 releaseDate 也是 1991-12-04）。

**給後批的操作結論**：**第 484／994(a) 條的升級版——MB 的 frd 落在音樂節／演出季節（7–9 月）而碟是現場盤時，先假設那是錄音日；
而且要去查「那一天錄了幾軌」，多日錄音的現場盤，frd 常常只對應其中一天。**

## 第 1055 條：**目錄號改判三張——盤面／紙本贏 MB**

| 盤 | MB／列舉檔 | 改 | 依據 |
|---|---|---|---|
| Andrew Hill《But Not Farewell》 | `CDP 7 95971 2` | **`CDP 7 94971 2`** | Discogs 原壓 5647938、卡帶 `B4-94971`、日本 TOCJ-5292 三筆一致；**Billboard 1991-05-11 p86 評介印「Blue Note 94971」**；⚠ **MB 自己的 barcode `077779497126` 也對應 94971**——MB 欄位自相矛盾（第 570 條同型） |
| Eliane Elias《Fantasia》 | `B2-96146` | **`CDP 0777 7 96146 2 2`** | Discogs 美／加／歐三地原壓一致；Billboard 榜列印「BLUE NOTE 96146*/CAPITOL」。`B2-` 是卡帶／黑膠前綴形 |
| Tommy Smith《Standards》 | `CDP7964522`（無空格） | **`CDP 7 96452 2`（US）／`CDP 7964522`＋`CDBLT 1003`（UK）** | 同一個號的不同印法，不是不同碟；英國另有黑膠 `BLT 1003`、卡帶 `TC-BLT 1003` |

## 第 1056 條：**撞陳列兩件——都是同一位藝人同一年的兩張碟，都靠「班底＋長度」判並存**

1. **Rubalcaba《The Blessing》（1991-05 多倫多錄音室）vs《Images: Live At Mt. Fuji》（1991-08 富士現場）**：
   **共有兩個曲名〈Giant Steps〉與〈Mima〉**。逐軌比對到 CD 那一層：
   **The Blessing 的 Giant Steps 5:24、Mima 3:05，貝斯是 Charlie Haden**；**Images 的 Giant Steps 9:58、Mima 3:09，貝斯是 John Patitucci**；鼓同為 Jack DeJohnette。
   **不同場、長度差近一倍 → 兩卡並存成立**，risk 已互指，**正文絕不得把 Haden 寫進富士那場。**
2. **Duke Ellington《1969 All-Star White House Tribute》vs 池中十五張艾靈頓卡**：
   曲名大量重疊（Take the 'A' Train／Satin Doll／Mood Indigo／Caravan／In a Sentimental Mood／Things Ain't What They Used to Be……），
   **但台上根本不是艾靈頓樂團**（Clark Terry／J.J. Johnson／Paul Desmond／Gerry Mulligan／Jim Hall／Hank Jones／Milt Hinton／Louis Bellson 的全明星拼盤，艾靈頓只在末段客座彈琴）。
   **這是「曲目重疊」不是「內容重疊」**——判並存，risk 已寫明正文不得把任何一軌指向池中某張錄音室盤。

**其餘 16 張與池中既有卡零軌目重疊**（已逐張比對曲名表）。另記三組**盤名 vs 曲名**的撞法（不是內容重疊，但正文容易寫錯）：
Lovano《Landmarks》第 6 軌〈Here and Now〉vs Keezer 的專輯《Here And Now》；
Tommy Smith 的《Standards》vs Lagrène 三人的《Standards》（**同盤名、不同掛名，chk-prop 折鍵含掛名故不報**）；
〈Body and Soul〉同時出現在 Margitza、Lagrène 三人、日野三張。

## 第 1057 條：**掛名——8 個新字串、5 個沿用、2 個收攏到池中先例、1 個非 ASCII 修正、0 新造分裂**

- **沿用池中既有字串 5**：`Michel Petrucciani`（6 列）、`Andrew Hill`（15 列）、`Rick Margitza`（1 列，c-149）、`Tommy Smith`（1 列，c-149）、`Eliane Elias`（2 列，c-148／c-149）。
- **收攏到池中先例 2**：
  - **`Duke Ellington`**（池中 15 張 seed，含三張 apex）← MB credit `Duke Ellington & His Orchestra`（c01557ad Orchestra）、**Apple 的 artistName 甚至是 `Various Artists`**。
    **收攏理由不只是先例：那場根本不是艾靈頓樂團。**
  - **`日野皓正`**（池中漢字 9 列）← MB credit 羅馬字 `Terumasa Hino`（60d3fa1e Person）。**第 307 條，不造羅馬字分裂。**
- **新字串 8**（池中皆 0 張）：`The Ellis Marsalis Trio`、`Joe Lovano`、`Jerry Bergonzi`、`George Adams`、`Jack DeJohnette's Special Edition`、`Geoffrey Keezer`、`Gonzalo Rubalcaba`（本組兩張共用）、`Don Pullen & The African-Brazilian Connection`、`Ron Carter`、
  `Biréli Lagrène, André Ceccarelli & Niels-Henning Ørsted Pedersen`——**實際 10 個，其中 `Gonzalo Rubalcaba` 一個字串吃兩張卡、`Ron Carter` 與 `Joe Lovano` 是「池中有聯名卡但沒有單獨領班字串」的第二型**（見下）。
- ⚠ **三種「池中有這個人、但沒有這個字串」的陷阱，本組各中一次**：
  - **`Joe Lovano`**：池中唯一的 Lovano 是 **`Joe Lovano Quartet`**（seed《Tones Shapes & Colors》）。MB／Discogs／Billboard／Apple 本張都印 `Joe Lovano`——**用 `Joe Lovano`，不動 seed 那張、不合併。**
  - **`Ron Carter`**：池中兩張都是聯名（`Red Garland / Ron Carter / Philly Joe Jones`、`Jim Hall & Ron Carter`），**單獨掛頭的 `Ron Carter` 是本卡第一張**——日後他的領班盤一律沿用。
  - **`George Adams`**：池中只有 `The Don Pullen-George Adams Quartet` 2 張，**Adams 自己掛頭 0 張**；本張 Pullen 沒有參與，**不得套用四重奏字串。**
- ⚠ **非 ASCII 連字號修正 1**：**MB 的 `Niels‐Henning Ørsted Pedersen` 用的是 U+2010 HYPHEN**（列舉檔照抄），**chk-prop 會直接擋**；池中既有三張 NHØP 卡一律 ASCII `-`，本卡照池中改。**`é`／`è`／`Ø` 是正字不動。**
- ⚠ **兩個「MB 主名 vs 盤面署名」不同的案例，本組給了相反的兩種處置**：
  - **`Geoffrey Keezer`**：MB 實體主名與 credit 都是 Geoffrey，**盤面／Discogs／Billboard 三處都是 `Geoff Keezer`** → **取 MB 實體主名**（池中 0 張、無先例；他本人後來也改用全名，取全名日後不易分裂）。
  - **`Jack DeJohnette's Special Edition`**：MB credit 有 's，**Discogs 無 's、Billboard 只印個人名** → **取 MB credit**（比照第 997 條 `Bobby Watson & Horizon`）。
  **兩者方向不同的理由**：Keezer 是**同一個人的兩種寫法**（取權威主名），DeJohnette 是**個人名 vs 團名**（團名是這張碟的實際署名，取 credit）。
- **`audits/pool-artist-name-splits.md` 應補記四組**：`Joe Lovano` vs `Joe Lovano Quartet`、`Jack DeJohnette` vs `Jack DeJohnette's Special Edition`、
  `Don Pullen` 的第五種掛法（African-Brazilian Connection）、`Geoff`／`Geoffrey Keezer`。

## 第 1058 條：**店面與封面——Apple 18 張中只命中 10 張，CAA 13 有 5 缺；本組的命中率遠低於簡報的預期**

- **簡報說「這一段店面命中率應該很高（現役目錄）」——實測不是。**
  **Apple `search` 命中 10 張**（Playground／But Not Farewell／Landmarks／This Is New／The Blessing／Kele Mou Bana／Images／Fantasia／Ron Carter Meets Bach／White House Tribute），
  **三種查法全空 5 張**：Ellis Marsalis Trio（回的是 1998 年 Sony 的《Twelve's It》）、Old Feeling、Earth Walk、Here And Now、Standards〔Tommy Smith〕、Unforgettable〔日野〕——**實為 6 張**；
  另 **2 張命中了但給錯碟**：Standard Gonz（回 `Jerry Bergonzi & The Modern Jazz Trio`，℗2021、7 軌 ≠ 原盤 9 軌）、Standards〔Lagrène 三人〕（回 1994–95 年 Dreyfus 時期的碟）。
- ⚠ **第 528／707／709／865 條在本組最危險的一次是 Ellis Marsalis Trio**：**盤名與掛名幾乎同字**，Apple 回的《Twelve's It》是同一個團 1998 年的 Sony 碟、12 軌——**研究層若不核軌數會整張寫錯。**
- ⚠ **Standard Gonz 的 Apple 條目雖然是錯碟，`releaseDate` 1991-04-29 卻與 Discogs 的完整日期逐日相符**——**可用作旁證，但第 431 條：仍可能同源，不算第二個獨立來源。**
- **`releaseDate` 的三種形狀本組各中**：(a) placeholder `01-01`（Playground／But Not Farewell／This Is New／Ron Carter Meets Bach）、
  (b) 真發行日（Landmarks 1991-06-04、The Blessing 1991-10-26、Images 1991-12-04、Kele Mou Bana 1992-05-07、Fantasia 1992-05-27）、(c) 本組**沒有**出現「等於錄音日」那一型。
- **CAA**：**RG 層有圖 13 張**（front 全有），**真 404 五張**：Standard Gonz、Here And Now、This Is New、Standards〔Tommy Smith〕、Unforgettable〔日野〕——**皆已重試三次確認（第 589a 條），三次都是 404 不是 5xx。**
  ⚠ **Images 的 CAA 來源 release 是日本盤 `c94da22b`（TOCJ-5540）不是美／歐版**，⚠ **The Blessing 與 Fantasia 的 RG 層各只有 1 圖**——研究層看版式要注意。
- ⚠ **日野皓正的兩版封面不同**（美版《Unforgettable》11852764 vs 日版《Blue Smiles》15139499），**研究層要指定用哪一版。**

## 第 1059 條：**「同碟兩個盤名」——日野皓正《Unforgettable》＝《Blue Smiles》，是本段第一次遇到的形狀**

**美國 Blue Note `CDP 0777 7 81191 2 8` 叫《Unforgettable》（第 6 軌曲名），日本 somethin' else `TOCJ-5543` 叫《Blue Smiles》（第 1 軌曲名）**，
**十軌曲目、班底、錄音室（M&I Recording Studios, NYC）逐項相同**；**Discogs master 1720447 的標題是 Blue Smiles、main release 是日本盤（released 1992-07-15）。**

- **本卡取 MB 的 RG title `Unforgettable`**（這條線列舉的是 Blue Note 目錄），《Blue Smiles》進 `queryAlias`。
- ⚠ **這個形狀 `chk-prop` 與跨批去重一個都抓不到**（折鍵是掛名＋盤名，兩個盤名折出兩個鍵）——**如果日後有人拿 `TOCJ-5543` 另建一筆，會變成同一張碟兩張卡。**
- **給後批的操作結論**：**1990 年代 Somethin' Else／東芝 EMI 出資、Blue Note 全球發行的碟，要同時用「日本盤名」與「美國盤名」查 Discogs master**
  ——**master 的 `title` 與 `main_release` 是判斷「是不是同一張碟」最快的一條線。**本組另有六張是同一條出資線（executive producer 都是 Hitoshi Namekata：
  Ellis Marsalis Trio、Landmarks、Standard Gonz、Old Feeling、Earth Walk、Here And Now、The Blessing、Fantasia），**已逐張查過 master，只有日野這一張有兩個盤名。**

## 第 1060 條：**`release-count` 是 1 的比例在 1991–92 反而更高——第 994 條的補全動作本組做了 11 次**

**22 筆裡 MB 的 `release-count` 是 1 的有 11 筆**（Ellis Marsalis Trio／Standard Gonz／Earth Walk／Here And Now／This Is New／The Blessing／Kele Mou Bana／Standards〔TS〕／White House Tribute／Fantasia／Ron Carter Meets Bach／Unforgettable），**比 c-149 b 的 6／15 高**。
逐筆去 Discogs 補全世界視野之後，**四筆的年份或目錄號因此被改**（Kele Mou Bana 1991→1992、White House Tribute 1992→2002、Fantasia 的 catno、Tommy Smith 的英國首發），
**另有三筆確認 Discogs 也只有一筆條目**（Standard Gonz、Here And Now、Old Feeling）。

**結論**：**`release-count == 1` 在 1985 後不是「這張碟只發過一次」的意思，而是「MB 只建了一筆」**——**1991–92 這一段幾乎每張都有日／歐／加的平行版本，不補全就會拿錯年份與錯目錄號。**

## 第 1061 條：**紙本——本層自己掃了 1991 與 1992 兩年、兩刊各 104 期**

- **新增兩份（皆 `.txt.gz`，依 2026-09-18 的規則，超過 8 MiB 直接壓）**：
  - `batch-progress/enum/billboard-bn-1991-1992-ocr.txt.gz`（**9.1 MiB**，1991-01-05 → 1992-12-26 共 **102 期、2,243 個命中頁**；缺 **BB-1991-12-28**〔年終合刊週〕與 **BB-1992-08-08**）
  - `batch-progress/enum/cashbox-bn-1991-1992-ocr.txt.gz`（**2.1 MiB**，1991-01-19 → 1992-12-26 共 **100 期、651 個命中頁**；缺 **CB-1991-01-05／01-12／1992-01-04／01-11**，四則全是年終合刊週）
  - 格式同前：每期 `######## BB-YYYY-MM-DD pages=N src=<url>`、頁內 `===== PAGE n ===== hits=[…]`、換行摺成空白、末行 `######## MISSING …`。**存的是命中頁不是全文。**
  - 已 append 進 `batch-progress/enum/SOURCES-billboard-cashbox.md`（**append，沒有改別人寫的段落**）。
- **檔名三形的備援在 1991–92 仍然沒用上**：**Billboard 全部 `BB-YYYY-MM-DD.pdf`、Cash Box 全部 `CB-YYYY-MM-DD.pdf`**，`Billboard%20`／`Billboard-`／`Cash-Box-`／`CB%20` 四種備援一次都沒命中（與第 821／852 條在 1980–89 的結論一致）。
- ⚠ **缺期六則裡有五則落在年終合刊週**（第 704／789／821 條的判準續成立）；**唯一的例外是 BB-1992-08-08**，三種檔名都試過、皆 404——**是檔案館該期沒掃到，不是「那週沒出刊」。**
- ⚠ **第 879 條在 1991–92 全段成立**：兩刊各有 **TOP JAZZ ALBUMS** 與 **TOP CONTEMPORARY JAZZ ALBUMS** 兩張榜。本組分布：
  **Jazz 榜**——Ellis Marsalis Trio、Landmarks、Earth Walk、This Is New、The Blessing、Images；**Contemporary Jazz 榜**——Playground、Fantasia、（退件）Everette Harp。**查不到不要只查一張榜。**
- ⚠ **OCR 形變本組再中兩種**：(a) **目錄號的 `B` 讀成 `8`**（Blue Note 的廣告「B2'54 -95480」＝B2-95480）；(b) **紙本／OCR 誤植人名與盤名**（BB 1991-07-20 新片欄把 Michel Petrucciani 印成「MICHAEL PETRUCCIANI」；BB 1992-02-29／03-07 兩處把《Kele Mou Bana》印成「Kele Mou Bans」）——**第 509c 條，兩種都要還原後才能拿去查 Discogs／MB。**
- ⚠ **紙本層完全空白的有四張**：Standard Gonz、Old Feeling、Ron Carter Meets Bach、Standards〔Lagrène 三人〕——**四張都確認過不是「該期沒掃到」**（1991–92 兩刊缺期六則已逐則查明）。
  **另一個要防的是「同藝人鄰近年份的別張碟」**：查 Lagrène 時 1991 年《Acoustic Moments》（Blue Note 95263）的評介與榜位共四則全部命中，**那不是本張**（第 738 條）。

## 第 1062 條（收工記錄）

**交件 `batch-progress/c150/prop-b.json` 18 張、17 位**（`Gonzalo Rubalcaba` 一位吃兩張）。
**`node batch-progress/c150/chk-prop.mjs b` → 標記 0**（跨批去重 114 批、4,608 卡、撞卡 0）。
**第 315 條核對：prop 18 ＋ rulings 退表 4 ＝ 22 ＝ slice 的 `g: "b"` 筆數。**

**本棒改動的檔案**：`batch-progress/c150/prop-b.json`（新建）、`batch-progress/c150/rulings.md`（append 第 1050–1062 條）、
`batch-progress/enum/billboard-bn-1991-1992-ocr.txt.gz`（新建）、`batch-progress/enum/cashbox-bn-1991-1992-ocr.txt.gz`（新建）、
`batch-progress/enum/SOURCES-billboard-cashbox.md`（append 一節）。
**沒有碰 git、沒有碰 `PROJECT_MEMORY.md`／`seed_cards.json`／`apex_pool.json`／KV／Firestore，也沒有碰 `prop-a.json` 與 a 組寫的 rulings 段落。**

## 第 1063 條（主線，研究 a 組查出）：**兩張改判 1991→1990，並推翻一張的首發地**

研究層在 Somethin' Else 的 TOCJ 號段上找到日本原盤，三件合起來讓號段自洽：
`5517(1990)→5519(1990-04-18)→5521(1990)→5524→5526(1990-10-24)→5527(1990-12-05)`。

1. **Geri Allen《The Nurturer》1991 → 1990**。第 1029 條表格記「無獨立日本號」是錯的——
   日本原盤是 **Somethin' Else `TOCJ-5526`，Discogs `released` 欄 `1990-10-24`（完整日期）**，
   jazzdisco 的 Geri Allen 目錄與維基本盤條目各自獨立記同一個號、同一年。
   **`year` 與 `label` 已改，可逆（只動兩個卡單欄位）。**
2. **Ralph Peterson《Presents The Fo'tet》1991 → 1990**。同一件事的第二例，**證據弱一級**
   （只有年、沒有完整日期、無紙本）：日本原盤 **`TOCJ-5521`**，Discogs 兩筆都標 1990，
   jazzdisco 獨立記「TOCJ-5521 1990」、且自己對美版年份打了問號。**可逆。**
3. **Stanley Jordan《Stolen Moments》年份不變（1991），但第 1029 條的「首發地美國」推翻**：
   日本 **`TOCJ-5531`《Stairway To The Rainbow》，released 1991-04-26**，軌目／長度／班底／執行製作
   與美版逐項相同，**比美版新片欄（BB 1991-11-30）早七個月**。
   ⚠ **這是本批第一個「同碟兩個盤名」案例，`chk-prop` 與跨批去重都抓不到**
   ——**《Stairway To The Rainbow》已加進 `queryAlias`。**

## 第 1064 條（主線）：**「新片欄沒印 LP」不能反推沒有黑膠**

派工信要求逐張查清載體。結果：**1990–91 仍有黑膠原壓的至少 5 張**
（Time on My Hands `B1-92894`、Renee Rosnes `B1-93561`、My Backyard `B1-93840`、
It's Supposed to Be Fun `B1-93841`、Acoustic Moments 歐洲 `7952631`，另 Dream Keeper 日本 `DIW 8045`、
Straight to My Heart 希臘 LP），其餘為 CD（＋卡帶）首發。

⚠ **反過來的教訓**：**Billboard 新片欄的載體欄不完整**——**Time on My Hands 只印 CD／CA，卻確實有黑膠**。
**後批不可用「新片欄沒印 LP」反推沒有黑膠。**

## 第 1065 條（主線）：**兩處軌數／軌目訂正，與撞陳列的數字修正**

- **《The Nurturer》是 9 軌，不是第 1034 條寫的 10 軌**：Discogs 美日兩地原壓都是 9 軌，
  **MB 的第 10 個軌名是多出來的**（`track-count` 9 才對）。
- **《Eliane Elias Plays Jobim》以 11 軌為準**：日本原盤本身就把〈Don't Ever Go Away〉排了兩次
  （第 4 軌 8:26 長版、第 11 軌 2:59 短版），MB 的 12 軌是又拆了一次。
- **《Nights at the Keystone, Volume 3》：第 1027 條的「四軌與池中 19 張零重疊」在軌名層面不成立**
  ——〈You've Changed〉↔ seed《Doin' Allright》、〈Body and Soul〉↔ seed《The Panther!》與《Homecoming》、
  〈As Time Goes By〉↔ seed《The Other Side of Round Midnight》。
  **四處全是同名不同錄音，內容零重疊、並存成立，但四卡 risk 要互指**
  ——**寫作層絕不得把本盤的〈Body and Soul〉與《Homecoming》那個現場混為一談。**
- **《At Montreux》vs 池中 Montreux 群的數字修正**：第 1027 條說「五張 1974 年《Live at Montreux》」，
  實掃 seed 是**六張帶 Montreux 的卡、其中只有四張是 1974 年的**（另兩張是 Bill Evans 1968 與 Keith Jarrett 2007）。
  本盤七軌與其中五張零軌名重疊（Ronnie Foster 那張 MB 查不到軌目，只能以藝人／年份／廠牌排除）。
- **《Stolen Moments》vs 池中兩張同名盤**：與 Oliver Nelson 1975、Mark Murphy 1978 的交集只有
  〈Stolen Moments〉一個曲名（三張都是 Nelson 的作品，長度 8:17／7:52／5:47，錄音完全不同）。
  **內容零重疊、三卡並存、risk 互指；正文不得把盤名由來寫成翻唱 Nelson 那張專輯。**
