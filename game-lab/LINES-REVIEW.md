# 台詞審稿：品味對決 v4（LINES-REVIEW）

> 由 `node game-lab/tools/lint-copy.mjs` 產生，請勿手改。要改句子，直接改 `game-lab/content.js`（劇本、台詞、名牌、提示、規則卡、教學）或 `game-lab/tools/pitches.json`（推薦語，改完重跑 `node game-lab/tools/bake-cards.mjs`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 `roguelike.html` 逐字比對（45 句）；標成「店主」的字已與 `tools/owner-lines-v4.json`（DECISIONS-v4 店主寫／核可的字）逐字比對（71 句）。全部一致才會產生這份。
> v4：三相剋＋差 2 星剋不動、對手暗選＋提示（會唬人）、六手上限、經濟（錢、箱子、櫃檯配件、特價箱）。脾氣、急了、翻面、B 面的句子全部刪除。
> 第二波（B2）：v4 劇本（開頭旁白 I1–I2、序章 O2–O21、收尾 E1–E11：原版 25 句逐字＋店主改的句子；原本的 O1 11-10 改成開頭旁白）；回嘴、好耳朵、一百塊三張等試做版句子已刪。教學六手（B2 第 2 階段）、經濟介面的字（B3，shopUi）已進來（C 整合）。
> 活店（SPEC-H 第一階段）：熟客、路人、老闆閒聊、周姐知識樣板在「活店・…」各節（「說話者」欄＝名字・句子 id・出場條件；兩個泡泡用「／」隔開；{x} 由畫面代入，卡片欄位填不出來的那句就不出）。周姐的藝人介紹摘句是主站已審的原文，最後附抽樣 30 句看語感。
> 活店第二階段（切磋＝遭遇戰）：每位熟客的切磋句在「活店・切磋・<名字>」（說話者欄多標分類：嗆、接了、改天、沒理他、他輸了、他贏了、作廢、看你這一趟的切磋輸贏），邀請面板、對決頂欄、戰利品列的字在「活店・切磋・介面字」。

統計：原句 45、拍板 0、店主 71、新 1869（同一句在有聲／安靜兩版序章只算一次）。

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
| 老闆・發燒配件滿了 | 配件最多帶三件。先放一件回去。 | 本規格新寫 | `lines.owner.relicFull` |
| 老闆・retryPlea | 這是你存的那次說情，用完就沒了。 | 本規格新寫 | `lines.owner.retryPlea` |
| 老闆・profFirst | 老客人，先蓋兩個章。 | 本規格新寫 | `lines.owner.profFirst` |

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
| 二手店老闆・口頭禪（開場泡泡） | 來，看看你帶的貨。 | 本規格新寫 | `lines.skip.line` |
| 二手店老闆・進門那句 | 你手上那張，我收的時候才五十塊。 | 本規格新寫 | `lines.skip.intro` |
| 二手店老闆・你贏了（他說） | ……下次這張，我要開高一點。 | 本規格新寫 | `lines.skip.lose[0]` |
| 二手店老闆・你輸了（他說） | 這張你出得太早了。 | 本規格新寫 | `lines.skip.win` |

## 舞台泡泡・地下樂團吉他手

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 地下樂團吉他手・口頭禪（開場泡泡） | 打完我還要趕去練團。 | 本規格新寫 | `lines.broke.line` |
| 地下樂團吉他手・進門那句 | 剛從練團室出來，耳朵還在嗡嗡叫。 | 本規格新寫 | `lines.broke.intro` |
| 地下樂團吉他手・你贏了（他說） | ……回去再練一百遍。 | 本規格新寫 | `lines.broke.lose[0]` |
| 地下樂團吉他手・你輸了（他說） | 週末來看我們的場，報我名字。 | 本規格新寫 | `lines.broke.win` |

## 舞台泡泡・前衛樂迷

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 前衛樂迷・口頭禪（開場泡泡） | 別急，我們慢慢來。 | 本規格新寫 | `lines.buyer.line` |
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

## 提示句・明指・通用

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 誰都會講・經典・c06 | 他抽出一張封面誰都認得的。 | 本規格新寫 | `hintLines.one.c[0]` |
| 誰都會講・經典・c07 | 「你爸應該也有一張。」 | 本規格新寫 | `hintLines.one.c[1]` |
| 誰都會講・經典・c08 | 他輕輕哼起電台天天放的那段。 | 本規格新寫 | `hintLines.one.c[2]` |
| 誰都會講・經典・c09 | 「這首，KTV 一定點得到。」 | 本規格新寫 | `hintLines.one.c[3]` |
| 誰都會講・經典・c10 | 「前奏一下，大家就知道是哪首。」 | 本規格新寫 | `hintLines.one.c[4]` |
| 誰都會講・經典・c11 | 「喜宴上，一定聽得到這首。」 | 本規格新寫 | `hintLines.one.c[5]` |
| 誰都會講・經典・c12 | 他手上那張，已經是第八次再版。 | 本規格新寫 | `hintLines.one.c[6]` |
| 誰都會講・經典・c13 | 「當年的獎，幾乎都被它拿走了。」 | 本規格新寫 | `hintLines.one.c[7]` |
| 誰都會講・經典・c14 | 「小時候家裡天天在放這張。」 | 本規格新寫 | `hintLines.one.c[8]` |
| 誰都會講・經典・c15 | 他從最顯眼的那一排抽出一張。 | 本規格新寫 | `hintLines.one.c[9]` |
| 誰都會講・經典・c16 | 「隨便問路人，都知道這張。」 | 本規格新寫 | `hintLines.one.c[10]` |
| 誰都會講・經典・c17 | 「畢業典禮，每年都放這首。」 | 本規格新寫 | `hintLines.one.c[11]` |
| 誰都會講・經典・c18 | 他把封面轉向你，你一眼就認出來。 | 本規格新寫 | `hintLines.one.c[12]` |
| 誰都會講・經典・c19 | 「這首，我阿嬤也會跟著唱。」 | 本規格新寫 | `hintLines.one.c[13]` |
| 誰都會講・經典・c20 | 「早餐店的收音機，天天在放這首。」 | 本規格新寫 | `hintLines.one.c[14]` |
| 誰都會講・經典・c21 | 豪華盒裝版，裡面還附海報。 | 本規格新寫 | `hintLines.one.c[15]` |
| 誰都會講・經典・c22 | 「聽了幾十年，還是不會膩。」 | 本規格新寫 | `hintLines.one.c[16]` |
| 誰都會講・經典・c23 | 「音樂課本裡，就有寫這張。」 | 本規格新寫 | `hintLines.one.c[17]` |
| 誰都會講・經典・c24 | 他一哼，你不自覺就接了下一句。 | 本規格新寫 | `hintLines.one.c[18]` |
| 誰都會講・經典・c25 | 「排行榜上，它待了一整年。」 | 本規格新寫 | `hintLines.one.c[19]` |
| 誰都會講・經典・c26 | 他把一張燙金的精選輯擺上檯面。 | 本規格新寫 | `hintLines.one.c[20]` |
| 誰都會講・經典・c27 | 「誰家的唱片櫃，都有這一張。」 | 本規格新寫 | `hintLines.one.c[21]` |
| 誰都會講・經典・c28 | 「好幾部電影，都用過這首。」 | 本規格新寫 | `hintLines.one.c[22]` |
| 誰都會講・經典・c29 | 「翻唱的版本，多到數不完。」 | 本規格新寫 | `hintLines.one.c[23]` |
| 誰都會講・經典・c30 | 「畢旅的遊覽車上，大家都搶著唱。」 | 本規格新寫 | `hintLines.one.c[24]` |
| 誰都會講・經典・c31 | 「尾牙每年都有人上台唱這首。」 | 本規格新寫 | `hintLines.one.c[25]` |
| 誰都會講・經典・c32 | 「歷年的榜單，它從來沒缺席過。」 | 本規格新寫 | `hintLines.one.c[26]` |
| 誰都會講・經典・c33 | 「以前一堆人的手機鈴聲，就是這首。」 | 本規格新寫 | `hintLines.one.c[27]` |
| 誰都會講・經典・c34 | 他吹起口哨，那段旋律誰都熟。 | 本規格新寫 | `hintLines.one.c[28]` |
| 誰都會講・經典・c35 | 「拍廣告的，最愛拿這首來用。」 | 本規格新寫 | `hintLines.one.c[29]` |
| 誰都會講・經典・c36 | 「五十週年，又出了一次紀念版。」 | 本規格新寫 | `hintLines.one.c[30]` |
| 誰都會講・經典・c37 | 「不用試聽，閉著眼睛買就對了。」 | 本規格新寫 | `hintLines.one.c[31]` |
| 誰都會講・經典・c38 | 「這首副歌，你一定唱過。」 | 本規格新寫 | `hintLines.one.c[32]` |
| 誰都會講・經典・c39 | 「入門第一張，就是它。」 | 本規格新寫 | `hintLines.one.c[33]` |
| 誰都會講・經典・c40 | 「滿街的 T 恤，都印過這張封面。」 | 本規格新寫 | `hintLines.one.c[34]` |
| 誰都會講・經典・c41 | 他翻出一張唱片行永遠不缺貨的。 | 本規格新寫 | `hintLines.one.c[35]` |
| 誰都會講・經典・c42 | 「演唱會最後一首，全場都在等它。」 | 本規格新寫 | `hintLines.one.c[36]` |
| 誰都會講・經典・c43 | 「不認識這張，會被笑喔。」 | 本規格新寫 | `hintLines.one.c[37]` |
| 誰都會講・經典・c44 | 「那個封面，被模仿過無數次。」 | 本規格新寫 | `hintLines.one.c[38]` |
| 誰都會講・經典・c45 | 側標上印著「銷售破百萬」。 | 本規格新寫 | `hintLines.one.c[39]` |
| 誰都會講・經典・c46 | 他笑著看你，像在等你一起唱。 | 本規格新寫 | `hintLines.one.c[40]` |
| 誰都會講・經典・c47 | 他指了指封套上的金唱片貼紙。 | 本規格新寫 | `hintLines.one.c[41]` |
| 誰都會講・經典・c48 | 「買來送人，最不會出錯的一張。」 | 本規格新寫 | `hintLines.one.c[42]` |
| 誰都會講・冷門・o06 | 他抽出一張標籤是手寫的。 | 本規格新寫 | `hintLines.one.o[0]` |
| 誰都會講・冷門・o07 | 「問了三家店，都說沒有。」 | 本規格新寫 | `hintLines.one.o[1]` |
| 誰都會講・冷門・o08 | 他亮出一張試壓盤，封膜都還在。 | 本規格新寫 | `hintLines.one.o[2]` |
| 誰都會講・冷門・o09 | 「從來沒有再版過。」 | 本規格新寫 | `hintLines.one.o[3]` |
| 誰都會講・冷門・o10 | 「海外郵購，等了三個月才到。」 | 本規格新寫 | `hintLines.one.o[4]` |
| 誰都會講・冷門・o11 | 封套是影印的，邊邊還歪了。 | 本規格新寫 | `hintLines.one.o[5]` |
| 誰都會講・冷門・o12 | 「當年只在演出現場賣。」 | 本規格新寫 | `hintLines.one.o[6]` |
| 誰都會講・冷門・o13 | 「這個團，只出過這一張就散了。」 | 本規格新寫 | `hintLines.one.o[7]` |
| 誰都會講・冷門・o14 | 封套上蓋著「宣傳用」的章。 | 本規格新寫 | `hintLines.one.o[8]` |
| 誰都會講・冷門・o15 | 「跳蚤市場翻了一下午，才翻到它。」 | 本規格新寫 | `hintLines.one.o[9]` |
| 誰都會講・冷門・o16 | 「上網搜，只會搜到我的貼文。」 | 本規格新寫 | `hintLines.one.o[10]` |
| 誰都會講・冷門・o17 | 他從牛皮紙袋裡抽出一張唱片。 | 本規格新寫 | `hintLines.one.o[11]` |
| 誰都會講・冷門・o18 | 「全台灣，可能就這一張。」 | 本規格新寫 | `hintLines.one.o[12]` |
| 誰都會講・冷門・o19 | 「出它的小廠牌，早就倒了。」 | 本規格新寫 | `hintLines.one.o[13]` |
| 誰都會講・冷門・o20 | 他翻到背面，上面手寫編號 47。 | 本規格新寫 | `hintLines.one.o[14]` |
| 誰都會講・冷門・o21 | 「拍賣網上，從來沒看過有人賣。」 | 本規格新寫 | `hintLines.one.o[15]` |
| 誰都會講・冷門・o22 | 標籤全白，一個字都沒印。 | 本規格新寫 | `hintLines.one.o[16]` |
| 誰都會講・冷門・o23 | 「知道這張的人，一隻手數得完。」 | 本規格新寫 | `hintLines.one.o[17]` |
| 誰都會講・冷門・o24 | 「當年沒人理，現在大家在找。」 | 本規格新寫 | `hintLines.one.o[18]` |
| 誰都會講・冷門・o25 | 「原版的價錢，比我的機車還貴。」 | 本規格新寫 | `hintLines.one.o[19]` |
| 誰都會講・冷門・o26 | 「拿三張跟人換，才換到這張。」 | 本規格新寫 | `hintLines.one.o[20]` |
| 誰都會講・冷門・o27 | 「當年只在南部發過。」 | 本規格新寫 | `hintLines.one.o[21]` |
| 誰都會講・冷門・o28 | 「樂手自己都不記得錄過這張。」 | 本規格新寫 | `hintLines.one.o[22]` |
| 誰都會講・冷門・o29 | 他翻出一張你在店裡從沒看過的。 | 本規格新寫 | `hintLines.one.o[23]` |
| 誰都會講・冷門・o30 | 「排行榜？從來沒上過。」 | 本規格新寫 | `hintLines.one.o[24]` |
| 誰都會講・冷門・o31 | 「從資源回收場救回來的。」 | 本規格新寫 | `hintLines.one.o[25]` |
| 誰都會講・冷門・o32 | 「是留學生從國外帶回來的。」 | 本規格新寫 | `hintLines.one.o[26]` |
| 誰都會講・冷門・o33 | 「只在深夜電台放過一次。」 | 本規格新寫 | `hintLines.one.o[27]` |
| 誰都會講・冷門・o34 | 「連唱片行的人都沒看過。」 | 本規格新寫 | `hintLines.one.o[28]` |
| 誰都會講・冷門・o35 | 他壓低聲音：「很少人知道這張。」 | 本規格新寫 | `hintLines.one.o[29]` |
| 誰都會講・冷門・o36 | 「當年只印了一批，沒有第二批。」 | 本規格新寫 | `hintLines.one.o[30]` |
| 誰都會講・冷門・o37 | 「錄音室流出來的，沒正式發過。」 | 本規格新寫 | `hintLines.one.o[31]` |
| 誰都會講・冷門・o38 | 「封面是樂手自己剪貼的。」 | 本規格新寫 | `hintLines.one.o[32]` |
| 誰都會講・冷門・o39 | 他從一疊沒標價的唱片裡抽出一張。 | 本規格新寫 | `hintLines.one.o[33]` |
| 誰都會講・冷門・o40 | 「年份到現在都還查不出來。」 | 本規格新寫 | `hintLines.one.o[34]` |
| 誰都會講・冷門・o41 | 「台灣從來沒進過貨。」 | 本規格新寫 | `hintLines.one.o[35]` |
| 誰都會講・冷門・o42 | 他捧著那張，像怕它碎掉。 | 本規格新寫 | `hintLines.one.o[36]` |
| 誰都會講・冷門・o43 | 「樂手的名字，你應該第一次聽到。」 | 本規格新寫 | `hintLines.one.o[37]` |
| 誰都會講・冷門・o44 | 「好不容易，才等到有人釋出。」 | 本規格新寫 | `hintLines.one.o[38]` |
| 誰都會講・冷門・o45 | 「發行量？大概幾十張吧。」 | 本規格新寫 | `hintLines.one.o[39]` |
| 誰都會講・硬蕊・h06 | 「聽完這張，要休息一下。」 | 本規格新寫 | `hintLines.one.h[0]` |
| 誰都會講・硬蕊・h07 | 「一首就二十分鐘，還沒有歌詞。」 | 本規格新寫 | `hintLines.one.h[1]` |
| 誰都會講・硬蕊・h08 | 「沒有一個音是準的。」 | 本規格新寫 | `hintLines.one.h[2]` |
| 誰都會講・硬蕊・h09 | 「放出來，鄰居會來敲門。」 | 本規格新寫 | `hintLines.one.h[3]` |
| 誰都會講・硬蕊・h10 | 唱針一放，喇叭先爆了一聲。 | 本規格新寫 | `hintLines.one.h[4]` |
| 誰都會講・硬蕊・h11 | 「聽完，耳鳴了三天。」 | 本規格新寫 | `hintLines.one.h[5]` |
| 誰都會講・硬蕊・h12 | 「沒有旋律，只有聲音。」 | 本規格新寫 | `hintLines.one.h[6]` |
| 誰都會講・硬蕊・h13 | 封面是一張在尖叫的臉。 | 本規格新寫 | `hintLines.one.h[7]` |
| 誰都會講・硬蕊・h14 | 「鼓手好像在拆鼓。」 | 本規格新寫 | `hintLines.one.h[8]` |
| 誰都會講・硬蕊・h15 | 「聽沒兩分鐘，頭就開始痛。」 | 本規格新寫 | `hintLines.one.h[9]` |
| 誰都會講・硬蕊・h16 | 「吉他失真到聽不出是吉他。」 | 本規格新寫 | `hintLines.one.h[10]` |
| 誰都會講・硬蕊・h17 | 「裡面有一段，是拿電鑽錄的。」 | 本規格新寫 | `hintLines.one.h[11]` |
| 誰都會講・硬蕊・h18 | 「一半是即興，一半是吵架。」 | 本規格新寫 | `hintLines.one.h[12]` |
| 誰都會講・硬蕊・h19 | 他翻開附贈的樂譜，上面只有幾條線。 | 本規格新寫 | `hintLines.one.h[13]` |
| 誰都會講・硬蕊・h20 | 「開車的時候，千萬別放這張。」 | 本規格新寫 | `hintLines.one.h[14]` |
| 誰都會講・硬蕊・h21 | 「聽到一半，你會以為唱盤壞了。」 | 本規格新寫 | `hintLines.one.h[15]` |
| 誰都會講・硬蕊・h22 | 「人聲全部用吼的。」 | 本規格新寫 | `hintLines.one.h[16]` |
| 誰都會講・硬蕊・h23 | 「錄音師錄完這張就辭職了。」 | 本規格新寫 | `hintLines.one.h[17]` |
| 誰都會講・硬蕊・h24 | 「不是壞掉，本來就這樣。」 | 本規格新寫 | `hintLines.one.h[18]` |
| 誰都會講・硬蕊・h25 | 他手指在檯面上亂敲，完全沒拍子。 | 本規格新寫 | `hintLines.one.h[19]` |
| 誰都會講・硬蕊・h26 | 「薩克斯風吹得像在慘叫。」 | 本規格新寫 | `hintLines.one.h[20]` |
| 誰都會講・硬蕊・h27 | 「先做好心理準備，再放。」 | 本規格新寫 | `hintLines.one.h[21]` |
| 誰都會講・硬蕊・h28 | 「聽起來像隔壁在裝潢。」 | 本規格新寫 | `hintLines.one.h[22]` |
| 誰都會講・硬蕊・h29 | 「整張聽起來，像收音機沒對到台。」 | 本規格新寫 | `hintLines.one.h[23]` |
| 誰都會講・硬蕊・h30 | 「一放，連貓都躲起來。」 | 本規格新寫 | `hintLines.one.h[24]` |
| 誰都會講・硬蕊・h31 | 「放給爸媽聽，會被罵。」 | 本規格新寫 | `hintLines.one.h[25]` |
| 誰都會講・硬蕊・h32 | 「錄的是鐵片互相刮的聲音。」 | 本規格新寫 | `hintLines.one.h[26]` |
| 誰都會講・硬蕊・h33 | 「我聽到第五次，才聽完一整張。」 | 本規格新寫 | `hintLines.one.h[27]` |
| 誰都會講・硬蕊・h34 | 全黑的封套，只有一行白字。 | 本規格新寫 | `hintLines.one.h[28]` |
| 誰都會講・硬蕊・h35 | 「節拍數到七，就亂掉了。」 | 本規格新寫 | `hintLines.one.h[29]` |
| 誰都會講・硬蕊・h36 | 「每一首都像在打架。」 | 本規格新寫 | `hintLines.one.h[30]` |
| 誰都會講・硬蕊・h37 | 「聽得懂這張的人，都怪怪的。」 | 本規格新寫 | `hintLines.one.h[31]` |
| 誰都會講・硬蕊・h38 | 「歌詞只有一個字，喊了十分鐘。」 | 本規格新寫 | `hintLines.one.h[32]` |
| 誰都會講・硬蕊・h39 | 「嬰兒聽了會哭的那種。」 | 本規格新寫 | `hintLines.one.h[33]` |
| 誰都會講・硬蕊・h40 | 「在廢棄工廠裡錄的。」 | 本規格新寫 | `hintLines.one.h[34]` |
| 誰都會講・硬蕊・h41 | 他戴上耳機，馬上往後一縮。 | 本規格新寫 | `hintLines.one.h[35]` |
| 誰都會講・硬蕊・h42 | 他從包包裡掏出一副耳塞。 | 本規格新寫 | `hintLines.one.h[36]` |
| 誰都會講・硬蕊・h43 | 他一試聽，旁邊的人都退了一步。 | 本規格新寫 | `hintLines.one.h[37]` |
| 誰都會講・硬蕊・h44 | 「音量開到一半，就夠你受了。」 | 本規格新寫 | `hintLines.one.h[38]` |
| 誰都會講・硬蕊・h45 | 「這種東西，越聽越不像音樂。」 | 本規格新寫 | `hintLines.one.h[39]` |
| 誰都會講・硬蕊・h46 | 封套背面，畫滿看不懂的符號。 | 本規格新寫 | `hintLines.one.h[40]` |
| 誰都會講・硬蕊・h47 | 他做了個摀耳朵的動作，自己先笑了。 | 本規格新寫 | `hintLines.one.h[41]` |
| 誰都會講・硬蕊・h48 | 「聽完以後，安靜都變得很好聽。」 | 本規格新寫 | `hintLines.one.h[42]` |
| 誰都會講・硬蕊・h49 | 「錄音的時候，麥克風燒掉兩支。」 | 本規格新寫 | `hintLines.one.h[43]` |

## 提示句・明指・個性

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 文青同好・經典・c-copycat-1 | 「大家都在推，我當然也買了。」 | 本規格新寫 | `hintLines.one.c[43]` |
| 文青同好・經典・c-copycat-2 | 「我發限動放這首，一堆人按愛心。」 | 本規格新寫 | `hintLines.one.c[44]` |
| 社團學長・經典・c-already-1 | 「社團新生，第一張都聽這個。」 | 本規格新寫 | `hintLines.one.c[45]` |
| 社團學長・經典・c-already-2 | 「社辦那台唱盤，最常放的就是這張。」 | 本規格新寫 | `hintLines.one.c[46]` |
| 音響發燒友・經典・c-needle-1 | 「每場音響展，都在放這張。」 | 本規格新寫 | `hintLines.one.c[47]` |
| 音響發燒友・經典・c-needle-2 | 「同一張，我買過五個版本。」 | 本規格新寫 | `hintLines.one.c[48]` |
| 二手店老闆・經典・c-skip-1 | 「我店裡一年可以賣掉二十張。」 | 本規格新寫 | `hintLines.one.c[49]` |
| 二手店老闆・經典・c-skip-2 | 「這張啊，每次收貨都收得到。」 | 本規格新寫 | `hintLines.one.c[50]` |
| 地下樂團吉他手・經典・c-broke-1 | 「這首，我們團練暖身都在彈。」 | 本規格新寫 | `hintLines.one.c[51]` |
| 地下樂團吉他手・經典・c-broke-2 | 「這段 solo，我國中就會彈了。」 | 本規格新寫 | `hintLines.one.c[52]` |
| 前衛樂迷・經典・c-buyer-1 | 「偶爾，也要聽聽大家都在聽的。」 | 本規格新寫 | `hintLines.one.c[53]` |
| 前衛樂迷・經典・c-buyer-2 | 「太流行了，但我承認它好聽。」 | 本規格新寫 | `hintLines.one.c[54]` |
| 地下廠牌主理人・經典・c-label-1 | 「它賣的，比我們全廠牌加起來還多。」 | 本規格新寫 | `hintLines.one.c[55]` |
| 地下廠牌主理人・經典・c-label-2 | 「當年賣到缺貨，我看了很羨慕。」 | 本規格新寫 | `hintLines.one.c[56]` |
| 資深樂評・經典・c-critic-1 | 「樂史課的第一堂，就講這張。」 | 本規格新寫 | `hintLines.one.c[57]` |
| 資深樂評・經典・c-critic-2 | 「輪不到我評，大家早就評過了。」 | 本規格新寫 | `hintLines.one.c[58]` |
| 傳說藏家・經典・c-boss-1 | 「當年，人手一張。」 | 本規格新寫 | `hintLines.one.c[59]` |
| 傳說藏家・經典・c-boss-2 | 「我年輕的時候，滿街都在放。」 | 本規格新寫 | `hintLines.one.c[60]` |
| 文青同好・冷門・o-copycat-1 | 「朋友去東京挖回來的，只有一張。」 | 本規格新寫 | `hintLines.one.o[40]` |
| 文青同好・冷門・o-copycat-2 | 「排了一整晚，才買到這張。」 | 本規格新寫 | `hintLines.one.o[41]` |
| 社團學長・冷門・o-already-1 | 「學弟妹應該都沒聽過吧。」 | 本規格新寫 | `hintLines.one.o[42]` |
| 社團學長・冷門・o-already-2 | 「社辦找不到，是我高中挖到的。」 | 本規格新寫 | `hintLines.one.o[43]` |
| 音響發燒友・冷門・o-needle-1 | 「日本首版，側標都還在。」 | 本規格新寫 | `hintLines.one.o[44]` |
| 音響發燒友・冷門・o-needle-2 | 「這版的母帶，後來燒掉了。」 | 本規格新寫 | `hintLines.one.o[45]` |
| 二手店老闆・冷門・o-skip-1 | 「我收過一次，就再也沒看過。」 | 本規格新寫 | `hintLines.one.o[46]` |
| 二手店老闆・冷門・o-skip-2 | 「這張，我從來不擺上架。」 | 本規格新寫 | `hintLines.one.o[47]` |
| 地下樂團吉他手・冷門・o-broke-1 | 「前輩團的，自己錄自己賣。」 | 本規格新寫 | `hintLines.one.o[48]` |
| 地下樂團吉他手・冷門・o-broke-2 | 「表演完，在門口跟樂手買的。」 | 本規格新寫 | `hintLines.one.o[49]` |
| 前衛樂迷・冷門・o-buyer-1 | 「錄音帶轉的，原版早就沒了。」 | 本規格新寫 | `hintLines.one.o[50]` |
| 前衛樂迷・冷門・o-buyer-2 | 「這張，我找了七年。」 | 本規格新寫 | `hintLines.one.o[51]` |
| 地下廠牌主理人・冷門・o-label-1 | 「這批，我們只壓了一百張。」 | 本規格新寫 | `hintLines.one.o[52]` |
| 地下廠牌主理人・冷門・o-label-2 | 「封面是我們一張一張手印的。」 | 本規格新寫 | `hintLines.one.o[53]` |
| 資深樂評・冷門・o-critic-1 | 「當年的樂評，只有我寫過它。」 | 本規格新寫 | `hintLines.one.o[54]` |
| 資深樂評・冷門・o-critic-2 | 「樂史上，它只佔一個註腳。」 | 本規格新寫 | `hintLines.one.o[55]` |
| 傳說藏家・冷門・o-boss-1 | 「全世界，剩不到十張。」 | 本規格新寫 | `hintLines.one.o[56]` |
| 傳說藏家・冷門・o-boss-2 | 「這張，我等了三十年才等到。」 | 本規格新寫 | `hintLines.one.o[57]` |
| 文青同好・硬蕊・h-copycat-1 | 「我聽不完，但封面很好看。」 | 本規格新寫 | `hintLines.one.h[44]` |
| 文青同好・硬蕊・h-copycat-2 | 「大家說它很吵，我才去買的。」 | 本規格新寫 | `hintLines.one.h[45]` |
| 社團學長・硬蕊・h-already-1 | 「放社辦，學弟妹都跑光。」 | 本規格新寫 | `hintLines.one.h[46]` |
| 社團學長・硬蕊・h-already-2 | 「高一聽不懂，聽到高三才懂。」 | 本規格新寫 | `hintLines.one.h[47]` |
| 音響發燒友・硬蕊・h-needle-1 | 「這張的高頻，聽了牙齒會酸。」 | 本規格新寫 | `hintLines.one.h[48]` |
| 音響發燒友・硬蕊・h-needle-2 | 「拿來測喇叭，差點把它燒了。」 | 本規格新寫 | `hintLines.one.h[49]` |
| 二手店老闆・硬蕊・h-skip-1 | 「放在店裡，客人聽兩秒就走。」 | 本規格新寫 | `hintLines.one.h[50]` |
| 二手店老闆・硬蕊・h-skip-2 | 「每次試聽，都有人叫我關掉。」 | 本規格新寫 | `hintLines.one.h[51]` |
| 地下樂團吉他手・硬蕊・h-broke-1 | 「破音開到最大，音箱都在抖。」 | 本規格新寫 | `hintLines.one.h[52]` |
| 地下樂團吉他手・硬蕊・h-broke-2 | 「照這張的彈法，弦一定斷。」 | 本規格新寫 | `hintLines.one.h[53]` |
| 前衛樂迷・硬蕊・h-buyer-1 | 「要關燈聽，聽到你怕。」 | 本規格新寫 | `hintLines.one.h[54]` |
| 前衛樂迷・硬蕊・h-buyer-2 | 「耳朵打不開的，撐不過第一首。」 | 本規格新寫 | `hintLines.one.h[55]` |
| 地下廠牌主理人・硬蕊・h-label-1 | 「母帶是我們故意弄破的。」 | 本規格新寫 | `hintLines.one.h[56]` |
| 地下廠牌主理人・硬蕊・h-label-2 | 「發的時候，通路嫌太吵不收。」 | 本規格新寫 | `hintLines.one.h[57]` |
| 資深樂評・硬蕊・h-critic-1 | 「我寫了三千字，還是沒寫懂。」 | 本規格新寫 | `hintLines.one.h[58]` |
| 資深樂評・硬蕊・h-critic-2 | 「聽到一半，我的耳朵先投降。」 | 本規格新寫 | `hintLines.one.h[59]` |
| 傳說藏家・硬蕊・h-boss-1 | 「當年在店裡放，有人來砸門。」 | 本規格新寫 | `hintLines.one.h[60]` |
| 傳說藏家・硬蕊・h-boss-2 | 「三十年前，就把人嚇跑了。」 | 本規格新寫 | `hintLines.one.h[61]` |

