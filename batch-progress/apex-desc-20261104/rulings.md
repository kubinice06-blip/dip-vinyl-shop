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

## ad-03（殿堂 30 張，s2）

- 研究 3 Sonnet（WebSearch a 14／b 11／c 14 次）＋主線派 1 支 Sonnet 補查華語 9 張的聲音塊（`research/sup-ad-03.json`，WebSearch 14 次，已併回 a／c 研究稿並標「主線補查 sup-ad-03」）。補完後李泰祥、張雨生、黑豹的聲音塊仍只有結構層級（編曲者、陣容、曲目），寫作特注「只寫查得到的結構、寫到 200 字左右」。
- **研究稿主線更正**（`ad-03-a.json` 五月天）：a 組 notes 說舊稿「最佳演唱團體獎」有誤、應為「最佳樂團獎」，補查以中文維基第 11 屆金曲獎頁推翻——入圍的是最佳演唱團體獎（得主亂彈），舊稿原本是對的；a 組「1999 年吉他手冠佑加入」也錯（冠佑是鼓手），成員異動年份來源不一，改成不寫。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Gould 熱水浸手／矮椅／錄音日；陳綺貞「少女標本」企劃、十大專輯年份；交工「嗩吶學摩托車」（實為二行程耕耘機引擎當節奏）；鄧麗君飯局發起說；羅大佑「自費、向父親借錢、15 萬張」；林強「羅百吉製作」（製作 John Fryer、電音羅百吉）；黑名單「公文禁播」；李宗盛簽約年與木吉他組團年；Slum Village 炒價與廠牌；Richter「22 場」；Schnabel「樂迷先付錢才錄得成」；Casals「1890」「二戰延後」；Solti「史上第一套錄音室 Ring」；Callas「重錄三十次」；Gillespie 漏掉 O'Farrill、Giddins 讚語張冠李戴；Hawkins 年份混述；張雨生「三天」（實為四天）；陳明章〈新莊街〉（屬《抓狂歌》）；達明「全碟陳少琪填詞」。
- 機器 QA：`qa-batch research` 1 標記（研究稿內 200,000，不進簡介）；`out` 6 標記皆誤報（中文曲名、專名、去出處後的「票選」）；fix-spacing 0；半形括號只出現在原文盤名內；字數 216–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 12 處（`review-ad-03.json`；Solti 兩次壓字分開記）：

- `鄧麗君 teresa teng|淡淡幽情`：「錄音的空間回響清楚；人聲放在最前面，伴奏音量刻意退後。」→「錄音的空間回響清楚，人聲放在最前面，伴奏音量壓得較低。」。「刻意」是推測
- `羅大佑|之乎者也`：「2009 年出版的《台灣流行音樂 200 大專輯》把它列為 1975 到 1992 年台灣流行音樂二十大專輯的第一名。」→「被視為台灣流行音樂史上最重要的專輯之一，也常被看作校園民歌時代的終結。」。書名＋名次屬出處，不寫進簡介；依研究稿 200 大榜首與中文維基
- `羅大佑|之乎者也`：「同名曲諷刺審查制度與社會對盜版的默許，因為當時台灣仍有出版審查，發行版的歌詞寫得較為抽象。」→「專輯推出時台灣仍有出版審查，這些歌詞在當時相當震撼。」。「海外原版較直接、台灣版較抽象」只有轉述、原文未取得（研究稿 src 網址也錯），刪；保留中文維基可證部分
- `李宗盛|生命中的精靈`：「常被列在台灣流行音樂百佳專輯的前列。」→「被視為台灣流行音樂史上最好的專輯之一。」。單一榜單（中文維基轉述第五名）不能寫「常被列」，榜名屬出處
- `carlos kleiber|beethoven: symphonies 5 & 7`：刪「第 5 號四個樂章約 7 分 22 秒、10 分、5 分 9 秒與 10 分 51 秒。」。雜項數字
- `artur schnabel|beethoven: complete piano sonatas (1932-35)`：「常被視為後來所有演出被衡量的標準」→「常被視為衡量後來演出的標準」。語句拗口
- `jacqueline du pré|elgar: cello concerto`：「被廣泛視為」→「常被視為」。不加碼、統一用語
- `georg solti|wagner: der ring des nibelungen`：「得過葛萊美獎，常被列為史上最偉大的錄音。」→「得過葛萊美獎與 Grand Prix du Disque，兩次古典樂雜誌票選都選它為史上最偉大的錄音。」。寫作層為壓字把兩次具體票選（Gramophone 1999、BBC Music Magazine 2012）講成泛稱；改回具體事實，不點名媒體
- `georg solti|wagner: der ring des nibelungen`：「，Siegfried 假扮 Gunther 時，工程師處理了 Wolfgang Windgassen 的聲音，讓它接近 Gunther 的音色。」→「，Siegfried 假扮 Gunther 的段落還用工程手法改變了他的音色。」。壓字（314→278）
- `陳明章|下午的一齣戲`：「收入馬世芳與吳清聖編纂的《台灣流行音樂百張最佳專輯》。」→「被視為台灣流行音樂史上最好的專輯之一。」。編者與書名屬出處
- `張國榮|leslie`：「這類快歌很難說是他首創，但〈Monica〉常被視為讓勁歌熱舞成為香港潮流的歌。」→「〈Monica〉被視為讓勁歌熱舞在香港成為潮流的歌。」。前半幾乎是李皖原話、語氣含糊；後半單一來源（作家「灰」），「常被」改「被」
- `張雨生|口是心非`：「得獎時已無法領獎」→「得獎時他已過世」。1997 年 11 月過世、1998 年得獎

其餘 19 張逐張審過，未改字。另審稿確認：《Afro》第一句無地位評價（研究稿沒有指名到這張的評價，不硬擠）；萬能青年旅店「被視為中國最有影響力的獨立搖滾歌曲之一」依《紐約時報》（維基轉述）。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-03.json`（60 鍵，30 個非 null）。
- bulk put 48 鍵（desc2 30＋desc4 18，CJK 卡兩鍵同寫），`Success!`；`verify-wave-kv` 回讀 48/48 逐字一致。
- `/album-desc` 逐張比對：30/30 前台為新稿。
- manifest 同步 6 處（c32-folk 1、c35-shop-reels 1、c37-jazz 2、c41-chinese 2）。

## ad-04（殿堂 30 張，s2）

- 研究 3 Sonnet（WebSearch a 10／b 2／c 1 次；s2 全工作階段研究層合計 66 次＋主線 1 次）、寫作 2 Opus。coverage 只有新寶島康樂隊 sound 為 none：研究層 3 次中文搜尋＋主線 1 次都查不到編曲與樂器，寫作照「只寫可證事實、約 200 字」處理（成稿 245 字，無聲音段，僅寫一台一客、〈多情兄〉台客混唱）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Hendrix「銀行電腦當機」；Pet Sounds 的 Carol Kaye 引言；New Order「被評為早期 house」；Dolls「Rundgren 評價保留」；Exile「Richards 準時到場」；Kooper「沒彈過風琴」；Purple Rain「Rolling Stone 誤植」與募款金額；Rumours 刀片、The Pit、上榜八年；Thriller 91 次混音（Jones 選的是第二版）；Songs in the Key of Life 合約總額與「一人包辦」；What's Going On「Gordy 說最糟」（Gordy 否認）；Hotel California「一個即興音都沒有」與年度唱片歸屬；Born to Run 母帶進泳池（實為 acetate）；Blue 發電報；Who's Next「唯一英國冠軍」與母帶被清；The Doors「一星期錄完」（約一個月）；Astral Weeks 兩萬美元現金；Leonard Cohen「配器過度」是 Sylvie Simmons 而非 Cohen 本人說的；Horses「女性首度中性姿態」。
- 機器 QA：`qa-batch research` 2 標記（研究稿內千分位，不進簡介）；`out` 6 標記皆誤報（照新規不點名的榜單、專名）；fix-spacing 0；字數 238–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 11 處（`review-ad-04.json`）：

- `new york dolls|new york dolls`：「。在紐約花八天錄成」→「。專輯在紐約花八天錄成」。缺主詞
- `the beatles|abbey road`：「；這是他們第一次用八軌機。」→「；整張改用 EMI 新的固態混音台錄製。」。**事實錯誤**：《The Beatles》（白色專輯）1968 年已用八軌；研究稿只說《Sgt. Pepper》是四軌，寫作層推論過頭。改用研究稿同條「整張只用 EMI TG12345 固態混音台」；研究稿 `ad-04-a.json` 該條已加註同步
- `the beach boys|pet sounds`、`the velvet underground|the velvet underground & nico`、`the jimi hendrix experience|are you experienced`、`david bowie|the rise and fall of ziggy stardust and the spiders from mars`、`bruce springsteen|born to run`、`patti smith|horses`（6 處）：「美國國會圖書館國家錄音登記（表）」→「國家錄音登記表」。譯名統一（同 ad-01 裁定）
- `pink floyd|the dark side of the moon`：「在 Billboard 200 共 736 週」→「在 Billboard 200 上榜共 736 週」。缺動詞
- `marvin gaye|what's going on`：「也是 R&B 最早的概念專輯之一」→「也常被視為 R&B 最早的概念專輯之一」。研究稿原文「常被引為」，不寫成定論
- `carole king|tapestry`：「在 Billboard 200 連續 15 週冠軍，隔年葛萊美拿下年度專輯、年度唱片、年度歌曲與最佳女流行人聲四項。」→「常被列為史上最偉大的專輯之一，在 Billboard 200 連續 15 週冠軍；專輯與其中兩首歌在隔年葛萊美共拿下四項，包括年度專輯。」。審稿第 1 問：第一句沒有地位（研究稿有 Rolling Stone 500 等多份榜單）；年度唱片、年度歌曲分屬〈It's Too Late〉〈You've Got a Friend〉，原句像全是專輯拿的

其餘 19 張逐張審過，未改字。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-04.json`（60 鍵，29 個非 null；Dark Side 兩鍵皆無）。
- bulk put 31 鍵（desc2 30＋新寶島康樂隊 desc4 1），`Success!`；`verify-wave-kv` 回讀 31/31 逐字一致。
- `/album-desc` 逐張比對：29/30 前台為新稿；**《The Dark Side of the Moon》仍是 CURATED**（s1 已預告：worker 對非 CJK 卡先讀 CURATED_DESCS）。desc2 已寫好，要店主在 worker 拿掉這筆 CURATED 並部署才會生效。
- manifest 同步 6 處（c44-rock 5、ctw-taiwan-indie 1）。

## 收工前對新規複查（ad-03、ad-04，s2）

- **原因**：收工 fetch 時看到 `origin/main` 的店主新規（07f514906「先講清楚它憑什麼是這一級」）：前兩句要用事實講出夠格的理由，殿堂卡寫地位與影響。做法照 s3 先例。
- **做法**：60 張逐張重讀前兩句。56 張已有地位或影響事實（多份榜單、葛萊美、Billboard、國家錄音登記表、金曲獎得獎、銷量紀錄、開創或影響某場景），判合格；鄧麗君、陳綺貞、達明一派、張雨生以獎項／認證為據，研究稿沒有更強的具名評價，維持。
- **改 4 張（7 處）**：
  - `黑豹樂隊|黑豹`：把「抒情搖滾〈Don't Break My Heart〉在香港榜上連續三週居首」從聲音段移進第一句；原處刪重複。研究稿另有「中國第一搖滾專輯」（維基自標無出處）與 150 萬銷量（含不含盜版說法不一），都不用
  - `dizzy gillespie|afro`：第一句改為「《Afro》是 Dizzy Gillespie 1954 年由 Norgran 發行的專輯，延續他 1947 年與古巴打擊樂手 Chano Pozo 寫下〈Manteca〉開出的 Afro-Cuban 爵士路線，被視為這條路線上的出色錄音。」，併後兩句、刪長笛手 Gilberto Valdés 壓字（試寫兩版超字後整句重寫，264 字）。依研究稿 AllMusic 四星、稱這批錄音 stunning（單一來源用「被視為」）
  - `新寶島康樂隊|新寶島康樂隊`：「陳昇唱台語、黃連煜唱客語，形成一台一客的搭配，把台灣民謠與流行音樂結合在一起。」→「刷新了滾石的熱賣紀錄；陳昇唱台語、黃連煜唱客語，一台一客的搭配改變了不少聽眾對客家音樂的看法。」，結尾刪重複的熱賣紀錄。依研究稿鏡週刊、中央社；「把台灣民謠與流行結合」研究稿 facts 沒有（寫作層照派工特注自加），刪
  - `五月天 mayday|五月天第一張創作專輯`：第一句補「被視為台灣地下樂團進入主流的轉捩點之一」。依研究稿中文維基引 5music
- **用語裁定**：同 s3，「入選國家錄音登記表」是外部事實，保留。
- 重新 bulk put ad-03 48 鍵、ad-04 31 鍵，皆 `Success!`；回讀 79/79 逐字一致；前台 ad-03 30/30、ad-04 29/30（Dark Side 仍 CURATED）。manifest 再同步 2 處（c37-jazz、ctw-taiwan-indie）。
- 兩批審稿改動總計：ad-03 12＋5 處、ad-04 11＋2 處。

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

## ad-07（殿堂 30 張，s4）

- 研究 3 Sonnet（WebSearch a 0／b 0／c 1 次；幾乎全靠 WebFetch 讀英文維基，樂評多為維基轉引）、寫作 2 Opus。派工時補了兩條新規（前兩句講夠格理由、出處不寫進簡介；研究 fact 註明單一來源或多份榜單）。coverage 無 none。thin：Cream、MC5、Transformer、Goodbye Yellow Brick Road、Plastic Ono Band、Harvest、Pink Moon、Rain Dogs、Aja、British Steel、Number of the Beast 的聲音塊，The Specials 的製作塊，照研究稿薄寫。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Cream「瑞典與芬蘭雙雙封王」（瑞典黑膠、芬蘭、澳洲）與 Ertegun／Otis 軼事、Love「臨終遺言」、Layla「Allman 彈出前奏 riff」、MC5「擅印 Elektra 商標」、T. Rex「首張 glam 冠軍、蟬聯 6 週」（8 週）、Pink Moon 母帶傳聞、All Things Must Pass〈Isn't It a Pity〉三度遭拒、Graceland 盜版卡帶、Harvest「唯一美國冠軍」、Blondie「美國冠軍」（專輯最高第 6）與 1600 萬張、Kate Bush「EMI 要求改名」、Yes「即興」、Iron Maiden 惡夢來源與砸唱片原因、Specials 單曲限量與 Costello 軼事。
- 寫作特注禁寫：上列各項，加 MC5 的 Q／VH1 名次（是歌曲）、Raw Power 2020 名次、Rolling Stone 單一名次。
- 機器 QA：`qa-batch out ad-07` 標記 15 個皆誤報（團員本名、年代用年份、葛萊美名人堂、Layla 互指 Eric Clapton）；fix-spacing 0；字數 219–280。
- 卡池檢查：本批 30 張現行簡介都來自 desc2，無 desc4、無 CJK 卡。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 6 處（`review-ad-07.json`）：

- `john lennon|john lennon/plastic ono band`：「也常被列為披頭四成員單飛後最重要的作品之一」→「也被視為披頭四成員單飛後最重要的作品之一」。研究稿只有 Mojo 與 High Fidelity 兩位樂評的說法，不是多份榜單
- `john lennon|john lennon/plastic ono band`：「發行時評價兩極，有樂評認為它赤裸得令人難以忍受。」→「發行時樂評評價兩極。」。轉述 The Times 樂評原話等於寫出處
- `the stooges|fun house`：「因此也被稱為龐克爵士」→「整張也被稱為龐克爵士」。「龐克爵士」是 Greg Kot 等人對整張的歸類，去掉推論
- `tom waits|rain dogs`：「，發行當年在英美樂評的年度榜名列第一，常被列為 1980 年代最佳專輯之一。」→「，常被列為 1985 年與 1980 年代最好的專輯之一。」。描述榜單而非地位（同 s3 Marquee Moon 裁定），且年度第一只有 NYT 與 NME 兩份
- `elvis costello|this year's model`：「，當年在兩份樂評年度榜名列第一，常被列為 1970 年代最佳專輯之一。」→「，常被列為 1978 年與 1970 年代最好的專輯之一。」。同上；1978 年度榜研究稿有五份
- `judas priest|british steel`：「也是英國重金屬新浪潮最早的里程碑之一」→「也被視為英國重金屬新浪潮最早的里程碑之一」。維基編者歸納，不直述

