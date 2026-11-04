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
