# c-161 主線裁定（研究層驗收）

## 第 1707 條（主線）：**c-161 研究兩組交件——37 張全 full、改判 0、facts 328 條 src 全過、QA 零警告**

| 組 | 張數 | facts | 紙本 | Discogs | **廠牌官網** | Apple | AllMusic | 維基 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| a | 19 | 179 | 10 | **19／19** | ⚠⚠ **12／19** | 0（只用於封面與救援） | **0** | 8 |
| b | 18 | 149 | 6 | **18／18** | **6／18** | 7 | **0** | 8 |

⚠⚠ **`bluenote.com/artist/<藝人>/` 從「連續九組 0」變成本線第一與第二高的一格**（12／19 與 6／18）。
**a 組那 15 條 facts 裡有五個「有 src 的序數／年份」**（Burrell「2006 年錄、隔年才發」、Darius 的四張作品序、
Loueke「first Blue Note album」、Parks「label debut」、Elias 的 2007）——**正是第 1620-N 條要的那種東西。**
**→ 這一格的權重要正式提高，排在紙本之前。** ⚠ 不在 bluenote.com 上的藝人會 301／404（Truffaz、China Moses、
Trijntje、quasimode、Hindi Zahra、Fresu、Avishai Cohen），**那不是失敗，是那一頁不存在。**
⚠ **AllMusic 連第十組 0，本次整站 Cloudflare 403；allaboutjazz 與 jazztimes 同樣 403。**

**年份**：兩組合計改判 0，**但把策展層的三筆改判各補到四～五層獨立證據**
——⚠ **值得記的是「兩張日本盤其實不需要目錄號序列」**：
《Bossa Nova Stories》有 Discogs 日版 ＋ **Apple 日本店面 `720519524`（《私のボサ・ノヴァ》）的 `releaseDate` 與 ℗** ＋ 英文維基三層；
《Plays Live》有 Discogs 日版 ＋ Apple jp／gb 兩個店面。
**→ Apple 的日本店面條目（含日文盤名）是定日版年份的第四種來源，比目錄號序列快。**

## 第 1708 條（主線，**裁定**）：**Erik Truffaz《Paris》取三碟合集的碟一當固定試聽**

單碟在十市場查無獨立條目，**但同年的三碟合集《Rendez-vous (Paris - Benares - Mexico)》(`1841638049`，
℗ 2008 Foufino Productions) 的碟一，逐軌就是本作完整九軌、曲序完全相同、九軌全有 `previewUrl`。**

**裁定：採用，`previewUrl` 強制取碟一第一軌〈Mr Wyatt〉**（第 472 條的做法）。理由：
1. **第 1067 條的錯碟關過得去**——**不是「另一張碟」，是同一張碟被裝進盒子裡**，逐軌驗過。
2. **第 646 條已掃**：全庫零張卡用這個 id；**三部曲的另兩張（Benares、Mexico）不在任何 slice 裡**，
   **Arkhangelsk 另有自己的 `1841955603`**——**不會撞。**
3. **替代方案是這張卡沒有試聽**，而它的音檔明明在架上。
⚠ **但要記一條限制**：**若日後 Benares 或 Mexico 進了任何 slice，那兩張不得再用這個 id**（第 646 條），
**只能走無串流卡。這個 id 已經被《Paris》佔走。**

## 第 1709 條（主線）：**c-161 串流 31 → 33／37；以及探測層漏抓的真正原因**

✅ **Eliane Elias《Something for You》→ `715617027`**（17 軌國際版，gb／br／de／fr／nl／it／ca 七市場 17／17 全有 preview）。
⚠⚠ **研究層診斷成「us 回 0 軌所以判 unavailable」——那只對了一半。**
**主線實測：探測層在八個市場都是 `0→0`（連候選都沒配到），根本沒走到 lookup 那一步。**
**真正的原因是 `titleOk`：卡片盤名「Something for You - Eliane Elias Sings & Plays Bill Evans」
vs Apple 的「Something for You」，長度差 38 > 8，直接不匹配**
——**這是第 1610 條第二層（副標的有無）的第四次應驗。**
⚠ **探測腳本本來就會在「配到碟但拿不到試聽」時換市場再跑**（程式裡有 `fallback` 那段），**那一段沒問題。**
**→ 主線自律：代理對腳本行為的診斷要自己驗一次再寫進裁定**（與第 1507-B 條同族）。

