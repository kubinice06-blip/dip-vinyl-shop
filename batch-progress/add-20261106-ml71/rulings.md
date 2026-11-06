# add-20261106-ml71 裁定（情緒薄格策展線・恍惚 Bandcamp downtempo 候選第二輪 A：靠近邊界的那批）

> 店主 2026-11-06「繼續」：第一輪（ml68–70、md39–41）卡單 289 上線 104 後，剩下靠近邊界的 612 張先照第一輪教訓過濾（拿掉 house／techno／breakbeat／funk／hip-hop／dub／soul／pop 等標籤 378 張、<30 分 2 張）→ 232 張分五批、三個工作階段並行（本工作階段 ml71＋ml72；另兩個做 ml73＋md42、md43）。來源見 `batch-progress/bandcamp-dt-20261105/README.md`；卡單 `pick-ml71.json`（52 張）。**卡單即策展結果**，不派策展代理；主線組 `curation-ml71.json` → `build-master.mjs ml71` → `master-ml71.json`。評分照 10-23 店主「體感標準」。目標格：**恍惚＝靜＋重＋暖**，邊距 x≤2.7、y≥0.8、z≥0.3。**第二輪卡單 moodGuess 多半貼邊（z 多為 0–0.2），研究層要確實判聲音：判輕、有拍推進、判冷的一律標存疑，主線照汰、不補人。**
> 本批卡單：`desc-tools/batches/cards/add-20261106-ml71-cards.json`（37 張；研究 a–d 各 8、e 5）。身分：MB 釘住 36、§1 人工 1（Science Of Sleeping《Sleep Cinema》，Bandcamp＋Apple 1756950809）。
> **預留：研究 a 23961–23970、b 23971–23980、c 23981–23990、d 23991–24000、e 24001–24010、鉤子 24011–24020、寫作 24021–24030、主線 24031–24040。**
---

## 主線策展（不佔條號；2026-11-06）
- 卡單 52 張：去重（seed、所有 manifest、`data/pool-removed.json`、所有 curation）0 撞池；撞到舊提名 1 張（A Forest Mighty Black，先例已汰）。
- MB release-group 搜尋＋Bandcamp 頁 ld+json（盤名、日期、廠牌、曲目）逐張回查。年份照 MB first-release-date：Era 1996（MB 同名 RG 兩個，釘 1996 那個 90db6934）、Carbon Based Lifeforms《Interloper》2010、ASURA《Life²》2007、AES DANA《Memory Shell》2004、Hibernation 2008、desert sand feels warm at night 上下集 2019、Lindsheaven Virtual Plaza《Nordwrong》2013（Bandcamp 日期皆為重發）。
- **主線汰 15**：
  - A Forest Mighty Black《Mellowdramatic》：先例已汰（ml40 研究：無聲音證據、存疑高，主線汰）
  - Carbon Based Lifeforms《ALT:01》：MB Album＋Compilation（舊曲另版重製合集）
  - Carbon Based Lifeforms《ALT:02》：MB Album＋Compilation（舊曲另版重製合集）
  - Blue States《Restless Spheres》：同人錨點判輕（池中《Man Mountain》y 0.1 落放鬆），卡單 y 0.7 貼邊
  - Kaya Project《The Ambient Mixes》：MB Album＋Compilation（混音版合集）
  - Zero 7《The Garden (Special Edition)》：池中已有《The Garden》，特別版擴充重發
  - Amon Tobin《Monthly Joints Series》：MB Album＋Compilation（每月單曲合集）
  - State Azure《Dreams》：Tangerine Dream 翻唱專輯（MB Remix）
  - Bluetech《Dreaming Into Being》：同人超量（池中已 4 張，含 ml70《Spacehop Chronicles 2》）
  - Bluetech《Sci-Fi Lullabies》：同人超量（池中已 4 張）
  - Glen Porter《The Devil Is A Dancer, The Piper Is A Madman》：MB EP
  - Hello Meteor《Night Supply》：先例同型判輕（ml70 兩張 Hello Meteor cozywave 判輕汰）、池中已 2 張
  - State Azure《Mirror Infinite》：同人錨點判冷（池中兩張 z −0.2／−0.7）
  - Anthemics《YONDER》：MB Album＋Soundtrack（原聲帶）
  - Leif《Liminal Pieces》：MB Album＋Compilation
