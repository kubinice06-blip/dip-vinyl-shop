# c-167 策展裁定（a 組 9 筆、b 組 8 筆，一支代理做完兩組）

號段 **2020–2059**（實際用到 2035）。日期 2026-09-19。
證據層落在 `batch-progress/c167/evidence/`（`mb.json`／`dg.json`／`apple.json`／`bn-wp.json`／`bn-post.json`／`tracks.json`），
抓取腳本一律加批次前綴（`c167-fetch-*.mjs`），未使用任何通用檔名（第 1758-B 條）。

---

## 第 2020 條：**結算——a 組收 7 退 2、b 組收 7 退 1，合計收 14 退 3，退貨率 17.6%**

| 組 | 派工 | 收 | 退 | 退的是 |
|---|---:|---:|---:|---|
| a | 9 | **7** | **2** | `Jackie McLean《Jacknife》2025`（第 2022 條）／`DOMi & JD BECK《YOU ASKED!》2026`（第 2023 條） |
| b | 8 | **7** | **1** | `Nate Smith《Fathers》2026`（第 2024 條） |
| **合計** | **17** | **14** | **3** | 退貨率 **3/17 ＝ 17.6%** |

**`node batch-progress/c167/chk-prop.mjs a b` 結果**：

```
prop-a.json：7 張、5 位
prop-b.json：7 張、7 位
…
130 批（其中 1 批讀 prop）｜卡數 5239｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 6｜共用目錄號 0
合計 14 張、12 位｜標記 0
```

- **標記 0**、跨組重複 0、跨批撞卡 0、同 rgMbid 不同掛名 0、共用目錄號 0。
- ⚠ ⚠ **`· 盤名撞 apex`（第 1744-B 條那一道）本批 0 處。**
  **派工信預測「地雷 1 那三張很可能會亮」——實測不亮**，原因與第 1762-B(三) 條記的那次同形：
  **那一道比的是 apex 盤名的逐字折鍵**，`liveatthevillagevanguardvol1/2/3` ≠ `liveatthevillagevanguard`，
  **`Vol. N` 的副標讓折鍵不同鍵，所以機器不會亮。撞陳列是真的，全靠人工掃出（見第 2032 條）。**
- **「同掛名盤名詞元包含」6 處全部是本批三張 Village Vanguard 互相報的**
  （Vol. 1↔Vol. 2、Vol. 1↔Vol. 3、Vol. 2↔Vol. 3，雙向共 6 行）——
  **那是本裁定刻意造成的預期輸出（三卷同系列、盤名只差一個數字），不是誤報、不是漏掃，只報不擋，後批看到不必處理。**
- **兩組 `g` 欄與 `rgMbid` 歸屬各自全對**（建檔腳本在寫檔前 `throw` 檢查了 (a) 總筆數 ＝ 7、(b) `g` 欄全等於該組、(c) 十五個欄位逐一存在）。

---

## 第 2021 條（**派工信地雷 1；本批最大的題目，判斷過程逐層寫下，會被後批引用**）：**三張 Village Vanguard 統一為掛名 `Immanuel Wilkins` ＋ 盤名 `Live at the Village Vanguard Vol. 1/2/3`**

### （一）四邊逐字對照——**MB 自己三卷就不一致**

| 層 | 掛名逐字 | 盤名逐字 |
|---|---|---|
| **MB RG `c533ae9b`（Vol. 1）** | ⚠ **`Immanuel Wilkins Quartet`（Group 實體 `38fcd6ee`）** | `Live at the Village Vanguard Vol. 1` |
| **MB RG `5d331ed7`（Vol. 2）** | **`Immanuel Wilkins`（Person `61112049`）** | `Live at the Village Vanguard Vol. 2` |
| **MB RG `94816801`（Vol. 3）** | **`Immanuel Wilkins`（Person `61112049`）** | ⚠ ⚠ **`Immanuel Wilkins Quartet: Live at the Village Vanguard Vol. 3`（團名被吃進盤名）** |
| **② Discogs 六筆條目** | **`Immanuel Wilkins Quartet`（六筆全部）** | **`Live At The Village Vanguard Vol. 1/2/3`（六筆全部，無前綴、無逗號）** |
| **④ Apple us＋jp 三卷** | ⚠ **`Immanuel Wilkins`（裸名，三卷全部）** | ⚠ **`Immanuel Wilkins Quartet: Live at the Village Vanguard Vol. N (Live)`（三卷全部，帶前綴＋`(Live)`）** |
| **③ `bluenote.com` 三篇稿** | 內文主詞逐字 `GRAMMY-nominated alto saxophonist Immanuel Wilkins`；Related Artists 欄逐字 `Immanuel Wilkins` | 標題逐字 `LIVE AT THE VILLAGE VANGUARD, VOL. 3`（帶逗號）；內文整體名逐字 `Immanuel Wilkins Quartet: Live At The Village Vanguard` |
| **③ 藝人頁回應碼** | **`/artist/immanuel-wilkins/` → 200（10,251 字）** ／ **`/artist/immanuel-wilkins-quartet/` → 404** | — |
| **池中既有（待上架）** | **`Immanuel Wilkins` 裸名 3 張**：c-165 a《Omega》、c-165 b《The 7th Hand》、c-166 b《Blues Blood》；seed 17,248 列 **0 命中** | — |

### （二）掛名判 **裸名 `Immanuel Wilkins`**，理由三層

1. **第 1703／1768 條的分界（「池中有沒有同系列前作」）在本張成立而且成立得很硬。**
   池中三張裸名之中，《The 7th Hand》(2022) 與《Blues Blood》(2024) **就是同一個四重奏**——
   ③ 官網逐字 `Wilkins' quartet featuring Micah Thomas on piano, Ryoma Takenaga on bass, and Kweku Sumbry on drums`，
   而同一篇稿逐字寫 `The quartet recently performed a stirring NPR Tiny Desk Concert featuring pieces from Wilkins' albums The 7th Hand, Blues Blood, and Live At The Village Vanguard, Vol. 2.`
   ——**官網自己把這三張擺在同一個編制的同一條線上。**
   **建團名形會造成「前作掛裸名、本系列掛團名」的分裂，第 307 條壓過三邊門檻。**
2. **三邊門檻本來就沒過。** ② Discogs 給團名形，但 ④ Apple 三卷全給裸名、③ 官網內文與 Related Artists 欄全給裸名、
   **③ 的團名形藝人頁直接 404**。**只有一邊支持團名形。**
3. **MB 自己不一致**（Vol. 1 Group、Vol. 2/3 Person）——**MB 這一層在本張沒有決定力。**

⚠ **與 c-161 b 第 1698 條（三）建 `Joe Lovano Us Five` 的差別**：那張《Folk Art》是 Us Five 的第一張、池中沒有同系列前作；
**本系列的前作在池中而且掛裸名，所以不建。這是第 1768 條的第三次應驗。**

### （三）盤名判 **去掉 `Immanuel Wilkins Quartet: ` 前綴、去掉 `(Live)` 後綴**，理由四層

1. ⚠ ⚠ **官網自己證明那個前綴屬於「整體專輯／系列」而不是分卷。** 三篇稿的軌表都逐字寫成：
   > `The track listing for Immanuel Wilkins Quartet: Live At The Village Vanguard is as follows: Vol. 1 "WARRIORS" "COMPOSITION II" "CHARANAM" "ETERNAL" Vol. 2 "THE BIG COUNTRY" "WAITING PT. 1" "CITRINE" "GRACE AND MERCY" "GO 'HEAD GET DOWN" Vol. 3 "RING SHOUT" "COMPOSITION IX" "DOLLA$" "PUT 100 ON THE BLUE CHAIN"`

   **前綴 ＋ `Live At The Village Vanguard` 是整體名，`Vol. N` 才是分卷。**
2. **② Discogs 六筆條目的 `title` 逐字全部沒有前綴**（`Live At The Village Vanguard Vol. 1/2/3`）。
3. **MB Vol. 1 與 Vol. 2 的 RG title 也沒有前綴——只有 Vol. 3 有。那是 MB 單筆建檔不一致，不是盤面差異。**
4. **帶上前綴會讓掛名在盤名裡再出現一次**（`Immanuel Wilkins —《Immanuel Wilkins Quartet: …》`），
   而且**三張只有一張帶前綴，等於在同一個系列裡造出陳列分裂**——
   ⚠ **`chk-prop` 的七道盲點沒有一道看得到這種分裂**，只能在策展層擋掉。
   ④ Apple 的 `(Live)` 後綴是 Apple 的慣例標記，不採（比照 c-166 b 第 1762-B 條處理 `Celebration, Volume 1 (Live)` 時的相反判斷——**那一張是 MB RG title 自己就帶 `(Live)`，本張的 MB RG title 不帶**）。

⚠ **代價已寫進三張的 `queryAlias` 與 `risk`**：**Apple 的 `collectionName` 帶前綴，本機用裸盤名搜尋會搜不到**
（第 1753-B 條那種「掛名／盤名不同形導致探測鏈落空」的形狀），**三張的 `collectionId` 已逐一釘定**：
Vol. 1 `1872550960`（4 軌）／Vol. 2 `1890295355`（5 軌）／Vol. 3 `1895320634`（4 軌）。
⚠ ⚠ **Vol. 1 與 Vol. 3 同為 4 軌，本機不可用軌數區分，必須用 `collectionId`。**