## 提示句・半指・通用

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 誰都會講・他不出經典・nc01 | 他把暢銷榜那疊推到一邊。 | 本規格新寫 | `hintLines.half.c[0]` |
| 誰都會講・他不出經典・nc02 | 「想聽大家都聽過的？下次吧。」 | 本規格新寫 | `hintLines.half.c[1]` |
| 誰都會講・他不出經典・nc03 | 「這手不走流行路線。」 | 本規格新寫 | `hintLines.half.c[2]` |
| 誰都會講・他不出經典・nc04 | 他的手從精選輯上面滑過去。 | 本規格新寫 | `hintLines.half.c[3]` |
| 誰都會講・他不出經典・nc05 | 「不會是電台在放的那種。」 | 本規格新寫 | `hintLines.half.c[4]` |
| 誰都會講・他不出經典・nc06 | 「要唱 KTV 金曲，自己去包廂。」 | 本規格新寫 | `hintLines.half.c[5]` |
| 誰都會講・他不出經典・nc07 | 他跳過了紀念版那一櫃。 | 本規格新寫 | `hintLines.half.c[6]` |
| 誰都會講・他不出經典・nc08 | 「這手，你跟著唱不了。」 | 本規格新寫 | `hintLines.half.c[7]` |
| 誰都會講・他不出經典・nc09 | 「你家架上也有的，我幹嘛出？」 | 本規格新寫 | `hintLines.half.c[8]` |
| 誰都會講・他不出經典・nc10 | 他把封面誰都認得的那張收起來。 | 本規格新寫 | `hintLines.half.c[9]` |
| 誰都會講・他不出經典・nc11 | 「今天不考音樂課本。」 | 本規格新寫 | `hintLines.half.c[10]` |
| 誰都會講・他不出經典・nc12 | 「不用往大家都知道的那邊猜。」 | 本規格新寫 | `hintLines.half.c[11]` |
| 誰都會講・他不出經典・nc13 | 「我沒去翻你爸媽的唱片櫃。」 | 本規格新寫 | `hintLines.half.c[12]` |
| 誰都會講・他不出冷門・no01 | 他連箱底看都沒看。 | 本規格新寫 | `hintLines.half.o[0]` |
| 誰都會講・他不出冷門・no02 | 「今天不挖寶。」 | 本規格新寫 | `hintLines.half.o[1]` |
| 誰都會講・他不出冷門・no03 | 「壓箱寶沒帶出門。」 | 本規格新寫 | `hintLines.half.o[2]` |
| 誰都會講・他不出冷門・no04 | 他把限量那盒又鎖了回去。 | 本規格新寫 | `hintLines.half.o[3]` |
| 誰都會講・他不出冷門・no05 | 他碰都沒碰手寫標籤那疊。 | 本規格新寫 | `hintLines.half.o[4]` |
| 誰都會講・他不出冷門・no06 | 「這手，不考你冷知識。」 | 本規格新寫 | `hintLines.half.o[5]` |
| 誰都會講・他不出冷門・no07 | 「網路上一查就有。」 | 本規格新寫 | `hintLines.half.o[6]` |
| 誰都會講・他不出冷門・no08 | 他把那本郵購目錄闔上。 | 本規格新寫 | `hintLines.half.o[7]` |
| 誰都會講・他不出冷門・no09 | 「稀有盤，我才捨不得拿出來。」 | 本規格新寫 | `hintLines.half.o[8]` |
| 誰都會講・他不出冷門・no10 | 「試壓盤？想都別想。」 | 本規格新寫 | `hintLines.half.o[9]` |
| 誰都會講・他不出冷門・no11 | 「不是什麼絕版貨。」 | 本規格新寫 | `hintLines.half.o[10]` |
| 誰都會講・他不出冷門・no12 | 他從沒標價的那箱前面走開。 | 本規格新寫 | `hintLines.half.o[11]` |
| 誰都會講・他不出冷門・no13 | 「誰挖得比較深，下次再比。」 | 本規格新寫 | `hintLines.half.o[12]` |
| 誰都會講・他不出硬蕊・nh01 | 他把音量轉小。 | 本規格新寫 | `hintLines.half.h[0]` |
| 誰都會講・他不出硬蕊・nh02 | 「今天不吵你。」 | 本規格新寫 | `hintLines.half.h[1]` |
| 誰都會講・他不出硬蕊・nh03 | 他把耳塞收回口袋。 | 本規格新寫 | `hintLines.half.h[2]` |
| 誰都會講・他不出硬蕊・nh04 | 「不會刺耳，別緊張。」 | 本規格新寫 | `hintLines.half.h[3]` |
| 誰都會講・他不出硬蕊・nh05 | 他把黑色封套那疊塞回櫃子。 | 本規格新寫 | `hintLines.half.h[4]` |
| 誰都會講・他不出硬蕊・nh06 | 「鄰居不用來敲門。」 | 本規格新寫 | `hintLines.half.h[5]` |
| 誰都會講・他不出硬蕊・nh07 | 「放心，這手你聽得懂。」 | 本規格新寫 | `hintLines.half.h[6]` |
| 誰都會講・他不出硬蕊・nh08 | 「不拿你的耳朵做實驗。」 | 本規格新寫 | `hintLines.half.h[7]` |
| 誰都會講・他不出硬蕊・nh09 | 「這次喇叭撐得住。」 | 本規格新寫 | `hintLines.half.h[8]` |
| 誰都會講・他不出硬蕊・nh10 | 「耳朵可以放假了。」 | 本規格新寫 | `hintLines.half.h[9]` |
| 誰都會講・他不出硬蕊・nh11 | 「這手，不會嚇到人。」 | 本規格新寫 | `hintLines.half.h[10]` |
| 誰都會講・他不出硬蕊・nh12 | 「旋律，這手還是有的。」 | 本規格新寫 | `hintLines.half.h[11]` |
| 誰都會講・他不出硬蕊・nh13 | 他把會讓人耳鳴的那張收了起來。 | 本規格新寫 | `hintLines.half.h[12]` |

## 提示句・半指・個性

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 文青同好・他不出經典・nc-copycat-1 | 「這次我不跟風。」 | 本規格新寫 | `hintLines.half.c[13]` |
| 社團學長・他不出經典・nc-already-1 | 「我早就聽膩新生入門那幾張了。」 | 本規格新寫 | `hintLines.half.c[14]` |
| 音響發燒友・他不出經典・nc-needle-1 | 「不放音響行拿來試機的那幾張。」 | 本規格新寫 | `hintLines.half.c[15]` |
| 二手店老闆・他不出經典・nc-skip-1 | 「好賣的貨，我留著做生意。」 | 本規格新寫 | `hintLines.half.c[16]` |
| 地下樂團吉他手・他不出經典・nc-broke-1 | 「團練暖身曲？彈到爛了，跳過。」 | 本規格新寫 | `hintLines.half.c[17]` |
| 前衛樂迷・他不出經典・nc-buyer-1 | 「我的耳朵會自動跳過主流。」 | 本規格新寫 | `hintLines.half.c[18]` |
| 地下廠牌主理人・他不出經典・nc-label-1 | 「這手不跟大廠拚銷量。」 | 本規格新寫 | `hintLines.half.c[19]` |
| 資深樂評・他不出經典・nc-critic-1 | 「排行榜的東西，我寫到不想寫了。」 | 本規格新寫 | `hintLines.half.c[20]` |
| 傳說藏家・他不出經典・nc-boss-1 | 「人手一張的？那太好猜了。」 | 本規格新寫 | `hintLines.half.c[21]` |
| 文青同好・他不出冷門・no-copycat-1 | 「國外帶回來的？還在我朋友那。」 | 本規格新寫 | `hintLines.half.o[13]` |
| 社團學長・他不出冷門・no-already-1 | 「我高中挖到的寶，只放給自己聽。」 | 本規格新寫 | `hintLines.half.o[14]` |
| 音響發燒友・他不出冷門・no-needle-1 | 「難找的首版，鎖在防潮箱裡。」 | 本規格新寫 | `hintLines.half.o[15]` |
| 二手店老闆・他不出冷門・no-skip-1 | 「櫃檯底下的私藏，今天不見客。」 | 本規格新寫 | `hintLines.half.o[16]` |
| 地下樂團吉他手・他不出冷門・no-broke-1 | 「現場才買得到的，剛好借給鼓手。」 | 本規格新寫 | `hintLines.half.o[17]` |
| 前衛樂迷・他不出冷門・no-buyer-1 | 「找了七年的那張？還不到時候。」 | 本規格新寫 | `hintLines.half.o[18]` |
| 地下廠牌主理人・他不出冷門・no-label-1 | 「限量盤？連我自己都還沒拆。」 | 本規格新寫 | `hintLines.half.o[19]` |
| 資深樂評・他不出冷門・no-critic-1 | 「冷僻盤我寫夠了，換個話題。」 | 本規格新寫 | `hintLines.half.o[20]` |
| 傳說藏家・他不出冷門・no-boss-1 | 「今天不動木箱最底下那層。」 | 本規格新寫 | `hintLines.half.o[21]` |
| 文青同好・他不出硬蕊・nh-copycat-1 | 「太吵的，我朋友都不聽。」 | 本規格新寫 | `hintLines.half.h[13]` |
| 社團學長・他不出硬蕊・nh-already-1 | 「學弟妹在，吵的先不放。」 | 本規格新寫 | `hintLines.half.h[14]` |
| 音響發燒友・他不出硬蕊・nh-needle-1 | 「不想讓擴大機受苦。」 | 本規格新寫 | `hintLines.half.h[15]` |
| 二手店老闆・他不出硬蕊・nh-skip-1 | 「吵的放下去，客人會跑光。」 | 本規格新寫 | `hintLines.half.h[16]` |
| 地下樂團吉他手・他不出硬蕊・nh-broke-1 | 「今天不插電。」 | 本規格新寫 | `hintLines.half.h[17]` |
| 前衛樂迷・他不出硬蕊・nh-buyer-1 | 「好啦，放過你的耳朵。」 | 本規格新寫 | `hintLines.half.h[18]` |
| 地下廠牌主理人・他不出硬蕊・nh-label-1 | 「怕吵到你，最吵的那張沒帶。」 | 本規格新寫 | `hintLines.half.h[19]` |
| 資深樂評・他不出硬蕊・nh-critic-1 | 「不想再寫三千字的樂評了。」 | 本規格新寫 | `hintLines.half.h[20]` |
| 傳說藏家・他不出硬蕊・nh-boss-1 | 「砸門那張？改天再砸。」 | 本規格新寫 | `hintLines.half.h[21]` |

## 提示句・不露・通用

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 誰都會講・不指任何色・x01 | 他看了你一眼，什麼也沒說。 | 本規格新寫 | `hintLines.none[0]` |
| 誰都會講・不指任何色・x02 | 他把內袋抽出一半，又推回去。 | 本規格新寫 | `hintLines.none[1]` |
| 誰都會講・不指任何色・x03 | 「你先。」 | 本規格新寫 | `hintLines.none[2]` |
| 誰都會講・不指任何色・x04 | 他手指輕輕敲著檯面。 | 本規格新寫 | `hintLines.none[3]` |
| 誰都會講・不指任何色・x05 | 他喝了一口茶，一點也不急。 | 本規格新寫 | `hintLines.none[4]` |
| 誰都會講・不指任何色・x06 | 「這手，你自己猜。」 | 本規格新寫 | `hintLines.none[5]` |
| 誰都會講・不指任何色・x07 | 「不告訴你。」 | 本規格新寫 | `hintLines.none[6]` |
| 誰都會講・不指任何色・x08 | 他眨了眨眼，看不出在想什麼。 | 本規格新寫 | `hintLines.none[7]` |
| 誰都會講・不指任何色・x09 | 他盯著你的手，等你先動。 | 本規格新寫 | `hintLines.none[8]` |
| 誰都會講・不指任何色・x10 | 「看你的囉。」 | 本規格新寫 | `hintLines.none[9]` |
| 誰都會講・不指任何色・x11 | 他推了推眼鏡。 | 本規格新寫 | `hintLines.none[10]` |
| 誰都會講・不指任何色・x12 | 他翻了翻，挑了一張，沒讓你看。 | 本規格新寫 | `hintLines.none[11]` |
| 誰都會講・不指任何色・x13 | 「說了就不好玩了。」 | 本規格新寫 | `hintLines.none[12]` |
| 誰都會講・不指任何色・x14 | 他背過身去挑了一張。 | 本規格新寫 | `hintLines.none[13]` |
| 誰都會講・不指任何色・x15 | 他看向窗外，像在想別的事。 | 本規格新寫 | `hintLines.none[14]` |
| 誰都會講・不指任何色・x16 | 「猜猜看啊。」 | 本規格新寫 | `hintLines.none[15]` |
| 誰都會講・不指任何色・x17 | 他聳聳肩。 | 本規格新寫 | `hintLines.none[16]` |
| 誰都會講・不指任何色・x18 | 他用手掌蓋住那張的封面。 | 本規格新寫 | `hintLines.none[17]` |
| 誰都會講・不指任何色・x19 | 「你覺得呢？」 | 本規格新寫 | `hintLines.none[18]` |
| 誰都會講・不指任何色・x20 | 他把唱片疊好，抽了一張蓋著。 | 本規格新寫 | `hintLines.none[19]` |
| 誰都會講・不指任何色・x21 | 「祕密。」 | 本規格新寫 | `hintLines.none[20]` |
| 誰都會講・不指任何色・x22 | 他伸了個懶腰，慢慢挑。 | 本規格新寫 | `hintLines.none[21]` |
| 誰都會講・不指任何色・x23 | 他把手插進口袋，靠在檯邊。 | 本規格新寫 | `hintLines.none[22]` |
| 誰都會講・不指任何色・x24 | 「嗯……」他想了很久。 | 本規格新寫 | `hintLines.none[23]` |

## 提示句・不露・個性

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 文青同好・不指任何色・x-copycat-1 | 「欸你先出，我再決定。」 | 本規格新寫 | `hintLines.none[24]` |
| 文青同好・不指任何色・x-copycat-2 | 他偷瞄你手上那疊。 | 本規格新寫 | `hintLines.none[25]` |
| 社團學長・不指任何色・x-already-1 | 「這手先不講，免得你學起來。」 | 本規格新寫 | `hintLines.none[26]` |
| 社團學長・不指任何色・x-already-2 | 「學長出什麼，你猜啊。」 | 本規格新寫 | `hintLines.none[27]` |
| 音響發燒友・不指任何色・x-needle-1 | 他拿絨布擦唱片，擦了很久。 | 本規格新寫 | `hintLines.none[28]` |
| 音響發燒友・不指任何色・x-needle-2 | 「等一下，我先除個靜電。」 | 本規格新寫 | `hintLines.none[29]` |
| 二手店老闆・不指任何色・x-skip-1 | 他翻著帳本，頭也沒抬。 | 本規格新寫 | `hintLines.none[30]` |
| 二手店老闆・不指任何色・x-skip-2 | 「年輕人，你先。」 | 本規格新寫 | `hintLines.none[31]` |
| 地下樂團吉他手・不指任何色・x-broke-1 | 他抖著腳，等你先出。 | 本規格新寫 | `hintLines.none[32]` |
| 地下樂團吉他手・不指任何色・x-broke-2 | 他把撥片在指間轉來轉去。 | 本規格新寫 | `hintLines.none[33]` |
| 前衛樂迷・不指任何色・x-buyer-1 | 「答案，你自己聽。」 | 本規格新寫 | `hintLines.none[34]` |
| 前衛樂迷・不指任何色・x-buyer-2 | 他盯著天花板，一動也不動。 | 本規格新寫 | `hintLines.none[35]` |
| 地下廠牌主理人・不指任何色・x-label-1 | 「這手是商業機密。」 | 本規格新寫 | `hintLines.none[36]` |
| 地下廠牌主理人・不指任何色・x-label-2 | 他低頭滑手機，回了一封信。 | 本規格新寫 | `hintLines.none[37]` |
| 資深樂評・不指任何色・x-critic-1 | 他翻開筆記本，寫了幾個字。 | 本規格新寫 | `hintLines.none[38]` |
| 資深樂評・不指任何色・x-critic-2 | 「先看你怎麼出，我再下筆。」 | 本規格新寫 | `hintLines.none[39]` |
| 傳說藏家・不指任何色・x-boss-1 | 他閉上眼睛，好像在聽什麼。 | 本規格新寫 | `hintLines.none[40]` |
| 傳說藏家・不指任何色・x-boss-2 | 他摸著木箱的邊，不急。 | 本規格新寫 | `hintLines.none[41]` |

## 一次性老闆小提示（第一次發生時，5 秒）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・第一次同色比星（含同色同星） | 同色比星數，多的扣差額。 | 本規格新寫 | `coachTips.tip_mirror` |
| 老闆・第一次被唬 | 嘴上說名盤，手上不一定是。 | 本規格新寫 | `coachTips.tip_bluff` |
| 老闆・第一次剋不動（你或他） | 差 2 星以上，剋不動。 | 本規格新寫 | `coachTips.tip_block` |
| 老闆・第一次丟王牌 | 王牌 7 星，一場用一次。 | 本規格新寫 | `coachTips.tip_ace` |
| 老闆・第一次打到第 6 手 | 六手沒分勝負，比聲望條剩幾成。 | 本規格新寫 | `coachTips.tip_rounds` |
| 老闆・第一次出現上一手小列（第 2 手；點開＝上一手詳情） | 上一手留在上面，點開看細節。 | 本規格新寫 | `coachTips.tip_lastplay` |
| 老闆・第一次被他讀到（他照你上一手的應付方式剋你） | 他會記得你上一手怎麼出。 | 本規格新寫 | `coachTips.tip_read` |
| 老闆・第一次看到半指的提示（只說他不出哪一種） | 這句只說他不出哪一種。 | 本規格新寫 | `coachTips.tip_half` |
| 老闆・第一次看到不露的提示（這手沒給提示） | 這手他不露口風。 | 本規格新寫 | `coachTips.tip_none` |
| 老闆・第一次被唬到多扣 | 被他唬到，多扣 1。 | 本規格新寫 | `coachTips.tip_hit` |

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

## 對決盤面・選屬性時相剋圖旁那一行

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 冷門：剋經典｜怕硬蕊（例：選冷門） | 本規格新寫 | `triLegend` |

## 挑王牌那行括號／唱盤前三張的小字

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・經典流 | 大家都聽過的名盤 | 本規格新寫 | `aceGloss.hall` |
| （畫面字）・冷門流 | 沒幾個人聽過 | 本規格新寫 | `aceGloss.pearl` |
| （畫面字）・異端流 | 難入耳，越前衛越高 | 本規格新寫 | `aceGloss.heresy` |

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
| （畫面字）・readRight | 讀對了。 | 本規格新寫 | `duelText.readRight` |
| （畫面字）・seeThrough | 你看穿了！『{key}』是{hint}，他出的是{e}。 | 本規格新寫 | `duelText.seeThrough` |
| （畫面字）・seeThroughNoKey | 你看穿了！提示是{hint}，他出的是{e}。 | 本規格新寫 | `duelText.seeThroughNoKey` |
| （畫面字）・lpAria | 上一手{who}丟的：{t}，點一下看這手細節，按住看唱片資訊 | 本規格新寫 | `duelText.lpAria` |
| （畫面字）・lpAriaInfo | 上一手{who}丟的：{t}，點一下看唱片資訊 | 本規格新寫 | `duelText.lpAriaInfo` |
| （畫面字）・honestPlain | 他照實出。 | 本規格新寫 | `duelText.honestPlain` |
| （畫面字）・bluffPlain | 他唬你！他出的是{e}。 | 本規格新寫 | `duelText.bluffPlain` |
| （畫面字）・seeThroughPlain | 你看穿了！他出的是{e}。 | 本規格新寫 | `duelText.seeThroughPlain` |
| （畫面字）・readHit | 他讀到你了！他出的是{e}。 | 本規格新寫 | `duelText.readHit` |
| （畫面字）・readCounter | 你上一手照提示剋，他就在等這招。 | 本規格新寫 | `duelText.readCounter` |
| （畫面字）・readMirror | 你上一手跟提示同色，他換了一招。 | 本規格新寫 | `duelText.readMirror` |
| （畫面字）・readThird | 你防他唬人，他偏偏照實來。 | 本規格新寫 | `duelText.readThird` |
| （畫面字）・rcLink | 紀錄 | 本規格新寫 | `duelText.rcLink` |
| （畫面字）・rcList | 這場紀錄 | 本規格新寫 | `duelText.rcList` |
| （畫面字）・rcListDone | 上一場紀錄 | 本規格新寫 | `duelText.rcListDone` |
| （畫面字）・rcCount | {n} 手 | 本規格新寫 | `duelText.rcCount` |
| （畫面字）・rcAll | 全部 | 本規格新寫 | `duelText.rcAll` |
| （畫面字）・rcEmpty | 第 1 手揭曉後才有紀錄。 | 本規格新寫 | `duelText.rcEmpty` |
| （畫面字）・rcHand | 第 {n} 手 | 本規格新寫 | `duelText.rcHand` |
| （畫面字）・rcOf | ／{max} | 本規格新寫 | `duelText.rcOf` |
| （畫面字）・rcAfter | 這手打完　你 {p}／{pm}　他 {e}／{em} | 本規格新寫 | `duelText.rcAfter` |
| （畫面字）・rcVs | 對 | 本規格新寫 | `duelText.rcVs` |
| （畫面字）・rcNone | 不扣 | 本規格新寫 | `duelText.rcNone` |
| （畫面字）・rcCounter | 你剋中 | 本規格新寫 | `duelText.rcCounter` |
| （畫面字）・rcCountered | 被他剋 | 本規格新寫 | `duelText.rcCountered` |
| （畫面字）・rcGapYou | 剋不動 | 本規格新寫 | `duelText.rcGapYou` |
| （畫面字）・rcGapHim | 他剋不動 | 本規格新寫 | `duelText.rcGapHim` |
| （畫面字）・rcMirrorWin | 比星贏 | 本規格新寫 | `duelText.rcMirrorWin` |
| （畫面字）・rcMirrorLose | 比星輸 | 本規格新寫 | `duelText.rcMirrorLose` |
| （畫面字）・rcTie | 平手 | 本規格新寫 | `duelText.rcTie` |
| （畫面字）・rcBluff | 被唬 | 本規格新寫 | `duelText.rcBluff` |
| （畫面字）・rcSaw | 看穿 | 本規格新寫 | `duelText.rcSaw` |
| （畫面字）・rcRead | 被讀到 | 本規格新寫 | `duelText.rcRead` |
| （畫面字）・rcPrev | 前一手 | 本規格新寫 | `duelText.rcPrev` |
| （畫面字）・rcNext | 後一手 | 本規格新寫 | `duelText.rcNext` |
| （畫面字）・rcClose | 關閉 | 本規格新寫 | `duelText.rcClose` |
| （畫面字）・rcCover | {t}，點一下看唱片資訊 | 本規格新寫 | `duelText.rcCover` |

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
| 唱片袋側袋 | 多一張替補，聽膩時頂上。｜側袋：替補頂上 | 本規格新寫 | `relics.sleeve` |

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
| 老闆・aceKeep | 好，就帶這張。 | 本規格新寫 | `shopLines.aceKeep` |
| 老闆・aceLockedSay | 那張還沒到手。打倒傳說藏家再說。 | 本規格新寫 | `shopLines.aceLockedSay` |
| 老闆・closeWin | 好險，差一點就輸了。 | 本規格新寫 | `shopLines.closeWin` |
| 老闆・reclaimGift | 送你的，我先收回來。 | 本規格新寫 | `shopLines.reclaimGift` |
| 老闆・reclaimSeed | 你自己的那張？我先替你收著。 | 本規格新寫 | `shopLines.reclaimSeed` |
| 老闆・bin | 點封面看唱片資訊、試聽。 | 本規格新寫 | `shopLines.bin` |
| 老闆・booth | 挑一張你唱片櫃裡的，放來聽聽。 | 本規格新寫 | `shopLines.booth` |
| 老闆・boothEmpty | 唱片櫃還空著。贏一場再來聽。 | 本規格新寫 | `shopLines.boothEmpty` |
| （畫面字）・titleHint | 點店裡的東西看看：牆上的唱片、箱子、試聽機 | 本規格新寫 | `shopLines.titleHint` |

## 今晚來客・第一次（soft 提示）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・nightIntro[0] | 客人在對戰台等，走過去就開打，輸了才停。 | 本規格新寫 | `shopLines.nightIntro[0]` |
| 老闆・nightIntro[1] | 客人跟剛才那位不一樣，有時會唬你。 | 本規格新寫 | `shopLines.nightIntro[1]` |
| 老闆・nightIntro[2] | 贏了有錢，兩位客人之間可以去箱子買唱片。 | 本規格新寫 | `shopLines.nightIntro[2]` |
| 老闆・nightIntro[3] | 用不到的唱片，拿來櫃檯，我半價收。 | 本規格新寫 | `shopLines.nightIntro[3]` |

## 台北地圖預告

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・taipeiHere | 你在這 | 本規格新寫 | `shopLines.taipeiHere` |
| （畫面字）・taipeiNote | 其他店還沒開。之後一家一家開，每家的箱子、客人、老闆都不一樣。 | 本規格新寫 | `shopLines.taipeiNote` |
| （畫面字）・taipeiLink | 出門看看（台北地圖・預告） | 本規格新寫 | `shopLines.taipeiLink` |
| （畫面字）・backToShop | 回店裡 | 本規格新寫 | `shopLines.backToShop` |

## 你家・聆聽室

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・homeBtn | 你家 | 本規格新寫 | `shopLines.homeBtn` |
| （畫面字）・homeTitle | 你家 | 本規格新寫 | `shopLines.homeTitle` |
| （畫面字）・homeSub | 聆聽室 | 本規格新寫 | `shopLines.homeSub` |
| （畫面字）・homeNote | 點唱片架、唱盤、控制台，會走過去打開。 | 本規格新寫 | `shopLines.homeNote` |
| （畫面字）・homeEmpty | 唱片架還空著。推門玩一趟，帶走的唱片會擺在這裡。 | 本規格新寫 | `shopLines.homeEmpty` |
| （畫面字）・homeShelf | 唱片架 | 本規格新寫 | `shopLines.homeShelf` |
| （畫面字）・homeDeck | 唱盤 | 本規格新寫 | `shopLines.homeDeck` |
| （畫面字）・homeConsole | 控制台 | 本規格新寫 | `shopLines.homeConsole` |
| （畫面字）・homeShelfSub | 點封面看唱片資訊，按「放唱盤」就放來聽。 | 本規格新寫 | `shopLines.homeShelfSub` |
| （畫面字）・homeDeckSub | 挑一張放上唱盤。放完接下一張收藏。 | 本規格新寫 | `shopLines.homeDeckSub` |
| （畫面字）・homeDeckEmpty | 唱片架還空著，唱盤沒東西放。 | 本規格新寫 | `shopLines.homeDeckEmpty` |
| （畫面字）・homePut | 放唱盤 | 本規格新寫 | `shopLines.homePut` |
| （畫面字）・homeOnDeck | 放上唱盤：《{album}》 | 本規格新寫 | `shopLines.homeOnDeck` |
| （畫面字）・homeStop | 停 | 本規格新寫 | `shopLines.homeStop` |
| （畫面字）・homeNow | 唱盤上 | 本規格新寫 | `shopLines.homeNow` |
| （畫面字）・homeIdle | 唱盤空著。點唱盤挑一張來放。 | 本規格新寫 | `shopLines.homeIdle` |
| （畫面字）・homeWantN | 想要清單 {n} 張 | 本規格新寫 | `shopLines.homeWantN` |
| （畫面字）・homeWant | 《{album}》加進想要清單。 | 本規格新寫 | `shopLines.homeWant` |
| （畫面字）・homeWantAgain | 《{album}》已經在想要清單裡。 | 本規格新寫 | `shopLines.homeWantAgain` |
| （畫面字）・homeTuneFail | 控制台開不起來，等一下再試。 | 本規格新寫 | `shopLines.homeTuneFail` |
| （畫面字）・homeTuneLoading | 控制台開機中… | 本規格新寫 | `shopLines.homeTuneLoading` |
| （畫面字）・homeTuneBack | 回房間 | 本規格新寫 | `shopLines.homeTuneBack` |

## 一檔貨（兩位客人之間換貨、第 2 輪起全卡池；老闆一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・lotHint | 每位客人走了，每一箱都換上新的一排；打完傳說藏家，整批貨換新。 | 本規格新寫 | `shopLines.lotHint` |
| 老闆・lotAll | 新的一批到了，這批是從倉庫深處挖出來的。 | 本規格新寫 | `shopLines.lotAll` |

