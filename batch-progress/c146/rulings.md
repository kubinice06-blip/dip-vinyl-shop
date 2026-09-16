# c-146 裁定（a 組，Blue Note 1981–84，**1967–84 這一整段的最後一批**，編號 870–899）

策展層單支，2026-09-16。交件 `batch-progress/c146/prop-a.json`（8 筆全 `g: "a"`），
`node batch-progress/c146/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、
跨批撞卡 0／110 批 4,496 張、同 rgMbid 不同掛名 0）。
4 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`，欄位鍵與 `c141/prop-b.json` 完全一致。

## 第 870 條（c-146 交件）：**8 筆 → 收 4、退 4；年份改判 3 張；`label` 改他廠 2 張；`live` 改判 1 張；掛名新字串 1、收攏 1**

- **收 4 張、4 位**：`Les McCann Ltd. —《Les McCann Ltd. Plays The Shout》(1960)`、`Jimmy Smith —《Plays Fats Waller》(1962)`、
  `Michel Petrucciani —《100 Hearts》(1984)`、`Charles Lloyd —《A Night in Copenhagen》(1985)`。
- **退 4**（第 871 條）：Joe Pass《The Complete "Catch Me" Sessions》、Albert Ammons / Pete Johnson《Boogie Woogie Classics》、
  Sonny Rollins《A Night at the "Village Vanguard" Volume 2》與《Volume 3》。**第 315 條：prop 4 ＋ 退表 4 ＝ 8 ✓。**
- **退貨率 50%，是這條線開跑十二批以來最高的一批**——原因不是挑剔，是**這一格的本質**（第 872 條）。
- **年份改判 3 張**（第 873 條）：**《Plays Fats Waller》1982→1962**、**《Plays The Shout》1981→1960**、**《A Night in Copenhagen》1984→1985**。
  第四張《100 Hearts》維持 1984，**但依據整個換掉**（從 MB 的 Concord CD 換成兩刊紙本）。
- **`label` 改他廠 2 張**（第 875 條）：Pacific Jazz PJ-7、The George Wein Collection GW-3001。
  **4 張裡只有 1 張（Charles Lloyd）真的是 Blue Note 發行的盤**，另 1 張（Jimmy Smith）是 Blue Note 但年份落在 1962。
- **`live` 改判 1 張**：《A Night in Copenhagen》`false → true`（**MB `secondary-types` 空**，第 397 條）。另《Plays The Shout》enum 已標 live ✓。
- **`releaseType`**：**收的 4 張全是 Album，合輯 0**；**退的 4 張全部是舊料重編**（第 871／872 條）。
- **掛名**：**新字串 1**（`Les McCann Ltd.`）、**群組收攏 1**（`The Charles Lloyd Quartet` → 池中 `Charles Lloyd`）、
  **沿用池中 2**（`Jimmy Smith` 32 列、`Michel Petrucciani` 1 列）；**自行合併 0、新造分裂 0**（第 876 條）。
- **撞陳列 3 張**（第 877 條），**`chk-prop` 一張都不亮燈**；**退掉的 4 張全部是「撞到的不只是陳列、是碟本身」**。
- **CAA 4/4 有圖，但 4 張的來源全都不是原壓**（第 878 條）；**店面命中 4/4**（含 1 張回 CD 形、1 張回數位形）。
- **紙本**：本層自抓 **Billboard 1982-01-16→1984-08-25 共 135 期、Cash Box 同區間 136 期、Billboard 1984-09-01→1985-06-29 共 43 期**收進 repo
  ——**第 852 條指出的那三十二個月空白已經補上，而且多補了 Billboard 的 1984-09→1985-06**（第 879 條）。
- `why` 均長 **625**／`risk` **2,474**／`mbNote` **1,118** 字元（`c141/prop-b` 為 556／933／784）。**`risk` 偏長是因為四張裡三張要交代年份改判的證據鏈。**

## 第 871 條（同批）：**退表 4 筆——全部是第 842 條的舊料重編，四筆各有不同的文案證據**

