# 店裡的箱子與牆（v4 實際烘進去的貨）

SPEC-v4 §3.1 A3 交件 6、§4.5、D §6。資料：`bins.js`（由 `tools/bake-cards.mjs` 從 `tools/deck-lists.json` 烘出）、`shops/dip.json`（A2 擺的正面封面）。
檢查：`node game-lab/tools/check-covers.mjs`（每張看得到的封面符合那一區的規則、整家店不重複、箱子不跟任何牌組／禮物／特價箱／王牌／牆重複）。

- **替換**：沒有。§4.5 的 113 格（12 箱 ×8＋兩面牆 17）全部照規格烘得出來（封面、試聽都有）。
- **正面**＝站在箱子前看得到的那 3 張（後牆矮櫃 8 張、特價箱 2 張）；其他是翻箱（抽屜）才看得到的。島上原本斜靠的那一格＝正面第 2 張（`front[1]`），一樣從該箱卡池挑。
- **星數**＝經典／冷門／硬蕊；分區只看**第一個曲風標籤**與地區（原聲區看專輯名），不看星數（噪音區另外要求硬蕊 ≥4 而且是最高軸）。

## 民謠／藍調（`folk`，backbin，8 張）

規則：第一個曲風標籤＝民謠／藍調；地區＝台日華以外；不含電子標籤

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Leonard Cohen《Songs from a Room》 | 1969 | 民謠 | 台日華以外 | 4／2／2 |
| ●2 | Nico《Chelsea Girl》 | 1967 | 民謠、古典 | 台日華以外 | 5／2／2 |
| ●3 | Brigitte Fontaine & Areski Belkacem《Vous et nous》 | 1977 | 民謠 | 台日華以外 | 3／3／4 |
| ●4 | Mississippi John Hurt《Last Sessions》 | 1972 | 民謠、藍調 | 台日華以外 | 3／4／1 |
| ●5 | John Prine《John Prine》 | 1971 | 民謠 | 台日華以外 | 5／2／1 |
| ●6 | Steeleye Span《Please to See the King》 | 1971 | 民謠 | 台日華以外 | 4／3／2 |
| ●7 | Howlin' Wolf《Howlin' Wolf》 | 1962 | 藍調 | 台日華以外 | 5／2／2 |
| ●8 | John Lee Hooker《It Serve You Right to Suffer》 | 1966 | 藍調 | 台日華以外 | 4／3／2 |

## R&B／靈魂（`rnb`，isl-0a，8 張）

規則：第一個曲風標籤＝靈魂；地區＝台日華以外

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Sly & the Family Stone《Fresh》 | 1973 | 靈魂 | 台日華以外 | 5／2／2 |
| ●2 | Roberta Flack《Born to Love》 | 1983 | 靈魂 | 台日華以外 | 2／3／1 |
| ●3 | Bobby Womack《The Poet》 | 1981 | 靈魂 | 台日華以外 | 4／2／2 |
|  | Curtis Mayfield《There's No Place Like America Today》 | 1975 | 靈魂 | 台日華以外 | 5／2／2 |
|  | David Bowie《Young Americans》 | 1975 | 靈魂、搖滾 | 台日華以外 | 4／2／1 |
|  | The Doobie Brothers《Minute by Minute》 | 1978 | 靈魂、搖滾 | 台日華以外 | 4／2／1 |
|  | Millie Jackson《Hard Times》 | 1982 | 靈魂 | 台日華以外 | 3／4／2 |
|  | Ohio Players《Tenderness》 | 1981 | 靈魂 | 台日華以外 | 2／4／1 |

## 原聲／圖庫（`ost`，isl-0b，8 張）

