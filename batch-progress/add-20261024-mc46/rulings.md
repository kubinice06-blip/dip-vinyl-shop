# add-20261024-mc46 裁定（情緒薄格策展線・冷冽：現代室內樂尖細第三波）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 15 輪（全線最後一輪），本工作階段負責 mc46、md33。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc46 列；獨奏盤留給並行的 mc47），交接 `batch-progress/HANDOFF-mood-cells-line.md`。評分照 10-23 店主「體感標準」。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc46.json`（38 張，主場景見底）→ `master-mc46.json`（MB 回查 38/38 釘住；flag 皆為 artist credit 多掛作曲家，非撞）→ 主線汰 8、改掛名 30（`master-override-mc46.json`）→ `pick.json`（30）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261024-mc46-cards.json`（30 張；研究 a–e 各 6）。身分：MB 釘住 30、§1 人工 0。古典卡照 §0.7（mc32／mc43 先例）：artist＝演奏者／團體，盤名＝「作曲家: MB 正規名」（多作曲家合輯用「A / B: 標題」），另帶 composer 欄；MB 只掛作曲家或掛名分散的盤 artist 填作曲家。
> **預留：研究 a 22041–22050、b 22051–22060、c 22061–22070、d 22071–22080、e 22081–22090、鉤子 22091–22100、寫作 22101–22110、主線 22111–22120。**
---

## 主線策展（不佔條號）
- 策展 38 張（室內樂團 23、弦樂四重奏／三重奏 10、作曲家肖像 5）全數 MB 釘住；moodGuess x 3.3–4.0、y −0.8～0.0、z −1.7～−0.8。策展代理掛名寫成作曲家｜MB 標題，主線照 §0.7 全部改成演奏者｜「作曲家: 標題」（override fix 30 筆）。
- 去重：seed（改名後重跑）0 撞；對 origin `claude/mood-mc47-md34`（mc47 獨奏盤）、`claude/mood-mc44-md32` 的 curation 0 撞（mc47 只有 Kociuban《Penderecki / Xenakis》獨奏盤，不重疊）。
- **主線汰 8**：
  - 同作品池中已有（mc43 先例）：EIC／Boulez《Ligeti: Chamber Concerto…》（池有 de Leeuw 版）、Ensemble Modern／Eötvös《Pierrot Lunaire》（池有 Boulez 版）。
  - 池中同人判靜／判重：Babbitt《Quatrains…》（池中《Philomel》x 2.6 落平靜）、Penderecki 四重奏盤（池中《Threnody》y 1.8 落頹靡；x 估 3.4 貼邊）、Haas《Works for Ensemble》（池中《in vain》落頹靡；x 估 3.3）、Czernowin《Wintersongs》（池中《Heart Chamber》落頹靡；x 估 3.4）。
  - x 貼邊：Minguet《Rihm: String Quartets Vol. 4》（x 3.4，池中 Rihm《Jagden und Formen》y 0.6 判重；留 Arditti 版 III／VIII／V）、Aleph Gitarrenquartett Vol. 2（x 3.3）。
- 留但列研究重點：Liza Lim（池中《Extinction Events》x 2.6 落平靜，本盤 ELISION 密集刮擦型）、JACK《Zorn 四重奏全集》（池中 JACK《Xenakis》y 0.6 判重）、Widmann／Eötvös／Kagel／Dusapin／Donatoni（z 估 −0.8～−1.0，旋律或劇場性風險）、Czernowin《Shu Hai》（MB credit 含 Basel Sinfonietta，查是否大編制）、Kerschbaumer／Haubenstock-Ramati／Gerhard／Kagel／Jarrell（x 估 3.4）。