| 盤 | rgMbid | 目錄號／年 | 退的理由 | 逐張文案（第 782／842 條要求的那一行） |
|---|---|---|---|---|
| **Joe Pass —《The Complete "Catch Me" Sessions》** | 4daec903-e777-48a8-8745-e7cc6601de8f | Blue Note **LT-1053**（jazzdisco 與 Discogs 皆 **1980**，不是列舉檔的 1982） | **11 軌裡 10 軌先前已成盤發行** | **Discogs 1241907 notes：「B5 previously unavailable on LP; **all other selections originally released as PJ 73, Catch Me!**」**；**jazzdisco LT-1053 條尾：「** originally released on Catch Me!, Pacific Jazz PJ-73 in 1963 + 2 bonus tracks.」**；Discogs format 欄標 **Reissue**，廠牌欄還掛「The Blue Note Re-Issue Series」 |
| **Albert Ammons / Pete Johnson —《Boogie Woogie Classics》** | e2ef00c4-d1d8-4699-98f1-0441f466f997 | Blue Note **BLP 1209**，**法國 1983** | **12 軌全部先前已成盤發行**，且是兩張 10 吋盤的併盤 | **jazzdisco 1200 系列頁條尾：「** same as Albert Ammons Memorial Album - Boogie Woogie Classics, Blue Note **BLP 7017 in 1953** + Pete Johnson - Boogie Woogie Classics, **BLP 7019 in 1953**.」**；**Discogs 3536557 format 欄標 Compilation, Reissue**，notes 自己寫「**Réédition de 1983**」「Obi included to promote **Pathé / Blue Note reissue series in France**」 |
| **Sonny Rollins —《A Night at the "Village Vanguard" Volume 2》** | 5415b762-ba8d-4722-ae86-ff256f15c7cb | Blue Note (J) **K18P-9277**，1983-06-25 | **4 軌全部先前已成盤發行**（1975 年美國雙唱片） | **jazzdisco 的 BN-LA475-H2《More From The Vanguard》(1975) 十軌名單，逐 take 涵蓋本盤四軌**（tk.3 I've Got You Under My Skin／tk.6 A Night in Tunisia 晚場／tk.7 Softly as in a Morning Sunrise take 2／tk.11 What Is This Thing Called Love）；Discogs 唱片系列欄標「**Blue Note Masterpiece (Vol.4)**」（King 1983 年的再發企劃） |
| **Sonny Rollins —《A Night at the "Village Vanguard" Volume 3》** | 8ba16783-3ca0-4912-be73-daf510d626cd | Blue Note (J) **K18P-9278**，1983-06-25 | **6 軌全部先前已成盤發行**（同上） | 同上（tk.8 Four／tk.9 Woody 'n You／tk.15 I'll Remember April／tk.16 Get Happy／tk.18 All the Things You Are／tk.19 Get Happy 短版）；**Discogs 5661029 的 notes 直接印「℗ 1983 © 1975」——© 年就是 1975 年那張雙唱片** |

**四筆都不走 §5.6**：§5.6 要的是「歷史重要性 ＋ 可追溯證據」，**這四張的歷史重要性全部屬於它們重編的那張原盤，不屬於重編本身**（第 841 條的判準原文）。
**四筆都是可逆的**：本層的查證（軌目、take 號、母帶出處）日後要收原盤時可直接沿用。

**該收的是這四張的原盤，而且四張的處境不一樣**（第 880 條的交辦清單）：
1. **Joe Pass —《Catch Me!》（Pacific Jazz PJ-73, 1963）**：Discogs master 349451、release 3504211，**Apple 有 `1480305314`（9 軌，℗ 1963）**。池中 0 列。
2. **Albert Ammons —《Boogie Woogie Classics》(BLP 7017, 1953)／Pete Johnson —《Boogie Woogie Classics》(BLP 7019, 1953)**：屬 **7000 系列 10 吋盤**，是 c-135～c-140 那一段（1939–66）的範圍，**本層無法回頭補**。
3. **Sonny Rollins —《More From the Vanguard》（Blue Note BN-LA475-H2, 1975）**：**MB 完全沒有這個 release-group**（本層以 `arid:3b47247e AND releasegroup:vanguard` 反查，只回 5 個 RG，沒有它），
   **所以列舉檔不可能提供它，整條線走完也不會收到它**——**要收只能走 §1 人工候選**（Discogs master 692264，六筆美國壓＋德國壓皆 1975）。

## 第 872 條（同批，新立）：**1981–84 這一格不是「Blue Note 的尾巴」，是「Blue Note 不存在的三年」——退貨率高是結構性的，不是挑剔**

本層把 1982-01→1984-08 兩刊 271 期全部掃過（第 879 條），**結果是：Blue Note 在這三十二個月的美國樂業刊物上幾乎不存在**。

- **LT-1053、APBL-2318、BLP 1209、K18P-9277／9278 五個目錄號，在 271 期裡零命中。**
- **Blue Note 這個字樣在 1982–84 只出現在回顧文章、Mosaic 的郵購廣告與別家廠牌的授權再發稿裡**，**沒有任何一則屬於 Blue Note 自己的新片檔期文件**。
- 直到 **Billboard 1985-02-16** 才出現「due on the street this week as part of the **first new Blue Note release**」——**「first new」三個字就是官方對這段空白的認定**。

