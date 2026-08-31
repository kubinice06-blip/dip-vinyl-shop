# c-SEA 交接（2026-08-31）：東南亞音樂 99 張

**狀態：雲端段全部完成。** 99 張走完研究 → hook → 寫作 → 機器 QA 四層。

## 一、這批是什麼

**卡池裡幾乎沒有東南亞。** 這批補印尼、菲律賓、泰國、越南、馬來西亞、新加坡，
99 張切成三個子批（各 33 張）。與 c-51 最大的不同是：c-51 的讀者多半聽過那些
藝人的別張作品，**這批每一張都是讀者對那個名字的第一次接觸**，所以派工詞一律
禁止「某某的東南亞版」這種類比。

## 二、逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| | cseaa | cseab | cseac | 合計 |
|---|---|---|---|---|
| 卡數 | 33 | 33 | 33 | 99 |
| MBID | 33 | 33 | 33 | **99/99** |
| 封面（CAA） | 25 | 27 | 22 | **74/99（75%）** |
| 固定試聽（Apple） | 10 | 5 | 10 | **25/99（25%）** |
| 研究層 | ✓ | ✓ | ✓ | 99 |
| hook 層 | ✓ | ✓ | ✓ | 99 |
| 寫作層 | ✓ | ✓ | ✓ | **99** |

### 寫作層成果

| | 字數區間 | qa-check-research | fix-spacing | qa-batch out |
|---|---|---|---|---|
| cseaa | 164–239 | 0 | 0 | ✓ |
| cseab | 175–239 | 0 | 0 | ✓ |
| cseac | 173–239 | 0 | 0 | ✓ |

硬上限 260 全批無人觸及；六張 thin 卡（Juan de la Cruz Band《Up in Arms》、
Sanisah Huri、Waldjinah、Chaweewan、Onuma、เพลิน พรหมแดน）全部落在 120–180。

## 三、封面與試聽：這批的覆蓋率遠低於 c-51，而且那是真的

|  | c-51 | c-SEA |
|---|---|---|
| CAA 有圖 | 150/155（97%） | 74/99（75%） |
| Apple 試聽 ready | 99/155（64%） | 25/99（25%） |

**兩條路都走到底了，不是查法問題。**

- **封面**：拿現成的 rgMbid 直接問 CAA，group 層落空才逐一試底下的 release
  （封面常只掛在某個 release 上，只查 group 會系統性低估——ctw3 的教訓）。
- **試聽**：**逐張試多國 storefront**，c-SEA 的順序是
  `id → ph → th → vn → my → sg → us → gb → jp`。這一步是關鍵：
  c-SEA 的 25 張命中裡有 **25 張是在非美國目錄找到的**，只試 `us` 幾乎全軍覆沒。
  （命中的 storefront 統計會偏向 `id`，那是因為 `id` 排第一、命中就停，
  **不代表印尼目錄最全**。）

### 兩項皆落空的 19 張（本機要掃圖＋另找試聽）

Ebiet G. Ade《Camellia I》、Bong Peñera《Batucada sa Calesa》、
คาราบาว《เวลคัมทูไทยแลนด์》、Duo Kribo《Duo Kribo (OST)》、
Mike Hanopol《Buhay Musikero》、เพลิน พรหมแดน《อาก๋งกับอาม้า》、
Banyuhay《Tayo'y Mga Pinoy》、Tony Scott《Djanger Bali》、Fariz RM《Sakura》、
Titiek Puspa《Doa Ibu》、Elvy Sukaesih《Menghitung Bintang》、
Grace Nono《Tao Music》、Khánh Ly《Hát Cho Quê Hương Việt Nam 1》、
Rien Djamain《Api Asmara》、Dick Lee《The Mad Chinaman》、
The Rollies《Dansa Yok Dansa》、Harry Roesli Gang《Philosophy Gang》、
Abbhama《Alam Raya》、The Quests《Questing》

本機仍可走 Bandcamp → Spotify（§4 的前兩順位），雲端只跑了 CAA。

### 探測器抓到自己的兩個誤配，已修

