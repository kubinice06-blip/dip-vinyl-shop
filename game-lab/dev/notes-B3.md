# notes-B3 — game-lab v4 第二波 B3（經濟介面）

分支 `v4/B3`（worktree `/home/user/wt/B3`），基底 `v4/base-B`（da1053a9b）。規格：SPEC-v4 §2.5.6、§3.2 B3、§5.5 e2e-econ、D §6；
任務補充（主線）：箱子抽屜＝走過去翻＋一張大封面翻著看（含星數）、唱片資訊＋試聽、買／包包滿先半價賣回、櫃檯配件、特價箱兩種模式（序章 6 挑 3、之後 $100 三張）、
抽屜只佔下半、選的那箱留在畫面上、點外面關、序章／對決中點箱子＝老闆「打完再翻。」。

擁有：`econ.js`（新）、`econ.css`（新）、`dev/econ-harness.html`（新）、`tests/e2e-econ.mjs`（新）、本檔；
只准修 bug：`stage.js`、`shop.js`、`shop-props.js`、`shop.css`、`shops/dip.json`、`fx.js`。

## 進度
- [x] econ.js（configure／openBin／openBargain／bargainPick／openRelicShop／moneyHTML／isOpen／close＋debug）— 3845e795e、04e2fbc8e
- [x] econ.css
- [x] dev/econ-harness.html（掛舞台＋假 run：$800、包包 8、配件 2、今晚的貨；四種面板各自打得開；?mode=night|pick|prologue|duel|title）
- [x] tests/e2e-econ.mjs（14 項 × 四尺寸 390x664,375x548,430x932,360x640）— 56/56
- [ ] 段 5 後半截圖（390x664、430x932）
- [ ] 收尾：通讀、lint-copy 試掃 econ.js、notes 請求段

## 下一步
- 截圖腳本（scratchpad b3/shots.cjs）→ game-lab/dev/shots/B3/。

## 測試結果

## 截圖

## 請求
