<!-- 雲端依 REMOTE_RUNBOOK 不動 PROJECT_MEMORY.md（第 68 行）。
     這是 c-62 策展代理寫好的條目，內容保留在此，由本機貼進 PROJECT_MEMORY.md 最上方。
     貼的時候依 CLAUDE.md：不要整檔提交，用 git show HEAD:PROJECT_MEMORY.md 為底只插這一筆。 -->

### 2026-09-02｜dip-vinyl-shop｜c-62 希臘 a 組策展提案：38 張候選＋開批抽驗（`batch-progress/c62/`）

排程表上排了很久、一路被深掘線插隊的「廣度：希臘 rebetiko 與 έντεχνο」。
只做策展層與抽驗，未動卡池、未跑上架流程。

**產出**：`batch-progress/c62/FEASIBILITY.md`（12 張抽驗）與 `batch-progress/c62/prop-a.json`
（38 張、30 個掛名）。`node batch-progress/c62/chk-prop.mjs a` 標記 0。

**抽驗結論**：MB 藝人實體希臘文 11/12、羅馬轉寫 0/10（僅本來就掛拉丁名的兩團命中），
掛名一律用希臘文原文成立；Apple 反過來要用羅馬轉寫查（8/12 vs 4/12），
且 17 個命中全部落在 `gr` storefront，`de`／`us`／`gb`／`cy`／`au` 皆零。
38 張候選實測 CAA 31/38（82%）、Apple 17/38（45%）、探測錯誤 0。

**池中不是 3 張是 5 張，且全部掛羅馬轉寫**（Arvanitaki、Alexiou、Theodorakis、
Hadjidakis、Yannatou），全池 13,418 列裡希臘文字元列數為 **0**；Vangelis 另有 7 張
（電子／配樂線，已超上限，本批不碰）。

**裁定第 49 條在候選階段抓到三張跨文字系統撞卡**（全部已剔除）：
Θεοδωράκης《Άξιον Εστί》＝池中 `Mikis Theodorakis`《Axion Esti》、
Χατζιδάκις《Το χαμόγελο της Τζοκόντας》＝池中《Gioconda's Smile》（盤名還跨語言）、
Μάνος Λοΐζος《Τα τραγούδια της Χαρούλας》＝池中 `Haris Alexiou`《Ta tragoudia tis Haroulas》
（**MB 掛作曲者、卡池掛演唱者，連掛名指的都不是同一個人**）。

**合輯只佔 21%（8/38）**，低於開批預期——MB 對希臘 1960–70 年代國內 LP 建檔完整，
Μπέλλου、Μητσάκης、Τσιτσάνης 都有正規原盤可收；真正只能靠合輯的是 1930 年代就停錄的
Εσκενάζυ、Αμπατζή、Παπαγκίκα、Νταλγκάς，四張全部來自 Rounder／Mississippi／
Alma Criolla／Heritage 等考古廠牌，另收三張 Various Artists 正典入口合輯。

**《Επιτάφιος》本批不收**：1960 年有兩份互相競爭的錄音（Θεοδωράκης／Μπιθικώτσης 版與
Μαίρη Λίντα／Μανώλης Χιώτης 版），MB 的 release-group 記 1964、Apple 把它掛在後者名下，
釘哪一個都有一半機率指錯，改收《Ρωμιοσύνη》與《Μαουτχάουζεν / Έξι τραγούδια》。

**待主線裁定**：卡池的希臘掛名要不要與既有 5 張的羅馬轉寫統一（收下去會產生
`Mikis Theodorakis`／`Μίκης Θεοδωράκης` 兩個鍵，與 `audits/pool-artist-name-splits.md`
記的 Keiji Haino 缺陷同形）。


