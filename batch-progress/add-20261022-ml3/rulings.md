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

## 研究 a 組
- **14161**　Knxwledge《1988》：**moodGuess 存疑（x）**。Exclaim! 稱打擊推進、開頭兩首為舞動取向，維基有 funk 貝斯與銳利 snare，非『鬆垮』；暖有 Q 雜誌與〈Learn〉lo-fi 描述支撐；『磁帶糊』查無來源。MB、Stones Throw STH 2409、2020-03-27 對得上。
- **14162**　Knxwledge《Kauliflowr》：身分對（All City、2013-10-14，XLR8R 與 Bandcamp 一致）。聲音有 XLR8R『扭曲取樣、鈍鼓』與 Turntable Lab『爵士 funk loop、MPC、重擊』；磁帶飽和／慵懶無來源，**moodGuess 輕度存疑**。
- **14163**　Knxwledge《Hud.Dreems.PRT.1.5》：thin。2013-03-08 Bandcamp 自發（非 Stones Throw、卡單 label 空）；推翻 curatorWhy『同期續篇』（Stones Throw《Hud Dreems》是 2015 年）。聲音只有聽眾留言，**moodGuess 無法驗證**。
- **14164**　MIKE《“Disco!”》：**moodGuess 強烈存疑（x、y）**。Flood 稱偏 house／bossa nova、比早期作品明亮有空氣感、鼓繁雜、joyful／summery；與『鼓稀、低語』不符。全張 MIKE 以 dj blackpower 製作；暖成立。建議主線以實際評分決定去留。
- **14165**　Navy Blue《Song of Sage: Post Panic!》：thin。2020-12-22、18 首約 53 分鐘；『drumless』僅 MB 社群標籤，風格描述來自 2026 年對整體作品的樂評；製作人名單查不到。
- **14166**　Navy Blue《Navy's Reprise》：**moodGuess 存疑（x 1.9 偏樂觀）**。樂評稱十位製作人混編、有 punchier／heavier 曲（〈Code of Honor〉〈Timberwolves〉）、groovy；MB 標籤含 boom bap。發行方 Discogs 為 Not On Label，facts 寫自行發行。
- **14167**　Navy Blue《Ways of Knowing》：**推翻 curatorWhy**——整張由 Budgie 製作（維基、樂評一致），不是 Madlib／Alchemist。樂評稱 drumless、暖、舒適，另有評論認無鼓程度較低，標為部分無鼓。
- **14168**　WebSearch 本組用 4 次（Navy's Reprise、Knxwledge 1988、Dudley A Lil' Light、Kauliflowr；MIKE 為與 b 組合計的第 5 次，共 5 次），Pitchfork 被擋、AllMusic 403、Bandcamp 的 curl 被擋，改以 WebFetch 讀 Bandcamp／維基／樂評。
- **14169**　年份與廠牌：a 組 7 張皆與卡單一致，無推翻。facts 條數 1988=10、Kauliflowr／Hud／Song of Sage=7、Disco=9、Reprise／Ways=8；thin 3 張因聲音來源薄。

