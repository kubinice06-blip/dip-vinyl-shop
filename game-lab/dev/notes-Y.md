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
- [ ] 1 deck-lists.json 箱子重組＋bake-cards 產新形狀、0 problems
- [ ] 2 shops/dip.json 重新上鍵、名牌、門口牆 feature／picks
- [ ] 3 檢查（check-covers、check-shops、shop.test、hit.test、e2e-taps 四尺寸）＋bins-v4.md＋截圖

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
   - 烘焙中（log：scratchpad Y/bake1.log）。
