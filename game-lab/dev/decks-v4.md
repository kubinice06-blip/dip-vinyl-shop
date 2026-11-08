# game-lab v4 牌組表（SPEC-v4 §4；X 改：FIXLIST 3／6／8；R1：FIXLIST 10；H1：FIXLIST 11 手牌 5 張）

由 `content.js`＋`cards.js`＋`dev/sim-v4.json` 產生（星數＝seed 原值；產生器在主線 scratchpad 的 v4/H1/gen-decks.cjs，改了客人、卡或重跑 sim 就重產）。判定：`deckMain`＝每張卡的峰值軸各算一票、並列每軸都算、票數並列照 taste；嚴格峰值＝那一軸比另外兩軸都大；唬人色＝`BEATS[主屬性]`；剋他用色＝`COUNTER_OF[主屬性]`。

- **名字**（FIXLIST 6）：一看就知道是誰、偏好什麼的身分；原本的綽號＋副標併掉。誠實度**不上畫面**（名牌、今晚來客都不寫），下表的誠實度只是引擎裡的機率。
- **手牌與聲望**（FIXLIST 11 平衡 H5-1）：你的手牌 5 張＋王牌（他的暗手照舊 3 張）、你 9 聲望。手牌多了「剋不到」的手變少（約 19% → 12%），
  照 R1 的數字一晚通關會到 87%（超過 85）、KO 60%：你 10 → 9 壓通關率，客人聲望往上加把多出來的 KO 收回；出招難度與照實率照 R1。
  一般 ≤ 菁英 ≤ 藏家；`sim.mjs --n 3000` S1–S9＋HP 22 條全過（見 `dev/sim-v4.json`、`dev/notes-H1.md`）。下表括號是 R1 版（手牌 3 張、你 10）的聲望。
- **出招**（`C.plannerByDepth`，跟著今晚第幾位走）：第 1 位客人 normal、第 2 位 easy、第 3 位 easy、菁英 normal、藏家 normal；序章男子 easy。下表「出招」欄寫這位客人可能用到的。
- **稀有度與店價**（FIXLIST 8）：score＝經典＋硬蕊＋(冷門 5 ? 1 : 0)；≤5 普通 $800、6 稀有 $1,000、7 獨特 $1,200、8 史詩 $3,000、≥9 傳奇 $4,000、頂點 $8,000（不上架）。客人的牌不在店裡賣，打贏收下的那張賣回半價；**老闆送的四張＋王牌不能賣回**（FIXLIST 11；賣回面板標「老闆送的」、不能選），下表的店價只是參考。

## 客人的牌單（§4.1）

