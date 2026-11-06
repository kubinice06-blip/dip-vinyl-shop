# 台詞審稿：品味對決・試做版（LINES-REVIEW）

> 由 `node game-lab/tools/lint-copy.mjs` 產生，請勿手改。要改句子，直接改 `game-lab/content.js`（劇本、台詞、提示、事件）或 `game-lab/tools/pitches.json`（推薦語，改完重跑 `node game-lab/tools/bake-cards.mjs`），再重跑本檢查。
> 這份只列**新句**（試做版新寫、或取自四份概念稿，店主還沒看過）。標成「原句」「拍板」的句子已與現行 `roguelike.html` 逐字比對（36 句，全部一致才會產生這份）。

統計：原句 34、拍板 2、新 171（同一句在有聲／安靜兩版序章只算一次）。

## 序章（有聲音）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 剛才那段，是哪一張？ | 本規格新寫 | `script.prologue[4].prompt` |
| （畫面字） | 好耳朵：今晚每場開局氣勢 +1 | 本規格新寫 | `script.prologue[5].stamp` |
| 老闆 | 「不是這張。不過，你挑的這張也不壞。」 | 本規格新寫 | `script.prologue[6]` |
| 旁白 | （點封套換著聽，挑一張帶走。） | 本規格新寫 | `script.prologue[7]` |
| 老闆 | 「門口那箱一百塊三張，順手帶著。」 | 本規格新寫 | `script.prologue[10]` |
| （畫面字） | ▶ 品味對決 | 本規格新寫 | `script.prologue[16].prompt` |

## 序章（安靜）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | （挑一張帶走。） | 本規格新寫 | `script.quietPrologue[4].prompt` |

## 序章收尾

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 他的袋子裡掉出一張盤。 | 本規格新寫 | `script.epilogueWin[2]` |
| 老闆 | 「……他每個禮拜都來聽這張。」 | 本規格新寫 | `script.epilogueWin[3]` |

## 配件挑完 → 地圖

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

## 老闆（對決外的小聲提點）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆・retry | ……再一場。 | 本規格新寫 | `lines.owner.retry` |
| 老闆・gold | 這張……本來沒要賣的。 | 本規格新寫 | `lines.owner.gold` |
| 老闆・listenRight | 對，就是這張。 | 本規格新寫 | `lines.owner.listenRight` |
| 老闆・listenWrong | 是這張。下次就認得了。 | 本規格新寫 | `lines.owner.listenWrong` |
| 老闆・tea | 茶還燙，慢慢喝。 | 本規格新寫 | `lines.owner.tea` |
| 老闆・wash | 洗乾淨了，聲音會回來一點。 | 本規格新寫 | `lines.owner.wash` |
| 老闆・bagFull | 包包滿了。先拿一張出來。 | 本規格新寫 | `lines.owner.bagFull` |

## 你

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 你・revive | 還沒完。 | 本規格新寫 | `lines.player.revive` |

## 對決台詞・男子

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 男子・bubble | 這張排行榜第一名欸。 | 概念稿 C | `lines.man.bubble[0]` |
| 男子・bubble | 大家都在聽這個啦。 | 本規格新寫 | `lines.man.bubble[1]` |
| 男子・countered | 你那什麼？聽都沒聽過。 | 概念稿 B | `lines.man.countered[0]` |
| 男子・hit | 看吧，大家都聽這個。 | 本規格新寫 | `lines.man.hit[0]` |
| 男子・faceChange | 你很會嘛？再出{lastAttr}試試看！ | 概念稿 A | `lines.man.faceChange` |
| 男子・win | 回家多聽兩年再來啦。 | 概念稿 A | `lines.man.win` |

## 對決台詞・那張我有

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 那張我有・intro | 欸你那張哪裡買的？ | 概念稿 C | `lines.copycat.intro` |
| 那張我有・bubble | 我也有！我也有！ | 概念稿 D | `lines.copycat.bubble[0]` |
| 那張我有・bubble | 最近大家都在聽這種的吧？ | 概念稿 A | `lines.copycat.bubble[1]` |
| 那張我有・countered | 等等，我先查一下這張是誰。 | 概念稿 D | `lines.copycat.countered[0]` |
| 那張我有・hit | 你剛剛那招，我學起來了。 | 概念稿 C | `lines.copycat.hit[0]` |
| 那張我有・faceChange | 欸你剛那張叫什麼？我馬上下單。 | 概念稿 D | `lines.copycat.faceChange` |
| 那張我有・ultWarn | 這張我也有，而且是彩膠。 | 本規格新寫 | `lines.copycat.ultWarn` |
| 那張我有・lose | 我回去也要買一張。 | 概念稿 A | `lines.copycat.lose[0]` |
| 那張我有・win | 那張我有，兩張。 | 本規格新寫 | `lines.copycat.win` |

