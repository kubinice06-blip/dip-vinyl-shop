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

---

# c-167 研究層裁定（14 張一支代理做完，a 7／b 7）

號段 **2441–2490**（實際用到 2455）。日期 2026-09-19。
暫存檔一律 `c167r-` 前綴（`c167r-fetch-bn.mjs`／`c167r-fetch-mb.mjs`／`c167r-fetch-artist.mjs`／
`c167r-fetch-dg2.mjs`／`c167r-fetch-jp.mjs`／`c167r-fetch-misc.mjs`／`c167r-selfcheck.mjs`／`c167r-charcheck.mjs`），
未使用任何通用檔名。**本層 append 進本檔，未覆寫任何既有行（第 1806-B 條）。**

---

## 第 2441 條（**解掉第 2035 條留下的未決項**）：**Wilkins Vol. 1 的實體只收 Vol. 1 自己的四軌，不是三卷合計 13 軌**

第 2035 條逐字寫「Vol. 1 的實體 CD `00602488170826` 與 2LP `00602488170871` 的軌數本棒未取得——**可能是三卷合計 13 軌。不可預設**」。
**實查兩筆 Discogs 條目的逐軌表，答案是四軌：**

| Discogs id | 載體 | 逐軌表 |
|---|---|---|
| **36858649** | CD（gatefold digisleeve ＋雙面內襯） | `1 Warriors` `2 Composition II` `3 Charanam` `4 Eternal` |
| **37337043** | 2LP（綠色透明限量） | `A Warriors` `B Composition II` `C Charanam` `D Eternal`（**一面一軌**） |

**→ 本機配封面與試聽時可以直接用四軌，不必再確認。** 2LP 是一面一軌，所以四軌要兩張黑膠。

---

## 第 2442 條：**三卷的錄音日期是 2025 年 5 月 15 與 16 日兩晚；Vol. 3 的發行日撞上第一個錄音夜的整整一年**

錄音日期**只在 Discogs 兩筆實體條目的 notes 欄出現**，逐字 `Recorded at the Village Vanguard, New York, NY on May 15 & 16, 2025`；
**MB 與 Apple 兩層都沒有這個資訊，官網三篇稿也沒寫。**

- **Vol. 3 的發行日是 2026-05-15，正好是第一個錄音夜（2025-05-15）的一週年。** 這是巧合還是安排本棒查不到，
  **facts 只寫「正好是整整一年後」這個可查證的事實，沒有寫成廠牌刻意安排。**
- ⚠ **本棒未能取得「哪一卷來自哪一晚」的分卷對照**——三篇官網稿與兩筆實體條目都只給兩晚的合併日期。
  **下游不可寫「Vol. 1 是第一晚、Vol. 2 是第二晚」這種推測。** 派工信要求「三張的 facts 要能讓下游把
  『這一卷是哪幾晚、哪一套曲目』講清楚」——**「哪一套曲目」三卷各自寫足了，「哪幾晚」只能寫到「兩晚合錄」這一層，
  再細的分卷對照沒有來源。**

---

## 第 2443 條（**來源打架，判 3:1**）：**Wilkins Vol. 3 第 2 軌取 `COMPOSITION IX`，Discogs 的 `Composition XI` 判為建檔誤植**

| 層 | 逐字 |
|---|---|
| ③ `bluenote.com` 三篇稿的軌表 | **`COMPOSITION IX`** |
| ① MusicBrainz release `ceaade16` | **`COMPOSITION IX`** |
| ④ Apple us／jp `1895320634` | **`COMPOSITION IX`** |
| ⚠ ② Discogs 37352382 | ⚠ **`Composition XI`** |

**三比一，取 `COMPOSITION IX`。** 佐證：Vol. 1 的〈COMPOSITION II〉與本軌同屬 Wilkins 那組
「以 J.S. Bach《平均律鍵盤曲集》為模型所寫的十二首無標題作品」（③ Vol. 1 內襯文逐字），
**十二首的編號上限是 XII，IX 與 XI 都在範圍內、無法用範圍排除，所以只能靠票數判。**
⚠ **給後批**：Discogs 的純數位 AAC 條目（本例 37352382、37096089、36831211）**沒有 credits、沒有 notes，逐軌表是使用者手打的**，
**曲名可靠度低於 MB 與 Apple**；實體條目才有掃描件可依。

---

## 第 2444 條（**推翻第 2033 條（四）與第 2035 條**）：**`Minyo Crusaders` 日版 CD 的品番是 `UCCJ-2257`，不是 `UCJJ-2257`**

第 2033 條（四）與第 2035 條都逐字寫「日版 UCJJ-2257／UCJJ-9059」。**實查兩個字母抄錯了一個。**

| 路徑 | 回應 |
|---|---|
| `https://www.universal-music.co.jp/minyo-crusaders/products/ucjj-2257/` | **404** |
| `https://www.universal-music.co.jp/products/ucjj-2257/` | **404** |
| **`https://www.universal-music.co.jp/minyo-crusaders/products/ucjj-9059/`（黑膠）** | **200** |
| `https://www.universal-music.co.jp/products/uccq-1228/`（Lage，無藝人段） | **404** |
| **`https://www.universal-music.co.jp/julian-lage/products/uccq-1228/`** | **200** |

**黑膠那一頁的「別バージョン」欄逐字印著 `CD 日本民謡より愛をこめて 発売日 2026.06.26 価格 ¥3,300 品番 UCCJ-2257`。**

⚠ ⚠ **第 1751-B 條（「日本線 slug 順序沒有規律，兩種都要試」）在本批的實測結論要修正**：
**兩張日本線的碟，`/<藝人 slug>/products/<品番>/` 都回 200、`/products/<品番>/` 都回 404——本批 2/2 一致，沒有出現順序沒規律的情形。**
**真正讓 `ucjj-2257` 落空的不是 slug 順序，是品番本身抄錯。**
**→ 給後批的操作建議：日本線路徑 404 時，先懷疑品番、再懷疑 slug 順序；品番可以從藝人頁（`/<藝人 slug>/`）的 RELEASE 區塊或另一個載體頁的「別バージョン」欄反查。**

⚠ **另記**：`Minyo Crusaders` 兩種載體的發行日不同（**CD 2026-06-26／黑膠 2026-07-17**），Discogs 兩筆的 `released` 欄分別是這兩天，不要合成一天。

---

## 第 2445 條（**本批最重的一筆事實錯誤，而且錯的是廠牌官網自己**）：**`Kiefer` 的葛萊美宣稱不成立——官網把「入圍」寫成「得獎」，而且連作品都掛錯**

③ `https://www.bluenote.com/artist/kiefer/` 逐字寫：
> `A Grammy Award–winning producer for his contributions to **Malibu** by Anderson .Paak`

**這句話兩層都不對：**

1. **Anderson .Paak《Malibu》在第 59 屆葛萊美（2017）只入圍「最佳都會當代專輯」，並未得獎。**
2. **Kiefer 實際有份的得獎作是 .Paak 的《Ventura》**（**第 62 屆最佳 R&B 專輯，2020 年**），他在那張共同製作了〈Yada Yada〉與首支單曲〈King James〉。

**→ 判：本卡 facts 一律不寫這個獎。** 下游若要提葛萊美，只能寫《Ventura》那一筆，**而且要標明那是專輯得獎、不是 Kiefer 個人獲獎**。

⚠ ⚠ **這一筆對整條線的意義**：base 檔把「入圍被寫成得獎」列為本產線最高頻的事實錯誤，
**過去的實例都是研究層或維基寫錯；本批是第一次抓到廠牌官網自己寫錯。**
**→ 通則：`bluenote.com` 的藝人頁對獎項的措辭不可直接採信，凡出現 `Grammy Award–winning`／`GRAMMY-nominated` 都必須另查屆次、類別與得獎／入圍。**
本批另外兩筆同形的已逐一查清（第 2450、2451 條）。

