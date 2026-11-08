# 台詞審稿：品味對決 v4（LINES-REVIEW）

> 由 `node game-lab/tools/lint-copy.mjs` 產生，請勿手改。要改句子，直接改 `game-lab/content.js`（劇本、台詞、名牌、提示、規則卡、教學）或 `game-lab/tools/pitches.json`（推薦語，改完重跑 `node game-lab/tools/bake-cards.mjs`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 `roguelike.html` 逐字比對（36 句）；標成「店主」的字已與 `tools/owner-lines-v4.json`（DECISIONS-v4 店主寫／核可的字）逐字比對（20 句）。全部一致才會產生這份。
> v4：三相剋＋差 2 星剋不動、對手暗選＋提示（會唬人）、六手上限、經濟（錢、箱子、櫃檯配件、特價箱）。脾氣、急了、翻面、B 面的句子全部刪除。
> 第一波（A1）：劇本、回嘴、教學步驟仍是 v3 墊片，第二波由 B2 換成 v4 劇本與六手教學。

統計：原句 34、拍板 2、店主 20、新 267（同一句在有聲／安靜兩版序章只算一次）。

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
| 冷門仙人・你贏了（他說） | ……下一批，算你一張。 | 概念稿 A | `lines.label.lose[0]` |
| 冷門仙人・你輸了（他說） | 旋律太多了，下次少一點。 | 本規格新寫 | `lines.label.win` |

## 舞台泡泡・名盤守門員

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 名盤守門員・口頭禪（開場泡泡） | 名盤就是名盤。 | 本規格新寫 | `lines.critic.line` |
| 名盤守門員・進門那句 | 我寫過這張的樂評。 | 概念稿 A | `lines.critic.intro` |
| 名盤守門員・你贏了（他說） | ……這張，我重寫一篇。 | 本規格新寫 | `lines.critic.lose[0]` |
| 名盤守門員・你輸了（他說） | 回去把年表背熟。 | 本規格新寫 | `lines.critic.win` |

## 舞台泡泡・傳說藏家

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 傳說藏家・口頭禪（開場泡泡） | ……這張，我也有。 | 本規格新寫 | `lines.boss.line` |
| 傳說藏家・你贏了（他說） | ……這張，送你。三十年前，我也是這樣拿到的。 | 概念稿 A | `lines.boss.lose[0]` |

## 提示句（他這手的打算；揭曉後教「key 是哪一色」）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （提示）・經典・c1・key「大家都聽過」 | 「這張，大家都聽過吧？」 | 本規格新寫 | `hints.c[0]` |
| （提示）・經典・c2・key「紀念版」 | 他抽出一張週年紀念版。 | 本規格新寫 | `hints.c[1]` |
| （提示）・經典・c3・key「大家都會唱」 | 他哼起那段大家都會唱的副歌。 | 本規格新寫 | `hints.c[2]` |
| （提示）・經典・c4・key「名盤」 | 他翻到「百大名盤」那一頁。 | 本規格新寫 | `hints.c[3]` |
| （提示）・經典・c5・key「名盤」 | 他把那張名盤擦得發亮。 | 本規格新寫 | `hints.c[4]` |
| （提示）・冷門・o1・key「沒聽過」 | 他嘴角藏著「你沒聽過吧」的笑。 | 本規格新寫 | `hints.o[0]` |
| （提示）・冷門・o2・key「白版」 | 他從箱底挖出一張白版。 | 本規格新寫 | `hints.o[1]` |
| （提示）・冷門・o3・key「只壓了三百張」 | 「這張只壓了三百張。」 | 本規格新寫 | `hints.o[2]` |
| （提示）・冷門・o4・key「絕版」 | 他翻著一本手寫的絕版清單。 | 本規格新寫 | `hints.o[3]` |
| （提示）・冷門・o5・key「查不到」 | 「這張，網路上查不到。」 | 本規格新寫 | `hints.o[4]` |
| （提示）・硬蕊・h1・key「難懂」 | 他露出「越難懂越屌」的眼神。 | 本規格新寫 | `hints.h[0]` |
| （提示）・硬蕊・h2・key「噪音」 | 他耳機漏出一陣刺耳的噪音。 | 本規格新寫 | `hints.h[1]` |
| （提示）・硬蕊・h3・key「聽不懂」 | 「聽不懂？那就對了。」 | 本規格新寫 | `hints.h[2]` |
| （提示）・硬蕊・h4・key「雜訊」 | 封套上只有一片雜訊。 | 本規格新寫 | `hints.h[3]` |
| （提示）・硬蕊・h5・key「實驗」 | 他說，要聽就聽實驗的。 | 本規格新寫 | `hints.h[4]` |

