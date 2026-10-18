# 情緒三軸上線計畫（v1，2026-10-18）

> 店主 2026-10-17：「規劃如何讓這個系統上線 以我現在有的為基礎」。
> 本檔只講**怎麼把手上已有的東西推上線**，不重開規格。設計細節仍以 `MOOD_ENERGY_PLAN.md`（三軸、八格、調頻、星圖）
> 與 `MOOD_SCALE_PLAN.md`（刻度、抽卡層平均）為準；兩檔與本檔衝突處，以本檔為新。

---

## 0. 結論（三句話）

1. **資料已經夠上線**：全池 19,116 張都有座標（104 錨點＋19,012 模型評分），八格門檻凍結、刻度 `scale-v0` 凍結。不等音訊層、不等 v1 刻度。
2. **分四個 PR、約四週**：P0 前台資料檔（1–2 天）→ P1 調頻（1 週，先藏網址軟上線）→ P2 聆聽星圖（1.5 週）→ P3 成就（3 天）。上架公式接三軸（P4）跟 P1 並行，不等星圖。
3. **先合併 PR #102**（資料與評分批次），之後每階段各開一個小 PR，店主一個一個合。

---

## 1. 現況盤點：手上有什麼

| 資產 | 位置 | 狀態 | 上線怎麼用 |
|---|---|---|---|
| 全池座標（raw 兩位、八格、p、來源、信心） | `data/mood/card-moods-v0.json`（1.16MB，gz 467KB） | 19,116/19,116；錨點 104/104 同格 | **後台底稿**，不直接給前台 |
| 刻度（百分位 breaks、門檻、門檻百分位、八格張數、格名） | `data/mood/scale-v0.json`（1.9KB） | 凍結 2026-10-17 | 前台直接讀，p 在瀏覽器算 |
| 錨點 104 張（店主核定） | `batch-progress/mood-axes/anchors-v1.json` | 定案 | 回歸測試：任何重建都得 104/104 同格 |
| 四批評分與合併腳本 | `batch-progress/mood-axes/score{500,3000,10k,-rest}/` | 完成 | 只在重建或補卡時跑 |
| 重建管線 | `build-priors.mjs` → `build-scale.mjs v0` | 可重跑 | P4 接新卡時沿用 |
| 三軸評分說明書 | `score500/BRIEF.md` | 給人與模型共用 | P4 新卡評分、P5 人工改判的依據 |
| 星圖原型 | 私人 artifact Version 14（`starmap-template.html`、`build-starmap.mjs` 在本工作階段 scratchpad） | 19,116 顆、600 亮、Three r128、桌機／手機 0 錯誤 | P2 搬成 `starmap.html` 的底 |
| 實驗頁 | `starmap-lab.html`（店主帳號限定） | 讀 v0 檔＋自己的唱片櫃 | P2 上線後留作店主全池檢視，或退役 |
| 抽卡管線 | `index.html`：`pickSeedCard`、`SPECIAL_TIERS`、`recordDrawnCard`、`saveToHistory`、`DipDrawAnim`、`showGpResult` | 既有 | P1 只接篩選器，不改這些函式 |
| 分檔靜態資料先例 | `dip-genre-tree.js` ＋ `genre-tree.json` ＋ `card-subgenres.json` | 上線中 | P1 模組照這個形狀寫 |
| 功能旗標 | Firestore `gameConfig/*`（`moodQuiz.mode`、`drawAnimation`） | 既有 | P1 加 `gameConfig/tune` |
| 收藏寫入 | `collections/{uid}/cards/{id}`（含 `coverUrl`、`desc`） | 既有 | P2 星圖「只畫收藏」直接讀它，封面不另外抓 |
| 獎勵結算先例 | `music-map.html` `settleRewards`（transaction → `users/{uid}`、`specialDraws`） | 上線中 | P3 成就照抄 |
| 入口 | `find.html` 四張卡、`genre/index.html` OG 轉址、`manifest.json` shortcuts、首頁 hub 卡 `data-go="music-map"` | 既有 | P1 加第五張卡與 `/tune`，P2 改 hub 卡 |

