# add-20261022-mc6 裁定（情緒薄格策展線・冷冽：Detroit techno／electro 二線＋electroclash）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 2 輪起收窄到大場景、3 個工作階段並行（本工作階段 ml5／mc6）。場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<+0.5）＋冷（z<0）**；策展邊距 x ≥ 3.3（實測建議 3.6）、y ≤ +0.2、z ≤ −0.3。主場景 mc6 Detroit techno／electro 二線，可擴寫 mc12 electroclash、mc29 electro-funk 機械那半。
> 策展：`curation-mc6.json`（54 張：主場景 50、mc12 4、mc29 0；drexciya-sys 8、detroit-electro 8、detroit-techno 6、euro-electro 28、electroclash 4）→ `master-mc6.json`（MB 回查 54/54 釘住、人工 0、flags 0）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-mc6-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 11401–11410、b 11411–11420、c 11421–11430、d 11431–11440、e 11441–11450、鉤子 11451–11460、寫作 11461–11470、主線 11471–11480。**
---

## 主線策展（不佔條號）
- moodGuess x 3.6–4.1、y 0.0–0.3、z −1.6～−0.9；52 張過邊距。mc29 electro-funk 0 張：池中 Mantronix、Newcleus、World Class Wreckin' Cru、Egyptian Lover 都判暖落雀躍，策展層不提（照實）。Detroit 本地二線正規專輯少（多為 EP），歐陸承 Drexciya 路線的 electro（Rother、Silicon Scally、Boris Divider、Lowfish、dynArec、Cygnus、Gosub）補到 28 張——判為主場景的延伸，收。
- **主線汰 9 張湊 45**：y 估 0.3 出邊距 2（The Hacker《Rêves mécaniques》、ADULT.《Anxiety Always》）；x 估 3.6 且中速曲多 3（The Exaltics《Das Heise Experiment》《II Worlds》、Crossover《Fantasmo》）；Terrence Dixon 4 張只留 x 估 3.7 的 2 張（汰《12,000 Miles Of Twilight LP》《Reporting From Detroit》，池中《From the Far Future》x 3.6 貼線）；Japanese Telecom 同名首張（單張 12 吋 8 曲，迷你專輯疑慮）；Anthony Rother 8 張汰《My Name Is Beuys von Telekraft》（附混音 CD）。
- 跨工作階段去重：對 origin 所有 `claude/mood*` 分支 seed 去重 0。
- 研究層要特別寫聲音事實：速度（BPM 是否夠快）、低頻與失真（厚的會判重落亢奮）、人聲比重與色溫。邊緣張：Ectomorph《Stalker》（偏陰暗，y 風險）、Der Zyklus、Arpanet 2（x 3.6）、Exos 2（minimal techno）、Rother《Popkiller》（人聲多）、The Hacker《Mélodies en Sous-Sol》。Cygnus《Vox Alia》證據最薄（MB＋Bandcamp＋CAA）。

## 研究 a 組
- 11401：Lab Rat XL《Mice or Cyborg》推翻策展層「James Stinson 生前最後化名專輯」：Discogs 發行說明寫 Drexciya「第七場也是最後一場風暴 R.I.P. James Stinson」，2003-10-27 發行晚於 Stinson 2002-09-03 過世，是身後發行。
- 11402：Der Zyklus《Biometry》推翻「唯一專輯」：Bandcamp 另列 Truth Matrix 等作品、Discogs 成員名單多人，facts 不寫「唯一」。署名 Heinrich Mueller（Gerald Donald 化名之一）。
- 11403：序數宣稱（Japanese Telecom 第二張、Arpanet 第三張、AUX 88 第三張）查無來源或與 Wikipedia 作品列衝突，facts 一律不採序數。
- 11404：Elecktroids 成員身分：Discogs 稱陣容不明、Warp 2008 文案點名 Stinson；facts 寫成不確定版本，不寫「Drexciya 成員化名」為定論。
- 11405：moodGuess 存疑清單（主線請決定汰換）。強：Arpanet《Quantum Transposition》（廠牌文字稱更偏氛圍／實驗、Discogs 標 Ambient、前六首不到 3 分半）、Black Tokyo（有日本歌手人聲、Club Mix、RA 稱 bass-heavy）。中至中強：Der Zyklus《Biometry》（Abstract／Ambient 標籤、最長 9:16）、Elecktroids《Elektroworld》（Kraftwerk 致敬式旋律電子，曲長 4–6:40）、AUX 88 同名與《Mad Scientist》（RA 稱 bass-heavy 會判重落亢奮）、Lab Rat XL（5–8 分鐘長曲）。輕：Arpanet《Inertial Frame》（Experimental 標籤）、Japanese Telecom《Virtual Geisha》（無聲音來源，未驗）。
- 11406：整組聲音證據偏薄：此組在 WebSearch 3 次額度內未找到逐張樂評；status 有 6 張標 thin（聲音細節為主因，身分與故事 facts 皆足 9–11 條）。Quantum Transposition 的 Clone 商品文字只從搜尋摘要看到，頁面事後 404，主線可酌情刪該條。

