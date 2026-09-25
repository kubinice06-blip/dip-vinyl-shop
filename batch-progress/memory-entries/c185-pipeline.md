### 2026-09-25｜dip-vinyl-shop｜c-185（日本爵士獨立廠牌線 jp-2 第三批）五層管線走完，29 張

**改動摘要**：1976–1978 年段，**38 張收 29 退 9（76%，本線最高）**，
身分 **29/29 pinned、零 §1 人工**、簡介 **29/29 全 full（201–240）**、
**封面 25/29、串流 20/29**。apex 0 張、例外欄全空。
⚠ **無來源 11 張裡人工救回 2 張**（異體字 `沢`／`澤`、團名在盤題裡）。

**主要檔案**：`batch-progress/c185/{slice,prop-a,prop-b,caa,apple-candidates,rulings,HANDOFF}`、
`desc-tools/batches/{cards,research,hooks,input,output}/c185-*.json`、
`batch-progress/{fix-names,new-rulings,chk-dispatch}.mjs`、`batch-progress/enum/name-corrections.json`、
`batch-progress/probe/{manual-recover,match-lib,probe-previews}.mjs`、
`desc-tools/prompts/{writer-base,hook-base}.md`。

**驗證結果**：`chk-prop` 兩組 0、`dedup-crossbatch` 四道 0、三階段 `qa-batch` 全過、
`chk-hook-crossgroup` 29 張全過、`qa-check-research` 兩組 0、`fix-spacing` 兩檔 0；
**鉤子預算 217–230 與 desc 201–240 都是我自己逐筆重算的**；
跨兩組 29 張的 4-gram（漢字＋片假名）我自己重掃，**≥3 張 4 條全是專名與樂器名、0 條句型同構**；
**首句照抄 hook 29/29。**

**六條值得記住的**：
1. ⚠ ⚠ ⚠ **一支代理的 30 條裁定被並行的另一支整份蓋掉，靠它自己的草稿救回**（主線第 1970-B 條）
   ——**兩支都跑了 `git show HEAD:` ＋ `ls`，兩者都回「不存在」，於是各自建檔。**
   **改法：派工前由主線先建 rulings 骨架（`new-rulings.mjs`），`chk-dispatch` 第六道擋沒建好的批。**
2. ⚠ ⚠ ⚠ **人名錯字會跨批傳染**（主線第 1975-B 條）：**下一批的策展層拿上一批的 `prop` 當先例**
   ——**c-184 改掉的四個名字在 c-185 的卡單裡又出現一次。**
   **改法：`enum/name-corrections.json`（46 組）＋ `fix-names.mjs`，每次改名往後掃到最新批。**
   ⚠ ⚠ **而「查不到漢字就寫羅馬字」那一類絕不能全域掃**（第 1979-B 條：我試過一次，
   把兩個已收線批次裡正確的漢字降級成羅馬字，全部還原）。
3. ⚠ ⚠ **`live` 的判準第三次修**（第 1977-B 條）：**日期那一肢改成「一個或連續數晚的公演」**，
   **並補三個必掃的 credits 角色（`Lighting`／`Technician [P.A. Operation]`／`Producer Of <場館>`）**
   ——**實況盤的工作人員名單會出現場館的技術職，錄音室盤不會。**
4. ⚠ ⚠ **鉤子層把「日」後面那一個字配成 20 張 20 種全異，日期樣板同構從 11 條壓到 2 條、兩輪就收斂**
   （c-184 用了四輪）——**三欄一起配（日期＋動詞＋日期前面那個漢字）是可量的做法。**
5. ⚠ **回撈的豁免形狀累積到四種**（第 1974-B／1981-B 條）：異體字、團名在盤題裡、羅馬字掛名、
   ⚠ **和文題對英文題（`artGate` 欄的「掛名也過」就是它的指紋）**。
   **`match-lib` 已加異體字摺疊與查詢端的中黑變體，`probe-previews` 加了「aliasOnly ＋ 漂移 ≥20 年一律退」。**
6. ⚠ **正文不點名資料庫平台**（第 1982-B 條）：**寫作層與鉤子層在這件事上判斷相反，而寫作層對**
   ——**`note` 是施工圖、寫清楚來源是好事；正文是給讀者看的，「Apple 的數位版是十軌」會被讀成「去那裡聽」。**
