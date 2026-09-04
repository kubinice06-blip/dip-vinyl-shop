## 2026-09-04 — dip-vinyl-shop — c-83 走完雲端段（英國 1990s 微廠二線，45 張）

- **改動摘要**：深掘線 **45 張、45 位藝人（一人一張）**（a：吉他／post-rock 側 21 張；
  b：電子／實驗側 24 張），年份 1991–1999。Ankst／Ochre／Earworm／Enraptured／
  Wurlitzer Jukebox／Worm Interface／Lo／Ash International／Shinkansen／Guided Missile／Pickled Egg
  **這十一家在本批之前池中零張**（池中英國 1990s 只有正典側 37 張）。
  零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、合輯 0、EP 0。
- **主要檔案**：`batch-progress/c83/`（prop-{a,b}、caa、previews、fix-rgmbid.log、HANDOFF.md）、
  `desc-tools/batches/research/c83-{a,b}.json`、`hooks/c83-hooks-{a,b}.json`、
  `input/c83-writer-{1,2}.json`、`output/c83-out-{1,2}.json`、
  `batch-progress/c53/rulings.md`（第 152 條附錄）。
- **驗證結果**：`qa-batch research c83` 兩組零標記、key 與卡單完全一致；
  `chk-hook-crossgroup c83` 45 張全過（hook 加權 18–40、note 267–349）；
  `qa-batch out c83` out-1 21 張 217–238、out-2 24 張 217–236、合計 45 張相符、`>260` 為 0；
  `qa-check-research` 兩檔各 0 標記；`fix-spacing` 待補 0；`fix-rgmbid` 兩輪聯集、修正 0。
  **封面 33/45、試聽 29/45（28 個在 `gb`、1 個在 `de`）。**
- **這批的裁定與教訓**：
  1. **立第 152 條附錄：掛名與盤名各壞一層、而且兩層都是 Unicode 同形異碼。**
     Tånk《Upwards at 66°N》被判查無——掛名 Apple 作 **Tank**（圓圈符整個沒了）、
     盤名作 **66º N**（**U+00BA 陽性序數指示符**，不是卡片的 U+00B0 度符，還多一個空格）。
     **兩個字元在多數字型下幾乎一模一樣，但任何正規化都判不相等。**
     用 collectionId 直查覆核 8 軌同序、八軌都有預覽；**但第 4／6 軌的曲長對調，那兩軌禁止入文**。
     方法：**把掛名與盤名各自拆到只剩 ASCII 字母與數字再搜一次**，命中後用 collectionId 逐軌核對。
  2. **五張 `ready` 要加限定語**，形狀各不相同：Prolapse 是 2019 再發（試聽可用、軌數與年份不可用）；
     **Ectogram 的 Apple 標題多了「(Live)」而它根本不是現場專輯**；Scanner 原盤 4 軌且四軌無題；
     Longstone 的 Apple 11–12 是同碟曲目的現場版；
     **Freeform 不是加曲版**——第 15 軌是原盤第 14 個位置裡的隱藏段落被切出來單獨計軌。
     **「多一軌」有三種完全不同的成因：再發加曲、店面雜訊、隱藏軌被拆出。**
  3. **策展層把廠牌的國籍當成了藝人的國籍**：Tånk 是法國團（Brest）、
     Ma Chérie for Painting 是德國團（Stuttgart）、Hazard 是瑞典人（斯德哥爾摩）——**英國的是廠牌**。
  4. **hook 層兩組合計退回八則自算錯的候選**（第 154 條那一類），寫作層又攔下九處。
     最典型：「每一軌的人聲都換人」實際一人就佔四軌；「資料庫一個曲長也沒登錄」
     ——**MB 那筆 CD release 有完整曲長，只有 Discogs 原盤沒登**。
  5. **兩處毫秒換算溢位**：照 Apple 的毫秒換算會得到**不合法的「6:60」與「4:60」**，兩處都沒引用。
     （c-85 出現同一形狀，是 299547 毫秒。）**引 Apple 曲長前要自己算一次。**
  6. **兩處依第 138 條讓分到的線閒置**：一處是字數容不下規定的完整寫法、
     一處是該卡已被更重要的兩說占滿。**分派是許可不是義務，這條在這批被主動援用了兩次。**
  7. **「未具名出處」四層都是零，且不是靠刪內容關的**：唯一的署名樂評（Exclaim! 的 Ian Danzig）
     原樣寫進 desc；MB 掛的兩條 NME 樂評連結**都回 404**，內容無法核對而註明不採用。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、12 張封面掃圖、
  跑 `build-genre-tree.mjs --write`、清掉二十餘支暫存腳本，清單在 HANDOFF 第八節）。