**沒有、而且這次不等的**：音訊特徵層（`MOOD_ENERGY_PLAN` §3.1）、`data/mood-sources.json` 來源帳、v1 刻度、Firestore `card_catalog.mood`。前三個放進 P5 品質迴圈；最後一個 P3 才可能需要。

---

## 2. 上線原則（沿用既有裁定）

- **不動屬性**（2026-10-15）：八格＝raw 值對門檻 x 3.0／y 0.5／z 0。各格大小不一照實呈現；平均只在抽卡層與顯示層做。
- **數字不給玩家看**：前台只顯示八格詞；raw、p、信心都是後台欄位。
- **不動 `seed_cards.json` 欄位**：座標走分檔，比照子曲風表。
- **零 Worker 改動、零新 Firestore 集合**：P1 純前端；P2 讀既有 `collections`；P3 寫既有 `users/{uid}`（規則已是 per-uid）。雲端工作階段做得完，不卡身分。
- **每次重建都要過兩道回歸**：seed 19,116 張座標全有、無孤兒 id；錨點 104/104 同格。

---

## 3. P0：前台資料檔與 gate（1–2 天，開 P1 之前）

### 3.1 檔案

新增 **`data/mood/card-moods.json`**（前台檔，取代 `MOOD_ENERGY_PLAN` §2 的格式；v0 檔留在後台不動）：

```json
{
  "_v": "front-v0",
  "_built": "2026-10-xx",
  "_seed": { "count": 19116, "head": "the rolling stones|some girls", "tail": "<最後一張 id>" },
  "_thresholds": { "x": 3, "y": 0.5, "z": 0 },
  "cards": [[3.8, 0.6, 0.5], [2.1, -0.8, 0.4], null, ...]
}
```

- **依 `seed_cards.json` 順序存**，不存 id。實測：依 id 存 877KB／gz 361KB；依順序存 269KB／**gz 58KB**。省下的 300KB 值得用順序綁定換。
- 綁定靠 `_seed`：長度、第一張、最後一張 id 三個都對才用；任一不對就整檔視為失效（調頻入口顯示「資料更新中」、星圖退回不定位），**不會畫錯位置**。
- 三值各一位小數（判格用 raw 兩位小數跟一位小數在 19,116 張裡換格的只有貼邊那幾張，而門檻 0.5／0 本身就是一位小數的界，一位夠用）。
- `p` 不存：前台用 `scale-v0.json` 的 `breaks`（每軸 101 個值）做反查，三軸各一次二分搜尋，19k 張不到 10ms。
- **不進 `sw.js` 的 `PRECACHE`**（比照 `card-subgenres.json`、`mood-bank.json`）；載入用 `fetch('data/mood/card-moods.json?v=<_built>')`，版本字串由 `index.html` 內一個常數帶，重建時一起改，避免 Pages 快取舊檔。

### 3.2 建檔腳本與 gate

- **`scripts/build-card-moods.mjs`**：讀 `data/mood/card-moods-v0.json` ＋ `data/mood/overrides.json`（§7，店主改判，初版空檔）＋ `seed_cards.json` → 寫 `data/mood/card-moods.json`，印八格張數表。
- **`scripts/mood-gate.mjs`**（exit 非 0 就不准發布）：
  1. seed 每張都有座標，`null` 數 0；
  2. v0 檔沒有 seed 以外的 id（孤兒＝改名或刪卡後沒重建）；
  3. 錨點 104 張逐張對 `anchors-v1.json` 的格，104/104；
  4. 前台檔 `_seed` 三個值對得上目前 seed。
- 把 `mood-gate.mjs` 加進 `scripts/pool-check.mjs` 的呼叫鏈（或 `run-gates.sh` 後面一行），讓現有發布流程順便跑。

### 3.3 驗收

