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

## 研究 a 組（24681–24690；2026-11-06）
- 24681：8 張全部以「鼓的種類」寫聲音條；BPM 為 Apple 30 秒試聽自寫自相關粗估（倍速誤判已折半），只寫範圍，不當定論。
- 24682：Nym 沿用 ml71 研究稿（補 2 條）；前次「建議汰」依舊版規則，本輪改判慢到中速鼓機拍、不汰。
- 24683：crushed《extra life》：Bandcamp 稱 2023 出道 EP（原版 6 首約 26 分），卡單 8 首 33 分是 2024 Ghostly 黑膠版（含 2 首混音）；MB 登錄 Album。研究層不汰，列為主線決定項（類型與卡面曲數）。
- 24684：Romare《Love Songs: Part Two》、AES Dana《Pollen》、Entheogenic《Spontaneous Illumination》鼓種類寫「判不出」（Romare 約三分之一曲接近 110–120 BPM；AES Dana 簡介稱 deep tech／progressive trance；Entheogenic 長曲估計分散），不寫建議汰。
- 24685：Arms and Sleepers 卡單 18 首／61 分是串流版，Bandcamp 官方頁 17 首（缺〈Can You〉）；廠牌不明（版權為樂團自己），卡面建議不寫廠牌。
- 24686：moodGuess 存疑（判輕或判重，僅供評分）：Blockhead、Romare、Glasper、Nym 判輕；Arms and Sleepers、AES Dana 判重偏暗。無一張確定為舞池推進或攻擊型。

## 主線研究汰換（不佔條號；2026-11-06）
研究層 a–e 交件（38 張）。照「有鼓不等於躁」只汰攻擊型、舞池推進型與身分問題；判輕、判冷、判不出的一律留給評分 → 汰 2、剩 36；被汰卡移到 `dropped-cards.json`／`dropped-research.json`，不補人。
- 身分 1：crushed《extra life》（研究 a：Bandcamp 自稱 2023 年出道 EP，原版 6 首約 26 分；卡單 8 首 33 分是 2024 年 Ghostly 黑膠擴充版，多兩首他人混音；MB 雖登 Album，照 Bandcamp 本人說法視為 EP）
- 舞池推進 1：AES DANA《Pollen》（研究 a：Ultimae 簡介自稱 deep tech／progressive trance，試聽有兩首約 130–139 BPM）
- 留下（判不出或慢拖／中速，交評分）：Romare（house／disco 中速律動，約三分之一曲近 110–120 BPM，四拍底鼓是否持續判不出——照「判不出的留」）、Entheogenic（長曲速度分散）、Saafi Brothers（dubwise chugging beat 中速）、Marley Carroll（一首被形容 dancey、標 House，未證實舞池推進）、Lord Of The Isles（breaks、慢速 4x4 與 ambient 並存）、Kalpataru Tree（中速 dub 骨幹）、Kalya Scintilla（約 90–100 BPM 持續推進、非四拍）、fat jon（後半 hip-hop 式 breakbeat）、Blockhead／Glasper／Arms and Sleepers／Nym／DJ Mayonnaise／DJ Phixion（boom bap／半速嘻哈拍，慢拖到中速）。
- 研究層更正卡單：Hibernation《Organic Technology》134 分含約 68 分半連續混音，專輯本體 13 首約 65 分；Caspro《OFFLINE》實為 8 首約 31 分；Arms and Sleepers Bandcamp 官方 17 首；cehryl 廠牌 Pilot Study Records（Apple ℗）。

