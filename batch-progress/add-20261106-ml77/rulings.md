# add-20261106-ml77 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 第三輪「有鼓」名單）

> 店主 2026-11-06：「有些要死不活的音樂也會有鼓推進」「全都上架吧」→ 前兩輪因「有拍推進」被研究層汰、或在第二輪前被舞池標籤篩掉的 473 張切十批（ml74–81、md44–45），五個工作階段並行；本工作階段做 ml76＋ml77。來源 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml77.json`（47 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml77.json` → `build-master.mjs ml77` → `master-ml77.json` → 卡單。評分照 10-23 店主「體感標準」與 CUR-DISPATCH「有鼓不等於躁」。目標格：**恍惚＝靜＋重＋暖，邊距 x≤2.7、y≥0.8、z≥0.3**。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml77-cards.json`（34 張；研究 a 7、b 7、c 7、d 7、e 6）。身分：MB 釘住 33、§1 人工 1（LAL《Find Safety》）。
> **預留：研究 a 24601–24610、b 24611–24620、c 24621–24630、d 24631–24640、e 24641–24650、鉤子 24651–24660、寫作 24661–24670、主線 24671–24680。**
---

## 主線策展（不佔條號；2026-11-06）
- **本輪汰除原則（店主 11-06）**：不准只因有鼓就汰。慢、拖、無力的鼓照 BRIEF 仍算靜；只有 (1) 鼓＋攻擊性（失真牆、嘶吼、音壓貼臉）、(2) 舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）兩種才汰。**判輕、判冷不汰**——店主要「全都上架」，落不到恍惚的照實落其他格、在收工時計數。身分（EP／合輯／現場／remix／翻唱）、去重、同人超量照舊汰。
- 去重：`dupchk.mjs`（seed、所有 manifest、`data/pool-removed.json`、所有 curation）撞池 0；撞到的只有前兩輪本來就提過、被汰的同一張（本輪重提，本來就是這份名單的來源）。
- 同人上限：並行卡單（ml74／75／78–81、md44／45）與池中一起看。池中 ≥5 張或並行卡單另有多張的，本工作階段兩批合計最多一張；池中 0 且並行少的，兩批合計兩張以內。
- MB 逐張 search；名稱照 MB 正規名（THE NEW LAW→The New Law、dan le sac→Dan le Sac、FLOX→Flox、Gumi→GUMI、DEGIHEUGI→Degiheugi、盤名大小寫照 MB）；年份照 MB first-release-date（A Positive Life《Synaesthetic》1994、Neutron 9000《Lady Burning Sky》1994（Bandcamp 2021 為 Turbo 重發）、Era《Era》1996（選 1996 原版 RG，不取 2002 版）、Suduaya《Unity》2013）。AndyFellaz、GUMI、Dday One 的 MB release-group 無 primary type，曲數／長度（14 軌 45 分、9 軌 56 分、10 軌 30 分）屬正規專輯，照收。Flox《The Words》MB 只有「The Words (Bonus Version)」一個 RG，照用、queryAlias 帶原名。
- **沿用研究稿**：5 張是前一輪研究判有鼓而汰的，原研究稿從 `add-20261106-<原批>/dropped-research.json` 搬進本批研究檔（key 不變），研究層只補鼓的種類與缺口。
- **主線汰 13**：
  - Thievery Corporation《Babylon Rewound》：非正規專輯：MB Album＋Remix，《The Richest Man in Babylon》的八首重混
  - Chillhop Music《Chillhop daydreams 2》：合輯：Chillhop 廠牌系列精選（MB Album＋Compilation）
  - The Orb《Okie Dokie It´s The Orb On Kompakt》：舞池推進＋先例：Kompakt 四拍 ambient house，ml61 已因四拍汰；池中 The Orb 已 8 張
  - Chillhop Music《Chillhop Essentials Winter 2024》：合輯：Chillhop 廠牌季度精選 28 首 2xLP
  - Blockhead《It's Only A Midlife Crisis If Your Life Is Mid》：EP：MB primary type EP，Bandcamp 文案自稱 new EP（6 首 35 分）
  - The Orb《Prism》：舞池推進：ml70 研究稿寫 drum & bass 與硬科技舞曲段落；池中 The Orb 已 8 張
  - Quanta《Elements》：remix 過半：6 首裡 3 首是別人的重混（LubDub、AkAshA Experience ×2）
  - Zero Cult《Eclectica》：同人超量：並行 ml79／81 另 2 張；本工作階段只收《Closer Than Ever》
  - Jogging House《Fiber》：同人超量：池中 1、並行 ml74／81／md45 另 7 張；本工作階段只收《Rendezvous》
  - Purrple Cat《Cypress Manor》：同人超量：池中已 10 張
  - Billy Valentine《Billy Valentine & The Universal Truth》：翻唱專輯：全盤翻唱 Gil Scott-Heron、Marvin Gaye、Curtis Mayfield 等人的歌
  - My Neighbour Is《Moon's Reflection On A Quiet Lake》：舞池推進：Cold Busted 文案直述 funky dance floor nuggets、punchy rolling rhythms
  - Banco de Gaia《30 Times Around the Sun》：合輯：三十年回顧選集（MB Album＋Compilation，30 首 211 分）
