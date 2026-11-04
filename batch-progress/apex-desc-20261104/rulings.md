# apex-desc-20261104 裁定紀錄

## 第 0 步（s1，2026-11-04）

- **範圍**：`origin/main` aab6c1d11 的 seed，tier hall 303／heresy 85／pearl 290；排除《台客的復仇》後 677 張（hall 302）。
- **現行簡介讀法**：Cloudflare KV bulk get 讀 `desc2:`＋`desc4:`（不用 `/album-desc`）。desc2 643、只有 desc4 32、兩鍵皆無 2。
  - 兩鍵皆無的《The Dark Side of the Moon》《Kind of Blue》前台供的是 worker 內建 CURATED_DESCS（`/album-desc` 回 `X-Cache: CURATED`）。
    worker 讀序 desc2 → CURATED → desc4，所以重寫後寫 desc2 即可壓過。
  - 只有 desc4 的 32 張逐張打 `/album-desc`（鍵存在，不會觸發生成）確認沒有被 CURATED 蓋掉：32 張前台皆為 desc4 原文。
- **檢查層**：4 支 Sonnet 各 167–170 張 → keep 5、rewrite 672。四支都沒照「每 20 張寫檔」做（一次寫出），本次未受重啟影響，記錄備查。
- **主線抽查**（keep 全數 5 張＋rewrite 隨機 6 張）：
  - 維持 keep：Donna Summer《Love to Love You Baby》、김두수《자유혼》、Bo Diddley《Bo Diddley》——開頭講是什麼、有具體聲音、地位有具名出處，語氣平實。
  - **改判 rewrite**：坂本龍一《戦場のメリークリスマス》（中英數字間全無空格、無地位句、「低音刻意讓調準偏離」來源存疑）；
    Grandmaster Flash《The Message》（開頭是發行日期與錄音室雜項，地位放到最後；「1980 年地鐵罷工後寫成」待查）。
  - 抽查的 6 張 rewrite 判定理由都成立（軼事開頭、無聲音描述）。
- **結果**：keep 3、rewrite 674（殿堂 300／異端 85／流亡 289）→ 23 批（ad-01～ad-23；ad-13 異端 25、ad-23 流亡 19，其餘 30）。
  切法：tier 內依藝人在 seed 首次出現的順序分組，同藝人不拆批。
- **工具調整**：`desc-tools/qa-batch.mjs` 的 factBlob 接受 facts 的 `text` 欄（apex 研究格式），否則 out 階段事實比對全落空。
- **檔名**：研究檔用 `research/ad-XX-{a,b,c}.json`（不是 PLAN 寫的 `-research-`），因為 `qa-batch.mjs` 只認 `<batch>-<g>.json`。

## ad-01（殿堂 30 張，s1）

- 研究 3 Sonnet（WebSearch a 3／b 7／c 3 次）、寫作 2 Opus；coverage 無 none，thin 的塊寫作層照薄寫。
- 研究層推翻舊簡介的主要錯誤（新稿都未沿用）：Tago Mago「Conny Plank 錄音」（實為 Czukay）、Violator「全球 1500 萬」（維基約 750 萬）、Robert Johnson「十字路口傳說從此盤開始」、Kind of Blue「一次錄完」（維基明載不實）與「史上最暢銷爵士專輯」（2026-08 起被《A Charlie Brown Christmas》超過）、Getz/Gilberto「第一張得年度專輯的爵士專輯」（實為第一張非美國專輯）、Karma「一首佔滿兩面」、Köln「調音師搶修」、Folsom「獄警持槍站滿走道」等。
- **卡池資料疑點（未動 seed，留給店主）**：《A Charlie Brown Christmas》seed 年份欄 1978，原發行是 1965。
- 機器 QA：`qa-batch out ad-01` 9 個標記全是具名出處誤報（Pitchfork／Les Inrockuptibles／葛萊美名人堂／Ben Ratliff／AllMusic）與原聲帶中文片名；fix-spacing 0；字數 234–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 11 處（同一張多次壓字分開記）：

