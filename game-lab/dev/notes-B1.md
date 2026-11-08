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
- [x] 階段 2：交件 1（§2.5.1 全部、harness 指定他每手、`tests/e2e-duel.mjs` 四尺寸、截圖）
  - [x] **店主回饋（下面「主線轉達」）**：牌桌兩張丟出的專輯當主角——封面邊長 `--scv` 由 `fit()`→`sizeTable()` 照牌桌剩下的高與寬算（390×664＝124、375×548＝98、360×640≈126、430×932＝150 上限）；
        相剋圖縮成中間一欄的小圖例（64×57，roomy 72、compact 60、short 52；不寫「剋」字，選星時亮綠／紅、揭曉時亮那條）；「第 n／6 手」在圖例上面；
        結果框在兩張封面＋下面那行字的**下方**、整個寬（不蓋封面）；「上一手」那行也在同一位置。為了讓牌桌夠高：提示句與「蓋著的封套＋他還有 N 張」併成一列（grid）、你那塊留白收一點。
  - [x] 王牌在牌桌：封面左上角掛「王牌」小標、金框；字只寫「你・經典 7」
  - [x] 星鈕本體 ≥28×44（四尺寸；360 寬 tile 間距 6）；丟！四尺寸都 ≥44 高
  - [x] 「他還有 N 張」丟出當下就減一；六手比聲望的字集中在 `roundsVars()`（＋`C.duelText.roundsScore`；引擎那邊是 `finish()` 一行）
  - [x] 浮框只在標點後換行（「冷門」不會被拆）；不用 lookbehind（iOS 16.3 以前不認）
  - [x] 打完（over）提示句留著最後一句、變淡；他說話時先收起頭上名牌（矮螢幕橫條鏡頭泡泡會壓到名牌）
  - [x] harness：`__h.setNext({i,attr})`、`__h.sfx`／`__h.music` 記錄、`__h.find(want)`／`__h.demo(want)`、⚙ 的「示範」鈕（剋中／剋不動／唬人／王牌擋下／平手）
  - [x] `tests/e2e-duel.mjs`（§5.5 全部條目，四尺寸）；`LAB_SHOTS=<目錄>` 另存段 3 截圖
  - [x] 截圖 段 3（四尺寸 × 出牌前／命中／剋不動／唬人／最後一手 KO，另加王牌擋下）

## 實作裁定（契約沒寫死、B1 自己定的，可逆）

1. `{a}` 加「王牌」只在 counter／countered／blockedYou／blockedHim／aceHim；`mirror`（「同樣是經典」）與 `aceYou`（句子已寫「王牌不會被剋」）不加，免得「同樣是王牌經典」。
2. 唬人＋剋不動：l3 放規則句，句尾「，」改「。」（「…剋不動。比星數。」），l2 照樣是扣多少。
3. 「他還有 N 張」＝他手牌＋牌堆（`eHandN + pile`），條數上限 `pileMax`（＝牌單張數）。
4. 舞台 `clash` 的 `e.ace` 用事件的 `eAce`（王牌只在自己那軸算）。
5. 唬人與否看事件 `bluff`（引擎：實際出的色 ≠ 提示色）；`hint` 沒有（v3 事件／假事件）時 l1＝規則句、l3 空。
6. 唬人＋王牌擋下（`blocked:'ace'`）同 2：l3 放規則句（「冷門剋經典，但王牌不會被剋。比星數。」）。
7. 勝利曲＝最後一手**整場贏家**丟的那張（`over.win ? 你的 pCard : 他的 eCard`）。§2.5.1 的兩種情況（最後一手是整場贏家贏的／不是）其實都是「整場贏家這場最後丟出的那張」＝最後一手他丟的那張；用事件的卡（王牌也對），不讀 `p.disc`（牌堆抽完會洗回）。靜音由 `Fx.music.play` 自己擋（照樣呼叫一次）。
8. 誠實度：DOM 留 `.hon[data-tut=e-honesty]`（`hidden`，文字＝`view().honesty.zh`）；畫面上不顯示（D §5、FIXLIST 6）。
9. 「蓋著」兩個字在他那列只留給讀螢幕（畫面上是背面朝上的封套圖）；揭曉時牌桌他那格照樣寫「他・蓋著」。
10. 平手（`tie`）浮框：l1＝`mirror`（「同樣是經典，比星數，」）、l2＝`tie`；同色而且唬人時 l1 是唬人句、規則句不放（§2.5.1「其他空」）。