## 一次性老闆小提示（第一次發生時，5 秒）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・第一次同色比星（含同色同星） | 同一色比星，多的扣差額。 | 本規格新寫 | `coachTips.tip_mirror` |
| 老闆・第一次被唬 | 提示不一定是真的。 | 本規格新寫 | `coachTips.tip_bluff` |
| 老闆・第一次剋不動（你或他） | 差 2 星以上，剋不動。 | 本規格新寫 | `coachTips.tip_block` |
| 老闆・第一次王牌擋下相剋 | 王牌不會被剋。 | 本規格新寫 | `coachTips.tip_ace` |
| 老闆・第一次打到第 6 手 | 六手內沒分勝負，比聲望。 | 本規格新寫 | `coachTips.tip_rounds` |

## 規則卡（「?」小抄）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 品味對決・規則 | 本規格新寫 | `rules.title` |
| （畫面字） | 發燒配件：自動生效，最多帶三件。 | 本規格新寫 | `rules.relics` |
| （畫面字） | 點專輯選牌；按住封面看唱片資訊。 | 本規格新寫 | `rules.foot[0]` |
| （畫面字） | 你 10 聲望；客人 {normal}、菁英 {elite}、傳說藏家 {boss}。 | 本規格新寫 | `rules.foot[1]` |