## 研究 b 組
- **14171**　Navy Blue《Memoirs in Armour》：thin。2024-08-02、10 首約 25 分鐘，Def Jam 解約後兩個月內錄成，三部曲第一部；聲音僅 MB 標籤與整體樂評，無逐張描述；製作人未查到。
- **14172**　Onra《Chinoiseries, Part 2》：身分對（All City、2011-11-15、32 首）。ABCDR du Son：灰塵短 loop、Dilla 式鼓編程、電影對白穿插；未講快慢，『懶拍』屬推估。卡單『再赴越南』維基未證實，改寫成取樣來源（中國、泰國、越南）。
- **14173**　Onra《Chinoiseries Pt. 3》：Bandcamp 明文『黑膠嘶聲劈啪貫穿』，成立 dusty；但 Onra 自述刻意追求多變節奏型（hip-hop 各年代、bossa、印度、迷幻搖滾），**moodGuess 輕度存疑（x）**。
- **14174**　L'Orange《The Orchid Days》：**年份核對**——Bandcamp、MB、Discogs 皆 2014，未見 2012 自發版證據（2012 年的是《The Mad Writer》），維持 2014。**推翻 curatorWhy『器樂專輯』**：六位客席人聲（Homeboy Sandman、Blu、Jeremiah Jae、billy woods 等），且『1930–50 年代』無逐張來源。
- **14175**　Dudley Perkins《A Lil' Light》：Madlib 全程製作，2003-07-15 STH 2067；Exclaim『泛舊鼓 loop、慢貝斯線、臥室 DIY 靈魂』，Discogs 使用者 BPM 約 87–103（已註明非官方）；Miami New Times／A.V. Club 為搜尋摘要來源。moodGuess 大致成立。
- **14176**　Dudley Perkins《Expressions (2012 A.U.)》：thin。製作／錄音／人員齊全（Def Con IV 2005、STH 2136），但無可開啟樂評，聲音事實全缺；卡單『靈性與迷幻取樣』無來源，**moodGuess 無法驗證**。序數不寫（中間還有《Conversations with Dudley》）。
- **14177**　Illa J《Yancey Boys》：身分對（Delicious Vinyl DV 9045、2008，CD 11/4／黑膠 10/31）。製作背景完整（Dilla 1995–98 未用 beat、Mike Floss 轉交），但聲音（搖晃鼓、厚電鋼、低頻）無任何來源，**moodGuess 無法驗證**，x 2.6 邊距薄。
- **14178**　b 組 facts 條數：Memoirs／Ch2／Ch3／Expressions 以外多為 7–9 條，Expressions 僅 6 條（聲音來源缺）；全部 https、無簡體、無千分位逗號；`node qa-batch.mjs research add-20261022-ml3` 通過。

## 主線裁定（研究層交件後；條號 14231–14233）
- **14231**　研究層聲音存疑汰 5 張（不補位，場景候補已用盡）：MIKE《"Disco!"》（樂評稱偏 house／bossa、明亮有空氣、鼓繁雜，判輕判躁）、fLako《Natureboy》（電子／footwork 感，非慢鬆拍）、Knxwledge《Ovrstnd.LP》（Bandcamp 標 jungle／drum & bass）、tomppabeats《Habits》（Discogs 列 10 吋 EP、23 分鐘）、Pink Siifu《GUMBO'!》（聲音無來源、x 貼邊）。卡單、pick.json、研究稿同步刪除；被汰卡留存 `dropped-cards.json`。**本批上線 27 張。**
- **14232**　廠牌更正：Maxo《LIL BIG MAN》→ Def Jam Recordings（研究 c 組）。研究層其餘推翻（Navy Blue《Ways of Knowing》製作是 Budgie、L'Orange《The Orchid Days》有客席人聲非器樂、Hud.Dreems.PRT.1.5 是 2013 自發、FlySiifu's 製作人十餘位、Onra & Quetzal《Tribute》非 Dilla 致敬、Beat Konducta Vol. 6 的「Withers」只是題名）一律以研究稿為準，鉤子／寫作層不得沿用 curatorWhy。
- **14233**　「磁帶糊」全批查無來源，正文不得寫；聲音描述只用研究稿有來源的條目。

