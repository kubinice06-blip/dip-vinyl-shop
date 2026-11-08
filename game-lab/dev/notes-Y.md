# Y notes（店的資料：箱子、封面、門口牆）— game-lab v4 FIXLIST 4／5（＋8 的價格分級）

分支 `v4/Y`（worktree `/home/user/wt/Y`，從 `claude/card-game-fun-lab` 開）。不 push。
依據：SPEC-v4、DECISIONS-v4、FIXLIST 2–6、8（FIXLIST 優先）＋X／Y 共同契約（任務單）。

## 契約（X 引擎／Y 店資料共用，照抄）
- 箱位：前排兩箱 jazz JAZZ 爵士、tw TW 台灣；中島 8＝rock ROCK 搖滾、elec ELEC 電子、soul SOUL 靈魂放克、hiphop HIP-HOP 嘻哈 R&B、pop POP 流行、classical CLASSICAL 古典、world WORLD 世界、folk FOLK 民謠；
  後牆矮櫃 blues BLUES 藍調；左邊木箱（原 NOISE）new NEW 新進；門口牆：最靠門＝feature FEATURE 店長推薦精選、其餘＝picks（店長推薦）。名牌英文、點了中文。
- 分類＝第一個曲風標籤對到 genre-tree 頂層 10 類；台灣地區一律 tw。new／picks 不限曲風。
- 稀有度 score＝c＋h＋(o===5?1:0)：≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇；tier＝頂點。feature 池＝史詩＋傳奇（無頂點）。
- bins.js：每個 key（含 feature、picks）{ key, label, zh, pool, front }。

## 狀態
- [x] 1 deck-lists.json 箱子重組＋bake-cards 產新形狀、0 problems（commit 4730df7a2）
- [x] 2 shops/dip.json 重新上鍵、名牌、門口牆 feature／picks（4730df7a2、df3f462e6）
- [x] 3 檢查全綠（df3f462e6、09f3fe905）＋bins-v4.md（66d4679b0）＋截圖（不提交，見下）

## 進度紀錄
1. （開工）店景截圖 `dev/shots/Y/before-390.png`。選卡腳本在 scratchpad `Y/`（cands.cjs 候選、picks.txt 挑的卡、resolve.cjs 對 seed、covers.mjs 先查 Firestore 封面：82 張新卡都有 coverUrl）。
   - 各區卡池：十大類＋tw 各 12（blues 14：後牆矮櫃正面 8 張）、new 12（保留「2020 以後」的新進味道，不限分類）、feature 23（現有史詩／傳奇全收，Bowie Low＝禮物、Sun Ra＝critic、Fishmans＝掉牌除外）、picks 21。
   - 一般區＝普通／稀有／獨特（score ≤7）；feature＝史詩＋傳奇。各區互不重疊、不碰牌組／禮物／特價箱／王牌／掉牌（Bill Evans Waltz for Debby＝needle 牌組，不進爵士）。
   - `deck-lists.json`：刪 wall_a／wall_b／舊 12 箱／_ost；`_bins`＝{label, zh, rule}；bin_<key> 14 區；_region 加 Ryoji Ikeda／Susumu Yokota／Miki Matsubara＝jp。
   - `check-covers.mjs`：catOf／rarityOf／ruleMisses（rule 加 cat、rarity）、sectionFronts、名牌檢查、pool 大小檢查；bake-cards import 同一份。
   - `bake-cards.mjs`：bins.js＝{key,label,zh,rule,pool,front}（front 讀 shops/dip.json），version 5。
   - `shop-props.js`：ledge 加 rows／plate／frame:'gold'；有 bin 的牆架不出每張封面的子熱點（整面＝翻那一區）；中島名牌放不下時縮留白（CLASSICAL）。
   - `shops/dip.json`：門口牆＝wall-feature（x44、2×2、FEATURE 金名牌、stand [60,100]）＋wall-picks（x76、5×2、stand [132,100]）；高櫃／試聽桌 section＝picks；
     中島 isl-0a..3b＝rock elec soul hiphop pop classical world folk（tabs＝英文）；crate-jazz JAZZ、crate-tw TW、crate-noise→crate-new NEW、backbin BLUES；軌道燈 74→96、118→140（讓出 FEATURE 名牌）。
   - 烘焙：`NODE_USE_ENV_PROXY=1 node game-lab/tools/bake-cards.mjs` → 0 problems，289 張（+82、舊 207 張每一欄 0 變動），封面 289/289、試聽 289 驗過，CAA→Apple 84 張；bins.js 14 區 190 格。
   - 新卡封面逐張目視（`dev/shots/Y/newcovers.png`）：都是對的專輯；Miki Matsubara《Pocket Park》太淡（12 格一塊白）→ 不擺在牆上，牆上那格改 Marcos Valle《Previsão do Tempo》（`--covers-only` 重寫 bins.js，cards.js 位元組不變）。