其餘 26 張逐張審過，未改字。另核：Layla「唯一的錄音室專輯」出自研究稿 notes（非 facts），屬實（Derek and the Dominos 只發過這一張錄音室專輯），照留；Transformer「Ronson 寫了〈Perfect Day〉的弦樂」研究稿 sound 條有，照留。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-07.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（全為 desc2），`Success!`（第一次輸出被 npm notice 截掉看不到，重跑一次親眼見到 `Success!`，內容相同）。
- `verify-wave-kv` 回讀 30/30 逐字一致；`front-check ad-07`：30/30 前台為新稿，CURATED 0。
- manifest：0 處需同步。

## ad-08（殿堂 30 張，s4）

- 研究 3 Sonnet（WebSearch a 4／b 3／c 8 次；s4 研究層合計 16 次）、寫作 2 Opus。coverage 無 none。thin：Motörhead、Hüsker Dü、Black Flag、Acid Tracks、Mothership Connection、At Newport 1960、Moanin' in the Moonlight、Soul Makossa 的聲音塊，RATM、Soundgarden、Arctic Monkeys、Strings of Life 的製作塊，Howlin' Wolf 的地位塊，照研究稿薄寫（Arctic Monkeys 232 字、無錄音經過）。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Smashing Pumpkins「4 白金」（7 白金）與「過氣標籤」、White Stripes「10 天」（約兩週）、Slayer 拒發廠牌（Columbia 拒發、改 Geffen）、Motörhead 刺青／雙大鼓、Soundgarden 專輯得葛萊美（只有〈Black Hole Sun〉得獎）、Green Day「另類榜五週冠軍」、Neutral Milk Hotel《安妮日記》因果、Spiderland「1989 地下室、關燈唱」（實為 1990 年 8 月芝加哥四天）、Grace 的 Bowie 引言與 340 萬張、Pavement「只預約四小時」、Souvlaki「Eno 共同譜寫」（樂團自製、Eno 只做兩首）、Heaven or Las Vegas 人聲錄音者與命名軼事、Acid Tracks 價格與「預設音色」、Maggot Brain「想像母親還活著」與 LSD 一次錄成、At Newport「史上第一張現場藍調」、Howlin' Wolf「2014 藍調名人堂」、Soul Makossa 和解金額。
- 機器 QA：`qa-batch research ad-08` 1 個千分位標記在研究稿（不進簡介）；`out` 8 個標記皆誤報（年代用年份、團員全名）；fix-spacing 0；字數 232–280。
- Jerry Cantrell、Billie Joe Armstrong、Anthony Kiedis 的全名研究稿只有姓或暱稱，寫作層補了全名；皆為通行正確寫法，照留。
- **卡池資料疑點（未動 seed，留給店主）**：Arctic Monkeys《Whatever People Say I Am, That's What I'm Not》seed 年份欄 2005，專輯 2006 年 1 月 23 日發行（研究稿英文維基），簡介照實際寫 2006。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 7 處（`review-ad-08.json`）：

- `slayer|reign in blood`：「，也是 Decibel 名人堂收進的第一張專輯。」→「。」。單一雜誌的專欄名人堂，寫出來等於點出處；前句已有多份榜單
- `rage against the machine|rage against the machine`：「常被列進史上最佳專輯的榜單」→「常被列為史上最好的專輯之一」。描述榜單而非地位（同 s3 Marquee Moon 裁定）
- `nine inch nails|the downward spiral`：同上
- `alice in chains|dirt`：「也常被列進最佳金屬與 grunge 專輯的榜單」→「也常被列為最好的金屬與 grunge 專輯之一」。同上
- `green day|dookie`：「它被認為與 The Offspring」→「它被視為與 The Offspring」。用語統一
- `parliament|mothership connection`：「2011 年列入美國國會圖書館的國家錄音登記表」→「2011 年入選國家錄音登記表」。用語統一
- `parliament|mothership connection`：「也首度加入號角組」→「也首度加入銅管組」。horn section 台灣慣用「銅管組」

其餘 23 張逐張審過，未改字。另核：Stone Roses「幾乎一手開創 Madchester」研究稿有 Sennett 與 Groth、Rolling Stone 兩處，照留；At Newport 寫「最早的現場藍調專輯之一」（Chris Smith 2009），未寫「第一張」；Soul Makossa「被視為史上被取樣最多的非洲歌曲」是維基敘述單一來源，用「被視為」；單曲卡（Strings of Life、Acid Tracks、Soul Makossa）照卡池慣例用〈〉並寫明 12 吋單曲／單曲。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-08.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（全為 desc2；本批無 desc4、無 CJK 卡），`Success!`。
- `verify-wave-kv` 回讀 30/30 逐字一致；`front-check ad-08`：30/30 前台為新稿，CURATED 0。
- manifest 同步 3 處（c29-blues、c30-blues、c31-world）。
- 兩批審稿改動總計：ad-07 6 處、ad-08 7 處。
- **工具注意**：`tools/check-curated.mjs` 會把前台現值**寫回 `worklist.json`**（是 s1 第 0 步用的工具），對已重寫過的批會把 worklist 的舊簡介換成新稿。s4 誤跑一次，已用 `git checkout` 還原 worklist；後續工作階段不要拿它當檢查工具。
## ad-09（殿堂 30 張，s5）

- 研究 3 Sonnet（WebSearch a 5／b 8／c 12 次）＋主線派 1 支 Sonnet 補查 10 張薄塊與周杰倫獎名（`research/sup-ad-09.json`，WebSearch 11 次；已併回 a／b／c 並標「主線補查 sup-ad-09」）。補完後 Al Atlal、Dust Bowl Ballads、楊弦、Bessie Smith、港台四張的聲音塊仍只有編制、詞曲者、改編來源與曲目結構，寫作照「只寫查得到的」薄寫。
- **研究稿主線更正**（`ad-09-c.json`）：周杰倫《范特西》第 13 屆金曲獎得的是「最佳流行音樂演唱專輯獎」（c 組誤記「最佳國語專輯」，舊稿原本是對的）；陶喆是「最佳專輯製作人獎」（c 組誤記「最佳唱片製作人」）。齊豫的榜單由「1994 百張榜」改為 Taipei Times 2009 報導的 200 最佳專輯 1975–92 榜第 3（sup 補查）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Dance Mania「最暢銷」、錄音年（1957 底）；Call of the Valley 白金唱片；Al Atlal「近四十九分鐘」「還我自由」；Blackboard Jungle Dub「第一張 dub」寫成定論、King Tubby 混音、Pablo「口風琴」；Liege & Lief 2002 票選與 2006 獎混寫；楊弦「弦樂鋪底」與殘留的作者指示句；Star Wars「約五十個主題」、Kingsway Hall（實為 Anvil）；West Side Story Saul Chaplin 不是製片；Chuck Berry「Johnnie Johnson 鋼琴貫穿全輯」；氷の世界 細野參與曲數；Ray Charles 葛萊美屬單曲、錄音兩地；許冠傑「被鄧麗君、梅艷芳、Beyond、周杰倫翻唱」；梅艷芳「1995 廣州禁唱」；Beyond「東京錄音」「富士山下小屋」；陶喆「開了老歌新唱的路」。
- 機器 QA：`qa-batch research ad-09` 1 標記（許冠傑研究稿一條 src 非完整網址，不進簡介）；`out` 3 標記：葛萊美／搖滾名人堂誤報、《俘虜》中文片名誤報、「中國大陸」用語（已修，見下）；fix-spacing 0；字數 225–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 9 處（8 張，`review-ad-09.json`）：

- `the blue hearts|the blue hearts`：「在日本搖滾名盤榜單上常排進前三名」→「常被列為日本搖滾最好的專輯之一」。「榜單上常排進前三名」是在描述榜單；改成直述地位（研究稿：Rolling Stone Japan 2007 第 3、bounce 2009 第 2，兩份榜）。同 ad-05 Marquee Moon 先例
- `坂本龍一|戦場のメリークリスマス`：「多數聲部用 Emulator II 演奏」→「多數聲部用 E-mu Emulator 取樣器演奏」。Emulator II 是 1984 年才推出的機型，1983 年錄音不可能用；研究稿只引坂本 2010 年推文的轉述，型號不寫死
- `leonard bernstein & stephen sondheim|west side story (original sound track recording)`：「配樂把爵士、拉丁節奏、交響式鋪陳與音樂劇慣例混在一起，配器比百老匯卡司錄音更厚實。」→「配樂把爵士、拉丁節奏、交響式鋪陳與音樂劇慣例混在一起。」。「配器比百老匯卡司錄音更厚實」研究稿沒有（只有樂團約三倍編制，已在前句），是推論
- `the upsetters|blackboard jungle dub`：「兩位風琴手、Augustus Pablo 的 melodica 與小號」→「三位風琴手、Augustus Pablo 的 melodica 與 Bobby Ellis 的小號」。事實錯誤：研究稿樂手表風琴是 Glen Adams、Winston Wright、Bernard Harvey 三人；原句讀成 Pablo 也吹小號，小號是 Bobby Ellis
- `楊弦|中國現代民歌集`：「《中國現代民歌集》常被視為台灣現代民歌發展的起點，」→「《中國現代民歌集》是楊弦 1975 年的專輯，被視為台灣現代民歌發展的起點，」。審稿第 1 問：第一句沒說是誰、哪年的唱片；研究稿只有中文維基一處說法，用「被視為」不用「常」
- `楊弦|中國現代民歌集`：「楊弦當時是台大海洋研究所的研究生，1974 年夏天」→「他當時是台大研究生，1974 年夏天」。補第一句後壓字；楊弦已在第一句出現
- `井上陽水|氷の世界`：「林立夫的鼓與 pedal steel」→「林立夫的鼓、大江俊之的 pedal steel」。事實錯誤：研究稿 pedal steel 是大江俊之，原句讀成林立夫兼彈
- `chuck berry|the great twenty-eight`：「二十八首自作曲」→「二十八首歌」。研究稿沒有「全為自作曲」的依據（收 21 首單曲、6 首 B 面、1 首專輯曲）
- `齊豫|橄欖樹`：「被讀成中國大陸」→「被讀成中國」。卡池用語：稱中國一律寫「中國」（qa-batch 標記）

