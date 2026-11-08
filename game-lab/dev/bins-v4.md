# 店裡的箱子與門口牆（v4 FIXLIST 4／5：十大類＋TW＋NEW＋FEATURE／PICKS）

資料：`bins.js`（`tools/bake-cards.mjs` 從 `tools/deck-lists.json` 的 `_bins`＋`bin_<key>` 烘出；`front` 讀 `shops/dip.json` 畫出來的封面）。X／Y 契約：每一區 `{ key, label, zh, rule, pool, front }`。
檢查：`node game-lab/tools/check-covers.mjs`（每張看得到的封面符合那一區、在那一區的卡池、整家店不重複；各區卡池互不重疊、不碰牌組／禮物／特價箱／王牌／掉牌；名牌＝label、點了＝zh；卡池夠每晚上貨）。

- **分類**＝卡的**第一個曲風標籤**對到店主網站 genre-tree.json 的十大類（電子＝elec）；地區台灣一律進 TW。NEW、PICKS 不限分類；FEATURE 只放史詩＋傳奇。
- **稀有度**（CARD_GAME_DESIGN §5）：score＝經典＋硬蕊＋(冷門＝5 ? 1 : 0)；≤5 普通、6 稀有、7 獨特、8 史詩、≥9 傳奇。價格照 FIXLIST 8：普通 $800、稀有 $1,000、獨特 $1,200、史詩 $3,000、傳奇 $4,000（引擎由 X 接）。
- **每晚上貨**（引擎，X）：各區 4–6 張、NEW 4–6、PICKS 4–6、FEATURE 2–3；各區卡池互不重疊，所以同一晚全店不會重複。**正面**＝店裡畫出來、看得到的封面；其他要翻箱（抽屜）才看得到。
- **名牌**寫英文（像素字），點了掛中文全名。門口牆兩區整面都是熱點（點牆上任何地方＝翻那一區，唱片資訊在抽屜裡看）。
- **新卡**：這次加了 82 張（cards.js 207 → 289 張，原本的卡 0 變動），全部有封面與 Apple 試聽（烘焙時逐一驗過）。替換：沒有（挑的卡都烘得出來；tools/substitutions-v4.json 的 4 筆是 A3-M2 的牌組換牌）。PICKS 牆上原本擺 Miki Matsubara《Pocket Park》，封面太淡，改擺 Marcos Valle《Previsão do Tempo》（Miki 留在卡池）。

| 名牌 | 中文 | key | 位置 | 卡池 | 看得到 |
|---|---|---|---|---|---|
| JAZZ | 爵士 | `jazz` | 前排左木箱 crate-jazz | 12 | 3 |
| TW | 台灣 | `tw` | 前排右木箱 crate-tw | 12 | 3 |
| ROCK | 搖滾 | `rock` | 中島 isl-0a | 12 | 3 |
| ELEC | 電子 | `elec` | 中島 isl-0b | 12 | 3 |
| SOUL | 靈魂放克 | `soul` | 中島 isl-1a | 12 | 3 |
| HIP-HOP | 嘻哈 R&B | `hiphop` | 中島 isl-1b | 12 | 3 |
| POP | 流行 | `pop` | 中島 isl-2a | 12 | 3 |
| CLASSICAL | 古典 | `classical` | 中島 isl-2b | 12 | 3 |
| WORLD | 世界 | `world` | 中島 isl-3a | 12 | 3 |
| FOLK | 民謠 | `folk` | 中島 isl-3b | 12 | 3 |
| BLUES | 藍調 | `blues` | 後牆矮櫃 backbin | 14 | 8 |
| NEW | 新進 | `new` | 左邊木箱 crate-new（原 NOISE） | 12 | 3 |
| FEATURE | 店長推薦精選 | `feature` | 門口牆最靠門 2×2 wall-feature | 23 | 4 |
| PICKS | 店長推薦 | `picks` | 門口牆其餘 5×2 wall-picks＋櫃檯後高櫃 2＋試聽桌 1 | 21 | 13 |
| SALE | 特價區 | `sale` | 門下方左牆邊 crate-sale | 9（C.bargain） | 2 |

