# add-20261106-ml71 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 候選第二輪 A：靠近邊界的那批）

> 店主 2026-11-06「繼續」：第一輪（ml68–70、md39–41）卡單 289 上線 104 後，剩下靠近邊界的 612 張先照第一輪教訓過濾（拿掉 house／techno／breakbeat／funk／hip-hop／dub／soul／pop 等標籤 378 張、<30 分 2 張）→ 232 張分五批、三個工作階段並行（本工作階段 ml71＋ml72；另兩個做 ml73＋md42、md43）。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml71.json`（52 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml71.json` → `build-master.mjs ml71` → `master-ml71.json`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜＋重＋暖**，邊距 x≤2.7、y≥0.8、z≥0.3。**第二輪卡單 moodGuess 多半貼邊（z 多為 0–0.2），研究層要確實判聲音：判輕、有拍推進、判冷的一律標存疑，主線照汰、不補人。**
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml71-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 36、§1 人工 1（Science Of Sleeping《Sleep Cinema》，Bandcamp＋Apple 1756950809）。
> **預留：研究 a 23961–23970、b 23971–23980、c 23981–23990、d 23991–24000、e 24001–24010、鉤子 24011–24020、寫作 24021–24030、主線 24031–24040。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 52 張：去重（seed、所有 manifest、`data/pool-removed.json`、所有 curation）0 撞池；撞到舊提名 1 張（A Forest Mighty Black，先例已汰）。
- MB release-group 搜尋＋Bandcamp 頁 ld+json（盤名、日期、廠牌、曲目）逐張回查。年份照 MB first-release-date：Era 1996（MB 同名 RG 兩個，釘 1996 那個 90db6934）、Carbon Based Lifeforms《Interloper》2010、ASURA《Life²》2007、AES DANA《Memory Shell》2004、Hibernation 2008、desert sand feels warm at night 上下集 2019、Lindsheaven Virtual Plaza《Nordwrong》2013（Bandcamp 日期皆為重發）。
- **主線汰 15**：
  - A Forest Mighty Black《Mellowdramatic》：先例已汰（ml40 研究：無聲音證據、存疑高，主線汰）
  - Carbon Based Lifeforms《ALT:01》：MB Album＋Compilation（舊曲另版重製合集）
  - Carbon Based Lifeforms《ALT:02》：MB Album＋Compilation（舊曲另版重製合集）
  - Blue States《Restless Spheres》：同人錨點判輕（池中《Man Mountain》y 0.1 落放鬆），卡單 y 0.7 貼邊
  - Kaya Project《The Ambient Mixes》：MB Album＋Compilation（混音版合集）
  - Zero 7《The Garden (Special Edition)》：池中已有《The Garden》，特別版擴充重發
  - Amon Tobin《Monthly Joints Series》：MB Album＋Compilation（每月單曲合集）
  - State Azure《Dreams》：Tangerine Dream 翻唱專輯（MB Remix）
  - Bluetech《Dreaming Into Being》：同人超量（池中已 4 張，含 ml70《Spacehop Chronicles 2》）
  - Bluetech《Sci-Fi Lullabies》：同人超量（池中已 4 張）
  - Glen Porter《The Devil Is A Dancer, The Piper Is A Madman》：MB EP
  - Hello Meteor《Night Supply》：先例同型判輕（ml70 兩張 Hello Meteor cozywave 判輕汰）、池中已 2 張
  - State Azure《Mirror Infinite》：同人錨點判冷（池中兩張 z −0.2／−0.7）
  - Anthemics《YONDER》：MB Album＋Soundtrack（原聲帶）
  - Leif《Liminal Pieces》：MB Album＋Compilation
- Somatoast《Goop》MB RG 沒標 primary type（7 首 32 分），比照 ml70 AndyFellaz 先例視同 Album，研究層核對是否全長。
- label 欄多為 Bandcamp 帳號名，Bandcamp 帳號＝藝人本人或個人名的（Seb Taylor、monde ufo、Astropilot）留空。
- 同藝人：Delerium 2（ml72 另 1）、ASURA 2（ml72 另 1）、Nym 2、desert sand feels warm at night 2；其餘一人一張。

## 研究 e 組
- 24001：e 組 5 張的聲音證據只有 Bandcamp 頁（標籤、曲長、簡介）、MB 與少量樂評（Deadbeat 兩篇），沒有實聽；Deadbeat 判靜重暖成立。
- 24002：Crystal Vibe《Change Is the Only Constant》moodGuess 存疑（psychill 有持續拍子、單曲 8–10 分鐘舞池式展開）；卡單 label 空白，實為 Altar Records。
- 24003：glaciære《pool water blue》moodGuess 存疑判輕（Sunvox 小品 library music，29 分鐘十首，夏日泳池意象）。
- 24004：woob《Have Landed》moodGuess 存疑（四個年代拼貼、含 Max & Harvey 舊作，非統一靜重暖）。
- 24005：Lindsheaven《Nordwrong》保留；mallsoft 霧感合理，但溫度不確定，無第三方樂評。年份 2013 無誤。
