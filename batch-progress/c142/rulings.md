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

## 第 611 條（主線 2026-09-16，策展 a 組交件後）：**`chk-prop` 的撞卡檢查折不到「群組掛名 vs 個人掛名」——標記 0 不等於沒撞卡**

a 組退掉的《The Worm》是 `Jimmy McGriff Organ and Blues Band` 掛名，池中那張是 `Jimmy McGriff`
——**`chk-prop` 兩個字串折不到同一鍵，跨批撞卡報 0**，是代理自己實掃卡池抓到的。
**裁定**：`chk-prop` 的「標記 0」**只代表程式查得到的那幾種撞法沒中**，
**簡報第一節第 2 點的「實掃卡池」仍然是每一筆都要做的動作，不得因為 chk-prop 清了就跳過。**
（「失敗與正常長得一樣」家族：**沒撞到，與撞到了但工具折不出來，在 chk-prop 的輸出上長得一模一樣。**）
——與第 179／250／324 條（同名撞擊）、第 307 條（掛名先例）是同一組問題的三個面向。

## 第 612 條（同日）：**新判準——廠牌的「檔期廣告」比評論欄更硬**

a 組靠 **Billboard 1970-07-18 一整版「Liberty/UA, Inc. presents a solid Jazz program for July & August」廠牌檔期廣告**，
把《The Sixth Sense》與《Soul Symphony》從「MB＝jazzdisco＝Discogs 三邊一致的 1969」推到 **1970**。
**階序更新**：**廠牌檔期廣告 ＞ 評論欄／新片欄 ＞ Discogs 原壓群 ＞ jazzdisco／MB 欄位。**
理由：檔期廣告是廠牌自己在**上市當月**掛的，評論欄可能延後幾週到幾個月。

⚠ **這一段（1968–70）MB 與 jazzdisco 的年份是系統性提前一年**——**配好目錄號卻拖到隔年才上市**。
a 組 23 筆裡改判 **12 張**（過半）：On Broadway／Plain Talk／Heaven on Earth／The Ultimate／Understanding **1968→1969**；
The Flip／The Prisoner／The Sixth Sense／King Kong／Soul Symphony／Accent on the Blues／Song for My Daughter **1969→1970**。
**c-143（1970–74）要預期同樣的偏移。**

## 第 613 條（同日）：**a 組收 20 退 3；兩張進 §5.6 待撈清單**

**退表**：
1. Jimmy McGriff Organ and Blues Band《The Worm》——**撞池**（見第 611 條）＋原盤 Solid State SS-18045（第 313 條判準表 (c)）。
2. Horace Silver《The Best of Horace Silver》BST 84325——**合輯**（六軌來自六個不同場次，Discogs 12 筆全標 Compilation，
   **MB 的 `secondary-types` 是空的**——第 397 條又中一次）→ **歸 §5.6**。
3. Edmond Hall《Celestial Express》B-6505——Blue Note 1969 年「Jazz Classics 6500 系列」的 78 轉重組再發，
   **內容與池中 c-135 b 的《Memorable Sessions in Jazz》是同兩場** → **歸 §5.6**。

**MB 資料錯一筆**：Jack Wilson《Song for My Daughter》的 catno 在 MB 登成 **BST 84238**
——**那是 Donald Byrd《Mustang!》的號**（池中已有），真號 **BST 84328**；enum 照抄了，**rgMbid 本身沒錯**。

**可逆的一筆**：《King Kong》原盤不是 Blue Note，是 **World Pacific Jazz ST-20172（1970）**，
依 c-141 判準表 (b) 收、`label` 寫原廠。**主線若日後收緊判準，要與 c-141 的 Pacific Jazz 三張一起退。**

## 第 614 條（同日）：**紙本抓取端的訂正——Billboard 1969 年的檔名有三種形狀**

a 組入庫 `billboard-bn-1968h2-1970-ocr.txt`（112 期）與 `cashbox-bn-1968h2-1970-ocr.txt`（110 期），
**1970 年兩刊至此全掃**。並**訂正 c-141 a 寫在 SOURCES 表的抓取端筆記**：
**Billboard 1969 年的檔名有三種形狀（`BB-`、`Billboard%20`、`Billboard-`），1970 年只有 `Billboard%20`**
——**只試一種會誤判成「這期抓不到」**。
（又一個「失敗與正常長得一樣」：**檔案不存在，與檔名猜錯，在 404 上長得一模一樣。**）

# b 組（Blue Note 1969–70，Liberty／UA 期：BST 84308–84364 ＋ Solid State 原盤 2 張 ＋ Verve 原盤 1 張 ＋ 重複 RG 1 筆，22 筆覆核）

策展層 b 組，2026-09-16。交件 `batch-progress/c142/prop-b.json`（`g: "b"`），
`node batch-progress/c142/chk-prop.mjs b` **標記 0**（19 張 17 位）；與同批 a 組併跑 `chk-prop a b` 亦 **標記 0**（合計 39 張 29 位，三筆舊帳是 c49b／cseab 的）。
b 組 19 個 rgMbid 與同批 a 組 slice、以及 `batch-progress/c1xx/prop-*.json` **1,750 張卡**程式交叉：**重疊 0**。號段 **630–642**（a 組用 600–629）。

## 第 630 條（2026-09-16，c-142 b 組）：**22 筆覆核結果——實收 19、退 3；rgMbid 全部照 enum，無一釘錯；年份改判 3；CAA 15/19；店面掛零 4**

22 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels+artist-credits`，
再對 19 張收件的原盤 release 打 `release/<id>?inc=recordings+media+labels` 取原 LP 軌序（另加退件的兩筆對照）；MB 守 1 req/s、UA `dip-vinyl-shop/1.0 (kubinice06@gmail.com)`。
年份另核 **jazzdisco 4300 系列目錄頁**（沿用 c-141 b 抓的 `scratchpad/c141b/web/jd-catalog-4300-series.html`，本層轉成純文字 `scratchpad/c142b/jd-4300.txt`，84301–84400 逐號逐年）、
維基 infobox（30 個條目，含兩輪補抓）、Discogs `database/search?catno=`（18 個 BN 目錄號）＋ 9 個 master ＋ 4 個 release 端點（不帶 token，每 3.2 秒一次），
以及**本層自抓的 200 期同期紙本**（Cash Box 與 Billboard 各 100 期，1969-05-03 → 1971-03-27；詳見第 635／636 條與 `SOURCES-billboard-cashbox.md`）。
**enum 的 rgMbid 沒有一筆釘錯**（22/22 盤名＋掛名與 MB RG 逐字相符）。

實掃卡池：`seed_cards.json` ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`，**合計 19,064 列**；
掛名 31 個關鍵字子字串雙向、盤名 26 個關鍵字（卷號統一、撇號摺 ASCII、`&`→`and`），另以 rgMbid 直比各批 prop。
**撞池 1 筆**（enum `inPool: false` 有一筆是假陰性，見退表 #2）。盤名層其餘命中全是他人假陽性（Fugees《The Score》與七張《… Original Motion Picture Score》、NELL《Healing Process》、Andra Day〈Lift Every Voice and Sing〉）。

