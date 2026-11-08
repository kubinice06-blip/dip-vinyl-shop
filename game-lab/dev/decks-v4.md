# game-lab v4 牌組表（A1，SPEC-v4 §4）

由 `content.js`＋`cards.js` 產生（星數＝seed 原值）。判定：`deckMain`＝每張卡的峰值軸各算一票、並列每軸都算、票數並列照 taste；嚴格峰值＝那一軸比另外兩軸都大；唬人色＝`BEATS[主屬性]`；剋他用色＝`COUNTER_OF[主屬性]`。聲望是 `sim.mjs` 校準後的值（§5.2）。

## 客人的牌單（§4.1）

| 客人 | 誠實度 | 聲望 | 張數 | 主屬性 | 嚴格峰值在主屬性 | 唬人色 ≥4 | 剋他用色 ≥4 | 峰值票數（含並列） |
|---|---|---|---|---|---|---|---|---|
| 男子（`man`） | 老實 | 10 | 6 | 經典 | 4 | 硬蕊 0 | 冷門 1 | 經 4／冷 1／硬 1 |
| 那張我有（`copycat`） | 偶爾唬人 | 18 | 7 | 經典 | 6 | 硬蕊 2 | 冷門 1 | 經 7／冷 1／硬 0 |
| 我早就聽過（`already`） | 偶爾唬人 | 17 | 7 | 冷門 | 7 | 經典 4 | 硬蕊 3 | 經 0／冷 7／硬 0 |
| 針壓強迫症（`needle`） | 偶爾唬人 | 19 | 7 | 經典 | 4 | 硬蕊 3 | 冷門 2 | 經 6／冷 0／硬 3 |
| 跳針王（`skip`） | 偶爾唬人 | 17 | 7 | 冷門 | 5 | 經典 5 | 硬蕊 2 | 經 2／冷 7／硬 1 |
| 月底吃土（`broke`） | 偶爾唬人 | 20 | 7 | 硬蕊 | 4 | 冷門 2 | 經典 2 | 經 2／冷 2／硬 6 |
| 剁手黨（`buyer`） | 偶爾唬人 | 20 | 7 | 硬蕊 | 5 | 冷門 3 | 經典 4 | 經 2／冷 0／硬 6 |
| 冷門仙人（`label`） | 愛唬人 | 17 | 7 | 冷門 | 5 | 經典 4 | 硬蕊 2 | 經 1／冷 6／硬 1 |
| 名盤守門員（`critic`） | 愛唬人 | 20 | 7 | 經典 | 5 | 硬蕊 5 | 冷門 1 | 經 7／冷 0／硬 2 |
| 傳說藏家（`boss`） | 老江湖 | 16 | 6＋王牌 | 經典 | 2 | 硬蕊 4 | 冷門 6 | 經 3／冷 2／硬 2 |

男子老實、從不唬人：唬人色與剋他用色兩條不查。藏家三色混合：不參與「經典客人 ≤4 位」的計數，另查三色各 ≥2 張峰值、每色都有 ≥4 星。

### 男子（`man`）　老實・聲望 10

主屬性 **經典**；嚴格峰值在主屬性 4 張；唬人色（硬蕊）≥4 星 0 張；剋他用色（冷門）≥4 星 1 張。序章固定 planner easy、老實。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Coldplay《Mylo Xyloto》 | `coldplay-mylo-xyloto` | 2/1/1 | 經 | ✓ |
| 2 | Imagine Dragons《Night Visions》 | `imagine-dragons-night-visions` | 3/1/1 | 經 | ✓ |
| 3 | Limp Bizkit《Results May Vary》 | `limp-bizkit-results-may-vary` | 1/1/3 | 硬 | ✓ |
| 4 | 老王樂隊《暮夜徐行》 | `老王樂隊-暮夜徐行` | 3/4/2 | 冷 | ✓ |
| 5 | Eminem《The Eminem Show》 | `eminem-the-eminem-show` | 5/1/2 | 經 | ✓ |
| 6 | Katy Perry《PRISM》 | `katy-perry-prism` | 2/1/1 | 經 | ✓ |

### 那張我有（`copycat`）　偶爾唬人・聲望 18・文青同好

