# add-20261022-ml6 裁定（情緒薄格策展線・恍惚：quiet storm／slow jam 80s–90s 二線＋70s 慢板靈魂弦樂盤）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；第 2 輪起收窄到大場景、3 個工作階段並行（`batch-progress/mood-cells-20261022/SCENES.md`「第 2 輪起的調整」），本批＝主場景 ml6＋可擴寫場景 ml7。交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**。
> 策展：`curation-ml6.json`（第一輪 18＋主線回饋後補 36＝54）→ `master-ml6.json`（MB 回查 54/54 釘住、人工 0；flag 1：Ray, Goodman & Brown《II》MB 首發 1992 為 CD 條目，原盤 1980）→ `pick.json`（45）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml6-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 14401–14410、b 14411–14420、c 14421–14430、d 14431–14440、e 14441–14450、鉤子 14451–14460、寫作 14461–14470、主線 14471–14480。**
---

## 主線策展（不佔條號）
- **邊距調整**：策展第一輪照 y ≥ 0.8 邊距只交 18 張，並把池中同藝人 y 0.6 判為「輕」。主線查池中 soul 已評分卡：慢板靈魂評分普遍落在 y 0.6–0.9（Isaac Hayes《Hot Buttered Soul》1.1、Barry & Glodean 0.9、Teddy 0.7、Freddie Jackson《Rock Me Tonight》0.6、Major Harris《My Way》0.8、Manhattans 0.6），**都落恍惚**（格線是 y≥0.5）。本場景 y 估 0.8 的邊距會把整個場景排光，故第二輪改為「同藝人池中盤 y≥0.5、x≤2.8、z≥0.3 即可提，moodGuess y≥0.7」，並排除池中判輕（y<0.3）的藝人（Brian McKnight、Babyface、Joe、H-Town、Shai、Johnny Gill、Glenn Jones、Stylistics、Delfonics、Intruders、Moments）。風險在 y，色溫與能量邊距寬（x 1.8–2.6、z 1.0–1.8）。
- **汰 9 張**（80 年代末數位製作、池中同藝人 y 偏低或貼線）：The Isley Brothers《Spend the Night》（池中 Isley 多 0.3–0.5）、Barry White《The Right Night & Barry White》《Staying Power》、Isaac Hayes《Love Attack》（池中 Hayes 70 年代末起 0–0.3）、Surface《3 Deep》、Tony Terry《Tony Terry》、After 7《Reflections》（池中《After 7》−0.4）、Regina Belle《All By Myself》、The Dells《Like It Is, Like It Was》（池中 Dells 唯一一張 −0.3；留 Charles Stepney 編曲兩張）。
- **留下的邊緣張**（研究層要特別寫聲音事實：混響、弦樂墊、低頻、數位或類比）：Regina Belle《Stay With Me》、Surface《2nd Wave》、Miki Howard、Silk、Gerald Levert、Keith Washington、Barry White《Put Me in Your Mix》《The Icon Is Love》、Teddy《Truly Blessed》、Love Unlimited（同製作人《Rhapsody in White》池中 −0.6）。
- `genres` 一律 `soul`。
- 研究層每支 WebSearch ≤3；facts 必含 2–3 條聲音事實；與 moodGuess 不符的標「moodGuess 存疑」——**特別是製作乾淨明亮、數位鼓機與 DX7 清脆、快歌多的**。


## 研究 d 組

- 14431：Silk《Silk》卡單 label「Keia」不對，維基與 MB 皆為 Elektra（Keia 是 Keith Sweat 旗下標籤）；建議卡單改 Elektra，發行日維基 1995-11-28、MB 1995-10-24，正文只寫 1995 年。
- 14432：Teddy Pendergrass《Truly Blessed》卡單 year 1990 疑為 MB 日期，維基與年終榜皆指 1991（3 月 5 日發行）；建議主線改 1991。
- 14433：Gloria Scott 的 curatorWhy「Barry White 製作的唯一專輯」不全對：Barry White 製作的 Casablanca 專輯確為此一張，但 Scott 2022 年另有 Acid Jazz 的《So Wonderful》。單曲年份兩源衝突（維基〈Just as Long as We're Together〉、lakeconews〈Too Much Lovemakin'〉），facts 只寫後者的倫敦重發。
- 14434：moodGuess 存疑（聲音來源不足以確認靜）：Gerald Levert《Groove On》（標題曲／〈Rock Me〉可能偏動感）、Silk《Silk》（前三首 Soulshock & Karlin 程式化製作，樂評只明講後半張偏 slow jam）、Teddy《Truly Blessed》（程式鼓與真人鼓並用、錄音地五處）、Major Harris《Jealousy》（Earl Young 鼓的費城律動）、Keith Washington（七位製作人）、Barry White（Linn Drum 與合成器偏數位）。無任何一張能確認「明顯相反」，主線視同邊緣張。
- 14435：Love Unlimited《In Heat》是人聲三重唱盤，與池中判輕的器樂盤《Rhapsody in White》結構不同，建議不因同製作人而連坐。
- 14436：Discogs API 直連可用；Wikipedia API 被限流，改用 WebFetch 讀條目。WebSearch 用 2 次（Gloria Scott、Silk）。

