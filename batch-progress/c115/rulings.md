# c-115 策展層裁定表（2026-09-06）

**英國 DIY 自壓盤 §1 補遺 ＋ c-103／c-106 轉來的 §1 候選 ＋ 店主指名的阿弟仔《平衡》。**

**交件結果：`prop-a.json` 0 張（英國線交白卷，見第 6 條）、`prop-b.json` 19 張 15 位。**
`chk-prop` 跑到**標記 0**，跨批去重掃 67 批（其中 4 批讀 prop）共 3,006 張，撞卡 0。

派工信原本估「三塊共約 40 張」（英國 18、c-103 轉來 22、c-106 轉來 16、阿弟仔 1，共 57 筆候選）。
實查後**只有 19 筆過得了 §1 的兩道關**（MB 真的查無 ＋ 兩個獨立來源），
退回 38 筆的理由逐筆列在第 7–11 條。依 2026-09-02 店主「裁定權下放」，以下全部由策展層當場決定；
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1.（舉證）**阿弟仔《平衡》在 Discogs 上根本沒有條目——改用 Hit FM 專輯資料庫 ＋ PlayMusic 兩個獨立來源立卡**

店主指名這一張，主線卷宗（`OWNER-REQUEST-adizai.md`）交代策展層「要再補 Discogs 條目與第二個獨立來源」。
**實查：Discogs 上沒有這張。** 阿弟仔的 Discogs 藝人頁（artist 3373388）46 筆逐一看過，
2002 年那張是《我是人》（Zruden Music ZD-A01002／勇士唱片，release 36661873，15 軌）——不是《平衡》；
Zruden Music 的四個 label 頁（2055874／1428835／1793904／1793905）逐一掃過也沒有；
`database/search?q=平衡&country=Taiwan` 回的 28 筆沒有一筆是本片。

**裁定：這一張不以 Discogs 立卡。** §1 附錄寫的是「≥2 個 HTTPS：唱片公司／官方發行頁／館藏目錄／Discogs release」，
Discogs 是選項之一不是必要條件。本卡用三個來源：
- **Hit FM 專輯資料庫**（`https://www.hitoradio.com/newweb/48album`）——發行公司「驚奇多媒體有限公司」、
  發行月份「2003-Jan」、**完整十二軌曲序**（序／嗆／平衡／地圖／曖昧／鳥籠／塔／虎頭蜂／認錯／門／敦倫／跋）、
  一段兩百字的專輯介紹，形狀等同廠牌目錄的逐筆記錄。
- **PlayMusic 音樂網樂評頁**（`.../music_critics_detail.php?id=193`）——署名游祥威、評分 90，**發行日期 2003-01-10**。
- **〈台灣流行音樂 200 最佳專輯〉名單第 76 名**（中文維基條目表格，出版公司欄記「驚喜多媒體」、時間欄記 2002）。

**這是本批唯一沒有 Discogs 條目的一張**，其餘 18 張都有。

## 2.（年份）**阿弟仔《平衡》取 2003，不取店主卷宗與維基的 2002**

卷宗與中文維基的作品列都寫 2002。但兩個帶明確日期的來源都指向 2003 年 1 月：
Hit FM 專輯資料庫的「發行月份 2003-Jan」與 PlayMusic 的「發行日期 2003-01-10」。
中華音樂人交流協會把它列進**年度十大專輯的 2003 年度**（維基〈阿弟仔〉條目原文），與 2003-01 發行相容；
若是 2002 年的碟，該進 2002 年度那份名單。

**裁定：依第 127 條「直記優先於推定」取 2003**，維基的 2002 寫進 `risk`。
**可逆**（只改 year 欄），且不影響「2010 後只收獨立」那條截點——兩個年份都在截點之前。

## 3.（形態）**演歌與戰後歌謡的 LP 時代，「同代原盤級曲集」收，「後世精選」不收**

c-103 轉來的 22 筆裡有 10 筆被 Discogs 標成 `Compilation`。照 c-114 第 14 條一刀切會砍掉近半條線，
但 1950–70 年代的日本歌謡曲 LP **本來就幾乎全是「把單曲整編成一張」的形態**——那個年代的主戰場是單曲，
LP 是事後整編物，把它們全部當精選等於宣告這條線不可收。

**裁定：分兩種看。**
- **收**（`releaseType: "Album"`）：發行當時由**本家廠牌**整編、**藝人在世且當紅**、收的是**同代錄音**。
  本批據此收了村田英雄《王将》1961、北島三郎《函館の女》1966、霧島昇《誰か故郷を想わざる》1967、
  都はるみ《魅力のすべて》1968 四張帶 Comp 標記的碟，Comp 標記逐張寫進 `risk`。
