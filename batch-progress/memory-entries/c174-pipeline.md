### 2026-09-21｜dip-vinyl-shop｜c-174（日本爵士四大廠 jp-1 線第二批）五層管線走完，19 張

**改動摘要**：1969–1971 年段，**37 張收 19 退 18（51%）**，
身分 **19/19 pinned、零 §1 人工**、簡介 **19/19 全 full（214–236）**、
**封面 15/19、串流 17/19**（探測 11/19，人工回撈 8 張救回 6 張）。apex 0 張、例外欄全空。
⚠ **撞池 0/37**（c-173 同位置是 13/41）——c-173 收尾後重算池比對、剔除確定撞池的 35 筆，在這批生效了。

**主要檔案**：`batch-progress/c174/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c174-*.json`、
`batch-progress/jp1-slice-enrich.mjs`（新）、`batch-progress/probe/recover-unavailable.mjs`、
`desc-tools/fix-spacing.mjs`、`desc-tools/prompts/writer-base.md`、`desc-tools/jp-proper-names.json`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c174` 撞卡 0、
`qa-batch research/hooks c174` 全清、`chk-hook-crossgroup c174` 19 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、**首句與 hook 逐字相符 19/19**；
鉤子預算 **219–229**、desc **214–236**（兩項都是我自己重算複核的，腳本驗不到）。
`qa-batch out` 唯一的標記是誤報（UNSOURCED 咬到 hook 原文，出處在同一句就寫了），讀過原文放行。

**五條值得記住的**：
1. ⚠ ⚠ **研究層推翻策展層 42 處、a 組 12 張全中**。最重的是**整張碟的來歷寫錯**
   （福澤幸雄 身亡地點是靜岡袋井的山葉測試跑道，不是鈴鹿）與 **Count Buffalo 1969 三張順序寫反**。
   **策展層的 `why`／`risk` 是線索不是定稿，研究層一定要逐條回查。**
2. ⚠ **「再發版本數被低估」是系統性的**（本批 b 組 71%、c-176 a 組 75%），
   根因是策展層只數 `mbNote` 裡的 MB release。**一律以 Discogs master 的 `versions` 為準。**
3. **`0→0` 的第 8–12 種成因全部關於盤名**——既有七種有六種在講掛名，
   而本批六張救回**沒有一張是掛名問題**。**成因清單的偏斜本身就是一種盲區。**
4. ⚠ **`fix-spacing` 的保護清單漏了「本批自己的卡」**（只從 `seed_cards.json` 抓，而本批還沒進池），
   於是要把 `山下洋輔トリオとブラス12` 拆成 `ブラス 12`。**卡進池前每一批都會中**，已修。
5. **同構要在產生的那一層擋**：鉤子層初稿 14 條 4-gram 命中 3 張以上、13 條是句型同構，
   逐條改寫後 **c-173 寫作層長出來的那 5 條形狀在本批 0 命中**。

**`writer-base.md` 與 `qa-batch.mjs` 的兩處修改見 c-173 的備忘錄條目。**