→ **給後批的通則**：**1981 年末到 1985 年 2 月之間掛 Blue Note 名的產品，預設是「別人拿 Blue Note 母帶做的東西」，不是 Blue Note 的新發行**：
  1. **Liberty／UA 集團把 Pacific Jazz 舊母帶掛 LT- 號重編**（本批 LT-1053；第 843 條的號段結論在這裡走到盡頭）；
  2. **日本 King 的 K18P 再發企劃（Blue Note Masterpiece 全四輯，1983）**——**整個 K18P-92xx 號段都是把舊盤重新拆合**，
     **同段的 K18P-9271／9272／9273／9274／9275／9276 每一個 jazzdisco 條尾都寫著「same as … BLP 50xx + BLP 50xx」**（兩張 10 吋併一張 12 吋），**9279 寫「originally released on Sonny Clark Quintet, Blue Note (J) LNJ-70093」**；
  3. **歐洲分公司（法國 Pathé Marconi）的老號重印**（本批 BLP 1209）；
  4. **完全不是 Blue Note 的盤，只因為 MB 建了後來的 Blue Note 再發 release 而被掃進列舉檔**（本批 Pacific Jazz PJ-7、George Wein GW-3001；第 849 條在本批的續證）。
  **這四種形狀在列舉檔裡長得一模一樣——都是「BN 首發晚原盤 N 年」。判定一律逐張讀文案。**

⚠ **這條收窄第 822 條**：第 822 條說「1979–81 的 Blue Note 有兩條平行產線，日本那一條在數量上不輸美國」，並給了 `GXF`／`GXK`／`GP` 三個號段的規則。
**到 1983 年，美國那條線已經完全停了，日本那條也從「世界首發」轉成「再發企劃」——`K18P` 不是 `GXF` 的續號，性質相反。**

## 第 873 條（同批）：**年份——改判 3 張，其中兩張是 MB 的 frd 晚了二十年以上；改判的方向兩邊都有**

| 盤 | enum 年 | 改判 | MB frd 為什麼錯 | 取新年的證據 |
|---|---|---|---|---|
| **Jimmy Smith —《Plays Fats Waller》** | 1982 | **1962**（晚 20 年） | MB 這個 RG 底下只有 **1982 年 Applause Records APBL-2318 授權再發**與 2008 年三張 RVG CD，**BLP 4100／BST 84100 原盤一張都沒建** | **Cash Box 1962-08-11 p179 Blue Note 新片欄**＋**1962-08-18 p34／09-01 p22 廠牌整版廣告**＋**Billboard 爵士榜 1963-01-05 第 10 名／1963-02-09 第 14 名**＋**Cash Box 1962-12-29 p42 Smith 自己的廣告**＋jazzdisco／維基／Discogs master 374543／Apple |
| **Les McCann Ltd. —《Plays The Shout》** | 1981 | **1960**（晚 21 年） | MB 只建了 **1981 年 Liberty 期 Pacific Jazz LN-10083 再壓**、2011 Fresh Sound CD、2018 Blue Note 數位，**PJ-7 首發沒建** | **Billboard 1960-10-31 p59**（評 PJ 單曲 306：「Both sides recorded live from the album "The Shout."」）＋**Cash Box 1960-11-05 p22 單曲廣告**＋**Cash Box 1961-08-19 p26 Pacific Jazz 全目錄廣告（"THE SHOUT" PJ-7 & STEREO-7）**＋Discogs 五筆原壓（美／法／義）全 1960 |
| **Charles Lloyd —《A Night in Copenhagen》** | 1984 | **1985**（晚 1 年，**方向與前兩張相反**） | 這次 MB 沒錯得離譜，是**整群資料庫抄了盤面的 ℗ 1984** | **Billboard 1985-02-16 報導「due on the street this week as part of the first new Blue Note release」**＋**Billboard 1985-02-23 Blue Note／Manhattan 重啟整版廣告的 NEW RELEASES 欄**＋**Billboard 1985-03-16 新片評介欄（與 BT 85101 同批）**＋**Cash Box 1985-03-09「they have a new Blue Note LP out」**＋維基 infobox |
| （不改）**Michel Petrucciani —《100 Hearts》** | 1984 | **1984** | — | **但依據整個換掉**：從 MB 的 Concord CD 換成 **Cash Box 1984-03-10「will debut in April」＋Cash Box 1984-04-28 評介（List: $8.98）＋Billboard 1984-04-28 New & Noteworthy ＋ Billboard 爵士榜 1984-06→09 的在榜週** |