## 對決台詞・我早就聽過

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 我早就聽過・intro | 這張？我高中就聽過了。 | 概念稿 D | `lines.already.intro` |
| 我早就聽過・bubble | 真正懂的人都知道…… | 概念稿 D | `lines.already.bubble[0]` |
| 我早就聽過・bubble | 學弟，這張要聽原版。 | 概念稿 A | `lines.already.bubble[1]` |
| 我早就聽過・countered | 哼。這招我早就聽過。 | 概念稿 D | `lines.already.countered[0]` |
| 我早就聽過・hit | 你放的我都有，我的還是日版側標。 | 概念稿 B | `lines.already.hit[0]` |
| 我早就聽過・faceChange | 這張日本盤有 bonus track，你知道嗎？ | 概念稿 D | `lines.already.faceChange` |
| 我早就聽過・habit | ……其實我也想聽聽看你那張。 | 本規格新寫 | `lines.already.habit` |
| 我早就聽過・ultWarn | 這張的初版，我也有。 | 本規格新寫 | `lines.already.ultWarn` |
| 我早就聽過・lose | ……這張我真的沒聽過。可以借我嗎？ | 概念稿 B | `lines.already.lose[0]` |
| 我早就聽過・win | 回去把黑膠版聽完再來。 | 概念稿 A | `lines.already.win` |

## 對決台詞・針壓強迫症

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 針壓強迫症・intro | 你這張是幾版？ | 概念稿 D | `lines.needle.intro` |
| 針壓強迫症・bubble | 我的器材比較準。 | 概念稿 D | `lines.needle.bubble[0]` |
| 針壓強迫症・countered | 一定是你的唱針沒調好。 | 概念稿 D | `lines.needle.countered[0]` |
| 針壓強迫症・hit | 你最大那張，我盯很久了。 | 本規格新寫 | `lines.needle.hit[0]` |
| 針壓強迫症・faceChange | 你的唱針該換了。 | 概念稿 D | `lines.needle.faceChange` |
| 針壓強迫症・habit | 剛剛那手，我記下來了。 | 本規格新寫 | `lines.needle.habit` |
| 針壓強迫症・ultWarn | 針壓兩克，剛剛好。 | 本規格新寫 | `lines.needle.ultWarn` |
| 針壓強迫症・lose | ……我回去重新校正。 | 概念稿 D | `lines.needle.lose[0]` |
| 針壓強迫症・win | 先把唱臂調平再來。 | 本規格新寫 | `lines.needle.win` |

## 對決台詞・跳針王

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 跳針王・intro | 欸，這段剛剛是不是聽過了？ | 概念稿 B | `lines.skip.intro` |
| 跳針王・bubble | 我這台唱盤很有個性。 | 概念稿 B | `lines.skip.bubble[0]` |
| 跳針王・bubble | 看看就好，不要摸。 | 概念稿 A | `lines.skip.bubble[1]` |
| 跳針王・countered | ……喔，順了。 | 本規格新寫 | `lines.skip.countered[0]` |
| 跳針王・hit | 跳針啦！ | 概念稿 B | `lines.skip.hit[0]` |
| 跳針王・faceChange | 少年仔，這張你阿公那時陣就在聽了。 | 概念稿 C | `lines.skip.faceChange` |
| 跳針王・ultWarn | 這段再來一次！ | 本規格新寫 | `lines.skip.ultWarn` |
| 跳針王・lose | ……我真的該換唱針了。 | 概念稿 B | `lines.skip.lose[0]` |
| 跳針王・win | 好聽的段落，就是要多聽幾次。 | 本規格新寫 | `lines.skip.win` |