## 對決盤面的字（{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・pickHint | 點一張專輯 | 本規格新寫 | `duelText.pickHint` |
| （畫面字）・picked | 選好了： | 本規格新寫 | `duelText.picked` |
| （畫面字）・again | 點別的星換屬性，或按丟 | 本規格新寫 | `duelText.again` |
| （畫面字）・throwBtn | 丟！ | 本規格新寫 | `duelText.throwBtn` |
| （畫面字）・waiting | 演完就換下一手（點畫面跳過） | 本規格新寫 | `duelText.waiting` |
| （畫面字）・hintLabel | 提示 | 本規格新寫 | `duelText.hintLabel` |
| （畫面字）・sleeve | 蓋著 | 本規格新寫 | `duelText.sleeve` |
| （畫面字）・rounds | 第 {n}／{max} 手 | 本規格新寫 | `duelText.rounds` |
| （畫面字）・hp | 聲望 | 本規格新寫 | `duelText.hp` |
| （畫面字）・aceSlot | 王牌 | 本規格新寫 | `duelText.aceSlot` |
| （畫面字）・aceUsed | 用過 | 本規格新寫 | `duelText.aceUsed` |
| （畫面字）・aceWord | 王牌 | 本規格新寫 | `duelText.aceWord` |
| （畫面字）・he | 他・ | 本規格新寫 | `duelText.he` |
| （畫面字）・you | 你・ | 本規格新寫 | `duelText.you` |
| （畫面字）・slotE | 他丟的 | 本規格新寫 | `duelText.slotE` |
| （畫面字）・slotP | 你丟的 | 本規格新寫 | `duelText.slotP` |
| （畫面字）・lastPrefix | 上一手 | 本規格新寫 | `duelText.lastPrefix` |
| （畫面字）・pileLeft | 他還有 {n} 張 | 本規格新寫 | `duelText.pileLeft` |
| （畫面字）・counter | {a}剋{b}，命中！ | 本規格新寫 | `duelText.counter` |
| （畫面字）・countered | {b}剋{a}，被剋了。 | 本規格新寫 | `duelText.countered` |
| （畫面字）・blockedYou | {a}剋{b}，但他高你 2 星以上，剋不動。比星數， | 本規格新寫 | `duelText.blockedYou` |
| （畫面字）・blockedHim | {b}剋{a}，但你高他 2 星以上，他剋不動。比星數， | 本規格新寫 | `duelText.blockedHim` |
| （畫面字）・aceYou | {b}剋{a}，但王牌不會被剋。比星數， | 本規格新寫 | `duelText.aceYou` |
| （畫面字）・aceHim | {a}剋{b}，但他的王牌不會被剋。比星數， | 本規格新寫 | `duelText.aceHim` |
| （畫面字）・mirror | 同樣是{a}，比星數， | 本規格新寫 | `duelText.mirror` |
| （畫面字）・tie | 一樣大，不扣。 | 本規格新寫 | `duelText.tie` |
| （畫面字）・hitE | 他 −{n} | 本規格新寫 | `duelText.hitE` |
| （畫面字）・hitP | 你 −{n} | 本規格新寫 | `duelText.hitP` |
| （畫面字）・bluff | 他唬你！『{key}』是{hint}，他出的是{e}。 | 本規格新寫 | `duelText.bluff` |
| （畫面字）・honest | 『{key}』是{hint}，他照實出。 | 本規格新寫 | `duelText.honest` |
| （畫面字）・bluffNoKey | 他唬你！提示是{hint}，他出的是{e}。 | 本規格新寫 | `duelText.bluffNoKey` |
| （畫面字）・honestNoKey | 提示是{hint}，他照實出。 | 本規格新寫 | `duelText.honestNoKey` |
| （畫面字）・koWin | 品味勝出 | 本規格新寫 | `duelText.koWin` |
| （畫面字）・koWinSub | 你贏了【{name}】。 | 本規格新寫 | `duelText.koWinSub` |
| （畫面字）・koLose | 聲望歸零 | 本規格新寫 | `duelText.koLose` |
| （畫面字）・koLoseRetry | 老闆：……再一場。 | 本規格新寫 | `duelText.koLoseRetry` |
| （畫面字）・roundsOut | 六手打完，比聲望 | 本規格新寫 | `duelText.roundsOut` |
| （畫面字）・roundsScore | 你 {p} 比 他 {e}：{who}贏 | 本規格新寫 | `duelText.roundsScore` |

## 發燒配件（點圖示看的說明／生效那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 防塵套・$900 | 每場第一次被剋少扣 1。｜防塵套：少扣 1 | 本規格新寫 | `relics.dustcover` |
| 黑膠唱針・$1000 | 硬蕊剋中多扣 1。｜黑膠唱針：多扣 1 | 本規格新寫 | `relics.stylus` |
| 洗碟水・$900 | 同色同星時你扣他 1。｜洗碟水：他 −1 | 本規格新寫 | `relics.cleaner` |
| 原版側標・$1000 | 經典剋中多扣 1。｜原版側標：多扣 1 | 本規格新寫 | `relics.obi` |
| 神秘見本盤・$1000 | 冷門剋中多扣 1。｜神秘見本盤：多扣 1 | 本規格新寫 | `relics.testpress` |
| 監聽耳機・$1000 | 每場第一手他不唬人。｜監聽耳機：他照實出 | 本規格新寫 | `relics.headphone` |
| 180g 重量盤・$1000 | 經典出招時 +1 星。｜重量盤：+1 星 | 本規格新寫 | `relics.boost_c` |
| 絕版編號標・$1000 | 冷門出招時 +1 星。｜絕版編號標：+1 星 | 本規格新寫 | `relics.boost_o` |
| 內圈刻字・$1000 | 硬蕊出招時 +1 星。｜內圈刻字：+1 星 | 本規格新寫 | `relics.boost_h` |

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
| （畫面字） | 學會了：王牌 7 星，每場一次 | 本規格新寫 | `tutorial.learned.L4` |

