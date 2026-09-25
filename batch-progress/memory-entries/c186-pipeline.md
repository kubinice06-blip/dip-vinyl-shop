### 2026-09-25｜dip-vinyl-shop｜c-186（日本爵士獨立廠牌線 jp-2 第四批）五層管線走完，24 張

**改動摘要**：1978–1979 年段，**38 張收 25 退 13，收件後主線又撤掉 1 張，最終 24 張（63%）**，
身分 **24/24 pinned、零 §1 人工**、簡介 **24/24 全 full（211–239）**、
**封面 18/24、串流 17/24**。apex 0 張、例外欄全空。

**主要檔案**：`batch-progress/c186/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c186-*.json`、
`batch-progress/probe/{probe-previews,match-lib,manual-recover}.mjs`、
`batch-progress/enum/{known-pool-collisions,name-corrections}.json`、`batch-progress/fix-names.mjs`。

**驗證結果**：`chk-prop` 兩組 0、`dedup-crossbatch` 四道 0、三階段 `qa-batch` 全過、
`chk-hook-crossgroup` 24 張全過、`qa-check-research` 兩組 0、`fix-spacing` 兩檔 0；
**鉤子預算 207–230 與 desc 211–239 都是我自己逐筆重算的**；
跨兩組 24 張的 4-gram（漢字＋片假名）我自己重掃，
⚠ ⚠ **≥3 張 0 條——本線第一次連專名都沒有撞到三張**；**首句照抄 hook 24/24。**

**五條值得記住的**：
1. ⚠ ⚠ ⚠ **`深町純《Evening Star》` 收了之後又被撤**（主線第 1980-B 條）：
   **研究層把它標成 uncertain 並指出「一個動作就能定案」——取來源碟 CD 的逐軌時長。**
   **我做了：兩軌的 `Recorded By` 錄音室、工程師、樂手在兩張碟上逐名相同，時長 5:45／6:00 對 5:42／6:00**
   ——**既有錄音 4/6（67%），依第 1948-B 條是合輯。**
   ⚠ **而 Discogs 的 `formats` 與 MB 的 `secondary-types` 在這一張上完全沉默**（同一批的《Horizon》它們報得出來）。
2. ⚠ ⚠ **`previews.json` 的 `status: ready` 也會是誤命中**（兩組各抓一筆，年份漂移 47 年與 27 年）
   ——**探測層加了「`aliasOnlyTitle` ＋ 漂移 ≥20 年一律退」，兩筆已降級並留下 `downgradedBy` 與理由。**
3. ⚠ ⚠ **人名改判 25 處，而其中兩處的姓名兩截都錯**（`大野雄三グループ`→`多忠昭グループ`、
   `中村サダノリ`→`中牟礼貞則`）——**機制是「罕見讀法的漢字姓」與「同一張碟上兩個同音名互相污染」。**
   ⚠ **`逐軌 anv` 欄本身會錯**，要與 `realname`／`namevariations` 交叉驗。
4. ⚠ ⚠ **`Discogs 的 labels/<id>` 端點本批 5/5 都有決定性產出**（Trio 是音響廠 Trio Electronics 1969 年開的、
   Kitty 是 多賀英典 1972 年開的而他就是兩張卡的 Executive-Producer、`Openskye` 的母廠是 CBS/Sony⋯）
   ——**本線前十組沒人打過這個端點。**
5. ⚠ ⚠ **寫作層主動避開「已上架卡用過的句型」**：a10 的引入法照鉤子層配表會與 c-185 已上架的
   《C・P・U》頭兩句幾乎逐字同形，**該層自己換掉並回報**——**配表往後要連前幾批已上架的句型一起排除。**
