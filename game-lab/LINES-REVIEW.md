# 台詞審稿：品味對決 v4（LINES-REVIEW）

> 由 `node game-lab/tools/lint-copy.mjs` 產生，請勿手改。要改句子，直接改 `game-lab/content.js`（劇本、台詞、名牌、提示、規則卡、教學）或 `game-lab/tools/pitches.json`（推薦語，改完重跑 `node game-lab/tools/bake-cards.mjs`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 `roguelike.html` 逐字比對（45 句）；標成「店主」的字已與 `tools/owner-lines-v4.json`（DECISIONS-v4 店主寫／核可的字）逐字比對（71 句）。全部一致才會產生這份。
> v4：三相剋＋差 2 星剋不動、對手暗選＋提示（會唬人）、六手上限、經濟（錢、箱子、櫃檯配件、特價箱）。脾氣、急了、翻面、B 面的句子全部刪除。
> 第二波（B2）：v4 劇本（開頭旁白 I1–I2、序章 O2–O21、收尾 E1–E11：原版 25 句逐字＋店主改的句子；原本的 O1 11-10 改成開頭旁白）；回嘴、好耳朵、一百塊三張等試做版句子已刪。教學六手（B2 第 2 階段）、經濟介面的字（B3，shopUi）已進來（C 整合）。

統計：原句 45、拍板 0、店主 71、新 388（同一句在有聲／安靜兩版序章只算一次）。

## 改過店主草稿的句子（等店主決定）

D §5 提示句草稿 15 句，13 句一字不差；這幾句改成含關鍵字（揭曉後結果句教「『關鍵字』是經典」），店主可以改回原文。

| 提示 | 店主草稿（D §5） | 現在畫面上 | 關鍵字 |
|---|---|---|---|
| c1 | 「這張，你總聽過吧？」 | 「這張，大家都聽過吧？」 | 大家都聽過 |
| c3 | 他哼起全場都會唱的那段副歌。 | 他哼起那段大家都會唱的副歌。 | 大家都會唱 |

## 序章（O2–O21；O1 11-10 併進開頭旁白）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | （挑三張。） | 本規格新寫 | `script.prologue[13].prompt` |

## 傳說藏家進門（每輪第 5 位）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | ▶ 品味對決 | 本規格新寫 | `script.bossEnter[1].prompt` |

## 打倒傳說藏家（每一輪：翻開他的王牌）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 傳說藏家・C1 | 「……這張，送你。三十年前，我也是這樣拿到的。」 | 概念稿 A | `script.bossDown[0]` |

## 散場（這一趟結束）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・D1 | 「……就到這裡吧。」 | 本規格新寫 | `script.dead[0]` |

## 再挑戰一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・A1 | 「……又是你。」 | 本規格新寫 | `script.again[0]` |
| 老闆・A2 | 「老樣子，《{ace}》。」 | 本規格新寫 | `script.again[1]` |

## 老闆（對決外）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・老闆說情 | ……再一場。 | 本規格新寫 | `lines.owner.retry` |
| 老闆・retryAsk | ……要不要再一場？ | 本規格新寫 | `lines.owner.retryAsk` |
| 老闆・包包滿了 | 包包滿了。先拿一張出來。 | 本規格新寫 | `lines.owner.bagFull` |
| 老闆・發燒配件滿了 | 配件最多帶三件。先放一件回去。 | 本規格新寫 | `lines.owner.relicFull` |

## 舞台泡泡・文青同好

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 文青同好・口頭禪（開場泡泡） | 你手上那幾張，我應該都有。 | 本規格新寫 | `lines.copycat.line` |
| 文青同好・進門那句 | 欸你那張哪裡買的？ | 概念稿 C | `lines.copycat.intro` |
| 文青同好・你贏了（他說） | 我回去也要買一張。 | 概念稿 A | `lines.copycat.lose[0]` |
| 文青同好・你輸了（他說） | 那張我有，兩張。 | 本規格新寫 | `lines.copycat.win` |

## 舞台泡泡・社團學長

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 社團學長・口頭禪（開場泡泡） | 你包包裡那些，社團都放過了。 | 本規格新寫 | `lines.already.line` |
| 社團學長・進門那句 | 這張？我高中就聽過了。 | 概念稿 D | `lines.already.intro` |
| 社團學長・你贏了（他說） | ……這張我真的沒聽過。可以借我嗎？ | 概念稿 B | `lines.already.lose[0]` |
| 社團學長・你輸了（他說） | 黑膠版聽完了沒？還沒吧。 | 本規格新寫 | `lines.already.win` |

## 舞台泡泡・音響發燒友

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 音響發燒友・口頭禪（開場泡泡） | 你手上那張，我盯很久了。 | 本規格新寫 | `lines.needle.line` |
| 音響發燒友・進門那句 | 你這張是幾版？ | 概念稿 D | `lines.needle.intro` |
| 音響發燒友・你贏了（他說） | ……我回去重新校正。 | 概念稿 D | `lines.needle.lose[0]` |
| 音響發燒友・你輸了（他說） | 先把唱臂調平再來。 | 本規格新寫 | `lines.needle.win` |

## 舞台泡泡・二手店老闆

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 二手店老闆・口頭禪（開場泡泡） | 這張在我店裡放了十年，沒人問過。 | 本規格新寫 | `lines.skip.line` |
| 二手店老闆・進門那句 | 你手上那張，我收的時候才五十塊。 | 本規格新寫 | `lines.skip.intro` |
| 二手店老闆・你贏了（他說） | ……下次這張，我要開高一點。 | 本規格新寫 | `lines.skip.lose[0]` |
| 二手店老闆・你輸了（他說） | 這張你出得太早了。 | 本規格新寫 | `lines.skip.win` |

## 舞台泡泡・地下樂團吉他手

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 地下樂團吉他手・口頭禪（開場泡泡） | 這段吉他，我練了一整個暑假。 | 本規格新寫 | `lines.broke.line` |
| 地下樂團吉他手・進門那句 | 剛從練團室出來，耳朵還在嗡嗡叫。 | 本規格新寫 | `lines.broke.intro` |
| 地下樂團吉他手・你贏了（他說） | ……回去再練一百遍。 | 本規格新寫 | `lines.broke.lose[0]` |
| 地下樂團吉他手・你輸了（他說） | 週末來看我們的場，報我名字。 | 本規格新寫 | `lines.broke.win` |

## 舞台泡泡・前衛樂迷

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 前衛樂迷・口頭禪（開場泡泡） | 這張你聽得完嗎？ | 本規格新寫 | `lines.buyer.line` |
| 前衛樂迷・進門那句 | 這張四十分鐘只有一個音。很好聽。 | 本規格新寫 | `lines.buyer.intro` |
| 前衛樂迷・你贏了（他說） | ……原來你也聽到最後。 | 本規格新寫 | `lines.buyer.lose[0]` |
| 前衛樂迷・你輸了（他說） | 耳朵還沒打開，回去再磨。 | 本規格新寫 | `lines.buyer.win` |

