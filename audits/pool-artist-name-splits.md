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