⚠ **第 846 條的續證，而且更極端**：第 846 條說「MB 在這一段的 frd 系統性晚一到兩年」。
**本批兩張晚了二十年以上**——**因為 MB 建的不是換號再發，是二十年後別家廠牌的授權再發。**
→ **判準（本條）**：**列舉檔的 `year` 落在 1981–84、而 `note` 標「BN 首發晚原盤 N 年」的，一律先問「MB 這個 RG 底下最早那張 release 是什麼廠牌的什麼號」**——
**只要最早那張的廠牌不是 Blue Note，或載體是 CD／數位，`year` 就一定要重查，不可能是首發。**

⚠ **jazzdisco 在本批錯一次、但方向是新的**：**BT 85104 記 1984，而同一頁的 85101／85102／85103／85105／85106 全部記 1985**
——**整段唯一的 1984，這種孤例通常是抄盤面 ℗ 年**（第 550 條）。**jazzdisco 的 LT 頁在 LT-1053 上則記 1980，比 MB／列舉檔的 1982 準。**

## 第 874 條（同批，**收窄第 842 條並給出一個可算的門檻**）：**「舊料重編 vs 庫存首發」在本批要靠比例判，不是靠有沒有**

第 842 條立的是「逐張讀文案」，但它自己也留了一個中間狀態（《On the Sunny Side》八軌裡一軌先出過單曲，仍判 Album）。
**本批四張退卡把這條線的兩端都碰到了，可以寫成一個可算的門檻**：

| 盤 | 先前已發行的軌數 | 先前發行的形式 | 判定 |
|---|---|---|---|
| c-145 b《On the Sunny Side》 | **1 / 8** | **單曲**（Blue Note 45-1769） | **Album，收**（單曲先發不改變「首度成盤」） |
| c-145 b《Omega Alpha》 | **7 / 7** | **兩張 LP**（Omega, 1957） | 舊料重編，退 |
| 本批《The Complete "Catch Me" Sessions》 | **10 / 11** | **一張 LP**（Pacific Jazz PJ-73, 1963） | 舊料重編，退 |
| 本批《Boogie Woogie Classics》 | **12 / 12** | **兩張 10 吋 LP**（BLP 7017／7019, 1953） | 舊料重編，退 |
| 本批《Village Vanguard Volume 2／3》 | **4 / 4** 與 **6 / 6** | **一張雙唱片**（BN-LA475-H2, 1975） | 舊料重編，退 |

→ **門檻**：**先前已「成盤」發行的軌數過半 → 舊料重編；只有單曲或零星軌先發過 → 仍算首度成盤。**
⚠ **「成盤」兩個字是關鍵**：78 轉單曲、45 轉單曲、廣播母帶都不算成盤；**10 吋 LP 算**（本批 BLP 7017／7019 就是因為算，才把 BLP 1209 判成重編）。
⚠ **加幾軌 bonus 不改變判定**：LT-1053 加了兩軌（其中一軌還只是同曲的 alternate take）仍然是重編——**加料的是同一張碟，不是新的一張碟**。

## 第 875 條（同批）：**`label` 改他廠 2 張——這一格「Blue Note 目錄裡的非 Blue Note 盤」佔一半**

| 卡 | 列舉檔的 note | 覆核結果 | 原廠與原號 |
|---|---|---|---|
| Les McCann Ltd.《Plays The Shout》 | 「live；BN 首發 2018，原盤 1981 可能他廠（再發）」 | **屬實，但年份也錯**（原盤 1960 不是 1981） | **Pacific Jazz PJ-7／Stereo-7**（Richard Bock 製作）；Blue Note 版＝2018-01-12 GB 數位 |
| Michel Petrucciani《100 Hearts》 | 「BN 首發 1999，原盤 1984 可能他廠（再發）」 | **屬實** | **The George Wein Collection GW-3001**（Concord Jazz 代理）；Blue Note 版＝1999 XE CD |

→ 兩張的 `year` 都取原廠首發年、`label` 寫原廠、Blue Note 版年份註在 `label` 欄尾與 `risk`（簡報 §1.3；第 849 條的同形）。
⚠ **本批的比例是 2/4**，c-145 b 是 3/22，c-144 是 0/22——**越往 1981 之後走，這個比例越高**，因為 Blue Note 自己沒有新發行、MB 上掛 Blue Note 的就只剩「後來被 Blue Note 再發的別廠盤」。
⚠ **另外兩張也不是單純的 Blue Note 新發**：《Plays Fats Waller》是 Blue Note 但落在 1962（本來就該在 c-136～c-140 收）、
《A Night in Copenhagen》的盤面同時印 **Blue Note ＋ Manhattan Records**（1985 年重啟時的雙標）。

