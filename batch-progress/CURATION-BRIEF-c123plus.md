# c-123～c-125 策展層共用簡報（2026-09-08）：**獨裁體制下的音樂**

店主 2026-09-08 指示：**「找出獨裁體制下的音樂　比如愛沙尼亞共產時期就有很多地下音樂
（這幾年有被挖出來做成合集）　找出這些音樂　任何世界上的國家都可以」**。

## 一、這條線是什麼

**收錄判準是「這張碟是在威權／獨裁體制下做出來的」**——
不是曲風、不是地區，是**產製條件**：國營唱片壟斷、審查制度、
自主流通只能靠卡帶與地下管道、藝人流亡或被禁。

**店主點名的形狀**：愛沙尼亞共產時期的地下音樂，**近年被挖出來做成合集**。
這條線的碟很多**只以復刻合輯的形態存在**——§5.6 全曲風開放合輯，**用得上**。

## 二、開哪三批，以及為什麼是這三批

主線 2026-09-08 對卡池實掃 20 個體制場景、每場景 20 位標誌藝人
（折疊鍵與 `chk-prop` 同步，拉丁與原文兩種寫法都查）。**選最空的三塊**：

| 批 | 場景 | 體制與年代 | 零率 | 池中 |
|---|---|---|---:|---:|
| c-123 | **蘇聯波羅的海地下** | Estonian／Latvian／Lithuanian SSR 1970–91 | **19/20 ＋ 18/20** | **1 ＋ 2** |
| c-124 | **伊朗** | Pahlavi 末期與 1979 之後 | **19/20** | **1** |
| c-125 | **伊比利半島** | Franco 西班牙、Estado Novo 葡萄牙 | **18/20 ＋ 17/20** | **6 ＋ 7** |

**已經有人做過、這輪不開的**：蘇聯俄語圈搖滾（c-53，池中 20 張／零率 8/20）、
南斯拉夫新浪潮（池中 33 張／零率 3/20）、巴西軍政府（池中 34 張／零率 8/20）、
印尼新秩序（池中 20 張／零率 7/20）。

**下一輪的候選**（零率仍高，這輪只是名額不夠）：
波蘭戒嚴 17/20（池中 4）、葡萄牙以外的東歐——捷克斯洛伐克 14/20（池中 10）、
匈牙利與羅馬尼亞 15/20（池中 9）、衣索比亞德爾格 15/20（池中 12）、
柬埔寨與緬甸 18/20（池中 5，**但要先對 c-64 的提案檔，那批做過柬越**）。

## 三、固定規格：**照 `CURATION-BRIEF-c103plus.md` 一字不改**

欄位、釘 MBID 的做法、「刻意不釘」的寫法、§5.6 合輯舉證、`chk-prop` 的跑法全部沿用。
**先把那份與它指向的 `CURATION-BRIEF-c93plus.md` 第一節讀完再看下面。**

## 四、三批共通的五個前提

### 1. **`primary-type` 必須是 `Album`，但 `secondary-types` 只有 `Compilation` 要特別處理**（裁定 253）

`Live`／`Soundtrack`／`Remix` **都不構成排除理由**；`Live` 的碟 `mbNote` 要寫明是現場錄音與演奏年。
⚠ 反方向也要防（裁定 227）：**`secondary-types` 為空不代表那是原盤**。

### 2. ⚠ **這條線大量是復刻合輯——§5.6 是主要入口，不是例外**

Frotee（愛沙尼亞）、Now-Again／Pharaway Sounds／Finders Keepers（伊朗）、
Vampisoul／Guerssen／Munster（西班牙）、Mais Um／Príncipe（葡萄牙）
這幾家近十年挖出來的合輯，**常常是那批錄音唯一可得的形態**。

§5.6 要件：`releaseType: "Compilation"` ＋ `exceptionReason`（≥12 字，說明歷史重要性）
＋ `exceptionEvidenceUrls`（≥2 個 HTTPS）。**不需 `genreException`。**
**同一批錄音的多種合輯只挑最權威的一種**（§5.6 明文）。

### 3. ⚠ **`curatorRisk` 只能寫觀察，不得寫結論**（裁定 254）

店面查法未命中就照實寫「`search` 與藝人目錄兩種查法未命中」，
**不得寫「未上架」「無來源狀態」「要掃圖」**——那要等研究層跑完第三種查法
（直查候選 `collectionId`）才能下。c-119 就是因為策展層先下了結論，
9 張碟被誤記成「tw 未上架」，研究層直查全部推翻。

### 4. ⚠ **短掛名回問（裁定 179／250）**

這三批的掛名大量是短的、非拉丁的、或與別的實體同名
（`Radar`、`Collage`、`Fix`、`Opus`、`Argo`、`Credo`、`Marjan`、`Soli`、`Habib`、
`Gong`、`Smash`、`Fausto`、`Tantra`）。
**score 排序完全不可用**（c-120 實測：目標實體排第 4、score 72）——
**只有 disambiguation 分得出來**；連 disambiguation 都沒填的，在 `risk` 欄標為不得背書本名。

### 5. **掛名寫法**

