# dip 黑膠卡牌遊戲 — 設計藍本

> 這是一份「會慢慢長大」的設計文件，不是規格定稿。實作前先在這裡把規則想清楚，分階段建。
> 現況基礎：前台 SPA（index.html）＋ Cloudflare Worker（dip-vinyl-worker）＋ Firestore（price-manager-e8846）。

---

## 1. 核心概念

> **每一張專輯 = 一張卡。** 玩家透過選歌遊戲「抽到」專輯，收進卡冊，未來可拿卡對戰。

- **卡面**：專輯封面（Spotify）、藝人、專輯名。
- **數值**：冷門度、經典度、入耳難易度（皆 1–5，＋未來可擴充）。
- **稀有度**：由**所有數值加總**決定（總分越高越稀有），**不是單看冷門度**。
- **抽卡來源**：心情選歌 / 類型挑片 / 直接來一張 —— 每次推薦的專輯就是一次「抽卡」。

---

## 2. 資料架構（最重要：未來加數值不用動到玩家舊卡）

### 原則：擁有 與 數值 分離
- **玩家收藏**只記「我擁有哪張卡」：`cardId`、取得時間、張數。**不存任何數值。**
- **卡牌數值**存在一份**共用目錄**（＝ Worker 的 KV 快取，已存在），顯示時即時查。

### 為什麼這樣設計
未來新增第 4、第 5 個數值時 → **只改目錄一處，所有玩家、所有已收藏的舊卡立刻都有**，零遷移。

### 缺值怎麼補：懶人補值（lazy backfill）
數值**不在抽卡當下焊死**，而是在卡片「被顯示時」才向目錄要：
1. 顯示卡片 → 跟 `/album-rating` 要數值。
2. Worker 看 KV：若是舊版、缺新欄位 → **現場算出缺的、寫回 KV**。
3. 回傳完整數值 → 卡片補上。

> 「空值」只存在於「卡更新後第一次被看到」的那一瞬間，補完後全體永久共用。顯示前先 `await` 完整數值即可讓玩家無感（或該格放 shimmer 動畫）。

### cardId 規則
`artist|album` 正規化小寫（與 Worker KV、`/album-rating` 同一把 key），確保目錄與收藏對得起來。

---

## 3. 玩家身分（不做傳統註冊）

- **起步：Firebase 匿名登入** — 進站自動取得隱形 UID，零註冊就能收藏、存雲端。
- **之後：可綁定 Google/Apple** — 升級匿名帳號做跨裝置同步、可找回。Firebase 全包，不自己寫密碼系統。
- 需在 Firebase Console 啟用：Authentication → 匿名登入。

---

## 4. 卡牌資料模型

### 即時查目錄（會變動、屬於「卡本身」）— 不存玩家收藏
- `coverUrl`、`spotifyUrl`（來自 `/spotify-search`）
- `obscurity` 冷門度（Last.fm listeners）
- `classic` 經典度、`accessibility` 入耳難易度（AI 依樂評共識）
- 未來新增數值都放這層

### 凍結快照（屬於「這次抽卡事件」）— 存玩家收藏
- `cardId`、`obtainedAt`（取得時間）、`count`（重複張數）
- `pulledRarity`（選配）：抽到當下的稀有度，若你希望老卡稀有度不隨聽眾數變動就存它；否則稀有度也走即時查
- `serial`（選配）：流水編號／第幾張抽出

> 判斷原則：**會變且屬於卡本身的 → 走目錄即時查；屬於抽卡事件的 → 存收藏凍結。**

---

## 5. 稀有度（五階，冷門度降權版）

> **為何不用三項加總？** 遊戲卡池幾乎全是冷門盤，冷門度（obscurity）近乎常數（多半 4–5），拿它當主力會讓所有卡卡在同一格（實測全是獨特）。故改由**經典度＋難度**決定稀有度，冷門度只在「極冷門(=5)」時 +1 加成。