---

## 第 2446 條：**`Gabrielle Cavassa` 的 `award-winning` ＝ 2021 年 Sarah Vaughan 大賽**並列**冠軍，不是獨得**

③ 官網四處都只寫 `award-winning vocalist` 與 `crowned a winner of the prestigious International Sarah Vaughan Jazz Vocal Competition`，**沒有指明年份，也沒有指明是並列。**
實查三個獨立來源一致：**2021 年，她與 Tawanda Suessbrich-Joaquim 同列第一，是該賽事九屆以來第一次判並列冠軍，兩人各得五千美元獎金。**
（`https://jazz.fm/sarah-vaughan-international-jazz-vocal-competition-2021-winners/`、DownBeat、BroadwayWorld）

**→ 下游不可寫「獨得冠軍」。** ⚠ **她本人與本張目前查無葛萊美得獎或入圍紀錄，不要把大賽冠軍升格成葛萊美。**

---

## 第 2447 條（**推翻第 2032 條（四）**）：**`Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` 的十軌「全是公有領域的老詩歌」查無來源**

第 2032 條（四）逐字寫「**十軌全是公有領域的老詩歌**（〈Just a Closer Walk With Thee〉〈In the Garden〉…）」。

**本棒查不到任何來源支持「全部公有領域」這個宣稱：**
- ② Discogs 37296477 的 `extraartists` 與 publishing 欄**全空**（該筆條目 0 條 credits）；
- ③ 官網兩篇稿通篇沒有作者資訊，只說那是 Carter 母親最愛的聖詩；
- ⚠ **同名曲兼片名曲〈Sweet, Sweet Spirit〉是二十世紀的創作聖詩，不可能是公有領域。**

**→ 判：facts 只寫「Carter 母親生前最愛的十首聖詩」這個有來源的說法，不寫「公有領域」也不寫「傳統聖詩」。**
⚠ **給後批的通則**：老聖詩／老讚美詩的碟，**「聽起來很老」不等於公有領域**；
**沒有拿到 publishing 欄或作者名之前，一律不要寫版權狀態。** 這與第 2032 條（四）對 Meshell 那張「全是知名翻唱」的處理不同——
**那一張的原唱與原作是官網逐軌列出的，本張沒有。**

---

## 第 2448 條：**`Julian Lage《Scenes From Above》` 盤上有第五位樂手 Patrick Warren，③ 與策展層都沒查到**

③ 三篇 `bluenote.com` 稿、prop-b 的 `why` 與 `risk`，**全部只寫四重奏（Lage／Medeski／Roeder／Wollesen）。**
② Discogs 36365092 的**逐軌 credits** 顯示還有第五個人：

| 軌 | Patrick Warren 彈什麼 |
|---|---|
| 3 Talking Drum ／ 7 Ocala | **dulcitone** |
| 4 Havens ／ 7 Ocala | **Chamberlin** |
| 5 Night Shade | **bells、piano** |
| 6 Solid Air ／ 9 Something More | **strings** |

**九軌之中五軌有他。→ 下游寫「四重奏」時要留意這一點，不可寫成「全碟只有四個人」。**
⚠ **給後批**：**Discogs 的逐軌 credits（`tracklist[].extraartists`）是官網新聞稿查不到的一層**，
本批另有兩張靠它補到策展層沒有的東西（`Nduduzo` 換鼓手的兩軌、`Charles Pasi` 的獻名對照，見第 2452 條）。
**用 `api.discogs.com/releases/<id>` 拉整筆，不要只用 search 的摘要欄——摘要的 `extraartists` 只回前四筆。**

---

## 第 2449 條（**來源打架，判 2:1**）：**`Julian Lage` 日版 SHM-CD 的 bonus track 是第 10 軌〈Aberdeen〉**

| 層 | 逐字 |
|---|---|
| ② Discogs 36608539 的 notes | **`Japanese release with one bonus track (Aberdeen, Track 10).`** |
| ① MB SHM-CD release `a42a0d43`（UCCQ-1228） | 10 軌，**第 10 軌 `Aberdeen`**、第 9 軌 `Something More` |
| ⚠ ④ UMJ 商品頁 `uccq-1228` 的曲目表 | ⚠ **把 `アバディーン Aberdeen` 排在第 9、`サムシング・モア Something More` 排在第 10** |

**二比一，取 Aberdeen 為第 10 軌的日版限定 bonus track。** UMJ 頁的排序判為該頁版型問題
（「※日本盤限定ボーナス・トラック」那行的位置讓抓取後的順序錯位）。
**軌數釘定：國際版與數位 9 軌、日版 SHM-CD 10 軌**——與第 2035 條的要求一致，本機配試聽與封面不可取日版。

---

## 第 2450 條：**`Meshell Ndegeocello` 的葛萊美逐項分開——得獎三次、入圍十餘次，官網只寫了「一座」**

③ `https://www.bluenote.com/artist/meshell-ndegeocello/` 逐字只寫 `has earned a GRAMMY Award along with numerous nominations`（**單數、未指明**）。
實查**得獎三筆，逐項列**：

| 屆／年 | 類別 | 作品 | 得獎／入圍 |
|---|---|---|---|
| 2021 | **最佳 R&B 歌曲** | 〈Better Than I Imagined〉 | **得獎** |
| 2024 | **最佳另類爵士專輯** | 《The Omnichord Real Book》（Blue Note 第一張） | **得獎** |
| 2025 | **最佳另類爵士專輯** | 《No More Water: The Gospel of James Baldwin》（Blue Note 第二張） | **得獎** |

**另有十餘次入圍未得獎，本卡不寫。**
⚠ **重點**：她的**兩張 Blue Note 專輯連續兩屆拿下同一個獎項**，《Synonym》是第三張——**這是本卡最硬的一條背景，但它是前作的獎、不是本張的獎，下游不可混寫。**

---

## 第 2451 條：**`Melissa Aldana` 的兩項榮譽性質不同，必須分開寫**

③ `https://www.bluenote.com/artist/melissa-aldana/` 逐字同時給了兩件事，**一件是得獎、一件是入圍**：

1. **得獎**：她二十四歲時贏得 **Thelonious Monk International Jazz Saxophone Competition**，
   是**第一位獲勝的女性器樂演奏者、也是第一位獲勝的南美洲音樂家**；⚠ **她父親在 1991 年曾是同一項比賽的準決賽選手**（冷知識，官網逐字）。
2. ⚠ **入圍未得獎**：2019 年的《Visions》（Motéma）替她拿下**生涯第一次葛萊美入圍**，類別是**最佳即興爵士獨奏**。

**《Filin》本身目前沒有任何獎項。** 下游不可把上述兩項寫成這張碟的，也不可把 Monk 大賽寫成葛萊美。

---

## 第 2452 條：**`Charles Pasi《Adamas》` ③ 來源層全軍覆沒，整張靠 ② 的逐軌 credits 撐起來；另記一處年份落差**

**③ 三條路徑全空，與第 2033 條實測一致，本棒重跑確認不是漏查：**

| 路徑 | 回應 |
|---|---|
| WP posts `?search=Charles%20Pasi%20Adamas` | **200，0 筆** |
| WP posts `?search=Charles%20Pasi`（只放藝人名） | **200，0 筆** |
| WP search API `?search=Charles%20Pasi` | **200，0 筆** |
| `?s=Charles+Pasi` 站內搜尋 | **200，0 筆** |
| `https://www.bluenote.com/artist/charles-pasi/` | **404** |