## 第 876 條（同批）：**掛名——新字串 1、收攏 1；兩筆的判準相反，要各自寫清楚**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| **`Les McCann Ltd.`（d7d2310a **Group**，無 country、life-span 全空）** | **`Les McCann Ltd.`（新字串）** | 池中 0 列（唯一相關的是 seed `Les McCann & Eddie Harris`）。**MB `artist:"Les McCann"` 反查回四筆**：`Les McCann`（bc16d640 Person US 1935-09-23）、本 Group、`Les Mccann Trio`（1e1113b1）、`Les McCann Magic Band`（db4df264）——**無異人同名**（第 179／250／324 條核 type／area／life-span，不看 score）。取 Group 形的理由：**MB RG credit、Discogs 全部 1960 原壓的 artist 欄、Apple 的 artistName 三邊一致**，且盤名本身就含這個字串 |
| **`The Charles Lloyd Quartet`（dbbc9be6 **Group** US）** | **`Charles Lloyd`（收攏成池中既有字串）** | 池中 **5 列**（seed Forest Flower／Dream Weaver／Soundtrack／Pathless Path ＋ Charles Lloyd & the Marvels…）。**池中 seed 的《Forest Flower》(1967) 盤面同樣印 Charles Lloyd Quartet，卻用 `Charles Lloyd`**；維基條目主體亦掛 Charles Lloyd。第 307 條取池中先例 |
| `Jimmy Smith`（4f8a0d9b Person US） | **`Jimmy Smith`** | 池中 32 列，直接一致。同名撞擊核過（MB 有多個同名，本人＝4f8a0d9b） |
| `Michel Petrucciani`（2b75141c Person FR） | **`Michel Petrucciani`** | 池中 1 列（seed《Pianism》），直接一致 |

⚠ **兩筆的判準看起來相反，其實是同一條**：**第 307 條說「照池中先例」——池中有先例就照先例（Lloyd 收攏），池中沒有先例才回到 MB 與盤面（McCann 取 Group 形）。**
⚠ **兩個掛名都替後批留了坑，本層明寫**：
1. **`Les McCann Ltd.` vs `Les McCann`**：McCann 1960–64 年的 Pacific Jazz 領班盤幾乎都掛 `Les McCann Ltd.`，1965 年後的 Limelight／Atlantic／Impulse! 盤掛 `Les McCann`。
   **後批收後者時必須先決定要不要分成兩個字串**——**本層不預先合併也不預先分裂**，池中現有的 `Les McCann & Eddie Harris` 是第三個形。
2. **`Michel Petrucciani` vs `The Michel Petrucciani Trio`**：列舉檔裡還有一筆未收的 `The Michel Petrucciani Trio —《Live at the Village Vanguard》(1996)`
   ——**收那張時要回本條決定是否收攏**（照 Lloyd 的先例應該收攏成 `Michel Petrucciani`）。

## 第 877 條（同批）：**撞陳列逐張結論——收的 3 張撞、`chk-prop` 一張都不亮燈；退的 4 張是「撞碟」不是「撞陳列」**

**收的 3 張（照第 738／845 條處理：寫進 `risk` 互指，不退卡）**：

| 本批的卡 | 撞到的池中卡 | 關係 | 逐軌／逐 take 比對 |
|---|---|---|---|
| **Jimmy Smith《Plays Fats Waller》** | **seed《Crazy! Baby》(BLP 4030)** | **同一支三重奏**（Smith／Quentin Warren／Donald Bailey） | **不同場**：本盤 1962-01-23、正盤 1960-01-04，**同一間 Van Gelder（Englewood Cliffs）但相隔兩年**，**七軌對七軌零重複**。**第 855 條的三重核對（同錄音室＋同班底＋take 號互補）已跑完** |
| 同上 | **seed《Bashin': The Unpredictable Jimmy Smith》(1962)** | **同年、同一位領班** | **不同廠牌（Verve）、不同編制（大樂團）**，正文不得寫成同一條線 |
| **Charles Lloyd《A Night in Copenhagen》** | **seed《Dream Weaver》(1966)** | **CD 版多出的〈Sweet Georgia Bright〉是《Dream Weaver》的曲子** | **同曲不同錄音**（相隔十七年）；**原盤 5 軌不含這首**，只有 1993 年 CD 才有 |
| 同上 | （池中無）**《Of Course, Of Course》(Columbia, 1965)** | CD 版另一首 bonus 是那張的標題曲 | **日後若收那張 Columbia 盤，兩卡要互指** |
| **Les McCann Ltd.《Plays The Shout》** | **seed《Crazy! Baby》**（〈A Night in Tunisia〉）／**c-145 a 多張**（〈C Jam Blues〉） | **同曲名** | **撞的是曲名不是母帶**，四種鍵全部不撞 |

