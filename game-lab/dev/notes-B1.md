# notes-B1：對決畫面（game-lab v4 第二波，SPEC-v4 §3.2 B1）

分支 `v4/B1`（worktree `/home/user/wt/B1`，基底 `v4/base-B`）。測試伺服器：`cd /home/user/wt/B1 && python3 -m http.server 8781`。
截圖：`game-lab/dev/shots/B1/`（不進 repo）。

## 進度

- [x] 階段 1：B1-M1（§3.2 B1 交件 0）——提交後 `git branch -f v4/B1-M1 HEAD`
  - [x] `duel.js` v4 DOM 骨架＋`data-tut` 名（§2.5.1 的樹）；刪 habit／e-stars／e-cover／eyeMark／看穿／急了
  - [x] `elByName`：`card:best:<attr>[:ace]`、`card:id:<id>`、`chip:id:<id>:<attr>`、`chip:blocked:<attr>`、`e-hint`、`e-honesty`、`rounds`（v3 的 `chip:best`、`card:<id>`、`@f` 照舊）
  - [x] `gate {kind:'card'}`（點封面＝選這張＋topAttr；已選同一張不再送 gate）；`{kind:'chip'}` 再點已選的那顆不做事；「丟！」唯一出手；長按封面 450 ms＝唱片資訊
  - [x] 一台唱盤：`stage.clearClash()`＋`stage.clash({kind,blocked,by,toE,toP,p/e:{attr,star,card,ace},nameE,speed,reduced})`；`handStart` 叫 `stage.hold('e',{back:true})`
  - [x] 結果三行 `_fmt.clashText(ev, T, hints)`：提示句＝`C.hints[attr]` 裡 `id===view.hint.line`、`{key}`＝那句的 key（A1 請求）；`preview` 盤面不用（他的牌揭曉前不知道），要用時一定給 eSide
  - [x] 一次性小提示 tip_bluff／tip_block／tip_ace／tip_mirror／tip_rounds；勝利曲 `Fx.music.play(整場贏家最後丟的那張,{fadeMs:600})`；`by:'rounds'|'pile'` 大章＝roundsOut＋roundsScore
  - [x] `dev/duel-harness.html` v4：版面＝index 的對決畫面（頂欄＋舞台 strip＋盤面）；`window.__lab.{force,stage,duel,rawDuel,autoplay,el}`；`?e=bluff,honest,c,o,h,ace,-` 指定他每手；`?tutorial=1&ace=`；⚙ 測試鈕
  - 樣式只做到能用（M1）：浮框置中、會蓋到牌桌兩張的「他・硬蕊 4」字；他還有 N 張到下一手才減——階段 2 修
- [ ] 階段 2：交件 1（§2.5.1 全部、harness 指定他每手、`tests/e2e-duel.mjs` 四尺寸、截圖）
  - [ ] 浮框只放在兩張牌中間（不蓋「他・經典 5」）、揭曉時三角縮到牌桌頂；星鈕本體 ≥28×44（四尺寸）
  - [ ] 「他還有 N 張」丟出當下就減一；六手比聲望的字集中在一個函式（`roundsVars`）
  - [ ] harness：`__h.setNext({i,attr})`、`__h.sfx`／`__h.music` 記錄
  - [ ] `tests/e2e-duel.mjs`（§5.5 全部條目，四尺寸）
  - [ ] 截圖 段 3（四尺寸 × 出牌前／命中／剋不動／唬人 560 ms／最後一手 KO）

## 實作裁定（契約沒寫死、B1 自己定的，可逆）

1. `{a}` 加「王牌」只在 counter／countered／blockedYou／blockedHim／aceHim；`mirror`（「同樣是經典」）與 `aceYou`（句子已寫「王牌不會被剋」）不加，免得「同樣是王牌經典」。
2. 唬人＋剋不動：l3 放規則句，句尾「，」改「。」（「…剋不動。比星數。」），l2 照樣是扣多少。
3. 「他還有 N 張」＝他手牌＋牌堆（`eHandN + pile`），條數上限 `pileMax`（＝牌單張數）。
4. 舞台 `clash` 的 `e.ace` 用事件的 `eAce`（王牌只在自己那軸算）。
5. 唬人與否看事件 `bluff`（引擎：實際出的色 ≠ 提示色）；`hint` 沒有（v3 事件／假事件）時 l1＝規則句、l3 空。