## 規格裡對不上、照哪邊做

- **誠實度名牌**：§2.5.1 的樹有 `.hon[e-honesty]「偶爾唬人」`、§5.5 e2e-duel 要「名牌顯示誠實度」；但 D §5（店主 2026-11-08 06:05「看了很煩」）與 FIXLIST 6 是「整個拿掉、哪裡都不顯示」。照 D：DOM 留 `[data-tut="e-honesty"]`（`hidden`，`elByName` 找得到、教學不會壞），畫面上不顯示；e2e 斷言它**看不到**。

## 測試結果（階段 2）

- `node game-lab/tests/e2e-duel.mjs`（harness，伺服器 8781，四尺寸）：**116/116 PASS**（合成事件 16 條：D 的三個例句逐字、key 為 null 的退路句、blockedHim／aceYou／aceHim／王牌剋中／同色／平手／被剋／六手大章；每尺寸 25 條：版面不捲動＋星鈕 ≥28×44＋丟！≥44、誠實度看不到、點封面＝topAttr、點別的星換、再點已選的不出手、280 ms 前蓋著、他還有 N 張丟出就減一、浮框＝clashText、第 n／6 手與提示句每手換、剋不動／唬人／平手 chime(null)＋空盤／王牌擋下、force counter→deck.by p／tie→null、長按＝唱片資訊、六手比聲望大章＋勝利曲＝你最後丟的（最後一手他贏）、tip_rounds、你 KO 他／他 KO 你的勝利曲、autoplay thoughtful 打完、主控台 0 錯誤）。
- scratchpad `b1/gate.mjs`、`tut.mjs`（三王牌教學六手照課表）、`smoke.mjs`、`demo.mjs`（示範鈕五種）：照過。
- `node game-lab/tools/lint-copy.mjs`：通過（產生的 LINES-REVIEW.md 差異是 F1 的 dip.json，不是 B1 的；已 restore，不提交）。

## 測試結果（階段 1，scratchpad `b1/*.mjs`，伺服器 8781）

- `smoke.mjs`（390×664）：點封面 → 選中 topAttr；丟 → 150 ms 時 slot-e＝「他・蓋著」；560 ms 浮框三行；thoughtful 自動打完一場（6 手，by hp）；主控台 0 錯誤。
- `layout.mjs`（四尺寸）：不捲動（`.dl` scrollHeight＝clientHeight、文件高＝視窗高）；丟！下緣 ≤ 視窗；星鈕本體最小 27×42（含 ::before 往外撐＝29×44，跟 v3 e2e #6 的量法一樣）；`e-honesty` 看不到；主控台 0 錯誤。
- `tut.mjs`：三種王牌 × 教學六手，照 `C.tutorial.script[ace].pick` 用 `card:id:`→`chip:id:`／`chip:blocked:o`／`card-ace` 真點，六手結果＝`C.tutorial.expect`，第 6 手 KO；第 5 手組出「冷門剋經典，但他高你 2 星以上，剋不動。比星數，你 −4」。
- `gate.mjs`：gate 收到 `{kind:'card'}`→`{kind:'chip'}`→`{kind:'throw'}`；同一張封面、已選的星鈕再點不送 gate；長按送 `{kind:'info',where:'hand'}`、放開不選牌。
- `node game-lab/tools/lint-copy.mjs`：通過（LINES-REVIEW.md 已 checkout 回去）。

## 截圖

**段 3「對戰畫面」交店主**：`game-lab/dev/shots/B1/seg3/<尺寸>-{1-before,2-counter,3-blocked,4-bluff,5-ko,6-ace}.png`，尺寸＝390x664、375x548、430x932、360x640（deviceScaleFactor 2；
揭曉那幾張＝浮框完整出現後停格，約 1 s；KO＝大章出來後）。重拍：`LAB_SHOTS=game-lab/dev/shots/B1/seg3 node game-lab/tests/e2e-duel.mjs`。
舊的：`390x664-smoke-*.png`、`*-m1-*.png`（M1 冒煙）。

