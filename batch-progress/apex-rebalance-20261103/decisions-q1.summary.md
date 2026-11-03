# 頂點重整 Q1b 決定清單摘要（2026-11-03）

> 只產出決定，不改 seed／manifest／card_catalog。清單：`decisions-q1.json`（111 筆），產生器：`build-decisions-q1.js`（主線判定，未派代理）。

## 數字

| | 張數 |
|---|---:|
| 原殿堂 | 170 |
| 同級去重拿掉（殿堂／流亡／異端） | 74（37／24／13） |
| 濁水溪《鬼島社會檔案》pearl → null | 1 |
| 殿堂補位 | 36 |
| **殿堂最終（不含《台客的復仇》）** | **169** |
| 加上另行上架的《台客的復仇》 | 170 |
| 流亡（Q2 擴充前） | 232 − 24 − 1 = 207 |
| 異端（Q2 擴充前） | 54 − 13 = 41 |

自查：套用後同級內每位藝人最多 1 張（違規 0）；補位 36 張分屬 36 位藝人、都在 `hall-alternates.json` 內（原本沒有任何頂點）。

## 有爭議的取捨（套用前可改）

- **The Beatles**：留 Abbey Road（RS500 2020 第 5、listeners 最高）。Revolver／Sgt. Pepper 都有人會選。另：池中 White Album 有兩筆（`The Beatles` 與 `The Beatles (White Album)`），是重複卡，應另案合併。
- **Bob Dylan**：留 Highway 61 Revisited；RS500 2020 名次最高的是 Blood on the Tracks。
- **Brian Eno**：留 Another Green World（榜單與 listeners）；Music for Airports 是 ambient 命名之作。兩張 7 星重審都沒過，這個殿堂本身就偏弱。
- **This Heat**：留 Deceit（代表作）；同名首張更極端。
- **Various Artists pearl 3 選 1**：照店主給的 54／74 算進去了，但 VA 不是單一藝人，套用時可以豁免、三張都留。
- **殿堂補位邊緣**：Peter Gabriel《So》、CCR《Cosmo's Factory》、Cocteau Twins《Heaven or Las Vegas》是最後幾個名額；落選但可換上的有 Sufjan Stevens《Illinois》、Bon Iver《For Emma》、Talk Talk《Spirit of Eden》、Janis Joplin《Pearl》、T. Rex《Electric Warrior》、Big Star《#1 Record》。
- 華語／日韓、古典、原聲帶的備選這輪全數未收：7 星「非該類型樂迷也知道」的門檻下，它們爭議最大；濁水溪是店主指定的例外。

## 一、同級內一藝人一張（54 組，拿掉 74 張）

