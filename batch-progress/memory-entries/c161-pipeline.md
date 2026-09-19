### 2026-09-19｜dip-vinyl-shop｜c-161（Blue Note 2008–2010）五層管線走完，37 張

**改動摘要**：切片 45 張走完五層，**收 37 退 8**（a 19、b 18）。
身分 37/37 pinned、**簡介 37 張全 full 且字數 210–239（兩端都沒撞到）**、封面 30/37、
串流 33/37（4 張走固定無來源狀態）。本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c161-*.json`、
`batch-progress/c161/{prop-a,prop-b,slice,caa,rulings,rulings-mainline,rulings-mainline-research,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 標記 0、`qa-batch research/hooks/out c161` 全清、
`chk-hook-crossgroup c161` 37 張全過、`qa-check-research` 兩檔標記 0 且 **hook 原封開頭 37/37**、
`fix-spacing` 兩檔待補 0。

**四條值得記住的**：
1. **第四種「無串流」形狀：幽靈條目**——條目存在於 be／lu 目錄，但 0 首歌、無 `collectionPrice`。
   **封面可用、串流不可用。** 前三種形狀記在 c-160 交接。
2. **第 1725 條（自我更正）**——⚠ **我的寫作派工信把 hook 規則寫反了**：
   repo 要求「首句＝hook 原文一字不改」（`writer-base.md:158`，且 `qa-check-research` 有硬檢查），
   派工信卻寫「不是要你照抄成第一句」。**根因是派工信憑記憶複述 base 檔而非叫代理去讀它。**
   **往後派工信第一段一律指定讀 base 檔並聲明以它為準，只寫本批特有的事；自檢須含 `qa-check-research`。**
3. **第 1729 條（自我更正）**——**序數禁令只擋「廠牌目錄序數」（在 Blue Note 的第 N 張，需兩層逐字），
   不擋「間隔／身分敘述」（隔了十一年的第一張、掛自己單名的首張，facts 有 src 即可）。**
   ⚠ 而且**派工信不該用一刀切覆蓋鉤子層已經逐張判過、寫進 `note` 的裁定**——鉤子層看得到全部 facts，派工信看不到。
4. **第 1724 條（工具）**——`qa-batch.mjs` 的事實對照原本**只驗 `hook` 一個欄位**，
   `note` 與 `desc` 從未被回查過研究稿；是兩支鉤子代理各自寫臨時掃描才發現的。
   已接到三個欄位上並加**三級判定**（本卡有→過／同批別張有→印上下文供人眼判／全批都沒有→硬標記）。
   回歸 c-140～c-161 共 22 批約 800 張卡：硬標記 7 筆、互指 21 處全部正當。
