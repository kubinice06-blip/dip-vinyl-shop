# c-137 裁定（Blue Note 1957–1958）

第 490 起為 a 組，第 500 起為 b 組；兩組皆 append。

# a 組（Blue Note 1957–1958：BLP 1536–1597 ＋ 4004／4005，23 筆覆核）

策展層 a 組，2026-09-15。交件 `batch-progress/c137/prop-a.json`，
`node batch-progress/c137/chk-prop.mjs a` **標記 0**（線上池撞卡 0、跨組重複 0、跨批撞卡 0／100 批 4,165 張、同 rgMbid 不同掛名 0）。
rgMbid 與 c-135（45）、c-136 a／b（45）逐一交叉：**重疊 0**。號段 **490–499**。

## 第 490 條（2026-09-15，c-137 a 組）：**《Gil Evans Orchestra》退——列舉檔用了再發盤名，池中早有這張《New Bottle Old Wine》**

slice 第 16 筆 rgMbid f568e18f 掛「Gil Evans Orchestra featuring Cannonball Adderley」、盤名「Gil Evans Orchestra」、note「BN 首發 2019，原盤 1958 可能他廠」。
回問 release 端點：RG 轄下 26 筆 release，原盤是 **World Pacific WP-1246《New Bottle Old Wine》（US 1958，8 軌）**，
「Gil Evans Orchestra」只是 1960 年 World Pacific WP-1298 與 1962 年 Pacific Jazz PJ-40 再壓時用的題名（MB 把 RG title 建成這個再發名）；
2019 Tone Poet B0029473-01 與 2019 數位都回到《New Bottle Old Wine》。
**實掃卡池：`Gil Evans — New Bottle Old Wine (1958)` 已在 seed_cards.json。** 列舉檔的子字串比對因為 RG title 與池中盤名完全不同而漏掉。
**退，理由分類：撞池（列舉檔 RG title 是再發名、池中用原名）。**
方法論：**RG title 不等於原盤題名**——MB 的 RG title 有時取最常見的再發名，撞池要拿 release 端點裡最早那筆的 title 再比一次。
c-135／c-136 沒有這個形狀（那兩批盤名都是原名）；下一批起「原盤可能他廠」的 108 張要特別看，Pacific Jazz／World Pacific 改題再壓是通例。

## 第 491 條（同批）：**《John Jenkins with Kenny Burrell》列舉檔 note「BN 首發 1996」是假警報——MB 建了 1957 原盤但欄位全空**

列舉檔以「掛 Blue Note 的最早 release」算首發年，本張 RG 轄下 1957 那筆 371ccb97 的 label-info／media／country 全空（bare release），
腳本因此跳到 1996 CD。維基 infobox「released 1957」、Discogs 有 BLP 1573 1957 原壓——**原廠是 Blue Note，年份 1957，不走簡報一.3 他廠形。**
另記維基 infobox 的 catno 打成「BLP 1537」（那是 Donaldson《Quartet/Quintet/Sextet》），本卡以 1573 為準。
**通則：note 標「原盤可能他廠」的 108 張裡，會混進「原盤有建但欄位空」的假警報**，要看 release 端點的最早日期，不看有沒有廠牌。

## 第 492 條（同批）：**年份改判 6 張，全是「MB 首發年＝錄音年」的第 364 條形，證據是維基 infobox 直引的 Billboard／Cash Box 新片欄**

| 碟 | MB frd | 本卡 | 依據 |
|---|---|---|---|
| Hank Mobley《Hank Mobley》BLP 1568 | 1957（無月日） | **1958** | 維基引 Billboard 1958-06-30；Apple ℗1958、1958-06-12（與 Billboard 差兩週、非同源） |
| Curtis Fuller《Bone & Bari》BLP 1572 | 1957（無月日） | **1958** | 維基引 Billboard 1958-01 新片欄；Apple ℗1958 |
| Curtis Fuller《Volume 3》BLP 1583 | 1957（無月日） | **1960** | 維基引 Billboard 1961-01-16；正文「not released until late 1960」——**Blue Note 早期壓盤例**，錄完隔三年 |
| Paul Chambers《Paul Chambers Quintet》BLP 1564 | **1957-05-19**（帶月日） | **1958** | 那個月日是錄音日；維基引 Cash Box＋Billboard 1958-04；Apple 同日期是同源（第 431 條） |
| Art Blakey《Holiday for Skins, Volume 1》BLP 4004 | 1958（無月日） | **1959** | 維基引 Billboard 1959-06-15；Apple search 未命中、無 ℗ 佐證 |
| Art Blakey《Holiday for Skins, Volume 2》BLP 4005 | 1958（無月日） | **1959** | 同上 |

**兩個新形狀**：
1. **帶月日的 first-release-date 也可能是錄音日**（Paul Chambers 1957-05-19、Bennie Green 1958-03-23）——比無月日更會誤導，因為看起來像有出處。
   Bennie Green 年份沒受影響（同年），Chambers 差了一年。
