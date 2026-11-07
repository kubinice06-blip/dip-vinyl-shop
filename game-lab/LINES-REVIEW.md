# 台詞審稿：品味對決 v3（LINES-REVIEW）

> 由 `node game-lab/tools/lint-copy.mjs` 產生，請勿手改。要改句子，直接改 `game-lab/content.js`（劇本、台詞、名牌、提示、規則卡、教學）或 `game-lab/tools/pitches.json`（推薦語，改完重跑 `node game-lab/tools/bake-cards.mjs`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 `roguelike.html` 逐字比對（37 句，全部一致才會產生這份）。
> v3（三相剋當核心）：氣勢、輾壓、賭注、相生、割捨、七星回擊、霸權、點播、脾氣唱盤（晃）、事件、挖箱、試聽機的句子全部刪除；v2 教學的 37 句換成 10 步；發燒配件留 6 件，每件一句話。

統計：原句 35、拍板 2、新 241（同一句在有聲／安靜兩版序章只算一次）。

## 序章（有聲音）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 剛才那段，是哪一張？ | 本規格新寫 | `script.prologue[4].prompt` |
| （畫面字） | 好耳朵 | 本規格新寫 | `script.prologue[5].stamp` |
| 老闆 | 「不是這張。不過，你挑的這張也不壞。」 | 本規格新寫 | `script.prologue[6]` |
| 旁白 | （點封套下面的字換著聽，挑一張帶走。） | 本規格新寫 | `script.prologue[7]` |
| 老闆 | 「門口那箱一百塊三張，順手帶著。」 | 本規格新寫 | `script.prologue[10]` |
| （畫面字） | ▶ 品味對決 | 本規格新寫 | `script.prologue[16].prompt` |
| （畫面字） | ▶ 直接開打（我會玩） | 本規格新寫 | `script.prologue[16].prompts[1]` |

## 序章（安靜）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | （挑一張帶走。） | 本規格新寫 | `script.quietPrologue[4].prompt` |

## 序章收尾（贏了男子 → 挑一張盤 → 發燒配件三選一）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 他的袋子裡掉出一張盤。 | 本規格新寫 | `script.epilogueWin[2]` |
| 老闆 | 「……他每個禮拜都來聽這張。」 | 本規格新寫 | `script.epilogueWin[3]` |

## 配件挑完 → 今晚來客

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 「今晚是交流夜。人會越來越多。」 | 本規格新寫 | `script.afterPrologue[1]` |

## 打烊（通關）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 藏家 | 「……這張，送你。三十年前，我也是這樣拿到的。」 | 概念稿 A | `script.clear[0]` |
| （畫面字） | 第二夜（尚未開放） | 本規格新寫 | `script.clear[2].stamp` |
| 旁白 | 對街新開了一間黑膠潮流館。 | 本規格新寫 | `script.clear[2]` |

## 散場

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 「……今晚就到這。」 | 本規格新寫 | `script.dead[0]` |

## 再來一夜

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 「……又是你。」 | 本規格新寫 | `script.again[0]` |

## 回嘴（玩家第一次有台詞）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 你 | 你耳機裡那張，是《Mylo Xyloto》吧。 | 本規格新寫 | `retorts[0].label` |
| 男子 | 「……那張也是 Coldplay 好嗎！」 | 本規格新寫 | `retorts[0].reply` |
| 你 | ……（把唱片抱緊） | 本規格新寫 | `retorts[1].label` |
| 男子 | 「哼，抱那麼緊，怕被笑喔？」 | 本規格新寫 | `retorts[1].reply` |

## 老闆（對決外）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・老闆說情 | ……再一場。 | 本規格新寫 | `lines.owner.retry` |
| 老闆・包包滿了 | 包包滿了。先拿一張出來。 | 本規格新寫 | `lines.owner.bagFull` |
| 老闆・發燒配件滿了 | 配件最多帶三件。先放一件回去。 | 本規格新寫 | `lines.owner.relicFull` |

## 舞台泡泡・男子

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 男子・口頭禪（開場泡泡） | 這張排行榜第一名欸。 | 概念稿 C | `lines.man.line` |
| 男子・回嘴選了那張（第一手） | ……對啦，就這張。 | 本規格新寫 | `lines.man.jabBubble` |
| 男子・你輸了（他說） | 回家多聽兩年再來啦。 | 概念稿 A | `lines.man.win` |

## 舞台泡泡・那張我有

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 那張我有・口頭禪（開場泡泡） | 你出這個？那張我也有。 | 本規格新寫 | `lines.copycat.line` |
| 那張我有・進門那句 | 欸你那張哪裡買的？ | 概念稿 C | `lines.copycat.intro` |
| 那張我有・你贏了（他說） | 我回去也要買一張。 | 概念稿 A | `lines.copycat.lose[0]` |
| 那張我有・你輸了（他說） | 那張我有，兩張。 | 本規格新寫 | `lines.copycat.win` |

