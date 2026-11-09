# notes-A1：引擎與內容（game-lab v4 第一波）

分支 `v4/A1`（worktree `/home/user/wt/A1`），基底 `origin/main @ ef763c573`。整合分支是 `claude/card-game-fun-lab`（不是 SPEC 寫的 `claude/game-lab-v4`）。
A1 不 push、不在 `/home/user/dip-vinyl-shop` 本身提交；整合由另一步做。

## 階段

- **第 1 階段（完成）**：engine.js v4（§2.1 全部）、content.js 不依賴新烘卡的資料（§2.2.2–§2.2.10）、test/engine.test.mjs v4（用現有 cards.js＋測試內建的星數墊片）、lint-copy／check-content 改版、owner-lines-v4.json。**沒有校準模擬**。
- **第 2 階段（完成）**：已合併 A3-M1（`4433435c0`）。sim.mjs v4 重寫、校準聲望與經濟寫回 content.js、`dev/decks-v4.md`、`dev/sim-v4.json`。
  **兩位冷門客人各要換 2 張新卡（A3-M2，見「請求」）**：（第 2 階段當時）content.js 先放 `C.m2Swaps` 換牌表，新卡烘進 cards.js 後自動換上；在那之前 `node game-lab/sim.mjs --n 3000` 是 19/20（只差 S7），`--project-m2`（用 seed 星數先換上）是 20/20。
- **第 3 階段（完成）**：已合併 A3-M2（四張新卡烘進 cards.js）。content.js 的 already／skip 牌單直接寫新卡，刪掉 `C.m2Swaps`、`sim --project-m2`、check-content 的換牌段；engine.test 的 STUB 表把四張舊卡換成新卡（stubbed 0、baked & checked 46）。`sim.mjs --n 3000` 20/20，數字跟第 2 階段 `--project-m2` 逐字相同（mercy 關也相同）。重產 `dev/decks-v4.md`（換上的四張標「A3-M2：換掉 …」）、`dev/sim-v4.json`（少了 `m2` 欄，其餘不變）。

## 進度

- [x] engine.js v4（§2.1 全部；檔頭 API 註解同步）
- [x] content.js v4（第一波範圍；v3 劇本／回嘴／教學步驟留作墊片）
- [x] tools/owner-lines-v4.json（50 句，程式從 DECISIONS-v4.md 逐字擷取；`rules`＝規則卡六行）
- [x] test/engine.test.mjs v4（§5.1 #1–#14 全部；第一波用 STUB 星數補 46 張還沒烘的卡＋假箱子）
- [x] tools/lint-copy.mjs v4（店主標記、owner-lines 逐字、規則卡 ≤56／第 3 行三相剋／六行逐字、提示句、經濟介面字）＋LINES-REVIEW.md
- [x] tools/check-content.mjs v4（匯出 `shapeProblems` 給 engine.test #14 共用）
- [x] sim.mjs v4 初版（`db85d7ffe`；S1–S8、`--econ`、`--patch`、`--hp`、`--set mercy=false`）
- [x] 校準（`9477c2552`）：聲望、開局的錢、三件加成價寫回 content.js；`C.m2Swaps`＋`sim --project-m2`；check-content 檢查換牌表
- [x] dev/decks-v4.md（§4 牌單表＋A3-M2 之後的兩副牌＋禮物＋特價箱＋經濟表）、dev/sim-v4.json（`sim.mjs --n 3000 --project-m2 --json`）
- [x] 合併 A3-M2（merge commit，`v4/A3-M2 @ 8435b2345`；連帶進來 A2-M1／A3 第二段的 shop.js、hit.test、e2e-taps、check-covers 等，都不是 A1 的檔）
- [x] 第 3 階段：牌單直接改寫成新卡、刪 `C.m2Swaps`／`--project-m2`／check-content 換牌段、engine.test STUB 換新卡 → 必過四項全過 → 重產 dev/decks-v4.md、dev/sim-v4.json

## 第 3 階段測試結果（合併 A3-M2 後，2026-11-08）

