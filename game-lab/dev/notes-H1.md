# notes-H1：FIXLIST 11 追加——手牌 5 張平衡（H5-1）、禮物不能賣回、教學五張版

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。
依據：FIXLIST 11 追加＋ scratchpad/v4/balance/H5A/results.md 的 H5-1。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] 1 引擎 CFG handSize 5、playerHp 9；客人聲望 H5-1；規則卡頁尾「你 9」；engine 註解與後備表
- [ ] 2 老闆送的（四張禮物＋王牌）不能賣回：engine choose 擋（錯誤碼）、econ 賣回介面標「老闆送的」不能選；S6 ≥5
- [ ] 3 教學腳本五張版（C.tutorial.script：hand/draw/pick/expect），六課順序不變；男子手牌 3
- [ ] 4 sim --n 3000 22/22；engine.test、tutorial.test、check-content、lint-copy 綠；README 平衡、dev/decks-v4.md、dev/sim-v4.json

## 記錄
- 步驟 1：engine CFG playerHp 9、handSize 5（enemyHand 3、bagMax 8、maxRounds 6、mercy 不動）；HONESTY／PLANNER_BY_DEPTH 後備表照 R1（註記 H5-1 照用）；
  content 客人聲望 copycat 25、already 20、needle 25、skip 20、broke 25、buyer 25、label 25、critic 26、boss 28（男子 10、教學 18 不動）；
  規則卡頁尾「你 9 聲望；客人 {normal}、菁英 {elite}、傳說藏家 {boss}。」→ 20–25／25–26／28。engine.test：王牌那節 acts＝3×handSize＋1、
  六手那節的比例案例明確給你 10（跟 CFG 無關）、g 那個案例用 CFG.playerHp。engine.test 2040275／0、check-content 通過。tutorial.test 還沒改（步驟 3）。
