# 稽核：線上嘻哈卡的固定試聽有四分之一是淨化版

**日期**：2026-08-23　**範圍**：`data/apple-audio-map-v1.json` 中 status=matched
且 `seed_cards.json` 標為 `hiphop` 的 1,062 張卡。

## 起因

c-45 嘻哈批次的試聽救援過程中發現：Apple 上同一張專輯常有**同名、同曲數、
曲序也完全一致的雙胞胎條目**，一筆 `collectionExplicitness: explicit`、
一筆 `cleaned`（消音的淨化版）。單看專輯名、曲名與曲數**完全分不出來**，
自動配對挑中哪一筆純屬隨機。

`pipe-preview.mjs` 從來沒有讀取 `collectionExplicitness` 這個欄位，
`preview.json` 也沒有存過它——也就是說，這個條件在整條管線裡從未被檢查過。

`ALBUM_ONBOARDING.md` §6 明定試聽「必須同時核對藝人、專輯、**版本**」。
淨化版是不同版本，而且對嘻哈這個類型特別失真：被消音改掉的往往正是作品內容本身。

## 掃描結果

| 類型 | 張數 | 佔比 |
|---|---|---|
| `explicit`（原版） | 460 | 43.3% |
| **`cleaned`（淨化版）** | **273** | **25.7%** |
| `notExplicit`（本來就無不雅內容） | 325 | 30.6% |
| 查無條目 | 4 | 0.4% |

`notExplicit` 不是問題（該作本來就沒有需要消音的內容）。**真正要處理的是那 273 張。**

其中不乏正典級作品：JAY-Z《The Blueprint》、Kendrick Lamar《DAMN.》、
Drake《Take Care》、OutKast《Speakerboxxx/The Love Below》、
DMX《It's Dark and Hell Is Hot》、Common《Like Water for Chocolate》、
Missy Elliott《Miss E... So Addictive》、Wu-Tang Clan《8 Diagrams》。

## 對照組：其他類型幾乎不受影響

同一支腳本掃 c-44 搖滾正典批次 217 筆試聽，**淨化版 0 筆**。
這是嘻哈（與部分 R&B）特有的問題，不需要全類型重掃。

## 這批（c-44 / c-45）已經處理掉的部分

c-45 掃出 44 筆淨化版，已全數改抓 explicit 條目或確認 Apple 只有淨化版，
不會帶著這個問題上架。c-44 掃出 0 筆。

## 建議

1. **管線層**：`pipe-preview.mjs` 應把 `collectionExplicitness` 一併存進
   `preview.json`，並在候選排序時把 `cleaned` 降到最後——這是一次性的改動，
   之後所有批次自動受益。
2. **既有 273 張**：屬線上資料（KV／Firestore／靜態地圖），依規則由店主本機處理，
   本環境不寫入。完整清單見下表與 `audits/cleaned-previews-hiphop.json`。
3. 4 筆查無條目的（PARTYNEXTDOOR、Open Mike Eagle、Pete Rock、Apollo Brown）
   是 collectionId 已失效，順帶要重抓。

## 完整清單（273 張）