- Somatoast《Goop》MB RG 沒標 primary type（7 首 32 分），比照 ml70 AndyFellaz 先例視同 Album，研究層核對是否全長。
- label 欄多為 Bandcamp 帳號名，Bandcamp 帳號＝藝人本人或個人名的（Seb Taylor、monde ufo、Astropilot）留空。
- 同藝人：Delerium 2（ml72 另 1）、ASURA 2（ml72 另 1）、Nym 2、desert sand feels warm at night 2；其餘一人一張。

## 研究 e 組
- 24001：e 組 5 張的聲音證據只有 Bandcamp 頁（標籤、曲長、簡介）、MB 與少量樂評（Deadbeat 兩篇），沒有實聽；Deadbeat 判靜重暖成立。
- 24002：Crystal Vibe《Change Is the Only Constant》moodGuess 存疑（psychill 有持續拍子、單曲 8–10 分鐘舞池式展開）；卡單 label 空白，實為 Altar Records。
- 24003：glaciære《pool water blue》moodGuess 存疑判輕（Sunvox 小品 library music，29 分鐘十首，夏日泳池意象）。
- 24004：woob《Have Landed》moodGuess 存疑（四個年代拼貼、含 Max & Harvey 舊作，非統一靜重暖）。
- 24005：Lindsheaven《Nordwrong》保留；mallsoft 霧感合理，但溫度不確定，無第三方樂評。年份 2013 無誤。

## 研究 d 組
- 23991：Joris Voorn《Melatonin》：Bandcamp 只給 ambient／downtempo 與睡眠主題，無低頻、殘響的聲音證據；判傾向輕／中性，moodGuess 存疑，status partial。
- 23992：'t Geruis《Terre, Poussière》：廠牌文案支持厚（saturation、gaseous clouds）、靜、孤獨但不冷，moodGuess 大致成立，不汰；藝人為比利時人、廠牌在英國，country gb 是廠牌地。
- 23993：Atomic Skunk《Portal》：吉他、人聲取樣、田野錄音，節拍是氛圍底下的細節而非舞池推進，成立不汰；Organic Robot Records 見版權行，label 留空。
- 23994：Somatoast《Goop》：MB 無 primary type，7 首 32 分 27 秒（含他人混音一首），Gravitas 自稱 second album，視同 Album；IDM／glitch／dubstep 標籤與顛簸拍，moodGuess 存疑，建議汰。
- 23995：LAB'S CLOUD《Underwater Galaxy》：Bandcamp 列出每首 BPM 95–115，說明稱 uplifting synth lines 與 soulful grooves，持續律動且偏輕，moodGuess 存疑，建議汰。
- 23996：Neuroq《Catharsis》：Bandcamp 兩個網域互相轉址迴圈無法開啟，聲音無來源，status thin；x 2.8 已越邊距，moodGuess 存疑，建議汰。
- 23997：Entheogenic《Meltwater Pulse 1B》：簡介僅一句、無聲音描述，status thin，moodGuess 無支持，存疑。
- 23998：Astropilot《Solar Walk III. Unseen Chapters》：內容為另版、氛圍混音、新作，第 9 軌為整張 56 分鐘連續混音，近補遺性質；太空 cinematic 傾向冷，存疑，主線可比照 CBL《ALT》汰。