稀有度 **score＝經典度 classic ＋ 難度 accessibility ＋（冷門度=5 則 +1）**（範圍 2–11），越高越稀有。順位高→低：

| score | 稀有度 | 顏色 |
|---|---|---|
| —（無數值） | 殿堂 Hall | 🩶 銀 |
| ≥10 | 傳奇 Legendary | 🟠 橘 |
| 8–9 | 史詩 Epic | 🟣 紫 |
| 6–7 | 獨特 Uncommon | 🟢 綠 |
| 4–5 | 稀有 Rare | 🔵 藍 |
| ≤3 | 普通 Common | ⚪ 灰 |

> **三張「頂點卡」（各把一個數值軸衝到 7 星，互斥、抽中率各 ~3%）：**
> | tier | 名稱 | 衝 7 星的軸 | 判定方式 | 邊框（掃光） | 旗標 |
> |---|---|---|---|---|---|
> | `hall` | 殿堂 | 經典度 | AI 推公認神作（經典模式） | 亮銀 `--silver-shine` | `hall:true` |
> | `pearl` | 遺珠 | 冷門度 | 極冷門模式 → **真實聽眾數驗證**（Last.fm 累積 < `ULTRA_OBSCURE_MAX_LISTENERS`，目前 300）才升格 | 暗黑油彩 `--oil-shine` | `pearl:true` |
> | `heresy` | 異端 | 入耳難易度 | AI 推極難入耳的前衛/噪音怪盤（異端模式，主觀軸不驗數據） | 暗赤血光 `--crimson-shine` | `heresy:true` |
> 互斥順序：`classicMode → obscureMode → heresyMode → popularMode`（見 `getGpResult` 內）。設定集中在 `SPECIAL_TIERS`、`ULTRA_OBSCURE_MAX_LISTENERS`（index.html）。註：Spotify「每月聽眾」API 不公開，遺珠用 Last.fm 累積聽眾數（worker `/album-rating` 的 `_listeners`）當代理。
> **新手禮：** 剛註冊玩家可免費抽一張隨機殿堂卡，**僅一次**。從 `WELCOME_HALL_ALBUMS` 公認神作名單隨機挑，存成 `hall` 卡，並在 `users/{uid}.welcomeHallClaimed` 標記。卡冊頁（空/非空都會）頂部顯示「🎁 新手禮」橫幅，按鈕觸發 `claimWelcomeHall()`。
>
> **殿堂（銀）= 最稀有、沒有數值。** 不是由 score 決定，而是「經典模式」抽到的公認殿堂神作（OK Computer 等級）才會是殿堂卡。經典模式觸發機率約 3%（`Math.random() < 0.03`），抽到時結果頁顯示銀色「殿堂級」徽章、不顯示星數；收進卡冊時存 `hall: true`，卡冊以銀框＋銀字呈現、無星數。
> **流行模式（普通卡來源）：** 另約 5% 機率（`popularMode`，與經典模式互斥）改推「大眾耳熟能詳的流行常見盤」（Ed Sheeran / Taylor Swift / 周杰倫那種大紅等級）。這類盤冷門度低、難度低、經典度也不高，score 天生低 → 多半落在普通／稀有，用來增加低階卡出現率、平衡稀有度分布。不需特殊標記，走正常 score 計算。
> 另：可在 `RARITY_OVERRIDES`（index.html）手動指定某藝人的稀有度（目前 `dollar brand / abdullah ibrahim → epic`），優先於 score 計算。

> 註：依用戶指定，「獨特綠」順位高於「稀有藍」。
> 例：classic5＋access5＋冷門5 → 11 → 傳奇；classic5＋access3 → 8 → 史詩；classic3＋access2 → 5 → 稀有。
> 程式：`rarityFromRatings()`（index.html），門檻為 config 可調。

### 門檻調校（重要）
`card_catalog` 已記錄每張被抽到的卡，**累積一段時間後可拉真實 score 分布來微調門檻**，確保五色都出現且「越高級越少」。冷門度降權後若仍偏某一格，主要調 classic／accessibility 的門檻即可。

