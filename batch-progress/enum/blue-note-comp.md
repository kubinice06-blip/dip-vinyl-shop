# Blue Note 合輯回撈（第 312 條）——被列舉檔濾掉的 Album RG 逐筆分類

**2026-09-16。** `blue-note.json` 那條線只留 `primary=Album` 且無
`Compilation／Soundtrack／DJ-mix／Remix／Spokenword`，2,819 個 release-group 留下 1,812 張純專輯。
本檔把**被那道濾網擋掉的 album release-group 全部撈回來**逐筆列舉並分 tier：`blue-note-comp.json`。

## 重跑與對數

MB 全目錄重拉（16 個 label 實體，`release?label=…&inc=release-groups+media+labels+artist-credits`，
每秒 1 次、503 退避重試）＋ 10 個再發 series 的 `series?inc=release-rels`。
**7,092 筆 release → 折疊 2,819 個 release-group，與 `blue-note.md` 記的數字完全相符**，
其中 `primary=Album` 且帶被排除 secondary-type 的有 **687 個**。

| secondary-types | 張數 |
|---|---:|
| Compilation | 636 |
| DJ-mix | 15 |
| Soundtrack | 11 |
| Compilation + DJ-mix | 9 |
| Compilation + Live | 7 |
| Remix | 6 |
| Live + Spokenword | 1 |
| Compilation + Remix | 1 |
| Spokenword | 1 |
| **合計** | **687** |

**標 Compilation 的正好 653 張，其中「只標 Compilation」正好 636 張**——就是 `blue-note.md`
寫的「去掉 636 張合輯」。另外 34 張是同一道濾網用 Soundtrack／DJ-mix／Remix／Spokenword 擋掉的，
形狀相同，一併收進本檔（`secondaryTypes` 欄可以分開）。

## 分 tier 結果

| tier | 張數 | 處置 |
|---|---:|---|
| **`canon`** | **17** | **§5.6 要收的**（1985 前有目錄號的原始發行，只是 MB 標了 Compilation／Soundtrack） |
| **`vault`** | **7** | 庫存錄音首發，**要另議** |
| `realcomp` | 396 | 真精選／全集套裝／twofer，不收 |
| `va` | 264 | Various Artists 企劃合輯，不收 |
| `unknown` | 3 | 查不清楚，見下 |

**⚠ 這一批遠比預期小，而且原因是好消息**：第 312 條擔心的「10 吋重組成 12 吋的 Volume 1／2」
**大部分 MB 根本沒標 Compilation**，早就在 1,812 張純專輯那條線裡了——
Monk《Genius of Modern Music》Vol. 1／2、Bud Powell《The Amazing Bud Powell》Vol. 2、
Jutta Hipp、Cafe Bohemia Vol. 1／2 等都在 `blue-note.json`。
**真正被濾網擋掉的正典只有 17 張**，其中 6 張池中已有，**實際要收 11 張**。

### `canon` 17 張（全部，依年份＋目錄號排序；★＝池中已有）

| # | 年 | 藝人 | 盤名 | 目錄號 | 判斷 |
|---:|---:|---|---|---|---|
| 1 | 1951 | Bud Powell | The Amazing Bud Powell ★ | BLP 1503（原 5003） | 10 吋重組成 1500 系列 Volume 1 |
| 2 | 1952 | Sidney Bechet | 12 Years On Blue Note | BLP 7020 | 1952 原始 10 吋（78 轉重組） |
| 3 | 1952 | Sidney Bechet | Port of Harlem Six | BLP 7022 | 1952 原始 10 吋 |
| 4 | 1953 | Clifford Brown | New Star on the Horizon | BLP 5032 | 原始 10 吋 |
| 5 | 1955 | Miles Davis | **Miles Davis, Volume 1** | BLP 1501 | **1500 系列首號**，10 吋 5013／5022 重組 |
| 6 | 1955 | George Lewis and his New Orleans Stompers | Volume 2 | （MB 未帶，1200 系列） | 1955 原始 12 吋 Volume 2 |
| 7 | 1955 | Milt Jackson | Milt Jackson With John Lewis…and the Thelonious Monk Quintet | BLP 1509 | 10 吋 5011／5001 重組的 12 吋 |
| 8 | 1956 | Clifford Brown | Memorial Album ★ | BLP 1526 | 10 吋 5032／5047 重組 |
| 9 | 1956 | Miles Davis | **Miles Davis, Volume 2** | BLP 1502 | 同批場次重編的第二集 |
| 10 | 1956 | Fats Navarro | **The Fabulous Fats Navarro, Vol. 2** | BLP 1532 | 第 312 條點名的那張 |
| 11 | 1957 | Miles Davis | Birth of the Cool ★ | Capitol T 762 | 非 BN 號，但形狀就是 78 轉重組首發 |
| 12 | 1959 | The Modern Jazz Quartet | Music from Odds Against Tomorrow ★ | United Artists | MB 標 Soundtrack，是原創配樂專輯 |
| 13 | 1968 | Stanley Turrentine | The Look of Love | BST 84286 | **正規錄音室專輯，MB 純粹標錯**（第 613 條反例） |
| 14 | 1969 | James Moody / George Wallington | The Beginning and End of Bop | B-6503 | **Jazz Classics 6500 系列** |
| 15 | 1969 | Edmond Hall / Art Hodes | Original Blue Note Jazz, Volume 1 | B-6504 | **Jazz Classics 6500 系列** |
| 16 | 1972 | Grant Green | The Final Comedown ★ | BST 84415 | 原創配樂專輯，MB 標 Soundtrack |
| 17 | 1977 | War | Platinum Jazz ★ | BN-LA690-J2 | War 在 BN 的原始發行（含未發表曲） |

