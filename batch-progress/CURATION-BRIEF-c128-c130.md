# 策展簡報：c-128／c-129／c-130（店主 2026-09-14「台灣獨立 緬甸 波蘭 做」）

三批共用這一份。**固定規格與已判過的廠牌清單，照 `CURATION-BRIEF-c127.md` 一字不改**，
那份又轉引 `c126` → `c103plus` → `c93plus`。**規格不重述，直接讀那幾份。**

## 〇、三批共通的五條（每批都會踩）

1. **`release-group` 端點不回 `label-info`／`media.format`／country／status**（裁定 259）——
   要這些一律打 `release?release-group=<id>&fmt=json&inc=media+labels&limit=100`。
   **「查無」與「沒問」在回傳裡長得一樣。**
2. **實掃卡池一律子字串雙向比對**（裁定 255），但**子字串會生大量假陽性**——
   `Ka`、`AI`、`X`、`toe`、`Gas`、`Om`、`East`、`Iris` 這種短掛名會亂命中。
   **判「池中有無」要看整個掛名字串。**
3. **短掛名回問**（第 179／250 條）：`artist?query=artist:"<名>"&limit=25`，
   **`score` 排序一律不採**，只看 `type`／`area`／`life-span.begin`／`disambiguation`。
4. **`secondary-types` 含 `Live` 要收**（第 253 條）；`Compilation` 走 §5.6
   （要 `exceptionReason` ＋兩個 HTTPS 舉證）；**電影／遊戲原聲帶不收**；
   **EP 不收**，除非落在 §5.5 白名單（`electronic`／`hardcore-7inch`／`asia-mini-album`）。
5. **`rgMbid` 沒有獨立欄位**——`make-cards-generic.mjs` 抓 `mbNote` 裡**第一個** UUID。
   本張的 MBID 必須排第一，對照組與被駁回候選往後排並標明那是什麼。

**交件**：`batch-progress/<批>/prop-{a,b}.json`，欄位照 `batch-progress/c127/prop-a.json`
逐欄對齊（含 `g`）。交件前跑 `node batch-progress/<批>/chk-prop.mjs`，標記清成 0。
**裁定寫進 `batch-progress/<批>/rulings.md`，用 append**（兩組同時寫，c-126 那次整檔覆寫
把一整段撞掉了）。**每做完 5 筆就把 `prop-*.json` 整份寫回磁碟**，開工先讀、接續補完。

**⚠ `chk-prop` 只比對線上池（`seed_cards.json`）與已註冊的批。
c-126 與 c-127 那 90 張本機都還沒上架、它抓不到**——
撞卡要自己讀 `desc-tools/batches/cards/c126-cards.json` 與 `c127-cards.json` 逐張比。

---

## 一、c-128｜台灣獨立第三批（45 張）

**接 c-126／c-127 那條線的第三批。** 掛名寫法、獨立閘、廠牌清單**全部照 c-127 的簡報**。

### a 組 23 張：**c-127 額度外的存貨**
`batch-progress/c127/rulings.md` 的 **F 類 26 張**已釘好 MBID、過完獨立閘、只差額度。
**照抄過來，但每張仍要打一次 `release-group/<id>?inc=artist-credits` 覆核掛名與盤名**
（照抄別人的 MBID 而不覆核是第 256／258 條那個形狀），並打 `release` 端點補載體、國別、軌數。
26 張裡挑 23 張，挑剩的留 F 類。

### b 組 22 張：**獨立廠牌目錄第二輪**
c-127 的 b 組回報「**另有三十餘張只差回問 `release` 端點的候選**」——先把那批做完。
不夠再挖新的。**⚠ 三家廠牌 MB 完全查無**（都市方言、目宿媒體、有梗音樂），
**要挖只能走 Apple 台灣店面或 Discogs，身分仍以 MB 為準**；
查不到 MB 實體的**不要硬收**，列進未收清單當 §1 候選。

### ⚠ a 組那條「目錄深度」線已經見底
c-127 實測 25 位骨幹的 MB 目錄只剩 1 張可補。**a 組不要再去翻那 25 位的目錄**，
就從 F 類存貨出。

---

## 二、c-129｜緬甸與東南亞體制線（45 張）

### ⚠ 開工前先知道：**緬甸單獨撐不起一批**

主線 2026-09-14 實測 MB，**20 個緬甸掛名與關鍵字只回 3 筆**：
`Mun Awng`（240565ca）、`Myanmar 1990s Music`（7b90e5c5）、`Big Bag`（03f325d4）。
Sai Htee Saing、Zaw Win Htut、Khin Maung Toe、Htoo Eain Thin、Lay Phyu、Iron Cross（緬甸那支）
**全域零筆**。**這不是查法問題，是 MB 沒建檔。**

所以這批是**以緬甸為核心擴成的東南亞體制線**。收錄判準與 c-123～c-125 相同：
**產製條件**（軍政府、審查、國營壟斷、藝人流亡或被禁），不是曲風。

