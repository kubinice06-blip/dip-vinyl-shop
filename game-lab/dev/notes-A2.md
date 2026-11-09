# notes-A2 — game-lab v4 第一波 A2（舞台與店景）

分支 `v4/A2`（worktree `/home/user/wt/A2`），基底 origin/main @ ef763c573。規格：SPEC-v4 §2.3、§3.1 A2、§4.5、§5.1 A2。

## 進度
- [x] M0 logo：`shop-props.js` EMBLEM（B15 逐字）＋`counterSign`／`signEmblem`（匯出 `DipPropsO.EMBLEM/counterSign/signEmblem`）、`dip.json` counter `sign:{emblem:'dip'}`、check-shops `checkSign`／`checkEmblem`（每個 EMBLEM 項目也驗）、shop.test「櫃檯 logo」段（logo＝[241,184,15,15]、在正面板內、不碰任何熱點形狀、字串／null／壞招牌）
- [x] M0 截圖（段 1）
- [x] M1 `shops/dip.json`（單台唱盤、spots、bin、封面、特價箱、nav）＋ basement 卡片修正 → `v4/A2-M1`
  - dip.json 由 scratchpad `a2/mkdip.py`（從 ef763c573 原檔重產、排版跟原檔一樣）＋`a2/nav.json`（nav 點、stand、特價箱座標）產生；路線評估 `a2/routes.mjs`。
  - 唱盤：刪 deck-e／deck-p，加 `duelDeck` {x122,y316,w48,d9,h18}；spots duelE [90,316]、duelP [202,316]、ref／between [146,304]、leaving [150,110]、mid [96,112]、sale [44,128]；`duel:{deck:[146,293],step:10}`；`meta.crates:null`。
  - 箱子：12 箱＋特價箱都有 `bin:{key,label,stand}`、`front` 照 §4.5（島上 lean 那格＝front[1]）、刪 lean 與箱子的 hot。stand：左排 x86、右排 x197（y＝箱子 y＋8）；爵士 [119,272]、台灣 [163,272]、噪音 [27,264]、民謠（後牆矮櫃）[112,100]、特價 [44,128]。
  - 牆：rack-a（wallA，label 搖滾／流行牆）、rack-b（wallB，label 爵士／靈魂牆）各 7 張、shelving（wallB）2 張、booth.stack kate-bush（wallA）。看得到的封面 60 張不重複。
  - 特價箱〔補〕：`crate-sale` binTable x4 y130 cols2 d14 h12 rec6 label SALE（門下方左牆邊，box [3,97,31,33]、不碰試聽機 box），front Blur《The Great Escape》、Weezer《Van Weezer》；stand [44,128]（離 box 10 格）。
  - nav 新增：[192,124] 中島右後角、[204,188] 櫃檯左前角、[193,266] 中島右前角、[90,124] 中島左後角、[88,268] 中島左前角、[52,158] 試聽機右上、[42,112] 特價箱右上、[115,303]／[177,303] 唱盤兩側後角（老闆從 ref 走到兩側不穿唱盤）。
  - basement：`shelfB.faces` silver-apples → `throbbing-gristle-20-jazz-funk-greats`；basement／taipei 全部引用跟 v4 卡表（final.json＋gold／listen／stake）比過，只有這一張要換。