## 舞台泡泡・我早就聽過

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 我早就聽過・口頭禪（開場泡泡） | 你剛那招，我早就聽過了。 | 本規格新寫 | `lines.already.line` |
| 我早就聽過・進門那句 | 這張？我高中就聽過了。 | 概念稿 D | `lines.already.intro` |
| 我早就聽過・你贏了（他說） | ……這張我真的沒聽過。可以借我嗎？ | 概念稿 B | `lines.already.lose[0]` |
| 我早就聽過・你輸了（他說） | 回去把黑膠版聽完再來。 | 概念稿 A | `lines.already.win` |

## 舞台泡泡・針壓強迫症

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 針壓強迫症・口頭禪（開場泡泡） | 你手上那張，我盯很久了。 | 本規格新寫 | `lines.needle.line` |
| 針壓強迫症・進門那句 | 你這張是幾版？ | 概念稿 D | `lines.needle.intro` |
| 針壓強迫症・你贏了（他說） | ……我回去重新校正。 | 概念稿 D | `lines.needle.lose[0]` |
| 針壓強迫症・你輸了（他說） | 先把唱臂調平再來。 | 本規格新寫 | `lines.needle.win` |

## 舞台泡泡・跳針王

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 跳針王・口頭禪（開場泡泡） | 跳、跳、跳……又跳針了。 | 本規格新寫 | `lines.skip.line` |
| 跳針王・進門那句 | 欸，這段剛剛是不是聽過了？ | 概念稿 B | `lines.skip.intro` |
| 跳針王・你贏了（他說） | ……我真的該換唱針了。 | 概念稿 B | `lines.skip.lose[0]` |
| 跳針王・你輸了（他說） | 好聽的段落，就是要多聽幾次。 | 本規格新寫 | `lines.skip.win` |

## 舞台泡泡・月底吃土

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 月底吃土・口頭禪（開場泡泡） | 什麼都想要一點。 | 本規格新寫 | `lines.broke.line` |
| 月底吃土・進門那句 | 這個月又爆預算了…… | 概念稿 D | `lines.broke.intro` |
| 月底吃土・你贏了（他說） | 這張……先寄放你那邊。 | 概念稿 D | `lines.broke.lose[0]` |
| 月底吃土・你輸了（他說） | 贏了，這禮拜可以吃滷肉飯加蛋。 | 本規格新寫 | `lines.broke.win` |

## 舞台泡泡・剁手黨

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 剁手黨・口頭禪（開場泡泡） | 這張剛剁的，看清楚。 | 本規格新寫 | `lines.buyer.line` |
| 剁手黨・進門那句 | 這三張我都買兩份，一份聽、一份收。 | 概念稿 B | `lines.buyer.intro` |
| 剁手黨・你贏了（他說） | ……我先去領個錢。 | 概念稿 B | `lines.buyer.lose[0]` |
| 剁手黨・你輸了（他說） | 這張歸我了。刷卡。 | 本規格新寫 | `lines.buyer.win` |

## 舞台泡泡・冷門仙人

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 冷門仙人・口頭禪（開場泡泡） | 你以為我會出最大的？ | 本規格新寫 | `lines.label.line` |
| 冷門仙人・進門那句 | 這張全世界只壓了三百張。我有兩張。 | 概念稿 B | `lines.label.intro` |
| 冷門仙人・急了／翻面（泡泡） | ……急了。 | 本規格新寫 | `lines.label.switch` |
| 冷門仙人・你贏了（他說） | ……下一批，算你一張。 | 概念稿 A | `lines.label.lose[0]` |
| 冷門仙人・你輸了（他說） | 旋律太多了，下次少一點。 | 本規格新寫 | `lines.label.win` |

## 舞台泡泡・名盤守門員

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 名盤守門員・口頭禪（開場泡泡） | 名盤就是名盤。 | 本規格新寫 | `lines.critic.line` |
| 名盤守門員・進門那句 | 我寫過這張的樂評。 | 概念稿 A | `lines.critic.intro` |
| 名盤守門員・急了／翻面（泡泡） | ……急了。 | 本規格新寫 | `lines.critic.switch` |
| 名盤守門員・你贏了（他說） | ……這張，我重寫一篇。 | 本規格新寫 | `lines.critic.lose[0]` |
| 名盤守門員・你輸了（他說） | 回去把年表背熟。 | 本規格新寫 | `lines.critic.win` |