**→ 本張是本批唯一一張 ③ 零覆蓋的碟。** 十二條 facts 裡有八條的 src 是 ② Discogs，
**決定性的素材是 ② 的逐軌 credits**：CD 條目 notes 逐字 `Adamas is dedicated to Nino Pasi and Maurice Suissa`，
而第 2 軌〈Nino, Cielo e Terra〉由 **Nina Pasi** 獻聲、第 5 軌〈Maurice, Samouraï〉由 **Lisa Suissa** 獻聲、
末軌〈Mikado〉由 **Carla Pasi** 獻聲——**獻名的兩個人，各自有一位同姓的家人在那首歌裡唱**。這是本卡唯一一條夠強的鉤子。

⚠ **另記一處年份落差（不在本批範圍，給主線覆核）**：prop-a 的 `why` 引 c-165 a 的《Zebra》為 **2020**，
但 **MB 該 RG 的 `first-release-date` 逐字是 `2021-02-05`**（兩筆 release 的 date 也都是 2021-02-05）。
**本批不改該卡**，只記下來。`Adamas` 是 Pasi 在 Blue Note 的第三張（Bricks 2017／Zebra／Adamas，三張的 MB `label-info` 都逐字是 `Blue Note`），
第六張錄音室專輯（另有 2006《Mainly Blue》、2009《Uncaged》、2014《Sometimes Awake》）。

---

## 第 2453 條（**輸出檔形狀；派工信與管線實況牴觸，兩者都產**）：**單一檔 `c167.json` ＋ 組別檔 `c167-a.json`／`c167-b.json` 並存**

派工信 §二逐字要求「**輸出**：`desc-tools/batches/research/c167.json`（**單一檔，14 筆，順序同卡單**）」，
§四又要求「收工前 `node qa-batch.mjs research c167`，**旗標清成 0**」。**這兩句在管線上是互斥的：**

- `qa-batch.mjs` 第 17／189 行只讀 `batches/research/${batch}-${g}.json`（g ∈ a–e）；
- `merge-writer-input.mjs` 第 9／14／43 行同樣只讀 `batches/research/${batch}-${g}.json`，找不到就 `process.exit(1)`。

**只產單一檔的話，qa-batch 會報「a–e 五組缺檔＋key 集合與卡單不一致」共 6 個旗標，而且寫作層的合併會直接失敗。**

**→ 判：兩者都產，內容同源。**
- **`batches/research/c167.json`**：14 筆、順序同卡單，**這是派工信指名的交件檔**。
- **`batches/research/c167-a.json`（7 筆）／`c167-b.json`（7 筆）**：由單一檔依 `prop-a`／`prop-b` 的成員切出，
  **組別歸屬與策展層完全一致**（a ＝ Pasi／Cavassa／Wilkins ×3／Kiefer／Meshell；b ＝ Minyo／Nduduzo／Ron Carter／Frisell／Walter Smith III／Aldana／Lage），
  欄位與 c-166 兩組逐欄相同（`key,artist,album,facts,hookCandidates,sound,keyTracks,status,coverage,notes`）。
- **`node qa-batch.mjs research c167` 在補上組別檔後回「a 7 full×7／b 7 full×7／key 與卡單完全一致 ✓／全部通過 ✓」，旗標 0。**

⚠ ⚠ **給主線**：**派工信那一句「單一檔」是寫錯的**（第 1725／1734-B 條）。
**後批的研究層派工信請改回「`<批>-<組>.json`，組別沿用策展層的 prop 分組」**，否則每一支代理都要重判一次這件事。
⚠ **若主線只要保留一種，請留組別檔**——單一檔對整條管線不可見。

---

## 第 2454 條：**③ 來源層四條路徑的實測命中率（14 張，可與第 2033 條的 17 筆對照）**

| 路徑 | 命中 | 備註 |
|---|---|---|
| **(1) `wp-json/wp/v2/posts?search=`** | **13／14** | **主力，本層 168 條 facts 有 107 條的 src 是 bluenote.com。⚠ 唯一 0 命中的是 `Charles Pasi`（第 2452 條）。** |
| **(2) `/artist/<slug>/`** | **11／13 路徑回 200** | 404 兩個：`charles-pasi`、`ricky-dillard`。⚠ **決定性素材比 (1) 少，但本批有三張靠它拿到關鍵獎項與生平**（Cavassa 的大賽、Aldana 的 Monk 大賽與葛萊美入圍、Ron Carter 的大提琴改貝斯）——**與 c-166 b 記的「路徑 2 決定性素材少」不同，本批路徑 2 的價值高於前批。** |
| **(3) `?s=` 站內搜尋** | **1 次，0 命中** | 只在 `Charles Pasi` 用上，回 200 但無結果。**與 c-166 兩組合計 0 次的紀錄相比，本批是第一次動用，結論仍是備援無效。** |
| **(4) `universal-music.co.jp`** | **2／2 回 200（用對品番之後）** | 見第 2444 條。⚠ **本批是日本線首次拿到決定性素材**：Minyo 的成軍地（東京福生的美軍住宅、橫田基地旁）、Ry Cooder 的評語、逐軌都道府縣對照、紀錄片與 Tiny Desk 資歷，**全部只在 UMJ 頁有，③ 與 ② 都沒有。** |
| **(5) 藝人官網** | **0 次** | 本批未動用，(1)(2)(4) 已足。 |

⚠ **本層另外動用的兩層，不在第 2033 條的五條路徑裡，但本批決定性**：
- **② `api.discogs.com/releases/<id>` 的整筆逐軌 credits**（11 筆），**補到錄音日期、逐軌樂手、獻名對照、混音母帶人員**——見第 2441／2442／2448 條。
- **`en.wikipedia.org` 兩次，只用於獎項的得獎／入圍覆核**（第 2445、2450 條），**未用於任何編制或年份的斷言**（base 檔對單一來源編制的警告）。

---

## 第 2455 條：**派工信與正本或既有裁定牴觸之處——共 3 處**

1. ⚠ ⚠ **派工信 §二的「輸出：單一檔 `c167.json`」與管線實況牴觸**，且與同一封信 §四要求的「`qa-batch` 旗標清成 0」互斥。
   **已依第 2453 條兩者都產。這是本信最該修的一句。**
2. ⚠ **派工信 §三第 3 點把第 1751-B 條轉述成「日本線 slug 順序沒有規律，兩種都要試」。**
   **本批實測 2/2 都是 `/<藝人 slug>/products/<品番>/` 回 200、`/products/<品番>/` 回 404，順序是有規律的**；
   **真正讓路徑落空的是品番抄錯（第 2444 條）。轉述沒錯，但它把注意力導向了錯的地方。**
3. ⚠ **派工信 §三第 1 點要求「三張的 facts 要能讓下游把『這一卷是哪幾晚、哪一套曲目』講清楚」。**
   **「哪一套曲目」三卷各自寫足了；「哪幾晚」只能寫到「2025 年 5 月 15 與 16 日兩晚合錄」這一層**——
   **三篇官網稿與兩筆實體條目都沒有分卷對照，本棒不做推測（第 2442 條）。**

⚠ **不是牴觸、但值得記的一處**：派工信 §二警告「串流探測鏈還在跑（10／14），`previews.json` 的 c167 部分尚未定案，
不要據此下『無來源』的結論，也不要在交件回報寫串流覆蓋率」——**本層全程未讀 `previews.json`、未寫入任何檔案，
交件回報也不含串流覆蓋率。** 本層對 `Kiefer` 與 `Meshell` 兩張標的「未發行」是依 **MB `first-release-date` ＋ ③ 官網發行日**，
**不是依串流探測結果**（兩張的發行日 2026-09-25／2026-10-02 都晚於本棒交件日 2026-09-19）。

---

# c-167 a 組（7 筆）**鉤子層**裁定　號段 2541–2570

