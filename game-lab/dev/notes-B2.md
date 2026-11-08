# notes-B2 — 序章、外殼、教學（game-lab v4 第二波，SPEC-v4 §3.2 B2）

分支 `v4/B2`（worktree `/home/user/wt/B2`，基底 `v4/base-B` @ da1053a9b）。不 push、不在 /home/user/dip-vinyl-shop 提交。
伺服器：`(cd /home/user/wt/B2 && nohup python3 -m http.server 8782 >/dev/null 2>&1 &)`；e2e 讀 `LAB_URL`／`LAB_BASE`（我跑的時候 `LAB_BASE=http://localhost:8782`）。

## 階段
- **第 1 階段（完成）**：beat runner（§2.5.3）、v4 劇本（§2.5.4＋D §2）、序章面板（§2.5.7）、外殼（§2.5.2）、刪 v3 墊片與試做版新增、
  序章藏 r1、走位（D §3）、lint-copy 26 句原句、check-content、`tests/e2e-prologue.mjs`（§5.4）全綠、段 4 截圖。
- **第 2 階段（還沒開始）**：教學六手（§2.5.5：`C.tutorial.steps／learned／ui`、`tutorial.js`、replayDuel／fakeRun、`test/tutorial.test.mjs`）、
  `tests/e2e.spec.mjs` 改 v4（import e2e-lib）、規則卡四尺寸不捲動（實測 390×664 規則卡 .pane 高 805 px > 可視高 664：三角圖＋六行＋頁尾太高，要改緊湊版；第 6 行 54 字已會自動換行）。

## 進度（第 1 階段）
- [x] notes 開工（4d5cd0efc）
- [x] content.js：v4 劇本 `C.script`（prologue O1–O21、epilogueWin E1–E11、bossEnter、clear、dead、again）、`C.tonightLines`（店主）、`C.blocking`（speed 54、toDuel、toSale）；
      刪 `C.junk／junkLabel／habits／habitLabels／retorts`、v3 劇本（quietPrologue、afterPrologue）、`C.bins[*].ids`（2e34201a9）
- [x] ui.js：逐句執行器、序章／收尾／再來一夜／續玩流程、面板、外殼 v4（2e34201a9）
- [x] lint-copy、check-content、LINES-REVIEW（4e3f0a65e）
- [x] tests/econ-stub.js（DipLabEcon 替身）、tests/e2e-prologue.mjs、keepHeads（375×548 選單打開時人頭不被裁）、四張面板量高度（本次提交）
- [x] 段 4 截圖（見下）

## 做了什麼（ui.js）
- **逐句執行器**（`Dialogue`，§2.5.3）：set 立即套 → 依序 await pre → 打字＋依序 act → 字打完而且 act 做完才亮 ▼（有 ui 的句子以選擇樣式亮、點一下才開面板）。
  點一下＝只把「正在跑的葉節點」快轉到終點（par 底下每支各自那一步；字還在打順便補完），下一步照常開始、照常速度；⏩＝之後每一步一開始就收尾、不打字、不等 ▼，停在下一個有 ui 的句子；
  UI.auto＝每步立刻收尾、每句 120 ms。每一步都有 finish（walk→stage.finish、pose ms→收手、wait→結束、give→封面全部落位）。
  時間軸 `UI.timeline`（`__lab.timeline()`）：start／pre／typed／act／next／ui＋每一步結束 `{ev:'step', step:'walk o dig1', how:'done'|'tap'|'ff'|'auto'}`。
  `'@man'／'@guest'／'@gift'／'@drop'` 由執行器代入（劇本不寫死人名）。走路速度預設 `C.blocking.speed`（54），O20 36。
- **give（O14）**：王牌＋包包 7 張從櫃檯（`stage.hotRect('counter')`）一張一張飛進包包條（間隔 250、每張 520 ms），最後一張落位才完成；O14 之前包包條一律空（挑王牌只建 run 不畫）。
- **面板**：猜歌（prompt＝O7 的面板標題、不換歌、900 ms 亮對錯，記 `ctx.guessed`）、挑王牌（不切歌、預設＝猜歌時選的那張）、**四張**（新：封面＋推薦語，`收下這四張` 只是確認）、
  **特價區**（`DipLabEcon.bargainPick({prompt})`；econ.js 沒載到時用最簡單的備用面板，照樣讓玩家自己挑三張）、兩顆接受對決（一律都出現；第 0 顆＝教學、教學程式不在就 `overlay:false`）、
  撿起面板（`cardPanel(title:null)`＝沒有標題列）、配件三選一。
