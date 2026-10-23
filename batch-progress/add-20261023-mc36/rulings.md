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
