# dip vinyl shop — Claude 工作規則

## 開工前協作交接檢查（必做）

1. 執行 `git fetch origin`。
2. 執行 `git status --short`，確認本機新增、修改、刪除與未追蹤檔案。
3. 執行 `git log --oneline HEAD..origin/main` 與 `git diff --name-status HEAD..origin/main`，確認 Codex／其他協作者的新提交及 A／M／D／R 檔案。
4. 若工作區乾淨且遠端領先，以 `git pull --ff-only origin main` 同步，再重新讀取 `PROJECT_MEMORY.md` 與被更新的規則檔。
5. 若有未提交內容、分支分歧或重疊變更，先讀取差異並保留對方工作，不得直接覆寫。

開始工作時先在對話中簡短說明是否發現新增／修改／刪除項目。正式提交前再執行一次 `git fetch origin`，確認工作期間沒有新提交。

## 專案備忘錄（必讀、必更新）

開始任何工作前，先完整讀取同層的 `PROJECT_MEMORY.md`。

只要本次工作有修改任何檔案，就必須在結束前，於
`PROJECT_MEMORY.md` 的「逐次改動記錄」最上方追加一筆，包含日期、repo、
改動摘要、主要檔案與驗證結果。這是完成條件；純讀取或分析不需新增紀錄。

## 新增專輯固定公式（必做）

任何新增專輯、上架卡片、補卡池或匯入廠牌／藝人目錄的工作，都必須使用
`dip-card-pool-expand` 並完整遵守 `ALBUM_ONBOARDING.md`。封面、三軸、頂點資格
判定、固定簡介、固定試聽／無來源狀態與 published gate 缺一不可；不得先上線
`seed_cards.json` 再補其他資料。

## 風險操作：先在對話中提示，等用戶說「可以」再執行

執行以下操作前，**必須先在對話中用中文說明要做什麼、有什麼風險，等用戶明確說「可以」後才執行**。不顯示系統權限對話框，直接在聊天裡確認。

需要確認的操作：
- `git reset` / `git revert` — 說明影響範圍
- `winget install` — 說明要安裝什麼軟體

不需要確認（直接執行）：
- `git commit` / `git push` — 改完直接推 main，commit 後在對話中說明推了什麼即可
- `gh pr create` — 低風險，開 PR 不影響 main
- 所有讀取操作（git status、log、diff 等）

## 工作流程
- 單人專案，改完直接 commit 到 main 並 push，**不開 PR、不用 worktree**
- commit + push 不用事先問，做完簡述內容即可