- 檔案 gz ≤ 80KB；gate 全綠；`starmap-lab.html` 改讀前台檔＋反查 p，與讀 v0 檔時逐顆位置一致（抽 50 張比對）。

---

## 4. P1：「調頻」（1 週；軟上線再曝光）

規格照 `MOOD_ENERGY_PLAN` §5.1–5.2，本節只寫落地方式與順序。

### 4.1 檔案與掛點

| 做什麼 | 哪裡 | 怎麼接 |
|---|---|---|
| 模組 `dip-tune.js`（新） | 根目錄，照 `dip-genre-tree.js` 的形狀 | `DipTune.configure({host, loadCardPool: loadGamePool, loadMoods, onResult})`、`start()`；自帶 seen FIFO 200 |
| 分頁 | `index.html` `setActiveTab('tune')`、`bootstrapView()` 認 `#tune` 與 `/tune` | 新 `tuneModal`，開法照 `genre` 分頁 |
| 結果頁 | 既有 `showGpResult` | 多傳 `mood: {cell, x, y, z}`；結果頁加一行「🌡 恍惚」與一顆亮點縮圖（SVG 一張，不用 Three） |
| 歷史 | 既有 `saveToHistory` | `type: 'tune'`，`reason` 存格名（調參看分布用） |
| 入口 | `find.html` 第五張卡；`tune/index.html`（複製 `genre/index.html`，OG 改 `og-tune.png`）；`manifest.json` shortcuts 加一條 `/?app=1#tune` | 第一週**不加** `find.html` 卡與 shortcut，只開 `/tune` 網址給店主與熟客試 |
| 旗標 | Firestore `gameConfig/tune` | `{enabled, sigma:[0.7,0.7,0.8], floor:0.02, lowConfWeight:1}`；讀不到就用程式內預設，照 `moodQuiz.mode` 的寫法 |

### 4.2 `pickByCoord` 落地

- 依 §5.1 算 `w`，但**稀有度分層不重寫**：先依 `w` 不放回抽 60 張候選，再把這 60 張當 `pool` 交給既有 `pickSeedCard(candidates, {profilePool: fullPool})`，稀有度與頂點機率沿用；若該稀有度層在 60 張內是空的，`pickSeedCard` 既有的回退會處理，上線前用 1,000 次模擬確認各層比例沒有偏掉。
- 有效張數（Σw 換算）<30 時 σ ×1.5 重算一次；再不夠顯示「這個角落很空，放寬一點」。
- **低把握降權（可選、抽卡層）**：`conf=low` 的 5,966 張乘 `lowConfWeight`（旗標，預設 1＝不降）。這是改「抽到的機率」不是改屬性，符合 2026-10-15 裁定；上線一週看抱怨再決定要不要調 0.7。前台檔因此要多帶信心：`cards` 每筆改 `[x,y,z,c]`，`c` 0／1／2，gz 多約 5KB。
- 「同座標再來一張」直接重呼叫，不重開動畫設定。

### 4.3 今日座標

- 種子＝台北日期 `YYYYMMDD`，用與 `build-scale.mjs` 相同的 FNV-1a；先等機率選格（八格各 1/8，`MOOD_SCALE_PLAN` §2.2），再在格內取錨點座標的平均當 target。
- 首頁 hub 區一行「今日頻率：恍惚」，點了開 `#tune` 並預填；一個函式，不需要後端。

### 4.4 驗收與調參

- 桌機／手機 Playwright 跑：開 `/tune` → 點板 → 來一張 → 結果頁有格名；1,000 次模擬八格各自抽到的分布、稀有度比例、seen 無重複。
- 軟上線一週後看 `saveToHistory` 的 `type:'tune'` 分布與 `card_catalog` 抽卡計數，店主裁定 σ、floor、是否降權低把握；調的是 `gameConfig/tune`，不用重發版。
- 名稱「調頻」仍是暫名（`MOOD_ENERGY_PLAN` §10）。**P1 上線前要定**，因為 OG 圖與路由字串跟著名字走。

---

