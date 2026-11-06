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

## 研究 b 組
- 24531：b 組 8 張鼓型：慢拖 5（Degiheugi、The New Law、Frenic、Flox、Inspired Flight）、不明 2（A Positive Life、Neutron 9000）、舞池 1（Dan le Sac）。建議汰 1：Dan le Sac《Space Between the Words》（BBC 樂評轉載寫 jump-up 派對電子、house 翻唱、嘉年華彈跳；可逆，若主線認為憂鬱人聲曲佔比夠高可留）。
- 24532：前一輪沿用稿只有 Degiheugi（只補鼓型行）；其餘 7 張在 dropped-research 與研究目錄均找不到，全數新查，來源為 Bandcamp ld+json、MB、Rush Hour、BBC 樂評轉載。
- 24533：Inspired Flight、Flox 僅有標籤與曲目表，無樂評，status 標 thin；Flox 鼓型以後續樂評對 Flox 風格的描述加標籤判讀。Neutron 9000 與 A Positive Life 鼓型無來源，判不出來留給評分。
- 24534：年份：A Positive Life MB 1994、Bandcamp 美版 1995、Rush Hour 稱原作 1993；Flox MB 2009、Bandcamp 頁面 2013；Neutron 9000 重發 2021 含兩首後加混音。卡片照卡單（MB）年份。
- 24535：WebSearch 用 3 次（Flox、Neutron 9000、A Positive Life）；維基 API 被限流，Dan le Sac 條目未取得。

## 研究 c 組
- 24541：c 組 8 張鼓型：無鼓 1（Eguana）、慢拖 6（Kill Emil、Suduaya、Mo Kolours、Jogging House、Globular、Travelling Day 把握低）、不明偏慢拖 1（Saafi Brothers）。攻擊性 0、舞池 0，**建議汰 0**。全部無前一輪沿用稿，全數新查。
- 24542：Bandcamp 對 curl 回 Client Challenge，改用 WebFetch 取頁；速度證據兩種：Globular 有 Ektoplazm 逐曲 BPM（58 到 100）；其餘用 iTunes 30 秒預覽自測（librosa，onset 脈衝與低頻自相關，倍速誤判多，只當佐證寫在 notes／sound，不進 facts）。
- 24543：Suduaya、Saafi Brothers 鼓型把握中低：Discogs 風格含 Progressive Trance、Bandcamp 標 psytrance／psyprogressive，自測落 70 到 103 BPM（非 130 以上舞池速度）故判慢拖／不明偏慢拖；依「判不出來的留」不汰，建議評分層看音訊。Saafi 部分曲目（〈Free Senses〉〈The Witness〉）自測原始值 144 到 161，可能是較快的 trance 拍。
- 24544：Eguana、Travelling Day 無樂評、僅 Bandcamp／MB／Discogs，status thin。Travelling Day 無任何敘述來源，鼓型以 Discogs Trip Hop 與試聽判讀。
- 24545：年份與身分：Suduaya 照 MB 2013（Bandcamp 頁面是 2021 再發版，8 首含 3 首混音：Zero Cult、Green Beats、Cabeiri，不推翻）；Saafi MB 2000-06、Bandcamp 2000-05-15。卡單 label 空白者實為：Kill Emil＝beatquick、Suduaya＝Altar Records、Mo Kolours＝One-Handed Music、Travelling Day＝Avocados Records、Jogging House＝Seil Records、Saafi＝Blue Room Released。
- 24546：moodGuess 存疑（以 y／z 為主）：Kill Emil y 偏貼邊（取樣偏亮，可能判輕）、Mo Kolours y≈0.5（20 首短曲偏輕）、Travelling Day x 2.8 且偏亮、Eguana／Jogging House／Globular z 可能判冷。皆照實寫預估，不汰。WebSearch 用 3 次（Suduaya、Saafi、Globular），僅 Globular 補到 Ektoplazm 線索。

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後汰 3 → 剩 35；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。不補位。判輕、判冷、鼓型不明的照本輪原則一律留給評分。
- Little Dragon《Machine Dreams》：舞池推進：維基寫這張轉向適合現場的 uptempo 舞曲；池中同人兩張評分 x 3.0／3.1（研究 a）
- Abakus《Departure》：舞池推進：樂評點名 progressive house、trance 與 Daft Punk 式歌曲（研究 a）
- Dan le Sac《Space Between the Words》：舞池推進：BBC 樂評寫 jump-up 派對電子、old-school house 翻唱、嘉年華式彈跳（研究 b）
- **Smidley《Smidley》不汰**：研究 a 判「攻擊性」只憑搜尋摘要一句「bombastic、grungy、heavy」，未讀全文；本輪攻擊性要失真牆、嘶吼、音壓貼臉才算，單一摘要不夠，照「判不出來的留」交評分。
- 留下但貼邊交評分層：Shpongle（真人鼓手、明亮）、Blockhead（chase-scene 段）、Degiheugi《Bagatelle》（約 90 BPM boom-bap、偏亮）、Suduaya／Saafi Brothers（psytrance 標籤，自測 70–103 BPM）、GUMI、Smigonaut（自述 downtempo 起點、非音響系統唱片）。