（本節一律 **append 於檔末**，未覆寫、未改動既有的 2020–2035／2441–2455 任何一行——第 1806-B 條；
開工前本檔 889 行、兩節，本棒只在檔末追加。暫存檔一律 `c167a-`／`chk-c167-a-` 前綴
（`chk-c167-a-hooks.mjs`／`c167a-draft.json`），未使用任何通用檔名。日期 2026-09-19。）

---

## 第 2541 條（交件總表）

| 項目 | 值 |
|---|---|
| 產出檔 | `desc-tools/batches/hooks/c167-hooks-a.json` |
| 張數 | **7／7**，`key` 逐字複製自 `desc-tools/batches/research/c167-a.json`、**順序與研究稿完全相同**（程式比對 `JSON.stringify` 全等） |
| 與卡單比對 | `c167-cards.json` 的 `group === "a"` 7 張，**缺 0 多 0**（程式比對 key 集合全等） |
| `hook` 加權字元（英數 0.5） | **21–27**，全部 ≤50 |
| `note` 原始字元（`Array.from`） | **210–229**，全部 ≤350 |
| **`note` 字元預算**（公式見第 2542 條） | **217–227，中位數 225，0 筆超標** |
| 骨架歸屬 | **擁有 5 張**（寫「這條骨架全批只走本張。」）／**讓出 2 張**（一字不寫、不點名），見第 2544 條 |
| `node qa-batch.mjs hooks c167` | **a 組旗標 0**；`互指?` **0 行**；`note>350` 0 筆。總標記 1 = `⚠ b 缺 hook 檔`（b 組尚未開跑，**不是 a 組的旗標**） |
| `node chk-hook-crossgroup.mjs c167` | **`c167｜1 組｜7 張`／`hook 加權 21–27｜note 210–229`／`✓ 全部通過`** |
| 用掉的號段 | **2541–2547**（2548–2570 未用） |

⚠ **工作區當下版本才是交件版**（第 1803-B 條）：本節所有數字都是對**磁碟上當下那一份**
`desc-tools/batches/hooks/c167-hooks-a.json` 實跑出來的，不是中途快照。「筆數對了」與「定稿了」在本棒是同一個時點。

---

## 第 2542 條：**本棒實際用的字元預算公式（逐字，第 1793-B／2402 條），以及倒回去量 c-166 a 的結果**

照 `hook-base.md` 雲端註記第 2 點寫死的那條，一字未改、未自創係數、逐格用 `Array.from().length` 實測，
**全程零次心算**（每改一次 note 就重跑一次 `chk-c167-a-hooks.mjs`）：

```
預算 = Array.from(hook).length + Array.from(note).length
       − Array.from('主故事：').length              //  4
       − (note.match(/→/g)||[]).length              //  每個箭號扣 1
       − Array.from('正文只寫上列各項。').length     //  9（有才扣）
       − Array.from('這條骨架全批只走本張。').length //  11（有才扣）
```

**只扣這四樣，其餘一律算**：年份指定（「發行年寫 2026 年」）、發行日指定（「發行日寫 2026 年 9 月 25 日」）、
引用限制（「提到盤名時帶上掛名與卷號」）、軌數與時長指定**全部計入**。

### （一）⚠ **先把這把尺倒回去量 `c166-hooks-a.json`（派工信 §四第 1 點要求）**

23 張逐格算出
`219,206,229,222,220,227,217,208,221,221,223,223,224,220,202,230,210,228,206,229,219,226,220`，
排序後 `202,206,206,208,210,217,219,219,220,220,220,221,221,222,223,223,224,226,227,228,229,229,230`：

- **min 202／max 230／中位數 221——與第 2401 條回報的「202–230，中位數 221」三項逐項對上。尺確認相同，才開始量本組。**
- ⚠ ⚠ **但四格分佈對不上，而且本棒判是第 2402 條的表數錯了，不是尺不同**：
  第 2402 條寫 **<210 為 3（並列舉 `202／206／208`）／210–219 為 6／220–229 為 13／230 為 1**；
  本棒實跑是 **<210 為 4／210–219 為 4／220–229 為 14／230 為 1**（合計同為 23）。
  **`206` 出現兩次，第 2402 條那一格列舉的是相異值（三個數字）而不是張數**，少算一張；
  另一張的差額落在 210–219 與 220–229 之間（`220` 有三張）。
  **→ 判：尺相同（min／max／中位數三項全等，且總數相同），第 2402 條的四格表是計數瑕疵，不影響 c-166 a 的交件內容。**
  ⚠ **給後批：倒回去量前批時，對得上「min／max／中位數」就算同尺；四格分佈只是報表，不要因為它不合就懷疑公式。**

### （二）**本組 7 張的實測分佈**（同樣的四格切法）

| 區間 | 張數 |
|---|---:|
| <210 | **0** |
| 210–219 | **2**（217／218） |
| 220–229 | **5**（220／225／225／226／227） |
| 230 | **0** |
| 合計 | **7**（min 217、max 227、中位數 225） |

### （三）⚠ ⚠ **本批的心算偏差方向與幅度：第一版 7 張有 6 張超標，幅度 5–35%**

第一版草稿逐格是 `218,249,259,256,255,242,310`——**7 張裡 6 張超標，超幅 5%（242）到 35%（310）。**
**方向與 c-166 a 相同（全面低估），但幅度分佈完全不同**（c-166 a 是 23 張全部超標 15–36%，本組有一張第一版就合格）。
**再次證實「上一批的係數不可繼承」**：本組的專名密度極度不均——
`Meshell Ndegeocello` 那張光是客座名單與兩張前作盤名就吃掉 130 字元以上（第一版 310），
而 `Charles Pasi` 那張第一版只有 218。**同一批之內都不能共用係數，只能逐張實測。**
**壓下來的手段全部是整格捨去（第 2543 條），沒有任何一張是靠縮短句子解決的。**

---

## 第 2543 條：**整格捨去清單（在鉤子層就砍掉，不留給寫作層——`hook-base.md`「算不下就整格捨去」）**

**7 張有 6 張有捨去**（`Charles Pasi` 那張第一版即合格，未捨去、反而補回錄音地一格）：

| 卡 | 整格捨去的項目 |
|---|---|
| `Charles Pasi《Adamas》` | **（未捨去）** 第一版 218 即合格；末軌〈Mikado〉由 Carla Pasi 獻聲、固定班底四人名單、弦樂四人名單、〈Garbage Dog〉與 Queen Omega 的對唱、封面設計 H5 一開始就沒進草稿 |
| `Gabrielle Cavassa《Diavola》` | 盤上編制五人名單（Jeff Parker／Larry Grenadier／Brian Blade／Paul Cornish＋Redman）；她參與 Redman 2023 年那張碟的指派句；十軌裡自作曲只有三首的比例；末軌〈La notte dell'addio〉；技術層三人；三種實體規格 |
| `Immanuel Wilkins《…Vol. 1》` | **內襯文執筆者 Tina M. Campt 與「只印在本卷實體內頁」整格**（最後被預算擠掉，是本組最可惜的一格）；末軌〈ETERNAL〉十九分三十八秒與那段十一音循環樂句；四重奏三位成員名單；製作與錄音人員；封面畫作 Jay Curry |
| `Immanuel Wilkins《…Vol. 2》` | 收尾〈GO 'HEAD GET DOWN〉五分五十秒（開場那一格留下）；五軌逐字曲名；NPR 對這個團的評語；本卷只有一筆 XW 數位 release 的建檔事實；《The 7th Hand》《Blues Blood》同線敘述 |
| `Immanuel Wilkins《…Vol. 3》` | **開場〈RING SHOUT〉與黑人教會繞圈踏步祝禱形式整格**（同時省掉研究層要求保留「曲名指的是」那一層措辭的合規風險）；四軌逐字曲名；四軌各自時長；℗ 年三卷不同那一層；`secondary-types` 建檔不一致 |
| `Kiefer《Memory Bomb》` | 十一人客座名單；三首先行單曲的日期與 feat. 名單；十三軌建檔與〈Entr'acte〉幕間；**盤名是「一場夢」、夢分三種整格**（見第 2544 條（二），這一格是刻意讓給 b 組，不只是預算問題）；FATHERS 團員身分；「CARRTOONS 與 Shibo 是他最好的朋友」那半句 |
| `Meshell Ndegeocello《Synonym》` | **十九人客座名單整格**（53 字元，密度最低，第一個砍）；**兩張前作盤名《Plantation Lullabies》《Peace Beyond Passion》**（改寫成「1993 年與 1996 年兩張經典」，省 37 字元）；**前作連兩屆葛萊美最佳另類爵士專輯整格**（見第 2546 條（三））；酷兒解放宣言與 Audre Lorde 引言；選曲的年代跨度；樂手班底名單；〈Don't Look Any Further〉與 Elena Pinderhughes 的長笛 |

