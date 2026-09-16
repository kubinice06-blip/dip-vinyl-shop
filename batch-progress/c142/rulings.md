# c-142 裁定（Blue Note 1968–70，Liberty／UA 期 boogaloo 段）

第 600 起為 a 組，第 615 起留給 b 組；兩組皆 append。

# a 組（Blue Note BST 84285–84341 ＋ World Pacific Jazz 原盤 1 張 ＋ Jazz Classics 6500 再發系列 1 張 ＋ Solid State 原盤 1 張，23 筆覆核）

策展層 a 組，2026-09-16。交件 `batch-progress/c142/prop-a.json`（`g: "a"`），
`node batch-progress/c142/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／105 批 4,341 張、同 rgMbid 不同掛名 0；三筆舊帳是 c49b／cseab 的）。
20 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`，欄位鍵與 `c141/prop-b.json` 完全一致。號段 **600–610**。

## 第 600 條（2026-09-16，c-142 a 組）：**23 筆覆核結果——實收 20、退 3；rgMbid 全部照 enum，無一釘錯（但有一筆 catno 釘錯）；年份改判 12 張；CAA 17/20**

23 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，
再對 20 張收件的原盤 release 打 `release/<id>?inc=recordings` 取原 LP 軌序（**其中 5 張 MB 只有軌數沒有軌序**，見第 607 條）；CAA 打 RG 端點；
年份另核 **本層新抓的 jazzdisco 4200／4300 系列 album-index ＋ 兩張 session 頁 ＋ 1001/2001/6500/9000/89900 系列 album-index**、
維基（MediaWiki API 取原始 wikitext，23 查 15 中）、Discogs `database/search?catno=`（24 個目錄號，不帶 token 每 3.4 秒一次），
以及 **本層自抓的 Billboard 1968-11→1970-12（112 期）與 Cash Box 1968-11→1970-12（110 期）命中頁**（已收進 `batch-progress/enum/`，見 SOURCES 表第五度追加）。
**enum 的 rgMbid 沒有一筆釘錯**（23/23 盤名＋掛名與 MB RG 逐字相符）。