- **不收**：標題明寫ベスト（水前寺清子《ベスト・アルバム》1973）、藝人已歿的後世盤
  （岡晴夫《ヒット曲集》197x，岡 1970 年歿；笠置シヅ子《の世界 ベスト》2012，笠置 1985 年歿）、
  或收的是跨代舊錄音（東海林太郎《傑作集》1965 收的是 1930 年代 SP）。

**本批 19 張的 `releaseType` 全部是 Album，§5.6 一次都沒開**（第 190 條第七次應驗）。
吳晉淮那筆《合衆中國民謡（台湾篇）》是三人合輯，要走 §5.6，本批不開，不收。

## 4.（年份）**年份拿不出來源的碟不收，不用主打曲單曲的年份去推 LP 的年份**

c-103 的清單把三筆的年份寫成「195x」「1977」「1961」，但 Discogs 條目的 `year` 欄是 **0**（未填）、
`released` 欄是 `null`。三筆的處理不同：
- **村田英雄《王将》**：NDL 的錄音資料記錄「王将 : 浪曲」Columbia **c1961.9**（著者欄有村田英雄、船村徹、北条秀司），
  年份有來源 → **收，記 1961**。
- **田端義夫《田端義夫のかえり船》**：NDL 有同名記錄但著錄成 `[19--]`，兩邊都拿不出年份 → **不收**。
- **千昌夫《北国の春》**：NDL 記「千昌夫-北国の春-」徳間 `[19--]`，同樣拿不出年份 → **不收**。

**裁定：`year` 欄必須有可指的來源。** 用〈北国の春〉單曲的 1977 去填 LP 的年份，
正是第 205 條與第 179 條第 1 點禁止的動作。這兩張的來源補齊後可直接接下一批。

## 5.（舉證）**台語與時代曲線的第二來源改用 Apple tw 的精確 collectionId——四個台灣官方目錄在雲端全部拿不到**

派工信指定的台灣線第二來源是「國家圖書館臺灣記憶、台灣音聲一百年（audio.nmth.gov.tw）、
國立臺灣歷史博物館典藏、Discogs」。**四個逐一實測，只有 Discogs 通：**

| 來源 | 實測結果 |
|---|---|
| 台灣音聲一百年 `audio.nmth.gov.tw` | WordPress 站，`/audio-library/search-result/?q=` 回 200 但**查詢結果由 AJAX 渲染**；照頁面的 hidden form 帶 `nmth_srch_nonce` 做 POST（nonce 取自同一次 GET）仍回同一份空殼，`文夏` 在回應裡出現 0 次 |
| 國家文化記憶庫 `nrch.culture.tw` | Angular SPA，HTML 只有 14 KB 的殼 |
| 臺史博典藏網 `collections.nmth.gov.tw` | `SearchList.aspx?keyword=` 回 2.6 KB 的殼 |
| 國圖臺灣記憶 `tm.ncl.edu.tw` | 檢索走 AJAX，`/search?keyword=` 的 47 KB 回應裡查無關鍵字 |
| 臺灣音樂群像資料庫 `musiciantw.ncfta.gov.tw` | 搜尋結果同樣由 JS 渲染 |

**裁定：改用 Apple tw 的精確 collectionId 當第二來源**，這與 c-113 第 3 條的尺一樣
（那批 30 張裡 19 張靠 Apple collectionId 湊齊第二來源）。要件是**曲目數與 Discogs 條目對得上**，
劉福助《桃花過渡》更逐首比對過十一軌的曲名與對唱掛名，Apple 與 Discogs 完全一致。
本批 8 張台語／時代曲卡全部走 `apple-verified-collection`，
**這也是本批唯一有試聽的 8 張**（其餘 11 張試聽預估缺）。

## 6.（**整條線交白卷**）**英國 DIY 自壓盤本批 0 張——兩個獨立理由**

### 6a. MB 對這條線的建檔率極高，真正查無的只剩五張卡帶盤

28 位藝人逐一 `artist?query=` 取實體、`release-group?artist=<MBID>&limit=100&offset=` 分頁全列。
**派工信點名的那批幾乎全部在 MB 上**，逐筆 MBID 見第 11 條。真正查無的只有五張，**且五張全是卡帶盤**：

| 藝人 | 盤 | 年 | 廠牌 | Discogs |
|---|---|---|---|---|
| Instant Automatons | Eating People – Hints For The Housewife | 1980 | Deleted Records | release 2349938 |
| Instant Automatons | The Case For The Defence | 1980 | Deleted Records | release 8313770 |
| The Door and the Window | Music And Movement | 1980 | NB Records | release 2298080 |
| The Door and the Window | Plays Squeekybop Jugband | 1983 | Conventional Tapes | release 6553832 |
| Beyond the Implode | Beyond The Implode No. 1 | 1980 | New Diverse Ltd | release 7919037 |