❌ **仍未 ready 4 張，三張是版權缺口、一張是新形狀**：
- **Ron Carter《Jazz & Bossa》**：藝人目錄 jp 174／us 150 張密集在架，
  **唯獨 Somethin' Else 那條線整段缺——《Dear Miles,》(2006)、《It's the Time》(2007)、本張 (2008) 三張連續都不在。**
- **China Moses《This One's for Dinah》**：Warner 三張與 2011 年後十張全在架，唯獨缺這張 Blue Note／EMI 盤。
- **quasimode《daybreak》**：⚠ **`apple-candidates.md` 那 7 個候選逐筆覆核，7 筆全不是本張**
  （第 528／707 條「候選檔會給錯碟」再一次）；藝人目錄 17–20 張非常完整，**同年同廠牌的《mode of blue》在架，唯獨缺這張。**
- ⚠⚠ **`Sabrina Starke|Bags & Suitcases` 是新形狀：「幽靈條目」。**
  **be 與 lu 兩個市場的藝人目錄裡真的有它（`724666471`，13 軌，℗ 2010 Star-K-Records），
  但 `lookup?id=…&entity=song` 回 0 首歌、整筆記錄沒有 `collectionPrice`、軌層搜尋在 be／lu 也零命中。**
  **→ 只剩中繼資料、逐軌拿不到任何 preview。不算救回，走無串流卡；但那個 collectionId 對封面有效。**
  **這與第 1371 條（有頁無軌）的差別是：連 `collectionPrice` 都沒有，是下架殘留不是授權差異。**

## 第 1710 條（主線）：**封面 7／7 全部找到並目視核版式；其中兩張推翻了「Discogs 優先」**

**a 組四張建議全取 Apple**（與 Discogs 實體掃描逐項同版式，但 Apple 是數位母版、正方形、無掃描邊）：
Burrell `715617164`／Darius `721293152`／Horace Silver `721228995`／Bosso & Girotto `714313013`。
⚠ **四張都是 (甲)、`year` ＝原始發行年，不觸第 1675 條**；Horace Silver 那筆 Apple 的 `releaseDate` 寫 2007
（被宣傳盤帶偏），**但畫面版式與 2008 零售盤逐項相同，已目視排除。**

**b 組三張**：Lovano《Folk Art》→ **Apple `716036038` 1000×1000**；
⚠⚠ **quasimode《mode of blue》→ Apple `720565874` 1500×1500**
——**Discogs 4465251 的 primary 不能用：它是連日版腰帶一起掃的**（左側整條直排日文文案、下方目錄號與定價、
600×526 非正方、**封面左邊被遮**）。**這是「Discogs primary 不可用」的新形狀，前面遇過的是貼紙與斜拍。**
Sabrina Starke → **Apple `724666471`（be／lu）1500×1500**（Discogs 那張只有 420×420）
——⚠ **就是上面那個「幽靈條目」：沒有歌，但封面有效。**

⚠⚠ **反過來有一張要避開 Apple**：**`Hindi Zahra|Handmade` 的 Apple 三筆全部是 2011 年的版本**
（一筆盤名逐字《Handmade (Remastered)》、℗ 都是 2011 Oursoul、廠牌欄沒有 Blue Note），
**而卡片 `year` 是 2010 的 Blue Note 版**——**取 Discogs 2207732 的 primary（597×600）。第 1675 條第二次應驗。**

## 第 1711-A 條（主線，**事實硬錯誤：兩組合計 14 處**）

**作者欄（把翻唱當自作／同名異人）七處**：
1. ⚠⚠ **Chano Domínguez《Piano ibérico》錯的方向會毀掉整張卡**：〈El puerto〉與〈Danza de los ojos verdes〉
   **盤面逐字是 Isaac Albéniz 與 Enrique Granados**，不是他自己的。
   **正確比例是「10 軌 ＝ 3 首原創 ＋ 7 首伊比利古典」（Albéniz 1／Granados 2／Falla 2／Mompou 2）——那才是這張碟的論述。**
2. ⚠⚠ **Trijntje《This is the Season》的盤名曲不是她寫的**（第 9 軌作者欄逐字 Jamey Jaz 與 Rahsaan Patterson）
   ——**這張十四軌沒有一軌是她寫的。**
3. ⚠⚠ **Nelson／Marsalis：〈My Bucket's Got a Hole in It〉盤面是 Clarence Williams**（Hank Williams 只是唱紅的人）、
   〈Caldonia〉盤面是 **Fleecie Moore**（不是 Louis Jordan）；**〈Don't Get Around Much Anymore〉根本不在標準 10 軌零售版裡**
   （那是 Borders 獨家版的曲目）。