2. **1500 系列的目錄號順序與上市順序脫節**（BLP 1583 錄 1957-12、出 1960-12），列舉檔按目錄號排段沒錯，但年份不能照號段推。
**維持 MB 的兩說**：《Jazz Advance》1957（Transition 廠牌年表與 Apple 錄音日形都有 1956 說，照 MB／維基 1957）；
《Jimmy Smith at the Organ, Volume 2》1958（MB 1958-06 帶月；維基合併頁與 Apple ℗ 寫 1957，c-136 b 的 Vol. 1 是 1957——兩卷因此差一年，留研究層核 Billboard）。

## 第 493 條（同批）：**編制掛名收攏四張（第 482 條延伸）＋新掛名裁定 `Sabu Martinez`**

| MB credit（群組實體） | 本卡掛名 | 池中依據 |
|---|---|---|
| `Lou Donaldson Quintet`（39a33c44）《Swing and Soul》 | `Lou Donaldson` | 8 張，c-136 b《Wailing With Lou》同形 |
| `Cecil Taylor Quartet`（1f4ce030）《Jazz Advance》 | `Cecil Taylor` | 9 張（含 apex:heresy Unit Structures） |
| `The George Shearing Quintet`（61947bfa）《Black Satin》 | `George Shearing` | 1 張；數位版 credit 還多了「And Orchestra」 |
| `The Jim Hall Trio`（c5605f85）《Jazz Guitar》 | `Jim Hall` | 2 張個人＋2 張聯名；2018 數位 release 已是 Jim Hall |

**聯名維持**：《John Jenkins with Kenny Burrell》MB credit 是兩個實體以「with」串起，依第 363 條第 1 形照 MB 寫 `John Jenkins with Kenny Burrell`；
Apple／Music Matters 用 `&`，池中先例 `Kenny Burrell & John Coltrane` 也是 `&`——研究層可改 `&`，MBID 不受影響。

**新掛名 `Sabu Martinez`《Palo Congo》**：MB RG credit 單字「Sabu」、藝人實體「Louis “Sabu” Martinez」、1957 原盤 release credit「Sabu Martinez」、封面「SABU」。
取 `Sabu Martinez`，理由：第 307 條反查——四字母 `Sabu` 在池中會亂命中（Masabumi Kikuchi），且日本自由爵士線的 Sabu Toyozumi（豊住芳三郎）若入池會與單字 `Sabu` 直接合併；
原盤 release 本身就印 Sabu Martinez，不算新造。`Sabu`／`Sabú Martínez` 進 queryAlias。**曲風記 jazz＋world**（實質是 Afro-Cuban folkloric），留研究層決定。
另：`J. R. Monterose` 照 MB 有空格寫法，原盤／Apple 的 `J.R.` 進 queryAlias。

## 第 494 條（同批）：**原盤他廠 6 張，year 取原廠首發年、label 寫原廠——與 c-135／c-136 a 的 Pacific Jazz／Jazz:West／Transition 先例同形**

| 碟 | 原廠 catno | 年 | Blue Note 版 |
|---|---|---|---|
| Art Pepper《The Return of Art Pepper》 | Jazz:West JWLP-10 | 1957 | 1988 CD 改題《The Complete Aladdin, Volume 1》15 軌 |
| Cecil Taylor《Jazz Advance》 | Transition TRLP 19 | 1957 | 1976 JP LP LNJ-70072、1991 CD |
| George Shearing《The Shearing Piano》 | Capitol T 909 | 1957 | 只有無日期數位（20 軌，與 2001 Capitol Jazz CD 同組） |
| June Christy《Fair and Warmer!》 | Capitol T-833 | 1957 | 2017 數位 |
| George Shearing《Black Satin》 | Capitol T-858 | 1957-08 | 無日期數位 |
| Jim Hall《Jazz Guitar》 | Pacific Jazz PJ-1227 | 1957 | 2018 數位 |

廠牌字串「Jazz:West」照 c-136 a 組（MB 實體名「Jazz West」、維基「Jazz: West」）。
**Capitol 三張是這條線第一次碰到的形狀**：Blue Note 目錄裡有它們只因 UMG 把 Capitol 爵士老盤的數位發行掛在 Blue Note 名下——
下一批 Capitol／Roulette 轉來的會更多，**這種「數位掛名」與「Blue Note 確實再發過」（Pacific Jazz 1988 CD 系列）要分開寫**，本組在 risk 逐張標明。
盤名：《The Return of Art Pepper》取原名，1988 長題進 queryAlias（第 363 條《Playboys》原名先例）；池中《Modern Art》1957 是姊妹盤（Intro 原盤、BN CD Vol. 2），不同碟。

## 第 495 條（同批）：**同場拆盤四組、Manhattan Towers 五張皆非現場——本組 live 0 張**

