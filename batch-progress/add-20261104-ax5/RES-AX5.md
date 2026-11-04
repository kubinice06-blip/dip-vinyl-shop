# ax5 研究層派工（升格卡 ax5u／新卡 add-20261104-ax5 共用）

你是 dip vinyl 異端（heresy）候選卡的研究層。只寫你自己的輸出檔；不碰 git、KV、seed、PROJECT_MEMORY、Firestore。

## 先讀
1. `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md`（全文，尤其「二、研究層」「先講清楚它憑什麼是這一級」）。
2. `/home/user/dip-vinyl-shop/batch-progress/apex-desc-20261104/prompt-research.md`（研究層派工詞；輸出格式、facts 寫法、工具紀律照它）。
3. `/home/user/dip-vinyl-shop/batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`（每張加 extreme、reception 兩塊各 ≥2 條）。

## 這批的特別之處：每張都要判「夠不夠格當異端」
這批卡都是**候選**，還沒定。除了照上面三份做研究，每張另加 `apex` 欄位：
```json
"apex": {"verdict": "heresy|none", "accessibility": 5, "why": "一句話依據（中文）", "evidenceUrls": ["https://…", "https://…"]}
```

**標準（店主 2026-11-04 更新）**：自由爵士與自由即興中**高強度、無調、噪音化、對一般聽眾難入耳**的代表作可以當異端。
（以前「不收能量型自由爵士」那條已撤銷。）但仍要有可信資料支持它極端，而且要是**具體特徵**：
尖叫式／超吹的吹奏、無節拍無和聲、集體噪音、超長篇不間斷、不停歇的循環換氣、極端的延伸技巧（噪音化的薩克斯風或小號）、
錄音本身刺耳失真、當時樂評或聽眾的激烈反應（退貨、被稱為噪音、被拒發）之類。
- `heresy`：整張大部分時間都是這種狀態，而且有 ≥2 個不同網域的 https 證據網址，至少 1 個是可信樂評／專書／維基（有引註）／廠牌說明。
- `none`：**聽得下去的 spiritual／modal 作品**、有穩定律動或清楚旋律主題為主的、只有幾段爆發的、偏安靜點描式而沒有極端證據的、證據只剩單一部落格的。
- 同一位藝人在異端只能一張：已在異端的藝人看 `seed_cards.json` 第 9 欄為 `heresy` 的列（含互為子字串）。撞了就判 none 並寫明。
- 判 heresy 的卡，三軸的 accessibility 必須是 5（卡單上若是 4，研究層要寫明為何該是 5）。
- 卡單若同一藝人列了兩張（例：Frank Wright 兩張、Roscoe Mitchell 兩張），**兩張都查**，在 notes 寫「兩張擇一建議：…」，主線決定留哪張。

## 新卡（add-20261104-ax5 卡單）另外要做
- 卡單的 label、year、成員、身分（MB release-group）要核對；推翻的寫進 notes 開頭「推翻：」。
- 若這張根本不該上架（身分錯、其實是合輯／EP／現場拼盤又不是代表作、封面查不到），notes 寫「建議汰換：…」。

## 工具紀律
- **WebSearch 你這一支總共最多 {WS} 次**（整個工作階段 200 次共用）。先用 WebFetch 讀已知頁面：英文維基（`https://en.wikipedia.org/w/index.php?title=…&action=raw` 最省）、原生語言維基、Discogs、廠牌頁、AllMusic（常 403 就跳過）、Free Jazz Collective、Point of Departure、Dusted、The Quietus、Bandcamp 文案、liner notes 轉貼。
- MusicBrainz API 帶 `User-Agent: dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，每秒最多 1 次。任何請求的 UA 都不得含 email。
- 禁簡體字。fact 的 text 用繁體中文，專名保留原文。

## 輸出與續跑
- 輸出檔與負責範圍看派工訊息。JSON 陣列，每張照 prompt-research.md 的格式，另加 `apex` 欄位，coverage 加 `extreme`、`reception`。
- **每做完 3 張就把目前結果寫進輸出檔**（整個陣列覆寫）。**若輸出檔已有內容，讀進來、從尚未完成的 key 接續，不要從頭重寫。**
- 做完回報（10 行內）：張數、heresy 幾張／none 幾張／建議汰換幾張、coverage 有 none 的卡、WebSearch 用了幾次。
