# notes-R1：平衡 R1 寫回（FIXLIST 10）

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做。
依據：FIXLIST 10（主線 2026-11-08 12:2x 選 A 案 R1）＋ Explorer A 的 `scratchpad/v4/balance/A/results.md`（R1 細項、敏感度、N=6000 複查）。
規則、引擎邏輯、經濟、六手上限、手牌 3 張都不動；只動數字＋sim 的檢查與報表。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] 1. content.js：聲望（你 10；一般 22、社團學長 21；主理人 22、樂評 24、藏家 24）、`C.plannerByDepth` normal/easy/easy/normal/normal、`C.honesty` .8/.75/.75；engine 預設表跟著 content
- [x] 2. sim.mjs：S9（客人場 KO 任一方 ≥35%）、HP 聲望單調（一般最大 ≤ 菁英最小、菁英最大 ≤ 藏家）、KO 分你／他、比聲望條比例；單場表加 KO 列；S7 標題照 C.plannerByDepth 產
- [x] 3. `sim.mjs --n 3000 --json dev/sim-v4.json`：全部門檻（含 S9、HP）通過
- [ ] 4. engine.test、tutorial.test、check-content、lint-copy（LINES-REVIEW 有變就重產）
- [ ] 5. README（規則／聲望／唬人／出招）、dev/decks-v4.md、規則卡頁尾（hpText 自動算，確認字）

## 記錄

### 1. content.js／engine.js（b29e8fb71）
- 聲望：文青同好 31→22、社團學長 24→21、音響發燒友 31→22、二手店老闆 25→22、地下樂團吉他手 34→22、前衛樂迷 31→22；
  地下廠牌主理人 21→22、資深樂評 30→24；傳說藏家 20→24。你 10、男子 10、教學 18 不動。
- `C.plannerByDepth` easy/easy/normal/normal/hard → **normal/easy/easy/normal/normal**（index＝run.idx：第 1／2／3 位一般、菁英、藏家）。
- `C.honesty` 照實率 .8/.7/.6 → **.8/.75/.75**（一般／菁英／藏家；男子 1）。
- engine.js 的預設表（`HONESTY`、`PLANNER_BY_DEPTH`，content 沒給時用）跟著改，註解寫的「＝content.js」維持成立。邏輯沒動。
- `C.rules.hpText` 自動算 → `{normal:'21–22', elite:'22–24', boss:'24'}`；規則卡頁尾＝「你 10 聲望；客人 21–22、菁英 22–24、傳說藏家 24。」

### 2. sim.mjs（b10c61b9c）
- S9：會讀的＋smart 一晚裡的客人場（一般／菁英／藏家，不含男子）`over.by==='hp'` 的比例 ≥35%。KO 分「你 KO 他」（win）／「他 KO 你」（輸）；同一手雙倒照聲望條算勝負、記在贏的那邊。
- HP：`max(一般) ≤ min(菁英)` 且 `max(菁英) ≤ 藏家`（同級可以不一樣，跨級不准倒掛）。靜態檢查，`--mode` 哪種都跑；`report.hpOrder` 記範圍。
- 報表：一晚表下加一行「客人場怎麼結束」（KO、你／他、比聲望條、牌出完；一般／菁英／藏家各自的勝率、KO、比聲望條、手數）；
  JSON `nights.*.guests` 多 `ko／koP／koE／pile`，多 `cls.{normal,elite,boss}`。單場表多一列「KO（你 KO 他／他 KO 你）」，`fights.*.*` 多 `ko／koP／koE`。
- S7 單場的標題改照 `C.plannerByDepth` 產（原本寫死 easy／easy／normal、菁英 normal、藏家 hard）。

### 3. `node game-lab/sim.mjs --n 3000 --json game-lab/dev/sim-v4.json`：22/22（32.7 秒）——數字跟 Explorer A 的 R1 一樣
- S1 80.5%；S2 只出最大星 7.7／剋提示 44.4／兩步 48.1／同色 25.7（≤65.5）；S3 0.0%；S4 5.63 手、≤3 手 0.2%、最多 6；
  S5 男子 100%／2.73 手／最大星 99.8／剋提示 100；S6 80.5−74.1＝6.3 點、none 74.1%；
  S7 一般 76.9–94.7（17.9 點）、主理人 64.7、樂評 82.8、藏家 47.9；S8 99.5%；
  **S9 KO 48.9%（你 KO 他 45.3／他 KO 你 3.6），比聲望條 51.1%**；HP 一般 21–22／菁英 22–24／藏家 24。
- 一晚裡：一般 勝 87.6、KO 47.3（你 44.9／他 2.3）；菁英 勝 91.7、KO 52.1（50.0／2.1）；藏家 勝 79.6、KO 50.8（42.0／8.9）。手數分布 4／5／6 手＝8.1／19.6／72.1%。
- `--set mercy=false`：22/22（S1 79.6、S6 7.0 點、S9 48.8）。
- 貼線的：S6（+6.3，門檻 5）、S7 一般差距（17.9，門檻 20）、藏家單場（47.9，門檻 45）。
