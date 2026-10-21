# 細項太少的類別：掃描與補充計畫（2026-10-20 雲端草擬）

店主 2026-10-20：「我有增加很多類別細項，幫我掃描一下細項是否有些太少，比如越南搖滾只有一張；太少的策展增加卡池。」
本檔是掃描結果與計畫；未動卡池、未開策展代理。腳本在 scratchpad（`gt-dump.mjs` 複製自 `scripts/build-genre-tree.mjs` 加列印、`realcount*.mjs`）。

## 0. 結論

- 類型挑片樹 308 個葉節點，**32 個少於 20 張**；另有 **14 個定義了但低於門檻、前台看不到**（例：日系電子 1、Soul Blues 3、衣索比亞 2、澀谷系 4、Tango 4、土耳其 5、波斯 5）。
- 這 46 個裡**大約一半不是池裡沒卡，是標籤沒對上**：節點只看 Last.fm 標籤，標籤沒寫「chicago soul」「power pop」的卡就進不來。例：Chicago Soul 節點 15 張，池裡 Curtis Mayfield 11、The Impressions 11、Staple Singers 16、Leroy Hutson 8；日系電子節點 1 張，池裡電気グルーヴ 9、Ryoji Ikeda 10、坂本龍一 11、Rei Harakami 5。這一半用**藝人級對照表補標**就好，零上架、半天。
- 另一半是**真的缺卡**：東南亞與南亞搖滾、剛果 soukous、Fado／Flamenco／Tango、Neofolk、Psy‑trance、New Orleans bounce、亞洲與法語嘻哈的深度、衣索比亞。建議 **6 批 × 45 張**策展。

## 1. 掃描結果

### 1.1 甲類：補標就好（池中已有足夠的卡）

| 節點 | 節點張數 | 池中估計 | 例 |
|---|---:|---:|---|
| 電子 › 日系電子（隱藏） | 1 | 100+ | 電気グルーヴ 9、Ryoji Ikeda 10、坂本龍一 11、細野晴臣 8、清水靖晃 5、Rei Harakami 5、Susumu Yokota 5、DJ Krush 9 |
| 藍調 › Soul Blues（隱藏） | 3 | 100+ | Bobby Bland 6、Johnnie Taylor 8、Little Milton 4、Z.Z. Hill 3、Denise LaSalle 3、Latimore 2、O.V. Wright 7、Ann Peebles 8 |
| 靈魂 › Chicago Soul | 15 | 80+ | Curtis Mayfield 11、The Impressions 11、Jerry Butler 4、Chi‑Lites 3、Tyrone Davis 3、Syl Johnson 6、Leroy Hutson 8、Staple Singers 16 |
| 電子 › Industrial Rock / Metal | 12 | 70+ | Nine Inch Nails 6、Ministry 5、Skinny Puppy 11、Einstürzende Neubauten 9、Laibach 5、Rammstein 4、Marilyn Manson 5 |
| 民謠 › Lo‑fi / Slowcore | 19 | 100+ | Elliott Smith 6、Red House Painters 4、Songs: Ohia 3、Smog 3、Low 6、Grouper 4、Sparklehorse 2 |
| 民謠 › 英倫迷幻 | 18 | 80+ | Incredible String Band 3、Pentangle 5、Fairport 6、Shirley Collins 6、Bert Jansch 6、Spirogyra 3、Dando Shaft 3 |
| 民謠 › 創作歌手 › 拉丁美洲 | 19 | 80 | Silvio Rodríguez 5、Caetano 4、Chico Buarque 3、Spinetta 2、Charly García 2、Mercedes Sosa 5、Marisa Monte 4 |
| 民謠 › 拉丁美洲新歌謠（隱藏） | 18 | 49 | Violeta Parra 3、Víctor Jara 5、Inti‑Illimani 4、Quilapayún 4、Los Jaivas 3 |
| 流行 › 合成器流行 › 日韓 | 13 | 100+ | YMO 7、中森明菜 7、宇多田ヒカル 6、BTS 8、SHINee 5、f(x) 4、Red Velvet 4、TOWA TEI 7 |
| 流行 › Power Pop | 13 | 60+ | Big Star 3、Todd Rundgren 5、XTC 5、Teenage Fanclub 2、Cheap Trick 2、The Cars 3、Squeeze、Raspberries、Badfinger |
| 流行 › 動畫與遊戲（隱藏） | 11 | 70 | 久石譲 14、菅野よう子 10、梶浦由記 6、植松伸夫 5、鷺巣詩郎 4、光田康典 3 |
| 流行 › 澀谷系（隱藏） | 4 | 25 | Pizzicato Five 3、Flipper's Guitar 2、Cornelius 4、TOWA TEI 7、小沢健二、カヒミ・カリィ |
| 世界 › 南部非洲 | 19 | 54 | Abdullah Ibrahim 18、Miriam Makeba 5、Ladysmith 4、Mapfumo 3、Nduduzo Makhathini 4、Brotherhood of Breath 3 |
| 世界 › 土耳其（隱藏） | 5 | ~40 | Selda 5、Erkin Koray 3、Barış Manço 3、Cem Karaca 3、Moğollar 3、Ruhi Su 4、Orhan Gencebay 3、Neşet Ertaş 3 |
| 世界 › 波斯與蘇菲（隱藏） | 5 | ~35 | Googoosh 4、Nusrat 6、Shajarian／Alizadeh／Kalhor 5、Kourosh Yaghmaei 2、Ebi 2 |
| 世界 › 北非 / Raï（隱藏） | 7 | ~25 | Khaled 3、Rachid Taha 2、Cheikha Rimitti、Souad Massi 2、Nass El Ghiwane 2、Idir 2 |
| 藍調 › 沙漠藍調 | 14 | 31 | Tinariwen 7、Mdou Moctar 4、Bombino 4、Ali Farka Touré 7、Songhoy Blues 3 |
| 古典 › 音樂劇 | 19 | 45 | Sondheim 4、Lerner & Loewe 3、Rodgers & Hammerstein 3、Lloyd Webber 4、Galt MacDermot 2 |
| 電子 › UK Garage | 14 | ~25 | The Streets 4、MJ Cole、Artful Dodger、Todd Edwards、Zed Bias、El‑B、Horsepower Productions |
| 世界 › Lovers Rock | 10 | ~25 | Janet Kay、Carroll Thompson、Dennis Bovell、Matumbi、Gregory Isaacs 3、Sugar Minott 2、Aswad 2 |