實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`，**合計 19,064 列**；
掛名 26 個關鍵字子字串雙向、盤名 23 個關鍵字、另以 rgMbid 直比各批 prop。
**撞池 1 筆**（見退表 #1），其餘 22 筆 enum 的 `inPool: false` 成立。
盤名層其他命中全是他人假陽性（Genesis《The Lamb Lies Down on Broadway》、Ruth Brown《Blues on Broadway》、Belinda Carlisle《Heaven on Earth》、Bobby Womack《Understanding》、John Mayall《The Turning Point》與另兩張《Turning Point》、Muzsikás《The Prisoner's Song》）；
**兩筆是真的同名不同人，已寫進各卡 risk**：`Don Pullen Quintet`《The Sixth Sense》（1985，seed）與 James Brown《Say It Loud: I'm Black and I'm Proud》（1969，seed）。

**退掉 3 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Jimmy McGriff Organ and Blues Band《The Worm》1968 | 02e86fdb-aa45-3ce0-979c-afb02e1b0b4d | **撞池（chk-prop 抓不到的假陰性）＋ 第 313 條判準表 (c)：Solid State 原盤** | **實掃命中 `Jimmy McGriff — The Worm (1968)`，在 `seed_cards.json` 裡、是線上池的卡。** ⚠ **`chk-prop` 不會報這一筆**：它的鍵是「掛名＋盤名」折疊，slice 的掛名是群組字串 `Jimmy McGriff Organ and Blues Band`、池中是 `Jimmy McGriff`，折不到同一個鍵——**第 315 條所說「標記 0 不等於沒撞卡」的又一種形狀（群組／個人分裂造成的假陰性）**。另外原盤本來也不該收：MB e9bef815 登「1968 US 12" Vinyl，**Solid State Records SMAS-91650**」（那是 Capitol Record Club 號），Discogs `catno:"SS-18045"` 十筆全是 Solid State（1968 美、德、黎巴嫩壓片）；RG 轄下掛 Blue Note 的只有 **2002 US CD 2a38c628**（724353869922，無 catno）——BN 關聯始於 2002。依 c-141 b 第 582 條判準表 (c)（Solid State 屬 United Artists，1968 年與 Liberty 仍是兩家公司；該碟 1985 前從未配過 BN 目錄號）退，與第 580 條退表 #1《Presenting Joe Williams and Thad Jones/Mel Lewis》同形、**且第 589 條「給後批」第 4 點已預告「Solid State 原盤照判準表 (c) 退」**。 |
| 2 | Horace Silver《The Best of Horace Silver》1969 | 22a8b6b8-8359-411c-b472-cb475b3d3d1c | **合輯（MB 未標，第 397 條）——歸第 312 條 §5.6 子批** | BST 84325 是六首舊曲的精選：jazzdisco 4300 目錄頁把它列成「**The Best Of Horace Silver**」（無藝人前綴），session 資料顯示六軌來自 **1954-11-13／1955-02-06／1956-11-10／1959-08-30／1961-05-19（Village Gate 現場）／1962-07-13 六個不同場次**（Doodlin'／The Preacher／Señor Blues／Sister Sadie／Filthy McNasty／The Tokyo Blues），**其中四首的原盤已在池中**（6 Pieces of Silver、Blowin' the Blues Away、The Tokyo Blues 為 seed，Horace-Scope 系列在 c-138）。**Discogs 十二筆 BST 84325 全部標 Compilation**，MB RG 的 `secondary-types` 卻是空的、`disambiguation` 只寫「Original 60's Blue Note Album」——**第 397 條在 Compilation 方向的又一例**，列舉檔因此沒濾掉。依第 312 條與 c-141 b 第 580 條退表 #3 先例，**不插隊、留給 §5.6 子批**；若日後走 §5.6，`year` 取 1969（Cash Box 1969-11-29 評論、Billboard 1969-12-06 新片欄）、`label` 寫 BST 84325，rgMbid 已釘。 |
| 3 | Edmond Hall / The Edmond Hall Celeste Quartet / Edmond Hall's All Star Quintet《Celestial Express》1969 | 7ce3354f-292e-4b41-9c2f-6435e116caf2 | **合輯（78 轉重組再發，MB 未標）＋ 內容與池中既有卡重疊——歸第 312 條 §5.6 子批** | B-6505 不是 1969 年的新專輯，而是 Blue Note 1969 年開的 **「Jazz Classics 6500 series」** 再發系列的第五號——本層抓了 jazzdisco 1001/2001/6500/9000/89900 系列 album-index 核實：B-6501～B-6509 九張**全部**是 1939–49 年 78 轉／10 吋素材重組的多場次選輯（DeParis Dixie、The Funky Piano Of Art Hodes、Original Blue Note Jazz Vol. I／II……）。九軌出自 1941 年的 Celeste Quartet（Charlie Christian、Meade Lux Lewis、Israel Crosby）與 1944 年的 All Star Quintet 兩場，**與池中 c-135 b 已收的《Memorable Sessions in Jazz》（BLP 5026，1953，六軌）是同樣那兩場、只是多了三軌**——收進來會變成同一批錄音的第二張卡。MB `secondary-types` 空、CAA 404。依第 312 條退；若日後走 §5.6，`year` 取 1969、`label` 寫 B-6505，rgMbid 已釘，**且要與《Memorable Sessions in Jazz》互指**。 |

沒有列舉檔假陽性（20 張收件的原盤 release 全部 status Official）、沒有 bootleg、沒有現場盤。

## 第 601 條（同批）：**年份改判 12 張（23 筆裡過半）——這一段的錯誤形狀是「BST 843xx 整段被資料庫提前一年」，而紙本把它們往後推到 1969／1970**

| 盤 | catno | 錄音 | MB frd | jazzdisco | Discogs 原壓 | 紙本 | 定 |
|---|---|---|---|---|---|---|---|
| Three Sounds《Coldwater Flat》 | 84285 | 1968-04 | 1968 | 1968 | 1968×6 | BB 1968-07-27 新片、**BB 爵士榜 1968-10-05 #18 第 1 週**、CB 1968-12-07 年度目錄 | 1968（不改） |
| Reuben Wilson《On Broadway》 | 84295 | 1968-10-04 | 1968 | 1968 | **1969×4** | **BB 1969-01-25 評 ＋ CB 1969-01-25 評** | **1969** |
| Jimmy Smith《Plain Talk》 | 84296 | **1960-03-22** | 1968 | 1968 | 1968×5 | **BB 1969-03-15 評 ＋ CB 1969-03-22 評 ＋ BB 1969-04-05 新片** | **1969** |
| Larry Young《Heaven on Earth》 | 84304 | 1968-02-09 | 1968 | 1968 | 1968×2／DE 1969 | **BB 1969-05-03 評＋新片**（維基引同期） | **1969** |
| Elvin Jones《The Ultimate》 | 84305 | 1968-09-06 | 1968 | 1968 | **1969×7** | **BB 1969-08-02 新片**（維基引同期） | **1969** |
| Big John Patton《Understanding》 | 84306 | 1968-10-25 | 1968 | 1968 | 1968×2／1969×2 | **BB 1969-05-24 評 ＋ 1969-06-07 新片** | **1969** |
| Hank Mobley《The Flip》 | 84329 | 1969-07-12 | **1969** | 1970 | **1970×4** | **BB 1970-03-21 評 ＋ 1970-04-11 新片** | **1970** |
| Herbie Hancock《The Prisoner》 | 84321 | 1969-04 | 1969 | 1969 | **1970×7** | **BB 1970-01-31 評 ＋ 1970-02-07 新片** | **1970** |
| Lee Morgan《The Sixth Sense》 | 84335 | **1967-11-10** | 1969 | 1969 | 1969×3 | **BB 1970-07-18 Liberty/UA 檔期廣告 ＋ 07-25 評 ＋ 08-08 新片；CB 1970-07-18** | **1970** |
| Jean-Luc Ponty《King Kong》 | ST-20172 | 1969-10-06／07 | 1969 | —（非 BN） | **1970×8** | **BB 1970-05-30 評（World Pacific Jazz ST-20172）；CB 1970-07-25**；維基「May 25, 1970」 | **1970** |
| Three Sounds《Soul Symphony》 | 84341 | 1969-08-26／28 | **1969-09-01** | 1969 | 1969×4 | **BB 1970-07-18 Liberty/UA 檔期廣告 ＋ 07-25 評 ＋ 08-08 新片；CB 1970-07-18** | **1970** |
| Big John Patton《Accent on the Blues》 | 84340 | 1969-08-15 | 1969 | 1969 | 1969×3／US repress 1970 | **BB 1970-07-04 新片**（Apple 亦 1970-08-01） | **1970** |
| Jack Wilson《Song for My Daughter》 | **84328**（MB 登 84238） | 1968-09→1969-06 | 1969 | 1969 | 1969×4 | **BB 1970-02-07 新片 ＋ 1970-02-14 評** | **1970** |

**未改判但要記的兩張**：
- **《Always Something There》BST 84298**：slice／MB 已是 1969，但 **jazzdisco 4200 目錄頁寫 1968、Discogs 美德原壓四筆也 1968、維基 infobox 1968（只引 jazzdisco，第 431 條）**——本層以 BB 1969-03-15 評論 ＋ 1969-04-05 新片 ＋ 加拿大原壓兩筆 1969 ＋ DownBeat 1969-09-18 Pekar 評論確認 1969。**這是 slice 對、jazzdisco 錯的一張。**
- **《Fancy Free》BST 84319**：1969 年 11／12 月上市，BB 1969-12-06 新片＋評論，**爵士榜 1970-01-03→1970-02-28 連續在榜**（第 58x 條）——年份 1969，但正文不得寫具體上市日。

**⚠ 方法論（給 b 組與 1970–84 段，與第 561／571／581 條接續）**：
1. **BST 84295 以上整段，MB 與 jazzdisco 的年份幾乎一致地比實際早一年**——不是「錄音年當發行年」（那是 84238–84294 段的形狀），而是**目錄年**：Blue Note 在 1968 年秋天就配好了 84295–84306 的號，碟卻拖到 1969 年 1–8 月才陸續上市。**看到 84295 以上、jazzdisco 寫 1968 的，一律先假設 1969。**
2. **最有效的一條夾擠是 Cash Box 的年度／季度唱片目錄**：**1968-12-07 那期把 Blue Note 逐號列到 BST 84292 為止**（c-141 b 第 58x 條已記），**1969-08-16 那期列到 84313**，**1970-02-21 與 1970-08-08 兩期各有一份新的 Blue Note 號段表**——四份目錄把 1968 年底到 1970 年中切成三段，**沒有自己評論欄的碟可以直接夾進區間**。⚠ 夾擠是推定不是直接證據（c-141 b 已標），但配上 Discogs 原壓群或 Billboard 新片欄就夠硬。
3. **新立一條（本組最有用的）：廠牌自家的檔期廣告是這一段最上位的證據。** Billboard **1970-07-18** 有一整版「**Liberty/UA, Inc. presents a solid Jazz program for July & August**」，把當期主推的盤**逐號印出**（BST-84335、BST-84341、BST-84342／3／4、LST-11004／5／6）——《The Sixth Sense》與《Soul Symphony》就是靠這一版從「MB＝jazzdisco＝Discogs 一致的 1969」改成 1970。**廠牌排的檔期不是第三方回填的年份**，比評論欄硬、比 Discogs 原壓群硬得多。
4. **Discogs 原壓群在本段的命中率是隨機的**：84295／84305／84321／84329／ST-20172 五張比 MB 與 jazzdisco 都準，84296／84335／84340／84341／84328 五張卻整群錯（多半抄盤面 ℗© 年）——**第 550／553 條再證，Discogs 不能單獨定年**。
5. **維基 infobox 在本段有引用的才有用**：Heaven on Earth、The Ultimate、Fancy Free、You Gotta Take a Little Love、Collision in Black、The Flip 六張引了 Billboard／Jazz Monthly、全部正確；Plain Talk、Understanding、Always Something There、Soul Symphony、Accent on the Blues、Song for My Daughter 六張**不是沒引用就是只引 jazzdisco**、全部錯（第 431 條）。
6. **Apple 的 releaseDate 本組 20 張裡 7 張是錄音日**（Understanding 1968-10-25、Turning Point 1969-01-03、You Gotta Take 1969-01-10、The Flip 1969-07-12、The Sixth Sense 1967-11-10、Always Something There 1968-10-28、Song for My Daughter 1968-09-01），**6 張是 01-01 placeholder**，**Fancy Free 的 1970-05-09 是「錄音的月日＋錯的年」（第 484 條新變體）**，**Soul Symphony 的 1969-09-01 與 MB frd 完全相同、疑似同源**（第 431 條）。**只有 Accent on the Blues 的 1970-08-01 與紙本同月**。

## 第 602 條（同批）：**「原盤他廠」逐張判——World Pacific Jazz 1 張改 `label` 收、Solid State 1 張依判準表 (c) 退；enum 漏標 1 筆**

| 盤 | enum note | 判定 | 處置 |
|---|---|---|---|
| Jean-Luc Ponty《King Kong》 | BN 首發 1993，原盤 1969 可能他廠 | 成立，但**年份與廠牌名 MB 都登錯**：原盤是 **World Pacific Jazz ST-20172（US 1970-05，Richard Bock 製作）**，MB cd7bc624 登成「1969 Pacific Jazz」 | **收**，`label` 寫 World Pacific Jazz、`year` 1970；Blue Note 只有 1993 年三筆 CD（CDP 0777 7 89539 2 0） |
| Jimmy McGriff Organ and Blues Band《The Worm》 | BN 首發 2002，原盤 1968 可能他廠（再發） | 成立：Solid State SS-18045（US 1968；MB 那筆登的 SMAS-91650 是 Capitol Record Club 號） | **退**（第 600 條退表 #1，且撞池） |
| Edmond Hall…《Celestial Express》 | （無） | **enum 漏標**：不是他廠，是 **Blue Note 自家 1969 年的「Jazz Classics 6500 系列」再發**，內容為 1941／1944 年 78 轉素材 | **退**（退表 #3，第 312 條合輯） |

**第 313 條判準表在本組的用法**：King Kong 走 **(b)「無 BN 號，但出版當時原廠與 Blue Note 同屬 Liberty／UA 同一家 → 收、`label` 寫原廠」**——
1970 年 World Pacific 與 Blue Note 都掛在 Liberty/UA, Inc.（Billboard 1970-07-18 那版廣告的落款就是「Liberty/UA, Inc., a subsidiary of Transamerica Corporation」），與 c-141 a 第 572 條的 Pacific Jazz 兩張、c-141 b 第 582 條的《Lighthouse '68》同形。
**可逆：主線若把判準收緊到「該張本身 1985 前有沒有 BN 號」，這四張要一起退**，各卡 risk 已標。
The Worm 走 **(c)**：Solid State 屬 United Artists，1968 年 Liberty 尚未與 UA 合併（Transamerica 1968 年才買下 Liberty、1969 年才併），且該碟 1985 前從未配過 BN 號——**與第 589 條「給後批」第 4 點的預告完全一致**。

## 第 603 條（同批）：**掛名——群組收攏 3、既有分裂取多數 2（同一位）、盤面掛名收攏 2、新掛名 1；第 307 條預警 3 筆，其中一筆是本線目前最危險的**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Three Sounds`（群組 cf2115e9）**And**`The Oliver Nelson Orchestra`（Orchestra 6129ef06，MB 名「Oliver Nelson’s Orchestra」）《Coldwater Flat》 | **`The Three Sounds`** | 第 363 條第二型＋c-141 b 第 583 條；池中 `The Three Sounds` 12 張（seed 1＋各批 11）。Nelson 是編曲不是對等聯名；池中另有 `Oliver Nelson` 5 張 seed，本張不掛他 |
| `The Three Sounds`（RG）／盤面與 jazzdisco 作「**A New Sound From The Three Sounds**」《Soul Symphony》 | **`The Three Sounds`** | 第 307 條照池中多數；c-141 b 第 589 條「給後批」第 5 點已預告 |
| `The Horace Silver Quintet`（群組 e9ac5139）《You Gotta Take a Little Love》 | **`Horace Silver`** | c-141 a 第 573 條、c-141 b 第 583 條既有先例；池中 18 張（seed 8＋各批 10），另王牌 `Horace Silver And The Jazz Messengers` 1 張為不同字串 |
| `John Patton`（RG／盤面／jazzdisco）《Understanding》《Accent on the Blues》 | **`Big John Patton`**（兩張） | **既有分裂取多數**，第 583 條先例：池中 `Big John Patton` 6 張 ＞ `John Patton` 1 張（《Along Came John》seed）；Apple 掛的也是 Big John Patton。可逆 |
| `Jimmy Smith`（RG）／盤面「The Incredible Jimmy Smith」《Plain Talk》 | **`Jimmy Smith`** | c-140 b 第 563 條、c-141 a 第 573 條同判；池中 27 張 |
| `Lonnie Smith`（credit）掛在 **Person 58c2a0ee，而該實體的 MB 名字其實是「Dr. Lonnie Smith」**《Turning Point》 | **`Lonnie Smith`** | 第 307 條照池中既有字串（seed 3 張：Think!、Move Your Hand、Drives）；1969 年盤面也是 Lonnie Smith（Dr. 是 1970 年代才加的）。**不新造 `Dr. Lonnie Smith`**，可逆 |
| `Jean‐Luc Ponty`（**MB 名字與 credit 都含 U+2010 連字號**，Person 44cd4e2e，FR，1942-09-29– ，alias「Jean Luc Ponty」）《King Kong》 | **`Jean-Luc Ponty`**（ASCII，**新掛名**） | 第 473／506 條摺 ASCII；池中三種寫法全 0 張；MB 同字串只有這一個 Person 實體，過第 307 條 |
| `Reuben Wilson`／`Larry Young`／`Elvin Jones`／`Donald Byrd`／`Don Cherry`／`Blue Mitchell`／`Hank Mobley`／`Herbie Hancock`／`Lee Morgan`／`Lou Donaldson`／`Jack Wilson`／`Stanley Turrentine` | 照 MB＝照池中 | 同字串 |

