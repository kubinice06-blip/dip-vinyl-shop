# add-20261023-mc36 裁定（情緒薄格策展線・冷冽：no wave／薄而尖的 noise rock＋Downtown 即興／skronk）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 9 輪，本工作階段負責 ml43、mc36（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc36 列；可擴寫：Downtown NYC 即興／skronk、尖細 no wave 後裔、EAI 尖細型最多 8 張），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc36.json`（39）→ 主線汰 7（`master-override-mc36.json`）→ `master-mc36.json`（MB 回查 32/32 釘住、人工 0；flag 1 見下）→ `pick.json`（32）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc36-cards.json`（32 張；研究 a–d 各 7、e 4）。身分：MB 釘住 32、§1 人工 0。
> **預留：研究 a 19641–19650、b 19651–19660、c 19661–19670、d 19671–19680、e 19681–19690、鉤子 19691–19700、寫作 19701–19710、主線 19711–19720。**
---

## 主線策展（不佔條號）
- 策展 39（no wave 本體＋東京 6、Downtown 即興／skronk 19、尖細 no wave 後裔 14）；EAI 0（留給 mc37）。moodGuess 全過邊距（x 3.4–4.3、y −1.2～+0.2、z −1.9～−0.9）。
- **no wave 本體幾乎沒有正規專輯**：DNA、Teenage Jesus、Theoretical Girls、Branca 早期、Sonic Youth 首作都是 EP 或彙編；Mars 只有《John Gavanti》。池中 no wave 多判重落暴躁（Branca《The Ascension》y 2.0、SY《Confusion Is Sex》y 2.0、Contortions《Buy》y 0.6），落冷冽的只有 Phew《Phew》、Erase Errata《Other Animals》→ 策展改以乾、尖、原聲或乾淨吉他的 Downtown 即興與後裔為主。
- **主線汰 7**：Ut《In Gut's House》（y 0.2 貼邊、雙吉他破音）、The Scissor Girls ×2 與 Lake of Dracula（破音吉他＋鼓，y 貼邊，同 mc2 判重先例）、Storm and Stress《Under Thunder and Fluorescent Light》（留白多，x 貼邊）、Christian Marclay《More Encores》（可辨旋律片段，z 恐回暖）、Ahleuchatistas《On the Culture Industry》（同人三張勻量）。
- 掛名：《Yankees》主名 Derek Bailey, George Lewis & John Zorn（Bailey 為 mc28 藝人）、《Attention Span》主名 Ostertag（Frith 為 mc33 藝人），都是三人共同署名作、池中無，收。
- **MB flag**：Mars & DNA《John Gavanti: An Operetta》MB release-group 無日期與廠牌；年份照維基 1980（Trouser Press 記 1981），研究層核對。
- 跨工作階段去重：對 origin 近三天 60 個 `claude/*` 分支的 seed＋卡單＋curation 去重 0 撞。

## 研究 e 組
- 19681 Fresques sur les parois secrètes du crâne 的 label／country 推翻：Sickroom（2004）重發的是同名首作，Fresques 首發是法國 Ruminance RUM018（2003-01-21，Discogs），MB 另記美國 Frenetic FR016；建議 label 改 Ruminance、country fr。
- 19682 Ahleuchatistas《The Same and the Other》label 推翻：Cuneiform 不成立，首發 Noreaster Failed Industries nfi-007（2004），Tzadik TZ 8047 為 2008 重發。
- 19683 Ahleuchatistas 兩張都是吉他／貝斯／鼓三人團（Discogs 演奏名單），Discogs 標 Noise／Punk，吉他音色無來源：moodGuess 存疑（重／躁風險），建議試聽。Cheval de Frise 兩張無貝斯，樂評提「黑暗金屬」但無失真牆證據，Fresques 僅標弱存疑。
- 19684 Cheval de Frise 首作卡單 label 空白，可填 Sonore（SON-10，2000，法國）。

