# add-20261106-ml75 裁定（情緒薄格策展線・恍惚 Bandcamp 有鼓名單第三輪）

> 店主 2026-11-06「有些要死不活的音樂也會有鼓推進」「全都上架吧」：前兩輪因「有拍推進」被汰或被標籤先篩掉的 473 張（`batch-progress/bandcamp-dt-20261105/beat-candidates.json`）切十批、五個工作階段並行；本工作階段做 ml74＋ml75。卡單 `pick-ml75.json`（48 張）即策展結果，主線組 `curation-ml75.json` → `build-master.mjs ml75` → 卡單。**照 CUR-DISPATCH「有鼓不等於躁」**：慢、拖、無力的鼓仍算靜；只有 (1) 鼓＋攻擊性、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）才汰。**判輕、判冷不汰**（店主「全都上架」，落到其他格照實記）。目標格仍是恍惚（x≤2.7、y≥0.8、z≥0.3）。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml75-cards.json`（35 張；研究 a 7、b 7、c 7、d 6、e 8；e 組＝「研究判有鼓」沿用原批研究稿、只補不足）。身分：MB 釘住 35、§1 人工 0。
> **預留：研究 a 24441–24450、b 24451–24460、c 24461–24470、d 24471–24480、e 24481–24490、鉤子 24491–24500、寫作 24501–24510、主線 24511–24520。**
---

## 主線策展（不佔條號；2026-11-06）
- 去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；「DUP curation-…」者皆為前兩輪被汰的同一張（本輪重審對象）或 ml11／ml47 的情緒風險汰換（非身分問題，照「全都上架」收）。
- 同藝人：與並行 ml76–81、md44–45 卡單及池中一起看；池中已 ≥9 張（Purrple Cat、Sounds From the Ground）或並行另有 ≥3 張者不收或只收一張；同一位藝人在 ml74／ml75 合計最多一張（Entheogenic 收 ml74《Dialogue of the Speakers》）。
- MB 逐張回查（release-group search → releases 的曲數、日期、廠牌）；名稱照 MB 正規名（MB 的 U+2019 撇號改 ASCII）。MB 查無的走 §1 人工身分（Discogs master／Apple collection＋Bandcamp）。
- 研究判有鼓的卡（e 組）：原批研究稿已寫鼓型的，照新規則重判——慢拍、半速、dub、trip-hop 留；文案直述 danceable、house、big beat、95 BPM 以上 uplifting、輕快放克者照「舞池推進」汰。
- **主線汰 13**：
  - Boards of Canada《Hi Scores》：非正規專輯：MB EP（6 首 33 分）
  - Purrple Cat《Distant Worlds》：同人超量：池中已 10 張
  - Entheogenic《Flight Of The Urubus》：同人超量：本工作階段收 ml74《Dialogue of the Speakers》，並行 ml78–80 另 8 張
  - Sounds From the Ground《Terra Firma》：同人超量：池中已 9 張
  - Entheogenic《Kykeon》：同上
  - Pandrezz《Sunset on Clouds》：非正規專輯：MB EP
  - Chillhop Music《Chillhop Essentials Spring 2025》：合輯：廠牌季度合輯
  - Chillhop Music《Chillhop Daydreams 3》：合輯：廠牌合輯系列
  - Lipphead《The Long Way》：舞池推進：ml69 研究稿廠牌文案 upbeat electronic funk、Discogs Electro
  - Ochre《An Eye to Windward》：同人超量：並行 ml77／ml79／md44／md45 另 5 張
  - Purrple Cat《Dino Land》：同人超量：池中已 10 張
  - Tim Love Lee《Confessions Of A Selector》：舞池推進：ml72 研究稿 Discogs 風格 Breaks／Big Beat
  - Odd Nosdam《FLIPPIES BEST TAPE》：合輯：MB Album＋Compilation（66 首 beat tape 選集）