## 今日推薦集點卡（老闆提醒）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・dailyNew | 今天幫你留了一張，放在試聽機。 | 本規格新寫 | `shopLines.dailyNew` |

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
| （畫面字）・giftTag | 老闆送的 | 本規格新寫 | `shopUi.giftTag` |
| （畫面字）・seedTag | 櫃裡帶來 | 本規格新寫 | `shopUi.seedTag` |
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
| （畫面字）・binEmptyLot | 這一批的這一箱賣完了，打完傳說藏家整批換新。 | 本規格新寫 | `shopUi.binEmptyLot` |
| （畫面字）・binEmptyRound | 這一箱賣完了，下一輪再補。 | 本規格新寫 | `shopUi.binEmptyRound` |
| （畫面字）・wantTag | 你想要的 | 本規格新寫 | `shopUi.wantTag` |
| （畫面字）・wantOnShelf | 你想要的《{album}》上架了，在{bin}那一箱。 | 本規格新寫 | `shopUi.wantOnShelf` |
| （畫面字）・wantOnShelfN | 你想要的 {n} 張上架了：{bins}。 | 本規格新寫 | `shopUi.wantOnShelfN` |
| （畫面字）・close | 關閉 | 本規格新寫 | `shopUi.close` |
| （畫面字）・earned | +${n} | 本規格新寫 | `shopUi.earned` |
| （畫面字）・bag | 包包 {n} 張 | 本規格新寫 | `shopUi.bag` |
| （畫面字）・binEmpty | 這一箱賣完了，下一位客人來之前會換一批。 | 本規格新寫 | `shopUi.binEmpty` |
| （畫面字）・owned | 包包裡有了 | 本規格新寫 | `shopUi.owned` |
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
| （畫面字）・relicTab | 配件 | 本規格新寫 | `shopUi.relicTab` |
| （畫面字）・sellTab | 賣給老闆 | 本規格新寫 | `shopUi.sellTab` |
| （畫面字）・sellTitle | 賣給老闆 | 本規格新寫 | `shopUi.sellTitle` |
| （畫面字）・sellNote | 半價收。老闆送的、櫃裡帶來的交還老闆。 | 本規格新寫 | `shopUi.sellNote` |
| （畫面字）・sellAsk | 賣掉《{album}》？ | 本規格新寫 | `shopUi.sellAsk` |
| （畫面字）・sellGo | 賣給老闆 +${n} | 本規格新寫 | `shopUi.sellGo` |
| （畫面字）・reclaimAsk | 把《{album}》交還老闆？ | 本規格新寫 | `shopUi.reclaimAsk` |
| （畫面字）・reclaimGo | 交還老闆 | 本規格新寫 | `shopUi.reclaimGo` |
| （畫面字）・reclaimTag | 交還老闆 | 本規格新寫 | `shopUi.reclaimTag` |
| （畫面字）・reclaimed | 《{album}》交還老闆 | 本規格新寫 | `shopUi.reclaimed` |
| （畫面字）・sellNo | 算了 | 本規格新寫 | `shopUi.sellNo` |
| （畫面字）・sellInfo | 唱片資訊 | 本規格新寫 | `shopUi.sellInfo` |
| （畫面字）・bagSellMin | 包包至少留 {n} 張，手牌才補得滿。 | 本規格新寫 | `shopUi.bagSellMin` |
| （畫面字）・goCounter | 去櫃檯賣唱片 | 本規格新寫 | `shopUi.goCounter` |
| （畫面字）・bagNote | 不要的唱片：兩位客人之間，拿去櫃檯賣給老闆。 | 本規格新寫 | `shopUi.bagNote` |
| （畫面字）・bagSellHint | 包包越塞越滿？拿去櫃檯賣給老闆，半價。 | 本規格新寫 | `shopUi.bagSellHint` |
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
| （畫面字）・mainAttr | 常出：{attr} | 本規格新寫 | `trial.ui.mainAttr` |
| （畫面字）・titleFmt | {t}級 | 本規格新寫 | `trial.ui.titleFmt` |
| （畫面字）・titleLine | 稱號：{t} | 本規格新寫 | `trial.ui.titleLine` |
| （畫面字）・toRecord | 再贏 {n} 位破紀錄 | 本規格新寫 | `trial.ui.toRecord` |
| （畫面字）・streak | 連勝 +1（{n} 連勝） | 本規格新寫 | `trial.ui.streak` |
| （畫面字）・closeWin | 險勝！ | 本規格新寫 | `trial.ui.closeWin` |
| （畫面字）・aceLocked | 打倒傳說藏家解鎖 | 本規格新寫 | `trial.ui.aceLocked` |
| （畫面字）・aceLockedNote | {title}還鎖著，打倒傳說藏家解鎖。 | 本規格新寫 | `trial.ui.aceLockedNote` |
| （畫面字）・aceSwapNone | 其他流派還鎖著 | 本規格新寫 | `trial.ui.aceSwapNone` |
| （畫面字）・firstPick | 「先挑一派。其他流派，打倒傳說藏家再解鎖。」 | 本規格新寫 | `trial.ui.firstPick` |
| （畫面字）・firstPickNote | 挑了就是初始流派。其他兩派，打倒傳說藏家解鎖。 | 本規格新寫 | `trial.ui.firstPickNote` |
| （畫面字）・lockHint | 其他流派還鎖著：打倒傳說藏家，解鎖{title}。 | 本規格新寫 | `trial.ui.lockHint` |
| （畫面字）・unlocked | 解鎖了{title} | 本規格新寫 | `trial.ui.unlocked` |
| （畫面字）・unlockedSub | 下一趟開局，點老闆就能換。 | 本規格新寫 | `trial.ui.unlockedSub` |
| （畫面字）・newOwn | 新收藏 | 本規格新寫 | `trial.ui.newOwn` |
| （畫面字）・unlockMigrated | 流派改成打倒傳說藏家才解鎖。你現在這派照舊。 | 本規格新寫 | `trial.ui.unlockMigrated` |
| （畫面字）・unlockProg | 流派 {n}／3 | 本規格新寫 | `trial.ui.unlockProg` |
| （畫面字）・unlockNext | 下一派：{title} | 本規格新寫 | `trial.ui.unlockNext` |
| （畫面字）・apexProg | 頂點卡 {n}／{total} | 本規格新寫 | `trial.ui.apexProg` |
| （畫面字）・bossCarry | 帶的王牌《{album}》 | 本規格新寫 | `trial.ui.bossCarry` |
| （畫面字）・bossUnlock | 打倒他，解鎖{title} | 本規格新寫 | `trial.ui.bossUnlock` |
| （畫面字）・bossCollect | 打倒他，這張就收進唱片櫃 | 本規格新寫 | `trial.ui.bossCollect` |
| （畫面字）・tierRow | 試煉階級 | 本規格新寫 | `trial.ui.tierRow` |
| （畫面字）・tierN | 第 {k} 階 | 本規格新寫 | `trial.ui.tierN` |
| （畫面字）・tierZero | 不加條件 | 本規格新寫 | `trial.ui.tierZero` |
| （畫面字）・tierNew | 這一階：{text} | 本規格新寫 | `trial.ui.tierNew` |
| （畫面字）・tierMore | 另外 {n} 條 | 本規格新寫 | `trial.ui.tierMore` |
| （畫面字）・tierTag | 第 {k} 階 | 本規格新寫 | `trial.ui.tierTag` |
| （畫面字）・tierOpen | 開了第 {k} 階：{text} | 本規格新寫 | `trial.ui.tierOpen` |
| （畫面字）・tierLadder | 試煉階級：開到第 {k} 階 | 本規格新寫 | `trial.ui.tierLadder` |
| （畫面字）・tierHow | 打倒第 20 位藏家開下一階 | 本規格新寫 | `trial.ui.tierHow` |
| （畫面字）・tierReward | 樂歷 ×{m} | 本規格新寫 | `trial.ui.tierReward` |
| （畫面字）・tierShort | 試煉 | 本規格新寫 | `trial.ui.tierShort` |
| （畫面字）・tierDn | 少一階 | 本規格新寫 | `trial.ui.tierDn` |
| （畫面字）・tierUp | 多一階 | 本規格新寫 | `trial.ui.tierUp` |
| （畫面字）・tierAll | 點開看每一階 | 本規格新寫 | `trial.ui.tierAll` |
| （畫面字）・tierZeroSub | 往右選一階，就多一條條件、樂歷變多。 | 本規格新寫 | `trial.ui.tierZeroSub` |
| （畫面字）・tierStack | 選第 3 階＝前 3 條都算；越高樂歷越多。 | 本規格新寫 | `trial.ui.tierStack` |
| （畫面字）・tierPassed | 過關 | 本規格新寫 | `trial.ui.tierPassed` |
| （畫面字）・tierFar | 最遠第 {n} 位 | 本規格新寫 | `trial.ui.tierFar` |
| （畫面字）・tierNone | 還沒打過 | 本規格新寫 | `trial.ui.tierNone` |
| （畫面字）・tierPicked | 已選 | 本規格新寫 | `trial.ui.tierPicked` |
| （畫面字）・tierOpenSub | 回店門口，在「試煉階級」往右選；樂歷 ×{m}。 | 本規格新寫 | `trial.ui.tierOpenSub` |
| （畫面字）・tierRowNext | 下一趟 | 本規格新寫 | `trial.ui.tierRowNext` |

## 無限試煉・升級三選一（店主暫定的名字：品味／底氣）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 升到 Lv{n}：挑一項，這一趟都有效 | 本規格新寫 | `trial.levelUp.title` |
| （畫面字）・sub | 聲望上限 +1（自動） | 本規格新寫 | `trial.levelUp.sub` |
| （畫面字）・atk | 品味 +1 | 本規格新寫 | `trial.levelUp.atk` |
| （畫面字）・def | 底氣 +1 | 本規格新寫 | `trial.levelUp.def` |
| （畫面字）・hp | 聲望上限 +2 | 本規格新寫 | `trial.levelUp.hp` |
| （畫面字）・atkSub | 剋中時多扣他 {n} | 本規格新寫 | `trial.levelUp.atkSub` |
| （畫面字）・defSub | 被扣時少扣 {n}（最多擋一半） | 本規格新寫 | `trial.levelUp.defSub` |
| （畫面字）・hpSub | 現在的聲望也 +{n} | 本規格新寫 | `trial.levelUp.hpSub` |
| （畫面字）・chapter | 升級！Lv{n} | 本規格新寫 | `trial.levelUp.chapter` |
| （畫面字）・first | 打贏就會升級，挑一項，這一趟都有效。 | 本規格新寫 | `trial.levelUp.first` |

## 無限試煉・結果行補的一句（品味／底氣多扣、少扣）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・atk | 品味：多扣 {n} | 本規格新寫 | `trial.notes.atk` |
| （畫面字）・def | 底氣：少扣 {n} | 本規格新寫 | `trial.notes.def` |
| （畫面字）・eAtk | 他的品味：多扣 {n} | 本規格新寫 | `trial.notes.eAtk` |
| （畫面字）・eDef | 他的底氣：少扣 {n} | 本規格新寫 | `trial.notes.eDef` |
| （畫面字）・feint | 被唬到：多扣 {n} | 本規格新寫 | `trial.notes.feint` |

## 無限試煉・客人稱號（每 2 位換一次；舊版 enemyForDepth 的字，來客條與對決他名字旁）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・0 | 音樂小白 | 本規格新寫 | `trial.titles.0` |
| （畫面字）・1 | 文青同好 | 本規格新寫 | `trial.titles.1` |
| （畫面字）・2 | 社團學長 | 本規格新寫 | `trial.titles.2` |
| （畫面字）・3 | 資深樂評 | 本規格新寫 | `trial.titles.3` |
| （畫面字）・4 | 二手店老闆 | 本規格新寫 | `trial.titles.4` |
| （畫面字）・5 | 地下廠牌主理人 | 本規格新寫 | `trial.titles.5` |
| （畫面字）・6 | 品味行家 | 本規格新寫 | `trial.titles.6` |
| （畫面字）・7 | 品味之神 | 本規格新寫 | `trial.titles.7` |

## 無限試煉・客人稱號在來客條的短寫（名牌放不下的）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・地下廠牌主理人 | 廠牌主理人 | 本規格新寫 | `trial.titlesShort.地下廠牌主理人` |

## 試煉階級・階表（第 k 階：名字＋這一階新加的那條；推門那列、過場卡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・第 1 階 | 不說：什麼都不露的提示多 5%。 | 本規格新寫 | `trial.tiers[0].text` |
| （畫面字）・第 2 階 | 好貨：客人的牌加星變快（每 2 位一次）。 | 本規格新寫 | `trial.tiers[1].text` |
| （畫面字）・第 3 階 | 話少：只說一半的提示多 10%。 | 本規格新寫 | `trial.tiers[2].text` |
| （畫面字）・第 4 階 | 菁英：菁英聲望 +3。 | 本規格新寫 | `trial.tiers[3].text` |
| （畫面字）・第 5 階 | 老藏家：傳說藏家聲望 +3。 | 本規格新寫 | `trial.tiers[4].text` |
| （畫面字）・第 6 階 | 會唬：客人唬人多 5%。 | 本規格新寫 | `trial.tiers[5].text` |
| （畫面字）・第 7 階 | 硬底：客人底氣 +1。 | 本規格新寫 | `trial.tiers[6].text` |
| （畫面字）・第 8 階 | 小氣：打贏一般客人回的聲望少 1。 | 本規格新寫 | `trial.tiers[7].text` |
| （畫面字）・第 9 階 | 挑剔：菁英、藏家品味 +1。 | 本規格新寫 | `trial.tiers[8].text` |
| （畫面字）・第 10 階 | 大場面：菁英、藏家聲望再 +3。 | 本規格新寫 | `trial.tiers[9].text` |
| （畫面字）・第 11 階 | 更挑剔：所有客人品味 +1。 | 本規格新寫 | `trial.tiers[10].text` |
| （畫面字）・第 12 階 | 更小氣：打贏回的聲望再少 1（菁英、藏家也是）。 | 本規格新寫 | `trial.tiers[11].text` |
| （畫面字）・第 13 階 | 更硬底：客人底氣再 +1。 | 本規格新寫 | `trial.tiers[12].text` |

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
| （畫面字）・pickBrought | 帶來的 | 本規格新寫 | `seeds.ui.pickBrought` |

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
| （畫面字）・bringToast | 《{album}》在櫃檯等你：下一趟開局可以帶來 | 本規格新寫 | `seeds.ui.bringToast` |
| （畫面字）・bringToastFirst | 《{album}》在櫃檯等你：先跟老闆走一趟，下一趟帶來 | 本規格新寫 | `seeds.ui.bringToastFirst` |
| （畫面字）・bringMissing | 店裡沒有這張唱片。 | 本規格新寫 | `seeds.ui.bringMissing` |
| （畫面字）・bringLegend | 《{album}》是傳奇唱片，帶來太好打，店裡不收；史詩以下都能帶。 | 本規格新寫 | `seeds.ui.bringLegend` |
| （畫面字）・migrateFail | 存檔升級失敗，這次先不存檔；重新整理再試一次。 | 本規格新寫 | `seeds.ui.migrateFail` |
| （畫面字）・poolMissing | 唱片沒有全部載到，這次先不存檔；重新整理再試一次。 | 本規格新寫 | `seeds.ui.poolMissing` |

## 從唱片櫃挑牌開局・沒收的只算「認識」（領獎、包包滿拿出來、序章撿唱片）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・rewardNote | 點封面看唱片資訊、試聽。沒收的也都算認識了。 | 本規格新寫 | `seeds.ui.rewardNote` |
| （畫面字）・stakeSkipSub | 也算認識了 | 本規格新寫 | `seeds.ui.stakeSkipSub` |

## 今日推薦集點卡（試聽機那塊、標題小籤、換獎勵；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 今日推薦 | 本規格新寫 | `daily.title` |
| 老闆・hint | 每天第一次來，我留一張你還沒認識的唱片在這裡。收下就是你的，下一趟可以帶來店裡；蓋滿七格，換一張好盤。 | 本規格新寫 | `daily.hint` |
| （畫面字）・take | 收下 | 本規格新寫 | `daily.take` |
| （畫面字）・taken | 收進唱片櫃了 | 本規格新寫 | `daily.taken` |
| （畫面字）・tomorrow | 明天再來，我再幫你留一張。 | 本規格新寫 | `daily.tomorrow` |
| （畫面字）・none | 今天店裡沒有你還沒聽過的了。 | 本規格新寫 | `daily.none` |
| （畫面字）・stamps | 集點卡 {n}／7 | 本規格新寫 | `daily.stamps` |
| （畫面字）・firstStamp | 見面禮 | 本規格新寫 | `daily.firstStamp` |
| （畫面字）・claim | 換獎勵 | 本規格新寫 | `daily.claim` |
| （畫面字）・claimTitle | 挑一張帶回家 | 本規格新寫 | `daily.claimTitle` |
| （畫面字）・claimed | 收進唱片櫃，下一趟可以帶來店裡。 | 本規格新寫 | `daily.claimed` |
| （畫面字）・titleChip | 今日推薦：《{album}》 | 本規格新寫 | `daily.titleChip` |

## 樂歷・樂歷頁（天賦、重配、熟練度）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・page | 樂歷 | 本規格新寫 | `career.ui.page` |
| （畫面字）・title | 樂歷 Lv {n} | 本規格新寫 | `career.ui.title` |
| （畫面字）・bar | {a}／{b} | 本規格新寫 | `career.ui.bar` |
| （畫面字）・points | 天賦點 {n} | 本規格新寫 | `career.ui.points` |
| （畫面字）・nextLv | 下一級還要 {n} | 本規格新寫 | `career.ui.nextLv` |
| （畫面字）・groups[0].name | 戰力 | 本規格新寫 | `career.ui.groups[0].name` |
| （畫面字）・groups[1].name | 錢與經驗 | 本規格新寫 | `career.ui.groups[1].name` |
| （畫面字）・groups[2].name | 運氣 | 本規格新寫 | `career.ui.groups[2].name` |
| （畫面字）・groups[3].name | 安全網 | 本規格新寫 | `career.ui.groups[3].name` |
| （畫面字）・names.atk | 開局品味 | 本規格新寫 | `career.ui.names.atk` |
| （畫面字）・names.def | 開局底氣 | 本規格新寫 | `career.ui.names.def` |
| （畫面字）・names.hp | 開局聲望 | 本規格新寫 | `career.ui.names.hp` |
| （畫面字）・names.xp | 局內經驗 | 本規格新寫 | `career.ui.names.xp` |
| （畫面字）・names.plea | 備用說情 | 本規格新寫 | `career.ui.names.plea` |
| （畫面字）・names.money | 開局錢 | 本規格新寫 | `career.ui.names.money` |
| （畫面字）・names.pay | 酬勞 | 本規格新寫 | `career.ui.names.pay` |
| （畫面字）・names.rare | 稀有率 | 本規格新寫 | `career.ui.names.rare` |
| （畫面字）・names.piggy | 存錢筒 | 本規格新寫 | `career.ui.names.piggy` |
| （畫面字）・names.reroll | 重抽 | 本規格新寫 | `career.ui.names.reroll` |
| （畫面字）・names.ban | 封掉 | 本規格新寫 | `career.ui.names.ban` |
| （畫面字）・names.intel | 客人底細 | 本規格新寫 | `career.ui.names.intel` |
| （畫面字）・names.safety | 新手保底 | 本規格新寫 | `career.ui.names.safety` |
| （畫面字）・fx.atk | 每級開局品味 +1 | 本規格新寫 | `career.ui.fx.atk` |
| （畫面字）・fx.def | 每級開局底氣 +1 | 本規格新寫 | `career.ui.fx.def` |
| （畫面字）・fx.hp | 每級開局聲望上限 +2，現有的也 +2 | 本規格新寫 | `career.ui.fx.hp` |
| （畫面字）・fx.xp | 每級局內經驗 +10% | 本規格新寫 | `career.ui.fx.xp` |
| （畫面字）・fx.plea | 每趟一次，這一輪的說情用完才用 | 本規格新寫 | `career.ui.fx.plea` |
| （畫面字）・fx.money | 每級開局多 ${n} | 本規格新寫 | `career.ui.fx.money` |
| （畫面字）・fx.pay | 每級打贏的錢 +10% | 本規格新寫 | `career.ui.fx.pay` |
| （畫面字）・fx.rare | 每級戰利品列金邊機率 +2% | 本規格新寫 | `career.ui.fx.rare` |
| （畫面字）・fx.piggy | 輸了剩下的錢 10% 帶到下一趟 | 本規格新寫 | `career.ui.fx.piggy` |
| （畫面字）・fx.reroll | 每趟多一次重抽 | 本規格新寫 | `career.ui.fx.reroll` |
| （畫面字）・fx.ban | 每趟封掉一件配件或一張盤 | 本規格新寫 | `career.ui.fx.ban` |
| （畫面字）・fx.intel | 看他牌組三色比例 | 本規格新寫 | `career.ui.fx.intel` |
| （畫面字）・fx.safety | 上一趟沒到第 10 位，第一位輸了免費再一次 | 本規格新寫 | `career.ui.fx.safety` |
| （畫面字）・moneyOnly | （只多錢，不會變強） | 本規格新寫 | `career.ui.moneyOnly` |
| （畫面字）・powerLater | 戰力天賦 Lv{n} 開，點數先存著也可以 | 本規格新寫 | `career.ui.powerLater` |
| （畫面字）・now | 現在 {n} 級 | 本規格新寫 | `career.ui.now` |
| （畫面字）・cost | 下一級 {n} 點 | 本規格新寫 | `career.ui.cost` |
| （畫面字）・maxed | 已滿 | 本規格新寫 | `career.ui.maxed` |
| （畫面字）・auto | 自動 | 本規格新寫 | `career.ui.auto` |
| （畫面字）・lock | 樂歷 Lv{n} 開 | 本規格新寫 | `career.ui.lock` |
| （畫面字）・soon | 之後開放 | 本規格新寫 | `career.ui.soon` |
| （畫面字）・respec | 全部重配（免費） | 本規格新寫 | `career.ui.respec` |
| （畫面字）・respecDone | 點數都退回來了。 | 本規格新寫 | `career.ui.respecDone` |
| （畫面字）・prof | 熟練 Lv{n}・章 {s}／{per} | 本規格新寫 | `career.ui.prof` |
| （畫面字）・buy | 加一級 | 本規格新寫 | `career.ui.buy` |
| （畫面字）・sell | 退一級 | 本規格新寫 | `career.ui.sell` |
| （畫面字）・noPoints | 天賦點不夠 | 本規格新寫 | `career.ui.noPoints` |
| （畫面字）・profTitle | 熟練度 | 本規格新寫 | `career.ui.profTitle` |
| （畫面字）・unlockTitle | 流派與攤位 | 本規格新寫 | `career.ui.unlockTitle` |
| （畫面字）・tabTalent | 天賦 | 本規格新寫 | `career.ui.tabTalent` |
| （畫面字）・lastLine | 上一趟 樂歷 +{n} | 本規格新寫 | `career.ui.lastLine` |
| （畫面字）・nextRun | 改了下一趟開局才算 | 本規格新寫 | `career.ui.nextRun` |

## 樂歷・樂歷頁的解鎖階梯

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・ladderTitle | 解鎖階梯 | 本規格新寫 | `career.ui.ladderTitle` |
| （畫面字）・ladderRow | Lv{n} {name} | 本規格新寫 | `career.ui.ladderRow` |
| （畫面字）・ladder.talents | 天賦頁 | 本規格新寫 | `career.ui.ladder.talents` |
| （畫面字）・ladder.power | 戰力天賦 | 本規格新寫 | `career.ui.ladder.power` |
| （畫面字）・ladder.relic3 | 菁英、藏家的配件三選一 | 本規格新寫 | `career.ui.ladder.relic3` |
| （畫面字）・ladder.off | 可以關掉樂歷 | 本規格新寫 | `career.ui.ladder.off` |
| （畫面字）・ladder.seed4 | 種子格 4 格 | 本規格新寫 | `career.ui.ladder.seed4` |
| （畫面字）・ladder.gold | 戰利品列金邊機率 +1% | 本規格新寫 | `career.ui.ladder.gold` |
| （畫面字）・ladder.plea | 備用說情 | 本規格新寫 | `career.ui.ladder.plea` |
| （畫面字）・ladder.bgmShelf | 背景音樂也放唱片櫃的歌 | 本規格新寫 | `career.ui.ladder.bgmShelf` |
| （畫面字）・ladder.bench | 上場多帶一張替補 | 本規格新寫 | `career.ui.ladder.bench` |
| （畫面字）・ladder.tile6 | 市集多一攤 | 本規格新寫 | `career.ui.ladder.tile6` |
| （畫面字）・ladder.fortune2 | 算命攤第 2 張免費 | 本規格新寫 | `career.ui.ladder.fortune2` |
| （畫面字）・ladder.dig4 | 挖寶攤多一張蓋牌 | 本規格新寫 | `career.ui.ladder.dig4` |
| （畫面字）・ladder.seed5 | 種子格 5 格 | 本規格新寫 | `career.ui.ladder.seed5` |
| （畫面字）・ladder.relicsNew | 新配件 | 本規格新寫 | `career.ui.ladder.relicsNew` |
| （畫面字）・ladder.regulars | 新常客 | 本規格新寫 | `career.ui.ladder.regulars` |
| （畫面字）・ladder.outfit | 捏角色新服裝 | 本規格新寫 | `career.ui.ladder.outfit` |
| （畫面字）・drawRow | 每升一級：抽一張盤進唱片櫃（Lv10 起每 5 級史詩） | 本規格新寫 | `career.ui.drawRow` |

## 樂歷・關掉樂歷（Lv10 起、只在樂歷頁）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・off | 下一趟的樂歷 | 本規格新寫 | `career.ui.off` |
| （畫面字）・offSub | 關掉＝天賦、種子格、配件三選一、金邊全部回到新帳號。樂歷照拿。 | 本規格新寫 | `career.ui.offSub` |
| （畫面字）・offOn | 樂歷關 | 本規格新寫 | `career.ui.offOn` |
| （畫面字）・offBest | 關樂歷 | 本規格新寫 | `career.ui.offBest` |
| （畫面字）・offSw | 照用 | 本規格新寫 | `career.ui.offSw` |
| （畫面字）・offSwOn | 關掉 | 本規格新寫 | `career.ui.offSwOn` |

## 樂歷・標題第二行、唱片櫃頁頭

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・line | 樂歷 Lv {n}・下一個：Lv{m} {name} › | 本規格新寫 | `career.ui.line` |
| （畫面字）・lineAll | 樂歷 Lv {n} › | 本規格新寫 | `career.ui.lineAll` |
| （畫面字）・lineShort | 樂歷 Lv {n} › | 本規格新寫 | `career.ui.lineShort` |
| （畫面字）・shelfBtn | 樂歷 | 本規格新寫 | `career.ui.shelfBtn` |
| （畫面字）・bestTier | 最遠 {n}（第 {k} 階 {m}） | 本規格新寫 | `career.ui.bestTier` |

## 樂歷・結算頁那一行＋明細

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・endLine | 樂歷 +{n} › | 本規格新寫 | `career.ui.endLine` |
| （畫面字）・tierPre | 第 {k} 階・ | 本規格新寫 | `career.ui.tierPre` |
| （畫面字）・partPos | 走了 {k} 位 +{n} | 本規格新寫 | `career.ui.partPos` |
| （畫面字）・partStreak | 最多連贏 {k} 場 +{n} | 本規格新寫 | `career.ui.partStreak` |
| （畫面字）・partRecord | 破紀錄 +{n} | 本規格新寫 | `career.ui.partRecord` |
| （畫面字）・partRoute | 路線 +{n} | 本規格新寫 | `career.ui.partRoute` |
| （畫面字）・partCut | （已到上限） | 本規格新寫 | `career.ui.partCut` |
| （畫面字）・partTier | ×{m} 第 {k} 階 | 本規格新寫 | `career.ui.partTier` |
| （畫面字）・partLow | 還沒走到第 {n} 位：樂歷 ×{m} | 本規格新寫 | `career.ui.partLow` |
| （畫面字）・partProf | {title} 蓋了 {n} 個章 | 本規格新寫 | `career.ui.partProf` |
| （畫面字）・partOff | 這一趟關樂歷（樂歷照拿） | 本規格新寫 | `career.ui.partOff` |
| （畫面字）・routeCap | 路線樂歷已到上限 | 本規格新寫 | `career.ui.routeCap` |
| （畫面字）・gainTitle | 這一趟的樂歷 +{n} | 本規格新寫 | `career.ui.gainTitle` |
| （畫面字）・toPage | 看樂歷頁 › | 本規格新寫 | `career.ui.toPage` |
| （畫面字）・partFirst | 第一趟：樂歷保底到 Lv {n} | 本規格新寫 | `career.ui.partFirst` |

## 樂歷・過場卡（結算主鈕之後、開機入帳之後；一次一張，一次升兩級以上合成一張清單卡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・lvUp | 樂歷 Lv {n}！天賦點 +1 | 本規格新寫 | `career.ui.lvUp` |
| （畫面字）・drawGot | 抽到一張，收進唱片櫃 | 本規格新寫 | `career.ui.drawGot` |
| （畫面字）・ladderOpen | 開了：{name} | 本規格新寫 | `career.ui.ladderOpen` |
| （畫面字）・goTalent | 去點天賦 | 本規格新寫 | `career.ui.goTalent` |
| （畫面字）・profUp | {title} 熟練 Lv{n} | 本規格新寫 | `career.ui.profUp` |
| （畫面字）・cardNext | 繼續 | 本規格新寫 | `career.ui.cardNext` |
| （畫面字）・cardTap | 點一下看下一張 | 本規格新寫 | `career.ui.cardTap` |
| （畫面字）・lvList | 樂歷 Lv {n}！ | 本規格新寫 | `career.ui.lvList` |
| （畫面字）・lvNew | 開了：{list} | 本規格新寫 | `career.ui.lvNew` |
| （畫面字）・lvPts | 天賦點 +{n} | 本規格新寫 | `career.ui.lvPts` |
| （畫面字）・drawGotN | 抽到 {n} 張，收進唱片櫃 | 本規格新寫 | `career.ui.drawGotN` |

## 樂歷・開機入帳的吐司（C 波記的樂歷）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・depositFirst | 老闆：你之前的樂歷我都記著呢。樂歷 +{n}，升到 Lv {to}。 | 本規格新寫 | `career.ui.depositFirst` |
| 老闆・depositMore | 老闆：上次的樂歷補記給你。樂歷 +{n}。 | 本規格新寫 | `career.ui.depositMore` |

