# notes-A1：引擎與內容（game-lab v4 第一波）

分支 `v4/A1`（worktree `/home/user/wt/A1`），基底 `origin/main @ ef763c573`。整合分支是 `claude/card-game-fun-lab`（不是 SPEC 寫的 `claude/game-lab-v4`）。
A1 不 push、不在 `/home/user/dip-vinyl-shop` 本身提交；整合由另一步做。

## 階段

- **第 1 階段（本次）**：engine.js v4（§2.1 全部）、content.js 不依賴新烘卡的資料（§2.2.2–§2.2.10）、test/engine.test.mjs v4（用現有 cards.js＋測試內建的星數墊片）、lint-copy／check-content 改版、owner-lines-v4.json。**不校準模擬**。
- **第 2 階段**：合併 A3-M1（新 cards.js／bins.js）後，sim.mjs v4 全部重寫＋§5.2 校準、dev/decks-v4.md、dev/sim-v4.json、截圖（段 2）。

## 進度

（每完成一段就更新這裡並提交）

- [x] engine.js v4（第一版提交；測試在 engine.test 重寫後跑）
- [x] content.js v4（第一波範圍；v3 劇本／回嘴／教學步驟留作墊片）
- [x] tools/owner-lines-v4.json（50 句，程式從 DECISIONS-v4.md 逐字擷取；rules＝規則卡六行）
- [x] test/engine.test.mjs v4（#1–#14 全部；第一波用 STUB 星數補 46 張還沒烘的卡＋假箱子）
- [ ] tools/lint-copy.mjs v4
- [x] tools/check-content.mjs v4（匯出 shapeProblems 給 engine.test #14 共用；第一波只會報 46 張缺卡＋沒有 bins.js，等 A3-M1）

## 測試結果

（尚無）

## 請求

（尚無）

## 截圖

（第 1 階段沒有截圖；段 2 的截圖在第 2 階段模擬全綠後交）
