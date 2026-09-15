# c-140 裁定（a 組 550 起、b 組 560 起，append）


## 第 550 條（2026-09-15，c-140 a 組）：**23 筆覆核結果——實收 18、退 5；rgMbid 全部照 enum 檔，無一釘錯；年份改判 3（＋1 兩說）；CAA 18/18**

`slice.json` 的 `g: "a"` 23 筆（1963–1966，BLP 4144–4228 ＋ Capitol／Pacific Jazz／Roulette／Columbia 原盤 5 張）逐筆回問 MB `release-group`（inc=artist-credits+releases）
與 `release?release-group=…&inc=media+labels+artist-credits`，再對 18 張收件的原盤 release 打 `release/<id>?inc=recordings` 取原 LP 軌序；CAA 打 RG 端點；
年份另核 jazzdisco 4100／4200 系列目錄頁（`scratchpad/c139a/web/jd-4100.html`、`scratchpad/c140a/web/jd-4200.html`）、維基 infobox（引 Billboard 期刊頁）、Discogs `database/search`（catno／master 反查，不帶 token 每 3 秒一次）。
**enum 的 rgMbid 沒有一筆釘錯。**
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`（合計 18,764 列），掛名 24 個關鍵字子字串雙向（含 Tony Williams／Big John Patton 這種 MB credit 與池中字串不同的）、盤名 36 個關鍵字（卷號統一、撇號摺 ASCII）。
a 組 23 個 rgMbid 與 c-139 slice 45 個、本批 b 組 13 個交叉：**重疊 0**（程式比對）；盤名＋掛名鍵亦零重疊。
`node batch-progress/c140/chk-prop.mjs a`：18 張、16 位，欄位 0、線上池撞卡 0、跨組 0、跨批 0（三筆舊帳是 c49b／cseab 的）、同 rgMbid 不同掛名 0——**標記 0**。

**退掉 5 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Anthony Williams《Life Time》1964 | 5e97f8f0-a60a-32ca-b8d8-3e76cbaedc03 | **撞池（enum 假陰性）** | 池中 `Tony Williams — Life Time` 已有（seed）。MB RG credit 用盤面的「Anthony Williams」、artist 實體主名是 Tony Williams（b6a30b58），enum 拿 credit 字串比對池中「Tony Williams」比不到——與第 460 條 Jay Jay／J.J. Johnson 同形。 |
| 2 | Anthony Williams《Spring》1965 | 4cb87f2f-96f2-32cb-bace-455db195f71d | **撞池（enum 假陰性）** | 同上，池中 `Tony Williams — Spring` 已有（seed）。順帶：jazzdisco BLP 4216＝1966、維基 1966，池中卡若記 1965 是 MB 錄音年形，留本機。 |
| 3 | Nancy Wilson《Yesterday's Love Songs / Today's Blues》1963 | a935e4e2-5683-37c5-9c4d-daf42bbc518f | **第 313 條：Capitol 自家藝人，Blue Note 只在 1985 後再發掛名** | 原盤 Capitol ST 2012（1963-12，Gerald Wilson 編曲，Billboard 200 第 4 名）；RG 轄下只有兩筆 release，掛 Blue Note 的是 1991-05-21 CD（bc 077779626526，17 軌）。Blue Note 的關聯始於 1991。與 c-137／c-138 的 Shearing／Christy／Sinatra／Peggy Lee 同形。 |
| 4 | Sarah Vaughan《Sarah Sings Soulfully》1965 | 3aedfdf1-3126-3209-aa0e-831695c1ee1e | **第 313 條：Roulette 原盤，Blue Note 只在 1992 CD 掛名** | 原盤 Roulette SR 52116（1965，Teddy Reig 製作，錄音 1963-06）；Blue Note 只有 1992 US CD CDP 0777 7 98445 2 4（Roulette Jazz 系列並列掛名）。EMI 1989 年買下 Roulette 後的 1990 年代 CD 化，不是 1960–80 年代以 BN 目錄號再發的那種——依第 313 條「關聯始於哪一年」退。**⚠ 記給 Roulette／Vaughan 線**：池中 `Sarah Vaughan` 7 張全是 1950 年代 EmArcy／Mercury（Mister Kelly's 1957 最晚），1960–64 年 Roulette 時期零張，這張與《After Hours》《The Explosive Side》《Sassy Swings the Tivoli》是 §1 候選。 |
| 5 | The Stan Tracey Quartet《Jazz Suite (Inspired by Dylan Thomas's "Under Milk Wood")》1965 | 88298c6c-5925-334e-9cd4-0c3cca5cc5ac | **第 313 條：EMI Columbia（UK）原盤，Blue Note International 只在 1993 CD 掛名** | 原盤 Columbia 33SX 1774（GB 1965-03-04，Lansdowne Series；Discogs master 97723）；1976 Steam SJ 101 再發、1993 GB CD 掛 Blue Note International 7 89449 2、2004 起 Trio／Resteamed。Blue Note 的關聯始於 1993，是 EMI 集團內的品牌調度（與 Capitol 人聲盤同一形狀，只是這張是爵士）。**⚠ 記給英國爵士線**：這是英國現代爵士最常被點名的正典盤，池中 `Stan Tracey Quartet`（Captain Adventure 1975）、`Mike Osborne / Stan Tracey`、`Stan Tracey & Keith Tippett` 三個字串都有，**1960 年代零張**；若另開英國線收它，掛名照池中 `Stan Tracey Quartet`（無 The，MB 群組實體 0e0437ac 主名帶 The），盤名內的 U+2019／U+201C 引號要摺 ASCII，rgMbid 已釘。 |

⚠ 派工信提的《Meet You at the Jazz Corner of the World, Volume 2》（BLP 4055，RG 76752ee1）**不在本批 slice、在 c-139 a 組**——c-139 a 的 prop-a.json 已收並標 1962，本組不重複。

## 第 551 條（同批）：**年份改判 3 張——兩張是「Lion 期錄音、Liberty 期出版」、一張是 vault 盤被 bare release 拉回錄音年；另一張兩說照 MB**

| 盤 | catno | 錄音 | MB frd | enum | 改 | 依據 |
|---|---|---|---|---|---|---|
| Joe Pass《Joy Spring》 | Blue Note LT-1103 | 1964-02-06（現場） | 1964 | 1964 | **1981** | MB 的 1964 出自 6c7debbf——無廠牌、無 catno 的 bare release，1964 年沒有實體發行；Pacific Jazz 錄了沒出，1981 年 Liberty 期 LT 庫存系列世界首發（維基「not released until 1981」；Discogs master 649041 唯一原盤 LT-1103 1981）。第 262／364 條 vault 形。**enum note「原盤 1964 可能他廠」是假警報**，`label` Blue Note LT-1103。 |
| George Braith《Extension》 | BLP 4171 | 1964-03-27 | 1964（原盤 release 填錄音年） | 1964 | **1967** | jazzdisco 4100 目錄頁 BLP 4171＝1967；維基 infobox 1967（引 jazzdisco）；Discogs master 461765 與 mono 原壓 1967。 |
| Blue Mitchell《Bring It Home to Me》 | BLP 4228 | 1966-01-06 | 1966（mono／stereo 兩筆原盤都填錄音年） | 1966 | **1967** | 維基引 Billboard 1967-03-04；Discogs master 296135／mono 原壓 2081171 皆 1967（盤標已是 Liberty 期）；jazzdisco 4200 目錄頁 BLP 4228＝1967。 |

**兩說照 MB 一張**：Duke Pearson《Wahoo!》BLP 4191——MB 1965、Discogs master 與 mono 原壓 1965、維基 infobox 1965；但 **jazzdisco BLP 4191 標「1966+」**、維基正文寫 1964（infobox 與正文互相矛盾，第 264 條形）。依第 364 條第三型照 MB 取 1965，risk 寫明，研究層以 Billboard 覆核。
**其餘 14 張 MB＝Discogs 原壓＝jazzdisco（＝Billboard，有的話）**：Little Johnny C 1964-03（Billboard 03-28）、Way I Feel 1964、Freedom Rider 1964-02（Cuscuna 內頁）、Chip 1964（⚠ 維基 API 兩次限流未抓到，月份研究層補）、Trompeta 1965-07（Billboard 07-31）、It's Time 1965-06／07（Billboard 07-24）、Softly 1965、Joyride 1965-09／10（Billboard 10-02）、All That's Good 1965-10（Schwann 1975，弱）、Basra 1965-10（Billboard 10-02）、Some Other Stuff 1965-02（Billboard 02-06）、Tryin' 1965-02（Billboard 02-20）、Cookers Vol. 1 1965-11、For Django 1964-10。

**⚠ 這一段的結構性發現**：BLP 4171／4228 是「Lion 期目錄號、Liberty 期（1967）出版」——enum 依 MB frd（＝錄音年）把它們排進 1956–66 段，實際首發年已在 1967–84 段；同 RG 不會再排到，本批收了就算完。**4100–4200 號段 1965 後延後出版的很多（4176、4189、4191、4203、4206、4217、4218……），後批（1967–84 段）看到 BLP 42xx／43xx 的 MB 年份＝錄音年一律先查 jazzdisco。**
Apple 的 releaseDate 本組 18 張裡 13 張是錄音日或 01-01 placeholder（Way I Feel 1964-06-19、It's Time 1964-08-05、Joyride 1965-04-14、Basra 1965-05-19、Softly 1958-01-01、Freedom Rider 1961-01-01、Tryin' 1989-01-01＝CD 年……）——第 484 條再證；帶月日且非錄音日的只有 For Django 1964-10-01、All That's Good 1965-10-10，皆與維基同月、可能同源（第 431 條）。

## 第 552 條（同批）：**「原盤可能他廠」5 張逐張判——Pacific Jazz 1 張成立改 label、LT 庫存 1 張是假警報、Capitol／Roulette／Columbia 3 張依第 313 條退**

| 盤 | enum note | 判 | 處置 |
|---|---|---|---|
| Joe Pass《For Django》 | BN 首發 2022 | 成立：Pacific Jazz PJ-85／ST-85（1964-10） | 收，`label` Pacific Jazz、`year` 1964；Blue Note 只有 2022 Tone Poet、2024 JP UHQCD、無日期 FR BNP 25 100（第 472／512 條 Pacific Jazz 形） |
| Joe Pass《Joy Spring》 | BN 首發 1981 | **不成立**：沒有他廠原盤，1981 LT-1103 就是世界首發 | 收，`label` Blue Note LT-1103、`year` 1981（第 551 條）；Blue Note 關聯始於 1981，第 313 條照收 |
| Nancy Wilson | BN 首發 1991 | 成立：Capitol ST 2012（1963） | **退**（第 313 條，第 550 條退表 #3） |
| Sarah Vaughan | BN 首發 1992 | 成立：Roulette SR 52116（1965） | **退**（第 313 條，#4） |
| Stan Tracey Quartet | BN 首發 1993 | 成立：Columbia 33SX 1774（GB 1965） | **退**（第 313 條，#5） |

**第 313 條在本組的判法**：「Blue Note 的關聯始於哪一年」——Pacific Jazz（Tone Poet 再發）與 LT 系列（1981 目錄號）過關；1991／1992／1993 才掛名的三張全退，**不論原盤是人聲（Wilson、Vaughan）還是爵士正典（Tracey）**。
enum 的「Roulette 轉來的」那一類在這裡第一次出現：EMI 1989 年買 Roulette 後的 CD 化與 Capitol 人聲盤是同一形狀，往後 1985 後段的 Roulette 盤（Basie、Vaughan、Maynard Ferguson）照這條退。

## 第 553 條（同批）：**掛名裁定——池中既有分裂取多數 2 張、群組實體收攏 1 張、新掛名 3 個過第 307 條**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `John Patton`（RG）／`'Big' John Patton`（1964 原盤 release）《The Way I Feel》 | **`Big John Patton`** | 池中既有分裂 `Big John Patton` 3（Let 'em Roll／Oh Baby!／Got a Good Thing Goin'）vs `John Patton` 1（Along Came John）——第 307／363 條取多數。**⚠ c-139 b 組《Blue John》slice 掛「John Patton」，主線收件時要對齊成 `Big John Patton`**，否則分裂再加一張；池中那張 `John Patton` 留本機統一。 |
| `Art Blakey & The Jazz Messengers`（群組 209ddf15）《The Freedom Rider》 | **`Art Blakey and the Jazz Messengers`** | 第 470／525 條；池中 `and the` 6 seed＋各批 9 ＞ `& The` 5 |
| `Joe Pass`（RG）／「Joe Pass Quartet」（LT-1103 盤面）《Joy Spring》 | **`Joe Pass`** | 第 462 條編制收攏到本人；池中 `Joe Pass` 2 張；MB 群組 ba2cbad3「Joe Pass Quartet」無 area 無年份，刻意不用 |
| `Freddie Roach`（RG）／「Frederick Roach」（盤面、Discogs、2014 JP CD、Apple）《All That's Good》 | **`Freddie Roach`** | 池中 1 張＋c-139 a／b 三張同字串；Frederick 進 queryAlias，店面比對要用 Frederick 搜 |
| `Jimmy Smith`（RG）／「The Incredible Jimmy Smith」（盤面、1998 CD）《Softly…》 | **`Jimmy Smith`** | 池中 32 張 |
| `Grachan Moncur III`（RG）／「Grachan Moncur」（Apple） | **`Grachan Moncur III`** | 池中 3 張 |
| `Joe Pass`／`Stanley Turrentine`／`Kenny Dorham`／`Jackie McLean`／`Donald Byrd`／`Duke Pearson`／`Freddie Hubbard`／`Blue Mitchell` | 照 MB＝照池中 | 同字串 |

**新掛名 3 個**（池中零張，第 307 條反查同字串不同人）：`Johnny Coles`（717377ec Person，US，1926–1997，「US jazz trumpeter」；MB 另有群組 Johnny Coles Quartet，不收攏）、`George Braith`（c5afb6db Person，US，1939–；**c-139 b 組兩張同字串，兩批要一致**）、`Pete La Roca`（da386a16 Person，US，1938–2012；後改名 Pete Sims，進 queryAlias）——三個都無同字串撞擊。
退件的 `Tony Williams`／`Anthony Williams` 分裂沒發生（兩張都退了）；但**往後 Williams 的 Blue Note 盤若再出現（如 1967–84 段沒有），MB credit 一律是 Anthony、池中字串是 Tony**，enum 比對會再漏。

## 第 554 條（同批）：**Live 兩張——一張 MB 標了（Cookers），一張 MB 沒標（Joy Spring）；Volume 拆盤跨到 b 組 1 對**

- **《The Night of the Cookers: Live at Club La Marchal, Volume 1》**：MB [Live]、enum `live: true`，Club La Marchal（布魯克林俱樂部，真演出場地），1965-04-09／10。**Vol. 2（BST 84208，RG 782f489e，1966）在本批 b 組**——各算一張、risk 互指、正文不得寫成兩場；兩集曲目不同（Vol. 1 Pensativa／Walkin'，Vol. 2 Jodo／Breaking Point）。MB 1997 ES CD 那筆同時登了兩集的 catno（28882／28883），是雙 CD 套裝被建在 Vol. 1 底下，研究層核。
- **《Joy Spring》**：MB secondary-types 空、enum `live: false`，但維基 infobox type=live、venue Encore Theater, Los Angeles（1964-02-06）——第 397 條「MB 沒標也可能是現場」，卡單當現場盤、mbNote 寫明。
- 其餘 16 張 secondary-types 空、盤面無現場跡象（Van Gelder Studio 14 張、Manhattan Towers 1 張、Pacific Jazz Studios 1 張）。

## 第 555 條（同批）：**同班底拆盤與跨卡互指——本組 6 組，正文不得互抄**

1. Blakey《The Freedom Rider》（1961-02／05 三場）↔ 同編制另兩張 vault 盤《Roots & Herbs》（BST 84303，1970）《Pisces》（JP 1979 首發）——不在本線 1956–66 段，屬 1967–84 段；正文不得把三張寫成一場。
2. Pass《For Django》（1964-10，Pisano／Hughart／Bailey）↔《Joy Spring》（1964-02 現場，Wofford／Hughart／Bailey）——同批兩張、班底半同、相隔八個月。
3. Turrentine《A Chip off the Old Block》（1963-10 五重奏，Blue Mitchell 側人）↔《Joyride》（1965-04 Oliver Nelson 大樂團）↔ Mitchell《Bring It Home to Me》（1966-01）——三張互指，不同場。
4. Pearson《Wahoo!》↔《Little Johnny C》（六軌全 Pearson 作曲）↔ Byrd《I'm Tryin' to Get Home》（Pearson 編曲指揮）——三卡互指。
5. Byrd《I'm Tryin' to Get Home》↔ 池中《A New Perspective》（1964，同 Pearson／Perkinson 合唱團概念）——姊妹盤，正文不得把〈Cristo Redentor〉抄進本張。
6. La Roca 三處：《Basra》領班、《Little Johnny C》第 4–6 軌鼓手、《Cookers》鼓手——不同場。
另 McLean《It's Time!》（1964-08-05）↔ Moncur《Some Other Stuff》（1964-07-06）：Hancock／McBee 同在、相隔一個月，不同場。

## 第 556 條（同批）：**盤名——印刷體撇號換 ASCII 3 張、大小寫照 RG 1 張、驚嘆號照 RG 1 張、長題照 RG 1 張**

| MB RG title | 卡上盤名 | 說明 |
|---|---|---|
| `It’s Time!`（U+2019） | **It's Time!** | 第 473／527 條；轄下 13 筆 release title 本來就是 ASCII |
| `All That’s Good`（U+2019） | **All That's Good** | 同上；原盤 release title ASCII |
| `I’m Tryin’ to Get Home`（U+2019 ×2） | **I'm Tryin' to Get Home** | 同上；盤面副題「Brass With Voices」進 queryAlias |
| `A Chip off the Old Block`（off 小寫） | 照 RG | Discogs／Apple／2014 JP 寫「Off」，進 queryAlias |
| `Wahoo!` | 照 RG | 原盤 release 與 Music Matters 登「Wahoo」無驚嘆號 |
| `The Night of the Cookers: Live at Club La Marchal, Volume 1` | 照 RG 長題 | Discogs「- Live At…, Volume 1」、Apple「…, Vol. 1 (Live)」進 queryAlias；卷號統一後與 b 組 Vol. 2 不撞 |
| `The Way I Feel` | 照 RG | 原盤與 Discogs 帶單引號「'The Way I Feel'」；池中 Irma Thomas／Honeytree 同名不同掛名 |
其餘 11 張照 MB RG title 逐字。**同名撞擊提醒**：《It's Time!》↔ 池中 Michael Bublé《It's Time》、《Joyride》↔ Roxette、《Extension》↔ McCoy Tyner／Dave Holland《Extensions》——chk-prop 鍵含掛名不亮燈，店面用盤名搜要連掛名。

## 第 557 條（同批）：**MB 資料層面的坑 7 個（本層不改 MB）**

1. **《Joy Spring》bare release 6c7debbf**：「1964 US 12" Vinyl」無廠牌無 catno——把 1981 年的 vault 盤拉回 1964，enum 分段與 note 都被它帶偏（第 551 條）。
2. **frd＝錄音年的原盤 release**：《Extension》74e67470（1964）、《Bring It Home to Me》cefc43b2／76fb7e68（1966）——第 518 條的延續，4100–4200 段後半也一樣。
3. **《The Way I Feel》21e3cdbc 的 catno「BST 4174」**（立體聲應為 BST 84174）。
4. **只建 stereo 原盤、mono 沒建**：Little Johnny C（BST 84144）、Joyride（84201）、Some Other Stuff（BST 84177）、Cookers Vol. 1（BST 84207）、Wahoo!（BST 84191）、Tryin'（84188）——enum catno 欄因此缺 BLP 號；卡上兩號並列、mono 出自 Discogs。
5. **《Some Other Stuff》原盤 release 軌長全空**（MB 沒填）——寫作層不得引軌長。
6. **《Cookers Vol. 1》1997 ES CD 024e3e00 同時登兩集 catno**（28882／28883）——雙 CD 套裝建在 Vol. 1 下。
7. **《Trompeta Toccata》27fd0be5「1991 US」無廠牌無載體**；《Extension》《The Way I Feel》《All That's Good》RG 各只建 2 筆 release（CD 化史缺），研究層以 Discogs 補。
另：MB `Anthony Williams` credit 掛在 `Tony Williams` 實體下——資料沒錯，是 enum 的比對鍵用了 credit 而非實體主名（第 550 條退表 #1／#2）。

## 第 558 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 一種查法 16/18 命中；CAA 18/18，但 7 張的圖來源是再發不是原盤**

- **命中且形狀與原盤一致**：For Django（1506289575，10 軌）、Way I Feel（1438179536）、Extension（1438776284）、It's Time（716019786）、Joyride（724501906，8 軌 RVG 形）、All That's Good（1436759146，掛 Frederick Roach）、Basra（724583720）、Some Other Stuff（716361354 RVG，掛 Grachan Moncur 無 III）、Tryin'（1443263963）、Wahoo!（1442880775）、Cookers Vol. 1（1442950621，2 軌）、Bring It Home（1438775326）。
- **命中但只有 RVG／擴充形**：Little Johnny C（724873023 RVG）、Freedom Rider（724548231，8 軌＝1998 CD 形）、Chip（715562180 RVG 7 軌）、Softly（715622482 RVG 10 軌）——「前 N 軌對應原盤」留研究層逐軌比。
- **一種查法未命中 2 張**：《Trompeta Toccata》（Apple 回空——本層兩次都拿到空 body，可能是限流）、《Joy Spring》（只回 90 軌《The Capitol Vaults Jazz Series》716559666，原形 5 軌未命中）——只是觀察，研究層走藝人目錄與 collectionId。
- **店面掛名與本卡不同**：Frederick Roach、Grachan Moncur、Art Blakey & The Jazz Messengers、Big John Patton（與本卡同）——上架比對時要用店面寫法。
- **CAA：18/18 有 front**；**來源不是原盤圖的 7 張**：For Django（1964 JP Victor 盤）、Joy Spring（1995 CD）、Chip（2009 RVG CD）、Trompeta（1995 JP CD）、Softly（2006 DE CD）、Joyride（1995 CD）、All That's Good（2014 JP CD）、Some Other Stuff（2009 數位）——研究層看版式，各卡 risk 已列 Discogs 原盤條目。
- 維基 API 在本組後段被限流（`You are making too many requests`）——三個 Blue Note 策展層同時在跑，**後批的維基抓取間隔要拉到 3 秒以上**；《A Chip off the Old Block (album)》因此沒抓到 infobox。

## 第 559 條（同批）：**交件數字與中間檔**

- 交件 18 張、16 位；退 5（第 550 條：撞池 2、第 313 條 3）；年份改判 3＋兩說 1（第 551 條）；`label` 改他廠 1（For Django，第 552 條）；掛名取多數 2、群組收攏 1、新掛名 3（第 553 條）；現場 2（第 554 條）；CAA 18/18（第 558 條）。
- `chk-prop a` 標記 0；與 c-139 slice、本批 b 組 slice rgMbid 交叉 0。
- **1939–66 段收尾**：本批 a 組是 Lion 期六批（c-135～c-140）的倒數第二組；c-140 b 組（1966，13 張）之後這一段結束，接 1967–84 段。本組兩張 1967 首發的（Extension、Bring It Home to Me）已含在此，1967–84 段不會再排到。
- 中間檔 `scratchpad/c140a/`：c140a-mbfetch.mjs／mb/（23 個 RG 的 release-group＋release＋CAA 回傳）、c140a-mbsum.txt（逐張摘要）、c140a-tracks.json（18 張原盤軌序）、c140a-poolscan.txt（實掃全文）、c140a-wiki/（23 個維基 infobox）、c140a-discogs/（28 個 catno／master 反查）、web/jd-4200.html（jazzdisco 4200 目錄頁）、c140a-apple.json（店面 search）、c140a-artists.json（9 個掛名的 MB 實體查詢）、c140a-build1／2.mjs（卡單產生）。

## 第 560 條（2026-09-15，c-140 b 組）：**13 筆覆核結果——實收 12、退 1；rgMbid 全部照 enum 檔，無一釘錯；年份改判 7（＋1 兩說）；CAA 12/12；1939–66 段收尾**

`slice.json` 的 `g: "b"` 13 筆（1966，BLP 4208／4225／4235／4238／4240／4242／4243／4245／4246／4248／4256 ＋ BST 84426 庫存號 ＋ Capitol 原盤 1 張）逐筆回問 MB `release-group`（inc=artist-credits+releases）
與 `release?release-group=…&inc=media+labels+artist-credits`，再對 12 張收件的原盤 release 打 `release/<id>?inc=recordings` 取原 LP 軌序（另打 Capitol 1966 盤、BN 2006 CD、Rajah 1984 US／FR 三筆對照）；CAA 打 RG 端點；
年份另核 jazzdisco 4200 目錄頁（沿用 `scratchpad/c140a/web/jd-4200.html`）＋ **4200 系列 session 頁**（`scratchpad/c140b/web/jd-4200-disco.html`，逐張取班底與錄音日）＋ **4400 目錄頁與 session 頁**（`jd-4400.html`／`jd-4400-disco.html`，為 BST 84426）、維基 infobox（引 Billboard 期刊頁，抓取間隔 3.3 秒，**未再被限流**）、Discogs `database/search`（catno／master 反查 22 筆，3.3 秒一次）＋ **9 筆 `releases/<id>` 詳情**（取 notes 的 ℗ 年與盤標）。
**enum 的 rgMbid 沒有一筆釘錯。**
實掃卡池：`seed_cards.json` 16,450 列 ＋ `desc-tools/batches/cards/c1*.json` ＋ `batch-progress/c12x–c14x/prop-*.json`（含同批 `prop-a.json`；合計 18,869 列），掛名 14 個關鍵字子字串雙向（含 `coleman trio`／`cannonball`／`adderley`／`gene harris` 這種變體）、盤名 14 個關鍵字（卷號統一、撇號與印刷體引號摺 ASCII）、rgMbid 直比 c1xx 卡單與各批 mbNote。
**13 筆撞池 0**；盤名層命中全是他人假陽性（Ella Fitzgerald《Like Someone in Love》、Roy Ayers Ubiquity《Vibrations》、Threadgill／Alice Donut 的 Bucket 子字串），掛名層命中都是同人不同碟（見第 569 條）。**第 55x 條的 inPool 假陰性形本組沒有**：Golden Circle Vol. One 在池中是王牌、掛 `Ornette Coleman`（不是 MB 的 `The Ornette Coleman Trio`），enum 把 Vol. Two 標 inPool=false 是對的（Vol. Two 確實不在池）。
b 組 12 個 rgMbid 與同批 a 組 18 個程式交叉：**重疊 0**；折疊鍵交叉 0（Cookers Vol. 1／Vol. 2 卷號不同）。
`node batch-progress/c140/chk-prop.mjs a b`：a 18 張 16 位、b 12 張 9 位，欄位 0、線上池撞卡 0、跨組 0、跨批 0／104 批 4,282 張（三筆舊帳是 c49b／cseab 的）、同 rgMbid 不同掛名 0——**標記 0**。

**退掉 1 張（逐筆）**：

| # | slice | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | The Cannonball Adderley Quintet《Why Am I Treated So Bad!》1966 | 5782ce84-fae9-3288-82aa-9266c0de6d6f | **第 313 條：Capitol 自家藝人的原盤，Blue Note 只在 2006 CD 再發掛名** | 原盤 Capitol ST-2617（Discogs master 283693；錄音 1967-03-06／23 Capitol Studios Hollywood，David Axelrod 製作，Billboard 1967-05-20 新片欄，Top LPs 第 154 名）。RG 轄下三筆：06472b37「1966 US 12" Vinyl」**無廠牌**（Discogs 標 1966 但錄音是 1967-03，年份也錯）、0185a656 2006 Capitol Jazz 數位、2458ee29 **2006-05-16 US CD Blue Note 529912**（10 軌，加口白與兩軌）。Blue Note 的關聯始於 2006。enum note「BN 首發 2006，原盤 1966 可能他廠」成立。與 c-137／c-138 Shearing／Christy／Sinatra／Peggy Lee、c-140 a Nancy Wilson 完全同形，**且這是本線第一張爵士正典盤走第 313 條的 Capitol 例**（a 組 Stan Tracey 是 EMI Columbia）。**⚠ 記給 Cannonball 線**：池中 `Cannonball Adderley` 6＋`Cannonball Adderley Quintet` 2＋`The Cannonball Adderley Quintet` 2（三向分裂，第 543 條已記），Capitol 時期只有《Mercy, Mercy, Mercy!》《Country Preacher》《Accent on Africa》，本張與《74 Miles Away》《In Person》是 §1 候選，rgMbid 已釘、release 端點已回問（`scratchpad/c140b/mb/5782ce84.json`）。 |

沒有撞池退件、沒有判為合輯退件、沒有列舉假陽性（12 張原盤 release 全部 status Official）。

## 第 561 條（同批）：**年份改判 7 張——全是「4200 段 Lion 期錄音、Liberty 期出版」；1 張 vault 盤被 MB 錯登拉回錄音年；1 張兩說照 MB**

| 盤 | catno | 錄音 | MB frd | enum | 改 | 依據 |
|---|---|---|---|---|---|---|
| Lee Morgan《Delightfulee》 | BLP 4243 | 1966-04-08／05-27 | 1966-04-08（＝第一場錄音日） | 1966 | **1967** | jazzdisco 4243＝1967；Discogs mono 4005640／stereo 18887443 皆 1967（Liberty 盤標）；維基 infobox 引 Billboard 1967-11-11 |
| Stanley Turrentine《The Spoiler》 | BLP 4256 | 1966-09-22 | 1966 | 1966 | **1967** | jazzdisco 4256＝1967；Discogs mono 三筆 1967；維基引 Billboard 1967-09-16 |
| Donald Byrd《Mustang!》 | BLP 4238 | 1966-06-24 | 1966 | 1966 | **1967** | jazzdisco 4238＝1967；維基 infobox「October 1967」引 Billboard 1967-11-04；Discogs mono 3091442 標 1966 但 notes 只有錄音日（與 MB 同源，第 541 條第 2 點）、1968 再壓已是 Liberty 標 |
| Art Blakey and the Jazz Messengers《Like Someone in Love》 | BLP 4245 | 1960-08-07／14 | 1966（無來源） | 1966 | **1967** | jazzdisco 4245＝1967；Discogs mono 708733「1967-08」（Liberty 標）；維基引 Billboard 1967-08-19。vault 七年 |
| Larry Young《Of Love and Peace》 | BLP 4242 | 1966-07-28 | 1966-07-28（＝錄音日） | 1966 | **1967** | jazzdisco 4242＝1967；Discogs mono 兩筆 1967；維基引 Billboard 1967-09-16 |
| The Three Sounds《Vibrations》 | BLP 4248 | 1966-10-25 | 1966 | 1966 | **1967** | jazzdisco 4248＝1967；Discogs mono 1705853「1967-01」；維基引 Billboard 1967-01-28 |
| Lee Morgan《The Rajah》 | **BST 84426** | 1966-11-29 | 1966（出自錯登 a5f703fd） | 1966 | **1984** | 84400 號段是 1984–86 Manhattan 時期庫存系列（鄰號 84427 1984、84425／84431 1985），1966 年不存在；jazzdisco 4400 目錄頁 84426＝**1984**；Discogs US 6775046「1984」且 notes 印 ℗© 1984 Manhattan Records；MB 另兩筆 US／FR 都填 1984。**維基 infobox 1985、Discogs FR／JP 1985**（FR notes 同樣印 ℗ 1984）——差一年，研究層以 Billboard 1984-12／1985-01 覆核，改 1985 可逆 |

**兩說照 MB 1 張**：Ornette Coleman《The Empty Foxhole》BLP 4246——MB 1966、Discogs mono 7179038 1966（notes 只有錄音日 1966-09-09）、維基 infobox 1966（無來源，正文卻引 jazzdisco）；**jazzdisco 4246＝1967**，鄰號 4245／4247／4248 全 1967 出版。依第 364 條第三型「相差一年照 MB」取 1966（與 a 組 Wahoo! 同判），risk 寫明，研究層以 Billboard 覆核。
**其餘 4 張 MB＝jazzdisco＝Discogs＝維基**：Rough 'n' Tumble 1966-10（維基）、Golden Circle Vol. Two 1966-04（Discogs 原壓 1966-04；⚠ jazzdisco 把 4224／4225 都記 1965，錄音 1965-12-03／04 年內出版不可能，孤證不採）、Bucket 1966（錄音 1963-02-01，vault 三年）、Cookers Vol. 2 1966。

**⚠ 這一段的結構性發現（第 551 條的延伸）**：**BLP 4238–4256 這一段 11 張裡 6 張 jazzdisco 記 1967、MB 全記 1966**——比 4171／4228 那兩張零星的更密。Liberty 1966 年中收購 Blue Note 後，1966 下半年錄的 4238～4262 幾乎全延到 1967 出版（4239 Let 'Em Roll、4244 Stick-Up!（1968）、4247、4249、4250、4252、4253、4255、4257 jazzdisco 全記 1967）；**enum 依 MB frd 把它們排進 1956–66 段，實際首發年已在 1967–84 段**。1967–84 段第一批看到 BLP 42xx 的 MB 年份＝錄音年時，**先查 jazzdisco 再查 Billboard**，不要照 MB。
Apple 的 releaseDate 本組 12 張裡 8 張是錄音日（Spoiler 09-22、Mustang 06-24、Rough 07-01、Golden Circle 12-04、Bucket 1963-02-01、Like Someone 1960-08-07、Of Love 07-28、Rajah 11-29）、3 張 01-01 placeholder、1 張（Vibrations 1966-05-12）兩者皆非——第 484 條再證。

## 第 562 條（同批）：**「原盤可能他廠」1 張與「庫存號被錯登成 1966」1 張——前者依第 313 條退，後者是 Blue Note 自家 vault 盤照收**

| 盤 | enum note | 判 | 處置 |
|---|---|---|---|
| Cannonball Adderley Quintet《Why Am I Treated So Bad!》 | BN 首發 2006，原盤 1966 可能他廠 | 成立：Capitol ST-2617（1967-05） | **退**（第 313 條，第 560 條退表 #1） |
| Lee Morgan《The Rajah》 | （無——MB 把 BST 84426 填成 1966，enum 沒觸發「晚 3 年」規則） | **enum 漏標**：Blue Note 自家庫存盤，1984 Manhattan 時期世界首發（Cuscuna 1984 翻出，previously unissued） | 收，`label` Blue Note BST 84426、`year` 1984；第 509a 條第 2 點「完整 session 專輯就收」，與 c-139 b《Blue John》（1963 錄、1986 出）同形 |

第 313 條在本組的判法與 a 組一致：Blue Note 關聯始於 1984（Rajah）過關、始於 2006（Cannonball）退。**Capitol 形第一次落在爵士正典盤上**（Cannonball 的 Capitol 五重奏是 1966–69 soul-jazz 的招牌），退的判準仍是「關聯始於哪一年」，不看曲風——與 a 組退 Stan Tracey 一致。

## 第 563 條（同批）：**掛名裁定——群組收攏 1 張、既有分裂取多數 1 張、盤面掛名收攏 2 張；新掛名 0**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `The Ornette Coleman Trio`（群組 5685c693）《Golden Circle Vol. Two》 | **`Ornette Coleman`** | 第 363 條第二型；**池中王牌《Golden Circle Vol. One》已掛 `Ornette Coleman`**（seed apex，1966），池中 `Ornette Coleman` 9 張（含王牌 2）、`coleman trio` 0——Vol. One／Two 必須同字串。群組名進 queryAlias，店面掛 Trio |
| `Art Blakey and the Jazz Messengers`（RG）／`Art Blakey & The Jazz Messengers`（1966 原盤 release）《Like Someone in Love》 | **`Art Blakey and the Jazz Messengers`** | 第 470／525／553 條；池中 `and the` 6 seed＋10 待上架 ＞ `& The` 5 seed |
| `Jimmy Smith`（RG）／「The Incredible Jimmy Smith」（封面、Discogs）《Bucket》 | **`Jimmy Smith`** | 第 553 條同判；池中 11 seed＋15 待上架 |
| `The Three Sounds`（RG）／「The 3 Sounds」（封面、jazzdisco）《Vibrations》 | **`The Three Sounds`** | 池中 1 seed＋11 待上架同字串；「The 3 Sounds」進 queryAlias |
| `Lee Morgan`／`Stanley Turrentine`／`Ornette Coleman`（Person）／`Donald Byrd`／`Larry Young`／`Freddie Hubbard` | 照 MB＝照池中 | 同字串 |

**新掛名 0**——本組 9 位全在池中，第 307 條反查不需要。退件的 `The Cannonball Adderley Quintet` 若日後走 Cannonball 線收，池中三向分裂（第 543 條）要先定。

## 第 564 條（同批）：**Live 兩張（MB 都標了）；Volume 拆盤 2 對，一對跨到 a 組、一對跨到池中王牌**

- **《The Night of the Cookers: Live at Club La Marchal, Volume 2》**：MB [Live]、enum `live: true`，Club La Marchal（布魯克林俱樂部），jazzdisco 記本集兩軌（Jodo、Breaking Point）錄於 **1965-04-09**、Vol. 1（Pensativa、Walkin'）錄於 04-10——**a 組第 554 條寫「兩集出自同兩晚」，本組補上分日**：各集其實各是一晚。Vol. 1 在 a 組（RG 17060412，1965），各算一張、risk 互指、正文不得寫成兩場不同的演出。1997 ES CD 945ce876 一筆登 28882／28884 兩號（a 組第 557 條第 6 點同形）。
- **《At the "Golden Circle" Stockholm, Volume Two》**：MB [Live]、enum `live: true`，Gyllene Cirkeln（演出場所），1965-12-03（Antiques、Morning Song）與 12-04 晚場（The Riddle、Snowflakes and Sunshine）。**Vol. One 是池中王牌**（`Ornette Coleman — At the "Golden Circle" Stockholm, Volume One` 1966）——本張是本線第一次「Volume 拆盤的另一半已是王牌」，掛名與盤名的引號形式都對齊王牌那張（ASCII 雙引號）。
- 其餘 10 張 secondary-types 空、盤面無現場跡象（Van Gelder Studio 10 張），沒有第 397 條「MB 沒標的現場」。

## 第 565 條（同批）：**同班底拆盤與跨卡互指——本組 5 組，正文不得互抄**

1. Turrentine《Rough 'n' Tumble》（1966-07-01）↔《The Spoiler》（1966-09-22）：同 Duke Pearson 編曲，Mitchell／Spaulding／Adams／Tyner／Cranshaw／Roker 六人重疊，前者多 Grant Green、後者多 Julian Priester 與 Joseph Rivera 打擊——兩卡互指、不同場。
2. Morgan《Delightfulee》（1966-04／05，兩場兩編制：Nelson 大樂團 2 軌／Henderson 五重奏 4 軌）↔《The Rajah》（1966-11-29，Mobley／Walton／Chambers／Higgins）↔ Mobley《A Slice of the Top》（1966-03，BLP 4241 未出、1979 首發）與《Straight No Filter》（1966-06，Morgan 側人）——四場全不同，Delightfulee 自己內部兩場也不得寫成一場。
3. Blakey《Like Someone in Love》（1960-08-07／14）↔ 池中《A Night in Tunisia》（同兩場）↔《Roots & Herbs》（1970 vault）——三張出自同一批錄音，本張五軌是 Noise in the Attic／Sleeping Dancer（08-07）＋ Giantis／Johnny's Blue／標題曲（08-14），正文不得把三張寫成一張。
4. Smith《Bucket》（1963-02-01，Quentin Warren 吉他）↔《I'm Movin' On》（1963-01-31，Grant Green 吉他，BLP 4255 1967）↔ 池中《Prayer Meetin'》（1963-02-08，加 Turrentine）——三場三班底。
5. Coleman《The Empty Foxhole》（1966-09，Haden／Denardo）↔《Golden Circle Vol. Two》（1965-12，Izenzon／Moffett）↔ 池中王牌 Vol. One——三重奏班底完全不同，正文不得把 Denardo 寫進斯德哥爾摩。
另 Hubbard《Cookers Vol. 2》↔ 池中《Breaking Point!》（1964 錄音室）：兩曲同名不同版，錄音室班底不得寫進現場。Three Sounds《Vibrations》鼓手是 Kalil Madi，池中 1958–66 十二張全是 Bill Dowdy——正文不得寫 Dowdy。

## 第 566 條（同批）：**盤名——印刷體撇號摺 ASCII 1 張、印刷體雙引號摺 ASCII 1 張、驚嘆號照 RG 反向 1 張、長題照 RG 1 張**

| MB RG title | 卡上盤名 | 說明 |
|---|---|---|
| `Rough ’n’ Tumble`（U+2019 ×2） | **Rough 'n' Tumble** | 第 473／527／556 條；原盤與 Discogs「Rough 'N Tumble」、Apple「Rough n' Tumble」、Billboard 榜「Rough and Tumble」全進 queryAlias |
| `At the “Golden Circle” Stockholm, Volume Two`（U+201C／U+201D） | **At the "Golden Circle" Stockholm, Volume Two** | 對齊池中王牌 Vol. One 的 ASCII 雙引號寫法（a 組第 550 條第 5 筆同做法）；chk-prop 不掃引號，但標題比對會 |
| `Bucket` | **照 RG，無驚嘆號** | ⚠ 與 a 組 Wahoo! 反向：這次是 **RG 沒有驚嘆號、封面／jazzdisco／維基／Apple 都有「Bucket!」**（Discogs 原壓條目寫「Bucket」）。依第 556 條「照 RG」，「Bucket!」進 queryAlias——研究層若改帶驚嘆號不影響 MBID |
| `Delightfulee` | 照 RG | 封面與 jazzdisco「Delightfulee Morgan」進 queryAlias |
| `The Night of the Cookers: Live at Club La Marchal, Volume 2` | 照 RG 長題 | 與 a 組 Vol. 1 同形；Discogs／Apple 變體進 queryAlias |
| `Mustang!`／`Vibrations`／`The Spoiler`／`The Empty Foxhole`／`Like Someone in Love`／`Of Love and Peace`／`The Rajah` | 照 RG | 同名撞擊：Ella Fitzgerald《Like Someone in Love》1957、Roy Ayers Ubiquity《Vibrations》1976 在池中——掛名不同不亮燈，店面用盤名搜要連掛名帶 catno |

## 第 567 條（同批）：**MB 資料層面的坑 8 個（本層不改 MB）**

1. **《The Rajah》a5f703fd「1966 US 12" Vinyl BST 84426」**：把錄音年填成發行年，RG frd 因此錯成 1966，enum 分段被帶偏——**這是第 551 條 Joy Spring（bare release 拉回錄音年）的變體：不是 bare，而是完整 catno 配錯年**，更難用「無廠牌無 catno」的規則抓到；判準要換成「**catno 號段與年份不相容**」（84400 段不可能 1966）。
2. **frd＝錄音日的原盤 release**：《Delightfulee》69ded563（1966-04-08）、《Of Love and Peace》f9e7f8fd（1966-07-28）——第 518／551／557 條的延續；《Spoiler》《Mustang!》《Vibrations》《Like Someone》只填年也同形。
3. **《Why Am I Treated So Bad!》06472b37「1966 US 12" Vinyl」無廠牌**：錄音 1967-03，1966 不可能；Discogs 也標 1966——兩邊同錯。
4. **只建 stereo 原盤、mono 沒建**：Delightfulee（BST 84243）、Mustang!（84238）、Golden Circle Vol. Two（84225）、Of Love and Peace（84242）、Cookers Vol. 2（84208）、Vibrations（84248）——enum catno 欄因此缺 BLP 號；卡上兩號並列、mono 出自 Discogs。反向：《Spoiler》《Empty Foxhole》《Like Someone》只建 mono。
5. **《Bucket》1c1bb127 catno 只登「4235」無 BLP 前綴**，stereo BST 84235 未建；RG 只 2 筆 release。
6. **bare release**：《Rough 'n' Tumble》1f3b650b、《Delightfulee》962005b0（title「Delightfulee Morgan」）——無廠牌無載體。
7. **《Golden Circle Vol. Two》04677b6c 軌長全空**——寫作層不得引軌長；a042f9e6 數位版國別「AF」是 enum country 欄雜訊。
8. **《The Rajah》dbf735cf「1990 US Digital Media」無 barcode**、cd56de9c 是 JP Promotion 盤——RG 12 筆裡兩筆疑為錯建／宣傳品。
另：《Vibrations》《Bucket》RG 各只 2 筆 release、《Empty Foxhole》3 筆——CD 化史缺，研究層以 Discogs master 287825／418368／171309 補。

## 第 568 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 12/12 命中但 5 張第一次回空 body；CAA 12/12，5 張的圖來源是再發不是原盤**

- **命中且形狀與原盤一致**：Delightfulee（1442853383，6 軌）、Empty Foxhole（1444219285）、Rough 'n' Tumble（738335983）、Of Love and Peace（724752689，4 軌）、Cookers Vol. 2（1443156966，2 軌）、Vibrations（1361784329，10 軌）、Rajah（1550329203／1443220390，6 軌）。
- **命中但只有 RVG／CD 形**：Spoiler（716287100 RVG 7 軌）、Mustang!（724774781，8 軌＝1997 CD 形，bonus 是 1964 另一場）、Golden Circle Vol. Two（723626552 RVG 7 軌；另 1443127075「2012 Remaster」5 軌）、Bucket（724454100「Bucket!」9 軌）、Like Someone（716214784，6 軌＝1988 CD 形）——bonus 全在原序之後，「前 N 軌對應原盤」可採（c-130 Perfect 先例），Mustang! 的 bonus 班底不同要註明。
- **⚠ 5 張第一次查詢回空 body**（Spoiler、Golden Circle、Cannonball、Of Love、Vibrations），4～6 秒後重試或換詞才命中——不是「未上架」，是 Apple 端間歇性空回（第 231／254 條）；策展層原本的 `search` 腳本把空 body 當 JSON parse 錯誤吞掉，**後批的 Apple 腳本要把空 body 與 0 結果分開記**。
- **店面掛名與本卡不同**：The Ornette Coleman Trio、Art Blakey & The Jazz Messengers——上架比對時要用店面寫法。
- **CAA：12/12 有 front**；**來源是原盤 release 的 7 張**（Delightfulee 69ded563、Empty Foxhole a4a2cafc、Rough b845e513、Golden Circle 04677b6c、Like Someone c2d5dfbc、Cookers ab57750e、Vibrations f58cf352）；**非原盤圖 5 張**（Spoiler 2007 XE RVG CD、Mustang! 1997 US CD、Bucket 2000 CD、Of Love 2004 XE CD、Rajah 2021 Tone Poet）——研究層看版式，各卡 risk 已列 Discogs 原盤條目 id。
- 維基 API 本組 13 次抓取以 3.3 秒間隔跑，**零限流**（a 組第 558 條的提醒有效）；Google Books（Billboard 掃描）查詢回空，不能當工具。

## 第 569 條（同批）：**交件數字、實掃順帶、中間檔、1939–66 段收尾**

- **交件 12 張、9 位；退 1**（第 560 條：第 313 條 Capitol 1）；年份改判 7＋兩說 1（第 561 條）；`label` 改他廠 0、vault 改判 1（第 562 條）；掛名群組收攏 1、分裂取多數 1、盤面收攏 2、新掛名 0（第 563 條）；現場 2（第 564 條）；盤名 ASCII 2（第 566 條）；CAA 12/12（第 568 條）。
- `chk-prop a b`：標記 0（跨批 3 筆已知舊帳）；與 a 組 rgMbid 交叉 0、折疊鍵交叉 0。
- 掛名層實掃：Lee Morgan 12 seed＋5 待上架／Stanley Turrentine 5＋6／Ornette Coleman 7＋王牌 2（＋Prime Time 1）／Donald Byrd 14＋8／Jimmy Smith 11＋15（＋Dynamic Duo 1）／Art Blakey and the Jazz Messengers 6＋10、& The 5、Art Blakey 1＋6／Cannonball Adderley 6＋Quintet 2＋The Quintet 2／Larry Young 3／Freddie Hubbard 11＋2／The Three Sounds 1＋11。
- **1939–66 段收尾（c-135～c-140 六批）**：本組是 Lion 期的最後一組。本組 12 張裡 **7 張的實際首發年已在 1967–84 段**（6 張 1967、Rajah 1984），連同 a 組的 Extension／Bring It Home to Me（1967）、Joy Spring（1981），**1956–66 段的 enum 清單裡至少 10 張其實是 1967 後出版的**——同 RG 不會再排到，已含在此。反向也要記：1967–84 段的 enum 清單裡會有 1966 年錄、MB 填 1967 的；那一段開工先跑 jazzdisco 4200／4300 目錄頁整頁比對，不要逐張等 MB。
- **給 1967–84 段的三件**：(1) **BLP 4238–4262 段 MB 年份幾乎全＝錄音年**（第 561 條），jazzdisco＋Billboard 先行；(2) **84400 段的 vault 盤 MB 可能填錄音年**（Rajah 形），判準是「catno 號段與年份不相容」；(3) Cannonball《Why Am I Treated So Bad!》rgMbid 5782ce84 已釘，走 Cannonball／Capitol 線時直接用。
- 中間檔 `scratchpad/c140b/`：c140b-mbfetch.mjs＋mb/（13 個 RG 的 release-group＋release＋CAA 回傳）、c140b-mbsum.mjs／.txt（逐張摘要）、c140b-tracks.mjs／.json（16 筆 release 的軌序）、c140b-poolscan.mjs／.txt（實掃全文）、c140b-wiki.mjs／c140b-wiki2.mjs＋wiki/（17 個維基 infobox）、c140b-discogs.mjs／c140b-discogs2.mjs＋discogs/（22 個 search＋9 個 release 詳情）、c140b-apple.mjs／c140b-apple2.mjs＋c140b-apple.json（店面 search 含重試）、web/（jd-index、jd-4400 目錄頁、jd-4200-disco／jd-4400-disco session 頁）、c140b-build1／2.mjs（卡單產生）。
