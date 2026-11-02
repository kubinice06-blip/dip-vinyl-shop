# 三軸重評第二輪：標準補充（2026-11-02）

**第一輪標準照用**：`batch-progress/rerate-20261101/RUBRIC.md`（三軸定義與錨點，必讀全文）。本檔只補一條冷門度下限。

## 店主指正（2026-11-02）

- 「但 Identification 很冷門吧？」
- 「改 從 9 月初開始入庫的專輯都要檢查一下 除了冷門度 其他兩軸也要」

## 查到的偏差：冷門度矯枉過正

第一輪把「Last.fm 絕對分級」換成「看原盤通路」，結果反過頭給低了：
- 國營廠盤被當成「本國主流通路＝3」。
- MPS 這類國際廠盤被當成「正規發行＝2–3」。

《Identification》Last.fm 只有 113 位聽眾，Marius Popp 43 位、Răducanu 0–2 位，全被打成 3。第一輪 2,957 張裡，聽眾不到 1,000、卻給 1–3 分的有 649 張。

**冷門度的尺度是「我們的玩家撞見這份錄音的機率」**，不是它在原產國的流通量。

## 冷門度下限（硬規則，套用時機械執行）

| 條件 | 冷門度 |
|---|---|
| Last.fm listeners < 1,000，且 Apple 試聽 `ready`（有串流） | **至少 4** |
| Last.fm listeners < 1,000，且試聽 `unavailable`（串流上找不到） | **5** |
| listeners 1,000–4,999 | 至少 3 |
| listeners 缺值 | 照 RUBRIC 判斷，不套下限 |

- 下限只往上抬，不往下壓。聽眾多的盤照 RUBRIC 錨點判，可以給 1–2。
- 「試聽 ready」只是「有串流」的近似。代理若確知該盤有 Spotify／Bandcamp 正式數位版，可在 `why` 註明，冷門度給 4。
- **例外：聽眾數疑似錯配不套下限，照 RUBRIC 錨點判**（2026-11-02 套用工作階段調度裁定）。例如：
  - 同系列知名卷次、盤名寫法不同（Horace Silver《Doin' the Thing》、Freddie Hubbard《Night of the Cookers》Vol.1／Vol.2、Ornette Coleman《Golden Circle》Vol.2、Art Blakey《Jazz Corner of the World》Vol.1／2 等）：冷門度給 **3**。
  - 該語言圈主流盤因拆名而聽眾數低（告五人、張惠妹、蕭亞軒、陳奕迅）：照錨點給 2。
  - listeners＝0 是查詢漏抓（Azra、Riblja Čorba）：視同缺值。
  - 第一輪套下限的判準：已依錨點判為 ≤2 的正規／主流盤，下限卻要一口氣抬到 4–5，視為疑錯配，維持原值。
  - 完整名單在 `apply.mjs` 的 `MISMATCH`，套用結果見 `REPORT.md`。
- 評分代理照這張表直接給分。套用工作階段會再機械檢查一次，第一輪 2,957 張也一併套用。