其餘 22 張逐張審過，未改字。另核對：Goodman「大樂團第一次在卡內基演出」、Hank Williams「生涯銷量最高」、Star Wars「最暢銷的交響樂專輯」（研究稿皆維基，寫作用「被視為」或直述可證事實）、梅艷芳「創當時香港銷量紀錄」（HK01）、Beyond〈海闊天空〉YouTube 破億（2022）、Armstrong 國家錄音登記表 2002 是 Hot Five/Seven 錄音（成稿已寫明）皆有所本，照留。研究稿 `ad-09-c.json` 坂本條已加註 Emulator II 型號不採。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-09.json`（60 鍵，30 個非 null）。
- bulk put 39 鍵（desc2 30＋CJK 卡 desc4 9），wrangler 印 `Success!`；`verify-wave-kv` 回讀 39/39 逐字一致。
- `front-check ad-09`：30/30 前台為新稿，CURATED 0。
- manifest 同步 30 處（c31-world 8、c32-folk 5、c33-comps 4、c34-canon 2、c34-japan 2、c37-jazz 3、c38-soul 1、c41-chinese 5）。

## ad-10（殿堂 30 張，s5）

- 研究 3 Sonnet（WebSearch a 14／b 12／c 3 次；本工作階段研究層合計 65 次，含 sup-ad-09）、寫作 2 Opus。coverage 唯一 none 是어떤날 sound（維基、京鄉與搜尋都沒有編制描述），寫作只寫「平靜、淡然」、分寫曲數與曲長。thin：蘇芮、張惠妹、王菲、竇唯、산울림、신중현과 엽전들 聲音；Morricone 地位；Ellington、Billie Holiday、Herrmann、U-Roy、Oklahoma!、Wanted!、Spiritual Unity 聲音，照研究稿薄寫。未另派補查（已有可寫的編制與結構，且本工作階段 WebSearch 已用 65 次）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：蘇芮〈酒矸倘賣無〉不在台灣原版；張惠妹「張雨生主要製作人」（只製作兩首）；唐朝銷量確數；竇唯「人聲推到混音深處」；X JAPAN「BAKI 合唱」；신중현「看一次看兩次影射取消連任」；산울림「二十天四十萬張」（兩句誤併）；들국화「不靠電視打歌」「嘶吼唱腔」；유재하「獨力彈完全部樂器」「趙容弼樂團鍵盤手」「漢陽大學」；서태지「幾乎一人完成」；Grandmaster Flash「1980 年地鐵罷工後寫成」、國家錄音登記表收的是單曲；Morricone「法國一百萬」「第二場戲前不放音樂」；Herrmann「片尾只留音樂」；Ellington「補上呼吸感」；Billie Holiday〈Strange Fruit〉屬 Commodore；U-Roy TBL 161／Byron Smith；Oklahoma!「從未絕版」；Dusty「沒信心開嗓」；Wanted!「四首新曲」；Dolphy「最後一張錄音室專輯」；Byrds「整張只有一人彈」（限單曲）；Siembra「街頭噪音與警笛」；Ayler「滿場樂手停手」；崔健 1986 首唱場合。
- **諺文專名裁定**：writer-base「韓文諺文名維持諺文，首次出現加圓括號補羅馬拼音」；寫作層把신중현과 엽전들拆成「申重鉉（신중현）與葉錢們（엽전들）」並把團員寫成漢字，改回卡單藝人欄的諺文寫法、團員用諺文。羅馬拼音只補本卡藝人名（一張一處），團員與客座不補（字數，且規則用「可」）。諺文與中文之間**不加空格**：fix-spacing 只管拉丁字母，比照假名貼中文不空格的現行慣例；卡池舊稿 1 處先例也是不空格。
- 機器 QA：`qa-batch research ad-10` 3 標記（諺文專名誤報 2、研究稿 c 一個簡體「长」，不進簡介）；`out` 13 標記皆誤報（諺文專名、主線補的羅馬拼音、葛萊美／拉丁葛萊美名人堂、《奧克拉荷馬！》中文劇名、Hitchcock／McGuinn 專名、「2000 年代」）；fix-spacing 0；字數 225–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿）

改 18 處（10 張，`review-ad-10.json`；同一張多次壓字分開記）：

- `신중현과 엽전들|신중현과 엽전들 1집`：「是被稱為「韓國搖滾教父」的申重鉉（신중현）與葉錢們（엽전들）1974 年的第一張專輯」→「是신중현과 엽전들（Shin Joong-hyun & Yeopjeondeul）1974 年的第一張專輯」。本卡藝人名照卡單藝人欄逐字寫（writer-base：寫「박효신」不改成朴孝信），首次出現補羅馬拼音；原句把團名拆成漢字＋諺文兩種寫法
- `신중현과 엽전들|신중현과 엽전들 1집`：「樂團 1972 年在首爾成立，申重鉉彈吉他並主唱，李南二彈貝斯、金浩植打鼓，由地球唱片發行。」→「被尊稱為「韓國搖滾教父」的신중현 1972 年在首爾組團，自己彈吉他並主唱，이남이彈貝斯、김호식打鼓，唱片由地球唱片發行。」。韓國音樂人照 writer-base 寫諺文，不改漢字；「韓國搖滾教父」移到第二句
- `신중현과 엽전들|신중현과 엽전들 1집`：「同年底申重鉉因大麻案」→「同年底신중현因大麻案」。同上，人名寫法統一
- `산울림|산울림 1집 (아니 벌써)`：「是김창완三兄弟組成的산울림的出道專輯」→「是김창완（Kim Chang-wan）三兄弟組成的산울림（Sanullim）的出道專輯」。writer-base：諺文名首次出現加圓括號補羅馬拼音
- `들국화|들국화 1집 (행진)`：「是들국화的首張專輯」→「是들국화（Deulgukhwa）的首張專輯」。諺文名首次出現補羅馬拼音
- `유재하|사랑하기 때문에`：「是유재하唯一的專輯」→「是유재하（Yoo Jae-ha）唯一的專輯」。諺文名首次出現補羅馬拼音
- `어떤날|어떤날 i`：「雙人民謠團體어떤날的第一張專輯」→「雙人民謠團體어떤날（Eotteonnal）的第一張專輯」。諺文名首次出現補羅馬拼音（國語羅馬字 Eotteonnal）
- `서태지와 아이들|서태지와 아이들`：「是서태지와 아이들的首張專輯」→「是서태지와 아이들（Seo Taiji and Boys）的首張專輯」。諺文名首次出現補羅馬拼音
- `rodgers & hammerstein|oklahoma!`：「被視為確立了原卡司專輯這種形式」→「被視為讓原卡司專輯真正流行起來的唱片」。研究稿（AllMusic William Ruhlmann）說的是「確立了原卡司專輯的受歡迎程度」，不是首創這種形式；寫作層講過頭
- `dusty springfield|dusty in memphis`：「後來反覆進入史上最佳專輯榜單」→「後來常被列為史上最好的專輯之一」。「反覆進入榜單」是在描述榜單；改直述地位（研究稿：Rolling Stone 500 大 2003／2012 第 89、2020 第 83）。同 ad-05 Marquee Moon 先例
- `the byrds|mr. tambourine man`：「被視為搖滾史上最好的出道專輯之一」→「常被列為搖滾史上最好的專輯之一」。研究稿沒有「最好的出道專輯」的出處；有的是 Rolling Stone 500 大三版與 Larkin《All Time Top 1000 Albums》，多份榜單用「常被列為」
- `崔健|新長征路上的搖滾`：「常被稱為中國大陸第一張原創搖滾專輯，也是當時中國銷量最大的專輯，也被視為把華語音樂史分成崔健之前與之後的唱片」→「被視為中國第一張原創搖滾專輯，也是當時中國銷量最大的專輯，並被看作把華語音樂史分成崔健之前與之後的唱片」。卡池用語：稱中國一律寫「中國」；「第一張」只有中文維基一說，用「被視為」不用「常」；兩個「也」連用改順
- `신중현과 엽전들|신중현과 엽전들 1집`：「，唱片由地球唱片發行。」→「。」。補羅馬拼音後超字（283），刪廠牌
- `산울림|산울림 1집 (아니 벌써)`：「，〈청자(아리랑)〉長 7 分 40 秒」→「（刪）」。補羅馬拼音後超字（281），刪曲長
- `유재하|사랑하기 때문에`：「；1989 年起設有以他命名的音樂競演大會」→「（刪）」。補羅馬拼音後超字（281），刪後續
- `서태지와 아이들|서태지와 아이들`：「，另有幾首抒情歌」→「（刪）」。補羅馬拼音後超字（287），壓字
- `서태지와 아이들|서태지와 아이들`：「負責大部分作曲、編曲、編程與合成器」→「包辦大部分作曲、編曲與編程」。壓字（合成器屬編程範圍，研究稿：作曲、編曲、電腦編程與合成器）
- `dusty springfield|dusty in memphis`：「當年只爬到 Billboard 200 第 99 名，後來」→「當年只到 Billboard 200 第 99 名，後來」。改後超字（281），壓字

其餘 20 張逐張審過，未改字。另核對：Herrmann「美國電影學會 2005 年百年電影配樂榜第 12」照 ad-09 Star Wars 同例保留（AFI 屬機構榜單，比照國家錄音登記表）；Suicide「常被列為搖滾史上最重要的專輯之一」有 Rolling Stone 500、Pitchfork 70 年代榜、1001 Albums 多份；X JAPAN「常被列為日本搖滾最重要的專輯之一」有 Rolling Stone Japan、We Rock、Kerrang! 多份；Strokes「2000 年代最重要」有 NME 第 1、Rolling Stone 第 2、Guardian；崔健「把華語音樂史分成崔健之前與之後」單一來源（馬世芳）用「被看作」。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-10.json`（60 鍵，32 個非 null）。
- bulk put 43 鍵（desc2 30＋CJK 卡 desc4 13），wrangler 印 `Success!`；`verify-wave-kv` 回讀 43/43 逐字一致。
- `front-check ad-10`：30/30 前台為新稿，CURATED 0。
- manifest 同步 26 處（c41-chinese 3、c42-japan 1、c43-korea 6、c44-rock 3、c45-hiphop 1、c46-soundtrack-cross 5、c47-pop-country-latin 3、c50 3、c51 1）。

## ad-11（異端 30 張，s6）

- 第一批異端卡。派工補一份 `prompt-heresy-addendum.md`：研究層每張加 block `extreme`（極端的具體證據，盡量有數字）與 `reception`（當時反應／後來評價）各至少 2 條、coverage 加兩欄、fact 標「單一來源／多份」；寫作層前兩句寫極端在哪裡與為何被認真看待，出處只放 facts。
- 研究 3 Sonnet（WebSearch a 8／b 7／c 7 次）、寫作 2 Opus。coverage 無 none。thin：Doyle extreme、Gorguts sound、Two Virgins status、Penderecki（研究稿查不到演奏者，第一句只交代作品）、Lucier、Ustvolskaya 全塊、Lachenmann（卡單沒指定錄音版本，不寫演奏者）、Cage/Tudor reception、Masonna／Boredoms 聲音、Galás 當年反應、Bailey、Cecil Taylor 當年反應、Brötzmann 當年反應、Conrad，照研究稿薄寫。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Napalm Death「grindcore 是 Mick Harris 取的名」；Gorguts「1995 年首度解散」與誤植為 Obscura 評語的 Pitchfork《Colored Sands》句；Lucier 的 Nagra；Penderecki LSO／Abbey Road 與《The Shining》；Feldman 與 Rothko；Beefheart「未被承認的鼓手」（記譜者就是鼓手 John French）與 Groening 軼事；Royal Trux「Drag City 第一張」（DC1 是單曲，本盤是首張全長）；Masonna 年份與壓量；Yoko Ono 的 Bangs 誤引；Residents「四景」（六軌）；Bailey「題獻給 Aida Akira」；Walker「紀錄片捶打豬肉」；Conrad「唯一一張」；Coltrane「樂評一致推崇」（當時兩極）與 Liebman 誤引；Swans「工地零工」；Dead C「取樣 Lilburn」；Brötzmann「Don Cherry 取綽號」；Parker「找房間」。
- 機器 QA：`qa-batch research ad-11` 全過；`out` 5 標記皆誤報（「票選」為 Opernwelt 評論家票選、作曲家全名、年份 1973 為作曲年、Don Van Vliet 本名）；fix-spacing 0；字數 254–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它極端在哪裡」）

改 5 處（`review-ad-11.json`）：

- `napalm death|scum`：「它常被視為 grindcore 的奠基之作」→「它常被列為 grindcore 的必聽專輯」。研究稿只有 Terrorizer 2009 歐洲 grindcore 必聽第 5、Decibel 稱啟發無數樂團，沒有「奠基」說法；不升級封號
- `oleg malov|ustvolskaya: composition no. 2 dies irae`：刪「，木方塊的敲擊被形容為像在演出憤怒之神的重擊」。比喻（NYT 評語，出版商部落格間接轉引、單一來源），第 4 問
- `john cage & david tudor|variations iv`：「，唱片節選其中七段，被視為一份典型的聲音剪貼。」→「，唱片節選其中七段。」。依據是部落格（Electronic Cottage），英文維基反而說這張常被誤認為拼貼、錯呈作品本意；兩說相反，刪
- `the residents|eskimo`：「評價兩極，有樂評給滿分，也有人說它是沉悶陰濕的概念專輯，另被視為搖滾裡的新聲音。」→「發行後評價分歧，有樂評給五星，也有樂評嫌它是沉悶的概念專輯。」。三分句堆疊；「搖滾裡的新聲音」是地方報單一來源、語意空泛，刪；依研究稿 MusicHound 五星、Rolling Stone Album Guide「dreary and dank」
- `captain beefheart & his magic band|trout mask replica`：「聽來像亂彈，其實多是事先寫好。」→「這些段落幾乎都是事先譜寫好的。」。反轉句（第 4 問）；依研究稿 Dean Blackwood 條

其餘 25 張逐張審過，未改字。極端那一問：30 張前兩句都有長度、編制或手法的具體事實（Feldman 6 小時 7 分、Sorabji 約 4 小時 45 分、Helikopter 四架直升機、Lucier 32 次重錄、Scum 28 首 33 分鐘、Ascension 十一人未排練 40 分鐘等）。最薄的是 Royal Trux（「編排被拆解、人聲不照常規、製作緻密」＋C 面 14 分 32 秒單曲），研究稿只有二手摘要，維持。另核：Doyle「被視為自由爵士最兇猛的錄音之一」有 The Hum、Burning Ambulance、RBMA 多處；Merzbow 評價兩極（Pitchfork 8.7／AllMusic 2.5）照實寫；Boredoms「被視為 1980 年代最佳專輯之一」是單一榜單（Pitchfork 2002 第 89），用「被視為」。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-11.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（全為 desc2；本批無 desc4、無 CJK 卡），`Success!`；bulk get 回讀 30/30 逐字一致。
- `front-check ad-11`：30/30 前台為新稿，CURATED 0。
- manifest：0 處需同步。

## ad-12（異端 30 張，s6）

- 研究 3 Sonnet（WebSearch a 9／b 12／c 14 次）＋主線 2 次（零與聲音解放組織、John Wiese 補查，皆無新可用事實；TMT 頁 500）。s6 研究層合計 57＋主線 2 次。寫作 2 Opus。
- coverage none：John Wiese sound／extreme、不失者 extreme、零與聲音解放組織 making／sound。三張照「只寫可證事實、無聲音資料就不寫聲音段」寫（256／266／260 字）；John Wiese 前兩句講不出極端在哪裡，研究稿就是沒有，**不硬擠**，留待日後有資料再補。thin：AMM、Painkiller、Torture Garden 地位；Whitehouse、Neubauten 製作；Henry 當代評價（只能用 Béjart 1965／Balanchine 1974 改編撐）；Radigue 聲音（單一來源）；Xenakis、Kontakte 評價；Confield 極端；Ikeda 評語無日期。
- 研究層推翻舊簡介的主要錯誤（新稿未沿用）：Painkiller「孕婦驗屍照」「海關入境沒收」（實為英國首批貨依猥褻出版物法查扣銷毀）；Whitehouse「Albini 錄混整張」「全由 Sotos 取樣」；TG「Industrial Records 四人創立」；Naked City〈Batman〉是翻奏；《Torture Garden》是合輯（42 首中 9 首來自首張）；Braxton 只寫負評（同年 DownBeat 五星）；Persepolis「波斯建國 2500 週年」（實為 Shiraz 藝術節）、「150 名孩童」；Kontakte 首演月份（6 月 11 日）與「700 頁草稿」；Henry 教堂譯名（Saint-Julien-le-Pauvre）；Radigue「六段對應中陰」；Ikeda「加入 Touch 首張」；Sunn O)))「靈車」；不失者「兩百餘張」（超過 100）與「威尼斯雙年展」（第 70 屆威尼斯國際現代音樂節終身成就金獅獎）；零與聲音解放組織的 NA 03、400 張、51 分鐘十二段、勞工遊行錄音（皆查無）；John Wiese「逾 50 件發行」。
- 機器 QA：`qa-batch research ad-12` 5 標記（研究稿 src 為 http 非 https 4 張、c 組一個簡體「国」，皆不進簡介）；`out` 1 標記誤報（Sean Booth 專名）；fix-spacing 0；字數 228–279。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它極端在哪裡」）

