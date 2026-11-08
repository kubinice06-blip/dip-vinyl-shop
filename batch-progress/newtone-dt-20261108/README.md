# Newtone Records downtempo 候選（2026-11-08）

店主：「從 newtone 找 downtempo 名單」（附 https://www.newtone-records.com/product/0113172）。

- 來源：Newtone `/store/downtempo/` 全部 3,916 筆（站內「View More」背後是 `POST /include/grid_list.php`，`{path:"/store/downtempo/", total:<已載入數>, pp:30, active:"sort-list"}`，每次 30 筆；`scrape.py`）。抓到 3,751 個商品。
- 過濾：只留 LP／2LP／3LP／CD／2CD／2x12inch／卡帶等專輯格式（拿掉 12inch／7inch／10inch／EP／Mix-CD／Digital，2,051）；拿掉 Various Artists（143）、盤名含 EP／remix／compilation／vol.／OST 等（89）、站內重複（90）、卡池已有（113，pool-keys 含 manifest）→ 1,264 → 版本重複再併 2 → **1,262 張**。
- Last.fm 收聽（worker `/album-rating`）：≥1 萬 257、≥1,000 569、有數字 1,114。
- 預估落格：9 支 Sonnet 讀店家日文簡介＋標籤照 BRIEF 粗估（含「有鼓不等於躁」）。恍惚 356（穩 118）、頹靡 150（穩 59）、放鬆 327、雀躍 189、暴躁 105、沸騰 90、平靜 29、冷冽 16。
- `candidates.json`：每列 `id`（Newtone 商品號）、`a`／`b`、`l` 聽眾、`t` 店家標籤、`fmt`、`lab`、`u` 商品頁、`c` 預估格、`xyz`、`w`、`cf`、`why2` 店家簡介、`sure`。勾選頁 artifact `https://claude.ai/artifact/PCiQiqDckKACpwBZDuC4nE`（db `skip`＝不要）。
- 注意：仍混有 DJ mix（Kruder & Dorfmeister《DJ-Kicks》等）與嘻哈／dub 盤，上架時身分層再汰。
