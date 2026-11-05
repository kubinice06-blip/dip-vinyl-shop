# Bandcamp downtempo 候選（2026-11-05）

店主：「Bandcamp 有 downtempo 分類，可以從那邊開始找」「先至少抓出 500 張」。

- 來源：`scripts/bandcamp-discover.mjs`，tag `downtempo`（top 40 頁）＋`downtempo` 與 trip-hop／chillout／ambient／electronica／jazz 交集（各 12 頁）；dub 交集不收（店主：嘻哈雷鬼 dub 太多）。
- 過濾：6 首、28 分以上；扣卡池既有（pool-keys，含 manifest）與 `data/pool-removed.json`；扣 Various Artists 與盤名含 live／remix／edit／compilation／vol.／EP／soundtrack 等。
- 結果：1,841 張，Last.fm 收聽人數（worker `/album-rating` 的 `_listeners`）排序 → `candidates-ranked.json`；前 600 張（第 500 名約 1,200 聽眾、第 600 名 720）→ `top600.json`，店主勾選頁 artifact `https://claude.ai/artifact/4ks5RzuhcCsVgjg8mWrVEK`（db `skip`＝不要）。
- 下一步：店主勾完後切批上架（照 mood-cells 線流程，研究層判恍惚／頹靡落格、查故事性與身分）。
