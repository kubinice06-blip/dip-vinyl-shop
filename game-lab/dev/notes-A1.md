# notes-A1：引擎與內容（game-lab v4 第一波）

分支 `v4/A1`（worktree `/home/user/wt/A1`），基底 `origin/main @ ef763c573`。整合分支是 `claude/card-game-fun-lab`（不是 SPEC 寫的 `claude/game-lab-v4`）。
A1 不 push、不在 `/home/user/dip-vinyl-shop` 本身提交；整合由另一步做。

## 階段

- **第 1 階段（完成）**：engine.js v4（§2.1 全部）、content.js 不依賴新烘卡的資料（§2.2.2–§2.2.10）、test/engine.test.mjs v4（用現有 cards.js＋測試內建的星數墊片）、lint-copy／check-content 改版、owner-lines-v4.json。**沒有校準模擬**。
- **第 2 階段（下一步）**：合併 A3-M1（新 cards.js／bins.js）後：
  1. `node game-lab/tools/check-content.mjs` 應該全綠（現在只差 46 張卡＋bins.js）；`engine.test` #14 會比對 STUB 星數＝真卡。
  2. `sim.mjs` v4 全部重寫（§5.2 S1–S8、`--n`／`--set`／`--json`、新增 `--econ none|smart`；用 `EN.bargainPolicy`／`shopPolicy`／`runPolicy`），照 §5.2 的順序校準（聲望 → 獎金／價格／配件價），mercy 開關兩組數字。
  3. `dev/decks-v4.md`（§4 牌單表＋deckMain＋嚴格峰值張數＋≥4 星副屬性；禮物；特價箱）、`dev/sim-v4.json`（`--json`）。
  4. 段 2「規則＋模擬」截圖／表交店主。

## 進度

- [x] engine.js v4（§2.1 全部；檔頭 API 註解同步）
- [x] content.js v4（第一波範圍；v3 劇本／回嘴／教學步驟留作墊片）
- [x] tools/owner-lines-v4.json（50 句，程式從 DECISIONS-v4.md 逐字擷取；`rules`＝規則卡六行）
- [x] test/engine.test.mjs v4（§5.1 #1–#14 全部；第一波用 STUB 星數補 46 張還沒烘的卡＋假箱子）
- [x] tools/lint-copy.mjs v4（店主標記、owner-lines 逐字、規則卡 ≤56／第 3 行三相剋／六行逐字、提示句、經濟介面字）＋LINES-REVIEW.md
- [x] tools/check-content.mjs v4（匯出 `shapeProblems` 給 engine.test #14 共用）
- [ ] sim.mjs v4＋校準（第 2 階段）
- [ ] dev/decks-v4.md、dev/sim-v4.json（第 2 階段）

## 測試結果（第 1 階段）

| 指令 | 結果 |
|---|---|
| `node game-lab/test/engine.test.mjs` | **1,371,466 passed, 0 failed**（8 s；`--quick` 165k／1.4 s）。誠實度實測：老實 1.0000、偶爾唬人 0.8018、愛唬人 0.7017、老江湖 0.6036（各 ≥60,000 手）；藏家 ×3 王牌 ×20,000 場王牌不變式全過 |
| `node game-lab/tools/lint-copy.mjs` | 通過：句子 303（原句 35、拍板 2、店主 20、新 246）；店主 20 句逐字比對 owner-lines 一致；已重產 LINES-REVIEW.md。負面測試（改一個字）會擋 |
| `node game-lab/tools/check-content.mjs` | **預期沒過（47）**：46 張 v4 新卡還沒烘＋沒有 bins.js（A3-M1）。其餘形狀檢查（牌組限制、禮物、特價箱、提示、經濟、配件、教學資料）在 engine.test #14 用 STUB 星數跑過，全綠 |
| v3 外殼冒煙（Playwright，390×664） | 標題畫面主控台 0 錯誤；用 v4 `newRun` 造的 run（bag 先濾掉還沒烘的卡、`v` 暫改 3）續玩到「今晚來客」畫面 0 錯誤 |
| `test/chars.test.mjs` | 30061 passed（content 的客人外觀沒動） |
| `test/shop.test.mjs`、`tools/check-shops.mjs` | 3 個預期內問題：`meta.crates：content.js 沒有卡池 jazz／tw／noise`——v4 的 `C.bins` 來自 bins.js（A3-M1 之後就有 jazz／tw／noise），A2 也在改 meta.crates；不是 A1 能修的 |
| `sim.mjs`（v3）、`test/tutorial.test.mjs` | 跟 v4 引擎不相容，預期壞（sim 第 2 階段重寫；tutorial.test 第二波 B2） |