⚠ **捨去的原則沿用第 2403 條**：先砍**名單型**（三人以上並列人名，每格 30–55 字元、密度最低），
再砍**與主故事鏈無關的第二層軼事**，最後才動主故事鏈上的格。

---

## 第 2544 條（⚠ **給 b 組看的那張表**）：**骨架歸屬——擁有 5 張、讓出 2 張，以輸出檔為準**

⚠ **本表是對 `desc-tools/batches/hooks/c167-hooks-a.json` 當下版本程式化掃出來的**
（`note.includes('這條骨架全批只走本張。')`），**不是手打**——第 1802-B 條。

### （一）擁有（`note` 有那一句）**5 張**

| # | 卡 | 擁有的骨架（一句話，給 b 組判斷用） |
|---:|---|---|
| 1 | `Gabrielle Cavassa《Diavola》` | 互為表裡的兩首歌同日以雙 A 面單曲一起放出，一首走向光、一首從高處崩壞 |
| 2 | `Immanuel Wilkins《…Vol. 1》` | 一套多卷企劃裡只有一卷壓成實體，而那張實體只收該卷自己的曲目 |
| 3 | `Immanuel Wilkins《…Vol. 2》` | 一次駐場被按月拆成連載，本卷是中間那一棒 |
| 4 | `Immanuel Wilkins《…Vol. 3》` | 完結篇的發行日正好撞上第一個錄音夜的整整一年 |
| 5 | `Kiefer《Memory Bomb》` | 他替自己的做法取的名字，後來變成他自己辦的一個音樂節 |

**其餘 2 張的 `note` 一字不寫、也不點名讓給了誰**（`hook-base.md` 雲端註記第 3 點）——
程式實掃確認這 2 張（以及擁有的那 5 張）的 `note` 裡**沒有出現同批任何別張卡的盤名**，
`qa-batch` 的 `互指?` 因此 **0 行**。

### （二）⚠ ⚠ **刻意讓出的三條，理由記下來給 b 組（第 1809-B 條：歸屬不是先到先得）**

動手前已掃過 `batch-progress/c167/prop-b.json` 與 `desc-tools/batches/research/c167-b.json` 七張：

1. **「盤名其實是某個詞的另一種說法」——整條讓給 b 組，`Kiefer` 連題材都換掉。**
   **b 組有兩張同形狀的卡**：`Melissa Aldana《Filin》`（`filin` 就是英文 `feeling` 的古巴唸法）與
   `Nduduzo Makhathini《The Myth We Choose》`（盤名的意思寫在他自己的內襯文裡）。
   `Kiefer` 的《Memory Bomb》＝「一場夢」、夢分三種，是**第三張同形**——
   **b 組多張、a 組一張，照第 1809-B 條 a 讓。** `Kiefer` 改走「風格名變成音樂節名」那條（上表第 5）。
2. **「整張碟獻給／紀念某個人」——`Charles Pasi《Adamas》` 不 claim。**
   b 組的 `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` 全盤紀念 Carter 的母親，
   **那是 b 組該卡唯一的主故事鏈**。Pasi 這張的實際切角是「獻名的兩個人各自有一位同姓家人在那首歌裡獻聲」，
   **形狀與 Ron Carter 那張不同（第 1779-B 條：限制的是骨架不是題材），但相鄰太近，不 claim、不點名。**
3. **「N 首曲子各自對應一個不同的 X」——`Meshell Ndegeocello《Synonym》` 不 claim。**
   b 組的 `Minyo Crusaders《From Japan With Love》` 是「八軌各自來自一個都道府縣」，
   **與本卡「十五軌各自配一位不同的對唱客座」是同一個形狀。**
   b 組該卡另有「美軍基地旁的住宅成軍」可走，**但本棒仍不 claim**——
   ⚠ **b 組若決定讓 Minyo 走縣份地圖那條，本卡不會與它互撞，因為本卡沒有寫下獨占句。**

### （三）⚠ **三張 Wilkins 的分工（派工信 §三第 1 點：三張要各自不同的切入面向）**

| 卷 | 切入面向 | 刻意避開的 |
|---|---|---|
| **Vol. 1** | 唯一的實體卷＋那張實體只收本卷四軌＋唯一一首外來曲〈CHARANAM〉 | 連載節奏、發行日巧合、最長軌 |
| **Vol. 2** | 三卷連載的中間一棒＋唯一的五軌卷＋NPR Tiny Desk 點名的是本卷 | 實體、外來曲、發行日巧合 |
| **Vol. 3** | 完結篇撞上第一個錄音夜的一週年＋整套十三軌裡最長的一軌＋Bach 平均律那組無標題作品 | 實體、連載節奏、Tiny Desk |

**三張都沒有把「同一批現場錄音分三卷發」當成主故事鏈**（只有 Vol. 1 與 Vol. 2 各用一格交代母體，
Vol. 3 用的是錄音日期本身）。

---

## 第 2545 條：**「兩晚合錄」的上限已逐張守住，三張都沒有分卷對照（第 2442 條）**

- **三張的 `note` 對錄音日期只寫到「2025 年 5 月 15 與 16 日兩晚」這一層**，
  **沒有任何一張寫「Vol. 1 是第一晚、Vol. 2 是第二晚」這類分卷對照。** 實掃三張 `note`，`第一晚`／`第二晚` 0 命中。
- ⚠ **Vol. 3 用到的「第一個錄音夜」是指 2025-05-15 這個日期本身**（第 2442 條逐字：發行日正好是第一個錄音夜的一週年），
  **不是在指派哪一卷來自那一晚**——`note` 的句子主詞是「兩晚的錄音」與「本卷的發行日」，不是曲目歸屬。
- **三張的 `note` 都寫了「提到盤名時帶上掛名與卷號」**（第 2032 條（二）要求的引用限制，逐字計入預算）——
  **`Live at the Village Vanguard` 已四批四次撞 Coltrane 與 Bill Evans 的 apex `hall`，本批三張是第五、六、七次。**

---

## 第 2546 條：**三筆獎項／榮譽的落實方式（第 2445／2446／2450 條）**

1. **`Kiefer《Memory Bomb》`**：**`hook` 與 `note` 全篇沒有出現「葛萊美」「Grammy」「Malibu」「Ventura」任何一個字。**
   **不是寫成「不要寫這個獎」**（那是否定句，會被寫作層原樣寫進正文——校對痕跡第一至四型），
   **而是整格不提、並以「正文只寫上列各項。」封口。** 第 2445 條的要求以「沉默＋封口」落實，不以禁令落實。
