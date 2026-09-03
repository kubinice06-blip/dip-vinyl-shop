## 2026-09-02 — dip-vinyl-shop — c-65 策展提案（深掘：電子與實驗的冷門硬蕊）

- **改動摘要**：新增 `batch-progress/c65/prop-a.json`（25 張）與 `batch-progress/c65/prop-b.json`（22 張），
  合計 **47 張、47 位藝人**，`lineType: 深掘`。
  - a 組＝私壓電子與磁帶實驗（private-press synth、DIY cassette、new age 私壓、industrial 早期磁帶），
    年份 1961–2018，以 1973–1986 為主。
  - b 組＝圖書館音樂與早期電腦音樂（KPM 3、De Wolfe 1、Bruton 1、Chappell 1、Neuilly 2、
    義大利圖書館 3、Kirchin 1、Fevre 1；電腦音樂與研究室出版 9）。
- **主要檔案**：`batch-progress/c65/prop-a.json`、`batch-progress/c65/prop-b.json`、
  `batch-progress/memory-entries/c65-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c65/chk-prop.mjs a b` → 47 張、47 位、**標記 0**。
  47 張全部釘住 release-group MBID 並逐個回問 `release-group/<id>` 確認實體類型與標題（第 41 條）；
  47 位藝人在 `seed_cards.json` 全 13,418 列實掃下皆未達 3 張上限，零撞卡。
- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.8 錨點制、`manual:depth-rubric`）、
  頂點資格評估、封面、簡介、固定試聽、Firestore／KV／`seed_cards.json` 寫入。
