# notes-H1：FIXLIST 11 追加——手牌 5 張平衡（H5-1）、禮物不能賣回、教學五張版

分支 `claude/card-game-fun-lab`，直接在 `/home/user/dip-vinyl-shop` 做（不 push）。
依據：FIXLIST 11 追加＋ scratchpad/v4/balance/H5A/results.md 的 H5-1。
不碰 roguelike.html、dip-character.js、PROJECT_MEMORY、Firebase/KV。逐檔 git add。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] 1 引擎 CFG handSize 5、playerHp 9；客人聲望 H5-1；規則卡頁尾「你 9」；engine 註解與後備表
- [x] 2 老闆送的（四張禮物＋王牌）不能賣回：engine choose 擋（錯誤碼）、econ 賣回介面標「老闆送的」不能選；S6 ≥5
- [x] 3 教學腳本五張版（C.tutorial.script：hand/draw/pick/expect），六課順序不變；男子手牌 3
- [x] 4 sim --n 3000 22/22；engine.test、tutorial.test、check-content、lint-copy 綠；README 平衡、dev/decks-v4.md、dev/sim-v4.json

## 記錄
- 步驟 1：engine CFG playerHp 9、handSize 5（enemyHand 3、bagMax 8、maxRounds 6、mercy 不動）；HONESTY／PLANNER_BY_DEPTH 後備表照 R1（註記 H5-1 照用）；
  content 客人聲望 copycat 25、already 20、needle 25、skip 20、broke 25、buyer 25、label 25、critic 26、boss 28（男子 10、教學 18 不動）；
  規則卡頁尾「你 9 聲望；客人 {normal}、菁英 {elite}、傳說藏家 {boss}。」→ 20–25／25–26／28。engine.test：王牌那節 acts＝3×handSize＋1、
  六手那節的比例案例明確給你 10（跟 CFG 無關）、g 那個案例用 CFG.playerHp。engine.test 2040275／0、check-content 通過。tutorial.test 還沒改（步驟 3）。
- 步驟 2：engine `isGift(run, content, id)`＝content.gifts[run.ace] 四張＋王牌；choose 的 buy {sellId}／buyBargain {sellIds} 有送的 → 'giftNoSell'
  （檢查順序在 badSell 之後、noMoney 之前）；shopPolicy 包包滿要賣時跳過送的。拿獎勵包包滿「拿掉一張」（take 的 dropId）不是賣、不收錢，照舊可以選。
  econ.js：先賣子面板照樣列出送的四張，標「老闆送的」（C.shopUi.giftTag）、停用、sellPick 擋；買得起嗎／賣回價範圍／特價箱要先賣幾張都只算能賣的。econ.css .ec-spick.gift。
  engine.test 加 isGift、buy／buyBargain 賣送的 → giftNoSell、賣客人丟的／買的照舊半價、shopPolicy 從不賣送的（2040485／0）。
  e2e-econ #7／#11／#15 改賣能賣的（最值錢那張）、#7 加查送的四張標字＋停用＋硬點選不到：四尺寸 80/80。
  sim --n 3000：22/22，S1 78.3、S6 +11.0（none 67.3）——跟 H5-A 一樣（smart 本來就沒賣過送的）。
- 步驟 3：C.tutorial.script（TUT_HANDS）：hand＝老闆四張照出牌順序（第 k 手出第 k 格）、draw []；起手第 5 張＝特價箱挑的第 1 張（有 script 不洗）。
  補牌：第 1 手後補特價箱第 2 張到第 1 格、第 2 手後補第 3 張到第 2 格、之後牌堆空了洗回丟過的禮物補第 3、4 格 →
  第 5 手手牌＝[特價箱第 2 張, 第 3 張, 洗回的, 洗回的, 特價箱第 1 張]：blockedChoice（最左）一定是特價箱的那張、冷門 ≤3 剋不動。
  第 1–4 手教的那張都在第 1–4 格、到那一手才出。pick／expect、六課順序、男子暗手 3 張、教學 18 都沒變（只有 pearl 的四張換了順序：Rhythm X 第 3 格）。
  tutorial.test：起手＝四張＋特價箱第 1 張、你 CFG.playerHp、每個「點」步驟手上 5 張、男子暗手 min(3, 剩下)、第 5 手手指＝最左＝特價箱第 2 張、點錯的別張改用整手的索引。
  check-content：四張＝handSize−1、照 pick[0..3] 的順序。tutorial.js 頂端註解。tutorial.test 155808／0、engine.test 2040487／0、check-content、lint-copy 通過。
- 步驟 4：`sim.mjs --n 3000 --json dev/sim-v4.json`：22/22（36 秒）。S1 78.3、S2 5.1／47.0／57.4／40.1（≤63.3）、S3 0、S4 5.67 手／≤3 手 0.6%、
  S5 100%／2.59 手、S6 +11.0（none 67.3）、S7 一般 79.2–93.3（14.1）、主理人 66.3、樂評 89.1、藏家 53.3、S8 99.9、S9 KO 47.8%（你 43.4／他 4.5）、HP 20–25 ≤ 25–26 ≤ 28（你 9）——跟 H5-A 的 H5-1 一致。
  sim.mjs 頂端註解加 FIXLIST 11。dev/decks-v4.md 用 scratchpad v4/H1/gen-decks.cjs 重產（R1 版改：括號欄改 R1 聲望、手牌與聲望說明、送的不能賣）。
  README：v4 改了什麼加 FIXLIST 11（追加）列、規則頁尾你 9、手牌 5 張、聲望、教學、平衡整節改 H5-1（對照 R1）、經濟賣回列、等店主決定的 1／8。
  e2e.spec #8／#33（pHp）、#39（頁尾）改讀 engine CFG.playerHp。
- 驗：engine.test 2040487／0、tutorial.test 155808／0、shop／hit／chars test 綠、check-content、lint-copy 通過；
  e2e-econ 四尺寸 80/80；e2e.spec #8 #20 #21 #33 #39（390）6/6、#19 教學全程（現在的對決盤面，手牌 5 張）390 三王牌＋360 pearl 4/4。

## 沒做／留給主線
- 對決盤面的 5 張手牌版面（疊成扇形、點牌跳屬性）、教學步驟的「點牌堆→點牌→點屬性」、規則卡頁尾第 1 行「點專輯選牌；按住封面看唱片資訊。」——FIXLIST 11 主體（介面），不在這次範圍。
- 拿獎勵包包滿「拿掉一張」（take 的 dropId）照舊可以拿掉送的：那不是賣、不收錢。要也擋的話改 engine take＋ui.js dropPanel。
- 沒跑完整的 e2e.spec／e2e-duel 四尺寸（版面測試等介面那支改完再跑；手牌 5 張在現在的盤面可能擠）。