改 5 處（`review-ad-12.json`）：

- `einstürzende neubauten|kollaps`：刪「，也收進《1001 Albums You Must Hear Before You Die》」。書名屬出處，不寫進簡介（ad-03 羅大佑同例）
- `nurse with wound|chance meeting on a dissecting table of a sewing machine and an umbrella`：「後來它常被列入 1970 年代與英國地下音樂的重要唱片」→「後來被視為英國地下音樂的關鍵唱片」。研究稿只有 The Wire 1998 一份榜單，單一來源用「被視為」；「1970 年代」無所本
- `autechre|confield`：「Metacritic 綜合 82 分」→「樂評綜合評分 82 分」。媒體名屬出處（Madvillainy 先例）
- `portal|vexovoid`：「Metacritic 綜合 76 分」→「樂評綜合評分 76 分」。同上
- `零與聲音解放組織|z.s.l.o.`：「《Z.S.L.O.》是零與聲音解放組織的作品。」→「《Z.S.L.O.》是零與聲音解放組織 1994 年的作品。」。第 1 問：補卡單年份

其餘 25 張逐張審過，未改字。極端那一問：27 張前兩句有長度、編制、手法的具體事實（For Alto 72 分 58 秒單支中音薩克斯風、Trilogie 約 2 小時 48 分三首、Persepolis 59 支揚聲器戶外、Earth 2 三首 73 分幾乎無鼓、Torture Garden 42 首 25 分 46 秒等）；John Wiese、不失者、零與聲音解放組織三張研究稿沒有極端證據，前兩句只能講是什麼與歷史位置（零與聲：台灣第一個噪音團體），維持。另核：Braxton「被視為第一張完全由薩克斯風獨奏構成的爵士專輯」研究稿有註明 Hawkins／Rollins／Dolphy 先前只錄零星獨奏；Last Exit「高峰」是 AllMusic 單一來源，用「被視為」；Torture Garden〈Bonehead〉〈Hellraiser〉用於《Funny Games》片頭有據；TG「文明的破壞者」是 1976 年保守黨議員 Nicholas Fairbairn 所說，屬史實；This Heat「常被列為 1980 年代最好的專輯之一」有 Pitchfork 2002／2018 兩份榜（名次不寫）；Whitehouse「最成熟、最多樣」出自 Ars Electronica 評審頁，「被視為」。Nurse with Wound 盤名太長，第一句不重寫盤名（卡面已有），維持。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-12.json`（60 鍵，30 個非 null）。
- bulk put 32 鍵（desc2 30＋CJK 卡 desc4 2：不失者、零與聲音解放組織），`Success!`；bulk get 回讀 32/32 逐字一致。
- `front-check ad-12`：30/30 前台為新稿，CURATED 0。
- manifest 同步 3 處（c42-japan 1、c51 1、ctw-taiwan-indie 1）。
- 兩批審稿改動總計：ad-11 5 處、ad-12 5 處。

## ad-13（異端 25 張，s7）

- 派工補充：殿堂批的派工詞偏重樂評與榜單，s7 加 `prompt-research-extra-s7.md`／`prompt-writer-extra-s7.md`（異端＝極端在哪裡＋為什麼被認真看待；流亡＝為什麼少有人聽＋為什麼值得聽；再版廠文案形容詞不當地位證據；出處只放 facts）。
- 研究 3 Sonnet（WebSearch a 16／b 16／c 8 次）、寫作 2 Opus。coverage 唯一 none：Solmania sound、Government Alpha making。**主線補查 MusicBrainz**（不耗 WebSearch）：Metamorphor Chorus 1991-01-25 Alchemy ARCD-020 五軌（Flood 27:47…）、Alphaville 1999-09 瑞典 Segerhuva SEGER 1 七軌（Enantiodromia 9:17）——舊稿這兩筆其實是對的，併回 `research/ad-13-b.json` 標「主線補查」。Solmania 聲音只寫大野雅彥的自製多弦吉他做法，不宣稱本盤編制。
- **異端卡 status 普遍 thin**：多數噪音／即興盤沒有大媒體專評，地位改用具體的極端事實（單曲長度、聲源、手法、壓量）＋被誰點名或再版；廠商文案（Grapefruit、Tobira、Soleilmoon、Editions Mego、Dialogo）只取事實。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Consume Red 樂器是 hojok（胡笛）不是嗩吶；Symphony for a Genocide 五首不是七首；Mort à Crédit「生前唯一流通專輯」（實為生前最後一張）；解体的交感 把高柳給 New Direction 的三條指令套到這場雙人演出；Bestial Burden 手術照片／臥床三週／嘔吐聲；蔵六の奇病 錄音期間；Quietus「曲名引用職業」；C.C.C.C. 黑膠軌數；Menche「Skunkworks Studios」與年份（1994）；Hecker「六軌全同名」；Tone 生地與移居年；Amacher 師承；Minton 曲數。
- **《Tiger Thrush》日文盤名用「虎鶫」**：日文漢字是「鶫」（つぐみ），研究稿寫的「鶇」是繁中字形；原文標題一字不改，用日文字。
- 機器 QA：`qa-batch research ad-13` 通過；`out` 3 標記皆誤報（Coltrane 專名、International Jazz Forum 票選屬具名獎項、虎鶫）；fix-spacing 0；字數 221–280。

### 主線審稿（2026-11-04，25 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 13 處（9 張，`review-ad-13.json`；同一張多次改分開記）：

- `pharmakon|bestial burden`：「同名曲被列入當年的年度歌曲榜」→「同名曲進了 2014 年的年度百大單曲榜」。「年度歌曲榜」太含糊；研究稿 status：Pitchfork 2014 年度單曲第 75 名（百大）
- `高柳昌行 / 阿部薫|解体的交感`：「常被視為當時最激進的自由爵士示範之一」→「被視為當時最激進的自由爵士示範之一」。單一來源（Positive Feedback），不用「常」
- `高柳昌行 / 阿部薫|解体的交感`：「，兩人的交鋒更像吵架而不是對話」→「（刪）」。審稿第 4 問：比喻（Oleś 的「街頭吵架」）
- `manfred schoof|european echoes`：「常被拿來和 John Coltrane 的《Ascension》相比，被視為聽來吃力、但演出極為出色」→「被拿來和 John Coltrane 的《Ascension》相比，被視為聽來吃力、但演出卓越」。比較出自單一來源（Shoemaker），不用「常」；「卓越」照 Penguin Guide 原意
- `nihilist spasm band|no record`：「起初是替實驗電影組的 kazoo 合唱團」→「起初是為一部實驗電影組成的 kazoo 合唱團」。語句不通；研究稿 making：為實驗電影組成的 kazoo 合唱團
- `the new blockaders|changez les blockeurs`：「常被稱為最早的噪音唱片之一」→「被視為最早的噪音唱片之一」。具名來源只有 RRR 的 Ron Lessard 一人，不用「常」
- `阿部薫|mort à crédit`：「常被視為他風格轉向的標記」→「被視為他風格轉向的標記」。單一評者（Soundohm 頁），不用「常」
- `非常階段|蔵六の奇病`：「秋田昌美（Merzbow）稱他們是關西最兇惡的樂團」→「被視為關西最兇惡的樂團」。出處不寫進簡介（apex-desc-base 語氣節）
- `hecker|acid in the style of david tudor`：「評價兩極：有樂評只給 6 分（滿分 10），認為要經過嚴格訓練才能欣賞；也有樂評說隨附專文讓它成了有意思的哲學工具，卻很難想像有人為樂趣去聽。」→「評價兩極：它被認為要經過嚴格訓練才能欣賞，也被認為靠隨附的專文成了有意思的哲學工具，卻很難為了樂趣去聽。」。出處不寫進簡介（「有樂評說」屬引述句式）；分數去掉
- `yasunao tone|solo for wounded cd`：「也是他學界討論最多的作品之一」→「也是他在學界被討論最多的作品之一」。語句不通
- `pharmakon|bestial burden`：「2014 年由 Sacred Bones 發行，」→「（刪）」。審稿改句後超字（283），壓字；年份仍在同句
- `nihilist spasm band|no record`：「，成員多有正職」→「（刪）」。審稿改句後超字（282），壓字
- `yasunao tone|solo for wounded cd`：「他形容播放器的行為完全不可預測」→「播放器的行為因此完全不可預測」。審稿改句後超字（281），壓字

其餘 16 張逐張審過，未改字。第五問（憑什麼是這一級）25 張都在前兩句講出極端的具體事實（整碟一首約一小時、無輸入混音台、刮傷 CD、純人聲獨奏、不剪接不疊錄不用電子、單一回授聲源等）＋被認真看待的事實（年度榜、被 Merzbow／Thurston Moore／Stapleton 點名、再版、學界討論）。另核對：Bestial Burden Metacritic 79 與 Pitchfork 年度單曲 75 有研究稿；Tudor「自製電路被視為現場電子音樂的里程碑」出自英文維基；Current 93「啟發許多暗黑氛圍與儀式工業團體」研究稿有。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-13.json`（50 鍵，29 個非 null）。
- bulk put 29 鍵（desc2 25＋CJK 卡 desc4 4），wrangler 印 `Success!`；`verify-wave-kv` 回讀 29/29 逐字一致。
- `front-check ad-13`：25/25 前台為新稿，CURATED 0。
- manifest 同步 25 處（13 個 manifest 檔）。

## ad-14（流亡 30 張，s7）

- 研究 3 Sonnet（WebSearch a 15／b 14／c 13 次；本工作階段研究層合計 82 次）、寫作 2 Opus。coverage none：非常階段《Viva Angel》sound、Shiho Yabuki／Anno Luz／Ariesta Birawa／Giant Step making。裁定：Viva Angel 聲音借 `research/ad-13-b.json`《蔵六の奇病》的團體層級事實，寫成團體做法、不宣稱本盤編制；making none 的不寫錄音經過。未另派補查。
- **主線裁定**（寫進寫作派工詞）：
  - 浜瀬元彦《Reminiscence》日文維基 1985、商家 1986 兩說 → 簡介寫「1980 年代中期」；2018 Studio Mule 版是重新錄音，不寫成再版。
  - Derek Bailey《Solo Guitar Volume 1》以 1971 Incus 原版為主體，卡名 Volume 1 來自 2017 Honest Jon's 版，放後續一句。
  - Paul Rutherford 一直在版，不寫「難找」；地位用具名評價（Bailey 在 The Wire 1987、Penguin Guide 四星），少人聽的理由寫成長號獨奏自由即興本身。
  - Company Caine 是商業發行、進過 Kent 榜，不是私壓；寫長年未再版、2015 才出 CD。
- **卡池資料疑點（未動 seed，留給店主）**：Junei《Let's Ride》seed 年份 2014，原 45 轉單曲是 1987 年 Pharaohs Records（2014 應是 Numero 版）。簡介照 1987 寫。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：한대수「文化公報部回收命令」「〈희망가〉禁歌」；Zodiac「每首兩三分鐘」「極具張力的自由爵士」；Yabuki 的 Morning 廠牌／新体道／延曆寺法會；小久保隆「五首」「鳥鳴」；Anno Luz 的 Tangerine Dream 比較與小提琴；Burchette「六張」（七張）；Viva Angel 節奏機／排尿／豬頭；Angkanang 單曲年份（1972）；Piano Choir 誰打頭陣；Brief Encounter「Jazzman 2010 復刻」；Errata Corrige「限量 500 張」；Finnerud「國家美術館收藏」；Bluiett「上低音站最前面」；Mahogany Brain 內頁作者與曲長；Company Caine 錄音月份。
- 機器 QA：`qa-batch research ad-14` 通過；`out` 3 標記：「1970 年代」誤報 2、BAG「不具名名單」（已改，見下）；fix-spacing 寫作層補 1 處、主線後 0；字數 215–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 5 處（5 張，`review-ad-14.json`）：

- `junei|let's ride`：「，聲音被認為比芝加哥浩室早了幾年」→「（刪）」。再版廠（Numero）文案，不當評價寫（prompt-research-extra-s7）
- `aka|do what you like`：「專輯裡約三到四成是 Ucok 唱的硬搖滾，其餘是常由鼓手唱的憂鬱流行歌」→「他們的專輯通常約三到四成是 Ucok 唱的硬搖滾，其餘是憂鬱的流行歌」。印尼文維基講的是樂團專輯通例，不專指本盤；「鼓手唱」研究稿未寫明身分
- `angkanang kunchai with ubon-pattana band|isan lam plearn`：「，被認為是第一次把 molam 與 luk thung 融在一起的唱片，催生了 luk thung Isan 這個類型。」→「。」。「第一次融合、催生類型」只有再版廠（Oye／EM）文案，無具名來源，不寫
- `jemeel moondoc & muntu|the evening of the blue men`：「有評論認為，若不是當年流通有限，它可能早被視為現代爵士經典」→「它被認為若不是當年流通有限，可能早已被視為現代爵士經典」。出處不寫進簡介（「有評論認為」屬引述句式）；來源 Clifford Allen（Paris Transatlantic 2010）
- `black artists group|in paris, aries 1973`：「後來被列進自由爵士必聽唱片的名單」→「後來被列進兩份自由爵士必聽唱片名單」。機器 QA 標「不具名名單」；研究稿：Elliott Sharp（Village Voice）與 Thurston Moore 各一份，寫明是兩份

