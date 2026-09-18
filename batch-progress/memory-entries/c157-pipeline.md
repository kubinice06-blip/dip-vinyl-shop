### 2026-09-18｜dip-vinyl-shop｜c-157（Blue Note 2000–2002）五層管線走完，40 張

**改動摘要**：切片 45 張走完策展／探測／研究／鉤子／寫作五層，**收 40 退 5（退貨率 11.1%）**。
身分 40/40 pinned、簡介 40/40 全 full（204–239 字）、封面 28/40（替代來源 12/12 查實）、
串流 37/40（3 張走固定無來源狀態）。本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c157-*.json`、
`batch-progress/c157/{prop-a,prop-b,slice,caa,apple-candidates,rulings,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 四道全過、`qa-batch research/hooks/out c157` 全清
（`out` 僅 1 筆誤報：把「曲名排起來像一份點名單」這個比喻掃成不具名出處）、
`chk-hook-crossgroup c157` 40 張跨組全過、`fix-spacing` 兩檔各跑一次待補 0。

**三條值得記住的**：
1. **第 1499／1503 條**——**裁定只清 `note` 是不夠的**：研究稿的 `sound`／`keyTracks`／`hookCandidates`
   三欄沒有人負責清，兩組合計殘留八處。**其中兩處是「全批只准 1 張當主軸」的反同構條款被 `sound` 欄繞過去，
   而那條線在 `facts` 裡有 src，下游沒有理由懷疑它。** 主線已逐筆改檔。
   **建議本機加一道「rulings 的『不得寫』字串 × 研究稿四個文字欄位」對撞檢查。**
2. **第 1504-B 條**——**字數的偏差方向不可繼承**：writer-1 初稿 9/18 撞破 240，
   主線據此叫 writer-2 上浮 +40～+80，結果 writer-2 反而五張掉到 180 以下。
   **可繼承的只有「同時對照兩端」。** 可靠的形狀是「單張卡要點名五、六個拉丁專名」低估最嚴重。
3. **第 1494／1496 條**——**派工詞有四類系統性錯誤，本批寫錯 11 處**，代理全部接住。
   最大宗是「指定的軸在 `facts` 裡沒有 src」，而其中五條是**研究層查到了卻放進 `notes`**——
   **純粹的格式損失，`qa-batch research` 不會亮燈。**
