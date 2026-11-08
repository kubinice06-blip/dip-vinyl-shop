# notes-X：規則、經濟、客人名字（v4 第二波後修正，Agent X）

Worktree `/home/user/wt/X`，分支 `v4/X`（從 `claude/card-game-fun-lab` 31ed4b385 開）。只 commit、不 push。
依據：SPEC-v4、DECISIONS-v4、FIXLIST 2／3／4／5／6／8（FIXLIST 蓋過 spec）＋主線給的 X／Y 共用契約（箱子鍵、分類、稀有度、價格、每晚上貨）。

OWN：engine.js、content.js、sim.mjs、test/engine.test.mjs、tools/check-content.mjs、tools/lint-copy.mjs、tools/owner-lines-v4.json、
LINES-REVIEW.md、dev/decks-v4.md、dev/sim-v4.json、dev/notes-X.md。

## 進度（容器會重啟：每步做完就更新這裡＋commit）

- [x] 1. FIXLIST 2：拿掉王牌不會被剋（clash、duelText、規則卡第 6 行、owner-lines、lint、教學資料）
- [x] 2. FIXLIST 3：六手比聲望條剩幾成（一個函式 engine.playerAhead）
- [x] 3. FIXLIST 6：客人名字、拿掉 title／誠實度標籤
- [x] 4. FIXLIST 8＋契約：稀有度、價格、特價箱每張、配件 3000、每晚上貨（含 new／picks／feature）（133b7289d）
- [x] 5. sim 重調（聲望；錢照店主例）→ content.js、decks-v4.md、sim-v4.json（d3e5173bb＋decks）
- [x] 6. 全綠、commit

## 做了什麼

### 規則（engine.js）
- `clash`：拿掉 `blocked:'ace'`。王牌＝那軸 7 星，照三相剋＋差 2 星門檻：≤5 星剋不動它（`gap`），加成到 6 星剋得動；王牌對王牌照三相剋（剋中扣 7）、同色 tie。
  `p.ace／e.ace` 只剩標記（engine.test #5 掃 7×7×3×3×4 確認旗子不影響結果）。preview===resolve 照舊（#1）。
- `playerAhead(pHp, pMax, eHp, eMax)`：唯一的比法＝聲望條剩幾成（交叉相乘，一樣算你贏）。六手打完、他牌出完、同一手兩邊都 ≤0（負數也照比例）、
  策略 `valueOf` 的終局估值都用它。`hpPct(hp,max)`＝四捨五入的 %；`pctPair(pHp,pMax,eHp,eMax)`→{p,e} 字串：整數，
  但整數一樣大而勝負分得出來時（你 9/10＝90%、他 28/31≈90.3%）兩邊改一位小數——畫面數字永遠跟勝負一致（engine.test 掃 你 10×客人 12–40 全部組合）。
  `over` 事件多帶 `pMax／eMax／pPct／ePct／pct:{p,e}`。
- 誠實度：`HONESTY`／`enemyDef`／`view().honesty` 拿掉 zh（只剩 key、q）。`view().eTitle` 現在都是 null（content 沒有 title 了）。

### 經濟（engine.js＋content.js；header 註解寫了 run.shop 形狀）
- `rarityScore／rarity`（c＋h＋(o===5)；≤5 common、6 rare、7 uncommon、8 epic、≥9 legendary、tier→apex）、`RARITY`、`categoryOf`（地區 tw 優先，否則第一個曲風，electronic→elec）。
- `priceOf`：特價箱的卡＝`bargainPriceOf`（最高星 1／2／3→100／200／300），其他＝`economy.price[rarity]`（800／1000／1200／3000／4000；apex 8000 不上架）。
  特價箱的卡賣回照特價的一半（不會一買一賣賺錢）。`relicPrice`＝`relics[id].price ?? economy.relicPrice`（3000；content 拿掉了各件 price）。`moneyText(n)`→'1,200'。
- `buyBargain`：每張照特價分開算、一次付總和；effects 每張 `{gainCard, spend: 那張的價}`（原本第一張付全額、其他 0）。
- `stockShop`：照 `SHOP_ORDER`（feature → 十一分類 → new → picks）上貨，全店同一晚不重複；feature 2–3（`economy.featureStock`，只抽史詩／傳奇），
  其他 4–6（只抽普通／稀有／獨特）；不上王牌、包包、特價箱、頂點；`display:true` 的舊牆面區照舊不賣（舊 bins.js 也能跑）。