## 研究 e 組
- 14441：Surface《2nd Wave》moodGuess 嚴重存疑（中度以上）：人員表顯示 drum programming 貫穿 2–8 首、synth bass、orchestral hits（〈I Missed〉）、〈Black Shades〉有饒舌與電腦編程，只有 1、8 兩首配真弦樂，是 80 年代末數位明亮製作，y 恐不到 0.5；建議視評分結果汰換。
- 14442：Sylvia《Pillow Talk》moodGuess 存疑：小編制律動組（吉他、貝斯、鼓、康加鼓、鋼琴），九首多為 2–4 分鐘短曲，Christgau 稱「沒有製作門面」、Wikipedia 稱單曲為 medium dance number，弦樂墊不厚；y 0.7 恐偏樂觀。
- 14443：Margie Joseph《Sweet Surrender》推翻策展層場景標籤：非 Memphis／Stax 系，是 Atlantic、紐約 Atlantic Studios、Arif Mardin 製作（Stax／Volt 是她 1969–72）；全盤十首皆 3 分鐘上下、Discogs 標示各曲相連（mixed），moodGuess 中度存疑。
- 14444：輕度存疑：Billy Paul《When Love Is New》（A 面〈People Power〉舞曲榜 #14）、Manhattans《There's No Me Without You》與《After Midnight》（短曲多、單曲為中速；〈Shining Star〉非慢板）、Ray, Goodman & Brown《II》（重量感待評分）。Minnie Riperton、Peabo Bryson、Billy Paul 標題曲系與預估相符。
- 14445：Ray, Goodman & Brown《II》：MB first-release-date 1992 為 CD 條目屬實，原盤 Polydor 1980（Discogs master 151215，release 7867821）；facts 一律寫 1980。
- 14446：已避開的單一／未證實說法（寫作層勿用）：Minnie Riperton 頁「Quincy Jones 描述此計畫」（製作人欄無 Jones）；Manhattans「進 Columbia 後第一支大熱門」；Peabo Bryson〈I'm So Into You〉確切榜位（文字說 R&B #2、Singles 表欄位錯列，建議寫「前段」）；After Midnight 葛萊美僅知「得獎」，類別未取得來源。
- 14447：Wikipedia API 被限流，改以 curl 抓條目 HTML 轉文字；AllMusic 403。Discogs API、MB API 可用。WebSearch 用 1 次（Manhattans 專輯）。

## 研究 c 組
- **14421**（Prime of My Life）：〈Don't Wanna Change the World〉是 New Jack Swing 快歌，另兩首 R&B 前十單曲節奏未確認；moodGuess 輕度存疑，不推翻、交主線聽樣。製作人名單只見於搜尋摘要，不寫入 facts。
- **14422**（Phyllis Hyman 自名首張）：製作班底是 Buddah 紐約的 Larry Alexander／Jerry Peters／John Davis，並非 Gamble-Huff 系，場景標籤「費城弦樂慢盤」不精確；年份、廠牌不動，風格近費城弦樂故仍可留，主線視情況修。
- **14423**（Teddy It's Time for Love）：發行日 MB 9 月 11 日、維基 9 月 2 日不一致，facts 兩者並列；弦樂墊與 Bobby Martin 編曲無來源，不寫。