## JAZZ 爵士（`jazz`，前排左木箱 crate-jazz；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝爵士（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 6、普通 3、稀有 3。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | John Coltrane《Blue Train》 | 1958 | 爵士 | 其他 | 5／1／2 | 獨特 | $1,200 |
| ●2 | Miles Davis《Sketches of Spain》 | 1960 | 爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Herbie Hancock《Maiden Voyage》 | 1965 | 爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Thelonious Monk《Straight, No Chaser》 | 1967 | 爵士 | 其他 | 3／2／2 | 普通 | $800 |
|  | Kenny Drew《Everything I Love》 | 1973 | 爵士 | 其他 | 3／4／2 | 普通 | $800 |
|  | Grant Green《Feelin' the Spirit》 | 1963 | 爵士 | 其他 | 3／3／2 | 普通 | $800 |
|  | 大野雄二《Original Soundtrack from Lupin III》 | 1978 | 爵士 | 日本 | 4／4／2 | 稀有 | $1,000 |
|  | Chet Baker《She Was Too Good to Me》 | 1974 | 爵士 | 其他 | 4／2／2 | 稀有 | $1,000 |
|  | McCoy Tyner《Extensions》 | 1972 | 爵士 | 其他 | 3／3／3 | 稀有 | $1,000 |
|  | Ornette Coleman《This Is Our Music》 | 1961 | 爵士 | 其他 | 3／2／4 | 獨特 | $1,200 |
|  | Freddie Hubbard《Red Clay》 | 1970 | 爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Fela Kuti《Zombie》 | 1977 | 爵士、靈魂 | 其他 | 5／2／2 | 獨特 | $1,200 |

## TW 台灣（`tw`，前排右木箱 crate-tw；卡池 12 張、看得到 3 張）

規則：地區＝台灣（不看曲風）；稀有度＝普通／稀有／獨特。
稀有度分布：稀有 5、獨特 4、普通 3。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | 林生祥《種樹》 | 2006 | 民謠、搖滾 | 台灣 | 4／3／2 | 稀有 | $1,000 |
| ●2 | 傷心欲絕《還是偶爾想要偉大》 | 2017 | 搖滾 | 台灣 | 3／4／3 | 稀有 | $1,000 |
| ●3 | 張懸 Deserts Chang《神的遊戲》 | 2012 | 搖滾、民謠 | 台灣 | 5／2／2 | 獨特 | $1,200 |
|  | 五月天 Mayday《人生海海》 | 2001 | 搖滾、流行 | 台灣 | 5／2／1 | 稀有 | $1,000 |
|  | 蔡琴《蔡琴老歌》 | 1985 | 流行、民謠 | 台灣 | 4／5／2 | 獨特 | $1,200 |
|  | 江蕙《紅線》 | 2002 | 流行、民謠 | 台灣 | 4／5／2 | 獨特 | $1,200 |
|  | 陳珊妮《完美的呻吟》 | 2000 | 搖滾、流行 | 台灣 | 4／3／3 | 獨特 | $1,200 |
|  | 大象體操 Elephant Gym《夢境》 | 2022 | 搖滾 | 台灣 | 3／3／3 | 稀有 | $1,000 |
|  | 落日飛車 Sunset Rollercoaster《Cassa Nova》 | 2018 | 搖滾、流行 | 台灣 | 3／2／2 | 普通 | $800 |
|  | 陳建年《大地》 | 2002 | 民謠 | 台灣 | 3／4／2 | 普通 | $800 |
|  | 陳明章《戀戀風塵 電影原聲帶》 | 1993 | 民謠 | 台灣 | 4／3／2 | 稀有 | $1,000 |
|  | 宇宙人《地球漫步》 | 2012 | 搖滾、流行 | 台灣 | 4／3／1 | 普通 | $800 |

## ROCK 搖滾（`rock`，中島 isl-0a；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝搖滾（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：稀有 4、獨特 7、普通 1。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | The Rolling Stones《Some Girls》 | 1978 | 搖滾、藍調 | 其他 | 5／1／1 | 稀有 | $1,000 |
| ●2 | The Who《The Who Sell Out》 | 1967 | 搖滾 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | PJ Harvey《To Bring You My Love》 | 1995 | 搖滾、民謠 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Mogwai《Come On Die Young》 | 1999 | 搖滾、電子 | 其他 | 4／2／3 | 獨特 | $1,200 |
|  | The Smiths《Hatful of Hollow》 | 1984 | 搖滾、流行 | 其他 | 4／1／1 | 普通 | $800 |
|  | Goblin《Profondo rosso》 | 1975 | 搖滾 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | はっぴいえんど《はっぴいえんど》 | 1970 | 搖滾 | 日本 | 5／3／2 | 獨特 | $1,200 |
|  | 細野晴臣《Tropical Dandy》 | 1975 | 搖滾、民謠 | 日本 | 4／3／2 | 稀有 | $1,000 |
|  | Opeth《Morningrise》 | 1996 | 搖滾 | 其他 | 3／2／4 | 獨特 | $1,200 |
|  | Brian Eno《Taking Tiger Mountain (By Strategy)》 | 1974 | 搖滾、電子 | 其他 | 4／2／3 | 獨特 | $1,200 |
|  | Sigur Rós《Takk...》 | 2005 | 搖滾、電子 | 其他 | 4／1／2 | 稀有 | $1,000 |
|  | Radiohead《The King of Limbs》 | 2011 | 搖滾、電子 | 其他 | 3／2／3 | 稀有 | $1,000 |

