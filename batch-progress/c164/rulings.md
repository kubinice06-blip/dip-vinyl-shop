# c-164 a 組裁定（編號 1840–1867）

**本組 23 筆**（`batch-progress/c164/slice.json` 的 `g: "a"` 切片），
年份分布 **2016×1、2017×12、2018×10**，`slice.json` 的 `genre` 欄 23 筆全部逐字 `jazz`。
沿用 `c158`～`c162` 各批裁定、`c163/rulings.md`、
**`c163/rulings-mainline.md`（主線第 1718–1730 條）**，條文一字未改。
證據層三份原始快取已入庫：`batch-progress/c164/evidence-a/{mb,dg,apple}.json` ＋ `SOURCES.md`。

**本檔用掉 1840–1867，剩 1868–1869 未用。b 組另從 1870 起 append，本檔不碰那個號段。**

---

## 第 1840 條：交件總表

| 項目 | 數 |
|---|---:|
| 派下 | **23** |
| **收** | **22** |
| **退** | **1** |
| **退貨率** | **4.3%**（1／23，本線目前最低的一批） |
| 年份**改判** | **0**（23 筆全部覆核成立） |
| **盤名改判** | **3**（見第 1854 條） |
| (甲) 從未發行過的錄音首次以錄音發行 | 0 |
| **(乙) 母體原本就發在 Blue Note／Liberty／UA／Solid State** | **1**（Hank Mobley《Poppin'》，見第 1842 條） |
| (丙) 母體其實發在真正的他廠 | **0 成立／訊號亮 12 次**（見第 1844 條） |
| **(丁) 與既有卡部分重疊、形狀不同** | **13**（見下） |
| (戊) 四條再發系列 | **0 成立／訊號亮 2 次**（見第 1845 條） |
| (己) 這張碟的載體只有影像 | **0 成立／訊號亮 4 次**（見第 1846 條） |
| **現場盤（`live: true`）** | **3**（Akinmusire／Gregory Porter／Terence Blanchard，四層全部一致，見第 1859 條） |
| **撞陳列：撞卡（折鍵命中）** | **1**（即那筆退件） |
| **撞陳列：軌名撞 apex 王牌** | **1 處**（Tony Allen《The Source》的〈On Fire〉↔ `Galaxie 500 —《On Fire》(1989)` `hall`） |
| **撞陳列：盤名逐字撞池中卡名（非撞卡）** | **5 組共 14 張**（見第 1860 條） |
| **新掛名（池中 0 列的新字串）** | **6** |
| 紙本 | **本組不查**（主線第 1728 條：Billboard OCR 只覆蓋到 2015，本組全部 2016–2018） |
| **`node batch-progress/c164/chk-prop.mjs a` 標記** | **0** |

**(丁) 那 13 張**（池中已有同一藝人／同一系列的其他碟，形狀不同故收）：
Akinmusire（池中 3）／Brian Blade Fellowship（1）／山中千尋《Monk Studies》《Utopia》（3）／
Yaron Herman（1）／Götz Alsmann（5）／Tony Allen《The Source》（1）／José James《Love in a Time of Madness》《Lean On Me》（3）／
Kyoto Jazz Sextet（1）／Gregory Porter（4）／Wayne Shorter（14）／Terence Blanchard featuring The E-Collective（1）／
GoGo Penguin（3）／Marcus Miller（1）。
其餘 9 張裡 6 張是新掛名（Ben l'Oncle Soul／Charles Pasi／Trombone Shorty／Louis Hayes／Dave McMurray／The Nels Cline 4），
`Tony Allen & Jeff Mills` 是聯名新造。

---

## 第 1841 條：退表（逐筆）

| # | 掛名 | 盤名 | 年 | rgMbid | 理由分類 | 一句話證據 |
|---|---|---|---:|---|---|---|
| 1 | **Hank Mobley** | **Poppin'** | 2017 | `72dbc981-32e8-4a26-ad28-816020f01672` | **(乙) 純庫藏再發 ＋ 撞卡** | **Discogs 11635351 的 `series` 欄逐字 `Blue Note, The Masterworks, Top 50`、`formats` 逐字帶 `Reissue`／`Remastered`；而且 `seed_cards.json` 已有 `Hank Mobley —《Poppin'》(1980)`，折鍵 `hankmobley|poppin` 逐字相同。** |

**退貨率 1／23 ＝ 4.3%。**

---

## 第 1842 條：`Hank Mobley《Poppin'》2017` 退——三個理由各自獨立成立；⚠ 但**派工信指定的那條快捷查法（第 1763 條）實查沒中**

派工信地雷 1 逐字說「**第 1763 條：MB `label-info` 同時並列老號段與日版號段，(乙) 直接成立，不必再查 Discogs。先跑這一條**」。
**本棒先跑了，沒中**：MB release `26c754c7`（2017 JP Official SHM-CD 5 軌，barcode `4988031254431`）的
**`label-info` 只有一格，逐字 `Blue Note [713c4a95]` catno `UCCQ-9319`——沒有並列任何老號段。**
**第 1763 條那個形狀在本張不成立，必須退回查 Discogs。**（這一點請後批知悉：**那條快捷查法是充分條件不是必要條件，沒中不等於不是 (乙)。**）

**查完 Discogs 之後，三個理由各自獨立成立**：

1. **(戊) 名單以外的再發系列 → 依第 1813 條改判 (乙)。**
   **Discogs 11635351（2017 日版）的 `series` 欄逐字 `Blue Note, The Masterworks, Top 50`、
   `formats` 逐字 `CD, Album, Limited Edition, Reissue, Remastered (SHM-CD)`。**
   ⚠ **`Blue Note, The Masterworks` 正是 c-163 b 第 1813 條對 `Lonnie Smith《Turning Point》` 判過的那一條系列**
   （該條逐字：「日版 SHM-CD 化，而且原盤已經發過卡」）——**同形，照先例走。**
2. **(乙) 母體本來就是 Blue Note 的庫藏。**
   Discogs 全庫八筆同碟條目，逐字排下來就是一部 Blue Note 庫藏史：
   `GXF 3066`（1980 日版 LP，`series` 逐字 **`ブルーノート世界初登場1800シリーズ`**）、
   `GXK 8163`（1981 日版 LP，`series` 逐字 **`Unissued Masters Series Part 1`**）、
   `TOCJ-1620`＋`LP-1620`（1996 日版 CD，`series` 逐字 **`The BN Works 1500 Unissued`**，
   ⚠ **這一筆的廠牌欄兩格正是第 1763 條那個「老號段 ＋ 日版號段」的形狀，只是它在 Discogs 不在 MB**）、
   `UCCQ-5020`（2014 SHM-CD，`series` 逐字 `Blue Note, The Masterworks` ＋ **`75 Blue Note`**，⚠ **(戊) 名單上的第一條**）、
   `B0030597-01`（2020 LP，`series` 逐字 **`Blue Note Tone Poet Series`**，⚠ **(戊) 名單上的第三條**）。
   **③ `bluenote.com/artist/hank-mobley/` 也逐字寫了：「Poppin' was one of many sessions tenor saxophonist Hank Mobley
   recorded in the late '50s and early '60s but remained unreleased until the late '70s and '80s」。**
   **錄於 1957（Discogs companies 逐字 `Recorded At: Van Gelder Studio, Hackensack, New Jersey`），
   1980 年首度發行——2017 這張是第五次再發。**
3. **撞卡。** `seed_cards.json` 已有 `Hank Mobley —《Poppin'》(1980)`（曲風欄逐字 `["jazz"]`、非 apex），
   `batch-progress/c145/prop-a.json` 也有同一張。**折鍵 `hankmobley|poppin` 逐字相同，`chk-prop` 會直接標記。**
   ⚠ **Apple us／jp／gb／fr／de 五地區的 `1494403691` 的 `releaseDate` 逐字是 `1980-01-01T08:00:00Z`、
   ℗ 欄逐字 `A Blue Note Records Release; ℗ 1980 Capitol Records, LLC`**——**Apple 自己也把它歸在 1980，
   而那個 `01-01T08:00:00Z` 正是第 1601 條說的年初佔位日，不可當街頭日引用。**

**(甲) 不成立**：1980 年那次首發才是「首次以錄音發行」，而**那一張池中已經有卡**。

---

## 第 1843 條：imprint 前置閘——23 筆全部跑過，**23／23 過閘**，但過閘的理由分四種

依 c-163 a 第 1794 條的分界跑：**不是「Discogs 廠牌鏈第一格是不是 Blue Note」，是「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note」。**

| 過閘形狀 | 筆數 | 例 |
|---|---:|---|
| **Discogs 零售條目的廠牌欄第一格全部逐字 `Blue Note`** | 15 | Akinmusire／Trombone Shorty／Louis Hayes／José James×2／Nels Cline 4 等 |
| **MB 只有部分 release 掛 Blue Note，Discogs 零售全中** | 4 | **Ben l'Oncle Soul**（MB 法版首發逐字 `Mercury Music Group [67ca3fec]`，但 Discogs 加／法／歐／日四筆廠牌欄第一格全是 `Blue Note`）／Charles Pasi／GoGo Penguin／Tomorrow Comes The Harvest |
| **廠牌欄是 Blue Note 的地區分支或子廠印** | 3 | `Blue Note France`（Tony Allen《The Source》的歐版兩筆）／`Blue Note Lab`（Tomorrow Comes The Harvest 的 10"）／`Blue Note Records` 唱片公司層實體（見下） |
| **MB 給的是唱片公司層實體、不是 imprint** | 1 | **Terence Blanchard《Live》**：MB `ceb58d31` 的 label-info 逐字 `Blue Note Records`、MBID `d3865f1e-ae0c-4a97-99b9-016966d49cb5`，**本棒實查該實體，disambiguation 欄逐字「this is the record company; for release labels use its imprint "Blue Note"」** |

⚠ **`Nihon Blue Note [76903afe]`（c-163 b 第 1817 條的陷阱）本組 0 筆**——
**逐筆查過，23 筆的 MB label-info 裡出現的 Blue Note 實體只有兩個：imprint `713c4a95-6616-442b-9cf6-14e1ddfd5946`（22 筆）
與唱片公司 `d3865f1e-ae0c-4a97-99b9-016966d49cb5`（1 筆）。**
⚠ **派工信點名要認得的歐洲公版再發廠（`EJC`／`AJC`／`WaxTime`／`Jazz Wax Records`／`Blue Moon`）本組一家都沒出現**——
**合理：那五家做的是 1950–60 年代錄音的公版再發，本組全部是 2016–2018 的新錄音。**

---

## 第 1844 條：(丙) 的訊號亮 **12 次**、**一次都不成立**；歸納成四種假陽性，**其中第四種本線沒見過**

| # | 卡 | ℗／廠牌欄逐字 | 假陽性型別 |
|---|---|---|---|
| 1 | Brian Blade Fellowship | `Blue Note Records; ℗ 2017 Middle Way Music, LLC, under exclusive license to UMG Recordings, Inc.` | **A：藝人自有公司 ＋ `under exclusive license to`**（第 1753(4)／1770 條） |
| 2 | Wayne Shorter《Emanon》 | `Blue Note Records; ℗ 2018 Wayne Shorter, under exclusive license to UMG Recordings, Inc.` | **A**（℗ 主體逐字就是藝人本人） |
| 3 | The Nels Cline 4 | `Blue Note Records; ℗ 2018 Memorize and Destroy, under exclusive license to UMG Recordings, Inc.` | **A** |
| 4 | Gregory Porter | `℗ 2018 Golden Slipper Publishing Inc, under Exclusive Licence to Decca Records France` | **A** |
| 5 | Marcus Miller | `℗ (C) 2018 Hannibal L.L.C.` ＋ Discogs `Licensed To: UMG Recordings, Inc.`／廠牌欄第二格逐字 `3 Deuces Records` | **A**（兩家都是他自有） |
| 6 | Götz Alsmann《In Rom》 | `℗ 2017 ROOF Music, under exclusive license to Universal Music Strategic Marketing…` | **B：長期合作的在地製作廠**（c-162 a 第 1750 條與 c-163 a 對同一實體已裁定兩次，照先例） |
| 7 | Charles Pasi | Apple `℗ 2017 Decca Records France`／MB 數位 label-info `Decca Records France [6900cc9e]` | **C：Universal 同集團的姊妹部門**（管 Blue Note France／歐洲線） |
| 8 | Yaron Herman | 同上 | **C** |
| 9 | Tony Allen《The Source》 | 同上；Discogs 歐版廠牌欄第一格逐字 `Blue Note France` | **C** |
| 10 | GoGo Penguin | Apple `℗ 2018 Decca Records France`／Discogs `(p): Decca Records`／MB 一筆數位 label-info `Decca Records [f18f3b31]` | **C** |
| 11 | Tomorrow Comes The Harvest | Apple `℗ 2018 Decca Records France`；2024 再上架那筆 label-info `Universal Music Division Decca Records France [9c314019]` | **C** |
| 12 | **Ben l'Oncle Soul** | **Apple `℗ 2016 Decca Records France`／Discogs companies `(p): Mercury Music Group`／MB 法版首發 label-info 逐字 `Mercury Music Group [67ca3fec]`** | ⚠ **D（本線沒見過的一種）** |

⚠ ⚠ **第四種（D）值得單獨記**：**前三種都能靠「℗ 主體是誰」判掉，D 不行**——
**`Mercury Music Group` 既不是藝人自有、也不是製作廠、而且它在 MB 端直接佔了首發 release 的 `label-info` 那一格，
`Blue Note` 在 MB 端只出現在日版。**
**唯一判得掉的路徑是第 1794 條的那句話：「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note」——
② Discogs 四筆零售（加拿大 `5713092`／法版 `571309-2`／歐版 `571779-4`／日版 `UCCM-1239`）的廠牌欄第一格逐字全部是 `Blue Note`。**
**→ 給後批的一句：MB 的 `label-info` 不足以判 imprint，必須把 Discogs 的零售條目全部列出來再判。**
⚠ **這一條同時反證了 `slice.json` 的 `note` 欄**：那筆逐字寫「僅 JP 盤」，**實查不成立**（見第 1865 條）。

---

## 第 1845 條：(戊) 的訊號亮 2 次——1 成立 1 不成立；**新立一句：`series` 欄才是判據，SHM-CD／HQCD／UHQCD 這些日本載體不是**

| # | 卡 | Discogs `series` 欄逐字 | 判 |
|---|---|---|---|
| 1 | **Hank Mobley《Poppin'》2017** | **`Blue Note, The Masterworks, Top 50`** | **成立 → 依第 1813 條改判 (乙)，退**（第 1842 條） |
| 2 | Gregory Porter《One Night Only》 | **`Eagle Rock Films`** | **不成立、收** |

**`Eagle Rock Films` 不成立的兩個理由**：**(a)** 它是 Universal 旗下**音樂影像發行線**的系列名，不是 (戊) 名單上的四條再發系列
（Blue Note 75／80、Tone Poet、Classic Vinyl、Blue Note Review），也不是第 1783 條的 `Music Matters`、第 1813 條的 `Blue Note, The Masterworks`；
**(b)** 本碟是 **2018-04-02 的新錄音、2018-11-30 首發**，**在定義上不可能是再發**。

⚠ ⚠ **新立（本組的對照組給得很乾淨）**：
**本組有 6 張帶 SHM-CD／HQCD／UHQCD／Limited Edition 的日本載體**——
Brian Blade Fellowship（日版 `UCCQ-1076` SHM-CD）、山中千尋《Monk Studies》（`UCCQ-1070` SHM-CD ＋ `UCCQ-9303` Ultimate HQCD）、
山中千尋《Utopia》（`UCCJ-2157` SHM-CD ＋ `UCCJ-9215` UHQCD）、Wayne Shorter《Emanon》（日版 `UCCQ-9403` 3×SHM-CD）、
José James《Lean On Me》（日版 `UCCQ-1088` SHM）、GoGo Penguin（日版 `UCCQ-1080`）。
**這六張的 Discogs `series` 欄逐字全部是空陣列，`formats` 也全部沒有 `Reissue`／`Remastered`——六張全收。**
**而退掉的 Hank Mobley 那張同樣是 SHM-CD，差別只在 `series` 欄有字、`formats` 帶 `Reissue, Remastered`。**
**→ 給後批：日本的高規格 CD 載體（SHM-CD／HQCD／UHQCD／Blu-spec）本身不是 (戊)／(乙) 的判據，
`series` 欄與 `formats` 的 `Reissue`／`Remastered` 描述才是。** 這是第 1705-A 條第 2 點（「盤名像系列名時先看 `series` 欄」）的延伸。

---

## 第 1846 條：(己) 的訊號亮 4 次、一次都不成立；**其中一次是「漫畫不是影像載體」，本線第一次遇到**

| # | 卡 | `format` 逐字 | 判 |
|---|---|---|---|
| 1 | Gregory Porter《One Night Only》 | MB `4be43f95` 逐字 **`CD 19 軌 ＋ DVD-Video 20 軌`**；Discogs 12988484 逐字 `CD, Album ＋ DVD, Album`，companies 逐字 `Filmed At: Royal Albert Hall` | **不成立**：另有美加版單 CD（Discogs 13011962）、兩筆純音訊數位、Apple 19 軌純音訊 |
| 2 | Götz Alsmann《In Rom》 | Discogs 11443508 逐字 `CD, Album ＋ DVD, DVD-Video` | **不成立**：另有單 CD（`5763319`）與 2LP＋CD（`5763323`） |
| 3 | 山中千尋《Monk Studies》 | MB `039ae8c0` 逐字 `HQCD 10 軌 ＋ DVD-Video 3 軌` | **不成立**：DVD 是完全生產限定盤的附件，同批有單 SHM-CD、LP 與兩筆數位 |
| 4 | 山中千尋《Utopia》 | MB `3876e319` 逐字 `HQCD 12 軌 ＋ DVD-Video 3 軌` | **不成立**：同上 |

**(己) 的條文是「這張碟的載體只有影像」——上面四筆的純音訊載體都是獨立存在的，一筆都不是。**

⚠ ⚠ **第五個要交代的是 `Wayne Shorter《Emanon》`，派工信地雷 7 逐字點名「三張一套的漫畫＋CD 盒裝，`format` 欄會很複雜」。**
逐層看完：**MB `9b53be5a` 的 media 逐字 `CD 4 軌 ＋ CD 2 軌 ＋ CD 4 軌`（三片、合計 10 軌）；
③ bluenote.com 逐字「Emanon is a physical-only release that will be available in two versions;
a Standard Edition that packages 3x CDs with the graphic novel, and a Deluxe Edition that packages 3x 180g vinyl LPs and 3x CDs
with the graphic novel enclosed in a beautiful hardcover slipcase」。**
**裁定：(己) 不成立。漫畫（graphic novel）是一本書，不是 (己) 所指的影像載體（雷射影碟／DVD／藍光那一類）；
載體是三片 CD（豪華版另加三張 LP），全部是純音訊。**
⚠ **也要與第 1704 條（(甲) 的第六種形狀）分清**：那條講的是「先前只以影像載體發行過的錄音」，
**本張是全新錄音、沒有先前的發行，兩件事無關。**
⚠ **附帶**：官網說它 `physical-only`，**但 Apple 現在五地區都有 `1449097210`（11 軌）**——上架固定試聽配得到，只是曲數與實體 10 軌不一致。

---

## 第 1847 條：掛名總表——**沿用池中 14、新字串 6、聯名新造 1、團名形新造 1、新造分裂 0**

### （一）沿用池中既有字串 **14**（第 307 條）
`Ambrose Akinmusire`（seed 1＋prop 2）／**`Brian Blade Fellowship`**（prop 1，**見第 1848 條**）／
`山中千尋`（prop 3，**漢字，主線第 1672 條**）×2 張／`Yaron Herman`（prop 1）／`Götz Alsmann`（prop 5）／
`Tony Allen`（seed 1）／`José James`（prop 3，**帶重音**）×2 張／`Kyoto Jazz Sextet`（prop 1）／
`Gregory Porter`（seed 4）／`Wayne Shorter`（seed 13＋prop 1，**裸名**）／
**`Terence Blanchard featuring The E-Collective`**（prop 1，**見第 1850 條**）／`GoGo Penguin`（seed 3）／`Marcus Miller`（prop 1）。

### （二）新字串 **6**（池中皆 0 列；羅馬字／漢字／片假名三形都掃過）
| 掛名 | MB 實體 | 第 307 條反查 |
|---|---|---|
| **`Ben l'Oncle Soul`** | Person／FR，`2dbdbbad-9427-4360-b6c7-13a2f7214627` | **撇號取 ASCII 形**，見第 1853 條 |
| **`Charles Pasi`** | Person | 四邊一致，`Charles Pasi` 全 ASCII |
| **`Trombone Shorty`** | Person | MB／Discogs 四筆／Apple 五地區／③ bluenote.com 四邊一致；本名 `Troy Andrews` 也掃過，seed 0 |
| **`Louis Hayes`** | Person | 四邊一致 |
| **`Dave McMurray`** | Person | MB／Apple／③ bluenote.com 三邊一致（⚠ **② Discogs 全庫 0 筆**，見第 1857 條） |
| **`The Nels Cline 4`** | Group | **團名形新造，見第 1849 條** |