### 6b. 這五張的第二來源在雲端一個都拿不到

| 來源 | 實測結果 |
|---|---|
| **`hyped2death.com`**（派工信指定） | **整站掛掉**，`https://` 與 `http://`、帶不帶 `www` 三種都回 `000`（連不上）。Wayback 的 `/web/2019…/` 單頁可開（首頁 11 KB 抓到了），但 **CDX API 被 egress policy 擋**，且抓到的 osCommerce 商品頁在快照裡回「Product not found!」——拿不到逐筆的 Messthetics 說明 |
| **45worlds／45cat** | 如 c-114 第 1 條實測，整站 Cloudflare 403（未再浪費時間） |
| **Trouser Press**（本批新試，本想當英國線的 bsnpubs） | 站本身通（`/artist/desperate-bicycles/` 回真的目錄：New Cross New Cross EP 1978 UK Refill、Remorse Code 1979 UK Refill），**但對 DIY 那條線是 soft-404**：`/artist/the-door-and-the-window/` 回的是一篇 The Cure 的文章、`/artist/instant-automatons/` 回的是 Stuart Moxham 的條目，HTTP 全部 200。**不能當來源** |
| **英國國家圖書館 SAMI**（派工信指定） | `sami.bl.uk` 回 200 但轉進 SirsiDynix iLink，**網址是 session-scoped 的 `?ps=<token>`**，且頁面明寫需要 JavaScript 與 cookie；帶 cookie jar 做 POST 查詢回的是「browser seems to have cookies disabled」。**拿不到永久記錄頁** |
| **英文維基百科** | Instant Automatons／The Door and the Window／Beyond the Implode／The Homosexuals 四個條目**全部 404** |
| **Apple gb** | Instant Automatons 只有 2016 年的精選《Sincerely Making a Noise》、The Door & The Window 只有《Detailed Twang》（**MB 已建檔那張**）、Beyond the Implode 與 Danny and the Dressmakers 連藝人實體都沒有 |

**裁定：英國 DIY 這一塊本批交白卷，`prop-a.json` 寫成空陣列。**
理由與 c-113 第 8 條、c-114 第 2／3 條同一把尺——**只有 Discogs 一個來源就不收，寧可少收也不半套**。
本機若能開 45worlds、hyped2death 的存檔或 BL SAMI，上面五張是現成的下一批。
**另外要記的一件事**：這五張全是 C60／C90 卡帶，不是黑膠也不是 CD；
就算來源補齊，上架前也要先確認店主收不收純卡帶盤（c-113 收過ディスクアカバナー的 CD，沒收過卡帶）。

## 7.（未收：c-103 轉來的 22 筆，退 12 筆）

**收 10 筆**：三橋美智也《三橋美智也歌謡史 第2集》、村田英雄《王将》、舟木一夫《ひたむきな青春》、
鶴田浩二《男 傷だらけの人生》、北島三郎《函館の女》、淡谷のり子《別れのブルース》、
霧島昇《誰か故郷を想わざる》、都はるみ《都はるみ 魅力のすべて》、森昌子《せんせい 同級生》、
殿さまキングス《なみだの操》。

