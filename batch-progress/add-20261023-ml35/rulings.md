# add-20261023-ml35 裁定（情緒薄格策展線・恍惚：alt-country／Americana 濕而慢＋ml33 福音慢板剩餘）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 7 輪，本工作階段負責 ml41、ml35。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml35 列，可擴寫 ml33），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x≤2.7、y≥0.8、z≥0.3。
> 策展：`curation-ml35.json`（兩輪 33 張）→ `master-ml35.json`（MB 回查 33/33 釘住）→ 主線汰 1 → `pick.json`（32）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml35-cards.json`（32 張；研究 a–d 各 7、e 4）。身分：MB 釘住 32、§1 人工 0。
> **預留：研究 a 16721–16730、b 16731–16740、c 16741–16750、d 16751–16760、e 16761–16770、鉤子 16771–16780、寫作 16781–16790、主線 16791–16800。**
---

## 主線策展（不佔條號）
- 策展第一輪 23 張（主場景 22：濕慢 alt-country 10、殘響牛仔情歌／torch 6、Lanois／Spacebomb 濕製作 6；擴寫 ml33 福音管弦 1）。主場景見底：池中 alt-country 幾乎全判輕（Iron & Wine 七張、Willie 乾盤、Emmylou 70–90s、Lucinda、Bonnie "Prince" Billy、Cat Power、Neko Case、Calexico；《Raising Sand》y 0.5、《Wrecking Ball》z 0.2）。
- **主線裁定放寬地域**（可逆、不動卡池結構）：池中 Richard Hawley《Coles Corner》、Lord Huron《Long Lost》、Lanois《Acadie》都落恍惚，濕殘響 crooner／Americana 鄰近盤不限美國，第二輪補 10（英、加、澳）。池中擋下：War on Drugs（x 3.0–3.2）、Big Thief 六張、Andy Shauf、Fleet Foxes、Father John Misty、Leonard Cohen、Nick Cave《Boatman's Call》判輕；Nick Cave《Let Love In》《Murder Ballads》判冷。
- **主線汰 1**：Great Lake Swimmers《Bodies and Minds》（原聲為主，y 估 0.8 已貼邊，ml24 原聲盤判輕先例）。
- **留給研究層判**：Mahalia Jackson《Let's Pray Together》y 估 0.7（ml31 Mahalia 管弦盤 y 0.5–0.6 落格先例，查伴奏是否真為管弦）；Willie《Teatro》、Lambchop《FLOTUS》同人池中判輕（賭 Lanois／自動調音濕製作翻案）；Chris Isaak 三張的色溫；Hawley《Lady's Bridge》、Kurt Vile《Smoke Ring》y 貼邊。
- 跨分支去重：對 origin 前 40 個 `claude/*` 分支與 main 的 seed 與卡單 0 撞。

## 研究 e 組
- 16761：Ghosteen 首發日 MB 記 2019-10-03、維基與樂評記 10-04（網路版），實體 11-08 由 Bad Seed Ltd 發行；facts 兩說並寫，卡單 label「Ghosteen Ltd」不推翻。製作人為 Cave 與 Warren Ellis，維基未列 Nick Launay。moodGuess 成立，z 為風險：Petridis、Brown 稱暖，Line of Best Fit 仍用「pitch-black」「murk」。
- 16762：Kurt Vile《Smoke Ring》moodGuess 存疑：有「peppy and propulsive」曲目與重鼓（〈Society Is My Friend〉），主體卻是回音原聲指彈；x 可能高過 2.3、y 輕盈傾向。錄音棚與類比／數位說法查無可靠來源，不寫。
- 16763：Timber Timbre《Hot Dreams》moodGuess 大致成立（官方簡介 balmy、velvet、neon and haze；Guardian 標題 smoky）。Kirk 本人打多數鼓，〈Curtains!?〉有明確拍子；Phares 仍用 menace，z 貼邊。Polaris 為短名單入圍、未得獎。
- 16764：The Paper Kites《On the Corner Where You Live》moodGuess 存疑：評論稱 midtempo、有鼓與電吉他推進，x 可能高於 2.2、y 有輕盈傾向；Central Trend 稱暖，z 有利。錄音棚名維基兩說（Tarquin／Joaquin），不引用。合成器是否使用查無來源，不寫。
- 以上皆無推翻年份、廠牌、盤名；無選輯／重複卡。

## 研究 b 組
- 16731：Grant Lee Buffalo《Fuzzy》moodGuess 存疑：Indianapolis Star 稱既有原聲旋律也有「震耳欲聾的吉他曲」，非整張慢，x 可能近 3；官網說過載 12 弦與 pump organ、parlor piano（暖有利）；殘響查無來源，不寫。製作人 Paul Kimble（團員）、錄於 Machine Elf／Brilliant。
- 16732：My Morning Jacket《The Waterfall II》moodGuess 存疑：「穀倉殘響、假音」無來源，只有 WSJ「mostly serene and reflective」支持靜；為 2013–2014 錄音側錄；Pitchfork 被工具封鎖，status 標 thin。
- 16733：Ray LaMontagne《Part of the Light》moodGuess 存疑：「長殘響、管風琴墊」查無來源（Ouroboros 的 Mellotron／Moog 是前作）；評論有耳語人聲、毛吉他與猛鼓、「in the dark」，偏暗，z 暖度有風險。status thin。
- 16734：Chris Isaak《Heart Shaped World》moodGuess 存疑（z）：「desolate wail」「brooding」「darker」是暗而非暖，ml2 色溫偏陰的疑慮未被推翻；Wilsey 殘響與顫音屬實（兩源）。年份 1989，日期 MB 與維基差一週，只寫年份。建議汰換風險：中高。
- 16735：Chris Isaak《San Francisco Days》moodGuess 存疑（x、z）：維基明寫「比前作更輕快」，含 Gatton 主奏、pedal steel、B3，單曲〈Can't Do a Thing〉〈Two Hearts〉為中快板；與慢板濕吉他預設衝突。建議汰換風險：高。status thin。
- 16736：Chris Isaak《Chris Isaak》moodGuess 存疑（x）：維基稱「精緻 R&B」，曲長 2:30–4:15、多短曲且含 Yardbirds 翻唱，近中快板搖滾；殘響僅有整體風格來源。年份落差：MB 1986-12、維基 1987-03-10，卡單 1986，請主線決定（建議保留 1986 或標 1986/87）。建議汰換風險：高。
- 16737：Orville Peck《Pony》身分與年份成立。製作人兩說：Orville Peck 條目稱自製（Gabriola 島 The Noise Floor），Pony 條目列 Jordan Koop 錄音混音，兩者並存。moodGuess 存疑（x）：有〈Winds Change〉小跑步節奏、〈Buffalo Run〉後龐克動態；z 因 dream pop／shoegaze 與荒涼意象貼邊。殘響無直接來源。
- 以上皆無推翻年份、廠牌、盤名（Chris Isaak 自題年份為落差、非推翻）；無選輯／重複卡。

## 研究 a 組
- **16721**　a 組七張身分全與卡單一致（MB 釘住、原創專輯），年份皆成立；Mighty Joe Moon 發行日 Wikipedia 9/20 與 MB 9/09 不同，Smart Flesh 2/22 與 2/21 不同，寫作層只寫年月。
- **16722**　推翻策展層：Pale Sun 的「Kim Deschamps 鋼棒」查無來源（人員表是 Jeff Bird、Ken Myhr、Richard Bell）；Lay It Down 製作人是 John Keane（Athens），非策展 why 暗示的混音師；Mighty Joe Moon 無「十二弦」證據（出自《Fuzzy》評論）；Miles 的「迷幻殘響」無來源。
- **16723**　moodGuess 存疑（建議汰換順序）：①Lay It Down（Wikipedia 稱「首張直球搖滾」、吉他重、〈A Common Disaster〉有鼓推進，無長殘響證據）②Miles From Our Home（評論稱較快、較明亮、流行搖滾光澤）③Mighty Joe Moon（三人搖滾編制、〈Sing Along〉回授搖滾，無殘響證據）④Pale Sun（官方說法「更大聲、更侵略」，與「mellow」評論互相矛盾，x 恐 2.5 以上）。
- **16724**　Lambchop《FLOTUS》：來源支持「暖、催眠」，但有鼓機驅動且「近乎堅持的律動」曲目（躁風險）與「數位失真、異質」字眼（冷風險），y 0.8 無來源；保留但標不確定。
- **16725**　最穩兩張：Trinity Session（教堂單麥、極慢；z 唯一疑慮，「noir」與「燭光」並存）、Smart Flesh（遠距收音、巨大房間殘響、安靜曲為重；z 風險：Nonesuch 文案「eerie／chilling」偏冷）。
- **16726**　單源不採：Lay It Down 銷量 60 萬（加拿大百科全書摘要）；Trinity Session 的 Moore 設備說法只有 Wikipedia 轉述，facts 已加「依 Moore 的說法」。

## 研究 c 組
- 16741：Heavy Sun 卡單 label「Modern Recordings」查無出處，MB 為 eOne（EMC-CD-28392），Wikipedia／American Blues Scene 稱 Lanois 自有品牌 Maker Series 經 eOne 發行；建議卡面改 eOne 或 Maker Series。年份 2021 不變。
- 16742：Here Is What Is 年份：Wikipedia 2007-12-15 先以下載發行、2008-03-18 出 CD；MB 的 2007-03-18（XW）疑為筆誤。卡單 2007 可成立（下載首發），實體首發為 2008，主線決定卡面取哪個。
- 16743：Teatro 卡單 why 的「鋼棒」查無——人員表無 pedal steel，只有 Brian Griffiths 的 slide guitar；Wikipedia 稱聲音「spare, yet drum-heavy and atmospheric」，三位鼓手加 Cyril Neville 康加鼓，躁風險。
- 16744：moodGuess 存疑（偏嚴重，建議優先汰換或復判）：Drag（AllMusic 稱 tone considerably lighter and more humorous）、Heavy Sun（拉丁打擊與放克律動、官方主調 uplifting／joyous）、Fresh Blood（Exclaim!／DIY 稱 warm、feel-good、celebratory，且〈Fruit Trees〉bombastic）。
- 16745：moodGuess 存疑（中度）：Ingénue（Miss Chatelaine 俏皮、有編程節奏、EW 給 C）、Here Is What Is（OC Weekly 稱 pristine 光潔而非濕；含實驗即興）、Natalie Prass（rock-hard rhythm、muscular，非全程慢板）。
- 16746：全組找不到任何樂評或訪談明講「殘響／混音濕度」，卡單「濕」的描述皆為推測；Drag 因 Wikipedia 無錄音資料（Craig Street 條目 404、AllMusic 403、Pitchfork 被工具擋）只有 7 條 facts，標 thin。

## 研究 d 組
- 16751：Valerie June《The Moon and Stars》**推翻策展層**：製作是 Jack Splash（Ben Rice 製〈Colors〉、June 自製三首），與策展層寫的 Lanois／Spacebomb 無關（Discogs 人員欄＋Wikipedia）。moodGuess 存疑：預估「弦樂、美樂特朗」查無來源；NPR 稱 ethereal／airy／expansive、BPM 稱 crystalline 並有嘻哈式節奏，判輕風險高；〈You and I〉有「濃稠潮濕」之說但屬單曲。
- 16752：Mahalia Jackson《Let's Pray Together》：Marty Paich 指揮、Irving Townsend 製作（MB 與 Discogs），管弦有 credits；合唱僅 Frémeaux 搜尋摘要單源（PDF 打不開，寫作層勿當主張）。殘響、色溫、速度完全查無，標 thin。Columbia 時期被評「toned down and polished」且往輕的流行靠，y 0.7 估值有風險，同 ml31 先例。年份：MB／Discogs 為 1964，Frémeaux 與 JetPunk 列 1963，寫 1964。
- 16753：Richard Hawley《Lady's Bridge》：慢、厚弦樂、Orbison 式嗓音屬實（NME、Guardian）；但 NME 明寫 punchy rockabilly 與 country jaunts，鼓在推，y 貼邊成立；「殘響」無樂評字眼，只有 lush、languid。
- 16754：Lord Huron《Vide Noir》moodGuess 存疑（偏嚴重，建議優先汰換）：Schneider 自述「very bass- and drums-heavy」，Dave Fridmann 混音，〈Ancient Names Part II〉車庫搖滾、〈Never Ever〉失真咆哮吉他，判躁；專輯主題「black void／cold indifference」，判冷；「濃殘響」無直接字眼。
- 16755：Lord Huron《Lonesome Dreams》：Pitchfork／AllMusic／Rolling Stone／BBC 全被擋，聲音層面零來源（殘響、和聲、速度皆無法證實），只有 WSJ「cinematic」與曲長 3:26–5:26，標 thin。x、y 貼邊無法驗證，建議聽感把關或汰換。
- 16756：Tindersticks《Can Our Love…》moodGuess 存疑：編制（Rhodes、Clavinet、10 把小提琴、銅管）屬實，但 NME 讀成灰天細雨、「sombre samba」，判冷風險；樂評無低頻描述。MB 日期 2001-05-18、Wikipedia／Discogs 為 2001-05-21，寫 2001 年 5 月。
- 16757：Tindersticks《Simple Pleasure》moodGuess 存疑：Wikipedia 稱「snappy, direct songs」往輕的靈魂走，Independent 稱「long, dark night」；殘響查無字眼，RAK 錄音／Dairy 混音為硬資料。

## 主線研究後汰換（不佔條號；2026-10-23）
- **汰 18 張**（研究層聲音反證；恍惚線最怕乾淨／推進／陰，存疑且有反證的一律汰，不硬留）：
  - 推進、大聲（x 風險）：Cowboy Junkies《Lay It Down》（首張直球搖滾、擴大機調高）、《Miles From Our Home》（Leckie 流行搖滾光澤、較快較亮）、Grant Lee Buffalo《Fuzzy》（震耳吉他曲）、《Mighty Joe Moon》（三人搖滾編制、回授起頭、無殘響證據）、Chris Isaak《San Francisco Days》（更輕快、中快板單曲）、《Chris Isaak》（精緻 R&B、短曲中快板）、Lord Huron《Vide Noir》（bass／drums-heavy、Fridmann 混音、主題 cold void）、Richard Hawley《Lady's Bridge》（punchy rockabilly、country jaunts）、Tindersticks《Simple Pleasure》（snappy、direct）、Kurt Vile《Smoke Ring for My Halo》（有重鼓推進曲、回音原聲指彈判輕）、The Paper Kites《On the Corner Where You Live》（midtempo、電吉他鼓點推進）。
  - 乾淨、明亮、輕快（y／z 風險）：k.d. lang《Drag》（lighter and more humorous）、Daniel Lanois《Here Is What Is》（pristine、實驗即興段）、《Heavy Sun》（拉丁打擊放克、uplifting）、Matthew E. White《Fresh Blood》（feel-good、bombastic）、Valerie June《The Moon and Stars》（ethereal／airy、crystalline、嘻哈拍；製作實為 Jack Splash）。
  - 偏暗：Ray LaMontagne《Part of the Light》（「長殘響、管風琴墊」查無來源，樂評偏 in the dark、猛鼓）。
  - 無來源：Lord Huron《Lonesome Dreams》（聲音層零來源，x、y 貼邊）。
- **留下的存疑張**：Cowboy Junkies《Pale Sun, Crescent Moon》（較大聲、加回授，但仍慢板，x 估 <3）；Lambchop《FLOTUS》（鼓機律動、y 無低頻來源）；Low Anthem《Smart Flesh》（工廠天然殘響穩，z 可能貼 0）；My Morning Jacket《The Waterfall II》（serene，殘響無來源）；Chris Isaak《Heart Shaped World》（brooding，但 Wilsey 殘響顫音兩源支持）；Orville Peck《Pony》（部分曲推進）；k.d. lang《Ingénue》（編程節奏）；Willie Nelson《Teatro》（drum-heavy，Lanois 濕製作）；Natalie Prass（非全程慢板）；Mahalia Jackson《Let's Pray Together》（Marty Paich 管弦有 credits，y 0.7 貼邊，ml31 先例）；Tindersticks《Can Our Love...》（sombre）；Ghosteen（pitch-black 字眼）；Timber Timbre《Hot Dreams》（menace 字眼）。評分看實測。
- 不補位：策展兩輪已回報主場景見底（池中 alt-country 全判輕）。
- 定案 **14 張**（a 4、b 3、c 3、d 2、e 2）。汰除卡存 `dropped-cards.json`，研究稿條目移到 `dropped-research.json`。研究 qa-batch 全過。

## 鉤子層（a–e，16771–16780）
- **16771** 交件：`desc-tools/batches/hooks/add-20261023-ml35-hooks-{a,b,c,d,e}.json`（4／3／3／2／2，共 14，key 與順序照研究稿）。預算公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`（「第二句以…領句。」與時序標註計入）。
- **16772** 逐筆預算／hook 加權（原始字元）：Trinity Session 216·27；Pale Sun 201·20；FLOTUS 223·22（28）；Smart Flesh 198·20；Waterfall II 162/170（thin）·21；Heart Shaped World 225·20.5（26）；Pony 227·22；Ingénue 227·21；Teatro 216·22.5（29）；Natalie Prass 225·22（26）；Let's Pray Together 161/170（thin）·23（29）；Can Our Love… 219·14；Ghosteen 212·22；Hot Dreams 218·20.5（28）。初稿 8 張超標，整格捨去：FLOTUS 全長、Waterfall 弦樂和聲、Heart Shaped 的 Chesnut 名／Jacobsen／Stratocaster 搖桿、Pony 與父母同住、Teatro 的 Les Paul、Prass 的預算與分手之作、Mahalia 的 Townsend 與 Peggy Lee、Tindersticks 的遷倫敦／Eastcote／Chi-Lites、Hot Dreams 的 Trottier 與 Polaris。壓完回核：hook 依賴格全在 hook 本身或 g1／g2（Tindersticks 曲長前移到 g2；Ghosteen 鼓軌結果在 g2；Prass 讓位在 g2）。
- **16773** 骨架歸屬（14 張 14 條）：Trinity＝借場地（謊稱電台聖誕特輯）教堂單麥；Pale Sun＝刻意調大音量擺脫定型；FLOTUS＝主腦獨自換工具起頭；Smart Flesh＝住進廢棄建築、房間決定曲目取向；Waterfall II＝側錄擱置多年被翻出；Heart Shaped World＝電影帶冷門歌翻紅；Pony＝面罩藝名與打工自製首作；Ingénue＝前輩歌者引路轉樂種；Teatro＝舊作重錄＋紀錄片；Natalie Prass＝讓位廠牌首發而延宕；Let's Pray Together＝世俗編曲家指揮福音；Can Our Love…＝靈魂樂長曲大編制；Ghosteen＝喪親之後（涉逝者克制）；Hot Dreams＝外地點子帶回駐地編排。三張「特殊錄音場地」分面：Trinity 寫借場地手段、Smart Flesh 寫房間逼出安靜曲、Teatro 寫舊作重錄與拍片。
- **16774** hook 四型：懸疑（Smart Flesh、Waterfall II、Heart Shaped World、Natalie Prass）／斷言（Pale Sun、Ingénue、Can Our Love…、Ghosteen）／場景（Trinity、Teatro、Hot Dreams）／人物定調（FLOTUS、Pony、Let's Pray Together）。開頭前四字 14 張互異。
- **16775** Cowboy Junkies 兩張分軸：Trinity 帶錄音細節（教堂、單麥、借場地、Latent→RCA），第二句「Cowboy Junkies 是加拿大樂團」；Pale Sun 帶轉向（音量、回授、Myhr／Bell、最快完成），第二句「這支多倫多樂團」。Pale Sun 不寫鋼棒（研究 16722 推翻策展），Teatro 不寫鋼棒（16743）。
- **16776** 第二句句型配表（14 種）：團名接「是」（Trinity）／這支多倫多樂團（Pale Sun）／身分（FLOTUS，hook 只帶名字，第二句補 Lambchop 唯一不變成員）／州名接團名（Smart Flesh）／團名（Waterfall II）／聲音特色（Heart Shaped World）／藝名接本名（Pony）／國籍接名字（Ingénue）／樂種接名字（Teatro）／前職（Prass）／首位簽約身分（Mahalia）／成軍城市（Tindersticks）／團名接雙專輯（Ghosteen）／國籍接團名（Hot Dreams）。hook 只帶事件不帶人的（Pale Sun、Smart Flesh、Waterfall、Heart Shaped、Prass、Tindersticks、Ghosteen）在 g1 補哪裡人與樂種。
- **16777** 「日」後一字：Trinity 日在、Pale Sun 日交、FLOTUS 日由、Waterfall II 日先、Pony 日經、Ingénue 日上、Prass 日才、Hot Dreams 日問；其餘六張只寫到年或月（Smart Flesh、Ghosteen、Tindersticks 照研究兩說不寫到日；Heart Shaped、Teatro、Mahalia 只寫年／月）。
- **16778** 媒體名與媒體榜名次不進 note：Billboard／RPM／英國榜名次、Metacritic、樂評刊名全數不指派；Smart Flesh 的「幾乎成了一件樂器」寫成廠牌形容；成績只用 RIAA 雙白金（Heart Shaped）與葛萊美（Ingénue）。研究稿 notes 的 moodGuess 存疑不進 note。Orville Peck 照研究稿寫「自製、Koop 錄音混音」；Mahalia 合唱（單源）與 1963 說不寫，寫 1964。
- **16779** 時序：Heart Shaped 的 1990 電影翻紅標「作品流傳，標時序」；Ghosteen 喪子在專輯之前、標涉逝者克制。
- **16780** 自查：hook 之間中文 4-gram 0 條；hook 對他張 note 0 條；hook 對自己 note 初掃 3 條（大聲的歌、隨機播放、西岸爵士）已改 note 用字；hook 與 note 無逐字重複句。`node qa-batch.mjs hooks add-20261023-ml35` 全部通過；`node chk-hook-crossgroup.mjs add-20261023-ml35` 全部通過（hook 加權 14–27、note 158–232）。

## 寫作層（writer-1）
- **16781** 交件：`desc-tools/batches/output/add-20261023-ml35-out-1.json` 7 張（full 6：206–237；thin 1：Waterfall II 174）。逐張：Trinity 219、Pale Sun 212、FLOTUS 237、Smart Flesh 206、Waterfall II 174、Heart Shaped World 226、Pony 234。`qa-batch out`（兩檔合跑全過）、`qa-check-research` 標記 0、`fix-spacing` 0 處；「據」字 grep 0；媒體名與媒體榜名次 0。
- **16782** 初稿 2 張超標（Heart Shaped 246、Pony 250），整格捨去：Heart Shaped 拿掉第二句裡重複的盤名；Pony 把寫歌／自製／彈奏三件事併成一個子句、尾句改用「唱片」領句。
- **16783** 第二句領句與「日」後一字全照鉤子層 16776／16777：Trinity「Cowboy Junkies 是加拿大樂團」＋日在；Pale Sun「這支多倫多樂團 Cowboy Junkies」＋日交；FLOTUS 以「身為…唯一不變的成員」＋日由；Smart Flesh 州名接團名、只寫到月；Waterfall II 團名領句＋日先；Heart Shaped 以「以重殘響 rockabilly 復興見稱的歌手」領句、只寫年；Pony「Orville Peck 這個藝名屬於…Daniel Pitout」＋日經。Trinity 錄音日只寫「錄音」，不寫「一夜」（facts 無時段）。
- **16784** 跨兩檔 han() 4-gram 合掃：初掃 2 張殘片 11 條（共同製作、先以數位形式、交由發行、由與製作、稀疏的鋼〔跨逗號黏合〕、專輯年月、首張專輯、的鋼琴與），途中又長出「製作人是」「擔任製作」兩條（對方同時在改），全在本檔這側拆掉（整個名詞換掉：數位版、掛名、交給推出、搭配製作、稀疏節拍、唱片領句、首作、彈鋼琴與風琴、自己製作）。定稿合掃 2 張以上 0 條。writer-2 若再改，請主線收件時重跑一次。
- **16785** 研究層禁區照辦：Pale Sun 不寫鋼棒；Trinity 不寫 Moore 設備說法；Pony 寫「自製、Koop 錄音混音」，不稱 Koop 製作人；Heart Shaped 不寫 Chesnut 名、Billboard 名次，成績只寫雙白金，1990 電影翻紅以「轉機在 1990 年」標時序；Smart Flesh 的「幾乎成了一件樂器」寫成廠牌形容。

## 寫作層（writer-2）
- **16786** 交件：`desc-tools/batches/output/add-20261023-ml35-out-2.json` 7 張（full 6：212–238；thin 1：Mahalia 150）。Ingénue 232、Teatro 238、Prass 233、Mahalia 150、Tindersticks 224、Ghosteen 215、Hot Dreams 225。初稿 Teatro 245 超標，整格捨去「此番重新錄過」改成「舊作重錄」並刪「名叫」「這回」。`qa-batch out`、`qa-check-research`（標記 0）、`fix-spacing`（待補 0）全過；「據」「也就是」grep 0。
- **16787** 第二句全照鉤子層 16776 配表：國籍接名字（Ingénue「加拿大歌手 k.d. lang」）／樂種接名字（Teatro「鄉村樂的 Willie Nelson」）／前職（Prass）／首位簽約身分（Mahalia）／成軍城市（Tindersticks 以「Nottingham 是…成軍的地方」領句）／團名接雙專輯（Ghosteen）／國籍接團名（Hot Dreams 寫「來自加拿大的 Timber Timbre」，避開 Trinity 的「是加拿大樂團」撞 `拿大樂團`）。Ingénue 第二、三句替 hook 的「合作者」具名 Ben Mink；Ghosteen 的鼓手名不在 note，不具名，第二句補團名與主題。
- **16788** 「日」後一字照 16777：Ingénue 日上、Prass 日才、Hot Dreams 日問；Teatro、Mahalia 只寫年／月，Tindersticks、Ghosteen 只寫月。Ghosteen 實體版改「在 11 月面世」，避免與 Prass 的「才」同形。
- **16789** 自掃（han() 4-gram，合掃 out-1 現況＋writer-1 hooks）：拆掉 `製作人是`（Teatro 對 FLOTUS）、`共同製作`（Ghosteen 對 Ingénue）、`擔任製作`（Ghosteen 對 Pale Sun），定稿 2 張以上 0 條。out-1 若之後再動，請主線收件時再合掃一次。
- **16790** 媒體與否定句：note 未指派媒體名與媒體榜名次，正文 0 處；成績只寫葛萊美（Ingénue）。Prass 初稿「弦樂沒有另請樂團」屬否定句，已刪。

## 主線審稿（16791–16800；2026-10-23）
- 16791：逐張審 14 張（out-1 7、out-2 7），逐句對回研究稿 facts；事實層未改。
- 16792：改 1 處（hook 未動，研究稿保留）：
  - `Orville Peck|Pony`：「Orville Peck 這個藝名屬於南非出生的 Daniel Pitout，他 2003 年移民加拿大。」→「南非出生的 Orville Peck，2003 年移民加拿大。」（Peck 以面罩隱藏身分、本人未公開證實本名，研究稿只引 Wikipedia 一源；本名不進正文）→ 212 字。
- 16793：核過但未改——Heart Shaped World「雙白金」（RIAA，Wikipedia）、Ingénue「第二張個人專輯」與葛萊美最佳女流行歌手演唱（研究稿兩條）、Tindersticks「四首超過六分鐘」（8:55／7:34／7:11／6:06）、Waterfall II「擱了六年」（2013–14 錄、2020 發）、Smart Flesh「100 至 200 英尺外收音」、Natalie Prass「維吉尼亞聯邦大學爵士系」皆有研究稿出處。Pale Sun「歌依舊放慢來唱」出自 Tim Bray 一源，屬聲音描述非評價，保留。
- 16794：qa-batch out、qa-check-research（兩檔）、fix-spacing 皆 0 標記；正文無媒體名、無榜單名次、無「據」字。
