# 稽核：卡池有 6 組掛名分裂造成的重複卡

**日期**：2026-08-23　**發現於**：c-46 配樂線策展
**範圍**：`seed_cards.json` ＋ `apex_pool.json` ＋ 23 份 manifest（12,511 筆）
**方法**：同專輯名下，兩筆藝人名互為子字串者視為疑似分裂（正規化摺 U+2010–2015 連字號與 NFKC）

同一張碟因為**掛名寫法不同**被收成兩張卡。字串鍵擋不住，因為兩個鍵確實不同。

| # | 專輯 | 形態 A | 形態 B | 性質 |
|---|---|---|---|---|
| 1 | Ballads | `John Coltrane` (seed) | `John Coltrane Quartet` (c36-reels) | 1963 Impulse! 同一張 |
| 2 | Night Train | `Oscar Peterson` (seed) | `The Oscar Peterson Trio` (c35-shop-reels) | 1963 Verve 同一張 |
| 3 | async | `坂本龍一` (seed) | `Ryuichi Sakamoto 坂本龍一` (seed) | **兩筆都在 seed，已上線的重複卡** |
| 4 | Norma Jean | `Norma Jean` (seed) | `Norma Jean Wright` (c39-funk) | 1978 Bearsville 同名首作（注意另有同名金屬團，需確認 seed 那筆指的是誰） |
| 5 | The Velvet Underground & Nico | `The Velvet Underground & Nico` (seed) | `The Velvet Underground` (**apex:hall**) | **普卡與王牌重複** |
| 6 | The Miseducation of Lauryn Hill | `Ms. Lauryn Hill` (seed) | `Lauryn Hill` (**apex:hall**) | **普卡與王牌重複** |

## 為什麼要特別處理第 5、6 組

規則明定「已在王牌池的卡不得再以普卡上架」，`pipe-assemble.mjs` 也有 `already-apex` 檢查。
但這兩組是**掛名寫法不同**，該檢查用的是字串鍵，比對不到，所以擋不下來。
這兩張碟目前在站上同時以普卡與王牌存在。

## 為什麼跨批次去重擋不住

roadmap §五之 4 早就記過這個反模式（「杭蓋 Hanggai」「当山/當山」），結論是
**跨批次去重一律用 rgMbid**。但 `seed_cards.json` 的列只有
`[artist, album, 三軸, genres, year]`，**沒有 rgMbid**，所以既有池內的卡之間
無法用 rgMbid 互相去重——只有新批次對舊池能用。這是結構性限制，不是疏忽。

## 補訂（2026-08-28）：跨文字系統的掛名分裂，工具摺不掉

c-46 新世紀線發現第七類分裂，`scripts/pool-check.mjs` 的正規化**抓不到**：

| 池內形態 A | 池內／候選形態 B | 說明 |
|---|---|---|
| `吉村弘`（漢字） | `Yutaka Hirose`（羅馬拼音） | 兩種掛名慣例在池內並存 |
| `浜瀬元彦`（漢字） | `Motohiko Hamase`（MB 與再版用） | 同一人 |
| `喜多郎`（漢字） | `Kitaro`（國際通行） | 池內收《シルクロード》用漢字 |

正規化只摺疊 U+2010–2015 連字號、NFKC 與重音，**摺不了文字系統**——
漢字與羅馬拼音在任何字串正規化下都不會相等。這在日本、韓國、華語藝人身上
是通例而非例外（c-41／c-42／c-43 三批都碰過）。

**目前唯一可靠的做法是人工雙查**：漢字一輪、羅馬拼音一輪。
新世紀線就是這樣才發現 `Yutaka Hirose《Soundscape 2: Nova》` 與池內
apex:pearl 的 `Yutaka Hirose — Nova` 是同一張碟（池內用簡題）。

**同日已補的工具改良**（能抓到其中一部分，但不能取代人工雙查）：
1. **同名專輯不同掛名**警告——用專輯名反查，列出池內所有掛名。
   雷鬼線靠它確認並剔除 5 筆同碟（`Toots & The Maytals` vs `Toots and the Maytals`、
   `Lee "Scratch" Perry & The Upsetters《Super Ape》` vs `The Upsetters`、
   `Various Artists《The Harder They Come》` vs `Jimmy Cliff` 等），
   另抓到 grep 絕對漏掉的《96 Degrees in the Shade》vs《96° in the Shade》
   與《Police and Thieves》vs《Police & Thieves》。
2. **同藝人題名互為子字串**警告——抓「簡題 vs 全題」的同一張碟，
   即 Hirose 那個案例的形態。

## 建議