| 指令 | 結果 |
|---|---|
| `node game-lab/test/engine.test.mjs` | 1404457 passed, 0 failed；stubbed cards 0（baked & checked 46） |
| `node game-lab/sim.mjs --n 3000 --json game-lab/dev/sim-v4.json` | 20/20（21.0 秒）；跟第 2 階段 `--project-m2` 的輸出逐字相同（只差耗時那行） |
| `node game-lab/sim.mjs --n 3000 --set mercy=false` | 20/20；跟第 2 階段 `--set mercy=false --project-m2` 逐字相同 |
| `node game-lab/tools/check-content.mjs` | 通過（卡 207 張、客人 10 位、配件 9 件、箱子 14 區） |
| `node game-lab/tools/lint-copy.mjs` | 通過（句子 323；原句／拍板 36、店主 20 逐字一致）；LINES-REVIEW.md 無變動 |
| `node game-lab/tools/check-covers.mjs`（A3 的，順跑） | OK（看得到的封面 60 張、12 箱；刪 `C.m2Swaps` 後照樣過） |

## 第 2 階段校準筆記

- 校準工具在 scratchpad（不提交，`A1cal/`）：`try.sh`、`tier.mjs`（S7 依王牌／場次拆）、`pool.cjs`＋`grid.cjs`（經濟格點 432 組）、`m2.json`、`decks-md.cjs`（產 dev/decks-v4.md）。容器重啟後不見也沒關係：`sim.mjs --hp／--patch` 就能重做（`--project-m2` 第 3 階段已刪）。
- **結論 1：只調聲望，S4 與 S7 過不了一起。** ≤3 手的比例幾乎只看聲望：王牌 7＋兩張 5＝17，聲望 ≥18 才 ≤3%、16 是 12–18%。但聲望 17–18 時 S7 一般客人 65%（我早就聽過、跳針王）到 95%（月底吃土），差 28 點；月底吃土聲望 20 仍 93%（§4.1：他只准調聲望、不換卡）。所以只能讓兩位冷門客人變好打。
- **結論 2：要換的是冷 5 → 嚴格冷 4。** 把唬人色 4 星換 3 星（跟冷門仙人互換）沒用（64.5→62.8）；每把一張冷 5 換成嚴格冷 4 約 +4 點（玩家硬 3 的牌對冷 4 剋得動，對冷 5 被「高 2 星剋不動」擋）。cards.js 裡沒有沒用過的嚴格冷 4 卡（老王樂隊在教學、傷心欲絕在禮物、其他在箱子／牆），走 §3.1 交件 5(b)。只換 2 張的版本（換唬人色那兩張）比換現在選的兩張差 2–4 點。
- **結論 3：S6 靠「加成配件在菁英前買得起」。** 起始值（$0 開局、加成 $1200）時會買的只在藏家前買得起配件，smart − none 只有 1–3 點。格點掃開局／序章獎金／一般／菁英獎金／唱片價／加成價：只要「菁英前的錢 ≥ 加成價」就到 +6；再多（第 3 位前就買得起）會讓 S1 >85%、≤3 手 >5%。選最少改動 D 數字的一組：**開局 $300（〔補〕）、三件加成 $1000**，一般 $300／菁英 $500／唱片價全照 D。只動開局（加成維持 $1200）也過，但 S6 只有 5.6 點；加成 $900 不動開局是 5.9 點。
- **聲望**（範圍 12–20）：那張我有 18、我早就聽過 17、針壓強迫症 19、跳針王 17、月底吃土 20（上限）、剁手黨 20（上限）、冷門仙人 17、名盤守門員 20（上限）、傳說藏家 16。冷門仙人 18 會讓 S7 掉到 59%（<60），藏家 17 會讓 S7 掉到 42%（<45）。
- **餘裕**（N=3000，決定性）：S1 81.2（上限 85）、S4 ≤3 手 4.3%（上限 5）、S6 6.1 點（下限 5）、S7 一般客人差 18.1 點（上限 20）、藏家 46.5%（下限 45）、菁英 64.2／65.3%（下限 60）。最緊的是藏家與 S6。

### 最後的模擬表（`node game-lab/sim.mjs --n 3000`，20/20；第 3 階段合併 A3-M2 後實跑，跟第 2 階段 `--project-m2` 逐字相同）