## 對決台詞・月底吃土

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 月底吃土・intro | 這個月又爆預算了…… | 概念稿 D | `lines.broke.intro` |
| 月底吃土・bubble | 隨便啦，反正都刷了。 | 概念稿 D | `lines.broke.bubble[0]` |
| 月底吃土・countered | 我的伙食費…… | 概念稿 D | `lines.broke.countered[0]` |
| 月底吃土・hit | 這張是我這個月的便當錢。 | 本規格新寫 | `lines.broke.hit[0]` |
| 月底吃土・faceChange | 這個月的伙食費，全押了！ | 概念稿 D | `lines.broke.faceChange` |
| 月底吃土・habit | 其實我根本還沒拆封。 | 本規格新寫 | `lines.broke.habit` |
| 月底吃土・ultWarn | 信用卡，刷下去！ | 本規格新寫 | `lines.broke.ultWarn` |
| 月底吃土・lose | 這張……先寄放你那邊。 | 概念稿 D | `lines.broke.lose[0]` |
| 月底吃土・win | 贏了，這禮拜可以吃滷肉飯加蛋。 | 本規格新寫 | `lines.broke.win` |

## 對決台詞・剁手黨

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 剁手黨・intro | 這三張我都買兩份，一份聽、一份收。 | 概念稿 B | `lines.buyer.intro` |
| 剁手黨・bubble | 月底？月底再說。 | 概念稿 B | `lines.buyer.bubble[0]` |
| 剁手黨・countered | 沒關係，我再買一張。 | 本規格新寫 | `lines.buyer.countered[0]` |
| 剁手黨・hit | 又入手一張！ | 概念稿 B | `lines.buyer.hit[0]` |
| 剁手黨・faceChange | 限量彩膠，最後一張了喔。 | 概念稿 D | `lines.buyer.faceChange` |
| 剁手黨・ultWarn | 全部帶走，不用包！ | 本規格新寫 | `lines.buyer.ultWarn` |
| 剁手黨・lose | ……我先去領個錢。 | 概念稿 B | `lines.buyer.lose[0]` |
| 剁手黨・win | 謝謝光臨，下次請早。 | 本規格新寫 | `lines.buyer.win` |

## 對決台詞・冷門仙人

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 冷門仙人・intro | 這張全世界只壓了三百張。我有兩張。 | 概念稿 B | `lines.label.intro` |
| 冷門仙人・bubble | 你沒聽過很正常。 | 概念稿 B | `lines.label.bubble[0]` |
| 冷門仙人・bubble | 拿主流盤來？ | 概念稿 A | `lines.label.bubble[1]` |
| 冷門仙人・countered | 嗯，有點東西。 | 概念稿 D | `lines.label.countered[0]` |
| 冷門仙人・hit | 這張壓了三百張，到現在還賣不完。 | 概念稿 A | `lines.label.hit[0]` |
| 冷門仙人・faceChange | 這張的母帶，只有我有。 | 概念稿 D | `lines.label.faceChange` |
| 冷門仙人・habit | 你手上那張，我們廠牌也發過。 | 本規格新寫 | `lines.label.habit` |
| 冷門仙人・ultWarn | 音量開到十一。 | 概念稿 D | `lines.label.ultWarn` |
| 冷門仙人・lose | ……下一批，算你一張。 | 概念稿 A | `lines.label.lose[0]` |
| 冷門仙人・win | 旋律太多了，下次少一點。 | 本規格新寫 | `lines.label.win` |

## 對決台詞・名盤守門員

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 名盤守門員・intro | 我寫過這張的樂評。 | 概念稿 A | `lines.critic.intro` |
| 名盤守門員・bubble | 這張我在專欄寫過三千字。 | 概念稿 C | `lines.critic.bubble[0]` |
| 名盤守門員・countered | ……我會寫進專欄。 | 概念稿 A | `lines.critic.countered[0]` |
| 名盤守門員・hit | 三顆星，不能再多。 | 概念稿 A | `lines.critic.hit[0]` |
| 名盤守門員・faceChange | 你懂什麼叫脈絡嗎？ | 概念稿 C | `lines.critic.faceChange` |
| 名盤守門員・habit | 你那張，我也給過五顆星。 | 本規格新寫 | `lines.critic.habit` |
| 名盤守門員・ultWarn | 這篇樂評，今晚就上稿。 | 本規格新寫 | `lines.critic.ultWarn` |
| 名盤守門員・lose | ……這張，我重寫一篇。 | 本規格新寫 | `lines.critic.lose[0]` |
| 名盤守門員・win | 回去把年表背熟。 | 本規格新寫 | `lines.critic.win` |

