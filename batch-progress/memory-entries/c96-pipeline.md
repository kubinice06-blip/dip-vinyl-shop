## 2026-09-05 — dip-vinyl-shop — c-96 走完雲端段（靈魂／放克／嘻哈目錄深度，45 張）

- **改動摘要**：店主「接力做完十批」的一批，`lineType: 廣度`。
  **45 張、27 位掛名**（a 嘻哈 20／b 靈魂與放克 25），年份 1959–2022。
  JAY-Z 4，Jill Scott／Dusty Springfield／Martha Reeves & the Vandellas 各 3，
  Raekwon／GZA／Bone Thugs／Lil' Kim／The Miracles／Labelle／Gil Scott-Heron／
  Jerry Butler／Boyz II Men 各 2。
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、合輯 0 張。**
  策展層實掃後判定三處「補不了是因為目錄已滿、不是查無」（Dr. Dre 127 個 RG 全列、
  Madvillain 只有 1 張、Lauryn Hill 除首作外全是 Live／Compilation）。
- **主要檔案**：`batch-progress/c96/`（prop-{a,b}、caa.json、chk-prop.mjs、**rulings.md 12 條**、HANDOFF.md）、
  `desc-tools/batches/research/c96-{a,b}.json`、`hooks/c96-hooks-{a,b}.json`、
  `input/c96-writer-{1,2}.json`、`output/c96-out-{1,2}.json`、
  `batch-progress/probe/probe-previews.mjs`（**第 166 條的兩道補救**）、
  `batch-progress/probe/{match-lib,test-match}.mjs`（**第 168 條的卷號記號**）。
- **驗證結果**：四項機器檢查全過——`qa-batch research/hooks/out c96`、`chk-hook-crossgroup c96`
  45 張（hook 加權 19.5–36.5、note 302–350）、`qa-check-research` 兩檔各 0 標記、
  `fix-spacing` 待補 0、`chk-prop.mjs` 45 張 27 位標記 0。
  out-1 20 張 221–235、out-2 25 張 177–235、thin 1 張 ≤180、**未具名出處 0 盞**。
  **封面 45/45、試聽 40/45（us 38／gb 2）。**
- **這批的裁定與教訓**：
  1. **這批是第 166 條的發源地。** 策展層回報「Apple `search` 十筆有九筆只回 cleaned」，
     主線實測複驗**比回報的還糟**：N.W.A《Straight Outta Compton》search 只有 cleaned；
     JAY-Z 三張 Blueprint 全是 cleaned；**GZA《Liquid Swords》根本查不到，回的是
     《Legend of the Liquid Sword》這張別的碟**；B.I.G.《Life After Death》前幾筆全是別的藝人。
     **這就是 `audits/cleaned-previews-hiphop.md` 那 273 張的成因。**
     加的兩道藝人頁補救讓**本批 40 張 ready 裡有 12 張是它換來的**
     （6 張本來會拿到淨化版、6 張本來會判查無）；同日的 c-93 只救回 1 張，
     **證實這個病是嘻哈盤特有的**。**那 273 張可以回頭重跑了。**
  2. **這批也是第 168 條的發源地。** Raekwon《Only Built 4 Cuban Linx... Pt. II》
     被配到 **1995 年的第一集**——三道防線全沒攔住：兩邊都含數字「4」讓「數字殘餘」失效、
     **卷號寫成羅馬數字時 `\d` 看不到它**、摺疊後只差 `ptii` 四個字元、yearDrift 14 只標記不擋。
     `match-lib` 加 `volToken()`，**`titleOk` 與 `looseTitleOk` 兩道都要加**
     （探測層是 A||B，漏一道等於沒加），test-match 28/28。
     改綁 us 716639724，**前 22 軌與 MB 原盤逐項相同、末兩軌是 iTunes bonus，軌數以 22 為準**。
  3. **裁定：Bone Thugs《The Art of War》在 Apple 上被拆成 World War 1／2 兩張**
     （13＋15 軌，等於 MB CD 版兩片）。**試聽取 WW1，該 collectionId 不得作為軌數、曲目或封面來源**；
     另一半 1170658006 記在 note 裡備用。與同日 This Heat《Repeat》同一形狀。
  4. **裁定：Jerry Butler《Jerry Butler, Esq.》的「離團後首張個人專輯」不採用**
     （MB 記 1959-11、維基記他 1960 年才離團；那是時序推論、無直述來源）。年份取 MB 的 1959。
     **通則**：策展層 `why` 裡的「離團後」「重組後」「解散前」要當成待查證的主張——
     這一輪已攔到六次（本條、c-93 的 Jane's Addiction、c-96 a 的 Born Again、c-95 a 的六處）。
  5. **研究層兩組合計擋下 22 處無來源或有誤的說法**，其中**十處是數字錯**
     （Jill Scott 兩處榜位、Masterjam 榜位、Boyz II Men 兩張序數、Iron Flag 銷量、
     Tha Last Meal 榜位、La Bella Mafia 單曲名次、〈For Your Precious Love〉的作者），
     **一處與當事人說法相反**（《Small Talk》不是在夜店當著聽眾錄的，
     Scott-Heron 本人說是錄音室加折疊椅——正文已兩說並陳）。
  6. **三筆旗標修正**：No Man's Land 的 yearDrift 5 是假警報（Apple 日期欄錯，年份寫 1995）；
     Tha Last Meal 的 Apple `trackCount` 欄寫 20、實際 19；
     On the Strength Apple 10 軌／MB 11 軌（缺的是重發略去的 bonus，**寫軌數必須指明版本**）。
  7. **15 張的掛名與 MB artist-credit 不一致**（U+2010／U+2019 異體、and 對 &、
     LaBelle 對 Labelle、「Rufus & Chaka」無 Khan、Apple 的 JAŸ-Z），
     **全部是同一組人的不同寫法，正文一律照卡片的寫法、未拆成兩組人**。
  8. **交本機**：池中一組重複建檔——`Mos Def & Talib Kweli — Black Star` 與
     `Black Star — Mos Def & Talib Kweli Are Black Star` **是同一張 1998 年首作**，
     掛名與盤名互換，字串去重看不見。
- **下一步**：本機端上傳（三軸與頂點資格、四處寫入與回讀、合併 Black Star 那組重複建檔、
  跑 `build-genre-tree.mjs --write`）。**封面滿版，沒有掃圖工作。**
  **上架前逐張讀 `previews.json` 的 `note`**——40 張 ready 裡 15 張帶換綁說明、軌數限制或旗標修正。
