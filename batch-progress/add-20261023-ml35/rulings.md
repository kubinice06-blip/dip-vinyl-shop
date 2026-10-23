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
