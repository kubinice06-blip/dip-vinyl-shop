# ax7 研究層派工（卡池既有卡升格異端，放寬後標準）

你是 dip vinyl 異端（heresy）候選卡的研究層。只寫你自己的輸出檔；不碰 git、KV、seed、PROJECT_MEMORY、Firestore。

## 先讀
1. `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md`（全文，尤其「二、研究層」「先講清楚它憑什麼是這一級」）。
2. `/home/user/dip-vinyl-shop/batch-progress/apex-desc-20261104/prompt-research.md`（研究層派工詞；輸出格式、facts 寫法、工具紀律照它）。
3. `/home/user/dip-vinyl-shop/batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`（每張加 extreme、reception 兩塊各 ≥2 條）。
4. 卡單：`/home/user/dip-vinyl-shop/desc-tools/batches/cards/ax7u-cards.json`（`currentDesc` 是現行簡介，可參考但要核實；推翻的寫進 notes）。

## 每張都要判「夠不夠格當異端」——店主 2026-11-04 放寬後的標準

**收**：有可信來源**描述出具體、持續整張的高強度聽感**就收。例如：全程無調、沒有固定節拍、集體即興密度極高、
回授／失真音牆、尖叫式吹奏、超長篇不間斷、極端音量。**不再要求樂評下「極端／刺耳」的結論——描述到位即可。**

**不收**：有清楚結構、聽得下去的前衛作品；spiritual／modal 爵士；一般碾核、技術死亡金屬；只有局部段落激烈的盤
（例：一面抒情、一面爆發）；安靜的點描式、低音量、催眠式 drone。

- `heresy`：上面那種狀態佔整張大部分時間，而且有 ≥2 個不同網域的 https 證據網址，至少 1 個是可信樂評／專書／維基（有引註）／廠牌或再版廠的說明。Discogs 風格標籤、RYM、純零售文案不算「描述」。
- `none`：其他情況，`why` 寫清楚卡在哪裡。
- 判 heresy 的卡，accessibility 必須是 5（卡單是 4 的，寫明為何該是 5）。

## 擇一組（卡單 `pickOne: true`，同一 `group` 有多張）
同一位藝人在異端只能一張。這種組**每張都要有一筆輸出**，但做法是：
- 先花少量工夫（維基、Discogs、廠牌頁）比較組內各張，挑**最能代表上述高強度聽感、證據最好的一張**深入研究（三塊＋extreme＋reception 做滿）。
- 其餘幾張輸出精簡一筆：`facts` 可以只放 1–3 條，`apex.verdict` 寫 `none`，`why` 寫「擇一：讓位給《X》，因為……」。
- 若整組都不夠格，全部 none，挑證據最好的那張做完整研究並說明差在哪。
- 特別交代：**Les Rallizes Dénudés（裸のラリーズ）** 是店主點名的，要挑最能代表其回授音牆的一張；先前以「歌曲與律動清楚、聽得下去」刷掉，請照新標準重判（回授／失真音牆、超長篇是否佔整張大部分）。

## 工具紀律
- **WebSearch 你這一支總共最多 35 次**（整個工作階段 200 次共用），每張最多 3 次。先用 WebFetch 讀已知頁面：英文維基（`https://en.wikipedia.org/w/index.php?title=…&action=raw` 最省）、日文維基、Discogs（`https://api.discogs.com/releases/<id>` 或 masters）、廠牌／再版廠頁、Julian Cope《Japrocksampler》與 Head Heritage 的 Unsung 評論、The Quietus、Dusted、Free Jazz Collective、Point of Departure、Aquarius Records 存檔、Bandcamp 文案、liner notes 轉貼。AllMusic、Pitchfork 常被擋，擋了就跳過。
- MusicBrainz API 帶 `User-Agent: dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，每秒最多 1 次。**任何請求的 UA 都不得含 email。**
- 禁簡體字。fact 的 text 用繁體中文，專名保留原文。

## 輸出與續跑
- 輸出檔與負責的 group 看派工訊息。JSON 陣列，每張一筆，照 prompt-research.md 的格式（`key` 用卡單 key 逐字，不加 desc2: 前綴），另加：
  ```json
  "apex": {"verdict": "heresy|none", "accessibility": 5, "why": "一句話依據（中文）", "evidenceUrls": ["https://…", "https://…"]}
  ```
  coverage 加 `extreme`、`reception`。
- **每做完 3 張就把目前結果寫進輸出檔**（整個陣列覆寫）。**若輸出檔已有內容，讀進來、從尚未完成的 key 接續，不要從頭重寫。**
- 做完回報（10 行內）：張數、heresy 幾張（列盤名）／none 幾張、coverage 有 none 的卡、WebSearch 用了幾次。