## 鉤子層（d、e；24736–24740）
- **24736** 交件：`desc-tools/batches/hooks/add-20261106-ml78-hooks-d.json`（8）、`-e.json`（6），key 與順序照研究稿。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 上限 170、full 230。逐筆預算／hook 加權（原始字元）：Hello Meteor 158／18（18）、fat jon 225／16.5（21）、Solid Doctor 215／18.5（21）、Charlie North 209／18（18）、Kalpataru Tree 212／18（18）、ASURA 217／18（18）、Somatoast 223／22.5（25）、Zen Baboon 169／19（19）、cehryl 146／16.5（21）、Kaisaku 166／21（21）、Hibernation 227／17.5（19）、Project Lazarus 164／24（24）、DJ Phixion 157／21（21）、Caspro 166／19（19）。初稿 7 張超標（最高 Solid Doctor／Hibernation 279），整格捨去：Hello Meteor 的 Bufu 俳句與曲長、fat jon 的法蘭克福與曲數、Solid Doctor 的 Poisson Ville、目錄號與第二長曲、Somatoast 的〈Obscurity Security〉、Zen Baboon 總長、Hibernation 的 Angel Tears 與長笛／豎笛樂手、Caspro 中段兩曲名。壓完回核：hook 依賴格全在 g1（DJ Phixion 改 hook 後把城市曲名前移到 g1；Caspro 的首尾曲名留在 g1）。
- **24737** 骨架歸屬（14 張 14 條；避開 a–c 研究稿的明顯骨架：International Observer＝樂團主唱的副業名號、Dj Mayonnaise／Lord Of The Isles＝一人包辦、Gas Lab＝短小品、Kalya＝連續混音、Akal Dub＝長曲）：Hello Meteor＝專業術語借作盤名（賞鳥）；fat jon＝被問存歿的低調概念（盤名自述）；Solid Doctor＝原版十九年後重發；Charlie North＝自寫程式與電腦即興合奏；Kalpataru Tree＝聲音構造（盤旋吉他＋推進貝斯的中速 dub），首度上 Bandcamp 只當一格；ASURA＝概念盤（一生九章、法文重生）；Somatoast＝製作方法（glitch 聲音設計放進 dub 框架）；Zen Baboon＝給聽眾的夏日寄語＋自家工作室；cehryl＝時間膠囊（一個冬天一座城錄成、語音留言）；Kaisaku＝自報影響名單；Hibernation＝隔 8 年回到個人名義（冬眠名字的玩笑）；Project Lazarus＝蘇聯符號（自貼 USSR 標籤、佚名蘇聯畫家封面、俄文曲名）；DJ Phixion＝鼓手兼唱盤手＋城市曲名；Caspro＝曲序像一天（清晨電話到深潛）。「睽違／隔 N 年」只給 Hibernation，ASURA 的九年整格捨去；Kaisaku 的「哀愁」盤名只當（一句），不與 Hello Meteor 搶盤名骨架。a–c 交件後若撞骨架，由主線比對；可逆（改 note 主故事格）。
- **24738** hook 四型：懸疑（fat jon、Zen Baboon）／斷言（Hello Meteor、ASURA、Hibernation、Solid Doctor）／場景（Kalpataru、Caspro、cehryl、Somatoast）／人物定調（Charlie North、Kaisaku、Project Lazarus、DJ Phixion）。同藝人舊卡避開：Hello Meteor（ml68 西雅圖、虛構機構）、Kalpataru Tree（ml68 Curtis Humphrey／奧勒岡、ml69 阿許蘭／後門溜進）、ASURA（md43 銀河序曲、ml71 Ultimae 誕生與里昂）、Fila Brazillia 系（犬名團名、Pork／Twentythree）皆不再用；Kalpataru 第二句改「這是 Kalpataru Tree 的 psy dub 作品」，ASURA 改「法國人 Charles Farewell 以 ASURA 之名的第六張」。
- **24739** 第二句句型配表／「他」引入：Hello Meteor「做 chillwave 合成器音樂的…」；fat jon「本名…、辛辛那提出身的…」（hook 只帶名字，第二句補身分＋Nujabes 原聲）；Solid Doctor「…是赫爾的 Steve Cobby 的個人名義」（hook 只有年份）；Charlie North「英國電子與氛圍音樂人…」（hook 用「他」）；Kalpataru「這是…的 psy dub 作品」；ASURA「這是法國人…以…之名的第六張」；Somatoast「…是 Mark Rubin 的名號」；Zen Baboon「地點標葡萄牙的…」；cehryl「香港創作歌手兼製作人…」（研究稿無性別，note 一律寫「作者」不用他／她）；Kaisaku「加拿大安大略省的製作人…」（hook 用「他」）；Hibernation「…是英國布萊頓的 Seb Taylor」；Project Lazarus「…做 chillwave」；DJ Phixion「加州出身、現居盧森堡的…」；Caspro「自稱來自沙漠的電子音樂人…」。「日」後一字：fat jon 日限、Kalpataru 日原、Somatoast 日開、Hibernation 日回；其餘只寫到年或月。
- **24740** n-gram 自查：d／e hook 間中文 4-gram 0；對 11-04／11-06 所有已交 hook 掃到 3 條（「盤名借自」對 ax2、「製作人把」對 ml79 Nanosphere、「鼓手出身」對 ml79 Robot Koch），已改寫，複掃 0；開頭前四字 14 張互異。hook 與 note 無逐字重複句。事實自驗：Charlie North 初稿 hook「會自己即興的程式」超出來源，改「自己寫音樂程式，再跟電腦即興合奏」；DJ Phixion 初稿「全自己來」與 Dj Mayonnaise 一人包辦骨架相近，改走鼓手＋城市曲名。腳本：`qa-batch hooks` 只報 a／b／c 缺檔；`chk-hook-crossgroup` d／e 2 組 14 張全部通過（hook 加權 16.5–24，note 151–234）。