1. 第 3、5、6 組是明確要合併的（同一張碟、同一個發行）。第 1、2、4 組建議先確認
   seed 那筆的實際指涉再合併，尤其第 4 組有同名金屬團的干擾。
2. 合併時保留**池內既有的主要形態**當主名，另一種寫法進別名。
3. 屬**線上資料**（`seed_cards.json`／`apex_pool.json` 為上線開關），依規則本環境未修改，
   留店主本機處理。
4. 長期解法：若要讓既有池內卡也能互相去重，`seed_cards.json` 需要補 rgMbid 欄。
   這是相當大的一次性回填工程，不建議為此批倉促進行。

## c-46 這批的處理

配樂線的候選一律沿用池內既有的主要形態（`久石譲`、`Tan Dun 譚盾`），
不會再製造新的分裂。同類分裂在久石讓（`久石譲` / `Joe Hisaishi 久石讓`）與
坂本龍一（`坂本龍一` / `Ryuichi Sakamoto 坂本龍一`）身上都存在，選名時已避開。

---

## 2026-09-02 追加（c-60 策展時抓到）：灰野敬二／Keiji Haino／不失者

### 一、跨文字系統的重複卡（要合併）

| 池中既有 | 年份 | c-60 提案 | 判定 |
|---|---|---|---|
| `Keiji Haino`《Watashi Dake?》 | **2017** | `灰野敬二`《わたしだけ？》1981 | **同一張碟**，提案已剔除 |

兩邊一個用羅馬拼音、一個用原文字，**任何字串比對都判不出是同一張**——
`chk-prop` 與鬆散去重（去括號、去 remaster 尾綴、NFKD 正規化）兩道都放行了。
是人工核對藝人別名時才發現的。裁定第 49 條記了這個形狀。

### 二、順帶抓到的年份錯誤

`Keiji Haino`《Watashi Dake?》**年份記 2017，但那是 Black Editions 的再發年**。
原盤是 **1981 年 Pinakotheca** 的盤。依既有年份政策（裁定第 1 條、
c-52 對 Keenan Nasution 的處理）**應改記 1981**。

### 三、掛名不一致（但**不是**要合併的兩個對象）

池中另有 `不失者`《不失者 (Double Live)》(1989)，用**原文字**掛名。

**不失者與灰野敬二不該合併**——不失者是灰野敬二領軍的**樂團**，不是他的別名，
與 Selda／Selda Bağcan（同一人兩種拼法）不同類，**藝人張數上限應分開計**。

但**同一個池子裡一個用原文字（不失者）、一個用羅馬拼音（Keiji Haino），
本身就該統一**。依卡池既有慣例（日／韓／華語卡用原文字），
建議 `Keiji Haino` → `灰野敬二`，盤名 `Watashi Dake?` → `わたしだけ？`。

### 建議的處理順序

1. 先改年份 2017 → 1981（獨立於掛名問題，且明確）
2. 再決定掛名要不要改成原文字（會動到卡片鍵，影響 KV 與 Firestore）

三件都屬**線上資料**（`seed_cards.json`），依 REMOTE_RUNBOOK 雲端未修改，留本機處理。

---

## 2026-09-02 追加（c-62 策展時實掃卡池發現）：希臘區的 5 張全部掛羅馬轉寫

### 事實

- 池中希臘藝人 **5 張**，**全部掛羅馬轉寫**：

| 池中掛名 | 碟 | 原文字應為 |
|---|---|---|
| `Eleftheria Arvanitaki` | 《Ta kormia kai ta machairia》 | Ελευθερία Αρβανιτάκη |
| `Haris Alexiou` | 《Ta tragoudia tis Haroulas》 | Χάρις Αλεξίου |
| `Mikis Theodorakis` | 《Axion Esti》 | Μίκης Θεοδωράκης |
| `Manos Hadjidakis` | 《Gioconda's Smile》 | Μάνος Χατζιδάκις |
| `Savina Yannatou & Primavera en Salonico` | 《Sumiglia》 | Σαβίνα Γιαννάτου |

- **全池 13,418 列裡含希臘文字元的列數是 0。**
- （`Vangelis` 另有 7 張，屬電子／配樂線、拉丁掛名本來就是他的國際通行名，不在此列。）

### 為什麼是這 5 張要改，不是新卡要遷就

抽驗實測：**希臘文掛名查 MusicBrainz 10/10 命中正確實體、羅馬轉寫 0/10**
（轉寫查到的 4 筆裡 2 筆是別的實體）。卡池對日／韓／華語／西里爾的既有慣例
也都是原文字。裁定第 70 條因此定為新卡一律用希臘文原文。