2. 加 PICKS 名牌（跟 FEATURE 一樣掛在軌道下）；軌道燈 xs＝[30, 86, 140, 206, 250]（兩塊名牌中間）。
3. 測試跟上：shop.test（契約形狀、名牌、位置、稀有度、分類、pool 大小、門口牆 box／不出單張熱點、壞資料抓得到）、hit.test（門口牆整面命中、矮櫃＝bin:blues、中島最後一排＝world／folk）。
   `tests/e2e-taps.mjs`（不在 Y 的檔案表，但任務要它綠）：#3 寫死的 bin:new／bin:cpop 改成從 layout 讀 isl-3a／isl-3b 的 bin（最小改動）。
4. dev/bins-v4.md：產生器 `dev/shots/Y/mk-bins-md.mjs`（不提交）。

## 檢查結果（2026-11-08，HEAD 66d4679b0 之後）
- `node game-lab/tools/check-covers.mjs`：OK（看得到的封面 60 張、14 區）
- `node game-lab/tools/check-shops.mjs`：OK（3 份 layout；含 bin:* 交叉比對、所有 stand 兩兩路線不穿家具）
- `node game-lab/test/shop.test.mjs`：1276 passed、0 failed
- `node game-lab/test/hit.test.mjs`：343 passed、0 failed
- `LAB_URL=http://localhost:8791/game-lab/index.html LAB_SCREENS=title,night node game-lab/tests/e2e-taps.mjs`（四尺寸）：56/56 PASS
- 別人的（只看影響、不改）：`check-content` 通過（箱子 14 區）；`engine.test` 1 failed＝「display areas exist」（契約起每一區都賣，沒有 display，X 要刪這條）。
- 今晚來客點 FEATURE：抽屜標題「店長推薦精選」、列出今晚的貨（現行引擎上 4–6 張；契約 2–3 張、價格分級由 X 接）。

## 截圖（deviceScaleFactor 2，不提交；腳本 `dev/shots/Y/shots-Y.mjs`）
- `game-lab/dev/shots/Y/390x664-hitmap.png`：每個熱點看得到的那一塊＋中文名（門口牆兩區整面＝橘）
- `game-lab/dev/shots/Y/390x664-covers.png`：每張看得到的封面描那一區的顏色＋「名牌 中文 看得到／池」
- `game-lab/dev/shots/Y/390x664-press.png`、`390x664-label-feature.png`：按住 FEATURE 金框、放開掛「店長推薦精選」
- `game-lab/dev/shots/Y/390x664-feature-drawer.png`：今晚來客點 FEATURE 的抽屜
- `game-lab/dev/shots/Y/newcovers.png`：82 張新卡封面

## 給 X／整合
- bins.js version 5；每一區 `{ key, label, zh, rule, pool, front }`，沒有 display。engine.test 的「display areas exist」要刪；引擎 stock 照契約（feature 2–3）。
- rule 判斷、稀有度、分類可以直接 import `tools/check-covers.mjs` 的 `rarityOf`／`catOf`／`ruleMisses`（Node）。
- 375×548 今晚來客：面板讓鏡頭從牆頂裁掉門口牆（FEATURE／PICKS 在畫面外、點不到；e2e-taps #1 列為鏡頭外）。鏡頭規則在 stage.js（不是 Y 的檔），要不要讓那個尺寸也看得到門口牆請整合決定。
- index.html 的 `?v=` 要跟著 cards.js／bins.js 換（C）。
