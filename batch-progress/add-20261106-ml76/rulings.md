# add-20261106-ml76 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 第三輪「有鼓」名單）

> 店主 2026-11-06：「有些要死不活的音樂也會有鼓推進」「全都上架吧」→ 前兩輪因「有拍推進」被研究層汰、或在第二輪前被舞池標籤篩掉的 473 張切十批（ml74–81、md44–45），五個工作階段並行；本工作階段做 ml76＋ml77。來源 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml76.json`（47 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml76.json` → `build-master.mjs ml76` → `master-ml76.json` → 卡單。評分照 10-23 店主「體感標準」與 CUR-DISPATCH「有鼓不等於躁」。目標格：**恍惚＝靜＋重＋暖，邊距 x≤2.7、y≥0.8、z≥0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml76-cards.json`（38 張；研究 a 8、b 8、c 8、d 8、e 6）。身分：MB 釘住 37、§1 人工 1（Smigonaut《Epitome》）。
> **預留：研究 a 24521–24530、b 24531–24540、c 24541–24550、d 24551–24560、e 24561–24570、鉤子 24571–24580、寫作 24581–24590、主線 24591–24600。**
---

## 主線策展（不佔條號；2026-11-06）
- **本輪汰除原則（店主 11-06）**：不准只因有鼓就汰。慢、拖、無力的鼓照 BRIEF 仍算靜；只有 (1) 鼓＋攻擊性（失真牆、嘶吼、音壓貼臉）、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）兩種才汰。**判輕、判冷不汰**——店主要「全都上架」，落不到恍惚的照實落其他格、在收工時計數。身分（EP／合輯／現場／remix／翻唱）、去重、同人超量照舊汰。
- 去重：`dupchk.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到的只有前兩輪本來就提過、被汰的同一張（本輪重提，本來就是這份名單的來源）。
- 同人上限：並行卡單（ml74／75／78–81、md44／45）與池中一起看。池中 ≥5 張或並行卡單另有多張的，本工作階段兩批合計最多一張；池中 0 且並行少的，兩批合計兩張以內。
- MB 逐張 search；名稱照 MB 正規名（THE NEW LAW→The New Law、dan le sac→Dan le Sac、FLOX→Flox、Gumi→GUMI、DEGIHEUGI→Degiheugi、盤名大小寫照 MB）；年份照 MB first-release-date（A Positive Life《Synaesthetic》1994、Neutron 9000《Lady Burning Sky》1994（Bandcamp 2021 為 Turbo 重發）、Era《Era》1996（選 1996 原版 RG，不取 2002 版）、Suduaya《Unity》2013）。AndyFellaz、GUMI、Dday One 的 MB release-group 無 primary type，曲數／長度（14 軌 45 分、9 軌 56 分、10 軌 30 分）屬正規專輯，照收。Flox《The Words》MB 只有「The Words (Bonus Version)」一個 RG，照用、queryAlias 帶原名。
- **沿用研究稿**：6 張是前一輪研究判有鼓而汰的，原研究稿從 `add-20261106-<原批>/dropped-research.json` 搬進本批研究檔（key 不變），研究層只補鼓的種類與缺口。
- **主線汰 9**：
  - Chillhop Music《Chillhop Essentials Fall 2019》：合輯：Chillhop 廠牌季度精選（MB Album＋Compilation）
  - Deeb《Slowmocean》：EP：MB primary type EP（8 首 34 分）
  - Purrple Cat《Above the Clouds》：同人超量：池中已 10 張，並行 ml74／75／78／80／81 卡單另有 6 張
  - The Bilinda Butchers《Night and Blur》：舞池推進：Bandcamp 文案與 ml70 研究稿皆寫以 90 年代 house、drum and bass 節拍為新方向
  - Moderator《The Mosaics》：同人超量：池中 1、並行 ml80 1、本工作階段兩批各一張；只收聽眾較多的《Sinner's Syndrome》
  - Chillhop Music《Chillhop Essentials Fall 2024》：合輯：Chillhop 廠牌季度精選 28 首 2xLP（MB Album＋Compilation）
  - Blockhead《Mortality Is Lit!》：同人超量：池中已 5 張、並行 ml78／80 另 3 張；本工作階段只收《Funeral Balloons》
  - Sweeps《waves of reflection》：同人超量：池中已 3 張；本工作階段只收《Life and Light》
  - Halina Rice《UNREALITY》：舞池推進：藝人自述「混合舞曲類型、讓人想動」，樂評寫解構俱樂部節奏（ml73 研究稿）

## 研究 e 組
- 24561：e 組 6 張依「有鼓不等於躁」判鼓型，沒有任何一張判攻擊性或舞池，**無建議汰**。Sweeps 慢拖（僅標籤）、Tryphème 慢拖、Dday One／Shinji／Nightflyer／Smigonaut 鼓型不明（無來源證實舞池）。
- 24562：Dday One 廠牌改採 The Content Label（LCNT1040，soundshelter；維基另列 Needlework UK），推翻前稿「廠牌未確證」；facts 補到 10 條。
- 24563：Smigonaut《Epitome》有 breakbeat／house／midtempo bass 影響與 drum & bass 簡介，但作者自述起點 downtempo、「不是音響系統唱片」，判不出來就留；列為風險，卡單 x 2.2 建議上調到 2.8。
- 24564：Shinji 貼 x 2.7 邊（預估 2.8），Nightflyer 預估 x 2.8、y 0.6，Sweeps y 0.6 偏輕，皆照實寫預估不汰。

## 研究 d 組
- 24551：d 組 8 張皆無「攻擊性或舞池」的本張證據，全數不建議汰；鼓型無直接來源者統一標「不明」。AndyFellaz 沿用 ml70 稿，只補鼓型行。
- 24552：Govinda《Resonance》僅 6 首約 25 分鐘，篇幅近 EP，MB 登記 Album，維持主線裁定。
- 24553：Saffron Bloom 鼓型判慢拖（low slung stripped back breaks、trip hop），但 z 恐偏冷；Tek 9、Erik Jackson、Tusks 的 y 恐偏輕，GUMI 的 x／z 貼邊，已在各自 notes 標 moodGuess 存疑。

## 研究 a 組
- 24521：a 組 8 張鼓型：慢拖 4（Long Arm、Wax Tailor、Moonchild、Blockhead）、不明 1（Shpongle，沿用稿只補鼓型行，有真鼓手但無來源說慢拍或舞池，不汰）、舞池 2、攻擊性 1。
- 24522：建議汰 3：Little Dragon《Machine Dreams》（舞池，信心中：維基稱轉向適合現場的 uptempo 舞曲，無 BPM，主線可覆核）、Abakus《Departure》（舞池：樂評 progressive house／trance／Daft Punk 式，標籤 club／house／techno）、Smidley《Smidley》（攻擊性，信心中：搖滾編制整套鼓，樂評 bombastic／grungy／as heavy as Foxing，樂評句取自搜尋摘要）。
- 24523：Wax Tailor、Moonchild 鼓型無直接描述，以風格標籤判讀慢拖；Blockhead Bandcamp 文案有 upbeat／chase-scene 段，x 預估上調到 2.9，貼邊風險中，不汰。
- 24524：Wax Tailor 發行日三說（MB 法國 2012-09-10、Bandcamp 09-14、維基北美 09-18），採 MB。Shpongle 沿用稿去掉原本「偏輕建議汰」，依本輪規則判輕不汰。
- 24525：WebSearch 用 3 次（Smidley、Long Arm、Blockhead）；Bandcamp 直連被擋，改 WebFetch。
