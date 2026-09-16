# c-144 裁定（a 組，Blue Note 1974–79 第一段，編號 750–779）

策展層 a 組，2026-09-16。交件 `batch-progress/c144/prop-a.json`（`g: "a"`），
`node batch-progress/c144/chk-prop.mjs a` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、
跨批撞卡 0／108 批 4,427 張、同 rgMbid 不同掛名 0）。
21 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`，欄位鍵與 `c141/prop-b.json` 完全一致。

## 第 750 條（c-144 a 組交件）：**23 筆 → 收 21、退 2；年份改判 0 張、但「維持 enum 值而推翻 jazzdisco」1 張；盤名改判 1 張、盤名大小寫裁定 2 張**

- **收 21 張、16 位**（Bobby Hutcherson 2、Moacir Santos 2、Ronnie Foster 2、Alphonse Mouzon 2、Horace Silver 2，其餘 11 位各 1）。
- **退 2**（第 751 條）：Andrew Hill《One for One》的重複 RG 1 筆、Betty Carter《Finally》他廠原盤 1 筆。
- **年份**：21 張的 `year` **全部維持 enum 值**，一張都沒改。但其中 **McCoy Tyner《Cosmos》是「enum／MB 對、jazzdisco 錯」**（jazzdisco 記 1975，實際 1976-07，第 753 條）。
- **`releaseType`**：21 張全是 Album，**合輯 0**；`-H2` 雙唱片 4 筆全部覆核為庫存首發、不走 §5.6（第 752 條）。
- **`label` 改他廠 0**（改他廠的那一張直接退了，見第 751 條 #2）。
- **掛名**：新掛名 3 位（`Waters`、`John Lee`、`Gerry Brown`），其餘 18 張全部用池中既有字串；群組收攏 0、自行合併 0（第 754 條）。
- **現場 2 張**（皆 MB `secondary-types` 有 Live ✓）；**庫存／延遲發行 5 張**（第 752 條）。
- **CAA 17/21 有圖**，其中 13 張的來源就是原盤；**4 張 RG 層 404、零圖**（第 758 條）。
- **店面命中 18/21**（第 758 條）。
- **紙本**：本層自抓 **Billboard 1975-10-04→1976-12-25 共 64 期、Cash Box 同區間 64 期**收進 repo（第 756 條）。

## 第 751 條（同批）：**退表 2 筆**

| # | 盤 | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Andrew Hill《One for One》1975（BN-LA459-H2-0798／BST 84 489/90 XC） | f9fb4c22-d198-46fd-8de4-f2464caa19e8 | **漏折的重複 RG（簡報二、1）＋ 組內同碟撞卡** | **slice 的第 10、11 兩筆是同一張碟**：本筆轄下只有 **2679be6c（1975 DE，`status` = `Promotion`，單片 12" Vinyl 6 軌，catno `BN-LA459-H2-0798`）**，那是兩片裝的**第一片宣傳單張**；另一筆 `22e8e17e` 轄下兩個 release（US `fc8c5564`、DE `32ecf28d`）都是 Official、都是 **6＋5 軌的完整兩片裝**，catno 就是 `BN-LA459-H2`。**留完整版、退宣傳片。** 依據：(1) 先例——c-143 b 第 691 條就是「同一張碟建成兩個 RG 一律留一個」；(2) 可逆——退的是卡單一列，不動卡池結構。⚠ **與第 691 條相反的地方**：那一例兩個 RG 用了兩個不同盤名（`Lee Morgan` vs `The Last Session`），`chk-prop` 折不出同一鍵、跨組檢查失效；**本例兩個 RG 的掛名與盤名完全相同，`chk-prop` 的「跨組重複」會亮燈**——這是同一種資料病灶在檢查工具上的兩種相反表現，**「chk-prop 抓得到」不等於「這種錯不存在」，反過來也一樣。** |
| 2 | Betty Carter《Finally》1975（CDP 7953332） | 08298531-968d-357a-ad7b-85a5ddd3b57a | **第 313 條判準表 (c)：他廠（Roulette）原盤，1985 前無 BN 目錄號** | 列舉檔已在 `note` 標「BN 首發 1991，原盤 1975 可能他廠（再發）」，本層覆核成立。**MB 轄下兩筆：259919d0（1975 US 12" Vinyl 10 軌，Roulette Jazz／ROU 1024）與 88884a9b（1991 US CD 10 軌，Blue Note CDP 7953332＋Roulette Jazz CDP 7953332）**——**Blue Note 的關聯始於 1991 年的 CD，原盤與 Blue Note 無關。** Discogs `artist=Betty Carter, release_title=Finally` 回 14 筆：美國原盤是 **Roulette SR 5000（1975）**，另有 **Bush Records FR-907**（Carter 自營廠牌形狀、無年）與 Joy Records 一筆，英國是 Roulette ROU 1024（1975），日本 YQ-7523-RO（1975）；**沒有一筆 1985 年前的 Blue Note 號**。錄音是 1969-12-06 紐約 Judson Hall 的現場（Discogs 盤標印 Judson Hall／Club Ruby／Bell Sound Studios）。1975 年 Roulette 是 Morris Levy 的獨立廠牌、Blue Note 屬 United Artists，**兩家公司，套不上判準表 (b)**；EMI 要到 1989 年才買下 Roulette 目錄，才有 1991 年那張 Roulette Jazz／Blue Note 雙掛的 CD。與 c-143 a 第 661 條退表 #1《Soul Sugar》（Capitol）、#2《Soul Of The Bible》（Capitol）、c-142 a 第 600 條退表 #1《The Worm》（Solid State）同形。⚠ 若日後開 Roulette／Betty Carter 線，rgMbid 已釘；CAA RG 層 3 圖（來源是 1991 CD 88884a9b）；**池中已有 `Betty Carter` 4 張**（seed《The Audience with Betty Carter》《The Modern Sound of Betty Carter》《Look What I Got!》＋與 Ray Charles 的合輯掛名），**掛名字串沿用 `Betty Carter`**。**Billboard 1971-10→1976-12 共 273 期與 Cash Box 268 期查無本張的評介、廣告或榜位。** |

## 第 752 條（同批，新立）：**1975–76 的「Blue Note Re-Issue Series」有兩種完全不同的內容物，只看系列名與 `-H2` 尾碼一定判錯**

c-143 b 第 696／703 條給後批的指示是「**1975 年起的 `-H2` 幾乎全是舊料雙唱片重編，看到要照第 312 條退進 §5.6**」。
**本層實測：那句話對一半——系列是同一個，內容物卻分兩種，而且兩種在同一波裡並存。**

本層自抓的紙本把這個系列的形狀完整還原出來（**三份廠牌檔期文件，第 612／695 條的最上位證據**）：

1. **Billboard 1975-02-22「Blue Note Will Repackage Its Jazz Treasures」**：「Nine titles will be released to start the Blue Note Reissue Series, two-disk sets listing at **$7.98**」，點名 Sonny Rollins、Horace Silver、Freddie Hubbard、Chick Corea、Herbie Hancock、Jimmy Smith。
   → 對上 jazzdisco 的 **BN-LA356／392／393／394／395／399／400／401／402-H2**（1975-02-15 第一波九套）。
2. **Billboard 1975-05-31「Blue Note Schedules 100 Vintage Reissues」**（John Sippel）：「The first Blue Note Reissue series **Feb. 15** of nine twofer LPs at $7.95 each has been successful ... **Nine more will bow June 15.** Ornette Coleman, Sam Rivers, **Andrew Hill**, Lester Young, Gil Evans, **Jackie McLean**, Paul Chambers, John Coltrane and Cecil Taylor headline the new batch ... **Forty sets will come between September and January.**」
   → 對上 **BN-LA451／453／456／457／458／459／461-H2**（1975-06-15 第二波）。
3. **Billboard 1975-06-28 p25 的整版圖文廣告**與 **Cash Box 1975-06-07 的廠牌新聞稿**，逐張印出第二波的內容說明。

**關鍵在那兩段廣告文案本身**：
- **Jackie McLean《Jacknife》BN-LA457-H2 → 「Two previously unreleased sessions ...」**
- **Andrew Hill《One for One》BN-LA459-H2 → 「three previously unreleased ... Includes a unique combination of jazz quartet coupled with string quartet」**
- **Sam Rivers《Involution》BN-LA453-H2 → 「two previously unreleased sessions」**
- 對照組：**Lester Young《The Aladdin Sessions》→「For the first time, the complete Aladdin combo recordings in one package」**、
  **Cecil Taylor《In Transition》→「The Transition and United Artists albums ... brought together for the first time」**、
  **Gil Evans《Pacific Standard Time》→「Two long unavailable World Pacific classics」**、
  **Chambers／Coltrane《High Step》→「two ... plus a newly discovered session」**。

→ **同一波九套裡，四套是「從未發行的庫存首發」、五套是「舊盤重編」。**
**判準（立為本條）：`-H2` 一律回查 jazzdisco 的 session 區塊＋當期的廠牌廣告文案，**
**看到「previously unreleased」就是庫存首發、`releaseType` 維持 Album、依第 694 條 `year` 取首次商業發行年；**
**看到「brought together」「complete ... in one package」「long unavailable」才是重編，才照第 312 條退進 §5.6。**
**不看目錄號尾碼、不看系列名、不看軌數。**（第 696 條的判準「看 matrix 是否連號」在本段仍然有效，但**庫存盤的 matrix 本來就不連號**——三場錄音三段 matrix——所以 matrix 只能證「是不是同一場」，不能證「是不是合輯」。）

**本組四筆 `-H2` 全部判為庫存首發、全部收**：
| 盤 | 目錄號 | 錄音 | 首發 | 佐證 |
|---|---|---|---|---|
| Jackie McLean《Jacknife》 | BN-LA457-H2 | 1965-09-24（原配 BLP 4223，未發）＋1966-04-18（原配 BLP 4236，未發） | 1975-06 | BB 1975-06-28 廣告「Two previously unreleased sessions」；jazzdisco 註「not released」×2；MB `secondary-types` 空；Discogs 4 筆無一標 Compilation |
| Andrew Hill《One for One》 | BN-LA459-H2 | 1965-02-10＋1969-08-01＋1970-01-16／23 | 1975-06 | BB 1975-06-28 廣告＋CB 1975-06-07 新聞稿「three previously unreleased sessions」 |
| McCoy Tyner《Cosmos》 | BN-LA460-H2 | 1968-11-22＋1969-04-04＋1970-07-21 | **1976-07**（第 753 條） | 維基「full album only available on ... Mosaic Select 25」；Discogs 5 筆無一標 Compilation |
| Elvin Jones《The Prime Element》 | BN-LA506-H2 | 1969-03-14＋1973-07-24／26 | 1976 | 維基「originally released in 1976 as part of the *Blue Note Re-issue Series*」；1973 那四軌要到 1998 年才另組成 CD《At This Point in Time》 |

⚠ **另兩張不是 `-H2` 卻也是延遲發行**：Jimmy Witherspoon《Spoonful》（BN-LA534-G，1973-05 錄、1975-12-29 發，壓了兩年半）與 Moacir Santos《Saudade》（1974-03 錄、1974-09 發，正常）。
**Spoonful 是「正規新片線上的延遲」不是庫存重編**——它掛 `-G` 單片號、走 UA 的 12 月新片檔期、Cash Box 稱它是「LP debut on Blue Note」。

## 第 753 條（同批）：**唯一一張資料庫打架的年份：McCoy Tyner《Cosmos》——jazzdisco 記 1975，實際 1976 年 7 月；「同一次配號的九套裡有一套掉隊」是 BN-LA 段的新形狀**

enum 與 MB 給 1976，**jazzdisco 的 BN-LA 目錄頁給 1975**。本層取 **1976**，理由四條：
1. **Discogs `catno=BN-LA460-H2` 回 5 筆美國原壓，全部標 1976**，沒有一筆 1975（四筆的盤標印「The Blue Note Re-Issue Series」）。
2. **維基 infobox「released ... July 1976」直引 Billboard。**
3. **Billboard 1976-05-22 的廠牌報導**：「**July has been declared *Blue Note Month* by UA** and during that period the company will release the next batch of reissue recordings (**Elvin Jones, Thelonius Monk, Art Pepper, McCoy Tyner** and others)」——**第 612 條的廠牌檔期文件。**
4. **Billboard 1976-07-24 p14「LP SERIES REVIEW：Pianists Monk And Tyner Pace Blue Note Reissues」**：「the first five albums in a series of jazz reissues ... **will go into the stores this week**」，正文逐張評 Monk 的 32 軌（BN-LA579-H2）、**Tyner 的八軌「Song For My Lady」「Forbidden Land」「Cosmos」**、Art Pepper 的 23 軌（BN-LA591-H2）。

**為什麼 jazzdisco 會錯**：它把 BN-LA45x–46x 整段當成同一批配號。**但號是 1975 年 2 月一次配完的，上市卻分了兩年**——
LA451／453／456／457／458／459／461 在 **1975-06-15** 出，**LA460 掉隊、隔了十三個月才在 1976-07 出**（同批的 LA474-H2《The Trio Sides》jazzdisco 也記 1976，形狀相同）。

→ **這是第 663 條「BN-LA 的號序不代表發行序」在 1975–76 段的新形狀**：
1972–73 那一段的病灶是**盤面 ℗© 年早於上市年**（整群提前一年）；
**1975–76 這一段的病灶不是年份偏移，是「同一次配號的一批貨分兩年出」**——
**號段相鄰、年份相差一年以上，而且兩邊都對。**
**判準**：BN-LA 的 `-H2` 看到 jazzdisco 與 Discogs／MB 差一年時，**先查那一年的「Blue Note Month／Reissue Series 第 N 波」廠牌報導**，
**以「哪一波」定年，不要以「哪一段號」定年。**

⚠ **與此相對，本組其餘 20 張的年份全部四邊一致**（MB／jazzdisco／Discogs／維基），**沒有一張需要改判**——
第 692 條「1971 年之後 jazzdisco 的 BN-LA 年份欄可信度高」在 1974–76 段續證（21 張錯 1 張），
**但第 612 條「預設每張都要查紙本」仍然要守**：本組 21 張裡有 **19 張**查到了紙本，**紙本反過來坐實了資料庫**（第 755 條）。

## 第 754 條（同批）：**掛名——新掛名 3 位、群組收攏 0；第 307 條預警兩筆，其中一筆是「維基條目講的是另一個團」**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `Waters`（credit 字串）／MB 實體名 **`The Waters`**（48da3588 Group，US，disambiguation「family vocal group from Los Angeles」） | **`Waters`**（**新掛名**） | 池中零張；盤面與 **Billboard 1975-03-29 評介、1975-04-19 價目表都印「WATERS」**，Discogs 作「Waters*」（星號是它自己的消歧後綴）。第 307 條取盤面與 credit 的寫法，MB 實體名進 queryAlias。可逆 |
| `John Lee`（e128630e Person，US，1952-06-28，「jazz bassist」）＋` & `＋`Gerry Brown`（b6526fb3 Person，US，1951-11-09，「drummer」） | **`John Lee & Gerry Brown`**（**新掛名 ×2**） | 池中 `John Lee` 的 10 筆全是 John Lee Hooker、`Gerry Brown` 0 筆。取 MB credit 的 `&` 形；紙本三種寫法（Cash Box「John Lee and Gerry Brown」、Billboard「Bassist John Lee and drummer Gerry Brown」、Cash Box 1976-01-17 誤植「Jerry Brown」）全進 queryAlias |
| 其餘 18 張 | **全部沿用池中既有字串** | Bobby Hutcherson／Ronnie Foster／Bobbi Humphrey／Moacir Santos（c-143 a 第 665 條新立）／Alphonse Mouzon／Horace Silver（第 665 條）／Andrew Hill／Carmen McRae／Chico Hamilton／Jimmy Witherspoon／Gene Harris（c-143 b 第 697 條）／Jackie McLean／McCoy Tyner／Elvin Jones |

⚠ **第 307 條預警 #1（危險的那一種）**：**維基的 `Waters (band)` 條目講的是 2011 年成軍的美／挪威獨立搖滾團（Van Pierszalowski，Vagrant／TBD Records），不是本卡的洛杉磯合聲家族。**
MB `artist:"Waters"` 反查同時回 **2a424b05「WATERS」（Group，San Francisco，life-span begin 2011）** 與本卡的 48da3588，另有三個 Person（DJ 二人組的一半 60523456、波士頓歌手 3033e7bf、波哥大錄音師 50f818a3）。
**核 `type`／`area`／`life-span` 才分得開，`score` 完全沒用**（2a424b05 的 score 71 比本卡的 65 還高）。
**日後任何 `Waters` 進池一定要帶消歧；寫作層查生平務必認 48da3588 那家人**（Julia Tillman Waters／Maxine Willard Waters／Luther Waters／Oren Waters）。

⚠ **第 307 條預警 #2**：MB `artist:"John Lee"` 反查回 **20 個以上同字串實體**——
dd84cbed（US country blues singer and guitarist，1915–1977）、87ec8192（英國演員）、c2c3f1d6（jazz guitarist）、59cdd326（drums, Jazz）、b9b83fe8（澳洲鼓手）……
**池中那 10 張 `John Lee Hooker` 與本卡無關**；Discogs 用「John Lee (3)」消歧。
**c-144 b 的《Still Can't Say Enough》（BN-LA701-G，1976）必須用同一個字串 `John Lee & Gerry Brown`**——
`audits/pool-artist-name-splits.md` 記過六組 `&`／`and` 分裂，這是第七組的預防。

⚠ **本組沒有任何一筆需要群組收攏**：Horace Silver 兩張的 MB RG credit 就是 `Horace Silver`（**沒有出現 Quintet／Sextet 的群組實體**，與 c-141 a 第 573 條、c-142 a 第 603 條、c-143 a 第 665 條那幾張不同）；
Gene Harris 一張照 c-143 b 第 697 條第 2 點的現狀維持，**1958–69 的 `The Three Sounds` 15 列不與 1972 年後的 `Gene Harris` 合併**，本層不推翻。

## 第 755 條（同批）：**盤名三則裁定**

1. **Ronnie Foster BN-LA250-G 改判《Live at Montreux》**（MB RG 題是《Cookin' With Blue Note at Montreux》）。
   依據第 666 條「與姊妹卡一致」為第一判準：
   - **Discogs `catno=BN-LA250-G` 兩筆美國原壓的 title 欄都是「Ronnie Foster - Live At Montreux」**；
   - **jazzdisco BN-LA250-G 記「Ronnie Foster - Live At Montreux」**（LA249／251／252 四張全部如此）；
   - 「Cookin' With Blue Note At Montreux」在 Discogs 四張的條目裡登在 **label 欄**，是**系列名不是盤名**；
   - **池中同夜的兩張姊妹卡（c-143 b 收的 Hutcherson BN-LA249-G、Marlena Shaw BN-LA251-G）用的就是《Live at Montreux》。**
   可逆，rgMbid 未動。
   ⚠ **queryAlias 裡那個系列名會撞到另一張碟**：維基 `Live: Cookin' with Blue Note at Montreux` 條目講的是
   **Donald Byrd 同一晚的錄音、2022-12-09 才首度發行的那張**；Apple 與 Spotify 把四張的串流版**全部**改題成系列名
   （Bobbi Humphrey 那張在 Apple 也叫「Live: Cookin' With Blue Note at Montreux」）——**店面比對務必連掛名帶 catno。**