## ELEC 電子（`elec`，中島 isl-0b；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝電子（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 7、普通 4、稀有 1。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Massive Attack《Mezzanine》 | 1998 | 電子 | 其他 | 5／1／2 | 獨特 | $1,200 |
| ●2 | Leftfield《Leftism》 | 1995 | 電子 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Gary Numan《The Pleasure Principle》 | 1979 | 電子、流行 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Global Communication《76:14》 | 1994 | 電子 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | Four Tet《Rounds》 | 2003 | 電子 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Ryoji Ikeda《1000 Fragments》 | 1995 | 電子 | 日本 | 3／4／4 | 獨特 | $1,200 |
|  | Venetian Snares《Detrimentalist》 | 2008 | 電子 | 其他 | 3／3／4 | 獨特 | $1,200 |
|  | Bonobo《Dial ‘M' for Monkey》 | 2003 | 電子 | 其他 | 3／4／2 | 普通 | $800 |
|  | Cliff Martinez《Drive: Original Motion Picture Soundtrack》 | 2011 | 電子 | 其他 | 4／3／2 | 稀有 | $1,000 |
|  | John Carpenter《Christine》 | 1983 | 電子 | 其他 | 3／3／2 | 普通 | $800 |
|  | The Chemical Brothers《Push the Button》 | 2004 | 電子 | 其他 | 3／1／1 | 普通 | $800 |
|  | Orbital《Blue Album》 | 2004 | 電子 | 其他 | 3／2／2 | 普通 | $800 |

## SOUL 靈魂放克（`soul`，中島 isl-1a；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝靈魂（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 4、稀有 1、普通 7。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Stevie Wonder《Innervisions》 | 1973 | 靈魂 | 其他 | 5／1／2 | 獨特 | $1,200 |
| ●2 | Sly & the Family Stone《Fresh》 | 1973 | 靈魂 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Isaac Hayes《Shaft: Music From the Soundtrack》 | 1971 | 靈魂 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Curtis Mayfield《There's No Place Like America Today》 | 1975 | 靈魂 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Bobby Womack《The Poet》 | 1981 | 靈魂 | 其他 | 4／2／2 | 稀有 | $1,000 |
|  | Marcos Valle《Garra》 | 1971 | 靈魂 | 其他 | 4／3／1 | 普通 | $800 |
|  | Alice Clark《Alice Clark》 | 1972 | 靈魂 | 其他 | 4／3／1 | 普通 | $800 |
|  | David Bowie《Young Americans》 | 1975 | 靈魂、搖滾 | 其他 | 4／2／1 | 普通 | $800 |
|  | The Doobie Brothers《Minute by Minute》 | 1978 | 靈魂、搖滾 | 其他 | 4／2／1 | 普通 | $800 |
|  | Millie Jackson《Hard Times》 | 1982 | 靈魂 | 其他 | 3／4／2 | 普通 | $800 |
|  | Roberta Flack《Born to Love》 | 1983 | 靈魂 | 其他 | 2／3／1 | 普通 | $800 |
|  | Ohio Players《Tenderness》 | 1981 | 靈魂 | 其他 | 2／4／1 | 普通 | $800 |

