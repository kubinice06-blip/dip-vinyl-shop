# c-116 日本自主 hardcore／ジャパコア與 noise 小廠：策展層裁定（2026-09-06）

交件：`prop-a.json` 22 張／16 位、`prop-b.json` 22 張／16 位，合計 **44 張、32 位**。
`node batch-progress/c116/chk-prop.mjs a b` → **標記 0**（線上池撞卡 0、跨組重複 0、跨批撞卡 0／67 批 3040 張）。
`chk-prop.mjs` 由 `batch-progress/c107/chk-prop.mjs` 原樣複製、只改批號（含裁定 186 的 `artist` 欄連字號檢查）。

---

## 一、本批立的裁定

### 第 1 條：**hardcore／punk 沒有 §5.5 白名單，這條線 1980 年代的核心實體有一半因此收不進來**

§5.5 的白名單只有 `electronic` 與 `asia-mini-album` 兩項，`Compilation` 走 §5.6。
ジャパコア 第一世代的正典形態是 7 吋 EP：Zouo 名下當年唯一的實體是 1984 年的《The Final Agony》(EP)、
Outo 五個 RG 有四個是 EP、Systematic Death 1980 年代原盤全是 EP、Judgement 名下 5 個 RG **一個 Album 都沒有**、
Confuse 九個 RG 有五個是 EP、DEATH SIDE 九個有四個是 EP。

**裁定：本批只提 `Album` 與 `Compilation` 兩型，EP 一律不收，不自行擴大白名單。**
理由有二：(a) 派工信明令 `chk-prop` 從 c-107 原樣複製，而 c-107 版沒有 c-97 那個 §5.5 EP 分支——
帶例外欄位的非 Album 會被直接標成「非合輯卻帶例外欄位」；(b) §5.5 明文「名單以外的曲風須經店主指定才可加入
`EXCEPTION_GENRES`，不得自行擴大」。**要不要為 hardcore 開白名單是店主的事，不是策展層的事**，
但這條線因此損失的量不小（見第四節「因 EP 而未收」），值得在收尾時提一句。

### 第 2 條（裁定 167／190 第六次應驗）：**掃 1,419 個 release-group，`primary-type=Compilation` 是 0，§5.6 一次都沒開**

派工信提醒「日本 hardcore 線的合輯（オムニバス）是這條線的正典形態……真的要開就備齊舉證」。
實掃結果：**這條線的オムニバス 在 MB 上全部建成 `Album` ＋ `secondary-types=["Compilation"]`。**

| 區塊 | 藝人數 | 掃到的 release-group |
|---|---:|---:|
| ジャパコア／hardcore（含未收的 Laughin' Nose、Disclose、Forward 等） | 29 | 332 |
| noise／power electronics／交界 | 16 | 1,087 |
| **合計** | **45** | **1,419** |

`primary-type=Compilation`：**0**。四張查證過的オムニバス——《GREAT PUNK HITS》(1983)、
《City Rockers》(1982)、《Hardcore Unlawful Assembly》(1984)、《ADK Omnibus, Volume 1》(1983)——
**四張全部是 `Album` ＋ `["Compilation"]`**，依裁定 167 照一般 Album 寫、例外欄位留空。
**本批 §5.6 開啟數 0，`releaseType: "Compilation"` 0 張。**

### 第 3 條（裁定 187 的第二、三個實例）：**MB 內部掛名分裂，這次是「大小寫」與「三形並存」**

裁定 187 記的是漢字／羅馬字兩種 credit。本批遇到兩個新形狀：

- **DEATH SIDE**（artist MBID `b5b08922`）：同一個藝人實體之下，
  《Wasted Dream》的 artist-credit 是 `Death Side`，《BET ON THE POSSIBILITY》是 `DEATH SIDE`。
  **純粹的大小寫分裂**——`chk-prop` 的 `k()` 會摺掉大小寫，不會生出兩個鍵，但卡池顯示會不一致。
- **非常階段**（artist MBID `d8e649be`）：**三種 credit 並存**——
  漢字 `非常階段`（《蔵六の奇病》）、羅馬字 `Hijokaidan`（《Modern》）、
  以及拼法不同的 `Hijyokaidan`（《Originals》1982-06）。**查目錄時三種都要跑。**