- **Orgy in Rhythm Vol. One**（本組）↔ Vol. Two（c-136 b，5ef5035d）
- **Holiday for Skins Vol. 1 ↔ Vol. 2**（皆本組）
- **Blue Lights Vol. 1 ↔ Vol. 2**（皆本組）
- **Jimmy Smith at the Organ Vol. 2**（本組）↔ Vol. 1／A Date Vol. 1／2／The Sounds（皆 c-136 b，第 486 條五向互指補齊）
各算一張（簡報一.6、第 487 條），risk 互指；分卷曲目本組憑記憶只寫軸心曲，**研究層以盤面核分卷**。
Manhattan Towers 的五張（Palo Congo、Orgy Vol. One、At the Organ Vol. 2、Blue Lights ×2、Holiday ×2）依第 485 條都是錄音室，MB secondary-types 全空，**本組 live 0**。
Orgy 與 Holiday for Skins 是前後作、不同場（1957-03 vs 1958-11），正文不得寫成同場。

## 第 496 條（同批）：**同名撞擊高風險三處，正文與試聽比對務必帶 BLP 號**

1. **Hank Mobley 1957 四張盤名都是他的名字**：1540《Hank Mobley Sextet》（c-136 a 改題）、1550《Hank Mobley Quintet》、1560《Hank》（c-136 b）、**1568《Hank Mobley》（本組，selfTitled true）**。
2. **《Volume 3》**：Curtis Fuller BLP 1583（本組）vs Lee Morgan《Vol. 3》BLP 1557（c-136 b）vs 池中 Bud Powell《…Vol. 3》——chk-prop 的鍵含掛名所以不亮燈，但 Apple search／CAA 對盤名的比對會混。
3. **《Jimmy Smith at the Organ, Volume 2》**BLP 1552（本組）vs c-136 a《A New Sound, a New Star: Jimmy Smith at the Organ, Volume 2》BLP 1514——盤名尾段全同。
盤名照 MB RG title 逐字（第 483 條），變體進 queryAlias，留研究層／主線一次決定。

## 第 497 條（同批）：**CAA 與店面觀察**

- **CAA RG 層封面 20/22 命中**（front 皆 true）；**404 兩張：《Fair and Warmer!》（RG 只兩筆 release）、《Jimmy Smith at the Organ, Volume 2》（只一筆）**——研究層從 release 層或 Discogs 取圖。
  命中 20 張裡 **2 張來源是再發 CD**（John Jenkins 1996 CD、Jazz Guitar 1988 CD），研究層看版式。
- **Apple us `search` 一種查法**：22 張裡 **20 張命中**、2 張未命中（Holiday for Skins Vol. 1／2）；另 5 張只命中合訂或再發形（Orgy 合訂 8 軌、Blue Lights 合訂 9 軌 ×2、Return of Art Pepper 1988 15 軌、Shearing Piano 2001 20 軌）——只是觀察（第 254 條）。
- **Apple 日期在本組的形狀**：錄音日 8 張（Swing and Soul、Paul Chambers、Jazz Advance、The Cooker RVG、Back on the Scene、Blue Lights、At the Organ Vol. 1…）、01-01 placeholder 6 張；
  **帶月日且非錄音日的只有 Fair and Warmer 1957-05-10、Jazz Guitar 1957-02-22、Hank Mobley 1958-06-12**——這三個可能是真發行日，研究層核。第 484 條「店面日期不能當年份來源」再證。

## 第 498 條（同批）：**MB 建檔觀察（只報不改）**

- 重複建檔：《J. R. Monterose》1994 CD 兩筆同 barcode（1534204f／55366f7b）；《Blue Lights, Volume 2》2005 JP CD 兩筆同 TOCJ-8606 同 barcode（1f2b1d59／b494ba91）。
- 殘缺建檔（無日期／載體／廠牌）：《Bone & Bari》91c90410、《Orgy in Rhythm Vol. One》7f61b90c、《John Jenkins》371ccb97。
- 只有一筆 release 的 RG 兩張：《At the Organ Vol. 2》、《Back on the Scene》——日本 TOCJ CD 未建，研究層核 Discogs。
- 《Gil Evans Orchestra》RG 轄下 26 筆 release，題名五種（New Bottle Old Wine／Roots／Gil Evans Orchestra／Cannonball Meets Gil Evans／Julian Cannonball Adderley With Gil Evans…），是本線目前 RG title 最不穩的一張（第 490 條）。

## 第 499 條（同批）：**實掃與交件數字**

- 實掃卡池（seed 16,450 列＋ c100–c134 cards 34 檔）：**23 筆撞池 1**（第 490 條 Gil Evans），其餘 22 筆的盤名子字串命中全是他人假陽性（Volume One／Vol. 2／Blue／Lights／Skin…）。
  掛名層：Lou Donaldson 8／Hank Mobley 10／Curtis Fuller 2／John Jenkins 0／Kenny Burrell 4／Sabu 0／Monterose 0／Art Pepper 10／Paul Chambers 2／Art Blakey 個人 1＋Messengers 11／
  Cecil Taylor 9／George Shearing 1／June Christy 1／Jim Hall 2＋2／Lee Morgan 12／Jimmy Smith 12／Bennie Green 1（`Benny Green` 鋼琴家池中無）。
