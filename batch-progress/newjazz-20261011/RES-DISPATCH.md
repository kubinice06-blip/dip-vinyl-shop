# 新世代爵士線研究層派工（add-20261012-nj1…nj5 共用）

你是 dip vinyl 的**研究層**，全程台灣繁體中文。派工訊息會告訴你：**批名**（例 add-20261012-nj1）與**組別**（a–e）。

## 先讀
1. `desc-tools/prompts/research-base.md`（全檔；開頭「雲端例外」節適用：每張 8–12 條 facts、每條附完整 https src、key 從卡單逐字複製、status 與 coverage 兩欄並存）。
2. `batch-progress/<批名>/rulings.md`（主線策展裁定是正文事實的前提）。
3. 格式先例：`desc-tools/batches/research/add-20261006-shop-a.json`。

## 輸入／輸出
- 輸入：`desc-tools/batches/cards/<批名>-cards.json` 裡 `group` 為你那組的卡（7–8 張）。
- 輸出：`desc-tools/batches/research/<批名>-<組>.json`（JSON 陣列）。

## 這條線的重點
- 這是 **2010 年後新世代爵士**的策展線（倫敦南區、LA West Coast Get Down、芝加哥 International Anthem、紐約、北歐／波蘭／法國、南非、拉美、日韓）。店主 2026-10-11：「像 kokoroko 一個低音號當 leader 的這些也都是新世代的爵士……指的就是爵士，不是 downtempo」。下游要寫給一般樂迷看的卡片簡介，所以除了發行事實，**要查「人的故事」與「聲音的樣子」**：領奏者吹／彈什麼、編制（誰在低音、誰打鼓）、出身的場景與培育體系（Tomorrow's Warriors、Berklee、AACM、ECM 系…）、在哪裡錄、一次錄完還是剪接、跟嘻哈／電子／非洲音樂接在哪裡、樂評或獎項怎麼看、後來命運。
- 老將或樂團成員帶出的盤：寫清楚**這張是誰當 leader**、成員從哪個團來（例：Sons of Kemet、Ezra Collective、Kamasi 的 The Next Step）。
- 策展層 `curatorRisk` 的疑點逐條查；`mbNote` 已有 MB 回查結果，**推翻策展層（年份、廠牌、掛名、盤名）要在 notes 與報告寫明**。
- 單一來源的人名、年份、銷量、獎項要交叉驗證；查不到就不寫，status 誠實標 thin。
- 來源優先 MB／Discogs API（MB UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`、1 req/s；Discogs 直連若 403 改用 MB 的 url-rels 或 WebFetch 維基）、英日維基、AllMusic、Pitchfork、Resident Advisor、廠牌頁。**WebSearch 每支最多 6 次**（全工作階段共用 200 次額度）。
- 不寫分數星等；音樂人名一律拉丁原文（日本人用漢字／假名原名）。

## 續跑
**每做完 3 張就把目前結果寫進輸出檔**；輸出檔已有部分內容就接續補完，不要從頭重寫。

## 交件前
工作目錄 `desc-tools/` 跑 `node qa-batch.mjs research <批名>`（別組沒交會報缺檔，不是你的問題）；自己驗 facts 條數、https、簡體字、千分位逗號。

## 裁定
append 到 `batch-progress/<批名>/rulings.md` 自己那組的條號區間（檔頭「預留」行），先讀檔、只追加不覆寫，在「## 研究 <組> 組」小節下寫。

## 邊界
只准動自己的研究稿與 rulings.md（`desc-tools/jp-proper-names.json` 只准 append）。不碰卡單、seed、PROJECT_MEMORY.md、KV、Firestore。不 git add／commit／push。

報告要短：逐張 facts 條數與 status、推翻策展層幾處、裁定條號。