## 舞台泡泡・傳說藏家

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 傳說藏家・口頭禪（開場泡泡） | ……這張，我也有。 | 本規格新寫 | `lines.boss.line` |
| 傳說藏家・急了／翻面（泡泡） | ……換面。 | 本規格新寫 | `lines.boss.switch` |
| 傳說藏家・你贏了（他說） | ……這張，送你。三十年前，我也是這樣拿到的。 | 概念稿 A | `lines.boss.lose[0]` |

## 名牌上的脾氣（對決盤面 e-habit）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・老實 | 只認排行榜：丟他那張最大的星。 | 本規格新寫 | `habits.honest.line` |
| （畫面字）・跟風 | 你上一手丟什麼，他就跟著丟。 | 本規格新寫 | `habits.copy.line` |
| （畫面字）・記仇 | 專丟剋你上一手的那種。 | 本規格新寫 | `habits.grudge.line` |
| （畫面字）・跳針 | 上一手丟什麼，這手還丟什麼。 | 本規格新寫 | `habits.repeat.line` |
| （畫面字）・輪流 | 照三角的箭頭輪著丟：冷→經→硬→冷。 | 本規格新寫 | `habits.rot.line` |
| （畫面字）・虛晃 | 亮最大的星嚇你，丟的是剋你的那招。 | 本規格新寫 | `habits.bluff.line` |
| （畫面字）・盯手 | 盯著你手上最大的星，丟剋它的。 | 本規格新寫 | `habits.eye.line` |

## 名牌上的脾氣・急了／翻面之後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 冷門仙人 | 急了：上一手丟什麼，這手還丟什麼。 | 本規格新寫 | `phase2Lines.label` |
| 名盤守門員 | 急了：專丟剋你上一手的那種。 | 本規格新寫 | `phase2Lines.critic` |
| 傳說藏家 | B 面：專丟剋你上一手的那種。 | 本規格新寫 | `phase2Lines.boss` |

## 名牌上的脾氣・左邊的黑底標籤

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 脾氣 | 本規格新寫 | `habitLabels.base` |
| （畫面字） | 急了 | 本規格新寫 | `habitLabels.switched` |

## 一次性老闆小提示（第一次發生時，5 秒）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・第一次同色比星（含同色同星） | 同一色比星，多的扣差額。 | 本規格新寫 | `coachTips.tip_mirror` |
| 老闆・第一次他沒照脾氣 | 他這手沒照脾氣。十手大概六手會照。 | 本規格新寫 | `coachTips.tip_offhabit` |
| 老闆・第一次看穿 | 看穿：他照脾氣丟，被你剋中。 | 本規格新寫 | `coachTips.tip_read` |
| 老闆・第一次急了／翻面 | 他急了，脾氣換了一句，照新的讀。 | 本規格新寫 | `coachTips.tip_switch` |
| 老闆・第一次遇到盯手 | 他盯的是你掛「盯」的那顆星。 | 本規格新寫 | `coachTips.tip_eye` |

## 規則卡（「?」小抄）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 品味對決・規則 | 本規格新寫 | `rules.title` |
| （畫面字） | 三相剋決定每一手 | 本規格新寫 | `rules.sub` |
| （畫面字） | 1 冷門剋經典，經典剋硬蕊，硬蕊剋冷門。 | 本規格新寫 | `rules.lines[0]` |
| （畫面字） | 2 他先亮出這手的唱片；你點自己唱片上的一顆星，兩邊一起丟。 | 本規格新寫 | `rules.lines[1]` |
| （畫面字） | 3 剋中的一方，用自己那顆星扣對方聲望；同一色就比星，多的扣差額。 | 本規格新寫 | `rules.lines[2]` |
| （畫面字） | 4 他名牌上那句是他的脾氣，他多半照著丟。 | 本規格新寫 | `rules.lines[3]` |
| （畫面字） | 5 王牌一軸 7 星，每場只能丟一次。 | 本規格新寫 | `rules.lines[4]` |
| （畫面字） | 6 聲望先歸零的輸；他的唱片丟完，聲望多的贏。 | 本規格新寫 | `rules.lines[5]` |
| （畫面字） | 例：對「那張我有」 | 本規格新寫 | `rules.example.title` |
| （畫面字） | 你上一手丟了冷門，所以他多半也丟冷門。 | 本規格新寫 | `rules.example.read[0]` |
| （畫面字） | 硬蕊剋冷門：這手丟硬蕊。 | 本規格新寫 | `rules.example.read[1]` |
| （畫面字） | 他亮出 | 本規格新寫 | `rules.example.eLabel` |
| （畫面字） | 你點 | 本規格新寫 | `rules.example.pLabel` |
| （畫面字） | 他丟{attr} {n} | 本規格新寫 | `rules.example.rowLabel` |
| （畫面字） | 發燒配件：自動生效，最多帶三件。 | 本規格新寫 | `rules.relics` |
| （畫面字） | 點任何一張專輯＝唱片資訊。 | 本規格新寫 | `rules.foot[0]` |
| （畫面字） | 你 10 聲望；客人 14、菁英 16、傳說藏家 18。 | 本規格新寫 | `rules.foot[1]` |

