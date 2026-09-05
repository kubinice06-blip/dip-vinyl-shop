# c-94 策展層裁定（2026-09-05，搖滾正典目錄深度 II：金屬／硬蕊／龐克／emo／日本另類）

依 2026-09-02 店主下放（「不用我裁定 你自己決定」），以下八條由策展層自決並落檔。
判準沿用既有三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1. a／b 怎麼分：**按場景分，不按國別或年代分**

派工單說「a／b 怎麼分你自己決定」。

**裁定**：
- **a 組＝金屬與硬蕊**（23 張、18 位）：Voivod 2、Accept 2、Deafheaven 2、Killswitch Engage 1、
  Eyehategod 2、Deathspell Omega 2、King Diamond 1、Anthrax 1、Burzum 1、Enslaved 1、Neurosis 1、
  Godflesh 1、Kyuss 1、Isis 1、Cult of Luna 1、Cathedral 1、Khanate 1、Uriah Heep 1。
- **b 組＝龐克、emo、60–70 年代美國另類與日本另類**（20 張、16 位）：Refused 1、At the Drive-In 2、
  American Football 1、The Microphones 2、Bikini Kill / Huggy Bear 1、Jawbreaker 1、Mineral 1、
  Big Brother & the Holding Company 1、Gene Clark 2、Love 1、Aphrodite's Child 1、
  Flower Travellin' Band 2、FRICTION 1、ゆらゆら帝国 1、ザ・スターリン 1、RCサクセション 1。

理由：骨幹名單裡的 Big Brother／Gene Clark／Love／Aphrodite's Child 四位其實是 1960 年代的迷幻與
folk-rock，既不是金屬也不是龐克。把它們與日本另類、emo 放在同一組，是因為**b 組的共同點是
「非金屬的搖滾正典目錄」**，而不是任何一種曲風標籤。硬要按年代或國別切，會把 Flower Travellin' Band
與 FRICTION 拆到兩組，那兩位在池中的形狀（一張頂點卡＋一張補充）完全一樣。

## 2. American Football 2016 那張的盤名取《American Football (LP2)》

**問題**：這個樂團的四張正規盤（1999／2016／2019／2026）在 MB 上**標題全部是「American Football」**，
而池中已有 1999 年那張（掛名與盤名都是 American Football）。照 MB 原樣取，`chk-prop` 會直接判撞卡。

**裁定：卡片盤名取《American Football (LP2)》。** 三個依據：

1. **池中早有同形狀的先例**——`Peter Gabriel (Car)`／`Peter Gabriel (Security)` 兩張就是用括號區分
   自我同名系列。裁定第 132 條為此把 `dedup-crossbatch.mjs` 的括號剝除從無條件改成 `DECOR` 白名單制，
   並明文寫「**括號裡正是區別兩張碟的東西**」。所以這個寫法不只是被容許，是工具已經為它改過。
2. **LP2 不是自創字串**（第 26／31 條禁止自創別名）——**Apple 自己的 collectionName 就是
   《American Football (Lp2)》**（collectionId 1651327242），LP3 那張同理（1651293928）。
3. **第 45 條在這裡沒有管轄權**。第 45 條處理的是「原盤自我同名、再發正式改名」（Debris'、
   Opus Avantra、Ed Askew 三個實例），這裡是「同一位藝人四張自我同名」，是第 132 條的形狀。

**可逆性**：改的是卡單一個欄位，`rgMbid` 不變、封面走 CAA 不受影響，只會掉試聽比對的方便性。

## 3. Gene Clark 1971 那張取《White Light》，不取 MB 的 release-group 標題《Gene Clark》

**事實**：MB 的 release-group `b0bf102b` 標題是《Gene Clark》，美國原盤 A&M SP 4292 也是自我同名；
但**同一個 release-group 底下有一筆 release 的標題就是《White Light》**（A&M 493 209-2），
Apple 的唯一條目也是《White Light (Remastered)》（1443625305）。

**裁定：取《White Light》**，這是第 45 條寫明的適用範圍（原盤自我同名、後來被再發正式改名、
改名後的盤名已成為流通的通行名），且第 91 條已定「RG 標題與卡片盤名不必相等」。
照原名收會做出一張 artist 與 album 都是「Gene Clark」的自我同名卡——§1 明文把自我同名列為高風險，
而且那個字串在 Apple 上必然查不到這張碟，正是第 45 條第 3 點論證過的代價。

