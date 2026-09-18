### 2026-09-18｜dip-vinyl-shop｜c-156（Blue Note 1998–2000）五層管線走完，42 張

**改動摘要**：切片 45 張走完策展／探測／研究／鉤子／寫作五層，**收 42 退 3（退貨率 6.7%，本線最低）**。
身分 42/42 pinned、簡介 42/42 全 full（208–238 字，兩端都沒撞到）、封面 38/42（替代來源 4/4 查實）、
串流 39/42（3 張走固定無來源狀態）。本批 apex 0 張、無合輯、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c156-*.json`、
`batch-progress/c156/{prop-a,prop-b,slice,caa,apple-candidates,rulings,HANDOFF}`、
`batch-progress/probe/previews.json`。

**驗證結果**：`chk-prop` 四道全過、`qa-batch research/hooks/out c156` 全清、
`chk-hook-crossgroup c156` 兩組零撞頭、`fix-spacing` 兩檔各跑一次待補 0、
`dedup-crossbatch` 122 批 4,931 卡跨批撞卡 0。

**三條值得記住的**：
1. **第 1433 條**——《Live in Chicago - Out Takes》探測到的 id 是同批正盤的 id，
   **兩張卡共用一個 `collectionId` 而探測層兩張都判 ready**。第 1067＋646 兩條同時觸犯。
   **建議本機加一道「`collectionId` 全卡池唯一」檢查。**
2. **第 1434 條**——**策展層的編制表寫於研究層之前，研究層補正後沒有回頭改**，
   主線派工時把過期的表當現值抄。與第 1429 條同形狀、方向相反。
   **→ 派工詞引用策展層編制表前先對照該卡 `note`／`facts` 現值。**
3. **第 1437 條**——**手算字數在這一段單向低估 30–60 字元**（兩組初稿共 32／42 超過 240、
   無一張掉下限）。**建議 writer-base 上浮幅度表補一列「2000 年前後爵士、拉丁專名密集者 +30～+60」。**