## 舞台泡泡・地下廠牌主理人

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 地下廠牌主理人・口頭禪（開場泡泡） | 你以為我會出最大的？ | 本規格新寫 | `lines.label.line` |
| 地下廠牌主理人・進門那句 | 這張是我們廠牌的第一號。封套是我自己摺的。 | 本規格新寫 | `lines.label.intro` |
| 地下廠牌主理人・你贏了（他說） | ……下一批，算你一張。 | 概念稿 A | `lines.label.lose[0]` |
| 地下廠牌主理人・你輸了（他說） | 旋律太多了，下次少一點。 | 本規格新寫 | `lines.label.win` |

## 舞台泡泡・資深樂評

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 資深樂評・口頭禪（開場泡泡） | 你這手，我會寫進專欄。 | 本規格新寫 | `lines.critic.line` |
| 資深樂評・進門那句 | 我寫過這張的樂評。 | 概念稿 A | `lines.critic.intro` |
| 資深樂評・你贏了（他說） | ……這張，我重寫一篇。 | 本規格新寫 | `lines.critic.lose[0]` |
| 資深樂評・你輸了（他說） | 這段樂史，你漏了一頁。 | 本規格新寫 | `lines.critic.win` |

## 舞台泡泡・傳說藏家

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 傳說藏家・口頭禪（開場泡泡） | ……這張，我也有。 | 本規格新寫 | `lines.boss.line` |
| 傳說藏家・你贏了（他說） | ……這張，送你。三十年前，我也是這樣拿到的。 | 概念稿 A | `lines.boss.lose[0]` |

## 提示句（他這手的打算；揭曉後教「key 是哪一色」）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （提示）・經典・c1・key「大家都聽過」 | 「這張，大家都聽過吧？」 | 本規格新寫 | `hints.c[0]` |
| （提示）・經典・c3・key「大家都會唱」 | 他哼起那段大家都會唱的副歌。 | 本規格新寫 | `hints.c[2]` |

## 一次性老闆小提示（第一次發生時，5 秒）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・第一次同色比星（含同色同星） | 同色比星數，多的扣差額。 | 本規格新寫 | `coachTips.tip_mirror` |
| 老闆・第一次被唬 | 嘴上說名盤，手上不一定是。 | 本規格新寫 | `coachTips.tip_bluff` |
| 老闆・第一次剋不動（你或他） | 差 2 星以上，剋不動。 | 本規格新寫 | `coachTips.tip_block` |
| 老闆・第一次丟王牌 | 王牌 7 星，一場用一次。 | 本規格新寫 | `coachTips.tip_ace` |
| 老闆・第一次打到第 6 手 | 六手沒分勝負，比聲望條剩幾成。 | 本規格新寫 | `coachTips.tip_rounds` |

## 規則卡（「?」小抄）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 品味對決・規則 | 本規格新寫 | `rules.title` |
| （畫面字） | 為什麼這樣剋：冷門笑經典太大眾，經典壓得住難懂的硬蕊，硬蕊拆穿只是沒人聽過的冷門。 | 本規格新寫 | `rules.why` |
| （畫面字） | 發燒配件：自動生效，最多帶三件。 | 本規格新寫 | `rules.relics` |
| （畫面字） | 點專輯再點屬性出牌；按住封面看唱片資訊。 | 本規格新寫 | `rules.foot[0]` |
| （畫面字） | 你開局 12 聲望（升級會加），打贏回 3；客人 {normal}、傳說藏家 {boss}。 | 本規格新寫 | `rules.foot[1]` |
| （畫面字） | 品味：剋中多扣，客人扣到就多扣；底氣：被扣少扣，最多擋一半。 | 本規格新寫 | `rules.foot[2]` |

## 對決盤面・牌桌小抄（點相剋圖打開）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 冷門剋經典　大家都聽過的不稀奇 | 本規格新寫 | `cheatSheet[0]` |
| （畫面字） | 經典剋硬蕊　再難入耳也比不過名盤 | 本規格新寫 | `cheatSheet[1]` |
| （畫面字） | 硬蕊剋冷門　再冷門，碰上真硬的也得低頭 | 本規格新寫 | `cheatSheet[2]` |
| （畫面字） | 差 2 星以上　剋不動，比星數 | 本規格新寫 | `cheatSheet[3]` |

## 挑王牌那行括號／唱盤前三張的小字

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・殿堂 | 大家都聽過的名盤 | 本規格新寫 | `aceGloss.hall` |
| （畫面字）・流亡 | 沒幾個人聽過 | 本規格新寫 | `aceGloss.pearl` |
| （畫面字）・異端 | 難入耳，越前衛越高 | 本規格新寫 | `aceGloss.heresy` |

## 對決盤面的字（{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・hintLabel | 提示 | 本規格新寫 | `duelText.hintLabel` |
| （畫面字）・sleeve | 蓋著 | 本規格新寫 | `duelText.sleeve` |
| （畫面字）・rounds | 第 {n}／{max} 手 | 本規格新寫 | `duelText.rounds` |
| （畫面字）・hp | 聲望 | 本規格新寫 | `duelText.hp` |
| （畫面字）・aceSlot | 王牌 | 本規格新寫 | `duelText.aceSlot` |
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
| （畫面字）・roundsOut | 六手打完，比聲望條 | 本規格新寫 | `duelText.roundsOut` |
| （畫面字）・roundsScore | 你剩 {p}%，他剩 {e}%：{who}贏 | 本規格新寫 | `duelText.roundsScore` |
| （畫面字）・roundsEven | 你剩 {p}%，他剩 {e}%：一樣，算你贏 | 本規格新寫 | `duelText.roundsEven` |
| （畫面字）・tapOn | 點一下繼續 | 本規格新寫 | `duelText.tapOn` |

## 發燒配件（點圖示看的說明／生效那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 防塵套 | 每場第一次被剋少扣 1。｜防塵套：少扣 1 | 本規格新寫 | `relics.dustcover` |
| 黑膠唱針 | 硬蕊剋中多扣 1。｜黑膠唱針：多扣 1 | 本規格新寫 | `relics.stylus` |
| 洗碟水 | 同色同星時你扣他 1。｜洗碟水：他 −1 | 本規格新寫 | `relics.cleaner` |
| 原版側標 | 經典剋中多扣 1。｜原版側標：多扣 1 | 本規格新寫 | `relics.obi` |
| 神秘見本盤 | 冷門剋中多扣 1。｜神秘見本盤：多扣 1 | 本規格新寫 | `relics.testpress` |
| 監聽耳機 | 每場第一手他不唬人。｜監聽耳機：他照實出 | 本規格新寫 | `relics.headphone` |
| 180g 重量盤 | 經典出招時 +1 星。｜重量盤：+1 星 | 本規格新寫 | `relics.boost_c` |
| 絕版編號標 | 冷門出招時 +1 星。｜絕版編號標：+1 星 | 本規格新寫 | `relics.boost_o` |
| 內圈刻字 | 硬蕊出招時 +1 星。｜內圈刻字：+1 星 | 本規格新寫 | `relics.boost_h` |

## 序章引導教學・第 1 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・m1・說 | 上面這句是提示，暗示他這手要出什麼。 | 本規格新寫 | `tutorial.steps.m1` |
| 老闆・m2・做 | 先出這張：點一下。 | 本規格新寫 | `tutorial.steps.m2` |
| 老闆・m3・做 | 他炫名盤，你也拿名盤：比星數。 | 本規格新寫 | `tutorial.steps.m3` |
| 老闆・m4・說 | 同色比星數，多的扣差額。 | 本規格新寫 | `tutorial.steps.m4` |
| 老闆・m5・說 | 『名盤』就是經典。提示裡會藏這種字。 | 本規格新寫 | `tutorial.steps.m5` |