```

### 一整晚（第一晚：序章男子 → Fishmans＋配件三選一 → 3 位一般 → 1 位菁英 → 藏家；老闆說情一次；N=3000 晚／格；mercy 開）

| 策略 | 買東西 | 一晚通關 | 死在哪（男子／一般 1–3／菁英／藏家） | 打幾場 | 客人場平均手數 | ≤3 手 | 賺／花 | 買唱片／配件 |
|---|---|---|---|---|---|---|---|---|
| 會讀的 | smart | **81.2%** | 0.0／9.7／2.7／6.4 | 6.14 | 5.29 | 4.3% | $1308／$949 | 0.19／0.80 |
| 只出最大星 | smart | **7.3%** | 0.0／76.0／9.5／7.3 | 4.47 | 5.54 | 4.4% | $490／$265 | 0.10／0.19 |
| 永遠剋提示 | smart | **40.4%** | 0.0／36.0／6.0／17.5 | 5.57 | 5.16 | 5.4% | $964／$653 | 0.13／0.55 |
| 兩步公式 | smart | **36.5%** | 0.0／46.5／6.4／10.6 | 5.25 | 5.72 | 1.6% | $832／$556 | 0.12／0.46 |
| 跟提示同色（對照） | smart | **4.2%** | 0.0／92.0／2.6／1.2 | 3.77 | 5.98 | 0.1% | $249／$92 | 0.03／0.06 |
| 亂出 | smart | **0.0%** | 0.0／99.9／0.0／0.0 | 3.51 | 4.93 | 14.7% | $32／$2 | 0.00／0.00 |
| 先知 | smart | **99.7%** | 0.0／0.3／0.0／0.0 | 6.03 | 4.50 | 11.9% | $1433／$1060 | 0.21／0.89 |
| 會讀的 | none | **75.2%** | 0.0／10.1／4.6／10.1 | 6.19 | 5.37 | 3.6% | $1262／$0 | 0.00／0.00 |

會讀的＋smart：客人場手數分布 1–6 手 0.0%／0.0%／4.2%／18.2%／21.8%／55.7%，第 6 手比聲望結束 37.1%；每位客人（夜裡遇到時）勝率：那張我有 85.8%（≤3 手 0.4%）、我早就聽過 86.2%（≤3 手 10.0%）、針壓強迫症 84.3%（≤3 手 0.3%）、跳針王 85.4%（≤3 手 8.0%）、月底吃土 94.2%（≤3 手 0.0%）、剁手黨 85.8%（≤3 手 0.1%）、冷門仙人 93.0%（≤3 手 17.5%）、名盤守門員 90.4%（≤3 手 0.0%）、傳說藏家 83.7%（≤3 手 3.7%）

### 序章男子（聲望 10、包包 7 張＝禮物 4＋特價箱三色各一、planner easy、老實；N=3000）

| 策略 | 勝率 | 平均手數 |
|---|---|---|
| 會讀的 | 100.0% | 2.74 |
| 只出最大星 | 99.8% | 3.94 |
| 永遠剋提示 | 100.0% | 2.73 |
| 兩步公式 | 100.0% | 3.77 |
| 跟提示同色（對照） | 100.0% | 5.81 |
| 亂出 | 71.8% | 5.22 |
| 先知 | 100.0% | 2.66 |

### 單場（包包 8＝禮物 4＋特價箱 3＋Fishmans；序章配件 1 件；一般客人 planner easy／easy／normal 各 1/3、菁英 normal、藏家 hard；N=3000／格）

| 策略 | 那張我有（18） | 我早就聽過（17） | 針壓強迫症（19） | 跳針王（17） | 月底吃土（20） | 剁手黨（20） | 冷門仙人（17） | 名盤守門員（20） | 傳說藏家（16） |
|---|---|---|---|---|---|---|---|---|---|
| 會讀的 | 77.3% | 74.9% | 76.0% | 77.9% | 93.0% | 78.6% | 64.2% | 65.3% | 46.5% |
| 只出最大星 | 50.2% | 22.3% | 49.1% | 22.1% | 62.4% | 51.2% | 16.6% | 48.6% | 18.0% |
| 永遠剋提示 | 42.7% | 58.6% | 45.5% | 62.5% | 91.2% | 67.6% | 34.4% | 20.3% | 15.7% |
| 亂出 | 3.6% | 5.6% | 1.5% | 5.1% | 7.9% | 2.6% | 2.8% | 1.7% | 0.5% |
| 先知 | 91.4% | 93.0% | 93.0% | 97.0% | 100.0% | 99.5% | 87.4% | 88.1% | 88.6% |
| 會讀的：平均手數 | 5.65 | 5.43 | 5.62 | 5.46 | 5.46 | 5.55 | 5.56 | 5.81 | 5.72 |
| 會讀的：≤3 手（其中你贏） | 0.2%（0.2%） | 5.6%（5.6%） | 0.2%（0.0%） | 4.7%（4.7%） | 0.0%（0.0%） | 0.0%（0.0%） | 4.3%（4.3%） | 0.0%（0.0%） | 2.0%（2.0%） |
| 會讀的：第 6 手比聲望 | 63.1% | 49.6% | 60.9% | 50.5% | 32.8% | 48.6% | 60.2% | 76.4% | 64.9% |

### 門檻（SPEC-v4 §5.2）
  ok   S1 會讀的＋smart 一晚通關 70–85%：81.2%
  ok   S2 只出最大星＋smart 一晚通關 ≤ S1 − 15 點（≤66.2%）：7.3%
  ok   S2 永遠剋提示＋smart 一晚通關 ≤ S1 − 15 點（≤66.2%）：40.4%
  ok   S2 兩步公式＋smart 一晚通關 ≤ S1 − 15 點（≤66.2%）：36.5%
  ok   S2 跟提示同色（對照）＋smart 一晚通關 ≤ S1 − 15 點（≤66.2%）：4.2%
  ok   S3 亂出 一晚通關 ≤5%：0.0%
  ok   S4 會讀的 客人場（一般／菁英／藏家）平均 4.0–6.0 手：5.29
  ok   S4 會讀的 客人場 ≤3 手就結束 ≤5%：4.3%
  ok   S4 最多 6 手：6
  ok   S8 先知 一晚通關 ≥97%：99.7%
  ok   S6 會讀的 smart − none ≥ 5 點：81.2 − 75.2 = 6.1 點
  ok   S6 會讀的＋none 一晚通關 ≥50%：75.2%
  ok   S5 男子：會讀的 ≥97%：100.0%
  ok   S5 男子：會讀的 平均 ≤4 手：2.74
  ok   S5 男子：只出最大星 ≥90%：99.8%
  ok   S5 男子：永遠剋提示 ≥90%：100.0%
  ok   S7 單場 會讀的：6 位一般客人最高減最低 ≤20 點：74.9–93.0（18.1 點）
  ok   S7 單場 會讀的：菁英 冷門仙人 60–95%：64.2%
  ok   S7 單場 會讀的：菁英 名盤守門員 60–95%：65.3%
  ok   S7 單場 會讀的：藏家 45–85%：46.5%

20/20 通過（18.4 秒）
```