| 客人（舊名） | 誠實度（引擎內） | 出招 | 聲望（R1 版） | 張數 | 主屬性 | 嚴格峰值在主屬性 | 唬人色 ≥4 | 剋他用色 ≥4 | 單場勝率（會讀的，S7） | 單場 KO（你 KO 他／他 KO 你） |
|---|---|---|---|---|---|---|---|---|---|---|
| 男子（`man`） | 老實（照實 100%） | easy | **10**（10） | 6 | 經典 | 4 | 硬蕊 0 | 冷門 1 | 100.0%（序章） | — |
| 文青同好（舊：那張我有（文青同好）；`copycat`） | 偶爾唬人（照實 80%） | normal／easy／easy | **25**（22） | 7 | 經典 | 6 | 硬蕊 2 | 冷門 1 | 88.3% | 16.8%（15.4／1.4） |
| 社團學長（舊：我早就聽過（社團學長）；`already`） | 偶爾唬人（照實 80%） | normal／easy／easy | **20**（21） | 7 | 冷門 | 7 | 經典 4 | 硬蕊 3 | 79.2% | 46.5%（39.6／6.9） |
| 音響發燒友（舊：針壓強迫症（品味行家）；`needle`） | 偶爾唬人（照實 80%） | normal／easy／easy | **25**（22） | 7 | 經典 | 4 | 硬蕊 3 | 冷門 2 | 86.5% | 25.5%（22.2／3.3） |
| 二手店老闆（舊：跳針王（二手店老闆）；`skip`） | 偶爾唬人（照實 80%） | normal／easy／easy | **20**（22） | 7 | 冷門 | 5 | 經典 5 | 硬蕊 2 | 80.6% | 47.6%（40.8／6.8） |
| 地下樂團吉他手（舊：月底吃土；`broke`） | 偶爾唬人（照實 80%） | normal／easy／easy | **25**（22） | 7 | 硬蕊 | 4 | 冷門 2 | 經典 2 | 93.3% | 40.4%（39.3／1.1） |
| 前衛樂迷（舊：剁手黨；`buyer`） | 偶爾唬人（照實 80%） | normal／easy／easy | **25**（22） | 7 | 硬蕊 | 5 | 冷門 3 | 經典 4 | 86.7% | 38.9%（34.1／4.8） |
| 地下廠牌主理人（舊：冷門仙人（地下廠牌主理人）；`label`） | 愛唬人（照實 75%） | normal | **25**（22） | 7 | 冷門 | 5 | 經典 4 | 硬蕊 2 | 66.3% | 20.0%（12.9／7.1） |
| 資深樂評（舊：名盤守門員（資深樂評）；`critic`） | 愛唬人（照實 75%） | normal | **26**（24） | 7 | 經典 | 5 | 硬蕊 5 | 冷門 1 | 89.1% | 9.2%（8.6／0.6） |
| 傳說藏家（`boss`） | 老江湖（照實 75%） | normal | **28**（24） | 6＋王牌 | 經典 | 2 | 硬蕊 4 | 冷門 6 | 53.3% | 20.2%（2.0／18.1） |

男子老實、從不唬人：唬人色與剋他用色兩條不查。藏家三色混合：另查三色各 ≥2 張峰值、每色都有 ≥4 星。
聲望 一般 20–25 ≤ 菁英 25–26 ≤ 藏家 28（sim 的 HP 檢查）。地下樂團吉他手的牌單最高 4 星，單場最好打，S7「一般最高減最低 ≤20 點」綁住其他一般客人的難度。
一晚裡（會讀的＋smart）客人場由 KO 結束 47.8%（你 KO 他 43.4%、他 KO 你 4.5%），第 6 手比聲望條 52.2%（S9 KO ≥35%）。

### 男子（`man`）　聲望 10

主屬性 **經典**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Coldplay《Mylo Xyloto》 | `coldplay-mylo-xyloto` | 2/1/1 | 經 | 普通 | $800 |
| 2 | Imagine Dragons《Night Visions》 | `imagine-dragons-night-visions` | 3/1/1 | 經 | 普通 | $800 |
| 3 | Limp Bizkit《Results May Vary》 | `limp-bizkit-results-may-vary` | 1/1/3 | 硬 | 普通 | $800 |
| 4 | 老王樂隊《暮夜徐行》 | `老王樂隊-暮夜徐行` | 3/4/2 | 冷 | 普通 | $800 |
| 5 | Eminem《The Eminem Show》 | `eminem-the-eminem-show` | 5/1/2 | 經 | 獨特 | $1,200 |
| 6 | Katy Perry《PRISM》 | `katy-perry-prism` | 2/1/1 | 經 | 普通 | $800 |

### 文青同好（`copycat`）　聲望 25

主屬性 **經典**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Beach House《Teen Dream》 | `beach-house-teen-dream` | 5/2/2 | 經 | 獨特 | $1,200 |
| 2 | Weyes Blood《Titanic Rising》 | `weyes-blood-titanic-rising` | 5/2/2 | 經 | 獨特 | $1,200 |
| 3 | Mitski《Be the Cowboy》 | `mitski-be-the-cowboy` | 5/1/2 | 經 | 獨特 | $1,200 |
| 4 | Billie Eilish《WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?》 | `billie-eilish-when-we-all-fall-asleep-where-do-we-go` | 5/1/2 | 經 | 獨特 | $1,200 |
| 5 | Low《Double Negative》 | `low-double-negative` | 5/3/4 | 經 | 傳奇 | $4,000 |
| 6 | Sophie《Oil of Every Pearl's Un-Insides》 | `sophie-oil-of-every-pearl-s-un-insides` | 5/2/4 | 經 | 傳奇 | $4,000 |
| 7 | 大象體操 Elephant Gym《角度》 | `大象體操-elephant-gym-角度` | 4/4/3 | 經冷 | 獨特 | $1,200 |