## 店裡熱點（點了說一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 店貓・cat | ……喵。 | 本規格新寫 | `shopLines.cat` |
| 老闆・poster | 冷門剋經典，經典剋硬蕊，硬蕊剋冷門。 | 本規格新寫 | `shopLines.poster` |
| （畫面字）・locked | 這間還沒開。 | 本規格新寫 | `shopLines.locked` |
| 老闆・ownerHint.title | 外面雨大，進來坐。 | 本規格新寫 | `shopLines.ownerHint.title` |
| 老闆・ownerHint.scene | 慢慢看，不趕你。 | 本規格新寫 | `shopLines.ownerHint.scene` |
| 老闆・ownerHint.night | 今晚的客人，一個一個來。 | 本規格新寫 | `shopLines.ownerHint.night` |
| 老闆・ownerHint.duel | 先看提示那句。 | 本規格新寫 | `shopLines.ownerHint.duel` |
| 老闆・ownerHint.reward | 收好，別折到封套。 | 本規格新寫 | `shopLines.ownerHint.reward` |
| 老闆・bin | 點封面看唱片資訊、試聽。 | 本規格新寫 | `shopLines.bin` |
| 老闆・booth | 挑一張你唱片櫃裡的，放來聽聽。 | 本規格新寫 | `shopLines.booth` |
| 老闆・boothEmpty | 唱片櫃還空著。贏一場再來聽。 | 本規格新寫 | `shopLines.boothEmpty` |
| （畫面字）・titleHint | 點店裡的東西看看：牆上的唱片、箱子、試聽機 | 本規格新寫 | `shopLines.titleHint` |

## 今晚來客・第一次（soft 提示）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・nightIntro[0] | 今晚的客人，一個一個來。 | 本規格新寫 | `shopLines.nightIntro[0]` |
| 老闆・nightIntro[1] | 贏了有錢，兩位客人之間可以去箱子買唱片。 | 本規格新寫 | `shopLines.nightIntro[1]` |

## 台北地圖預告

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・taipeiHere | 你在這 | 本規格新寫 | `shopLines.taipeiHere` |
| （畫面字）・taipeiNote | 其他店還沒開。之後一家一家開，每家的箱子、客人、老闆都不一樣。 | 本規格新寫 | `shopLines.taipeiNote` |
| （畫面字）・taipeiLink | 出門看看（台北地圖・預告） | 本規格新寫 | `shopLines.taipeiLink` |
| （畫面字）・backToShop | 回店裡 | 本規格新寫 | `shopLines.backToShop` |