## 研究 c 組
- 19661 Zeena Parkins《Nightmare Alley》推翻策展層「鼓機」：Discogs 人員表只有 Parkins 電豎琴與原聲豎琴（無 Ikue Mori、無鼓機），純獨奏；Soundohm 稱在刺耳噪音／回授與安靜豎琴即興間移動，15 首多為 1–3 分鐘小品。moodGuess 存疑（靜風險：x 可能不到 3.0；暖風險：原聲豎琴輕撥）。Table of the Elements 只寫 TOTE 1（週期表第 1 號）與 1993 創廠，不寫「廠牌第一張」。
- 19662 David Moss《Full House》推翻策展層「與 Zorn、Frith、Cora 的二／三重奏」：Discogs 人員僅 Moss（鼓／打擊／人聲／Bertoia 聲音雕塑／水／小電子）、Arto Lindsay（人聲、吉他，寫四首）、Christian Marclay（四台唱盤）；1983-10／1984-01 於 Bisi 錄音室，4 首多軌、其餘現場。moodGuess 存疑（靜：19 首平均不到 3 分鐘、共鳴物件）。
- 19663 Elliott Sharp《Nots》：12 首有四位鼓手（含 Phillip Wilson）、Laswell 貝斯（六首）、Olu Dara 短號，日本店家稱開場為帶龐克味 ska。moodGuess 存疑（重：鼓＋貝斯；暖：ska／短號）。年份：維基作品表 1981，Discogs／MB／Trouser Press 皆 1982 Glass，採 1982；A 面錄於 1980、B 面 1981。破音與留白無來源。
- 19664 Elliott Sharp《(T)here》實為**以現場錄音為主**（A1–B1 為 1983-05-29～06-01 捷克布爾諾與布拉格音樂會，B10–11 為紐約現場，B2–9 紐約 5/6/83）；B 面有 Noyes 鼓、Rick Brown 鼓。策展層「雙頸吉他」不成立（Discogs 只列無品吉他、低音單簧管、高音薩克斯風、人聲）。moodGuess 存疑（現場、y 偏低）。
- 19665 Elliott Sharp《Virtual Stance》是舞團（Nina Wiener and Dancers）委託的 LP：A 面單曲 21:18 取樣拼貼，B 面六首短曲；Previte 真鼓＋Sharp 鼓機＋雙頸 guitarbass。moodGuess 存疑（y：有鼓有低音，策展層「敲弦點描、乾」未證實）。
- 19666 John Zorn《Cobra》**一半現場**：第二張為 1985-10-21 RPI 現場（WRPI 錄），第一張 1986-05-09 Radio City 錄音室版。含 Hammond／DX7／Mirage、電子鼓；規則含「Ivesiean Trio」風格疊置。moodGuess 存疑（y 0.3–0.5、暖風險）；破音與低頻無來源。
- 19667 Tom Cora & David Moss《Cargo Cult Revival》身分對上（Rift RIFT 5，1983）；二重奏（大提琴＋打擊／人聲），無貝斯無吉他，Discogs「Live Mix」是否現場未明。靜風險中等，無曲長資料。
- 19668 未使用（c 組 7 張，保留）。
- 19669 研究 c 組方法：WebSearch 只用 4 次（c＋d 合計）；AllMusic、jazzmusicarchives、Pitchfork 皆 403／不可取，樂評以 Trouser Press、Soundohm、維基、Discogs 備註代替；facts 全寫來源核實版本，疑點一律進 notes。
- 19670 未使用。

## 研究 a 組
- 19641 Phew《New Decade》（Mute 2021-10-22）**moodGuess 明顯存疑**：策展寫「急促合成器脈衝」，樂評（Beats Per Minute、Mute 目錄）是慢的 drone，「sombre」，有疏朗留白段與低處溫暖爆發，偏靜、x 恐不到 3.0；建議主線降級或汰換。
- 19642 Phew《A New World》**廠牌推翻**：MB 與 Bandcamp Daily 都是 felicity（日本，2015-12-02），Bereket 是 Phew 自家廠牌（2017–18 的《Voice Hardcore》），卡單 Bereket 疑誤。曲單含〈Chinese Rocks〉〈Hamabe no Uta〉同名曲、〈An Acoustic New World〉，且客座 John Dieterich 吉他，判暖與 x 風險；查不到是否翻奏，標存疑。
- 19643 Ut《Conviction》年份存疑：維基 1986、MB 與卡單 1985，維基單一來源；沿用卡單 1985 並註明。聲音面只有 AllMusic 一句，吉他破音查無，標 thin、判重風險。
- 19644 Mars & DNA《John Gavanti》年份定 1980：Cunningham 自述（Hyrax 1980）加維基，Trouser Press 1981 為少數說法，主線 flag 結案。低音號、次中音號、長號有低頻，歌劇人聲有句型，y／暖度可能略高於預估。
- 19645 Arto Lindsay Trio《Aggregates 1-26》：Gibbs（貝斯）與 Bowne（鼓）確實在場，Forced Exposure 稱較具攻擊性，判重風險；策展層疑點成立。搜尋有說法提到 Joey Baron，維基與 Forced Exposure 皆為 Bowne，以 Bowne 為準。
- 19646 Zorn《Pool》（Parachute，1980-03-01 Sorcerer Sound）五人無鼓組無吉他；50 分的遊戲式作品必有稀疏段，判靜風險中等。
- 19647 Zorn《Archery》**年份**：維基 1982、MB 與卡單 1981，錄音 1981-09-12/13 OAO；沿用 1981 並註明。編制 11 人含 Bill Laswell 貝斯與 David Moss 鼓、兩把吉他，判重風險；165 分鐘含大量稀疏段，判靜風險。
- 19648 研究 a 組方法：WebSearch 與 b 組合計 4 次；維基 API 被 proxy 限流，改用 WebFetch 讀維基頁；無專文樂評者（Ut、Aggregates、A New World）標 thin。
- 19649–19650 未使用。

