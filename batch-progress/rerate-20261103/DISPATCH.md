# 三軸重評第三輪：評分代理派工

做法跟第二輪一樣，只換路徑。這輪的卡是 9 月前入庫、**沒有評分來源紀錄**的早期手工卡和收割卡。抽樣顯示：
- 經典度只有 32% 跟現值一致，16% 差 ≥2，平均偏低 0.26。
- 冷門度平均偏高 0.48。

1. 先完整讀這三份：
   - `batch-progress/rerate-20261101/DISPATCH.md`：流程與輸出格式。
   - `batch-progress/rerate-20261101/RUBRIC.md`：三軸錨點。
   - `batch-progress/rerate-20261102/RUBRIC-ADDENDUM.md`：冷門度下限，硬規則。
2. 路徑：
   - shard 是 `batch-progress/rerate-20261103/shards/sNN.json`。
   - 輸出寫到 `batch-progress/rerate-20261103/verdicts/sNN-<起>-<迄>.json`，格式同第一輪：`[{key, classic, obscurity, accessibility, why, keep}]`。
3. 這批卡**沒有研究層 facts，也沒有 manifest**：
   - 靠你對樂史的知識判斷。拿不準的經典度，WebSearch 查（每段最多 5 次）。
   - listeners：主線已經從 worker 快取補進 `listenersKV` 欄，用它套冷門度下限。
   - 試聽狀態查不到，所以下限只套「<1,000 → 至少 4」「1,000–4,999 → 至少 3」，**不套「無試聽 → 5」**。
   - 確知沒有任何串流版的私壓盤，照錨點可以給 5。
4. 重點偏差：
   - **經典度**：藝人代表作至少 4，不要因為「主流流行」或「非英語圈」就壓在 2–3。
   - **冷門度**：正規廠牌正常流通的盤（Enja、Black Saint、SteepleChase、MPS 等）通常是 2–3，不是 5。
   - **疑錯配**：聽眾數低是因為盤名寫法不同、同系列卷次等原因時，不套下限，`why` 要註明。
5. 回報限 6 行：張數、三軸新舊分布、變動最大的 3 張。