## 請求

- **C（整合）**：`tests/e2e-duel.mjs` 的 index.html 版：測試只靠 `__lab.force／stage／rawDuel`＋`DipLabDuel.*`，另外用到 harness 才有的 `__h.setNext`（他這手出什麼）、`__h.remount(seed)`、`__h.ended`（onEnd 的結果）、`__h.music`／`__h.sfx`（攔 `Fx.music.play`／`Fx.sfx`）、`__h.log`（hint id、info）。要跑 index 版，需要 `boot()` 換成「進到一場對決」＋這幾個替身（或 ui.js `__lab` 加對應的鉤子）。
- **C／A1（FIXLIST 2：王牌拿掉「不會被剋」）**：改了之後 `blocked:'ace'` 不會再出現。duel.js 要刪的：`ruleText` 的 `aceYou`／`aceHim` 分支、`oneTimeTips` 的 `tip_ace`；e2e-duel 的 #9 與合成 `aceYou`／`aceHim`；harness 示範「王牌擋下」。都是一兩行，B1 沒先動（引擎現在還是 v4 契約）。
- **C（FIXLIST 3：六手比聲望的比法）**：要改比法時，畫面這邊只改 `duel.js` 的 `roundsVars()` 與 `C.duelText.roundsScore`；引擎是 `engine.js finish()` 那一行。
- **B2**：content.js 還有 A1 的 v3 墊片 `C.habits`／`C.habitLabels`，教學步驟 `t1` 指向 `e-habit`（v4 盤面已沒有）——換 v4 教學時一起刪（duel.js 已經不讀）。
- **B3／C**：`fx.js` 的 `seeThrough` 音效（v3「看穿」）duel.js 已不用，可刪（B3 只准修 bug 的檔，交給 C 決定）。

- **B2**：合併 `v4/B1-M1` 後，e2e.spec 的盤面名字照本檔開頭的 v4 名單換（`e-habit`→`e-hint`、`e-stars`／`e-cover` 刪、`hand-<i>` 仍是整格、點封面＝`card-<i>`）；選牌是「點封面」或「點星鈕」，再點已選的星鈕**不會**丟（v3 `chip` 連點兩下＝丟已拿掉），出手只有 `throw`；`DipLabDuel.select(i)`（不給 attr）＝點封面。tutorial.js 的 gate 多一種 `{kind:'card', i, attr, id}`。
- **C／主線**：§5.5 e2e-duel「名牌顯示誠實度」跟 D §5（店主 06:05）衝突，B1 照 D 做成不顯示，e2e 斷言看不到（見上「規格裡對不上」）。

## 主線轉達：店主回饋（2026-11-08 06:5x，第 2 階段必做，優先於規格 §2.5.1 的版面）
- 店主看了 390x664-m1-choose.png：「我覺得相剋圖比例太大了 不好看 主角是專輯」。
- 改法：盤面中間那一列的主角是**兩張丟出去的專輯**（他丟的／你丟的），封面放大（390 寬約 120–140 CSS px，兩張並排、各自下方「他・經典 5」「你・冷門 4」）；
  三相剋圖縮成小圖示（約 56–72 CSS px），放在兩張封面之間或「第 n／6 手」旁邊當圖例，不再是畫面焦點。剋的箭頭在揭曉時照舊亮起（小圖上亮）。
- 出牌前（兩格還空著）也一樣：空格放大、相剋小圖在中間。四種尺寸都要量，手牌列不被擠出畫面、不捲動。
- 揭曉的結果框不要蓋住兩張封面（目前 m1-reveal 的結果框壓在封面上）：結果句放在兩張封面下方或盤面中間列與手牌列之間。
- 做完重拍：出牌前、揭曉 560 ms（命中／剋不動／唬人）各一張，390x664 與 375x548。
- **B1 已做（階段 2）**：見上「進度」第一項；重拍的是 `shots/B1/seg3/` 四個尺寸全部（不只 390x664／375x548）。