## 規格裡對不上、照哪邊做

- **誠實度名牌**：§2.5.1 的樹有 `.hon[e-honesty]「偶爾唬人」`、§5.5 e2e-duel 要「名牌顯示誠實度」；但 D §5（店主 2026-11-08 06:05「看了很煩」）與 FIXLIST 6 是「整個拿掉、哪裡都不顯示」。照 D：DOM 留 `[data-tut="e-honesty"]`（`hidden`，`elByName` 找得到、教學不會壞），畫面上不顯示；e2e 斷言它**看不到**。

## 測試結果（階段 1，scratchpad `b1/*.mjs`，伺服器 8781）

- `smoke.mjs`（390×664）：點封面 → 選中 topAttr；丟 → 150 ms 時 slot-e＝「他・蓋著」；560 ms 浮框三行；thoughtful 自動打完一場（6 手，by hp）；主控台 0 錯誤。
- `layout.mjs`（四尺寸）：不捲動（`.dl` scrollHeight＝clientHeight、文件高＝視窗高）；丟！下緣 ≤ 視窗；星鈕本體最小 27×42（含 ::before 往外撐＝29×44，跟 v3 e2e #6 的量法一樣）；`e-honesty` 看不到；主控台 0 錯誤。
- `tut.mjs`：三種王牌 × 教學六手，照 `C.tutorial.script[ace].pick` 用 `card:id:`→`chip:id:`／`chip:blocked:o`／`card-ace` 真點，六手結果＝`C.tutorial.expect`，第 6 手 KO；第 5 手組出「冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −4」。
- `gate.mjs`：gate 收到 `{kind:'card'}`→`{kind:'chip'}`→`{kind:'throw'}`；同一張封面、已選的星鈕再點不送 gate；長按送 `{kind:'info',where:'hand'}`、放開不選牌。
- `node game-lab/tools/lint-copy.mjs`：通過（LINES-REVIEW.md 已 checkout 回去）。

## 截圖

`game-lab/dev/shots/B1/`：`390x664-smoke-{choose,selected,reveal,end}.png`、`{390x664,375x548,430x932,360x640}-m1-{choose,reveal}.png`（M1 冒煙，不是交店主的段 3 截圖）。

## 請求

- **B2**：合併 `v4/B1-M1` 後，e2e.spec 的盤面名字照本檔開頭的 v4 名單換（`e-habit`→`e-hint`、`e-stars`／`e-cover` 刪、`hand-<i>` 仍是整格、點封面＝`card-<i>`）；選牌是「點封面」或「點星鈕」，再點已選的星鈕**不會**丟（v3 `chip` 連點兩下＝丟已拿掉），出手只有 `throw`；`DipLabDuel.select(i)`（不給 attr）＝點封面。tutorial.js 的 gate 多一種 `{kind:'card', i, attr, id}`。
- **C／主線**：§5.5 e2e-duel「名牌顯示誠實度」跟 D §5（店主 06:05）衝突，B1 照 D 做成不顯示，e2e 斷言看不到（見上「規格裡對不上」）。

## 主線轉達：店主回饋（2026-11-08 06:5x，第 2 階段必做，優先於規格 §2.5.1 的版面）
- 店主看了 390x664-m1-choose.png：「我覺得相剋圖比例太大了 不好看 主角是專輯」。
- 改法：盤面中間那一列的主角是**兩張丟出去的專輯**（他丟的／你丟的），封面放大（390 寬約 120–140 CSS px，兩張並排、各自下方「他・經典 5」「你・冷門 4」）；
  三相剋圖縮成小圖示（約 56–72 CSS px），放在兩張封面之間或「第 n／6 手」旁邊當圖例，不再是畫面焦點。剋的箭頭在揭曉時照舊亮起（小圖上亮）。
- 出牌前（兩格還空著）也一樣：空格放大、相剋小圖在中間。四種尺寸都要量，手牌列不被擠出畫面、不捲動。
- 揭曉的結果框不要蓋住兩張封面（目前 m1-reveal 的結果框壓在封面上）：結果句放在兩張封面下方或盤面中間列與手牌列之間。
- 做完重拍：出牌前、揭曉 560 ms（命中／剋不動／唬人）各一張，390x664 與 375x548。
