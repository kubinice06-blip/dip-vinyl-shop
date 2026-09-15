# 策展簡報：c-131｜爵士深度第一批（45 張）

**店主 2026-09-15：「廣度應該足了 研究深度 再深挖爵士 還有好多都沒有建檔 秋吉敏子竟然都沒有」。**

從這批起是**深掘線**（`lineType: 深掘`），不是廣度線。**判準換了**：
廣度線問「這個場景池中有沒有」，深掘線問「**這位已經在池中的名家，目錄補齊了沒**」。

## 〇、固定規格與共通五條

固定規格照 `CURATION-BRIEF-c127.md` → `c126` → `c103plus` → `c93plus`，一字不改。
**共通五條照 `CURATION-BRIEF-c128-c130.md` 第〇節**（release 端點、子字串比對的假陽性、
短掛名回問、Live 收／Compilation 走 §5.6／EP 不收、`mbNote` 第一個 UUID）。

**這批沒有 §1.5 獨立閘**（那是 2010 後中文圈專用），廠牌不需要裁定，照實記進 `label` 欄。

## 一、⚠ 店主點名的那一位：秋吉敏子

主線 2026-09-15 實掃卡池：**她自己名下零張**。池中唯一一筆是
`Toshiko Akiyoshi-Lew Tabackin Big Band`（英文字串，1 張）——那是 1973 年後的大樂團，
**她 1953 年起的 trio／quartet／solo 二十年目錄一張都沒有**。

MB 上她的實體至少有五個：個人（Person）、`Toshiko Akiyoshi Trio`、`Toshiko Akiyoshi Quartet`
（JP）、`Toshiko Akiyoshi Quintet`、`Toshiko Akiyoshi–Lew Tabackin Big Band`（US，1973）。
**⚠ 掛名要先定**：
- **漢字兩寫**：`秋吉敏子` 與 **`穐吉敏子`**（她本人與日本盤常用「穐」）。
  依 2026-08-11 東亞藝人名裁定（有漢字照漢字），**主名取哪一個要看她日本盤實體的印法**，
  另一個進 `queryAlias`，**兩個都要進去重表**。
- **池中那張大樂團用的是英文字串**——那是既有寫法，**照第 307 條反查同字串不同人**後決定：
  大樂團的卡維持原字串不動；她個人與 trio 的卡另立掛名。**不要把 trio 的碟塞進大樂團那個字串。**
- **trio／quartet／quintet 這些 MB 群組實體的碟，掛名照池中先例**——
  池中 `鈴木勲トリオ`、`山下洋輔トリオ`、`峰厚介クインテット` 都是**漢字＋片假名編制**，
  所以 `Toshiko Akiyoshi Trio` 的碟掛 `秋吉敏子トリオ`（或穐吉），不掛英文。

## 二、分組與名額

| 組 | 內容 | 張 |
|---|---|---:|
| **a** | **秋吉敏子全目錄 ＋ 日本爵士 1950–60 年代第一世代** | 23 |
| **b** | **池中已有的爵士名家，目錄深度** | 22 |

### a 組
1. **秋吉敏子優先，能收多少收多少**——1953《Toshiko's Piano》起，Norgran／Verve 時期、
   Candid 的 Toshiko Mariano Quartet、1960 年代日本盤、1970 年代 RCA／Victor 的 trio 與 solo。
   **大樂團的碟不收**（那是池中既有那個字串的事，且已有一張），**Kogun／Long Yellow Road 除外**——
   那兩張若 MB 掛的是大樂團就歸大樂團、掛個人就收。
2. **其餘從日本爵士第一世代補**，主線實掃卡池**零張**的有：
   **本田竹広、白木秀雄、宮沢昭、ジョージ大塚、鈴木宏昌、高橋達也、石川晶、猪俣猛、原信夫**。
   另外 `稲垣次郎` 池中只有 `Jiro Inagaki and Soul Media`（英文字串）、
   `松本英彦` 只有 `Hidehiko Matsumoto`（英文字串）——**這兩位的日文掛名要照第 307 條處理**。