### （四）三張的載體不同，已逐張寫進 `label`

③ 官網逐字 `Vol. 1 is available on LP, CD, and digital formats while Vol. 2 and Vol. 3 are digital-only releases.`
**Vol. 1 有 CD `00602488170826` ＋ 2LP `00602488170871`（含綠色透明限定與 test pressing）；Vol. 2、Vol. 3 是數位專屬。**
⚠ **Vol. 1 的實體 CD／2LP 軌數本棒未取得逐軌表**——**本機配封面與試聽時要確認那張實體是只有 Vol. 1 的 4 軌、還是三卷合計 13 軌，不可預設。**

---

## 第 2022 條（**派工信地雷 2**）：**`Jackie McLean《Jacknife》2025` 退——三個各自獨立成立的理由**

派工信寫的是「極可能是 (乙)＋(戊)，先跑前置閘」，並提醒第 1737-B／1902 條「(戊) 擋的是把舊母帶重新壓片，不是盤面印了哪個系列名」。
**逐層查完：(乙) 與 (戊) 都真的成立，而且還多一個更前面的理由——它本來就已經在池子裡。**

### （一）⚠ ⚠ **最前面的理由：複合折鍵直接撞 `seed_cards.json`**

實掃 `seed_cards.json` 17,248 列，**`k("Jackie McLean")|k("Jacknife")` 逐字命中**：

> **`Jackie McLean —《Jacknife》(1975)`**（seed 一般卡，第 9 欄空、非 apex）

**而且待上架批次 `batch-progress/c144/prop-a.json` 也有同一張**（`Jackie McLean —《Jacknife》(1975)`，genres `["jazz"]`）。
**這是複合折鍵撞卡，不是「同藝人有別的卡」——第 1746-C 條的判準在這一筆是真的中了。**
⚠ **`chk-prop` 沒有亮這一行的唯一原因是本棒在寫 `prop-a.json` 前就把它退掉了**；若照抄 slice 寫進去，第四道會直接擋下來。
⚠ **`Jackie McLean` 在池中的實況（掃描清單的結論）**：**seed 24 列**，另有 c-131 b／c-138 a／c-139 a／c-140 a／c-141 a／c-141 b／c-144 a／c-144 b／c-145 a／c-145 b／c-148 a／c-154 a／c-156 b 等十餘張待上架。
**但那些盤名都不同，依第 1746-C 條不是退件理由——退的只有《Jacknife》這一張，因為它的複合折鍵命中。**

### （二）(戊) 成立——③ 官網逐字把它列在 Tone Poet **Reissue** Series 的 2025 年程表上

③ WP 搜尋 API `?search=Jacknife%20Jackie%20McLean` 回 **200、1 筆**，就是
`https://www.bluenote.com/tone-poet-society-and-2025-line-up/`（**200**）。該頁逐字：

> `Blue Note Records announces the launch of the Tone Poet Society, a new subscription service dedicated to the **Tone Poet Audiophile Vinyl Reissue Series**. … features definitive **all-analog, 180g audiophile vinyl reissues that are mastered from the original master tapes** by Kevin Gray of Cohearent Audio, manufactured at RTI, and packaged in deluxe tip-on jackets.`

年程表逐字：

> `August 1, 2025　Horace Silver – The Tokyo Blues (Blue Note, 1962)　**Jackie McLean – Jacknife (Blue Note, 1965)**`

**與 MB release 的日期 `2025-08-01` 逐日相同。**
⚠ **這與第 1902 條的 `Charles Lloyd & The Marvels《Tone Poem》` 正好是相反的一面**：
那張是「Tone Poet 系列史上第一次拿來壓**新錄音**」（官網逐字 `the first new release to be featured as part of the Tone Poet Audiophile Vinyl Series`），
**本張是系列的本業——把 1965 年的母帶重新壓片。第 1902 條要求的四層檢查跑完，四層都指向再發。**

### （三）(乙) 也成立——原盤 1975 年就發行過，Discogs 有三筆 1975 實體條目

| Discogs id | 年 | 國 | `format` 欄逐字 | `series` 欄逐字 | 廠牌／目錄號 |
|---|---:|---|---|---|---|
| 1251632 | **1975** | US | `Vinyl, 2×, LP, Album, Stereo` | ⚠ **`The Blue Note Re-Issue Series`** | Blue Note `BN-LA457-H2` |
| 12601672 | **1975** | US | `Vinyl, 2×, LP, Album, Stereo`（text `Gatefold`） | **`The Blue Note Re-Issue Series`** | Blue Note `BN-LA457-H2` |
| 11555025 | **1975** | US | `Vinyl, 2×, LP, Album, Stereo` | **`The Blue Note Re-Issue Series`** | Blue Note `BN-LA457-H2` |
| 2831437 | 2002 | Europe | ⚠ **`CD, Album, Limited Edition, Reissue, Remastered`** | ⚠ **`Blue Note Connoisseur Series`** | Blue Note `7243 5 40535 2 8` |
| 30967720 | — | WW | ⚠ **`File, 5×, MP3, Album, Reissue, Remastered, Stereo`** | — | Blue Note |

**④ Apple us `724760207` 的 `releaseDate` 逐字 `2002-01-01T08:00:00Z`、℗ 欄逐字 `℗ 2002 Blue Note Records`**
——Apple 上架的是 2002 年的 Connoisseur CD。
**`Jacknife` 從 1975 年起至少發行過四次（1975 2LP、2002 CD、數位再版、2025 Tone Poet LP）。(乙) 擋的正是這個。**

⚠ **派工信指名的第 1763 條快捷查法（`label-info` 並列老號段＋日版號段）本張實查沒中**——
MB 那筆 2025 release 的 `label-info` 四格逐字是 `602455845917`／`84223`／`BST 84223`／`ST-84223`，
**四格全是 Blue Note、沒有日版 `TOCJ-` 號段**。
**第 1743-B(一) 條說得對：第 1763 條是充分條件不是必要條件，沒中不代表不成立。本張是靠 Discogs 的 `series` 與 `format` 欄判成立的。**
⚠ **另外，`84223`／`BST 84223`／`ST-84223` 這三個號段是 1960 年代 Blue Note 主目錄的編號**
（slice 的 `period` 欄逐字 `1967-84` 正是這麼來的）——**它們是「這份母帶原本被指派的號」，不是 2025 年這次壓片的號。**

**→ 退。`reissuedBy` 若要記，記 `Blue Note Tone Poet Audiophile Vinyl Reissue Series`；但本卡整筆不入 `prop-a.json`。**

---

## 第 2023 條（**本線第一次遇到這個形狀，新立；請後批直接引用**）：**`DOMi & JD BECK《YOU ASKED!》2026` 退——它是 seed 已有的《WHO ASKED?》的全碟 instrumental 版**

派工信把這張列在地雷 4（並列聯名）與地雷 5（標點）裡，**沒有預期到它根本不該收。**

### （一）決定性證據：逐軌比對

MB 有兩個 RG，掛名同為 `DOMi & JD BECK`（Group `bbe3ca80`）：

| RG | 盤名逐字 | frd | 軌數 | 軌名形狀 |
|---|---|---|---:|---|
| `434e92cd-9f07-45cb-b742-090c0e4e6f42` | **`WHO ASKED?`** | **2026-07-31** | 15（其中一筆 release 16 軌，多一軌 `PUZZLE PiECES (Live from Los Angeles, CA / 2026)`） | `ÉPiPHANiE`／`HAD ENOUGH`／… |
| `05605291-fd28-4cf9-86d3-353d058f87bc`（**本批這筆**） | **`YOU ASKED!`** | **2026-08-14** | 15 | ⚠ **`ÉPiPHANiE! (instrumental)`／`HAD ENOUGH! (instrumental)`／…（15 軌逐軌都帶 `(instrumental)`）** |

**十五首曲名逐字相同、曲序逐字相同，只差一個 `!` 與 `(instrumental)` 後綴。**
（⚠ MB 的 recording MBID 兩邊不同——`240d7512` vs `7f47a231` 等等——**但那是「同一次演奏去掉人聲的另一個混音」各自建了 recording，不是兩次不同的演奏。**）

### （二）② ③ ④ 三層互相印證

- ⚠ ⚠ **③ `bluenote.com/artist/domi-jd-beck/`（200）的 Releases 欄逐字只列兩張：`WHO ASKED? - DOMi & JD BECK` 與 `NOT TiGHT - DOMi & JD BECK`。
  官網不把《YOU ASKED!》當成一張專輯。**
- ③ `https://www.bluenote.com/domi-jd-beck-announce-2nd-studio-album-who-asked/`（**200**，2026-06-23）逐字
  `their 2nd studio album WHO ASKED? on Anderson .Paak's APESHIT label in partnership with Blue Note Records`，
  並逐字說 `Featuring vocals by Domi and JD throughout`、`The band debuted **instrumental versions** of the new songs last night at the Toronto Jazz Festival`。
  **「有人聲的那張是專輯，instrumental 是另一種呈現」，官網自己講得很清楚。**
- ② **Discogs 全庫搜 `DOMi & JD BECK` ＋ `YOU ASKED!`，0 筆**（同一支腳本搜《WHO ASKED?》相關條目則有）。
- ④ Apple us `6800556902`《YOU ASKED!》15 軌 vs `6783171570`《WHO ASKED?》**16 軌**，**℗ 欄逐字完全相同**
  （`Blue Note Records; ℗ 2026 UMG Recordings, Inc. and APESHIT, Inc.`）。