## 經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・money | ${n} | 本規格新寫 | `shopUi.money` |
| （畫面字）・binTitle | {label} | 本規格新寫 | `shopUi.binTitle` |
| （畫面字）・buy | 買 ${n} | 本規格新寫 | `shopUi.buy` |
| （畫面字）・noMoney | 錢不夠 | 本規格新寫 | `shopUi.noMoney` |
| （畫面字）・bagFull | 包包滿了：先賣一張，半價 ${n} | 本規格新寫 | `shopUi.bagFull` |
| （畫面字）・sellPick | 賣這張 | 本規格新寫 | `shopUi.sellPick` |
| （畫面字）・bought | 《{album}》進包包，−${n} | 本規格新寫 | `shopUi.bought` |
| （畫面字）・sold | 《{album}》賣掉，+${n} | 本規格新寫 | `shopUi.sold` |
| （畫面字）・relicTitle | 櫃檯的配件 | 本規格新寫 | `shopUi.relicTitle` |
| （畫面字）・relicFull | 配件最多三件：先賣一件，半價 ${n} | 本規格新寫 | `shopUi.relicFull` |
| （畫面字）・relicBought | 拿到「{name}」，−${n} | 本規格新寫 | `shopUi.relicBought` |
| （畫面字）・bargainTitle | 特價區 | 本規格新寫 | `shopUi.bargainTitle` |
| （畫面字）・bargainPrompt | （挑三張。） | 本規格新寫 | `shopUi.bargainPrompt` |
| （畫面字）・bargainTake | 收下這三張 | 本規格新寫 | `shopUi.bargainTake` |
| （畫面字）・bargainBuy | $100：最多挑三張 | 本規格新寫 | `shopUi.bargainBuy` |
| （畫面字）・bargainEmpty | 特價區今晚賣完了。 | 本規格新寫 | `shopUi.bargainEmpty` |
| （畫面字）・close | 關閉 | 本規格新寫 | `shopUi.close` |
| （畫面字）・earned | +${n} | 本規格新寫 | `shopUi.earned` |
| （畫面字） | 特價 | 本規格新寫 | `bargain.label` |

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
| （畫面字） | 斜俯視 3/4（店主 2026-11-07 選的路線 P2）：x＝寬、y＝地板前緣（越下越近）、高度直接往上減；不縮放。人＝16×16 小人 ×3（48 格＝1.70 m，28.2 格/m）；1 格≈1.336 CSS px（390 寬）。 | 本規格新寫 | `shops/dip.json.note` |
| （畫面字） | pools＝[x, y, rx, ry, 顏色, 強度]：窗、窗光落地、中島軌道燈、唱盤區、試聽桌燈、櫃檯；軌道燈的光池由 trackLights 道具自己給 | 本規格新寫 | `shops/dip.json.light.note` |
| （畫面字） | 唱盤區（一台，SPEC-v4 §2.3.1）：轉盤中心＝duel.deck；老闆站在台後（ref）當裁判，兩個對決者在兩側，贏的人往台子上前 step 格放唱片 | 本規格新寫 | `shops/dip.json.duel.note` |
| （畫面字） | 門口 | 本規格新寫 | `shops/dip.json.props[3].hot.label` |
| （畫面字） | 牆上的唱片 | 本規格新寫 | `shops/dip.json.props[4].revealLabel` |
| （畫面字） | 搖滾／流行牆 | 本規格新寫 | `shops/dip.json.props[4].label` |
| （畫面字） | 爵士／靈魂牆 | 本規格新寫 | `shops/dip.json.props[5].label` |
| （畫面字） | 民謠／藍調 | 本規格新寫 | `shops/dip.json.props[12].bin.label` |
| （畫面字） | R&B／靈魂 | 本規格新寫 | `shops/dip.json.props[16].bin.label` |
| （畫面字） | 原聲／圖庫 | 本規格新寫 | `shops/dip.json.props[17].bin.label` |
| （畫面字） | 搖滾／龐克 | 本規格新寫 | `shops/dip.json.props[18].bin.label` |
| （畫面字） | 日本／CITY | 本規格新寫 | `shops/dip.json.props[19].bin.label` |
| （畫面字） | 嘻哈／放克 | 本規格新寫 | `shops/dip.json.props[20].bin.label` |
| （畫面字） | 電子／氛圍 | 本規格新寫 | `shops/dip.json.props[21].bin.label` |
| （畫面字） | 新進 | 本規格新寫 | `shops/dip.json.props[22].bin.label` |
| （畫面字） | 華語／台語 | 本規格新寫 | `shops/dip.json.props[23].bin.label` |
| （畫面字） | 爵士區 | 本規格新寫 | `shops/dip.json.props[24].bin.label` |
| （畫面字） | 台灣 | 本規格新寫 | `shops/dip.json.props[25].label` |
| （畫面字） | 台灣區 | 本規格新寫 | `shops/dip.json.props[25].bin.label` |
| （畫面字） | 試聽機 | 本規格新寫 | `shops/dip.json.props[26].hot.label` |
| （畫面字） | 噪音區 | 本規格新寫 | `shops/dip.json.props[28].bin.label` |
| （畫面字） | 特價區 | 本規格新寫 | `shops/dip.json.props[29].bin.label` |
| （畫面字） | 櫃檯 | 本規格新寫 | `shops/dip.json.props[30].hot.label` |
| （畫面字） | 公告 | 本規格新寫 | `shops/dip.json.hotspots[0].label` |
| （畫面字） | 老闆 | 本規格新寫 | `shops/dip.json.hotspots[1].label` |
| （畫面字） | 熟客：背對鏡頭翻後牆的箱子（P2 原型的位置）；舞台 API 不動她 | 本規格新寫 | `shops/dip.json.actors[1].note` |

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
| Beverly Glenn-Copeland《...Keyboard Fantasies...》 | 「八六年他自己出的卡帶。快三十年後，京都一家唱片行寫信來問還有沒有貨。」 | 本規格新寫 | `pitch#beverly-glenn-copeland-keyboard-fantasies` |

