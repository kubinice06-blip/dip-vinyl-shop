# add-20261022-ml3 裁定（情緒薄格策展線・恍惚：beats／lo-fi hip-hop／dusty 地下饒舌）

> 店主 2026-10-22「新增的專輯數太少了 與雀躍嚴重不平衡」→ 三格各補到約 2,000；交接 `batch-progress/HANDOFF-mood-cells-line.md`、場景 `batch-progress/mood-cells-20261022/SCENES.md`。目標格：**恍惚＝靜（x<3.0）＋重（y≥+0.5）＋暖（z≥0）**；策展邊距 x ≤ 2.7、y ≥ +0.8、z ≥ +0.3。
> 策展：`curation-ml3.json`（兩輪共 36 張：beat-tape 19、dusty-rap 17）→ `master-ml3.json`（MB 回查 36/36 釘住、人工 0）→ `pick.json`（32）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261022-ml3-cards.json`（32 張；研究 a–d 各 7、e 4）。身分：MB 釘住 32、§1 人工 0。
> **預留：研究 a 14161–14170、b 14171–14180、c 14181–14190、d 14191–14200、e 14201–14210、鉤子 14211–14220、寫作 14221–14230、主線 14231–14240。**
---

## 主線策展（不佔條號）
- **場景挖不到 45 張，照實上 32**（不湊數）：Nujabes、Dilla 全目錄、Madvillainy、Slum Village、Knxwledge《Hud Dreems》、Teebs《Ardour》、Earl、MIKE 多張已在池；乾淨的 jazzy chillhop（Fat Jon、Teebs、Shigeto、Uyama Hiroto、Hydeout 系、Curren$y、Larry June）池中同類評分 y 0.5–0.7，過不了 y 邊距，策展層整類不提；DJ Cam 池中 z −0.4。
- 36 張全過 moodGuess 邊距檢查（x 1.9–2.6、y 1.0–1.3、z 0.5–1.3）。主線再用**池中同藝人既有評分**（`data/mood/card-moods-v0.json`）比對，汰 4 張：
  - Apollo Brown《The Reset》：同人《Clouds》z 0.4、估 z 0.5，色溫貼邊。
  - Medhane《Cold Water》：MIKE 圈池中 z 0–0.6，同人兩張只留較暖的《Own Pace》。
  - Isaiah Rashad《Cilvia Demo》：同人池中兩張 y 0.9／z 0.3–0.6，兩軸都貼邊。
  - MIKE, Wiki & The Alchemist《Faith Is a Rock》：Alchemist 迴圈偏冷偏乾，色溫存疑。
- 留下的邊緣張（研究層要寫聲音事實）：Illa J《Yancey Boys》（x 2.6）、Onra & Quetzal《Tribute》（x 2.6）、Pink Siifu《GUMBO'!》（x 2.5）、Navy Blue《Memoirs in Armour》、Knxwledge《Klouds》、Georgia Anne Muldrow《Olesi》、Medhane《Own Pace》（z 0.5）。
- L'Orange《The Orchid Days》年份照 MB 2014（策展層疑有更早自發版，研究層核）。

## 研究 e 組
- 14201：Muldrow《Olesi》核對 MB／Stones Throw 頁，身分成立；21 首多為兩分鐘片段、曲風跳動，標 moodGuess 存疑（y 持續度）。
- 14202：Liv.e 錄音地實為聖路易母親家臥室（非達拉斯，達拉斯為出身）；20 首起伏大、有突然變速，標 moodGuess 存疑（x 偏高、低頻厚度無來源）。
- 14203：Medhane《Own Pace》推翻策展層「MIKE 等人製作」——MIKE 僅客串〈Looking 4 Runtz〉；自發無廠牌；低頻與 dusty 程度無來源，標 moodGuess 存疑（z 貼邊）。status partial。
- 14204：Pink Siifu《GUMBO’!》聲音事實偏薄（僅知 neo-soul＋trap 元素、製作人雜），標 moodGuess 存疑（x、y 皆無直接來源），建議汰換或以實際評分為準。status thin。
- 14205：WebSearch 3 次用於 Muldrow、Medhane、Liv.e；Pitchfork／AllMusic／AOTY 皆擋，未取得全文。