## 研究 b 組
- 19651 Yankees 年份存疑：維基 1983（Celluloid LP），MB 與卡單 1982；沿用卡單並註明。三人（吉他、長號、薩克斯風）無鼓無貝斯；AllMusic 用「subtle」，判靜風險中等。吉他是原聲或電聲查無。
- 19652 Locus Solus（Rift 1983）**moodGuess 存疑（判重）**：Lindsay 吉他加 Fier／Miller／Mori 鼓，Penguin 以 Hüsker Dü 的三重奏美學相比、稱「fierce」；無貝斯、吉他是否破音查無證據。維基 Tzadik 1997、MB 1995，不影響卡年。
- 19653 Classic Guide Vol. One／Two：維基把兩集當一個「compilation」條目，原版第一集僅 2 首、第二集 7 首，各為獨立專輯；兩張卡不重複，Tzadik 1996 合併 CD 另計。聲音面維基無描述，標 thin，判靜風險（獨奏氣音與停頓）。
- 19654 Classic Guide Vol. Two 的曲名皆日本音樂人名（Kondo Toshinori、Togawa Jun、Mori Ikue、Yano Akiko 等），維基只列 Zorn 一人，不能確認是獨奏獻曲或與這些人的二重奏，標 uncertain；主線若需確認請查 Tzadik 目錄。
- 19655 Ganryu Island：錄音 1984-11-23，維基內文 1984 與資訊欄 1985 矛盾，沿用卡單 1985。只有薩克斯風與三味線，三味線提供穩定節拍，無鼓貝斯吉他，判靜風險低。
- 19656 **School 推翻策展層**：「吉他刮弦與吹嘴二重奏」不符。內容為 Zorn〈Lacrosse〉1978-06-10 WKCR 錄音的第 3、4、6 版，五人（Abbott、Bradfield、Chadbourne、LaDonna Smith、Zorn）演出，含小提琴與打擊；MB 無日期廠牌，以維基／Parachute Years 頁為準，Tzadik 2000《Lacrosse》CD 一節來自搜尋摘要，標 uncertain。建議主線評估是否仍落冷冽。
- 19657 Environment for Sextet（Ictus 1979）：身分對上（MB 4 軌，六人），但無維基專頁與樂評，聲音事實只有編制，標 thin；兩段獨奏是誰未查證，判靜風險。
- 19658 研究 b 組方法：WebSearch 與 a 組合計 4 次（Phew 兩張、School、Aggregates 各一）；全部 src 為完整 https。
- 19659–19660 未使用。

