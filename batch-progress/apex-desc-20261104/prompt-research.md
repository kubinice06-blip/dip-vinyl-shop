# 研究層派工詞（apex-desc，每批 3 組 × 10 張）

你是 dip vinyl 頂點卡簡介的研究層。只寫你自己的輸出檔；不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md`（尤其「為什麼改」「二、研究層」）。
2. 卡單：`/home/user/dip-vinyl-shop/desc-tools/batches/cards/{BATCH}-cards.json`，你只負責第 {FROM}–{TO} 張（1 起算，含頭尾）。
   每張有 `currentDesc`（現行舊簡介，可能有錯）與 `triageReason`（檢查層指出的問題與疑點）。
3. 每張查三塊：地位（具名樂評／榜單媒體＋年份＋名次／獎項入圍或得獎分清楚）、怎麼做出來（錄音時地、製作、困境、發行經過）、
   聽起來怎樣（具體樂器、素材、手法、結構）。可補「後續」。**舊簡介裡的每個具體事實都要查證**，錯的寫進 notes。
4. 工具紀律：
   - **先用 WebFetch** 直接讀英文維基與原生語言維基（Reception／Legacy／Recording 段）、AllMusic、Pitchfork、Discogs 等已知頁面。
   - **WebSearch 每張最多 3 次，平均壓在 2 次以內**——整個工作階段 60 張共用 200 次額度。只拿來找樂評與訪談。
   - 任何 HTTP 請求的 User-Agent 只能是 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不得含 email。
   - 母語來源優先（巴西盤找葡文、日本盤找日文、法國找法文……）。
   - 地位宣稱一定要能指名是誰、在哪裡說的；找不到具名來源的評價不准進 facts。榜單寫清媒體、年份、名次；「入圍」與「得獎」分清。
   - 禁簡體字（引用中國官方標題除外）。
5. 輸出：`/home/user/dip-vinyl-shop/desc-tools/batches/research/{BATCH}-{G}.json`，JSON 陣列，每張：
   ```json
   {"key":"…","artist":"…","album":"…","tier":"hall",
    "facts":[{"text":"具體事實（繁體中文，專名保留原文）","src":"https://完整網址","block":"status|making|sound|after"}],
    "coverage":{"status":"ok|thin|none","making":"ok|thin|none","sound":"ok|thin|none"},
    "notes":"推翻舊簡介之處、可疑處、寫作要注意的事"}
   ```
   每張 facts 建議 8–15 條，sound 塊至少 3 條具體的。src 一律完整 https 網址。key 照卡單逐字。
6. **每做完 3 張就把目前結果寫進輸出檔**（整個陣列覆寫）。**若輸出檔已有內容，讀進來、從尚未完成的 key 接續，不要從頭重寫。**
7. 做完回報：張數、各卡 coverage 有 none 的、用了幾次 WebSearch。簡短。