**退的 4 張則相反——它們撞的是碟本身**：
- 《Village Vanguard Volume 2／3》的十軌**全部**已在 1975 年的《More From the Vanguard》上；**同時池中 seed 還有《A Night at the Village Vanguard》(BLP 1581)，那是同一晚（1957-11-03）的另外六個 take**
  ——**BLP 1581 與 K18P 兩者之間確實是「撞陳列不撞碟」（零 take 重複），但 K18P 與 BN-LA475-H2 之間是「撞碟」**。**兩種關係在同一張卡上同時成立，判定取後者。**
- 《Boogie Woogie Classics》A 面六軌出自 **1939-01-06 那場**，而池中 seed 的 `Albert Ammons & Meade Lux Lewis —《The First Day》(1992)`
  **就是那一場的全集**（Apple `724510764`，18 軌，℗ 1992 Blue Note）——**本盤 A 面被它整段包住**。

⚠ **`chk-prop` 在本批的盲區樣本**（第 611 條）：
1. **《Plays Fats Waller》↔ seed `Fats Waller —《The Joint Is Jumpin'》(1987)`**：**盤名不同、但「Fats Waller」同時是本卡的盤名成分與另一卡的掛名**——子字串關係，不亮燈。
2. **《A Night in Copenhagen》↔ seed `Bud Powell —《1962 Copenhagen》(2021)`**：同城市、同關鍵字，掛名各異。
3. **《Plays The Shout》↔ 池中 9 張帶 Shout 的盤名**（The Isley Brothers《Shout!》、Sunnyland Slim《Slim's Shout》、Shirley Scott《Soul Shoutin'》、Mötley Crüe《Shout at the Devil》、James P. Johnson《Carolina Shout》……）——**全部不同掛名，四種鍵回 0。若本卡日後改題成短形《The Shout》，撞名風險會上升**（第 858 條第一節的可逆性代價）。
4. **《100 Hearts》↔ 池中 0 張同名**，但**列舉檔裡的 `The Michel Petrucciani Trio` 是同一人的第二個掛名字串**（第 876 條）。

## 第 878 條（同批）：**店面與封面觀察（第 254 條，只寫觀察不寫結論）**

- **CAA 4/4 有圖，但四張的來源 release 沒有一張是原壓**：
  《Plays The Shout》8 圖 ← **dd42876a（2011 西班牙 Fresh Sound CD）**；《Plays Fats Waller》11 圖 ← **8b75f50b（2008 德國 RVG CD）**；
  《A Night in Copenhagen》3 圖 ← **1dfafef3（1993 美國 CD）**；《100 Hearts》**只有 1 圖** ← b61684a5（1984 美國 Concord CD，**年份對但載體是 CD**）。
  → **四張都建議改取 Discogs 原壓**：12723685／12921521（PJ-7 單聲道／立體聲）、2454632（BLP 4100）、2665609／master 409173（BT 85104）、4267514（GW-3001）。
  **這與 c-145 a（20/23 有圖、其中 16 張來源是原壓）差很多**——**因為本批四張的「原壓」全部不在 MB 上**（第 873 條）。
- **Apple us `search` 一種查法 4/4 全部命中**（**本條線十二批以來第一次滿貫**），但**沒有一張的 releaseDate 對得上紙本**（第 484 條）：
  | 卡 | collectionId | 軌數 | Apple releaseDate | 與紙本的差距 |
  |---|---|---|---|---|
  | Les McCann Ltd.《The Shout (Live)》 | `1443154053` | **9（＝2018 數位形，原盤 8）** | 1960-02-16 | 上市是 1960 年 10 月前，**差八個月，也不是錄音日** |
  | Jimmy Smith《Jimmy Smith Plays Fats Waller (RVG)》 | `716650089` | **7（＝原盤軌數）** | 1962-01-01 | 上市 1962 年 8 月，**年對月日是年頭佔位** |
  | Michel Petrucciani《100 Hearts》 | `724838710` | **6（＝原盤軌數）** | 1984-01-01 | 上市 1984 年 4 月，同上 |
  | Charles Lloyd Quartet《A Night In Copenhagen (Live…)》 | `1454405968` | **7（＝1993 CD 形，原盤 5；前 5 軌對應原盤，c-130 Perfect 先例）** | 1984-01-01 | **上市 1985 年 2 月，差一年又兩個月** |