4. ⚠⚠ **Wood Brothers〈Angel〉的作曲欄逐字是 Jimi Hendrix**——**「十二軌裡十首自寫」要改成九首。**
5. ⚠ **Burrell〈Take the 'A' Train〉是 Billy Strayhorn**（策展層列在 Ellington 名下）。
6. ⚠ **Truffaz〈Don't Stop〉不是原創**（作曲欄逐字 Bryan Ferry，**已標 uncertain**）。
7. ⚠ **Hubbard〈Without a Song〉的作者欄美版與日版打架**（Vincent Rose vs Billy Rose）——**facts 不寫這一軌的作者。**

**數字與自身清單對不上（第 1560-AB 族）七處**：Patricia Barber（說九＋四、列十＋三，實際 Porter 10／Barber 3）、
Eric Darius（說半數、實際八軌）、Lionel Loueke（說一半、實際十軌裡七軌，**紙本逐字佐證**）、
Joe Lovano《Symphonica》（說五首、實際六軌）、Dianne Reeves 弦樂（說三人、實際六人）、
Avishai Cohen（說一半一半、實際 12 軌裡 8 軌只有他一人）、Marsalis「四重奏」（**實際五重奏**，兩層逐字 quintet）。
**→ 這一族已累計十六例。**

## 第 1712 條（主線）：**編制與逐軌分工——策展層在這一批錯了九處，其中五處改寫了卡的敘述**

1. ⚠⚠ **Joe Lovano《Symphonica》不是純大樂團盤**：**bluenote.com 逐字「alongside the WDR Big Band **and Rundfunk Orchestra**」
   ——是大樂團＋廣播管弦樂團兩個團，盤名就是這個加法。**
2. ⚠⚠ **Aaron Parks《Invisible Cinema》不是一張從頭到尾四重奏的碟**：軌 5 只有 Parks 的鍵盤、
   末軌〈Afterglow〉只有他一人、開場〈Travelers〉沒有吉他。
   ⚠ **而且策展層說「編制出自 2024 年 Classic Vinyl 版」是錯的——2008 年的美版與歐版都有完整逐軌 credit。**
   **第 1678 條「策展層說查不到不要照單全收」再度應驗。**
3. ⚠⚠ **Buscemi 十軌裡六軌有客座主唱、共五位歌手**（策展層寫得像只有〈Hidden〉一軌有人聲）
   ——**這是這張薄卡真正的故事。**
4. ⚠⚠ **Kenny Burrell 軌 2〈Stormy Monday〉是他一個人自彈自唱**（credit 欄沒有任何伴奏）；
   軌 10–12 **Miranda 改打康加、低音聲部交給 DeFrancesco 的管風琴**（策展層寫成「縮成三重奏」）；
   **長號 section 是四人**（漏了低音長號）。
5. ⚠⚠ **Cassandra Wilson 軌 7 與軌 11 被剝到二重奏**（三人的軌號都是「1–6、8–10、12」）。
6. ⚠ **Dianne Reeves 有三個鼓手不是兩個**；**軌 4 沒有鼓也沒有低音**；**軌 7 的弦樂編曲是 Billy Childs 不是 George Duke**；
   **George Duke 本人在軌 2 彈鋼琴**（策展層只把他當製作人）。
7. ⚠ **Eric Darius 漏了兩位客座**，**所以「Mary J. Blige 的器樂改編」這句是錯的**（軌 5 有主唱）。
8. ⚠ **Götz Alsmann：Stephan Schulze 吹的是柔音號不是短號**；另漏三人一職。
9. ✅ **Bosso／Girotto 有兩間錄音室兩組班底、軌號互不重疊、聯集十四軌，通過逐軌核**
   ——⚠ **但策展層的「軌 2、5、8 改由 Marco Siniscalco」是推論不是 credit 原話，已標 uncertain。**

⚠⚠ **「互不重疊／輪流」本批退掉三處**（第 1620-K 條）：
**Lovano 兩位鼓手的 Discogs 兩行都沒有軌號＝兩人全碟都在**；
Trijntje 的 Candy Dulfer、Avishai Cohen 的四件樂器、Chano Domínguez 的四種表演**同樣無軌號，不得寫第幾軌**；
Hindi Zahra **逐軌欄有名單但第 3、4、9 軌都是兩把以上吉他同時在場**（第 4 軌三把）。

## 第 1713 條（主線）：**獎項——兩組合計七筆，策展層零查；另有六個陷阱**