## 研究 d 組
- 22071：Hölszky《Hängebrücken》年份不明。MB／Discogs 記 2013（cpo 999 112-2，錄音 1990/91、WDR 製作），AllMusic 摘要記 1994-04；卡單年份沿用 2013、yearVerified 註明衝突。盤中含六位定音鼓手的《Jagt die Wölfe zurück!》（約 13 分），moodGuess 有判重風險。
- 22072：Widmann《Works for Ensemble》三曲中《Oktett》為舒伯特八重奏的對應作品、《Sieben Abgesänge》有女高音，旋律／抒情風險高，建議列汰換候選；AllMusic 日期 2010-06-29 與 MB 2010-04-15 不同，取 MB。
- 22073：Zorn 全集（JACK）官方文案稱《The Remedy of Fortune》浪漫、《Kol Nidre》為 Masada 旋律，z 恐不夠冷；其餘為區塊式與龐克強度，仍可落躁。
- 22074：Gadenstätter 三碟長篇（單曲約 30 分），Lachenmann 傳承可能稀疏極弱判靜，Sad Songs 含電吉他與電子音響。聲音僅編制推論，標 thin。
- 22075：Zimmermann 為 DG 1993 彙編（1969 慕尼黑＋1979 漢堡）；《Perspectives》確為雙鋼琴版（無磁帶），策展層「磁帶」疑慮解除。
- 22076：《Fall》正名為《Fall》，卡單盤名是組合名；Bettison《Livre des sauvages》為大型樂團、占全盤約一半，編制大於一般室內樂，判重／近管弦風險。

## 研究 a 組
- 22041：Cerha《String Quartets 1-3》moodGuess 存疑（偏暖、有旋律）：BBC Music 樂評稱調性未全放棄、有旋律碎片；作曲家自述第一號以中提琴旋律線變奏（阿拉伯 maqam）、第三號有 Elegie 與兩個 sehr ruhig 樂章；碟內另加 8 首弦樂六重奏短樂章（Hölderlin 片段）。年份 1999、廠牌 CPO（MB: Classic Produktion Osnabrück）補入，Hölderlin 曲的首演年因來源歧異不寫。
- 22042：Kerschbaumer《schraffur》moodGuess 存疑（稀疏長音型可能判靜；含電子）：唯一聲音描述是傳記語「寬廣、半透明的聲音空間」；kritzung II 含電子裝置；標題曲是 14 人編制加四分音手風琴。Kairos 小冊與官網 404、無獨立樂評，status thin。MB 2019-08 與 Europadisc 2019-10-25 的日期並列。
- 22043：Haubenstock-Ramati 作品集 moodGuess 存疑（實為現場錄音、點描稀疏可能判靜）：搜尋摘要引小冊稱 ORF 於 Wien Modern 2010-10-30 Semper-Depot 現場收錄（小冊今已 404，間接來源，只寫在 notes）；Multiple 4 為「輕盈、脆弱」；Konstellationen 為圖形譜、三段樂團版共約 33 分鐘。status thin。
- 22044：Ofenbauer 四重奏全集 moodGuess 強存疑（稀疏極弱／長音，很可能判靜）：第四樂章「近乎僵硬的緩慢」、類 Feldman、無顫音（senza espressione），第五樂章從「非常輕的刮擦」開始，最長一首約 48 分鐘，全套約 2 小時 23 分；只有第五樂章後段 col legno 密集。年份 2015 無誤（Europadisc 與 mica 另有 2015-05-11／2017 的分歧，不採）。
- 22045：Fuentes 四重奏盤聲音證據偏薄（Tempo 樂評在付費牆、AllMusic 403）；只有作曲家自述「萬花筒般的混亂」與標題意象，status thin。排除同名者（CCCB 頁的 1979 年巴塞隆納影像創作者不是這位 1975 年墨西哥市出生的作曲家）。
- 22046：Poppe《Rundfunk》推翻策展層編制：實為九台合成器（九電腦＋九鍵盤），非十餘件樂器；三個樂章性格迥異（I 稀疏到脈動、II 緩慢近靜止白噪音、III 刺耳鑽頭般密集），可能分別落靜／重，Hanlon 另聽出迪斯可與前衛搖滾迴響（偏暖風險）。建議主線依評分結果取捨。
- 22047：本組 6 張 facts 條數 10–11 條、皆附 https 來源；status：Cerha full、Kerschbaumer thin、Haubenstock-Ramati thin、Ofenbauer full、Fuentes thin、Poppe full。卡單 group a 實為 6 張（派工訊息寫 9 張，以卡單為準）。

