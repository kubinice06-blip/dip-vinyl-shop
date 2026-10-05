# add-20261004-shop 裁定（店內販售區待上架 3 張）

> 來源：Notion「唱片庫存售價表（販售中）」盤點，卡池缺的 3 張（見 `data/shop/inventory.json` 的 `pending_card`）。
> 本檔由主線建立。各層只 append 自己的條號區間。

> **預留（2026-10-04）：策展 8586–8595、研究 8596–8615、鉤子 8616–8625、寫作 8626–8640。**
---

## 主線策展（不佔條號）
- Elmo Hope《Hope Meets Foster》：MB RG 5ad91c4b-635d-4bf7-8d22-69102e6e30c1（Album、1955、無 secondary-types；掛名 Elmo Hope Quartet and Elmo Hope Quintet feat. Frank Foster）。卡池同藝人另有 4 張，非撞卡。
- Elmo Hope《High Hope!》：MB 藝人目錄查無此盤 → 待策展層查證身分（Discogs／維基）。
- The New George Otsuka Trio《You Are My Sunshine》：MB 查無；店內品年份 1974 → 待策展層查證。掛名歸屬（新團名 vs 池中「ジョージ大塚トリオ」）由策展層依池中先例裁定。

## 策展層（8586–8595）

- **8586** 《Hope Meets Foster》掛 `Elmo Hope`：MB credit 是 Quartet／Quintet 群組＋Foster feat.，依 c-135 第 363 條與《Elmo Hope Quintet, Volume 2》先例收攏為個人名，編制與 Foster 進 queryAlias；Foster 為 featuring，不掛合名。
- **8587** 《Hope Meets Foster》年份取 **1956**，推翻 MB／英文維基的 1955（那是錄音年 1955-10-04）：Discogs 原版 6386994、master 582202、jazzdisco Prestige 7000 表皆 1956，同表 7018／7020 錄於 1955-11／12 也列 1956。rgMbid 不變。可逆（卡單值）。
- **8588** 《Hope Meets Foster》RG 內第二筆 release「Wail Frank Wail」（掛 Frank Foster、同編號 PRLP 7021）是同一張碟的紅色封面替代版（Discogs 13858978），不另建卡。
- **8589** 《High Hope!》**MB 有 RG**，推翻主線「藝人目錄查不到」：RG 93100622（Album、1961、無 secondary-types）credit 掛群組實體 Elmo Hope Trio（d4570477），個人實體 bb70f5eb 的 browse 看不到；`releasegroup:"High Hope"` 直接查得到。身分走 pinned，不走 §1 人工。
- **8590** 《High Hope!》掛 `Elmo Hope`（不造 `Elmo Hope Trio` 字串），與池中《Elmo Hope Trio》1960（RG e860d63a、Hifijazz）同掛名、不同盤名，非撞卡。年份取 1961（MB／Discogs／維基盤單一致；維基單頁資訊框 1962 為孤例），標待本機補證，可逆。
- **8591** 《You Are My Sunshine》MB 查無（兩個大塚實體 browse、盤名、catno TBM-35、新團名四向皆空，皆 HTTP 200），走 §1 人工身分：Discogs master 548819／release 4358997（Three Blind Mice TBM-35、1974-10-31 Aoi Studio 錄音）＋日文維基 TBM 目錄表互證，`coverSourceHint: discogs`。
- **8592** 《You Are My Sunshine》掛名 `ジョージ大塚トリオ`（key `desc4:`）：封面為拉丁字 The New George Otsuka Trio，但池中大塚各編制卡一律「ジョージ大塚＋片假名編制」（c-131 第 354、358 條），日文維基作品表與 TBM 目錄表也都稱「ジョージ大塚（ト）Trio」；The New George Otsuka Trio 進 queryAlias。與《Page 1》《Page 2》同字串，但 1974 年樂手不同（市川秀男＋宮本直介 vs 1967 年的市川秀男＋寺川正興），簡介須分清。
- **8593** 《You Are My Sunshine》年份 1974（Discogs 原版／master、日文維基、店主表一致），1978 TBM-2535、1996、2001 為再發；Apple jp／us 兩搜尋都無本盤，試聽預估 unavailable，待本機。
- **8594** 兩張 Elmo Hope 的店主表未登錄壓片年份（Otsuka 登錄 1974），卡只釘作品身分，不釘店內實體壓片。

## 研究層（8596–8615）