做法：`build-genre-tree.mjs` 已有藝人級覆寫（`artistMap`），但目前**只在卡片沒落到任何節點時**才用。改成「藝人在對照表裡就加掛該第三層」，對照表照上表逐位列（各桶 20–60 位，主線查證、照 2026-10 搖滾對照表的做法）。重建後這 20 個節點預估全數過 20 張，**零上架**。

### 1.2 乙類：真的缺卡

| 節點 | 節點張數 | 池中實際 | 缺什麼 |
|---|---:|---:|---|
| 日亞搖滾 › 越南 | 1 | 1（另有 70 年代西貢流行／Shotguns 合輯，非搖滾） | 西貢 60–70 年代搖滾樂隊、1990s–2020s 越南搖滾與獨立 |
| › 泰國 | 4 | ~10 | Carabao／Caravan 之外的 phleng phuea chiwit、泰國獨立 |
| › 菲律賓 | 8 | 8 | Pinoy rock 正典（Asin、Hotdog、Rivermaya、Wolfgang、Up Dharma Down…） |
| › 馬來西亞 | 6 | 6 | 80–90s Malaysian rock、pop yeh‑yeh、新世代 |
| › 新加坡／柬埔寨／巴基斯坦 | 1／2／1 | 同 | 新加坡 60s 樂隊、柬埔寨 60–70 年代搖滾、巴基斯坦 Sufi rock |
| › 印度／蒙古（隱藏） | 0／0 | 0 | 印度獨立搖滾、蒙古搖滾 |
| 世界 › 剛果 Soukous / Rumba | 10 | ~18 | Franco／Tabu Ley 之外的正典（Zaiko、Papa Wemba 全盛、Kanda Bongo Man、Pepe Kalle、Sam Mangwana） |
| 世界 › 衣索比亞（隱藏） | 2 | ~20 | Éthiopiques 系列正典、Tlahoun、Alemayehu Eshete、Getatchew Mekurya |
| 世界 › Fado | 12 | ~16 | Camané、Cristina Branco、Mísia、Carminho、Alfredo Marceneiro、Argentina Santos |
| 世界 › Flamenco | 17 | ~23 | Lole y Manuel、Ketama、Pata Negra、Morente 個人盤、Diego el Cigala、Mayte Martín |
| 世界 › Tango（隱藏） | 4 | ~8 | Gardel、Troilo、Pugliese、D'Arienzo、Di Sarli、Goyeneche、Salgán |
| 世界 › 巴爾幹 / Klezmer | 12 | ~25 | 標籤補一半；另缺 Le Mystère des Voix Bulgares、Naftule Brandwein、Romica Puceanu |
| 民謠 › Neofolk / Dark Folk | 12 | ~20 | Death in June、Sol Invictus、Forseti、Of the Wand & the Moon、Tenhi、Heilung |
| 電子 › Psy / Goa | 14 | ~12 | Infected Mushroom、Hallucinogen 之外的 Goa 正典、psy‑dub、Shpongle 以外的 psybient |
| 嘻哈 › New Orleans / Bounce | 16 | ~24 | Big Freedia、DJ Jubilee、Soulja Slim、Magnolia Shorty、Partners‑N‑Crime、Mia X |
| 嘻哈 › Cloud / Emo Rap | 19 | ~25 | Bladee／Drain Gang、$uicideboy$、Bones、Spaceghostpurrp、Lil B |
| 嘻哈 › 台灣與華語 | 10 | ~40（補標可過 20） | 再補：國蛋、熊仔、ØZI、高爾宣、參劈、葛仲珊、壞特、中國的 Higher Brothers、GAI、謝帝 |
| 嘻哈 › 韓國 | 11 | ~25（補標可過 20） | 再補：Dok2／The Quiett、Simon Dominic、Loopy、Changmo、BewhY、Leessang、Paloalto、Deepflow |
| 嘻哈 › 法語嘻哈 | 10 | ~20 | Oxmo Puccino、Lunatic、Fonky Family、Assassin、Damso、Lomepal、Laylow、Alpha Wann |
| 搖滾 › 老搖滾 › 50 年代 | 14 | 14（年份桶；池中 Elvis 等多是精選或晚年） | 50 年代原盤：Elvis 1956、Here's Little Richard、Chuck Berry Is on Top、The "Chirping" Crickets… |
| 靈魂 › 50s R&B / Doo‑wop | 15 | ~25 | 正典群組多半只有 1 張：Drifters、Clovers、Penguins、Five Satins、Orioles、Ravens |