2. **Horace Silver 兩張取小寫 `n`：`Silver 'n Brass`、`Silver 'n Wood`**（ASCII 直引號）。
   MB 一張作 `Silver 'n Brass`（小寫）、一張作 `Silver 'N Wood`（大寫），jazzdisco 與 Discogs 多數作大寫 N，Discogs 另有一筆用彎引號 `Silver ‘N Brass`。
   依第 307 條照池中既有寫法：**池中 seed 的第五部就叫 `Silver 'n Strings Play the Music of the Spheres`**（小寫 n、ASCII 撇號），
   第 666 條「同一套的卡必須同一種命名法」。**五部曲＝Brass(1975)／Wood(1976)／Voices(1977)／Percussion(1978)／Strings(1979)。**
   → **給 c-144 b：列舉檔的《Silver'n Percussion》（BN-LA 853-H，中間沒有空格）請改成 `Silver 'n Percussion`。** 可逆。
3. **jazzdisco 把 BN-LA581-G 的盤名記成「Silver 'N Woods」（多一個 s）**——MB／Discogs 九筆／維基／Billboard 1976-03-06 的評介四邊都沒有那個 s，**判 jazzdisco 錯**。

## 第 756 條（同批，**紙本入庫**）：**本層自抓 Billboard 與 Cash Box 1975-10-04→1976-12-25 各 64 期，兩刊至此 1955→1976 底無缺口**

| 檔案 | 來源 | 實際涵蓋 | 備註 |
|---|---|---|---|
| `batch-progress/enum/billboard-bn-1975q4-1976-ocr.txt`（9.0 MB） | Billboard | **1975-10-04 → 1976-12-25，65 期中 64 期的命中頁** | c-144 a 掃；缺 1976-07-03（三種檔名形狀皆 404，**重試過**） |
| `batch-progress/enum/cashbox-bn-1975q4-1976-ocr.txt`（5.1 MB） | Cash Box | **1975-10-04 → 1976-12-25，65 期中 64 期的命中頁** | c-144 a 掃；缺 1976-07-03（兩種形狀皆 404，**重試過**） |

- **檔名形狀（第 701 條的續測）**：**1975 Q4 與 1976 全年，Billboard 是 `Billboard%20YYYY-MM-DD.pdf`、Cash Box 是 `CB-YYYY-MM-DD.pdf`，兩刊各自單一形狀、全年不換。**
  抓取器仍然對 Billboard 試三種（`Billboard%20`／`BB-`／`Billboard-`）、對 Cash Box 試兩種（`CB-`／`Cash-Box-`），**實測 128 期沒有一期落到備援形狀上**——
  第 701 條「1971–75 會在同一年裡換形狀」的亂象**到 1975 Q4 就結束了**。
- **1976-07-03 兩刊同時 404**：Billboard 三種形狀、Cash Box 兩種形狀各試兩輪都 404，**判為該週兩刊都沒有出刊（美國國慶兩百週年週末）**，不是檔名問題。
- 關鍵字＝本組 **21 個目錄號**（BN-LA250／252／257／260／369／370／398／406／425／457／459／460／462／463／506／519／520／534／541／581／584，含 `BN-LA`／`BNLA`／`BN LA` 與 8 軌帶號 `BN-EA` 五種前綴通配）
  ＋**21 個盤名**＋**17 個人名**＋廠牌詞 `blue note`。**「blue note」是通配關鍵字，所以 1975-10→1976-12 任何提到 Blue Note 的頁都在裡面**——
  查別的 Blue Note 碟大致夠用（c-144 b 的 1976 年份直接可用），**查 1977 以後或非 Blue Note 的碟仍須重抓。**
- 每期以 `######## BB-YYYY-MM-DD pages=N`／`######## CB-YYYY-MM-DD pages=N` 分隔，頁內以 `===== PAGE n =====` 分隔，
  **頁內文字已先 `' '.join(text.split())` 把換行摺成空白**（第 636 條），可直接跑跨行片語的正則。
