# c-184 裁定（日本爵士獨立廠牌線 jp-2・**第二批**；1972–1976 年段）

> ⚠ **本檔兩組共用**：**a 組編號區間 5716–5745，b 組 5746–5775**。
> 兩組各自只 append／prepend 自己那一段，**絕不覆寫對方**（c-175 差點整份被覆寫掉）。
> ⚠ **本檔由 b 組在 2026-09-25 建立**（建立前已跑 `git show HEAD:batch-progress/c184/rulings.md` 與 `ls` 兩者，兩者都確認本檔不存在）。
> **a 組那一段請 prepend 在本行之後、`# b 組` 標題之前，或 append 在檔末——任一皆可，但不要改動 `# b 組` 以下的內容。**

---

# b 組（19 張｜slice 的 `house` 分佈：CBS/Sony 4・East Wind 4・Nippon Crown 3・ALM 3・Alfa 2・URC 1・Denon 1・Frasco 1；⚠ **其中 3 筆的原壓廠牌不是 `house` 寫的那一家，兩筆 Alfa 全錯**）｜策展層｜2026-09-25

判準照 `batch-progress/CURATION-BRIEF-jp2.md`（本線簡報）→ `CURATION-BRIEF-jp1.md`（**機制整份沿用，含「一之二」四條，該節優先於該檔其他任何一節**）
→ `CURATION-BRIEF-bluenote-post1985.md`（含**附錄二：雲端線實測**）→ `CURATION-BRIEF-bluenote.md`
→ `CURATION-BRIEF-c131.md` → `c127` → `c126` → `c103plus` → `c93plus`，**固定規格一字未改**。
曲風判準照 **c-173 b 第 3753 條 ＋ c-173 a 第 3716 條（救濟三肢）＋ 第 1857-B 條（①② 進人工判）
＋ 第 1871-B 條（④ 也降為人工判）＋ 第 1861-B 條第 5 款 ＋ 第 1923-B／1925-B 條
＋ 主線第 1934-B／1936-B／1944-B／1948-B 條 ＋ c-183 b 第 5701 條（收件款第三肢的可數判準）**，命中款次逐筆寫在各條。
`batch-progress/c163/rulings-mainline.md` 第 1934-B…1954-B 條與 `c183/rulings.md` 全檔（5656–5715）已並讀。

**收 12、退 7（原壓廠牌不在十五家 3 ＋ 曲風／曲目來源 3 ＋ 撞池 1，⚠ 其中 2 張同時中兩關以上）｜收件率 63%**
——**高於 c-183 b 的 44%，成因單一且可歸因：年段從 1970–1972 移到 1974–1976，Nippon Crown 的ムード企劃線從 3 張掉到 1 張，
而 East Wind（4 張）與 ALM（3 張）兩家在本組是 7 張 6 收。**

⚠ ⚠ **本組最重要的四件**：
1. ⚠ ⚠ **`house: Alfa` 兩張全錯，而且原壓都是東芝EMI 的 `Express` 字標**（第 5748 條）——**c-183 a 第 5668 條立的「1977 年前的 Alfa 一律回查原壓、預設不是 Alfa」在本組兩筆兩中，命中率 2/2。**
   **兩張的 Alfa 都只出現在 `companies` 欄（`Record Company: Alfa`／`Copyright (c): Alfa Music Ltd.`）與 1980 年後的再發上，盤面字標是 `Express`。**
2. ⚠ ⚠ **真撞池 1 筆，而且是「和文＝外文等價形被兩邊各取一半」的新形狀**（第 5753 條）：
   **`阿部薫《なしくずしの死》` ←→ 池中 `阿部薫《Mort À Crédit》1976`（seed ＋ c-67）——盤面全題逐字是「Mort À Crédit = なしくずしの死」，MB 取了和文那一半、池中的卡取了法文那一半，同一張 ALM `AL-8/AL-9` 兩枚組。**
   ⚠ **`poolRecheck` 這一次有把那兩列列出來（狀態是「逐張人工比」），是人工比出來的**；**但 `chk-prop` 的複合鍵與 `dedup` 六道全部抓不到**。
3. ⚠ **`poolRecheck` 的「池中查無此藝人」3 格裡錯 1 格（33%）**（第 5761 條）——**`坂田明トリオ` 那一格，池中有 `坂田明` 4 列**；
   **失效機制與 c-183 a 第 5677 條抓到的 `富樫雅彦カルテット` 逐字同一個（前綴比對只做單向），該條建議的雙向修法顯然還沒進 `jp1-pool-refresh.mjs`。**
4. ⚠ ⚠ **`versions` 全表在本組再一次是唯一的真相來源**：**年份改判 1 筆、盤名真改判 2 筆、`live` 改判 1 筆、原壓廠牌改判 3 筆，六件事全部只能靠版本表抓到。**

⚠ 年份改判 **1 筆**（第 5754 條）、盤名真改判 **2 筆** ＋ 主副題取捨 1 筆 ＋ 等價形取邊 4 筆 ＋ 大小寫取捨 1 筆（第 5755 條）、
`live` 改判 **1 筆**（第 5756 條，slice 標 `false` 而實為現場）、
廠牌欄 19 筆逐筆以 Discogs `releases/<id>` 的 `labels` 欄為準核過、**`house` 與原壓不符 3 筆（16%），三筆都退**（第 5758 條）、
再發版本數 12 筆收件逐筆跑完整張 `versions`（**11 筆有 master 頁裡 10 筆低估、1 筆持平，另 1 筆無 master 頁，平均低估率 59%、最高 88%**，第 5757 條）、
掛名 12 張 10 個相異字串（沿用池中 6 串 ＋ 新立 4 串，四串全是聯名或編制串），新造分裂 0、新造分隔符 0、孤兒 release 0、改釘 rgMbid 0。

---

## 5746　（**總表**）：**19 張＝收 12 ／ 退 7**

| slice # | 掛名 —《盤名》 | 廠／**原壓**目錄號 | 處置 | 理由（命中條款） |
|---:|---|---|---|---|
| **0** | **青木望 —《1999 A.D》** | **Crown AD-1999（1974）** | **收（邊界）** | ① styles 含 `Easy Listening` → 人工判 → 第 3716 條三肢全過；**11/11 軌全原創**；⚠ ④ 也啟動（他的目錄是配樂線）但照第 1871-B 條看碟不看人，見 5760 |
| 1 | 三上寛 —《BANG!》 | URC URG-4022（1974-03） | **退** | **演奏主體是主唱（第 1923-B 條）＋ 第三肢（自寫的日語フォーク 歌不算原創曲，第 5197／5694 條）**，見 5747 |
| 2 | Jun Fukamachi 21st Century Band —《Rokuyu (六喩)》 | ⚠ ⚠ **Express ETP-72100（1975）** | **退** | ⚠ ⚠ **原壓廠牌是東芝EMI 的 `Express` 字標、不在本線十五家**（`house: Alfa` 整欄錯）；曲風那一關過得乾淨，見 5748 |
| **3** | **土取利行・高木元輝 —《Origination》** | **ALM Records AL-4／半夏社 AL-4（1975-04-20）** | **收** | 五款全不成立；genres 單一 `Jazz`、styles 兩項全是爵士成分；**5 軌全是兩人自己的曲**；⚠ **無 master 頁**，見 5757／5770 |
| **4** | **渡辺貞夫 —《At Pit Inn》** | **CBS/Sony SOPN 113（1975）** | **收** | 五款全不成立；**5 軌全是爵士標準曲或爵士原創曲**；⚠ **外國藝人那一關 3/4、演奏側 1/4**；`live` 維持 true，見 5763 |
| 5 | 小杉武久 —《Catch-Wave》 | CBS/Sony SOCM 88（1975） | **退** | **⑤ 前半：`genres` 逐字只有 `Electronic`、零 Jazz → 收件第一肢失敗 → 第 3716 條三肢全敗**，見 5749 |
| **6** | **渡辺貞夫 —《Swiss Air》** | **CBS/Sony SOPN-159（1975）** | **收** | 五款全不成立；**四重奏全部是日本樂手**；⚠ ⚠ **盤名真改判**（RG 取了 2000 年 CD 的長題）＋ **作曲欄交叉驗才過第三肢**，見 5755／5767 |
| **7** | **笠井紀美子 with Cedar Walton Trio —《Kimiko Is Here》** | **CBS/Sony SOPN 114（1975）** | **收（邊界）** | ⚠ ⚠ **主線第 1934-B 條 (2) 款觸發（styles 唯一一項 `Vocal`）→ 第 3716 條三肢二過一敗 → 收**；乙 2/10＝20%，見 5771 |
| 8 | Mieko Hirota（弘田三枝子）—《Then Came You》 | ⚠ **Columbia JDX-7050（1975-02）** | **退** | **第三肢：11/11 軌是既有的英美流行／靈魂曲（第 5701 條）＋ ⑤ 前半 ＋ 第 1925-B 條零樂手列名**；⚠ **原壓字標是 `Columbia` 不是 `Denon`**，見 5750 |
| **9** | **大野俊三 —《Bubbles》** | **East Wind EW-8028（1976）** | **收** | 五款全不成立；**5 軌全原創**；⚠ ⚠ **年份改判 1975→1976**（本組唯一一筆）；外國藝人那一關 4/4、演奏側 1/6，見 5754 |
| **10** | **大野俊三 —《Something's Coming》** | **East Wind EW-7011（1975）** | **收** | 五款全不成立；**4 軌全是他自己的曲**；⚠ ⚠ **盤名真改判——原壓盤面自己拼錯成 `Comming`**，見 5769 |
| **11** | **増尾好秋 —《111 Sullivan Street》** | **East Wind EW-8020（1975）** | **收（邊界）** | 五款全不成立；**4 原創 ＋ 4 爵士標準曲**；⚠ ⚠ **原壓 Discogs 條目零樂手列名，第 1925-B 條那一肢靠同廠 1979 年壓片的編制欄才成立**，見 5766 |
| **12** | **日野皓正 —《Speak To Loneliness》** | **East Wind EW-7008（1975）** | **收** | 五款全不成立；**3 軌全是他自己的曲**；**演奏側 9/10 日本樂手**；⚠ **末軌〈Hi-nology〉撞池中同名專輯的盤名**，見 5773 |
| **13** | **坂田明トリオ —《Counter Clockwise Trip》** | **Frasco FS-7001（1975）** | **收** | 五款全不成立；**5 軌全是三位成員的曲**；⚠ ⚠ **`poolRecheck` 報「池中查無此藝人」是錯的**（池中 `坂田明` 4 列，不撞卡），見 5761 |
| 14 | 山下洋治と‘75オールスターズ —《巴里にひとり・初めての涙（魅惑のスチール・ギター・ヒット歌謡）》 | Crown GW-5325（1975） | **退** | ⚠ ⚠ **c-183 a 第 5659 條立的「`Crown GW-5xxx` 魅惑のスチール・ギター 整條線退」逐字命中**——**該條的表上就列著這個目錄號**，見 5751 |
| **15** | **山下洋輔トリオ —《Up-To-Date》** | **Crown JAW-2001〜2（1975-07）** | **收** | 五款全不成立；**4 軌全是三位成員的曲**；⚠ ⚠ **`live` 改判 false→true**（本組唯一一筆）；⚠ **盤名取主題、不取全題**，見 5755／5756 |
| 16 | Hi‐Fi Set —《Fashionable Lover》 | ⚠ ⚠ **Express ETP-72169（1976-06-05）** | **退** | ⚠ **一筆同時中三關**：原壓是東芝EMI 的 `Express`（不在十五家）＋ ① styles 含 `Kayōkyoku` ＋ **第 1923-B 條逐字點名的 `Hi-Fi Set` 三聲部ソフト・コーラス** ＋ 第三肢 10/10 日語流行歌，見 5752 |
| **17** | **土取利行・坂本龍一 —《Disappointment-Hateruma》** | **ALM Records AL-7（1976）** | **收（邊界）** | 五款全不成立（⚠ **需先判 `Free Improvisation` 是爵士成分，1934-B (2) 才不觸發**）；**4 軌全是兩人為本盤寫的**；原壓 500 張，見 5768／5770 |
| 18 | 阿部薫 —《なしくずしの死》 | ALM Records AL-8／AL-9（1976） | **退** | ⚠ ⚠ **撞池**：與池中 `阿部薫《Mort À Crédit》1976`（seed ＋ c-67）是同一張碟——**盤面全題逐字「Mort À Crédit = なしくずしの死」**，見 5753 |

⚠ **slice 的編號**：本表的 `slice #` 是 `g === "b"` 這 19 筆在 slice 裡的出現序（0 起算），與 a 組的編號無關。

**第 315 條結算：`prop-b.json` 12 筆 ＋ 本表退件 7 筆 ＝ slice `g:"b"` 19 筆。✔**

---

## 退件的裁定（5747–5753）

## 5747　退：`三上寛 —《BANG!》`（rg b2e543f6）——**與 c-183 b 第 5694 條 `深町純《ある若者の肖像》` 逐項同形：自唱的日語歌盤，爵士樂手在這裡是伴奏**

slice #1、**URC URG-4022**、1974-03、8 軌、`why` 逐字 `rg-tag`（**本組唯一有 `why` 值的三筆之一**）、
`poolRecheck` 標「同藝人在池中，盤名不同——逐張人工比」並列了 4 列。⚠ **那一格漏了 2 列**：
**本層實掃到 `三上寛` 池中共 6 列**（slice 列的 seed《ひらく夢などあるじゃなし》1972／seed《1972／コンサートライブ零狐徒》1972／seed 與 c-79 的《負ける時もあるだろう》1978，**另加 seed 與 c-87 的 `三上寛・古澤良治郎《職業》1987`——聯名列漏掉了**）。**逐列比過，池中沒有《BANG!》，不是撞池。**

**Discogs 原壓 releases/6094083（1974-03 LP Album Gatefold）逐字**：genres `Jazz`／`Rock`；styles **`Folk Rock`／`Free Jazz`**；
`companies` 逐字「Recorded At: CBS/Sony Studio」「Published By: Art Ongaku Shuppan」「Made By: URC Records」；
`notes` 逐字給出錄音室與錄音日「CBSソニー第1スタジオ／'73年 11月20・22日・12月4・6日」。
**整筆 `extraartists` 十一筆，`Mikami Kan` 一個人掛了三組角色：`Composed By`、`Lyrics By [詞], Music By [曲]`、`Vocals [Voca], Guitar [Grums]`**；
**伴奏側逐名是 古澤良治郎（鼓）、山下洋輔（`Producer [Music]` ＋ 逐軌的鋼琴與電大鍵琴）、坂田明（B2 的中音薩克斯風）、渡辺勝・今井忍・武田裕美子・松田幸一（逐軌）**，
另有 秦政明・才谷朗太（プロデューサー）、柏原卓（ディレクター）、助川健（エンジニア）、佐伯俊男（ジャケットデザイン）。

**八軌逐字是〈このレコードを私に下さい〉〈逢えてよかった〉〈華麗なる絶望〉〈Bang!〉〈密漁の夜〉〈なんてひどい唄なんだ〉〈赤い馬〉〈最後の最後の最後のサンバ〉**
——**八軌全部是日本語の歌もの**，`Lyrics By`／`Music By` 逐軌是 三上寛 五軌、渡辺勝 一軌（A2）、友部正人 一軌（B1），**零爵士標準曲、零爵士原創器樂曲。**

**退件依據兩肢，而且 ①②③④⑤ 五款按字面一款都不成立**（styles 無 EL／Kayōkyoku、genres 無 `Folk, World, & Country`、無日本歌謡曲、三上寛 的目錄不是ムード系、genres 含 Jazz 且 styles 有 `Free Jazz` 這個爵士成分）：

| 收件款／第 1923-B 條 | 《BANG!》 |
|---|---|
| 演奏主體是爵士編制 | ❌ ❌ **領銜者掛的第一個角色是 `Vocals`，八軌是他自唱的日語歌曲**；**山下洋輔・坂田明・古澤良治郎 三位池中爵士樂手在這裡是伴奏與製作**（**第 1923-B 條逐字的 `Hi‐Fi Set《1&2》` 形狀：佐藤允彦 一手四角、節奏組是四位池中樂手，仍然退**） |
| 曲目是爵士標準曲或原創曲 | ❌ **八軌全是自寫或他人寫的日語フォーク／歌もの**——**依 c-182 b 第 5197 條引第 4410 條「自寫的流行歌不算這一肢的原創曲」，第 5701 條 (4) 款逐字把它寫成可數判準** |

→ **兩肢皆敗，退。**
⚠ ⚠ **分界與 c-183 b 第 5694 條完全一致，本層只補一個本線特有的佐證**：
**`enum/jp-2.md` 逐字寫著「URC 在 MB 有 100 筆 release，只有 2 筆是爵士——那是民謠廠牌（岡林信康 那一系）」**
——**本盤就是那 2 筆之一，而它是一張民謠歌手的盤，只是請了一整組爵士樂手當伴奏。本線的 URC 那一格到此為止。**
⚠ ⚠ **與 c-182 b 收的 `浅川マキ` 三張的分界也要寫死**（本線會一再撞到「日語人聲盤」）：
**那三張的 Discogs genres 逐字單一 `Jazz`、styles 單一 `Jazz-Funk`／`Experimental`／空陣列；本盤 genres 兩項、styles 的首位逐字是 `Folk Rock`。**
⚠ **退的是這張碟、不是這個人**：**三上寛 池中已有 6 列，他的身分在池中是民謠／前衛歌手，本批不新增。**
⚠ **再發版本數併記**（退件不入卡，仍記下）：**Discogs master 56846 的 `versions` 逐筆跑完共 12 版**
（1974 `URG-4022` 市售與 Promo、1980 `SM20-4144` SMS 再發兩筆、1989 Kitty `H20K25029` CD、1995 `TOCT-9322` 音蔵 CD 兩筆、2002 avex io `IOCD-40028`、2017 Greenwood `GRCL-6075`、2018 Pony Canyon `PCJA-00078` LP 與 `PCTA-00293` 卡帶、2023 `MHCL 30909` Blu-spec CD）；**MB 建 6 筆，低估 6 版（50%）。**
⚠ **年份與廠牌都沒有問題**（URC `URG-4022`、1974-03，MB 與 Discogs 兩處相符，**URC 在十五家之內**）——**退的純粹是演奏主體與曲目來源。**
（可逆性：收退名單，改回去只要補卡、不動卡池結構——照裁定權下放第 1 條「有先例」直接定，不上呈。）

---

## 5748　⚠ ⚠ 退：`Jun Fukamachi 21st Century Band —《Rokuyu (六喩)》`（rg a649f350）——**原壓廠牌是東芝EMI 的 `Express` 字標；c-183 a 第 5668 條那條判準在本組兩筆兩中**

slice #2、slice 的 `house` 逐字 `Alfa`、slice 的 `country` 逐字 `XW`、`format` 逐字 `Digital Media`、`note` 逐字「MB 只有串流版」、1975、4 軌、
`poolRecheck` 逐字標著「⚠ ⚠ **變體全是羅馬字，等於沒查過**」。

