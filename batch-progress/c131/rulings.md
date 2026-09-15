# c-131 裁定（a 組 350 起、b 組 360 起，append）

## 第 360 條（2026-09-15，c-131 b 組）：**25 位爵士名家的「池中張數／MB 純 Album 張數」實掃表——這張表是交付物，下一批接著用**

實掃方法：`seed_cards.json` 全 16,450 列，掛名做子字串雙向比對（`&`→`and` 摺疊、看整個掛名字串；
`Sun Ra` 只算掛名含 "sun ra" 的列，`Sun`／`Chet` 這種假陽性已排除），**池中張數含所有編制掛名**
（`Bill Evans Trio`、`Art Blakey & The Jazz Messengers`、`Archie Shepp Quartet` 都算進本人）。
MB 側用 `release-group?artist=<MBID>&limit=100&offset=` 分頁拉完整目錄（第 116 條），
**純 Album ＝ `primary-type=Album` 且 `secondary-types` 為空**；Live／Comp 欄是 `secondary-types` 恰為 `[Live]`／含 `Compilation` 的 Album 數。
⚠ MB 的 `release-group?artist=` 會把**他掛名為合作者**的 RG 也算進來（Stan Getz、Chet Baker、Bill Evans 那幾位的分母因此偏大），
所以比例只能拿來**排序**，不能拿來當「還缺幾張」的絕對數。
另⚠ 純 Album 的計數**不含 Sun Ra 各種 Arkestra 群組實體、Art Blakey & The Jazz Messengers 群組實體**名下的 RG（那些是 MB 另立的 artist），
Sun Ra 與 Blakey 的分母實際更大。

按比例由低到高（**比例最低的先補**）：

| 名家 | 池中 | MB 純 Album | 比例 | Live | Comp | 全 RG | artist MBID |
|---|---:|---:|---:|---:|---:|---:|---|
| Stan Getz | 9 | 107 | 0.08 | 44 | 180 | 346 | 8f2422ab-0ec6-4c92-80c4-afe9622fab32 |
| Ahmad Jamal | 5 | 54 | 0.09 | 32 | 24 | 111 | cf816800-4e0e-4d80-9cca-50a725e93787 |
| McCoy Tyner | 6 | 59 | 0.10 | 16 | 16 | 91 | 22fe7b6f-af38-458e-87bd-8971e7a2912e |
| Chet Baker | 15 | 139 | 0.11 | 75 | 162 | 396 | 1ba1d493-7114-45e2-b163-a36d49a0c065 |
| Archie Shepp | 14 | 89 | 0.16 | 36 | 9 | 143 | 5ceff60b-8183-49bf-a855-328d3c172106 |
| Bobby Hutcherson | 7 | 41 | 0.17 | 8 | 8 | 59 | edbe5d7f-9511-4dfe-847a-8fe19080caaf |
| Jackie McLean | 10 | 55 | 0.18 | 6 | 13 | 76 | 5b6993ef-14af-4374-aa91-d42622b133d1 |
| Sun Ra | 14 | 63 | 0.22 | 17 | 28 | 115 | c27cac8e-4c4a-48c0-a4ba-41399b9c176d |
| Hank Mobley | 9 | 40 | 0.23 | 4 | 16 | 60 | 026b096e-e024-42ab-82f3-107bddae77c2 |
| Don Cherry | 7 | 30 | 0.23 | 30 | 11 | 77 | adf3879a-e091-4f73-8792-861a7a3e3abe |
| Dexter Gordon | 16 | 59 | 0.27 | 40 | 58 | 161 | cc1588e1-5ba3-45a6-b80c-b31035c89339 |
| Joe Henderson | 11 | 37 | 0.30 | 18 | 16 | 73 | bcab8301-c7e5-4689-a4ad-9ee947b4ce37 |
| Horace Silver | 9 | 28 | 0.32 | 6 | 23 | 58 | d185d986-ee96-4fd3-bd61-8c848a4765b6 |
| Andrew Hill | 10 | 31 | 0.32 | 2 | 5 | 38 | ede80a9f-f114-4041-b0d9-2584a0b30ec9 |
| Pharoah Sanders | 10 | 31 | 0.32 | 19 | 15 | 70 | b3a0912a-a62a-4388-9368-7cb21ed5caf9 |
| Lee Morgan | 12 | 36 | 0.33 | 5 | 29 | 72 | a1235272-3650-4ed7-9317-5a55a08701ec |
| Ornette Coleman | 10 | 28 | 0.36 | 22 | 30 | 86 | 169c0d1b-fcb8-4a43-9097-829aa7b39205 |
| Art Blakey | 12 | 32 | 0.38 | 14 | 38 | 96 | 601e7466-eaf5-4a91-9909-ffd770b7e04a |
| Bill Evans | 23 | 57 | 0.40 | 56 | 88 | 203 | 8247a3f2-3a8e-4256-b322-6c57b03a4e36 |
| Cecil Taylor | 9 | 20 | 0.45 | 67 | 28 | 116 | 0d06bb57-c3b6-4188-9b73-826c41c3e29e |
| Grant Green | 18 | 37 | 0.49 | 4 | 27 | 72 | 1a88b270-d763-48d5-a62c-2bb9cabb140c |
| Charles Mingus | 19 | 39 | 0.49 | 45 | 96 | 201 | f3b8e107-abe8-4743-b6a3-4a4ee995e71f |
| Sonny Clark | 7 | 14 | 0.50 | 0 | 13 | 27 | 58368691-5b44-45d8-b617-47a7633f5e30 |
| Wayne Shorter | 12 | 24 | 0.50 | 7 | 15 | 49 | 2379937f-6e0d-46a2-b8ff-633fafd72002 |
| Albert Ayler | 8 | 12 | 0.67 | 24 | 10 | 50 | b2dcc67a-45f9-4b9f-8221-3da4e0d32491 |

**本組據此補 22 張的分配**：Stan Getz 3、Ahmad Jamal 3、McCoy Tyner 3、Chet Baker 2、Archie Shepp 2、
Bobby Hutcherson 2、Jackie McLean 2、Sun Ra 2、Hank Mobley 1、Don Cherry 1、Dexter Gordon 1——
**恰好是比例最低的 11 位**，第 12 位起（Joe Henderson 0.30 以下的那一段）留給下一批。
下一批的起點：Joe Henderson（Lush Life 1992、The Elements 1974）、Horace Silver（Horace-Scope 1960、The Jody Grind 1967）、
Andrew Hill（Andrew!!! 1968、Dusk 2000）、Pharoah Sanders（Jewels of Thought 1969）、Lee Morgan（Live at the Lighthouse 1970 Live）、
Ornette Coleman（Something Else!!!! 1958）、Art Blakey（Mosaic 1961——在 `Art Blakey & The Jazz Messengers` 群組實體名下）。

