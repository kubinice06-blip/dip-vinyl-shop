# Blue Note 列舉（2026-09-15，MB 全目錄）

**來源**：MB `release?label=713c4a95…`（Blue Note imprint，6,999 筆 release）＋ 15 個附屬實體（Holding／各國／Music Matters 125 筆）＋ 10 個再發 series，逐頁拉完，折疊成 2,819 個 release-group。
只留 primary=Album、無 Compilation／Soundtrack／DJ-mix／Remix（去掉 636 合輯、255 單曲、46 EP 等）→ **1,812 張純專輯（含 202 張 Live）**。
明細：`blue-note.json`（每列含 country／format／catno／再發系列／池中掛名）。

## 總數

| | MB 建檔 | 池中已有 | **缺** |
|---|---:|---:|---:|
| 全部純專輯 | 1,812 | 290 | **1,522** |
| 1939–56（10 吋 5000／7000 系列＋1500 系列前段） | 84 | 17 | **67** |
| 1956–66（Lion 時期 1500／4000 系列） | 353 | 155 | **198** |
| 1967–84（Liberty／UA，含 LT 庫存系列 1979–81、JP 首發） | 320 | 77 | **243** |
| 1985 後（Capitol／EMI／UMG 重啟） | 1,053 | 41 | **1,012** |
| 年份不明 | 2 | 0 | 2 |

- 1985 後拆開：**爵士 912（缺 873）**、非爵士 44（Ryan Adams／Amos Lee／Keren Ann／Priscilla Ahn／Bird and the Bee 等，缺 42）、待人工判曲風 97（多為歐洲分公司小名字：Superblue、Out of the Blue、Dao Dezi、Slowhill…）。
- 1980–84 休眠期只有 56 張（LT 系列尾段＋日本 GXF／BNJ 首發），缺 50。
- **僅有日本盤的 RG 60 張，池中 0**（quasimode、Chihiro Yamanaka、Kyoto Jazz Sextet、Jimmy Smith／Turrentine 的 BNJ 首發等）。
- 18 張 RG 首發年份落在 1985 後、但目錄號屬 Lion／Liberty 期（庫存盤或 MB 年份有誤），已依目錄號歸回原年代並在 note 標明；108 張標「BN 首發晚原盤 3 年以上，原盤可能他廠」（Pacific Jazz／Roulette／Capitol 轉來的）。
- 16 張 Various Artists 未標 Compilation，note 標「疑似合輯」，藝人統計已排除。
- Live 202 張，缺 190（1985 前 45 張）。

## 再發系列（MB series，成員折進原盤 RG）

| 系列 | MB 建檔 RG | 池中 | 缺 |
|---|---:|---:|---:|
| Tone Poet | 127 | 50 | **77**（1985 前 63 張：Minor Move、Byrd in Flight、Silver's Serenade、Life Time、The Rajah、Poppin'、Katanga! …） |
| Music Matters | 100 | 77 | **23**（Cafe Bohemia Vol.1/2、Hank Mobley Quintet、Indeed!、Mosaic、Royal Flush、Shades of Redd、Basra、Wahoo!…） |
| Classic Vinyl | 7 | — | MB 幾乎沒建這條線，不能當涵蓋量用 |
| Blue Note 80／75th／BN80 More 60 Works（JP）／Soul Jazz Works（JP） | 各 1–5 | — | 同上 |

MB 上沒有獨立的 Blue Note Japan 實體（`Nihon Blue Note` 只掛 1 筆）；日本盤全掛主實體，靠 `country=JP` 分。

## MB 涵蓋量判斷

- BLP 1500 系列（1501–1600）：MB 有 95 個目錄號；查無 1532、1553、1585、1586（多為未發行號）＋1573（John Jenkins，只掛 Music Matters 號）→ **基本全**。
- BLP／BST 4000 系列（4001–4360）：MB 有 346 個目錄號，查無 14 個（4061、4092、4100、4116、4155、4210、4211、4233、4234、4236、4241、4265、4316、4328；部分是未發行號）→ **接近全**。
- 10 吋 5000／7000 系列與 BN-LA／LT 系列也大致齊。**Blue Note 不需要 §1 候選**——缺的是池，不是 MB。

## 最缺的藝人（1985 前，缺／MB 有）

Horace Silver 22/30、Lou Donaldson 20/28、Jimmy Smith 20/27、Lee Morgan 17/26、Stanley Turrentine 17/20、Hank Mobley 15/24、Art Blakey 15/22、Donald Byrd 14/26、The Three Sounds 13/14、Jackie McLean 12/23、Bobby Hutcherson 12/21、Duke Pearson 10/11、Elvin Jones 10/10、Kenny Burrell 9/10、Grant Green 7/24、Andrew Hill 6/11、Gene Harris 6/7、Earl Klugh 6/6、Erroll Garner 5/5、Cannonball Adderley 5/8。

（1985 後爵士：Joe Lovano 17/17、Dianne Reeves 16/16、Greg Osby 14/14、Gonzalo Rubalcaba 13/13、Eliane Elias 12/12、Norah Jones 12/16、Erik Truffaz 11/11、Ron Carter 9/9、Chihiro Yamanaka 9/9、Jacky Terrasson 8/8、Jason Moran 8/8、Cassandra Wilson 8/9、Kurt Elling 7/7、Stefon Harris 7/7。）

## 比對方式

`seed_cards.json`（16,450 列）＋ `desc-tools/batches/cards/c120–c130`（c131 本機不存在）。藝人以 MB artist-credit 逐一比，去掉 Quintet／Trio 等團體後綴；專輯子字串雙向、看整串、短於 4 字或佔比不到一半不算，卷號（Volume One／Vol. 1）統一後比。Volume 拆盤（Cafe Bohemia Vol.1/2 之類）視為不同張。