## 樂歷・演唱會買票面板

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・gigRoom | 每張樂歷 +{per}・這一趟還能算 {n} 張（越往後走越多） | 本規格新寫 | `career.ui.gigRoom` |
| （畫面字）・gigFull | 這一趟的演唱會樂歷已到上限，買票只算聽歌 | 本規格新寫 | `career.ui.gigFull` |

## 樂歷・來客條說情、備用說情

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・pleaLeft | 說情剩 {n} | 本規格新寫 | `career.ui.pleaLeft` |
| （畫面字）・pleaSpare | ・備用 {n} | 本規格新寫 | `career.ui.pleaSpare` |
| （畫面字）・pleaMenu | ▶ 再一場（用掉備用說情） | 本規格新寫 | `career.ui.pleaMenu` |

## 樂歷・唱片櫃來源

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・srcLexp | 樂歷抽到的 | 本規格新寫 | `career.ui.srcLexp` |

## 樂歷・攤位頂列細條（一趟裡就看得到樂歷漲；第 I 波 I-0）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・live | 樂歷 這一趟 至少 +{n} | 本規格新寫 | `career.ui.live` |
| （畫面字）・liveUp | 樂歷 Lv {n}！這一趟結束就能點天賦 | 本規格新寫 | `career.ui.liveUp` |
| （畫面字）・liveLv | Lv {n} | 本規格新寫 | `career.ui.liveLv` |

## 樂歷・開機補級吐司（曲線改了；第 I 波 I-0）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・recurve | 樂歷算法改了，補你 {n} 級。 | 本規格新寫 | `career.ui.recurve` |

## 流派・第一次挑派的新手推薦標

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・pearl | 新手推薦 | 本規格新寫 | `aceNewbie.pearl` |
| （畫面字）・hall | 前期較難 | 本規格新寫 | `aceNewbie.hall` |

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
| （畫面字）・toBreak | 差 {n} 位破紀錄 | 本規格新寫 | `summary.toBreak` |
| （畫面字）・closeHp | 他只剩 {n} 聲望 | 本規格新寫 | `summary.closeHp` |
| （畫面字）・flipBy | 第 {k} 手被{e}剋{p}翻盤 | 本規格新寫 | `summary.flipBy` |
| （畫面字）・flipAt | 第 {k} 手被他翻盤 | 本規格新寫 | `summary.flipAt` |

## 頻率・唱片資訊「頻率 ● 暴躁」、客人資訊「常聽 ● 暴躁」、提示籤前的圓點（讀屏）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・label | 頻率 | 本規格新寫 | `tunes.label` |
| （畫面字）・guest | 常聽 | 本規格新寫 | `tunes.guest` |
| （畫面字）・guestAria | 常聽頻率：{name} | 本規格新寫 | `tunes.guestAria` |

## 頻率・八格的名字（抄主站頻率光譜；改名要兩邊一起改）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・calm | 放鬆 | 本規格新寫 | `tunes.names.calm` |
| （畫面字）・still | 平靜 | 本規格新寫 | `tunes.names.still` |
| （畫面字）・languid | 恍惚 | 本規格新寫 | `tunes.names.languid` |
| （畫面字）・decay | 頹靡 | 本規格新寫 | `tunes.names.decay` |
| （畫面字）・lift | 雀躍 | 本規格新寫 | `tunes.names.lift` |
| （畫面字）・crisp | 冷冽 | 本規格新寫 | `tunes.names.crisp` |
| （畫面字）・boil | 沸騰 | 本規格新寫 | `tunes.names.boil` |
| （畫面字）・charge | 暴躁 | 本規格新寫 | `tunes.names.charge` |

## 收音機・轉頻率（兩位客人之間、每輪一次；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 收音機 | 本規格新寫 | `radio.title` |
| （畫面字）・prompt | 轉一個頻率，抽一張放進這一輪的特價箱。 | 本規格新寫 | `radio.prompt` |
| （畫面字）・price | 電台那張照原價。 | 本規格新寫 | `radio.price` |
| （畫面字）・got | 特價箱多了一張《{album}》。 | 本規格新寫 | `radio.got` |
| （畫面字）・used | 這一輪已經轉過了。 | 本規格新寫 | `radio.used` |
| （畫面字）・usedSub | 這一輪轉到{name}：《{album}》 | 本規格新寫 | `radio.usedSub` |
| （畫面字）・empty | 這個頻率抽不到唱片了。 | 本規格新寫 | `radio.empty` |
| （畫面字）・later | 兩位客人之間才能轉。 | 本規格新寫 | `radio.later` |
| （畫面字）・tag | 電台 | 本規格新寫 | `radio.tag` |
| （畫面字）・toBargain | 去特價箱看看 | 本規格新寫 | `radio.toBargain` |
| （畫面字）・bagged | 已經收進包包了。 | 本規格新寫 | `radio.bagged` |
| （畫面字）・gone | 已經不在特價箱了。 | 本規格新寫 | `radio.gone` |

## 背景音樂・收音機旁「正在播放」泡泡與 ♪（點我放歌：這次造訪還沒點過畫面才出）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・np | 正在播放 | 本規格新寫 | `bgm.ui.np` |
| （畫面字）・tapPlay | 點我放歌 | 本規格新寫 | `bgm.ui.tapPlay` |
| （畫面字）・icon | 正在播放的歌 | 本規格新寫 | `bgm.ui.icon` |

## 背景音樂・⏸ 選單「聲音」下面三行與說明小字

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・bgm | 背景音樂 | 本規格新寫 | `bgm.ui.bgm` |
| （畫面字）・vol | 音樂音量 | 本規格新寫 | `bgm.ui.vol` |
| （畫面字）・src | 背景音樂放 | 本規格新寫 | `bgm.ui.src` |
| （畫面字）・srcBag | 包包 | 本規格新寫 | `bgm.ui.srcBag` |
| （畫面字）・srcBoth | 包包＋唱片櫃 | 本規格新寫 | `bgm.ui.srcBoth` |
| （畫面字）・note | 每首約 1 MB；行動網路只重播已下載的。 | 本規格新寫 | `bgm.ui.note` |

## 背景音樂・⏸ 音樂音量 小／中／大

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・volNames[0] | 小 | 本規格新寫 | `bgm.ui.volNames[0]` |
| （畫面字）・volNames[1] | 中 | 本規格新寫 | `bgm.ui.volNames[1]` |
| （畫面字）・volNames[2] | 大 | 本規格新寫 | `bgm.ui.volNames[2]` |

## 頂點卡試做・殿堂的王牌能力（能力名・時機：說明；挑王牌面板 5×3 的順序；?apex=1）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Radiohead《OK Computer》・text | 安全氣囊・這手：氣囊救了你一命：回 2 聲望。 | 本規格新寫 | `apexTrial.hall[0].text` |
| Glenn Gould《Bach: The Goldberg Variations (1955)》・text | 三十段變奏・整場：一段詠嘆調變三十次：這場比星多算 1。 | 本規格新寫 | `apexTrial.hall[1].text` |
| Miles Davis《Kind of Blue》・text | 那又怎樣・這手：比輸了又怎樣：這手比星輸了不扣。 | 本規格新寫 | `apexTrial.hall[2].text` |
| The Beatles《Abbey Road》・text | 扛起重擔・整場：這場比星多算 1，被剋少扣 1。 | 本規格新寫 | `apexTrial.hall[3].text` |
| Pink Floyd《The Dark Side of the Moon》・text | 我們與他們・這手：正面比個高下：這手比星多算 3。 | 本規格新寫 | `apexTrial.hall[4].text` |
| Bob Marley & The Wailers《Exodus》・text | 調暗燈光・這手：燈光調暗一點：這手他的唱片少 1 星。 | 本規格新寫 | `apexTrial.hall[5].text` |
| 大滝詠一《A Long Vacation》・text | 夏日音牆・這手：音牆疊得厚：這手比星多算 3。 | 本規格新寫 | `apexTrial.hall[6].text` |
| Michael Jackson《Thriller》・text | 史上最暢銷・這手：名盤份量最重：這手你的唱片 +1 星。 | 本規格新寫 | `apexTrial.hall[7].text` |
| 鄧麗君 Teresa Teng《淡淡幽情》・text | 但願人長久・留著：留著：被剋少扣 1；發動：這手他少 1 星。 | 本規格新寫 | `apexTrial.hall[8].text` |
| 張雨生《口是心非》・text | 口是心非・這手：他說的不算：這手比星多算 3，輸了不扣。 | 本規格新寫 | `apexTrial.hall[9].text` |
| Guru《Jazzmatazz, Vol. 1》・text | 真人進棚・留著：留著：同色同星扣他 1；發動：這手比星多算 3。 | 本規格新寫 | `apexTrial.hall[10].text` |
| Daft Punk《Discovery》・text | 更快更強・整場：更硬更好更快更強：這場比星多算 1。 | 本規格新寫 | `apexTrial.hall[11].text` |
| Slum Village《Fan-Tas-Tic, Volume 1》・text | 錯開的拍子・這手：拍子故意錯開：這手他的唱片少 1 星。 | 本規格新寫 | `apexTrial.hall[12].text` |
| Art Blakey and the Jazz Messengers《Moanin'》・text | 雷鳴滾奏・整場：鼓聲一路推到底：這場比星多算 1。 | 本規格新寫 | `apexTrial.hall[13].text` |
| 濁水溪公社《台客的復仇》・text | 台客的復仇・這手：台客回來討公道：這手他的唱片少 1 星。 | 本規格新寫 | `apexTrial.hall[14].text` |

## 頂點卡試做・流亡的王牌能力（能力名・時機：說明；挑王牌面板 5×3 的順序；?apex=1）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Zodiac》・text | 黃道借星・整場：借他的星：這場你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[0].text` |
| Beyond《再見理想》・text | 自掏腰包・整場：硬碰大牌：這場你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[1].text` |
| Harry Roesli《Ken Arok》・text | 草莽稱王・整場：草莽挑王：這場你剋他，他高你 3 星以上才剋不動。 | 本規格新寫 | `apexTrial.pearl[2].text` |
| 生活向上委員会《生活向上委員会ニューヨーク支部》・text | 紐約支部・整場：闖蕩紐約：這場你剋他，他高你 3 星以上才剋不動。 | 本規格新寫 | `apexTrial.pearl[3].text` |
| 灰野敬二《滲有無》・text | 滲透・整場：滲過去：這場你剋他，他高你 3 星以上才剋不動。 | 本規格新寫 | `apexTrial.pearl[4].text` |
| 楊祖珺《楊祖珺》・text | 禁不掉・整場：禁不掉：這場你剋他，他高你 3 星以上才剋不動。 | 本規格新寫 | `apexTrial.pearl[5].text` |
| 嘉手苅林昌《嘉手苅林昌》・text | 島唄之神・整場：老神在在：這場你剋他，他高你 3 星以上才剋不動。 | 本規格新寫 | `apexTrial.pearl[6].text` |
| モア《モア》・text | 祭典之歌・整場：這場被剋時，扣你的星有一半彈回去扣他。 | 本規格新寫 | `apexTrial.pearl[7].text` |
| 小久保隆《Get at the Wave》・text | 浪打回頭・整場：這場被剋時，扣你的星有一半彈回去扣他。 | 本規格新寫 | `apexTrial.pearl[8].text` |
| Derek Bailey《Solo Guitar Volume 1》・text | 一把吉他・這手：一把吉他：這手你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[9].text` |
| Gorilla Biscuits《demo 1987》・text | 一卷 demo・這手：這手你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[10].text` |
| 高柳昌行《Eclipse/侵蝕》・text | 侵蝕・這手：以彼之道：這手你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[11].text` |
| 1976《Late Summer of 1976 不插電現場實況》・text | 不插電・這手：拔掉插頭：這手你剋他一律剋得動，扣你我較大的星數。 | 本規格新寫 | `apexTrial.pearl[12].text` |
| Black Renaissance《Body, Mind and Spirit》・text | 身心靈・這手：身心靈都養回來：回 2 聲望。 | 本規格新寫 | `apexTrial.pearl[13].text` |
| Alton Ellis《A New Day》・text | 新的一天・這手：新的一天重新站起來：回 2 聲望。 | 本規格新寫 | `apexTrial.pearl[14].text` |

## 頂點卡試做・異端的王牌能力（能力名・時機：說明；挑王牌面板 5×3 的順序；?apex=1）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Swans《Filth》・text | 揭穿髒招・整場：唬人是髒招：這場抓到他唬你，扣加倍。 | 本規格新寫 | `apexTrial.heresy[0].text` |
| Ornette Coleman《Free Jazz: A Collective Improvisation》・text | 雙四重奏・整場：兩組四重奏齊上：這場抓到他唬你，扣加倍。 | 本規格新寫 | `apexTrial.heresy[1].text` |
| Captain Beefheart & His Magic Band《Trout Mask Replica》・text | 撕下面具・整場：面具撕下來：這場抓到他唬你，扣加倍。 | 本規格新寫 | `apexTrial.heresy[2].text` |
| Discharge《Hear Nothing See Nothing Say Nothing》・text | 什麼都不聽・整場：他說的都不聽：這場抓到他唬你，扣三倍。 | 本規格新寫 | `apexTrial.heresy[3].text` |
| Lou Reed《Metal Machine Music》・text | 四面回授・整場：回授：這場抓到他唬你，扣到的一半回你聲望。 | 本規格新寫 | `apexTrial.heresy[4].text` |
| Throbbing Gristle《The Second Annual Report》・text | 年度結算・整場：對帳：這場抓到他唬你，扣到的一半回你聲望。 | 本規格新寫 | `apexTrial.heresy[5].text` |
| Alvin Lucier《I Am Sitting in a Room》・text | 一遍又一遍・整場：一遍遍錄回來：這場抓到他唬你，扣到的一半回你聲望。 | 本規格新寫 | `apexTrial.heresy[6].text` |
| Les Rallizes Dénudés《'77 Live》・text | 赤裸裸・這手：剝個精光：照出這手提示是真話還是唬人。 | 本規格新寫 | `apexTrial.heresy[7].text` |
| Ryoji Ikeda《+/-》・text | 正負號・這手：非正即負：照出這手提示是真話還是唬人。 | 本規格新寫 | `apexTrial.heresy[8].text` |
| 非常階段《蔵六の奇病》・text | 逃生梯・這手：先走逃生梯：回 2 聲望。 | 本規格新寫 | `apexTrial.heresy[9].text` |
| Einstürzende Neubauten《Kollaps》・text | 一拆就塌・整場：謊話一拆就塌：這場抓到他唬你，扣加倍。 | 本規格新寫 | `apexTrial.heresy[10].text` |
| 零與聲音解放組織《Z.S.L.O.》・text | 往零推・這手：往零推一格：這手他的唱片少 1 星。 | 本規格新寫 | `apexTrial.heresy[11].text` |
| Sunn O)))《Black One》・text | 低頻壓頂・這手：低頻壓下來：這手他的唱片少 1 星。 | 本規格新寫 | `apexTrial.heresy[12].text` |
| Napalm Death《Scum》・text | 一秒鐘・這手：一秒就結束：這手抓到他唬你，扣三倍。 | 本規格新寫 | `apexTrial.heresy[13].text` |
| Peter Brötzmann《Machine Gun》・text | 機關槍・留著：留著：剋中多扣 1；發動：這手抓到他唬你扣三倍。 | 本規格新寫 | `apexTrial.heresy[14].text` |

## 頂點卡試做・畫面字（王牌格、能力框、挑王牌面板、看穿的章；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・slot | 王牌 | 本規格新寫 | `apexTrial.ui.slot` |
| （畫面字）・use | 發動 | 本規格新寫 | `apexTrial.ui.use` |
| （畫面字）・used | 用過 | 本規格新寫 | `apexTrial.ui.used` |
| （畫面字）・usedNote | 這場用過了 | 本規格新寫 | `apexTrial.ui.usedNote` |
| （畫面字）・noStar | 王牌不比星。 | 本規格新寫 | `apexTrial.ui.noStar` |
| （畫面字）・hand | 這手 | 本規格新寫 | `apexTrial.ui.timing.hand` |
| （畫面字）・duel | 整場 | 本規格新寫 | `apexTrial.ui.timing.duel` |
| （畫面字）・hold | 留著 | 本規格新寫 | `apexTrial.ui.timing.hold` |
| （畫面字）・rule | 你的王牌不比星，每場發動一次；客人的照舊 7 星。 | 本規格新寫 | `apexTrial.ui.rule` |
| （畫面字）・intro | 「接下來，王牌不上場比星，改成一場幫你一次。」 | 本規格新寫 | `apexTrial.ui.intro` |
| （畫面字）・pickTitle | 「這派的王牌有十五張，挑一張帶著。」 | 本規格新寫 | `apexTrial.ui.pickTitle` |
| （畫面字）・pickGo | 就這張 | 本規格新寫 | `apexTrial.ui.pickGo` |
| （畫面字）・pickSame | 就帶這張 | 本規格新寫 | `apexTrial.ui.pickSame` |
| （畫面字）・pickLine | {name}・{timing}：{text} | 本規格新寫 | `apexTrial.ui.pickLine` |
| （畫面字）・infoTitle | 王牌能力 | 本規格新寫 | `apexTrial.ui.infoTitle` |
| （畫面字）・revealHonest | 真話 | 本規格新寫 | `apexTrial.ui.revealHonest` |
| （畫面字）・revealBluff | 唬人！ | 本規格新寫 | `apexTrial.ui.revealBluff` |
| （畫面字）・fired | 王牌《{album}》：{name} | 本規格新寫 | `apexTrial.ui.fired` |
| （畫面字）・healToast | 聲望 +{n} | 本規格新寫 | `apexTrial.ui.healToast` |
| （畫面字）・rulesFoot | 你開局 {hp} 聲望（升級會加），打贏回 {heal}；客人 {normal}、傳說藏家 {boss}。 | 本規格新寫 | `apexTrial.ui.rulesFoot` |
| （畫面字）・tag | 頂點卡試做 | 本規格新寫 | `apexTrial.ui.tag` |
| （畫面字）・tutNote | 教學這場王牌照舊 7 星，之後改當輔助卡。 | 本規格新寫 | `apexTrial.ui.tutNote` |
| （畫面字）・full | 聲望是滿的，掉了再用。 | 本規格新寫 | `apexTrial.ui.full` |
| （畫面字）・hitBoth | 你 −{p}，他 −{e} | 本規格新寫 | `apexTrial.ui.hitBoth` |
| （畫面字）・loseFree | 你輸了，但不扣。 | 本規格新寫 | `apexTrial.ui.loseFree` |
| （畫面字）・eAceNote | 他的王牌照舊 7 星 | 本規格新寫 | `apexTrial.ui.eAceNote` |
| （畫面字）・skip | 跳過序章，直接開打 ▸ | 本規格新寫 | `apexTrial.ui.skip` |
| （畫面字）・skipSub | 輔助卡試做・挑一張王牌就開始 | 本規格新寫 | `apexTrial.ui.skipSub` |
| （畫面字）・skipAgain | 再按一次：放棄這一趟、直接開打 | 本規格新寫 | `apexTrial.ui.skipAgain` |
| （畫面字）・skipSubFirst | 輔助卡試做・先挑你的初始流派 | 本規格新寫 | `apexTrial.ui.skipSubFirst` |
| （畫面字）・got | 已收 {n}／{total} | 本規格新寫 | `apexTrial.ui.got` |
| （畫面字）・notYet | 還沒收到 | 本規格新寫 | `apexTrial.ui.notYet` |
| （畫面字）・lockCard | 打倒傳說藏家收集 | 本規格新寫 | `apexTrial.ui.lockCard` |
| （畫面字）・lockNote | 有鎖的還沒收到：打倒傳說藏家收集 | 本規格新寫 | `apexTrial.ui.lockNote` |
| （畫面字）・pickKeep | 還是帶《{album}》 | 本規格新寫 | `apexTrial.ui.pickKeep` |
| （畫面字）・gotNew | 收進唱片櫃，下一趟開局可以換 | 本規格新寫 | `apexTrial.ui.gotNew` |
| （畫面字）・noneMore | 還沒收到別張王牌 | 本規格新寫 | `apexTrial.ui.noneMore` |

## 頂點卡試做・一次性老闆小提示（第一次看到能力框／第一次「沒作用」）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・tip_apex | 王牌一場發動一次，不佔這一手。 | 本規格新寫 | `apexTrial.tips.tip_apex` |
| 老闆・tip_apexMiss | 王牌要碰到條件才有用。 | 本規格新寫 | `apexTrial.tips.tip_apexMiss` |

## 頂點卡試做・結果行補的一句（{d}＝這手王牌替你多賺／少扣幾點、{h}＝回幾聲望、{name}＝能力名）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・heal | 王牌：回 {d} 聲望 | 本規格新寫 | `apexTrial.notes.heal` |
| （畫面字）・star | 王牌：你 +1 星，多賺 {d} | 本規格新寫 | `apexTrial.notes.star` |
| （畫面字）・eStar | 王牌：他少 1 星，多賺 {d} | 本規格新寫 | `apexTrial.notes.eStar` |
| （畫面字）・mirrorPlus | 王牌：比星多算，多賺 {d} | 本規格新寫 | `apexTrial.notes.mirrorPlus` |
| （畫面字）・loseZero | 王牌：比星輸了不扣，少扣 {d} | 本規格新寫 | `apexTrial.notes.loseZero` |
| （畫面字）・tieWin | 王牌：同色同星，他 −{d} | 本規格新寫 | `apexTrial.notes.tieWin` |
| （畫面字）・shield | 王牌：被剋少扣 {d} | 本規格新寫 | `apexTrial.notes.shield` |
| （畫面字）・halfIn | 王牌：被剋減半，少扣 {d} | 本規格新寫 | `apexTrial.notes.halfIn` |
| （畫面字）・theirStar | 王牌：以小搏大，多賺 {d} | 本規格新寫 | `apexTrial.notes.theirStar` |
| （畫面字）・pThr | 王牌：剋得動了，多賺 {d} | 本規格新寫 | `apexTrial.notes.pThr` |
| （畫面字）・bounce | 王牌：彈回去 {d} | 本規格新寫 | `apexTrial.notes.bounce` |
| （畫面字）・crit | 王牌：拆穿！多扣 {d} | 本規格新寫 | `apexTrial.notes.crit` |
| （畫面字）・critLeech | 王牌：拆穿！多扣 {d}，回 {h} 聲望 | 本規格新寫 | `apexTrial.notes.critLeech` |
| （畫面字）・leech | 王牌：拆穿！回 {h} 聲望 | 本規格新寫 | `apexTrial.notes.leech` |
| （畫面字）・leechFull | 王牌：拆穿！聲望是滿的，沒回到 | 本規格新寫 | `apexTrial.notes.leechFull` |
| （畫面字）・counterPlus | 王牌：剋中多扣 {d} | 本規格新寫 | `apexTrial.notes.counterPlus` |
| （畫面字）・counterMult | 王牌：剋中加倍，多扣 {d} | 本規格新寫 | `apexTrial.notes.counterMult` |
| （畫面字）・combo | 王牌：{name}，多賺 {d} | 本規格新寫 | `apexTrial.notes.combo` |
| （畫面字）・none | 王牌：這手沒碰到，沒作用 | 本規格新寫 | `apexTrial.notes.none` |
| （畫面字）・noneHonest | 王牌：他這手沒唬你，沒作用 | 本規格新寫 | `apexTrial.notes.noneHonest` |
| （畫面字）・shield | 王牌（留著）：被剋少扣 {d} | 本規格新寫 | `apexTrial.holdNotes.shield` |
| （畫面字）・tieWin | 王牌（留著）：同色同星，他 −{d} | 本規格新寫 | `apexTrial.holdNotes.tieWin` |
| （畫面字）・counterPlus | 王牌（留著）：剋中多扣 {d} | 本規格新寫 | `apexTrial.holdNotes.counterPlus` |

## 翻面・畫面字（王牌格的籤、結果句小字、頭上小章、吐司、領獎小字、規則卡、紀錄的章；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・name | 翻面 | 本規格新寫 | `encore.ui.name` |
| （畫面字）・caught | 看穿他一次 | 本規格新寫 | `encore.ui.when.caught` |
| （畫面字）・combo2 | 連剋兩手 | 本規格新寫 | `encore.ui.when.combo2` |
| （畫面字）・sameWin | 同色比贏一次 | 本規格新寫 | `encore.ui.when.sameWin` |
| （畫面字）・lowhp | 聲望剩三成以下 | 本規格新寫 | `encore.ui.when.lowhp` |
| （畫面字）・again | 再發動一次 | 本規格新寫 | `encore.ui.give.again` |
| （畫面字）・ace | 王牌回到手上（{star} 星） | 本規格新寫 | `encore.ui.give.ace` |
| （畫面字）・star | 下一手 +{n} 星 | 本規格新寫 | `encore.ui.give.star` |
| （畫面字）・hit | 下一手剋中多扣 {n} | 本規格新寫 | `encore.ui.give.hit` |
| （畫面字）・heal | 回 {n} 聲望 | 本規格新寫 | `encore.ui.give.heal` |
| （畫面字）・tpl | 翻面：{when}，{give}。 | 本規格新寫 | `encore.ui.tpl` |
| （畫面字）・aceTpl | 翻面：丟出之後{when}，{give}。 | 本規格新寫 | `encore.ui.aceTpl` |
| （畫面字）・caught | 看穿 | 本規格新寫 | `encore.ui.tagWhen.caught` |
| （畫面字）・combo2 | 連剋 | 本規格新寫 | `encore.ui.tagWhen.combo2` |
| （畫面字）・sameWin | 同色贏 | 本規格新寫 | `encore.ui.tagWhen.sameWin` |
| （畫面字）・lowhp | 背水 | 本規格新寫 | `encore.ui.tagWhen.lowhp` |
| （畫面字）・again | 再一次 | 本規格新寫 | `encore.ui.tagGive.again` |
| （畫面字）・ace | 再丟 | 本規格新寫 | `encore.ui.tagGive.ace` |
| （畫面字）・star | +{n} 星 | 本規格新寫 | `encore.ui.tagGive.star` |
| （畫面字）・hit | 多扣 {n} | 本規格新寫 | `encore.ui.tagGive.hit` |
| （畫面字）・heal | 回 {n} | 本規格新寫 | `encore.ui.tagGive.heal` |
| （畫面字）・tag | {when}→{give} | 本規格新寫 | `encore.ui.tag` |
| （畫面字）・lit | 翻面！{give} | 本規格新寫 | `encore.ui.lit` |
| （畫面字）・litCarry | 翻面！留到下一位 | 本規格新寫 | `encore.ui.litCarry` |
| （畫面字）・toast | 翻面！《{album}》可以再{verb}一次 | 本規格新寫 | `encore.ui.toast` |
| （畫面字）・verbApex | 發動 | 本規格新寫 | `encore.ui.verbApex` |
| （畫面字）・verbAce | 丟 | 本規格新寫 | `encore.ui.verbAce` |
| （畫面字）・star | 下一手 +{n} 星 | 本規格新寫 | `encore.ui.next.star` |
| （畫面字）・hit | 下一手剋中多扣 {n} | 本規格新寫 | `encore.ui.next.hit` |
| （畫面字）・star | 翻面：+{n} 星 | 本規格新寫 | `encore.ui.note.star` |
| （畫面字）・hit | 翻面：剋中多扣 {n} | 本規格新寫 | `encore.ui.note.hit` |
| （畫面字）・healToast | 翻面：聲望 +{n} | 本規格新寫 | `encore.ui.healToast` |
| （畫面字）・carry | 翻面留到下一位 | 本規格新寫 | `encore.ui.carry` |
| （畫面字）・carryTag | 翻面×1 | 本規格新寫 | `encore.ui.carryTag` |
| （畫面字）・infoTitle | 王牌翻面 | 本規格新寫 | `encore.ui.infoTitle` |
| 老闆・first | 「看到沒？讀對了，唱片翻到 B 面再來一次。」 | 本規格新寫 | `encore.ui.first` |
| （畫面字）・ruleApex | 翻面：做到王牌下方籤上寫的條件，就有加成。 | 本規格新寫 | `encore.ui.ruleApex` |
| （畫面字）・ruleCarry | 剛好打完就留到下一位。 | 本規格新寫 | `encore.ui.ruleCarry` |
| （畫面字）・ruleHead | 翻面（例外） | 本規格新寫 | `encore.ui.ruleHead` |
| （畫面字）・exc | （翻面例外） | 本規格新寫 | `encore.ui.exc` |
| 老闆・tipAce | 王牌 7 星，一場用一次（翻面例外）。 | 本規格新寫 | `encore.ui.tipAce` |
| 老闆・tipApex | 王牌一場發動一次（翻面例外），不佔這手。 | 本規格新寫 | `encore.ui.tipApex` |
| （畫面字）・stamp | 翻面！ | 本規格新寫 | `encore.ui.stamp` |
| （畫面字）・recap | 翻面 | 本規格新寫 | `encore.ui.recap` |

## 翻面・三張 7 星王牌的說明句（挑王牌面板、唱片資訊）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 翻面：丟出之後看穿他一次，王牌回到手上（5 星）。 | 本規格新寫 | `encore.aces.hall` |
| （畫面字） | 翻面：丟出之後看穿他一次，王牌回到手上（5 星）。 | 本規格新寫 | `encore.aces.pearl` |
| （畫面字） | 翻面：丟出之後看穿他一次，王牌回到手上（5 星）。 | 本規格新寫 | `encore.aces.heresy` |

