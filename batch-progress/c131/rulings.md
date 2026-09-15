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