- **選完接受對決**：對話框清空 → `C.blocking.toDuel`（老闆走到 ref、等 400 ms、你和他走到兩側；點一下只快轉正在走的人）→ 三人站定 → `beginFight({tutorial, overlay, enter, prewalked})`。
- **收尾**：E4 地上留一張盤（`floorRecord('duelE')`）→ 他走到門口 → 門才晃 → 走出門 → 藏起來；撿起面板關掉才 `floorRecord(null)`。E11 → `run.shop.firstGuestInside = true` → 今晚來客。
  重新整理回來：撿過盤就從 E5 接、配件也挑過就從 E8 接。
- **外殼**：`SAVE_V 4`、`validRun`（v4、錢＝非負整數、shop 形狀）；規則卡刪 v3 例子、頁尾代入 `C.rules.hpText`；`LAB_ICONS` 加 heavy180／numbered／matrix；
  今晚來客：熟客出現（`hide r1 false`）、錢（`DipLabEcon.moneyHTML`，沒有就 `C.shopUi.money`）、第一位客人在 atdoor（不剪影、不推門、直接開打、清旗標）、
  再來一夜挑到一半 → 進今晚來客先開特價區；`onStageAction`：`crate:<key>`（序章／對決／領獎＝老闆「打完再翻。」；今晚來客與標題＝`openBin／openBargain`；
  再來一夜還沒挑＝`bargainPick`；不認得的 key → console.warn）、櫃檯（今晚來客且 `canShop`＝`openRelicShop`）；`binOf／openBin` 刪掉；
  `cleanup` 加 `DipLabEcon.close()`；贏了 `out.earn>0` → 吐司 `+$300`；`DipLabEcon.configure(...)`（舞台 mount 完、第一個畫面之前；舞台失敗也照樣接）；
  `__lab.money(n)／shop()／timeline()／tap()／beat／econ`、`autoplay(..., {guess:'right'|'wrong'})`。
- **續玩**：序章途中特價區還沒挑 → 序章從頭；挑過了 → 直接到男子那場（§5.5 #44）。
- **刪掉的試做版新增**（D §2）：回嘴選單＋Coldplay 梗、jabBubble、好耳朵章、「點封套下面的字…」、一百塊三張、掉出一張盤、每個禮拜都來聽、交流夜、第一次推門的熱點標籤 reveal、quietPrologue 分支、`firstRecordId`。

## 跟規格不一樣／規格沒寫、我自己定的（可逆）
1. **E4 多走兩步**：規格「walk f → door → door swing → hide f」；我在 swing 後加 `wait 200 → walk f → out（門外）` 再藏——D §3「他真的走出門」，門晃的那一刻他還是在 door（P9 照測）。
2. **`C.blocking`**（新鍵）：`toDuel`（§2.5.4「選完之後」那串步驟）、`toSale`（再來一夜走到特價箱）、`speed`（54）。放 content 是為了「站位資料驅動、執行器不寫人名」。
3. **again** 只有一句：`「……又是你。」` 那句直接帶 `ui:'acePick'`（原本的第二句「點封套下面的字…」刪了，沒有別的句子可以掛面板）。
4. **bossEnter B2** 的 act 多 `door close`（他進門後關門，跟 O17 一致）；`clear` C1 保留 `music:'stake'`。
5. **今晚來客不瞬移**：老闆／你已經在店裡看得到時用走的回櫃檯／browse（`settle`），不在店裡才 put。
6. **標題畫面**：第一次（接著就是序章）把熟客藏起來，免得推門時她突然消失。
7. **客人名牌小視窗**：脾氣那欄刪掉，改放他的口頭禪（`C.lines[id].line`）。FIXLIST 6（名字、可信度）沒動。
8. **矮螢幕人頭不裁**：選單打開時舞台收高，`full` 鏡頭從牆頂裁掉一截會切到後走道三個人的頭（375×548 的 O21 實測）。`keepHeads()` 把鏡頭往上移到頭頂留 4 格（用 `stage.shop.view／tweenView`，高度倍率不變）。
   建議 A2／C 之後給 stage 一個正式 API（例如 `camera(name, {keep:['p','o','f']})`），我就改用它。
9. **四張面板**：量內容高度要舞台讓位（同 reward 畫面的做法，最多 72%；放不下就收成對決那條）；375×548 最後一張要在面板裡捲一下（按鈕固定在下面）。
10. **e2e-prologue 的 P7**：「家具範圍」用 `DipShop.footprints(L)`（不加邊，F1 之後 check-shops／shop.test 用的同一份），不用 `navObstacles`（加了避障邊，站位本來就會在邊裡）；
    位移上限＝速度×（取樣間隔＋200 ms）＋1：像素店約 10 fps 才更新位置（一格最多算 0.2 秒），取樣看到的是一格一格的跳。
11. **P10「▼ 空檔」**只算同一句裡 ▼ 一直亮著的時間（換句那一下不算）。
12. 六手比聲望（店主待定）不是我的檔，沒碰。FIXLIST 2（拿掉王牌不會被剋）、6（客人名字）沒有派給我，沒做。