## 研究 e 組
- 11441 e 組九張全部身分核對無誤（MB／Discogs 年份、廠牌、盤名一致）；僅盤名 Frozen & Broken 在 Discogs 寫成 Frozen&Broken（格式差異）。
- 11442 The Hacker《Mélodies en Sous-Sol》廠牌：策展層 Play It Again Sam，Discogs 為 GoodLife（GLCD01）＋[PIAS]；寫作層寫 GoodLife／[PIAS]。年份取 1999（維基內文春季 2000 與其清單 1999 自相矛盾，MB 首發 1999 FR）。
- 11443 dynArec 人物：Discogs 寫法籍、生於史特拉斯堡，策展層寫荷蘭 Hague 系，Hague 說法查無來源，facts 只寫 Discogs 說法並註明未獲第二來源。
- 11444 聲音面證據極薄：九張只有 Lowfish《1000 Corrections》為 full（器材與錄音地有 Discogs 說明）；其餘皆 thin。WebSearch 用 2 次，Delsin 頁 503、Wikipedia 多數人物頁 404。
- 11445 moodGuess 存疑（主線請試聽或汰換）：Optic Nerve 兩張（曲長 5–9 分鐘、Harp／Dream Mix、後期被評溫暖有靈魂，疑落恍惚）；Exos 兩張（父親 Octal 為 dub techno、Thule 圈、MB 標 minimal，疑中速克制，非快打）；The Hacker（曲長 5–8 分鐘、維基稱像 New Order，疑偏旋律）；Lowfish《Frozen & Broken》（曲長偏長、標 IDM）。輕度存疑：Lowfish 首張（synth-pop 標籤）、dynArec 兩張（無聲音來源）。

## 研究 b 組
- 11411：Rother《Art Is a Technology》moodGuess 嚴重存疑，建議汰換：Discogs 唯一風格 Ambient、英文維基列為 ambient 作品、11 段無曲名 Part I–XI，與「乾 electro 節拍」不符，疑落靜格。
- 11412：AUX 88《Counterparts》與 Dynamik Bass System《The Mighty Machine》存疑（暖／厚低頻風險）：前者曲名〈Electro In Key Of Funk〉、自稱 techno-bass、至少一首有清唱版；後者廠牌 Dominance Electricity 自述 electrofunk／bass／technobreaks，曲名偏 funk／hip hop。兩張皆無樂評與 BPM 來源，status thin，請主線試聽把關。
- 11413：Ectomorph《Stalker》存疑：Bandcamp 稱整張一兩次演奏現場錄成、不剪輯，現場演出無鼓機（模組＋Moog），曲長 6–8.5 分鐘；機械脈動與「快」無法證實，y 風險仍在。MB 除合輯外只有 EP，推測首張專輯但無來源明說，不寫成事實。
- 11414：Rother 其餘五張（Sex With the Machines、Hacker、Popkiller、Super Space Model、Netzwerk der Zukunft）：「冷、重複、復古」有 RA 與維基佐證，但「快」皆無 BPM 來源；Popkiller 為 synthpop／neoelectro 混合、人聲份量較重，x／z 有往中間掉的風險。
- 11415：日期矛盾：Sex With the Machines Bandcamp 1997-09-29 vs Discogs／MB 1997-11-01；Netzwerk der Zukunft Discogs 2014-07-01 vs MB 2014-04-29；寫作層只寫年份。Rother 出生地德維基內文（Friedberg）與 infobox（Frankfurt）矛盾，不寫。
- 11416：標籤：卡單 AUX 88《Counterparts》label「Direct Beat」，Discogs 實為 Direct Beat Classics（母廠牌 Direct Beat），未視為推翻。其餘八張年份、廠牌、盤名核對一致，未推翻策展層。
- 11417：WebSearch 用 3 次皆未找到逐張樂評；Discogs 與 MB API、Bandcamp、維基、RA、XLR8R、FAZEmag 為主。XLR8R 錄音室訪談為 Rother 工作方式泛述（年份不明），已在 facts 標明不特指該盤。status：full 3（Stalker、Sex With the Machines、Super Space Model）、thin 6。