其餘 25 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（私壓、小廠、卡帶、促銷盤、郵購、只演一場、樂團早散、廠牌結束）與再發現（再版廠＋年份、被取樣、被收進合輯）；有具名評價的（Bailey、Rutherford、Transs、Dadawah、Moondoc、Company Caine、Finnerud、小久保隆）寫成「被視為」。另核對：小久保隆「環境音樂／療癒音樂的里程碑」出自日文維基；Ariesta「第一張能買到的印尼迷幻專輯」出自 NTS；Company Caine「1970 年代初前衛搖滾的里程碑」出自 Ian McFarlane；Mahogany Brain 丟磚塊出自英文維基 Bulteau 條。한대수「母帶也被收走」只有텐아시아一家，照留（具體、非評價）。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-14.json`（60 鍵，32 個非 null）。
- bulk put 34 鍵（desc2 30＋CJK 卡 desc4 4），wrangler 印 `Success!`；`verify-wave-kv` 第一次 3 鍵舊值（傳播延遲），重讀 34/34 逐字一致。
- `front-check ad-14`：30/30 前台為新稿，CURATED 0。
- manifest 同步 24 處。


## ad-15、ad-16（流亡 30＋30，s8）

- 派工補充：新增 `prompt-research-extra-s8.md`／`prompt-writer-extra-s8.md`（status 分「為什麼少人聽」「為什麼值得聽」兩半各至少 1 條；日本盤先找日文廠頁與部落格；廠商文案形容詞不當評價；團體層級事實不冒充本盤；Discogs 擁有／想要人數不寫數字；每支研究最多 25 次 WebSearch）。
- 研究 3 Sonnet×2 批（WebSearch ad-15 a 16／b 13／c 12、ad-16 a 18／b 21／c 16；主線 2 次；合計 98）、寫作 2 Opus×2 批。
- **研究代理撞檔**：ad-15-a 與 ad-16-b 共用了同一個 /tmp 腳本，互相寫進對方的輸出檔，兩支事後各自拆回；主線逐檔核 key：6 檔各 10 筆、無缺無多。寫作派工改為每支用自己的暫存目錄。
- **主線補查（Discogs API 可通，`api.discogs.com`，UA 照規定）**：網頁版 Discogs 對代理 403，但 API 不擋。補了 Hope of Glory（1974、credits、十首詩歌／敬拜曲、從未再版）、中村ヨシミツ《魂のギター》（JD-10、1983-09-08/09 ペンション糸車、七首曲長）、板倉克行《海猫の島》（JD-07、1982-06-03、K48 平台鋼琴獨奏）、つのだひろと体力バンド（兩面各一首 29:35／26:50、1978-03-20 與 09-29 錄音、三重奏編制）、Pablo Picasso、Z.O.A、Bob Ayala、Bouquet of Steel、Paul Nagle 的 credits／曲目／錄音地，以及生活向上委員会原版（見審稿）。都標「主線補查，Discogs API」併回研究稿。Z.O.A 團員名照 Discogs 羅馬拼音，不自行轉漢字。
- **主線裁定**：Hope of Glory、中村ヨシミツ 研究層原本三塊皆 none，補查後照 facts 薄寫（只寫是什麼、只有原版、編制、曲目性質），不寫評價。Clark Sisters、Charles Tyler、Stan Tracey 研究稿沒有「少人聽」的證據，不硬寫稀少，寫它做到什麼與再版。Rien Djamain 發行年 1975／1976 兩說，簡介不寫年份。
- **卡池資料疑點（未動 seed）**：Chico Freeman《Kings of Mali》seed 1977 是錄音年，India Navigation 1978 年發行；Earthen Vessel 原版 1971／1972 兩說（seed 1972）。
- 研究層推翻舊稿的主要錯誤／未證實細節（新稿未沿用）：Maitreya Kali 單聲道、Kandahar 遭搶；Dada「只壓 200 張」；Salaried Man Club C46、12 萬日圓與分段；Sindelfingen「99 張避稅」；Chico Freeman「三人兼彈拇指琴」（實為 balafon／bailophone）；Philemon Arthur「抗議導致 Grammis 停辦」因果；大工哲弘 Tom Cora 製作與無形文化財；John Taylor「首次重發」；Agape 四軌卡匣剖曲；Concrete Rubber Band Akai／ARP 器材；Peter Cusack 標題典故；Complex Steve Coe 與 Sheila Chandra 婚姻；Spherical Objects「隔年重混」（實為重切再版）；Storm Bugs 盤帶毀於水災；Bladder Flask 曲長與〈Matrosen Tango〉引用。
- 機器 QA：`qa-batch research` ad-15 2 標記（研究稿內千分位、「艺」已改「藝」）、ad-16 1（研究稿內千分位）；`out` ad-15 0、ad-16 4 標記（CCM 票選屬具名、3 個年代誤報；CCM 句另因指涉不清修改）；fix-spacing 0；字數 ad-15 212–277、ad-16 227–280。半形符號只在原文盤名內。

### 主線審稿 ad-15（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 12 處（8 張，`review-ad-15.json`；同一張多次改分開記）：

- `明田川荘之|aketa's erotical piano solo & grotesque piano trio`：「；標題雖寫 Erotical 與 Grotesque，內容並不特別色情或怪誕。」→「。」。反轉句；出自 Soundohm 商品文案，不當事實寫
- `生活向上委員会|生活向上委員会ニューヨーク支部`：「錄下的作品，2022 年比利時 Aguirre 重製黑膠時，距錄音已超過四十年。」→「錄下、當年自費壓製的專輯，2016 年 Off Note 出 CD，2022 年比利時 Aguirre 重製黑膠。」。初稿暗示原版未發行；Discogs release 1722471：1975 自主發行 Ski No. 1（ALM AL-10），另有 2016 Off Note NON-25、2022 Aguirre ZORN83。已補進研究稿
- `salaried man club|gray cross`：「，被稱為「白領工業」」→「（刪）」。封號（再發方與媒體的標語），審稿第 4 問
- `den sei kwan|pocket planetaria`：「，用極簡 wave 的形式呈現」→「（刪）」。零售商文案用語，讀了想像不出聲音；保留短波靜電聲素材
- `ché-shizu|約束はできない`：「另有鍵盤、貝斯與打擊。這些歌不照一般搖滾的寫法走，很難歸進迷幻或搖滾任何一類。」→「另有鍵盤、貝斯與打擊。」。P-Vine 商品文案的說法，研究稿標廠商文案，不寫
- `hugh hopper / elton dean / alan gowen / dave sheen|rogue element`：「吹得特別猛烈，常被認為比原陣容的錄音更成功。」→「吹得特別猛烈；這場錄音被認為比有 Pip Pyle 的早期錄音更成功。」。原句主詞像是 Dean 的獨奏；評價只有 Nic Jones（All About Jazz）一家且僅見搜尋摘要，不用「常」
- `blue notes|blue notes for mongezi`：「常被視為樂團最全面也最真實的錄音」→「被視為樂團最全面也最真實的錄音」。單一來源（Barry Witherden，Jazz Journal，見英文維基），不用「常」
- `john taylor|pause, and think again`：「2015 年才由 RPM 重發；」→「1995 年起才陸續有 FMR、RPM 等重發；」。事實錯誤：研究稿 status 記 1995 年 FMR 已重發，2015 年 RPM 盒裝並非首次（musicweb-international）
- `生活向上委員会|生活向上委員会ニューヨーク支部`：「梅津 1974 年先到紐約，原田隔年 7 月抵達，都在」→「都在」。審稿改句後超字（295），壓字
- `生活向上委員会|生活向上委員会ニューヨーク支部`：「這是梅津組的第一個團。」→「（刪）」。壓字；出自 Farside 商品文案
- `hugh hopper / elton dean / alan gowen / dave sheen|rogue element`：「樂團原名 Soft Heap，」→「（刪）」。審稿改句後超字（291），壓字
- `john taylor|pause, and think again`：「銅管主題明快，Wheeler」→「Wheeler」。審稿改句後超字（283），壓字

研究稿同步：`ad-15-a.json` 生活向上委員会補 Discogs 原版 credits 與發行史（Aguirre 頁「梅津吹單簧管」與 Discogs 不符，以 Discogs 為準）。其餘 22 張逐張審過，未改字。第五問：前兩句都講出流通狀況（圖書館唱片不零售、私壓約百張、限量卡帶箱組實做 30 套、自主廠第一號、長年絕版）與再發現（再版廠＋年份）；Mimaroğlu 一張沒有專輯層級的流通資料，只能寫作曲家與手法，照留。

### 主線審稿 ad-16（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 6 處（5 張，`review-ad-16.json`）：

- `charles tyler|saga of the outlaws`：「常被視為他最好的錄音與七〇年代紐約 loft 爵士的經典」→「被視為七〇年代紐約 loft 爵士的經典」。研究稿只有 Ed Hazell（Point of Departure）「loft 爵士經典」一說，「他最好的錄音」無出處；單一來源不用「常」
- `complex|the way we feel`：「鍵盤手 Steve Coe 的 Farfisa 風琴與大鍵琴」→「Farfisa 風琴與大鍵琴」。研究稿只說 Coe 是鍵盤手、本盤以風琴為主要質地，沒寫是他彈的（寫作層自陳推論）
- `stan tracey quartet|captain adventure`：「這組四重奏常被視為 Tracey 最好的陣容。」→「這組四重奏被視為 Tracey 最好的陣容。」。「最好」只有 Jon Turney 一家（Fordham 是「偉大陣容之一」），不用「常」
- `steve beresford|the bath of surprise`：「錄音由兩人一起完成，後來被看作他獨奏路線的起點之一。」→「錄音由兩人一起完成。」。研究稿只說近年獨奏錄音「承接」此盤，「被看作起點」是推論
- `steve beresford|the bath of surprise`：「日常物件和玩具跟樂器一樣拿來即興；原版黑膠至今仍在二手收藏圈流通。」→「日常物件和玩具跟樂器一樣拿來即興。」。根據只是二手店標價，無實質內容
- `bob ayala|joy by surprise`：「這一年他被 CCM 票選為最佳新人」→「發行當年他被 CCM 雜誌票選為最佳新人」。「這一年」接在「隔年」之後會讀成 1977；英文維基：CCM 1976 年選他為 Best New Artist

其餘 25 張逐張審過，未改字。另核對：Rien Djamain「印尼最好的專輯之一」出自 Rolling Stone Indonesia 150 張榜（印尼維基）；Grow Up「小廠最好的唱片」出自 Paul Morley（NME，LTM 轉載）；Wilson McKinley「悠閒西岸風格最好的唱片之一」與 Concrete Rubber Band「同類唯一」出自 Acid Archives；Bladder Flask 被 Stapleton 喜愛有原話；Blue Notes for Mongezi「最全面也最真實」出自 Barry Witherden（Jazz Journal）；キングコングパラダイス「目錄裡的例外」是零售頁的事實描述（anomaly），照留。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-15.json`、`kv-before-ad-16.json`（各 60 鍵，各 37 個非 null）。
- bulk put ad-15 37 鍵、ad-16 37 鍵（各 desc2 30＋CJK 卡或原有 desc4 7）；ad-16 親眼見 `Success!`，ad-15 的輸出被 npm 訊息截掉，以回讀確認：`verify-wave-kv 20261104 ad-15 ad-16` 74/74 逐字一致。
- `front-check`：ad-15 30/30、ad-16 30/30 前台為新稿，CURATED 0。
- manifest 同步 ad-15 30 處、ad-16 30 處（20 份 onboarding manifest）。

## ad-17（流亡 30 張，s9）

- 派工照 s7 的 `prompt-research-extra-s7.md`／`prompt-writer-extra-s7.md`。研究 3 Sonnet（WebSearch a 17／b 17／c 13 次）、寫作 2 Opus；主線補查 WebSearch 4 次＋Discogs／MusicBrainz API（不耗 WebSearch）。本工作階段 WebSearch 合計約 90 次。
- **coverage none 與主線補查**：忍冬創、ほうむず、五条坂三張日本自主盤研究層三塊全 none（日文／羅馬字搜尋皆無結果）。主線用 Discogs API 補 credits、Private press 註記、收藏統計與音のメルヘン屋廠牌頁（千駄ヶ谷私家版錄音室、1966 創立），MusicBrainz 補曲長；併回 `research/ad-17-b.json` 標「主線補查」。A Band Called Doris、Treatment、Mach One、Abel Ganz 同樣以 Discogs API 補（Mach One 只壓 1000 張、750 張經 Pinnacle、250 張演出現場賣；Abel Ganz 1985 自主卡帶、主唱 Paul Kelly——推翻研究層「查不到 Paul Kelly」）。
- **裁定**：
  - sound none 的不從曲名、封面或風格標籤推音色，只寫編制、分工、主唱輪替、曲長結構；Discogs 風格標籤只准寫成「路數偏某某」的層級。
  - **Discogs 收藏統計一律寫質性**（「在收藏圈想找的人遠多於手上有的人」），不寫人數與倍數——數字會變，不到當下仍成立。ad-18 同裁定。
  - 只查過 Discogs／MusicBrainz 單一版本的，寫「沒有再版紀錄」，不寫「之後沒有再版」。
  - **忍冬創 字數下限放寬**：可證事實只剩私家版、廠牌、收藏統計、曲長，補廠牌頁後 217 字；不湊。
  - 年份分歧（We Be Echo 1982／83、Allengrass 1972／73、Airbridge 1982／83）寫「1980 年代初」「1970 年代初」；Mach One 主唱 Discogs（Steve Bauer）與維基（Steve Fisher）衝突，不寫名字。
- **卡池資料疑點（未動 seed，留給店主）**：Kyle Creed《Liberty》原版廠牌 Discogs 記 Mountain（1977），店家頁記 Heritage；簡介寫 Mountain、Heritage 兩度重發（1979、2009）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Munde「十二首只有四首自作」、Red Allen「四首原創全掛 Neal Allen」、Hash「提琴只在五軌」、Zueff「Break-Fast 系列／1998 年 6 月首發 13 軌合輯」、Ura Ura「Ivory Tower 的下一個編號」（實為 SZY009 早於 SZY011）、Nic Potter 與 John Ellis 合寫、Mach One 的 Orlake 代工。
- 機器 QA：`qa-batch research ad-17` 1 標記（Zueff 俄文名誤報；4 條 http／未編碼 src 已改完整 https）；`out` 3 標記皆誤報（IBMA 名人堂有主辦者、2024／1990 年代、2022 有研究稿）；fix-spacing 0；字數 217–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 12 處（11 張，`review-ad-17.json`）：

- `kyle creed|liberty`：「，常被視為老調音樂樂手該找來聽的唱片。」→「，1979 年與 2009 年由 Heritage Records 兩度重發。」。「常被視為該找來聽」研究稿 facts 無具名出處（寫作層自承來自次級來源）；改寫研究稿已有的重發事實
- `忍冬創|創ファーストアルバム 春秋坂`：「掛在音のメルヘン屋名下，」→「掛在音のメルヘン屋名下，這是東京千駄ヶ谷一家 1966 年創立、專接私家版委託的錄音室，」。只有 185 字；主線補查 Discogs 廠牌頁（Private-press recording studio in Sendagaya, Tokyo. Founded 1966）補流通脈絡
- `忍冬創|創ファーストアルバム 春秋坂`：「這張唱片之後沒有再版，」→「這張唱片沒有再版紀錄，」。只查過 Discogs／MusicBrainz 單一版本，不斷言從未再版
- `ほうむず|朝日に向かって`：「這張唱片之後沒有再版，」→「這張唱片沒有再版紀錄，」。同上
- `五条坂|季節はめぐって`：「這張唱片之後沒有再版，」→「這張唱片沒有再版紀錄，」。同上
- `a band called doris|gypsy lady`：「它流通得很少，現在登記擁有的收藏者約 40 人，想要的有 126 人。」→「它流通得很少，在收藏圈想找的人遠多於手上有的人。」。Discogs 收藏人數會變動，不到當下仍成立；改質性寫法（ad-18 同裁定）
- `treatment|intensive`：「流通量很小，現在登記擁有的收藏者只有 12 人。」→「流通量很小，在收藏圈手上有的人很少。」。同上
- `web|ivory tower`：「，現在登記想要的收藏者約是擁有者的四倍」→「，在收藏圈想找的人遠多於手上有的人」。同上
- `okihide|a boy in picca season`：「；現在登記想要這張的收藏者約 345 人，在 Syzygy 同時期的唱片裡是最多人在找的之一」→「，在收藏圈想找的人遠多於手上有的人」。同上；「最多人在找的之一」研究稿只說「想要數偏高」，降級
- `mind design|view from the edge`：「；現在登記想要的收藏者有 363 人，是擁有者的五倍多」→「，在收藏圈想找的人遠多於手上有的人」。同上
- `geoff mann|i may sing grace`：「，後來在收藏圈被稱為被忽略的經典」→「（刪）」。出自單一部落格留言，屬沒出處的封號（審稿第 4 問）
- `taichi|am i`：「，2017 年同廠 Suzukiski 的 EP 被再版並受到好評」→「（刪）」。講的是同廠別人的唱片，和本盤地位無關，屬湊字

其餘 19 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（私家版、自主卡帶、小廠 CD、壓量 1000、限歌迷會、只出 CD）與再發現或收藏狀況（Cold Spring、Vinyl-On-Demand、Infinite Fog、Heritage、Spring Fed、Camisole 重發；收藏圈想找的人多）；日本自主盤三張只有流通事實，沒有評價可寫。另核對：Zoviet France「早期錄音中最有力的一張」出自 Trouser Press；Airbridge「2021 年原版仍買不到、早於新前衛浪潮」出自 DPRP 2021；Albert Hash 入 Blue Ridge Music Hall of Fame、Munde 2024 IBMA、Red Allen 2005 IBMA 有研究稿；Zueff「在日本反應不錯」出自俄文維基，照留。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-17.json`（60 鍵，34 個非 null）。
- bulk put 34 鍵（desc2 30＋desc4 4），寫前逐鍵比對輸出檔一致；`verify-wave-kv` 回讀與 ad-18 合計 65/65 逐字一致。
- `front-check ad-17`：30/30 前台為新稿，CURATED 0。
- manifest 同步 30 處。