### （三）⚠ ⚠ **`seed_cards.json` 已經有《WHO ASKED?》**

實掃 seed 17,248 列，逐字命中 **`["DOMi & JD BECK","WHO ASKED?",4,5,2,["jazz","soul"],2026]`**（另有《NOT TiGHT》2022）。

### （四）裁定與通則

**判：退。理由寫成一句供後批引用——**

> ⚠ ⚠ **「整張專輯的 instrumental 版不是 (甲)，也不是 (丁)，是同一張碟的另一個混音，只收一張。」**
> **(甲) 要的是「從未發行過的錄音首次以錄音發行」——instrumental 版沒有新的演奏；
> (丁) 要的是「與既有卡部分重疊、形狀不同」——本張與《WHO ASKED?》是 100% 重疊、形狀相同。**
> **這與 §6 的「淨化版／explicit 雙胞胎一律取一筆」是同一個形狀：不同版本，不是不同專輯。**

⚠ **注意兩個折鍵**：`k("WHO ASKED?") = "whoasked"`、`k("YOU ASKED!") = "youasked"`——**折鍵不同，`chk-prop` 四道全不會亮。**
**這一筆是純人工抓出來的**，靠的是「盤名長得太像 → 去 MB 拉兩邊逐軌表」。
⚠ ⚠ **給主線的建議**：`blue-note.json` 這類列舉檔若把 instrumental／deluxe／clean 版各自建成獨立 RG，
**同樣的形狀在其他批次也會出現**；**偵測訊號是「同掛名、同年、盤名折鍵高度相似、軌數相同」，目前沒有機器在看。**

---

## 第 2024 條（**派工信地雷 6 指名要覆核的那一筆；答案是「是同一張碟」**）：**`Nate Smith《Fathers》2026` 退——它就是 c-170 b 的 `FATHERS《FATHERS》2026`**

派工信寫：「`Nate Smith` 是 `黒田卓也《Rising Son》`（c-163 a）的鼓手，但那是客座不是領班；另 c-170 的觀察名單上有一張 `FATHERS《FATHERS》2026`——先確認這兩者是不是同一張碟。」
**實查：是同一張碟，而且本批這筆的掛名是 MB 建錯層級的結果。**

### （一）目錄號對上了

| 來源 | 逐字 |
|---|---|
| **② Discogs 37859667** | 歐版 **CD**、`released` 逐字 `2026-07-10`、廠牌逐字 `Blue Note`、**catno 逐字 `00199957415965`**、artists 欄逐字 **`Fathers (6)`** |
| **② Discogs 37909314** | Worldwide **藍膠 LP**、`released` 逐字 `2026-07-10`、廠牌逐字 `Blue Note`、catno 逐字 `15972`／`00199957415972`、artists 欄逐字 **`Fathers (6)`**、`style` 欄逐字 `Soul-Jazz, Smooth Jazz, Fusion` |
| ⚠ ⚠ **`batch-progress/c170/slice.json` 的 `FATHERS《FATHERS》`** | rgMbid `458ef48c-0ccb-4fb8-9d34-b8fdf0edbfe7`、`note` 逐字 `Blue Note 2026 年的 FATHERS 團，**00199957415965**。…Discogs release 37844577 genre Jazz、style Jazz-Funk` |
| **本批這筆** | MB RG `6391b52e-fa14-4a9a-88d8-0e51d9b65244`、frd 逐字 `2026-07-10`、CD 8 軌、掛名逐字 `Nate Smith` |

**`00199957415965` 兩邊逐字相同。同一天、同一個廠牌、同一個目錄號、同樣 8 軌。**

### （二）③ 官網與 ④ Apple 都指向「FATHERS 是團名、專輯是自我同名」

- ③ `https://www.bluenote.com/introducing-fathers-featuring-kenny-beats-kiefer-carrtoons-nate-smith/`（**200**，2026-06-17）逐字：
  > `Blue Note Records has announced the July 10 release of **FATHERS, the self-titled debut by a collective** of groove-savvy producer-musicians comprised of producer **Kenny Beats**, keyboardist **Kiefer**, bassist **CARRTOONS**, and drummer **Nate Smith**.`
- ③ **`bluenote.com/artist/fathers/` 回 200（3,342 字）；`bluenote.com/artist/nate-smith/` 回 404。**
- ④ Apple us `6779502137`：`collectionName` 逐字 **`FATHERS`**（全大寫）、`artistName` 逐字
  **`Nate Smith, Kiefer, CARRTOONS & Kenny Beats`**、`trackCount` 8、
  ℗ 欄逐字 **`Blue Note Records; ℗ 2026 FATHERS, under exclusive license to UMG Recordings, Inc.`**（⚠ **權利人逐字就是 `FATHERS`**）。
- 八軌逐字為〈EYE LEVEL〉〈PATCHWORK〉〈PEARL〉〈STUB〉〈THE LEAK〉〈TOMORROW, AGAIN〉〈FRONT YARD〉〈FIGURE 8〉。

### （三）處置

**判：退本批這筆，把這張碟留給 c-170 b。理由三層——**

1. **c-170 的 slice 條目才是正確的形狀**：掛名 `FATHERS`（團名）、盤名《FATHERS》（自我同名，`selfTitled` 要填 `true`）、
   rgMbid `458ef48c`（**與 Discogs 的 `00199957415965` 對得上**）、`note` 欄已經預先標了與本批的撞名。
2. **本批這筆的掛名是 MB 建錯層級**：`6391b52e` 的 `artist-credit` 逐字只有 `Nate Smith`（Person `eed37141`）、
   盤名寫成 `Fathers`（首字大寫）——**MB 把四人合作團當成其中一位團員的個人作，而且另外建了一個 RG。
   這是第 1594 條那種「同一張碟兩個 RG」的形狀。**
3. **可逆性**：退一筆 slice 條目的成本低於去改 c-170 已切好的 slice。

⚠ ⚠ **給主線的三句**：
- **c-170 b 的 `FATHERS《FATHERS》` 保留，rgMbid 用 `458ef48c`，掛名 `FATHERS`、盤名 `FATHERS`、`selfTitled: true`。**
- ⚠ **MB 的重複 RG `6391b52e`（`Nate Smith / Fathers`）建議一併記下來，避免後續批次又從列舉檔切出同一張。**
- ⚠ **`Nate Smith` 在 seed 17,248 列逐字 0 命中、在全部待上架批次 prop 亦 0 命中**——
  **他目前在本店只以客座身分出現（c-163 a `黒田卓也《Rising Son》`的鼓手、本批 a 組 `Kiefer《Memory Bomb》`的客座）。派工信這一句是對的。**
- ⚠ **另外，`Kiefer` 同時是本批 a 組的領班（《Memory Bomb》，收）與 c-170 那張的團員**——
  **兩張是不同的碟、不同的掛名、不撞卡，但下游寫作要小心別把兩邊的事實串了（第 1763-B 條）。**

---

## 第 2025 條（**派工信地雷 3**）：**主線第 1761-B 條觀察名單上的兩筆，跑完第 1791 條那套年份覆核——兩筆都是假陽性，年份全部維持 2026**

派工信指名兩筆：`Immanuel Wilkins Quartet: Live at the Village Vanguard Vol. 3` 與 `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》`，
並提醒「訊號亮不代表要改判，分辨關鍵是 Discogs 有沒有比 MB `frd` 更早的實體條目（第 1742-B 條）」。

| 筆 | 三條件 | 第 1791 條訊號 (1) 單一數位 release | (2) Discogs 該年無條目 | (3) Apple `releaseDate` 與 ℗ 年差很多年 | 判 |
|---|---|---|---|---|---|
| **Wilkins Vol. 3** | 全中（`Digital Media`／`country` **空**／`catno` 空） | ✓ | **✗** — Discogs 37352382 `released` 逐字 `2026-05-15`，與 MB frd 逐字 `2026-05-15`、Apple `2026-05-15T07:00:00Z`、③ 官網逐字 `Vol. 3 on May 15` **一致到日** | **✗** — ℗ 年逐字 **2025**、releaseDate 2026，**只差一年，且方向與第 1791 條相反**（該條是 Apple 上架晚近再版、℗ 年較晚） | **維持 2026** |
| **Ron Carter, Ricky Dillard** | 全中（同上） | ✓ | **✗** — Discogs 37296477 是**美版實體 CD**、`released` 逐字 `2026-02-06`，與 MB frd、Apple `2026-02-06T08:00:00Z`、③ 官網發稿日 `February 6, 2026` **一致到日** | **✗** — ℗ 年逐字 **2025**、releaseDate 2026，差一年 | **維持 2026** |

**兩筆的 ℗ 年都是 2025，但兩筆的解釋不同，都查得出來：**
- **Wilkins Vol. 3**：三卷同一次駐場，Vol. 1／Vol. 2 的 ℗ 年逐字是 2026、只有 Vol. 3 是 2025——
  **合理解釋是錄音／母帶年落在 2025，不是「2025 年發行過」。Discogs 全庫本盤名只有一筆、沒有任何早於 2026 的條目。**