**第 307 條預警 3 筆**：
1. **`Lonnie Smith`（最危險的一筆）**——池中同時有 **`Lonnie Smith`（本人，MB 實體名 Dr. Lonnie Smith，58c2a0ee）** 與 **`Lonnie Liston Smith`（b7eb7b38，《Expansions》）**，**兩個是完全不同的人**；MB 還有群組 `Lonnie Smith Trio`（e6f17b43）與 `Dr. Lonnie Smith Octet`（75f2c5cb）。**日後任何 `Lonnie Smith` 進池都要先帶消歧，寫作層查生平務必帶 organist／Blue Note／Dr.**
2. **`Jack Wilson`**——**MB 同字串 17 個實體**，`artist:"Jack Wilson"` 搜尋分數最高的是製作音樂作曲家 4b2dc66f，另有英國樂團領班（1907–2006）、美國民謠搖滾歌手、雷鬼、Fickle Friends 鍵盤手、小號手、金屬吉他手、匹茲堡饒舌歌手。本卡與池中兩張都是 **219c17de（US，1936-08-03–2007-10-05，jazz pianist）**。c-141 a 第 573 條已預警、第 591 條又中一次，**本批第三次記**。
3. **`Larry Young`**——MB 同字串另有民謠的 e1506503 與新英格蘭歌手 a522abff，本卡與池中五張都是 81971abd（US jazz organist，1940–1978）。

