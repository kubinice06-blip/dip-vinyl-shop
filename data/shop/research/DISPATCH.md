# 門市版研究層派工（2026-10-06）

你是研究層。先完整讀：
1. `desc-tools/prompts/research-base.md`（研究層共用規則；開頭「雲端例外」節適用：每張 8–12 條 facts、每條附完整 https src；不 git commit）
2. `data/shop/SHOP_DESC_RULES.md`（下游門市版的寫作規則——你要餵的是「給完全不懂音樂的客人看」的故事）

## 重點
- **人的故事優先**：為什麼做這張、當時處境、合作者關係、後來命運。這是門市版的主體。
- 基本盤：首發年／錄音年、廠牌、主要樂手、聲音一句、名曲 1–2 首。
- **每條 fact 都要有能打開的 https 來源**。單一來源的人名、年份、軼事要交叉驗證；驗不到就不寫或在 notes 標 uncertain。
- 優先用 Discogs API（`https://api.discogs.com/...`，curl 加 User-Agent `dip-vinyl-shop/1.0`）、MusicBrainz API、維基百科（英／日／中）、廠牌頁、權威樂評（AllMusic、JazzTimes、Pitchfork 等）、訪談。
  **WebSearch 每支代理最多 15 次**（整個工作階段共用額度）；能用 curl／WebFetch 直接開的頁面就不要搜。
- 下面「待查宣稱」是先前草稿裡出現過的句子，**每條都要查**：查到就寫成 fact（附 src），查不到在 notes 寫「查無」。不要因為它在清單裡就當真。
- `key` 一律寫 `shop:<artist>|<album>`（照清單逐字）。

## 輸出
寫到派工指定的檔案，格式照 research-base.md 的 JSON 陣列（`key, artist, album, facts[{f,src}], sound, keyTracks, status, notes`；`hookCandidates` 可留空陣列）。
**每做完 3 張就把目前結果寫進輸出檔；若輸出檔已有部分內容就接續補完，不要從頭重寫。**
交件前用程式驗：張數齊、每條 src 以 https:// 開頭、無簡體字。

最後用台灣繁體中文簡短回報：每張一句摘要、推翻或查無的待查宣稱。
