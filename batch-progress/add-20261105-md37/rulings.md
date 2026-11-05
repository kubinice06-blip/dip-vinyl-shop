# add-20261105-md37 裁定（情緒薄格策展線・頹靡 Bandcamp 線 A：Bandcamp Daily Best Ambient／Best Experimental 的冷暗重那半）

> 店主 2026-11-05：雀躍／放鬆剛移出 1,042 張（PR #390），頹靡多數場景見底；「恍惚跟頹靡可以去 Bandcamp 爬梳」。本工作階段負責 md37、md38（並行：ml66／ml67 恍惚）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（md37 列）；來源規則 `CUR-BANDCAMP-md37.md`。評分照 10-23 店主「體感標準」。目標格：**頹靡＝靜（x<3.0）＋重（y≥0.5）＋冷（z<0）**；策展邊距 x≤2.7、y≥0.8、z≤−0.3。**要有故事才收**：每張至少一篇 Bandcamp Daily 專文／月度或年度榜。
> 策展：`curation-md37a.json`（20，Best Ambient 99 期＋2017–2025 年度榜）＋`curation-md37b.json`（27，Best Experimental 約 100 期＋Best Electronic 約 97 期）→ `master-md37amd37b.json`（47；MB 23、§1 人工 24）→ 主線汰 24 → `pick.json`（23）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261105-md37-cards.json`（23 張；研究 a–d 各 5、e 3）。身分：MB 釘住 12、§1 人工 11。
> **預留：研究 a 23161–23170、b 23171–23180、c 23181–23190、d 23191–23200、e 23201–23210、鉤子 23211–23220、寫作 23221–23230、主線 23231–23240。**
---

## 主線策展（不佔條號）
- 兩組合計 47 張，去重（seed、所有 manifest、`data/pool-removed.json`、所有卡單含 ml66／ml67、所有 curation）0 撞；moodGuess 全在邊距內（x 1.0–2.5、y 0.9–1.7、z −1.6～−0.4）。
- **來源產量**：Best Ambient 專欄約 1,400 張提及，絕大多數暖、明亮、有旋律（落恍惚／平靜）；Best Electronic 幾乎全是有拍舞曲，0 張；Best Experimental 多小廠卡帶，故事只靠 Daily 評介。
- **主線汰 24**（店主剛以「不夠有名、沒有故事性」移出 1,042 張，本批從嚴）：
  - 自我同名卡（ALBUM_ONBOARDING 去重第四道）：Hiemal《Hiemal》、Serrater《Serrater》。
  - y 或 z 貼邊（策展自標 0.9／−0.4～−0.6、判輕或判暖風險）：Gray Acres、andarctica、purity olympics、Li Yilei、Dronestore Cowboys、Louise Bock、Matt Christensen、Leslee Smucker、Stuart Chalmers（swarmandal 東方色彩）、Jane Deasy（聖樂感）、Bridget Hayden（人聲溫度）、Chantal Michelle（亮層）。
  - x 風險（脈衝、節奏、突發聲響、dub techno tag）：Civilistjävel!《Brödföda》、Domenica Diavoleria、Ipek Gorgun、Vanessa Rossetto《You & I Are Earth》。
  - 正規專輯資格或身分不穩：Aidan Baker & Ekin Fil《The Dark Well》（約 28 分鐘）、Fossil Aerosol Mining Project《Rusted Articles…(2020 Reconfiguration)》（重新編排版，原盤年份不明）、Amy Cutler《Sister Time》（24 軌拼貼，曲間差異大）。
  - 故事／聲音來源不足：Jim Haynes《Throttle and Calibration》（評介只寫創作背景）、Kiera Mulhern《De ossibus 20》（引文未核、y 1.0）、Andrew Anderson《Thresholds》（藝人國別不明，查無第二來源）。
- **留給研究層確認**：Basinski《The Clocktower at the Beach (1979)》（池中同人一張判暖落恍惚，色溫）、KMRU《Natur》（y 邊緣）、Phauss《Audiodrome》（80 年代作品 2022 首發？年份以原盤首發為準）、Thaniel Ion Lee《Five Ghosts》（Bandcamp 2018、MB 2021，取 2018）、Kristen Pilon & Demdike Stare《To Cut & Shoot》（配樂、歌劇人聲張力）、Marc Kate《Deface》（取材 NSBM 素材而反轉；題材無禁區，照收）、Alex Zhang Hungtai《Dras》（無調張力）、Amulets、Sally Decker（x 2.2）、Jake Muir《Pareidolia》（失真密度）。

## 研究 e 組
- **23201**（Amby Downs《Ngunmal》）：人工身分核對 Bandcamp 專輯頁與 Room40 官網相符；兩首主曲約 50 分鐘（含節錄版約 63 分鐘），正規專輯。Room40 官網日期 2023-11-10、Bandcamp 11-11，取 2023。Daily 引文逐句核對屬實。moodGuess 輕微存疑（首曲重複喀喀聲，Daily 說包覆在 drone 裡，非鼓拍），不汰。
- **23202**（Lori Goldston《Open Space》）：pinned，Bandcamp 十軌約 74 分半，Daily 引文屬實。moodGuess 輕微存疑：Bandcamp CD 介紹稱可「roar at full volume」也有失重寧靜段，x 2.1 恐偏低、可能貼 2.5–2.8；大提琴木質共鳴 z 可能略偏暖，評分時留意。
- **23203**（Roland Kayn《Matego I-II》）：推翻策展層：curatorWhy 的「contemplative and chilling」是 Daily 講 Electronic Symphony I-III，不是 Matego；Matego 原句為 relies on distance and near-silence。curatorRisk 的「Electric Symphony」為筆誤。**moodGuess 明顯存疑**：近乎寂靜、短爆發，y 1.2 恐偏高，可能靜輕冷；建議評分後若 y 不足 0.5 就汰換。兩軌約 52 分半，正規專輯。

## 研究 c 組
- 23181：KMRU《Natur》廠牌實為 Touch（TONE85），非卡單的「KMRU」，建議改 label；Bandcamp 數位版附 8:33 節錄，Touch CD 為單曲 52:38；moodGuess 存疑（harsh noise 厚牆，可能偏躁）。
- 23182：jason calhoun《small circle》身分核對無誤（2023-09-29、六首 53:40、Dear Life Records 取自 Daily 與藝人說明），無推翻。
- 23183：Thaniel Ion Lee《Five Ghosts》年份取 Bandcamp 原發 2018-04-07（MB 2021 為再登）；單一來源（Daily），status thin。
- 23184：Amulets《Not Around But Through》moodGuess 存疑：官方說明含 post-hardcore／emo／metal、「explosive and cathartic」，x 恐超出邊距，建議汰換。
- 23185：Sara Zalek & Norman W. Long《Steelworkers' Drone》身分核對無誤（2020-02-11、RM032、四軌 57:35）；內容為聲音漫步與現場即興，Daily 稱「excitement and calm」，moodGuess 存疑（z 與 y），建議汰換。

## 研究 d 組
- 23191　Alma Laprida《Pitch Dark and Trembling》：Bandcamp 頁面發行者欄為 Alma Laprida，但說明末寫「Released by Outside Time, Washington, DC」；實際廠牌應為 Outside Time，建議上架 label 改。全長 30:38，貼 30 分鐘門檻，仍屬正規專輯（現場錄音）。
- 23192　Selvedge《BLOOM IN RUST》：發行日 2020-10-26（Rusted Tone 與藝人 Bandcamp 皆同）；SoundCloud 2022-09-30 為上傳日，年份取 2020。moodGuess 存疑（Daily「brighter through repetition／let light in」、摩斯式節奏、沙沙打擊），本組最貼邊。
- 23193　Susan Geaney《Tape Melt》：單曲一軌 35:05，Bandcamp 發行 2022-07-15，早於 2022-07-29 首演；取 7 月 15 日。後段密度上升、結尾高音，moodGuess 輕度存疑。
- 23194　Jacob Kirkegaard《Snowblind》：11 軌 36:23；Andrée 事實取 Wikipedia；MB 重查時伺服器忙碌，盤名年份以 Bandcamp＋Wikipedia 交叉。
- 23195　seah：無推翻；5 軌 48:36，MB 與 Bandcamp 同日 2022-05-15。

## 研究 a 組
- 23161　Marc Kate《Deface》：MB 與 Bandcamp 一致（Failing Forms FF05、2017-09-20、七軌 77:49）；卡單 label 欄寫藝人名，實際廠牌 Failing Forms。題材取 NSBM 素材但立場為哀悼與反制，facts 照來源寫；無鼓 drone，moodGuess 不存疑（z 可能略暖，專輯頁稱近新世紀音樂）。
- 23162　Rafael Anton Irisarri《Sirimiri》：Bandcamp 專輯頁 2018-05-08，Umor Rex 實體首發 2018-03-16（MB），年份取 2018；卡單 label 欄為 Bandcamp 發布者，實際廠牌 Umor Rex，建議改。四軌 37:15，達標。moodGuess 存疑（z）：樂評稱冷冽夜行但收尾藏暖意，z −0.6 勿再加深。
- 23163　Jordan Reyes《Everything Is Always》：人工身分核對無誤（2022-10-28、American Dreams、六軌 33:38，原創專輯）。moodGuess 明顯存疑（x、z）：實為 drone 加歌曲，有人聲吟唱、口語旁白、plodding 貝斯 riff、crashing 貝斯吉他，Daily 與 The Organ 都寫平靜甚至昂揚的一面，建議主線汰換或降信心。
- 23164　Kevin Richard Martin《Blue Loops》：MB 與 Bandcamp 一致（2026-05-01、十四軌 52:20）。moodGuess 存疑（z）：專輯頁行銷文字說核心有 radiant warmth、捨棄陰鬱，與 Daily 的 bottomless dirges 方向相反，z 可能落 −0.8 左右；維基未載本盤。
- 23165　Alex Zhang Hungtai《Dras》：人工身分核對無誤（2026-04-10、Shelter Press、九軌 35:23，原創專輯；錄音 2019、首發 2026）。moodGuess 輕度存疑（x）：無調金屬光澤與電流感，但節奏幾乎聽不見；卡單 country ca，Bandcamp 地點標紐約，主線定。

## 研究 b 組
- 23171　Phauss《Audiodrome》：推翻策展層年份與廠牌。原盤為 1987 年瑞典 Radium 226.05（RA 029）黑膠 LP（Discogs master 1987），Room40 2022-12-16 的數位與 CD 為 Reissue；建議 year 取 1987（原盤首發為準）。兩軌 58 分鐘，正規專輯。moodGuess 存疑（x、y）：主體是田野錄音剪貼，含收音機爆音、街頭樂手、飛機工業噪音，非持續低頻 drone。
- 23172　William Basinski《The Clocktower at the Beach (1979)》：manualEvidenceUrls 的 …-beach-1 回 404，正確網址 …-beach-1979。LINE 稱 previously unreleased，Daily 稱 reissue，以官方為準，首發 2023-03-03；3 軌約 53.5 分鐘，正規專輯。moodGuess 大致吻合，z 邊緣、無直接色溫來源。
- 23173　Jake Muir《Pareidolia》：MB 與 Bandcamp 一致（2026-06-05、enmossed、8 軌 41:42）。moodGuess 大致吻合；〈Oblivion〉有慢速儀式重拍、〈Each Uisge〉略亮，x、z 略樂觀，未見推翻證據，不汰。
- 23174　Kristen Pilon & Demdike Stare《To Cut & Shoot》：身分無誤（DDS086，黑膠 2025-02、Bandcamp 2025-09-04，13 軌約 49 分鐘）。Daily 誤拼 Kriston；電影名 Discogs 與 Boomkat 說法不一，簡介避談。moodGuess 存疑（x）：Boomkat 明寫〈Belly Up〉夜店亂流、〈Twist〉bruk 節奏，Bandcamp 標籤含 techno，高風險。
- 23175　Sally Decker《In the Tender Dream》：MB 與 Bandcamp 一致（2021-08-13、10 軌 42:56）。實體版為 NNA Tapes NNA137 卡帶，卡單 label 寫藝人名。moodGuess 存疑（x、z）：Bandcamp 與 Daily 同時寫有平靜、restful、念白與標題曲回授節奏，暖冷無直述，建議視為汰換候選。

## 主線研究後汰換（不佔條號；2026-11-05）
- 照 md35 先例：研究稿寫出**歌曲／人聲／節奏推進**、**明亮、平靜、近乎寂靜**、**聲音或故事只有單一來源**的汰；只是邊距薄的留給評分驗收。
- **汰 9 張**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 能量：Jordan Reyes《Everything Is Always》（研究 a：drone＋歌曲，吟唱、口白、貝斯 riff，評介寫昂揚）、Kristen Pilon & Demdike Stare《To Cut & Shoot》（研究 b：Boomkat 寫〈Belly Up〉夜店亂流、〈Twist〉bruk 節奏）、Amulets《Not Around But Through》（研究 c：官方說明 post-hardcore／emo／metal、「explosive and cathartic」）。
  - 判輕／判暖：Sally Decker《In the Tender Dream》（研究 b：restful、念白、回授節奏）、Sara Zalek & Norman W. Long《Steelworkers' Drone》（研究 c：戶外自然聲景、「excitement and calm」）、Selvedge《Bloom in Rust》（研究 d：Daily「clearer and brighter」「let light in」、摩斯式節奏）、Roland Kayn《Matego I-II》（研究 e：Daily「distance and near-silence」，策展引的「chilling」其實寫的是 Electronic Symphony）、Phauss《Audiodrome》（研究 b：田野錄音剪貼、收音機爆音與街頭樂手，不是持續低頻；原盤 1987 Radium 226.05）。
  - 故事不足：Thaniel Ion Lee《Five Ghosts》（研究 c：Daily 以外查無任何樂評、訪談、廠牌說明，status thin）。
- **研究層更正已改進卡單**：廠牌 Irisarri → Umor Rex、Marc Kate → Failing Forms、KMRU → Touch（TONE85）、Laprida → Outside Time；Basinski 證據網址 `…-beach-1` → `…-beach-1979`（LINE 官方寫 previously unreleased，首發 2023-03-03，簡介不寫重發）。Alex Zhang Hungtai 國別維持 ca（加拿大公民、成長於多倫多）。
- 不補位：候補未經研究，照「挖不到就照實上架」不湊數。定案 **14 張**。留給評分驗收的邊距風險：KMRU《Natur》（Touch 說明提到 harsh noise 厚牆）、KRM《Blue Loops》（專輯頁寫 radiant warmth）、Basinski（色溫無直述）、Laprida（金屬震顫節奏）、Goldston（可 roar at full volume）、Geaney（後段 busy chorus）。

## 鉤子層（a、b、c）（23211–23215）
- **23211** 交件：`desc-tools/batches/hooks/add-20261105-md37-hooks-a.json`（4）、`-b.json`（2）、`-c.json`（2），共 8 張，張數以研究稿為準（研究後汰換已同步刪）。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`，上限 230（8 張皆 full）。逐筆（預算／hook 原始字元／加權）：Marc Kate 221／22／22；Irisarri 207／21／19；KRM 206／22／22；Alex Zhang Hungtai 226／21／21；Basinski 224／24／21；Jake Muir 229／20／20；KMRU 213／18／18；jason calhoun 224／25／21。初稿 6 張超標，整格捨去：Irisarri 的 The Sight Below、KRM 的 Techno Animal／King Midas Sound、AZH 的九首 35 分鐘與「用本名」、Basinski 的古典訓練與 1950 年代、Muir 的 Loop／Main 與曲數、calhoun 的 2010 年起與曲數。壓完回核：hook 依賴格全在 g1／g2（AZH 把「處理成無調 drone」前移到 g2；Muir 原稿 note 漏了標題語義那格，補進 g2）。
- **23212** 骨架歸屬（本組 8 條，各張只寫自己的歸屬句）：Deface＝取材敵對素材而翻轉立場（哀悼、反制）；Sirimiri＝載體設計（卡帶兩面同四首）；Blue Loops＝巡演旅館房間攢出的素材庫；Dras＝特殊錄音地點（深夜聖堂）；Clocktower＝塵封檔案作品首度發行（撿來的電視機當聲源）；Pareidolia＝標題概念（空想性錯視）＋回頭整理與金屬的關係；Natur＝移居後的聽覺落差（奈洛比→柏林）；small circle＝風格反轉（溫柔 ambient 失去調性）。Deface 與 Pareidolia 同為金屬素材：Deface 帶政治與哀悼、Pareidolia 只帶取段與放慢的手法和個人史。d 組 Laprida 若涉移居，與 Natur 的「聽覺落差」不同軸。
- **23213** hook 四型：斷言（Deface、Pareidolia）／場景（Sirimiri、Blue Loops、Clocktower）／懸疑（Dras，收尾指派〈Mazil〉讓薩克斯風完整發聲）／人物定調（Natur、small circle）。開頭前四字全批 14 張互異。開頭兩句交代身分：hook 未帶身分的，note 第二句補居住地或出生地＋樂種。
- **23214** 「他」引入法與第二句句型配表（8 位皆單卡、無跨張同人）：Kate＝居住地「住在舊金山的」／「常在」；Irisarri＝身分「是紐約的作曲家」／「是」；KRM＝名義「以 The Bug 之名」；AZH＝出生地「台北出生、多倫多長大」；Basinski＝代表作「以…聞名」；Muir＝身分前置「洛杉磯的 DJ 與田野錄音者」；KMRU＝本名「本名 Joseph Kamaru」；calhoun＝家鄉與現居「出身…現居」。有意避開 md36 已上架用過的「即」「搬到」「找來」「原是」「替…開發」。「日」後一字：Kate 推、Irisarri 以、KRM 自、Basinski 才、KMRU 交；AZH、Muir、calhoun 只寫到年；與 d 組（上、在）不撞。
- **23215** 補充指示照辦：媒體名、榜單與名次不進 note，評介內容改寫成聲音描述或「專輯說明」「樂評的觀察」（calhoun 的「向來溫柔」標為樂評的觀察）。Basinski 照主線寫首度發行、不寫重發；KMRU「現場常駐曲」在發行前（2022 完成→2024 發行），無晚於發行事件。自查：全批 14 個 hook 中文 4-gram 0 撞、hook 與 note 無逐字重複句。`node qa-batch.mjs hooks add-20261105-md37` 全部通過（5 組 14 張）；`node chk-hook-crossgroup.mjs add-20261105-md37` 全部通過（hook 加權 18–27、note 211–275；只報不擋 1 筆在 d 組）。
