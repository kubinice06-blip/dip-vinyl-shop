# ax8 策展派工（異端新上架：卡池沒有的藝人；放寬標準；2026-11-04）

先完整讀 `batch-progress/apex-new-20261104/CUR-DISPATCH-AX.md`（格式、去重、身分、證據規矩照它），再照本檔。衝突時以本檔為準。

## 標準（店主 2026-11-04「稍微放寬」）

- 收：可信來源**描述出具體、持續整張的高強度聽感**——全程無調、沒有固定節拍、集體即興密度極高、回授／失真音牆、尖叫式吹奏、超長篇不間斷、極端音量；或在噪音史上有開創地位（Russolo、Schaeffer、Group Ongaku、Lou Reed《Metal Machine Music》這類）。**不再要求樂評下「極端／刺耳」的結論，描述到位即可。**
- 不收：有清楚結構、聽得下去的前衛作品；spiritual／modal 爵士；一般碾核、技術死亡金屬；只有局部段落激烈的盤。
- 可信來源：樂評（The Wire、AllMusic、Pitchfork、Quietus、Dusted、Brainwashed、Musique Machine、Tiny Mix Tapes、Free Jazz Collective、Point of Departure、Exclaim!、Trouser Press、Decibel、Blabbermouth 等）、專書、學術、有引註維基、廠牌說明（輔證）。單一部落格不夠。

## 只收卡池沒有的藝人

每位候選先跑 `node batch-progress/add-20261104-ax8/chk-artist.mjs "原文名" "別名" "羅馬拼音"`，輸出必須是 `0`（明顯假陽性寫進 `uncertain`）。卡池已有卡的藝人歸另一個工作階段（ax7），換人。同一藝人只提一張，挑最極端／最具開創地位的代表作。也要 grep `batch-progress/mood-cells-20261022/curation-ax*.json`，ax1–ax6 已提過、已判 none 的不要再提（除非本檔點名）。

只收正規專輯（MB primary-type Album）；現場盤若是該藝人最重要的錄音可收（寫 `releaseException`）；合輯只在「唯一可得形態」時收（寫 `releaseException`，例如歷史錄音）。EP、單曲不收。古典／現代音樂照卡池慣例 artist＝演奏者（作曲家自演就寫作曲家），album＝原盤名，另填 `composer`。

## 分組（派工訊息告訴你組別）

| 組 | 方向 | 提名 |
|---|---|---:|
| ax8a | **店主附文作品＋噪音史開創**：Luigi Russolo（Intonarumori 的錄音，找正式發行的專輯，MB 鎖定；查不到 MB 就走人工身分）、Pierre Schaeffer《Cinq études de bruits》（**只查有沒有以它為主的獨立專輯發行**、MB RG 是什麼；卡池已有 Schaeffer《Musique concrète》，把那張的 MB 收錄曲目也查出來寫進 uncertain，讓主線比對）、Vomir《Proanomie》（店主點名，卡池已有 Vomir《Claustration》，這張照收）、Arseny Avraamov《Symphony of Sirens》的錄音、Gruppo di Improvvisazione Nuova Consonanza《The Feed-back》、小杉武久《Catch-Wave》、Rhys Chatham《An Angel Moves Too Fast to See》、Z'EV、NON（Boyd Rice）、Airway（LAFMS）《Live at LACE》。再補 2 張同性質（早期噪音／具象／Fluxus／聲音藝術的開創錄音） | 12 |
| ax8b | **harsh noise／power electronics／噪音（卡池沒有的）**：候選池（逐位 chk）：Ramleh、Con-Dom、Mauthausen Orchestra、Puce Mary、Knurl、Sickness、Cock E.S.P.、Jazkamer《Metal Music Machine》、Mattin、長谷川洋（Hiroshi Hasegawa 個人名義）、Torturing Nurse、李劍鴻、Anenzephalia、Bloodyminded、Slogun、Sudden Infant、遠藤一元（Kazumoto Endo）、Contagious Orgasm、Guilty Connector、Lockweld、Smell & Quim、Daniel Löwenbrück。**挑可信樂評最多的 12 張**，只有 Discogs／小站的跳過 | 12 |
| ax8c | **自由即興／自由爵士／噪音搖滾（卡池沒有的）**：浦邉雅祥（Masayoshi Urabe）、広瀬淳二、Mainliner《Mellow Out》、Caspar Brötzmann Massaker、The Flying Luttenbachers、Skullflower（挑最被描述為噪音牆的一張，例如《IIIrd Gatekeeper》；《Form Destroyer》ax6 已判 none）、Willem Breuker 早期最激烈的一張。再補 4 張卡池沒有的：高強度集體即興、尖叫式薩克斯風、日本地下噪音搖滾（High Rise、灰野、不失者、Merzbow、Borbetomagus、Last Exit、Harry Pussy、Royal Trux 都已在卡池，不可提） | 11 |
| ax8d | **極端金屬反結構／noisecore／極端電子（卡池沒有的）**：Revenge《Triumph.Genocide.Antichrist》、Profanatica、Gore Beyond Necropsy、Seven Minutes of Nausea、Alec Empire《The Destroyer》、Ove-Naxx。再補 3 張：speedcore／extratone、breakcore 最極端者、noisecore（Anal Cunt、Sarcófago、Archgoat 由主線處理，不要提） | 9 |

## 規矩

- WebSearch **每組最多 8 次**（整個工作階段共用 200 次）。多用 MB API（`https://musicbrainz.org/ws/2/...&fmt=json`）、Discogs API（`https://api.discogs.com/...`）、iTunes Search API、維基 raw（`index.php?action=raw`）、WebFetch 讀樂評頁。
- 任何 HTTP 請求 User-Agent 一律 `dip-vinyl-shop/1.0 (+https://dipvinyl.tw)`，不得含 email。MB 每秒 1 次。
- 照 `batch-progress/apex-new-20261104/RES-RULES-CLOUD.md`：不 cd 到工作目錄以外，Bash 保持單純。輔助腳本放 `batch-progress/add-20261104-ax8/tmp-<組>/`（交件前刪掉）。
- 封面來源必填（CAA／Apple／Discogs／Bandcamp），找不到封面就不提。
- `why` 寫出具體聽感特徵（多長、怎麼演奏、有沒有拍、編制）＋可信出處是誰；`apexWhy` 一句話。
- 輸出：`batch-progress/mood-cells-20261022/curation-<組>.json`（格式照 CUR-DISPATCH-AX），`apexTier` 一律 `heresy`。
- **每做完 3 張就寫進輸出檔；輸出檔已有內容就讀進來接續補完，不要重寫。**
- 不要 git add／commit，不改其他檔案。
- 回報 10 行內：張數、MB／人工身分各幾張、哪幾張依據偏薄、找不到的點名作品。
