# notes-Z — game-lab v4 整合 X＋Y、介面跟上、全部檢查（Agent Z）

分支 `claude/card-game-fun-lab`（/home/user/dip-vinyl-shop）。不 push、不寫 PROJECT_MEMORY、不碰 roguelike.html／dip-character.js。
依據：SPEC-v4、DECISIONS-v4、FIXLIST 2／3／4／5／6／8（蓋過 spec）＋X／Y 契約。
伺服器：`cd /home/user/dip-vinyl-shop && python3 -m http.server 8765`。截圖 `game-lab/dev/shots/Z/`（不進 repo）。
容器會重啟：開工先看本檔「進度」與 `git log`，做過的不重做。

## 進度
- [x] 1. merge --no-ff v4/Y、v4/X（解衝突兩邊意圖都留）
- [x] 2. duel.js／duel.css（名牌只有新名字、刪 blocked ace、六手結果句用 pct、對決裡沒有價錢、tip_ace 第一次丟王牌）
- [x] 3. ui.js（今晚來客新名字無誠實度、規則卡第 6 行、錢千分位）
- [x] 4. econ.js／econ.css（12 箱新名牌、FEATURE／PICKS 牆、NEW、稀有度價、特價每張、配件 3000、賣回半價、千分位）
- [x] 5. 教學（不提王牌不會被剋；L6 照常）＋tutorial.test L6
- [x] 6. 版面 a–d（店主提示不蓋頭上徽章、接受對決後下方面板不空白、430x932 不留大空帶、375x548 今晚看得到門口牆）
- [x] 7. index.html ?v=42、README
- [ ] 8. 全部檢查（見「測試結果」）
- [ ] 9. 店主截圖 shots/Z/

## 紀錄
- 合併 v4/Y、v4/X 都沒衝突。合併後 engine.test 全過、check-content 通過（binsProblems 跑了）、tutorial.test 只差 L6 常數 → db6ffbbbe。
- 3ec141115 對決：名牌 DOM 只剩名字（.sub／.hon 拿掉）；ruleText 刪 ace；roundsVars 用 over.pct（E.pctPair 退路）；比例真的一樣 → duelText.roundsEven「一樣，算你贏」（content＋check-content 鍵表）；
  tip_ace＝第一次丟王牌；e2e-duel #1b 名牌＝新名字、#9 王牌被 ≤5 星剋＝gap＋tip_ace、#12a「你剩 90%，他剩 70%：你贏」、0-aceGap／0-aceText；stage-harness 王牌兩個示範 blocked 改 gap。
- 2ffa3f4a8 經濟介面：標題 ROCK 搖滾（.ec-plate；FEATURE 金色）、FEATURE 封面右上大稀有度標＋框色、其他區年份旁小稀有度；只看模式也標價；縮圖框色＝史詩／傳奇；
  特價箱每格左下價（序章挑三張：劃掉＋標題「這次免費」）；之後買：鈕＝挑的加總「買下 $500」、沒挑「挑一到三張」、連最便宜都買不起「錢不夠」；toast／賣回／先賣都千分位。
  shopUi 加 bargainHint／bargainFree。今晚來客改用鏡頭 night（dip.json：y0 h322 minH290 anchor top）→ 375×548、390×664 都看得到 FEATURE／PICKS 名牌（375 兩側黑邊變寬，約 45 px）。
- be2473c51 e2e-econ、e2e.spec 跟上台幣（#41 千分位、規則卡第 6 行）。
- 7e243a0a1 版面 c：strip 鏡頭 grow {panel:584}（高螢幕橫條往上長）、roomy ≥580、stage.camCssH；430×932 盤面下空帶 ~200→~25 px。
- f91a7e591 版面 a：小提示放到頭上方塊上面或下面（tutorial.js badgeZone）。
- 611f0d73d 版面 b：O21 選完對話框不清空、ghostPanel hold 到 push。
- c6268c2d7 ?v=42；README 改寫（規則第 6 行、王牌、六手比聲望條、經濟台幣表、店裡的箱子、等店主決定的）。
- 教學：C.tutorial 的步驟沒有提「不會被剋」；heresy 第 6 手「經典剋硬蕊，但 7 星剋不動：比星數。」＝gap（照舊）。
- FIXLIST 10（平衡 KO≥35%）是之後才加的、不在 Z 的範圍（任務只給 2／3／4／5／6／8）；README「等店主決定的」第 1 點提到。

- c2fbeb3fd 今晚來客名字長的折兩行（地下樂團／吉他手）。
- 7f428ec45 shop.strip(on)：唱盤區橫條（含 grow 變高的）泡泡避開中間。

## 測試結果（node：HEAD e5fdde5e5 之後；sim 用 Y 的真 bins.js）
| 指令 | 結果 |
|---|---|
| `node game-lab/test/engine.test.mjs` | 1466108 passed, 0 failed |
| `node game-lab/test/tutorial.test.mjs` | 142776 passed, 0 failed |
| `node game-lab/test/shop.test.mjs`／`hit.test.mjs`／`chars.test.mjs` | 1276／343／30061 passed, 0 failed |
| `node game-lab/tools/lint-copy.mjs` | 通過；句子 390（原句 45、店主 52、新 293）；劇本原句 26／26；LINES-REVIEW 重產（b69326f1e） |
| `node game-lab/tools/check-content.mjs`／`check-shops.mjs`／`check-covers.mjs` | 通過（14 區、binsProblems 有跑）／OK（3 份 layout）／OK（60 張、14 區） |
| e2e 第一輪（四尺寸） | e2e-econ 80/80、e2e-prologue 52/0、e2e-duel 112/116（#9 找王牌那手的方向寫反 → 6334a86df）、e2e-taps 54/56（#6 430×932：橫條變高後泡泡不再避開中間 → 7f428ec45 shop.strip） |
| `node game-lab/sim.mjs --n 3000` | 20/20（S1 80.1%、S2 最高 40.6%、S3 0%、S4 5.84 手／≤3 手 0.6%、S5 100%、S6 +8.7 點（none 71.4%）、S7 一般 71.4–89.0、菁英 65.3／77.7、藏家 52.6、S8 99.7%） |
