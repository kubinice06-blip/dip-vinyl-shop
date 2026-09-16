# c-147 交接（2026-09-16）：§5.6 合輯正典回撈，13 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 `REMOTE_RUNBOOK.md`
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

**第 312 條的收尾批**。Blue Note 線的固定規格會濾掉 `secondary-types` 帶 Compilation／Soundtrack 的碟，
1939–66 開跑時就發現**正典會被一起濾掉**。六批跑完後回頭把 **687 個被擋掉的 album release-group 全部撈回逐筆分 tier**
（`batch-progress/enum/blue-note-comp.json`＋`.md`）：**`canon` 17／`vault` 7／`realcomp` 396／`va` 264／`unknown` 3**。

⚠ **結論比預期小，而且原因是好消息**：第 312 條擔心的「10 吋重組成 12 吋的 Volume 1／2」
**大部分 MB 根本沒標 Compilation**，早就在主線那 1,812 張裡了（Monk《Genius》Vol. 1／2、Powell Vol. 2、
Cafe Bohemia Vol. 1／2 都在）。**真正被濾網擋掉的正典只有 17 張。**

**13 張、11 位掛名、零 §1 人工身分、13/13 釘住 release-group MBID。**
**`releaseType` 全部照 MB 原值（12 Compilation ＋ 1 Soundtrack）——這條線第一次出現 Soundtrack 值。**

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 項目 | 狀態 |
|---|---|
| 身分（rgMbid 釘住） | **13/13，全部 pinned，零 §1 人工** |
| 三軸與頂點資格 | 卡單已帶，本機組 manifest 時照跑 |
| 固定簡介（desc） | **13/13 全 full**，out-1 228–239／out-2 231–239 |
| 封面 | **9/13**（缺 4，替代圖全部查實可用） |
| 固定試聽／無來源狀態 | **5/13 有來源，8 張走固定無來源狀態** |
| §5.5／§5.6 例外欄位 | **Soundtrack 不觸發 §5.6 例外閘，例外欄留空**（第 735 條） |
| published gate | 本機端 |

**封面與試聽命中率遠低於主線批次**——1950 年代的重組盤與 1990 年代日本限定盤本來就不好找，**這是預期內的**。

## 三、⚠ 這批最重要的事：撞陳列，不是撞卡

`inPool`／`chk-prop` 只答「碟」那一層。**研究層用母帶號（不是曲名）逐張比對出結論**（第 738 條）：

| 碟 | 與池中的重疊 |
|---|---|
| **Miles《Volume 1》BLP 1501** | **12/12 曲名全在池中**——沒有一軌是獨有 |
| **Miles《Volume 2》BLP 1502** | **11/11 全在池中**。⚠ **盤名與 c-135 的《Miles Davis, Vol. 2》近似，店面靠年份與軌數區分** |
| Milt Jackson BLP 1509 | 前 8 軌＝c-135 BLP 5011 全部；**只有〈Evidence〉是池中沒有的** |
| Bechet BLP 7020 | **對 1958 年 BLP 1207 原盤是 5/6**；**六軌是 1951-11-05 同一場，不是「十二年的精選」** |
| Brown BLP 5032 | 5/6 與 seed《Memorial Album》同母帶 |
| Navarro BLP 1532 | **只有〈Jahbero〉〈Symphonette〉正替四軌獨有**。⚠〈Bouncing with Bud〉池中加本張共三個 take 分裝三張碟 |
| B 6503 | A 面六軌與 c-135 BLP 5006 完全同母帶；**只有 B 面 Wallington 四軌獨有** |
| B-6504 | A 面 5 軌中 4 軌與 c-135 BLP 7007 同母帶；**只有〈High Society (alt take 2)〉與 B 面整場是新的** |
| **零重疊三張** | Bechet BLP 7022、George Lewis BLP 1206、Turrentine BST 84286 |

**13 張的 desc 都已按這張表寫**——重疊的軌目一律沒有寫成本張獨有、也沒有寫成本張樂手的領班錄音。

