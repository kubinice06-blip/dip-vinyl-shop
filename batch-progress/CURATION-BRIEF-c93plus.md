# c-93～c-102 策展層共用簡報（2026-09-05）

店主指示：「**接力做完十批**」。這十批＝`EXPANSION-PLAN-c89plus.md` 的
**A 線目錄深度第二輪 8 批（c-93～c-100）＋ B 線兩個最大的洞（c-101 遊戲原聲、c-102 動畫原聲）**。
（該文件內文用的是舊批號，**下文一律用新批號**：舊 c-89～c-96 ＝ 新 c-93～c-100，舊 c-97／c-98 ＝ 新 c-101／c-102。）

**這十批與前面二十批最大的不同：`lineType` 是 `廣度`，不是 `深掘`。**
不是去挖沒人聽過的小廠牌，是**把已經在池裡、卻只有一兩張的正典藝人補到該有的深度**。
判準是藍圖 §五-1：**每位先確認「第一張該有的」在不在，再談深度。**

## 一、每批的固定規格

- **`lineType: 廣度`**，每批分 a／b 兩組（c-100 單組），**目標 35–45 張**。挖不到就照實交，**寧缺勿濫**。
- 輸出 `batch-progress/c<批>/prop-<組>.json`，欄位與 `batch-progress/c91/prop-a.json` **完全一致**：
  `artist`、`album`、`year`、`genres[]`（只能是 rock／jazz／soul／electronic／pop／hiphop／folk／classical／world／blues 這十個）、
  `label`、`why`、`risk`、`mbNote`、`releaseType`、`exceptionReason`、`exceptionEvidenceUrls[]`、
  `selfTitled`、`queryAlias`、`reissuedBy`、`g`。
- **每張都要釘住 release-group MBID**，寫在 `mbNote` 的**第一個** MBID 位置，並逐一回問
  `https://musicbrainz.org/ws/2/release-group/<id>?fmt=json&inc=artist-credits+releases`
  確認 `primary-type=Album`、標題、artist-credit 與轄下 release（第 41 條）。
- **對照組 MBID（EP、合輯、Live、同名別碟）要明寫「刻意不釘」**。
  **⚠ 第 162 條：標記寫在 MBID 前面也算數，而且一個標記可以帶好幾個 MBID。**
  寫法固定成 `刻意不釘：<id>《盤名》（理由）、<id>《盤名》（理由）`，不要把要釘的與不釘的混在同一句。
- **MB 上查無的碟：一般批「查無就不收」，記進未收清單並註明「可進 §1 補遺批」**（c-113～c-115）。
  這十批**不開 §1**，舉證成本太高、會拖慢整條線。
- **廣度批的合輯不受深掘線「每批 ≤5」的限制**（c-88 收了 10 張），但**每張都要走 §5.6 完整舉證**：
  `releaseType: "Compilation"`、`exceptionReason` ≥12 字、≥2 個 HTTPS `exceptionEvidenceUrls`，
  年份取合輯首次出版年。
  **⚠ 但 MB `primary-type=Album` 而 `secondary-types` 含 Compilation 的，照一般 Album 寫法、不填例外欄位**
  （§5.6 明文；填了會被 `chk-prop` 判「非合輯卻帶例外欄位」——c-90 裁定第 3 條）。

## 二、必讀（開工前，照順序）

1. `ALBUM_ONBOARDING.md` 全篇，特別是 §0.8 錨點制、§1 身分、§4 封面、§5.5／5.6。
2. `batch-progress/c53/rulings.md` **全部 164 條**。這十批最會用到的：
   - **第 27 條**：取樣只能用來排除，不能用來確認數量。要知道池裡有幾張就**實掃 `seed_cards.json` 全檔**。
   - **第 116 條**：`artist/<MBID>?inc=release-groups` 預設只回 25 筆，**一律用
     `release-group?artist=<MBID>&limit=100&offset=` 分頁**。目錄深度批每位藝人的 RG 都不少，這條一定會踩到。
   - **第 20 條**：`artist:` 比對的是 artist-credit 字串不是實體名。
   - **第 28／98／122 條**：503／403 不是查無；MB 回不相干的東西也不是查無。
   - **第 45 條**：改過名的碟取再發名。**第 6／70／120 條**：掛名與盤名用 MB 實體的文字。
   - **第 49 條**：跨文字系統的撞卡字串去重看不見（日文卡要同時比對假名／漢字／羅馬拼音）。
   - **第 91／95 條**：rgMbid 是身分鍵不是年份來源；RG 標題與卡片盤名不必相等。
   - **第 126／153／162 條**：同名雙胞胎與「刻意不釘」的寫法。
   - **第 119 條**：`chk-prop.mjs` 會串跑跨批去重，**標記要清到 0**。
