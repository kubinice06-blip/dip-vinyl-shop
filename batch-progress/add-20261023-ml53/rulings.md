# add-20261023-ml53 裁定（情緒薄格策展線・恍惚：爵士人聲 torch song／深夜 ballad 二線＋alt R&B 霧暖二線＋日本 neo-soul＋vocal dub／downtempo）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 12 輪，本工作階段負責 ml53、mc40（評分照 10-23 體感標準）；店主 10-23「恍惚可以多增加一點 downtempo 與 dub 這類的」。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（ml53 列；可擴寫：downtempo／vocal dub、ml22 日本 neo-soul、ml8 alt R&B、ml27），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ 0.8、z ≥ 0.3。
> 策展：`curation-ml53.json`（兩輪 19＋9＝28）→ 主線汰 0、更正 1（`master-override-ml53.json`）→ `master-ml53.json`（MB 回查 28/28 釘住、人工 0；flag 1 見下）→ `pick.json`（28，無候補）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-ml53-cards.json`（28 張；研究 a–d 各 6、e 4）。身分：MB 釘住 28、§1 人工 0。
> **預留：研究 a 20761–20770、b 20771–20780、c 20781–20790、d 20791–20800、e 20801–20810、鉤子 20811–20820、寫作 20821–20830、主線 20831–20840。**
---

## 主線策展（不佔條號）
- 策展兩輪 28：torch-thick 5（Anita Baker、Kem、Lalah、Malia & Boris Blank、Meshell）、torch-downtempo 4（Vanessa Daou、Meshell、One Dove、UA）、alt R&B 霧暖 10、日本 neo-soul 2（mabanua、Kan Sano）、vocal dub／roots 6、downtempo 1（Moodswings）；moodGuess 全過邊距（x 1.9–2.6、y 0.8–1.2、z 0.4–1.4）。去重：seed 與所有 curation-*.json 0 撞。
- **主場景是死池（ml31 先例再確認）**：池中 Julie London、Billie Holiday、Sinatra、Chet Baker、McRae、Vaughan、Dusty、Etta 的 torch／with strings 盤全判輕；Larry Klein／Craig Street 型（Peyroux、Cassandra Wilson、Norah Jones、Gardot）也判輕。主場景只收得到 quiet storm 爵士靈魂（池中 Anita Baker、Kem、Lalah 同人全落恍惚 y 0.6–1.0）與 downtempo 製作的 torch 歌手。ml27 sample-based ambient pop 0 張。
- **同名拆卡**：R&B 歌手 Leon Thomas（2023《Electric Dusk》）與池中 1969 爵士歌手 Leon Thomas 不同人，照 Carl Perkins／Air (US jazz trio) 先例，後進池者掛名改「Leon Thomas (R&B)」，queryAlias 留「Leon Thomas」。
- **MB flag**：Groundation《Hebron Gate》MB 首發 2003-01-21、策展填 2002（iTunes），研究層核對年份。
- 池中同人錨點：Groundation《Dub Wars》y 1.4 z 0.5、Black Roots《Natural Reaction》y 0.7 z 0.6、Dot Allison《Afterglow》z 0.2（One Dove 色溫風險）、Meshell 同人 y 0.3–1.3 分散。

## 研究 e 組
- 20801 Little Roy《Battle for Seattle》：MB／Discogs master 378910 對得上，廠牌 Ark Recordings（ARK024CD）確認，解策展層「廠牌待確認」；原創翻唱專輯，非重發。**moodGuess 存疑**：BBC 稱 sprightly vintage rhythms、維基稱 Prince Fatty 刻意加快 tempo，可能比 x 2.4 活潑；僅〈Come as You Are〉有明確 dubby 文字。facts 10 條 full。
- 20802 Capital Letters《Headline News》：Discogs master 148734，原版 LP 10 首；iTunes 17 軌＝CD 加 12 吋曲／EP 的版本（1992 CD 13 軌、2007 CD 19 軌），上架以 1979 原版敘述。**moodGuess 存疑**：粗礪吉他與活躍打擊，無 dub 低頻證據，y 0.8 缺來源。facts 9 條 full。
- 20803 Black Roots《Black Roots》：master 547706，廠牌 Kick（KIC LP02）確認；非重發。**moodGuess 存疑**：Discogs 團介紹「militant pacifism」、色溫恐低於 z 0.7，無 dub 低頻直接證據。facts 8 條 full。
- 20804 Moodswings《Moodfood》：master 130717，原創首作。**moodGuess 存疑（策展層預警屬實）**：風格含 house／alternative dance，〈Spiritual High〉是舞曲單曲，x 可能 2.7–3.2，非「慢 ambient-dub」；主線宜汰換或實聽。facts 9 條 full。
- 本組推翻策展層：0 處年份／廠牌／盤名（廠牌兩處待確認項已解）；4 張皆有 moodGuess 存疑註記。
