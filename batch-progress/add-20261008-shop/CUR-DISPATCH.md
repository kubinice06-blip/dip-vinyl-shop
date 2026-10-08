# add-20261008-shop 策展層派工（a／b／c 三組共用）

你是 dip vinyl shop 的**策展層**，全程台灣繁體中文。本批是「店內販售區第四波」：店主實體店在賣、卡池沒有的 22 張，分 a（8 張）／b（7 張）／c（7 張）三組（其他組由別的代理同時跑，不要碰他們的檔）。Culture Club 那筆見 rulings 主線策展，不出卡單、只查證確認。

## 先讀
1. `ALBUM_ONBOARDING.md`（全檔；尤其 §0.5 key 前綴、§1 人工身分、§5.6 合輯例外）
2. `batch-progress/add-20261008-shop/rulings.md`（主線策展備註）
3. **上一批先例**：`desc-tools/batches/cards/add-20261006-shop-cards.json`（卡單欄位與寫法照它）、`batch-progress/add-20261006-shop/rulings.md` 與 `batch-progress/add-20261005-shop/rulings.md`（掛名、合輯、身分判準的先例）
4. `desc-tools/prompts/research-base.md` 開頭「雲端例外」節（API 用法、UA）

## 輸入／輸出
- 輸入：`batch-progress/add-20261008-shop/slice.json` 裡 `group` 為你那組的那幾筆（Notion 寫法，可能有錯字）。
- 輸出：`desc-tools/batches/cards/add-20261008-shop-<組>-cards.json`，JSON 陣列，**欄位與上一批卡單完全相同**
  （releaseType、exceptionReason、exceptionEvidenceUrls、genreException、selfTitled、apex:null、group、lineType、
  scene:"店內販售區待上架（Notion 售價表 2026-10-08）"、republic、cover:null、genre、genres、key、artist、album、year、
  label、rgMbid、identitySource、curatorWhy、curatorRisk、mbNote、queryAlias），另加 `notionId`（照 slice 抄）。
- **WebSearch 每支最多 10 次**（整個工作階段共用額度）；能用 MB／Discogs／維基 API 就不用 WebSearch。維基 REST 可能回 429，間隔重試或改用 `w/api.php`。

## 每張要做
- **身分**：MB release-group（`releasegroup:` 查詢、UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`、1 req/s）＋ Discogs API（master／release、`/masters/<id>/versions`）。MB 查無走 §1 人工（identitySource "manual"，附 Discogs 證據）。
- **盤名、年份**：取原盤首發；Notion 的年份可能是店內實物的再版年。key 前綴照 §0.5（拉丁 `desc2:`、CJK `desc4:`）。
- **掛名**：照池中先例（`seed_cards.json` 唯讀掃描），不新造分裂、不自行合併。
- **撞池**：掃 seed 同名盤、等價形盤名、同場錄音重排；撞池就退件並寫明。
- **合輯／重發**：判斷是否走 §5.6，附 exceptionReason 與證據網址；無歷史定位者建議退件並交主線。
- **曲風**：genre／genres 照池內分類慣例。
- curatorWhy 寫收錄理由（店主在賣＋這張的定位）、curatorRisk 寫所有疑點、mbNote 寫查證軌跡。

## 續跑
每做完 3 張就把目前結果寫進輸出檔；輸出檔已有部分內容就接續補完，不要從頭重寫。

## 裁定
append 到 `batch-progress/add-20261008-shop/rulings.md` 自己的條號區間（a 組 8781–8790、b 組 8791–8800、c 組 8801–8810），寫之前先讀檔，只追加不覆寫。

## 邊界
只准動自己的卡單檔與 rulings.md。不碰 seed_cards.json（唯讀掃描可）、apex_pool.json、PROJECT_MEMORY.md、KV、Firestore。不 git add／commit／push。

報告要短：收幾退幾、身分疑點、需要主線裁定的事。