**用轉寫收新卡等於為了遷就 5 張錯的、把 30 張也一起弄錯，而且會與 MB 對不上。**

### 三張已剔除的撞卡，其中一張是新形狀

| c-62 提案 | 池中既有 | 為什麼難抓 |
|---|---|---|
| Θεοδωράκης《Άξιον Εστί》 | 《Axion Esti》 | 原文字 vs 轉寫 |
| Χατζιδάκις《Το χαμόγελο της Τζοκόντας》 | 《Gioconda's Smile》 | **盤名還跨語言翻譯** |
| **Μάνος Λοΐζος《Τα τραγούδια της Χαρούλας》(1979)** | **`Haris Alexiou`《Ta tragoudia tis Haroulas》(1979)** | **MB 掛作曲者、卡池掛演唱者——兩邊掛的不是同一個人** |

第三筆是同一張唱片，**任何以掛名為主鍵的去重都抓不到**。裁定第 71 條記了這個形狀。

### 建議的處理

1. 五張的掛名改成希臘文原文，羅馬轉寫進別名（`queryAlias` 那一層）
2. `Manos Hadjidakis`《Gioconda's Smile》的**盤名**也要一併決定——
   原盤是《Το χαμόγελο της Τζοκόντας》，`Gioconda's Smile` 是英文譯名
3. 這批 38 張新卡都在藝人上限內，不會與這 5 張立刻衝突，**可以先上架再處理正規化**

屬**線上資料**（`seed_cards.json`），依 REMOTE_RUNBOOK 雲端未修改，留店主本機處理。

---

## 2026-09-02 追加（obscurity 校準時發現）：Junei《Let's Ride》年份記再發年

`Junei`《Let's Ride》卡片年份 **2014**，那是 Numero Group 的再發年，原盤是 1980 年代的私壓盤。
與 `Keiji Haino`《Watashi Dake?》（記 2017、應為 1981）同形。
屬線上資料（`seed_cards.json`），雲端未修改，留本機處理。

---

## 2026-09-02 追加（c-66 開批快掃發現）：印度線兩組縮寫空格分裂

| 掛名 A | 掛名 B | 張數 |
|---|---|---|
| `R.D. Burman` | `R. D. Burman` | 3 ＋ 1 |
| `A.R. Rahman` | `A. R. Rahman` | 3 ＋ 1 |

同一人、只差縮寫點後面有沒有空格，與 Toots and the Maytals／Toots & The Maytals 同形。
兩組都會影響藝人上限的計算（合併後 R.D. Burman 4 張已超上限 3）。
屬線上資料（`seed_cards.json`），雲端未修改，留本機處理。**c-66 新卡一律用無空格的 `R.D.` 形式**
（池中主要形態），並先數合併後的張數再提案。

另記：池中 37 張印度／南亞卡**全部羅馬拼音、零張印度文字**。c-66 依第 70 條的邏輯
先抽驗 MB 認哪一種再定掛名文字——印度的情況與希臘不同，寶萊塢與古典的國際發行
（HMV／Saregama／EMI India）本來就用羅馬字印封面，**羅馬拼音可能才是原盤寫法**，
不能直接套希臘批的結論。

---

## 2026-09-04 追加（c-76 實掃發現）：日本線三組掛名分裂，其中一組是全新形狀

| 掛名 A（池中現況） | 掛名 B（MB／本批用法） | 張數 | 形狀 |
|---|---|---|---|
| `Yutaka Hirose` | `広瀬豊` | 1 ＋ 0 | 羅馬拼音 ↔ 漢字 |
| `Shiho Yabuki` | `矢吹紫帆` | 1 ＋ 0 | 羅馬拼音 ↔ 漢字 |
| `浜瀬元彦` | `濱瀬元彦` | 3 ＋ 0 | **異體字（新舊字體）** |

前兩組與希臘／印度線的羅馬拼音分裂同形。**第三組是新形狀**：
同一個漢字姓氏的新舊字體（浜／濱）在任何正規化下都是兩個鍵——
不是拼寫差異、不是空格差異，是兩個不同的 Unicode 字。
**`chk-prop.mjs` 的 key 函式判不出這三組中的任何一組。**

三組都是 c-76 策展層**以盤名為主鍵掃全池**（第 71 條）才抓到的：
- 広瀬豊《Soundscape 2: Nova》←→ 池中 `Yutaka Hirose`《Nova》(1986)（再發縮短了盤名）
- 濱瀬元彦《Reminiscence》←→ 池中 `浜瀬元彦`《Reminiscence》(1986)
- 矢吹紫帆《からだは宇宙のメッセージ》←→ 池中 `Shiho Yabuki`《The Body Is a Message of the Universe》(1987)