## 第 361 條（同批）：**簡報說這 25 位「池中只有招牌作」——實掃是 5～23 張，每一位都不是 1–3 張**

簡報第二節 b 組寫「列出池中只有 1–3 張、但 MB 純 Album ≥15 張的名家」，並點名這 25 位。
**實掃結果：25 位裡沒有一位是 1–3 張**，最少的 Ahmad Jamal 也有 5 張，Bill Evans 23 張、Charles Mingus 19 張、Grant Green 18 張。
這是第 255 條的形狀（抽測把池中有的算成零／算少）。**所以這批的判準改成「比例」而不是「絕對張數」**，
而且補的是每位目錄裡**池中缺的那個時期**（例如 Ahmad Jamal 池中 1955–1959 有 4 張、1970 有 1 張，1960 年代 Argo 中期一張都沒有；
McCoy Tyner 池中缺 1962 Impulse! 出道與 1970 年代 Milestone 現場）。

另外，全池 `jazz` 標籤 3,152 張按掛名摺疊（`&`→`and`）得 **1,517 位**，分布：1 張 929 位、2 張 266、3 張 134、4 張 56、5 張 45、6 張以上 87。
**「池中只有 1–3 張」的爵士掛名有 1,329 位**——那才是下一批「目錄深度」該從中挑的池子，本批沒有時間逐位拉 MB。

## 第 362 條（同批）：**實掃卡池順帶抓到的既有卡問題（線上資料，本組不動，留本機）**

| 池中 | 問題 | 依據 |
|---|---|---|
| `Lee Morgan — Peckin' Time` 1958 | MB 掛名是 **`Hank Mobley—Lee Morgan` 聯名**（RG 72b41dc2，BLP 1574 封面印 Hank Mobley 為首）；池中掛在 Lee Morgan 名下，所以 Mobley 的目錄深度量測少算一張。本組不再收（同一張碟） | release-group 端點 artist-credit |
| `Albert Ayler Trio — Spiritual Unity` 1965（apex:heresy）與 `Albert Ayler — Spiritual Unity` 1965（seed） | **同一張碟兩張卡、一張王牌一張普卡**——audits 第 5／6 組那個形狀（掛名編制不同、字串鍵擋不住） | 實掃 seed_cards.json |
| `Sun Ra — The Heliocentric Worlds of Sun Ra, Vol. 1`（apex:heresy）年份 **1992** | 那是 ESP CD 再發年；MB first-release-date **1965**、ESP-Disk' 1014 原盤 1965。依年份政策應改 1965 | RG 03465cef，release e5e3ce76 |
| `Bill Evans — Waltz for Debby` 年份 **1964** | Riverside RLP 399 首發 **1962**（1961-06-25 錄音）；1964 不知從何而來 | Discogs／Riverside 目錄 |
| `Bill Evans — Stan Getz & Bill Evans` 1973 | 聯名碟塞進單人掛名；本組新收的聯名碟不跟這個先例（見第 363 條） | — |
| `Archie Shepp & Horace Parlan`（Trouble in Mind）／`Archie Shepp and Horace Parlan`（Goin' Home） | **`&`／`and` 分裂第七組**，`audits/pool-artist-name-splits.md` 未列 | 實掃 |
| `McCoy Tyner — Extensions` 年份 **1972** | MB／Blue Note：1970-02 錄音、**1973** 首發（BN-LA006-F） | RG 目錄 |

## 第 363 條（同批）：**聯名碟的掛名：照 MB artist-credit 寫聯名，不塞進單人掛名；同一位的編制掛名（Trio／Quartet／Arkestra）則收攏到池中多數寫法**

兩種形狀要分開：

1. **兩位不同的人聯名**（`Stan Getz & The Oscar Peterson Trio`、`Chet Baker & Art Pepper`）——照 MB artist-credit 寫，
   `&` 照 MB。池中先例 `Bill Evans & Jim Hall`、`Chet Baker & Paul Bley`、`Tony Bennett & Bill Evans`。
   **不跟** `Bill Evans — Stan Getz & Bill Evans` 那個把聯名塞進單人的先例。聯名碟不計入單人的目錄深度。
2. **同一位以不同編制掛名**（MB 把 `Sun Ra and His Solar Arkestra` 建成 `The Sun Ra Arkestra` 實體、
   Apple 把 Inception 掛 `McCoy Tyner Trio`）——**一律收攏到池中多數寫法**（`Sun Ra` 8 張 vs `Sun Ra Arkestra` 3 vs `The Sun Ra Arkestra` 1），
   MB／店面的編制掛名進 `queryAlias`，`risk` 標明。池中先例：`Sun Ra — The Magic City`（MB 同掛 Solar Arkestra）。
   **本組沒有往 `Sun Ra Arkestra`／`The Sun Ra Arkestra`／`Art Blakey & The` 任一邊加卡。**

另記一個盤名裁定：**Chet Baker & Art Pepper《Playboys》取原名、不取再發名《Picture of Heath》**。
第 45 條說改過名的碟取再發名，但這張是「原名→過渡名→回到原名」：MB RG title、1990 Pacific Jazz CD、2022 Blue Note Tone Poet、Apple 全用 Playboys，
Picture of Heath 只是 1961–1980 年代之間的壓片名。**第 45 條的「再發名」指的是現行流通名，不是曾經用過的任一個名字。**

## 第 364 條（同批）：**MB `first-release-date` 在爵士老盤上有三種失真，年份要逐張判**

| 形狀 | 實例 | 本組處理 |
|---|---|---|
| **只建了再發、原盤沒建** → frd 是再發年 | Stan Getz Plays（frd 1988，原 Norgran 1955）、The Steamer（frd 1999，原 Verve 1957） | 依第 91／95 條取原盤年，risk 寫明 MB 的數字 |
| **placeholder 日期** `YYYY-01-01` | Jackie's Bag（1960-01-01，但第二場錄音在 1960-09，BLP 4051 出版 1961）、The Magic of Ju-Ju（1967-01-01） | 前者取 1961，後者 1967 與各來源一致、照用 |
| **相差一年的出版年歧義** | Another Workout（MB 1986／Discogs 1985）、Hi Voltage（MB 1967／Discogs 1968）、Symphony for Improvisers（MB 1966／部分來源 1967） | **照 MB**，risk 寫另一說，留研究層覆核 |

