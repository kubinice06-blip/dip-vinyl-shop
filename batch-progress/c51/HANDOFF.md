# c-51 交接（2026-08-31）：155 張走完雲端段

**這批可以接本機上傳了。** 雲端段能做的九項全部做完，剩下的四項是雲端**依規定
不能做**的（KV、Firestore、seed_cards、album_overrides），不是沒做完。

## 一、這批是什麼

c-51 補「代表作缺席」：卡池裡**已經有王牌卡**的藝人，卻沒有其餘任何一張招牌作。
155 張切成四個子批（39／39／39／38），同一藝人的多張卡一律落在同一子批
——hook 層要在 note 裡互寫排除條款，跨批就失效，寫作層會把同一個故事寫兩遍。

## 二、雲端段的產出，逐項對照 `ALBUM_ONBOARDING.md` 的完成標準

| 完成標準 | 狀態 | 位置 |
|---|---|---|
| 1. 封面 | **150/155 已在 CAA 找到**，5 張要掃圖 | `batch-progress/probe/covers.json` |
| 2. 三軸與 rarity | 已在卡單 | `desc-tools/batches/cards/c51*-cards.json` |
| 3. 頂點資格評估 | 已隨卡片帶出 | 同上 |
| 4. 固定簡介 | **155 張全部寫完並過機器 QA** | `desc-tools/batches/output/c51*-out-*.json` |
| 5. 固定試聽 | 已探測，見 `previews.json` | `batch-progress/probe/previews.json` |
| 6. 四處寫入與回讀 | **雲端不做**（REMOTE_RUNBOOK） | 本機 |

### 身分：155/155 全部有 rgMbid，格式全部合法

不是「盡力」而是全中。`consolidate.mjs` 的收斂器這批修過一個會讓 §1 硬規則作廢的
bug（兩支上游腳本一個產 camelCase、一個產 kebab-case，本檔只讀後者，於是合輯懲罰
從未生效，127 張裡 7 張把 Compilation／Live 當正規盤收了進去），並補了
`verify-mbid.mjs` 逐張拿 ID 回問 MB——**127/127 零錯配**。

### 封面：CAA 覆蓋率 150/155（96.8%）

`probe-covers.mjs` 拿 rgMbid 直接問 CAA，group 層落空才逐一試底下的 release
（**封面常常只掛在某一個 release 上**，只查 group 會系統性低估——ctw3 那次的教訓）。
逾時與 HTTP 錯誤分開記，不當成「查無」。

**要掃圖的 5 張**：齊豫《你是我所有的回憶》、Labelle《Pressure Cookin'》、
Dorival Caymmi《Caymmi e o Mar》、Derek Bailey《Solo Guitar Volume 1》、
小沢健二《球体の奏でる音楽》。
本機仍可先走 Bandcamp → Spotify（`ALBUM_ONBOARDING.md` §4 的前兩順位），
雲端只跑了 CAA 這一條。

### 簡介：155 張，字數 175–240，硬上限 260 全批無人觸及

五層產線全走完：研究（5 組）→ hook（2 組）→ 合併 → 寫作（2 組）→ 機器 QA。
`qa-check-research` 與 `fix-spacing` 八個輸出檔**全數零標記**。

`qa-batch out` 全批 7 筆標記：**6 筆同型誤報**（具名修飾語緊貼裸字串）、
**1 筆真陽性已改稿**（MC5 hook 寫「1950 年代」但研究稿只有「50 年代」）。
逐筆判定寫在 `qa-notes.md`，**本機不必重新判一次**。

## 三、本機接手前要先看的三份檔

1. **`rulings.md`** —— 主線已裁定的四件事：Jule Styne《Funny Girl》不適用
   作曲家掛名卡通則、thin 卡維持 180–240（含一個規格矛盾的分析）、
   Dorival Caymmi 維持單藝人寫法、三張年份更正已同步。
2. **`qa-notes.md`** —— 全批 QA 標記的逐筆判定，以及**三筆留給本機的研究層問題**：
   非常階段的團名由來因中文轉寫塌陷、Lightning Bolt 的 Metacritic 名次被當榜單、
   《Deeper Roots》的 keyTracks 與 facts 曲目對不上。
3. **`verify-mbid-report.md`** —— MBID 逐張回問 MB 的結果。

## 四、雲端段的已知缺口（照 `desc-tools/batches/README.md` 的既有說明）

**通論帳本讀不到。** `desc-restyle/progress.json` 不在版控內，雲端 clone 看不到，
所以這批只做到「批內不重複」（靠 `chk-hook-crossgroup.mjs` 擋跨組撞頭），
**跨批次的通論重複必須由本機在逐張審稿時把關**。

## 五、一個貫穿四批的產線問題，建議改規範

**寫作層與 hook 層的初稿一律超長，而且是單向的。**

| 批 | 寫作層初稿超標比例 | 中位超出 |
|---|---|---|
| c51a／c51b | 多數 | +40–50 |
| c51c | 19/20 與 14/19 | +45 |
| c51d | 16/19 與 14/19 | +40–45 |

hook 層的 note 同樣（中位超出 50–90 字）。五批下來沒有一次是低估反向的。

代理們的自述一致指向同一個原因：**拉丁專名與曲名比預期長**——一張常要點名
廠牌＋製作人＋兩三位樂手，`Much Too Young (To Feel This Damn Old)` 就吃 38 字元、
`Warner Bros. Records` 吃 20。預算表是按「幾件事」列的，但每件事的字元成本
差距可以到三倍。

**建議**：`writer-base.md` 與 `hook-base.md` 的字數段落改成「先列預算表，
且**專名逐一數字元**再分配格數」，而不是只寫上限等事後收。這批四個子批的
派工詞都把「先規劃再落筆」寫在最前面，仍然沒擋住——說明這不是提醒不夠，
是**估算方法本身缺一步**。

另外值得記的是：**收的方式一律是整格捨去，沒有人逐句削字**。這是對的，
削字會把句子磨成沒有主詞的殘句。各代理捨去了什麼都寫在交件回報裡，
本機若覺得某一格該留，回頭補比重寫便宜。
