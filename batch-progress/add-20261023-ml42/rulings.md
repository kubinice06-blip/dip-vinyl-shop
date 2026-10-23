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

## 鉤子層（a–e）（19371–19380）
- **19371** 交件：`desc-tools/batches/hooks/add-20261023-ml42-hooks-a.json`（4）、`-b`（5）、`-c`（6）、`-d`（7）、`-e`（4），共 26 張，key 逐字照研究稿、順序相同（包括 `wun two|Rio` 的小寫與 `One Day It’s Over` 的彎引號）。本批只派一位代理，條號用整段 19371–19380。預算公式：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；研究稿標 thin 的 19 張上限 170，full 的 7 張上限 230。逐筆（預算／hook 加權／hook 原始字元）：Life Forms 166／18.5／21｜Imaginary（full）224／19／19｜Beneath Your Waves 165／20／20｜solitude. 164／18／20｜gratitude. 154／17／25｜confessions 140／22／29｜in flight 157／20／22｜Blossoms 149／19.5／24｜Swimming 164／15／15｜Rio（full）228／20／20｜Penthouse（full）210／20.5／29｜Pirata（full）190／21／21｜Ships II（full）195／19／28｜Rugged Tranquility（full）211／19／24｜Soulphonic（full）214／17.5／23｜Give Thanks（full）221／19／19｜Raw Spirit Jewels 155／17／17｜sanctuary 149／17／17｜ventures 168／19／19｜Eternal 161／20.5／24｜Bloom 164／19／19｜Cat Nap 164／22／22｜Slow Motion 170／18／18｜Origins 152／21／24｜One Day It’s Over 153／14／14｜transitions 169／19.5／22。初稿 18 張超標，靠整格捨去壓下來：Life Forms〈Eons〉曲長、曲數；Beneath 曲長；solitude. 卡帶版、〈Bright〉〈Dusk〉；gratitude.〈g[low]〉；confessions 曲名列；in flight〈clouds〉〈haven〉；Blossoms 曲數；Swimming 聽眾留言、曲長；Penthouse「玩得開心」、曲長、〈Rain Outside〉；Rugged 長曲名、dirteesoulhop；Soulphonic 收尾句；Give Thanks 數位錄音機；Eternal 黑膠 300 張；Slow Motion 養分；Origins Chillhop 後續；One Day 曲名；transitions 收尾曲長。壓完回頭核對 hook 依賴的那一格：Life Forms 的「集資、310 張」原本已被捨去（hook 踩空），補回 g1；Slow Motion 改 hook，並把〈The Shore〉放進 g3；Beneath 把 hook 原稿的「夢見」（沒有來源）改成照事實寫。其餘 hook 依賴的事實都在 g1／g2，或者 hook 本身就寫出了事實。
- **19372** 骨架歸屬（26 張 26 條，只在擁有骨架的那張 note 裡寫歸屬句）：Life Forms＝群眾集資限量黑膠＋直播頻道旗下廠牌；Imaginary＝多樂器演奏者自述樂器清單＋學琴經歷；Beneath＝動畫角色三部曲的中段；solitude.＝曲序從白天走到夜晚；gratitude.＝聽眾拿爵士鋼琴家來類比；confessions＝曲子比前作拉長；in flight＝隔一年多以限量白膠回歸；Blossoms＝兩位 beatmaker 合掛；Swimming＝三首客座＋同年轉投廠牌；Rio＝航程明信片（取樣的音樂史之旅）；Penthouse＝一夜敘事＋skit 結構；Pirata＝海盜口白四章的概念專輯；Ships II＝九年後的續集＋在廠牌的最後一張；Rugged＝兩台取樣機做出的第一捲數位 beat tape；Soulphonic＝自創詞當盤名；Give Thanks＝謝詞名單＋已故母親（語氣克制）；Raw Spirit＝暫停帶起家、從父親的唱片開始；sanctuary＝向樂種本身致敬；ventures＝說明文字寫成一段旅程（公車站）；Eternal＝客座後來成了合作專輯的搭檔；Bloom＝季節主題曲名；Cat Nap＝曲名寫成一隻寵物的一天；Slow Motion＝專出睡前音樂的廠牌（海邊到沙發）；Origins＝口語句子當曲名＋異國地名長曲；One Day＝廠牌文案的山城與脆弱；transitions＝獻給新的十年。hook 四型：懸疑（Pirata、Eternal、Origins、in flight）／斷言（gratitude.、confessions、Ships II、Rugged、Soulphonic、sanctuary、Blossoms）／場景（Life Forms、Beneath、solitude.、Rio、Penthouse、ventures、Bloom、Cat Nap、Slow Motion、One Day、Swimming）／人物定調（Imaginary、Give Thanks、Raw Spirit、transitions）。26 張開頭前四字互不相同，也不與 hooks 目錄裡所有既有 hook 的開頭相同（掃描後改掉的有：「26 首」撞 md3、「14 首」撞 ts5、「曲名寫的」撞 md1／c59、「Soul」撞 c131、「封面那張」撞 c63、「最長的一」撞 c89 等、「這回曲子」撞 nj1、「三首曲子」撞 md6、「內頁印著」撞 c83、「曲名後面」撞 c55）。
- **19373** 同藝人分軸，生平只放一張：jinsang 6 張——生平（2014 年起活躍、首張《Kona Park》）只給 transitions；其餘按軸分：solitude. 寫曲序、gratitude. 寫聽眾的類比、confessions 寫曲長變化、in flight 寫回歸與白膠、Blossoms 寫合作。池中《life.》已用過「jinsang 是加州的 hip-hop beat 製作者」與「每首都很短，最短…最長…」，這兩個句形本批 6 張都不指派。Ohbliv 4 張——生平（MC 出身、1997 年做暫停帶、父親的唱片）只給 Raw Spirit；本名 Brad Caudle 只給 Give Thanks；Rugged 寫取樣機；Soulphonic 寫自創詞＋UKNOWY。Wun Two 4 張——沒有生平事實，分成明信片、一夜、口白概念、續集＋告別。mt. fujitive 3 張——擁護者自稱與致敬只給 sanctuary（研究稿沒有來源的「和風」不指派）；ventures 寫說明裡的旅程與編制；Eternal 寫客座。Kupla 2 張——本名與學琴經歷只給 Imaginary，城市＋廠牌給 Life Forms。Purrple Cat 2 張——Bloom 寫匿名計畫＋系列目錄，Cat Nap 寫簡介裡的玩笑話＋官網吉祥物。less.people 2 張——Origins 寫樂種身分（鹽湖城只有單一來源，不寫），One Day 由廠牌之口介紹。SwuM 2 張——Swimming 寫客座＋轉投 Chillhop，Blossoms 只寫兩人並列。「他」的引入法：hook 用「他」的有 Soulphonic、Give Thanks、transitions；hook 只寫事物、不寫人名的有 Life Forms、Imaginary、Beneath、solitude.、confessions、in flight、Swimming、Rio、Penthouse、Pirata、Ships II、Rugged、Raw Spirit、sanctuary、ventures、Eternal、Bloom、Cat Nap、Slow Motion、Origins、One Day。這些卡的第二句全數指派寫出名字＋哪裡人／什麼樂種。
- **19374** 第二句句型配表（26 張各用一種）：城市＋樂種（Life Forms）／本名＋學琴經歷（Imaginary）／樂種歸類（Beneath）／「出自…之手」（solitude.）／發行年（gratitude.）／與前作對照（confessions）／名字直接領句（in flight）／兩人並列（Blossoms）／廠牌關係（Swimming）／國籍＋樂種（Rio）／頁面上的德文邀請（Penthouse）／「概念專輯」（Pirata）／續集序數（Ships II）／器物：取樣機（Rugged）／自述的樂種混合（Soulphonic）／本名（Give Thanks）／MC 出身（Raw Spirit）／「擁護者」自稱（sanctuary）／冰島語曲名〈draumur〉（ventures）／客座名單（Eternal）／匿名計畫（Bloom）／簡介裡的玩笑話（Cat Nap）／藝名對照本名（Slow Motion）／樂種身分（Origins）／廠牌之口（One Day）／出道年（transitions）。
- **19375** 日期：26 張 note 全部只寫到年或月，`/[年月]\s*\d{1,2}\s*日(.)/` 0 命中。「日期＋動詞」的語序交給寫作層逐張配。媒體名與媒體榜單名次不進 note：3hive、In Search Of Media、RouteNote、Stereofox、Apple Music 簡介、Discogs／MusicBrainz 都不具名，Discogs 社群評分也不指派；Bandcamp 只當發行平台出現。聽眾留言一律寫成「聽眾說／聽眾形容／這個比喻歸聽眾」，並附「寫成聽眾的話」。研究稿推翻策展層的聲音描述（dusty、爆音、磁帶飽和、殘響墊、和風旋律）一律不指派；聲音只用有來源的格子：Imaginary 自述的樂器、ventures 說明裡的吉他／鋼琴／壓碎感的鼓、Pirata 自述的情緒旋律＋稀疏的鼓、Ships II 廠牌形容的柔和切點、Give Thanks 說明裡的 Dilla 式切片與較乾淨的混音、One Day 文案的鋼琴＋Rhodes，以及各張的 Bandcamp 標籤。時序有標記的：Swimming 同年轉投 Chillhop、Rugged 2021 年合輯、Eternal 2023 年《Aeon》。Give Thanks 母親已故一事標「語氣克制」。
- **19376** 自查：26 張 hook 之間中文 4-gram 0；hook 與其他卡 note 0；hook 與自卡 note 的 6 字逐字重複 0；hook 與 add-2026102* 既有 hooks 的 4-gram 0（改掉「一路走到」「隔了一年」「首加起來／加起來不到」「只有兩個」「請來一位／一位客座」「個曲名都」「他的母親」「成了搭檔」）。note 對 note 只剩指派用語與身分片語：「發行本作」「自行發行」「聽眾說它」「廠牌說它／這」「器樂嘻哈」「月的本作」「只有一句」，由寫作層改寫。`node qa-batch.mjs hooks add-20261023-ml42`：全部通過 ✓；`node chk-hook-crossgroup.mjs add-20261023-ml42`：✓ 全部通過（5 組 26 張，hook 加權 14–22，note 137–235）。輔助腳本：scratchpad `hook-ml42/`（ml42-gen.py、ml42-chk.py）。

