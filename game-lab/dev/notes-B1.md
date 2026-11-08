# notes-B1：對決畫面（game-lab v4 第二波，SPEC-v4 §3.2 B1）

分支 `v4/B1`（worktree `/home/user/wt/B1`，基底 `v4/base-B`）。測試伺服器：`cd /home/user/wt/B1 && python3 -m http.server 8781`。
截圖：`game-lab/dev/shots/B1/`（不進 repo）。

## 進度

- [ ] 階段 1：B1-M1（§3.2 B1 交件 0）
  - [ ] `duel.js` v4 DOM 骨架＋`data-tut` 名（§2.5.1 的樹）
  - [ ] `elByName`：`card:best:<attr>`、`card:id:<id>`、`chip:id:<id>:<attr>`、`chip:blocked:<attr>`、`e-hint`、`e-honesty`、`rounds`
  - [ ] `gate {kind:'card'}`；再點已選的星鈕不做事；「丟！」唯一出手
  - [ ] 一台唱盤的 `stage.clash` 呼叫（p／e 的 star、blocked、by）；`handStart` 叫 `stage.hold('e',{back:true})`
  - [ ] `dev/duel-harness.html` v4：掛舞台＋盤面，一場打得完；`__lab.force／stage`
  - [ ] 提交 → `git branch -f v4/B1-M1 HEAD`
- [ ] 階段 2：交件 1（§2.5.1 全部、harness 指定他每手、`tests/e2e-duel.mjs` 四尺寸、截圖）

## 實作裁定（契約沒寫死、B1 自己定的，可逆）

（隨做隨寫）

## 規格裡對不上、照哪邊做

- **誠實度名牌**：§2.5.1 的樹有 `.hon[e-honesty]「偶爾唬人」`、§5.5 e2e-duel 要「名牌顯示誠實度」；但 D §5（店主 2026-11-08 06:05「看了很煩」）與 FIXLIST 6 是「整個拿掉、哪裡都不顯示」。照 D：DOM 留 `[data-tut="e-honesty"]`（`hidden`，`elByName` 找得到、教學不會壞），畫面上不顯示；e2e 斷言它**看不到**。