## HIP-HOP 嘻哈 R&B（`hiphop`，中島 isl-1b；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝嘻哈（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 4、稀有 2、普通 6。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | A Tribe Called Quest《Midnight Marauders》 | 1993 | 嘻哈、爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●2 | GZA《Liquid Swords》 | 1995 | 嘻哈 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Janet Jackson《Control》 | 1986 | 嘻哈 | 其他 | 5／1／1 | 稀有 | $1,000 |
|  | Usher《Confessions》 | 2004 | 嘻哈、流行 | 其他 | 5／1／1 | 稀有 | $1,000 |
|  | Nas《God's Son》 | 2002 | 嘻哈 | 其他 | 4／2／1 | 普通 | $800 |
|  | LL Cool J《Mama Said Knock You Out》 | 1990 | 嘻哈 | 其他 | 4／2／1 | 普通 | $800 |
|  | Nujabes / Fat Jon《samurai champloo music record: departure》 | 2004 | 嘻哈、爵士 | 其他 | 4／3／1 | 普通 | $800 |
|  | Brandy《Full Moon》 | 2002 | 嘻哈、靈魂 | 其他 | 3／2／1 | 普通 | $800 |
|  | Missy Elliott《Miss E... So Addictive》 | 2001 | 嘻哈、靈魂 | 其他 | 3／2／1 | 普通 | $800 |
|  | Dälek《Negro Necro Nekros》 | 1998 | 嘻哈、電子 | 其他 | 3／4／4 | 獨特 | $1,200 |
|  | billy woods《Church》 | 2022 | 嘻哈 | 其他 | 3／3／4 | 獨特 | $1,200 |
|  | Public Enemy《The Evil Empire of Everything》 | 2012 | 嘻哈 | 其他 | 2／3／2 | 普通 | $800 |

## POP 流行（`pop`，中島 isl-2a；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝流行（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：稀有 5、獨特 4、普通 3。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | 宇多田ヒカル《First Love》 | 1999 | 流行、嘻哈 | 日本 | 5／1／1 | 稀有 | $1,000 |
| ●2 | Big Star《Radio City》 | 1974 | 流行、搖滾 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Françoise Hardy《Tous les garçons et les filles》 | 1962 | 流行 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | XTC《Skylarking》 | 1986 | 流行、搖滾 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Scott Walker《Scott 3》 | 1969 | 流行、民謠 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Pet Shop Boys《Actually》 | 1987 | 流行、電子 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Belle and Sebastian《If You're Feeling Sinister》 | 1996 | 流行、搖滾 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | 松田聖子《風立ちぬ》 | 1981 | 流行、民謠 | 日本 | 5／2／1 | 稀有 | $1,000 |
|  | 大貫妙子《Grey Skies》 | 1976 | 流行 | 日本 | 4／3／2 | 稀有 | $1,000 |
|  | 竹内まりや《Beginning》 | 1978 | 流行 | 日本 | 3／3／1 | 普通 | $800 |
|  | 吉田美奈子《Monochrome》 | 1980 | 流行、靈魂 | 日本 | 3／3／2 | 普通 | $800 |
|  | 久石譲《となりのトトロ サウンドトラック集》 | 1988 | 流行、古典 | 日本 | 4／1／1 | 普通 | $800 |

## CLASSICAL 古典（`classical`，中島 isl-2b；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝古典（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 6、稀有 4、普通 2。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Herbert von Karajan《Beethoven: 9 Symphonies (1963)》 | 1963 | 古典 | 其他 | 5／4／2 | 獨特 | $1,200 |
| ●2 | Philip Glass《Glassworks》 | 1982 | 古典 | 其他 | 4／2／2 | 稀有 | $1,000 |
| ●3 | Erik Satie《Vexations》 | 1893 | 古典、電子 | 其他 | 3／3／4 | 獨特 | $1,200 |
|  | Glenn Gould & Leonard Bernstein《Brahms: Piano Concerto no. 1 (1962)》 | 1962 | 古典 | 其他 | 4／3／3 | 獨特 | $1,200 |
|  | Martha Argerich《Rachmaninoff: Piano Concerto no. 3》 | 1983 | 古典 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | I Musici《Vivaldi: The Four Seasons》 | 1959 | 古典 | 其他 | 5／1／1 | 稀有 | $1,000 |
|  | Arthur Rubinstein《Chopin: Nocturnes》 | 1967 | 古典 | 其他 | 5／1／1 | 稀有 | $1,000 |
|  | Penguin Cafe Orchestra《Music from the Penguin Cafe》 | 1976 | 古典、爵士 | 其他 | 4／3／2 | 稀有 | $1,000 |
|  | Einojuhani Rautavaara《Cantus Arcticus》 | 1972 | 古典 | 其他 | 5／4／2 | 獨特 | $1,200 |
|  | Rosalyn Tureck《Bach: Partitas》 | 1950 | 古典 | 其他 | 4／4／3 | 獨特 | $1,200 |
|  | Max Richter《Infra》 | 2010 | 古典、電子 | 其他 | 3／2／2 | 普通 | $800 |
|  | Julian Bream & John Williams《Together》 | 1972 | 古典 | 其他 | 4／4／1 | 普通 | $800 |

