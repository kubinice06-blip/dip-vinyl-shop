# 原聲帶重寫線｜鉤子層與寫作層共同派工詞（ost-*）

工作目錄 `/home/user/dip-vinyl-shop/desc-tools`（雲端）。先讀 `/home/user/dip-vinyl-shop/batch-progress/ost-desc-20261023/BRIEF.md`。

## 鉤子層
- 照 `prompts/hook-base.md` 全檔（含開頭雲端註記：`note` 預算公式、骨架歸屬寫法）。
- 研究稿：`batches/research/<批>-<組>.json`；輸出 `batches/hooks/<批>-hooks-<組>.json`，`[{"key","hook","note"}]`，順序同研究稿。
- **這條線特有**：
  1. hook 從**作品與音樂的故事**取材（作曲家的處境、和導演／製作人的往來、名場面、作品的命運），**不拿盤號、版本、曲目表筆誤、軌數當鉤子**。
  2. note 第一項固定是「第二句點出作品：台灣通行中文名＋原名＋類型（＋系列關係）」，用研究稿 facts 裡查證過的中文名；hook 本身已點出作品時，第二句改寫作品一句劇情或世界觀。
  3. note 的主故事鏈要有「音樂在作品裡做了什麼」至少一格；盤號版本最多一格、放最後、可捨。
  4. 同組同作曲家多張時，hook 前四字互異、主故事骨架互異（在 note 寫「這條骨架全批只走本張」）。
- 每寫完 5 張就存檔；輸出檔已有內容就接續補完，不要從頭重寫。

## 寫作層
- 照 `prompts/writer-base.md` 全檔（尤其檔中「原聲帶」節、字數 180–240、禁語、媒體名與榜單名次不進正文、不用「據說」與轉述引導詞）。
- 輸入：`batches/input/<批>-writer-<N>.json`；輸出 `batches/output/<批>-out-<N>.json`，`[{"key","desc"}]`，key 逐字、順序同輸入。
- **這條線特有**：
  1. 首句＝hook 原文一字不改；**前兩句內讀者要知道是哪部作品**（台灣中文名＋原名＋類型）。
  2. 作品中文名用《》，原名接在後面圓括號或以「原名」帶出，例：《超時空之輪》（Chrono Cross）。
  3. 只用輸入檔 facts 裡的事實；不得補外部知識。
- 每寫完 5 張就存檔；輸出檔已有內容就接續補完，不要從頭重寫。
- 交件前自己逐張量 `Array.from(desc).length`，兩端都要看。

## 兩層共同
- 臨時檔放 `/tmp/claude-0/-home-user-dip-vinyl-shop/d9919ed8-48cf-55a5-97b1-5d8c26fedbbb/scratchpad/<批>-<層><組>/`。
- 不上網、不動 git、不動 `PROJECT_MEMORY.md`、`seed_cards.json`、KV、`data/mood/*`。
- 回報：合格張數＋字數區間＋異常 key 清單＋你推翻了主線哪幾處。不要覆述原文。
