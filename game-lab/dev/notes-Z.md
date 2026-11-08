# notes-Z — game-lab v4 整合 X＋Y、介面跟上、全部檢查（Agent Z）

分支 `claude/card-game-fun-lab`（/home/user/dip-vinyl-shop）。不 push、不寫 PROJECT_MEMORY、不碰 roguelike.html／dip-character.js。
依據：SPEC-v4、DECISIONS-v4、FIXLIST 2／3／4／5／6／8（蓋過 spec）＋X／Y 契約。
伺服器：`cd /home/user/dip-vinyl-shop && python3 -m http.server 8765`。截圖 `game-lab/dev/shots/Z/`（不進 repo）。
容器會重啟：開工先看本檔「進度」與 `git log`，做過的不重做。

## 進度
- [ ] 1. merge --no-ff v4/Y、v4/X（解衝突兩邊意圖都留）
- [ ] 2. duel.js／duel.css（名牌只有新名字、刪 blocked ace、六手結果句用 pct、對決裡沒有價錢、tip_ace 第一次丟王牌）
- [ ] 3. ui.js（今晚來客新名字無誠實度、規則卡第 6 行、錢千分位）
- [ ] 4. econ.js／econ.css（12 箱新名牌、FEATURE／PICKS 牆、NEW、稀有度價、特價每張、配件 3000、賣回半價、千分位）
- [ ] 5. 教學（不提王牌不會被剋；L6 照常）＋tutorial.test L6
- [ ] 6. 版面 a–d（店主提示不蓋頭上徽章、接受對決後下方面板不空白、430x932 不留大空帶、375x548 今晚看得到門口牆）
- [ ] 7. index.html ?v=42、README
- [ ] 8. 全部檢查（見「測試結果」）
- [ ] 9. 店主截圖 shots/Z/

## 紀錄
