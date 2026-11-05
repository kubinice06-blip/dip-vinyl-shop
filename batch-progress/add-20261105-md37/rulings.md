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