- **Apple 的 copyright 欄兩處可疑**：《The Shout》印「**A Blue Notes Records Release**」（**Blue Notes 多一個 s**）；《100 Hearts》印「℗ 1984 **Blue Note Records**」（**1984 年的版權人是 George Wein Collection／Concord，Blue Note 是 1999 年才接手**）。
- **退掉的四張的店面狀況**（記錄備查）：《The Complete "Catch Me" Sessions》Apple **零命中**，但 **《Catch Me!》原盤有 `1480305314`（9 軌，℗ 1963）**；
  《Boogie Woogie Classics》零命中，但同曲目的 **《The First Day》有 `724510764`**；《Village Vanguard Volume 2／3》零命中，
  **Apple 上那批母帶的現行形是 `1459940991`《The Complete Night At The Village Vanguard》(19 軌) 與 `1729707411`《…(The Complete Masters)》(18 軌)**。
- **`genres` 分派**：**4 張全部 `['jazz']`**（第 823／851 條的界線一張都沒破）。
  ⚠ **最接近破例的是《Plays The Shout》**——1960 年的 soul jazz、Billboard 當年的評語是「gospel flavored」，**但第 790 條的兩個破例條件（crossover 新作、錄音年代在 1968 年以後）一個都不符**，故維持 `['jazz']`，理由已寫進卡。

## 第 879 條（同批，**紙本入庫**）：**本層自抓三份共 314 期，第 852 條那三十二個月的空白補上了，並多補了 Billboard 1984-09→1985-06**

| 檔案 | 來源 | 實際涵蓋 | 期數 |
|---|---|---|---|
| `batch-progress/enum/billboard-bn-1982-1984-ocr.txt`（5.1 MB） | Billboard | **1982-01-16 → 1984-08-25 的命中頁** | **135 期**（缺 1982-01-02／01-09／1983-01-01／1983-12-31） |
| `batch-progress/enum/cashbox-bn-1982-1984-ocr.txt`（3.0 MB） | Cash Box | **1982-01-09 → 1984-08-25 的命中頁** | **136 期**（缺 1982-01-02／1983-01-01／1984-01-07） |
| `batch-progress/enum/billboard-bn-1984h2-1985h1-ocr.txt`（1.3 MB） | Billboard | **1984-09-01 → 1985-06-29 的命中頁** | **43 期**（缺 1984-12-29） |

- **格式與前批一致**：每期以 `######## BB-YYYY-MM-DD pages=N hits=M`／`######## CB-…` 分隔，頁內以 `===== PAGE n =====` 分隔並標出命中的關鍵字，
  頁內文字已先把換行摺成空白（第 636 條）。三份都用 `pymupdf` 直接讀文字層（**1982–85 兩刊的 PDF 文字層都完整，不需要 OCR**），四路並行跑 314 期約 11 分鐘。
- **關鍵字表**：8 位藝人＋ `bruce lundvall`／`cuscuna`／`george wein`／`applause records`；9 個盤名；
  目錄號 `LT[-.]?1[01]\d\d`／`BT[-.]?851\d\d`／`BLP[-.]?12\d\d`／`K18P`／`GXF`／`GXK`／`BNJ`／`GW[-.]?3001`／`PJ[-.]?7\d?`／`APBL`／`LN[-.]?100\d\d`；
  通配 `blue note`／`pacific jazz`／`manhattan records`。
- ⚠ **缺期全部是年終雙數合刊那一週**（1982-01-02／1983-01-01／1983-12-31／1984-01-07／1984-12-29／1982-01-09），
  **三形檔名（`BB-`／`Billboard%20`／`Billboard-`）與兩形（`CB-`／`Cash-Box-`／`CB%20`）各試兩輪皆 404**——**缺得規律 → 不是檔名問題**（第 789／821 條的判準）。
- ⚠ **訂正第 821 條的適用範圍**：第 821 條說「1980–81 年兩刊都只有一種檔名形狀」。
  **本層實測 1982-01→1985-06 三年半 314 期，Billboard 全部是 `BB-`、Cash Box 全部是 `CB-`，備援形狀一次都沒有用上**
  ——**`Billboard%20` 那一形到 1979 年就結束了，1980 年起再也沒出現過**（第 705／797 條的備援仍然要寫，但這一段實際不需要）。
- ⚠ **Cash Box 1984-09 之後不必重抓**：`cashbox-bn-1984-85-ocr.txt`（c-140 b 掃，1984-09→1985-06，44 期）已經涵蓋，**而且存的是整期全文不是命中頁**，比本層的檔案好用。
  **本層的 Billboard 1984h2-1985h1 正好補上那一份的另一半。**
- **紙本至此的覆蓋：Billboard 1955→1985-06、Cash Box 1960-11→1985-06，中間只剩 1961 年的文字層問題與各年的年終合刊週。**