## 研究 c 組
- 22061：Czernowin《Shu Hai》moodGuess 強存疑（實為大編制管弦＋實為現場）：第 2–5 軌約 30 分鐘為 Basel Sinfonietta／Kalitzke 管弦樂團加人聲與現場電子（Mode 稱「粗礪的管弦樂寫法」），第 6–7 軌約 31 分鐘為 2001 年 Biennale Bern 現場、單人人聲加電子；只有第 1 軌（ELISION 小編制）貼近預估。curatorRisk 疑慮屬實。Wikipedia 稱 studio album、Discogs 註 6–7 軌 live，以 Discogs（小冊）為準；管弦樂版作曲 2000–01 與錄音 1999 年對不上，facts 不寫該軌錄音年。建議主線汰換或接受風險。
- 22062：Wuorinen《Dante Trilogy (chamber version)》moodGuess 存疑（現場錄音＋旋律抒情）：《Great Procession》《River of Light》為 1999 年 Guggenheim 現場錄音（Knussen 指揮），《Mission of Virgil》1996 年兩架鋼琴非現場；樂評稱《River of Light》結尾有近似歌唱的旋律與肅穆靜段。MusicWeb 自身編制描述有矛盾（六重奏 vs 名單含兩鋼琴與巴松管），facts 只寫內文編制。
- 22063：Wuorinen《Six Trios》moodGuess 存疑（低頻銅管，判重風險）：圓號、長號、低音長號、大號、低音提琴，Positive Feedback 稱圓號有時壓過大提琴、風格俏皮外放。年份採 1993（MB／Discogs），評論稱 1997 的 Koch 版與之矛盾不採。
- 22064：Barrett《Dark Matter》moodGuess 存疑（電子／厚＋人聲劇場）：19 人編制、大量打擊、電吉他、現場與預錄電子、有演唱的女高音（古埃及文、Lucretius、Beckett），可能判重或劇場。年份推翻：卡單 2013（MB 2013-01-01），NMC 官方頁與 Discogs 皆 2012-11-12，建議卡片顯示 2012，請主線裁定。是否現場錄音官方頁未說明，不下判斷。
- 22065：Lim／Cassidy《wreck》moodGuess 存疑（現場錄音＋長音推測）：Cassidy 的 wreck（約 33 分鐘）為 2016 年 HCMF 現場錄音、雙小號協奏曲；Lim《How Forests Think》以笙獨奏，可能長音稀疏判靜（推測，無樂評）。wreck 只占全盤一首，簡介勿寫成只談 wreck。
- 22066：Davidovsky《Salvos》聲音證據偏薄（本盤專屬樂評查無，status thin）：《Simple Dances》六樂章為 Waltz／Sarabande／Marsch／Tango 等舞曲標題、每章 1–3 分鐘，《Cantione Sine Textu》為無詞女高音，可能比預估輕快或抒情。年份 MB 2004、Discogs 2003，卡單取 MB；兩處曲長不一致，facts 不寫單曲長度。
- 22067：本組 6 張 facts 各 9 條、皆附 https 來源；status：Davidovsky thin，其餘 full。WebSearch 用 12 次（Barrett 與 Davidovsky 專屬樂評搜尋命中率低，改走 NMC 官方店頁、Discogs API、MusicWeb、Positive Feedback、Mode 頁）。

