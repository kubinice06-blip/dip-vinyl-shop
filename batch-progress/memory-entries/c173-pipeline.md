### 2026-09-21｜dip-vinyl-shop｜c-173（日本爵士四大廠 jp-1 線**第一批**）五層管線走完，11 張

**改動摘要**：店主 2026-09-21「Jp1 先開 切批次 先做 10 批」→ 開 jp-1 線
（Victor／JVC、東芝 EMI／Express、日本コロムビア／Better Days／Takt、King／Paddle Wheel），
切成 **c-173…c-182 共 408 張**（本土爵士盤、1989 年前；外國藝人日本壓片 412 張、1990 後 424 張、
無年份 6 張延後）。本批 1958–1969 年段 **41 張收 11 退 30（27%）**，
身分 **11/11 pinned、零 §1 人工**、簡介 **11/11 全 full（217–236）**、
**封面 9/11、串流 6/11**（回撈前 4/11）。apex 0 張、例外欄全空。

**主要檔案**：`batch-progress/CURATION-BRIEF-jp1.md`（新）、
`batch-progress/jp1-pool-recheck.mjs`／`jp1-slice-enrich.mjs`（新）、
`batch-progress/c173/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c173-*.json`、
`desc-tools/jp-proper-names.json`（新）、`desc-tools/prompts/writer-base.md`、
`desc-tools/qa-batch.mjs`、`batch-progress/probe/recover-unavailable.mjs`、`batch-progress/label-lines.mjs`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c173` 撞卡 0、
`qa-batch research/hooks/out c173` 全清、`chk-hook-crossgroup c173` 11 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0、**首句與 hook 逐字相符 11/11**；
鉤子預算 **214–229**、desc **217–236**（兩項都是我自己重算複核的，腳本驗不到）。

**五條值得記住的**：
1. ⚠ ⚠ **列舉檔的 `inPool` 整欄作廢，41/41 假陰性。根因是時序不是演算法**——
   比對日 2026-09-15，而 c-131…c-134 那四批日本爵士是之後才落地的，年段完全重疊。
   **凡是隔了一段時間才用的列舉檔，池比對一律要重算。**
2. ⚠ **MB 的 RG tag 沒有票數門檻**，`jazz(1)` 與 `easy listening(1)` 並列時列舉腳本只看前者，
   非爵士率 31%。**`why` 欄一律只當線索。**
3. ⚠ ⚠ **我兩次假設 MB 的查詢欄位會做我以為的比對，兩次都錯**：
   上次是 `title:` 根本不是欄位（第 1844-B 條），這次是 **`artist:` 不比對 alias**
   （`artist:"Mina Aoe"`／`artist:"Takehiro Honda"` 實測皆 count 0），
   而且會回別的實體（`artist:"Sadao Watanabe"` 回 `Sadao Watanabe Quintet`）。
   **MB 的查詢欄位語義一律先實測再用。**
4. ⚠ **`qa-batch` 的簡體掃描誤報日文新字體**（`稲葉国光` 的 `国`、`東京厚生年金会館` 的 `会`），
   研究層原本是**改寫正文去規避**——**那等於讓檢查扭曲了內容**。
   不動 `SIMP` 字表，改用 `jp-proper-names.json` 逐字串白名單。
5. **`0→0` 的第 7 種成因**：店面把**盤名的片假名轉寫**當成掛名，樂團名在整筆資料裡完全消失
   （`The Original Big Four` 的 `artistName` 逐字是 `オリジナル・ビッグ・フォア`）。
   `recover-unavailable.mjs` 因此補了「盤名直查」第三條路。

**`writer-base.md` 改了一處**：「樂評姓名不進正文」**禁的是評價、不是掛名**——
監修欄／內頁署名／封套解說屬唱片本身的製作分工。
日本 1950–60 年代唱片的內頁與監修欄本來就由樂評擔任（本批 11 張中 4 張）。
