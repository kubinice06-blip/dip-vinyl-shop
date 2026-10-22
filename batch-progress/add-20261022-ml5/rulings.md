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

## 研究 d 組
- **14351**　Georgia Anne Muldrow《King's Ballad》：**moodGuess 存疑（高，建議汰換）**。PopMatters／Scratched Vinyl／Basic Soul 描述為迷幻放克、電子放克鼓、龐克曲〈Room Punk!〉、高能混亂〈Thatch〉、「最接近主流」，標題曲急促脈動，與策展預估「慢、霧、包覆」不符。發行日 Discogs CD 2010-02-09、MB 2010-07-10，年份皆 2010 不動。
- **14352**　Fatima《Yellow Memories》：**推翻策展層製作掛名**：Discogs 完整名單與 RA 評論都無 Funkineven、Alfa Mist；實為 Floating Points（4 首署名，RA 說 5 首）、Theo Parrish、Oh No、Computer Jay、Scoop DeVille、fLako、Knxwledge。聲音面輕度存疑（多製作人拼貼、boom bap、換拍曲，速度與暖度無直接來源）。
- **14353**　Goapele《Even Closer》：年份 2002 確認（MB／Discogs／維基一致，疑慮的 2001 是前身自費版《Closer》，非本盤）；2004 Columbia 重發加曲。聲音輕度存疑：樂評談「柔、簡」，但〈The Daze〉可跳舞帶雷鬼、無夢幻合成器墊直接證據。首作／第二張說法分歧，建議不用序數。
- **14354**　Mereba《The Jungle Is the Only Way Out》：status thin。無專輯本身完整樂評（Pitchfork 無此評、AllMusic 被擋、Hypebeast 空頁、HipHopDX 410）。**moodGuess 存疑（中）**：Pitchfork 追評稱首作「polished but scattershot」橫跨 Fugees／Atlanta 饒舌／Dylan，〈Planet U〉有 trap hi-hat 與饒舌段。WebSearch 額度已用完（本組 3 次用於 Muldrow、Fatima、Goapele）。
- **14355**　Raveena《Lucid》：聲音（殘響、假聲、扭曲合成器）有 Pitchfork 佐證，速度／暖度為推論；曲長 12 首約 45 分，三首過場不到 2 分鐘。
- **14356**　Raveena《Where the Butterflies Go in the Rain》：年份 2024-06-14（卡單／MB／維基）；Discogs master 記 2025 是只收了黑膠 Deluxe，不推翻。整體柔和，但〈Junebug〉（JPEGMAFIA）有俐落鼓、〈Water〉有搖滾 riff，輕度存疑。
- **14357**　Kali Uchis《Red Moon in Venus》：moodGuess 支持。Guardian（pillow-soft、woozy）與 Clash（hazy、slow-funk、quiet storm）一致；廠牌 Geffen（Discogs 黑膠標 Interscope，同集團）。
- **14358**　Charlotte Day Wilson《ALPHA》：輕度存疑。Pitchfork 強調「走出暮色、更宏大」，〈Keep Moving〉為八〇年代成人抒情風、〈Changes〉背 trap 節拍；11 首約 33 分。Polaris 長／短名單說法矛盾（維基稱 shortlisted），facts 不寫。
- **14359**　Sabrina Claudio《About Time》：輕度存疑（暖度證據弱）。Apple Music「slow simmer」支持慢，但〈Used To〉偏舞曲、〈Wait〉Afrobeat 律動；性質為 mixtape（Wikipedia），12 首，另有 15 首擴充黑膠。Billboard 專輯榜名次兩處不一致（13／12），建議不用。2018 年網路爭議依反向禁令不寫。
- **14360**　（預留未用）　本組推翻策展層年份／廠牌／掛名／盤名：1 處（Fatima 製作掛名）；另年份待核項 Goapele 確認為 2002。