## WORLD 世界（`world`，中島 isl-3a；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝世界（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 6、稀有 4、普通 2。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | The Congos《Heart of the Congos》 | 1977 | 世界 | 其他 | 5／3／2 | 獨特 | $1,200 |
| ●2 | Cesária Évora《Miss Perfumado》 | 1992 | 世界、爵士 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●3 | Gregory Isaacs《Night Nurse》 | 1982 | 世界 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | Augustus Pablo《King Tubbys Meets Rockers Uptown》 | 1976 | 世界 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Oumou Sangaré《Moussolou》 | 1991 | 世界 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | Toumani Diabaté《Kaira》 | 1988 | 世界、爵士 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | Nass El Ghiwane《Nass El Ghiwane》 | 1973 | 世界、民謠 | 其他 | 5／4／2 | 獨特 | $1,200 |
|  | Amadou & Mariam《Dimanche à Bamako》 | 2004 | 世界 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | Jimmy Cliff《The Harder They Come》 | 1971 | 世界 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | Paco de Lucía《Almoraima》 | 1976 | 世界 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Tabu Ley Rochereau《Babeti Soukous》 | 1989 | 世界 | 其他 | 4／4／1 | 普通 | $800 |
|  | りんけんバンド《なんくる》 | 1990 | 世界、流行 | 日本 | 3／4／1 | 普通 | $800 |

## FOLK 民謠（`folk`，中島 isl-3b；卡池 12 張、看得到 3 張）

規則：第一個曲風標籤＝民謠（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 7、稀有 3、普通 2。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Bob Dylan《John Wesley Harding》 | 1967 | 民謠、搖滾 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●2 | Nico《Chelsea Girl》 | 1967 | 民謠、古典 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | Leonard Cohen《Songs from a Room》 | 1969 | 民謠 | 其他 | 4／2／2 | 稀有 | $1,000 |
|  | Gillian Welch《Time (The Revelator)》 | 2001 | 民謠 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | Bonnie "Prince" Billy《I See a Darkness》 | 1999 | 民謠、搖滾 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | Richard & Linda Thompson《Shoot Out the Lights》 | 1982 | 民謠、搖滾 | 其他 | 5／3／2 | 獨特 | $1,200 |
|  | John Prine《John Prine》 | 1971 | 民謠 | 其他 | 5／2／1 | 稀有 | $1,000 |
|  | Steeleye Span《Please to See the King》 | 1971 | 民謠 | 其他 | 4／3／2 | 稀有 | $1,000 |
|  | Judee Sill《Judee Sill》 | 1971 | 民謠 | 其他 | 4／3／1 | 普通 | $800 |
|  | Mississippi John Hurt《Last Sessions》 | 1972 | 民謠、藍調 | 其他 | 3／4／1 | 普通 | $800 |
|  | Brigitte Fontaine & Areski Belkacem《Vous et nous》 | 1977 | 民謠 | 其他 | 3／3／4 | 獨特 | $1,200 |
|  | Tenores di Bitti《S'amore 'e mama》 | 1996 | 民謠 | 其他 | 3／4／4 | 獨特 | $1,200 |

## BLUES 藍調（`blues`，後牆矮櫃 backbin；卡池 14 張、看得到 8 張）

規則：第一個曲風標籤＝藍調（地區台灣的歸 TW）；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 7、稀有 5、普通 2。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Howlin' Wolf《Howlin' Wolf》 | 1962 | 藍調 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●2 | Muddy Waters《Folk Singer》 | 1964 | 藍調 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●3 | B.B. King《Live at the Regal》 | 1965 | 藍調 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●4 | Albert King《Born Under a Bad Sign》 | 1967 | 藍調、靈魂 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●5 | Robert Johnson《The Complete Recordings》 | 1990 | 藍調、民謠 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●6 | John Lee Hooker《It Serve You Right to Suffer》 | 1966 | 藍調 | 其他 | 4／3／2 | 稀有 | $1,000 |
| ●7 | Junior Kimbrough《All Night Long》 | 1992 | 藍調 | 其他 | 5／3／2 | 獨特 | $1,200 |
| ●8 | Elmore James《The Sky Is Crying》 | 1965 | 藍調 | 其他 | 4／4／2 | 稀有 | $1,000 |
|  | Lightnin' Hopkins《Mojo Hand》 | 1962 | 藍調 | 其他 | 4／3／3 | 獨特 | $1,200 |
|  | Hound Dog Taylor《Hound Dog Taylor and the HouseRockers》 | 1971 | 藍調 | 其他 | 4／3／3 | 獨特 | $1,200 |
|  | Jessie Mae Hemphill《Feelin' Good》 | 1990 | 藍調 | 其他 | 4／4／2 | 稀有 | $1,000 |
|  | Jimmy Reed《I'm Jimmy Reed》 | 1958 | 藍調 | 其他 | 4／2／1 | 普通 | $800 |
|  | Sleepy John Estes《Broke and Hungry》 | 1964 | 藍調 | 其他 | 3／4／2 | 普通 | $800 |
|  | 三上寛・古澤良治郎《職業》 | 1987 | 藍調、爵士 | 日本 | 3／4／4 | 獨特 | $1,200 |