## 鉤子層（d、e；24576–24580）
- **24576** 交件：`desc-tools/batches/hooks/add-20261106-ml76-hooks-d.json`（8）、`-e.json`（6），key 與順序照研究稿。公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin（Tusks、GUMI、Sweeps）上限 170，其餘 230。逐筆預算／hook 加權（原始字元）：AndyFellaz 220／25（25）、Govinda 190／25（29）、Radioactive Sandwich 206／26（26）、Tusks 167／22（22）、Erik Jackson 202／23（23）、Saffron Bloom 221／22（22）、GUMI 160／21（21）、Tek 9 223／25（29）、Sweeps 165／20（20）、Nightflyer 208／26（26）、Dday One 198／22（22）、Shinji 211／26（26）、Tryphème 219／26（26）、Smigonaut 214／23（28）。初稿 14 張 13 張超標（最高 319），整格捨去：AndyFellaz 封面 Gottlieb 照片與 skank 曲、Govinda 三位女聲名字與蛇形振盪器、Radioactive〈Sigogglin〉客座吉他、Tusks 錄音室地名與曲長、Erik 小鎮名、Saffron 曲名與客座、Tek 9 前作盤名與客座名單、Nightflyer 合作曲、Dday 曲目頭尾、Shinji RJD2 比較與〈Menace〉、Tryphème 曲長與前作盤名、Smigonaut 現場鼓手與祖母題獻。壓完回核 hook 依賴：Tusks（德文郡）、Erik（留給聽者想像）、Nightflyer（九〇年代小孩）、Saffron（九首）、Tek 9（jungle 團體）、Radioactive（紐約、第六張）、Tryphème（音樂產業）七處一度踩空，已補回 g1 或第二句指派；其餘依賴皆在 g1／g2。hook 與 note 無逐字重複句。
- **24577** 骨架歸屬（14 張 14 條）：AndyFellaz＝刮碟手＋打擊樂手把嘻哈接上拉丁樂；Govinda＝吉普賽小提琴與揚琴疊上 wobble 低音（傳統樂器接電子）；Radioactive Sandwich＝自寫到自母帶＋Creative Commons 授權放出；Tusks＝城市家中與兩趟德文郡獨居寫作；Erik Jackson＝雨夜在家的主題設定（留白給聽者）；Saffron Bloom＝失戀悲痛各階段寫成全長出道作；GUMI＝海洋體驗化成曲子；Tek 9＝jungle 團體成員換名號做零取樣人聲嘻哈；Sweeps＝盤名的光延伸到曲名（稜鏡、殘像、光暈）；Nightflyer＝九〇年代小孩的八〇年代懷舊；Dday One＝只用黑膠、唱盤、硬體取樣器（盤名拉丁文「親手」）；Shinji＝「不管曲風、不管速度」的取樣自述；Tryphème＝用馬的隱喻寫音樂產業焦慮；Smigonaut＝原定 downtempo、做著做著變寬。避開 a–c 已用：Sweeps 原想走「短曲 beat tape／曲數＋總長」，撞 c Travelling Day「十六首走了一個多鐘頭」與 ml77 Brock Berrigan，改回曲名意象（與 b The New Law「曲名排出牛仔片」同屬曲名族，切面不同：一張是敘事、一張是盤名字義延伸，主線可覆核）；Dday One 原 hook「盤名是拉丁文的…」與 a Smidley「計畫的名字取自…」同形，改以器材限制開頭；Govinda 原 hook「A、B 與 C，全疊在…上」與 ml77 Random Rab 同形，改寫。同廠牌 Cold Busted 兩張分面向：AndyFellaz 只帶「由 Cold Busted 發行」，Shinji 帶「在 Cold Busted 的首張長篇＋7 吋單曲」；Derrick Daisey、Vitamin D 兩張都不指派。Sweeps 池中舊卡（ml68《departure》「自稱 Lo-fi／嘻哈」、ml70《Civilization》「做 boom-bap beat tape、據點洛杉磯」）已避開，本張第二句不帶洛杉磯與自稱。
- **24578** 第二句句型配表：AndyFellaz「X 這個雙人計畫，一邊是…一邊是…」；Govinda「X 是…的名號」；Radioactive「日期，X 聯手 Omnitropic」；Tusks「X 就是…」；Erik「花一年多做出它的 X，住在佛羅里達」；Saffron「X 背後是…」；GUMI「特拉維夫的 Maor Hasbani 用 GUMI 這個名字」；Tek 9「X 由…掛名」；Sweeps「X 的這卷 beat tape 發行於 2023 年」；Nightflyer「X 活動在 synthwave 圈」；Dday「在洛杉磯身兼…的 X」；Shinji「在 Cold Busted 交出首張長篇的 X，是…」；Tryphème「法國音樂人 Tiphaine Belin 以 X 為名」；Smigonaut「從作曲一路做到母帶的 X（本名）」。避開 a Blockhead、c Mo Kolours 的「本名」領句、b Degiheugi 的「X 在…」、c Kill Emil 的「來自」、c Saafi 的「某地的 A 與 B」。「他／她」引入：Saffron、GUMI、Dday One 的 hook 只用「他」、Tryphème 只用「她」→第二句具名＋身分；其餘 hook 帶地點或樂種、第二句名字領句。
- **24579** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Govinda 日掛、Radioactive 日，、Tusks 日落、Erik 日開、Saffron 日從、GUMI 日公、Nightflyer 日同、Shinji 日亮、Tryphème 日打、Smigonaut 日釋；AndyFellaz、Tek 9、Sweeps、Dday One 只寫年（日期多說或來源僅為重發頁）。初配的首／透／登／經／問／上／面撞 a–c，已逐一換掉；全批 35 張「日」後一字互異。開頭前四字與 a–c、ml77 互異。
- **24580** n-gram 自查：ml76 全批＋ml77 已交 hook 間中文 4-gram 0（初稿「成了九首」Saffron×GUMI、「琴全疊在」Govinda×ml77 Random Rab，已改）。媒體名與榜名不進 hook／note（Kaltblut、Sputnik、Rust、Qobuz 一律寫「樂評」「藝人簡介」「他說」）；無分數、無「據說／據傳」。腳本：`node qa-batch.mjs hooks add-20261106-ml76` 全部通過；`node chk-hook-crossgroup.mjs add-20261106-ml76` 5 組 35 張全部通過。