## 四、⚠ 退掉的三張：「首發」在軌目層級查過之前只是待證的宣稱

| 碟 | 退的理由 |
|---|---|
| Kenny Burrell《Vol. 3》(TOCJ-1609) | 七軌**全部**與 GXF 3070《Swingin'》(1980)、LT-1056《K. B. Blues》(1979) 長度差 ≤1 秒，不是 1996 首發 |
| Hank Mobley Quintet《The Feelin's Good》 | 六軌在 1989 年《Straight No Filter》CD 版已全發過，四軌還是池中兩張的同場同曲另一個 take |
| **Chick Corea《Early Circle》** | **十軌全部已發行過**（九軌在 1975《Circling In》、一軌在 1978《Circulus》）——策展層記「1/10 軌」是錯的 |

⚠ **三張 vault 盤只有 Jimmy Smith《Cherokee》的首發前提實查成立。**
⚠ **《Circling In》在 `blue-note-comp.json`、《Circulus》在 `blue-note.json`，兩張都還沒派卡**
——**三張都上架的話，池中會有三張碟裝同一批 1970-08 的 Circle 錄音。**

## 五、⚠ 年份與紙本

**策展層兩張改判覆核全部成立**：Milt Jackson BLP 1509 **1956**
（**Billboard 1956-05-12 的評介自己寫明「re-mastering of BLP 5011，加一首未發表的〈Evidence〉與三首替代 take」
——與逐軌比對的結果一字不差**）；Navarro BLP 1532 **1957**。

**唯一有疑議的是 Miles BLP 1501**（卡單 1955，唯一同期紙本是 Billboard 1956-02-04 的評論欄）
——**仍取 1955**，理由是同一爵士欄 1956-03 才評到 BLP 1201／1503，**該欄在 1500 系列這段普遍延遲 2–3 個月**。
**已標可逆，正文不寫上市月。**

⚠ **1952–54 的紙本第三腳實查不存在**：研究層抓了 Billboard 1952-08→1953-03 與 1953-08→1954-04
**共 66 期原始 PDF 逐頁掃過**，**BLP 7020／7022／5032 零命中**——是查過的結果，不是沒去找。

## 六、缺的

**封面缺 4 張，替代圖全部查實可用**（Discogs 美國原壓，都有圖）：
Bechet 7022 → `release/4107676`（4 圖）；George Lewis 1206 → `release/2504129`（4 圖）；
B 6503 → `release/2040078`（6 圖）；B-6504 → `release/3599683`（7 圖）。

**試聽 5/13，8 張走固定無來源狀態**：Bechet 7020／7022、George Lewis 1206、Milt Jackson 1509、B 6503、B-6504 等。
⚠ **Turrentine 的重複條目 `1577475407` 與採用的 `1435548295` 內容完全相同——記為不得被別卡採用。**

## 七、其他要知道的

- **B 6503／B-6504 的企劃背景**（Billboard 1969-04-05）：五張一套的 "jazz classics"、籌備一年、
  **Blue Note 三十年來第一次把庫房母帶排成整套發行**、起因是法國與英國授權商向 Liberty 索取。
  ⚠ **那句「masters which have never been released before」對 B 6503 的 A 面不成立**，正文只套在 B 面。
- **B-6504 的 A 面那場鋼琴是 James P. Johnson 不是 Art Hodes。**
- **Dexter Gordon《The Other Side of Round Midnight》九軌裡 Gordon 只出現在四軌**。
- **George Lewis 的掛名絕不可簡化成 `George Lewis`**（池中那個是 AACM 長號手）。
- ⚠ **前瞻**：Jimmy Smith《Cherokee》的〈Somebody Loves Me〉(tk.10) 與**後批的 BLP 1563
  《Plays Pretty Just for You》同一天同一場**（1957-05-08），**派那張時要回頭比**。
- **備查（這輪不收）**：`va` 裡的 1951《Mellow the Mood》BLP 5001 形狀其實是原始 10 吋發行，只是掛 Various Artists。