## 第 604 條（同批）：**盤名與目錄號——盤名全部照 MB RG title（無非 ASCII 破折號）；但 MB 有一筆 catno 整個釘錯，enum 照抄了**

- **20 張的盤名全部照 MB RG title 逐字**，無撇號／破折號問題（本組沒有 c-141 那種 U+2019 盤名）。**軌名層才有 U+2019**：《Understanding》的「Alfie’s Theme」、《Accent on the Blues》的「Rakin’ and Scrapin’」「Don’t Let Me Lose This Dream」——第 473／506 條，寫作層摺 ASCII。
- **《King Kong》取短名**：MB RG title 與 1970 美國原盤盤面都是「King Kong」，全名「King Kong: Jean-Luc Ponty Plays the Music of Frank Zappa」是副標（英國 Liberty LBS 83375 與部分 Discogs 條目用全名）——依第 45 條取現行流通名，全名進 queryAlias。
- ⚠ **MB 的 catno 釘錯 1 筆（本組最實質的一個資料錯誤）**：**Jack Wilson《Song for My Daughter》的 release 9cc97adc 登「Blue Note BST 84238」**，
  但 **BST 84238 是 Donald Byrd《Mustang!》**（jazzdisco 4200 目錄頁；Discogs `catno:"BST 84238"` 七筆全是 Mustang!，**該張池中已由 c-140 b 收**），
  本張的真號是 **BST 84328**（jazzdisco 4300 目錄頁；Discogs `catno:"BST 84328"` 四筆全是本張）。**enum 的 `catno` 欄照抄了這個錯誤**（slice 該筆 catno 只有 `BST 84238`）。
  **這是第 567 條的第三種變體**：不是「catno 號段與年份不相容」，也不是「載體與年份不相容」，而是 **「catno 指向另一張已在池中的碟」**——
  **判準：收卡時把 catno 拿去 Discogs 反查一次，回來的若是別張碟就是 MB 登錯。** rgMbid 本身沒釘錯，卡上 catno 已改 BST 84328。