## 翻面・頂點卡的說明句（挑王牌面板、唱片資訊；家族預設或自己寫的 encore）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Radiohead《OK Computer》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[0]` |
| Glenn Gould《Bach: The Goldberg Variations (1955)》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[1]` |
| Miles Davis《Kind of Blue》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.hall[2]` |
| The Beatles《Abbey Road》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[3]` |
| Pink Floyd《The Dark Side of the Moon》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.hall[4]` |
| Bob Marley & The Wailers《Exodus》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[5]` |
| 大滝詠一《A Long Vacation》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.hall[6]` |
| Michael Jackson《Thriller》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[7]` |
| 鄧麗君 Teresa Teng《淡淡幽情》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[8]` |
| 張雨生《口是心非》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.hall[9]` |
| Guru《Jazzmatazz, Vol. 1》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.hall[10]` |
| Daft Punk《Discovery》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[11]` |
| Slum Village《Fan-Tas-Tic, Volume 1》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[12]` |
| Art Blakey and the Jazz Messengers《Moanin'》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[13]` |
| 濁水溪公社《台客的復仇》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.hall[14]` |
| Barney Wilen《Zodiac》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[0]` |
| Beyond《再見理想》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[1]` |
| Harry Roesli《Ken Arok》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[2]` |
| 生活向上委員会《生活向上委員会ニューヨーク支部》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[3]` |
| 灰野敬二《滲有無》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[4]` |
| 楊祖珺《楊祖珺》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[5]` |
| 嘉手苅林昌《嘉手苅林昌》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[6]` |
| モア《モア》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[7]` |
| 小久保隆《Get at the Wave》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[8]` |
| Derek Bailey《Solo Guitar Volume 1》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.pearl[9]` |
| Gorilla Biscuits《demo 1987》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.pearl[10]` |
| 高柳昌行《Eclipse/侵蝕》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.pearl[11]` |
| 1976《Late Summer of 1976 不插電現場實況》 | 翻面：看穿他一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.pearl[12]` |
| Black Renaissance《Body, Mind and Spirit》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[13]` |
| Alton Ellis《A New Day》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.pearl[14]` |
| Swans《Filth》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[0]` |
| Ornette Coleman《Free Jazz: A Collective Improvisation》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[1]` |
| Captain Beefheart & His Magic Band《Trout Mask Replica》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[2]` |
| Discharge《Hear Nothing See Nothing Say Nothing》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[3]` |
| Lou Reed《Metal Machine Music》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[4]` |
| Throbbing Gristle《The Second Annual Report》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[5]` |
| Alvin Lucier《I Am Sitting in a Room》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[6]` |
| Les Rallizes Dénudés《'77 Live》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[7]` |
| Ryoji Ikeda《+/-》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[8]` |
| 非常階段《蔵六の奇病》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[9]` |
| Einstürzende Neubauten《Kollaps》 | 翻面：看穿他一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[10]` |
| 零與聲音解放組織《Z.S.L.O.》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[11]` |
| Sunn O)))《Black One》 | 翻面：同色比贏一次，下一手剋中多扣 1。 | 本規格新寫 | `encore.apexTrial.heresy[12]` |
| Napalm Death《Scum》 | 翻面：同色比贏一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.heresy[13]` |
| Peter Brötzmann《Machine Gun》 | 翻面：同色比贏一次，再發動一次。 | 本規格新寫 | `encore.apexTrial.heresy[14]` |

## 上場・畫面字（上場面板、來客畫面上場列、包包、戰利品列、吐司、規則卡；{n}{album} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・title | 這一輪挑 {n} 張上場 | 本規格新寫 | `lineup.ui.title` |
| （畫面字）・guests | 這一輪的客人 | 本規格新寫 | `lineup.ui.guests` |
| （畫面字）・auto | 幫我挑 | 本規格新寫 | `lineup.ui.auto` |
| （畫面字）・go | 就這五張 | 本規格新寫 | `lineup.ui.go` |
| （畫面字）・slot | 上場 | 本規格新寫 | `lineup.ui.slot` |
| （畫面字）・bench | 替補 | 本規格新寫 | `lineup.ui.bench` |
| （畫面字）・empty | 空著 | 本規格新寫 | `lineup.ui.empty` |
| （畫面字）・onTag | 上場 | 本規格新寫 | `lineup.ui.onTag` |
| （畫面字）・newTag | 新 | 本規格新寫 | `lineup.ui.newTag` |
| （畫面字）・bagBtn | 包包 {n} | 本規格新寫 | `lineup.ui.bagBtn` |
| （畫面字）・benchHint | 上場那張聽膩了，替補會自動頂上 | 本規格新寫 | `lineup.ui.benchHint` |
| （畫面字）・benchHintSwap | 開打前可以拿替補換掉一張 | 本規格新寫 | `lineup.ui.benchHintSwap` |
| （畫面字）・benchPick | 換下哪一張？ | 本規格新寫 | `lineup.ui.benchPick` |
| （畫面字）・swapIn | 換上場 | 本規格新寫 | `lineup.ui.swapIn` |
| （畫面字）・swapWhich | 換掉哪一張？ | 本規格新寫 | `lineup.ui.swapWhich` |
| （畫面字）・swapNo | 先放包包 | 本規格新寫 | `lineup.ui.swapNo` |
| （畫面字）・swapped | 《{album}》換上場 | 本規格新寫 | `lineup.ui.swapped` |
| （畫面字）・pickHint | 點包包換上場：先點一格就換那格，沒點換最弱的 | 本規格新寫 | `lineup.ui.pickHint` |
| （畫面字）・due | 上場少一張，挑一張補上 | 本規格新寫 | `lineup.ui.due` |
| （畫面字）・quiet | 包包沒有新的，這一輪的五張幫你挑好了 | 本規格新寫 | `lineup.ui.quiet` |
| （畫面字）・benchIn | 《{out}》聽膩了，替補《{album}》頂上 | 本規格新寫 | `lineup.ui.benchIn` |
| 老闆・first | 包包越來越厚了，這一輪挑五張上場。聽膩的換下來休息一輪就好。 | 本規格新寫 | `lineup.ui.first` |
| （畫面字）・rule | 第 4 輪起每輪挑五張上場； | 本規格新寫 | `lineup.ui.rule` |
| （畫面字）・firstLoot | 包包多一張不會稀釋，下一輪可以挑它上場。不收也有 ${n}。 | 本規格新寫 | `lineup.ui.firstLoot` |
| （畫面字）・upHint | 比你上場最弱那張強 | 本規格新寫 | `lineup.ui.upHint` |

## 耐聽・畫面字（耐聽點的讀屏字、手牌記號、休息中、領獎小字、規則卡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・ear | 耐聽 {n}／{max} | 本規格新寫 | `wear.ui.ear` |
| （畫面字）・almost | 再一次就膩 | 本規格新寫 | `wear.ui.almost` |
| （畫面字）・worn | 聽膩 −{n} | 本規格新寫 | `wear.ui.worn` |
| （畫面字）・resting | 休息中・下一輪回滿 | 本規格新寫 | `wear.ui.resting` |
| （畫面字）・got | 《{album}》聽膩了（−{n}），下一輪換下來休息就好 | 本規格新寫 | `wear.ui.got` |
| （畫面字）・gotShort | 《{album}》聽膩了（−{n}） | 本規格新寫 | `wear.ui.gotShort` |
| 老闆・first | 這張你最近很常放，有點聽膩了。換下來休息一輪就好。 | 本規格新寫 | `wear.ui.first` |
| （畫面字）・rule | 出 5 次聽膩 −1 星，休一輪回滿。 | 本規格新寫 | `wear.ui.rule` |

## 活店・小魚・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-hello-01 | 你也常來？我叫小魚。／我下課就來這裡報到。 | 本規格新寫 | `chat.xiaoyu-hello-01` |

## 活店・小魚・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-again-01 | 又遇到你了！今天也是下課就跑來。 | 本規格新寫 | `chat.xiaoyu-again-01` |
| 小魚・xiaoyu-again-02 | 欸，是你！我剛好有事想問你。／……算了，我忘記要問什麼了。 | 本規格新寫 | `chat.xiaoyu-again-02` |
| 小魚・xiaoyu-again-03 | 你來啦，我今天一進門就先衝試聽桌。 | 本規格新寫 | `chat.xiaoyu-again-03` |
| 小魚・xiaoyu-again-04 | 嗨！我上完早八就來了，眼睛還沒醒。 | 本規格新寫 | `chat.xiaoyu-again-04` |
| 小魚・xiaoyu-again-05 | 你也在！那我翻慢一點，等等找你講話。 | 本規格新寫 | `chat.xiaoyu-again-05` |
| 小魚・xiaoyu-again-06 | 哈囉，今天沒課，我可以待久一點。 | 本規格新寫 | `chat.xiaoyu-again-06` |

## 活店・小魚・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-chat-01 | 我跟自己說今天只看不買，結果手上已經兩張了。 | 本規格新寫 | `chat.xiaoyu-chat-01` |
| 小魚・xiaoyu-chat-02 | 我的唱盤是學長畢業留給我的，聲音小小的但很可愛。 | 本規格新寫 | `chat.xiaoyu-chat-02` |
| 小魚・xiaoyu-chat-03 | 室友說黑膠很麻煩，可是放唱針那一下我好喜歡。 | 本規格新寫 | `chat.xiaoyu-chat-03` |
| 小魚・xiaoyu-chat-04 | 打工的錢一半都花在這裡，我媽不知道。 | 本規格新寫 | `chat.xiaoyu-chat-04` |
| 小魚・xiaoyu-chat-05 | 你第一次買黑膠是買哪一張？我好好奇。 | 本規格新寫 | `chat.xiaoyu-chat-05` |
| 小魚・xiaoyu-chat-06 | 我宿舍桌上只放得下唱盤，書都堆到地上了。 | 本規格新寫 | `chat.xiaoyu-chat-06` |
| 小魚・xiaoyu-chat-07 | 封面好看的我都會先拿起來，不管聽不聽得懂。 | 本規格新寫 | `chat.xiaoyu-chat-07` |
| 小魚・xiaoyu-chat-08 | 聽黑膠要起來翻面，我覺得這樣反而比較專心。 | 本規格新寫 | `chat.xiaoyu-chat-08` |
| 小魚・xiaoyu-chat-09 | 我最近愛上那種聽起來像夏天傍晚的歌。 | 本規格新寫 | `chat.xiaoyu-chat-09` |
| 小魚・xiaoyu-chat-10 | 上課聽不下去的時候，我就在腦中排等等要翻哪幾箱。 | 本規格新寫 | `chat.xiaoyu-chat-10` |
| 小魚・xiaoyu-chat-11 | 同學都用手機聽歌，只有我抱著唱片搭捷運。 | 本規格新寫 | `chat.xiaoyu-chat-11` |
| 小魚・xiaoyu-chat-12 | 我還分不太出來好壞，只知道聽了會不會想哭。 | 本規格新寫 | `chat.xiaoyu-chat-12` |

## 活店・小魚・挖寶

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-dig-01 | 翻到第三輪才看到想要的，那種最爽。 | 本規格新寫 | `chat.xiaoyu-dig-01` |
| 小魚・xiaoyu-dig-02 | 我翻箱子好慢，因為每張封面都想看。 | 本規格新寫 | `chat.xiaoyu-dig-02` |
| 小魚・xiaoyu-dig-03 | 剛剛翻到一張封面是貓的，差點就買了。 | 本規格新寫 | `chat.xiaoyu-dig-03` |
| 小魚・xiaoyu-dig-04 | 每次翻到手指黑黑的，就覺得自己有認真挖。 | 本規格新寫 | `chat.xiaoyu-dig-04` |
| 小魚・xiaoyu-dig-05 | 我有個習慣，每一箱都要翻到底才甘願。 | 本規格新寫 | `chat.xiaoyu-dig-05` |
| 小魚・xiaoyu-dig-06 | 找到想要的那張時，我會先抱著它在店裡繞一圈。 | 本規格新寫 | `chat.xiaoyu-dig-06` |
| 小魚・xiaoyu-dig-07 | 有時候翻到沒看過的，光看歌名就好想聽。 | 本規格新寫 | `chat.xiaoyu-dig-07` |
| 小魚・xiaoyu-dig-08 | 挖到喜歡的我會先夾在手臂下，怕被別人拿走。 | 本規格新寫 | `chat.xiaoyu-dig-08` |

## 活店・小魚・架上樣板（{album} 是他停的那箱架上某張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-shelf-01 | 這箱有張《{album}》，封面我盯好久了。 | 本規格新寫 | `chat.xiaoyu-shelf-01` |
| 小魚・xiaoyu-shelf-02 | 你看過《{album}》嗎？我好想帶回家。 | 本規格新寫 | `chat.xiaoyu-shelf-02` |
| 小魚・xiaoyu-shelf-03 | {artist}的《{album}》在這箱耶，我要先存錢。 | 本規格新寫 | `chat.xiaoyu-shelf-03` |
| 小魚・xiaoyu-shelf-04 | 這張《{album}》我每次來都會拿起來看一下。 | 本規格新寫 | `chat.xiaoyu-shelf-04` |

## 活店・小魚・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-trip-01・連贏 ≥3 | 你今天手好順，連贏幾個了？ | 本規格新寫 | `chat.xiaoyu-trip-01` |
| 小魚・xiaoyu-trip-02・聲望剩一半以下 | 你臉色不太好，要不要先去試聽一張？ | 本規格新寫 | `chat.xiaoyu-trip-02` |
| 小魚・xiaoyu-trip-03・第一趟 | 你剛開始打對吧？我也是剛開始玩黑膠，一起加油！ | 本規格新寫 | `chat.xiaoyu-trip-03` |
| 小魚・xiaoyu-trip-04・王牌走經典流 | 你走{title}喔？好帥，我都還不知道自己是哪一派。 | 本規格新寫 | `chat.xiaoyu-trip-04` |
| 小魚・xiaoyu-trip-05・包包 ≥10 張 | 你包包好鼓喔，裡面到底裝了幾張啊？ | 本規格新寫 | `chat.xiaoyu-trip-05` |
| 小魚・xiaoyu-trip-06・這一趟破最遠紀錄 | 你今天打得比以前都遠耶，我在旁邊看得好緊張。 | 本規格新寫 | `chat.xiaoyu-trip-06` |

## 活店・小魚・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-close-01 | 跟你聊過之後，我比較敢問老闆問題了。 | 本規格新寫 | `chat.xiaoyu-close-01` |
| 小魚・xiaoyu-close-02 | 室友問我店裡有沒有認識的人，我說有一個。 | 本規格新寫 | `chat.xiaoyu-close-02` |
| 小魚・xiaoyu-close-03 | 以後你挖到好聽的，也跟我說好不好？ | 本規格新寫 | `chat.xiaoyu-close-03` |

## 活店・小魚・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-mem-01 | 你上一趟停在第 {last} 位對吧？我有記住喔。 | 本規格新寫 | `chat.xiaoyu-mem-01` |
| 小魚・xiaoyu-mem-02 | 你最遠打到第 {far} 位耶，我還跟同學炫耀過。 | 本規格新寫 | `chat.xiaoyu-mem-02` |
| 小魚・xiaoyu-mem-03 | 上次跟你聊完，我回家把唱片全部重新排了一遍。 | 本規格新寫 | `chat.xiaoyu-mem-03` |

## 活店・小魚・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-busy-01・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 我再翻一下，等等聊。 | 本規格新寫 | `chat.xiaoyu-busy-01` |
| 小魚・xiaoyu-busy-02 | 等我一下下，這張我還在猶豫！ | 本規格新寫 | `chat.xiaoyu-busy-02` |

## 活店・阿凱・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-hello-01 | 阿凱。下班順路，進來看看而已。／……好啦，其實每天都順路。 | 本規格新寫 | `chat.akai-hello-01` |

## 活店・阿凱・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-again-01 | 喔，又是你。 | 本規格新寫 | `chat.akai-again-01` |
| 阿凱・akai-again-02 | 你也在喔。我只是路過，翻一下就走。 | 本規格新寫 | `chat.akai-again-02` |
| 阿凱・akai-again-03 | 又來？你比我還常來吧。 | 本規格新寫 | `chat.akai-again-03` |
| 阿凱・akai-again-04 | 嗯。今天加班，晚了一點。 | 本規格新寫 | `chat.akai-again-04` |
| 阿凱・akai-again-05 | 你比較早喔，我還以為我第一個到。 | 本規格新寫 | `chat.akai-again-05` |
| 阿凱・akai-again-06 | 別看我，我今天沒有要買。 | 本規格新寫 | `chat.akai-again-06` |

## 活店・阿凱・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-chat-01 | 下班不想直接回家，先來這裡翻一輪。 | 本規格新寫 | `chat.akai-chat-01` |
| 阿凱・akai-chat-02 | 主管今天又改需求，我需要很吵的東西洗耳朵。 | 本規格新寫 | `chat.akai-chat-02` |
| 阿凱・akai-chat-03 | 我不是喜歡吵，是安靜的歌會讓我想太多。 | 本規格新寫 | `chat.akai-chat-03` |
| 阿凱・akai-chat-04 | 同事問我平常聽什麼，我說隨便聽聽。 | 本規格新寫 | `chat.akai-chat-04` |
| 阿凱・akai-chat-05 | 耳機戴一整天，回家還是想放唱片，很怪吧。 | 本規格新寫 | `chat.akai-chat-05` |
| 阿凱・akai-chat-06 | 也沒有很愛啦，就是一個禮拜來五天而已。 | 本規格新寫 | `chat.akai-chat-06` |
| 阿凱・akai-chat-07 | 我房間放不下了，現在只買真的很想要的。 | 本規格新寫 | `chat.akai-chat-07` |
| 阿凱・akai-chat-08 | 週五晚上不用趕，翻到老闆開始看手錶我才走。 | 本規格新寫 | `chat.akai-chat-08` |
| 阿凱・akai-chat-09 | 聽重的東西會累？不會，那是在放鬆。 | 本規格新寫 | `chat.akai-chat-09` |
| 阿凱・akai-chat-10 | 我買唱片不聽別人推薦，自己踩雷比較甘心。 | 本規格新寫 | `chat.akai-chat-10` |
| 阿凱・akai-chat-11 | 我搭捷運都在想下一張要買什麼，比想工作認真。 | 本規格新寫 | `chat.akai-chat-11` |
| 阿凱・akai-chat-12 | 老闆那隻貓每次都瞪我，我又沒怎樣。 | 本規格新寫 | `chat.akai-chat-12` |

## 活店・阿凱・挖寶

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-dig-01・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 上禮拜在這箱挖到一張，回家聽到睡著。／是好的那種睡著。 | 本規格新寫 | `chat.akai-dig-01` |
| 阿凱・akai-dig-02 | 翻箱子會上癮，明明說好只翻一箱。 | 本規格新寫 | `chat.akai-dig-02` |
| 阿凱・akai-dig-03 | 挖到一張想要的，整天的鳥事就算了。 | 本規格新寫 | `chat.akai-dig-03` |
| 阿凱・akai-dig-04 | 我翻很快，封面閃過去一眼就知道要不要。 | 本規格新寫 | `chat.akai-dig-04` |
| 阿凱・akai-dig-05 | 有一次翻到想很久的那張，我假裝很冷靜拿去結帳。 | 本規格新寫 | `chat.akai-dig-05` |
| 阿凱・akai-dig-06 | 空手回家也沒差啦，翻的過程比較重要。／……騙你的，有差。 | 本規格新寫 | `chat.akai-dig-06` |
| 阿凱・akai-dig-07 | 封面越醜的我越想拿起來看，通常都不會錯。 | 本規格新寫 | `chat.akai-dig-07` |
| 阿凱・akai-dig-08 | 我都從最後面往前翻，別人翻過的我不信。 | 本規格新寫 | `chat.akai-dig-08` |

## 活店・阿凱・架上樣板（{album} 是他停的那箱架上某張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-shelf-01 | 這箱那張《{album}》，我看了三次還沒買。 | 本規格新寫 | `chat.akai-shelf-01` |
| 阿凱・akai-shelf-02 | 《{album}》？還好啦，我只是剛好拿起來。 | 本規格新寫 | `chat.akai-shelf-02` |
| 阿凱・akai-shelf-03 | 誰把《{album}》塞在這箱最後面，想藏起來喔？ | 本規格新寫 | `chat.akai-shelf-03` |
| 阿凱・akai-shelf-04 | 《{album}》你要嗎？不要我就拿走了。 | 本規格新寫 | `chat.akai-shelf-04` |

## 活店・阿凱・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-trip-01・第 10 位以後 | 都打到第 {pos} 位了，算你有兩下。 | 本規格新寫 | `chat.akai-trip-01` |
| 阿凱・akai-trip-02・聲望剩一半以下 | 你氣色很差欸。……我沒有在擔心，只是說說。 | 本規格新寫 | `chat.akai-trip-02` |
| 阿凱・akai-trip-03・說情重打過 | 你這趟有拜託老闆再一場吧？我看到了，不會講出去。 | 本規格新寫 | `chat.akai-trip-03` |
| 阿凱・akai-trip-04・連贏 ≥4 | 連贏那麼多喔。普通啦，換我也可以。 | 本規格新寫 | `chat.akai-trip-04` |
| 阿凱・akai-trip-05・接了踢館帖 | 你這輪接了踢館帖？有種，我欣賞。 | 本規格新寫 | `chat.akai-trip-05` |
| 阿凱・akai-trip-06・第 3 位以前 | 才第 {pos} 位而已，別緊張，手放輕鬆。 | 本規格新寫 | `chat.akai-trip-06` |

## 活店・阿凱・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-close-01 | 老實說，你挑盤的眼光還不錯啦。 | 本規格新寫 | `chat.akai-close-01` |
| 阿凱・akai-close-02 | 這間店是我下班唯一會想去的地方。／……不要跟老闆說。 | 本規格新寫 | `chat.akai-close-02` |
| 阿凱・akai-close-03 | 下次你翻到吵的，留一張給我，我請你喝飲料。 | 本規格新寫 | `chat.akai-close-03` |

## 活店・阿凱・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-mem-01 | 上一趟你停在第 {last} 位，這次給我撐久一點。 | 本規格新寫 | `chat.akai-mem-01` |
| 阿凱・akai-mem-02 | 你最遠到第 {far} 位喔，我記性好而已，別多想。 | 本規格新寫 | `chat.akai-mem-02` |
| 阿凱・akai-mem-03 | 上次你走了之後，老闆一直在講你。／……我沒在聽。 | 本規格新寫 | `chat.akai-mem-03` |

## 活店・阿凱・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-busy-01・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 等一下，我這箱還沒翻完。 | 本規格新寫 | `chat.akai-busy-01` |
| 阿凱・akai-busy-02 | 現在不行，我在找東西。 | 本規格新寫 | `chat.akai-busy-02` |

## 活店・大頭・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-hello-01 | 欸你好你好，我大頭，週末在酒吧放歌！／你也來挖寶齁？挖到好接的跟我說！ | 本規格新寫 | `chat.datou-hello-01` |

## 活店・大頭・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-again-01 | 欸你來了！剛好，我在找下一首要接的歌。 | 本規格新寫 | `chat.datou-again-01` |
| 大頭・datou-again-02 | 又見面啦！我跟你說，昨天客人留到很晚都不走。 | 本規格新寫 | `chat.datou-again-02` |
| 大頭・datou-again-03 | 嘿！你今天也來挖喔，搶不贏我啦。 | 本規格新寫 | `chat.datou-again-03` |
| 大頭・datou-again-04 | 你來啦你來啦，我剛好想找人講話。 | 本規格新寫 | `chat.datou-again-04` |
| 大頭・datou-again-05 | 欸欸，是你！我只有半小時，等等要去試音。 | 本規格新寫 | `chat.datou-again-05` |
| 大頭・datou-again-06 | 喔喔，熟面孔！要不要比誰先翻到好貨？ | 本規格新寫 | `chat.datou-again-06` |

## 活店・大頭・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-chat-01 | 週末那場要放兩個小時，我還在湊歌單。 | 本規格新寫 | `chat.datou-chat-01` |
| 大頭・datou-chat-02・停在 elec／hiphop／soul 才講 | 我在練接歌，這箱的鼓都很好接。 | 本規格新寫 | `chat.datou-chat-02` |
| 大頭・datou-chat-03 | 上禮拜放到一半唱針跳掉，全場在看我，超尷尬。 | 本規格新寫 | `chat.datou-chat-03` |
| 大頭・datou-chat-04 | 客人一跳起來，我就知道這首接對了。 | 本規格新寫 | `chat.datou-chat-04` |
| 大頭・datou-chat-05 | 我手機記事本裡全是歌單，有幾百條。 | 本規格新寫 | `chat.datou-chat-05` |
| 大頭・datou-chat-06 | 接歌最怕兩首速度差太多，硬接會很好笑。 | 本規格新寫 | `chat.datou-chat-06` |
| 大頭・datou-chat-07 | 我在家練到半夜，樓下阿伯跑上來敲門。 | 本規格新寫 | `chat.datou-chat-07` |
| 大頭・datou-chat-08 | 有時候最安靜的那首，反而讓全場停下來聽。 | 本規格新寫 | `chat.datou-chat-08` |
| 大頭・datou-chat-09 | 酒吧老闆說我放的歌太冷門，可是客人都留下來啊。 | 本規格新寫 | `chat.datou-chat-09` |
| 大頭・datou-chat-10 | 我耳朵現在聽什麼都在算拍子，職業病啦。 | 本規格新寫 | `chat.datou-chat-10` |
| 大頭・datou-chat-11 | 老歌接新歌的時候，台下會有人突然大叫，超爽。 | 本規格新寫 | `chat.datou-chat-11` |
| 大頭・datou-chat-12 | 平日翻唱片，週末放唱片，我的人生就這兩件事。 | 本規格新寫 | `chat.datou-chat-12` |

## 活店・大頭・挖寶

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-dig-01 | 箱底常有好東西，就看你翻不翻得到。 | 本規格新寫 | `chat.datou-dig-01` |
| 大頭・datou-dig-02 | 我翻箱一定戴耳機，聽著歌翻比較有手感。 | 本規格新寫 | `chat.datou-dig-02` |
| 大頭・datou-dig-03 | 挖到一張別人都沒聽過的，放出來大家都跑來問我。 | 本規格新寫 | `chat.datou-dig-03` |
| 大頭・datou-dig-04 | 有一次挖到一張，放第一首我就決定拿來開場。 | 本規格新寫 | `chat.datou-dig-04` |
| 大頭・datou-dig-05 | 翻箱就是要快狠準，猶豫一下就被別人拿走了。 | 本規格新寫 | `chat.datou-dig-05` |
| 大頭・datou-dig-06 | 我會一次抱五六張去試聽桌，老闆都翻白眼。 | 本規格新寫 | `chat.datou-dig-06` |
| 大頭・datou-dig-07 | 今天翻了三箱，挖到兩張，賺了賺了。 | 本規格新寫 | `chat.datou-dig-07` |
| 大頭・datou-dig-08 | 我最愛撿別人剛翻完的箱子，常有好貨被跳過。 | 本規格新寫 | `chat.datou-dig-08` |

## 活店・大頭・架上樣板（{album} 是他停的那箱架上某張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-shelf-01 | 《{album}》這張，我在想排進歌單會不會太跳。 | 本規格新寫 | `chat.datou-shelf-01` |
| 大頭・datou-shelf-02 | 欸這箱有《{album}》！先讓我卡位一下。 | 本規格新寫 | `chat.datou-shelf-02` |
| 大頭・datou-shelf-03 | {artist}的《{album}》，你聽過嗎？我還沒。 | 本規格新寫 | `chat.datou-shelf-03` |
| 大頭・datou-shelf-04 | 這張《{album}》封面好讚，我想拿回去裱起來。 | 本規格新寫 | `chat.datou-shelf-04` |

## 活店・大頭・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-trip-01・連贏 ≥3 | 欸你連贏欸！今天手氣好旺，衝一波！ | 本規格新寫 | `chat.datou-trip-01` |
| 大頭・datou-trip-02・聲望剩一半以下 | 欸你還好嗎？剛剛那場看得我都替你緊張。 | 本規格新寫 | `chat.datou-trip-02` |
| 大頭・datou-trip-03・王牌走冷門流 | 原來你是{title}的，跟我放歌的路數一樣嘛！ | 本規格新寫 | `chat.datou-trip-03` |
| 大頭・datou-trip-04・包包 ≥10 張 | 你包包裡那麼多張，借我幾張去放啦。 | 本規格新寫 | `chat.datou-trip-04` |
| 大頭・datou-trip-05・這一趟破最遠紀錄 | 你破紀錄了吧？這要放首歌慶祝一下！ | 本規格新寫 | `chat.datou-trip-05` |
| 大頭・datou-trip-06・第 20 位以後 | 第 {pos} 位了欸！你到底要打到哪裡？ | 本規格新寫 | `chat.datou-trip-06` |

## 活店・大頭・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-close-01 | 下次來酒吧聽我放歌啊，我請你喝一杯。 | 本規格新寫 | `chat.datou-close-01` |
| 大頭・datou-close-02 | 跟你聊完我都會冒出新的歌單點子，你是我的靈感啦。 | 本規格新寫 | `chat.datou-close-02` |
| 大頭・datou-close-03 | 你是少數聽我講接歌不會恍神的人，感謝喔。 | 本規格新寫 | `chat.datou-close-03` |

## 活店・大頭・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-mem-01 | 上一趟你到第 {last} 位，這次衝更遠啦！ | 本規格新寫 | `chat.datou-mem-01` |
| 大頭・datou-mem-02 | 你最遠到第 {far} 位對吧？我都記在手機裡。 | 本規格新寫 | `chat.datou-mem-02` |
| 大頭・datou-mem-03 | 上次跟你講的那個接法，我週末真的用了，有效！ | 本規格新寫 | `chat.datou-mem-03` |

## 活店・大頭・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-busy-01 | 等我一下，我在想下一首接什麼。 | 本規格新寫 | `chat.datou-busy-01` |
| 大頭・datou-busy-02・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 欸等等等，我快翻到了，給我十秒！ | 本規格新寫 | `chat.datou-busy-02` |

## 活店・阿芳・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-hello-01 | 你好，我在附近開咖啡店，叫我阿芳就好。／我常來幫店裡找歌，以後應該常碰面。 | 本規格新寫 | `chat.afang-hello-01` |

## 活店・阿芳・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-again-01 | 哈囉，今天也來挖寶啊？我也是。 | 本規格新寫 | `chat.afang-again-01` |
| 阿芳・afang-again-02 | 欸，是你！我剛好來補店裡的歌。 | 本規格新寫 | `chat.afang-again-02` |
| 阿芳・afang-again-03 | 今天店裡公休，我打算在這耗一整天。 | 本規格新寫 | `chat.afang-again-03` |
| 阿芳・afang-again-04 | 嗨，我只能待一下下，咖啡店只有工讀生在顧。 | 本規格新寫 | `chat.afang-again-04` |
| 阿芳・afang-again-05 | 又見面了，最近咖啡店客人多，歌都不夠換。 | 本規格新寫 | `chat.afang-again-05` |
| 阿芳・afang-again-06 | 你也在啊，我剛送完一批外帶就跑過來。 | 本規格新寫 | `chat.afang-again-06` |

## 活店・阿芳・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-chat-01 | 店裡要放的歌我都來這邊找，客人很挑。 | 本規格新寫 | `chat.afang-chat-01` |
| 阿芳・afang-chat-02 | 早上開店放輕快的，下午就換慢一點的。 | 本規格新寫 | `chat.afang-chat-02` |
| 阿芳・afang-chat-03 | 上次有客人喝完咖啡跑來問歌名。／我開心到多送他一塊蛋糕。 | 本規格新寫 | `chat.afang-chat-03` |
| 阿芳・afang-chat-04 | 磨豆機一開，什麼歌都聽不到，好氣。 | 本規格新寫 | `chat.afang-chat-04` |
| 阿芳・afang-chat-05 | 下雨天咖啡店人少，我就偷放自己想聽的。 | 本規格新寫 | `chat.afang-chat-05` |
| 阿芳・afang-chat-06 | 我店裡那台唱盤是二手的，轉起來有點喘。 | 本規格新寫 | `chat.afang-chat-06` |
| 阿芳・afang-chat-07 | 有客人坐一整個下午，就為了聽完一整面。 | 本規格新寫 | `chat.afang-chat-07` |
| 阿芳・afang-chat-08・停在 citypop 才講 | 這箱的人聲都軟軟的，好適合店裡的下午。 | 本規格新寫 | `chat.afang-chat-08` |
| 阿芳・afang-chat-09・停在 world 才講 | 這區的節奏好特別，客人聽了會跟著點頭。 | 本規格新寫 | `chat.afang-chat-09` |
| 阿芳・afang-chat-10 | 聽不懂歌詞的歌放店裡剛好，不會吵到人聊天。 | 本規格新寫 | `chat.afang-chat-10` |
| 阿芳・afang-chat-11 | 我家那位說，我買唱片比買咖啡豆還兇。 | 本規格新寫 | `chat.afang-chat-11` |
| 阿芳・afang-chat-12 | 關店後一個人擦杯子聽歌，是一天最爽的時候。 | 本規格新寫 | `chat.afang-chat-12` |

## 活店・阿芳・挖寶

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-dig-01 | 找到一張適合下午放的，心情就好一整天。 | 本規格新寫 | `chat.afang-dig-01` |
| 阿芳・afang-dig-02 | 封面好看的我都先抽出來，再一張一張試聽。 | 本規格新寫 | `chat.afang-dig-02` |
| 阿芳・afang-dig-03 | 我翻得很慢，一邊翻一邊想放在店裡會怎樣。 | 本規格新寫 | `chat.afang-dig-03` |
| 阿芳・afang-dig-04 | 翻到一張，馬上就想到我店裡哪個熟客會喜歡。 | 本規格新寫 | `chat.afang-dig-04` |
| 阿芳・afang-dig-05 | 有些封面上的字一個都看不懂，反而更想聽。 | 本規格新寫 | `chat.afang-dig-05` |
| 阿芳・afang-dig-06 | 挖到好東西不能叫太大聲。／被旁邊的人聽到，就換他先拿走了。 | 本規格新寫 | `chat.afang-dig-06` |
| 阿芳・afang-dig-07 | 翻到手指都黑了，回去洗杯子前要先洗手。 | 本規格新寫 | `chat.afang-dig-07` |
| 阿芳・afang-dig-08・停在 listen 才講 | 在試聽機前多站一下，才知道放店裡合不合。 | 本規格新寫 | `chat.afang-dig-08` |

## 活店・阿芳・架上樣板（{album} 是他停的那箱架上某張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-shelf-01 | 這箱那張《{album}》，放在店裡應該很搭。 | 本規格新寫 | `chat.afang-shelf-01` |
| 阿芳・afang-shelf-02 | 《{album}》我想買回去，早上開店的時候放。 | 本規格新寫 | `chat.afang-shelf-02` |
| 阿芳・afang-shelf-03 | 這箱有張{artist}的，我想先拿去試聽看看。 | 本規格新寫 | `chat.afang-shelf-03` |
| 阿芳・afang-shelf-04 | 《{album}》的封面好漂亮，好想裱起來掛在店裡。 | 本規格新寫 | `chat.afang-shelf-04` |

## 活店・阿芳・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-trip-01・王牌走冷門流 | 你也走{title}的路子？難怪會翻這種箱。 | 本規格新寫 | `chat.afang-trip-01` |
| 阿芳・afang-trip-02・聲望剩一半以下 | 你看起來好累，我包包裡有糖，分你一顆。 | 本規格新寫 | `chat.afang-trip-02` |
| 阿芳・afang-trip-03・連贏 ≥3 | 連贏好幾個了耶，我在旁邊看得手心都是汗。 | 本規格新寫 | `chat.afang-trip-03` |
| 阿芳・afang-trip-04・包包 ≥8 張 | 你包包也太滿了吧，跟我店裡的豆子櫃一樣。 | 本規格新寫 | `chat.afang-trip-04` |
| 阿芳・afang-trip-05・第一趟 | 你是新來的吧？別緊張，這間店又不會跑掉。 | 本規格新寫 | `chat.afang-trip-05` |
| 阿芳・afang-trip-06・這一趟破最遠紀錄 | 你今天走得比上次還遠耶，回去要跟客人講。 | 本規格新寫 | `chat.afang-trip-06` |

## 活店・阿芳・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-close-01 | 有空來店裡坐，咖啡算我的。 | 本規格新寫 | `chat.afang-close-01` |
| 阿芳・afang-close-02 | 上次看你拿的那張，我後來也買回店裡放了。 | 本規格新寫 | `chat.afang-close-02` |
| 阿芳・afang-close-03 | 哪天你挑一張來店裡放，我想聽聽你的口味。 | 本規格新寫 | `chat.afang-close-03` |

## 活店・阿芳・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-mem-01 | 你上一趟走到第 {last} 位，我還跟客人說過呢。 | 本規格新寫 | `chat.afang-mem-01` |
| 阿芳・afang-mem-02 | 我在點單本背面記著，你最遠到過第 {far} 位。 | 本規格新寫 | `chat.afang-mem-02` |
| 阿芳・afang-mem-03 | 上次看你打到第 {last} 位，回店裡拉花都拉歪了。 | 本規格新寫 | `chat.afang-mem-03` |

## 活店・阿芳・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-busy-01 | 我先挑完這幾張，等等再聊。 | 本規格新寫 | `chat.afang-busy-01` |
| 阿芳・afang-busy-02 | 等我一下，我在想這張放店裡會不會太吵。 | 本規格新寫 | `chat.afang-busy-02` |

## 活店・老陳・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-hello-01 | 這位同學，第一次見面，我姓陳。／以前教書的，叫我老陳就好。 | 本規格新寫 | `chat.laochen-hello-01` |

## 活店・老陳・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-again-01 | 你也來啦，我才剛到，箱子都還沒碰。 | 本規格新寫 | `chat.laochen-again-01` |
| 老陳・laochen-again-02 | 又遇到你了，同學今天精神不錯喔。 | 本規格新寫 | `chat.laochen-again-02` |
| 老陳・laochen-again-03 | 呵呵，我們還真有緣，又碰到了。 | 本規格新寫 | `chat.laochen-again-03` |
| 老陳・laochen-again-04 | 來啦？我今天腰比較不痠，可以多翻幾箱。 | 本規格新寫 | `chat.laochen-again-04` |
| 老陳・laochen-again-05 | 你來得正好，我剛翻到一張找了好久的。 | 本規格新寫 | `chat.laochen-again-05` |
| 老陳・laochen-again-06 | 又見面了。今天我太太准我買兩張。 | 本規格新寫 | `chat.laochen-again-06` |

## 活店・老陳・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-chat-01 | 年輕時買不起，現在買得起了，耳朵也老了。 | 本規格新寫 | `chat.laochen-chat-01` |
| 老陳・laochen-chat-02 | 以前教書，下課鐘一響就想往唱片行跑。 | 本規格新寫 | `chat.laochen-chat-02` |
| 老陳・laochen-chat-03 | 我太太說，家裡的牆快被唱片吃掉了。 | 本規格新寫 | `chat.laochen-chat-03` |
| 老陳・laochen-chat-04 | 晚上泡一壺茶，聽一面就好，不貪心。 | 本規格新寫 | `chat.laochen-chat-04` |
| 老陳・laochen-chat-05 | 老花眼看封底的小字，要拿得好遠才看得到。 | 本規格新寫 | `chat.laochen-chat-05` |
| 老陳・laochen-chat-06 | 以前學生畢業送我一張唱片，到現在還捨不得拆。 | 本規格新寫 | `chat.laochen-chat-06` |
| 老陳・laochen-chat-07 | 有些歌年輕時聽不懂，現在一聽就鼻酸。 | 本規格新寫 | `chat.laochen-chat-07` |
| 老陳・laochen-chat-08 | 退休以後時間多了，就是錢少了，呵呵。 | 本規格新寫 | `chat.laochen-chat-08` |
| 老陳・laochen-chat-09 | 我家那台唱盤跟了我很久，到現在還很勇。 | 本規格新寫 | `chat.laochen-chat-09` |
| 老陳・laochen-chat-10 | 以前守著收音機等那首歌，現在終於買到唱片了。 | 本規格新寫 | `chat.laochen-chat-10` |
| 老陳・laochen-chat-11・停在 classical 才講 | 這箱的弦樂，晚上關了燈聽最有味道。 | 本規格新寫 | `chat.laochen-chat-11` |
| 老陳・laochen-chat-12・停在 soul 才講 | 這箱的和聲一疊上來，我的腳就跟著打拍子。 | 本規格新寫 | `chat.laochen-chat-12` |

## 活店・老陳・挖寶

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-dig-01 | 翻箱子跟釣魚一樣，急不來的。 | 本規格新寫 | `chat.laochen-dig-01` |
| 老陳・laochen-dig-02 | 翻久了腰會痠，翻完一箱就伸個懶腰。 | 本規格新寫 | `chat.laochen-dig-02` |
| 老陳・laochen-dig-03 | 以前想要的那張，有時翻著翻著就冒出來了。 | 本規格新寫 | `chat.laochen-dig-03` |
| 老陳・laochen-dig-04 | 我口袋裡有張清單，找了好久還劃不掉幾個。 | 本規格新寫 | `chat.laochen-dig-04` |
| 老陳・laochen-dig-05 | 翻到一半眼鏡一直滑下來，推了又推。 | 本規格新寫 | `chat.laochen-dig-05` |
| 老陳・laochen-dig-06 | 每次翻到想要的，都想跟年輕的自己說一聲。 | 本規格新寫 | `chat.laochen-dig-06` |
| 老陳・laochen-dig-07 | 一箱翻完再從頭翻一次，常常第二次才看到。 | 本規格新寫 | `chat.laochen-dig-07` |
| 老陳・laochen-dig-08・停在 listen 才講 | 在試聽機前站一下，腳就捨不得走了。 | 本規格新寫 | `chat.laochen-dig-08` |

## 活店・老陳・架上樣板（{album} 是他停的那箱架上某張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-shelf-01 | 這箱有張《{album}》，我看看清單上有沒有。 | 本規格新寫 | `chat.laochen-shelf-01` |
| 老陳・laochen-shelf-02 | 《{album}》這張，我得回家查查是不是買過了。 | 本規格新寫 | `chat.laochen-shelf-02` |
| 老陳・laochen-shelf-03 | {artist}的唱片我太太也愛聽，帶一張回去好了。 | 本規格新寫 | `chat.laochen-shelf-03` |
| 老陳・laochen-shelf-04 | 《{album}》先放著，翻完一輪還在就帶走。 | 本規格新寫 | `chat.laochen-shelf-04` |

## 活店・老陳・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-trip-01・說情重打過 | 說情過啦？我當學生時也補考過，呵呵。 | 本規格新寫 | `chat.laochen-trip-01` |
| 老陳・laochen-trip-02・聲望剩一半以下 | 看你有點累，先坐一下，不急。 | 本規格新寫 | `chat.laochen-trip-02` |
| 老陳・laochen-trip-03・連贏 ≥3 | 連贏好幾場，同學手氣正旺啊。 | 本規格新寫 | `chat.laochen-trip-03` |
| 老陳・laochen-trip-04・第 20 位以後 | 第 {pos} 位了？我年輕時可沒這種膽量。 | 本規格新寫 | `chat.laochen-trip-04` |
| 老陳・laochen-trip-05・接了踢館帖 | 接了踢館帖啊？這一輪我陪你一起緊張。 | 本規格新寫 | `chat.laochen-trip-05` |
| 老陳・laochen-trip-06・這一趟破最遠紀錄 | 比上一趟走得還遠了，穩穩走，別急。 | 本規格新寫 | `chat.laochen-trip-06` |

## 活店・老陳・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-close-01 | 跟你聊天，好像回到以前教書的時候。 | 本規格新寫 | `chat.laochen-close-01` |
| 老陳・laochen-close-02 | 我那張清單，你看到哪張就幫我留意一下。 | 本規格新寫 | `chat.laochen-close-02` |
| 老陳・laochen-close-03 | 哪天來我家聽唱片，我太太泡的茶很好喝。 | 本規格新寫 | `chat.laochen-close-03` |

## 活店・老陳・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-mem-01 | 第 {last} 位，是你上一趟停下來的地方吧？這次穩一點。 | 本規格新寫 | `chat.laochen-mem-01` |
| 老陳・laochen-mem-02 | 你最遠走到第 {far} 位吧？老師記性還不錯。 | 本規格新寫 | `chat.laochen-mem-02` |
| 老陳・laochen-mem-03 | 上一趟第 {last} 位，以前我會在考卷上寫：可再加油。 | 本規格新寫 | `chat.laochen-mem-03` |

## 活店・老陳・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-busy-01 | 讓我先看完這幾張，老人家手腳慢。 | 本規格新寫 | `chat.laochen-busy-01` |
| 老陳・laochen-busy-02 | 同學稍等，老人家一次只能專心一件事。 | 本規格新寫 | `chat.laochen-busy-02` |

## 活店・周姐・打招呼（第一次見面，一輩子一次）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-hello-01 | 新面孔？我跟你們老闆認識很久了。／叫我周姐，以前我們在同一間店上班。 | 本規格新寫 | `chat.zhoujie-hello-01` |

## 活店・周姐・這一趟第一次遇到

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-again-01 | 來啦，今天想聽點什麼？ | 本規格新寫 | `chat.zhoujie-again-01` |
| 周姐・zhoujie-again-02 | 又是你。你們老闆最近有沒有偷懶？ | 本規格新寫 | `chat.zhoujie-again-02` |
| 周姐・zhoujie-again-03 | 我剛跟老闆喝完茶，換你陪我翻。 | 本規格新寫 | `chat.zhoujie-again-03` |
| 周姐・zhoujie-again-04 | 唷，你也在。這幾箱我先幫你看過一輪了。 | 本規格新寫 | `chat.zhoujie-again-04` |
| 周姐・zhoujie-again-05 | 來得正好，我剛好想找個人說說話。 | 本規格新寫 | `chat.zhoujie-again-05` |
| 周姐・zhoujie-again-06 | 嗨，今天手氣如何？我先說，我的不錯。 | 本規格新寫 | `chat.zhoujie-again-06` |

## 活店・周姐・閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-chat-01 | 年輕人，翻慢一點，好盤會等你。 | 本規格新寫 | `chat.zhoujie-chat-01` |
| 周姐・zhoujie-chat-02 | 以前顧櫃檯，客人哼兩句我就知道要哪張。 | 本規格新寫 | `chat.zhoujie-chat-02` |
| 周姐・zhoujie-chat-03 | 你們老闆年輕時，比你還會殺價。 | 本規格新寫 | `chat.zhoujie-chat-03` |
| 周姐・zhoujie-chat-04 | 顧店那幾年，最怕客人說隨便推薦一張。 | 本規格新寫 | `chat.zhoujie-chat-04` |
| 周姐・zhoujie-chat-05 | 唱片行好玩的地方，是每天都有人帶故事進來。 | 本規格新寫 | `chat.zhoujie-chat-05` |
| 周姐・zhoujie-chat-06 | 現在不顧店了，換我當客人，輕鬆多了。 | 本規格新寫 | `chat.zhoujie-chat-06` |
| 周姐・zhoujie-chat-07 | 看到有人整隻手按在封面上，我還是會皺眉。 | 本規格新寫 | `chat.zhoujie-chat-07` |
| 周姐・zhoujie-chat-08 | 我推過的唱片，有人回來罵，也有人回來道謝。 | 本規格新寫 | `chat.zhoujie-chat-08` |

## 活店・周姐・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-trip-01・連贏 ≥3 | 今天打得不錯，看得出來有在聽。 | 本規格新寫 | `chat.zhoujie-trip-01` |
| 周姐・zhoujie-trip-02・王牌走異端流 | 走{title}的啊？我年輕時也愛跟人唱反調。 | 本規格新寫 | `chat.zhoujie-trip-02` |
| 周姐・zhoujie-trip-03・說情重打過 | 輸一場不算什麼，我顧店時也常被客人考倒。 | 本規格新寫 | `chat.zhoujie-trip-03` |

## 活店・周姐・熟了以後

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-close-01 | 跟你聊天，比跟你們老闆聊有意思。 | 本規格新寫 | `chat.zhoujie-close-01` |
| 周姐・zhoujie-close-02 | 下次有好東西進來，我叫老闆先留給你看。 | 本規格新寫 | `chat.zhoujie-close-02` |
| 周姐・zhoujie-close-03 | 你這樣翻下去，哪天換你來教我。 | 本規格新寫 | `chat.zhoujie-close-03` |

## 活店・周姐・記得你上一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-mem-01 | 上一趟你走到第 {last} 位，老闆跟我說了。 | 本規格新寫 | `chat.zhoujie-mem-01` |
| 周姐・zhoujie-mem-02 | 最遠到過第 {far} 位？那我得重新看你一眼。 | 本規格新寫 | `chat.zhoujie-mem-02` |
| 周姐・zhoujie-mem-03 | 上次停在第 {last} 位，這次別急，一位一位來。 | 本規格新寫 | `chat.zhoujie-mem-03` |

## 活店・周姐・忙著翻（一次來聊滿三段）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-busy-01・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 這箱我還沒看完，你先去翻別的。 | 本規格新寫 | `chat.zhoujie-busy-01` |
| 周姐・zhoujie-busy-02 | 等一下，這張我得看仔細。 | 本規格新寫 | `chat.zhoujie-busy-02` |

## 活店・周姐・知識引子（接藝人介紹摘句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-loreIn-01 | {artist}啊，我記得介紹上寫： | 本規格新寫 | `chat.zhoujie-loreIn-01` |
| 周姐・zhoujie-loreIn-02 | 說到{artist}，介紹裡有一句我很喜歡： | 本規格新寫 | `chat.zhoujie-loreIn-02` |
| 周姐・zhoujie-loreIn-03 | {artist}啊，我照介紹念給你聽： | 本規格新寫 | `chat.zhoujie-loreIn-03` |
| 周姐・zhoujie-loreIn-04 | 我不亂講，介紹上是這樣寫{artist}的： | 本規格新寫 | `chat.zhoujie-loreIn-04` |
| 周姐・zhoujie-loreIn-05 | 這張是{artist}的。介紹上有一段： | 本規格新寫 | `chat.zhoujie-loreIn-05` |
| 周姐・zhoujie-loreIn-06 | {artist}的事我不憑印象講，照介紹來： | 本規格新寫 | `chat.zhoujie-loreIn-06` |
| 周姐・zhoujie-loreIn-07 | {artist}？等我想想，介紹上寫過： | 本規格新寫 | `chat.zhoujie-loreIn-07` |
| 周姐・zhoujie-loreIn-08 | 跟你講個{artist}的事，介紹上看來的： | 本規格新寫 | `chat.zhoujie-loreIn-08` |
| 周姐・zhoujie-loreIn-09 | 《{album}》是{artist}的，介紹裡提到： | 本規格新寫 | `chat.zhoujie-loreIn-09` |
| 周姐・zhoujie-loreIn-10 | {artist}這名字你記一下，介紹上說： | 本規格新寫 | `chat.zhoujie-loreIn-10` |

## 活店・周姐・知識收尾

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-loreOut-01 | 想知道更多，點封面看唱片資訊。 | 本規格新寫 | `chat.zhoujie-loreOut-01` |
| 周姐・zhoujie-loreOut-02 | 我就記得這些，其他的你自己聽。 | 本規格新寫 | `chat.zhoujie-loreOut-02` |
| 周姐・zhoujie-loreOut-03 | 好了，講太多就不好玩了，自己去聽吧。 | 本規格新寫 | `chat.zhoujie-loreOut-03` |
| 周姐・zhoujie-loreOut-04 | 聽完再來跟我說，你覺得怎樣。 | 本規格新寫 | `chat.zhoujie-loreOut-04` |
| 周姐・zhoujie-loreOut-05 | 其他的你自己去翻，比我講的有趣。 | 本規格新寫 | `chat.zhoujie-loreOut-05` |
| 周姐・zhoujie-loreOut-06 | 差不多就這樣，剩下的交給你的耳朵。 | 本規格新寫 | `chat.zhoujie-loreOut-06` |
| 周姐・zhoujie-loreOut-07 | 記不住沒關係，點封面都查得到。 | 本規格新寫 | `chat.zhoujie-loreOut-07` |
| 周姐・zhoujie-loreOut-08 | 我就講到這，喜不喜歡你自己決定。 | 本規格新寫 | `chat.zhoujie-loreOut-08` |

## 活店・周姐・知識樣板（{x} 照卡片欄位填，填不出來那句不出）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-fact-01 | 《{album}》是{year}年發行的。 | 本規格新寫 | `chat.zhoujie-fact-01` |
| 周姐・zhoujie-fact-02 | {artist}這張是{decade}年代發行的。 | 本規格新寫 | `chat.zhoujie-fact-02` |
| 周姐・zhoujie-fact-03 | {artist}這張曲風標{genre}，不過你自己聽了算。 | 本規格新寫 | `chat.zhoujie-fact-03` |
| 周姐・zhoujie-fact-04 | 這張是{region}的唱片，翻到我都會多看一眼。 | 本規格新寫 | `chat.zhoujie-fact-04` |
| 周姐・zhoujie-fact-05 | 我看這張標{tune}，挑對心情再放。 | 本規格新寫 | `chat.zhoujie-fact-05` |
| 周姐・zhoujie-fact-06 | 照店裡的分法，《{album}》偏{axis}。 | 本規格新寫 | `chat.zhoujie-fact-06` |
| 周姐・zhoujie-fact-07・冷門 ≥4 | {artist}這張，知道的人不多。 | 本規格新寫 | `chat.zhoujie-fact-07` |
| 周姐・zhoujie-fact-08・冷門 ≥4 | 《{album}》是少人知道的那種，遇到就是緣分。 | 本規格新寫 | `chat.zhoujie-fact-08` |
| 周姐・zhoujie-fact-09・冷門 ≤2 | {artist}這張不少人知道，翻到不稀奇。 | 本規格新寫 | `chat.zhoujie-fact-09` |
| 周姐・zhoujie-fact-10・硬蕊 ≥4 | 《{album}》入耳有點門檻，要慢慢聽。 | 本規格新寫 | `chat.zhoujie-fact-10` |
| 周姐・zhoujie-fact-11・硬蕊 ≥4 | {artist}這張不好入耳，多給它幾次機會。 | 本規格新寫 | `chat.zhoujie-fact-11` |
| 周姐・zhoujie-fact-12・硬蕊 ≤2 | 《{album}》很好入耳，什麼時候放都行。 | 本規格新寫 | `chat.zhoujie-fact-12` |
| 周姐・zhoujie-fact-13・經典 ≥4 | {artist}這張，在它那一圈算經典。 | 本規格新寫 | `chat.zhoujie-fact-13` |
| 周姐・zhoujie-fact-14・經典 ≥4 | 想認識{artist}，先從《{album}》這種經典聽起。 | 本規格新寫 | `chat.zhoujie-fact-14` |
| 周姐・zhoujie-fact-15・冷門 ≥4、硬蕊 ≥4 | 《{album}》又少人知道又不好入耳，敢聽算你有種。 | 本規格新寫 | `chat.zhoujie-fact-15` |
| 周姐・zhoujie-fact-16・那張在架上 | 那張就在{bin}那箱，自己去聽聽。 | 本規格新寫 | `chat.zhoujie-fact-16` |
| 周姐・zhoujie-fact-17・那張在架上 | 《{album}》就插在{bin}那箱，被買走就沒了。 | 本規格新寫 | `chat.zhoujie-fact-17` |
| 周姐・zhoujie-fact-18・那張在架上 | 《{album}》還在{bin}那箱，想聽就去翻。 | 本規格新寫 | `chat.zhoujie-fact-18` |
| 周姐・zhoujie-fact-19・那張在架上 | {artist}這張就在{bin}那箱，點封面就能試聽。 | 本規格新寫 | `chat.zhoujie-fact-19` |
| 周姐・zhoujie-fact-20 | 算算日子，{artist}出這張是{year}年的事。 | 本規格新寫 | `chat.zhoujie-fact-20` |

## 活店・路人（四套外觀共用一個環；隨口、找唱片、對店）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 路人・passer-chat-01 | 本來只是進來躲雨的。 | 本規格新寫 | `chat.passer-chat-01` |
| 路人・passer-chat-02 | 這裡好安靜，跟外面像兩個世界。 | 本規格新寫 | `chat.passer-chat-02` |
| 路人・passer-chat-03 | 我只是看看，不用招呼我。 | 本規格新寫 | `chat.passer-chat-03` |
| 路人・passer-chat-04 | 原來現在還有人在買黑膠。 | 本規格新寫 | `chat.passer-chat-04` |
| 路人・passer-chat-05 | 這裡的味道好像我小時候的家。 | 本規格新寫 | `chat.passer-chat-05` |
| 路人・passer-chat-06 | 逛累了，進來休息一下。 | 本規格新寫 | `chat.passer-chat-06` |
| 路人・passer-chat-07 | 封面都好漂亮，可以拿起來看嗎？ | 本規格新寫 | `chat.passer-chat-07` |
| 路人・passer-chat-08 | 等人等太久，乾脆進來逛逛。 | 本規格新寫 | `chat.passer-chat-08` |
| 路人・passer-chat-09 | 我看不太懂，但覺得很厲害。 | 本規格新寫 | `chat.passer-chat-09` |
| 路人・passer-chat-10 | 下雨天逛唱片行，好有感覺。 | 本規格新寫 | `chat.passer-chat-10` |
| 路人・passer-chat-11 | 我家也有一台唱盤，好久沒開了。 | 本規格新寫 | `chat.passer-chat-11` |
| 路人・passer-chat-12 | 下次帶朋友來，他一定會瘋掉。 | 本規格新寫 | `chat.passer-chat-12` |
| 路人・passer-chat-13 | 幫朋友找一張，名字忘了。 | 本規格新寫 | `chat.passer-chat-13` |
| 路人・passer-chat-14 | 有沒有適合送人的？我不太懂。 | 本規格新寫 | `chat.passer-chat-14` |
| 路人・passer-chat-15 | 我在找小時候家裡常放的那張。 | 本規格新寫 | `chat.passer-chat-15` |
| 路人・passer-chat-16 | 想找一張下雨天聽的。 | 本規格新寫 | `chat.passer-chat-16` |
| 路人・passer-chat-17 | 有首歌我只會哼，不知道叫什麼。 | 本規格新寫 | `chat.passer-chat-17` |
| 路人・passer-chat-18 | 想找一張讀書時可以放的。 | 本規格新寫 | `chat.passer-chat-18` |
| 路人・passer-chat-19 | 我要找封面是藍色的，就這樣。 | 本規格新寫 | `chat.passer-chat-19` |
| 路人・passer-chat-20 | 聽說這裡挖得到別的地方沒有的。 | 本規格新寫 | `chat.passer-chat-20` |
| 路人・passer-chat-21 | 想找一張送爸爸當生日禮物。 | 本規格新寫 | `chat.passer-chat-21` |
| 路人・passer-chat-22 | 請問這種要從哪一箱開始翻？ | 本規格新寫 | `chat.passer-chat-22` |
| 路人・passer-chat-23 | 這間店好難找，繞了兩圈。 | 本規格新寫 | `chat.passer-chat-23` |
| 路人・passer-chat-24 | 那隻貓是店貓嗎？好可愛。 | 本規格新寫 | `chat.passer-chat-24` |
| 路人・passer-chat-25 | 這裡的老闆好像不太講話。 | 本規格新寫 | `chat.passer-chat-25` |
| 路人・passer-chat-26 | 店好小，東西好多。 | 本規格新寫 | `chat.passer-chat-26` |
| 路人・passer-chat-27 | 這門好重，我還以為沒開。 | 本規格新寫 | `chat.passer-chat-27` |
| 路人・passer-chat-28 | 在這裡講話都會不自覺小聲。 | 本規格新寫 | `chat.passer-chat-28` |
| 路人・passer-chat-29 | 我經過好幾次，今天終於進來了。 | 本規格新寫 | `chat.passer-chat-29` |
| 路人・passer-chat-30・停在 rock／soul／citypop／world／elec／hiphop／classical／folk 才講 | 這邊的箱子是照什麼排的啊？ | 本規格新寫 | `chat.passer-chat-30` |

## 活店・老闆閒聊

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・owner-chat-01 | 唱片放久了會有自己的脾氣，跟人一樣。 | 本規格新寫 | `ownerChat.owner-chat-01` |
| 老闆・owner-chat-02 | 貓不給摸，你不用試了。 | 本規格新寫 | `ownerChat.owner-chat-02` |
| 老闆・owner-chat-03 | 生意好不好，看貓睡在哪裡就知道。 | 本規格新寫 | `ownerChat.owner-chat-03` |
| 老闆・owner-chat-04 | 封套舊沒關係，裡面乾淨就好。 | 本規格新寫 | `ownerChat.owner-chat-04` |
| 老闆・owner-chat-05 | 我年輕時也是這樣，一箱一箱翻到腰痛。 | 本規格新寫 | `ownerChat.owner-chat-05` |
| 老闆・owner-chat-06 | 茶在那邊，自己倒。 | 本規格新寫 | `ownerChat.owner-chat-06` |
| 老闆・owner-chat-07 | 那台收音機壞過三次，都是我自己修的。 | 本規格新寫 | `ownerChat.owner-chat-07` |
| 老闆・owner-chat-08 | 有人一進門就知道要什麼，有人翻一下午，都好。 | 本規格新寫 | `ownerChat.owner-chat-08` |
| 老闆・owner-chat-09 | 唱片賣出去那一刻，我都會多看它一眼。 | 本規格新寫 | `ownerChat.owner-chat-09` |
| 老闆・owner-chat-10 | 開店這些年，最常聽到的一句是「我只是看看」。 | 本規格新寫 | `ownerChat.owner-chat-10` |
| 老闆・owner-chat-11 | 下雨天放唱片，聲音好像特別近。 | 本規格新寫 | `ownerChat.owner-chat-11` |
| 老闆・owner-chat-12 | 店裡的歌我隨便放，聽到喜歡的再來問我。 | 本規格新寫 | `ownerChat.owner-chat-12` |

## 活店・老闆・店裡的事（見過那位熟客才講）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・owner-chat-13・見過小魚 | 小魚第一次來，連唱針都不敢放。 | 本規格新寫 | `ownerChat.owner-chat-13` |
| 老闆・owner-chat-14・見過小魚 | 小魚每次結帳都先數零錢，數很久。 | 本規格新寫 | `ownerChat.owner-chat-14` |
| 老闆・owner-chat-15・見過阿凱 | 阿凱嘴巴說隨便看看，每次都買最多。 | 本規格新寫 | `ownerChat.owner-chat-15` |
| 老闆・owner-chat-16・見過阿凱 | 阿凱說他只是順路，可是他家在反方向。 | 本規格新寫 | `ownerChat.owner-chat-16` |
| 老闆・owner-chat-17・見過大頭 | 大頭在這裡練過接歌，被我趕出去。 | 本規格新寫 | `ownerChat.owner-chat-17` |
| 老闆・owner-chat-18・見過大頭 | 大頭講話很快，你聽不懂就點頭，他不會發現。 | 本規格新寫 | `ownerChat.owner-chat-18` |
| 老闆・owner-chat-19・見過阿芳 | 阿芳店裡放的歌，一半是從這裡帶走的。 | 本規格新寫 | `ownerChat.owner-chat-19` |
| 老闆・owner-chat-20・見過老陳 | 老陳以前是老師，問他問題要有心理準備。 | 本規格新寫 | `ownerChat.owner-chat-20` |
| 老闆・owner-chat-21・見過周姐 | 周姐以前跟我在別間店一起顧櫃檯。 | 本規格新寫 | `ownerChat.owner-chat-21` |
| 老闆・owner-chat-22・見過周姐 | 周姐的耳朵比我還利，我進貨都會先問她。 | 本規格新寫 | `ownerChat.owner-chat-22` |

## 活店・老闆・看你這一趟

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・owner-trip-01・聲望剩一半以下 | 撐著點，先喝口茶再上。 | 本規格新寫 | `ownerChat.owner-trip-01` |
| 老闆・owner-trip-02・連贏 ≥3 | 連贏了啊。別笑太開，客人會記仇。 | 本規格新寫 | `ownerChat.owner-trip-02` |
| 老闆・owner-trip-03・說情重打過 | 那次說情算你的，下次自己撐住。 | 本規格新寫 | `ownerChat.owner-trip-03` |
| 老闆・owner-trip-04・接了踢館帖 | 接了踢館帖，就打到底。 | 本規格新寫 | `ownerChat.owner-trip-04` |
| 老闆・owner-trip-05・第一趟 | 第一趟，輸贏都是學費。 | 本規格新寫 | `ownerChat.owner-trip-05` |
| 老闆・owner-trip-06・這一趟破最遠紀錄 | 走這麼遠了？我都快不認得你了。 | 本規格新寫 | `ownerChat.owner-trip-06` |
| 老闆・owner-trip-07・包包 ≥12 張 | 包包那麼重，肩膀別壓壞了。 | 本規格新寫 | `ownerChat.owner-trip-07` |
| 老闆・owner-trip-08・第 15 位以後 | 第 {pos} 位了，你比我年輕時能撐。 | 本規格新寫 | `ownerChat.owner-trip-08` |

## 活店・介面字（老闆的一次性提示、摘句下緣的出處、路人泡泡第一行）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・intro | 熟客都會來翻，想聊就點他們。 | 本規格新寫 | `crowdUi.intro` |
| 老闆・expertIntro | 周姐來了，她懂很多，想聽就去問她。 | 本規格新寫 | `crowdUi.expertIntro` |
| （畫面字）・src | 藝人介紹・{artist} | 本規格新寫 | `crowdUi.src` |
| （畫面字）・passer | 客人 | 本規格新寫 | `crowdUi.passer` |

## 活店・周姐知識樣板的填空字（{genre} 照主站十類、{region} 只有台灣／日本／華語）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （填空）・{genre}・rock | 搖滾 | 本規格新寫 | `crowdFact.genre.rock` |
| （填空）・{genre}・jazz | 爵士 | 本規格新寫 | `crowdFact.genre.jazz` |
| （填空）・{genre}・electronic | 電子 | 本規格新寫 | `crowdFact.genre.electronic` |
| （填空）・{genre}・soul | 靈魂放克 | 本規格新寫 | `crowdFact.genre.soul` |
| （填空）・{genre}・hiphop | 嘻哈 R&B | 本規格新寫 | `crowdFact.genre.hiphop` |
| （填空）・{genre}・classical | 古典 | 本規格新寫 | `crowdFact.genre.classical` |
| （填空）・{genre}・folk | 民謠 | 本規格新寫 | `crowdFact.genre.folk` |
| （填空）・{genre}・pop | 流行 | 本規格新寫 | `crowdFact.genre.pop` |
| （填空）・{genre}・world | 世界 | 本規格新寫 | `crowdFact.genre.world` |
| （填空）・{genre}・blues | 藍調 | 本規格新寫 | `crowdFact.genre.blues` |
| （填空）・{region}・tw | 台灣 | 本規格新寫 | `crowdFact.region.tw` |
| （填空）・{region}・jp | 日本 | 本規格新寫 | `crowdFact.region.jp` |
| （填空）・{region}・zh | 華語 | 本規格新寫 | `crowdFact.region.zh` |

## 活店・切磋・小魚

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 小魚・xiaoyu-encDare-01・嗆 | 那個，可以跟你切磋一盤嗎？我想練習！ | 本規格新寫 | `chat.xiaoyu-encDare-01` |
| 小魚・xiaoyu-encDare-02・嗆 | 學長說要找厲害的人練，所以我來找你了！ | 本規格新寫 | `chat.xiaoyu-encDare-02` |
| 小魚・xiaoyu-encDare-03・嗆 | 我會緊張，可是我真的很想跟你打打看！ | 本規格新寫 | `chat.xiaoyu-encDare-03` |
| 小魚・xiaoyu-encYes-01・接了 | 真的可以嗎！等我一下，我先深呼吸。 | 本規格新寫 | `chat.xiaoyu-encYes-01` |
| 小魚・xiaoyu-encNo-01・改天 | 好喔，那我先去翻箱，你忙完再找我！ | 本規格新寫 | `chat.xiaoyu-encNo-01` |
| 小魚・xiaoyu-encNo-02・改天 | 沒關係啦，其實我也還沒準備好，哈哈。 | 本規格新寫 | `chat.xiaoyu-encNo-02` |
| 小魚・xiaoyu-encLapse-01・沒理他 | 你好像在忙耶，那我不吵你了喔。 | 本規格新寫 | `chat.xiaoyu-encLapse-01` |
| 小魚・xiaoyu-encLose-01・他輸了 | 嗚嗚，我輸了啦！挑一張帶走，要好好聽喔。 | 本規格新寫 | `chat.xiaoyu-encLose-01` |
| 小魚・xiaoyu-encLose-02・他輸了 | 你出得好快，我腦袋完全跟不上耶。 | 本規格新寫 | `chat.xiaoyu-encLose-02` |
| 小魚・xiaoyu-encWin-01・他贏了 | 我贏了？真的假的，我要跟室友講！ | 本規格新寫 | `chat.xiaoyu-encWin-01` |
| 小魚・xiaoyu-encWin-02・他贏了 | 原來我也可以贏，你該不會是故意的吧？ | 本規格新寫 | `chat.xiaoyu-encWin-02` |
| 小魚・xiaoyu-encVoid-01・作廢 | 欸，我們剛剛是不是沒打完？那就不算囉！ | 本規格新寫 | `chat.xiaoyu-encVoid-01` |
| 小魚・xiaoyu-trip-07・看你這一趟・切磋贏過（不分跟誰打） | 你切磋贏了耶！出唱片的訣竅可以教我嗎？ | 本規格新寫 | `chat.xiaoyu-trip-07` |
| 小魚・xiaoyu-trip-08・看你這一趟・切磋輸過（不分跟誰打） | 我切磋也常常輸啦，輸久就習慣了。 | 本規格新寫 | `chat.xiaoyu-trip-08` |

## 活店・切磋・阿凱

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿凱・akai-encDare-01・嗆 | 欸，看你打好久了，跟我來一盤？ | 本規格新寫 | `chat.akai-encDare-01` |
| 阿凱・akai-encDare-02・嗆 | 主管念了我一整天，陪我打一盤消消氣。 | 本規格新寫 | `chat.akai-encDare-02` |
| 阿凱・akai-encDare-03・嗆 | 先說好，我不是想跟你打，是剛好有空。 | 本規格新寫 | `chat.akai-encDare-03` |
| 阿凱・akai-encYes-01・接了 | 好，等等輸了不准說我欺負你。 | 本規格新寫 | `chat.akai-encYes-01` |
| 阿凱・akai-encNo-01・改天 | 隨便，我本來就要回家了。 | 本規格新寫 | `chat.akai-encNo-01` |
| 阿凱・akai-encNo-02・改天 | 改天喔？好啦，反正我天天都順路。 | 本規格新寫 | `chat.akai-encNo-02` |
| 阿凱・akai-encLapse-01・沒理他 | 不理我？算了，我又不是很想打。 | 本規格新寫 | `chat.akai-encLapse-01` |
| 阿凱・akai-encLose-01・他輸了 | 好啦，算你狠，我的唱片隨你挑。 | 本規格新寫 | `chat.akai-encLose-01` |
| 阿凱・akai-encLose-03・他輸了 | 好啦，算你狠，挑一張喜歡的帶走。 | 本規格新寫 | `chat.akai-encLose-03` |
| 阿凱・akai-encLose-02・他輸了 | 今天加班太累，不然才不會輸你。 | 本規格新寫 | `chat.akai-encLose-02` |
| 阿凱・akai-encWin-01・他贏了 | 贏了。你出太急了，跟我主管一樣。 | 本規格新寫 | `chat.akai-encWin-01` |
| 阿凱・akai-encWin-02・他贏了 | 不要太在意，我只是運氣比較好。……大概。 | 本規格新寫 | `chat.akai-encWin-02` |
| 阿凱・akai-encVoid-01・作廢 | 剛剛那盤不算，我還沒認真。 | 本規格新寫 | `chat.akai-encVoid-01` |
| 阿凱・akai-trip-07・看你這一趟・切磋贏過（不分跟誰打） | 贏一盤切磋而已，不要太得意喔。 | 本規格新寫 | `chat.akai-trip-07` |
| 阿凱・akai-trip-08・看你這一趟・切磋輸過（不分跟誰打） | 切磋輸了喔？……我沒有在笑。 | 本規格新寫 | `chat.akai-trip-08` |

## 活店・切磋・大頭

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 大頭・datou-encDare-01・嗆 | 你的盤我看一眼就知道路數，來一盤？ | 本規格新寫 | `chat.datou-encDare-01` |
| 大頭・datou-encDare-02・嗆 | 欸欸，來比一下誰帶的歌比較會炸場！ | 本規格新寫 | `chat.datou-encDare-02` |
| 大頭・datou-encDare-03・嗆 | 等等要去試音，先跟你暖個手啦！ | 本規格新寫 | `chat.datou-encDare-03` |
| 大頭・datou-encYes-01・接了 | 讚啦！開打開打，速戰速決！ | 本規格新寫 | `chat.datou-encYes-01` |
| 大頭・datou-encNo-01・改天 | 齁，好啦，下次一定要陪我喔！ | 本規格新寫 | `chat.datou-encNo-01` |
| 大頭・datou-encNo-02・改天 | 沒差沒差，我先去挖下一首要接的。 | 本規格新寫 | `chat.datou-encNo-02` |
| 大頭・datou-encLapse-01・沒理他 | 欸你在恍神喔？好啦，我等等再來堵你！ | 本規格新寫 | `chat.datou-encLapse-01` |
| 大頭・datou-encLose-01・他輸了 | 輸了輸了！我的歌你拿去，算我繳學費啦。 | 本規格新寫 | `chat.datou-encLose-01` |
| 大頭・datou-encLose-03・他輸了 | 輸了輸了！挑一張拿去，算我繳學費啦。 | 本規格新寫 | `chat.datou-encLose-03` |
| 大頭・datou-encLose-02・他輸了 | 你這幾張超會接，我要偷偷抄進歌單！ | 本規格新寫 | `chat.datou-encLose-02` |
| 大頭・datou-encWin-01・他贏了 | 嘿嘿，這盤我手感超順，像接歌接到對的拍子。 | 本規格新寫 | `chat.datou-encWin-01` |
| 大頭・datou-encWin-02・他贏了 | 贏啦！我要把這盤記進手機，週末拿來炫耀。 | 本規格新寫 | `chat.datou-encWin-02` |
| 大頭・datou-encVoid-01・作廢 | 那盤打到一半斷掉，像唱針跳掉，不算不算！ | 本規格新寫 | `chat.datou-encVoid-01` |
| 大頭・datou-trip-07・看你這一趟・切磋贏過（不分跟誰打） | 欸你切磋贏了齁！下次再跟我比，不准跑！ | 本規格新寫 | `chat.datou-trip-07` |
| 大頭・datou-trip-08・看你這一趟・切磋輸過（不分跟誰打） | 沒差啦，我放歌也常接錯，切磋輸一盤算什麼。 | 本規格新寫 | `chat.datou-trip-08` |

## 活店・切磋・阿芳

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 阿芳・afang-encDare-01・嗆 | 工讀生在顧店，我有一點空，陪我來一盤？ | 本規格新寫 | `chat.afang-encDare-01` |
| 阿芳・afang-encDare-02・嗆 | 我帶了幾張店裡常放的，想跟你比比看。 | 本規格新寫 | `chat.afang-encDare-02` |
| 阿芳・afang-encDare-03・嗆 | 我沖咖啡的手很穩，出牌應該也不會太差。 | 本規格新寫 | `chat.afang-encDare-03` |
| 阿芳・afang-encYes-01・接了 | 好呀，我們慢慢來，不用急。 | 本規格新寫 | `chat.afang-encYes-01` |
| 阿芳・afang-encNo-01・改天 | 好，不勉強，我去挑幾張下午要放的。 | 本規格新寫 | `chat.afang-encNo-01` |
| 阿芳・afang-encNo-02・改天 | 沒事，我也該回去看工讀生了。 | 本規格新寫 | `chat.afang-encNo-02` |
| 阿芳・afang-encLapse-01・沒理他 | 看你忙著，我就不打擾了，改天吧。 | 本規格新寫 | `chat.afang-encLapse-01` |
| 阿芳・afang-encLose-01・他輸了 | 這幾張陪我好多個下午，你挑一張帶走吧。 | 本規格新寫 | `chat.afang-encLose-01` |
| 阿芳・afang-encLose-03・他輸了 | 被你贏了呢，挑一張喜歡的帶回去吧。 | 本規格新寫 | `chat.afang-encLose-03` |
| 阿芳・afang-encLose-02・他輸了 | 被你打得心服口服，回去要多練練了。 | 本規格新寫 | `chat.afang-encLose-02` |
| 阿芳・afang-encWin-01・他贏了 | 哎呀，贏了，可能是今天咖啡喝得剛好。 | 本規格新寫 | `chat.afang-encWin-01` |
| 阿芳・afang-encWin-02・他贏了 | 別難過，我也是被客人一路磨出來的。 | 本規格新寫 | `chat.afang-encWin-02` |
| 阿芳・afang-encVoid-01・作廢 | 被打斷了呢，就當沒開始過，改天再約。 | 本規格新寫 | `chat.afang-encVoid-01` |
| 阿芳・afang-trip-07・看你這一趟・切磋贏過（不分跟誰打） | 看你心情很好，切磋贏了吧？該喝杯咖啡慶祝。 | 本規格新寫 | `chat.afang-trip-07` |
| 阿芳・afang-trip-08・看你這一趟・切磋輸過（不分跟誰打） | 輸了切磋別放心上，喝杯熱的就好了。 | 本規格新寫 | `chat.afang-trip-08` |

## 活店・切磋・老陳

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老陳・laochen-encDare-01・嗆 | 同學，陪老人家來一盤如何？點到為止。 | 本規格新寫 | `chat.laochen-encDare-01` |
| 老陳・laochen-encDare-02・嗆 | 老師也想放鬆一下，賞個臉來一盤？ | 本規格新寫 | `chat.laochen-encDare-02` |
| 老陳・laochen-encDare-03・嗆 | 這幾張都跟了我很久，讓你見識見識。 | 本規格新寫 | `chat.laochen-encDare-03` |
| 老陳・laochen-encYes-01・接了 | 那就請指教了，輸贏都要笑著收場。 | 本規格新寫 | `chat.laochen-encYes-01` |
| 老陳・laochen-encNo-01・改天 | 不急不急，改天有空再陪我。 | 本規格新寫 | `chat.laochen-encNo-01` |
| 老陳・laochen-encNo-02・改天 | 也好，同學先顧正事要緊。 | 本規格新寫 | `chat.laochen-encNo-02` |
| 老陳・laochen-encLapse-01・沒理他 | 同學想事情想得出神了，老人家先告退。 | 本規格新寫 | `chat.laochen-encLapse-01` |
| 老陳・laochen-encLose-01・他輸了 | 後生可畏，喜歡哪張就挑去吧。 | 本規格新寫 | `chat.laochen-encLose-01` |
| 老陳・laochen-encLose-02・他輸了 | 這一盤打得漂亮，老人家佩服。 | 本規格新寫 | `chat.laochen-encLose-02` |
| 老陳・laochen-encWin-01・他贏了 | 承讓承讓，改天再來討教。 | 本規格新寫 | `chat.laochen-encWin-01` |
| 老陳・laochen-encWin-02・他贏了 | 這盤先記著，回去複習一遍，下次會更好。 | 本規格新寫 | `chat.laochen-encWin-02` |
| 老陳・laochen-encVoid-01・作廢 | 沒考完的不打分數，那盤下次再來。 | 本規格新寫 | `chat.laochen-encVoid-01` |
| 老陳・laochen-trip-07・看你這一趟・切磋贏過（不分跟誰打） | 勝不驕，切磋贏了，下一盤更要穩。 | 本規格新寫 | `chat.laochen-trip-07` |
| 老陳・laochen-trip-08・看你這一趟・切磋輸過（不分跟誰打） | 就當是課後練習，切磋輸了不要緊。 | 本規格新寫 | `chat.laochen-trip-08` |

## 活店・切磋・周姐

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 周姐・zhoujie-encDare-01・嗆 | 年輕人，陪我玩一盤，我想看看你怎麼出。 | 本規格新寫 | `chat.zhoujie-encDare-01` |
| 周姐・zhoujie-encDare-02・嗆 | 以前在櫃檯後面只能看人打，今天換我下場。 | 本規格新寫 | `chat.zhoujie-encDare-02` |
| 周姐・zhoujie-encDare-03・嗆 | 我出手不會客氣，你也別跟我客氣。 | 本規格新寫 | `chat.zhoujie-encDare-03` |
| 周姐・zhoujie-encYes-01・接了 | 唷，爽快。那就認真來，別讓我失望。 | 本規格新寫 | `chat.zhoujie-encYes-01` |
| 周姐・zhoujie-encNo-01・改天 | 行，等你準備好再來找我。 | 本規格新寫 | `chat.zhoujie-encNo-01` |
| 周姐・zhoujie-encNo-02・改天 | 不打啊？那我再挑兩張就走。 | 本規格新寫 | `chat.zhoujie-encNo-02` |
| 周姐・zhoujie-encLapse-01・沒理他 | 想這麼久啊？我先去翻，你慢慢想。 | 本規格新寫 | `chat.zhoujie-encLapse-01` |
| 周姐・zhoujie-encLose-01・他輸了 | 好，這盤我服氣，唱片你挑。 | 本規格新寫 | `chat.zhoujie-encLose-01` |
| 周姐・zhoujie-encLose-02・他輸了 | 出得很穩，比我當年顧店時還強。 | 本規格新寫 | `chat.zhoujie-encLose-02` |
| 周姐・zhoujie-encWin-01・他贏了 | 還早呢，再多翻幾年箱子吧。 | 本規格新寫 | `chat.zhoujie-encWin-01` |
| 周姐・zhoujie-encWin-02・他贏了 | 別灰心，你這幾手已經比很多客人強了。 | 本規格新寫 | `chat.zhoujie-encWin-02` |
| 周姐・zhoujie-encVoid-01・作廢 | 中途斷掉的不算數，改天再陪你好好打。 | 本規格新寫 | `chat.zhoujie-encVoid-01` |
| 周姐・zhoujie-trip-04・看你這一趟・切磋贏過（不分跟誰打） | 切磋贏了？別急著高興，好對手還在後頭。 | 本規格新寫 | `chat.zhoujie-trip-04` |

## 活店・切磋・介面字（邀請面板、對決頂欄、戰利品列、唱片櫃；{name}＝熟客名字、${cash}＝錢）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・encTitle | {name}想跟你切磋一盤 | 本規格新寫 | `crowdUi.encTitle` |
| （畫面字）・encRisk | 輸了什麼都不扣：聲望、說情、走到第幾位都不變。 | 本規格新寫 | `crowdUi.encRisk` |
| （畫面字）・encRewardShelf | 贏了挑一張{name}的唱片收進唱片櫃，或改拿 ${cash}。 | 本規格新寫 | `crowdUi.encRewardShelf` |
| （畫面字）・encRewardBag | 贏了挑一張{name}的唱片收進包包，或改拿 ${cash}。 | 本規格新寫 | `crowdUi.encRewardBag` |
| （畫面字）・encRewardShelfAny | 贏了挑一張唱片收進唱片櫃，或改拿 ${cash}。 | 本規格新寫 | `crowdUi.encRewardShelfAny` |
| （畫面字）・encRewardBagAny | 贏了挑一張唱片收進包包，或改拿 ${cash}。 | 本規格新寫 | `crowdUi.encRewardBagAny` |
| （畫面字）・encShort | 這盤是短局：雙方聲望都只拿三分之二出來打。 | 本規格新寫 | `crowdUi.encShort` |
| （畫面字）・encHint | {name}在找你切磋：點人決定打不打，直接叫下一位就是改天。 | 本規格新寫 | `crowdUi.encHint` |
| （畫面字）・encTopSub | 短局 | 本規格新寫 | `crowdUi.encTopSub` |
| （畫面字）・encBtnYes | 來一盤 | 本規格新寫 | `crowdUi.encBtnYes` |
| （畫面字）・encBtnNo | 改天 | 本規格新寫 | `crowdUi.encBtnNo` |
| （畫面字）・encTop | 切磋・{name} | 本規格新寫 | `crowdUi.encTop` |
| （畫面字）・encSkip | 改拿 ${cash} | 本規格新寫 | `crowdUi.encSkip` |
| （畫面字）・encLootShelf | {name}的唱片：挑一張收進唱片櫃 | 本規格新寫 | `crowdUi.encLootShelf` |
| （畫面字）・encLootBag | {name}的唱片：挑一張收進包包 | 本規格新寫 | `crowdUi.encLootBag` |
| （畫面字）・encLootShelfAny | {name}的唱片你大多有了：挑一張收進唱片櫃 | 本規格新寫 | `crowdUi.encLootShelfAny` |
| （畫面字）・encLootBagAny | {name}的唱片你大多帶著了：挑一張收進包包 | 本規格新寫 | `crowdUi.encLootBagAny` |
| （畫面字）・encLootNote | 盤面上{name}的唱片補過星，收下的是原本的星數。 | 本規格新寫 | `crowdUi.encLootNote` |
| （畫面字）・encShelfToast | 收進唱片櫃了，下一趟可以帶。 | 本規格新寫 | `crowdUi.encShelfToast` |
| （畫面字）・encVoidNote | 剛剛的切磋沒打完，這盤不算，什麼都不扣。 | 本規格新寫 | `crowdUi.encVoidNote` |
| （畫面字）・encWait | 先挑完唱片或改拿錢，再叫下一位。 | 本規格新寫 | `crowdUi.encWait` |
| （畫面字）・encSrc | 切磋贏來的 | 本規格新寫 | `crowdUi.encSrc` |

## 流派試做・經典流的派系卡與本派說明（定位、被動、代價、讀法；first＝第一次觸發那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・tagline | 正面跟他比份量。 | 本規格新寫 | `factions.hall.tagline` |
| （畫面字）・passive | 同色大他 2 星以上：扣他你這張的整張星數。 | 本規格新寫 | `factions.hall.passive` |
| （畫面字）・cost | 同色平手：你扣 1。 | 本規格新寫 | `factions.hall.cost` |
| （畫面字）・read | 先看這色有沒有比他大 2 星。 | 本規格新寫 | `factions.hall.read` |
| （畫面字）・first | 經典流：同色大他 2 星，扣整張；同色平手，你扣 1。 | 本規格新寫 | `factions.hall.first` |

## 流派試做・經典流的本派選項（升級第 4 格；名字：說明）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 識貨：你的經典 +1 星（王牌不加）。 | 本規格新寫 | `factions.hall.picks[0].text` |
| （畫面字）・text | 初版：扣整張那手，再多扣 1。 | 本規格新寫 | `factions.hall.picks[1].text` |
| （畫面字）・text | 老派：每場第一次同色平手，你不扣。 | 本規格新寫 | `factions.hall.picks[2].text` |
| （畫面字）・text | 見過世面：每場第一次被剋，少扣 2（最少扣 1）。 | 本規格新寫 | `factions.hall.picks[3].text` |
| （畫面字）・text | 吸血（第二招）：扣整張那手，扣到的一半回聲望，一場最多 2。 | 本規格新寫 | `factions.hall.picks[4].text` |

## 流派試做・經典流的派樹（樂歷頁派樹分頁；名字：說明；soon＝之後開放）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 先聲奪人：扣整張那手，再多扣 1（跟「初版」疊加）。 | 本規格新寫 | `factions.hall.tree.a1.text` |
| （畫面字）・text | 挑著學：第二次本派格出兩個，挑一個學。 | 本規格新寫 | `factions.hall.tree.a2.text` |
| （畫面字）・text | 口碑：信對的手累積滿 8／6／4 手，打贏多回 1。 | 本規格新寫 | `factions.hall.tree.a3.text` |
| （畫面字）・text | 和氣：同色平手回 1 聲望（每場一次）。 | 本規格新寫 | `factions.hall.tree.b1.text` |
| （畫面字）・text | 不計較：每場第一次同色平手，你不扣。 | 本規格新寫 | `factions.hall.tree.b2.text` |
| （畫面字）・text | 老客人的面子：說情重打那場，開打聲望 +1。 | 本規格新寫 | `factions.hall.tree.b3.text` |
| （畫面字）・text | 老店（之後開放）：開局老闆多送一張唱片。 | 本規格新寫 | `factions.hall.tree.c1.text` |
| （畫面字）・text | 尋寶眼光（之後開放）：藏家寶箱更常翻到本派的頂點卡。 | 本規格新寫 | `factions.hall.tree.c2.text` |
| （畫面字）・text | 雙唱盤（之後開放）：可以帶兩張頂點卡上場。 | 本規格新寫 | `factions.hall.tree.c3.text` |

## 流派試做・冷門流的派系卡與本派說明（定位、被動、代價、讀法；first＝第一次觸發那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・tagline | 借他的份量，只讀真假。 | 本規格新寫 | `factions.pearl.tagline` |
| （畫面字）・passive | 你剋他一定剋得動，扣他那張的星數；他大你 2 星以上那手不加品味。 | 本規格新寫 | `factions.pearl.passive` |
| （畫面字）・cost | 被剋：多扣 1。 | 本規格新寫 | `factions.pearl.cost` |
| （畫面字）・read | 只讀真假，信的時候丟最小那張。 | 本規格新寫 | `factions.pearl.read` |
| （畫面字）・first | 冷門流：剋他一定剋得動，扣他那張；被剋多扣 1。 | 本規格新寫 | `factions.pearl.first` |

## 流派試做・冷門流的本派選項（升級第 4 格；名字：說明）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 有人記得：被剋不再多扣 1。 | 本規格新寫 | `factions.pearl.picks[0].text` |
| （畫面字）・text | 冷板凳：每場第一次被剋，少扣 2（最少扣 1）。 | 本規格新寫 | `factions.pearl.picks[1].text` |
| （畫面字）・text | 熟客：聲望不到一半時，打贏多回 2。 | 本規格新寫 | `factions.pearl.picks[2].text` |
| （畫面字）・text | 地下串連：聲望上限 +3，現有聲望也 +3。 | 本規格新寫 | `factions.pearl.picks[3].text` |
| （畫面字）・text | 反傷（第二招）：被剋時他也扣 2，一場最多 2 次。 | 本規格新寫 | `factions.pearl.picks[4].text` |

## 流派試做・冷門流的派樹（樂歷頁派樹分頁；名字：說明；soon＝之後開放）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 默契：同色平手回 1 聲望（每場一次）。 | 本規格新寫 | `factions.pearl.tree.a1.text` |
| （畫面字）・text | 挑著學：第二次本派格出兩個，挑一個學。 | 本規格新寫 | `factions.pearl.tree.a2.text` |
| （畫面字）・text | 識破：拆穿累積滿 8／6／4 手，打贏多回 1。 | 本規格新寫 | `factions.pearl.tree.a3.text` |
| （畫面字）・text | 有人撐腰：說情重打那場，開打聲望 +1。 | 本規格新寫 | `factions.pearl.tree.b1.text` |
| （畫面字）・text | 韌性：每場第一次比星輸，他的品味少算 1。 | 本規格新寫 | `factions.pearl.tree.b2.text` |
| （畫面字）・text | 撐住：聲望不到三分之一時，打贏多回 1。 | 本規格新寫 | `factions.pearl.tree.b3.text` |
| （畫面字）・text | 翻箱人（之後開放）：戰利品列多翻一張。 | 本規格新寫 | `factions.pearl.tree.c1.text` |
| （畫面字）・text | 尋寶眼光（之後開放）：藏家寶箱更常翻到本派的頂點卡。 | 本規格新寫 | `factions.pearl.tree.c2.text` |
| （畫面字）・text | 雙唱盤（之後開放）：可以帶兩張頂點卡上場。 | 本規格新寫 | `factions.pearl.tree.c3.text` |

## 流派試做・異端流的派系卡與本派說明（定位、被動、代價、讀法；first＝第一次觸發那手結果行補的一句）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・tagline | 賭他在唬，拆穿他。 | 本規格新寫 | `factions.heresy.tagline` |
| （畫面字）・passive | 他唬你、你剛好剋中（拆穿）：多扣 1，回 2 聲望。 | 本規格新寫 | `factions.heresy.passive` |
| （畫面字）・cost | 比星輸：多扣 1。 | 本規格新寫 | `factions.heresy.cost` |
| （畫面字）・read | 賭他在唬；他少唬的時候就信。 | 本規格新寫 | `factions.heresy.read` |
| （畫面字）・first | 異端流：拆穿多扣 1、回 2 聲望；比星輸多扣 1。 | 本規格新寫 | `factions.heresy.first` |

## 流派試做・異端流的本派選項（升級第 4 格；名字：說明）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 破音：拆穿那手再多扣 1。 | 本規格新寫 | `factions.heresy.picks[0].text` |
| （畫面字）・text | 回音：拆穿那手再多回 1 聲望。 | 本規格新寫 | `factions.heresy.picks[1].text` |
| （畫面字）・text | 臉皮厚：每場第一次比星輸，不多扣。 | 本規格新寫 | `factions.heresy.picks[2].text` |
| （畫面字）・text | 失真：你的硬蕊 +1 星（王牌不加）。 | 本規格新寫 | `factions.heresy.picks[3].text` |
| （畫面字）・text | 爆擊（第二招）：拆穿再多扣 1，比星輸不再多扣。 | 本規格新寫 | `factions.heresy.picks[4].text` |

## 流派試做・異端流的派樹（樂歷頁派樹分頁；名字：說明；soon＝之後開放）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 圈內人：同色平手回 1 聲望（每場一次）。 | 本規格新寫 | `factions.heresy.tree.a1.text` |
| （畫面字）・text | 挑著學：第二次本派格出兩個，挑一個學。 | 本規格新寫 | `factions.heresy.tree.a2.text` |
| （畫面字）・text | 破例：信對的手累積滿 10／8／6 手，打贏多回 1。 | 本規格新寫 | `factions.heresy.tree.a3.text` |
| （畫面字）・text | 留後路：說情重打那場，開打聲望 +1。 | 本規格新寫 | `factions.heresy.tree.b1.text` |
| （畫面字）・text | 刺蝟：每場第一次比星輸，他的品味少算 1。 | 本規格新寫 | `factions.heresy.tree.b2.text` |
| （畫面字）・text | 撐住：聲望不到三分之一時，打贏多回 1。 | 本規格新寫 | `factions.heresy.tree.b3.text` |
| （畫面字）・text | 地下名店（之後開放）：店裡的硬蕊 5 星唱片打八折。 | 本規格新寫 | `factions.heresy.tree.c1.text` |
| （畫面字）・text | 尋寶眼光（之後開放）：藏家寶箱更常翻到本派的頂點卡。 | 本規格新寫 | `factions.heresy.tree.c2.text` |
| （畫面字）・text | 雙唱盤（之後開放）：可以帶兩張頂點卡上場。 | 本規格新寫 | `factions.heresy.tree.c3.text` |

## 流派試做・結果行小字（{n}：整張／借／以小搏大＝這手扣他的總數，其他＝多扣／回的那一份）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・full | 正面對決：扣整張 {n} | 本規格新寫 | `factions.notes.full` |
| （畫面字）・tieCost | 平手算你輸 {n} | 本規格新寫 | `factions.notes.tieCost` |
| （畫面字）・borrow | 借他的份量：扣他 {n} | 本規格新寫 | `factions.notes.borrow` |
| （畫面字）・underdog | 以小搏大：扣他 {n} | 本規格新寫 | `factions.notes.underdog` |
| （畫面字）・cCost | 被剋：多扣 {n} | 本規格新寫 | `factions.notes.cCost` |
| （畫面字）・crit | 拆穿！多扣 {n} | 本規格新寫 | `factions.notes.crit` |
| （畫面字）・crit2 | 爆擊！多扣 {n} | 本規格新寫 | `factions.notes.crit2` |
| （畫面字）・heal | 回 {n} 聲望 | 本規格新寫 | `factions.notes.heal` |
| （畫面字）・loseCost | 比星輸：多扣 {n} | 本規格新寫 | `factions.notes.loseCost` |
| （畫面字）・leech | 吸血：回 {n} 聲望 | 本規格新寫 | `factions.notes.leech` |
| （畫面字）・thorn | 反傷：他也扣 {n} | 本規格新寫 | `factions.notes.thorn` |
| （畫面字）・spine | 刺蝟：少扣 {n} | 本規格新寫 | `factions.notes.spine` |
| （畫面字）・insider | 圈內人：回 {n} 聲望 | 本規格新寫 | `factions.notes.insider` |

## 流派試做・?fac=1&apex=1 同開：頂點卡換一格後的能力說明（這個原語的卡都換）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 這手抓到他唬你，多扣 2。 | 本規格新寫 | `factions.apexSwap.pearl.ops.theirStar.text` |
| （畫面字）・text | 這手抓到他唬你，多扣 2。 | 本規格新寫 | `factions.apexSwap.pearl.ops.pThr.text` |
| （畫面字）・text | 這手比星多算 2。 | 本規格新寫 | `factions.apexSwap.heresy.ops.crit.text` |
| （畫面字）・text | 這手比星多算 2。 | 本規格新寫 | `factions.apexSwap.heresy.ops.critLeech.text` |

## 流派試做・?fac=1&apex=1 同開：頂點卡換一格後的能力說明（指定那張）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・text | 機關槍：留著：剋中多扣 1；發動：這手比星多算 2。 | 本規格新寫 | `factions.apexSwap.heresy.cards.brotzmann-machine-gun.text` |

## 流派試做・?fac=1&apex=1 同開：換過能力那手的結果句（{d}＝多扣幾點）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・critAdd | 王牌：拆穿！多扣 {d} | 本規格新寫 | `factions.apexSwap.notes.critAdd` |

## 流派試做・?fac=1&apex=1 同開：拆穿回血的頂點卡那手，回的聲望被流派被動蓋過（取大）＝這張沒另外回

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・leechFac | 王牌：拆穿！回聲望跟流派取大，不另加 | 本規格新寫 | `factions.apexSwap.notes.leechFac` |

## 流派試做・畫面字（標題旗標章、升級第 4 格、本派說明、我的狀態、派樹分頁；{x} 由畫面代入）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・badge | 流派試做 | 本規格新寫 | `factions.ui.badge` |
| （畫面字）・badgeBoth | 流派＋頂點卡試做 | 本規格新寫 | `factions.ui.badgeBoth` |
| （畫面字）・passive | 被動 | 本規格新寫 | `factions.ui.passive` |
| （畫面字）・cost | 代價 | 本規格新寫 | `factions.ui.cost` |
| （畫面字）・second | 第二招 | 本規格新寫 | `factions.ui.second` |
| （畫面字）・pickTag | 本派 | 本規格新寫 | `factions.ui.pickTag` |
| （畫面字）・pickNote | 不加屬性 | 本規格新寫 | `factions.ui.pickNote` |
| 老闆・pickFirst | 這一級可以學一招本派的。 | 本規格新寫 | `factions.ui.pickFirst` |
| （畫面字）・mine | 本派：{list} | 本規格新寫 | `factions.ui.mine` |
| （畫面字）・mineNone | 本派：還沒學 | 本規格新寫 | `factions.ui.mineNone` |
| （畫面字）・costOff | 已取消 | 本規格新寫 | `factions.ui.costOff` |
| （畫面字）・infoTitle | {name}・{icon} | 本規格新寫 | `factions.ui.infoTitle` |
| （畫面字）・leftLeech | 吸血這場還能回 {n} 聲望 | 本規格新寫 | `factions.ui.leftLeech` |
| （畫面字）・leftThorn | 反傷這場還剩 {n} 次 | 本規格新寫 | `factions.ui.leftThorn` |
| （畫面字）・firstTip | 點頂欄這個字，看本派的被動和代價。 | 本規格新寫 | `factions.ui.firstTip` |
| （畫面字）・pickGo | 就這一派 | 本規格新寫 | `factions.ui.pickGo` |
| （畫面字）・profFar | 熟練 Lv{n}・最遠第 {far} 位 | 本規格新寫 | `factions.ui.profFar` |
| （畫面字）・profOnly | 熟練 Lv{n} | 本規格新寫 | `factions.ui.profOnly` |
| （畫面字）・swapped | 跟流派一起試，這張換過能力 | 本規格新寫 | `factions.ui.swapped` |
| （畫面字）・apexMixed | 頂點卡跟流派一起試：有幾張還沒換能力 | 本規格新寫 | `factions.ui.apexMixed` |
| （畫面字）・treeTab | 派樹 | 本規格新寫 | `factions.ui.treeTab` |
| （畫面字）・treePoints | 派點 {n} | 本規格新寫 | `factions.ui.treePoints` |
| （畫面字）・treeOf | {title}的派樹 | 本規格新寫 | `factions.ui.treeOf` |
| （畫面字）・treeCost | {n} 點 | 本規格新寫 | `factions.ui.treeCost` |
| （畫面字）・treeLv | {k}／{max} 級 | 本規格新寫 | `factions.ui.treeLv` |
| （畫面字）・treeHave | 已點 | 本規格新寫 | `factions.ui.treeHave` |
| （畫面字）・treeNeed | 先點「{name}」 | 本規格新寫 | `factions.ui.treeNeed` |
| （畫面字）・treeProf | 熟練 Lv{n} 開 | 本規格新寫 | `factions.ui.treeProf` |
| （畫面字）・treeNoPts | 派點不夠 | 本規格新寫 | `factions.ui.treeNoPts` |
| （畫面字）・treeSoon | 之後開放 | 本規格新寫 | `factions.ui.treeSoon` |
| （畫面字）・treeSoonApex | 頂點卡正式上線後開 | 本規格新寫 | `factions.ui.treeSoonApex` |
| （畫面字）・treeSoonMarket | 市集上線後開 | 本規格新寫 | `factions.ui.treeSoonMarket` |
| （畫面字）・treeRespec | 全部重配（免費） | 本規格新寫 | `factions.ui.treeRespec` |
| （畫面字）・treeHow | 這派打一趟就蓋章，10 章升一級、多 1 派點。 | 本規格新寫 | `factions.ui.treeHow` |
| （畫面字）・treePtsUp | 派點 +{n} | 本規格新寫 | `factions.ui.treePtsUp` |
| （畫面字）・goTree | 去點派樹 | 本規格新寫 | `factions.ui.goTree` |
| （畫面字）・treeOffNote | 關掉樂歷時，派樹也不算。 | 本規格新寫 | `factions.ui.treeOffNote` |
| （畫面字）・treeStart | 本派格先出：{list} | 本規格新寫 | `factions.ui.treeStart` |
| （畫面字）・deepWin | {name}：多回 {n} 聲望 | 本規格新寫 | `factions.ui.deepWin` |
| （畫面字）・pleaHp | 老客人的面子：聲望 +{n} | 本規格新寫 | `factions.ui.pleaHp` |
| （畫面字）・treeFirstHow | 升級的本派格先出它；學了照樣佔那一級。 | 本規格新寫 | `factions.ui.treeFirstHow` |
| （畫面字）・treeDep | 先退「{name}」 | 本規格新寫 | `factions.ui.treeDep` |
| （畫面字）・deepNow | {name}：記了 {h}／{per} 手，記滿那場打贏多回 1 | 本規格新寫 | `factions.ui.deepNow` |
| （畫面字）・treeMine | 派樹：{list} | 本規格新寫 | `factions.ui.treeMine` |
| （畫面字）・treeLvN | {k} 級 | 本規格新寫 | `factions.ui.treeLvN` |

## 流派試做・畫面字（派樹的路線名）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・a | 本派 | 本規格新寫 | `factions.ui.treePath.a` |
| （畫面字）・b | 抵代價 | 本規格新寫 | `factions.ui.treePath.b` |
| （畫面字）・c | 收藏 | 本規格新寫 | `factions.ui.treePath.c` |

## 流派試做・畫面字（本派說明：深耕記的一手是什麼）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字）・honest | 一手＝信他明指的那色、他照實出、你剋中 | 本規格新寫 | `factions.ui.deepHow.honest` |
| （畫面字）・caught | 一手＝他唬你、你剛好剋中（拆穿） | 本規格新寫 | `factions.ui.deepHow.caught` |

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
| （畫面字） | 收音機 | 本規格新寫 | `shops/dip.json.props[17].hot.label` |
| （畫面字） | 搖滾 | 本規格新寫 | `shops/dip.json.props[18].bin.label` |
| （畫面字） | 電子 | 本規格新寫 | `shops/dip.json.props[19].bin.label` |
| （畫面字） | 靈魂放克 | 本規格新寫 | `shops/dip.json.props[20].bin.label` |
| （畫面字） | 嘻哈 R&B | 本規格新寫 | `shops/dip.json.props[21].bin.label` |
| （畫面字） | 城市流行 | 本規格新寫 | `shops/dip.json.props[22].bin.label` |
| （畫面字） | 古典 | 本規格新寫 | `shops/dip.json.props[23].bin.label` |
| （畫面字） | 世界 | 本規格新寫 | `shops/dip.json.props[24].bin.label` |
| （畫面字） | 民謠 | 本規格新寫 | `shops/dip.json.props[25].bin.label` |
| （畫面字） | 爵士 | 本規格新寫 | `shops/dip.json.props[26].bin.label` |
| （畫面字） | 台灣 | 本規格新寫 | `shops/dip.json.props[27].bin.label` |
| （畫面字） | 試聽機 | 本規格新寫 | `shops/dip.json.props[28].hot.label` |
| （畫面字） | 新進 | 本規格新寫 | `shops/dip.json.props[30].bin.label` |
| （畫面字） | 特價區 | 本規格新寫 | `shops/dip.json.props[31].bin.label` |
| （畫面字） | 櫃檯 | 本規格新寫 | `shops/dip.json.props[32].hot.label` |
| （畫面字） | 對戰台 | 本規格新寫 | `shops/dip.json.props[34].hot.label` |
| （畫面字） | 公告 | 本規格新寫 | `shops/dip.json.hotspots[0].label` |
| （畫面字） | 老闆 | 本規格新寫 | `shops/dip.json.hotspots[1].label` |

## 店內名牌（shops/home.json）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 你家 | 本規格新寫 | `shops/home.json.name` |
| （畫面字） | 聆聽室 | 本規格新寫 | `shops/home.json.district` |
| （畫面字） | 回店裡 | 本規格新寫 | `shops/home.json.props[2].hot.label` |
| （畫面字） | 唱片架 | 本規格新寫 | `shops/home.json.props[3].hot.label` |
| （畫面字） | 唱盤 | 本規格新寫 | `shops/home.json.props[8].hot.label` |
| （畫面字） | 控制台 | 本規格新寫 | `shops/home.json.props[9].hot.label` |

## 店內名牌（shops/taipei.json）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 台北市 | 本規格新寫 | `shops/taipei.json.name` |
| （畫面字） | 踢館地圖（示意） | 本規格新寫 | `shops/taipei.json.district` |
| （畫面字） | dip vinyl（本店） | 本規格新寫 | `shops/taipei.json.props[2].hot.label` |
| （畫面字） | 你家 | 本規格新寫 | `shops/taipei.json.props[3].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[4].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[5].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[6].hot.label` |
| （畫面字） | ？？？（還沒開） | 本規格新寫 | `shops/taipei.json.props[7].hot.label` |

## 推薦語・王牌（殿堂）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Radiohead《OK Computer》 | 「九七年的焦慮，到現在還沒退流行。」 | 本規格新寫 | `pitch#radiohead|ok computer` |