## 研究 b 組
- 14411：Rotary Connection《Dinner Music》moodGuess 嚴重存疑（中度以上）：Discogs 歸 Rock／Psychedelic／Experimental，15 首含 5 首不到 1 分鐘的過場、民謠鄉村與電子實驗，AllMusic 稱其「一串離題」，兩首為翻唱；Discogs 人員表無任何樂手，找不到弦樂與豎琴來源。建議視評分結果汰換。製作人署名 Discogs（Stepney）與維基（Marshall Chess 與 Stepney）不一致，facts 並列。
- 14412：Jon Lucien《Song for My Lady》moodGuess 中度存疑：Discogs 人員表無弦樂手，只有鍵盤、鋼琴、合成器、電吉他、雙貝斯、雙鼓與多位打擊，曲目含〈Dindi〉〈Maiden Voyage〉，偏爵士律動而非弦樂靈魂；「電鋼」無來源。MB 2011 同名條目未另查，不影響 1975 原盤。
- 14413：Jon Lucien《Rashida》status 標 thin（Discogs 版本頁無人員表、維基只有生平）；curatorWhy「RCA 首張」不對，首張是 1970 年《I Am Now》，本盤是第二張，建議主線改文案；y 0.8 恐偏樂觀（7 首不到 4 分鐘、風格列森巴巴薩諾瓦騷沙）。
- 14414：Jon Lucien《Mind's Eye》輕度到中度存疑：人員表有完整鼓組、康加鼓與兩位打擊，10 首中 5 首不到 3 分鐘，y 可能偏低；僅 Grusin 指揮管弦樂一條旁證支持「管弦墊」。
- 14415：David Porter《…Into a Real Thing》年份兩說（MB 與 Discogs 1971，Ace 重發報導 1970），維持卡單 1971，正文可迴避年份；moodGuess 輕度到中度存疑（原曲 Hang On Sloopy 為中快板，長達 11 分鐘；全張 6 首、非 Hayes 式整張慢板）。報導稱專輯進 R&B 前十名，單一來源不寫。
- 14416：The Dells《Freedom Means》輕度存疑：無逐首速度，〈Make It With You〉〈Free And Easy〉曲名偏輕快，x 可能 2.6 以上；curatorWhy「Stepney 編曲期最後一張」查無來源，不寫（1972 年尚有兩張 Stepney 製作的 Dells 專輯）。Discogs 盤名為《Freedom Means....》，沿用 MB 的《Freedom Means》。
- 14417：Discogs API 直連可用；維基 API 被限流，改用 WebFetch，部分專輯頁 404（Freedom Means、David Porter 等無獨立條目，改以 Discogs 與 theseconddisc 報導為主）。WebSearch 本支用 3 次（Porter、Rotary Connection、Dells）。

## 主線裁定（研究層交件後，2026-10-23）
- **14471**：照研究層的聲音事實汰 5 張（卡單與研究 a–e 檔已移除，原卡存 `dropped-cards.json`）：Surface《2nd Wave》（鼓機程式貫穿、synth bass、orchestral hits，80 年代末數位明亮，質地判輕）、Sylvia《Pillow Talk》（小編制律動組、2–4 分鐘短曲、沒有弦樂墊）、Isaac Hayes《Branded》（funk 推進，樂評點名 propulsive／furious，只有三首慢歌）、Rotary Connection《Dinner Music》（民謠鄉村加電子實驗、5 首不到 1 分鐘，不是弦樂慢盤）、Jon Lucien《Song for My Lady》（人員表無弦樂、偏爵士與巴薩諾瓦，質地判輕；同藝人留兩張）。
- **14472**：留下但標存疑（池中同型慢板靈魂經質地尺改判後 y 0.6–1.1，評分照聲音打）：Will Downing 兩張、Barry White《The Icon Is Love》《Is This Whatcha Wont?》《Stone Gon'》、Marvin Gaye《Vulnerable》、Billy Paul《When Love Is New》、Manhattans 兩張、Margie Joseph《Sweet Surrender》（池中同為 Mardin 製作的《Margie Joseph》改判 0.6）、Peabo Bryson、Ray, Goodman & Brown《II》、Teddy《Truly Blessed》、Gerald Levert、Silk、Keith Washington、Major Harris、Phyllis Hyman《Prime of My Life》、Jon Lucien《Rashida》《Mind's Eye》、David Porter、Dells。
- **14473**：照研究層改卡單：Silk《Silk》label Keia → Elektra；Teddy Pendergrass《Truly Blessed》year 1990 → 1991（維基 1991-03-05、年終榜 1991）。Margie Joseph《Sweet Surrender》是 Atlantic／Arif Mardin 紐約錄音（非 Memphis），Phyllis Hyman《Phyllis Hyman》是 Buddah 紐約班底（非費城），Jon Lucien《Rashida》不是 RCA 首張——寫作層照研究稿。
- **14474**：**全批 40 張**（策展 54、主線汰 9、研究汰 5）。候補已見底，照實上架。