### mercy 關掉（`--set mercy=false`；給店主看原版「你落後時他出招變鈍」這條的影響）：20/20

| | mercy 開 | mercy 關 |
|---|---|---|
| 會讀的＋smart 一晚通關（S1） | 81.2% | 80.7% |
| 會讀的＋none（S6） | 75.2%（差 6.1） | 74.5%（差 6.2） |
| 只出最大星／永遠剋提示／兩步公式／跟提示同色 | 7.3／40.4／36.5／4.2% | 6.8／39.4／36.2／4.2% |
| ≤3 手（S4） | 4.3% | 4.3% |
| S7 單場 會讀的：一般 6 位 | 74.9–93.0% | 74.7–93.0% |
| S7 菁英 冷門仙人／名盤守門員 | 64.2／65.3% | 63.1／65.0% |
| S7 藏家 | 46.5% | 45.9% |

mercy 只影響 normal／hard 的客人（easy 本來就關），而且只在你落後時；整體影響 ≤1 點。

### 舊牌單（第 2 階段、A3-M2 之前，留作對照）：`node game-lab/sim.mjs --n 3000` → 19/20

只有 S7 沒過：一般客人 67.5–93.0%（差 25.5 點；我早就聽過、跳針王各低 7–10 點）。其他 19 條都過。