## 對決盤面的字（{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・firstHand | 第一手：他多半丟最大的星。 | 本規格新寫 | `duelText.firstHand` |
| （畫面字）・pickHint | 點一顆星選牌 | 本規格新寫 | `duelText.pickHint` |
| （畫面字）・picked | 選好了： | 本規格新寫 | `duelText.picked` |
| （畫面字）・again | 再點一次，或按丟 | 本規格新寫 | `duelText.again` |
| （畫面字）・throwBtn | 丟！ | 本規格新寫 | `duelText.throwBtn` |
| （畫面字）・pileLeft | 還有 {n} 張 | 本規格新寫 | `duelText.pileLeft` |
| （畫面字）・lastPrefix | 上一手 | 本規格新寫 | `duelText.lastPrefix` |
| （畫面字）・shows | 他亮出 | 本規格新寫 | `duelText.shows` |
| （畫面字）・he | 他・ | 本規格新寫 | `duelText.he` |
| （畫面字）・you | 你・ | 本規格新寫 | `duelText.you` |
| （畫面字）・prevE | 他的上一手 | 本規格新寫 | `duelText.prevE` |
| （畫面字）・prevP | 你的上一手 | 本規格新寫 | `duelText.prevP` |
| （畫面字）・seeThrough | 看穿！ | 本規格新寫 | `duelText.seeThrough` |
| （畫面字）・counter | {who}{ace}{a}剋{b} | 本規格新寫 | `duelText.counter` |
| （畫面字）・aceWord | 王牌 | 本規格新寫 | `duelText.aceWord` |
| （畫面字）・mirror | 同一色比星　{x} 比 {y} | 本規格新寫 | `duelText.mirror` |
| （畫面字）・tie | 同一色、一樣多 | 本規格新寫 | `duelText.tie` |
| （畫面字）・nothing | 沒事 | 本規格新寫 | `duelText.nothing` |
| （畫面字）・hitE | 他 −{n} | 本規格新寫 | `duelText.hitE` |
| （畫面字）・hitP | 你 −{n} | 本規格新寫 | `duelText.hitP` |
| （畫面字）・badgeWin | 勝 | 本規格新寫 | `duelText.badgeWin` |
| （畫面字）・badgeLose | 負 | 本規格新寫 | `duelText.badgeLose` |
| （畫面字）・badgeTie | 平 | 本規格新寫 | `duelText.badgeTie` |
| （畫面字）・eyeMark | 盯 | 本規格新寫 | `duelText.eyeMark` |
| （畫面字）・koWin | 品味勝出 | 本規格新寫 | `duelText.koWin` |
| （畫面字）・koWinSub | 你贏了【{name}】。 | 本規格新寫 | `duelText.koWinSub` |
| （畫面字）・koLose | 聲望歸零 | 本規格新寫 | `duelText.koLose` |
| （畫面字）・koLoseRetry | 老闆：……再一場。 | 本規格新寫 | `duelText.koLoseRetry` |
| （畫面字）・pileOut | 他的唱片丟完了 | 本規格新寫 | `duelText.pileOut` |
| （畫面字）・pileScore | 你 {p} 比 他 {e}：{who}贏 | 本規格新寫 | `duelText.pileScore` |
| （畫面字）・switchBubble | ……急了。 | 本規格新寫 | `duelText.switchBubble` |
| （畫面字）・hp | 聲望 | 本規格新寫 | `duelText.hp` |
| （畫面字）・aceSlot | 王牌 | 本規格新寫 | `duelText.aceSlot` |
| （畫面字）・aceOnce | 王牌 7 星・每場一次 | 本規格新寫 | `duelText.aceOnce` |

## 發燒配件（點圖示看的說明／生效那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 防塵套 | 每場第一次被剋少扣 1。｜防塵套：少扣 1 | 本規格新寫 | `relics.dustcover` |
| 黑膠唱針 | 硬蕊剋中多扣 1。｜黑膠唱針：多扣 1 | 本規格新寫 | `relics.stylus` |
| 洗碟水 | 同色同星時你扣他 1。｜洗碟水：他 −1 | 本規格新寫 | `relics.cleaner` |
| 原版側標 | 經典剋中多扣 1。｜原版側標：多扣 1 | 本規格新寫 | `relics.obi` |
| 神秘見本盤 | 冷門剋中多扣 1。｜神秘見本盤：多扣 1 | 本規格新寫 | `relics.testpress` |
| 監聽耳機 | 每場第一手他照名牌丟。｜監聽耳機：他照名牌丟 | 本規格新寫 | `relics.headphone` |