| 藝人 | 級 | 留 | 拿掉 |
|---|---|---|---|
| Oasis | hall | (What's the Story) Morning Glory? | Definitely Maybe |
| Stevie Wonder | hall | Songs in the Key of Life | Talking Book、Innervisions |
| Aretha Franklin | hall | I Never Loved a Man the Way I Love You | Amazing Grace |
| Frank Ocean | hall | Blonde | Channel Orange |
| The Beatles | hall | Abbey Road | The Beatles、Revolver、Sgt. Pepper's Lonely Hearts Club Band、Rubber Soul、The Beatles (White Album) |
| Bob Marley & The Wailers | hall | Exodus | Legend |
| Bob Dylan | hall | Highway 61 Revisited | Blood on the Tracks、Blonde on Blonde、Bringing It All Back Home、The Freewheelin' Bob Dylan |
| The Rolling Stones | hall | Exile on Main St. | Let It Bleed、Sticky Fingers、Beggars Banquet |
| The Velvet Underground | hall | The Velvet Underground & Nico | White Light/White Heat |
| The Jimi Hendrix Experience | hall | Are You Experienced | Electric Ladyland |
| Led Zeppelin | hall | Led Zeppelin IV | Led Zeppelin II |
| Pink Floyd | hall | The Dark Side of the Moon | Wish You Were Here |
| David Bowie | hall | The Rise and Fall of Ziggy Stardust and the Spiders from Mars | Hunky Dory、Low、"Heroes" |
| Michael Jackson | hall | Thriller | Off the Wall |
| Prince | hall | Purple Rain | Sign 'O' the Times |
| U2 | hall | The Joshua Tree | Achtung Baby |
| Radiohead | hall | OK Computer | Kid A |
| Black Sabbath | hall | Paranoid | Black Sabbath |
| Miles Davis | hall | Kind of Blue | Bitches Brew、Birth of the Cool |
| John Coltrane | hall | A Love Supreme | Giant Steps |
| Frank Sinatra | hall | In the Wee Small Hours | Frank Sinatra Sings for Only the Lonely |
| Brian Eno | hall | Another Green World | Ambient 1: Music for Airports |
| Various Artists | pearl | Bouquet of Steel | Hardcore Unlawful Assembly、Laos - L'art Du Khène |
| John Williams | hall | Star Wars (Original Motion Picture Soundtrack) | Jaws: Music From the Original Motion Picture Soundtrack |
| Louis Armstrong | hall | The Complete Hot Five and Hot Seven Recordings, Volume 1 | The Complete Hot Five & Hot Seven Recordings, Volume 3 |
| Merzbow | heresy | Pulse Demon | Venereology、1930、Noisembryo、Rainbow Electronics |
| Masonna | heresy | Spectrum Ripper | Inner Mind Mystique |
| 非常階段 | heresy | 蔵六の奇病 | King of Noise |
| The Residents | heresy | Eskimo | Not Available |
| Scott Walker | heresy | The Drift | Bish Bosch |
| Swans | heresy | Filth | Cop |
| Derek Bailey | pearl | Solo Guitar Volume 1 | Lot 74 Solo Improvisations |
| Anthony Braxton | pearl | Seven Compositions 1978 | Saxophone Improvisations, Series F. |
| Throbbing Gristle | heresy | The Second Annual Report | D.o.A: The Third and Final Report |
| This Heat | heresy | Deceit | This Heat |
| Ryoji Ikeda | heresy | +/- | Dataplex、Test Pattern |
| AKA | pearl | Do What You Like | Crazy Joe |
| 生活向上委員会 | pearl | 生活向上委員会ニューヨーク支部 | Live in Masuda |
| Wilson McKinley | pearl | Spirit of Elijah | On Stage |
| Hope of Glory | pearl | Under the Spout Where the Glory Comes Out | Second Look |
| 夢幻 | pearl | Sinfonia della Luna | 過ぎ去りし王国の王女 |
| The Clark Sisters | pearl | Unworthy | Count It All Joy |
| Third Quadrant | pearl | N = R* FP NE FL FI FC L | Seeing Yourself as You Really Are |
| Treatment | pearl | Intensive | The World of Treatment |
| Geoff Mann | pearl | I May Sing Grace | Chants Would Be a Fine Thing、Psalm Enchanted Evening |
| Suzukiski | pearl | Waiting | Kamakura |
| Roscoe Mitchell | pearl | Nonaah | L-R-G / The Maze / S II Examples |
| 光束夜 | pearl | The Dark Spot | ファースト・ライブ1979 吉祥寺マイナー [First live 1979 Kichijoji Minor] |
| 北村英治 | pearl | Happy Cooking | Happy Cooking Vol. II |
| Altan Urag | pearl | Once Upon a Time in Mongolia | Nation |
| Spontaneous Music Ensemble | pearl | Challenge | So, What Do You Think? |
| Organum | pearl | Vacant Lights | Sanctus、Amen |
| Company | pearl | Company 2 | Fables |
| Ned Rothenberg | pearl | Trials of the Argo | Trespass |

## 二、殿堂補位（36 張）

| # | 卡 | 理由 |
|---|---|---|
| 1 | Pearl Jam — Ten | 原殿堂被降級、listeners 306 萬；RS500 收錄，grunge 兩大正典之一 |
| 2 | Green Day — Dookie | listeners 319 萬、全球銷量逾 2,000 萬；RS500 收錄，pop-punk 的大眾門面 |
| 3 | Adele — 21 | listeners 354 萬、21 世紀銷量最高專輯；RS500（2020）收錄 |
| 4 | Rage Against the Machine — Rage Against the Machine | listeners 197 萬；RS500 收錄，rap metal 的原型 |
| 5 | Neutral Milk Hotel — In the Aeroplane Over the Sea | listeners 192 萬；RS500、Pitchfork 90 年代前列，獨立搖滾的跨圈正典 |
| 6 | Nine Inch Nails — The Downward Spiral | listeners 173 萬；RS500 收錄，工業搖滾進主流的代表 |
| 7 | Red Hot Chili Peppers — Blood Sugar Sex Magik | listeners 144 萬；RS500 收錄，Under the Bridge／Give It Away |
| 8 | OutKast — Aquemini | RS500（2020）收錄、評論共識的 OutKast 高峰；listeners 104 萬 |
| 9 | Beyoncé — Lemonade | RS500（2020）前 40、listeners 132 萬；2010 年代跨圈正典 |
| 10 | Arctic Monkeys — Whatever People Say I Am, That's What I'm Not | listeners 350 萬；英國史上最快銷首張，RS500（2020）收錄 |
| 11 | The White Stripes — Elephant | listeners 311 萬；Seven Nation Army，RS500 收錄 |
| 12 | Björk — Homogenic | listeners 106 萬；RS500（2020）收錄，Björk 評論最高之作之一 |
| 13 | Beck — Odelay | 稽核強度 3、listeners 106 萬；RS500 收錄 |
| 14 | Pulp — Different Class | 稽核強度 3、listeners 117 萬；Britpop 正典，RS500 收錄 |
| 15 | Nick Drake — Pink Moon | listeners 154 萬；RS500 收錄，民謠跨圈正典 |
| 16 | Soundgarden — Superunknown | listeners 158 萬；RS500 收錄，Black Hole Sun |
| 17 | Madvillain — Madvillainy | listeners 171 萬；RS500（2020）收錄，地下嘻哈的跨圈正典 |
| 18 | Elliott Smith — Either/Or | listeners 175 萬；RS500（2020）收錄 |
| 19 | Blur — Parklife | listeners 101 萬；Britpop 定義之作，RS500 收錄 |
| 20 | Erykah Badu — Baduizm | listeners 105 萬；neo-soul 定義之作，RS500 收錄 |
| 21 | Chet Baker — Chet Baker Sings | listeners 106 萬；爵士之外也廣為人知的人聲名盤 |
| 22 | Smashing Pumpkins — Siamese Dream | listeners 93 萬；RS500 收錄，90 年代另類搖滾正典 |
| 23 | Eagles — Hotel California | 史上銷量前十的專輯之一；RS500 收錄，非搖滾樂迷也知道 |
| 24 | The Band — The Band | RS500 收錄、評論共識的美式搖滾根源正典 |
| 25 | Derek and the Dominos — Layla and Other Assorted Love Songs | RS500 收錄；Layla，Clapton 生涯代表作 |
| 26 | Blondie — Parallel Lines | listeners 93 萬；RS500 收錄，Heart of Glass |
| 27 | Buena Vista Social Club — Buena Vista Social Club | listeners 95 萬；世界音樂最暢銷專輯之一、葛萊美、1001 Albums 收錄 |
| 28 | Sonny Rollins — Saxophone Colossus | 稽核強度 3；硬咆勃正典，爵士歷代榜必收 |
| 29 | Steve Reich — Music for 18 Musicians | 稽核強度 3；極簡主義的代表作，跨進搖滾／電子榜單 |
| 30 | Can — Tago Mago | 稽核強度 3；krautrock 正典，RS500／Pitchfork 歷代榜收錄 |
| 31 | De La Soul — 3 Feet High and Rising | 稽核強度 3；RS500 收錄，取樣嘻哈的里程碑 |
| 32 | Boards of Canada — Music Has the Right to Children | 稽核強度 3、listeners 123 萬；電子樂跨圈正典 |
| 33 | Creedence Clearwater Revival — Cosmo's Factory | listeners 89 萬；RS500 收錄，CCR 最暢銷原創專輯 |
| 34 | Serge Gainsbourg — Histoire de Melody Nelson | 稽核強度 3；法語流行的世界性正典，歷代榜常客 |
| 35 | Peter Gabriel — So | RS500 收錄、Sledgehammer，Gabriel 銷量與知名度最高之作 |
| 36 | Cocteau Twins — Heaven or Las Vegas | listeners 142 萬；dream pop 定義之作，RS500（2020）收錄 |
