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