**退掉 3 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Kenny Burrell《Asphalt Canyon Suite》1969 | 7a8e5f5d-b144-4929-92f4-57f3e728171f | **第 313 條判準表 (c)：他廠（Verve／MGM）原盤，1985 前無 BN 目錄號，且出版當時原廠與 Blue Note 不同集團** | 原盤 **Verve V6-8773**（US，MGM／Metro-Goldwyn-Mayer 體系，Discogs master 525970；維基 recorded October 8, 10 & 16, 1969, New York City，Kenny Burrell 與 Johnny Pate 共同製作）。**同期紙本坐實**：Billboard **1970-02-14** 爵士評介「KENNY BURRELL- Asphalt Canyon Suite. Verve V6-8773 (S)」、Billboard **1970-03-07**「New Album Releases」、Billboard 1970-04-11 的 MGM／Verve 整版廣告把 V6-8773 與 V6-8784／8793／8794 並列——**連 1969 這個年份都是錯的，實際上市在 1970 年初**。MB RG 轄下兩筆：b20ea2bb（1969 US 12" Vinyl 10 軌，**Verve V6-8773**，status 空）與 **57ccb66f（無日期、無國別的 Digital Media，Blue Note 無 catno，barcode 602448383020）**——Blue Note 的關聯只存在於這筆晚近數位再發。1970 年 MGM／Verve 與 Liberty/UA 是兩家公司，**套不上第 582／589a 條判準表 (b)**。⚠ 池中 `Kenny Burrell` 已有 16 列（seed 3＋c-136～c-138 五張＋聯名兩組），Verve 時期零張——若日後開 Verve 線，rgMbid 已釘。 |
| 2 | Thad Jones/Mel Lewis Orchestra《Consummation》1970 | b013db65-8d8e-33af-a4e7-528fabefbf00 | **撞池（enum `inPool: false` 是假陰性）** | 池中 `seed_cards.json` 已有 **`Thad Jones & Mel Lewis` —《Consummation》**（obscurity 3）。**enum 的子字串比對比不到，是因為掛名字串不同**（enum／MB 是 `Thad Jones/Mel Lewis Orchestra`，池中是 `Thad Jones & Mel Lewis`）；`chk-prop` 的鍵把 `&` 摺成 `and` 但**不會把 `/` 摺成 `and`**，所以連程式也抓不到——**本層是靠盤名層關鍵字 `consummation` 掃到的**。同一張碟（Blue Note BST 84346，US 1970，8 軌，Discogs 多筆原壓 1970；Billboard 1970-10-24 評介、1971-02-06 與 03-13 報導它入圍並拿下 Grammy「Best Jazz Performance – Large Group」）。**c-141 b 第 589 條第 4 點預告「Thad Jones/Mel Lewis 的 Blue Note 自家號 BST 84346《Consummation》照收」，本層實掃推翻——那張早就在池中，rgMbid 已釘。** |
| 3 | The Horace Silver Quintet《The United States of Mind, Phase 1: That Healin' Feelin'》1970 | cbd38639-6f79-42e7-a9f6-865f1fb13386 | **重複 RG（MB 同一張碟建了兩個 release-group，簡報第二節坑 1「漏折的重複 RG」）** | 與本批收件的 **d6e44a8b「That Healin' Feelin'」** 是同一張實體：兩個 RG 的 credit 同為群組 e9ac5139、frd 同為 1970，轄下各只有一筆 release（a0d32fd4 與 976e3e8d），**同樣是 1970 US 12" Vinyl、同樣 Blue Note BST 84352、同樣 9 軌、曲名與曲序逐字相同**（軌長差 3–12 秒）。Discogs `catno:"BST 84352"` 回的十筆全部是同一張碟（條目名「That Healin' Feelin' (The United States Of Mind / Phase 1)」）。**留流通名那一個（第 45 條），退長題那一個**；⚠ **CAA 的封面偏偏掛在被退的 cbd38639 上**（front 1，來源 a0d32fd4），研究層要從那裡取圖或走 Discogs `r1350544`。兩個 id 都已寫進收件卡的 `mbNote`，主線若要改掛長題 RG 直接對調即可。**本層不改 MB。** |

**`prop 19 ＋ 退表 3 ＝ 22`，第 315 條符合。** 沒有 bootleg、沒有合輯、沒有 `live: true`。

## 第 631 條（同批）：**年份改判 3 張——兩張是 MB 把「跨年出版」四捨五入到錄音年，一張是 MB 整整早了一年；另有 2 張的「兩說」照多數擋下**

| 盤 | catno | 錄音 | MB frd | jazzdisco | Discogs | 維基 | 改 | 決定性證據 |
|---|---|---|---|---|---|---|---|---|
| Elvin Jones《Poly-Currents》 | BST 84331 | 1969-09-26 | **1969** | 1970 | 原壓多筆 1970 | 1970-06 | **1970** | Cash Box **1970-05-02** 評介 ＋ Billboard **1970-05-02** 評介（**兩刊同週但文字完全不同，是兩則獨立稿，不是第 509c／431 條的同一則**）＋ Billboard 1970-06-06 新片欄 |
| The Contemporary Jazz Quintet《Multidirection》 | BST 84339 | 1969-11-26 | **1969** | 1970 | 美德原壓與 master 613500 全 1970 | 1969（無引註） | **1970** | Billboard **1970-07-04** 新片欄；**加上錄音日**——1969-11-26 錄、五週內出版不可能（c-141 b 第 581 條方法論 1） |
| Jeremy Steig《Wayfaring Stranger》 | BST 84354 | 1970-02-11 | **1970** | **1971** | 美德原壓與 master 362699 全 **1971** | **1971** | **1971** | Cash Box **1971-02-13**「The just-issued sets which are encompassed in the new Blue Note program are …『Wayfaring Stranger』by Jeremy Steig…」＋ Billboard **1971-03-13** 新片價目表 |

另一張改判（**與 a 組同一版廣告**）見第 632 條：**Duke Pearson《How Insensitive》BST 84344，1969 → 1970**。

**「兩說」照多數、少數說寫進 risk 的 2 張**：
1. **Randy Brecker《Score》**：MB frd 1970＋Discogs master 421459 與原壓 1970 vs **維基 infobox 1969（無引註）**；錄音 1969-01-24／02-03。本層自抓的 200 期紙本**查無本張的評介或新片欄**（三次 `Randy Brecker` 命中全是別的報導：Cash Box 1969-05-24／05-31 講他在 Horace Silver 團、Billboard 1970-08-29／11-07 講 Dreams）——**無紙本可判，照多數取 1970**。
2. **Jimmy McGriff《Something To Listen To》**：MB／jazzdisco／Discogs master 1060178／維基全 1970，**但同期紙本最早是 Billboard 1971-03-27 的爵士評介**，1970 年 100 期裡查無新片欄或廣告。**照多數維持 1970**；⚠ 若研究層補到 1971 年初的 Liberty/UA 檔期廣告，依 第 612 條（a 組立、主線追認）應改 1971——**與同批《Wayfaring Stranger》完全同形**。