- **Ron Carter, Ricky Dillard**：③ 官網 2025-12-05 那篇預告稿逐字
  `to be released jointly by Motown Gospel/Blue Note Records on February 6, 2026. Its timeless title track and lead single, "Sweet, Sweet Spirit" is out now.`
  ——**℗ 2025 對應的是 2025 年底就放出的先行單曲，不是整張。**

⚠ ⚠ **這兩筆同時證實了派工信說的另一件事**：**2026 年的新碟本來就很可能只有數位發行、`frd` 落在 2026 是對的。**
**第 1761-B 條那個訊號的真陽性率在本批之後從 1/5 變成 1/7。**
⚠ ⚠ **本棒再加一句給主線**：**這個訊號對「2025 年以後的碟」幾乎必然是假陽性**
——因為它偵測的是「MB 只建了數位再發、沒有實體條目」，
而**當代新碟的 MB 建檔順序本來就是數位先進、實體後補**。
**建議把篩選條件加一道「`frd` 早於 <當年 − 2>」，可以把本批這兩筆與 c-170 的兩筆全部濾掉，不會漏真陽性**
（第 1791 條的真陽性 `Tim Hagans《Audible Architecture》` 是 2014 年的 frd 對 1995 年的實體，差十九年）。

⚠ **另外兩筆也跑了同一套（雖然不在名單上）**：
- **`Kiefer《Memory Bomb》`**：`formats` 全為 `Digital Media`、`catno` 空，**但 `countries` 逐字 `["US"]`、不是 `XW` 或空**，不落在名單裡。
  **② Discogs 0 筆、④ Apple 兩個 storefront 全空——原因是碟還沒發行**（今天 2026-09-19、發行日 2026-09-25）。
  ③ 官網逐字 `available for pre-order now on Blue Note Store exclusive color vinyl, black vinyl, CD, and digital download`，**實體是存在的。**
  **年份靠 MB frd ＋ ③ 官網兩層一致判 2026；② ④ 兩層本機重查。**
- **`Meshell Ndegeocello《Synonym》`**：同形（`countries` 逐字 `["US"]`），**② Discogs 0 筆**，發行日 2026-10-02（兩週後）。
  **MB frd ＋ ③ 官網 ＋ ④ Apple 三層一致判 2026。**
- ⚠ **`DOMi & JD BECK《YOU ASKED!》` 原本也在第 1742-B 條的名單上（該條逐字點名 `c167 (a)` 那一筆）——本棒已依第 2023 條整筆退掉，年份覆核不必再做。**

**→ 本批年份改判 0 筆、覆核成立 14 筆。**

---

## 第 2026 條（**派工信地雷 4**）：**兩組並列聯名——一組退、一組判逗號式**

派工信列了兩筆，並提醒「第 1539 條的判準是取 MB `credited-name` 與 joinphrase 串接出來的那一種，不是取 `&`（第 1745-B 條更正）」。

### （一）`DOMi & JD BECK《YOU ASKED!》`——**整筆退（第 2023 條），掛名問題不必判**

⚠ 但仍記一句備查：**MB 的 `artist-credit` 是單一 Group 實體 `DOMi & JD BECK`（`bbe3ca80`），不是兩個實體串接——本來就不是第 1539 條的形狀。**
**`seed_cards.json` 已有 `DOMi & JD BECK`（《WHO ASKED?》2026、《NOT TiGHT》2022），字串逐字相同（`&` 形、`DOMi` 的小寫 `i`、`BECK` 全大寫）。**

### （二）`Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》`——**判逗號式 `Ron Carter, Ricky Dillard`**

| 來源 | 掛名欄逐字 |
|---|---|
| **MB `artist-credit`** | **`Ron Carter`（Person `57db3f59`，joinphrase 逐字 `, `）＋ `Ricky Dillard`（Person `fb1273ea`）→ 串接 `Ron Carter, Ricky Dillard`** |
| **② Discogs 37296477** | **artists 欄兩格，join 逐字 `,` → `Ron Carter, Ricky Dillard`** |
| ⚠ **④ Apple us `1852544234`** | ⚠ **`Ron Carter & Ricky Dillard`** |
| ⚠ **④ Apple jp 同 id** | ⚠ **`ロン・カーター & Ricky Dillard`（半日文半拉丁）** |
| ⚠ **③ 官網標題** | ⚠ **`JAZZ LEGEND RON CARTER & GOSPEL ICON RICKY DILLARD UNITE ON "SWEET, SWEET SPIRIT"`** |
| **slice.json** | `Ron Carter, Ricky Dillard`（與 MB 串接形相同） |

**→ 判 `Ron Carter, Ricky Dillard`。第 1539 條的原文判準指定的就是 MB `credited-name` ＋ joinphrase 串接的那一形，
本例 joinphrase 逐字是 `, `，② Discogs 也是逗號；④ 與 ③ 的 `&` 是二比二，但規則指名 MB 串接形。**
⚠ **四邊都沒有的連接符本卡沒有新造。**

⚠ ⚠ **為什麼這不算與 c-164 b 的 `Ron Carter & Danny Simmons`（`&` 形）分裂**：
**兩張各照自己發行品的 MB 串接形，而且是兩個不同的合作對象、兩種不同的編制——第 1131 條（不同編制各自成立）。**
`Ron Carter` 相關字串在本店目前有四種並存，**四種都是四種編制，不是新造分裂**：
- 裸名 `Ron Carter`（待上架 9 張：c-150 b／c-151 b／c-153 a／c-154 a／c-156 a／c-157 a／c-158 a／c-160 b／c-161 a）；
- `Red Garland / Ron Carter / Philly Joe Jones`（seed，《Crossings》1978）；
- `Jim Hall & Ron Carter`（seed，《Alone Together》1973）；
- `Ron Carter & Danny Simmons`（c-164 b，《The Brown Beatnik Tomes (Live at BRIC House)》2019）。
⚠ **派工信說「`Ron Carter` 在 seed 是 0 列（實掃過）」——本棒實掃的結果是 seed 有 2 列**（上列兩筆聯名卡，`r[0]` 欄含 `Ron Carter`）；
**裸名 `Ron Carter` 單獨一列確實是 0。** 這不是牴觸，是「含」與「等於」的差別，但寫下來免得後批誤讀。

---

## 第 2027 條（**派工信地雷 5；`chk-prop` 盲點七／第 1702 條**）：**標點與特殊字元逐字元核完，收的 14 張全部乾淨**

| 要核的 | 實況 |
|---|---|
| **`YOU ASKED!`（全大寫＋驚嘆號）／`DOMi & JD BECK`（混排大小寫）** | **整筆退（第 2023 條）。** 備查：seed 既有字串逐字是 `DOMi & JD BECK`（小寫 `i`、`BECK` 全大寫），與 MB／Apple 三邊同形。 |
| ⚠ ⚠ **`Twio Vol. 2`** | **三形**：MB RG title ＋ ④ Apple us/jp ＋ slice 逐字 `Twio Vol. 2`；② Discogs 兩筆逐字 **`Twio Vol.2`（無空格）**；③ 官網標題與內文逐字 **`Twio, Vol. 2`（帶逗號）**。**取 `Twio Vol. 2`（MB ＋ Apple 兩邊一致、slice 同形）。三形折鍵皆為 `twiovol2`，`chk-prop` 不會亮；三形都寫進 `queryAlias`。** |
| ⚠ **`Vol. 1/2/3` 的句點** | 三張逐字 `Vol. 1`／`Vol. 2`／`Vol. 3`（**點後一個半形空格**），與 MB Vol. 1／Vol. 2 的 RG title 逐字相同；③ 官網用 `, VOL. 3`（帶逗號）、② Discogs 用 `Vol. 1`（無逗號）。**取無逗號形。** |
| **`Sweet, Sweet Spirit`（逗號）** | 四邊逐字全同，逗號為 ASCII `,` ＋ 半形空格。 |
| ⚠ **`From Japan With Love`（`With` 大寫）** | MB ＋ ② Discogs ＋ ④ Apple us/jp 四邊逐字大寫 `With`；**只有 ③ 官網內文是小寫 `with`**。**四比一，取大寫。**⚠ **② Discogs 的完整 title 逐字是 `From Japan With Love = 日本民謡より愛をこめて`（帶 `=` 與日文對照題），已隔離進 `queryAlias`，未寫進 `album` 欄。** |
| ⚠ **`Scenes From Above`（`From` 大小寫）** | MB ＋ ② Discogs 五筆 ＋ ④ Apple ＋ slice 四邊逐字大寫 `From`；**只有 ③ 官網是小寫 `from`**。**四比一，取大寫。** |
| **非 ASCII 連字號** | **收的 14 張的 `artist` 與 `album` 欄逐字元掃過，`‐ ‑ ‒ – — ― －` 七種一個都沒有。** |
| **U+30FC 誤用** | 14 張的 `artist`／`album` 欄無片假名，不適用。 |
| ⚠ **軌名層的非 ASCII（不進欄位，但寫進 `risk` 供下游注意）** | `Walter Smith III《Twio Vol. 2》` 第 4 軌〈**Casual–Lee**〉MB 逐字是 **U+2013 EN DASH**；`Nduduzo Makhathini` 第 9／11 軌〈**Ḽiṅwalo ḽa Mubebi**〉含文達語 U+1E3C／U+1E45／U+1E3D；`Melissa Aldana` 三軌帶西班牙文變音；`Kiefer`／`Meshell`／`Gabrielle Cavassa` 多軌用 U+2019 彎撇號。**全部在軌名層，不影響掛名／盤名折鍵。** |