Apple 把單曲與 EP 標成「某某 - Single」「某某 - EP」，摺疊後只多 6–7 個字元，
**剛好落在長度差容忍範圍內，於是單曲條目會冒充專輯**。實測兩筆：
Elvy Sukaesih《Menghitung Bintang》配到**一軌的單曲**、
f(x)《4 Walls》配到**四軌的日本 EP** 而不是十一軌的正規盤。
已加擋（卡片本身是 EP 時卡名也會帶那個字，所以只擋「Apple 有、卡片沒有」），
兩張重測後都正確落回 unavailable。

### 三筆要人工看版本的

| 卡 | 卡單年 | Apple 年 |
|---|---|---|
| The Upsetters《Return of the Super Ape》 | 1978 | 1976 |
| Chế Linh《Tiếng hát Chế Linh 1》 | 1974 | 1972（本卡年份本來就有兩說） |

**只有淨化版的兩張**（§6 明訂可收但要寫明）：Amy Winehouse《Frank》、
Dr. Dre《Compton》。**四張有碟抓不到預覽**：Stromae《Cheese》、
The Art of Noise《In Visible Silence》、La Düsseldorf《La Düsseldorf》、
Kantata Takwa《Kantata Takwa》。

## 四、卡池值更正十八筆＋一筆身分更正

見 `apply-label-fixes.mjs`（十八筆廠牌與一筆曲風，冪等，原值對不上會拋錯停手）
與 `fix-lamphloen.mjs`（一筆身分）。裁定理由逐條寫在 `rulings.md`。

**廠牌錯有三種同型，都源自「拿到的是某處看到的廠牌，不是原盤的」**：
1. **沿用前一張**：Koes Plus（Melody 是 1969 首作的）、Dara Puspita（Mesra 是 1965／66 的）
2. **拿重發當首發**：Yano（BMG 是 1998 重發，首發是 Alpha）
3. **把製作人當發行商**：Sheila Majid（Roslan Aziz 是製作人，EMI 才是發行商）

**兩張卡片與 MBID 描述的不是同一張唱片**，處置不同：

| 卡 | 症狀 | 處置 |
|---|---|---|
| Joey Ayala《Panganay ng Umaga》 | 釘 1991 重發，原盤 1985 不在 MB | **維持重發**（曲目相同，作品沒跑掉） |
| พุ่มพวง《ลำเพลิน》 | 釘 2017 選輯，三成曲目來自 1985 另一張 | **改成選輯＋§5.6** |

**通則**：`mbFirstRelease` 與卡片 `year` 差距大要當**身分問題**查，
但不能只看數字——The Mighty Diamonds《Deeper Roots》的 group 只掛 2002 再版，
卻確實就是 1979 那張作品。**要看釘住的 group 內容是不是同一張唱片。**

## 五、非英文來源是這批的主力，這點值得寫進規範

我在 cseaa 的派工詞裡用「英文維基是 stub」判定 Rolling Stone Indonesia 150 大榜
查不到，要研究層只寫進 notes。**cseab 的研究層推翻了**——印尼文維基有完整的
150 項清單並註明刊期，逐項覆核四個名次全中。

這批一半以上的主要來源是印尼文、越南文、泰文、他加祿文與馬來文。
**用英文維基的覆蓋率判斷「有沒有來源」會系統性低估。**
cseab 與 cseac 的派工詞都已改成明寫「允許並鼓勵非英文來源」。

**我的派工詞假設在這批被下游推翻五次，五次都以來源為準**：
上述榜單、Bhaskara 與 Indra Lesmana 查無關係、Ian Antono 早在首輯就在團、
Dick Lee 在日本賣得比新加坡好（反向證據較強）、The Rollies《Kemarau》沒有主唱更迭。

## 六、雲端段的已知缺口

**通論帳本讀不到**（`desc-restyle/progress.json` 不在版控內）。這批只做到
「批內不重複」，**跨批次的通論重複要由本機在逐張審稿時把關**。

這批的通論分配特別密——同一個區域的 99 張很容易寫成同一篇，所以每張的
研究層或 hook 層 note 都標了「本卡分到的切入點」。**本機審稿時可以直接讀那一行**
判斷有沒有撞題，不必自己重建帳本。