- `johnny cash|at folsom prison`：「國家錄音登錄」→「國家錄音登記表」。用語統一（同批他張皆作「國家錄音登記表」）
- `miles davis|kind of blue`：「《Kind of Blue》被 Colin Larkin 1994 年的《Top 100 Jazz Albums》排第 1 名，AllMusic 稱它是調式爵士的頂點。」→「《Kind of Blue》是 Miles Davis 1959 年的專輯，Colin Larkin 1994 年的《Top 100 Jazz Albums》排它第 1 名，AllMusic 稱它是調式爵士的頂點。」。審稿第 1 問：第一句只有榜單，沒說這是誰、哪年的唱片
- `miles davis|kind of blue`：「1959 年 3 月與 4 月分兩天在紐約錄成」→「同年 3 月與 4 月分兩天在紐約錄成」。上句已有 1959，避免重複
- `lee morgan|the sidewinder`：「成為 Blue Note 史上最暢銷的唱片。」→「賣破 Blue Note 當時的銷售紀錄，維基百科記載它讓廠牌免於財務危機。」。「史上最暢銷」今日不成立（Norah Jones《Come Away with Me》同屬 Blue Note、銷量遠高）；研究稿原文是「打破該廠先前的銷售紀錄」
- `clifford brown & max roach|clifford brown & max roach`：「以及長達八分鐘的〈Delilah〉。這兩首後來都進了爵士標準曲庫。」→「以及長達八分鐘的〈Delilah〉；〈Joy Spring〉與〈Daahoud〉後來都成了爵士標準曲。」。「這兩首」指涉不清（前面列了三首）；依研究稿 Rough Guide to Jazz 條
- `art blakey and the jazz messengers|moanin'`：「兩首一起建立 Blakey 的 shuffle 律動」→「Blakey 的 shuffle 律動就是靠這兩首建立起來的」。原句主詞不清、讀起來像兩首歌合寫一個律動；照研究稿 allaboutjazz 條改寫
- `ornette coleman|the shape of jazz to come`：「編制是薩克斯風、短號、貝斯與鼓」→「編制是中音薩克斯風、短號、貝斯與鼓」。研究稿誤記「高音薩克斯風」，寫作層因此只寫「薩克斯風」；英文維基 Personnel 為 alto saxophone，已同步改研究稿
- `miles davis|kind of blue`：「，獨奏者在每個音階上想彈多久就彈多久。」→「，每個音階彈多久由獨奏者決定。」。補第一句後超過 280，壓字
- `lee morgan|the sidewinder`：「賣破 Blue Note 當時的銷售紀錄，維基百科記載它讓廠牌免於財務危機。」→「打破 Blue Note 當時的銷售紀錄。」。壓回 280 內；保留有據的部分
- `miles davis|kind of blue`：「樂手有 John Coltrane 與 Cannonball Adderley 兩把薩克斯風和 Bill Evans 的鋼琴。整張建立在調式上，不用咆勃密集的和弦進行」→「John Coltrane 與 Cannonball Adderley 吹薩克斯風，Bill Evans 彈鋼琴。整張建立在調式上，不用咆勃的密集和弦」。壓字（292→280 內），內容不變
- `miles davis|kind of blue`：「旋律線草稿，不是和弦譜。」→「旋律線草稿。」。壓字（284→278）；「不用咆勃的密集和弦」已表達同義