**與同批 Big Brother 那張的分界**：Big Brother 首張**沒有被改過名**，所有再發都叫
《Big Brother & The Holding Company》，所以它照第 6 條走原名、`selfTitled: true` 收下；
第 45 條管的是「兩個不同的盤名選哪一個」，不是「自我同名卡一律迴避」。

## 4. FRICTION《Skin Deep》的掛名用 FRICTION，不用 MB 的 artist-credit「2nd Friction」

MB 對 `19c6613b`（1982 CBS/Sony 28AH 1457）記的 artist-credit 是 **「2nd Friction」**。

**裁定：掛名取通行名 FRICTION**（與池中既有的《軋轢》《Replicant Walk》兩張一致），
credit 變體歸 `queryAlias` 與 `mbNote`。依據是第 11 條：credit 是發行方在那一版上怎麼印的，
卡片掛名要的是這個對象的通行名；照 credit 收會把同一個樂團在池裡拆成兩個鍵（第 49／150 條的分裂鍵）。

同樣的處理套用在 The Microphones（MB 兩張的 credit 分別是「the Microphones」與「Microphones」）、
Big Brother（credit 是「…featuring Janis Joplin」）、Gene Clark（credit 是
「Gene Clark with The Gosdin Brothers」）四處。

## 5. King Diamond 那張的盤名取 ASCII 直引號的《"Them"》

MB 的 release-group 標題與多數 release 用彎引號《“Them”》，另有兩筆 release 用直引號。

**裁定：取 ASCII 直引號版，引號保留。** 依第 50 條（同一個盤名的兩種寫法，採原盤封面的寫法，
且標點差異在外部搜尋裡會被正規化掉、命中率不受影響）。**引號不去掉**，因為去掉之後盤名只剩
一個極常見的英文代名詞，是本批字串比對雜訊最高的一筆——去引號的裸 `Them` 已寫進 `queryAlias` 供查詢用。

## 6. はっぴいえんど 本批零收，因為它**已經滿了**——順帶抓到池中兩組重複卡

派工單把 はっぴいえんど 列為骨幹並警告掛名分裂（`Happy End` 2 張＋`はっぴいえんど` 3 張）。
實掃 `seed_cards.json` 全 14,424 列＋回問 MB 藝人 `4bd19b19` 的完整 browse 之後，**結論是不必收**：

| 池中 | MB release-group |
|---|---|
| はっぴいえんど《はっぴいえんど》(1970) | `562cca67` 1970-08-05 Album |
| はっぴいえんど《風街ろまん》(1971) ／ **Happy End《Kazemachi Roman》(1971)** | `14cfc058` 1971-11-20 Album |
| はっぴいえんど《HAPPY END》(1973) ／ **Happy End《Happy End》(1973)** | `c66cc3a8` 1973-02-25 Album |

**這個團一共只有三張正規盤，三張全部在池中**；MB 名下其餘條目是《CITY》(1973 Compilation)、
《Singles Happy End》(1974 Compilation)、三張現場輯與一張 BOX。

**同時抓到兩組重複卡（留給本機，雲端不動 `seed_cards.json`）**：
- **`Happy End《Kazemachi Roman》` 與 `はっぴいえんど《風街ろまん》` 是同一張碟**（RG `14cfc058`）；
- **`Happy End《Happy End》` 與 `はっぴいえんど《HAPPY END》` 是同一張碟**（RG `c66cc3a8`）。
- 另一組同形：**`Big Brother & The Holding Company《Cheap Thrills》` 與
  `Big Brother and the Holding Company《Cheap Thrills》` 是同一張碟**（RG `02de8887`），兩筆都掛頂點卡 hall。
- 再一組：**`BOREDOMS`（2 張）與 `Boredoms`（2 張）**是同一個藝人的兩個鍵。

這正是第 49 條第一種形狀（池子自己兩種文字都用）的又一次應驗，且**這次是重複卡不只是分裂鍵**——
本機正規化掛名時要一併刪掉重複的那三張，記進 `audits/pool-artist-name-splits.md`。

## 7. Bikini Kill 也滿了，但那張 split 是真的缺口——掛名走第 16 條的斜線

Bikini Kill 在 MB 上的 `primary-type=Album` 條目只有三個：《Pussy Whipped》(1993，池中已有)、
《Reject All American》(1996，池中已有)、以及 1992 年與 Huggy Bear 各出一面的
《Yeah Yeah Yeah Yeah / Our Troubled Youth》。其餘是 Demo、Compilation、EP 與 Single。