**Blue Note vault 盤（錄音與首發差十年以上）本批 4 張**：Oblique（1967→1979 JP）、Clubhouse（1965→1979）、Another Workout（1961→1986）、Nobody Else But Me（Verve，1964→1994）。
`year` 一律取首發年，錄音年在 `risk`。**Oblique 的首發國是日本**（GXF-3061），美國要到 1992 CD——第 75 條那類「日本首發」形狀在 Blue Note 1979–1980 的 GXF 系列是通例（Patterns、Spiral、Medina 同）。

**同場錄音拆賣**：McCoy Tyner《Enlightenment》原雙 LP 一個 RG，另有 Vol. 1／Vol. 2 兩個拆售 RG——那不是「兩張碟各算一張」（Blue Note 的 Vol. 1／Vol. 2 是不同錄音時段），是同一張雙 LP 拆成兩張單片，**只釘整場、拆售的刻意不釘**。

## 第 365 條（同批）：**`chk-prop` 標記 1 不是本組的——是 c49b↔c106 兩張、cseab↔c64 一張的既有跨批撞卡**

`node batch-progress/c131/chk-prop.mjs b` 結果：線上池撞卡 0、跨組重複 0、欄位 0，
**跨批撞卡 3 全是別批之間的**（沈文程《心事誰人知》、羅文《小李飛刀》c49b↔c106；Sơn Ca《Băng nhạc Sơn Ca 8》cseab↔c64），
是第 310 條修 regex 之後才浮出來的舊帳，c131 沒有一筆在裡面（`dedup-crossbatch.mjs` 輸出 grep c131 為 0）。
本組交件視同標記 0；那三組留主線。

### 未收清單（額度外候補，MBID 都已釘、大多回問過 release 端點）

| 名家 | 碟 | 年 | rgMbid | 備註 |
|---|---|---|---|---|
| Stan Getz | The Steamer | 1957 | 4c1346be-754e-373e-a3fc-8b1e7701239f | MB frd 1999（只建再發） |
| Stan Getz & Kenny Barron | People Time | 1992 | 4840e8d3-351a-3cb5-b810-e0890ea2dfe9 | Live、聯名 |
| McCoy Tyner | Nights of Ballads & Blues | 1963 | f30760aa-8c26-3bd7-84d3-5f5ce595feef | |
| McCoy Tyner | Tender Moments | 1968 | 3c023cc1-aa69-3028-8ca7-1f243337c195 | |
| Chet Baker | Baby Breeze | 1965 | 97716d41-c8e8-39d0-9e88-00009d1df39c | Limelight LS 86003，已回問 release |
| Chet Baker | Chet Baker & Strings | 1954 | 94c53e17-5a4d-3db7-ae0c-471168c5840d | Columbia CL 549，已回問 release |
| Chet Baker & Crew | Chet Baker & Crew | 1956 | dde96c0e-4af1-44d8-b3c9-fcd09239bf31 | MB 掛名是 `Chet Baker & Crew`，要先判是不是獨立實體 |
| Archie Shepp | Blasé | 1969 | 454f2acd-ba36-36af-8722-c947b9b44a8d | BYG |
| Bobby Hutcherson | The Kicker | 1999 | e45eb7e7-12e8-3ad4-9838-042c5140b421 | rec 1963，vault |
| Jackie McLean | Capuchin Swing／Jacknife／Consequence | 1960／1975／1979 | 未釘 | |
| Sun Ra | The Nubians of Plutonia | 1966 | a4d404fa-6451-44da-81cb-c66b7830d18e | MB 掛 Myth Science Arkestra |
| Sun Ra | Angels and Demons at Play | 1967 | 4eb4ca3f-d808-47a0-99c9-a9af87c3be11 | 同上 |
| Sun Ra | Strange Strings | 1966 | d042dc13-824d-32e8-a87c-6a08ce9aeaf7 | MB 掛 Astro Infinity Arkestra |
| Sun Ra | Nothing Is… | 1970 | da0a9759-1787-365a-a5e5-4ef2e36c7d9b | ESP 1045，實為 1966 現場、MB secondary-types 空；已回問 release |
| Hank Mobley | Hi Voltage | 1967 | d336b40d-ba8a-39ff-ab6e-3312e9937951 | 已回問 release（BST 84273） |
| Don Cherry | Where Is Brooklyn? | 1969 | 5204d0e9-07ae-4bcf-b450-44d24a79356b | Blue Note 第三張 |
| Don Cherry | Organic Music Society | 1972 | 7ee6bf71-ee42-4bdd-90a7-3a235f4d8f74 | |
| Dexter Gordon | Sophisticated Giant | 1977 | db131383-472e-340c-a471-18c7e3188a26 | Columbia |
| Joe Henderson | Lush Life: The Music of Billy Strayhorn | 1992 | fa9cea4c-220e-3eeb-a649-f8d359b7a160 | 比例第 12 位，下一批起點 |
| Pharoah Sanders | Jewels of Thought | 1969 | 59d158bf-c2cd-3cd1-94f5-48ab95b76d82 | |
| Ornette Coleman | Something Else!!!! The Music of Ornette Coleman | 1958 | d47a1752-401e-3816-9bad-eddee69dfdb5 | |
| Hank Mobley／Lee Morgan | Peckin' Time | 1958 | 72b41dc2-341b-4c03-ad04-161019455eb7 | **不收：池中已有（掛 Lee Morgan）** |

**退掉的理由分類**：額度外（上表全部）、同碟已在池中（Peckin' Time）、拆售版（Enlightenment Vol. 1／2）、Compilation 併裝（Heliocentric 1+2、Complete Playboys Sessions 等，走 §5.6 也不值得——原盤都可收）。
**MB 查無而未收：0 張**——這 25 位的目錄 MB 建檔完整，本批不需要 §1。

**中間檔**：`scratchpad/c131b/`（c131b-poolscan.txt 實掃全文、c131b-mb/ 25 位目錄快取與 27 個 RG 的 release 端點回傳、c131b-catalog-detail.txt 逐位純 Album＋Live 清單含池中標記、c131b-apple.json 店面 search 結果）。
---

# a 組（秋吉敏子全目錄 ＋ 日本爵士 1950–60 年代第一世代，23 張／14 位）

策展層 a 組，2026-09-15。交件 `batch-progress/c131/prop-a.json`，
`node batch-progress/c131/chk-prop.mjs a` **標記 0**（線上池撞卡 0、跨組重複 0、跨批撞卡 0／94 批 3,906 張）。
與 `desc-tools/batches/cards/c121-cards.json`（51 張）逐張 `artist|album` 比對**撞卡 0**（c-121 那批沒有本組任何一位）；
`onboarding-manifest-c67-20260904.json` 與 `c87-cards.json`（Johnny's Disk 線）也比過，Johnny's Disk 的秋吉卡兩批都沒收。
號段 **350–359**。