## 研究 e 組
- **14361**　Sabrina Claudio《Truth Is》：**moodGuess 存疑（中高）**。聲音證據偏薄，只證實「氛圍弦樂＋黏稠脈動節拍」（Paper 評〈Holding the Gun〉）、更暗更實驗（NYU 報）、混多風格；「吉他殘響」無任何來源。製作班底 Sad Money／Stint／Sir Nolan 偏流行、有 ZAYN 客串曲，建議列汰換候選。
- **14362**　Nick Hakim《WILL THIS MAKE ME GOOD》：**moodGuess 存疑（中高）**。殘響與層疊人聲有佐證，但「磁帶飽和」無來源；Clash「陰森」、標題曲電子失真雲、〈Drum Thing〉過載、〈Bouncing〉蹣跚重踏、〈Vincent Tyler〉反胃搖擺（Rolling Stone），暖度與速度皆有偏離風險，與策展層 z 0.6 疑慮一致。建議汰換候選。
- **14363**　Nick Hakim《COMETA》：moodGuess 輕度存疑。HRA 明講「較快的歌與慢燒的歌」並陳，非整張慢；合成器層疊、鬆垮鼓循環、假聲（Stereogum〈M1〉）成立。錄音地 HRA 寫德州／北卡／加州／紐約，XPN 少北卡，facts 採 HRA。
- **14364**　Gabriels《Angels & Queens》：**moodGuess 存疑（中）**。弦樂、合唱、暖成立，但〈Taboo〉巨大小鼓＋歇斯底里弦樂＋銅管、Dilla 式切採樣、「中速可跳舞」（Telegraph），戲劇起伏大，速度與強度有被判中到快、激昂的風險。年份：MB 單一 RG 首發 2022-09-30（Part I，7 首約 27 分鐘），完整版 2023-07-07 為 13 首標準版；寫作層須寫明兩階段。
- **14365**　Baby Rose《To Myself》：moodGuess 輕度存疑。煙燻女低音、吉他／管風琴／簡單鈸、風雨環境音有佐證；「厚殘響、弦樂墊」與速度無來源（Pitchfork 被擋），編制可能比預估稀疏。2020 Island 重發與豪華版為同一專輯。
- **14366**　Baby Rose《Through and Through》：moodGuess 輕度存疑（速度）。復古現場樂器、夢幻吉他、圓潤貝斯、迴盪低頻有 Flood／Loud And Quiet 佐證；DJ Dahi／Slim Wav 製作與 Smino 客串使〈I Won't Tell〉等偏現代 R&B 律動，可能判中速。
- **14367**　Bobby Oroza《This Love》：moodGuess 輕度存疑。lo-fi、深夜、慢板抒情（〈Déjà Vu〉沉重鼓聲）成立；「磁帶殘響」「假音」無來源（只有 plaintive tenor），且〈Your Love Is Too Cold〉是 up-tempo 快歌。補充：標題曲 2016 先以 Stylart 雙面單曲發行（Discogs 另有同名 master，非專輯）。生平（赫爾辛基、玻利維亞血統）單一來源。
- **14368**　Jesse Boykins III《Love Apparatus》：**moodGuess 強烈存疑（高）**。實為 Machinedrum 主製（14 首中 11 首）的電子製作：808、心跳節奏、Discogs 標籤 Neo Soul＋House、豪華版加碼曲 lounge-house 中速；NPR 稱放克味新世紀。建議優先汰換。廠牌無法補出：MB 4/22 版標 Nomadic Music，Discogs 主版本為 2014-11-04 豪華版 Empire；建議留空或 Nomadic Music，勿寫 Empire。維基出生地矛盾（芝加哥／牙買加），facts 不寫出生地。
- **14369**　Brainstory《Buck》：**moodGuess 存疑（中）**。聲音來源只有 Big Crown 廠方文案與 Discogs 工程名單（無獨立樂評）。假音（Kevin）成立；「磁帶糊與殘響」無來源，廠方明講 G-Funk 律動、穩定 backbeat、朋克／硬核出身，Discogs 標 Rock／Indie Rock，偏乾中速。
- **14370**　本組推翻策展層年份／廠牌／掛名／盤名：0 處（待補項：Love Apparatus 廠牌補不出，如 14368；Gabriels 年份僅需寫作層註明兩階段發行）。