**其餘 14 張 MB＝jazzdisco＝Discogs＝紙本**：Now Hear This 1969（BB 08-16 四星＋09-06 新片欄＋CB 09-27「has just released」）、Charisma 1969（BB 05-24 評介）、Black Rhythm Happening 1969（BB 10-25 四星＋11-01 新片欄）、Merry Ole Soul 1969（BB 11-22 聖誕欄＋12-06 新片欄＋CB 12-20 評介）、Bantu Village 1969（BB 12-06 評介＋新片欄）、Thousand Finger Man 1970（BB 05-02 四星＋06-06 新片欄）、Roots & Herbs 1970（BB 10-24 四星）、Lift Every Voice 1970（BB 05-02 四星＋06-06 新片欄）、Electric Byrd 1970（BB 10-24 四星）、Another Story 1970-05（BB 05-30 評介；MB 罕見帶月）、To Seek a New Home 1970（BB 08-15 Liberty/UA 整版廣告＋12-12 新片欄）、That Healin' Feelin' 1970（CB 10-24 評介）、Worth Waiting For... 1970（CB 10-24＋BB 10-31 評介＋BB 12-05 新片欄）、Consummation 1970（退件，BB 10-24 評介）。

⚠ **給 1971–84 段的方法論**：
1. **84300 號段的 MB 錯誤形狀延續到 1970 年**——「1969 下半年錄、1970 出」仍被四捨五入到錄音年（Poly-Currents、Multidirection），**判準仍是看錄音月**（c-141 b 第 581 條）。
2. **但到 84354 換了一種錯**：MB 把 **1971 年上市的碟登成 1970**，而 jazzdisco／Discogs／維基三家都對——**1971 年起 MB 的 frd 可信度下降，jazzdisco 4300 頁反而變準**。
3. **第 526 條在本批自己打臉一次**：BST 84355《Worth Waiting For...》1970-10 就評介了，號碼更大；BST 84354《Wayfaring Stranger》要到 1971-02 才「just-issued」——**目錄號不等於發行順序，同一號段內差半年以上的例子就在本批**。

## 第 632 條（同批）：**《How Insensitive》1969 → 1970——直接套用 a 組同批第 612 條（廠牌檔期廣告最上位），並補上「缺席即證據」與一則 1970-11 的側證**

Duke Pearson《How Insensitive》BST 84344，**1969 說有四家**：MB frd 1969、jazzdisco 4300 頁 1969、
**Discogs 美國原壓 1350583 標 1969 而同號 8599636 自標 Repress／1970**（壓片層級的區分，不是單純抄年份）、維基 infobox 1969（無引註）。
**改 1970 的三條依據**：

1. **Billboard／Cash Box 1970-07-18 的 Liberty/UA「Jazz Is A Four Letter Word」七八月檔期整版廣告把 BST-84344 連封面逐號印出**
   （同版還有 LST-11005／11006、BST-84335、BST-84341、BST-84342、BST-84343）。
   ****第 612 條**正是用同一版把《The Sixth Sense》BST 84335 與《Soul Symphony》BST 84341 從「MB＝Discogs＝jazzdisco 一致的 1969」改成 1970**（主線已追認為**第 612 條**）——
   **同一版上的 84344 照同一條判準必須一起改**，否則兩組會對同一份證據給出兩種結論。
   ⚠ 該廣告同週登兩刊，依 **第 509c 條只算一個來源**。
2. **缺席即證據**：本層自抓的 Cash Box／Billboard **1969-05-03 → 1971-03-27 共 200 期**（關鍵字含 `84344`／`4344`／`how insensitive`／`duke pearson`／`blue note`）裡，
   **1969 年完全查無本張的評介、新片欄或廣告**；而**同一位藝人同一年的另外兩張都查得到**——《Now Hear This》1969-08-16／09-06／09-27、《Merry Ole Soul》1969-11-22／12-06／12-20。
   在這個覆蓋密度下，缺席不是抽樣誤差。
3. **Billboard 1970-11-28「Studio Track」**：Jack Manno「arranged the Duke Pearson LP『How insensitive,』which was **recently released** on Blue Note Records」——
   **Manno 正是本盤的合唱指揮（維基 Personnel: Jack Manno – conductor），指涉無誤**。

**判準三條都過**：有先例（第 612 條（a 組立、主線追認），同一批同一版廣告）、可逆（改的是卡單 `year` 欄）、卡住整條線（不定就沒辦法交件）。
**可逆點寫在卡上**：研究層若在 1969 年的 Schwann 目錄或 Blue Note 自家目錄頁查到 84344，可改回。

## 第 633 條（同批）：**「原盤他廠」3 張逐張判——Solid State 2 張依判準表 (b) 收、Verve 1 張依 (c) 退；enum 漏標 0，但 enum 的 `inPool` 出現本線第一個假陰性**

| 盤 | enum note | 判定 | 處置 |
|---|---|---|---|
| Randy Brecker《Score》 | BN 首發 1993，原盤 1970 可能他廠 | 成立：**Solid State Records SS 18051**（US 1970，Duke Pearson 製作；原壓標籤欄同時印 Liberty/UA, Inc. 與 United Artists Records, Inc.） | **收**，`label` 寫 Solid State、`year` 1970；Blue Note 只有 1993 英國 CD（3874a735） |
| Candido《Thousand Finger Man》 | BN 首發 1999，原盤 1970 可能他廠 | 成立：**Solid State Records SS 18066**（US 1970，Duke Pearson 製作、Joe Cain 編曲，A&R Studio 1969-09-04／09 錄音） | **收**，`label` 寫 Solid State、`year` 1970；Blue Note 只有 1999 US CD（729d0db2） |
| Kenny Burrell《Asphalt Canyon Suite》 | （**enum 沒標**——因為 MB 那筆 Blue Note release 沒有日期，「晚 3 年」規則沒觸發） | 成立：**Verve V6-8773**（US，實際上市 1970-02，MGM 體系） | **退**（第 630 條退表 #1） |

**第 313 條三格判準表在本組的判法（第 582／589a 條）**：
- **(b) 這一格在 1970 年終於站穩**：c-141 b 退掉《Presenting Joe Williams and Thad Jones/Mel Lewis》（Solid State SS 18008）的理由是「**1966 年** UA 與 Liberty 還是兩家公司」；
  到 **1969–70 年 Transamerica 已把兩家併成 Liberty/UA, Inc.**，本批兩張 Solid State 原盤的**盤標上就印著 Liberty/UA, Inc.／United Artists Records, Inc.**——**這不是推論，是實體盤面**。
  旁證：同批《Wayfaring Stranger》BST 84354 的原壓盤標印「**Solid State Series**」、《Consummation》BST 84346 的 1973／1975／1978 再壓也印「Solid State Series」
  ——**Liberty/UA 1970 年起把 Solid State 目錄整批併進 Blue Note 號段，這條線在盤面上看得見**。
- **(c) 這一格本批新增一個實例**：**Verve／MGM** ——與 Capitol、1968 前的 Solid State、EMI Columbia 同格，退。
- ⚠ **可逆**：主線若把 (b) 收緊到「該張本身 1985 前有沒有 BN 號」，本批《Score》《Thousand Finger Man》要與 c-141 的三張 Pacific Jazz 一起退，rgMbid 都已釘。
- ⚠ **給後批**：Candido 另有一張**真正的 Blue Note 自家號**《Beautiful》BST 84357（1971，jazzdisco；Cash Box 1971-02-13 列為二月檔期新片），**池中零張、本批 slice 也沒有——後批看到要收**，屆時兩卡 risk 互指。

