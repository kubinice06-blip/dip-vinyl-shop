# ax8 研究層派工（異端新上架；2026-11-04；放寬標準）

你是 dip vinyl 的研究層，全程台灣繁體中文。只寫你自己的輸出檔與 rulings.md 自己那段；不碰卡單、seed、PROJECT_MEMORY、KV、Firestore、git。

## 先讀（全部讀完再開工）
1. `desc-tools/prompts/apex-desc-base.md`（「為什麼改」「二、研究層」「三、寫作層」的表格）。
2. `batch-progress/apex-desc-20261104/prompt-heresy-addendum.md`、`batch-progress/apex-desc-20261104/prompt-research-extra-s7.md`（異端那段）。
3. `batch-progress/apex-new-20261104/RES-APEX.md`（`apex` 欄寫法）。**判定標準改用店主 2026-11-04「稍微放寬」版（見 `batch-progress/add-20261104-ax8/rulings.md` 檔頭）**：可信來源**描述出具體、持續整張的高強度聽感**就判 heresy——全程無調、無固定節拍、集體即興密度極高、回授／失真音牆、尖叫式吹奏、超長篇不間斷、極端音量；或在噪音史上有開創地位（附文那類）。**不再要求樂評下「極端／刺耳」結論，描述到位即可。** 仍判 none：有清楚結構、聽得下去的前衛；spiritual／modal 爵士；一般碾核、技術死亡金屬；只有局部段落激烈。`heresy` 仍要 2 個不同網域的 https 證據，其中至少 1 個可信（樂評、專書、學術、有引註維基；廠牌說明只當輔證）。
4. `batch-progress/apex-new-20261104/RES-RULES-CLOUD.md`（不 cd 出工作目錄、Bash 保持單純）。
5. `batch-progress/add-20261104-ax8/rulings.md`（主線策展裁定）。

## 輸入／輸出
- 卡單：`desc-tools/batches/cards/add-20261104-ax8-cards.json` 裡 `group` 為你那組的卡。
- 輸出：`desc-tools/batches/research/add-20261104-ax8-<組>.json`，JSON 陣列，每張：
  ```json
  {"key":"（卡單逐字）","artist":"…","album":"…","tier":"heresy",
   "facts":[{"text":"…","src":"https://…","block":"status|making|sound|extreme|reception|after|identity"}],
   "coverage":{"status":"ok|thin|none","making":"…","sound":"…","extreme":"…","reception":"…"},
   "identity":{"label":"…","year":0,"catno":"…","notes":"推翻策展層的年份／廠牌／掛名／盤名"},
   "apex":{"verdict":"heresy|none","accessibility":5,"why":"一句話依據","evidenceUrls":["https://…","https://…"]},
   "notes":"可疑處、寫作要注意的事；不該上架就寫「建議汰換：…」"}
  ```
  facts 每張 8–15 條，`sound` 至少 3 條具體的，`extreme`、`reception` 各至少 2 條（單一來源在 text 末註「（單一來源）」）。
- **身分**：先核對 MB release-group（卡單 `rgMbid`）或人工身分證據，盤名、首發年、廠牌、型態（是不是合輯／EP／現場）對不對；對不上寫進 `identity.notes`，嚴重的寫「建議汰換」。
- **異端判定**：照 RES-APEX。`heresy` 要 2 個不同網域的 https 證據，至少 1 個是可信樂評／專書／廠牌說明／有引註維基。同藝人在卡池（任何 tier）已有卡就寫進 notes 交主線（卡單都已查過，但化名、團員關係再看一眼）。

## 工具紀律
- 先 WebFetch 直接讀已知頁面（英文與原生語言維基、Discogs、AllMusic、Free Jazz Collective、Point of Departure、Dusted、The Quietus、Bandcamp、廠牌頁），**WebSearch 每張最多 2 次、全組平均 1.5 次以內**（整個工作階段共用 200 次）。
- 任何請求 User-Agent 只能是 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不得含 email。MB 每秒 1 次。
- 母語來源優先（日本盤找日文、德國找德文、韓國找韓文）。
- 地位宣稱要能指名是誰、在哪裡說的；找不到具名來源的評價不准進 facts。禁簡體字。

## 續跑
**每做完 2 張就把整個陣列寫進輸出檔**；輸出檔已有內容就讀進來，從尚未完成的 key 接續，不要從頭重寫。

## 裁定
append 到 `batch-progress/add-20261104-ax8/rulings.md` 自己那組的條號區間（檔頭「預留」行），先讀檔、只追加不覆寫，在「## 研究 <組> 組」小節下逐張一行。

回報要短：逐張 apex 判定、建議汰換幾張、用了幾次 WebSearch。