## 實作裁定（契約沒寫死、A1 自己定的，可逆）

1. `enemyDef` 沒給 `depth` 時：藏家 `hard`、其他客人 `normal`（序章男子永遠 `easy`）。也收 `o.planner` 直接指定。
2. 有 script 時，他的牌堆＝`plays` 的順序，其餘照牌單順序接在後面（不洗，不取 RNG）。
3. `forcedPlay` 時事件的 `bluff`＝實際出的色 ≠ 提示色。
4. 加成配件生效時也記一筆 `notes`（「重量盤：+1 星」），跟其他配件一樣。
5. `stats.blocked`＝有被擋的手（不分誰）；`blockedYou`＝你的剋招被擋（`by:'p'`）；`caught`＝唬人但你沒被剋。
6. `stats.earned／spent`＝所有進出（打贏獎金＋賣回／買唱片、配件、特價箱）。
7. `buy`：包包沒滿也可以帶 `sellId`（先賣再買）；`buyBargain`：賣的張數要剛好＝`max(0, 包包+張數−8)`，少了回 `bagFull`、多了回 `badSell`；效果裡第一張 `gainCard` 帶 `spend`。
8. `shopPolicy('smart')`：先買唱片（目標軸星最高 → 總星 → 便宜），買到沒有更好的為止，再買那件加成配件。
9. `thoughtful` 估他各軸星數時，公開牌單含藏家的王牌（照 §2.1.7 字面：前三大平均，7 也算）；第 2 階段模擬若看出偏差再議。
10. `preview(st, act)` 沒給 `eSide` 回 `null`（v3 的「三色結果表」不再提供，B1 改用 eSide）。
11. `clash` 仍收 v3 的 `clash(pStar, pAttr, eStar, eAttr)`（ui.js 舊規則卡例子；v4 已沒有 `rules.example`，實際不會被呼叫）。
12. lint 新加兩個長度護欄：提示句 ≤24 字、經濟介面字 ≤24 字（現有字都遠低於）。
13. 引擎多匯出的（契約以外）：`bargainPolicy`（sim 的「三色各一、同色挑峰值大的」）、`HONESTY／PLANNERS／PLANNER_BY_DEPTH`（content 沒給時的預設）、`beginHand`、`relicObj`。

## 規格裡對不上、照哪邊做（給主線／C 看）

- **§5.1 #6「tie 六手 → win===true」**：§2.1.5 契約是 `win = P.hp >= E.hp`（比剩下的絕對值）。客人 14、你 10 時 tie 六手是**他贏**。測試照契約：#6 讓他也從 10 開始；另加一條「客人 14 tie 六手 → 你輸」。這會讓「拖到六手」對玩家不利——第 2 階段模擬會看到；要改成比例或差額的話是規則改動，要店主決定。
- **§5.1 #14 的提示 key 規則**（key 為 null 或在 hintKeywords 裡）跟 **§2.2.4 主線裁定**（每句都要 key、只要求是句子的子字串、hintKeywords 只是參考）打架：照 §2.2.4（較新、明寫「取代」）。
- **owner-lines 的 15 句提示**：§2.2.9 要收「15 句提示」；這裡收的是 **D 的草稿原字**（c1「這張，你總聽過吧？」、c3「他哼起全場都會唱的那段副歌。」），content 的提示是主線定稿（tag `新`，c1／c3 字不同），兩邊都照規格。

## 請求

- **B2（第二波）**：刪 A1 的 v3 墊片（`C.junk`、`C.junkLabel`、`C.habits`、`C.habitLabels`、`C.retorts`、v3 `C.script`、`C.bins[*].ids`）；`ui.js` `validRun` 改 `r.v === 4`（現在 v3 外殼會把 v4 run 當壞檔丟掉）；規則卡頁尾用 `C.rules.hpText` 代入 `{normal}／{elite}／{boss}`；`LAB_ICONS` 加 heavy180／numbered／matrix；`C.shopLines.binBusy` 用在序章／對決中點箱子。
- **B1（第二波）**：提示句字串＝`C.hints[attr]` 裡 `id === view.hint.line` 那句；結果句 `{key}` 用該句的 `key`；`preview` 一定要給 `eSide`。
- **A2（知會）**：`check-shops` 的 `meta.crates` 檢查讀 `C.bins.jazz／tw／noise`——v4 的 `C.bins` 是 bins.js 的 12 區（含 jazz／tw／noise），A3-M1 進來後就會過。

## 截圖

（第 1 階段沒有要交店主的截圖；冒煙截圖在 scratchpad，不提交。段 2 的截圖在第 2 階段模擬全綠後交）