## 鉤子層（d、e）（14216–14220）
- **14216**　交件：`desc-tools/batches/hooks/add-20261022-ml3-hooks-d.json`（5）、`-hooks-e.json`（3）；張數照研究稿（主線 14231 汰 Ovrstnd.LP、Habits、GUMBO'! 後 d 5、e 3）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。thin（d 全組）上限 170、e 組（full／partial）上限 230。逐筆：d1 Ta-ku Vol. 1＝161（hook 加權 22／原始 30）、d2 Arcade＝157（21／21）、d3 Klouds＝159（22／27）、d4 Tribute＝165（24／28）、d5 Ta-ku Vol. 2＝160（24／24）、e1 Olesi＝221（25／25）、e2 Liv.e＝226（20／22）、e3 Own Pace＝225（21／21）。初稿 8 張全超標，整格捨去：Ta-ku Day 23 長度、Vinyl Digital 廠牌名、Klouds 售完、Blanka、Vol. 2 塑膠外套、Muldrow 爵士吉他（留在 hook）與〈New Orleans〉、Liv.e 自己混音、Medhane〈Affirmation〉與人聲剪裁；壓完回核 hook 依賴，全部在 hook 本身或 g1／g2。
- **14217**　骨架歸屬（8 張 8 條，只本組視角；與 a–c 撞骨架由主線裁）：Ta-ku Vol. 1＝編號代替曲名的致敬計畫；Ta-ku Vol. 2＝黑膠包裝（仿日本盤腰帶的封面卡）；Arcade＝北歐拍子手寫東京地名＋限量彩膠附贈品；Klouds＝海外小廠牌替新人出首作（All City 面向寫首作與卡帶特別版，Kauliflowr 的 All City 面向留給 a 組）；Tribute＝雙人合作、短曲插曲撐滿一張 CD；Olesi＝樂手家庭出身、一手包辦製作；Liv.e＝母親家臥室一個月錄成；Own Pace＝二人組成員的個人首張長盤（Medhane「關在房間一個月」研究稿有，與 Liv.e 同形，整格捨去）。hook 四型：人物定調（Ta-ku Vol. 1、Olesi）／場景（Vol. 2、Tribute、Liv.e）／斷言（Arcade、Klouds、Own Pace）。開頭前四字 8 張互異。
- **14218**　「他／她」與第二句配表：Ta-ku 兩張分軸——Vol. 1 帶身世（第二句「他來自西澳，有菲律賓與毛利血統」，hook 已帶「珀斯製作人」）、Vol. 2 只帶結構與包裝（第二句「這是澳洲製作人 Ta-ku 致敬 J Dilla 的五十首計畫後半」）。Knxwledge（跨 a 組三張）本張第二句用「新澤西出身的 Glen Boothe」，**刻意不寫 1988 年生**（避開 a 組《1988》）。Onra（跨 b 組兩張）本張只寫「法國拍子手 Onra 與 Quetzal」，不帶本名、不帶 Chinoiseries 取樣故事（歸 b 組）。第二句句型：d1 由「他來自」、d2 由「本名」領句＋交代、d3 由「新澤西出身的」領句、d4 寫「…兩人的合作首作」、d5 寫「這是…後半」、e1 由名字與出生地、e2 寫「她本名…唱 neo-soul」、e3 由「Medhane 是…」。「日」後一字：起／自／（Klouds 無日期）／經／在／交／由／透，8 張互異。
- **14219**　事實與限制：Ta-ku 兩張照研究層不寫「每天一首」，只寫 Day 編號；Tribute 不連 Dilla、照 Discogs CD 34 首；Own Pace 不寫「MIKE 製作」，只寫〈Looking 4 Runtz〉客串；Liv.e 錄音地寫聖路易、達拉斯只當出生地；Olesi 只寫「混濁」不寫 dusty／磁帶糊（14233）。媒體名、榜單名次、Discogs 星等與想要數一律未進 note；樂評描述以「鼓點拖拍又結巴」「康加鼓取樣像 Al Green 最隨性的時候」這類內容句帶，不具名。thin 五張聲音只給曲風層級（器樂拍子／爵士靈魂成分），不給鼓感與低頻。
- **14220**　自查：hook 之間中文 4-gram 0 條；hook 與自身 note 逐字重複 0（Olesi「爵士吉他」、Own Pace「三十分鐘」已從 note 移除）；note 之間除指派句樣板外 0 條。`node qa-batch.mjs hooks add-20261022-ml3`：d、e 0 標記（a、b、c 缺檔，另一位代理未交）；`node chk-hook-crossgroup.mjs add-20261022-ml3`：2 組 8 張全部通過（hook 加權 20–25、note 156–230）。未掃上架舊卡 out 檔（batches/output 無這幾位藝人的專輯卡）。