- **交件 22 張、退 1 張**（第 490 條，撞池）；年份改判 6（第 492 條）；原盤他廠 6（第 494 條）；掛名收攏 4＋新掛名 1（第 493 條）；live 0（第 495 條）；CAA 20/22（第 497 條）。
- `chk-prop a`：標記 0。與 c-135／c-136 rgMbid 交叉重疊 0。
- **中間檔**：`scratchpad/c137a/`（c137a-poolscan.txt 實掃全文、mb/ 23 個 RG 的 release-group＋release＋CAA 回傳、c137a-mbsumm.txt 逐張摘要、c137a-wiki.txt 維基 infobox 抓取、c137a-apple.json 店面 search）。

---

# b 組（Blue Note 1958–1959，BLP 1582–1600 尾段 ＋ BLP 4006–4053 開端 ＋ 三張 UA／一張 Capitol／一張 World Pacific，22 張／18 位）

策展層 b 組，2026-09-15。交件 `batch-progress/c137/prop-b.json`，`node batch-progress/c137/chk-prop.mjs b` **標記 0**
（欄位 0、線上池撞卡 0、跨組 0、跨批撞卡 0／100 批 4,168 張、同 rgMbid 不同掛名 0）。號段 **500–509**。

## 第 500 條（2026-09-15，c-137 b 組）：**22 筆覆核結果——收 22、退 0；rgMbid 全部照 enum，無一釘錯；年份改判 8 張**

