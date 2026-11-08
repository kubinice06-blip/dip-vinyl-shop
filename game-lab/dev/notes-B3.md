# notes-B3 — game-lab v4 第二波 B3（經濟介面）

分支 `v4/B3`（worktree `/home/user/wt/B3`），基底 `v4/base-B`（da1053a9b）。規格：SPEC-v4 §2.5.6、§3.2 B3、§5.5 e2e-econ、D §6；
任務補充（主線）：箱子抽屜＝走過去翻＋一張大封面翻著看（含星數）、唱片資訊＋試聽、買／包包滿先半價賣回、櫃檯配件、特價箱兩種模式（序章 6 挑 3、之後 $100 三張）、
抽屜只佔下半、選的那箱留在畫面上、點外面關、序章／對決中點箱子＝老闆「打完再翻。」。

擁有：`econ.js`（新）、`econ.css`（新）、`dev/econ-harness.html`（新）、`tests/e2e-econ.mjs`（新）、本檔；
只准修 bug：`stage.js`、`shop.js`、`shop-props.js`、`shop.css`、`shops/dip.json`、`fx.js`。

## 進度
- [x] econ.js（configure／openBin／openBargain／bargainPick／openRelicShop／moneyHTML／isOpen／close＋debug）
- [x] econ.css
- [x] dev/econ-harness.html（掛舞台＋假 run：$800、包包 8、配件 2、今晚的貨；四種面板各自打得開；?mode=night|pick|prologue|duel|title、?money、?bag、?relics、?open、?shot=1）
- [x] tests/e2e-econ.mjs（14 項 × 四尺寸）— **56/56 PASS**
- [x] 段 5 後半截圖（390x664、430x932）
- [x] lint-copy 試掃 econ.js（scratchpad 複本把 econ.js 加進 FILES）：通過
- 全部交件完成；剩店主看截圖後的修改。
- **收尾補做（B3 FINISH，2026-11-08 第二趟）**：
  - [x] 包包沒滿、錢不夠但賣一張就夠 → 鈕可按、先賣一張（SPEC §2.5.6 第 3 點「錢不夠且賣一張也不夠 → 停用」；引擎 `buy` 本來就收沒滿時的 `sellId`）；配件同理（`buyRelic` 收沒滿時的 `sellRelicId`）；e2e 加 #15、#8 改成包包空（賣一張也湊不到）：**60/60 PASS**（四尺寸）
  - [x] index.html 版實測：e2e-econ 加 #21–#25（index.html 今晚來客：錢那一格、真點箱子／櫃檯／特價箱、買了關掉後錢與包包重畫、存檔）；index.html 還沒接 econ.js 就印 SKIP（本樹＝SKIP、60/60）。
    scratchpad 臨時整合（`git archive v4/B2 game-lab`＋B3 的 econ.js／econ.css／harness／e2e-econ＋根目錄 dip-character.js／dip-player.js／art 連結，port 8793；**沒提交、沒動 B2**）：**80/80 PASS**（四尺寸）
  - [ ] 「今晚來客有錢的樣子」截圖（用臨時整合的 index.html）

## 做法（給 B2／C）
- **箱子**：`openBin(key)` → 描框那一箱 → 你的人物照路線走到 `bin.stand`（`stage.walk` 1.5 倍速＝54；走路途中點畫面＝`stage.finish('p')` 直接走到）
  → 到了才 `faceTo` 箱子、`pose p dig` → 開抽屜 → `stage.focus('bin:'+key, {panelMin: 抽屜高})`。抽屜＝#app 底部、最高 50%（`fit()` 依可用高度縮封面，內容不捲動）。
  內容＝**一張大封面翻著看**：封面（點＝唱片資訊＋試聽，`info(card)`；左右滑＝翻）、藝人／專輯／年份、經冷硬星數（峰值畫底線＝定價那軸）、
  `買 $400`（錢不夠＝停用、字「錢不夠」＋小字標價）、‹ › 與縮圖列。包包滿 → 賣回子面板（包包 8 張、每張標 +半價；賣了也不夠買的那張不給選）→「賣這張」（下面小字＝要買的《專輯》買 $400）。
- **特價箱**：開局（`bargainPick`）＝6 格、點選／取消、滿 3 張「收下這三張」才能按、第 4 張換掉最早挑的；不標價；沒有 ✕、點外面不關（鈕晃一下）；長按封面＝唱片資訊。
  之後（`openBargain`）＝剩下的格子挑 1–3 張、「$100：最多挑三張」；包包放不下 → 先賣（要幾張賣幾張）；賣完 → 老闆「特價區今晚賣完了。」。
- **櫃檯**：`openRelicShop` → 走到 `pay`、面向老闆 → 2–3 件（圖示、名字、說明、`買 $1000`）；滿 3 件 → 先賣一件（半價）。
- **打完再翻**：`openBin`／`openBargain`／`openRelicShop` 遇到 `run.duel`、`prologue==='pending'`、`run.pending`（等你收獎勵）→ 老闆泡泡 `C.shopLines.binBusy`、不開。
  （D §6 優先於 §2.5.6 第 6 點「序章途中照列不能買」；序章 O13 由劇本直接呼叫 `bargainPick`，不受影響。）