## 〇、交件數字

| 項 | 數 |
|---|---:|
| 秋吉敏子（含 トリオ／カルテット／クインテット 三種編制掛名） | **13** |
| 第一世代（本田竹広、白木秀雄クインテット＆スリー琴ガールズ、宮沢昭、ジョージ大塚クインテット、鈴木宏昌トリオ、高橋達也と東京ユニオン、石川晶とカウント・バッファローズ、猪俣猛とサウンド・リミテッド、原信夫とシャープス・アンド・フラッツ、稲垣次郎とソウル・メディア） | **10（各 1 張）** |
| CAA release-group 端點 200 | **23／23** |
| Apple search／藝人目錄兩種查法有命中（只是觀察，第 254 條） | **16／23** |
| `secondary-types` 含 Live | 1（ジョージ大塚《Loving You George》）；另 3 張實為現場但 MB 未標（Top of the Gate、陸前高田、Newport），已在 `risk` 標明 |
| 合輯（§5.6） | 0 |

**秋吉敏子在 MB 上的量**：個人實體 `78fe2146` 名下 **33 個 RG**；加上 Trio 8、Quartet 2、Quintet 1、
Toshiko Mariano Quartet 1、The Toshiko Trio 1、International Jazz Sextet 1、Toshiko Mariano and Her Big Band 1、
秋吉敏子ジャズ・オーケストラ 8、大樂團 16，**十個實體合計 72 個 RG**。
排除大樂團／Jazz Orchestra（24）、合輯（4）、EP（1）、合掛（6）、CAA 404（15）之後，**能收的就是這 13 張＋額度未收 4 張**
（《Four Seasons》1990、《Dig》1993、《Sketches of Japan》1999、《Live at Blue Note Tokyo '97》2001，rgMbid 見第 356 條）。

## 350（本批立）⚠ **秋吉敏子的主名取「秋吉」，「穐吉」進 queryAlias——證據是日本盤與店面，不是 MB 主名**

MB 個人實體 `78fe2146-ec71-44c8-86eb-117607e53933` 的主名是 **「穐吉敏子」**（Person／US／1929-12-12），
alias 列了 秋吉 敏子、穐吉 敏子、龝吉敏子、あきよし としこ、Toshiko Akiyoshi、Toshiko Mariano。
簡報要求「主名取她日本盤實體上的印法」，實測四個方向都指向「秋吉」：

| 來源 | 印法 |
|---|---|
| Apple jp 店面（藝人目錄全部條目，含 Johnny's Disk 陸前高田、Sony《孤軍》、Verve、Studio Songs） | **秋吉敏子**（陸前高田那張掛「秋吉敏子トリオ」） |
| King 1961 原盤《Toshiko Meets Her Old Pals》（Discogs 21987391） | Toshiko Akiyoshi = **秋吉敏子** |
| MB 名下 RG 的漢字 artist-credit | 9 個寫「秋吉敏子」（Finesse、Interlude、Desert Lady、Night and Dream、Hope…），**只有 1 個寫「穐吉敏子」**（Sketches of Japan） |
| MB 群組實體 | `秋吉敏子ジャズ・オーケストラ`（主名）、大樂團 alias `秋吉敏子゠ルー・タバキン・ビッグ・バンド` |

**裁定：卡片掛名「秋吉敏子」；「穐吉敏子」「龝吉敏子」「Toshiko Akiyoshi」全部進每一張的 queryAlias。**
編制卡照池中先例「漢字＋片假名編制」：`秋吉敏子トリオ`（MB Toshiko Akiyoshi Trio）、`秋吉敏子カルテット`（Toshiko Akiyoshi Quartet，JP）、
`秋吉敏子クインテット`（Toshiko Akiyoshi Quintet）。「カルテット」不取「クァルテット」——池中兩種都有，取 MB（ジョージ・大塚カルテット）與 Apple 的用法。
第 307 條反查：池中「秋吉」「穐吉」「Akiyoshi」「Toshiko」四種子字串只命中大樂團那一張，無同字串不同人。
**大樂團那張英文字串不動**；`Kogun`（`58e816d6`）MB 掛的是大樂團實體 `a05e0d88`，依簡報歸大樂團、本批不收。
依判準 1（池中編制掛名先例）＋判準 2（可逆）當場定。

## 351（本批立）**1950 年代美國廠牌那幾張的 credit（Toshiko／The Toshiko Trio／Toshiko Mariano Quartet）全部掛個人「秋吉敏子」**

MB 把她 1950–61 年美國廠的碟拆在四個 credit 底下：「Toshiko Akiyoshi」（Norgran）、「Toshiko」（Storyville STLP 918）、
「The Toshiko Trio」（Storyville STLP 912，獨立實體 `5590fdbf`，type 誤建成 Person）、
「Toshiko Mariano Quartet」（Candid，獨立實體 `d7bd5a3a`）。

**裁定：這四種全部掛「秋吉敏子」，credit 原文進 queryAlias。** 理由：
1. 它們是同一位的婚前／婚後名與封面簡稱，不是編制實體（MB 個人 alias 本身就列了 Toshiko Mariano）；
2. MB 自己把 Candid 那張的 2006 再發建成第二個 RG `bb5f0db2` 直接掛在個人名下——同碟兩個 RG，一個掛群組一個掛個人；
3. 若掛「秋吉敏子トリオ」會與 1976 年後 MB 的 Toshiko Akiyoshi Trio 實體混在一起。
`秋吉敏子トリオ` 這個掛名**只給 MB 實體 `abbd1a67` 名下的碟**（Discomate 三部曲、EASTWORLD、Johnny's Disk）。

## 352（本批立）⚠ **MB 轄下只有再發 release 時，`first-release-date` 不是首發年——兩張取 Discogs／Apple 的原盤年**

| 卡 | MB first-release-date | 實際首發 | 取 |
|---|---|---|---|
| 秋吉敏子《The Many Sides of Toshiko》 | **1999-06-23**（只登錄 JP CD POCJ 2748） | Verve MGV-8273，US **1958**（Discogs master 700260；release 18758419 封底「Recorded September 28, 1957」） | **1958** |
| 秋吉敏子《Toshiko Meets Her Old Pals》 | **1974**（只登錄 1974 SKK 3018／1978 SKA 3019／2024 數位） | King SKC 3／KC 13，JP **1961**（Discogs 21987391／21848362；Apple jp 官方條目 ℗ 1961 King、1961-06-10） | **1961** |