### （三）聯名新造 **1**：**`Tony Allen & Jeff Mills`**——見第 1851 條。
### （四）團名形新造 **1**：**`The Nels Cline 4`**——見第 1849 條。
### （五）新造分裂 **0**。`chk-prop` 的「同 rgMbid 不同掛名 0」「跨批撞卡 0」兩道全過。

---

## 第 1848 條（派工信地雷 4 第一組，**本組最需要寫清楚的掛名**）：**`Brian Blade & The Fellowship Band《Body and Shadow》` 判沿用池中的 `Brian Blade Fellowship`**

| 來源 | 掛名欄逐字 |
|---|---|
| `slice.json`（抄 MB） | `Brian Blade & the Fellowship Band` |
| **MB artist-credit** | **兩格：`Brian Blade` ＋ joinphrase ` & ` ＋ `the Fellowship Band`（小寫 the）** |
| **④ Apple 五地區 `1445882915`** | **`Brian Blade & The Fellowship Band`（大寫 The）** |
| **③ bluenote.com 內文** | **`Brian Blade & The Fellowship Band marks its 20th anniversary in 2017…`** |
| ⚠ **② Discogs 三筆 `artists_sort`** | ⚠ **`Brian Blade Fellowship`**（11291364／11538232／12960190） |
| ⚠ **Apple jp** | 片假名 `ブライアン・ブレイド&ザ・フェロウシップ・バンド`（池中 0 列） |
| ⚠ ⚠ **池中既有** | ⚠ ⚠ **`Brian Blade Fellowship —《Perceptual》(2000)`（`batch-progress/c156/prop-b.json`）** |

**→ 判 `Brian Blade Fellowship`。理由三層**：

1. **第 1703 條（主線）收斂出來的那一句直接適用**：「**先看池中有沒有同系列前作；有就沿用那個字串，沒有才建團名形**」——**池中有。**
2. **與第 1768 條《Black Radio 2》同形、同處置**：三邊（這裡是 MB／Apple／官網）用另一形**只是必要非充分條件**（第 1657 條（四）／第 1665 條）；
   **《Perceptual》在 `c156/prop-b.json` 裡，本棒依派工信第七節的邊界不得動它**——**只能往既有字串靠、不能往新形靠，
   否則池中必然出現「第二張掛 A 形、第五張掛 B 形」的分裂。**
3. **與第 1727 條那個反例要分清。** `Charles Lloyd & the Marvels` 之所以不適用第 307 條，是因為池中的鄰居字串
   （多了 `Featuring Lucinda Williams`）**代表另一組編制**；**本張不是**——**③ bluenote.com 同一頁逐字說這是「their sublime fifth album」、
   樂團 1997 年成軍（官網逐字「Formed in 1997, the band released their eponymous Blue Note debut in 1998」）至今同一批人**，
   **是同一支樂團改了寫法，不是換了編制。**

⚠ **`chk-prop` 完全抓不到這一筆**：`brianbladefellowship` 與 `brianbladeandthefellowshipband` **折鍵後不同鍵**，四道都不亮（盲點三）。
⚠ **代價要講明**：**池中這支樂團會是「用 1998–2000 年的團名寫法去掛 2017 年的碟」。**
本棒認為這個代價小於分裂的代價，**但這是可逆的（改的是卡單值、不動卡池結構），本機審稿層若判相反，改一格即可。**
⚠ **`Brian Blade` 在本組出現兩次**：本張之外，他也是 `Wayne Shorter《Emanon》` 的鼓手（官網逐字）。**兩張卡的敘事不得互相佔用。**

---

## 第 1849 條（派工信地雷 4 第二組）：**`The Nels Cline 4` 建團名形——三個字串同一人，逐一掃完，不算分裂**

三個字串各自掃過池中：

| 字串 | seed | prop | 代表的編制 |
|---|---:|---:|---|
| `Nels Cline`（裸名） | **0** | **1**（`c163/prop-b.json`《Lovers》2016） | **大編制管弦企劃**（③ 官網逐字「a "quietly ravishing double-album" featuring Cline with a large ensemble conducted and arranged by Michael Leonhart」） |
| **`The Nels Cline 4`** | **0** | **0** | **2018 年首度亮相的四重奏**（Cline／Julian Lage／Scott Colley／Tom Rainey） |
| `The Nels Cline Singers` | **0** | **0**（`c-164 b` 的 slice 另有一張） | 他 2000 年就開始的另一支長年樂團（③ 官網逐字「an expanded line-up of The Nels Cline Singers took things up a notch on 2020's…」） |

**→ 判建團名形 `The Nels Cline 4`。理由兩層**：

**(a) 第 1703 條的反面條件成立——池中沒有同系列前作，而且這件事有官網逐字保證：
③ `bluenote.com/artist/nels-cline/` 逐字「With Currents, Constellations, Cline's second Blue Note release,
we hear the debut of The Nels Cline 4, made up of Cline and Lage plus the fierce and versatile rhythm section of
bassist Scott Colley and drummer Tom Rainey」——「the debut of」四個字把「沒有前作」寫死了。**
**(b) 三邊門檻過**：**MB artist-credit 逐字 `The Nels Cline 4`（Group 實體、單一 credit）、
Apple 五地區 `artistName` 逐字 `The Nels Cline 4`、③ bluenote.com 逐字 `The Nels Cline 4`——三邊一字不差。**
⚠ **Discogs 的 `Nels Cline 4, The` 不計入**：定冠詞後置是站方排序欄的體例，**同一筆的 `uri` 逐字是 `.../11862405-The-Nels-Cline-4-Currents-Constellations`。**

**直接先例是第 1769 條（四）的 `Wayne Shorter Quartet`（池中十三張裸名仍然建了團名形，因為那十三張全是別的編制）
與 c-159 a 的 `Wynton Marsalis Quartet`。**
⚠ **三個字串折鍵後互不同鍵，`chk-prop` 抓不到這組（盲點三），三形都已寫進該卡的 `queryAlias`。**
⚠ **給 c-164 b 一句**：**`The Nels Cline Singers` 那張也照同一條判——它同樣是一支池中沒有前作的獨立樂團，建自己的字串，不併裸名。**

---

## 第 1850 條（派工信地雷 3）：**`Terence Blanchard featuring The E-Collective《Live》`——連字號取 ASCII、形取池中的 `featuring` 形；⚠ 並指出派工信這一段自相矛盾**

**(一) 連字號碼位。**
**MB artist-credit 第二格逐字 `The E‐Collective`，中間是 U+2010。**
② Discogs 三筆的 uri 逐字 `Terence-Blanchard-Featuring-The-E-Collective`、
④ Apple 五地區 `collectionName` 逐字 `Live (feat. The E-Collective)`、
③ bluenote.com 內文與 Releases 區逐字 `The E-Collective`——**三邊都是 ASCII `-`（U+002D）。取 ASCII。**
⚠ **`chk-prop` 的掛名連字號檢查會直接標記 U+2010**（本棒實測），取 ASCII 後標記 0。
⚠ **這與 c-163 b 對同一個掛名的處置一致**（派工信逐字說那批「Discogs／Apple／Billboard 三邊都是 ASCII `-`，已改 ASCII」）。

**(二) `featuring` 形還是 `&` 形。**
**MB 給 `&` 形（joinphrase 逐字 ` & `）；Discogs／Apple／bluenote.com 三邊給 `featuring`／`feat.` 形；
而池中 `batch-progress/c163/prop-b.json` 已有 `Terence Blanchard featuring The E-Collective —《Breathless》(2015)`。**
**→ 判沿用池中形（第 307 條），並取小寫 `featuring`——那是池中先例的逐字形。**
⚠ **Discogs 的 `Featuring`（大寫 F）不計入大小寫的票**：`artists_sort` 逐字是 `Terence Blanchard Featuring E-Collective, The`，
**定冠詞後置 ＋ 全詞大寫，兩個都是站方體例。**

**(三) ⚠ ⚠ 派工信這一段自相矛盾，在此指出（派工信自己要求「發現牴觸要在回報裡指出來」）。**
地雷 3 一方面逐字寫「**本組照 MB `artist-credit` 逐字取形，不可留非 ASCII 連字號**」，
一方面又逐字寫「**先掃池中既有形，有就沿用（第 307 條）**」。
**MB 給的是 `&` ＋ U+2010，兩句話指向不同結果，而且第一句本身就自相矛盾
（「照 MB 逐字取形」與「不可留非 ASCII 連字號」在這張碟上不可能同時滿足，因為 MB 的逐字形裡就有 U+2010）。**
**本棒依第 307 條與正本的去重優先原則採後者。** 若照前者走，會同時製造兩個問題：
**非 ASCII 連字號（`chk-prop` 直接標記）＋ `&`／`featuring` 分裂（盲點一，折鍵抓不到）。**

⚠ **不與裸名 `Terence Blanchard` 併**：池中裸名有 5 筆 prop（c-158 b／c-159 b／c-160 b／c-162 b），
**那是他自己的五重奏、不是 E-Collective**；c-163 b 已為這支編制另建字串，本張照走（比照第 1727 條）。

---

## 第 1851 條（派工信地雷 4 第三組）：**`Tony Allen & Jeff Mills` 取 `&` 式；同組 `Tony Allen` 另一張判裸名，兩張各照自己的發行品**

**(一) 逗號式還是 `&` 式。**

| 來源 | 逐字 |
|---|---|
| **MB artist-credit** | **兩格：`Tony Allen` ＋ joinphrase `, ` ＋ `Jeff Mills`（逗號式）** |
| **② Discogs 四筆 `artists_sort`** | **`Tony Allen, Jeff Mills`（逗號式）** |
| **④ Apple 五地區 `artistName`** | **`Tony Allen & Jeff Mills`（`&` 式）**；jp 逐字 `トニー・アレン & ジェフ・ミルズ` |

**→ 依第 1539 條（聯名取 `&`）判 `Tony Allen & Jeff Mills`。**
⚠ **這一筆 `chk-prop` 也抓不到**：逗號式折出 `tonyallenjeffmills`、`&` 式折出 `tonyallenandjeffmills`（`k()` 先把 `&` 換成 `and` 再剝），
**兩者不同鍵**（盲點一）。**池中兩形都掃過，皆 0 列。**

**(二) `Tony Allen` 本組兩張的掛名分開判。**
**《The Source》判裸名 `Tony Allen`**（四邊逐字皆裸名 ＋ 池中 seed《Lagos No Shaking》(2006) 同形，第 307 條）；
**《Tomorrow Comes The Harvest》判聯名新字串**。
**依第 1131 條（不同編制各自成立）與第 1769 條（三）`Elvis Costello and The Roots` 的同形處置：
池中的 `Tony Allen` 1 列與 `Jeff Mills` 11 列一列都不動，聯名是新建一個本來不存在的字串，不是把既有主體拆開。**
⚠ **`Jeff Mills` 池中 11 列裡有一張 apex `hall`（《Mix-Up Vol. 2: Live Mix at Liquid Room, Tokyo》1996）**——
**零軌重疊、非同碟，但下游敘事碰 Mills 的 techno 背景時不得把論述滑到那張王牌上。**

---

## 第 1852 條（派工信地雷 2）：**日本線三張的掛名直接照用；⚠ 但「日本線盤名以 universal-music.co.jp 為準」那句，本棒三次都以第 307 條壓過它**

**(一) 掛名，照主線第 1672 條與 c-163 a 第 1817 條，不再議。**
- **`山中千尋`**（《Monk Studies》《Utopia》兩張）。**店面層正面佐證：
  Apple jp `1440890874`／`1384328786` 的 `artistName` 逐字都是 `山中千尋`；
  ③ universal-music.co.jp 兩個商品頁的 title 逐字 `モンク・スタディーズ [SHM-CD][CD] - 山中千尋`／`ユートピア [SHM-CD][CD] - 山中千尋`。**
  （Apple us／gb／fr／de 與 MB／Discogs 逐字都是 `Chihiro Yamanaka`，已進 `queryAlias`。）
- **`Kyoto Jazz Sextet` 保留拉丁**（`ALBUM_ONBOARDING.md` §0.5 的但書：官方藝名本身就是拉丁字者保留），
  且第 307 條有 c-163 b《Mission》的先例。
  ⚠ **全大寫形 `KYOTO JAZZ SEXTET` 出現在兩處**（Apple jp `1440897383` 與 ③ 官網頁面 title），**不採**——
  **Apple gb／fr／de 三地區 ＋ MB ＋ Discogs 三筆逐字都是首字大寫形，五比二。**
- ⚠ **不與 `Kyoto Jazz Massive` 併**：池中 seed 有《Spirit of the Sun》(2002) 一列，**那是沖野兄弟的另一個團**
  （比照第 1769 條（二）「池中的 `James —《Laid》` 是英國同名樂團，不併」）。

**(二) ⚠ ⚠ 盤名：派工信逐字說「日本線盤名以那裡（universal-music.co.jp）為準」，本棒三張都沒照做，理由是第 307 條。**

| 卡 | ③ 官網 title 逐字 | 其餘來源逐字 | 本棒取 |
|---|---|---|---|
| 山中千尋《Monk Studies》 | **`モンク・スタディーズ`** | MB RG／Discogs 四筆／Apple 五地區（含 jp）逐字 `Monk Studies` | **`Monk Studies`** |
| 山中千尋《Utopia》 | **`ユートピア`** | MB RG／Discogs 三筆／Apple 四地區逐字 `Utopia`；⚠ **官網自己的曲目表第一軌就逐字並列 `ユートピア Utopia`** | **`Utopia`** |
| Kyoto Jazz Sextet《Unity》 | **`UNITY`**（全大寫） | MB／Discogs 三筆／Apple 四地區逐字 `Unity` | **`Unity`** |

**理由：池中山中千尋既有三張（c-163 a《Somethin' Blue》、c-163 b《Syncopation Hazard》《Guilty Pleasure》）
與 Kyoto Jazz Sextet 的《Mission》，盤名逐字全部是拉丁形、片假名形一律只進 `queryAlias`。
改走片假名會讓同一條線在池中裂成兩種命名體例（第 307 條壓過派工信的單句指示）。**
⚠ **`UNITY` 的全大寫是日本商品頁的排版體例，不是盤名。**
**本棒把三筆的衝突都寫進了各卡的 `risk`，也記在這裡，請主線知悉。**

**(三) 操作面，給後批省時間**：
**`universal-music.co.jp` 的藝人 slug 是「名在前、連字號」的羅馬字**——
`chihiro-yamanaka/products/uccq-1070/`（200）、`chihiro-yamanaka/products/uccj-2157/`（200）、
`kyoto-jazz-sextet/products/uccj-2143/`（200）；
⚠ **`yamanaka-chihiro/...`（姓在前）回 404、目錄號用大寫也回 404、站內 `search/?q=` 是 JS 產生的、HTML 裡沒有結果。**
**必須用「小寫 slug ＋ 小寫目錄號」直接打商品頁。**

---

## 第 1853 條（派工信地雷 5，`chk-prop` 盲點七／第 1702 條）：**三筆標點字元逐字元核完**

| 筆 | 問題 | 逐字元查證 | 判 |
|---|---|---|---|
| **`Ben l'Oncle Soul`** | 撇號是 ASCII 還是 U+2019？ | **`slice.json` 與 MB artist-credit 逐字 `Ben l’Oncle Soul`（U+2019）；Apple us `1442850987`／gb-fr `1440885475` 的 `artistName` 逐字 `Ben l'Oncle Soul`（U+0027）；Discogs 四筆逐字 `Ben L'Oncle Soul`（U+0027，但 `L` 大寫）** | **`Ben l'Oncle Soul`**——**撇號 ASCII（Apple 對 MB 二比一）＋ 小寫 `l`（MB＋Apple 對 Discogs 二比一）** |
| **`Poppin'`** | 同上 | **Discogs 八筆與 Apple 五地區逐字都是 ASCII `Poppin'`（U+0027）；MB RG title 逐字亦為 ASCII**；⚠ **1970 年代那筆日版 LP（Discogs 5818342）的軌目逐字連撇號都沒有（`Poppin`）** | **不適用——這張退了**（第 1842 條）；池中既有的《Poppin'》(1980) 逐字也是 ASCII，形狀一致 |
| **`Louis Hayes《Serenade For Horace》`** | `For` 大寫是否照盤面？ | **`slice.json`／MB RG title／Discogs 三筆逐字 `Serenade For Horace`；④ Apple 五地區 `1442907864` 逐字 `Serenade for Horace`；③ bluenote.com 內文兩處逐字都是 `Serenade for Horace`** | **改判 `Serenade for Horace`**（小寫，見第 1854 條） |

⚠ **22 張收件卡的 `artist` 與 `album` 兩欄全部逐字元查過碼位**，非 ASCII 字元清單：
`Götz Alsmann` 的 `ö`（U+00F6）、`José James` 的 `é`（U+00E9，兩張）、`山中千尋`（全 CJK，兩張）。
**沒有任何一張留下連字號類字元（U+2010／U+2011／U+2012／U+2013／U+2014／U+2015／U+FF0D）或 U+2019 撇號**，
**`chk-prop` 的三道字元檢查（`album` 連字號／`artist` 連字號／U+30FC 誤用）全部不亮，且這次的「不亮」是逐字元核過的、不是折鍵摺掉的。**

---

## 第 1854 條：**盤名改判 3 筆；並新立一句——② Discogs 的全詞大寫是站方體例，不計入「大小寫」那一票**

| # | 卡 | slice／MB 逐字 | 改判為 | 依據 |
|---|---|---|---|---|
| 1 | Ambrose Akinmusire | `A Rift In Decorum` | **`A Rift in Decorum: Live at the Village Vanguard`** | **副標題三比一**（Discogs 三筆＋Apple 五地區＋③ 官網都有副標，只有 MB 沒有）；**大小寫取 ④ Apple 與 ③ 官網一字不差的那一形**（③ 逐字 `A Rift in Decorum: Live at the Village Vanguard (2017)`） |
| 2 | Louis Hayes | `Serenade For Horace` | **`Serenade for Horace`** | 扣掉 Discogs 的體例大寫後，**④ Apple ＋ ③ 官網 二比一壓 ⑤ MB**，而 ④③ 的權重都在 ⑤ 之前（主線第 1728 條） |
| 3 | José James | `Lean on Me` | **`Lean On Me`** | **② Discogs 三筆 ＋ ④ Apple 五地區 ＋ ③ 官網的 Releases 條目與新聞稿（`OUT SEPT. 28`／`the September 28 release of Lean On Me (Blue Note)`）**；⚠ **③ 官網同頁散文用小寫、MB 的 JP 數位 release title 逐字又是大寫——兩邊自己都不一致，取權重最高的兩層** |

⚠ ⚠ **新立（本組給出了四筆反證，足以當通則）：`Discogs` 的標題欄把每個詞的首字母都大寫，是站方體例，不是盤面。**
四筆反證（左為 Discogs 逐字、右為 ③ bluenote.com／④ Apple 逐字）：
`Love In A Time Of Madness` ↔ **`Love in a Time of Madness`**；
`Body And Shadow` ↔ **`Body and Shadow`**；
`A Rift In Decorum: Live At The Village Vanguard` ↔ **`A Rift in Decorum: Live at the Village Vanguard`**；
`Serenade For Horace` ↔ **`Serenade for Horace`**。
**→ 給後批：Discogs 仍是 ② 權重第一，但它的票只算「有沒有這個詞／有沒有副標題／標點是什麼」，
不算「哪個字母大寫」。大小寫的票要看 ④ Apple 與 ③ 廠牌官網。**
⚠ **反過來也要守住**：**`Lean On Me` 那筆不是被 Discogs 一票決定的**——Apple 與官網商品條目都站在大寫那邊，Discogs 只是第三票。
⚠ **另外兩筆沒改但要記**：
**Gregory Porter《One Night Only: Live At The Royal Albert Hall》有五種形**（MB RG 冒號形／Discogs 三筆各一種標點／Apple 帶 `/ 02 April 2018`），
**取 ⑤ MB RG 與 ③ 官網 Releases 條目一字不差的冒號形**；
**`Tony Allen & Jeff Mills《Tomorrow Comes The Harvest》` 取大寫 `The`**（②＋④ 對 ⑤）。
**四筆全部折鍵後同鍵，`chk-prop` 一道都不會亮（盲點二／盲點四）。**

---

## 第 1855 條：年份——**改判 0、覆核成立 23**；四層俱全 3 筆，兩層可用 2 筆

**23 筆全部跑過 MB `first-release-date` × Discogs `released` × Apple `releaseDate` 三層對照**（日本線三張另加 ③ universal-music.co.jp 的 `発売日`）。

- **四層逐日相符 3 筆**：山中千尋《Monk Studies》（`2017-06-21`）／《Utopia》（`2018-06-20`）／Kyoto Jazz Sextet《Unity》（`2017-06-14`）。
- **三層逐日相符 17 筆。**
- **只有兩層可用 2 筆**（依派工信第三節「兩層以上可用就取多數」）：
  **`Louis Hayes《Serenade for Horace》`**（MB frd 逐字只有 `2017`；Apple `2017-05-26T07:00:00Z` ＋ Discogs 兩筆 `2017-05-26`）、
  **`Terence Blanchard featuring The E-Collective《Live》`**（MB frd 逐字只有 `2018`；Apple `2018-04-20T07:00:00Z` ＋ Discogs `year` 欄 `2018`）。
