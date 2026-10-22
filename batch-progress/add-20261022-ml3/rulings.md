# add-20261022-ml3 裁定（情緒薄格策展線・恍惚：beats／lo-fi hip-hop／dusty 地下饒舌）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；交接 `batch-progress/HANDOFF-mood-cells-line.md`、場景 `batch-progress/mood-cells-20261022/SCENES.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。
> 策展：`curation-ml3.json`（兩輪共 36 張：beat-tape 19、dusty-rap 17）→ `master-ml3.json`（MB 回查 36/36 釘住、人工 0）→ `pick.json`（32）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml3-cards.json`（32 張；研究 a–d 各 7、e 4）。身分：MB 釘住 32、§1 人工 0。
> **預留：研究 a 14161–14170、b 14171–14180、c 14181–14190、d 14191–14200、e 14201–14210、鉤子 14211–14220、寫作 14221–14230、主線 14231–14240。**
---

## 主線策展（不佔條號）
- **場景挖不到 45 張，照實上 32**（不湊數）：Nujabes、Dilla 全目錄、Madvillainy、Slum Village、Knxwledge《Hud Dreems》、Teebs《Ardour》、Earl、MIKE 多張已在池；乾淨的 jazzy chillhop（Fat Jon、Teebs、Shigeto、Uyama Hiroto、Hydeout 系、Curren$y、Larry June）池中同類評分 y 0.5–0.7，過不了 y 邊距，策展層整類不提；DJ Cam 池中 z −0.4。
- 36 張全過 moodGuess 邊距檢查（x 1.9–2.6、y 1.0–1.3、z 0.5–1.3）。主線再用**池中同藝人既有評分**（`data/mood/card-moods-v0.json`）比對，汰 4 張：
  - Apollo Brown《The Reset》：同人《Clouds》z 0.4、估 z 0.5，色溫貼邊。
  - Medhane《Cold Water》：MIKE 圈池中 z 0–0.6，同人兩張只留較暖的《Own Pace》。
  - Isaiah Rashad《Cilvia Demo》：同人池中兩張 y 0.9／z 0.3–0.6，兩軸都貼邊。
  - MIKE, Wiki & The Alchemist《Faith Is a Rock》：Alchemist 迴圈偏冷偏乾，色溫存疑。
- 留下的邊緣張（研究層要寫聲音事實）：Illa J《Yancey Boys》（x 2.6）、Onra & Quetzal《Tribute》（x 2.6）、Pink Siifu《GUMBO'!》（x 2.5）、Navy Blue《Memoirs in Armour》、Knxwledge《Klouds》、Georgia Anne Muldrow《Olesi》、Medhane《Own Pace》（z 0.5）。
- L'Orange《The Orchid Days》年份照 MB 2014（策展層疑有更早自發版，研究層核）。

## 研究 e 組
- 14201：Muldrow《Olesi》核對 MB／Stones Throw 頁，身分成立；21 首多為兩分鐘片段、曲風跳動，標 moodGuess 存疑（y 持續度）。
- 14202：Liv.e 錄音地實為聖路易母親家臥室（非達拉斯，達拉斯為出身）；20 首起伏大、有突然變速，標 moodGuess 存疑（x 偏高、低頻厚度無來源）。
- 14203：Medhane《Own Pace》推翻策展層「MIKE 等人製作」——MIKE 僅客串〈Looking 4 Runtz〉；自發無廠牌；低頻與 dusty 程度無來源，標 moodGuess 存疑（z 貼邊）。status partial。
- 14204：Pink Siifu《GUMBO’!》聲音事實偏薄（僅知 neo-soul＋trap 元素、製作人雜），標 moodGuess 存疑（x、y 皆無直接來源），建議汰換或以實際評分為準。status thin。
- 14205：WebSearch 3 次用於 Muldrow、Medhane、Liv.e；Pitchfork／AllMusic／AOTY 皆擋，未取得全文。

## 研究 c 組
- **14181**　Maxo《LIL BIG MAN》：推翻策展層兩處。label 實為 Def Jam（Maxo 2015 年已有首張專輯，Def Jam 為廠牌出道）；製作人是 lastnamedavid／Swarvy／Roper Williams／VIK，**無 Madlib**，Pink Siifu 是否客串兩來源不一，只寫 Lojii。聲音：lo-fi 鬆晃鼓、埋在混音裡的靈魂爵士人聲取樣、夢幻鍵盤、薩克斯取樣，暖而霧，約 31 分鐘；低頻厚薄樂評未提。moodGuess 大致可信，『重』缺證據。
- **14182**　Pink Siifu《ensley》：年份取 2018（Bandcamp 數位）；2019 為 PS001 黑膠首壓。聲音來源只有『soulful lo-fi rap、霧狀製作、爵士取樣』與唱腔慢，25 首極短像 beat tape；磁帶糊與低頻無來源。無衝突。
- **14183**　Pink Siifu & Fly Anakin《FlySiifu’s》：**moodGuess 存疑**。curatorWhy『Madlib／Knxwledge 等製作』不實：Knxwledge 無署名，Madlib 只有〈Time Up〉；製作人逾十位；DJBooth 說快速對飆與中速並陳。dusty 取樣只能說部分曲目。MB 盤名為『FlySiifu’s Records & Tapes』（黑膠）。Ras G 是 Discogs 版本備註的獻詞。
- **14184**　Madlib《Beat Konducta Vol. 5》：**moodGuess 存疑**（塵感、重）。21 首最長 2 分 23 秒，樂評只說中速、夢般、取樣不過度處理；兩集多被合評（合輯 CD 2009-02-10），年份仍用 2008。『Cosby』僅為題名，不得寫來源。
- **14185**　Madlib《Beat Konducta Vol. 6》：**moodGuess 存疑**。『Bill Withers 一類溫暖靈魂樂為料』無來源：Rapreviews 說 Vol. 6 偏嘻哈取樣（Dilla、Jaylib），『Withers』只是題名。status 標 thin（無單集樂評）。
- **14186**　Suff Daddy《The Gin Diaries》：**moodGuess 存疑**，status thin。可證實：Berlin Suff Lab、〈Jimmy Jazz〉的 Fender Rhodes、『beat 小說』13 首、2013 Jakarta 重發加一首與客串。鼓感、低頻、dusty 與『Dilla 派』皆無來源；WebSearch 額度用盡、樂評站無法開啟。
- **14187**　fLako《Natureboy》：**moodGuess 存疑（建議降級或汰換）**。Bandcamp 標籤 beats／chant／electronic／spiritual／synthesizer，樂迷稱 deep bass、〈Kuku〉有 footwork 感，Discogs 標 Glitch；非 Dilla 式慢鬆拍。早期拉丁打擊樂背景來自 Discogs 藝人頁。

## 研究 d 組
- **14191**　Ta-ku《50 Days For Dilla Vol. 1》：status thin，聲音無法驗證（無樂評，Bandcamp 頁網址未命中）。『每日一首』未證實，寫作層用『Day 1–Day 50 編號』。Discogs 想要 411／持有 78。
- **14192**　tomppabeats《Arcade》：thin。可證：16 首約 24 分 44 秒、Vinyl Digital 限量 500 黑膠、Discogs 風格含 Downtempo／Acid Jazz／Ambient。磁帶糊與黑膠噪點、低頻無來源。**moodGuess 部分未證實**。
- **14193**　Knxwledge《Ovrstnd.LP》：**moodGuess 存疑（高風險，可汰換）**。curatorWhy『與 Hud Dreems 同期』錯（Hud Dreems 2015，Ovrstnd 2012）；Bandcamp 標籤含 jungle／drum & bass／njklub／house，12 首約 18 分鐘，無『福音切片、磁帶糊』來源。
- **14194**　Knxwledge《Klouds》：**moodGuess 存疑**。年份廠牌對（All City，Discogs 2010-03、MB 2010-04-05），封面 Teebs；風格標籤 Boom Bap／Electro，無 lo-fi 靈魂取樣來源。
- **14195**　Onra & Quetzal《Tribute》：**moodGuess 存疑**。『J Dilla 致敬』無來源（Wikipedia：靈感來自靈魂樂）；MB 35 首／Discogs 34 首；錄於巴黎 LFE Studio，約 61 分鐘。x 2.6 的邊距疑慮屬實，無速度描述。
- **14196**　Ta-ku《50 Days For Dilla Vol. 2》：thin，與 Vol. 1 同形（Day 26–50，約 44 分鐘），聲音無法驗證；注意反同構。
- **14197**　tomppabeats《Habits》：**moodGuess 存疑**。9 首約 23 分鐘，Discogs 為 10 吋 EP（限量 350）、MB 為 Album；標籤 Ambient／IDM／Downtempo，嘻哈鼓感可能比 Arcade 淡；Vinyl Digital 只是黑膠發行商，Bandcamp 原版自發。
- **14198**　整組聲音證據薄的主因：WebSearch 兩組合計 5 次用盡，Pitchfork 等無法開啟，Bandcamp 的 curl 被擋、僅能用 WebFetch。c 組 4 張 full、3 張 thin，d 組 7 張 thin；**聲音事實欄位都誠實標『待查』，主線不要把 moodGuess 當已驗證**。