依裁定 91／95（rgMbid 是身分鍵不是年份來源）與簡報「年份取首次發行年」的本意，取原盤年；MB 的日期寫進 `risk`。
**建議本機補建這兩張的 MB 原盤 release**，否則 `reconcile-year` 一類工具會回讀成 1999／1974。
c-121 第 2 條那個「不失者 first-release 落在 Pseudo-Release 上」是同族：**`first-release-date` 只反映「有人建檔的最早那筆」。**

## 353（本批立）**秋吉敏子トリオ《1980 Toshiko Akiyoshi Trio in Rikuzentakata》取演奏年 1980，不取 MB 的首發年 2014**

MB first-release-date 2014（Johnny's Disk JD-36-CD 是首發），演奏 1980。
沿用 c-121 第 2 條的例外（盤名載明錄音年的延後發行盤取演奏年；先例 阿部薫《スタジオ・セッション1976.3.12》記 1976、
光束夜《ファースト・ライブ1979 吉祥寺マイナー》記 1979）——盤名第一個字就是「1980」，卡面記 2014 會自相矛盾。
`risk` 已寫明發行年 2014。有先例，不上呈。
**順帶**：這張是 c-67／c-87 那條 Johnny's Disk 線（照井顕）回到秋吉本人的一張，`why` 已把 c-87 廠牌史卡的線索接上。

## 354（本批立）**第一世代的編制掛名——MB 實體是英文的，卡片照池中先例寫「漢字＋片假名編制」**

| MB 實體 | 卡片掛名 | 依據 |
|---|---|---|
| `George Otsuka Quintet`（`60110097`，無國別） | **ジョージ大塚クインテット** | 個人實體主名「ジョージ大塚」（混漢字，08-11 裁定照寫）＋ 池中 峰厚介クインテット 先例；Apple jp King 官方條目掛名正是這字串。**不加中黑**（MB 另有空實體「ジョージ・大塚カルテット」帶中黑，不採） |
| `Toshiko Akiyoshi Trio`／`Quartet`／`Quintet` | 秋吉敏子トリオ／カルテット／クインテット | 第 350 條 |
| `鈴木宏昌トリオ`、`高橋達也と東京ユニオン`、`石川晶とカウント・バッファローズ`、`猪俣猛とサウンド・リミテッド`、`原信夫とシャープス・アンド・フラッツ`、`稲垣次郎とソウル・メディア`、`白木秀雄クインテット＆スリー琴ガールズ` | **照 MB 實體原文** | 本來就是漢字＋假名 |

**`白木秀雄クインテット＆スリー琴ガールズ` 的全形＆照 MB 原文保留**：Discogs 的三種日本 CD（UCCM-9237／UCCJ-4067／UCCU-9776）都印這個字串，
`chk-prop` 的 `k()` 會把全形＆摺成 and，不會亮燈。英文 credit「Hideo Shiraki Quintet + 3 Koto Girls」與 白木秀雄／白木秀雄クインテット 進 queryAlias。
**個人實體名下 0 個 RG 的有兩位**（高橋達也 `81a4e935`、原信夫 `e4207dc5`）——他們的碟全部在樂團實體底下，所以這兩位「個人掛名」在池中永遠會是零，實掃時要用樂團名查。

## 355（本批立）**RG 的 artist-credit 與所屬實體主名不同時，取實體主名——石川晶《ウガンダ》一案**

`74d39c14`《ウガンダ（アフリカン・ロックの夜明け）》的 artist-credit 是「カウント・バッファロー」（原盤封面只印團名），
但它掛在實體 `2acbf5b2`「石川晶とカウント・バッファローズ」底下，同實體 22 個 RG 的 credit 有五種寫法
（石川晶とカウント・バッファローズ／Akira Ishikawa & His Count Buffalos／Count Buffalo & The Jazz Rock Band／カウント・バッファロー／石川晶と彼のグループ）。
**裁定：卡片掛實體主名「石川晶とカウント・バッファローズ」**，五種 credit 全進 queryAlias。
同一判準也用在 本田竹広（同實體 credit 有 本田竹広／本田竹曠／T. Honda／Takehiro Honda 四種，取 MB 主名「本田竹広」）
與 宮沢昭（1978 年後的 RG credit 寫 Akira Miyazawa）。這是裁定 6／70／120 與 c-116 第 3 條的直接套用，有先例。

## 356（本批立）**未收清單（分類，rgMbid 已備妥）**

### A. 秋吉敏子——CAA 404 而不收（MBID 已釘、身分已查，補到圖就能建卡）
`a8ab1297`《Finesse》1978（Concord）、`12951157`《Notorious Tourist From The East》1980（Inner City IC 6066）、
`dbbd38af`《Interlude》1992（Concord CCD-4324）、`e39c9ec9`《Remembering Bud: Cleopatra's Dream》1992（Evidence）、
`2c4909da`《Night and Dream》1994（Ninety-One CRCJ-9123）、`47b5aad6`《Maybeck Recital Hall Series, Volume Thirty-Six》1995（Concord，solo Live）、
`964322f8`《With Brazilian Friends》1997、`482bbadb`《Toshiko Plays Toshiko》1999-06（疑即 Crown 1997《Toshiko Plays Toshiko -Time Stream》）、
`8fae12b3`《Hope》2006、`bb5f0db2`《Toshiko Mariano Quartet》2006（同碟重複 RG，已釘 1961 原盤）、
`029b14f1`《Toshiko & Modern Jazz》2010（Columbia COCB-53621）、`9a51c133`《United Notions》1958（MetroJazz E1001，掛 International Jazz Sextet）、
`b21bc0b9`《Early Numbers》2021、`9648c6a1`《Toshiko's Blues》2023（整編）、`e6fd3b1b`《farewell》（無日期，5 軌）。

### B. 秋吉敏子——額度未收、CAA 200、可直接進後續批
`b918be81`《Four Seasons》1990（Ninety-One PAS-1006，Trio）、`fc23702c`《Dig》1993（Ninety-One CRCJ-9115，個人）、
`b47b227a`《Sketches of Japan》1999（Ninety-One CRCJ-91001，credit 穐吉敏子）、`f0f52cb5`《Live at Blue Note Tokyo '97》2001（Trio，Live）、
`939233d1`《Solo Live 2004》2009（Studio Songs 數位，Live）、`ae1d57af`《Porgy and Bess》2016（Studio Songs 數位，來歷未查）、
`32c3bf59`《In Japan》1996（EXPRESS TOCT-9361，只有 3 軌，形態存疑）、`52c56890`《Toshiko Plays Toshiko》2019（Quartet，Studio Songs CD 5 軌，來歷未查）。