- 兩刊 1970 年代 PDF 都有文字層，`pymupdf` 直接讀；四路並行跑 130 期約 20 分鐘（每期 10–15 MB）。

## 第 757 條（同批）：**1975–76 這一段最有用的四種紙本欄位（給 c-144 b 與後批）**

1. **廠牌自家的「Reissue Series 第 N 波」報導**（第 752 條）——**這一段唯一能把 `-H2` 的年份與內容物同時定下來的東西**。
   已抓到四份：BB 1975-02-22、BB 1975-05-31、CB 1975-06-07、**BB 1976-05-22（「July has been declared Blue Note Month」）**。
2. **整版圖文廣告**：**BB 1975-06-28 p25 是本段最密的一份**——一版同時印出 Horace Silver《Silver 'n Brass》、Marlena Shaw《Who Is This Bitch, Anyway?》、
   Ronnie Foster《Cheshire Cat》、Ronnie Laws《Pressure Sensitive》、Moacir Santos《Carnival of the Spirits》、Carmen McRae《I Am Music》、
   Bobbi Humphrey《Satin Doll》、Bobby Hutcherson《Linger Lane》、Alphonse Mouzon《Mind Transplant》、Donald Byrd《Stepping Into Tomorrow》
   **十張的曲目，外加 Re-Issue Series 七套的說明文**。**本組 21 張裡有 6 張靠這一版定年。**
   另有 **CB 1975-11-15 p52**（Chico Hamilton《Peregrinations》＋Gene Harris《Nexus》整版，©MCMLXXV）與 **CB 1974-10-05 p19**（「NEW BLUE — For September」，含 Saudade BN-LA260-G）。
   ⚠ **一份廣告釘多張，不是多個獨立來源**（第 509c／614 條）——本層四次遇到，已逐卡在 risk 標明。