| # | 藝人 | 盤 | 退回理由 |
|---:|---|---|---|
| 4 | 春日八郎 | 別れの一本杉 / 君は海鳥渡り鳥 | **形態**：Discogs release 31424747 是 **10 吋 78 轉蟲膠單面盤**（`Shellac, 10", 78 RPM`），不是專輯 |
| 8 | 水前寺清子 | 水前寺清子 ベスト・アルバム | **形態**：標題直接寫ベスト、Discogs 標 Comp，後世精選（第 3 條） |
| 9 | 東海林太郎 | ステレオ 東海林太郎 傑作集 | **形態**：1965 年 King 盤收的是 1930 年代 SP 錄音，跨代復刻（第 3 條） |
| 10 | 藤山一郎 | 青い山脈 | **MB 有建檔**，見第 10 條 |
| 12 | 笠置シヅ子 | 笠置シヅ子の世界 ベスト | **形態**：2012 年後世精選，笠置 1985 年歿（第 3 條） |
| 14 | 岡晴夫 | 岡晴夫ヒット曲集 | **形態**：King 197x 盤，岡晴夫 1970-05 歿，後世曲集（第 3 條）。**另外 NDL 也只有「岡晴夫ヒット・カラオケ集」與 2001／2003 的 SP 原盤再錄，第二來源也不成立** |
| 15 | 田端義夫 | 田端義夫のかえり船 | **年份無來源**（第 4 條）。NDL 有同名記錄 `R100000002-I000008847849`，但著錄成 `[19--]`，Discogs year=0 |
| 20 | 千昌夫 | 北国の春 | **年份無來源**（第 4 條）。NDL `R100000002-I000008696284` 是 `[19--]`，Discogs year=0 |
| 3 | 三波春夫 | 三波春夫全集（第一集）300万枚突破記念 | **第二來源不成立**：NDL 只有「ファンが選んだ三波春夫全集 第1／2／3集」與「三波春夫全集～船方さんよ～」，都不是本片；Apple jp 只有 2013 年之後的單曲與 2016 年的精選 |
| 18 | 大川栄策 | さざんかの宿 | **第二來源不成立**：NDL 用 `title=さざんかの宿`、`creator=大川栄策`、`title=大川栄策/さざんかの宿` 三種下法都查不到本片（只有 1983 年一筆「百万枚突破」的印刷品 `R100000136-I1970306873428723774`，那不是唱片）；Apple jp 只有 2005 年之後的全曲集 |
| 19 | 黒沢明とロス・プリモス | 心がわり／ラブユー東京 | **第二來源不成立**：NDL 只有同節目的**カラオケ盤**「オリジナル・カラオケ-心がわり・ラブュ-東京」（`I000008673169`）與別張的《命預けます》，都不是本片；且 Discogs 標 Comp |
| 21 | 宮史郎とぴんからトリオ | 女のみち | **第二來源不成立**：NDL 用 `title=女のみち`、`title=ぴんからトリオ`、`title=宮史郎` 三種下法都查不到本片 |

> c-103 那份清單另外自己排除了美川憲一、和田弘とマヒナスターズ、江利チエミ 三位，本批照收那個判斷，不重查。

## 8.（未收：c-106 轉來的 16 張，退 10 張）

**收 6 張**：謝雷《新娘與我》《往日的舊夢》《歡唱》《梨山痴情花》（四張都不是 c-106 原本推薦的那兩張，見第 9 條）、
白虹《醉人的口紅》、劉福助 & 黃小冬《桃花過渡》，另**加收郭金發《伴你一生》《人生的旅程》兩張**（第 9 條）。

| 藝人 | c-106 推薦的碟 | 退回理由 |
|---|---|---|
| 文夏 | 文夏的採檳榔 1970 亞洲 ATS-140（LP/Album，4 張掃圖） | **第二來源不成立**：Apple tw 的文夏（653426702）只有《爸爸請你也保重》1981 與《台語老歌珍藏06》1990 兩張，沒有本片；台灣官方目錄拿不到（第 5 條）。**這張形態與身分都乾淨，只差第二來源，是下一批最該優先補的一張** |
| 洪一峰 | 台語老歌金曲7 - 洪一峰（名流復刻） | **形態**：CD, Comp，1990 年代的復刻精選。（Discogs 上他另有《孤兒淚》1973、《送您一首輕鬆的歌》1974 兩張中外唱片 LP/Album，形態乾淨，但 Apple tw 只有《台語老歌珍藏05》，第二來源同樣不成立） |
| 紀露霞 | 意亂情迷 1966 羅盤 M-036 | **形態**：`7", 45 RPM, EP`，不是專輯 |
| 紀露霞 | 台語老歌金曲15 - 紀露霞 | **形態**：Cassette, Comp |
| 郭金發 | 郭金發專輯（三）英倫 IL-7010 | **形態**：Cassette, Comp（且無年份）。已改收鄉城的兩張 LP，見第 9 條 |
| 郭金發 | 台語老歌金曲2 郭金發2 | **形態**：Cassette, Comp |
| 吳晉淮 | 合衆中國民謡（台湾篇）1967 Union UT-505 | **形態**：與張淑美、阿美娜的三人合輯，要走 §5.6，本批不開 |
| 陳一郎 | 陳一郎與12個名女人（Club點唱站 1）1991 名冠 MA-107 | **第二來源不成立**：Apple tw 的陳一郎（471754383）只有《世紀台語精選輯2 紀念專輯》2001 與《感性双钢琴 Vol.6》1997，沒有本片；且 Discogs format 帶 `Sampler` 標記 |
| 劉福助 | 劉福助落下咳 1975 藝海 EHLP-751 | **第二來源不成立**：Apple tw 的劉福助（666502012）18 筆裡沒有這張。形態乾淨（LP/Album、4 張掃圖），只差來源 |
| 劉福助 | 中國酒拳 劉福助專輯1 1984 藍天 | **第二來源不成立**：同上 |
| 白虹 | 白虹 = Bai Hong 2008 CRSC | **形態**：CD, Comp（已改收 1962 年的百代原盤，見第 9 條） |
| 白虹 | 白虹之歌 郎是春日風 2022 Reborn | **形態**：LP, Comp，2022 年復刻 |
| 李麗華 | 天上人間 = Paradise On Earth 1961 Pathé CPA 143 | **第二來源不成立**：Apple tw 有兩個李麗華實體（1774604950 是同名的台灣歌手、346535261 才是上海那位），後者只有《電影原聲帶 新紅樓夢》2014、一堆 1930–40 年代單曲與 1994 年的《李麗華個人專輯》，沒有本片 |
| 李麗華 | 李麗華之歌 1964 Double Ring DREP 632 | **形態**：`7", 45 RPM, EP` |
| 方逸華 | 中西名曲 ＋ 方逸華與西班牙旋律 2015 EMI | **形態**：`2×CD, Comp, Ltd, RE`，2015 年復刻 |
| 謝雷 | 謝雷之歌 1968 宇宙 AE 1001 | **形態**：`7", 45 RPM, EP`。已改收海山的四張 LP，見第 9 條 |
| 謝雷 | 謝雷金唱片 1969 金馬 GHLP-107 | 形態乾淨（LP/Album）但**第二來源不成立**：Apple tw 的謝雷 62 張裡沒有這張。已改收有 Apple 對照的四張 |

