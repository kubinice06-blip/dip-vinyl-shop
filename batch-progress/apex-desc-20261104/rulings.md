# apex-desc-20261104 裁定紀錄

## 第 0 步（s1，2026-11-04）

- **範圍**：`origin/main` aab6c1d11 的 seed，tier hall 303／heresy 85／pearl 290；排除《台客的復仇》後 677 張（hall 302）。
- **現行簡介讀法**：Cloudflare KV bulk get 讀 `desc2:`＋`desc4:`（不用 `/album-desc`）。desc2 643、只有 desc4 32、兩鍵皆無 2。
  - 兩鍵皆無的《The Dark Side of the Moon》《Kind of Blue》前台供的是 worker 內建 CURATED_DESCS（`/album-desc` 回 `X-Cache: CURATED`）。
    worker 讀序 desc2 → CURATED → desc4，所以重寫後寫 desc2 即可壓過。
  - 只有 desc4 的 32 張逐張打 `/album-desc`（鍵存在，不會觸發生成）確認沒有被 CURATED 蓋掉：32 張前台皆為 desc4 原文。
- **檢查層**：4 支 Sonnet 各 167–170 張 → keep 5、rewrite 672。四支都沒照「每 20 張寫檔」做（一次寫出），本次未受重啟影響，記錄備查。
- **主線抽查**（keep 全數 5 張＋rewrite 隨機 6 張）：
  - 維持 keep：Donna Summer《Love to Love You Baby》、김두수《자유혼》、Bo Diddley《Bo Diddley》——開頭講是什麼、有具體聲音、地位有具名出處，語氣平實。
  - **改判 rewrite**：坂本龍一《戦場のメリークリスマス》（中英數字間全無空格、無地位句、「低音刻意讓調準偏離」來源存疑）；
    Grandmaster Flash《The Message》（開頭是發行日期與錄音室雜項，地位放到最後；「1980 年地鐵罷工後寫成」待查）。
  - 抽查的 6 張 rewrite 判定理由都成立（軼事開頭、無聲音描述）。
- **結果**：keep 3、rewrite 674（殿堂 300／異端 85／流亡 289）→ 23 批（ad-01～ad-23；ad-13 異端 25、ad-23 流亡 19，其餘 30）。
  切法：tier 內依藝人在 seed 首次出現的順序分組，同藝人不拆批。
- **工具調整**：`desc-tools/qa-batch.mjs` 的 factBlob 接受 facts 的 `text` 欄（apex 研究格式），否則 out 階段事實比對全落空。
- **檔名**：研究檔用 `research/ad-XX-{a,b,c}.json`（不是 PLAN 寫的 `-research-`），因為 `qa-batch.mjs` 只認 `<batch>-<g>.json`。
