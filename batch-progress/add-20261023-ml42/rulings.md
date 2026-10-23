# add-20261023-ml42 裁定（情緒薄格策展線・恍惚：lo-fi hip-hop／jazzhop 暖盤＋暖的 instrumental hip-hop 慢盤）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 9 輪，本工作階段負責 ml42、ml45；店主同日「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml42 列），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml42.json`（54 張）→ `master-ml42.json`（MB 回查 54/54 釘住、0 flag）→ 主線汰 9 → `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml42-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 19321–19330、b 19331–19340、c 19341–19350、d 19351–19360、e 19361–19370、鉤子 19371–19380、寫作 19381–19390、主線 19391–19400。**
---

## 主線策展（不佔條號）
- 策展 54 張全數 MB 釘住（Album、無 secondary type）：主場景 lofi-jazzhop 44（Kupla、sleepy fish、jinsang、SwuM.、Nohidea、mt. fujitive、Purrple Cat、Philanthrope、Hoogway、Tenno、less.people、bsd.u 等）、擴寫 warm-instr-hiphop 10（Wun Two、Ohbliv、Bluestaeb）。moodGuess x 2.0–2.4、y 0.9–1.3、z 0.6–1.3，全過邊距。
- 池中同型錨點：Tomppabeats《Harbor》2.0/1.0/1.2、《Arcade》2.2/1.2/0.8；jinsang《life.》2.3/0.8/1.3；Uyama Hiroto 2.3/0.7/1.4；Nujabes 三張 y 0.5–1.0。
- 主場景頭牌（Nujabes、Uyama Hiroto、Fat Jon、tomppabeats、jinsang《life.》、Knxwledge、Onra、Mndsgn、Teebs）已在池；Kudasai MB 查無且多單曲／EP、Hydeout Productions 為廠牌合輯，不收。乾淨 jazzy Chillhop（Saib、Blue Wednesday、Mondo Loops、eevee、potsu）策展層估 y 0.6–0.7 未提；Dibia$e、Twit One 彈跳 boom-bap x≈2.8–3 未提。
- **主線汰 9**（留作候補）：y 貼邊的 Chillhop 拋光盤 Philanthrope《Cabin in the Woods》《Waking Dreams》、Aso《Home》、Hoogway《Beauty in All Forms》；z 貼邊（偏哀傷／太空感，估 0.6）bsd.u《pook》《can't remember》、idealism《Sit In Silence》、Purrple Cat《Distant Worlds》；sleepy fish《Something Forgotten》（2026-09 新盤，聲音無來源，且同人已 4 張）。
- 長度：sleepy fish《My Room Becomes the Sea》23.9 分，MB 為 Album、場景代表作，照收；其餘 26–64 分。
- 跨分支去重：對 origin 前 60 個 `claude/*` 分支的 seed 與 10-2x 卡單 0 撞。

## 研究 d 組
- 19351：Ohbliv《Give Thanks》moodGuess 存疑——Bandcamp 稱 Dilla 式切片、混音「比早期更乾淨」，tag 為 boom bap，樂評提到鼓點重；策展的「懶拍、飽和糊」不成立，暖（funk／soul 取樣）成立。label 空白可補 Fat Beats Records（Bandcamp＋Discogs FB5192 皆證）。
- 19352：Ohbliv《Raw Spirit Jewels》聲音面無來源，status thin；策展自標 z 0.7 且 cosmic／spiritual 標籤無法佐證暖，低信心。
- 19353：mt. fujitive 三張（sanctuary、ventures、Eternal）全 thin，只有 Bandcamp 自述／標籤。sanctuary「和風旋律」無來源，不採用；ventures 自述「subtly basses」，低頻含蓄，y 1.0 可能偏高；Eternal 完全無聲音證據，建議低信心或換片。三張 Bandcamp 數位版皆未列廠牌，Vinyl Digital 是後出黑膠（Eternal 限量 300 張、VinDig490）。藝人本名僅單一搜尋摘要，未入 facts。
- 19354：Elijah Who《canvas》moodGuess 存疑——tag 有 boom bap，2017 年 Stereofox 把他另一首標 Melancholic，暖／懶無來源；Discogs 以 Vinyl Digital 登錄 AAC 檔案版，卡單 self-released 可維持。
- 19355：Purrple Cat 三張（Bloom、Just Relax、Cat Nap）全 thin，匿名計畫無樂評。Just Relax 卡單 label「Litter Box」查無任何來源，建議改 self-released／留空（推翻策展一處）；其標籤含 sad、vaporwave，色調可能偏哀傷，moodGuess 存疑。