## 研究 c 組
- 11421 c 組九張身分核對無誤（MB RG／Discogs 年份、廠牌、目錄號一致）；Rother 出生地 Discogs／de.wikipedia 寫 Friedberg，en.wikipedia 資訊框寫 Frankfurt，facts 取 Friedberg。
- 11422 Ultradyne《Antartica》推翻策展層兩處：「唯一專輯」不成立（Discogs 有 Futurist 2000 等多張後續發行；IGLOO 2017 稱 first and only album，兩說衝突，鉤子勿寫「唯一」）；版本含糊——Pi Gao Movement PGM-001 原版是 12 吋 6 首約 28 分鐘（EP 長度），MP3.com CDr 與 2017 Exterminador 雙黑膠是 12 首。facts 兩版並列，卡上取哪版由主線定。
- 11423 聲音面證據：full 僅 Rother（Bandcamp 完整器材與錄法）、Ultradyne（IGLOO：BPM 超過 150、失真鼓機）、Dixon（Forced Exposure／Gridface／Textura）；Silicon Scally 六張皆 thin（無單張樂評、無 BPM；僅 Discogs 風格標籤、曲長、藝人說明）。WebSearch 用 3 次。Bandcamp 部分頁面被擋（Client Challenge）。
- 11424 moodGuess 存疑（主線請試聽或汰換）：Terrence Dixon《Train of Thought》高度存疑——Forced Exposure 稱含 Cybotron 式電子、精簡 techno、和弦溫暖的 house，Juno Daily／Textura 提爵士質地、顫音琴，曲長 4–6 分鐘，與「快、薄、乾」不符，建議汰換。Ultradyne《Antartica》中度存疑偏重——樂評明講鼓機失真、粗硬，易判重落亢奮（z 冷仍成立）。Silicon Scally《Field Lines》中度存疑——同廠牌前後作被稱 machine-funk，有中速與低沉合成器放克。Silicon Scally《Bioroid》中度存疑（無曲長、無樂評，僅 Electro 標籤）。其餘 Scally 四張與 Rother《3L3C7RO COMMANDO》輕度存疑（BPM 無來源、Rother 聲碼器人聲與憂鬱未來感）。
- 11425 單一來源已在 notes 註明：Finlow 1993 Warp 首張（僅其 Bandcamp 自述）、Yore 首張完整專輯與 Juno「jazz-infused」（搜尋摘要，Forced Exposure 頁面直接擷取為空）、Dixon 與 Juan Atkins 合作 Skynet（僅 Gridface）、Psi49net 1998 創立（僅 Discogs）。

## 研究 d 組
- 11431 d 組九張身分核對無誤（MB RG 與 Discogs 的年份、廠牌、目錄號一致）；Dixon 的 Discogs release 4056081 是 17 軌 MP3 數位版，CD 14 首、雙黑膠 8 首，facts 不寫死曲數。Cygnus 在 Discogs 為 Cygnus (5)，與 Igloo、Dallas Observer 指認的 Phillip Washington 同一人。
- 11432 Lowfish《Eliminator》2012 年 Bandcamp 數位版 10 首（多〈Glued Smile〉），2000 年黑膠 9 首，卡以 2000 年原版為準；Lowfish 所在地 Bandcamp 稱溫哥華、維基稱出身多倫多，facts 只寫加拿大。
- 11433 聲音面證據：full 僅 Dixon（Fact、Textura）、Cygnus《Tesseracter》（Now Then、Igloo）、Boris Divider《Visiones Secuenciales》《Optx》（廠牌頁明講聲音）、Lowfish（內襯器材名單＋藝人自述）；La hora de las máquinas、ExaScale、Vox Alia、Gosub 為 thin（無樂評、無 BPM，Gosub 的 Bandcamp／Discogs 皆被擋）。WebSearch 用 3 次，Gosub 那次無結果。
- 11434 moodGuess 存疑（主線請汰換或試聽）：Boris Divider《Visiones Secuenciales》《Optx》嚴重存疑，建議汰換——廠牌頁寫明 drone、氛圍織體、田野錄音，《Optx》更直接寫「沒有慣常鼓點」，與「快 electro 鼓機」相反。Cygnus《Vox Alia》偏強存疑——標籤 funk、psychedelic、acid，有女聲客串，Bandcamp 並未提聲碼器或 808。Lowfish《Eliminator》偏強存疑——全部來源稱旋律性 IDM、pensive、「極樂與憂鬱之間」。Terrence Dixon《From The Far Future Pt. 2》偏弱存疑——Textura 明說多數曲目並不極簡，Fact 提 Rhodes 暖度與爵士傾向。Boris Divider《ExaScale》偏弱存疑——標籤含 drone、dub techno，曲長多 5 到 7 分鐘。Cygnus《Tesseracter》輕度存疑——「毛茸茸有機」「搖晃溫暖的複音合成器」。La hora de las máquinas 與 Gosub 無來源可驗證。
- 11435 單一來源已在 notes 註明：Cygnus 的達拉斯出身（Dallas Observer 頁面 403，引文來自搜尋摘要）、ExaScale 「正弦波節奏性噪音」（Bandcamp 上單一支持者留言）、Lowfish 的 Muzik／AllMusic 引文（轉引自維基）、Barbara Paniagua 的人聲（僅 Discogs）。

