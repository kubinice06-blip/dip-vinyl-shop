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

# a 組（19 張｜slice 的 `house` 分佈：CBS/Sony 11・Trio／Whynot 4・East Wind 2・URC 1・Denon 1）｜策展層｜2026-09-25

判準照 `batch-progress/CURATION-BRIEF-jp2.md`（本線簡報）→ `CURATION-BRIEF-jp1.md`（**機制整份沿用，含「一之二」四條**）
→ `CURATION-BRIEF-bluenote-post1985.md`（含**附錄二：雲端線實測**）→ `CURATION-BRIEF-bluenote.md`
→ `CURATION-BRIEF-c131.md` → `c127` → `c126` → `c103plus` → `c93plus`，**固定規格一字未改**。
曲風判準照 **c-173 b 第 3753 條 ＋ 第 3716 條 ＋ 第 1857-B／1871-B／1861-B／1923-B／1925-B 條
＋ 主線第 1934-B／1936-B／1944-B／1948-B 條 ＋ ⚠ ⚠ c-183 b 第 5701 條（收件款第三肢的可數判準）**，命中款次逐筆寫在各條。
`batch-progress/c163/rulings-mainline.md` 第 1934-B…1952-B 條與 `c183/rulings.md` 全檔（5656–5715）已並讀。

**收 12、退 7（撞池 2 ＋ 外國藝人那一關 2 ＋ 曲目來源／演奏主體 2 ＋ 非爵士 1）｜收件率 63%**
——**明顯高於 c-183 的 26%（a）與 44%（b）**，成因單一且可歸因：**年段從 1966–70 移到 1972–76，
本組的 `house` 由 CBS/Sony 的自製爵士線（11 張）與 Trio／East Wind（6 張）主導，
c-183 那一批把收件率壓下去的 Nippon Crown ムード 線與 1960 年代歌謡曲盤本組 0 張。**

⚠ **年份改判 0 筆**、**盤名真改判 0 筆**（等價形取邊 5 筆、大小寫取邊 1 筆、異體字取邊 1 筆、判定「不是等價形」1 筆）、
⚠ ⚠ **`live` 改判 3 筆，三筆全部是 `false` → `true` 的反向漏標**（本線第一次出現這個方向，見 5726）、
**廠牌欄 19 筆逐筆以 Discogs `releases/<id>` 的 `labels` 欄為準核過，`house` 整欄錯 0 筆**（**本線第一次 0%**，見 5728）、
再發版本數 **9 筆有 master 頁的逐筆跑完整張 `versions` 清單，9/9 全部低估，平均低估率 61%、最高 86%**；**3 筆無 master 頁**、
掛名 12 張 11 個相異字串（沿用池中 10 串 ＋ 新立 5 串 ＋ 新立聯名 4 串），**新造分裂 0、新造分隔符 0、收斂 0、改釘 rgMbid 0、孤兒 release 0**。

⚠ ⚠ **本組最重要的四件系統性發現**：
1. ⚠ ⚠ **`live` 欄有一整個方向沒人在看**：**3/19（16%）的 slice `live: false` 其實是實況盤**，
   **三筆的 MB `secondary-types` 全部是空陣列、slice 的 `note` 全部空白，機器一個字都沒報**（5726）。
2. ⚠ ⚠ **`poolRecheck` 又漏了兩筆真撞池，而且兩筆各自是一種不同的失效**（5731）：
   **#2 是第 5666 條「前綴比對只做單向」的第三個實例（而且 `artistVariants` 有漢字，第 1868-B 條那一關過了還是漏）**；
   **#17 是「變體全是羅馬字」警語正確命中、靠 Discogs 藝人頁查出漢字名才抓到。**
3. ⚠ ⚠ **MB 的 `country` 欄本身會寫成「居住國」而不是國籍，第 5679 條的修法擋不住**（5732）——
   **`Sonia Rosa` 的 MB `country` 逐字 `JP`、`area` 逐字 `Japan`，只有 `begin-area` 逐字 `São Paulo`。**
4. ⚠ **c-183 第 5703 條末段那句「`meets` 沒有被立成第十種分隔符」的理由在事實上不成立**——
   **本層實掃全池，` Meets ` 本來就有三個掛名串**（5729）。

---

## 5716　（**總表**）：**19 張＝收 12 ／ 退 7**

| slice # | 掛名 —《盤名》 | 廠／原盤目錄號 | 處置 | 理由（命中條款） |
|---:|---|---|---|---|
| 0 | **Love Live Life —《殺人十章》** | **CBS/Sony SOLL-74002** | **收** | genres `Jazz`／`Rock`、styles `Free Jazz`／`Jazz-Rock`；十軌全是 市原宏祐＋神谷重徳 為本盤寫的原創器樂曲；⚠ **`poolRecheck` 標「變體全是羅馬字」，本層查完的結論是這個團名沒有漢字／假名形**，見 5731 |
| 1 | **渡辺貞夫 —《Sadao Watanabe》** | **CBS/Sony SOPL-21-XJ** | **收** | genres 逐字只有 `Jazz`、styles `Post Bop`／`Fusion`／`Modal`；九軌斯瓦希里語題、作曲欄整欄掛他一人；⚠ **同名盤（`selfTitled`），見 5725** |
| 2 | Takehiro Honda Trio —《This Is Honda》 | Trio Records PA-7005 | **退** | ⚠ ⚠ **撞池**：與池中 `本田竹曠《This Is Honda》1972`（seed）同一張碟；**`poolRecheck` 逐字報「池中查無此藝人」**，見 5717／5731 |
| 3 | 柳田ヒロ —《HIRO》 | URC URG-4017 | **退** | **收件款第三肢（十一軌是他自唱的日語歌曲、松本隆 作詞）＋ 第 1923-B 條演奏主體是主唱**；⚠ **原壓廠牌 URC 在十五家內、曲風那一關過得了**，見 5719 |
| 4 | **渡辺貞夫 Meets Inter-African Theatre Group —《Kenya Ya Africa》** | **CBS/Sony SOPL 233** | **收** | ② 成立 → 人工判 → 第 3716 條三肢過；⚠ ⚠ **`live` 改判 `true`**；⚠ **外國藝人那一關四項 3/4**，見 5726／5733 |
| 5 | **柳田ヒロ —《Hirocosmos》** | **CBS/Sony SOLL 35** | **收** | genres `Jazz`／`Rock`、styles `Jazz-Rock`／`Jazz-Funk`；**七軌全器樂、零 `Vocals` credit**——⚠ **與同組 #3 同一位藝人、相隔半年、一收一退，分界只有「器樂／自唱」**，見 5719 |
| 6 | **筒井康隆, 市原宏祐, 佐藤允彦 —《デマ》** | **CBS/Sony SOLL-28** | **收** | genres `Jazz`／`Rock`、styles 首項 `Avant-garde Jazz`；四軌是佐藤允彦 作曲的原創組曲、兩支掛名樂團逐名印在盤面；⚠ **盤名等價形取和文**，見 5725 |
| 7 | **鈴木良雄 —《フレンズ》** | **CBS/Sony SOPL-192** | **收** | genres 逐字只有 `Jazz`、styles `Modal`／`Post Bop`；五軌全是他自己寫的原創器樂曲；⚠ **盤名取和文以避開池中三張同名的《Friends》**，見 5725／5739 |
| 8 | 武満徹, 坪能克裕, 小杉武久; 篠崎史子 —《ハープの個展》 | Denon OP-7064-N | **退** | **非爵士（⑤ 前半：genres 逐字只有 `Electronic`，`Jazz` 不在陣列裡 ＋ 三軌是現代音樂的委作 ＋ 第 1923-B 條演奏主體是豎琴獨奏）**；與 c-183 第 5660 條《尺八1969》逐項同構，見 5720 |
| 9 | Cecil Taylor Unit —《Akisakila: Cecil Taylor Unit in Japan》 | Trio Records PA-3004〜5 | **退** | ⚠ ⚠ **外國藝人那一關，演奏側 0/3、第 4106 條四項 2/4**；**曲風那一關過得乾淨、原盤是全世界唯一的日本原壓**，見 5721／5733 |
| 10 | **Various Artists —《Inspiration & Power 14 Free Jazz Festival 1》** | **Trio Records PA-3006〜7** | **收** | genres 逐字只有 `Jazz`、styles `Free Jazz`／`Free Improvisation`；八組編制的音樂節實況；⚠ ⚠ **第 397 條（合輯）逐項核過不成立**，見 5735 |
| 11 | 中山千夏＋佐藤允彦 —《ふたりのひとりごと まさか夫妻の作品集》 | Trio Records 3A-1002 | **退** | **① 成立（styles 含 `Kayōkyoku`）＋ ② 成立 ＋ 收件款第三肢（十二軌是自寫的日語歌曲）＋ 第 1925-B 條（盤面 `extraartists` 整欄是空的）**，見 5722 |
| 12 | **山本邦山 & Chris Hinze —《去来 Kyorai》** | **CBS/Sony SOCO 103** | **收** | ② 成立 → 人工判 → 三肢過；⚠ **外國藝人那一關四項 3/4**；⚠ **「邦楽器とジャズ・フルートのスーパー・セッション3部作」第一張**，見 5733／5736 |
| 13 | **渡辺貞夫 —《Mbali Africa》** | **CBS/Sony SOPW 27～28** | **收** | genres 逐字只有 `Jazz`、styles `Jazz-Funk`／`Modal`；十三軌 `Written-By` 整欄掛他一人、九人全明星全是日本樂手；⚠ ⚠ **`live` 改判 `true`**，見 5726 |
| 14 | Sonia Rosa & Yuji Ohno —《Spiced With Brazil》 | **Sony YFSC-21** | **退** | ⚠ ⚠ **外國藝人那一關，第 4106 條四項 2/4**（領銜與作曲兩項全在外國側）；⚠ ⚠ **本筆同時是 MB `country` 欄新失效形態的實例**，見 5723／5732 |
| 15 | **Chris Hinze, 沢井忠夫, 山本邦山 —《怪顚》** | **CBS/Sony SOCO 104** | **收** | genres 逐字只有 `Jazz`、⚠ **styles 空陣列 → 照第 1936-B 條不套主線 (2) 款**；八軌逐軌作曲欄都是三位演奏者本人；⚠ ⚠ **盤名異體字取 Discogs 盤面形**，見 5725／5740 |
| 16 | **笠井紀美子 & Oliver Nelson —《In Person》** | **CBS/Sony SOPM 73** | **收** | genres 逐字只有 `Jazz`、styles `Soul-Jazz`／`Cool Jazz`；⚠ ⚠ **`SOPM-` 號段逐筆跑完版本表、七版全部是日本盤**（第 5715 條第 1 點的實地執行）；⚠ ⚠ **`live` 改判 `true`**，見 5726／5728 |
| 17 | Kousuke Mine —《Out Of Chaos》 | East Wind EW-7003 | **退** | ⚠ ⚠ **撞池**：與池中 `峰厚介《Out Of Chaos》1974`（seed ＋ c132 兩列）同一張碟；**靠 Discogs 藝人頁查出漢字名才抓到**，見 5718／5731 |
| 18 | **益田幹夫 —《Trace》** | **East Wind EW-7004** | **收** | genres 逐字只有 `Jazz`、styles `Post Bop`；六軌原創（益田 4 ＋ 日野皓正 2）；⚠ **本組唯一一筆 Apple 日期可當佐證的碟**，見 5724 |

**第 315 條結算：`prop-a.json` 12 筆 ＋ 本表退件 7 筆 ＝ slice `g:"a"` 19 筆。✔**

---

## 退件的裁定（5717–5723）

## 5717　⚠ ⚠ 退：`Takehiro Honda Trio —《This Is Honda》`（rg 1823a1c4）——**撞池；`poolRecheck` 逐字報「池中查無此藝人」，而這是第 5666 條「前綴比對只做單向」的第三個實例**

slice #2、**Trio Records PA-7005**、1972、6 軌、`poolRecheck.status` 逐字「**池中查無此藝人**（等值＋前綴＋聯名內含三道，比對日 2026-09-25、池 22277 列／131 批卡單）」、
`artistVariants` 逐字三個字串（`Takehiro Honda Trio`／**`本田竹曠トリオ`**／`Honda, Takehiro, Trio`）。

**本層的比對**：
- **MB**：RG title 逐字 `This Is Honda`、first-release-date `1972`、**artist-credit 逐字 `Takehiro Honda Trio`，而 MB 實體本名逐字是 `本田竹曠トリオ`（Group `19d0f709`、country JP、tags `jazz(1)`）**；轄下 2 個 release，1972 那筆的 `disambiguation` 逐字是 `first press`。
- **Discogs master 378831 ＝ `Takehiro Honda Trio —《This Is Honda》`、`Trio Records PA-7005`、1972、Japan、genres `Jazz`、styles `Post Bop`**；
  releases/2707376 的 notes 逐字「Recorded on April 18, 1972 at Iino Hall.」「発売元 ・トリオ株式会社」「¥2,300」，
  **credits 逐字三筆：`Bass — Yoshio Suzuki`（鈴木良雄）、`Drums — Fumio Watanabe`（渡辺文男）、`Engineer — Okihiko Sugano`**，
  六軌逐字〈You Don't Know What Love Is〉〈Bye Bye Blackbird〉〈Round About Midnight〉〈Softly As In Morning Sunrise〉〈When Sunny Gets Blue〉〈Secret Love〉。
- **池中逐字一列**：**`seed｜本田竹曠｜This Is Honda｜1972`**。**同盤名、同年、同一張碟 → 撞池。**

→ **退（撞池）。不補別張**（jp-1 簡報第二節第 2 點）。

### ⚠ ⚠ 這一筆為什麼機器又全部放行

1. **`poolRecheck` 抓不到**：**slice 的掛名是「本名 ＋ 編制字串」（`本田竹曠トリオ`），池中掛的是「本名」（`本田竹曠`）**
   ——**第 5666 條逐字寫過：「前綴比對逐字說明是『池中的 `本名＋トリオ／カルテット／セクステット` 現在會被列出來』，它只做了『池中有編制字串、slice 是本名』這一個方向；本筆是反過來的」**。
   ⚠ ⚠ **本筆是那個單向缺口的第三個實例（c-183 的 #10 是第一個、本組的這一筆是第二個形狀更乾淨的一個）**，
   **而且它比 c-183 那一筆更該被抓到：盤名逐字完全相同、年份逐字相同、只差掛名尾部三個片假名。**
   ⚠ ⚠ **更要記的一點：本筆的 `artistVariants` 裡有漢字（`本田竹曠トリオ`）**——**也就是說第 1868-B 條那一關（「沒有漢字／假名字串就當沒查過」）在本筆是過的、警語沒有發**，
   **失效純粹來自前綴比對的單向性。→ 第 1868-B 條的警語與第 5666 條的單向缺口是兩件獨立的事，過了前者不代表過了後者。**
2. **`chk-prop` 抓不到**：鍵是 `正規化(掛名)|正規化(盤名)`，**`takehirohondatrio|thisishonda` 與 `本田竹曠|thisishonda` 在任何正規化下都不相等**（掛名跨了文字系統）。
3. **`dedup-crossbatch` 六道同樣抓不到**，理由同上。
4. ⚠ ⚠ **最該記的一件**：**c-183 第 5703 條 (1) 逐字寫著「池中 13 列裡 12 列是 `本田竹広`、1 列是 `本田竹曠`（seed《This Is Honda》1972）」**
   ——**也就是說上一批的策展層已經把「這張碟在池中」這件事逐字寫進裁定了，而本批的 slice 仍然把它切進來。**
   **→ 給主線：`jp1-pool-refresh.mjs` 的修法（第 5677 條已寫）之外，還可以加一道零成本的：把上一批 `rulings.md` 裡逐字出現過的「池中 N 列」清單餵回切批腳本。**

⚠ **本層抓到它的路徑**：**以盤名 `This Is Honda` 為主鍵掃全池**（c-183 第 5685 條第 3 點逐字要求的固定動作：「Union／Trio／East Wind／Frasco 這幾家的每一筆，都要以盤名為主鍵掃一次全池」）——**本筆的 `house` 正是 Trio。該條在本批第一次救到卡。**
⚠ **掛名側順帶記**：**MB 實體用 `曠`、而池中另外 12 列用 `広`**（`本田竹広`／`本田竹曠` 的異體字分裂，c-183 第 5703 條 (1) 已記，**留給本機統一，本層不新造第三種**）。
⚠ **再發版本數併記**（退件不入卡，仍記下，下一線若把它撈回來才不會重跑）：**Discogs master 378831 的 `versions` 全表逐筆跑完共 14 版**
——1972 `PA-7005` 五筆（一筆 Promo ＋ 四筆市售）、1980 `PAP-9239`、1985 `Art Union ART 01 CD-2`、1994 `Venus TKCZ-79075`、2003 `Absord ABCJ-272`、2012 `Solid CDSOL-1484`、2020 `Ultra-Vybe UVWA-0043`、**2026 `Ultra-Vybe UVWA-4013`**、`released` 為 0 的 `PA-9750` 與一筆無廠牌的 AAC 數位版；**MB 建了 2 筆。**
⚠ **年份與廠牌都沒有問題**（Trio Records PA-7005、1972，MB 與 Discogs 三處相符）；**退的純粹是撞池。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」直接定。）

---

## 5718　⚠ ⚠ 退：`Kousuke Mine —《Out Of Chaos》`（rg 4734c89a）——**撞池；「變體全是羅馬字」那個警語這一次是對的，而且是靠 Discogs 藝人頁的第四條路救到的**

slice #17、**East Wind EW-7003**、1974、3 軌、
`poolRecheck.status` 逐字「⚠ ⚠ **變體全是羅馬字，等於沒查過**——務必自己查出漢字名再掃一次池（第 1868-B 條）」、
`artistVariants` 逐字只有兩個字串（`Kousuke Mine`／`Mine, Kousuke`，**兩個都是羅馬字**）、
slice `note` 逐字「⚠ MB 藝人實體無 country、別名全羅馬字——本土／外國要人工判」。

**本層逐條查完的結果**：
- **漢字名 ＝ `峰厚介`**。**來源是第 1890-B 條列的第四條路**：**`api.discogs.com/artists/1145518` 的 `realname` 逐字「峰厚介 (Mine Kosuke）」、`namevariations` 逐字十一個（含 `峰厚介`／`峰 厚介`／`峰　厚介`／`Kousuke Mine`／`Kosuke Mine`／`Kohske Mine`／`Kōsuke Mine`／`Косуке Мине`）**。
  ⚠ **漢字與羅馬字的讀音對得上（みね こうすけ ↔ Mine Kosuke），不是第 1940-B 條第二點記的那種「藝人頁被污染」的形狀。**
- **獨立佐證**：**Discogs 上 2015 年那次 CD 復刻（releases/7239617、`UCCJ-9133`）的題逐字就是「Kohsuke Mine = 峰 厚介 —《Out Of Chaos = アウト・オブ・ケイオス》」**——**同一筆條目把羅馬字與漢字寫成等價對。**
- **本土／外國的人工判：本土（日本人）。** **Discogs 藝人頁 profile 逐字「Japanese jazz and jazz-fusion saxophonist. Born on February 6, 1944 in Tokyo.」**
  ——**派工信第二節 (4) 預告的「`Kousuke Mine`＝峰厚介 是日本人（只是掛名寫成羅馬字）」逐字得到證實**（**MB 實體 `dac4fb4e` 逐字無 country，靠 Discogs 定案**）。
- **Discogs master 701323 ＝ `Kohsuke Mine —《Out Of Chaos》`、`East Wind EW-7003`、1974、Japan**（`catno=EW-7003` 反查回 4 筆，master ＋ 三筆 release）。
- **池中逐字兩列**：**`seed｜峰厚介｜Out Of Chaos｜1974`** 與 **`c132｜峰厚介｜Out Of Chaos｜1974`**。**同盤名、同年、同廠、同一張碟 → 撞池。**

→ **退（撞池）。不補別張。**

⚠ ⚠ **這一筆與 5717 是兩種不同的失效，要分開記**：
**5717 是「警語沒發、前綴比對單向」；本筆是「警語發了而且是對的」**——
**第 1868-B 條那一關在本筆正常運作，救卡靠的是本層照它的要求去查漢字名。**
⚠ ⚠ **而 c-183 第 5706 條 (3) 記的「這個警語對外國藝人是誤報」在本筆不適用**——
**該條的修法建議是「發警語前先看 MB 實體的 `area`／`country`，非 JP 的不發」；本筆的 MB 實體逐字 `無 country`**，
**照那個修法會落到「查不到國籍 → 仍然發警語」，結果是對的。→ 那個修法要寫成「`country` 明確是非 JP 的才不發」，不能寫成「非 JP 的不發」（把 null 也算進去會漏掉本筆這種）。**
⚠ **順帶記一個掛名側的形狀**：**MB 有兩個他的實體**——**本 RG 掛的是 `Kousuke Mine`（`dac4fb4e`、無 country、無漢字別名）**，
**而 `enum/jp-2.md`「已知瑕疵」那一節逐字記著「MB 重複 RG：峰厚介《Out of Chaos》(East Wind)」**
——**兩件事合起來是「同一位藝人在 MB 上有兩個實體、同一張碟有兩個 RG」**，**退件不入池，但這個形狀要記給後面批次（East Wind 還有 b 組四張與後續批次）。**
⚠ **池中 `峰厚介` 共 10 列**（`峰厚介クインテット《Mine》1970`、`《2nd Album》1971`、`《Daguri》1973`、**`《First》1970` `apex:pearl`**、`《Out Of Chaos》1974`、`《Sunshower》1976`、`《Bamboo Grove》2019` ＋ c132 三列）
——⚠ **本筆撞的是 seed 的普卡、不是那張 `apex:pearl`**（**與 c-183 第 5666 條撞 apex 的那一筆不同形**）。
⚠ **再發版本數併記**：`catno=EW-7003` 反查回 master 701323 ＋ 三筆 release（1974 兩筆、2015 一筆）；**MB 建了 2 筆。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條直接定。）

---

## 5719　⚠ ⚠ 退：`柳田ヒロ —《HIRO》`（rg 56f36ed6）——**收件款第三肢 ＋ 第 1923-B 條演奏主體；⚠ 與同組收件的 #5《Hirocosmos》同一位藝人、相隔半年，分界只有「器樂／自唱」**

slice #3、**URC URG-4017**、1972-11-25、11 軌、⚠ **本組唯一一筆 `why` 欄不是空字串的（逐字 `rg-tag`）**、
`poolRecheck.status` 逐字「池中查無此藝人」（本層重掃：`柳田ヒロ`／`柳田博義`／`Hiro Yanagida`／`Yanagida` 四種寫法全池 **0 列**，**該格正確**）。

**先把往「收」的一邊寫足，因為本盤的機器訊號與原壓廠牌兩關都過得了**：
1. ⚠ ⚠ **原壓廠牌是 URC，在本線十五家之內**——**Discogs releases/4589934 的 labels 欄逐字只有一筆「URC — URG-4017」**，
   companies 逐字「Recorded At: Mouri Studio」「Phonographic Copyright (p): Art Ongaku Shuppan」；
   **這不是 c-183 第 5668 條那張《Milk Time》的形狀**（那一張的 slice `house` 是 Alfa、原壓其實是 Liberty）。
2. **Discogs genres 逐字 `Jazz`／`Rock`、styles 逐字 `Prog Rock`／`Jazz-Rock`／`Psychedelic Rock`**
   ——**`Jazz-Rock` 在爵士側，①②⑤ 與主線第 1934-B 條 (2) 款按字面全部不成立**；
   ⚠ **而且 c-183 第 5668 條對同一位藝人的《Milk Time》逐字判過「曲風那一關過得了」，styles 三項一字不差。照先例，本盤的曲風那一關也過。**
3. ⚠ ⚠ **伴奏陣容是本組最強的一份，而且逐名印在盤面上**：**宮沢昭（長笛）、市原宏祐 與 村岡健（薩克斯）、伏見哲夫・野村毅・鈴木武久・宮下明（四支小號）、山下晴生・中沢忠孝（兩支長號）、
   杉本喜代志・高中正義・矢島賢・松木恒彦（四把電吉他）、石川晶（鼓）、竹部秀明・寺田正典（電貝斯）、戸叶京介・ラリー寿永・川原直美（三位打擊）**——**一整個爵士銅管組加雙鼓雙貝斯。**
4. **十一軌全部是他自己作曲編曲**（`Music By, Arranged By — Hiro Yanagida`）。

**往「退」的一邊，有兩項，而且兩項互相獨立**：
1. ⚠ ⚠ **收件款第三肢失敗**：**盤面逐字掛著 `Lyrics By — Takashi Matsumoto`（松本隆）、而 `extraartists` 裡他自己的 credit 逐字是 `Vocals, Electric Piano, Organ, Piano, Music Director — Hiro Yanagida`——`Vocals` 排在第一位**；
   **十一軌是他自唱的日語歌曲**（〈Nothing〉〈海のサンバ〉〈風が焦げる匂いがするだろう〉〈Cloudy Morning〉〈きみの町を通ったよ〉〈乱れ髪〉〈ねえ静かだね〉〈おそろしいほどあおいそら〉〈神がまどろむとき〉〈何がそんなに愉快なの〉〈End〉）。
   **依 c-182 b 第 5197 條引第 4410 條逐字「自寫的流行歌不算這一肢的『原創曲』」**——**甲 0、乙 0、十一軌兩邊都不算 → 第三肢敗。**
2. ⚠ ⚠ **第 1923-B／1925-B 條：演奏主體是主唱。** **第 1923-B 條逐字「『伴奏名單很強』不是收件款的任何一肢……本線已經三次有人拿它當收件理由，三次都不成立」**，
   **最極端的先例是 `Hi‐Fi Set《1&2》`（佐藤允彦 一手四角、節奏組四位池中爵士樂手，仍然退）。本盤的伴奏陣容更強，但那一肢不存在。**

→ **兩肢皆敗，退。**

### ⚠ ⚠ 分界寫死：**同一位藝人、相隔半年、一收一退，差別只有 `Vocals` 那一個 credit**

| | **#3《HIRO》1972-11（退）** | **#5《Hirocosmos》1973（收）** |
|---|---|---|
| 廠／目錄號 | URC URG-4017 | CBS/Sony SOLL 35 |
| 軌數 | 11 | 7 |
| 曲題 | **十一軌裡九軌是日語題** | **七軌全部是英文器樂題** |
| `Vocals` credit | ⚠ ⚠ **有，而且排在他自己 credit 的第一位** | ⚠ ⚠ **整欄零個** |
| 作詞者 | ⚠ **松本隆** | **無** |
| Discogs styles | `Prog Rock`／`Jazz-Rock`／`Psychedelic Rock`（3 項裡 1 項爵士） | `Jazz-Rock`／`Jazz-Funk`（**2 項全爵士**） |
| MB RG `jazz` 票數 | `jazz(1)` | ⚠ **`jazz(2)`** |

**→ 這正是 c-183 第 5694 條對 `深町純《ある若者の肖像》` 畫的那一條線，該條逐字寫著分界是「フォーク／ロック 出身的人做的**器樂**爵士概念盤」（c-182 a 收的 `加藤和彦《Maltese Falcon》`）。**
**本組把它落在同一位藝人的兩張碟上，形狀比 5694 更乾淨：那一條是拿兩個不同的人比，本組是同一個人、同一年段、同一組班底裡的一半人。**
⚠ **並記一件對本線有用的**：**c-183 第 5668 條退掉的《Milk Time》(1970) 的曲風那一關過得了、退在原壓廠牌**；
**本筆的原壓廠牌過得了、退在曲目與演奏主體**；**#5 兩關都過。→ 柳田ヒロ 的三張 1970–73 年碟在本線各自踩到不同的關，三張只收一張。**
⚠ ⚠ **年份併記（退件也要記，第 1934-B 條六節的要求）**：**MB first-release-date 與 MB release date 逐字都是 `1972-11-25`、Discogs 原壓 `released: 1972-11-25`、Apple jp（`1718497533`、℗ 逐字 `1972 URC Records`）逐字也是 `1972-11-25`——四處逐日相符**；
⚠ ⚠ **而 ja.wikipedia「柳田ヒロ」條目的ソロ・アルバム 表逐字寫「1972年9月」**——**與四個來源差兩個月，本層判 ja.wikipedia 那一格的月份不可信**（**第 1941-B 條第一點「二次轉錄的欄位要回打第一手」的同一種形狀，本線第二次命中，另一次是本組 #5**）。
⚠ **再發版本數併記**：**Discogs master 558543 的 `versions` 全表逐筆跑完共 6 版**（1972 `URG-4017` 原壓、1989 `Kitty Records H20K25016`（⚠ **題逐字是 `Hiro+1`，多一軌**）、1995 `URC TOCT-9297`、2017 `Greenwood Records GRCL-6071`（⚠ **12 軌，多了〈エマージェンシー〉**）、2017 `URC PCTA-00287`、2017 `Pony Canyon PCJA-00072` LP）；**MB 建了 2 筆、低估 4 版（67%）。**
⚠ ⚠ **另記一個給下一線的坑**：**2017 年 `Pony Canyon PCJA-00072`（`URCアナログ復刻シリーズ`）那一筆的 Discogs genres 逐字被寫成 `Folk, World, & Country`、styles 空陣列**
——**同一張碟的原壓是 `Jazz`／`Rock`，一次復刻就把桶換掉了**；**若後續批次只打到那一筆，② 款會憑空成立。→ 曲風一律讀原壓那一筆的 genres／styles。**
（可逆性：收退名單，卡單值——照裁定權下放第 1 條「有先例」與第 2 條「可逆」直接定；**本筆與 #11 兩張列為建議主線覆核的退件，見 5745。**）

---

## 5720　退：`武満徹, 坪能克裕, 小杉武久; 篠崎史子 —《ハープの個展》`（rg 0060e5ed）——**⑤ 款前半：genres 逐字只有 `Electronic`；與 c-183 第 5660 條《尺八1969》逐項同構**

slice #8、**Denon OP-7064-N**、1973、**MB 記 3 軌**。

**MB 層**：RG tags／genres 兩欄逐字 `electronic(1)`／`experimental(1)`／`modern classical(1)`——⚠ ⚠ **三個並列、零個 `jazz`**
（**與 c-183 第 5660 條那張逐字同形：該條寫「MB 連 `jazz` 的字樣都沒有」**）；
artist-credit 逐字四個 Person 實體 `武満徹`(`4e871dff`) ＋ `, ` ＋ `坪能克裕`(`c93385fa`) ＋ `, ` ＋ `小杉武久`(`618bd6a5`) ＋ **`; `** ＋ `篠崎史子`(`48cf01ab`)，四位 country 全部 JP。

**Discogs releases/9890375（1973 原壓 LP、`master_id` 998918）逐字**：
**盤面全題「ハープの個展 = Music Now for Harp」**；⚠ ⚠ **genres 逐字只有 `Electronic`——`Jazz` 不在陣列裡**；
styles 逐字 `Modern Classical`／`Experimental`；labels 逐字「Denon — OP-7064-N」；
companies 逐字「Made By: Nippon Columbia Co., Ltd.」「Recorded At: Nippon Columbia Co., Ltd.」；notes 逐字「First edition.」；
**三軌逐軌帶作曲欄**：**〈スタンザII = Stanza Ⅱ〉（Composed By: Toru Takemitsu）／〈リンの詩 = Poem Of Lin〉（Katsuhiro Tsubonou）／〈ヘテロダイン = Heterodyne〉（Takehisa Kosugi）**；
**credits 逐字只有兩位演奏者：`Harp — Ayako Shinozaki`（篠崎史子）與 `Violin — Takehisa Kosugi`（小杉武久）**，製作 川口義晴、解說 船山隆。
⚠ **1990 年那筆 CD（releases/7538542、`COCO-6278`）的 genres 逐字是 `Electronic`／**`Non-Music`**／`Classical`**——**⑤ 款點名的 `Non-Music` 在再發那一筆上逐字出現。**

**退件依據三項**：
1. ⚠ ⚠ **⑤ 款前半成立（決定性）**——**原壓的 `genres` 不含 Jazz，收件款第一肢直接失敗**；**再發那一筆還逐字含 `Non-Music`。**
2. **收件款第三肢失敗**——**三軌是三位現代音樂作曲家的委作**（**照第 1944-B 條把射程推廣為「任何既有的非爵士曲目」的同一條線：委作的現代音樂作品既不是爵士標準曲、也不是爵士原創曲**）。
3. **第 1923-B／1925-B 條演奏主體 ✘**——**盤面的演奏者只有豎琴獨奏 ＋ 一把小提琴，不是爵士編制。**

→ **退。** ⚠ **原壓廠牌 `Denon` 在本線十五家之內、年份與盤名都沒有問題**（MB 與 Discogs 三處相符）——**退的純粹是曲風與演奏主體。**
⚠ ⚠ **這一筆是簡報第三節第 6 點逐字警告的形狀的實例**：「**Denon 的 1026 筆 release 大半是古典，`DENON JAZZ` 實體只有 18 筆——本線 Denon 那 109 張的曲風要特別小心**」。
**本組的 Denon 只有這一張，而它是現代音樂。→ 後面批次的 Denon 一律先讀 Discogs 原壓的 `genres` 有沒有 `Jazz`，那一欄在本筆是單項、判得掉。**
⚠ **`Denon` 的 catno 反查在本筆沒有踩到第 5715 條第 3 點那個坑**——**該條說的是 1970 年代的 `CD-xxxx` 號段（CD＝Columbia Denon）在 Discogs 上完全查不動；本盤的號段是 `OP-`，`q=篠崎史子 ハープの個展` 一次就回到 master。**
⚠ **池中逐筆掃過、不撞池**：`武満徹` 3 列（**seed《Ran》1985 `apex:hall`** ＋ seed／c88《Film Music by Toru Takemitsu - Volume 1》1990）、`小杉武久` 1 列（c-176 的 `Steve Lacy, 高橋悠治, 小杉武久《Distant Voices》1976`）、`坪能克裕` 0 列、`篠崎史子` 0 列（⚠ **`篠崎` 另回 c-182 的 `篠崎正嗣《Water & Violin》1989`——是另一個人**）、盤名側 `ハープ` 0 列。**本批不入池。**
⚠ **再發版本數併記**：**Discogs master 998918 的 `versions` 全表逐筆跑完共 5 版**（1973 `OP-7064-N` 原壓、1980 `Denon OW-7845-ND` LP 再發、1990 `Denon COCO-6278` CD、**2023 法國 `Wewantsounds WWSLP 76` LP ＋ `WWSCD 76` CD 兩筆**）；**MB 建了 2 筆、低估 3 版（60%）。**
⚠ ⚠ **那兩筆 2023 年的法國復刻值得記給下一線**：**Wewantsounds 這幾年在挖日本的現代音樂與環境音樂，本盤被當成那一條線的碟在賣**——**若主線日後另開「日本現代音樂／環境音樂」一線，本盤是清單上的一張。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」（c-183 第 5660 條）直接定。）

---

## 5721　⚠ ⚠ 退：`Cecil Taylor Unit —《Akisakila: Cecil Taylor Unit in Japan》`（rg 35d2b106）——**外國藝人那一關，四項 2/4、演奏側 0/3；本線第一次退掉一張「日本廠牌自製、全世界唯一原盤」的自由爵士名盤**

slice #9、**Trio Records PA-3004〜5**（兩片裝）、1973、4 軌、slice `live` 逐字 `true`、slice `note` 逐字 `Live`、
`poolRecheck.status` 逐字「池中查無此藝人」（**本層重掃：`Cecil Taylor` 池中 15 列（含 seed 的《Unit Structures》1966 `apex:heresy`），但 `Cecil Taylor Unit`／`セシル・テイラー・ユニット` 兩種寫法 0 列、盤名 `Akisakila` 0 列——不撞池，該格的結論方向正確**）。

**曲風那一關過得又乾淨又漂亮**：**Discogs releases/1202145 的 genres 逐字只有 `Jazz`、styles 逐字 `Free Jazz`／`Avantgarde`**；MB 的 RG tags／genres 兩欄逐字 `free jazz(1)`／`jazz(1)`——**零個非爵士標籤。**
**原壓也確實是日本盤而且是全世界唯一的原盤**：labels 逐字「Trio Records — PA-3004〜5」，
companies 逐字六筆「Manufactured By: Trio Records」「Published By: Tane Publishing Co.」「Recorded At: Koseinenkin Kaikan」「Made By: Trio Electronics, Inc.」「Lacquer Cut At: Victor Company Of Japan, Ltd.」「Pressed By: Victor Company Of Japan, Ltd.」；
notes 逐字「Recorded on 22 May 1973 at Koseinenkin Dai-Hall, Tokyo, Japan.」「Gatefold sleeve. Issued with four-page fold-out liner notes insert and 36\"x24\" poster.」「発売元 ・ トリオ株式会社」「Record is pressed on translucent vinyl compound. Along with the credits indicates this is a JVC Super Vinyl pressing」；
**四軌逐字是〈Bulu Akisakila Kutala 1〜4 = ブル・アキサキラ・クターラ 1〜4〉，兩片各兩面一整段。**

**退件依據只有一項，但它是硬的——第 4106 條四項 2/4**：

| 第 4106 條四項 | 本盤 |
|---|---|
| 領銜掛名 | ⚠ **外**——`Cecil Taylor Unit`（MB Group `89efd371`、**無 country**；Discogs 逐字 `The Cecil Taylor Unit`） |
| 作曲 | ⚠ **外**——四軌是 Cecil Taylor 的組曲 |
| 企劃 | **日**——Trio Records 自製，錄音 荒井邦夫、助理 長尾成久 與 斉藤正、設計 前島民雄 與 坂井敏夫 |
| 原盤發行 | **日**——Trio Records `PA-3004〜5`，**全世界唯一的原盤**（最早的他國版是 1992 年德國 Konnex 的兩張 CD） |

**演奏側 0/3**：**Cecil Taylor（鋼琴）、`Alto Saxophone — Jimmy Lyons (2)`、`Drums — Andrew Cyrille`——三位全部是美國人，零位日本樂手。**

→ **退。** ⚠ **這一筆與 c-183 第 5691 條退掉的 `Circle —《Circle 2: Gathering》` 逐項同構**（該條逐字：「外國藝人那一關，演奏側 0/4；**本筆的原壓確實是日本盤，退的純粹是身分**」），
**也與第 5661 條的 `Miles Davis《Miles in Tokyo》`（演奏側 0/5）同一族**；**照 c-183 第 5685 條定的門檻（四項 ≥ 3/4）退。**
⚠ ⚠ **本層知道這是本組最容易被翻的退件之一，所以把反面寫足**：
1. **它是日本自由爵士史上被引用最多的錄音之一，Discogs 上 13 版、1986／1992／1995／1996／1999／2002／2006／2020 八次復刻**；
2. **原盤是 Trio 自己企劃、自己錄、自己壓（連刻片與壓片都在 JVC），不是授權壓片**；
3. **1992 年德國 Konnex 那兩張 CD 逐字把它拆成 `Vol.:1` 與 `Vol.:2` 兩筆——連歐洲都是從日本原盤回頭引進的。**
**四項都指向「這是 Trio 的碟」。本層仍然退，理由只有一條：第 4106 條四項問的是「這張碟是誰的碟」，而領銜與作曲兩項全在外國側，演奏側 0/3。**
⚠ ⚠ **本層照 c-183 第 5680 條末段的做法，把它登記進 c-174 a 第 3787 條那份「外國藝人在日本錄的本土企劃盤」清單**：
**`Trio Records PA-3004〜5`（`Cecil Taylor Unit《Akisakila》`，1973，⚠ 全世界唯一原盤、13 版）**
——**與 c-183 第 5715 條登記的 `CBS/Sony SOPL-20-XJ`（Circle）是同一個理由、同一種強度**；
**若主線決定為這一族另立一線，這兩張是清單上最強的兩個理由。**
⚠ **`live` 欄維持 `true`（slice 正確）**：**三項齊備**——companies 逐字有場館（Koseinenkin Kaikan）＋ notes 逐字給單一場次日期（1973-05-22）＋ **盤名本身逐字帶 `in Japan`**；MB 的 `secondary-types` 逐字 `["Live"]`。
⚠ **年份、盤名、廠牌三項都沒有問題**：MB first-release-date `1973`、Discogs 原壓 `released: 1973`、`versions` 全表最早一版 1973；`titleCheck` 三欄一致、`note` 空白。
⚠ **盤名側併記一個等價形**：**盤面全題逐字是「Akisakila - Cecil Taylor Unit In Japan = アキサキラ - セシル・テイラー・ユニット・イン・ジャパン」**——**退件不入卡，若下一線把它撈回來，這個等價對要照 jp-1 簡報第三節第 2 點取一邊。**
⚠ **再發版本數併記**：**Discogs master 133796 的 `versions` 全表逐筆跑完共 13 版**（1973 `PA-3004〜5` 三筆＋一筆 Promo、1986 `Break Time BRJ-5001~2`、1992 德國 `Konnex KCD 5039`／`KCD 5040`、1995 `Venus TKCZ-79519`、1996 `Venus TKCZ-79527`（⚠ **題逐字換成 `Akisakila Part II`**）兩筆、1999 `Absord ABCJ-30/31`、2002 `PJL MTCJ-2533-34`、2006 `Absord ABCJ-379~380`、2020 `Octave Lab OTLCD2489`）；**MB 建了 3 筆、低估 10 版（77%）。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」（c-183 第 5691／5661 條）直接定。）

---

## 5722　退：`中山千夏＋佐藤允彦 —《ふたりのひとりごと まさか夫妻の作品集》`（rg c2ec1ec4）——**① ＋ ② 兩款成立 ＋ 三肢二敗；⚠ 退的是池中已有 22 列的一位爵士鋼琴手參與的碟**

slice #11、**Trio Records 3A-1002**、1973、12 軌。

**MB 層**：RG tags／genres 兩欄逐字 `folk(1)`／`jazz(1)`／`jazz rock(1)`／**`kayōkyoku(1)`**／`pop(1)`／`rock(1)`
——⚠ ⚠ **六項並列、count 全是 1、其中四項是非爵士**（**c-183 第 5676 條第 2 點記的那個可操作訊號：「RG tags 裡出現任何一個非爵士標籤，本線的退件率是 6/7＝86%」——本筆是第七、第八個非爵士標籤同時在場**）；
artist-credit 逐字兩個 Person 實體 `中山千夏`(`fa4aa601`、country JP) ＋ **joinphrase 逐字 `＋`（U+FF0B 全形加號）** ＋ `佐藤允彦`(`04bbec22`、country JP)。

**Discogs releases/13782614（1973 原壓 LP Album Stereo、Textured Gatefold ＋ 帶(obi)、`master_id` 1568721）逐字**：
**盤面全題逐字是「ふたりのひとりごと まさか夫妻の作品集」**（⚠ **MB 的 RG title 與 release title 兩層都只取了前半 `ふたりのひとりごと`，副題整段掉了**）；
⚠ ⚠ **genres 逐字五項 `Jazz`／`Rock`／`Funk / Soul`／`Pop`／**`Folk, World, & Country`****；
⚠ ⚠ **styles 逐字三項 `Kayōkyoku`／`Jazz-Rock`／`Folk`**；labels 逐字「Trio Records — 3A-1002」；notes 逐字「Incl.12tracks.」「Textured Gatefold Cover With Obi.」；
⚠ ⚠ **`extraartists` 整欄是空的——盤面零個樂手 credit**；
**十二軌逐字是〈朝〉〈こげな町には〉〈鳩〉〈手紙がこなくなって〉〈白猫〉〈たんぽぽよ〉〈指輪〉〈夕方が嫌いなのは〉〈望遠鏡〉〈青い鏡の中で〉〈エレベーター〉〈ざんぶり日暮れた〉——十二軌全部是日語題的歌もの。**

**退件依據四項**：
1. **① 款成立 → 進人工判**——**styles 逐字含 `Kayōkyoku`。**
2. **② 款成立 → 進人工判**——**genres 逐字含 `Folk, World, & Country`。**
3. ⚠ ⚠ **收件款第三肢失敗（決定性之一）**——**盤面副題逐字就是「まさか夫妻の**作品集**」**，**十二軌是 中山千夏（女演員兼歌手）唱、佐藤允彦 寫的日語歌曲**；
   **依 c-182 b 第 5197 條引第 4410 條「自寫的流行歌不算這一肢的『原創曲』」——甲 0、乙 0，第三肢敗**（**與同組 #3《HIRO》逐項同構**）。
4. ⚠ ⚠ **第 1925-B 條失敗（決定性之二）**——**`extraartists` 整欄是空的，盤面連一位樂手的名字都沒有列**。
   **這與 c-183 第 5657／5658 條那兩張（`朝丘雪路`／`ホキ徳田`，盤面 credits 只有一位演唱者與一個匿名伴奏團名）逐項同構**，
   **也與 c-180 退掉的 `麻生小百合《キャンディ・ジャズ》`（「伴奏是 Mariah 三人＋土岐英史＋伊東たけし，但盤面 credits 一個樂手都沒列 → 退」）是同一條線。**
   ⚠ ⚠ **本筆更嚴格：連「伴奏陣容很強」這個（不成立的）收件理由都無從主張——本層在任何來源上都沒有查到伴奏名單。**

→ **四項成立，退。**

⚠ ⚠ **退的是這張碟、不是這個人**：**佐藤允彦 池中已有 22 列**（seed 7 ＋ c121 ＋ c132 五張 ＋ c174 兩張 ＋ c175 四張 ＋ c182 ＋ c59，含 `佐藤允彦トリオ`／`佐藤允彦とサウンド・ブレイカーズ` 兩種編制串與四組聯名串），
**而本組同時收了他參與的另一張（#6《デマ》，同年、同廠牌集團之外的 CBS/Sony、四軌原創器樂組曲）**——**同一位藝人、同一年、一收一退，分界同樣是「器樂／自唱」。**
⚠ **`中山千夏` 池中 0 列、盤名 `ふたりの` 0 列，本批不入池。**
⚠ ⚠ **本筆查到一組人名寫法分裂，要記給後面批次**：**`佐藤允彦`（MB 實體本名、池中 22 列）／`佐藤充彦`（⚠ **Apple jp 兩筆逐字都寫 `充`**：`中山千夏 + 佐藤充彦`（`1328206410`）與 2020 年 SOLID 再發的 `佐藤充彦&中山千夏`（`1498162961`）；⚠ **Discogs 在本組 #6 的 credits 裡也把 `佐藤允彦とがらん堂` 的 anv 寫成 `佐藤充彦とがらん堂`**）**。
**照第 1929-B／1940-B 條「漢字要與羅馬字讀音對得上」：`允彦` 讀 まさひこ（MB alias 逐字有 `さとう まさひこ`），`充彦` 常讀 みつひこ**——**`允` 是正解、`充` 是誤寫**；
**池中 22 列用的就是 `允彦`。→ 本層不改任何既有卡、不新造第三種，只把 `充` 這個誤寫記下來**（**與 c-183 第 5715 條之外的 `千野秀一／知野秀一` 同一族：同一個人名在同一條線上被不同來源寫錯**）。
⚠ **盤名側併記**：**Apple jp 的題逐字是「ふたりのひとりごと まさか夫妻作品集」——比盤面少一個 `の`**；**MB 兩層只有前半**；**Discogs 盤面是完整的。三種寫法，退件不入卡，仍記下。**
⚠ **`live` 欄：slice 逐字 `false`，本層維持 `false`**（companies 欄整欄是空的、零場館、零錄音日、零 live 字樣、MB `secondary-types` 空陣列）。
⚠ **原壓廠牌 `Trio Records` 在十五家之內、年份三處相符（MB／Discogs／Apple 逐字都是 1973）——退的純粹是曲風、曲目與演奏主體。**
⚠ **再發版本數併記**：**Discogs master 1568721 的 `versions` 全表逐筆跑完共 2 版**（1973 `3A-1002` 原壓、2003 `Showboat SWAX-65` 紙盒 CD 限定重製）；**MB 建了 2 筆——持平，本組唯一一筆不低估的碟**（⚠ **Apple jp 另有 2020 年 SOLID Records 的數位版，Discogs 沒收——那不是「Discogs 少一版」，是數位發行沒進 Discogs，照第 1879-B 條不算進版本數**）。
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」（c-183 第 5657／5658／5694 條）直接定；**本筆與 #3 兩張列為建議主線覆核的退件，見 5745。**）

---

## 5723　⚠ ⚠ 退：`Sonia Rosa & Yuji Ohno —《Spiced With Brazil》`（rg 926c9e0a）——**外國藝人那一關四項 2/4；⚠ ⚠ 本筆同時是 MB `country` 欄一種新失效形態的實例，第 5679 條的修法擋不住它（見 5732）**

slice #14、**Sony YFSC-21**（⚠ **slice 與 MB 的 catno 逐字是 `YSFC-21`——字母倒置，見 5734**）、1974-12-21、9 軌。

**曲風那一關過得了**：**Discogs releases/5042007 的 genres 逐字 `Jazz`／`Latin`、styles 逐字 `Bossanova`／`Latin Jazz`**——**① ② ③ ⑤ 與主線第 1934-B 條 (2) 款按字面全部不成立**；
MB 的 RG tags／genres 兩欄逐字 `bossa nova(1)`／`jazz(1)`／`latin(1)`／`latin jazz(1)`——**四項全部在爵士／拉丁側。**
**原壓廠牌也在門內**：**labels 逐字「Sony — YFSC-21」、companies 逐字「Pressed By: CBS/Sony Records Inc.」「Printed By: Koei Printing Co. Ltd.」、系列欄逐字「Audio Speciality Series」**
——⚠ **盤面字標是 `Sony`（CBS/Sony 自家的一條試聽示範盤 imprint）、壓片是 CBS/Sony Records Inc. 本體**，
**照簡報第二節第 7 點「imprint 與母公司常互掛」判它在十五家的 CBS/Sony 之內**（**與 c-183 第 5668／5690／5696 條那三筆「原壓根本是別家公司」的形狀不同**）。

**退件依據是第 4106 條四項 2/4**：

| 第 4106 條四項 | 本盤 |
|---|---|
| 領銜掛名 | ⚠ **外**——**MB 逐字 `Sonia Rosa` ＋ joinphrase ` & ` ＋ `Yuji Ohno`；Discogs 逐字 `Sonia Rosa` — join `With` — `Yuji Ohno`**（**`With` 這個 joinphrase 本身就說明她是主體、大野雄二 是伴奏與編曲的一方**） |
| 作曲 | ⚠ ⚠ **外**——**九軌逐軌都有 `Written-By`，而九軌零個日本作曲者**：Jobim ×2、Jimmy Van Heusen、James Taylor、Webster／Fain、Edu Lobo、Chico Buarque／Francis Hime、Thom Bell／Linda Creed、Tito Madi；**大野雄二 的 credit 逐字只有 `Arranged By, Conductor`** |
| 企劃 | **日**——製作與導演 川端薫、`Audio Speciality Series`、錄音 田中光和 |
| 原盤發行 | **日**——`Sony YFSC-21` |

**演奏側是日本側佔多數（十三位樂手裡十二位是日本人：`Piano [Acoustic] — Tsuyoshi Yamamoto`（山本剛）、`Acoustic Bass — Isoo Fukui`、`Acoustic Guitar — Takao Naoi`（直居隆雄）、`Electric Bass — Akira Okazawa`、`Electric Guitar — Tsunehide Matsuki`、`Drums — Kazuyoshi Okayama`、`Harp — Keiko Yamakawa`、`Oboe — Gaichi Ishibashi`、三位拉丁打擊、`Backing Vocals — Time Five`）**
——⚠ **照 c-183 第 5680 條「兩族的分界不是演奏側的人頭比，是第 4106 條的四項」，人頭比在本筆不救。**

→ **退（四項 2/4，低於 c-183 第 5685 條定的 ≥ 3/4 門檻）。**
⚠ ⚠ **這一筆與 c-183 第 5662 條退掉的 `Jack DeJohnette《Have You Heard?》` 逐項同構**——**該條逐字「外國藝人那一關最難判的一筆：演奏側 1/4、錄音在東京、原盤是日本的，仍退」、四項 2/4**，
**而第 5685 條末段逐字把它列為「若放寬到 2/4 要翻的那一筆」。→ 本筆是那個門檻的第二個實例，兩張要一起翻或一起維持。**

### ⚠ ⚠ 本層另外把兩件擦邊的分析寫足，因為退件只靠身分那一關，不靠這兩件

**(1) 曲目來源（第 5701 條的可數判準）：本層量成甲 6／乙 3，乙佔比 33% ≤ 一半 → 第三肢成立、不構成退件理由。**
**甲**：〈Garô Ta De Ipanema〉（Jobim／Vinicius）、〈Here's That Rainy Day〉（Van Heusen）、〈Secret Love〉（Webster／Fain）、〈Corcovado〉（Jobim）、〈Casa Forte〉（Edu Lobo）、〈Chove La Fora〉（Tito Madi）；
**乙**：〈Don't Let Me Be Lonely Tonight〉（James Taylor，1972）、〈You Make Me Feel Brand New〉（Thom Bell／Linda Creed，1973 年 The Stylistics 的熱曲）、〈Atraz Da Porta〉（Chico Buarque／Hime，1972）。
⚠ ⚠ **本層把 Jobim／Bonfá／Edu Lobo 一系的巴西曲目算成甲，依據是 c-183 第 5701 條第四節自己的量法**——**該節逐字把〈The Girl From Ipanema〉〈Manhã De Carnaval〉〈Meditation〉〈Secret Love〉列為甲**，
**而第三節的乙列舉裡沒有「巴西 MPB」這一項，`電影主題曲` 那一項還特別加了括號「（未進入爵士曲目表者）」。**
⚠ **若把三首巴西 MPB（`Casa Forte`／`Atraz Da Porta`／`Chove La Fora`）全算成乙，量法會變成甲 4／乙 5＝56% > 一半、第三肢改敗**
——**本層把兩種量法都寫在這裡，因為第 5701 條的乙列舉沒有涵蓋巴西素材，這是那一條的第一個缺格**（見 5745 的上呈）。

**(2) 演奏主體（第 1923-B／1925-B 條）：擦邊，但本層沒有拿它當退件理由。**
**`Vocals — Sonia Rosa` ＋ `Acoustic Guitar, Soloist — Sonia Rosa` ＋ `Arranged By — Sonia Rosa`**（她自己也編曲並彈吉他）、
**大野雄二 `Arranged By, Conductor`**、**⚠ `Backing Vocals — Time Five`（一支ソフト・コーラス 組）＋ 豎琴 ＋ 雙簧管**
——**這個配置靠近第 1923-B 條的 `Hi‐Fi Set` 與 c-183 第 5692 條的「歌手＋合唱團」形狀**；
⚠ **但反方向也有硬證據**：**鋼琴是 山本剛（池中的爵士鋼琴手）、三位拉丁打擊、styles 有 `Latin Jazz`、而且 c-183 第 5703 條收的 `笠井紀美子 with Gil Evans Orchestra` 與本組 #16 都是「歌手 ＋ 編曲家與樂團」的形狀並判收**。
**→ 本層判這一肢不成立退件，退件單押第 4106 條四項。**

### ⚠ ⚠ 三件要記的旁枝

1. ⚠ ⚠ **本盤的 1974 年首發是宣傳盤（非賣品）**：**Discogs releases/5042007 的 `formats.descriptions` 逐字 `["LP","Album","Promo"]`、notes 逐字「Not for sale. This album was Originally Promo only release.」**，
   **而 `/masters/613220/versions` 全表三筆裡 1974 年只有這一筆**——**市售版要到 2001 年的 `Sony Records Int'l SICP 8001` CD 與 2002 年的 `EM Records EM1037LP` LP。**
   ⚠ **MB 那一筆 1974 release 的 `status` 逐字卻是 `Official`**（**兩個資料庫對「宣傳盤算不算正式發行」的判定不同**）。
   **本層仍取 `year: 1974`（MB first-release-date、Discogs `released: 1974-12-21` 兩處一致），但這個形狀要記給後面批次：本線會再撞到「原盤是非賣品、市售版晚二十幾年」。**
2. ⚠ **`Sonia Rosa` 的漢字名不存在（她是巴西人），片假名是 `ソニア・ローザ`**——**MB alias 與 Discogs `namevariations` 兩處逐字都有。退件不入池。**
3. ⚠ **池中 `大野雄二` 11 列**（seed 6 ＋ c102 ＋ c133 四張，含 `大野雄二トリオ`），**逐列比過沒有一列是本盤**；`Sonia Rosa`／`ソニア` **0 列**；盤名 `Spiced` **0 列**。**不撞池，退的是身分。**
⚠ **本層照 c-183 第 5680 條末段的做法把本筆登記進第 3787 條那份清單**：**`Sony YFSC-21`（`Sonia Rosa With Yuji Ohno《Spiced With Brazil》`，1974）**——⚠ **但它與 #9《Akisakila》不同族：那一張是「外國藝人在日本錄的日本原盤」，本張是「長住日本的外國歌手與日本編曲家的日本企劃盤」**，**後者在本線會反覆出現（`enum/jp-2.md` 的 217 張外國藝人盤裡有一整批是這一族），值得主線考慮單獨立一格。**
（可逆性：收退名單，不動卡池結構——照裁定權下放第 1 條「有先例」（c-183 第 5662 條）直接定；**本筆列為建議主線覆核的退件，見 5745。**）

---

## 收件與機制的裁定（5724–5745）

## 5724　年份：**12 筆收件全部回查原盤版本表，改判 0 筆；退件側 7 筆也逐筆量過，改判 0 筆**

| # | 盤 | slice | MB first-release-date | Discogs 原壓 `released` | 版本表最早一版 | 取 | 差 |
|---:|---|---:|---|---|---:|---:|---:|
| 0 | Love Live Life《殺人十章》 | 1972 | 1972 | 1972 | —（無 master 頁） | **1972** | 0 |
| 1 | 渡辺貞夫《Sadao Watanabe》 | 1972 | 1972 | 1972（notes 逐字「Recorded at Iino Hall, February 24, 1972」） | 1972 | **1972** | 0 |
| 4 | 渡辺貞夫 Meets…《Kenya Ya Africa》 | 1973 | 1973 | 1973（notes 逐字錄音 1973-09-20） | 1973 | **1973** | 0 |
| 5 | 柳田ヒロ《Hirocosmos》 | 1973 | 1973 | 1973（notes 逐字「Recording Date 1973. 5, 21~23」） | 1973 | **1973** | 0 |
| 6 | 筒井康隆, 市原宏祐, 佐藤允彦《デマ》 | 1973 | 1973 | 1973 | 1973 | **1973** | 0 |
| 7 | 鈴木良雄《フレンズ》 | 1973 | 1973 | 1973（notes 逐字錄音 1973-05-10／11） | 1973 | **1973** | 0 |
| 10 | Various Artists《Inspiration & Power 14…》 | 1973 | 1973 | 1973（notes 逐字會期 1973-06-30～07-12） | 1973 | **1973** | 0 |
| 12 | 山本邦山 & Chris Hinze《去来 Kyorai》 | 1974 | 1974 | 1974 | —（無 master 頁） | **1974** | 0 |
| 13 | 渡辺貞夫《Mbali Africa》 | 1974 | 1974 | 1974（notes 逐字錄音 1974-09-20 ＋ `℗ 1974`） | 1974 | **1974** | 0 |
| 15 | Chris Hinze, 沢井忠夫, 山本邦山《怪顚》 | 1974 | 1974 | 1974（notes 逐字「Recorded on October 4, 1974」） | —（無 master 頁） | **1974** | 0 |
| 16 | 笠井紀美子 & Oliver Nelson《In Person》 | 1974 | 1974 | 1974（notes 逐字錄音 **1973**-09-24） | 1974 | **1974** | 0 |
| 18 | 益田幹夫《Trace》 | 1974 | 1974 | 1974（notes 逐字錄音 1974-06-09／12 ＋ `Ⓟ 1974`） | 1974 | **1974** | 0 |

⚠ ⚠ **12/12 改判 0，與 c-183 的 5/5（a）與 8/8（b）同向，成因可以歸因並延伸**：
**1966–74 這個年段的日本盤，Discogs 的原壓覆蓋率意外地好，而 MB 這一邊也不像 1980 年代那樣「只建 CD 不建原壓 LP」**
——**本組 12 筆裡 12 筆的 MB 原壓 release 都在、12 筆的 catno 都掛得出來**。
⚠ ⚠ **但本組另外量到兩件 c-183 沒有的**：
1. ⚠ **`format` 欄有 1 筆是錯的（#1 逐字 `CD`，原壓是 12 吋 LP）**——**成因是 MB 沒有建 1972 年的市售盤、只建了宣傳盤與 2014 年的 CD**
   （**c-176 第 4108 條第 8 點、c-183 第 5668／5694 條的同一種形狀，本組 1/19**）。
2. ⚠ ⚠ **有 4 筆的「錄音年早於發行年」或「錄音日與發行同年」要寫進下游，不得混講**：
   **#16 錄 1973-09-24、發 1974（⚠ 跨年，正文寫 1973 必須講清楚那是錄音年）**；
   **#4 錄 1973-09-20、發 1973**；**#13 錄 1974-09-20、發 1974**；**#7 錄 1973-05-10／11、發 1973**。
   ⚠ ⚠ **#4 與 #13 是「同月同日、相差一年、不同場館」（1973-09-20 飯野ホール ／ 1974-09-20 郵便貯金ホール），而且是同一位藝人**——**下游極容易寫錯場館。**
⚠ ⚠ **本組有兩處「來源之間的年份衝突」，兩處都判給 Discogs 原壓，兩處的成因都查清楚了**：
1. **#5《Hirocosmos》**：**ja.wikipedia 逐字「1973年4月1日」，而盤面 notes 逐字「Recording Date 1973. 5, 21~23」——發行日不可能早於錄音日一個多月**，**判 ja.wikipedia 那一格的月日不可信**（廠牌與目錄號兩欄則相符、可作交叉驗證）。
2. **#16《In Person》**：**Apple jp（`1655614452`）的 `releaseDate` 逐字 `1973-01-01`、`copyright` 逐字 `℗ 1973`，而五個來源都是 1974**——**成因是 Apple 把錄音年（1973-09-24）當成發行年，而 `01-01` 又是「只知道年」的填充值**（c-183 第 5708 條記過同一種填充值）。**照第 1945-B 條 Apple 一律只作交叉驗證，該格整格不寫。**
⚠ ⚠ **另有一筆 ja.wikipedia 與兩個資料庫衝突、本層判給資料庫的（退件側）**：**#0《殺人十章》的 ja.wikipedia 樂團欄逐字寫「1971年」，MB 與 Discogs 兩處都是 1972**——**兩票對一票，取 1972。**
⚠ ⚠ **本組唯一一筆 Apple 日期可以當佐證的是 #18《Trace》**：**`releaseDate` 逐字 `1974-11-05`、`℗ 1974`、`trackCount` 6**——**年份與軌數兩項與原壓逐字相符、日期是具體的日而不是 `01-01`、而且晚於錄音日（1974-06）四個多月，時序合理**。
**照第 1945-B 條仍只寫進 `risk` 當交叉驗證，`year` 取 1974。**
⚠ ⚠ **East Wind 這家在第 1907-B 條的「Apple 日期可信度按廠牌分」那張表上原本沒有資料點，本筆是第一個**——**一個點不足以立判準，記給後面批次累積**（本線 East Wind 還有 b 組四張與後續批次）。

---

## 5725　盤名：**真改判 0 筆；⚠ 等價形取邊 5 筆、大小寫取邊 1 筆、異體字取邊 1 筆、判定「不是等價形」1 筆、三欄一致 5 筆**

| # | slice 的 `album` | 本卡取 | 性質 |
|---:|---|---|---|
| 0 | `殺人十章` | **`殺人十章`** | 等價形取邊（和文）——盤面全題逐字「殺人十章 = 10 Chapters Of Murder」，MB 兩層都是和文 |
| 1 | `Sadao Watanabe` | **`Sadao Watanabe`** | 三欄一致；⚠ **同名盤，`selfTitled: true`**，見下 |
| 4 | `Kenya Ya Africa` | **`Kenya Ya Africa`** | 三欄一致、六個版本逐字相同、無和文題 |
| 5 | `HIROCOSMOS` | **`Hirocosmos`** | ⚠ **大小寫取邊**——MB RG title 是全大寫、**MB 最早 release 的 title 與 Discogs 三個版本都是 `Hirocosmos`**；照 c-183 第 5671 條 #16 的同一處理 |
| 6 | `デマ Rumour` | **`デマ`** | ⚠ **等價形取邊（和文）**——盤面逐字「デマ = Rumour 」；**MB 兩層寫成拼接形 `デマ Rumour`，不採**；見下 |
| 7 | `フレンズ` | **`フレンズ`** | ⚠ **等價形取邊（和文）**——盤面逐字「Friends = フレンズ」；**MB 四層全是 `フレンズ`**；見下 |
| 10 | `Inspiration & Power 14 Free Jazz Festival 1` | **`Inspiration & Power 14 Free Jazz Festival 1`** | ⚠ **等價形取邊（英文）**——盤面逐字「…Festival 1 = インスピレーション＆パワー14 フリー・ジャズ大祭１」；見下 |
| 12 | `去来 Kyorai` | **`去来 Kyorai`** | ⚠ **判定「不是等價形」**——Discogs 的 `title` 逐字沒有 ` = `，而它轉錄等價對的慣例是有的；見下 |
| 13 | `Mbali Africa` | **`Mbali Africa`** | 三欄一致、六個版本逐字相同、無和文題 |
| 15 | `怪顛 Keden` | **`怪顚`** | ⚠ ⚠ **兩層裁定：等價形取和文 ＋ 異體字取 Discogs 盤面形**；見下與 5740 |
| 16 | `In Person` | **`In Person`** | 三欄一致；⚠ **Apple jp 的題是第四種寫法 `イン・パーソン`，不採** |
| 18 | `Trace` | **`Trace`** | 三欄一致、六個版本逐字相同 |

### ⚠ ⚠ 四筆需要交代的盤名裁定

**(1) #10：`titleCheck` 有警語，而警語的方向是反的。** **slice 的 `titleCheck.note` 逐字「RG title 與最早 release 的 title 不同——很可能 RG 取了再發標題，逐張核」**；
**實際形狀是 MB 的 RG title 是完整的英文題、而 MB 最早那一筆 release 的 title 逐字只有 `インスピレーション＆パワー14`（後半的 `フリー・ジャズ大祭１` 整段掉了）**
——**不是「RG 取了再發題」，是「最早那一筆 release 的和文題被截短了」。**
**c-183 第 5671 條末段逐字記過「`titleCheck` 的警語方向不可直接採信」，本筆是它在 c-184 的第一個實例。**
**取英文側的依據是第三方多數**：**Discogs 八個版本裡有五筆的題逐字只寫英文側**、**MB 的 RG title 與 2003 年 P.J.L 那筆 release 也是英文側**，**而和文側在 MB 上自己就寫成兩種**。
⚠ **和文題裡的 `＆` 是全形 U+FF06、`１` 是全形數字——本卡用的是半形 ASCII，不得混用。**

**(2) #6 與 #7：兩筆都取和文，而且兩筆的理由裡都有一個「避開碰撞」的成分，這一點要寫清楚。**
**#6 的英文側是 `Rumour`——與 seed 的 `Fleetwood Mac《Rumours》1977`（`apex:hall`）只差一個字母**；
**#7 的英文側是 `Friends`——以它為主鍵掃全池回 26 列，其中盤名逐字就是 `Friends` 的有三張（`The Beach Boys》1968`／`Shalamar》1982`／**c-151 的 `Ron Carter《Friends》1993`，同樣是爵士貝斯手的同名盤**）**。
⚠ ⚠ **本層要明說：避開碰撞不是盤名裁定的依據，jp-1 簡報第三節第 2 點給的依據是「取第三方多數支持的一邊」**——
**#6 的和文側有 MB 2007 年那筆 release 的 title 逐字支持、#7 的和文側有 MB 四層全一致支持，兩筆都先在來源上站得住，碰撞只是加強了同一個結論。**
**→ 記成判準：等價形兩邊在來源上勢均力敵時，碰撞可以當第二順位的權衡；來源不支持的那一邊不得靠碰撞扶起來。**

**(3) #12：本組唯一一筆「判定它不是等價形」的。** **Discogs 原壓的 `title` 逐字是 `去来 Kyorai`——中間只有一個空白**，
**而同組另外三筆（#0 `殺人十章 = 10 Chapters Of Murder`、#7 `Friends = フレンズ`、#15 `怪顚 = Keden`）都帶 ` = `**。
**→ 本層判盤面印的是一個「漢字題 ＋ 羅馬字讀音」的單一題，整串照抄，不拆邊。** ⚠ **下游不得只寫 `去来` 或只寫 `Kyorai`。**

**(4) #1：`selfTitled: true`，而掛名與盤名兩欄的字串不相等。** **盤面題逐字就是 `Sadao Watanabe`、而本卡的掛名照 2026-08-11 東亞藝人裁定取漢字 `渡辺貞夫`**
——**兩欄不相等是文字系統的差、不是兩個不同的名**（**池中先例 `Les Rita Mitsouko —《Rita Mitsouko》`**）。
⚠ **下游引用這個盤名時必須帶年份**：**`渡辺貞夫` 名下另有 c-173 的《Charlie Mariano & Sadao Watanabe》1967，兩張的盤名字串互為子字串**（第 1948-B 條那一族）。

⚠ ⚠ **`titleCheck` 在本組的表現要記**：**12 筆收件裡 `note` 有警語的只有 #10 一筆（而且方向是反的）**，
**而真正需要裁定的有 5 筆（#0／#6／#7／#15 的等價形 ＋ #5 的大小寫）＋ 1 筆異體字（#15）——這 6 筆的 `note` 全部空白、三欄全部「一致」**。
**→ jp-1 簡報第三節第 2 點列的兩種「看不見的形狀」要補第三、第四種**：
**(c) 大小寫差（#5：RG title 全大寫、release title 非全大寫，機器不報）**；
**(d) ⚠ ⚠ 異體字差（#15：MB `怪顛` U+985B、Discogs 盤面 `怪顚` U+985A，機器不報，而且肉眼幾乎看不出來）。**

---

## 5726　⚠ ⚠ ⚠ **本組最重要的發現：`live` 欄改判 3 筆，三筆全部是 `false` → `true` 的反向漏標，而機器一個字都沒報**（**建議主線優先覆核**）

| # | slice `live` | slice `note` | MB `secondary-types` | 本層 | 三項齊備的逐字證據 |
|---:|---:|---|---|---|---|
| 4 | `false` | 空白 | **空陣列** | ⚠ ⚠ **改判 `true`** | companies 逐字「Recorded At: Iino Hall」＋ **notes 逐字「Recorded live September 20, 1973 Iino Hall, Tokyo.」** |
| 13 | `false` | 空白 | **空陣列** | ⚠ ⚠ **改判 `true`** | companies 逐字「Recorded At: Yubin Chokin Hall」＋ **notes 逐字「Recorded live at Yubin-Chokin Hall. Tokyo, September 20,1974.」** ＋ notes 另一行逐字「**Recital** Produced by…」＋ **末軌題逐字〈Encore: Tanzania E〉** |
| 16 | `false` | 空白 | **空陣列** | ⚠ ⚠ **改判 `true`** | companies 逐字「Recorded At: Yubin Chokin Hall」＋ **notes 逐字「Recorded live at Yubin Chokin Hall, Tokyo, September 24, 1973.」** ＋ **盤名逐字 `In Person`** ＋ ⚠ **credits 逐字有 `MC — Teruo Isono`** ＋ 曲序是「主題曲開場→再現→安可→樂團主題收尾」 |
| 9 | `true` | `Live` | `["Live"]` | **維持 `true`**（退件） | 三項齊備：場館（Koseinenkin Kaikan）＋ 單一日期（1973-05-22）＋ **盤名逐字帶 `in Japan`** |
| 10 | `true` | `Live` | `["Live"]` | **維持 `true`** | 三項齊備：場館（Shinjuku Art Theater）＋ notes 逐字給會期（1973-06-30～07-12）＋ MB `secondary-types` |

**其餘 14 筆逐張反向核過，沒有再漏的**——**逐筆的排除依據是第 1904-B 條「`Recorded At` 是錄音室的不算」**：
**#1（Iino Hall，但 notes 只給單一錄音日、零 live／觀眾字樣 → 判為在音樂廳錄的錄音室型錄音，與 c-183 第 5672 條對《Have You Heard?》的處置逐項同構）**、
**#5（`CBS/Sony No. 1 Studio`）、#7（`CBS/Sony No.1 Studio`）、#15（`Aoi Studio`）、#18（`Victor Studio`）、#12（companies 整欄空白）、#0／#6／#11（companies 無場館）、#8（`Nippon Columbia Co., Ltd.`）、#2／#3／#14／#17（退件，逐筆核過）**。
⚠ **反向那一關（`Direct Cutting` 系列被誤標成 Live）本組 0 筆。**

### ⚠ ⚠ 為什麼這三筆是新的，以及要給主線的兩件

**c-183 兩組合計在這個方向上 0 筆**——**a 組的 5672 條逐字只驗了「slice 標 `true` 而其實不是」那一個方向（2 筆），b 組的 5699 條逐字「slice 標 `true` 的 1 筆屬實」**。
**本組 19 張裡 3 張（16%）是反過來的：slice 標 `false`、`note` 空白、MB `secondary-types` 空陣列，三個機器欄位全部沉默，而盤面 notes 逐字寫著 `Recorded live`。**
⚠ ⚠ **成因可以歸因，而且可以一行修掉**：**MB 對這三筆的 `secondary-types` 都沒有掛 `Live`**（**第 397 條逐字記過「`secondary-types` 兩個方向都會漏」**），
**而 slice 的 `live` 欄是直接抄 MB 那一欄的**。
**→ 給主線的第一件（零成本）**：**切批腳本可以多打一次 Discogs 原壓的 `notes`，對 `/\brecorded live\b/i`／`実況`／`ライヴ`／`Recital` 做一次子字串掃描，命中就把 `live` 標成「待人工判」而不是 `false`。**
**三筆的 notes 全部含 `Recorded live` 這個逐字字串，一條 regex 就會全部命中。**
**→ 給主線的第二件**：**簡報第三節第 3 點目前只寫了「`live` 欄不可信，但兩個方向都要小心」與收窄後的判準**，
**但那一段的兩個方向講的是「場館不足以判實況」與「`Direct Cutting` 被誤標成 Live」——兩個方向都是「往下修」。**
**本組這三筆是「往上修」，簡報裡沒有這一格。建議補一句：⚠ `live: false` 一樣要逐筆讀 Discogs 原壓的 `notes`，這一欄的漏標在 1972–74 年段是 16%。**
⚠ ⚠ **這三筆的下游後果是實質的**：**三張都是東京的音樂會實況，而其中兩張（#4／#13）是同一位藝人、同月同日、相差一年、不同場館**
——**若照 slice 當錄音室盤寫，三張的正文會全部寫錯。**
（可逆性：**三筆改的都是卡單的敘述前提（`risk` 與 `why` 兩欄的逐字說明），不動卡池結構**——照裁定權下放第 2 條「可逆」與第 3 條「卡住整條線」直接定。）

---

## 5727　⚠ ⚠ 再發版本數：**9 筆有 master 頁的收件逐筆跑完整張 `versions` 清單，9/9 全部低估，平均低估率 61%、最高 86%；另 3 筆沒有 master 頁**

| # | 盤 | Discogs master | **`versions` 全表** | MB release 數 | 低估 | 低估率 |
|---:|---|---:|---:|---:|---:|---:|
| 0 | 《殺人十章》 | **無 master 頁**（`master_id` 0） | —（資料庫裡只有這一筆） | 1 | — | — |
| 1 | 《Sadao Watanabe》 | 538698 | **8** | 2 | 6 | **75%** |
| 4 | 《Kenya Ya Africa》 | 827658 | **6** | 1 | 5 | **83%** |
| 5 | 《Hirocosmos》 | 817547 | **3** | 2 | 1 | **33%** |
| 6 | 《デマ》 | 731942 | **3** | 2 | 1 | **33%** |
| 7 | 《フレンズ》 | 848547 | **4** | 3 | 1 | **25%** |
| 10 | 《Inspiration & Power 14…》 | 60647 | **8** | 3 | 5 | **63%** |
| 12 | 《去来 Kyorai》 | **無 master 頁** | —（資料庫裡只有這一筆） | 1 | — | — |
| 13 | 《Mbali Africa》 | 469790 | **6** | 1 | 5 | **83%** |
| 15 | 《怪顚》 | **無 master 頁** | —（資料庫裡只有這一筆） | 1 | — | — |
| 16 | 《In Person》 | 865275 | **7** | 1 | 6 | **86%** |
| 18 | 《Trace》 | 799622 | **6** | 2 | 4 | **67%** |
| | **合計（9 筆有 master）** | | **51** | **17** | **34** | **平均 61%／總量 67%** |

⚠ ⚠ **jp-2 線第三組的低估率是 61%，落在 jp-1 線二十組 42–93% 的區間內，曲線仍然沒有下降。**
**第 1879-B 條的兩種漏法在本組同時出現，而且本組另外量到三種新的、都要寫進後面批次的固定動作**：
- **(a) 只數 MB release**——本組 12 筆的 MB release 數是 1／2／1／2／2／3／3／1／1／1／1／2，**若照抄就會把 51 版寫成 17 版。**
- **(b) 漏掉「1970 年代的同號段再發」**——**#1 漏 1976 `23AP 98` 與 1979 `18AH 1566`；#4 漏 1978 `23AP 1073`（兩筆）；#13 漏 1977 `38AP 667～8` 與 1983 `28AH 1571～2`；#16 漏 1977 `25AP 733`（兩筆）。**
  ⚠ ⚠ **CBS/Sony 的 `23AP`／`25AP`／`38AP`／`18AH`／`28AH` 五個廉價再發號段是本線這個年段最大的一個漏源**——**本組七張 CBS/Sony 收件裡有四張的低估全部來自它。**
- **(c) ⚠ 新的一種：「同一張碟換號段重壓」**——**#18《Trace》的 1976 `EW-8004` 逐字標 `Repress`，碟沒換、號段換了**（**East Wind 把 `EW-7xxx` 整批改成 `EW-8xxx`**）；**MB 沒建。**
- **(d) ⚠ 新的一種：「同號同年多筆獨立 release」**——**#16 在 1974 年同一個 catno `SOPM 73` 下有四筆獨立 release（三筆市售 ＋ 一筆 Promo）**，**數版本時不可去重成一筆。**
- **(e) ⚠ 新的一種：「同一次再發同時掛兩個目錄號」**——**#6 的 2007 年 CD 同時掛 `FJSP-02` 與 `TDCD-91007`；#10 的 2010 年 CD 同時掛 `ARTD5555-56` 與 `PA-3157-58`；#18 的 2020 年 CD 同時掛 `UVWA-0043` 與 `CDSOL-1484`**
  （**c-183 第 5715 條第 5 點「數 MB release 之前先比目錄號」的反向：這一次是同一筆 release 有兩個號，不是兩筆 release 是同一張碟**）。

⚠ ⚠ **「沒有 master 頁」的處理：本組 3 筆（#0／#12／#15），是 c-183 的三倍**。
**三筆一律照第 1879-B 條只寫「資料庫裡只有這一筆」、不得寫成「沒有再發」**，
**而且三筆都逐筆用 `catno=` 與 `q=` 兩路交叉確認過「Discogs 上真的只有這一筆」。**
⚠ ⚠ **成因可歸因，值得記給後面批次**：**三筆全部是「冷盤」**——**#0 是 CBS/Sony 的四聲道企劃盤、#12 與 #15 是 `SOCO` 三部作的前兩張**，
**三張都零筆 CD 復刻、零筆他國授權盤**。**c-183 第 5673 條逐字預告「本線的小廠（Union／Frasco／East Wind）出現無 master 頁的機率會比 jp-1 高」**
——**本組修正那個預期：無 master 頁的三筆全部是 CBS/Sony（本線 MB 建檔品質「差」的那一家），不是小廠。**
⚠ **`versions` 表裡 `released` 欄為 0 的版本仍計入版本數，但年份不可引用**（**#10 有兩筆 `PA-3157〜8`**）。
⚠ **退件也逐筆跑了版本表並記在各條**（#2 14 版、#3 6 版、#8 5 版、#9 13 版、#11 2 版、#14 3 版、#17 4 筆），**下一線若把它們撈回來才不會重跑。**

---

## 5728　⚠ ⚠ 廠牌欄與「原壓廠牌必須是本線十五家」那一關：**19 筆逐筆以 Discogs `releases/<id>` 的 `labels` 欄為準核過，`house` 整欄錯 0 筆（本線第一次 0%）；1 筆是 imprint 與母公司的差**

| # | slice `house` | 原壓的 `labels` 欄逐字 | 判定 |
|---:|---|---|---|
| 0／1／4／5／6／7／12／13／15／16 | CBS/Sony | `CBS/Sony — SOLL-74002`／`SOPL-21-XJ`／`SOPL 233`／`SOLL 35`／`SOLL-28`／`SOPL-192`／`SOCO 103`／`SOPW 27～28`／`SOCO 104`／`SOPM 73` | ✔ **十筆全部相符** |
| 2／9／10／11 | Trio／Whynot | `Trio Records — PA-7005`／`PA-3004〜5`／`PA-3006〜7`／`3A-1002` | ✔ 相符（**#2 退在撞池、#9 退在身分、#11 退在曲風**） |
| 3 | URC | `URC — URG-4017` | ✔ 相符（**退在曲目來源與演奏主體**） |
| 8 | Denon | `Denon — OP-7064-N` | ✔ 相符（**退在曲風**） |
| 17／18 | East Wind | `East Wind — EW-7003`／`EW-7004` | ✔ 相符（**#17 退在撞池**） |
| **14** | **CBS/Sony** | ⚠ **`Sony — YFSC-21`**（companies 逐字「Pressed By: CBS/Sony Records Inc.」、系列欄逐字「Audio Speciality Series」） | ⚠ **盤面字標是 `Sony`、不是 `CBS/Sony`——判為同一家公司的 imprint，仍在十五家內**（退在身分，見 5723） |

**→ 19/19 的原壓廠牌全部在本線十五家之內，`house` 整欄錯 0 筆。**
⚠ ⚠ **這與 c-183 的 a 組 2/19（11%）與 b 組 2/18（11%）形成強烈對照，而成因可以歸因**：
**c-183 那四筆錯的形狀分別是「MB 把 1998 年 CD 再發的 label 倒掛回原壓」（#12 Alfa→Liberty）、「日本壓片被當成原壓」（#15 CBS/Sony→美國 Columbia）與 b 組兩筆美國 Columbia**；
**本組 19 筆裡沒有一筆是外國藝人掛在 CBS/Sony 下的美國原盤**（⚠ **兩筆外國藝人的退件 #9 與 #14 的原壓都確實是日本盤**），
**而年段從 1966–70 移到 1972–76 之後，CBS/Sony 的自製比例明顯上升。**

### ⚠ ⚠ c-183 第 5715 條第 1 點的實地執行，兩個方向各一次

**該條逐字：「CBS/Sony 的 `SONP-`／`SOPM-` 號段裡混著大量美國 Columbia 的授權壓片，`house` 是 CBS/Sony 而掛名是外國藝人的，一律先打 `/masters/<id>/versions` 看最早那一版的 country。」**
1. ⚠ ⚠ **#16《In Person》的原壓 catno 逐字是 `SOPM 73`、而掛名的第二方是美國人 Oliver Nelson**——**逐項命中該條的觸發條件。本層照它跑完七筆版本表：七版的 country 逐字全部是 Japan、labels 全部是 CBS/Sony 或 Sony Records Int'l、零筆美國 Columbia。過關。**
   ⚠ **對照組就在 c-183 裡**：**第 5696 條退掉的 `Barbra Streisand《Live Concert at the Forum》` 的原壓 catno 是 `SOPM-35`、而它的原壓是美國 `Columbia KC 31760`**
   ——**同一個號段、兩個相反的結果。→ 該條末段那句「號段兩個方向都不能當判準」在本組又應驗一次。**
2. **本組的 `SOPL-` 號段三張（#1 `SOPL-21-XJ`、#4 `SOPL 233`、#7 `SOPL-192`）逐筆跑過版本表，全部是日本原盤**
   ——**c-183 第 5702 條逐字說「`SOPL-` 號段本組兩張查過都是日本原盤」，加上本組三張，這個號段累計 5/5 是日本自製**；⚠ **但仍然不得當判準。**

⚠ ⚠ **本組另外量到三個 CBS/Sony 的號段形狀，記給後面批次（只當快篩，不當判準）**：
- **`SOLL-`（#0 `SOLL-74002`、#5 `SOLL 35`、#6 `SOLL-28`）＝四聲道／前衛企劃線**，**三張全部是日本自製、三張全部收**（⚠ **#0 與 #6 的系列欄逐字都有 `Sound Display Series`，見 5736**）。
- **`SOCO-`（#12 `SOCO 103`、#15 `SOCO 104`，＋ 不在本批的 `SOCO 105`）＝「邦楽器とジャズ・フルートのスーパー・セッション3部作」**，見 5736。
- **`SOPW-`（#13 `SOPW 27～28`）＝兩片裝實況線。**
⚠ **`CBS/Sony` 的西班牙分支那一關（簡報第三節第 3 點）**：**本組 11 張 CBS/Sony 逐筆跑過版本表，`country` 全部是 Japan，零張 ES 盤**（**c-183 a 組 8 張也是零，累計 19/19**）。
⚠ **廠牌欄的逐字寫法**：**本組一律以 Discogs `releases/<id>` 的 `labels` 欄為準逐字引**，**大小寫也照 Discogs**
（⚠ **#18 的 MB label 名稱逐字是全大寫 `EAST WIND`、Discogs 盤面是 `East Wind`——取 Discogs**；⚠ **#5 的 MB catno 逐字帶連字號 `SOLL-35`、Discogs 盤面是帶空格的 `SOLL 35`——取 Discogs**）。
⚠ **`entities` ≠ 盤面廠牌那一條（簡報第二節第 7 點）在本組有兩個實例**：**#14 的 `Sony`／`CBS/Sony`（imprint 與母公司）**與**#18 的 `East Wind`／`Nippon Phonogram`（字標與發行製造）**——**兩筆的 `label` 欄都取盤面字標、把母公司寫在括號裡的說明。**

---

## 5729　⚠ 掛名：**12 張 11 個相異字串——沿用池中 10 串 ＋ 新立 5 串 ＋ 新立聯名 4 串；新造分裂 0、新造分隔符 0、收斂 0**

| # | MB 的 artist-credit 逐字（含 joinphrase） | Discogs 盤面逐字 | **本卡取** | 池中狀態 |
|---:|---|---|---|---|
| 0 | `Love Live Life`（Group，country JP） | `Love Live Life` | **`Love Live Life`** | **新立**（0 列） |
| 1 | `Sadao Watanabe`（Person，實體本名 `渡辺貞夫`） | `Sadao Watanabe`（anv 空） | **`渡辺貞夫`** | 沿用（29 列） |
| 4 | `Sadao Watanabe` ＋ **` Meets `** ＋ `Inter-African Theatre Group`（Group，**無 country**） | `Sadao Watanabe` — join `Meets` — `Inter-African Theatre Group` | **`渡辺貞夫 Meets Inter-African Theatre Group`** | **新立聯名**（日本方 29 列 ＋ 外國方 0 列） |
| 5 | `柳田ヒロ`（Person） | `Hiro Yanagida`（1973 兩筆 anv 空、2004 CD 的 anv 逐字 `柳田ヒロ`） | **`柳田ヒロ`** | **新立**（0 列） |
| 6 | `筒井康隆` ＋ `, ` ＋ `Kosuke Ichihara`（實體 `市原宏祐`）＋ `, ` ＋ `Masahiko Sato`（實體 `佐藤允彦`） | `Yasutaka Tsutsui` / `Kosuke Ichihara` / `Masahiko Satoh`（anv `Masahiko Sato`） | **`筒井康隆, 市原宏祐, 佐藤允彦`** | **新立聯名**（`筒井康隆` 0 列 ＋ `市原宏祐` 1 列 ＋ `佐藤允彦` 22 列） |
| 7 | `鈴木良雄`（Person） | ⚠ **同一實體出現兩次、joinphrase 逐字 `=`**：`Yoshio Suzuki` ＝ `Yoshio Suzuki`(anv `鈴木良雄`) | **`鈴木良雄`** | 沿用（4 列） |
| 10 | `Various Artists`（⚠ **type 逐字 `Other`**，無 country） | `Various` | **`Various Artists`** | 沿用（214 列；`Various` 單獨一串 0 列） |
| 12 | `Hozan Yamamoto`（實體 `山本邦山`）＋ **` & `** ＋ `Chris Hinze`（**country `NL`**） | `Hozan Yamamoto` — join `&` — `Chris Hinze` | **`山本邦山 & Chris Hinze`** | **新立聯名**（`山本邦山` 單獨 0 列 ＋ `Chris Hinze` 0 列） |
| 13 | `Sadao Watanabe` | `Sadao Watanabe`（anv 空） | **`渡辺貞夫`** | 沿用（29 列） |
| 15 | **`クリス・ヒンゼ`**（實體 `Chris Hinze`、country NL）＋ `, ` ＋ `沢井忠夫` ＋ `, ` ＋ `山本邦山` | ⚠ ⚠ `Chris Hinze`(anv `クリス・ヒンゼ`) — join **`X`** — `Tadao Sawai` — join `&` — `Hozan Yamamoto` | **`Chris Hinze, 沢井忠夫, 山本邦山`** | **新立聯名**（三方在池中各 0 列，`沢井忠夫` 只在 c-183 的聯名串裡出現過） |
| 16 | `笠井紀美子` ＋ **` & `** ＋ `Oliver Nelson`（country `US`） | `Kimiko Kasai` — join **`Featuring`** — `Oliver Nelson` | **`笠井紀美子 & Oliver Nelson`** | **新立聯名，⚠ 但兩方都是池中既有串**（14 列 ＋ 5 列） |
| 18 | `Mikio Masuda`（實體 `益田幹夫`） | `Mikio Masuda`（anv 空） | **`益田幹夫`** | 沿用（6 列） |

### ⚠ ⚠ 本組立的一條操作規則：**五筆聯名一律取 MB 的 joinphrase 當分隔符**

**本組有五筆聯名（#4／#6／#12／#15／#16），而 MB 與 Discogs 的分隔符在其中三筆不同**
（**#15 MB `, ` ／ Discogs `X`**、**#16 MB ` & ` ／ Discogs `Featuring`**、**#4 兩家都是 `Meets`**）。
**本層一律取 MB 的 joinphrase，依據三條**：
1. **本組用到的四種（` Meets `／`, `／` & `）全部落在池中既有寫法裡，新造 0**——**本層逐一實掃全池確認**（見下）；
2. **c-183 第 5703 條 #13 的逐項同構先例**：**那一筆的 MB joinphrase 是 ` & `、Discogs 是 `,`，該條逐字取了 ` & ` 並把理由寫進 `risk`**；
3. **Discogs 那一邊在本組有一筆會新造第十種分隔符（#15 的 `X`），照 c-179 第 4641 條「本卡不新增分隔符」的保守先例不立。**
⚠ **每一筆的 Discogs 寫法都逐字寫進該卡的 `risk` 與 `queryAlias`，改回去的成本只是卡單的 `artist` 值。**

### ⚠ ⚠ 分隔符的實掃結果，其中一項要回報主線更正 c-183 第 5703 條

**本層以掛名字串為主鍵掃了全池（seed 17,248 ＋ 卡單 6,157 ＝ 23,405 列），六種分隔符的相異掛名數逐字是**：
**` & ` 468 個**／**` with ` 26 個**／**` Featuring ` 8 個**（含 `Don Pullen Featuring Sam Rivers`／`Muhal Richard Abrams Featuring Malachi Favors`／`Ralph Peterson Trio featuring Geri Allen`／`Terence Blanchard featuring The E-Collective` 四組爵士先例）／
⚠ ⚠ **` Meets ` 3 個**（**`Jackie McLean Meets Junko Onishi`**／`Culture Freeman meets The Bush Chemists`／`Lidj Incorporated Meets Sound Iration`）／**` feat. ` 1 個**／**`X` 0 個**。

⚠ ⚠ **這一格要回報主線**：**c-183 第 5703 條末段逐字寫著「`meets` 沒有被立成第十種分隔符（#2）：MB 的 joinphrase 逐字是 ` meets `，但那是盤面標題裡的動詞」**
——**該條的處置（那一筆取 `, `）仍然成立，它是保守的選擇；但它的理由「池中沒有這種分隔符」在事實上不成立：池中本來就有三個 ` Meets ` 掛名串，其中 `Jackie McLean Meets Junko Onishi` 與本組 #4 逐項同構（美國一方 Meets 日本一方）。**
**→ 本組據此把 #4 立成 `渡辺貞夫 Meets Inter-African Theatre Group`，不是新造分隔符。**
⚠ **反過來，`X`（#15 的 Discogs 寫法）池中 0 個，本層不立**——**這是本組唯一一筆「盤面明印而本層仍不立」的分隔符，理由寫在該卡的 `risk`，可逆。**

### ⚠ ⚠ 三件要寫清楚的

**(1) #12 與 #15 的 `Chris Hinze` 必須是同一個字串，否則本組自己會造出一組分裂。**
**#12 的 MB credit 逐字是拉丁字 `Chris Hinze`、#15 的 MB credit 逐字是片假名 `クリス・ヒンゼ`（而 MB 實體本名是拉丁字）**
——**兩張若各寫一種，就是在同一批裡替同一個荷蘭人新造一組跨文字系統的分裂**（第 307 條「絕不新造分裂」、`audits/pool-artist-name-splits.md` 2026-08-28 那一節的第七類）。
**本層兩張一律取 `Chris Hinze`，依據是池中對歐美樂手一律用拉丁字的既有慣例**（c-183 第 5703 條的 `Gerd Dudek`／`Gil Evans`、池中的 `Chick Corea`／`Miroslav Vitous`／`Oliver Nelson`）；**片假名形已放進兩張的 `queryAlias`。**

**(2) #4 取聯名而 c-183 第 5675 條 #17 取單人，兩者不衝突，分界是盤面。**
**5675 #17（`渡辺貞夫《Round Trip》`）的理由逐字是「MB 的 artist-credit 是四個 Person，而 Discogs 十八個版本的盤面掛名沒有一個不是單人」**；
**本組 #4 是 MB 與 Discogs 兩家都印兩方（Discogs 的 join 逐字 `Meets`）**——**形狀相反，第 1934-B 條 (3)「盤面明印才立」在兩筆各指向一個方向。**
⚠ **同理，#1 與 #13 兩筆的 Discogs 盤面都是單人，本層取單人。**

**(3) #7 的 Discogs `artists` 欄有一個容易誤讀的形狀。**
**同一個實體 `Yoshio Suzuki` 出現兩次、joinphrase 逐字是 `=`、第二次的 anv 是 `鈴木良雄`**
——**那是 Discogs 表示「羅馬字 ＝ 漢字等價對」的寫法，不是兩個掛名方**（**與 c-183 第 5675 條 #1 的 `Sadao Watanabe, Sadao Watanabe Quintet`（兩個不同實體）是不同的形狀**）。
**→ 記成判準：Discogs 的 `artists` 陣列裡 joinphrase 是 `=` 的，是同一位的兩種文字，不得拆成聯名。**

⚠ **十一個字串的可逆性全部在卡單的 `artist` 值，不動卡池結構。**
⚠ ⚠ **順帶記三組「本組查到、但本批不入池」的寫法分裂，留給後面批次與本機**（見 5740）：
**`本田竹広`／`本田竹曠`（#2 退件）、`佐藤允彦`／`佐藤充彦`（#11 退件＋#6 的 Discogs anv）、`怪顛`／`怪顚`（#15 的盤名異體字）。**

---

## 5730　⚠ ⚠ 曲風：**19 筆逐筆獨立覆核；`why` 欄 18/19 是空字串，19 筆的曲風依據全部由本層自建**

**本線與 jp-1 最大的不同在這裡：本組只有 #3 的 `why` 逐字是 `rg-tag`，其餘 18 筆是空字串。**
本層對每一筆做的是同一套動作：
**MB `release-group/<id>?inc=artist-credits+tags+genres` 取 RG 層的機器訊號 → Discogs `q=`／`catno=` 找到原壓 release（先讀 `type`）→ 讀整筆的 `genres`／`styles`／`tracklist`（含逐軌作曲欄）／`extraartists` → 逐款套第 3753 條與其後的補充條款。**

| 曲風／曲目來源／演奏主體的退件 | 命中的款 |
|---|---|
| #3 柳田ヒロ《HIRO》 | **收件款第三肢（自寫的日語歌曲，第 4410／5197 條）＋ 第 1923-B／1925-B 條演奏主體**（①②④⑤ 全不成立，見 5719） |
| #8《ハープの個展》 | **⑤ 前半（genres 逐字只有 `Electronic`）＋ 收件款第三肢（現代音樂委作）＋ 第 1923-B／1925-B 條** |
| #11 中山千夏＋佐藤允彦 | **① ＋ ② ＋ 收件款第三肢 ＋ 第 1925-B 條（盤面 `extraartists` 整欄是空的）** |

⚠ ⚠ **本組的五個統計要記，其中三個與 c-183 的數字方向不同**：
1. **MB 的 RG `tags`／`genres` 兩欄在本組的可信度**：**19 筆裡 2 筆完全不含 `jazz`**（**#8 的 `electronic／experimental／modern classical`、另有 #11 含 `jazz` 但同時含四項非爵士**）
   ——**含 `jazz` 的 17 筆裡退了 5 筆，準確率 12/17＝71%**。⚠ ⚠ **這比 c-183 a 組的 5/16＝31% 高出一倍以上**，
   **成因與收件率同源：年段移到 1972–76，MB 的 RG tag 對這個年段的日本自製爵士盤準得多。**
2. ⚠ ⚠ **c-183 第 5676 條第 2 點那個「可操作訊號」在本組再次成立**：
   **該條逐字「RG tags 裡出現任何一個非爵士標籤（`kayōkyoku`／`pop`／`easy listening`／`classical`／`folk`／`rock`），本線 1966–70 年段的退件率是 6/7＝86%」**。
   **本組 19 筆裡 RG tags 含非爵士標籤的有 8 筆**（#0 `rock`／#3 `psychedelic rock`＋`rock`／#5 `progressive rock`＋`rock`／#6 `psychedelic rock`＋`rock`／#8 三項／#11 四項／#12 `smooth jazz`（爵士側，不算）／#14 `latin`（不算））
   ——**逐筆核完是：含非爵士標籤的 6 筆裡退了 3 筆（#3／#8／#11），收了 3 筆（#0／#5／#6）**。
   ⚠ ⚠ **→ 那個訊號在 1972–76 年段的準確率掉到 50%，不能再當快篩。** **成因是這個年段的日本爵士搖滾（`jazz rock`／`prog rock` 並列）是一條正當的線，而 1966–70 年段的 `rock` 標籤多半是歌謡曲盤。**
3. **`jazz` 的 count 在本組幾乎沒有分辨力**：**19 筆裡只有 1 筆的 `jazz` count 大於 1（#5 的 `jazz(2)`，而它是收件）**，其餘全部是 `jazz(1)` 的第 3752 條形狀
   （**c-183 a 組也是 1 筆，但那一筆是退件的 Miles Davis**）。
4. ⚠ **① ② 兩款在本組各成立 3 次與 4 次，而「進人工判」之後三收四退**：
   **① 成立 1 筆（#11，退）**；**② 成立 3 筆（#4 收、#12 收、#11 退）**——**② 三筆裡兩筆判收，逐項驗證了第 1857-B 條「Discogs 對日本盤的 genre 桶很粗，尺八／琴／和太鼓演奏的爵士盤會被丟進去」**。
   ⚠ ⚠ **本組把那一條的射程擴了一格：它不只吃尺八與琴，也吃非洲歌舞**（**#4《Kenya Ya Africa》的 genres 逐字含 `Folk, World, & Country`，而它是渡辺貞夫 的碟**）。
5. ⚠ **`styles` 空陣列在本組出現 1 次（#15），照第 1936-B 條不套主線第 1934-B 條 (2) 款、改走人工判、判收**
   （**c-183 第 5659 條對 #6 做過同一處理但判退——同一個豁免、兩個方向各一次**）；**主線第 1934-B 條 (2) 款在本組真正觸發 0 次。**
⚠ **第 1925-B 條（演奏主體要從盤面本身成立）在本組是決定性的兩次**：
**#11 的盤面 `extraartists` 整欄是空的（連一位樂手都沒有列）→ 退**；**#3 的盤面列了二十位樂手、但領銜者自己的第一個 credit 是 `Vocals` → 退**。
**反過來，12 筆收件裡 11 筆的演奏者是逐名印在盤面上的**；⚠ **唯一的例外是 #0（`Performer — Love Live Life` 一個團名），本層判它與 c-183 第 5657／5658 條那兩張不同形，理由逐條寫在該卡的 `risk`，可逆。**
⚠ ⚠ **c-183 b 第 5701 條（收件款第三肢的可數判準）在本組用了 12 次，而且第一次遇到它的乙列舉不涵蓋的素材**：
**12 筆收件裡 10 筆是「甲 ＝ 全軌原創、乙 ＝ 0」**（#0／#1／#5／#6／#7／#10／#12／#13／#15／#18），
**1 筆是甲 11／乙 2＝15%（#16）**，**1 筆的作曲欄整欄查不到（#4，本層判「查不到」不等於「查到反面」）**；
**退件側 #3 與 #11 兩筆是「自寫的日語歌曲，甲乙兩邊都不算」、#8 是「既有的現代音樂委作」。**
⚠ ⚠ **而退件 #14 逼出了第 5701 條的一個缺格：它的乙列舉沒有「巴西 MPB」這一項**，兩種量法差 23 個百分點（33% vs 56%），**已上呈，見 5745。**

---

## 5731　⚠ ⚠ `poolRecheck` 逐格人工覆核：**19 格全部重掃；兩筆真撞池，而兩筆各自是一種不同的失效**

| status | 格數 | 覆核結果 |
|---|---:|---|
| 「同藝人在池中，盤名不同——**逐張人工比**」 | **13** | **13 格全部不撞**（#1／#4／#6／#7／#8／#10／#11／#12／#13／#14／#15／#16／#18，逐列比過；最長的三格是 #1／#4／#13 的各 29 列、#6／#11 的各 22 列、#10 的 214 列 `Various Artists`） |
| 「池中查無此藝人」 | **4** | ⚠ ⚠ **錯 1 格（25%）**：**#2 撞 `本田竹曠《This Is Honda》1972`（seed）**，見 5717。其餘 3 格（#3 柳田ヒロ／#5 柳田ヒロ／#9 Cecil Taylor Unit）覆核成立 |
| ⚠ ⚠ 「變體全是羅馬字，等於沒查過」 | **2** | ⚠ ⚠ **1 格真撞池（警語正確）**：**#17 本層查出漢字名 `峰厚介` 後掃到池中兩列、就是本盤**，見 5718；**#0 `Love Live Life` 逐條查完是「這個團名沒有漢字／假名形」——警語的前提在該筆不成立，但發得沒有錯** |

**→ 兩筆真撞池（#2／#17，10.5%）；其中撞 apex 的 0 筆**（**c-183 a 組有 1 筆撞 `apex:pearl`**）。

### ⚠ ⚠ 兩筆的失效機制完全不同，必須分開記

**#2：警語沒發、前綴比對單向。**
**slice 掛名 `Takehiro Honda Trio`（MB 實體本名 `本田竹曠トリオ`）、池中 `本田竹曠`**
——**第 5666 條逐字寫過那一道「只做了『池中有編制字串、slice 是本名』這一個方向」，本筆是反過來的第三個實例。**
⚠ ⚠ **而且本筆證明第 1868-B 條與第 5666 條是兩件獨立的事**：
**`artistVariants` 裡有漢字（`本田竹曠トリオ`），所以第 1868-B 條那一關過了、「變體全是羅馬字」的警語沒有發**——**失效純粹來自前綴比對的單向性。**
**→ 過了第 1868-B 條不代表過了第 5666 條；`jp1-pool-refresh.mjs` 的兩個修法要各自做。**

**#17：警語發了而且是對的，救卡靠的是照它去查漢字名。**
**`artistVariants` 逐字只有兩個羅馬字字串，本層照第 1890-B 條的第四條路打 `api.discogs.com/artists/1145518`**
——**`realname` 逐字「峰厚介 (Mine Kosuke）」、`namevariations` 十一個（含三種漢字寫法）**，**拿 `峰厚介` 掃池立刻命中兩列。**
⚠ ⚠ **第 1890-B 條那第四條路在本組是決定性的，而且是唯一有效的一條**：**MB 實體 `dac4fb4e` 無 alias、無 country；Apple jp 查無**——**前三條路全部落空，連三批以來第四次靠 Discogs 藝人頁救回。**

### ⚠ ⚠ 給 `jp1-pool-refresh.mjs` 的三件具體修法（前兩件是重申、第三件是新的）

1. **前綴比對要做雙向**（第 5666／5677 條已寫）：**把 slice 的掛名去掉 `トリオ／カルテット／クワルテット／クインテット／セクステット／オクテット／ユニット／と◯◯オールスターズ` 等後綴之後再掃一次池。**
   ⚠ **本組要補一個後綴：`ユニット`**（#9 的 `Cecil Taylor Unit`／`セシル・テイラー・ユニット`——**該筆不撞池，但後綴清單裡沒有它**）。
2. **「變體全是羅馬字」的警語條件要寫成「`country` 明確是非 JP 的才不發」，不能寫成「非 JP 的不發」。**
   ⚠ ⚠ **c-183 第 5706 條 (3) 建議的修法逐字是「發警語前先看 MB 實體的 `area`／`country`，非 JP 的不發」**
   ——**而本組 #17 的 MB 實體逐字是 `無 country`（null）**。**若把 null 也算成「非 JP」就會漏掉本筆這種（真日本人、真撞池）。**
   ⚠ **本組另有一筆反向的**：**#0 `Love Live Life` 的 MB country 逐字是 `JP`、警語照發，而它真的沒有漢字名（是拉丁字團名，與池中 `MALTA` 同形）**
   ——**→ 警語的正確語意是「這一格沒查過，你自己去查」，不是「這一格漏了」。三筆（c-183 兩筆誤報 ＋ 本組 #17 命中 ＋ #0 前提不成立）合起來說明它該留著、只是不能當結論。**
3. ⚠ ⚠ **新的一件，而且零成本**：**把上一批 `rulings.md` 裡逐字出現過的「池中 N 列」清單餵回切批腳本。**
   **c-183 第 5703 條 (1) 逐字寫著「池中 13 列裡 12 列是 `本田竹広`、1 列是 `本田竹曠`（seed《This Is Honda》1972）」**
   ——**上一批的策展層已經把「這張碟在池中」寫成裁定了，而本批的 slice 仍然把它切進來。**

⚠ ⚠ **本層抓到這兩筆的路徑都不是 `poolRecheck`，而是 c-183 第 5685 條第 3 點那個固定動作**：
**「Union／Trio／East Wind／Frasco 這幾家的每一筆，都要以盤名為主鍵掃一次全池、兩種文字系統都試」**
——**#2 的 `house` 是 Trio、#17 的 `house` 是 East Wind，兩筆都正好落在那份名單上。**
**→ 該條在 c-184 第一次救到卡，而且一次救兩張。建議寫進往後每一批的派工特注。**
⚠ **本層另外照第 4108 條第 1 點對全部 19 格補做了「本名 ＋ トリオ／カルテット／クインテット／セクステット／ユニット／オールスターズ／と○○」那一輪，以及漢字／片假名／羅馬字三種文字各一輪。**
⚠ ⚠ **提醒下游：本組「標記 0」的含金量與 c-183 一樣低**——**5717 與 5718 兩筆真撞池，`chk-prop` 的複合鍵與 `dedup` 的六道全部抓不到**（第 611 條那一族）。

---

## 5732　⚠ ⚠ ⚠ **本組第二個系統性發現：MB 的 `country` 欄本身會寫成「居住國」而不是國籍，第 5679 條的修法擋不住它**（**建議主線優先覆核**）

**c-183 第 5679 條把外國藝人漏進來的成因定在 `enum-label.mjs` 第 109 行的 `|| a.countries.includes('JP')`**，
**並逐字建議「只認掛名藝人的 `country`，不看 release 國家」**（`jp2-fix-domestic.mjs` 已照此重算，簡報〇節逐字記著「216 張硬外國已剔掉」）。

⚠ ⚠ **本組 #14 的 `Sonia Rosa` 證明那個修法有一個擋不住的缺口**：

| 欄位 | 逐字值 |
|---|---|
| MB `artist/4b9325b5` 的 `country` | ⚠ ⚠ **`JP`** |
| MB 同一筆的 `area.name` | ⚠ ⚠ **`Japan`** |
| MB 同一筆的 `begin-area.name` | ⚠ ⚠ **`São Paulo`** |
| MB 同一筆的 `life-span.begin` | `1949` |
| MB aliases | `Sonia Angelica De Carvalho Rosa`／`ソニア・ローザ` |
| Discogs `artists/575956` 的 `realname` | `Sônia Angelica De Carvalho Rosa` |
| Discogs 同一頁的 `profile` 首句 | ⚠ ⚠ **「Brazilian singer and songwriter living in Japan.」**，並逐字「Born: 17 October 1949 in São Paulo, Brazil.」 |

**→ 她是巴西人，而 MB 的 `country` 與 `area` 兩欄都寫成她的居住國 `JP`。**
**照第 5679 條的修法（「只認掛名藝人的 `country`」），她會被判成本土、一張都剔不掉；本組是靠人工判才退掉的。**

⚠ ⚠ **這與第 5679 條記的那一種、以及 c-174 a 第 3787 條記的那一種，是三種不同的失效，要分開**：
| # | 失效 | 形狀 |
|---|---|---|
| 1 | 第 3787 條 | **Group 型實體沒設 area** → **查不到國籍**（本組 #4 的 `Inter-African Theatre Group` 與 #9 的 `Cecil Taylor Unit` 逐字都是無 country） |
| 2 | 第 5679 條 | **`\|\| countries.includes('JP')`** → **查到了國籍、但被 `\|\|` 的另一半蓋過去** |
| 3 | ⚠ ⚠ **本條** | **MB 的 `country`／`area` 兩欄本身就是居住國** → **查到的那個值本身是錯的，沒有任何 `\|\|` 可以拿掉** |

**→ 給主線的修法（兩層，第二層才是根本的）**：
1. **快篩層**：**`artist` 端點多取 `begin-area`，`country` 是 `JP` 而 `begin-area` 不在日本的，一律標「待人工判本土／外國」。**
   ⚠ **本筆逐字命中（`JP` ＋ `São Paulo`）**；**這一層是零成本的，`inc` 不用加、`begin-area` 本來就在預設回應裡。**
2. ⚠ ⚠ **根本層**：**MB 的 `country`／`area` 在語意上是「藝人與哪個地區關聯」，本來就不保證是國籍**
   ——**→ 外國藝人那一關的判定不能只靠任何單一欄位，必須落到第 4106 條四項的人工判。**
   **本組的實測是：19 筆裡有 4 筆進了這一關（#4／#9／#12／#14／#15，共 5 筆），而其中 3 筆的 MB `country` 欄是誤導或缺失的（#14 誤導、#4 與 #9 缺失）。**
⚠ ⚠ **影響範圍**：**簡報〇節逐字說「剩下 17 張『MB 藝人實體無 country、別名全羅馬字』的沒有剔掉，留在 slice 裡並在 `note` 標警語」**
——**那 17 張是上面的第 1 種（查不到）**；**本條說的第 3 種（查到了、但是居住國）沒有任何警語，也不在那 17 張裡。**
**→ 長住日本的外國樂手在本線是一整族（`Sonia Rosa`／`Chris Hinze` 這類），而他們的 MB `country` 可能是 `JP`。建議主線用 `begin-area` 對整條線的 547 張回掃一次。**
（可逆性：**本條只影響收退名單與派工警語，不動卡池結構**——照裁定權下放第 3 條「卡住整條線」直接定並上呈。）

---

## 5733　⚠ 外國藝人那一關：**本組五筆進關，三收兩退；三筆收件全部是「四項 3/4」，而兩筆退件全部是「四項 2/4」——本線第一次出現這麼乾淨的一條刻度**

| # | 盤 | 領銜 | 作曲 | 企劃 | 原盤發行 | **四項** | 演奏側 | 處置 |
|---:|---|---|---|---|---|---:|---:|---|
| 12 | 山本邦山 & Chris Hinze《去来 Kyorai》 | **日** | 不明 | **日** | **日** | **3/4** | 1/2 | **收** |
| 15 | Chris Hinze, 沢井忠夫, 山本邦山《怪顚》 | ⚠ **外** | **日**（8 軌裡 5 軌） | **日** | **日** | **3/4** | 2/3 | **收** |
| 16 | 笠井紀美子 & Oliver Nelson《In Person》 | **日** | ⚠ **外** | **日** | **日** | **3/4** | **19/20** | **收** |
| 9 | Cecil Taylor Unit《Akisakila》 | 外 | 外 | 日 | 日 | **2/4** | **0/3** | **退**（5721） |
| 14 | Sonia Rosa & Yuji Ohno《Spiced With Brazil》 | 外 | 外 | 日 | 日 | **2/4** | 12/13 | **退**（5723） |

**分界仍是 c-176 第 4106 條那一句：「這張碟是誰的碟——領銜掛名、作曲、企劃與原盤發行」，不是錄音地點也不是伴奏國籍。**
**門檻照 c-183 第 5685 條定的「四項 ≥ 3/4」，本組 5/5 逐筆落在門檻兩側、零筆需要裁量。**

⚠ ⚠ **本組對第 4106 條補三個觀察**：
1. ⚠ ⚠ **「哪一項缺」在三筆收件裡各不相同，而三筆都過**：**#12 缺的是作曲（查不到）、#15 缺的是領銜（Chris Hinze 排第一）、#16 缺的是作曲（十三軌幾乎全是美國標準曲）**
   ——**→ 四項是可替換的四票，不是有優先序的四層。** ⚠ **若主線要把某一項升格成硬門（例如「領銜必須在日本側」），要翻的是 #15。**
2. ⚠ ⚠ **演奏側人頭比在本組徹底失去分辨力，這是 c-183 第 5680 條那句話的最強證據**：
   **收件的 #12 是 1/2、退件的 #14 是 12/13**——**退的那一筆的日本樂手比例遠高於收的那一筆。**
   **c-183 第 5680 條逐字「兩族的分界不是演奏側的人頭比，是第 4106 條的四項」，本組把它量成一個反轉的實例。**
3. ⚠ **c-183 第 5680 條記的兩族在本組各有新成員**：
   **「領銜是日本人、演奏側幾乎全是美國人」那一族（5179 記的六張 ＋ c-183 的 #17）→ 本組 #16 屬之（演奏側反而是 19/20 日本人，所以嚴格說它不屬）**；
   **「領銜是外國人、演奏側有日本樂手」那一族（c-183 的 #13 是第一張）→ 本組 #15 與 #14 屬之，而兩張一收一退，分界在作曲那一票。**
⚠ ⚠ **兩筆退件都照 c-183 第 5680 條末段的做法登記進 c-174 a 第 3787 條那份「外國藝人在日本錄的本土企劃盤」清單**，見 5743。
⚠ **另記一件：本組沒有一筆的原壓在外國**（**c-183 有兩筆：a 的 #15 美國 Columbia、b 的 #5／#16**）——**本組兩筆退件的原壓都確實是日本盤，退的純粹是身分。**

---

## 5734　⚠ `catno`／查詢反查與孤兒 release：**12 筆收件全部命中原壓、年份差 0、孤兒 release 0 筆；⚠ ⚠ `catno=` 在本組失效 3 次，其中一種是全新的形狀**

**(1) ⚠ ⚠ 全新的失效形狀：MB 的 catno 欄字母倒置。**
**#14 的 slice 與 MB 的 catno 逐字都是 `YSFC-21`，而 Discogs 原壓的 catno 逐字是 `YFSC-21`**——**第二與第三個字母顛倒。**
**`catno=YSFC-21` 反查逐字回 `items 0`；改打 `catno=YFSC-21` 回 2 筆（master 613220 ＋ releases/5042007），一次命中。**
⚠ ⚠ **這是簡報第六節「catno 反查三種失效」（裸數字／括號被吃掉／字串夾零寬空格）之外的第四種**：
**來源端的 catno 本身有錯字，而且錯得很小（兩個字母互換）、肉眼掃過去不會發現、反查回 0 筆時看起來就像「Discogs 沒有這張」。**
**→ 建議寫進簡報第六節：`catno=` 反查回 0 筆時，先把目錄號的字母重排一次或改用 `q=<羅馬字掛名> <盤名>`，不要直接判「Discogs 查無」。**

**(2) 第 1250 條（裸目錄號撞號）在本組中 2 次，兩次都是同一條系列。**
**`catno=SOCO 103`（#12）回 2 筆，第二筆逐字是俄國盤 `Группа МГК《Скажи "Да!"》`、catno `SOCO1030`**；
**`catno=SOCO 105`（查同系列第三張時）回 2 筆，第二筆逐字是 `Владимир Кузьмин《Грешный Ангел》`、catno `SZCD 0876-97` 而 label 欄掛著 `Unknown (SOCO)`**
——**兩次都必須靠 `country` 與 `label` 兩欄才分得開。**

**(3) 和文 `q=` 查詢的失效，c-183 第 5715 條第 4 點在本組再中 1 次。**
**#6 以 `q=筒井康隆 デマ` 查只回 1 筆、而且是 2007 年的 CD 再發、不是原壓**；**改用羅馬字 `q=Tsutsui Ichihara Sato Rumour CBS Sony` 才回到原壓的 master。**
⚠ **反過來，本組有 3 筆和文 `q=` 一次就命中原壓**（#8 `q=篠崎史子 ハープの個展`、#11 `q=Chinatsu Nakayama Masahiko Satoh Trio Records`、#15 的羅馬字查詢）——**那一條是「幾乎不管用」，不是「一定不管用」。**

**(4) `q=` 結果混著 master 與 release 的那一關（第 1839-B 條）：本組 12 筆逐筆先讀 `type` 再決定端點，零次拿 master id 去打 `releases/<id>`。**
⚠ ⚠ **本組另外踩到一個比它更深的**：**`q=` 的結果裡還會混進「另一個 master 的 release」**——
**#10 的 `q=Inspiration Power 14 Free Jazz Festival` 回 14 筆，其中 3 筆屬於 master 790551（`佐藤允彦 + 富樫雅彦《双晶 = Sohsyoh》`，同一條 `Jazz Chaos Of Japan` 再壓線的下一號 `PA-3159`）**；
**#13 的 `q=Sadao Watanabe Mbali Africa` 回 55 筆，其中 1 筆屬於 master 590775（1981 年的選輯《Sadao Watanabe》`FCPA 614`，⚠ `formats` 逐字標 `Compilation`）。**
**→ 記成判準：`q=` 之後不只要讀 `type`，還要逐筆比 `master_id`，只有 `master_id` 等於目標 master 的才算本盤的版本。**
**本層的三筆版本數（#10 8 版、#13 6 版）就是這樣算出來的，若不比 `master_id` 會分別虛報 3 版與 1 版。**

**(5) 孤兒 release（`master_id` 為 0）：12 筆收件 0 筆**（第 1923-B 條那一道）。
⚠ **3 筆整張碟就沒有 master 頁（#0／#12／#15，`master_id` 逐字 0）——那不是孤兒 release，是第 1879-B 條的「資料庫裡只有這一筆」形狀，兩者不可混算。**
⚠ **`catno=` 與 `versions` 的 id 差集逐筆取過，9 筆有 master 的全部 0 筆。**

---

## 5735　⚠ ⚠ 第 397 條（合輯）：**#10《Inspiration & Power 14 Free Jazz Festival 1》逐項核過不成立，判收**

**這是本線第一張「多組藝人的音樂節實況」，而它同時掛著 `Various Artists` 的掛名與 `Festival 1` 的盤名——兩個都是第 397 條的觸發特徵。**

**依主線第 1948-B 條把判準收斂成的那一句「看的是錄音是不是既有的，不是曲目是不是既有的」逐項核**：
1. ⚠ ⚠ **八段全部是 1973 年 6 月 30 日至 7 月 12 日那一次音樂會的新錄音、在本盤首度發行**
   （notes 逐字「Recorded at Shinjuku Art Theater, Tokyo, June 30-July 12 1973.」、companies 逐字「Recorded At: Shinjuku Art Theater」、
   ⚠ **`extraartists` 裡逐字有 `Producer [Concert] — Satoru Futami`——演唱會本身是製作項目**）
   ——**不是把既有母帶挑出來重排。**
2. **兩個資料庫的機器旗標都指向 Album**：**MB 的 primary-type 逐字 `Album`、secondary-types 逐字 `["Live"]`——零 `Compilation`**；
   **Discogs 原壓的 `formats.descriptions` 逐字 `["LP","Album"]`——零 `Compilation` 描述子。**
3. **與 c-183 兩筆判成合輯的對照組逐項相反**：
   **`北村英治クインテット《Japanese Jazz File》`（第 5695 條）＝1961–62 四段既有錄音的 CD 選輯、**Discogs `formats` 逐字標 `Compilation`**；
   `中川昌三《Four Seasons》`（第 1945-B 條）＝他四張季節盤的精選。**
4. **與第 1948-B 條判收的兩筆同向**：**`MALTA《My Hit & Run》`（自選重錄）與 `浅川マキ《Stranger's Touch》`（舊曲新錄）**——**兩筆的共同點是「錄音是新的」。**

**→ `releaseType` 取 MB 原值 `Album`，`exceptionReason` 與 `exceptionEvidenceUrls` 兩欄留空（§5.6 精選制那一關不啟動）。**

⚠ **`Various Artists` 這個掛名在池中是既有的、有 214 列先例**，其中 **`Various Artists《The Smithsonian Collection of Classic Jazz》1973` 還是 `apex:hall`**——**同年、同樣是 Various Artists 的爵士盤，不同碟。**
⚠ ⚠ **盤名尾部那個 `1` 不是分冊號**：**本層以 `q=Inspiration Power 14 Free Jazz Festival 2` 查過，回的 13 筆全部是本盤自己的版本、零筆 Vol. 2**
——**→ 本卡不是 Volume 拆盤，`risk` 不需要互指**（**bluenote 簡報第二節第 6 點的 Volume 條款在本筆不適用**）。
⚠ **但同一條 `Jazz Chaos Of Japan` 再壓線的下一號 `PA-3159` 是 `佐藤允彦 + 富樫雅彦《双晶 = Sohsyoh》`（master 790551）**——**另一張碟、另一個 RG，已登記，見 5743。**
⚠ ⚠ **若主線覆核後認為「多組藝人的音樂節實況」本身就該走第 397 條或 §5.6，要翻的是本卡，翻的成本只是一張卡**（見 5745）。

---

## 5736　⚠ ⚠ 系列與 Volume：**本組撞到兩條 CBS/Sony 的企劃系列，其中一條是三部作而本批只切到前兩張**

**(1) ⚠ ⚠ 「邦楽器とジャズ・フルートのスーパー・セッション3部作」——三張，本批 #12 與 #15 是第一、第二張，第三張不在 slice 裡。**

| 系列號 | catno | 掛名 —《盤名》 | 年 | Discogs | 本批 |
|---:|---|---|---:|---:|---|
| **1** | CBS/Sony `SOCO 103` | `Hozan Yamamoto & Chris Hinze —《去来 Kyorai》` | 1974 | releases/2979940（**無 master**） | **#12，收** |
| **2** | CBS/Sony `SOCO 104` | `クリス・ヒンゼ X 沢井忠夫 & 山本邦山 —《怪顚 = Keden》` | 1974 | releases/4597616（**無 master**） | **#15，收** |
| **3** | CBS/Sony `SOCO 105` | ⚠ ⚠ **`クリス・ヒンゼ X 芝祐靖 & 豊英秋 & 大窪永夫 —《萬華 = Mange》`** | 1974 | releases/9755109（**無 master**） | ⚠ **不在 slice 裡** |

**三張的形狀固定**：**同一位荷蘭長笛手 Chris Hinze 對上不同的日本邦楽器演奏家、同年、同廠、目錄號連號、系列欄逐字標著序號**。
⚠ ⚠ **本層照 c-183 第 5659 條對 Crown「魅惑のスチール・ギター・ムード」的做法逐筆點出整條系列，但結論相反：這一條是收、不是退。**
**兩條系列的差別逐項可查**：**Crown 那一條是「十四軌當季歌謡曲的照譜演奏」（第 3716 條退件第 2 項）**；
**本條是「三位演奏者各自寫曲、當場合奏」（#15 的八軌逐軌作曲欄逐字就是三位演奏者本人）。**
**→ 立成判準：`CBS/Sony SOCO-10x` 這條三部作整條收，第三張（`SOCO 105`）已登記給後續批次與 §1 補遺（見 5743）。**
⚠ **三張都沒有 master 頁、都零筆 CD 復刻——這是一條被市場遺忘的系列，版本數一律照第 1879-B 條寫「資料庫裡只有這一筆」。**
⚠ ⚠ **第三張的掛名結構要先記下來，免得後續批次重跑**：**`クリス・ヒンゼ X 芝祐靖 & 豊英秋 & 大窪永夫`——四方、兩種分隔符（`X` 與 `&`）**，
**照本組 5729 的規則（取 MB 的 joinphrase、`X` 不立）處理即可。**

**(2) 「Sound Display Series」——CBS/Sony 的 `SOLL-` 四聲道前衛企劃線，本組兩張。**
**#0（`Love Live Life《殺人十章》`、系列欄逐字「SX68Sound」「DP Master Sound」「Sound Display Series」）與 #6（`筒井康隆, 市原宏祐, 佐藤允彦《デマ》`、系列欄逐字「Sound Display Series No. 2」）**
——**兩張都是四聲道、兩張的曲目都是為本盤新寫的、兩張都收。**
⚠ **`SOLL-` 號段裡還有 #5（`柳田ヒロ《Hirocosmos》`、`SOLL 35`）但它的系列欄逐字是 `SX-74 Sound`、不是 `Sound Display Series`**——**同號段、不同系列。**
⚠ ⚠ **照 jp-1 簡報第六節「號段與系列欄不能當曲風判準」，本層沒有拿任何系列欄當收件理由的任何一肢**；**三張的收件依據各自寫在各卡的 `why`。**
⚠ **`SX68Sound`／`SX-74 Sound`／`DP Master Sound` 三者是 CBS/Sony 的錄音與刻片工法字樣，不是廠標也不是曲風線**（本組五張帶著它們：#0／#1 的 `SX68Sound`、#5／#7／#15 的 `SX-74 Sound`）——**正文一律不得寫成「爵士系列」。**

**(3) Volume 拆盤那一關（bluenote 簡報第二節第 6 點）：本組 0 筆。**
**#10 的盤名尾部有 `1` 但沒有 Vol. 2（見 5735）**；**#12／#15 是同一條系列的不同張、不是同一張碟的 Vol.1／Vol.2（兩張的掛名、軌數、曲目全部不同，本層逐軌比過）。**

### ⚠ ⚠ 本組照派工信做完的逐軌時長比對（「同組裡年份相近、軌數相同的兩張要主動比一次」）

**本層把比對範圍擴成「同組全部 19 筆兩兩比 ＋ 池中同廠同年」，重點的三對逐軌比過**：
1. **#12（6 軌）vs #15（8 軌）**：**軌數不同；兩張都有一軌叫〈Shakuhachi's Prolog〉，本組 #12 是 1:56、#15 是 1:50——時長不同，是兩次不同的錄音。其餘零重疊。**
2. **#4（13 軌，1973 實況）vs #13（13 軌，1974 實況）**：⚠ ⚠ **軌數相同、同一位藝人、同月同日相差一年、兩張都是東京實況——這一對是本組最該比的**。
   **逐軌比完：曲題零重疊（只有 #4 的末軌〈Mbali Africa〉與 #13 的第十二軌〈Mbali Africa〉同題，時長 3:53 vs 3:38，不同）**，**兩張不是同一碟。**
3. **#1（9 軌，1972）vs #4／#13**：**三張都是渡辺貞夫 的非洲題材碟，#1 的九軌斯瓦希里語題與另兩張零重疊。**
⚠ **另照 c-183 第 5665 條末段的建議，對 `house` 是 Trio／East Wind 的四筆（#2／#9／#10／#11／#17／#18）以盤名為主鍵掃了池中同廠同年的碟**——**那一輪抓到的就是 5717 與 5718 兩筆撞池。**

---

## 5737　⚠ 三種店面查法（第 254 條，只寫觀察不寫結論）：**Apple jp 命中 3/12（25%），⚠ 而且命中的三筆各有一個不同的坑；403／429 零次**

| # | Apple jp | 逐字觀察 |
|---:|---|---|
| 10 | ✅ | **`Various Artists —《Inspiration & Power 14 Free Jazz Festival 1》`（`1329690700`、℗ 逐字 `TRIO RECORDS`、`trackCount` 8）——八軌逐軌與原壓的題、順序逐字相符**；⚠ ⚠ **`releaseDate` 逐字 `2010-06-16` 是那次 CD 再發的日期，不得引用**；⚠ ⚠ **Apple 逐軌另給了演出者名（`宮間利之とニュー・ハード・オーケストラ`／`吉沢元治`／`沖至クインテット`／`ナウ・ミュージック・アンサンブル`／`富樫雅彦 & 佐藤允彦`／`ニュー・ディレクション・フォー・ジ・アーツ`／`がらん堂`／`山下洋輔トリオ`）——本卡的 `why` 有一半的編制名是靠這一欄定案的** |
| 16 | ✅ | **`笠井紀美子 —《イン・パーソン》`（`1655614452`、℗ 逐字 `1973 Sony Music Labels Inc.`、`trackCount` 13）——軌數 13 與原壓逐字相符，是本盤無誤**；⚠ ⚠ **但 `releaseDate` 逐字 `1973-01-01`、℗ 也是 1973，兩欄的年份都是錯的（Apple 把錄音年當發行年 ＋ `01-01` 填充值），整格不寫進年份**；⚠ **題是第四種寫法 `イン・パーソン`** |
| 18 | ✅ | **`益田幹夫 —《Trace》`（`1443285979`、℗ 逐字 `1974 Universal Classics & Jazz`、`trackCount` 6）——⚠ 本組唯一一筆日期可當佐證的碟：`releaseDate` 逐字 `1974-11-05`、年份與軌數兩項與原壓相符、日期是具體的日、晚於錄音日四個多月**；⚠ **℗ 掛 Universal 是因為 East Wind 的母帶現在在 Universal 手上，不是「原盤是 Universal 的」** |
| 0／1／4／5／6／7／12／13／15 | ❌ | **九筆逐字回 `resultCount: 0` 或回了但零筆是本盤**；**兩種查法（和文掛名＋盤名、羅馬字掛名＋盤名）都試過** |

⚠ ⚠ **本組量到的三件，都要給探測層**：
1. ⚠ ⚠ **`resultCount > 0` 不等於命中，本組有一種新的失效形狀**：**#12 以 `山本邦山 去来` 查回 4 筆，而四筆全部是毫不相干的歐洲古典與管風琴盤**
   （`Ludi musici 1621`／`The Legend of Faust`／`The Pipe Organ of the Riga Cathedral`／`Paramount Brass`）——**兩個和文關鍵字被拆開後各自去比對，回來的是完全無關的碟。**
   **→ 探測層不得把 `resultCount > 0` 當命中，必須逐筆比 `artistName` 與 `trackCount`。**
2. ⚠ ⚠ **覆蓋率的分佈是「廠牌 × 藝人」級的，不是年段級的**：
   **CBS/Sony 的 1972–74 目錄裡，`渡辺貞夫` 三張（#1／#4／#13）全部 0 命中、`柳田ヒロ`／`筒井康隆`／`鈴木良雄`／`Chris Hinze` 四張也全部 0 命中**；
   ⚠ **而同一家、同一年段的 `笠井紀美子` 卻有五張在架上**（本盤 ＋ `トーキョー・スペシャル`1977 ＋ `マイ・ラヴ`1975 ＋ `サテン・ドール`1972 ＋ `Thanks Dear`1974，**後四張池中都已有**）。
   **→ c-183 第 5681 條說的「CBS/Sony 與 Union 1967–70 目錄覆蓋率 0/5」要改寫成：CBS/Sony 這家是逐藝人上架的，同廠同年段的命中率可以是 0/7 也可以是 5/5。**
   ⚠ **`柳田ヒロ` 的分佈更硬**：**他 1970／1971／1972 三張都在 Apple jp 上（℗ 分別是 Universal／Warner／URC），只有 1973 年那張 CBS/Sony 盤（#5）不在**——**缺口是廠牌級的，不是藝人級的。**
3. ⚠ **和文與羅馬字兩種查法的命中方向在本組是相反的兩次**：**#16 用 `笠井紀美子 In Person` 命中、用 `Kimiko Kasai Oliver Nelson` 回 0 筆**；**#18 兩種都命中；#10 用英文題命中、用和文題 `インスピレーション＆パワー14` 回 0 筆。**
   **→ 兩種都要試，沒有哪一種穩定較好。**
⚠ **`itunes.apple.com/search` 本次工作階段共約三十次查詢，403 與 429 各 0 次**（節流 1.4 秒）——**與 `CURATION-BRIEF-bluenote-post1985.md` 附錄二第 2 點「間歇性 403，不是恆定」一致；c-183 b 組應驗過一次 403，本組零次。**
⚠ **`lookup?id=<collectionId>&country=jp&entity=song` 用了 2 次（#10 與 #3），兩次都回完整逐軌。**
⚠ **allmusic／allaboutjazz 依附錄二一律不排進查證路徑（雲端 403），本組一次都沒有打。**
⚠ ⚠ **ja.wikipedia 的 `action=raw` 在本組用了 1 次並且通**（查 `柳田ヒロ` 條目，第 1941-B 條第四點逐字記的「只有 `action=raw` 通」在本組應驗）——**而它回的內容在兩處與第一手來源衝突（#0 的年份、#5 的月日），兩處都判給 Discogs 原壓，見 5724。**

---

## 5738　⚠ Discogs 與 MB 的技術性失效，本組踩到八個（其中三個是新形狀）

1. ⚠ **`search` 混著 `type: "master"` 與 `"release"`**——本組每一次 `q=` 的結果都是混的，**一律先讀 `type` 再決定端點，零次拿 master id 去打 `releases/<id>`。**
2. ⚠ ⚠ **新形狀：`q=` 的結果裡還會混進「另一個 master 的 release」**（#10 混進 master 790551 的三筆、#13 混進 master 590775 的一筆）
   ——**→ 讀完 `type` 還要逐筆比 `master_id`，見 5734 (4)。**
3. ⚠ ⚠ **新形狀：MB 的 catno 欄字母倒置**（#14 `YSFC-21` ／ Discogs `YFSC-21`），見 5734 (1)。
4. ⚠ ⚠ **新形狀：MB 在同一筆 release 上掛了兩代的目錄號**（#13 逐字掛 `28AH 1572` 與 `SOPW 27~28`，前者是 1983 年再發號）
   ——**若拿 MB 的第一個 catno 去反查，會查到 1983 年那一版當成原壓。**
5. ⚠ **裸目錄號撞號（第 1250 條）**：`SOCO 103` 與 `SOCO 105` 各撞一張俄國盤，見 5734 (2)。
6. ⚠ **MB 的 `status` 欄會是 null**（#18 的兩筆 release 逐字都是 `null`）——**不可拿 `status` 當篩選條件**（c-183 第 5682 條第 5 點，本線第二次命中）。
   ⚠ **反過來，MB 的 `status` 也會與 Discogs 打架**：**#14 的 1974 那筆 MB 逐字 `Official`，而 Discogs 的 `formats` 逐字標 `Promo` 並在 notes 寫「Not for sale.」**——**兩個資料庫對「宣傳盤算不算正式發行」的判定不同。**
7. ⚠ **MB 的 label 名稱欄會取不到**（#7 的 2009 年那筆 release 的 label 名稱逐字是空／`undefined`，只有 catno `SICP-20150`）
   ——**照第 642 條先換端點組合再說「MB 沒有」，本層已用 `inc=media+labels` 確認它真的是空的，廠牌以 Discogs 為準。**
8. ⚠ **MB 與 Discogs 的 catno 寫法差（大小寫、連字號、空白）在本組 4 筆**：
   **#5 MB `SOLL-35` ／ Discogs `SOLL 35`**、**#18 MB label 全大寫 `EAST WIND` ／ Discogs `East Wind`**、
   **#10 MB 把兩片裝拆成 `PA-3006` 與 `PA-3007` 兩個 label-info ／ Discogs 盤面是合起來的 `PA-3006〜7`**、**#13 見第 4 點**。
   **→ `label` 欄一律取 Discogs 的盤面寫法。**
9. ⚠ **`MB` 的 `artist:` 欄位不比對 alias、`title:` 不是有效欄位**——**本組全部改用 `release-group/<id>` 與 `release?release-group=<id>` 兩個端點，零次用 `query=`。**
10. ⚠ **MB 守 1 req/s、Discogs 節流到約 1 req/3s、Apple 1.4 秒、UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`**——**全程零次 503、零次 429、零次 403。**
⚠ ⚠ **另記一個曲風側的坑，是本組新抓到的**：**#3 的 2017 年 `Pony Canyon PCJA-00072`（`URCアナログ復刻シリーズ`）那一筆的 Discogs genres 逐字被寫成 `Folk, World, & Country`、styles 空陣列，而同一張碟的原壓是 `Jazz`／`Rock` ＋ 三項 styles**
——**一次復刻就把桶換掉了；若後續批次只打到那一筆，② 款會憑空成立。→ 曲風一律讀原壓那一筆的 `genres`／`styles`，不讀再發那一筆。**
⚠ **同一個形狀的反向也有**：**#18 的 1976 年 `EW-8004` 再壓的 styles 逐字從 `Post Bop` 換成 `Contemporary Jazz`；#7 的 1974 Promo 的 styles 逐字從 `Modal`／`Post Bop` 換成 `Contemporary Jazz`／`Modal`**——**兩筆都還在爵士側，不影響判定，但同一張碟在不同 release 上的 styles 會不一樣這件事要記著。**

---

## 5739　⚠ ⚠ 高碰撞盤名與「曲題撞他卡盤名」：**`chk-prop` 第五道（盤名撞 apex）本組 0 報，但本層人工掃出 7 處必須帶掛名與年份的引用**

**(1) 盤名逐字撞池中既有卡（`chk-prop` 兩道都不亮）**：
- ⚠ ⚠ **#18《Trace》↔ seed 的 `Son Volt《Trace》1995`**——**盤名逐字相同、掛名不同**；**第一道用複合鍵不亮、第五道只比 apex 而 Son Volt 那一列不是 apex，兩道都放行。**
- ⚠ ⚠ **#16《In Person》↔ seed 的 `Bobby Timmons《In Person》1961`**——**同上，盤名逐字相同、掛名不同、兩道都放行。**
  **另 seed 有 `Otis Redding《In Person at the Whisky a Go Go》1968`（本卡盤名是它的子字串）。**
- **#1《Sadao Watanabe》↔ c-173 的 `Charlie Mariano & Sadao Watanabe《Charlie Mariano & Sadao Watanabe》1967`**——**兩張的盤名字串互為子字串、掛名不同。**
**→ 三筆都是第 611 條「`chk-prop` 標記 0 不等於沒撞卡」那一族，都是本層以盤名為主鍵掃全池抓到的。**

**(2) ⚠ ⚠ 曲題撞他卡盤名（第 1948-B 條那一類，六道 dedup 全部抓不到）——本組 4 處，是本線單批最多的一次**：
- ⚠ ⚠ **#4 的末軌曲題逐字〈Mbali Africa〉＝ #13 的盤名《Mbali Africa》**——**同一組、同一位藝人、只差一年、兩張都收。**
- ⚠ ⚠ **#12 的〈Wave 1〉與 #15 的〈Wave II Nehan〉是跨兩張的編號曲，而 `Wave II` 逐字就是池中 c-182 的一張卡的盤名（`ゲイリー・ピーコック / 佐藤允彦 / 富樫雅彦《Wave II》1988`）。**
- ⚠ ⚠ **#18 的第二軌曲題逐字〈Black Daffodils〉，而 Apple jp 上有一張 `益田幹夫《Black Daffodils Mikio Masuda》1998`（`1000585514`，Victor 的選輯）**——**探測層若以曲題查 Apple，極可能配到那張 1998 選輯。**
- **#7 的首軌曲題逐字〈Friends〉，而池中盤名逐字是 `Friends` 的有三張**（見 5725 (2)）。
- ⚠ **卡內自撞 2 處**：**#15 的第四軌〈Keden〉＝本卡盤名**；**#13 的第十二軌〈Mbali Africa〉＝本卡盤名。**

**(3) 極通用的盤名／曲題，下游引用必須帶掛名**：
**#6 的《デマ》（兩個字的日語常用詞）、#12 的〈Oriental〉、#10 的〈Poem〉與〈1st Movement〉、#4 的〈Poem〉（⚠ **與 #10 同題**）、#5 的〈Happy Cruise〉。**
⚠ **`chk-prop` 的第五道在本組逐筆跑過、0 報**——**本組沒有一張碟的盤名逐字撞到 apex 王牌。**
⚠ ⚠ **本組另外避開了兩個碰撞，是靠盤名裁定避開的（見 5725 (2)）**：**#6 若取英文側 `Rumour` 會與 `apex:hall` 的《Rumours》幾乎同名；#7 若取英文側 `Friends` 會與三張同名盤並列。**

---

## 5740　⚠ ⚠ 異體字與人名寫法分裂：**本組查到三組，三組都不入池、都留給本機統一**

| # | 兩種寫法 | 出處逐字 | 本組的處置 |
|---|---|---|---|
| 1 | ⚠ ⚠ **`怪顛`（U+985B）／`怪顚`（U+985A）** | **MB RG title、MB release title、`titleCheck` 三欄、slice `album` 逐字都是 `怪顛`**；**Discogs 原壓的 `title` 逐字是 `怪顚`** | **#15 的盤名取 Discogs 的盤面形 `怪顚`**，依 jp-1 簡報第三節第 5 點逐字「`album` 欄用盤面原題（Discogs 的 `title` 為準）」；**兩種都進 `queryAlias`，不新造第三種** |
| 2 | **`本田竹広`／`本田竹曠`** | **池中 13 列裡 12 列是 `広`、1 列是 `曠`（seed《This Is Honda》1972）**；**MB 實體本名逐字是 `本田竹曠トリオ`（用 `曠`）** | **#2 已退件（撞池），不入池**；**照 c-183 第 5703 條 (1) 留給本機統一** |
| 3 | ⚠ **`佐藤允彦`／`佐藤充彦`** | **MB 實體本名與池中 22 列逐字都是 `允`**；⚠ **Apple jp 兩筆逐字寫 `充`**（`中山千夏 + 佐藤充彦` `1328206410`、`佐藤充彦&中山千夏` `1498162961`）；⚠ **Discogs 在 #6 的 credits 裡把 `佐藤允彦とがらん堂` 的 anv 寫成 `佐藤充彦とがらん堂`** | **本組 #6 的掛名取 `允`**（照第 307 條池中 22 列的多數）；**#11 已退件、不入池**；**`充` 這個誤寫記下來** |

⚠ ⚠ **第 3 組要特別記，因為它是第 1929-B／1940-B 條的一個乾淨應用**：
**`允` 讀 まさひこ（MB alias 逐字有 `さとう まさひこ`）、`充` 常讀 みつひこ**——**照第 1940-B 條第二點「`namevariations` 的漢字要與羅馬字讀音對得上，對不上就是污染」，`允` 是正解**。
⚠ ⚠ **而本組的形狀比 1940-B 那一筆更值得記：污染源不是 Discogs 的藝人頁，是 Apple 的掛名欄與 Discogs 的 anv 欄**
——**同一個誤寫在兩個不同的資料庫、三個不同的欄位上出現。→ 這與 c-183 第 5715 條之外記的 `千野秀一／知野秀一`（同一條線上被改判兩次）是同一族：更正沒有回流到來源。**
⚠ **本組另記三組「來源側的寫法差」，不是分裂、但查詢時會踩到**：
**#5 的 `柳田ヒロ`（MB 與 ja.wikipedia 的條目名逐字是 `柳田 ヒロ`，中間一個空白；本名 `柳田博義`）**、
**#18 的 `益田　幹夫`（slice 的 `artistVariants` 裡有一個帶全形空白 U+3000 的寫法，不採）**、
**#17 的 `峰厚介`／`峰 厚介`／`峰　厚介`（Discogs `namevariations` 三種都有，退件不入池）。**
⚠ **`desc-tools/jp-proper-names.json` 的處理見 5741。**

---

## 5741　`desc-tools/jp-proper-names.json`：**本批 append 0 個，既有的一個都沒動**

**本組 12 筆收件的來源裡出現的專名，逐筆比過該檔之後判定不新增**，理由逐項：
- **場館類**：**`飯野ホール`（#1／#2）、`郵便貯金ホール`（#13／#16）、`新宿アートシアター`（#10）、`厚生年金会館大ホール`（#9，退件）**
  ——**四個都是這個年段的常見場館，本層預期後面批次會反覆出現，但 c-183 第 5683 條已把 `都市センターホール` 登記成候選而沒有加**；**本層照同一個分寸（「本批用不到就不加」）處理**。
  ⚠ ⚠ **但本層要改一句：`郵便貯金ホール` 在本組是兩張收件卡（#13／#16）都用得到的、而且它的 Discogs 寫法逐字是 `Yubin Chokin Hall`／`Yubin-Chokin Hall` 兩種**
  ——**建議主線把它加進去（本層依邊界「只准 append 新字串」本可自行加，但為了讓兩組的變更集中在一次，改成登記給主線，見 5743）。**
- **錄音室類**：**`Aoi Studio`（#15）、`Mouri Studio`（#3，退件）、`CBS/Sony No.1 Studio`（#1／#5／#7）、`Victor Studio`（#18）**——**四個都是拉丁字或已在既有白名單射程內，不需要 `jp-proper-names.json`（那一份是給 `SIMP` 那一道的漢字／假名專名用的）。**
- **團名類**：**`Chambre Symphoniette`（#16 的弦樂團名）、`Time Five`（#14 的和聲組，退件）、`がらん堂`／`市原宏祐オール・スターズ`（#6）、`ニュー・ディレクション・フォー・ジ・アーツ`／`ナウ・ミュージック・アンサンブル`（#10）**
  ——⚠ ⚠ **後四個是漢字／片假名的團名，而且 #6 與 #10 兩張卡的正文很可能會用到**。**本層仍不加，理由是它們會以「引號包起來」的形式出現、`stripLegit` 那一道會剝掉**（第 1941-B 條第三點記的機制）；
  ⚠ **但若寫作層報說被 `SIMP` 誤報，這四個是第一順位的候選，已登記。**
⚠ **既有字串一個都沒有刪改。** ⚠ ⚠ **併記一個數字上的差異**：**c-183 第 5709 條逐字說「本批 append 2 個（`テイチク会館スタジオ`／`テイチク会館`），既有 61 個一個都沒動」＝累計 63**，**而本層在 2026-09-25 讀到的 `desc-tools/jp-proper-names.json` 逐字是 65 筆（`テイチク会館スタジオ`／`テイチク会館` 兩筆都在）**——**也就是說 c-183 之後又有 2 筆被加進去**（**可能是本批 b 組或主線加的**）。**本層照邊界「只准 append 新字串、不准刪改既有的」一個字都沒有動它，也沒有去追那 2 筆是誰加的。**
⚠ ⚠ **本層刻意不 append 的第二個理由要寫明**：**本批兩組同時在跑，而這一份是整檔讀寫的 JSON 陣列**——**兩組若各自 read-modify-write，後寫的那一方會把先寫的那一筆蓋掉**（**與 `rulings.md` 同一個併發風險，而 `rulings.md` 至少可以 append 一段文字、JSON 陣列不行**）。**→ 建議主線把這一份的變更收成「每批只由一個人、在兩組都交件之後動一次」，或改成逐行的 `.txt` 讓 append 安全。**

---

## 5742　交件前自跑的結果與第 315 條結算

- **`node batch-progress/c184/chk-prop.mjs a`** → 逐字「**prop-a.json：12 張、11 位**」、「**合計 12 張、11 位｜標記 0**」。
  **八道全部乾淨**：缺欄、曲風越界、年份離譜、非 ASCII 連字號（盤名與掛名兩道）、U+30FC 誤用、合輯例外欄位、與線上池撞卡、跨組重複。
  ⚠ **「（報告）含日文分隔符 〜／～／＝／゠／＋」那一行本組一次都沒有出現**——**本組五個聯名用的是 ` Meets `／`, `／` & `，都不在那個字元類裡**
  （⚠ **注意：#15 的盤名 `怪顚` 與 #11 退件的 MB joinphrase `＋`(U+FF0B) 都在那個字元類的射程邊上，但 #15 的盤名不含那些字元、#11 是退件不入卡**）。
  ⚠ **「盤名撞 apex（掛名不同，只報不擋）」那一道 0 處**（⚠ **但本層人工掃出 7 處必須帶掛名與年份的引用，見 5739——那一道只比 apex，池中的普卡同名它不看**）。
  ⚠ ⚠ **中途有一次「共用目錄號 SOLL74002」的誤報，已修**：**成因是本層在 #6 的 `label` 欄裡逐字引了同組 #0 的目錄號當系列說明**
  ——**這正是 c-183 第 5714 條末段逐字警告的那一件（「`label` 欄不要逐字寫別張卡的目錄號，`dedup` 的第四道會誤報」）**。
  **本層第一版就踩了一次、改成不逐字重複那個號碼即可（說明的內容沒有減少），重跑後那一道回到 0。**
  ⚠ ⚠ **記給後面批次：這一條在 c-183 記過一次、c-184 又踩一次——它不是偶發，而是「同批兩張同系列的碟」這個形狀必然會誘發的寫法。建議把它寫進簡報第四節的交付清單。**
- **`node batch-progress/dedup-crossbatch.mjs c184`** → 逐字「**1 批（其中 1 批讀 prop）｜卡數 24｜跨批撞卡 0｜同 rgMbid 不同掛名 0｜同掛名盤名詞元包含 0｜共用目錄號 0**」。
- **chk-prop 串跑的全庫版**（147 批、卡數 5,614）→ **跨批撞卡 0、同 rgMbid 不同掛名 0、同掛名盤名詞元包含 0、共用目錄號 0。**
- **第 315 條結算：`prop-a.json` 12 筆 ＋ 5716 退表 7 筆 ＝ slice `g:"a"` 19 筆。✔**

⚠ ⚠ **提醒下游：本組「標記 0」的含金量與 c-183 一樣低。**
**5717 與 5718 兩筆真撞池，`chk-prop` 的複合鍵與 `dedup` 的六道全部抓不到**——**是本層以盤名為主鍵掃全池、並靠 Discogs 藝人頁查出漢字名才抓出來的**（第 611 條的第 N 個實例）。
⚠ **另有 3 處「盤名逐字撞池中普卡」也是兩道都放行的**（#18 ↔ `Son Volt《Trace》`、#16 ↔ `Bobby Timmons《In Person》`、#1 ↔ c-173 那張）——**見 5739。**

---

## 5743　⚠ 登記給主線與後續批次的候選

**(1) ⚠ ⚠ 加進 c-174 a 第 3787 條那份「外國藝人在日本錄的本土企劃盤」清單（兩筆，兩筆都是日本原盤、不是壓片）**：
- ⚠ ⚠ **`Trio Records PA-3004〜5`（`Cecil Taylor Unit —《Akisakila: Cecil Taylor Unit in Japan》`，1973）**
  ——**全世界唯一的原盤（最早的他國版是 1992 年德國 Konnex 的兩張 CD）、Discogs 13 版、Trio 自己企劃自己錄自己壓（連刻片與壓片都在 JVC）**；
  **與 c-183 第 5715 條登記的 `CBS/Sony SOPL-20-XJ`（Circle）是同一個理由、同一種強度——第 3787 條末段講的「要不要另立一線」，這兩張是目前最強的兩個理由。**
- **`Sony YFSC-21`（`Sonia Rosa With Yuji Ohno —《Spiced With Brazil》`，1974）**
  ——⚠ **但它與上一筆不同族**：**上一筆是「外國樂團來日本演出、日本廠牌做成唯一原盤」，本筆是「長住日本的外國歌手 ＋ 日本編曲家的日本企劃盤」**。
  ⚠ ⚠ **後者在本線是一整族**（`enum/jp-2.md` 的 217 張外國藝人盤裡有一批是這一族）——**建議主線在第 3787 條下單獨開一格，因為兩族的第 4106 條四項分佈不同。**

**(2) ⚠ ⚠ §1 補遺候選（MB 查無或本批 slice 沒切到，但已查到廠牌、年份與目錄號）**：
- ⚠ ⚠ **`CBS/Sony SOCO 105`＝`クリス・ヒンゼ X 芝祐靖 & 豊英秋 & 大窪永夫 —《萬華 = Mange》`（1974，Discogs releases/9755109、`master_id` 0）**
  ——**「邦楽器とジャズ・フルートのスーパー・セッション3部作」的第三張，本批收了第一、二張（#12／#15）而它不在 slice 裡**；
  **若不補，池中會出現一條缺第三張的三部作。** ⚠ **掛名結構已查好（四方、兩種分隔符 `X` 與 `&`），照 5729 的規則處理即可。**
- **`Trio Records PA-3159`＝`佐藤允彦 + 富樫雅彦 —《双晶 = Sohsyoh》`（Discogs master 790551，另有 1999 `Absord ABCJ-77` 與 2007 `ABCJ-440` 兩次 CD 復刻）**
  ——**與本組 #10 同一條 `Jazz Chaos Of Japan` 再壓線，兩位都是池中已有的藝人（佐藤允彦 22 列、富樫雅彦 含一張 `apex:pearl`）**；**本層沒有查它在不在後面批次的 slice 裡。**

**(3) ⚠ 給 `desc-tools/jp-proper-names.json` 的候選（本層照邊界與併發風險沒有自行 append，見 5741）**：
- **第一順位：`郵便貯金ホール`**（**本組兩張收件卡 #13／#16 的錄音場地，Discogs 逐字寫成 `Yubin Chokin Hall` 與 `Yubin-Chokin Hall` 兩種**）。
- **第二順位：`飯野ホール`（#1，另 #2 退件也是）、`新宿アートシアター`（#10）。**
- **第三順位（團名，若寫作層報 `SIMP` 誤報再加）：`がらん堂`／`市原宏祐オール・スターズ`（#6）、`ニュー・ディレクション・フォー・ジ・アーツ`／`ナウ・ミュージック・アンサンブル`（#10）。**

**(4) ⚠ 三組寫法分裂留給本機統一（本批都不入池）**：
**`本田竹広`／`本田竹曠`、`佐藤允彦`／`佐藤充彦`、`怪顛`／`怪顚`**——**逐條依據見 5740。**

**(5) ⚠ 給本機（不在雲端做）**：
- ⚠ ⚠ **本組 #13《Mbali Africa》與 #4《Kenya Ya Africa》兩張卡的錄音日是「同月同日、相差一年、不同場館」（1974-09-20 郵便貯金ホール ／ 1973-09-20 飯野ホール），而且掛名一個是單人一個是聯名**
  ——**上傳時人工看一眼這兩張的正文有沒有把場館寫混。**
- ⚠ **#4 的掛名 `渡辺貞夫 Meets Inter-African Theatre Group` 是本線第一個用 ` Meets ` 的字串**，**而池中既有的三個 ` Meets ` 串裡有一個是 `Jackie McLean Meets Junko Onishi`**
  ——**若本機日後要統一大小寫（`Meets`／`meets` 池中兩種都有），本卡這一串是可逆的。**

---

## 5744　⚠ 給 c-185…c-191 的操作提醒（十條，照重要性排）

1. ⚠ ⚠ **`live: false` 一樣要逐筆讀 Discogs 原壓的 `notes`**（5726）——**本組 19 張裡 3 張（16%）是漏標的實況盤，三筆的 MB `secondary-types` 全部是空陣列、slice 的 `note` 全部空白，機器一個字都沒報。**
   **一條 `/\brecorded live\b/i`／`実況`／`ライヴ`／`Recital` 的子字串掃描就會全部命中。**
2. ⚠ ⚠ **`poolRecheck` 的兩個修法要各自做，過了一個不代表過了另一個**（5731）：
   **(a) 前綴比對要做雙向，後綴清單要加 `ユニット`**；**(b) 「變體全是羅馬字」的警語條件要寫成「`country` 明確是非 JP 的才不發」——把 null 也算成非 JP 會漏掉真撞池。**
   ⚠ **第三件零成本的：把上一批 `rulings.md` 裡逐字出現過的「池中 N 列」清單餵回切批腳本**（**本組 #2 就是上一批已經寫進裁定、本批仍被切進來的**）。
3. ⚠ ⚠ **MB 的 `country`／`area` 可能是居住國而不是國籍，第 5679 條的修法擋不住**（5732）——**`artist` 端點多取 `begin-area`，`country` 是 `JP` 而 `begin-area` 不在日本的一律標「待人工判」。**
   **本線長住日本的外國樂手是一整族。**
4. ⚠ ⚠ **c-183 第 5685 條第 3 點那個固定動作在本批第一次救到卡，而且一次救兩張**（5731）——
   **`house` 是 Union／Trio／East Wind／Frasco 的每一筆，都要以盤名為主鍵掃一次全池、兩種文字系統都試。請寫進每一批的派工特注。**
5. ⚠ ⚠ **`q=` 之後不只要讀 `type`，還要逐筆比 `master_id`**（5734 (4)）——**本組兩筆的 `q=` 結果裡混進了別的 master 的 release，不比會虛報 3 版與 1 版。**
6. ⚠ **`catno=` 反查回 0 筆時不要直接判「Discogs 查無」**（5734 (1)）——**本組抓到第四種失效：MB 的 catno 欄字母倒置（`YSFC-21` ／ `YFSC-21`）。先改用 `q=<羅馬字掛名> <盤名>`。**
7. ⚠ **CBS/Sony 的 `23AP`／`25AP`／`38AP`／`18AH`／`28AH` 五個廉價再發號段是這個年段最大的版本數漏源**（5727）——**本組七張 CBS/Sony 收件裡四張的低估全部來自它。**
8. ⚠ ⚠ **c-183 第 5676 條第 2 點那個「RG tags 含非爵士標籤 → 退件率 86%」的快篩在 1972–76 年段掉到 50%，不能再用**（5730）
   ——**這個年段的 `jazz rock`／`prog rock` 並列是一條正當的線，1966–70 年段的 `rock` 標籤才多半是歌謡曲盤。**
9. ⚠ **`label` 欄不要逐字寫別張卡的目錄號**（5742）——**c-183 記過一次、本組又踩一次，「同批兩張同系列的碟」這個形狀必然會誘發它。**
10. ⚠ **Apple jp 的覆蓋率是「廠牌 × 藝人」級的，不是年段級的**（5737）——**同一家 CBS/Sony、同一個 1972–74 年段，`渡辺貞夫` 三張全部 0 命中而 `笠井紀美子` 五張在架上。**
    ⚠ **而 `resultCount > 0` 不等於命中：和文查詢會回一整頁毫不相干的碟（本組 #12 回了四張歐洲古典盤）。**
⚠ **另記兩件本組驗到的好消息**：
- **`Trio` 這家的 MB 建檔品質確實如簡報〇節所說（本組四張的版本表都完整）**；**`East Wind` 也是（兩張的六版都在）。**
- **`Denon` 的 `CD-xxxx` 反查坑（第 5715 條第 3 點）在本組沒有踩到**——**本組唯一的 Denon（#8）是 `OP-` 號段，`q=` 一次就命中。**

---

## 5745　⚠ ⚠ 建議主線覆核的清單（五件，全部已就地決定並可逆，本層只請覆核）

1. ⚠ ⚠ ⚠ **`live` 欄的反向漏標（5726）——本組 3 筆改判，而簡報第三節第 3 點沒有這一格。**
   **這是本組唯一一件「會讓下游整批寫錯」的發現**：三張都是東京的音樂會實況，若照 slice 當錄音室盤寫，三張的正文全錯。
   **請主線裁定要不要把那一段補一句，並考慮在切批腳本加那一條 regex。**
2. ⚠ ⚠ ⚠ **MB `country` 欄的第三種失效（5732）——影響範圍是整條 jp-2 線的 547 張，不只本批。**
   **第 5679 條的修法（「只認掛名藝人的 `country`」）擋不住「MB 把居住國寫進 `country`」這一種**；**建議用 `begin-area` 對整條線回掃一次。**
3. ⚠ ⚠ **c-183 b 第 5701 條的乙列舉缺一格：巴西 MPB（5723 (1) 與 5730）。**
   **本組 #14 的兩種量法差 23 個百分點（甲 6／乙 3＝33% vs 甲 4／乙 5＝56%），剛好跨過「> 一半」那條線。**
   ⚠ **本筆最後是退在外國藝人那一關、不是退在第三肢，所以這一格在本組沒有改變結果**——**但下一次撞到「巴西歌手 ＋ 日本編曲家」而四項 ≥ 3/4 的碟，它就會決定收退。**
   **本層照第 5701 條第四節自己的量法（該節把〈The Girl From Ipanema〉〈Manhã De Carnaval〉〈Meditation〉列為甲）把 Jobim／Bonfá／Edu Lobo 一系算成甲，請主線確認或補一句。**
4. ⚠ ⚠ **兩筆「日語人聲盤」的退件，請與 c-183 第 5694 條一起看（5719／5722）**：
   **#3 `柳田ヒロ《HIRO》`**——**退的是一張原壓廠牌（URC）過關、曲風過關、伴奏陣容是本組最強（宮沢昭・市原宏祐・村岡健・伏見哲夫・杉本喜代志・高中正義・石川晶 等二十位）的碟**，
   **只敗在「領銜者自己的第一個 credit 是 `Vocals`、十一軌是他自唱的日語歌曲」。**
   ⚠ ⚠ **本層把分界寫得比 5694 更硬，因為本組同時收了同一位藝人半年後的器樂盤（#5《Hirocosmos》，零 `Vocals` credit、七軌英文器樂題）**
   ——**同一個人、同一組班底裡的一半人、一收一退。若主線認為「爵士銅管組 ＋ 自作曲」足以讓自唱盤通過第三肢，要翻的是 #3、#11 與 c-183 的 5694 三張。**
   **#11 `中山千夏＋佐藤允彦《ふたりのひとりごと》`**——**退得比 #3 乾淨（① ② 兩款成立 ＋ 盤面 `extraartists` 整欄是空的），但它退掉的是池中 22 列的 佐藤允彦 參與的碟。**
5. ⚠ ⚠ **一筆收件的門檻擦邊：#15《怪顚》的領銜方是外國人（5733）。**
   **MB 與 Discogs 兩家都把 Chris Hinze 排在第一位，本卡靠「作曲 8 軌裡 5 軌是日本人」補回四項 3/4。**
   **若主線把第 4106 條的「領銜」升格成硬門（領銜必須在日本側），要翻的就是這一張**（**同系列第一張 #12 的領銜是 山本邦山，不受影響**）。
⚠ **另有一件不需要裁定、只請記錄的：5729 對 c-183 第 5703 條末段「`meets` 沒有被立成第十種分隔符」那句話的事實更正**
——**該條的處置仍然成立（保守選擇），但理由「池中沒有這種分隔符」不成立：池中本來就有三個 ` Meets ` 串。**

---

# a 組研究層（5776–5805）

批次 c-184｜a 組 12 張（收件全表；日本爵士獨立廠牌線 jp-2 第二批、1972–1976 年段）｜研究層｜2026-09-25
輸入：`desc-tools/batches/cards/c184-cards.json` 的 `group === "a"` 12 筆
輸出：`desc-tools/batches/research/c184-a.json`
規則照 `desc-tools/prompts/research-base.md`（含開頭「雲端 Blue Note 線的三處例外」：產出直接寫進 repo、
每張 8–12 條 `facts` ＋ 完整 https `src`、`key` 從卡單逐字複製、`status` 與 `coverage` 並存）。
並讀 `batch-progress/CURATION-BRIEF-jp1.md` 第〇節與 `CURATION-BRIEF-bluenote-post1985.md` 附錄二、
本檔全檔（策展兩組 5716–5775）、`c163/rulings-mainline.md` 第 1934-B…1963-B 條、`c178/rulings.md` 的研究層兩段。

## 5776　總表：**12 張，facts 合計 144 條、每張恰好 12 條；full 12、thin 0；推翻策展層 24 處**

| # | 掛名 —《盤名》 | facts | status | 本層最值錢的一格 |
|---|---|---:|---|---|
| 0 | Love Live Life —《殺人十章》 | 12 | full | 團員名單的射程收窄（MB 的八人是團的名單、不是本盤編制）；⚠ **推翻卡單一處人名** |
| 1 | 渡辺貞夫 —《Sadao Watanabe》 | 12 | full | 他 1961 年的**第一張領銜作也叫《渡辺貞夫》**，同名盤相隔十一年 |
| 4 | 渡辺貞夫 Meets…—《Kenya Ya Africa》 | 12 | full | ⚠ ⚠ **鼓手 渡辺文男 是領銜者的弟弟**；貝斯手 鈴木良雄 一個月後就赴美；**推翻卡單兩處人名** |
| 5 | 柳田ヒロ —《Hirocosmos》 | 12 | full | ⚠ **是他的第四張個人專輯、四張換四家廠牌**；ja 維基那個「4 月 1 日」是填充值（新證據）；**推翻卡單一處人名** |
| 6 | 筒井康隆, 市原宏祐, 佐藤允彦 —《デマ》 | 12 | full | 同題的《デマ 実験小説集》**比唱片晚一年**；**推翻卡單兩處人名** |
| 7 | 鈴木良雄 —《フレンズ》 | 12 | full | ⚠ ⚠ **祖父是鈴木バイオリン創業者、叔父是スズキ・メソード 創始者；改彈貝斯是 渡辺貞夫 建議的**；**推翻卡單兩處人名** |
| 10 | Various Artists —《Inspiration & Power 14…》 | 12 | full | ⚠ ⚠ **開場的ニューハード 與盤上出現兩次的 佐藤允彦，1971 年一起替 Charles Mingus 錄過音**（雙來源）；**推翻卡單一處人名** |
| 12 | 山本邦山 & Chris Hinze —《去来 Kyorai》 | 12 | full | ⚠ **1964 年「民族音楽の会」把本系列前兩張的三位日本演奏者串在一起** |
| 13 | 渡辺貞夫 —《Mbali Africa》 | 12 | full | ⚠ ⚠ **富樫雅彦 1970 年失去雙腿功能、自造鼓組十八個月後回台，本盤他打的是打擊**；**推翻卡單一處人名** |
| 15 | Chris Hinze, 沢井忠夫, 山本邦山 —《怪顚》 | 12 | full | ⚠ **沢井忠夫 拿鼓棒敲箏弦**；⚠ **推翻卡單一處人名 ＋ 兩處判定「查不到、不寫」** |
| 16 | 笠井紀美子 & Oliver Nelson —《In Person》 | 12 | full | ⚠ ⚠ ⚠ **Nelson 1952 年在東京聽了一場交響樂音樂會，那是他決定當作曲家的時刻——二十一年後他回到東京指揮**；**推翻卡單一處人名** |
| 18 | 益田幹夫 —《Trace》 | 12 | full | ⚠ ⚠ **伊藤八十八 就是在日本フォノグラム 設立 East Wind 的人**；**推翻卡單一處人名 ＋ 一處存疑不寫** |

**thin 0 張。** `src` 的相異網域數每張 2 到 4 家（`www.discogs.com` 100 條、`ja.wikipedia.org` 32、`en.wikipedia.org` 6、`music.apple.com` 3、`www.sonymusic.co.jp` 3）。

---

## 5777　⚠ ⚠ **推翻策展層總表：24 處，其中 16 處是硬錯（人名猜字）、3 處是期別形、5 處是「查不到、整格不寫」**

| 類 | 處數 | 內容 |
|---|---:|---|
| **人名猜字（硬錯）** | **16** | `鈴木朋夫 → 鈴木智雄`（5 張）、`森崎雄幸 → 守崎幸夫`（3 張）、`川原直美／川原真澄 → 川原正美`（2 張）、`田中穂積 → 田中保積`（2 張）、`田中光和 → 田中三一`（1 張）、`新井田郁夫 → 新居田郁夫`（1 張）、`高平哲郎` 存疑（1 張）、`荒井邦夫` 存疑（1 張） |
| **期別形（兩形皆非誤）** | **3** | `本田竹広 → 本田竹曠`（3 張，1973–74 年段的藝名） |
| **查不到、整格不寫** | **5** | `寺田有恒`（#15 封面設計）、`松田正人`（#15 監修，Discogs 錯釘）、`山崎比呂志` 的期別形（#10）、`前島祐一／裕一／雄一`（#5 錄音）、`得広崇／徳広崇／徳広晃志`（#10 貝斯） |

⚠ ⚠ **十六處人名全部是同一個機制：從 Discogs 的羅馬字逆推漢字時選錯同音字**（第 1919-B 條逐字記過的那一個）。
**本層的固定動作是照第 1929-B／1890-B 條回打 `api.discogs.com/artists/<id>`，取 `realname` 與 `namevariations` 兩欄**
——**本批共打 188 個藝人頁（187 個來自十二張碟的 `artists`／`extraartists`／逐軌 credits，另 1 個是為了查 山下洋輔トリオ 的原始編制補打的）。**
⚠ ⚠ **射程確認：派工信第四節說「範圍不只樂手——製作人／A&R／工程師／解說者都要」，本批十六處裡有九處是幕後**
（錄音師 5、製作 3、插畫 1）——**幕後那一側的命中率比樂手側高，因為池中沒有他們的既有寫法可以對照。**

---

## 5778　⚠ ⚠ `川原正美`：**同一個人在同一批的兩張卡上被寫成兩種不同的錯字，而讀音判準一次就分得開**

| 出處 | 逐字 | 讀音 |
|---|---|---|
| 卡單 #0 的 `curatorWhy` | **`川原直美`** | 直美 ＝ なおみ |
| 卡單 #5 的 `curatorWhy` | **`川原真澄`** | 真澄 ＝ ますみ |
| **Discogs `artists/661603` 的 `realname`** | **`川原 正美 (Kawahara Masami)`** | **正美 ＝ まさみ ✔** |
| 同頁 `namevariations` | `M. Kawahara`／`マサミ・カワハラ`／`川原 正美`／`川原正美`／`河原正美` | **三個漢字形全是「正美」** |
| 盤面 credit | `Masami Kawahara` | — |

**→ 照第 1940-B 條第二點（`namevariations` 的漢字要與羅馬字讀音對得上），`正美` 是唯一對得上 Masami 的一個。本層取 `川原正美`。**
⚠ ⚠ **這兩個錯字有來源，而且來源互相矛盾**：**MB 的 `member of band` 關係逐字寫 `川原直美`**；
**日文維基「柳田ヒロ」條目自己在 LOVE LIVE LIFE 那一節寫 `川原直美`、在 HIROCOSMOS 那一節寫 `川原正美`——同一個條目兩節打架。**
**→ 記成判準：MB 的 artist-rels 裡的漢字名不是第一手，它與 ja 維基一樣會抄到同音錯字；人名一律以 Discogs 藝人頁的 `realname` 為準，並用讀音反驗。**
⚠ **`川原直美` 這個字串本層已放進 #0 的 notes，下游若在別處看到它要知道它指的是同一個人。**

---

## 5779　⚠ ⚠ `鈴木智雄`（不是 `鈴木朋夫`）：**本批單一誤寫跨最多卡的一處，五張**

**卡單 #4／#7／#13／#15／#16 的 `curatorWhy` 全部把 CBS/Sony 的錄音師 `Tomoo Suzuki` 寫成「鈴木朋夫」。**
**Discogs `artists/406488` 的 `realname` 逐字 `鈴木智雄`、`namevariations` 十二個字串裡的三個漢字形逐字是 `TOM鈴木`／`鈴木智男`／`鈴木智雄`——零個「朋夫」。**
⚠ **讀音那一關在本筆分不開**（朋夫 與 智雄 都讀 ともお）——**分得開的是「來源有沒有寫過這個字串」。**
**→ 記成判準：讀音對得上不等於是對的字；`namevariations` 是一份實際出現過的字串清單，沒有出現過的寫法一律不採。**
⚠ **附帶的來源收穫**：**同一頁的 profile 逐字「Joined CBS/Sony as an engineer in 1968, became chief engineer at the Sony Shinanomachi studio in 1980」**
——**他是本組七張 CBS/Sony 收件裡四張的錄音師（#7／#13／#15／#16），是這一批最強的一條幕後串連點**（見 5793）。

---

## 5780　⚠ `守崎幸夫`（不是 `森崎雄幸`）：**姓與名兩邊都錯，跨三張卡**

**卡單 #4／#7／#18 把 `Yukio Morisaki` 寫成「森崎雄幸」。**
**Discogs `artists/1142677` 沒有 `realname`，`namevariations` 六個字串裡的兩個漢字形逐字是 `守崎 幸夫`／`守崎幸夫`，profile 逐字 `Japanese Executive-Producer`。**
⚠ **讀音那一關在名那一側分得開**：**`雄幸` 讀 かつゆき／たけゆき，讀不出 Yukio；`幸夫` 讀 ゆきお ✔**；
**姓那一側兩形同音（守崎／森崎 都讀 もりさき），靠的仍然是「來源寫過哪一個」。**
**→ 本層取 `守崎幸夫`。** ⚠ **他在本組的角色是 #4 製作、#7 助理製作、#16 製作、#18 助理製作——四張，是第二強的幕後串連點。**

---

## 5781　⚠ `田中保積` 與 `田中三一`：**同一張卡上的兩個 田中，兩個都被猜錯，而失效機制不同**

1. **`Hozumi Tanaka`**：卡單 #6 與 #10 寫「田中穂積」，**Discogs `artists/873126` 的 `realname` 逐字 `田中保積 (Hozumi Tanaka)`、`namevariations` 只有一個字串 `田中保積`**，profile 逐字「Japanese free jazz drummer. Born August 18, 1949.」
   ⚠ **讀音同（穂積／保積 都讀 ほづみ）——又是「來源寫過哪一個」那一種。**
2. **`Mitsukazu Tanaka`**：卡單 #6 寫「田中光和」，**Discogs `artists/400295` 的 `realname` 逐字 `田中 三一 (Tanaka Mitsukazu)`**，
   **二十多個別名裡的六個漢字形全部是「三一」，而且其中有 `田中 "Quincy" 三一`／`田中”クインシー”三一`**——**他在日本錄音室圈的綽號是 Quincy。**
   ⚠ ⚠ **這一處的錯法比前一種嚴重**：**「三一」讀 さんいち／みつかず 兩可，而「光和」是一個完全不同的名字**；
   **別名裡另有 `Sanichi Tanaka`／`Tanaka Sanichi` 兩個羅馬字形，直接證明漢字是「三一」。**

---

## 5782　⚠ ⚠ **第三種失效：Discogs 自己把 credit 釘到錯的藝人實體上——本批一處，而且可以用生年直接證偽**

**卡單 #15 把監修（Director）的 `Masato Matsuda` 寫成「松田正人」。**
**盤面的 anv 逐字是 `Masao Matsuda`，而 Discogs 連到的實體 `artists/487807` 的 profile 逐字是
「Japanese keyboardist. Born February 25, 1956.」、`realname` 逐字 `Masato Matsuda = 松田真人`。**
**→ 1974 年 CBS/Sony 的監修不可能是一個 1956 年生的人（當時十八歲）。本層判這是 Discogs 的錯釘**
（**同一個實體的 `namevariations` 裡同時掛著 `Masao Matsuda` 與 `松田真人`、`石元 丈晴`——是把幾個不同的人合進一個實體**）。
**→ 本層對這一格的處置是「兩個漢字名都不寫」**（策展層寫的「松田正人」沒有任何來源、Discogs 的「松田真人」是錯釘的那個人）。
⚠ ⚠ **記成固定動作：從 Discogs 藝人頁取漢字名之前，先用生年／卒年對一次錄音年**——
**這是第 1940-B 條第二點（讀音反驗）之外的第二道、而且成本更低：一個 1956 年生的人不可能監修 1974 年的盤。**
⚠ **同一張卡另有一處純粹的查無**：**封面設計的 `Aritsune Terada`（`artists/2143832`）的 `realname` 與 `namevariations` 兩欄都是空的、profile 只有一行「Visual artist from Japan」**
——**策展層寫的「寺田有恒」查不到來源，本層整格不寫。**

---

## 5783　⚠ ⚠ `本田竹曠`：**第 1957-B 條「三個時期的藝名」的實地執行，本批三張**

**卡單 #4／#7／#13 都寫「本田竹広」。第 1957-B 條逐字裁定過：`本田竹広`／`本田竹彦`／`本田竹曠` 是三個時期的藝名、本名 `本田昂`，不是異體字分裂。**
**本層查的是「1973–74 年用的是哪一個」，兩個第一手都指向 `曠`**：
- **MB 實體本名逐字 `本田竹曠`**（策展層自己在 #2 的退件條裡也記了這一點）；
- ⚠ ⚠ **日文維基「渡辺貞夫」條目的作品表是按年排的，而它逐字在 1973 年《オープン・ロード》、1973 年《ケニヤ・ヤ・アフリカ》、1974 年《ムバリ・アフリカ》、1975 年《スイス・エア》、1975 年《パモジャ》、1976 年《リサイタル》六筆寫 `本田竹曠`，到 1977 年《ライヴ・イン根室1977》那一筆才改寫 `本田竹広`**
  ——**同一個條目自己標出了改名的時點，落在 1976 與 1977 之間。**
- **Discogs `artists/788556` 的 `realname` 逐字 `本田昂 (Honda Takashi)`、`namevariations` 三形都在**，與第 1957-B 條一致。

**→ 本層在 #4／#7／#13 的 facts 用 `本田竹曠`，並在三張的 notes 逐字寫明「池中 13 列有 12 列是 `本田竹広`，下游若要與池一致可改寫，兩形都不是誤寫」。**
⚠ ⚠ **這一格請主線裁定要不要統一**：**照期別形寫（本層的做法）對 1973–74 這一段是對的，但會讓本批三張與池中 12 列不一致**；
**照池中多數寫則會把 1977 年以後的藝名倒掛回 1973 年的盤**。**兩邊都可逆（改的是 `facts` 的字串），本層選了前者並全部標注。**

---

## 5784　⚠ `山崎比呂志` 的期別形：**卡單用的是他現在的名字，1973 年的盤面用的是前一個**

**Discogs `artists/440188` 的 profile 逐字：「Yamazaki has played under several different names over the course of his career: his real name Yasuhiro Yamazaki (山崎泰弘), Hiroshi Yamazaki (山崎弘), and he now plays under Hiroshi Yamazaki (山崎比呂志).」**
**本盤（#10 的 C2 段）的盤面 credit 逐字是 `Hiroshi Yamazaki`——對應的期別形是 `山崎弘`，而卡單寫的是 `山崎比呂志`。**
**本層的處置：他只是八組之一裡的一位打擊手，`facts` 整格不寫他的名字，期別形記在這裡。**
⚠ **記成判準：日本樂手的漢字名要連「哪一年用哪一個」一起查**——**本批兩處（本條與 5783）都是同一個形狀，而兩處的來源都在 Discogs 藝人頁或 ja 維基的按年表上。**

---

## 5785　⚠ 再發版本數：**9 筆有 master 頁的收件逐筆重跑 `/masters/<id>/versions?per_page=100`，數字改判 0 筆；3 筆無 master 頁維持**

| # | 盤 | master | 策展層記 | 本層重跑 | 差 |
|---:|---|---:|---:|---:|---:|
| 0 | 殺人十章 | 無 | —（資料庫裡只有這一筆） | **同** | 0 |
| 1 | Sadao Watanabe | 538698 | 8 | **8** | 0 |
| 4 | Kenya Ya Africa | 827658 | 6 | **6** | 0 |
| 5 | Hirocosmos | 817547 | 3 | **3** | 0 |
| 6 | デマ | 731942 | 3 | **3** | 0 |
| 7 | フレンズ | 848547 | 4 | **4** | 0 |
| 10 | Inspiration & Power 14… | 60647 | 8 | **8** | 0 |
| 12 | 去来 Kyorai | 無 | —（資料庫裡只有這一筆） | **同** | 0 |
| 13 | Mbali Africa | 469790 | 6 | **6** | 0 |
| 15 | 怪顚 | 無 | —（資料庫裡只有這一筆） | **同** | 0 |
| 16 | In Person | 865275 | 7 | **7** | 0 |
| 18 | Trace | 799622 | 6 | **6** | 0 |
| | **合計** | | **51** | **51** | **0** |

→ **c-176 a 第 4317 條、c-177 a 第 4567 條、c-178 a 第 4777 條的結論在本批第四次成立：策展層自己跑完版本表之後，研究層的重跑就是純覆核。**
⚠ **`#13` 的比 `master_id` 那一道本層也重做了**（`q=Sadao Watanabe Mbali Africa` 的結果裡混著 master 590775 那張 1981 年選輯的一筆），**不比會虛報一版，與策展層第 5734 條 (4) 一致。**
⚠ **三筆無 master 頁的（#0／#12／#15）一律照第 1879-B 條在 `facts` 寫「資料庫裡只有這一筆」，三張都沒有寫「沒有再發」。**

---

## 5786　⚠ ⚠ **但派工信第二節警告的那個形狀本批中了兩次，兩次都是第 1957-B 條那個「結構性」的那一種**

**派工信逐字：「跑完 `versions` 之後，再看一次 Apple／串流有沒有版本表沒收的數位版」（主線第 1957-B 條：Discogs 的 `versions` 表本來就不收數位發行）。**
**本層對十二張逐張做完這一步，抓到兩筆**：

| # | 盤 | Apple jp | 在版本表裡嗎 | 逐字 |
|---:|---|---|---|---|
| 16 | In Person | `1655614452`《イン・パーソン》 | ⚠ ⚠ **不在**（七版全是黑膠與 CD） | `trackCount` 13 與原壓相符；℗ 逐字 `1973 Sony Music Labels Inc.` |
| 18 | Trace | `1443285979`《Trace》 | ⚠ ⚠ **不在**（六版全是黑膠與 CD） | `trackCount` 6、`releaseDate` 逐字 `1974-11-05`、℗ 逐字 `1974 Universal Classics & Jazz` |
| 10 | Inspiration & Power 14… | `1329690700` | **在**（對應版本表裡 2010 年那筆 Trio CD `ARTD5555-56`／`PA-3157-58`） | `releaseDate` 逐字 `2010-06-16` |

**→ 本組的已知版本數：#16 是 7 版 ＋ 1 個數位版、#18 是 6 版 ＋ 1 個數位版；#10 的 Apple 條目不另計。**
⚠ ⚠ **這與 c-178 第 4777 條抓到的那一種（`columbia.jp` 上的配信限定版，Discogs 漏建）不同形**：
**那一種是「Discogs 該建而沒建」，本組這兩筆是「Discogs 結構上不建」——策展層第 5737 條已經把兩筆 Apple 條目逐字記下來了，但沒有把它們讀成版本數的一格。**
**→ 記成固定動作的補充：策展層記到 Apple 條目時，順手比一次它在不在版本表裡；在表裡的寫成再發日、不在表裡的就是第 1957-B 條那一格。**
⚠ **另記一筆反向的觀察**：**本組十二張裡只有三張有 Apple 條目，而其中兩張的條目都不在版本表裡（2/3）**——
**這個比例比 c-183 b 組的 5/5 低，但方向相同；`CBS/Sony`／`East Wind` 這兩家的數位重發都沒有進 Discogs。**

---

## 5787　⚠ Apple jp 覆核：**命中 3/12（25%），與策展層第 5737 條逐筆相符；本次工作階段 403 零次、429 零次**

**本層以「和文掛名＋盤名」與「羅馬字掛名＋盤名」兩種查法各查一輪，共二十四次查詢、節流 1.4 秒**：
- **命中 3 筆**：#10（`Inspiration & Power 14 Free Jazz Festival` 英文題命中、和文題 `インスピレーション＆パワー14` 回 0）、
  #16（`笠井紀美子 イン・パーソン` 與 `Kimiko Kasai In Person` 兩種都命中，各回 1 筆）、
  #18（`益田幹夫 Trace` 回 10 筆含本盤、`Mikio Masuda Trace` 回 1 筆）。
- **零命中 9 筆**（#0／#1／#4／#5／#6／#7／#12／#13／#15），**其中 #1／#4／#13 三張 渡辺貞夫 的 CBS/Sony 盤回的十二筆全是他 Victor／Warner／M&M 時期的碟**——**策展層第 5737 條第 2 點「CBS/Sony 是逐藝人上架的」在本層重掃後成立。**
- ⚠ ⚠ **`resultCount > 0` 不等於命中，本層又踩到一次同形**：**`山本邦山 Chris Hinze 去来` 回 4 筆，四筆全是無關的歐洲古典盤**（與策展層第 5737 條第 1 點記的完全一樣）。
- ⚠ ⚠ **順帶撿到一筆有用的**：**以 `Love Live Life` 查回的十二筆裡第一筆是 `Love Live Life + One & 布施 明 —《LOVE WILL MAKE A BETTER YOU》`（`1775405140`、℗ 逐字 `1971 King Record Co.,Ltd`、五軌）**
  ——**這是 #0 的前作，策展層只從 ja 維基知道它存在，Apple 這一筆補上了廠牌（King）、軌數與掛名的逐字形。已寫進 #0 的 `facts`。**
  ⚠ **本層沒有把它算成 #0 的店面命中**（那是另一張碟），只當前作的獨立佐證來源。

---

## 5788　⚠ ⚠ **更正第 1957-B 條第四點：`sonymusic.co.jp` 的 slug 大小寫不是通則，是逐藝人不同**

**該條逐字寫「`sonymusic.co.jp` 的 slug 必須全小寫」。本層實測四組，結果是兩種都會出現**：

| URL | 狀態 |
|---|---|
| `https://www.sonymusic.co.jp/artist/SadaoWatanabe/discography/SICJ-332` | **200**，`<title>` 逐字「ムバリ・アフリカ｜渡辺　貞夫｜ソニーミュージックオフィシャルサイト」 |
| `https://www.sonymusic.co.jp/artist/sadaowatanabe/discography/SICJ-332` | ⚠ **404** |
| `https://www.sonymusic.co.jp/artist/kimikokasai/discography/SICJ-114` | **200**，`<title>` 逐字「イン・パーソン｜笠井　紀美子｜…」 |
| `https://www.sonymusic.co.jp/artist/KimikoKasai/discography/SICJ-114` | ⚠ **404** |

**→ 兩種大小寫都要試；`渡辺貞夫` 那一位是駝峰、`笠井紀美子` 那一位是全小寫。**
⚠ **另外兩筆命中**：`SadaoWatanabe/discography/SICP-4066`（200、題「渡辺 貞夫」）與 `SadaoWatanabe/discography/SICP-10045`（200、題「SADAO WATANABE」）。
⚠ **`YoshioSuzuki/discography/SICP-20150` 兩種大小寫都 404**——**#7 的 2009 年再發沒有官方頁。**
⚠ **JS 渲染那一點照舊成立**：**四個 200 的頁面本層都抓了完整 HTML（約 7.6 KB），除了 `<title>` 與 `og:title` 之外取不到發行日、曲目或編制**（`grep` 過 `20\d\d[/.-]\d+[/.-]\d+` 零命中）。
⚠ **`universal-music.co.jp` 那一側本組兩試兩敗**：`masuda-mikio/products/uccj-9134/` 與 `uccj-9006/` 都回 404（頁面標題逐字「Page not found - UNIVERSAL MUSIC JAPAN」，**⚠ 404 頁的長度是 62 KB，不能用長度判斷**）。

---

## 5789　⚠ **派工信第三節「官方不等於原盤」在本組的兩個實例，兩個都不是衝突而是命名**

1. **`sonymusic.co.jp` 上 #16 的頁面標題逐字是「イン・パーソン」**——**那是 2015 年 `SICJ-114` 再發的和文題**；**盤面原題逐字是 `In Person`**。
   **策展層第 5725 條已裁定不採和文題（並逐字指出 Apple 的 `イン・パーソン` 是第四種寫法），本層的 `facts` 只拿官方頁當「這張碟仍在官方目錄裡」的佐證。**
2. **#13 的頁面標題逐字「ムバリ・アフリカ」**，掛在 2017 年 `SICJ-332` 底下；**盤面原題逐字 `Mbali Africa`**。
**→ 兩筆都不是第 1957-B 條那種「官方頁把再發寫成オリジナル」的衝突，而是「官方頁講的是它現在在賣的那個版本」的溫和版本。本層的十二張 `facts` 一律以 Discogs 原壓的題為準。**

---

## 5790　⚠ ⚠ **`live` 反向漏標三筆逐項覆核成立；場館與年份的逐張核也做完了**

**策展層第 5726 條（主線第 1958-B 條已採納）把 #4／#13／#16 三筆從 `false` 改判 `true`。本層逐筆回打 Discogs 原壓的 `notes` 重核，三筆的逐字證據全部在**：
- **#4**：`Recorded live September 20, 1973 Iino Hall, Tokyo.` ＋ companies `Recorded At: Iino Hall`。
- **#13**：`Recorded live at Yubin-Chokin Hall. Tokyo, September 20,1974.` ＋ 另一行 `Recital Produced by` ＋ 末軌題逐字 `Encore: Tanzania E`。
- **#16**：`Recorded live at Yubin Chokin Hall, Tokyo, September 24, 1973.` ＋ credits 逐字 `MC — Teruo Isono` ＋ 盤名逐字 `In Person`。
**→ 三筆改判全部成立，本層的 `facts` 一律寫成東京的音樂會實況，零張寫成錄音室盤。**
⚠ ⚠ **派工信第五節第 1 點警告的「場館與年份寫混」本層用程式驗過**：
**#4 那張卡的 `facts`／`hookCandidates`／`sound` 全部不含 `郵便貯金ホール` 這個字串、#13 那張卡全部不含 `飯野ホール` 這個字串、#13 全部不含 `1973`。**
⚠ **#16 的錄音年（1973-09-24）與發行年（1974）跨年，本層逐句分開寫**：`facts` 裡 1973 只出現在錄音那一句、1974 只出現在發行那一句，**Apple 的 `releaseDate: 1973-01-01` 與 ℗ 1973 兩欄一律不引**（照第 1945-B 條）。
⚠ **維持 `false` 的九筆本層也反向核過**：**#1 的 companies 有場館（Iino Hall）而 notes 只給單一錄音日、零 live 字樣（照第 1904-B 條判為在音樂廳錄的錄音室型錄音）；#5 `No. 1 Studio`、#7 `CBS/Sony Studio`、#15 `Aoi Studio`、#18 `Victor Studio`；#0／#6／#12 的 companies 無場館**——**沒有再漏的。**

---

## 5791　⚠ 逐軌時長比對重核（#4 vs #13 那一對）

**策展層第 5736 條末段做過，本層重跑**：
- **兩張都是十三軌、同一位藝人、同月同日相差一年、兩張都是東京實況。**
- **曲題唯一重疊的是 `Mbali Africa`：#4 的末軌逐字 3:53、#13 的第十二軌逐字 3:38——不同錄音。**
- **其餘十二軌逐題比過，零重疊。**
**→ 兩張不是同一碟，策展層的結論成立。本層在兩張的 `facts` 裡只寫自己那一版的時長，並在 #4 的 notes 逐字寫明另一張的數字。**
⚠ **另一對（#12 六軌 vs #15 八軌）本層也重核**：**兩張都有一軌叫 `Shakuhachi's Prolog`（#12 是 1:56、#15 是 1:50），其餘零重疊**——**與策展層一致。**

---

## 5792　⚠ 作曲欄那一肢的三種形狀逐筆重核，三筆全部成立

| # | 策展層記 | 本層重核 |
|---:|---|---|
| 4 | 「作曲欄整欄查不到」 | ✔ **Discogs 六個版本的 `extraartists` 逐筆讀完，零筆 `Composed By`／`Written-By`**；`facts` 只寫可查證的正面版本（`Shosholoza` 是既有的傳統歌），**沒有寫成「全是原創」也沒有寫成「全是既有曲」** |
| 15 | 「八軌逐軌作曲欄都是三位演奏者本人」 | ✔ **逐軌數過：沢井忠夫 3（A1／A4／A5）、山本邦山 2（A2／B3）、Chris Hinze 3（A3／B1／B2）——日本側 5／8，與策展層第 5733 條的數字逐字相符** |
| 16 | 「甲 11／乙 2＝15%」 | ✔ **十三軌逐軌讀過作曲欄，十一軌是美國爵士與流行標準曲（Cole Porter 二首、Rodgers & Hart、Petkere、Jobim/Gimbel、Foster、Waldron、Boyd/Grand ＋ Nelson 自己的樂團主題），另兩軌是 Goffin And King 與 Domino & Bartholomew 的流行／R&B 曲** |

⚠ **#12 的作曲欄是整張空的（`extraartists` 只有三筆：兩位演奏者 ＋ 製作），本層的 `facts` 一律不寫作曲歸屬**——**與同系列 #15 那張作曲欄是全的，兩張的處置刻意不同，寫在兩張的 notes 裡。**

---

## 5793　⚠ ⚠ **本層新查到的橫向串連點（九條），給鉤子層做同批反同構用**

**這九條全部是策展層沒有的，而且全部有逐字來源。** ⚠ **它們也是本批最容易被寫作層重複使用的素材，列出來是為了讓鉤子層先把它們分配掉。**

| # | 串連點 | 出現在 | 來源 |
|---:|---|---|---|
| 1 | **`渡辺文男` 是 `渡辺貞夫` 的弟弟** | #4（鼓） | ja 維基「渡辺貞夫」逐字「弟はジャズドラマーの渡辺文男」 |
| 2 | **`鈴木良雄` 1973 年 10 月赴美，而 #4 的演出是 1973-09-20、#7 錄音是 1973-05-10／11** | #4（貝斯）＋ #7（領銜） | ja 維基「鈴木良雄」 |
| 3 | **`鈴木良雄` 改彈貝斯是 `渡辺貞夫` 建議的**（他在ヤマハ音楽教室 師事後者） | #7 | ja 維基「鈴木良雄」 |
| 4 | **`本田竹曠` ＋ `村上寛` 是 1967 年就成形的三重奏搭檔**（#7 的鋼琴與鼓） | #7 | Discogs `artists/471194` profile |
| 5 | ⚠ ⚠ **`宮間利之とニューハード`（#10 的開場）與 `佐藤允彦`（#10 上出現兩次）1971 年一起替 Charles Mingus 錄過音** | #10（＋ #6 的 佐藤允彦） | Discogs `artists/384579` profile ＋ ja 維基「佐藤允彦」——**兩個獨立來源** |
| 6 | **`富樫雅彦` 十幾歲就在 `渡辺貞夫` 的樂團打鼓，1970 年 1 月失去雙腿功能、自造鼓組十八個月後回台** | #13（打擊）＋ #10（C1 段） | Discogs `artists/863918` profile |
| 7 | **`鯉沼利成` 同時是 #13 的リサイタル 製作、#16 的リサイタル 製作、#18 的製作** | #13／#16／#18 | Discogs `artists/1020059` ＋ 三張的 credits |
| 8 | **`伊藤八十八`（#18 的助理製作）就是在日本フォノグラム 設立 East Wind 的人，1978 年轉到 CBS/Sony 後製作 `笠井紀美子`** | #18 → #16 | Discogs `artists/406896` profile |
| 9 | **`山本邦山` 與 `沢井忠夫` 同年出生（1937）、1964 年一起參與組成「民族音楽の会」** | #12／#15 | ja 維基「山本邦山」 |

⚠ **另有三條幕後的「同一人跨多張」，本層已分配掉切面**：**`鈴木智雄` 錄音四張（#7／#13／#15／#16，只在 #4 寫出他的 1968／1980 履歷）**、
**`守崎幸夫` 製作四張（#4／#7／#16／#18）**、**`宮田英夫` 演奏三張（#7／#13／#18，只在 #18 寫他的生年與「多樂器手」）**、
**`岩浪洋三` 解說兩張（#1／#15）**、**`内藤忠行` 攝影兩張（#1／#13）**、**`翠川敬基` 與 `田中保積` 各在 #6 與 #10 兩張**。

---

## 5794　⚠ ⚠ **本批最值錢的一格：#10 的 Charles Mingus 1971 交叉點，兩個獨立來源各給一半**

**Discogs `artists/384579`（`Toshiyuki Miyama & The New Herd`）的 profile 逐字：
「He led his own ensemble from 1950; initially called Jive Ace, the group expanded to big-band size and changed its name to The New Herd in 1958. … New Herd recorded with Charles Mingus in 1971 and toured worldwide throughout the 1970s and 1980s.」**
**ja 維基「佐藤允彦」條目逐字：「1971年、チャールス・ミンガスのアルバム『Charles Mingus With Orchestra』（Denon / 日本 コロムビア）の録音に参加した。」**

**→ #10 這張碟的八段裡，第一段是ニューハード、第五段與第七段各有 佐藤允彦（`富樫雅彦＋佐藤允彦デュオ` 與 `がらん堂`）**
——**開場的大樂團與整晚出現兩次的那位鋼琴手，兩年前在同一個 Mingus 東京企劃裡。**
⚠ **兩個來源各只寫一半，是本層把它們接起來的**；**`facts` 分成兩條寫（一條寫ニューハード的沿革與 Mingus、一條寫 佐藤允彦 也在那次錄音裡），沒有寫成「他們兩次都同台」——那一點沒有查證。**
⚠ ⚠ **這一格與 #6《デマ》的關係要記給鉤子層**：**#6 的作曲兼編曲也是 佐藤允彦**，
**本層刻意把「他的獎項履歷」放 #6、「Mingus 交叉點」放 #10**，兩張不重述同一段生平（`facts` 已經分好）。

---

## 5795　⚠ ⚠ **第二值錢的一格：#16 的 Oliver Nelson，1952 年他在東京決定要當作曲家**

**en 維基「Oliver Nelson」條目逐字（引 Ebony 1968 年 11 月號 118 頁）：
「In 1952, Nelson served in the United States Marines Corps playing woodwinds in the 3rd Marine Division band in Japan and Korea. It was in Japan that Nelson attended a concert by the Tokyo Philharmonic Orchestra and heard Maurice Ravel's Ma mère l'Oye and Paul Hindemith's Symphony in E Flat. Nelson later recalled that this 'was the first time that I had heard really modern music … It was then that I decided to become a composer.'」**

**→ 1973 年 9 月 24 日他在東京郵便貯金ホール 替 笠井紀美子 編曲指揮，台上是 原信夫とシャープス&フラッツ 加一組弦樂團**
——**距離他在東京的那場交響樂音樂會二十一年。**
⚠ **本層把它寫成一條 `facts`，並在同一張卡另寫一條他 1967 年搬到洛杉磯做影視配樂、1975 年 10 月 28 日在洛杉磯辭世（享年四十三）。**
⚠ ⚠ **辭世那一條照研究層通則的反向禁令第一類處理**：**與本作直接綁定（他是本場的編曲與指揮）、逐字標明時序（演出 1973、發行 1974、辭世 1975-10-28）**，
**而本層沒有寫成「兩人最後一次合作」——那一點沒有查證，`facts` 裡也沒有「遺作」這個字。**
⚠ **另記一格照反向禁令第二類整格捨去的**：**#16 的內頁攝影 `Akira Aimi` 的 Discogs profile 逐字「died June 1981 after having an accident on the Brooklyn Bridge in New York, USA.」**
——**與本作無關的後續生平，`facts` 不寫。**

---

## 5796　⚠ ⚠ **#13 的 `富樫雅彦`：為什麼他在一張 1974 年的全明星盤上打的是「打擊」而不是「鼓」**

**Discogs `artists/863918` 的 profile 逐字：「In January 1970, Togashi lost the use of his legs in an accident, but he developed a new drumkit and returned to playing eighteen months later.」**
**同一頁另逐字：「Togashi was acclaimed as a jazz drummer from his teens, when he played in Sadao Watanabe's group. He was a pivotal figure alongside Masahiko Sato, Masayuki Takayanagi and Yosuke Yamashita in the development of free jazz in Japan in the late 1960's.」**

**→ 盤面的 credit 逐字是 `Percussion — Masahiko Togashi`（#13 另有 `Drums — Motohiko Hino`），而這個編制選擇有具體的來歷。**
⚠ **本層把它寫成一條 `facts`（生年 ＋ 十幾歲在同一位領銜者的樂團 ＋ 1970 年 1 月的意外 ＋ 自造鼓組 ＋ 十八個月後回台），沒有渲染細節（逝者克制那一條在此不適用，他 2007 年才辭世、而那是與本作無關的後續，`facts` 不寫）。**
⚠ ⚠ **他在 #10 也在（C1 段的 `富樫雅彦＋佐藤允彦デュオ`，同樣是打擊）**——**本層把這一整段來歷只寫在 #13，#10 只寫他是八組編制之一，避免同批兩張重述。**
⚠ **附帶：同一段 profile 把 `佐藤允彦`／`高柳昌行`／`山下洋輔` 與他並列成 1960 年代末日本自由爵士成形的關鍵人物——四個人裡有三個在本批（#6／#1／#10），是一條很容易被四張卡同時抓去用的素材，本層刻意一張都沒有直接引它，只在 #1 引了 `高柳昌行` 藝人頁上「高柳昌行 New Direction」那個別名。**

---

## 5797　⚠ #7 的時序：**錄音 1973 年 5 月、赴美 1973 年 10 月，而 #4 的演出正落在中間**

**ja 維基「鈴木良雄」逐字：「1967年から1973年までの間、渡辺貞夫グループ、菊地雅章グループでベーシストとして活躍。」「1973年10月に渡米。ニューヨークに居を構えて活動開始。」「1974年スタン・ゲッツ・グループに参加。」「1975年～1976年 アート・ブレイキー&ジャズ・メッセンジャーズのレギュラーベーシストとして活躍。」**
**→ #7《フレンズ》錄音 1973-05-10／11、#4《Kenya Ya Africa》演出 1973-09-20（他是貝斯手）、赴美 1973-10。**
⚠ **本層把「一個月後就搬去紐約」這一句放在 #4（那是他在日本的最後一批錄音之一），把「五個月後赴美」與家族背景放在 #7**——**兩張各取一半，不重複。**
⚠ ⚠ **本層沒有寫「#7 是他的首張領銜作」**：**ja 維基沒有領銜作編號，而本層沒有逐筆查完他 1973 年以前的掛名**——**照「查不到不要編」留白，`facts` 只寫可查證的時序。**
⚠ **對照組就在同一批**：**#18《Trace》那一句「掛領銜的碟最早就是這一張」是有查證的**——**`api.discogs.com/artists/663528/releases?sort=year&sort_order=asc` 的 `role: Main` 最早一筆逐字是 1974 年的本盤，`role: Appearance` 最早一筆是 1972 年。**
**→ 記成判準：要寫「第一張領銜作」就打 `artists/<id>/releases?sort=year` 並讀 `role` 欄；打不到就不寫。**

---

## 5798　⚠ ⚠ **新查到的系列結構：`SOCO-10x` 三部作各留一首編號的〈波〉，而策展層只點出了三張碟**

**策展層第 5736 條 (1) 逐字列出三張的目錄號、掛名與年份。本層另打了第三張（`releases/9755109`，`CBS/Sony SOCO 105`、系列欄逐字「邦楽器とジャズ・フルートのスーパー・セッション3部作 3」），查到一條跨三張的結構**：

| 系列號 | catno | 編號曲 |
|---:|---|---|
| 1 | `SOCO 103`（#12） | **〈Wave 1〉** 5:35 |
| 2 | `SOCO 104`（#15） | **〈Wave II Nehan＝〈波〉II〜涅槃〉** 4:17（作曲 Chris Hinze） |
| 3 | `SOCO 105` | **〈波III〜萬華 = Wave III "Mange"〉**（該盤的盤名就是《萬華 = Mange》） |

**→ 三張碟的固定形狀是「同一位荷蘭長笛手對上不同的日本傳統樂器演奏家」，而他在每一張都留一首編號的〈波〉；第三張的日本側換成雅樂——芝祐靖 與 豊英秋 與 大窪永夫，曲目裡有〈平調音取〉與〈越天楽〉。**
⚠ ⚠ **`facts` 的寫法照派工信第五節第 6 點：本層在 #12 與 #15 兩張各寫一條系列事實（#12 寫第三張的目錄號與掛名、#15 寫〈波〉的編號延續），兩張都沒有任何一句暗示三張齊全或可成套。**
⚠ **第三張的 community 數字併記（下一線若把它撈回來才不會重跑）：`releases/9755109`、`master_id` 逐字 0（無 master 頁）、持有 15 張／想要 38 筆——比本批兩張（#12 持有 69／想要 86、#15 持有 57／想要 114）更冷。**

---

## 5799　⚠ ⚠ **#18 的廠牌鏈條查完了：East Wind ← 日本フォノグラム ← Victor ＋ 松下 ＋ Philips**

| 層 | 逐字 | 來源 |
|---|---|---|
| **East Wind** | 「Japanese label, established by [Nippon Phonogram Co., Ltd.] to promote Japanese artists overseas.」Label Code 逐字 `LC 5075 / LC 05075` | `labels/53101` |
| **日本フォノグラム株式会社** | 1970 年 6 月 1 日成立；**Victor 與松下（合計 60%）＋ Philips Phonografische Industrie（40%）的合資**；主要代理 Philips／Fontana／Mercury／Island／Vertigo／Charisma；**黑膠到 1988 年都由 Victor 橫濱工廠刻片壓片**；約 1995 年改名 | `labels/213861` |
| **設立 East Wind 的人** | **`伊藤八十八`（1946 年生於岐阜－2014-11-19）**：「Worked first for Nippon Phonogram, where he set up the East Wind jazz label and produced recordings by The Great Jazz Trio, Sadao Watanabe, Terumasa Hino and others. In 1978 he moved to CBS/Sony where he produced Miles Davis, Herbie Hancock, Weather Report, Kimiko Kasai and others.」 | `artists/406896` |

**→ 本盤的三件事互相扣得上**：**盤面說明欄逐字「発売元 ・ 日本フォノグラム株式会社」、錄音地點是 Victor Studio、而助理製作掛的就是設立這個廠牌的人。**
⚠ ⚠ **而那段 profile 的最後一句把 #18 與 #16 接起來了**：**伊藤八十八 1978 年轉到 CBS/Sony 之後製作的藝人裡逐字有 `Kimiko Tasai`／`Kimiko Kasai`**——**本批 #16 的領銜者。已寫進 #18 的 `facts`。**
⚠ **另記一件給後面批次**：**#13《Mbali Africa》的製作 `中村慶一`（`artists/383525`）的 profile 逐字「Japanese producer for CBS/Sony, who oversaw the Japanese recordings by Miles Davis and Herbie Hancock, amongst others.」**
——**與 伊藤八十八 1978 年之後的名單重疊（Miles Davis／Herbie Hancock）**；**本層沒有把兩人接成一句（沒有查到兩人的交接關係），兩條各寫在各自的卡上。**

---

## 5800　⚠ **#10 的廠牌來歷：Trio Records 是一家音響工廠開的，而這張唱片的製造欄印的就是那家工廠**

**`labels/42987` 的 profile 逐字：「Often known for its jazz releases, Trio Records was established by the audio manufacturer [Trio Electronics, Inc.], later known [Trio-Kenwood Corporation] (currently known as [Kenwood]) in September 1969. The label ceased operations in 1984.」**
**而 `releases/1581456` 的 companies 欄逐字有四筆：`Recorded At: Shinjuku Art Theater`／`Manufactured By: Trio Records`／**⚠ **`Made By: Trio Electronics, Inc.`**／`Designed At: K2 (11)`。
**→ 廠牌的母公司直接出現在唱片的製造欄上。已寫進 #10 的 `facts`。**
⚠ **`K2 (11)`（`labels/4455730`）的 profile 是空的**——**本層查不到它與設計師 `長友啓典`／`黒田征太郎` 的所屬關係，`facts` 只寫盤面逐字的「Designed At: K2 (11)」，沒有寫成「那是兩位設計師的事務所」。**
⚠ **另記一格併記**：**#10 的音樂會製作是 `副島輝人`（`artists/873726`：自由爵士評論家，1931-01-14－2014-07-12，「Promoter of many legendary events and concerts, Operator of the … labels」）與 `Satoru Futami`（`artists/1314133`，realname／namevariations／profile 三欄全空，查不到漢字名）**
——**`facts` 只寫前者、明寫「其中一位」，沒有列另一位。**

---

## 5801　⚠ ⚠ **補強策展層對 ja.wikipedia 那個日期的判斷：同一張表把兩筆的發行日都寫成「4月1日」**

**策展層第 5724 條判「ja.wikipedia「柳田ヒロ」條目的『1973年4月1日』不可信」，依據是它早於盤面的錄音日（1973 年 5 月 21～23 日）一個多月。本層同意，並補上一條該條沒有的內部證據**：
**同一張ソロ・アルバム 表把他 1971 年那張《HIRO YANAGIDA（七才の老人天国）》的發行日也逐字寫成「1971年4月1日」**
——**兩筆共用同一個 4 月 1 日，而 1972 年那張《HIRO》寫的是「1972年9月」（只有月）、1970 年那張《MILK TIME》寫的是「1970年11月」（只有月）。**
**→ 那張表的「4月1日」看起來是填充值而不是查到的日期，與 c-183 第 5708 條記的 Apple `01-01` 同構。判給 Discogs 原壓，`facts` 一律不寫月份。**
⚠ **同一張表可以交叉驗證的兩欄則成立**：**廠牌「CBS・ソニー」與目錄號「SOLL-35」與 Discogs 原壓逐字相符**；**另外它把四張個人專輯的廠牌逐筆列出（Alfa Music／Liberty、Atlantic、URC、CBS・ソニー），本層據此在 #5 寫「四張換四家廠牌」。**
⚠ ⚠ **本層另記一件 ja 維基在本批的失效**：**「柳田ヒロ」條目的 HIROCOSMOS 編制欄漏了盤面上的次中音薩克斯手之一與電貝斯的分工（它寫「村岡健：サックス」而盤面逐字是 `Tenor Saxophone`），而且把打擊寫成 `川原正美`、同條目另一節寫 `川原直美`**——**編制一律以 Discogs 原壓的 `extraartists` 為準，ja 維基只作交叉驗證。**

---

## 5802　⚠ `沢井忠夫` 的生年有來源衝突，本層判給 ja.wikipedia

| 來源 | 逐字 |
|---|---|
| **ja.wikipedia「沢井忠夫」** infobox 與正文 | **1937 年 12 月 16 日 － 1997 年 4 月 1 日** |
| **Discogs `artists/615870`** profile | ⚠ **「Tadao Sawai (1938, Aichi Prefecture, Japan - April 1, 1997)」** |

**→ 本層取 ja.wikipedia**：**它給的是完整日期（年月日）而 Discogs 只給年，而且卒日兩邊逐字相同（1997-04-01）、出身地也相同（愛知縣）。**
⚠ ⚠ **這個判斷承載了一條 `facts`**：**「吹尺八的 山本邦山 與彈箏的 沢井忠夫 同年出生、只差兩個多月」**
（**山本邦山 1937-10-06，兩處來源一致：ja 維基與 Discogs `artists/379808` 都是 1937-10-06**）。
**→ 若主線覆核後採 Discogs 的 1938，要翻的就是 #15 那一句。可逆性：改的是 `facts` 的一句話。**

---

## 5803　`desc-tools/jp-proper-names.json`：**本批 append 5 個，既有的一個都沒動**

**交件前跑 `node qa-batch.mjs research c184` 第一次的輸出逐字是「⚠ research-a 簡體字: 会来」，兩個字元都是日文專名裡的**：

| append 的字串 | 出處 | 被誤報的字 |
|---|---|---|
| `モダンジャズ研究会` | #7（早稻田大學的社團名） | 会 |
| `民族音楽の会` | #12／#15（1964 年的組織名） | 会 |
| `沢井忠夫箏独奏会` | #15（1971 年得獎的獨奏會名） | 会 |
| `去来 Kyorai` | #12 的盤名 | 来 |
| `去来` | 同上（`facts` 與 notes 裡另有單獨出現的形） | 来 |

⚠ **`日本フォノグラム株式会社`（#18）沒有 append**——**既有清單裡已經有 `株式会社`，那一段會先被剝掉。**
⚠ **既有 66 個字串一個都沒有刪改**（append 後 71 個）。**⚠ 本層讀到的是 66 筆，而策展層第 5741 條逐字說它當天讀到 65 筆**——**中間又多了 1 筆，本層照邊界沒有去追是誰加的。**
⚠ ⚠ **併發風險照第 5741 條的警告處理**：**本層在 append 前重讀整檔、只 extend 不覆寫，寫入時 b 組已經交件（`qa-batch` 顯示 b 12 張）**——**這一次沒有撞上，但那一條建議（改成逐行 `.txt` 讓 append 安全，或每批只由一個人動一次）仍然成立。**
⚠ **策展層第 5743 條 (3) 登記的候選（`郵便貯金ホール`／`飯野ホール`／`新宿アートシアター`／`がらん堂`／`市原宏祐オール・スターズ`／`ニュー・ディレクション・フォー・ジ・アーツ`／`ナウ・ミュージック・アンサンブル`）本層一個都沒有加**
——**理由是它們在本層的 `facts` 裡都沒有被 `SIMP` 誤報（那七個字串裡沒有簡體專用字）。**⚠ **若寫作層報 `SIMP` 誤報，第一順位仍是 `郵便貯金ホール`。**

---

## 5804　交件前自跑的結果

- **`node qa-batch.mjs research c184`** → 逐字「a 12 full,full,full,full,full,full,full,full,full,full,full,full」「b 12 full,…」「key 與卡單完全一致 ✓」「**全部通過 ✓**」。
  ⚠ **中途兩次標記，兩次都已修**：**(1) 「⚠ research-a 簡體字: 会来」——照第七節把整個日文專名 append 進 `jp-proper-names.json`（5 個，見 5803），沒有改寫正文規避**；
  **(2) 「⚠ key 集合與卡單不一致」——那是 b 組當時只交了 9 張，b 組交完 12 張之後這一行自己消失（不是本組的問題）。**
- **本層另外逐張量過的五項**：
  - **`facts` 條數：12／12／12／12／12／12／12／12／12／12／12／12，合計 144 條，沒有一張少於 8 條或多於 12 條**（⚠ **第一版有兩張寫成 13 條，已各合併一條修掉**）。
  - **`src`：144 條全部是完整可開啟的 https 網址，零條描述型**；相異網域 5 家、每張卡 2 到 4 家。
  - **簡體字：`qa-batch` 通過**；本層另用 `SIMP` 同型的字元表逐字掃過一輪，命中的字全部落在日文專名或逐字引用裡。
  - **千分位逗號：`qa-batch` 的樣式 `\d{1,3}(?:,\d{3})+(?!\d)` 零命中**。⚠ **本層自己用寬一格的 `\d,\d{3}` 掃到一處，是 #13 的盤面 notes 逐字引用「September 20,1974.」——來源自己少一個空白，不是千分位，保留逐字形。**
  - **`hookCandidates`：12 張全部恰好 2 條，零張超過。**
  - **獎項：三處，三處都寫明了年份 ＋ 類別 ＋ 得獎**（`佐藤允彦` 1969 Swing Journal「日本ジャズ賞」、1970 與 1972 各一次藝術祭優秀賞；`沢井忠夫` 1971 藝術祭優秀賞；`Chris Hinze` 1970 Montreux 最佳獨奏者獎）——**動詞一律用「拿下」，零處用「獲得」這種兩可的寫法，零處把入圍寫成得獎**（三處的來源逐字都是「受賞」／「was awarded」）。
- **本層另外用程式驗過的三件**（派工信第五節）：
  - **`key`／`artist`／`album` 三欄與卡單逐字相同，12/12 全中**（含 #15 的異體字 `怪顚` 與 #12 的 `去来 Kyorai`，沒有統一成別的字形）。
  - **#4 那張卡的全文不含 `郵便貯金ホール`、#13 那張卡的全文不含 `飯野ホール` 也不含 `1973`。**
  - **`facts[].f` 一律不含查證過程用語**（`查無`／`查不到`／`推翻`／`策展層`／`卡單`／`本層`／`改判`／`uncertain`／`⚠`）**與否定敘述**（`並非`／`卻不是`／`而不是`）——⚠ **第一版有三條中招（#0 的「不是同一家廠牌」、#5 的「查不到」、#12 的「不是同一種寫法」），三條全部改寫成正面版本**，其中 #5 那一條整條換成 CBS/Sony 廠牌來歷、Apple 的覆蓋率對照移進 notes。
- **本層對自己行文用字的檢查**：**日文新字體三處改回正體**（`雅楽 → 雅樂`、`邦楽科 → 邦樂科`、`キャップ帯 → 上緣式腰封（盤面說明欄逐字 cap obi）`）；**專名一律照原文字形抄**（`渡辺貞夫`／`沢井忠夫`／`邦楽器と…3部作`／`民族音楽の会`／`東京フィルハーモニー交響楽団`／`デマ 実験小説集`／`越天楽` 都沒有改字）。

---

## 5805　⚠ ⚠ 給主線與 c-185 之後的清單

**請主線覆核的三件（全部已就地決定並可逆，本層只請覆核）**：
1. ⚠ ⚠ ⚠ **十六處人名改判（5777–5782）**——**這是本批唯一一組「會讓下游寫錯專名」的發現**：
   **下游的零編造 QA 是拿 `facts` 的專名去比對的，所以卡單裡那十六個錯字若流到寫作層，會變成十六個查不到出處的人名。**
   **本層的改判逐條有 Discogs 藝人頁的 `realname`／`namevariations` 當來源，請主線確認要不要一併回頭修卡單的 `curatorWhy`／`curatorRisk` 兩欄**（本層照邊界沒有動卡單）。
2. ⚠ ⚠ **`本田竹曠` 的期別形（5783）**——**本層照 1973–74 的期別形寫，會與池中 12 列的 `本田竹広` 不一致；照池中多數寫則會把 1977 年以後的藝名倒掛回 1973 年的盤。兩邊都可逆，請主線定一邊。**
3. ⚠ **`沢井忠夫` 的生年（5802）**——**ja 維基 1937-12-16 對 Discogs「1938」，本層取前者並據此寫了「與 山本邦山 同年出生」那一句。**

**給 c-185 之後的操作提醒（七條，照重要性排）**：
1. ⚠ ⚠ **人名一律回打 Discogs 藝人頁，而且要加兩道驗**（5778–5782）：**(a) 讀音反驗（第 1940-B 條第二點）；(b) ⚠ 新的一道——用生年／卒年對錄音年，Discogs 會把 credit 釘到錯的實體上**（本批一處：1974 年的監修被釘到 1956 年生的鍵盤手）。
   ⚠ **而讀音對得上不等於是對的字**（`朋夫`／`智雄`、`穂積`／`保積` 都同音）——**`namevariations` 是「實際出現過的字串清單」，沒出現過的一律不採。**
2. ⚠ ⚠ **策展層記到 Apple 條目時，順手比一次它在不在 Discogs 的版本表裡**（5786）——**本批三筆 Apple 條目裡有兩筆不在表裡（第 1957-B 條那個結構性的形狀），而策展層第 5737 條把三筆都記了、沒有讀成版本數的一格。**
3. ⚠ ⚠ **`sonymusic.co.jp` 的 slug 大小寫是逐藝人不同的，兩種都要試**（5788）——**第 1957-B 條第四點寫的「必須全小寫」不是通則。**
4. ⚠ **`universal-music.co.jp` 的 404 頁長度是 62 KB**（5788）——**與 `kingrecords.co.jp` 的 15 KB 同一族，不能用長度判斷。**
5. ⚠ **要寫「第一張領銜作」就打 `artists/<id>/releases?sort=year&sort_order=asc` 並讀 `role` 欄**（5797）——**本批一筆有查證（#18）、一筆查不到就留白（#7）。**
6. ⚠ **`ja.wikipedia` 的專輯表裡「4月1日」這種日期要當填充值看**（5801）——**本批同一張表有兩筆共用它，而其餘兩筆只寫到月。**
7. ⚠ **`jp-proper-names.json` 的併發風險還在**（5803）——**本批 append 5 個時 b 組已交件，沒有撞上；建議照第 5741 條改成逐行 `.txt` 或每批只由一個人動一次。**

**編號區間結算**：本節用到 **5776–5805（共 30 條），區間用滿。** b 組研究層用 5806–5835。

---

# b 組研究層（5806–5835）

批次 c-184｜b 組 12 張（收件全表；1974–1976 年段）｜研究層｜2026-09-25
輸入：`desc-tools/batches/cards/c184-cards.json` 的 `group === "b"` 12 筆
輸出：`desc-tools/batches/research/c184-b.json`（**只寫這一個檔**）
規則照 `desc-tools/prompts/research-base.md`（含開頭「雲端 Blue Note 線的三處例外」：產出直接寫進 repo、
每張 8–12 條 `facts` ＋ 完整 https `src`、`key` 從卡單逐字複製、`status` 與 `coverage` 並存），
並讀完 `batch-progress/c184/rulings.md` 全檔（5716–5775 兩組）、`c163/rulings-mainline.md` 第 1934-B…1962-B 條、
`CURATION-BRIEF-jp1.md` 第〇節與 `CURATION-BRIEF-bluenote-post1985.md` 附錄二、`c178/rulings.md` 的研究層兩段。

---

## 5806　總表：**12 張，facts 合計 126 條（每張 9–12）；full 12、thin 0**

| # | 掛名 —《盤名》 | facts | 相異 src／網域 | status | 本層最值錢的一格 |
|---:|---|---:|---:|---|---|
| 0 | 青木望《1999 A.D》 | 9 | 6／4 | full | 三筆樂手漢字名 Discogs 對不上卡單 → 標 uncertain 不寫（5824） |
| 3 | 土取利行・高木元輝《Origination》 | 9 | 6／5 | full | 間章 與 高木元輝 兩位的生年與定位逐條查實；廠牌自家店的 sitemap 也沒有這張 |
| 4 | 渡辺貞夫《At Pit Inn》 | 9 | 7／5 | full | **`中村建一` → `中村慶一`**（5817）＋ Engineering Supervised By 的 Gerald Oshita 本人就是樂手 |
| 6 | 渡辺貞夫《Swiss Air》 | 10 | 8／3 | full | ⚠ ⚠ **推翻第 5767 條的依據 (a)**：1978 二刷的作曲欄是帶 tracks 範圍的（5811） |
| 7 | 笠井紀美子 with Cedar Walton Trio《Kimiko Is Here》 | 11 | 9／6 | full | ⚠ **版本數 6 → 7**（Apple 數位版兩個資料庫都沒建，5808） |
| 9 | 大野俊三《Bubbles》 | 11 | 7／6 | full | ⚠ **版本數 4 → 5**；1974 年赴美接 Art Blakey 的邀約是這批紐約錄音的前提 |
| 10 | 大野俊三《Something's Coming》 | 10 | 6／5 | full | ⚠ **版本數 7 → 8**；⚠ 卡單這一張的 `mbNote` 整欄是亂碼（5833） |
| 11 | 増尾好秋《111 Sullivan Street》 | 11 | 9／5 | full | ⚠ ⚠ **1979 年那一版的編制是逐軌輪替、B3 整軌無伴奏**（5828）＋〈Swing 42〉補第二來源（5827） |
| 12 | 日野皓正《Speak To Loneliness》 | 12 | 10／6 | full | ⚠ **`福砂和夫` → `福里和男`**（5819）＋ 美國版與原壓的工程人員衝突（5829） |
| 13 | 坂田明トリオ《Counter Clockwise Trip》 | 11 | 8／5 | full | ⚠ Enja 的兩位創辦人之一就是盤面致謝的那個人（5831） |
| 15 | 山下洋輔トリオ《Up-To-Date》 | 11 | 8／4 | full | ⚠ ⚠ **推翻第 5773 條 (1)**：MPS《Chiasma》不是錄音室盤（5814） |
| 17 | 土取利行・坂本龍一《Disappointment-Hateruma》 | 12 | 8／6 | full | ⚠ **`吉田廣樹` → `吉田英樹`**（5820）＋本組唯一被建檔的數位版（5809） |

**thin 0 張。** 每張的相異網域數是 3 到 6，最低的一張（《Swiss Air》）也有 Discogs、MusicBrainz 與 ja 維基三家。
⚠ **`node qa-batch.mjs research c184` 逐字回「a 12 ／ b 12 ／ key 與卡單完全一致 ✓ ／ 全部通過 ✓」**（a 組已交件，未報缺檔）。

---

## 5807　⚠ 再發版本數：**11 筆有 master 的收件逐筆重跑 `masters/<id>/versions?per_page=100`，數字改判 0 筆**

| # | 盤 | master | 卡單記 | 本層重跑 | 差 |
|---:|---|---:|---:|---:|---:|
| 0 | 1999 A.D | 2307112 | 2 | **2** | 0 |
| 4 | At Pit Inn | 649179 | 8 | **8** | 0 |
| 6 | Swiss Air | 711400 | 6 | **6** | 0 |
| 7 | Kimiko Is Here | 657738 | 6 | **6** | 0 |
| 9 | Bubbles | 856853 | 4 | **4** | 0 |
| 10 | Something's Coming | 799484 | 7 | **7** | 0 |
| 11 | 111 Sullivan Street | 1114173 | 5 | **5** | 0 |
| 12 | Speak To Loneliness | 192409 | 8 | **8** | 0 |
| 13 | Counter Clockwise Trip | 940585 | 2 | **2** | 0 |
| 15 | Up-To-Date | 687780 | 6 | **6** | 0 |
| 17 | Disappointment-Hateruma | 514883 | 4 | **4** | 0 |
| | **合計** | | **58** | **58** | **0** |

→ **c-176 a 第 4317 條、c-177 a 第 4567 條、c-178 a 第 4777 條的結論在本批第四次成立**：策展層自己跑完版本表之後，研究層的重跑就是純覆核。
⚠ **`released` 欄為 0 的三筆（#4 的 `18AH 1573`、#10 的俄國非官方 `LDR 2919`、#15 的同號 LP 再發）逐筆確認存在，計入版本數、年份不引用**，與第 5757 條一致。

---

## 5808　⚠ ⚠ **但派工信第二節警告的那個形狀本組中了五次，而且五次是同一種結構性漏法**

**派工信逐字：「跑完 `versions` 之後，再看一次 Apple／串流有沒有版本表沒收的數位版」（主線第 1957-B 條、c-183 b 抓到的第四種）。**
**本層把 12 張的 Apple jp 查詢全部重跑（13 次查詢、零 403、零 429，節流 1.5 秒），命中 6 張**；
**逐筆比對 Discogs 的 `versions` 全表與 MusicBrainz 的 release 清單之後，其中 5 張的數位版在兩個資料庫都查不到**：

| # | 盤 | Apple jp collectionId | 軌數／℗ | Discogs `versions` 有？ | MB 有？ | 版本數 |
|---:|---|---:|---|---|---|---:|
| 7 | Kimiko Is Here | 1655614756 | 10／℗ 1975 Sony Music Labels Inc. | ❌ | ❌ | **6 → 7** |
| 9 | Bubbles | 1443779321 | 5／℗ 1976 Universal Classics & Jazz | ❌ | ❌ | **4 → 5** |
| 10 | Something's Coming | 1443840268 | 4／℗ 1975 Universal Classics & Jazz | ❌ | ❌ | **7 → 8** |
| 11 | 111 Sullivan Street | 1468865964 | 8／℗ 1975 Universal Classics & Jazz | ❌ | ❌ | **5 → 6** |
| 12 | Speak To Loneliness | 1467713346 | 3／℗ 1975 Universal Classics & Jazz | ❌ | ❌ | **8 → 9** |
| 17 | Disappointment-Hateruma | 1875944904 | 4／℗ 2026 Wewantsounds / Modulor | ❌ | ✅ **有**（fc7a7029，XW Digital Media） | 4（不變） |

⚠ ⚠ **本層逐筆核過 12 張的 `versions` 全表（58 筆）裡一個 `File`／數位描述子都沒有**——
**不是這幾張漏建，是 Discogs 的 `versions` 表本來就不收數位發行**（c-183 b 的結論在本組五筆五中）。
**→ b 組 11 筆有 master 的碟，已知版本數從 58 修正為 63；相對 MB 的 20 筆，低估從 38 版（66%）修正為 43 版（68%）。**
⚠ **另 6 張（#0／#3／#13／#15 與 #4／#6）確認零數位版**：前三張 Apple `resultCount` 逐字 0、#15 與 #4／#6 各回 4–15 筆但逐筆比對後 0 筆是本盤，**MB 那邊也沒有數位版，這六張不屬於這種漏法。**
⚠ **命中分佈與第 5764 條完全一致**（East Wind 4/4、CBS/Sony 1/4、ALM 1/2、Crown 0/2、Frasco 0/1），**本層零次 403、零次 429**。

---

## 5809　⚠ **本組唯一一張 MB 沒有低估、也是唯一一張數位版被建檔的碟，成因可歸因**

**#17《Disappointment-Hateruma》的 MB 建了四筆（原壓 ＋ 2005 King `KICS-1137` ＋ 2026 Wewantsounds 的 CD 與數位版），與 Discogs 的 4 版持平。**
**成因就是第 5757 條末段寫的那一句：2026 年 Wewantsounds 那次國際復刻同時在兩邊都建了檔。**
⚠ ⚠ **本層要補的是它的另一面**：**那次復刻也是本組唯一一次讓數位版進到資料庫的事件**
——**其餘五筆數位版（第 5808 條的表）全部是 2018–2019 年 Universal 與 2022–2023 年 Sony 的整批上架，那兩批一筆都沒有進 Discogs 或 MB。**
**→ 給後續批次一句：判斷「這張碟有沒有版本表沒收的數位版」時，看的是那個數位版是「國際廠牌復刻的附帶品」還是「原權利人的整批目錄上架」**
——**前者兩邊都會建檔，後者兩邊都不會。本線的 East Wind 41 張與 CBS/Sony 的 1970 年代目錄大部分屬後者，逐張都要另查 Apple。**

---

## 5810　⚠ 無 master 頁那一筆（#3《Origination》）：三條路都走完，結論與第 5757 條一致

1. **Discogs**：原壓 releases/4016128 的 `master_id` 欄逐字是 0；`catno=AL-4` 反查 25 筆只有本筆、`q=` 另查也只回本筆。
2. **MusicBrainz**：`release?release-group=52c7deb9…` 逐字只回 1 筆。
3. ⚠ **本層多走一條：廠牌自家的線上店**。**ALM RECORDS／コジマ録音 的官網（`kojimarokuon.com`）**能用，
   **`/search?q=<詞>&type=product` 會回伺服器算好的件數（「Disappointment」2 件、「高木元輝」3 件），但商品清單是 JS 渲染的、抓不到連結**；
   **改走 `sitemap.xml` → `sitemap_products_1.xml` ＋ `_2.xml`，共 1182 筆商品逐筆比過，沒有本盤、也沒有 `AL-4` 這個號。**
   ⚠ **但依 jp-1 簡報第二節第 8 點「查不到不可寫成不在架上」，這一項只寫進卡的 `notes`，不寫進 `facts`。**
**→ 照第 1879-B 條只寫「兩個資料庫裡都只有這一筆」，不寫成「沒有再發」。**
⚠ **給後續批次一條可用的路徑**：**`kojimarokuon.com` 的 Shopify `sitemap_products_*.xml` 是這家廠牌唯一能程式化讀到的目錄**
（`/search/suggest.json` 與 `/search/suggest?section_id=` 兩個端點在雲端都回 HTTP 417）。**ALM／半夏社 的碟在本線還有很多。**

---

## 5811　⚠ ⚠ **推翻策展層第 5767 條的依據 (a)：1978 年二刷的作曲欄是帶 `tracks` 範圍的，它沒有把五軌都記成他的曲**

**第 5767 條逐字寫著**：「同一張母帶的 1978 年二刷（`releases/5904444`）的整筆 `extraartists` 逐字有兩筆：
`Sadao Watanabe — Composed By` 與 `Sadao Watanabe — Arranged By`，而且整筆十筆 credits 裡沒有任何 `Traditional`。
→ 取後者：五軌都是他自己的曲與自己的編曲，乙＝0（0%）。」

**本層逐筆打 `api.discogs.com/releases/5904444` 重核，那兩筆 credits 各自帶著 `tracks` 欄**：

| 來源 | 〈Masai Steppe〉A1 | 〈Tanzania E〉A2 | 〈Sway〉B1 | 〈Way〉B2 | 〈Pagamoyo〉B3 |
|---|---|---|---|---|---|
| **1975 原壓 3563704**（逐軌欄） | `Written-By: Traditional` ＋ `Arranged By: Sadao Watanabe` | 同左 | `Written-By: Sadao Watanabe` | 同左 | 同 A1 |
| **1975 宣傳盤 19007731**（整筆欄） | `Arranged By tracks=A1, A2, B3` | 同左 | `Composed By tracks=B1, B2` | 同左 | 同 A1 |
| **1975 `18AH 1574` 20203870** | 同上 | 同上 | 同上 | 同上 | 同上 |
| **1978 二刷 5904444** | **`Arranged By tracks=A1, A2, B3`** | 同左 | **`Composed By tracks=B1, B2`** | 同左 | 同 A1 |
| **2000 `SRCS 9589`／2014 `SICP 4065`** | 整個沒有作曲欄 | 同左 | 同左 | 同左 | 同左 |

⚠ ⚠ **→ 二刷與原壓的分法完全相同**：**他只在〈Sway〉〈Way〉兩軌掛作曲，在三首非洲題材的軌上只掛編曲。**
**二刷唯一的差別是沒有印 `Traditional` 那個字——「沒有印否定」不等於「印了肯定」。**
**第 5767 條那句「五軌都是他自己的曲」不成立，該條的依據 (a) 要撤掉。**
⚠ **這一處的來歷值得記**：**策展層打的是整筆 `extraartists` 的 `name` 與 `role` 兩欄，沒有讀 `tracks` 欄**
——**同一個機制在 c-178 第 4780 條抓過一次（`井原弘泰` 被當成貝斯手、實際是 Directed By），本筆是它在 `tracks` 欄上的版本。**

---

## 5812　⚠ ⚠ **但第 5767 條寫的反轉條件未達成 → 本層維持收；三條查證路徑逐條寫在這裡**

**該條的反轉條件逐字是「若主線或研究層查到那三軌確實對得回具體的既有傳統曲目，本卡的乙就是 3/5＝60%、依第 5701 條要改判退」。**
**本層走了三條路，三條都沒有找到具名的既有傳統曲目**：

1. **Discogs 全庫搜三個曲題**：〈Masai Steppe〉回 12 筆、〈Pagamoyo〉回 7 筆，**除本盤各版之外只多出兩個東西**——
   **渡辺貞夫 自己 1974 年的《Mbali Africa》各版，以及一張 1979 年的 NHK 轉錄節目盤**；**沒有任何其他藝人錄過這三首。**
2. ⚠ ⚠ **《Mbali Africa》上那兩軌的曲題是並列形**：**Discogs releases/3825776 逐字是 C2〈Masai Song / Masai Steppe〉與 C3〈Tanzania E / Funky Tanzanian〉、D4〈Encore: Tanzania E〉**，
   **同樣掛在他的 `Arranged By tracks=C2, C3, D4` 名下**。**`Masai Song` 與 `Funky Tanzanian` 是描述性的詞組，不是可查證的既有曲名**——**查不回任何具體的傳統曲目。**
3. **〈Pagamoyo〉**（坦尚尼亞海岸的地名）**在本盤與那張 NHK 轉錄盤以外查不到第二個錄音，也查不到任何原曲。**

**→ 反轉條件未達成，第 5767 條的依據 (b)（「三個曲題在任何曲目表上都查不到原曲」）成立，本層維持收。**
⚠ ⚠ **但本層把判斷權交回主線，因為證據基礎已經不同了**：
**策展層的理由是「二刷把他記成作曲者」＋「查不到原曲」兩條，本層撤掉第一條、只剩第二條。**
**若主線認定「他只掛編曲」這件事本身就足以把三軌算成第 5701 條的乙（與第 5695 條的日本民謡同構），乙＝3/5＝60%、本卡要改判退。**
**可逆性：撤一張卡（不動卡池結構），或只改卡單的 `why`／`risk`。本層已把兩邊的證據逐筆寫進該卡的 `notes`。**
⚠ **本層傾向維持收的理由寫在這裡**：**第 5695 條那兩張的十二軌逐軌都是任何日本人都認得的既有民謡（〈木曽節〉〈黒田節〉…）、而且原廠自己把副題寫成「日本民謡集」；
本盤的三個曲題在全世界的唱片資料庫裡只出現在他自己的兩張碟上。「編曲」在這裡更像是他對非洲素材的再創作，不是對既有曲目的翻奏。**

---

## 5813　⚠ 立一條操作規則：**Discogs 的 `Composed By`／`Arranged By`／`Written-By` 三欄一律要讀 `tracks` 欄**

**成因就是 5811**。**Discogs 的 credits 有兩個層級**：
- **逐軌層（`tracklist[].extraartists`）**：角色一定綁在那一軌上。
- **整筆層（`extraartists`）**：**`tracks` 欄可能是空字串（＝全碟）也可能是 `"A1, A2, B3"` 這種範圍**。
⚠ ⚠ **只讀 `name` 與 `role` 兩欄時，「A1／A2／B3 的編曲」與「全碟的編曲」長得一模一樣，而這兩件事在第 5701 條的甲乙計數上結論相反。**
**→ 本線往後只要用整筆 `extraartists` 判作曲歸屬，一律連 `tracks` 欄一起讀出來寫進 `rulings.md`。**
⚠ **本組另有兩筆是靠這一步才讀對的**：**#9《Bubbles》的 `Written-By` 兩筆逐字是 `Roy Haynes tracks=B1` 與 `Shunzo Ohno tracks=A1, A2, B2, B3`**
（**四軌是他的、一軌是鼓手的，不是「兩個名字共同署名五軌」**）；**#11 的 1979 年壓片整筆 credits 的六人編制也全部帶 `tracks`（見 5828）。**
（可逆性：判準層，不動任何卡；照裁定權下放第 1 條「有先例」（c-178 第 4780 條）與第 3 條直接定。）

---

## 5814　⚠ ⚠ **推翻策展層第 5773 條 (1)：池中的 `山下洋輔トリオ《Chiasma》1976` 不是錄音室盤，是 1975 年 6 月 6 日德國海德堡的實況**

**第 5773 條 (1) 與 #15 卡單的 `risk` 逐字寫著**：「Discogs master 204939 的《Chiasma》是 **1976 年德國 MPS／BASF 的錄音室盤**（`DC 20 22678-6`…），
與本盤的 1975-04-28 東京實況是兩張不同的碟」，並要求正文寫成「隔年同名專輯主題曲的現場先行版」。

**本層逐筆重核，兩個獨立來源都說它是現場盤**：
1. **Discogs 的 main release（`releases/6390047`，MPS `DC 20 22678-6`）的 `notes` 逐字是**：
   **「Recorded live June 6, 1975 at the Heidelberger Jazztage.」**
2. **Apple Music 日本站的同一張碟，盤名逐字就叫《Chiasma (Live)》、`releaseDate` 逐字 `1975-06-06`、℗ 逐字 `2015 Edel Germany GmbH`**（MPS 現由 Edel 持有）。

⚠ ⚠ **→ 那張碟是 1975 年 6 月 6 日海德堡爵士節的實況、1976 年才發行**；
**它與本盤（1975 年 4 月 28 日東京厚生年金会館）是同一支三重奏在同一年錄的兩場不同實況，相隔 39 天。**
**「1976 年德國 MPS／BASF 的錄音室盤」這個說法整句不成立。**
⚠ **兩張仍然是不同的碟，第 5773 條的結論（不撞卡）成立**：**曲目不同（那張六軌：〈Double Helix〉〈Nita〉〈Chiasma〉〈Horse Trip〉〈Introhach〉〈Hachi〉）、
同名曲的長度也不同（那張 7 分 14 秒、本盤 18 分 08 秒）。**
⚠ **那張碟的版本表本層也順手跑了：master 204939 共 12 版，最新一筆是 2025 年 Solid Records 的 `CDSOL-3530`**——**若本機要替池中那張卡補版本數，這是現成的。**

---

## 5815　⚠ 給寫作層的一句：〈Chiasma〉這一軌的關係要怎麼寫

**依 5814 改寫後的正確說法**：**〈Chiasma〉這首曲子在 1975 年被這支三重奏錄過兩場實況——
4 月 28 日在東京（本盤，18 分 08 秒），6 月 6 日在西德海德堡（後來成為 MPS 那張同名專輯的主題曲，7 分 14 秒）。**
**本盤那一場在前。**
⚠ **不得寫成「隔年那張錄音室專輯的先行版」**（那張不是錄音室盤）；
⚠ **也不得寫成「同一場演出的兩個版本」**（是兩場、隔 39 天、隔一個國家）；
⚠ **仍然要帶掛名與年份**（第 5773 條的高碰撞盤名那一關不變：`Chiasma` 在池中是一張卡的盤名）。

---

## 5816　⚠ ⚠ 人名：**十二張的盤面 credits 逐名回打 `api.discogs.com/artists/<id>` 的 `realname` ＋ `namevariations`（共 91 筆藝人頁），對卡單改判 9 處、標 uncertain 5 處、補漏 1 處、記字元錯 1 處**

**方法照派工信第四節與第 1919-B 條：從 Discogs 的羅馬字逆推漢字，不靠記憶也不靠推測。**

| 分類 | 筆數 | 明細（條號） |
|---|---:|---|
| ⚠ **改判（Discogs 有漢字、與卡單不同）** | **9** | `中村建一`→`中村慶一`（5817，兩張卡）／`成瀬素子`→`成瀬始子`（5818，兩張卡）／`福砂和夫`→`福里和男`（5819）／`吉田廣樹`→`吉田英樹`（5820）／`石川秀臣`→`石川英臣` ＋ `北澤靖高`→`北沢康隆`（5821）／`久保譲介`→`久保襄介` ＋ `細川光男`→`細川光夫` ＋ `森崎由紀夫`→`守崎幸夫`（5822） |
| ⚠ ⚠ **同批內部自相矛盾（同一個藝人 id、兩張卡兩種寫法）** | **1** | `内田拓巳`（#13）vs `内田巧`（#15），同為 Discogs 2717072（5823） |
| ⚠ **標 uncertain、facts 不寫** | **5** | `岡山和義`／`村上光男`／`河原奈美`（#0，Discogs 給的漢字與卡單不符或給了多種）＋ `鳥居信影`（#17）／`相見明`（#7，Discogs 完全沒有漢字）（5824） |
| ⚠ **卡單漏列** | **1** | `荻野宜邦`（#15 的 Engineer [Engineer Produce]，5825） |
| ⚠ **Discogs 自己的字元錯** | **1** | `恩地廣ー`（#15，末字是 U+30FC 而非漢字一，5825） |
| **逐字相符、無需改判** | **≈34** | 河上修・守新治・鈴木智雄・岩浪洋三・間章・小島幸雄・竹田賢一・油井正一・石岡瑛子・横須賀功光・沢渡朔・鯉沼利成・伊藤潔・伊藤八十八・柏原卓・国吉征之・佐藤継雄・佐藤幸彦・岩神六平・黒川博・中川義光・山崎聖次・関根ゆき子・鈴木理恵・大島美智子・武部秀明・江草啓介・宮田英夫・岡田勉・板橋文夫・日野元彦・菊地雅章・森山威男・坂田明 等 |

⚠ ⚠ **九處改判裡有八處的機制完全相同、而且全部是第 1919-B 條那一句**：**卡單從 Discogs 的羅馬字 credit 猜漢字，猜的是「讀音對得上的常見寫法」，而 Discogs 的藝人頁上本來就登記著唯一的那一種。**
**九處裡有五處是「讀音完全相同、字不同」**（慶一／建一、始子／素子、康隆／靖高、幸夫／由紀夫、巧／拓巳），
**兩處是「姓也不同」**（福里／福砂、守崎／森崎），**兩處是「一個字不同」**（英臣／秀臣、英樹／廣樹）。
**→ 給後續批次一句：羅馬字 credit 的漢字一律回打藝人頁，「讀音對得上」不是依據；本組 9/91 是改判，命中率約 10%。**

---

## 5817　⚠ ⚠ **`中村建一` → `中村慶一`（影響同組兩張卡）**

**Discogs 藝人 383525 的 credit 名逐字是 `Keiichi Nakamura`、盤面 `anv` 逐字是 `K'ichi Nakamura`，
`namevariations` 逐字列出九種羅馬字寫法 ＋ **唯一一種漢字寫法 `中村慶一`**（`realname` 欄是空的）。**
**`Keiichi` 對應的是 `慶一`（けいいち）；`建一` 讀作 `Ken'ichi`，對不上 Discogs 的任何一種羅馬字寫法。**
**依第 1929-B 條（名形爭議一律以 Discogs 為準）取 `中村慶一`。**
⚠ **他是本組兩張碟的製作人**：**#4《At Pit Inn》與 #7《Kimiko Is Here》（兩張的 `role` 逐字都是 `Producer`）**
——**卡單那兩張的 `curatorWhy` 都寫成 `中村建一`，兩張一併更正。**
⚠ **附帶的第三個實例**：**本層為了 5812 去查 `渡辺貞夫《Mbali Africa》`（1974，a 組的卡）時，那張碟的 `Producer` 也是同一個 id**
——**a 組若在它的研究稿裡寫了漢字名，請照本條統一。**
（可逆性：卡單的 `curatorWhy` 值，不動卡池結構；照裁定權下放第 1 條「有先例」（第 1929-B 條）與第 2 條直接定。）

---

## 5818　⚠ **`成瀬素子` → `成瀬始子`（影響同組兩張卡）**

**Discogs 藝人 1873068 的 credit 名逐字是 `Motoko Naruse`，`namevariations` 逐字只有一種漢字寫法 `成瀬始子`。**
**`始子` 與 `素子` 兩種寫法都讀作 もとこ，所以卡單那一種是「讀音對得上的猜測」。**
⚠ **她在本組兩張 East Wind 盤上掛名**：**#9《Bubbles》的 `Art Direction, Design` 與 #11《111 Sullivan Street》的 `Design`，兩張都與 石岡瑛子 並列**
——**卡單兩張都寫成 `成瀬素子`，一併更正。**
⚠ **`石岡瑛子`（347689）的 `realname` 欄逐字是 `Eiko Ishioka - 石岡 瑛子`，卡單那一邊沒有問題。**

---

## 5819　⚠ ⚠ **`福砂和夫` → `福里和男`（姓與名都不同）**

**Discogs 藝人 1031488 的 credit 名逐字是 `Kazuo Fukuzato`，`namevariations` 逐字只有兩項：`Kazu Fukuzato` 與**漢字 `福里和男`**。**
**`Fukuzato` 是 `福里`（ふくざと，沖繩系的姓），不是 `福砂`；`和男` 與 `和夫` 同讀 かずお。**
**他是 #12《Speak To Loneliness》的 `Engineer [Recording, Remix]`。依第 1929-B 條取 `福里和男`。**
⚠ **這一筆與 5829 綁在一起**：**1979 年美國 Inner City 版把同一個角色掛給另一個人（`Yoshihiro Suzuki`）**，兩邊衝突，本層以日本原壓為準。

---

## 5820　⚠ ⚠ **`吉田廣樹` → `吉田英樹`**

**Discogs 藝人 1989655 的 credit 名逐字是 `Hideki Yoshida`，`realname` 欄逐字是 `吉田 英樹 (Yoshida Hideki)`、`namevariations` 逐字也是 `吉田 英樹`。**
**`Hideki` 對應 `英樹`；`廣樹` 讀作 ひろき（Hiroki），對不上。**
**他是 #17《Disappointment-Hateruma》的 `Engineer [Collaborative Engineer of Electricity]`——那張碟只有六筆 credits，這一筆佔六分之一。**
⚠ **同一張碟的另兩位本層也核過**：**`竹田賢一`（214532）的 `realname` 逐字是 `竹田賢一 (Takeda Kenichi)`、`小島幸雄`（433206）逐字成立，兩筆卡單都對。**

---

## 5821　⚠ **`石川秀臣` → `石川英臣`、`北澤靖高` → `北沢康隆`（#13 一張碟兩處）**

- **Discogs 藝人 2599339**（credit 名 `Hideomi Ishikawa`，`Cover [Design]`）：**`namevariations` 逐字只有 `石川英臣`。**
- **Discogs 藝人 1265293**（credit 名 `Yasutaka Kitazawa`，`Producer [Album]`）：**`namevariations` 逐字只有 `北沢康隆`。**
  ⚠ **`康隆` 與 `靖高` 都讀 やすたか**，同樣是「讀音對得上的猜測」。
⚠ **`沢` 與 `澤` 那一格要特別講清楚**：**`北沢` 是 Discogs 登記的字形，而「專名一律照原文字形抄」是本產線的規定**
——**不得因為行文避新字體就改成 `北澤`**（那會改掉名字）。**同一個道理適用於本組的 `沢渡朔`（#11 的攝影，2777367 的變體表逐字並列 `沢渡朔` 與 `澤渡朔`，本層取第一形）與 `吉沢元治`（#3 的 facts 引 en 維基原句）。**

---

## 5822　⚠ **`久保譲介` → `久保襄介`、`細川光男` → `細川光夫`、`森崎由紀夫` → `守崎幸夫`（#10 一張碟三處）**

- **Discogs 藝人 1852993**（`Johsuke Kubo`，`Art Direction`）：**`namevariations` 逐字是 `久保㐮介` 與 `久保襄介` 兩種，沒有 `譲`。**
  ⚠ **本層取 `久保襄介`**：**`㐮` 是 U+3436 的罕用字（CJK 擴充 A 區），`襄` 是它的通行字形**——**下游的字型與比對都會出問題，不宜用那一形。**
- **Discogs 藝人 1852991**（`Mitsuo Hosokawa`，`Design [Album]`）：**`namevariations` 逐字只有 `細川光夫`。**
- **Discogs 藝人 1142677**（`Yukio Morisaki`，`Directed By [Album Produce Direction]`）：**`namevariations` 逐字是 `守崎 幸夫` 與 `守崎幸夫`**
  ——⚠ **姓也不同**（`守崎` 不是 `森崎`）。**他同時出現在 #11 的 `Promotion [Promotional Director]` 上，兩張卡一併更正。**
⚠ **同一張碟上卡單對的三筆**：**`菊地雅章`（7321，`realname` 逐字 `菊地 雅章`）、`岩浪洋三`（1825852，盤面 `anv` 就是漢字）、`鯉沼利成`（1020059，`realname` 逐字）。**

---

## 5823　⚠ ⚠ **新形狀：同一個 Discogs 藝人 id 被同組兩張卡寫成兩種漢字（`内田拓巳` vs `内田巧`）**

**Discogs 藝人 2717072 的 `realname` 欄逐字是 `内田 巧 (Uchida Takumi)`、`namevariations` 逐字是 `T. Uchida`／`Uchida Takumi`／`内田 巧`／`内田巧`。**
**他在本組兩張碟上掛名**：**#13《Counter Clockwise Trip》的 `Photography By`（卡單寫 `内田拓巳`）與 #15《Up-To-Date》的 `Design, Photography By`（卡單寫 `内田巧`）。**
⚠ ⚠ **這與第 5740 條的「人名字形分裂」不是同一件事**：**那一條講的是池中既有的兩個字串各自有來歷、一律照卡單不統一；
本筆是同一批、同一層、同一個 Discogs 實體，被同一位策展代理在相鄰兩張卡上寫成兩種——是筆誤，不是分裂。**
**→ 兩張卡統一為 `内田巧`（Discogs 的 `realname` 那一形）。**
⚠ **成因可歸因**：**#13 的盤面 `anv` 逐字是羅馬字 `Uchida Takumi`（要回打藝人頁才有漢字），#15 的盤面 `anv` 逐字就是 `内田 巧`**
——**卡單在有漢字的那張抄對了、在只有羅馬字的那張猜錯了。**
**→ 給後續批次一句：同一批裡同一個羅馬字 credit 出現在兩張以上的碟時，只回打藝人頁一次、把結果套到全部，不要逐卡各猜一次。**
（可逆性：兩張卡的 `curatorWhy` 值；照裁定權下放第 1 條與第 2 條直接定。）

---

## 5824　⚠ 五處標 uncertain、`facts` 不寫（照「查不到不要編」）

| # | 卡單寫的 | Discogs 藝人頁 | 處置 |
|---:|---|---|---|
| 0 | `岡山和義`（Drums） | **1336463 的 `realname` 逐字是 `岡山保義`（Yasuyoshi Okayama），而 `namevariations` 同時列著 `岡山保義`／`岡山和義`／`岡山かずよし`** | ⚠ **Discogs 自己給兩種讀音兩種寫法**，credit 名是 `Kazuyoshi Okayama`（對 `和義`）而 `realname` 是 `保義`——**無法判定，標 uncertain** |
| 0 | `村上光男`（Guitar） | **1465488 的 `namevariations` 逐字只有 `村上光夫` 與 `村上光雄`，沒有 `光男`** | ⚠ **兩種候選、卡單那一種不在其中，標 uncertain** |
| 0 | `河原奈美`（Latin Percussion） | **661612（`Naomi Kawahara`）的 `namevariations` 逐字有五種：`川原なおみ`／`川原直実`／`川原直美`／`川原真美`／`河原直美`——卡單那一種不在其中** | ⚠ **五種候選、無多數，標 uncertain** |
| 17 | `鳥居信影`（Artwork） | **2150983 的 `realname` 與 `namevariations` 兩欄都是空的** | ⚠ **Discogs 完全沒有漢字、無第二來源，標 uncertain** |
| 7 | `相見明`（Photography By） | **2571900（`Akira Aimi`）的 `realname` 與 `namevariations` 兩欄都是空的**（他同時是 #12 的內頁攝影） | ⚠ **同上，標 uncertain** |

⚠ ⚠ **#0《1999 A.D》一張碟上就有三處**，而那張碟的伴奏只有五個人——**本層因此在該卡的 `facts` 裡寫「貝斯 武部秀明、鼓 岡山和義…」時只保留了兩位有依據的漢字名
（`武部秀明` 在 596936 的變體表裡、`江草啓介` 是 661594 的 `realname`），其餘三位改寫成角色而不點名**。
⚠ **`江草啓介` 那一筆另有一個字元陷阱要記**：**Discogs 的 `realname` 欄逐字是 `江​草​啓​介`——四個漢字之間各夾一個零寬空格（U+200B）**，**照抄會帶進三個不可見字元。**
**→ 給後續批次一句：Discogs 的 `realname` 欄會夾零寬空格，取值前一律 `replace(/​/g,'')`。**

---

## 5825　⚠ 一處卡單漏列、一處 Discogs 字元錯（都在 #15《Up-To-Date》）

1. ⚠ **卡單漏列一位**：**盤面 20 筆 credits 裡有 `荻野宜邦`（Discogs 10558447，角色逐字 `Engineer [Engineer Produce]`）**
   ——**卡單的 `curatorWhy` 逐名列了其餘 19 筆、獨漏這一筆。**⚠ **那個藝人在 Discogs 上的「名字」本身就是漢字**（不是羅馬字 credit 加 anv），**所以它不是逆推失敗、是抄漏。**
   ⚠ **本層核過 `荻野宜邦` 不會被 `qa-batch` 的 `SIMP` 字表攔（四個字都不是同形字），不需要 append 白名單。**
2. ⚠ **Discogs 自己的字元錯**：**錄音師那一筆的藝人名（12182746）逐字是 `恩地廣ー`——末字是片假名長音符 U+30FC，不是漢字的 `一`。**
   **卡單已經正規化成 `恩地廣一`（正確），本層沿用卡單**；**但要記下 Discogs 那一邊的字串不可照抄**
   ——**`chk-prop` 的「U+30FC 誤用」那一道掃的是卡單的盤名與掛名兩欄，掃不到 credits 裡的人名。**
   ⚠ **本線的 1970 年代日本盤 credits 會反覆出現這種錯**（第 1866-B 條那一批已經處理過 `油井正ー` 這個同型錯字，見 1588219 的變體表逐字就含它）。
   **→ 給後續批次一句：從 Discogs credits 取漢字人名時，先把 U+30FC 換成 `一` 再比對。**

---

## 5826　⚠ 記一件語義：**Discogs 的 `realname` 欄給的是本名，不是藝名——兩者不同時不可當成改判依據**

**#6《Swiss Air》的鋼琴手：Discogs 藝人 788556 的 credit 名逐字是 `Takehiro Honda`，而 `realname` 欄逐字是 `本田昂 (Honda Takashi)`、
`namevariations` 逐字同時列著 `本田竹広`／`本田竹彦`／`本田竹曠`。**
**日文維基逐字確認這個結構**：**本田竹広（1945-08-21 – 2006-01-12），本名 本田昂（たかし），「芸名は本田竹彦・本田竹曠とした時期あり」。**
**→ `realname` 欄的 `本田昂` 是戶籍名，卡單的 `本田竹広` 是他在唱片上用的名字，兩者都對，卡單不需要改。**
⚠ ⚠ **這一條要記，是因為它與 5817–5822 那八處的機制剛好相反**：
**那八處是「`realname` 或 `namevariations` 有唯一的漢字、而卡單寫了別的字」→ 改判；
本筆是「`realname` 是本名、`namevariations` 才是藝名」→ 不改判。**
**判準：先看 `namevariations` 裡有沒有卡單那一個字串；有 → 卡單對；沒有、而 `realname` 或變體表只給一種 → 改判；都沒有 → 標 uncertain（5824）。**
⚠ **這一條對 a 組直接相關**：**a 組第 5717 條退掉的那張碟用的是 `本田竹曠` 這一形，而池中另有 `本田竹広`**
——**兩形都在 Discogs 的變體表裡，照第 5740 條各自照卡單、不統一。**
⚠ **附帶一件本層查到、可以給寫作層用的事**：**本田竹広 的前妻是爵士歌手 チコ本田，而 チコ本田 是 渡辺貞夫 的妹妹**
——**兩邊的日文維基各自獨立寫了這件事**（`渡辺貞夫` 條目逐字「妹はジャズシンガーのチコ本田」、`本田竹広` 條目逐字「チコ本田は元妻」）。
⚠ **本層沒有查到婚姻的起訖年，所以卡的 `facts` 只寫親屬關係、不寫「1975 年當時他們是姻親」。**

---

## 5827　⚠ 〈Swing 42〉補上第二來源：**確認是 Django Reinhardt 的曲，Discogs 那一格是錯的；第三肢重數後結論不變**

**#11《111 Sullivan Street》的 A1〈Swing 42〉在 Discogs 原壓上逐字掛 `Written-By: Yoshiaki Masuo`，卡單已經懷疑但沒有第二來源。**
**本層補了兩個**：
1. **英文維基的「List of compositions by Django Reinhardt」逐字列著 `Swing 42`**（該頁的 S 段落，前後是 `Swing 41` 與 `Swing 48`）。
2. **MusicBrainz 的同名 work 有 78 筆關係**（`work?query="Swing 42"`）。
**→ 那一軌是 Django Reinhardt（1910–1953）的曲，Discogs 的作曲欄錯了。**
⚠ **依第 5701 條重數**：**八軌＝三軌 増尾好秋 的自作曲（B1／B2／B3）＋ 五軌既有的爵士曲目（A1 Django ＋ A2／A3／A4／B4 四首美國爵士標準曲）**
——**乙（既有的非爵士曲目）＝0（0%），第三肢的結論與卡單相同、不變。**
⚠ **卡單的算法（「四軌自作 ＋ 四軌標準曲」）與本層的（「三軌自作 ＋ 五軌既有爵士曲目」）差在 A1 歸誰，但兩種算法的乙都是 0。**
⚠ ⚠ **這是本線第四個「Discogs 作曲欄出現年代上不可能或人物上不可能的誤掛」的實例**
（前三個：〈Something〉寫成 Lennon-McCartney、〈ガソリン・アレイ〉寫成 Dave Grusin、〈Thoroughly Modern Millie〉掛到 2002 年舞台版）
——**本筆的形狀是「把一首 1940 年代的歐洲爵士名曲掛給 1975 年翻奏它的那位吉他手」，也就是「翻奏者被記成作者」，是最容易誤判成原創曲的一種。**
**→ 給後續批次一句：逐軌 `Written-By` 掛著領銜者本人、而曲題是一個在爵士曲目表上找得到的既有詞組時，一律另查一次作者。**

---

## 5828　⚠ ⚠ 第 5766 條的編制證據本層逐筆重核成立，並多查出一件卡單沒有的事

**第 5766 條靠 1979 年同廠壓片（`releases/11402821`，East Wind `15PJ-1004`「EW Best Collection」）的編制欄成立第 1925-B 條那一肢。**
**本層打 `api.discogs.com/releases/11402821` 重核，14 筆 credits 裡六人編制與 `notes` 的錄音地（逐字「Recorded September 27,28, 1975 at Basement Studio, NYC」）兩件都成立。**
⚠ ⚠ **但那一版的編制是帶 `tracks` 範圍的（5813 那一條的第三個實例），而卡單把它讀成一組平坦的六人班底**：

| 樂手 | 角色 | `tracks` 逐字 |
|---|---|---|
| Yoshiaki Masuo | Guitar ＋ Producer | （全碟） |
| Bob Mover | Alto Saxophone | **A1, A3, B2, B4** |
| Bob Cranshaw | Bass | **A2, A4, B1** |
| Yoshio Suzuki | Bass | **A1, A3, B4** |
| David Lee (2) | Drums | **A2, A4, B1** |
| Jimmy Lovelace | Drums | **A1, A3, B4** |

⚠ ⚠ **→ 這不是六人一起錄的一張碟，是兩組節奏組逐軌輪替**：
**A2／A4／B1 三軌是 Cranshaw ＋ David Lee，A1／A3／B4 三軌是 鈴木良雄 ＋ Jimmy Lovelace；B2 只有 Bob Mover 在場、
⚠ **B3〈West Side Highway〉（2 分 10 秒）整軌沒有任何伴奏列名**。
**→ 這一格比「六人編制」更能支撐第 1925-B 條那一肢**（**它不只證明有樂手，還證明廠牌那一版的轉錄精細到逐軌**），
**本層據此支持第 5766 條的收件判定；反轉條件不變（見該條末段）。**
⚠ **一件可以給寫作層用的事**：**Bob Cranshaw（1932–2016）是 Blue Note 鼎盛期的專屬貝斯手、與 Sonny Rollins 長期合作（自 1959 年起）**，
**而 増尾好秋 正是以 Sonny Rollins 樂團成員的身分為人所知**（ja 維基逐字）——**兩件事各有獨立來源，本層寫進該卡的 `facts`。**

---

## 5829　⚠ ⚠ 第 5766 條末段那一句的實地執行：**#12 的美國授權版與日本原壓在工程人員上衝突，以原壓為準**

**第 5766 條末段逐字建議把第 1925-B 條的「盤面」讀成「含同一家廠牌對同一張母帶的其他壓片；第三方商品頁與後來別家廠牌的復刻內頁不算」。**
**本組正好有一筆可以檢驗後半句**：

| | **日本原壓**（East Wind `EW-7008`，1216390） | **美國授權版**（Inner City `IC 6027`，1979，1362217） |
|---|---|---|
| Engineer [Recording, Remix] | **`Kazuo Fukuzato`（＝`福里和男`，見 5819）** | ⚠ **`Yoshihiro Suzuki`** |
| Co-producer | （沒有這個角色） | ⚠ **`Yasohachi Itoh` ＋ `Yoshihiro Suzuki` 兩人** |
| Lacquer Cut By | （沒有這一格） | `Gilbert Kong` |
| `styles` 逐字 | `Post Bop`／`Fusion` | ⚠ **`Post Bop`／`Avant-garde Jazz`／`Free Improvisation`**（三項，與原壓完全不同） |

**→ 照第 5766 條末段「後來別家廠牌的復刻內頁不算盤面」，本層以日本原壓為準：錄音與混音是 `福里和男`。**
⚠ ⚠ **這一筆同時給第 5766 條那條判準一個正面的用例**：**若沒有「別家廠牌不算」這半句，這一格就會變成「兩個盤面互相矛盾、無法決定」**
——**而本組的 #11 剛好是「同一家廠牌的另一次壓片」（算）、#12 是「別家廠牌的授權版」（不算），兩種形狀在同一批、同一家廠牌的四張碟裡各出現一次。**
**→ 建議主線在覆核第 5766 條時把這兩筆一起看：該條的兩半句在本組各自有一個乾淨的實例。**
⚠ **附帶記一件**：**美國版的 `styles` 多出 `Avant-garde Jazz` 與 `Free Improvisation` 兩項**——**同一張碟在兩個市場被歸成不同的曲風，
而本線的曲風判準吃的是原壓那一筆**（第 5760 條的固定路徑第 4 步）。**這一格不影響本卡的結論，但它是「`styles` 是投稿者的分類、不是碟的屬性」的一個乾淨證據。**

---

## 5830　⚠ 本層新增的背景：**Inner City 與 East Wind 的互相授權，以及它 1979 年的樂評人票選**

**#12 的 1979 年美國版出自 Inner City Records。英文維基逐字**：
**該公司 1976 年由 Irv Kratka 在紐約創立，是 Music Minus One 的一個部門，1976 到 1980 年間發行六十多張唱片，
⚠ **1979 年在國際爵士樂評人票選（International Jazz Critics Poll）裡被選為年度廠牌（Record Label of the Year）**——**是得獎、不是入圍**；
**而「Many Inner City albums were also issued on the Japanese East Wind Records, including … albums from Japanese musicians Sadao Watanabe and Terumasa Hino」。**
⚠ ⚠ **方向要寫清楚，免得寫作層寫反**：**維基那一句講的是「Inner City 的碟也在 East Wind 出」，而 #12 這一筆是反方向（East Wind 的碟授權給 Inner City 在美國出）**
——**兩家是互相授權的關係，不是單向的。本層在卡的 `facts` 裡只寫「1979 年由 Inner City 以 IC 6027 授權發行」＋「它發的許多唱片同時也在 East Wind 出」兩句，不做方向上的推論。**
⚠ **獎項照研究層通則分清入圍與得獎**：**這一筆是得獎（voted the 1979 Record Label of the Year），facts 逐字寫「被選為年度廠牌」。**
⚠ **本組兩位領銜者（渡辺貞夫 與 日野皓正）都被那一句逐字點名**——**a 組另有 渡辺貞夫 三張卡，這條背景兩組都用得上，但同一段敘述不得照抄兩次。**

---

## 5831　⚠ ⚠ 同名陷阱（新增第一筆）：**英文維基的 `Horst Weber` 是一位 1956 年奧運的德國游泳選手**

**#13《Counter Clockwise Trip》的盤面 `notes` 逐字有一句「Special thanks to Horst Weber」，卡單沒有處理這一格。**
**本層查證時第一次打的就是 `en.wikipedia.org/wiki/Horst_Weber`——回的是「Horst Weber (20 August 1939 – 2002) was a German swimmer. He competed in the men's 200 metre butterfly at the 1956 Summer Olympics.」**
⚠ ⚠ **那不是這一位。** **正確的來源是 `en.wikipedia.org/wiki/Enja_Records`，該條目逐字**：
**「Enja Records is a German jazz record company and label based in Munich which was founded by jazz enthusiasts Matthias Winckelmann and Horst Weber in 1971.」**
**同一條目接著逐字列出早期目錄收的「European and Japanese avant-garde artists such as Alexander von Schlippenbach, Terumasa Hino, Albert Mangelsdorff and Yōsuke Yamashita」**
——⚠ ⚠ **那兩個日本名字正好是本組的另外兩張卡（#12 與 #15）。**
**→ 這解釋了一張日本小廠的第一號盤為什麼會在慕尼黑錄音：Union Studio 與 Enja 這個圈子在 1975 年就已經是日本前衛樂手在歐洲的落腳處。**
⚠ **本層把這一條寫進 #13 的 `facts`，`src` 用的是 `Enja_Records` 那一頁，不是 `Horst_Weber` 那一頁。**
**→ 建議把 `Horst Weber`（en 維基＝游泳選手）加進派工信第四節的同名陷阱清單，與 `鈴木弘`＝游泳選手、`伏見哲夫`＝男演員 等並列。**
⚠ ⚠ **這一筆的形狀比既有那幾筆更危險**：**既有那幾筆是日文維基的日本人名，一看職業欄就分得出來；本筆是拉丁人名、而且兩位都是德國人、生年相近**
——**「先確認職業欄」這個動作要從日文維基的樂手查詢擴到所有人名查詢。**

---

## 5832　⚠ 同名陷阱（新增第二筆）：**日文維基的 `大野俊三` 是消歧義頁（足球選手／爵士小號手）**

**本組 #9 與 #10 兩張碟的領銜者。打 `ja.wikipedia.org/wiki/大野俊三` 回來的是消歧義頁，逐字兩項**：
**`大野俊三 (サッカー選手) - 元サッカー選手` 與 `大野俊三 (ジャズトランペッター) - ジャズトランペッター`。**
**正確的那一頁是 `大野俊三 (ジャズトランペッター)`，逐字「1949年〈昭和24年〉3月22日 -、日本のジャズ・トランペット演奏者、作曲家・編曲家」。**
**→ 加進派工信第四節的同名陷阱清單，與 `中村誠一`＝消歧義頁、`Goin' Home`＝消歧義頁 並列。**
⚠ **英文維基那一邊沒有這個問題**：**`en.wikipedia.org/wiki/Shunzo_Ohno` 直接是小號手，而且它給了一件卡單完全沒有、而對本組兩張碟都是前提的事**
——**逐字「In 1974 Ohno accepted Art Blakey's offer and went to the U.S.」**：**他 1974 年接受 Art Blakey 的邀約赴美，所以 1975 年那兩次紐約錄音（2–3 月的 `EW-7011`、7 月的 `EW-8028`）是他赴美之後的頭兩張領銜作。**
⚠ ⚠ **獎項那一關本層刻意讓它空著**：**他有 1984 與 1988 兩座葛萊美、以及 2014 年 International Songwriting Competition 的首獎（三件都是得獎、不是入圍），
但三件全部晚於本作且與本作無關**——**依研究層通則的反向禁令（與作品無關的後續生平事件一律不寫），兩張卡的 `facts` 一個字都沒有寫，只記在卡的 `notes` 裡。**

---

## 5833　⚠ 來源實測（本層全部查詢的結果），以及卡單的一處資料瑕疵

**命中率**：

| 路徑 | 結果 | 備註 |
|---|---|---|
| **`api.discogs.com/releases/<id>`** | **21/21 全 200** | 12 張原壓 ＋ 3 筆交叉驗壓片（5904444／11402821／1362217）＋ 4 筆《Swiss Air》其餘版本（20203870／19007731／10618939／7490624）＋《Mbali Africa》3825776 ＋ MPS《Chiasma》6390047 |
| **`api.discogs.com/masters/<id>/versions?per_page=100`** | **12/12 全 200** | 11 張本組 ＋ MPS《Chiasma》的 master 204939；另 `masters/<id>` 本體 12 次也全 200 |
| **`api.discogs.com/artists/<id>`** | **90/90 全 200** | 節流 3.2 秒，零 429、零錯誤 |
| **`api.discogs.com/database/search`** | **8/8 全 200** | 曲題反查與《Mbali Africa》定位 |
| **MusicBrainz `release-group` ＋ `release?release-group=`** | **24/24 全 200** | 節流 1.3 秒、UA 逐字 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`；另 `work?query=` 1 次 |
| **`itunes.apple.com/search`** | **18/18 全 200** | ⚠ ⚠ **零 403、零 429**（節流 1.5 秒）——與第 5764 條的觀察一致，本線第二次整批零錯誤 |
| **`ja.wikipedia.org/w/api.php`** | **40 次查詢、30 命中（75%）** | 缺的 10 個：`高木元輝`／`コジマ録音`／`イーストウインド`／`宮田英夫`／`山下洋輔トリオ`／`セダー・ウォルトン`／`高木元輝 (音楽家)`／`ニューディレクション` 等；⚠ **`日本フォノグラム` 會被重導向到 `フィリップス・レコード`（不是本盤的廠牌條目）** |
| **`en.wikipedia.org/w/api.php`** | **48 次查詢、41 命中（85%）** | 缺的 7 個：`Yoshiaki Masuo`／`Nozomi Aoki`／`Kurt Munkacsi`／`Cedric Lawson`／`Don Pate`／`Yoshio Suzuki (musician)`／`Round Midnight (song)`；⚠ **`Swing 42` 會被重導向到 `Django Reinhardt`（那個重導向本身就是證據，見 5827）** |
| ⚠ ⚠ **原廠網域八個** | **全滅** | `universal-music.co.jp/<artist>/products/<catno>/` 四筆全 404、站內搜尋回 200 但結果是 JS 渲染的 0 件；`kingrecords.co.jp/cs/g/gKICS-1137/` 與 `gKICS1137/` 兩種都 404 而且 **回的是 0 位元組、不是派工信記的 15KB**；`crownrecord.co.jp` 首頁 200 但沒有 1975 年的目錄；`wewantsounds.com` 首頁 200、商品頁 404；`alm-records.jp` DNS 解不出來 |
| ⚠ **`kojimarokuon.com`（ALM／コジマ録音 官方店）** | **可用，但只有 sitemap 那條路** | 見 5810 |

⚠ **`miqqe.jp` 本組沒有進查證路徑**：**它只覆蓋ビクター 的 NJS 號段，本組零張ビクター 盤。**
⚠ **`allmusic` 與 `allaboutjazz` 依附錄二一律不排進路徑，本組一次都沒有打；`junkoonishi.com` 同樣沒有打。**
⚠ **`www.discogs.com/...` 短網址照既有慣例寫進 `src`**（API 的 `uri` 欄回的就是同一網址），**本層沒有用程式化 UA 去打那些短網址。**

### ⚠ ⚠ 卡單的一處資料瑕疵（不在本層可動範圍，只回報）

**`desc-tools/batches/cards/c184-cards.json` 裡 `group === "b"` 的第 7 筆（`大野俊三 —《Something's Coming》`，全檔第 19 筆）的 `mbNote` 欄整欄是亂碼**
——**是 UTF-8 的位元組被當成 Latin-1 解過一次再存回去**（開頭逐字 `é release-group 44fe82b7…`、`ï¼slice çµ¦ç rgMbid`）。
**本層以 `Buffer.from(s,'latin1').toString('utf8')` 還原後讀完，內容與 rulings 一致、沒有資訊損失。**
⚠ **全 24 張逐欄掃過（`label`／`mbNote`／`curatorWhy`／`curatorRisk`／`queryAlias`／`album`／`artist` 七欄），只有這一欄中招**
——**同一張卡的其他六欄都正常，所以不是整張卡的問題。**
**→ 建議主線在合併前修掉這一欄（一行 `Buffer` 還原即可）。卡單不在本層的可動範圍。**

---

## 5834　`desc-tools/jp-proper-names.json`：**本批 append 0 個，既有 66 個一個都沒動**

**做法**：**把本層交件檔（`c184-b.json`）整份讀出來，照 `qa-batch.mjs` 的 `stripLegit` 剝掉 `《》`／`〈〉`／`「」` 三種括號內的內容，
再只套 `jp-proper-names.json` 的白名單（刻意不套卡單 `key` 那一份 `ALLOW`，免得白名單的效果被卡單字串蓋掉），最後跑第 43 行的 `SIMP` 正規式。**
**結果：命中集合是空集合。**
**本層實際依賴到的白名單條目有五個（都是既有的）**：`東京厚生年金会館`／`新宿厚生年金会館`／`厚生年金会館`／`株式会社`／`国吉征之`。
⚠ **`国吉征之` 正是第 5765 條這一批 append 進去的兩個之一**——**策展層先加、研究層就直接受益，這個順序是對的。**
⚠ **本層新寫進正文的日文專名逐個測過都不會被攔**：**荻野宜邦・恩地廣一・福里和男・守崎幸夫・久保襄介・細川光夫・中村慶一・成瀬始子・北沢康隆・石川英臣・内田巧・吉田英樹・岡山保義・村上光夫・江草啓介・武部秀明・半夏社・郵便貯金ホール・新宿ピット・イン・東京藝術大学・岩手県宮古市・栃木県足利市・東京都品川区・香川県・ミジンコ・チコ本田・本田昂・坂田学・菊地雅春・菊地雅洋・吉沢元治・富樫雅彦・高柳昌行 等三十餘個。**
⚠ **`GARBAGE`（非拉丁）那一道本批也不需要白名單**：**#17 的兩軌曲題含希臘字母 `α`／`Φ` 與數學花體 `𝔷`(U+1D537)，而 `GARBAGE` 只掃西里爾、天城體與諺文三個區段，希臘字母與數學符號都不在射程內**；
**那兩個曲題在本層的檔裡一律用 `〈〉` 包住，`stripLegit` 會先剝掉。**
**→ 檔案零改動。`git status` 不應該顯示 `desc-tools/jp-proper-names.json`。**

---

## 5835　⚠ ⚠ 交件前自跑的結果、給主線的清單，與給 c-185 之後的提醒

### 交件前自跑

- **`node desc-tools/qa-batch.mjs research c184`** → 逐字「**a 12 full×12 ／ b 12 full×12 ／ key 與卡單完全一致 ✓ ／ 全部通過 ✓**」（a 組已交件，未報缺檔）。
- **自己再逐張量過五項**：**`facts` 條數 9–12（12 張全部落在 8–12 的區間內）、126 條的 `src` 全部通過 `^https://\S+$`、
  `hookCandidates` 每張恰好 2 條、`status` 與 `coverage` 兩欄同值並存、`keyTracks` 每張 2 首。**
- **另外自己掃了四項 `qa-batch` 沒掃或掃不到的**：
  1. ⚠ **日文新字體**（`楽`／`沢`／`実`／`応`／`単`／`歴`／`図`／`権`／`験`／`豊`／`断`／`続`／`伝`／`両` 等二十字逐字掃 `facts` ＋ `sound` ＋ `hookCandidates`）
     → **只中一處：`吉沢元治`**，**那是 en 維基原句裡的專名，照「專名一律照原文字形抄」保留、不改成 `吉澤`。**
  2. ⚠ **`facts` 裡的校對語言**（`查無`／`查不到`／`推翻`／`uncertain`／`標記`／`本層`／`卡單`／`策展層`／`並非` 九個詞）→ **0 處**，全部關在 `notes` 裡。
  3. ⚠ **半形逗號貼中文、千分位逗號** → **0 處**（定價寫成「2400 圓」「2300 圓」、壓量寫成「五百張」）。
  4. ⚠ **獎項的入圍／得獎** → **`facts` 裡只有一筆獎項**（5830 的 Inner City 1979 年年度廠牌，**是得獎**）；**大野俊三 的三件獎項依反向禁令整格不寫。**
- ⚠ **本層沒有跑 `chk-prop` 與 `dedup-crossbatch`**：**那兩支是策展層的關卡（吃 `prop-b.json`），研究層的產出不進它們的射程。**

### 建議主線覆核的三件（都寫在上面，此處只列索引）

1. ⚠ ⚠ ⚠ **第 5811／5812 條——`渡辺貞夫《Swiss Air》` 的收退。**
   **本層推翻了第 5767 條的依據 (a)（1978 二刷並沒有把五軌都記成他的曲，它與原壓同樣只在兩軌掛作曲、三軌掛編曲），
   但反轉條件（對得回具名的既有傳統曲目）三條路都沒有達成，所以維持收。**
   **主線要裁的是：「他只掛編曲」是否足以把那三軌算成第 5701 條的乙——若是，乙＝3/5＝60%、本卡改判退。**
2. ⚠ ⚠ **第 5814／5815 條——池中 `山下洋輔トリオ《Chiasma》1976` 的性質更正。**
   **它不是錄音室盤，是 1975 年 6 月 6 日海德堡爵士節的實況（Discogs `notes` 與 Apple jp 盤名兩個來源）。
   第 5773 條 (1) 的結論（兩張不同的碟、不撞卡）不變，但要求寫作層寫的那句話要改（見 5815）。
   ⚠ 這同時影響池中那張卡本身的 `live` 欄——本機那邊可能要一併看。**
3. ⚠ **第 5808 條——b 組 11 筆有 master 的已知版本數從 58 修正為 63（五筆各 ＋1 個數位版）。**
   **若主線的版本數統計要對得起第 1905-B 條那條曲線，這五筆要一起改。**

### 給 c-185…c-191 的操作提醒（六條）

1. ⚠ ⚠ **Discogs 整筆 `extraartists` 的 `Composed By`／`Arranged By`／`Written-By` 三欄一律連 `tracks` 欄一起讀**（5813）——**本組三筆三中，其中一筆決定一張碟的收退。**
2. ⚠ ⚠ **羅馬字 credit 的漢字一律回打 `api.discogs.com/artists/<id>`，「讀音對得上」不是依據**（5816）——**本組 9/91 是改判（約 10%）；先看 `namevariations` 有沒有卡單那一串，再看 `realname`（它給的是本名不是藝名，5826），兩者都沒有就標 uncertain（5824）。**
3. ⚠ **同一批裡同一個羅馬字 credit 出現在兩張以上的碟時，只回打藝人頁一次、把結果套到全部**（5823）——**本組因此出現同一個人兩種寫法。**
4. ⚠ **從 Discogs credits 取漢字時先做兩個清洗**：**`replace(/​/g,'')`（`realname` 會夾零寬空格，5824）與 `replace(/ー$/,'一')`（末字的長音符誤用，5825）。**
5. ⚠ ⚠ **跑完 `versions` 一律再打一次 Apple**（5808）——**本組 12 張裡 5 張的數位版在 Discogs 與 MB 兩邊都沒有建檔；分界是「原權利人整批上架」（兩邊都不建）還是「國際廠牌復刻的附帶品」（兩邊都建，5809）。**
6. ⚠ **拉丁人名查維基也要先確認職業欄**（5831）——**`Horst Weber` 在 en 維基是游泳選手；`大野俊三` 在 ja 維基是消歧義頁（5832）。**

### 兩件與派工信不符、回報給主線

1. ⚠ **派工信第一節第 4 點（第 1961-B 條）逐字說「`audits/foreign-artist-japan-productions.md` 是那一支的登記簿（**本組有一筆在上面**）」。**
   **本層逐列讀完那份檔案：甲族 5 筆全部是 c-174／c-183 a／c-184 a 的，乙族 1 筆是 c-184 a 的 `Sonia Rosa With Yuji Ohno`，
   末段「相關但不屬於這一支」那一節點名的是 c-171／c-183 a／**c-184 a** 的碟。**→ b 組一筆都不在上面。**
   **本組屬於第 5179 條那一族（領銜是日本人、演奏側幾乎全是美國人）的四張（#4／#7／#9／#11）落在末段那一節的射程內，但那一節逐字寫著「四項多半 3/4，收」，不是登記項。**
   **本層據此沒有動那份檔案**（它也不在本層的可動範圍內）。
2. ⚠ **派工信第七節說「`kingrecords.co.jp` 404 也回 15KB，不能用長度判斷」——本次實測不是這樣**：
   **`https://www.kingrecords.co.jp/cs/g/gKICS-1137/` 與 `/gKICS1137/` 兩種寫法都回 HTTP 404 而且內容長度是 0 位元組。**
   **那條警語可能是本機工作階段的觀察，或該站已改版；雲端這一次用狀態碼就分得出來。**

### 反同構：本組跨卡的切角分配（寫給鉤子層與寫作層）

| 重複的人 | 張數 | 各卡的切角（不得互換） |
|---|---:|---|
| **渡辺貞夫** | 2（b 組）＋3（a 組） | **#4** 爵士屋、借來的美國三重奏、五軌全爵士曲庫、Engineering Supervised By 那一格；**#6** 歐洲音樂節、全日本四重奏、非洲素材與作曲欄、鋼琴手的親屬關係。⚠ **a 組三張另有切角，本組兩卡不碰他的整體生涯線。** |
| **大野俊三** | 2 | **#10** 出道領銜作、盤面誤拼、菊地雅章；**#9** 1976 年的發行年、Vanguard Studio 的電聲班底、Roy Haynes 寫的那一軌、石岡瑛子 的封面。⚠ **兩張年份一前一後（1975／1976）最容易寫反。** |
| **土取利行** | 2 | **#3** ALM 系列第四號、兩人兩排樂器、間章 的解說、零再發；**#17** 系列第七號、五百張、聲音素材清單、兩面各自的標題、2026 年國際復刻。 |
| **笠井紀美子** | 1（b 組）＋1（a 組） | **#7** 曲目來源與盤面的借將註記。⚠ **不寫她的整體生涯線（留給 a 組）。** |
| **坂田明 ＋ 森山威男** | 同時在 #13 與 #15 | **#13** Frasco 第一號、慕尼黑錄音、Enja 的圈子、奧地利貝斯手；**#15** 東京兩枚組實況、演唱會工作人員名單、〈Chiasma〉的兩場關係。⚠ **#13 不得寫成 山下洋輔 那支三重奏的作品。** |
| **East Wind（4 張）** | #9／#10／#11／#12 | **廠牌沿革一句都不寫在這四張上**（第 5757 條的 `EW-70xx`→`EW-80xx` 改號已經在卡單的 `label` 欄）；四張各自走自己的錄音現場與編制。 |

**編號區間結算：本節用到 5806–5835（共 30 條），區間用滿。** 另一組研究層用 5776–5805。

---

# 鉤子層（24 張｜a 組 12 ＋ b 組 12，一人做完兩組）｜2026-09-25

> ⚠ **本節 append 在檔末，編號區間 5836–5862（派工信配的是 5836–5875）；`# b 組` 以下與 a 組策展、兩組研究層的任何一行都沒有動。**
> **寫入前跑過 `git show HEAD:batch-progress/c184/rulings.md`（3073 行、`^## 583[6-9]`／`^## 58[4-7][0-9]` 命中 0）與 `ls`（檔在、376853 位元組），兩者都確認 5836 以後是空的。**

## 5836　開工第一件事：自己數研究稿——**派工信的張數是對的**

派工信第一節寫「a 組 12、b 組 12，合計 24 張」。
**`node` 逐檔數過：`c184-a.json` 12 筆、`c184-b.json` 12 筆，合計 24 筆，與派工信逐格相符**
（`dispatch-stats.mjs` 之後連五批沒有錯：c-183 第 5836、c-182 第 5456、c-180 第 5226、c-179 第 5296 條）。
`key` 由 scratchpad `c184h/c184h-build.mjs` 逐筆與研究稿比對，**24/24 全中、0 筆 mismatch**；順序同研究稿，
**欄位只有 `key`／`hook`／`note` 三個**，前綴 23 筆 `desc4:` ＋ 1 筆 `desc2:`（#10《Inspiration & Power 14》，照研究稿逐字複製）。

## 5837　先倒回去量上一批，確認尺一致才動筆——**派工信的檔名與 13 個數字都是對的**

派工信第二節逐字警告「檔名是上一批 c-183 的檔，不是本批」，實測兩檔存在、筆數確實是 5 與 8。
**13 個數字逐格重現，一個都沒有差**（量測腳本 `c184h/c184h-budget.mjs` 的 `budget()`）：

| 檔案 | 派工信 | 本層量到 |
|---|---|---|
| `c183-hooks-a.json`（5 筆） | 223／227／227／227／227 | **完全相同** ✔ |
| `c183-hooks-b.json`（8 筆） | 229／217／229／226／229／224／216／218 | **完全相同** ✔ |

公式逐字（全部 `Array.from().length`）：
`預算 = len(hook) + len(note) − len("主故事：") − note 的「→」總數 − len("正文只寫上列各項。") − len("這條骨架全批只走本張。")`，
**只扣這四樣、上限 230**；hook 加權另算（`/[\x00-\x7F]/ ? 0.5 : 1`、上限 50），note 原始長度上限 350。
⚠ **本批 24 張的 note 骨架固定是「`主故事：`＋4 格＋3 個 `→`＋兩句樣板」，代入後化簡成 `預算 = len(hook) + Σ len(各格)`**
——**與 c-183 第 5837 條同一化簡，連續第七批成立。** hook 15–29 字時，四格共可用 201–215 字元。

## 5838　⚠ ⚠ 逐筆預算與 hook 加權（24 筆全表，**兩支 QA 腳本都驗不到這一欄**）

| 組 | # | 掛名 —《盤名》 | hook 原始 | hook 加權 | note 原始 | **預算** |
|---|---:|---|---:|---:|---:|---:|
| a | 1 | Love Live Life —《殺人十章》 | 20 | **20** | 233 | **226** |
| a | 2 | 渡辺貞夫 —《Sadao Watanabe》 | 19 | **19** | 238 | **230** |
| a | 3 | 渡辺貞夫 Meets Inter-African Theatre Group —《Kenya Ya Africa》 | 25 | **25** | 232 | **230** |
| a | 4 | 柳田ヒロ —《Hirocosmos》 | 23 | **23** | 230 | **226** |
| a | 5 | 筒井康隆, 市原宏祐, 佐藤允彦 —《デマ》 | 29 | **27** | 226 | **228** |
| a | 6 | 鈴木良雄 —《フレンズ》 | 27 | **27** | 226 | **226** |
| a | 7 | Various Artists —《Inspiration & Power 14 Free Jazz Festival 1》 | 26 | **26** | 229 | **228** |
| a | 8 | 山本邦山 & Chris Hinze —《去来 Kyorai》 | 18 | **17** | 239 | **230** |
| a | 9 | 渡辺貞夫 —《Mbali Africa》 | 25 | **25** | 228 | **226** |
| a | 10 | Chris Hinze, 沢井忠夫, 山本邦山 —《怪顚》 | 15 | **15** | 239 | **227** |
| a | 11 | 笠井紀美子 & Oliver Nelson —《In Person》 | 25 | **25** | 229 | **227** |
| a | 12 | 益田幹夫 —《Trace》 | 27 | **27** | 228 | **228** |
| b | 1 | 青木望 —《1999 A.D》 | 23 | **23** | 233 | **229** |
| b | 2 | 土取利行・高木元輝 —《Origination》 | 20 | **20** | 237 | **230** |
| b | 3 | 渡辺貞夫 —《At Pit Inn》 | 26 | **23.5** | 224 | **223** |
| b | 4 | 渡辺貞夫 —《Swiss Air》 | 24 | **24** | 233 | **230** |
| b | 5 | 笠井紀美子 with Cedar Walton Trio —《Kimiko Is Here》 | 23 | **23** | 233 | **229** |
| b | 6 | 大野俊三 —《Bubbles》 | 24 | **24** | 233 | **230** |
| b | 7 | 大野俊三 —《Something's Coming》 | 23 | **23** | 232 | **228** |
| b | 8 | 増尾好秋 —《111 Sullivan Street》 | 24 | **24** | 230 | **227** |
| b | 9 | 日野皓正 —《Speak To Loneliness》 | 25 | **20** | 231 | **229** |
| b | 10 | 坂田明トリオ —《Counter Clockwise Trip》 | 19 | **19** | 233 | **225** |
| b | 11 | 山下洋輔トリオ —《Up-To-Date》 | 21 | **19** | 234 | **228** |
| b | 12 | 土取利行・坂本龍一 —《Disappointment-Hateruma》 | 28 | **25.5** | 229 | **230** |

**a 組定稿：226／230／230／226／228／226／228／230／226／227／227／228**
**b 組定稿：229／230／223／230／229／230／228／227／229／225／228／230**
**24 筆全部 ≤230；min 223（《At Pit Inn》）、max 230（七張）、中位 228。分佈：≤225 共 2 張、226–229 共 15 張、230 共 7 張。**
**hook 加權 15–27（離上限 50 極遠）；note 原始 224–239（離上限 350 極遠）。**

⚠ ⚠ **本批初稿 24 筆全部超標**（第一版預算 231–357，最高超標 127）——**本線第九次連續全批超標**（承 c-183 第 5838 條）。
**全部靠「整格捨去」與逐格縮寫壓到 230 以內，一筆都沒有留給寫作層砍**（見 5847）。
⚠ **超標倍率 1.0–1.55 倍，高於 c-183 的 1.0–1.31**：成因可歸因——**本批的 facts 主體不是日本人名而是外國樂手名與目錄號**
（b 組 12 張有 9 張的班底在美國或歐洲：`Cedar Walton`／`Sam Jones`／`Billy Higgins`／`Roy Haynes`／`Reggie Lucas`／
`Bob Cranshaw`／`Adelhard Roidinger`／`Horst Weber`／`Ralph MacDonald`⋯），**拉丁字母不打折、一個名字吃 9–18 字預算。**

## 5839　⚠ ⚠ **hook 的原始字元數才吃預算，加權值不吃**（第 1911-B 條，本批第八次證實）

本批四張是乾淨實例：
- **b9《Speak To Loneliness》hook 原始 25、加權只有 20**（`三軌，A 面整面是一首 18 分 10 秒的曲子。`，加權只有原始的 80%，全批落差最大）
- **b12《Disappointment-Hateruma》原始 28／加權 25.5**、**b3《At Pit Inn》原始 26／加權 23.5**、**b11《Up-To-Date》原始 21／加權 19**
⚠ **這四張的 `chk-hook-crossgroup` 完全不出聲**（它報的是加權），**而它們在預算表上吃掉的是 25／28／26／21 字。**
⚠ **定稿 hook 原始長度 15–29，派工信第二節「一律壓到 30 字以內」0 例外**；**a5《デマ》正好壓在 29。**

## 5840　⚠ ⚠ 本批的兩欄配表（日期＋動詞／目錄號引入法）：**24 張 24 種，開工就配死，第一輪只長出 17 條、第二輪剩 3 條、第三輪 1 條、第四輪 0 條**

照派工信第三節「連目錄號／廠牌怎麼引入句子一起配」辦。**本批 CBS/Sony 11 張、East Wind 4 張、Crown 2 張、ALM 2 張，集中度是本線最高的一批**，所以兩欄都必須配滿：

| 卡 | 日期＋動詞／語序 | 目錄號引入法 |
|---|---|---|
| a1 殺人十章 | `1972 年 CBS/Sony 推出的⋯盤`（廠牌當主詞的名詞句） | **盤上的號是** |
| a2 Sadao Watanabe | `⋯日的⋯錄音，九軌，同年交給` | **目錄號** |
| a3 Kenya Ya Africa | `⋯日於⋯的音樂會實況；碟同年由⋯發行` | **唱片號** |
| a4 Hirocosmos | `⋯日進⋯的一號錄音室，同年上市` | **碟號** |
| a5 デマ | `1973 年經⋯做成四聲道 LP` | **號碼欄寫** |
| a6 フレンズ | `⋯日兩天進棚，五軌同年歸` | **商品號** |
| a7 Inspiration & Power 14 | `⋯日起在⋯的音樂節實況，這一年就壓成兩片裝` | **盤面號** |
| a8 去来 Kyorai | `1974 年從⋯出來的六軌盤` | **編號** |
| a9 Mbali Africa | `⋯日⋯的音樂會實況，同年落在⋯名下` | **號欄** |
| a10 怪顚 | `⋯日一天錄完，八軌同年掛⋯字標` | **那一號是** |
| a11 In Person | `⋯日⋯的演出實況，隔年印成⋯的四聲道盤` | **號**（緊跟四聲道盤） |
| a12 Trace | `⋯日在⋯錄成六軌，同年分到⋯` | **號**（緊跟廠牌後一個逗號） |
| b1 1999 A.D | `1974 年在自家一號錄音室錄完，十一軌的碟同年出自⋯` | **號碼** |
| b2 Origination | `⋯日壓的黑膠，五軌，廠牌欄並列⋯`（名詞句） | **系列第四號** |
| b3 At Pit Inn | `⋯日⋯的實況，唱片隔年才出，廠牌⋯` | **號** |
| b4 Swiss Air | `⋯日那場⋯的現場，同年成了⋯的黑膠` | **號** |
| b5 Kimiko Is Here | `錄音落在⋯日的⋯，1975 年才輪到⋯發它` | **號** |
| b6 Bubbles | `1976 年⋯的五軌盤⋯；錄音早半年，在⋯`（名詞句＋倒敘） | **編號** |
| b7 Something's Coming | `⋯日在紐約錄完，同年進了⋯的目錄` | **號** |
| b8 111 Sullivan Street | `⋯日錄成八軌，同年掛⋯問世` | **號** |
| b9 Speak To Loneliness | `⋯日錄於東京，三軌，同年在⋯那條線上發出來` | **號** |
| b10 Counter Clockwise Trip | `⋯日錄於⋯的⋯，碟同年由⋯發出` | **號** |
| b11 Up-To-Date | `⋯日⋯的整場實況，同年 7 月由⋯切成兩枚組` | **號** |
| b12 Disappointment-Hateruma | `1976 年的黑膠，四軌，字標⋯`（名詞句） | **系列第七號** |

**24 張 24 種語序／動詞**（推出・交給・發行・上市・做成・歸・壓成・出來・落在・掛字標・印成・分到・出自・並列・才出・成了・輪到發・早半年・進目錄・問世・發出來・發出・切成・字標）
＋ **12 種目錄號引入法**（盤上的號是・目錄號・唱片號・碟號・號碼欄寫・商品號・盤面號・編號・號欄・那一號是・號碼・系列第 N 號 ＋ 裸 `號`）。
⚠ ⚠ **實測：兩欄配死之後第一輪仍長出 17 條 3 張以上的漢字 4-gram，收斂用了四輪**（c-183 一輪、c-180 一輪、c-178 兩輪半、c-175 四輪）。
**根因與 c-178 不同，是本批特有的**：**17 條裡有 11 條是「日期樣板」自己的殘片**（`年月日在`／`年月日生`／`年月日的`／`年月日錄`／`他年月日`／`月日生於`／`年月與日`⋯）
——**漢字過濾器把阿拉伯數字整個剝掉之後，「1972 年 2 月 24 日在」與「1975 年 1 月 15 日在」變成同一個字串 `年月日在`。**
⚠ ⚠ **記成判準給 c-185 之後**：**「日期＋動詞」要配的不只是動詞，還有「日」後面那一個字**
（本批最後配成 `日在`／`日於`／`日進`／`日起在`／`日一天`／`日兩天`／`日壓的`／`日那場`／`日錄於`／`日錄成`／`日的`／`日、⋯日與` 共十二種）。
**只配廠牌動詞不夠——那條樣板的接縫在日期那一側。**

## 5841　⚠ ⚠ 跨張 n-gram 自查：**漢字與片假名兩輪都跑，四輪收斂，定稿 3 張以上 0 條**

`chk-hook-crossgroup` 看不到這一項（第 3938 條），本層自己跑（scratchpad `c184h/c184h-ngram.mjs`，沿用派工信指定的 `c174w1/c174w1-ngram.mjs` 骨架，
與 c-183 第 5841 條同一支）。做法：24 張的 `hook + note` 串起來，剝掉樣板字，**再分兩輪**：一輪只留漢字（U+3400–U+9FFF）、一輪只留片假名（U+30A0–U+30FF）。

**第一輪（初稿）漢字 17 條**，逐條處置：

| 4-gram | 張數 | 性質 | 處置 |
|---|---:|---|---|
| `年月日在` | **4**（a2／b9／b10／b11） | 日期樣板接縫 | a2 改 `日的⋯錄音`、b9 改 `日錄於`、b10 改 `日錄於`、b11 改 `日⋯的整場實況`（去掉 `在`） |
| `年月日生` | **4**（a2／a4／a5／a10） | 生年樣板 | a2 改 `他生於 1933 年 2 月 1 日`、a4 改 `生日 1953 年 3 月 27 日`；**只留 a5／a10** |
| `實況同年` | **4**（a3／a7／a9／b11） | 「實況，同年」樣板 | a3 改 `；碟同年`、a7 改 `這一年就`；**只留 a9／b11** |
| `月日在東`／`日在東京` | **3**（a2／b9／b11） | 同 `年月日在` | 同上，一併解掉 |
| `軌盤同年` | **3**（a2／b8／b9） | 「N 軌盤，同年」 | a2 改 `九軌，同年`、b8 改 `錄成八軌，同年`；**只留 b9** |
| `他年月日` | **3**（a2／a5／a11） | 「他 + 日期」 | a2 改 `他生於`；**只留 a5／a11** |
| `月日生於` | **3**（a2／a5／a10） | 同 `年月日生` | 同上 |
| `領銜者的` | **3**（a3／a9／b3） | 句型同構 | a3 改 `掛名那位的弟弟`、b3 改 `掛名那位吹中音薩克斯`；**只留 a9** |
| `錄音室錄` | **3**（a4／a12／b1） | 「錄音室錄完／錄的」 | a4 改 `進⋯的一號錄音室`、a12 改 `錄音室完成`；**只留 b1** |
| `錄完同年` | **3**（a4／b7／b10） | 「錄完，同年」 | a4 改 `進⋯錄音室，同年`、b10 改 `錄於⋯，碟同年`；**只留 b7** |
| `年月與日` | **3**（a6／a12／b8） | 「X 月 N 與 M 日」 | a6 改 `5 月 10、11 兩天`；**只留 a12／b8** |
| `軌的碟同`／`的碟同年` | **3**（a6／a10／b1） | 「N 軌的碟，同年」 | a6 改 `五軌同年`、a10 改 `八軌同年`；**只留 b1／b10** |
| `軌的作曲` | **3**（a9／a10／b7） | 「N 軌的作曲欄」 | a9 改 `十三軌的曲全掛`；**只留 a10／b7** |
| `年月日的` | **3**（b2／b4／b5） | 日期樣板 | b2 改 `日壓的黑膠`、b4 改 `日那場`；**只留 b5** |
| `分鐘之間` | **3**（b5／b6／b9） | 「X 到 Y 分鐘之間」 | b5 改 `都是三到六分鐘的歌`、b9 改逐軌秒數；**只留 b6** |

**第二輪剩 3 條**（`年月日東`／`月日東京` ×4 ＝ a3／a9／b9／b11、`的碟同年` ×3 ＝ a10／b1／b10）→ a3 改 `日於東京`、b9 改 `日錄於東京`、a10 改 `八軌同年`。
**第三輪剩 1 條**（`年月日錄` ×3 ＝ a4／b9／b10，**a4 那一處是 `⋯3 月 27 日，錄這張時他二十歲` 的跨句黏合**，正是派工信第三節警告的形狀）→ a4 改 `進棚那天二十歲`。
**第四輪剩 1 條**（`他年生於` ×3 ＝ a5／a6／a12）→ a5 改成 `佐藤允彦 1941 年生於東京`。

**定稿的複掃結果（本節寫入前最後一次跑，逐字）**：

```
=== 漢字：4-gram 出現在 3 張以上： 0 條 ===
--- 漢字：出現在 2 張的 4-gram： 67 條 ---
=== 片假名：4-gram 出現在 3 張以上： 0 條 ===
--- 片假名：出現在 2 張的 4-gram： 8 條 ---
```

- ⚠ ⚠ **漢字 3 張以上 0 條、片假名 3 張以上 0 條**——**本線第五次歸零**（c-180、c-179、c-182、c-183 之後）。
- **片假名那一輪的 8 條全部是兩個專名自己的殘片**：`クラウン`／`ラウンレ`／`ウンレコ`／`ンレコー`／`レコード`（b1 與 b11 共用 `クラウンレコード`）、
  `ピット・`／`ット・イ`／`ト・イン`（b3 與 b5 共用 `新宿ピット・イン`）——**兩組都是同一個專名跨兩張，照 `hook-base.md`「專名不算同構」保留。**
- **出現在 2 張的 67 條逐條看過**：日期樣板的殘留接縫（`年月日的`／`年月日生`／`月日生於`／`年月日東`／`月日東京`／`年月與日`／`月日錄於`／`人年月日`／`他年月日`／`分鐘年月`／`鐘年月日`）、
  樂器與專名（`位薩克斯`／`薩克斯手`／`佐藤允彦`／`山本邦山`／`一軌管樂`／`爵士曲庫`／`郵便貯金`／`便貯金的`）、
  格式名詞（`軌全出自`／`欄只掛他`／`只掛他一`／`掛他一個`／`他一個人`／`領銜者一`／`銜者一個`／`者一個人`／`四軌都在`／`分鐘以上`／`面整面一`／`一首分秒`／`一首曲子`／`上只有兩`／`只有兩個`／`吉他那一`／`他那一格`／`那一格坐`／`一格坐的`／`格坐的是`／`獨奏一段`／`奏一段才`／`五軌裡四`／`軌裡四軌`／`盤面另有`／`面另有一`／`位演奏者`／`黑膠四軌`／`一號錄音`／`號錄音室`／`碟同年由`／`同年由發`／`八軌同年`／`軌同年掛`／`軌的碟同`／`的碟同年`／`軌的作曲`／`作曲欄只`／`作曲與編`／`曲與編曲`／`與合成器`／`實況同年`／`的音樂會`／`音樂會實`／`樂會實況`／`的音樂節`／`十三軌裡`／`掛名那位`／`他年生於`），
  **無三張以上的句型同構。專名與樂器名照 `hook-base.md` 不算同構。**

## 5842　⚠ ⚠ **hook 與 hook 之間也掃了一輪**（主線第 1964-B 條，本線第一次實地跑）

**「兩端都是 hook 原文」的殘片只有鉤子層改得動，寫作層無權改**——所以這一輪排在動筆前與交件前各跑一次
（scratchpad `c184h/c184h-hookngram.mjs`，只吃 `hook` 欄、門檻降到 **2 張**）。

```
=== hook 之間 漢字：4-gram 出現在 2 張以上： 0 條 ===
=== hook 之間 片假名：4-gram 出現在 2 張以上： 0 條 ===
```

⚠ **門檻放到 2 張仍然 0 條**——**c-183 那兩條（`在同一個`／`一軌分秒`）在本批 0 命中。**
成因可歸因：**本批 24 個 hook 的開頭前四字互異（`chk-hook-crossgroup` 第一道 0 報），而且四型輪換是按組交錯配的**
（斷言 11 張・懸疑 6 張・人物定調 4 張・場景 3 張），**同型的兩張刻意不相鄰**。
⚠ **建議給 c-185 之後**：**這一輪門檻就用 2 張**，因為 hook 只有 15–29 字，一條 4-gram 佔掉的比例比 note 大得多。

## 5843　⚠ ⚠ **五張 渡辺貞夫 怎麼分軸**（派工信 §四 1；本線單批最多的一位，跨兩組）

| 卡 | **主軸** | 只寫在這一張的東西 |
|---|---|---|
| **a2《Sadao Watanabe》**（CBS/Sony `SOPL-21-XJ`、1972） | **他名下有兩張同名的碟，中間隔了十一年** | 1961 年 8 月那張 King 的同名碟、1933-02-01 宇都宮市、1962 赴 Berklee／1965 回國／1968 Newport、斯瓦希里語九軌、`SOPL-21-XJ` |
| **a3《Kenya Ya Africa》**（CBS/Sony `SOPL 233`、1973） | **十三個非洲人只掛唱與打擊，對面是四個日本爵士樂手** | 1973-09-20 飯野ホール、`Meets` 兩個對等掛名、領唱 `George Menoe`、那支歌舞團只留一張碟、〈Shosholoza〉、渡辺文男 的兄弟關係、鈴木良雄 一個月後赴美 |
| **a9《Mbali Africa》**（CBS/Sony `SOPW 27～28`、1974） | **台上九個人裡，打擊那一格是自己重造一套鼓回來的人** | 1974-09-20 郵便貯金ホール、九人全明星、**富樫雅彦 1970 年 1 月那道分界與「打擊」而不是「鼓」**、渡辺香津美 差一個月滿二十一、日野元彦 的十五年票選 |
| **b3《At Pit Inn》**（CBS/Sony `SOPN 113`、1975） | **1974 年的平安夜，新宿一家爵士屋的台上有四個人** | 1974-12-24 新宿ピット・イン、`Cedar Walton`／`Sam Jones`／`Billy Higgins` 三位美國樂手、五軌全出自爵士曲庫、當晚貝斯手自己寫的那一軌、**`Gerald Oshita` 那一格少見的 credit** |
| **b4《Swiss Air》**（CBS/Sony `SOPN-159`、1975） | **全是日本人的四重奏，在瑞士的音樂節上吹馬賽草原** | 1975-07-18 Montreux、音樂節自 1967 年起每年 7 月、三個東非曲題、**兩軌掛作曲／三軌掛編曲那個分法**、其中兩軌前一年已在他一張雙張現場盤上出現過 |

⚠ **五張的 note 互相沒有點名對方的盤名**（第 1787-B 條），`qa-batch` 的 `互指?` **0 行。**
⚠ ⚠ **`Gerald Oshita` 在 a9 與 b3 的 facts 裡都有，本層整條讓給 b3**（a9 的四格一個字都沒有提他）——**理由：a9 的混音那一格與編制軸無關，b3 的「Engineering Supervised By 掛給一位樂手」才是它自己的軸。**
⚠ ⚠ **他的生年與 Berklee 只寫在 a2**（研究層第 5800 條同向）；**b3 與 b4 一個字不寫生平前史**；**b3 的 `ナベサダ` 綽號與攝影集整格捨去**（見 5847）。
⚠ ⚠ **`Cedar Walton` 跨 b3／b5 兩張**：**b3 寫他 1934 年生與 Art Blakey 那條線**（定稿因預算砍掉，見 5847）／**b5 只寫他的出場是 RCA Records 的好意**——兩張的切面一個是身分、一個是合約。
⚠ **b4 的「兩軌前一年已在他一張雙張現場盤上出現過」刻意不點名那張碟**（那是同批 a9）——**照第 1787-B 條，讓出的卡不點名歸給哪一張。**

## 5844　⚠ ⚠ **另外四位跨兩組或同組兩張怎麼分軸**（派工信 §四 2）

| 藝人 | 卡 | **主軸** | 互寫排除 |
|---|---|---|---|
| **笠井紀美子** | **a11《In Person》** | **替她編曲指揮的美國人，二十一年前是駐日美軍的一員** | 整卡的重心是 `Oliver Nelson` 的 1952 年東京那一刻 ＋ 錄音 1973／唱片 1974／辭世 1975-10-28 的時序；**她的生平（京都、杯麵廣告曲、洛杉磯、引退）整格捨去** |
| | **b5《Kimiko Is Here》** | **盤面上印著一行字：那位鋼琴手是別家公司借來的** | 曲目來源（1957 年替 `Julie London` 寫的那首、寫出〈Just the Two of Us〉那對搭檔）；⚠ **一個字不寫她的整體生涯線** |
| **山本邦山** | **a8《去来 Kyorai》** | **兩件笛子對答，B 面整面就一首曲子** | `Chris Hinze` 的 1938 年荷蘭出生、1970 Montreux 獎、**CBS 目錄與巴洛克改編那條招牌**；**三部作只寫「第一張」，不寫第三張的掛名與目錄號** |
| | **a10《怪顚》** | **彈箏的那位平常會拿鼓棒去敲弦** | `沢井忠夫` 的箏法與 1971 年藝術祭優秀賞 ＋ **與 山本邦山 同年出生、只差兩個多月 ＋ 1964 年民族音楽の会**；**Hinze 的生年與 Montreux 獎整格讓給 a8**（本卡連他的名字都沒有出現） |
| **大野俊三** | **b6《Bubbles》** | **同一個曲題在這張碟上出現兩次，長度差了快五分鐘** | **1976 年發行／1975 年 7 月紐約錄音的兩個年份逐格寫明**、`Vanguard Studio` 的全美國電聲班底、`Roy Haynes` 掛的那一軌曲 |
| | **b7《Something's Coming》** | **盤名多印了一個字母，隔年同廠改號再發時才改對** | **一律寫 1975**、首軌 14 分 12 秒佔滿 A 面、**彈管風琴的 菊地雅章 是五人裡唯一的日本人** |
| **土取利行** | **b2《Origination》** | **兩個人、兩排樂器，五軌裡四軌超過十分鐘** | ALM ＋ 半夏社 兩家並列的廠牌欄、系列第四號、**寫解說的 間章**、兩人各掛幾軌的作者欄 |
| | **b12《Disappointment-Hateruma》** | **1976 年只壓了五百張，而素材清單裡連地下鐵都算一項** | 五百張的壓量、聲音素材清單、兩面各自的標題、**坂本龍一 錄這張時還在東京藝術大學**、掛製作的 竹田賢一 |

⚠ ⚠ **`大野俊三` 那兩張的年份一前一後最容易寫反，本層的處置是「兩張的 g1 都把兩個年份寫死」**：
**b6 逐字「1976 年⋯的五軌盤⋯錄音早半年，在 1975 年 7 月的紐約」、b7 逐字「1975 年 2 月 20、21 日與 3 月 6 日在紐約錄完，同年進了 East Wind 的目錄」**
——**b7 的四格一個 1976 都沒有，b6 的四格一個「1975 年發行」都沒有。**
⚠ **`土取利行` 兩張的掛名分隔符照卡單逐字沿用 `・`(U+30FB)**（第 5770 條），**兩張的 `key` 是從研究稿逐字複製的，本層一個字元都沒有改。**
⚠ **他的獎項（大野俊三 三件）本層一個字都沒有寫**——照研究層的反向禁令，與派工信 §四 2 一致。

## 5845　⚠ ⚠ ⚠ **`live` 那五張的處置，以及《Up-To-Date》那一格為什麼空著**（派工信 §四 3；主線第 1958-B／1969-B 條）

| 卡 | 定稿 g1 的逐字寫法 | 檢查 |
|---|---|---|
| a3《Kenya Ya Africa》 | `1973 年 9 月 20 日於東京飯野ホール 的音樂會實況；碟同年由 CBS/Sony 發行` | ✔ 場館＋單一日期＋「實況」 |
| a9《Mbali Africa》 | `1974 年 9 月 20 日東京郵便貯金ホール 的音樂會實況，同年落在 CBS/Sony 名下` | ✔ |
| a11《In Person》 | `1973 年 9 月 24 日郵便貯金ホール 的演出實況，隔年印成 CBS/Sony 的四聲道盤` | ✔ **錄音年與發行年逐句分開** |
| a7《Inspiration & Power 14》 | `1973 年 6 月 30 日起在東京新宿アートシアター 的音樂節實況，這一年就壓成兩片裝` | ✔ **音樂節實況，沒有一句寫成精選或拼盤** |
| b11《Up-To-Date》 | `1975 年 4 月 28 日東京厚生年金会館 的整場實況，同年 7 月由クラウンレコード 切成兩枚組` | ✔ 另加 g2 的「副題把ライブ 與錄音日印在上面」與「一整組演唱會工作人員」兩項證據 |

**五張的 note 沒有任何一句寫成錄音室盤；`錄音室` 這三個字在這五張裡 0 命中**（它只出現在 a4／a12／b1 三張真的在錄音室錄的碟上）。
⚠ ⚠ **b11 的〈Chiasma〉對照整格不寫**（派工信 §四 3 末段＋主線第 1969-B 條）：
**池中 `山下洋輔トリオ《Chiasma》1976` 不是錄音室盤，是 1975-06-06 海德堡的實況，策展層第 5773 條 (1) 要寫作層寫的那句對照不成立**
——**本層的處置是連 B 面那一軌的曲題一起整格不寫**，b11 的四格沒有任何曲題，**寫作層沒有材料可以把它寫成「隔年同名錄音室盤的先行版」。**
⚠ **反過來，另外三張不是現場的碟也各自寫了正面的錄音室交代**（b2 逐字「日壓的黑膠」、b10 逐字「錄於西德慕尼黑的 Union Studio」、b12 逐字「1976 年的黑膠」）
——**三張都沒有寫成現場，也都沒有寫否定句。**

## 5846　骨架歸屬表（24 張全表；**「這條骨架全批只走本張」逐張都有，讓出的卡不點名對方**）

| 骨架 | 歸屬 | 讓出的卡改寫什麼 |
|---|---|---|
| 十軌選題出自一本英國殺人百科 ＋ 每軌配英譯副題 | **a1** | — |
| SQ 四聲道編碼 ＋ 對開封套 | **a1** | **a5 讓出四聲道的技術面**，只寫「經 CBS/Sony 做成四聲道 LP」，`Sound Display Series` 整格捨去 |
| 1971 年成軍、迎入歌手後改稱 LOVE LIVE LIFE + ONE | **a1** | 前作那張碟的內容與軌數整格捨去（它是另一張碟） |
| 兩張同名的碟相隔十一年 | **a2** | — |
| 生年 ＋ Berklee ＋ 回國 ＋ Newport | **a2** | **a3／a9／b3／b4 一個字不寫生平前史** |
| 九軌題全是斯瓦希里語 ＋ 片假名讀音 | **a2** | a3／a9／b4 的非洲題材各走自己的形狀（歌舞團／坦尚尼亞地名／三個東非曲題） |
| 十三個非洲人只掛唱與打擊 ＋ 領唱 George Menoe | **a3** | — |
| 渡辺文男 的兄弟關係 | **a3** | **a12 的兄弟編制改寫成「打鼓的是他弟弟」而不點名** |
| 鈴木良雄 一個月後赴美 | **a3** | **a6 讓出赴美時序**，改寫製琴世家與改彈貝斯那一段 |
| 四張個人專輯換四家廠牌 | **a4** | — |
| 一個人包下五件鍵盤樂器 ＋ 二十歲的電吉他 | **a4** | **b1 的「三個角色掛同一人」走的是曲／製作／合成器，不是樂器清單** |
| 四十九段編號的「情報」＋ SF 小說家的台本 | **a5** | — |
| 佐藤允彦 的 Berklee 與 Swing Journal 獎 | **a5** | **a7 讓出他的生平**，只寫 Mingus 交叉點 |
| 製琴世家（祖父創辦製琴廠、父親製琴師、母親教鋼琴） | **a6** | — |
| 在音樂教室師事、被建議改彈貝斯 | **a6** | — |
| 鋼琴與鼓是合作六年的搭檔 | **a6** | — |
| 廠牌是一家音響工廠開的 ＋ 製造欄印的就是它 | **a7** | **b1／b11 的クラウンレコード 走社名與自家錄音室，不寫音響業的來歷** |
| 宮間利之とニューハード 與 佐藤允彦 1971 年同在 Mingus 那次錄音 | **a7** | **a5 不寫 Mingus**（研究層第 5794 條逐字要求） |
| B 面整面一首 20 分 36 秒 ＋ 兩件笛子對答 | **a8** | **b9 的 A 面整面一軌走 18 分 10 秒那條線，兩張的長曲切角分開** |
| Chris Hinze 的 CBS 目錄與巴洛克改編 | **a8** | **a10 連他的名字都沒有出現** |
| 三部作的「第一張」 | **a8** | **a10 只寫系列第二號的曲序同形，不寫三部作三個字**（不暗示三張齊全） |
| 富樫雅彦 1970 年 1 月那道分界 ＋ 自造鼓組 ＋ 打「打擊」 | **a9** | **a7 只把他算進八組編制之一，一個字不寫分界** |
| 九人全明星 ＋ 渡辺香津美 差一個月滿二十一 ＋ 日野元彦 十五年票選 | **a9** | **a12 的 日野元彦 只寫成「他弟弟」，票選整格捨去** |
| 沢井忠夫 的箏法（當打擊樂器用、拿鼓棒敲弦）＋ 1971 年藝術祭優秀賞 | **a10** | — |
| 山本邦山 與 沢井忠夫 同年出生 ＋ 1964 年民族音楽の会 | **a10** | **a8 一個字不寫兩人的交情** |
| Oliver Nelson 1952 年在東京決定當作曲家 ＋ 1975-10-28 辭世的時序 | **a11** | **全批只有這一張寫「辭世」；b2 的 高木元輝、b6 的 石岡瑛子、b12 的 坂本龍一 三處全部整格捨去** |
| 十三軌裡十一軌是美國標準曲 ＋ 大樂團加弦樂 | **a11** | **b3 的曲庫那一格改寫成「五軌全出自爵士曲庫」，b5 改寫成「十軌都是別人寫的歌」** |
| 小號手寫了鋼琴盤上兩首曲子 ＋ 打鼓的是他弟弟 | **a12** | — |
| East Wind 為把日本藝人推向海外而設 ＋ 錄音室與壓片同屬 Victor 那條線 | **a12** | ⚠ **b6／b7／b8／b9 四張 East Wind 盤的廠牌沿革一句都不寫**（研究層第 5757 條同向） |
| 曲／製作／合成器三個角色掛同一人 | **b1** | — |
| 十一軌排出一條從毀滅走到安寧的線 ＋ 底特律的合唱組 | **b1** | — |
| 配樂作曲家的目錄裡這張是特例 | **b1** | — |
| ALM ＋ 半夏社 兩家並列的廠牌欄 ＋ 系列第四號 | **b2** | **b12 只寫「字標 ALM Records、系列第七號」，半夏社 與 New Improvisational Music 這條系列名整格捨去** |
| 四筆 credits 就是全部（兩位演奏者＋解說＋錄音） | **b2** | **b12 的「六筆 credits」整格捨去，改寫兩面的標題** |
| 間章 的評論家身分 | **b2** | — |
| 平安夜的爵士屋 ＋ 三位美國樂手 ＋ 當晚貝斯手自己寫的那一軌 | **b3** | **b5 共用同一支三重奏、同一間爵士屋、相差兩天，但四格的曲目與日期一律沒有互換** |
| Gerald Oshita 那一格少見的 credit | **b3** | **a9 的混音那一格整格捨去** |
| Montreux 自 1967 年起每年 7 月 ＋ 全日本班底 ＋ 三個東非曲題 | **b4** | — |
| 兩軌掛作曲／三軌掛編曲的分法 | **b4** | — |
| 借將的授權註記（RCA Records 的好意） | **b5** | — |
| 曲目來源（替 Julie London 寫的那首、〈Just the Two of Us〉那對搭檔） | **b5** | — |
| 盤名曲在 A 面開頭與 B 面末尾各一版、長度差近五分鐘 | **b6** | — |
| 1976 發行／1975 年 7 月紐約錄音的兩個年份 | **b6** | **b7 的四格一個 1976 都沒有** |
| 赴美的邀約與第一批紐約合作對象 | **b6** | **b7 不寫赴美，改寫 菊地雅章** |
| 盤面多印了一個字母 ＋ 隔年改號再發才改對 | **b7** | — |
| 五人裡唯一的日本人（菊地雅章 與他的兄弟） | **b7** | — |
| 盤名是一個門牌號 | **b8** | — |
| 編制要到四年後的重壓才印出來 ＋ 兩組節奏組逐軌輪替 | **b8** | — |
| Bob Cranshaw 與 Sonny Rollins 那條線 | **b8** | — |
| A 面整面一軌 18 分 10 秒 ＋ 十位演奏者裡一位巴西人 | **b9** | — |
| 1969 年同名專輯主題曲的 1975 年新錄 ＋ 1979 年美國授權 | **b9** | — |
| 廠牌的第一號盤 ＋ 首軌曲題是拿廠牌名造的字 | **b10** | — |
| 奧地利貝斯手 ＋ 盤面致謝 Enja 的創辦人 | **b10** | — |
| 兩枚組的整場實況 ＋ 副題把ライブ 與錄音日印在盤上 ＋ 一整組演唱會工作人員 | **b11** | **b10 一個字不寫 山下洋輔 那支三重奏**（坂田明／森山威男 在 b10 只出現在「三個人各自帶曲進來」那一格，沒有點名） |
| 四面各一軌、每一軌超過 18 分鐘、C 與 D 面同曲兩版 | **b11** | — |
| 只壓了五百張 ＋ 聲音素材清單裡的地下鐵 ＋ 兩面各有標題 | **b12** | — |
| 坂本龍一 錄這張時還在東京藝術大學 | **b12** | — |

## 5847　「整格捨去」逐筆（本層砍掉的東西，不留給寫作層）

| 卡 | 初稿預算 | 捨去的格 | 定稿 |
|---|---:|---|---:|
| a1 殺人十章 | 261 | 三條 CBS/Sony 工法與企劃字樣、七人編制逐名、市原宏祐 的生卒年與晚年演歌那條線（反向禁令第二類）、柳田ヒロ 的生平（歸 a4）、前作的軌數與 King 的 ℗ 年、community 數字 | 226 |
| a2 Sadao Watanabe | 252 | `SX68Sound` 的工法字樣、六人編制逐名、高柳昌行 的 New Direction 別名、菅野沖彦 的音響評論家身分、七吋開盤帶那一版的換掛名、八版版本表、⚠ **同一筆 release 上三種目錄號寫法並存那一整格**（每格只放一個目錄號，見 5851） | 230 |
| a3 Kenya Ya Africa | 252 | 定價 2200 日圓、十三軌逐字、本田竹曠 的期別形與電鋼琴、幕後三位（鈴木智雄／守崎幸夫／菅野沖彦）、1975 年法國 Epic 授權版、六版版本表 | 230 |
| a4 Hirocosmos | 257 | 定價 2000 日圓與 `SX-74 Sound`、七軌曲題、其餘四位樂手（後藤次利／Robert Rosenstein／村岡健／川原正美）、前三張的盤名與目錄號、他的本名與 ザ・フローラル／エイプリル・フール／フード・ブレイン 那條團史、CBS/Sony 1968 年的合資來歷、三版版本表 | 226 |
| a5 デマ | 304 | `Sound Display Series No. 2` 的系列號、四軌的逐字結構、市原宏祐 的六種管樂器、兩支樂團的團名逐字、七位樂手逐名、田中三一 的綽號、筒井康隆 的 SF 御三家與 1972 年搬神戶、1974 年那本同名短篇集、佐藤允彦 的慶應首席與另兩座藝術祭優秀賞、三版版本表 | 228 |
| a6 フレンズ | 239 | 五軌的逐軌長度與曲題（〈Friends〉撞池中三張同名盤，見 5854）、cap obi 與 `SX-74 Sound`、峰厚介 的生年與 Three Blind Mice 第一號、村上寛 的生年、末軌的巴薩諾瓦與長笛、早稻田的タモリ／増尾好秋 人脈、1973-10 赴美與 Stan Getz／Art Blakey 兩段（歸 a3）、四版版本表 | 226 |
| a7 Inspiration & Power 14 | 296 | 八組編制逐名、沖至クインテット 那段的無鋼琴編制、副島輝人 的生卒年與兩家廠牌、稲岡邦弥 的生年與 ECM 的書、山下洋輔トリオ 1969 年成立與 1972 年換人、封套設計與 `K2 (11)`、清水俊彦 的解說、八版版本表與 2010 年 CD 再發的 Apple 條目 | 228 |
| a8 去来 Kyorai | 271 | 六軌逐字曲題與長度、系列欄的和文全名、〈Wave 1〉那首編號曲（歸 a10 的系列延續、最後兩張都捨）、第三張《萬華 = Mange》的目錄號與掛名、山本邦山 的生卒年與本名與都山流、他 1966–1970 那四筆爵士合作、Hinze 的本名與海牙皇家音樂院、他五張歐洲 CBS 盤的盤名逐字、community 數字 | 230 |
| a9 Mbali Africa | 261 | 定價 3800 日圓與 `Recital Produced by`、九人編制逐名、十三軌逐字曲題與末軌的 `Encore`、鈴木勲 的 Jazz Godfather 與 Art Blakey、中村慶一 的 Miles Davis／Herbie Hancock、**Gerald Oshita 整格（讓給 b3）**、六版版本表、官方頁的和文題 | 226 |
| a10 怪顚 | 252 | `SX-74 Sound`、八軌逐字曲題（含〈波II〜涅槃〉）、盤面全題的等號形、沢井忠夫 的卒年與 宮城道雄、1960／1962 兩次畢業、十二音音階的作品、1962 年那張 NHK 照片、Hinze 的生年與 Montreux 獎與 Keytone Records（歸 a8）、岩浪洋三 的解說、community 數字 | 227 |
| a11 In Person | 296 | 四聲道說明插頁上那張六十一張的圖片目錄、伴奏團體的逐名編制（原信夫とシャープス&フラッツ 的團名與 1951 年成立只留一句，最後連團名也砍）、MC 磯野晃雄 與他的假名署名、十一軌的作曲者逐名、主題曲〈Goody Goody〉與末軌〈3-2-1-0 (Band's Theme)〉的曲題與 1 分 07 秒、她的生平（京都／杯麵廣告曲／洛杉磯／引退）、Nelson 的《The Blues and the Abstract Truth》與〈Stolen Moments〉、他 1967 年搬洛杉磯寫配樂、七版版本表與 Apple 的數位版 | 227 |
| a12 Trace | 268 | 六軌逐字曲題與長度（〈Black Daffodils〉撞一張 1998 年選輯，見 5854）、三重奏與三位客席逐名、岡田勉／植松孝夫／宮田英夫 的生年與「多樂器手」、`LC 5075`、日本フォノグラム 1970-06-01 的三方持股與 Victor 橫濱工廠、**伊藤八十八 設立 East Wind 與 1978 年轉 CBS/Sony 製作 笠井紀美子 那條橫向串連（研究層第 5793 條第 8 點）**、1976 年 `EW-8004` 的換號重壓、六版版本表與 Apple 的 1974-11-05 | 228 |
| b1 1999 A.D | 260 | 伴奏四位的漢字名（三位標 uncertain、本層一律不寫）、兩段英語獨白對白、十一軌逐字曲題、JASRAC 會員、クラウンレコード 1973 年的社名變更、2026 年辭世（反向禁令第二類）、兩版版本表與同號碰撞 | 229 |
| b2 Origination | 254 | 系列名 `New Improvisational Music`、`Kojima Recordings, Inc.`、五軌逐字曲題與長度、盤名的等價形、土取利行 的生年與 Peter Brook／Derek Bailey、高木元輝 的生年與 2002 年辭世與 ESSG、無 master 頁那一格 | 230 |
| b3 At Pit Inn | 327 | 五軌逐字曲題、五軌的作曲者逐名（Johnny Green 一組四人⋯）、**Cedar Walton 1934 年生與 Art Blakey 的樂團那一整格**、他自己寫的四首標準曲、渡辺貞夫 的綽號 ナベサダ 與六本攝影集與妹妹弟弟、製作與錄音與解說三位、八版版本表與 MB 漏的六版 | 223 |
| b4 Swiss Air | 247 | 定價 2400 圓、四人編制逐名（本田竹広／河上修／守新治）、五軌逐字曲題與長度、本田竹広 的生卒年與本名與三個藝名、六版版本表與 1978 年那次「2nd press.」 | 230 |
| b5 Kimiko Is Here | 357 | 十軌逐字曲題、中英日文並列的歌詞內頁、〈Meaning Of The Blues〉的作者與 ABAC 三十二小節、`Miles Ahead` 那張碟的盤名、Ralph MacDonald 的生卒年與打擊樂手身分、Norman Mapp 與 James Shelton 兩位作者的生平與〈Lilac Wine〉、她的珠寶設計與現居地、六版版本表 ＋ Apple 那一筆數位版 | 229 |
| b6 Bubbles | 296 | 二十二筆 credits 的規模、領銜者兼掛的ピアニカ 與 Arp String Ensemble、五位伴奏的樂器逐名（Samuel Jonathan Johnson／Ronald Brockett, Jr／Neil Clarke）、五軌逐字曲題、`Vanguard Studio` 的名字、石岡瑛子 與 成瀬始子 的裝幀與她的生卒年與美國影藝學院、四版版本表 ＋ Apple 那一筆數位版 | 230 |
| b7 Something's Coming | 257 | `The Basement Recording Studio` 的名字、四軌逐字曲題、伴奏五位的樂器逐名（Don Pate／Cedric Lawson／Reggie Lucas）、Kurt Munkacsi 的錄音與混音、岩浪洋三 的解說與 鯉沼利成 的製作、菊地雅章 的卒年與兄弟的名字、七版版本表（含那筆俄國非官方盤）＋ Apple 的 1975-05-25 | 228 |
| b8 111 Sullivan Street | 320 | 八軌逐字曲題與長度、四首標準曲的作者逐名、`Ai Music Co., Ltd.`、1979 年那一版的目錄號 `15PJ-1004` 與錄音地 `Basement Studio`、兩組節奏組的逐軌範圍與六位樂手逐名（Bob Mover／David Lee／鈴木良雄／Jimmy Lovelace）、B3 整軌無伴奏、⚠ **〈Swing 42〉的作曲欄誤掛那一整格**（見 5852）、他的生年與長住紐約、五版版本表 ＋ Apple 那一筆數位版 | 227 |
| b9 Speak To Loneliness | 293 | 定價 2300 圓與 `PSC センタースタジオ` 的名字、B 面兩軌的曲題、基本編制五人逐名與逐軌五人逐名、鈴木宏昌 的編曲與生卒年與綽號 コルゲン、板橋文夫 的生年、油井正一 的解說、Guilherme Franco 的名字（只寫「一位巴西人」）、Inner City 1976 年由 Irv Kratka 創立與 1979 年的年度廠牌票選、美國版與日本原壓的工程人員衝突、八版版本表 ＋ Apple 那一筆數位版 | 229 |
| b10 Counter Clockwise Trip | 296 | 五軌逐字曲題與長度、三位的樂器逐名與 `Producer [For Frasco]`、坂田明 的生年與ミジンコ 與兒子、森山威男 的生年與東京藝大與國際知名度、Enja 1971 年由兩人在慕尼黑創立與早期目錄收了日本前衛樂手、兩版版本表與同號碰撞 | 225 |
| b11 Up-To-Date | 291 | 場館的正式名稱考據與通稱ウェルシティ東京、`Mastered At` 那一格、二十筆 credits 的逐職稱（Concert Direct／Stage Produce／Stage Lighting／Public Adress⋯，只留「一整組演唱會工作人員」）、四軌逐字曲題與長度與作者、⚠ **〈Chiasma〉那一軌與池中那張碟的關係整格不寫**（見 5845）、山下洋輔 的作曲家與散文作家身分、クラウンレコード 的社名考據、六版版本表 | 228 |
| b12 Disappointment-Hateruma | 272 | 系列名 `New Improvisational Music`、四軌逐字曲題與長度（含 `α`／`Φ`／`𝔷` 三個數學符號）、前三軌共作／末軌一人的作者分法、兩間錄音室的名字、竹田賢一 的生年與 1970 年代中期那段評論履歷、土取利行 的生年與跨界四條線、坂本龍一 的近五十種掛名變體、2023 年辭世（反向禁令第二類）、四版版本表與 2026 年那次法國復刻 | 230 |

⚠ **本批最值得記的一筆捨去是 a12 的 `伊藤八十八`**：**研究層第 5793 條第 8 點把他列成 #18 → #16 的橫向串連點（他設立 East Wind、1978 年轉 CBS/Sony 後製作 笠井紀美子）**
——**而 a11《In Person》的四格被 Oliver Nelson 那條軸佔滿，a12 的四格被廠牌鏈條佔滿，兩端都容不下他。**
**本層的處置是整格捨去並在此登記：這是研究層九條串連點裡唯一一條沒有落地的，c-185 若還有 East Wind 盤可以接著用。**
⚠ **第二筆是 b8 的 `〈Swing 42〉`**：**它在事實上完全站得住（研究層補了第二來源、確認是 Django Reinhardt 的曲、Discogs 那一格是錯的），但它的形狀就是「把更正表演給讀者」**，照 `hook-base.md` 整格捨去（與 c-183 第 5847 條的 `Inteligence` 同一個處置）。
⚠ **第三筆是 b3 的 `Cedar Walton` 身分那一格**：**初稿超標 104 字，砍到只剩 `Gerald Oshita` 那一格；他的身分改由 b5 的「出場是 RCA Records 的好意」承載**（兩張的切面因此更乾淨）。

## 5848　⚠ ⚠ ⚠ **壓完預算之後回頭看 hook 有沒有踩空**（`hook-base.md` 開頭那節／主線第 1950-B 條；**本批抓到 4 處**）

**這一道排在壓預算之後跑，不是動筆時做一次就算。** 24 張逐張回看，**4 處踩空，全部在交件前改掉**：

| 卡 | hook 靠在哪一格 | 那一格壓預算時發生什麼 | 處置 |
|---|---|---|---|
| **a5 デマ** | `⋯排著四十九段「情報」，台本出自一位 SF 小說家` | **`四十九段` 與 `SF 小說家` 兩樣都被砍掉了**（g2 只剩「兩大段編號的情報，台本掛 筒井康隆」） | g2 改寫成 `四軌是一段開場、四十九段編號的情報、一段收尾，台本掛 SF 小說家 筒井康隆`，並從 g4 砍掉生日的月日補回預算 |
| **a12 Trace** | `六首裡有兩首是小號手寫的，而打鼓的是那位小號手的弟弟` | **`小號手` 與 `弟弟` 兩樣都不在四格裡**（g2 只剩「兩首出自吹 flugelhorn 那位」） | g2 改寫成 `⋯六首裡兩首是那位小號手寫的，打鼓的是他弟弟` |
| **b6 Bubbles** | `同一個曲題在這張碟上出現兩次，長度差了快五分鐘` | **「盤名曲出現兩次、長度差近五分鐘」那一格被砍掉了** | g3 改寫成 `盤名曲出現兩次，A 面開頭 11 分 03 秒、B 面末尾 6 分 15 秒；⋯` |
| **b11 Up-To-Date** | `四面黑膠、四軌，每一面都超過 18 分鐘` | **`超過 18 分鐘` 被換成「四軌都是成員自己的曲」** | g3 改回 `A 到 D 四面各收一軌，每一軌都超過 18 分鐘，C 與 D 面是同一首曲子的兩個版本` |

⚠ **四處的共同形狀值得記**：**都是「hook 寫的是一個數字或一個身分，而那個數字／身分在初稿裡放在第三或第四格」**
——**壓預算時被砍的永遠是第三、四格的細節，而 hook 偏偏最愛靠在細節上。**
⚠ **建議給 c-185 之後**：**動筆時就把 hook 依賴的那一項放進 g1 或 g2**（本批定稿裡 a1／a3／a4／b1／b7 五張都是這樣寫的，那五張一處都沒有踩空）。

## 5849　⚠ ⚠ **順帶把 hook 自己的事實再驗一次（本批抓到 2 處，全部在交件前改掉）**

1. ⚠ ⚠ **a1《殺人十章》初稿 hook 逐字是 `十個樂章、十樁案子，題目全挑自一本英國殺人百科。`**
   ——**「十樁案子」在 `facts` 裡查無支撐**：facts 只寫「十軌的選題出自英國作家 Colin Wilson 的《Encyclopedia of Murder》」，
   **沒有一條說十軌各對一樁案子**（那是從盤名《殺人十章》倒推出來的）。**改成 `十個樂章，題目全挑自一本英國的殺人百科。`**（原始 24 → 20）。
2. ⚠ ⚠ **a4《Hirocosmos》初稿 hook 逐字是 `⋯第四張把人聲整個拿掉。`**
   ——**「拿掉」預設前三張有人聲，而那件事只在研究稿的 `notes` 裡**（「他 1972 年那張自唱的《HIRO》」），**`facts` 那一欄沒有。**
   照 `hook-base.md`「`notes` 欄不等於 `facts` 欄」與「hook 不得否定讀者沒有的前提」兩條，**改成 `⋯第四張整張都是器樂。`**（正面陳述，由 g2 承載）。
⚠ **另外逐張核過的數字**：b6 的「差了快五分鐘」（11:03 對 6:15 ＝ 4 分 48 秒 ✔）、b8 的「等四年後」（1975 → 1979 ✔）、
a11 的「二十一年前」（1952 → 1973 ✔）、b11 的「每一面都超過 18 分鐘」（19:42／18:08／19:46／21:13 ✔）、a2 的「隔了十一年」（1961 → 1972 ✔）
——**五處全部對得上，沒有 c-182 那種「hook 與它自己的 note 打架」。**

## 5850　⚠ ⚠ 人名：**17 組改判怎麼落地，以及兩形並存的那一組**

- **卡單上的 28 處錯字已由主線改掉（第 1969-B 條），本層逐筆以研究稿的 `facts` 為準再核一次，`facts` 與卡單 0 處出入。**
- ⚠ ⚠ **`本田竹曠`／`本田竹広` 兩形並存，本層刻意不統一**（主線第 1968-B 條第 2 點）：
  **a3《Kenya Ya Africa》的 facts 用 `本田竹曠`（1973 年的期別形）、b4《Swiss Air》的 facts 用 `本田竹広`**
  ——**兩張的 note 都沒有寫出他的名字**（a3 的鋼琴那一格與 b4 的四人編制逐名都在壓預算時整格捨去），
  **所以本批的 note 裡 `本田竹` 這三個字 0 命中，兩形的衝突在鉤子層自然消解。** ⚠ **記給寫作層：兩張的 facts 用的是不同的字形，照各自那張的 facts 抄，不要互相校正。**
- ⚠ **`沢井忠夫` 的生年取 ja 維基的 `1937-12-16`**（第 1968-B 條第 3 點），**而衍生的「與 山本邦山 同年出生、只差兩個多月」那一句只寫在 a10**
  ——**這一句的來源掛在 ja 維基上，若哪天 Discogs 的 1938 是對的，要改的是 a10 的 g4。**
- ⚠ **五處研究層查不到、整格不寫的，本層一處都沒有寫**：`寺田有恒`（a10 封面設計）／`松田正人`（a10 監修，Discogs 錯釘）／
  `山崎比呂志` 的期別形（a7 的打擊）／`前島` 三形（a4 的錄音）／`得広崇` 三形（a7 的貝斯）——**24 張的 note 裡這五個字串 0 命中，也沒有寫任何否定句。**
- ⚠ **b 組標 uncertain 的五處同樣一處都沒有寫**：`岡山和義`／`村上光男`／`河原奈美`（b1 的三位伴奏）、`相見明`（b5 的攝影）、`鳥居信影`（b12 的裝幀）
  ——**b1 的 g1 逐字只寫「伴奏」與「人聲那一格請的是底特律的合唱組」，沒有一個漢字名。**

## 5851　⚠ 目錄號吃預算、每格只放一個目錄號、廠牌與目錄號不連寫

- **24 張的 note 各只出現一個目錄號，24 個**（`SOLL-74002`／`SOPL-21-XJ`／`SOPL 233`／`SOLL 35`／`SOLL-28`／`SOPL-192`／`PA-3006〜7`／`SOCO 103`／`SOPW 27～28`／`SOCO 104`／`SOPM 73`／`EW-7004`／`AD-1999`／`AL-4`／`SOPN 113`／`SOPN-159`／`SOPN 114`／`EW-8028`／`EW-7011`／`EW-8020`／`EW-7008`／`FS-7001`／`JAW-2001～2`／`AL-7`），**第二個目錄號 0 張。**
- ⚠ **a2 的「同一筆 release 上三種目錄號寫法並存」（派工信 §四 1 的現成材料之一）整格捨去**：
  **三種寫法寫出來要 29 字以上，而那一格對消費者沒有故事**——**本層逐字取帶連字號的 `SOPL-21-XJ`（策展層的裁定），另兩種寫法一個字都不寫。**
- ⚠ **廠牌名與目錄號一律不連寫**：24 張逐張看過，**兩者之間最少隔一個逗號加一個引入詞**（最短的是 a12 的 `⋯分到 East Wind，號 EW-7004`）
  ——**`qa-batch` 的 `互指?` **0 行**，`專名?` 0 行。**
- ⚠ **本批的目錄號預算成本實測**：**24 個目錄號合計吃掉 183 字元（平均 7.6 字／個，最長 11 字：`SOPL-21-XJ`／`SOPW 27～28`／`JAW-2001～2`）**
  ——**相當於整批 5470 字預算總和的 3.3%**。⚠ **比派工信第二節說的「一串吃 29 字元」低得多**：**本線的日本目錄號是短號（`SOCO 103` 只有 8 字），29 字那個數字對得上的是 c-18x 之前的西洋線。**

## 5852　⚠ 措辭：否定句與研究警示的處置

- **`chk-hook-crossgroup` 的 `TRACE`（卡池／查無／並非／而非／不得寫／禁補／標錯／有出入⋯）**：**0 報。**
- **同一支的「只報不擋」一般否定句列表（`不是`／`沒有`／`並不`／`未曾`／`從未`）**：**0 筆**——**24 張的 note 一個否定句都沒有。**
  ⚠ **最難寫的三處都改成了正面表述**：
  - b8「1975 年原壓的 credits 裡一位演奏者都沒有列」→ **`逐名的編制要到 1979 年同廠的一次重壓才印出來`**
  - a1／a8／a10／b2 四張無 master 頁「資料庫裡只有這一筆」→ **a3 的 `那支歌舞團在資料庫裡只留下這一張碟` 一張寫，其餘三張整格不寫**（也沒有寫「沒有再發」）
  - b9「十位裡只有一位不是日本人」→ **`十位演奏者裡一位是巴西人`**
- ⚠ **「不得寫 X」一律沒有進 note**：派工信與研究稿裡的禁寫警示（`Love Live Life` 不得寫多次復刻、九張無來源不得寫聆聽入口、b11 的〈Chiasma〉那句對照不成立）
  **全部處理成整格捨去，一句否定句都沒有留給寫作層。**

## 5853　⚠ ⚠ 場館與年份的逐格核（派工信 §四 1 末段：同月同日、相差一年、不同場館）

| 卡 | 場館 | 日期 | 交叉檢查 |
|---|---|---|---|
| a3《Kenya Ya Africa》 | **飯野ホール** | **1973-09-20** | **note 裡 `郵便貯金` 0 命中、`1974` 0 命中** ✔ |
| a9《Mbali Africa》 | **郵便貯金ホール** | **1974-09-20** | **note 裡 `飯野` 0 命中、`1973` 0 命中** ✔ |
| a11《In Person》 | **郵便貯金ホール** | **1973-09-24**（唱片 1974） | 與 a9 同場館、**日期與年份都不同，兩張的 g1 各自寫死** ✔ |
| a2《Sadao Watanabe》 | **イイノホール** | **1972-02-24** | ⚠ **與 a3 的 `飯野ホール` 是同一個廳的兩種寫法**，**兩張照各自 facts 的字串抄，本層沒有統一** ✔ |
| b3《At Pit Inn》 | **新宿ピット・イン** | **1974-12-24**（唱片 1975） | 與 b5 同一間、**相差兩天** ✔ |
| b5《Kimiko Is Here》 | **新宿ピット・イン** | **1974-12-22**（唱片 1975） | **兩張的日期與曲目一律沒有互換** ✔ |
| b11《Up-To-Date》 | **東京厚生年金会館** | **1975-04-28** | 場館字串照 facts 的正式名稱，**通稱與考據整格捨去** ✔ |

⚠ ⚠ **a2 與 a3 的場館字串刻意不一致，這是本批最容易被下游「修正」的一格**：
**`イイノホール`（片假名）與 `飯野ホール`（漢字＋片假名）是同一個廳，兩張的 `facts` 各用一種**
——**照 `hook-base.md`「專名照原文字形抄」，本層兩種都保留，並在此登記給主線：這不是分裂，是兩份研究稿的來源寫法不同。**

## 5854　⚠ 高碰撞盤名與曲題的處置（第 5739／5773 條，兩組各 7 個字串）

**下游引用必須帶掛名與年份的 14 個字串，本層的處置分兩種**：
- **整格不引**：`〈Friends〉`（a6，撞池中三張《Friends》）、`〈Black Daffodils〉`（a12，撞 1998 年那張 Victor 選輯）、
  `〈Hi-nology〉` 以外的所有曲題（b9）、`《Trace》`／`《In Person》`／`《Up to Date》`／`《Origination》`／`《1999》`／`《Rumour》` 六個通用英文盤名
  ——**24 張的 note 裡出現的曲題只有三個：`〈Shosholoza〉`（a3）、`〈Just the Two of Us〉`（b5）、`〈Hi-nology〉`（b9）。**
- **帶年份與時序引**：**b9 的 `〈Hi-nology〉` 逐字寫成 `末軌〈Hi-nology〉是他 1969 年同名專輯的主題曲，這一軌是 1975 年新錄`**
  ——**照研究層第 5806 條的要求，1969 與 1975 兩個年份都在同一格裡，寫作層不可能把它寫成池中那張碟。**
⚠ **`qa-batch` 的 `曲名/專輯?` **0 行**、`互指?` **0 行**——**三個曲題全部命中本卡自己的 `facts`。**

## 5855　⚠ 版本數、串流與封面：**一律不寫**

- **24 張的 note 一個版本數都沒有寫**（初稿有 11 張寫了，壓預算時全部整格捨去）——**「再發幾次」這件事在本批 0 命中，所以派工信第七節「用研究稿的數字不要用卡單的」在定稿上沒有落地的機會。**
  ⚠ **順帶登記給主線**：**研究層把版本數從 58 改成 63（b 組五張 ＋ a 組兩張的 Apple 數位版）那件事，本層一格都沒有用到**——**它對消費者的正文沒有位置。**
- **回撈層的結論（九張無來源全部維持、救回 0 張，主線第 1966-B 條）逐張落地**：**24 張的 note 裡沒有任何一句寫成聆聽入口、「可以去聽」或「在架上」。**
- **封面（CAA 有圖 18/24）與 `previews.json` 本層一個字節都沒有動、也沒有讀進 note。**

## 5856　⚠ `Love Live Life《殺人十章》`：**最冷的那一格怎麼寫**（派工信第四節第 6 點）

- **`master_id` 為 0、community 持有 31／想要 292，是本線最冷的一格** → **note 一個字都沒有寫版本數，也沒有寫「多次復刻」**；
  **g1 改寫成原壓的載體事實（十軌全器樂盤、SQ 四聲道編碼、對開封套），那是同一格位置上可查證而且有故事的東西。**
- ⚠ **前作 `《LOVE WILL MAKE A BETTER YOU》` 的處置**：**g4 逐字寫成 `那年迎入歌手 布施明 之後改稱 LOVE LIVE LIFE + ONE`**
  ——**只寫掛名的變化，不寫那張碟的盤名、軌數與 King 的 ℗ 年**，**寫作層拿不到把兩張碟混為一談的材料。**
  ⚠ **理由**：**盤名寫出來要 29 字（`《LOVE WILL MAKE A BETTER YOU》`），而它是另一張碟**——**在 226 的預算裡，「說清楚它是另一張碟」比「寫出它的名字」便宜得多。**

## 5857　⚠ 三部作那條企劃怎麼寫：**寫企劃名、不暗示三張齊全**（派工信第四節第 2 點）

- **a8《去来 Kyorai》的 g1 逐字是 `系列欄把它排成三部作的第一張`**——**寫了「三部作」這個企劃形狀與它的序位，沒有寫第二、三張是什麼。**
- **a10《怪顚》一個「三部作」都沒有寫**：**g2 改寫成「三件樂器各先獨奏一段才合奏」（與第一張同形的曲序），系列號與〈波〉的編號延續整格捨去。**
- ⚠ ⚠ **第三張《萬華 = Mange》不在店裡這件事，兩張的 note 都沒有留任何鉤子**——**寫作層看不到它的盤名、目錄號與掛名，不可能寫成「三張齊全」或「可成套」。**
- ⚠ **`怪顚` 這個字照卡單那一個字串（U+985A）**：**a10 的 `key` 從研究稿逐字複製，note 裡沒有再出現這個字**（盤名整串沒有進 note）——**兩種寫法的衝突在本層 0 風險。**

## 5858　`desc-tools/jp-proper-names.json`：**本批 append 0 個，既有的一個都沒有動**

**`qa-batch` 的 `SIMP` 與 `GARBAGE` 兩道對本批 24 張 0 報**，所以沒有需要加白名單的專名。
⚠ **本批用到、而且靠既有白名單過關的有兩個**：**`東京厚生年金会館`（b11，`会` 在 SIMP 字表裡）與 `民族音楽の会`（a10，同）**
——**兩個字串都已經在檔裡（第 2 與第 68 項），一個字都不用加。**
⚠ **另記一件**：**a8 的 `去来 Kyorai`（`来` 在 SIMP 字表裡）也在既有白名單裡（第 70／71 項），但本層的 note 並沒有寫出這個盤名**——**只有 `key` 帶著它，而 `charScan` 吃的是整個檔案字串，所以白名單仍然是必要的。**

## 5859　交件前自跑的結果（逐字）

```
$ node qa-batch.mjs hooks c184
（略過 qa-check-hooks.mjs：本 repo 無此檔。字數／禁語／開頭雷同／分數星等
  請改跑 node chk-hook-crossgroup.mjs c184，本階段只做事實對照與字元掃描。）
全部通過 ✓

$ node chk-hook-crossgroup.mjs c184
c184｜2 組｜24 張

hook 加權 15–27｜note 224–239

✓ 全部通過
```

- **`qa-batch` 逐項 0**：`曲名/專輯?` 0、`專名?` 0、`年份?` 0、`互指?` 0、`note>350` 0、`hook key 不在卡單` 0、`漏卡` 0、`SIMP` 0、`GARBAGE` 0。
- **`chk-hook-crossgroup` 逐項 0**：`開頭前四字相同` 0（24 張 24 個相異開頭）、`同構骨架出現在多張` 0、`校對痕跡` 0、
  `一般否定句`（只報不擋）0、`分數或星等` 0、`hook 禁語` 0、`hook 句末缺全形標點` 0、`hook 用否定句` 0、`hook 加權超過 50` 0、`note 超過 350` 0。
- ⚠ **`同構骨架` 那一道 0 報值得記**：**`SKELETON` 字表裡的 `第一張領銜`／`首度以自己的名字`／`無鋼琴`／`無伴奏`／`一人包辦`／`辭世`／`遺作` 七個字串，本層動筆時就逐一查過**
  ——**`辭世` 只給 a11（Oliver Nelson）、其餘六個 24 張 0 命中**（`無伴奏` 那一格在 b8 壓預算時整格捨去；a12 的「掛領銜最早是這一張」與 b7 的出道作都刻意避開了 `第一張領銜` 那個字串）。
- **預算逐筆自算的結果寫在 5838（兩支腳本都驗不到這一欄）**；**n-gram 兩輪寫在 5841、hook 之間那一輪寫在 5842。**

## 5860　續跑保護（本批沒有被重啟打斷，但保護照裝）

照派工信第六節：**a 組在第 5、10、12 筆各把整份寫回 `c184-hooks-a.json`，b 組在第 5、10、12 筆各寫回 `c184-hooks-b.json`，共六次整份寫回。**
**判斷檔案在不在一律用 `ls` 與直接讀檔，全程沒有跑過 `git status`。**
臨時檔全部放 scratchpad `c184h/`，**六支都帶批次前綴**：`c184h-build.mjs`（共用的 note 組裝與預算函式）、`c184h-budget.mjs`（倒回去量 c-183 用）、
`c184h-a.mjs`／`c184h-b.mjs`（兩組的資料與產出）、`c184h-ngram.mjs`（hook+note 兩輪）、`c184h-hookngram.mjs`（hook 之間那一輪）、`c184h-rulings.md`（本節）。
⚠ **`c184h-a.mjs`／`c184h-b.mjs` 是「資料即腳本」的寫法**（cells 陣列 ＋ `build()` 一行產出）——**重啟後只要重跑那兩支就能逐字重現定稿，不必從頭重寫。建議下一批照抄這個形狀。**

## 5861　邊界自述（本層動了什麼、沒動什麼）

- **動了兩個新檔**：`desc-tools/batches/hooks/c184-hooks-a.json`（12 筆）、`c184-hooks-b.json`（12 筆）。
- **動了一個既有檔**：`batch-progress/c184/rulings.md`（**append 本節 5836–5862，`# b 組` 以下與 5716–5835 任何一行都沒有改**）。
- **`desc-tools/jp-proper-names.json` 一個字都沒有動**（append 0，見 5858）。
- **沒有碰**：`seed_cards.json`、`apex_pool.json`、`PROJECT_MEMORY.md`、`previews.json`、`caa.json`、卡單（`c184-cards.json`）、
  兩份研究稿、`prop-a.json`／`prop-b.json`、其他批次的任何檔案、KV、Firestore。
- **沒有跑過任何 git 寫入指令**：**沒有 `git commit`／`git push`／`git add`，沒有動索引**；只跑過 `git show HEAD:batch-progress/c184/rulings.md`（唯讀，寫入前的確認）。

## 5862　編號區間結算與給主線的四件

**本節用到 5836–5862（共 27 條），派工信配的區間是 5836–5875，剩 5863–5875 未用。**

給主線的四件（**全部已就地決定並且可逆，本層只請覆核**）：

1. ⚠ ⚠ **研究層九條橫向串連點裡有一條沒有落地**：**第 5793 條第 8 點的 `伊藤八十八`（#18 → #16）**
   ——**兩端的四格都被別的軸佔滿，整格捨去**（見 5847 末段）。**若 c-185 還有 East Wind 盤，這一條可以直接接過去用。**
2. ⚠ ⚠ **`イイノホール` 與 `飯野ホール` 是同一個廳的兩種寫法，本層兩張各照自己的 `facts` 保留**（見 5853 末段）
   ——**請主線確認這不需要進 `audits/` 的異體字表**（本層判它不是分裂，是兩份研究稿的來源寫法不同）。
3. ⚠ **`本田竹曠`／`本田竹広` 在本批的 note 裡 0 命中**（兩張的編制那一格都整格捨去，見 5850）
   ——**兩形的衝突在鉤子層自然消解，但寫作層會直接讀 `facts`，請在寫作層的派工信裡逐字提醒「照各自那張的 facts 抄，不要互相校正」。**
4. ⚠ **建議把兩件寫進 `hook-base.md`**：
   (a) **「日期＋動詞」要配的不只是動詞，還有「日」後面那一個字**——**漢字過濾器剝掉阿拉伯數字之後，日期樣板自己就是本批最大的一族同構（17 條裡 11 條）**（見 5840 末段）；
   (b) **hook 依賴的那一項要放進 g1 或 g2**——**壓預算時被砍的永遠是第三、四格，而本批四處踩空全部是 hook 靠在第三或第四格上**（見 5848 末段）。

# 寫作層 writer-1（a 組 12 張）｜2026-09-25

> ⚠ **本節 append 在檔末，編號區間 5996–6010（另一位寫作代理用 6011–6025）；鉤子層 5836–5862 以下、兩組研究層、兩組策展層的任何一行都沒有動。**
> **寫入前跑過 `git show HEAD:batch-progress/c184/rulings.md`（3575 行、`^## (599[6-9]|60[0-2][0-9])` 命中 0）與 `ls`（檔在、439310 位元組、3575 行），兩者都確認 5996 以後是空的。**

## 5996　開工檢查：張數、`key`、輸出檔狀態

- **`c184-writer-1.json` 逐筆數過 12 筆**，與派工信第一節相符；`status` 欄 **full 12、thin 0**——**派工信「本批沒有 thin 卡」是對的**，`writer-base.md` 的 120–180 字帶本組 0 張適用。
- **輸出檔照派工信第六節用 `ls` 判斷、沒有用 `git status`**：開工時 `desc-tools/batches/output/c184-out-1.json` **不存在**，所以是從零寫、沒有續跑。
- **`key` 逐字同序同數量**：12 筆由 `c184w1/c184w1-emit.mjs` 以輸入檔的順序逐筆取值寫出，**前綴 11 筆 `desc4:` ＋ 1 筆 `desc2:`（a7《Inspiration & Power 14 Free Jazz Festival 1》）**，一個字元都沒有改。
- **續跑保護照第六節裝好**：**3、6、9、12 張各整份寫回一次**（四次），每次都是整份重寫該檔、不是追加片段。

## 5997　逐張字數全表（`Array.from(desc).length`，**兩端都驗**）

| # | 掛名 —《盤名》 | hook 原始 | **desc** |
|---|---|---:|---:|
| a1 | Love Live Life —《殺人十章》 | 20 | **224** |
| a2 | 渡辺貞夫 —《Sadao Watanabe》 | 19 | **224** |
| a3 | 渡辺貞夫 Meets Inter-African Theatre Group —《Kenya Ya Africa》 | 25 | **231** |
| a4 | 柳田ヒロ —《Hirocosmos》 | 23 | **219** |
| a5 | 筒井康隆, 市原宏祐, 佐藤允彦 —《デマ》 | 29 | **228** |
| a6 | 鈴木良雄 —《フレンズ》 | 27 | **232** |
| a7 | Various Artists —《Inspiration & Power 14 Free Jazz Festival 1》 | 26 | **237** |
| a8 | 山本邦山 & Chris Hinze —《去来 Kyorai》 | 18 | **231** |
| a9 | 渡辺貞夫 —《Mbali Africa》 | 25 | **225** |
| a10 | Chris Hinze, 沢井忠夫, 山本邦山 —《怪顚》 | 15 | **223** |
| a11 | 笠井紀美子 & Oliver Nelson —《In Person》 | 25 | **239** |
| a12 | 益田幹夫 —《Trace》 | 27 | **226** |

**12 張全部落在 180–240：min 219（a4）、max 239（a11）、中位 227.5。分佈：219–225 共 5 張、226–232 共 5 張、237–239 共 2 張。**
- **下限那一端 0 張出界**（派工信第三節警告「180 的下限沒有腳本會抓」）——**本組最接近下限的是 a4 的 219，離下限還有 39 字。**
- **上限那一端初稿出界 1 張**：**a11 初稿 244**（hook 25 ＋ 四格全滿，`Oliver Nelson` 那條軸的 1952 年敘述吃掉一整格）。
  **處置是三處逐格縮寫（把「編曲與指揮的那位是」縮成「編曲與指揮掛」等），沒有動 note 的任何一格**——**四格全保，244 → 239。**
- **倒量參考先自己跑過一次確認同尺**：`c183-out-1.json` 5 筆量到 **218／230／227／237／236**、`c183-out-2.json` 8 筆量到 **238／226／232／233／235／239／227／234**
  ——**13 個數字與派工信第三節逐格相同，一個都沒有差**（派工信逐字警告「檔名是上一批 c-183 的檔」，實測兩檔存在、筆數確實是 5 與 8）。
- ⚠ **本組的偏差方向：初稿 12 張只有 1 張越上限、0 張掉下限，中位落在 227**——**手算與實測幾乎一致，沒有出現 c-18x 那種「全批超標」。** 成因可歸因：**鉤子層已經把 24 張的 note 全部壓到 ≤230 並「一筆都沒有留給寫作層砍」（第 5847 條），四格的內容量進場時就是可控的。** ⚠ **照 `writer-base.md` 那條鐵則，這個係數不繼承給 c-185。**

## 5998　⚠ ⚠ 第二句：**12 張的 hook 全是代稱或不具名位置開頭，第二句一律去具名，0 張複述**

派工信第二節指出的對撞（首句照抄 hook ／第二句不得複述）在本組是 **12/12 全部觸發**。逐張的具名對象：

| # | hook 的代稱／未指明的位置 | 第二句具名成什麼 |
|---|---|---|
| a1 | 「一本英國的殺人百科」 | **寫那本百科的人**（英國作家 `Colin Wilson`） |
| a2 | 「他」 | **`渡辺貞夫` 本人**（生日與出生地領句） |
| a3 | 「四個日本爵士樂手」／「十三個非洲人」 | **日本一方的領頭人 ＋ 非洲一方的領唱** |
| a4 | 「四張個人專輯」的主人 | **`柳田ヒロ` ＋ 前三張的三家廠牌** |
| a5 | 「一位 SF 小說家」 | **`筒井康隆`** |
| a6 | 「他」／「薩克斯老師」 | **`鈴木良雄` ＋ 那位老師與教室** |
| a7 | 「廠牌」／「一家音響工廠」 | **`Trio Records` ＋ `Trio Electronics` 與設立年月** |
| a8 | 「兩件笛子」 | **兩位演奏者與各自的樂器** |
| a9 | 「自己重造一套鼓回來的人」 | **`富樫雅彦`** |
| a10 | 「彈箏的那位」 | **`沢井忠夫`** |
| a11 | 「她」／「美國人」 | **`笠井紀美子` ＋ `Oliver Nelson`** |
| a12 | —（見下） | **補上 hook 沒有指明的位置：領銜的鋼琴手** |

⚠ ⚠ **a12 是本組唯一走「一般化」那條路的一張，而且是被 note 逼出來的**：
**hook 的兩個代稱（`小號手`／`那位小號手的弟弟`）指的是 `日野皓正` 與 `日野元彦`，而第 5846 條把這兩個名字整條讓給 a9（a12 的兄弟編制指定寫成「打鼓的是他弟弟」、不點名），note 的四格裡也確實沒有這兩個名字。**
**所以「替 hook 的代稱具名」在這一張執行不了——本層照派工信第二節的一般化條款，改成「補上 hook 沒有指明的那個位置」：hook 通篇沒說這是誰的碟，第二句就去具名領銜的那位鋼琴手。**
⚠ **登記給 c-185 之後**：**「hook 用代稱 ＋ 該代稱的名字被骨架歸屬讓給別張」是這條規則的第三種形態**（前兩種是「有代稱」與「無代稱」）——**判準是「note 准不准我寫那個名字」，note 不准就走一般化，不要為了具名去 facts 撈名字。**
⚠ **12 張逐張回頭讀過頭兩句**（派工信第二節末：「這條沒有腳本會抓」）——**0 張的第二句在重講 hook 說過的事。** 三處刻意避開的複述：
**a5 的「四十九段」（第二句只寫四軌的結構，數字留在 hook）、a8 的「B 面整面」（第二句寫編制，長度留到第四句才給秒數）、a9 的「自己重造一套鼓」（第二句只寫 1970 年 1 月與十八個月，造鼓那件事不再說一次）。**

## 5999　⚠ ⚠ 兩欄配表：**直接繼承鉤子層第 5840 條那張表，並另配「日期前面那一個漢字」**

`writer-base.md` 第 3 點（直接繼承鉤子層那張表）照辦，12 張的「日期＋動詞／語序」與「目錄號引入法」逐張沿用第 5840 條 a 組那十二列，**一個都沒有換**。
本層另外配死第三欄——**派工信第三節與 `writer-base.md` 第 8 點的「跨句黏合」**：

| # | 「日」後面那一個字 | **日期前面那一個漢字**（黏合位） | 目錄號引入法 |
|---|---|---|---|
| a1 | （無日，`年`＋廠牌名詞句） | 題 | 盤上的號是 |
| a2 | 日**的** | 節 | 目錄號 |
| a3 | 日**於** | 會 | 唱片號 |
| a4 | 日**進** | 走 | 碟號 |
| a5 | （無日，`年經`） | 尾 | 號碼欄寫 |
| a6 | （無日，`月`＋`兩天`） | 行 | 商品號 |
| a7 | 日**起在** | 它 | 盤面號 |
| a8 | （無日，`年從`） | 人 | 編號 |
| a9 | 日**東** | 上 | 號欄 |
| a10 | 日**一天** | 花 | 那一號是 |
| a11 | 日**郵** | 樂 | 號 |
| a12 | 日**在** | 張 | 號 |

- **「日」後面那一個字 8 種、無日的 4 張各走不同的領頭名詞與動詞，12 張 12 種。**
- ⚠ ⚠ **第三欄是本層新加的一欄，理由是 `han()` 把標點整個剝掉**：**句末的句號在掃描器眼裡不存在，所以「上一句最後一個漢字」與「下一句開頭的日期」在它看來是連著的。**
  **12 個黏合位（題／節／會／走／尾／行／它／人／上／花／樂／張）互異，且刻意避開 c-183 實測出事的 `與` 與 `場`（第 1964-B 條）。**
  ⚠ **實測有效**：**本組初稿第一輪的跨張漢字 4-gram 只長出 2 條，全批沒有一條是日期樣板的殘片**——**與鉤子層第一輪 17 條裡 11 條出在日期樣板形成對照**（鉤子層當時配的是前兩欄，沒有配黏合位）。
  ⚠ **登記給 c-185 之後**：**「日期＋動詞」要配三欄，不是兩欄**——第三欄是「日期前面那一個漢字」。**這一欄的成本極低（改的是上一句的收尾字），效果卻蓋掉整族日期樣板。**

## 6000　⚠ ⚠ `渡辺貞夫` 三張的「他」引入法：**三張三種，並登記給 b 組那兩張**

派工信第四節指定「五張要五種，而你只看得到自己那三張」。本層這三張用掉的三種：

| # | 引入法 | 實作 |
|---|---|---|
| **a2** | **名字直接領句 ＋ 生年與出生地** | hook 的「他」之後，第二句以他的名字當主詞開頭，接生日與栃木縣宇都宮市 |
| **a3** | **樂器（中音薩克斯手）** | 「日本那一方領頭的是中音薩克斯手＋名字」，他在這張是兩個對等掛名方之一 |
| **a9** | **樂團的主人／早年僱主身分** | 他不是第二句的主角（那一格是 `富樫雅彦`），改由「十幾歲就在他的樂團打鼓」這個關係把名字帶進來 |

⚠ **b 組那兩張（`At Pit Inn`／`Swiss Air`）還剩下的兩種**：**年齡、綽號、廠牌關係、妹妹與弟弟、攝影集**——**本層一種都沒有用掉。**
⚠ **另記一件**：**`渡辺貞夫` 這四個字在本組 4 張上出現**（a2／a3／a9 三張是他的掛名卡，**a6《フレンズ》是第四張**——他在那裡是 `鈴木良雄` 在ヤマハ音楽教室 的老師）。
**a6 不是他的掛名卡，所以不吃「五張五種」那個配額，但本層仍替它配了第四種引入法（教室＋所屬關係），理由見 6001 的 `是渡辺貞` 那一條。**

## 6001　⚠ ⚠ 跨張 n-gram 自查：**漢字與片假名兩輪都跑，三輪收斂；自組與跨組合掃的 3 張以上都只剩專名**

腳本 `c184w1/c184w1-ngram.mjs`（沿用派工信指定的 `c174w1/c174w1-ngram.mjs` 骨架，**照第三節末段把片假名 U+30A0–30FF 另跑一輪**）。

**第一輪（初稿，只掃自組）漢字 2 條 3 張以上：**

| 4-gram | 張數 | 性質 | 處置 |
|---|---:|---|---|
| `渡辺貞夫` | 4（a2／a3／a6／a9） | **專名** | **保留**（`hook-base.md`／`writer-base.md` 第 7 點：專名不算同構） |
| `是渡辺貞` | **3**（a2／a3／a6） | **句型同構黏在專名上**（「⋯是 渡辺貞夫」） | **a2 改成名字直接領句（去掉「他是」）、a6 改成「那位老師則是⋯教室的⋯」（把名字推到「的」後面）** |

⚠ ⚠ **`是渡辺貞` 這一條正是派工信第四節警告的那件事的掃描器形態**：**三張各自用最自然的方式把「他」具名，結果三張都寫成「⋯是 渡辺貞夫」。** **「引入法五張要五種」不只是行文要求，它會直接長成一條 3 張同構。**

**第二輪**：`是渡辺貞` 歸零；本層照派工信第三節「**先交件的那一組要把 2 張殘片當 3 張處理**」（第 1940-B 條），**把 9 條 2 張殘片裡形狀通用的 8 條一併拆掉**——
`年月日生`／`月日生於`（a2／a10，日期＋生於樣板，改 a2 為「生於＋日期，⋯人」語序）、
`軌的題全`／`的題全是`（a2／a4，改 a4 為「都是英文題」）、
`欄只掛他`／`只掛他一`／`掛他一個`／`他一個人`（a2／a4，改 a4 為「作曲的署名從頭到尾只有他」）、
`吉他那一`／`他那一格`／`那一格坐`／`一格坐的`／`格坐的是`（a4／a9 五條，**改 a4 為「電吉他交給⋯」；a9 的「那一格」保留，因為它的 hook 自己就寫著「打擊那一格」**）、
`獨奏一段`／`奏一段才`（a8／a10，改 a8 為「各先有一段獨奏，之後才交錯」）、
`的是鋼琴`（a6／a12，改 a12 為「領銜的鋼琴手＋名字」去掉繫詞）。
**第三輪**：`的是渡辺`（a3／a9，**兩個不同的人共用「渡辺」這個姓**——a3 是 `渡辺貞夫`、a9 是 `渡辺香津美`）→ **改 a3 為「領頭的是中音薩克斯手⋯」**；
`件樂器各`／`樂器各先`（a8／a10，第二輪的改法自己長出來的新殘片，正是 `writer-base.md` 第 2 點說的「換動詞會原地復活」）→ **改 a10 為「先分別獨奏一段，之後才合奏」**；
`十三軌裡`（a3／a11，兩張碟真的都是十三軌）→ **改 a3 為「其中的〈Shosholoza〉」**。

**定稿的複掃結果（本節寫入前最後一次跑，逐字）：**

```
（自組 12 張）
=== 漢字：4-gram 出現在 3 張以上： 1 條 ===
渡辺貞夫  ×4  [Sadao Watanabe / Kenya Ya Africa / フレンズ / Mbali Africa]
--- 漢字：出現在 2 張的 4-gram： 6 條 ---
薩克斯手 鈴木良雄 佐藤允彦 山本邦山 郵便貯金 便貯金的
=== 片假名：4-gram 出現在 3 張以上： 0 條 ===
--- 片假名：出現在 2 張的 4-gram： 0 條 ---

（跨組合掃，out-1 ＋ out-2 共 24 張）
=== 漢字：4-gram 出現在 3 張以上： 1 條 ===
渡辺貞夫  ×6  [Sadao Watanabe / Kenya Ya Africa / フレンズ / Mbali Africa / At Pit Inn / Swiss Air]
--- 漢字：出現在 2 張的 4-gram： 44 條 ---
=== 片假名：4-gram 出現在 3 張以上： 0 條 ===
--- 片假名：出現在 2 張的 4-gram： 8 條 ---
```

- ⚠ ⚠ **自組定稿 3 張以上只剩 1 條，且是純專名；剩下的 6 條 2 張殘片全部是專名或樂器名**（`薩克斯手` 是樂器名加一個「手」）——**沒有一條是句型同構。**
- ⚠ ⚠ **跨組合掃（`c184-out-2.json` 在本層定稿前已經出現，本層只讀不寫）3 張以上同樣只剩 `渡辺貞夫` ×6**（本組 4 張 ＋ b 組 2 張）——**跨組 0 條句型同構。**
  **片假名那一輪跨組 8 條 2 張殘片全部落在 b 組內部的兩個專名上（`クラウンレコード`／`ピット・イン`），與本組無關。**
- ⚠ **跨組 44 條 2 張殘片逐條看過**：本組參與的那些是日期樣板的殘留接縫（`年月日的`／`年月日東`／`月日東京`／`年月與日`／`實況同年`／`錄完同年`／`八軌同年`／`軌同年掛`）、專名與樂器名（`中音薩克`／`音薩克斯`／`的薩克斯`／`郵便貯金`／`便貯金的`／`佐藤允彦`／`山本邦山`／`鈴木良雄`）、與格式名詞（`他一個人`／`自己寫的`／`四軌都在`／`分鐘以上`／`一首曲子`／`那家廠牌`／`的音樂節`／`打擊那一`／`的一號錄`／`一號錄音`／`號錄音室`／`合成器與`／`作曲與編`／`曲與編曲`／`軌的作曲`／`位演奏者`）——**沒有一條到 3 張。**
- ⚠ **派工信第三節末段那條（hook 原文進合掃、寫作層無權改 hook）本組 0 命中**：**`渡辺貞夫` 這一條 4 張裡沒有一張是 hook 原文貼出來的**（四張的 hook 都用代稱或別人的名字），**所以本層沒有需要「改自己正文去避開別人 hook」的情形。** ⚠ **兩組都定稿後仍請主線照 `writer-base.md` 第 6 點統一再跑一次當收件檢查。**

## 6002　⚠ ⚠ 場館與年份的逐張互核（派工信第五節第 1 點：**同月同日、相差一年、不同場館**）

| # | 場館字串 | 日期 | 交叉檢查（逐字掃 desc） |
|---|---|---|---|
| a3 | **東京飯野ホール** | **1973 年 9 月 20 日** | **`郵便貯金` 0 命中、`1974` 0 命中** ✔ |
| a9 | **東京郵便貯金ホール** | **1974 年 9 月 20 日** | **`飯野` 0 命中、`1973` 0 命中** ✔ |
| a11 | **郵便貯金ホール** | **1973 年 9 月 24 日**（唱片 1974） | 與 a9 同場館、**日期與年份都不同**；`飯野` 0 命中 ✔ |
| a2 | **東京イイノホール** | **1972 年 2 月 24 日** | 與 a3 是同一個廳的兩種寫法，**各照自己那張的 `facts` 保留** ✔ |

- ⚠ ⚠ **a3 與 a9 是「同月同日、相差一年、不同場館」，本層照派工信兩張寫完互相對了一次**：**處置是兩張的場館與年份各自寫死在同一個子句裡**（a3 的「那場音樂會⋯於東京飯野ホール 舉行」／a9 的「⋯東京郵便貯金ホール 的音樂會實況」），**兩張的 desc 各自只出現一個場館、一個錄音年。**
- ⚠ ⚠ **`イイノホール`（a2）與 `飯野ホール`（a3）刻意不統一**，照派工信第五節第 4 點與第 5853 條：**鉤子層已判它不是異體字分裂，是兩份研究稿的來源寫法不同。** **本層兩種都保留，沒有互相校正，也沒有在任何一張寫出另一種寫法。**
- ⚠ **a11 與 a9 同場館、a11 的錄音年與發行年不同年**：**a11 的 desc 把「演出實況＋隔年印成」寫在同一句，並在結尾那一格再把「演出是 1973 年、唱片 1974 年、辭世 1975 年 10 月 28 日」三個年份依序排一次**——**照第 5844 條對 `Oliver Nelson` 那條軸的時序要求。**

## 6003　⚠ ⚠ 人名照各自那張的 `facts` 抄，**一處都沒有互相校正**（派工信第五節第 4 點）

- **`本田竹広`／`本田竹曠`**：**本組兩張都沒有寫出這個名字**——a3 的電鋼琴那一格與 a6 的四重奏逐名都在鉤子層整格捨去（第 5850 條），**note 裡 `本田竹` 0 命中，本層也沒有從 `facts` 撈回來**。**所以第 1968-B 條那兩形的衝突在寫作層同樣 0 風險。**
- **`川原正美`／`川原直美`／`川原真澄`**（研究層在 a1 與 a4 各改判一處，同一個人三種寫法）：**兩張的 note 都沒有這一格，本層 0 命中。**
- **`鈴木智雄`／`守崎幸夫`**（研究層改判、跨本組五張與三張）：**幕後那幾格在鉤子層全部整格捨去，本層 0 命中。**
- **`沢井忠夫` 的生年**：**照 `facts` 寫 1937 年 12 月 16 日**（第 5802 條判給 ja 維基），**而「與 山本邦山 同年出生、只差兩個多月」那一句只寫在 a10**——**a8 一個字都沒有寫兩人的交情**（第 5844 條）。⚠ **若哪天 Discogs 的 1938 是對的，要改的是 a10 那兩句。**
- **`怪顚`（U+985A）**：**a10 的 `key` 從輸入檔逐字複製，盤名整串沒有進 desc**——**`怪顛`（U+985B）在本組 0 命中，兩種寫法 0 衝突。**
- **本卡自己的藝人名**：12 張都照卡單的藝人欄字形（`柳田ヒロ`／`筒井康隆, 市原宏祐, 佐藤允彦`／`鈴木良雄`／`益田幹夫`⋯），**東亞音樂人一律漢字、沒有一處羅馬化**；`Chris Hinze`／`Oliver Nelson`／`Colin Wilson`／`George Menoe`／`Charles Mingus` 五個非東亞人名照拉丁原文。

## 6004　三部作：**寫企劃名與序位，0 張暗示三張齊全**（派工信第五節第 3 點）

- **a8 寫「系列欄把它排成三部作的第一張」**——**企劃形狀與序位都寫了，第二、三張是什麼一個字沒有。**
- **a10 一個「三部作」都沒有寫**，照第 5857 條：**只寫「三件樂器先分別獨奏一段，之後才合奏」這個與第一張同形的曲序。**
- ⚠ **兩張各留一首編號的〈波〉那件事，本層兩張都沒有寫**——**note 的四格裡沒有這一格**（鉤子層在 a8 與 a10 都整格捨去，第 5847 條）。**`萬華`／`Mange` 在本組 0 命中。**

## 6005　`Love Live Life —《殺人十章》`：**最冷的那一格，與「前作是另一張碟」怎麼說清楚**（派工信第五節第 5 點）

- **「多次復刻」0 命中、版本數 0 命中、「資料庫裡只有這一筆」0 命中**——**a1 的第三句寫的是原壓的載體事實（十軌全器樂盤、SQ 四聲道編碼、對開封套與目錄號），照第 5856 條。**
- **前作 `《LOVE WILL MAKE A BETTER YOU》` 的處置**：**只寫掛名的變化（1971 年迎入歌手 布施明 之後改稱 `LOVE LIVE LIFE + ONE`），盤名、軌數與 King 的 ℗ 年一個字都沒有寫。**
  ⚠ **本層的判斷與第 5856 條一致：note 根本沒有給我那張碟的盤名，所以「把兩張碟混為一談」在本張不可能發生**——**也因此不需要（也不可以）寫任何「那是前作」的否定句或澄清句。**

## 6006　`Various Artists —《Inspiration & Power 14 Free Jazz Festival 1》`：**寫成音樂節實況，0 處寫成合輯或精選**

- **a7 的 desc 逐字寫成「音樂節實況」**，並把「八段錄音來自八組不同編制、順序由大編制往小編制排」寫成這場音樂節的排序——**`合輯`／`精選`／`拼盤` 三個字串 0 命中**（策展層第 397 條不成立、MB 類型逐字 Album 加 Live）。
- **廠牌那條軸（音響工廠開的廠牌、製造欄印的就是它）是本張的主故事**，照第 5846 條歸屬 a7；**`クラウンレコード` 的社名與自家錄音室那條線在本組 0 命中。**
- ⚠ **`宮間利之とニューハード` 與 `佐藤允彦` 1971 年同在 `Charles Mingus` 那次錄音**這條交叉點寫在 a7；**a5 一個 `Mingus` 都沒有**（研究層第 5794 條逐字要求、第 5846 條同向）✔

## 6007　`Gerald Oshita` 整條讓給 b 組：**本組 0 命中**

- **第 5843 條把他整條讓給 b3《At Pit Inn》**（a9 的混音與監修那一格在鉤子層整格捨去）。
- **本層逐字掃過 12 張的 desc：`Oshita`／`混音`／`監修` 三個字串 0 命中。** ⚠ **a9 的第二格寫的是九人全明星編制與作曲欄，與混音那一格無關**——**讓出得很乾淨，沒有留半句殘影。**

## 6008　無串流、無封面、版本數與否定句：**四項一律 0 命中**

- **無串流 5 張（`殺人十章`／`デマ`／`フレンズ`／`去来 Kyorai`／`怪顚`）與無封面 2 張（`Inspiration & Power 14 Free Jazz Festival 1`／`Trace`）**：**照派工信第五節第 8 點與主線第 1966-B 條（回撈層九張無來源全部維持、救回 0 張），本層沒有新增任何聆聽入口或封面的字串**——**`可以去聽`／`在架上`／`串流`／`封面` 四類字串在 12 張裡 0 命中。**
- **版本數與「再發幾次」0 命中**（鉤子層 24 張的 note 一個版本數都沒有，第 5855 條）。
- ⚠ ⚠ **否定句 0 句**：派工信第二節指出「本批鉤子層 24 張的 note 一個否定句都沒有（`chk-hook-crossgroup` 第 3-B 節 0 報）——你也不要長出來」。
  **本層逐字掃過 `不是`／`並非`／`並不`／`沒有`／`未曾`／`從未`／`卻不` 七個字串，12 張 0 命中。**
  ⚠ **最容易長出否定句的三處，本層的正面寫法**：
  **a1 的「資料庫裡只有這一筆」→ 改寫成原壓的載體事實**（不寫「沒有再發」）；
  **a4 的「前三張有人聲、這張沒有」→ 只寫「盤上七軌都是英文題」與「作曲的署名從頭到尾只有他」**（hook 自己已經用正面句說了「整張都是器樂」）；
  **a8／a10 的「第三張不在店裡」→ 兩張都不提第三張。**
- **`writer-base.md` 的禁語逐字掃過**（傑作／必聽／里程碑／獨樹一格／融合多種元素／具有代表性／層次豐富／全片／全曲／你／我）：**12 張 0 命中**；**中文字旁的半形逗號 0 處**；**年月日與名次全部阿拉伯數字、軌數與概略數量維持中文數字。**

## 6009　`sound` 是唯一的伸縮格：**12 張 0 張動用，也 0 張把鉤子層刪掉的格子撿回來**

- ⚠ **本組 12 張的四格都填得滿（hook 15–29 ＋ 四格 201–215，第 5838 條），所以 `sound` 那一格 12 張都沒有用到**——**desc 的內容全部落在 note 的四格上。**
- ⚠ ⚠ **「不得把鉤子層刪掉的格子撿回來寫」逐張核過**：**第 5847 條列的 a 組十二筆捨去，本層一筆都沒有撿回來。** 最容易手滑的五處：
  **a2 的六人編制逐名與八版版本表**（本層只寫作曲欄那一句）、
  **a3 的十三軌逐字曲題與定價**（本層只寫 note 指定的那一首傳統歌）、
  **a5 的七位樂手逐名與兩支樂團的團名**（本層照 note 寫成「盤面明印兩支樂團，團長就是掛名的後兩位」，一個團名都沒有）、
  **a7 的八組編制逐名**（本層只寫「八段錄音來自八組不同編制」）、
  **a11 的伴奏團體逐名與十一軌的作曲者逐名**（本層只寫「伴奏是大樂團加一組弦樂」與「十三軌裡十一軌是美國標準曲」）。
- ⚠ **CJK 批次的專名上限（`writer-base.md` 末節：動筆前壓到 3 個以內）**：**12 張的拉丁與日文專名合計每張 2–4 個**，最多的是 a4（`柳田ヒロ`／`高中正義` ＋ 三家前廠牌 ＋ 四件鍵盤器材名）——**那一張正是本組最短的 219，因為器材名雖多但每個只 4–8 字元。**

## 6010　交件前自跑的結果、`jp-proper-names.json`、邊界自述與給主線的四件

**三支腳本逐字（工作目錄 `desc-tools/`）：**

```
$ node qa-batch.mjs out c184
out-1｜12 張｜字數 219–239｜>260: 0
out-2｜12 張｜字數 205–233｜>260: 0
out 合計 24 張，與卡單相符 ✓
（qa-check-research 與 fix-spacing 需另跑，共 2 檔各一次）
全部通過 ✓

$ node qa-check-research.mjs batches/input/c184-writer-1.json batches/output/c184-out-1.json
QA 完成｜ 12 張｜標記 0

$ node fix-spacing.mjs batches/output/c184-out-1.json --field desc
待補 0 張（欄位 desc）
```

- ⚠ **`qa-batch` 沒有報缺檔**：**另一組的 `c184-out-2.json` 在本層交件前已經出現（12 張、205–233），所以派工信第七節預告的「會報缺檔」沒有發生。** **本層只讀它一次（跨組合掃，見 6001），一個位元組都沒有寫。**
- ⚠ **`fix-spacing` 0 建議**，所以派工信第七節那個判斷題（廠牌名與目錄號連寫要拆開、而且要回頭改草稿整份重建不是 `--write` 打補丁）**本組沒有觸發**。成因可歸因：**照第 5851 條，12 張的廠牌名與目錄號之間最少隔一個逗號加一個引入詞**（最短的是 a12 的「分到 East Wind，號 EW-7004」），**而且每張只出現一個目錄號、第二個目錄號 0 張。**
- **`desc-tools/jp-proper-names.json`：本層 append 0 個，既有的一個都沒有動。** ⚠ **`qa-batch` 的 SIMP 與 GARBAGE 兩道對本組 0 報**；**本組用到、靠既有白名單過關的有兩個（a6／a10 的 `音楽`／`民族音楽の会` 與 a8 `key` 帶的 `去来`）**，兩個字串都已經在檔裡（第 2／68／70／71 項）。

**邊界自述（派工信第九節）：**
- **動過的檔只有兩個**：`desc-tools/batches/output/c184-out-1.json`（**新增**，四次整份寫回）與 `batch-progress/c184/rulings.md`（**本節 append**）。
- **`desc-tools/jp-proper-names.json` 有權限但 0 改動。**
- **`c184-out-2.json` 只讀不寫**；`seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／`previews.json`／`caa.json`／卡單／研究稿／鉤子稿／其他批次／KV／Firestore **一個都沒有碰**。
- **0 次 `git commit`／`git push`／`git add`，git 索引沒有動。** 臨時檔全部在 scratchpad `c184w1/`（三支檔：`c184w1-drafts.mjs`／`c184w1-emit.mjs`／`c184w1-ngram.mjs`，**照 `writer-base.md` 的命名紀律加了批次與組別前綴**）。

**給主線的四件：**
1. ⚠ ⚠ **新形態一件（建議寫進 `writer-base.md`）**：**「hook 用代稱、而那個代稱的名字被骨架歸屬讓給別張」是「第二句去具名」那條規則的第三種形態**（見 5998 的 a12）——**判準是「note 准不准我寫那個名字」，note 不准就走一般化的「補上 hook 沒有指明的那個位置」，不要為了具名去 `facts` 撈名字。**
2. ⚠ ⚠ **判準一條（建議寫進 `writer-base.md` 第 1 點）**：**「日期＋動詞」要配三欄不是兩欄，第三欄是「日期前面那一個漢字」**（見 5999）——**`han()` 剝掉標點之後句號不存在，上一句的收尾字與下一句的日期在掃描器眼裡是連著的。** **本層配死這一欄之後，初稿第一輪 0 條日期樣板殘片**（鉤子層只配兩欄時第一輪 17 條裡有 11 條是日期樣板）。
3. ⚠ **實測一條**：**「引入法 N 張要 N 種」不只是行文要求，它會直接長成一條 N 張同構**——本組初稿的 `是渡辺貞` ×3 就是三張各自用最自然的方式具名的結果（見 6001）。**同一位掛名跨三張以上時，建議鉤子層或派工信把引入法配成表，像日期＋動詞那樣配死。**
4. **收件檢查照 `writer-base.md` 第 6 點**：**兩組都定稿後請主線統一再跑一次跨兩檔合掃**；**本層定稿時的合掃結果是 3 張以上 1 條（純專名 `渡辺貞夫` ×6）、片假名 0 條**，若 b 組之後又動過，這個數字會再變。