- 曲名層的坑（寫作層照通行拼法、MB 與 jazzdisco 都不全對）：《Fancy Free》**MB 作「Weasil」、jazzdisco 與盤面作「Weasel」**；
  《You Gotta Take a Little Love》**jazzdisco 錯兩處**（「The Risings Sun」應為 The Risin' Sun、「The Belly Danger」應為 The Belly Dancer）；
  《Song for My Daughter》**MB 作「Se Todas Fossem Iguais A Voce」**，Jobim 原曲是「Se Todos Fossem Iguais a Você」（jazzdisco 的 Todos 才對）；
  《The Flip》MB「Snappin'」vs jazzdisco「Snappin' Out」；《Turning Point》MB「Seesaw」vs 盤面「See-Saw」；《Coldwater Flat》MB「Grass Is Greener」vs jazzdisco「The Grass Is Greener」；
  《Collision in Black》jazzdisco 把 Swahili 拼成「Swahilli Suite」。**第 470 條：一份來源要按欄位評價——jazzdisco 的年份欄本組錯了 8 次、曲名欄錯了 3 次，MB 的曲名欄也錯了 2 次。**

## 第 605 條（同批）：**現場 0 張；vault 盤 3 張（含本線 1967–84 段最長的一張）；同場拆盤 1 對已補齊**

- **本組 20 張 secondary-types 全空、全是錄音室盤**，錄音地點 Van Gelder 11 張、Liberty Studios（LA）3 張、A&R Studios（NYC）1 張、RPM International（LA）1 張、Studio Barclay（巴黎）1 張、Whitney Studios（Glendale）1 張——**沒有第 397 條「MB 沒標的現場」**。
  ⚠ 唯一沾到現場的是**退件**的《The Best of Horace Silver》：其中〈Filthy McNasty〉出自 1961-05-19 Village Gate 現場（jazzdisco），**這也是它是合輯的旁證之一**。
- **vault 盤 3 張**（錄音到首發的間距，正文不得寫成出版年錄音）：
  **《Plain Talk》錄 1960-03-22、出 1969——九年，本線 1967–84 段目前最長**（超過 c-141 b《Open House》的八年）；
  **《The Sixth Sense》錄 1967-11-10、出 1970-07——兩年八個月**；
  **《Where Is Brooklyn?》錄 1966-11-11、出 1969——兩年七個月**。
  另《Heaven on Earth》（14 個月）、《Song for My Daughter》（最後一場疊錄到上市 7 個月）、《Always Something There》（5 個月）屬正常的 Liberty 期節奏。
