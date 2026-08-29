# REMOTE_RUNBOOK — 雲端／本機分工產線（2026-08-29 制定）

新增專輯批次自本文件起採**兩頭分工**：耗時的文字工作在雲端（claude.ai/code）跑，
電腦不必開著；只能本機做的驗證與寫入等累積一批後一次收。
本文件是**雲端工作階段的開工必讀**，與 `ALBUM_ONBOARDING.md` 並用——
流程規範仍以 onboarding 為準，本文件只規定「哪些步驟在哪一頭做」與交接格式。

## 分工表

| 步驟 | 執行地 | 原因 |
|---|---|---|
| 策展（含 rgMbid 釘定、版本鎖定） | **雲端** | 只讀 MB／維基，可達 |
| 研究層 5 組 | **雲端** | 最耗時；WebSearch 可用 |
| hook 層 2 組＋寫作層 2 組 | **雲端** | 純文字工作 |
| 機器 QA（qa-batch 等） | **兩頭都跑**：雲端先跑一輪，本機接手後重跑 | 腳本在 repo 內，哪裡都能跑 |
| 逐張人工審稿 | **本機** | 店主參與、需查證來源，不可外包 |
| 封面實測（CAA） | **本機** | 需逐張 HTTP 驗證與人工目視 |
| 試聽配對（iTunes /lookup） | **本機** | 雲端 egress 不穩；且要人工覆核版本 |
| listeners（Last.fm） | **本機** | 雲端擋 Last.fm（c-46 實測 3,793 張全 null） |
| KV 寫入與逐字驗證 | **本機** | 需 CLOUDFLARE_API_TOKEN |
| Firestore 寫入、published gate、上架開關 | **本機** | 需憑證；且要等配額窗口 |

## 雲端硬規則（c-46 遠端實跑踩過的坑，一條都不能少）

1. **頂點判定不得因「查不到」降級。** 雲端 egress 擋 AllMusic／Rolling Stone／Discogs／
   Last.fm／多數日文媒體。查不到跨來源證據時，apexAssessment 一律標
   `"evidence": "pending-local"`（證據待補），**不得判普卡**。
   c-46 有 40 張 classic=5 因此被誤作普卡，本機補證後 22 張夠格升殿堂。
2. **listeners 一律留 null 並標 `"listeners": "local"`**，不要寫 0、不要猜。
3. **策展必查 secondaryTypes。** MB 的精選輯常是 primary=Album、Compilation 掛在
   secondaryTypes（c-47 法義西德批一次掃出九張）。候選檔跑 `chk-cand.mjs` 已含此檢查。
4. **版本鎖定必須在雲端做完**：同名重錄輯（Brel 1959 vs 1972）、Highlights 精選 vs 完整版、
   電影版 vs 舞台版、身後精選 vs 生前原版。逐張向 MB 覆核 rgMbid 的
   first-release-date 與類型，把裁定理由寫進候選檔的 `versionNote`。
   本機逐張人工重查的成本最高，這步偷懶整批交接都會卡住。

另：雲端**不動** seed_cards.json / apex_pool.json / PROJECT_MEMORY.md，不碰 KV 與 Firestore。

## 交接格式

雲端收工時 push 一個 branch（命名 `remote/<批名>`，或開 PR），內含：

```
batch-progress/<批名>/
  cand-*.json          策展候選（rgMbid 全釘、chk-cand 零 ERROR）
  handoff.json         交接清單（見下）
desc-restyle 產物另放 batch-progress/<批名>/desc/
  <批名>-cards.json、research 五份、hooks 兩份、input 兩份、output 兩份
```

（desc-restyle 資料夾不在版控內，故雲端把簡介產物一併放進 shop repo 的批次資料夾，
本機接手時複製回 desc-restyle 再走正常七步的後半。）

`handoff.json` 必含：

```json
{
 "batch": "…", "cards": 0,
 "pendingLocal": {
  "covers": "全部", "previews": "全部", "listeners": "全部",
  "apexEvidence": ["<標 pending-local 的 key 逐一列出>"],
  "reviewNotes": ["<研究層推翻主線之處、審稿要特別看的 key>"]
 },
 "qa": { "research": "pass", "hooks": "pass", "out": "pass" }
}
```

## 本機接手清單（照序）

1. `git fetch` → checkout 該 branch → 讀 `handoff.json`
2. 簡介產物複製回 `desc-restyle/`，重跑機器 QA 全套
3. **逐張人工審稿**（歷史每批 3–9 處錯，雲端跑過 QA 也不能省）
4. 封面 → UPC → 試聽 → listeners → apex 補證（只補 pending-local 名單）
5. KV bulk put ＋ verify-kv 逐字驗證
6. Firestore card_catalog → published gate → seed/apex 上架開關 → build-seed-genres
7. progress.json、PROJECT_MEMORY.md、merge 進 main

## 兩個對話怎麼串聯

- **主通道是 git**：雲端 push branch，本機 fetch 接手。可靠、可追溯、不受工作階段生命週期影響。
- 本機兩個 Claude Code 對話可雙向互傳訊息；本機→雲端只能單向（雲端無法回話），
  故**不要**設計成「雲端跑完通知本機」——改由店主在本機說一句「接 <批名>」即可。
- 雲端工作階段開工詞建議固定為：
  「讀 REMOTE_RUNBOOK.md 與 ALBUM_ONBOARDING.md，跑 <子域> 批的雲端段，收工 push remote/<批名>」。
