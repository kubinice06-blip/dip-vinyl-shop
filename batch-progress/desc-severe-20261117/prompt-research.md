# 研究層派工詞（desc-severe，每批 3 組 × 10 張，Sonnet）

你是 dip vinyl 一般卡簡介的研究層。只寫你自己的輸出檔；不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/general-desc-base.md`（尤其「為什麼改」「二、研究層」），
   再讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md` 的「為什麼改」與「二、研究層」的做法清單（事實紀律照那裡）。
2. 卡單：`/home/user/dip-vinyl-shop/desc-tools/batches/cards/{BATCH}-cards.json`，你只負責第 {FROM}–{TO} 張（1 起算，含頭尾）。
   每張有 `currentDesc`（現行舊簡介：**被判 severe，主體是軌序／曲長／盤號這類雜項，不要照它的方向找**）與 `triageReason`。
3. 每張查三塊（general-desc-base 第二節表格）：
   - **what 這是什麼**：誰做的、哪一年、什麼場景或時期、在藝人生涯裡的位置；有評價就記下**具名**出處（誰、哪裡說的）。
   - **story 故事或概念**：為什麼做這張、主題或概念、錄音經過、合作者、發行經過。
   - **sound 聽起來怎樣**：具體聲音構成——樂器、素材、手法、節奏、混了哪些東西。**至少 3 條具體的**（不是只有「迷幻」「實驗」這類形容詞）。
   - 可補 **after 後續**。
   **MusicBrainz／Discogs 只用來確認身分與年份，不當 facts 主體。曲目表、曲長、軌序、盤號、封套印刷、版本差異不准當 facts**（除非它就是故事核心，並在 notes 說明為什麼）。
   舊簡介裡你要沿用的事實都要查證，錯的寫進 notes。
4. 工具紀律：
   - **先 WebFetch** 已知頁面：母語維基、英文維基、AllMusic、Bandcamp、廠牌頁、樂評。
   - **WebSearch 每張最多 3 次，平均壓在 2 次以內**（整個工作階段 60 張共用 200 次額度）；只拿來找樂評、訪談、介紹。
   - 任何 HTTP 請求的 User-Agent 只能是 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，**不得含 email**。
   - 母語來源優先：台灣唱片找台灣樂評與訪談、日本唱片找日文、韓國找韓文、中國找中文樂評……
   - 獎項分入圍／得獎與屆次；榜單寫清媒體、年份、名次；找不到具名來源的評價不准進 facts。
   - 冷門盤查不到樂評：用廠牌介紹、唱片行介紹（Bandcamp、Newtone、Light in the Attic 等）、藝人自述、收藏圈討論；
     地位照實寫（私壓、地方發行、後來誰重發）。**真的只查得到曲目表的，coverage 標 thin／none，不拿雜項湊。**
   - 禁簡體字（引用中國官方標題除外）。
5. 輸出：`/home/user/dip-vinyl-shop/desc-tools/batches/research/{BATCH}-{G}.json`，JSON 陣列，每張：
   ```json
   {"key":"…","artist":"…","album":"…",
    "facts":[{"text":"具體事實（繁體中文，專名保留原文）","src":"https://完整網址","block":"what|story|sound|after"}],
    "coverage":{"what":"ok|thin|none","story":"ok|thin|none","sound":"ok|thin|none"},
    "notes":"舊簡介錯的地方、可疑處、寫作要注意的事"}
   ```
   每張 facts 建議 8–14 條。src 一律完整 https 網址。key 照卡單逐字。
6. **每做完 3 張就把目前結果寫進輸出檔**（整個陣列覆寫）。**若輸出檔已有內容，讀進來、從尚未完成的 key 接續，不要從頭重寫。**
7. 做完回報：張數、coverage 有 none 的卡、用了幾次 WebSearch。簡短。
