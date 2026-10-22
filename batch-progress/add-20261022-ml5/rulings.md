# add-20261022-ml5 裁定（情緒薄格策展線・恍惚：neo-soul 二線＋alt R&B 2010s–20s）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 2 輪起收窄到大場景、3 個工作階段並行（本工作階段 ml5／mc6）。場景佇列 `batch-progress/mood-cells-20261022/SCENES.md`，交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。主場景 ml5 neo-soul 二線，可擴寫 ml8 alt R&B（霧而暖）。
> 策展：`curation-ml5.json`（50 張：主場景 34、擴寫 16；neosoul 20、uk-neosoul 12、retro-neosoul 4、alt-rnb 14）→ `master-ml5.json`（MB 回查 50/50 釘住、人工 0；flag 1：Society of Soul《Brainchild》MB 無日期）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml5-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 14321–14330、b 14331–14340、c 14341–14350、d 14351–14360、e 14361–14370、鉤子 14371–14380、寫作 14381–14390、主線 14391–14400。**
---

## 主線策展（不佔條號）
- 50 張全過 moodGuess 邊距（x 1.9–2.5、y 1.0–1.4、z 0.5–1.1）。策展層已對照池中同藝人既有三軸、只收 y 估 ≥1.0（ml1／ml2 y 平均高估 0.3），池中判輕或判冷的藝人（Omar、Amel Larrieux、Jill Scott、Musiq、Dwele、Snoh Aalegra、Jordan Rakei、Meshell…）一律未提。主場景挖不到 54 張，照實交 50。
- **主線汰 5 張湊 45**（風險最高的先汰）：Taylor McFerrin《Early Riser》（z 估 0.5、夢幻電子感易判中性）、Adrian Younge Presents The Delfonics（池中 Delfonics 原盤 y −0.7～−1.1）、Dijon《Absolutely》（池中《Baby》x 3.0 落沸騰）、Charlotte Day Wilson《Cyan Blue》（z 估 0.6、可能判 0.3 上下；同藝人留《ALPHA》）、KeiyaA《hooke's law》（實驗段落、z 估 0.6；同藝人留《Forever, Ya Girl》）。
- 跨工作階段去重：對 origin 所有 `claude/*` 分支 seed 去重 0。
- 研究層要特別寫聲音事實的邊緣張：Les Nubians、Laura Mvula、Goapele（y 可能判輕）、Bobby Oroza（retro soul 乾淨製作風險）、Sa-Ra／Spacek／Jesse Boykins III & Melo X／Nick Hakim《WILL THIS MAKE ME GOOD》（z 估 0.6）、Yaya Bey《Remember Your North Star》（中速 reggae／highlife 段）。年份待核：Society of Soul《Brainchild》（MB 無日期，取 1995）、Goapele《Even Closer》（獨立首版 2001？MB 2002）、Gabriels《Angels & Queens》（2022 Part I／2023 完整版）；Jesse Boykins III《Love Apparatus》廠牌待補。

## 研究 a 組
- **14321**　Bilal《In Another Life》：moodGuess 輕度存疑，PopMatters 明講有快板放克（Lunatic）、Consequence 說鼓偏大偏糙；暖成立，「整張慢、弦樂墊」找不到佐證（來源只有管風琴、theremin）。年份廠牌未推翻。留用。
- **14322**　Spacek《Curvatia》：status thin（聲音只有維基類型歸納與 Discogs 信用，無可取得樂評原文）。broken beat／trip hop 歸類暗示節奏較碎、暖度無法證實，輕度存疑。銷售不佳／高層更替為單一來源，facts 已標。
- **14323**　Steve Spacek《space Shift》：status thin。Bandcamp Daily 回望形容 chrome-laden、Rolling Stone 稱 space funk，16 首多位製作人（Dilla、dBridge、Mr. French）經手，moodGuess 中度存疑，建議主線實聽再定。名稱以卡單／MB 為準（維基 Spaceshift）。
- **14324**　Steve Spacek《Natural Sci-Fi》：「MPC 拖拍、磁帶糊」無來源；已證實稀疏切分、暖 pad、極簡；Bandcamp 標籤含 footwork／UK bass，輕度存疑。2005 開工 2018 完成，Oddisee／Natalie Slade 客座。
- **14325**　Foreign Exchange《Leave It All Behind》：A.V. Club「sleepy tempos、bath of soothing synths」直接支持，moodGuess 不動。葛萊美僅入圍（52 屆最佳都會／另類表演〈Daykeeper〉），維基未載得獎者。MB 2008-10-07、Discogs 主版本 2008-10-14，採 MB。
- **14326**　Foreign Exchange《Authenticity》：A.V. Club「催眠長律動、溫暖安全毯」支持慢暖；y 1.0 的顧慮無來源說到低頻／糊感，寫作層勿寫「霧」「低頻」。不動。
- **14327**　Sa-Ra《The Hollywood Recordings》：**moodGuess 存疑（中高）**。Exclaim! 明講 boom-bap 鼓、快板〈Feel the Bass〉、多首饒舌客座、氣氛陰暗挑逗，僅 Fly Away 柔暖；19 首含舊作與廠方指定合作曲。建議列為汰換候選或交實聽。
- **14328**　Sa-Ra《Nuclear Evolution》：Fact「chilled journey、syrup-thick」、PopMatters「funky and smooth」支持暖鬆；23 首雙碟、〈Traffika〉鼓偏脆，無逐曲 BPM。大致成立。
- **14329**　Georgia Anne Muldrow《Overload》：**moodGuess 存疑（中）**。暖與不慌亂有佐證，但 Dixieland 搖擺、跳躍小鈸、trap 風〈Canadian Hillbilly〉、爵士融合〈Bobbie's Dittie〉、維基歸 contemporary R&B and pop，段落感強。葛萊美僅入圍（62 屆最佳都會當代專輯）。建議實聽。
- **14330**　（預留未用）　本組推翻策展層年份／廠牌／掛名／盤名：0 處。