## 9.（換碟）**謝雷、白虹、郭金發三位改收別的碟——換的理由是第二來源，不是碟不好**

c-114 第 2 條為了湊第二來源換過三張，本批換得更多，形狀相同，一併記下：

- **謝雷**：原推薦《謝雷之歌》（7 吋 EP）與《謝雷金唱片》（Apple 無對照）。
  改收海山唱片 SL 系列四張 LP，四張都有 Apple tw 的精確 collectionId：
  《新娘與我》1968 SL-2059（ap 1476232860）、《往日的舊夢》1968 SL-2049（ap 1740242272）、
  《歡唱》1968 SL-2045（ap 1734178303）、《梨山痴情花》1970 SL-2139（ap 1715637662）。
  **一位收四張是本批最多的**，理由是謝雷池中零張、而海山 SL 系列是台灣 1960 年代國語唱片最完整的一條線。
- **白虹**：原推薦 2008 年 CRSC 的 CD 精選與 2022 年 Reborn 的復刻 LP，兩張都是 Comp。
  改收 **1962 年百代 CPA-164《醉人的口紅 = Charming Lips》**（10 吋 Album/Mono、十軌），
  Apple tw collectionId 1442687956 的 releaseDate 是 **1962-06-30**、軌數 10，與 Discogs 完全對得上——
  **這是換碟之後反而更好的一次**（原盤取代復刻）。
- **郭金發**：原推薦兩張英倫／名流的卡帶精選。改收鄉城機構的兩張 LP：
  《伴你一生》1982 SC-9027（ap 1841344084）與《人生的旅程》1983 SC·9028（ap 1841343836）。
  **兩筆在 Discogs 藝人目錄裡是 `type: master`，依第 199 條打 `/masters/<id>` 取 `main_release`**
  才拿到實體條目（release 33327054／33306876），沒有把 master id 丟進 `/releases/`。

**同時要記的取捨**：換碟讓 c-106 那份清單的代表性掉了一截——
《文夏的採檳榔》（1970 亞洲，台語歌王的代表盤）與《劉福助落下咳》（1975 藝海）兩張形態與身分都乾淨，
**純粹因為第二來源拿不到而落榜**，這兩張是下一批第一順位。

## 10.（**其實 MB 有建檔、不屬本批**）

逐筆附 MBID。這些是 §1 批**不能碰**的——它們該走一般批的 pinned 路線。

### 10a. 日本線
| 藝人 | 盤 | MBID |
|---|---|---|
| **藤山一郎** | **青い山脈 1990-01-21（Album/Compilation）——c-103 轉來的第 10 筆，年份也正好是 1990，就是那張日本コロムビア的 CD** | 掛在 `9f4ec2c0-8d3b-43e5-9a73-d85357ae5b3d` 名下；`release-group?query=releasegroup:"青い山脈" AND artist:"藤山一郎"` count=1 直接命中 |
| 鶴田浩二 | 傷だらけの人生 1970-12-25（**Single**，不是本批那張 LP） | 掛在 `71686201-a20c-4c57-8e9a-cff9bd7ee132` |
| 北島三郎 | 函館の女 1965-11（**Single**）／ベスト35～竹、函館の女、根っこ 1998 | 掛在 `4010c1c5-ec84-4604-9142-5048ef6c96c7` |
| 淡谷のり子 | 淡谷のり子の世界: 別れのブルース 2023-07-19（Compilation，**與本批 1972 年 LP 同名不同碟**） | 掛在 `aa39b1b7-22f3-4314-badd-7f24439a72f6` |
| 殿さまキングス | スーパー・コレクション 1984／Best of Best なみだの操 1999-06-25（兩筆都是 Compilation） | 掛在 `be51283b-42aa-4af6-a319-f104542108a5` |
| 春日八郎 | 特選歌カラベスト1000: 別れの一本杉／お富さん 2010-10-27 等 16 筆全是 1993 年後的復刻 | 掛在 `fdcd695d-ce12-496e-9857-e03c7522ac83` |