### C. 秋吉敏子——合掛、大樂團、合輯、EP，不收
合掛（第 258／321 條）：`34a86b38`《Toshiko & Leon Sash at Newport》1958（分面合盤）、`53cf9d62`《The Country & Western Sound of Jazz Pianos》1963（Steve Kuhn &）、
`f41bd4a7`《Toshiko‐Mariano Quartet (Live at Birdland)》1991（& Charlie Mariano，CAA 404）、`302306d4`《Tuttie Flutie》1981（Trio & Flute Quartet）、
`094e019e`《Classic Encounters》2010（with Reiko Honshoh）、`c7753608`《Jazz Conversations》2016（MONDAY満ちる &）。
大樂團（簡報明令不收）：`a05e0d88` 名下 16 個（含 `58e816d6`《Kogun》1974）、`2fe7f7ac` 秋吉敏子ジャズ・オーケストラ 8 個、
`3ef34913`《Let Freedom Swing》2007（SWR Big Band）、`eab49f3e`《Desert Lady / Fantasy》1994（**MB 掛個人但實為 Jazz Orchestra featuring Lew Tabackin 的大樂團盤**，不收）、
`0ce25a4f`《Jazz in Japan Recorded in Tokyo》1965（Toshiko Mariano and Her Big Band，五實體合掛）。
合輯：`6e28e045`《New York Sketch Book》2004、`75880be9`《Her Trio, Her Quartet》2012（Mad About，兩張 Storyville 併盤）。EP：`f13fc3f9`《Toshiko Akiyoshi Recital》2010。

### D. 秋吉敏子——**MB 查無 RG**（唱片實體確鑿，可進 §1 補遺批）
1961 Nippon Columbia《Long Yellow Road》（Toshiko Akiyoshi Quartet 東京錄音，**與池中大樂團 1975 同名**）、
1963 Takt《Toshiko Mariano Quartet in West Side》（Apple jp `1695944423`《Toshiko Akiyoshi & Charlie Mariano》1997 Nippon Columbia 8 軌疑即此）、
1965《Toshiko Akiyoshi Quartet - Lullabies for You》系（Takt）、1971 RCA《Toshiko Akiyoshi Solo Piano》、1979–80 Discomate《Sumie》（trio）、
1981 Trio《Just Be-Bop》。**這六張是簡報點名的「1960 年代日本盤、1970 年代 RCA／Victor 的 trio 與 solo」的核心，MB 一張都沒建檔。**

### E. 第一世代——額度未收、CAA 200、原盤 Official，可直接進後續批（逐張已寫在各卡的刻意不釘）
本田竹広《Jōdo》1970 `6d937ed0`／《The Trio》1970 `ece8ab7a`／《I Love You》1971 `2b50e607`／《What's Going On》1973 `e6c15d9f`；
白木秀雄《白木秀雄リサイタル》1959 `f59e3eb2`（Live）／《プレイズ・ボッサ・ノバ》1962 `5ed483fe`／《白木秀雄》1958 `8c4f6561`（2007 RG，與 `da7146b8` 重複）；
宮沢昭《Love For Sale》1978 `63193b6e`／《My Piccolo》1981 `5431fc8c`（Live）／《On Green Dolphin Street》1982 `66f06f89`；
ジョージ大塚クインテット《Physical Structure》1976 `6be3e9a9`（TBM-62）；
鈴木宏昌《Rock Joint Cither ー Silk Road》1973 `9198e151`／《High‐Flying》1976 `a85636fa`／鈴木宏昌トリオ《Primrose》1978 `c796641c`；
高橋達也と東京ユニオン《The Rock Seasons》1973 `e8a53d83`／《Black Pearl》1980 `736ea34e`／《Soul Porter》1978 `9f39f6d9`／《Up In The Blues》1981 `794d6b64`；
石川晶とカウント・バッファローズ《エレクトラム》1970 `afa1adcc`／《バキシンバ》1970 `056a936c`／《African Rock》1971 `94fdf242`／《Get Up!》1975 `18e8b3dd`／《Okinawa》1976 `75c81ed9`／石川晶《Back To Rhythm》1975 `6751b48c`；
猪俣猛とサウンド・リミテッド《Innocent Canon》1971 `751d2e0a`；
稲垣次郎とソウル・メディア《Woodstock Generation》1970 `99c3f630`／《Jazz & Rock "Out"》1970 `9938ac9f`／《Wandering Birds》1971 `667ea191`／《In the Groove》1973 `6863111f`。
**這 26 張全部可以直接建卡**——第一世代這條線遠沒挖完，光這十位就還有一整批的存貨。

### F. 第一世代——不收與原因
- **松本英彦 本批 0 張**：《Sleepy》1976（TBM-74，`6de7306e`）與《Rio Manhattan》1981（`91e94cbc`）**CAA 404**；
  《The Session / Sleepy Meets the Great Jazz Trio》1980（`d2119a73`，CAA 200）是與 The Great Jazz Trio 的合掛（池中已有 GJT 1 張，兩邊都有卡就不能掛單人，第 258 條）；
  《Four Wings》2023（`d19cb142`，Trio／Octave，CAA 200）來歷未查（疑為 1970 年代未發表錄音）；其餘是演歌伴奏與合輯。
  池中既有的 `Hidehiko Matsumoto《Hot Jazz》1983`（c-87 Johnny's Disk 線）是英文字串，**待本機統一為「松本英彦」**——本批沒有新卡可以掛，分裂暫時不擴大。
- **ジョージ大塚**：《Page 1》1967 `de5ffd98` CAA 404；《Page 2》1968 `8dbfa30b` 1968 原盤 status 是 Promotion、只有 2014 CD Official；
  《Go On'》1972（TBM-13）`d93860bf` CAA 404；《Sea Breeze》`f1f64d5b` 只有 2014 RG（1971 原盤 MB 未建檔）且 CAA 404；《Maracaibo Cornpone》`ba19a978` 無日期、只有數位。
- **宮沢昭《山女魚》1962**（King SKJ 1001，`63cd7c36`）CAA 404——這是他最有名的一張，**最值得本機手動補圖**；《Four Units》1969 `9e764a87` CAA 404。
- **原信夫**：1963–1970 的 King／Columbia 正規盤五張全部 CAA 404（`3cc0ac9f`《Operation Glenn Miller》、`5ba9d38f`《Western Dynamics》、`1e261c1e`《LITTLE GIANT》、`3b3d4658`《エレクトロニクス！》、`6f1b266c`《Big Band Dynamics》2008 復刻）；
  `38e2e165`《Giant Steps》1978 CAA 200 但三實體合掛（Elvin Jones／Frank Foster）。**Newport 1967 那張是他名下唯一能收的。**
