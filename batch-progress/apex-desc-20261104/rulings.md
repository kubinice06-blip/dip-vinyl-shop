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