規則：原聲帶（專輯名是電影原聲，或列在 `_ost`）

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Goblin《Profondo rosso》 | 1975 | 搖滾 | 台日華以外 | 5／3／2 |
| ●2 | 久石譲《となりのトトロ サウンドトラック集》 | 1988 | 流行、古典 | 日本 | 4／1／1 |
| ●3 | Cliff Martinez《Drive: Original Motion Picture Soundtrack》 | 2011 | 電子 | 台日華以外 | 4／3／2 |
|  | Isaac Hayes《Shaft: Music From the Soundtrack》 | 1971 | 靈魂 | 台日華以外 | 5／2／2 |
|  | 陳明章《戀戀風塵 電影原聲帶》 | 1993 | 民謠 | 台灣 | 4／3／2 |
|  | Jóhann Jóhannsson《Sicario: Original Motion Picture Soundtrack》 | 2015 | 電子、古典 | 台日華以外 | 4／2／4 |
|  | 大野雄二《Original Soundtrack from Lupin III》 | 1978 | 爵士 | 日本 | 4／4／2 |
|  | John Carpenter《Christine》 | 1983 | 電子 | 台日華以外 | 3／3／2 |

## 搖滾／龐克（`rock`，isl-1a，8 張）

規則：第一個曲風標籤＝搖滾；地區＝台日華以外

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Robert Wyatt《Rock Bottom》 | 1974 | 搖滾 | 台日華以外 | 5／2／3 |
| ●2 | Talk Talk《Laughing Stock》 | 1991 | 搖滾、爵士 | 台日華以外 | 5／2／4 |
| ●3 | Mogwai《Come On Die Young》 | 1999 | 搖滾、電子 | 台日華以外 | 4／2／3 |
|  | Sigur Rós《Takk...》 | 2005 | 搖滾、電子 | 台日華以外 | 4／1／2 |
|  | Opeth《Morningrise》 | 1996 | 搖滾 | 台日華以外 | 3／2／4 |
|  | Einstürzende Neubauten《Halber Mensch》 | 1985 | 搖滾、電子 | 台日華以外 | 5／2／4 |
|  | Brian Eno《Taking Tiger Mountain (By Strategy)》 | 1974 | 搖滾、電子 | 台日華以外 | 4／2／3 |
|  | Radiohead《The King of Limbs》 | 2011 | 搖滾、電子 | 台日華以外 | 3／2／3 |

## 日本／CITY（`jp`，isl-1b，8 張）

規則：第一個曲風標籤＝流行／搖滾／靈魂／民謠／世界；地區＝日本

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | 宇多田ヒカル《First Love》 | 1999 | 流行、嘻哈 | 日本 | 5／1／1 |
| ●2 | 大貫妙子《Grey Skies》 | 1976 | 流行 | 日本 | 4／3／2 |
| ●3 | 竹内まりや《Beginning》 | 1978 | 流行 | 日本 | 3／3／1 |
|  | 細野晴臣《Tropical Dandy》 | 1975 | 搖滾、民謠 | 日本 | 4／3／2 |
|  | 吉田美奈子《Monochrome》 | 1980 | 流行、靈魂 | 日本 | 3／3／2 |
|  | 松田聖子《風立ちぬ》 | 1981 | 流行、民謠 | 日本 | 5／2／1 |
|  | はっぴいえんど《はっぴいえんど》 | 1970 | 搖滾 | 日本 | 5／3／2 |
|  | りんけんバンド《なんくる》 | 1990 | 世界、流行 | 日本 | 3／4／1 |

## 嘻哈／放克（`hiphop`，isl-2a，8 張）

規則：第一個曲風標籤＝嘻哈；地區＝台日華以外

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Janet Jackson《Control》 | 1986 | 嘻哈 | 台日華以外 | 5／1／1 |
| ●2 | Dälek《Negro Necro Nekros》 | 1998 | 嘻哈、電子 | 台日華以外 | 3／4／4 |
| ●3 | Public Enemy《The Evil Empire of Everything》 | 2012 | 嘻哈 | 台日華以外 | 2／3／2 |
|  | Usher《Confessions》 | 2004 | 嘻哈、流行 | 台日華以外 | 5／1／1 |
|  | billy woods《Church》 | 2022 | 嘻哈 | 台日華以外 | 3／3／4 |
|  | Nas《God's Son》 | 2002 | 嘻哈 | 台日華以外 | 4／2／1 |
|  | Brandy《Full Moon》 | 2002 | 嘻哈、靈魂 | 台日華以外 | 3／2／1 |
|  | Missy Elliott《Miss E... So Addictive》 | 2001 | 嘻哈、靈魂 | 台日華以外 | 3／2／1 |

## 電子／氛圍（`elec`，isl-2b，8 張）