## 序章引導教學・第 2 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・k0・說 | 『紀念版』：他要拿大家都聽過的壓你。 | 本規格新寫 | `tutorial.steps.k0` |
| 老闆・k1・做 | 大家都聽過的，不稀奇。出這張。 | 本規格新寫 | `tutorial.steps.k1` |
| 老闆・k2・做 | 出冷門。 | 本規格新寫 | `tutorial.steps.k2` |
| 老闆・k3・說 | 剋中！冷門剋經典，用你那顆星扣他。 | 本規格新寫 | `tutorial.steps.k3` |

## 序章引導教學・第 3 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・c0・說 | 『噪音』：他要拿難懂的嚇你。 | 本規格新寫 | `tutorial.steps.c0` |
| 老闆・c1・做 | 再難入耳，也比不過名盤。出這張。 | 本規格新寫 | `tutorial.steps.c1` |
| 老闆・c2・做 | 出經典。 | 本規格新寫 | `tutorial.steps.c2` |
| 老闆・c3・說 | 經典剋硬蕊：名盤是時間淬煉過的。 | 本規格新寫 | `tutorial.steps.c3` |

## 序章引導教學・第 4 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・h0・說 | 『自主發行』：他要拿沒人聽過的唬你。 | 本規格新寫 | `tutorial.steps.h0` |
| 老闆・h1・做 | 沒人聽過，不代表厲害。出這張。 | 本規格新寫 | `tutorial.steps.h1` |
| 老闆・h2・做 | 出硬蕊。 | 本規格新寫 | `tutorial.steps.h2` |
| 老闆・h3・說 | 硬蕊剋冷門：稀有，不等於有料。 | 本規格新寫 | `tutorial.steps.h3` |
| 老闆・h4・說 | 他炫哪一種，你就拿剋它的那種回。 | 本規格新寫 | `tutorial.steps.h4` |

## 序章引導教學・第 5 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・b0・說 | 這次是真正的大名盤。 | 本規格新寫 | `tutorial.steps.b0` |
| 老闆・b1・做 | 拿特價箱這張冷門，戳戳看。 | 本規格新寫 | `tutorial.steps.b1` |
| 老闆・b2・做 | 出冷門。 | 本規格新寫 | `tutorial.steps.b2` |
| 老闆・b3・說 | 差太多了：他高你 2 星以上，戳不動。 | 本規格新寫 | `tutorial.steps.b3` |
| 老闆・b4・說 | 剋不動，就改比星數。 | 本規格新寫 | `tutorial.steps.b4` |

## 序章引導教學・第 6 手（老闆的泡泡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・a1・做 | 最後一手。丟王牌：7 星，一場用一次。 | 本規格新寫 | `tutorial.steps.a1` |
| 老闆・a2・做 | 丟！ | 本規格新寫 | `tutorial.steps.a2` |
| 老闆・a3・說・殿堂 | 同色比星數，7 比 2，他 −5。 | 本規格新寫 | `tutorial.steps.a3.hall` |
| 老闆・a3・說・流亡 | 冷門剋經典，王牌 7 星，他 −7。 | 本規格新寫 | `tutorial.steps.a3.pearl` |
| 老闆・a3・說・異端 | 經典剋硬蕊，但你高 2 星以上，剋不動：他 −5。 | 本規格新寫 | `tutorial.steps.a3.heresy` |

## 序章引導教學・按鈕與標題

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 老闆 | 本規格新寫 | `tutorial.ui.who` |
| （畫面字） | 學會了： | 本規格新寫 | `tutorial.ui.learnedPrefix` |
| （畫面字） | 重看教學 | 本規格新寫 | `tutorial.ui.replay` |
| （畫面字） | 學會的規則 | 本規格新寫 | `tutorial.ui.learnedTitle` |

## 序章引導教學・點錯時

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 先點我指的這裡。 | 本規格新寫 | `tutorial.ui.wrong` |

## 序章引導教學・唱盤前（老闆攤開三張，看向老闆那條路）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・T1 | 「這三張，各據一座山頭。」 | 本規格新寫 | `tutorial.intro.T1` |
| 老闆・T2 | 「其實每張唱片三種都有，只是有高有低。」 | 本規格新寫 | `tutorial.intro.T2` |
| 老闆・T3 | 「大家都聽過的，碰上沒人聽過的，就不稀奇了。」 | 本規格新寫 | `tutorial.intro.T3` |
| 老闆・T4 | 「再難入耳，也比不過時間淬煉的名盤。」 | 本規格新寫 | `tutorial.intro.T4` |
| 老闆・T5 | 「再冷門，碰上真正硬的也得甘拜下風。」 | 本規格新寫 | `tutorial.intro.T5` |
| 老闆・T6 | 「他炫哪一種，你就拿剋它的那種回他。」 | 本規格新寫 | `tutorial.intro.T6` |

## 序章引導教學・學會的小卡（飛進「?」）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 學會了：同色比星數 | 本規格新寫 | `tutorial.learned.L1` |
| （畫面字） | 學會了：冷門剋經典：大家都聽過的不稀奇 | 本規格新寫 | `tutorial.learned.L2` |
| （畫面字） | 學會了：經典剋硬蕊：比不過名盤 | 本規格新寫 | `tutorial.learned.L3` |
| （畫面字） | 學會了：硬蕊剋冷門：稀有不等於有料 | 本規格新寫 | `tutorial.learned.L4` |
| （畫面字） | 學會了：差 2 星以上：剋不動 | 本規格新寫 | `tutorial.learned.L5` |
| （畫面字） | 學會了：王牌 7 星，一場用一次 | 本規格新寫 | `tutorial.learned.L6` |

## 店裡熱點（點了說一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 店貓・cat | ……喵。 | 本規格新寫 | `shopLines.cat` |
| 老闆・poster | 冷門剋經典，經典剋硬蕊，硬蕊剋冷門。 | 本規格新寫 | `shopLines.poster` |
| （畫面字）・locked | 這間還沒開。 | 本規格新寫 | `shopLines.locked` |
| 老闆・ownerHint.title | 外面雨大，進來坐。 | 本規格新寫 | `shopLines.ownerHint.title` |
| 老闆・ownerHint.scene | 慢慢看，不趕你。 | 本規格新寫 | `shopLines.ownerHint.scene` |
| 老闆・ownerHint.night | 客人一個一個來。 | 本規格新寫 | `shopLines.ownerHint.night` |
| 老闆・ownerHint.duel | 先看提示那句。 | 本規格新寫 | `shopLines.ownerHint.duel` |
| 老闆・ownerHint.reward | 收好，別折到封套。 | 本規格新寫 | `shopLines.ownerHint.reward` |
| 老闆・aceDone | 好，換這張。送你的也一起換了。 | 本規格新寫 | `shopLines.aceDone` |
| 老闆・aceSame | 那就照舊。 | 本規格新寫 | `shopLines.aceSame` |
| 老闆・aceLater | 想換王牌？下一趟開門前再說。 | 本規格新寫 | `shopLines.aceLater` |
| 老闆・bin | 點封面看唱片資訊、試聽。 | 本規格新寫 | `shopLines.bin` |
| 老闆・booth | 挑一張你唱片櫃裡的，放來聽聽。 | 本規格新寫 | `shopLines.booth` |
| 老闆・boothEmpty | 唱片櫃還空著。贏一場再來聽。 | 本規格新寫 | `shopLines.boothEmpty` |
| （畫面字）・titleHint | 點店裡的東西看看：牆上的唱片、箱子、試聽機 | 本規格新寫 | `shopLines.titleHint` |

