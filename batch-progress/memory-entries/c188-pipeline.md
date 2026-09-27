### 2026-09-27｜dip-vinyl-shop｜c-188（日本爵士獨立廠牌線 jp-2 第六批）五層管線走完，23 張

**改動摘要**：1981–1983 年段，**38 張收 24 退 14，研究層收件後主線撤 1 張，最終 23 張（61%）**；
身分 **23/23 pinned、零 §1 人工**、簡介 **22 full（211–236）＋ 1 thin（178）**、**封面 21/23、串流 15/23**。apex 0、例外欄全空。
**本批起剩下四批跨批並行**（c-188…c-191 同時在不同層跑，上限四支）。

**主要檔案**：`batch-progress/c188/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c188-*.json`、`batch-progress/new-rulings.mjs`（`--reserve`）、
`batch-progress/jp1-pool-refresh.mjs`（`titlesSeen`）、`batch-progress/mark-prior-rulings.mjs`、`batch-progress/probe/probe-previews.mjs`、
`batch-progress/enum/known-pool-collisions.json`、`audits/{between-the-lines-candidates,foreign-artist-japan-productions}.md`。

**驗證結果**：`chk-prop` 0、全池 `dedup-crossbatch` 四道 0、三階段 `qa-batch` 全過、`chk-hook-crossgroup` 全過、
`qa-check-research` 兩組 0、`fix-spacing` 兩檔 0；**鉤子預算 205–229 與 desc 都是我自己重算的**；
跨組 4-gram（含 c-187）≥3 張只剩 3 條專名／樂器名；**首句照抄 hook 23/23。**

**五條值得記住的**：
1. ⚠ ⚠ **條號預留要算進全域最大值**：跨批並行時骨架檔頭已預留、代理還沒寫的區間會被再配出——`new-rulings.mjs --max` 改成連「預留／編號區間」行一起算，新增 `--reserve`。
2. ⚠ ⚠ **撞池比對漏掉「和文＝羅馬字等價形、slice 只拿到一半」**：`板橋文夫《渡良瀬》` 撞池中 apex《Watarase》，另一半就在同一筆的 `titleCheck.titlesSeen`——已補進 `jp1-pool-refresh.mjs`。
3. ⚠ ⚠ **探測層兩種新的誤命中**：「藝人名剛好等於我們的盤名」（`Pyramid`→`PYRAMID` 2026，已加擋板）與「同一位的另一張、年份接近」（`Esprit`→《AKI》，擋板擋不到，只有研究層逐軌比會發現）。
4. ⚠ ⚠ **「同進同退」是同一把尺，不是綁定結果**：兩張 小林泉美 用同一個算法，一張 4/8 收、一張 5/9 撤。
5. ⚠ **jp-1 十批的退件只寫在 rulings.md**：新增 `mark-prior-rulings.mjs` 在 slice 標 `priorRulingHits`，**只標不剔**——第一次跑命中的兩筆都是 jp-1 以四大廠硬門退掉的 DOMO 盤，那個理由在 jp-2 反而是收件條件。