## 5. P2：聆聽星圖 `starmap.html`（1.5 週）

### 5.1 從原型搬過來的

- `starmap-template.html` 的 Three r128 點雲、八格星雲著色、raycast 開卡、未點亮星透明度收斂與剔除、手機降級參數，**整段搬**。原型 19,116 顆在 swiftshader 手機模式 0 錯誤、幀率可接受，不需要重寫渲染。
- 原型是「全池點亮 600」；正式版是「全池暗星＋**自己的收藏亮**」（2026-10-14 店主定調：只畫玩家的收藏，收越多星越多）。暗星只給空間形狀，不可點。

### 5.2 要改的

| 項目 | 原型 | 正式 |
|---|---|---|
| 資料 | `starmap-meta-full.json`＋`descs.json`（scratchpad 建檔） | 前台檔 `card-moods.json`（位置）⨝ `collections/{uid}/cards`（哪些亮、封面、簡介） |
| 位置 | 建檔時算好 p | 瀏覽器用 `scale-v0.json` breaks 反查 |
| 封面 | KV／Firestore `card_catalog` 離線撈 | 收藏文件自帶 `coverUrl`，不另外撈；沒有的用純色小方塊（原型已有） |
| 開卡 | 內嵌 desc | 收藏文件 `desc`；缺就打 `WORKER_URL/album-desc`，試聽打 `/spotify-search`，兩支 `index.html` 已在用 |
| 身分 | 店主 email gate | 登入即可；未登入顯示登入鍵（照 `music-map.html`） |
| 全池模式 | 預設 | 店主帳號才有的切換鈕（沿用 `starmap-lab.html` 第 125 行的 OWNER 判斷），一般玩家看不到 |
| 低階裝置 | 無 | WebGL 建不起來時退回 2D canvas：XY 板上畫點、Z 用顏色（`MOOD_ENERGY_PLAN` §4.3 已規劃） |
| 入口 | 無 | 首頁 hub 卡 `data-go="music-map"`「音樂地圖」改成 `data-go="starmap"`「聆聽星圖」導向 `starmap.html`；`music-map.html` **保留可直連**，星圖頁底部一行「舊版音樂地圖」 |
| `sw.js` | 無 | `starmap.html` 不預快取；Three 從 cdnjs 載，與原型相同 |

### 5.3 從星圖直接抽（§5.3）與定向抽（§5.4）

- 直接抽：點空白處 → raycast 到最近 target → 呼叫 `DipTune.pickByCoord`，跳回 `index.html#tune?x=..&y=..&z=..` 讓既有動畫與結果頁處理。星圖頁自己不做抽卡 UI，避免兩套。
- 定向抽「照亮這裡」：鎖格 → 等機率規則不適用（玩家已指定格）→ 候選＝該格全部＋相鄰格最靠近的 10%（`MOOD_SCALE_PLAN` §2.3）；薄格不足 300 張時照 §2.2 向只差一軸的三格借最近的卡補到 300，借來的卡顯示自己的格名。這段邏輯放 `dip-tune.js`，星圖只傳格 id。

### 5.4 驗收

- 登入帳號收藏 0／50／600 張三種狀態都能開；桌機、手機模擬各 0 錯誤；2D 退回路徑手動觸發一次。
- 店主帳號全池模式與 Version 14 原型逐格數量相同。
- `starmap-lab.html` 之後處置：**退役**（刪檔），店主全池檢視由正式頁的切換鈕取代。待店主確認。

---

## 6. P3：成就與稱號（3 天，P2 之後）

