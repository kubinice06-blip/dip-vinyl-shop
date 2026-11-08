# notes-R2：多角度審查的修正（R/RT/V/COPY）

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。
依據：審查清單（R-01…R-09、RT-1…RT-14、V01…V16、COPY-01…COPY-18）＋ DECISIONS-v4＋FIXLIST（FIXLIST 優先）。
不改店主定案的規則與句子；跟店主定案衝突的列在最後「留給店主」。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] blocker RT-1 面板取消後卡死（1ae3683a7）
- [x] major R-01/V04（tutorial.js）、R-02/V06/RT-12（dip.json＋makeRoom）、RT-2、RT-3、V01、V02、COPY-01、COPY-02；V03 一部分（高螢幕對白框）
- [ ] RT-14 e2e #22
- [ ] minor（便宜又安全的）
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