- **另外一筆的 MB release date 欄是空字串**：`Wayne Shorter《Emanon》` 的數位 release `b399fdf8`（實體那筆是 `2018-09-14`，三層相符）。

⚠ **第 1601 條（Apple 的 `YYYY-01-01T08:00:00Z` 是年初佔位日）在本組命中 1 次，而且正好在退件那張上**：
**`Hank Mobley《Poppin'》` 的 Apple `1494403691` 五地區逐字 `1980-01-01T08:00:00Z`**——**不可當街頭日引用**，
但它同時佐證了 Apple 也把這張碟歸在 1980（第 1842 條）。**22 張收件卡的 Apple `releaseDate` 一筆都不是年初佔位日。**

⚠ **日期歧異（同年、不影響 `year`）7 筆，逐筆記下供本機參考**：
Ben l'Oncle Soul（法版 CD `2016-11-11`／日版 `2016-12-07`，取歐版首發 `2016-11-04`）／
Charles Pasi（法版 LP `2017-09-27`，取 `2017-09-29`）／Brian Blade Fellowship（歐版 LP `2017-11-00` 只到月）／
**Tony Allen《The Source》（⚠ 美版 Discogs 10834147 `released` 逐字 `2017-08-08`，比歐版早一個月）**／
山中千尋《Monk Studies》（LP `2017-07-26`）／《Utopia》（LP `2018-11-03`）／
Wayne Shorter《Emanon》（歐版宣傳 `2018-08-24`／日版 `2018-10-03`）／
Gregory Porter（**美加版 `2019-01-11`，晚兩個月，⚠ 這一筆最容易被誤當 `year`**）／
José James《Lean On Me》（日版宣傳 `2018-09-21`）／Tomorrow Comes The Harvest（宣傳 CDr `2018-09-21`；
⚠ **MB `cffa354f` 是 `2024-04-18` 的再上架，差六年，絕對不可當 `year`**）。

---

## 第 1856 條（**更正派工信地雷 7**）：**主線第 1721 條的觀察名單，本組不是 0 筆——`Dave McMurray《Music Is Life》` 就是那個形狀；覆核完不改判**

派工信第二節地雷 7 逐字寫「**主線第 1721 條的觀察名單，本組 0 筆、但 c-164 b 有 4 筆。
偵測訊號（MB 只有一筆 `Digital Media`＋catno 空＋country `XW`）在你這組不會亮**」。
**實查不成立。`Dave McMurray《Music Is Life》` 三個條件全中**：
**MB release-group `c8ef4b92` 轄下只有 2 筆 release，兩筆都是 `XW`／`Digital Media` 12 軌／catno 欄 null
（`a7a575c1` barcode `00602567502425`、`fcb37890` barcode `00602567502418`）；
`slice.json` 那一列的 `catno` 欄逐字是空陣列、`formats` 逐字 `["Digital Media"]`、`country` 逐字 `XW`。**
（**訊號原文說「只有一筆」，本張是兩筆，但兩筆都是同一個形狀——條件的精神完全命中，只是字面差一個數字。**）

**逐條跑完年份覆核，結論：2018 正確，不改判。** 三層依據：
**(1) MB frd 逐字 `2018-05-18`；(2) Apple 五地區 `1369411347` 的 `releaseDate` 逐字 `2018-05-18T07:00:00Z`——
不是第 1601 條那種年初佔位日，逐日可用；(3) ③ `bluenote.com/artist/dave-mcmurray/` 逐字
`Dave McMurray's Blue Note Records debut, Music Is Life`，而他的第二張《Grateful Deadication》是 2021 年（同頁 Releases 區可見），時序對得上。**

**這正是第 1721 條自己警告的那一種：「訊號會亮不代表要改判，逐筆看」——
本張是真的數位獨家首發（Blue Note 2018 年少數幾張沒有實體的正規專輯之一），不是「只建數位再發把 frd 拉晚」。**

⚠ **另外兩筆訊號部分亮、也都不改判**：
**`Charles Pasi《Bricks》`**（數位 release `7b2489a8` 是 XW＋catno 空，**但同 RG 另有法版實體 CD、frd 就是數位那天**）；
**`Tony Allen & Jeff Mills《Tomorrow Comes The Harvest》`**（**MB 四筆全部 Digital Media、catno 全空、含 XW**——
**MB 端看起來就是那個形狀，但實體版存在於 Discogs 12557764（`Blue Note Lab` `778630 6` 的 10"），
而且 frd 與 Apple／Discogs 的 `2018-09-28` 逐日相符**）。

**→ 給主線：第 1721 條的偵測訊號如果只掃「`nReleases === 1`」，會漏掉本組這三筆。
c-164 a 的實際命中是 3 筆（1 筆完整形狀 ＋ 2 筆部分），全部覆核不改判。**

---

## 第 1857 條：**`Dave McMurray《Music Is Life》` 是本組唯一一張「② Discogs 全庫 0 筆」的碟——三道前置閘只能靠兩層跑，封面來源鏈也要跟著改**

`api.discogs.com/database/search?type=release&artist=Dave%20McMurray&release_title=Music%20Is%20Life` 回 **`items: 0`**。
**本線的來源序列以 ② Discogs 為首，而它的 `format`／`series`／廠牌鏈／companies 四欄正是 (乙)／(戊)／(丙) 的判據——
這張碟把那四欄整個抽掉了。**

**本棒的替代跑法（記下來給後批照抄）**：
- **(乙)**：MB 兩筆 release 都是 2018 首發、label-info 各一格逐字 `Blue Note [713c4a95]`、**沒有並列老號段（第 1763 條不成立）**；
  **而且沒有老母體可再發——McMurray 1981 年才隨 Was (Not Was) 出道，不可能有 Blue Note 庫藏。**
- **(戊)**：四條再發系列一條都沒出現；**而且數位獨家發行在定義上不會走 Tone Poet／Classic Vinyl 這些黑膠復刻線。**
- **(丙)**：**Apple ℗ 欄逐字 `Blue Note Records; ℗ 2018 UMG Recordings, Inc.`——第一格就是 Blue Note，訊號根本沒亮。**

⚠ ⚠ **要交給本機的兩件事**：
1. **`ALBUM_ONBOARDING.md` §4 的封面來源四（`discogs`）對本張在定義上走不通**——沒有 release id，
   要件二「目錄號／年份／廠牌至少對上兩項」無從比對，**`data/discogs-cover-registry.json` 也無從登錄。**
   **CAA 若對 release-group `c8ef4b92` 也是空的，就走 `coverSourceHint: "apple-verified-collection"`
   （2026-09-10 店主放寬後，釘得住 MBID 的卡也適用）——確切 `collectionId` 逐字是 `1369411347`。**
2. **軌名撞陳列掃描這張做不了**（Discogs 0 筆、MB 的 release 端點本棒是用 `inc=labels+media+artist-credits` 抓的、未含 recordings）。
   **本組其他 21 張都做了，只有這張留白，請本機補。**

---

## 第 1858 條：**`Tony Allen & Jeff Mills《Tomorrow Comes The Harvest》` 的 releaseType 疑義——判收；⚠ 並回報本批 prop 格式在結構上不支援 §5.5**

**② Discogs 唯一的實體條目 12557764 的 `formats` 逐字是 `Vinyl, 10", 33 ⅓ RPM, EP`，
軌目逐字只有四軌（A1 Locked And Loaded／A2 Altitudes／B1 On The Run／B2 The Seed）。**
**而 `ALBUM_ONBOARDING.md` §1 的操作判準是 MusicBrainz 的 `primary-type`，MB 逐字給 `Album`（`secondary-types` 空陣列）。**

**本棒判收、`releaseType` 填 `Album`，依據三層**：
1. **§1 的門檻掛在 MB `primary-type` 上，MB 給 Album。**
2. **④ Apple 的 `collectionType` 逐字 `Album`、`trackCount` 10、`primaryGenreName` 逐字 `Jazz`；
   本棒另外拉了 `lookup?id=1403295920&entity=song` 逐軌時長：293＋293＋304＋240＋270＋467＋472＋488＋430＋475 秒
   ＝ **3,732 秒 ＝ 62 分 12 秒**——**長度上是不折不扣的專輯。**
3. **Discogs 的 `EP` 描述掛在那張四軌 10" 上——那是同一套錄音的黑膠精簡版，不是這張碟的完整形狀。**
   （數位版的十軌 ＝ 四首原曲的完整版 ＋ 四個 Edit ＋ 一個 Instrumental ＋ 一個 Instrumental/Edit。）

⚠ ⚠ **不走 §5.5 白名單的兩個理由，第二個是工具面的，請主線知悉**：
**(a) 不需要**——MB 既然給 Album，就不必動用例外條款；
**(b) 走不了**——**`batch-progress/c164/chk-prop.mjs` 的例外欄位檢查逐字只放行 `releaseType === 'Compilation'`：**
```
} else if (x.exceptionReason || (x.exceptionEvidenceUrls || []).length) {
  say(`非合輯卻帶例外欄位：${x.artist} — ${x.album}`);
}
```
**也就是說，本批的 prop 格式在結構上不支援 §5.5 的 `EP`／`Single`／`DJ-mix` 例外
（填了 `genreException`／`exceptionReason` 就直接標記）。**
**若日後真要在這條線上收 §5.5 的碟，`chk-prop.mjs` 要先改。**

**本裁定依裁定權下放第 2／3 條當場定**（改的是 `releaseType` 一個欄位、可逆；不定就卡住這張），
**兩邊的逐字證據都留在該卡的 `risk` 裡，本機審稿層若判它是 EP，退掉只要刪一列。**

---

## 第 1859 條：現場盤 3 張，**四層全部一致——第 1771 條那三種毛病本組一次都沒中**

| 卡 | MB `secondary-types` | slice `live` | 盤名 | Discogs companies |
|---|---|---|---|---|
| Ambrose Akinmusire《A Rift in Decorum: Live at the Village Vanguard》 | 逐字 `["Live"]` | `true` | 副標自帶 `Live at the Village Vanguard` | 逐字 `Recorded At: Village Vanguard` |
| Gregory Porter《One Night Only: Live At The Royal Albert Hall》 | 逐字 `["Live"]` | `true` | 副標自帶 `Live At The Royal Albert Hall` | 逐字 `Filmed At: Royal Albert Hall`／`Recorded At: Royal Albert Hall` |
| Terence Blanchard featuring The E-Collective《Live》 | 逐字 `["Live"]` | `true` | 盤名逐字就是 `Live` | 逐字 `Recorded At: The Cleveland Bop Stop`／`The Wyley Theater, Dallas`／`The Dakota Bar & Grill` |

**第 1771 條的三種毛病（「是現場卻沒標」「盤名帶 Live 卻不是現場」「四層不一致」）本組 0 次**，
與 c-163 a 第 1797 條的結果相同。
⚠ **另外要記一筆反向的**：**`Wayne Shorter《Emanon》` 的第二、三碟是倫敦現場**（Discogs 軌目分段標題逐字
`The Wayne Shorter Quartet Live In London`），**但 MB `secondary-types` 逐字 `[]`、slice `live` 欄 `false`。**
**本棒不改標 `live`**：三碟裡第一碟是錄音室（與 Orpheus Chamber Orchestra），**整張碟不是現場盤，是半現場的三碟企劃**，
**標 `live: true` 會讓它在前端被當成現場盤。這一筆已寫進該卡的 `mbNote`，供下游知悉。**

---

## 第 1860 條：撞陳列總表——**撞卡 1（即退件那張）；軌名撞 apex 王牌 1 處；盤名逐字撞池中卡名 5 組 14 張**

**(一) 撞卡（折鍵命中）1 筆**：`Hank Mobley|Poppin'`（第 1842 條）。**22 張收件卡的折鍵對 seed 17,248 列 ＋ 全部 prop 5,357 筆，0 命中。**

**(二) ⚠ 軌名撞 apex 王牌 1 處**：
**`Tony Allen《The Source》` 第 4 軌〈On Fire〉↔ seed `Galaxie 500 —《On Fire》(1989)`，apex 層級逐字 `hall`。**
**零軌重疊、非同碟（一張是後龐克夢幻流行、一張是 afrobeat 爵士），但下游簡介不得讓這一軌的論述碰到那張王牌。**

**(三) ⚠ ⚠ 盤名逐字撞池中卡名（折鍵不同鍵、`chk-prop` 不亮、不是撞卡）5 組共 14 張**——
**這是本線踩過兩次（`Never Can Say Goodbye`、`Ten`）那個形狀，本組一次出現五組，是歷來最多的一批**：

| 本組的卡 | 池中同名卡 |
|---|---|
| **`Terence Blanchard featuring The E-Collective —《Live》`** | `Donny Hathaway (1972)`／`Mike Westbrook (1973)`／`Ewa Demarczyk (1982)`／`日野皓正クインテット —《Live!》(1973)`／`Fela Ransome-Kuti and the Africa '70 with Ginger Baker —《Live!》(1971)`（後兩者的驚嘆號折鍵後被剝掉、同鍵）**共 5 張** |
| **`Tony Allen —《The Source》`** | `Ayreon (2017)`／`Ted Hearne (2014)`／`Ali Farka Touré (1992)` **共 3 張** |
| **`Kyoto Jazz Sextet —《Unity》`** | **`Larry Young (1965)`（⚠ Blue Note 正典，本卡的致敬對象）**／`Carl Craig (2015)`／`Avishai Cohen (2001)` **共 3 張** |
| **`山中千尋 —《Utopia》`** | **`Björk (2017)`（⚠ 只差一年）**／`Travis Scott —《UTOPIA》(2023)` **共 2 張** |
| **`Yaron Herman —《Y》`** | **`The Pop Group —《Y》(1979)`**（⚠ **單字母盤名，這一組最危險**）**共 1 張** |

**五組的池中卡逐列查過，14 張全部非 apex。**
**→ 給下游：這五張卡的盤名在探測層與撰稿層都必須帶掛名（與年份），不得單獨出現。**

**(四) 軌名撞卡名（一般卡）共 29 處、分佈在 15 張卡上**，逐張寫在各卡的 `risk`。
**其中三處要特別提醒下游**：
`Louis Hayes《Serenade for Horace》` 的〈Song For My Father〉與〈Silver's Serenade〉**逐字撞的就是致敬對象 Horace Silver 本人的兩張專輯名**（皆非 apex）；
`Gregory Porter` 的〈The Christmas Song〉**逐字撞 `Nat King Cole —《The Christmas Song》(1960)`，而 Nat King Cole 正是他致敬的對象**；
`José James《Lean On Me》` 的十二軌全部是 Bill Withers 曲目，**而池中 `Bill Withers —《Live at Carnegie Hall》(1973)` 的 apex 層級逐字是 `hall`。**

**(五) 兩張致敬盤的 apex 鄰居（零軌重疊，但敘事要避開）**：
`山中千尋《Monk Studies》`↔`Thelonious Monk` 池中 21 列、其中 **`《Brilliant Corners》(1957)` 與 `《Genius of Modern Music, Volume 1》(1951)` 是 apex `hall`**；
`José James《Lean On Me》`↔`Bill Withers —《Live at Carnegie Hall》(1973)` apex `hall`。

---

## 第 1861 條：曲風——**13 張 `['jazz']`、9 張帶第二格；MB 出現的 10 種非 `VALID` 曲風一個都沒跟**

| 曲風 | 張數 | 卡 |
|---|---:|---|
| `['jazz']` | **13** | Akinmusire／Charles Pasi／Brian Blade Fellowship／Trombone Shorty／山中千尋《Monk Studies》／山中千尋《Utopia》／Yaron Herman／Louis Hayes／Kyoto Jazz Sextet／Dave McMurray／Wayne Shorter／The Nels Cline 4／Terence Blanchard |
| `['jazz','soul']` | **5** | Ben l'Oncle Soul／José James《Love in a Time of Madness》／José James《Lean On Me》／Gregory Porter／Marcus Miller |
| `['jazz','electronic']` | **2** | GoGo Penguin（第 307 條，沿用 seed《Man Made Object》）／Tomorrow Comes The Harvest |
| `['jazz','pop']` | **1** | Götz Alsmann（第 307 條，沿用池中四張） |
| `['jazz','world']` | **1** | Tony Allen《The Source》 |

**合計 22 張：單格 13、雙格 9。`VALID` 十格裡用到 5 格（jazz／soul／electronic／pop／world），
`rock`／`hiphop`／`folk`／`classical`／`blues` 五格 0 張。**

**MB 出現但不跟的非 `VALID` 曲風 10 種**：
`contemporary jazz`（**第 1572 條明文不跟**，出現 4 次）／`jazz-funk`（4）／`soul jazz`（2）／`contemporary r&b`（2）／
`post-bop`（2）／`afrobeat`（2）／`modern creative`（1）／`swing`（1）／`techno`（1）／`r&b`（1）。

⚠ **四筆本棒自己定的，逐筆記**：
1. **`Tony Allen《The Source》` 取 `['jazz','world']`**——`afrobeat` 不在 `VALID`，折成 `world`，
   **依據是池中 `Tony Allen —《Lagos No Shaking》(2006)` 的曲風欄逐字就是 `["world"]`（第 307 條）。**
2. **`Tomorrow Comes The Harvest` 取 `['jazz','electronic']`、`afrobeat` 不折 `world`**——
   **與上一筆刻意不同。理由：本碟的聲響主體是 Mills 的合成器脈衝與 Allen 的鼓對位，不是西非樂團編制；
   且池中 `Jeff Mills` 11 列的曲風欄逐字全部是 `["electronic"]`（第 307 條）。**
3. **`山中千尋《Utopia》` 的 `classical` 刻意不跟**——MB `genres` 逐字有 `classical`（count 1），
   **③ 廠牌官網也逐字寫「クラシックの名曲を中心に収録」**；
   **但那句描述的是曲目來源，本碟的演奏語彙是爵士鋼琴三重奏。掛 `classical` 會讓這張卡掉進古典的類型挑片池，
   而古典卡另有 §0.6 作曲家欄與 §0.7 錨點制三軸一整套不同的處理。** 池中山中千尋三張逐字全部 `["jazz"]`。