- **拉丁字母的原文照原文**，含變音符號（`Pērkons`、`Lluís Llach`、`José Afonso`）。
  ⚠ **非 ASCII 連字號會讓比對失準**（`chk-prop` 會擋）——連字號一律用 ASCII `-`。
- **西里爾字母與波斯文**：這三批用**羅馬轉寫**（池中既有的俄語卡是這樣寫的），
  原文寫進 `queryAlias` 與 `mbNote`。
- **年份一律取原盤年**，復刻年寫進 `mbNote`（裁定 220）。

## 五、逐批的坑

### c-123 蘇聯波羅的海（目標 40–45 張）

**骨幹**：愛沙尼亞 Ruja、Propeller、Vitamiin、Kaseke、Mess、In Spe、Radar、Turist、
Sven Grünberg、Rein Rannap、Gunnar Graps、Apelsin、Collage、Anne Veski、Jaak Joala；
拉脫維亞 Zodiac（`Zodiaks`）、Pērkons、Menuets、Līvi、Opus、Credo、Imants Kalniņš、Raimonds Pauls；
立陶宛 Antis、Foje、Bix、Katedra、Hiperbolė、Vytautas Kernagis、Modernaus Meno Ansamblis、Argo。

**坑**：
- **一切經 Melodiya（Мелодия）國營廠**——盤面編號是全蘇聯統一的 `С60-…` 系列，
  **加盟共和國分廠只是壓片地**。`label` 欄要寫清楚是哪個分廠（Tallinn／Riga／Vilnius）。
- **Frotee 與 Estonian Public Broadcasting 近年的復刻合輯是主要入口**——走 §5.6。
- **有些樂團只有電台母帶留下來、從未正式發行**——那種 MB 上多半查無，記進 §1 候選，不硬收。
- 店面 `ee`／`lv`／`lt` 覆蓋率預期極低，**主要靠 CAA**。

### c-124 伊朗（目標 40–45 張）

**骨幹**：巴列維末期 Googoosh、Kourosh Yaghmaei、Farhad Mehrad、Dariush、Ebi、
Fereydoun Farrokhzad、Zia Atabay、Shahram Shabpareh、Marjan、Ramesh、Soli、Habib、Sattar、Aref；
革命後與古典 Mohammad Reza Shajarian、Shahram Nazeri、Hayedeh、Mahasti、
Leila Forouhar、Golpayegani。

**坑**：
- **1979 是這條線的分水嶺，但兩邊都在威權下**——巴列維的審查與革命後的禁令是不同的兩套。
  `scene` 要分開（a 革命前、b 革命後與流亡）。
- **⚠ 行文不得寫政治立場、宗教評價或流亡敘事的價值判斷**——只寫可查證的事實
  （發行年、廠牌、曲目、編制、藝人在哪一年離開）。這一條要寫進 `risk` 欄提醒下游。
- **大量碟只以 Now-Again／Pharaway Sounds／Finders Keepers 的復刻合輯存在**——走 §5.6。
- **波斯文轉寫沒有統一標準**（`Googoosh`／`Gougoush`、`Kourosh`／`Kurosh`）——
  三種寫法都要查撞卡，卡片取 MB 主名。

### c-125 伊比利半島（目標 40–45 張）

**骨幹**：西班牙 Los Brincos、Los Bravos、Smash、Triana、Máquina!、Pau Riba、Sisa、
Vainica Doble、Lluís Llach、Paco Ibáñez、Raimon、Aguaviva、Iceberg、
Kaka de Luxe、Parálisis Permanente、Décima Víctima；
葡萄牙 José Afonso、Adriano Correia de Oliveira、José Mário Branco、Sérgio Godinho、
Fausto、Vitorino、Quarteto 1111、Petrus Castrus、Banda do Casaco、Tantra、José Cid、Luís Cília。

**坑**：
- **「反抗歌曲」與「進步搖滾」是同一批人**（Triana 與 Lluís Llach 都在佛朗哥末期），
  `scene` 不要照曲風切，照**體制段落**切：a 佛朗哥時期與過渡、b 葡萄牙 Estado Novo 與革命。
- **José Afonso 的《Grândola, Vila Morena》是康乃馨革命的暗號**——
  **這是可查證的史實，可以寫**；但**不得寫革命的價值判斷**。
- **加泰隆尼亞語與加利西亞語的碟在佛朗哥時期本身就是抵抗**（Nova Cançó）——
  盤名照原文語言寫，不要譯成西班牙語。
- 店面 `es`／`pt` 覆蓋率中等，**Vampisoul／Guerssen／Munster 的復刻在 `es` 上架率較高**。

## 六、交件

每批交 `batch-progress/c<批>/prop-a.json` 與 `prop-b.json`，
欄位照 `CURATION-BRIEF-c93plus.md` 第一節，**跑過自批的 `chk-prop.mjs` 且 0 標記**。
另交 `batch-progress/c<批>/rulings.md`：本批立的裁定、與既有批的實掃對照、
**未收清單（分類）**、短掛名回問的實測數字、店面與封面試聽預估、
**§5.6 開了幾張與逐張的舉證**。

**容器會不定時重啟**：每做完 5 筆就把目前結果寫進 `prop-*.json`；
若檔案已有部分內容，**接續補完，不要從頭重寫**。