3. `batch-progress/c91/prop-a.json`——**輸出格式照抄**。
4. `batch-progress/EXPANSION-PLAN-c89plus.md` 的第二、三節（**你這批的骨幹名單在裡面**，注意批號 +4）。

## 三、撞卡檢查（不做這步交件無效）

- **實掃 `seed_cards.json` 全 14,424 列**，查「這張碟池中有沒有」。
- **⚠ 七組掛名分裂還沒修**（本機待辦），所以**每位藝人都要用兩種以上寫法查**：
  `王菲`／`王菲 Faye Wong`、`崔健`／`崔健 Cui Jian`、`林強`／`林強 Lim Giong`、
  `五月天`／`五月天 Mayday`、`草東沒有派對`／`草東沒有派對 No Party For Cao Dong`、
  `Happy End`／`はっぴいえんど`、`Tan Dun 譚盾`／`譚盾`。
  **日文與韓文藝人一律三種寫法都查**（原文／羅馬拼音／英文別名）。
- **「同一藝人池中上限 3 張」那條規則早已作廢**（2026-09-04 店主明確表示沒有這個限制）。
  **要擋的只有真撞卡：同一張碟池中已經有了就不收。**
  這十批的整個目的就是把 1–3 張的藝人補深，**看到「他已經有 3 張了」不是不收的理由**。
- 跑 `node batch-progress/c<批>/chk-prop.mjs` 到**標記 0**。
- **c-93～c-102 十批同時在跑**，別批的 `prop-*.json` 也會被 `dedup-crossbatch.mjs` 比到，撞了就換。

## 四、`why` 與 `risk` 要寫什麼

- **`why`**：這張在該藝人目錄裡的位置（是首張、代表作、還是轉向之作）、當年怎麼流通、
  **池中這位藝人已經有哪幾張**（實掃結果，不是印象）、為什麼這張該補在那幾張旁邊。
  **要有可查證的來源**：廠牌官方頁、Discogs release 頁、有署名的樂評、藝人官網。
  **不要寫樂器與音色的形容**——c-66 那批的樂器描述幾乎全部無來源，研究層擋掉二十多處。
- **`risk`**：撞卡風險（同名別碟、EP／Album 雙胞胎、掛名拼法分歧、跨文字系統、**簡繁**）、
  年份分歧、再發是否 Official、封面與試聽的預估（**寫下你查到的 Apple `collectionId` 與店面**）。
- **`mbNote`**：釘住的 RG 全名、artist-credit、first-release-date、primary-type、secondary-types、
  release 數與國別／status；對照組 MBID 與「刻意不釘」的理由；藝人 MBID 與名下 RG 數。

## 五、資料來源與店面

