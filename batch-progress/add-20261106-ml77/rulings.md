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

## 研究 b 組
- 24611：b 組 7 張鼓型判定——慢拖：The New Law《The Fifty Year Storm》（trip-hop／hip-hop breakbeat、電影感）、Pan Amsterdam《HA Chu》（爵士取樣 hip-hop，中慢速）；不明：Star Parks（樂團鼓＋拍手，偏輕）、Move 78、Long Arm、Random Rab、Dr. Toast（鼓型無這張的來源）。**無任何一張有攻擊性或舞池證據，無建議汰**；Random Rab（標籤 edm／dance）與 Dr. Toast（藝人層 thumping breaks 基底）舞池風險中等，標在 notes。
- 24612：Dr. Toast 沿用 ml72 研究稿不重查，只補鼓型行；原稿『建議主線汰』改為不達門檻（只有藝人層描述，無這張鼓型證據）。
- 24613：Pan Amsterdam 廠牌名（Def Pressé）只有 Bandcamp 文案暗示，facts 不寫確切廠牌；Norman Records 評論頁 403，內容引自搜尋摘要，單一來源。
- 24614：Star Parks、The New Law、Random Rab、Long Arm、Pan Amsterdam 的 label 卡單為空或未驗證，facts 不寫廠牌。

## 研究 a 組
- 24601：Era《Era》沿用 ml71 研究稿不重查；原稿「建議汰」撤回：鼓型為流行搖滾式持續鼓貝斯，非攻擊性、非舞池，依本輪標準判輕不汰；notes 補鼓型行（不明）。
- 24602：Potatohead People《Mellow Fantasy》沿用 ml68 稿；鼓型判慢拖（Dilla 式鬆散拍為主，個別曲 house／boogie 快段），不建議汰。
- 24603：BALTHVS 兩張地點矛盾（Bandcamp 標 San Diego、Riff Magazine 稱波哥大）：facts 並列註明；廠牌 Cubensis Records 單一來源。
- 24604：BALTHVS《Cause & Effect》鼓型標「不明」：文案列 deep house／disco 但無逐曲或 BPM 來源，證據不足不寫建議汰；主線知悉為本組最大舞池風險。
- 24605：Robot Koch、Moderator、Anthony Naples 鼓型判慢拖（半速重拍／boom bap 懶拍／鼓可有可無的 trip-hop 慢鼓），不建議汰；Naples 的 house／techno 標籤是出身風格非這張律動。

## 研究 d 組
- 24631：d 組七張鼓型判讀——Blackfish 慢拖（Bandcamp downbeat／groove，無 BPM）、Emapea 慢拖（boom bap 重鼓，x 貼邊 2.9）、Deceptikon 慢拖（鬆散不量化鼓機）、Brock Berrigan／Klangstein／Invisible Allies／Glen Porter 不明；七張皆無攻擊性或舞池推進的直接證據，無建議汰。
- 24632：Invisible Allies《Hyperdimensional Animals》Discogs 曲目 10 首中後 5 首為他人重混（MB 仍是 Album）；移交主線裁定是否比照 Quanta 先例以 remix 過半處理。
- 24633：Glen Porter 原稿「建議汰」是風格不符（吉他迷幻／衝浪搖滾）而非鼓型，依本輪規則改為不建議汰、鼓型不明，風格存疑留給主線。
- 24634：Blackfish 卡單 label 寫 blackfish productions，但 2001 原版是 Konvex | Konkav KK012；Klangstein 查不到樂評，status thin。

## 研究 c 組
- 24621：c 組 7 張鼓型判定——攻擊性：GILA《Energy Demonstration》（FACT「razor-sharp percussion、destructive art-trap」、Boomkat「bags of killer drums」、Bandcamp 自述 hard-edged bangers，標籤 techno／trap；**建議汰**，預估 x≈3.6）；慢拖：Random Rab《Awoke》（把握低，僅標籤與上一張宣傳稿）、Zero Cult《Closer Than Ever》（末曲〈Hit and Run〉廠牌文案特指舞池，前九首不是）、Evil Needle《Abyssal》（僅標籤 jazzy／lounge／neo-soul）；不明：Astronaut Ape（文案 progressive grooves、dub-like basslines，標籤含 Progressive Trance）、Jean du Voyage、Błoto（真人鼓加 TR-8／SPD-SX，商店文案 jazz／house／techno pulses）。其餘六張無攻擊性或舞池證據，不建議汰。
- 24622：Astronaut Ape（Progressive Trance）與 Błoto（house／techno pulses）舞池風險中等，但無 BPM、無樂評證據，依「判不出來的留」不汰，交評分。
- 24623：x 貼邊提醒（≤2.7 門檻）：Astronaut Ape 2.8、Jean du Voyage 2.8、Błoto 2.8；Zero Cult 卡單 1.8 我改估 2.2。
- 24624：Jean du Voyage、Evil Needle、Astronaut Ape、Zero Cult 查不到樂評，facts 只用 Bandcamp 頁面與廠牌文案，status 標 thin；WebSearch 用了 3 次（GILA、Błoto、Random Rab）。
- 24625：Free Jazz Blog 把 Błoto《Grzybnia》標 2025 年、團員名單與 Bandcamp 署名不同；採 Bandcamp／MB（2024-10-11，Cancer G 打鼓）。