## 鉤子層（a、b、c；24731–24735）
- **24731** 交件：`desc-tools/batches/hooks/add-20261106-ml78-hooks-a.json`（6）、`-b.json`（8）、`-c.json`（8），key 與順序逐字照研究稿（汰換後 22 張），欄位只有 key／hook／note。公式照 HOOK-DISPATCH §二：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（「第二句以…領句」「懸念在…收」「簡介的話一律寫成簡介自述」「發行年寫…」計入）；thin 170、full 230。逐筆（預算／上限｜hook 加權｜原始字元）：a — Blockhead 214/230｜23｜29、Romare 179/230｜18｜18、Entheogenic 226/230｜18｜25、Glasper 224/230｜19｜27、Nym 161/170｜18｜18、Arms and Sleepers 188/230｜21｜21；b — Lord Of The Isles 228/230｜18｜24、YOUTH 83 170/170｜18｜18、Saafi Brothers 216/230｜14｜14、Dj Mayonnaise 156/170｜14｜14、Fieh 228/230｜19｜24、Kuba 228/230｜24.5｜28、Kalya Scintilla 216/230｜20｜22、ATTLAS 198/230｜16.5｜26；c — Gas Lab 163/170｜16.5｜20、Polyenso 224/230｜21｜25、Akal Dub 146/170｜13｜13、International Observer 229/230｜19.5｜27、Marley Carroll 162/170｜18｜18、John Dunder 167/170｜19｜19、Sweatson Klank 221/230｜19｜26、pheel. 167/170｜13｜13。初稿 18 張超標（最高 Glasper 296），整格捨去：Blockhead 曲數與 DVD；Romare 廠牌與總長；Entheogenic「第二張」與 8 週重複句；Glasper 的 Rolling Stone 兩句、Esperanza Spalding、〈Better Than I Imagined〉單曲獎；Nym 的〈The Ballad of Dylan Owen〉與 Morricone／Leone 致謝；Lord 的戶外與電影配樂自述；Saafi 的〈Lovin' Music〉與總長；Fieh 的人物題材；Kuba 的 John Leckie 與曲數；Kalya 的〈Scintillating Sands〉小提琴與旁白曲名；ATTLAS 的 DJ Mag 與〈A Ray of Light〉；Gas Lab 總長；Akal Dub 曲名；IO 的紐西蘭／印度／英國歲月與 Augustus Pablo；Marley 的〈Black Light〉吉他手；Dunder 的總長與「第二代」；pheel. 的最長曲。壓完回核 hook 依賴：Romare 那箱唱片在 g2；Akal Dub 吉他手在 g3（「懸念在第三項收」）；Kalya 連續混音曲名在 g4、hook 自帶 77 分鐘；Lord 的 Sagan 由 hook 自帶；Kuba 的錄音室在 g2；其餘 hook 事實自帶或在 g1。
- **24732** 全批 36 張骨架歸屬（每條只一張；d、e 照 24737 已交，a–c 這邊讓路改了七張）：Blockhead＝幕後製作人轉台前；Romare＝朋友送的一箱唱片成了取樣；Entheogenic＝排行榜榜首（全批「成績」骨架只此一張）；Glasper＝系列續集的客座陣容（葛萊美只當末格）；Nym＝曲名演成西部片；Arms and Sleepers＝取材真實社會事件；Lord Of The Isles＝取樣名人嗓音收尾；YOUTH 83＝整頁簡介只有一句；Saafi Brothers＝放鬆與跳舞兩用的雙重性；Dj Mayonnaise＝一人包辦；Fieh＝外請名家製作與混音；Kuba＝借別人的海外錄音室寫成；Kalya Scintilla＝附錄連續混音；ATTLAS＝大牌 DJ 的廠牌出首作；Gas Lab＝極短小品集；Polyenso＝樂團改名轉向；Akal Dub＝唯一署名的樂手；International Observer＝流行樂團主唱的 dub 副業；Marley Carroll＝在家錄完卻自稱英國聲音；John Dunder＝虛構角色的故事設定；Sweatson Klank＝地方節拍場景出身；pheel.＝曲名標點的形式。d、e：Hello Meteor＝術語借作盤名；fat jon＝被問存歿的低調概念；Solid Doctor＝原版十九年後重發；Charlie North＝與電腦即興合奏；Kalpataru Tree＝聲音構造；ASURA＝一生九章概念盤；Somatoast＝製作方法；Zen Baboon＝給聽眾的夏日寄語；cehryl＝時間膠囊；Kaisaku＝自報影響名單；Hibernation＝隔 8 年；Project Lazarus＝蘇聯符號；DJ Phixion＝鼓手兼唱盤手＋城市曲名；Caspro＝曲序像一天。**讓路紀錄**（與 d–e 交件稿對撞後改）：Kalya 原「有旁白有導演的故事書」撞 ASURA「人生之書」→改走連續混音（正合 24737 的預設）；Nym 原「致謝欄排著 Morricone 與 Leone」撞 Kaisaku 影響名單→改曲名；Saafi 原「前奏轉 dub 拍的配方」撞 Somatoast 製作方法→改雙重性；Lord 原「藝名指涉家鄉」撞 Hibernation 名字玩笑→改 Sagan 取樣、藝名降成 g1 一句；Glasper 原葛萊美、Marley 原地方週報年度最佳，與 Entheogenic 榜首三張同屬「成績」→各改續集客座、自家錄音；ATTLAS 原「一支混音走紅」近 Blockhead 幕後轉台前→改廠牌首作。YOUTH 83（一句謎語式簡介）與 Zen Baboon（季節寄語＋自家工作室）內容不同，各留。同廠牌 Ninja Tune 兩張：Blockhead 寫廠名（第二張個人作品），Romare 不寫廠名。
- **24733** hook 四型：懸疑（Akal Dub、YOUTH 83）／斷言（Entheogenic、Glasper、Saafi、Kalya、Gas Lab、pheel.、Lord）／場景（Romare、Arms、Kuba、Dunder、Nym）／人物定調（Blockhead、Mayonnaise、Fieh、ATTLAS、Polyenso、IO、Sweatson、Marley）。開頭前四字全批 36 張互異，對 hooks 目錄全部既有 hook 也不撞。本組無同人跨卡，免「他／她」跨卡配表；性別未載者（Blockhead、Gas Lab、Akal Dub、YOUTH 83、Dj Mayonnaise、Sweatson Klank）note 不用他／她。第二句句型 22 種（並避開 d–e 的「是…的名號／個人名義」「本名…、…出身的」「這是…的第六張」）：取樣嘻哈身分（Blockhead）／本名領句、化名作受詞（Romare）／兩位成員國籍（Entheogenic）／生年與出生地（Glasper）／「在」字介詞（Nym）／二人組成員（Arms）／國籍＋本名、藝名作受詞（Lord）／所在國（YOUTH 83）／城市所有格（Saafi）／名字與城市（Mayonnaise）／首支單曲（Fieh）／「花了兩年」（Kuba）／國別與樂種（Kalya）／混音走紅一事（ATTLAS）／國別與城鎮（Gas Lab）／州名與城市（Polyenso）／州名（Akal Dub）／樂團名（IO，hook 只帶曲名）／城市冠名（Marley）／城市與樂種（Dunder）／成長地（Sweatson）／團體成員身分（pheel.）。開頭兩句交代身分：Fieh（挪威七人編制）、IO（唱過〈Hold Me Now〉）、Sweatson（洛杉磯節拍圈）、Blockhead（Aesop Rock 製作）hook 帶身分，其餘由第二句補國別／城市＋樂種。「日」後一字：a–c 22 張全部只寫到年或月（Dj Mayonnaise 2007 年 7 月、pheel. 2023 年 10 月；Romare「秋天」、Dunder「春天」、YOUTH 83「年初」），不與 d–e 的限／原／開／回相撞。發行句動詞逐張分開：在…出版／秋天發表／由…發行／交…推出／面世／交…發行／年初放上／發行於／月推出／由…出品／經…問世／出版（IO 置後）／錄成／春天發行／月發行。
- **24734** 研究禁區與事實取捨照辦：Apple 試聽 BPM 粗估（研究 a、b 自寫自相關）一律不指派，鼓只寫有文字來源的（Blockhead 鈸聲軍鼓、Saafi 節拍推著走、Polyenso 真人打擊加 programming、Kuba 從 ambient 到 dubby 的輕拍）；Romare／ATTLAS 的舞池疑慮不入 note；pheel. 本名 Phil Gallo（單源）不寫；Dj Mayonnaise 廠牌（Apple ℗ 單源）與 Anticon 關係不寫；Fieh 廠牌與 D'Angelo 比較句不寫，只寫 Elevado 做過 D'Angelo；IO 寫「簡介說幾乎照現場舞台搬上唱片」、不寫成全盤現場錄音，Alannah Currie 不帶；Akal Dub 發行年寫 2014、不寫 2019 與 Apple 6 首；Saafi 寫 2003、廠牌不寫；YOUTH 83 寫 2023 年初；Kalya 本體 15 首、連續混音另計；Arms and Sleepers 曲數不寫（Bandcamp 17／串流 18）；Entheogenic 國別只寫成員出身，不寫團的國別；Glasper 曲數不寫；Marley 的 Pitchfork／AllMusic 不寫，YES! Weekly 寫成「最佳唱片」；Kuba 的封面 Oliver Barnett（與 Hibernation 同人）不帶，免互指。
- **24735** 自查：hook×hook 中文 4-gram 全批 36 張 0；對 hooks 目錄全部既有 hook（10368 筆）只剩專名「阿姆斯特丹」（Romare，對 ts3／sf01，城市名不算）；初稿撞到的「自己掛名」「大半張專」「致謝名單」「直接指向」「簡介只有」「製作混音」「七人樂團」「上合成器」「的西班牙」「十三首小」「只有分秒」「位吉他手」「只剩一台」「九首曲名」「每個曲名」「最長那首」「曲借來的」「名裡藏著」「的廠牌替」「第一張專」「還有一軌」「曲名裡有」「曲名就是」「轉身做起」「全由一人」「曲名收尾」等全改字。hook×自卡 note 5-gram 0、hook×他卡 note 0、hook×d–e note 0；note×note（a–c 內與對 d–e，指派句除外）拆掉「首約分鐘」×13、「年推出這張」×5、「年交推出」×5、「哈製作人」×3、「器樂嘻哈」、「最佳專輯」、「簡介署名」（對 Zen Baboon）、「樂評形容」（對 Charlie North）、「他自己彈吉他」（對 Hibernation）、「母帶交給」（對 Caspro）、「是他親手」（對 DJ Phixion）、「的第二張」（對 Somatoast）、「引述的樂評」後 0。`node qa-batch.mjs hooks add-20261106-ml78` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261106-ml78`（5 組 36 張）✓ 全部通過（hook 加權 13–24.5，note 151–234，一般否定句 0）。輔助腳本：scratchpad `ml78h/ml78h-abc-drafts.py`、`ml78h-abc-check.py`。