## 研究 b 組
- 22051：Poppe《Prozession》moodGuess 存疑（偏重＋電子／搖滾手勢）：《Prozession》約 54 分鐘、大編制加龐大打擊組、持續節奏脈衝；《Fleisch》擬搖滾手勢並用 Moog，薩克斯風／電吉他／鋼琴／打擊，非弦樂主導；y 預估 −0.3 偏低，判重候選。身分無誤（Wergo WER 7401 2，2023）。
- 22052：Posadas／EIC 盤 moodGuess 存疑（厚密音塊＋電子）：《Oscuro abismo》廠方描述為低音域暗沉音塊加管樂複音聖詠加氣體質地；《Glossopoeia》含舞者、影像與電子。年份沿用 2010（Discogs 2010-06；Europadisc 列 2011-01-17）。無樂評，聲音證據僅一條音樂會介紹。
- 22053：Arditti／Rihm 盤首發年推翻：Discogs 5742530 顯示 1990 年 11 月作曲家在場錄音、1994 年 Montaigne MO 782001 首發，卡單 2000 是 MO 782134 再版；yearVerified 填 1994。moodGuess 存疑：第三號粗礪暴力與孤獨弱音器來回，動態極端（重／靜皆有風險）。
- 22054：Arditti／Gerhard 盤：Wikipedia 說 AEON 2010 年發行與 MB／Discogs 的 2013 衝突，以後者為準（2011 年 5 月巴塞隆納錄音）。moodGuess 存疑：第一號有伊比利頑固複節奏（暖偏風險）；第二號與 Chaconne 查無聲音描述，不寫推測。
- 22055：Arditti／Aperghis 盤性質：四位作曲家拼盤（Discogs 標題《From France》），含 Xenakis《Okho》（純打擊，三面 djembe 加大非洲鼓）與 Aperghis《Triangle carré》（弦樂四重奏加三位打擊手）。moodGuess 存疑（偏重偏暖，建議汰換候選）：全盤約三分之一為打擊；Okho 皮鼓低頻。錄音日期查無，Andrade 1990 年離團暗示錄音早於 1990。
- 22056：Arditti／Kagel 盤年份：MB 1991-09-27，Discogs 1990；錄音為 1989 年夏天科隆（WDR 製作）。status thin：這幾首四重奏的聲音描述查無（WebSearch 額度用盡），只確認 Kagel 風格劇場幽默；moodGuess 的 z 存疑未能證實。
- 22057：本組 6 張 facts 條數 11／11／10／11／10／9，皆附 https 來源；status：Kagel thin，其餘 full。WebSearch 3 次（Posadas、Poppe、Rihm 各一）。未推翻身分（6 張盤名、年份、廠牌皆對得上 MB／Discogs）。

## 研究 e 組
- 22081：EIC／Xenakis 盤身分無誤（Erato 2292-45770-2，1992）；Discogs 973962 補到錄音日期與地點（1990-04 至 1991-01，IRCAM 與 Notre-Dame du Liban）、各曲指揮與獨奏者（Boulez 指揮 Jalons、Tabachnik 指揮 Phlegra／Thalleïn、Sluchin 長號、Strauch 大提琴）。moodGuess 存疑：Keren、Nomos Alpha 是無伴奏獨奏（合計約 19 分鐘，近三成）；Thalleïn 官方解說稱沉思、無節拍，可能判靜。年份 1992 為 CD 首發，錄音 1990–91。
- 22082：Dusapin／Ars Nova 盤首發年 1997（MB，Salabert SCD 9701）；Discogs 只查到 2002 Montaigne／Naïve 再版（MO 782150），曲目同。moodGuess 存疑：含兩首人聲（Comœdia 女高音、Aks 女中音，約 17 分鐘），Aria 為單簧管獨奏加十三人；Attacca 為兩小號加定音鼓。ClassicsToday 頁抓不到全文，只引搜尋摘要的錄音音質與微分音評語。Fist／Hop' 作曲年來自 Discogs，未交叉驗證。
- 22083：Jarrell／Klangforum 盤 moodGuess 強存疑（實為現場錄音）：Discogs 載明 2004-06-11 在 IRCAM Espace de Projection 現場錄製；第三軌為六位獨唱人聲無伴奏約 12 分鐘，第二軌四聲部人聲加電子，人聲段合計約四成，x 3.4 貼邊，建議列為最先汰換候選。聲音樂評全查無（MusicWeb 404、AllMusic／Discogs 403），status thin。
- 22084：Donatoni／2e2m 盤錄音年實為 1985–89（1991 為 CD 年）；與 mc32 Alamari 盤曲目不重疊。moodGuess 存疑：維基作品表列 De près、L'ultima sera、Still 為女聲作品（約 30 分鐘，占四成），但 Discogs 演出者名單無任何歌手，未能證實；Fili 為長笛與鋼琴二重奏、Lumen 為六件樂器，皆稀疏；Feria 為五長笛五小號加管風琴。
- 22085：Wet Ink 盤：Discogs 把 Lines on Black 作曲誤記為 Ian Antonio（並把標題打成「Block」）；Wet Ink 官網顯示作者是兼任電子演奏的作曲者，即 Pluta，與卡單掛名相符。MB 無廠牌，Discogs 實體版為 Carrier Records（Carrier 048）。moodGuess 存疑：Lines on Black 含即興獨奏、人聲加電子與類比合成器固定媒體，稀疏段落可能判靜、電子厚度可能判重。
- 22086：Eötvös／Klangforum 盤 moodGuess 存疑：Steine 是 1994 年 Konzerthaus Wien 現場錄音，其餘 1999 年錄音室；Chinese Opera 約 28 位樂手含 Yamaha DX7 合成器與三位打擊手，偏厚；Shadows 碟上版本（演出名單像室內版）與 IRCAM 的樂團版不能對應，facts 只寫 IRCAM 條目所載並在 notes 註明；場景以調性中心命名，暖偏風險。
- 22087：本組 6 張 facts 條數 11／11／10／11／10／10，皆附 https 來源；status：Jarrell thin，其餘 full。未推翻身分。WebSearch 實際用了 5 次（超出每支 3 次上限：Xenakis 兩次、Dusapin 一次、Ars Nova 一次、Hop' 一次），其餘靠 WebFetch 與 Discogs／MB API。