三張都已從 c-76 剔除（第 49／115 條）。屬線上資料（`seed_cards.json`），雲端未修改，留本機處理。

**方法教訓**：日本線開批前，除了掛名比對，一定要**把每張盤名的羅馬拼音與英譯也寫出來、
以盤名為主鍵掃一次全池**。日本盤的再發常常同時換掉掛名文字與盤名文字，
只比對掛名會整組漏掉。


### 2026-09-04 續補（c-76 研究層在來源側再抓到的寫法分裂）

這些不是池中的分裂，是**來源側的分裂**——查資料與填 `queryAlias` 時會踩到：

| 藝人／盤 | 各處寫法 |
|---|---|
| 濱瀬元彦 | MB、Discogs、**日文維基條目名**都用「濱」；池中與卡片用「浜」（維基會自動轉址） |
| YAS-KAZ | MB 的 artist-credit 用 **U+2010 連字號**「YAS‐KAZ」，卡片是 ASCII 連字號 |
| 伊藤詳 | MB credit **只寫「Akira」一個字**；Discogs 原盤「Akira*」；復刻「Akira Ito」；卡片漢字。**`queryAlias` 不得填單獨的「Akira」** |
| 菅野昌弘 → 菅谷昌弘 | 同一位作者在《海の動物園》的 MB credit 是漢字、在《熱の風景》是羅馬拼音 |
| 日向敏文 | Discogs 把 1985 原盤掛名登成「Toshi*」 |
| 喜納昌吉＆チャンプルーズ | MB 全形「＆」／池中半形「&」／Apple「喜納昌吉 & チャンプルーズ」（& 前後各一空格）／**Discogs 拆成 `Shoukichi Kina` 與 `Champloose` 兩個實體** |
| ネーネーズ | Discogs `Nenes (2)`／歐洲 Columbia 盤 `Nenes`／日文維基 alias `Nēnēs`（帶長音符） |
| りんけんバンド | Discogs `Rinken Band`；2001 年另一筆作 `Rinkenband*` |
| Diamantes | MB／Discogs `Diamantes`；日文維基與 Apple 用 `DIAMANTES`／片假名 `ディアマンテス` |
| 團員 | 日文維基作**吉田康子**，唱片 credit 一律作**宮里康子**——同一人兩種姓 |

**盤名也會分裂**，去重與查詢時同樣要含多式：
縄文頌／Jomon-Sho／Jo Mon Sho｜風の卵／Egg Of Purana／Egg Of Purãna｜
余韻**四種**（余韻「レゾナンス」／余韻 (Resonance)／Resonance／Resonance 余韻）｜
♯Notes **四種**（♯／#／全大寫／帶 2020 尾綴）｜
《ゆんた とぅ じらば》Discogs 作 `ゆんた とぅ じらば = Yunta & Jiraba`、官方年表無空格。

**廠牌同理**：`DISC AKABANA`／`Disc Akabana`／`ディスクアカバナー` 是同一家，
且 **APCD-1001 是ネーネーズ《IKAWU》、APCD-1002 是大工哲弘那張**——
同廠連號卻跨兩位藝人，廠牌側的查詢不能假設連號屬於同一人。

---

## 2026-09-04 追加（c-79 實掃發現）：日本フォーク線的掛名分裂，**兩筆是 MB 自己的兩層不一致**

c-79（日本 SSW／folk 私家版與小廠二線 1971–80）在釘 release-group 時逐張比對
`artist-credit` 與 MB 藝人**實體名**，發現兩筆 MB **自己在同一張碟上就用兩種寫法**——
這與 c-76 記的「池中 vs MB」分裂不同類，是**來源內部**的分裂：

| 卡 | release-group 的 artist-credit | MB 藝人實體名 | 形狀 |
|---|---|---|---|
| なぎらけんいち《街の風になって》(1974, URC) | **なぎらけんいち**（平假名） | **なぎら健壱**（漢字，`8fea6677…`） | 平假名 ↔ 漢字，同一人 |
| トメ北川《青春から》(1976, Trio 3A-1016) | **トメ北川** | **麻上冬目**（`9bda73c2…`，sort-name Asagami, Fuyume） | **藝名 ↔ 本名，兩個字面毫無交集** |

後者尤其危險：**用卡片掛名「トメ北川」去查 MB 藝人實體會落空**，只有用「麻上冬目」browse
才找得到這張碟——是裁定第 10／81／94 條「用藝人查不到 ≠ MB 沒有這張碟」的第四種形狀
（前三種是 credit 字串 ≠ 實體名、實體掛錯層級、掛在 Various Artists 名下）。
兩張的 `queryAlias` 都已填入實體名側的寫法。