### 未來加數值
若加到第 4、5 個數值（總分上限變 20/25），改用**比例分數** `總和/(數值數×5)` 當門檻，加幾個數值都不必重設。

> 門檻寫成 config，方便調。稀有度由數值即時算出（走目錄），所以加數值後**舊卡稀有度也會自動跟著重算**。

---

## 6. 抽卡 / 取得（Gacha）

- **MVP**：沿用現有「直接來一張」等推薦結果 → 結果頁加「收進卡冊」按鈕，寫進 Firestore。
- **可選深化（之後再說）**：每日免費抽、重複卡轉碎片、卡包、保底機制。起步不做經濟系統。

---

## 7. 卡冊 / 圖鑑

- 新分頁「我的卡冊」：顯示已收藏卡，依稀有度上色／排序，標重複張數。
- 數值即時走目錄（含懶人補值）。
- 之後可加：篩選（曲風/稀有度）、收集進度、圖鑑空格（未收藏顯示輪廓）。

---

## 8. 對戰系統（PvE，規則定稿 v2 — 2026-06-25）

> 本節為「專輯卡牌對戰」完整規則。單機網頁、單人對電腦（PvE）、雙方同步回合制。
> 欄位沿用既有目錄：`classic`(經典度)、`obscurity`(冷門度)、`accessibility`(入耳難度，**高＝越難入耳/越前衛**)。

### 8.1 基礎參數
- **勝利條件**：雙方起始「品味聲望（HP）」**30 點**，先把對手扣到 ≤0 者勝。
- **卡冊 / 牌組 / 牌庫**（三層分離）：
  - **卡冊**＝玩家全部收藏（＝既有 `collections/{uid}/cards`），是資產、不直接上場。
  - **牌組**＝開戰前從卡冊挑 **20 張**組成。
  - **牌庫**＝牌組洗牌後的抽牌堆，對局抽牌一律從牌庫抽。
- **牌組限制**：固定 20 張；同名常規卡 ≤2 張；王牌（單軸 7）整副 ≤1 張；只能放卡冊實際擁有的卡。
- **手牌**：起手 5 張；每回合開始抽 1；回合結束手牌 >7 須棄到 7。

### 8.2 卡牌數值
- 常規卡三軸 `classic` / `obscurity` / `accessibility`，單軸上限 **5**。
- **王牌（單軸 7）＝既有頂點卡旗標**，對戰用三圍如下（卡冊顯示端可仍不秀數值，數值只在對戰生效）：

| 旗標 | 卡名 | 對戰三圍（classic/obscurity/accessibility） |
|---|---|---|
| `hall` | 殿堂 | **7 / 1 / 1** |
| `pearl` | 遺珠 | **1 / 7 / 1** |
| `heresy` | 異端 | **1 / 1 / 7** |

### 8.3 雙循環文化邏輯（核心）
每回合雙方各打 1 張卡，並宣告一項「主打屬性」。雙方同時亮牌後，依序結算兩階段。

**相生（自我增益，循環：經典 → 冷門 → 入耳 → 經典）**——本回合宣告屬性完美接續上一回合者觸發：
- **【品味拓荒】** classic → obscurity：聽透大眾名盤後轉挖地下私盤。
- **【閾值突破】** obscurity → accessibility：常規結構已滿足不了，走向極端實驗。
- **【前衛收編】** accessibility → classic：極端解構後返璞歸真，重新確立經典價值。
- 加成：2 連鎖 **+2**；3 連鎖（完美連段）**+5**；中斷或屬性重複 → 連鎖歸零。平手回合連鎖仍累積。

**相剋（對手壓制，循環：冷門 剋 經典 → 經典 剋 入耳 → 入耳 剋 冷門）**：
- **【品味突襲】** obscurity 剋 classic：邊緣稀有對主流名盤的「拒絕通俗」特攻。
- **【大眾共鳴】** classic 剋 accessibility：歷史地位壓制前衛晦澀。
- **【降維打擊】** accessibility 剋 obscurity：硬實力與混亂拆穿地下資訊差。

