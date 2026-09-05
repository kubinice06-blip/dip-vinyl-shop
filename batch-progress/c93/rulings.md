# c-93 策展層裁定（2026-09-05，搖滾正典目錄深度 I）

依 2026-09-02 店主下放，以下全部由策展層自決，未上呈。判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

## 1. a／b 怎麼分：依世代與聲音，不依張數

- **a 組＝後龐克與另類（1977–2003）**：Joy Division、Devo、Pere Ubu、Suicide、The B-52's、
  Elvis Costello（含 The Attractions）、Jane's Addiction、The Damned、Gang of Four，共 20 張 10 位。
- **b 組＝前衛、車庫與 90s（1966–2008）**：Magma、Robert Wyatt、This Heat、Soft Machine、Gentle Giant、
  The Flaming Lips、Spiritualized、Liz Phair、The Cranberries、Jeff Buckley、Guns N' Roses、The Sonics，共 25 張 12 位。

兩組張數不等是刻意的。Flaming Lips 與 Spiritualized 放 b 而不是 a，理由是它們是 90 年代那一批，
與 Liz Phair／Cranberries／Jeff Buckley 同世代；Guns N' Roses 放 b，理由是它接的是 New York Dolls／The Stooges
那條車庫與 glam 的下游（本批那兩張翻唱輯的曲目來源就是它們）。

## 2. 骨幹名單裡五位一張都不收——理由是「該有的已經在池裡」，不是挖不到

實掃 `seed_cards.json` 全 14,424 列後確認，下列五位的正典目錄在池中已經完整，
依派工的判準（「每位先確認第一張該有的在不在，再談深度」），它們沒有第一順位的缺口：

| 藝人 | 池中已有 | MB 上還剩什麼 | 不收的理由 |
|---|---|---|---|
| The Stooges | The Stooges(1969, apex hall)、Fun House(1970, apex hall)、Raw Power(1973, apex hall／掛 Iggy and The Stooges) | 《Kill City》(掛 Iggy Pop & James Williamson)、《Metallic ’KO》(Live)、2007／2013 兩張重組期作 | 三張正典全在。剩下的不是掛名不同人，就是 Live／重組期，**不是「耳熟能詳的招牌作」** |
| The Stone Roses | The Stone Roses(1989, apex hall)、Second Coming(1994) | MB 上 studio Album 就只有這兩張 | **目錄已滿**，其餘全是 B 面輯與 Live |
| New York Dolls | New York Dolls(1973)、Too Much Too Soon(1974) | 2006／2009／2011 三張重組期作 | 原始兩張全在；重組期作不屬本批「招牌作」定義 |
| Neutral Milk Hotel | On Avery Island(1996)、In the Aeroplane Over the Sea(1998, apex hall) | MB 上 studio Album 就只有這兩張 | **目錄已滿** |
| Slint | Tweez(1989)、Spiderland(1991, apex hall) | 只剩 1994 年同名 EP | **目錄已滿**（EP 不進一般卡池） |

**這是廣度線該有的結果**：派工說骨幹名單只是起點，某些藝人一張都不值得補就照那樣收。
硬湊會把重組期作與 Live 塞進一批標榜「招牌作補齊」的批次裡，那是反效果。

## 3. Jane's Addiction 池中是 3 張不是 1 張，而且掛名已分裂

派工的骨幹名單記「Jane's Addiction(1)」。實掃結果是 **3 張**，而且分屬兩個掛名字串：

- `Jane’s Addiction`（U+2019 彎撇號）：《Nothing's Shocking》1988、《The Great Escape Artist》2011
- `Jane's Addiction`（ASCII 直撇號）：《Ritual de lo Habitual》1990

**裁定**：本批只補《Strays》(2003) 一張——那是四張錄音室專輯裡唯一缺的一格。
掛名採 MB 實體與池中多數（2/3）一致的彎撇號 `Jane’s Addiction`，直撇號形進 `queryAlias`。
**這一組屬既有分裂**（同 `audits/pool-artist-name-splits.md` 的形狀），本批不製造第三種寫法，
也不合併——合併是本機的事。同型的還有 **Guns N' Roses**（池中彎撇號 2 張／直撇號 2 張，
本批兩張採 MB 實體的彎撇號）與 **Elvis Costello**（見第 5 條）。

