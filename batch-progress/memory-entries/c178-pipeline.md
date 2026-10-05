### 2026-09-22｜dip-vinyl-shop｜c-178（日本爵士四大廠 jp-1 線第六批）五層管線走完，29 張

**改動摘要**：1979–1981 年段，**37 張收 29 退 8（78%）**，
身分 **29/29 pinned、零 §1 人工**、簡介 **29/29 全 full（204–238）**、
**封面 23/29、串流 25/29**。apex 0 張、例外欄全空。

**主要檔案**：`batch-progress/c178/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c178-*.json`、
`batch-progress/probe/{probe-previews.mjs,recover-unavailable.mjs,previews.json}`、
`batch-progress/c163/rulings-mainline.md`（第 1932-B 至 1936-B 條）。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c178` 撞卡 0、
`qa-batch research/hooks/out c178` 三階段全過、`chk-hook-crossgroup c178` 29 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0；
**鉤子預算 216–230 與 desc 204–238 都是我自己逐筆重算複核的**；
跨兩組 29 張的 4-gram 我自己重掃，**≥3 張的 8 條全是專名、0 條句型同構**。

**五條值得記住的**：
1. ⚠ ⚠ **第 1900-B 條那個「修好探測層」的修正自己開了一個新洞**（第 1935-B 條）：
   把 `queryAlias` 切段後逐段比對救回一大批，**但每一段同時倒進了盤名桶與掛名桶**，
   於是盤名的別名可以頂掉掛名那一關。**重跑 c-177…c-180 的 24 鍵：移除誤配 8 筆、配到正解 4 筆、人工判退 1 筆。**
   **→ 一個放寬的修正，要連它放寬了什麼一起想。**
2. ⚠ ⚠ **我重跑前把 24 個鍵整批刪掉，其中兩個是人工回撈層一筆一筆查證後寫回去的**
   （`坂田明《Pochi》`、`Wha-ha-ha《Live-Dub》`）——**機器重跑必然再判一次 unavailable，因為它們本來就是機器判錯的。**
   幸好有備份。**從此 `recoveredBy` 非空的鍵任何重跑都不准刪，備份要在刪之前做。**
3. ⚠ **代理報的成因可能是錯的，但報的現象是對的**：回撈層說誤配是 `looseArtistOk` 太鬆，
   逐字驗過是 false。**照它說的成因去改會「看起來修好了、其實什麼都沒變」。**
4. ⚠ **我的派工信在本批又錯一次（第十次）**：寫作層的「倒量參考」用 sed 從上一批模板改，
   **`c177-out-*.json` 被整批換成 `c178-out-*.json`**——那兩個檔開工時還不存在。
   兩位寫作代理各自獨立抓到並照 `writer-base.md`「任何係數都不要繼承」處理，一個數字都沒拿來當目標。
   **這一欄與鉤子層的張數欄是同一個病：模板裡的數字要嘛由腳本產生，要嘛不要放。**
5. ⚠ **「第二句不得複述 hook」沒有任何腳本在看**（`qa-check-research` 只驗首句照抄）——
   本批兩位寫作代理各自靠人工回頭讀頭兩句才抓到三張。
