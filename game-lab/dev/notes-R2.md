# notes-R2：多角度審查的修正（R/RT/V/COPY）

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。
依據：審查清單（R-01…R-09、RT-1…RT-14、V01…V16、COPY-01…COPY-18）＋ DECISIONS-v4＋FIXLIST（FIXLIST 優先）。
不改店主定案的規則與句子；跟店主定案衝突的列在最後「留給店主」。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] blocker RT-1 面板取消後卡死（1ae3683a7）
- [x] major R-01/V04（tutorial.js）、R-02/V06/RT-12（dip.json＋makeRoom）、RT-2、RT-3、V01、V02、COPY-01、COPY-02；V03 一部分（高螢幕對白框）
- [x] RT-14 e2e #22（ghost 不超出 #app）
- [x] minor：R-03/05/06/07/08/09、RT-5..RT-13、V05、V07..V11、V13、V14、V16、COPY-03/04/06..12/15..18（部分）
- [ ] ?v=43、全部檢查重跑
- [ ] 店主截圖 dev/shots/final/

## 記錄

- 1ae3683a7 RT-1：reward 面板拆成 showSheet()，包包滿／配件滿按「算了」回來重畫；RT-3：有唱片又有配件 → 配件進底下那條跟「都不要」並排；兩排唱片 ≤700 高拿掉藝人行、≤600 高五欄；V02：dropPanel／relicPanel 呼叫 roomForSheet。
  量（scratch rew.mjs，6 張＋配件）：四尺寸 sh＝ch（不用捲）；包包滿面板四尺寸 sh＝ch；按「算了」→ screen reward、面板回來。
- R-01/V04：tutorial.js pumpTips 在對決 phase≠choose 時等、over 時丟；丟出下一手（phase→resolve）就收（看過 ≥800 ms 算看過）。量（tips.mjs）：揭曉中 0 次出現，演完（choose）才出。
- R-02/V06/RT-12：r1 regular [70,104]→[200,104]（後牆右邊矮櫃前）；新站位 wait [28,200]（試聽桌前）；econ approach 走之前呼叫 ui.js makeRoom：門邊等的客人 f 在你要去的站位 |dx|<38、|dy|<44 內就走到 wait／atdoor。
  check-shops 加「actors（老闆以外）旁邊不能有 bin.stand」（舊配置會抓到 FEATURE、SALE 兩個）。量：FEATURE p[60,100] f→[28,200]；SALE p[44,128] f[28,200]。
- COPY-01/02/07、R-09：見 commit f005627b7。LINES-REVIEW 388 句（新 291）。
- RT-2：econ done() 後 450 ms 內 buy/bbuy/rbuy/sell/spick/tog/take 不算（鈕半透明）。量：四尺寸雙擊 → 只買一張。
- RT-5/V12/R-08b：refocus 高度變矮也重對焦；抽屜開著 #app.ec-open → #panel 底下（今晚來客、對白框）visibility hidden。430×932 的店景已經整面寬，抽屜上面是白的（不再露出半截名單）。
- V03（一部分）：min-height 800 的對白框照內容長（≥176px）、字 16px。店景在 430 寬已經是整間店（292×322 的比例），剩下的高沒辦法給店景（要裁兩側）。
- V01/V13/R-07/R-08a/R-08c/COPY-09：commit 8bc92dd06。
- RT-14：ghostPanel 高度夾在 #app 內、淡出不再 translateY（LAB_ONLY=22 430／360 PASS）。
- R-06：TABLE_FIT.roomy 最大 140；.dl.short 相剋圖例 56×50。R-05：上一手那行延後淡入、提示從 .45 淡入、大章等結果框收掉（220 ms）、比聲望條大章停 3000 ms。V05：「丟！」演出中留在原位（.28）、over 手牌 .6。
- COPY-04：a3.heresy＝「經典剋硬蕊，但你高 2 星以上，剋不動：他 −5。」（≤25 字；tutorial.test 加查 −toE）。COPY-09：tip_mirror／m4＝「同色比星數，多的扣差額。」、a1／L6／挑王牌說明＝「一場用一次」。
- RT-9 對決進場 music.stop(900)；RT-7 runWhere 看 pending.prologue；RT-10 sellPickN；RT-8 .arming 主鈕淡；V11 吐司 .nw；COPY-10 n/8；COPY-08；COPY-15 今晚來客寫 en.name。
- RT-6：resumeRun 在 prologue、特價挑完、r.tut==null、沒有 duel → resumePrologueAfterBargain()（從 O14 演到兩顆鈕）。e2e #44 改成驗這條（390 PASS）。
- COPY-03/06/17、R-04：改 copycat.line、already.line、label.intro、critic.line、already.win、skip.win、critic.win；lint-copy 加「line／intro 不准有提示關鍵字」。
- COPY-12：content.js 把客人牌組裡（不在禮物）的 gold 拿掉；barney-wilen-moshi 推薦語去掉「我一直捨不得標價。」（cards.js 與 pitches.json 同一字串，沒重跑 bake）。COPY-16：角標「新認識」。
- R-03/COPY-05：c1／c3 保留改過的字（有 draft＝店主原文）、LINES-REVIEW 最上面列「改過店主草稿的句子」、其他 13 句 tag 店主逐字比對；README 等店主決定的 7。RT-4 → README 等店主決定的 8（照店主「賣回一律半價」，不改）。
- COPY-18：b（shops 的 note 不列）、c（推薦語照實際位置分組）、d（O7 面板標題＝店主句的一段）做了；a（ui.js 寫死的字搬進 content）、e（shopLines.cat、ownerHint.scene 用不到）沒做。
- V07 keepHeads(pad 22) 在 set.emote；V08 左走道轉角點 x 87/88/86→84、右 194/193/196→199/199/200（中島邊距 9→13–14），shop.test 路線上限 3.5→3.6（mid→ref 3.52 s）；V10 over 時小卡放牌桌上緣；V16 地上那張畫封套＋半張黑膠＋閃。
- V09 唱片資訊 ≤700 高封面 30svh、關閉上緣淡出；V14 charedit 1 倍螢幕 U 最小 2、格子 46、清單淡出；RT-11 今晚來客提示目標＝整個名單、開抽屜 dismissSoft；RT-13 reward 面板 _armUntil＝鏡頭 620 ms。