**`chk-prop` 的標點那一道（第七盲點）本批人工核完，0 處需要修正。**

---

## 第 2028 條：**掛名總表——沿用池中既有字串 8、新字串 3、聯名判逗號式 1（新造）、團名形新造 0、新造分裂 0**

### （一）沿用池中既有字串 8（全部來自待上架批次，seed 皆 0 列）
`Charles Pasi`（c-164 a／c-165 a）／`Immanuel Wilkins`（c-165 a／c-165 b／c-166 b，**本批三張，見第 2021 條**）／
`Meshell Ndegeocello`（c-166 a／c-166 b）／`Nduduzo Makhathini`（c-165 a／c-165 b／c-166 a）／
`Bill Frisell`（c-164 b／c-165 a／c-165 b／c-166 b）／`Walter Smith III`（c-166 a ×2）／
`Melissa Aldana`（c-165 b／c-166 b）／`Julian Lage`（c-165 b ×2／c-166 a）。

### （二）新字串 3（seed 17,248 列與全部待上架批次 prop 皆 0 命中，跨文字系統三形都掃過）

| 掛名 | MB 實體 | 第 307 條反查 |
|---|---|---|
| **`Gabrielle Cavassa`** | Person `7120c991`／US | 四邊一致（MB／Discogs 三筆／Apple us／③ 官網）；⚠ Apple jp 逐字 `ガブリエル・カヴァッサ`，池中 0 列、不採 |
| **`Kiefer`**（單名） | Person `a2252be6` | MB ＋ ③ 官網一致；⚠ ③ 官網逐字說明 `Keyboardist Kiefer Shackelford, whose moniker is simply Kiefer`——**藝名就是單名**；⚠ Apple jp 在 FATHERS 那張把他寫成 `キーファー`。② ④ 兩層本張無資料（未發行） |
| ⚠ ⚠ **`Minyo Crusaders`** | **Group `1b33c057`，⚠ 實體名逐字是 `民謡クルセイダーズ`、`credited-name` 逐字才是 `Minyo Crusaders`** | 見下 |

⚠ ⚠ **`Minyo Crusaders` 的 §0.5 判定（本批唯一一筆跨文字系統的掛名，逐層寫下）**：

| 層 | 逐字 |
|---|---|
| **MB artist 實體 `name`** | **`民謡クルセイダーズ`** |
| **MB `artist-credit` 的 `credited-name`** | **`Minyo Crusaders`** |
| **② Discogs 兩筆（日版 CD／LP）** | artists 欄逐字 `Minyo Crusaders`（join `=`）＋ **`anv` 欄逐字 `民謡クルセイダーズ`**；title 逐字 `From Japan With Love = 日本民謡より愛をこめて` |
| **④ Apple us `1892928459`** | **`Minyo Crusaders`** |
| ⚠ **④ Apple jp 同 id** | ⚠ **`民謡クルセイダーズ`** |
| **③ `bluenote.com` 發片稿** | **`Minyo Crusaders`**（`bluenote.com/artist/minyo-crusaders/` 回 **200**，見第 2033 條） |
| **池中** | **兩形皆 0 列**（seed 掃 `Minyo`／`民謡`／`クルセイダーズ` 三形，全部 0） |

**→ 判拉丁形 `Minyo Crusaders`。理由三層：**
1. **§0.5 的判準是「看該藝人的正式發行品掛名，不是看國籍」，而該節同時寫明「官方藝名本身就是拉丁字者保留」**
   ——該團的國際發行（Mais Um Discos 2019《Echoes of Japan》、2023《Tour of Japan》、本張 Blue Note）掛名一律拉丁形，
   ④ Apple us 對他們四張碟的 `artistName` 逐字都是 `Minyo Crusaders`。
2. **MB 的 `credited-name` ＋ ② Discogs 標題列 ＋ ④ Apple us ＋ ③ 官網，四邊拉丁形。日文形只出現在 MB 的實體名、Discogs 的 `anv` 欄與 Apple jp。**
3. **池中兩形皆 0 列，沒有既有體例要沿用——第 307 條不適用，取四邊多數形。**
⚠ **日文形已寫進 `queryAlias`**：**第 1753-B 條的形狀（Apple jp 用日文掛名，用拉丁名在 jp storefront 搜不到），
但本張 us 與 jp 的 `collectionId` 同為 `1892928459`，本機直接 lookup 即可。**

### （三）聯名新造 1：**`Ron Carter, Ricky Dillard`（逗號式）**——見第 2026 條（二）。

### （四）團名形新造 0。**`Immanuel Wilkins Quartet` 四邊有三邊給（MB Vol. 1／Discogs 六筆／官網系列名），本棒仍不建——見第 2021 條（二）。**

### （五）新造分裂 0。`chk-prop` 的「同 rgMbid 不同掛名 0」「跨批撞卡 0」兩道全過。

---

## 第 2029 條（**派工信地雷 7；第 1743-B 條：slice 的 `note` 與欄位是切片器的推測，一律自己覆核**）：**推翻四處**

| # | slice 欄位逐字 | 實況 | 影響 |
|---|---|---|---|
| 1 | `Jackie McLean《Jacknife》` 的 `note` 逐字 `RG 首發 2025，但目錄號屬 1967-84 期（庫存／日本首發或 **MB 年份有誤**）` | **不是 MB 年份有誤。** MB 的 2025-08-01 是對的（③ 官網 Tone Poet 2025 年程表逐字 `August 1, 2025`），**那些老號段是母帶原本被指派的號**。**真正的問題是這張碟本來就在池子裡（第 2022 條）。** | 退 |
| 2 | `Immanuel Wilkins Quartet: Live at the Village Vanguard Vol. 3` 的 `album` 欄 | **前綴是系列名，不是盤名的一部分**（第 2021 條（三））。 | 改盤名 |
| 3 | `Nate Smith《Fathers》` 的 `artist`／`album` 欄 | **掛名應是團名 `FATHERS`、盤名《FATHERS》、自我同名**（第 2024 條）。 | 退 |
| 4 | `Immanuel Wilkins《Live at the Village Vanguard Vol. 2》` 的 `live` 欄逐字 `false`、`note` 欄逐字空 | **Vol. 2 也是現場盤**（③ 官網逐字 `a searing 3-volume document of his acclaimed quartet in action`）。⚠ 成因是 **MB 的 `secondary-types` 三卷不一致**：Vol. 1 空陣列＋`tags` 只有 `live`、Vol. 2 **空陣列**、Vol. 3 `["Live"]`。 | 不影響收退，寫進 `risk` |

⚠ **另外一處不是推翻、但值得記**：`Bill Frisell《In My Dreams》` 的 slice `live` 欄逐字 `true`、MB `secondary-types` 逐字 `["Live"]`，
**但實查是「多數軌現場＋錄音室軌＋事後補錄」的混合盤**——② Discogs 36628024 的 notes 欄逐字把每一軌的地點拆開寫
（`Firehouse 12, New Haven` 錄音室／`Roulette Intermedium, Brooklyn` 現場／`The Newman Center, Denver` 現場／`Opus Studios, Berkeley` 補錄）。
**已逐字寫進該卡 `risk`：下游不可寫成「現場專輯」也不可寫成「錄音室專輯」。**

⚠ **一處資料誤植（第 1674 條的取用順序派上用場）**：`Charles Pasi《Adamas》` 的 CD，
**MB release `da4ebc58` 的 catno 逐字 `6575646`、② Discogs 35500924 逐字 `6572646`，差一位數字**；
**兩邊 barcode 逐字都是 `602465726466`，故以 barcode 為準、catno 取 Discogs 的 `6572646`。**

---

## 第 2030 條：**三道前置閘結算——(乙) 退 1、(戊) 退 1（同一張）、(丙) 訊號亮 4 次全部不成立**

### （一）(乙)／(戊)：**退 1 張**（`Jackie McLean《Jacknife》`，兩條同時成立，見第 2022 條）。
**其餘 16 筆的 slice `reissueSeries` 欄逐字全是空陣列，② Discogs 的 `series` 欄逐字全是空陣列、`format` 欄逐字零個 `Reissue`。**
**四條再發系列（Blue Note 75／80、Tone Poet、Classic Vinyl、Blue Note Review）本批只出現 Tone Poet 一次，就是那一張。**

### （二）(丙) imprint 前置閘：**訊號亮 4 次，逐筆查完全部不成立；4 次是 3 種不同的假陽性**