### 同一批在來源側抓到的其他寫法分歧（查資料與填 `queryAlias` 時會踩到）

| 藝人／盤 | 各處寫法 |
|---|---|
| ザ・ディランII | 卡片與 MB 用 **ASCII 兩個大寫 I**「ザ・ディランII」；**Apple jp 用羅馬數字單字元「ザ・ディランⅡ」（U+2161）**；Discogs 另有拉丁「The Dylan II」。用卡片掛名查 Apple **零命中**，改用 Ⅱ 才查到——任何 `toLowerCase` ＋ 去符號的正規化都判不出這兩者相同 |
| シバ | 本名寫法「三橋誠」與併記寫法「シバ, 三橋誠」（1977 Bellwood OFL-44 即用併記）並存 |
| 中川イサト／南正人 | **Apple jp 在姓與名之間多一個半形空格**：「中川 イサト」「南 正人」——池中與 MB 都無空格 |
| 麻生レミ | MB／卡片「麻生レミ」；Discogs 原盤「Lemi Aso」；同一人另一筆單曲「Remi Asō」（帶長音符）。**三種**。另注意 Discogs 上的**麻生京子**是不同人 |
| スカイドッグ・ブルース・バンド | MB 片假名；Discogs 與原盤封面拉丁「Sky Dog Blues Band」 |
| 古川豪／柴田容子 | MB sort-name 帶長音符（Furukawa **Gō**、Shibata **Yōko**），一般轉寫作 Go／Yoko——長音符有無兩種都要試 |
| 西岡たかし ↔ 西岡恭蔵 | **兩個不同的人**，漢字只差一字（Takashi ／ Kyozo Nishioka），池中已有西岡恭蔵 1 張，去重時不得合併 |
| ザ・ディランII ↔ オリジナル・ザ・ディラン | 同一個團名分裂出的**兩組**，MB 是兩個實體，不得合併 |
| 中島光一 ↔ 中島みゆき | 常見姓氏撞名，池中中島みゆき已 3 張達上限，兩者要分開計 |

**盤名側的分裂（Apple 大量改用羅馬拼音）**：
武蔵野タンポポ団の伝説 → Apple「Musashino Tanpopodan no Densetsu」｜
南正人ファースト・アルバム → Apple「Minami Masato First」｜
この世を悲しむ風来坊に捧ぐ → Apple「Kono Yo wo Kanashimu Furaibou ni Sasagu」｜
悲しみの街 → Apple「Kanashimi no Machi」｜四張都是**用日文盤名查 Apple 零命中、換拼音才中**
（裁定第 76 條的形狀，`queryAlias` 已填）。
另有兩種文字並存的：PIERROT／ピエロ（Discogs master 並列）、
レインボウ・チェイサー／Rainbow Chaser（MB 片假名、Discogs 原盤拉丁）。

**方法教訓（補 c-76 那條）**：日本線除了「掛名比對」與「盤名為主鍵掃全池」，
還要**逐張比對 MB 的 artist-credit 與藝人實體名**——這兩層不一致時，
用卡片掛名做的任何藝人層查詢（包含 browse）都會落空，而它不會回錯誤碼，
只會回一個乾淨的空結果。


### 2026-09-04 三補（c-79 策展層實掃）：MB **自己兩層不一致**，以及 Unicode 同形異碼

**前兩節記的是「不同資料庫寫法不同」。這一節是新的兩種**：

#### (1) MusicBrainz 內部的 artist-credit 與 artist entity 不一致

| 卡片掛名 | MB artist-credit | MB artist entity | 形狀 |
|---|---|---|---|
| なぎらけんいち | なぎらけんいち（平假名） | **なぎら健壱**（漢字） | 假名 ↔ 漢字 |
| トメ北川 | トメ北川（藝名） | **麻上冬目**（本名） | **字面毫無交集** |

**トメ北川 這筆最危險**：用卡片掛名去 browse 藝人**必然落空**，
而落空看起來就像「這位藝人在 MB 上沒有作品」。
這是第 10／81／94 條那個家族的**第四種形狀**——
前三種是我們與資料庫寫法不同，這一種是**資料庫自己跟自己不一致**。
**對策**：藝人 browse 落空時，先用 `release-group` 側的查詢反查一次，
看回來的 artist entity 叫什麼。

#### (2) Unicode 同形異碼：任何正規化都判不出相同