**裁定：**
1. **池中已有這位藝人 → 沿用池中寫法**（裁定 177 第一步）。非常階段 池中 2 張用漢字，本批兩張照漢字寫。
2. **池中沒有 → 取 MB 藝人實體的主名，不取個別 RG 的 credit**。DEATH SIDE 兩張因此都寫 `DEATH SIDE`。
   （這是對裁定 177 第二步的補充：**當同一實體下的 credit 彼此打架時，實體主名優先於單筆 credit。**）
3. 卡片掛名與所釘 RG 的 credit 因此可能不同字（非常階段《Modern》就是），
   **下游若有藝人比對閘要放行**（裁定 194 的形狀）。

### 第 4 條：**灰野敬二 這一位，本機上架前必須先改池中既有那張的掛名**

池中 灰野敬二 只有 1 張，掛在**羅馬字寫法 `Keiji Haino`** 下（《Watashi Dake?》，卡片年份記 2017）。
這正是 `audits/pool-artist-name-splits.md` 第六節列的 86 個「不合 08-11 裁定、但還沒造成重複卡」之一。

本批新收的《滲有無》用漢字 `灰野敬二`（＝MB 實體主名與 artist-credit）。
**若本機直接上架而不改池中那張，就會當場生出第 87 個分裂**——
audits 對 `林強 Lim Giong` 的警告（「下一批只要有人用純漢字提案，就會生出新的重複卡」）
在這一位身上會原封上演。

**裁定：本批照漢字提案；`Keiji Haino` → `灰野敬二` 的正規化列為本批上架的前置條件，
與 c-107 開批前先改簡繁是同一種前置。** 三處要同步：`seed_cards.json`、KV（`desc2`／`rating4`）、
Firestore `card_catalog`。

### 第 5 條：**`白 (kuro)` 不收——MB 把盤名寫進了藝人名，兩種寫法都會弄髒卡池**

大阪的 KURO（《Who the Helpless》1984）在 MB 上的藝人實體名是 **`白 (kuro)`**（`09de7baf`），
名下唯一的 Album 是 1990 年 D.T.K. Records 的整編輯，RG 標題 **`白 (KURO)`**。
看轄下 release 可以確認就是這支團（第二個 release 是《Who The Helpless + 10 Tracks》）。

問題在掛名沒有一種寫法是乾淨的：
- 照 MB credit 寫 `白 (kuro)` → 這是「漢字＋拉丁併寫」，正是 audits 第一節要砍掉的形狀，
  而且那個拉丁部分其實是**團名**、漢字部分其實是**盤名**，等於把盤名寫進掛名。
- 改寫成 `Kuro`（樂團自己封面上的拉丁寫法）→ 與所釘 RG 的 artist-credit 不同字，
  下游的藝人比對閘會擋（裁定 194），而且 `Kuro` 是同名實體極多的短掛名。

**裁定：本批不收，記進未收清單。** 依「可逆」判準，少收一張的成本遠低於在卡池裡種一個錯掛名；
要收的正確作法是先在 MB 上把藝人實體改名，那不是雲端能做的事。

### 第 6 條：**Apple 覆蓋率 14/44（31.8%），全部來自歐美廠牌的再發，日本 noise 線幾乎是 0**

派工信引 c-103 演歌線的 5/44，要我「不要為了湊 Apple 條目而改收其他碟」。本批實測：

| 組 | 有 Apple collectionId | 全部來源 |
|---|---:|---|
| a（hardcore） | **10 / 22** | G.I.S.M.×2（Relapse）、The Comes、The Swankys（General Speech）、あぶらだこ、Lip Cream×2、ザ・スターリン Fish Inn |
| b（noise／交界） | **4 / 22** | Incapacitants《Repo》、C.C.C.C.《Amplified Crystal》（Troniks）、Aube《Spindrift》（Robert & Leopold）、不失者《Allegorical Misunderstanding》 |

