## 2026-09-04 — dip-vinyl-shop — c-78 策展提案（深掘：美國 old-time 與 bluegrass 小廠二線）

- **改動摘要**：新增 `batch-progress/c78/prop-a.json`（25 張）與 `batch-progress/c78/prop-b.json`（19 張），
  合計 **44 張、37 位藝人**，`lineType: 深掘`。另複製 `batch-progress/c78/chk-prop.mjs`（由 c76 版改批次名）。
  - **a 組＝old-time／string band 與田野採集系的小廠**：County 6（713／723／741／720／708／744 線上的三人盤與在地團）、
    Mountain Records 3（301／302／304，Galax 的 Bobby Patterson 自營）、Heritage 1、Davis Unlimited 1（DU 33007）、
    June Appal 5（JA002／JA 012／JA 030／JA049／JA0078D）、Folkways 2、Rounder 老時線 6（0023／0045／0032／0132／CD 0326 等）、
    Flying Fish 1、Cavern Custom Recordings（樂手自費壓片，後由 County 兩次接手）1。年份 1966–2000，以 1968–1982 為主。
  - **b 組＝bluegrass 的獨立廠與樂手自營盤**：Rounder 創業期 7（0003／0006／0007／0014／0031／0048／0055／0107）、
    Rebel SLP 1500 系列 5（1498／1533／1538／1545／1569）、Ridge Runner 1、Old Homestead 1、Lemco 1、
    Jessup 1、Grasshound 1、Folk-Lyric→Arhoolie 1。年份 1962–1981。
- **主要檔案**：`batch-progress/c78/prop-a.json`、`batch-progress/c78/prop-b.json`、
  `batch-progress/c78/chk-prop.mjs`、`batch-progress/memory-entries/c78-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c78/chk-prop.mjs` → 44 張、37 位、**標記 0**；
  串跑的 `dedup-crossbatch.mjs` → 32 批、1,519 張、**跨批撞卡 0**。
  44 張全部釘住 release-group MBID，並逐個回問 `release-group/<id>` 確認 `primary-type=Album` 與標題（第 41 條）；
  合輯 1 張（Lily May Ledford《Gems》）走 §5.6，帶 `exceptionReason` 與三個 HTTPS 證據網址。
  **另以盤名為主鍵掃全池（第 71 條）**：`seed_cards.json` 全 13,913 列 ＋ 其他批次的 `prop-*.json`，44 張**撞 0 筆**。
  藝人上限：`Fred Cockerham, Tommy Jarrell & Oscar Jenkins` 本批 3 張、池中 0 張（剛好到上限），其餘皆 ≤2 張。
- **封面／試聽實測**：CAA release-group front 回 200 者 **40/44**；Apple 命中 **18/44（41%）**，
  **18 個命中全部在 `us` storefront**（gb／ca 零命中）。CAA 404 的 4 張（Ola Belle Reed 兩張、
  Red Clay Ramblers《Merchants Lunch》、Bob Carlin《Fiddle Tunes for Clawhammer Banjo》）**全部在 Apple 有條目**，
  因此 **44 張都有可用的封面來源**。試聽預估 ready 18／unavailable 26。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面實際下載、簡介、固定試聽寫入、Firestore／KV／`seed_cards.json` 寫入。