**裁定：收那張 split，掛名寫成 `Bikini Kill / Huggy Bear`。**
依第 16 條（多藝人拼盤／split album 一律用 " / " 分隔，依原始發行的掛名順序），
而 MB 的 artist-credit 恰好就是同一個字串，兩邊對得上、不需要額外的 alias。
順帶把 Huggy Bear 帶進池子（實掃「Huggy」池中零筆）。

## 8. 池中 0 張的藝人不在本批收錄範圍——NYHC 那一塊列為後續候選

派工單允許自加「**有王牌卡、池中卻只有 1–3 張**」的同型藝人。實掃時發現硬蕊那一塊有一整段
**池中 0 張**的正典：Cro-Mags、Agnostic Front、Youth of Today、Gorilla Biscuits、Integrity、
Earth Crisis、Snapcase、Poison Idea、Cock Sparrer、The Ruts、Richard Hell、Liliput／Kleenex、
Bratmobile、Heavens to Betsy、Team Dresch、Le Tigre、Cap'n Jazz、Texas Is the Reason、Unwound、
Drive Like Jehu、Hoover、Q and Not U、Faraquet、Bitch Magnet、Karate、Hot Water Music。

**裁定：本批不收。** 這十批的 `lineType` 是**目錄深度**——判準寫得很清楚是
「把已經在池裡、卻只有一兩張的正典藝人補到該有的深度」，0 張的藝人是**覆蓋**的缺口不是**深度**的缺口。
第 69 條已經處理過同一個形狀（Bo Hansson 池中零張，但那是廣度的缺口不是深掘的，因此不塞進深掘批），
方向相反、道理一樣：**硬塞會讓 `lineType` 的標示失去意義。**

Cro-Mags《The Age of Quarrel》(1986，Apple us 1474115345 與 1533125261 兩筆均 15 軌) 與
Agnostic Front《Victim in Pain》(1984) 的 MB 與 Apple 都已查過、資料齊全，
**列進後續補遺批的現成候選**，不必重查。

## 9. 曲風桶：黑金屬、sludge、doom、hardcore 一律 `rock`

派工單已指定，這裡只記一句以免下游疑惑：Deathspell Omega、Eyehategod、Deafheaven、Burzum、
Khanate、Godflesh 全部 `["rock"]`，不自創 metal／metalcore／black-metal 桶。
兩張帶第二桶的例外有明確理由：The Microphones 兩張加 `folk`（與池中既有的《The Glow Pt. 2》
《Mount Eerie》一致）、Gene Clark 兩張加 `folk`（與池中《No Other》一致）、
Love《Four Sail》加 `pop`（與池中《Da Capo》《Forever Changes》一致）、
Aphrodite's Child《End of the World》加 `pop`（與池中《It's Five O'Clock》一致）、
Big Brother 首張加 `blues`（與池中《Cheap Thrills》一致）。
**依據是「跟著池中同藝人既有卡的曲風欄走」**，不是我另外判的。

## 10. 年份與 MB `first-release-date` 脫鉤的三張，一律照第 95 條

`rgMbid` 是身分鍵不是年份來源。本批三處：

| 卡 | 卡單年 | 分歧 |
|---|---|---|
| Eyehategod《In the Name of Suffering》 | **1990** | MB 1990（法國 Intellectual Convulsion SPASM III 原盤）／Apple 兩筆都記 1992（Century Media 接手那年） |
| Isis《Celestial》 | **2000** | MB 2000-07-19（XE Hydra Head HH666-59）／Apple 兩筆都記 2001-12-19 |
| At the Drive-In《Acrobatic Tenement》 | **1996** | MB 1996-08-18（US Flipside FLIP94）／Apple 記 1997-02-18 |

三張都取 MB 有 release 佐證的那一年，`risk` 已寫明分歧，**行文一律不得正面斷言發行年**（第 18／46 條）。
另 Cult of Luna《Vertikal》的 Apple 記 2012-01-01、Voivod《Nothingface》記 1989-01-01、
Mineral《EndSerenading》記 1998-01-01 三處是 **`YYYY-01-01` 佔位日期**（第 140 條附錄），
不是年份分歧，`yearDrift` 算不出來，逐張複檢要看 ℗ 年與軌數。
