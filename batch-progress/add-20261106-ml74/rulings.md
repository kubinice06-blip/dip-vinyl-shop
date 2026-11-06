# add-20261106-ml74 裁定（情緒薄格策展線・恍惚 Bandcamp 有鼓名單第三輪）

> 店主 2026-11-06「有些要死不活的音樂也會有鼓推進」「全都上架吧」：前兩輪因「有拍推進」被汰或被標籤先篩掉的 473 張（`batch-progress/bandcamp-dt-20261105/beat-candidates.json`）切十批、五個工作階段並行；本工作階段做 ml74＋ml75。卡單 `pick-ml74.json`（48 張）即策展結果，主線組 `curation-ml74.json` → `build-master.mjs ml74` → 卡單。**照 CUR-DISPATCH「有鼓不等於躁」**：慢、拖、無力的鼓仍算靜；只有 (1) 鼓＋攻擊性、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）才汰。**判輕、判冷不汰**（店主「全都上架」，落到其他格照實記）。目標格仍是恍惚（x≤2.7、y≥0.8、z≥0.3）。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml74-cards.json`（31 張；研究 a 6、b 6、c 6、d 4、e 9；e 組＝「研究判有鼓」沿用原批研究稿、只補不足）。身分：MB 釘住 29、§1 人工 2（Glenn Astro《Homespun》、MantisMash《Time Seeds》）。
> **預留：研究 a 24361–24370、b 24371–24380、c 24381–24390、d 24391–24400、e 24401–24410、鉤子 24411–24420、寫作 24421–24430、主線 24431–24440。**
---

## 主線策展（不佔條號；2026-11-06）
- 去重（`dupchk.mjs`：seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；「DUP curation-…」者皆為前兩輪被汰的同一張（本輪重審對象）或 ml11／ml47 的情緒風險汰換（非身分問題，照「全都上架」收）。
- 同藝人：與並行 ml76–81、md44–45 卡單及池中一起看；池中已 ≥9 張（Purrple Cat、Sounds From the Ground）或並行另有 ≥3 張者不收或只收一張；同一位藝人在 ml74／ml75 合計最多一張（Entheogenic 收 ml74《Dialogue of the Speakers》）。
- MB 逐張回查（release-group search → releases 的曲數、日期、廠牌）；名稱照 MB 正規名（MB 的 U+2019 撇號改 ASCII）。MB 查無的走 §1 人工身分（Discogs master／Apple collection＋Bandcamp）。
- 研究判有鼓的卡（e 組）：原批研究稿已寫鼓型的，照新規則重判——慢拍、半速、dub、trip-hop 留；文案直述 danceable、house、big beat、95 BPM 以上 uplifting、輕快放克者照「舞池推進」汰。
- **主線汰 17**：
  - Thievery Corporation《The Cosmic Game》：同人超量：池中 3 張、並行 ml77／ml78 各 1
  - Chillhop Music《Chillhop Essentials Winter 2019》：合輯：MB Album＋Compilation（廠牌季度合輯）
  - Nym《Lilac Chaser》：同人：本線收 Nym《Convex》一張（並行 ml78 另有一張）
  - Carbon Based Lifeforms《Seeker》：MB 只有單曲＋同人：本線收《Interloper》
  - Bugge Wesseltoft《Somewhere In Between》：合輯：MB Album＋Compilation（20 首 123 分）
  - Jogging House《holds》：同人超量：池中 1、並行 ml76／77／81／md45 另 7 張
  - Spoonbill《CANOPY》：舞池推進：ml72 研究稿自述 eminently danceable downbeat、銅管切分律動
  - Khotin《Peace Portal》：非正規專輯：MB EP（6 首 29 分）；同人並行另 3 張
  - Purrple Cat《City Nights》：同人超量：池中已 10 張、並行另 5 張
  - parkbreezy《Aquarius》：身分：MB 未定 primary type、9 首 29 分近 EP；同人改收 ml75《Better Days》
  - POiSON GiRL FRiEND《reprises》：非正規專輯：MB EP
  - Fieh《III》：中快速推進：ml70 研究稿八人放克編制、輕快（讓人想動）
  - Pitch Black《The Light Within》：非正規專輯：MB Album＋Remix
  - Fennec《Let Your Heart Break》：舞池推進：ml68 研究 RYM minimal techno、Sputnik house；ml73 研究證實取樣 house 製作人、樂評 strong grooves／dancefloor
  - Chillhop Music《Chillhop Essentials Winter 2025》：合輯：廠牌季度合輯（MB 查無）
  - LAB'S CLOUD《Underwater Galaxy》：中快速推進：ml71 研究稿每首 95–115 BPM、uplifting grooves；並行 ml79／ml80 另 2 張
  - Arms and Sleepers《SENTIMENTALISMS》：同人超量：池中 1、並行 ml78／md44／md45 另 5 張；Bandcamp 標 mixtape