- [x] 交件 2 的一部分（M1 需要）：`shop-props.js` `duelDeck`（木紋＋dip 黑座、置中加大轉盤、NOW 小窗、綠燈、唱臂、音符）、刪 `deckStand`／`deckGeo`、匯出 `duelDeckGeo`；ledge／binTable／listenDesk 拿掉 `P.poolPick` 退路（空格畫素色封套）。
- [x] 交件 5 的大部分：check-shops（`o34HotIds`、`O34_SPOTS`、`routeOf`、`loadBins`、bin／decor／front／lean／stand／section／ledge 空格／一台 duelDeck／duel.deck／全配對路線）；shop.test（v4 schema、一台唱盤幾何、§2.3.2 路線表、特價箱限制、壞資料抓得到、navRoute null、poolPick 不被叫）。**還沒做**：`stage.hold('o')` 的測試（等 stage.js）。
- [x] 第二階段開工：合併 `v4/A3-M1`（06d9c9ee6）。
- [x] 交件 2–4 程式（e25258e8a）：`stage.js` roundItem（舉封套／他背面→翻面／頭頂方塊／判定火花・白環・比星閃／輸家受擊／贏家上前放唱片／落針＋chime／NOW／舉旗／平手搖頭＋空轉聲／減少動態）、finish／finishAll／faceTo／floorRecord／badge／badgeRect／bins／focus／unfocus、hold('o')、INTERACT 加 bin:*、version '4.0'、duelIn 接 route []；`shop-props.js` holdDraw 封套背面＋翻面壓扁（`DipPropsO.sleeveBack`）；`fx.js` SFX.chime（含 attr null 空轉唱針聲）、`sfxNames()`；`shop.css` `.ds-badge`。
- [x] 交件 5 補完（0d67742c0）：check-shops `footprints()`／`routeHitsFeet()`——D §3「沒有任何人的路線穿過家具」：1406 條全配對路線逐段對每個站立家具的腳下範圍（foot，不加邊、端點不豁免）再查一次，站立道具沒有 foot＝bad；shop.test 新三段（腳下範圍檢查＋做壞抓得到、舞台假 shop 測 version／INTERACT／bins()／hold('o')（老闆手上有、arm show、TT.held 不變、不動 p／f）／finish／finishAll／faceTo／floorRecord、一手時間軸（剋中 100/300/520/600/1000/1500、v3 呼叫星數退回卡片、剋不動白環、平手搖頭 6 次＋chime null、王牌 ace、減少動態 560 resolve、×4 365 ms）、duelIn 接 route []／null）。`clashState().badges` 多帶 `fx`（判定 class，給 harness／測試）。
- [x] 交件 6（da7006fea、429b86cc7）：`dev/stage-harness.html`——只掛舞台；七種一手（剋中／被剋（唬人）／剋不動 gap／剋不動 ace／同色比星／平手／王牌）、停格 100/300/560/1000/1460、×1／×4、減少動態、開聲音、走進唱盤區（duelIn）、老闆拿唱片（hold('o')）、地上唱片（floorRecord）、路線圖；`?kind=&t=` 一開就停格、`?shot=1` 截圖模式；`window.H.{run,seek,measure,routes,routeMode}`；`DipShop.strict=true`。
- [x] 修正（瀏覽器實測後，429b86cc7）：375×548（stripS）頭頂方塊放不下 → `.ds-badge.tight` 小一號，貼齊上緣 2 px 時下緣仍 ≤ 頭頂＋1 格；火花起點／終點改成兩個方塊朝唱盤那一側；扣血 −N 改飄到外側（原本名牌收起時會飄到老闆臉上，`floatOut` 暫時把 fwd 反過來再還原）。
- [x] 平手搖頭看得見（瀏覽器比對：老闆小人左右對稱，光 `flip('o')` 畫面一格不差）→ 照契約每 120 ms 翻面 6 次，另外翻面時整個人往那邊偏 2 格（`nudge`），結束回原位；這個畫法列 §5.7 #18 給店主看（`*-tt-tie-660.png`）。
- [x] 段 3 截圖（見下）

## 下一步
- 第一波 A2 交件全部完成；等 C 整合。剩下只有店主看截圖後的修改請求。

## 測試結果
- 第二階段（最後一次）：`node game-lab/test/shop.test.mjs` **1005 passed, 0 failed**；`node game-lab/tools/check-shops.mjs` **OK（3 份 layout）**。
- `dev/stage-harness.html`（scratchpad `a2/harness-probe.cjs`，LAB_URL）：390×664、375×548、430×932、360×640 **主控台 0 錯誤**；八個停格的頭頂方塊全部「下緣 ≤ 頭頂＋1 格、在畫面內、不碰名牌」（方塊在時名牌 0 個＝已收起）。
- v3 外殼（ui.js＋duel.js v3）配 v4 stage.js：標題畫面 390×664、375×548 主控台 0 錯誤（scratchpad `a2/v3-compat.cjs`；autoplay 從標題不會自己開局，對決路徑由 shop.test 的 v3 呼叫測試蓋）。
- M1（A3-M1 之前）：`node game-lab/test/shop.test.mjs` 916 passed、3 failed——3 條全是「新卡不在 cards.js」（34 張 §4.5 新卡，等合併 A3-M1 的 cards.js）。用 v3 cards ∪ v4 卡表替身跑 check-shops（scratchpad `a2/chk-v4cards.mjs`）：0 problems、0 warnings、13 個 bin:* 熱點、1406 條全配對路線都不穿家具。標題畫面 390×664、375×548 主控台 0 錯誤（v3 ui.js 照常開）。
- M0：`node game-lab/test/shop.test.mjs` 427 passed 0 failed；`node game-lab/tools/check-shops.mjs` OK；390×664@2、430×932@3 主控台 0 錯誤