4. **`Gregory Porter` 取 `['jazz','soul']`**——MB 只有 `jazz` 單格，
   **但池中他四張裡三張逐字 `["jazz","soul"]`（《Great Voices of Harlem》《Nat "King" Cole & Me》《Take Me to the Alley`），
   只有《Liquid Spirit》是 `["jazz"]`，第 307 條取多數形。**

⚠ **三張刻意只填單格、不照散文加第二格**（依「不確定的事實不寫」）：
`Trombone Shorty`（官網散文逐字 `New Orleans soul`／`deep-groove funk`，**但 MB／Discogs／Apple 三邊都沒有 `soul`／`funk` 欄位值**）、
`Dave McMurray`（官網逐字 `bristles with unalloyed soul`／`the spirit of a funk record`，**MB 空、Discogs 缺席**）、
`Wayne Shorter《Emanon》`（**有 34 人的室內樂團協演，但 `classical` 沒有任何來源欄位支持，MB `genres` 是空陣列**）。
⚠ **`Charles Pasi`／`Yaron Herman`／`Kyoto Jazz Sextet`／`Terence Blanchard`／`Dave McMurray`／`Wayne Shorter` 六張的 MB `genres` 與 `tags` 兩欄都是空陣列**，
全部依 `slice.json` 的 `genre` 欄與池中先例填 `['jazz']`。

---

## 第 1862 條：來源命中率結算——**② Discogs 22／23、④ Apple 23／23、③ 廠牌官網 17／23；主線第 1728 條的調整在本組完全站得住**

| 層 | 命中 | 備註 |
|---|---:|---|
| **④ Apple**（us／jp／gb／fr／de 五地區各查一次） | **23／23** | **本組唯一一層零缺口的來源**；⚠ 但地區覆蓋差異大（見第 1864 條） |
| **② Discogs** | **22／23** | **唯一的缺口是 `Dave McMurray《Music Is Life》`（全庫 0 筆，第 1857 條）** |
| **⑤ MusicBrainz** | 23／23 | ⚠ 但 `genres` 空的有 6 張、`barcode` 欄 null 的有 3 張、`catno` 全空的有 4 張 |
| **③ 廠牌官網** | **17／23** | `bluenote.com` 14 中（美國線）／404 6 次；**其中 3 次（日本線）改走 `universal-music.co.jp` 全部 200** |
| **① 紙本 Billboard** | **本組不查** | 主線第 1728 條：Billboard OCR 只覆蓋到 2015，**本組 23 筆全部是 2016–2018，結構性查不到，不得寫成缺失** |
| **⑥ 維基／⑤ AllMusic** | 0 | 本棒未動用（前四層已足） |

⚠ **這組數字與 c-163 b 第 1822 條回報的（② 19/19 ＞ ④ 17/19 ＞ ③ 12/19 ＞ ① 5/19）**方向一致，**但有一個新的事實**：
**本組 ④ Apple 反而比 ② Discogs 多命中一張。**
原因是本組有數位獨家發行（Dave McMurray），**而 Discogs 是「實體版本資料庫」、對純數位發行覆蓋率極低。**
**→ 給主線的一句：來源序列 ②→④ 在 2016 年以後的批次可能要視「有沒有實體發行」而定；
碰到 MB 只有 `Digital Media` 的碟，④ Apple 應該排在 ② 前面。** 這與第 1721 條的偵測訊號是同一個根因的兩面。

---

## 第 1863 條（操作面）：③ 廠牌官網的實測結果與可引用序數清單

**(一) `bluenote.com/artist/<slug>/` 實測**（全部帶 `User-Agent: Mozilla/5.0`）：

| 200（14） | 404（6） |
|---|---|
| `ambrose-akinmusire`／`brian-blade`／`trombone-shorty`／`tony-allen`／`jose-james`／`louis-hayes`／`dave-mcmurray`／`gregory-porter`／`wayne-shorter`／`nels-cline`／`terence-blanchard`／`marcus-miller`／`gogo-penguin`／`hank-mobley` | **`charles-pasi`／`yaron-herman`／`gotz-alsmann`／`ben-loncle-soul`**（四筆歐陸線，**與派工信預期逐字相符**）／**`kyoto-jazz-sextet`／`chihiro-yamanaka`**（兩筆日本線，改走 universal-music.co.jp） |

⚠ **頁面結構要記**：**藝人頁的專輯介紹文字是整段 URL 百分比編碼塞在 `data-flip-*` 屬性裡的**，
直接 grep HTML 抓不到，**要先 `urllib.parse.unquote` 再剝標籤**。本棒的抓法已寫在 `evidence-a/SOURCES.md`。
⚠ **`gotz-alsmann` 404 與 c-163 a 第 1750 條第 6 點逐字相同**，這條線四張卡四次都是 404。

**(二) 可引用序數（第 1714／1620-N 條要求的「逐字依據」）——本組有 6 筆，全部有 ③ 官網逐字原文**：

| 卡 | 官網逐字 | 型別（第 1729 條的分界） |
|---|---|---|
| Trombone Shorty | `Trombone Shorty's 2017 Blue Note debut Parking Lot Symphony is a 12-track tour de force` | **廠牌目錄序數** |
| Tony Allen《The Source》 | `The Source (his debut album for Blue Note Records)`／`The Source is the Nigerian-born Paris-based drummer's first full-length album for Blue Note, following the tantalizing 4-track EP release A Tribute to Art Blakey and the Jazz Messengers` | **廠牌目錄序數**（⚠ 官網自己加了 `full-length` 這個限定詞） |
| Louis Hayes | `Hayes makes his Blue Note debut with Serenade for Horace`／`Now Hayes makes his own Blue Note Records debut as leader` | ⚠ **身分敘述**（他 1956 年就以側手在 Blue Note 錄過音，官網自己把 `as leader` 寫進去了） |
| Dave McMurray | `Dave McMurray's Blue Note Records debut, Music Is Life` | **廠牌目錄序數** |
| The Nels Cline 4 | `Currents, Constellations, Cline's second Blue Note release` | **廠牌目錄序數** |
| Marcus Miller | `Miller has released two Blue Note albums, the most recent Laid Black came out in 2018 following his 2015 label debut Afrodeezia` | **廠牌目錄序數** |
| Brian Blade Fellowship | `marks its 20th anniversary in 2017 with the release of their sublime fifth album, Body and Shadow` | **樂團自己的目錄序數**（不是 Blue Note 序數） |
| Wayne Shorter | `his first release since 2013's Without A Net` | ⚠ **間隔敘述**（第 1729 條（一）：只要該卡 facts 有逐字 src 就可寫，不必過兩層門檻） |
| GoGo Penguin | ⚠ **推得、非逐字**：官網一句說 `their 2016 Blue Note debut Man Made Object`、另一句說 2020 那張是 `the third to be released by the legendary Blue Note label following Man Made Object and A Humdrum Star` | **推得的廠牌目錄序數，依第 1714 條的「逐字依據」要求，本棒不代鉤子層下結論** |

⚠ ⚠ **第 1714 條要求的第二層（紙本）在本組結構性不存在**（主線第 1728 條：Billboard 只到 2015）。
**本棒的處置是統一的：把官網原文一字不改地留在各卡的 `why` 裡，不代鉤子層決定寫不寫。**
**這一點請鉤子層依第 1729 條的分界自行判：「間隔／身分敘述」有 src 就可寫，「廠牌目錄序數」要自己權衡只有一層依據夠不夠。**

**(三) 官網沒有給序數的 4 張，本棒明文禁止自己算**：
Ambrose Akinmusire（官網只列了四張碟的年份清單，**沒有寫「第幾張」**）／José James 兩張／Gregory Porter／Terence Blanchard／GoGo Penguin（見上）。
**404 的 6 張一律不得寫序數。**

---

## 第 1864 條：店面狀況（④ Apple 五地區）——**23／23 有貨，但版本問題比命中率重要**

**(一) 地區覆蓋**：五地區全有 14 張；四地區 5 張（**us 缺 3 張：山中千尋《Utopia》／Götz Alsmann《In Rom》(us、gb 皆缺)／Yaron Herman《Y》**）；
**⚠ 只有 2 個地區 1 張：`José James《Love in a Time of Madness》`（us／gb）**；
**⚠ ⚠ 只有 1 個地區 1 張：`Marcus Miller《Laid Black》`（只有 jp）**——
**這一筆在本組是異常的（他是美國藝人、美版 CD 由 Blue Note 製造），本機上架固定試聽時要再查一次 us。**

**(二) ⚠ ⚠ §6（2026-08-23 增列）的淨化版問題，本組命中 1 筆**：
**`José James《Love in a Time of Madness》` 的 Apple us／gb `1443256951` 的 `collectionExplicitness` 逐字是 `cleaned`，
而且五個 storefront 都查過、整份目錄確實只有淨化版。**
**依該條「淨化版屬不同版本、一律優先取 `explicit`；若整份目錄確實只有淨化版，可收但要在備註寫明」——已寫明。**
**⚠ 本機上架時要再查一次有沒有 explicit 雙胞胎（同名、同曲數、曲序一致，只看盤名分不出來）。**
**其餘 21 張的 `collectionExplicitness` 逐字全部是 `notExplicit`**（＝本來就無不雅內容，不是問題）。

**(三) ⚠ 軌數不一致 10 張，本機配固定試聽要逐軌核**（第 646／865 條）：
Ben l'Oncle Soul（**Apple 13／14／11 三種，實體法版 11、日版 13**）／Charles Pasi（Apple 12 vs 實體 11）／
**Yaron Herman（Apple jp 13／gb-fr-de 14，實體 12——三種）**／Tony Allen《The Source》（Apple 12 vs 實體 11）／
Wayne Shorter《Emanon》（Apple 11 vs 實體 10）／**GoGo Penguin（Apple 9／10／13 ＋ `A Humdrum Star (Deluxe)` 12，實體歐版 9、日版 12——四種）**／
**Gregory Porter（Apple 兩個 id：19 軌的 `1437630474` 與 20 軌的 `1442760243`／`1442908829`，實體 19）**／
José James《Lean On Me》（Apple us-gb-fr-de 12、**jp `1426175061` 14**，實體 12）／Marcus Miller（Apple jp 10 vs 實體 9）／
山中千尋《Utopia》（Apple 12 vs **LP 版 MB media 逐字 10 軌**）。
**軌數相符的 12 張：Akinmusire 16／Brian Blade Fellowship 9／Trombone Shorty 12／山中千尋《Monk Studies》10／
Götz Alsmann 18／Louis Hayes 11／Kyoto Jazz Sextet 9／Dave McMurray 12／Tomorrow Comes The Harvest 10／
The Nels Cline 4 8／Terence Blanchard 7。**

---

## 第 1865 條：**本信（派工信）與正本或既有裁定牴觸之處——四筆，逐筆列出**

派工信第零節逐字要求「**你若發現本信與正本或既有裁定牴觸，以正本為準，並在回報裡指出來**」。本組有四筆：

1. **地雷 1（第 1763 條的快捷查法）——寫成「先跑這一條、(乙) 直接成立、不必再查 Discogs」，實查沒中。**
   `Hank Mobley《Poppin'》` 的 MB `label-info` 只有一格、沒有並列老號段。
   **判 (乙) 的實際依據是 Discogs 的 `series` 欄（第 1813 條那條）。**
   **→ 第 1763 條是充分條件不是必要條件，沒中不等於不是 (乙)。**（第 1842 條）
2. **地雷 3 自相矛盾。** 同一段同時要求「照 MB `artist-credit` 逐字取形」與「不可留非 ASCII 連字號」與「先掃池中既有形，有就沿用」，
   **三句話在這張碟上不可能同時滿足**（MB 的逐字形就帶 U+2010、而且是 `&` 形不是池中的 `featuring` 形）。
   **本棒依第 307 條採池中形。**（第 1850 條）
3. **地雷 7 的事實有誤。** 派工信逐字說「主線第 1721 條的觀察名單，本組 0 筆」，
   **實查 `Dave McMurray《Music Is Life》` 三個偵測條件全中**（另有 2 筆部分中）。**覆核完不改判。**（第 1856 條）
4. **第五節第 3 點「日本線盤名以 universal-music.co.jp 為準」，本棒三張都沒照做。**
   照做會把 `Monk Studies`／`Utopia`／`Unity` 分別寫成 `モンク・スタディーズ`／`ユートピア`／`UNITY`，
   **與池中山中千尋三張、Kyoto Jazz Sextet 一張的既有拉丁盤名體例分裂（第 307 條壓過派工信的單句指示）。**（第 1852 條）

⚠ **另有一筆不是牴觸、是上游資料有誤，一併記**：
**`slice.json` 給 `Ben l'Oncle Soul《Under My Skin》` 的 `note` 欄逐字「僅 JP 盤」，不成立。**
那是切片器只看 MB `label-info` 有沒有 `Blue Note` 造成的（MB 兩筆 release 裡只有日版掛 Blue Note，法版首發掛 `Mercury Music Group`），
**但 Discogs 的加拿大／法國／歐洲三筆零售條目廠牌欄逐字都是 `Blue Note`。這是一張歐洲首發、日本加曲的碟。**（第 1844 條 D 型）

⚠ **還有一筆是舊裁定的附註要更正**：
**c-162 a 第 1750 條在處理 Götz Alsmann《In Paris.》時附註「後續的《In Rom.》同形」（推測這條城市系列都帶句點）。
實查 MB／Discogs 三筆／Apple 三地區逐字都是 `In Rom`，沒有句點。本棒取無句點形。**

---

## 第 1866 條：`chk-prop` 的七個盲點在本組各中幾次——**標記 0，但七個盲點中了五個**

| 盲點 | 本組命中 | 逐筆 |
|---|---:|---|
| **1. `&`／`and` 分裂** | **1** | `Tony Allen & Jeff Mills`（`&` 式折 `tonyallenandjeffmills`、MB／Discogs 的逗號式折 `tonyallenjeffmills`，**不同鍵**） |
| **2. 大小寫不同形** | **5** | `Serenade for Horace`／`Lean On Me`／`Tomorrow Comes The Harvest`／`Unity` vs `UNITY`／`Kyoto Jazz Sextet` vs `KYOTO JAZZ SEXTET` |
| **3. 裸名／團名／別名分裂** | **2**（各 2–3 個字串） | **`Brian Blade Fellowship` vs `Brian Blade & The Fellowship Band`（第 1848 條）／`Nels Cline` vs `The Nels Cline 4` vs `The Nels Cline Singers`（第 1849 條）** |
| **4. 盤名副標題有無** | **1** | `A Rift In Decorum` vs `A Rift in Decorum: Live at the Village Vanguard`（第 1854 條） |
| 5. 折鍵把不同碟摺成同鍵 | **0** | — |
| **6. 跨文字系統分裂** | **2** | `山中千尋` vs `Chihiro Yamanaka`（兩張；第 1672 條） |
| **7. 標點字元不同碼位** | **2** | `Ben l’Oncle Soul`（U+2019）vs `Ben l'Oncle Soul`（U+0027）／`The E‐Collective`（U+2010）vs `The E-Collective`（U+002D） |

**七個盲點中了五個、共 13 筆，`chk-prop a` 的標記仍然是 0。**
**這正是派工信第四節那句話的實測：標記 0 不等於沒問題。**
⚠ **其中盲點七的第二筆（`The E‐Collective`）是唯一一筆 `chk-prop` 抓得到的**——
**若照派工信地雷 3 的第一句「照 MB 逐字取形」，`chk-prop` 會直接標記「掛名含非 ASCII 連字號」。取 ASCII 後標記 0。**

---

## 第 1867 條：給 b 組與後批的六句

1. **`series` 欄才是 (戊)／(乙) 的判據，SHM-CD／HQCD／UHQCD 這些日本載體不是**（第 1845 條，本組 6 張帶日本高規格載體全收、1 張帶 `series` 的退）。
2. **Discogs 的全詞大寫是站方體例，不計入「哪個字母大寫」那一票；大小寫要看 ④ Apple 與 ③ 廠牌官網**（第 1854 條，四筆反證）。
3. **MB 的 `label-info` 不足以判 imprint**——**Ben l'Oncle Soul 的 MB 首發 release 掛的是 `Mercury Music Group`，
   但 Discogs 四筆零售的廠牌欄第一格全是 `Blue Note`。必須把 Discogs 的零售條目全部列出來再套第 1794 條**（第 1844 條 D 型）。
4. **`universal-music.co.jp` 的 slug 是「小寫、名在前、連字號」＋「小寫目錄號」**，站內 search 是 JS 產生的、抓不到（第 1852 條（三））。
5. **碰到 MB 只有 `Digital Media` 的碟，② Discogs 很可能整個查無**——
   **那時三道前置閘要改用「MB label-info ＋ Apple ℗ 欄 ＋ 藝人出道年」三層跑，
   封面也要預先標成 `apple-verified-collection` 並記下 `collectionId`**（第 1857 條）。
6. **`chk-prop.mjs` 的例外欄位檢查只放行 `Compilation`**——**本批的 prop 格式在結構上不支援 §5.5 的 EP／Single／DJ-mix 例外**（第 1858 條）。

⚠ **給 c-164 b 一句專門的**：**`The Nels Cline Singers` 照第 1849 條判——
它同樣是一支池中沒有前作的獨立樂團，建自己的字串，不併 `Nels Cline` 裸名、也不併 `The Nels Cline 4`。**
⚠ **另一句**：**b 組的 4 筆第 1721 條觀察名單（Ai Kuwabara／Jacky Terrasson／GoGo Penguin／Rick Margitza）
請照第 1856 條的三層跑法覆核——本組實測那個訊號會亮但多半不用改判，重點是 Apple 的 `releaseDate` 是不是年初佔位日。**

---
---

# c-164 **b 組**裁定（編號 **1870–1882**）

**本段由 b 組策展棒寫入，從檔尾 append。上方 a 組（1840–1869 號段）的內容一行未動，`prop-a.json` 未碰。**

**本組 22 筆**（`batch-progress/c164/slice.json` 的 `g: "b"` 切片），年份分布 2018×4、2019×9、2020×9，
`slice.json` 的 `genre` 欄 22 筆全部逐字 `jazz`。
沿用 `c158`～`c162` 各批裁定、`c163/rulings.md` 與 **`c163/rulings-mainline.md`（第 1718–1730 條）**，條文一字未改。
**正本三份（`ALBUM_ONBOARDING.md`／`REMOTE_RUNBOOK.md`／`CLAUDE.md`）開工前已完整讀過**；本信與正本牴觸之處見第 1877 條。

---

## 第 1870 條：**交件總表**

| 項 | 數 |
|---|---:|
| 派下 | **22** |
| **收** | **19** |
| **退** | **3** |
| **退貨率** | **13.6%**（3/22） |
| **年份改判** | **1**（`Rick Margitza —《Hope》` **2020 → 1991**，見第 1876 條） |
| 新掛名字串 | **5**（`Thomas Dutronc & Les Esprits Manouches`／`Bill Frisell`／`Yaron Herman Trio`／`Ron Carter & Danny Simmons`／`The Nels Cline Singers`） |
| 沿用池中／卡單既有掛名 | **13 張／13 位** |
| `chk-prop b` 標記 | **0**（127 批、5,127 卡；跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0） |
| 撞陳列（軌名或盤名＝池中卡名） | **收下的 19 張共 23 處／12 張**；⚠ **撞 apex 王牌 0 處**（盤名層 0、軌名層 0） |
| 盤名逐字撞卡 | **1 處**（`Bill Frisell —《Harmony》` ↔ seed `The Wake —《Harmony》(1982)`，掛名不同、非 apex） |
| 用掉的號段 | **1870–1882**（1870 起，未動 1840–1869） |

### 六句收碟規則的分布（19 收／3 退）

| 句 | 收 | 退 | 備註 |
|---|---:|---:|---|
| **(甲) 從未發行過的錄音首次以錄音發行** | **1** | — | `Art Blakey & The Jazz Messengers —《Just Coolin'》`，見第 1875 條 |
| **(乙) 母體原在 BN／Liberty／UA／Solid State** | — | **2** | Stanley Turrentine、Jimmy Smith，見第 1873 條 |
| **(丙) 母體其實在真正的他廠** | **0 退**（訊號亮 **7** 次，逐筆查完 **6** 次不成立） | **1** | ⚠ **`Ai Kuwabara…《Live at Blue Note Tokyo》` 是本線第二次 (丙) 真的成立**，見第 1874 條 |
| **(丁) 部分重疊／形狀不同** | **0** | — | ⚠ `Just Coolin'` 曾是候選（四首曲子與池中《At the Jazz Corner of the World》同曲），**查完是不同演出、不是同一份母帶，維持 (甲)**，見第 1875 條 |
| **(戊) 四條再發系列** | — | **1**（與 (乙) 併計在 Turrentine 那一筆） | ⚠ **`Lonnie Smith —《All in My Mind》` 的 `reissueSeries` 逐字掛著 `Blue Note Tone Poet Series` 卻是收不是退**，見第 1872 條 |
| **(己) 載體只有影像** | — | **0** | `Charles Lloyd`／`山中千尋`／`Norah Jones` 三張帶 DVD，但都有純聲音的零售條目，(己) 不成立 |

### 一般卡／身分欄

- `releaseType` **19 張全部 `Album`**，`exceptionReason` 與 `exceptionEvidenceUrls` **全部留空**（無合輯、無 §5.5 例外）。
  ⚠ **兩張差點翻過去**：`Norah Jones —《Begin Again》`（Discogs `format` 欄逐字帶 `Compilation`）與
  `GoGo Penguin —《Live from Studio 2》`（Discogs `format` 欄逐字帶 `EP`），**兩張都依 `ALBUM_ONBOARDING.md` §1／§5.6 以 MB `primary-type` 為身分正本，判 `Album`**，理由寫在各自的 `risk`。
- `selfTitled` 19 張全部 `false`（無同名碟）。
- `reissuedBy` 19 張全部留空。

---

## 第 1871 條：**退表逐筆（3 筆）**

| # | 卡 | `rgMbid` | 判 | 逐字依據 |
|---|---|---|---|---|
| 1 | **`Stanley Turrentine —《Up at "Minton's", Vol. 2》`**（slice `g:"b"` 第 12 筆，2019） | `26026a87-313a-4518-b549-918c2894775c` | **(乙)＋(戊)＋撞已發卡，三重成立** | **原盤是 Blue Note 1961／1962：Discogs 16127081 逐字 `released: 1962-12-00`、`country: US`、`Vinyl, LP, Stereo`、廠牌欄逐字 `Blue Note` catno `BST 84070`；Apple us/jp `1436190027` 的 ℗ 欄逐字 `A Blue Note Records Release; ℗ 1961 Capitol Records, LLC`、`releaseDate` 逐字 `1961-04-19`。** 本筆是 **2019-07-17 的日版 CD `UCCQ-9530`（MB `ed88ba24`，僅 JP，4 軌）**，`slice.json` 的 `reissueSeries` 欄逐字 `["BLUE NOTE 80 MORE 60 WORKS"]`（**(戊) 名單上的第二條**）。**⚠ 而且原盤已經發過卡**：seed 逐字 `["Stanley Turrentine","Up at Minton's, Volume 2",…,1962]`，`c138/prop-b.json` 與 `c138-cards.json` 亦有 |
| 2 | **`Jimmy Smith —《Groovin' At Smalls' Paradise (Volume 2)》`**（第 13 筆，2019） | `4f9271b0-d709-443f-ae5b-dd9429bbe395` | **(乙)** | **原盤是 Blue Note 1958：Discogs 3402871 逐字 `released: 1958-08-00`、`country: US`、`Vinyl, LP, Album, Mono`、廠牌欄兩格逐字 `Blue Note` catno `1586` ＋ `Blue Note` catno `BLP 1586`、companies 逐字 `Recorded At: Small's Paradise`、notes 逐字 `Recorded at "Smalls' Paradise", NYC, on November 15, 1957.`；Apple us/jp `1476591394` 的 ℗ 欄逐字 `A Blue Note Records Release; ℗ 1957 Capitol Records LLC`。** 本筆是 **2019-08-14 的日版 CD `UCCQ-9552`（MB `8d92d7a0`，僅 JP，5 軌）**。⚠ **Discogs 同一次搜尋另外撈到 `Volume 1` 的 2019 年 `Blue Note 80 Vinyl Reissue Series` 黑膠（14526495），坐實這個號段就是 Blue Note 80 那一輪的復刻線** |
| 3 | ⚠ ⚠ **`Ai Kuwabara with Steve Gadd and Will Lee —《Live at Blue Note Tokyo》`**（第 5 筆，2019） | `a4aaed2f-d3ab-4b55-a3fc-fb4380dc8b6a` | **(丙) 母體其實在真正的他廠** | **見第 1874 條全文。一句話：唯一的實體零售條目掛 `Verve Records`，盤名裡的 `Blue Note` 是演出場地不是廠牌** |