規則：第一個曲風標籤＝電子；地區＝台日華以外

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Autechre《Tri Repetae》 | 1995 | 電子 | 台日華以外 | 5／2／4 |
| ●2 | Massive Attack《Mezzanine》 | 1998 | 電子 | 台日華以外 | 5／1／2 |
| ●3 | Bonobo《Dial ‘M' for Monkey》 | 2003 | 電子 | 台日華以外 | 3／4／2 |
|  | Venetian Snares《Detrimentalist》 | 2008 | 電子 | 台日華以外 | 3／3／4 |
|  | Squarepusher《Ultravisitor》 | 2004 | 電子、爵士 | 台日華以外 | 4／2／4 |
|  | Boards of Canada《Geogaddi》 | 2002 | 電子 | 台日華以外 | 5／2／3 |
|  | The Chemical Brothers《Push the Button》 | 2004 | 電子 | 台日華以外 | 3／1／1 |
|  | Orbital《Blue Album》 | 2004 | 電子 | 台日華以外 | 3／2／2 |

## 新進（`new`，isl-3a，8 張）

規則：地區＝台日華以外；2020 年以後

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Little Simz《Sometimes I Might Be Introvert》 | 2021 | 嘻哈、爵士 | 台日華以外 | 5／2／2 |
| ●2 | Devendra Banhart《Flying Wig》 | 2023 | 民謠、搖滾 | 台日華以外 | 2／3／2 |
| ●3 | Nine Inch Nails《Ghosts V: Together》 | 2020 | 電子、古典 | 台日華以外 | 2／2／3 |
|  | Beyoncé《Renaissance》 | 2022 | 嘻哈、流行 | 台日華以外 | 5／1／1 |
|  | Kendrick Lamar《Mr. Morale & the Big Steppers》 | 2022 | 嘻哈、爵士 | 台日華以外 | 4／1／3 |
|  | Armand Hammer《Haram》 | 2021 | 嘻哈、爵士 | 台日華以外 | 4／2／3 |
|  | The Weeknd《After Hours》 | 2020 | 電子 | 台日華以外 | 4／1／1 |
|  | Weyes Blood《And in the Darkness, Hearts Aglow》 | 2022 | 流行、搖滾 | 台日華以外 | 3／2／2 |

## 華語／台語（`cpop`，isl-3b，8 張）

規則：第一個曲風標籤＝流行／民謠／搖滾；地區＝台灣／華語（港中）

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | 伍佰 & China Blue《樹枝孤鳥》 | 1998 | 搖滾、流行 | 台灣 | 5／3／3 |
| ●2 | 蔡琴《蔡琴老歌》 | 1985 | 流行、民謠 | 台灣 | 4／5／2 |
| ●3 | 王菲《浮躁》 | 1996 | 流行、搖滾 | 華語（港中） | 5／2／3 |
|  | 張懸 Deserts Chang《神的遊戲》 | 2012 | 搖滾、民謠 | 台灣 | 5／2／2 |
|  | 五月天 Mayday《人生海海》 | 2001 | 搖滾、流行 | 台灣 | 5／2／1 |
|  | 江蕙《紅線》 | 2002 | 流行、民謠 | 台灣 | 4／5／2 |
|  | 陳建年《大地》 | 2002 | 民謠 | 台灣 | 3／4／2 |
|  | 宇宙人《地球漫步》 | 2012 | 搖滾、流行 | 台灣 | 4／3／1 |

## 爵士區（`jazz`，crate-jazz，8 張）

規則：第一個曲風標籤＝爵士；地區＝日本／華語（港中）／台日華以外

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Thelonious Monk《Straight, No Chaser》 | 1967 | 爵士 | 台日華以外 | 3／2／2 |
| ●2 | Kenny Drew《Everything I Love》 | 1973 | 爵士 | 台日華以外 | 3／4／2 |
| ●3 | Ornette Coleman《This Is Our Music》 | 1961 | 爵士 | 台日華以外 | 3／2／4 |
|  | 富樫雅彦《We Now Create - Music for Strings, Winds and Percussions》 | 1969 | 爵士 | 日本 | 5／4／4 |
|  | Freddie Hubbard《Red Clay》 | 1970 | 爵士 | 台日華以外 | 5／2／2 |
|  | Chet Baker《She Was Too Good to Me》 | 1974 | 爵士 | 台日華以外 | 4／2／2 |
|  | McCoy Tyner《Extensions》 | 1972 | 爵士 | 台日華以外 | 3／3／3 |
|  | Grant Green《Feelin' the Spirit》 | 1963 | 爵士 | 台日華以外 | 3／3／2 |