### `vault` 7 張（全部缺，要另議）

| 年 | 藝人 | 盤名 | 目錄號 | 為什麼另議 |
|---:|---|---|---|---|
| 1984 | Clifford Brown | Alternate Takes | BST 84428 | 同批場次未發表 take，首發，但是 alternate 不是完整專輯 |
| 1985 | Bud Powell | Alternate Takes | BST 84430 | 同上 |
| 1986 | Dexter Gordon | The Other Side of Round Midnight | BT 85135 | 1985 同場次錄音 1986 首發，不是既有曲目精選 |
| 1992 | Chick Corea | Early Circle | CDP 7 84465 2 | 1970 Circle 未發表錄音首發 |
| 1996 | Kenny Burrell | Kenny Burrell, Vol. 3 | LP-1609／TOCJ-1609 | **用 1500 系列保留號 1609** 首發 1957 未發表場次 |
| 1996 | Jimmy Smith | Cherokee | TOCJ-1612 | **用保留號 1612** 首發 1957–58 未發表場次 |
| 2013 | Hank Mobley Quintet | The Feelin's Good | MMBST-84401 | Music Matters 用未啟用的 BST 84401 號發，內容跨場次 |

### `unknown` 3 張（卡在哪裡）

- **The Chico Hamilton Quintet《Chico Hamilton Quintet Featuring Buddy Collette》(1955)**——
  MB 無目錄號，查不出是 Pacific Jazz 原始 LP 還是事後合輯。
- **Lenny Bruce《The Carnegie Hall Concert》(1972)**——1961 實況 3LP 首發，是原始發行，
  但 MB 標 Spokenword＋Live，屬口語喜劇；要不要算本線由策展層定。
- **Miles Davis《All Stars Vol. 1》(TYCJ-81008, 2013)**——疑與 BLP 1501《Miles Davis, Volume 1》
  是同一張的重複 RG，人工併檔後才能定。**併檔前不要同時派卡，會撞。**

### `realcomp` 396 張的代表十筆（不收）

1968 Jimmy Smith《Jimmy Smith's Greatest Hits!》(BST 89901)、1973 Herbie Hancock《The Best Of》(BST-89907)、
1974 Lee Morgan《Memorial Album》(BN-LA224-G，遺作精選)、1975 Lester Young《The Aladdin Sessions》(BN-LA456-H2)、
1976 Thelonious Monk《The Complete Genius》(BN-LA579-H2)、1983《The Complete Blue Note Recordings of Thelonious Monk》、
1989《Blue Note Years》系列、1997《Jazz Profile》系列（一口氣 20 餘張）、1998《Blue Breakbeats》系列、
2016–18《5 Original Albums》系列。
**最大的兩群是 1970 年代 BN-LA 二合一再發 twofer（28 張）與 1990 年後的 CD 企劃系列（365 張）。**

### `va` 264 張的代表十筆（不收）

1951《Mellow the Mood》(BLP 5001，註：這張是原始 10 吋發行，形狀算正典，但掛名是 VA)、
1969《Blue Note's Three Decades of Jazz》、1976《Blue Note Live at The Roxy》(BN-LA663-J2)、
1984《The Other Side of Blue Note 1500 Series》(BNJ)、1985《One Night With Blue Note Preserved》Vol. 3／4、
1989《Blue Note 50th Anniversary Collection》Vol. 1–5、2001–06《Blue Note's Sidetracks》Vol. 1–7、
2003–12《Blue Note Trip》Vol. 1–10、《Jazz Chillout》、《Jazz Super Hits》。

## ⚠ `inPool` 只能當參考（第 611 條）

比對 `seed_cards.json`（16,450 列）＋ `desc-tools/batches/cards/c1*.json`（42 檔，合計 18,200 列）。
**子字串比對折不到「群組掛名 vs 個人掛名」**，這一批還多踩到一種：**同名但不同盤的 Volume 碟**。
機器算出 22 張 inPool；`canon`／`vault` 那 24 張**已逐張人工核對**，結論寫在每筆的 `note`：

- **真的在池中（6 張，不必再收）**：Bud Powell BLP 1503、Clifford Brown BLP 1526、
  Miles Davis《Birth of the Cool》、MJQ《Odds Against Tomorrow》、Grant Green《The Final Comedown》、War《Platinum Jazz》。
- **機器誤判、實際仍缺（3 張）**：Sidney Bechet BLP 7020（對到 BLP 1207《The Fabulous Sidney Bechet》）、
  Miles Davis BLP 1502（對到 10 吋 BLP 5022《Miles Davis, Vol. 2》）、
  Kenny Burrell Vol. 3（對到 BLP 1543《Kenny Burrell》）。
- `realcomp`／`va` 的 inPool 沒有逐張核對，**不要拿那個數字當涵蓋量**。

另外：c135–c142 這幾批正在跑 Blue Note 線，**池子每天在動**，本檔的 inPool 是 2026-09-16 的快照。

## 建議切批

**一批就夠，不用 45 張切。**

- **§5.6-a（24 張）＝ `canon` 17 ＋ `vault` 7**，依「年份 → 目錄號」排序（就是上面兩張表的順序）。
  扣掉池中已有的 6 張，**實際要上的是 18 張**，遠低於一批 45 的上限。
- **派工前先處理 `unknown` 第 3 筆**（Miles Davis《All Stars Vol. 1》vs BLP 1501 的重複 RG），
  併檔後若確認是同一張，§5.6-a 仍是 18 張。
- **若店主決定 `vault` 不收**，§5.6-a 剩 `canon` 11 張，還是一批。
- `realcomp` 396 ＋ `va` 264 共 660 張**不切批**，留在本檔備查即可。