⚠ **三筆都不是「資料查不到」而退**，三筆的 ②④ 兩層都查得很完整。
⚠ **`Dr. Lonnie Smith —《All in My Mind》` 原本是派工信預告的第三筆退件，實查是收**，見第 1872 條。

---

## 第 1872 條（**派工信地雷 1 的反例；新立，給後批照抄**）：**`reissueSeries` 欄非空不等於 (戊)——要逐字看那個系列掛在哪一筆 release、那一筆是不是首發**

**觸發**：`slice.json` 的 `Dr. Lonnie Smith —《All in My Mind》` 逐字帶 `reissueSeries: ["Blue Note Tone Poet Series"]`，
而 `Blue Note Tone Poet Series` 是 **(戊) 四條名單上的第三條**。派工信因此把它列為「幾乎確定要退」的三筆之一，
但同時留了但書（逐字「若 2018 年的首發本身是新錄音的現場盤、Tone Poet 只是後來的復刻版，那就是收不是退」）。**實查完全落在但書那一側。**

| 層 | 逐字 |
|---|---|
| **② Discogs `11994944`（2018 美版 CD）** | **`released` 逐字 `2018`、`format` 欄逐字 `CD, Album`（⚠ **無 `Reissue`**）、⚠ ⚠ **`series` 欄逐字空陣列**、廠牌欄逐字單格 `Blue Note` catno `0602567218722`、7 軌** |
| **② Discogs `15188414`（2020 黑膠）** | **`released` 逐字 `2020-04-24`、`format` 欄逐字 `Vinyl, LP, Album, Reissue, Stereo`、⚠ ⚠ **`series` 欄逐字 `Blue Note Tone Poet Series`**、catno `B0031576-01`、**5 軌**、notes 欄逐字 `A Blue Note Records release: ℗ 2018 © 2020 UMG Recordings, Inc.`** |
| **MB 轄下三筆 release** | **`6e0db6bc` 2018-01-12 AF Digital 7 軌／`346000b7` 2018-01-19 FR CD 7 軌／`0e28fcb7` 2020-04-24 XW 12" Vinyl **5 軌** catno `B0031576-01`** |
| **④ Apple us `1440907508`** | **`releaseDate` 逐字 `2018-01-12T08:00:00Z`、℗ 欄逐字 `Blue Note Records; ℗ 2018 UMG Recordings, Inc.`、7 軌** |

**→ 判：收，`year` 2018，`reissuedBy` 留空。**

**三條理由**：
1. **首發是 2018 年的新錄音**，℗ 年逐字 `2018`（連 2020 那張 Tone Poet 自己的 notes 都逐字寫 `℗ 2018 © 2020`）。
2. **`Blue Note Tone Poet Series` 只掛在 2020 年那一筆黑膠復刻上**，2018 年的 CD 條目 `series` 欄逐字是**空陣列**。
3. **兩者連曲目都不同**（7 軌 vs 5 軌，黑膠版整個抽掉〈Alhambra〉與〈All In My Mind〉）——**若它們是同一件事，曲目不會差兩軌。**

⚠ ⚠ **根因是 `slice.json` 的 `reissueSeries` 欄是「把 RG 底下所有 release 的系列欄折上來」的結果**
（`batch-progress/enum/blue-note.json` 的 `source` 欄逐字「**折疊 release-group**」、`entities` 欄逐字把 Tone Poet 註記為
「**再發系列（MB series 實體，非 label）；成員折進原盤 RG**」）。
**所以 `reissueSeries` 非空只代表「這個 RG 底下某一筆 release 走過某個再發系列」，不代表「這張碟本身是那個系列的產品」。**
**(戊) 要退的是「這張卡指的那一版就是再發系列的產品」**——判準是**那個系列掛在不掛在首發那一筆 release 上**。

⚠ **對照本組退掉的 Turrentine（第 1871 條第 1 筆）就清楚了**：那張的 `reissueSeries` 逐字 `["BLUE NOTE 80 MORE 60 WORKS"]`，
而它**轄下只有一筆 release，就是 2019 年那張日版 CD 本身**——系列直接掛在這張卡指的那一版上，(戊) 成立。
**兩張的差別不在「有沒有 `reissueSeries`」，在「那個系列掛在哪一筆」。**

**可逆性**：改的是 manifest 欄位與退表一行，不動卡池結構，屬「可逆」，依裁定權下放第 2 條當場定、不上呈。

---

## 第 1873 條：**Turrentine 與 Jimmy Smith 兩張退——第 1763 條的快捷查法在本組兩次都不成立，改用 ②＋④ 兩層坐實**

派工信逐字建議用 **第 1763 條的快捷查法**（「MB `label-info` 並列老號段與日版號段即成立」）。**本組兩張都跑不通，原因寫在這裡給後批**：

| 卡 | MB `label-info` 逐字 | 第 1763 條可用? |
|---|---|---|
| `Stanley Turrentine —《Up at "Minton's", Vol. 2》` | **只有一格：`Blue Note [713c4a95] catno=UCCQ-9530`** | ❌ **沒有並列老號段** |
| `Jimmy Smith —《Groovin' At Smalls' Paradise (Volume 2)》` | **只有一格：`Blue Note [713c4a95] catno=UCCQ-9552`** | ❌ **同上** |

⚠ **兩張的 MB RG 轄下都只有一筆 release（就是那張日版 CD），MB 端根本沒有 1961／1958 年的原盤條目可以並列。**
**第 1763 條那個捷徑的前提是「MB 把原盤與再發建在同一筆 release 的 label-info 裡」，本組這兩張是「MB 只建了再發、原盤完全不在 MB 這個 RG 底下」——是另一種形狀。**

**改用的查法（兩層，逐字）**：
1. **② Discogs 搜原盤**：Turrentine → `16127081`（`1962-12-00` US `Blue Note BST 84070`）；Jimmy Smith → `3402871`（`1958-08-00` US `Blue Note 1586`／`BLP 1586`）。
2. **④ Apple 的 ℗ 年**：Turrentine → `1436190027` 逐字 `A Blue Note Records Release; ℗ 1961 Capitol Records, LLC`；
   Jimmy Smith → `1476591394` 逐字 `A Blue Note Records Release; ℗ 1957 Capitol Records LLC`。
   ⚠ **Apple 的 ℗ 年在這種老 Blue Note 碟上特別好用——它保留的是原始錄音年的權利年，不是再發年**（與第 1601 條「2005 年後 ℗ 欄常寫現在的權利人」那個陷阱相反，老碟這一邊是可靠的）。

**→ 本條新立一句給後批**：**當 MB RG 轄下只有日版再發那一筆 release 時，第 1763 條的捷徑失效；改跑「② 搜原盤目錄號 ＋ ④ 看 ℗ 年」兩層，兩層對上就 (乙) 成立。**

⚠ **Turrentine 那張另有第三重**：**原盤已經在 `seed_cards.json` 裡**（逐字 `Up at Minton's, Volume 2`，1962）。
⚠ ⚠ **但 `chk-prop` 抓不到它**——本卡的盤名折鍵是 `upatmintonsvol2`、池中那張是 `upatmintonsvolume2`，
**`Vol.` 與 `Volume` 折出兩個不同的鍵（`chk-prop` 盲點四）**。**若這張不是先被 (乙)／(戊) 擋下，它會一路過四道進池變成重複卡。** 記在這裡。

---

## 第 1874 條（**本組最重要的一條；(丙) 在本線第二次真的成立**）：**`Ai Kuwabara with Steve Gadd and Will Lee —《Live at Blue Note Tokyo》` 退——盤名裡的 `Blue Note` 是演出場地，唯一的實體零售盤掛 `Verve Records`**

**觸發**：這張碟是派工信地雷 3 點名的四筆之一（主線第 1721 條觀察名單）。
**跑年份覆核時訊號是假的（見下），但跑 imprint 前置閘時撞到一個更根本的問題：這張碟可能根本不是 Blue Note 的碟。**

**逐層實查**：

| 層 | 逐字 |
|---|---|
| ⚠ ⚠ **② Discogs `13373984`（**唯一一筆實體零售條目**，2019-03-20 Japan SHM-CD）** | **廠牌欄逐字單格 `Verve Records` catno `UCCJ-2164`，`entity_type_name` 逐字 `Label`。⚠ 廠牌鏈裡一個 Blue Note 都沒有。** companies 欄逐字 `Record Company: Universal Classics & Jazz`、`Phonographic Copyright (p): Universal Music LLC`、⚠ ⚠ **`Recorded At: The Blue Note Tokyo`**（**那是 `companies` 欄的錄音場地，`entity_type_name` 不是 Label**）；notes 欄逐字 `Recorded live at Blue Note, Tokyo, Japan, September 23, 2018.` |
| **④ Apple jp `1453471226`** | `artistName` 逐字 `桑原あい, スティーヴ・ガッド & ウィル・リー`、9 軌、`releaseDate` 逐字 `2019-03-20T07:00:00Z`、**℗ 欄逐字 `℗ 2019 UNIVERSAL MUSIC LLC`——沒有 Blue Note**；⚠ **Apple us 查無** |
| ⚠ **③ 廠牌官網（日本線走 `universal-music.co.jp`）** | **產品頁 `universal-music.co.jp/kuwabara-ai/products/uccj-2164/` 回 200，`<title>` 逐字 `Live at Blue Note Tokyo [SHM-CD][CD] - 桑原あい with スティーヴ・ガッド and ウィル・リー - UNIVERSAL MUSIC JAPAN`；⚠ ⚠ **規格表的「レーベル」欄逐字 `Universal Music`**，藝人頁側欄的廠牌標籤逐字 **`UNIVERSAL JAZZ`**——**兩處都沒有 Blue Note／ブルーノート** |
| **③ `bluenote.com/artist/ai-kuwabara/`** | **404** |
| ⚠ **MB** | 轄下 **2** 筆 release：**`70459271`（2019-03-20 **JP** Official SHM-CD 9 軌，label-info 逐字 **`Verve [99a24d71]` catno `UCCJ-2164`**，barcode `4988031320273`）** ＋ **`965374bf`（2019-03-20 **XW** Official **Digital Media** 9 軌，label-info 逐字 `Blue Note [713c4a95]` catno=null，barcode `602577466229`）** |

**→ 判：(丙) 成立，退。**

**這張碟逐列對上第 1784 條 `Leon Russell《Life Journey》`（退）那一欄，不是第 1792 條 `Fabian Almazan《Rhizome》`（收）那一欄**：

| | **Rhizome（第 1792 條，收）** | **Life Journey（第 1784 條，退）** | ⚠ **本張** |
|---|---|---|---|
| Discogs 零售條目數 | 1 | 5 | **1** |
| **廠牌鏈出現 `Blue Note` 的** | **1／1（第二格）** | **0／5** | ⚠ **0／1** |
| Apple ℗ 欄 | `Blue Note/ArtistShare` | `Universal Music Enterprises` | ⚠ **`UNIVERSAL MUSIC LLC`** |
| bluenote.com | 兩篇新聞稿 | 藝人頁 404 ＋ 站內搜尋 0 | ⚠ **藝人頁 404** |
| **MB 掛 `713c4a95` 的 release** | 1／1 | **1／4（只有數位那一筆）** | ⚠ ⚠ **1／2（只有數位那一筆；實體 JP 盤掛 `Verve [99a24d71]`）** |

**五列逐列相同。第 1794 條的閘（「零售條目裡有沒有任何一筆的廠牌鏈出現 Blue Note」）在本張的答案是「沒有」——
唯一掛 Blue Note 的是 MB 那一筆 XW 數位 release，而那正是第 1784 條判退時明文排除的那一種。**

⚠ ⚠ **`The Blue Note Tokyo` 是場地，不是廠牌，這一點要寫死**：
Discogs 把它放在 **`companies` 欄**、前綴逐字 `Recorded At:`；**`labels` 欄裡沒有它**。
**Blue Note Tokyo 是東京的爵士俱樂部（Blue Note 紐約俱樂部的授權分店），與 Blue Note Records 這個廠牌是兩件事。**
**這與第 1817 條的日本線陷阱（`Nihon Blue Note [76903afe]` ≠ `Blue Note [713c4a95]`）是同一個家族的第二種形狀：
第一種是 MB 端有兩個相近的 label 實體，第二種是「Blue Note」三個字出現在盤名／場地欄而不是廠牌欄。**

⚠ ⚠ **本條最有說服力的一筆佐證，是同組另一張卡的對照**：
**`山中千尋 —《Prima del Tramonto》` 走的是同一間公司、同一個 `UCCJ-` 號段（`UCCJ-2167`，與本張的 `UCCJ-2164` 只差三號）、同一年（2019）、同一套 companies（`Record Company: Universal Classics & Jazz`、`Phonographic Copyright (p): Universal Music LLC`）——
但 Discogs `13802015` 的廠牌欄逐字是 `Blue Note`（`entity_type_name` 逐字 `Label`），MB 四筆 release 的 label-info 逐字也全部是 `Blue Note [713c4a95]`。**
**同號段、同公司、同年，Discogs 的編輯在兩張碟上做了不同的標記——那個差別不是雜訊，是真的。**
**所以本條不是「日本線一律退」，是「日本線要逐張看廠牌欄」：`UCCJ-2167` 收，`UCCJ-2164` 退。**

⚠ **附帶：本張的年份覆核順便跑完了，訊號是假的**——
**MB frd 逐字 `2019-03-20`、Discogs `released` 逐字 `2019-03-20`、Apple jp `releaseDate` 逐字 `2019-03-20T07:00:00Z`，三層同到日；
而且 `slice.json` 的 `nReleases: 1` 已過期（MB 現在是 2 筆，含一筆 JP 實體 SHM-CD）。**
**若這張碟廠牌過得了閘，`year: 2019` 是對的。退的理由與年份無關。**

⚠ **掛名層本棒也查完了，一併記下供日後若翻案時用**：**依 `ALBUM_ONBOARDING.md` §0.5（日籍藝人用日文漢字／假名本名），
`Ai Kuwabara` 應寫成 `桑原あい`**——**MB artist 實體 `a58a6930` 的名稱逐字就是 `桑原あい`、Apple jp 的 `artistName` 逐字是 `桑原あい, スティーヴ・ガッド & ウィル・リー`、UMJ 官網 `<title>` 逐字 `桑原あい with スティーヴ・ガッド and ウィル・リー`**；
**池中 `桑原あい`／`Ai Kuwabara`／`桑原あいトリオ・プロジェクト` 三形皆 0 列**（第 307 條無可沿用對象）。
**`with Steve Gadd and Will Lee` 依第 1703 條收斂的那一句（「池中有沒有同系列前作」）應判不留**——池中 0 列、
而 Apple 另有 `Ai Kuwabara The Project —《Making Us Alive》(2022)` 這條長期並行的線，
**留 feat. 式子句會讓同一個主體裂成兩個字串，與第 1720 條 `THE SPHÈRES` 同形。**
⚠ **這一段是備查，本張已退，不進 `prop-b.json`。**

**可逆性**：改的是退表一行與 manifest 欄位，不動卡池結構，屬「可逆」，依裁定權下放第 2 條當場定、不上呈。
⚠ ⚠ **本條是本組唯一一條「主線可能想覆核」的裁定**：若主線認為 MB 那一筆 XW 數位 release 的 `Blue Note [713c4a95]` 足以過閘，
把這張碟加回來只要補一筆 prop 條目即可，證據上面全部備妥。

---

## 第 1875 條（**派工信地雷 2**）：**`Art Blakey & The Jazz Messengers —《Just Coolin'》` 判 (甲)——Discogs 的 notes 欄逐字寫死了「All tracks previously unissued.」；曲目與池中一張既有卡重疊四首，但那是另一次演出，(丁) 不成立**

**(甲) 的逐字依據**：**Discogs `15639198` 的 notes 欄逐字兩句**——
`Recorded at Van Gelder Studio, Hackensack, NJ on March 8, 1959.` ＋ **`All tracks previously unissued.`**
（companies 欄逐字亦有 `Recorded At: Van Gelder Studio, Hackensack, New Jersey`）。
**MB frd 逐字 `2020-07-17`、Apple us `1500694273` 的 `releaseDate` 逐字 `2020-07-17T07:00:00Z`、℗ 欄逐字 `Blue Note Records; ℗ 2020 UMG Recordings, Inc.`。**
**「從未發行過的錄音首次以錄音發行」六個字一字不差 → (甲) 成立。**

⚠ ⚠ **派工信要求「務必逐字確認『從未發行過』，若其中某些軌先前以單曲或合輯出過，就不是純 (甲)，要改判 (丁)」。逐字查完，結論分兩層**：

| 層 | 結果 |
|---|---|
| **錄音（母帶）層** | **從未發行過**——Discogs notes 逐字 `All tracks previously unissued.` |
| ⚠ **曲目（作品）層** | **六軌裡有四首與池中一張既有卡同曲**：seed 的 **`Art Blakey and the Jazz Messengers —《At the Jazz Corner of the World》(1959)`**（`c137/prop-b.json` 與 `c137-cards.json` 亦有）收有〈Hipsippy Blues〉〈M&M〉〈Just Coolin'〉〈Close Your Eyes〉 |

**→ (丁) 不成立、(甲) 維持。** 理由一句：**那張是 1959 年 4 月 15 日在 Birdland 的現場，本張是同年 3 月 8 日在 Van Gelder 錄音室的 session——同一批曲子的兩次不同演出，不是同一份母帶。**
**(丁) 說的「部分重疊」指的是錄音重疊，不是曲目重疊；若曲目重疊就算 (丁)，本線每一張爵士標準曲的碟都會是 (丁)。**

⚠ ⚠ **但這一層必須寫進 `risk` 並交給下游敘事層當硬要求**（已寫）：
**簡介要寫明本張是「錄音室版、當年未發」，不得與那張現場盤的同名曲混談。**
⚠ **`chk-prop` 完全抓不到這個重疊**——它比的是「掛名｜盤名」折鍵，曲目層不在它的視野裡。

⚠ **(甲) 卡的 `year` 取「首次發行年」而不是「錄音年」**：本卡 `year: 2020`（不是 1959）。
**照的是本線既有 (甲) 卡的同一條**（`Art Blakey —《Drums Around the Corner》(1999)`（c-156 a）、
`Charlie Parker & Dizzy Gillespie —《Diz ’n Bird at Carnegie Hall》(1997)`（c-153 b，主線第 1721 條逐字覆核過））。
⚠ **派工信提到「(甲) 目前有六種辨識形狀，最新的第 1704 條」——本張不屬第 1704 條那一種**（先前只以影像載體發行過），
**它是最基本的第一種：整場 session 壓根沒發過。**

---

## 第 1876 條（**派工信地雷 3；主線第 1721 條觀察名單四筆的結算**）：**四筆逐筆跑完年份覆核，三筆維持、一筆改判——`Rick Margitza —《Hope》` 2020 → 1991**

主線第 1721 條把本組四筆列為觀察名單（`Ai Kuwabara`／`Jacky Terrasson`／`GoGo Penguin`／`Rick Margitza`），
四筆在 `slice.json` 裡都是 **`nReleases: 1` ＋ `formats: ["Digital Media"]` ＋ `country: "XW"` ＋ `catno: []`**，四個訊號全中。
⚠ **主線同一條也逐字提醒「訊號亮不代表要改判，逐筆看」。四筆逐筆跑完，結果三比一。**

| 卡 | MB `frd` | ② Discogs `released` | ④ Apple `releaseDate` ／ ℗ 年 | 判 |
|---|---|---|---|---|
| `Ai Kuwabara…《Live at Blue Note Tokyo》` | `2019-03-20` | **`2019-03-20`**（JP 實體 SHM-CD `13373984`） | `2019-03-20T07:00:00Z`／℗ 2019 | **維持 2019**（⚠ 該卡另因 (丙) 退，見第 1874 條）；⚠ **`nReleases: 1` 已過期，MB 現在是 2 筆** |
| `Jacky Terrasson —《53》` | `2019-09-27` | **`2019`**（歐版實體 CD `14200033`，catno `0808196`） | `2019-09-27T07:00:00Z`／℗ 2019 | **維持 2019**；⚠ **`nReleases: 1` 已過期，MB 現在是 2 筆（含一筆 CD）** |
| `GoGo Penguin —《Live from Studio 2》` | `2020-11-27` | **`2020-11-27`**（兩筆數位 `37556118`／`16278491`） | `2020-11-27T08:00:00Z`／℗ 2020 | **維持 2020**；⚠ **這張確實只有數位，沒有實體零售盤——但演出本身就在 2020 年**（Discogs notes 逐字 `(Live from Studio 2, Abbey Road Studios, London / 2020)`） |
| ⚠ ⚠ **`Rick Margitza —《Hope》`** | ⚠ **`2020-04-10`** | ⚠ ⚠ **`1991`**（**五筆 1991 年的實體條目**） | ⚠ ⚠ **`1991-01-01T08:00:00Z`／℗ 欄逐字 `A Blue Note Records Release; ℗ 1991 Capitol Records, LLC`** | ⚠ ⚠ **改判 1991** |