## 寫作層（writer-2）（19386–19390）
- **19386** 交件：`desc-tools/batches/output/add-20261023-ml42-out-2.json` 13 張（full 3：Rugged 239、Soulphonic 225、Give Thanks 237；thin 10：Raw Spirit 178、sanctuary 145、ventures 176、Eternal 176、Bloom 173、Cat Nap 178、Slow Motion 164、Origins 152、One Day 142、transitions 166）。初稿只有 Rugged 245、ventures 190、Eternal 191 出界，整格捨去（Rugged「手上的全部器材」改短、Eternal 刪「客人成了合作專輯的另一半」收尾子句、ventures 刪「這 17 首」「那座」）。`qa-batch out`（合計 26 張與卡單相符）全部通過、`qa-check-research` 0、`fix-spacing` 0。
- **19387** 第二句全照 19374 配表：取樣機領句（Rugged，帶出里奇蒙）、自述樂種混合（Soulphonic，平台名不進正文）、本名（Give Thanks）、MC 出身（Raw Spirit）、「擁護者」自稱（sanctuary）、〈draumur〉（ventures）、客座名單（Eternal）、匿名計畫（Bloom）、玩笑話（Cat Nap）、藝名對照本名（Slow Motion）、樂種身分（Origins）、廠牌之口（One Day）、出道年（transitions）。日期「年月」後一字逐張相異：掛／接／上／面／推／把／讓／（Origins 把這、Bloom 把首）；ventures 以「年月出的這一卷」、sanctuary「是他年月上傳」、Give Thanks「數位版年月上線」、One Day「發行日落在年月」。
- **19388** 用語：媒體名、媒體榜單一律未寫（Discogs 評分、In Search Of Media、RouteNote 皆不進正文）；Bandcamp 只當發行平台；無「據說／據傳」。聽眾留言三處寫成歸屬清楚的話：One Day「有聽眾在頁面上說」、transitions「有聽眾說」，Rugged／Raw Spirit 不用聽眾留言。Give Thanks 母親已故語氣克制，不重述 hook 的封面舊照。Eternal 本作 note 未列曲數，正文不寫 17 首。
- **19389** 自掃：本檔與 out-1（定稿版）合掃 han() 4-gram，3 張以上 0 條；涉及本檔的 2 張殘片也全拆（拆掉：「首約分鐘」×5、「標籤寫著」、「替他發行」、「的是冰島」、「年月放上」、「聽眾說它」、「聽眾留言」、「三位客座」、「年月在推出」、「製作人年月」、「年月問世」、「年月替他」、「的這一卷」、「年月上架」、「廠牌把這」等）。out-1 自身之間的 2 張殘片（例：「年月推出」若 out-1 再改後仍在）留主線收件時合掃。