## 今晚來客・第一次（soft 提示）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・nightIntro[0] | 客人一個一個來，打到輸為止。 | 本規格新寫 | `shopLines.nightIntro[0]` |
| 老闆・nightIntro[1] | 客人跟剛才那位不一樣，有時會唬你。 | 本規格新寫 | `shopLines.nightIntro[1]` |
| 老闆・nightIntro[2] | 贏了有錢，兩位客人之間可以去箱子買唱片。 | 本規格新寫 | `shopLines.nightIntro[2]` |

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
| （畫面字） | JAZZ | 本規格新寫 | `bins.jazz.label` |
| （畫面字） | TW | 本規格新寫 | `bins.tw.label` |
| （畫面字） | ROCK | 本規格新寫 | `bins.rock.label` |
| （畫面字） | ELEC | 本規格新寫 | `bins.elec.label` |
| （畫面字） | SOUL | 本規格新寫 | `bins.soul.label` |
| （畫面字） | HIP-HOP | 本規格新寫 | `bins.hiphop.label` |
| （畫面字） | CITY POP | 本規格新寫 | `bins.citypop.label` |
| （畫面字） | CLASSICAL | 本規格新寫 | `bins.classical.label` |
| （畫面字） | WORLD | 本規格新寫 | `bins.world.label` |
| （畫面字） | FOLK | 本規格新寫 | `bins.folk.label` |
| （畫面字） | INDIE ROCK | 本規格新寫 | `bins.indierock.label` |
| （畫面字） | INDIE POP | 本規格新寫 | `bins.indiepop.label` |
| （畫面字） | BLUES | 本規格新寫 | `bins.blues.label` |
| （畫面字） | NEW | 本規格新寫 | `bins.new.label` |
| （畫面字） | FEATURE | 本規格新寫 | `bins.feature.label` |
| （畫面字） | PICKS | 本規格新寫 | `bins.picks.label` |

## 經濟介面（箱子、櫃檯、特價箱；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・money | ${n} | 本規格新寫 | `shopUi.money` |
| （畫面字）・binTitle | {label} | 本規格新寫 | `shopUi.binTitle` |
| （畫面字）・buy | 買 ${n} | 本規格新寫 | `shopUi.buy` |
| （畫面字）・noMoney | 錢不夠 | 本規格新寫 | `shopUi.noMoney` |
| （畫面字）・bagFull | 包包滿了：先賣一張，半價 ${n} | 本規格新寫 | `shopUi.bagFull` |
| （畫面字）・sellPick | 賣這張 | 本規格新寫 | `shopUi.sellPick` |
| （畫面字）・sellPickN | 賣這 {k} 張 | 本規格新寫 | `shopUi.sellPickN` |
| （畫面字）・giftTag | 老闆送的 | 本規格新寫 | `shopUi.giftTag` |
| （畫面字）・seedTag | 櫃裡帶來 | 本規格新寫 | `shopUi.seedTag` |
| （畫面字）・seedNoSell | 從唱片櫃帶來的不能賣 | 本規格新寫 | `shopUi.seedNoSell` |
| （畫面字）・bought | 《{album}》進包包，−${n} | 本規格新寫 | `shopUi.bought` |
| （畫面字）・sold | 《{album}》賣掉，+${n} | 本規格新寫 | `shopUi.sold` |
| （畫面字）・relicTitle | 櫃檯的配件 | 本規格新寫 | `shopUi.relicTitle` |
| （畫面字）・relicFull | 配件最多三件：先賣一件，半價 ${n} | 本規格新寫 | `shopUi.relicFull` |
| （畫面字）・relicBought | 拿到「{name}」，−${n} | 本規格新寫 | `shopUi.relicBought` |
| （畫面字）・bargainTitle | 特價區 | 本規格新寫 | `shopUi.bargainTitle` |
| （畫面字）・bargainPrompt | （挑三張。） | 本規格新寫 | `shopUi.bargainPrompt` |
| （畫面字）・bargainTake | 收下這三張 | 本規格新寫 | `shopUi.bargainTake` |
| （畫面字）・bargainBuy | 買下 ${n} | 本規格新寫 | `shopUi.bargainBuy` |
| （畫面字）・bargainEach | ${n} | 本規格新寫 | `shopUi.bargainEach` |
| （畫面字）・bargainEmpty | 特價區賣完了，下一輪再補。 | 本規格新寫 | `shopUi.bargainEmpty` |
| （畫面字）・close | 關閉 | 本規格新寫 | `shopUi.close` |
| （畫面字）・earned | +${n} | 本規格新寫 | `shopUi.earned` |
| （畫面字）・bag | 包包 {n}/{max} | 本規格新寫 | `shopUi.bag` |
| （畫面字）・binEmpty | 這一箱賣完了，下一輪再補。 | 本規格新寫 | `shopUi.binEmpty` |
| （畫面字）・owned | 包包裡有了 | 本規格新寫 | `shopUi.owned` |
| （畫面字）・bagFullN | 包包放不下：先賣 {k} 張，半價 ${n} | 本規格新寫 | `shopUi.bagFullN` |
| （畫面字）・moneyShort | 錢不夠：先賣一張，半價 ${n} | 本規格新寫 | `shopUi.moneyShort` |
| （畫面字）・sellFirst | 先賣一張 | 本規格新寫 | `shopUi.sellFirst` |
| （畫面字）・relicSell | 賣這件 | 本規格新寫 | `shopUi.relicSell` |
| （畫面字）・relicSold | 「{name}」賣掉，+${n} | 本規格新寫 | `shopUi.relicSold` |
| （畫面字）・relicEmpty | 櫃檯的配件賣完了，下一輪再補。 | 本規格新寫 | `shopUi.relicEmpty` |
| （畫面字）・relicMoneyShort | 錢不夠：先賣一件，半價 ${n} | 本規格新寫 | `shopUi.relicMoneyShort` |
| （畫面字）・relicSellFirst | 先賣一件 | 本規格新寫 | `shopUi.relicSellFirst` |
| （畫面字）・bargainHint | 挑一到三張 | 本規格新寫 | `shopUi.bargainHint` |
| （畫面字）・bargainFree | 這次免費 | 本規格新寫 | `shopUi.bargainFree` |
| （畫面字）・prev | 上一張 | 本規格新寫 | `shopUi.prev` |
| （畫面字）・next | 下一張 | 本規格新寫 | `shopUi.next` |
| （畫面字）・infoAria | 唱片資訊、試聽 | 本規格新寫 | `shopUi.infoAria` |
| （畫面字） | 特價 | 本規格新寫 | `bargain.label` |