- **同場拆盤已補齊**：**《Plain Talk》與 c-141 b 已收的《Open House》（BST 84269）是 1960-03-22 同一場**，c-141 b 第 589 條「給後批」第 2 點預告「後批要收」——**本批收掉了**，兩卡 risk 互指；1992 年 Blue Note CDP 7 84269 2 把兩張合發（jazzdisco，MB 未建這一筆）。
- **同編制第二張**：《The Ultimate》（1968-09-06）與**池中 seed 既有的《Puttin' It Together》（BST 84282，1968-04-08）是同一個三重奏（Farrell／Garrison／Jones）**，只差五個月——risk 已互指；⚠ **MB 把《Puttin' It Together》掛在群組 `The New Elvin Jones Trio`（c424075c）、池中用 `Elvin Jones`**，本卡照池中。
- **多場拼成一張 3 張**（正文不得寫成一場）：《Song for My Daughter》**五場**（1968-09-28／1968-12-16／1969-04-23／1969-06-19／1969-06-21＋06-26 疊錄，班底幾乎每場都換）、
  《Always Something There》**三場**（1968-10-01／14／28，鋼琴從 Hank Jones 換成 Herbie Hancock、吉他從 Galbraith 換成 Burrell、鼓從 Mel Lewis 換成 Mickey Roker，**弦樂是疊錄**）、
  《The Prisoner》**三場**（1969-04-18／21／23，第三場木管換人）；另《Coldwater Flat》三天、《Fancy Free》兩場、《You Gotta Take a Little Love》兩場、《Collision in Black》三天、《Soul Symphony》兩場、《King Kong》兩天。

## 第 606 條（同批）：**關聯組 8 組、同名撞擊 2 處是真的（正文與試聽比對務必帶 catno）**

1. **Blue Mitchell 兩處**：《Collision in Black》領班（1968-09，洛杉磯 RPM、Monk Higgins 編曲）↔《Say It Loud!》側人小號（1968-11-06，Van Gelder）——同人兩種身分、兩種音樂，正文不得互抄。
2. **Monk Higgins 兩處**：《Collision in Black》製作／編曲／多樂器（1968-09）↔《Soul Symphony》作曲／編曲／指揮（1969-08）——**兩支完全不同的樂團**。
3. **Lee Morgan 兩處**：《The Sixth Sense》領班（1967-11-10）↔《Turning Point》側人小號（1969-01-03）——差一年兩個月。
4. **Bennie Maupin 兩處**：《Turning Point》（1969-01-03）↔《You Gotta Take a Little Love》（1969-01-10／17）——**只差一週、卻是兩支不同的樂團**。
5. **Jimmy Ponder／Leo Morris 三處**：《Say It Loud!》（1968-11-06）↔《Fancy Free》（1969-06-06，Leo Morris 第二場）↔ c-141 b《Common Touch》（Ponder，1968-08-30）。
6. **Julian Priester 兩處**：《Turning Point》（1969-01-03）↔《Fancy Free》（兩場皆在）。
7. **Herbie Hancock 兩處**：《Always Something There》側人鋼琴（1968-10-14／28）↔《The Prisoner》領班（1969-04）；**Jerome Richardson 兩處都在**。
8. **The Three Sounds 三處**：《Coldwater Flat》（1968-04，Oliver Nelson 編曲、Simpkins／Bailey）↔ c-141 b《Elegant Soul》（1968-09，Van Gelder）↔《Soul Symphony》（1969-08，Monk Higgins、Henry Franklin／Carl Burnett）——**三張的節奏組與編曲者都不同**；另 **Andy Simpkins 還在《Song for My Daughter》1968-12-16 那場彈貝斯**。
   另 **Big John Patton 兩處**（《Understanding》1968-10-25 三重奏 ↔《Accent on the Blues》1969-08-15 四重奏，班底零重疊，再加 c-141 b《That Certain Feeling》共三場）；**Duke Pearson** 在《Fancy Free》彈電鋼琴、在《Always Something There》當製作人。

**真的同名撞擊 2 處**（池中已有同名盤，上架比對與試聽必須帶掛名＋catno）：
- **《The Sixth Sense》↔ 池中 `Don Pullen Quintet`《The Sixth Sense》（1985，seed）**——盤名逐字相同。
- **《Say It Loud!》↔ 池中 James Brown《Say It Loud: I'm Black and I'm Proud》（1969，seed）**——盤名近似，**而且標題曲就是 Brown 那首**，正文必須寫清楚本張是翻唱。
另**《King Kong》的搜尋汙染最嚴重**（Zappa 自己的〈King Kong〉、電影原聲、Mothers 現場），查詢一律帶 Ponty 或 Zappa；《Turning Point》《Understanding》《On Broadway》《Heaven on Earth》《The Prisoner》的池中命中都是子字串假陽性。

## 第 607 條（同批）：**MB 資料層面的坑 8 個（本層不改 MB）**

1. **原盤 release 有軌數、沒有軌序的 5 張**：《On Broadway》c5035a49、《The Ultimate》de79647d、《Collision in Black》379a7df4 與 4b4a370a（兩筆都沒有）、《The Sixth Sense》9e9be81d、《Always Something There》dd3c7699——`inc=recordings` 回傳的 medium 沒有 track list。**寫作層不得引軌序或軌長，軌名一律出自 jazzdisco。**
2. **catno 釘錯 1 筆**：《Song for My Daughter》9cc97adc 登「BST 84238」＝別張碟的號（第 604 條）。
3. **廠牌名與年份都登錯 1 筆**：《King Kong》cd7bc624 登「1969 Pacific Jazz ST-20172」，實為 **1970 World Pacific Jazz**。
4. **bare 建檔 1 筆**：《The Prisoner》658b6295「1969 US Official，**format 空、無廠牌、無 catno**，5 軌」——第 262／541 條的形。
5. **同 barcode／同內容重複建檔 4 組**：《Heaven on Earth》28cf435d 與 abbab69e（同為 4988006878846，且前者廠牌登成「EMI Music Japan Inc.」）、《The Prisoner》430b039a 與 1cdc3c35（同為 724352564927）、《King Kong》a249f51f 與 f1eac64a（同為 GB Liberty LBS 83375）、《Collision in Black》379a7df4（BLP 4300）與 4b4a370a（BST 84300）是單／立體聲雙號各一筆（這一組**不是錯**，但 CAA 與軌序都掛空）。
6. **barcode 張冠李戴 1 筆**：《Where Is Brooklyn?》c8575015（2014 JP SHM-CD，TYCJ-81065）的 barcode 094631143526 **與 2005 歐洲 CD 4c803ae3 相同**。
7. **無日期 1 筆**：《Say It Loud!》398f1219（DE 12" Vinyl，同時登 BST 84299 與 BST 84 299 K）；**catno 帶空格**的德國號（BST 84 299 K、BST 84 325 K）在本段很常見，上架比對要一起試。
8. **RG 轄下只有 1–2 筆、CD 化史缺**：《Plain Talk》（**1 筆**）、《Song for My Daughter》（**1 筆**）、《Collision in Black》（**2 筆、都是 1969 黑膠，連一張 CD 都沒有**）、《Coldwater Flat》《On Broadway》《Understanding》《Soul Symphony》《Always Something There》（各 2 筆）——研究層以 Discogs master 補。
另：退件的《The Best of Horace Silver》3064bbf6（DE）無日期；《The Worm》2dc1e3ed 是**無日期無國別無廠牌**的 CD。