### `Rick Margitza —《Hope》` 改判的逐字依據

- **MB RG `b997a7b7-46b2-4aa8-9575-523c94cfd360` 轄下只有 1 個 release**：`6070288c`（**2020-04-10 XW Official Digital Media 11 軌**，`Blue Note [713c4a95]` catno=null，barcode `602508924392`）。
  **MB 沒有為 1991 年的任何一筆實體建 release，`first-release-date` 因此被整個拉到 2020。**
- **② Discogs 有五筆 1991 年的實體條目，四個不同的目錄號**：
  **`1749772`（1991 US CD `Blue Note CDP7948582`，barcode `077779485826`，11 軌）**／
  `11567938`（1991 US 卡帶 `B4-94858`）／`16029789`（1991 US 宣傳卡帶）／`38010000`（1991 US Columbia House CD `CDP-594858`）／
  **`21540820`（1991 Japan CD `Blue Note TOCJ-5285`，東芝 EMI）**。
- **④ Apple us/fr `1506295924`**：**℗ 欄逐字 `A Blue Note Records Release; ℗ 1991 Capitol Records, LLC`**、11 軌；
  ⚠ `releaseDate` 逐字 `1991-01-01T08:00:00Z` 是**第 1601 條的年初佔位日**，**只取年不取日**。
- ⚠ ⚠ **曲目同一性對得上**：**MB 2020 數位那筆 11 軌，與 Discogs 1991 美版／日版 CD 的 11 軌逐字逐序完全相同**
  （The Journey 6:55／Song Of Hope 5:59／Stepping Stone 8:46／The Princess 5:05／Walls 6:49／Mother's Day 1:23／Recess 4:41／Heritage 5:28／The Old Country 8:40／We The People 4:01／Cornfed 8:15）——**是同一張碟，不是兩張同名碟。**

**→ 依「三層對照、兩層以上取多數」判 `year: 1991`。**

⚠ **改判之後 (乙) 要重跑一次，結論是不成立、照收**：**1991 年的 Blue Note `CDP7948582` 就是這張碟的首發原盤**，
不是庫藏、不是再發、不是日版 CD 化（`TOCJ-5285` 是同年的日版首刷）。
**(乙) 擋的是「母體原在 Blue Note 的純庫藏／再發」，本張的母體就是 Blue Note 的當代新錄音，正是本線要收的東西。**
⚠ **本張與 `c149/prop-b.json`《Color》(1989)、`c150/prop-b.json`《This Is New》(1991) 構成 Margitza 在 Blue Note 的三張線，三張不重複。**

⚠ ⚠ **本條是主線第 1785／1791 條那個偵測訊號在本線的第二次真陽性**（第一次是 c-163 a 的 `Tim Hagans《Audible Architecture》2014 → 1995`）。
**主線第 1721 條的觀察名單 11 筆裡，本組這四筆已結清：1 筆改判、2 筆維持、1 筆因其他理由退。**
⚠ **給後續批次（c-165 a／c-167 a,b／c-170 a,b）的一句**：**這個訊號的真陽性率目前是 1／4。分辨的關鍵在 ② Discogs——
「Discogs 有沒有比 MB `frd` 更早的實體條目」一查就知道，比看 MB 的 release 數量可靠得多。**

⚠ **另一個副產品**：**`slice.json` 的 `nReleases` 欄在本組四筆裡有兩筆已過期**（Kuwabara 與 Terrasson 現在都是 2 筆）。
**`slice.json` 是 2026-09-15 產的，MB 這三個月又長了東西。`nReleases: 1` 這個訊號要當「切片時的快照」看，不是現況。**

---

## 第 1877 條（**回報派工信與正本／實況的牴觸，派工信逐字要求**）：**三處**

### （一）派工信「池中幾乎確定已有卡的」名單，八筆裡有四筆實掃是 0 列

派工信地雷 7 逐字列出：「`Norah Jones`（本組兩張）／`Mark Knopfler`／`Bill Frisell`／`Gregory Porter`／`Charles Lloyd`／`Ron Carter`／`Götz Alsmann`／`Derrick Hodge`」。
**逐一實掃 `seed_cards.json` 17,248 列（折鍵 ＋ 子字串兩種掃法）結果**：

| 掛名 | seed 實掃 | 卡單／prop 實掃 | 派工信說法 |
|---|---:|---:|---|
| `Norah Jones` | **4 列** | 8 筆／4 張 | ✓ 對 |
| `Mark Knopfler` | **1 列** | 0 | ✓ 對 |
| `Gregory Porter` | **4 列** | 0 | ✓ 對 |
| `Charles Lloyd` | **5 列** | 7 筆／3 張 | ✓ 對 |
| ⚠ **`Bill Frisell`** | **0 列** | **0 筆** | ❌ **池中完全沒有** |
| ⚠ **`Ron Carter`** | **0 列**（裸名；只有 `Red Garland / Ron Carter / Philly Joe Jones`、`Jim Hall & Ron Carter` 兩個聯名別形） | 18 筆／9 張 | ⚠ **「已有卡」只在卡單層成立，seed 是 0** |
| ⚠ **`Götz Alsmann`** | **0 列** | 10 筆／5 張 | ⚠ **同上** |
| ⚠ **`Derrick Hodge`** | **0 列** | 4 筆／2 張 | ⚠ **同上** |

**不影響任何一張的判定**（四筆都不是撞卡，四筆都收），**但派工信那句「撞到就退」若照字面執行會誤退三張**。
⚠ **根因推測：派工信把「卡單／prop 裡有」與「seed 裡有」混為一談。這兩層在去重上都要掃（`chk-prop` 的線上池只掃 seed，跨批那一道才掃 prop），但「已有卡」這個說法要分清楚是哪一層。**

### （二）派工信說 `Dr. Lonnie Smith —《All in My Mind》`「幾乎確定要退」，實查是收

見第 1872 條全文。⚠ **派工信自己留了但書，本棒照但書走，不算牴觸，但結論與派工信的預期相反，依要求記在這裡。**

### （三）派工信地雷 4 要本棒判 `Ai Kuwabara` 的掛名，但那張碟在更前面的閘就退了

派工信要求「`Ai Kuwabara` 的掛名要照 §0.5 判 → `桑原あい`，並套第 1703／1768／1769（四）條決定 `with Steve Gadd and Will Lee` 要不要留」。
**本棒把這一層查完了**（結論：`桑原あい`、不留 feat. 子句，逐字證據寫在第 1874 條末段），
**但那張碟依 (丙) 退，掛名不進 `prop-b.json`。** ⚠ **這不是牴觸，是順序問題：imprint 前置閘跑在六句之前（第 1794 條），而掛名判定跑在收碟之後。**

⚠ ⚠ **另記一處「派工信與正本一致、但實測與既有裁定相反」的操作面事實**：
**`bluenote.com/artist/derrick-hodge/` 現在回 200**，而 **c-162 b 第 1750 條實測時逐字記錄它回 404**。
**官網在這段期間補上了這一頁。後批查 ③ 不要沿用舊的 404 結論，要重測。**

---

## 第 1878 條：**掛名總表——沿用池中／卡單既有 13、新字串 5、新造分裂 0**

### （一）沿用既有字串 13 張／13 位（第 307 條）

`Ambrose Akinmusire`（seed 1＋c-162 a／c-163 a 共 2 張）／`Mark Knopfler`（seed 1）／
⚠ **`Lonnie Smith`（seed 4＋c-142／c-153／c-163 b 共 3 張；**四邊都給 `Dr.` 形仍沿用裸名，依第 1815 條，該條正文逐字點名了本張**）**／
`Jacky Terrasson`（c-152～c-160 共 9 張）／`Norah Jones` ×2（seed 4＋c-160／c-162／c-163 共 4 張）／
`Charles Lloyd`（seed 5＋c-146／c-163 a 共 2 張，裸名）／`山中千尋`（c-163 a／c-163 b 共 3 張，**主線第 1672 條指定，一字未改**）／
`Derrick Hodge`（c-162 b／c-163 b 共 2 張）／`GoGo Penguin`（seed 3）／`Rick Margitza`（c-149 b／c-150 b 共 2 張）／
`Götz Alsmann`（c-160 a～c-163 a 共 5 張，帶 `ö` U+00F6）／`Gregory Porter`（seed 4）／
`Art Blakey & The Jazz Messengers`（**seed 5 列就是這個 `&` 形字串**；池中另有 `Art Blakey and the Jazz Messengers` 20 列與裸名 `Art Blakey` 7 列，**三形在 `chk-prop` 的 `k()` 下前兩形同鍵、裸名不同鍵，各自都是既有字串，本卡不動任何一張**）。

### （二）新字串 5（池中與卡單皆 0 列）

| 掛名 | 依據 | 第 307 條反查 |
|---|---|---|
| ⚠ **`Thomas Dutronc & Les Esprits Manouches`** | **四邊二比二，判長形**：MB RG＋release 兩層 artist-credit 逐字長形、Discogs 黑膠 `12836644` 的 `artists` 欄逐字兩格（join `&`）／Discogs CD `12560916` 與 Apple `1420613594` 逐字短形。**計票三比二；`Les Esprits Manouches` 是實名編制（MB Group 實體 `70593c54`）不是 feat. 子句；依第 1703 條「池中有沒有同系列前作」，答案是沒有→「建」的那一側** | 長形／短形／`Les Esprits Manouches` 三形皆 0 列；⚠ **池中 `Jacques Dutronc —《Jacques Dutronc》(1966)` 是其父，另一個人，不併** |
| **`Bill Frisell`** | 四邊一致，裸名（MB Person `a21318db`／Discogs／Apple 逐字同形） | 0 列（`frisell` 子字串亦 0） |
| **`Yaron Herman Trio`** | **團名形四邊一致**（MB **Group 實體 `50bb373d`**／Discogs `13513150`／Apple `1447099462` 逐字同形）；**依第 1703 條，Apple 那一側同時掛著 `Yaron Herman Trio` 的《Follow the White Rabbit》(2010)《A Time for Everything》(2007)《Muse》(2009)——這是長期並行的一條線，不是為這張碟新造的** | `Yaron Herman Trio` 0 列；裸名 `Yaron Herman` seed 0 列（卡單有 c-163 b《Everyday》1 張）；希伯來文形 0 列 |
| ⚠ **`Ron Carter & Danny Simmons`** | **三邊三種寫法，依第 1539 條取 `&`**：MB 逐字逗號式 `Ron Carter, Danny Simmons`／Discogs 逐字 `Ron Carter And Danny Simmons (3)`（⚠ `(3)` 是站內消歧碼，依第 1720 條掛名票不計，但 `And` 連接符可讀）／**Apple `1458903206` 逐字 `Ron Carter & Danny Simmons`**。⚠ **`&` 與 `And` 在 `chk-prop` 的 `k()` 下折成同鍵，取哪一種都不造成分裂；取 `&` 是與池中 `Jim Hall & Ron Carter` 同一套排版** | `Ron Carter` 裸名 seed 0 列（卡單 9 張）；`Danny Simmons` 兩形皆 0 列 |
| ⚠ ⚠ **`The Nels Cline Singers`** | **四邊一致的團名形**（MB **Group 實體 `fd23ad56`**／Discogs `19744789`／Apple `1531002091` 逐字同形）。**見下面（三）的三字串裁定** | 四形（`The Nels Cline Singers`／`Nels Cline Singers`／`Nels Cline`／`The Nels Cline 4`）在 seed 皆 0 列；卡單只有 c-163 b `Nels Cline —《Lovers》` 1 張 |

### （三）⚠ ⚠ **派工信地雷 5 的三組「裸名 vs 團名形」——三組全部判各自成立，不算分裂**

**第一組（最複雜，三個字串散在兩批三組）**：
**`The Nels Cline Singers`（c-164 b，本組）／`The Nels Cline 4`（c-164 a，同時在跑）／`Nels Cline`（c-163 b《Lovers》2016 已收裸名）。**
**判：三個字串各自成立。四條理由**——
1. **折鍵後三個都是不同的鍵**（`thenelsclinesingers`／`thenelscline4`／`nelscline`）；**不是第 1702 條那種同一個名字的碼位差異，是三個不同的名字。**
2. **MB 端是不同的實體**：本張掛 **Group 實體 `fd23ad56`**，《Lovers》掛 Person 實體。**不是 credited-name 覆寫。**
3. **三者是三種真實存在、長期並行的編制**：Singers 是 2000 年起的五／六人電聲團、`The Nels Cline 4` 是 2018 年的四重奏、裸名是他個人掛名的作品（《Lovers》是大編制管弦樂計畫）。**第 1131 條「不同編制各自成立」，與主線第 1727 條處理 `Charles Lloyd & The Marvels` 用的同一條分界。**
4. **依第 1703 條「池中有沒有同系列前作」——`Nels Cline Singers` 在池中 0 列，這是「建」的那一側**（與 `Wayne Shorter Quartet`／`Julia Kadel Trio` 同形）；**與第 1768 條 `Robert Glasper Experiment` 判裸名那一側相反，因為那張的分界是「池中已有六張裸名前作」，本張池中裸名 seed 是 0 列。**
⚠ **四形全部寫進 `queryAlias`，供探測層與 c-164 a 交叉查。**

**第二組**：**`Yaron Herman Trio`（本組）vs `Yaron Herman`（c-163 b《Everyday》，另 c-164 a 有《Y》2017）。**
**判：各自成立。** 理由與上面（二）那一列相同——**MB 端是 Group 與 Person 兩個實體，三重奏是他長期並行的一條線（Apple 上有三張前作），池中裸名 seed 0 列。**

**第三組（雙人並列的連接符）**：**`Thomas Dutronc & Les Esprits Manouches`（判長形、`&`）與 `Ron Carter & Danny Simmons`（逗號式 → `&`，第 1539 條）。** 逐字依據見上面（二）。

### （四）新造分裂 0

**19 張逐一反查過：沒有任何一張造出「與池中既有主體折鍵後同鍵、但字串不同」的字串。**
⚠ **唯一需要盯住的是 `Art Blakey & The Jazz Messengers`**——池中同時有 `&` 形（5 列）與 `and` 形（20 列），
**兩形在 `chk-prop` 的 `k()` 下折成同一個鍵**，**本卡取的是池中已經存在的 `&` 形，沒有新造第三種寫法。**

---

## 第 1879 條（**派工信地雷 6**）：**標點與特殊字元逐字元核過——兩處判定與 MB 不同，`chk-prop` 兩處都不會亮**

派工信點名五個盤名。**逐字元（碼位）核完的結果**：

| 盤名 | 逐字元結果 | 判定 |
|---|---|---|
| ⚠ ⚠ **`Just Coolin'`** | **MB RG title 逐字 `Just Coolin’`（撇號是 **U+2019** 彎撇號）；② Discogs `15639198` 與 ④ Apple `1500694273` 逐字都是 **U+0027** ASCII** | ⚠ **取 ASCII `Just Coolin'`**。②＋④ 二比一；**而且池中同藝人與同線的既有盤名（`Moanin'`／`Buhaina's Delight`／`Home Cookin'`／`Prayer Meetin'`／`Rough 'n' Tumble`／`I'm Movin' On`）逐字元檢查過全部是 ASCII U+0027**。彎撇號形已進 `queryAlias` |
| ⚠ **`L.I.E.B.E.`** | **MB 與 Apple de `1535625211` 逐字都是全大寫 `L.I.E.B.E.`；② Discogs 三筆逐字都是 `L.i.e.b.e.`** | **取 `L.I.E.B.E.`**（第 1720 條計票 MB＋Apple 二比一）。⚠ **Discogs 那一票比平常有份量（`L.i.e.b.e.` 不是它的排版慣例產物），但 Discogs 自己兩筆條目的第一軌軌名逐字一筆 `L.i.e.b.e.`、一筆 `L.I.E.B.E.`，內部就不一致，未達獨立一票。** 五個句點都是 ASCII U+002E |
| **`Up at "Minton's", Vol. 2`** | **雙引號是 ASCII `"`（U+0022）、撇號是 ASCII `'`（U+0027），MB 與 slice 逐字相同** | **該卡已退（第 1871 條第 1 筆），不進 prop。**⚠ **但這一張留下一個要記的東西：它的折鍵是 `upatmintonsvol2`，池中原盤是 `upatmintonsvolume2`——`Vol.`／`Volume` 折出兩個鍵，`chk-prop` 盲點四，見第 1873 條末段** |
| **`Groovin' At Smalls' Paradise (Volume 2)`** | **兩個撇號都是 ASCII U+0027** | **該卡已退（第 1871 條第 2 筆）** |
| ⚠ **`8: Kindred Spirits (Live From the Lobero)`** | **冒號 ASCII U+003A、括號 ASCII U+0028/U+0029；MB 與 Apple `1491270957` 逐字零字差**；⚠ **② Discogs 五筆條目給了三種寫法（`…Live From The Lobero Theater`／`…Theatre`／`8 (Kindred Spirits Live From The Lobero Theater)`），彼此都不一致、且都多了 `Theater`／`Theatre`** | **取 MB＋Apple 的形**（第 1720 條：Discogs 那一側自己內部分裂，不計票） |

### 另外四處本棒自己加掃的

| 盤名／掛名 | 結果 |
|---|---|
| ⚠ **`COLOR OF NOIZE`** | **MB 與 Apple `1511790333` 逐字全大寫；Discogs 逐字 `Color Of Noize`。取全大寫**（第 1720 條二比一；Discogs 的全字首大寫是站內排版慣例，第 1698 條（四））。兩形折鍵後同鍵 |
| ⚠ **`Share the Wealth`** | **MB 逐字小寫 `the`；Discogs 與 Apple 都寫 `Share The Wealth`。取 MB 的小寫形**——**那兩邊各自都有全字首大寫的排版慣例，不是獨立的一票** |
| ⚠ **`All in My Mind`／`Down the Road Wherever`／`Live from Studio 2`／`Prima del Tramonto`／`Songs of the Degrees`／`Pick Me Up Off the Floor`** | **六張的介系詞小寫全部取 MB 形**；⚠ **其中 `Songs of the Degrees` 與 `Prima del Tramonto` 連 Apple 都是小寫形，三邊一致** |
| **`Götz Alsmann`／`山中千尋`** | **`ö` 是 U+00F6（與池中五張 prop 同碼位）；`山中千尋` 四個字都是常用漢字，無異體字風險** |

### ⚠ 非 ASCII 連字號與 U+30FC 掃描

**19 張的 `artist` 與 `album` 兩欄逐字元掃過 `‐ ‑ ‒ – — ― －` 七種非 ASCII 連字號與 U+30FC 長音記號：0 命中。**
**兩欄的全部非 ASCII 字元只有三處**：`Götz Alsmann` 的 `ö`（U+00F6）、`山中千尋` 的四個漢字（U+5C71 U+4E2D U+5343 U+5C0B）——**全部合法。**
**`chk-prop` 的那三道（非 ASCII 連字號 ×2、U+30FC）不會亮，而且這一次是真的沒有，不是被折鍵摺掉。**

---

## 第 1880 條：**撞陳列——收下的 19 張共 23 處／12 張；⚠ 撞 apex 王牌 0 處；⚠ 盤名逐字撞卡 1 處**

**掃法**（照第 738／859／1370 條）：**先印出 `seed_cards.json` 前兩列確認形狀**（逐字
`["The Rolling Stones","Some Girls",4,2,1,["rock","blues"],1978]`，**七欄的陣列的陣列，17,248 列，其中有第 9 格＝apex 層級的另計**），
再把 **seed 17,248 列 ＋ `batch-progress/*/prop-*.json` ＋ `desc-tools/batches/cards/*-cards.json` 合計 15,615 筆**
合成比對集，拿本組 **19 張的全部軌名（含各版本差異軌，合計 283 個去重軌名）＋19 個盤名** 逐一折鍵比對。

### ⚠ ⚠ 撞 apex 王牌：**盤名層 0 處、軌名層 0 處**

**23 處命中逐一回查 `seed_cards.json` 的第 9 格（tier），全部為空字串——本組沒有任何一處撞到 apex 卡。**
⚠ **派工信逐字要求「盤名也要獨立掃一次 apex（本線踩過兩次同名撞王牌）」——19 個盤名逐一手掃過，0 命中。**
⚠ **最接近的一次是 `L.I.E.B.E.`**：折鍵成 `liebe`，池中有五筆含 `liebe` 子字串的卡（含 apex `hall` 的 `Fritz Wunderlich —《Schumann: Dichterliebe》`），
**但沒有一筆的折鍵等於 `liebe`**——**子字串命中不是折鍵命中，不算撞卡；記在這裡是因為敘事層查資料時容易撈到。**

### ⚠ 盤名逐字撞卡 1 處（非 apex）