## 無限試煉・頂欄、來客、說情、標題（{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・game | 品味對決 | 本規格新寫 | `trial.ui.game` |
| （畫面字）・prologue | 序章 | 本規格新寫 | `trial.ui.prologue` |
| （畫面字）・pos | 第 {n} 位 | 本規格新寫 | `trial.ui.pos` |
| （畫面字）・round | 第 {r} 輪 | 本規格新寫 | `trial.ui.round` |
| （畫面字）・elite | 菁英 | 本規格新寫 | `trial.ui.elite` |
| （畫面字）・boss | 傳說藏家 | 本規格新寫 | `trial.ui.boss` |
| （畫面字）・toCheckpoint | 離下個中繼點還有 {n} 位 | 本規格新寫 | `trial.ui.toCheckpoint` |
| （畫面字）・checkpoint | 中繼點：第 {n} 位 | 本規格新寫 | `trial.ui.checkpoint` |
| （畫面字）・retryLeft | 老闆說情 剩 {n} 次 | 本規格新寫 | `trial.ui.retryLeft` |
| （畫面字）・next | 下一位：第 {n} 位　{name} ▸ | 本規格新寫 | `trial.ui.next` |
| （畫面字）・guestDone | 打過了 | 本規格新寫 | `trial.ui.guestDone` |
| （畫面字）・guestCur | 下一位 | 本規格新寫 | `trial.ui.guestCur` |
| （畫面字）・guestLater | 還沒輪到 | 本規格新寫 | `trial.ui.guestLater` |
| （畫面字）・hasAce | 帶王牌 | 本規格新寫 | `trial.ui.hasAce` |
| （畫面字）・hp | 聲望 {n}/{max} | 本規格新寫 | `trial.ui.hp` |
| （畫面字）・heal | 聲望 +{n} | 本規格新寫 | `trial.ui.heal` |
| （畫面字）・level | Lv {n} | 本規格新寫 | `trial.ui.level` |
| （畫面字）・xp | 經驗 {n}/{need} | 本規格新寫 | `trial.ui.xp` |
| （畫面字）・atk | 品味 {n} | 本規格新寫 | `trial.ui.atk` |
| （畫面字）・def | 底氣 {n} | 本規格新寫 | `trial.ui.def` |
| （畫面字）・maxHp | 聲望上限 {n} | 本規格新寫 | `trial.ui.maxHp` |
| （畫面字）・atkShort | 品 {n} | 本規格新寫 | `trial.ui.atkShort` |
| （畫面字）・defShort | 底 {n} | 本規格新寫 | `trial.ui.defShort` |
| （畫面字）・atkHelp | 剋中時多扣他 {n} | 本規格新寫 | `trial.ui.atkHelp` |
| （畫面字）・defHelp | 被扣時少扣 {n}（最多擋一半） | 本規格新寫 | `trial.ui.defHelp` |
| （畫面字）・eAtkHelp | 扣到你就多扣 {n} | 本規格新寫 | `trial.ui.eAtkHelp` |
| （畫面字）・cont | 繼續試煉 ▸ | 本規格新寫 | `trial.ui.cont` |
| （畫面字）・abandon | 放棄這一趟 | 本規格新寫 | `trial.ui.abandon` |
| （畫面字）・abandonWarn | 再按一次就放棄這一趟（{where}），從頭推門。 | 本規格新寫 | `trial.ui.abandonWarn` |
| （畫面字）・lastSummary | 看上一趟結算 | 本規格新寫 | `trial.ui.lastSummary` |
| （畫面字）・retryMenu[0] | ▶ 再一場（這一輪只有一次） | 本規格新寫 | `trial.ui.retryMenu[0]` |
| （畫面字）・retryMenu[1] | 到這裡就好 | 本規格新寫 | `trial.ui.retryMenu[1]` |
| （畫面字）・shelfNew | 這一趟新認識 | 本規格新寫 | `trial.ui.shelfNew` |
| （畫面字）・owner | 老闆 | 本規格新寫 | `trial.ui.owner` |
| （畫面字）・aceTalk | 聊聊 | 本規格新寫 | `trial.ui.aceTalk` |
| （畫面字）・aceSwap | 換一張王牌 | 本規格新寫 | `trial.ui.aceSwap` |
| （畫面字）・aceSwapSub | 老闆送的那幾張也跟著換 | 本規格新寫 | `trial.ui.aceSwapSub` |
| （畫面字）・aceNow | 現在帶的：{title}《{album}》 | 本規格新寫 | `trial.ui.aceNow` |
| （畫面字）・aceAsk | 「想換一張？」 | 本規格新寫 | `trial.ui.aceAsk` |
| （畫面字）・aceHint | 想換王牌，點老闆。 | 本規格新寫 | `trial.ui.aceHint` |
| （畫面字）・aceSwapped | 王牌換成《{album}》 | 本規格新寫 | `trial.ui.aceSwapped` |

## 無限試煉・升級三選一（店主暫定的名字：品味／底氣）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 升級：Lv {n} | 本規格新寫 | `trial.levelUp.title` |
| （畫面字）・sub | 聲望上限 +1（自動） | 本規格新寫 | `trial.levelUp.sub` |
| （畫面字）・atk | 品味 +1 | 本規格新寫 | `trial.levelUp.atk` |
| （畫面字）・def | 底氣 +1 | 本規格新寫 | `trial.levelUp.def` |
| （畫面字）・hp | 聲望上限 +2 | 本規格新寫 | `trial.levelUp.hp` |
| （畫面字）・atkSub | 剋中時多扣他 {n} | 本規格新寫 | `trial.levelUp.atkSub` |
| （畫面字）・defSub | 被扣時少扣 {n}（最多擋一半） | 本規格新寫 | `trial.levelUp.defSub` |
| （畫面字）・hpSub | 現在的聲望也 +{n} | 本規格新寫 | `trial.levelUp.hpSub` |

## 無限試煉・結果行補的一句（品味／底氣多扣、少扣）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・atk | 品味：多扣 {n} | 本規格新寫 | `trial.notes.atk` |
| （畫面字）・def | 底氣：少扣 {n} | 本規格新寫 | `trial.notes.def` |
| （畫面字）・eAtk | 他的品味：多扣 {n} | 本規格新寫 | `trial.notes.eAtk` |
| （畫面字）・eDef | 他的底氣：少扣 {n} | 本規格新寫 | `trial.notes.eDef` |

## 從唱片櫃挑牌開局・挑種子（第二趟起，挑完王牌）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・pickTitle | 從唱片櫃帶唱片來開局 | 本規格新寫 | `seeds.ui.pickTitle` |
| （畫面字）・pickSub | 開局 {n} 張：你帶的，加上老闆送的補滿（最多帶 {max} 張） | 本規格新寫 | `seeds.ui.pickSub` |
| （畫面字）・pickCount | {n}／{max} | 本規格新寫 | `seeds.ui.pickCount` |
| （畫面字）・pickTake | 帶這張 | 本規格新寫 | `seeds.ui.pickTake` |
| （畫面字）・picked | ✓ 帶了 | 本規格新寫 | `seeds.ui.picked` |
| （畫面字）・pickGo | 就這幾張 ▸ | 本規格新寫 | `seeds.ui.pickGo` |
| （畫面字）・pickNone | 先不挑 | 本規格新寫 | `seeds.ui.pickNone` |
| （畫面字）・pickAll | 全部 | 本規格新寫 | `seeds.ui.pickAll` |
| （畫面字）・pickEmpty | 這個顏色最強的，還沒有收藏。 | 本規格新寫 | `seeds.ui.pickEmpty` |
| （畫面字）・pickFull | 最多帶 {max} 張。先取消一張。 | 本規格新寫 | `seeds.ui.pickFull` |
| （畫面字）・pickFullToast | 已經帶滿 {max} 張，先取消一張再換。 | 本規格新寫 | `seeds.ui.pickFullToast` |