這是裁定第 27 條「取樣只能用來排除，不能用來確認數量」的第 N 次應驗，這次是**撇號字元**造成的低估。

## 4. 三張 `primary-type=Album` ＋ `secondary-types` 含 Compilation：照一般 Album 寫，不填例外欄位

- Joy Division《Substance》(1988，dcb06128)
- Joy Division《Still》(1981，532ffe12)
- Jeff Buckley《Sketches for My Sweetheart the Drunk》(1998，98dd8826)

**依 §5.6 明文與 c-90 裁定第 3 條**：本節針對的是 `primary-type=Compilation`，
primary=Album 而 secondary 含 Compilation 者照一般 Album 寫；填了例外欄位會被 `chk-prop` 判
「非合輯卻帶例外欄位」。**本批因此合輯 0 張、§5.6 一張都沒用到。**

順帶記：這三張都不是「greatest hits 重複包裝」——《Substance》收的是兩張正規專輯**都沒有**的
單曲曲目，《Still》是 Factory FACT 40 的原始品項，《Sketches》是 Buckley 生前唯一未完成的錄音室工作。
就算 MB 把它們標成 primary=Compilation，走 §5.6 也一樣過得了「重要」這一關。

## 5. Elvis Costello 的掛名分三種，本批分派如下

MB 有三個實體：`Elvis Costello` 8a338e06、`Elvis Costello & The Attractions` 0ffb6573、
`Elvis Costello & The Imposters` a3e6fa6e，三者分頁合計 246 個 release-group。
池中也已經是兩種寫法：《My Aim Is True》《This Year's Model》掛 `Elvis Costello`、
《Armed Forces》掛 `Elvis Costello and The Attractions`（**and 拼出來，不是 &**）。

**裁定**：
1. **artist-credit 是 The Attractions 的四張**（Get Happy!!／Trust／Imperial Bedroom／Blood & Chocolate）
   **一律沿用池中既有的 `Elvis Costello and The Attractions`**，不改成 MB 的 `&` 形——
   依裁定第 11 條，卡片掛名要的是通行名，池中已有的那個字串就是這批該依附的通行名。
   MB／Apple 的 `&` 形進 `queryAlias`。
2. **《King of America》掛 `Elvis Costello`**。MB 的 artist-credit 是
   `The Costello Show feat. The Attractions and Confederates`、原盤封面印 The Costello Show，
   但 Apple 與所有串流一律掛 Elvis Costello。**這是裁定第 11 條的正面案例**：
   credit 是發行方在那一版上怎麼印的，通行名是外界實際用來指這張碟的那一個。
   `The Costello Show` 進 `queryAlias`。
3. 兩種寫法都要進去，否則去重會漏——這是第 149 條「別名的用途從計數改成查得到」的實作。

## 6. Magma 三張盤名的取捨——三張各適用一條不同的規則

| 卡 | MB RG 標題 | 卡片取 | 依據 |
|---|---|---|---|
| 《1001° Centigrades》 | `1.001° Centigrades` | **1001° Centigrades** | 裁定第 50 條：原盤封面與 Discogs 通行寫法無千位點；Apple FR（1719590118）也作 1001°。RG 標題與卡片盤名不必相等（第 91 條） |
| 《Ẁurdah Ïtah》 | `Ẁurdah Ïtah` | **Ẁurdah Ïtah** | 裁定第 45 條：**1974 原盤印的是電影名《Tristan et Yseult》**（Barclay 80.528），1989 年 Seventh Records 再發才正式命名。與 Debris'《Static Disposal》、Opus Avantra《Introspezione》同型 |
| 《Üdü Wüdü》 | `Üdü Ẁüdü` | **Üdü Wüdü** | 裁定第 50 條：1976 FR 原盤 release 的標題就是一般 W 的 `Üdü Wüdü`，RG 標題那個帶重音的 Ẁ 是 MB 編輯的選擇 |

**兩張的 RG 標題與卡片盤名不相等，這是設計不是錯**（第 91 條）。
`fix-rgmbid` 看到「標題對不上」時，先查轄下 release 的標題再說：
《1001°》的 FR 原盤 release 標題是 `1.001° Centigrades`、《Üdü Wüdü》的 1976 FR release 標題就是卡片盤名。
另外 Magma 同一個 RG 內部可以有三種盤名（《Ẁurdah Ïtah》RG 底下同時有 `Tristan et Yseult`／
`Ẁurdah Ïtah`／`Wurdah Itah` 三種 release 標題），全部進 `queryAlias`。

