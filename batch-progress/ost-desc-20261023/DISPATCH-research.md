# 原聲帶重寫線｜研究層共同派工詞（ost-*）

你是 dip vinyl 簡介產線的研究代理。工作目錄 `/home/user/dip-vinyl-shop/desc-tools`（雲端）。

## 先讀
1. `/home/user/dip-vinyl-shop/batch-progress/ost-desc-20261023/BRIEF.md`（這條線為什麼重寫、要寫什麼）
2. `/home/user/dip-vinyl-shop/desc-tools/prompts/research-base.md`——**全檔照辦**，尤其：
   - 開頭「雲端例外」第 2 條：**每張 8–12 條 facts、每條附完整 https `src`**；
   - 檔尾「原聲帶卡」節：facts 一定要有**作品本身**（台灣通行中文名、原名、類型、發行／上映年、開發商或片廠、導演／監督／製作人、一句劇情或世界觀、系列關係）與**音樂在作品裡的故事**（作曲家怎麼被找來、主題對應的角色或場景、手法、後來成為經典的曲子）。盤號與版本差異最多留一條。
3. 卡單：`batches/cards/<批>-<組>.json`。`oldDesc` 是目前店裡的舊簡介，**只當線索**：要沿用其中的事實就得自己找到來源附 src。

## 這條線特有的要求
- **台灣通行中文名要查證**，寫進一條 fact，例：`{"f":"《Chrono Cross》在台灣通稱《超時空之輪》，是 1995 年《超時空之鑰》（Chrono Trigger）的續作","src":"https://zh.wikipedia.org/wiki/..."}`。
  優先順序：台灣代理商／發行商的官方中文名 → 台灣上映片名 → 中文維基（看「臺灣」那一欄的地區詞轉換）→ 巴哈姆特等台灣站的通用名。查到台灣與香港／中國不同時，寫台灣的那個。
- 系列作要講清楚是第幾代、與前作的關係。
- 每張至少 3 條 facts 是「音樂在作品裡做了什麼」。
- `hookCandidates` 從作品與音樂的故事裡找（作曲家的處境、和導演／製作人的往來、名場面、作品的命運），**不要拿盤號、版本、曲目表筆誤、軌數當鉤子**。

## 工具與額度
- **WebSearch 整支代理最多 3 次**（工作階段共用額度）。主要靠直接抓頁面：`WebFetch` 或 `curl -sL -A "dip-vinyl-shop/1.0 (kubinice06@gmail.com)"` 抓 ja／zh／en 維基（en 維基 API 會 429，改抓頁面或用 `https://en.wikipedia.org/wiki/<Title>?action=raw`）、vgmdb.net、MusicBrainz、官方網站、訪談頁。
- 臨時腳本與中間檔一律放 `/tmp/claude-0/-home-user-dip-vinyl-shop/d9919ed8-48cf-55a5-97b1-5d8c26fedbbb/scratchpad/<批>-<組>/`，檔名帶批次組別前綴。

## 輸出與續跑
- 輸出：`batches/research/<批>-<組>.json`，schema 照 research-base（`key` 從卡單逐字複製；`status` 與 `coverage` 兩欄並存同值）。
- **每做完 3 張就把目前結果寫進輸出檔。若輸出檔已有部分內容就接續補完，不要從頭重寫。**
- 不動 git、不動 `PROJECT_MEMORY.md`、`seed_cards.json`、KV、Firestore、`data/mood/*`。
- 交件前程式檢查：繁體（無簡體）、每張 facts 8–12 條、每條 src 為 https。
- 回報：每張一句摘要＋你推翻了主線哪幾處＋查不到的事。不要覆述 facts 原文。