## 台灣區（`tw`，crate-tw，8 張）

規則：第一個曲風標籤＝搖滾／民謠；地區＝台灣

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | 林生祥《種樹》 | 2006 | 民謠、搖滾 | 台灣 | 4／3／2 |
| ●2 | 傷心欲絕《還是偶爾想要偉大》 | 2017 | 搖滾 | 台灣 | 3／4／3 |
| ●3 | 血肉果汁機 Flesh Juicer《GIGO》 | 2015 | 搖滾 | 台灣 | 4／3／4 |
|  | 陳珊妮《完美的呻吟》 | 2000 | 搖滾、流行 | 台灣 | 4／3／3 |
|  | 林生祥《野蓮出庄》 | 2020 | 民謠、搖滾 | 台灣 | 4／3／3 |
|  | 大象體操 Elephant Gym《夢境》 | 2022 | 搖滾 | 台灣 | 3／3／3 |
|  | 落日飛車 Sunset Rollercoaster《Cassa Nova》 | 2018 | 搖滾、流行 | 台灣 | 3／2／2 |
|  | 宇宙人《一萬小時》 | 2015 | 搖滾、流行 | 台灣 | 3／3／1 |

## 噪音區（`noise`，crate-noise，8 張）

規則：第一個曲風標籤＝搖滾／電子／爵士；硬蕊 ≥4 星而且是最高的那軸

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Merzbow《Noisembryo》 | 1994 | 電子 | 日本 | 4／3／5 |
| ●2 | Cecil Taylor《Conquistador!》 | 1967 | 爵士 | 台日華以外 | 4／2／5 |
| ●3 | Captain Beefheart & His Magic Band《Lick My Decals Off, Baby》 | 1970 | 搖滾、藍調 | 台日華以外 | 4／3／4 |
|  | Faust《So Far》 | 1972 | 搖滾 | 台日華以外 | 4／3／4 |
|  | Tangerine Dream《Zeit》 | 1972 | 電子、搖滾 | 台日華以外 | 4／2／4 |
|  | The Fall《Grotesque (After the Gramme)》 | 1980 | 搖滾 | 台日華以外 | 4／3／4 |
|  | Swans《Children of God》 | 1987 | 搖滾、電子 | 台日華以外 | 4／2／4 |
|  | Coil《Love's Secret Domain》 | 1991 | 電子 | 台日華以外 | 4／2／4 |

## 特價區（`sale`，crate-sale，門下方左牆邊）

規則：老闆送的特價箱卡池（`C.bargain`，§4.3：峰值 ≤3、冷門 ≤3；每晚擺 6 張＝每色 2 張）。正面 2 張是固定擺著的封面。

| 正面 | 專輯 | 年份 | 曲風標籤（第一個＝分區依據） | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| ●1 | Blur《The Great Escape》 | 1995 | 搖滾 | 台日華以外 | 3／2／1 |
| ●2 | Weezer《Van Weezer》 | 2021 | 搖滾、流行 | 台日華以外 | 2／2／3 |
|  | Oasis《Dig Out Your Soul》 | 2008 | 搖滾 | 台日華以外 | 3／1／1 |
|  | David Bowie《Never Let Me Down》 | 1987 | 搖滾、流行 | 台日華以外 | 2／2／1 |
|  | The Velvet Underground《Squeeze》 | 1973 | 搖滾、爵士 | 台日華以外 | 2／3／1 |
|  | Stevie Wonder《Eivets Rednow》 | 1968 | 靈魂 | 台日華以外 | 2／3／1 |
|  | The Kinks《Preservation Act 1》 | 1973 | 搖滾 | 台日華以外 | 2／3／1 |
|  | Metallica《Reload》 | 1997 | 搖滾 | 台日華以外 | 2／1／3 |
|  | Ramones《Halfway to Sanity》 | 1987 | 搖滾 | 台日華以外 | 2／2／3 |