- `users/{uid}.starMap = { lit: {calm: n, still: n, …}, claimed: {<achievementId>: ts}, titles: [...] }`，由前端在星圖頁開啟時用 transaction 結算，**整段照 `music-map.html` `settleRewards` 改**：獎勵仍是 `specialDraws` 的 `random3` 票，不另開經濟系統（`MOOD_ENERGY_PLAN` §6.3）。
- 門檻用**比例**不用張數（`MOOD_SCALE_PLAN` §2.2）：八格張數表就在 `scale-v0.json` 的 `cells`，前端算 3%／10%／25%。恍惚 589 張的 3% 是 18 張、放鬆 5,102 張的 3% 是 153 張，薄格做得到、厚格不白送。
- 成就清單照 `MOOD_ENERGY_PLAN` §6.2，初版只上三類：區域行家（單格 ≥3%）、照亮（單格 ≥10%）、全頻（八格各 ≥1 張）。稱號文字店主過目。
- `firestore.rules` 的 `users/{uid}` 已是本人可寫，不改規則。

---

## 7. P4：上架公式接三軸（2 天，與 P1 並行）

沒有這一段，每上一批新卡 gate 就會紅。順序：

1. **`ALBUM_ONBOARDING.md` 新增 §2.5「情緒三軸」**：每張新卡用 `score500/BRIEF.md` 的說明書打 x、y、z 與信心，manifest 多 `mood: {x, y, z, conf, why}`；古典照 §0.7 的錨點制人工打。
2. **`dip-card-create` Phase 2 加一步**：封面與舊三軸之後跑情緒三軸（≤10 張主線自己打；>10 張切工單給代理，格式沿用 `score-rest/chunk-*.json`），輸出追加到 **`batch-progress/mood-axes/onboard/scored-onboard.json`**。
3. **`build-priors.mjs` 讀第五個來源** `./onboard/scored-onboard.json`，之後 `build-scale.mjs v0`（**不重凍結刻度**：breaks 固定，新卡只套用），再 `build-card-moods.mjs`。
4. **`verify-album-onboarding.mjs --published`** 加檢查：manifest 每張有 `mood`，且 `card-moods.json` 內有值；缺一張就 ERROR。
5. **`data/mood/overrides.json`**（店主改判）：`{"<id>": {"x":…, "y":…, "z":…, "why": "…", "by": "owner", "date": "…"}}`，`build-priors.mjs` 最後一步套用、來源碼標 3。有了這檔，任何「這張不該是恍惚」都是改一行、重建、過 gate，不用重跑批次。
6. 改名／刪卡時（像 10-16 的 In Orbit）：先改評分檔 id 再重建，gate 的孤兒檢查會抓漏改。

---

## 8. P5：品質迴圈（上線後持續，不擋上線）

| 事 | 規模 | 做法 | 何時 |
|---|---|---|---|
| 低把握 5,966 張（31%） | 集中在冷門日本爵士、東南亞／台日老唱片、私壓迷幻、福音小眾、2025–26 新盤 | 先靠 P1 的 `lowConfWeight` 降曝光；有試聽的那部分跑音訊層（§3.1）對照，分歧的人工看 | P1 上線一週後看數據再排 |
| 音訊特徵層 | 有試聽約 14,500 張 | `MOOD_ENERGY_PLAN` §3.1 原排程 W1，這次延後；它主要修 X、Y，是把握度的來源 | P2 之後 |
| `score-rest/DATA-ISSUES.md` 六類系統性卡池問題 | 95 行 | 另開 `audits/pool-fix-2026xxxx/`，照 10-16 的 README＋`apply.mjs --write/--live/--verify` 形狀 | 與情緒上線無關，另排 |
| 玩家回報 | — | 結果頁「不像這個格？」按鈕：**初版不做後端**，只在 `saveToHistory` 多記 `flag: true`；累積後店主在 Firestore 看。要開獨立集合得改 rules 並由店主部署，先不做 | P1 第二版 |
| Y 軸要不要改成「重量感」 | 影響 ~20 張錨點重核、靜暖／躁冷兩片約 9,000 張重評 | **不在本輪**。改名「恍惚」已讓格名對上內容；若店主之後要改，走 scale-v1 重凍結，前台檔格式不變 | 店主決定 |

---

## 9. 時程與 PR 切法