### 給店主看的（§5.7 補充）

- **六手打滿很常見**：會讀的打客人場，55.7% 打到第 6 手、37% 靠「比剩下的聲望」結束（S4 要求 ≤3 手 ≤5%，聲望只能拉到 17–20；你 10、他 17–20，比剩下的絕對值時你要淨贏 7–10 點才算贏）。這是規則卡第 6 條的直接後果；若店主覺得「比聲望」太常出現，可考慮改成比「扣掉的比例」（規則改動，要店主決定）。
- 經濟：開局 $300 與三件加成 $1000 是校準改的（D 沒寫開局；加成原規格 $1200），其餘照 D。
- 兩位冷門客人換 4 張牌（請求裡的表）。

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

14. sim S7 的「每位客人的 planner 在 easy／easy／normal 各跑 1/3」：用 `enemyDef(C, id, {depth: 0/1/2})`（第 i 場 `floor(i/3) % 3`）；菁英 depth 3（normal）、藏家 depth 4（hard）。包包＝`newRun` 的禮物＋`bargainPolicy` 三張＋男子的 drop（Fishmans）；序章配件三件輪流（每 9 場換一件）。
15. sim 一整晚：男子打輸無限重來（序章免費），30 次還輸算「死在男子」（實際沒發生過）；藏家的王牌＝`run.bossAce`。
16. `C.m2Swaps`（A3-M2 換牌表）與 `sim --project-m2` 是第 2 階段等 A3-M2 時的過渡；第 3 階段合併 A3-M2 後已刪，牌單直接寫新卡。

## 規格裡對不上、照哪邊做（給主線／C 看）

- **§5.1 #6「tie 六手 → win===true」**：§2.1.5 契約是 `win = P.hp >= E.hp`（比剩下的絕對值）。客人 14、你 10 時 tie 六手是**他贏**。測試照契約：#6 讓他也從 10 開始；另加一條「客人 14 tie 六手 → 你輸」。這會讓「拖到六手」對玩家不利——第 2 階段模擬會看到；要改成比例或差額的話是規則改動，要店主決定。
- **§5.1 #14 的提示 key 規則**（key 為 null 或在 hintKeywords 裡）跟 **§2.2.4 主線裁定**（每句都要 key、只要求是句子的子字串、hintKeywords 只是參考）打架：照 §2.2.4（較新、明寫「取代」）。
- **owner-lines 的 15 句提示**：§2.2.9 要收「15 句提示」；這裡收的是 **D 的草稿原字**（c1「這張，你總聽過吧？」、c3「他哼起全場都會唱的那段副歌。」），content 的提示是主線定稿（tag `新`，c1／c3 字不同），兩邊都照規格。

## 請求