## 第 608 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us 19/20 命中、1 張三種查法全落空；CAA 17/20，其中 4 張的圖來源是再發**

- **命中且軌數與原盤一致 13 張**：Coldwater Flat（1364618590，10 軌）、On Broadway（1765630097，5 軌）、Plain Talk（1443283445／1587407764 兩筆，4 軌）、Heaven on Earth（1462780950，6 軌）、The Ultimate（1443160060，6 軌）、Understanding（716388561，6 軌，掛「Big John Patton」）、Fancy Free（725834653，4 軌）、Where Is Brooklyn?（715579042，5 軌）、Turning Point（716428281，5 軌 RVG）、You Gotta Take a Little Love（715924725，7 軌 RVG）、The Flip（716627714／1459940218 兩筆，5 軌）、King Kong（724662852，6 軌）、Soul Symphony（716184995，5 軌）、Say It Loud（715797306，5 軌）、Song for My Daughter（1768828974，10 軌）、Always Something There（1435545055／1492516662 兩筆，10 軌）。
- **命中但只有 CD／擴充形 3 張**（前 N 軌對應原盤，c-130 Perfect 先例，留研究層逐軌比）：The Prisoner（725210869 **7 軌**＝2000 擴充版；另 1442939539 **5 軌＝原盤形**，兩個版本都在）、The Sixth Sense（724852908 **9 軌**＝1999 RVG 版）、Accent on the Blues（716205420 **10 軌**＝1997 CD 版）。
- **⚠ 三種查法全落空 1 張：《Collision in Black》**（「Blue Mitchell Collision in Black」／「Collision in Black」／加 Blue Note），只回 The Arcane Order 的近似盤——**本組唯一店面掛零的**，與它 CAA 也 404、RG 只有兩筆黑膠是同一件事：**這張碟從來沒有 CD 或數位版**。
- **同名假陽性混入 3 次**：Heaven on Earth（Phil Collins／Bruno Mars 等四筆）、Soul Symphony（Rubinstein／Hans Zimmer 等四筆）、Song for My Daughter（Christina Perri）；Say It Loud 那次混入的是 Donaldson 自己的《Hot Dog》（池中已有）。
- **CAA：20 張裡 17 張有 front**；**來源是原盤 release 的 13 張**（Coldwater Flat 69ca2c60、On Broadway c5035a49、Plain Talk bd122eee、Heaven on Earth 89b88239、Understanding cf057dfa、Fancy Free 50ea4ec4、Where Is Brooklyn? ca51ecfc、Turning Point eed06465、The Flip 811c37ba、The Prisoner ee4e6809、King Kong cd7bc624、Say It Loud! 0edb8542、Always Something There dd3c7699）；
  **非原盤圖 4 張**（The Ultimate＝2014 JP SHM-CD e7229bb8、You Gotta Take a Little Love＝2007 US CD e5bdd669、The Sixth Sense＝1992 JP CD 51b69d30、Accent on the Blues＝1997 XE CD 4013a81e）——研究層看版式，各卡 risk 已列 Discogs 原壓條目 id。
  **CAA 404 三張：《Collision in Black》《Soul Symphony》《Song for My Daughter》**（Discogs 原壓條目 332288／177750／1041075）。
- ⚠ 依第 589a 條第 2 點，本層的 CAA 抓取自己防了：`redirect: 'follow'`、狀態碼寫進輸出檔、`status>=500` 重試三次——**上面三張是真 404，不是伺服器炸了。**

## 第 609 條（同批）：**抓取端訂正與新收的紙本——Billboard 1969 年檔名有三種形狀（c-141 a 記的那條不完整）**

- 新收進 repo：`batch-progress/enum/billboard-bn-1968h2-1970-ocr.txt`（5.6 MB，**1968-11-02 → 1970-12-26 共 112 期命中頁**，抓不到 1969-07-26 一期）與
  `batch-progress/enum/cashbox-bn-1968h2-1970-ocr.txt`（3.4 MB，**同期間 110 期命中頁**，404 三期：1969-04-05、1969-07-05、1970-10-17）。
  **1970 年的 Billboard 與 Cash Box 至此全掃**（SOURCES 表已加第五度追加那一節）。