## 推薦語・老闆四張・流亡

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Charles Brackeen《Rhythm X》 | 「Ornette 的老班底幾乎都來了，主角卻是一個沒什麼人知道的薩克斯風手。」 | 本規格新寫 | `pitch#charles-brackeen-rhythm-x` |
| 黃小楨《賞味期限》 | 「九〇年代末的台北，有人這樣唱過。」 | 本規格新寫 | `pitch#黃小楨-賞味期限` |
| 傷心欲絕《我愛您》 | 「錄音很粗，心很細。」 | 本規格新寫 | `pitch#傷心欲絕-我愛您` |

## 推薦語・老闆四張・異端

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Melt-Banana《Speak Squeak Creak》 | 「東京的地下室，三分鐘裡塞了十首歌。」 | 本規格新寫 | `pitch#melt-banana-speak-squeak-creak` |
| Pharoah Sanders《Tauhid》 | 「前面很安靜。後面不要被嚇到。」 | 本規格新寫 | `pitch#pharoah-sanders-tauhid` |
| Einstürzende Neubauten《Halber Mensch》 | 「他們的樂器有一半是工地撿來的。」 | 本規格新寫 | `pitch#einsturzende-neubauten-halber-mensch` |
| Magma《Mëkanïk Dëstruktïw Kömmandöh》 | 「法國的鼓手自創了一種語言，整張都用它來唱。」 | 本規格新寫 | `pitch#magma-mekanik-destruktiw-kommandoh` |

## 推薦語・特價箱

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Blur《The Great Escape》 | 「那年單曲贏了 Oasis，專輯輸了。」 | 本規格新寫 | `pitch#blur-the-great-escape` |
| Oasis《Dig Out Your Soul》 | 「他們最後一張。兄弟倆隔年就拆夥了。」 | 本規格新寫 | `pitch#oasis-dig-out-your-soul` |
| David Bowie《Never Let Me Down》 | 「連鮑伊都有這種時候。」 | 本規格新寫 | `pitch#david-bowie-never-let-me-down` |
| The Velvet Underground《Squeeze》 | 「掛著 Velvet 的名字，裡面一個創團的人都沒有。」 | 本規格新寫 | `pitch#the-velvet-underground-squeeze` |
| Stevie Wonder《Eivets Rednow》 | 「名字倒過來寫就是他。那年他才十八歲。」 | 本規格新寫 | `pitch#stevie-wonder-eivets-rednow` |
| The Kinks《Preservation Act 1》 | 「搖滾歌劇的第一幕。第二幕更長。」 | 本規格新寫 | `pitch#the-kinks-preservation-act-1` |
| Metallica《Reload》 | 「上一張的剩菜，隔年再端出來一次。」 | 本規格新寫 | `pitch#metallica-reload` |
| Weezer《Van Weezer》 | 「學八〇年代的長髮金屬，學得很認真。」 | 本規格新寫 | `pitch#weezer-van-weezer` |
| Ramones《Halfway to Sanity》 | 「第十張了，還是那三個和弦。」 | 本規格新寫 | `pitch#ramones-halfway-to-sanity` |