**規律很清楚：有歐美廠牌接手再發的碟才上得了 Apple**——Relapse、La Vida Es Un Mus、
Hospital Productions、General Speech、Troniks 這幾家帶進來的碟佔了命中數的大半；
純日本自營廠牌（Fatagaga Tapes、MSBR Records、Endorphine Factory、Crow Records、Sunshine Sherbet）
的碟**一張都沒有**。Solmania、MSBR、ハナタラシ、鉄アレイ 四位在 jp／us 兩店**連藝人條目都不存在**（search 0 筆）。

**裁定：照裁定 195，CAA 有封面就收，不因 Apple 查無而換碟。** 本批 44 張 **CAA 全部回 200**。

### 第 7 條：**あぶらだこ 的九張同名 LP——池中一次只能放一張，後續批必須帶顏色後綴**

あぶらだこ 名下 13 個 RG 裡有 **9 筆 `primary-type=Album` 全部題為《あぶらだこ》**
（1984-09／1985-08／1986-12／1989-04／1996／1999／2000／2004／2008），
坊間以封面顏色分稱「木盤」「青盤」「亀盤」。撞卡鍵 `k(artist)+'|'+k(album)` 對它們**完全相同**。

**裁定：本批取最早的 1984-09（木盤）一張。往後任何一批要再補這支樂團，
盤名必須寫成「あぶらだこ（木盤）」這種帶顏色後綴的形式**，否則會直接撞上這張、
而且 `dedup-crossbatch.mjs` 的 `DECOR` 括號剝除規則**不會**剝掉顏色詞（它只剝 remaster／reissue 那類裝飾詞），
所以帶後綴是安全的。Apple jp 店已經這樣做（1007931802 木盤／1008014768 青盤／1008040752 亀盤），可直接沿用。

### 第 8 條（主線退回後補記）：**ザ・スターリン《虫》(1983) 與 c-94 已上架的同一張碟重複，撤下改收 Crow《Last Chaos》**

主線跑 `chk-prop` 時抓到 `⚠ c94 ザ・スターリン《虫》1983 ←→ c116 ザ・スターリン《虫》1983`。
本批交件前跑 `chk-prop` 時 c-94 的卡單尚未被讀到同一輪比對裡，我這邊的 44 張自檢是 0 標記。

**處理**：撤下《虫》，改收 **Crow《Last Chaos》(1987, Crow Records Crow 0)**——
關西一線、CAA 200、JP／Official、掛名回問已排除 Sheryl Crow 等三個同名實體。
同時修正 ザ・スターリン《Fish Inn》卡的 `why`（原本寫「與《虫》一起收就補足四張連續」）
與 `mbNote`（《虫》改列為刻意不釘並註明撤下原因）。撤換後重跑 `chk-prop a b` → **標記 0、跨批撞卡 0**。

**教訓**：`c94` 已有 `desc-tools/batches/cards/c94-cards.json`，`dedup-crossbatch.mjs` 讀得到它——
我在寫 prop 之前只實掃了 `seed_cards.json`，**沒有先跑一次 `dedup-crossbatch.mjs` 探路**。
往後策展層應在**選碟階段**（不是交件前）就先跑一次跨批去重，否則寫完整張卡的 `why`／`risk`／`mbNote` 才發現要換，
成本是白寫三段長文字。

---

## 二、與 c-70／c-82 的實掃對照

**逐筆比對過 `batch-progress/c70/prop-a.json`(27)＋`prop-b.json`(19)＝46 張，
與 `batch-progress/c82/prop-a.json`(20)＋`prop-b.json`(25)＝45 張，合計 91 張。本批 44 張與之撞卡 0。**

### c-70（日本 new wave／post-punk，1978–1990）

**三張同屬本批這條線、且已經在池中**（c-70 已上架）：

| c-70 收的 | 池中現況 | 本批的處理 |
|---|---|---|
| `Gauze — Fuck Heads`（c-70 記 1985；MB first-release-date 1984） | 已在池 | 本批改補《EQUALIZING DISTORT》(1990)、《限界は何処だ》(1990) |
| `ザ・スターリン — trash`（1981） | 已在池（另有《STOP JAP》1982） | 本批改補《Fish Inn》(1984)；《虫》(1983) 已由 c-94 收走 |
| `Lip Cream — Kill Ugly Pop`（1986） | 已在池 | 本批改補《9 Shocks Terror》(1987)、《Close to the Edge 危機》(1988) |