## ad-18（流亡 30 張，s9）

- 研究 3 Sonnet（WebSearch a 10／b 17／c 12 次）、寫作 2 Opus。coverage none：Nina-Noho、Strange Garden、Temdendam Suay、Y Cyrff、Soundsmith、Wckr Spgt、Sylvia Tella 的 sound，Armagideon 的 status。裁定同 ad-17：sound none 只寫結構，Armagideon 第一句只講是什麼、不寫壓量或稀有。未另派補查（九張 Transonic／Zero Gravity CD 與英國 dub 小廠盤本來就沒有樂評，Discogs API 研究層已讀）。
- 主線核對：Trio Rakant 客席（研究稿標「舊簡介說法、未逐軌核對」）用 Discogs API 逐軌核對成立——第 1、10 軌 Masahiko Okura 中音薩克斯風、第 3、8 軌 Jiro Sueoka 吉他 loop、第 10 軌 Ryo Suda 貝斯。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Temple of Bon Matin「2004 年 Spirit Of Orr 重發」（Head Heritage 2006 說無重發）；Johnny Osbourne「King Tubby's 混音」（屬《Never Stop Fighting》；本盤是《Nightfall》的英國 Cha Cha 版，Scientist 混音）；Alpha Stone 的 Enraptured／Earworm 沿革；Alan Licht「署名樂評說偏學院」；Avrocar「2013 年解散」；Dayjah 的 Ashanti 獻詞與 Chief Seattle 引文；Lidj 的 St. Marks Studio；Muriel Winston 的 La Verne Wilson 授權；Rashied Ali 的 Bell Sound 刻紋。
- 寫作層兩支共用 scratchpad 檔名互蓋（`d1.json`），兩支都說成品不受影響；主線核對 out-1／out-2 的 key 與卡單 1–15／16–30 逐字一致。**下次派工指定各自的 scratchpad 子目錄。**
- 機器 QA：`qa-batch research ad-18` 1 標記（Decrepit Tapes src 為 http，已改 https）；`out` 3 標記皆誤報（Takemitsu、Coltrane 專名、1970 年代）；fix-spacing 0；字數 247–280。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 11 處（8 張，`review-ad-18.json`；同一張多次改分開記）：

- `nina-noho|ambient classics 1990-1992`：「想找它的人約是持有者的三倍」→「在收藏圈想找的人遠多於手上有的人」。Discogs 收藏統計會變動，倍數不到當下仍成立；改質性寫法（宣稱要精準到當下仍成立）
- `strange garden|for speaker system`：「想找它的人約是持有者的五倍」→「在收藏圈想找的人遠多於手上有的人」。同上，Discogs 統計倍數改質性寫法
- `pacific 231|tropical songs gold`：「想找它的人約是持有者的三倍」→「在收藏圈想找的人遠多於手上有的人」。同上，Discogs 統計倍數改質性寫法
- `electroscope|homemade electroscope`：「沒有再版，至今」→「沒有再版紀錄，至今」。研究稿只說「沒有大廠再版的紀錄可查」，不斷言從未再版
- `alpha stone|elasticated waveband`：「Bassman 被列為 Spacemen 3 的創團成員之一」→「Bassman 曾是 Spacemen 3 的成員」。「創團成員」只有經銷商文案一個來源，且 Spacemen 3 由 Kember 與 Pierce 創立；降為可證的「曾是成員」
- `the land of nod|translucent`：「常被拿來和 Neu!」→「被拿來和 Neu!」。維基未指名樂評，研究稿 notes 要求謹慎，不用「常」
- `johnny osbourne|in nah disco style`：「的版本，曲序與原版不同，在收藏網站上」→「的版本，在收藏網站上」。「曲序與原版不同」研究稿 facts 沒有，刪
- `dayjah & the disciples|storm clouds`：「，黑膠版在唱片行標價 60 英鎊並已售完。」→「，在英國以黑膠發行。」。唱片行標價是當下快照、不到當下仍成立；售完也是快照，只留英國黑膠發行
- `nina-noho|ambient classics 1990-1992`：「，並掛共同製作」→「（刪）」。審稿改句後超字（283），壓字
- `strange garden|for speaker system`：「Zero Gravity 在 2016 年辦二十週年音樂節重新啟動。」→「（刪）」。審稿改句後超字（281）；這句講廠牌、與本盤無關，刪
- `pacific 231|tropical songs gold`：「，1997 年由東京的 Transonic Records 出 CD」→「，1997 年由 Transonic Records 出 CD」。審稿改句後超字（283），壓字

其餘 20 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（小廠 CD、卡帶、限量 500／1000、只有英國原版、只給歌迷會）與值得聽的事實（Julian Cope 收進自選輯、細野晴臣 obi 短評、John Peel session、VP／Pure Pleasure／Nessa 重發、具名星等）；Transonic／Zero Gravity 九張多半只有廠牌與流通事實。另核對：Sylvia Tella《Spell》「賣得最好的 lovers rock 專輯之一」出自 Trojan 簡介；Rashied Ali「Fire Music 範例」出自 Penguin Guide；Roscoe Mitchell「極具對抗性」出自 Clifford Allen（All About Jazz 2008），單一來源用「被視為」；Avrocar 壓 1000 張只有 Penny Black 搜尋摘要，照留（具體、非評價）。

### 上線

- 舊值存 `kv-before-ad-18.json`（60 鍵，31 個非 null）。
- bulk put 31 鍵（desc2 30＋desc4 1），wrangler 印 `Success!`；`verify-wave-kv` 回讀 65/65（兩批合計）逐字一致。
- `front-check ad-18`：30/30 前台為新稿，CURATED 0。
- manifest 同步 30 處。


## ad-19、ad-20（流亡 30＋30，s10）

- 派工補充：新增 `prompt-research-extra-s10.md`／`prompt-writer-extra-s10.md`（沿用 s7、s8 流亡節；本批來源指引：日本噪音、日本爵士／自主民謠、沖繩民謠、台灣、紐約硬蕊 demo、英國自由即興、Wackies 系、黑暗氛圍；Discogs／MusicBrainz API 不耗 WebSearch；收藏統計寫質性；每支用自己的暫存子目錄、最多 25 次 WebSearch）。暫存子目錄分開後，兩批 6 支研究、4 支寫作都沒有撞檔。
- 研究 3 Sonnet×2 批（WebSearch ad-19 a 18／b 15／c 17、ad-20 a 18／b 20／c 16；主線 0；合計 104）、寫作 2 Opus×2 批。
- **coverage none 與主線補查**：ad-19 的モア、真芽正恵研究層三塊全 none（MB 無、日文搜尋無果），主線用 Discogs API 補：モア（release 20594359：Saturn Records ST-1001-24L、Private Press、Saturn 只登錄這一張、五人分工、Masaru Sato 音樂監督兼內頁、十三首曲序）、真芽正恵（release 12624822、label 92014：這個 Harvest 是ミノルフォン旗下日本廠牌；artist 6742643 四張單曲；2015 年小西康陽編《夜のミノルフォン・アワー》收〈コキリコ〉；作曲與編曲 credits）。併回 `research/ad-19-c.json`，標「主線補查，Discogs API」。其餘 none（1976 sound、夾子／山里勇吉 making、South Wind Section sound、Sói Đen sound、Moljebka Pvlse making、ICP 002／Company 2／Wayne Wade sound）未補查，照 ad-17 裁定寫：sound none 只寫編制、曲長、結構，making none 不寫錄音經過。
- **裁定**：
  - モア 內頁作者只寫 Discogs 的羅馬字 Masaru Sato，不寫成「作曲家佐藤勝」（無證據是同一人）；舊簡介「三天錄完」「歌心」「業餘樂手」無來源，不寫。
  - 真芽正恵：作曲者国分正恵是否她本人無證據，寫「国分正恵作曲」。日文人名的「国」保留原字（QA 簡體標記為誤報）。
  - 古謝美佐子《島美らさ》年份三說（1992／1994／2001 首張個人盤之說），不寫年份、不寫「第一張個人專輯」。Plainsunset 2003／2004 兩說寫「2000 年代初」；Braxton 錄音年兩說只寫巴黎。
  - 1976、夾子、山里勇吉三張本盤幾乎沒有資料，照藝人層級事實寫，不降級（tier 屬卡池結構，不在本線範圍）。
  - 「查得到／沒有查到」這類研究過程的話不進簡介，一律改寫成「沒有再版紀錄」「已知的版本」（ad-20 審稿 12 處）。
- **卡池資料疑點（未動 seed，留給店主）**：Аясын Салхи seed 2004，已知實體 CD 是 2008 年 Hi-Fi 版（Metal Music Archives 列 2004）；Plainsunset《The Gift》seed 2003，Sonicbids 與十週年演出對應 2004；古謝美佐子《島美らさ》年份三說。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Incapacitants「整捲只有一軌」；1976「野台開唱復出」；Adonis 廠牌（Black Market Records，非 International）；光束夜「錄音室重錄」（實為 1996 年四地現場）與〈苦痛壊歌〉在 1990 LP 上；Krakdown「唯一發行」與 NR-18183（壓片廠編號）；灰野敬二 P.S.F. 名稱「四年前」（六年）；108 的三首翻唱（屬《Curse of Instinct》）；北村英治〈Slipped Disc〉與 Goodman 六重奏編制；八城一夫錄音日期與兩台琴分面；Аясын Салхи「15 首」「金屬教父」；Howard Riley BBC 錄音；Menses 卡帶與封底宣言；The Crackling「史上最大的樂器」與九首；Tony Oxley「替 Rollins 伴奏」與整張獨奏；Barry Guy 無出處的樂評；Cora「Casals 學生」；Wade「最花時間栽培」；Tyrone Evans 詞曲署名；Alton Ellis「rocksteady 教父」封號。
- 機器 QA：`qa-batch research` ad-19 1 標記（国分正恵）、ad-20 1（西里爾團名誤報）；`out` ad-19 1（国）、ad-20 4（西里爾、1980／2000 年代、Melody Maker 票選有主辦者）皆誤報；fix-spacing 0；半形符號只在原文盤名內；字數 ad-19 217–280、ad-20 225–280。

### 主線審稿 ad-19（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 12 處（9 張，`review-ad-19.json`；同一張多次改分開記）：

