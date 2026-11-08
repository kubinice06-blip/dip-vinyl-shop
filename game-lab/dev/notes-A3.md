# A3 notes（命中與卡池）— game-lab v4 第一波

分支 `v4/A3`（worktree `/home/user/wt/A3`）。規格：`v4/SPEC-v4.md` §2.2.1、§2.4、§3.1 A3、§4、§5.1。

## 狀態
- [x] M1：deck-lists.json v4、bake-cards.mjs（跳 `_` 鍵、_region、bins.js）、pitches.json、cards.js＋bins.js（0 problems）、substitutions-v4.json、index.html 載入 bins.js → 分支 `v4/A3-M1`
- [x] 第二段開工：合併 `v4/A2-M1`（2026-11-08，merge commit，無衝突）
- [x] shop.js §2.4＋§2.3.7＋test/hit.test.mjs（commit 177c14e3f；hit.test 330 passed、shop.test 919、check-shops OK）
- [x] tools/check-covers.mjs（commit 41340b56a；OK，看得到的封面 60 張、12 箱）
- [x] tests/e2e-lib.mjs（從 e2e.spec.mjs:59-234 複製）、tests/e2e-taps.mjs（四尺寸 28/28，commit 841965e3d）
- [x] dev/bins-v4.md（commit 11fc44de3；產生器 `dev/shots/A3/mk-bins-md.cjs`，不提交）
- [x] 截圖（段 5 前半，見下）；highlight（抽屜開著時描那一箱）也改描看得到的那一塊
- [x] 第二段全部交件（index.html 的 bins.js 在 M1 已做）

## 第二段做了什麼（shop.js §2.4＋§2.3.7）
- `DipShop.buildHotList(L, PROPS, S)`：主熱點（道具 hot、箱子 bin → `bin:<key>`／`crate:<key>`／名牌＝bin.label）、子熱點（`hots(o,S)`，深度＝父＋0.01、`parent`）、
  跟著人走（`follow`，深度＝y＋0.5，`DipShop.followHot`）、沒 follow 的 layout 熱點＝−1、遮擋物（沒有主熱點的站立道具：2 盆植物、凳子、窗下矮櫃、高櫃、唱盤台）。
  沒有 `box` 的道具（植物、凳子、矮櫃、高櫃）用 OPainter 量外框模式量它畫出來的範圍當形狀（純計算，Node 也能跑）。
- `DipShop.hitPick(hots, x, y, {r, enabled, raw})`：最上面（深度 → 子＞主＞遮擋 → pri → 面積小 → 順序後）；遮擋物／停用 → null 不往後穿；主熱點的子熱點也包含 → 回子熱點；
  沒有任何形狀包含才容錯，r＝max(L.fat, ceil(22/scale))（390 寬 17 格）。另匯出 `hitTop`、`hotRegion`（可見區）、`regionCenter`（離邊界最遠的一格）、`regionOutline`、`navClear`、`navFallback`、`propVisBox`；`version '4.0'`。
- 按下：`pointerdown` 命中就 `state.press` 並立刻 render（金色 #ffcf3a 描框，到放開或 900 ms）；放開同一熱點 → tapHot（名牌＝曲風全名）。
  **描框描的是「看得到的那一塊」的外圍**（被前排箱子擋住的部分不描；矮櫃連封面一起圍），不是整個 shape 矩形——後排島箱用 box 描會畫穿前排，看不出按的是哪一箱。
- `shop.hotPoints()`（每個啟用熱點的可見區最裡面那格，CSS px 相對 host）、`shop.hotList()`、`shop.pick(x,y,o)`、`shop.hotRegion(id)`（測試／工具用）；`hotspots()` 多帶 shape／depth／parent。
- `navRoute` 走不到回 null、自己不丟例外；`routed()`：`DipShop.strict`（`?strict=1` 或 Node 設）→ throw `[shop] no route <id> <from>→<to>`，`walk` 回 rejected Promise＋console.error、人不動；
  非嚴格 → 繞「從起點直線走得到、離終點最近」的 nav 點，再不行直線走，console.warn，絕不 put。`api.route` 走不到回 `[]`。
- 橫條鏡頭（vh ≤ 120）泡泡：說話者在哪半邊就夾在那半邊、避開老闆 x±16 格，寬 ≤ mid−ownerHalf−10；頭頂放得下放頭頂、放不下貼頂；老闆照舊置中。
- 封面載入重烘合併成每 100 ms 一次（§6.4）。
- **實測抓到的**：手機 Chrome 的觸控調整（touch adjustment）只把有 click／mouse 監聽的元素當點擊目標，畫布只有 pointer 監聽 → 375×548 點舞台上緣右邊（牆上 Hermeto 那格）
  會被吸到頂列「捏角色」連結、開出捏角色。畫布加一個空的 click 監聽就好了（shop.js，不動 ui.js）。

