# 第三輪「有鼓」名單研究層補充（ml80／ml81；2026-11-06）

照 `batch-progress/mood-cells-20261022/RES-DISPATCH.md` 全文做，另加這幾條：

1. **鼓要判清楚是哪一種**（店主 11-06「有些要死不活的音樂也會有鼓推進」）。每張的 `sound` 與 facts 至少一條寫明：有沒有鼓、鼓的速度感（慢／中慢／中快）、是哪一種——
   - **慢、拖、無力**（半速 boom bap、懶 trip-hop、dusty 慢拍、dub 一拍一拍拖、slowcore 式）→ 照 BRIEF 仍是靜，**不算存疑**；
   - **鼓＋攻擊性**（失真牆、嘶吼、音壓貼臉）→ notes 寫「moodGuess 存疑（攻擊性）：…」；
   - **舞池推進**（四拍底鼓、house／techno／breakbeat／dnb 跳舞律動、明顯中快速、文案寫 dancefloor／club／uptempo）→ notes 寫「moodGuess 存疑（舞池推進）：…」。
   - 判不出來的照實寫「鼓型未證」，**不要**標存疑。
2. 判輕、判冷、偏亮這類**非鼓**的出格照實寫在 notes（「moodGuess 存疑（判輕）：…」），但主線本輪不會因此汰卡，評分層會用你的聲音描述落格——所以聲音描述要具體（低頻厚薄、殘響、糊或乾淨、旋律清楚與否、冷暖）。
3. 卡單有 `priorResearch` 的卡（e 組），研究稿已預先放進你的輸出檔（`_reuse: true`）：**保留原 facts，不要整張重查**，只補 (a) 鼓型判定（上面第 1 條）、(b) 原稿 `sound` 空白或 thin 的補到至少 2 條聲音 facts、(c) 把 notes 改寫成本輪結論（保留原研究的身分核對）。補完把 `_reuse` 欄刪掉。
4. Bandcamp 頁的 ld+json（`<script type="application/ld+json">`）有發行日、曲目、曲長、文案、credits，先抓它。Apple 30 秒試聽可用 iTunes Search／Lookup API 找。
5. **每做完 3 張就把目前結果寫進輸出檔**；輸出檔已有部分內容就接續補完，不要從頭重寫。
6. WebSearch 每支最多 3 次。UA 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不放 email。
