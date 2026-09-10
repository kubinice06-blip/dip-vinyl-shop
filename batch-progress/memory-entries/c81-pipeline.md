## 2026-09-04 — dip-vinyl-shop — c-81 走完雲端段（美國 1980s 地下搖滾廠牌的 B 面，44 張）

- **改動摘要**：深掘線 **44 張、44 位藝人（一人一張）**（a：硬蕊／post-hardcore／noise rock 廠牌線
  22 張、1980–91；b：paisley underground、cowpunk 與 college rock 小廠 22 張、1982–90）。
  核心概念是「**B 面**」——不挖無名廠牌，**挖知名地下廠牌目錄裡沒人談的那些盤**，
  刻意避開池中已有的 40 張正典側代表作。
  **零 §1 人工身分、零跨批撞卡、44/44 釘住 release-group MBID。**
- **主要檔案**：`batch-progress/c81/`（prop-{a,b}、caa.json／log、previews.json／log、
  fix-rgmbid.log、HANDOFF.md）、`desc-tools/batches/research/c81-{a,b}.json`、
  `hooks/c81-hooks-{a,b}.json`、`input/c81-writer-{1,2}.json`、`output/c81-out-{1,2}.json`。
- **驗證結果**：`qa-batch research c81` 兩組 key 與卡單完全一致、零標記；`hooks c81` 0 標記；
  `chk-hook-crossgroup c81` 2 組 44 張、hook 加權 15–41、note 304–350、全部通過；
  `qa-batch out c81` out-1 22 張 219–238、out-2 22 張 224–239、合計 44 張與卡單相符、`>260` 為 0；
  `qa-check-research` 兩檔各 0 標記；`fix-spacing` 待補 0。`fix-rgmbid` **修正 0**。
  **封面 37/44、試聽 28/44（命中全部在 `us`）。** 研究層 436 條事實（a 214、b 220）、全 full、thin 0。
- **這批的裁定與教訓**：
  1. **探測層被推翻六處，全部是「標 ready 卻漏標擴充版」**，主線逐一開
     `release?release-group=<id>&inc=recordings` 覆核後補 `originalTrackCount`：
     Scream 10、Tar 10、Alice Donut 11、Thin White Rope 10、Rain Parade 9、The Feelies 10。
     **Rain Parade 那筆的形狀最值得記：同一年的美國盤 9 軌、海外盤 10 軌**——
     不是「原盤 vs 再發」，是**同期不同地區**。**判擴充版不能只看年份。**
  2. **兩張軌數兩說、依第 141 條兩個都不填**：Soul Asylum（Discogs 12 vs MB 13）、
     Beefeater（MB 12 vs Discogs 16，差在算不算過場段落）。**行文一律禁止給總數。**
  3. **策展層被推翻十七處（a 9、b 8）**，典型仍是**成軍城市、廠牌序數、「某某公開稱讚過」、
     「因為某原因被下架」**——Pylon 那句稱讚**是 R.E.M. 鼓手 Bill Berry 一次**、不是 Michael Stipe 多次；
     Slovenly 是舊金山不是洛杉磯；Alice Donut 目錄號是 VIRUS 73 不是 71（**本機要改卡單**）。
     **策展層自己下的警告也要查證**——這條在 c-87 已踩過一次。
  4. **序數框架的收斂靠三層一起做**：研究層把「第幾張專輯」整條判給 Saccharine Trust、
     其餘 21 張全禁（含五處**有來源**的 “second full-length／debut”）；hook 層沒讓它進 hook 也沒進 note；
     **寫作層又主動把兩處有 facts 撐著的序數改掉**（Necros 只留廠牌側的「第一個出版品」、
     Das Damen 改寫成「1986 年的同名專輯」）。**有來源不等於該寫。**
  5. **第 135 條第一次「回去數之後大多成立」**：b 組七處計數全部成立、無需改寫；
     a 組 Gone 的「九首落在 2:10 到 3:59」逐首數過成立照用。
     **回去數不是為了推翻，是為了確認**——但 a 組仍把 Saccharine Trust 那處成立的區間改成單一端點值。
  6. **寫作層攔下一處 note 與 facts 打架**：Big Dipper 的 note 寫「後兩人是表兄弟」，
     facts 寫的是 **Waleik 與 Oliphant**。主線已回頭修 hook 檔與已合併的 writer 輸入兩處。
     **這與第 146 條同一類：上游的一句順手描述，會被下游當成查證過的事實。**
  7. **兩個敏感處置**：Big Boys B 面第七軌曲名含種族歧視字眼，研究稿刻意不轉錄、全批禁止引用，
     行文整段未提該軌；Beefeater 的製作人「Gumbo Mackaye」查無來源說明是誰的化名，
     **明令不得等同 Ian MacKaye**，照印出來的字寫。
  8. **「未具名出處」燈兩組都是零，且不是靠刪內容關的**（第 143 條）——
     a 組把 Trouser Press 的 Ira Robbins、《紐約時報》Robert Palmer、AllMusic 的 Christopher True 等
     具名評語全部寫出並保留；未寫的兩處是**字數排不進去**，不是為了避開檢查。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、7 張封面掃圖、
  改 Alice Donut 的目錄號、核 Gray Matter 的 Apple 版本、跑 `build-genre-tree.mjs --write`）。