## 推薦語・王牌（流亡）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Zodiac》 | 「六六年在巴黎錄的。全台灣大概沒幾張。」 | 本規格新寫 | `pitch#barney wilen|zodiac` |

## 推薦語・店裡的箱子（FEATURE）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Can《Ege Bamyasi》 | 「鼓手一個人就是一台機器。聽完你會想去學打鼓。」 | 本規格新寫 | `pitch#can|ege bamyasi` |
| Einstürzende Neubauten《Halber Mensch》 | 「他們的樂器有一半是工地撿來的。」 | 本規格新寫 | `pitch#einstürzende neubauten|halber mensch` |
| Hermeto Pascoal《Zabumbê-bum-á》 | 「巴西的老頭，連水壺都拿來吹。這張我不太借人。」 | 本規格新寫 | `pitch#hermeto pascoal|zabumbê-bum-á` |
| 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 「那個年代的日本，有人在錄這種東西。我手上就這一張。」 | 本規格新寫 | `pitch#富樫雅彦|we now create - music for strings, winds and percussions` |

## 推薦語・老闆四張・殿堂

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Beverly Glenn-Copeland《...Keyboard Fantasies...》 | 「八六年他自己出的卡帶。快三十年後，京都一家唱片行寫信來問還有沒有貨。」 | 本規格新寫 | `pitch#beverly glenn-copeland|...keyboard fantasies...` |
| Daft Punk《Random Access Memories》 | 「兩個機器人這次找真的樂手進錄音室。〈Get Lucky〉那年走到哪都聽得到。」 | 本規格新寫 | `pitch#daft punk|random access memories` |
| Miles Davis《Cookin' with the Miles Davis Quintet》 | 「第一代五重奏：Coltrane、Red Garland、Paul Chambers、Philly Joe Jones。第一首〈My Funny Valentine〉，小號輕得像在耳邊說話。」 | 本規格新寫 | `pitch#miles davis|cookin' with the miles davis quintet` |
| Brian Eno《Ambient 1: Music for Airports》 | 「他在機場等飛機時想到的。幾段長短不一的錄音帶一直繞，越聽越安靜。」 | 本規格新寫 | `pitch#brian eno|ambient 1: music for airports` |

