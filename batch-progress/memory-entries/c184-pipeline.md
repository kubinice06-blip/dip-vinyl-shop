### 2026-09-25｜dip-vinyl-shop｜c-184（日本爵士獨立廠牌線 jp-2 第二批）五層管線走完，24 張

**改動摘要**：1972–1976 年段，**38 張收 24 退 14（63%）**，
身分 **24/24 pinned、零 §1 人工**、簡介 **24/24 全 full（208–239）**、
**封面 18/24、串流 15/24**。apex 0 張、例外欄全空。
⚠ **九張無來源逐筆裁定過、救回 0 張**（28 筆候選全部不是本盤）。

**主要檔案**：`batch-progress/c184/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c184-*.json`、
`batch-progress/{chk-dispatch,new-rulings,jp1-pool-refresh}.mjs`、`batch-progress/probe/manual-recover.mjs`、
`desc-tools/prompts/{writer-base,hook-base}.md`、`batch-progress/CURATION-BRIEF-jp2.md`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch` 四道 0、三階段 `qa-batch` 全過、
`chk-hook-crossgroup` 24 張全過、`qa-check-research` 兩組 0、`fix-spacing` 兩檔 0；
**鉤子預算 223–230 與 desc 208–239 都是我自己逐筆重算的**；
跨兩組 24 張的 4-gram（漢字＋片假名）我自己重掃，**≥3 張只剩一條純專名、0 條句型同構**；
**首句照抄 hook 24/24。**

**六條值得記住的**：
1. ⚠ ⚠ ⚠ **十七組人名的漢字是錯的，機制單一**：**從 Discogs 羅馬字逆推漢字選錯同音字**
   ——**研究層兩組合計推翻 37 處，其中 17 組是人名（28 處卡單 ＋ 32 處 prop 已由主線改掉）**；
   **兩組獨立查到同一個人的兩種錯字**（`森崎雄幸`／`森崎由紀夫`，都是 `守崎幸夫`）。
   **硬規則因此立下：`why` 欄每個漢字人名都要能指到一個來源欄位，指不到就寫羅馬字。**
2. ⚠ ⚠ ⚠ **`live: false` 的反向漏標是 16%**（c-184 a 三張）：**三個機器欄位全部沉默，
   而盤面 notes 逐字寫著 `Recorded live`**——**slice 的 `live` 直接抄 MB 的 `secondary-types`，那一欄兩個方向都會漏。**
3. ⚠ ⚠ **我自己的 `begin-area` 修法錯了兩處**（主線第 1959-B 條）：用地名白名單判日本
   （**70 張裡約 66 張是日本市町村被誤判**）、把「標記待人工判」做成「判退」。
   **`domestic` 是粗篩，身分判在策展層的第 4106 條四項。**
4. ⚠ ⚠ ⚠ **c-185 的 b 組 30 條裁定被並行的 a 組整份蓋掉，靠代理自己的草稿救回**（主線第 1970-B 條）
   ——**兩支代理各自跑 `git show HEAD:` ＋ `ls`，兩者都回「不存在」，於是各自建檔。**
   **改法：派工前由主線先建 rulings 骨架（`new-rulings.mjs`），`chk-dispatch` 第六道擋沒建好的批。**
5. ⚠ **派工信在這一天出錯四次（第十五到十八次），三種都被腳本擋下來了**：
   `chk-dispatch.mjs` 現在有七道（自己的檔 vs 對方的、殘留舊批號、組別、條號區間、
   **張數與 hook 舉例**、**rulings 骨架**、**本組廠牌張數回比 slice**）。
6. ⚠ **同構的最大一族是「日期樣板」**：**鉤子層第一輪 17 條裡 11 條出在它**，
   **而寫作層把「日期前面那一個漢字」也配死之後，初稿第一輪 0 條**
   ——**`han()` 剝掉標點，句號在掃描器眼裡不存在。**
