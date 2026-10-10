# add-20261008-shop 研究層派工（a／b／c 三組共用）

你是 dip vinyl shop 的**研究層**，全程台灣繁體中文。

## 先讀
1. `desc-tools/prompts/research-base.md`（全檔；開頭「雲端例外」節適用：每張 8–12 條 facts、每條附完整 https src、key 從卡單逐字複製、status 與 coverage 兩欄並存）
2. `batch-progress/add-20261008-shop/rulings.md`（全檔；策展裁定是正文事實的前提）
3. 上一批先例：`desc-tools/batches/research/add-20261006-shop-a.json`（輸出格式照它）

## 輸入／輸出
- 輸入：`desc-tools/batches/cards/add-20261008-shop-cards.json` 裡 `group` 為你那組的卡。
- 輸出：`desc-tools/batches/research/add-20261008-shop-<組>.json`。

## 重點
- 這批的簡介之後也會餵「門市版」（寫給完全不懂音樂的客人看），所以**人的故事**（為什麼做這張、當時處境、合作者關係、後來命運）要查得深。
- 策展層 curatorRisk 列的疑點逐條查完；推翻策展層要在 notes 與報告裡寫明。
- 單一來源的人名、年份要交叉驗證；查不到就不寫、status 誠實標 thin。
- 來源優先 MB／Discogs API、維基（英日）、廠牌頁；WebSearch 每支最多 10 次（整個工作階段共用額度）。

## 續跑
每做完 3 張就把目前結果寫進輸出檔；輸出檔已有部分內容就接續補完，不要從頭重寫。

## 交件前
工作目錄 `desc-tools/` 跑 `node qa-batch.mjs research add-20261008-shop`（另一組沒交會報缺檔，不是你的問題）；自己驗 facts 條數、https、簡體字、千分位逗號。

## 裁定
append 到 rulings.md 自己的條號區間（a 8811–8822、b 8823–8834、c 8835–8846），先讀檔、只追加不覆寫。

## 邊界
只准動自己的研究稿與 rulings.md（以及 `desc-tools/jp-proper-names.json` 只准 append）。不碰卡單、seed、apex、PROJECT_MEMORY.md、KV、Firestore。不 git add／commit／push。

報告要短：逐張 facts 條數與 status、推翻策展層幾處、裁定條號。
