# Bandcamp downtempo 候選（2026-11-05）

店主：「Bandcamp 有 downtempo 分類，可以從那邊開始找」「先至少抓出 500 張」。

- 來源：`scripts/bandcamp-discover.mjs`，tag `downtempo`（top 40 頁）＋`downtempo` 與 trip-hop／chillout／ambient／electronica／jazz 交集（各 12 頁）；dub 交集不收（店主：嘻哈雷鬼 dub 太多）。
- 過濾：6 首、28 分以上；扣卡池既有（pool-keys，含 manifest）與 `data/pool-removed.json`；扣 Various Artists 與盤名含 live／remix／edit／compilation／vol.／EP／soundtrack 等。
- 結果：1,841 張，Last.fm 收聽人數（worker `/album-rating` 的 `_listeners`）排序 → `candidates-ranked.json`；前 600 張（第 500 名約 1,200 聽眾、第 600 名 720）→ `top600.json`，店主勾選頁 artifact `https://claude.ai/artifact/4ks5RzuhcCsVgjg8mWrVEK`（db `skip`＝不要）。
- 下一步：店主勾完後切批上架（照 mood-cells 線流程，研究層判恍惚／頹靡落格、查故事性與身分）。

## 預估落格（2026-11-06）

店主同意先粗估再上架。600 張抓 Bandcamp 專輯頁 keywords（566 張有），4 支 Sonnet 照 `score500/BRIEF.md` 估三軸（不上網、多數把握低），寫回 `top600.json`（`c` 預估格、`xyz`、`w` 聲音、`cf` 把握、`sure` 離邊界遠）。
結果：恍惚 218（穩 44）、頹靡 85（穩 45）、放鬆 145、暴躁 55、雀躍 43、沸騰 33、平靜 12、冷冽 9。勾選頁加「預估落格」篩選。

## 擴充到 1,901 張（2026-11-06）

店主：「應該可以挖超過 600 張吧？」downtempo 翻 160 頁（5,365）＋ trip-hop／chillout／psybient／lounge／nu-jazz 各 25 頁，去重後新增 5,361 張；Last.fm 收聽 ≥1,000（扣 remixed／redux／dub 版）1,301 張，同法粗估落格（9 支 Sonnet），與前 600 合併 → `candidates-1901.json`。
預估：恍惚 614（穩 148）、頹靡 287（穩 141）、放鬆 456、雀躍 184、暴躁 174、沸騰 95、平靜 55、冷冽 36。勾選頁同一個 artifact（v3）。
另：Bandcamp discover API 2026-11-06 改回駝峰欄位，`bandcamp-discover.mjs` 已兩種都收。