## 研究 c 組
- **14341**　Les Nubians《Princesses Nubiennes》：**moodGuess 存疑（中）**。維基列 breakbeat、jungle、funk、西非節奏（〈Embrasse-Moi〉〈Sourire〉），非整張慢霧；鋼琴開場抒情曲與〈Désolée〉8 分半較合恍惚。查無逐曲 tempo。獎項兩處不同：1999 Soul Train Lady of Soul 最佳新人得獎（團頁）、2000 Soul Train Music Awards 專輯入圍（專輯頁）；〈Makeda〉葛萊美提名查不到屆次，未寫入 facts。
- **14342**　Laura Mvula《Sing to the Moon》：**moodGuess 存疑（中高）**。DIY 形容明亮歡快、〈Green Garden〉doo-wop 搖擺、〈That's Alright〉軍樂式拍子，無「慢、霧」描述；層疊合唱與豎琴的暖度成立。Mercury 2013 入圍未得獎；MOBO 兩項得獎、最佳專輯入圍，逐項分列。
- **14343**　Andreya Triana《Lost Where I Belong》：**moodGuess 存疑（中高）**。The Skinny：低調打擊＋木吉他；PopMatters：「相當直白的爵士流行、少電子痕跡」，與「Bonobo 式低頻與弦樂霧」不符；標題曲 boom-bap＋弦樂、〈Darker Than Blue〉近耳語沉曲仍可能慢暖。發行日各來源不一（8/23、9/6、9/7），年份 2010 無誤。
- **14344**　Greentea Peng《Man Made》：**moodGuess 存疑（中高）**。RA 明講「離開濃稠重低頻 R&B、轉向乾淨原音鼓」、現場樂隊即興感、狂亂爵士鼓尾奏、〈Sinner〉失真 grunge；「磁帶糊」查無來源。dub 與低半音錄製、〈Meditation〉空靈 pad 支持部分暖慢。
- **14345**　Greentea Peng《TELL DEM IT'S SUNNY》：moodGuess 支持。Arts Desk「dubby trip hop、woozy neo-soul、loops 與貝斯線 relaxed and spaced out、smoky」；UK Jazz News「迷幻而陰暗」略偏冷。大小寫差異（MB 為 Tell Dem It's Sunny）非推翻。
- **14346**　Yaya Bey《Remember Your North Star》：**moodGuess 存疑（高）**。18 首僅約 34 分鐘、多首十幾秒片段；〈keisha〉粗硬張狂、〈big daddy ya〉R&B banger、ska dub 段落；「糊鍵盤墊」查無來源。建議汰換或降預估。
- **14347**　Yaya Bey《Ten Fold》：**moodGuess 存疑（高）**。Spin「buoyant」、薄 house 節拍、dancehall、舞池曲、squelchy 貝斯；僅 AllMusic 有「relaxed soul-jazz groove」。「磁帶糊」查無來源。建議汰換。Pitchfork BNM／Metacritic 不入 facts。
- **14348**　The Midnight Hour《The Midnight Hour》：**moodGuess 部分存疑（冷）**。mxdwn「cold and haunting、深夜爵士酒廊」，〈Ravens〉快而緊張；類比錄音室、真弦樂、厚低頻支持靜重，z 風險在偏冷。Okayplayer「mostly instrumental」與大量客唱名單矛盾，未寫入。
- **14349**　Georgia Anne Muldrow《Umsindo》：**moodGuess 存疑（中）**，status thin。只證實層疊人聲與放鬆有機律動；〈Fonky Day〉等西岸放克、〈Daisies〉Sly Stone 式放克偏中速；總長／曲數／月份查無可靠來源。池中同藝人三張已實測落恍惚，以實測為準。
- **14350**　本組推翻策展層年份／廠牌／掛名／盤名：0 處（僅註記發行日期來源互異：Nubians、Triana、Yaya Bey RYNS）。
