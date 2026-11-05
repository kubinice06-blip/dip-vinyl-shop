# preview-popular-20261105：試聽改播該專輯最紅那首

店主 11-05：「掃描現在的試聽連結 我要試聽播出時 都是播在該專輯最紅的歌或片段上」。

## 現況（改前）
- 靜態地圖 18,318 張 matched：`build-apple-audio-map`／`fix-cleaned-previews` 取 `previews[0]`，幾乎全播第 1 軌（可辨識舊曲的 11,998 張中 9,546 張是第 1 軌）。
- 前台即時路徑（不在靜態地圖、也不在 card-preview-status 的約 1,360 張；以及地圖網址失效時的自我修復）：`playItunes` 隨機挑一首。
- YouTube 路徑 2026-07-23 起停用（`order=['itunes']`、固定 YT 連結 YT-MUTED），不在範圍。
- 片段：Apple 30 秒預覽的起點由 Apple 決定，前台改不了；能改的只有「播哪一首」。

## 熱度來源與選曲（`scripts/popular-preview.mjs`）
1. Apple lookup（同一 collectionId、同一商店，8 張一批）取新鮮曲目與 previewUrl。
2. Deezer：`search/album` 找到同一張專輯 → `album/{id}/tracks`（完整曲目 rank，最多兩個版本）＋ `artist/{id}/top?limit=100`。
   同一首歌的熱度＝所有版本中最高的 rank（例：Bob Seger《Night Moves》專輯內〈Rock and Roll Never Forgets〉24 萬＞〈Night Moves〉18 萬，藝人榜〈Night Moves〉64 萬）。
   **候選曲必須在 Deezer「這張專輯」的曲目裡**；藝人榜只加權。
3. Deezer 對不到（覆蓋率不足）→ Apple Music 專輯頁 `showPopularityIndicator` 熱門星號；多顆星用 Deezer 部分 rank 排，否則取第一顆。
4. 都沒有 → 保留原曲；原曲是 60 秒以下前奏 → 第一首 ≥90 秒正曲。
5. demo／live／remix／instrumental／mono 等變體與 60 秒以下短曲只在別無選擇時才選（整張是現場專輯時不排除 live）。
6. 曲名比對三層：去版本註記、去全部括號、括號內副標題別名（〈Bang a Gong (Get It On)〉↔〈Get It On〉），三層取最高。

## 結果（`pick-summary.json`）
- 有選曲 18,248；Apple lookup 無曲目 116（collection 下架等，原網址不動）。
- 來源：Deezer rank 14,394／Apple 單星 1,616／Apple 多星 2,099／無訊號保留 135／跳前奏 4／套裝盒無訊號原網址不動 12。
- 第 1 軌：改前至少 9,604 → 改後 5,463（多半是第 1 軌本來就最紅）。
- 地圖網址換新 14,251（其中約 6,200 張舊網址已不在 Apple 目前的 lookup 結果，舊曲無法辨識；舊網址仍可播）。
- manifest 同步 331 檔、7,582 列；manifest↔runtime 不一致 56 列與改前相同（皆既有）。
- 抽 120 條新網址 HEAD 全 200；`verify-album-onboarding --published`：add-20261104-blink 0 error、add-20261104-ml60 0 error、c44-rock 試聽相關錯誤皆既有。

## 範例
Nevermind→〈Smells Like Teen Spirit〉、Kid A→〈Everything In Its Right Place〉、Abbey Road→〈Here Comes the Sun〉、
Dark Side of the Moon→〈Time〉、Hunky Dory→〈Changes〉、After Hours→〈Blinding Lights〉、Electric Warrior→〈Get It On〉、
Band of Gypsys→〈Machine Gun〉、Remission→〈March of the Fire Ants〉、范特西→〈簡單愛〉。

## 發現
- **靜態地圖有 134 張指到套裝盒**（3 片以上，例：Michael Jackson《Thriller》《Invincible》→ 655260476 全集、Rolling Stones《Let It Bleed》→ 186 軌、Bowie 多張 → 年代套裝）。選曲已限縮在本專輯曲目內，但身分層面是錯配，清單見 `raw/picks.json` 的 `suspectBox`，留待另案重釘 collection。
- Deezer 是歐洲為主的熱度，少數經典盤會跟一般印象差一點（Rumours→〈The Chain〉比〈Dreams〉高 2%）。

## 後台（雲端寫不了）
- `album_overrides` 有 94 張固定 m4a（優先於靜態地圖）：重貼檔 `album_overrides-repaste-preview-popular-20261105.json` 64 張；22 張已是最紅那首；8 張查不到所屬 collection 維持原樣（見 `repaste-log.txt`）。
- 820 張固定 YouTube 連結目前本來就不播，未動。