⚠ **enum `inPool` 的假陰性（本線第一個）**：《Consummation》池中明明有，enum 標 `false`——
**因為 enum 與 `chk-prop` 都用「掛名＋盤名」的正規化鍵，而 `/` 不會被摺成 `and`**（`Thad Jones/Mel Lewis Orchestra` vs 池中 `Thad Jones & Mel Lewis`）。
**→ 後批實掃時，盤名層的關鍵字掃描不能省**；只靠 rgMbid 直比與掛名子字串會漏掉這一型。

## 第 634 條（同批）：**掛名裁定——群組收攏 2 張、既有分裂取多數 1 張、印刷體標點摺 ASCII 1 張、往群組收攏 1 張；新掛名 3，第 307 條預警 2**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組 e9ac5139）《That Healin' Feelin'》 | **`Horace Silver`** | 第 482／503／525／543／573／583 條；池中 `Horace Silver` seed 8＋未上傳批次 10＋王牌 1（`Horace Silver And The Jazz Messengers`）。Discogs 盤面「Horace Silver Quintet With Vocals」進 queryAlias。**同批 a 組《You Gotta Take a Little Love》交件也是 `Horace Silver`，兩組一致** |
| `Art Blakey & The Jazz Messengers`（群組 209ddf15）《Roots & Herbs》 | **`Art Blakey and the Jazz Messengers`** | 第 470／525／553／573 條**取池中多數**：`and the` seed 6＋批次 11＝17 ＞ `& The` seed 5；另有 `Art Blakey` 單名 seed 1＋批次 5（Orgy in Rhythm 一系）。⚠ `chk-prop` 的鍵把 `&` 摺成 `and`，兩種寫法在程式眼中同鍵；德國壓 041bf00a 與 1977 美壓 d6e571f2 的 credit 寫「Art Blakey And The Jazz Messengers」 |
| `Kenny Cox & The Contemporary Jazz Quintet`（Person fd303f18 ＋ Group 16d697f2）《Multidirection》 | **`The Contemporary Jazz Quintet`** | **往群組收攏**，照 c-141 b 第 583 條先例：池中既有字串是群組 `The Contemporary Jazz Quintet`（seed《Location》1973 ＋ c-141 b《Introducing Kenny Cox…》），`Kenny Cox` 池中 **0 張**。改的是卡單值、可逆；主線若改以領班立卡，三張要一起改 |
| `“Brother” Jack McDuff`（Person e0cd33e5，**含 U+201C／U+201D**）《To Seek a New Home》 | **`Brother Jack McDuff`** | 第 473／506／566 條把印刷體雙引號摺掉 ＋ 第 307 條照池中 5 張既有寫法（Moon Rappin'／The Honeydripper／Screamin'／Brother Jack McDuff Live!／Down Home Style）。MB 原字串進 queryAlias；群組 `The Brother Jack McDuff Quartet`／`Quintet` 不收攏 |
| `Randy Brecker`《Score》 | **`Randy Brecker`**（新掛名） | MB 4244b5b1 Person，US，1945-11-27–；**MB 同字串只有這一個 Person**（另有群組 `Randy Brecker Session` 64949764，不收攏）；池中 `Randy Brecker`／`Brecker` **0 列**，無消歧問題 |
| `Candido`《Thousand Finger Man》 | **`Candido`**（新掛名） | MB 1f92d1d9 Person「Cuban conga and bongo player」，1921-04-22–2020-11-07；照 MB RG credit 與原盤盤面，**不加重音符**。⚠ MB country 標 US（1946 年後定居紐約），**正文要寫古巴哈瓦那出身** |
| `Jeremy Steig`《Wayfaring Stranger》 | **`Jeremy Steig`**（新掛名） | MB 89222a96 Person，US，1942-09-23–2016-04-13；**MB 同字串只有這一個實體**，無消歧問題 |
| `Duke Pearson` ×3／`Lee Morgan`／`Eddie Gale`／`Blue Mitchell`／`Elvin Jones`／`Andrew Hill`／`Donald Byrd`／`Stanley Turrentine`／`Jimmy McGriff`／`Joe Williams` | 照 MB＝照池中 | 同字串 |

**第 307 條預警 2 筆（寫給後批與本機）**：
1. **`Joe Williams`（本批最需要帶消歧的字串）**：本卡是 MB de09faf8「US jazz vocalist」1918-12-12–1999-03-29＝池中《Count Basie Swings, Joe Williams Sings》同人；
   **MB 同字串另有九個 Person**——`Big Joe Williams` bf295ac0（三角洲藍調，**池中《Piney Woods Blues》就是他**）、製作音樂作曲家 c6b9b8a4、1920 年代長號手 9891f35a、早期爵士班鳩 02b4a120、爵士貝斯 adfc84f4、R&B 貝斯 fb714b27、前衛搖滾主唱 d5e1700d、基督教音樂 3cb826c1、英國 soul/disco 9a30fec1。
   **池中已經同時存在兩個不同的 Williams，日後任何 `Joe Williams` 進池必須先帶消歧。**
2. **`Candido`**：MB 同字串撞擊多——`Cándido`（2eef718c，阿根廷 EBM）、`Candy Candido`（b46f4fab，US 1913–1999）、`Maria Candido`（FR）、`Cándido Fabré`（CU）、`Cândido Botelho`（BR）、`Mondo candido`（IT 團）。池中目前零張，**本卡進池後這個字串就有主了，後續要帶消歧**。
沿用 c-141 b 的預警：**`The Contemporary Jazz Quintet`**（MB 另有 DK e6be0d2e）與 **`Kenny Cox`**（三個 Person）。

## 第 635 條（同批）：**盤名、Live、vault 盤、同場拆盤**

- **盤名全部照 MB RG title 逐字，19 張裡沒有一張需要摺印刷體標點**（本批 22 個 RG title 只有 McDuff 的 **credit** 帶 U+201C／U+201D，title 全是純 ASCII）。要注意的四處：
  `Poly-Currents`（ASCII U+002D，Cash Box／Discogs 寫成「Poly -Currents」「Poly Currents」）、
  `Worth Waiting For...`（**結尾三個 ASCII 句點**，維基與部分目錄無點）、
  `Something To Listen To`（**To 與 Listen 皆大寫**，維基與 Discogs 作 “Something to Listen To”）、
  `That Healin' Feelin'`（兩個撇號本來就是 ASCII U+0027；副題 (The United States Of Mind / Phase 1) **不進盤名、只進 queryAlias**）。
- **Live 0 張**：19 張的 `secondary-types` 全空，盤面與維基亦無現場跡象——錄音地是 Van Gelder 12 張、A&R Studios 3 張（Score／Thousand Finger Man／Wayfaring Stranger）、洛杉磯 1 張（Bantu Village）、GM Studios 底特律 1 張（Multidirection）、**倫敦 1 張（To Seek a New Home）**、不明 1 張（Something To Listen To）。**沒有第 397 條「MB 沒標的現場」。**
- **vault 盤 1 張，但是本線目前最長的**：**《Roots & Herbs》1961-02／05 錄、1970-10 出，九年**（c-141 b《Open House》的八年紀錄被打破）。`year` 取首次商業發行年、錄音年進正文與 risk（第 575／584 條）。
  次長的是 **《Charisma》1966-09-29 錄、1969-05 出，兩年半**——不到 vault 盤的長度，但正文一樣不得把 1969 寫成錄音年。