| 本組卡 | 撞到的 | 說明 |
|---|---|---|
| **`Bill Frisell —《Harmony》`** | **seed `The Wake —《Harmony》(1982)`** | **折鍵同為 `harmony`，掛名不同，`chk-prop` 的 `k(artist)\|k(album)` 配對鍵不會亮。**⚠ **這正是派工信要求「盤名獨立掃一次」的那個形狀，本組就中在這一張** |

### 軌名撞池中一般卡 22 處／11 張

| 卡 | 處 | 逐一 |
|---|---:|---|
| `Thomas Dutronc & Les Esprits Manouches` | 1 | 〈Love〉↔ seed `Love —《Love》(1966)` |
| `Lonnie Smith《All in My Mind》` | 1 | 〈Juju〉↔ seed `Wayne Shorter —《Juju》(1964)` ＋ `Siouxsie and the Banshees —《Juju》(1981)`（⚠ **本張那一軌正是 Shorter 那首曲子的改編，敘事層要寫明是翻奏**） |
| `Jacky Terrasson《53》` | 2 | 〈The Call〉↔ seed `Horace Tapscott with the Pan-Afrikan Peoples Arkestra —《The Call》(1978)`；⚠ **〈Mirror〉↔ 他自己的 c-160 a《Mirror》(2007)（同藝人自撞）** |
| **`Bill Frisell《Harmony》`** | 3（另加盤名 1） | 〈Everywhere〉↔ `Tim McGraw (1997)`；〈Hard Times〉↔ `Millie Jackson (1982)`；〈Lush Life〉↔ `John Coltrane (1961)` ＋ `Lou Donaldson (1980)`（亦在 c-141 prop） |
| `山中千尋《Prima del Tramonto》` | 1 | 〈Cherokee〉↔ seed `Jimmy Smith —《Cherokee》(1996)`（亦在 c-147 prop，**同一條 Blue Note 線**） |
| **`Charles Lloyd《8: Kindred Spirits》`** | **5** | ⚠ ⚠ **〈Dream Weaver〉↔ seed `Charles Lloyd —《Dream Weaver》(1966)`、〈Forest Flower〉↔ seed `Charles Lloyd —《Forest Flower》(1967)`（同藝人自撞兩處，那兩軌在 MB 的 12 軌加長版上）**；〈Requiem〉↔ `José Maurício Nunes Garcia (2008)` ＋ `Auto-Mod (1983)`；〈La Llorona〉↔ `Chavela Vargas (1993)`；〈Green Onions〉↔ `Booker T. & the MG's (1979)`（⚠ **Booker T. Jones 本人就在這場客座**） |
| `Derrick Hodge《COLOR OF NOIZE》` | 1 | 〈19〉↔ seed `Adele —《19》(2008)` |
| `GoGo Penguin《Live from Studio 2》` | 1 | 〈Protest〉↔ seed `Bunny Wailer —《Protest》(1977)`（亦在 c-57 prop） |
| **`Rick Margitza《Hope》`** | 3 | 〈Walls〉↔ `Apparat (2007)`；〈Heritage〉↔ `Eddie Henderson (1976)` ＋ **c-162 a `Lionel Loueke —《Heritage》(2012)`（同一條 Blue Note 線上的待上架卡）**；〈We The People〉↔ `Chuck Brown & the Soul Searchers (1972)` |
| **`Gregory Porter《All Rise》`** | 4 | 〈Phoenix〉↔ `Labelle (1975)`；〈Merry Go Round〉↔ `Elvin Jones —《Merry-Go-Round》(1972)`（**折鍵後同鍵，連字號被剝掉**）；〈Thank You〉↔ `Duran Duran (1995)`；〈Revival〉（Deluxe 差異軌）↔ `Selena Gomez`／`Eminem`／`Gillian Welch`／`Q65` 四張同名碟 |
| `Art Blakey《Just Coolin'》` | 1 | 〈Close Your Eyes〉↔ c-152 prop `Kurt Elling —《Close Your Eyes》(1995)` |

### ⚠ 曲目層的重疊（`chk-prop` 與上面這張表都抓不到）

| 本組卡 | 與池中／卡單重疊 | 下游敘事的硬要求 |
|---|---|---|
| ⚠ ⚠ **`Art Blakey《Just Coolin'》`** | **六軌裡四軌（〈Hipsippy Blues〉〈M&M〉〈Just Coolin'〉〈Close Your Eyes〉）與 seed `Art Blakey and the Jazz Messengers —《At the Jazz Corner of the World》(1959)` 同曲** | **必須寫明本張是 1959-03-08 的錄音室 session、那張是 1959-04-15 的 Birdland 現場，兩次不同演出**（見第 1875 條） |
| ⚠ **`GoGo Penguin《Live from Studio 2》`** | **七軌全部取自他們自己的舊碟，其中〈Totem〉〈Bardo〉〈Atomised〉〈F Maj Pixie〉出自 seed 已有的《Man Made Object》(2016) 與《Gogo Penguin》(2020)** | **必須寫明是現場重奏，不是那兩張的曲目重複上架** |
| ⚠ **`Charles Lloyd《8: Kindred Spirits》`** | **〈Dream Weaver〉〈Forest Flower〉是他 1966／1967 兩張同名碟的標題曲** | **必須寫明是 2018 年八十歲生日現場的重奏** |

### ⚠ `chk-prop b` 四道

**`node batch-progress/c164/chk-prop.mjs b` → 標記 0**（127 批、5,127 卡；**跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0**，後三項只報不擋）。
⚠ ⚠ **但本組有三處是「標記 0 不等於沒問題」的實例，逐一記在上面**：
盤名 `Harmony` 撞卡（掛名不同，配對鍵不亮）、`Just Coolin'` 的撇號碼位（折鍵摺掉）、
`Vol.`／`Volume` 折出兩個鍵（若 Turrentine 那張沒被 (乙)／(戊) 擋下就會過關）。

---

## 第 1881 條：**曲風——19 張裡 12 張 `['jazz']`、6 張帶第二個值；⚠ 其中一張完全不掛 jazz**

| 曲風欄 | 張數 | 卡 |
|---|---:|---|
| `['jazz']` | **12** | Dutronc／Lonnie Smith／Terrasson／Frisell／Yaron Herman Trio／Ron Carter & Danny Simmons／山中千尋／Charles Lloyd／Derrick Hodge／GoGo Penguin／Margitza／Art Blakey |
| `['jazz','pop']` | **3** | `Norah Jones《Begin Again》`／`Norah Jones《Pick Me Up Off the Floor》`／`Götz Alsmann《L.I.E.B.E.》` |
| `['jazz','hiphop']` | **1** | `Ambrose Akinmusire《Origami Harvest》` |
| `['jazz','soul']` | **1** | `Gregory Porter《All Rise》` |
| `['jazz','rock']` | **1** | `The Nels Cline Singers《Share the Wealth》` |
| ⚠ ⚠ **`['rock']`（不含 jazz）** | **1** | **`Mark Knopfler《Down the Road Wherever》`** |

⚠ ⚠ **`Mark Knopfler` 那一張是本組唯一不掛 jazz 的卡，這是刻意的**：
**MB `genres` 逐字 `rock`(2)／`soft rock`(2)／`folk rock`(1)／`jazz`(1)——最高票是 rock；
② Discogs `12821424`／`13349442` 的 `genres` 逐字都是 `["Rock"]`／`styles` 逐字 `["Soft Rock"]`，沒有 Jazz；
④ Apple 的 `primaryGenreName` 逐字 `Rock`。三邊都判搖滾。**
**`slice.json` 的 `genre: "jazz"` 是廠牌列舉檔的預設值（`blue-note.json` 全檔 1,365 列都標 jazz），不是曲風判定。**
⚠ **池中同藝人的《Sailing to Philadelphia》(2000) 逐字是 `["rock","blues"]`，本張沒有 blues 訊號，不照抄。**

### 嚴格照第 1602 條「兩邊都掛」的有 3 張，本棒放寬的有 2 張（逐張交代）

| 卡 | 第 1602 條 | 本棒的判與理由 |
|---|---|---|
| `Ambrose Akinmusire《Origami Harvest》` | ✓ **兩邊都掛**（MB `hip hop`(1)、Discogs `genres` 逐字 `["Hip Hop","Jazz"]`） | `['jazz','hiphop']` |
| `The Nels Cline Singers《Share the Wealth》` | ✓ **兩邊都掛**（MB `rock`(1)、Discogs `genres` 逐字 `["Jazz","Rock"]`） | `['jazz','rock']` |
| `Norah Jones` ×2 | ✓ **Discogs `["Jazz","Pop"]` ＋ Apple `Pop`**；MB 那邊是 `vocal jazz`／`singer-songwriter`（同方向） | `['jazz','pop']`，**與池中《Come Away with Me》同形** |
| ⚠ **`Gregory Porter《All Rise》`** | ✗ **MB 逐字只有 `jazz`(1)** | ⚠ **仍判 `['jazz','soul']`**：**Discogs 同時在 `genres`（`["Jazz","Funk / Soul"]`）與 `styles`（`["Soul","Soul-Jazz"]`）兩欄給了三個 soul 訊號**，且**池中同藝人三張逐字都是 `["jazz","soul"]`**。**可逆（改的是卡單值）** |
| ⚠ **`Götz Alsmann《L.I.E.B.E.》`** | ✗ **兩邊給的都是 `easy listening`，不在十個合法值裡** | ⚠ **仍判 `['jazz','pop']`**：**c-160 a／c-161 a／c-161 b／c-162 a／c-163 a 五張同藝人卡逐字全部是 `["jazz","pop"]`，而本張的素材（1950–60 年代德國流行歌本）比那五張更靠流行那一側**。**`easy listening` 在本線的對映就是 `pop`。可逆** |

### ⚠ 依第 1572 條不跟的細分詞（本組共 9 種、出現 21 次）

**`contemporary jazz`（9 張中招，最多）／`post-bop`／`post bop`／`hard bop`／`soul jazz`／`jazz fusion`／`free improvisation`／`vocal jazz`／`singer-songwriter`／`soft rock`／`folk rock`／`easy listening`／`ballad`／`gospel`／`spoken word`／`beat poetry`／`Non-Music`——一個都沒有跟。**
⚠ **`Ron Carter & Danny Simmons` 那張特別值得記**：**Discogs `genres` 逐字 `["Jazz","Non-Music"]`、`styles` 逐字 `["Spoken Word"]`、MB 逐字 `beat poetry`(1)／`spoken word`(1)**——
**這張碟有一半是唸詩，但十個合法值裡沒有可對映的，只能留 `['jazz']`。** 記在這裡供日後若店主要開 spoken-word 這一格時參考。

⚠ **曲風欄逐張判、不逐藝人判**（c-163 b `Lionel Loueke《Gaïa》` 的先例）——本組有三張刻意與同藝人既有卡不同：
`Akinmusire`（池中《On the Tender Spot》是 `["jazz"]`）／`Charles Lloyd`（池中四張 1960–70 年代是 `["jazz","world"]`）／
`Derrick Hodge`（c-163 b《The Second》是 `["jazz","soul"]`）／`The Nels Cline Singers`（c-163 b《Lovers》是 `["jazz"]`）。

---

## 第 1882 條：**來源命中率與操作面結算**

### 五層命中率（22 筆全體，含退件）

| 層 | 命中 | 備註 |
|---|---:|---|
| **② Discogs** | **22／22** | **每一張都查到了零售條目，`format`／`series`／廠牌鏈／companies 四欄逐字可用。⚠ 本批的三次退件全部由這一層定案**（Turrentine 與 Jimmy Smith 的原盤條目、Kuwabara 的 `Verve Records` 廠牌欄） |
| **④ Apple** | **20／22** | ⚠ **兩張 0**：**`Ambrose Akinmusire《Origami Harvest》`（用盤名查 us 回 0 筆；改用 `Akinmusire` 掃全目錄回 25 筆、涵蓋他 2007–2026 的十張個人碟，唯獨沒有這張——**是真的不在店面，不是查法錯誤**）；`Götz Alsmann《L.I.E.B.E.》` 的 us 0（de 有貨，`1535625211`） |
| **③ 廠牌官網** | **15／21 位藝人** | **`bluenote.com/artist/<藝人>/` 逐一實測**：**200** ＝ ambrose-akinmusire／dr-lonnie-smith／jacky-terrasson／bill-frisell／norah-jones／ron-carter／charles-lloyd／derrick-hodge／gogo-penguin／rick-margitza／nels-cline／gregory-porter／art-blakey／stanley-turrentine／jimmy-smith；**404** ＝ thomas-dutronc／mark-knopfler／yaron-herman／gotz-alsmann／ai-kuwabara／chihiro-yamanaka／**lonnie-smith（裸名路徑，要走 `dr-lonnie-smith`）**。⚠ **404 的六位全是歐陸與日本線藝人**（第 1750／1775 條的形狀）；⚠ **`derrick-hodge` 現在回 200，與 c-162 b 第 1750 條記錄的 404 相反，見第 1877 條（四）** |
| **① 紙本** | **未執行（18 張）／1 張留給下游** | ⚠ ⚠ **依主線第 1728 條第 2 點，2016 年以後的碟紙本結構性查不到，「紙本 0 命中」不得寫成缺失或疑點，也不要花工時去抓——本組 18 張（2018–2020）直接跳過這一層，19 張的 `risk` 裡一律不交代紙本。**⚠ **唯一的例外是 `Rick Margitza《Hope》`**：**改判到 1991 之後落在 Billboard 有覆蓋的年段（1955→2015，第 1723 條）**，依第 1728 條第 3 點「紙本仍要查 2015 以前的碟」**這一張該查，本棒未執行，已在該卡 `risk` 註明留給下游** |
| **⑥ 維基／⑤ AllMusic** | **0** | 未使用（②④③ 三層已足以定案每一張） |

⚠ **本批的來源序列（主線第 1728 條起的新序）在實務上完全成立**：
**② Discogs 22／22，而且三次退件、兩次盤名裁定、一次年份改判全部由它定案；④ Apple 20／22，主要貢獻是 ℗ 年（Turrentine 的 `℗ 1961`、Jimmy Smith 的 `℗ 1957`、Margitza 的 `℗ 1991` 三筆都是決定性的）。**
⚠ ⚠ **本棒要補一句給後批：④ Apple 的 ℗ 欄在「老碟的日版再發」這個形狀上特別可靠**——
**它保留的是原始權利年而不是再發年**（Turrentine 那張的 Apple 條目 `releaseDate` 逐字是 `1961-04-19`，日版 CD 是 2019 年的事），
**與第 1601 條記錄的「2005 年後 ℗ 欄常寫現在的權利人」那個陷阱方向相反。兩個都要記，用哪一個看碟的年代。**

### 操作面（供後批直接抄）

- **MusicBrainz 的 User-Agent 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`，本批 22 個 RG ＋ 85 筆 release 明細共 107 次請求，零 503。** 節流 1.1 秒／次。
- **Discogs 的 `api.discogs.com` 免認證可用**（`database/search?type=release` 與 `releases/<id>` 兩個端點），
  ⚠ **節流要拉到 2.6 秒／次**，本批 22 次搜尋 ＋ 29 次 release 明細零 429。
- **`itunes.apple.com/search` 偶爾回空 body**（本批中過 5 次），**要包 retry 並檢查 `if(!t.trim())`，不要直接 `JSON.parse`**。
- **證據層一抓完就寫進 repo**（`CLAUDE.md` 續跑安全第 3 點）：
  **`batch-progress/c164/mb-b.json`（85 KB）／`apple-b.json`（36 KB）／`discogs-b.json`（164 KB）／`discogs-rel-b.json`（46 KB）**，
  四份都在檔案系統上，重啟後可直接續跑，不必重抓。

### barcode 取用（第 1674 條：MB release `barcode` > Discogs > slice `catno`）

**19 張的 `label` 欄逐一記了 barcode，全部取自 MB release 的 `barcode` 欄**；
⚠ **只有 `Jacky Terrasson《53》` 的實體 CD 那一筆例外**——**MB `75384baf` 的 `barcode` 逐字 `null`、`label-info` 逐字空陣列，改取 Discogs `14200033` 的 `602508081965`**（第二順位），已在該卡 `label` 欄註明。


---
---

# c-164 **a 組鉤子層**裁定（編號 **1890–1896**）

**本段由鉤子 a 棒從檔尾 append，上方 a 組策展（1840–1869）與 b 組（1870–1882）一行未動。**
交件檔 `desc-tools/batches/hooks/c164-hooks-a.json`（22 筆，只有 `key`／`hook`／`note` 三欄，key 逐字複製、順序同研究稿）。
**`c164-hooks-b.json`、`research/c164-{a,b}.json`、`c164-cards.json` 一律未碰。**
正本三份（`hook-base.md`／`writer-base.md`／`CLAUDE.md`）與 `c163/rulings-mainline.md` 第 1718–1776 條開工前已完整讀過。

---

## 第 1890 條：交件總表與字元預算（第 1739-B ＋ 1766-B 條）

| 項目 | 數 |
|---|---|
| 交件張數 | **22／22** |
| `hook` 字數 | **13–26**（上限 30） |
| `hook` 加權 | **13–23**（上限 50） |
| `note` 原始字元 | **240–334**（上限 350） |
| **自算預算（`hook` 字元 ＋ Σ 各項目字元 ＋ 末尾要求寫進正文者）** | **200–230，中位 222，22 張全部 ≤230** |
| 主故事鏈項目數 | 4 項 ×18 張、5 項 ×4 張（全部落在 4–5） |
| `qa-batch hooks c164` a 組硬標記 | **0**（唯一那 1 個標記是「b 缺 hook 檔」，b 組未派工） |
| `chk-hook-crossgroup c164` | **✓ 全部通過**（開頭四字 22 張互異、禁語 0、否定句 0、分數星等 0、校對痕跡 0） |
| `互指?` | **0 處** |

**逐張「hook ＋ 各項目字元」（末尾要求寫進正文者以 `+` 另計）**：

| 卡 | 算式 | 合計 |
|---|---|---:|
| Ben l'Oncle Soul《Under My Skin》 | 24+59+41+39+42**+9** | **214** |
| Ambrose Akinmusire《A Rift in Decorum…》 | 17+67+45+53+39 | **221** |
| Charles Pasi《Bricks》 | 19+47+60+50+44 | **220** |
| Brian Blade Fellowship《Body and Shadow》 | 21+50+56+37+63 | **227** |
| Trombone Shorty《Parking Lot Symphony》 | 19+53+53+53+35 | **213** |
| 山中千尋《Monk Studies》 | 26+50+74+12+62 | **224** |
| Yaron Herman《Y》 | 15+41+61+39+24+20 | **200** |
| Götz Alsmann《In Rom》 | 16+52+67+28+60 | **223** |
| Tony Allen《The Source》 | 21+61+51+44+50 | **227** |
| José James《Love in a Time of Madness》 | 20+41+69+61+30 | **221** |
| Louis Hayes《Serenade for Horace》 | 26+70+65+37+29 | **227** |
| Kyoto Jazz Sextet《Unity》 | 24+46+50+50+42 | **212** |
| Dave McMurray《Music Is Life》 | 13+67+35+41+65 | **221** |
| Gregory Porter《One Night Only…》 | 19+75+50+40+30 | **214** |
| Tony Allen & Jeff Mills《Tomorrow Comes The Harvest》 | 19+49+71+63+20 | **222** |
| Wayne Shorter《Emanon》 | 19+65+32+78+21 | **215** |
| The Nels Cline 4《Currents, Constellations》 | 20+59+51+59+37 | **226** |
| Terence Blanchard featuring The E-Collective《Live》 | 19+62+46+57+42 | **226** |
| 山中千尋《Utopia》 | 20+69+41+54+46 | **230** |
| José James《Lean On Me》 | 19+60+38+55+55 | **227** |
| GoGo Penguin《A Humdrum Star》 | 22+68+24+59+56 | **229** |
| Marcus Miller《Laid Black》 | 20+57+52+40+58 | **227** |

⚠ **初稿 14 張超標（231–261，最高是《Utopia》的 261），全部在鉤子層整格捨去、零張留給寫作層**
（沿 c-163 的位置：a 組砍 8、b 組砍 6）。**捨去清單見第 1896 條。**
⚠ **第 1766-B 條的「末尾也要計入」在本組只命中一張**：`Ben l'Oncle Soul` 的「日版另加兩首原聲版（一句）」
是要寫進正文的次要軼事，已獨立計 9 字元。**其餘 21 張的末尾全是指派／排除句，不產生正文字數，計 0。**
⚠ **手算與實測的偏差方向**：本組**單向低估，中位約 +15%**（估 200 的那一格實測常是 230）。
**與 c-163 相反，第 1739-B 條「任何係數都不要繼承」再獲一次佐證**——本棒的作法是逐項用 `Array.from().length` 實測後再改，不靠估。

---

## 第 1891 條：序數逐張判定（第 1729／1732／1755-B 條三分法）——**8 寫 14 不寫**

**寫的 8 張**：