- content.js 讀 bins.js：`shops.dip` 或 `bins`，每區要有 `pool` 陣列才收。

### 內容（content.js）
- 客人名字照 FIXLIST 6；拿掉 `title`。跳針王／月底吃土／剁手黨的台詞是照舊名寫的笑點，換成配新身分的四句（tag 新，進 LINES-REVIEW）：
  二手店老闆「這張在我店裡放了十年，沒人問過。」…、地下樂團吉他手「這段吉他，我練了一整個暑假。」…、前衛樂迷「這張你聽得完嗎？」…。其他客人台詞照舊。
- 規則卡第 6 行＝任務單的店主字；`tip_ace`「王牌 7 星，一場用一次。」（觸發改成第一次丟王牌，要 duel.js 改）、`tip_rounds`「六手沒分勝負，比聲望條剩幾成。」；
  教學 L6「王牌 7 星，一場一次」、異端第 6 手 expect `blocked:'gap'`（同結果）。
- duelText：刪 aceYou／aceHim；`roundsOut`「六手打完，比聲望條」、`roundsScore`「你剩 {p}%，他剩 {e}%：{who}贏」。
- `C.economy` 新形狀（start／win／price[rarity]／bargain[1–3]／relicPrice／sellRate／stock／featureStock／relicStock）；`C.rarityZh`（tag 店主）。
- `shopUi.bargainBuy`「買下 ${n}」、新增 `bargainEach`「${n}」。

### 檢查
- check-content：名字逐字、沒有 title、honesty 沒有 zh、經濟逐字（價格是店主定的、不校準）、配件 3000、duelText 沒有 ace 句、roundsScore 組得出來、
  聲望範圍 12–40；新增 `binsProblems`（bins.js 有 feature 時才跑：14 區名牌、分類、FEATURE 稀有度、genre-tree 頂層、30 晚上貨夠不夠、全店不重複）。
- lint-copy：誠實度字／title 不准回來、content 不准出現「不會被剋」、客人名字與稀有度名進「店主」逐字比對。
- owner-lines：規則卡第 6 行、客人名字、稀有度名；拿掉誠實度四個詞。
- engine.test：#5 王牌、#6 比例（含 60%>50% 你贏、同手雙倒照比例）、#8 契約上貨、#10 價格與特價、#14 名字、#15 新的一節；
  bins.js 不是契約形狀時用 `contractBins()` fixture（真卡照分類分區、不夠的補 fx-* 假卡）。

## sim 校準（`node game-lab/sim.mjs --n 3000`，結果在 dev/sim-v4.json）

**FIXLIST 3 的影響很大**：比例比法下，你 10 對他 17–20 時，「六手打完」你只要扣他的比例 ≥ 你被扣的比例就贏（舊規則要淨贏 7–10 點）。
原聲望下會讀的一晚通關 95.5%（S1 上限 85）、全部拉到 20 仍 93.3%；不買的 88%，所以只動錢不夠（S6 要會買的 ≥ 不買的＋5）。只能把聲望拉過 20：

| 客人 | 舊聲望 | 新聲望 | 單場會讀的（S7） |
|---|---|---|---|
| 文青同好 | 18 | 31 | 74.5% |
| 社團學長 | 17 | 24 | 71.4% |
| 音響發燒友 | 19 | 31 | 74.2% |
| 二手店老闆 | 17 | 25 | 72.4% |
| 地下樂團吉他手 | 20 | 34 | 89.0% |
| 前衛樂迷 | 20 | 31 | 74.8% |
| 地下廠牌主理人（菁英） | 17 | 21 | 65.3% |
| 資深樂評（菁英） | 20 | 30 | 77.7% |
| 傳說藏家 | 16 | 20 | 52.6% |