## 推薦語・店主私藏（金邊）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Moshi》 | 「七〇年他跟著拍片的人去了非洲，回來就做了這張。我一直捨不得標價。」 | 本規格新寫 | `pitch#barney-wilen-moshi` |
| John Zorn《Cobra》 | 「照一套遊戲規則即興出來的。跟你們今晚在做的事，差不多。」 | 本規格新寫 | `pitch#john-zorn-cobra` |
| Hermeto Pascoal《Zabumbê-bum-á》 | 「巴西的老頭，連水壺都拿來吹。這張我不太借人。」 | 本規格新寫 | `pitch#hermeto-pascoal-zabumbe-bum-a` |
| Tony Scott & The Indonesian All Stars《Djanger Bali》 | 「印尼的樂手配一支美國單簧管。這張我找了好幾年。」 | 本規格新寫 | `pitch#tony-scott-the-indonesian-all-stars-djanger-bali` |
| 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 「那個年代的日本，有人在錄這種東西。我手上就這一張。」 | 本規格新寫 | `pitch#富樫雅彦-we-now-create-music-for-strings-winds-and-percussions` |

## 原句、拍板、店主（已逐字比對，列出供對照）

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
| 原句 | 讓我看看你的品味有幾兩重。 | `lines.boss.intro` |
| 原句 | 三十年的耳朵，不會騙人。 | `lines.boss.stampSub` |
| 原句 | 我的木箱裡，沒有一張爛盤。 | `lines.boss.win` |
| 店主 | 老實 | `honesty.honest.zh` |
| 店主 | 偶爾唬人 | `honesty.sometimes.zh` |
| 店主 | 愛唬人 | `honesty.often.zh` |
| 店主 | 老江湖 | `honesty.veteran.zh` |
| 店主 | 名盤 | `hintKeywords.c[0]` |
| 店主 | 紀念版 | `hintKeywords.c[1]` |
| 店主 | 大家都聽過 | `hintKeywords.c[2]` |
| 店主 | 絕版 | `hintKeywords.o[0]` |
| 店主 | 白版 | `hintKeywords.o[1]` |
| 店主 | 沒人聽過 | `hintKeywords.o[2]` |
| 店主 | 噪音 | `hintKeywords.h[0]` |
| 店主 | 聽不懂 | `hintKeywords.h[1]` |
| 店主 | 實驗 | `hintKeywords.h[2]` |
| 店主 | 1 每張專輯有經典／冷門／硬蕊三個星數。 | `rules.lines[0]` |
| 店主 | 2 每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。 | `rules.lines[1]` |
| 店主 | 3 冷剋經、經剋硬、硬剋冷：剋中，就用你那個屬性的星數扣他聲望。 | `rules.lines[2]` |
| 店主 | 4 被剋的一方高 2 星以上，剋不動，改成比星數。 | `rules.lines[3]` |
| 店主 | 5 沒有相剋就比星數，高的扣差額；一樣大不扣。 | `rules.lines[4]` |
| 店主 | 6 提示會暗示他這手的打算，但有些人會唬你。王牌 7 星、不會被剋，一場用一次。六手內沒分出勝負，比剩下的聲望。 | `rules.lines[5]` |
| 原句 | 跳過教學 | `tutorial.ui.skipTut` |
| 店主 | 打完再翻。 | `shopLines.binBusy` |
| 原句 | 「這張放出來客人會跑光……我喜歡。」 | `pitch#swans-filth` |
| 原句 | 「柏林時期第一張，B 面幾乎沒有人聲。第一次聽會覺得怪，第三次就回不去了。」 | `pitch#david-bowie-low` |
| 原句 | 「1970 年出的時候沒人要，她就去鄉下住了三十年。後來全世界都在找這張。」 | `pitch#vashti-bunyan-just-another-diamond-day` |
| 原句 | 「六〇年代的情歌王子，隔了幾十年交出這張。第一首就把客人嚇走。」 | `pitch#scott-walker-tilt` |
| 原句 | 「『後搖滾』這三個字，就是樂評為了形容這張才用起來的。」 | `pitch#bark-psychosis-hex` |
| 原句 | 「B 面那首十七分鐘。據說錄音師錄到一半就走人了。」 | `pitch#the-velvet-underground-white-light-white-heat` |
