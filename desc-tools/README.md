# desc-tools — 雲端工作階段用的簡介產線工具

本機的簡介產線在 `C:\Users\User\dip-vinyl-home\desc-restyle`（**不在版控內**）。
雲端工作階段看不到那個資料夾，所以把**雲端段會用到的**派工範本與 QA 腳本複製一份放這裡。

## 目錄約定（很重要）

腳本用的是相對路徑（`batches/...`），所以**雲端工作階段的 cwd 必須是 `desc-tools/`**，
產物會落在 `desc-tools/batches/`，layout 與本機 `desc-restyle/batches/` 完全一致：

```
desc-tools/batches/
  cards/<批名>-cards.json
  research/<批名>-research-{a..e}.json
  hooks/<批名>-hooks-{1,2}.json
  input/<批名>-writer-{1,2}.json
  output/<批名>-out-{1,2}.json
```

本機接手時把 `desc-tools/batches/` 底下的檔案複製進 `desc-restyle/batches/` 對應位置，
之後照 `dip-desc-restyle` skill 的第 5–7 步走（機器 QA 重跑、逐張審稿、build-final、KV）。

## 這裡有什麼、沒有什麼

**有**（雲端段需要）：`prompts/` 三份 base 派工範本、`qa-batch.mjs`、`chk-hook-crossgroup.mjs`、
`merge-writer-input.mjs`、`qa-check-research.mjs`、`fix-spacing.mjs`。

**沒有**（本機專用，不要在雲端跑）：`build-final.mjs`、`verify-kv.mjs`、`prior-context.mjs`
與各種 KV／Firestore 腳本——它們需要 CLOUDFLARE_API_TOKEN 或線上資料。

`fix-spacing.mjs` 會讀卡池建保護清單，路徑本機與雲端各試一次（雲端解到 repo 根的
`seed_cards.json`／`apex_pool.json`）；讀不到只是保護清單較短，不會出錯。

## 同步

這份是複本。**本機改了 `desc-restyle/` 的 base 範本或這五支腳本，要記得同步過來**，
否則雲端用的是舊規則。反之亦然。
