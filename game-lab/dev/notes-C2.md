# notes-C2 — game-lab v4 第二波整合（SPEC-v4 §3.3 步驟 1–4）

分支 `claude/card-game-fun-lab`（/home/user/dip-vinyl-shop）。不 push、不開 PR、不寫 PROJECT_MEMORY（步驟 5 是主線的）。
伺服器：`cd /home/user/dip-vinyl-shop && python3 -m http.server 8765`。截圖：`game-lab/dev/shots/C2/`（不進 repo）。
容器會重啟：開工先看本檔「進度」與 `git log`，做過的不重做。

## 進度
- [x] 1. 合併 v4/B1 → v4/B3 → v4/B2（--no-ff；三個都沒衝突）
- [ ] 2. 請求：B1／B2／B3 notes＋第一波遺留（check-shops 交叉比對、e2e-taps 今晚來客）
- [ ] 3. B2 的 DipLabEcon 替身換成真的 econ.js
- [ ] 4. index.html ?v=41；README v4
- [ ] 5. 全部檢查（§5）
- [ ] 6. 段 6 截圖（shots/C2/）＋自己看過、修畫面問題

## 請求處理紀錄
- [x] B2：engine.test:681 墊片檢查改 `!(k in C)`（a1976a702）
- [x] B3 7／8：C.shopUi 補 14 字、bargainBuy `${n}`＋econ.js 代入；check-content 查新鍵（0ff381d17）
- [x] B3 4：econCall 關掉後 `UI.keepP`，今晚來客重畫不把你走回 browse（06f487636）
- [x] B2：長按封面開唱片資訊、放開補送的 click 關掉 → cardinfo.js 只認在遮罩上按下的點擊（06f487636）
- [x] B2（建議）：duel hold() 先 finish 結果框進場動畫（06f487636）
- [x] B1：fx.js seeThrough 刪掉（06f487636）
- 已由 B2 做掉、不用再動：B3 1／2／3／5／6／9（econ 標籤、configure、關掉後重畫、onStageAction 轉 econ、bargainPick resolve、lint-copy 掃 econ.js）；B1 給 B2 的盤面名字。

## 測試結果

## 截圖
