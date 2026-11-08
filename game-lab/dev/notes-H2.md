# notes-H2：FIXLIST 11 介面——手牌疊成扇形、點牌才跳屬性、教學跟著改；V03 序章白帶

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。依據：FIXLIST 11（主線設計）＋ H1 交件（手牌 5 張、你 9）。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。容器會重啟：每步做完更新這裡＋commit。

## 設計（定案）

- 平時（扇形）：手牌 5 張＋王牌（金框，用過就不在扇裡）疊成一手；每張往右錯開約 3 成寬、微微轉角、輕微弧形；王牌在最右（最上面那張）。不顯示星數。
- 點扇形 → 攤開成一排（180 ms；減少動態＝直接換）。360 寬也放得下 6 張（封面照寬度算）。
- 攤開後點一張 → 浮起，正上方跳三顆屬性鈕（經 n／冷 n／硬 n；最高那顆大一點、黑框）。點鈕＝照那個屬性直接丟出。王牌只跳一顆「王牌 7」。
  點別張＝換；點手牌外面＝收回扇形；丟出後也收回扇形。浮起時「你丟的」格顯示那張的半透明預覽（屬性＝最高那顆；滑鼠移到別顆鈕＝預覽那顆）。
- 長按封面＝唱片資訊（扇形、攤開都可以）。
- 拿掉每張的星鈕列與「丟！」列。牌桌：相剋圖例＋「第 n／6 手」從兩張封面中間搬到中間字帶左邊（同一列），兩張封面中間只留 10 px → 封面變大。
- gate：{kind:'spread'}（點扇形）、{kind:'card',i,attr,id}（浮起，attr＝topAttr）、{kind:'throw',i,attr,id}（點屬性鈕＝出手）、{kind:'collapse'}（點外面收回）、info／close。
- 名字：hand（扇形／整排）、hand-<i>／hand-ace（一格）、card-<i>／card-ace（封面）、pop（屬性鈕那一排）、chip-<i>-<attr>／chip-ace（屬性鈕，只有浮起那張有）。
  'card:blocked:<a>'＝engine.blockedChoice 那張的封面（新）。'throw'、'act' 拿掉。
- 教學：每手「說明（照舊）→ 點那張（手牌疊著時先指扇形；第一次泡泡寫「點一下手牌攤開。」）→ 點那個屬性（＝丟）→ 結算時講」。

## 店主 17:1x 改：不要扇形，水平直線（像舊版新接龍）

- 平時：5 張＋王牌在**同一條水平線**上往右錯開約 3 成寬（不轉角、不成弧形），露出每張封面左邊一條；不顯示星數。其他（攤開、浮起、屬性鈕、教學）不變。
- [x] A duel.js／duel.css：拿掉 FAN_ROT／FAN_ARC（STACK_DX 0.3），class fan→stack，用語「扇形」→「疊著／疊成一排」（README、註解、e2e 記錄）；
  教學：疊著時 sh.pointAt＝那一課的封面，手指指那張露出的一條（stripRect；debug().point 照舊 'hand'）。commit fca9be134。
  量：390×664 疊著封面 113、露出 34 px（30%），攤開 56，空帶 ≤16。單元測試全綠、check-content／lint-copy 綠。
- [~] B e2e-duel #1a 加「同一條線、不轉角、露出 25–35%」檢查（390 43/43）；四尺寸全套在背景跑：scratchpad/v4/H2/runall.sh → r2-*.log、r2-summary.log
- [ ] C 截圖重拍（390×664@2、375×548、430×932）：疊著、攤開、浮起＋三顆鈕、剛丟出、教學第 2 手手指；看過修

## 進度（第一輪，扇形版）

- [x] 1 duel.js／duel.css：扇形、攤開、浮起＋屬性鈕、拿掉星鈕列與丟！列、牌桌重排、尺寸（四尺寸不捲、沒有 >24 px 空帶）
- [x] 2 教學：tutorial.js（runner：spread／lift／attr；DOM：扇形時先指扇形）、content.js C.tutorial.steps 文字、tutorial.test、check-content／lint-copy、規則卡頁尾第 1 行
- [ ] 3 e2e：e2e-duel、e2e.spec、e2e-lib walkTutorial、e2e-prologue；四尺寸
- [x] 4 V03：430×932 序章／尾聲店景下面的白帶
- [ ] 5 截圖（390×664@2＋375×548＋430×932）：扇形、攤開、浮起＋三顆鈕、剛丟出（揭曉）、教學第 2 手手指