## 研究 c 組
- 23981：Science Of Sleeping《Sleep Cinema》§1 核對：Bandcamp 與 Apple 1756950809 盤名、2022-07-29、九曲吻合，debut；Apple 版權 Valley View Records，Bandcamp 自發，label 不寫。聲音證據只有藝人自述，thin。
- 23982：Elaquent《Believing》moodGuess 存疑：評論稱鼓點錯落的嘻哈／電子 beat 專輯，有持續 beat；EARMILK 全文逾時，聲音取自搜尋摘要，不寫廠牌。
- 23983：Tryphème《Online Dating》moodGuess 存疑：Now Then 評論明言細密鼓聲是地基、有舞池曲、acid、放克，Light Light Light 明亮樂觀，判輕躁。卡單證據網址轉址無法開，改用 MB／Now Then。
- 23984：Shwamp《Emergence Unfolding》moodGuess 存疑：廠牌文案寫 addictive percussion、groove、psydub，有律動推進；低頻厚、合成器暖屬實。日期 Bandcamp 2017-09-30、MB 2017-10-13，採 MB。
- 23985：boerd《Dwaal》moodGuess 存疑：無任何聲音描述，只有 trip hop 標籤（預設有鼓）；Dwaal 詞義無來源，不寫。
- 23986：Spunkshine《HUGE Humans》moodGuess 存疑：標籤 grooving weirdness、IDM、theatrical、unsettling，MB 標 big beat，偏躁怪。
- 23987：Lauge & Baba Gnohm《Langbortistan》：Bandcamp 2011-10-15、MB 2011-11-11，採 MB；Altar Records 為 CD-R 初版，label 留空。聲音僅 Sonic Immersion 單一評論（旋律豐盈、放鬆、部分曲有低音律動），不標存疑但 y 0.5 偏低。
- 23988：desert sand feels warm at night《バビロンの空中庭園 上》：Bandcamp 為 2026 Hushtones 黑膠重發頁，年份採 MB 2019；聲音僅標籤（slushwave、hypnagogic），thin，未發現反證。

## 研究 a 組
- 23961：Era《Era》moodGuess 存疑（強）：2 到 5 分鐘歌曲結構、持續鼓與貝斯（Neil Wilkinson、Lee Sklar）、電吉他，流行搖滾式推進，建議汰。MB 同名兩個 RG，釘 1996 正確；『600 萬張』為計畫整體銷量，單一來源（維基），未歸給單張。
- 23962：Carbon Based Lifeforms《Interloper》moodGuess 存疑（輕度）：樂團先做無鼓版（後為《Twentythree》）再加鼓成《Interloper》，整張有持續拍子，不是『極少鼓』；暖與厚墊成立，邊界。Bandcamp 2015 為重發，年份採 MB 2010。
- 23963：Delerium《Semantic Spaces》moodGuess 存疑（輕度）：靜重成立，但聽眾評論提 beats／edgy／moody，暖度未證；聲音證據僅維基與聽眾評論，無專業樂評。Bandcamp 單曲版 4:22 與專輯版 7:55 不同，採維基。
- 23964：Delerium《Nuages Du Monde》moodGuess 存疑（強）：維基類型 electronic／pop／ambient，〈Angelicus〉與〈Lost and Found〉登美國舞曲榜（第 1、第 4 名），有舞曲節拍，建議汰。
- 23965：ASURA《Life²》moodGuess 存疑（輕度）：廠方文案寫亞蘭式部落節奏與迷幻貝斯線，帶拍 psybient；聲音證據只有廠方文案。Bandcamp 2015 重發，年份採 MB 2007。
- 23966：ASURA《360》moodGuess 存疑（輕度）：廠方文案 slowly grooving rhythms，有律動；〈360 (Full Mix)〉1 小時 17 分不計入正曲長度。
- 23967：AES DANA《Memory Shell》無新增存疑，a 組最貼目標格；拍子強度只有廠方文案，年份採 MB 2004（Bandcamp 2015 重發）。
- 23968：Nym《Warm Blooded Lizard》moodGuess 存疑（強）：標籤與簡介明說 instrumental hip-hop／beats，1 到 5 分鐘短曲、鼓機節拍，x 2.8 也超出邊距，建議汰。Bandcamp 原頁 303 轉址循環，facts 取自 Wayback 存檔的 ld+json，src 寫原站網址，status thin。
- 23969：Wikipedia API 被 429 限流，改用 WebFetch 取維基摘要；Delerium／CBL／Ultimae 條目為摘要轉述，facts 僅寫摘要明確出現的內容。
- 23970：（預留未用）