| 週 | PR | 內容 | 驗收 |
|---|---|---|---|
| 現在 | **#102 合併** | 四批評分、v0 檔、刻度、改名、計畫書 | 已完成，等店主合 |
| W1 前半 | PR-A `mood-front-file` | §3：前台檔、建檔腳本、gate、lab 頁改讀前台檔 | gate 綠、gz ≤80KB、位置一致 |
| W1 後半–W2 | PR-B `tune` | §4：`dip-tune.js`、`#tune`、結果頁情緒標、`/tune` OG、今日座標、`gameConfig/tune` 讀取 | Playwright 雙機、1,000 次模擬；**不加 hub 卡** |
| W1–W2 並行 | PR-C `onboarding-mood` | §7：ALBUM_ONBOARDING §2.5、skill Phase 2、build-priors 第五來源、verify gate、overrides.json | 用一批 ≤10 張新卡走一遍 |
| W2 末 | 店主 | 軟上線一週後定 σ／floor／降權，改 `gameConfig/tune`；定名；決定 hub 曝光 | — |
| W3 | PR-D `tune-expose` | `find.html` 第五張卡、manifest shortcut、首頁今日頻率一行 | 小 PR |
| W3–W4 | PR-E `starmap` | §5：`starmap.html`、2D 退回、hub 卡改名、星圖抽與定向抽、lab 頁退役 | 三種收藏量、雙機 0 錯誤 |
| W4 末 | PR-F `starmap-achievements` | §6 | transaction 結算、票券發放 |

雲端工作階段每個 PR 推自己的分支，店主合併；不訂閱 PR、不排 check-in（2026-10-14 指示）。
PR-B 與 PR-C 都會動 `PROJECT_MEMORY.md` 最上方，合併時衝突由店主叫雲端解。

---

## 10. 風險與對策

| 風險 | 影響 | 對策 |
|---|---|---|
| 31% 低把握，調頻抽出「不像」的卡 | 玩家對八格失去信任 | 結果頁只給格名不給數字；`lowConfWeight` 旗標隨時可調；錯判走 `overrides.json` 一行修 |
| 前台檔依 seed 順序綁定，seed 改了沒重建 | 全池位置錯位 | `_seed` 三值不符就整檔失效、功能降級而不是畫錯；gate 擋發布 |
| Firebase 登入只在 `dipvinyl.tw` 可用 | 星圖、成就在 Pages 預覽網址測不到登入路徑 | 星圖的收藏疊加用本機 `localhost:5179` 或正式網域測；渲染本身用 Playwright 全池模式測 |
| Three r128 走 CDN | CDN 掛星圖全黑 | 2D 退回同時也是 CDN 失敗的退回；原型已證明 r128 與 TrackballControls 在手機跑得動 |
| 薄格三格（恍惚 589、冷冽 873、頹靡 970） | 定向抽、成就在薄格體驗差 | 借卡補到 300、比例門檻、等機率選格三條都已定案；另有 `EXPANSION-PLAN-mood-thin-cells.md` 補卡計畫，可在 P2 後排 |
| 「調頻」名稱未定 | OG 圖、路由字串、分享文案跟著改 | P1 開工前定；路由先用 `/tune`，中文名可後改，英文路徑不動 |
| 多個工作階段並行改 `PROJECT_MEMORY.md` | 合併衝突 | 既有 `MM` 索引法；每個 PR 都小、合得快 |

---

## 11. 要店主決定的（P1 開工前）

1. **P1 名稱**：「調頻」或備選「轉台」「對頻」「今天幾度」。路由一律 `/tune`。
2. **hub 卡**：「音樂地圖」改「聆聽星圖」導向 `starmap.html`，舊頁保留可直連。同意就照 §5.2 做。
3. **`starmap-lab.html`**：星圖上線後退役，或留著。
4. **低把握降權**：是否預設就開 0.7，或先 1（不降）觀察一週。建議先 1。
5. **Y 軸「重量感」**：本輪不改，確認即可。

其餘（σ、floor、成就稱號文字、OG 圖版型）在各 PR 內定，寫進 `batch-progress/mood-axes/rulings.md`。