## NEW 新進（`new`，左邊木箱 crate-new（原 NOISE）；卡池 12 張、看得到 3 張）

規則：不限分類；2020 年以後發行；稀有度＝普通／稀有／獨特。
稀有度分布：獨特 6、稀有 1、普通 5。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Little Simz《Sometimes I Might Be Introvert》 | 2021 | 嘻哈、爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●2 | Weyes Blood《And in the Darkness, Hearts Aglow》 | 2022 | 流行、搖滾 | 其他 | 3／2／2 | 普通 | $800 |
| ●3 | Ezra Collective《Where I'm Meant to Be》 | 2022 | 世界、爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Beyoncé《Renaissance》 | 2022 | 嘻哈、流行 | 其他 | 5／1／1 | 稀有 | $1,000 |
|  | Kendrick Lamar《Mr. Morale & the Big Steppers》 | 2022 | 嘻哈、爵士 | 其他 | 4／1／3 | 獨特 | $1,200 |
|  | Armand Hammer《Haram》 | 2021 | 嘻哈、爵士 | 其他 | 4／2／3 | 獨特 | $1,200 |
|  | The Weeknd《After Hours》 | 2020 | 電子 | 其他 | 4／1／1 | 普通 | $800 |
|  | Nine Inch Nails《Ghosts V: Together》 | 2020 | 電子、古典 | 其他 | 2／2／3 | 普通 | $800 |
|  | Devendra Banhart《Flying Wig》 | 2023 | 民謠、搖滾 | 其他 | 2／3／2 | 普通 | $800 |
|  | Cedric Burnside《I Be Trying》 | 2021 | 藍調、搖滾 | 其他 | 4／4／3 | 獨特 | $1,200 |
|  | Andy Shauf《The Neon Skyline》 | 2020 | 搖滾、民謠 | 其他 | 4／3／1 | 普通 | $800 |
|  | Shackleton《Primal Forms》 | 2020 | 電子、靈魂 | 其他 | 3／4／4 | 獨特 | $1,200 |

## FEATURE 店長推薦精選（`feature`，門口牆最靠門 2×2 wall-feature；卡池 23 張、看得到 4 張）