## 第 880 條（同批，**收尾**）：**交件數字、中間檔、給後批（1985 年以後那 873 張）**

- **交件 4 張、4 位；退 4**（第 871 條）；**年份改判 3**（第 873 條）、**`label` 改他廠 2**（第 875 條）、**`live` 改判 1**；
  **新掛名 1、群組收攏 1**（第 876 條）；**合輯 0、現場 2**（Plays The Shout、A Night in Copenhagen）、**同期新作 2**（Plays Fats Waller、100 Hearts）、**庫存／延遲首發 0**；
  **撞陳列 3 張**（第 877 條）；CAA 4/4（**0 張來源是原壓**）、店面 4/4。
- `chk-prop a`：**4 張 4 位、標記 0**；跨批 110 批 4,496 張撞卡 0、同 rgMbid 不同掛名 0。
- `why` 均長 **625**／`risk` **2,474**／`mbNote` **1,118** 字元。
- 中間檔 `scratchpad/c146cur/`：`mb-fetch.mjs`＋`mb.json`（8 個 RG 的 rg／rel／caa 回傳）、`mbsum.mjs`／`mbsum.txt`、
  `poolscan.mjs`／`poolrows.json`（實掃 **33,231 列**＝seed 16,450 ＋ 184 個卡單檔 ＋ 187 個 prop 檔 ＋ manifest）、
  `web/bn-catalog-{lt,1200,1500,4000,toshiba-king,85100,bn-la}-series.{html,txt}`（**jazzdisco 七個系列全頁，第 871／872／874 條的逐軌比對就靠這七份**）、
  `dg.mjs`＋`discogs.json`（catno 反查與 release notes 全文）、`wiki.mjs`＋`wiki.json`、`apple.mjs`＋`apple.json`、
  `np.py`（三份紙本的抓取器，四路並行＋三形／兩形檔名備援）、`mk.mjs`（卡單產生）。
- **給後批（1985 年以後，爵士 873 張）**：
  1. **第 872 條**：**1985 年 2 月 Blue Note 才重啟**。**`BT 85101` 起是新的一段**，本層已把 `BT 85104` 收在 1985，**後批請由 85101 接下去，不要留缺口**。
     **同批一起出的還有 BT 85102（McCoy Tyner & Jackie McLean《It's About Time》）、BT 85103（George Russell《The African Game》）、BT 85105（Stanley Turrentine《Straight Ahead》）、BT 85106（Kenny Burrell, Grover Washington Jr.《Togethering》）**，五張的年份 jazzdisco 全記 1985 且與紙本一致。
  2. **第 873 條**：**MB 這個 RG 底下最早那張 release 的廠牌與載體，是判斷 `year` 能不能照抄的第一道關卡。**
  3. **第 874 條**：舊料重編的門檻是**「先前已成盤發行的軌數過半」**；10 吋 LP 算成盤，單曲不算。
  4. **第 876 條**：兩個掛名的坑（`Les McCann Ltd.` vs `Les McCann`、`Michel Petrucciani` vs `The Michel Petrucciani Trio`）**本層都沒有先決定，收到時請回本條**。
  5. **紙本 1982-01→1985-06 已入庫**（第 879 條）；**1985-07 之後還沒有人掃**。
  6. **本組已預約的互指**：`Michel Petrucciani —《100 Hearts》` ↔ `Charles Lloyd —《A Night in Copenhagen》`（Petrucciani 領班／側手，錄音相隔一個月，製作人重疊 Gabreal Franklin）；
     `Charles Lloyd —《A Night in Copenhagen》` ↔ 池中 seed《Dream Weaver》（〈Sweet Georgia Bright〉同曲不同錄音）↔ 未收的 BT 85105（**Les McCann 在那張彈琴**）；
     `Jimmy Smith —《Plays Fats Waller》` ↔ 池中 seed《Crazy! Baby》（同三重奏、不同場）↔ seed《Bashin'》（同年、Verve）；
     `Les McCann Ltd. —《Plays The Shout》` ↔ 未收的《Les McCann Ltd. Plays the Truth》(PJ-2, 1960) 與 `McCann in San Francisco` (PJ-16)、`Pretty Lady` (PJ-25)
     （**四張同在 Cash Box 1961-08-19 p26 那則目錄廣告上**）↔ 池中 seed《Swiss Movement》。
  7. **退掉四張的原盤清單見第 871 條**——**其中《More From the Vanguard》(BN-LA475-H2, 1975) 在 MB 上根本沒有 RG，列舉檔永遠不會提供它，要收只能走 §1 人工。**