### 10b. 英國線——**這一整塊是本批最大的發現**

派工信點名的藝人裡，下面這些**整位或關鍵盤都在 MB 上**，走 §1 是錯的：

| 藝人 | MB 實體 | 名下 RG | 派工信點名的那張的狀態 |
|---|---|---:|---|
| **Desperate Bicycles** | `92a23a0c-6d0d-4e60-bfee-d0ead4092066` | 8 | **《Remorse Code》1979 已建檔**（另有 Singles 2010、Another Commercial Venture 精選與四筆單曲） |
| **The Homosexuals** | `091babe9-0e5a-4b85-8f7b-bb5f41165ee3` | 11 | **《The Homosexuals' Record》1984 與《Venceremos》1982 都已建檔**（另有 Astral Glamour 2004、The Homosexuals' CD 2004、Ici La Bas 1979 EP 等） |
| **Cleaners from Venus** | `1cf5f079-706d-4b1f-9de9-0bf8e298cc97` | **42** | 派工信要的**卡帶盤全部在**：Blow Away Your Troubles 1981、On Any Normal Monday 1982-04、Midnight Cleaners 1982-12、Secret Dreams of a Kitchen Porter 1982、In the Golden Autumn 1983、Under Wartime Conditions 1985-09 |
| **Television Personalities** | `62c2cd94-30a8-43ed-9d06-8f689111c69c` | **59** | …and Don't the Kids Just Love It 1981-01 等整條線都在 |
| **Instant Automatons** | `6ba772ea-b3b2-459b-bb2e-0ea81ab921f1` | 9 | Radio Silence 1979、Blue Masters of the Humber Delta 1981、Tape Transport 1981 **都已建檔**（缺的兩張見第 6a 條） |
| **The Door and the Window** | `a6eb824e-1a86-4699-aa4b-a1638b47e32b` | 3 | **Detailed Twang 1980 與 Permanent Transience 1979-07 都已建檔** |
| **Danny and the Dressmakers** | `f71cf479-7389-41d7-9919-215a4a49b876` | 3 | **39 Golden Grates 1979、Go Mental 1980、200 Cancellations 2015 三張全在** |
| **Beyond the Implode** | `f8e699cc-7a24-4482-a074-d11f931e2bea` | 2 | 兩筆都是 EP（Last Thoughts 1979、11th Hour Breakdown 1980），卡帶盤缺（第 6a 條） |
| **Scritti Politti** | `a2588b38-6532-4186-b0c8-9aff306d56f5` | 26 | 連 1978-11 的自壓單曲〈Skank Bloc Bologna〉與 1979 的《4 A Sides》《Work in Progress 2nd Peel Session》都在 |
| **O Level** | `d8caaa82-df44-43a5-a18f-04281fcfaac2` | 3 | 〈East Sheen〉1978 Single 已建檔；**本來就沒有專輯**，只有 1992／2014 兩張後世合輯 |
| Solid Space | `5b23257b-6cb8-4c0b-8fa1-1eeb564f97e2` | 1 | Space Museum 1982 已建檔 |
| Storm Bugs | `b84bed9f-ed16-4f66-9484-d41506c924a2` | 6 | A Safe Substitute 已建檔（MB 記 2011 的復刻版） |
| Metabolist | `05a08666-1eb1-4d7d-8eef-bf212cba59f2` | 7 | Hansten Klork **1980 與 2007 兩筆都在** |
| The 49 Americans | `880dabd6-e7f2-4a67-8c89-ff00bcec3c6f` | 4 | We Know Nonsense、Too Young to Be Ideal、Wonder、E Pluribus Unum 1980 全在 |
| Family Fodder | `4f6ba639-f179-4431-8797-7b018a667eda` | **44** | Monkey Banana Kitchen 1980、Sunday Girls 1979、All Styles 1983 全在 |
| Androids of Mu | `cf06c368-2b95-465e-a647-98f50275c53e` | 3 | Blood Robots 1980 已建檔 |
| The Astronauts（英國 punk 團） | `9993b1b5-4925-42b1-ab9f-6627f9be65fd` | 27 | Peter Pan Hits the Suburbs 1981 已建檔 |
| L. Voag | `1a1cd443-fe04-4407-8adb-1aaf3afb698e` | 1 | The Way Out 1980 已建檔 |
| The Petticoats（UK punk） | `bdb5061e-72cc-4802-819c-81319153c5c6` | 2 | Scaling Triangles 1981 Album 已建檔 |
| Blah Blah Blah（UK electronic） | `9b8ccd41-c1bd-4e27-a57b-3c683dad3236` | 4 | 同名專輯 1981 已建檔 |
| Alternative TV | `9d0bc0f2-a4d9-4eb6-89d4-a25c066f1f7e` | 34 | The Image Has Cracked 1978-05 等整條線都在 |
| Swell Maps | `378c0556-fce5-4c1a-8360-5c48ca3e26c5` | 18 | A Trip to Marineville 1979、Jane From Occupied Europe 1980 都在 |
| Marine Girls | `4d9c3ade-ba9a-47ad-80bd-9f9e84b4abe1` | 8 | Beach Party 1981、Lazy Ways 1983、A Day By The Sea 1981 都在 |
| Steve Treatment | `c62331c7-02bd-4bf4-9644-a47c2970dd26` | 3 | 只有 EP 與兩張後世精選，**本來就沒有原盤專輯** |
| The Sell-Outs | `a720b6e4-4518-487f-971d-fbe0e424a7dc`／`929835cf-d693-4194-bc6c-de3b74fb6e48` | 0／0 | 兩個實體都空，但 Discogs 上也查不到專輯形態的碟，不成候選 |