## 從唱片櫃挑牌開局・結算：這一趟帶走一張

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・keepTitle | 這一趟帶走一張 | 本規格新寫 | `seeds.ui.keepTitle` |
| （畫面字）・keepSub | 收進「我的收藏」，下一趟可以帶來開局。 | 本規格新寫 | `seeds.ui.keepSub` |
| （畫面字）・keepPick | 帶走這張 | 本規格新寫 | `seeds.ui.keepPick` |
| （畫面字）・keepCount | {n} 張可以挑：進過包包的、客人掉的 | 本規格新寫 | `seeds.ui.keepCount` |
| （畫面字）・keepLater | 先不帶 | 本規格新寫 | `seeds.ui.keepLater` |
| （畫面字）・keepDone | 《{album}》收進「我的收藏」了 | 本規格新寫 | `seeds.ui.keepDone` |
| （畫面字）・keepNone | 這一趟的唱片，「我的收藏」裡都有了。 | 本規格新寫 | `seeds.ui.keepNone` |
| （畫面字）・fromBag | 進過包包 | 本規格新寫 | `seeds.ui.fromBag` |
| （畫面字）・fromDrop | 客人掉的 | 本規格新寫 | `seeds.ui.fromDrop` |

## 從唱片櫃挑牌開局・唱片櫃頁（我的收藏／認識過）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・shelfOwn | 我的收藏 {n} 張 | 本規格新寫 | `seeds.ui.shelfOwn` |
| （畫面字）・shelfOwnSub | 可以帶來開局；王牌只展示。 | 本規格新寫 | `seeds.ui.shelfOwnSub` |
| （畫面字）・shelfOwnEmpty | 還沒有收藏。挑過的王牌那組、每一趟帶走的，都會收進來。 | 本規格新寫 | `seeds.ui.shelfOwnEmpty` |
| （畫面字）・shelfKnown | 認識過 {n}／{total} | 本規格新寫 | `seeds.ui.shelfKnown` |
| （畫面字）・shelfKnownSub | 客人丟的、你收的、老闆送的都算。 | 本規格新寫 | `seeds.ui.shelfKnownSub` |
| （畫面字）・storeTag | 店內取得 | 本規格新寫 | `seeds.ui.storeTag` |

## 從唱片櫃挑牌開局・沒收的只算「認識」（領獎、包包滿拿出來、序章撿唱片）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・rewardNote | 點封面看唱片資訊、試聽。沒收的也都算認識了。 | 本規格新寫 | `seeds.ui.rewardNote` |
| （畫面字）・bagOutMsg | 要放進來的是《{album}》。挑一張拿出來，它也算認識了。 | 本規格新寫 | `seeds.ui.bagOutMsg` |
| （畫面字）・stakeSkipSub | 也算認識了 | 本規格新寫 | `seeds.ui.stakeSkipSub` |

## 無限試煉・結算與標題的紀錄

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 試煉結束 | 本規格新寫 | `summary.title` |
| （畫面字）・reached | 走到第 {n} 位 | 本規格新寫 | `summary.reached` |
| （畫面字）・streak | 最多連贏 {n} 位 | 本規格新寫 | `summary.streak` |
| （畫面字）・taken | 收了 {n} 張 | 本規格新寫 | `summary.taken` |
| （畫面字）・wins | 贏了 {n} 位 | 本規格新寫 | `summary.wins` |
| （畫面字）・none | 這一趟沒收唱片 | 本規格新寫 | `summary.none` |
| （畫面字）・best | 最遠：第 {n} 位 | 本規格新寫 | `summary.best` |
| （畫面字）・newRecord | 新紀錄 | 本規格新寫 | `summary.newRecord` |
| （畫面字）・checkpoints | 中繼點：第 {list} 位 | 本規格新寫 | `summary.checkpoints` |
| （畫面字）・again | 再挑戰一趟 | 本規格新寫 | `summary.again` |
| （畫面字）・more | 還有 {n} 張，點了開唱片櫃 | 本規格新寫 | `summary.more` |

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
| （畫面字） | 門口 | 本規格新寫 | `shops/dip.json.props[3].hot.label` |
| （畫面字） | 店長推薦精選 | 本規格新寫 | `shops/dip.json.props[4].bin.label` |
| （畫面字） | 店長推薦 | 本規格新寫 | `shops/dip.json.props[5].bin.label` |
| （畫面字） | 獨立搖滾 | 本規格新寫 | `shops/dip.json.props[12].bin.label` |
| （畫面字） | 獨立流行 | 本規格新寫 | `shops/dip.json.props[13].bin.label` |
| （畫面字） | 藍調 | 本規格新寫 | `shops/dip.json.props[14].bin.label` |
| （畫面字） | 搖滾 | 本規格新寫 | `shops/dip.json.props[17].bin.label` |
| （畫面字） | 電子 | 本規格新寫 | `shops/dip.json.props[18].bin.label` |
| （畫面字） | 靈魂放克 | 本規格新寫 | `shops/dip.json.props[19].bin.label` |
| （畫面字） | 嘻哈 R&B | 本規格新寫 | `shops/dip.json.props[20].bin.label` |
| （畫面字） | 城市流行 | 本規格新寫 | `shops/dip.json.props[21].bin.label` |
| （畫面字） | 古典 | 本規格新寫 | `shops/dip.json.props[22].bin.label` |
| （畫面字） | 世界 | 本規格新寫 | `shops/dip.json.props[23].bin.label` |
| （畫面字） | 民謠 | 本規格新寫 | `shops/dip.json.props[24].bin.label` |
| （畫面字） | 爵士 | 本規格新寫 | `shops/dip.json.props[25].bin.label` |
| （畫面字） | 台灣 | 本規格新寫 | `shops/dip.json.props[26].bin.label` |
| （畫面字） | 試聽機 | 本規格新寫 | `shops/dip.json.props[27].hot.label` |
| （畫面字） | 新進 | 本規格新寫 | `shops/dip.json.props[29].bin.label` |
| （畫面字） | 特價區 | 本規格新寫 | `shops/dip.json.props[30].bin.label` |
| （畫面字） | 櫃檯 | 本規格新寫 | `shops/dip.json.props[31].hot.label` |
| （畫面字） | 公告 | 本規格新寫 | `shops/dip.json.hotspots[0].label` |
| （畫面字） | 老闆 | 本規格新寫 | `shops/dip.json.hotspots[1].label` |

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

## 推薦語・王牌（殿堂）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Radiohead《OK Computer》 | 「九七年的焦慮，到現在還沒退流行。」 | 本規格新寫 | `pitch#radiohead-ok-computer` |

## 推薦語・王牌（流亡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Zodiac》 | 「六六年在巴黎錄的。全台灣大概沒幾張。」 | 本規格新寫 | `pitch#barney-wilen-zodiac` |