## 測試結果（第 1 階段最後一次）
| 指令 | 結果 |
|---|---|
| `LAB_BASE=http://localhost:8782 node game-lab/tests/e2e-prologue.mjs`（C＋A＋B） | C 9／9、A 24／24、B 19／19 全過（B 完全不點 161 秒） |
| `node game-lab/tools/lint-copy.mjs` | 通過；v4 劇本原句 26／26、順序一致；店主逐字 40 句 |
| `node game-lab/tools/check-content.mjs` | 通過（含新的 scriptProblems） |
| `node game-lab/test/shop.test.mjs`／`hit.test.mjs`／`chars.test.mjs` | 1058／330／30061 passed, 0 failed |
| `node game-lab/tools/check-shops.mjs`／`check-covers.mjs` | OK／OK |
| `node game-lab/test/engine.test.mjs --quick` | 171169 passed, **1 failed**：#14 第 681 行 `Object.keys(C.habits)`（墊片刪了就丟錯），見「請求」 |
| `node game-lab/test/tutorial.test.mjs` | 還是 v3 的（第一波就預期會壞），第 2 階段改寫 |

另外手動探過（scratchpad `B2/probe3.mjs`，替身 econ）：序章中點箱子＝老闆泡泡「打完再翻。」、不開抽屜；今晚來客點箱子＝`openBin:jazz`、特價區＝`openBargain`、
櫃檯（canShop）＝`openRelicShop`、不認得的 key＝console.warn；錢那格 `$300`；規則卡頁尾「客人 17–20、菁英 17–20、傳說藏家 16」；主控台 0 錯誤。

## 截圖（段 4「序章」；deviceScaleFactor 2；腳本 scratchpad `B2/shots.mjs`，讀 LAB_BASE；經濟介面是替身，特價區面板等 B3）
截圖好了：`game-lab/dev/shots/B2/`
- 390×664：`390x664-O1.png`、`-O3.png`（走到架前）、`-O7-guess.png`、`-O9-acepick.png`、`-O11-dig.png`（老闆在 dig1 翻）、`-O12-recs.png`（四張）、
  `-O13-sale.png`（你走到特價箱、▼ 亮）、`-O14-fly.png`（封面飛入中途）、`-O17.png`（後走道對峙）、`-O20.png`（老闆站兩人中間）、`-O21-menu.png`、
  `-toDuel-settled.png`（選完走到唱盤三人站定）、`-E4-door.png`（他在門口、門開著）、`-E4-pickup.png`（撿起面板，沒有標題）、`-E7-table.png`（老闆在長桌翻）、
  `-E10-guest.png`（第一位客人）、`-night.png`（今晚來客：錢、第一位在店裡、熟客出現）
- 375×548：`375x548-O17.png`、`375x548-O21-menu.png`（後走道的人頭沒被裁）、`375x548-toDuel-settled.png`、`375x548-O12-recs.png`

## 請求
- **B1（或 C）**：`test/engine.test.mjs:681` `for (const k of ['habits', 'habitLabels']) ok(Object.keys(C[k]).length <= 2, 'v3 shim ' + k + ' only');`
  —— 墊片照規格刪掉了，`Object.keys(undefined)` 丟錯讓 #14 整段算失敗。改成 `ok(!(k in C), 'v3 shim ' + k + ' removed');`（一行，不動契約）。
- **B1**：`dev/duel-harness.html:117` `[...C.gifts[aceTier], ...C.junk]`——`C.junk` 刪了（spread undefined 會丟錯）。改用特價箱三張，例如
  `const bp = ['c','o','h'].map(a => C.bargain.pool.find(id => E.topAttr(C.cards[id]) === a));`（跟 §2.5.5 重看教學的 fakeRun 同一個挑法）。
- **C**：`tests/e2e-lib.mjs`（沒人擁有）`seedRun` 還寫 v3 存檔：`v: 3` → `v: 4`（v3 會被 ui.js 當舊檔丟掉）；`C.junk` 刪掉；非序章的 run 要先
  `E.choose(r, C, E.bargainPolicy(r, C))`（不然今晚來客一進去就先開特價區挑三張）。`r.goodEar` 那行可以刪。
- **C**：e2e 要用經濟介面替身時，`tests/econ-stub.js` 可以拿去用（page.route 把 econ.js 換成它）；`tests/e2e-prologue.mjs` 一律用替身＋把試聽換成無聲 WAV，整合後照樣跑。
- **A2／C（建議，不擋）**：stage 給一個「鏡頭收高時保住某幾個人頭」的 API（見上面第 8 點），ui.js 的 `keepHeads` 就能換成正式呼叫。