## 鉤子層（a–c）
- **14451**（先行公告，給 d–e 那位避撞；交件時補全）骨架歸屬（a–c 24 張）：Sweetback＝名團缺主唱的其餘成員另組；A Dream Fulfilled＝和聲歌手出身、第三張才有商業成績（翻唱老歌重詮釋）；Moods＝同盤兩套班底、進當代爵士榜；Come Together as One＝英國比本土更買單（跨海合唱）；The Icon Is Love＝老將找新世代製作人的 1990 年代回歸；Vulnerable＝錄完擱置、兩個年代拼成；Stone Gon'＝同年第二張、新人獎提名；I've Got So Much to Give＝首張即定型（說話式情話）；Is This Whatcha Wont?＝連勝中斷（第一張沒進 R&B 前十）；Under the Influence＝器樂開場收尾夾三重唱；Tom Brock＝一生唯一專輯、被取樣挖出；Love Is Blue＝重錄自己的成名曲；Freedom Means＝編曲家接手製作（大編制名單）；David Porter＝幕後詞曲搭檔站到台前＋借外地錄音室班底；Rashida＝擺脫廠方包裝、全寫自己的歌；Mind's Eye＝島嶼出身的家學；A Moment＝廠牌動盪中多組製作人拼成；Stay With Me＝錄音橫跨四地（含茂宜島）；Miki Howard＝福音世家出身；Just Like the First Time＝長踞榜首；Don't Let Love Slip Away＝續作收斂；Prime of My Life＝遲來的第一首冠軍（生前最後一張）；Phyllis Hyman＝夜總會被發掘到首張；It's Time for Love＝事故前的最後一張。