## 寫作層（writer-1）（19381–19385）
- **19381** 交件：`desc-tools/batches/output/add-20261023-ml42-out-1.json`，13 張，key 逐字同序（含 `wun two|Rio` 小寫）。字數（Array.from）：Life Forms 169｜Imaginary 229｜Beneath 169｜solitude. 167｜gratitude. 163｜confessions 145｜in flight 157｜Blossoms 176｜Swimming 173｜Rio 224｜Penthouse 226｜Pirata 199｜Ships II 207。thin 8 張 145–176、full 5 張 199–229，零超標（Beneath 初稿 186，整格改寫壓回）。
- **19382** 藝人名照卡單藝人欄：Rio 寫 `wun two`（小寫），其餘三張 `Wun Two`；Swimming 寫 `SwuM.`（含句點）。Blossoms 藝人欄是 `SwuM. & Jinsang`，第二句照配表「兩人並列」，分開寫 `SwuM.` 與 `jinsang`（後者照他自己卡的小寫），未自創第三種寫法。
- **19383** 只寫 note 列的項目；note 沒列的 facts（Kupla 單簧管以外的早期作、gratitude. 曲名的小寫寫法、solitude. 卡帶版、Swimming 曲長等）一律不寫。聽眾話全數掛「聽眾說／聽眾形容／一位聽眾說／有聽眾評它」，Guaraldi 比喻明寫歸聽眾。媒體名、榜單、據說／據傳 0 處。池中《life.》用過的「jinsang 是加州的…」句形避開（in flight 改「jinsang 做的是加州器樂 beat」）。
- **19384** 日期＋動詞配表（領頭字／動詞逐張不同）：時間是年月（Life Forms）／在年月掛上（Imaginary）／年月面市（Beneath）／他在年月親自放上（solitude.）／年月，加州（gratitude.，日期領句）／的《confessions》裡（confessions）／年月，他自行發行（in flight）／在年月放上（Blossoms）／同年月，由他（Swimming）／於年月幫他發了（Rio）／年月把擺上（Penthouse）／排在年月推出（Pirata）／在年月交由（Ships II）。「自行發行」只留 in flight 一處，其餘改自行端出／親自放上／自發；德國身分四張分寫：來自德國的／做器樂 hip-hop 的德國人／德國 beat 製作人／這位德國 beatmaker；曲長「從…到」只給 Rio，Ships II 改「最短…最長」。
- **19385** 自掃：與 writer-2 現行 out 檔（13 張）合掃中文 4-gram，凡含本檔者 2 張以上 0 條（初稿 21 條，逐輪拆掉；writer-2 交件過程中仍在改，主線收件時請再合掃一次）。`node qa-batch.mjs out add-20261023-ml42` 全部通過（兩檔 26 張）；`qa-check-research` 標記 0；`fix-spacing` 待補 0。輔助腳本：scratchpad `wr-ml42-1/`（gen-ml42-1.py、scan-ml42-1.py）。

