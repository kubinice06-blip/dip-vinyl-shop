# add-20261023-mc42 裁定（情緒薄格策展線・冷冽：自由即興打擊／鼓獨奏＋鼓手領軍小編制＋當代古典打擊擴寫）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 13 輪，本工作階段負責 ml56、mc42（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc42 列；主線定可擴寫：鼓手領軍／打擊為主體的自由即興小編制、當代古典打擊獨奏的無調作品），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x ≥ 3.3、y ≤ 0.2、z ≤ −0.3。
> 策展：`curation-mc42.json`（50）→ 主線汰 13（`master-override-mc42.json`）→ `master-mc42.json`（MB 回查 37/37 釘住、人工 0）→ `pick.json`（37）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc42-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 37、§1 人工 0。
> **預留：研究 a 21401–21410、b 21411–21420、c 21421–21430、d 21431–21440、e 21441–21450、鉤子 21451–21460、寫作 21461–21470、主線 21471–21480。**
---

## 主線策展（不佔條號）
- 策展 50：獨奏 12、雙鼓／多打擊 5、鼓＋單一樂器二重奏 12、鼓手掛名小編制 13、當代古典打擊 8；moodGuess 全過邊距（x 3.3–3.8、y −0.5～+0.2、z −1.7～−0.5）。策展層先擋現場約 40 張（Lovens、Sommer、Oxley、Bennink、Turner、Hemingway、Corsano、Graves《Bäbi》等，多數 MB 未標 Live、看 Discogs 記事）；池中富樫雅彥全系列 x 1.8–2.8、Bill Dixon 判靜，不提。
- 主線汰 13：
  - 判暖（池中 Milford Graves《Grand Unification》z +0.1 落雀躍先例：手鼓複節奏語彙往暖）：Graves《Stories》（獨奏）、Cyrille／Graves《Dialogue of the Drums》、Clarke／Cyrille／Graves／Moye《Pieces of Time》（四鼓手、含搖擺語彙，估 z −0.5 貼邊）。
  - 判重（池中 Les Percussions de Strasbourg《Xenakis: Pléïades》y 0.8 落暴躁、Oxley Quintet《Baptised Traveller》y 0.6 先例）：Les Percussions de Strasbourg ×4（大編制打擊樂團、大鼓與金屬共鳴）、Pedro Carneiro《Psappha / Rebonds》（Xenakis 大鼓）、Z'EV《Production and Decay of Spacial Relations》（金屬工業撞擊）、David Murray & Milford Graves《Real Deal》（次中音薩克斯風厚、全力合奏）。
  - 身分／場景：Stockhausen《Zyklus – Refrain / Transición II》（MB 實為 Stockhausen／Kagel 拼盤、掛名四位演奏者，掛名不清）、Chris Cutler／Lutz Glandien《Domestic Stories》（RIO 歌曲編制，非即興）、Fritz Hauser《Zwei》（含詩文朗誦）。
- 定案 37。去重：seed、所有 curation／cards、origin 各 `claude/*` 分支 seed＋10-22／10-23 卡單全 0 撞。
- 風險（交研究層查）：x 貼 3.3–3.4 的長音／弓擦型（Nakatani ×2、Parker／Prévost ×2、Smith／Sommer《Wisdom in Time》、Lê Quan Ninh、Hauser《Solodrumming》）可能判靜；Graves 參與的《Percussion Ensemble》《Beyond Quantum》可能判暖或重；Schick《Born to Be Wild》大鼓可能判重；Bennink 與管樂二重奏是否借曲（Serpentine、Dissonant Characters、Eleven Ghosts）；所有盤是否實為現場。

## 研究 a 組
- 21401　8 張全為錄音室／單人錄音，Discogs 記事與 MB 都無現場標記，無需汰換；身分（盤名、年份、廠牌）與卡單吻合，Hauser 年份取 Discogs 1985（MB 空白）。
- 21402　moodGuess 存疑（交主線）：Nakatani《Abiogenesis》INDY Week 專訪明說是 37–40 吋巨鑼低頻、錄音者不適、『比部分金屬更具壓迫感』，與策展層『尖細高頻』相反，傾向判重；《Primal Communication》57 分鐘單軌，同樣可能判重或靜；Lê Quan Ninh 含頌缽、風鈴、大鼓共鳴，可能判靜；Hauser 七秒殘響與策展層『乾』相左，可能偏靜或偏飄；Cyrille《The Loop》可能有節奏動機或律動，偏暖風險；Corsano《Another Dull Dawn》Discogs 類別含 Electronic，聲音資料最薄。
- 21403　Cyrille《The Loop》與 Corsano《Another Dull Dawn》標 thin：無可讀樂評（AllMusic、RYM、Discogs master 皆 403）；聲音 facts 僅 Discogs 記事與曲名。
- 21404　Hot Cars Warp 為 Corsano 自營廠牌，依據 Discogs 藝人頁『Operated』標示（單一來源，已入 facts 並以 Discogs 為 src）；Dennis Tyfus 與 Ultra Eczema 關係未驗證，不入 facts。
