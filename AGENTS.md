# 長期協作規則

## 開工前協作交接檢查（必做）

1. 執行 `git fetch origin`。
2. 執行 `git status --short`，確認本機新增、修改、刪除與未追蹤檔案。
3. 執行 `git log --oneline HEAD..origin/main` 與 `git diff --name-status HEAD..origin/main`，確認 Claude／其他協作者的新提交及 A／M／D／R 檔案。
4. 若工作區乾淨且遠端領先，以 `git pull --ff-only origin main` 同步，再重新讀取 `PROJECT_MEMORY.md` 與被更新的規則檔。
5. 若有未提交內容、分支分歧或重疊變更，先讀取差異並保留對方工作，不得直接覆寫。

開始工作時先回報是否發現新增／修改／刪除項目。正式提交前再執行一次 `git fetch origin`，確認工作期間沒有新提交。

開始任何工作前，先完整讀取 `PROJECT_MEMORY.md`。

只要本次工作有修改任何檔案，就必須在結束前，於 `PROJECT_MEMORY.md` 的
「逐次改動記錄」最上方追加一筆，至少包含日期、repo、改動摘要、主要檔案與驗證結果。
純讀取、分析或回答問題不需新增紀錄。

完成使用者要求的程式或內容修改後：

1. 執行與修改風險相稱的驗證。
2. 僅暫存和提交該需求直接相關的檔案；不得將既有或無關的工作區變更納入提交。
3. 建立清楚的 commit，並直接推送至 `origin/main`。
4. 回報驗證結果、commit hash 與推送結果。