- `1976|late summer of 1976 不插電現場實況`：「這張是復出後以不插電形式錄下的現場演出」→「這張是復出後發行的不插電現場專輯」。研究稿只有 2004 年 7 月發行與 2003 年復出，錄音時間不明；「復出後錄下」是推論，改成可證的「復出後發行」
- `夾子電動大樂隊|地下人`：「應蔚民後來因電影《海角七號》」→「應蔚民因電影《海角七號》」。《海角七號》早於《地下人》（2012），「後來」接在本盤敘述後會讀錯時序
- `山里勇吉|八重山書生節`：「盤名裡的〈書生節〉」→「盤名裡的「書生節」」。研究稿未查到本盤曲目，不能用〈〉暗示有這首曲子；改指盤名裡的曲種
- `gai|1981-1985`：「Gai 被視為 1980 年代前期日本最粗暴嘈雜的硬蕊團之一，這批」→「這批」。「最粗暴嘈雜之一」出自 Sorry State（唱片行兼廠牌）的商品介紹，屬廠商文案，不當評價寫（prompt-research-extra-s7）
- `ハナタラシ|ハナタラシ`：「噪音以電鑽、電動工具與重機械」→「他們的噪音以電鑽、電動工具與重機械」。研究稿標明電動工具等是團體層級描述，不是本盤確切使用；改成團體的做法
- `bulldoze|cleaning shit up!!`：「硬蕊放到慢到中速，」→「走慢到中速的硬蕊，」。原句不通順；且風格是樂團層級，寫成樂團走的路數
- `gorilla biscuits|demo 1987`：「這捲共六首，包括〈Better Than You〉〈Do It Yourself〉與以團名為題的一首，〈Better Than You〉在樂團出 EP 前就被收進合輯」→「這捲共六首，其中〈Better Than You〉在樂團出 EP 前就被收進 Revelation 的合輯」。研究稿 notes：曲目表只有舊簡介一個來源，〈Do It Yourself〉與同名曲未獨立驗證，刪；合輯由 Revelation 出版有研究稿
- `dzeltenie pastnieki|man ļoti patīk jaunais vilnis`：「據記載，這套節目」→「這套節目」。「據記載」屬出處句式，出處不寫進簡介；事實出自拉脫維亞語維基
- `south wind section|south wind`：「查不到樂團成員與背景的資料，製作人是 Kazumi Matsuzaki 與 Yoshio Ohtake。」→「唱片上署名的製作人是 Kazumi Matsuzaki 與 Yoshio Ohtake，錄音工程是 Masayoshi Yamazaki。」。「查不到資料」是研究過程的話，不是唱片的事實；改寫研究稿已有的 credits
- `ハナタラシ|ハナタラシ`：「用過電動工具與挖土機，也把玻璃」→「動用過挖土機，也把玻璃」。審稿改句後超字（282），壓字；電動工具後句已寫
- `south wind section|south wind`：「唱片上署名的製作人是 Kazumi Matsuzaki 與 Yoshio Ohtake，錄音工程是 Masayoshi Yamazaki。」→「製作人署名 Kazumi Matsuzaki 與 Yoshio Ohtake。」。審稿改句後超字（294），壓字
- `south wind section|south wind`：「曲長多在 4 到 6 分鐘，最長」→「最長」。審稿改句後超字，壓字

其餘 21 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（自製卡帶與 demo、私壓限量 100／400／500 張、CD-R、只送朋友的卡帶、地方小廠、從未正式出版的 magnitizdat 盤帶）與值得聽的事實（Old Europa Cafe、Hospital Productions、Urashima、P.S.F.、Black Editions、NoBusiness、State of Mind 重發；被視為 beatdown、youth crew、蘇聯 new wave 先驅）；モア、真芽正恵、South Wind Section、八城一夫只有流通與 credits 事實，沒有評價可寫。另核對：Maher Shalal Hash Baz「日本地下最神祕」出自 Signal to Noise（單一來源用「被視為」）；Bulldoze「beatdown 開創者之一」與類型得名出自英文維基；山里勇吉「八重山代表性的民謠歌手之一」出自日文維基；108「被低估」出自 Scene Point Blank。

### 主線審稿 ad-20（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 15 處（12 張，`review-ad-20.json`；同一張多次改分開記）：

- `аясын салхи|coffin town under the moon`：「查得到的實體版本是」→「已知的實體版本是」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `sói đen|chiến tranh và hòa bình`：「查得到的只有這一個越南本地版本」→「只有這一個越南本地版本」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `sói đen|chiến tranh và hòa bình`：「樂團此後查得到的發行」→「樂團此後已知的發行」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `sói đen|chiến tranh và hòa bình`：「壓軸曲的英文副題」→「還有一首的英文副題」。研究稿兩個來源曲數不一（8／9 軌），無法確定 The Castle of Wolf 是最後一首
- `han bennink|tempo comodo`：「查不到國際發行」→「沒有國際發行紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `company|company 2`：「這張只查到 1979 年日本一次黑膠重發」→「這張只有 1979 年日本一次黑膠重發」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `tony oxley|tony oxley`：「沒有查到 CD 紀錄」→「沒有出 CD 的紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `barry guy|statements v‐xi for double bass & violone`：「沒有查到 CD 紀錄」→「沒有出 CD 的紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `alterations|alterations`：「沒有查到再版紀錄」→「沒有再版紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `paul lytton|the inclined stick`：「沒有查到再版紀錄」→「沒有再版紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `wayne wade|black is our colour`：「整張專輯沒有查到再版紀錄」→「整張專輯沒有再版紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `tyrone evans|sings bullwackie style`：「原版早已絕版、被收藏者追逐，但這張沒有查到再版紀錄」→「廠牌的原版唱片多已絕版、被收藏者追逐，這張也沒有再版紀錄」。維基講的是 Wackie's 整體原版，原句主詞像是本盤；並去掉「查到」
- `john holt|introspective`：「沒有查到樂評與再版紀錄」→「沒有再版紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）；「沒有樂評」不是唱片的事實
- `alton ellis|a new day`：「沒有查到再版紀錄」→「沒有再版紀錄」。「查到」是研究過程的說法，不是唱片的事實；只查過單一資料庫，寫「沒有再版紀錄」（ad-17 裁定）
- `tyrone evans|sings bullwackie style`：「廠牌的原版唱片多已絕版」→「廠裡的原版多已絕版」。審稿改句後超字（281），壓字

其餘 18 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（自營廠 ICP／Incus／Po Torch／Bead／Ictus、郵購、限量 112／300／500／1000、私壓兩三百張、蒙古與越南本地自行發行、展覽委託只出黑膠）與值得聽的事實（Emanem、Die Stadt、EEs'T、Klanggalerie、Ictus、RogueArt 重發；具名評價寫成「被視為」）。另核對：Hall of Mirrors「小經典」出自 Philippe Blache；The Crackling「比 Duncan 多數作品溫和而多變」出自 AllMusic；Bianchi「影響一整代義大利地下噪音」出自義大利維基引 Antonello Cresti；Centazzo「最好的錄音之一」出自 AllMusic Steve Loewy；Cargo Cult Revival「第一部重要作品」出自 Scaruffi；Shipp「技巧出色、細膩、節奏多變」出自 AllMusic Loewy；均單一來源，用「被視為」不用「常」。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-19.json`（60 鍵，43 個非 null）、`kv-before-ad-20.json`（60 鍵，30 個非 null）。
- bulk put ad-19 43 鍵（desc2 30＋desc4 13）、ad-20 30 鍵（desc2 30），兩次都親眼見 `Success!`；`verify-wave-kv 20261104 ad-19 ad-20` 73/73 逐字一致。
- `front-check`：ad-19 30/30、ad-20 30/30 前台為新稿，CURATED 0。
- manifest 同步 ad-19 30 處、ad-20 30 處（26 份 onboarding manifest）。

## ad-21（流亡 30 張，s11）

- 派工補充：新增 `prompt-research-extra-s11.md`／`prompt-writer-extra-s11.md`（沿用 s7／s8 流亡節；歐洲自由即興／electroacoustic 盤一直在版的不寫難找，少人聽寫成小廠與即興形式；reggae showcase 盤與東歐、非洲、亞洲地方盤的來源清單；Discogs 改用 API 直接讀 release；每支研究最多 25 次 WebSearch；暫存檔各用自己的 scratchpad 子目錄）。
- 研究 3 Sonnet（WebSearch a 14／b 14／c 約 18 次）、寫作 2 Opus；主線補查用 Discogs／MusicBrainz API（不耗 WebSearch）。
- **主線補查推翻研究層**：研究層把 Jezzreel「三位鍵盤、長笛、〈I Love You Jah〉7:03」、Audley Rollens「在 Wackie's 錄音室錄成、一人製作詞曲」、Martin Tétreault「十首、Audioview」判為查無出處；Discogs release 4506953／3827686 與 MusicBrainz 證實都成立，併回 `research/ad-21-a.json` 標「主線補查」。仍無證據的（Jezzreel「二重唱」、Rollens「Rockstones 散團補錄」、Tétreault「3 台唱盤、25 張 LP」）不寫。Tétreault 年份照 MusicBrainz 1998（加拿大 Audioview；Qobuz「比利時 Audiophile」判為誤植）。
- **裁定**：Rollens 本盤是自家廠牌 Philadelphia Reggae Sounds 發行、在 Wackie's 錄音室錄，不寫成 Wackie's 出品；Ric Colbeck 的 Thurston Moore／Melody Maker／Gramophone 評價只有部落格轉引，不寫；Mwanamke Mwafrika「首支全女性 reggae 樂團」只有 Discogs 使用者簡介、封套另有男性外援，不寫；Tempranillo 廠牌兩說不寫廠名；Double_Wash 錄音年兩說不寫年份。
- **卡池資料疑點（未動 seed，留給店主）**：Martin Tétreault seed 1997，原版 1998；Gustafsson／Guy《Frogging》seed 1997 是錄音年，Maya 1998 年發行；Audley Rollens 官方簡介稱 1980 年出《Prevail》、資料庫作 1982（簡介寫 1980 年代初）；Zíngaro《Solo》1991／1992 兩說（簡介寫 1990 年代初）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Rothenberg「只有一支薩克斯風」（A 面疊錄多件木管）；Maneri「三重奏貝斯手 Ed Schuller」（四重奏貝斯手是 John Lockwood）；Lonberg-Holm 固定一把吉他（十二首各配不同吉他手）；Main「各約二十分鐘」（23:59／20:45）；Parker／Shipp「Alto Suite」「限量版」；Frogging「同年出版」；Incision「信任」（liner notes 是 commitment）；Kerbaj「內戰長大」「直升機與鳥鳴」；A_dontigny「主持 No Type」「諷刺小品」；Anthony Johnson 生年與「Gunshot 外號」。
- 機器 QA：`qa-batch research ad-21` 1 標記（Dusted src 為 http，已改 https）；`out` 0 標記；fix-spacing 0；字數 226–280。半形冒號只在廠牌名 Explain: 內。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 12 處（10 張，`review-ad-21.json`；同一張多次改分開記）：

- `jezzreel|rockers showcase volume 2`：「Wackie's 在牙買加從未打進主流，卻影響了 Rhythm & Sound 與 Massive Attack。」→「Wackie's 的錄音後來影響了 Rhythm & Sound 與 Massive Attack 等海外音樂人。」。「從未……卻……」是反轉句（審稿第 4 問）；保留 Roots Archives 廠牌介紹的影響事實
- `jezzreel|rockers showcase volume 2`：「最長的〈I Love You Jah〉有 7 分 03 秒，音色偏低傳真。」→「最長的〈I Love You Jah〉有 7 分 03 秒；廠牌的錄音向來偏低傳真。」。低傳真是維基對 Wackie's 廠牌的描述（團體層級），不寫成本盤音色
- `audley rollens|showcase prevail`：「1980 年代初在費城以自家廠牌」→「1980 年代初以自家廠牌」。研究稿 facts 沒有發行地在費城的記載（只有廠牌名），刪
- `mazen kerbaj|brt vrt zrt krt`：「這個廠牌被視為該地區第一個實驗音樂廠牌」→「這個廠牌自稱是該地區第一個實驗音樂廠牌」。來源是 Kerbaj 自己網站的廠牌說明，屬自述，不是外部評價；改寫成自稱
- `mats gustafsson & barry guy|frogging`：「由 Guy 夫婦經營的廠牌 Maya Recordings」→「由 Guy 自己的廠牌 Maya Recordings」。研究稿 facts 只寫 Guy 自己的廠牌，「夫婦經營」無出處
- `carlos zíngaro|solo`：「他也是畫家，1984 到 1990 年主持里斯本藝廊 Cómicos。」→「（刪）」。與本盤地位或聲音無關的人物冷知識，刪
- `philipp wachsmann, roger turner|alizarin`：「Turner 把任何聲音都當樂器」→「Turner 的做法是把任何聲音都當樂器」。出處是談 1996 年《Birthdays》的專文，屬 Turner 個人手法，改寫成他的做法、不宣稱本盤編制
- `mwanamke mwafrika|african woman abroad`：「八首歌由女聲領唱，路數偏」→「八首歌路數偏」。「女聲領唱」是寫作層由團員名單推論，facts 無逐軌主唱資料
- `anthony johnson|i'm ready`：「全盤只有六首，每首約 6 到 8 分鐘，包括」→「全盤只有六首，包括」。曲長只來自 YouTube 上傳的時間，不是官方曲長（研究稿 facts 自註），刪
- `christmann schönenberg duo|we play`：「，被視為一張有影響力的錄音。」→「。」。研究稿 Coda 條目只說 Christmann 的弱音技巧可為典範，沒有「有影響力」的具名出處
- `christmann schönenberg duo|we play`：「用 plunger 與各式弱音器不斷變換音色」→「用 plunger 與各式弱音器不斷變換音色，這套弱音技巧被視為典範」。Coda 條目的具名評價（研究稿 sound 第 3 條），移到聲音段並照實寫
- `jezzreel|rockers showcase volume 2`：「與 Massive Attack 等海外音樂人。」→「與 Massive Attack。」。審稿改句後超字（281），壓字

研究稿同步：審稿改動都是刪句或改寫成團體／個人層級，未動事實，研究稿不必改。其餘 20 張逐張審過，未改字。第五問：30 張前兩句都講出流通規模（小廠 CD、CDr、網路廠牌、限量 300／500、只有原版、擱了四到五年才出、自辦廠牌 LP 到 2006 才收進再版）與值得聽的事實（Ars Electronica Golden Nica、The Wire 2003 年度即興名單、Jazziz 年度十大、二重奏起點、Wackie's 錄音室與 Roots Radics 伴奏、2020 Common Ground 重壓）；歐洲即興盤照裁定不寫難找。另核對：Tempranillo「每個動作都有來由」出自 Thom Jurek（AllMusic）；Abbey Road Duos「那一年最好的全即興唱片之一」出自 Free Jazz Blog 2007；Frogging「少見夠有說服力」出自 Ken Waxman；Light Trigger「重要的即興音樂文件」出自 Michael A. Parker（All About Jazz，搜尋摘要）；Ecritures「極為緊繃」出自 Free Jazz Blog 2016；eRikm「那一代最有影響力的唱盤手之一」出自法文維基。都是單一來源，寫「被視為」、不用「常」。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-21.json`（60 鍵，30 個非 null）。
- bulk put 30 鍵（desc2 30；本批無 CJK 卡、無原有 desc4），wrangler 印 `Success!`；`verify-wave-kv 20261104 ad-21` 30/30 逐字一致。
- `front-check ad-21`：30/30 前台為新稿，CURATED 0。
- manifest 同步 30 處（10 份 onboarding manifest）。