MB 上另有波蘭 Magma（5fb16c93）與德國 Magma（5e71484a）兩個同名藝人實體，
是裁定第 29 條「兩個對象搶同一個通行名」的潛在來源；本批四張都已釘死法國 Magma 的 7f89e84d。

## 7. Spiritualized《Pure Phase》掛名取通行名，不取原盤 credit

MB 的 artist-credit 是 `Spiritualized Electric Mainline`（1995 年那一張的一次性掛名），
池中已有《Lazer Guided Melodies》《Ladies and Gentlemen We Are Floating in Space》兩張都掛 `Spiritualized`。

**裁定：取 `Spiritualized`**，`Spiritualized Electric Mainline` 進 `queryAlias`。
理由同第 5 條與裁定第 11 條——一次性的 credit 變體不該把一個樂團在池裡拆成兩個藝人字串。

## 8. Guns N' Roses《"The Spaghetti Incident?"》保留引號，但改用 ASCII 直引號

MB 的 RG 與全部 14 個 release 都作 `“The Spaghetti Incident?”`（彎引號），原盤封面亦有引號；
Apple US（1440819825）作 `The Spaghetti Incident?`（無引號）。

**裁定：卡片作 `"The Spaghetti Incident?"`（ASCII 直引號），無引號形進 `queryAlias`。**
依裁定第 50 條，引號是盤名的一部分（原盤封面就這樣印），彎引號與直引號屬「同一個盤名的兩種寫法」，
在外部服務的搜尋裡會被正規化掉、命中率不受影響。**這與第 117 條（拼寫錯誤要訂正）不同**——
沒有人主張這裡的引號是錯字。改回去只改 `album` 一個欄位，可逆。

## 9. The Sonics《Boom》：Apple 把團名串進盤名，已逐軌核對確認同碟

Apple 上這張叫 `The Sonics Boom`（collectionId 626202316，us／gb 皆命中，12 軌），
不是《Boom》。已用 `lookup?id=…&entity=song` 逐軌取回曲目表比對 1966 年 Etiquette ALB-027 的原盤曲序，
**12 軌曲名與曲序完全相同**，確認是同一張碟。

**裁定：卡片盤名取原盤的《Boom》，Apple 的串名形進 `queryAlias` 並寫進 `risk`。**
這是裁定第 152 條「Apple 把系列名與盤名串成一個字串」的第二種形狀（這次串的是團名）。
Apple 記的 `releaseDate` 1977-01-01 是後續再版年，年份依第 95 條另取原盤的 1966。

## 10. 名單外自加五位——判準是「有王牌卡在池中、卻缺明確的下一張」

派工允許自加同型藝人。加的五位與加的理由：

| 藝人 | 池中已有 | 本批補 | 為什麼 |
|---|---|---|---|
| The Damned | Damned Damned Damned(1977)、Machine Gun Etiquette(1979)、Anything(1986) | The Black Album(1980) | 1980–1985 整段缺席，本張是《Machine Gun Etiquette》同一組編制的直接續作 |
| Gang of Four | Entertainment!、Solid Gold、Mall、Content、Happy Now | Songs of the Free(1982) | 前兩張之後**直接跳到 1991 年重組期**，1982–1983 是斷的 |
| Soft Machine | The Soft Machine(1968)、Volume Two(1969)、Third(1970) | Fourth(1971) | 池中剛好停在本張前一格；而且本批同時收 Robert Wyatt 離團後的首作，兩條線互為背景 |
| Gentle Giant | Three Friends(1972)、Octopus(1972)、Free Hand(1975) | Acquiring the Taste(1971)、In a Glass House(1973) | 池中的 Gentle Giant 是**從第三張開始的**，Vertigo 早期作與 1973–74 中段都缺 |
| The Sonics | Here Are the Sonics(1965) | Boom(1966) | 這個團 1960 年代只出過兩張半，《Boom》就是「第二張該有的」 |