- **白木秀雄**：`7ce34993`《Plays Horace Silver》1962、`3a9a8c2c`《祭りの幻想》1998、`6a973d95`《ステレオ・ドラム》1998 CAA 404；
  `b545a154`《Hideo Shiraki in Fiesta》2005（＝祭りの幻想）CAA 200 但 1961 Teichiku 原盤 MB 未建檔、RG 年份是復刻年，留待補建原盤後再收。
- **猪俣猛個人**：《Drum Shot》1971、《Drummer Man》1975 只有數位 release；《ドラム・メソード》1972 是教材盤。
- **高橋達也と東京ユニオン《Maiden Voyage》1977**（TBM-3001）唯一 release 是 Promotion。
- **合掛不收**：本田竹広《Flying To The Sky》（& G. Dudek）、《In a Sentimental Mood》（三人平列）；稲垣《Something》（Steve Marcus +）、《Bridge Over Troubled Water》（佐藤允彦 &）、《By the Red Stream》（鈴木宏昌 +）。
- **原聲帶不收**：鈴木宏昌《海のトリトン》《クレオパトラD.C.》、高橋達也《大都会》《西部警察》×2、石川晶《マクロス》《Lupin III》《フィリップ・マーロウ》、猪俣猛《うる星やつら》×3。
- **MB 查無 RG（§1 候選）**：白木秀雄《祭りの幻想》1961 Teichiku 原盤、ジョージ大塚《Sea Breeze》1971 原盤、宮沢昭とオールスターズ（實體 `312ca341` 名下 0 個 RG）、
  松本英彦とスリーピーラテン楽団（`ad02820f` 0 個）、稲垣次郎Section（`29fd3a16` 0 個）、ジョージ・大塚カルテット（`5e73770e` 0 個）、石川晶とザ・ゲンチャーズ（`6d2c4e53` 0 個）。

## 357（本批立）**池中兩組既有的英文字串分裂，本批各新增一張漢字卡，待本機統一**

| 池中既有 | 本批新收 | 處置 |
|---|---|---|
| `Jiro Inagaki and Soul Media`（《Head Rock》1970、《Funky Stuff》1975） | `稲垣次郎とソウル・メディア《Dosojin》1972` | 依簡報第 3 點用漢字；上架後池中同團兩種掛名，**本機應把既有 2 張改成 MB 主名「稲垣次郎とソウル・メディア」**（同 c-121 第 4／4.5 條 灰野敬二／裸のラリーズ 的形狀） |
| `Hidehiko Matsumoto`（《Hot Jazz》1983，c-87） | 本批 0 張（第 356 條 F） | 分裂沒有擴大，但既有那張仍待改成「松本英彦」 |
| `Toshiko Akiyoshi-Lew Tabackin Big Band`（《Long Yellow Road》1975） | 秋吉敏子 13 張 | **不是分裂**——大樂團是另一個 MB 實體，簡報明令字串不動；但 D 類的 1961《Long Yellow Road》若日後收進來，會與它同盤名不同掛名，`risk` 要互指 |

## 358（本批立）**同名撞擊實測——score 一次都沒用上；三個坑記下來**

- `artist?query=country:JP AND artist:Akiyoshi` **只回 3 筆、沒有她**（個人實體 country 是 US），第 309 條的 `country:` 列舉在這裡反而漏；
  改用 `alias:"Toshiko Akiyoshi"` 才把 `78fe2146` 找出來——**非拉丁圈的旅外藝人，country 不可當前提，alias 查法要並行。**
- `artist:"Toshiko"` 回 15 筆，她的相關實體佔 8 個（Trio／Quintet／Big Band／Mariano Quartet／Mariano & Toshiko／International Jazz Sextet／Mariano and Her Big Band／The Toshiko Trio），
  其餘 7 個是同名他人（Toshiko Katsura、Kohno、Sakakibara…），全靠 disambiguation 與名下 RG 判，未用 score。
- `artist:"ジョージ大塚"` 只回個人與空的 カルテット 實體，**Trio／Quintet 兩個實體是英文名**，要用 `artist:"George Otsuka"` 才找得到——同一位的實體分散在兩種文字系統，一種查法一定漏。
- 實掃卡池的假陽性：`Buffalo`（5 張：Buffalo／Buffalo Springfield／Buffalo Tom／Buffalo Nichols）、`Hara`（9 張：Rei Harakami、Charalambides…）、`琴`（蔡琴 3 張）、`Koto`（Makoto ×2）、`Suzuki`（鈴木雅明、Suzukiski）——全部逐筆核整個掛名字串後排除。

## 359（本批立）**封面與試聽的觀察（只寫觀察，不下結論——裁定 254）**

- **CAA**：本組逐張探測 release-group 端點，候選 ~130 個 RG（秋吉 44 ＋第一世代 81 ＋補查 7），**5xx 為 0**，404 都是真的沒圖；入選 23 張全部 200。
  秋吉的 404 集中在 **Concord／Ninety-One／Studio Songs 三家**（1978 年後的美國與日本 CD 時期），1950–70 年代的原盤反而幾乎都有圖。
- **Apple**（店面 jp 為主、us 對照，`search` 與藝人目錄兩種查法）：16／23 有命中且軌數與 MB 一致，明細在各卡 `risk`。
  **未命中的 7 張**：Meditation、Dedications、Dedications (II)、Toshiko Plays Billy Strayhorn、Time Stream（只回 1997 同名別碟）、Got The Spirit、ウガンダ——
  **DAN／Discomate／EASTWORLD／TBM／Toshiba 這五家 1970 年代日本廠的目錄在 Apple 上幾乎全空**（c-116 第 6 條、c-121 第 5.2 節那條規律第三次應驗）。
- **灰色再發廠要注意**：《The Many Sides of Toshiko》Apple 只有 Record Vault 與 TP4 Music（版權到期再發）；《Her Trio Her Quartet》《George Wein Presents Toshiko》是 1201 Music——研究層配對時要核曲目與長度。

---

## 第 366 條（主線 2026-09-15，研究層 b 組交件後）：**b 組四張年份改判、兩張兩說維持**

四張**改卡單**（第 364 條三種失真全部命中，`prop-b.json` 與 `c131-cards.json` 已同步）：

| 盤 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Ahmad Jamal《at the Blackhawk》 | 1961 | **1962** | Argo LP-703 主版本 1962-11、百科、串流 ℗1962；MB 的 1961 出自一筆廠牌空白的荷蘭 release，Argo 原盤 MB 未建檔 |
| Hank Mobley《Another Workout》 | 1986 | **1985** | 美日加法版全 1985、jazzdisco、百科 |
| Don Cherry《Symphony for Improvisers》 | 1966 | **1967** | 主版本 1967-08、無 1966 壓片、Billboard 1967-08-19；MB 把錄音日當發行年 |
| Chet Baker & Art Pepper《Playboys》 | 1956 | **1958** | 主版本與最早版本全 1958、jazzdisco 1958 |