- **A3（A3-M2，§3.1 A1 交件 5(b)、§6.7）——已完成（`8435b2345`，四張照表換上、沒用備案；A1 第 3 階段已合併）**：兩位冷門客人各換 2 張（理由：§5.2 S4＋S7 只調聲望與經濟過不了，見「第 2 階段校準筆記」結論 1–2；cards.js 沒有可用的嚴格冷 4 卡）。四張都查過：seed 有、Apple 試聽有（`apple-audio-runtime-v1`）、不是頂點卡、藝人沒在 cards.js 出現過、不在任何組。封面要 bake 時確認。換下來的四張（Pauline Anna Strom、Gigi Masin、Mina、Dorival Caymmi）在 content／bins／shops 都沒別處用、也沒有推薦語，可以從 deck-lists 刪掉不再烘；**唯一例外**：A2 的 `dev/stage-harness.html:76`（v4/A2）拿 `pauline-anna-strom-trans-millenia-consort` 當示範卡——不再烘的話請 A2 換一張（例如 `demetrio-stratos-metrodora`，同樣冷 5）。content.js 兩種情況都不會壞（`C.m2Swaps` 只看新卡在不在）。

  | 組 | 舊 id | 新 seed 字串（`artist\|album`） | 新 id | 經/冷/硬 |
  |---|---|---|---|---|
  | `already` | `pauline-anna-strom-trans-millenia-consort`（3/5/3） | `Don Slepian\|Sea of Bliss` | `don-slepian-sea-of-bliss` | 3/4/2 |
  | `already` | `gigi-masin-wind`（3/5/3） | `Harold Budd\|Abandoned Cities` | `harold-budd-abandoned-cities` | 3/4/3 |
  | `skip` | `mina-studio-uno-66`（4/5/2） | `Roberto Goyeneche\|Cantor de mi barrio` | `roberto-goyeneche-cantor-de-mi-barrio` | 3/4/2 |
  | `skip` | `dorival-caymmi-caymmi-visita-tom`（4/5/1） | `King Sunny Adé\|Aura` | `king-sunny-ade-aura` | 3/4/2 |

  換完：我早就聽過＝冷 7 票、嚴格冷峰值 7、經 ≥4 四張、硬 ≥4 三張；跳針王＝冷 7 票、嚴格冷峰值 5、經 ≥4 五張、硬 ≥4 兩張（§4 限制全過）。人設不變：學長的兩張 80 年代新世紀／氛圍（Don Slepian 1980、Harold Budd 1984）換掉同一路的 Pauline Anna Strom、Gigi Masin；二手店老闆的探戈（Goyeneche）與奈及利亞 juju（King Sunny Adé）換掉義大利、巴西兩張。若 A3 烘不出（封面），同形狀的備案：`矢吹紫帆|Forest Land`（3/4/1）、`Craig Kupka|Crystals: New Music for Relaxation 2`（2/4/2）、`Mostar Sevdah Reunion|Mostar Sevdah Reunion`（3/4/2）、`Djivan Gasparyan|Apricots from Eden`（3/4/2）、`Bhundu Boys|True Jit`（3/4/2）——換了就請告訴 A1 改 `C.m2Swaps`。
- ~~**C（整合）**：A3-M2 進來後改寫牌單、刪 `C.m2Swaps`~~ → A1 第 3 階段已做完，C 不用再動。
- **A2（仍未處理）**：`v4/A2` 的 `dev/stage-harness.html:76` 還拿 `pauline-anna-strom-trans-millenia-consort` 當示範卡，這張 A3-M2 已不再烘（v4/A1 合併 A3-M2 後的 cards.js 沒有它）。請換成 cards.js 有的冷 5 卡，例如 `demetrio-stratos-metrodora`（3/5/4）。
- **B2（第二波）**：刪 A1 的 v3 墊片（`C.junk`、`C.junkLabel`、`C.habits`、`C.habitLabels`、`C.retorts`、v3 `C.script`、`C.bins[*].ids`）；`ui.js` `validRun` 改 `r.v === 4`（現在 v3 外殼會把 v4 run 當壞檔丟掉）；規則卡頁尾用 `C.rules.hpText` 代入 `{normal}／{elite}／{boss}`；`LAB_ICONS` 加 heavy180／numbered／matrix；`C.shopLines.binBusy` 用在序章／對決中點箱子。
- **B1（第二波）**：提示句字串＝`C.hints[attr]` 裡 `id === view.hint.line` 那句；結果句 `{key}` 用該句的 `key`；`preview` 一定要給 `eSide`。
- **A2（知會）**：`check-shops` 的 `meta.crates` 檢查讀 `C.bins.jazz／tw／noise`——v4 的 `C.bins` 是 bins.js 的 12 區（含 jazz／tw／noise），A3-M1 進來後就會過。

## 截圖

段 2「規則＋模擬」要交店主的是兩份文字表，不是截圖：上面「最後的模擬表」＋ `game-lab/dev/decks-v4.md`（已提交；第 3 階段重產）。第 3 階段沒有畫面改動，不拍截圖。第 1 階段冒煙截圖在 scratchpad，不提交。