**ザ・ディランII**：卡片與 MB 用 **ASCII 的兩個 `I`**，
**Apple 的 jp 目錄用羅馬數字 U+2161「Ⅱ」**。
兩者在螢幕上長得一樣，`toLowerCase()`、去空格、去標點全都救不了
——它們是不同的碼位。用卡片掛名查 Apple **整組零命中**。

與前一節記的 **YAS-KAZ 的 U+2010 連字號**、
以及 c-76 的 **浜／濱 異體字**是同一個家族：
**「看起來一樣」不等於「是同一個字」。**
c-79 另有一張 I.M.Oバンド《Cata‐Coto》因標題含 U+2010 直接踩到 `chk-prop` 的反模式。

**對策**：日文線的掛名與盤名比對，除了羅馬拼音與英譯，
**還要把常見的同形異碼各試一次**：
`I`/`Ⅰ`、`II`/`Ⅱ`、`III`/`Ⅲ`、ASCII `-` / U+2010 / U+2212 / 全形 `－`、
ASCII `&` / 全形 `＆`、半形空格 / 全形空格。

#### (3) 盤名側：Apple 用全羅馬拼音

c-79 有 4 張的 Apple 標題是**整串羅馬拼音**（Musashino Tanpopodan no Densetsu／
Minami Masato First／Kono Yo wo Kanashimu Furaibou ni Sasagu／Kanashimi no Machi），
用日文盤名查 Apple **全部零命中**。這與 c-76 的
《チャンプルーズ・ルネッサンズ》→ Champloose Renaissance 同形，
也與 c-87 的 与世山澄子《Introducing》→「イントロデューシング」互為鏡像。
**日文線的 `queryAlias` 一定要備羅馬拼音式。**

#### (4) 掃描器本身的教訓（第 119／132 條又一次）

c-79 的策展層第一版盤名掃描器把《( )》《+》這類**短盤名當子字串**比到全池，
產出 79KB 全是誤報。加 `length>=4` 守衛後重跑才乾淨。
**與第 132 條同病：正規化／比對不可以比它的目的更寬鬆，也不可以更激進。**

---

# 續補（2026-09-06）：全池重掃，**分裂 24 組、另有 86 個掛名不合 08-11 裁定**

**範圍**：`seed_cards.json` 全 14,424 列、6,830 個掛名。
**方法**：四種型態各掃一遍（前兩種是舊有的，後兩種是這次新加的）。
**雲端只能掃與判定，不能改**（`REMOTE_RUNBOOK.md`：雲端不動 `seed_cards.json`、不碰 KV 與 Firestore）。
**下面每一組都已依 2026-08-11 東亞藝人命名裁定決定好正規形，本機照做即可。**

## 判準（2026-08-11 裁定的直接適用）

- 日本、華語圈、韓國的音樂人與團體**照原文漢字寫**，不羅馬化 → **併寫的「漢字 Latin」一律砍掉 Latin 那半**。
- **只有全平假名／全片假名（完全無漢字）的名字才用羅馬字** → **`はっぴいえんど` 的正規形是 `Happy End`，不是假名**。
- 韓文諺文名維持諺文。
- **中文簡繁：店主 2026-09-06 裁定一律用繁體。**

---

## 一、型態一：漢字／假名與拉丁併寫，且池中另有純漢字形（**15 組，真重複卡**）

**正規形一律取純漢字那個**，併寫形的卡併過去。

| 併寫形（要併掉） | 正規形（保留） | 卡數 |
|---|---|---|
| `王菲 Faye Wong` | **`王菲`** | 1 → 3 |
| `崔健 Cui Jian` | **`崔健`** | 1 → 3 |
| `五月天 Mayday` | **`五月天`** | 3 → 2 ⚠ 另有店主 2026-09-05 裁定要刪 3 張，**先刪再併** |
| `蘇打綠 sodagreen` | **`蘇打綠`** | 2 → 2 |
| `陳綺貞 Cheer Chen` | **`陳綺貞`** | 2 → 1 |
| `張懸 Deserts Chang` | **`張懸`** | 2 → 1 |
| `閃靈 CHTHONIC` | **`閃靈`** | 2 → 2 |
| `巴奈 Panai` | **`巴奈`** | 1 → 1 |
| `雷光夏 Summer Lei` | **`雷光夏`** | 1 → 1 |
| `滅火器 Fire EX.` | **`滅火器`** | 2 → 1 |
| `四分衛 Quarterback` | **`四分衛`** | 1 → 1 |
| `董事長樂團 The Chairman` | **`董事長樂團`** | 1 → 1 |
| `陳昇 Bobby Chen` | **`陳昇`** | 1 → 1 |
| `大支 Dwagie` | **`大支`** | 1 → 1 |
| `Ryuichi Sakamoto 坂本龍一` | **`坂本龍一`** | 2 → 8 |
| `Akira Ifukube 伊福部昭` | **`伊福部昭`** | 1 → 1 |

