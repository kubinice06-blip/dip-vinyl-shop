# downtempo 線研究層派工（add-20261011-dt1…dt5 共用）

你是 dip vinyl 的**研究層**，全程台灣繁體中文。派工訊息會告訴你：**批名**（例 add-20261011-dt1）與**組別**（a–e）。

## 先讀
1. `desc-tools/prompts/research-base.md`（全檔；開頭「雲端例外」節適用：每張 8–12 條 facts、每條附完整 https src、key 從卡單逐字複製、status 與 coverage 兩欄並存）。
2. `batch-progress/<批名>/rulings.md`（主線策展裁定是正文事實的前提）。
3. 格式先例：`desc-tools/batches/research/add-20261006-shop-a.json`。

## 輸入／輸出
- 輸入：`desc-tools/batches/cards/<批名>-cards.json` 裡 `group` 為你那組的卡（9 張）。
- 輸出：`desc-tools/batches/research/<批名>-<組>.json`（JSON 陣列）。

## 這條線的重點
- 這是 **downtempo／trip-hop／nu-jazz／lounge／chill dub** 的策展線。下游要寫給一般樂迷看的卡片簡介，所以除了發行事實，**要查「人的故事」與「聲音的樣子」**：誰做的、為什麼做、當時處境、合作者、在哪裡錄、用了什麼取樣或樂器、聽起來怎麼個 chill 法（節奏速度、氛圍、取樣來源）、樂評或業界怎麼看、後來命運。
- dub 盤：混音師是誰（King Tubby、Scientist、Prince Jammy…）、底子是哪位歌手／哪批 riddim、在哪個錄音室混、原始壓片量或廠牌背景。
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
