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