- **「一張碟兩場」5 張**（正文都不得寫成一場）：《Merry Ole Soul》（1969-02-25／08-19，Airto 只在三軌）、《How Insensitive》（1969-04-11／04-14／05-05，**三場**，Flora Purim 只唱後者）、《That Healin' Feelin'》（1970-04-08／06-18，**兩場班底完全不同**）、《Thousand Finger Man》（1969-09-04／09）、《Lift Every Voice》（原盤 1969-05-16 一場，**CD bonus 才是 1970-03-06／13 的另一場**）。
- **「原盤 vs 擴充版」要分清的 4 張**：《Lift Every Voice》原盤 5 軌／CD 與串流 11 軌（bonus 六軌是 Lee Morgan／Bennie Maupin／Ron Carter／Ben Riley 的另一場，**不得寫進原盤陣容**）、《Roots & Herbs》原盤 6 軌／1999 CD 9 軌／1999 數位 8 軌、《Merry Ole Soul》原盤 9 軌／2003 日本 CD 10 軌、《How Insensitive》原盤 10 軌／2004 日本 CD 11 軌。**比對一律只認原盤軌數**（c-130 Perfect 先例可採前 N 軌）。
- **同批跨卡互指（正文不得互抄陣容）——本組 8 組**：
  1. **Duke Pearson 五處**：《Now Hear This》《Merry Ole Soul》《How Insensitive》三張領班盤（三種編制），**另製作《Score》《Thousand Finger Man》《Another Story》《Electric Byrd》四張、並在《Electric Byrd》彈電鋼琴**——本批 19 張裡有 7 張和他有關。
  2. **Randy Brecker 三處**：《Score》領班（1969-01／02）↔《Now Hear This》小號（1968-12-03）↔《That Healin' Feelin'》小號與翼號（1970-04-08）。
  3. **Elvin Jones 兩處**：《Poly-Currents》領班（1969-09-26）↔《Black Rhythm Happening》鼓（1969-05-02）。
  4. **Candido Camero 兩處**：《Thousand Finger Man》領班（1969-09-04／09）↔《Poly-Currents》康加（1969-09-26）——**兩場只差三週，正文不得寫成同一批 session**。
  5. **Lee Morgan 兩處**：《Charisma》領班（1966-09-29）↔《Roots & Herbs》小號（1961）↔《Lift Every Voice》**CD bonus** 小號（1970）。
  6. **Eddie Gómez 兩處**：《Score》↔《Wayfaring Stranger》。
  7. **Mickey Roker 六處**：Now Hear This／Merry Ole Soul／How Insensitive／Score／Electric Byrd／Another Story／That Healin' Feelin'；**Jerry Dodgion 三處**（Now Hear This／Score／Electric Byrd）；**Pepper Adams 三處**（Now Hear This／Poly-Currents／Electric Byrd）；**Frank Foster 兩處**（Now Hear This／Electric Byrd，c-141 b 第 583 條新立的掛名）；**Bob Cranshaw 三處**；**Airto Moreira 三處**（Merry Ole Soul／How Insensitive／Electric Byrd）——**寫節奏組與管樂組時務必分場**。
  8. **Thad Jones 兩處**：《Another Story》翼號（1969-03-03）↔ 退件的《Consummation》（池中 seed）——**正文提 Thad Jones 時不要連到 Consummation 那張卡**。
- **跨批互指**：《Roots & Herbs》↔ 池中 seed《The Freedom Rider》↔ c-141 a《The Witch Doctor》（**同一批 1961 年母帶拆成三張，c-141 a 第 576 條第 3 點已預告**，c-141 a 第 579 條把號碼誤記成 84303、第 589a 條第 5 點訂正為 **84347**，本層核實無誤）。

## 第 636 條（同批）：**紙本——本層自抓 200 期（第一次跨進 1971），並記兩個抓取端的坑**

repo 既有的三份檔案（`cashbox-bn-1968-69-ocr.txt`／`cashbox-bn-1969h2-ocr.txt`／`billboard-bn-1967-69-ocr.txt`）
**對本批 18 個目錄號的命中率是 0/18**——如派工信所料，那些是用 c-141 的關鍵字存下的命中頁。本層重抓：

- `batch-progress/enum/cashbox-bn-1969h2-1971q1-ocr.txt`（3.6 MB，**1969-05-03 → 1971-03-27，100 期中 99 期**，404 一期：1970-10-17）
- `batch-progress/enum/billboard-bn-1969h2-1971q1-ocr.txt`（6.9 MB，同期間 100 期中 94 期，抓不到六期：1969-05-10／06-28／07-26、1970-04-18／05-09／12-26）

涵蓋表已更新到 `SOURCES-billboard-cashbox.md`。**兩個坑**：

1. **Cash Box 1971 年改檔名**：`.../Cash-Box/70s/1971/CB-1971-MM-DD.pdf` **整年 404**，1971 年起是
   `.../Cash-Box/70s/1971/**Cash-Box**-1971-MM-DD.pdf`。1970 年仍是 `CB-`。
   → **c-141 a 記的「Cash Box 是單一形狀」到 1971 年就不成立，兩種都要試。**
   （Billboard 方面本層實測與 c-142 a 的第 609／614 條訂正一致：1970 年只有 `Billboard%20YYYY-MM-DD.pdf` 可用，`BB-` 全 404。）
2. **⚠ 1970 年的 Billboard 文字層是逐字硬斷行的，跨行片語 `grep` 會全部落空。**
   `BB-1970-10-24` 第 68 頁的爵士四星欄**同時評了本批的《Electric Byrd》與《Roots & Herbs》**，
   但文字層存成 `DONALD BYRD- Electric \nByrd.`／`Roots I \nHerbe.` 這種逐字換行——`grep "Electric Byrd"` **零命中**，
   本層第一輪因此一度誤判「這兩張查無紙本」。
   **→ 比對前一定要先把換行摺成空白（`' '.join(text.split())`）再跑正則**；目錄號也要同時試 OCR 變體。

⚠ **第 509c 條（紙本誤植）在本批中了四次**：Billboard 1970-10-24 把《Electric Byrd》的 84349 印成 **84249**、把 Blakey 印成 **BLANEY**、把《Roots & Herbs》印成 **Roots I Herbe / BST 04347**；
Billboard 1970-12-05 把《Worth Waiting For...》印成 **BTS 84355**；Billboard 1971-03-27 把《Something To Listen To》印成 **Blue Note Eli 54304**；
Cash Box 1970-10-24 把《That Healin' Feelin'》的副題印成 **The United Phases Of Mind Phase 1**。
**四次全靠掛名＋盤名交叉定位，沒有一次能只信印出來的號碼。**