**c-70 其餘 43 張全部落在 new wave／post-punk／自主電子那一格**
（Dada、Aunt Sally、R.N.A. Organism、EP-4、Auto-Mod、Non Band、少年ナイフ、じゃがたら、
遠藤ミチロウ《ベトナム伝説》、FRICTION、Madame Edwarda、YBO²、After Dinner 等），
與本批的 hardcore 與 noise 兩線**沒有一張重疊**。
⚠ 特別註記：**遠藤ミチロウ 的個人名義在 c-70（1 張），ザ・スターリン 的團名在 c-70（1 張）與本批（1 張）——
同一個人的兩個實體分屬兩批，這不是撞卡，但本機建卡時要知道。**

### c-82（日本 techno／ambient，1994–2001）

45 張全是 techno、house、ambient 製作人（Yoshihiro Sawasaki、Riow Arai、Kagami、Suzukiski、
Tamaru、Inoyama Land、Pacific 231、松前公高、永田一直 等），**與本批 noise 線名單零交集**。
兩批的時間窗（1994–2001）雖與本批 b 組重疊，但**曲風分野清楚**：
c-82 是節拍導向的電子製作，本批 b 組是 harsh noise／power electronics，
唯一沾邊的是「都掛 `electronic`」這個曲風欄，不構成撞卡。

**結論：本批與 c-70／c-82 撞卡 0 張；c-70 已上架的三張同線碟，本批已改補同一藝人的其他碟。**

---

## 三、短掛名回問（裁定 179）：22 個掛名、擋下 71 個同名實體

**這是本批最大的風險，也是花掉最多請求的一步。** 每一個都回問了藝人端點的 `area`／`type`／`disambiguation`。

| 掛名 | 取用的 MBID | 擋下的同名實體 | 數 |
|---|---|---|---:|
| `G.I.S.M.` | 0a44e3c3（Group／Japan／1980） | Egberto Gismonti（**池中已有 1 張**）、Segismundo Toxicómano、Sigismondo d'India、Sigismond Thalberg、Sigismund Neukomm | 5 |
| `Gauze` | 3e1caa06（Group／Japan） | gauze(AU)、G4UZ3(US)、Astral Gauze、Primitive Gauze、Muslimgauze（**池中已有 1 張**） | 5 |
| `Comes` | 3609887c（Group／Tokyo／Japanese Hardcore） | Comes(house)、DREAMS COME TRUE、Here Come the Mummies、Martijn Comes、Then Comes Silence | 5 |
| `Confuse` | 7349f02d（Group／Japan／1983） | Mr. Confuse、Chris Confuse、Dona Confuse(FR)、Idee confuse(IT)、Confuse the Cat(BE) | 5 |
| `Gai` | b9298324（Group／Japan／punk band） | **Gai（日本 hip-hop，score 95）**、Gai Barone(IT)、Gai Saber(IT)、Gai Toms(WLS)、杭盖乐队(CN) | 5 |
| `Death Side` | b5b08922（Group／Japan／1983） | Death(US)、Napalm Death、death's dynamic shroud、Christian Death | 4 |
| `K2` | 4838f37b（Person／Japan／Kimihide Kusafuka） | K2(DE eurodance)、K2(RS)、K2(ZA)、K2(JP doujin) | 4 |
| `Aube` | c57d8c1f（Person／Japan／1959-01-13） | AUBE(JP V 系)、Aube(FR)、aube(KR)、Aube(Montréal) | 4 |
| `Astro` | fa465468（Group／Japan／1993） | **ASTRO（韓國男團，score 97）**、Astro(CL)、Astro(UB40)、Astro(Edinburgh) | 4 |
| `C.C.C.C.` | 55394e92（Group／Japan／1989） | cccc(mashup)、Cosmic Comic Connection Cowboys、ccccccc | 3 |
| `S.O.B.` | 4d4159b8（Group／Japan／1983） | S.O.B.(FR talkbox)、SOB(Vallejo)、S.O.B.(Cluster) | 3 |
| `Bastard` | a296b6a1（Group／Japan） | Theodor Bastard(RU)、Bastard Noise(US)、Bastard(CZ) | 3 |
| `Crow` | 2b5e6093（Group／Osaka） | **Sheryl Crow（score 100）**、Crow(US 1969)、GARNET CROW | 3 |
| `Pain Jerk` | 7e199c07（Person／Japan） | Pain(SE)、Jerk(AU)、Jerk(US noise rock) | 3 |
| `High Rise` | 2f3eb5a0（Group／Japan／1984） | High Rise Bombers(AU)、High Rise Robots(US)、High Rise Trombone Quartet | 3 |
| `ザ・スターリン` | acf084a3（Group／Japan／1980-06-06） | Stalin(DE)、Stalin(d3e79013)、J. Stalin(Oakland) | 3 |
| `非常階段` | d8e649be（Group／Japan／1979） | Jazz Hijokaidan、にせ非常階段 | 2 |
| `Zeni Geva` | 4a48f534（Group／Japan／1987） | Zeni(house)、Zeni(1e3ab35e 另一個) | 2 |
| `Masonna` | 85faf30e（Person／Japan） | Masomania（Masonna＋Solmania 合作團） | 1 |
| `Solmania` | b785af88（Group／Japan／1984） | Masomania（同上） | 1 |
| `Lip Cream` | 14bef585（Group／Japan／1984） | Lip Cream(938c5904，Grindcore) | 1 |
| `The Swankys` | d926690c（Group／Japan） | Swankys(9bd53ed3，Person) | 1 |
| **合計** | | | **71** |

