## 2026-09-05 — dip-vinyl-shop — c-93 走完雲端段（搖滾正典目錄深度 I，45 張）

- **改動摘要**：店主當天「**接力做完十批**」的第一批，也是這十批第一批走完全部五層的。
  **`lineType: 廣度`——不是挖冷門小廠牌，是把已經在池裡卻只有一兩張的正典藝人補到該有的深度**
  （藍圖 §五-1：每位先確認「第一張該有的」在不在，再談深度）。
  **45 張、22 位藝人**（a 後龐克與另類 20／b 前衛、車庫與 90s 25），年份 1966–2008。
  Elvis Costello and The Attractions 4＋單掛 1、Magma 4、Devo／Pere Ubu／The B-52's／
  Robert Wyatt／The Flaming Lips 各 3，Joy Division／This Heat／Gentle Giant／Spiritualized／
  Liz Phair／The Cranberries／Guns N' Roses 各 2，其餘七位各 1。
  **零 §1 人工身分、零跨批撞卡、45/45 釘住 release-group、合輯 0 張。**
  策展層實掃後**主動不收五位**（The Stooges 3、The Stone Roses 2、New York Dolls 2、
  Neutral Milk Hotel 2、Slint 2——目錄在池中已完整）。
- **主要檔案**：`batch-progress/c93/`（prop-{a,b}、caa.json、chk-prop.mjs、rulings.md、HANDOFF.md）、
  `desc-tools/batches/research/c93-{a,b}.json`、`hooks/c93-hooks-{a,b}.json`、
  `input/c93-writer-{1,2}.json`、`output/c93-out-{1,2}.json`、
  `batch-progress/memory-entries/c93-curation.md`、
  `batch-progress/probe/{match-lib,probe-previews}.mjs`（**本批推動的三處修正**）、
  `batch-progress/c53/rulings.md`（第 166／169 條與本批直接相關）。
- **驗證結果**：`qa-batch research c93` key 與卡單完全一致 ✓、全部通過 ✓；
  `qa-batch hooks c93` 全部通過；`chk-hook-crossgroup c93` 45 張全過
  （hook 加權 17–40.5、note 286–350）；`qa-batch out c93` out-1 20 張 217–235、
  out-2 25 張 177–239、thin 2 張全 ≤180、合計 45 張相符、`>260` 為 0、
  **未具名出處 0 盞**；`qa-check-research` 兩檔各 0 標記；`fix-spacing` 待補 0；
  `chk-prop.mjs a b` 45 張 22 位標記 0。
  **封面 45/45、試聽 45/45（命中 gb 42／us 3）——第一批雙滿版。**
- **這批的裁定與教訓**：
  1. **試聽從探測層的 38 補到 45，七張全靠人工覆核**，成因分別是：副標串進盤名
     （《Substance》→《Substance 1977-1980》）、`and` 對 `&`（Blood & Chocolate）、
     掛名別名（Spiritualized → MB 是 Spiritualized Electric Mainline）、Apple 首字母大寫
     （whitechocolatespaceegg）、撇號彎直兩形加 **search 端點漏碟**（Chinese Democracy）、
     Apple 把團名串進盤名（《The Sonics Boom》）、`- EP` 後綴（This Heat《Repeat》）。
     另換綁一張版本錯的（Suicide《A Way of Life》從 2023 年 35 週年版 13 軌換成 2005 remaster 9 軌）。
  2. **本批推動三處管線修正**：
     (a) **`queryAlias` 一直只被當掛名別名用**——卡單備了「Blood and Chocolate」，
     但 `termsFor` 每一種用法都是 `<alias> <c.album>`、`albumCands` 也沒算它。兩處都改，test-match 通過。
     (b) **第 166 條**（Apple search 漏碟，改打藝人頁 lookup）——本批七張裡五張靠它找到。
     (c) **第 169 條**：探測工作握著 `previews.json` 舊副本整檔覆寫，
     **把本批這五張人工修正靜默蓋掉過一次**（45/45 → 40/45，無任何錯誤訊息），
     是在寫交接重新統計時才發現的。腳本已改成合併寫入，五張已還原並複驗 45/45。
  3. **⚠ 六條上架前的行文限制**（正文已遵守，備查）：
     Gang of Four《Songs of the Free》的 MB 曲序其實是 1996 年版（**全篇不寫軌序位**）；
     The B-52's《Whammy!》的 GB 卡帶條目曲目重複列成 18 軌（**未引任何軌數**）；
     Pere Ubu《Song of the Bailing Man》的載體標記疑誤（**不寫載體**）；
     **Guns N' Roses《Chinese Democracy》的 Apple `trackCount` 欄寫 15、實際只回得出 14 個 song 列**
     （軌數一律 14）；This Heat《Repeat》的 Apple 條目只有一軌
     （**試聽採用但該 collectionId 不得當封面與後設資料來源**）；
     The Sonics《Boom》的 Apple 年份是再版年 1977、原盤 1966。
  4. **研究層擋下策展層 16 處無來源的說法，兩處與來源相反**：
     Magma《Ẁurdah Ïtah》**是三部曲的第二部不是第一部**；
     This Heat《Repeat》的三軌**沒有〈Health and Efficiency〉**。
     另擋下 Jane's Addiction 的「1991 解散、2001 重組後的第一張」與「唯一一張」、
     This Heat《Made Available》的「1996 年首次正式發行」（實為 1988 年 EP 的再發）。
     **一處查證成立且措辭有指定**：Gang of Four〈I Love a Man in a Uniform〉1982 年
     福克蘭戰爭期間**遭 BBC 禁播**——措辭必須是「BBC 禁播」不是「電台限播」。
  5. **hook 層攔下 18 處**。新形狀是**候選本身踩到下游的純字串檢查**（「0.0 分」觸發分數星等），
     另有八處算術、三處否定句起手、一處掛名錯（《Still》那句其實是 BBC Music 的樂評語，
     不是唱片公司說的）、一處誤述（Devo《Oh, No!》候選寫「刺殺雷根那個人」，維基是 **attempted**）。
  6. **寫作層落筆時再攔下 17 處**，三處是上游自己的自相矛盾：
     This Heat《Repeat》的 note 與 sound 都寫「末軌是**同名曲目**的 33 轉版本」，
     facts 寫的卻是〈Graphic/Varispeed〉的 33 轉版本（**note 會把末軌誤指成〈Repeat〉**）；
     Magma《Üdü Wüdü》的 sound 寫〈De futura〉「獨佔一面」而 researchNotes 自己註明查無來源；
     The Flaming Lips《Transmissions》的 sound 寫「十一軌都在三到六分鐘之間」卻同欄列出 2:19。
  7. **未具名出處 0 盞是這一輪的第一次**——前面幾批都要事後改寫措辭，
     這批兩組寫作層都在動筆時就避開了裸字串，榜位一律用具名形式。
  8. **交本機的線上資料問題**：**Jane's Addiction 與 Guns N' Roses 兩組掛名因撇號字元分裂**
     （規劃書記 Jane's Addiction 池中 1 張，**實際 3 張**）。
- **下一步**：本機端上傳（三軸與頂點資格、四處寫入與回讀、合併兩組撇號分裂、
  跑 `build-genre-tree.mjs --write`）。**封面與試聽都滿版，沒有掃圖工作。**
  **上架前逐張讀 `previews.json` 的 `note`**——45 張裡 8 張帶覆核說明或引用限制。