| 藝人 | 專輯 | collectionId | 店別 | Apple 條目名 |
|---|---|---|---|---|
| 112 | 112 | 79039063 | TW | 112 |
| 2 Chainz | Based on a T.R.U. Story | 1443737114 | TW | Based On a T.R.U. Story (Deluxe Version) |
| 2 Chainz | Pretty Girls Like Trap Music | 1440882010 | US | Pretty Girls Like Trap Music |
| 21 Savage | SAVAGE MODE II | 1534263780 | TW | SAVAGE MODE II |
| 21 Savage | WHAT HAPPENED TO THE STREETS? | 1860789017 | TW | WHAT HAPPENED TO THE STREETS? |
| 21 Savage | american dream | 1725240183 | TW | american dream |
| 2Pac | All Eyez on Me | 1588492978 | TW | All Eyez On Me |
| 2Pac | Better Dayz | 1443727560 | TW | Better Dayz |
| 6LACK | East Atlanta Love Letter | 1434345364 | TW | East Atlanta Love Letter |
| A Tribe Called Quest | We Got It from Here... Thank You 4 Your Service | 1174628861 | US | We got it from Here... Thank You 4 Your service |
| A$AP Rocky | AT.LONG.LAST.A$AP | 994721471 | TW | AT.LONG.LAST.A$AP |
| Aesop Rock | Black Hole Superette | 1792037593 | TW | Black Hole Superette |
| Aesop Rock | Garbology | 1580434097 | TW | Garbology |
| Aesop Rock | Skelethon | 1516889651 | TW | Skelethon |
| Aesop Rock | The Impossible Kid | 1516775181 | TW | The Impossible Kid |
| Aesop Rock | Spirit World Field Guide | 1528643057 | TW | Spirit World Field Guide |
| Anderson .Paak | Malibu | 1074098515 | TW | Malibu |
| Anderson .Paak | Oxnard | 1441767993 | TW | Oxnard |
| Anderson .Paak | Ventura | 1456175798 | TW | Ventura |
| Ari Lennox | Shea Butter Baby | 1745753851 | TW | Shea Butter Baby |
| Ariana Grande | Sweetener | 1399202900 | TW | Sweetener |
| Ariana Grande | petal | 1895420874 | TW | petal |
| Ashanti | Chapter II | 1440661034 | TW | Chapter II |
| Ashanti | Ashanti | 1444119785 | US | Ashanti |
| Atmosphere | Fishing Blues | 1516734668 | TW | Fishing Blues |
| Atmosphere | Southsiders | 1516728074 | TW | Southsiders |
| Atmosphere | When Life Gives You Lemons, You Paint That Shit Gold | 1517037266 | TW | When Life Gives You Lemons, You Paint That Shit Gold |
| Baby Keem | The Melodic Blue | 1587040935 | TW | The Melodic Blue |
| Beyoncé | BEYONCÉ | 780519939 | TW | Beyoncé (Deluxe) |
| Big K.R.I.T. | Live from the Underground | 1442957381 | TW | Live from the Underground |
| Big K.R.I.T. | Cadillactica | 1443141380 | TW | Cadillactica |
| Big Tymers | Hood Rich | 1443526384 | TW | Hood Rich |
| Blackstreet | Another Level | 1440908643 | TW | Another Level |
| Brand Nubian | Everything Is Everything | 1604621189 | TW | Everything Is Everything |
| Brand Nubian | Foundation | 298528720 | TW | Foundation |
| Brent Faiyaz | Larger Than Life | 1710673352 | TW | Larger Than Life |
| Bryson Tiller | True to Self | 1233821767 | TW | True to Self |
| Bun B | Trill O.G. | 1814158663 | TW | Trill O.G. |
| Busta Rhymes | Genesis | 1511197789 | TW | Genesis |
| Cam'ron | Purple Haze | 1453137719 | US | Purple Haze |
| Cardi B | AM I THE DRAMA? | 1822584947 | TW | AM I THE DRAMA? |
| Cardi B | Invasion of Privacy | 1368105671 | US | Invasion of Privacy |
| Chamillionaire | The Sound of Revenge | 1443906042 | TW | The Sound of Revenge |
| Chamillionaire | Ultimate Victory | 1443200550 | TW | Ultimate Victory |
| Chance the Rapper | The Big Day | 1495590749 | TW | The Big Day |
| Chief Keef | Finally Rich | 1444005836 | TW | Finally Rich |
| Christina Aguilera | Liberation | 1387634325 | TW | Liberation |
| Common | Like Water for Chocolate | 1443734256 | TW | Like Water For Chocolate |
| Common | Be | 1443788675 | TW | Be |
| Crime Mob | Crime Mob | 19440684 | TW | Crime Mob |
| Cypress Hill | Black Sunday | 181584608 | TW | Black Sunday (Radio Version) |
| DaBaby | Baby on Baby | 1454072817 | US | Baby on Baby |
| Danny Brown | uknowhatimsayin¿ | 1483816598 | TW | uknowhatimsayin¿ |
| De La Soul | Buhlo͞one Mind State | 1673847295 | TW | Buhloone Mindstate |
| De La Soul | AOI: Bionix | 1674047447 | TW | AOI: Bionix |
| Dilated Peoples | Expansion Team | 724727843 | TW | Expansion Team |
| Dilated Peoples | Neighborhood Watch | 724766022 | TW | Neighborhood Watch |
| DMX | It's Dark and Hell Is Hot | 1434901425 | TW | It's Dark and Hell Is Hot |
| DMX | Grand Champ | 1434896071 | TW | Grand Champ |
| DMX | Flesh of My Flesh, Blood of My Blood | 1440930907 | TW | Flesh of My Flesh, Blood of My Blood |
| Doja Cat | Planet Her | 1573475827 | TW | Planet Her |
| Doja Cat | Hot Pink | 1486465096 | TW | Hot Pink |
| Drake | Take Care | 1440745498 | TW | Take Care (Deluxe Version) |
| Drake | Nothing Was the Same | 1440820956 | TW | Nothing Was the Same |
| Drake | HABIBTI | 6769647917 | TW | HABIBTI |
| Drake | If You're Reading This It's Too Late | 1440830885 | TW | If You're Reading This It's Too Late |
| Drake | Certified Lover Boy | 1584449196 | TW | Certified Lover Boy |
| Drake | Scorpion | 1406109769 | TW | Scorpion |
| dvsn | SEPT. 5TH | 1662164408 | TW | SEPT 5TH |
| dvsn | Morning After | 1662155132 | TW | Morning After |
| Earl Sweatshirt | SICK! | 1605070128 | TW | SICK! |
| Eazy-E | Eazy-Duz-It | 724199664 | TW | Eazy-Duz-It |
| Ella Mai | Heart on My Sleeve | 1620500261 | TW | Heart On My Sleeve |
| Eminem | The Marshall Mathers LP 2 | 1440858761 | TW | The Marshall Mathers LP2 |
| Eminem | The Marshall Mathers LP | 1440906504 | TW | The Marshall Mathers LP |
| Eminem | The Eminem Show | 1440821542 | TW | The Eminem Show |
| EPMD | Business Never Personal | 1738530544 | TW | Business Never Personal |
| Fabolous | Ghetto Fabolous | 343405753 | TW | Ghetto Fabolous |
| Field Mob | 613: Ashy to Classy | 1443753920 | TW | 613: Ashy to Classy |
| Field Mob | Light Poles and Pine Trees | 1445880138 | TW | Light Poles and Pine Trees |
| Fugees | The Score | 1054461239 | TW | The Score |
| Future | I NEVER LIKED YOU | 1622286552 | TW | I NEVER LIKED YOU |
| Future | Honest | 834624449 | US | Honest |
| Future | DS2 | 1017069216 | US | DS2 |
| Future | HNDRXX | 1208303209 | US | HNDRXX |
| Gang Starr | The Ownerz | 723604793 | TW | The Ownerz |
| Gang Starr | One of the Best Yet | 1482966323 | TW | One of the Best Yet |
| Ghostface Killah | Supreme Clientele | 193017131 | TW | Supreme Clientele |
| Ghostface Killah | Bulletproof Wallets | 193602536 | TW | Bulletproof Wallets |
| Ghostface Killah | Fishscale | 1471576648 | TW | Fishscale (Expanded Edition) |
| Ghostface Killah | Apollo Kids | 1443206731 | US | Apollo Kids |
| Goodie Mob | Still Standing | 1566829439 | TW | Still Standing |
| Gucci Mane | The State vs. Radric Davis | 342392469 | TW | The State vs. Radric Davis |
| Gucci Mane | Back to the Traphouse | 269217937 | TW | Back To the Traphouse |
| Gucci Mane | The Appeal: Georgia's Most Wanted | 392608251 | TW | The Appeal: Georgia's Most Wanted |
| Gucci Mane | Everybody Looking | 1135576643 | US | Everybody Looking |
| Gunna | WUNNA | 1514515498 | TW | WUNNA |
| Gunna | DS4EVER | 1604376321 | TW | DS4EVER |
| Ice Cube | Lethal Injection | 724570142 | TW | Lethal Injection |
| Ice Cube | AmeriKKKa's Most Wanted | 723749577 | TW | Amerikkka's Most Wanted |
| Ice Cube | Man Down | 1798685026 | US | Man Down |
| Immortal Technique | The 3rd World | 1647394936 | TW | The 3rd World |
| J. Cole | 2014 Forest Hills Drive | 1600772499 | TW | 2014 Forest Hills Drive |
| J. Cole | Born Sinner | 1529504197 | TW | Born Sinner |
| J. Cole | 4 Your Eyez Only | 1440924436 | TW | 4 Your Eyez Only |
| Ja Rule | Rule 3:36 | 1467916529 | TW | Rule 3:36 |
| Ja Rule | The Last Temptation | 1442832678 | TW | The Last Temptation |
| Ja Rule | Venni Vetti Vecci | 1443135366 | TW | Venni Vetti Vecci |
| Janet Jackson | All for You | 724885014 | TW | All For You |
| JAY-Z | The Blueprint | 1443285079 | TW | The Blueprint |
| JAY-Z | The Black Album | 1440632265 | US | The Black Album |
| Jeremih | Late Nights | 1442989647 | TW | Late Nights |
| Jhené Aiko | Souled Out | 1443227822 | TW | Souled Out (Deluxe) |
| Juice WRLD | Fighting Demons | 1599821039 | TW | Fighting Demons |
| Juice WRLD | Legends Never Die | 1526575291 | TW | Legends Never Die |
| Juice WRLD | Goodbye & Good Riddance | 1571796953 | TW | Goodbye & Good Riddance (Anniversary Edition) |
| Juice WRLD | The Party Never Ends | 1781955158 | TW | The Party Never Ends |
| Jurassic 5 | Feedback | 1673100965 | TW | Feedback |
| Juvenile | 400 Degreez | 1379047877 | TW | 400 Degreez |
| Juvenile | Juve the Great | 1444083055 | TW | Juve the Great |
| Kano | Made in the Manor | 1091299537 | TW | Made In the Manor |
| Kanye West | Late Registration | 1440763821 | TW | Late Registration |
| Kanye West | Graduation | 1442845779 | TW | Graduation |
| Kanye West | The College Dropout | 1437467864 | TW | The College Dropout |
| Kehlani | You Should Be Here | 1676505356 | TW | You Should Be Here |
| Kehlani | blue water road | 1621354546 | TW | blue water road |
| Kendrick Lamar | DAMN. | 1440881722 | TW | DAMN. |
| Kendrick Lamar | Mr. Morale & the Big Steppers | 1624162611 | TW | Mr. Morale & The Big Steppers |
| Kendrick Lamar | GNX | 1781316864 | TW | GNX |
| Key Glock | Glockoma | 1442147482 | TW | Glockoma |
| Key Glock | Yellow Tape | 1496285562 | TW | Yellow Tape |
| Kid Cudi | Man on the Moon III: The Chosen | 1544275140 | TW | Man On the Moon III: The Chosen |
| Killer Mike | R.A.P. Music | 524412438 | TW | R.A.P. Music |
| Kool G Rap | 4, 5, 6 | 169715139 | TW | 4, 5, 6 |
| Lil Baby | My Turn | 1534811491 | TW | My Turn (Deluxe) |
| Lil Baby | It's Only Me | 1649120585 | TW | It's Only Me |
| Lil Baby | Harder Than Ever | 1392815671 | US | Harder Than Ever |
| Lil Jon & The East Side Boyz | Kings of Crunk | 311384329 | TW | Kings of Crunk |
| Lil Jon & The East Side Boyz | Crunk Juice | 425296950 | TW | Crunk Juice |
| Lil Nas X | Montero | 1586182256 | TW | MONTERO |
| Lil Uzi Vert | Eternal Atake 2 | 1777321168 | TW | Eternal Atake 2 |
| Lil Uzi Vert | Luv Is Rage 2 | 1274598012 | US | Luv Is Rage 2 |
| Lil Wayne | Tha Carter III | 1440738372 | TW | Tha Carter III |
| Lil Wayne | Like Father, Like Son | 1452863859 | TW | Like Father Like Son |
| Lil Wayne | Tha Carter | 1440745644 | US | Tha Carter |
| Lil Wayne | Tha Carter II | 1443918957 | US | Tha Carter II |
| Limp Bizkit | Results May Vary | 1464793764 | TW | Results May Vary |
| Little Brother | The Minstrel Show | 79566752 | TW | The Minstrel Show |
| LL Cool J | Mama Said Knock You Out | 1443811286 | TW | Mama Said Knock You Out |
| LL Cool J | The FORCE | 1754095292 | TW | THE FORCE |
| Lloyd | Southside | 1444014241 | TW | Southside |
| Loyle Carner | hopefully ! | 1809204468 | TW | hopefully ! |
| Loyle Carner | hugo | 1638332086 | TW | hugo |
| Lucky Daye | Candydrip | 1612512698 | TW | Candydrip |
| Ludacris | The Red Light District | 1443070297 | TW | The Red Light District |
| Ludacris | Theater of the Mind | 1486421831 | TW | Theater of the Mind (Expanded Edition) |
| Ludacris | Word of Mouf | 1456413816 | TW | Word of Mouf |
| Ludacris | Back for the First Time | 1444167610 | US | Back for the First Time |
| Ludacris | Chicken-N-Beer | 1442839424 | US | Chicken-N-Beer |
| Ludacris | Release Therapy | 1444005860 | US | Release Therapy |
| M.O.P. | First Family 4 Life | 1566468433 | US | First Family 4 Life |
| Mac Miller | Watching Movies With the Sound Off | 1848241290 | TW | Watching Movies with the Sound Off |
| Mac Miller | GO:OD AM | 1025258189 | US | GO:OD AM |
| Makaveli | The Don Killuminati: The 7 Day Theory | 1588165443 | TW | The Don Killuminati: The 7 Day Theory |
| Mario | Go | 1440674348 | TW | Go |
| Marshmello | Shockwave | 1571664370 | TW | Shockwave |
| Master P | Ice Cream Man | 723830167 | TW | Ice Cream Man |
| Megan Thee Stallion | Good News | 1541243687 | TW | Good News |
| Megan Thee Stallion | MEGAN | 1752025676 | TW | MEGAN |
| Megan Thee Stallion | Traumazine | 1639439718 | TW | Traumazine |
| Method Man | 4:21… The Day After | 1443182758 | US | 4:21... The Day After |
| Migos | Culture | 1615488284 | TW | Culture |
| Migos | Culture II | 1440914594 | TW | Culture II |
| Migos | Yung Rich Nation | 1616539339 | TW | Yung Rich Nation |
| Migos | Culture III | 1572352289 | TW | Culture III |
| Miguel | War & Leisure | 1305418479 | TW | War & Leisure |
| Missy Elliott | Miss E... So Addictive | 83134491 | TW | Miss E...So Addictive |
| Missy Elliott | Supa Dupa Fly | 302943316 | TW | Supa Dupa Fly |
| Missy Elliott | Under Construction | 1264578 | TW | Under Construction |
| Missy Elliott | This Is Not a Test! | 139783450 | TW | This Is Not a Test! |
| Missy Elliott | Da Real World | 302939733 | US | Da Real World |
| Mobb Deep | Infamy | 967522365 | TW | Infamy |
| Mobb Deep | Amerikaz Nightmare | 304770712 | TW | Amerikaz Nightmare |
| Monica | Code Red | 1060256956 | TW | Code Red |
| Mos Def | The New Danger | 1444012712 | TW | The New Danger |
| Nas | Stillmatic | 265104376 | TW | Stillmatic |
| Nas | Life Is Good | 1436745185 | US | Life Is Good |
| Ne‐Yo | Self Explanatory | 1634339676 | TW | Self Explanatory |
| Nelly | Country Grammar | 1440782396 | TW | Country Grammar |
| Nelly | Nellyville | 1440735154 | TW | Nellyville |
| Nelly | Heartland | 1582557292 | TW | Heartland |
| Nicki Minaj | The Pinkprint | 1781361306 | TW | The Pinkprint (Tenth Anniversary Edition) |
| Nicki Minaj | Pink Friday: Roman Reloaded | 1440753913 | TW | Pink Friday ... Roman Reloaded |
| Nicki Minaj | Pink Friday | 1541893206 | TW | Pink Friday |
| OutKast | Speakerboxxx/The Love Below | 1774798661 | TW | Speakerboxxx/The Love Below |
| OutKast | ATLiens | 298566410 | TW | ATLiens |
| OutKast | Aquemini | 1536669507 | TW | Aquemini |
| Papa Roach | Infest | 1492001879 | TW | Infest |
| PARTYNEXTDOOR | PARTYNEXTDOOR TWO | 1662166098 | TW | PARTYNEXTDOOR TWO |
| Paul Wall | The People's Champ | 79566615 | TW | The People's Champ |
| Pimp C | Pimpalation | 1814018158 | TW | Pimpalation |
| Polo G | Hall of Fame | 1572345095 | TW | Hall of Fame |
| Pretty Ricky | Bluestars | 63490958 | TW | Bluestars |
| Pretty Ricky | Late Night Special | 262484615 | TW | Late Night Special |
| Pusha T | It's Almost Dry | 1620072483 | TW | It's Almost Dry |
| Pusha T | Daytona | 1389580984 | US | DAYTONA |
| Pusha T | King Push - Darkest Before Dawn: The Prelude | 1443191573 | US | King Push – Darkest Before Dawn: The Prelude |
| Raekwon | The Wild | 1215485005 | TW | The Wild |
| Redman | Muddy Waters Too | 1786454970 | TW | Muddy Waters Too |
| Rick Ross | Port of Miami | 1440778709 | TW | Port of Miami |
| Rick Ross | Trilla | 1442816114 | TW | Trilla (Bonus Track Version) |
| Rick Ross | God Forgives, I Don't | 1443632342 | TW | God Forgives, I Don't |
| Rick Ross | Deeper Than Rap | 1443517381 | US | Deeper Than Rap |
| Rick Ross | Teflon Don | 1445837465 | US | Teflon Don (Exclusive Edition) |
| Rihanna | Anti | 1443230958 | TW | ANTI |
| Run the Jewels | Run the Jewels | 1863305829 | TW | Run The Jewels |
| Sabrina Carpenter | Short n' Sweet | 1752214909 | TW | Short n' Sweet |
| Scarface | The Fix | 1452862762 | TW | The Fix |
| ScHoolboy Q | BLUE LIPS | 1733369224 | TW | BLUE LIPS |
| ScHoolboy Q | Blank Face LP | 1442872177 | US | Blank Face LP |
| Sean Paul | The Trinity | 80429921 | TW | The Trinity |
| Ski Mask the Slump God | STOKELEY | 1835909616 | TW | STOKELEY |
| Ski Mask the Slump God | 11th Dimension | 1836114400 | TW | 11th Dimension |
| Slim Thug | Already Platinum | 1443892975 | TW | Already Platinum |
| Slum Village | Detroit Deli (A Taste of Detroit) | 724198843 | TW | Detroit Deli (A Taste of Detroit) |
| Smino | Blkswn | 1443260737 | US | blkswn |
| Snoh Aalegra | Temporary Highs in the Violet Skies | 1569920193 | TW | TEMPORARY HIGHS IN THE VIOLET SKIES |
| Summer Walker | Over It | 1481897598 | TW | Over It |
| SZA | SOS | 1658650093 | TW | SOS |
| T.I. | I'm Serious | 1875415756 | TW | I'm Serious |
| T.I. | Urban Legend | 1260865978 | TW | Urban Legend (Deluxe Version) |
| T.I. | King | 1258980136 | TW | King |
| T.I. | Paper Trail | 1260878651 | TW | Paper Trail (Deluxe Version) |
| Talib Kweli | The Beautiful Struggle | 1443881163 | TW | The Beautiful Struggle |
| Talib Kweli | Eardrum | 261589228 | TW | Eardrum |
| The Game | LAX | 1469585208 | TW | LAX |
| The Pussycat Dolls | PCD | 1440762224 | US | PCD |
| The Roots | …and Then You Shoot Your Cousin | 1443078394 | TW | ...And Then You Shoot Your Cousin |
| The Weeknd | Beauty Behind the Madness | 1440858094 | TW | Beauty Behind the Madness |
| The Weeknd | Hurry Up Tomorrow | 1793702595 | TW | Hurry Up Tomorrow |
| Three 6 Mafia | Most Known Unknown | 159387865 | TW | Most Known Unknown |
| Three 6 Mafia | Last 2 Walk | 281817041 | US | Last 2 Walk |
| TLC | FanMail | 309066782 | TW | FanMail |
| Travis Scott | Birds in the Trap Sing McKnight | 1151481435 | TW | Birds In The Trap Sing McKnight |
| Travis Scott | UTOPIA | 1708274558 | TW | UTOPIA |
| Travis Scott | Rodeo | 1456179762 | TW | Rodeo |
| Trey Songz | Ready | 328207083 | TW | Ready |
| Trick Daddy | www.thug.com | 358525563 | TW | Www.Thug.Com |
| Trick Daddy | Thug Matrimony: Married to the Streets | 27296123 | TW | Thug Matrimony - Married to the Streets |
| Trick Daddy | Thugs Are Us | 406935005 | US | Thugs Are Us |
| Trina | Da Baddest B***h | 80808188 | TW | Da Baddest B***h |
| Trippie Redd | Pegasus | 1711436581 | TW | Pegasus |
| Tyler, The Creator | DON'T TAP THE GLASS | 1828766736 | TW | DON'T TAP THE GLASS |
| UGK | UGK 4 Life | 309234385 | TW | UGK 4 Life |
| Usher | Confessions | 1765605269 | TW | Confessions (20th Anniversary Edition) |
| Usher | Looking 4 Myself | 1448420461 | TW | Looking 4 Myself (Expanded Edition) |
| Vince Staples | RAMONA PARK BROKE MY HEART | 1618528675 | TW | RAMONA PARK BROKE MY HEART |
| Vince Staples | Big Fish Theory | 1442245025 | TW | Big Fish Theory |
| Vince Staples | Vince Staples | 1573961041 | TW | Vince Staples |
| Vince Staples | Summertime '06 | 1442881975 | US | Summertime '06 |
| Wu-Tang Clan | Wu-Tang Forever | 1568606477 | TW | Wu-Tang Forever |
| Wu‐Tang Clan | 8 Diagrams | 1441460691 | TW | 8 Diagrams |
| Wu‐Tang Clan | The W | 1442977926 | TW | The W |
| XXXTENTACION | Bad Vibes Forever | 1490154776 | TW | Bad Vibes Forever |
| Young Dolph | Role Model | 1436362583 | TW | Role Model |
| Young Dolph | Rich Slave | 1527159397 | TW | Rich Slave |
| Young Jeezy | Let's Get It: Thug Motivation 101 | 1443864907 | TW | Let's Get It - Thug Motivation 101 |
| Young Jeezy | The Recession | 1442208759 | TW | The Recession (Bonus Track Version) |
| Young Jeezy | The Inspiration | 1442887822 | US | The Inspiration (Bonus Track Version) |
| Young Thug | Punk | 1590922823 | TW | Punk |
| Young Thug | So Much Fun | 1477895569 | US | So Much Fun |
| YoungBloodZ | Against da Grain | 299617349 | TW | Against Da Grain |
| Zayn | Mind of Mine | 1087165847 | TW | Mind Of Mine (Deluxe Edition) |