## 推薦語・店裡的箱子（FEATURE）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Can《Ege Bamyasi》 | 「鼓手一個人就是一台機器。聽完你會想去學打鼓。」 | 本規格新寫 | `pitch#can-ege-bamyasi` |
| Einstürzende Neubauten《Halber Mensch》 | 「他們的樂器有一半是工地撿來的。」 | 本規格新寫 | `pitch#einsturzende-neubauten-halber-mensch` |
| Hermeto Pascoal《Zabumbê-bum-á》 | 「巴西的老頭，連水壺都拿來吹。這張我不太借人。」 | 本規格新寫 | `pitch#hermeto-pascoal-zabumbe-bum-a` |
| 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 「那個年代的日本，有人在錄這種東西。我手上就這一張。」 | 本規格新寫 | `pitch#富樫雅彦-we-now-create-music-for-strings-winds-and-percussions` |

## 推薦語・老闆四張・殿堂

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Beverly Glenn-Copeland《...Keyboard Fantasies...》 | 「八六年他自己出的卡帶。快三十年後，京都一家唱片行寫信來問還有沒有貨。」 | 本規格新寫 | `pitch#beverly-glenn-copeland-keyboard-fantasies` |
| Daft Punk《Random Access Memories》 | 「兩個機器人這次找真的樂手進錄音室。〈Get Lucky〉那年走到哪都聽得到。」 | 本規格新寫 | `pitch#daft-punk-random-access-memories` |
| Miles Davis《Cookin' with the Miles Davis Quintet》 | 「第一代五重奏：Coltrane、Red Garland、Paul Chambers、Philly Joe Jones。第一首〈My Funny Valentine〉，小號輕得像在耳邊說話。」 | 本規格新寫 | `pitch#miles-davis-cookin-with-the-miles-davis-quintet` |
| Brian Eno《Ambient 1: Music for Airports》 | 「他在機場等飛機時想到的。幾段長短不一的錄音帶一直繞，越聽越安靜。」 | 本規格新寫 | `pitch#brian-eno-ambient-1-music-for-airports` |

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

## 推薦語・客人的唱片（二手店老闆）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Moshi》 | 「七〇年他跟著拍片的人去了非洲，回來就做了這張。」 | 本規格新寫 | `pitch#barney-wilen-moshi` |
| Tony Scott & The Indonesian All Stars《Djanger Bali》 | 「印尼的樂手配一支美國單簧管。這張我找了好幾年。」 | 本規格新寫 | `pitch#tony-scott-the-indonesian-all-stars-djanger-bali` |

## 推薦語・客人的唱片（音響發燒友）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| John Zorn《Cobra》 | 「照一套遊戲規則即興出來的。跟你們今晚在做的事，差不多。」 | 本規格新寫 | `pitch#john-zorn-cobra` |

## 原句、拍板、店主（已逐字比對，列出供對照）

