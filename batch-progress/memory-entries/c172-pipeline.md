### 2026-09-19｜dip-vinyl-shop｜c-172（尾批 3 張）五層管線走完；**藍調之音 1985 後線 c-148…c-172 全數收尾，839 張**

**改動摘要**：最後 3 張，三張各代表一種「列舉／查詢會漏掉」的失效形狀，**收 3 退 0、年份改判 0**：
《Spirit Talk》與《A prima vista》是**第 5 種**（`label-info` 掛成母公司 `Capitol Records`／`EMI Music France`，
廠牌軸列舉永遠碰不到）、《Parker's Mood》是**第 7 種**（MB 廠牌掛對了，是**列舉列 `year` 為 `null`**
被年份排序切片甩出去）。身分 **3/3 pinned、零 §1 人工**、簡介 **3/3 全 full（232／239／232）**、
**封面 2/3、串流 3/3**。本批 apex 0 張、例外欄全空。

**主要檔案**：`desc-tools/batches/{cards,research,hooks,input,output}/c172-*.json`、
`batch-progress/c172/{prop-a,slice,caa,apple-candidates,rulings,HANDOFF}`、
`batch-progress/memory-entries/c172-pipeline.md`、`batch-progress/label-lines.mjs`（登錄 c168–c172）。

**驗證結果**：`chk-prop` 標記 0、`dedup-crossbatch c172` 撞卡 0、`qa-batch research/hooks/out c172` 全清、
`chk-hook-crossgroup c172` 3 張全過（hook 加權 24–26／note 218–232）、`qa-check-research` 標記 0、
`fix-spacing` 待補 0、**首句與 hook 逐字相符 3/3**；鉤子預算 **223／228／229**（上限 230，我自己重算複核）；
八個刻意不寫的字串（`2005`／`美版`／`同步`／`經典錄音`／`4 月發行`／`smooth`／`曲風`／`最高`）全批實掃 0 命中。

**四條值得記住的**：
1. ⚠ ⚠ **`title:` 不是 MB release-group／release 搜尋索引上的欄位**——Lucene **不報錯、靜靜回 `count 0`**。
   我因此誤判《Spirit Talk》「MB 查無、要走 §1 人工」；改用 `releasegroup:` 回 `count 1`、`score 100`，當場釘住。
   **我先前提出的「第八種形狀＝MB 根本沒有這張」因此作廢。**
   **不可推廣成「改用 browse」**（browse 要先有藝人 MBID，取代不了搜尋），**也不同於 Apple `/search`**
   （那是市場覆蓋，這是查詢語法）。**主線待辦：`c-104` 以後所有判過「MB 查無」的裁定都要重掃。**
2. **本線唯一一次探測層零 unavailable、完全不需人工回撈。** 對照 c-166…c-170 探測層共標 31 張 unavailable，
   人工回撈證實 **20 張（65%）是誤判**——**人工回撈因此是常設步驟，不是例外處置。**
3. ⚠ **研究層 `note` 會夾帶違反 `writer-base.md` 的原文引句**：`Spirit Talk` 的 note 逐字引 Cash Box
   「**全片**有一種易於進入的空靈感」，而 base 明文禁用「全片」。**寫作層以 base 為準改寫成「它」。**
   規則層級確認：**`writer-base.md` > 研究層 note 的引文原字。**
4. **`hook` 完全沒有代稱時，base 那條「第二句替代稱具名」的解法涵蓋不到**（《Spirit Talk》的 hook 通篇未具名）。
   寫作層把第二句的職責一般化為「**補上 hook 沒有指明的那個位置**」。**建議補進 `writer-base.md`。**

**字數方向再次確認不可繼承**：本批寫作層初稿單向**高估** 8–13 字元、`sound` 一格未動用；
c-169 a 組卻是反向（5 張寫不夠長）。**每批都要兩端都量。**
