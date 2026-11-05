# 方案 C 套用（2026-11-03 店主拍板）

**店主**：稽核報告列出 A／B／C 三案，店主回「1 c」。

## 內容

`apply-c.json`（由 `build-apply-c.js` 產生）共 **2,713 張**，三軸或 tier 有變。

- **tier 變動**：
  - 殿堂 → 一般 548
  - 流亡 → 一般 103
  - 異端 → 一般 71
  - 異端 → 流亡 1
  - 一般 → 殿堂 26
  - 一般 → 流亡 225
  - 一般 → 異端 10
- **全池結果**：

| 殿堂 | 流亡 | 異端 | 傳奇 | 史詩 | 獨特 | 稀有 | 普通 |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 170 | 232 | 54 | 471 | 1,612 | 3,943 | 6,587 | 9,437 |

- **三軸**：用稽核 verdicts 的值，再套冷門度下限（listeners 取 shard、apex7 的 listenersKV、`listeners-S.json`）。疑錯配的不套。

## 要寫的地方

1. `seed_cards.json`：三軸欄（index 2–4）與 tier 欄（index 8，`"hall"`／`"pearl"`／`"heresy"`／`null`）。用字串替換加三道防呆，做法同前兩輪。
   - tier 欄若原本不存在（列長 8），新增頂點時補上；降級時改成 `null`，或照既有慣例處理（先看 seed 裡一般卡的列長）。
2. manifest（有的話）：
   - `ratings` 三軸照前兩輪方式寫，`source` 記 `manual:audit-20261102`。
   - `apexAssessment`、tier 相關欄位同步更新。
   - `rarity` 依公式重算；頂點卡照既有慣例。
3. card_catalog：
   - classic／obscurity／accessibility／rarity 四欄。
   - tier／apex 欄照既有欄位名，先讀幾筆頂點卡和一般卡比對。
   - 降級卡要把頂點旗標清掉。
   - 推完抽 15 張讀回。
4. `album_overrides.tier`：管理員集合，雲端寫不了。產出 `publish-stage/audit-20261102/album-overrides-tier.json`（要設、要清的清單），並在 `REPORT.md` 標明「需本機後台匯入」。
5. **index.html 的新手禮名單 `WELCOME_HALL_ALBUMS`**：
   - 名單裡被降級的殿堂卡要移除，換成留下來的殿堂卡，維持原本張數；不夠就照實。
   - 其他寫死殿堂名單的地方（admin、battle 的備援卡池等），一併檢查。
6. **玩家收藏**：`collections/{uid}/cards` 存有 `hall:true` 之類的旗標。先查清楚前台顯示是讀卡匣旗標還是 card_catalog：
   - 讀 card_catalog：自動跟著變。
   - 讀卡匣旗標：不要改玩家資料，在 `REPORT.md` 列出影響範圍，交店主決定。
7. 店內印刷卡（`data/shop/print/`）會印頂點徽章，在售品有 tier 變動的就重出。
8. 跑 published gate，寫 `REPORT.md`（tier 前後分布、三軸前後分布、全池等級分布、待本機處理事項），更新 `PROJECT_MEMORY.md`。