## 研究 d 組
- 19671 Ostertag with Zorn with Frith《Attention Span》：Zorn、Frith 是 1989-09 Knitting Factory 的錄音素材，由 Ostertag 取樣機重彈；Ostertag 內頁自述動態範圍極大、〈Sleepless〉要開大聲才聽得到安靜聲音，moodGuess 存疑（靜風險；x 恐 <3.0）。Discogs 兩首長曲（23:19＋19:57）vs 維基 32 段，寫作層擇一不混。
- 19672 Bob Ostertag《Say No More》：兩首長篇（21:01＋17:22），Minton 人聲、Dresser 貝斯、Baron／Hemingway 打擊，被剪接重組。MB 無廠牌、地區 GB，維基與 RecRec 皆瑞士（ReCDec 59），建議 country 改 ch、label 填 RecRec Music；年份 1993 照維基（MB flag 已解）。moodGuess 存疑（重：貝斯＋打擊）。
- 19673 Storm and Stress 首作：貝斯 Eric Emm（非創團 Draguns）、Albini 錄音、七首四首逾 10 分鐘；第 4 首〈Micah Gaugh Sings All Is All〉有人聲與鋼琴，**暖風險**；策展層「低頻極少」無來源，moodGuess 存疑（重）。
- 19674 Lithics 兩張皆 thin：Bandcamp 只有曲目、錄音（Borrowed Floors：2015-11、Evan Mersky、Red Lantern）與廠方文案，無樂手分工、無獨立樂評；sound 欄為推估，鉤子層勿據以寫細節。Mating Surfaces 不寫「第幾張」（Bandcamp 稱第二張全長，與 Discogs 發行序矛盾）。moodGuess 存疑（重／破音無證）。
- 19675 Zs《Zs》（2003）：六人（雙薩克斯、雙吉他、雙鼓）、托盤印「請用能忍受的最大音量聽」；卡單 label 空白，填 Troubleman Unlimited（TMU 117）。moodGuess 存疑（重／破音）。Qobuz 簡介把《Arms》稱「全長首作」，與 2003 年《Zs》衝突，以 Discogs／維基為準。
- 19676 Zs《Arms》：Colin Marston 於 The Pain Cave 錄音（2006-05），兩把電吉他（其一兼男中音吉他）＋雙鼓＋次中音薩克斯風，四人皆有人聲；Howard Stern 2007-11 事件記入。moodGuess 存疑（重／破音；另靜風險：〈Woodworking〉開頭、〈I Can't Concentrate〉近 11 分）。CD 為 Planaria，LP 為 Gilgongo。
- 19677 未使用（d 組 7 張，保留）。
- 19678 WebSearch 合計 4 次（Lithics、Zs Arms、Sharp Nots、Parkins Nightmare Alley），其中 Lithics 搜尋無果；AllMusic／Pitchfork／jazzmusicarchives 皆不可取。
- 19679 未使用。
- 19680 未使用。

## 主線：研究後汰換（不佔條號）
- 研究層聲音與 moodGuess 不符，直接汰 12（卡單、研究稿、`pick.json` 同步移除，32 → 20）：
  - 判重（鼓組＋貝斯／破音）：John Zorn《Locus Solus》（三位鼓手、fierce）、《Archery》（11 人含 Laswell 貝斯、Moss 鼓、兩把吉他）、Arto Lindsay Trio《Aggregates 1-26》（Gibbs 貝斯＋Bowne 鼓、攻擊性）、Elliott Sharp《Nots》（四位鼓手＋Laswell）、《Virtual Stance》（Previte 真鼓＋鼓機＋貝斯吉他）、Storm and Stress 首作（貝斯、Albini、長曲，另有人聲鋼琴歌判暖）、Zs《Arms》（雙鼓雙吉他＋男中音吉他）、Ahleuchatistas 兩張（完整節奏組、Discogs 標 Noise／Punk）。
  - 判靜：Phew《New Decade》（慢 drone、sombre、留白）；《A New World》（原聲段、兩首同名曲疑翻奏，池中 Phew x 3.2 貼邊）。
  - 現場：Elliott Sharp《(T)here》（大半 1983 布爾諾、布拉格現場）。
- 留下但存疑、交評分裁定：Zorn《Pool》《Classic Guide》兩集（獨奏／稀疏段判靜風險）、《Yankees》（subtle）、《Cobra》（第二張 1985 RPI 現場，比照 Braxton《Dortmund》收）、《School》（實為五人〈Lacrosse〉電台錄音）、Ostertag《Attention Span》（動態極大）、Zeena Parkins《Nightmare Alley》（純電豎琴獨奏，噪音回授與安靜段交替）、Ut《Conviction》（破音查無）、Lithics 兩張（thin）。
- 研究推翻照研究稿：《John Gavanti》年份 1980（Cunningham 自述＋維基，Hyrax），MB flag 結案；Moss《Full House》人員是 Moss、Arto Lindsay、Marclay；Parkins 無鼓機；Cheval de Frise《Fresques》首發 Ruminance（法國）、首作 Sonore、Zs 首作 Troubleman Unlimited、Ostertag《Say No More》RecRec Music（瑞士）——卡單已改。
- qa-batch research：20 張 key 一致、全過。