## 序章引導教學・第 1 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・t1・說 | 這是他的脾氣。他多半照著丟。 | 本規格新寫 | `tutorial.steps.t1` |
| 老闆・t2・說 | 只認排行榜：他會丟最大的星，經典。 | 本規格新寫 | `tutorial.steps.t2` |
| 老闆・t3・說 | 冷門剋經典。 | 本規格新寫 | `tutorial.steps.t3` |
| 老闆・t4・做 | 點這顆冷門。 | 本規格新寫 | `tutorial.steps.t4` |
| 老闆・t5・做 | 再點一下，丟！ | 本規格新寫 | `tutorial.steps.t5` |
| 老闆・t6・說 | 剋中：用你那顆星扣他。 | 本規格新寫 | `tutorial.steps.t6` |

## 序章引導教學・第 2 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・t7・做 | 他最大的是硬蕊。經典剋硬蕊。 | 本規格新寫 | `tutorial.steps.t7` |
| 老闆・t8・做 | 丟！ | 本規格新寫 | `tutorial.steps.t8` |

## 序章引導教學・第 3 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・t9・做 | 冷門最大。剋冷門的是哪個？ | 本規格新寫 | `tutorial.steps.t9` |

## 序章引導教學・第 4 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・t10・建議 | 王牌 7 星，每場一次。接下來自己來。 | 本規格新寫 | `tutorial.steps.t10` |

## 序章引導教學・按鈕與標題

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 老闆 | 本規格新寫 | `tutorial.ui.who` |
| （畫面字） | 學會了： | 本規格新寫 | `tutorial.ui.learnedPrefix` |
| （畫面字） | 重看教學 | 本規格新寫 | `tutorial.ui.replay` |
| （畫面字） | ▶ 品味對決 | 本規格新寫 | `tutorial.ui.start` |
| （畫面字） | ▶ 直接開打（我會玩） | 本規格新寫 | `tutorial.ui.skip` |
| （畫面字） | 學會的規則 | 本規格新寫 | `tutorial.ui.learnedTitle` |

## 序章引導教學・點錯時

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 先點我指的這裡。 | 本規格新寫 | `tutorial.ui.wrong` |

## 序章引導教學・學會的小卡（飛進「?」）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 學會了：冷門剋經典 | 本規格新寫 | `tutorial.learned.L1` |
| （畫面字） | 學會了：經典剋硬蕊 | 本規格新寫 | `tutorial.learned.L2` |
| （畫面字） | 學會了：硬蕊剋冷門 | 本規格新寫 | `tutorial.learned.L3` |
| （畫面字） | 學會了：王牌：7 星，每場一次 | 本規格新寫 | `tutorial.learned.L4` |

## 店裡熱點（點了說一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 店貓・cat | ……喵。 | 本規格新寫 | `shopLines.cat` |
| 老闆・poster | 冷門剋經典，經典剋硬蕊，硬蕊剋冷門。 | 本規格新寫 | `shopLines.poster` |
| （畫面字）・locked | 這間還沒開。 | 本規格新寫 | `shopLines.locked` |
| 老闆・ownerHint.title | 外面雨大，進來坐。 | 本規格新寫 | `shopLines.ownerHint.title` |
| 老闆・ownerHint.scene | 慢慢看，不趕你。 | 本規格新寫 | `shopLines.ownerHint.scene` |
| 老闆・ownerHint.night | 今晚的客人，一個一個來。 | 本規格新寫 | `shopLines.ownerHint.night` |
| 老闆・ownerHint.duel | 先看他名牌上那句。 | 本規格新寫 | `shopLines.ownerHint.duel` |
| 老闆・ownerHint.reward | 收好，別折到封套。 | 本規格新寫 | `shopLines.ownerHint.reward` |
| 老闆・bin | 慢慢翻。點封面看唱片資訊。 | 本規格新寫 | `shopLines.bin` |
| 老闆・booth | 挑一張你唱片櫃裡的，放來聽聽。 | 本規格新寫 | `shopLines.booth` |
| 老闆・boothEmpty | 唱片櫃還空著。贏一場再來聽。 | 本規格新寫 | `shopLines.boothEmpty` |
| （畫面字）・titleHint | 點店裡的東西看看：牆上的唱片、箱子、試聽機 | 本規格新寫 | `shopLines.titleHint` |

## 今晚來客・第一次（soft 提示）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・nightIntro[0] | 今晚的客人，一個一個來。 | 本規格新寫 | `shopLines.nightIntro[0]` |
| 老闆・nightIntro[1] | 點頭像，先看他的脾氣。 | 本規格新寫 | `shopLines.nightIntro[1]` |

