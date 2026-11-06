# add-20261106-ml78 裁定（情緒薄格策展線・恍惚 Bandcamp「有鼓」名單第三輪）

> 店主 2026-11-06：「有些要死不活的音樂也會有鼓推進」「全都上架吧」→ CUR-DISPATCH「有鼓不等於躁」。第三輪把前兩輪因有拍推進被研究層汰、或被標籤先篩掉的 473 張切十批、五個工作階段並行；本工作階段做 ml78＋ml79。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml78.json`（47 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml78.json`（`curation-from-pick-ml78.mjs`）→ `build-master.mjs ml78` → `master-ml78.json` → 卡單。評分照 10-23 體感標準。目標格：**恍惚＝靜＋重＋暖**。**這輪不准只因有鼓就汰**：慢、拖、無力的鼓仍算靜；只有鼓＋攻擊性（失真牆、嘶吼、音壓貼臉）或舞池推進（四拍底鼓、house／techno／breakbeat 跳舞律動、明顯中快速）才汰。判輕、判冷不汰，落其他格照實記。
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml78-cards.json`（38 張）。
> **預留：研究 a 24681–24690、b 24691–24700、c 24701–24710、d 24711–24720、e 24721–24730、鉤子 24731–24740、寫作 24741–24750、主線 24751–24760。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 47 張：去重（seed、所有 manifest、`data/pool-removed.json`，`pool-keys.mjs` 鍵規則）0 撞池；MB release-group 搜尋逐張回查（`mb.json`）。
- **主線汰 9**（店主 11-06「有鼓不等於躁」：不因有鼓汰；只汰身分、去重、同人超量，以及前次研究稿已寫明的舞池推進）：
  - Chillhop Music《Chillhop Essentials Summer 2019》：廠牌季刊合輯（MB Album＋Compilation），比照 ml69 Chillhop 季刊先例
  - Parra for Cuva《Mimose》：舞池推進（ml72 研究稿：官方簡介 groovy basslines、trance-inducing shakers，MB 歸 dance，有人聲、偏舞曲的律動電子；照「有鼓不等於躁」第二種汰）
  - Entheogenic《Enthymesis》、《Animism》：同人超量（本批 3 張、ml79 另 2、並行 ml74／75／80 另 6；本線兩批合計留 2：本批《Spontaneous Illumination》（收聽最多）、ml79《Golden Cap》）
  - Blockhead《Luminous Rubble》：同人超量（池中 5 張，並行 ml76／77／80 另 4；本批留《Downtown Science》）
  - Purrple Cat《Night Train》：同人超量（池中 10 張）
  - A.L.I.S.O.N《Tapes #3-1》：MB Album＋Compilation（115 分 32 首卡帶合集）
  - DJ Food《Kaleidoscope Companion》：池中已有《Kaleidoscope》，這張是 2021 年的伴隨補遺集（128 分，未發表曲與另版），比照 ml71 Astropilot《Unseen Chapters》補遺先例
  - Thievery Corporation《It Takes a Thief.》：2010 年精選（The Thievery Corporation Collection，69 分 16 首），MB 同名 RG 是 1999 年另一張 EP
- 留下但註記：Robert Glasper《Black Radio III》池中已 6 張，但本線第一次收、是重要專輯，不算本線灌同人；Somatoast《Goop》MB 無 primary type，照 ml71 研究視同全長（Gravitas 稱 second album）；Kalya Scintilla《Open Ancient Eyes》180 分含一條 77 分鐘連續混音，MB 只登一個 release，卡面以 15 首為準；Hibernation《Organic Technology》134 分，研究層核對是否含整張連續混音。
- 年份照 MB first-release-date：AES DANA《Pollen》2012（卡單 2017 為重發）、Saafi Brothers《Liquid Beach》2003、DJ Mayonnaise《Still Alive》2007。Kuba 照池中與 MB 寫法（卡單 KUBA）。
- §1 人工身分 5：Marley Carroll《Sings》（Apple 1824096798）、Sweatson Klank《Super Natural Delights》（Apple 1459382627）、Charlie North《The Spaces In Between》（Apple 274545227）、cehryl《You Win Some, You Lose A Lot》（Apple 1853436940）、Kaisaku《Aishū》（Apple 1455008021）；各附 Bandcamp 頁。
- **沿用前次研究稿**（`batch-progress/add-20261106-<批>/dropped-research.json`）：Nym（ml71）、Kalya Scintilla（ml72）、Charlie North（ml73）、Somatoast（ml71）——研究層只補不足、把鼓的種類寫清楚，不整張重查。

## 研究 d 組（24711–24720）
- 24711：Charlie North《The Spaces In Between》、Somatoast《Goop》沿用前次研究稿（ml73／ml71），各補 0 條；前次的「建議汰」「有拍推進」改寫成本輪判斷（Somatoast 判慢拖偏顛簸型，Charlie North 鼓種判不出），均不汰。
- 24712：鼓種判定一律以文字證據為準；Bandcamp 標籤（drum & bass、house、techno、trance）單獨不足以判舞池推進。Solid Doctor（廠方 subtle beats）判慢拖輕拍；Kalpataru Tree（簡介 mid-tempo grooves）判中速律動、dub 骨幹；fat jon 前半慢拖 boom bap、後半廠牌稱 energizing breakbeats（hip-hop 式，非舞池）；Hello Meteor、ASURA、Zen Baboon 判不出。無一建議汰。
- 24713：moodGuess 存疑（僅供評分參考，不汰）：fat jon 後半判躁／判輕；Hello Meteor 判輕；Charlie North 判輕；Zen Baboon（techno 標籤）、ASURA（trance 標籤）可能偏躁；Somatoast glitch 偏冷偏輕。
- 24714：ASURA《Renaissance》Bandcamp 日期 2023-09-23，MB 與音樂節頁皆 2023-07-07，卡面年份照 MB 2023。Solid Doctor 原版 1996，Bandcamp 2015 為 Déclassé 重發，年份照 MB 1996。
- 24715：Zen Baboon、Hello Meteor 無第三方資料，status thin；Hello Meteor 曲長加總 42 分，卡單 curatorWhy 寫 45 分，以 Bandcamp 加總為準。

## 研究 e 組（2026-11-06）
- 24721：e 組六張無一在「沿用前次研究稿」名單（curatorRisk 的前次理由只是標籤篩掉），全部新查；以 Bandcamp 頁、Apple lookup、MB 為主，WebSearch 用 3 次（Hibernation、DJ Phixion、Kaisaku），只有 Hibernation 前作與 Kaisaku 藝人介紹有可用內容。
- 24722：六張都找不到本盤的獨立樂評或廠牌文案提到鼓；鼓的種類一律寫「判不出」並註明標籤推判屬未聽證，不因此建議汰；沒有任何一張有舞池推進或攻擊型的證據。DJ Phixion 為鼓手出身、boom bap，推判慢拖型。
- 24723：Hibernation《Organic Technology》134 分已核對：含第 14 個檔案 68 分半的連續混音，13 首專輯曲目約 65 分鐘；卡面以 13 首約 65 分為準，不寫 14 首／134 分。
- 24724：Caspro《OFFLINE》Bandcamp 與 Apple 均 8 首約 31 分（卡單 9 首 36 分不符），卡面以 8 首為準。
- 24725：cehryl 廠牌依 Apple ℗ 為 Pilot Study Records（卡單 label 空白）；Project Lazarus 的 Apple 版（2020、℗ Boris Segal）是後出串流版，年份維持 2019。
- 24726：moodGuess 存疑：cehryl 判輕；Kaisaku 的「無鼓」預估無依據（future garage 可能有碎拍）、偏冷暗；Hibernation、Project Lazarus、Caspro 的 y 判輕；DJ Phixion x 2.9 在慢拖上限。主線這輪不因判輕汰。五張 thin、Hibernation full（僅因來源多，仍無獨立樂評）。

## 研究 c 組（2026-11-06；條號 24701–24703）
- 24701：c 組 8 張無「前次研究稿」可沿用（dropped-research.json 只有 ml73 Charlie North，非本組），全部新查。WebSearch 3 次用完（Akal Dub、Marley Carroll、Sweatson Klank，皆無樂評命中），其餘靠 Bandcamp ld+json、MB、iTunes lookup、維基 Polyenso／Tom Bailey。
- 24702：鼓的種類一律採保守寫法：有廠方或樂評文字的才下型別（International Observer＝dub 慢拖無力；Sweatson Klank＝鬆拍為主、僅尾曲〈Ubiquitous〉為舞池曲，整張不歸舞池推進）；其餘（Gas Lab、Akal Dub、pheel.、John Dunder、Marley Carroll、Polyenso）沒有速度證據，寫「判不出」，不建議汰。判輕參考：Polyenso、Marley Carroll、Sweatson Klank。
- 24703：年份以 MB first-release-date 為準，Bandcamp 頁面日期不同者寫入 notes（Akal Dub 2014 對 Bandcamp 2019；International Observer 2007-08-27 對 2007-01-09；pheel. 2023-10-31 對 2023-10-24）。Akal Dub 曲數 Bandcamp 8 首、Apple 6 首，卡面以 Bandcamp 為準。

## 研究 b 組（24691–24700）
- 24691：Kalya Scintilla 沿用 ml72 研究稿（key 照本批卡單），facts 已 10 條不補，只在 notes 補鼓型：約 90–100 BPM 中慢速 world bass 持續推進，非舞池四拍、非攻擊，本輪規則下不汰。
- 24692：鼓型一律以文字來源為準，Apple 30 秒試聽的粗略自相關 BPM 只寫在 notes 並標「粗估，非引用來源」；高估值（129／136）多為倍頻誤判，不當證據。
- 24693：Saafi Brothers《Liquid Beach》年份 Bandcamp 顯示 2002、MB 2003-03-11、Apple 2003；照主線規則用 MB 的 2003。廠牌查無明確（Apple ℗ 為藝人自己的 le mar production），不寫廠牌。
- 24694：YOUTH 83《Progress Way》Bandcamp／MB 2023-01-03，Apple 2022-08-19；取 2023，status thin（無樂評、無人物故事；WebSearch 無結果）。
- 24695：ATTLAS《Lavender God》標籤 edm／progressive（MB 流派 progressive house）是前次汰除原因，但文字來源只見『沉思、從容步調』，判不出舞池推進，notes 標判輕、判亮、建議主線不汰；後三首長曲（Sinner Complicated、Hotel、More Than That）未能確認。
- 24696：Fieh 廠牌（疑 Jansen Records）頁面已過期無法核實，不入 facts；Bandcamp 簡介中 D'Angelo 比較句語意不明，不入 facts。
- 24697：DJ Mayonnaise 廠牌僅 Apple ℗ 單一來源，facts 掛名但 notes 提醒寫作層不要當第一手說法；與 Anticon 的關係只有標籤，不寫。