22 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels`，title／credit／frd／catno／載體／軌數逐筆對過，
**enum 的 rgMbid 沒有一筆釘錯**（c-136 第 480 條那種掛錯 RG 的假陽性本組沒有——五張「Blue Note 只是再發方」的 release 都確實是本盤，見第 502 條）。
實掃卡池（`seed_cards.json` 16,450 列＋`desc-tools/batches/cards/c1*.json`＋`batch-progress/c12x–c13x/prop-*.json`，掛名與盤名雙向子字串各 22 個關鍵字）：
**撞池 0**；enum 的 `inPool: false` 22 筆全部成立。與同批 a 組 `prop-a.json`（22 張）交叉：rgMbid 重疊 0、掛名＋盤名鍵重疊 0。

掛名層實掃：Lou Donaldson 8／Curtis Fuller 2／Tina Brooks 3／Horace Silver 8（＋Jazz Messengers 王牌 1）／Louis Smith 0／Clifford Jordan 1（＋Quartet 1）／
Dizzy Reece 0／The Three Sounds 1／Peggy Lee 1／Gil Evans 6／Donald Byrd 14／Walter Davis Jr. 0／Bennie Green 1／Duke Pearson 1／
Al Cohn & Zoot Sims 1（Zoot Sims 個人 2）／Art Blakey and the 6＋& The 5＋個人 1／Cecil Taylor 9／Charles Mingus 19——
**三位新掛名（Louis Smith、Dizzy Reece、Walter Davis Jr.）都已照第 307 條反查同字串不同人，見第 503 條。**

退件 0。沒有撞池、沒有判為合輯、沒有列舉假陽性；「原盤他廠」的全部是改 `label` 不是退（第 502 條）。

## 第 501 條（同批）：**年份改判 8 張——MB first-release-date 在 4000 系列開端幾乎全是「錄音日當發行日」，jazzdisco 目錄頁是這一段的一手級來源**

| 碟 | enum／MB | 改判 | 依據 |
|---|---|---|---|
| Lou Donaldson《Light Foot》BLP 4053 | 1958（數位 release 填錄音日 1958-12-14；黑膠 release 標 1959；維基 infobox 1959） | **1961** | Discogs master 361255 與三筆原盤條目 1961；jazzdisco 4000 系列索引 BLP 4053＝1961；4050–4054 整段 1961 |
| Curtis Fuller《Two Bones》 | 1958（release 34531d3e「1958 US、無 catno」） | **1980**（JP 首發） | Discogs master 725374 GXF 3064 1980 JP；維基「not released until … King Records … 1980」；jazzdisco |
| Tina Brooks《Minor Move》 | 1958（Capitol 數位 Expanded 填錄音日 1958-03-16） | **1980**（JP 首發） | MB 兩筆 GXF 3072 標 1980；Discogs master 293594；維基 |
| The Three Sounds《Introducing … Volume 2》 | 1958（唯一 release 填錄音日 1958-09-16） | **1985**（JP 首發） | Discogs 以 catno 反查 BNJ 61019＝1985 東芝EMI「The Other Side of Blue Note 1500 Series」，見第 505 條 |
| Dizzy Reece《Blues in Trinity》BLP 4006 | 1958（MB／Discogs master 皆 1958） | **1959** | 維基 infobox「Early June 1959」引 Billboard 1959-06-15；jazzdisco BLP 4006＝1959；4003／4007 皆 1959 |
| Walter Davis Jr.《Davis Cup》BLP 4018 | 1959（殘缺 release 35a13747；Discogs master 1959） | **1960** | 維基「June 1960」（Schwann 1966）；jazzdisco BLP 4018＝1960；4017／4019／4022 皆 1960 |
| Duke Pearson《Profile》BLP 4022 | 1959-10-29（錄音 10-25，差四天） | **1960** | Discogs master 339445 1960；維基 1960（引 jazzdisco）；jazzdisco BLP 4022＝1960 |
| Lou Donaldson《The Time Is Right》BLP 4025 | 1959（第二場 11-28 才錄完） | **1960** | Discogs master 533670 1960；維基「Early April 1960」引 Billboard 1960-04-18；jazzdisco BLP 4025＝1960 |

**維持 MB 的兩說一張**：Peggy Lee《Things Are Swingin'》MB 1958（兩筆 Capitol 原盤皆 1958）、Discogs 原盤 1958（另有 1959 repress）、Apple 1958-11-03，**維基 infobox 1959**——
照第 364 條「相差一年照 MB」取 1958，risk 已寫 1959 說。其餘 13 張 MB／Discogs／維基／jazzdisco 一致。

方法論三點：
1. **MB 的 frd 在這一段有兩種失真**：(a) 數位 release 把錄音日當發行日（Light Foot、Minor Move、Three Sounds Vol. 2、Bottoms Up 1959-02-11、Jazz Corner 1959-04-15）——
   年對月日錯，或年也錯；(b) 黑膠 release 填錄音年（Blues in Trinity、Davis Cup、Time Is Right、Profile、Two Bones）——**Blue Note 4000 系列開端「年底錄、次年出」是常態**，
   frd 落在錄音年的都要疑。
2. **jazzdisco.org 的 Blue Note 目錄頁**（`/blue-note-records/catalog-4000-series/album-index/`、`catalog-1500-series`）逐號記出版年，
   與 Billboard 同期評論（維基引）互相獨立、與 MB／Discogs 也獨立——**是第 431 條說的「廠牌目錄頁」級來源**，本組八張改判全部經它核過；
   本組已把兩頁抓到 `scratchpad/c137b/c137b-web/jd-4000.html`／`jd-1500.html`，後批（c-138 起 4000 系列中段）直接用。
3. **目錄號順序本身是證據**：Blue Note 出版時才配號，4053 落在 1959 或 4018 落在 1959 都與前後號的出版年衝突。Discogs master 年份在這一段偏向錄音年（Blues in Trinity、Davis Cup 兩張 Discogs 與 MB 一起錯）。

## 第 502 條（同批）：**enum 標「原盤可能他廠」的 6 張逐張判——5 張成立改 `label`、1 張不成立；另 2 張 enum 沒標的其實是日本首發庫存盤**

| 碟 | enum note | 判定 | `label`／`year` |
|---|---|---|---|
| Tina Brooks《Minor Move》 | BN 首發 1980、原盤可能他廠 | **不成立**：Blue Note 自家庫存盤，1980 日本 King GXF 3072 世界首發（c-131 第 364 條 Oblique／GXF 同型） | Blue Note GXF 3072（JP）／1980 |
| Walter Davis Jr.《Davis Cup》 | BN 首發 2007、原盤可能他廠 | **不成立**：原盤就是 Blue Note BLP 4018，MB 那筆 1959 release 只是沒填 label-info（第 259 條「拿不到不等於沒有」） | Blue Note BLP 4018／1960 |
| Peggy Lee《Things Are Swingin'》 | BN 首發 2004、原盤可能他廠 | **成立**：Capitol T 1049／ST 1049（1958）；Blue Note 只在 2004 數位版與 Capitol Jazz 並列掛名 | Capitol T 1049／1958 |
| Gil Evans《Great Jazz Standards》 | BN 首發 2023、原盤可能他廠 | **成立**：World Pacific WP-1270（1959-09）；Blue Note 是 2023 Tone Poet 再發方（第 455 條 Konitz 同型） | World Pacific WP-1270／1959 |
| Al Cohn & Zoot Sims《Jazz Alive!》 | BN 首發 1998、原盤可能他廠 | **成立**：United Artists UAL 4040／UAS 5040（1959）；Blue Note 1998 CD | United Artists UAL 4040／1959 |
| Cecil Taylor《Love for Sale》 | BN 首發 1998、原盤可能他廠 | **成立**：United Artists UAL 4046／UAS 5046（1959）；Blue Note 1998 CD | United Artists UAL 4046／1959 |
| Charles Mingus《Jazz Portraits》 | BN 首發 1994、原盤可能他廠 | **成立**：United Artists UAL 4036（1959-09）；Blue Note 1994 CD | United Artists UAL 4036／1959 |
| Curtis Fuller《Two Bones》 | （無） | **enum 漏標**：MB release 把 1980 JP GXF 3064 登成「1958 US」，enum 因此沒觸發「晚 3 年」規則 | Blue Note GXF 3064（JP）／1980 |
| The Three Sounds《Introducing … Vol. 2》 | （無） | **enum 漏標**：同上，MB 把 1985 JP BNJ 61019 登成 1958-09-16 | Blue Note BNJ 61019（JP）／1985 |

⚠ **三張 United Artists 1959 盤（Half Note、Love for Sale、Jazz Portraits）是 EMI 1990 年代把 UA 爵士目錄併進 Blue Note 再發的結果**——
這條線後面（1967–84 Liberty／UA 期）會大量遇到同形，通則：`label` 寫 UA、`year` 取 UA 年、risk 註明 Blue Note 版。
⚠ **Peggy Lee 那張與 Blue Note 目錄本體的距離最遠**（Capitol 人聲盤、Blue Note 只是數位掛名之一）——本組照簡報一.3 收、label Capitol，
**主線若判 Capitol 人聲盤不歸這條線，退掉是可逆的**（只影響一張卡）。

## 第 503 條（同批）：**掛名：六組收攏＋三個新掛名反查**

| MB credit | 本卡掛名 | 依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組 e9ac5139）《Further Explorations》 | `Horace Silver` | 池中 8 張；c-136 第 482 條 Stylings 同型 |
| `Cliff Jordan`（credited-name）《Cliff Craft》 | `Clifford Jordan` | c-136 第 482 條 BLP 1565 先例 |
| `Cecil Taylor Trio and Quintet`（兩個群組實體）《Love for Sale》 | `Cecil Taylor` | 池中 9 張、無編制分裂；第 363 條第二型 |
| `Art Blakey & The Jazz Messengers`（群組 209ddf15）《At the Jazz Corner of the World》 | `Art Blakey and the Jazz Messengers` | 池中 `and the` 6 vs `& The` 5（audits 第 1 組）；c-136 a 組 Cafe Bohemia／Birdland Vol. 2 先例 |
| `Al Cohn and Zoot Sims`（兩個 Person，join「and」；14/17 筆 release 印「Zoot Sims / Al Cohn / Phil Woods」）《Jazz Alive!》 | `Al Cohn & Zoot Sims` | 池中既有字串（Al and Zoot 1957）；第 363 條第一型聯名照池中先例、避開 `&`／`and` 分裂；Woods 是第二晚客座不進掛名 |
| `Gil Evans`（RG）／`The Gil Evans Orchestra`（2023 數位）／`Gil Evans Orchestra Featuring Johnny Coles`（Tone Poet）《Great Jazz Standards》 | `Gil Evans` | 池中 6 張含 MB 同掛 Orchestra 的 Hendrix 盤 |

新掛名三個（池中零張、反查無同字串不同人）：
- **`Louis Smith`**：MB 1f35fe85 Person、US、「US jazz trumpeter」、1931–2016。MB 同名另有英國 D&B 製作人（96 分）、英國體操選手（95）、Kendall Street Company 成員（95）——以 type／area／life-span 定（第 250 條）。Discogs「Louis Smith (2)」。
- **`Dizzy Reece`**：MB cbde4132 Person、Jamaica、1931–；另有 Dizzy Reece Quartet／Quintet 群組實體不收攏。
- **`Walter Davis Jr.`**：MB 98d1fb70 Person、US、1932–1990；MB 搜尋 100 分是藍調鋼琴手 Walter Davis（1912）——**不同字串（有無 Jr.）**，不撞；Apple 兩種寫法（Walter Davis／Walter Davis, Jr.）進 queryAlias。

## 第 504 條（同批）：**現場盤 3 張——兩張 MB 有標、一張 MB 沒標；Jazz Corner 的 Vol. 1／2 折在同一 RG 只收一張**

- 《Jazz Alive! A Night at the Half Note》（MB [Live]，Half Note 1959-02-06／07）與《Jazz Portraits: Mingus in Wonderland》（MB [Live]，Nonagon Art Gallery 1959-01-16）——場地都是演出場所，正文可寫現場。
- **《At the Jazz Corner of the World》MB secondary-types 空**，但 Birdland 1959-04-15、盤面「Recorded live at Birdland」、維基 live album——第 397 條「沒標不代表不是現場」（第 455 條 Konitz 鏡像），卡單標現場。
- **Vol. 1（BLP 4015，1959-09）／Vol. 2（BLP 4016，1959-10；jazzdisco 記 1960）MB 只建一個 RG**，原盤 release d234a182 是「兩面各 5 軌、BST 84015｜BST 84016」的合併登錄；
  MB 搜尋只回本 RG 與 1960 年《Meet You at the Jazz Corner of the World》的兩卷（另一場）。依第 453 條 (a) 型（折在同 RG）**收一張**、盤名照 RG 短名、`year` 取 Vol. 1 的 1959，
  risk 寫明原盤是兩張 12 吋——與簡報一.6「Vol. 拆盤各算一張」不衝突（那是 MB 各建 RG 的情況）。**要拆兩張得先在 MB 拆 RG，本層不動 MB。**
- 第 485 條那種「錄音場地標 Live」的形狀本組沒有。

## 第 505 條（同批）：**《Introducing The Three Sounds, Volume 2》——MB catno 打錯、日期是錄音日，實為 1985 東芝EMI BNJ 61019 的 outtakes LP；本組收，主線可退**

MB RG b594f1ab 唯一 release 69c52708：1958-09-16、Vinyl 6 軌、Blue Note「J61019」、無 annotation。六軌（Bobby／Mo-Ge／It Might as Well Be Spring／Soft Touch／Don't Get Around Much Anymore／Goin' Home alt.）
是 1958-09-16 Introducing 那場沒用的部分。**Discogs 以 catno 反查：BNJ 61019，1985 年日本東芝EMI「The Other Side Of Blue Note 1500 Series」限定盤**（master 2471350，封面題「The Three Sounds Vol.2」），
維基 Introducing 條目也寫 CD bonus「originally issued in Japan as Introducing the 3 Sounds Volume 2」。MB 把「BNJ」打成「J」、把錄音日當出版日；enum 因此把它排進 1958 年那一段。

裁定：MB 分建了 RG、primary Album、不是 Compilation——依簡報二.3 各算一張，**本組收、year 1985、label BNJ 61019（JP）**，risk 互指池中 Vol. 1。
但要記兩件事給主線：(1) 這六軌 1989 年起全部是 Vol. 1 CD 的 bonus，店面沒有獨立條目（Apple search 零命中）——**上架時試聽只能走 Vol. 1 擴充版「後 6 軌」**；
(2) 一張 1985 日本限定 outtakes LP 的卡值不高，**主線要退是可逆的**（enum 排序上它本來就是被錯誤日期帶進 1958 段的）。

## 第 506 條（同批）：**盤名五處裁定——照 MB RG title，變體進 queryAlias，一處改 ASCII 撇號**

| 碟 | MB RG title | 其他來源 | 本卡 |
|---|---|---|---|
| Lou Donaldson《Light Foot》 | Light Foot | Discogs／Apple／維基／封面／2014 數位 release 全「Light-Foot」 | 照 MB「Light Foot」，連字號版進 queryAlias（第 483 條同形，研究層可改） |
| Peggy Lee《Things Are Swingin’》 | U+2019 撇號 | 池中慣例 ASCII（Moanin'／Walkin'／Blowin'） | **改 ASCII「Things Are Swingin'」**，U+2019 版進 queryAlias——這是字元正規化不是改名，MBID 不受影響 |
| Charles Mingus《Jazz Portraits: Mingus in Wonderland》 | 合成名 | 原盤《Jazz Portraits》→再發《Wonderland》→1994 CD 合成名 | 照 MB 合成名（第 45／363 條「現行流通名」），原題進 queryAlias、正文交代 |
| Bennie Green《Walkin' & Talkin'》 | & | 1993 JP CD／Discogs「and」 | 照 MB；chk-prop 折疊鍵已把 & 換 and |
| Horace Silver《Further Explorations》 | 短名 | 維基條目／Apple「Further Explorations by the Horace Silver Quintet」 | 照 MB 短名 |

另《Introducing The Three Sounds, Volume 2》見第 505 條（Discogs 封面「The Three Sounds Vol.2」）。

## 第 507 條（同批）：**MB 建檔問題清單（本層不改 MB，留研究層／主線）**

1. Two Bones release 34531d3e：「1958 US 12" Vinyl、Blue Note 無 catno」——實為 1980 JP GXF 3064；RG frd 因此錯成 1958。
2. Three Sounds Vol. 2 release 69c52708：catno「J61019」應為「BNJ 61019」、日期 1958-09-16 應為 1985。
3. Davis Cup release 35a13747：1959、無國別／status／label／載體、3+3 軌——原盤 BLP 4018 的殘缺登錄；RG 因此沒有一筆帶 Blue Note 原盤 catno。
4. Bottoms Up! 原盤 release daa260d0：catno「BST 4014」（立體聲應為 BST 84014，mono 原盤是 BLP 4014）、日期 1959-02-11 是錄音日。
5. Jazz Corner release d234a182：Vol. 1／2 兩張 12 吋合併成一筆兩面 release，catno 用立體聲號 BST 84015｜84016、日期 1959-04-15 是錄音日。
6. Light Foot release e70c5107：12" Vinyl 登錄 8 軌（原盤 7 軌，與 f7fb4100 的 7 軌並存）。
7. Further Explorations：2008 RVG CD 50999 5 14379 2 3 重複建三筆（383b841b／d1a05fef／d4c63af0）、2020 Tone Poet 重複兩筆（b72883d2／ba99e70b）、另一筆 cb513d4e 無日期無載體。
8. Great Jazz Standards 原盤 release 03765dd9：label 登錄「Pacific Jazz」，WP-1270 是 1958 年改名後的 World Pacific 號（Discogs 全部條目 World Pacific）。
9. Off to the Races：轄下 35629db5（2009 GB Hallmark）題「Down Tempo」，是廉價再發改名，同 RG 沒錯但盤名比對會漏。

## 第 508 條（同批）：**CAA 命中 22/22；店面觀察（第 254 條，只寫觀察）Apple us `search` 一種查法命中 20/22**

- **CAA RG 層 front 全部命中**。其中 **7 張來源不是原盤圖**，研究層看版式：Light Foot（2014 數位）、Minor Move（Capitol 數位 Expanded）、Two Bones（那筆年份錯登的 release，圖應是 GXF 3064）、
  Great Jazz Standards（1988 CD）、Davis Cup（2007 RVG CD）、Jazz Corner（1994 數位，是 2CD 封面）、**Love for Sale（2014 AF「CoolNote」數位——來路可疑的再發商，圖不一定是 UAL 4046 原盤）**。
  Discogs 對應條目都有原盤圖（各卡 risk 已列 release id）。
- Apple `search`：20/22 命中；**未命中 2 張**：Three Sounds Vol. 2（內容在 Vol. 1 擴充版的 bonus、無獨立條目）、Cecil Taylor《Love for Sale》（回古典無關結果）——只是觀察，研究層走藝人目錄與 collectionId。
- **Apple 的 releaseDate 這批 22 張裡 15 張是錄音日或 01-01 placeholder**（Two Bones 1958-01-22、Minor Move 1958-03-16、Smithville 1958-03-30、Cliff Craft 1957-12-01、Off to the Races 1958-12-02、
  Further Explorations 1958-01-03、Bottoms Up 1959-06-07、Walkin' 1959-01-25、Profile 1959-10-25、Jazz Portraits 1959-01-16……）——第 484 條再次確認：**Blue Note 目錄的店面日期不能當年份來源**。
- 店面形狀：bonus 版（Smithville 8 軌、Blues in Trinity 8 軌、Peggy Lee 14 軌、Minor Move 6 軌、Here Comes Louis Smith RVG 7 軌）走「前 N 軌對應原盤」（c-130 Perfect 先例）；
  Jazz Corner 只有 10 軌合併版（Vol. 1＝前 5 軌）。

## 第 509 條（同批）：**交件數字與中間檔；順帶三件給後批**

- 交件 22 張、18 位；退 0；年份改判 8（第 501 條）；`label` 改他廠 5（第 502 條）；掛名收攏 6、新掛名 3（第 503 條）；現場 3（第 504 條）；CAA 22/22。
- `chk-prop b` 標記 0；與 a 組交叉 0。
- 中間檔 `scratchpad/c137b/`：c137b-poolscan.txt（實掃全文 124 筆命中）、c137b-mb/（22 個 RG 的 release-group／release／CAA／Apple 回傳＋8 個 artist 實體＋4 個搜尋）、
  c137b-discogs/（25 個 catno／master 反查）、c137b-web/（jazzdisco 1500／4000 目錄頁、22 個維基 raw）、c137b-mb-summary.json（22 筆彙整）、c137b-build-1～5.mjs（prop 產生器）。
- 給後批：(1) **Discogs `database/search` 端點不帶 token 可用**（`catno=`／`artist=`＋`release_title=`／`q=&type=master`），每 3 秒一次沒撞限流——catno 反查是抓 MB 錯登錄最快的路；
  (2) **Sonny Clark 1957–58 在 Blue Note 當 sideman 的密集期**：本組五張（Lou Takes Off、Cliff Craft、Smithville、Two Bones、Minor Move）都有他，正文各寫各的編制、不得互抄；
  (3) Blue Note 日本首發庫存盤在 1958 年段就出現三張（GXF 3064／3072、BNJ 61019）——enum 的「晚 3 年」規則抓不到 MB 錯登錄成錄音年的那種，**MB release 無 catno 又標美國原盤年的一律疑**。

## 第 509a 條（主線 2026-09-15，b 組交件後）：**退兩張——Peggy Lee 不歸此線、Three Sounds Vol. 2 是 outtakes 盤**

1. **Peggy Lee《Things Are Swingin'》退**：Capitol 人聲盤，Blue Note 只是 2004 數位再發的掛名之一。
   簡報第一節第 3 點的「原盤他廠照收」是為 Pacific Jazz／Transition／Vogue 那種**被 Blue Note 併購或授權而進入目錄**的爵士盤設的，
   **不是為「數位再發時掛了 Blue Note 名」的非爵士盤設的**。列舉檔的 1,812 張裡這種形狀還會有，**凡原盤是 Capitol 主流人聲／流行、Blue Note 只在數位再發出現的，一律退**。
2. **The Three Sounds《Introducing The Three Sounds, Volume 2》退**：1985 年日本限定 outtakes LP，六軌就是 Vol. 1 CD 的 bonus，店面無獨立條目。
   **這條線收的是目錄，不是 outtakes。** 同形（日本限定 LT／GXF／BNJ 首發的庫存盤）**若是完整的 session 專輯就收**（Minor Move、Two Bones 那種），**若是別張的 bonus 拆出來的就退**。
**b 組 22 → 20，本批 42 張。** 年份改判 8 張全數追認（MB 首發日在這段幾乎全是錄音日 placeholder，jazzdisco 目錄頁＋Billboard 是硬證據）。