## ad-22（流亡 30 張，s11）

- 派工照 `prompt-research-extra-s11.md`／`prompt-writer-extra-s11.md`，派工時另告知 Discogs API／MusicBrainz 不耗 WebSearch、資料薄的卡一定要用。研究 3 Sonnet（WebSearch a 15／b 12／c 13 次）、寫作 2 Opus。本工作階段 WebSearch 合計約 86 次（研究層），主線 0 次（主線只用 Discogs／MusicBrainz API 與 WebFetch 等價的 curl）。
- coverage none：Fanny's Group status／making（只剩 Discogs 曲目、風格標籤與 Lokananta 廠史）、Mircea Tiberian sound、Cool Knights sound。裁定同 ad-17：sound none 只寫編制、分工、結構，風格標籤寫成「路數偏某某」；不寫樂團背景、不寫稀有以外沒有證據的事。未另派補查。
- **裁定**（寫進寫作派工特注）：
  - 商家文案或單一小站的評價（Pierre Favre、Delton Screechie、Zaratustra）不寫成評價；Wambach 的 Classics Today／Gramophone 只見搜尋摘要、評者不明，不寫。
  - String Connection、Cuarteto Cedrón、Lutajuća Srca 研究稿判定不罕見（波蘭當紅團、法國長年重壓、國營大廠），不寫難找，寫它做到什麼（Jazz Forum 連三年第一、詩作譜成探戈、B92 百大）。
  - 강태환 的二重奏搭檔 Midori Takada 只有一篇旁證，不寫名字；Blackbuster＝The Ramrods 只有一篇且談的是系列首張，不寫。
  - 菊地雅章《Hairpin Circus》照原聲帶節，前兩句點出電影《ヘアピン・サーカス》。
  - Alvin Curran「被視為影響了 Eno 與 Bryars」主線打開 MusicWeb 原頁核對：Dominy Clements 原文 “that’s where Brian Eno, Gavin Bryars and many others had some of their inspiration”，成立。
- **卡池資料疑點（未動 seed，留給店主）**：Conrad Bauer《Flüchtiges Glück》seed 1986（Discogs），英文維基 1984（簡介寫 1980 年代中期）；Urfalı Babi《Disko Kebap》seed 1978（Discogs），土耳其維基 1975（簡介寫 1970 年代）；Sly Boots RYM 記 1970（seed 1969，多數來源 1969）。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Tiberian「布加勒斯特大學」（國立音樂大學）；Screechie「四首 Scientist、兩首 Sylvan Morris」；Tavitian「空白卡帶、自費」；Grencsó「自由即興」；Curran VCS3 鋪底（只在〈On My Satin Harp〉）；Bauer「12 月 17 日、45 秒殘響、無疊錄」；Cedrón「小提琴」（中提琴）；Lutajuća Srca 只兩支伴奏樂團（三支）；Lundsten「瑞典第一張」（1966 年已有《Dokumentation 1》）；Sly Boots「五人樂團」（兩人＋署名樂手）；Maxfield「接下 Cage 的課」；Tokyo Kid Brothers 紐約時報好評。
- 機器 QA：`qa-batch research ad-22` 3 標記皆誤報（韓文、塞爾維亞西里爾字母原文專名；研究稿內千分位，不進簡介）；`out` 4 標記皆年代誤報（1980 年代、1970 年代、1972 至 1973 年）；fix-spacing 0；字數 237–280。半形「!」只在廠名 BE! Jazz 內。

### 主線審稿（2026-11-04，30 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 8 處（6 張，`review-ad-22.json`；同一張多次改分開記）：

- `string connection|workoholic`：「，唱片在波蘭以外卻流通很少」→「；唱片在波蘭以外流通很少」。「是當紅樂團……卻……」是反轉句式（審稿第 4 問）；保留 Discogs 流通事實
- `andrzej przybielski|w sferze dotyku`：「在波蘭以外卻幾乎沒有名氣」→「在波蘭以外幾乎沒有名氣」。去掉反轉語氣；事實出自 Stephan Moore（Jazzwrap 2011 悼文）
- `conrad bauer|flüchtiges glück`：「這張獨奏就錄在這個殘響時間極長的空間」→「這張獨奏就錄在這個空間」。「殘響時間極長」研究稿沒有出處（舊稿「45 秒殘響」已判未證實）
- `conrad bauer|flüchtiges glück`：「，空間的殘響也成了演奏的一部分。」→「；他也長期利用教堂這類空間的殘響來演奏。」。Intakt 廠頁講的是 Bauer 長期的做法，不是本盤的逐曲描述；改寫成他的做法
- `jesper siliya|giant steps`：「八首曲子結構簡單，重度 fuzz 吉他」→「八首曲子以重度 fuzz 吉他」。「結構簡單」是 Shadoks 再版文案的評語（simple but beautiful），不當聲音事實寫；保留可聽到的 fuzz 吉他、節奏與歌詞性質
- `blackbuster|blackbuster 3`：「菲律賓原版隨盤附兩張舞步教學海報。」→「各國版本在收藏圈都是手上有的人少、想找的人多。」。舞步海報是封套冷知識，與地位或聲音無關；改寫研究稿的流通事實（Discogs 各版持有少、想要多，質性寫法），補上「為什麼少有人聽」
- `tokyo kid brothers|黄金バット golden bat`：「原版 LP 在二手店要價兩百多美元。」→「原版 LP 很難聽到，網上流傳的錄音多半是 1977 年另一次現場演出。」。二手店標價是當下快照、只有一家店，不到當下仍成立（同 ad-18 裁定）；改寫研究稿 status 第 4、5 條（Head Heritage Unsung 討論串、1977 Victor 現場盤）
- `tokyo kid brothers|黄金バット golden bat`：「演出，之後移到 Sheridan Square Playhouse。」→「演出。」。審稿改句後超字（294），壓字

研究稿同步：改動都是刪句、去反轉語氣或改寫成個人層級，未動事實，研究稿不必改。其餘 24 張逐張審過，未改字。第五問：30 張前兩句都講出流通狀況（地方私人廠、國營廠第一號、自費私壓無廠牌、母帶帶出國由倫敦 Leo 發行、限量 800＋200、只有原版、盜版重壓以外無再版）與值得聽的事實（Corbett vs. Dempsey、FMP、BE! Jazz、Vinyl Me, Please、Light in the Attic、Shadoks、Nublu、Superior Viaduct 再版；韓國第一個自由爵士團體；Jazz Forum 連三年第一；B92 百大）。另核對：Curran「影響 Eno 與 Bryars」見上；Maxfield「電子音樂的先驅之一」「〈It's Gonna Rain〉的先聲」出自 Warren Burt（Chroma）；Lundsten「瑞典最早的同類工作室之一」出自英文維基；Grencsó「匈牙利前衛爵士的重要人物」出自 BMC；Przybielski「在波蘭以外幾乎沒有名氣」出自 Stephan Moore（Jazzwrap 2011）；菊地雅章「日本最早做電子爵士搖滾的人之一」出自日文維基；강태환 三重奏「韓國第一個自由爵士團體」出自韓文維基。都是單一來源，寫「被視為」、不用「常」。Eloy「四面各是一段持續長音」只有 Soundohm 商品頁描述 drone，屬聲音描述而非評價，照留。

### 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-22.json`（60 鍵，33 個非 null）。
- bulk put 33 鍵（desc2 30＋CJK 卡 desc4 3：菊地雅章、강태환、Tokyo Kid Brothers），wrangler 印 `Success!`；`verify-wave-kv 20261104 ad-21 ad-22` 63/63 逐字一致。
- `front-check ad-22`：30/30 前台為新稿，CURATED 0。
- manifest 同步 30 處（11 份 onboarding manifest）。

## ad-23（流亡 19 張，s12）、ad-24（異端尾批 24 張，s12）

- 派工補充：新增 `prompt-research-extra-s12.md`／`prompt-writer-extra-s12.md`（流亡節沿用 s7／s8／s11；異端節沿用 heresy-addendum 與 s7；ad-24 研究層先讀 ax1／ax2 上架時的研究稿當起點、出處逐條確認；舊稿鉤子開頭不沿用）。
- **尾批 ad-24 的範圍（主線重算）**：seed 頂點卡不在 `worklist.json` 的 57 張＝Beyond《再見理想》（已照新規，跳過）＋《台客的復仇》（店主定稿，跳過）＋ax5 13 張＋ax6 18 張（已照 apex-desc-base 寫，跳過）＋ax1 13 張＋ax2 11 張。第 0 步由主線檢查這 24 張的現行簡介：全是舊鉤子公式（冷知識開頭、前兩句沒講極端在哪裡、盤號目錄號發行日佔大半），**24 張全判 rewrite**；已併進 `worklist.json`（標 `tail: "ad-24"`）、`triage.json`、`batches.json`。
- **ad-23 主線補查**：Free Enterprize《The Eye of the Beholder》只有 Discogs（release 10127911、master 1702214 兩筆同為 1980 美國不掛廠牌 LP，風格標籤 Acid Rock／Folk，兩位表演者 John Peebles、Tony Frank，14 首、無曲長），MusicBrainz 無條目。裁定：薄寫到 200 字附近，只寫是什麼、私壓無廠牌、沒有再版紀錄、編制與曲目結構，風格只寫「路數偏 acid rock 與民謠」，不寫「為什麼值得聽」以外沒有證據的評價。

### ad-23 研究與寫作

- 研究 3 Sonnet（WebSearch a 14／b 13／c 11 次）、寫作 2 Opus。coverage none 只有 Free Enterprize sound（裁定見上）。多數卡沒有具名樂評，地位靠 Acid Archives（經 Bad Cat／Branco 轉引）、收藏指南、再版廠頁與 Discogs 備註；賣家措辭（holy grail、tax scam label）不寫。
- 研究層推翻舊稿的主要錯誤（新稿未沿用）：Ghostdance「只有兩人」「folk rock 摻 acid」（7 人加伴唱，搖滾混雷鬼、新浪潮、鄉村）；David Lewis「迷幻 folk rock」（power pop、鄉村搖滾加木吉他 demo）；Jeremy Dormouse「原版約 500 張」（500 是 2001 Void 再版）；Circulation「最後演出 1969-07-08」「Nicholas Wates」；Smack「一夜成軍」「歡迎舞會」「廣告配音錄音室」「四軌」；Ian A. Anderson「Pick Withers 後來進 Dire Straits」「第四張 LP」；Joe Bonner「五重奏」「整張調式爵士」；Probe「六首原創加一首 Steve Miller」（8 首）；Mtume「父親是 Jimmy Heath」未查證；Thornton「四人 bata、三人迦納」（寫七位打擊樂手）。
- **卡池資料疑點（未動 seed）**：Probe《Direction》seed 1971 與 Discogs 主頁／MusicBrainz 同，2009 Still Looking 再版與賣場標 1969（簡介照 1971）。
- 機器 QA：`qa-batch research ad-23`、`out ad-23` 全部通過；fix-spacing 0；字數 225–280。

### 主線審稿 ad-23（2026-11-04，19 張逐張讀、逐句對研究稿；加問「讀完知不知道它憑什麼是這一級」）

改 5 處（3 張，`review-ad-23.json`）：

- `ghostdance|ghostdance`：「由 Root River 出版。」→「由 Root River 出版，樂團的其他資料幾乎查不到。」。前兩句缺「為什麼少有人聽」；研究稿 status 第 1 條（Bad Cat：網路上查不到這團多少資料）
- `ghostdance|ghostdance`：「各寫一半的 12 首、輪流主唱。」→「各寫一半的 12 首。」；「，另有節奏組、鍵盤與伴唱。」→「。」。審稿補句後壓字（292→275）
- `smack|smack`：「又先後重新發行，才在收藏圈之外被聽到。」→「又先後重新發行。」。「才在收藏圈之外被聽到」是推論，無出處
- `princess flower and the moon rays|dreaming the magic of your maya`：「加收 1970 年在紐約錄下的未發行曲，才有較多人聽到。」→「加收 1970 年在紐約錄下的未發行曲。」。同上，推論

研究稿同步：改動都是補流通事實或刪推論，未動事實，研究稿不必改。其餘 16 張逐張審過，未改字。第五問：19 張前兩句都講出流通狀況（私壓無廠牌、約 51／50／100／150／800 張、小廠 Muse／Moers／JCOA 沒有再版紀錄、自營廠現場賣、沒寄宣傳盤）與值得聽的事實（Wah Wah、Shadoks、Tone Arm、Void、Branco、Big Pink、Vivid Sound、Wohn、Still Looking、Bonfire、Cherry Tree 再版；Pharoah Sanders 合作；接替 Coltrane；Strata-East 第一張領隊作；第三世界音樂與爵士的結合）。另核對：Rin Eric「loner folk 最受追捧的曲子之一」出自 Patrick Lundborg《Acid Archives》（經 Branco 文案轉引）；Fairy Tale「歐洲收藏圈最搶手之一」出自 Vinyl Antiquity（Blake Mitchner 2013）；Mtume「黑人民族主義音樂的重要記錄」出自 blogthehum（Bradford Bailey 2016）；Thornton「第三世界音樂與美式爵士結合得很完整」出自 Rolling Stone Jazz Record Guide（Fred Goodman）；Jeremy Dormouse「極其稀有」出自收藏指南《Dreams, Fantasies and Nightmares》；Drnwyn「稀有」出自 Bad Cat。都是單一來源，寫「被視為」、不用「常」。

### ad-23 上線

- `kv-token-check` 通過；舊值存 `kv-before-ad-23.json`（38 鍵，19 個非 null）。
- bulk put 19 鍵（desc2 19；無 CJK 卡、無原有 desc4），wrangler 印 `Success!`；`verify-wave-kv 20261104 ad-23` 19/19 逐字一致。
- `front-check ad-23`：19/19 前台為新稿，CURATED 0。
- manifest 同步 19 處（`onboarding-manifest-add-20261104-ax3-20261104.json`）。