- 地下廠牌主理人與藏家被 S7 單場下限卡住（菁英 ≥60%、藏家 ≥45%：主理人 23→62%、26→57%；藏家 20→52%、24→42%），所以比一般客人低。
- 錢：開局 $1,000、一般 $1,500、菁英 $2,500（店主例的數字）。掃過：開局 500 與 1000 結果一樣（第 3 位前才買得起配件）；開局 1500 或一般 2000 → 第 2 位前買得起配件，
  會買的 86%（>85）；開局 0／一般 1000／菁英 2000 → 差 4.2 點（<5）。
- 門檻 20/20：S1 81.3%、S2 只出最大星 6.9／剋提示 29.1／兩步 40.5／同色 24.5（≤66.3）、S3 0.0%、S4 平均 5.84 手、≤3 手 0.6%、最多 6、
  S5 男子 100%／2.73 手／最大星 99.9／剋提示 100、S6 81.3−74.0＝7.3 點、不買 74.0%、S7 一般 71.4–89.0（17.6 點）、菁英 65.3／77.7、藏家 52.6、S8 100%。
- `--set mercy=false`：20/20（會讀的 smart 80.4%、none 73.3%）。
- 用契約形狀的假箱子（現在 cards.js 的卡照分類分區＋FEATURE 史詩／傳奇，`sim.mjs --data <dir>`）跑一整晚：12/12（S1 80.0、S6 8.0 點、S2 最高 40.6）。
- **副作用（給店主）**：客人場 88% 打到第 6 手、77.5% 靠「比聲望條」結束（原本 37%），KO 變少。規則卡頁尾會變成「客人 24–34、菁英 21–30、傳說藏家 20」。

## 給別人的請求（不是 X 的檔）

- **tutorial.test.mjs（B2／整合）**：第 36 行 `LEARNED.L6` 改成 `'王牌 7 星，一場一次'`（content 的 L6 跟著 FIXLIST 2 改了；現在這一條 1 failed，其他 142775 過）。
- **duel.js（B1）**：
  - `ruleText` 的 `blocked === 'ace'` 分支與檔內 aceYou／aceHim 後備字可以刪（引擎不會再給 'ace'）。
  - `roundsVars` 改用 over 事件的 `pct`（或 `E.pctPair(v.pHp, v.pMax, v.eHp, v.eMax)`）：`{ p: pct.p, e: pct.e, who }`；roundsScore 現在是「你剩 {p}%，他剩 {e}%：{who}贏」。
    不要自己四捨五入：客人聲望 >20 時整數 % 可能兩邊一樣但勝負不同，pctPair 會在那時改一位小數。
  - `tip_ace` 的觸發從「王牌擋下相剋」改成「第一次丟王牌」（字已改「王牌 7 星，一場用一次。」）。
  - 名牌副標 `els.esub`（enemy.title）現在一律空；`els.hon` 的誠實度字也空（view.honesty 沒有 zh）。
- **econ.js（B3）**：
  - 所有 `{n}` 代入 `E.moneyText(n)`（千分位）。
  - 特價箱：`economy.bargainPrice` 沒了；每張價 `E.bargainPriceOf(C, id)`，買的鈕是挑的那幾張加總（`shopUi.bargainBuy`「買下 ${n}」），封面下可以用 `shopUi.bargainEach`。
  - 新的箱子鍵（jazz…blues、new、feature、picks）全部可買；feature 的價 $3,000／$4,000（`E.priceOf`）。稀有度名在 `C.rarityZh[E.rarity(card)]`。
- **ui.js（B2）**：今晚來客清單的 `en.title` 小字一律沒了；`C.rules.hpText` 變成 24–34／21–30／20。
- **e2e（整合）**：e2e-duel 的 aceYou／aceHim 斷言、`王牌不會被剋` 的正規式要拿掉；e2e.spec #39 規則卡逐字會跟著 content 走；e2e-econ 的「$100 三張」與價錢斷言要換。
- **Y（bins.js）**：分類箱、new、picks 的 pool 只放普通／稀有／獨特（引擎上貨會濾掉史詩／傳奇，太多會上不滿 4 張）；FEATURE 只放史詩／傳奇；
  bins.js 交了之後跑 `node game-lab/tools/check-content.mjs`（binsProblems 會自動跑）與 `node game-lab/sim.mjs --n 3000`（貨變了，S1／S6 要再看一次）。