3. **⚠ 檔期廣告 ≠ 上市**：**Ronnie Foster《Cheshire Cat》在 BB 1975-06-28 的廣告裡，評介與價目表卻要到 8 月、上榜要到 9-27**；
   **John Lee & Gerry Brown《Mango Sunrise》在 CB 1975-08-30 被預告「will be released next month」，實際排到 12-29 才發**。
   → **第 612 條的檔期文件給的是「已排定」不是「已上市」**；`year` 用它沒問題，**但正文不得把發行月寫死。**
4. **Billboard 的兩張榜**：本組 21 張裡 **9 張進過 Best Selling Jazz LP's**（Silver 'n Brass 連七週最久、Linger Lane、I Am Music、Cheshire Cat、Nexus、Silver 'n Wood、The Man Incognito、Waters 的評介週、Peregrinations），
   **只有 2 張進過 Soul LPs**：**Jimmy Witherspoon《Spoonful》1976-02-21／02-28／03-06 連三週**（**而且它爵士榜反而沒進**）與 **Carmen McRae《I Am Music》1975-09-20**。
   → **派工信與 c-143 a 第 669 條的提醒在本段只成立 2/21**：1974–76 的 Blue Note 雖然全面做 R&B／disco 的音樂，**銷量仍然主要反映在爵士榜上**；
   **真正只在 Soul 榜出現的是藍調歌手那一張**，不是 crossover 那幾張。**c-144 b 的 1977–79 段（Ronnie Laws、Earl Klugh、Noel Pointer、Donald Byrd）要重測，不要照搬本條。**