**未收藝人另外擋下的**（不計入上表）：`Outo` 3（Outo Elämä／Outo-orkesteri／嘔吐処女団）、
`Nightmare` 3、`Judgement` 3、`Kuro` 11（Apple 端 11 個同名 artistId）、`Warhead` 3、`Ghoul` 3。

**Apple 端的同名污染比 MB 更嚴重**：`Astro` 在 jp／us 兩店回 8 個 artistId 共 94 張，
絕大多數是韓國男團；`Gai` 4 個 artistId 共 171 張；`Bastard` 6 個共 104 張；`Kuro` 11 個共 281 張。
**下游探測若只比對掛名字串一定會配錯**（裁定 194 的形狀）。

---

## 四、未收清單

### 4.1 因封面兩路皆無而未收（裁定 195）

| 碟 | rgMbid | CAA | Apple | 換成 |
|---|---|---|---|---|
| Various Artists《City Rockers》(1982, City Rocker Records CR-00C) | 76dfe338 | **404** | 兩店無 | — |
| Various Artists《ADK Omnibus, Volume 1》(1983) | a2756071 | **404** | 兩店無 | — |
| Outo《Outo》(1999, Specialized Fact SFAN-003) | ec92d3c8 | **404** | 兩店無 | 鉄アレイ《鉄アレイ》(1991) |
| K2《Metal Dysplasia》(1996) | 955dd895 | **404** | 兩店無 | K2《The Rust》(1996，CAA 200) |
| Nightmare《Give Notice of Nightmare》(1990) | b83aa569 | **404** | 兩店無 | — |
| K2《N.G. Musik》《Student Apathy》(1983)、《Tekhnodrug》(1993)、《Traumantra》(1998) | 13ef6d5e／1d3edd24／1697c31a／cb26b077 | **全 404** | 兩店無 | — |

⚠ **《City Rockers》與《ADK Omnibus》兩張的損失最可惜**——它們是這條線的正典オムニバス，
《ADK Omnibus》在 MB 上還**重複建檔兩筆**（a2756071 是 `Album+Compilation`、7fcd1e78 的 `primary-type` 是空的）。
本批因此只收到兩張オムニバス（《GREAT PUNK HITS》《Hardcore Unlawful Assembly》）。

### 4.2 因 EP／非 Album 而未收（本批第 1 條裁定）

- **Zouo**：名下 4 個 RG，當年唯一實體是 1984《The Final Agony》(EP, aba4bd7a)；
  2021《AGONY憎悪REMAINS》(0476cf2f) 雖是 Album，但只有 1 個 XW release、與原盤差 37 年，不收。
