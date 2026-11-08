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

## 進度

- [ ] 1 duel.js／duel.css：扇形、攤開、浮起＋屬性鈕、拿掉星鈕列與丟！列、牌桌重排、尺寸（四尺寸不捲、沒有 >24 px 空帶）
- [ ] 2 教學：tutorial.js（runner：spread／lift／attr；DOM：扇形時先指扇形）、content.js C.tutorial.steps 文字、tutorial.test、check-content／lint-copy、規則卡頁尾第 1 行
- [ ] 3 e2e：e2e-duel、e2e.spec、e2e-lib walkTutorial、e2e-prologue；四尺寸
- [ ] 4 V03：430×932 序章／尾聲店景下面的白帶
- [ ] 5 截圖（390×664@2＋375×548＋430×932）：扇形、攤開、浮起＋三顆鈕、剛丟出（揭曉）、教學第 2 手手指

## 記錄