- 沒有 run（標題、打烊）：抽屜列 `content.bins[key].pool` 前 6 張（特價箱＝`content.bargain.pool` 前 6），只能翻、看；有 run 但 `!canShop`：列今晚的貨、不能買。
- 關：點抽屜外面（`.ec-veil`；只認在 veil 上按下的點擊，點舞台開抽屜那一下補送的 click 不算）、✕、Esc → `highlight([])`、`unfocus(300)`、`pose p null`、resolve。
- `DipLabEcon.debug()`：`{open, walking, kind, key, mode, idx, ids, sel, sub, height, focusH}`（測試用）。

## 測試結果
- `LAB_BASE=http://localhost:8783 node game-lab/tests/e2e-econ.mjs`（預設四尺寸 390x664,375x548,430x932,360x640）：**56/56 PASS**（2026-11-08，最後一次＝9f2f83bb4 之後；含長按兩種情況、賣回／櫃檯／特價箱沒被抽屜蓋到）。
  各面板高（/ #app）：390x664 箱子 277、賣回唱片 332、櫃檯 232、賣回配件 307、挑三張 323、$100 230；375x548 箱子 248、賣回 271、櫃檯 232、賣回配件 267、挑三張 273、$100 225（都 ≤50%、不溢出）。主控台 0 錯誤（strict）。
- 沒改到別人的檔（`git diff --stat v4/base-B..HEAD` 只有 econ.js、econ.css、dev/econ-harness.html、tests/e2e-econ.mjs、本檔）；順手跑 `shop.test` 1058/0、`hit.test` 330/0、`check-shops` OK。

## 截圖
- 截圖好了（段 5 後半「唱片櫃：買賣介面」，deviceScaleFactor 2，`dev/econ-harness.html?shot=1`；腳本 `game-lab/dev/shots/B3/shots-B3.cjs`（不進 repo；讀 LAB_BASE、SIZES）：
  `game-lab/dev/shots/B3/390x664-*.png`、`430x932-*.png`，各 14 張：
  01-walk（點嘻哈箱、走過去途中）、02-bin-dig-drawer（到了在翻、抽屜開著、那一箱整個看得到）、03-bin-flip-2（翻到第 2 張）、
  04-bagfull-sell（包包滿：先賣一張）、05-bagfull-sell-picked（選了一張，鈕寫要買的那張）、06-bagfull-sold-toast（賣＋買的吐司）、07-bin-nomoney（錢不夠）、
  08-relic-shop（櫃檯配件）、09-relic-bought、10-relic-full-sell（滿 3 件先賣一件）、
  11-bargain-pick-2of3／12-bargain-pick-3of3（開局挑三張；長按封面＝唱片資訊、放開才開）、13-bargain-buy（之後 $100）、14-busy（序章中點箱子：「打完再翻。」）。
  「今晚來客有錢的樣子」是 B2 的畫面（ui.js），不在這裡。

## 請求
- **B2**（`ui.js`）：
  1. `index.html`：`<link rel="stylesheet" href="econ.css">`、`<script src="econ.js">` 放在 `ui.js` 前（§3.2 B2 已列）。
  2. `DipLabEcon.configure({...})` 照 §2.5.2；`relicIcon` 不用傳（econ 會用 `DipLabUI.relicIcon`）；`coverBase` 不用傳（index.html 跟 localCover 同一層）。
  3. 開完抽屜後重畫今晚來客的錢／包包那行：`DipLabEcon.openBin(k).then(重畫)`（openBargain、openRelicShop 同）。econ 只在關掉時 resolve。
  4. 點完箱子後你的人物站在那一箱的 stand：今晚來客畫面重畫時不要再 `place('p', UI.lastSpot || 'browse')` 把人瞬移回去（或把 lastSpot 設成那個 stand）。
  5. `onStageAction` 可以直接把 `crate:<key>`／`counter` 轉給 econ：序章／對決／收獎勵中 econ 自己會讓老闆說「打完再翻。」（你那邊照 §2.5.2 先擋也可以，兩邊一致）。
     再來一夜還沒挑特價箱時，`openBargain()` 會自己轉成 `bargainPick()`。
  6. `bargainPick()` 挑完 resolve 那三張的 id；被 `close()`（例：cleanup）收掉時 resolve `null`。玩家自己關不掉。
  7. `C.shopUi` 補這幾個字（tag 新；econ.js 有同字後備，補了才進 LINES-REVIEW）：
     `bag:'包包 {n}/{max}'`、`binEmpty:'這一箱今晚賣完了。'`、`owned:'包包裡有了'`、`bagFullN:'包包放不下：先賣 {k} 張，半價 ${n}'`、
     `relicSell:'賣這件'`、`relicSold:'「{name}」賣掉，+${n}'`、`relicEmpty:'櫃檯今晚的配件賣完了。'`、`prev:'上一張'`、`next:'下一張'`、`infoAria:'唱片資訊、試聽'`。
  8. `C.shopUi.bargainBuy` 寫死「$100」：建議改 `'${n}：最多挑三張'`（econ 會代 `economy.bargainPrice`），校準改價時字不會對不上。改了跟我說，我把代入加上（現在照字面顯示）。
  9. `lint-copy` FILES 加 `['econ.js', 'js', true, false]`（試掃過，通過）。
- **C**：e2e-econ 跑在 harness；index.html 版（今晚來客真的點箱子／櫃檯）整合後請在 e2e.spec 或 e2e-taps 的 night 畫面加一條「點箱子 → 抽屜開、點外面關」。
- **店主（隨截圖附）**：(a) 包包沒滿但錢不夠時，現在是「錢不夠」停用（不提供「先賣一張來湊錢」）；要的話再加。(b) 特價箱之後模式 $100 一次付、挑 1–3 張都一樣價（D §6 例子）。
