# notes-R1：平衡 R1 寫回（FIXLIST 10）

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做。
依據：FIXLIST 10（主線 2026-11-08 12:2x 選 A 案 R1）＋ Explorer A 的 `scratchpad/v4/balance/A/results.md`（R1 細項、敏感度、N=6000 複查）。
規則、引擎邏輯、經濟、六手上限、手牌 3 張都不動；只動數字＋sim 的檢查與報表。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [ ] 1. content.js：聲望（你 10；一般 22、社團學長 21；主理人 22、樂評 24、藏家 24）、`C.plannerByDepth` normal/easy/easy/normal/normal、`C.honesty` .8/.75/.75；engine 預設表跟著 content
- [ ] 2. sim.mjs：S9（客人場 KO 任一方 ≥35%）、HP 聲望單調（一般最大 ≤ 菁英最小、菁英最大 ≤ 藏家）、KO 分你／他、比聲望條比例；單場表加 KO 列；S7 標題照 C.plannerByDepth 產
- [ ] 3. `sim.mjs --n 3000 --json dev/sim-v4.json`：全部門檻（含 S9、HP）通過
- [ ] 4. engine.test、tutorial.test、check-content、lint-copy（LINES-REVIEW 有變就重產）
- [ ] 5. README（規則／聲望／唬人／出招）、dev/decks-v4.md、規則卡頁尾（hpText 自動算，確認字）

## 記錄
