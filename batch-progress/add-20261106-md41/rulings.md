# add-20261106-md41 裁定（情緒薄格線・頹靡：Bandcamp downtempo 候選 md41）

> 店主 2026-11-06：協調端從 Bandcamp downtempo 等標籤抓 1,901 張、依 Last.fm 收聽排序、便宜模型粗估落格；店主選「先做最遠的」——預估離邊界遠的 289 張分六批，三個工作階段並行。本工作階段做 md40＋md41（並行：ml68＋ml69、ml70＋md39）。卡單 `batch-progress/bandcamp-dt-20261105/pick-md41.json`（47 張）即策展結果，不派策展代理；說明見同目錄 `README.md`。
> 目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；評分照 `batch-progress/mood-axes/score500/BRIEF.md`（10-23 店主體感標準）。卡單的 moodGuess 是只看 Bandcamp 標籤的粗估、把握多半 low，**研究層要照聲音再判一次**：判輕、有拍子推進、判暖的汰掉，不補人。
> 流程：卡單 47 → 主線初篩（身分、去重、資格、文案直述聲音）→ `curation-md41.json`（29）→ `master-md41.json`（MB 釘住 29、§1 人工 0）→ `build-cards.mjs` → 研究 3 組（a 10、b 10、c 9；組數由五組併成三組，壓尖峰代理數）。
> **預留：研究 a 23881–23890、b 23891–23900、c 23901–23910（d、e 不用）、鉤子 23931–23940、寫作 23941–23950、主線 23951–23960。**
---

## 主線初篩（不佔條號；2026-11-06）
- 身分：Bandcamp 專輯頁 ld+json（發行日、曲數、總長、發行者）＋ MB release-group 查詢（score 100、primary Album、無 secondary）逐張比對；留下的全數 MB 釘得住。
- 去重：`dedup-md37.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有卡單、所有 curation）0 撞。
- **主線初篩汰 18**（卡單 47 → 29）：
  - 資格：Pulshar《Mask》（MB EP）、Sau Poler《A Soundless Echo》（MB EP、28 分）、imminent starvation《human relocation》（29 分、含 remix；technoid industrial）、All India Radio《Liminal Space》（以《The Unified Field》曲目重新詮釋，近 remix 盤）。
  - 線別：Daily Bread《Invisible Cinema》（器樂嘻哈；店主 11-04「嘻哈太多」；MB 查無）、Deadbeat《Journeyman's Annual》（dancehall／dub；池中同人一張落恍惚）。
  - 池中同人錨點判輕或判暖：Carbon Based Lifeforms《Derelicts》（同人《World of Sleepers》落平靜 y 0.3）、Arms and Sleepers《SAFE AREA EARTH》（同人落平靜 y 0.2）、Funki Porcini《Drift To This》（同人落恍惚 z +0.2）。
  - 能量（文案直述有拍推進或攻擊性）：Just Mustard《WE WERE JUST HERE》（第三張轉向較明亮、舞曲化）、worriedaboutsatan《Bloodsport》（「gnarled, aggressive energy… angry」）、Gi Gi《In Lieu》（「nearer the dance floor… pulsing」）、Snakes Of Russia《True Surrender》（「Death Beats、pulsating basslines」）、PROFONDITA《Dracarys》（「fat kicks… emotive vocals」downtempo-trance）、Azu Tiwaline《The Fifth Dream》（polyrhythmic dub techno）。
  - 判暖判輕：36《A Warm Static Sphere》（標題與文案皆暖）、Area 3《Amb》（「relaxation, meditation」new age）。
  - 同人同聲音保留兩張：Sync24《Source》（MB 查無、須人工身分；同人《Comfortable Void》《Omnious》保留）。
- 年份以原盤首發為準：Lund Quartet 2011、Sync24《Comfortable Void》2012、CASHFORGOLD 2021、Muslimgauze《Satyajit Eye》1993（Staalplaat DAT-only，2020 Bandcamp 數位首發）。
- 同人多張：worriedaboutsatan 2、HEXSYSTEM 2、State Azure 2、Sync24 2；Lauge《Latitudes》與 md40 的《Echoes》分兩批。