| 標記 | 句子 | 位置 |
|---|---|---|
| 原句 | 櫃檯後面的老闆抬頭看了你一眼，又低下頭，繼續整理手上的唱片。 | `script.prologue[0]` |
| 原句 | 你自己逛自己的。一排排的黑膠，大部分連名字都沒看過。 | `script.prologue[1]` |
| 原句 | 這時候，店裡的音響傳出一段旋律。 | `script.prologue[2]` |
| 店主 | 清脆的吉他分解和弦，底下墊著一層像機器運轉的電子聲。 | `script.prologue[3].hall` |
| 店主 | 一支薩克斯風自顧自地吹，旋律說斷就斷。 | `script.prologue[3].pearl` |
| 店主 | 鼓一下一下砸下來，像有人在敲鐵門。 | `script.prologue[3].heresy` |
| 店主 | 一個又高又細的男聲飄在上面，聽起來疲憊又不安。 | `script.prologue[4].hall` |
| 店主 | 鼓和貝斯不照拍子走，像在跟它鬥嘴。 | `script.prologue[4].pearl` |
| 店主 | 低音一直磨同一個音，一個男聲在吼，聽不出在唱什麼。 | `script.prologue[4].heresy` |
| 原句 | 你抬起頭。老闆正把一張唱片放上唱盤。櫃檯上還攤著兩張，封套邊緣磨損嚴重，顯然塵封已久。 | `script.prologue[5]` |
| 店主 | 你覺得，現在播的是哪張？ | `script.prologue[6].prompt` |
| 店主 | 「這三張，是我這裡最貴的三張。」他沒抬頭。「你覺得，現在播的是哪張？」 | `script.prologue[6]` |
| 原句 | 「……你眼光真不錯。」老闆終於抬起頭來，看著你。 | `script.prologue[7]` |
| 店主 | 「可惜啊。」老闆終於抬起頭來，看著你。 | `script.prologue[8]` |
| 原句 | （挑一張。） | `script.prologue[9].prompt` |
| 店主 | 「跟你很有緣，挑一張送你。」 | `script.prologue[9]` |
| 原句 | 「這張是我的私人收藏。今天讓給你。」 | `script.prologue[10]` |
| 原句 | 老闆不發一語，走出櫃檯，在那張長桌上的木箱裡翻翻找找。 | `script.prologue[11]` |
| 原句 | （老闆把四張盤遞給你。） | `script.prologue[12].prompt` |
| 原句 | 收下這四張 | `script.prologue[12].button` |
| 店主 | 「這四張也很適合你。收下吧。」 | `script.prologue[12]` |
| 店主 | 「特價區那邊，隨便挑三張。」 | `script.prologue[13]` |
| 店主 | 你把八張唱片放到櫃檯上。老闆一張一張看過，替你收進紙袋。 | `script.prologue[14]` |
| 原句 | 你抱著紙袋，心滿意足，往門口走去。 | `script.prologue[15]` |
| 原句 | 這時，門開了。 | `script.prologue[16]` |
| 原句 | 一名男子走進來。他的視線，落在你手上的那幾張專輯上。 | `script.prologue[17]` |
| 原句 | 「……這品味，也敢出來丟臉？」 | `script.prologue[18]` |
| 原句 | 你的憤怒表露無遺。 | `script.prologue[19]` |
| 原句 | 老闆不發一語，緩步走出櫃檯，站在兩人之間。 | `script.prologue[20]` |
| 店主 | ▶ 接受對決（看向老闆） | `script.prologue[21].prompts[0]` |
| 店主 | ▶ 接受對決（手伸進袋子，準備出招） | `script.prologue[21].prompts[1]` |
| 原句 | 跳過教學 | `script.prologue[21].promptSubs[1]` |
| 原句 | 「既然雙方都不服氣，不如來一場品味對決如何？」 | `script.prologue[21]` |
| 原句 | 對決結束。店裡安靜了幾秒。 | `script.epilogueWin[0]` |
| 原句 | 「……哼。」他把自己的唱片塞回袋子裡，看都不看你一眼。 | `script.epilogueWin[1]` |
| 原句 | 「搵休督欸丟！」 | `script.epilogueWin[2]` |
| 原句 | 門上的鈴鐺又響了一聲。他走了。 | `script.epilogueWin[3]` |
| 原句 | 「年輕人。」老闆看著你，慢慢點了點頭。 | `script.epilogueWin[4]` |
| 原句 | 「我看你對音樂脈絡，很有天份。」 | `script.epilogueWin[5]` |
| 原句 | （老闆從長桌底下拖出一個木箱。） | `script.epilogueWin[6].prompt` |
| 原句 | 「我這邊有一些被我淘汰的設備，你挑一個，帶回去吧。」 | `script.epilogueWin[6]` |
| 原句 | 「年輕人，有空再來這邊走走，與大家交流音樂。」 | `script.epilogueWin[7]` |
| 原句 | 你正要道謝，門又開了。 | `script.epilogueWin[8]` |
| 原句 | 「聽說這裡有個新來的，品味不錯？」 | `script.epilogueWin[9]` |
| 原句 | 無止盡的品味試煉，開始了。 | `script.epilogueWin[10]` |
| 原句 | 三十年的耳朵，不會騙人。 | `script.bossEnter[1].set.stamp` |
| 原句 | 「讓我看看你的品味有幾兩重。」 | `script.bossEnter[1]` |
| 店主 | 對方似乎掉落了什麼…… | `script.drop[0]` |
| 店主 | 雨下個不停。巷子深處，有人輕輕推開那扇半掩的門，門上的鈴鐺清脆一響，隨即被雨聲吞沒。 | `intro.lines[0]` |
| 店主 | 玻璃門晃了晃，映出推門的人。 | `intro.lines[1]` |
| 店主 | 玻璃上的你 | `intro.title` |
| 店主 | 先隨便 | `intro.skip` |
| 店主 | 清脆的吉他分解和弦，底下墊著一層像機器運轉的電子聲。 | `tonightLines.hall[0]` |
| 店主 | 一個又高又細的男聲飄在上面，聽起來疲憊又不安。 | `tonightLines.hall[1]` |
| 店主 | 一支薩克斯風自顧自地吹，旋律說斷就斷。 | `tonightLines.pearl[0]` |
| 店主 | 鼓和貝斯不照拍子走，像在跟它鬥嘴。 | `tonightLines.pearl[1]` |
| 店主 | 鼓一下一下砸下來，像有人在敲鐵門。 | `tonightLines.heresy[0]` |
| 店主 | 低音一直磨同一個音，一個男聲在吼，聽不出在唱什麼。 | `tonightLines.heresy[1]` |
| 原句 | ……這品味，也敢出來丟臉？ | `lines.man.intro` |
| 原句 | ……哼。 | `lines.man.lose[0]` |
| 原句 | 搵休督欸丟！ | `lines.man.lose[1]` |
| 原句 | 讓我看看你的品味有幾兩重。 | `lines.boss.intro` |
| 原句 | 三十年的耳朵，不會騙人。 | `lines.boss.stampSub` |
| 原句 | 我的木箱裡，沒有一張爛盤。 | `lines.boss.win` |
| 店主 | 男子 | `enemies.man.name` |
| 店主 | 文青同好 | `enemies.copycat.name` |
| 店主 | 社團學長 | `enemies.already.name` |
| 店主 | 音響發燒友 | `enemies.needle.name` |
| 店主 | 二手店老闆 | `enemies.skip.name` |
| 店主 | 地下樂團吉他手 | `enemies.broke.name` |
| 店主 | 前衛樂迷 | `enemies.buyer.name` |
| 店主 | 地下廠牌主理人 | `enemies.label.name` |
| 店主 | 資深樂評 | `enemies.critic.name` |
| 店主 | 傳說藏家 | `enemies.boss.name` |
| 店主 | 普通 | `rarityZh.common` |
| 店主 | 稀有 | `rarityZh.rare` |
| 店主 | 獨特 | `rarityZh.uncommon` |
| 店主 | 史詩 | `rarityZh.epic` |
| 店主 | 傳奇 | `rarityZh.legendary` |
| 店主 | 頂點 | `rarityZh.apex` |
| 店主 | 他抽出一張週年紀念版。 | `hints.c[1]` |
| 店主 | 他翻到「百大名盤」那一頁。 | `hints.c[3]` |
| 店主 | 他把那張名盤擦得發亮。 | `hints.c[4]` |
| 店主 | 他嘴角藏著「你沒聽過吧」的笑。 | `hints.o[0]` |
| 店主 | 他從箱底挖出一張自主發行盤。 | `hints.o[1]` |
| 店主 | 「這張只壓了三百張。」 | `hints.o[2]` |
| 店主 | 他翻著一本手寫的絕版清單。 | `hints.o[3]` |
| 店主 | 「這張，網路上查不到。」 | `hints.o[4]` |
| 店主 | 他露出「越難懂越屌」的眼神。 | `hints.h[0]` |
| 店主 | 他耳機漏出一陣刺耳的噪音。 | `hints.h[1]` |
| 店主 | 「聽不懂？那就對了。」 | `hints.h[2]` |
| 店主 | 封套上只有一片雜訊。 | `hints.h[3]` |
| 店主 | 他說，要聽就聽實驗的。 | `hints.h[4]` |
| 店主 | 名盤 | `hintKeywords.c[0]` |
| 店主 | 紀念版 | `hintKeywords.c[1]` |
| 店主 | 大家都聽過 | `hintKeywords.c[2]` |
| 店主 | 絕版 | `hintKeywords.o[0]` |
| 店主 | 自主發行 | `hintKeywords.o[1]` |
| 店主 | 沒人聽過 | `hintKeywords.o[2]` |
| 店主 | 噪音 | `hintKeywords.h[0]` |
| 店主 | 聽不懂 | `hintKeywords.h[1]` |
| 店主 | 實驗 | `hintKeywords.h[2]` |
| 店主 | 1 每張專輯有經典／冷門／硬蕊三個星數。 | `rules.lines[0]` |
| 店主 | 2 每一手，你和他各暗中挑一張專輯、一個屬性，同時亮出。 | `rules.lines[1]` |
| 店主 | 3 冷門剋經典、經典剋硬蕊、硬蕊剋冷門：剋中，就用你那個屬性的星數扣他聲望。 | `rules.lines[2]` |
| 店主 | 4 被剋的一方高 2 星以上，剋不動，改成比星數。 | `rules.lines[3]` |
| 店主 | 5 沒有相剋就比星數，高的扣差額；一樣大不扣。 | `rules.lines[4]` |
| 店主 | 6 提示會暗示他這手的打算，但有些人會唬你。王牌 7 星，一場用一次。六手內沒分出勝負，比誰的聲望條剩得多。 | `rules.lines[5]` |
| 原句 | 跳過教學 | `tutorial.ui.skipTut` |
| 店主 | 打完再翻。 | `shopLines.binBusy` |
| 原句 | 「這張放出來客人會跑光……我喜歡。」 | `pitch#swans-filth` |
| 原句 | 「柏林時期第一張，B 面幾乎沒有人聲。第一次聽會覺得怪，第三次就回不去了。」 | `pitch#david-bowie-low` |
| 原句 | 「1970 年出的時候沒人要，她就去鄉下住了三十年。後來全世界都在找這張。」 | `pitch#vashti-bunyan-just-another-diamond-day` |
| 原句 | 「六〇年代的情歌王子，隔了幾十年交出這張。第一首就把客人嚇走。」 | `pitch#scott-walker-tilt` |
| 原句 | 「『後搖滾』這三個字，就是樂評為了形容這張才用起來的。」 | `pitch#bark-psychosis-hex` |
| 原句 | 「B 面那首十七分鐘。據說錄音師錄到一半就走人了。」 | `pitch#the-velvet-underground-white-light-white-heat` |