## 主線審稿（19391–19400；2026-10-23）
- 19391：逐張審 26 張（out-1 13、out-2 13），逐句對回研究稿 facts；qa-batch out、qa-check-research（兩檔）、fix-spacing 皆 0 標記；正文無媒體名、無榜單名次、無「據」字。
- 19392：改 2 處：
  - `SwuM.|Swimming`：「SwuM. 在 2018 年開始替 Chillhop Records 發單曲」→「也替」——研究稿只說同年在 Chillhop 發單曲、之後長期以 Chillhop 為主，「開始」無出處 → 172 字。
  - `Hoogway|Slow Motion`：刪「布魯塞爾」——城市只有 Last.fm 單源，研究 e 組已標人物與城市來源衝突 → 160 字。
- 19393：核過但未改——Kupla 赫爾辛基與本名（Discogs）、jinsang 加州（Bandcamp 標籤）與首張《Kona Park》2014（Apple 簡介）、Guaraldi 比喻明寫為聽眾說法、Ohbliv 本名與母親取樣（RVA Mag、Microchop）、Pirata 國際版口白 Ugly God（Bandcamp）、mt. fujitive 雷克雅維克與《Aeon》合作（Bandcamp、Discogs）、Purrple Cat 目錄十多張（Bandcamp）皆有出處。Blossoms 兩人名分開寫（SwuM.、jinsang），照卡單掛名各自字形，可。