## 研究 c 組
- 19341：Soulphonic 卡單 label「self-released」推翻為 UKNOWY Music（Bandcamp 版權 © 2019 UKNOWY、Discogs 廠牌欄），建議主線改卡單；Ships II 卡單 label 空，補 Sichtexot SE117。
- 19342：nohidea.（Blank Space）與 Nohidea（sweetdreams.）判為同一藝人（Bandcamp 帳號列有 Alpha Pup《Departures》，DVOX 稱匿名 LA 藝人）；Bandcamp 地點欄 Fucking, Austria 視為玩笑，facts 不採。
- 19343：Blank Space、sweetdreams. 標 thin（無樂評、無曲目描述）；Rio、Penthouse、Pirata、O Cavalo Vermelho、Ships II、Rugged Tranquility、Soulphonic 聲音事實來自作者／廠牌自述與標籤，標 full 但無 BPM／爆音數字。
- 19344：moodGuess 存疑（列給主線）：sweetdreams.（下一張 Psychonautica 混入 dnb／UK garage，聲音無來源）、O Cavalo Vermelho（boombap／chillhop 標籤＋「refined」＋真人薩克斯風，恐偏拋光）、Soulphonic（作者自述含 R&B／氛圍，單曲偏長，恐偏乾淨）、Penthouse（21 首含 3 段 skit，結構零碎）、Rio（bossa 取樣，無「dusty」證據）。

## 研究 b 組
- 19331 研究 b 全組：Bandcamp 的正確網址是 jinsangbeats.bandcamp.com（jinsang.bandcamp.com 為 404）；WebSearch 3 次皆無樂評／訪談，聲音 facts 只用 Bandcamp 標籤、歌迷留言、文案與 Discogs 風格欄，BPM、爆音、磁帶飽和、低頻厚度查無來源一律不寫，9 張中 8 張標 thin。
- 19332 moodGuess 存疑：SwuM《Akira》（曲名滿是 trap 語彙、標籤 future beats／rnb，可能鼓組偏躁）、SwuM《Woke》（歌迷稱 powerful／crisp，非糊暖）、Nohidea《Departures》（Alpha Pup 文案為迷幻節奏、細密打擊樂、實驗聲音設計）、nohidea.《home movies》（身分與聲音皆無來源，優先汰換）；SwuM《Swimming》暖／重無證據。
- 19333 nohidea.《home movies》身分：MB 把 nohidea.（澳洲二人組）與 Nohidea（奧地利）分成兩個藝人，但 Discogs 同頁，alaya. 廠牌與 Osho EP 吻合，推測同一人，facts 不寫生平。

## 研究 a 組
- 19321：a 組 9 張聲音 facts 多半只有廠牌／Bandcamp 自述，無 BPM、爆音、磁帶、低頻資料；status 7 張 thin（Life Forms、sleepy fish 四張、solitude. ），Imaginary／Dimensions／Mirage full。moodGuess 存疑（卡單的「爆音、殘響墊、糊吉他」多數查無來源）：Dimensions（官方稱節拍俐落乾淨）、Mirage（輕盈明亮）、Everything Fades to Blue（官方稱脫離 lo-fi、人聲多）、Like the Sky（官方稱 energized、人聲和聲）、solitude.（26 首短 loop、爆音無來源）。建議汰換候選：Like the Sky、Everything Fades to Blue、Mirage，主線評分前實聽。
- 19322：sleepy fish《My Room Becomes the Sea》23 分 52 秒，Discogs 稱 Mini-Album、Chillhop 稱 EP 系列，MB 為 Album；照主線已裁定收，寫作層用「短專輯」。
- 19323：Dimensions 數位版 2023-02-03（Bandcamp、MB），Discogs 黑膠 2023-03-03；以 2023-02-03 為準。