## 對決台詞・傳說藏家

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 傳說藏家・bubble | 你猜，我這手是真的嗎？ | 概念稿 A | `lines.boss.bubble[0]` |
| 傳說藏家・countered | 有意思。 | 本規格新寫 | `lines.boss.countered[0]` |
| 傳說藏家・hit | 這張，我三十年前就有了。 | 概念稿 B | `lines.boss.hit[0]` |
| 傳說藏家・faceChange | ……翻面。讓我看看你手上拿的是什麼。 | 概念稿 A | `lines.boss.faceChange` |
| 傳說藏家・habit | 你最大那張，我也有。 | 本規格新寫 | `lines.boss.habit` |
| 傳說藏家・ultWarn | 收藏是一種病。我病了五十年。 | 概念稿 C | `lines.boss.ultWarn` |
| 傳說藏家・aceOut | 這張，我只在打烊之後放。 | 概念稿 B | `lines.boss.aceOut` |
| 傳說藏家・lose | ……這張，送你。三十年前，我也是這樣拿到的。 | 概念稿 A | `lines.boss.lose[0]` |

## 老闆小聲提點（即時提示）

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 他喊經典。冷門剋經典。 | 本規格新寫 | `hints.h_counter` |
| 老闆 | 格子顏色＝他會出的；數字＝結果。 | 本規格新寫 | `hints.h_forecast` |
| 老闆 | 他惱羞了。四格是「晃」。 | 本規格新寫 | `hints.h_face` |
| 老闆 | 晃：出剋你剋招的那個。 | 本規格新寫 | `hints.h_feint` |
| 老闆 | 氣勢滿了。現在放，或存到更痛。 | 本規格新寫 | `hints.h_ult` |
| 老闆 | 王牌每場一次，被剋就白用。 | 本規格新寫 | `hints.h_ace` |
| 老闆 | 他要輾壓。出剋它的盤割捨防禦。 | 本規格新寫 | `hints.h_eult` |
| 老闆 | 你的王牌剋得到它：七星回擊。 | 本規格新寫 | `hints.h_reflect` |
| 老闆 | 相生：經→冷→硬→經，加氣勢。 | 本規格新寫 | `hints.h_chain` |
| 老闆 | 點播的盤，出招 +2。 | 本規格新寫 | `hints.h_request` |
| 老闆 | 跟＝出你上一手。 | 本規格新寫 | `hints.h_copy` |
| 老闆 | 報＝剋你上一手。 | 本規格新寫 | `hints.h_grudge` |
| 老闆 | 盯＝剋你最大張。 | 本規格新寫 | `hints.h_eye` |
| 老闆 | ？＝還沒看過的習慣。 | 本規格新寫 | `hints.h_hidden` |
| 老闆 | 不剋他，跳針就越疊越大聲。 | 本規格新寫 | `hints.h_skip` |
| 老闆 | 王牌被剋：這手互不傷害。 | 本規格新寫 | `hints.h_hegemony` |

## 「？」小抄

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| （畫面字） | 冷門剋經典・經典剋硬蕊・硬蕊剋冷門。剋中：賭注＋（你的星－他那張同屬性的星，不會是負的）。撞招：同屬性比星，差多少打多少。相生：經→冷→硬→經，2 連 +1 氣勢、3 連 +2 氣勢再 +2 傷害。氣場唱盤：六格隨機落一格。真＝照喊的出；晃＝出剋你剋招的；跟＝出你上一手；報＝剋你上一手；盯＝剋你最大張；？＝還沒看過。氣勢 6 起可放品味輾壓：傷害＝當下氣勢，他這手作廢。 | 本規格新寫 | `help` |

## 發燒配件

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 老闆 | 戴上這個。誰在說謊，聽得出來。（監聽耳機） | 本規格新寫 | `relics.headphone.line` |

## 事件・躲雨的外送員

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 外送員衝進來躲雨，耳機漏音大到整間店都聽得到。 | 本規格新寫 | `events.delivery.text` |
| 選項 | 借他毛巾｜回 4 聲望｜→ 他點點頭，雨還在下。 | 本規格新寫 | `events.delivery.options[0]` |
| 選項 | 推薦他一張｜從包包挑一張送他，下一場開局氣勢 +3（包包 6 張以上）｜→ 他說下次會來買。 | 本規格新寫 | `events.delivery.options[1]` |

## 事件・滷味攤阿姨

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 隔壁滷味攤的阿姨來借插座，順手塞給你一包米血。 | 本規格新寫 | `events.auntie.text` |
| 選項 | 吃｜回 5 聲望｜→ 米血還是熱的。 | 本規格新寫 | `events.auntie.options[0]` |
| 選項 | 回送她一張盤｜從包包挑一張送她，拿到「會員集點卡」（已有則回 5 聲望；包包 6 張以上）｜→ 她從圍裙口袋掏出一張集點卡：「這間我很熟，拿去。」 | 本規格新寫 | `events.auntie.options[1]` |