**沒加的同型候選（記下來給後續批次）**：Mercury Rev（池中僅《Deserter's Songs》1 張，缺
《Yerself Is Steam》1991、《See You on the Other Side》1995、《All Is Dream》2001）、
Cheap Trick（池中 2 張，缺 1977 同名首張、《Heaven Tonight》1978、《Dream Police》1979）、
Magazine（池中 3 張，缺《Magic, Murder and the Weather》1981）、
Killing Joke（池中 4 張，缺《Revelations》1982、《Pandemonium》1994）、
Stereolab（池中 3 張，缺《Peng!》1992、《Mars Audiac Quintet》1994——這一組正是第 150 條
點名「被上限規則割掉、可以撈回來」的名單之一）。
**沒加的理由只有一個：本批已到 45 張的上限**，不是它們不值得。

**刻意避開的**：Throbbing Gristle 與 Portishead（池中各 3 張、確有缺口）已在 **c-97 的骨幹名單**上，
Love 在 **c-94** 的名單上，本批不碰，避免跨批撞卡。

## 11. Apple 兩張真查無——已排除 403 假象，記錄探測方式

依裁定第 98／163 條，`403` 是速率限制不是查無、`resultCount:0` 才是查無。本批的兩張是後者：

| 卡 | 探測 |
|---|---|
| Spiritualized《Pure Phase》 | `search?term=Spiritualized Pure Phase` 在 us／gb 各回 **HTTP 200、resultCount 0**；再以 `search?term=Spiritualized&limit=25&country=gb` 列出 Apple GB 的 Spiritualized 目錄 25 筆（含《Lazer Guided Melodies》《Let It Come Down》《Amazing Grace》《Songs in A&E》《Sweet Heart Sweet Light》），**唯獨 1995 這張不在** |
| Liz Phair《whitechocolatespaceegg》 | 同法：盤名搜 us／gb 回 200／0；藝人名列 Apple US 目錄 16 筆（《Somebody's Miracle》《Funstyle》《Liz Phair》與單曲），**本張不在** |

**兩張的封面走 CAA／release-group，固定試聽預估 `unavailable`。**
Guns N' Roses 兩張第一輪盤名搜也回 0，但改走 `lookup?id=106621&entity=album&limit=100` 的
**藝人目錄列舉**就都在（Chinese Democracy 1440756253、The Spaghetti Incident? 1440819825，
兩張 `collectionExplicitness` 都是 `explicit`）——**這是「盤名搜不到 ≠ Apple 沒有」的又一例**，
往後探測層遇到 0 筆時應先列藝人目錄再判。

## 12. 嘻哈以外也要看 explicitness：Guns N' Roses 這一組確實有淨化版雙胞胎

`audits/cleaned-previews-hiphop.md` 記「搖滾批 217 張為 0」。本批發現一個反例：
Guns N' Roses 名下《Live Era '87-'93》在 Apple US 上同時有 `1452802799`（explicit）與
`1452868521`（cleaned）兩筆，同名同軌數。本批收的兩張 GNR 都是 explicit，
但**這證明搖滾線也會有淨化版雙胞胎**，下游配試聽時該團一律逐張核 `collectionExplicitness`。

## 13. 未收清單

- **釘不住 MB 而未收（＝§1 候選）：0 張。** 45 張全部釘住 release-group MBID 並逐一回問
  `release-group/<id>?inc=artist-credits+releases` 確認 `primary-type=Album`、標題、artist-credit 與轄下 release。
- **與池中撞卡而未收**：見第 2 條的五位（The Stooges 3／The Stone Roses 2／New York Dolls 2／
  Neutral Milk Hotel 2／Slint 2）以及 Suicide《Suicide (The Second Album)》
  （MB `a9069ea4`，池中已有、盤名作《Suicide: Alan Vega and Martin Rev》，同碟不重收）。
- **因本批 45 張上限而未收**：見第 10 條的五位候選，以及 Magma《Attahk》(1978)、
  Robert Wyatt《Comicopera》(2007)、The Flaming Lips《Embryonic》(2009)、
  Spiritualized《Songs in A&E》(2008)、Gentle Giant《The Power and the Glory》(1974)、
  Pere Ubu《The Tenement Year》(1988)、Devo《Shout》(1984)、Henry Cow《Western Culture》(1979)。
  **這些全部釘得住 MB、也都通得過撞卡檢查，純粹是張數上限的取捨**，可直接進續批。