## 鉤子層（d、e）
- **14456** 交件：`desc-tools/batches/hooks/add-20261022-ml6-hooks-d.json`（9）、`-hooks-e.json`（7），key 與順序照研究稿。公式照 hook-base 第 1793-B 條：`Array.from(hook)+Array.from(note) − 主故事： − 所有 → − 正文只寫上列各項。 − 這條骨架全批只走本張。`。逐筆（hook 原始字元／加權／預算）：d — Love Language 19／19／215、Truly Blessed 17／17／206、Groove On 21／19／214、Make Time for Love 22／19.5／229、Silk 24／20／224、Put Me in Your Mix 18／18／217、In Heat 28／22／228、What Am I Gonna Do 21／21／221、Jealousy 29／22／225；e — When Love Is New 24／24／204、Love Lives Forever 18／18／228、There's No Me Without You 17／17／216、After Midnight 25／20.5／225、II 19／19／212、Sweet Surrender 16／16／224、Crosswinds 28／21.5／226。初稿 16 張全超標（英文專名密），整格捨去：Love Language 的 Masser 作曲與車禍日期地點、Truly Blessed 合製人名單與 Albright、Groove On 的 LeVert 成軍與 Foster、Silk 的〈Don't Rush〉製作、In Heat 的 Gene Page 與曲長、Gloria 的德美銷路、Jealousy 的 Montana 與簽 Atlantic、Billy Paul 的 Gamble／Huff 與 Hot 100 末支、Manhattans 的出道廠牌與 30th Street、After Midnight 的組曲、RGB 的 Castellano、Crosswinds 的 A&M Studios、The Upsetters、管樂編排與標題曲長度。壓完後回核 hook 依賴格：Truly Blessed（箏與鼓程式）、Silk（後半張慢歌）、Keith（雙冠）原在 g3 以後，已前移到 g1／g2；16 張依賴全在 g1／g2。hook 事實自驗：Silk 原寫「後半張全交給慢歌」，研究稿只說「以 slow jam 為主」，改「留給慢歌」。
- **14457** 骨架歸屬（16 張 16 條，只在擁有的卡寫歸屬句）：Love Language＝傷後靠器具找回歌聲、換東家復出；Truly Blessed＝異國樂器與鼓程式混進情歌（錄音細節軸）；Groove On＝鄉村翻唱跨界；Make Time for Love＝首張專輯與首支單曲雙登 R&B 榜首；Silk＝冠軍金曲後的第二張、後半轉慢；Put Me in Your Mix＝兩位同代低音嗓長篇對唱；In Heat＝器樂名曲補詞；What Am I Gonna Do＝多年後異地重發走紅、本人遠在關島才得知；Jealousy＝接替進團後單飛＋費城 Sigma Sound 班底；When Love Is New＝被誤讀的歌；Love Lives Forever＝身後出版、人聲留下伴奏重做；There's No Me＝團員自寫多數曲目；After Midnight＝減員四重唱再進前五；RGB II＝法律糾紛被迫改名、以姓氏為團名；Sweet Surrender＝十首曲曲相連；Crosswinds＝藝名由來。對 a–c 第 14451 條避撞：Crosswinds 先擬「八首全由他作曲」撞 Stone Gon'、再擬「兩位編曲家分寫弦樂」撞 Stay With Me「兩路製作人分管」，定為藝名由來；Keith 原擬「替人寫冠軍曲再自己登頂」近 David Porter「幕後搭檔站到台前」，改雙冠、Hey Lover 只留一格；Love Language 不帶車禍日期地點（事故歸 c 組 It's Time for Love）；Put Me 不用「回歸」（歸 Icon Is Love），Linn Drum 只作聲音細節；Gloria 的 Barry White 只作背景（「借班底給外人」歸 Tom Brock）；In Heat 不帶 Glodean 婚姻與家族（歸 Under the Influence）。「多地／多製作人拼盤」d–e 不佔（Truly Blessed 五地、Groove On 七城、Keith 七製作人、After Midnight 四城全部不指派）。
- **14458**「他／她／他們」引入法（第二句句型一張一種）：Teddy Pendergrass 三張——Love Language＝聲音身分「這副沙啞的男中低音」、Truly Blessed＝名字直接領句＋序數「這時已出到第十一張」（避開 Is This Whatcha Wont? 的掛名欄），c 組 It's Time for Love 由 a–c 定、請避這兩種。The Manhattans 兩張——There's No Me＝出身地＋出道年＋主唱名、After Midnight＝名曲領句（〈Kiss and Say Goodbye〉雙榜冠軍）。Barry White（d 一張）＝廠牌關係「在 A&M 重新出發的」（a 組四張為身分／作曲欄／這是／掛名欄）。Love Unlimited（d）＝身分「替 Barry White 唱和聲的三人組」。其餘：Gerald＝親屬、Keith＝生年與出生地、Silk＝「是」判斷句（團體類型）、Gloria＝「這位歌手叫…」＋經歷、Major Harris＝出身地＋身分、Billy Paul＝樂種＋成名作、Minnie＝音域招牌、RGB＝三人姓氏＋樂種、Margie＝出生地＋唱詩班、Peabo＝樂種＋幕後經歷。16 張第二句全部補了樂種或身分。
- **14459** 日期「日」後一字：Truly Blessed 日開、Groove On 日推、Make Time for Love 日面、Put Me in Your Mix 日釋、Love Lives Forever 日辭；其餘 11 張只寫到年或月。與 a、c 已交比對後陸續改過：Put Me 原「日在」撞 Icon Is Love、再「日問」撞 Prime of My Life、Keith 原「日由」撞 I've Got So Much to Give、再「日出」撞 A Moment、Truly Blessed 原「日發」撞 Don't Let Love Slip Away；Love Language 原「日他」撞 It's Time for Love，連日期整格捨去。全批 40 張無重複。尺用 `/[年月]\s*\d{1,2}\s*日(.)/`。
- **14460** 自查：hook 之間中文 4-gram（全批 40 張）d–e 0 條（改掉「流行榜前」Groove On／After Midnight、「自己的歌」Gloria／Rashida）；開頭前四字：Put Me 原「Isaa」撞 David Porter，改 hook。hook 對他張 note：改 Keith hook（「首支單曲」撞 Groove On）、RGB note（「位小提琴」撞 Freedom Means hook）、Love Language note（「他在費城」撞 It's Time for Love hook）、Margie note（「的第二張」）。hook 對自己 note 逐字重複已清（Gloria、Billy Paul、In Heat 改措辭；Love Language「壓胸背心」為器物名保留）。note 無否定句（「沒有短於」兩處改「都在…以上」）。媒體名與媒體榜名次不指派（Keith 的顫音寫「樂評指出」）。`node qa-batch.mjs hooks add-20261022-ml6`：全部通過；`node chk-hook-crossgroup.mjs add-20261022-ml6`：5 組 40 張，唯一待判是 a 組 Moods 與 c 組 Just Like the First Time 開頭同為「R&B 」（不在 d–e）。