## 事件・店貓

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 店貓睡在你想翻的那箱上。 | 本規格新寫 | `events.cat.text` |
| 選項 | 等牠醒｜回 3 聲望｜→ 牠伸了個懶腰，換到隔壁那箱繼續睡。 | 本規格新寫 | `events.cat.options[0]` |
| 選項 | 輕輕抽出來｜拿到那箱最上面那張（先亮給你看），被抓一下 −3 聲望｜→ 抽出來了。手背多了三條紅線。 | 本規格新寫 | `events.cat.options[1]` |

## 事件・明天要不要排

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 一位客人在櫃檯問大家：明天 RSD 要不要去排？ | 本規格新寫 | `events.rsd.text` |
| 選項 | 陪他去排｜−4 聲望，得到一張店主私藏金邊盤（先亮給你看）｜→ 老闆聽到了，默默從櫃檯底下抽出一張盤，推到你面前。 | 本規格新寫 | `events.rsd.options[0]` |
| 選項 | 反正明年會再版｜回 2 聲望，下一場開局氣勢 +1｜→ 客人想了想：「也是。」 | 本規格新寫 | `events.rsd.options[1]` |

## 事件・類比還是數位

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 兩個大叔在櫃檯前吵類比跟數位，吵到要你評評理。 | 本規格新寫 | `events.analog.text` |
| 選項 | 站類比｜包包裡一張盤的硬蕊 +1（你挑，上限 5），吵到口乾 −2 聲望｜→ 類比大叔拍拍你的肩。你嗓子啞了。 | 本規格新寫 | `events.analog.options[0]` |
| 選項 | 站數位｜下一場開局氣勢 +3｜→ 數位大叔請你喝了一罐咖啡。 | 本規格新寫 | `events.analog.options[1]` |
| 選項 | 默默走開｜回 2 聲望｜→ 他們吵到現在，都沒發現你走了。 | 本規格新寫 | `events.analog.options[2]` |

## 事件・這張是不是初版

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 有人拿著你手上的盤問：「這張是不是初版？」 | 本規格新寫 | `events.firstpress.text` |
| 選項 | 自信地說是｜下一場開局氣勢 +3｜→ 他肅然起敬。你自己也不太確定。 | 本規格新寫 | `events.firstpress.options[0]` |
| 選項 | 老實說不知道｜回 3 聲望｜→ 「我也不知道。」他笑了。 | 本規格新寫 | `events.firstpress.options[1]` |

## 事件・九成新

| 說話者 | 句子 | 出處 | 位置 |
|---|---|---|---|
| 旁白 | 客人把手機遞過來：網拍寫「九成新，聽不到十次」。 | 本規格新寫 | `events.ninetynine.text` |
| 選項 | 下標｜得到一張盤（先亮給你看），但三軸各 −1（最低 1，盤上標「九成新」）｜→ 寄來了。封套上有一圈咖啡漬。 | 本規格新寫 | `events.ninetynine.options[0]` |
| 選項 | 算了｜什麼都沒發生｜→ 你把手機還給他。 | 本規格新寫 | `events.ninetynine.options[1]` |

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
| 原句 | 「這張放出來客人會跑光……我喜歡。」 | `pitch#swans-filth` |
| 原句 | 「柏林時期第一張，B 面幾乎沒有人聲。第一次聽會覺得怪，第三次就回不去了。」 | `pitch#david-bowie-low` |
| 原句 | 「1970 年出的時候沒人要，她就去鄉下住了三十年。後來全世界都在找這張。」 | `pitch#vashti-bunyan-just-another-diamond-day` |
| 原句 | 「六〇年代的情歌王子，隔了幾十年交出這張。第一首就把客人嚇走。」 | `pitch#scott-walker-tilt` |
| 原句 | 「她不寫歌，唱別人的歌卻比原唱還像自己的。」 | `pitch#karen-dalton-in-my-own-time` |
| 原句 | 「『後搖滾』這三個字，就是樂評為了形容這張才用起來的。」 | `pitch#bark-psychosis-hex` |
| 原句 | 「B 面那首十七分鐘。據說錄音師錄到一半就走人了。」 | `pitch#the-velvet-underground-white-light-white-heat` |