**通則（給後續派工信）：英國 post-punk／DIY 在 MB 上的建檔率遠高於沖繩民謡、日本演歌與台語老歌那幾條線。
往後排 §1 補遺批，不要預設「越冷門的西洋線 MB 越可能查無」——這一批的實證是相反的。**

## 11.（第 179／187 條在本批的實例）

- **第 187 條（漢字／羅馬字兩種寫法都要查）**：本批 15 位藝人**每一位都跑過原文與羅馬字兩種寫法**，
  逐筆寫進各卡 `mbAbsenceProof.queries` 的第一項。最值得記的三個：
  **阿弟仔** → `A-Di` 的 score 100 是「Ëver A. Di'」、`Adia` 的 score 100 是美國 R&B 歌手 Adia Bushrah、
  `張健偉`（本名）的 score 100 是「张健」——三種寫法全部落空，確認 MB 上只有一個阿弟仔實體且名下 0 筆。
  **謝雷** → `Hsieh Lei`／`Xie Lei` 兩種羅馬字查出八個 score≥85 的實體（Lei Lei ×2、lei、LEI ×2、Lei、Lisa Hsieh、LEÏ），逐一 browse 全是不相干的人。
  **白虹** → `Bai Hong`／`Pai Hung` 查出七個，包含 Brotha Lynch Hung（45 筆）與 Dala Pai Pai（5 筆），逐一 browse 排除。
- **第 179 條（短掛名要回問 area／type／disambiguation）**：踩到六次——
  `鶴田浩二`（撞「ジャンボ鶴田浩二」`2f41f3a9`，score 95，browse 回 0）、
  `村田英雄`（撞作詞家「MURATA」`6e18dc40` 與 DJ Krush 客串的「Hideo」`d3dfc9c9`）、
  `舟木一夫`（撞「Funaki」`3c3e303e` 與日裔饒舌歌手「Kazuo」`c5a8f406`）、
  `森昌子`（撞美國「Masako」`a514a854`）、
  `殿さまキングス`（撞 Gipsy Kings `44a7f7d5`）、
  `阿弟仔`（撞台語歌手「阿吉仔」`d9a637b1`，score 42）。
- **第 122／187 在英國線的一個新形狀**：`The Astronauts` 在 MB 上是**美國衝浪團（`e97d0a22`，27 筆）與英國 punk 團（`9993b1b5`，27 筆）兩個同名實體、RG 數還一樣**，
  只查第一名會查到 1963 年的《Surfin' With the Astronauts》。**同名同量的兩個實體，score 分不出來，一定要看 area 與 disambiguation。**

## 12.（曲風）**演歌與台語老歌的曲風對照**

`chk-prop` 的合法曲風十類裡沒有 enka、kayōkyoku、shidaiqu、Hokkien pop 這幾類。本批的取法：
- **演歌／戰後歌謡 10 張**：民謡與浪曲底的走 `["world","pop"]`（三橋美智也、村田英雄、鶴田浩二、北島三郎、霧島昇、都はるみ），
  青春歌謡與 1970 年代歌謡曲走 `["pop","world"]`（舟木一夫、森昌子、殿さまキングス）——**兩者的差別是誰在前**，
  前者的骨架是民謡／浪曲、後者的骨架是流行編曲。淡谷のり子走 `["jazz","pop"]`（她本來就是把 blues 與 chanson 搬進日本流行歌的那一位，Discogs 的 style 標 Chanson）。