主屬性 **經典**；嚴格峰值在主屬性 6 張；唬人色（硬蕊）≥4 星 2 張；剋他用色（冷門）≥4 星 1 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Beach House《Teen Dream》 | `beach-house-teen-dream` | 5/2/2 | 經 | ✓ |
| 2 | Weyes Blood《Titanic Rising》 | `weyes-blood-titanic-rising` | 5/2/2 | 經 | ✓ |
| 3 | Mitski《Be the Cowboy》 | `mitski-be-the-cowboy` | 5/1/2 | 經 | ✓ |
| 4 | Billie Eilish《WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?》 | `billie-eilish-when-we-all-fall-asleep-where-do-we-go` | 5/1/2 | 經 | ✓ |
| 5 | Low《Double Negative》 | `low-double-negative` | 5/3/4 | 經 | ✓ |
| 6 | Sophie《Oil of Every Pearl's Un-Insides》 | `sophie-oil-of-every-pearl-s-un-insides` | 5/2/4 | 經 | ✓ |
| 7 | 大象體操 Elephant Gym《角度》 | `大象體操-elephant-gym-角度` | 4/4/3 | 經冷 | ✓ |

### 我早就聽過（`already`）　偶爾唬人・聲望 17・社團學長

主屬性 **冷門**；嚴格峰值在主屬性 7 張；唬人色（經典）≥4 星 4 張；剋他用色（硬蕊）≥4 星 3 張。

A3-M2 換了 2 張（冷 5 → 嚴格冷 4，位置不變；理由見 dev/notes-A1.md「第 2 階段校準筆記」結論 1–2）。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Don Slepian《Sea of Bliss》 | `don-slepian-sea-of-bliss` | 3/4/2 | 冷 | ✓（A3-M2：換掉 Pauline Anna Strom《Trans-Millenia Consort》 3/5/3） |
| 2 | Harold Budd《Abandoned Cities》 | `harold-budd-abandoned-cities` | 3/4/3 | 冷 | ✓（A3-M2：換掉 Gigi Masin《Wind》 3/5/3） |
| 3 | Demetrio Stratos《Metrodora》 | `demetrio-stratos-metrodora` | 3/5/4 | 冷 | ✓ |
| 4 | Étron Fou Leloublan《Les Trois Fou's Perdégagnent (Au Pays Des...)》 | `etron-fou-leloublan-les-trois-fou-s-perdegagnent-au-pays-des` | 4/5/4 | 冷 | ✓ |
| 5 | Nocturnal Emissions《Fruiting Body》 | `nocturnal-emissions-fruiting-body` | 4/5/4 | 冷 | ✓ |
| 6 | Eivind Aarset《Électronique noire》 | `eivind-aarset-electronique-noire` | 4/5/3 | 冷 | ✓ |
| 7 | Yezda Urfa《Boris》 | `yezda-urfa-boris` | 4/5/3 | 冷 | ✓ |

### 針壓強迫症（`needle`）　偶爾唬人・聲望 19・品味行家

主屬性 **經典**；嚴格峰值在主屬性 4 張；唬人色（硬蕊）≥4 星 3 張；剋他用色（冷門）≥4 星 2 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Steely Dan《Gaucho》 | `steely-dan-gaucho` | 4/2/2 | 經 | ✓ |
| 2 | Art Pepper《Art Pepper Meets the Rhythm Section》 | `art-pepper-art-pepper-meets-the-rhythm-section` | 5/2/2 | 經 | ✓ |
| 3 | Bill Evans《Waltz for Debby》 | `bill-evans-waltz-for-debby` | 5/1/2 | 經 | ✓ |
| 4 | Kenny Burrell《Midnight Blue》 | `kenny-burrell-midnight-blue` | 5/2/1 | 經 | ✓ |
| 5 | Roscoe Mitchell Sextet《Sound》 | `roscoe-mitchell-sextet-sound` | 5/4/5 | 經硬 | ✓ |
| 6 | John Zorn《Cobra》 | `john-zorn-cobra` | 5/3/5 | 經硬 | ✓ |
| 7 | Andrew Cyrille《What About?》 | `andrew-cyrille-what-about` | 4/4/5 | 硬 | ✓ |

### 跳針王（`skip`）　偶爾唬人・聲望 17・二手店老闆

主屬性 **冷門**；嚴格峰值在主屬性 5 張；唬人色（經典）≥4 星 5 張；剋他用色（硬蕊）≥4 星 2 張。