## 進度紀錄
（開工 2026-11-08）
1. `tools/deck-lists.json` v4：由 `v4/spec-work/rev/final.json`（評審後定稿）＋v3 的 gold／listen／stake 產生；
   28 組（10 位客人、man_drop、三組禮物、bargain、wall_a／wall_b、bin_×12）逐組逐序跟 SPEC-v4 §4 表格的 id 欄比過，0 差異
   （產生與比對腳本：scratchpad `A3/build-lists.cjs`、`A3/xcheck-spec.cjs`）。設定鍵 `_doc`、`_region`（12 筆，§4.5 列的那些＋王菲 zh）、`_bins`（14 區）、`_ost`（2）。
2. `tools/bake-cards.mjs`：跳過 `_` 鍵；`REGION_OVERRIDE`＋TW／JP 正規式補齊（五月天、伍佰、蔡琴、江蕙、陳建年、陳明章／吉田美奈子、松田聖子、久石譲、大野雄二）、
   新增 ZH（王菲）；needPitch＝ace_*、gift_*、bargain、gold；牆可以擺王牌（OK Computer，星數照王牌組）；產生 `bins.js`，
   並檢查每箱每張符合 rule、箱子不跟任何排他組重複、兩面牆不重複（BIN-RULE／BIN-OVERLAP），有問題就在打網路之前先停。
3. `tools/pitches.json`：刪 karen-dalton／miles／devo；新增 3 張禮物＋8 張特價箱推薦語（`新`）；腳本比對：pitch 鍵 31 ⊂ v4 所有卡、29 張需推薦語的卡 0 缺。
4. 烘焙（`NODE_USE_ENV_PROXY=1 node game-lab/tools/bake-cards.mjs`；這個容器的 Node fetch 要這個環境變數才走代理）：
   **0 problems**，207 張（v3 117 張：留 81、新 126、刪 36），封面 207/207、試聽 207/207 驗過，CAA→Apple 300px 57 張，
   連結 apple 207／spotify 176／bandcamp 47。保留卡的 region／星數／封面／試聽／推薦語 0 變動（腳本逐欄比對）。
   region：xx 156、tw 30、jp 20、zh 1（王菲）。bins.js 14 區 113 格（12 箱 ×8＋wallA 8＋wallB 9），獨立腳本對 final.json 與每區 rule 重驗 0 問題。
   之後只改了 bins.js 的輸出順序（箱子在前、牆在後），用 `--covers-only` 重寫（cards.js 位元組不變）。
5. `tools/substitutions-v4.json`：沒有替換（只有 `_doc`）。
6. `index.html`：`<script src="bins.js"></script>` 放在 cards.js 與 content.js 之間（沒加 `?v=`，C 統一加）。

### 給 A1／A2：v4 cards.js 不再有的卡（36 張；v3 的 content.js／shops 還在引用，換成 §4 的卡）
- content.js 引用到的：karen-dalton-in-my-own-time miles-davis-you-re-under-arrest devo-oh-no-it-s-devo westlife-coast-to-coast oasis-be-here-now
  linkin-park-one-more-light duster-stratosphere broadcast-tender-buttons xiu-xiu-fabulous-muscles joe-harriott-free-form 美秀集團-amazing-show-電火王
  deca-joins-鳥鳥鳥 老王樂隊-吾日三省吾身 生祥樂隊-圍庄 mogwai-young-team explosions-in-the-sky-the-earth-is-not-a-cold-dead-place this-heat-repeat
  silver-apples-silver-apples popol-vuh-in-den-garten-pharaos popol-vuh-hosianna-mantra 坂本龍一-async kenny-wheeler-gnu-high 美秀集團-amazing-show-多色寶山大王
  masonna-mademoiselle-anne-sanglante-ou-notre-nymphomanie-aur melt-banana-scratch-or-stitch peter-brotzmann-nipples sunn-o-life-metal
- shops/dip.json：坂本龍一-async miles-davis-you-re-under-arrest 美秀集團-amazing-show-電火王 deca-joins-鳥鳥鳥 老王樂隊-吾日三省吾身 kenny-wheeler-gnu-high melt-banana-scratch-or-stitch sunn-o-life-metal
- shops/basement.json：silver-apples-silver-apples（§3.1 A2 交件 1 已列）；taipei.json、index.json：無。

