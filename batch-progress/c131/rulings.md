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