## 鉤子層（d–e）
- **19696** 交件：`desc-tools/batches/hooks/add-20261023-mc36-hooks-d.json`（5）、`-hooks-e.json`（2），key 逐字照研究稿、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（d3、d4 Lithics）。逐筆（預算／hook 加權／hook 原始字元）：d1 Attention Span 226／25.5／30、d2 Say No More 230／24／24、d3 Borrowed Floors 154／22／28（thin）、d4 Mating Surfaces 167／23／23（thin）、d5 Zs 230／22.5／24、e1 Cheval de Frise 230／22／22、e2 Fresques 214／22／26。初稿 6 張超標（245–312），整格捨去：d1 Mills College 錄音與曲目兩長篇、d2 曲序打擊分工與 Wojnarowicz 封面、d3 成員名單與最短曲、d5 六人逐名與〈Mimesis〉曲長、e1 2004 Sickroom 重發、e2 2004 解散與遺作迷你專輯（同時是與作品綁定不明的後續事件）及 2023 黑膠。壓完回核 hook 依賴：d1 兩位同行在 g1、d2 分頭錄音再剪接在 g2、d4 廠方文案在 g1／g3、e1 法國二人組在 g1、e2〈IX〉在 g1；d3、d5 hook 自帶事實。媒體名、樂評人名與媒體評分不進 note（Say No More 的評語寫成「樂評稱」、Mating Surfaces 的 Gibbon 引語寫成「有評語」、Zs 的《紐約時報》一句不指派）。Lithics 兩張照研究層：聲音面只寫曲長／廠方原句，不寫第幾張。
- **19697** 骨架歸屬（7 張 7 條；只有擁有者寫歸屬句）：d1＝淡出多年後被同行拉回音樂（記者十年→Frith 邀回）＋取樣機重彈朋友的現場素材；d2＝從未同場的虛擬合奏（各自錄音、軟體剪成樂團）；d3＝地方場景（波特蘭小錄音室＋小廠牌，二十多分鐘十首）；d4＝廠方文案定調的「十二段片段」；d5＝學院派與街頭的交會（Manhattan School of Music 同學玩 no wave／噪音）＋托盤上的音量叮嚀；e1＝捨掉貝斯、以接擴大器的古典吉他頂上（樂器替換）；e2＝十年前的四軌舊帶收進新作。hook 四型：人物定調 d1、e1／場景 d2、e2／斷言 d3、d4／懸疑 d5（以托盤叮嚀起、note 收在發行）。開頭前四字與全 hooks 目錄既有 hook 皆互異（初稿 e2「第 9 首」撞 c105、改稿「倒數第二」撞三筆，定稿以〈IX〉領句）。
- **19698** 「他／他們」引入法配表：**Ostertag ×2 分軸**——d1 帶生平（hook 名字直接領句；1980 年代記者、1988 年 Frith 邀回），d2 帶錄音細節（生年與出生地領句：1957 年新墨西哥州；早期數位音訊工作站剪接）。**Lithics ×2**——d3 城市（奧勒岡州波特蘭）、d4 廠牌（Kill Rock Stars，「後龐克樂團 Lithics」）。**Cheval de Frise ×2**——e1 兩人名字直接領句（帶招牌古典吉他），e2 國籍與編制（「這支法國雙人團」，帶錄音地與舊帶）。第二句句型（7 種）：d1 樂器（中音薩克斯風／吉他兩人）、d2 生年與出生地、d3 城市、d4 廠牌、d5 創團者、e1 兩位成員名字、e2 國籍與編制。「日」後一字：d4 推、e2 首，其餘只寫到年月。
- **19699** 自查：hook 之間中文 4-gram（本組 7 張對全 hooks 目錄既有 hook）0 條（初稿「即興樂手」×2、「錄下即興」、「各錄各的」×2、「剪接成一」、「二人組把」、「用四軌錄」「錄音機錄」「機錄下的」已改）；本組 hook 對本批 note 只剩樂器名「尼龍弦吉他」（e1 hook × e2 note，專名不算）；note 之間只剩「薩克斯風」。hook 與自己 note 無 4-gram 重複。a–c 尚未交件，跨組 4-gram 待其交件後由主線重跑。
- **19700** 腳本：`node qa-batch.mjs hooks add-20261023-mc36`：d、e 無標記（僅報 a、b、c 缺檔）；`node chk-hook-crossgroup.mjs add-20261023-mc36`：2 組 7 張全部通過 ✓（hook 加權 22–25.5，a–c 交件後需重跑）。