- MusicBrainz：1 req/s、UA 必帶 `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
- Discogs：`api.discogs.com` 公開端點不需 token；網頁會 403。
- **店面依第 158 條用原文盤名搜當地店面**：
  `us/gb` 是預設，日本盤加 `jp`、韓國盤加 `kr`、法語 `fr`、德語 `de`、義大利 `it`、
  拉美 `mx/co/pe/cl`、華語 `tw/hk`。
  **「拆到只剩 ASCII」對同一套書寫系統的變形有效，對跨書寫系統的碟是反的。**

## 六、各批的特別提醒

| 批 | 場景 | 這批的坑 |
|---|---|---|
| **c-93** | 搖滾正典目錄深度 I（a 後龐克與另類／b 前衛、車庫與 90s） | Joy Division、The Stooges、The Stone Roses、Devo、Pere Ubu、The Flaming Lips、Jane's Addiction、The B-52's、Guns N' Roses、Jeff Buckley、New York Dolls、Suicide、This Heat、Magma、Robert Wyatt、Spiritualized、Neutral Milk Hotel、Slint、Liz Phair、The Cranberries、Elvis Costello。**最安全的一批，但也最容易撞卡——每位都要實掃。** |
| **c-94** | 搖滾正典 II（a 金屬與硬蕊／b 龐克、emo 與日本另類） | Refused、At the Drive-In、American Football、Voivod、Accept、Deafheaven、Bikini Kill、Killswitch Engage、Eyehategod、Deathspell Omega、The Microphones、Big Brother & the Holding Company、Gene Clark、Love、Aphrodite's Child、Flower Travellin' Band、FRICTION、はっぴいえんど。**はっぴいえんど 在池中有兩種寫法（Happy End 2 張／はっぴいえんど 3 張），兩邊都要查、新收的用 MB 實體主名。** |
| **c-95** | 爵士與藍調（a 戰前藍調與芝加哥電藍調／b 爵士搖擺到自由） | Robert Johnson(池中僅 1)、Son House、Bessie Smith、Ma Rainey、Charley Patton、Skip James、Blind Willie Johnson、Little Walter、Magic Sam、Jimmy Reed、Willie Dixon、Django Reinhardt、Sidney Bechet、Art Tatum、Jelly Roll Morton、King Oliver、Fletcher Henderson、Albert Ayler、Roscoe Mitchell、Bill Evans、Erroll Garner、Machito。**戰前藍調的「專輯」幾乎全是後世合輯——§5.6 舉證會用得很兇，而且要判「這一次再發是不是 Official」（第 43／57／65／78 條）。** |
| **c-96** | 靈魂／放克／嘻哈（a 嘻哈／b 靈魂與放克） | N.W.A、Dr. Dre、Notorious B.I.G.、JAY-Z、Raekwon、GZA、Madvillain、Black Star、Lauryn Hill、Bone Thugs、Lil' Kim、Grandmaster Flash、D'Angelo、Frank Ocean、Jill Scott、Dusty Springfield、Smokey Robinson、Labelle、Gil Scott-Heron、Rufus feat. Chaka Khan、Jerry Butler、Martha & the Vandellas、Boyz II Men。**嘻哈卡要在 `risk` 註明 Apple 的 `collectionExplicitness`，上架時要辨淨化版（`audits/cleaned-previews-hiphop.md`）。** |
| **c-97** | 電子（a house／techno／12 吋／b 氛圍、具象音樂、downtempo） | Derrick May／Rhythim Is Rhythim、Phuture、Maurizio、Frankie Knuckles、Portishead、Burial、The Avalanches、Coldcut、Throbbing Gristle、Merzbow、The Art of Noise、Global Communication、Richie Hawtin、Sasha & Digweed、Pierre Henry、Bernard Parmegiani、Enya、Harold Budd & Brian Eno、Akufen、Stardust、Jam City。**§5.5 電子白名單適用（12 吋單曲、EP、DJ mix），但是白名單＋精選制不是通則——每張都要在 `exceptionReason` 說明為什麼這張是該曲風的核心經典。** |
| **c-98** | 民謠／鄉村（a 鄉村與美國民謠／b 歐洲與拉美民謠） | Hank Williams(池中僅 2)、Woody Guthrie、Pete Seeger、Odetta、Patsy Cline、Tammy Wynette、Marty Robbins、Randy Travis、Garth Brooks、The Louvin Brothers、Flatt & Scruggs、Dock Boggs、Elizabeth Cotten、Joan Baez、Georges Brassens、Víctor Jara、The Bothy Band、Alan Stivell、Selda Bağcan、Nitty Gritty Dirt Band、J.D. Crowe。**1940–50 年代的鄉村同樣是合輯為主，§5.6 舉證要件同 c-95。** |
| **c-99** | 世界音樂（a 非洲與加勒比／b 中東、南亞與拉丁） | Franco & TPOK Jazz、Tabu Ley、Toumani Diabaté、Orchestra Baobab、E.T. Mensah、Fania All-Stars、Celia Cruz、Juan Luis Guerra、Juan Gabriel、Umm Kulthum、R.D. Burman、A.R. Rahman、Ali Akbar Khan、Shankar、King Tubby、U-Roy、Big Youth、Yellowman、Alton Ellis、The Mighty Diamonds、Yabby You、Max Romeo、Junior Murvin、Sister Nancy、Dr Alimantado。**牙買加那一段人已到齊、每人只有 1–3 張，是本批最好補的。阿拉伯與印度的掛名拉丁轉寫有多種，`queryAlias` 要填滿。** |
| **c-100** | 古典演奏家傳奇錄音（單組） | Toscanini、Schnabel、Cortot、Kreisler、Van Cliburn、Milstein、Mravinsky、Budapest／Busch／Quartetto Italiano、Grumiaux Trio、Fischer-Dieskau、Marian Anderson、Caruso、Joan Sutherland、Fritz Wunderlich。**只補演奏者卡，不新增作曲家卡形態**（藍圖 §五-6）；池中 Mozart／Schubert／Bartók 那幾張是作曲家卡，**不以它們為基準**。歷史錄音的「專輯」多半是後世整編，§5.6 會用得很兇。 |
| **c-101** | 遊戲原聲正典（a 日本廠牌世代／b 獨立遊戲與西方大作） | 植松伸夫、近藤浩治、下村陽子、光田康典、崎元仁、古代祐三、Toby Fox、C418、岡部啓一、目黑將司、Lena Raine、Austin Wintory、Mick Gordon、Jesper Kyd、Darren Korb、Disasterpeace、Grant Kirkhope、David Wise、Yasunori Mitsuda。**抽測 26 個名字 17 個零，整個品類不存在。** **MB 版本極亂（原聲 vs Arranged vs 再發），釘 rgMbid 要逐張回問並把 Arranged 版寫成「刻意不釘」。** `genres` 依**聲音本體**分流（管弦→classical、chip／synth→electronic）。**店面 jp ＋ us 都要試。** 日文掛名與羅馬拼音兩種寫法都要查撞卡。 |
| **c-102** | 動畫原聲正典（a 菅野・久石・梶浦世代／b 機械與劇伴） | 菅野よう子、久石譲（**池中僅 1**）、梶浦由記、鷺巣詩郎、川井憲次、芸能山城組(已 2)、Nujabes(已 3)、田中公平、神前暁、澤野弘之、平沢進、大野雄二、菊池俊輔、羽田健太郎、天野正道。**日文掛名與羅馬拼音兩種寫法都要查撞卡（久石譲 vs Joe Hisaishi）。主題曲單曲不收。** 店面 jp。 |

## 七、落檔規則（容器會不定時重啟）

- **每定案 5 張就把目前結果寫回 `prop-<組>.json`**（整檔覆寫）。
- **開工前先看該檔存不存在**：若已有部分內容，**接續補完，不要從頭重做**。
- 抽驗與掃描的中間結果放 `/tmp`，**不要放進 repo**。

## 八、禁令

- **不動 git**、**不碰** `seed_cards.json`／`apex_pool.json`／`PROJECT_MEMORY.md`／KV／Firestore。
- 不碰其他批次的檔案。

## 九、交件

寫 `batch-progress/memory-entries/c<批>-curation.md`（格式照 `c91-curation.md`），
若有需要記錄的裁定就另寫 `batch-progress/c<批>/rulings.md`，然後**簡短**回報：
張數與藝人數、`chk-prop` 標記數、合輯張數、**釘不住 MB 而未收的清單（＝§1 候選）**、
**與池中撞卡而未收的清單**、封面與試聽的預估、
以及你自己判斷「這個場景在池中已經飽和／還很空」的一句話。**過程不必敘述。**