## 台北地圖預告

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・taipeiHere | 你在這 | 本規格新寫 | `shopLines.taipeiHere` |
| （畫面字）・taipeiNote | 其他店還沒開。之後一家一家開，每家的箱子、客人、老闆都不一樣。 | 本規格新寫 | `shopLines.taipeiNote` |
| （畫面字）・taipeiLink | 出門看看（台北地圖・預告） | 本規格新寫 | `shopLines.taipeiLink` |
| （畫面字）・backToShop | 回店裡 | 本規格新寫 | `shopLines.backToShop` |

## 店裡熱點・箱子的名牌

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 爵士區 | 本規格新寫 | `bins.jazz.label` |
| （畫面字） | 台灣區 | 本規格新寫 | `bins.tw.label` |
| （畫面字） | 噪音區 | 本規格新寫 | `bins.noise.label` |

## 今晚來客・結算

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 今晚來客 | 本規格新寫 | `night.label` |
| （畫面字） | 打烊 | 本規格新寫 | `night.closing` |
| （畫面字）・reached | 走到 {time} | 本規格新寫 | `summary.reached` |
| （畫面字）・wins | 贏了 {n} 位 | 本規格新寫 | `summary.wins` |
| （畫面字）・taken | 收了 | 本規格新寫 | `summary.taken` |
| （畫面字）・none | 這晚沒收唱片 | 本規格新寫 | `summary.none` |
| （畫面字）・again | 再來一夜 | 本規格新寫 | `summary.again` |

## 包包與唱片櫃

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 門口一百塊三張 | 本規格新寫 | `junkLabel` |

## 店內名牌（shops/basement.json）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 霓虹地下室 | 本規格新寫 | `shops/basement.json.name` |
| （畫面字） | （虛構店家・示範用） | 本規格新寫 | `shops/basement.json.district` |
| （畫面字） | 上樓 | 本規格新寫 | `shops/basement.json.props[7].hot.label` |
| （畫面字） | 試聽台 | 本規格新寫 | `shops/basement.json.props[11].hot.label` |
| （畫面字） | 櫃檯 | 本規格新寫 | `shops/basement.json.props[14].hot.label` |
| （畫面字） | 黑貓 | 本規格新寫 | `shops/basement.json.props[19].hot.label` |
| （畫面字） | 龐克區 | 本規格新寫 | `shops/basement.json.props[20].hot.label` |
| （畫面字） | 日本區 | 本規格新寫 | `shops/basement.json.props[21].hot.label` |
| （畫面字） | 特價區 | 本規格新寫 | `shops/basement.json.props[22].hot.label` |
| （畫面字） | 老闆 | 本規格新寫 | `shops/basement.json.hotspots[0].label` |

## 店內名牌（shops/dip.json）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | （本店） | 本規格新寫 | `shops/dip.json.district` |
| （畫面字） | 初版描圖背景（店主看過、喜歡的精緻度）：牆、34 張手繪封面、地板、門洞（雨夜）。家具全部挖掉，前景由程式畫在同一個 448×492 格子上。 | 本規格新寫 | `shops/dip.json.bg.note` |
| （畫面字） | 座標契約沿用 scripts/trace-shop-art.py：邏輯 448×492，牆／地板交界 y=325，門洞 x12–86 y156–325 | 本規格新寫 | `shops/dip.json.geometry.note` |
| （畫面字） | 門口 | 本規格新寫 | `shops/dip.json.props[1].hot.label` |
| （畫面字） | 牆上的唱片 | 本規格新寫 | `shops/dip.json.props[2].revealLabel` |
| （畫面字） | 山下達郎《For You》 | 本規格新寫 | `shops/dip.json.props[2].cells[0][3].label` |
| （畫面字） | 山下達郎《Big Wave》 | 本規格新寫 | `shops/dip.json.props[2].cells[1][3].label` |
| （畫面字） | King Crimson《In the Court of the Crimson King》 | 本規格新寫 | `shops/dip.json.props[2].cells[7][3].label` |
| （畫面字） | Hank Mobley《Dippin'》 | 本規格新寫 | `shops/dip.json.props[2].cells[8][3].label` |
| （畫面字） | 竹內瑪莉亞 | 本規格新寫 | `shops/dip.json.props[2].cells[10][3].label` |
| （畫面字） | Miles Davis《Bitches Brew》 | 本規格新寫 | `shops/dip.json.props[2].cells[15][3].label` |
| （畫面字） | Pink Floyd《The Dark Side of the Moon》 | 本規格新寫 | `shops/dip.json.props[2].cells[18][3].label` |
| （畫面字） | 初版手繪封面 13 格：認得出來的留原畫（點了亮名字；卡池沒有這幾張）；其餘 19 格是「JAZZ／CITY POP」假封面，蓋上卡池真封面（高解析層，點了開唱片資訊） | 本規格新寫 | `shops/dip.json.props[2].note` |
| （畫面字） | 試聽機 | 本規格新寫 | `shops/dip.json.props[7].hot.label` |
| （畫面字） | 櫃檯 | 本規格新寫 | `shops/dip.json.props[9].hot.label` |
| （畫面字） | 店貓 | 本規格新寫 | `shops/dip.json.props[12].hot.label` |
| （畫面字） | 公告 | 本規格新寫 | `shops/dip.json.props[15].hot.label` |
| （畫面字） | 老闆 | 本規格新寫 | `shops/dip.json.hotspots[0].label` |
| （畫面字） | 唱盤區幾何（場景座標）：兩座轉盤中心、半空相撞點（你早丟 100 ms，偏他那邊）、地毯中心（碎片、平躺的唱片落在這條線上） | 本規格新寫 | `shops/dip.json.duel.note` |