| 卡 | 不乾淨的訊號（逐字） | 掃整條鏈後的證據（第 1794／1919 條） | 判 |
|---|---|---|---|
| **`Charles Pasi《Adamas》`** | ② Discogs companies 的 **℗© 兩格逐字都是 `Decca Records France`**、record company 逐字 `Universal Music France`、另有 `Copyright (c): Blues Notes Records` | **兩筆零售條目的 `labels` 欄第一格逐字都是 `Blue Note`**；④ Apple ℗ 欄逐字 **`A Blue Note Records Release; ℗ 2025 Decca Records France`** | **過** |
| **`Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》`** | MB `label-info` 第二格逐字 **`Motown Gospel`**（`91dc7f68`）；④ Apple ℗ 逐字 `A Motown Gospel & Blue Note Records Release; **℗ 2025 Capitol CMG, Inc.**` | MB `label-info` **第一格**逐字 `Blue Note`／`713c4a95`；② Discogs 37296477 廠牌欄第一格逐字 `Blue Note`；③ 官網逐字 `released jointly by Motown Gospel/Blue Note Records` | **過** |
| **`Bill Frisell《In My Dreams》`** | **MB 的 US 數位 release `7ddcadbf` 的 `label-info` 逐字是 `UMG Recordings, Inc.`／`ee9d7dfa`，不是 Blue Note** | MB 另一筆 XE 實體 CD `878a5daf` 逐字 `Blue Note`／`713c4a95`；② Discogs 五筆廠牌欄逐字全是 `Blue Note`；Discogs notes 末段逐字 `Blue Note Records; ℗© 2026 UMG Recordings, Inc.` | **過** |
| **`Walter Smith III《Twio Vol. 2》`** | **同上一形**：MB 的 US 數位 release `18c36811` 的 `label-info` 逐字 `UMG Recordings, Inc.`／`ee9d7dfa` | MB 另一筆 US 實體 CD `3e5b3855` 逐字 `Blue Note`／`713c4a95`；② Discogs 兩筆廠牌欄逐字都是 `Blue Note` | **過** |

⚠ ⚠ **第三／第四筆是同一個新形狀，值得記給後批**：
**MB 對 2026 年的 Blue Note 新碟，常常把「數位那一筆」的 `label-info` 掛成 `UMG Recordings, Inc.`（`ee9d7dfa`）、只有實體那一筆掛 `Blue Note`（`713c4a95`）。**
**若某張碟在 MB 只有數位那一筆（本批的 Wilkins Vol. 2／Vol. 3、Minyo、Nduduzo、Cavassa、Kiefer、Meshell 都是單一數位 release），
剛好又抽到 `ee9d7dfa` 那種建檔，就會憑空長出一個 (丙) 訊號。**
**本批這兩筆的 MB 都剛好有兩筆 release 可以互相對照才看得出來；後批若只有一筆，一定要去 ② Discogs 與 ③ 官網補。**

⚠ **`Nihon Blue Note`（`76903afe`）本批 0 筆**（第 1817 條）。
⚠ **日本線的兩張**（`Minyo Crusaders` 的 UCJJ-2257／UCJJ-9059、`Julian Lage` 的 UCCQ-1228）
**MB `label-info` 逐字都是 `Blue Note`／`713c4a95`，不是日本分支。**
⚠ **歐洲公版再發廠（`EJC`／`AJC`／`WaxTime`／`Jazz Wax Records`／`Blue Moon`）本批 0 筆。**

### （三）(丁)：**0 筆判 (丁)**。兩處檢查過、都不成立：
- `Walter Smith III《Twio Vol. 2》` vs 2018 年的《Twio》：**同一個企劃概念的兩次不同錄音，編制與曲目完全不同，零軌重疊**（第 1759-B／1762-B 條：(丁) 判的是錄音重疊）。
  ⚠ **前作《Twio》(2018, Whirlwind) 不在 Blue Note 目錄、不在池中**（seed 盤名含 `twio` 者 0 命中）。
- `Meshell Ndegeocello《Synonym》` 的三首先行單曲：**那是本張自己的先行單曲，不是與別張卡的錄音重疊。**

### （四）(己)：**0 筆**。收的 14 張載體全是 LP／CD／數位音檔。

### （五）(甲)：**收的 14 張全部是 (甲)**（2025–2026 年的新錄音首次發行）。

---

## 第 2031 條：**曲風——8 張 `['jazz']`、6 張兩值；⚠ 本批有一張的 MB `genres` 欄塞了七個值，一個都沒跟**

| 卡 | 判 | 依據 |
|---|---|---|
| `Charles Pasi《Adamas》` | **`['jazz','blues']`** | ② Discogs CD 條目 `genre` 逐字 `Jazz, Blues`；**照 c-165 a《Zebra》的既有裁定（第 307 條）** |
| `Gabrielle Cavassa《Diavola》` | `['jazz']` | MB `genres` 逐字 `["jazz"]`；④ Apple 逐字 `Jazz`；⚠ Discogs `style` 逐字 `Easy Listening`，**第 1572 條不跟** |
| `Immanuel Wilkins` ×3 | `['jazz']` | ⚠ **MB 三卷的 `genres` 與 `tags` 幾乎全空**（Vol. 1 的 `tags` 逐字只有 `["live"]`——**這正是列舉檔把 Vol. 1 判成「待判曲風」、一度漏切的原因**）。**依 ② Discogs `genre` 逐字 `Jazz`、④ Apple 逐字 `Jazz` 判**；`Contemporary Jazz`／`Free Jazz` 依第 1572 條不跟 |
| **`Kiefer《Memory Bomb》`** | ⚠ **`['jazz','hiphop']`** | **MB 兩欄全空、② ④ 兩層無資料（未發行）。逐字依據是 ③ 官網那句 `has re-defined that happy place between jazz improvisation and hip-hop beat-making`。**`hiphop` 是白名單十類之一，不是細分詞 |
| `Meshell Ndegeocello《Synonym》` | `['jazz','soul']` | ④ Apple 逐字 `R&B/Soul`；**照 c-166 a／c-166 b 兩張既有裁定（第 307 條）** |
| `Minyo Crusaders《From Japan With Love》` | **`['jazz','world']`** | ② Discogs 逐字 `Jazz, Latin, Funk / Soul, Folk, World, & Country`；④ Apple 逐字 `Worldwide`（jp `ワールド`）。**`Latin` 不在白名單十類；`Funk / Soul` 只有 Discogs 一層支持，不跟；`Min'yō`／`Cumbia` 依第 1572 條不跟** |
| `Nduduzo Makhathini《The Myth We Choose》` | `['jazz','world']` | **照 c-165 a／c-165 b／c-166 a 三張既有裁定（第 307 條）**；`Contemporary Jazz` 不跟 |
| `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` | **`['jazz','soul']`** | ② Discogs 逐字 `Jazz, Funk / Soul`、`style` 逐字 `Gospel, Fusion`；④ Apple 逐字 `Gospel`（jp `ゴスペル`）。**白名單十類沒有 gospel，最近的對應是 `soul`**（Discogs 的 `Funk / Soul` 大類直接支持）；`Gospel`／`Fusion` 依第 1572 條不跟 |
| `Bill Frisell《In My Dreams》` | `['jazz']` | ⚠ ② Discogs 五筆逐字 `Jazz, Folk, World, & Country`——**`Folk, World, & Country` 是 Discogs 對 Americana 曲目的粗分，③ 官網逐字只說 `Jazz and Americana staples`，不跟**；**照 c-164 b／c-165 a／c-165 b／c-166 b 四張既有裁定（第 307 條）** |
| `Walter Smith III《Twio Vol. 2》` | `['jazz']` | 四邊一致；`Contemporary Jazz`／`Post Bop` 不跟 |
| `Melissa Aldana《Filin》` | `['jazz']` | MB `genres` 逐字 `["jazz"]`；⚠ Discogs 的 `style` 欄**自己打架**（`Cool Jazz` vs `Latin Jazz`），**兩個都不跟**。⚠ **本張曲目全是古巴 filin，`world` 是可以考慮的第二值，本棒不加**——③ 官網定位逐字 `a stunning ballads album`，編制與語彙都是爵士，**且 c-165 b／c-166 b 兩張 Aldana 卡都是單值，加第二值會造成同一位藝人三張卡的曲風分裂（第 307 條）** |
| ⚠ ⚠ `Julian Lage《Scenes From Above》` | `['jazz']` | ⚠ **本批唯一 MB `genres` 欄不空的一筆，而且塞了七個值**：逐字 `["contemporary folk","contemporary jazz","instrumental jazz","jazz","jazz fusion","post-bop","soul jazz"]`，`tags` 再加 `chamber jazz`／`hammond b3`／`organ`。**除 `jazz` 外全部是細分詞或樂器名，依第 1572 條一個都不跟**；Discogs 的 `Blues` 只出現在三筆、③ 官網通篇無藍調敘述，不跟 |

**統計（14 張）**：`['jazz']` **8 張**（Cavassa、Wilkins ×3、Frisell、Walter Smith III、Aldana、Lage）／
`['jazz','world']` **2 張**（Minyo、Nduduzo）／`['jazz','soul']` **2 張**（Meshell、Ron Carter）／
`['jazz','blues']` **1 張**（Pasi）／`['jazz','hiphop']` **1 張**（Kiefer）。8＋2＋2＋1＋1 ＝ 14 ✓

⚠ **依第 1572 條不跟的細分詞與非白名單大類，本批共 16 種**：
`contemporary jazz`／`free jazz`／`post-bop`／`jazz fusion`／`instrumental jazz`／`soul jazz`／`chamber jazz`／
`contemporary folk`／`cool jazz`／`latin jazz`／`easy listening`／`Min'yō`／`Cumbia`／`Gospel`／`Fusion`／`Smooth Jazz`；
另有三個非白名單的 Discogs 大類也沒跟：`Latin`（Minyo）／`Folk, World, & Country`（Frisell、Minyo）／`Blues`（Lage，只有三筆 Discogs 支持、③ 官網無藍調敘述）。
⚠ **`contemporary jazz` 是本批出現最多次的一個（Wilkins 三張、Nduduzo、Walter Smith III、Frisell、Lage 共 7 次），一次都沒跟。**