⚠ **本層實掃順帶查到、與主線第 611／613 條互相印證的兩筆**（a 組交件時都已自行處理，記在這裡只為留痕與加證）：
(a) a 組退掉的《The Worm》（`Jimmy McGriff Organ and Blues Band` vs 池中 `Jimmy McGriff`，第 611／613 條）——**本層從紙本補到硬證據**：Billboard 爵士專輯榜上「THE WORM, Jimmy McGriff, Solid State SS 18045」**從 1969-01-04 到 1969-07-12 連續在榜，榜列自印的週數一路走到「29」**（第 58x 條「榜位最硬」）。**這同時證明本批第 630 條退表 #2 的《Consummation》是同一型的漏網**：`chk-prop` 折不到的不只「群組 vs 個人」，還有 **`/` 與 `&`**（`Thad Jones/Mel Lewis Orchestra` vs `Thad Jones & Mel Lewis`）。
(b) a 組 slice 的《King Kong》掛名 `Jean‐Luc Ponty` 帶 **U+2010 非 ASCII 連字號**（會被 `chk-prop` 擋），a 組交件已改成 ASCII。

## 第 637 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 15/19 命中、4 張三種以上查法全落空；CAA 15/19，4 張 404、4 張的圖來源是再發不是原盤**

- **命中且軌數＝原盤**（12 張）：Now Hear This `1371781859`（9 軌）、Charisma `724266106`（6）、Black Rhythm Happening `723469508`（8）、Merry Ole Soul `1443872276`（9）、Bantu Village `1436246997`（7）、Poly-Currents `1444204534`（5）、How Insensitive `1442916912`（10）、Score `1506114621`（8）、Thousand Finger Man `725856394`（6）、Electric Byrd `724057792`（4）、Another Story `1435548171`（5）、That Healin' Feelin' `1460195030`（9）、Wayfaring Stranger `1492507001`（6）。
- **命中但只有擴充形**：**Lift Every Voice** `1443798231`（**Lift Every Voice (Bonus Track Version)、11 軌**，沒有純 5 軌原盤形——前五軌對應原盤，c-130 Perfect 先例可採）。
- **命中兩個版本**：**Roots & Herbs** `738332002`（9 軌＝1999 CD 形，releaseDate **1961-01-01＝錄音年**）與 `1444212001`（**6 軌＝原盤形**，releaseDate 2013-01-01）。
- **⚠ 三種以上查法全落空 4 張**（本批最多的一次）：**《Multidirection》**（三種查法都只回**姊妹盤**《Introducing Kenny Cox…》`716068112`，12 軌＝2007 Connoisseur 形——與 c-141 b《Open House》完全同形）、**《To Seek a New Home》**（四種查法零回應）、**《Worth Waiting For...》**（三種查法都只回同名不同人的 `1133478709` See Siang Wong《Cinema Classics》）、**《Something To Listen To》**（三種查法零回應）。**這四張疑似未上串流。**
- **releaseDate 一如第 484 條**：19 次查詢裡 **11 次是 01-01 placeholder**、**3 次是錄音日／錄音年**（Charisma 1966-09-29、Another Story 1969-03-03、Roots & Herbs 1961-01-01）、**1 次是維基那個沒有引註的日期**（Bantu Village 1969-09-16，**與維基同源機率高，不得當第二個獨立來源**，第 431 條）、**1 次沿用了 MB 的錯年**（Wayfaring Stranger 1970-01-01，卡上是 1971）。
- **本批 Apple 沒有出現空 body**（c-140 b 第 568 條那種），但**同名盤混入兩次**（Lift Every Voice → Andra Day 2024 單曲；Worth Waiting For → See Siang Wong）。
- **店面掛名與本卡不同**：Horace Silver Quintet、Kenny Cox、Mel Lewis & Thad Jones（退件）——上架比對要用店面寫法。
- **CAA：19 張裡 15 張有 front**。**來源是原盤 release 的 11 張**（Now Hear This 3c1c4790、Charisma c9fb7830、Merry Ole Soul a5416080、Poly-Currents 119ff6ee、Multidirection 05bf72c6、How Insensitive 034021f7、Score 2ee35b6e、Thousand Finger Man 2eefd0e5 德壓、Electric Byrd ebe780c0、To Seek a New Home 899531b9、Wayfaring Stranger 043de537）；
  **非原盤圖 4 張**（Bantu Village＝2011 英國 Soul Brother CD、Roots & Herbs＝1970-10-01 的 XW 數位、Lift Every Voice＝2001 美國 CD 的 bonus track 版封面、Another Story＝2014 日本 CD）——研究層看版式，各卡 risk 已列 Discogs 原壓條目 id。
- **CAA 404 四張**：**《Black Rhythm Happening》《That Healin' Feelin'》《Worth Waiting For...》《Something To Listen To》**。
  ⚠ **四張都以 `redirect: 'follow'` ＋ `status >= 500` 重試三次重抓過一輪、狀態碼確為 404**（第 589a 條第 2 點：代理臨時抓取要自己防，本層照做）。
  **《That Healin' Feelin'》的封面其實存在——掛在被退的重複 RG cbd38639 上（front 1，來源 a0d32fd4＝同一張 1970 US 原盤）**，研究層可直接取；其餘三張的替代圖：Discogs `r1018259`／`r15836411`（Black Rhythm Happening）、`r1188467`（Worth Waiting For...，Ron Wolin 美術指導、Herb Kravitz 封面攝影）、`r17230279`（Something To Listen To，Ron Wolin 美術指導、John Uomoto 霓虹字設計、Joel Franklin 攝影）。

## 第 638 條（同批）：**MB 資料層面的坑 7 個（本層不改 MB）**

1. **重複 RG 1 對**：d6e44a8b 與 cbd38639 是同一張 BST 84352（第 630 條退表 #3）——**簡報第二節坑 1「漏折的重複 RG」在本線的第一個實例**，`chk-prop` 的 rgMbid 掃描抓不到（兩個 id 不同）、掛名＋盤名鍵也抓不到（盤名不同）。**只有人工比對轄下 release 的 catno＋軌數＋曲名才看得出來。**
2. **frd＝錄音年**：Poly-Currents（1969，實為 1970）、Multidirection（1969，實為 1970）——**原盤 release 的 date 也一起錯**。
3. **frd 早一整年**：Wayfaring Stranger（1970，實為 1971），原盤 release 同錯。
4. **RG 轄下只有 1 筆、連一張 CD 都沒建 6 張**：Now Hear This、Multidirection、To Seek a New Home、That Healin' Feelin'、Wayfaring Stranger、Worth Waiting For...、Something To Listen To（**七張**，研究層一律以 Discogs master 補）；另 Bantu Village／Another Story 各 2 筆、1970–2010 之間空白。
5. **載體登錯**：Poly-Currents 1988 年那筆 6e92748a 登成 **CD-R**（應為 CD）——第 567 條「載體與年份／實體不相容」的同族。
6. **catno 掉字元／無前綴**：Another Story 的 2014 日本 CD da0b789d 登成 **BST-4336**（少一個 3）；Merry Ole Soul 的 2021 黑膠 aee14a30 同時登「84323」與「BST 84323」且**無國別**。
7. **同 barcode 重複建檔**：Electric Byrd 的 195aea85（US）與 748681df（XE）共用 724383619528。
   另：**status 空／無日期**——How Insensitive 的 a08f0d12（2004，無國別）、Asphalt Canyon Suite 的 b20ea2bb 與 57ccb66f（退件）、Lift Every Voice 的 6cc9254a（無日期）。
   **19 張原盤 release 沒有一筆填軌長以外的細節，但軌長本批 19 張全有**（與 c-141 b 相反，寫作層可引軌長）。