其餘 23 張逐張審過，未改字。另把研究稿 `ad-01-c.json` 的 Coleman「高音薩克斯風」改為「中音薩克斯風」（英文維基 Personnel：alto saxophone）。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-01.json`（60 鍵，29 個非 null）。
- bulk put 30 鍵（全為 desc2；本批沒有原有 desc4 的卡、也沒有 CJK 卡），`verify-wave-kv` 回讀 30/30 逐字一致。
- `/album-desc` 逐張比對 30 張：29 張前台已是新稿（邊緣快取約一分鐘後才換）。
- **《Kind of Blue》前台仍是 CURATED**：實測 worker 對非 CJK 卡先讀 CURATED_DESCS 再讀 desc2（與 apply-pub-fix-desc 檔頭寫的順序不同；kv-from-manifest 註解寫 desc2 優先只適用 CJK 分支）。desc2 已寫好，要店主在 worker 拿掉這筆 CURATED 並部署才會生效。《The Dark Side of the Moon》（後續批）同樣情況。
- manifest：ad-01 的 30 張都不在任何 onboarding manifest 裡（早期卡），0 處需同步。

## ad-02（殿堂 30 張，s1）

- 研究 3 Sonnet（WebSearch a 8／b 1／c 4 次；全工作階段研究層合計 26 次）、寫作 2 Opus；coverage 無 none。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：DJ Shadow 器材（兩台唱盤、Pro Tools → 維基為 MPC60、SL-1200、ADAT）、J Dilla「31 首中 29 首在醫院完成」（未證實，新稿寫說法不一）、Madvillain 機上失竊細節、Eminem 葛萊美項數、Burial 起底與賭盤、BVSC「七天」（實為六天）、大滝詠一「200 萬張」、Os Mutantes Green Devil 踏板與熱可可罐、Clube da Esquina 封面男孩、De La Soul 訴訟金額、Jazzmatazz「被取樣的樂手回來重奏」。
- 研究稿錯一處由寫作層抓到：`ad-02-a.json` 把〈Impeach the President〉記成 James Brown 的歌，實為 The Honey Drippers；成稿沒寫這首，研究稿已更正並註記。
- 機器 QA：`qa-batch research ad-02` 全過；`out` 5 個標記皆為具名出處（Village Voice Pazz & Jop、Rolling Stone Brasil、Folha de S.Paulo）與 Aphex Twin 本名的誤報；fix-spacing 0；字數 252–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 14 處（同一張多次壓字分開記）：

- `aphex twin|selected ambient works 85-92`：「是 以 Aphex Twin 名義」→「是以 Aphex Twin 名義」。多餘空格
- `steve reich|music for 18 musicians`：「《Music for 18 Musicians》是 Steve Reich 的作品，K. Robert Schwarz 在《Minimalists》裡稱它也許是 Reich 最偉大的作品。1974 到 1976 年寫成，1976 年在紐約首演，1978 年由 Steve Reich and Musicians 為 ECM 錄音。」→「《Music for 18 Musicians》是 Steve Reich 為十八位樂手寫的作品，這張是他自己的樂團 1978 年為 ECM 錄的版本，K. Robert Schwarz 在《Minimalists》裡稱這首曲子也許是 Reich 最偉大的作品。1974 到 1976 年寫成，1976 年在紐約首演。」。審稿第 1 問：第一句只說「是 Reich 的作品」，沒交代這張唱片是什麼（作曲家自己樂團的 ECM 首錄）
- `buena vista social club|buena vista social club`：「《Buena Vista Social Club》是 Guinness 認定最暢銷的世界音樂專輯，1998 年獲葛萊美最佳傳統熱帶拉丁專輯。製作方原本找 Ry Cooder 和馬利樂手合作，簽證沒下來，才改錄古巴 son；1996 年在哈瓦那 EGREM 花六天錄成。」→「《Buena Vista Social Club》是一群古巴老樂手 1996 年在哈瓦那錄的專輯，Guinness 認定它是最暢銷的世界音樂專輯，1998 年獲葛萊美最佳傳統熱帶拉丁專輯。製作方原本找 Ry Cooder 和馬利樂手合作，簽證沒下來，才改錄古巴 son，在 EGREM 錄音室花六天錄成。」。審稿第 1 問：第一句只有銷量封號，沒說這是什麼唱片
- `buena vista social club|buena vista social club`：「，在 EGREM 錄音室花六天錄成。曲種有 son cubano、bolero 與 danzón，」→「，花六天錄成。曲種有 son cubano、bolero 與 danzón，」。補第一句後超字（298），刪錄音室名
- `buena vista social club|buena vista social club`：「〈Chan Chan〉是四和弦的 son，〈Candela〉有長段即興合奏。」→「〈Chan Chan〉是只用四個和弦的 son。」。壓字（287→280 內）
- `beastie boys|paul's boutique`：「之後的取樣官司讓這種做法就此終結」→「Sound on Sound 指出這種做法在 Biz Markie 的取樣官司後就做不到了」。原句「之後的取樣官司」沒指名、因果講滿；照研究稿 Sound on Sound 條改成具名出處
- `eric b. & rakim|paid in full`：「紐約時報的 Ben Ratliff」→「《紐約時報》的 Ben Ratliff」。報刊名加書名號
- `jay-z|the blueprint`：「國家錄音登記冊」→「國家錄音登記表」。用語統一
- `dj shadow|endtroducing.....`：「是 DJ Shadow 的專輯，」→「是 DJ Shadow 1996 年的專輯，」。第一句補年份（研究稿：1996-09-16 Mo' Wax 發行）
- `beastie boys|paul's boutique`：「，〈Egg Man〉放進《大白鯊》主題」→「（刪）」。壓字
- `beastie boys|paul's boutique`：「當時 Capitol 幾乎沒宣傳，銷量不如預期。」→「（刪）」。壓字（308→280 內）
- `eric b. & rakim|paid in full`：「為配合預算一週內輪班錄完」→「一週內輪班錄完」。壓字
- `dj shadow|endtroducing.....`：「Björk 和電影片段」→「Björk 的唱片」。壓字
- `dj shadow|endtroducing.....`：「他用一台 MPC60 取樣機」→「他用 MPC60 取樣機」。壓字（282→280）