### 社團學長（`already`）　聲望 20

主屬性 **冷門**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Don Slepian《Sea of Bliss》 | `don-slepian-sea-of-bliss` | 3/4/2 | 冷 | 普通 | $800 |
| 2 | Harold Budd《Abandoned Cities》 | `harold-budd-abandoned-cities` | 3/4/3 | 冷 | 稀有 | $1,000 |
| 3 | Demetrio Stratos《Metrodora》 | `demetrio-stratos-metrodora` | 3/5/4 | 冷 | 史詩 | $3,000 |
| 4 | Étron Fou Leloublan《Les Trois Fou's Perdégagnent (Au Pays Des...)》 | `etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des` | 4/5/4 | 冷 | 傳奇 | $4,000 |
| 5 | Nocturnal Emissions《Fruiting Body》 | `nocturnal-emissions-fruiting-body` | 4/5/4 | 冷 | 傳奇 | $4,000 |
| 6 | Eivind Aarset《Électronique noire》 | `eivind-aarset-electronique-noire` | 4/5/3 | 冷 | 史詩 | $3,000 |
| 7 | Yezda Urfa《Boris》 | `yezda-urfa-boris` | 4/5/3 | 冷 | 史詩 | $3,000 |

### 音響發燒友（`needle`）　聲望 25

主屬性 **經典**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Steely Dan《Gaucho》 | `steely-dan-gaucho` | 4/2/2 | 經 | 稀有 | $1,000 |
| 2 | Art Pepper《Art Pepper Meets the Rhythm Section》 | `art-pepper-art-pepper-meets-the-rhythm-section` | 5/2/2 | 經 | 獨特 | $1,200 |
| 3 | Bill Evans《Waltz for Debby》 | `bill-evans-waltz-for-debby` | 5/1/2 | 經 | 獨特 | $1,200 |
| 4 | Kenny Burrell《Midnight Blue》 | `kenny-burrell-midnight-blue` | 5/2/1 | 經 | 稀有 | $1,000 |
| 5 | Roscoe Mitchell Sextet《Sound》 | `roscoe-mitchell-sextet-sound` | 5/4/5 | 經硬 | 傳奇 | $4,000 |
| 6 | John Zorn《Cobra》 | `john-zorn-cobra` | 5/3/5 | 經硬 | 傳奇 | $4,000 |
| 7 | Andrew Cyrille《What About?》 | `andrew-cyrille-what-about` | 4/4/5 | 硬 | 傳奇 | $4,000 |

### 二手店老闆（`skip`）　聲望 20

主屬性 **冷門**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Roberto Goyeneche《Cantor de mi barrio》 | `roberto-goyeneche-cantor-de-mi-barrio` | 3/4/2 | 冷 | 普通 | $800 |
| 2 | Amália Rodrigues《Gostava de ser quem era》 | `amalia-rodrigues-gostava-de-ser-quem-era` | 4/5/2 | 冷 | 獨特 | $1,200 |
| 3 | King Sunny Adé《Aura》 | `king-sunny-ade-aura` | 3/4/2 | 冷 | 普通 | $800 |
| 4 | Washington Phillips《The Key to the Kingdom》 | `washington-phillips-the-key-to-the-kingdom` | 4/5/4 | 冷 | 傳奇 | $4,000 |
| 5 | Otha Turner & The Rising Star Fife & Drum Band《Everybody Hollerin' Goat》 | `otha-turner-the-rising-star-fife-drum-band-everybody-holleri` | 4/5/3 | 冷 | 史詩 | $3,000 |
| 6 | Tony Scott & The Indonesian All Stars《Djanger Bali》 | `tony-scott-the-indonesian-all-stars-djanger-bali` | 5/5/3 | 經冷 | 傳奇 | $4,000 |
| 7 | Barney Wilen《Moshi》 | `barney-wilen-moshi` | 4/4/4 | 經冷硬 | 史詩 | $3,000 |