- **Judgement**（d2845cdb）：名下 5 個 RG，**`primary-type=Album` 0 筆**。
- **Systematic Death**（9c866e70）：10 個 RG，1980 年代原盤全是 EP／無 primary-type；
  只有 2014《The Moon Watches》與 2017《Systema-Ten》是 Album。
- **Kuro／白 (kuro)**：1983《Kuro》(EP)、1984《Who the Helpless》(EP)、1986《Fire》(EP)——見第 5 條。
- **Warhead**（737663d2）、**MOBS**（986b499e）、**Framtid** 的 1990 年代 7 吋亦同。

### 4.3 查證完成、CAA 有圖，但本批 44 張額度用完（**留給後續批，MBID 已備妥**）

| 藝人 | 碟 | rgMbid | 備註 |
|---|---|---|---|
| The Swankys | Never Can Eat Swank Dinner (1987) | 35900f09-5fc4-332a-91e6-39f6ab7bbc70 | CAA 200 |
| S.O.B. | What's the Truth? (1990) | 7aa11ba8-1a79-3f36-a880-e88aa206824f | JP＋GB Official |
| 愚鈍 | 残忍聖者 Early Years (2010) | f2cac8e9-0dd9-4368-83d6-1bc72a1c21f5 | CAA 200；1980s 原盤在 MB 無 Album 形態 |
| The Execute | The Antagonistic Shadow (1988) | cd690090-62c9-49c0-9906-60d0af36b32a | CAA 200；唯一 release 的 status 是 null |
| Framtid | Defeat Of Civilization (2013) | 200b27e0-2a90-4f6d-b209-8bbcffa4b211 | JP Official |
| Forward | Just Go Forward To Death (2000) | 0c559d48-1c4f-4e0d-9aab-70117185ba47 | status null |
| Ghoul | 1984-1989 (2004) | 991aacf1-f8c2-4a0d-9bec-f37932628e4d | Album+Compilation |
| Bastard | No Hope in Here (2002) | 4f0eedaf-4178-39d5-9852-7cf7f2edf8d4 | Album+Compilation，與《Wind of Pain》曲目重疊 |
| 鉄アレイ | II (1998)／IV (2014) | 56bcc998／f7b1de3f | — |
| Crow | 血涙 (2005) | 9ce49fd1-7a16-4ee6-a9c1-07ab1c2ed06c | — |
| Gauze | 面を洗って出直して来い (1997)／貧乏ゆすりのリズムに乗って (2007)／言いたかねえけど目糞鼻糞 (2021) | f59eeaa9／cf90a79c／efe0bf47 | 這支團一輩子只出四張 LP，池中補到三張了 |
| G.I.S.M. | NIH Nightmare (1995)／SoniCRIME TheRapy (1998) | c1020a29／57ad952b | — |
| Lip Cream | Lip Cream (1989 同名) | 3bcf8082-fd24-4568-9818-1690a4be0cb6 | selfTitled |
| Laughin' Nose | 名下 28 筆 Album | — | ⚠ **21 筆沒有日期**，年份無從取，建卡前要逐張查實體 |
| Disclose | Nightmare or Reality (1999)／Yesterday's Fairytale… (2004)／Requiem for Kawakami (2018) | bd9b2e49／cdc8db41／66e34404 | — |
| High Rise | High Rise II (1986)／Dispersion (1992) | 84dbdd71／a2239a30 | **兩張 Apple 都有**（1334370094／1707587883） |
| 灰野敬二 | So, Black Is Myself (1997)／わたしだけ？(1981) | d7189513／67e1cebc | 後者池中已有其再發卡 |
| 不失者 | 悲愴 (1994)／もう少しこのまま (1996) | b9ac8f9b／c2fd9e17 | — |
| Zeni Geva | Desire for Agony (1993)／Total Castration (1991) | f43385e0／5a461c29 | 前者 Apple 281865258 兩店可得 |
| 非常階段 | Romance (1990)／Windom (1991)／Tapes (1986) | f8b1930d／1f519c79／49758e5d | — |
| Incapacitants | Feedback of N.M.S. (1991)／Fabrication (1992)／Ad Nauseam (1994) | 650fb114／42d34597／b9311066 | 名下 66 筆 Album，深度極大 |
| Masonna | Hyper Chaotic (1996)／Freak-Out Electrolyze (1997)／Shock Rock (2002) | b81c5d25／a1473bab／b6ec45f3 | Shock Rock 有 Apple 1822959203 |
| C.C.C.C. | Gnosis (1994)／The Beauty of Pollution (1996)／Phantasmagoria (1992) | 980ca140／faac2de0／b10286f6 | Phantasmagoria 有 Apple 1519784520 |
| Aube | Luminous (1993)／Flood-Gate (1993)／Pages From the Book (1998) | b9574d9a／655bbb24／d26d4dce | 名下 194 個 RG |
| Government Alpha | Doze (1994)／Funeral Procession (1995)／Sporadic Spectra (1999) | b408f7bc／a3923d10／637a4ea5 | — |
| Pain Jerk | Alchemistry (1995)／Exhibition of Electro-Disease (1995) | 0b35bb1a／88c47562 | 名下 161 個 RG |
| ハナタラシ | 2 (1988)／Hanatarash 3 (1992) | 779e793f／26a365e1 | — |
| KK Null | 個人名義，名下 **250 個 RG** | 9c51604c（藝人） | 本批完全沒碰，是最大的一塊空地 |
| Merzbow | 池中已有 3 張 | — | 本批把額度讓給 0 張的藝人，未再補 |