3. **⚠ 掛名一律照 2026-08-11 裁定**：有漢字照漢字（`本田竹広` 不是 `Takehiro Honda`），
   全假名的才羅馬化。**池中已有英文字串的（Hidehiko Matsumoto、Jiro Inagaki…）
   是既有分裂，這批新收的碟用漢字，並在 `risk` 標明池中有英文字串待本機統一。**

### b 組：**目錄深度**
**先做一份實掃表再挑**：把池中 `jazz` 標籤（3,152 張）按掛名折疊，
列出「**池中只有 1–3 張、但 MB 純 Album 目錄 ≥ 15 張**」的名家，
**從最經典的那幾張補**。方向（主線抽測，待你實掃）：
Blue Note／Prestige／Impulse!／Riverside／Contemporary 那些**在池中只有招牌作**的人——
Hank Mobley、Lee Morgan、Jackie McLean、Horace Silver、Art Blakey、Dexter Gordon、
Sonny Clark、Grant Green、Andrew Hill、Bobby Hutcherson、Joe Henderson、Wayne Shorter、
McCoy Tyner、Ahmad Jamal、Bill Evans、Stan Getz、Chet Baker、Charles Mingus、Sun Ra、
Cecil Taylor、Albert Ayler、Archie Shepp、Pharoah Sanders、Don Cherry、Ornette Coleman。
**實掃之後照「池中張數／MB 目錄張數」的比例排序，比例最低的先補。**

⚠ **b 組的坑**：這些人目錄裡**合輯、精選、Live 極多**。
`secondary-types` 含 `Compilation` 的走 §5.6 或不收；**含 `Live` 的收但要標**；
**同一場錄音被拆成兩三張發行**（Blue Note 的 Vol. 1／Vol. 2）各算一張，但 `risk` 要互相指向。

## 三、坑

1. **爵士的掛名撞擊是另一種形狀**：不是同名團，是**同一位以不同編制掛名**
   （`Bill Evans Trio`／`Bill Evans`、`Art Blakey & The Jazz Messengers`／`Art Blakey and…`）。
   池中兩種都有（`audits/pool-artist-name-splits.md` 記了 `&`／`and` 六組）。
   **新收的碟一律用池中多數寫法**，`risk` 標明另一寫法。
2. **年份**：爵士的錄音年與發行年常差好幾年（Blue Note 的 vault 發行差十幾年是常態）。
   **`year` 取首次發行年**（release-group 的 first-release-date），錄音年寫進 `risk`。
3. **日本盤的「原盤」與「日本首發」**：秋吉的很多碟是日本 Victor／Toshiba 首發、美國後發或不發。
   **`year` 取全球首發**，並在 `risk` 記國別。

## 四、交件

`batch-progress/c131/prop-{a,b}.json`，欄位照 `batch-progress/c127/prop-a.json`（含 `g`）。
交件前跑 `node batch-progress/c131/chk-prop.mjs`，標記清成 0。
**⚠ `chk-prop` 現在會掃全部 93 批（含 c-SEA 與帶字母尾碼的子批）**，但**仍抓不到
c-126～c-130 那 225 張**（本機還沒上架）——與你相關的只有 c-121（日本地下即興），
讀 `desc-tools/batches/cards/c121-cards.json` 自己比。

裁定寫進 `batch-progress/c131/rulings.md`，**a 組 350 起、b 組 360 起，用 append**。
**臨時腳本與中間檔一律放 `scratchpad/c131<組>/`，檔名加前綴，絕不用 `build.mjs`、`cards/` 這種通用名**（第 306 條）。
每做完 5 筆落檔一次；開工先讀、接續補完。MB 守 1 req/s，UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
**不要碰 git、不要動 `PROJECT_MEMORY.md`／`seed_cards.json`／KV／Firestore。**