**先把往「收」的一邊寫足，因為這是一張好盤**：
1. **曲風那一關過得乾淨**——Discogs 原壓 releases/4686945 的 `genres` 逐字 `Electronic`／`Jazz`／`Rock`、`styles` 逐字 `Jazz-Rock`／`Jazz-Funk`；**五款一款都不成立。**
2. **四軌全部是 深町純 寫的、他自己編的**（`extraartists` 逐字 `Jun Fukamachi — Written-By, Arranged By`），**曲題逐字是〈Meikyu = 迷宮〉5:50／〈Hateruma = 波照間〉6:53／〈Shin-Ku = 真空〉9:27／〈Rokuyu = 六喩〉18:40（B 面整面）**。
3. **班底是一整組日本樂手，逐名印在盤上**：**深町純（鋼琴・Fender Rhodes 88・Solina・Mellotron・Mini Moog・ARP Odyssey・Yamaha SY11・Clavinet D6・Talk Box）、村上"ポンタ"秀一（鼓・定音鼓）、小原礼（電貝斯）、大村憲司（電吉他）、村岡建（電高音薩克斯風）、濱口茂外也（打擊）**，製作 下河邊晴三・川添象郎、解說 深町純 與 村井邦彦。
4. ⚠ **`poolRecheck` 那句警語是對的但不撞卡**：**本層查出漢字名 `深町純` 後實掃池中 5 列**（c-175《Introducing Jun Fukamachi》1975、c-176《Jun Fukamachi At Steinway》與《(Take 2)》1976、c-176《Second Phase》1977、c-181《エイリアン魔獣鏡》1985），**《六喩》／《Rokuyu》兩種寫法池中 0 列。**

**退的是原壓廠牌。逐字的證據**：
**Discogs 原壓 releases/4686945 的 `labels` 欄逐字只有一筆「Express — ETP-72100」**；
**`companies` 欄逐字是「Record Company: Alfa」「Manufactured By: Toshiba EMI Ltd」「Recorded At: Studio A, Shibaura, Tokyo」「Remixed At: Studio A, Shibaura, Tokyo」「Published By: Alfa Music Ltd.」。**
**`/masters/1149900/versions` 逐筆跑完共 3 版**：1975 `Express ETP-72100` 市售（4686945＝原壓）、**同號 Promo（20885167）**、**2009 `SMDR GT Music MHCL 1556` CD**
——**三版裡沒有一版的 `labels` 欄是 Alfa。**
**MB 轄下三個 release 逐字是 3faeae25（1975 JP `EXPRESS ETP-72100`）、c7c51fed（2009-09-09 **XW** Digital Media，label 逐字 `ALFA`）、3ebcacd9（2010 JP CD，`GT music MHCL 1556`）。**

→ ⚠ ⚠ **`house: Alfa` 的來源已經查清楚，而且與 c-183 a 第 5668 條是同一個結構、兩條路一起造成**：
1. **MB 那筆 2009 年數位版的 label 欄逐字掛著 `ALFA`**——**本線簡報第一節逐字警告的「MB 常把再發也掛在同一個 label 實體上」。**
2. **原壓盤面的兩筆 Alfa 都在 `companies` 欄裡**：**`Record Company: Alfa`（アルファ・ミュージック 是製作公司）與 `Published By: Alfa Music Ltd.`（出版社）**
   ——**依第 5668 條逐字「`Copyright (c): Alfa Music Ltd.` 不算」，本筆的兩筆同理不算**；**Alfa Records 這個唱片廠牌 1977 年才成立，1975 年的碟在盤面上不可能有 Alfa 的字標。**

**退件依據**：**原壓廠牌是 `Express`（製造是東芝EMI），那是 jp-1 線的四大廠之一、不在本線十五家之內**。
**與 c-183 a 第 5668 條退掉的 `柳田ヒロ《Milk Time》`（原壓是 Liberty／東芝音工）、以及 c-180 第 1924-B 條退掉的 `Keizo Inoue《Boys, Be Ambitious!》`（DOMO）是同一種形狀：好盤，門外。**

### ⚠ ⚠ 第 5668 條在本組的命中率是 2/2，判準要升格成「先驗原壓、再談曲風」

**本組兩張 `house: Alfa`（#2 1975、#16 1976）逐筆回查版本表，兩張的原壓字標都是 `Express`、製造都是東芝EMI、Alfa 都只出現在 `companies` 欄與 1980 年後的再發上。**
**`enum/jp-2.md` 逐字記著「Alfa：1970s 只 13 張」——本組吃掉其中 2 張、2 張全錯。**
**→ 把第 5668 條的措辭從「一律回查原壓，預設不是 Alfa」升格為：`house: Alfa` 且年份早於 1977 的，先打 `/masters/<id>/versions` 看最早那一版的 `labels` 欄；**
**⚠ ⚠ 而且要特別看 `Express`——アルファ・ミュージック 1969–1976 年的自製盤幾乎都是掛東芝EMI 的 `Express` 字標發行的，那一家在 jp-1 線的門內、在本線的門外。**
**剩下那 11 張 1970s Alfa 建議在派工信裡逐批加一句。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」（第 5668／1924-B 條）與第 2 條「可逆」直接定，不上呈。）

⚠ ⚠ **登記給主線的候選**：**`Express ETP-72100`（`Jun Fukamachi 21st Century Band —《Rokuyu = 六喩》`，1975）**
——**曲風、班底、原創度三關全過，只敗在原壓廠牌屬於 jp-1 線而不是本線**；**而 jp-1 線十批切的是「MB 掛得到那四家廠牌實體」的碟，本盤在 MB 上掛的是 Alfa，所以 jp-1 的列舉層根本沒有看到它。**
**→ 建議收進「非本線廠牌但確實是日本爵士盤」的候選清單，與 c-180 的 DOMO 兩張、c-181 的美國 TBA 一張、c-183 a 的 Liberty 一張同一份。**
⚠ **另記**：**slice 的 `format` 逐字是 `Digital Media`、`country` 逐字是 `XW`**——**那是 MB 拿 2009 年那筆數位版當代表的結果，原壓是 12 吋 LP、country 是 JP**；**`house`／`format`／`country` 三欄在本筆一起錯，成因是同一個（MB 只建得出再發那一層）。**
⚠ **順帶記一個曲題**：**A2 逐字是〈Hateruma = 波照間〉，與同組收件的 `土取利行・坂本龍一《Disappointment-Hateruma》` 共用這個地名**——**兩者無關，下游若撈到要分得開。**

---

## 5749　退：`小杉武久 —《Catch-Wave》`（rg ae11b4fc）——**⑤ 款前半：`genres` 逐字只有 `Electronic`，零 Jazz；第 3716 條三肢全敗**

slice #5、**CBS/Sony SOCM 88**、1975、2 軌、`why` **空字串**、
`poolRecheck` 標「同藝人在池中，盤名不同——逐張人工比」並列了 1 列（c-176 的 `Steve Lacy, 高橋悠治, 小杉武久《Distant Voices》1976`）。**逐列比過：池中沒有本盤，不是撞池。**

**MB 層**：RG tags 逐字 `abstract(1)`／`electronic(2)`／`experimental(2)`、genres 逐字 `electronic(2)`／`experimental(2)`
——⚠ ⚠ **MB 這一層連 `jazz` 的字樣都沒有，而且 `electronic` 與 `experimental` 的 count 都是 2（本組唯一兩個 count 過 1 的非爵士標籤）。**

**Discogs 原壓 releases/686136（1975 LP Stereo）逐字**：
**盤面全題「Catch-Wave = キャッチ・ウェイブ」**（⚠ **連字號是 ASCII，而 MB 的 RG title 逐字是 `Catch‐Wave`、用 U+2010——**若日後撈回來，照抄 MB 那一串會被 `chk-prop` 的非 ASCII 連字號那一道擋下來**）；
**`genres` 逐字只有 `Electronic`**；**`styles` 逐字 `Abstract`／`Experimental`**；
`companies` 逐字「Phonographic Copyright (p): CBS/Sony Inc.」「Copyright (c): CBS/Sony Inc.」「Recorded At: CBS/Sony Studio」「Manufactured By: CBS/Sony Inc.」；
`notes` 逐字「Mano-Dharma '74: an excerpt from a meta-media solo improvisation perforemed by Takehisa Kosugi」「Wave Code #E-1: triple performance by solo vocalist; Takehisa Kosugi」「Recorded Date : September 16, 17, 1974 Location : CBS/Sony Studio No. 1」。
**兩軌逐字是〈Mano-Dharma '74 = マノ・ダルマ'74〉26:35（逐軌 credit `Performer [Solo Improvisation]: Takehisa Kosugi`）與〈Wave Code #E-1 = ウェイブ・コード#e-1〉22:31（逐軌 credit `Vocals [Solo Vocalist]: Takehisa Kosugi`）**；
**整筆 `extraartists` 七筆裡只有他一人是演奏者**，其餘是裝幀二人、錄音二人、攝影、製作 吉村昭子、解說（他自己）。

**退件依據**：
1. ⚠ ⚠ **⑤ 款前半逐字成立**——**`genres` 不含 Jazz，收件款第一肢直接失敗**。
2. **依第 1936-B 條改由第 3716 條三肢逐肢覆核**：
   - **演奏主體 ✘ ✘**——**一個人的 meta-media 獨奏即興與一個人的多軌人聲，沒有節奏組、沒有任何爵士編制**；**與 c-183 a 第 5660 條退掉的 `《尺八1969》`（三支尺八＋弦樂＋打擊、有指揮的現代音樂編制）同一條線。**
   - **曲目 ✘**——**兩軌是為本盤做的，但它們是 Fluxus 系的 meta-media 作品，既不是爵士標準曲、也不是爵士原創曲**（**第 5660 條逐字對「委作現代音樂」的處置就是這一句**）。
   - **`styles` 的爵士成分 ✘**——**`Abstract`／`Experimental` 兩項都不是。**
   **三肢全敗。**

→ **退。** ⚠ ⚠ **本層知道這張碟在「日本地下即興」那一條線上是名盤**（**Superior Viaduct 2018 年在美國復刻、Phoenix Records 2010–11 年在英國出過限量編號版**），
**而池中 c-121 那一批（日本地下即興）與本組收的 `土取利行・高木元輝《Origination》`、`土取利行・坂本龍一《Disappointment-Hateruma》` 都是自由即興**
——**分界線在 Discogs 的 `genres`**：**那兩張逐字都含 `Jazz`，本盤逐字只有 `Electronic`**；**這正是⑤款「堵收件款的縫」要擋的東西。**
⚠ ⚠ **本層認為這是本組最值得主線覆核的退件，反轉條件逐字寫在這裡**：
**若主線認為「Fluxus／meta-media 系的獨奏即興」與「自由即興二重奏」在本線應該同進同退，要翻的就是本卡**
——**而翻它的代價是⑤款前半（`genres` 零 Jazz）在本線失效，那一款在 c-183 a 用了三次、本組用了兩次，本層不自行放寬。**
⚠ **池中 `小杉武久` 1 列**（c-176 的三方聯名《Distant Voices》1976，**那是 Steve Lacy 領銜的爵士盤**），**`Takehisa Kosugi`／`キャッチ・ウェイブ` 0 列，本批不入池。**
⚠ **再發版本數併記**：**Discogs master 86082 的 `versions` 逐筆跑完共 9 版**
（1975 `SOCM 88` 原壓、2001 與 2018 兩筆 Showboat `SWAX-502` CD、2007 南韓 `WPC6-8506`、2010 英國 `ASHCD3041`、2011 英國 `ASHLP3041`、2011 義大利 `B146`（**題逐字換成 `Studio Improvisations, Tokyo, September 16th And 17th, 1974`**）、2018 美國 Superior Viaduct `SV158`、年份欄為 0 的美國 Iskra `3003`）；
⚠ **其中五版 Discogs 逐字標 `Unofficial Release`**；**MB 建 4 筆（含兩筆 Bootleg），低估 5 版（56%）。**
⚠ **另有一個不折進 master 的鄰居**：**`Catch-Wave '97`（2008 Super Fuji Discs `FJSP-53`，master 1136328）是 1997 年的另一場錄音、不是本盤的再發、不計入版本數**——**下游查 `Catch-Wave` 會撈到它。**
⚠ **年份與廠牌都沒有問題**（CBS/Sony `SOCM 88`、1975，**CBS/Sony 在十五家之內**）——**退的純粹是曲風。**
（可逆性：收退名單，照⑤款先例直接定，**但反轉條件已寫在上面供主線覆核。**）

---

## 5750　退：`Mieko Hirota（弘田三枝子）—《Then Came You》`（rg 87fcff0c）——**第 5701 條的乙 11/11＝100%；⚠ 附帶查出 slice 的 `house: Denon` 也是錯的**

slice #5 之後的 #8、slice 的 `house` 逐字 `Denon`、1975、11 軌、`why` **空字串**、
`poolRecheck` 標「同藝人在池中，盤名不同——逐張人工比」並列了 3 列（c-175《The Nearness of You》1974、c-176《My Funny Valentine》1976、c-176《In My Feeling》1977）。**逐列比過：池中沒有本盤，不是撞池。**

**MB 層**：RG tags／genres 兩欄逐字都是 `funk(1)`／`pop(1)`／`soul(1)`——⚠ ⚠ **三個並列、count 全是 1、而且三個裡沒有一個是 `jazz`。**

**Discogs 逐字（本盤在 master 1105862 底下有三筆 1975 年的 release，逐筆讀過）**：
- **releases/9437909＝`Columbia — JDX-7050`，`released` 逐字 `1975-02-00`，LP Album Stereo，`companies` 逐字「Made By: Nippon Columbia Co., Ltd.」，genres 逐字 `Funk / Soul`、styles 逐字 `Soul`／`Disco`／`Funk`**；
- **releases/4662956＝`Denon — 4PX-9024`，`released` 逐字 `1975`（無月份），`formats` 的 `text` 欄逐字是 `Export`，genres 逐字 `Funk / Soul`／`Pop`、styles 逐字 `Soul`／`Funk`**；
- **releases/20360038＝同為 `Columbia — JDX-7050`，1975。**
**→ 三筆裡唯一帶月份的是 `Columbia JDX-7050`（1975-02），而 slice 釘的 `Denon 4PX-9024` 那一筆的 `formats.text` 逐字自稱 `Export`。**

