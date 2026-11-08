# notes-X：規則、經濟、客人名字（v4 第二波後修正，Agent X）

Worktree `/home/user/wt/X`，分支 `v4/X`（從 `claude/card-game-fun-lab` 31ed4b385 開）。只 commit、不 push。
依據：SPEC-v4、DECISIONS-v4、FIXLIST 2／3／4／5／6／8（FIXLIST 蓋過 spec）＋主線給的 X／Y 共用契約（箱子鍵、分類、稀有度、價格、每晚上貨）。

OWN：engine.js、content.js、sim.mjs、test/engine.test.mjs、tools/check-content.mjs、tools/lint-copy.mjs、tools/owner-lines-v4.json、
LINES-REVIEW.md、dev/decks-v4.md、dev/sim-v4.json、dev/notes-X.md。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [ ] 1. FIXLIST 2：拿掉王牌不會被剋（clash、duelText、規則卡第 6 行、owner-lines、lint、教學資料）
- [ ] 2. FIXLIST 3：六手比聲望條剩幾成（一個函式）
- [ ] 3. FIXLIST 6：客人名字、拿掉 title／誠實度標籤
- [ ] 4. FIXLIST 8＋契約：稀有度、價格、特價箱每張、配件 3000、每晚上貨（含 new／picks／feature）
- [ ] 5. sim 重調（聲望、獎金、開局錢）→ content.js、decks-v4.md、sim-v4.json
- [ ] 6. 全綠、commit

## 給別人的請求（不是 X 的檔）

（做的過程中補）
