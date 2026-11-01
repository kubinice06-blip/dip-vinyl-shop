# 三軸重評線（2026-11-01）

**範圍**：2,957 張，分三條線：
- 情緒薄格 md／mc／ml：2,345 張
- Spotify 補卡 sf：417 張
- 鐵幕爵士 eb：195 張

工作清單是 `shards/s01–s12.json`，由 `build-worklist.py` 產生，每片約 250 張，裡面附研究層事實。評分標準在 `RUBRIC.md`。

## 流程

1. **評分**（4 個工作階段並行，各 3 片）：
   - 主線把每片拆成 5 段、每段約 50 張，派 Opus 代理讀 `DISPATCH.md` 照做，產出 `verdicts/sNN-*.json`。
   - 主線驗收：
     - 每段抽 5 張覆核。
     - 看三軸分布：經典度不該再擠在 3；硬蕊度方向要對，自由爵士和噪音高、soul 和 dub 低。
     - 必過錨點：Yancy Körössy《Identification》經典度 ≥4；Szabados《Az esküvő》＝5。
   - 只交 verdicts，不改卡池。推自己的分支、開 PR、自己合併。
2. **套用**（verdicts 全齊後，由 1 個工作階段做）：
   - 合併 verdicts，產出 `applied.json`（舊值、新值、理由）。
   - 改 `seed_cards.json` 三軸欄。seed 是單行壓縮格式，用字串替換加三道防呆。
   - 改各 manifest 的 `ratings`，`source` 記 `manual:rerate-20261101`。
   - 改 card_catalog 的評分與稀有度欄位，照 publish-manifest 的 patch 機制。
   - 重算稀有度分布，與全池對照。
   - 跑 published gate。
   - 把經典度錨點表寫進 `ALBUM_ONBOARDING.md` §0.8，往後所有人工評分批都照用。
   - 更新 `PROJECT_MEMORY.md`。

## 分片指派

| 工作階段 | 片 | 範圍 | 狀態 |
|---|---|---|---|
| R1 | s01–s03 | eb1–5、mc 前段（至 mc5） | ✅ verdicts 750 張（經典度新分布 1/2/3/4/5＝0/10/375/340/25） |
| R2 | s04–s06 | mc5 後段–md4 | ✅ verdicts 750 張（經典度新分布 1/2/3/4/5＝0/8/448/282/12）；冷門度口徑：場景主力廠（Cryo Chamber、Cyclic Law、Miasmah、Touch、Room40、Kranky、Mego）首發即上串流＝3，極小廠／私壓有數位＝4，套用時可對照他片 |
| R3 | s07–s09 | md4 後段–ml5 | ✅ verdicts 750 張（經典度新分布 1/2/3/4/5＝0/23/411/301/15） |
| R4 | s10–s12 | ml5–sf12 | ✅ verdicts 707 張（經典度新分布 1/2/3/4/5＝1/36/374/281/15；s10 250、s11 250、s12 207；主線改 6 張、退回 0 段） |
| 套用 | — | — | |