### 地下樂團吉他手（`broke`）　聲望 25

主屬性 **硬蕊**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | 血肉果汁機 Flesh Juicer《GOLDEN太子BRO》 | `血肉果汁機-flesh-juicer-golden太子bro` | 3/3/4 | 硬 | 獨特 | $1,200 |
| 2 | 血肉果汁機 Flesh Juicer《深海童話》 | `血肉果汁機-flesh-juicer-深海童話` | 3/3/4 | 硬 | 獨特 | $1,200 |
| 3 | 閃靈《失竊千年》 | `閃靈-失竊千年` | 3/3/4 | 硬 | 獨特 | $1,200 |
| 4 | 血肉果汁機 Flesh Juicer《血肉宮建宮蓋廟演唱會》 | `血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會` | 2/3/4 | 硬 | 稀有 | $1,000 |
| 5 | 閃靈《永劫輪迴》 | `閃靈-永劫輪迴` | 4/3/4 | 經硬 | 史詩 | $3,000 |
| 6 | 閃靈《醒靈寺大決戰》 | `閃靈-醒靈寺大決戰` | 3/4/4 | 冷硬 | 獨特 | $1,200 |
| 7 | 林強《驚蟄》 | `林強-驚蟄` | 4/4/3 | 經冷 | 獨特 | $1,200 |

### 前衛樂迷（`buyer`）　聲望 25

主屬性 **硬蕊**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Swans《Soundtracks for the Blind》 | `swans-soundtracks-for-the-blind` | 5/2/5 | 經硬 | 傳奇 | $4,000 |
| 2 | Venetian Snares《Making Orange Things》 | `venetian-snares-making-orange-things` | 4/4/5 | 硬 | 傳奇 | $4,000 |
| 3 | Nurse With Wound《Homotopy to Marie》 | `nurse-with-wound-homotopy-to-marie` | 4/4/5 | 硬 | 傳奇 | $4,000 |
| 4 | Ryoji Ikeda《Mort aux vaches》 | `ryoji-ikeda-mort-aux-vaches` | 3/4/5 | 硬 | 史詩 | $3,000 |
| 5 | Sunn O)))《White1》 | `sunn-o-white1` | 3/2/4 | 硬 | 獨特 | $1,200 |
| 6 | Sigur Rós《Von》 | `sigur-ros-von` | 3/2/4 | 硬 | 獨特 | $1,200 |
| 7 | William Basinski《The Disintegration Loops》 | `william-basinski-the-disintegration-loops` | 5/2/3 | 經 | 史詩 | $3,000 |

### 地下廠牌主理人（`label`）　聲望 25

主屬性 **冷門**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | 廢五金《廢五金》 | `廢五金-廢五金` | 3/5/3 | 冷 | 獨特 | $1,200 |
| 2 | 明田川荘之《Yamazaki Blues》 | `明田川荘之-yamazaki-blues` | 3/5/2 | 冷 | 稀有 | $1,000 |
| 3 | 菊地雅章《End for the Beginning》 | `菊地雅章-end-for-the-beginning` | 3/5/3 | 冷 | 獨特 | $1,200 |
| 4 | Keiji Haino《Watashi Dake?》 | `keiji-haino-watashi-dake` | 4/4/5 | 硬 | 傳奇 | $4,000 |
| 5 | Harry Roesli Gang《Philosophy Gang》 | `harry-roesli-gang-philosophy-gang` | 5/5/3 | 經冷 | 傳奇 | $4,000 |
| 6 | C.O.B.《Moyshe McStiff and the Tartan Lancers of the Sacred Heart》 | `c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he` | 4/5/3 | 冷 | 史詩 | $3,000 |
| 7 | Pholas Dactylus《Concerto delle menti》 | `pholas-dactylus-concerto-delle-menti` | 4/5/4 | 冷 | 傳奇 | $4,000 |