## 研究 b 組
- 23971：Nym《Convex》moodGuess 存疑（中強）：試聽多數曲目有持續的半速取樣鼓組（器樂 hip-hop／trip-hop），僅〈Sleep〉〈Come Back〉無鼓；低頻厚（lo150 0.56–0.79）、高頻收，重暖成立但『靜』弱。同人 a 組《Warm Blooded Lizard》已建議汰，同型。藝人生平查不到（官網與 nymself.bandcamp.com 互相重導抓不到），status thin。
- 23972：Monde UFO《7171》moodGuess 存疑：約半數曲目低頻薄（lo150 0.04–0.19）、中頻 lo-fi 爵士，『重』不穩；鼓只在 4 首。Bandcamp 頁將 Vallée 拼成 Jaques，facts 用 Jacques。
- 23973：Telenights《Lucky Tiger》無存疑：低頻極厚（lo150 0.57–0.91）、無高頻，惟有穩定鼓機且響度高，『靜』交評分層。生平查不到，thin。
- 23974：Hibernation《Some Things Never Change》moodGuess 存疑：新聞稿與頻譜顯示 syncopated grooves／breaks／glitch，非無鼓氛圍墊。curatorRisk 的 147 分鐘已查清（14 首 75:41＋71:29 連續混音，非雙碟）；年份 MB 2008 對 Bandcamp 2015 重發，卡單無誤。
- 23975：Stone《Dream Curtain Eternally Gentle》moodGuess 存疑：樂迷與頻譜皆指向 beat tape 型鼓組脈動（9 首中 6 首以上），4kHz 以上略多，『靜』『重』皆不全；建議汰。生平查不到，thin。
- 23976：Yaima《Antidote》無存疑：吉他、handpan、kora、豎琴加 cajon，低頻厚、暖、有人味；脈動偏緩不是舞池拍。mixed by Bluetech 屬 Bandcamp 自述。
- 23977：Funki Porcini《Conservative Apocalypse》moodGuess 存疑（偏冷）：MB／Bandcamp 皆標 dark ambient，作者自述為日常場景加氣氛的政治警示專輯，聽感恐陰冷疏離；14 首有 4 首低頻薄而輕。Wikipedia 對 Braddell 生日自相矛盾，facts 不寫。
- 23978：desert sand feels warm at night《バビロンの空中庭園 下》無存疑但『重』不穩：Bandcamp 串流 45 秒片段頻譜，無高頻、悶暖，lo150 0.07–0.83 不一；原發日期取 MB 2019-03-25，Bandcamp 現頁為 2026 Hushtones 黑膠重發。「上」卷頁找不到，不寫上下卷關係。thin。
- 23979：頻譜方法：Apple 30 秒試聽片段（desert sand 改用 Bandcamp 串流）做 150Hz 以下／4kHz 以上能量占比，BPM 自相關估計不穩，facts 只寫能量占比與「有鼓／無鼓」。WebSearch 用 1 次（Nym）；Wikipedia 用 WebFetch（curl 被擋）。
- 23980：（預留未用）

