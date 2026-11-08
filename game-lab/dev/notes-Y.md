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