**退件依據三項，任何一項單獨也足以退**：
1. ⚠ ⚠ **收件款第三肢失敗，而且是本組最極端的一筆**——**十一軌逐字是〈Then Came You〉〈When Will I See You Again〉〈I Shot The Sheriff〉〈(You're) Having My Baby〉〈You Are Everything〉〈The Way We Were〉〈Feel Like Makin' Love〉〈Imagination〉〈I Won't Last A Day Without You〉〈You Haven't Done Nothin'〉〈You Make Me Feel Brand New〉**
   ——**十一軌全部是 1972–75 年的既有英美流行／靈魂曲熱曲**（The Spinners／Dionne Warwick、The Three Degrees、Bob Marley、Paul Anka、The Stylistics ×2、Barbra Streisand、Roberta Flack、Carpenters、Stevie Wonder），
   **依第 5701 條的甲乙計數：甲 0、乙 11、乙佔 100% → 第三肢失敗 → 依主線第 1934-B 條可獨立退件。**
   ⚠ **第 5701 條 (5) 款逐字：「被翻唱的素材是英美曲還是日本歌謡曲」不再是分界**——**c-174 a 第 3781 條在本線已不適用。**
2. **⑤ 款前半成立**——**`genres` 不含 Jazz（兩筆 Columbia 那一版逐字只有 `Funk / Soul`），收件款第一肢直接失敗**；**styles 的 `Disco`／`Soul`／`Funk` 三項零爵士成分。**
3. ⚠ **第 1925-B 條那一肢也敗**——**Discogs 原壓的整筆 `extraartists` 只有三筆：`Hiromasa Suzuki（鈴木宏昌）— Arranged By`、`Colgen Clap Band — Backing Band`、`Singers Three（シンガーズスリー）— Chorus`**
   ——**一位器樂樂手都沒有列名，只有兩個團名**；**`Columbia JDX-7050` 那一筆的 `extraartists` 整欄是空的**。
   **與 c-183 b 第 5692 條退掉的 `伊東ゆかりとグリーン・ジンジャー《Love》`、c-179 b 第 4672 條的《キャンディ・ジャズ》逐字同形。**

→ **退。**

### ⚠ ⚠ 附帶查出的第四項：**slice 的 `house: Denon` 與原壓不符**

**依本線簡報第一節 (1) 的判準「`house` 與原壓不符時判斷它還在不在十五家裡」逐項做完**：
**最早那一版的盤面字標逐字是 `Columbia`（`JDX-7050`、1975-02），而 `Denon 4PX-9024` 那一版是同年的輸出版（`Export`）**
——**`Columbia`＝日本コロムビア 本體字標，那是 jp-1 線的四大廠之一、不在本線十五家之內。**
⚠ **這與 c-183 b 第 5692 條的判定不衝突、是它的邊界**：**那一條逐字說「`Denon` 是日本コロムビア 的字標，原壓廠牌在本線十五家之內」——成立的前提是原壓那一版的字標真的印著 `Denon`。**
**本筆的原壓字標印的是母公司 `Columbia`，`Denon` 只在輸出版上。**
**→ 給後續批次一句（本線 Denon 有 109 張，這一關會反覆撞）：`house` 是 `Denon` 而年份在 1970 年代前半的，要去版本表看最早那一版的 `labels` 欄是 `Denon` 還是 `Columbia`；`Columbia` 的不在十五家。**
⚠ **本層把退件的第一理由放在曲目來源（第 1 項），是因為那一項最硬、也不依賴這個廠牌判定**；**廠牌那一項獨立成立、記在這裡供後續批次沿用。**

⚠ **退的是這張碟、不是這個人**：**`弘田三枝子` 池中已有 3 列爵士卡（c-175 1974、c-176 兩張 1976–77）**——**她的爵士線是那三張，本盤是同時期的流行翻唱盤。**
⚠ **`Mieko Hirota`／`高木三枝子` 兩種變體池中 0 列。**
⚠ **再發版本數併記**：**Discogs master 1105862 的 `versions` 逐筆跑完只有 3 版**（見上），**零張 CD、零張復刻**；**MB 只建 1 筆，低估 2 版（67%）。**
⚠ ⚠ **`catno=` 反查在本筆沒有用**：**簡報第六節與 c-183 b 第 5715 條第 3 點逐字警告的 `Denon` 的 `CD-xxxx` 裸數字失效，本筆的 `4PX-9024` 與 `JDX-7050` 同屬會撞號的形狀**——**本層是靠 `q=Mieko Hirota Then Came You` 直接命中 master 的。**
（可逆性：收退名單，照第 5701 條與第 1934-B 條直接定，不上呈。）

---

## 5751　退：`山下洋治と‘75オールスターズ —《巴里にひとり・初めての涙（魅惑のスチール・ギター・ヒット歌謡）》`（rg d1353135）——**c-183 a 第 5659 條立的整條線判準逐字命中，而且該條的表上就列著這個目錄號**

slice #14、**Crown GW-5325**、1975、**14 軌**、`why` **空字串**、`poolRecheck` 逐字「池中查無此藝人」。
**本層重掃：`山下洋治`／`Yoji Yamashita`／`‘75オールスターズ`／`’75オールスターズ`／`オールスターズ`／`巴里にひとり` 六種寫法**
——**`オールスターズ` 掃到池中 6 列但沒有一列是這支樂團**（サザンオールスターズ 三張、`前田憲男とオール・スターズ` c-134、`前田憲男 & 稲垣次郎オールスターズ` c-173、`沢田駿吾とオールスターズ` c-174），**其餘五種 0 列。那一格是對的。**

**Discogs releases/7848898（1975 LP）逐字**：`labels` 欄「Crown (3) — GW-5325」；**`series` 逐字「Crown Golden Series」**；
`companies` 逐字「Made By: Crown Record Co., Ltd.」；genres **`Jazz`**；**styles 逐字唯一一項 `Easy Listening`**；
`notes` 逐字「山下洋治と'75オールスターズ (steel guitar) YOJI YAMASHITA & '75 All Stars」與全題的羅馬字轉寫；
**整筆 `extraartists` 逐字只有一筆：井上忠也（Arranged By）——盤面一個樂手都沒有列名。**
**十四軌逐字是〈巴里にひとり〉〈ペパーミント・キャンディ〉〈内気なあいつ〉〈初めての涙〉〈さよなら友よ〉〈女がひとり〉〈哀しみの終わるとき〉〈シクラメンのかほり〉〈思い出通り〉〈22才の別れ〉〈十七の夏〉〈恋のおもかげ〉〈明日また逢おう〉〈昭和枯れすすき〉**
——**十四軌全部是 1974–75 年的日本歌謡曲與フォーク 熱曲**（沢田研二〈巴里にひとり〉、布施明〈シクラメンのかほり〉、風〈22才の別れ〉、桜田淳子〈十七の夏〉、さくらと一郎〈昭和枯れすすき〉…）。

**退件依據——四項，與 c-183 a 第 5659 條逐項相同**：
1. ⚠ ⚠ **c-183 a 第 5659 條立的線級判準逐字命中**：「**`Crown GW-5xxx` 下副題含「魅惑のスチール・ギター」或「スチール・ギター・ムード」的碟，整條線退，不必逐張重跑五款**」
   ——**本盤的副題逐字是「魅惑のスチール・ギター・ヒット歌謡」，而且該條的八張清單上第八行逐字就是「GW-5325 山下洋治と’75オールスターズ《巴里にひとり・初めての涙（魅惑のスチール・ギター・ヒット歌謡）》1975 Discogs 7848898」。**
   ⚠ ⚠ **該條末段逐字預告「`GW-5325`（1975）證明這條線做到 1970 年代中期，而且掛名會換成 `’75オールスターズ`——後面十四批的 Nippon Crown 還會再撞，請寫進派工特注」**——**本組就是下一批，預告完全命中。**
2. **③ 款成立（唯一的充分理由）**——**曲目整張是日本歌謡曲的照譜吹奏。**
3. **① 款成立**（styles 唯一一項是 `Easy Listening`）、**第 3716 條退件第 2 項與第 4 項同時成立**（整張是歌謡曲的照譜吹奏 ＋ 盤名本身點明企劃屬性）。
4. **第 1925-B 條那一肢也敗**——**盤面只有一位編曲者，零樂手列名。**

→ **退，不必逐張重跑五款。**
⚠ ⚠ **本組把第 5659 條那條線的進度往前推一格，並補一件給後續批次**：
**該條的八張清單裡，`GW-5325` 是編號最高、年份最晚的一張，本組已經處理掉。**
**剩下的七張（`GW-5029`／`GW-5047`／`GW-5061`／`GW-5071`／`GW-5082`／`GW-5098`／`GW 5138`）年份都在 1968–1970，其中 `GW-5071`／`GW-5082` 已由 c-183 a 退掉、`GW 5138` 與 `GW-5153` 已由 c-183 b 退掉**
——**→ 本線 1974 年後的 Crown `GW-5xxx` 這一條系列到此結清，c-185 之後若再撞到同形狀的碟，掛名會是 `’75オールスターズ` 之後的年號版本。**
⚠ **掛名側順帶記一個字元，給後續批次**：**slice 與 MB 的 artist-credit 裡那個撇號逐字是 `‘`(U+2018 LEFT SINGLE QUOTATION MARK)，而 Discogs 那一邊逐字是 ASCII 的 `'75`**
——⚠ ⚠ **這與 c-183 b 第 5687 條記的 `’`(U+2019) 是兩個不同的字元**：**該條的 `山下洋治と’68オールスターズ` 用右單引號、本筆的 `‘75` 用左單引號**，
**兩者都不在 `chk-prop` 的非 ASCII 連字號字元類裡、也不在日文分隔符那一行的字元類裡，所以兩道都不報**；**任何字串比對都會失準。退件不入卡，仍記下。**
⚠ **再發版本數併記**：**Discogs 沒有 master 頁**（releases/7848898 的 `master_id` 逐字是 0），`catno=GW-5325` 反查只回本筆——**照第 1879-B 條只寫「資料庫裡只有這一筆」，不寫成「沒有再發」**；**MB 也只建 1 筆。**
⚠ **年份與廠牌都沒有問題**（Crown `GW-5325`、1975，**Nippon Crown 在十五家之內**）——**退的純粹是曲目來源。**
（可逆性：收退名單，照裁定權下放第 1 條「有先例」直接定，不上呈。）

---

## 5752　退：`Hi‐Fi Set —《Fashionable Lover》`（rg 3b59b4c7）——**一筆同時中三關；第 1923-B 條逐字點名的那個團在本線第一次現身**

slice #16、slice 的 `house` 逐字 `Alfa`、slice 的 `format` 逐字 `CD`、1976-06-05、10 軌、`why` **空字串**、`poolRecheck` 逐字「池中查無此藝人」。
**本層重掃：`Hi‐Fi Set`（U+2010）／`Hi-Fi Set`（ASCII）／`HiFi Set`／`ハイファイセット`／`ハイ・ファイ・セット`／`Fashionable` 六種寫法，池中全部 0 列。那一格是對的。**

**Discogs 原壓 releases/5492723（1976-06-05 LP Album Stereo）逐字**：
**盤面全題「Fashionable Lover = ファッショナブル・ラヴァー」、掛名逐字「Hi-Fi Set = ハイ・ファイ・セット」（⚠ **連字號是 ASCII**）**；
**`labels` 欄逐字只有一筆「Express — ETP-72169」**；
**`companies` 欄逐字「Manufactured By: Toshiba EMI Ltd」「Recorded At: Studio A, Shibaura, Tokyo」「Copyright (c): Alfa Music Ltd.」「Copyright (c): Japan Central Music Ltd.」「Copyright (c): Crown Music Publisher, Inc.」**；
genres **`Jazz`／`Funk / Soul`／`Pop`**；**styles 逐字 `City Pop`／`Funk`／`Jazz-Funk`／`Soul`／`Vocal`／**`Kayōkyoku`****；
`notes` 逐字「Recorded from February to April 1976.」與逐軌的版權年。
**整筆 `extraartists` 六十三筆**：**`Hi-Fi Set（ハイ・ファイ・セット）— Vocals` 加三位成員各自的 `Vocals`（山本潤子・大川茂・山本俊彦）、編曲與製作 松任谷正隆／村井邦彦，其餘五十餘筆是弦樂十六人、銅管十二人、法國號四人、木管、豎琴、打擊等錄音室樂團**（其中 細野晴臣 電貝斯、鈴木茂 與 吉川忠英 吉他、村岡建 中音薩克斯風與長笛、林立夫 鼓）。
**十軌逐字是〈星のストレンジャー〉〈朝陽の中で微笑んで〉〈Je M'ennuie〉〈Farewell Party〉〈冷たい雨〉〈Fashionable Lover〉〈荒涼〉〈真夜中の面影〉〈月にてらされて〉〈Grand Canyon〉**
——**十軌全部是日語流行歌，`Lyrics By`／`Music By` 逐軌是 荒井由実 七軌、松任谷正隆 四軌、渡辺俊幸・山本俊彦 各一軌。**

**退件依據三關同時成立，任何一關單獨也足以退**：
1. ⚠ ⚠ **原壓廠牌不在本線十五家**——**盤面字標逐字是 `Express`（東芝EMI），Alfa 只出現在 `companies` 的版權行（`Copyright (c): Alfa Music Ltd.`）**。
   **`/masters/1127900/versions` 逐筆跑完共 9 版**：**1976 `Express ETP-72169` LP 與同年的 `Express ZT30-129` 卡帶**、**1980 `Alfa ALR-4011` LP 兩筆（市售 14951694 ＋ Promo 30599683，Discogs 逐字標 `Reissue`）**、1984 `Alfa 35XA-27` CD、1987 `Alfa 32XA-130` CD、1992 `Alfa ALCA-342` CD、1994 `Alfa ALCA-9099` CD、2013 `GT Music MHCL 30029` CD
   ——⚠ ⚠ **`Alfa` 第一次出現在 `labels` 欄是 1980 年、而且逐字標著 `Reissue`**；**這是本組第二筆、也是第 5668／5748 條那條判準的第二次命中（本組 2/2）。**
2. ⚠ ⚠ **第 1923-B 條逐字點名的那個團**——**該條的實例逐字是「`Hi‐Fi Set《1&2》` 的 credits 是佐藤允彦 製作＋作曲＋編曲＋鋼琴一手四角、節奏組是日野元彦・岡沢章・高水健司・中牟礼貞則——仍然退，因為 Hi-Fi Set 是三聲部ソフト・コーラス，爵士樂手在這裡是伴奏」**
   ——**本盤是同一個團、同一種形狀，而且規模更大：六十三筆 credits 裡三位成員的角色逐字全是 `Vocals`、其餘五十餘位是錄音室樂團。**
   **「伴奏名單很強不是收件款的任何一肢」（第 1923-B 條）——即使 細野晴臣・鈴木茂・村岡建・林立夫 逐名在列，判準看的是演奏主體。**
3. **① 款成立（styles 含 `Kayōkyoku`）→ 人工判 → 第 3716 條三肢**：
   - **演奏主體 ✘**（三聲部ソフト・コーラス）；
   - **曲目 ✘ ✘**（**十軌全是日語流行歌、七軌是 荒井由実 的作品——依第 5701 條 (4) 款與第 5197 條「自寫或他人寫的日語流行歌不算甲」，乙 10/10＝100%**）；
   - **`styles` 的爵士成分 ✔**（`Jazz-Funk` 在列）。
   **一過兩敗。**

→ **退。** ⚠ **這是本組唯一一筆「三關同時成立」的退件。**
⚠ ⚠ **掛名側記一個字元給後續批次**：**slice 與 MB 的 artist-credit 逐字是 `Hi‐Fi Set`、用 U+2010 CONNECTOR HYPHEN**——**`chk-prop` 的「掛名含非 ASCII 連字號」那一道會擋下來**（jp-1 簡報第二節第 3 點逐字舉的就是這個字串）；**Discogs 那一邊逐字是 ASCII 的 `Hi-Fi Set`。退件不入卡，仍記下。**
⚠ **另記**：**slice 的 `format` 逐字是 `CD`**——**那是 MB 拿 1994 年那筆 ALFA CD 當代表的結果，原壓是 12 吋 LP**；**`house` 與 `format` 兩欄在本筆一起錯，成因與 #2 同一個。**
⚠ **不折進 master 的鄰居有一張**：**`Hi-Fi Blend`（1977 `Express ETP-72285`，master 805104）Discogs 逐字標 `Compilation`、是精選盤、不是本盤的再發、不計入版本數**——**下游查 Hi-Fi Set 會撈到它。**
（可逆性：收退名單，三關各自都有先例（第 5668／5748 條、第 1923-B 條、① 款），照裁定權下放第 1 條直接定，不上呈。）

---

## 5753　⚠ ⚠ 退：`阿部薫 —《なしくずしの死》`（rg 279439ee）——**撞池：與池中 `阿部薫《Mort À Crédit》1976` 是同一張碟；「和文＝外文等價形被兩邊各取一半」的新形狀**

slice #18、**ALM Records AL-8／AL-9**、1976、**12 吋 Vinyl ×2（2 枚組）**、slice 的 `live` 逐字 `true`、`why` 逐字 `artist-tag`、
`poolRecheck` 標「同藝人在池中，盤名不同——**逐張人工比**」並列了 10 列，**其中第二列與第九列逐字是 `seed｜阿部薫｜Mort À Crédit｜1976` 與 `c67｜阿部薫｜Mort À Crédit｜1976`。**

**本層的比對**：
- **Discogs master 396901 逐字＝`Kaoru Abe —《Mort À Crédit = なしくずしの死》`、`ALM Records — AL-8` ＋ `ALM Records — AL-9`、1976、genres 逐字 `Jazz`、styles 逐字 `Free Jazz`／`Free Improvisation`。**
- **原壓 releases/15973750 逐字**：`formats` 逐字 `Vinyl qty 2, LP, Album, Gatefold Sleeve`；
  `notes` 逐字「Subtitled "Saxophone Solo Improvisations".」「B1 and C1 to D2 recorded at Iruma Shimin Kaikan, October 16, 1975. A, B2 recorded live at Aoyama Tower Hall, October 18, 1975 at the 「なしくずしの死」 concert.」；
  `companies` 逐字「Phonographic Copyright (p): Kojima Recordings, Inc.」「Recorded At: Iruma Shimin Kaikan」「Recorded At: Aoyama Tower Hall」；
  `extraartists` 逐字七筆（`Abe Kaoru — Alto Saxophone, Sopranino Saxophone`、製作 間章 與 半夏社 與 小島幸雄、錄音 小島幸雄、設計 鳥居信影、攝影 今井正宏）；
  **八軌逐字是〈Alto Improvisation No.1〉25:54／〈Alto Improvisation No.2〉11:39／〈Alto Improvisation No.3〉12:24／〈Sopranino Improvisation No.1〉6:17／〈Alto Improvisation No.4 Part 1〉20:14／〈Alto Improvisation No.4 Part 2〉16:32／〈Sopranino Improvisation No.2〉7:14。**
- **MB release 9d4b2cf4 逐字＝1976 JP Official，label-info 兩筆「ALM RECORDS AL-8」與「ALM RECORDS AL-9」，媒體逐字 `12" Vinyl ×3 軌 ＋ 12" Vinyl ×4 軌`（共 7 軌，⚠ 比 Discogs 少一軌，MB 把 No.4 的兩部分算成一軌）。**
- **→ 同廠、同一對目錄號（`AL-8`／`AL-9`）、同年、同為 2 枚組、同一場 1975 年 10 月的兩場錄音 → 同一張碟。**
- **池中逐字有兩列**：`seed｜阿部薫｜Mort À Crédit｜1976`（seed 的三軸逐字是 4／4／5、`jazz`、**不是 apex**）與 `c67｜阿部薫｜Mort À Crédit｜1976`。

→ **退（撞池）。不補別張**（jp-1 簡報第二節第 2 點）。

### ⚠ ⚠ 這是一個沒有先例的形狀：**和文＝外文等價形，兩邊各取一半**

**盤面全題逐字是「Mort À Crédit = なしくずしの死」**——**`Mort à crédit` 是 Céline 1936 年那本小說的原題，`なしくずしの死` 是它的日譯書名**，**兩者是同一個題的兩種語言。**
**池中那兩張卡取了法文那一半、MB 的 RG 與 release 取了和文那一半。**
⚠ ⚠ **三道機器全部抓不到**：
1. **`poolRecheck` 這一次沒有漏**——**它把那兩列列在 `artistAlbumsInPool` 裡（狀態逐字「逐張人工比」）**；**這是本線第一次那一格真正發揮作用，但它刻意不判定，**所以仍然要人工比**。
2. **`chk-prop` 抓不到**：它的鍵是 `正規化(掛名)|正規化(盤名)`，**`阿部薫|なしくずしのし` 與 `阿部薫|mortàcrédit` 兩個鍵在任何正規化下都不相等**（**掛名相同、盤名跨了語言**）。
3. **`dedup-crossbatch` 的六道也抓不到**，理由同上。
**→ 這是 c-183 a 第 5665 條（`フォー・ユニッツ` ←→ `宮沢昭《Four Units》`，掛名與盤名同時跨文字系統）與 c-178 b 那一例（`森山威男《Smile》`／《スマイル》，只有盤名跨）之後的第三種**：
**掛名逐字相同、盤名跨的不是文字系統而是語言（法文 ↔ 日文），而且兩者不是音譯也不是直譯關係（`Mort à crédit` 直譯是「分期付款的死」，日譯書名採意譯）。**
**→ 建議寫進 jp-2 線的固定動作**：**`poolRecheck` 列出同藝人的池中清單時，只要清單裡有任何一列的盤名是外文（不是英文），就要回查那個外文題有沒有和文的等價形**
——**具體做法是打 Discogs 的 master／release title，那一欄逐字會把「外文 = 和文」兩邊都印出來**（**本筆與同組的《Origination》《Counter Clockwise Trip》《Disappointment-Hateruma》四筆的 Discogs title 都是這個格式**）。
⚠ ⚠ **這一條對 ALM Records 特別重要**：**該廠「New Improvisational Music」系列的碟幾乎每一張的盤面都是「外文 = 和文」的雙題**（本組 `AL-4`／`AL-7`／`AL-8` 三張全是），**而池中 c-67／c-121 那兩批日本地下即興卡收的是哪一半沒有規律。**

⚠ **`live` 欄併記**：**slice 標 `true`，而它是對的**——**`companies` 逐字有兩個場館（入間市民会館・青山タワーホール）、`notes` 逐字給出兩個明確日期（1975-10-16／1975-10-18）並逐字寫著「recorded live ... at the 「なしくずしの死」 concert」、MB `secondary-types` 逐字 `["Live"]`**，**照第 1904-B 條收窄後的判準三項齊備。**（退件不入卡，仍記下。）
⚠ **再發版本數併記**：**Discogs master 396901 的 `versions` 逐筆跑完共 4 版**（1976 `AL-8/AL-9` 原壓、**1983 同號 `Repress`（3314132，⚠ `notes` 逐字教人用定價 ¥4,000 vs ¥4,077 與封套內側的 ℗ 年分辨兩者）**、1995 `ALCD-8,9` CD 兩筆）；**MB 只建 1 筆，低估 3 版（75%）。**
⚠ **年份與廠牌都沒有問題**（ALM Records `AL-8/AL-9`、1976，**ALM 在十五家之內**）——**退的是撞池。**
⚠ ⚠ **順帶給本機一句**：**池中那兩列（seed ＋ c-67）用的是法文題 `Mort À Crédit`，而 MB 的 RG title 是和文題**
——**若本機日後要為那張卡補 `queryAlias`，`なしくずしの死` 與 rgMbid `279439ee-e53b-4ef2-8563-0b5090af403d` 是現成的。**
（可逆性：收退名單，撞池是硬理由，直接定，不上呈。）

---

## 收件與橫向的裁定（5754–5775）

## 5754　⚠ ⚠ 年份：**12 筆收件全部回查版本表，改判 1 筆（`大野俊三《Bubbles》` 1975 → 1976）**

| # | 掛名 —《盤名》 | slice | MB first-release | Discogs 原壓 `released` | master `year` | Apple jp | **取** | 差 |
|---:|---|---:|---|---|---:|---|---:|---:|
| 0 | 青木望《1999 A.D》 | 1974 | 1974 | 1974 | 1974 | 查無 | **1974** | 0 |
| 3 | 土取利行・高木元輝《Origination》 | 1975 | 1975-04-20 | 1975-04-20 | —（無 master） | 查無 | **1975** | 0 |
| 4 | 渡辺貞夫《At Pit Inn》 | 1975 | 1975 | 1975（錄音 1974-12-24） | 1975 | 查無 | **1975** | 0 |
| 6 | 渡辺貞夫《Swiss Air》 | 1975 | 1975 | 1975（錄音 1975-07-18） | 1975 | 查無 | **1975** | 0 |
| 7 | 笠井紀美子 with Cedar Walton Trio《Kimiko Is Here》 | 1975 | 1975 | 1975（錄音 1974-12-22） | 1975 | ℗1975（日期是 01-01 填充值） | **1975** | 0 |
| **9** | **大野俊三《Bubbles》** | **1975** | **1975** | **1976** | **1976** | **℗1976／1976-01-01** | **1976** | ⚠ **＋1** |
| 10 | 大野俊三《Something's Coming》 | 1975 | 1975 | 1975 | 1975 | **℗1975／1975-05-25** | **1975** | 0 |
| 11 | 増尾好秋《111 Sullivan Street》 | 1975 | 1975 | 1975 | 1975 | ℗1975（日期是 CD 再發日） | **1975** | 0 |
| 12 | 日野皓正《Speak To Loneliness》 | 1975 | 1975 | 1975（錄音 1975-01-15） | 1975 | **℗1975／1975-02-25** | **1975** | 0 |
| 13 | 坂田明トリオ《Counter Clockwise Trip》 | 1975 | 1975 | 1975（錄音 1975-07-03/05） | 1975 | 查無 | **1975** | 0 |
| 15 | 山下洋輔トリオ《Up-To-Date》 | 1975 | 1975 | **1975-07**（錄音 1975-04-28） | 1975 | 查無 | **1975** | 0 |
| 17 | 土取利行・坂本龍一《Disappointment-Hateruma》 | 1976 | 1976 | 1976 | 1976 | 1976（是合成值，見該卡） | **1976** | 0 |

⚠ ⚠ **唯一那筆改判的依據與反轉條件**（詳見該卡的 `risk`）：
**往 1976 的有三項**（Discogs 原壓 `released`、master `year`、Apple 的 `℗` 與日期）；
**往 1975 的只有兩項，而且都是弱的**（MB 的 `first-release-date`，以及原壓 `notes` 逐字的「(C)(P) 1975」——**那是 1975-07 錄音的固著年，不是發行年**）。
**號段也支持 1976**：**同組的《111 Sullivan Street》是 `EW-8020`（1975-09 錄音、Discogs 記 1975），本盤是它之後八號。**
**→ 取 1976。反轉條件：若主線認定 East Wind 的 `EW-80xx` 號段在 1975 年內就開始發行，本卡改回 1975 即可（改的是卡單的 `year`）。**

⚠ ⚠ **本組的年份表要記三件**：
1. **11/12 零差**——**與 c-183 a 第 5670 條的 5/5、c-183 b 第 5697 條的 8/8 同向**；**jp-1 簡報第二節第 3 點那句「真正在漏的是盤名，不是年份」在 jp-2 線第二批仍然成立**（**本組盤名真改判 2 筆、年份 1 筆**）。
2. ⚠ ⚠ **本組第一次出現「Discogs 與 MB 的年份打架、而 Discogs 沒有抄盤面 ℗」的形狀**——**第 550／570／708 條記的是反面（Discogs 會整群抄 ℗ 年），本筆是它沒有抄、而且它才是對的。**
3. ⚠ **四筆收件的錄音年早於發行年，全部要寫進下游**：**#4 錄 1974-12-24／發 1975、#7 錄 1974-12-22／發 1975、#9 錄 1975-07／發 1976、#15 錄 1975-04-28／發 1975-07**
   ——**#4 與 #7 的正文若提到 1974、#9 若提到 1975，必須講清楚那是錄音年。**
⚠ **退件側也逐筆量過**：**#2 的 `country` 與 `format`（MB 拿 2009 數位版當代表）、#16 的 `format`（MB 拿 1994 CD 當代表）兩欄錯，但年份本身沒錯**；
**#8 的年份對（1975）而國別與字標錯（見 5750）。**

---

## 5755　⚠ ⚠ 盤名：**真改判 2 筆、主副題取捨 1 筆、等價形取邊 4 筆、大小寫取捨 1 筆、三欄一致且查無問題 4 筆**

| # | slice 的 `album` | **本卡取** | 性質 |
|---:|---|---|---|
| 0 | `1999 A.D` | **`1999 A.D`** | 三欄一致（⚠ **無句末句點，下游不得寫成 `1999 A.D.`**） |
| 3 | `Origination` | **`Origination`** | 等價形取邊——盤面逐字「Origination = オリジネイション」，取羅馬字（MB 兩層也是羅馬字） |
| 4 | `At Pit Inn` | **`At Pit Inn`** | 寫法差——**原壓與 1978／2007 各版逐字都無引號，只有 MB 那筆 2007 SACD 寫成 `At "Pit Inn"`**，取原壓 |
| **6** | `Swiss Air: Live at Montreux 1975` | **`Swiss Air`** | ⚠ ⚠ **真改判——RG title 取了 2000 年 CD 的長題**；**Discogs 六版裡 1975 原壓／同號 Promo／`18AH 1574`／1978 `23AP 1075` 四版逐字都只有 `Swiss Air`**，見下 |
| 7 | `Kimiko Is Here` | **`Kimiko Is Here`** | 三欄一致、六版逐字相同（⚠ **Apple jp 把三重奏塞進盤名裡，不跟**） |
| **9** | `Bubbles` | **`Bubbles`** | 三欄一致（⚠ **首軌與末軌同題、盤名與曲題逐字相同，`selfTitled` 仍取 false**） |
| **10** | `Something's Coming` | **`Something's Coming`** | ⚠ ⚠ **真改判——原壓盤面自己拼錯成 `Something's Comming`（雙 M）**，見 5769 |
| 11 | `111 Sullivan Street` | **`111 Sullivan Street`** | 三欄一致、五版逐字相同 |
| 12 | `Speak to Loneliness` | **`Speak To Loneliness`** | ⚠ **大小寫取捨 ＋ 等價形取邊**——盤面逐字「Speak To Loneliness = スピーク・トゥ・ロンリネス」，**取 Discogs 的逐詞大寫形**（MB 的 `to` 小寫進 `queryAlias`），見下 |
| 13 | `Counter Clockwise Trip` | **`Counter Clockwise Trip`** | 等價形取邊——盤面逐字「Counter Clockwise Trip = カウンター クロックワイズ・トリップ」，取羅馬字（⚠ **末軌曲題多一個連字號：`Counter-Clockwise Trip`**） |
| **15** | `Up-To-Date` | **`Up-To-Date`** | ⚠ ⚠ **主副題取捨——Discogs 原壓的 title 逐字是 `Up-To-Date 山下洋輔トリオライブ'75 4.28`**，見下 |
| 17 | `Disappointment-Hateruma` | **`Disappointment-Hateruma`** | 等價形取邊——盤面逐字「ディスアポイントメント・ハテルマ = Disappointment-Hateruma」，取羅馬字（⚠ **2005 King CD 逐字 `Disappointment - Hateruma`、Apple jp 逐字用 U+2013，兩種都不得照抄**） |

### ⚠ ⚠ #6 的真改判（本組唯一一筆 `titleCheck` 報對的）

**slice 的 `titleCheck.note` 逐字警告「RG title 與最早 release 的 title 不同——很可能 RG 取了再發標題，逐張核」，逐張核完機器報得對。**
**這是第 1858-B 條的標準形狀**：**MB 最早那筆 release（1975 `SOPN-159`）的 title 逐字只有 `Swiss Air`，而 RG title 取的是 2000 年 `SRCS 9589` 與 2014 年 `SICP 4065` 兩張 CD 的長題。**
⚠ ⚠ **與 c-183 a 第 5661 條的方向剛好相反**：**那一筆（Miles in Tokyo）是「最早的 release 是全題、RG title 才是簡題」**——**`titleCheck` 的警語方向兩邊都會出現，一律要逐張核。**

### ⚠ ⚠ #15 的主副題取捨（本層的判斷，請主線覆核）

**Discogs 原壓與另一筆同號 LP 再發的 title（以及 master 的 title）逐字是 `Up-To-Date 山下洋輔トリオライブ'75 4.28`；**
**而 Discogs 的 1975 Promo 與 1985／1995／2006 三張 CD 逐字都只有 `Up-To-Date`、MB 的 RG title 與唯一那筆 release 逐字也只有 `Up-To-Date`。**
**本層判那一串和文尾巴是「錄音日的說明副題」而不是盤名的一部分，取主題**，依據三項：**(a) 六版裡四版只印主題；(b) C／D 兩面的曲題逐字就是〈Up To Date〉；(c) 池中 13 列 `山下洋輔トリオ` 卡的盤名一律是主題形。**
⚠ **這與第 1858-B 條「以最早 release 的 title 為準」有字面張力，所以寫在這裡供主線覆核**——**若主線要求逐字照抄，本卡改成全題即可（改的是卡單的 `album`）。**

### ⚠ #12 的大小寫取捨（與 c-183 a 第 5671 條不是雙重標準）

**Discogs 原壓逐字 `Speak To Loneliness`（逐詞大寫）、MB 的 RG 與 release 逐字 `Speak to Loneliness`（介詞小寫）。**
**依 jp-1 簡報第三節第 5 點「`album` 欄用盤面原題、Discogs 的 `title` 為準」取 Discogs 那一邊。**
⚠ **c-183 a 第 5671 條在《Live at the Junk》那一筆取了 MB 的非全大寫形，理由逐字是「Discogs 七版逐字是 `Live At The Junk`（**全大寫**），取 MB 的非全大寫形，照池中英文盤名的既有慣例」**
——**本筆 Discogs 那邊不是全大寫、是標準的逐詞大寫，兩者不同形。**
⚠ **另記 Apple jp 的第三種寫法**：**逐字《スピーク・トゥ・ロンリンネス》（`ロンリンネス`，多一個ン）——不可拿去當卡片盤名。**

⚠ ⚠ **`titleCheck` 在本組的表現要記**：**19 筆裡只有 #6 一筆帶警語、而它是對的；12 筆收件裡有 2 筆的盤名真改判，其中 #10 的 `titleCheck` 三欄完全一致、`note` 空白**
——**那正是 c-183 b 第 5698 條記的「看不見的形狀」的延伸（該條記的是整個 MB 抄了同一個錯字），本筆是反過來：原壓盤面印錯、Discogs 忠實轉錄、MB 與所有再發都是對的**（見 5769）。
⚠ **字元逐筆掃過，`chk-prop` 四道全乾淨**：**12 張收件裡沒有一張的盤名或掛名帶非 ASCII 連字號、沒有 U+30FC 當破折號用、「（報告）含日文分隔符 〜／～／＝／゠／＋」那一行一次都沒有出現**
（**本組兩個 `・` 分隔符是 U+30FB，不在那個字元類裡；`with` 是 ASCII**）。
⚠ ⚠ **但退件側有三個字元要留給後續批次**：**#16 的掛名 `Hi‐Fi Set` 帶 U+2010（`chk-prop` 會擋）**、**#5 的 MB 盤名 `Catch‐Wave` 帶 U+2010**、**#14 的掛名 `‘75オールスターズ` 帶 U+2018（兩道都不報、但字串比對會失準）**。

---

## 5756　⚠ ⚠ `live`：**改判 1 筆（`山下洋輔トリオ《Up-To-Date》` false → true）；slice 標 `true` 的 4 筆逐筆核過，4 筆全對**

| # | slice `live` | 本層 | 依據 |
|---:|---:|---|---|
| **15** | **`false`** | ⚠ ⚠ **改判 `true`** | **四項齊備**：`companies` 逐字「Recorded At: Koseinenkin Kaikan」（**音樂廳**）＋ `notes` 逐字「Recording-Date : April, 28. 1975.」（**單一日期**）＋ **盤面副題逐字「山下洋輔トリオライブ'75 4.28」（`ライブ` 三個假名印在盤上）** ＋ **credits 裡有 Concert Direct／Concert Management ×2／Stage Produce／Stage Lighting／Public Adress ×2 一整組演唱會工作人員**；⚠ **MB `secondary-types` 是空陣列，MB 漏標** |
| 4 | `true` | **維持 true** | `companies` 逐字「Recorded At: Pit Inn」（爵士屋）＋ notes 逐字「Live At "Pit Inn" Shinjuku, Tokyo」與單一日期 1974-12-24 ＋ 盤名本身；MB `secondary-types` 逐字 `["Live"]` |
| 6 | `true` | **維持 true** | notes 逐字「Recorded Live at Montreux Jazz Festival, Switzerland, July 18, 1975」＋ 2000 年 CD 的 `Recorded At` 逐字是音樂節；MB `secondary-types` 逐字 `["Live"]` |
| 7 | `true` | **維持 true** | `companies` 逐字「Recorded At: Pit Inn」＋ notes 逐字「Recorded live at "Pit Inn" Shinjuku, Tokyo: December 22, 1974」；MB `secondary-types` 逐字 `["Live"]` |
| 18 | `true` | **維持 true（但退件）** | `companies` 逐字兩個場館（入間市民会館・青山タワーホール）＋ notes 逐字兩個日期與「recorded live ... at the 「なしくずしの死」 concert」；MB `secondary-types` 逐字 `["Live"]` |

⚠ **其餘 14 筆逐張反向核過，沒有再漏標的**，照第 1904-B 條收窄後的判準：
- **7 筆收件的 `companies` 有 `Recorded At`，但逐筆讀過全部是錄音室、不是場館**
  （Crown Recording Studio No. 1／CBS/Sony Studio／PSC Center Studio／The Basement Recording Studio／Union Studios, Munich／Lisrec Studio／Gyoen Studio）
  ——**第 1904-B 條那一關在這 7 筆連門檻都構不上。**
- ⚠ **#3《Origination》是形式上最像現場的一筆**（**五軌全是長篇即興、`companies` 只有唱片公司一筆**）——**但 `notes` 整欄空白、無場館、無日期、無觀眾記載，MB `secondary-types` 空，判 false**，並在卡的 `risk` 逐字要求行文不得寫成現場錄音。
- ⚠ **反向那一關（系列欄有 `Direct Cutting` 而 MB 標 `Live`）本組 0 筆。**

⚠ ⚠ **#15 這一筆的意義要寫清楚**：**c-183 兩組合計 `live` 改判 0 筆，本組是 jp-2 線第一筆 `live` 改判，而且方向是「機器少標」而不是「機器多標」。**
**成因可歸因：MB 只建了那一筆原壓 release、`secondary-types` 空，而 slice 的 `live` 欄是從 MB 的 `secondary-types` 來的**
——**→ 給後續批次一句：`house` 是 Nippon Crown／Crown 這種 MB 只建原壓一筆的小廠時，`live: false` 一律要回 Discogs 看 `companies` 的 `Recorded At` 是場館還是錄音室、以及盤面副題有沒有「ライブ／実況／at ○○」的字樣**（第 397 條那一句的反向用法）。

---

## 5757　⚠ ⚠ 再發版本數：**12 筆收件逐筆跑完整張 `versions` 清單；11 筆有 master 頁裡 10 筆低估、1 筆持平，平均低估率 59%、最高 88%；另 1 筆沒有 master 頁**

| # | 盤 | Discogs master | **`versions` 全表** | MB release 數 | 低估 | 低估率 |
|---:|---|---:|---:|---:|---:|---:|
| 0 | 《1999 A.D》 | 2307112 | **2** | 1 | 1 | **50%** |
| 3 | 《Origination》 | **無 master 頁** | —（資料庫裡只有這一筆） | 1 | — | — |
| 4 | 《At Pit Inn》 | 649179 | **8** | 2 | 6 | **75%** |
| 6 | 《Swiss Air》 | 711400 | **6** | 3 | 3 | **50%** |
| 7 | 《Kimiko Is Here》 | 657738 | **6** | 1 | 5 | **83%** |
| 9 | 《Bubbles》 | 856853 | **4** | 3 | 1 | **25%** |
| 10 | 《Something's Coming》 | 799484 | **7** | 1 | 6 | **86%** |
| 11 | 《111 Sullivan Street》 | 1114173 | **5** | 2 | 3 | **60%** |
| 12 | 《Speak To Loneliness》 | 192409 | **8** | 1 | 7 | **88%** |
| 13 | 《Counter Clockwise Trip》 | 940585 | **2** | 1 | 1 | **50%** |
| 15 | 《Up-To-Date》 | 687780 | **6** | 1 | 5 | **83%** |
| **17** | 《Disappointment-Hateruma》 | 514883 | **4** | **4** | **0** | **0%（持平）** |
| | **合計（11 筆有 master）** | | **58** | **20** | **38** | **平均 59%／總量 66%** |

⚠ ⚠ **jp-2 線第二組的平均低估率 59%（10 筆有低估的平均 65%），落在 jp-1 線二十組 42–93% 的區間內，曲線仍然沒有下降**——**這是本線第三組、第 1905-B 條那條曲線連續二十三組沒有下降。**
**兩種漏法（第 1879-B 條）在本組同時出現，而且本組多一種**：
- **(a) 只數 MB release**——**本組 12 筆的 MB release 數是 1／1／2／3／1／3／1／2／1／1／1／4，若照抄就會把 58 版寫成 20 版。**
- **(b) 漏掉「1970 年代的同號再發」**——**#4 漏的正是 1978 `23AP 1074` 與年份欄為 0 的 `18AH 1573`；#6 漏 1975 的 `18AH 1574` 與 1978 `23AP 1075`；#7 漏 1977 `25AP 735` 兩筆；#10 漏 1976 的 `EW-8011` 改號再發；#12 漏 1976 的 `EW-8008` 改號再發與 1979 美國 Inner City 授權盤。**
- ⚠ ⚠ **(c) 本組特有的一種：East Wind 在 1976 年把 `EW-70xx` 號段整批改號成 `EW-80xx` 再發一次**
  ——**#10（`EW-7011`→`EW-8011`）與 #12（`EW-7008`→`EW-8008`）兩筆都中，而 MB 兩筆都沒建。**
  **這個改號在本線 East Wind 的 41 張裡會反覆出現，建議寫進派工特注。**

⚠ **「沒有 master 頁」的處理**：**#3 照第 1879-B 條只寫「資料庫裡只有這一筆」，不得寫成「沒有再發」**
——**`catno=AL-4` 反查的 25 筆裡只有本筆是這張碟、`q=` 另查也只回本筆、MB 同樣只建 1 筆。**
**本線的小廠（ALM／Frasco／Union）出現無 master 頁的機率會比 jp-1 高，這是本組第一筆、c-183 b 的 #4 是上一筆。**
⚠ **`versions` 表裡 `released` 欄為 0 的版本仍計入版本數、但年份不可引用**：**#4 有一筆（`18AH 1573`）、#10 有一筆（俄國非官方 `LDR 2919`）、#15 有一筆（同號 LP 再發）。**
⚠ ⚠ **#17 是本組唯一一筆持平的碟，而且成因可歸因**：**2026 年 Wewantsounds 那次國際復刻同時在 MB 與 Discogs 兩邊都建了檔（MB 建 CD ＋ 數位版兩筆、Discogs 建 LP ＋ CD 兩筆）**
——**→ 給後續批次一句：2020 年後有國際廠牌復刻的碟，MB 的建檔品質會突然跟上，低估率會掉到 0；那是例外不是趨勢。**
⚠ **不折進 master 的鄰居本組有三個，逐筆確認過不是再發、不計入版本數**：
**#5 退件的《Catch-Wave '97》（2008、另一場 1997 年的錄音，master 1136328）**、**#13 收件的《The Complete Frasco Recordings》（1998 十八張裝盒，Discogs 逐字標 `Compilation`）**、**#16 退件的《Hi-Fi Blend》（1977 精選盤，master 805104）**。
⚠ **退件也逐筆跑了版本表並記在各條**（#1 12 版、#2 3 版、#5 9 版、#8 3 版、#14 無 master、#16 9 版、#18 4 版），**下一線若把它們撈回來才不會重跑。**

---

## 5758　⚠ ⚠ 廠牌欄與「原壓廠牌必須是本線十五家」那一關：**19 筆逐筆以 Discogs `releases/<id>` 的 `labels` 欄為準核過，3 筆的 slice `house` 與原壓不符（16%），三筆都退**

| # | slice `house` | **Discogs 原壓的 `labels` 欄逐字** | 在十五家裡？ |
|---:|---|---|---|
| 0 | Nippon Crown | `Crown (3) — AD-1999` | ✅ |
| 1 | URC | `URC — URG-4022`（companies：Made By: URC Records） | ✅（退在演奏主體與曲目） |
| **2** | **Alfa** | ⚠ ⚠ **`Express — ETP-72100`**（companies 逐字「Record Company: Alfa」「Manufactured By: Toshiba EMI Ltd」「Published By: Alfa Music Ltd.」） | ❌ **整欄錯 → 退（見 5748）** |
| 3 | ALM | `Alm Records — AL-4` ＋ `半夏社 — AL-4`（兩筆並列） | ✅ |
| 4 | CBS/Sony | `CBS/Sony — SOPN 113` | ✅ |
| 5 | CBS/Sony | `CBS/Sony — SOCM 88` | ✅（退在曲風） |
| 6 | CBS/Sony | `CBS/Sony — SOPN-159` | ✅ |
| 7 | CBS/Sony | `CBS/Sony — SOPN 114` | ✅ |
| **8** | **Denon** | ⚠ **`Columbia — JDX-7050`（1975-02）**；`Denon — 4PX-9024` 那一版的 `formats.text` 逐字是 `Export` | ❌ **不符 → 退（另有更硬的理由，見 5750）** |
| 9／10 | East Wind | `East Wind — EW-8028`／`EW-7011` | ✅ |
| 11／12 | East Wind | `East Wind — EW-8020`／`EW-7008` | ✅ |
| 13 | Frasco | `Frasco — FS-7001` | ✅ |
| 14 | Nippon Crown | `Crown (3) — GW-5325`（series：Crown Golden Series） | ✅（退在曲目來源） |
| 15 | Nippon Crown | `Crown (3) — JAW-2001〜2` ＋ 分片的 `JAW 2001`／`JAW 2002` | ✅ |
| **16** | **Alfa** | ⚠ ⚠ **`Express — ETP-72169`**（companies 逐字「Manufactured By: Toshiba EMI Ltd」「Copyright (c): Alfa Music Ltd.」；**`Alfa` 第一次進 `labels` 欄是 1980 年的 `ALR-4011`、逐字標 `Reissue`**） | ❌ **整欄錯 → 退（見 5752）** |
| 17 | ALM | `ALM Records — AL-7`（series：New Improvisational Music） | ✅ |
| 18 | ALM | `ALM Records — AL-8` ＋ `ALM Records — AL-9` | ✅（退在撞池） |

**→ 16/19 相符、3/19（16%）不符，三筆都因此或同時因此退件**（c-183 a 是 2/19＝11%、c-183 b 是 2/18＝11%，**本組是本線三組裡最高的**）。
⚠ ⚠ **三筆的錯法只有兩種，而且都是本線簡報第一節 (1) 逐字預告的**：
1. **#2 與 #16：`house: Alfa` 而原壓字標是東芝EMI 的 `Express`**——**兩張都是「MB 把後來的 Alfa 再發／數位版的 label 倒掛回原壓」＋「把 `companies` 欄的製作公司與出版社當成廠牌」**。
   ⚠ ⚠ **本組兩張 Alfa 兩張全錯，第 5668 條的命中率是 2/2**——**判準已在 5748 條升格。**
2. **#8：`house: Denon` 而原壓字標是母公司 `Columbia`，`Denon` 那一版是同年的輸出版**——**第 5692 條那條「Denon 在十五家之內」的邊界，見 5750。**
⚠ **`Crown (3)`／`Union Records (3)` 的消歧序號照 c-176 b 第 4101 條剝掉**，**這是本線的固定寫法**。
⚠ **CBS/Sony 的兩個分支那一關**：**本組 4 張 CBS/Sony（#4／#5／#6／#7）逐筆跑過版本表，`country` 全部是 Japan，零張西班牙盤、零張美國 Columbia 的授權壓片**
——⚠ ⚠ **這與 c-183 b 第 5715 條第 1 點記的「CBS/Sony 的 `SONP-`／`SOPM-` 號段裡混著大量美國 Columbia 的授權壓片」不衝突，是它的另一面**：
**本組 4 張全落在 `SOPN-` 與 `SOCM-` 兩個號段、四張全是日本自製**；**c-183 b 出問題的兩張落在 `SONP-` 與 `SOPM-`。**
**→ 給後續批次一句（但要記住號段不是判準，簡報第六節）：`SOPN-` 在本組 3/3 是日本自製、`SOCM-` 1/1 是日本自製；`SONP-`／`SOPM-` 仍要逐張回查。**
⚠ ⚠ **`entities` ≠ 盤面廠牌那一條（簡報第二節第 7 點）在本組有一個實例**：**#3 與 #17 的 slice `entities` 逐字是字串 `"ALM RECORDS"`（不是 MBID），而盤面字標是 `ALM Records` ＋ `半夏社`（#3 兩筆並列）**
——**#3 的 `半夏社` 只出現在盤面與 MB 的 label-info，slice 的 `house`／`entities` 兩欄都沒有它。**

---

## 5759　⚠ 掛名：**12 張 10 個相異字串——沿用池中 6 串（佔 8 張）＋ 新立 4 串（2 串二人聯名、1 串 `with` 型聯名、1 串編制串），新造分裂 0、新造分隔符 0、收斂 0**

| # | MB 的 artist-credit 逐字 | Discogs 盤面逐字 | **本卡取** | 依據 |
|---:|---|---|---|---|
| 0 | `青木望`（Person、JP） | `Nozomi Aoki` | **`青木望`**（池中 1 列） | 第 307 條 ＋ 08-11 漢字裁定 |
| 3 | `Toshi Tsuchitori` ` / ` `Mototeru Takagi`（兩 Person、JP；**joinphrase ` / `**） | `Toshiyuki Tsuchitori, Mototeru Takagi = 土取利行・高木元輝` | **`土取利行・高木元輝`**（**新立**） | 盤面漢字側的 `・`；見 5770 |
| 4／6 | `Sadao Watanabe`／`渡辺貞夫`（同一 Person 378278bf） | `Sadao Watanabe` | **`渡辺貞夫`**（池中 26 列以上） | 第 307 條 ＋ 08-11 漢字裁定 |
| 7 | `笠井紀美子` ` & ` `Cedar Walton Trio`（Person JP ＋ Group US） | **`Kimiko Kasai With Cedar Walton Trio`** | **`笠井紀美子 with Cedar Walton Trio`**（**新立**） | ⚠ **盤面明印 `With`，不照 MB 的 ` & `**（第 1934-B 條 (3)）；見下 |
| 9／10 | `Shunzo Ohno`／實體本名 `大野俊三` | `Shunzoh Ohno`（**第三種羅馬字**） | **`大野俊三`**（池中 2 列） | 第 307 條 ＋ 08-11 漢字裁定 |
| 11 | `Yoshiaki Masuo`／實體本名 `増尾好秋` | `Yoshiaki Masuo` | **`増尾好秋`**（池中 3 列） | 同上；⚠ **不與 c-179 的 `増尾元章` 合併**（c-183 a 第 5675 條末段已裁過） |
| 12 | `日野皓正`（Person、JP） | `Terumasa Hino = 日野皓正` | **`日野皓正`**（池中 24 列） | 同上；⚠ **不與 `日野皓正クインテット`（池中 6 列）合併**（第 964／196／197 條） |
| 13 | `Sakata Akira Trio`／實體本名 `坂田明トリオ`（**Group、country null**） | `Sakata Akira Trio = 坂田明トリオ` | **`坂田明トリオ`**（**新立**） | ⚠ **兩家都判成獨立團名實體 → 第 3775 vs 3766 條不收斂**；池中 `坂田明` 4 列並存；見 5761 |
| 15 | `山下洋輔トリオ`（**Group、country null**） | `山下洋輔トリオ` | **`山下洋輔トリオ`**（池中 13 列） | 第 307 條取多數；不與 `山下洋輔`（2 列）或 `山下洋輔トリオとブラス12`（1 列）合併 |
| 17 | `土取利行` `・` `坂本龍一`（兩 Person、JP；**joinphrase `・`**） | `Toshiyuki Tsuchitori, Ryuichi Sakamoto = 土取利行, 坂本龍一`（**2005 CD 用 ` / `**） | **`土取利行・坂本龍一`**（**新立**） | 見 5770 |

⚠ ⚠ **#7 是本組最該記的一格**：**MB 的 joinphrase 逐字是 ` & `，而 Discogs 原壓與其餘五版的盤面掛名逐字都是 `Kimiko Kasai With Cedar Walton Trio`**
——**依第 1934-B 條 (3)「盤面明印才立、資料庫寫法不立」取 ` with `**，而 ` with ` 是池中既有九種分隔符之一、
**c-183 b 第 5703 條剛立的 `笠井紀美子 with Gil Evans Orchestra` 與本卡逐項同構（同一位日本歌手 with 一支美國樂團），另有 `戸谷重子 with 今田勝トリオ` 等五組同構先例。**
**`Cedar Walton Trio` 是新立的團名串，與池中既有的人名串 `Cedar Walton`（3 列）及團名串 `Cedar Walton Quartet`（1 列）並存、不收斂**
——**MB 把 `Cedar Walton`（Person）與 `Cedar Walton Trio`（Group）建成兩個實體，Discogs 也是。**
⚠ **Apple jp 的寫法一律不跟**：**#7 逐字 `笠井紀美子` ＋ 把三重奏塞進盤名、#17 逐字 `Toshi Tsuchitori & 坂本龍一`（一方羅馬字一方漢字）**——**兩種都是額外的寫法，不可拿去當卡片掛名。**
⚠ **四筆新立字串的可逆性都在卡單的 `artist` 值，不動卡池結構。**
⚠ ⚠ **順帶記兩件給後續批次**：
1. **`坂田明` 與 `森山威男` 兩位同時出現在本組兩張收件上**（#13 的三重奏 ＋ #15 的三重奏）——**兩卡不得互相套用班底。**
2. **本組有兩張 Person 實體 country 為 null 而掛名是漢字團名的碟**（#13 `坂田明トリオ`、#15 `山下洋輔トリオ`，兩個 Group 的 country 都是 null）
   ——⚠ **簡報第〇節說的那 18 張「MB 藝人實體無 country」是按 `note` 標警語的，而這兩筆的 `note` 是空白**；
   **本層以 Discogs 盤面的漢字團名與全日本成員判定為本土，沒有走第 4106 條的外國藝人門檻。**
   **→ 給列舉層一句：Group 型實體的 country 為 null 是常態（jp-1 第 3787 條記過「Group 型實體沒設 area」），漢字團名本身就是本土的證據。**

---

## 5760　⚠ 曲風：**19 筆逐筆獨立覆核；`why` 欄 15/19 是空字串，曲風依據全部由本層自建**

**本組的 `why` 分佈**：**空字串 15 筆（79%）、`rg-tag` 3 筆（#1／#3／#17）、`artist-tag` 1 筆（#18）**
——**簡報第一節 (2) 說的「本線十五家裡有十家的列舉檔沒有這一欄」在本組應驗：ALM／URC 兩家有值，其餘六家全空。**
⚠ **那 4 筆有值的在本組是 2 收 2 退**（#3／#17 收、#1／#18 退）——**照第 1850-B 條只當線索不當結論，本層對這 4 筆同樣從零建立依據。**

**本組建立曲風依據的固定路徑（19/19 全跑）**：
1. `release-group/<id>?inc=artist-credits+genres+tags` 取 MB 的 RG 層 tags／genres；
2. `release?release-group=<id>&inc=media+labels+artist-credits` 找出原壓那一筆；
3. Discogs `search` → **讀 `type`** → master → `/masters/<id>/versions` → **找出最早那一版**；
4. `api.discogs.com/releases/<原壓 id>` 讀 `genres`／`styles`／整筆 `extraartists`／逐軌 `Written-By`／`notes`／`companies`／`series`／`formats`；
5. 五款逐款比對 ＋ 收件款三肢逐肢比對 ＋ 第 5701 條的甲乙計數。

| 曲風／曲目來源退件 | 命中的款 |
|---|---|
| #1 三上寛 | **第 1923-B 條演奏主體 ＋ 收件款第三肢**（第 5197／5694／5701 條）——⚠ **五款一款都不成立** |
| #5 小杉武久 | **⑤ 前半（genres 零 Jazz）＋ 第 3716 條三肢全敗** |
| #8 弘田三枝子 | **收件款第三肢（乙 11/11＝100%，第 5701 條）＋ ⑤ 前半 ＋ 第 1925-B 條** |
| #14 山下洋治と‘75オールスターズ | **③ ＋ ① ＋ 第 3716 條退件第 2／4 項 ＋ 第 1925-B 條**（c-183 a 第 5659 條的整條線判準） |
| #16 Hi‐Fi Set | **① `Kayōkyoku` ＋ 第 1923-B 條（逐字點名的那個團）＋ 第三肢（乙 10/10）** ＋ 原壓廠牌 |

⚠ ⚠ **本組的五個統計要記**：
1. **MB 的 RG `tags`／`genres` 兩欄在本組的可信度比 c-183 b 好得多**：**19 筆裡 4 筆是空陣列（#10／#12／#13／#18）、2 筆完全不含 `jazz`（#5 的 `abstract／electronic／experimental`、#8 的 `funk／pop／soul`——兩筆全部退）、13 筆含 `jazz`。**
   **含 `jazz` 的 13 筆裡退了 4 筆（#1／#2／#14／#16）→ 準確率 9/13＝69%**——**遠高於 c-183 a 的 5/16＝31% 與 jp-1 的 31–44%。**
   ⚠ **成因可歸因：年段從 1966–72 移到 1974–76，Crown 的ムード企劃線從 5 張掉到 1 張。**
2. ⚠ **`jazz` 的 count 在本組仍有分辨力**：**19 筆裡只有 2 筆的 `jazz` count 大於 1（#7 的 `jazz(2)`、#9 的 `jazz(2)`），兩筆都收**；**而唯一兩筆非爵士標籤 count 大於 1 的是 #5（`electronic(2)`／`experimental(2)`），它退。**
3. ⚠ ⚠ **`styles` 空陣列在本組是 0 筆**——**第 1936-B 條的豁免本組一次都沒用到**（c-183 b 用了 4 次）；**反過來，主線第 1934-B 條 (2) 款真正觸發 1 次（#7，`styles` 唯一一項 `Vocal`），而結論是收**（見 5771）。
4. ⚠ **③ 款（曲目過半是日本歌謡曲／演歌）在本組只用了 1 次（#14）**——**c-183 a 用了 4 次、c-183 b 用了 2 次**；**取而代之的是第 5701 條的甲乙計數，本組用了 3 次（#1／#8／#16，三筆的乙都是 100%）。**
5. ⚠ **第 1925-B 條（演奏主體要從盤面本身成立）在本組是決定性的三次**：**#8 與 #14 兩筆的盤面 credits 連一位樂手都沒列（各只有一位編曲者或三個團名）→ 退**；**#11 的原壓 Discogs 條目也零樂手列名，但本層以同廠 1979 年壓片的編制欄判它成立 → 收**（見 5766）。

---

## 5761　⚠ ⚠ `poolRecheck` 逐格人工覆核：**19 格全部重掃；真撞池 1 筆、「池中查無此藝人」3 格裡錯 1 格（33%）、「逐張人工比」那一格有 1 筆漏列**

| status | 格數 | 覆核結果 |
|---|---:|---|
| 「同藝人在池中，盤名不同——**逐張人工比**」 | **15** | ⚠ ⚠ **1 格撞池**：**#18 撞 `阿部薫《Mort À Crédit》1976`（seed ＋ c-67）——那兩列機器有列出來，是人工比出盤面全題才確認的**（見 5753）。其餘 14 格逐列比過不撞，⚠ **最長的三格是 #4／#6 的 29 列（渡辺貞夫）、#12 的 24 列（日野皓正）、#7 的 14 列（笠井紀美子），三格都逐列讀完盤名** |
| 「**池中查無此藝人**」 | **3** | ⚠ ⚠ **錯 1 格（33%）**：**#13 `坂田明トリオ` ——池中 `坂田明` 有 4 列**（seed 與 c-121《20人格 / 20 Personalities》1980、c-178《Pochi》1980、c-181《Tacology》1987），**不是撞池但那一格的結論是錯的**。其餘 2 格（#14 `山下洋治と‘75オールスターズ`、#16 `Hi‐Fi Set`）本層以六種寫法各掃一輪，覆核成立 |
| ⚠ 「**變體全是羅馬字，等於沒查過**」 | **1** | **#2 `Jun Fukamachi 21st Century Band` ——警語是對的**：**本層查出漢字名 `深町純` 後掃到池中 5 列**（c-175／c-176 三張／c-181），**但沒有一列是本盤**；**該碟已依原壓廠牌那一關退件（見 5748）** |

### ⚠ ⚠ #13 那一格的失效機制與具體修法（**c-183 a 第 5677 條的修法還沒進腳本**）

**slice 的 `artistVariants` 逐字只有四個字串：`Sakata Akira Trio`／`坂田明トリオ`／`Sakata, Akira, Trio`／`Akira Sakata Trio`**
——⚠ **四個字串裡有兩個含漢字，所以第 1868-B 條的「變體全是羅馬字」警語不會發；而三道比對（等值／前綴／聯名內含）都以「`坂田明トリオ`」為鍵去掃，池中的 `坂田明` 是它的真前綴、不是它的超字串。**
⚠ ⚠ **c-183 a 第 5677 條末段逐字寫過具體修法**：「**前綴比對要做雙向。把 slice 的掛名去掉 `トリオ／カルテット／クワルテット／クインテット／セクステット／オクテット／と◯◯オールスターズ／と◯◯` 等後綴之後，再掃一次池。本筆只要做了這一步就會命中。**」
**→ 本組證明那一步還沒有進到 `batch-progress/jp1-pool-refresh.mjs`**：**本批的 slice 是 2026-09-25 重掃的（比對日逐字寫在 status 裡、池 22277 列／131 批卡單），而同一個失效在隔一批又出現一次。**
**建議排進工具改良，並在 c-185 之後的派工信裡逐批加一句：`artistVariants` 帶編制後綴的，自己去掉後綴再掃一次池。**
⚠ **好消息是本筆不是撞池**（池中那 4 列沒有一列是《Counter Clockwise Trip》），**但 c-183 a 的同一個失效撞掉了一張 `apex:pearl`**——**性質差別只在運氣。**

### ⚠ 「逐張人工比」那一格的漏列（新形狀，只影響覆核成本不影響結論）

**#1 `三上寛` 那一格列了 4 列，而本層實掃到 6 列**——**漏掉的 2 列逐字是 `seed｜三上寛・古澤良治郎｜職業｜1987` 與 `c87｜三上寛・古澤良治郎｜職業｜1987`。**
⚠ **成因**：**那兩列的掛名是 `三上寛・古澤良治郎`（用 `・`(U+30FB) 連的二人聯名），而第三道「聯名內含」比對顯然沒有把 `・` 當成分隔符**
——**c-183 b 第 5706 條記過第三道對純羅馬字掛名的失效（第 1944-B 條已修），本筆是它對 `・` 分隔符的失效。**
**→ 建議修 `jp1-pool-refresh.mjs`：聯名內含那一道要把池中九種分隔符（含 `・`／`＝`／` / `／`〜`）一併當切點。**
⚠ **本筆不影響結論**（#1 退件、而且退的不是撞池），**但它會讓後續批次低估「這位藝人池中有幾張」。**

⚠ ⚠ **本組的錯誤率排在一起**：**c-177 a 56%、c-182 a 17%、c-182 b 14%、c-183 a 25%、c-183 b 0%、本組 33%**
——**曲線沒有方向，因為它取決於「這一批的名單有沒有踩到那幾種形狀」，不是機器變準或變差。**
⚠ ⚠ **在「逐張人工比」那一格真正撞到的 1 筆（#18），本層是靠盤面全題抓到的**——**不是靠盤名字串比對**（`なしくずしの死` 與 `Mort À Crédit` 在任何正規化下都不相等）。
**→ 建議寫進 jp-2 線的固定動作**：**`house` 是 ALM／Frasco／Union／Trio 這幾家（盤面常印「外文 = 和文」雙題）時，每一筆都要讀 Discogs 的 master／release title 全欄，把雙題的兩半各自拿去掃一次池**（見 5753）。

---

## 5762　catno 反查與孤兒 release：**12 筆收件逐筆做完；9 筆直接命中、1 筆改用 `q=`、1 筆無 master、⚠ 1 筆 `catno=` 全滅；差集 0、孤兒 release 0**

| # | 反查用的 catno | 回來的筆數 | 其中是本盤 | 年份差 | 差集 |
|---:|---|---:|---:|---:|---:|
| 0 | `AD-1999` | 11 | 3 | 0 | **0** |
| 3 | `AL-4` | 25 | **1（無 master）** | 0 | **0** |
| 4 | `SOPN 113` | 3 | 3 | 0 | **0** |
| 6 | `SOPN-159` | 3 | 3 | 0 | **0** |
| 7 | `SOPN 114` | 2 | 2 | 0 | **0** |
| 9 | `EW-8028` | 2 | 2 | **0（兩筆都是 1976，見 5754）** | **0** |
| 10 | `EW-7011` | 2 | 2 | 0 | **0** |
| 11 | `EW-8020` | 4 | 2 | 0 | **0** |
| 12 | `EW-7008` | 3 | 3 | 0 | **0** |
| 13 | `FS-7001` | 18 | 3 | 0 | **0** |
| 15 | `JAW-2001` | 4 | 4 | 0 | **0** |
| **17** | **`AL-7`** | **25** | ⚠ ⚠ **0** | — | **0**（靠版本表核的） |

⚠ **第 1923-B 條要求的「跑完 `versions` 還要比一次 `catno=` 反查的 id 差集，抓 `master_id` 為 0 的孤兒 release」已逐筆做完，本組 0 筆。**
⚠ ⚠ **`catno=` 的三種失效在本組全部出現，其中一種是全滅**：
1. **裸目錄號撞號（第 1250 條），本組 4 次**：**`AD-1999` 撞 1999 年捷克盤、三張 Madonna 的 `MAD 1999`、智利合輯**；**`AL-4` 撞 Festival／Allegro／Analog Language／Arco 等 24 筆**；**`EW-8020` 撞 1965 年德國 Odeon 的 Beatles 盤**；**`FS-7001` 撞義大利 Flower Record、英國 Foundation Sound、美加 Flicker／A&M**。
2. ⚠ ⚠ **`AL-7` 全滅**：**25 筆回來的全部是 Analog Language `AL7`、Halcyon `HAL 7`、RCA Custom `RAL 7`、Allegro `AL 70` 等同號碟，本盤一筆都沒有**
   ——**兩個字元的前綴 ＋ 一位數的號碼，在 Discogs 的 `catno=` 上不具唯一性**；**本層是靠 `q=Toshi Tsuchitori Ryuichi Sakamoto Disappointment Hateruma` 命中 master 的。**
   **→ 給後續批次一句：ALM Records 的 `AL-n`（n 是一到兩位數）整個號段的 `catno=` 反查不可用，一律改 `q=<羅馬字掛名> <盤名>`**（**與 c-183 b 第 5715 條第 3 點記的 Denon `CD-xxxx` 是同一類的失效，成因都是「前綴太短、剩下的是裸數字」**）。
3. **`q=` 的排序失效 2 次**：**#10 的第一筆回的是 1976 年的 `EW-8011` 再發、#12 的第一筆回的是 1979 年的美國 Inner City 授權盤**——**兩筆都照簡報第六節先讀 `type` 取 master 再走版本表，沒有拿第一筆當原壓**（第 5707 條那一種再中兩次）。
⚠ **和文 `q=` 在本組沒有用到**（c-183 b 第 5715 條第 4 點記「和文查詢對 1970 年代日本盤幾乎不管用」）——**本組 12 筆全部用羅馬字掛名 ＋ 盤名或 `catno=`。**

---

## 5763　⚠ 外國藝人那一關：**本組 7 筆進關，7 筆全收、0 筆退；分界仍是第 4106 條四項 ≥ 3/4（第 5680 條）**

| # | 盤 | 領銜 | 作曲 | 企劃 | 原盤發行 | **四項** | 演奏側 | 錄音地 | 處置 |
|---:|---|---|---|---|---|---:|---:|---|---|
| 12 | 日野皓正《Speak To Loneliness》 | 日 | 日 | 日 | 日 | **4/4** | **9/10** | 東京 | **收** |
| 15 | 山下洋輔トリオ《Up-To-Date》 | 日 | 日 | 日 | 日 | **4/4** | **3/3** | 東京 | **收** |
| 10 | 大野俊三《Something's Coming》 | 日 | 日 | 日 | 日 | **4/4** | 2/6 | **紐約** | **收** |
| 13 | 坂田明トリオ《Counter Clockwise Trip》 | 日 | 日 | 日 | 日 | **4/4** | 2/3 | **西德慕尼黑** | **收** |
| 9 | 大野俊三《Bubbles》 | 日 | 日 | 日 | 日 | **4/4** | **1/6** | **紐約** | **收** |
| 11 | 増尾好秋《111 Sullivan Street》 | 日 | 日／外各半 | 日 | 日 | **≥3/4** | 2/6 | **紐約** | **收** |
| 4 | 渡辺貞夫《At Pit Inn》 | 日 | 外 | 日 | 日 | **3/4** | **1/4** | 東京 | **收** |
| 7 | 笠井紀美子 with Cedar Walton Trio《Kimiko Is Here》 | 日 | 外 | 日 | 日 | **3/4** | **1/4** | 東京 | **收** |

⚠ **本組與 c-183 兩組最大的不同：這一關 0 退。**
**成因單一且可歸因：簡報第〇節那 216 張硬外國藝人已由 `jp2-fix-domestic.mjs` 剔掉（第 1954-B 條），c-184 是重算後切的第一批**
——**c-183 那 5 筆進關 4 退，是因為它在重算前就切好了。**
⚠ ⚠ **本組把「錄音地不是判準」這一句驗了三次**：**#9／#10／#11 三張在紐約錄、#13 在西德錄，四張的四項全部或幾乎全部在日本側，四張全收**
——**第 4106 條逐字「分界不是錄音地點也不是伴奏國籍」在本組是決定性的。**
⚠ ⚠ **本組把「演奏側人頭比不是判準」也驗到了極端**：**#9 的演奏側是 1/6（六位裡只有領銜者一人是日本人）**
——**與 c-180 第 4858 條收下的 `Woody Herman, 北村英治《We》`（1/6，本線收件最低）相同**；**而 #9 的四項是 4/4、那一張是 3/4，本組這一筆比它更穩。**
⚠ **本組屬於 c-182 a 第 5179 條那一族（領銜是日本人、演奏側幾乎全是美國人）的有 4 張（#4／#7／#9／#11）**——**本線至此累計十三張。**
⚠ **反過來，c-183 b 第 5704 條記的另一族（領銜是外國人、演奏側有日本人）本組 0 張。**
⚠ **第 5680 條的門檻（四項 ≥ 3/4）在本組沒有被挑戰**：**最低的兩筆是 #4 與 #7 的 3/4，兩筆都只有「作曲」在外國側、而那兩張的曲目都是美國爵士標準曲**
——**本層認為「演奏爵士標準曲」這件事本身不該把「作曲」算成不利項，但本組不必動用這個論點（3/4 已達門檻）**；**記在這裡，因為本線後面必然會撞到 2/4 而其他三項都是標準曲的碟。**

---

## 5764　⚠ Apple 與店面（第 254 條，只寫觀察）：**命中 6/12（50%）；⚠ ⚠ 本次工作階段零 403、零 429**

| # | Apple jp | 觀察 |
|---:|---|---|
| 7 | ✅ | **`笠井紀美子 —《キミコ・イズ・ヒア (with Cedar Walton Trio)》`（1655614756、10 軌、℗ 逐字 `1975 Sony Music Labels Inc.`）**；⚠ **掛名只寫她一人、把三重奏塞進盤名裡**；日期 `1975-01-01` 是填充值 |
| 9 | ✅ | **`大野俊三 —《バブルズ》`（1443779321、5 軌、℗ 逐字 `1976 Universal Classics & Jazz`）**——⚠ ⚠ **本組年份改判的第三個獨立來源**（見 5754） |
| 10 | ✅ | **`大野俊三 — Something's Coming`（1443840268、4 軌、℗ `1975`、日期逐字 `1975-05-25`）**——⚠ **落在每月 25 日、與 1975-02～03 的錄音期吻合，可作交叉驗證**；⚠ ⚠ **它的盤名拼法是正確的 `Coming`，是本組盤名改判的佐證之一**（見 5769） |
| 11 | ✅ | `増尾好秋 — 111 Sullivan Street`（1468865964、8 軌、℗ `1975`）；⚠ **日期逐字 `2002-10-28` 是 CD 再發日、不得引用** |
| 12 | ✅ | `日野皓正 —《スピーク・トゥ・ロンリンネス》`（1467713346、3 軌、℗ `1975`、日期逐字 `1975-02-25`）；⚠ ⚠ **盤名多一個ン、是第四種寫法** |
| 17 | ✅ | `Toshi Tsuchitori & 坂本龍一 —《Disappointment–Hateruma》`（1875944904、4 軌、℗ 逐字 `2026 Wewantsounds / Modulor`）；⚠ ⚠ **盤名用 U+2013、掛名一方羅馬字一方漢字，兩者都不得照抄**；⚠ **日期逐字 `1976-02-27` 是把 2026 年復刻的月日套進 1976 這個年份的合成值、不得引用** |
| 0／3／13 | ❌ | **`resultCount` 逐字 0**——**1974 年的クラウン 自製盤、1975 年的 ALM 自主盤、1975 年的 Frasco 首號盤三張都沒有數位化** |
| 4／6 | ❌ | **各回 10 筆、逐筆比對後 0 筆是本盤**（回的是 1978《California Shower》、1979《Morning Island》、1984《ランデブー》與 2018–2026 年的 M&M Music 新作）——**CBS/Sony 1975 年的 `SOPN-` 目錄不在 Apple jp 上** |
| 15 | ❌ | **回 4 筆、0 筆是本盤**（⚠ **其中 `山下洋輔 — Yosuke Yamashita Trio with Brass 12`（720405216、1971-06-21、℗ EMI Music Japan）就是池中 c-174 那張卡，可作交叉驗證**；另回《TRIO BY TRIO +1 (Live)》1970 與《In Europe 1983》，**都不是本盤**） |

⚠ ⚠ **`itunes.apple.com/search` 在本次工作階段完全沒有 403／429**——**十三次查詢全部一次 200**（節流 1.45 秒）。
**這與附錄二第 2 點「間歇性 403，不是恆定」一致；c-183 b 第 5708 條踩到一次 403、本組零次。**
⚠ ⚠ **命中率 6/12＝50%，明顯高於 c-183 a 的 0/5**，**而且分佈可歸因**：
**East Wind 的 4 張全部命中（℗ 全是 `Universal Classics & Jazz`——那一整條目錄在 2018–2019 年整批上架，連號 id `14437xxxxx`／`14688xxxxx`）**；
**CBS/Sony 的 4 張裡只有 1 張命中（#7，Sony Music Labels 的 1655614xxx 那一批，與 c-183 b 的《Satin Doll》1655614454 是同一批連號）**；
**Crown 的 2 張、ALM 的 2 張裡只有 2026 年復刻那 1 張命中、Frasco 的 1 張 0 命中。**
**→ 給探測層的預期：本線的 East Wind 41 張串流覆蓋率應該很高；Crown／Frasco／ALM 的 1970 年代盤預期接近 0，除非 2020 年後有國際復刻。**
⚠ **日期可信度按廠牌分（第 1907-B 條）在本組的實測**：**East Wind／日本フォノグラム 系的兩筆（#10 的 `1975-05-25`、#12 的 `1975-02-25`）都落在每月 25 日、與各自的錄音期吻合**
——**照第 1945-B 條「Discogs 原壓為主源、Apple 一律只作交叉驗證」，兩筆的卡 `year` 仍取 Discogs 的年，日期只寫進 `risk`。**
**⚠ 但 #9 是例外而且很重要：那一筆的 Apple 日期是 `1976-01-01`（填充值），可用的是它的 `℗ 1976`，而那一項參與了年份改判。**
⚠ **us 未另查**；**`lookup` 未用到（沒有需要逐軌回推的碟）**；**allmusic／allaboutjazz 依附錄二一律不排進查證路徑，本組一次都沒有打。**

---

## 5765　`desc-tools/jp-proper-names.json`：**本批 append 2 個（`国吉征之`／`未来派野郎`），既有 63 個一個都沒動**

**本組 12 張收件會出現在正文裡的日文專名逐個對 `qa-batch.mjs` 第 43 行的 `SIMP` 字表比過**
（做法：把本批 12 張的 `artist`／`album`／`why`／`risk`／`label` 五欄串起來，套 `stripJpNames` 剝掉既有白名單後跑一次 `SIMP` 正規式）。**結果只有兩個字串會被誤報**：
1. **`国吉征之`**（`国` 是日文新字體與簡體的同形字）——**#15《Up-To-Date》的 `Recording Direct`，逐名印在盤上，寫作層可能會用到。**
2. **`未来派野郎`**（`来` 同形）——**坂本龍一 1986 年的專輯名，出現在 #17 的 `why` 裡（列他池中 10 列的清單）**；⚠ **這一個會在本線所有 坂本龍一 相關卡上重複出現，先加進去。**

⚠ ⚠ **本層特別確認過三件**：
- **`東京厚生年金会館`（#15 的錄音場館）沒有被誤報，因為它與 `新宿厚生年金会館` 兩串早就在白名單裡**（第 1866-B 條那一批加的）——**本卡的正文用的就是全稱。**
- **本組另外四十餘個樂手漢字名與六個錄音室名逐個測過，一個都不會被 `SIMP` 攔**
  （守新治・河上修・本田竹広・板橋文夫・宮田英夫・岡田勉・日野元彦・杉本喜代志・清水末寿・向井滋春・今村祐司・鈴木宏昌・中村建一・鈴木智雄・相見明・武部秀明・岡山和義・村上光男・江草啓介・河原奈美・鈴木良雄・菊地雅章・森山威男・坂田明・沢田駿吾・間章・小島幸雄・鳥居信影・竹田賢一・吉田廣樹・柏原卓・北澤靖高・石川秀臣・内田拓巳・佐藤継雄・岩神六平・恩地廣一・佐藤幸彦・山崎聖次・中川義光・黒川博・関根ゆき子・鈴木理恵・山田真理・新居章夫・木下孝・大島美智子・内田巧・鯉沼利成・伊藤潔・伊藤八十八・森崎由紀夫・久保譲介・細川光男・福砂和夫・岩浪洋三・油井正一・石岡瑛子・成瀬素子・沢渡朔・半夏社 等）。
- ⚠ **`GARBAGE`（非拉丁）那一道本組不需要白名單**：**#17 的兩軌曲題含希臘字母 `α`／`Φ` 與數學花體 `𝔷`(U+1D537)，但那兩個曲題沒有進卡的 `album` 欄、只出現在 `why` 的〈〉引號內**（`stripLegit` 會剝掉）；**`desc-tools/nonlatin-proper-names.json` 本批不需要建。**

⚠ **檔案只 append、不刪不改**：**既有 63 個字串本層逐一比對過全部保留（`before 63 / after 65`、`b.every(x => a.includes(x))` 逐字回 true），新增就是上面那兩個。**
⚠ **登記三個候選給後續批次**（本組出現在**退件**的來源裡，收件的卡用不到，照 c-183 a 第 5683 條的慣例本批不加）：
1. **`入間市民会館`**（`会` 同形，#18《なしくずしの死》的錄音場館之一）；
2. **`青山タワーホール`**（片假名，不會被 `SIMP` 攔，但它是 ALM 系 1975–76 年反覆出現的場地，登記給後續批次省查）；
3. **`如月ミュージックオフィス`**（#1《BANG!》的逐軌 credit，片假名不會被攔，同樣只登記）。

---

## 5766　⚠ ⚠ 邊界收件（一）：`増尾好秋 —《111 Sullivan Street》`——**第 1925-B 條的「盤面」是否只限原壓那一次壓片？本層判「不是」，反轉條件逐字寫在末段**

**問題**：**Discogs 1975 原壓 releases/6718101 的整筆 `extraartists` 十筆裡一位演奏者都沒有——連領銜者本人的樂器都沒列**
（十筆逐字是 `Eiko Ishioka — Design`／`Motoko Naruse — Design`／`Kiyoshi Itoh — Directed By`／`Yasohachi Itoh — Directed By`／`David Baker — Engineer`／`Toshinari Koinuma — Executive-Producer`／`Hajime Sawatari — Photography By`／`Yoshiaki Masuo — Producer`／`Junichi Kamekura — Promotion`／`Yukio Morisaki — Promotion`），
**而 `notes` 逐字寫著「Comes with obi stripe. No insert originally.」**。

**照字面讀第 1925-B 條（「伴奏陣容要算數，得印在盤面（credits／內頁）上；靠第三方商品頁還原的名單不算」），本盤會與 c-180 退掉的 `麻生小百合《キャンディ・ジャズ》` 同形而退。本層判不退，依據三項**：

1. ⚠ ⚠ **編制是從同一家廠牌對同一張母帶的另一次壓片上取的，不是第三方商品頁**：
   **Discogs releases/11402821＝1979 年 East Wind 自家的「EW Best Collection」`15PJ-1004`，整筆 `extraartists` 十四筆逐名印出六人編制**：
   **`Yoshiaki Masuo — Guitar`（＋`Producer`）、`Bob Mover — Alto Saxophone`、`Bob Cranshaw — Bass`、`Yoshio Suzuki（鈴木良雄）— Bass`、`David Lee (2) — Drums`、`Jimmy Lovelace — Drums`**，`notes` 逐字「Recorded September 27,28, 1975 at Basement Studio, NYC」。
   **第 1925-B 條禁的是「靠第三方商品頁還原的名單」——廠牌自己後來的壓片是盤面，不是第三方。**
2. **「演奏主體是爵士編制」這件事在本盤不靠伴奏名單成立**：**這是一張爵士吉他手的領銜作，領銜者本人就是 `Producer`、八軌裡四軌是他自己寫的、另四軌是美國爵士標準曲**
   ——**第 1923-B 條逐字「伴奏名單很強不是收件款的任何一肢，判準看的是演奏主體是不是爵士編制」，本筆是那一條的反面用法：不需要伴奏名單來證明它是爵士盤。**
3. **與 c-183 b 第 5710 條的「有無之別」對照**：**該條收下 `飯吉馨 & The WIP《Soul Tripper》` 的理由逐字是「個別團員沒有列名，但領銜者本人的樂器與樂團整體都印在盤上——與盤面一個樂手都沒列是有無之別」**
   ——**本筆比它弱一格（1975 原壓連領銜者的樂器都沒列），但比 `麻生小百合` 那一張強兩格（那一張的伴奏陣容只存在於第三方商品頁、而且領銜者是一位歌手不是樂手）。**

→ **收。**

⚠ ⚠ **反轉條件逐字寫在這裡**：**若主線認定第 1925-B 條的「盤面」只限原壓那一次壓片，本卡要改走第 5710 條的「有無之別」而判退**
——**翻的成本只是撤一張卡（不動卡池結構）**；**但本層建議不要這樣讀，理由是「Discogs 對某一次壓片的 credits 轉錄不完整」是資料庫的缺陷、不是那張碟的事實**
（**本組 #11 與 #3、#13、#17 的原壓 credits 完整度差異很大，而四張是同一個年段、同一種規格的日本爵士 LP**）。
**→ 建議主線把第 1925-B 條補一句：「盤面」含同一家廠牌對同一張母帶的其他壓片；第三方商品頁與後來別家廠牌的復刻內頁不算。**

---

## 5767　⚠ ⚠ 邊界收件（二）：`渡辺貞夫 —《Swiss Air》`——**Discogs 的逐軌作曲欄把三軌記成 `Traditional`，交叉驗後才過第三肢；不驗就會退**

**問題**：**1975 原壓 releases/3563704 的逐軌 `Written-By` 逐字把〈Masai Steppe〉〈Tanzania E〉〈Pagamoyo〉三軌記成 `Traditional`（另掛 `Arranged By: Sadao Watanabe`），只有〈Sway〉〈Way〉兩軌記成 `Sadao Watanabe`。**
**若採信這一欄，依第 5701 條的甲乙計數：甲 2（兩軌原創）、乙 3（三軌既有的非爵士曲目——非洲傳統素材），乙佔 3/5＝60% > 一半 → 第三肢失敗 → 依第 1934-B 條可獨立退件。**
**而本層判收，依據是交叉驗**：

**同一張母帶的 1978 年二刷（Discogs releases/5904444，`CBS/Sony 23AP 1075`，`notes` 逐字自稱「2nd press.」）的整筆 `extraartists` 逐字有兩筆**：
**`Sadao Watanabe — Composed By` 與 `Sadao Watanabe — Arranged By`，而且整筆十筆 credits 裡沒有任何 `Traditional`。**
**→ 依簡報第六節逐字「Discogs 的作曲欄會錯——作曲不是它的強項，要交叉驗」取後者：五軌都是他自己的曲與自己的編曲，乙＝0（0%），第三肢成立。**

⚠ ⚠ **這一筆與 c-183 a 第 5667 條、c-183 b 第 5695 條（`山本邦山` 那兩張 12/12 軌日本民謡）的分界要寫清楚，因為形狀很像**：
- **那兩張的十二軌逐軌都是有名有姓、任何日本人都認得的既有民謡曲目（〈木曽節〉〈黒田節〉〈ソーラン節〉…），而且 2026 年原廠自己把副題寫成「日本民謡集」。**
- **本盤的〈Masai Steppe〉〈Tanzania E〉〈Pagamoyo〉三個曲題在任何曲目表上都查不到「原曲」——它們是 渡辺貞夫 1970 年代非洲題材那一條線（《Pastoral》《Mbali Africa》同系）的自作曲，`Traditional` 是 Discogs 投稿者對「非洲風」的標記，不是可查證的既有曲目。**
- ⚠ **1978 年二刷的 credits 就是第三方支持那一邊的證據；本層沒有找到任何來源指出這三軌對應哪一首既有的傳統曲。**

→ **收。** ⚠ ⚠ **反轉條件逐字寫在這裡**：**若主線或研究層查到那三軌確實對得回具體的既有傳統曲目，本卡的乙就是 3/5＝60%、依第 5701 條要改判退**
——**改的是卡單的 `why`／`risk`（不動卡池結構）**；**本層把兩邊的證據都寫進卡的 `risk` 裡，就是為了讓那一步便宜。**
⚠ ⚠ **給後續批次一句判準**：**Discogs 的 `Written-By: Traditional` 在日本爵士盤上不可直接當「既有的非爵士曲目」採信**
——**要先看同一張母帶的其他壓片、以及那個曲題查不查得到原曲**；**本線的非洲題材、尺八題材、民謡題材三條線都會撞到這一格，而三者的處置不同**（**民謡：曲題就是曲目，退；非洲／東方題材的自作曲：收**）。

---

## 5768　⚠ ⚠ 立判準：**`Free Improvisation` 是主線第 1934-B 條 (2) 款意義下的「爵士成分」**（本組三張碟掛在它上面）

**問題**：**主線第 1934-B 條 (2) 款逐字列舉了九個爵士成分（Fusion／Jazz-Funk／Bop／Modal／Free Jazz／Post Bop／Big Band／Soul-Jazz／Avant-garde Jazz），`Free Improvisation` 不在裡面。**
**本組有三張碟的 `styles` 含 `Free Improvisation`**：
- **#3《Origination》**：genres `Jazz`、styles `Free Improvisation`／`Free Jazz`——**`Free Jazz` 在列舉裡，(2) 款本來就不觸發。**
- **#18《なしくずしの死》**（退件、撞池）：genres `Jazz`、styles `Free Jazz`／`Free Improvisation`——同上。
- ⚠ ⚠ **#17《Disappointment-Hateruma》**：**genres `Electronic`／`Jazz`／`Classical`、styles 逐字只有 `Experimental`／`Free Improvisation`**——**`Free Jazz` 不在列，(2) 款是否觸發就取決於 `Free Improvisation` 算不算。**

**本層判「算」，依據三項**：
1. **該款逐字列舉的九個是「例如」不是窮舉**——**c-183 b 第 5711 條已對 `Bossa Nova` 做過同一個判斷並經交件**（該條逐字：「那份清單是『例如』不是窮舉」）。
2. ⚠ ⚠ **Discogs 自己把 `Free Improvisation` 配在 Jazz 底下**——**本組的 #3 與 #18 兩筆的 `genres` 逐字都是單一 `Jazz` 而 `styles` 含 `Free Improvisation`**，**那是 Discogs 的分類樹自己給的證據，不是本層的推論。**
3. **池中先例**：**c-67／c-121 那兩批日本地下即興卡（阿部薫 五張、高柳昌行 / 阿部薫、高木元輝＝加古隆カルテット…）全部是自由即興盤、全部在池中以 `jazz` 標籤存在。**

**→ 立為判準：`Free Improvisation` 與 `Free Jazz` 在本線同等，是第 1934-B 條 (2) 款意義下的爵士成分。**
⚠ **這一條只影響 (2) 款會不會觸發、不改變任何一張碟的最終處置**：**#17 若判 `Free Improvisation` 不是爵士成分，要改走第 3716 條三肢——三肢仍然二過一敗（演奏主體 ✔、曲目 4/4 全原創 ✔、`styles` ✘），結論一樣是收。**
**記在這裡是為了讓後續批次不必重跑這一格**（**本線 ALM／Frasco／Union／Trio 四家的自由即興盤還有很多**）。
（可逆性：判準層，不動任何卡；照裁定權下放第 1 條「有先例」（第 5711 條）與第 3 條「卡住整條線」直接定。）

⚠ **順帶把 #17 的 `genres` 含 `Classical` 那一格結清**：**⑤ 款逐字的射程是「`genres` 不含 Jazz，或含 `Non-Music`／`Stage & Screen`」——`Classical` 不在裡面**；
**與 c-183 a 第 5660 條退掉的 `《尺八1969》` 的分界就在這裡：那一筆的 `genres` 逐字是 `Classical`／`Folk, World, & Country`、`Jazz` 根本不在陣列裡（⑤ 前半成立），本筆 `Jazz` 在陣列裡。**

---

## 5769　⚠ ⚠ 立判準：**`titleCheck` 的第五種「看不見的形狀」——原壓盤面自己印錯，而資料庫忠實轉錄**

**#10 `大野俊三《Something's Coming》` 的六個來源逐字**：
- **Discogs 1975 原壓 releases/5043473 的 release title 與首軌 A1 的曲題**：**`Something's Comming`（雙 M）**；
- **Discogs master 799484 的 title**：**`Something's Comming`**；
- **Discogs 1976 `EW-8011` 再發、2001／2002／2009／2015 四張 CD、俄國非官方 CD 六版**：**`Something's Coming`**；
- **MB 的 RG title 與唯一那筆原壓 release**：**`Something's Coming`**；
- **Apple jp（1443840268）**：**`Something's Coming`**。

**→ 取 `Something's Coming`**，依據是 **c-183 b 第 5698 條 (1) 的同一條理由「拼錯的那一邊在語義上不成立，取第三方多數支持的一邊」**——**本筆是六比二。**
⚠ ⚠ **但方向與該條相反，所以要另立一種形狀**：
- **第 5698 條 (1)**：**MB 的三欄（RG title、release title、`titlesSeen`）一起抄了同一個錯字（`DEPARTRUE`），只有 Discogs 對**——**該條逐字建議把它加進簡報第三節第 2 點當第 (c) 種。**
- **本筆**：**原壓盤面本身印錯，Discogs（含 master）忠實轉錄，而 MB 與該廠牌後來所有的再發都印對。**
- ⚠ ⚠ **兩種的共同點是 `titleCheck` 三欄完全一致、`note` 空白，機器完全不報**（**本筆的 `titleCheck` 逐字是 `rgTitle`＝`earliestRelease.title`＝`titlesSeen` 唯一值＝`Something's Coming`，`note` 空白**）。
- ⚠ ⚠ **本筆的機器盲區比第 5698 條那一筆更深**：**那一筆只要打一次 Discogs 就會發現；本筆打了 Discogs 反而會拿到錯字，要再看 Discogs 自己的再發版與 MB 兩邊才分得出來。**

**→ 建議加進 `CURATION-BRIEF-jp1.md` 第三節第 2 點，當第 (d) 種看不見的形狀**：
**「原壓盤面自己印錯，Discogs 忠實轉錄、MB 與再發都印對——三欄一致、`note` 空白，只能靠比對同一個 master 底下各版的 title 抓出來。」**
⚠ **判準的方向要寫清楚，免得與「`album` 欄用盤面原題」打架**：
**「盤面原題」指的是題本身，不是題上的錯字**；**當同一家廠牌後來的壓片把錯字改正，那就是廠牌自己的更正、取更正後的形式**，**錯字整串進 `queryAlias`。**
⚠ **反過來的一種本組沒有出現、但要預留**：**若某個錯字只出現在原壓而廠牌從未更正（後續都沒再發），那就沒有第三方多數可取——照「盤面原題」照抄，並在 `risk` 逐字寫明它是盤面的誤拼。**
（可逆性：判準層 ＋ 一張卡的 `album` 值；照裁定權下放第 1 條「有先例」（第 5698 條）與第 2 條「可逆」直接定。）

---

## 5770　⚠ 立判準：**ALM Records「New Improvisational Music」系列的日本人二人聯名，分隔符一律取 `・`(U+30FB)**

**本組有兩張這個形狀的碟，而兩張的來源給的分隔符互相交錯**：

| # | 盤 | MB 的 joinphrase | Discogs 原壓盤面（漢字側） | Discogs 再發 | **本卡取** |
|---:|---|---|---|---|---|
| 3 | 《Origination》（ALM `AL-4`、1975） | ` / ` | **`土取利行・高木元輝`** | —（無再發） | **`土取利行・高木元輝`** |
| 17 | 《Disappointment-Hateruma》（ALM `AL-7`、1976） | **`・`** | `土取利行, 坂本龍一` | 2005 King CD 用 ` / ` | **`土取利行・坂本龍一`** |

**本層對兩張取同一種分隔符 `・`，依據三項**：
1. **`・` 是池中既有的分隔符，而且先例逐項同形**——**seed 與 c-87 的 `三上寛・古澤良治郎《職業》1987` 也是「日本人二人、`・` 相連」**（⚠ **順帶：本組 #1 的 `poolRecheck` 漏列的就是這兩列，見 5761**）。
2. **兩張碟是同一家廠牌、同一條「New Improvisational Music」系列、同一位 土取利行**——**掛名寫法應該一致，而兩個來源在兩張碟上剛好各對了一次**（#3 Discogs 對、#17 MB 對）。
3. **四種候選分隔符（`・`／`, `／` / `／`＝`）全部是池中既有九種之一，新造 0**
   ——**`, ` 有 45 個相異字串（c-180 第 4853 條實掃）、` / ` 有 `高柳昌行 / 阿部薫`（seed ＋ c-59）、`＝`(U+FF1D) 有 `高木元輝＝加古隆カルテット`（seed ＋ c-87）**；**取哪一種都不新造，所以判準要看一致性與盤面。**
⚠ **另兩種寫法全部進兩張卡的 `queryAlias`**；**`chk-prop` 的 `k()` 把所有標點剝掉，四種寫法折出同一個鍵，不會折出分裂鍵、也沒有撞卡風險。**
⚠ **可逆性在卡單的 `artist` 值，不動卡池結構；若本機日後要統一，改的是本組這兩張。**

⚠ ⚠ **這一條同時把 `高木元輝` 這個字串的狀態記清楚**：**池中 `高木元輝` 出現過 2 列，但兩列都在聯名串 `高木元輝＝加古隆カルテット` 裡（seed ＋ c-87），沒有單獨的 `高木元輝` 字串。**
**本卡的 #3 是池中第一張把他當成對等一方、用他本名入池的卡**——**依第 964／196／197 條與那個四重奏串並存，不收斂**（**第 3775 vs 3766 條的分界：MB 與 Discogs 兩邊都把 `高木元輝`（Person）與那個四重奏建成不同實體**）。
（可逆性：卡單值；照裁定權下放第 1 條與第 2 條直接定。）

---

## 5771　⚠ ⚠ 邊界收件（三）：`笠井紀美子 with Cedar Walton Trio —《Kimiko Is Here》`——**主線第 1934-B 條 (2) 款在 jp-2 線第二次真正觸發，而結論是收**

**Discogs 原壓 releases/5434034 的 `genres` 逐字只有 `Jazz`，而 `styles` 陣列有內容且唯一一項是 `Vocal`——零個爵士成分**
（Fusion／Jazz-Funk／Bop／Modal／Free Jazz／Post Bop／Big Band／Soul-Jazz／Avant-garde Jazz 皆不見）。
**這正是該款要的「有內容而內容零爵士」的形狀，第 1936-B 條的空陣列豁免不適用**（本組 `styles` 空陣列 0 筆）。
**依該款改由第 3716 條三肢逐肢覆核**：

| 第 3716 條的三肢 | 《Kimiko Is Here》 |
|---|---|
| 演奏主體是爵士編制 | ✅ **Cedar Walton（鋼琴）・Sam Jones（貝斯）・Billy Higgins（鼓）三位逐名印在盤面上，是一支完整的爵士三重奏**；**與 c-183 b 第 5692 條退掉的 `伊東ゆかりとグリーン・ジンジャー《Love》`（`extraartists` 五筆、一位器樂樂手都沒有列）是有無之別，不是多寡之別**（第 1925-B 條） |
| 曲目以爵士標準曲或原創為主 | ✅ **依第 5701 條逐軌數：甲 8、乙 2（〈Moondance〉1970 Van Morrison ＋〈No Tears (In The End)〉Ralph MacDonald／William Salter），乙佔 20%、遠低於一半** |
| `styles` 的爵士成分 | ❌ **唯一一項是 `Vocal`** |

→ **三肢二過一敗，收。**

⚠ ⚠ **本層把它與 c-183 b 的兩筆並列，因為三筆合起來才是這一款的刻度**：
| | #7 本卡（**收**） | c-183 b #18 太田幸雄（**退**） | c-183 b #8 伊東ゆかり（**退**） |
|---|---|---|---|
| genres／styles | `Jazz` ／ **`Vocal`** | `Jazz`／`Pop` ／ **`Vocal`** | 四項 ／ `Vocal`／`Easy Listening`／**`Jazz-Funk`** |
| 第 1925-B 條（演奏主體） | ✅ **三位爵士樂手逐名印在盤面** | ❌ 四位成員的主 credit 都是 `Voice` | ❌ **`extraartists` 五筆、零器樂樂手** |
| 第三肢（第 5701 條） | ✅ **乙 2/10＝20%** | ❌ 16/16 日語歌もの | ❌ **8/12＝67%** |
| 三肢 | **二過一敗 → 收** | 兩敗 → 退 | 兩敗 → 退 |
**→ 分界不在 `styles` 有沒有 `Vocal`，在另外兩肢**：**`styles` 唯一一項是 `Vocal` 的碟，本線至此三張、一收兩退。**
⚠ ⚠ **這一筆與 c-181 第 4977 條、c-182 b 第 5205 條（第 3716 條救濟成功的前兩例）綁在一起：要翻就一起翻。**
⚠ **附帶記一件**：**本卡與同組的 `渡辺貞夫《At Pit Inn》` 是同一支 Cedar Walton Trio、同一間 Pit Inn、同一位製作人 中村建一 與錄音師 鈴木智雄、錄音日相差兩天（1974-12-22 與 12-24）、CBS/Sony 目錄號相差一號**
——**兩卡的 `label` 欄都刻意不逐字寫對方的目錄號**（c-183 b 第 5714 條：`dedup` 的「共用目錄號」那一道會誤報，**本層第一次寫的時候就踩到了、已改**，見 5774）。
（可逆性：收退名單 ＋ 卡單值；照裁定權下放第 1 條「有先例」（第 4977／5205 條）與第 2 條直接定。）

---

## 5772　⚠ Discogs 與 MB 的技術性失效，本組踩到七個（兩個是新形狀）

1. ⚠ **`search` 混著 `type: "master"` 與 `"release"`**——**本組每一次 `q=` 的結果都是混的，一律先讀 `type` 再決定打 `masters/<id>/versions` 還是 `releases/<id>`，沒有一次拿 master id 去打 `releases/`。**
2. ⚠ ⚠ **`catno=` 全滅一次（新形狀）**：**`AL-7`（#17）回的 25 筆裡本盤一筆都沒有**——**兩個字元的前綴 ＋ 一位數的號碼在 `catno=` 上不具唯一性**（見 5762）。
3. ⚠ **裸目錄號撞號（第 1250 條）4 次**：`AD-1999`／`AL-4`／`EW-8020`／`FS-7001`（見 5762）。
4. ⚠ **`search` 的排序把再發排在原壓前面 2 次**：#10 的第一筆是 1976 `EW-8011`、#12 的第一筆是 1979 美國 Inner City。
5. ⚠ ⚠ **Discogs 的作曲欄會錯，本組抓到兩處（其中一處決定了一張碟的收退）**：**#6 的三軌 `Written-By: Traditional`（見 5767）**、**#11 的 A1〈Swing 42〉記成 `Yoshiaki Masuo` 而那是 Django Reinhardt 的知名曲題**（**本層兩種算法都跑過，第三肢的結論不變**）。
6. ⚠ **MB 的載體欄會錯 2 次**：**#11 的 2015 年那一筆 MB 記成 `12" Vinyl`、Discogs 逐字是 `CD`**；**#15 的兩枚組 MB 記成單一 medium、Discogs 逐字是 `Vinyl qty 2`**。
7. ⚠ **MB 的 `country` 與 catno 欄會錯**：**#9 的 2002 年那一筆 MB 記成 `US` 的 `9031`、Discogs 逐字是 JP 的 `UCCJ-9031`**；**#13 的原壓 MB 的 catno 欄整個是空的（廠牌只有 `Frasco`），目錄號是本層從 Discogs 補的。**
8. ⚠ **MB 的 `status` 欄會是 null**：**#10 的原壓 release `status` 逐字是 null 不是 Official**——**照 c-183 a 第 5682 條第 5 點不可拿 `status` 當篩選條件。**
9. ⚠ ⚠ **MB 的軌數會與 Discogs 不同（新形狀）**：**#18（退件）的 MB release 逐字記 3 軌 ＋ 4 軌＝7 軌，而 Discogs 逐字是 8 軌**——**MB 把〈Alto Improvisation No.4 Part 1／Part 2〉算成一軌。**
   **→ 軌數不一致時要看是「同一曲拆兩軌」還是「真的少一軌」，前者不是缺漏。**
10. ⚠ **`releaseType` 那一關**：**本組 19 筆的 MB `primary-type` 全部是 Album、`secondary-types` 只有 #4／#6／#7／#18 是 `["Live"]`（⚠ **#15 漏標，見 5756**）、零筆 Compilation、零筆 EP**；
   **Discogs 的 `formats` 也逐筆讀過，12 筆收件零個 `Compilation` 描述子**（⚠ **兩個標 `Compilation` 的鄰居都不折進 master：#16 退件的《Hi-Fi Blend》與 #13 的《The Complete Frasco Recordings》**）。
11. ⚠ **MB 的 `artist:` 欄位不比對 alias、`title:` 不是有效欄位**——**本組全部改用 `release-group/<id>` 與 `release?release-group=<id>` 兩個端點，零次用 `query=`。**
12. ⚠ **MB 守 1 req/s（實測節流 1.2 秒）、Discogs 節流到約 1 req/3.2 秒、Apple 節流 1.45 秒，UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`**——**全程零次 503、零次 429、零次 403。**
13. ⚠ ⚠ **查日本樂手漢字名的第四條路（第 1890-B 條）在本組救回兩個名字**：
   **`api.discogs.com/artists/281506` 的 `realname` 逐字是 `河上修`（profile 逐字「Japanese double-bassist」）、`/artists/2057939` 的 `realname` 逐字是 `守 新治`／`namevariations` 含 `守新治`（profile 逐字「Japanese jazz drummer. Born March 21, 1953 in Sendai」）**
   ——**兩位都是 #6《Swiss Air》的四重奏成員，MB 的 credit 與 Discogs 的盤面都只印羅馬字**；**兩個漢字名與羅馬字讀音都對得上，不是第 1940-B 條那種「查到但錯」的污染。**

---

## 5773　⚠ 高碰撞盤名與「曲題撞他卡盤名」：**`chk-prop` 第五道（盤名撞 apex）本組 0 報，但 7 個字串下游引用必須帶掛名與年份**

**盤名側 4 個**：
1. **`1999 A.D`（#0）**——**是年號，極易被誤認成年份欄**；⚠ **無句末句點，不得寫成 `1999 A.D.`**。
2. **`Bubbles`（#9）**——**極通用；`q=`／`catno=` 查詢會撈到 `サザンオールスターズ《Tiny Bubbles》1980`（Invitation `VIH-6068`，⚠ 池中有三張サザンオールスターズ）與 Norman Connors 的同詞 7 吋。**
3. **`Origination`／`Up-To-Date`／`Counter Clockwise Trip`（#3／#15／#13）**——**三個都是通用詞組，池中 0 列、不撞 apex。**
4. **`111 Sullivan Street`（#11）**——**是門牌，極易被當成編號。**

⚠ ⚠ **曲題撞他卡盤名 3 處，全部是第 1948-B 條記的那一類（六道 dedup 全抓不到）**：
1. ⚠ ⚠ **#15《Up-To-Date》的 B 面曲題逐字是〈Chiasma〉，而池中有 `山下洋輔トリオ《Chiasma》1976`（seed）**
   ——**本層逐筆查過那張不是本盤**：**Discogs master 204939 的《Chiasma》是 1976 年德國 MPS／BASF 的錄音室盤（`DC 20 22678-6`，另有 1976 日本 `KUX-2-P`、1982 `ULS-6002-P`、1998 `POCJ-2552`），與本盤的 1975-04-28 東京實況是兩張不同的碟**；
   **本卡的行文提到〈Chiasma〉這一軌時必須講明那是隔年同名專輯主題曲的現場先行版。**
2. ⚠ ⚠ **#12《Speak To Loneliness》的末軌曲題逐字是〈Hi-nology〉，而池中有 `日野皓正《Hi-nology》1969`（seed）**
   ——**本盤那一軌是 1975 年的新錄音，照第 1948-B 條「舊曲新錄 → 收」不算合輯**；**行文必須講明那是 1969 年同名專輯主題曲的新錄。**
3. **#10《Something's Coming》的盤名本身撞《West Side Story》的知名曲題**——**而本盤那一軌逐字是 大野俊三 自己的曲、不是伯恩斯坦那首。**
⚠ **另有三個常見標準曲題出現在收件的曲目裡**：**#7 的〈'Round Midnight〉〈Moondance〉、#11 的〈God Bless The Child〉〈Without A Song〉〈Like Someone In Love〉、#4 的〈Body And Soul〉〈Blue Monk〉〈Oleo〉**——**下游引用這些詞組時一律要帶掛名。**
⚠ **盤內自撞 1 處**：**#9《Bubbles》的首軌與末軌同題〈Bubbles〉、與盤名逐字相同**——**`selfTitled` 仍取 `false`（掛名與盤名不同），但行文不得寫成「同名專輯」，提到〈Bubbles〉時要講明是哪一個版本。**
⚠ **另記一個跨收退的字串**：**#17 收件的盤名含 `Hateruma`（波照間），而 #2 退件的 A2 曲題逐字也是〈Hateruma = 波照間〉**——**兩者無關，下游若撈到那張要分得開。**

---

## 5774　交件前自跑的結果與第 315 條結算

- **`node batch-progress/c184/chk-prop.mjs b`** → 逐字「**prop-b.json：12 張、10 位**」、「**合計 12 張、10 位｜標記 0**」。
  **缺欄、曲風越界、年份離譜、非 ASCII 連字號（盤名與掛名兩道）、U+30FC 誤用、合輯例外欄位、與線上池撞卡、跨組重複，八道全部乾淨。**
  **「（報告）含日文分隔符 〜／～／＝／゠／＋」那一行本組一次都沒有出現**（**本組兩個 `・` 是 U+30FB、不在那個字元類裡；` with ` 是 ASCII**）。
  **「盤名撞 apex（掛名不同，只報不擋）」那一道 0 處。**
- ⚠ ⚠ **中途有四次 `共用目錄號` 的誤報，已修**：
  **成因與 c-183 b 第 5714 條記的逐字相同——本層在 #10《Something's Coming》的 `label` 欄裡引了同組 #12 的目錄號（`EW-7008`／`EW-8008`）當「East Wind 把 `EW-70xx` 改號成 `EW-80xx`」的說明，而 #12 的 `label` 欄又反過來引了 #10 的（`EW-7011`／`EW-8011`）**，
  **`dedup` 把四個號碼各算成兩張卡共用同一個 catno。**
  **改寫成不逐字重複對方的號碼即可（說明的內容沒有減少，改號這件事在兩張卡上都還講得完整）。**
  ⚠ ⚠ **第 5714 條那一句「`label` 欄不要逐字寫別張卡的目錄號」本層讀過了、還是踩到**——**因為本組有兩對碟的目錄號在敘述上互為說明**（#10／#12 的改號、#4／#7 的相差一號）。
  **→ 建議把那一句加強成：同組兩張碟在敘述上互相說明時，用「同組另一張 East Wind／CBS/Sony 盤」代稱，不寫號碼。**（#4／#7 兩張本層一開始就這樣寫，沒有踩到。）
- **`node batch-progress/dedup-crossbatch.mjs c184`** → 逐字「**147 批（其中 1 批讀 prop）｜卡數 5609｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 1**」
  ——⚠ **剩下那 1 筆 `共用目錄號 SOLL74002` 是 a 組兩張卡之間的（`Love Live Life《殺人十章》` ←→ `筒井康隆, 市原宏祐, 佐藤允彦《デマ》`），不是本組的，本層不動它。**
- **第 315 條結算：`prop-b.json` 12 筆 ＋ 5746 退表 7 筆 ＝ slice `g:"b"` 19 筆。✔**

⚠ ⚠ **提醒下游：本組「標記 0」的含金量與 c-183 一樣低**——**#18 那一筆真撞池（`なしくずしの死` ←→ 池中的 `Mort À Crédit`），`chk-prop` 的複合鍵與 `dedup` 的六道全部抓不到**，
**是本層讀 Discogs 的盤面全題才抓出來的**（第 611 條「`chk-prop` 標記 0 不等於沒撞卡」的第 N+1 個實例）。

---

## 5775　⚠ ⚠ 給 c-185 之後的批次與主線的清單

### 建議主線覆核的四件（都寫在上面，此處只列索引）

1. ⚠ ⚠ ⚠ **第 5766 條——第 1925-B 條的「盤面」是否含同一家廠牌對同一張母帶的其他壓片。**
   **本層判「含」並據此收了 `増尾好秋《111 Sullivan Street》`（1975 原壓的 Discogs 條目零樂手列名、1979 年同廠壓片逐名印出六人）。**
   **若主線判「只限原壓那一次壓片」，要撤這一張卡；建議主線把該條補一句，因為本線的小廠壓片 credits 轉錄完整度差異很大。**
2. ⚠ ⚠ **第 5767 條——`渡辺貞夫《Swiss Air》` 的三軌 `Written-By: Traditional`。**
   **本層照 1978 年二刷的 `Composed By: Sadao Watanabe` 交叉驗後判甲 5/5 而收；若研究層查到那三軌對得回具體的既有傳統曲目，依第 5701 條要改判退。**
3. ⚠ **第 5769 條——`titleCheck` 的第 (d) 種看不見的形狀（原壓盤面自己印錯、Discogs 忠實轉錄、MB 與再發都印對），建議加進 `CURATION-BRIEF-jp1.md` 第三節第 2 點。**
4. ⚠ **第 5749 條——`小杉武久《Catch-Wave》` 的退件**（`genres` 逐字只有 `Electronic`、零 Jazz）。
   **若主線認為 Fluxus／meta-media 系的獨奏即興與本組收的兩張自由即興二重奏應該同進同退，要翻的是本卡；代價是⑤款前半在本線失效。**

### 給 c-185…c-191 的操作提醒（十條）

1. ⚠ ⚠ **`house: Alfa` 且年份早於 1977 的，本組兩張兩張全錯，而且原壓字標都是東芝EMI 的 `Express`**（第 5748／5758 條）
   ——**アルファ・ミュージック 1969–1976 年的自製盤幾乎都掛 `Express` 發行，那一家在 jp-1 線的門內、在本線的門外。`enum/jp-2.md` 說的「1970s 只 13 張」還剩 11 張要回查，建議逐批加一句。**
2. ⚠ ⚠ **`house: Denon` 而年份在 1970 年代前半的，要看最早那一版的 `labels` 欄是 `Denon` 還是母公司 `Columbia`**（第 5750 條）
   ——**`Columbia` 不在十五家（那是 jp-1 的四大廠之一）**；**本組那一筆的 `Denon` 版逐字自稱 `Export`。本線 Denon 有 109 張。**
3. ⚠ ⚠ **`poolRecheck` 的雙向前綴比對（c-183 a 第 5677 條建議的修法）還沒進 `jp1-pool-refresh.mjs`**（第 5761 條）
   ——**本組又中一次（`坂田明トリオ` vs 池中的 `坂田明`）。掛名帶 `トリオ／カルテット／クインテット` 等後綴的，自己去掉後綴再掃一次池。**
4. ⚠ ⚠ **「聯名內含」那一道沒有把 `・`(U+30FB) 當切點**（第 5761 條）——**池中 `三上寛・古澤良治郎` 那兩列因此漏列。建議把池中九種分隔符一併當切點。**
5. ⚠ ⚠ **盤面印「外文 = 和文」雙題的碟，兩半都要拿去掃池**（第 5753 條）
   ——**本組的真撞池就是這一種（`Mort À Crédit` ↔ `なしくずしの死`），而 ALM Records「New Improvisational Music」系列的碟幾乎每一張都是雙題**；**Frasco／Union／Trio 三家同樣常見。**
6. ⚠ ⚠ **East Wind 在 1976 年把 `EW-70xx` 號段整批改號成 `EW-80xx` 再發一次**（第 5757 條）
   ——**本組兩筆都中、MB 兩筆都沒建。本線 East Wind 有 41 張，`versions` 全表不可省。**
7. ⚠ ⚠ **ALM Records 的 `AL-n`（一到兩位數）整個號段的 `catno=` 反查不可用**（第 5762 條）——**一律改 `q=<羅馬字掛名> <盤名>`；與 Denon 的 `CD-xxxx` 是同一類失效。**
8. ⚠ **`house` 是 Crown／Nippon Crown 這種 MB 只建原壓一筆的小廠時，`live: false` 一律要回 Discogs 看 `companies` 的 `Recorded At` 是場館還是錄音室、以及盤面副題有沒有「ライブ／実況／at ○○」**（第 5756 條）——**本組因此改判 1 筆。**
9. ⚠ **Discogs 的 `Written-By: Traditional` 在日本爵士盤上不可直接當「既有的非爵士曲目」採信**（第 5767 條）——**要看同一張母帶其他壓片的 credits，以及那個曲題查不查得到原曲。**
10. ⚠ **`label` 欄不要逐字寫別張卡的目錄號**（第 5774 條，**c-183 b 第 5714 條第 7 點的加強版**）——**同組兩張碟在敘述上互相說明時用「同組另一張 <廠牌> 盤」代稱。本層讀過那一條還是踩到四次。**

### 登記給主線的候選

- ⚠ ⚠ **`Express ETP-72100`（`Jun Fukamachi 21st Century Band —《Rokuyu = 六喩》`，1975）加進「非本線廠牌但確實是日本爵士盤」的候選清單**
  ——**與 c-180 的 DOMO 兩張、c-181 的美國 TBA 一張、c-183 a 的 Liberty 一張同一份。**
  ⚠ ⚠ **本筆的理由比那四張更強**：**它在 MB 上掛的是 Alfa，所以 jp-1 線那十批（切的是「MB 掛得到四大廠實體」的碟）根本沒有看到它**
  ——**這一族（1970 年代前半アルファ・ミュージック 自製、掛東芝 `Express` 發行）在兩條線之間整個掉了下去，`enum/jp-2.md` 說的 11 張 1970s Alfa 大概都是。**
- **`CBS/Sony SOCM 88`（`小杉武久 —《Catch-Wave》`，1975）**——**若第 5749 條被改判就從這裡撈回來**（原壓廠牌在十五家之內、退的純粹是曲風）。

### 給本機的（不在雲端做）

- ⚠ ⚠ **池中 `阿部薫《Mort À Crédit》1976`（seed ＋ c-67）用的是法文題，而 MB 的 RG title 是和文題 `なしくずしの死`**
  ——**若要為那張卡補 `queryAlias`，`なしくずしの死` 與 rgMbid `279439ee-e53b-4ef2-8563-0b5090af403d` 是現成的**（第 5753 條）。
- ⚠ **`desc-tools/jp-proper-names.json` 本批 append 2 個（`国吉征之`／`未来派野郎`），既有 63 個一個都沒動**（第 5765 條）。

---