✅ **得獎四筆**：**Cassandra Wilson《Loverly》第 51 屆葛萊美最佳爵士人聲專輯**
（⚠ **是第 51 屆、2009 年 2 月頒發，2008 是資格年——策展層寫「2008 年拿下」屆次與年份都要改**）；
**Hindi Zahra《Handmade》拿了兩個法國大獎**（2010-11 Prix Constantin 年度最佳專輯、
2011-02 第 26 屆 Victoires de la musique 最佳世界音樂專輯）。
❌ **入圍未得兩筆**：**Willie Nelson《American Classic》第 52 屆 Best Traditional Pop Vocal Album**（得主 Michael Bublé）；
**Hindi Zahra 同屆的「Album de l'année」只入圍**（得主 Gaëtan Roussel），
⚠ **「révélation scène」只進第一輪預提名、第二輪被刷掉——三件事不得寫成「拿下多座大獎」。**

⚠⚠ **跨組互指（第 1620-F 族）**：**Cassandra Wilson 同屆同項的入圍者 Stacey Kent《Breakfast on the Morning Tram》
是 c-160 b 已經發卡的卡**——**兩張的正文必須互指，本張不得寫成「唯一」。**
（⚠ **這是跨批次的互指，不是同批**——**c-160 已經上傳，本機組 manifest 時要一起看。**）

⚠ **六個必須擋掉的陷阱**：Kenny Burrell 的 President's Merit Award（**頒給藝術家本人、晚於本作三年**）；
Rubalcaba 的拉丁爵士葛萊美是**《Supernova》**拿的不是《Avatar》；
Sabrina Starke 的 Edison 最佳新人是**發片前一年**的事；
Trijntje 2008 年的 Edison Jazz Award 頒給**《Who'll speak for love》**（c-160 b 的卡）；
Willie Nelson 那篇紙本提到的「七座葛萊美」「第三座」「Krall 與 Jones 合計 11 座」
**分別是累計、1978 年單曲的獎、兩位客座各自的累計**。

## 第 1714 條（主線）：**序數四寫兩退；以及兩件「策展層漏掉的整張碟的故事」**

✅ **有 src 可寫**：**Marsalis「在 Blue Note 的第五張」**（⚠ **限定語「掛自己單名」不可省**，
算進《Two Men With The Blues》就是第六張）；**Lovano「第 21 張 Blue Note CD」與「第一張把整本自作曲交給新團演」**；
**Willie Nelson「his solo debut album for Blue Note」**（⚠ **「solo」不可省**）。
❌ **退掉**：Avishai Cohen「第一次在自己的碟上大量唱歌」、Eliane Elias「第十九張錄音室專輯」、
Willie Nelson「第 57 張錄音室專輯」（後兩者只有維基一層、未反查完整作品表）。

⚠⚠ **兩件策展層一個字都沒提、但是該卡最好的故事**：
1. **Freddie Hubbard《Without a Song》是遺作發行**：錄音 1969-12 → **2008 挖出並「經他首肯」**
   （Billboard 逐字 `Resurrected last year from the Blue Note vaults to Hubbard's satisfaction`）
   → **2008-12-29 辭世** → 2009-06-02 上市；**日版腰帶直接印「追悼盤」。**
2. **Trijntje《Never Can Say Goodbye》是 Michael Jackson 2009 年過世之後她才在自家花園小屋錄的，
   而且一開始不打算發行**，是廠牌覺得太好才讓它上市——**這解釋了小冊那句「This album is no tribute」
   為什麼要特別聲明、也解釋了編制為什麼只有兩三個人。**
3. **Horace Silver《Live at Newport '58》的出土經過**：**Michael Cuscuna 在美國國會圖書館試聽錄音帶時發現**，
   隨後在 Columbia 的檔案庫找到三軌母帶；**本盤是 Louis Smith 與這支團唯一一次完整演出**；內頁照片掛 Francis Wolff。
4. **Eliane Elias《Something for You》**：**〈Evanesque〉與〈Here Is Something for You〉出自 Evans 過世前不久
   交給 Marc Johnson 的一捲卡帶**；**Johnson 在〈My Foolish Heart〉上彈的是 Scott LaFaro 的那把低音提琴，
   是 1961 年 LaFaro 身故後這件樂器第一次被錄音。**

## 第 1715 條（主線）：**載體（黑膠店的卡）——兩組合計 6 張有同期黑膠，策展層漏 2 張**