## 研究 e 組
- **19361**（leavv《Mind Garden》）：Discogs／Bandcamp 為 9 首約 22 分，卡單 11 軌 26.2 分（MB 版本差）；以 9 首寫入 facts。聲音無專文，僅 Bandcamp 標籤與聽眾留言；status thin。moodGuess 存疑：y 偏高，曲短輕盈。
- **19362**（Hoogway《Slow Motion》）：Sleep Tales、2023-05-29、12 軌 30:43 由 Qobuz／MB 核對；Discogs、Bandcamp 皆無頁面，完全無聲音文字來源。moodGuess 存疑：慢拍、柔墊殘響爆音全無來源，建議先聽。
- **19363**（Tenno《The Inner Light》）：Lofi Girl 官方文案為「東方風味樂器＋細心調過的節拍」，聽眾描述鋼琴、弦樂、鳥鳴。moodGuess 存疑：『厚柔墊殘響爆音』無來源，偏清透氛圍；製作人本名（MB 掛 Tuchin Egor）單一來源不入 facts。
- **19364**（Tenno《Mind Temple》）：官方頁無聲音說明，僅一則聽眾留言（風鈴、薄霧、細雨）。moodGuess 存疑：『懶拍、濾波糊』無來源，偏輕盈空靈。
- **19365**（Bluestaeb《Rodalquilar》）：推翻策展層『dusty 爵士靈魂取樣、厚低頻』：Bandcamp 標籤為 jazz／neo-soul／r&b，聽眾提到人聲，另有〈Both Worlds〉feat. Blameful Isles；Scratched Vinyl 的樂評針對 2018 年作，僅作旁證。moodGuess 存疑：dusty 取樣、厚低頻皆無證據。城市（柏林／巴黎）來源互異，寫作層宜避開。
- **19366**（less.people《Origins》）：自行發行（無廠牌）、17 軌 56 分；Bandcamp 頁我方抓不到、Discogs 無此盤，聲音完全無來源。moodGuess 存疑：磁帶糊、爆音、柔墊全無來源，56 分長篇是否整張慢暖須先聽。
- **19367**（less.people《One Day It's Over》）：官方文案為鋼琴與 Rhodes，沒有吉他；推翻策展層『殘響吉他、爆音』。moodGuess 存疑：吉他、殘響、爆音無來源，暖靜成立。
- **19368**（jinsang《transitions》）：自行發行 14 軌，逐曲加總約 29 分（Bandcamp 摘要誤稱 40）。標籤為 boom bap／ambient／experimental，未見磁帶飽和來源。moodGuess 存疑：boom bap 標籤不保證懶拍；貼邊疑慮無法由文字消解。
- **19369**（SwuM.《スモーク》）：標籤與曲名明顯 trap 化（Trap House、Foreign Hoes、Drop Top），聽眾說開大聲有衝擊力。moodGuess 存疑：『懶拍、crunchy 飽和濾波糊』無來源，建議主線依試聽決定是否汰換。人物（紐約／以色列／南極洲）來源互相衝突，不寫。
- **19370**（保留）：總結：9 張全數 thin（無一張有專文聲音描述）；推翻策展層的主張共 3 處（Bluestaeb dusty 取樣、less.people 吉他、SwuM 懶拍）；其餘 moodGuess 存疑皆為『聲音細節無來源』。

## 主線研究後汰換（不佔條號；2026-10-23）
- 研究層 45 張幾乎全 thin：lo-fi 圈沒有樂評，聲音只有 Bandcamp 標籤、廠牌文案、聽眾留言；BPM／爆音／磁帶飽和全查無。**只憑「查無」不汰**（池中同型 Tomppabeats、jinsang、Nujabes 全落恍惚）；**有反證的一律汰**：
- **汰 19 張**：
  - trap 化／衝擊（x、z 風險）：SwuM.《Akira》（曲名 trap 語彙、標 future beats）、《Woke》（聽眾稱 powerful、crisp）、《スモーク》（標 trap、開大聲有衝擊力）。
  - 乾淨輕盈（y 風險）：Kupla《Dimensions》（Bandcamp 自稱 clean beats，無吉他與殘響墊）、《Mirage》（鋼琴為主、輕盈）；Tenno《The Inner Light》《Mind Temple》（清透空靈）；Wun Two《O Cavalo Vermelho》（較精緻、真人薩克斯風與鍵盤）；Bluestaeb《Rodalquilar》（jazz／neo-soul／r&b 標籤、有人聲，無 dusty 取樣證據）；sleepy fish《Everything Fades to Blue》（官方稱偏離 lo-fi、人聲多）。
  - 拍子推進：sleepy fish《Like the Sky, or Something Else》（官方「melancholic and energized」、上揚節拍）；Elijah Who《canvas》（boom bap 標籤、他曲被標 Melancholic）。
  - 色溫哀傷：Purrple Cat《Just Relax》（sad／vaporwave 標籤；label「Litter Box」三處查無）。
  - 非正規專輯長度：sleepy fish《My Room Becomes the Sea》（23:52，Discogs 標 Mini-Album、Chillhop 稱 EP 系列）、leavv《Mind Garden》（Discogs／Bandcamp 9 首約 22 分）。
  - 身分與聲音雙重存疑：Nohidea 四張（《Departures》Alpha Pup 文案為抽象實驗音效設計；《home movies》零聲音來源、MB 把 nohidea. 與 Nohidea 分成兩個藝人；《sweetdreams.》零來源、曲長 1–2 分；《Blank Space》26 分零來源）——同名身分不清，整組不收。
- 不補位：候補 9 張是主線先汰的 y／z 貼邊盤，研究後更不會比留下的穩。
- 定案 **26 張**（a 4、b 5、c 6、d 7、e 4）：Kupla《Life Forms》《Imaginary》、sleepy fish《Beneath Your Waves》、jinsang 5、SwuM. & Jinsang《Blossoms》、SwuM.《Swimming》、Wun Two 4、Ohbliv 4、mt. fujitive 3、Purrple Cat《Bloom》《Cat Nap》、Hoogway《Slow Motion》、less.people 2。汰除卡存 `dropped-cards.json`，研究稿條目移到 `dropped-research.json`。研究 qa-batch 全過。
- 卡單更正（研究層提出）：Ohbliv《Soulphonic》label 改 UKNOWY Music、Wun Two《Ships II》補 Sichtexot、Ohbliv《Give Thanks》補 Fat Beats Records、Kupla《Imaginary》補 Kuplasound。