## 鉤子層（a–c）
- **19691** 交件：`desc-tools/batches/hooks/add-20261023-mc36-hooks-a.json`（3）、`-hooks-b.json`（6）、`-hooks-c.json`（4），共 13 張，key 逐字照研究稿、順序不變。公式照 1793-B：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`；full 上限 230、thin 上限 170（研究稿 status thin：Ut、Classic Guide 兩集、School、Environment）。逐筆（預算／hook 加權／hook 原始字元）：a1 John Gavanti 230／24／24、a2 Conviction 165／23.5／28（thin）、a3 Pool 225／25／25、b1 Yankees 225／16／16、b2 Classic Guide One 160／20／20（thin）、b3 Classic Guide Two 170／24／29（thin）、b4 Ganryu Island 210／23／23、b5 School 168／18／18（thin）、b6 Environment for Sextet 168／20／20（thin）、c1 Cobra 229／19／19、c2 Full House 229／17／19、c3 Cargo Cult Revival 222／17.5／22、c4 Nightmare Alley 214／23／23。初稿 12 張超標（176–356），整格捨去：Gavanti 樂評引語、Burg 與 Crane 分工、3000 張；Ut 9 首曲長；Pool〈Hockey〉與 Stockhausen／AACM 取法；Yankees 曲長、製作人；CG2 近藤等則／森郁恵圈內一格、Rothenberg；Ganryu 1998 Tzadik 增收；School 三個版本號、Zorn 點名 Bradfield；Environment 曲目軌數；Cobra TSR 兵棋曲名、Downtown 延伸技法、瑞士、錄音室細部人員；Full House 最長曲、物件清單、作曲分配；Cargo 師承人名、曲名第二首；Nightmare Baby Monster、David Shea。壓完回核：13 張 hook 依賴皆在 g1／g2（School 的「五位」在 g2、Pool 的樂器在 g2，其餘 g1）。媒體名與媒體評分一律不進 note（Yankees 的評語寫「樂評說」；Trouser Press、AllMusic、企鵝、Spin 全部不指派）。Tom Cora 1998 辭世與本盤皆無綁定，屬與作品無關的後續事件，Environment／Cargo 兩張都不帶。森郁恵照規則寫漢字（研究稿作 Ikue Mori），CG2 曲名〈Mori Ikue〉照原文。
- **19692** 骨架歸屬（13 張 13 條；只有擁有者寫歸屬句）：Gavanti＝改寫古典歌劇（no wave 歌劇＋樂手頭一回碰弦樂）；Conviction＝移居海外後才錄首作（紐約→倫敦、自家廠牌）；Pool＝遊戲式作品＋私人限量壓製、首張獨署名；Yankees＝兩位即興者第一次錄音相遇（棒球曲名）；CG1＝首批獨奏錄音（《五輪書》「地」）；CG2＝人名地名當曲名、合併再版略去一曲；Ganryu＝傳統樂器（三味線）對前衛即興、劍客決鬥地當專輯名；School＝掛名兩人、實為五人電台錄音；Environment＝海外小廠牌主人自己上場；Cobra＝指令卡與提示者（作曲者不演奏）；Full House＝一人打擊為主＋多軌與一次錄成混搭的短曲集；Cargo＝半路出家的樂器（大學才學大提琴）；Nightmare＝自己設計的樂器。與 d–e 的 7 條（19697）無重疊。共用素材分配：Parachute 限量 1000 張只給 Pool、Parachute 是 Chadbourne 自家廠牌只給 School；Tzadik 合併再版只給 CG2；宮本武藏人名只給 Ganryu（CG1 只寫《五輪書》）；Bisi／OAO 錄音室只在 CG1（錄音師）、Full House（Bisi 的錄音室）、Cargo（OAO），Yankees 只寫 OAO Studio 地點、OAO 沿革全不指派。hook 四型：斷言 Gavanti、Yankees、Cobra、Full House／場景 Pool、CG1、CG2、Ganryu、Nightmare／懸疑 School／人物定調 Ut、Environment、Cargo。
- **19693** 「他／她」引入法配表：**Zorn ×8**（a–c 內）——Pool 掛名欄（只署他一人，第一次）、CG1 樂器（紐約薩克斯風手的首批獨奏）、CG2 演奏欄（只列 Zorn）、Ganryu 搭檔並列（彈三味線的是佐藤通弘、吹奏的是 Zorn）、Yankees 身分三人並列、School 作曲欄（〈Lacrosse〉作者）、Environment 六人名單之一（由 Centazzo 領句）、Cobra 作曲家／提示者。**Moss ×2**：Full House 學歷（早年學打擊、Bill Dixon 的樂團）、Cargo 搭檔（打擊與人聲）。**Chadbourne ×2**：School 移居（1970 年代中期到紐約）、Environment 樂器。**Bradfield ×3**：Pool／School／Environment 都只帶名字或樂器。**Cora ×2**：Cargo 帶生平與師承、Environment 只帶樂器。**Lindsay、Marclay、Parkins** 跨 Cobra 只帶樂器，生平各歸本卡。第二句句型（13 種）：Gavanti「是」、Ut「成員為」、Pool「只署」、Yankees「由…演出」、CG1「這是」、CG2「只列」、Ganryu「…的是」、School「在…到」、Environment「早與」、Cobra「出自」、Full House「早年」、Cargo「搭檔是」、Nightmare「出身」；與 d–e 的「生年與出生地」「城市」「廠牌」等領句不撞（Full House 原定「1949 年生於紐約」，因 d2 用生年與出生地而改）。「日」後一字：Pool「，」、CG1「一」、Ganryu「進」、School「由」、Cobra「寫」；與 d4「推」、e2「首」互異，其餘只寫到年月。
- **19694** 自查：開頭前四字對全 hooks 目錄互異（初稿 Pool「薩克斯風」、Cargo「大提琴手」、CG1「封面只印」撞既有 hook，已改）。hook 之間中文 4-gram 全批 20 張只剩樂器名「薩克斯風」（Pool × Ganryu，專名不算）；初稿 Yankees「曲名，全」× CG2 已改。hook 對他卡 note 也只剩「薩克斯風」。hook 與自己 note 無逐字重複句。note 無否定校對痕跡（Cobra「不管彈什麼」「不理提示者」是規則內容）。
- **19695** 腳本：`node qa-batch.mjs hooks add-20261023-mc36`：全部通過 ✓（5 組 20 張）；`node chk-hook-crossgroup.mjs add-20261023-mc36`：全部通過 ✓（hook 加權 16–25.5、note 152–238）。

## 寫作層（writer-1）
- **19701** 交件：`desc-tools/batches/output/add-20261023-mc36-out-1.json` 10 張（key 逐字同序）。full 5：Gavanti 239、Pool 229、Yankees 234、Ganryu 215、Cobra 238；thin 5：Ut 174、CG1 169、CG2 157、School 180、Environment 168。初稿只有 Gavanti 248 超帶，整格捨去「設備」「攜手」「一路」等修飾壓到 239；未刪任何 note 項目。
- **19702** 第二句全照 note 指派（是／成員為／只署／由…演出／吹奏者是…這是／演奏欄只列／彈三味線的是／Chadbourne 移居紐約／早與／出自）。「日」後一字照鉤子層：Pool「，」、CG1「一」、Ganryu「進」、School「由」、Cobra「寫」；其餘只到年月，發行句動詞逐張不同（交給／由樂團自家…推出／在…把它發行／交由／次年由／的發行商是／由…發行／推出這張／發行雙 LP）。
- **19703** 小處理：Gavanti note 只寫 Cunningham，首次出現補上名 Mark（同一人，避免讀者不知是誰）；Cobra note 的「不管彈什麼」「不理提示者」改寫成正面句（「演什麼則由樂手自定」「自行其是、暫時脫離提示者」），守不寫否定句；Yankees 的「樂評說」寫成「樂評用…來形容它」，未具名媒體；CG2 hook 已點出青山通與 Mori Ikue，正文不再複述曲名，只寫錄音、發行、封面「水」與 Tzadik 略去〈Yano Akiko〉；Ut hook 已說搬到倫敦，正文只補年份（「全團在 1981 年動身」）。媒體名、名次、「據說／據傳」皆 0。
- **19704** 自掃（han() 中文 4-gram，對本檔＋writer-2 已交 out＋writer-2 hooks）：3 次以上只剩樂器名「薩克斯風」「克斯風手」與地名「布魯克林」。途中拆掉：「被形容為」×3（Yankees 改）、「有約分鐘」×3（對 Lithics hook，Ganryu 改「約莫」）、「月在紐約」（Ut 改「成軍於紐約」）、「兩人年月」（Ganryu 改「二重奏」）、「負責打擊」、「黑膠限量」、「即興吉他」、「是紐約的」、「紐約的錄」、「的錄音室」、「移居紐約」等 2 張殘片。
- **19705** 腳本：`node qa-batch.mjs out add-20261023-mc36`：out-1 157–239、out-2 165–238，thin 7 張皆 ≤180 ✓，20 張與卡單相符；`qa-check-research`（writer-1）全部通過 ✓；`fix-spacing` 標記 0。

## 寫作層（writer-2）
- **19706** 交件：`desc-tools/batches/output/add-20261023-mc36-out-2.json` 10 張（full 8：197–239；thin 2：Borrowed Floors 177、Mating Surfaces 164）。`qa-batch out`、`qa-check-research`、`fix-spacing` 皆 0 處；「據」字 grep 0；媒體名、媒體榜單名次 0。初稿 7 張超標（243–260），整格捨去：Full House〈Shout & Twist〉後的全長 47 分鐘、Cargo 的 Eugene 名、Attention「直到」子句、Zs「兩人之手」、Cheval「這是他們的同名專輯」子句與「底子裡」；Borrowed Floors 181 壓到 177（去「其中」「另外」）。
- **19707** 第二句全照鉤子層 19698／19693 配表：Full House 學歷（早年學打擊、Bill Dixon）、Cargo 搭檔（打擊兼人聲的 Moss）、Nightmare 出身（底特律、1984 移居紐約）、Attention 樂器領句（吹中音薩克斯風的是／彈吉他的是）、Say No More 生年與出生地、Borrowed 城市、Mating 廠牌、Zs 創團者、Cheval 兩人名字、Fresques 國籍與編制。「日」後一字照配：Mating「推」、Fresques「首」，其餘只寫到年月。
- **19708** 研究層禁區照辦：Attention 不寫曲數（兩首 vs 32 段擇一不混 → 都不寫）；Lithics 兩張不寫第幾張、聲音只寫曲長與廠方原句；Zs 不寫「首張全長」；Cargo／Full House 不寫 Cora 辭世；Nightmare 不寫「廠牌第一張」，只寫 TOTE 1 對應氫。轉述類改寫：Say No More「樂評稱」→「評論認為」；Mating「有評語說」→「嚴厲而可以跳舞，是它得到的評語」；Cheval「被形容為」→直述「聲音急切」；Fresques「發行商形容」→被動「被形容成」。Nightmare 刪掉「在噪音與受控回授之間來回」一句（與 hook 同義複述）。
- **19709** 自掃（han() 4-gram，本檔 10 張＋writer-1 out 10 張合掃）：3 張以上只剩專名／樂器名（布魯克林、薩克斯風、薩克斯風手）；跨檔 2 張殘片只剩樂器名「中音薩克斯風」「尼龍弦吉他」與 hook 原文「只有約分鐘」（Borrowed hook × Ganryu）。途中拆掉：負責打擊、搬到紐約、首約分鐘、兩人年月／年月在紐、廠牌在年、被形容為 ×3、黑膠限量張、這是他們的、分鐘左右、長約分鐘、的錄音室／在布魯克。
- **19710** Nightmare Alley 197 字為本檔最低的 full 卡（刪去 hook 複述句後），在區間內未補寫。writer-1 已先交件，合掃以其定稿為準；若 writer-1 再改動，請主線收件時重跑一次。

## 主線審稿（2026-10-23，雲端主線，20 張逐張讀過、對回研究稿）
- **19711** `desc2:John Zorn|The Classic Guide to Strategy - Volume Two`：hook「從青山通到 Mori Ikue」→「從青山ミチ到 Mori Ikue」。〈Aoyama Michi〉指 1960 年代日本歌手青山ミチ（Zorn 這七首曲名都是日本音樂人／藝人名，同盤〈Togawa Jun〉〈Mori Ikue〉〈Kondo Toshinori〉皆人名），研究稿誤譯成東京地名「青山通」。**已同步改研究稿 b、hooks-b、writer-1 input 與 out-1**。
- **19712** `desc2:Derek Bailey, George Lewis & John Zorn|Yankees`：刪「樂評用微妙、滑稽又爆笑來形容它」（單一樂評評價語）。
- **19713** `desc2:Bob Ostertag|Say No More`：刪「評論認為，自由即興與具體音樂之間的界線從此改變。」（單源評價句）。
- **19714** `desc2:Lithics|Mating Surfaces`：刪「嚴厲而可以跳舞，是它得到的評語」（單一樂評引語；刪後 148 字，thin 帶內）。
- 核過的事實：《John Gavanti》改寫《唐喬望尼》與 Sear Sound 真空管錄音、Ut 1981 遷倫敦、《Pool》Parachute 私壓 1000 張、《Yankees》Celluloid 1982、《Ganryu Island》1984-11-23 錄音、《School》實為五人〈Lacrosse〉WKCR 錄音、Cobra 1984-10-09 寫成與 hat ART 雙 LP、TOTE 1 對應氫、Zs 托盤叮嚀與兩回錄音日期。
- 其餘 16 張逐張審過，未改字。qa-batch research／hooks／out、qa-check-research（兩檔 0 標記）、fix-spacing 重跑全過。
