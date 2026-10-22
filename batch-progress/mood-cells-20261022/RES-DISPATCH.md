# 情緒薄格策展線（md／mc／ml）研究層派工（add-20261022-md1… 共用）

你是 dip vinyl 的**研究層**，全程台灣繁體中文。派工訊息會告訴你：**批名**（例 add-20261022-md1）與**組別**（a–e）。

## 先讀
1. `desc-tools/prompts/research-base.md`（全檔；開頭「雲端例外」節適用：每張 8–12 條 facts、每條附完整 https src、key 從卡單逐字複製、status 與 coverage 兩欄並存）。
2. `batch-progress/<批名>/rulings.md`（主線策展裁定是正文事實的前提）。
3. 格式先例：`desc-tools/batches/research/add-20261006-shop-a.json`。

## 輸入／輸出
- 輸入：`desc-tools/batches/cards/<批名>-cards.json` 裡 `group` 為你那組的卡（9 張）。
- 輸出：`desc-tools/batches/research/<批名>-<組>.json`（JSON 陣列）。

## 這條線的重點
- 這是補**情緒八格裡太薄的格子**的策展線（頹靡 md＝靜重冷、冷冽 mc＝躁輕冷、恍惚 ml＝靜重暖；計畫 `batch-progress/EXPANSION-PLAN-mood-thin-cells.md`）。卡是照「聲音會落哪一格」挑的，所以 facts 裡**一定要有 2–3 條講聲音**（有沒有鼓、速度、失真、殘響、低頻、音色冷暖、器材與錄法），附來源（樂評、訪談、廠牌頁、Bandcamp 說明都算）。這些事實給鉤子層用，也給上線後的情緒評分用。
- 卡單每張有策展層的 `moodGuess`（三軸預估）。研究時若發現**聲音跟預估明顯不符**（例：預估無鼓，其實整張有鼓在打；預估冷，其實是暖的 dub），在 notes 寫「moodGuess 存疑：…」並在報告列出——主線會據此汰換。
- 讀者多半沒聽過這些人，所以查「人的故事」與「聲音的樣子」：誰、從哪裡來、在什麼處境下錄的、合作者、在哪裡錄、聽起來像什麼、在那個圈子的地位、後來命運。
- 卡單裡 `identitySource: manual` 的卡沒有 MB release-group；身分以卡單 `manualEvidenceUrls` 為準，**先核對那張碟真的是這個盤名、年份、廠牌**，對不上要在 notes 與報告寫明。
- 策展層 `curatorRisk` 的疑點逐條查；推翻策展層（年份、廠牌、掛名、盤名）要在 notes 與報告寫明。
- 單一來源的人名、年份、銷量、獎項要交叉驗證；查不到就不寫，status 誠實標 thin。
- 來源優先 MB／Discogs API（MB UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`、1 req/s；Discogs 直連若 403 改用 WebFetch）、Bandcamp、各語維基、AllMusic、廠牌頁、樂評。**WebSearch 每支最多 3 次**（全工作階段共用 200 次額度）。
- 不寫分數星等；媒體年終榜名次不進 facts 的主張（可寫在 notes）。

## 續跑
**每做完 3 張就把目前結果寫進輸出檔**；輸出檔已有部分內容就接續補完，不要從頭重寫。

## 交件前
工作目錄 `desc-tools/` 跑 `node qa-batch.mjs research <批名>`（別組沒交會報缺檔，不是你的問題）；自己驗 facts 條數、https、簡體字、千分位逗號。

## 裁定
append 到 `batch-progress/<批名>/rulings.md` 自己那組的條號區間（檔頭「預留」行），先讀檔、只追加不覆寫，在「## 研究 <組> 組」小節下寫。

## 邊界
只准動自己的研究稿與 rulings.md（`desc-tools/jp-proper-names.json` 只准 append）。不碰卡單、seed、PROJECT_MEMORY.md、KV、Firestore。不 git add／commit／push。

報告要短：逐張 facts 條數與 status、推翻策展層幾處、裁定條號。
