# add-20261023-mc39 裁定（情緒薄格策展線・冷冽：自由爵士管樂獨奏與二重奏＋管樂／打擊輕編制）

> 店主 2026-10-23「三個情緒薄格各補到約 2,000；收窄到大場景、3 個工作階段並行」第 11 輪，本工作階段負責 ml52、mc39（評分照 10-23 體感標準）。場景與條號 `batch-progress/mood-cells-20261022/SCENES.md`（mc39 列；可擴寫：mc31 AACM／loft 小編制剩餘、mc22 原聲小編制），交接 `batch-progress/HANDOFF-mood-cells-line.md`。目標格：**冷冽＝躁（x≥3.0）＋輕（y<0.5）＋冷（z<0）**；策展邊距 x≥3.3、y≤0.2、z≤−0.3。
> 策展：`curation-mc39.json`（54）→ 主線汰 0（`master-override-mc39.json` 空）→ `master-mc39.json`（MB 回查 54/54 釘住、人工 0；flag 2 見下）→ `pick.json`（45，候補 9）→ `build-cards.mjs`。
> 本批卡單：`desc-tools/batches/cards/add-20261023-mc39-cards.json`（45 張；研究 a–e 各 9）。身分：MB 釘住 45、§1 人工 0。
> **預留：研究 a 20681–20690、b 20691–20700、c 20701–20710、d 20711–20720、e 20721–20730、鉤子 20731–20740、寫作 20741–20750、主線 20751–20760。**
---

## 主線策展（不佔條號）
- 策展 54（管樂獨奏 22、無鼓二重奏＋少數室內三重奏 24、管樂＋打擊輕編制 8）；moodGuess x 3.3–3.8、y −1.0～+0.1、z −1.8～−1.0。策展端已剔除約 30 張現場盤；去重 seed 與所有 curation-*.json 0 撞。
- **候補 9（不入 pick）**：Steve Lacy《Straws》《Hocus Pocus》（池中 Lacy 獨奏 x 3.0–3.2 貼線、主題有輪廓）、Butcher／Durrant／Lee《Intentions》（安靜段多，x 貼邊）、Roscoe Mitchell《Solo [3]》（2 首現場＋長笛段偏靜；池中 Mitchell x 3.0–3.2）、Vandermark《Furniture Music》（5 首現場）、Brötzmann《14 Love Poems》（Lonely Woman 主題旋律清楚，z 風險）、Gustafsson／Guy／Lovens《Mouth Eating Trees》（低音提琴＋鼓，y 風險）、Wadada & Moholo《Ancestors》（鼓推力強）、Voigt & Braxton《Kol Nidre》（拉格泰姆末曲）。
- **MB flag**：Lacy《Hocus Pocus》MB rg 日期為 2008 再版（已移候補）；McPhee & Heward《Voices》MB 無日期，策展 2008，研究層核對。
- 研究層請核：Braxton／Larner（Crowell Concert Hall）、Parker／Lewis（Art Workers' Guild）、Butcher／Graewe（Akademie der Künste）是否公開演出；Mitchell《Sound Songs》、Butcher／Minton《Apples of Gomorrah》部分曲目現場的比例。

## 研究 e 組
- 20721：9 張全為錄音室錄音（Discogs 記事／評述可證），無現場、無多軌疊錄；Fuchs《So - und? So!》為 FMP 錄音室單人獨奏（1985-06-15–17）。
- 20722：Perelman／Mahall《Kindred Spirits》策展層寫「雙簧管」為誤植，實為次中音薩克斯風＋低音單簧管；寫作層勿寫雙簧管。
- 20723：Perelman／Shipp《Art of the Duet》《Callas》評述皆指克制安靜、非尖叫轟炸；《Corpo》動態大（耳語、抒情、稀疏段、尖鳴並存）；moodGuess 存疑：x 恐偏低（Art of the Duet、Callas 明顯，Corpo 部分）。Callas z 也可能偏暖。
- 20724：Wadada Smith／Golia／Turetzky《Prataksis》評述「安靜的傑作、通透」，木質管樂（杜杜克、英國管、篠笛）偏暖；moodGuess 存疑：x 偏低、z 恐不夠冷。
- 20725：Perelman／Maneri《Two Men Walking》兩線同步纏繞、未見尖叫描述；moodGuess 存疑：x 或偏低。微分音未取得來源，不寫。
- 20726：Vandermark《Collected Fiction》評述含兇猛、bop、很克制三種；moodGuess 存疑：x、z 皆可能偏離。錄音師 Bob Weston 僅出自搜尋摘要（AAJ 403），不寫；Discogs 第 2-7 與 2-11 同名〈Torus IV〉疑為登錄錯誤；「少量作曲主題」無來源。
- 20727：Rothenberg／Feldman／Courvoisier《In Cahoots》錄音室（Studio Lulu）、全即興、無鼓無貝斯；細線室內樂，moodGuess 存疑：x 恐偏低。
- 20728：Fuchs 出生資料只有 Squid's Ear 摘要一處（頁面 403），status 標 thin；本盤無直接評述，聲音為樂器與同人另一張 FMP 專輯評述的間接推論。

