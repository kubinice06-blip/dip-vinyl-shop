# 同期紙本掃描檔：實際涵蓋範圍（2026-09-16 校正）

⚠ **檔名不等於涵蓋範圍**——c-138 b 組踩過：以為 `billboard-bn-1959-61` 含 1961，實際完全沒有。
**開工前先看這張表，不要看檔名。**

| 檔案 | 來源 | 實際涵蓋 | 備註 |
|---|---|---|---|
| `billboard-bn-1955-57-ocr.txt`（2.1 MB） | Billboard | 1955–1957 | c-136 掃 |
| `billboard-bn-1957-59-ocr.txt`（684 KB） | Billboard | 1957–1959 | c-137 掃 |
| `billboard-bn-1959-61-ocr.txt`（972 KB） | Billboard | **1959 全年 ＋ 1960-11／12 兩個月，沒有 1961** | c-137 掃；檔名誤導 |
| `billboard-bn-1960-62-ocr.txt`（1.9 MB） | Billboard | 1960-01→1960-11、1961 可得的 37 期、1962-01→1962-05 的命中頁 | c-138 a 掃 |
| `cashbox-bn-1960-62-ocr.txt`（2.7 MB） | **Cash Box** | **1960-11-05→1962-04-28 全 78 期** | c-138 a 掃；1961 年唯一可用的替代來源 |
| `jazzdisco-bn-1500.txt` / `jazzdisco-bn-4000.txt` | jazzdisco | 1500／4000 系列目錄、錄音日期與編制 | 年份欄可信度見下 |

## 抓取端的坑（全部實測過）

- **1961 年的 Billboard PDF 幾乎沒有文字層**：52 期只有 **1961-03-20** 與 **1961-09-18** 兩期可全文搜；
  **1961 年 1–3 月還缺期**。1961 要嘛走 Cash Box，要嘛自己跑 OCR（`tesseract-ocr`，容器是拋棄式的，裝了不影響 repo）。
- **1962 年起 Billboard 改成週六日期**，沿用週一序列會全部 404。
- **Cash Box 每期都有 Blue Note／Pacific Jazz 的每月新片列表**，定年份比 Billboard 好用。
  URL 形狀：`https://www.worldradiohistory.com/Archive-All-Music/Cash-Box/60s/<年>/CB-<YYYY-MM-DD>.pdf`（**週六**）。
- **Discogs 的 search API 不需 token**（`api.discogs.com/database/search?catno=...`），
  是判年份最有用的一條「實體盤面」來源——**同一個目錄號的美國原壓全部標同一年**，比單一資料庫欄位強。

## 一份來源要按欄位評價，不是按來源評價（第 470 條）

- jazzdisco **5000 系列年份欄最準**（贏過 MB 與 Discogs），**7000 系列系統性晚 1–2 年**（第 467 條），
  **4000 系列大致可信但會錯**（c-138 a 的 Mosaic 被同期紙本推翻，第 526 條）。
- jazzdisco 的**曲名欄會錯**、**編制歸屬容易被讀錯**（第 470 條）。
- **紙本掃描本身會誤植目錄號**（第 509c 條），c-138 a 一組中三次——**靠編制／軌數／曲目交叉定位，不要只信印出來的號碼**。