## 測試結果
- 第二段（2026-11-08，合併 A2-M1 後）：
  - `node game-lab/tools/bake-cards.mjs`（NODE_USE_ENV_PROXY=1）：0 problems、exit 0；重烘出來的 cards.js／bins.js 跟提交的一個位元組都不差
  - `node game-lab/tools/check-covers.mjs`：OK（看得到的封面 60 張、12 箱；另用 v4/A1 的 content.js 跑過交叉比對 0 problems，含 m2Swaps 的新卡）
  - `node game-lab/test/hit.test.mjs`：330 passed、0 failed（約 0.8 s）
  - `node game-lab/test/shop.test.mjs`：919 passed、0 failed；`node game-lab/tools/check-shops.mjs`：OK（A2 的，確認 shop.js 改動沒弄壞）
  - `LAB_URL=http://localhost:8773/game-lab/index.html node game-lab/tests/e2e-taps.mjs`：四尺寸 28/28 PASS（標題畫面；#1 hotPoints 真點 44/44（375×548 37/37，牆上第一排 7 張在鏡頭外）、
    #2 13 箱×左中右、#3 probe3、#4 21 件家具、#5 按下金框＋放開名牌 16 個、#6 橫條泡泡不碰老闆、#7 主控台 0 錯誤（?strict=1））
  - v3 `tests/e2e.spec.mjs`（390×664 抽 11 個情境）：#1 #18(店內封面) #39 過；其他 FAIL＝`engine: missing card westlife-coast-to-coast`（M1 刪掉的卡、v3 content 還在引用，§3.1 預期壞）。對照組（合併 A2-M1、還沒改 shop.js 的 28026882f）見下一行。
- M1（2026-11-08）：`node game-lab/tools/bake-cards.mjs` 0 problems、exit 0；`lint-copy` 通過（LINES-REVIEW.md 已 checkout 回去，A1 擁有）。
  `engine.test`、`check-content`、`check-shops`、`shop.test` 失敗＝v3 的 content.js／shops 引用上面 36 張已刪的卡（預期，A1／A2 換成 v4 牌組與封面後就好）。

## 替換（§4.6）
- M1：無（207 張全部烘得出來）。

## 請求
- **主線／A1**：v4/A1 的 notes-A1 已經寫了 A3-M2 請求（冷門仙人、跳針王各換 2 張：don-slepian-sea-of-bliss、harold-budd-abandoned-cities、roberto-goyeneche-cantor-de-mi-barrio、king-sunny-ade-aura）。
  這一段的派工沒包含 M2，我沒做；要做就派給 A3（改 deck-lists.json、重烘、提交 v4/A3-M2）。check-covers 已經會檢查 content.m2Swaps 的新卡不跟箱子重複。
- **B2（第二波）**：`tests/e2e.spec.mjs` 改成 import `tests/e2e-lib.mjs`（從 :59-234 複製過來，行為不變；多了 `newPage(…, {dpr})`、`LAB_BASE`、預設四個驗收尺寸）並刪掉自己那份；
  e2e 用 `?strict=1` 開（走不到就主控台錯誤）。
- **C（整合）**：`check-shops` 的 `o34HotIds` 跟 `buildHotList` 的交叉比對我已經寫在 hit.test（每個必有熱點都在 buildHotList 裡）；C 要再加在 check-shops 也行。
  e2e-taps 第二波後加跑今晚來客：`LAB_SCREENS=title,night`（night 用 `__lab.go('night')`，要有 run 才進得去，C 依 v4 外殼調）。
- **A2／C（資訊）**：375×548 的標題鏡頭從牆頂裁掉 30 格，牆上第一排（rack-a 7 張）在畫面外、點不到（舊的鏡頭規則，不是命中問題）。

## 截圖
- 截圖好了（段 5 前半「唱片櫃」：命中與封面，deviceScaleFactor 2，只截舞台、標題卡藏起來；腳本 `dev/shots/A3/shots-A3.mjs`，讀 LAB_BASE）：
  - `game-lab/dev/shots/A3/390x664-hitmap.png`、`430x932-hitmap.png`：每個熱點看得到的那一塊（橘＝箱子、藍＝封面、綠＝其他、粉＝老闆、灰×＝擋住不能點的家具）＋名牌
  - `game-lab/dev/shots/A3/390x664-press.png`：按住嘻哈／放克 50 ms（金框只圍看得到的那條）
  - `game-lab/dev/shots/A3/390x664-label-hiphop.png`：放開後的曲風名牌「嘻哈／放克」
  - `game-lab/dev/shots/A3/390x664-covers.png`：每張看得到的封面描那一區的顏色＋區名與張數（60 張）
  - 附 `dev/bins-v4.md`（12 箱實際的 8 張＋正面、特價箱 9 張、牆上兩區 17 張與規則）