## 推薦語・老闆四張・流亡

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Charles Brackeen《Rhythm X》 | 「Ornette 的老班底幾乎都來了，主角卻是一個沒什麼人知道的薩克斯風手。」 | 本規格新寫 | `pitch#charles brackeen|rhythm x` |
| 黃小楨《賞味期限》 | 「九〇年代末的台北，有人這樣唱過。」 | 本規格新寫 | `pitch#黃小楨|賞味期限` |
| 傷心欲絕《我愛您》 | 「錄音很粗，心很細。」 | 本規格新寫 | `pitch#傷心欲絕|我愛您` |

## 推薦語・老闆四張・異端

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Melt-Banana《Speak Squeak Creak》 | 「東京的地下室，三分鐘裡塞了十首歌。」 | 本規格新寫 | `pitch#melt-banana|speak squeak creak` |
| Pharoah Sanders《Tauhid》 | 「前面很安靜。後面不要被嚇到。」 | 本規格新寫 | `pitch#pharoah sanders|tauhid` |
| Magma《Mëkanïk Dëstruktïw Kömmandöh》 | 「法國的鼓手自創了一種語言，整張都用它來唱。」 | 本規格新寫 | `pitch#magma|mëkanïk dëstruktïw kömmandöh` |

## 推薦語・舊特價箱（2026-11-16 換下，只剩舊存檔）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Blur《The Great Escape》 | 「那年單曲贏了 Oasis，專輯輸了。」 | 本規格新寫 | `pitch#blur|the great escape` |
| The Velvet Underground《Squeeze》 | 「掛著 Velvet 的名字，裡面一個創團的人都沒有。」 | 本規格新寫 | `pitch#the velvet underground|squeeze` |
| Stevie Wonder《Eivets Rednow》 | 「名字倒過來寫就是他。那年他才十八歲。」 | 本規格新寫 | `pitch#stevie wonder|eivets rednow` |
| The Kinks《Preservation Act 1》 | 「搖滾歌劇的第一幕。第二幕更長。」 | 本規格新寫 | `pitch#the kinks|preservation act 1` |
| Metallica《Reload》 | 「上一張的剩菜，隔年再端出來一次。」 | 本規格新寫 | `pitch#metallica|reload` |
| Weezer《Van Weezer》 | 「學八〇年代的長髮金屬，學得很認真。」 | 本規格新寫 | `pitch#weezer|van weezer` |
| Ramones《Halfway to Sanity》 | 「第十張了，還是那三個和弦。」 | 本規格新寫 | `pitch#ramones|halfway to sanity` |