A3-M2 換了 2 張（冷 5 → 嚴格冷 4，位置不變；理由見 dev/notes-A1.md「第 2 階段校準筆記」結論 1–2）。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Roberto Goyeneche《Cantor de mi barrio》 | `roberto-goyeneche-cantor-de-mi-barrio` | 3/4/2 | 冷 | ✓（A3-M2：換掉 Mina《Studio Uno 66》 4/5/2） |
| 2 | Amália Rodrigues《Gostava de ser quem era》 | `amalia-rodrigues-gostava-de-ser-quem-era` | 4/5/2 | 冷 | ✓ |
| 3 | King Sunny Adé《Aura》 | `king-sunny-ade-aura` | 3/4/2 | 冷 | ✓（A3-M2：換掉 Dorival Caymmi《Caymmi Visita Tom》 4/5/1） |
| 4 | Washington Phillips《The Key to the Kingdom》 | `washington-phillips-the-key-to-the-kingdom` | 4/5/4 | 冷 | ✓ |
| 5 | Otha Turner & The Rising Star Fife & Drum Band《Everybody Hollerin' Goat》 | `otha-turner-the-rising-star-fife-drum-band-everybody-holleri` | 4/5/3 | 冷 | ✓ |
| 6 | Tony Scott & The Indonesian All Stars《Djanger Bali》 | `tony-scott-the-indonesian-all-stars-djanger-bali` | 5/5/3 | 經冷 | ✓ |
| 7 | Barney Wilen《Moshi》 | `barney-wilen-moshi` | 4/4/4 | 經冷硬 | ✓ |

### 月底吃土（`broke`）　偶爾唬人・聲望 20

主屬性 **硬蕊**；嚴格峰值在主屬性 4 張；唬人色（冷門）≥4 星 2 張；剋他用色（經典）≥4 星 2 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | 血肉果汁機 Flesh Juicer《GOLDEN太子BRO》 | `血肉果汁機-flesh-juicer-golden太子bro` | 3/3/4 | 硬 | ✓ |
| 2 | 血肉果汁機 Flesh Juicer《深海童話》 | `血肉果汁機-flesh-juicer-深海童話` | 3/3/4 | 硬 | ✓ |
| 3 | 閃靈《失竊千年》 | `閃靈-失竊千年` | 3/3/4 | 硬 | ✓ |
| 4 | 血肉果汁機 Flesh Juicer《血肉宮建宮蓋廟演唱會》 | `血肉果汁機-flesh-juicer-血肉宮建宮蓋廟演唱會` | 2/3/4 | 硬 | ✓ |
| 5 | 閃靈《永劫輪迴》 | `閃靈-永劫輪迴` | 4/3/4 | 經硬 | ✓ |
| 6 | 閃靈《醒靈寺大決戰》 | `閃靈-醒靈寺大決戰` | 3/4/4 | 冷硬 | ✓ |
| 7 | 林強《驚蟄》 | `林強-驚蟄` | 4/4/3 | 經冷 | ✓ |

### 剁手黨（`buyer`）　偶爾唬人・聲望 20

主屬性 **硬蕊**；嚴格峰值在主屬性 5 張；唬人色（冷門）≥4 星 3 張；剋他用色（經典）≥4 星 4 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Swans《Soundtracks for the Blind》 | `swans-soundtracks-for-the-blind` | 5/2/5 | 經硬 | ✓ |
| 2 | Venetian Snares《Making Orange Things》 | `venetian-snares-making-orange-things` | 4/4/5 | 硬 | ✓ |
| 3 | Nurse With Wound《Homotopy to Marie》 | `nurse-with-wound-homotopy-to-marie` | 4/4/5 | 硬 | ✓ |
| 4 | Ryoji Ikeda《Mort aux vaches》 | `ryoji-ikeda-mort-aux-vaches` | 3/4/5 | 硬 | ✓ |
| 5 | Sunn O)))《White1》 | `sunn-o-white1` | 3/2/4 | 硬 | ✓ |
| 6 | Sigur Rós《Von》 | `sigur-ros-von` | 3/2/4 | 硬 | ✓ |
| 7 | William Basinski《The Disintegration Loops》 | `william-basinski-the-disintegration-loops` | 5/2/3 | 經 | ✓ |

### 冷門仙人（`label`）　愛唬人・聲望 17・地下廠牌主理人