## 主線裁定（研究層交件後）
- **11471**：照研究層的聲音事實汰 9 張（研究稿已從 a–e 檔移除，卡單移到 `dropped-cards.json`）。共同原因：**不快、不機械**——Arpanet《Quantum Transposition》（a：廠牌稱更偏氛圍實驗、Discogs 標 Ambient）、Der Zyklus《Biometry》（a：Abstract／Ambient）、Anthony Rother《Art Is a Technology》（b：Discogs 唯一風格 Ambient、Part I–XI 無曲名）、Terrence Dixon《Train of Thought》《From The Far Future Pt. 2》（c／d：和弦溫暖的 house、爵士質地、Rhodes）、Ultradyne《Antartica》（c：鼓機失真粗硬易判重；原版 PGM-001 12 吋 6 首約 28 分鐘 EP 長度）、Boris Divider《Visiones Secuenciales》（d：drone、氛圍織體、田野錄音）、《Optx》（d：廠牌頁「沒有慣常鼓點」）、《ExaScale》（d：drone／dub techno 標籤）。
- **11472**：留下但標存疑的（評分照聲音打；池中同型 electro 全落冷冽——AUX 88 兩張 4.2／0.2／−1.3、Rother《Simulationszeitalter》3.8／0.2／−1.6、Arpanet《Wireless Internet》3.6／0.3／−1.6、Cybotron、Model 500、Dopplereffekt、Miss Kittin & The Hacker 皆冷冽）：AUX 88《Counterparts》與 Black Tokyo（人聲、bass-heavy）、Dynamik Bass System（electrofunk）、Ectomorph《Stalker》（現場錄、無鼓機段）、Optic Nerve 兩張、Exos 兩張（minimal）、The Hacker、Lowfish（旋律 IDM）、Cygnus《Vox Alia》（funk／acid 標籤）、Rother《Popkiller》（synth-pop 人聲多）。聲音面研究多為 thin（查無逐張樂評與 BPM），存疑多是「無來源」而非被推翻。
- **11473**：卡單更正照研究層：Lab Rat XL 為 Stinson 身後發行（非生前最後專輯）；Der Zyklus 非唯一專輯（已汰）；Japanese Telecom／Arpanet／AUX 88 不寫序數；Elecktroids 成員寫成不確定；The Hacker 廠牌 GoodLife＋[PIAS]；dynArec 寫法籍（Discogs），不寫 Hague 系。
- **11474**：從 master 收回主線先前汰掉的 Japanese Telecom 同名首張（MB／維基列為專輯，8 曲；x 估 3.8）與 Rother《My Name Is Beuys von Telekraft》（主盤為原創專輯，附贈混音 CD 不計）；回頭叫策展代理補 10 張「有來源證實快鼓機、薄、冷」的候補，替入後派補研究 append 進各組檔。
- **11474 補記**：策展代理補 10 張（依 Discogs styles 篩：有 Ambient／IDM／Dub Techno／Berlin-School 標籤的不提；Rother 6、Silicon Scally《Crushed》、Cygnus《Newmark Phase》《Voyager VII》、Mr Velcro Fastener）。主線收 7 張＋收回 2 張＝替入 9、卡單回到 45：Rother 只收《Popkiller II》《Verbalizer》《AI SPACE》（汰 2021 年同年的《DEKATRON》《The CCM Corporation》《Weltmacht Digital》，避免同藝人過度集中——本批 Rother 仍有 10 張，同藝人無上限，判準只看落不落格）。替入卡派一支補研究 append 進各組檔。