> **相生與相剋方向相反**（相生 classic→obscurity；相剋 classic→accessibility），所以照相生鋪連段不會正好餵給對手相剋方向，避免「順著走＝被預判」的死亡螺旋。

### 8.4 傷害結算
最終面板數值 ＝ 卡牌基礎數值 ＋ 連段加成。比對雙方宣告屬性：
- **相剋時**：剋制方 **+4 破防**，傷害 ＝（剋制方最終 +4）−被剋方最終；若 ≤0 仍**保底 1 點**。
- **無相剋／同屬性**：純比數值，傷害 ＝ 勝方最終 −敗方最終；平手無傷害。

### 8.5 王牌被動
- **共通【霸權】**（hall/pearl/heresy）：作為被剋方時，對手**不得 +4 破防**（傷害改純數值差結算，亦無保底 1）。
- **殿堂【眾望所歸】**：打出回合，**對手本回合最終面板數值 −2**（連段加成後、傷害前計算，最低 0）。攻防一起輾。
- **遺珠【私盤特攻】**：作為剋制方時，破防加成 +4 → **+6**。
- **異端【終極解構】**：打出時立即**歸零對手當前相生連鎖**；於階段一**之前**結算，故對手本回合即使屬性接得上也拿不到相生加成。

### 8.6 回合流程
1. **抽牌**：各抽 1；牌庫已空 → 觸發疲勞（見 8.7）。
2. **選曲**：暗選 1 卡 ＋ 點選主打屬性，鎖定。
3. **亮牌＋連段**：同時公開，先各算相生加成（異端【終極解構】在此之前先結算）。
4. **對決＋傷害**：套相剋破防，算數值差扣 HP。
5. **棄牌**：用過的卡入棄牌堆；手牌 >7 棄到 7。進下一回合。

### 8.7 牌庫耗盡（疲勞傷害）
牌庫空、無牌可抽時：該方該回合不補牌並受疲勞傷害，**首次 1 點、之後每次遞增 1**（1/2/3…），不可被相剋或被動減免，可達成 HP≤0 判負。

### 8.8 工程備註
- **先做 PvE**：幾乎純前端、零後端，先驗證好不好玩；PvP（配對/同步/防作弊）確認有趣後再評估。
- **AI 難度**建議分級：簡單＝隨機合法出牌；普通＝會追連段；困難＝會預判對手連段並相剋。
- 對戰參數全部寫成 config：

```js
const BATTLE_CONFIG = {
  startHp: 30, deckSize: 20, startHand: 5, drawPerTurn: 1, handLimit: 7,
  maxCopies: 2, aceCopies: 1, regularStatCap: 5, aceStatValue: 7,

  // 相剋：key 剋 value（沿用既有，勿改）
  beats: { obscurity: 'classic', classic: 'accessibility', accessibility: 'obscurity' },
  breakBonus: 4, minCounterDamage: 1,

  // 相生：宣告屬性接續上一回合的 chainNext 即連段（與 beats 反向）
  chainNext: { classic: 'obscurity', obscurity: 'accessibility', accessibility: 'classic' },
  chain2Bonus: 2, chain3Bonus: 5,

  // 王牌：三圍 + 被動
  ace: {
    hall:   { stats: { classic: 7, obscurity: 1, accessibility: 1 }, suppressOpponent: 2 }, // 眾望所歸
    pearl:  { stats: { classic: 1, obscurity: 7, accessibility: 1 }, counterBreakBonus: 6 }, // 私盤特攻
    heresy: { stats: { classic: 1, obscurity: 1, accessibility: 7 }, breakChain: true },     // 終極解構
  },
  hegemonyIgnoresBreak: true,   // 霸權：王牌被剋時對手不得 +4

  fatigueStart: 1, fatigueStep: 1,
};
```
> 未來加第 4 個數值 → 相生／相剋三循環擴成「五循環」（每個剋後面兩個，像加強版猜拳），只是改 `beats` / `chainNext` 兩張表。