2. **`Gabrielle Cavassa《Diavola》`**：`note` 逐字寫「該賽九屆以來第一次出現並列冠軍」——
   **「並列」兩個字直接寫進施工圖，寫作層不可能寫成獨得。**
   ⚠ 初稿原寫「第一次判並列第一」，**因本檔「榜單名次用阿拉伯數字」那條會讓「第一」變成該寫「第 1」而語意彆扭，改成「並列冠軍」**（第 2447 條那種措辭層的謹慎，同一個道理）。
   **她本人與本張的葛萊美一字不提。**
3. **`Meshell Ndegeocello《Synonym》`**：**三筆葛萊美整格捨去。**
   第 2450 條要求「逐筆標明屆年與類別、且標明是前作的獎」——**那需要 40 字元以上，本卡預算吃不下（第一版已 310）。**
   **與其寫半套（寫獎不寫屆年，或寫獎不標前作）冒著被寫成「本張得獎」的風險，不如整格不寫。**
   ⚠ **這是本棒的裁定：獎項寫不全就不寫。**（可逆：主線若要補，改的是 `note` 一格，不是卡池結構。）
4. ⚠ **`Immanuel Wilkins` 三張的 `GRAMMY-nominated`（研究層三張 notes 都標了是《Blues Blood》**入圍**、不是得獎）**：
   **三張整格不提獎項**，同上理由（要寫清楚「入圍、前作、哪一屆、哪個類別」至少 30 字元）。

---

## 第 2547 條：**派工信與 `hook-base.md` 正本或既有裁定牴觸之處——共 3 處**

1. ⚠ **派工信 §三第 1 點逐字寫「**實體軌數各自獨立**：CD 與 2LP 都只有該卷自己的軌（Vol. 1 四軌，2LP 一面一軌）」。**
   **這句話的主詞是「三張」，字面會讀成三卷都有實體。**
   **實況（第 2441 條＋研究層 F2）是：三卷之中只有 Vol. 1 出實體（CD `00602488170826`＋2LP `00602488170871`），Vol. 2 與 Vol. 3 是數位專屬。**
   **本棒照正本（第 2441 條）做，Vol. 1 的 `note` 逐字寫「三卷裡只有本卷出實體」。**
   ⚠ **這一句不是事實錯誤，是轉述時把限定語漏掉了**——但它正好是 Vol. 1 那張卡的主骨架，寫錯會整張走偏。
2. ⚠ **派工信 §四第 1 點逐字要求「對得上 202–230／中位 221 再量自己這組」。**
   **min／max／中位數三項全部對上（第 2542 條（一）），但第 2402 條記的四格分佈對不上**
   （該條 3-6-13-1、本棒實跑 4-4-14-1，合計同為 23）。
   **本棒判是第 2402 條的四格表把「相異值個數」當成張數而少算，尺本身相同，照原公式繼續。**
   **派工信只指定了 202–230／中位 221 這三個數，所以嚴格說不是派工信寫錯**——寫下來免得 b 組倒回去量時停在這裡。
3. ⚠ **派工信 §四第 3 點逐字要求「`node qa-batch.mjs hooks c167`（a 組旗標清成 0）」。**
   **實跑「總標記 1」，那 1 是 `⚠ b 缺 hook 檔`**（b 組還沒開跑，而本信 §五又明令禁碰 `c167-hooks-b.json`）。
   **a 組本身旗標 0、`互指?` 0 行、`note>350` 0 筆。**
   ⚠ **「總標記」在 b 組交件前不可能歸零，這是管線形狀決定的，不是 a 組沒清乾淨**——
   **建議後批的 a 組派工信把這句改成「a 組相關的旗標清成 0，`b 缺 hook 檔` 屬預期」。**

⚠ **不是牴觸、但值得記的兩處**：
- 派工信 §二警告「另有一份 `c167.json`（14 筆合檔）不要讀、不要改」——**本棒全程未開啟該檔**（只讀 `c167-a.json` 與 `c167-b.json`；
  後者是第 1764-B 條要求的「動手前先掃過 b 組」，屬讀取，未寫入）。
- 派工信 §四第 2 點要求「每做完 5 張就把整份輸出檔寫回磁碟」——**本棒的落地方式是：草稿全程存在
  `scratchpad/c167a-draft.json`（每一輪修改都整檔寫回），量到 0 筆超標後才一次寫進 repo 的輸出檔。**
  **容器若在中途重啟，重派同一支代理可從那份草稿接續，不必從零。** 開工時輸出檔不存在，無既有內容可續。

**本節實際用掉 2541–2547，2548–2570 未用。**

---

# c-167 b 組（7 筆）**鉤子層**裁定　號段 2571–2600

（本節一律 **append 於檔末**，未覆寫、未改動既有的 2020–2035／2441–2455／2541–2547 任何一行——第 1806-B 條；
開工前本檔 1097 行、三節，本棒只在檔末追加。暫存檔一律 `c167b-`／`chk-c167-b-` 前綴
（`chk-c167-b-hooks.mjs`／`c167b-draft.json`），未使用任何通用檔名。日期 2026-09-19。）

---

## 第 2571 條（交件總表）

| 項目 | 值 |
|---|---|
| 產出檔 | `desc-tools/batches/hooks/c167-hooks-b.json` |
| 張數 | **7／7**，`key` 逐字複製自 `desc-tools/batches/research/c167-b.json`、**順序與研究稿完全相同**（程式 `JSON.stringify` 全等） |
| 與卡單比對 | `c167-cards.json` 的 `group === "b"` 7 張，**缺 0 多 0**（程式比對 key 集合） |
| `hook` 加權字元（英數 0.5） | **21–31**，全部 ≤50 |
| `note` 原始字元（`Array.from`） | **209–233**，全部 ≤350 |
| **`note` 字元預算**（公式見第 2572 條） | **213–228，中位數 222，0 筆超標** |
| 骨架歸屬 | **7 張全部擁有**（都寫「這條骨架全批只走本張。」），見第 2574 條 |
| `node qa-batch.mjs hooks c167` | **「全部通過 ✓」，總標記 0**；`互指?` **0 行**；`note>350` 0 筆 |
| `node chk-hook-crossgroup.mjs c167` | **`c167｜2 組｜14 張`／`hook 加權 21–31｜note 209–233`／`✓ 全部通過`** |
| 用掉的號段 | **2571–2578**（2579–2600 未用） |

⚠ **工作區當下版本才是交件版**（第 1803-B 條）：本節所有數字都是對**磁碟上當下那一份**
`desc-tools/batches/hooks/c167-hooks-b.json` 實跑出來的，不是中途快照。

---

## 第 2572 條：**本棒用的字元預算公式（與第 2542 條逐字相同），以及倒回去量 `c167-hooks-a.json` 的結果**

```
預算 = Array.from(hook).length + Array.from(note).length
       − Array.from('主故事：').length              //  4
       − (note.match(/→/g)||[]).length              //  每個箭號扣 1
       − Array.from('正文只寫上列各項。').length     //  9（有才扣）
       − Array.from('這條骨架全批只走本張。').length //  11（有才扣）
```

**只扣這四樣，其餘一律算**：年份指定、發行日指定、引用限制、軌數與時長指定**全部計入**。
全程 `Array.from().length` 實測，**零次心算**（每改一次就重跑 `chk-c167-b-hooks.mjs`）。

### （一）**先把尺倒回去量 `c167-hooks-a.json`（派工信 §四第 1 點要求）**

7 張逐格算出 `218,227,225,220,225,226,217`，排序後 `217,218,220,225,225,226,227`：

- **min 217／max 227／中位數 225——與第 2541 條回報的三個數逐項對上，尺確認相同，才開始量本組。**
- **四格分佈實跑 0-2-5-0，與第 2542 條（二）的表逐格相同**（本次沒有第 1814-B 條那種歸格瑕疵）。
- **順帶程式覆核第 2541 條的「擁有 5 張／讓出 2 張」：實掃 `note.includes('這條骨架全批只走本張。')` ＝ 5，對上。**
- ⚠ **依派工信 §四第 1 點，本棒未拿 `batch-progress/c166/rulings.md` 第 2402 條的四格分佈當任何基準。**