### 資深樂評（`critic`）　聲望 26

主屬性 **經典**。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Tim Buckley《Starsailor》 | `tim-buckley-starsailor` | 4/3/4 | 經硬 | 史詩 | $3,000 |
| 2 | Throbbing Gristle《20 Jazz Funk Greats》 | `throbbing-gristle-20-jazz-funk-greats` | 5/2/4 | 經 | 傳奇 | $4,000 |
| 3 | black midi《Schlagenheim》 | `black-midi-schlagenheim` | 4/2/4 | 經硬 | 史詩 | $3,000 |
| 4 | Faust《Faust IV》 | `faust-faust-iv` | 5/2/4 | 經 | 傳奇 | $4,000 |
| 5 | Neu!《Neu!》 | `neu-neu` | 5/2/3 | 經 | 史詩 | $3,000 |
| 6 | Sun Ra《Space Is the Place》 | `sun-ra-space-is-the-place` | 5/2/3 | 經 | 史詩 | $3,000 |
| 7 | The Plastic People of the Universe《Egon Bondy's Happy Hearts Club Banned》 | `the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts` | 5/4/4 | 經 | 傳奇 | $4,000 |

### 傳說藏家（`boss`）　聲望 28

主屬性 **經典**；另帶你沒選的那張王牌（7 星）。

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | 交工樂隊《我等就來唱山歌》 | `交工樂隊-我等就來唱山歌` | 5/4/3 | 經 | 史詩 | $3,000 |
| 2 | Ganelin Trio《Ancora da Capo》 | `ganelin-trio-ancora-da-capo` | 5/4/4 | 經 | 傳奇 | $4,000 |
| 3 | Luis Russell《The Luis Russell Story 1929-1934》 | `luis-russell-the-luis-russell-story-1929-1934` | 4/5/4 | 冷 | 傳奇 | $4,000 |
| 4 | Raw Material《Time Is...》 | `raw-material-time-is` | 4/5/3 | 冷 | 史詩 | $3,000 |
| 5 | Alexander von Schlippenbach《Globe Unity》 | `alexander-von-schlippenbach-globe-unity` | 5/4/5 | 經硬 | 傳奇 | $4,000 |
| 6 | 裸のラリーズ《The Oz Tapes》 | `裸のラリーズ-the-oz-tapes` | 4/4/5 | 硬 | 傳奇 | $4,000 |

## 老闆送的四張（§4.2）

### 殿堂（王牌 Radiohead《OK Computer》，經典 7；頂點 $8,000、不上架；四張＋王牌不能賣回）

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | David Bowie《Low》 | `david-bowie-low` | 5/2/3 | 經 | 史詩 | $3,000 |
| 2 | Vashti Bunyan《Just Another Diamond Day》 | `vashti-bunyan-just-another-diamond-day` | 5/3/1 | 經 | 稀有 | $1,000 |
| 3 | Scott Walker《Tilt》 | `scott-walker-tilt` | 4/2/4 | 經硬 | 史詩 | $3,000 |
| 4 | Beverly Glenn-Copeland《...Keyboard Fantasies...》 | `beverly-glenn-copeland-keyboard-fantasies` | 5/4/2 | 經 | 獨特 | $1,200 |

### 流亡（王牌 Barney Wilen《Zodiac》，冷門 7；頂點 $8,000、不上架；四張＋王牌不能賣回）

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | Charles Brackeen《Rhythm X》 | `charles-brackeen-rhythm-x` | 4/5/4 | 冷 | 傳奇 | $4,000 |
| 2 | Bark Psychosis《Hex》 | `bark-psychosis-hex` | 5/3/3 | 經 | 史詩 | $3,000 |
| 3 | 黃小楨《賞味期限》 | `黃小楨-賞味期限` | 4/4/2 | 經冷 | 稀有 | $1,000 |
| 4 | 傷心欲絕《我愛您》 | `傷心欲絕-我愛您` | 3/4/3 | 冷 | 稀有 | $1,000 |