## 鉤子層（a–c）（24571–24575）
- **24571** 交件：`desc-tools/batches/hooks/add-20261106-ml76-hooks-{a,b,c}.json`（6／7／8＝21），key 逐字照主線汰換後研究稿、順序不變、欄位只有 key／hook／note。公式照派工寫死版：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；thin 4 張（Inspired Flight、Flox、Eguana、Travelling Day）上限 170，其餘 230。逐筆（hook 原始／加權／預算）：a：Shpongle 24／21／227；Long Arm 18／18／219；Wax Tailor 23／23／204；Moonchild 18／18／219；Smidley 22／22／226；Blockhead 29／24.5／208。b：Degiheugi 24／24／229；The New Law 21／21／229；Inspired Flight 28／21／170；A Positive Life 20／20／218；Neutron 9000 20／20／215；Frenic 25／23／222；Flox 28／22.5／155。c：Eguana 23／23／163；Kill Emil 24／24／221；Suduaya 28／23.5／208；Mo Kolours 29／24／219；Travelling Day 21／19／170；Jogging House 21／21／226；Saafi Brothers 20／20／226；Globular 28／24／215。初稿 17 張超標（最高 Smidley 327），整格捨去：Shpongle 的成軍年、psybient 開創者、樂手逐一分工；Wax Tailor 的 Victoires 入圍、Rébecca Dautremer 封面；Moonchild 的〈Come Over〉輪流獨奏、2011 組團；Smidley 的 Triple Crown、鼓手 Eric Slick、薩克斯風；Blockhead 的 Baby Dayliner 混音；Degiheugi 的曲長分佈；New Law 的〈Barrels of Bourbon〉、扭曲合成器、Ninja Tune 對照、「偏管絃」；Inspired Flight 的 Scarub／Rugged Monk；A Positive Life 的白房間重述、2021 重發與〈Aquasonic〉；Neutron 9000 的 Orinoco Studios、柏林相識、「少見沒被復興」；Eguana 的曲名；Kill Emil 的曲目；Suduaya 的 500 張（hook 已帶）、Amin Varkonyi、Discogs 註記；Mo Kolours 的 Isley Brothers 翻唱、混種樂風、8 秒插曲；Travelling Day 的總長、digipak、曲目；Saafi 的混音起家、兩段〈The Deep〉；Globular 的 Patreon／Kickstarter、dubby drippy trippy。壓完回核：21 張 hook 依賴的事實都在 hook 本身或 g1／g2（Shpongle 的曲名與 Delago 在 g2；Long Arm 的情緒×自然世界觀由 g3 前移到 g2；Kill Emil 補「主題設在一位尋常人物的人生高低」進 g2；Neutron 的 Tiga、Saafi 的兩大音樂節名、Globular 的逐曲速度、Inspired Flight 的 Inspectah Deck 都在 g1／g2）。研究稿 notes 的「鼓型：…；預估…」0 進 note。
- **24572** 骨架歸屬（21 張 21 條，只在擁有者 note 寫歸屬句）：Shpongle＝取樣轉向真人演奏＋新奇樂器撐一曲；Long Arm＝異國製作人在柏林廠牌的首張；Wax Tailor＝旁白串起的有聲故事概念盤；Moonchild＝同窗三人度假小屋自錄；Smidley＝樂團主唱的個人計畫（以兒時寵物命名）；Blockhead＝換工具改寫曲式；Degiheugi＝整張寫給戀愛關係；The New Law＝曲名走西部片意象；Inspired Flight＝名饒舌團成員客座標題曲；A Positive Life＝特殊錄音空間（全白房間投影）＋被大牌取樣；Neutron 9000＝廠牌老闆把失落舊作重發；Frenic＝巡演沿途蒐集唱片當取樣＋神話藍本；Flox＝混血背景與 nu reggae；Eguana＝靈魂出竅的微觀宇宙；Kill Emil＝普通人起伏的節拍敘事；Suduaya＝限量首版＋各地寫成；Mo Kolours＝父親傳下的傳統音樂；Travelling Day＝附贈曲收尾的長篇 beat 專輯；Jogging House＝單次演奏直錄磁帶；Saafi Brothers＝題獻給一位小說家；Globular＝粉絲出資＋逐曲標速度。對 d–e 14 張已交件的歸屬與 hook 逐張比過，不重。**同藝人跨批分軸（給 ml77 鉤子層）**：The New Law《High Noon》帶西部片曲名＋「泥／空間」介紹＋Portishead 對照，《The Fifty Year Storm》請帶出海續章、Straney 製作分工、Morricone 對照，避開「西部片」「牛仔」「鬼鎮」；Long Arm《The Branches》帶聖彼得堡出身＋Mooncircle 首張＋情緒×自然世界觀，《Silent Opera》請帶靈魂狀態清單與 William Barras 封面，引入法避開「名字直接領句＋聖彼得堡」；Degiheugi《Bagatelle》帶法屬玻里尼西亞所在地＋戀愛主題＋第七張＋客座，《Endless Smile 2》請帶 De La Soul／聖馬洛生平與樂手名單，Mr Gib／Dulk／Kasablanka 本張 note 0 用，留給那邊。
- **24573** hook 四型：場景（Shpongle、Wax Tailor、A Positive Life、Frenic、Jogging House、The New Law）／斷言（Degiheugi、Kill Emil、Suduaya、Travelling Day、Globular、Moonchild）／懸疑（Eguana、Neutron 9000——收在 g2 的 Tiga；Saafi——收在 g2 的音樂節名；Inspired Flight——收在 g1 的 Inspectah Deck；Blockhead——收在情緒三段）／人物定調（Long Arm、Smidley、Flox、Mo Kolours）。第二句句型（21 種）：英國迷幻電子組合／名字直接領句＋聖彼得堡／法國嘻哈製作人／洛杉磯的 neo-soul 三人團／聖路易樂團 Foxing 的主唱／本名（Blockhead）／Degiheugi 在法屬玻里尼西亞／西雅圖的 trip-hop 二人組／聖地牙哥的 downtempo 團體／本人是英國的 Stef Pierlejewski／倫敦的兩人組／英國 Bristol 的器樂嘻哈製作人／法英混血／俄羅斯的 Sergey Severin／Kill Emil 來自希臘雅典／法國的 downtempo 製作人／本名 Joseph Deenmamode／法國巴黎的 trip hop beatmaker／德國法蘭克福的電子音樂人／法蘭克福的雙人組／英國迷幻 dub 製作人——兩張「本名」領句分屬 Blockhead 與 Mo Kolours，寫作層請一張用「本名是」、一張用「原名」；兩張法蘭克福（Jogging House 單人、Saafi 雙人）一張「來自」、一張「出身」。「他／她」引入法：Long Arm、Degiheugi、Blockhead、A Positive Life、Frenic、Flox、Mo Kolours、Suduaya 的 hook 以「他」起頭，第二句一律具名；Saafi 以「他們」起頭。
- **24574** 「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：Shpongle 日由、Long Arm 日在、Wax Tailor 日先、Moonchild 日推、Smidley 日面、Blockhead 日發、Degiheugi 日自、New Law 日問、Inspired Flight 日上、Neutron 日交、Frenic 日放、Flox 日於、Eguana 日經、Suduaya 日首、Mo Kolours 日出、Travelling Day 日透、Jogging House 日登、Saafi 日正、Globular 日獨／日網；A Positive Life 只寫 1994 年、Kill Emil 只寫到 2014 年 6 月。與 d–e 已交 14 張（掛／落／開／從／公／同／亮／打／釋）0 撞。媒體名 0 進 hook／note（樂評一律「樂評說／樂評聽到／評論認為」；Heatseekers 寫「美國新人專輯榜」；Sputnik 分數、HHV、DJ Booth、The Stranger、KEXP、DJ Magazine、Epitonic 皆未進）；分數 0、「據說／據傳」0。
- **24575** 自查：hook 開頭前四字 21 張互異，對全 hooks 目錄亦互異（原稿「三個人都」「巴黎的 F」「同名曲的」撞他批，已改）；本批 35 張 hook 之間中文 4-gram 0；hook 對 d–e note 只剩樂種詞「迷幻電子」；hook 對自己 note 逐字 6 字以上 0（Suduaya「500 張」已從 note 拿掉）。對他批 hook 殘片已改字：「其中一首」×25、「從頭到尾」×24、「一個人的」×20、「六首曲子」×19、「曲名一路」×5、「廠牌老闆」×6、「請來一位」×4、「接上電子」×3、「年後重發」×3；剩「打擊樂器」（樂器名）與「四分之一」（尺寸）。note 間 3 張以上 4-gram 只剩指派句與樂種詞「器樂嘻哈」。腳本：`node qa-batch.mjs hooks add-20261106-ml76` 全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261106-ml76` 全部通過 ✓（5 組 35 張，hook 加權 18–26，note 153–236）。輔助腳本：scratchpad `hook-ml76-ac/ml76ac-measure.mjs`。

## 寫作層（writer-2）（24586–24590）
- **24586** 交件：`desc-tools/batches/output/add-20261106-ml76-out-2.json` 17 張，key 逐字同序。full 14 張 181–240（Jogging House 213、Saafi 240、Globular 236、AndyFellaz 238、Govinda 204、Radioactive 210、Erik 204、Saffron 214、Tek 9 218、Nightflyer 194、Dday One 181、Shinji 199、Tryphème 199、Smigonaut 217）；thin 3 張 150–180（Tusks 168、GUMI 150、Sweeps 180）。初稿超標 3（Saafi 254、Globular 246、Sweeps thin 183）、掉下限 1（Dday One 179），整格捨去／補一個子句處理：Saafi 拿掉「之後完成的」「唱片上」、Globular 拿掉「回顧創作過程」、Sweeps 拿掉「取名」並縮短曲長句、Dday One 發行句改寫補足。
- **24587** 第二句領句全照鉤子層 note 指派；「日」後一字照 24574／24579（日登、日正、日獨＋日網、日掛、日，、日落、日開、日從、日公、日同、日亮、日打、日釋；AndyFellaz、Tek 9、Sweeps、Dday One 只寫年）。日期前一字逐張不同；Saffron 原作「作年月日」「片年月日」先後撞 writer-1／ml77，改成「題年月日」；Smigonaut 改成「的 Smigonaut（本名）把《Epitome》放在…」避開「的年月日」；Tusks 改成「交給 One Little Independent，…日落地推出」避開「專輯年月日」×3；Erik、GUMI 拿掉「在」避開「在年月日」。
- **24588** 來源轉述詞不進正文：note 的「文案說／說明稱／官方說／藝人簡介說」一律改直述（AndyFellaz「兩人的養分來自…」、Saafi「…在裡頭交織」、Tek 9「比起早期 EP，這張走得溫和」）；note 的評語改被動（AndyFellaz〈Madrugada〉「被形容為」、Saffron「被歸為 illbient」「被看作一場憂傷卻細緻的告別」）。媒體名 0、榜單名次 0、據說／據傳 0；研究稿鼓型與預估座標 0 進正文。引語轉間接：Jogging House 扉頁英文句寫成「大意是找回自以為已經失去的東西」，Nightflyer「欣喜的懷舊感」去引號。
- **24589** 不複述 hook：Radioactive 第二句改帶 Creative Commons 授權，母帶一條龍只留一句清單；Govinda 把揚琴／吉普賽小提琴從正文聲音句拿掉、改帶音樂盒；Nightflyer 拿掉「人在多倫多」（hook 已帶）。小改動：Saffron 指派領句「伊朗裔美國製作人」改「伊朗裔美籍製作人」（「國製作人」跨 writer-1／ml77 共 4 張）；Globular 改「化名 Globular」避開與 Tryphème 指派句「以 X 為名」同形。可逆。
- **24590** 自掃（han() 中文 4-gram，本檔＋ml76 out-1（18 張）＋ml77 out-1／out-2）：3 張以上只剩地名「法蘭克福」（Jogging House、Saafi 兩張皆為指派領句＋ml77 Blackfish）。途中拆掉「首約分鐘」×4、「分鐘左右」×4、「分鐘上下」×4、「合計約分」、「年由發行」、「寫作製作」、「作曲製作」、「被形容為一」、「發行於年」、「的製作人」、「國製作人」、「人年月日」、「名年月日」等。腳本：`qa-batch out add-20261106-ml76` 35 張、thin 全部 ≤180、無標記；`qa-check-research`（writer-2 對 out-2）標記 0；`fix-spacing` 待補 0（未加 --write）。輔助腳本：scratchpad `wr-ml76-2/ml76-2-measure.mjs`。

## 寫作層（writer-1）（24581–24585）
- **24581** 交件：`desc-tools/batches/output/add-20261106-ml76-out-1.json` 18 張，key 逐字同序。full 14：188–235（Kill Emil 188 最低、Shpongle 235 最高）；thin 4：Flox 165、Travelling Day 168、Eguana 172、Inspired Flight 179。初稿 0 張出界，未做整格捨去。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（待補 0）皆通過；轉述引導詞、禁語、來源平台名 grep 0（Eguana 的「沒有」在 hook 原文）。
- **24582** 第二句領句照鉤子層 note；「日」後一字全照 24574（由／在／先／推／面／發／自／問／上／交／放／於／經／首／出／透），A Positive Life 只寫年、Kill Emil 只寫到月。偏離兩處：Mo Kolours 依 24573 改用「原名」（Blockhead 用「本名是」）；Suduaya 領句寫成「法國這位 downtempo 製作人」，原指派「法國的⋯製作人」與 ml77、out-2 撞「的製作人」「國製作人」。
- **24583** 不複述 hook：Blockhead 的「受訪時說改用 Ableton…」、Kill Emil 的「主題設在尋常人物的人生高低」兩格與 hook 同義，正文只交代「這個念頭他在一次訪談裡提過」／略去，改把 hook 代稱具名。Neutron 9000 第三句具名 Tiga 收 hook 懸念；Inspired Flight、A Positive Life、Smidley 第二句具名 hook 的「一位成員／他」。
- **24584** 媒體名與榜：note 無媒體名進正文（樂評一律「樂評／評論／有樂評」）；Wax Tailor「法國專輯榜第 8 名」、Moonchild「美國新人專輯榜第 6 名」屬官方銷售榜，照 note 寫。「介紹寫／官方稱／作品說明」一律改成直述（Degiheugi、The New Law、Eguana、Long Arm）；A Positive Life 保留「唱片公司形容」（note 指派、屬廠牌自述）。Frenic「放上 Bandcamp」是發行管道、照 note 寫，ml70／72 有先例。
- **24585** 跨批 4-gram 自掃（out-1＋out-2＋ml77 out-1／out-2，han() 剝英數標點）：3 張以上只剩樂種詞「器樂嘻哈」×4（Long Arm、Blockhead、Degiheugi、Frenic 的 note 皆指派此詞）。途中拆掉：由與組成、的製作人、的第四張、專輯年月／輯年月日、首加起來／加起來約、製作人在、的第一張、這個名字、分鐘上下、分鐘左右、首約分鐘、長約分鐘、張錄音室／錄音室專、作年月日、的年月日、自行發行、合計約分、張專輯年、唱片年月。out-2 交件後若再改，請主線收件時再合掃一次。輔助腳本：scratchpad `wr-ml76-1/ml76w1-measure.py`。

## 主線審稿（24591；2026-11-06）
- **24591** 逐張審 35 張（全文印出，逐句對研究稿 a–e；抽核 Wax Tailor 法國專輯榜第 8 名（維基，官方銷售榜照留）、Moonchild Heatseekers 第 6 名（維基，同）、A Positive Life 全白房間錄音與本名（Waveform Bandcamp 文案）、Jogging House 限量 5 張黑膠（Discogs release 31734974）、Saafi Brothers 成員（官網＋Discogs））。改 2 張（`desc-override.json`），研究稿同步標註：
  - `Smidley|Smidley`：整段重寫。原 hook「計畫的名字，取自他兒時養的一隻黑色拉不拉多」出自研究稿引 Stereogum，主線重抓該頁全文查無 dog／labrador／named after，藝人介紹補洞層（ar-d-809 g1）也回報出處頁沒有這句——**單源且無法覆核，整句刪**；改以演奏名單（Bandcamp credits）開頭：「主唱的個人計畫，連薩克斯風都找齊了一支樂隊。」其餘句照研究稿（235 字）。
  - `Flox|The Words`：「被視為 nu reggae 的代表」→「做的是 nu reggae」（單篇樂評、且評的是後來的《Square》，評價句刪、留樂種）。
- 媒體名、媒體年終榜、「據說／據傳」全批 0。

## 主線試聽／封面／三軸（不佔條號；2026-11-06）
- 試聽：自動配對＋override 2（Smigonaut §1 人工身分取 Apple us 1832081042；Govinda Apple 查無 → unavailable）→ ready 34／unavailable 1；`popular-preview manifest` 換成最紅那首 31 張。
- 封面：CAA release-group front 31；Frenic、Sweeps（CAA 404）與 Smigonaut（§1）用 Bandcamp og:image，Dday One（CAA 404）用 Apple 1609539039 官方封面（apple-verified-collection）。全批 HTTP 200，主線縮圖表目視與盤名相符。
- 三軸：機器基線（worker /album-rating，Last.fm listeners）；頂點 0（無殿堂共識、listeners 皆 ≥810 非遺珠、無異端證據）。

## 上線（2026-11-06，主線）（條號 24592）
- **24592**：上線 35 張：card_catalog 35／35、KV 35 鍵回讀逐字一致（stamp 20261106ml76）、seed +35、prepare／published gate 0 error（warning 皆 UPC 盡力而為與 Smigonaut 人工身分）。寫入前對 origin 近 25 個分支的 seed 去重 0。藝人介紹 ar-d-809（寫 28、不寫 Travelling Day、Erik Jackson）同 PR 上線（`batch-progress/artist-intro/ar-d-rulings-ml76.md`）。

## 評分與落格（2026-11-06，主線）（條號 24593）
- **24593**：Opus 1 支照 `score500/BRIEF.md`（10-23 體感標準＋「有鼓不等於躁」）打 35 張（`batch-progress/mood-axes/score-ml76/`），主線看過未改值。`build-priors` → `build-scale v0`（錨點 104/104）→ `build-card-moods`；`warm-batch` 33/35 有標籤，`build-genre-tree --pull --write`、`build-draw-covers --pull --write` 重建。
- **落恍惚 27/35（77%）**；其他格 8：沸騰 2（Smidley 失真吉他 x 3.5、Shinji 放克 break x 3.0）、頹靡 3（The New Law、Neutron 9000、Saffron Bloom 判冷）、放鬆 3（Travelling Day、AndyFellaz、Tek 9 判輕）。**有鼓名單的慢拖鼓確實多留在靜**：35 張只有 2 張判躁。