## 上線與評分（2026-10-23，主線）（條號 19394–19396）
- **19394**：上線 26 張：card_catalog 26／26、KV 26 鍵回讀逐字一致、試聽 25 ready／1 unavailable（Ohbliv《Raw Spirit Jewels》Apple 未上架）、seed +26、published gate 0 error。封面 CAA 25、Apple 1（SwuM. & Jinsang《Blossoms》CAA /front 與 front-500 皆 500，改 Apple 1466422612 官方圖，目視相符）；live-check 全 200；SwuM.《Swimming》CAA 圖上的「スモーク」字樣經 Apple 官方圖比對確為本盤封面。上線前對 origin 前 60 個 `claude/*` 分支 seed＋卡單再去重 0 撞。
- **19395**：子曲風 warm-batch 25／26 有標籤；類型樹與抽卡封面重建。
- **19396**：**落格率 26/26＝100%**（`batch-progress/mood-axes/score-ml42/`，照 10-23 體感標準）。評分 x 1.7–2.6、y 0.9–1.5、z 0.5–1.4；conf mid 9、low 17。最貼邊：sleepy fish《Beneath Your Waves》z 0.5、less.people《One Day It's Over》z 0.6、Ohbliv《Rugged Tranquility》x 2.6。**研究稿全 thin 也照樣落格**——lo-fi／jazzhop 暖盤的關鍵是主線先汰掉有反證的（trap 化、乾淨輕盈、哀傷、EP 長度、身分不清），不是靠研究證實。

## 本批新藝人（無介紹，未切；並行時子工作階段不切）
Kupla、sleepy fish、SwuM.、SwuM. & Jinsang（合掛名）、Wun Two（卡池另有小寫 `wun two` 掛名一張，需別名鍵）、Ohbliv、mt. fujitive、Purrple Cat、Hoogway、less.people（10 個掛名；jinsang 已在排隊）。
