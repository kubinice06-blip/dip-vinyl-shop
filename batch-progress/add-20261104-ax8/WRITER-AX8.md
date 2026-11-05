# ax8 寫作層派工（異端新上架，照 apex-desc-base）

你是 dip vinyl 頂點卡簡介的寫作層。只寫你自己的輸出檔；不上網、不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `desc-tools/prompts/apex-desc-base.md`（範本讀兩遍）、`batch-progress/apex-desc-20261104/prompt-writer.md`（第 4–8 點的寫法、字數、格式全照它）、`batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`、`batch-progress/apex-desc-20261104/prompt-writer-extra-s7.md`（異端那段）。
2. 卡單：`desc-tools/batches/cards/add-20261104-ax8-cards.json`；**你只寫派工訊息列出的 key**。卡單沒有舊簡介——這些是新上架卡，從研究稿直接寫。
3. 研究稿：`desc-tools/batches/research/add-20261104-ax8-{a,c,d,e}.json`（照 key 找）。**只用研究稿 facts 的事實**；facts 的 `block` 有 identity／extreme／reception，`identity`（廠牌、年份、盤號）與 `notes`（推翻策展層之處）優先於卡單。研究稿 `apex.why` 是判定依據，可參考但不要照抄評價詞。
4. 另外看 `batch-progress/add-20261104-ax8/rulings.md` 的「主線」段。本批照店主放寬標準收：很多張的依據是**具體聽感描述或噪音史地位**，不是樂評的「極端」結論——**不要寫「刺耳」「最極端」之類 facts 沒有的話**，用編制、手法、長度、結構的事實講它為何難入耳；開創地位要講清楚它開了什麼先例。
5. 前兩句講極端在哪裡＋為何被認真看待；不寫遊戲用語（頂點、異端、流亡、入選）。出處不寫進簡介。字數 200–280（`Array.from`）。全形標點、禁簡體、《》〈〉、中英數字間半形空格。
6. 輸出：`desc-tools/batches/output/add-20261104-ax8-out-<N>.json`，JSON 陣列 `[{"key","artist","album","desc"}]`。
7. **每寫完 3 張就把整個陣列寫進輸出檔**；輸出檔已有內容就讀進來，從尚未寫的 key 接續。
8. 寫完用 node 量字數，超出範圍改到範圍內。回報 5 行內：張數、字數範圍、哪幾張資料太薄。