其餘 22 張逐張審過，未改字。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-02.json`（60 鍵，31 個非 null）。
- bulk put 31 鍵（desc2 30＋大滝詠一 desc4 1，CJK 卡兩鍵同寫），wrangler 印 `Success!`。寫入後立刻回讀 22 鍵是舊值，等 45 秒重讀 31/31 逐字一致（runbook 記載的 10–30 秒延遲）。
- `/album-desc` 逐張比對 30 張：30/30 前台為新稿。
- manifest：本批 30 張都不在 onboarding manifest，0 處需同步。

## 去出處改稿（ad-01、ad-02，s1 收工前）

- **原因**：收工 merge `origin/main` 時看到同日另一工作階段寫進 `apex-desc-base.md` 的店主新規（commit 1ca0ad043）：「要有明確出處沒錯，但介紹裡不用寫出處」。ad-01／02 第一版是照舊規「評價要用具名出處帶出」寫的，60 張大量出現「Pitchfork 排第 X」「AllMusic 稱」「Ben Ratliff 收進」。已上線的稿違反新規，當場重做（可逆、有先例：店主定稿範本就是不點名）。
- **做法**：舊稿備份 `output/ad-0X-out-N.v1.json`；2 支 Opus 只改出處句（派工詞 `prompt-revise-source.md`），媒體榜單與樂評引述改成「常被列為／被視為」，多份榜單才用「常被列為」、單一來源用「被視為」，不升級封號；樂手的話能寫成事實就寫成事實（Flea 那句 → 「影響了 Flea 等貝斯手的彈法」），寫不成的刪。葛萊美、Billboard、Oricon、Mercury、國家錄音登記表、葛萊美名人堂、金氏世界紀錄照留。刪後不足 200 字的，從研究稿補已有事實。逐張紀錄 `revise-ad-01.json`、`revise-ad-02.json`。
- ad-01 改 24 張、ad-02 改 26 張；其餘沒有出處句。改後全文 grep 媒體名 0 筆。

### 主線複審（逐張讀改過的 50 張）

- `wayne shorter|speak no evil`：「常被視為 Shorter 的代表作，1950 年代以後出生的爵士樂手幾乎都拿它當基礎之一。」→「常被視為 Shorter 的代表作，也常被後輩爵士樂手當成學習的基礎。」。「1950 年代以後出生的樂手幾乎都」是 Ben Ratliff 單一來源的說法，去名後變成無主的全稱斷言，收斂
- `guru|jazzmatazz, vol. 1`：「發行時評價兩極，有樂評把它列進 1993 年度前 20 名，也有樂評給了最低評價。」→「發行時樂評評價兩極。」。去出處後兩個「有樂評」句子拗口，收成一句
- `madvillain|madvillainy`：「是 2004 年樂評評價最高的饒舌專輯」→「是 2004 年樂評綜合評分最高的饒舌專輯」。原依據是 Metacritic 綜合分，寫清是綜合評分
- `os mutantes|os mutantes`：「在巴西史上百大專輯的榜單排第 9 名」→「常被列為巴西流行音樂史上最重要的專輯之一」。去名後「某榜單第 9 名」變成不具名名單；研究稿另有 AllMusic 高評，改用有所本的「常被列為」
- `chico buarque|construção`：「在巴西史上百大專輯的榜單排第 3 名，標題曲也在巴西歌曲票選中排第 2。」→「常被列為巴西史上最好的專輯之一，標題曲也常被選為最好的巴西歌曲之一。」。同上，不具名名次改為有所本的敘述（Rolling Stone Brasil 第 3、Folha 票選第 2）
- `大滝詠一|a long vacation`：「在日本搖滾名盤的榜單排第 7 名，也是」→「常被列為日本流行音樂史上最好的專輯之一，也是」。同上（Rolling Stone Japan 第 7、Record Collectors' 1980 年代第 1）
- `guru|jazzmatazz, vol. 1`：「以及用法語饒舌的 MC Solaar。發行時樂評評價兩極。」→「（錄音經過補「1992 至 1993 年在紐約錄製，」；結尾改為）以及用法語饒舌的 MC Solaar。發行時樂評評價兩極，在歐洲賣得比在美國好。」。去出處後掉到 194 字；補研究稿已有的錄音時地與歐美銷售差異（試過補〈Transit Ride〉鼓循環，英文字母計字超過 300，改補這兩條）

其餘逐張複審，未改字。

### 重寫 KV

- 兩批重新產 bulk（ad-01 30 鍵、ad-02 31 鍵）並 `wrangler@4 kv bulk put --remote`，皆 `Success!`。`kv-before-ad-0X.json` 保留的是本工作階段寫入**之前**的原始值，回滾用它。
- **工具錯誤一次**：`ad.mjs`／`front-check.mjs`／`apply-review.mjs` 用 `startsWith('<批>-out-')` 選檔，把 `.v1.json` 備份也讀進來；Map 後讀蓋前，第二次 bulk put 實際寫回的是**第一版（含出處）**。前台比對抓到（35/60 不符），改成只認 `^<批>-out-\d+\.json$`，重產 bulk 並逐鍵對過輸出檔（30/30、31/31）後再 put 一次。之後的批沿用修好的工具，不會再發生。
- 重寫後回讀 61/61 逐字一致；前台逐張比對 ad-01 29/30（Kind of Blue 仍是 CURATED）、ad-02 30/30。

## ad-05（殿堂 30 張，s3）

- 研究 3 Sonnet（WebSearch a 5／b 1／c 4 次）、寫作 2 Opus；coverage 無 none。sound thin 8 張（London Calling、Ten、Appetite、Paranoid、Back in Black、Parklife、Dummy、Brilliant Corners）照研究稿薄寫。研究層多數靠英文維基轉引（Pitchfork 擋、AllMusic 403）。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Marquee Moon「英國暢銷」（英榜第 28）、Unknown Pleasures「噴霧罐聲」、Sex Pistols 作證者與 bollocks 字義、Ramones「2014 年金唱片」、Ten「鑽石認證」（13 白金）、Queen「六間錄音室」（七間）、Paranoid「Iommi 獨自二十分鐘」、Parklife 那句話是 Coxon 說的、Kraftwerk 官司終局、Monk「沒人完整彈完」（實為剪接）、Hancock「首張白金爵士專輯」未證實。
- 寫作特注禁寫：Metallica「首張」、Back in Black「第二暢銷」、Kraftwerk 判決細節、GNR MTV 時段、Nevermind 封面 200 美元與訴訟、Wonderwall 寫給誰、Brubeck 伊斯坦堡（寫土耳其）。
- 機器 QA：`qa-batch out ad-05` 5 個標記皆誤報（葛萊美名人堂、團員本名）；fix-spacing 0；字數 233–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 17 處（同一張多次壓字分開記）：

- `television|marquee moon`：「在 1970 年代與後龐克的最佳專輯榜上常排在前段」→「常被列為 1970 年代與後龐克最好的專輯之一」。「榜上常排在前段」是在描述榜單，改成直述地位
- `the clash|london calling`：「《London Calling》常被列為搖滾史上最好的專輯之一」→「《London Calling》是 The Clash 1979 年的雙專輯，常被列為搖滾史上最好的專輯之一」。審稿第 1 問：第一句沒說是誰、哪年、什麼唱片
- `the clash|london calling`：「The Clash 在倫敦錄了五到六週」→「樂團在倫敦錄了五到六週」。團名已前移
- `the clash|london calling`：「成品是 19 首、65 分鐘的雙專輯，以接近單張的價格發售。」→「成品 19 首、65 分鐘，以接近單張的價格發售。」。「雙專輯」已前移，避免重複
- `talking heads|remain in light`：「《Remain in Light》常被列為 1980 年代最好的專輯之一，2017 年入選美國國家錄音登記表。這是 Brian Eno 為 Talking Heads 製作的最後一張，1980 年夏天在巴哈馬與紐約錄製。」→「《Remain in Light》是 Talking Heads 1980 年的專輯，常被列為 1980 年代最好的專輯之一，2017 年入選美國國家錄音登記表。這是 Brian Eno 為樂團製作的最後一張，同年夏天在巴哈馬與紐約錄製。」。審稿第 1 問：第一句沒說是誰的唱片
- `radiohead|ok computer`：「《OK Computer》常被列為史上最好的專輯之一」→「《OK Computer》是 Radiohead 1997 年的專輯，常被列為史上最好的專輯之一」。審稿第 1 問：第一句沒說是誰的唱片
- `radiohead|ok computer`：「Radiohead 在英國鄉間的莊園等地錄音」→「樂團在英國鄉間的莊園等地錄音」。團名已前移
- `the smiths|the queen is dead`：「《The Queen Is Dead》常被列為英國最好的專輯之一，英國榜最高第 2 名。The Smiths 在 1985 年下半年錄製，由 Morrissey 與 Johnny Marr 製作，因與廠牌的法律糾紛延到 1986 年才發行。」→「《The Queen Is Dead》是 The Smiths 1986 年的專輯，常被列為英國最好的專輯之一，英國榜最高第 2 名。樂團在 1985 年下半年錄製，由 Morrissey 與 Johnny Marr 製作，因與廠牌的法律糾紛延後半年多才發行。」。審稿第 1 問：第一句沒說是誰的唱片
- `ac/dc|back in black`：「全黑封面是樂團對 Scott 的服喪。後來有錄音室拿它來測試房間音響。」→「全黑封面是樂團對 Scott 的服喪。」。冷知識收尾（apex-desc-base：冷知識不拿來收尾）
- `john coltrane|a love supreme`：「常被視為 John Coltrane 最受喜愛的專輯，2015 年入選美國國家錄音登記，」→「被視為 John Coltrane 最受喜愛的專輯，2015 年入選美國國家錄音登記表，」。單一來源（Christgau）用「被視為」不用「常」；登記表用語統一
- `the dave brubeck quartet|time out`：「2005 年入選美國國家錄音登記。」→「2005 年入選美國國家錄音登記表。」。用語統一
- `charles mingus|mingus ah um`：「2003 年入選美國國家錄音登記。」→「2003 年入選美國國家錄音登記表。」。用語統一
- `thelonious monk|brilliant corners`：「2003 年入選美國國家錄音登記。」→「2003 年入選美國國家錄音登記表。」。用語統一
- `herbie hancock|head hunters`：「2008 年入選美國國家錄音登記。」→「2008 年入選美國國家錄音登記表。」。用語統一
- `talking heads|remain in light`：「，加上多層貝斯與打擊，把非洲複節奏」→「，把非洲複節奏」。補第一句後超字（288），壓字
- `radiohead|ok computer`：「〈Airbag〉的節奏取樣剪輯了幾秒鼓聲；」→「（刪）」。補第一句後超字（288），壓字
- `the smiths|the queen is dead`：「，以取樣器做出 tom 鼓 loop，Marr」→「，Marr」。補第一句後超字（289），壓字

其餘 19 張逐張審過，未改字。另核對研究稿：Back in Black「美國第三暢銷」（RIAA 27 白金，研究稿有）、Oasis「英國史上最暢銷錄音室專輯」（研究稿引 Official Charts 2026-07 認證 620 萬張）、Homogenic 跟蹤者事件（維基有 Ricardo López）、Discovery「約一半是自己彈的假取樣」（Homem-Christo 估計）皆有所本，照留。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-05.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（全為 desc2；本批無 desc4、無 CJK 卡），`Success!`；40 秒後 bulk get 回讀 30/30 逐字一致。
- `front-check ad-05`：30/30 前台為新稿，CURATED 0。
- manifest：0 處需同步。

## ad-06（殿堂 30 張，s3）

- 研究 3 Sonnet（WebSearch a 7／b 10／c 3 次；本工作階段研究層合計 30 次）、寫作 2 Opus。coverage 唯一 none 是 Adele《21》sound，主線自己讀英文維基 Recording／Composition 段補 7 條（研究稿標「主線補查」），改 ok。thin：Nina Simone 三塊、Ella and Louis 地位與聲音、Otis Blue、Live at the Apollo、Ready to Die、Baduizm、Lemonade、Daydream Nation、YHF、Village Green 聲音，照研究稿薄寫。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Nina Simone〈Mississippi Goddam〉不在這張、Ella and Louis「Peterson 三重奏」（實為四人）、Exodus 槍擊細節（胸口中槍、七名槍手不實）、N.W.A「1989 年初 1.2 萬美元趕工」（實為 1988 夏秋錄）、Wu-Tang「各自簽進不同主流廠牌」（實為 Loud 允許另簽個人約）、Illmatic「四位製作人各一首」、Kendrick「TUPAC 縮寫」、Blonde 分潤與母帶、Adele「第二位六獎女性」、Kinks「最暢銷」的語境、Badu／D'Angelo 私生活軼事。
- 機器 QA：`qa-batch research ad-06` 1 個千分位標記在研究稿（不進簡介）；`out` 5 個標記皆誤報（葛萊美名人堂、團員本名、Nirvana 為影響對象、年份 2010 是 2010 年代）；fix-spacing 0；字數 237–280。
- 核對：國家錄音登記表入選年份逐張對研究稿（N.W.A 2017、Illmatic 2021、Ready to Die 2024、Wu-Tang 2022、Low End Theory 2022、Chronic 2019、Back to Black 2025、Live at the Apollo 2004），皆有維基出處。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 8 處：

- `bob marley & the wailers|exodus`：「曾被選為 20 世紀最佳專輯」→「常被列為史上最偉大的專輯之一」。去出處後「曾被選為 20 世紀最佳專輯」成了無主的封號（研究稿：Time 1999 單一來源）；改用多份榜單支持的敘述（Rolling Stone 500 大 2020 第 48、VH1 2001 第 26）
- `a tribe called quest|the low end theory`：「常被列為最流暢的 hip-hop 專輯之一」→「被視為最一致、最流暢的 hip-hop 專輯之一」。研究稿只有單一來源（AllMusic John Bush），用「被視為」不用「常被列為」，並照原意補「最一致」
- `ella fitzgerald|ella and louis`：「常被視為流行歌唱的頂點」→「被視為流行歌唱的頂點」。單一來源（Jasen 與 Jones），去「常」
- `my bloody valentine|loveless`：「常被列為九〇年代最佳專輯。」→「常被列為九〇年代最佳專輯之一。」。榜單名次不一（Pitchfork 1999／2022 第 1、2003 第 2），不寫成唯一
- `sonic youth|daydream nation`：「常被列為八〇年代最佳專輯，」→「常被列為八〇年代最佳專輯之一，」。同上，不寫成唯一
- `kanye west|my beautiful dark twisted fantasy`：「常被列為 2010 年代最佳專輯，」→「常被列為 2010 年代最佳專輯之一，」。研究稿的是 2010 年度榜，十年榜名次未複核，不寫成唯一
- `public enemy|it takes a nation of millions to hold us back`：「常被列為史上最偉大的嘻哈專輯，」→「常被列為史上最偉大的嘻哈專輯之一，」。不寫成唯一
- `lauryn hill|the miseducation of lauryn hill`：「錄音不用壓縮器」→「她錄音時不用壓縮器」。研究稿是 Hill 自述的做法，補主詞以免讀成整張製作的通則

其餘 22 張逐張審過，未改字。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-06.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（全為 desc2；本批無 desc4、無 CJK 卡），`Success!`。
- 45 秒後 bulk get 回讀 30/30 逐字一致；`front-check ad-06`：30/30 前台為新稿，CURATED 0。
- manifest：0 處需同步。

## 收工前對新規複查（ad-05、ad-06，s3）

- **原因**：收工 fetch 時看到 `origin/main` 新增店主規則（07f514906，apex-desc-base 第三節「先講清楚它憑什麼是這一級」）：前兩句要用事實講出夠格的理由；殿堂卡要寫地位與影響（開創、改變、被當成標竿：獎項、名人堂、長年榜單、被誰沿用），不寫遊戲用語。
- **做法**：60 張逐張重讀前兩句。59 張前兩句已有地位事實（多份榜單「常被列為」、葛萊美、Billboard、國家錄音登記表、名人堂、開創某類型或影響某場景），判合格。
- **改 1 張**：`charles mingus|mingus ah um`：「是 Charles Mingus 在 Columbia 的第一張專輯，2003 年入選美國國家錄音登記表。1959 年 5 月，他帶著」→「是 Charles Mingus 1959 年在 Columbia 的第一張專輯，2003 年入選美國國家錄音登記表，2013 年進葛萊美名人堂。同年 5 月，他帶著」，並刪「〈Boogie Stop Shuffle〉是十二小節藍調」壓字（290→261）。依據研究稿 `ad-05-b`/`c` 的 status 條（2013 葛萊美名人堂）。已單鍵重寫 KV（`Success!`）。
- **用語裁定**：新規說「入選」不寫，指的是遊戲用語（入選殿堂之類）；「入選國家錄音登記表」是外部事實，照 s1 先例保留。
- 兩批審稿改動總計：ad-05 19 處（11 張，見 `review-ad-05.json`，含本段 2 處）、ad-06 8 處（8 張）。