| 組 | 場景 | 張 |
|---|---|---:|
| a | **緬甸與寮國：軍政府時期** | 23 |
| b | **印尼蘇哈托時期與泰國軍政府時期** | 22 |

### a 組
**緬甸能收多少收多少**（預期個位數），其餘從**寮國**補
（Molam、皇家寮國時期到 1975 後的錄音、流亡社群的再發）。
**再發廠牌是這條線的主要入口**：Sublime Frequencies、Akuphone、Finders Keepers、
Sham Palace、Dust-to-Digital、Honest Jon's、Discrepant。
**合輯會很多**——走 §5.6，要 `exceptionReason` ＋兩個 HTTPS 舉證。
⚠ **`Myanmar 1990s Music` 那筆要先確認是 artist 還是被建成 artist 的合輯專案**，
是後者就走 §5.6 而不是當掛名。

### b 組
- **印尼蘇哈托時期（1966–1998）**：Koes Plus、Panbers、AKA、Dara Puspita、
  Guruh Gipsy、God Bless、Benyamin S.、Titiek Puspa、印尼 funk 與 psych。
  ⚠ **c-SEA 與 c-52 已收過印尼**（God Bless／Guruh Gipsy／Krakatau／Asin 等），
  **實掃卡池先確認哪些已在池中**。
- **泰國軍政府時期**：molam 與 luk thung 的樂隊化世代、1970s 泰式 funk、
  Caravan 與 songs-for-life 運動（1976 法政大學事件後被禁的那一批）。
  ⚠ **`คาราบาว` 那張 09-01 已上架（c-SEA）**，不要重收。

### ⚠ 這條線的特有坑
1. **政治與宗教中立**：這批橫跨三個軍政府。**可以寫發行事實、曲目、長度、廠牌、編號、掛名；
   不得寫政治評價，不得把流亡、被禁鋪成敘事。** 照 c-123～c-125 的做法。
2. **泰文與緬文掛名**：有漢字以外的原文時**原文優先**，拉丁轉寫進 `queryAlias`；
   同一位常有三種以上轉寫，**逐位記在 `risk` 裡**。
3. **年份**：這一區大量是 2000 年後的考古再發，**`year` 取原盤年**，
   取不到就取 release-group 的 first-release-date 並在 `risk` 講明。

---

## 三、c-130｜波蘭（45 張）

**主線 2026-09-14 實掃：搖滾與龐克那一側 10/10 零命中**
（Maanam、Republika、Budka Suflera、Perfect、Kult、Dezerter、Brygada Kryzys、
Siekiera、Aya RL、Klaus Mitffoch 全空）。**爵士那一側已收**
（Krzysztof Komeda、Tomasz Stańko、Zbigniew Namysłowski 在池中），**不要重做爵士**。

| 組 | 場景 | 張 |
|---|---|---:|
| a | **波蘭人民共和國：搖滾與 sung poetry** | 23 |
| b | **波蘭 1980 年代龐克與新浪潮** | 22 |

### a 組
Czesław Niemen（**池中已有，只補目錄**）、SBB、Breakout、Budka Suflera、Perfect、
Maanam、Republika、Lady Pank、Krzysztof Klenczon、Skaldowie、Czerwone Gitary、
Niebiesko-Czarni、Marek Grechuta、Ewa Demarczyk、Anna German、
Piwnica pod Baranami 那條 sung poetry 線。

### b 組
Dezerter、Brygada Kryzys、Siekiera、Aya RL、Klaus Mitffoch、Kult、Armia、
Tilt、Deuter、Moskwa、TSA、Kombi、Lombard、Oddział Zamknięty、
Jarocin 音樂節那一批。

### ⚠ 這條線的特有坑
1. **廠牌基建與 c-123 幾乎相同**：國營 **Polskie Nagrania „Muza"** 壟斷，
   另有 Tonpress、Pronit、Wifon、Polton、Klub Płytowy Razem。
   **c-123 的七條裁定可直接沿用**（`batch-progress/c123/rulings.md`）。
2. **波蘭文的變音字母** ą ć ę ł ń ó ś ź ż **一個都不能省**——
   `Czesław` 不是 `Czeslaw`、`Oddział` 不是 `Oddzial`。
   `chk-prop` 的 NFKC 正規化摺不掉這些，工具不會幫你抓。
3. **⚠ 同名撞擊極高**：`Perfect`、`Kult`、`Armia`、`Tilt`、`Deuter`、`Moskwa`、`East`
   這些在 MB 全域各有十幾到上百個同名實體。**一律靠 `area=PL` ＋ `life-span.begin`
   ＋ `disambiguation` 定位，`score` 不採**（第 250 條）。
4. **`secondary-types` 含 `Live` 要收**——Jarocin 那批的現場盤是這條線的核心物證。
5. **年份**：1989 前後的再發很多，**`year` 取原盤年**。