## 記錄
- 步驟 1：duel.js 手牌改 .hand（.tiles 每張絕對定位，layoutHand 算扇形／一排的 transform；.pop 屬性鈕 .ab；.hprompt「點一張專輯」）。
  sizeBoard：手牌區至少＝一排（6 張照寬度）＋浮起 10＋6＋屬性鈕高；其餘給牌桌，封面 --scv 上限 176（roomy 188），兩張中間只留 10 px；
  相剋圖例＋第 n／6 手搬到中間字帶左邊（.tcol），提示句／結果框／上一手在它右邊。扇形 F ≤ 封面 0.64、≤118。
  量到的（封面／手牌區）：390×664 176／141、375×548 145／120、430×932 188／177、360×640 163／144（原本 140／120／140／128）。
  丟出去手牌收回扇形；結算中整疊一起變淡。duelText 拿掉 picked／again／throwBtn／waiting／aceUsed（check-content 的鍵表同步；lint-copy 重產 LINES-REVIEW）。
  e2e 還沒改（下一步）。
- 步驟 2：tutorial.js pickSpec → {card, chip, tile, lift, shot}；stepsFor 代入 'card:pick'（封面）／'pick'（屬性鈕）／'tile:pick'，look 也代入；
  isLift(s)＝點那張的步驟；R.gate：{kind:'spread'} 在點那張的步驟放行但不完成（R.last.spread）、其他步驟＝點錯；{kind:'collapse'} 一律不放行、quiet（不罵）。
  DOM：liveDo(s)——點那張的步驟手牌還疊著時洞＝'hand'、手指指它，第一次（m2）泡泡＝step.spread「點一下手牌攤開。」；攤開（gate 或 duel 'spread' 事件）→ refreshDo 換到那張。
  點屬性那步開始時 DipLabDuel.preview(那一色)：「你丟的」預覽跟手指指的那顆一致（浮起時預設是最高那顆）。debug() 加 point／fan。
  content.js steps：m2「先出這張。」（spread「點一下手牌攤開。」）、m3「出經典，跟他比星數。」、k1「冷門剋經典：出這張。」k2「出冷門。」、
  c1／c2、h1／h2 同形、b1「又是『名盤』。出這張試試。」b2「出冷門。」、a1 照舊、a2「丟！」。規則卡頁尾第 1 行「點手牌攤開，點專輯再點屬性出牌；按住封面看唱片資訊。」
  check-content tutorialProblems 改新形狀＋spread 只在第 1 手；lint-copy 掃 step.spread。tutorial.test 182142／0（variant chip→direct；擋錯招、matches 重寫）。
  duel.js：「點一張專輯」改成屬性鈕位置的虛線框（攤開時不留空帶）；preview(attr) API。
  e2e-lib：HIT_PT／hitPoint（扇形時點真的點得到的那一點）給 tapAt／longPress；walkTutorial 走「點扇形 → 點那張 → 點屬性」，#20 第 1 手攤開後點別張、第 2 手點別色屬性鈕。
  e2e-duel：#1a 扇形／#1b 攤開／#1c 浮起（版面、空帶 ≤26）、#2–#4 改新流程、liftIt／quickPlay。四尺寸 43＋97＝140/140 PASS。e2e.spec #19／#20（390）4/4 PASS。
- 步驟 4（V03）：shop.js（O34）fitExt：鏡頭看到店的最下面（vy＋vh＝H）且外殼給了 extCss 時，在畫布下面多一張 .ds-floorx，
  用同一套 bg 道具（地板、後牆左右收邊）照同一個種子往下畫（L2.size＝H＋rows、L2.extFrom＝H），打光照店景最下面那一列（乘＋濾色）；
  shop-props floor 的「磨亮」那幾塊碰到原本底邊的跟著往下接。API：shop.floorExt(px)／DipLabStage.floorExt(px)、view().ext。
  ui.js fitFloor：只有 scene 畫面；面板高 − 內容高（對白框＋包包條＋10 px）≥24 就接地板（舞台變高、面板照內容高）；ResizeObserver 看面板與子元素、resize、go() 都重算；換畫面歸零。
  430×932 序章：店景 474 → 舞台 646（接 172 px 地板），對白框 [696,872]、包包條緊接在下；390×664 等矮螢幕面板沒有空（對白框撐滿）→ 不接。README 補一句。
- 驗（進行中）：e2e-duel 四尺寸 140/140；e2e.spec 390×664 全部 37/37；tutorial.test 182142／0、engine.test 2040482／0（少 5＝duelText 拿掉 5 個鍵）、shop／hit／chars、check-shops、check-content、lint-copy 綠。
  e2e.spec 另外三尺寸＋e2e-prologue 四尺寸在跑（log：scratchpad/v4/H2/spec3.log、prol4.log）。截圖腳本 scratchpad/v4/H2/shots.mjs → dev/shots/h2/（.gitignore）。