| 卡 | 寫成 | 類別 | 依據 |
|---|---|---|---|
| Trombone Shorty | 在 Blue Note 的第一張 | **(三)** | 官網逐字 `his debut album for Blue Note Records`，N=1 無計數歧義（第 1755-B 條） |
| Tony Allen《The Source》 | 在 Blue Note 的第一張全長專輯，並把那張四軌 EP 一起帶到 | **(三)** | 官網逐字 `debut full-length album`；**限定詞 `full-length` 與 EP 兩層一起寫進 `note`** |
| Louis Hayes | 以領班身分在 Blue Note 的第一張 | **(三) 身分敘述** | 官網兩篇稿逐字都有 `as leader`（他 1956 年起即以側手在該廠牌錄音） |
| Dave McMurray | 在 Blue Note 的第一張 | **(三)** | 官網逐字 `Blue Note Records debut` |
| Gregory Porter | 生涯第一張現場作品 | **(三)** | 官網逐字 `his first-ever live release` |
| Wayne Shorter | 自 2013 年《Without A Net》以來的第一張 | **(三) 間隔敘述** | 官網逐字 `his first release since 2013's Without A Net` |
| Brian Blade Fellowship | 樂團自己的第五張 | **(二) 藝人目錄序數** | 廠牌官網逐字 `their sublime fifth album`，一手來源一層即可（第 1732 條） |
| Kyoto Jazz Sextet | 這支團自己的第二張 | **(二)** | 廠牌官方商品頁逐字「隔了兩年的第二張」，一手來源 |

**不寫的 14 張，分三種理由**：

1. **(一) 廠牌目錄序數、官網有逐字但湊不出第二層 → 不寫，改用可查證的排序敘述**（3 張）：
   - `The Nels Cline 4`：官網逐字 `Cline's second Blue Note release`。**2018 年的碟在紙本層結構性不存在**（主線第 1728 條），
     兩層對不上 → 不寫；`note` 改寫成「比起 2016 年那張大編制的《Lovers》」。
   - `Marcus Miller`：官網逐字「在 Blue Note 發過兩張、2015 年的《Afrodeezia》是第一張」。同上 → 不寫；改用官網逐字的「隔了三年」（(三) 間隔敘述）。
   - `GoGo Penguin`：策展層第 1863 條已標明**官網只能推得、不逐字**（第 1714 條）→ 不寫。
2. **官網有頁但整頁沒有任何計數 → 不寫**（4 張）：`Ambrose Akinmusire`／`José James` 兩張／`Terence Blanchard`。
3. **③ 廠牌官網 404 → 一律不得寫序數**（6 張）：`Ben l'Oncle Soul`／`Charles Pasi`／`Yaron Herman`／`Götz Alsmann`／`山中千尋` 兩張。
   ⚠ `Yaron Herman` 的藝人官網目錄頁只列年份、沒有序數，**(二) 類同樣不成立**；`山中千尋` 兩張的 universal-music.co.jp 商品頁也沒有計數。

⚠ **本組沒有出現「官網寫第 N 張但沒寫明是廠牌還是藝人目錄」那種灰帶**（c-163 b 的 `Gaïa` 那型）。
⚠ **(一) 類在本組實質上寫不了**，與派工信第三節的預判一致：22 張全部是 2016–2018 的碟，紙本層結構性不存在。

---

## 第 1892 條：中間欄三種污染形狀——**本組抓到 5 處，全部是形狀 (1)「在真事實上多加沒出處的修飾」；形狀 (2)(3) 各 0 處**

依第 1733-B／1756-B／1763-B 條逐條回查該卡自己的 `facts`：

| # | 卡 | 中間欄逐字寫的 | 該卡 `facts` 實際只有 | 本棒處置 |
|---|---|---|---|---|
| 1 | `Brian Blade Fellowship` | `hookCandidates` 逐字「同一首**十九世紀**的聖詩」 | F7 只有作曲欄 `George C. Stebbins`、作詞欄 `Adelaide A. Pollard`，**沒有任何一層寫出年代** | hook 與 note 一律寫「同一首聖詩」，**年代整個不寫** |
| 2 | `GoGo Penguin` | `hookCandidates` 逐字「Carl Sagan 在《Cosmos》裡形容**太陽**的那句話」 | F0 的引文逐字只有 `a humdrum star`，**全篇沒有出現太陽** | hook 改寫成「一位天文學家在電視影集裡說的一句話」，note 只引原話本身 |
| 3 | `Tony Allen《The Source》` | `hookCandidates` 逐字「**七十七歲的**鼓手」 | F6 只寫 1940 年生於拉哥斯，**年齡是用發行年減出來的，沒有任何一層寫出** | **年齡整條不寫** |
| 4 | `Yaron Herman` | `hookCandidates` 逐字「盤名只有一個字母，是**他姓氏的第一個字母**」 | 三層都沒有寫出盤名由來（**研究層自己已在 `notes` 標明**） | **整條不寫**，改用軌目那一條 |
| 5 | `山中千尋《Monk Studies》` | `hookCandidates` 逐字「替她打鼓的**是** The Mars Volta 的鼓手」 | F2 逐字是「**曾是** The Mars Volta 與 Flying Lotus 的鼓手」——時態被改掉 | note 寫「鼓手**來自** The Mars Volta」，不寫現在式的隸屬 |

⚠ **形狀 (3)（整段來自同批另一張卡）0 處，但本組有三對形狀高度相似的卡，本棒逐條回查過「這一條到底在哪張卡的 facts 裡」**：
- **山中千尋 ×2**：`Boomtown Studio`／`Eric Elterman`／`Greg Calbi` 三個共用位置**寫在《Utopia》自己的 F7 裡**（研究層是從兩張條目並列推出的），
  **所以歸《Utopia》**；《Monk Studies》的 note 一個都沒寫。
- **Tony Allen ×2**：`Jean-Phi Dary` 在兩張各自的 facts 裡都有（《The Source》F9 的作曲欄、《Tomorrow Comes The Harvest》F1 的第三位作曲編曲者），
  **兩條是各自獨立的出處，不是串卡**；本棒在《The Source》只寫到「〈On Fire〉推的是鋼琴」（不寫人名），在聯名碟寫 `Jean-Phi Dary`。
- **José James ×2**：`Antario Holmes` 只在《Love in a Time of Madness》、`Don Was` 只在《Lean On Me》，**兩張互不沾**。

⚠ **另有一筆是策展層被研究層訂正、本棒照研究稿走**：`Ben l'Oncle Soul` 的 `curatorWhy` 寫「曲目走 big-band 路線」，
逐軌 credit 撐不起來——**note 照 facts 的小編制寫（吉他兼貝斯一人、鍵盤兼程式一人、管樂一人）**，並在末尾寫「編制照上列的小班底寫」。
`Kyoto Jazz Sextet` 的 `curatorRisk` 把 `Larry Young《Unity》` 寫成致敬對象——**note 停在官網那句「1960 年代 Blue Note 的新主流派調式爵士」的範圍內，Larry Young 一個字都沒寫**。

---

## 第 1893 條：反同構（第 1764-B 條兩段都做了）

### （1）五條軸的落點——每條只走一張，並在該張 `note` 裡寫死

| 軸 | 指定給 | `note` 寫死的句子 | 其餘候選改走的軸 |
|---|---|---|---|
| **日本線** | `Kyoto Jazz Sextet《Unity》` | 「日本線這條骨架全批只走本張」 | 山中千尋《Monk Studies》→「兩個姓 Monk 的人各佔一格」；《Utopia》→「古典曲目進三重奏」 |
| **非洲節奏進 Blue Note** | `Tony Allen《The Source》` | 「非洲節奏進 Blue Note 這條骨架全批只走本張」 | 《Tomorrow Comes The Harvest》→「黑膠與數位兩版不是包含關係」的載體軸 |
| **現場盤** | `Ambrose Akinmusire` | 「現場盤這條骨架全批只走本張」 | Gregory Porter →「四人樂團對七十人管弦樂團」；Terence Blanchard →「三場演出的選點」 |
| **歐陸樂手** | `Charles Pasi` | 「歐陸樂手進 Blue Note 這條骨架全批只走本張」 | Götz Alsmann →「城市三部曲＋義大利歌的德語唱法」；Yaron Herman →「客座名字寫進曲名」 |
| **翻唱致敬前輩** | `Louis Hayes《Serenade for Horace》` | 「翻唱致敬前輩這條骨架全批只走本張」 | José James《Lean On Me》→「當面求得本人祝福」；山中千尋《Monk Studies》→「同姓兩人」；Ben l'Oncle Soul →「那幾首歌本來就是法國人寫的」 |

⚠ **這五條一律當成「骨架」讀，不是題材配額**（`writer-base.md`「配額與反同構條款是兩件事」那節）：
四張致敬盤照樣各寫各自與被致敬者的具體關係，被限制的只有「以整張碟向前輩致敬」這一套撐全文的結構。

### （2）組內逐句自查——**本棒用到的句型模子與張數（給 b 組避開）**

**b 組沒有對組可讀（交件時 a 組已在檔），請把下表當成「已用額度」：**

| 句型模子 | a 組用了幾張 | 落在哪張 |
|---|---:|---|
| **「N 軌裡有 M 軌」數字模子** | **note 1 張、hook 0 張** | Brian Blade 的「九軌裡有兩軌」。⚠ **c-163 a 用 2、b 刻意用 0；本組壓到 1。b 組請再壓到 0 或 1，全批不要超過 3** |
| 「同一首 X 在碟上出現兩次」 | 1 | Brian Blade（hook） |
| 「某個時間點之後，某人做了某事」時序模子 | 2 | Tony Allen《The Source》「動筆之前」／José James《Lean On Me》「定好歌單之後」 |
| 數量對照模子（A 幾個對 B 幾個） | 2 | Gregory Porter「四人對七十人」／Tomorrow Comes The Harvest「黑膠四軌對數位十軌」 |
| 「某個欄位上寫著誰」credit 模子 | 2 | Ben l'Oncle Soul「作者欄是三個法國名字」／山中千尋《Monk Studies》「作曲欄與編曲欄」 |
| 引語定調模子（某人說了一句話） | 2 | Akinmusire「他說那個場子裡…」／Dave McMurray「廠牌總裁只說了一句」 |
| 「盤名來自⋯」模子 | 1 | GoGo Penguin |
| 「上一張 vs 這一張」對比模子 | 1 | Marcus Miller |
| 「一個人包辦多項」模子 | 1 | Charles Pasi |

**每種模子 ≤2 張，沒有任何一種到 3 張。** 開頭四字 22 張互異（`chk-hook-crossgroup` 已驗）。
⚠ **本組刻意避開的兩種**：「第一張／首張」當 hook 開頭（8 張都有序數可寫，全部壓進 `note`，hook 一張都不用），
以及「錄音室名當 hook 主語」（本組有六間以上錄音室的卡兩張，都改走別的切角）。

---

## 第 1894 條：跨卡交叉三條的歸屬（派工信第四節(三)）

| 交叉 | 歸屬 | 處置 |
|---|---|---|
| `Trombone Shorty` 客座在 `Marcus Miller` 的〈7-T's〉 | **歸 `Marcus Miller`** | 該條在 Marcus Miller 自己的 F2／F7 裡；`Trombone Shorty` 那張的 note 一個字都沒提 Marcus Miller |
| `Tony Allen` 兩張共用的三個幕後名字（Jean-Phi Dary／Eric Trosset／Chab） | **歸《Tomorrow Comes The Harvest》** | ⚠ **但本棒只寫 `Jean-Phi Dary`，而且是以「第三位作曲編曲者」的身分寫**（該卡 F1，不是共用那條 F11）；**共用關係本身整條捨去**（預算）。`Eric Trosset`／`Chab` 兩個名字兩張都沒寫 |
| `Dave McMurray` 吹長笛在 `José James《Lean On Me》` 的〈Kissing My Love〉 | **歸《Lean On Me》**（該條在該卡 F9） | ⚠ **但本棒在《Lean On Me》整格捨去了它**（見第 1896 條）：那一格與「當面求得 Withers 祝福」的主故事無關，且會把該卡的專名推到第五個。**`Dave McMurray` 那張因此也沒有寫**——兩張都不寫，不會雙寫 |

⚠ **另一條研究層點名、本棒照辦的**：`Louis Hayes` 的〈Song For My Father〉客座 `Gregory Porter` **歸 `Louis Hayes`**（研究稿 `notes` 逐字指定）。
**本棒同時把那個軌名整個拿掉、只寫「唯一有人聲的一軌由 Gregory Porter 客串演唱」**——
理由是第 1860 條(四)：〈Song For My Father〉與〈Silver's Serenade〉**逐字撞的就是致敬對象 Horace Silver 本人的兩張專輯名**，
不引軌名就不會讓論述碰到那兩張卡，而且省下 16 字元。

---

## 第 1895 條：撞陳列的下游處置，以及 `互指?` 0 處的人工覆核

**(一) 盤名撞陳列五組 14 張（第 1860 條(三)）——五張的 `note` 全部寫了「盤名出現時帶掛名與年份」這句指派**：
`Terence Blanchard《Live》`（「務必」）／`Tony Allen《The Source》`／`Kyoto Jazz Sextet《Unity》`／`山中千尋《Utopia》`／`Yaron Herman《Y》`（「一律」）。
⚠ **另外，這五張的 hook 沒有任何一張把盤名放進去**——單字母的《Y》與單詞的《Live》尤其危險，hook 層先把風險移除。

**(二) 軌名撞 apex 王牌 1 處**：`Tony Allen《The Source》` 第 4 軌〈On Fire〉。
**`note` 寫成「第四軌〈On Fire〉推的是鋼琴」＋末尾指派「〈On Fire〉出現時帶上鋼琴那一層」**——
照研究稿 `notes` 給的兩個區隔依據取了「發片稿說它突出的是鋼琴」那一個。
`Galaxie 500` 那張、以及 apex 這個字，`note` 裡一個都沒有出現。

**(三) 兩張致敬盤的 apex 鄰居（第 1860 條(五)）**：
`山中千尋《Monk Studies》` 的 note 末尾寫「論述集中在這次重新詮釋本身」；
`José James《Lean On Me》` 寫「論述集中在這次翻唱與那次見面」。**Thelonious Monk 與 Bill Withers 本人的專輯名一張都沒引。**

**(四) `互指?` 0 處。** ⚠ **第 1765-B 條說這一道會漏報，印出來的是子集**，所以本棒另外人工逐張比對過三對形狀相似的卡
（山中千尋 ×2、Tony Allen ×2、José James ×2）——**見第 1892 條末段，三對都乾淨。**
⚠ **`qa-batch` 的事實對照本棒另做過一次「活性驗證」**：故意把一張的年份改成 `1972`、另一張塞進一個不存在的專名，
**兩筆都被印出來（`年份?1972`／`專名?Zaphod Beeblebrox`）**，確認這道檢查在本批確實有在跑，隨即還原。
（⚠ 給後批一句：**`(19|20)\d{2}` 這個年份正則抓不到 19 世紀以前的年份**，古典批要注意。）

**(五) 獎項（第 1767-B 條）**：本組有獎項的三張——`Wayne Shorter` 第六十一屆葛萊美最佳爵士演奏專輯（**得獎**）、
`Terence Blanchard` 的《Breathless》第 58 屆入圍（**入圍**，note 寫死「《Breathless》寫成入圍」）、
`Yaron Herman` 2008 年 Victoire du Jazz 年度新人獎（**得獎**）、`Marcus Miller` 的兩座葛萊美（本棒因預算整格捨去）。
**三張分屬不同屆不同項，沒有任何一張寫成「唯一」，依第 1767-B 條不需互相點名；`note` 與正文都不會出現「同批」二字。**

---

## 第 1896 條：本信（派工信）與正本／實況的落差，以及整格捨去清單

### （一）落差三筆

1. ⚠ **派工信第五節(一)把「翻唱致敬某位前輩」列成「每種最多一張」的軸，但本組有四張是致敬／翻唱盤**
   （Louis Hayes／José James《Lean On Me》／山中千尋《Monk Studies》／Ben l'Oncle Soul）。
   **若當成題材配額執行，等於三張整條事實不能寫**——那正是 `hook-base.md`「廠牌規則」「曲風源流規則」兩節
   與 `writer-base.md`「配額與反同構條款是兩件事」那節取消掉的東西。
   **本棒把它讀成反同構條款**：四張照寫各自與被致敬者的具體關係，只有「以整張碟向前輩致敬」這套**骨架**歸 Louis Hayes。
   **這不是駁回派工信，是把它依正本讀成骨架限制。** 建議往後派工信照第 1725 條的正確措辭寫成
   「某某**骨架**在本批只准 N 張，指定給某某卡」，不要寫成題材名。
2. ⚠ **派工信第四節(三)要求三條跨卡交叉「各歸一張」，但其中一條（Dave McMurray 的長笛）本棒兩張都沒寫**——
   **不是漏看，是預算整格捨去**（見第 1894 條）。「各歸一張」的目的是防雙寫，捨去同樣達成，但與字面不同，逐筆記在這裡。
3. ⚠ **派工信第四節(一)點名 `Terence Blanchard` 的錄音地拼法兩層不同**（Discogs `The Wyley Theater`／官網 `Wyly Theatre`）。
   **本棒的處置是把錄音地點整個降級到城市這一層**（明尼亞波利斯、克里夫蘭、達拉斯），
   `note` 末尾寫「錄音地點只寫到城市這一層」——**兩種拼法都不進正文，衝突就不存在。**

⚠ **`PROJECT_MEMORY.md` 本棒未動**：`CLAUDE.md` 要求改檔就追加一筆，但派工信第九節與 `REMOTE_RUNBOOK.md` 明文禁止雲端碰它。
**依邊界從嚴，交由本機端補記。**

### （二）整格捨去清單（初稿 14 張超標，全部在鉤子層砍完；⚠ 本機若要補回，從同張的次要人名挪，不要加長）

| 卡 | 捨去的那一格 |
|---|---|
| Ben l'Oncle Soul | 〈The Good Life〉的法國作者欄那一句（與〈My Way〉同型，留一個就夠） |
| Charles Pasi | 第二位製作人 `Jean-Philippe Verdin` 的名字（改寫成「另一位製作人兼吉他與鍵盤」） |
| Brian Blade Fellowship | 聖詩的作曲者 `George C. Stebbins`；兩個版本的秒數（改寫成「各一分多鐘」） |
| Trombone Shorty | 壓軸場次的前輩 `The Neville Brothers` 與 `Professor Longhair`；製作人 `Chris Seefried` |
| 山中千尋《Monk Studies》 | 鼓手 `Deantoni Parks` 與貝斯手 `Mark Kelley` 的名字；錄音室 `Boomtown Studio` |
| Yaron Herman | `Adami` 爵士才華獎；`Montreux Jazz Festival` 評審主席那一格 |
| Götz Alsmann | 他一人兼八種樂器那一格；德語詞作者 `Kurt Feltz`／`Hans Bradtke` |
| Tony Allen《The Source》 | `Yann Jankielewicz`／`Lester Bowie`／`Gil Evans`／`Art Blakey` 四個名字；〈On Fire〉那一軌的 `Jean-Phi Dary` |
| José James《Love in a Time of Madness》 | 「他想的是移動、要人走上舞池」那一格；《Fifty Shades Darker》的演出 |
| Louis Hayes | 〈Hastings Street〉的軌名；`Don Was`／`Dezron Douglas` 的製作分工；「發片當月他將滿八十歲」 |
| Kyoto Jazz Sextet | 客座歌手 `Navasha Daya`；`Tomoki Sanders` 的名字（只留「Pharoah Sanders 的兒子」）；前作《Mission》的盤名 |
| Dave McMurray | 「和弦支撐少到最低反而給了他自由」那一格；班底 `Ibrahim Jones` 與兩位鼓手的名字 |
| Gregory Porter | 指揮兼編曲 `Vince Mendoza`；CD 加 DVD 版 12 月 21 日那一筆 |
| Tony Allen & Jeff Mills | 人聲 `Carl Hancock Rux` 的名字；完整版四首的長度 |
| Wayne Shorter | 圖像小說腳本的 `Monica Sly` 與繪者；「同樣三首曲子各出現兩次」與〈The Three Marias〉的長度差 |
| The Nels Cline 4 | 貝斯手 `Scott Colley` 與鼓手 `Tom Rainey` 的名字；駐場場地 `The Stone` |
| Terence Blanchard | 三個錄音場地名（降級成城市）；新加入的貝斯手 `David Ginyard` |
| 山中千尋《Utopia》 | `Tekla Bądarzewska-Baranowska`（單一專名就 30 字元）與〈La Priere D'une Vierge〉 |
| José James《Lean On Me》 | 〈Kissing My Love〉的長笛 `David McMurray`；樂團四人的名字；《No Beginning No End》的盤名 |
| GoGo Penguin | 音效工程師 `Joe Reiser`「第四位成員」那一格；《V2.0》入圍水星獎 |
| Marcus Miller | 兩座葛萊美與 Edison／Victoire du Jazz 三個獎；《Tutu》那一段；`Take 6`／`Kirk Whalum`／`Jonathan Butler` 三位客座 |

⚠ **本組每張的拉丁專名（不含本卡掛名與 Blue Note）都壓在 3–4 個以內**，
最密的是 `山中千尋《Monk Studies》`（Thelonious Monk／The Mars Volta／The Roots／William Henry Monk ＝ 4）。

---
