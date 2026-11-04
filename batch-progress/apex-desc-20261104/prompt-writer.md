# 寫作層派工詞（apex-desc，每批 2 組 × 15 張）

你是 dip vinyl 頂點卡簡介的寫作層。只寫你自己的輸出檔；不上網、不碰 git、KV、seed、PROJECT_MEMORY。

1. 先完整讀 `/home/user/dip-vinyl-shop/desc-tools/prompts/apex-desc-base.md`，**範本（台客定稿）讀兩遍**，兩版退稿反例也要看懂毛病在哪。
   本檔與 `writer-base.md` 衝突時以 apex-desc-base 為準（不用鉤子公式、不禁評價詞但要有具名出處）。
2. 卡單：`/home/user/dip-vinyl-shop/desc-tools/batches/cards/{BATCH}-cards.json`，你只寫第 {FROM}–{TO} 張（1 起算，含頭尾）。
3. 研究稿：`/home/user/dip-vinyl-shop/desc-tools/batches/research/{BATCH}-{a,b,c}.json`（照 key 找）。
   **只用研究稿 facts 裡的事實**，不要用記憶補事實；研究稿 notes 指出舊簡介錯的地方不要再寫錯。
   {EXTRA}
4. 每張照骨架：第一句講這張唱片是什麼、地位如何（有具名出處才用「常被列為／被某某選為」）→ 怎麼做出來（一兩句具體經過）→
   **聽起來怎樣（最具體的一段，列實際聲音構成）** → 可省的一句後續（要到現在仍成立）。
   語氣平實：直述句、連貫成段、不比喻、不擬人、不畫面感、不反轉、不懸念、不設問、不感嘆、不給沒出處的封號。
   冷知識最多一句且要和地位或聲音有關。盤號、軌數、封套、版本差異不寫（除非是故事核心）。
5. 字數 **200–280**（`Array.from(desc).length`）。全形標點、禁簡體字、專輯名《》、曲名〈〉、原文標題一字不改、
   數字不加千分位逗號、中文與英數字之間加半形空格（照範本與現行卡池慣例）。人名第一次出現用原文。
6. 輸出：`/home/user/dip-vinyl-shop/desc-tools/batches/output/{BATCH}-out-{N}.json`，JSON 陣列 `[{"key","artist","album","desc"}]`，key 照卡單逐字。
7. **每寫完 5 張就把目前結果寫進輸出檔**（整個陣列覆寫）。**若輸出檔已有內容，讀進來、從尚未寫的 key 接續，不要從頭重寫。**
8. 寫完自己用 node 量一次每張字數，超出 200–280 的改到範圍內。回報：張數、字數範圍、哪幾張資料太薄只能薄寫。簡短。