主屬性 **冷門**；嚴格峰值在主屬性 5 張；唬人色（經典）≥4 星 4 張；剋他用色（硬蕊）≥4 星 2 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | 廢五金《廢五金》 | `廢五金-廢五金` | 3/5/3 | 冷 | ✓ |
| 2 | 明田川荘之《Yamazaki Blues》 | `明田川荘之-yamazaki-blues` | 3/5/2 | 冷 | ✓ |
| 3 | 菊地雅章《End for the Beginning》 | `菊地雅章-end-for-the-beginning` | 3/5/3 | 冷 | ✓ |
| 4 | Keiji Haino《Watashi Dake?》 | `keiji-haino-watashi-dake` | 4/4/5 | 硬 | ✓ |
| 5 | Harry Roesli Gang《Philosophy Gang》 | `harry-roesli-gang-philosophy-gang` | 5/5/3 | 經冷 | ✓ |
| 6 | C.O.B.《Moyshe McStiff and the Tartan Lancers of the Sacred Heart》 | `c-o-b-moyshe-mcstiff-and-the-tartan-lancers-of-the-sacred-he` | 4/5/3 | 冷 | ✓ |
| 7 | Pholas Dactylus《Concerto delle menti》 | `pholas-dactylus-concerto-delle-menti` | 4/5/4 | 冷 | ✓ |

### 名盤守門員（`critic`）　愛唬人・聲望 20・資深樂評

主屬性 **經典**；嚴格峰值在主屬性 5 張；唬人色（硬蕊）≥4 星 5 張；剋他用色（冷門）≥4 星 1 張。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Tim Buckley《Starsailor》 | `tim-buckley-starsailor` | 4/3/4 | 經硬 | ✓ |
| 2 | Throbbing Gristle《20 Jazz Funk Greats》 | `throbbing-gristle-20-jazz-funk-greats` | 5/2/4 | 經 | ✓ |
| 3 | black midi《Schlagenheim》 | `black-midi-schlagenheim` | 4/2/4 | 經硬 | ✓ |
| 4 | Faust《Faust IV》 | `faust-faust-iv` | 5/2/4 | 經 | ✓ |
| 5 | Neu!《Neu!》 | `neu-neu` | 5/2/3 | 經 | ✓ |
| 6 | Sun Ra《Space Is the Place》 | `sun-ra-space-is-the-place` | 5/2/3 | 經 | ✓ |
| 7 | The Plastic People of the Universe《Egon Bondy's Happy Hearts Club Banned》 | `the-plastic-people-of-the-universe-egon-bondy-s-happy-hearts` | 5/4/4 | 經 | ✓ |

### 傳說藏家（`boss`）　老江湖・聲望 16

主屬性 **經典**；嚴格峰值在主屬性 2 張；唬人色（硬蕊）≥4 星 4 張；剋他用色（冷門）≥4 星 6 張。另帶你沒選的那張王牌（7 星）。

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | 交工樂隊《我等就來唱山歌》 | `交工樂隊-我等就來唱山歌` | 5/4/3 | 經 | ✓ |
| 2 | Ganelin Trio《Ancora da Capo》 | `ganelin-trio-ancora-da-capo` | 5/4/4 | 經 | ✓ |
| 3 | Luis Russell《The Luis Russell Story 1929-1934》 | `luis-russell-the-luis-russell-story-1929-1934` | 4/5/4 | 冷 | ✓ |
| 4 | Raw Material《Time Is...》 | `raw-material-time-is` | 4/5/3 | 冷 | ✓ |
| 5 | Alexander von Schlippenbach《Globe Unity》 | `alexander-von-schlippenbach-globe-unity` | 5/4/5 | 經硬 | ✓ |
| 6 | 裸のラリーズ《The Oz Tapes》 | `裸のラリーズ-the-oz-tapes` | 4/4/5 | 硬 | ✓ |

## 老闆送的四張（§4.2）

### 殿堂（王牌 Radiohead《OK Computer》，經典 7）

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | David Bowie《Low》 | `david-bowie-low` | 5/2/3 | 經 | ✓ |
| 2 | Vashti Bunyan《Just Another Diamond Day》 | `vashti-bunyan-just-another-diamond-day` | 5/3/1 | 經 | ✓ |
| 3 | Scott Walker《Tilt》 | `scott-walker-tilt` | 4/2/4 | 經硬 | ✓ |
| 4 | Beverly Glenn-Copeland《...Keyboard Fantasies...》 | `beverly-glenn-copeland-keyboard-fantasies` | 5/4/2 | 經 | ✓ |