## 第 758 條（同批）：**店面與封面觀察（第 254 條，只寫觀察不寫結論）**

- **CAA 17/21 有圖，4 張 RG 層 HTTP 404、零圖**（皆已 `redirect: 'follow'` ＋重試三次確認是真 404，第 589a 條第 2 點）：
  **Horace Silver《Silver 'n Brass》、Moacir Santos《Carnival of the Spirits》、Jimmy Witherspoon《Spoonful》、Elvin Jones《The Prime Element》**——
  四張都建議從 Discogs 的美國原壓條目取圖。
- **17 張有圖的裡面，13 張的來源就是原盤**；**4 張不是**：
  Mind Transplant→2003 CD（a9e42b91）、Nexus→2003 歐洲 CD（efd1cb4a）、Jacknife→2002 CD（62c49439）、
  **Saudade→b2383830（MB 標成 1974 GB、但 barcode 是 1990 年代形狀的那筆英國壓，第 759 條）**。
- **Apple us `search` 一種查法 21 張命中 18 張**。沒命中的三張：**`Waters —《Waters》`**（回的全是 Curtis Waters、Girl Named Tom 等同字串近年單曲）、
  **`Andrew Hill —《One for One》`**（回 Hillsong Instrumentals）、**`John Lee & Gerry Brown —《Mango Sunrise》`**（零命中）。