（上表 16 列，`Ryuichi Sakamoto 坂本龍一` 那組舊稽核第 3 條已記過、至今未修。）

## 二、型態二：正規化後相同、字串不同（**13 組**，原列 14 組、撤銷 1 組）

多數是**彎撇號 `’` 對直撇號 `'`**。正規形取**彎撇號**（池中多數卡用彎撇號，且 MB 與 Apple 也用彎撇號）。

| 形態 A | 形態 B | 正規形 |
|---|---|---|
| `Jane's Addiction`（1） | `Jane’s Addiction`（2） | **`Jane’s Addiction`** |
| `Guns N' Roses`（2） | `Guns N’ Roses`（2） | **`Guns N’ Roses`** |
| `The O'Jays`（3） | `The O’Jays`（6） | **`The O’Jays`** |
| `Destiny's Child`（1） | `Destiny’s Child`（3） | **`Destiny’s Child`** |
| `Flipper's Guitar`（2） | `Flipper’s Guitar`（1） | **`Flipper’s Guitar`** |
| `The J.B.'s`（1） | `The J.B.’s`（3） | **`The J.B.’s`** |
| `Booker T. & the MG's`（1） | `Booker T. & the MG’s`（8） | **`Booker T. & the MG’s`** |
| `BOREDOMS`（2） | `Boredoms`（2） | **`Boredoms`**（MB 與官方網站用首字大寫） |
| `Nurse With Wound`（1） | `Nurse with Wound`（4） | **`Nurse with Wound`** |
| `Public Image Ltd`（2） | `Public Image Ltd.`（2） | **`Public Image Ltd.`** |
| `Leadbelly`（1） | `Lead Belly`（1） | **`Lead Belly`**（美國國會圖書館與 MB 用分寫） |
| `R. D. Burman`（1） | `R.D. Burman`（3） | **`R.D. Burman`** |
| `A. R. Rahman`（1） | `A.R. Rahman`（3） | **`A.R. Rahman`** |
| ~~`Next`（1）~~ | ~~`N.EX.T`（1）~~ | ⚠ **撤銷：不是同一團，本機不要合併** —— c-104 策展層 2026-09-06 實查：`Next` 那張是《Rated Next》，**美國 R&B 團體**；`N.EX.T` 是신해철的韓國團。這一列是我判錯的。 |

## 三、型態三（新加）：`&` 與 `and` 的分裂（**6 組**）

舊的正規化把 `&` 當標點刪掉、`and` 當字母留著，所以**這一類從來沒被抓到過**。
正規形取**唱片封面與 MB 的主要寫法**：

| 形態 A | 形態 B | 正規形 |
|---|---|---|
| `Nick Cave and the Bad Seeds`（4） | `Nick Cave & the Bad Seeds`（3） | **`Nick Cave & the Bad Seeds`** |
| `Art Blakey and the Jazz Messengers`（6） | `Art Blakey & The Jazz Messengers`（5） | **`Art Blakey & the Jazz Messengers`**（另注意 `The`／`the` 也不一致） |
| `Toots and the Maytals`（3） | `Toots & The Maytals`（1） | **`Toots & the Maytals`** |
| `Archie Shepp and Horace Parlan`（1） | `Archie Shepp & Horace Parlan`（1） | **`Archie Shepp & Horace Parlan`** |
| `Martha Reeves and the Vandellas`（1） | `Martha Reeves & the Vandellas`（2） | **`Martha Reeves & the Vandellas`** |
| `Big Brother & The Holding Company`（1） | `Big Brother and the Holding Company`（1） | **`Big Brother & the Holding Company`** ⚠ **兩筆都掛 hall** |

## 四、型態四（新加）：全假名 vs 羅馬字（**1 組**）

| 形態 A | 形態 B | 正規形 |
|---|---|---|
| `はっぴいえんど`（3 張） | `Happy End`（2 張） | **`Happy End`** |

**理由**：08-11 裁定的例外條——**全平假名／全片假名（完全無漢字）的名字才用羅馬字**。
`はっぴいえんど` 是全平假名，落在例外裡。**這與其他東亞藝人的處理方向相反，不要弄混。**
兩張重複卡：`Kazemachi Roman`＝`風街ろまん`、`Happy End`＝`HAPPY END`（c-94 抓到）。

## 五、⚠ 中國搖滾線的簡繁（店主 2026-09-06 裁定：**一律繁體**）

**池中這一線目前全部是簡體**，開 c-107（中國搖滾與獨立正典）前要先改：