**《Playboys》主線加查了 MB 的 release 列表**：所謂 1956 那筆登記的是「World Pacific **PJ-1234**」——
**catno 前綴是 Pacific Jazz、廠名卻寫 World Pacific**（World Pacific 1958 年才存在），
同 RG 最早的海外壓片是 1959 年英國 Vogue。**1956 是錄音年（1956-10-31）不是發行年**，
與第 364 條同形。**改 1958**；百科的 1956 說寫進 notes，**正文可寫 1956 年錄音，但不得斷言發行月**。

**兩張兩說維持卡單年**（三個專業資料庫對一個百科，依第 262 條不動）：
- McCoy Tyner《Expansions》**1969**（研究層以同系列 84333《Now!》1970-06 出版、號碼更小為由傾向 1970——
  **這是推論不是來源**，記在 notes 供本機覆核）。
- Archie Shepp《The Magic of Ju-Ju》**1967**（Billboard 1968-06-01 與法英版 1968 並存）。
**兩張的正文都不得斷言精確月份。**

另研究層補正三處（不影響年份）：《Stan Getz Plays》原 Norgran MGN 1042 是 11 軌不是 8 軌；
《at the Blackhawk》錄音月份無來源、不得寫；《Oblique》美國首發 CD 是 1990 不是 1992。

## 第 367 條（主線 2026-09-15，研究層 a 組交件後）：**《Meditation》的 catno 改 DAN VC-6001；a 組年份全部成立**

策展層 `label` 寫「DAN VC-7513（1971）」——**VC-7513 是 1976 年再發編號**，1971 原盤是 **VC-6001**
（維基／microgroove／jazzdisco 三邊一致）。MB 把再發 catno 掛在 1971 那筆 release 上，
是第 262 條（日期、廠牌、catno、載體要出自同一筆）的又一個實例。**卡單 `label` 已改，年份不動。**

a 組其餘年份全部成立：《The Many Sides of Toshiko》維持 1958（錄音 1957-09-28，正文寫
「1957 年 9 月錄音、翌年發行」）；《Toshiko Meets Her Old Pals》1961（MB 的 1974 是再發，
King SKC 3 原盤未建檔，留本機補）；陸前高田 1980 是演奏年；《Loving You George》1975。

**研究層擋下策展層 20 處（15 張）**，全部寫進 notes，其中五處是**無來源的「第一張／唯一」句**
（Toshiko's Piano「日本樂手在美廠第一張」、Candid「唯一日本樂手領銜作」、Strayhorn「唯一單一作曲家專輯」、
TBM「第一張」、Sound Ltd.「系列頭號」）——**與第 253 條同形，寫作層一律不得沿用**。
另《Dedications》受獻者不是八位鋼琴手、Inner City IC 6046 是第二集不是第一集的美版、
《Salaam Salaam》是鋼琴三重奏不是電鋼琴四重奏、高橋達也 1966 才接任團長。

**試聽**：a 組三種查法找回 8 張、b 組找回 6 張＋修正 1 筆，**全批 21→38/45**。
`ウガンダ` 那筆附條件（官方 ℗1972 但 7 軌、前三首各拆 I/II，秒數合計與資料庫端 4 軌相符）——
**寫作層按曲名配，不得寫軌數**。無來源 7 張：Meditation、Dedications、Dedications (II)、
Toshiko Plays Billy Strayhorn、Time Stream、Got The Spirit、Jamal Plays Jamal。

**QA 的「千分位逗號 30,890」是假陽性**——那是澳洲 Impulse! 的 catno `IL-30,890`。

## 第 368 條（主線 2026-09-15，hook 層交件後）：**研究稿 `yearVerified` 欄位在 b 組是物件、a 組是字串——形狀要統一**

`c131-b.json` 全 22 筆的 `yearVerified` 是 `{year, recorded, note}` 物件，a 組 23 筆是字串。
`JSON.stringify` 出來是 `[object Object]`，**任何吃這個欄位的下游工具都會拿到空值**。
年份論證本身完好（在物件的 `note` 裡），hook 層是從 `notes` 取用的，沒有損失。
**c-129 b 組也是同一個形狀**（第 345 條那批）。
**往後的研究層派工要明寫 `yearVerified` 是字串**；本機端若有工具讀這欄，先做型別容錯。

## 第 369 條（同日）：**hookCandidates 裡有 facts 查無的事實——hook 層沒採用是對的**

兩處：《Toshiko's Piano》的「Miles Davis 的貝斯手」（facts 只寫 Paul Chambers 本人，沒有這個修飾語）、
《Sakura Sakura》的「白木在標題曲用木槌、手指、刷子、鼓棒輪流打」（沒有任何 fact 提到打法）。
**與第 253 條同形**：候選句比 facts 多說了一點，多出來的那一點沒有來源。
**hook 層採用 hookCandidates 前要逐句回 facts 對照。**

另記：派工詞寫「秋吉敏子全目錄 14 ＋ 第一世代 9」，**實際卡單是秋吉系 13 ＋ 第一世代 10**（總數 23 無誤）——
主線派工詞的組成數字第六次出錯（第 253 條家族），hook 層照卡單走。

## 第 370 條（主線 2026-09-15，寫作層交件後）：**《Got The Spirit》的「讀者票選最佳大樂團連續九年」整條不寫——writer-base 的榜單條款又贏一次**

與 c-129 第 346 條完全同形：hook 層把 facts 裡的樂評媒體票選搬進 `note` 指定要寫，
但 `writer-base.md` 的榜單條款是「**出處是樂評媒體、媒體名又不能進正文的票選一律整條不寫**」。
寫作層整條不寫、改以廠牌與收尾曲撐滿，**正確**。
**這是同一個漏法在兩批連續出現**——hook 層派工詞往後要明寫「facts 裡的樂評榜單不得搬進 note」。

## 第 371 條（同日）：**CJK 專名上限 3 與「主鏈全員點名」相衝時，整格捨去側人**

寫作層捨掉的側人：《Toshiko's Piano》的三位班底（改寫「巡演裡的班底」，hook 已含 Peterson）、
《Toshiko Mariano Quartet》兩位、《Meditation》兩位、《Sakura Sakura》的樂評人與兩位編曲者、
《Sharps & Flats》兩位編曲者。**事實沒有損失，只是不點名**——這比削字數保住更多內容。
**初稿單向低估是常態**：第一輪 12 張有 8 張落在 241–274，全部靠整格捨去壓回，沒有逐字削。