## 主線研究後汰換（不佔條號；2026-10-24）
- 照 mc43 先例：**來源自己寫出現場錄音、厚重大編制／電子、人聲與抒情段、稀疏極弱的汰**；只是 thin 的留給評分驗收。**30 張汰 18**（存 `dropped-cards.json`／`dropped-research.json`）：
  - 現場錄音：Klangforum《Haubenstock-Ramati》（Wien Modern 2010 實況，研究 a）、《Wuorinen: Dante Trilogy》（Guggenheim 1999 實況，研究 c）、ELISION《Lim / Cassidy》（wreck 為 HCMF 2016 實況，研究 c）、Klangforum《Jarrell》（IRCAM 2004 實況＋人聲四成，研究 e）、Klangforum《Eötvös》（Steine 1994 實況、DX7＋三打擊、調性中心，研究 e）。
  - 大編制／電子／打擊判重：Czernowin《Shu Hai》（Basel Sinfonietta 管弦＋現場電子，研究 c）、Barrett《Dark Matter》（19 人、電吉他、電子、女高音，研究 c）、Poppe《Prozession》（大編制＋龐大打擊、Moog、電吉他，研究 b）、EIC《Posadas》（低音域暗沉音塊＋電子，研究 b）、Arditti《Aperghis / Mâche / Xenakis / Gaussin》（三成純打擊 djembe，研究 b）、Musikfabrik《Fall》（Bettison 大型樂團占半，研究 d）、Hölszky《Hängebrücken》（六定音鼓手，研究 d）、Wet Ink《Mincek / Pluta》（類比合成器固定媒體＋人聲電子，研究 e）。
  - 旋律／抒情：Collegium Novum《Widmann》（舒伯特八重奏對應作、女高音，研究 d）、Arditti《Cerha》（maqam 旋律線、Elegie、sehr ruhig，研究 a）。
  - 稀疏極弱／緩慢：Arditti《Ofenbauer》（「近乎僵硬的緩慢」、非常輕的刮擦，研究 a）、Kerschbaumer《schraffur》（半透明聲音空間＋電子，研究 a）、Gadenstätter《Semantical Investigations》（三小時、無樂評、電吉他段，研究 d）。
- 卡單更正（下游以研究稿為準）：Arditti《Rihm》年份 2000→**1994**（Montaigne MO 782001 首發，研究 b）；Arditti《Kagel》1991→**1990**（Discogs，研究 b）。
- 留 12（Fuentes、Poppe《Rundfunk》、Rihm、Gerhard、Kagel、Davidovsky、Wuorinen《Six Trios》、Zimmermann、JACK《Zorn》、EIC《Xenakis》、Dusapin、Donatoni）；《Rundfunk》九台合成器屬部分存疑，池中 Poppe《Interzone》落冷冽，交評分驗收。叫回策展代理補第二輪候補（每張附 copyQuote、限錄音室小編制無人聲無電子）。