| 池中現況（簡） | 改成（繁） | 卡數 |
|---|---|---:|
| `窦唯` | **`竇唯`** | 3 |
| `张楚` | **`張楚`** | 1 |
| `万能青年旅店` | **`萬能青年旅店`** | 2 |
| `唐朝乐队` | **`唐朝樂隊`** | 1 |
| `黑豹乐队` | **`黑豹樂隊`** | 1 |
| `何勇` | `何勇`（簡繁同形，不動） | 1 |
| `崔健` | `崔健`（簡繁同形，見第一節） | 3 |

**`chk-prop.mjs` 的 NFKC 正規化摺不掉簡繁**，所以這一組工具永遠抓不到，只能靠這份清單。

## 六、另一件事：**86 個掛名不合 08-11 裁定，但不是重複卡**

型態一掃出 101 個「漢字／假名＋拉丁併寫」的掛名，其中 15 個在池中有純漢字的對應形（第一節），
**其餘 86 個是單一形態**——不是重複卡，但**寫法不合 08-11 裁定**（應為純漢字）。

集中在兩塊：
- **古典線**（約 55 個）：`Mitsuko Uchida 內田光子`、`Yo-Yo Ma 馬友友`、`Tan Dun 譚盾`、
  `Myung-Whun Chung 鄭明勳`、`Cho-Liang Lin 林昭亮`、`Tyzen Hsiao 蕭泰然`……
  **且其中兩組自己就重複**：`Jiang Wenye 江文也`／`Wen-Yeh Chiang 江文也`、
  `Ma Shui-Long 馬水龍`／`Shui-Long Ma 馬水龍`——**同一人、拉丁部分的姓名順序相反**。
- **台灣獨立與華語流行**（約 25 個）：`落日飛車 Sunset Rollercoaster`、`草東沒有派對 No Party For Cao Dong`、
  `鄧麗君 Teresa Teng`、`林強 Lim Giong`、`蛋堡 Soft Lipa`、`MC HotDog 熱狗`……

**這 86 個要不要一起正規化，是店主的決定，不是雲端能決的**——
它們現在沒有造成重複卡，但**下一批只要有人用純漢字提案，就會生出新的重複卡**
（`林強 Lim Giong` 就是這樣：c-89 那批用 `林強` 提案，池中兩張掛在 `林強 Lim Giong` 上，撞卡檢查看不到）。

**建議**：至少先把**這輪與下一輪會碰到的那幾位**正規化——
`林強 Lim Giong`→`林強`、`Tan Dun 譚盾`→`譚盾`、`鄧麗君 Teresa Teng`→`鄧麗君`、
`草東沒有派對 No Party For Cao Dong`→`草東沒有派對`、`落日飛車 Sunset Rollercoaster`→`落日飛車`，
以及第五節的中國搖滾五組。其餘 81 個可以之後再排。

## 七、合計

| 型態 | 組數 | 性質 |
|---|---:|---|
| 一、漢字＋拉丁併寫 vs 純漢字 | 16 | **真重複卡** |
| 二、正規化後相同 | **13** | **真重複卡**（多為彎直撇號）。原列 14 組，`Next`／`N.EX.T` 那組經實查**撤銷**（不是同一團） |
| 三、`&` vs `and` | 6 | **真重複卡**（舊工具抓不到） |
| 四、全假名 vs 羅馬字 | 1 | **真重複卡** |
| 五、簡繁（中國搖滾線） | 5 | 不是重複卡，是**開批前置** |
| 六、不合裁定但無重複 | 86 | **要店主決定要不要一起正規化** |

**改的時候三處要同步**（照 08-11 改名那次的做法）：`seed_cards.json`、
KV（`desc2`／`rating4`）、Firestore `card_catalog`。

## 2026-09-06 追記：**MB 內部的掛名分裂（c-103 演歌線）**

這一節記的不是卡池的分裂，是**上游 MusicBrainz 自己的分裂**——
同一個 artist MBID 之下，部分 release-group 掛漢字 credit、部分掛羅馬字 credit。
**查目錄時兩種寫法都要跑，否則會漏掉一半的碟。**

| 藝人（正規形＝原文） | MB 上的另一種 credit |
|---|---|
| `石川さゆり` | Ishikawa Sayuri |
| `ちあきなおみ` | Chiaki Naomi |
| `由紀さおり` | Yuki Saori |
| `江利チエミ` | Eri Chiemi |

**卡片一律用原文形**（裁定 187）。`ちあきなおみ` 另適用裁定 189：
沒有官方羅馬字藝名，純拼音轉寫不算，**保留假名不羅馬化**。