### （二）**本組 7 張的實測分佈**（程式產生，未手動歸格——第 1814-B 條）

| 區間 | 張數 |
|---|---:|
| <210 | **0** |
| 210–219 | **2**（213／213） |
| 220–229 | **5**（222／222／222／227／228） |
| 230 | **0** |
| 合計 | **7**（min 213、max 228、中位數 222） |

### （三）**本批的心算偏差：第一版 7 張全部超標，幅度 1.3%–35%**

第一版逐格 `233,305,263,310,264,275,249`——**7 張全超，最小超幅 1.3%（233）、最大 35%（310）。**
**方向與 c-166 a／c-167 a 相同（全面低估），但幅度分佈又不一樣**：
本組的兩張南非／美國混編卡（`Nduduzo` 十六軌四首 reprise ＋客座、`Bill Frisell` 六人名單）
各自一開始就 300 以上，而 `Minyo Crusaders` 第一版只有 233。**同一批之內不可共用係數，再次證實。**

---

## 第 2573 條：**整格捨去清單（在鉤子層就砍掉，不留給寫作層）**

**7 張全部有捨去**，優先序沿用第 2403／2543 條：**先砍名單型 → 再砍與主故事鏈無關的第二層軼事 → 最後才動鏈上的格。**

| 卡 | 整格捨去的項目 |
|---|---|
| `Minyo Crusaders《From Japan With Love》` | **核心成員名單（吉他手田中克海、主唱フレディ塚本）整格**；八軌逐軌的都道府縣對照（另有骨架理由，見第 2574 條（二））；製作人 Koichiro Osawa 的定調句；團長田中克海的定調句；紀錄片與 Tiny Desk 資歷；兩種載體的品番與不同發行日；六十場巡演與音樂節清單 |
| `Nduduzo Makhathini《The Myth We Choose》` | **常設三重奏名單（Dalisu Ndlazi／Lukmil Pérez）與換鼓手兩軌整格**；**客座整格**（Shabaka Hutchings 的長笛、Black Coffee 的鼓組編程、〈Liyoze Line Nangakithi〉那首雨水讚歌）；四首先行單曲的日期與〈Kuzodlula〉的寬恕說法；〈Ḽiṅwalo ḽa Mubebi〉的三人共同署名；**盤名的內襯文解釋整格**（骨架理由見第 2574 條（二））；技術與美術人員 |
| `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` | **「那些歌形塑了 Carter 家與他們在底特律敬拜的教會社群」整格**；十軌逐字曲名；原本由會眾清唱、房間裡沒有樂器那一層；同名曲提早兩個月放出的時序；兩人各一句的引語；Maestro 與 Choirmaster 兩個綽號；Carter 十歲學大提琴改拉貝斯的生平整格 |
| `Bill Frisell《In My Dreams》` | **六人逐名名單整格**（Scheinman／Kang／Roberts／Morgan／Royston，改寫成「他自己的三重奏＋那組弦樂」，省 40 字元）；**三場音樂會的城市、場館與日期整格**；**第 4 軌〈Isfahan〉與 Strayhorn 致意整格**（另有同批撞軌理由，見第 2575 條）；盤名那個夢的來歷整格；十二軌裡九首自作的比例；《紐約客》的評語；封面與技術人員 |
| `Walter Smith III《Twio Vol. 2》` | **無鋼琴三重奏的兩位成員名單（Joe Sanders／Kendrick Scott）整格**（試加回實測 +35 字元，放棄）；**十軌的作者清單整格**（含第 9 軌〈Isfahan〉，見第 2575 條）；〈Casual – Lee〉搭在〈East of the Sun〉和聲上的做法；〈Lawns〉繞經 Terri Lyne Carrington 的來歷；錄音日期與地點；2018 年首輯的編制與 DownBeat 評語；發片後 Village Vanguard 一週駐場與六位客座名單 |
| `Melissa Aldana《Filin》` | **「這些歌像她內化已久的美國歌本抒情曲、歌詞是西班牙文讓她用新的方式連上」整格**（55 字元，本組單格最大）；編制名單（Peter Washington／Kush Abadey／Cécile McLorin Salvant 兩軌獻聲）；第 6 軌〈Little Church〉與 Hermeto Pascoal、Wayne Shorter 那一層；《Ballads》座標與抄譜對象名單；她自己講吹法的那段引語；**Monk 大賽與葛萊美入圍兩項榮譽整格**（見第 2576 條） |
| `Julian Lage《Scenes From Above》` | **「他希望這件事是平等的、自己也只是團員」整格**；製作人 Joe Henry 與第二次合作；SFJAZZ 駐館首演；〈Night Shade〉七分二十四秒與 Medeski 的管風琴段落；三首先行曲的日期；**日版 SHM-CD 第 10 軌〈Aberdeen〉整格**；Medeski 評他的那段話；發片後的巡演清單 |

---

## 第 2574 條（⚠ **對 a 組第 2544 條的回覆**）：**骨架歸屬——b 組 7 張全部擁有；a 組讓出的三條，兩條收下、一條退回不用**

⚠ **本表是對 `desc-tools/batches/hooks/c167-hooks-b.json` 與 `c167-hooks-a.json` 兩份當下版本程式化掃出來的**
（`note.includes('這條骨架全批只走本張。')` ＋關鍵詞實掃），**不是手打**——第 1802-B／1814-B 條。

### （一）b 組 7 張的骨架（全部 claim）

| # | 卡 | 擁有的骨架 |
|---:|---|---|
| 1 | `Minyo Crusaders《From Japan With Love》` | 在外國軍事基地旁的住宅裡成軍的樂團，把本國最土的民謠接上外來節奏 |
| 2 | `Nduduzo Makhathini《The Myth We Choose》` | 共同製作人是自己未成年的孩子，盤上某一整類聲響全出自那個孩子 |
| 3 | `Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》` | 幾十年前錄給家人的私人禮物，多年後成了公開發行的唱片 |
| 4 | `Bill Frisell《In My Dreams》` | 兩個既有的舊團合成一個從未同台過的新編制 |
| 5 | `Walter Smith III《Twio Vol. 2》` | 選曲原則本身就是題目：要的是熱門曲目旁邊的那些曲子 |
| 6 | `Melissa Aldana《Filin》` | 盤名那個字是某個外語詞的另一種唸法，而題目是別人替她出的 |
| 7 | `Julian Lage《Scenes From Above》` | 掛名的編制之外，盤上還有一位官方稿從未提到的樂手 |

**claim 在字元公式上是零成本**（`這條骨架全批只走本張。` 不計入預算，第 1814-B 條），
**判準只有「骨架是否真的獨有」**——7 條兩兩互異，且與 a 組 5 條歸屬句、7 條 `hook` 本體無一重疊。

### （二）⚠ ⚠ **a 組讓出的三條，本棒的處置：收下 2 條、退回 1 條**

