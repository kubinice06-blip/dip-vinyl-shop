# notes-H1：FIXLIST 11 追加——手牌 5 張平衡（H5-1）、禮物不能賣回、教學五張版

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。
依據：FIXLIST 11 追加＋ scratchpad/v4/balance/H5A/results.md 的 H5-1。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [ ] 1 引擎 CFG handSize 5、playerHp 9；客人聲望 H5-1；規則卡頁尾「你 9」；engine 註解與後備表
- [ ] 2 老闆送的（四張禮物＋王牌）不能賣回：engine choose 擋（錯誤碼）、econ 賣回介面標「老闆送的」不能選；S6 ≥5
- [ ] 3 教學腳本五張版（C.tutorial.script：hand/draw/pick/expect），六課順序不變；男子手牌 3
- [ ] 4 sim --n 3000 22/22；engine.test、tutorial.test、check-content、lint-copy 綠；README 平衡、dev/decks-v4.md、dev/sim-v4.json

## 記錄
