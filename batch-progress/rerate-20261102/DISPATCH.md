# 三軸重評第二輪：評分代理派工

做法與第一輪完全相同，只換路徑、多一條冷門度下限。

1. 先完整讀以下兩份：
   - `batch-progress/rerate-20261101/DISPATCH.md`（流程與輸出格式）
   - `batch-progress/rerate-20261101/RUBRIC.md`（三軸定義與錨點）
2. 再讀 `batch-progress/rerate-20261102/RUBRIC-ADDENDUM.md`（冷門度下限，**硬規則**）。
3. 路徑一律改用第二輪的：
   - shard：`batch-progress/rerate-20261102/shards/sNN.json`
   - 輸出：`batch-progress/rerate-20261102/verdicts/sNN-<起>-<迄>.json`
4. 試聽狀態查法：用卡的 `manifest` 欄位找到根目錄的 `onboarding-manifest-*.json`，對應專輯的 `preview.status`。
   ```
   node -e 'const [f,k]=process.argv.slice(1);const m=require("./"+f);const a=(m.albums||m.cards).find(x=>x.artist+"|"+x.album===k);console.log(a&&a.preview&&a.preview.status)' "<manifest>" "<key>"
   ```
   一段 50 張可以一次寫個小腳本批次查。
5. 這輪的卡來自 9–10 月各條線：c 系列類型擴充、csea 東南亞、dt downtempo、nj 新爵士、ts 細分類、shop 店主指定等。
   - 有不少 `manual:depth-rubric`／`regional-rubric` 的人工值，經典度偏 2–3。
   - 硬蕊度有 72% 被打成 2，**每張都要照聲音重判，不要沿用**。
   - 經典度照錨點判：**藝人代表作至少 4，不得以「沒有國際正典地位」為由給 3**。

回報同第一輪，限 6 行。
