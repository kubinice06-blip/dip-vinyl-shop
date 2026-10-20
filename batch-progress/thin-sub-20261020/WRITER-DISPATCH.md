# 薄細項策展線（ts）寫作層派工（add-20261020-ts1…ts6 共用）

你是 dip vinyl 的**寫作層**，全程台灣繁體中文。派工訊息會告訴你：**批名**與**你負責的 writer 檔編號**（1 或 2）。另一位代理同時跑另一檔，不要碰他的檔。

## 一、先讀（逐字讀完再動手）
1. `desc-tools/prompts/writer-base.md`——**規格本體，全檔**（字數帶：full 180–240、thin 120–180，`Array.from` 計；硬上限 280）。
2. `desc-tools/prompts/hook-base.md`。
3. `batch-progress/<批名>/rulings.md`——**全檔**，尤其**鉤子層**那兩段（骨架歸屬、他／她引入法配表、第二句句型配表）。研究層推翻策展層的只認 note 與 facts。
4. 先例：`desc-tools/batches/output/add-20261006-shop-out-1.json`（成品樣式）與 `batch-progress/add-20261006-shop/rulings.md` 寫作層（8755–8760）。

**輸入**：`desc-tools/batches/input/<批名>-writer-<N>.json`。**輸出**：`desc-tools/batches/output/<批名>-out-<N>.json`。**key 逐字同序、同數量。**

## 二、鐵則
- **首句照抄 hook**，逐字，不改標點。**第二句不得複述 hook**，改成替 hook 的代稱具名或補上 hook 沒指明的身分。
- **只寫 note 列出的東西**，不准自行補常識、年份、曲風、評價；note 沒列、facts 有的也不寫。
- 不寫分數星等、不寫「必聽／傑作／里程碑／獨樹一格／具有代表性／層次豐富／融合多種元素」；不用「這張專輯」開頭；音樂人名照卡池掛名（越南文保留聲調、泰文等照卡單；日本人用原名漢字／假名）。
- 禁「據說」「據…表示」等轉述引導詞；禁「也就是」式注解；不寫否定句（note 裡「這一格不寫」就是不寫）。
- 開頭兩句讓不懂的人知道是誰（身分或樂種）。
- 動筆前把全檔的日期＋動詞、句首、第二句句型配死，交件前自掃跨張中文 4-gram（3 次以上改寫，專名與樂器名不算）。

## 三、續跑
**每做完 5 張就把目前結果整份寫回輸出檔**；輸出檔已有內容就先讀、接續補完，不要從頭重寫。

## 四、交件前（工作目錄 `desc-tools/`）
`node qa-batch.mjs out <批名>`、`node qa-check-research.mjs batches/input/<批名>-writer-<N>.json batches/output/<批名>-out-<N>.json`、`node fix-spacing.mjs batches/output/<批名>-out-<N>.json`（有問題再加 `--write`）。逐張字數寫進報告。

## 五、裁定
append 到 `batch-progress/<批名>/rulings.md` 的「寫作」條號區間（writer-1 用前半、writer-2 用後半），在「## 寫作層（writer-<N>）」小節下寫。先讀檔、只追加不覆寫。

## 六、邊界
只准動自己的 out 檔與 rulings.md。不碰卡單、研究稿、hooks、seed、PROJECT_MEMORY.md、KV、Firestore。不 git add／commit／push。

報告要短：張數、字數範圍、超標處理、自掃結果、腳本結果、裁定條號。