## 第 639 條（同批）：**時代背景實線（給寫作層）——1969→70 的 Blue Note 換了製作人，也換了廠牌母體**

- **製作人**：**Duke Pearson 7 張**（三張自己的領班盤＋Score／Thousand Finger Man／Another Story／Electric Byrd）、**Francis Wolff 3 張**（Multidirection、Lift Every Voice、That Healin' Feelin'〔與 George Butler 共同〕）、**Alfred Lion 1 張**（Roots & Herbs，**1961 年的錄音**）、**Sonny Lester 2 張**（Wayfaring Stranger、Something To Listen To——Lester 正是 Solid State 的創辦人）、**George Butler 1 張**（Worth Waiting For...）、**Monk Higgins 1 張**（Bantu Village，外製兼編曲兼指揮）、**Kenny Burrell／Johnny Pate**（退件的 Asphalt Canyon Suite）。
  ⚠ **不明 4 張**（Black Rhythm Happening、Merry Ole Soul、Charisma、Poly-Currents 之外的缺項以維基為準）——**維基 producer 欄留空的，正文不得指名監製**（c-141 第 595 條同型）。
  ⚠ **George Butler 的出現是分水嶺**：Francis Wolff 1971-03 過世前，Butler 已經以共同製作人身分進來（That Healin' Feelin'，1970-04／06）並獨立製作了 Worth Waiting For...（1970）——**這是 Blue Note 交棒的實線，有名有姓、有日期。**
- **廠牌母體**：本批所有原壓的盤標都印 **Liberty/UA, Inc.**（部分印 Transamerica Corporation 或 United Artists Records, Inc.），到 1971 年的再壓就變成 **United Artists Records, Inc.**——**1970 年是 Liberty 這個名字在 Blue Note 盤標上的最後一年。**
- **封套美術**：**Ron Wolin** 2 張（Worth Waiting For...、Something To Listen To）、**Frank Gauna** 1 張（Thousand Finger Man，**正是 c-141 第 595 條點名的《Common Touch》美術指導**）、Chuck Stewart 攝影 1 張、Herb Kravitz 攝影 1 張、John Uomoto 霓虹字設計 1 張。**Reid Miles 在本批 0 張**（c-141 b 時還剩兩張，都是 Lion 時代的庫存錄音）。
- **Cash Box 1971-02-13** 的 Blue Note 二月檔期報導列出當時主打的五張（Elvin Jones《Coalition》、Ornette Coleman《Love Call》、**Jeremy Steig《Wayfaring Stranger》**、Candido《Beautiful》、Chick Corea《The Song Of Singing》），
  並回顧「artists who have dominated the jazz polls for many years」的名單（Ornette Coleman、Jack Wilson、Horace Silver、Freddie Hubbard、Don Cherry、Wayne Henderson、Jackie McLean、Wayne Shorter、Herbie Hancock、McCoy Tyner、John Patton、Bobby Hutcherson、Art Blakey、J.J. Johnson、Kenny Burrell、Donald Byrd）——**這份名單本身就是 1971 年初 Blue Note 的自我定位。**
- **Billboard 1970-08-15** 的 Liberty/UA「FAST TURNOVER!」整版廣告把《To Seek a New Home》與《Electric Funk》連同 **8 軌卡匣（9078／9080）與卡帶（C-1078／C1080）編號**一起列出——**1970 年 Blue Note 已經三種載體同步發行**。
- **Billboard 1970-04-25**：SCLC 與 Kim Weston 正在全美推廣〈Lift Every Voice and Sing〉作為「black national anthem」——**Andrew Hill 同年那張《Lift Every Voice》的標題就落在這個語境裡**（Hill 沒有錄那首歌，寫作層不得寫成翻唱）。
- **Grammy**：退件的《Consummation》（池中 seed）**1971 年拿下 Best Jazz Performance – Large Group**（Billboard 1971-02-06 入圍名單、1971-03-13 得獎名單）——池中那張卡的簡介可以用。

## 第 640 條（同批）：**交件數字、實掃順帶、中間檔、給後批**

- **交件 19 張、17 位；退 3**（第 630 條：第 313 條他廠 1＝Verve；撞池 1；重複 RG 1）；
  **年份改判 4**（Poly-Currents 1969→1970、Multidirection 1969→1970、Wayfaring Stranger 1970→1971、How Insensitive 1969→1970）；
  `label` 改他廠 2（Solid State，第 633 條）；掛名群組收攏 2、既有分裂取多數 1、印刷體標點摺 ASCII 1、往群組收攏 1、**新掛名 3**、第 307 條預警 2（第 634 條）；
  現場 0、vault 1（九年，第 635 條）；Apple 命中 15/19、**掛零 4**；CAA 15/19、**404 4**（第 637 條）。
- `chk-prop b`：**標記 0**（19 張 17 位）；`chk-prop a b`：**標記 0**（39 張 29 位）；與 c-135～c-141 各批 prop **1,750 張**的 rgMbid 交叉 **0**、與同批 a 組 slice 交叉 **0**。
- 掛名層實掃（**皆英文字串，無漢字／羅馬字變體；括號內為 seed／未上傳批次**）：Duke Pearson 1／6・Lee Morgan 12／9・Eddie Gale 0／1・Blue Mitchell 4／3・Elvin Jones 2（＋聯名 1）／0・The Contemporary Jazz Quintet 1／1、Kenny Cox **0／0**・Kenny Burrell 3（＋聯名 2）／5・Randy Brecker **0／0**・Art Blakey 系 12／16・Candido **0／0**・Thad Jones & Mel Lewis 2／0、Thad Jones 1／2・Andrew Hill 9（＋Trio 1）／2・Donald Byrd 14／10・Stanley Turrentine 5／10・Brother Jack McDuff 5／0・Horace Silver 8／10（＋王牌 1）・Jeremy Steig **0／0**・Joe Williams 1／0（＋Big Joe Williams 1，**不同人**）・Jimmy McGriff 3／0。
- 中間檔 `scratchpad/c142b/`：`c142b-mbfetch.mjs`＋`mb/`（22 個 RG 的 rg／rel／caa 回傳 ＋ 8 個 MB artist 搜尋 ＋ 5 筆 CAA 重抓）、`c142b-mbsum.mjs`／`.txt`（逐張摘要）、`c142b-tracks.mjs`＋`tracks/`（20 張 release 的原 LP 軌序）、`c142b-poolscan.mjs`／`.txt`（實掃全文，19,064 列）、`c142b-wiki.mjs`／`c142b-wiki2.mjs`＋`wiki/`（30 個維基條目）、`c142b-discogs.mjs`／`c142b-dg2.mjs`＋`discogs/`（18 個 catno 反查＋9 個 master＋4 個 release）、`c142b-apple.mjs`／`.json`＋`c142b-apple2.mjs`／`.json`（店面 19＋10 次查詢）、`harvest.py`＋`cbtext/`／`bbtext/`（200 期紙本）、`ctx.py`／`ctx2.py`＋`ctx-*.txt`（紙本上下文；**`ctx2.py` 是摺換行後的版本，第 636 條**）、`jd-4300.txt`、`build1–4.py`（卡單產生）。
- **給後批（1971–84 段）**：
  1. **本批收掉的 19 個 rgMbid 見 `prop-b.json`**；1971 段的 slice 若再排到《Wayfaring Stranger》（32441658）一律退——**它的 MB frd 是 1970，很可能被 enum 分進 1970 段**。
  2. **Candido《Beautiful》BST 84357（1971）**、**Elvin Jones《Coalition》BST 84361（1971）**、**Ornette Coleman《Love Call》BST 84356（1971）**、**Chick Corea《The Song of Singing》BST 84353（1971）**——Cash Box 1971-02-13 同一則報導列出的五張，本批收了其中一張，**其餘四張池中狀態未掃，後批要查**。
  3. **jazzdisco 4300 頁記為 `not released` 的四個號**：84314（Booker Ervin，c-141 b 第 589 條第 3 點已記）、84316（Frank Foster）、84366（John Patton《Memphis To New York Spirit》）、84367（Hank Mobley《Thinking Of Home》）——**84366／84367 後來都在 1970 年代末以 LT 系列出土，屬 vault 盤，後批看到 `year` 取首次商業發行年。**
  4. **1971 年起 MB 的 `first-release-date` 可信度下降、jazzdisco 4300 頁反而變準**（第 631 條方法論 2）。
  5. **Thad Jones/Mel Lewis 的 Solid State 目錄**：c-141 b 第 589 條第 4 點說「BST 84346《Consummation》照收」——**已在池中，不要再收**（第 630 條退表 #2）。