---

## 第 2032 條：**撞陳列——逐字撞 0 處，但詞元層有 7 處，其中 2 處涉及 apex；全部靠人工掃出**

### （一）盤名逐字撞 `seed_cards.json`：**收的 14 張全部 0 命中**（實掃 17,248 列，折鍵 `k(盤名)` 全等比對）。
**待上架批次 prop 的盤名逐字撞：0 命中。**

### （二）⚠ ⚠ **詞元包含 7 處（`chk-prop` 第四／第五道都不亮）**

| 本批的卡 | 撞的是 | 處置 |
|---|---|---|
| **`Live at the Village Vanguard Vol. 1/2/3`（三張）** | ⚠ ⚠ **`John Coltrane —《"Live" at the Village Vanguard》(1962)` apex `hall`**、⚠ **`Bill Evans Trio —《Sunday at the Village Vanguard》(1961)` apex `hall`**、`Elvin Jones —《Live at the Village Vanguard》(1974)`、`Thad Jones & Mel Lewis —《Live at the Village Vanguard》(1967)`、`Sonny Rollins —《A Night at the Village Vanguard》(1957)`、`Dexter Gordon —《Homecoming: Live at the Village Vanguard》(1977)`、`The Great Jazz Trio —《At the Village Vanguard》(1978)`——**seed 共 7 張** | **三張的 `risk` 都逐字寫了「下游引用這個盤名一律必須帶掛名，並且必須寫出 `Vol. N`」** |
| `From Japan With Love` | `Zomby —《With Love》(2013)`／`Fatback —《With Love》(1983)` | 折鍵子字串巧合，非同名同碟；已寫進 `risk` |
| `Sweet, Sweet Spirit` | `Earth, Wind & Fire —《Spirit》(1976)` | 同上 |
| `In My Dreams` | `Gabor Szabo —《Dreams》(1968)`／`Steve Lacy —《Dreams》(1975)` | 同上 |
| `Adamas` | `戸谷重子 with 今田勝トリオ —《Toya, Shigeko with The Imada, Masaru Trio》(1972)` | 折鍵子字串巧合 |

⚠ ⚠ **`Live at the Village Vanguard` 是第 1744-B 條記載「本線最常撞的一個盤名」（已四批四次撞 Coltrane 的 apex `hall`）。
本批三張是第五、六、七次——但這三次 `chk-prop` 的第五道一次都沒亮，因為那一道比的是 apex 盤名的逐字折鍵，
而 `Vol. N` 的副標讓折鍵不同鍵。** **→ 第 1762-B(三) 條的缺口在本批再次應驗：「盤名撞一般卡」與「盤名詞元撞 apex」兩件事都沒有機器在看。**

### （三）⚠ **同批軌名撞 1 處（機器完全抓不到，人工掃出）**
**`Bill Frisell《In My Dreams》` 第 4 軌〈Isfahan〉 ↔ `Walter Smith III《Twio Vol. 2》` 第 9 軌〈Isfahan〉**
——同一首 Strayhorn／Ellington 曲目、**同批 b 組兩張卡、兩次不同演奏**。
**這是第 1763-B 條那種「同批形狀高度相似、中間欄會被串」的形狀，兩張的 `risk` 都寫了。**
⚠ **另外，`Ron Carter` 同時是 b 組《Sweet, Sweet Spirit》的共同掛名與《Twio Vol. 2》的客座（五軌），
`Nate Smith`／`CARRTOONS` 同時出現在 a 組《Memory Bomb》的客座名單與 c-170《FATHERS》的團員名單**——**下游寫作都要小心。**

### （四）⚠ **翻唱／老曲目的撞陳列（三張，已逐張寫進 `risk`）**
- `Meshell Ndegeocello《Synonym》`：**十五軌全部是知名翻唱**（〈Islands in the Stream〉〈I Got You Babe〉〈Guilty〉〈Hunger Strike〉…），原版藝人多半在池中有卡。
- `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》`：**十軌全是公有領域的老詩歌**（〈Just a Closer Walk With Thee〉〈In the Garden〉…）。
- `Gabrielle Cavassa《Diavola》`：〈Raindrops Keep Falling On My Head〉〈Could It Be Magic〉是流行正典翻唱。
**三張都照第 1903 條的處理：同一首曲子被彈了兩次不是 (丁)，但敘述必須分得開。**

---

## 第 2033 條：**③ 廠牌官網四條路徑的實際回應碼（逐藝人，實測不是預期）**

### （一）路徑 1 **WP 搜尋 API**（`https://www.bluenote.com/wp-json/wp/v2/search?search=<關鍵字>&per_page=10`）
**16 個關鍵字全部回 200；命中筆數如下。**

| 關鍵字 | 回應 | 筆數 | 有無專輯專屬發片稿 |
|---|---:|---:|---|
| `Jacknife Jackie McLean` | 200 | 1 | **無專屬稿，但撈到決定性的 `tone-poet-society-and-2025-line-up`（見第 2022 條）** |
| ⚠ ⚠ **`Charles Pasi Adamas`** | **200** | **0** | ⚠ ⚠ **本批唯一 0 命中的關鍵字** |
| `DOMi JD BECK YOU ASKED` | 200 | 2 | **兩筆都是《WHO ASKED?》的稿，無《YOU ASKED!》專屬稿（見第 2023 條）** |
| `Gabrielle Cavassa Diavola` | 200 | 3 | **有**（`gabrielle-cavassa-makes-her-blue-note-debut-with-diavola`） |
| `Immanuel Wilkins Village Vanguard` | 200 | 6 | **有，三卷各一篇**（`announcing-…`／`…-vol-2`／`…-vol-3`） |
| `Kiefer Memory Bomb` | 200 | 3 | **有**（`kiefer-announces-blue-note-debut-memory-bomb`） |
| `Meshell Ndegeocello Synonym` | 200 | 4 | **有**（`meshell-ndegeocello-announces-new-album-synonym`） |
| `Minyo Crusaders` | 200 | 1 | **有**（`minyo-crusaders-announce-new-album-from-japan-with-love`） |
| `Nate Smith Fathers` | 200 | 2 | **有，但稿名逐字是 `INTRODUCING FATHERS…`（第 2024 條的關鍵證據）** |
| `Nduduzo Makhathini Myth We Choose` | 200 | 4 | **有** |
| `Ron Carter Ricky Dillard Sweet Sweet Spirit` | 200 | 2 | **有兩篇**（2025-12-05 預告稿＋2026-02-06 發片稿，內文幾乎逐字相同，**下游不要當成兩件事**） |
| `Bill Frisell In My Dreams` | 200 | 4 | **有**（另兩筆是無關的舊稿，WP 搜尋會夾雜） |
| `Walter Smith Twio` | 200 | 3 | **有** |
| `Melissa Aldana Filin` | 200 | 2 | **有** |
| `Julian Lage Scenes From Above` | 200 | 3 | **有** |

⚠ ⚠ **派工信說「2026 年的新碟，官網新聞稿很可能是唯一有內容的一層」——實測完全成立**：
**`Kiefer《Memory Bomb》`（② ④ 兩層全空）與 `Meshell Ndegeocello《Synonym》`（② 空）這兩張，③ 是唯一有實質內容的來源。**
**本批 14 張收錄卡裡有 13 張各拿到一篇專輯專屬發片稿，密度與第 1752-B 條記的上一批（14 張）一致。**

### （二）路徑 2 **`/artist/<藝人>/`**（**裸名形與團名形都試**）

| 路徑 | 回應 | 正文字數 |
|---|---:|---:|
| `/artist/jackie-mclean/` | **200** | 7,291 |
| ⚠ **`/artist/charles-pasi/`** | **404** | 0 |
| `/artist/domi-jd-beck/` | **200** | 5,743 |
| `/artist/gabrielle-cavassa/` | **200** | 4,707 |
| **`/artist/immanuel-wilkins/`** | **200** | 10,251 |
| ⚠ ⚠ **`/artist/immanuel-wilkins-quartet/`** | **404** | 0 |
| `/artist/kiefer/` | **200** | 4,657 |
| `/artist/meshell-ndegeocello/` | **200** | 7,906 |
| ⚠ **`/artist/minyo-crusaders/`** | **200** | ⚠ **1,304（近乎空殼頁——第 1752-B 條記載的「200 但正文極短」形狀）** |
| ⚠ ⚠ **`/artist/nate-smith/`** | **404** | 0 |
| ⚠ ⚠ **`/artist/fathers/`** | **200** | **3,342（團名形有頁、個人形 404——第 2024 條的佐證）** |
| `/artist/nduduzo-makhathini/` | **200** | 12,779 |
| `/artist/ron-carter/` | **200** | 6,089 |
| ⚠ **`/artist/ricky-dillard/`** | **404** | 0 |
| `/artist/bill-frisell/` | **200** | 11,884 |
| `/artist/walter-smith-iii/` | **200** | 7,437 |
| `/artist/melissa-aldana/` | **200** | 7,404 |
| **`/artist/julian-lage/`** | **200** | **13,554（本批最長）** |

