## 2026-09-04 — dip-vinyl-shop — c-76 走完雲端段（深掘：沖繩民謡 12 ＋ 日本環境音樂二線 20，32 張）

- **改動摘要**：c-76 從策展一路跑到寫作收尾，**32 張、24 位藝人**，零跨批撞卡、
  32/32 釘住 release-group MBID、`fix-rgmbid` 修正 0。
- **主要檔案**：`batch-progress/c76/`（prop、caa、previews、HANDOFF）、
  `desc-tools/batches/cards/c76-cards.json`、`research/c76-{a,b}.json`、
  `hooks/c76-hooks-{a,b}.json`、`output/c76-out-{1,2}.json`；
  另更新 `audits/pool-artist-name-splits.md`、新增 `batch-progress/apple-previews-verified.mjs`。
- **驗證結果**：`qa-batch research/hooks/out c76` 全清；`qa-check-research` 兩檔各 0 標記；
  `fix-spacing` 待補 0；`chk-hook-crossgroup` 32 張、hook 加權 15–27、note 302–350；
  out-1 221–235、out-2 217–235、`>260` 為 0。
  **封面 CAA 27/32、試聽 19/32**（命中全部在 `jp`）。
- **這批的裁定與教訓**：
  1. **策展層以盤名為主鍵掃全池，抓到 `chk-prop` 判不出的三張撞卡**——
     其中「**浜瀬元彦／濱瀬元彦**」是**全新形狀**：同一個漢字姓氏的新舊字體
     在任何正規化下都是兩個鍵。另兩組是羅馬拼音 ↔ 漢字，**且再發同時換掉了盤名**
     （《Soundscape 2: Nova》←→《Nova》、《からだは宇宙のメッセージ》←→
     《The Body Is a Message of the Universe》）。
     **日本線開批前，除了掛名比對，一定要把盤名的羅馬拼音與英譯寫出來、
     以盤名為主鍵掃一次全池**（第 71 條）。三組已補進 `audits`。
  2. **立第 137 條附錄**：人工核對過 collectionId 的補試聽路徑**推廣到一般批次**。
     《チャンプルーズ・ルネッサンズ》在 Apple 上叫羅馬拼音的
     《Champloose Renaissance》、比對擋掉；新增 `apple-previews-verified.mjs`，
     但**兩個條件缺一不可**：某一層真的人工核對過，且標準探測已回 unavailable。
     試聽 18→19。
  3. **立第 138 條**：**互斥分派是許可不是義務。** hook 層讓 Ki/oon 那條線閒置，
     交件時來問要不要補——不用補，但**獨占仍然成立**。
     分派是為了避免重複，不是為了分配額度。與第 130 條配對。
  4. **研究層兩次把碟的性質整個推翻**：吉川洋一郎《アクアクの夢》**就是
     NHK 特集《地球大紀行》的原聲帶**（策展層寫成「他自己名義的器樂盤」，
     還虛構了「南太平洋」這個主題）；Green & Water **是伊藤詳自己創辦的廠牌**
     （策展層寫成「他替某家廠牌做的」）。
  5. **b 組最大的同調風險是一張合輯**：《環境音楽 Kankyō Ongaku》，
     **十六位藝人裡有十一位在上面**。只判給越智義朗《Natural Sonic》，
     其餘十九張逐張禁提。
  6. **主線裁定一處跨組同構**：b 組《縄文頌》的「Gramavision 盤把盤名換成
     《Jomon-Sho》」收尾，與 a 組《あしび》的 **hook**「盤名作《Ashibi》」同形。
     **a 組的 hook 不能改（hook 必須是 desc 的開頭，改動要三檔同步）**，
     所以把 b 組那句往前挪、改以逐軌 credit 分佈收尾——**facts 一條沒少，形狀換掉了。**
     **這是「同構要往下游修，不要往上游改」的第一個明確案例。**
- **這條線還有多少**：沖繩線在 MB 上是真的薄——**十位確認實體存在的藝人名下
  1960–95 年 0 個 release-group**；りんけんバンド 與 ネーネーズ 另有五張
  「Apple 的 jp 目錄有、MB 完全沒建檔」，是最值得進 §1 補遺批的一批。
  b 組的環境音樂二線則已接近見底，再往下會掉進查不到廠牌與年份的健康食品向治癒音樂。
- **店主可決定的一張**：嘉手苅林昌《嘉手苅林昌》(1965, マルフク F-8) 資料完整、
  CAA 有封面，但 Apple 三個 storefront 全空、踩到「自我同名 ＋ Apple 查不到就不收」
  而未收。本機若接受 `previewStatus=unavailable` 可直接撿回——
  **這是整條沖繩線最該收的一張。**
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、5 張封面掃圖）。
