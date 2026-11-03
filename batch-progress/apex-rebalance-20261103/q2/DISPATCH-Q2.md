# Q2 代理派工：異端／流亡擴充判定（2026-11-03）

背景：`../PLAN.md`。店主：「流亡跟異端太少了」「頂點卡每個藝人各取一張最重要的就好」。
本層**只判定、不改任何其他檔案**，不要 git add／commit。

## 先讀
- `batch-progress/audit-20261102/DISPATCH.md` 的「頂點卡定義」表（異端／流亡 7 星錨點）。
- `batch-progress/rerate-20261101/RUBRIC.md`（硬蕊度、冷門度錨點）。
- `batch-progress/rerate-20261102/RUBRIC-ADDENDUM.md`（listeners 錯配例外）。

## 異端（HS 分片）
分片是「藝人 → 候選卡」。每位藝人**最多選一張**（選他最極端／最具代表性的那張），並給：
- `score` 1–10：在**全池異端**裡的極端程度。10＝harsh noise wall、Metal Machine Music、Pulse Demon 級；7–9＝公認極端（噪音、電子原音極端作品、結構性拒斥、極端即興的里程碑）；4–6＝很前衛但聽得下去（一般自由爵士、前衛古典名作、實驗搖滾）；1–3＝不夠格。
- `verdict`：`yes`（硬蕊度 5＋可信資料支持極端前衛／噪音／結構性難入耳）／`maybe`／`no`。單純「很前衛」但聽得下去的給 `no` 或 `maybe`。
- 現有異端 54 張已涵蓋：Merzbow、Masonna、非常階段、Lou Reed MMM、Trout Mask、Residents、Galás、Scott Walker、Swans、Conrad、Coltrane Ascension、Cecil Taylor、Brötzmann、Bailey、Parker、Braxton、Zorn/Naked City、TG、Whitehouse、NWW、Neubauten、SPK、This Heat、Henry、Parmegiani、Xenakis、Stockhausen、Autechre、Ikeda、Drumm、Sunn O)))、Earth、Portal、Deathspell Omega、高柳／阿部、TNB、C.C.C.C.、Yasunao Tone。候選藝人都不在其中。

輸出 `q2/verdicts/HS<n>.json`：
```json
[{"artist":"…","key":"藝人|專輯 或 null","verdict":"yes|maybe|no","score":8,
  "why":"≤80 字中文：極端在哪、依據","evidence":["https://…","https://…"]}]
```
每位藝人一筆（不選就 key=null、verdict=no）。`yes`／`maybe` 必須有 ≥2 個真實可開的 https 網址（Wikipedia、Discogs、AllMusic、Pitchfork、The Wire、Bandcamp、廠牌頁、樂評等）；不確定網址存在就用 WebSearch 確認，**不得編造網址**。

## 流亡（PS 分片）
分片是「藝人 → 候選卡」，已附 `lst`（有效 Last.fm listeners）。每位藝人最多選一張，給：
- `scene`：從下列擇一：`日本地下`、`自由即興`、`靈性/自由爵士`、`私壓福音/靈魂`、`雷鬼/非洲/世界`、`迷幻/車庫`、`民謠/私民謠`、`前衛/德國/歐陸搖滾`、`電子/極簡/音響`、`華語`、`拉美/巴西`、`其他`。
- `score` 1–10：作為「流亡＝傳說級稀有地下名作」的強度。看：壓量有據極小、私壓／極小廠、考古廠（Light in the Attic、Numero、Trunk、Finders Keepers、Now-Again、Paradise of Bachelors、Mississippi、Superior Viaduct、EM Records、Lion Productions、Guerssen、Shadoks、Rockadelic、Analog Africa、Soundway、Strut、Honest Jon's 等）重發過、收藏圈有口碑（聖杯、天價、名作）。純粹「沒人聽」但也沒口碑的給低分。
- `verdict`：`yes`／`maybe`／`no`。**錯配一律 no**：同系列卷次、盤名寫法不同、知名盤聽眾數低到不合理（例如主流歌手、經典爵士名盤）、合輯被拆、藝人名對不上。`why` 註明。
輸出 `q2/verdicts/PS<n>.json`：
```json
[{"artist":"…","key":"藝人|專輯 或 null","verdict":"yes|maybe|no","score":7,"scene":"…",
  "why":"≤80 字中文","evidence":["https://…","https://…"]}]
```
`yes`／`maybe` 要 ≥2 個真實網址（Discogs 原盤頁、重發廠牌頁、樂評、收藏圈文章）。

## 共通
- **每做完 5 位藝人就把目前結果寫進輸出檔；輸出檔已有內容就接續，不要從頭重寫。**
- WebSearch 每支最多 25 次，用在確認依據與網址；其餘靠既有知識。
- 回報 4 行內：位數、yes/maybe/no 各幾、最強 3 張。

## 補充（流亡）
- 已在分片中的候選都已過濾成 listeners 1–299（`lst`）。你判的是「錯配」與「名作強度」。
- evidence 可用一個 Last.fm 專輯頁（`https://www.last.fm/music/<藝人>/<專輯>`，URL 編碼）證 listeners，另一個必須是原盤／重發／樂評的實質依據。
- 每片約 167 位藝人，全體目標只收約 95 張，所以 `yes` 要嚴：每片 yes 以 20–35 位為宜，寧缺勿濫；score 拉開。
- 主線會依場景平衡挑選，同場景擠太多時取 score 高者。