## 第 641 條（主線 2026-09-16，研究層 a 組交件後）：**策展層改判的 12 張全部成立；本層再往上補到「榜位」層級**

a 組 20 筆全 `full`、QA 清、**年份 0 張有疑議**（策展層改判的 12 張逐條覆核全部成立，未改判的 8 張也覆核成立）。
**新找到三條比第 612 條的檔期廣告更硬的證據**（第 58x 條「榜位最硬」的正面案例）：
- **《Soul Symphony》**：Billboard 爵士榜 **1970-10-31 第 15 名新進、11-07 第 2 週**——**1969 徹底排除**。
- **《Fancy Free》**：爵士榜 13 週（峰值第 7）＋ **Best Selling Soul LP's 兩週**（1970-02-14 新進）。
- **《Say It Loud!》**：爵士榜 21 週、峰值第 4；Soul LP's 峰值約 27；Top LP's 第 184。
  另 **Billboard 1969-04-05 p74 廠牌報導**：總經理 Mel Fuhrman 點名它與《Always Something There》是那一季四張主力之一（正文素材）。
另《Accent on the Blues》的評論週往前推到 **BB 1970-06-20 四星評論欄**；
《The Ultimate》補到 **BB 1969-09-20 倫敦 Ronnie Scott 檔期報導**（廠牌把發片綁上檔期，並自稱三重奏第二張）。

**《Song for My Daughter》的 catno 確認**：Discogs `catno:"BST 84328"` 反查四筆全是本張、沒有一筆是《Mustang!》，
**Billboard 1970-02-14 四星欄也完整印出 BST 84328**——**MB 那個 84238 確為登錄錯誤**，正文一律用真號。

## 第 642 條（同日）：**研究層訂正策展層與 SOURCES 表各一處**

1. **第 607 條第 1 點不成立**：被列為「有軌數無軌序」的 5 張（On Broadway／The Ultimate／Collision in Black／
   The Sixth Sense／Always Something There），改用
   **`release?release-group=<rg>&fmt=json&inc=media+labels+recordings+artist-credits` 瀏覽端點全部取得到完整軌序與軌長**
   ——策展層是先 browse 再對單一 release 打 `?inc=recordings`，**那條路徑會漏**。
   **寫作層可以引軌序與軌長，不必只靠 jazzdisco。**
   **通則：MB 取不到某個欄位時，先換一種端點組合再說「MB 沒有」。**
2. **第 614 條「1970 年 Billboard 全部是 `Billboard%20YYYY-MM-DD.pdf`」不完全對**：
   **`1970-01-31`／`1970-03-21`／`1970-04-11` 三期只有 `BB-YYYY-MM-DD.pdf` 可用**，`Billboard%20` 回 404。
   **1970 年兩種形狀都要試。** SOURCES 表已補這句。

## 第 643 條（同日）：**c-142 a 試聽補 4 張；《Collision in Black》確定無串流版**

**串流採信 19/20**：Turning Point `716428281`、You Gotta Take a Little Love `715924725`、
The Sixth Sense `724852908`（9 軌 RVG 形，**前 6 軌逐軌對應原盤**）、King Kong `724662852`，主線已補進 `previews.json`。
**《Collision in Black》跑完三種查法仍全落空**——Blue Mitchell artistId 3007072 的整份 31 張目錄裡沒有它，
兩個同名實體也沒有，**確定無串流版，走固定無來源狀態；寫作層不得寫成有固定試聽來源。**

**缺封面 3 張的替代圖來源**（本機上傳時用，CAA 在 RG 與 release 兩層都重驗過確為 404）：
- Collision in Black → Discogs master 332288／r1640346／r15626152／r35843143（**沒有日本再發盤**）
- Soul Symphony → Discogs master 177750／r4434135／r10100377，或 **Apple `716184995` 的 artwork**（2008 US CD 版式）
- Song for My Daughter → Discogs master 1041075／r3378314／r28891183，或 **Apple `1768828974` 的 artwork**（2024 數位再發版式）

## 第 644 條（同日，給寫作層）：**這一段的製作人與封套美術，有名有姓**

**製作人四種**：Francis Wolff 7 張、Duke Pearson 4 張（The Ultimate／Fancy Free／The Prisoner／Always Something There）、
Alfred Lion 2 張（皆舊錄音）、**Jack Tracy 1 張**（Coldwater Flat，Liberty 那邊的 A&R）、
**Monk Higgins＋Dee Ervin 外製 1 張**（Collision in Black，掛 For Wally Roker & Associates）、
**Billy Byers 1 張**（Song for My Daughter，**維基 producer 欄是空的，Discogs 是唯一來源**）、Richard Bock 1 張（King Kong）。

**封套美術（Reid Miles 全組 0 張）**：Forlenza Venosa Associates（On Broadway）、
**Bob Venosa／Havona 三張**（The Flip、The Sixth Sense、Accent on the Blues）、**Frank Gauna 美術指導 4 張**、
Ron Wolin（King Kong，與 b 組兩張同一人）、Tony De Stefano（The Ultimate）、
Woody Woodward／Gabor Halmos／Ken Kim（Coldwater Flat）、
**Moki Cherry 的封面畫＋Ornette Coleman 的封底文字**（Where Is Brooklyn?）、**Louis Delsarte 的封面畫**（Fancy Free）。

**第 307 條預警覆核**：`Jack Wilson` MB 同字串實測 **17 個實體**，本人是
`219c17de-f8fc-4369-bb79-4ad124910b16`（US，1936-08-03–2007-10-05，jazz pianist）；
**英文維基的「Jack Wilson (pianist)」講的是 1907–2006 的英國樂團領班、不是本人，本人沒有英文維基個人條目**
（與 c-141 第 591 條同一個坑，**這次是實測 17 個實體確認的**）。
`Larry Young` 實測 5 個實體，本人是 `81971abd-8a02-4d66-a499-8487ba7f20d8`（1940-10-07–1978-03-30）。