三軸 ≥4：經 4／冷 1／硬 1；王牌那軸 ≥4 4 張。

### 流亡（王牌 Barney Wilen《Zodiac》，冷門 7）

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | Charles Brackeen《Rhythm X》 | `charles-brackeen-rhythm-x` | 4/5/4 | 冷 | ✓ |
| 2 | Bark Psychosis《Hex》 | `bark-psychosis-hex` | 5/3/3 | 經 | ✓ |
| 3 | 黃小楨《賞味期限》 | `黃小楨-賞味期限` | 4/4/2 | 經冷 | ✓ |
| 4 | 傷心欲絕《我愛您》 | `傷心欲絕-我愛您` | 3/4/3 | 冷 | ✓ |

三軸 ≥4：經 3／冷 3／硬 1；王牌那軸 ≥4 3 張。

### 異端（王牌 Swans《Filth》，硬蕊 7）

| # | 專輯 | id | 經/冷/硬 | 峰值 | cards.js |
|---|---|---|---|---|---|
| 1 | The Velvet Underground《White Light/White Heat》 | `the-velvet-underground-white-light-white-heat` | 5/2/4 | 經 | ✓ |
| 2 | Melt-Banana《Speak Squeak Creak》 | `melt-banana-speak-squeak-creak` | 3/3/5 | 硬 | ✓ |
| 3 | Pharoah Sanders《Tauhid》 | `pharoah-sanders-tauhid` | 4/3/4 | 經硬 | ✓ |
| 4 | Magma《Mëkanïk Dëstruktïw Kömmandöh》 | `magma-mekanik-destruktiw-kommandoh` | 5/4/4 | 經 | ✓ |

三軸 ≥4：經 3／冷 1／硬 4；王牌那軸 ≥4 4 張。

## 特價箱（§4.3；9 張，每晚擺 6 張＝每色 2 張）

| # | 專輯 | id | 經/冷/硬 | topAttr | 單張價（參考） |
|---|---|---|---|---|---|
| 1 | Blur《The Great Escape》 | `blur-the-great-escape` | 3/2/1 | 經典 | $200 |
| 2 | Oasis《Dig Out Your Soul》 | `oasis-dig-out-your-soul` | 3/1/1 | 經典 | $200 |
| 3 | David Bowie《Never Let Me Down》 | `david-bowie-never-let-me-down` | 2/2/1 | 經典 | $100 |
| 4 | The Velvet Underground《Squeeze》 | `the-velvet-underground-squeeze` | 2/3/1 | 冷門 | $200 |
| 5 | Stevie Wonder《Eivets Rednow》 | `stevie-wonder-eivets-rednow` | 2/3/1 | 冷門 | $200 |
| 6 | The Kinks《Preservation Act 1》 | `the-kinks-preservation-act-1` | 2/3/1 | 冷門 | $200 |
| 7 | Metallica《Reload》 | `metallica-reload` | 2/1/3 | 硬蕊 | $200 |
| 8 | Weezer《Van Weezer》 | `weezer-van-weezer` | 2/2/3 | 硬蕊 | $200 |
| 9 | Ramones《Halfway to Sanity》 | `ramones-halfway-to-sanity` | 2/2/3 | 硬蕊 | $200 |

topAttr 經 3／冷 3／硬 3；峰值最高 3；冷門最高 3。開局免費挑 3 張；之後整箱一次 $100（1–3 張）。

## 經濟與配件價（§2.2.5；sim 校準後，一晚內有效、打烊歸零）

| 項目 | 值 | D／規格起始值 |
|---|---|---|
| 開局的錢 | $300 | $0〔補〕 |
| 打贏：序章男子／一般客人／菁英／藏家 | $0／$300／$500／$0 | $0〔補〕／$300／$500／$0〔補〕 |
| 唱片價（看最高星 1–5★） | $100／$100／$200／$400／$800 | $100／$100／$200／$400／$800 |
| 賣回 | 50% | 半價 |
| 特價箱（之後再買，1–3 張一次） | $100 | $100 |
| 櫃檯三件加成（180g 重量盤、絕版編號標、內圈刻字） | $1000 | $1200 |
| 其他配件（只用來算賣回） | 防塵套 $900、黑膠唱針 $1000、洗碟水 $900、原版側標 $1000、神秘見本盤 $1000、監聽耳機 $1000 | 不變 |