- **台語與時代曲 8 張**：謝雷 1968 年那兩張海山盤 Discogs 的 genre 直接標 Rock、style 標 Beat，走 `["pop","rock"]`；
  另兩張走 `["pop","world"]`。白虹《醉人的口紅》Discogs style 標 Shidaiqu ＋ Big Band，走 `["jazz","pop"]`。
  劉福助《桃花過渡》是福建民謠曲目，走 `["world","folk"]`。郭金發兩張走 `["world","pop"]`。
- **阿弟仔《平衡》**走 `["rock","hiphop"]`——Hit FM 的介紹寫「搖滾、Rap-Metal、Hardcore」，同名曲與 Rapper 張睿銓對唱。

**都是可逆的**（只改 genres 欄）。

## 13.（chk-prop）**原樣複製 c-114 的版本，只改批號**（第 197 條照辦）

`batch-progress/c115/chk-prop.mjs` 從 `c114/chk-prop.mjs` 逐字複製，只改兩處：
第 1 行的批號與用法字串、第 15 行的 prop 檔路徑改 `c115`。`groups` 預設值本來就是 `['a','b']`，沒動。
第 186 條那兩道「掛名／盤名含非 ASCII 連字號」的檢查原樣保留，`rgMbid` 從頭到尾不在它的檢查清單裡，§1 批直接可用。

**跑出來：a 組 0 張、b 組 19 張 15 位，標記 0；跨批去重掃 67 批（其中 4 批讀 prop）共 3,006 張，撞卡 0。**

⚠ **交件後再跑一次時，`dedup-crossbatch` 多報了一筆 `c94 ザ・スターリン《虫》1983 ←→ c116 ザ・スターリン《虫》1983`**——
那是同時間另一支代理往 `c116/prop-a.json` 加卡造成的，**與 c-115 無關**（本批 19 張沒有一張沾到）。
跨批去重是全域掃描，會把別批的撞卡一起報出來；**c-116 那支要自己處理**，記在這裡免得日後誤以為是本批的問題。

## 14.（池中現況，供後續批參考）

實掃 `seed_cards.json` 全 **14,424** 列，並比對 `audits/pool-artist-name-splits.md` 記的分裂寫法：

- **本批 15 位藝人裡 14 位池中零張**。唯一有卡的是北島三郎（1 張《北島三郎全曲集》，後世全曲集，與本批《函館の女》不同碟）。
- **⚠ 同名不同碟一組**：本批謝雷線原本考慮的《淚的小花》（海山 SL-2079，1969）與**池中已有的青山《淚的小花》（1969）**同名——
  〈淚的小花〉是 1969 年的大熱曲，青山與謝雷各錄各的、各出一張同名 LP。
  **為了避免上架後的同名比對混淆，本批把謝雷這張換成《新娘與我》**，同名那張留給後續批處理（記在這裡，別再踩一次）。
- **⚠ 掛名雙人一組**：劉福助 & 黃小冬《桃花過渡》是本批唯一的雙人掛名卡，Discogs 與 Apple 兩邊都這樣記（第 8 條）；
  日後若 劉福助 單獨立卡，這會是一組新的分裂寫法，要併進 `audits/pool-artist-name-splits.md`。
- **演歌與戰後歌謡在池中收本批之前是零**——本批補進 10 張後，這條線才第一次有形狀。
- **台語與 1960 年代國語唱片在池中同樣接近零**；本批補進 8 張，重心壓在海山（謝雷 4）與鄉城（郭金發 2）。
- 上海時代曲那一塊，池中已有的是《百代中國時代曲名典》系列進了 MB 的那幾位；**白虹是系列外的第一位**。

## 15.（封面與試聽，上架前店主要知道）

- **8 張走 `apple-verified-collection`**（台語與時代曲全部），collectionId 逐張寫在 `risk` 欄，**這 8 張有試聽**。
- **11 張走 `manual-scan`**（10 張演歌 ＋ 阿弟仔），**試聽預估全缺**。
- **封面風險最高的一張是淡谷のり子《別れのブルース》**：Discogs release 14715255 **0 張掃圖**，
  Apple jp 也沒有本片，本機一定要另尋來源。次高的是鶴田浩二、北島三郎（各 1 張）、森昌子（1 張）、殿さまキングス（1 張）。
- **阿弟仔《平衡》的封面可從 Hit FM 專輯資料庫取**：`https://www.hitoradio.com/media/album_cover/normal/48.jpg`。
