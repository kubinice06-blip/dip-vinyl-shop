## 2026-09-04 — dip-vinyl-shop — c-74 走完雲端段（深掘：英國 1980s indie pop 微廠，45 張）

- **改動摘要**：c-74 從策展一路跑到寫作收尾，**45 張、40 位藝人**（a 組 Sarah Records 22、
  b 組 él／Creation／Ron Johnson／In Tape／Midnight Music／Pop Aural 等微廠 23）。
  兩張合輯走 §5.6。零跨批撞卡、45/45 釘住 release-group MBID、零人工身分卡。
- **主要檔案**：
  - `batch-progress/c74/prop-{a,b}.json`、`caa.json`、`previews.json`、`HANDOFF.md`
  - `desc-tools/batches/cards/c74-cards.json`
  - `desc-tools/batches/research/c74-{a,b}.json`（409 條事實、full 45 thin 0）
  - `desc-tools/batches/hooks/c74-hooks-{a,b}.json`
  - `desc-tools/batches/output/c74-out-{1,2}.json`
- **驗證結果**：`qa-batch research/hooks/out c74` 全清；`qa-check-research` 兩檔各 0 標記；
  `fix-spacing` 待補 0；`chk-hook-crossgroup` 45 張、hook 加權 12–27.5、note 286–350、全部通過；
  out-1 字數 220–236、out-2 216–235、`>260` 為 0。
  **封面 CAA 36/45、試聽 33/45（全 gb storefront）**，缺的各 9 張與 12 張已逐張列在 HANDOFF。
- **這批的裁定與教訓**：
  1. **研究層推翻策展層 11 處硬錯**——其中三張 Sarah 盤被策展層誤標 10 吋
     （實為 SARAH 601–623 十二吋系列，10 吋只有 401–407）、Anthony Adverse 的真實身分是
     演員 Julia Gilbert 而非「Michael Hunt」、Ron Johnson Records 在 Long Eaton 而非 Nottingham。
     **策展層講廠牌與規格時最容易錯，研究層一定要逐項回查原盤。**
  2. **寫作層攔下的兩處，都是「上游自己跟自己打架」**：《Jaguar》產地字樣的句數在
     facts、引文、note 三處各說各話（依第 33／64 條不採任何數字）；TVP 的 note 一段之內
     既要求點 B 面兩個繪畫曲名、又寫「曲目只點〈Adventure Playground〉」。
     **這類矛盾機器掃不到，只有真的把三個欄位並排讀才會浮現。**
  3. **《Alvin Is King!》主動讓出被分派的錄音敘事錨點給《Kettle》**——兩者是同一個骨架
     （「整張在某錄音室，只有一首拉到別處」），Kettle 的 researchNotes 明文說那是它的錨點，
     先到先得。**互斥分派本身也會撞形狀，寫作層要有權讓出。**
  4. **第 133 條在這批第一次用上**：b 組 5 條 src 只有 HTTP，兩個站台實測 HTTP 200、
     HTTPS 的 TLS 直接失敗，且都是具名樂評、無替代來源，採用並在 notes 註明。
  5. **Marine Girls《Beach Party》的試聽依第 129 條剔除**——Apple 那筆是
     《Lazy Ways/Beach Party》31 軌的二合一套裝。**二合一在三層都要擋。**
  6. **第 109 條在這批要擋五處數字**：él 早期英國銷量、Bogshed 首張 EP 的一萬五千張、
     TVP 手壓的 500 張（**那是另一張唱片**）、以及三個再發限量。寫作層一個都沒寫。
- **下一步**：本機端上傳（三軸、頂點資格、四處寫入與回讀、9 張封面掃圖）。
