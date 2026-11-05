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

## 鉤子層（d、e）（23216–23220）
- **23216** 交件：`desc-tools/batches/hooks/add-20261105-md37-hooks-d.json`（4）、`-e.json`（2），共 6 張，張數以研究稿為準。預算公式同 23211：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`，上限 230（6 張皆 full）。逐筆（預算／hook 原始字元／加權）：Geaney 229／27／25；seah 202／22／19.5；Kirkegaard 224／30／27；Laprida 222／24／24；Amby Downs 228／24／24；Goldston 227／24／24。初稿 6 張全超標（276–337），整格捨去：Geaney 的疫情遠端錄音（也避開 Dras 的疫情格）、7 月 15 日與首演；seah 的 Body Weather、Critical Feminist Posthumanism、收尾曲〈dinosaur piss…〉；Kirkegaard 的生年與採集清單、捨棄長篇 drone 的對照、曲數曲長、發行日與廠牌名；Laprida 的布宜諾斯艾利斯前衛圈、「開到很大」、6 月 30 日、Outside Time；Amby 的影像裝置配樂、Lawrence English 圍欄聲；Goldston 的 Earth、《MTV Unplugged》、紐約。壓完回核：hook 依賴格全在 g1／g2（Geaney 受壓聲＋35 分鐘在 g2；seah 舊麥克風在 g2；Kirkegaard 三人死於白島＋底片成封面在 g2；Laprida 地震＋垃圾桶在 g2；Amby「兩首長曲」前移到 g1；Goldston 三樣器材在 g2）。hook 自驗事實：Kirkegaard「沒人生還」＝三人皆死於白島；tromba marina 弦數 Daily（兩條）與 Wikipedia（一條）矛盾，hook 與 note 都不寫弦數。
- **23217** 骨架歸屬（本組 6 條，各張只寫自己的歸屬句）：Tape Melt＝童年錄帶磨損的記憶寫成室內合奏；Conduits＝十年環球採集單一題材（水）；Snowblind＝歷史探險災難當題材（Andrée 1897，封面用遇難者底片）；Pitch Dark＝創傷記憶化成器物裝置（地震→exciter 塞進垃圾桶）；Ngunmal＝追溯被殖民遮蔽的家族史；Open Space＝一次不間斷錄完的獨奏（看峽谷影片錄）。與 a–c 八條不撞：Laprida 的移居只在 g1 當身分，不碰 Natur 的「聽覺落差」；Goldston 的失真大提琴走「一次錄完」，不走「傳統樂器接電」。
- **23218** hook 四型：場景（Tape Melt、Open Space）／人物定調（Conduits）／斷言（Snowblind、Ngunmal）／懸疑（Pitch Dark，收尾指派 exciter 放進箱子與垃圾桶）。合 a–c 全批 14 張開頭前四字互異，也不與 md34–md36 已上架 hook 開頭相同。開頭兩句交代身分：6 張 hook 只有 seah 帶名、其餘不帶名，note 第二句全部補國籍／身分＋樂種。
- **23219** 「她／他」引入法與第二句句型配表（6 位皆單卡）：Geaney＝國籍＋職業「愛爾蘭作曲家」／「小時候」；seah＝名義具名「這個名字屬於」；Kirkegaard＝國籍＋身分「丹麥聲音藝術家」／「取材」；Laprida＝國籍「阿根廷藝術家」／「移居…後」；Amby Downs＝化名「是…的化名」；Goldston＝國籍＋樂器「美國大提琴家」／「擔任」。避開 a–c 已配的「常在」「是」「以…之名」「出生、長大」「以…聞名」「的…者」「本名」「出身…現居」，也避開 md36 的「原是」（Laprida 原稿有，已捨去）。「日」後一字：d、e 六張 note 全部只寫到年或月，0 筆（23214 預估的「上、在」已不存在）。
- **23220** 補充指示照辦：媒體名、榜單與名次不進 note，評介內容一律改寫成聲音描述。Kirkegaard 1930 營地發現早於發行、屬題材背景；涉逝者標「語氣克制」。自查：hook 間中文 4-gram 0 撞（對全批 14 張與 md34–md36 hooks；Amby 原稿「首長曲裡」撞 md34 Bell Witch hook，改「長篇」）；hook 與自己 note 無逐字重複句（Kirkegaard「北極氣球」、Laprida「十五年前」、Goldston「失真踏板」已從 note 移除，只剩 Amby「的家族史」殘片）。`node qa-batch.mjs hooks add-20261105-md37` 全部通過；`node chk-hook-crossgroup.mjs add-20261105-md37` 全部通過（hook 加權 18–27、note 207–237；只報不擋 1 筆＝Kirkegaard 的「沒有出口、沒有溫暖」，是本人說法、屬內容）。

## 寫作層（writer-1）（23221–23230）
- **23221** 交件：`desc-tools/batches/output/add-20261105-md37-out-1.json` 14 張（全 full），字數 205–235。逐張：Deface 220、Sirimiri 231、Blue Loops 217、Dras 219、Clocktower 228、Pareidolia 235、Natur 225、small circle 224、Tape Melt 209、Conduits 205、Snowblind 229、Pitch Dark 230、Ngunmal 218、Open Space 209。初稿只有 Pareidolia 超標（250），整格捨去句尾「成厚重的 drone」（note 未列）與「這回」壓回；無掉下限。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（待補 0）全部通過；「據」、媒體名、資料平台名 grep 0。
- **23222** 第二句句型照鉤子層 23214／23219 配表：Kate 居住地領句「常在」、Irisarri「是」、KRM「以 The Bug 之名」領句、AZH「台北出生、多倫多長大」、Basinski「以…聞名」、Muir「的 DJ 與田野錄音者」、KMRU「本名」、calhoun「出身…現居」、Geaney「愛爾蘭作曲家…小時候」、seah「這名字屬於」（原「這個名字」與已上架兩張撞 4-gram，去「個」）、Kirkegaard「取材」、Laprida「移居…後」、Amby「是…的化名」、Goldston「擔任」。
- **23223** 日期句偏離鉤子層「日」後一字表三處（可逆）：Kate 的「日推」與 KMRU 的「日交」都與已上架卡（md34–md36、shop）撞 `年月日推`／`年月日交`／`交給英國發行` 3 張以上，改成「制。2017 年…日，七首曲子在 Failing Forms 名下問世」與「2024 年…日，來自英國的 Touch 發行了它」；Irisarri「日以」、KRM「日自」、Basinski「日才」照表。只寫年的 7 張逐張錯開領頭：替它出版／唱片年交由／發行它的是…那是年的事／於年把它發行／年，替她出版／唱片面世於年／Room40 在年把…推出／年由…出版。
- **23224** hook 不複述：Muir 第二句不重講「臉孔」，改為具名 Pareidolia（空想性錯視）並接 note 的用途；calhoun 不再寫「溫柔」（hook 已說），樂評觀察只留「新世紀氣息」，寫成「樂評聽到」；Geaney 的「VHS 受壓聲起點」與 Amby 的「兩首長曲」「家族史」已在 hook，正文不重寫（Amby 改「家族過往」）；Goldston「一次不間斷」已在 hook，正文只寫錄音時看大峽谷影片；Basinski 第二句以「撿回電視機的正是 Elaine」替 hook 的撿拾者具名。Kirkegaard「三人」補「同行」交代所指，涉逝者平敘。
- **23225** 自掃（han() 中文 4-gram）：本檔 14 張 3 張以上 0 條，2 張殘片只剩「田野錄音」「聲音藝術家」（技法與職稱）。另合掃 md34–md36 與 add-20261006-shop 已上架 out：途中拆掉與舊卡撞成 3 張以上的「合計約分鐘」「加起來約分鐘」「分鐘左右」「年月日推」「年月日交」「是年月日」「在年月日」「時間是年」「專輯在年」「英國廠牌」「這個名字」「問世廠牌是」「的第一張」「首約分鐘」，一律整詞改寫；剩「薩克斯風」「田野錄音」兩個樂器／技法名。
- **23226** 可逆小判斷：Irisarri「這張無鼓的 drone」、Kate／KRM 樂種描述取自 sound 欄（無鼓 drone），屬開頭兩句的樂種交代；KRM「碾壓式的電子樂」照 note 原意縮詞；AZH「深夜錄音」不寫誰吹奏。主線審稿可再看。

## 主線試聽／封面／三軸（不佔條號；2026-11-05）
- 試聽：自動配對 3 ready（Marc Kate、Irisarri、Kirkegaard）；`preview-override.json` 以 Apple 同名條目逐張核曲目數補 7 張（人工身分 6 張 MB 無曲目表、KMRU 數位版分 5 段、Goldston MB 無曲目）→ **10 ready**；KRM《Blue Loops》、Jake Muir、Susan Geaney、seah 四張 Apple us／gb／jp 無條目 → unavailable。
- 封面：CAA 8（release-group front）；§1 人工身分 6 張用 Bandcamp og:image 1200px（`covers.json`）。14 張 HTTP 200，主線縮圖表目視與盤名相符。
- 三軸：機器基線為主；`ratings-override.json` 改 3 張（Basinski 4/4/4 → 3/4/3：檔案錄音非代表作；KMRU 3/5/3 → 3/4/3：Touch 廠牌錨點；Laprida worker 查無 → 3/5/3）。頂點 0（無殿堂／遺珠／異端證據；listeners 皆非 <300 有效值或無串流證據）。

## 主線審稿（23231–23233；2026-11-05）
- **23231** 逐張審 14 張（全文印出，逐句對研究稿 a–e；抽核 Irisarri 卡帶 72 分鐘與紐約、KMRU 2022 完成、Dras 2020 洛杉磯封城完成、Basinski 香腸夾工廠與 Haight Street、Geaney VHS 壓迫聲、Laprida 十五年前玻利維亞地震、Amby Downs Murri 與歐洲混血（Room40 原文）、Marc Kate 舊金山、KRM 布魯塞爾、Goldston 1993–94 Nirvana 巡演，皆有出處）。改 2 張 2 處（`desc-override.json`），只動措辭、不動事實，研究／hooks／input 不需同步：
  - `KMRU|Natur`：「這首 52 分 38 秒的單曲」→「這首 52 分 38 秒的長曲」（「單曲」會被讀成 single；研究 c 原文為「這首長曲」）。
  - `Susan Geaney|Tape Melt`：「這首單曲一軌的曲子」→「這首只有一軌的曲子」（同上，且語句不通）。
- **23232** 媒體名、榜單名次、「據說／據傳」、資料平台名全批 0；`qa-batch out`、`qa-check-research`、`fix-spacing` 0 處。
- **23233** 寫作層自報兩個小判斷照准：Irisarri 第二句「無鼓的 drone」取自 sound 欄（研究 a 有 Noise Not Music 樂評支撐）；KRM「碾壓式的電子樂」是 note 原詞縮短。

## 上線（2026-11-05，主線）（條號 23234）
- **23234**：上線 14 張：card_catalog 14／14、KV 14 鍵回讀逐字一致（stamp 20261105md37）、試聽 10 ready／4 unavailable（`popular-preview manifest` 換成最紅那首 5 張）、seed +14、published gate 0 error（warning 皆 UPC 盡力而為與人工身分提示）。寫入前對 origin/main seed 與並行 ml66／ml67 卡單去重 0 撞。

## 藝人介紹（ALBUM_ONBOARDING §11）
- 本批新藝人 12 位切 **ar-d-283**（名冊 `batch-progress/artist-intro/roster-md37-ar-d-283.json`；Basinski、Irisarri 已有介紹）：補洞 2 組（Sonnet，WebSearch 每位限 3 次）→ 寫作 1 組（Opus；full 4、thin 8）→ `qa-artist` 0 處 → 主線逐位審未改字 → 上線 12／12。