### 異端（王牌 Swans《Filth》，硬蕊 7；頂點 $8,000、不上架；四張＋王牌不能賣回）

| # | 專輯 | id | 經/冷/硬 | 峰值 | 稀有度 | 店價 |
|---|---|---|---|---|---|---|
| 1 | The Velvet Underground《White Light/White Heat》 | `the-velvet-underground-white-light-white-heat` | 5/2/4 | 經 | 傳奇 | $4,000 |
| 2 | Melt-Banana《Speak Squeak Creak》 | `melt-banana-speak-squeak-creak` | 3/3/5 | 硬 | 史詩 | $3,000 |
| 3 | Pharoah Sanders《Tauhid》 | `pharoah-sanders-tauhid` | 4/3/4 | 經硬 | 史詩 | $3,000 |
| 4 | Magma《Mëkanïk Dëstruktïw Kömmandöh》 | `magma-mekanik-destruktiw-kommandoh` | 5/4/4 | 經 | 傳奇 | $4,000 |

## 特價箱（§4.3；9 張，每晚擺 6 張＝每色 2 張）

| # | 專輯 | id | 經/冷/硬 | topAttr | 每張價（照最高星） |
|---|---|---|---|---|---|
| 1 | Blur《The Great Escape》 | `blur-the-great-escape` | 3/2/1 | 經典 | $300 |
| 2 | Oasis《Dig Out Your Soul》 | `oasis-dig-out-your-soul` | 3/1/1 | 經典 | $300 |
| 3 | David Bowie《Never Let Me Down》 | `david-bowie-never-let-me-down` | 2/2/1 | 經典 | $200 |
| 4 | The Velvet Underground《Squeeze》 | `the-velvet-underground-squeeze` | 2/3/1 | 冷門 | $300 |
| 5 | Stevie Wonder《Eivets Rednow》 | `stevie-wonder-eivets-rednow` | 2/3/1 | 冷門 | $300 |
| 6 | The Kinks《Preservation Act 1》 | `the-kinks-preservation-act-1` | 2/3/1 | 冷門 | $300 |
| 7 | Metallica《Reload》 | `metallica-reload` | 2/1/3 | 硬蕊 | $300 |
| 8 | Weezer《Van Weezer》 | `weezer-van-weezer` | 2/2/3 | 硬蕊 | $300 |
| 9 | Ramones《Halfway to Sanity》 | `ramones-halfway-to-sanity` | 2/2/3 | 硬蕊 | $300 |

開局免費挑 3 張（序章與再來一夜都一樣）；之後再買，每張照最高星 $100／$200／$300（1–3 張一次結帳），賣回照特價的一半（不會一買一賣賺錢）。

## 經濟（FIXLIST 8 台幣行情；一晚內有效、打烊歸零）

| 項目 | 值 | 來源 |
|---|---|---|
| 開局的錢 | $1,000 | sim 校準（店主例：$1,000 左右） |
| 打贏：序章男子／一般客人／菁英／藏家 | $0／$1,500／$2,500／$0 | sim 校準（店主例：一般 $1,500、菁英 $2,500 左右）；藏家＝打烊 |
| 箱子、新進、店長推薦（普通／稀有／獨特） | $800／$1,000／$1,200 | 店主 |
| 門口 FEATURE（史詩／傳奇） | $3,000／$4,000 | 店主 |
| 頂點（殿堂／流亡／異端） | $8,000（v4 不上架，王牌是老闆送的） | 店主 |
| 特價箱（每張，照最高星 1／2／3） | $100／$200／$300 | 店主 |
| 櫃檯配件（一件） | $3,000 | 店主 |
| 賣回 | 一律半價；老闆送的四張＋王牌不能賣 | 店主（FIXLIST 11） |
| 每區上貨 | 4–6 張（FEATURE 2–3 張）、櫃檯 2–3 件、全店同一晚不重複 | 契約 |

會讀的玩家一晚通關：會買 78.3%、不買 67.3%（差 11.0 點，S6 ≥5）；一晚平均賺 $6,557、花 $2,916（買唱片 0.14 張、配件 0.90 件）。