## 鉤子層（a、b、c）（14211–14215）
- **14211**　交件：`desc-tools/batches/hooks/add-20261022-ml3-hooks-a.json`（6）、`-b.json`（7）、`-c.json`（6），key 與順序逐字照研究稿（14231 汰卡後）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`，「第二句以…領句」全部計入；full 上限 230、thin 170。逐筆（hook 原始字元／加權／預算）：a1 1988 22/19.5/228、a2 Kauliflowr 17/15/210、a3 Hud.Dreems.PRT.1.5（thin）21/19/141、a4 Song of Sage（thin）28/20.5/169、a5 Navy's Reprise 26/18/230、a6 Ways of Knowing 20/16/227；b1 Memoirs（thin）24/20/150、b2 Chinoiseries Pt. 2 14/14/229、b3 Chinoiseries Pt. 3 17/17/196、b4 Orchid Days 20/20/227、b5 A Lil' Light 24/20.5/229、b6 Expressions（thin）28/20.5/156、b7 Yancey Boys 23/20.5/229；c1 LIL BIG MAN 24/19.5/229、c2 ensley 16/16/216、c3 FlySiifu’s 19/19/228、c4 BK Vol. 5 21/21/224、c5 BK Vol. 6（thin）19/17.5/167、c6 Gin Diaries（thin）16/16/159。初稿 19 張全超標（英文專名密），一律整格捨去：1988 的現住日本／曲長／Mellotron 具名、Reprise 的 MIKE 與 89 秒、Ways 的 J Rocc、Ch2 的法國父母、Yancey Boys 的客席與器樂版、LIL BIG MAN 的夢幻鍵盤、BK5 最長曲長與「破碎的記憶」、BK6 曲數、FlySiifu’s 的短劇獨立成軌與「人聲貼進製作」、Expressions 的 SomeOthaShip、L’Orange 聽力損傷（時序不明，未用）、FlySiifu’s 的 Ras G 獻詞。壓完回核：hook 依賴格全在 g1／g2（FlySiifu’s 的「虛構唱片行」一度被砍、已補回 g2；Maxo〈Quiktoldme〉、Suff Daddy〈Konnopke〉、Ch2 電影對白、Ch3 嘶聲皆前移到 g2）。
- **14212**　骨架（19 張 19 條，每張只寫自己的歸屬句）：1988＝非音樂素材取樣（牧師講話、電台訪談）＋家中器材；Kauliflowr＝網路多產 beat 手＋省母音曲名；Hud.Dreems＝創用 CC 授權的網路小集（正式系列前身）；Song of Sage＝職業滑手轉饒舌＋自創廠牌；Reprise＝十位製作人拼盤；Ways＝單一製作人包辦＋大廠授權掛名；Memoirs＝大廠解約後兩個月錄成＋三部曲首部；Ch2＝電影分場式（曲間對白）＋越南之行起源；Ch3＝三部曲完結＋刻意多變節奏型；Orchid Days＝製作人領銜＋六位人聲；A Lil' Light＝最早一首早五年（跨地錄音）＋走音唱法；Expressions＝唯一客席是日後伴侶（標時序）；Yancey Boys＝亡兄未用 beat 由弟弟補嗓；LIL BIG MAN＝大廠出道作＋向同城前輩致意；ensley＝盤名取自祖母住地；FlySiifu’s＝虛構唱片行概念＋短劇；BK5＝雙名曲名＋原樣取樣；BK6＝黑膠曲名印錯＋拿亡友收藏取樣（合併 CD 逢三週年）；Gin Diaries＝「beat 小說」＋曲名藏城市。與 d–e 對照：Dilla 致敬的「編號五十首」歸 Ta-ku，BK5／BK6／Yancey Boys 各走雙名曲名、唱片收藏、兄弟；All City「首張、都柏林」歸 Klouds，Kauliflowr／Ch2／Ch3 不寫都柏林；臥室／房間錄音歸 Liv.e、Medhane，1988 只寫「在家」一格器材。hook 四型：懸疑（Hud、Memoirs、BK6、Expressions）／斷言（1988、Reprise、Ways、Ch3、ensley、BK5、Gin Diaries）／場景（Ch2、Yancey Boys、LIL BIG MAN、FlySiifu’s、A Lil' Light）／人物定調（Kauliflowr、Song of Sage、Orchid Days）。
- **14213**　同藝人分軸與「他／她」引入法：Knxwledge 三張（d 組 Klouds 已用「新澤西出身的 Glen Boothe」）——1988「1988 年出生、盤名就是生年」（年齡）、Kauliflowr「2009 年起在 Bandcamp 丟出兩百多張」（發表量）、Hud「beat 製作人 Knxwledge＋上傳日期」（身分＋日期）。Navy Blue 四張——Song of Sage 本名 Sage Elsesser＋短片《Cherry》（滑手生平只在此張）、Reprise 替 Earl Sweatshirt 製作的資歷、Ways 掛名 Freedom Sounds＋Def Jam 授權（解約不寫）、Memoirs 簽約／解約時間線。Onra 兩張（d 組 Tribute 用「法國拍子手」）——Ch2 本名＋1981 生於 Trier、Ch3 器物 MPC1000。Dudley Perkins 兩張——A Lil' Light 舊名 Declaime、Expressions 以 Oxnard＋1987 入行（客席 Muldrow 在 hook）。Pink Siifu 兩張——ensley 本名＋兩城成長、FlySiifu’s 兩人名字與城市。Madlib 兩張——BK5 系列來歷、BK6 Dilla 的唱片收藏。其餘：L’Orange 本名 Austin Hart、Illa J 親屬、Maxo Def Jam 出道作、Suff Daddy 杜塞道夫／柏林兩城。第二句句型 19 張互異，並避開 d–e 已用（菲律賓毛利血統、Tomi Lahtinen、Glen Boothe、Onra 與 Quetzal 合作首作、Ta-ku 五十首後半、Muldrow 名字出生地、Hailee Olivia Williams、Medhane 布魯克林）。逝者（J Dilla、Ras G）note 標「口吻克制」，Ras G 一格已捨。
- **14214**　日期「日」後一字（尺 `/[年月]\s*\d{1,2}\s*日(.)/`）：1988 日於、Kauliflowr 日登、Hud 日親、Song of Sage 日以、Reprise 日推、Ways 日掛、Memoirs 日面、Ch2 日發、Ch3 日問、Orchid 日釋、A Lil' Light 日出、Yancey 日上、LIL BIG MAN 日正、ensley 日放、FlySiifu’s 日公、BK6 日，；Expressions、BK5、Gin Diaries 只到月。d–e 已用起／自／經／在／交／由／透，a–c 原擬由、在、自、經、交、透六處已改。媒體名、媒體榜名次、分數一律未進 note（ensley 的年度榜、Memoirs 的雜誌報導、各家樂評名皆捨，聲音描述只寫內容）；14233「磁帶糊」0 處；研究稿 moodGuess 存疑／未取得格整格不用（Suff Daddy 鼓感與 Rhodes 外推、BK6 色溫、Expressions 聲音、A Lil' Light 搜尋摘要來源的「濾過弦樂」）；14232 推翻項全照研究稿（Ways＝Budgie、Orchid 有人聲、Hud 2013 自發、FlySiifu’s 十餘位製作、BK6 不寫 Withers）。
- **14215**　自查：本組 19 張 hook 之間漢字 4-gram 0 條，對 d–e 8 張 hook 亦 0；開頭前四字 27 張互異；hook 對本組他張 note 4-gram 0（L’Orange 原稿「的製作人」撞 1988／Kauliflowr，hook 改「這位北卡羅來納製作人」）；hook 與自己 note 無 8 字以上逐字重複（Gin Diaries 的咖哩香腸只留在 hook，note 寫「那首叫〈Konnopke〉」）。`node qa-batch.mjs hooks add-20261022-ml3`：全部通過；`node chk-hook-crossgroup.mjs add-20261022-ml3`（5 組 27 張）：全部通過，只報不擋的否定句（ensley「沒有廠牌」）已改正面「自行發行」。

## 寫作層（writer-2）（14226–14230）
- **14226**　交件：`desc-tools/batches/output/add-20261022-ml3-out-2.json` 13 張，key 逐字同序。full／partial 6 張 221–237（ensley 221、FlySiifu’s 237、BK5 234、Olesi 221、Liv.e 227、Own Pace 224，partial 照 full 帶）；thin 7 張 155–170（BK6 159、Gin Diaries 163、Ta-ku Vol. 1 155、Arcade 169、Klouds 170、Tribute 166、Ta-ku Vol. 2 165）。初稿零超標、零掉下限，未整格捨去。`qa-batch out`（兩檔合計 27 張）、`qa-check-research`、`fix-spacing` 皆 0 標記；轉述引導詞／否定句／媒體名／榜單／「磁帶糊」grep 0。
- **14227**　第二句領句全照鉤子層 note 指派（14213、14218）；「日」後一字全照 14214／14218：ensley 放、FlySiifu’s 公、BK6 「，」、Ta-ku Vol. 1 起、Arcade 自、Tribute 經、Ta-ku Vol. 2 在、Olesi 交、Liv.e 由、Own Pace 透；BK5、Gin Diaries、Klouds 只到月或年。日期前一字 10 張互異。
- **14228**　跨兩檔合掃（han() 4-gram，對 out-1 交件中版本）：拆掉 `首約分鐘`（本組 Gin／Arcade／Klouds 三張全改句式，out-1 另有四張同形，請主線收件時再看一次 out-1 那一側）、`長約分鐘`、`人聲取樣`、`手年月日`、`年月由發`、`年月日正`、`製作人致`、`過年月日`、`是製作人`、`製作人的`、`分鐘上下`、`於洛杉磯`。定稿 3 張以上 0 條；2 張只剩 `阿拉巴馬`（地名）、`薩克斯風`（樂器）、`饒舌歌手`（Own Pace 照 note 指派的領句，對 out-1 LIL BIG MAN）。
- **14229**　事實限制照辦：Olesi 只寫「混濁」（14233）；Own Pace 只寫 MIKE 客串〈Looking 4 Runtz〉；Ta-ku 兩張只寫 Day 編號、Vol. 1 聲音只到「帶爵士與靈魂成分的器樂拍子」；Tribute 不連 Dilla；BK6 不寫 Withers；Arcade 寫「捲菸紙」照 note、德國廠牌不具名；Liv.e 錄音期「一個月」已在 hook，正文不再複述（原稿「錄了約一個月」刪去）；FlySiifu’s 評價分歧、媒體分數與 Ras G 獻詞未寫（不在 note）。J Dilla 逝世以「已故的」「留下的」「逝世三週年」平實帶過。
- **14230**　小判斷（可逆）：Olesi 第二句改成「是洛杉磯人，1983 年出生」以避開 out-1 的「生於洛杉磯」；Tribute 第二次出現的「法國」（Bo Bun Records 前）刪去避免同句重複；Ta-ku Vol. 2 第二句把 note 的「致敬 J Dilla」改成「向 J Dilla 致敬」以拆 `製作人致`。

## 寫作層（writer-1）（14221–14225）
- **14221**　交件：`desc-tools/batches/output/add-20261022-ml3-out-1.json` 14 張，key 逐字同序。full 10 張 201–238（1988 223、Kauliflowr 211、Reprise 235、Ways 222、Ch2 238、Ch3 201、Orchid 220、A Lil' Light 231、Yancey 222、LIL BIG MAN 238）；thin 4 張 129–158（Hud 129、Song of Sage 158、Memoirs 143、Expressions 132）。初稿 0 張出界；合掃改寫後 Maxo 一度 242，整格把主詞「Maxo 的饒舌」換成「他的唱腔」壓回 238。`qa-batch out`（兩檔 27 張）全部通過、`qa-check-research` 標記 0、`fix-spacing` 0 處；「據」「也就是」「磁帶糊」「這張專輯」grep 0。
- **14222**　第二句全照 note 指派（生年盤名／Bandcamp 發表量／上傳日期／本名與《Cherry》／替 Earl Sweatshirt 製作／掛名與授權／簽約解約時間線／生年出生地／那台 MPC1000／本名與取樣來源／舊名 Declaime／Oxnard 與入行年／親屬／Def Jam 出道作）。「日」後一字照 14214，兩處因合掃改：Ways「日掛」→「日開賣」（避 `手年月日`×3，掛名改到前句「掛在自家 Freedom Sounds 名下」）、LIL BIG MAN「日正」→「日亮相」（撞 out-2 BK6 的 `年月日正`）。
- **14223**　合掃（han() 4-gram，對 out-2 交件版）：拆掉 `首約分鐘`×10（本組 10 張各換一種曲數／片長寫法：收／共約／歌長／軌總長／合計／跑了／收錄／計／共／長度）、`洛杉磯饒舌手`×5（Navy Blue 四張與 Maxo 各用不同鋪法：以饒舌為業住洛杉磯／在洛杉磯饒舌／出身洛杉磯的饒舌手／洛城的…是饒舌手／從洛杉磯出身唱饒舌）、`人聲取樣`×3、`長約分鐘`、`張由製作`、`月由發行`、`作年月日`、`過年月日`、`分鐘左右`、`洛杉磯人`、`在洛杉磯`、`的製作人`、`他的饒舌`。定稿 2 張以上只剩樂器名「薩克斯風」與 out-2 內部的「阿拉巴馬」（地名）。
- **14224**　事實限制：媒體名與媒體評語出處 0（1988 的 Exclaim!／Q／Pitchfork 只取「打擊推進、讓人想跳舞」「暖而 lo-fi」內容句）；L’Orange「廠牌說他用暗色調工作」改寫成陳述句「他習慣用暗色調工作，這張卻是他最坦露的一張」，不掛轉述詞；Maxo 的 buttery 用被動「被形容為」；Illa J 一條逝者照 note 克制，只寫「Dilla 過世後」；Expressions 的伴侶關係時序由 hook「後來」承擔，正文只具名 Muldrow。14232 推翻項照辦（Ways＝Budgie、Orchid 有六位人聲、Hud 為 2013 自發）。
- **14225**　小判斷（可逆）：Kauliflowr 初稿「整張沒有人聲」為否定句，改「整張全是器樂」；Ch3 hook 已有「嘶嘶作響」，正文改寫成「嘶聲之外還有劈啪聲」避免複述；Song of Sage 第二句為避開 hook 的「職業滑手」，寫「在滑板圈轉為職業」；Memoirs 用「洛城」替代「洛杉磯」以拆同構（台灣慣用簡稱）。

## 主線審稿（2026-10-22；條號 14234–14237）
- **14234**　逐張審 27 張，逐句對回研究稿。改 3 張（皆為刪句，不動事實，研究／鉤子／輸入三層不需同步）：
  - `desc2:L’Orange|The Orchid Days`：「他習慣用暗色調工作，這張卻是他最坦露的一張，主題是愛。」→「整張的主題是愛。」（研究稿出處是 Bandcamp 廠牌宣傳文，寫作層把宣傳評語改成陳述句；只留主題事實）。
  - `desc2:Maxo|LIL BIG MAN`：「他的唱腔流動被形容為 buttery。」→ 刪（單一樂評〔KZSC〕評語句、且為英文形容詞）。
  - `desc2:Medhane|Own Pace`：「其中一段康加鼓取樣，像 Al Green 最隨性的時候。」→ 刪（單一樂評〔The Quietus〕比喻句）。
- **14235**　核對後保留：Knxwledge 1988 年生（英文維基）、Onra 1981 年生於德國 Trier（英文維基，父母法國人）、Navy Blue 替 Earl Sweatshirt 製作（英文維基）、Liv.e 1998 年生於達拉斯（英文維基）、Dudley Perkins「常唱走音」（Exclaim! 與 The A.V. Club 兩源一致，屬聲音事實）。
- **14236**　其餘 24 張逐張審過，未改字。
- **14237**　試聽：22 ready／5 unavailable（Hud.Dreems.PRT.1.5、FlySiifu's、Beat Konducta Vol. 5／6、Onra & Quetzal《Tribute》：Apple us 藝人目錄查無對得上的條目，Tribute 只有《Tribute II》EP，不硬配）；其中 11 張 meta 自動搜尋落空，改走 Apple `entity=musicArtist` → `lookup` 逐盤核對曲目（`preview-override.json`）。封面 27 張全 CAA，縮圖表目視相符。冷門軸 6 張人工（Last.fm 盤名彎引號／分卷寫法對不上致 listeners 失真，§0.8 錨點制給 3；`ratings-override.json`）。

## 上線與落格（2026-10-22；條號 14238–14240）
- **14238**　上線 27 張：card_catalog 27/27、KV 27 鍵逐字回讀一致、seed +27、published gate 0 error。子曲風預熱 26 tagged／1 empty；`genre-l3-artist-map.json` 以「藝人|專輯」補 5 張（Ta-ku ×2、tomppabeats、Onra & Quetzal → hiphop/underground/instrumental；L’Orange → hiphop/underground/jazz-rap）。
- **14239**　**落恍惚 26/27＝96.3%**（`batch-progress/mood-axes/score-ml3/`，評分 conf mid 13／low 14）。唯一出格 Medhane《Own Pace》z −0.1 落頹靡（混濁 lo-fi、喃喃低吟偏灰暗；策展 z 0.5 已是本批最貼邊）。主線審評分未覆寫（評分與 moodGuess 三軸差皆 ≤0.6，方向一致）。給下一輪：dusty 靈魂取樣的 beat tape 幾乎全落恍惚，最大風險是 MIKE 圈「灰暗內省」那一路的色溫；乾淨 jazzy chillhop 仍判輕不要提。
- **14240**　場景挖不到 45：策展兩輪 36 → 主線汰 4 → 研究汰 5 → 27。

## 本批新藝人（無介紹，交調度工作階段統一切批）
L’Orange、Dudley Perkins、Illa J、Maxo、Pink Siifu & Fly Anakin、Suff Daddy、Ta-ku、Onra & Quetzal、Liv.e、Medhane