## 研究 d 組（20711–20720）
- **20711**　McPhee & Heward《Voices》：Discogs／Mode 官頁皆 2008（MB rg 無日期），年份照策展；錄音 2006-06-15/16 The Pines, Montreal，錄音室二重奏、非現場。moodGuess 存疑：樂評一致形容飄、空靈、克制、氣音與輕敲（卡林巴、水碗），僅第三段強力對話，躁度可能不到 x 3.0，屬稀疏留白型；請主線聽感評分，必要時汰換。薩克斯風種類 Mode 寫中音、Free Jazz Blog 寫高音，facts 採中音。
- **20712**　Gustafsson《Parrot Fish Eye》：推翻策展 scene：前 8 首是對打擊樂（Zerang）二重奏、後 5 首與低音單簧管＋吉他／手風琴／打擊三重奏，並非無鼓純管樂二重奏；moodGuess 存疑（有打擊推進、音色層次多）。錄音室（Sparrow Sound, 1994-10）非現場。樂評原文全無，status thin。
- **20713**　Gustafsson《Impropositions》：1996-06 斯德哥爾摩 Radiohuset Studio 2 雙軌錄音，非現場；樂器含 alto flute／flageolet／fluteophone，並非全薩克斯風尖嘯。不得寫『無疊錄』（記事只寫 20-bit two track）。樂評原文全無，status thin，聲音預估無法證實。
- **20714**　Gustafsson & Guy《Frogging》：Maya 官網證實 1997-06-19 AirWave Studios 錄音室一個下午，非現場（前一晚 WNUR 電台現場是另一場）。樂評：身體感強、緊張、不吵、無旋律主題；與預估大致相符，y（輕）取決低音提琴低頻份量，輕度存疑。
- **20715**　Rothenberg《Trials of the Argo》：1980–81 紐約錄音室，單人中音薩克斯風，記事明寫原聲即時、無磁帶／電子加工；兩首各約 20 分鐘長篇。樂評無，status thin，緊繃或留白無從驗證。
- **20716**　Rothenberg《Trespass》：推翻策展層：Discogs 無尺八，但多列 John Zorn（中音薩克斯風）→ 至少部分為二重奏而非純獨奏；moodGuess 存疑（獨奏假設與尺八假設皆不成立）。Zorn 出現在哪幾首未能確認。status thin。
- **20717**　Rothenberg《The Crux》：封底原文『direct to 2-track digital, no overdubbing』，可寫無疊錄；Brooklyn 錄音室非現場。moodGuess 輕度存疑：〈Maceo〉〈Epistrophical Notions〉致意放克／Monk 可能帶律動與旋律輪廓，尺八段（〈Sokaku Reibo〉11 分＋〈Do Omoi〉）約 1/3，躁度可能被拉低。
- **20718**　Rothenberg《Intervals》：雙 CD 19 首（尺八／單簧管／低音單簧管 11＋中音薩克斯風 8）約兩小時；2001 錄、2002 發行（Discogs／MB），官網寫 2001 為錄音年。moodGuess 存疑：曲名標〈Melody Won/Too〉、〈T.C.〉悼念曲；Ned 自述受尺八本曲靜默與空間啟發，稀疏留白型證據，躁度可能低於預估。
- **20719**　Rothenberg《World of Odd Harmonics》：全是單簧管與低音單簧管（無薩克斯風）；錄於 Academy of Arts and Letters，有無觀眾未證實，Discogs 無 Live，有 Edited／Mixed By，**不寫『無疊錄』**；樂評稱有穩定脈動、響亮有力段、結尾像合成器，並非稀疏留白，躁度成立但音色未必尖細。
- **20720**　預留未用。本組 WebSearch 用 3 次（Odd Harmonics、Frogging、Voices）；AAJ、AllMusic、Squidco、Discogs 網頁均 403，引言多轉自 Mode／Maya／Ned 官網，非原文。