| a 組讓出的骨架（第 2544 條（二）） | b 組的處置 | 落點（程式實掃） |
|---|---|---|
| 1. 盤名是某個詞的另一種說法 | **收下，只歸一張** | **`Melissa Aldana《Filin》`（claim）**。`Nduduzo` 的盤名內襯文解釋**整格不寫**——派工信說「這條你有兩張，只能歸一張」，本棒照辦。⚠ **順帶更正一處轉述**：`Nduduzo` 那張的形狀其實是「作者自己在內襯文裡解釋盤名的意思」，**與「盤名＝某個外語詞的另一種唸法」不同形**；但既然只能歸一張，仍照派工信整格讓給 Aldana。 |
| 2. 整張碟獻給／紀念某個人 | **收下** | **`Ron Carter, Ricky Dillard《Sweet, Sweet Spirit》`（claim）**。這是該卡唯一的主故事鏈，a 組的 `Charles Pasi` 未 claim、其 `hook` 本體走的是「曲名＝人名、唱的人同姓」，**兩者形狀不同、無撞擊**。 |
| 3. ⚠ **N 首各自對應一個不同的 X** | ⚠ ⚠ **退回不用** | **本組 0 張使用（`都道府縣` 全檔 0 命中）。理由見第 2577 條第 1 點：a 組 `Meshell Ndegeocello` 的 `hook` 本體逐字就是「十五首全是別人的老歌，每一首找不同的人來對唱。」——`hook` 本體用掉的形狀也算已占用（第 1814-B 條），這條事實上不可用。** `Minyo` 改走第 2544 條（二）3 自己點出的那條備援：**美軍住宅成軍。** |

---

## 第 2575 條：**同批撞軌〈Isfahan〉的處置——兩張都整格不寫**

研究層兩張的 `notes` 都記了「本張的〈Isfahan〉與同批另一張是同一首 Strayhorn／Ellington 曲目的兩次不同演奏，敘述必須分得開（第 1903 條）」。
**本棒的處置是兩張都不寫**：`Bill Frisell` 的〈Isfahan〉致意格與 `Walter Smith III` 的十軌作者清單**都在預算壓縮時整格捨去**，
**實掃兩張 `note`，`Isfahan` 0 命中。**
⚠ **這比「兩張各寫一個不同面向」便宜且零風險**（第 1814-B 條那條手法：軌名整格拿掉，綁在它上面的引用指示一起消失；
因為有 `正文只寫上列各項。`，寫作層不會從 `facts` 把它補回來）。
⚠ **下游要知道**：兩張的〈Isfahan〉是刻意不寫的。

**同批另一處撞陳列（研究層記的）也一併守住**：**`Ron Carter` 同時是 `Sweet, Sweet Spirit` 的共同掛名與 `Twio Vol. 2` 的客座。**
兩張的素材各自來自自己的 `facts`、零共用句構——前者寫他為母親做的紀念盤與「貝斯成為敘事者」，
後者寫他當客座進了其中五軌與錄音室裡那句話。**`qa-batch` 的 `互指?` 0 行，程式實掃 14 張無任何一張的 `note` 出現同批別張的盤名。**

---

## 第 2576 條：**獎項的落實方式——本組 7 張一字不提，全部以「沉默＋封口」落實**

實掃 7 張：**`葛萊美`／`Grammy` 0 命中。**

1. **`Melissa Aldana《Filin》`**：第 2451 條要求 Monk 大賽（**得獎**）與 2019 年《Visions》（**入圍未得獎**）兩項分開寫。
   **兩項整格捨去。** Monk 大賽那格要寫全（二十四歲、第一位女性器樂演奏者、第一位南美洲人）需 35 字元以上，
   葛萊美那格要標清「前作＋年份＋類別＋入圍」需 40 字元以上，**本卡預算吃不下（第一版已 275）**。
   **依派工信 §四第 5 點與第 2546 條（三）：獎項寫不全就不寫。**
2. **`Julian Lage《Scenes From Above》`**：前作《Speak to Me》的葛萊美入圍**整格不提**（同理由）。
3. **`Nduduzo`／`Bill Frisell`／`Minyo`／`Walter Smith III`／`Ron Carter`**：研究層本來就記「查無獎項敘述、下游不要補」，**本組照辦，一字未寫。**

⚠ **全部以「整格不提」落實，`note` 裡沒有任何一句否定句或禁令**——
第 2546 條（一）的作法，避免校對痕跡被寫作層原樣抄進正文。
**`chk-hook-crossgroup` 的「note 有校對痕跡風險」與「分數或星等」兩道均 0 命中。**

---

## 第 2577 條：**派工信與 `hook-base.md` 正本或既有裁定牴觸之處——共 2 處**

1. ⚠ ⚠ **派工信 §三把「N 首各自對應一個不同的 X」列進「a 組讓出的三條骨架」，同一節又寫「`hook` 本體用掉的形狀也算已占用」——這兩句互斥。**
   **a 組 `Meshell Ndegeocello` 的 `hook` 逐字是「十五首全是別人的老歌，每一首找不同的人來對唱。」**
   ——**那個模子在 `hook` 本體裡，依第 1814-B 條已被占用，「沒 claim」不等於可用。**
   **→ 本棒判這條事實上不可讓、退回不用**，`Minyo Crusaders` 改走「美軍住宅成軍」（第 2574 條（二）3）。
   **這是本信最該修的一句**：讓出清單裡的每一條，出清單之前要先確認**它不是讓出方自己 `hook` 的本體**。
   ⚠ 第 2544 條（二）3 其實已經自己寫出「本卡十五軌各自配一位不同的對唱客座」，**只是沒意識到那句話就是它的 `hook`。**
2. ⚠ **派工信 §三第 1 點把 `Nduduzo Makhathini` 說成與 `Melissa Aldana` 同形（「盤名是某個詞的另一種說法」）。**
   **`Nduduzo` 的實際形狀是「作者自己在內襯文裡解釋盤名的意思」，與「盤名＝某個外語詞的另一種唸法」不同形**
   ——嚴格說兩張可以各寫各的。**但本棒仍照派工信只歸一張**（可逆、且不歸也不影響 `Nduduzo` 的主故事鏈），
   盤名那格在該卡整格捨去。**記下來給後批：這是轉述時把「題材相近」寫成「骨架同形」，第 1779-B 條那一族。**

⚠ **不是牴觸、但值得記的三處**：
- 派工信 §四第 3 點說「a 組已交件，總標記現在應該可以到 0」——**實跑確實是 0（`全部通過 ✓`）**，與第 2547 條第 3 點預測一致。
- 派工信 §四第 1 點要求「對得上 217–227／中位 225 再量自己這組」——**三個數逐項對上，四格分佈也逐格對上**（第 2572 條（一））。
- 派工信 §六禁碰的檔案（`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／`previews.json`／`caa.json`／`c167-hooks-a.json`／其他批次檔案）
  **本棒全程只讀未寫**；`c167-hooks-a.json` 只讀（第 1764-B 條要求逐張讀過對組）。**未 `git commit`、未 `git push`、未動 git 索引。**

---

## 第 2578 條：**落地方式與重啟續跑（派工信 §五第 2 點）**

開工時 `desc-tools/batches/hooks/c167-hooks-b.json` **不存在**，無既有內容可續。
草稿全程存在 `scratchpad/c167b-draft.json`（每一輪修改整檔寫回），**量到 0 筆超標後一次寫進 repo 輸出檔**，
其後的兩次定點修改（第 2575 條的〈Isfahan〉、下述數字模子）**直接改 repo 檔並重跑兩支腳本**。

⚠ **本棒另外自查一項機器看不到的同構（第 1764-B 條那條「同一個數字句型出現三次以上也是同構」）**：
草稿一度有四張帶「N 軌裡有 M 軌」模子（`Nduduzo` 十六軌四首、`Walter Smith III` 十軌五軌、`Melissa Aldana` 八軌六首、`Julian Lage` 九軌五軌），
**改寫其中兩張（`Nduduzo` 改成「四首 reprise 散在盤上」、`Walter Smith III` 改成「進了其中五軌」）、`Julian Lage` 的移出 `note` 只留在 `hook`**，
**壓到 2 次**。`chk-hook-crossgroup` 對這個模子一次都不會亮。

**本節實際用掉 2571–2578，2579–2600 未用。**