- **命中的 18 張裡 17 張軌數等於原盤**；唯一對不上的是 **Jacknife（5 軌＝2002 年單片 CD 形，原盤是 10 軌兩片裝）**。
- ⚠ **`releaseDate` 只有 2 張與紙本對得上**（第 484 條在本組再中一次）：
  **Bobbi Humphrey《Live at Montreux》1974-05-22（與維基同日）**、**Gene Harris《Nexus》1975-12-23（評介 10 月、上榜 1976-01）**。
  其餘 16 張是年頭佔位或錄音年，**三張特別離譜**：
  **Ronnie Foster《Live at Montreux》1973-01-01（＝錄音年）**、
  **Bobby Hutcherson《Linger Lane》1974-01-01（既不是錄音年 1975-01-16 也不是上市年）**、
  **McCoy Tyner《Cosmos》1977-08-01（比紙本的 1976-07 晚一年）**。
- **Apple 端的重複上架 1 組**：Alphonse Mouzon《The Man Incognito》回 **1442968393 與 1471058404** 兩筆同名同軌數同日期的條目。
- **`genres` 分派**：`['jazz']` **10 張**（後咆勃、庫存首發雙唱片、巴西大樂團、組曲盤、歐陸 fusion）、
  `['jazz','soul']` **9 張**（現場 groove、人聲盤、crossover、disco 向）、
  **`['jazz','blues']` 1 張**（Jimmy Witherspoon《Spoonful》，照池中 seed《Evenin' Blues》的既有組合）、
  **`['jazz','rock']` 1 張**（Alphonse Mouzon《Mind Transplant》，見第 763 條）。

## 第 759 條（同批）：**資料庫與紙本的錯誤清單（21 筆裡查出 17 處）**

**MB**（欄位錯與漏建）：
- **漏建美國原盤 4 張**：Ronnie Foster《Live at Montreux》（只有德國 BST 84 457 I）、Bobbi Humphrey《Live at Montreux》（只有德國 BST 84 459 I）、
  **Moacir Santos《Saudade》（完全沒有 BN-LA260-G）**、Alphonse Mouzon《The Man Incognito》（日本 CD 未建）。
  → **列舉檔的 `catno`／`countries`／`formats`／`nReleases` 四欄照抄 MB，在這四張上全部失真**（第 664 條第 4 種形狀）。
- **年份與 barcode 不相容 1 筆**：《Saudade》的 b2383830 登「1974 GB」卻帶 **barcode 724382720614**（＝7243 8 27206 1 4，1990 年代 EMI 形狀）；
  jazzdisco 只註「also released on Blue Note (E) 8 27206 1」、沒給年。**第 567 條，判 MB 的日期錯。**
- **catno 打錯 1 筆**：《Cirrus》2021 日本 CD（b24cbdfd）的 label-info 把原盤號登成「**BN-LA1257-G**」（多一個 1）；Discogs 該號反查 0 筆、`BN-LA257-G` 回 6 筆。
- **曲名錯 4 處**：《One for One》德國壓把第二軌打成「**Didddy Wah**」（三個 d，美國壓作 Diddy Wah）；
  《Silver 'n Wood》A4「**Perserverance** And Endurance」（盤面 Perseverance）；
  《Carnival of the Spirits》B3「Route Infinitry」與 jazzdisco 的「Route」對不上；
  《Nexus》A3「Koko and Lee Roe」與 jazzdisco「Koko And Lee Moe」、維基「Koko and Leeroe」**三種寫法互不相同**。
- **欄位缺漏 4 處**：《Cirrus》原盤 release **五軌全部沒有軌長**；《Saudade》原盤 release 同樣無軌長；
  《Silver 'n Wood》2012 日本 CD（b389a316）**`status` 是空的**；《Nexus》2013 日本 CD（1f0de0b2）**barcode 空**；
  《I Am Music》2013 日本 CD（a629a8a2）**label-info 整個空著**。
- **catno 寫法不一致 1 筆**：《Spoonful》原盤登「**BN LA 534 G**」（空格版），Discogs 五筆原壓都作 `BN-LA534-G`。
- **重複建檔 2 組**（只報不擋）：《Cheshire Cat》RG 底下 **b8038169 與 ea140209**（後者 format 空、catno 空、同為 1975 US 6 軌）；
  《Jacknife》的 2002 美／英兩筆 CD **同號同 barcode 724354053528**。

**jazzdisco**（第 470 條：年份欄這一段很準，**盤名與曲名欄照樣錯**）：
- **年份錯 1 處**：BN-LA460-H2《Cosmos》記 1975，實際 1976-07（第 753 條）。**21 張裡就錯這一張。**
- **盤名錯 2 處**：BN-LA581-G 記「Silver 'N **Woods**」（多一個 s）；BN-LA250-G／252-G 的系列名與盤名處理與 Discogs 一致、**沒有錯**（錯的是 MB）。
- **曲名錯 4 處**：BN-LA369-G 記「**MTU**」（正確 NTU，**Billboard 1975-06-28 的廠牌廣告印得清清楚楚**）；
  BN-LA406-G 記「**Mysticizm**」（正確 Mysticism，同一版廣告印 MYSTICISM）；
  BN-LA398-G 記「Snowbound」（盤面 Snow Bound）；BN-LA260-G 記「Happily-Happy」「The City Of L.A.」與 MB 的「Happy-Happy」「The City Of LA」不同。