## 推薦語・特價箱

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Oasis《Dig Out Your Soul》 | 「他們最後一張。兄弟倆隔年就拆夥了。」 | 本規格新寫 | `pitch#oasis|dig out your soul` |
| David Bowie《Never Let Me Down》 | 「連鮑伊都有這種時候。」 | 本規格新寫 | `pitch#david bowie|never let me down` |
| Lady Gaga《ARTPOP》 | 「發片前說要掀起一場藝術革命。賣得比上一張少了一大截。」 | 本規格新寫 | `pitch#lady gaga|artpop` |
| Arcade Fire《Everything Now》 | 「整張在嘲笑消費主義，結果被樂評嘲笑得更兇。」 | 本規格新寫 | `pitch#arcade fire|everything now` |
| The Strokes《Angles》 | 「主唱很少進錄音室，人聲錄好再用 email 寄給團員。」 | 本規格新寫 | `pitch#the strokes|angles` |
| Queensrÿche《Take Cover》 | 「一整張都在唱別人的歌。」 | 本規格新寫 | `pitch#queensrÿche|take cover` |
| Megadeth《Risk》 | 「鞭擊金屬改走流行搖滾，專輯名就叫《冒險》。」 | 本規格新寫 | `pitch#megadeth|risk` |
| KISS《Hot in the Shade》 | 「卸了妝的那幾年。一張塞了十五首。」 | 本規格新寫 | `pitch#kiss|hot in the shade` |
| Limp Bizkit《Gold Cobra》 | 「吉他手回團，隔了八年的新專輯。聽起來還停在 2000 年。」 | 本規格新寫 | `pitch#limp bizkit|gold cobra` |
| Eminem《Revival》 | 「被罵得太兇，他隔年突襲發了一張專輯罵回去。」 | 本規格新寫 | `pitch#eminem|revival` |
| Daft Punk《Human After All》 | 「據說六個禮拜就錄完。這些歌到了巡演現場才真正活過來。」 | 本規格新寫 | `pitch#daft punk|human after all` |
| The Weeknd《Kiss Land》 | 「三張混音帶之後的第一張正式專輯。他說靈感來自恐怖片。」 | 本規格新寫 | `pitch#the weeknd|kiss land` |

## 推薦語・客人的唱片（二手店老闆）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| Barney Wilen《Moshi》 | 「七〇年他跟著拍片的人去了非洲，回來就做了這張。」 | 本規格新寫 | `pitch#barney wilen|moshi` |
| Tony Scott & The Indonesian All Stars《Djanger Bali》 | 「印尼的樂手配一支美國單簧管。這張我找了好幾年。」 | 本規格新寫 | `pitch#tony scott & the indonesian all stars|djanger bali` |

## 推薦語・客人的唱片（音響發燒友）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| John Zorn《Cobra》 | 「照一套遊戲規則即興出來的。跟你們今晚在做的事，差不多。」 | 本規格新寫 | `pitch#john zorn|cobra` |

## 活店・周姐的藝人介紹摘句（抽樣 30 句；原文照抄主站已審的藝人介紹，不逐句審）

> 畫面上：周姐說「{藝人}啊，我記得介紹上寫：」→ 摘句泡泡（下緣灰字「藝人介紹・{藝人}」）。全部 581 位、642 句在 `game-lab/lore.json`（`node game-lab/tools/build-lore.mjs` 產生；每句都是主站藝人介紹的原文子字串）。讀起來怪的，告訴主線加進 build-lore 的排除表。

| 藝人 | 摘句 |
|---|---|
| Adele | Adele 生於倫敦北部的 Tottenham，由年輕的單親媽媽在勞工階級社區養大。 |
| Arturo Benedetti Michelangeli | 1920 年生於義大利布雷夏一帶，由父親啟蒙，後進米蘭音樂院，約 14 歲修完學業。 |
| Blueboy | 2024 年樂團重聚，錄下新單曲〈One〉。 |
| Brigitte Fontaine | 1939 年生於布列塔尼，從小愛讀書與戲劇，到巴黎學戲後，改在酒館與劇場唱自己寫的歌。 |
| Davy Graham | 1960 年代初他推廣 DADGAD 調弦，據說是在摩洛哥為了彈出烏德琴的音色摸索出來的。 |
| Falco | 〈Rock Me Amadeus〉1986 年登上美國冠軍，被稱為唯一登頂的德語歌曲。 |
| Feist | Leslie Feist 生於新斯科細亞省，隨母親一路往西搬，落腳 Calgary。 |
| Jambinai | 首張專輯《차연》拿下韓國大眾音樂獎最佳跨界專輯，他們也在平昌冬奧閉幕式與玄琴樂團同台。 |
| John Barbirolli | 1899 年生於倫敦，父親是義大利人、母親是法國人，家裡都是職業樂手。 |
| Karlheinz Stockhausen | 2001 年獲北極星音樂獎，頒獎詞稱他五十年來一直站在音樂發展的最前線。 |
| Kelela | Kelela 1983 年生於華盛頓特區，是二代衣索比亞裔美國人，從小學小提琴、唱合唱團。 |
| Minnie Riperton | Mariah Carey 曾說，沒有 Minnie Riperton 就沒有今天的她。 |
| Moor Mother | 2023 年她獲頒德國爵士獎的國際年度藝術家。 |
| Mylène Farmer | 1961 年生於加拿大魁北克的蒙特婁近郊，父母是法國人，約 8 歲隨家人回到巴黎近郊。 |
| PJ Harvey | PJ Harvey 起初是個三人團，《Rid of Me》巡演後解散，她以這個名字獨自繼續。 |
| Roberto Goyeneche | 1980 年代起嗓音變得沙啞，被形容成「沙子堵在喉嚨裡」，人氣卻不減。 |
| Saccharine Trust | 1981 年以 EP《Paganicons》在 SST 出道。 |
| Scientist | 1980 年代初，他把 Roots Radics 的底軌混成一系列以電玩與科幻為題的專輯。 |
| Sean Paul | 1973 年生於金斯敦，家族混有非裔牙買加、英國、華人與葡萄牙裔猶太人血統。 |
| Simone | 奧地利爵士歌手，全名 Simone Kopmajer，1981 年生於施蒂利亞邦的施拉德明。 |
| Songs: Ohia | Jason Molina 以 Songs: Ohia 為名創作。 |
| Steve Reich | 1960 年代他讓錄音帶迴圈逐漸錯開，以這種相位位移聽出交錯的節奏。 |
| Sébastien Tellier | 2008 年他代表法國參加歐洲歌唱大賽，2025 年獲頒法國藝術與文學騎士勳章。 |
| Xscape | 1990 年在亞特蘭大一帶成軍，成員從教會唱起，Scott 姊妹從小被當成福音歌手栽培。 |
| Yoko Ono | 1969 年她與 John Lennon 結婚，共組 Plastic Ono Band。 |
| ちあきなおみ | ちあきなおみ 本名瀬川三恵子，1969 年以〈雨に濡れた慕情〉出道。 |
| 嘉手苅林昌 | 1920 年生於沖繩越來村，村子舊址如今位在嘉手納基地內。 |
| 森進一 | 從 1968 年起，他連年登上 NHK 紅白歌合戰，直到 2015 年才告別，也獲頒旭日小綬章。 |
| 老王樂隊 | 2025 年底，樂團在簡單生活節上宣布暫時休團。 |
| 那我懂你意思了 | 解散近十年後，原班四人在 2025 年宣布回歸，復出首場在台北的野人祭登場，台下擠滿樂迷。 |

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
| 原句 | 「這張放出來客人會跑光……我喜歡。」 | `pitch#swans|filth` |
| 原句 | 「柏林時期第一張，B 面幾乎沒有人聲。第一次聽會覺得怪，第三次就回不去了。」 | `pitch#david bowie|low` |
| 原句 | 「1970 年出的時候沒人要，她就去鄉下住了三十年。後來全世界都在找這張。」 | `pitch#vashti bunyan|just another diamond day` |
| 原句 | 「六〇年代的情歌王子，隔了幾十年交出這張。第一首就把客人嚇走。」 | `pitch#scott walker|tilt` |
| 原句 | 「『後搖滾』這三個字，就是樂評為了形容這張才用起來的。」 | `pitch#bark psychosis|hex` |
| 原句 | 「B 面那首十七分鐘。據說錄音師錄到一半就走人了。」 | `pitch#the velvet underground|white light-white heat` |