**a 組 3 張策展層零漏**（Wood Brothers、Cassandra Wilson、Nelson／Marsalis，各有美版＋歐版）。
**b 組 3 張其中 2 張策展層沒當成黑膠處理**：
✅ **Joe Lovano《Folk Art》同年英國 Pure Pleasure 限量黑膠 `PPAN BST91528`**（另有試壓片）；
✅ **Willie Nelson《American Classic》同年兩種原壓 LP**（美版＋英歐版）；
✅ **Götz Alsmann《Engel oder Teufel》同年德國 12 吋 LP**（16 軌曲序與 CD 一致）。
⚠ **quasimode《daybreak》的 12 吋黑膠是 2010 年、不是同期首發**；
⚠ **Patricia Barber 2010 MFSL 雙 LP 與 Aaron Parks 2024 Classic Vinyl 雙 LP 都是再壓**；
⚠ **Alsmann 那張 2007 年的德版 LP 是 c-160 a 那張錄音室盤的黑膠，不是本張的。**

## 第 1716 條（主線）：**「查不到就是查不到」的三張，以及四處軌名／軌目陷阱**

⚠⚠ **`China Moses|This One's for Dinah` 的編制只查得到兩個人**：Discogs 法版 credit 欄**只有 Liner Notes 一個名字**、
宣傳盤同樣空白、**Discogs 無日版條目**、**MB 的 RG 與 release 兩層 artist-rels 都是空陣列**、
bluenote.com 404、AllAboutJazz 403。**「China Moses 唱、Raphaël Lemonnier 彈鋼琴」以外一個樂手都寫不出來，正文不得編。**
⚠ **`quasimode|mode of blue` 的 Discogs credit 欄完全是空的**——✅ **但製作人從腰帶查到了（小松正人）。**
⚠⚠ **`Paolo Fresu & Uri Caine|Think` 的逐軌作者「四條全部沒有連線 src」**
（兩個 Discogs 條目的軌目欄都沒有 Written-By、MB 15 軌 `work-rels` 全空、Apple 軌層也沒有作曲欄）
——⚠ **而且〈Blood Money〉是 Tom Waits 2002 年一張專輯的名字，那張裡並沒有一首叫〈Blood Money〉的歌，方向本身就可疑。**
**這是第 1686 條第 2 點（名單式 facts 不能做逐軌指派）的極端版：連名單都沒有。**

**軌名照盤面四處**：quasimode《daybreak》第 12 軌〈Jelly **Fish**〉（兩個字）；
Eliane Elias 日版第 2 軌拼成〈Chega De **Suadade**〉（採美版／MB 的 Saudade）；Marsalis 末軌〈Hub-Tones〉（有連字號）；
Aaron Parks 軌 7〈Roadside Distraction〉（**單數**）；Patricia Barber 軌 2〈**I Wait for** Late Afternoon and You〉；
Buscemi 末軌〈**Traveller**〉（沒有 The）。
**軌目陷阱兩處**：**大西順子那筆 Discogs 在第 10 軌前插了一行無軌號的 `Bonus Track` 標題列，看起來像 11 列、實際 10 軌**；
**《Eliane Elias Plays Live》第 5 軌的 medley 在 Discogs 上沒有軌號，看起來像 6 列、實際 7 軌。**
⚠ **《Eliane Elias Plays Live》的演出場地查不到**（兩個條目都只寫「in Amsterdam」）——**正文不得補場館名。**
⚠ **quasimode《daybreak》與 Chano Domínguez 兩張的軌目全部沒有時長**——**正文不得寫任何一軌長度。**

## 第 1717 條（主線）：**跨卡與跨批的人（只供避重，不進 facts）**

**Nicolas Pflug 本線第五、第六次**（Truffaz《Paris》、Avishai Cohen《Aurora》製作、Hindi Zahra A&R）；
**Burton Yount 第十張**（Willie Nelson《American Classic》）；
**Perry Greenfield 同時是 Lovano／Hubbard／Willie Nelson 三張的 product manager**；
**Michael Cuscuna 同時做 Burrell 與 Horace Silver**；**Avatar Studios 是本組三張的錄音室**。
⚠ **同批內互指**：**China Moses 在 quasimode《daybreak》唱兩軌**、**Fabrizio Bosso（c-160 b 的卡）吹第 10 軌**。
⚠⚠ **同批兩張卡撞同一首曲**：**Götz Alsmann 第 4 軌〈Hätt' ich nur Dich〉與 Willie Nelson 第 4 軌〈If I Had You〉
（與 Diana Krall 對唱）是同一首，作者欄三個名字完全一致**——**兩張若都要提這首，切入面向必須分開。**
