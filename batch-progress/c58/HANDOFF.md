# c-58 交接（2026-09-02）：深掘冷門靈魂與放克 45 張走完雲端段

**這批可以接本機上傳了。** 雲端能做的全部做完，剩下的是雲端**依 REMOTE_RUNBOOK
不能做**的（KV、Firestore、`seed_cards.json`、`album_overrides`），不是沒做完。

## 一、這批是什麼

店主指示「廣度之外深度也要有，深掘冷門硬蕊的爵士、搖滾、靈魂、放克」的第一批。
**45 張、45 位藝人（零重複）**，年份 1968–2005。私壓福音靈魂
（Pastor T.L. Barrett & The Youth for Christ Choir）、高中放克樂團
（Kashmere Stage Band）、南方深靈魂（Lee Moses、Doris Duke、Eddie Hinton）、
自製自壓的地方樂團（Purple Image、Ripple、Black Nasty、Mighty Ryeders）。
曲風 soul 45、jazz 6、rock 2、hiphop 1、world 1、electronic 1。9 張自我同名。

**44/45 有考古廠牌的再發舉證**（Numero Group、Tidal Waves、Now-Again 這類），
與池中零撞卡。

## ⚠ 二、開批的診斷是錯的——這件事店主要知道

我開這條線的理由是「2,279 張裡只有 3 張 `obscurity=5`，全池最深的洞」。
**策展代理實掃卡池後推翻了它：池中的 soul 根本不是只有正典。**
Universal Togetherness Band、Otis G. Johnson、Willie Wright、Shira Small、Junei、
Skull Snaps、24-Carat Black、Black Heat、Starcrost、Faze-O、RAMP 全都在池裡，
Black Jazz 廠牌已收五張。

**那 3 張是評分問題，不是選片問題。** Otis G. Johnson《Everything - God Is Love '78》
——私壓冷門盤裡最有名的一張、Numero Group 再發過——冷門度給 **2**。
同時 electronic 有 124 張、classical 有 114 張拿到 5。

機制是結構性的：`ALBUM_ONBOARDING.md` 沒有寫 obscurity 1–5 的文字定義，
§3 把 pearl 綁在 **Last.fm listeners 低於 300**，所以這個軸實質上是聽眾數驅動的。
於是——**考古廠牌的再發會製造聽眾數**。Numero 把一張碟挖出來放上串流，
它就有了聽眾；而那正是我要求本批用來舉證「這張冷門盤確實重要」的同一份證據。
**證明它重要的東西，同時把它的冷門度分數壓下去。**

**結論：再加 45 張冷門靈魂盤，不會讓 `obscurity=5` 從 3 張變多**——新卡會拿到同樣的 2 分。
但這批本身是好卡，補的是**曲風的實質深度**，只是不會反映在那個數字上。

**2026-09-02 更新：店主已核可校準，方法定案為錨點制——見 `ALBUM_ONBOARDING.md` §0.8
與 `audits/obscurity-recalibration.md`（裁定第 89 條）。本批 45 張的三軸本機做的時候照 §0.8，
`ratings.source` 記 `manual:depth-rubric`。** 以下是校準前的原始分析，保留供對照。

**留給店主的決定（雲端不動線上資料）**：要不要重新校準 obscurity 軸。
目前它在不同曲風之間不可比——一張 Numero 再發的私壓靈魂盤拿 2 分、
一張沒人再發的電子作品拿 5 分，在「有多少人聽過」上或許真有差，
在「這張碟有多冷門」的直覺上並不合理。若要校準，`audits/` 應先做一份
「同等冷門程度、不同曲風」的對照樣本。

## 三、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **42/45（93%）**，3 張要掃圖 | `c58/caa.json` 的 `art` 欄 |
| 2. 三軸與 rarity | **雲端未做**（需 `/album-rating`），且見上節 | 本機 |
| 3. 頂點資格評估 | **雲端未做** | 本機 |
| 4. 固定簡介 | **45 張全部寫完並過機器 QA** | `desc-tools/batches/output/c58-out-{1,2}.json` |
| 5. 固定試聽 | 已探測，**19/45 ready** | `c58/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做** | 本機 |

### 身分：45 張全部釘住 release-group MBID（其中 1 張經 `fix-rgmbid.mjs` 修正）

### 封面：42/45，全部來自 CAA

**3 張缺封面**（要掃圖）：Doris Duke《I'm a Loser》、
The Masqueraders《Everybody Wanna Live On》、Ollie & The Nightingales（同名）。

### 試聽：19/45 ready（42%）——七批裡最高

七個 storefront（us／gb／jp／de／fr／nl／br）全試過。命中率高正是因為
考古廠牌把這些碟放上了串流——與上節的機制是同一件事的另一面。

## 四、上架前必須先看 `rulings.md`

主檔在 `c53/rulings.md`（42 條）。與 c-58 直接相關的：

1. **第 35 條：策展層的 `curatorWhy` 出現五處會直接寫進簡介的事實錯誤。**
   這批特別嚴重，原因寫在該條底下——私壓盤的網路二手資料本身就充滿轉抄。
   研究層補進來的材料（內頁、廠牌檔案）比再發史更有料。
   **本機改寫時不要回頭採用原始 `curatorWhy` 的說法。**
2. **第 36 條：變音符號兩張巴西盤統一保留 ç**（Dom Salvador《Som, Sangue e Raça》、
   Banda Black Rio《Maria Fumaça》），ASCII 形式歸 `queryAlias`。
   「怕下游腳本出錯」不是改盤名的理由。

**五處互斥條款已在寫作層逐條落實**，本機改寫時要維持：
Nolan Porter 不列那兩首 45 轉與 Joy Division；Purple Image 寫 A 面四軌／
B2 15:24 佔整面、復刻只寫 Tidal Waves 2019；Voices of East Harlem 不出現
〈Cashing In〉；Doris Duke 只寫梅肯 Capricorn；Sandra Phillips 獨家承擔鏡像敘述、
Sandra Wright 標明 1974 錄音／1989 問世與 Sheffield 的 Broadway Sound。

寫作層另回報為守字數捨棄的次要項目（T.L. Barrett 會眾只留 Maurice White、
Bobby Patterson 只留 Fontella Bass、Eddie Hinton 略去銷量與〈Breakfast in Bed〉、
Fabulous Counts 略去離團原因）。**事實無一新增或改寫**，要補回需放寬字數上限。

## 五、簡介產線的數字

| | out-1 | out-2 | 合計 |
|---|---|---|---|
| 卡數 | 23 | 22 | **45** |
| 字數範圍 | 214–235 | 217–237 | 214–237 |
| 超過 240 | 0 | 0 | **0** |
| `qa-check-research` | 0 | 0 | **0** |
| `fix-spacing` | 0 | 0 | **0** |

`qa-batch out c58` 與卡單 45 張相符、>260 為 0。`chk-hook-crossgroup c58` 通過
（hook 加權 18–37、note 296–350）。key 順序與輸入一致、hook 全部原封當第一句。
研究層 **45 張全部 `status: full`**。無合輯，不涉 §5.6 例外。

### hook 重複的問題是結構性解決的，不是靠改寫

這批 45 張的 note 裡**只有 11 張帶再發條款**，其餘 34 張若都從「某某廠牌再發」
起頭就會全批同調。解法是先盤出每張卡真正獨有的錨點（自壓的通路、教會的規模、
高中樂團的比賽紀錄、樂手後來的去向），再分派 hook。
`chk-hook-crossgroup` 的通過是這個分派的結果。