## 截圖
- 截圖好了（段 3「一台唱盤」，@2，腳本 scratchpad `a2/tt-shots.cjs`，LAB_URL；`?shot=1` 只留舞台＋這一手的說明）：
  - 390×664：`game-lab/dev/shots/A2/390x664-tt-counter-100.png`（舉牌、他背面）、`-counter-300.png`（翻面＋頭頂方塊 經 5／冷 4）、`-counter-560.png`（火花／他受擊 −4）、`-counter-1000.png`（你上前、唱片在轉、NOW 小窗、老闆朝你舉旗）、`-tie-1000.png`（平手：空盤、兩方塊白環）、`-tie-660.png`（老闆搖頭翻面中）；另附 `-gap-560.png`（剋不動：白環）、`-countered-1000.png`（被剋／唬人）、`-ace-1000.png`（王牌金框、台上金標）、`-aceBlock-560.png`
  - 375×548（stripS，方塊小一號）：同一組 `game-lab/dev/shots/A2/375x548-tt-*.png`
  - 路線圖：`game-lab/dev/shots/A2/390x664-routes.png`（§2.3.2 的 13 條路線，各標號＋圖例秒數；紅虛線＝家具腳下範圍、白點線＝中島右側走道；13／13 沒穿家具、沒超過上限；counter→dig1／dig2／dig2→counter 經過右側走道）
- 截圖好了（段 1 logo）：`game-lab/dev/shots/A2/390x664@2-logo.png`、`430x932@3-logo.png`、櫃檯放大 3 倍裁切 `390x664@2-logo-counter-x3.png`、`430x932@3-logo-counter-x3.png`（腳本：scratchpad `a2/logo-shots.cjs`，LAB_URL）

## 請求
- **A3**：合併 `v4/A2-M1` 後 check-shops／shop.test 才會全綠（要 A3-M1 的 cards.js 有 §4.5 的 126 張新卡）。命中用的資料：每個箱子 `o.bin.{key,label,stand}`（主熱點形狀＝`binTable` 的 box）；後牆矮櫃 `backbin` 照舊 `hotCovers:true`；特價箱是 `binTable#crate-sale`、key `sale`。牆上的區在 `section`（rack-a／booth＝wallA，rack-b／shelving＝wallB），區名在 rack-a／rack-b 的 `label`（給 covers 截圖標區名用）。check-covers 要查的 `front`／`cards`／`stack` 都已照 §4.5 填好；如果烘焙有替換，告訴我舊 id→新 id，我改 dip.json。
- **B2／C**：`ui.js` 目前（v3）在 `meta.crates` 是 null 時沒有用到它，標題畫面正常。
- **B1**（第二波）：選牌階段在 `handStart` 呼叫 `stage.hold('e', {back:true})`（取代 `duel.js:806-808` 拿他亮出那張）；`clash()` 傳 `p/e.star`、`blocked`、`by`（沒傳也能演：星數退回卡片那軸、by 從屬性推）；盤面點一下 `stage.speed(4)`；`stage.badge`／`badgeRect` 可用。
- **B2**（第二波）：`finish(id)`／`finishAll()`、`faceTo(id, other)`（other＝人、spot 名或 [x,y]）、`floorRecord(at|null, {attr, card})`（at＝spot 名、[x,y] 或人）、`hold('o', {sleeve})` 都在；`walk` 照舊回 Promise，`finish` 會 resolve 它。
- **B3**（第二波）：`stage.bins()`、`focus(hotId, {panelMin, ms=300})`、`unfocus(ms=300)`；`INTERACT` scene／duel／reward 都含 `bin:*`。
- **C**：`index.html` 的 `?v=`（stage.js、shop.css、shop-props.js、fx.js 都改了）由 C 統一加；C 整合後在 check-shops 加 `bin:*` 與 `DipShop.buildHotList` 的交叉比對（§3.3）。
- **A3**（不擋）：`shop.float` 在名牌收起、人面向唱盤時會飄到老闆臉上；stage 已自己繞開（`floatOut`），shop.js 不用改，只是讓你知道。

## 實測路線時間（1 倍速 72 格/秒；`node game-lab/test/shop.test.mjs --routes`）
| 路線 | 格 | 秒 | 上限 |
|---|---|---|---|
| counter→dig1 | 199 | 2.76 | 3.2（經 [206,190]、[193,266]，右側走道） |
| counter→dig2／dig2→counter | 144 | 2.00 | 3.2 |
| counter→mid | 170 | 2.37 | 3.5 |
| mid→ref | 226 | 3.13 | 3.5 |
| pay→leaving | 175 | 2.43 | 3.5 |
| atdoor→duelE | 222 | 3.08 | 3.5 |
| leaving→duelP | 237 | 3.29 | 3.5 |
| ref→visit | 25 | 0.35 | 3.5 |
| visit→dig1 | 59 | 0.82 | 3.5 |
| duelE→door | 238 | 3.31 | 3.5 |
| browse→sale | 264 | 3.67 | 4.5 |
| sale→pay | 279 | 3.88 | 4.5 |
| 箱子 stand 兩兩最慢：ost↔noise | 270 | 3.75 | 4.5 |