規則：不限分類；稀有度＝史詩／傳奇。
稀有度分布：傳奇 6、史詩 17。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | Talk Talk《Laughing Stock》 | 1991 | 搖滾、爵士 | 其他 | 5／2／4 | 傳奇 | $4,000 |
| ●2 | Can《Ege Bamyasi》 | 1972 | 搖滾 | 其他 | 5／2／3 | 史詩 | $3,000 |
| ●3 | Alice Coltrane《Journey in Satchidananda》 | 1971 | 爵士 | 其他 | 5／3／3 | 史詩 | $3,000 |
| ●4 | 伍佰 & China Blue《樹枝孤鳥》 | 1998 | 搖滾、流行 | 台灣 | 5／3／3 | 史詩 | $3,000 |
|  | Autechre《Tri Repetae》 | 1995 | 電子 | 其他 | 5／2／4 | 傳奇 | $4,000 |
|  | Boards of Canada《Geogaddi》 | 2002 | 電子 | 其他 | 5／2／3 | 史詩 | $3,000 |
|  | Robert Wyatt《Rock Bottom》 | 1974 | 搖滾 | 其他 | 5／2／3 | 史詩 | $3,000 |
|  | Cornelius《Fantasma》 | 1997 | 搖滾、電子 | 日本 | 5／2／3 | 史詩 | $3,000 |
|  | 王菲《浮躁》 | 1996 | 流行、搖滾 | 華語（港中） | 5／2／3 | 史詩 | $3,000 |
|  | Einstürzende Neubauten《Halber Mensch》 | 1985 | 搖滾、電子 | 其他 | 5／2／4 | 傳奇 | $4,000 |
|  | 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 1969 | 爵士 | 日本 | 5／4／4 | 傳奇 | $4,000 |
|  | Cecil Taylor《Conquistador!》 | 1967 | 爵士 | 其他 | 4／2／5 | 傳奇 | $4,000 |
|  | Hermeto Pascoal《Zabumbê-bum-á》 | 1979 | 爵士、世界 | 其他 | 4／4／4 | 史詩 | $3,000 |
|  | Captain Beefheart & His Magic Band《Lick My Decals Off, Baby》 | 1970 | 搖滾、藍調 | 其他 | 4／3／4 | 史詩 | $3,000 |
|  | Faust《So Far》 | 1972 | 搖滾 | 其他 | 4／3／4 | 史詩 | $3,000 |
|  | The Fall《Grotesque (After the Gramme)》 | 1980 | 搖滾 | 其他 | 4／3／4 | 史詩 | $3,000 |
|  | Swans《Children of God》 | 1987 | 搖滾、電子 | 其他 | 4／2／4 | 史詩 | $3,000 |
|  | Merzbow《Noisembryo》 | 1994 | 電子 | 日本 | 4／3／5 | 傳奇 | $4,000 |
|  | Squarepusher《Ultravisitor》 | 2004 | 電子、爵士 | 其他 | 4／2／4 | 史詩 | $3,000 |
|  | Tangerine Dream《Zeit》 | 1972 | 電子、搖滾 | 其他 | 4／2／4 | 史詩 | $3,000 |
|  | Coil《Love's Secret Domain》 | 1991 | 電子 | 其他 | 4／2／4 | 史詩 | $3,000 |
|  | Jóhann Jóhannsson《Sicario: Original Motion Picture Soundtrack》 | 2015 | 電子、古典 | 其他 | 4／2／4 | 史詩 | $3,000 |
|  | 血肉果汁機 Flesh Juicer《GIGO》 | 2015 | 搖滾 | 台灣 | 4／3／4 | 史詩 | $3,000 |

## PICKS 店長推薦（`picks`，門口牆其餘 5×2 wall-picks＋櫃檯後高櫃 2＋試聽桌 1；卡池 21 張、看得到 13 張）

規則：不限分類；稀有度＝普通／稀有／獨特。
稀有度分布：稀有 11、獨特 9、普通 1。
看得到的位置：門口牆 10 張、櫃檯後高櫃 2 張、試聽桌 1 張（正面編號照這個順序）。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分類依據） | 地區 | 經／冷／硬 | 稀有度 | 價格 |
|---|---|---|---|---|---|---|---|
| ●1 | The Band《Music from Big Pink》 | 1968 | 搖滾、民謠 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●2 | Kate Bush《The Dreaming》 | 1982 | 搖滾、流行 | 其他 | 4／2／3 | 獨特 | $1,200 |
| ●3 | Björk《Debut》 | 1993 | 搖滾、電子 | 其他 | 5／1／2 | 獨特 | $1,200 |
| ●4 | Cocteau Twins《Head Over Heels》 | 1983 | 搖滾、流行 | 其他 | 4／2／2 | 稀有 | $1,000 |
| ●5 | Stan Getz《Jazz Samba》 | 1962 | 爵士、世界 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●6 | Shuggie Otis《Inspiration Information》 | 1974 | 靈魂 | 其他 | 5／3／2 | 獨特 | $1,200 |
| ●7 | Marcos Valle《Previsão do Tempo》 | 1973 | 電子、靈魂 | 其他 | 5／3／2 | 獨特 | $1,200 |
| ●8 | Gal Costa《Gal Costa》 | 1969 | 流行、爵士 | 其他 | 5／2／2 | 獨特 | $1,200 |
| ●9 | Neil Young《Zuma》 | 1975 | 搖滾、民謠 | 其他 | 4／2／2 | 稀有 | $1,000 |
| ●10 | 雷光夏 Summer Lei《黑暗之光》 | 2006 | 流行、電子 | 台灣 | 4／3／2 | 稀有 | $1,000 |
| ●11 | Ella Fitzgerald《Mack the Knife: Ella in Berlin》 | 1960 | 爵士 | 其他 | 5／2／1 | 稀有 | $1,000 |
| ●12 | Steely Dan《Countdown to Ecstasy》 | 1973 | 搖滾、爵士 | 其他 | 4／2／2 | 稀有 | $1,000 |
| ●13 | Susumu Yokota《Sakura》 | 2000 | 電子 | 日本 | 5／2／2 | 獨特 | $1,200 |
|  | Miki Matsubara《Pocket Park》 | 1980 | 流行、靈魂 | 日本 | 5／2／1 | 稀有 | $1,000 |
|  | Harold Budd & Brian Eno《Ambient 2: The Plateaux of Mirror》 | 1980 | 電子、古典 | 其他 | 5／2／2 | 獨特 | $1,200 |
|  | Fleetwood Mac《Then Play On》 | 1969 | 搖滾、藍調 | 其他 | 4／3／2 | 稀有 | $1,000 |
|  | Yo La Tengo《And Then Nothing Turned Itself Inside-Out》 | 2000 | 搖滾、流行 | 其他 | 4／2／2 | 稀有 | $1,000 |
|  | Galaxie 500《Today》 | 1988 | 搖滾、流行 | 其他 | 4／2／2 | 稀有 | $1,000 |
|  | Sonic Youth《Dirty》 | 1992 | 搖滾 | 其他 | 4／2／3 | 獨特 | $1,200 |
|  | 林生祥《野蓮出庄》 | 2020 | 民謠、搖滾 | 台灣 | 4／3／3 | 獨特 | $1,200 |
|  | 宇宙人《一萬小時》 | 2015 | 搖滾、流行 | 台灣 | 3／3／1 | 普通 | $800 |