## 搖滾／流行牆（wallA）：牆上展示、不賣（8 張）

規則：第一個曲風標籤＝搖滾／流行。區名〔補〕列 §5.7 #3（也可以改成不分曲風的「店長推薦」，預設照曲風）。

| 位置 | 專輯 | 年份 | 曲風標籤 | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| 牆上唱片架（rack-a 第 1 格） | Radiohead《OK Computer》 | 1997 | 搖滾、電子 | 台日華以外 | 7／1／1 |
| 牆上唱片架（rack-a 第 2 格） | Cornelius《Fantasma》 | 1997 | 搖滾、電子 | 日本 | 5／2／3 |
| 牆上唱片架（rack-a 第 3 格） | David Bowie《Low》 | 1977 | 搖滾、電子 | 台日華以外 | 5／2／3 |
| 牆上唱片架（rack-a 第 4 格） | Fishmans《Long Season》 | 1996 | 流行、搖滾 | 日本 | 5／3／3 |
| 牆上唱片架（rack-a 第 5 格） | The Band《Music from Big Pink》 | 1968 | 搖滾、民謠 | 台日華以外 | 5／2／1 |
| 牆上唱片架（rack-a 第 6 格） | Can《Ege Bamyasi》 | 1972 | 搖滾 | 台日華以外 | 5／2／3 |
| 牆上唱片架（rack-a 第 7 格） | 雷光夏 Summer Lei《黑暗之光》 | 2006 | 流行、電子 | 台灣 | 4／3／2 |
| 試聽桌 | Kate Bush《The Dreaming》 | 1982 | 搖滾、流行 | 台日華以外 | 4／2／3 |

## 爵士／靈魂牆（wallB）：牆上展示、不賣（9 張）

規則：第一個曲風標籤＝爵士／靈魂。區名〔補〕列 §5.7 #3（也可以改成不分曲風的「店長推薦」，預設照曲風）。

| 位置 | 專輯 | 年份 | 曲風標籤 | 地區 | 經／冷／硬 |
|---|---|---|---|---|---|
| 牆上唱片架（rack-b 第 1 格） | Bill Evans《Waltz for Debby》 | 1964 | 爵士 | 台日華以外 | 5／1／2 |
| 牆上唱片架（rack-b 第 2 格） | John Coltrane《Blue Train》 | 1958 | 爵士 | 台日華以外 | 5／1／2 |
| 牆上唱片架（rack-b 第 3 格） | Fela Kuti《Zombie》 | 1977 | 爵士、靈魂 | 台日華以外 | 5／2／2 |
| 牆上唱片架（rack-b 第 4 格） | Stevie Wonder《Innervisions》 | 1973 | 靈魂 | 台日華以外 | 5／1／2 |
| 牆上唱片架（rack-b 第 5 格） | Shuggie Otis《Inspiration Information》 | 1974 | 靈魂 | 台日華以外 | 5／3／2 |
| 牆上唱片架（rack-b 第 6 格） | Alice Coltrane《Journey in Satchidananda》 | 1971 | 爵士 | 台日華以外 | 5／3／3 |
| 牆上唱片架（rack-b 第 7 格） | Hermeto Pascoal《Zabumbê-bum-á》 | 1979 | 爵士、世界 | 台日華以外 | 4／4／4 |
| 櫃檯後高櫃 | Herbie Hancock《Maiden Voyage》 | 1965 | 爵士 | 台日華以外 | 5／2／2 |
| 櫃檯後高櫃 | Sun Ra《Space Is the Place》 | 1973 | 爵士 | 台日華以外 | 5／2／3 |

## 其他

- 櫃檯「正在放」：Caetano Veloso《Transa》（不屬於任何一區，check-covers 不查規則）。
- 宇多田ヒカル《First Love》：在日本／CITY 的正面第 1 張，店裡其他地方沒有（D §6 點名）。
- 看得到的封面共 60 張：11 箱 ×3＋後牆矮櫃 8＋特價箱 2＋牆 14＋高櫃 2＋試聽桌 1，整家店不重複。