- **8596** 《Hope Meets Foster》年份 1956 的研究層覆核：與策展 8587 同結論，jazzdisco 與 Discogs 兩獨立來源；facts 不寫發行年以外的月份。Yanow 評語為英文維基轉述，AllMusic 原頁 403，notes 已標。
- **8597** 《Hope Meets Foster》Freeman Lee＝MB 的 Charles Freeman Lee，facts 用 Freeman Lee；編制分配（四重奏三首、五重奏三首）以 Discogs 6386994 曲序為準，jazzdisco 曲序不同不採。
- **8598** 《Hope Meets Foster》紅色封面版只見於 Discogs 備註單一來源，寫作層寫「少見」即可，不寫年份或改名原因。
- **8599** 《High Hope!》年份 1961 未取得 1962 的第二來源，維持 1961，標 uncertain；曲名 A2〈Hot Sauce〉（Discogs 原版）vs〈Happy Hour〉（再版、維基）不一致，寫作層避開 A2，只用〈Chips〉〈Crazy〉〈Mo Is On〉〈Maybe So〉。
- **8600** 《High Hope!》Robert Palmer「標題削減尊嚴」評論為英文維基二手轉述、Beacon 1961 年廠牌沿革無來源，皆不進 facts（notes 標明）；Joe Davis 出版權與 Licette 授權字樣取自 Discogs 3675000 備註。
- **8601** 《You Are My Sunshine》研究層確認掛名與策展 8592 一致（日文維基與 TBM 目錄皆稱「ジョージ大塚 Trio」）；譯名 Ben Nishizawa＝西沢勉、Yoshihiko Kannari＝神成芳彦取日文維基漢字。
- **8602** 《You Are My Sunshine》市川秀男 1966-12 加入大塚第一個三重奏（寺川正興同組）來自日文維基市川秀男條目（轉引 arban-mag 訪談）；成員、錄音地與日期只見 Discogs（三筆 release 備註一致）。
- **8603** 《You Are My Sunshine》TBM 2014 破產與 Think! Records 再發屬與本盤無直接綁定的後續事件，不進 facts，僅在 notes 備查。
- **8604** hookCandidates 各兩條、避開同批同構：Hope 兩張一為「同編號紅封面改名」「一次錄音兩種編制」，一為「兩組節奏組」「Bitter Hope 專訪與搬回紐約」；Otsuka 取「新三重奏找回市川秀男」與「TBM 錄音品質＋四首長曲」。
- **8605** QA：`qa-batch research add-20261004-shop` 0 error。

## 寫作層（8626–8640）

- **8626** 兩張 Hope 卡的引入法分開配：《Hope Meets Foster》用「日期領句＋Elmo Hope 的鋼琴／Frank Foster 的次中音」（樂器所有格），《High Hope!》用身分「領銜的 Elmo Hope」＋A 面／翻面兩段式；兩張第二句句型不同。
- **8627** 《Hope Meets Foster》第二句把 hook 的「小號」具名為 Freeman Lee，不重述哪三首；照「正文只寫上列各項」不寫 John Ore／Art Taylor 與 Basie 背景；紅色封面版只寫「少見」，不寫年份或原因（研究 8598）。
- **8628** 《High Hope!》曲名只舉〈Chips〉〈Crazy〉，避開 A2 的兩種寫法（研究 8599）；《Down Beat》專訪是 note 指定的主故事，寫的是他抱怨的內容，不是評價，不寫〈Bitter Hope〉標題和「唯一重要專訪」。
- **8629** 《You Are My Sunshine》把 1966 年第一個三重奏和 1974 年本盤分開寫：只沿用鋼琴（市川秀男），貝斯換成宮本直介；照「只寫上列各項」，不點名寺川正興。The New George Otsuka Trio 只當全名出現，卡片藝人欄的字串不改。
- **8630** QA：`qa-batch out` 3 張 233–238、`qa-check-research` 標記 0、`fix-spacing` 待補 0。

## 主線收尾（不佔條號）
- 三軸一律 3/4/2（rare），比照池中同藝人與同編制卡；listeners 留本機。頂點 0。
- 試聽：Hope 兩張 Apple jp 642094766／642032306 逐軌（曲名＋秒數）對上原盤，判 ready；大塚 Apple 無，unavailable。
- 大塚封面改用 Discogs 4358997 第二張圖（primary 帶日本側標）。
- 簡介 3 張主線逐張審過，未改字。
