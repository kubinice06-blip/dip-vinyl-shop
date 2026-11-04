# ax10 策展派工（異端／流亡新上架：英語圈地下 hardcore／punk；2026-11-04）

先完整讀 `batch-progress/apex-new-20261104/CUR-DISPATCH-AX.md`（格式、去重、身分、證據規矩照它），再照本檔。衝突時以本檔為準。

## 店主 2026-11-04

「繼續補，繼續查，應該還有地下冷門 hardcore punk 可以找。」本工作階段（ax10）只管**美國、加拿大、英國、愛爾蘭、澳洲、紐西蘭**的藝人；日本、亞洲、歐陸、拉美歸另一個工作階段（ax9），**不要提**（Lärm、Gauze、Gism、Disclose、Anti Cimex、Crude SS、Mob 47、Agathocles、Cripple Bastards 這類都不是你的）。

## 標準（ALBUM_ONBOARDING §3 異端段＋店主放寬）

- **異端 heresy**：可信來源**描述出具體、持續整張的高強度聽感**就收。套到 hardcore 是：noise punk（失真糊成一片、回授不斷）、早期 thrashcore／powerviolence 的極速與暴烈（整張 blast、歌長幾十秒、突兀急停急轉）、noisecore（不成曲的噪音轟炸、幾百軌）、chaos punk（混亂、失控、錄音糊爛）。**一般結構清楚、旋律明確、副歌朗朗上口的 hardcore 不收**（youth crew、NYHC、melodic、一般 d-beat、一般碾核都不收）。描述要具體（多快、多短、多糊、有沒有曲式），不要求樂評下「極端」結論。
- **流亡 pearl**（可改設）：冷門到 Last.fm listeners 有效值 **1–299**（worker：`curl -s -A 'dip-vinyl-shop/1.0 (+https://dipvinyl.tw)' "https://dip-vinyl-worker.kubinice06.workers.dev/album-rating?artist=…&album=…"` 取 `_listeners`；拿不到就不是流亡）、冷門度 5（私壓／自資／極小廠，沒有串流再發）、非錯配（`_listeners` 對的是同一張）。同一藝人異端／流亡可跨級，**同級只一張**。`apexTier` 填 `pearl` 並填 `listeners`。
- 證據：每張至少 2 個不同網域的 https，其中至少 1 個可信（樂評、專書如《American Hardcore》、Maximum Rocknroll／Profane Existence 等誌的訪談或評論、AllMusic、Trouser Press、Decibel、Terrorizer、Pitchfork、Quietus、Invisible Oranges、有引註維基、廠牌說明當輔證）。Discogs 風格標籤、RYM、純零售文案不算描述。

## 收什麼型態

- MB primary-type `Album` 照收。
- **`hardcore-7inch` 例外**（ALBUM_ONBOARDING §5.5）：**1980–90 年代** hardcore／punk 的 **7 吋 EP、split、demo 卡帶**可以收——這一路最極端的錄音很多根本沒有 LP。提名時在 `releaseException` 寫 `hardcore-7inch：<一句說明為何是該團代表實體>`，`uncertain` 註明 MB 的 primary-type（EP／Single／Other）。2000 年後的 EP 不適用。
- 合輯：只在「唯一可得形態」（團的錄音只以 discography 合輯流通、或 demo＋EP 彙整是公認入口）時收，`releaseException` 寫 `compilation：…`。同一批錄音若有原版 7 吋就提原版。
- 每位藝人一張：挑最極端（異端）或最冷門（流亡）的那張。

## 去重

每位候選先跑 `node batch-progress/add-20261104-ax10/chk-artist.mjs "原文名" "別名"`。輸出 `0` 才可提；明顯假陽性（例：查 `Siege` 撞到別的團名子字串）寫進 `uncertain` 說明。卡池已有卡的藝人**不要提**（另由主線考慮升格）。也 grep `batch-progress/mood-cells-20261022/curation-ax*.json`，別組已提過的不要重複（Seven Minutes of Nausea、Sore Throat 曾被 ax6／ax8 判 none——**Seven Minutes of Nausea 這次可以照 hardcore-7inch 例外重提**，ax8 汰它是因為 7 吋不是專輯）。

## 分組（派工訊息會告訴你組別）

| 組 | 範圍 | 提名 |
|---|---|---:|
| ax10a | **美國、加拿大**：Siege（《Drop Dead》demo／7 吋）、Infest、Neanderthal（不是 split 那張；卡池已有 `Rorschach / Neanderthal` split，Neanderthal 本人另鍵）、Crossed Out、No Comment、Man Is the Bastard、Septic Death、Deep Wound、Void（Faith／Void split 的 Void 面或其錄音）、Charles Bronson、Spazz、Despise You、Drop Dead、Capitalist Casualties、Lack of Interest、Hellnation、Neos（加拿大）、The Endless Blockade（加拿大）、Iron Lung、Gasp、Asshole Parade、Siege 同期 Boston thrash（Jerry's Kids 不收，結構清楚）。再自己找 noise punk／chaos punk／noisecore 的美加冷門錄音 | 14 |
| ax10b | **英國、愛爾蘭、澳洲、紐西蘭**：Chaos UK（《Short Sharp Shock》等最糊爛的一張）、Disorder、Heresy、Concrete Sox、Extreme Noise Terror、Electro Hippies、Ripcord、Doom、Deviated Instinct、Hellbastard、Lost Cherrees／Asylum 這類 UK noise punk、The Stupids、Sore Throat（只在有新可信來源時）、Discharge 周邊（Discharge 本人卡池已有，不提；可找 The Varukers 之外更糊爛的 Discharge 派）；澳洲 Seven Minutes of Nausea、Depression、紐西蘭／愛爾蘭任何極端地下 hardcore／noise punk。再自己找 | 14 |

## 規矩

- WebSearch **每組最多 10 次**（整個工作階段共用 200 次）。多用 MB API（`https://musicbrainz.org/ws/2/...&fmt=json`）、Discogs API（`https://api.discogs.com/...`）、iTunes Search API、維基 raw（`index.php?action=raw`）、WebFetch 讀樂評頁。
- 任何 HTTP 請求 User-Agent 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，**不得含 email**。MB 每秒 1 次，503 等 2 秒重試。
- 照 `batch-progress/apex-new-20261104/RES-RULES-CLOUD.md`：不 cd 到工作目錄以外，Bash 保持單純。輔助腳本放 `batch-progress/add-20261104-ax10/tmp-<組>/`（交件前刪掉）。
- 封面來源必填（CAA／Apple／Discogs release id／Bandcamp），找不到封面就不提。
- `why` 寫出具體聽感（歌多長、多快、怎麼錄、有沒有曲式）＋可信出處是誰；`apexWhy` 一句話。`genres` 一律 `["rock"]`（noisecore 可加 `"electronic"` 不必）。
- 輸出：`batch-progress/mood-cells-20261022/curation-<組>.json`（格式照 CUR-DISPATCH-AX），`apexTier` 填 `heresy` 或 `pearl`。
- **每做完 3 張就把整個檔寫進輸出檔；輸出檔已有內容就讀進來接續補完，不要重寫。**
- 不要 git add／commit，不改其他檔案。
- 回報 10 行內：張數（heresy／pearl）、Album／7 吋例外／合輯各幾張、MB／人工身分各幾張、哪幾張依據偏薄。
