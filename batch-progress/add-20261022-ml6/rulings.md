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
