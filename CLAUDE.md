# dip vinyl shop — Claude 工作規則

## 風險操作：先在對話中提示，等用戶說「可以」再執行

執行以下操作前，**必須先在對話中用中文說明要做什麼、有什麼風險，等用戶明確說「可以」後才執行**。不顯示系統權限對話框，直接在聊天裡確認。

需要確認的操作：
- `git commit` — 說明 commit 了哪些檔案、commit message 是什麼
- `git push` — 說明推到哪個 branch
- `git reset` / `git revert` — 說明影響範圍
- `winget install` — 說明要安裝什麼軟體

不需要確認（直接執行）：
- `gh pr create` — 低風險，開 PR 不影響 main
- 所有讀取操作（git status、log、diff 等）

## 工作流程
- 單人專案，改完直接 commit 到 main 並 push，**不開 PR、不用 worktree**
- commit + push 前在對話中說明內容，用戶說「可以」後執行