## 店內名牌（shops/taipei.json）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 台北市 | 本規格新寫 | `shops/taipei.json.name` |
| （畫面字） | 踢館地圖（示意） | 本規格新寫 | `shops/taipei.json.district` |
| （畫面字） | dip vinyl（本店） | 本規格新寫 | `shops/taipei.json.props[2].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[3].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[4].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[5].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[6].hot.label` |
| （畫面字） | 示意地圖：只有本店開著；其他圖釘鎖住（v2 預告） | 本規格新寫 | `shops/taipei.json.meta.note` |

## 第二夜預告

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 增值哥（對街潮流館）／第二夜（尚未開放） | 本規格新寫 | `secondNight` |

## 推薦語・王牌

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Radiohead《OK Computer》 | 「九七年的焦慮，到現在還沒退流行。」 | 本規格新寫 | `pitch#radiohead-ok-computer` |
| Barney Wilen《Zodiac》 | 「六六年在巴黎錄的。全台灣大概沒幾張。」 | 本規格新寫 | `pitch#barney-wilen-zodiac` |

## 推薦語・老闆四張・殿堂

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Can《Ege Bamyasi》 | 「鼓手一個人就是一台機器。聽完你會想去學打鼓。」 | 本規格新寫 | `pitch#can-ege-bamyasi` |

## 推薦語・老闆四張・流亡

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 黃小楨《賞味期限》 | 「九〇年代末的台北，有人這樣唱過。」 | 本規格新寫 | `pitch#黃小楨-賞味期限` |
| 傷心欲絕《我愛您》 | 「錄音很粗，心很細。」 | 本規格新寫 | `pitch#傷心欲絕-我愛您` |

## 推薦語・老闆四張・異端

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Melt-Banana《Speak Squeak Creak》 | 「東京的地下室，三分鐘裡塞了十首歌。」 | 本規格新寫 | `pitch#melt-banana-speak-squeak-creak` |
| Pharoah Sanders《Tauhid》 | 「前面很安靜。後面不要被嚇到。」 | 本規格新寫 | `pitch#pharoah-sanders-tauhid` |
| Einstürzende Neubauten《Halber Mensch》 | 「他們的樂器有一半是工地撿來的。」 | 本規格新寫 | `pitch#einsturzende-neubauten-halber-mensch` |

## 推薦語・門口一百塊三張

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| David Bowie《Never Let Me Down》 | 「連鮑伊都有這種時候。」 | 本規格新寫 | `pitch#david-bowie-never-let-me-down` |
| Miles Davis《You're Under Arrest》 | 「大師也會被抓。」 | 本規格新寫 | `pitch#miles-davis-you-re-under-arrest` |
| Devo《Oh, No! It's Devo》 | 「封面比較好笑。」 | 本規格新寫 | `pitch#devo-oh-no-it-s-devo` |

## 推薦語・店主私藏（金邊）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Moshi》 | 「七〇年他跟著拍片的人去了非洲，回來就做了這張。我一直捨不得標價。」 | 本規格新寫 | `pitch#barney-wilen-moshi` |
| John Zorn《Cobra》 | 「照一套遊戲規則即興出來的。跟你們今晚在做的事，差不多。」 | 本規格新寫 | `pitch#john-zorn-cobra` |
| Hermeto Pascoal《Zabumbê-bum-á》 | 「巴西的老頭，連水壺都拿來吹。這張我不太借人。」 | 本規格新寫 | `pitch#hermeto-pascoal-zabumbe-bum-a` |
| Tony Scott & The Indonesian All Stars《Djanger Bali》 | 「印尼的樂手配一支美國單簧管。這張我找了好幾年。」 | 本規格新寫 | `pitch#tony-scott-the-indonesian-all-stars-djanger-bali` |
| 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 「那個年代的日本，有人在錄這種東西。我手上就這一張。」 | 本規格新寫 | `pitch#富樫雅彦-we-now-create-music-for-strings-winds-and-percussions` |

