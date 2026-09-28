# 補遺線 hoyi 交接（c-192…c-198）——**收線（2026-09-28）**

**店主「全開」四堆（§1 人工身分／兩線之間漏掉的／日本藝人的美國原盤／外國藝人的日本原盤），七批五層全部走完。**
雲端能做的全部做完；上傳（KV／Firestore／`seed_cards.json`／`album_overrides`）依 `REMOTE_RUNBOOK.md` 由本機做。

## 一、張數：**214 張提案 → 137 張卡（64%）**

| 批 | 內容 | 提案 | 收 | 身分 | desc | 封面 CAA | 試聽 ready |
|---|---|---:|---:|---|---|---:|---:|
| c-192 | 四堆混編（§1／跨線／美國原盤／外國藝人） | 35 | 23 | 17 pinned ＋ 6 §1 | 212–240 | 12（§1 六張走 Apple／manual-scan） | 16 |
| c-193 | 第 4 堆 1970–1978 | 35 | 22 | 22 | 209–239 | 15 | 10 |
| c-194 | 第 4 堆 1972–1981 | 35 | 24 | 24 | 216–240 | 18 | 12 |
| c-195 | 第 4 堆 1981–1984 | 35 | 20 | 20 | 204–239 | 12 | 6 |
| c-196 | 第 4 堆 1978–1988 | 33 | 15 | 15 | 212–239 | 14 | 6 |
| c-197 | 重篩：King 紐約製作＋ Alfa | 29 | 21 | 20 ＋ 1 §1 | 215–239 | 14 | 16 |
| c-198 | 重篩第二輪：日本系美國字標 | 12 | 12 | 12 | 221–240 | 8 | 6 |
| **合計** | | **214** | **137** | **130 ＋ 7 §1** | **204–240** | **93** | **72** |

**全部 full、apex 0、例外欄全空**；每批三階段 `qa-batch`、`chk-hook-crossgroup`、`chk-prop` 都是我自己重跑的；全池 `dedup-crossbatch`（161 批、5918 張）四道 0。
每批的逐項驗收在 `batch-progress/c<批>/HANDOFF.md`，memory entry 在 `batch-progress/memory-entries/c<批>-pipeline.md`（七份，本機合併進 `PROJECT_MEMORY.md`）。

## 二、⚠ 本機上傳前要做的事（隨層累積）

1. **c-188《Wings》已上架正文寫錯**：「上一張是 1974 年的《MATSURI》，隔了七年」——實為 1979 年錄音，只隔兩年（c-192 a 研究第 7604 條）。改正文後重傳。
2. **池中 seed `The Great Jazz Trio《At the Village Vanguard》` 年份疑為 1977 不是 1978**（c-192 a 第 7604 條）——覆核後改 `seed_cards.json`。
3. **CAA 封面可能不是原盤封套**：c-192 `Hank Jones《Hanky Panky》`、`中村照夫《Rising Sun》`（兩個 RG 都只建了美國版）——上傳前目視比對。
4. **互指句**：c-174《Music Break》補一句指回 c-192《Bossa Nova Concert》（1967-07-04 同一場音樂會的另一張 LP）；c-191《Kenji Shock》與 c-192《First Step》有三首同曲（重錄），對一下兩邊寫法。
5. **池中 seed《Chet Baker Live in Tokyo》2000 是雙 CD 合輯**，原盤是《Memories》1988＋《Four》1989（c-196 b 第 7566 條）——要不要把池中那張換成原盤身分，本機決定。
6. **c177／c182 的人名「高波初郎」→「高浪初郎」**：卡單與 prop 已改；**c182 研究檔與兩批 `input/*-writer-1.json` 仍是舊字**，正文若有這個名字，上傳前改（主線第 2010-B 條）。
7. **c179 卡單／prop 的 `risk` 欄仍寫「錄音（富岡靖）」**，應為 `富岡豊`（c-195 a 第 7431 條；只在策展欄，正文沒寫）。
8. **c-194 研究：`Ron Carter《1 + 3》` 解說者 `野口久光`**（羅馬字改漢字，不進 `pairs`）；**c-194 b《Gentlemen of Swing》錄音師漢字 `渡部喜久`／`富岡豊`**（c-195 a 第 7855 條）。
9. **c-196 卡單兩處敘述過時**（c-196 b 研究第 8217 條）：`The Great Jazz Trio《Great Standards Vol.1》` 的「Vol.1–4 同場」（只有 Vol.1／2 同場）、`Art Blakey《New Year's Eve at Sweet Basil》` 的「作曲欄查不到／團員原創」——正文已照研究稿，只是卡單 `curatorRisk`／`curatorWhy` 沒改。
10. **c-198 卡單策展欄三處過時**（c-198 b 研究第 8341 條）：`Carmen McRae` 的「十軌全是美國歌曲集標準曲／甲 8 乙 2」（〈The Last Time For Love〉是她自寫，甲 10 乙 0）、`Gary Burton` 的「Hopkins、Pease 是 Berklee 教師」（無來源）、`Guitar Workshop in L.A.` 的 `Yoshinobu Kojima`＝`小島良喜`——正文照研究稿，卡單策展欄未改。
11. **上傳 c-192…c-198 全部**（照 `REMOTE_RUNBOOK.md`）。

## 二之一、未收的撈回候選（留給下一次補遺；℗ 未逐筆驗）

- c-198 b 第 8022 條：JJ Records 目錄裡兩張外國藝人的 Victor 日本原盤形——`Art Blakey《Jazz Messengers '70》`、`Helen Merrill With Teddy Wilson《Helen Sings, Teddy Swings!》`。
  **為什麼這一輪不收**：只有兩張、℗ 沒驗，為兩張開一批要把五層全走一遍——等下一次補遺掃描一起收。

## 三、教訓

1. ⚠ ⚠ **初篩腳本的日期精度錯，漏掉整條製作線**：MB 上只填到年的外國代工版排在填到日的日本原壓前面（字串排序），King 的紐約錄音計畫整串被判成授權版——**c-196 a 策展層看出來，重篩兩輪撈回 33 張**（c-197／c-198）。**通則：比「誰最早」之前先比日期精度。**
2. ⚠ ⚠ **「甲／不明」初篩只是提示**：「甲」錯在 MB 只建日本版的歐洲原盤（MPS／Freedom／GMP／Delphine），「不明」多半是授權版但也有反例——**每張都回 Discogs 版本表看 ℗ 行與授權字樣**；策展信模板累積了七個必查特徵。
3. ⚠ ⚠ **探測層第四種誤命中**：短掛名摺疊後成為長掛名的子字串（`CCK`→`ck`）——`looseArtistOk` 補擋板、全檔回掃另抓一筆；**同藝人別張的誤命中仍然沒有擋板**，本線靠研究層逐軌比對與收批回掃又抓了七筆（`audits/preview-downgrades.md`）。
4. ⚠ **`previews.json` 只能一條鏈寫**：試聽修正排成依序等待的佇列（`preview-fixes*.sh`、新增 `probe/downgrade.mjs`），七個修正腳本與四條探測鏈零衝突。
5. ⚠ **批次交錯時，後寫的要把先寫的算進跨批比對**（c-193 先於 c-192 寫完）；研究層可以不照策展層分組（c-197 把同一條製作線給一位代理）。
6. **派工產生器、模板、掃描腳本全部放 repo**（`batch-progress/dispatch/`）——scratchpad 被容器重啟清空過一次。
