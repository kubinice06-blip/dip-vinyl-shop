### 2026-09-25｜dip-vinyl-shop｜c-183（**日本爵士獨立廠牌線 jp-2 第一批**）五層管線走完，13 張

**改動摘要**：1961–1972 年段，**37 張收 13 退 24（35%，本線最低）**，
身分 **13/13 pinned、零 §1 人工**、簡介 **13/13 全 full（218–239）**、
**封面 9/13、串流 8/13**。apex 0 張、例外欄全空。
⚠ **收件率低的主因是年段**（1961–1972 是「用爵士編制翻奏現成曲目」的企劃盤高峰），
**不是新判準**——第 5701 條那條可數判準只佔 4 退 2 收，c-184 的收件率回到 63%。

**主要檔案**：`batch-progress/c183/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c183-*.json`、
`batch-progress/CURATION-BRIEF-jp2.md`、`batch-progress/{jp1-pool-refresh,chk-dispatch,jp2-fix-domestic}.mjs`、
`batch-progress/enum/known-pool-collisions.json`、
`audits/{foreign-artist-japan-productions,between-the-lines-candidates}.md`、
`desc-tools/prompts/{writer-base,hook-base}.md`。

**驗證結果**：`chk-prop` 兩組標記 0、`dedup-crossbatch c183` 四道 0、
`qa-batch research/hooks/out c183` 三階段全過、`chk-hook-crossgroup c183` 13 張全過、
`qa-check-research` 兩組標記 0、`fix-spacing` 兩檔待補 0；
**鉤子預算 216–229 與 desc 218–239 都是我自己逐筆重算複核的**；
跨兩組 13 張的 4-gram（**漢字＋片假名**）我自己重掃，**≥3 張只剩兩條專名、0 條句型同構**；
**首句照抄 hook 13/13。**

**五條值得記住的**：
1. ⚠ ⚠ **「官方 ≠ 原盤」的第四個實例，而且不必比對資料庫就能定案**（第 1957-B 條）：
   `飯吉馨《Soul Tripper》` 的 `columbia.jp` 官方頁寫「オリジナル発売日: 1968.9.10」，
   **而盤上收了 1970 年的〈We've Only Just Begun〉與〈Love Story〉**——**曲目表是驗年份最硬的內部證據。**
2. ⚠ ⚠ **Discogs 的 `versions` 結構上不收數位發行**（第 1957-B 條）：b 組 8 張裡 5 張有 Apple 條目、
   零筆在版本表裡。**與「版本表自己是舊的」不同，這一種是結構性的。**
3. ⚠ ⚠ **我自己的 `begin-area` 修法錯了兩處，而錯法比原問題嚴重**（第 1959-B 條）：
   用地名白名單判日本（**70 張裡約 66 張是日本市町村被誤判**）、
   把代理建議的「標記待人工判」做成「判退」。**改成沿 MB 區域階層解國碼，出身地只加註記。**
   **`domestic` 是粗篩，身分判在策展層的第 4106 條四項。**
4. ⚠ ⚠ **`poolRecheck` 從三道長到六道**（第 1960-B／1963-B 條）：加了「削編制後綴」「分隔符切段」
   「盤名雙題兩半都比」「前批裁定名單」。
   ⚠ **分隔符切段必須要求切出來的段含漢字**——不限制時六批多出 45 列幾乎全是
   `バンド`／`アンド` 這類垃圾（`・` 在片假名譯名裡是詞內連字號）。
5. ⚠ **我的派工信第十五次出錯**（第 1964-B 條）：c-183 writer-2 的信裡 §二 整段留著 a 組的 hook 舉例，
   **因為我用 `.replace()` 換那一段而字串沒對上——第三次同一種失效。**
   **`chk-dispatch.mjs` 補了第五道**：用實際檔案的張數與 hook 原文回比，**回測當場抓到那 5 處。**