## 原句與拍板（已逐字比對，列出供對照）

| 標記 | 句子 | 位置 |
|---|---|---|
| 原句 | 下著雨。你推開巷子裡那間唱片行的門。門上的鈴鐺，響了一聲。 | `script.prologue[0]` |
| 原句 | 這時候，店裡的音響傳出一段旋律。 | `script.prologue[1]` |
| 原句 | ……很迷人。你停下腳步，不自覺跟著點起頭來。 | `script.prologue[2]` |
| 拍板 | 你抬起頭。老闆正把一張唱片放上唱盤。櫃檯上還攤著兩張，封套邊緣磨損嚴重，顯然塵封已久。 | `script.prologue[3]` |
| 原句 | 「這三張，是我這裡最貴的三張。」他沒抬頭。「剛才那段，你覺得是哪一張？」 | `script.prologue[4]` |
| 原句 | 「……你眼光真不錯。」老闆終於抬起頭來，看著你。 | `script.prologue[5]` |
| 原句 | 「這張是我的私人收藏。今天讓給你。」 | `script.prologue[8]` |
| 原句 | 「這四張也很適合你。跟你有緣，收下吧。」 | `script.prologue[9]` |
| 原句 | 這時，門開了。 | `script.prologue[11]` |
| 原句 | 一名男子走進來。他的視線，落在你手上的那幾張專輯上。 | `script.prologue[12]` |
| 原句 | 「……這品味，也敢出來丟臉？」 | `script.prologue[13]` |
| 原句 | 你的憤怒表露無遺。 | `script.prologue[14]` |
| 拍板 | 老闆不發一語，緩步走出櫃檯，站在兩人之間。 | `script.prologue[15]` |
| 原句 | 「既然雙方都不服氣，不如來一場品味對決如何？」 | `script.prologue[16]` |
| 原句 | 「……哼。」他把自己的唱片塞回袋子裡，看都不看你一眼。 | `script.epilogueWin[0]` |
| 原句 | 「搵休督欸丟！」 | `script.epilogueWin[1]` |
| 原句 | 「我看你對音樂脈絡，很有天份。」 | `script.epilogueWin[4]` |
| 原句 | （老闆從長桌底下拖出一個木箱。） | `script.epilogueWin[5].prompt` |
| 原句 | 「我這邊有一些被我淘汰的設備，你挑一個，帶回去吧。」 | `script.epilogueWin[5]` |
| 原句 | 你正要道謝，門又開了。 | `script.afterPrologue[0]` |
| 原句 | 三十年的耳朵，不會騙人。 | `script.bossEnter[1].stamp` |
| 原句 | 「聽說這裡有個新來的，品味不錯？」 | `script.bossEnter[1]` |
| 原句 | 「年輕人，有空再來這邊走走，與大家交流音樂。」 | `script.clear[1]` |
| 原句 | ……這品味，也敢出來丟臉？ | `lines.man.intro` |
| 原句 | ……哼。 | `lines.man.lose[0]` |
| 原句 | 搵休督欸丟！ | `lines.man.lose[1]` |
| 原句 | 聽說這裡有個新來的，品味不錯？ | `lines.boss.intro` |
| 原句 | 三十年的耳朵，不會騙人。 | `lines.boss.stampSub` |
| 原句 | 我的木箱裡，沒有一張爛盤。 | `lines.boss.win` |
| 原句 | 跳過教學 | `tutorial.ui.skipTut` |
| 原句 | 「這張放出來客人會跑光……我喜歡。」 | `pitch#swans-filth` |
| 原句 | 「柏林時期第一張，B 面幾乎沒有人聲。第一次聽會覺得怪，第三次就回不去了。」 | `pitch#david-bowie-low` |
| 原句 | 「1970 年出的時候沒人要，她就去鄉下住了三十年。後來全世界都在找這張。」 | `pitch#vashti-bunyan-just-another-diamond-day` |
| 原句 | 「六〇年代的情歌王子，隔了幾十年交出這張。第一首就把客人嚇走。」 | `pitch#scott-walker-tilt` |
| 原句 | 「她不寫歌，唱別人的歌卻比原唱還像自己的。」 | `pitch#karen-dalton-in-my-own-time` |
| 原句 | 「『後搖滾』這三個字，就是樂評為了形容這張才用起來的。」 | `pitch#bark-psychosis-hex` |
| 原句 | 「B 面那首十七分鐘。據說錄音師錄到一半就走人了。」 | `pitch#the-velvet-underground-white-light-white-heat` |