### 4.4 撤下

- **ザ・スターリン《虫》(1983)**（bf99d287）——與 c-94 已上架的同一張碟重複，見第 8 條。

---

## 五、MB 查無、可進 §1 補遺批的候選

**本批 45 位藝人的目錄逐一掃過，MB 建檔率意外地高**——ジャパコア 與 noise 兩線的樂團本身幾乎都有條目，
連 Fatagaga Tapes、MSBR Records 這種自製卡帶廠的編號都建進去了。
**查無的集中在オムニバス，不在藝人**：

| 候選 | 查詢 | 結果 |
|---|---|---|
| Various Artists《Outsider》（1980 年代日本 hardcore オムニバス） | `release-group?query=release:"Outsider" AND date:[1982 TO 1986]` | **count 0** |
| Various Artists《Kyushu Hardcore》（九州場景合輯） | `release-group?query=release:"Kyushu Hardcore"` | **count 0** |
| Various Artists《Eve of Destruction》（1980 年代日本合輯） | `release-group?query=release:"Eve of Destruction" AND date:[1983 TO 1987]` | **count 0** |
| Various Artists《消毒 GIG》系列 | `release-group?query=release:"消毒"` | count 1，回的是 2024 年 wotaku/KAITO 的同名單曲，**與本線無關**（裁定 122 的形狀） |

**三筆真的查無，可進 §1 補遺批。** 但要先提醒兩件事：
1. **§1 的舉證要件（`CURATION-BRIEF-c67plus.md` 附錄）是 Discogs 條目＋兩個獨立來源**，
   而合輯的第二來源比單一藝人難找——日本線的標準第二來源是**國立國會圖書館サーチ**（裁定 198），
   自主流通的オムニバス 多半沒有納本，NDL 查不到的機率很高。
2. **§1 卡的 `coverSourceHint` 不得是 `caa`**（要走 `apple-verified-collection`），
   但這三張在 Apple 上也不存在——**等於封面無解**。
   **我的判斷：這三筆列為候選但不建議實作**，投入產出不划算，除非店主特別想要。

**另外記一筆反方向的**：`Laughin' Nose` 名下 31 個 RG、28 筆 Album，但**其中 21 筆 `first-release-date` 是空的**——
這不是查無（裁定 28／122 的四種假形狀都排除過），是 MB 有條目但欄位沒填。
**這種「有條目、沒年份」的形狀進不了 §1（MB 有建檔），也進不了一般批（年份取不到）**，
是第三種狀態；要收就得逐張查實體版本。本批因此整位藝人未收。

---

## 六、給本機的三個前置

1. **`Keiji Haino` → `灰野敬二`**（第 4 條）：本批上架前必須先改，三處同步。
2. **`Death Side` 的顯示寫法統一為 `DEATH SIDE`**（第 3 條）：本批兩張已統一，池中原本沒有這位，無需改池。
3. **あぶらだこ 往後補目錄要帶顏色後綴**（第 7 條）。