- ⚠ **訂正 c-141 a 的抓取端筆記**：「Billboard 1968-08 起、整個 1969 年改成 `BB-YYYY-MM-DD.pdf`」**不完整**。實測 1969 年**三種形狀混用**：
  `BB-YYYY-MM-DD.pdf`（多數）、`Billboard%20YYYY-MM-DD.pdf`（例 1969-05-03）、**`Billboard-YYYY-MM-DD.pdf`（連字號，1969 年 2–3 月的八期）**；
  **1970 年全部是 `Billboard%20YYYY-MM-DD.pdf`，`BB-` 一律 404**。c-141 a 的 BB 檔之所以缺 1969 年 2／3 月的七期，就是只試了一種形狀。
  **三種都要試才算「抓不到」。**
- 六支 shard 並行跑 226 期（含重試）約 90 秒，PDF 邊下載邊用 `pymupdf` 讀文字層、讀完即刪，不留檔。

## 第 610 條（同批）：**交件數字、中間檔、給 b 組與後批**

- **交件 20 張、18 位；退 3**（第 600 條：撞池＋第 313 條 (c) 1、第 312 條合輯 2）；**年份改判 12**（第 601 條，23 筆裡過半）；`label` 改他廠 1（第 602 條）；
  掛名群組收攏 3、既有分裂取多數 2、盤面收攏 2、**新掛名 1**、第 307 條預警 3（第 603 條）；**MB catno 釘錯 1**（第 604 條）；現場 0、vault 3（第 605 條）；CAA 17/20（第 608 條）。
- `genres`：`['jazz','soul']` 12 張、`['jazz']` 8 張（依 c-140 a 先例，boogaloo／soul jazz／電風琴與弦樂流行曲盤標 soul，hard bop、自由爵士與融合不標）。
- `chk-prop a`：**20 張 18 位、標記 0**；跨批 105 批 4,341 張撞卡 0、同 rgMbid 不同掛名 0（三筆舊帳是 c49b／cseab 的）。
  `why` 均長 624／`risk` 1,084／`mbNote` 938 字元（c-141 b 為 556／933／784）——密度達標。
- 中間檔 `scratchpad/c142a/`：`fetch.mjs`＋`mb/`（23 個 RG 的 rg／rel／caa 回傳 ＋ 20 個原盤 release 的 trk 回傳）、`sum.mjs`／`mbsum.txt`、`tracks.mjs`／`tracks.txt`、
  `poolscan.mjs`／`poolscan.txt`（實掃全文，19,064 列）、`web/`（jazzdisco 4200／4300 album-index 與 session 頁、6500 系列 album-index）、`jd-blocks.txt`（20 個目錄號的 session 區塊）、
  `dg.mjs`＋`discogs/`（24 個 catno 反查）、`wiki.mjs`＋`wiki/`（23 查 15 中的原始 wikitext）、`apple.mjs`／`apple.txt`、
  `scrape.py`＋`np/`（六支 shard 的 Billboard／Cash Box 命中頁與 log）、`np2.py`（命中頁反查期號的小工具）、`build1～4.py`（卡單產生，每 5 張寫回磁碟一次）。
- **給 b 組（c-142 後 22 筆）**：
  1. **本組已收的 20 個 rgMbid 若再出現在 b 組 slice，一律退**（同 RG 已收）；特別注意 **enum 依 MB frd 分段，本組有 5 張 1968 段的碟其實是 1969 年出版、7 張 1969 段的碟其實是 1970 年出版**——b 組的 1969／1970 段可能會重複排到。
  2. **84295 以上、jazzdisco 寫 1968 的一律先假設 1969**（第 601 條方法論 1）；**Cash Box 1968-12-07（到 84292）／1969-08-16（到 84313）／1970-02-21／1970-08-08 四份 Blue Note 號段目錄可以直接夾**。
  3. **Billboard 1970-07-18 的 Liberty/UA 檔期廣告**還列了 **BST-84342／84343／84344 與 LST-11004／11005／11006**——b 組若排到這幾號，年份直接是 1970。
  4. `Lonnie Smith`／`Jack Wilson`／`Larry Young` 三個字串的第 307 條預警。
  5. **紙本已掃到 1970-12-26**，1971 年起還沒有人掃。
- **給後批（1971–84 段）**：
  1. **Blue Note「Jazz Classics 6500 系列」B-6501～B-6509 九張全部是 78 轉重組合輯**（本層已核 jazzdisco 目錄），MB 的 `secondary-types` 全空——**enum 濾不掉，後批看到 B-65xx 一律照第 312 條退進 §5.6 子批**。
  2. **Solid State／United Artists 的目錄（McGriff、Thad Jones/Mel Lewis、Joe Williams……）照判準表 (c) 退**；**World Pacific／Pacific Jazz 照 (b) 收、`label` 寫原廠**（本組 King Kong 是第四張）。
  3. **Jimmy McGriff 的碟池中已有三張 seed（I've Got a Woman、The Worm、Electric Funk）**，後批排到他的 Blue Note／Solid State 目錄要先實掃——**`chk-prop` 對「群組掛名 vs 個人掛名」的撞卡是假陰性**（第 600 條退表 #1）。
  4. **Charles Earland／Melvin Sparks／Leo Morris（Idris Muhammad）／James Blood Ulmer** 這批人在 1970 年代初的 Blue Note 目錄會大量出現，本組四張（Say It Loud!、Turning Point、Fancy Free、Accent on the Blues）是他們的起點，正文互指時要分場。