## 主線研究汰換（不佔條號；2026-11-06）
研究層交件後照各組「moodGuess 存疑」汰 21 → 剩 16；被汰卡移到 `dropped-cards.json`／`dropped-research.json`。不補位（卡單即策展結果）。
- 有拍推進 9：CRYSTAL VIBE《Change Is the Only Constant》（psychill／progressive psychedelic 8–10 分鐘舞池式展開（研究 e））、Somatoast《Goop》（IDM／glitch／dubstep，stuttering 切分拍（研究 d））、LAB'S CLOUD《Underwater Galaxy》（每首 95–115 BPM、uplifting synth、soulful grooves（研究 d））、Era《Era》（2–5 分鐘歌曲、持續鼓貝斯與電吉他、流行搖滾式推進（研究 a））、Delerium《Nuages Du Monde》（electronic／pop，主打曲登美國舞曲榜（研究 a））、Nym《Warm Blooded Lizard》（器樂嘻哈 beats 短曲，卡單 x 2.8 已越邊距（研究 a））、ASURA《Life²》（廠方文案部落節奏＋迷幻貝斯線（研究 a；ASURA 留《360》一張））、Nym《Convex》（多數曲有持續半速取樣鼓組，只有兩首無鼓（研究 b））、Hibernation《Some Things Never Change》（新聞稿 syncopated grooves、breaks、glitch（研究 b））
- 判輕 2：glaciære《pool water blue》（Sunvox 夏日泳池 library 小品、29 分鐘（研究 e））、Joris Voorn《Melatonin》（鋼琴加乾淨現代混音、無低頻厚度證據（研究 d））
- 判輕／雜 1：woob《Have Landed》（四個年代風格拼貼、含舊作與短過場，不是統一的慢糊（研究 e））
- 無來源 3：Neuroq《Catharsis》（Bandcamp 轉址迴圈讀不到，聲音零證據，卡單 x 2.8 已越邊距（研究 d））、Entheogenic《Meltwater Pulse 1B》（簡介一句、無聲音描述（研究 d））、boerd《Dwaal》（全無聲音描述，只有 trip hop 標籤（研究 c））
- 判冷＋補遺性質 1：Astropilot《Solar Walk III. Unseen Chapters》（太空 cinematic、另版與混音、第 9 軌 56 分鐘整張連續混音（研究 d））
- 有拍推進＋判輕 2：Tryphème《Online Dating》（細密鼓聲是地基、有舞池／acid／放克曲、明亮樂觀（研究 c））、Stone《Dream Curtain Eternally Gentle》（beat tape 型鼓組脈動、高頻偏多（研究 b））
- 判躁 1：Spunkshine《HUGE Humans》（grooving weirdness／IDM／unsettling、MB 標 big beat（研究 c））
- 有拍推進＋同人錨點判冷 1：Carbon Based Lifeforms《Interloper》（先做無鼓版再加鼓、整張持續拍子；池中《World of Sleepers》z −0.3（研究 a））
- 判冷 1：Funki Porcini《Conservative Apocalypse》（MB／Bandcamp 標 dark ambient、政治警示主題，陰冷疏離（研究 b））
- 留下但聲音待評分驗證：Elaquent《Believing》（鼓點 beat 專輯，池中同人兩張皆落恍惚，比照 ml16 jazz-rap 先例）、Shwamp《Emergence Unfolding》（psydub 律動，低頻厚、暖屬實，比照 ml70 Kuba 暖 dub）、Monde UFO（半數曲低頻薄，輕度存疑；池中同人落恍惚）、Telenights（低頻極厚、穩定鼓機）、Science Of Sleeping（無鼓，低頻與暖度無證據）、Lauge & Baba Gnohm（單一評論）、desert sand 上下集（悶暖、厚薄隨曲變）。
- 照研究補卡單：Hibernation 147 分鐘＝14 首專輯＋一條 71 分鐘 DJ mix（已汰）；Somatoast 視同全長（已汰）。