## 2. 策展計畫（乙類，6 批 × 45 張）

批名前綴 **ts**（thin subgenre），例 `add-2026MMDD-ts1`。

| 批 | 內容 | 張 |
|---|---|---:|
| ts1 | **東南亞搖滾**：越南 10（西貢 60–70 年代 CBC Band、The Black Caps、Uptight、Phượng Hoàng、Lê Uyên Phương；90s 起 Bức Tường、Microwave、Ngọt、Cá Hồi Hoang、Chillies）、泰國 10、菲律賓 10、馬來西亞 8、新加坡 4、柬埔寨 3 | 45 |
| ts2 | **南亞與內亞搖滾＋東南亞第二輪**：巴基斯坦 8（Vital Signs、Strings、Noori、Entity Paradigm、Mekaal Hasan）、印度 8（Indian Ocean、Parikrama、Avial、Peter Cat Recording）、蒙古 4（The Hu、Haranga、Hurd）、孟加拉 4、印尼補 6、ts1 的備選 15 | 45 |
| ts3 | **非洲**：剛果 soukous／rumba 20、衣索比亞 15、南部非洲 township jazz／mbaqanga 10 | 45 |
| ts4 | **地中海與拉丁傳統**：Fado 12、Flamenco 12、Tango 12、巴爾幹／Klezmer 9 | 45 |
| ts5 | **嘻哈深度**：台灣與華語 12、韓國 10、法語 10、New Orleans bounce 7、Cloud／emo rap 6 | 45 |
| ts6 | **其他薄節點**：Neofolk 12、Psy／Goa 12、50 年代搖滾原盤 11、Doo‑wop 原盤 10 | 45 |

每批照 `batch-progress/HANDOFF-downtempo-line.md` 第二節的流程（研究 5 支、鉤子 2 支、寫作 2 支、主線審稿、寫入、子曲風 `--pull`、藝人介紹 §11），上線當天補情緒評分（照 `EXPANSION-PLAN-mood-thin-cells.md` §3）。
已知難處：越南、柬埔寨、巴基斯坦的 MB 身分與封面少，§1 人工身分路線會多；亞洲老唱片情緒評分把握度低，主線要盯。

## 3. 順序

1. **先補標（甲類）**：改 `build-genre-tree.mjs` 的覆寫邏輯＋對照表，重建樹。半天、零上架，20 個節點立刻過門檻；也讓乙類的缺口數字更準。
2. **再策展 ts1 → ts6**。店主點名越南，ts1 先跑。
3. 情緒三格計畫（`EXPANSION-PLAN-mood-thin-cells.md`）排在這之後；ts 批裡的 dark folk、darkwave 類候選會同時補到頹靡。