**紙本**（第 509c 條，同一段內誤植四處）：
- Cash Box 1975-03-29 把《Mind Transplant》的號印成「**BNLA 3986**」（真號 BN-LA398-G）。
- Cash Box 1975-10-18 把《Peregrinations》的號印成「**BNLA 52Q-G**」、盤名印成「**Pereginations**」。
- Billboard 1975-08-09 把《Cheshire Cat》的價目表條目印成「**IShm Now 8NLA425G**」。
- Cash Box 1976-01-17 把 Gerry Brown 印成「**Jerry Brown**」；Billboard 1975-03-29 把《Linger Lane》印成「**LINGERLANE, Bluenote**」。
→ **靠編制／軌數／曲目交叉定位，不要只信印出來的號與名**（c-143 b 第 698 條的結論在本段續證）。

## 第 760 條（同批）：**四張同盤名的卡，`chk-prop` 一張都不會亮燈——第 611 條盲區在本批的兩種新樣本**

1. **《Live at Montreux》四張**：池中已有 `Bobby Hutcherson —《Live at Montreux》`（c-143 b）與 `Marlena Shaw —《Live at Montreux》`（c-143 b），
   本批再加 `Ronnie Foster` 與 `Bobbi Humphrey` 兩張。**同一晚、同一場音樂節、同一個製作人、同一個系列封套、同一個盤名，四個完全不同的樂團。**
   `chk-prop` 的鍵是「掛名＋盤名」，四張折出四個不同鍵，**跨批與線上池檢查全部回 0**。
   → **正文絕不得把四張寫成同一張碟，也不得互抄班底。**（第五張——Donald Byrd 那一晚的錄音——2022 年才首度發行，不在任何批次的清單裡。）
2. **《Cosmos》兩張**：池中已有 `Lou Donaldson —《Cosmos》`（BST 84376，1971，c-143 b 收），本批加 `McCoy Tyner —《Cosmos》`（BN-LA460-H2，1976）。
   **同廠牌、同盤名、差五年、不同人**，`chk-prop` 同樣不亮燈。
3. 另兩筆低風險的同字串：`Waters —《Waters》`（`selfTitled: true`，池中 `album` 含 Waters 的 8 列全是 Muddy Waters 一類）、
   `Carmen McRae —《I Am Music》`（維基同名消歧義頁底下有 Lil Wayne 2023、Prince Kaybee 2017 兩張同名專輯，池中 0 列）。
→ **四組都已寫進各卡 risk：店面查詢與上架比對一律連掛名帶 catno。**

## 第 761 條（同批）：**`chk-prop` 這一次抓得到——但那不代表這種錯變少了**

第 751 條退表 #1（Andrew Hill 的重複 RG）**兩個 RG 的掛名與盤名完全相同**，
所以 `chk-prop` 的「跨組重複」在本層第一次跑 21+1 筆時**會亮燈**；
而 c-143 b 第 691 條那一例（Lee Morgan `Lee Morgan` ←→ `The Last Session`）**兩個盤名不同、折不出同一鍵，完全不亮燈**。

**同一種資料病灶（MB 把一張碟建成兩個 RG）在檢查工具上有兩種相反的表現。**
→ **不要把「chk-prop 標記 0」讀成「沒有重複 RG」**（第 611 條的第四種形狀）；
**每一批的 slice 都要自己把同掛名同盤名、以及同 catno 不同盤名的兩種情形各掃一遍。**
本層實際做法：把 23 筆的 `catno` 陣列攤平互比，**一眼看到 BN-LA459-H2 出現兩次**——這比比對盤名可靠。

## 第 762 條（同批）：**Waters 四兄妹是本批四張卡的交叉點——寫作層的互指清單**

**Julia Tillman Waters／Maxine Willard Waters／Luther Waters／Oren Waters** 是 1970 年代洛杉磯最忙的合聲家族，
**本批有四張卡與他們有關，而且是四種不同的身分**：
| 卡 | 他們的身分 | 錄音 |
|---|---|---|
| `Waters —《Waters》`（BN-LA370-G） | **主角**（唯一一張以團名發行的專輯） | 1974-10／11，Music Recorders, LA |
| `Bobby Hutcherson —《Linger Lane》`（BN-LA369-G） | 合聲 | 1975-01-16，Idyllwild 戶外 |
| `Gene Harris —《Nexus》`（BN-LA519-G） | 合聲（Julia 與 Maxine 兩位） | 1975-05／06，Music Recorders, LA |
| `Chico Hamilton —《Peregrinations》`（BN-LA520-G） | 合聲（overdub 層，四位全到） | 1975-08，Sound Factory West, LA |
**三張的製作／編曲都是 Jerry Peters ＋ Keg Johnson 那一組**（《Nexus》多一位 Jim Shifflett），
**但四張的錄音日、錄音室、核心樂團完全不同**——**正文不得把四張寫成同一個企劃、不得把他們寫成任何一位領班的樂團成員。**
四卡的 risk 已互指。

## 第 763 條（同批）：**`genres` 破例一次：Alphonse Mouzon《Mind Transplant》用 `['jazz','rock']`**

第 700 條把這條線的曲風定成 `['jazz']` 與 `['jazz','soul']` 兩形，九批以來沒有例外。**本層破了一次。**
理由：**Cash Box 1975-03-29 的評介原文就是「it is a progressive rock record of the highest quality. The music revolves around the guitar and Mouzon's drums」**，
編制是 **Tommy Bolin（隔年進 Deep Purple）＋Lee Ritenour＋Jay Graydon 三把電吉他**、八軌全是器樂 jazz-rock。
**判準三條都過**：有先例（`rock` 是 dip 合法曲風、池中大量使用）、可逆（改的是卡單值）、卡住整條線（不決定就得把它塞進 `['jazz']`，與實際內容不符）。
⚠ **這一條不擴張**：同一位藝人的《The Man Incognito》（1976）是 disco crossover，仍用 `['jazz','soul']`；
**c-144 b 的 Robby Krieger《Robby Krieger & Friends》（BN-LA664-H，1977）形狀更極端，請 b 組自行判、不必照搬本條。**