## SALE 特價區（`sale`，crate-sale，門下方左牆邊）

規則：老闆送的特價箱卡池（`C.bargain`，§4.3：峰值 ≤3、冷門 ≤3；每晚擺 6 張＝每色 2 張）。價格照 FIXLIST 8：每張照最高星 1／2／3 → $100／$200／$300（序章挑三張免費）。正面 2 張是固定擺著的封面。

| 正面 | 專輯 | 年份 | 曲風標籤 | 地區 | 經／冷／硬 | 價格 |
|---|---|---|---|---|---|---|
| ●1 | Blur《The Great Escape》 | 1995 | 搖滾 | 其他 | 3／2／1 | $300 |
| ●2 | Weezer《Van Weezer》 | 2021 | 搖滾、流行 | 其他 | 2／2／3 | $300 |
|  | Oasis《Dig Out Your Soul》 | 2008 | 搖滾 | 其他 | 3／1／1 | $300 |
|  | David Bowie《Never Let Me Down》 | 1987 | 搖滾、流行 | 其他 | 2／2／1 | $200 |
|  | The Velvet Underground《Squeeze》 | 1973 | 搖滾、爵士 | 其他 | 2／3／1 | $300 |
|  | Stevie Wonder《Eivets Rednow》 | 1968 | 靈魂 | 其他 | 2／3／1 | $300 |
|  | The Kinks《Preservation Act 1》 | 1973 | 搖滾 | 其他 | 2／3／1 | $300 |
|  | Metallica《Reload》 | 1997 | 搖滾 | 其他 | 2／1／3 | $300 |
|  | Ramones《Halfway to Sanity》 | 1987 | 搖滾 | 其他 | 2／2／3 | $300 |

## 其他

- 櫃檯「正在放」：Caetano Veloso《Transa》（不屬於任何一區，check-covers 不查規則）。
- 宇多田ヒカル《First Love》：在流行（POP）的正面第 1 張，店裡其他地方沒有（D §6 點名；FIXLIST 4 起沒有日本／CITY 箱）。
- 看得到的封面共 60 張：12 箱（中島 8＋前排 2＋左木箱 1，各 3）36＋後牆矮櫃 8＋特價箱 2＋門口牆 14（FEATURE 4＋PICKS 10）＋高櫃 2＋試聽桌 1，整家店不重複。
- 舊分區（R&B／原聲／日本 CITY／華語台語／噪音／搖滾流行牆／爵士靈魂牆）的卡：符合新分類的留在那一類；史詩／傳奇全部進 FEATURE；Bowie《Low》（禮物）、Sun Ra（critic 牌組）、Bill Evans《Waltz for Debby》（needle 牌組）、Fishmans（掉牌）、OK Computer（王牌）不再擺在店裡。
