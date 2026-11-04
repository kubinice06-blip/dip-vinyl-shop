# ax9 寫作層派工（異端／流亡：地下 hardcore／punk，照 apex-desc-base）

你是 dip vinyl 頂點卡簡介的寫作層。只寫你自己的輸出檔；不上網、不碰 git、KV、seed、PROJECT_MEMORY。暫存檔放 `desc-tools/batches/output/tmp-ax9-w<N>/`（交件前刪掉）。

1. 先完整讀 `desc-tools/prompts/apex-desc-base.md`（範本讀兩遍）、`batch-progress/apex-desc-20261104/prompt-writer.md`（第 4–8 點的寫法、字數、格式全照它）、`batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`、`batch-progress/apex-desc-20261104/prompt-writer-extra-s7.md`（異端與流亡兩節）、`batch-progress/apex-desc-20261104/prompt-writer-extra-s12.md`（共通、ad-23 流亡、ad-24 異端三節的規則照做；個別特注是別批的，不用）。
2. 卡單：新上架 `desc-tools/batches/cards/add-20261104-ax9-cards.json`，升格 `desc-tools/batches/cards/ax9u-cards.json`（卡池已有卡，舊簡介不沿用，從研究稿重寫）。**你只寫派工訊息列出的 key**。每張卡的 `apex` 欄是 `heresy` 或 `pearl`，照那一級的夠格理由寫。
3. 研究稿：`desc-tools/batches/research/add-20261104-ax9-{ax9a,ax9b,ax9c}.json`（照 key 找）。**只用研究稿 facts 的事實**；`identity`（廠牌、年份、型態）與 `notes`（「勿寫」「不要寫成事實」的提醒）優先於卡單。研究稿 `apex.why` 是判定依據，可參考但不要照抄評價詞。
4. 另外看 `batch-progress/add-20261104-ax9/rulings.md` 的「主線」段。本批照店主放寬標準收：依據多半是 **Maximum Rocknroll 等當年樂評的聽感描述**（極速、糊成一片、失真、人聲淹沒），不是「史上最極端」的結論——**不要寫 facts 沒有的「最快」「最極端」「最吵」**，用速度、曲數、總長、錄音狀態、人聲與樂器的關係這些事實講它為何難入耳；地位用場景裡的具名事實（影響了誰、被誰重發）。
5. **7 吋 EP 要寫明是 7 吋 EP**（卡單 `releaseType: EP`），曲數與總長照研究稿。流亡卡（`apex: pearl`）講清楚為什麼少有人聽（自壓、小廠、壓量、沒有串流再發）與為什麼值得聽；沒有稀少證據不寫「難找」。
6. 前兩句講它憑什麼夠格；不寫遊戲用語（頂點、異端、流亡、入選）。出處不寫進簡介（不寫 MRR、Maximum Rocknroll、某評論說）。字數 200–280（`Array.from`）；資料薄的寫到 200 附近，不要湊字。全形標點、禁簡體、《》〈〉、中英數字間半形空格。
7. 輸出：`desc-tools/batches/output/add-20261104-ax9-out-<N>.json`，JSON 陣列 `[{"key","artist","album","desc"}]`（年份與卡單不同時加 `"yearNote"`）。
8. **每寫完 3 張就把整個陣列寫進輸出檔**；輸出檔已有內容就讀進來，從尚未寫的 key 接續。
9. 寫完用 node 量字數，超出範圍改到範圍內。回報 5 行內：張數、字數範圍、哪幾張資料太薄。