---

## 9. Firestore 結構（草案）

```
collections/{uid}/cards/{cardId}
  { cardId, obtainedAt, count, pulledRarity?, serial? }

users/{uid}
  { createdAt, displayName?, linkedProvider? }   // 綁定後填
```

### 安全規則（草案，需在 Console 發布）
```
match /collections/{uid}/cards/{cardId} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
match /users/{uid} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```
> 卡牌數值不放 Firestore（走 Worker KV 目錄），所以規則只要管「玩家自己的收藏」。

---

## 10. 分階段路線圖（慢慢建）

- **P0 基礎 ✅（已做）**：Google 一鍵登入；結果頁「收進卡冊」；Firestore `collections/{uid}/cards`；我的卡冊頁（稀有度上色＋重複張數）。
- **P1 卡冊強化 ✅（已做）**：點卡看詳情（介紹/album-desc＋星星＋Apple/Spotify/YT 聆聽連結）、刪除單卡、排序（稀有度/最新/藝人）、依稀有度分組。
- **P1.5 卡冊更多**：圖鑑空格（未收藏輪廓）、收集進度、依曲風分組。
- **P-播放清單**：收集滿門檻 → 一鍵建立 Spotify 播放清單。需玩家 Spotify OAuth（授權碼流程＋playlist-modify scope，沿用現有 Spotify app 加 redirect URI）。待定：解鎖門檻、整張加 vs 代表曲、是否也支援 Apple Music。屬獨立階段。
- **P2 帳號**：（可選）匿名試玩 → 升級綁定；個人資料。
- **P2.5 會員名冊**：登入時寫 `users/{uid}`（名字/Email/註冊時間/收藏數）；admin.html 後台讀整份名冊（規則限管理員帳號可讀全部；前端無法列舉 Auth 用戶，故走 users 集合）。
- **P2.6 商品願望清單**：登入會員在商品按「加入清單」→ `wishlists/{uid}/items/{productId}`；「我的清單」頁；可延伸到貨通知、後台看熱門想要清單。與卡冊同一套 Auth＋per-uid 架構。
- **P3 對戰 PvE**：依第 8 節 v2 定稿實作——20 張牌組、手牌、相生連段、相剋破防、王牌被動、HP30、疲勞；config 化（`BATTLE_CONFIG`）、打電腦。
- **P4 深化**：牌組構築 UI（從卡冊挑 20）、AI 難度分級、每日抽、圖鑑進度。
- **P5（評估）**：PvP、排行榜。

每一階段都能獨立上線、各自驗證，不必一次到位。

---

## 11. 待決定 / TODO

- [ ] 抽卡是否有「收進卡冊」確認鍵，還是抽到自動入冊？
- [ ] 稀有度要「即時隨數值變動」還是「抽到當下凍結」？（數值＝總分；影響第 4 節 `pulledRarity`）
- [x] 對戰勝負用血量還是三戰兩勝？→ **血量制，HP 30**（見第 8 節 v2）。
- [ ] 重複卡的用途（碎片/升級/純張數）？
- [ ] 卡冊未收藏要不要顯示輪廓空格（圖鑑感）？
- [ ] 數值平衡：是否需要 budget 上限避免高稀有卡輾壓？（相剋＋王牌單張限 1＋連段預判已部分平衡；殿堂【眾望所歸】−2 是否要收斂到 −1 待實測）
- [ ] 「流行度」要不要做？結論：流行度＝冷門度的反面（重複，且對戰會有一個永遠廢的數值），不建議當獨立數值。真正要決定的是「卡池要不要含主流盤」——要的話是改抽卡卡池來源（主流→普卡、冷門→稀有），不是加數值。想顯示「紅不紅」可直接反向呈現冷門度。第 5 個數值若要加，挑不重疊的：收藏價值（Discogs 真實行情）或音響性。（擱置思考中）

---

_最後更新：2026-06-25（對戰系統升級為 v2 定稿）。這份文件可隨想法調整。_