**18 個路徑：200 的 14 個、404 的 4 個**（`charles-pasi`／`immanuel-wilkins-quartet`／`nate-smith`／`ricky-dillard`）。
⚠ **本批沒有遇到 301 重導向，也沒有遇到「藝人頁 404 但新聞稿有」以外的第四種**——
**但 `nate-smith` 正是那一種（藝人頁 404、專屬稿有），而且那一篇稿就是判本張退的關鍵。**
⚠ ⚠ **「兩形都試」（第 1747-B／1752-B 條）在本批兩次派上用場，而且兩次結論相反**：
`immanuel-wilkins`（200）／`immanuel-wilkins-quartet`（404）→ **支持裸名**；
`nate-smith`（404）／`fathers`（200）→ **支持團名**。**同一條規則、同一批碟、兩個相反的答案——這是「兩形都試」最好的一組對照案。**

### （三）路徑 3 `?s=` 站內搜尋：**本批未使用**（路徑 1 全部 200、只有一個關鍵字 0 命中，備援不必動）。

### （四）路徑 4 日本線 `universal-music.co.jp`：**本批未試，但有兩張值得本機補試**
**`Minyo Crusaders`（日版 UCJJ-2257／UCJJ-9059）與 `Julian Lage`（日版 SHM-CD UCCQ-1228）**
——**兩種 slug 順序都要試（第 1751-B 條）。**

### （五）① 紙本：**整層跳過，0 次查詢，不是缺失**
**第 1728 條逐字：Billboard OCR 只覆蓋到 2015，本批 17 筆全部是 2025–2026 的碟。**

---

## 第 2034 條：**本信與正本或既有裁定牴觸之處——共 4 處，全部照正本做**

1. ⚠ ⚠ **派工信地雷 2 把 `Jacknife` 只當成 (乙)／(戊) 的題目，沒有提到它已經在池子裡。**
   **正本（§1 身分確認與去重先行、第 1746-C 條的複合折鍵）壓過派工信的框架：複合折鍵撞 seed ＋ 撞 c-144 a prop，
   這比 (乙)／(戊) 更前面。** 三個理由各自獨立成立，見第 2022 條。
2. ⚠ ⚠ **派工信說「`Ron Carter` 在 seed 是 0 列（實掃過）」。本棒實掃 seed 17,248 列，`r[0]` 欄含 `Ron Carter` 的有 2 列**
   （`Red Garland / Ron Carter / Philly Joe Jones —《Crossings》(1978)`、`Jim Hall & Ron Carter —《Alone Together》(1973)`）。
   **裸名單獨一列確實是 0，所以派工信不算說錯，但那句話寫成「0 列」會讓後批以為 Ron Carter 完全不在 seed。
   依第 1738-B 條，派工信不得斷言池中有什麼——這句是同一個毛病的較輕版本。**
3. ⚠ **派工信預測「地雷 1 那三張很可能會亮 `· 盤名撞 apex`」——實測不亮，0 處**（第 2020 條）。
   **這與第 1762-B(三) 條記的 `Belonging` 那次同形：派工信的預測錯，而且錯的方向一樣（以為機器會抓到，實際上是缺口）。**
4. ⚠ **派工信沒有預期到 a 組的 `DOMi & JD BECK《YOU ASKED!》` 與 b 組的 `Nate Smith《Fathers》` 兩筆要退**，
   分別是本線第一次遇到的 instrumental 版形狀（第 2023 條）與 MB 掛名層級建錯（第 2024 條）。
   **兩筆都不是派工信的錯（slice 的欄位看不出來），但寫下來供第 1743-B 條的「slice 的 `note` 是推測不是查證」再加兩個實例。**

⚠ **另有一處不是牴觸、是派工信自己標明「預期」而本棒實測的**：
**「第 1761-B 條那個訊號目前的真陽性率是 1/5」→ 本批兩筆都是假陽性，更新為 1/7**（第 2025 條）。

---

## 第 2035 條：**給本機與主線的清單**

### （一）本機接手時必做（逐卡已寫進 `risk`，這裡彙總）

| 項 | 卡 | 要做的事 |
|---|---|---|
| **② ④ 兩層重查** | **`Kiefer《Memory Bomb》`** | 發行日 2026-09-25（本棒交件時尚未發行），**② Discogs 0 筆、④ Apple 兩個 storefront 全空**。上架前必須補 Discogs 廠牌鏈（imprint 前置閘只掃過 MB ＋ ③ 兩層）與 Apple `collectionId`／軌數。 |
| **② 重查** | **`Meshell Ndegeocello《Synonym》`** | 發行日 2026-10-02，**② Discogs 0 筆**。 |
| **軌數釘定（兩種以上）** | **`Julian Lage《Scenes From Above》`** | **國際版 9 軌、日版 SHM-CD `UCCQ-1228` 10 軌。本卡釘 9 軌，配試聽與封面不可取日版。** |
| **軌數待確認** | `Immanuel Wilkins《Live at the Village Vanguard Vol. 1》` | **數位是 4 軌，但實體 CD `00602488170826` 與 2LP `00602488170871` 的軌數本棒未取得——可能是三卷合計 13 軌。不可預設。** |
| **軌數待確認** | `Minyo Crusaders` / `Nduduzo Makhathini` | 日版 CD／2LP 的逐軌表未取得（數位分別是 8 軌／16 軌，後者含四首 reprise，黑膠有可能刪減）。 |
| ⚠ ⚠ **同軌數雙胞胎** | **`Immanuel Wilkins` Vol. 1 與 Vol. 3 同為 4 軌** | **必須用 `collectionId` 區分：Vol. 1 `1872550960`／Vol. 3 `1895320634`。** |
| ⚠ ⚠ **Apple 盤名不同形** | **`Immanuel Wilkins` 三張** | **Apple `collectionName` 帶 `Immanuel Wilkins Quartet: ` 前綴與 `(Live)` 後綴，用卡單盤名搜尋會落空（第 1753-B 條的形狀）。三個 `collectionId` 已釘定。** |
| ⚠ **Apple 盤名不同形** | **`Julian Lage《Scenes From Above》`** | **Apple `collectionName` 逐字 `Scenes From Above (feat. John Medeski, Jorge Roeder & Kenny Wollesen)`，用裸盤名搜尋會落空。`collectionId` `1849593147`。** |
| ⚠ **Apple 掛名不同形** | **`Minyo Crusaders`** | **Apple jp 的 `artistName` 逐字 `民謡クルセイダーズ`；us 與 jp 同 id `1892928459`。** |
| ⚠ ⚠ **先行單曲雙胞胎 5 張** | `Meshell《Synonym》`（15 軌／3 首先行單曲）、`Nduduzo《The Myth We Choose》`（16／3）、`Bill Frisell《In My Dreams》`（12／1）、`Walter Smith III《Twio Vol. 2》`（10／3）、`Melissa Aldana《Filin》`（8／2） | **探測鏈可能配到 1 軌的單曲條目，五張的 `collectionId` ＋ `trackCount` 都已寫進 `risk`。** |
| **日本線 ③ 路徑 4** | `Minyo Crusaders`／`Julian Lage` | **`universal-music.co.jp` 兩種 slug 順序都要試（第 1751-B 條）。** |
| **目錄號誤植** | `Charles Pasi《Adamas》` CD | **MB catno 逐字 `6575646`、Discogs 逐字 `6572646`，取 Discogs（兩邊 barcode 一致，第 1674 條）。** |
| **MB `status` 為 null** | `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` | **MB release `11e9aa23` 的 `status` 欄逐字是 `null`、不是 `Official`。身分無疑義（Discogs 實體 CD ＋ Apple 都在架上），但建檔有瑕疵。** |
| **混合現場盤的敘述** | `Bill Frisell《In My Dreams》` | **不可寫成「現場專輯」也不可寫成「錄音室專輯」；Discogs notes 的逐軌地點已寫進 `risk`。** |

### （二）給主線的四件事

1. ⚠ ⚠ **c-170 b 的 `FATHERS《FATHERS》` 保留，rgMbid 用 `458ef48c`、掛名 `FATHERS`、盤名《FATHERS》、`selfTitled: true`；
   本批的 `Nate Smith《Fathers》`（MB RG `6391b52e`）是同一張碟的重複 RG，已退。**（第 2024 條）
2. ⚠ ⚠ **第 1761-B 條那個偵測條件建議加一道「`frd` 早於 <當年 − 2>」**——
   本批兩筆、c-170 兩筆都是 2024–2026 的新碟，**當代新碟在 MB 本來就是數位先進、實體後補，訊號對它們幾乎必然是假陽性。**（第 2025 條）
3. ⚠ ⚠ **新形狀：整張專輯的 instrumental 版（第 2023 條）。** 偵測訊號是「同掛名、同年、盤名折鍵高度相似、軌數相同」，
   **目前沒有機器在看，而且兩個折鍵不同（`whoasked` vs `youasked`），`chk-prop` 四道全不亮。**
   **若 `blue-note.json` 這類列舉檔把 instrumental／deluxe／clean 版各自建成獨立 RG，同樣的形狀在其他批次也會出現。**
4. ⚠ **MB 對 2026 年 Blue Note 新碟的建檔慣例（第 2030 條（二））**：
   **數位那一筆的 `label-info` 常掛 `UMG Recordings, Inc.`（`ee9d7dfa`）、只有實體那一筆掛 `Blue Note`（`713c4a95`）。**
   **單一數位 release 的碟若剛好抽到那種建檔，會憑空長出一個 (丙) 訊號——後批要去 ② 與 ③ 補。**
