### 2026-09-27｜dip-vinyl-shop｜c-189（日本爵士獨立廠牌線 jp-2 第七批）五層管線走完，20 張

**改動摘要**：1983–1985 年段，**37 張收 20 退 17（54%）**；身分 **20/20 pinned、零 §1 人工**、簡介 **20/20 全 full（213–240）**、
**封面 18/20、串流 13/20**。apex 0、例外欄全空。與 c-188／c-190 跨批並行。

**主要檔案**：`batch-progress/c189/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c189-*.json`、`batch-progress/probe/probe-previews.mjs`、`audits/preview-downgrades.md`。

**驗證結果**：`chk-prop` 0、全池 `dedup-crossbatch` 四道 0、三階段 `qa-batch` 全過、`chk-hook-crossgroup` 全過、
`qa-check-research` 兩組 0、`fix-spacing` 兩檔 0；**鉤子預算 219–230 與 desc 213–240 都是我自己重算的**；
跨組＋c-188 的 4-gram ≥3 張只剩專名與樂器名；**首句照抄 hook 20/20。**

**五條值得記住的**：
1. ⚠ ⚠ **探測層的「藝人名＝我們的盤名」誤命中**（`New York Times`）：盤名是核心題所以 alias 那幾道放行、掛名靠 `queryAlias` 裡的盤名過——**加了擋板，回測又抓到兩筆舊的（c-185《Kyo》、c-188《Pyramid》）。**
2. ⚠ ⚠ **古巴／拉丁曲目的甲乙判準立了**：本盤年份之前有具名爵士錄音的算甲，與巴西曲目兩堆同邏輯（第 1992-B 條）。
3. ⚠ **跨批並行時，鉤子層主動把「另一批那張更自然」的切角讓出**（Stan Vincent、真梨邑ケイ 生平、NANIWA 團史）——事後比對另一批的鉤子稿，讓出的四格它都寫了，**兩批都寫就是已上架的兩張卡並排同形**。
4. ⚠ **`jp-1` 已退的 RG 會被 `jp-2` 切進來**（《Lupin III》）——新增 `mark-prior-rulings.mjs`，只標不剔。
5. ⚠ **寫作層把另一組的 hook＋note 當作它未來的正文先掃**，把會撞的四條改在自己這一邊——**先交件的那一組看不到對方的稿，這是唯一的預防法。**