## 第 764 條（同批）：**交件數字、中間檔、給 c-144 b 與後批**

- **交件 21 張、16 位；退 2**（第 751 條）；**年份改判 0**（但推翻 jazzdisco 1 張，第 753 條）；`label` 改他廠 0；
  新掛名 3 位、群組收攏 0；現場 2（皆 `secondary-types` 有 Live ✓）、庫存／延遲發行 5（第 752 條）；
  合輯 0（`-H2` 四筆全部覆核為庫存首發，**沒有一筆進 §5.6**）；CAA 17/21、店面 18/21。
- `chk-prop a`：**21 張 16 位、標記 0**；跨批 108 批 4,427 張撞卡 0、同 rgMbid 不同掛名 0。
- `why` 均長 **538**／`risk` **1,123**／`mbNote` **1,002** 字元（`c141/prop-b` 為 556／933／784 —— risk 與 mbNote 都超過範本）。
- 中間檔 `scratchpad/c144a/`：`mb-fetch.mjs`＋`mb.json`（23 個 RG 的 rg／rel／caa 回傳）、`mbsum.mjs`／`mbsum.txt`、
  `poolscan.mjs`／`poolscan.txt`／`poolrows.json`（實掃全文，18,256 列＝seed 16,450 ＋ 44 個 `c1*` 卡單檔）、
  `web/bnla.html`／`bnla.txt`（jazzdisco BN-LA 系列全頁）、`dg.mjs`＋`discogs/`（23 個 catno 反查）、
  `wiki.mjs`＋`wiki.json`（31 查 26 中的原始 wikitext）、`art.mjs`／`art2.mjs`（第 307 條同名反查）、
  `apple.mjs`／`apple.json`、`np.py`（四支 shard 的抓取器，含 `.done` 續跑檔）、`srch.py`（命中頁檢索工具）、
  `b1.mjs`～`b4.mjs`（卡單產生，每 5–6 張寫回磁碟一次）。
- **給 c-144 b（後 22 筆，1976–79）**：
  1. **紙本的 1976 年份直接可用**：`billboard-bn-1975q4-1976-ocr.txt` 與 `cashbox-bn-1975q4-1976-ocr.txt` 已入庫，
     **關鍵字含通配的 `blue note`，所以 1975-10→1976-12 任何提到 Blue Note 的頁都在裡面**——你們 1976 年那 9 張（LA596／606／615／628／634／635／636／667／701）大概率查得到。
     **1977–79 完全沒有人掃，要自己抓**；檔名形狀是 `Billboard%20YYYY-MM-DD.pdf` 與 `CB-YYYY-MM-DD.pdf`（第 756 條），**但仍要三種／兩種都試**（第 614／701 條）。
  2. **`-H2`／`-J2` 不要照第 696／703 條直接退**：本層第 752 條把判準改掉了——**看廠牌廣告文案裡有沒有「previously unreleased」**。
     你們清單裡的 **BN-LA473-J2《Live Messengers》（Art Blakey，1978）** 與 **BN-LA882-J2《Circulus》（Chick Corea，1978）** 與 **《Hipnosis》（Jackie McLean，1978）** 三筆都要逐張查。
  3. **盤名**：`Silver 'n Percussion`（不是列舉檔的 `Silver'n Percussion`），照第 755 條第 2 點。
  4. **掛名**：`John Lee & Gerry Brown` 必須與本組同字串（第 754 條）；`Earl Klugh`／`Ronnie Laws`／`Noel Pointer`／`Eddie Henderson` 池中有沒有字串請先實掃。
  5. **Soul LPs 榜要重測**：本組 21 張只有 2 張進過（第 757 條第 4 點），**但你們那一段（Ronnie Laws《Fever》、Earl Klugh、Donald Byrd《Chant》）才是真正的 R&B 榜商品**，不要照搬本組的結論。
  6. **本組已預約的互指**：`Bobby Hutcherson —《Cirrus》` ↔ 池中《Live at Montreux》（同一支樂團的錄音室與現場）；
     `Alphonse Mouzon —《The Man Incognito》` ↔ 池中 seed《Virtue》（1977，你們不收但可接續）；
     `Horace Silver —《Silver 'n Wood》` ↔ 你們的《Silver 'n Percussion》↔ 池中 seed《Silver 'n Strings...》（五部曲）；
     `Gene Harris —《Nexus》` ↔ 你們的《In a Special Way》（BN-LA634-G）；
     `John Lee & Gerry Brown —《Mango Sunrise》` ↔ 你們的《Still Can't Say Enough》（BN-LA701-G）；
     `Carmen McRae —《I Am Music》` ↔ 你們的《Can't Hide Love》（BN-LA635-G）；
     `Bobby Hutcherson —《Linger Lane》` ↔ 你們的《Waiting》（BN-LA615-G）與《The View From the Inside》（BN-LA710-G）。
- **給後批（1979 後與 LT 系列）**：
  1. **1979 年後 Blue Note 進入休眠期**，LT 系列（1979–81 的庫存盤）的 `year` 一律取首次商業發行年、`risk` 寫明錄音年（派工信已定），**判準照本層第 752 條：看廠牌文案是不是 previously unreleased。**
  2. **第 753 條的「同一次配號分兩年出」要繼續當預設**：BN-LA 的號段相鄰不代表同月上市，**以「哪一波檔期」定年，不要以「哪一段號」定年。**