## 鉤子層（a–e，24011–24020）
- 24011：交件 `desc-tools/batches/hooks/add-20261106-ml71-hooks-{a,b,c,d,e}.json`（3／4／5／2／2＝16 張，key 與順序照研究稿）。預算公式＝`Array.from(hook)+Array.from(note) − 主故事： − 每個→ − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full／partial 上限 230、thin 上限 170。逐筆：Delerium 220、ASURA 224、AES DANA 224、Monde UFO 228、Telenights 169（thin）、Yaima 210、desert sand 下 161（thin）、Lauge & Baba Gnohm 210、Shwamp 199、desert sand 上 156（thin）、Elaquent 154（thin）、Science Of Sleeping 161（thin）、't Geruis 223、Atomic Skunk 209、Deadbeat 220、Lindsheaven 165（thin）。hook 加權 18–27、原始字元 18–30；note 159–229。
- 24012：初稿 12 張超標，整格捨去：Delerium 四首曲名、ASURA 廠方引語與廠牌限定句、AES DANA 目錄號、Monde UFO 鼓手曲序、Telenights 雜標籤與總長、Yaima 錄音室名與 cajon、Lauge 單曲長與低音線評語、Shwamp 曲名、上集最短曲、Atomic Skunk 作者年份與樂評引語、Deadbeat CD 版、Lindsheaven 曲名例。壓完回核：16 張 hook 依賴格全在 g1／g2（Delerium 起點、ASURA 廠牌緣起、AES〈Chernozem〉、7171、sample-free、火、自介、丹麥文曲名、苔蘚、日文曲名、首播、最高級曲名、自拍照封面、China Doll、陶雕滴水、虛構企業測試）。Science Of Sleeping hook 原寫「曲名全用最高級」與 intro／outro 不符，改「七首主曲」。
- 24013：骨架歸屬（16 條一張一條）：Delerium＝副計畫轉向女聲客座；ASURA＝首張無人簽、廠牌為他而建；AES DANA＝首尾同名兩段包夾；Monde UFO＝盤名取自 UFO 調查案例；Telenights＝無取樣 vaporwave；Yaima＝以火為題＋客座世界樂器；desert sand 下＝一句自介的匿名計畫；Lauge＝丹麥文曲名；Shwamp＝苔蘚沼澤意象；desert sand 上＝網路原發→黑膠加收曲；Elaquent＝發行前一天全專輯首播；Science Of Sleeping＝最高級曲名＋夢的電影院；'t Geruis＝藝人自拍照拼成封面；Atomic Skunk＝翻奏搖滾老歌；Deadbeat＝陶雕滴水當素材；Lindsheaven＝虛構企業口吻的簡介。廠牌分面：Ultimae 緣起只給 ASURA、AES DANA 只帶「創辦人」身分；quiet details 給 't Geruis 封面拼貼、Deadbeat 只帶發行；Hushtones 只給上集（下集與 Lindsheaven 不帶重發）。
- 24014：他／她引入法（性別有來源才用代名詞）：Deadbeat「他」（研究稿 F3「他提到」）、Atomic Skunk「他」（Rich Brodsky）、Yaima「他們」（二人組）、Lauge「兩人」；其餘名號引入：ASURA→Charles Farewell、AES DANA→Vincent Villuis、Monde UFO→Ray Monde、Telenights／Shwamp／Elaquent／Science Of Sleeping／'t Geruis 直接名號；desert sand 上下集：下集「名號領句」、上集「這個計畫／這個 slushwave 計畫」，國別兩份研究稿互相矛盾（波特蘭 vs 英國），兩張都不寫所在地。上下集分軸：下集帶生平（一句自介、37 張數位發行），上集帶曲目與載體（九首 58 分鐘、最長曲、2026 黑膠加收〈幻想〉）。
- 24015：第二句句型配表：Delerium「1987 年在溫哥華起家、原是…副計畫」帶出名號；ASURA「是…的名號」；AES DANA「創辦人、作曲家」頭銜領句；Monde UFO「…的 lo-fi 爵士計畫」帶出；Telenights／Shwamp／desert sand 下 名號直接領句；Yaima「是西雅圖的二人組」；Lauge「丹麥二人組」；desert sand 上「這個 slushwave 計畫」；Elaquent「加拿大器樂 beat 製作人」；Science Of Sleeping「澳洲 ambient 製作人」帶出；'t Geruis「比利時藝人＋前作廠牌」；Atomic Skunk「美國製作人」；Deadbeat「加拿大出生、住柏林」；Lindsheaven「這個 mallsoft 計畫」。前作已上架同人卡（Elaquent 兩張、Monde UFO、Deadbeat 兩張、Lindsheaven）的開頭與面向已避開（不寫 Guelph、Quindi、Berghain、~scape、里約）。
- 24016：「日」後一字逐張配死：在（Delerium）、上（ASURA）、由（AES DANA）、問（Monde UFO）、發（Yaima）、放（下）、首（Shwamp）、原（上）、先（Elaquent）、推（SoS）、面（'t Geruis）、交（Deadbeat）、，（Lindsheaven）；Telenights、Lauge、Atomic Skunk 只寫到年。
- 24017：派工補充照辦：媒體名一律不進 note（Elaquent 寫「一家音樂網站」並指派網站名這一格不寫；Lauge、Deadbeat 寫「樂評」）；研究稿自量頻譜／BPM（Monde UFO F8、Telenights F5–F6、Yaima F8–F9、下集 F7–F8）未進 note；Deadbeat 已故染織家標「寫得克制」。hook 型：懸疑（ASURA、Elaquent、Lindsheaven、Atomic Skunk）／斷言（Delerium、Monde UFO、Telenights、SoS、Lauge）／場景（AES、Yaima、Shwamp、上集、Deadbeat）／人物定調（下集、't Geruis）。
- 24018：自查：hook 間中文 4-gram 0 條；開頭前四字 16 張互異，也與 ml68–70、md39–41 已交 hook 開頭不同；hook 與 note 無逐字重複句（Delerium note 改「這條路線的起點」避開與 hook 重字）。`qa-batch hooks` 全部通過；`chk-hook-crossgroup` 全部通過（只報不擋 2 筆「沒有」皆為內容：下集自介引句、上集「數位版沒有的〈幻想〉」）。
- 24019–24020：（預留未用）
