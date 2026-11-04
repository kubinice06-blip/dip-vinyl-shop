# ax10 寫作層派工（異端／流亡：英語圈地下 hardcore／punk，照 apex-desc-base）

你是 dip vinyl 頂點卡簡介的寫作層。只寫你自己的輸出檔；不上網、不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `desc-tools/prompts/apex-desc-base.md`（範本讀兩遍）、`batch-progress/apex-desc-20261104/prompt-writer.md`（第 4–8 點的寫法、字數、格式全照它）、`batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`、`batch-progress/apex-desc-20261104/prompt-writer-extra-s7.md`（異端那段）。流亡卡另讀 `apex-desc-base.md` 流亡那一列與 `batch-progress/apex-desc-20261104/prompt-writer-extra-s12.md`（講為什麼少有人聽：私壓、壓量、沒再版、樂團早散）。
2. 卡單：`desc-tools/batches/cards/add-20261104-ax10-cards.json`（新卡）與 `desc-tools/batches/cards/add-20261104-ax10u-cards.json`（升格卡，有 `currentDesc` 舊簡介——舊簡介只當參考，事實以研究稿為準，整篇重寫）。**你只寫派工訊息列出的 key**。
3. 研究稿：`desc-tools/batches/research/add-20261104-ax10-*.json`、`add-20261104-ax10u-*.json`（照 key 找）。**只用研究稿 facts 的事實**；`identity`（廠牌、年份、盤號、型態、曲數、長度）與 `notes`（推翻策展層之處）優先於卡單。研究稿 `apex.why` 是判定依據，可參考但不要照抄評價詞。
4. 另外看 `batch-progress/add-20261104-ax10/rulings.md` 的「主線」段。本批照店主放寬標準收：依據是**具體聽感描述**，不是樂評的「極端」結論——**不要寫「刺耳」「最極端」「最快」之類 facts 沒有的話**，用歌長、速度、曲數、錄音條件、編制、結構的事實講它為何難入耳。7 吋／demo 卡要讓讀者知道它是 7 吋或卡帶（型態本身就是這一路的常態）。
5. 前兩句講「它憑什麼是這一級」（異端：高強度在哪裡；流亡：為什麼少有人聽）＋為何被認真看待；不寫遊戲用語（頂點、異端、流亡、入選、卡池）。出處、媒體名、榜單名次不寫進簡介。不用「據說／據傳」。字數 200–280（`Array.from`）。全形標點、禁簡體、《》〈〉、中英數字間半形空格。
6. 輸出：`desc-tools/batches/output/add-20261104-ax10-out-<N>.json`（升格卡寫 `add-20261104-ax10u-out-<N>.json`），JSON 陣列 `[{"key","artist","album","desc"}]`。
7. **每寫完 3 張就把整個陣列寫進輸出檔**；輸出檔已有內容就讀進來，從尚未寫的 key 接續。
8. 寫完用 node 量字數，超出範圍改到範圍內。回報 5 行內：張數、字數範圍、哪幾張資料太薄。
