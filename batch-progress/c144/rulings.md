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

---

# c-144 裁定（b 組，Blue Note 1976–79 第二段，編號 780–809）

策展層 b 組，2026-09-16。交件 `batch-progress/c144/prop-b.json`（`g: "b"`），
`node batch-progress/c144/chk-prop.mjs b` **標記 0**（欄位 0、線上池撞卡 0、跨組 0、
跨批撞卡 0／108 批 4,448 張、同 rgMbid 不同掛名 0）。
22 筆的 `mbNote` 第一個 UUID 全數等於 enum 的 `rgMbid`、**22 個 rgMbid 各用一次**，欄位鍵與 `c141/prop-b.json` 完全一致。

## 第 780 條（c-144 b 組交件）：**22 筆 → 收 22、退 0；年份改判 0；盤名改判 3 張；掛名收攏 2 張、新掛名 4 位**

- **收 22 張、16 位**（Bobby Hutcherson 3、Earl Klugh 3、Gene Harris 2、Jackie McLean 2，其餘 12 位各 1）。
- **退 0**（第 781 條說明為什麼這一批一張都不必退）。**第 315 條：prop 22 ＋ 退表 0 ＝ 22 ✓。**
- **年份**：22 張的 `year` **全部維持 enum 值，一張都沒改**。但推翻了**三個**單一來源：
  jazzdisco 的 LNJ-80118＝1976（實際 1977，第 786 條）、**維基的 Silver 'n Percussion＝1977（實際 1978，第 785 條）**、
  jazzdisco 的 BN-LA628-**H** 尾碼（實際 -G，第 787 條）。
- **`releaseType`**：22 張全是 Album，**合輯 0**；**1978 年那一波三筆雙唱片（`-J2`×2 ＋ 日本單片）全部覆核為庫存首發、不走 §5.6**（第 782 條）；
  **1979 年的 LT 系列同樣不走 §5.6**（第 783 條）。
- **`label` 改他廠 0**（22 張全是 Blue Note 自家原盤，含兩張日本首發）。
- **掛名**：**新掛名 4 位**（`Earl Klugh`、`Robby Krieger`、`Willie Bobo`、`Noel Pointer`），
  **群組收攏 2 張**（兩張 Jackie McLean，第 784 條），其餘 16 張沿用池中既有字串；**自行合併 0、新造分裂 0**。
- **現場 1 張**（Art Blakey《Live Messengers》，MB `secondary-types` 有 Live ✓）；**庫存／延遲發行 5 張**（第 782／783 條）。
- **CAA 17/22 有圖**，其中 12 張的來源是美國原壓、2 張是同年的加／瑞壓、3 張是後來的日本 CD；**5 張 RG 層 404、零圖**（第 788 條）。
- **店面命中 17/22**（第 788 條）。
- **紙本**：本層自抓 **Billboard 1977-01-08→1979-12-29 共 153 期、Cash Box 1977-01-01→1979-12-29 共 157 期**收進 repo（第 789 條）。
- `why` 均長 **578**／`risk` **1,004**／`mbNote` **947** 字元（`c141/prop-b` 為 556／933／784）。

## 第 781 條（同批）：**退表 0 筆——這一批為什麼一張都不必退，以及四個「看起來該退卻不該退」的位置**

c-143 b 退 1、c-144 a 退 2，本組退 0。**不是沒查，是四個候選逐一被證偽**：

| 候選 | 為什麼看起來該退 | 為什麼不退 |
|---|---|---|
| Art Blakey《Live Messengers》BN-LA473-J2 | `-J2` 雙唱片、**號段屬 1975 年 2 月那一批**、Billboard 的標題寫「UA **Reissues** Blue Note Masters」 | **同一篇正文與 Cash Box 評介都寫 previously unreleased／all performances are new to LP**（第 782 條） |
| Chick Corea《Circulus》BN-LA882-J2 | `-J2` 雙唱片、1970 年錄音、掛名與實際演出團體（Circle）不符 | 同上；且 MB `secondary-types` 空、Discogs 五筆無一標 Compilation |
| Jackie McLean《Hipnosis》 | **Discogs 把美版 BN-LA483-J2 的 format 標成 `Compilation`** | **Billboard 1978-11-11 p98 原文「has not previously been issued」**；本卡釘的是**日本單片**（只收 1967 那五軌），更不可能是合輯（第 782 條） |
| Jackie McLean《The Jackie McLean Quintet》LNJ-80118 | 與上一列是**同一套美國雙唱片的另一半**，形狀像 c-143 b 第 691 條那種「同碟兩個 RG」 | **兩張零軌重複**（1962-06-14 六軌 vs 1967-02-03 五軌），是兩場完全不同的錄音；日本本來就拆成兩張單片先後發行，依簡報 §6「Volume 拆盤各算一張」收兩張（第 784 條） |

⚠ **這四筆全部落在「第 312 條該退」與「第 752 條該收」的交界上**——**判準只有一條：回查當期廠牌文案裡有沒有 previously unreleased**，
**不看目錄號尾碼、不看系列名、不看軌數、不看 Discogs 的 format 欄、也不看報導標題用的是不是 reissue。**

## 第 782 條（同批，**第 752 條在 1978 年這一波的續證，並加強一格**）：**「標題寫 reissue、內容物是庫存首發」——第 752 條的判準要連報導標題一起排除**

c-144 a 第 752 條立的判準是「看廠牌廣告文案有沒有 previously unreleased」。**本層取得 1978 年那一波的完整文件，證明這條判準必須再擋一層：連報導的標題都不能信。**

**Billboard 1978-11-11 p18「ALBUM SERIES REVIEW — UA Reissues Blue Note Masters In 5 New Albums」**（Dave Dexter Jr. 署名，續頁 p98）：
> 「Chick Corea, Stanley Turrentine, Jackie McLean, Art Blakey and Lee Morgan are the jazzmen featured in United Artists' **reissue** of well-remembered masters originally taped for the Blue Note label. The five packages, generously annotated, are **all two-LP presentations**...」

**標題與導言連用兩次 reissue，但同一篇的逐張說明全部是庫存首發**：
- Lee Morgan《The Procrastinator》→「**None has been issued previously.**」
- Stanley Turrentine《Jubilee Shouts》→「offers 11 tunes, **previously unreleased**, dating from 1961-62 sessions」
- Jackie McLean《Hipnosis》→（p98）「Taped in 1962 and 1967, **'Hipnosis' has not previously been issued.** Alfred Lion was the original producer. **Michael Cuscuna and Charlie Lourie made the new series possible.**」
- Art Blakey《Live Messengers》→「nine tracks taped live in 1954, 1961 and 1962. The bonus is the presence of the late Clifford Brown's trumpet on the fourth LP side」
- Chick Corea《Circulus》→「Corea's five tracks, recorded in 1970 in New York」（**沒有任何 brought together／long unavailable 字樣**）

**佐證（第二個獨立來源）**：**Cash Box 1978-10-14 p42 的《Live Messengers》評介**——
「Knockout stuff by two of Blakey's very best groups and **all performances are new to LP**.」

→ **第 752 條補一句（本條）：判準的否定清單要加上「報導／系列的標題」。**
1975 年那一波的病灶是系列名叫 Re-Issue Series 而內容物分兩種；
**1978 年這一波更進一步——整篇報導的標題就是 reissue，內容物卻五套全部是未發行母帶。**
**判準仍然只有一條：讀逐張的文案，不讀標題。**
（歷史脈絡：Michael Cuscuna 與 Charlie Lourie 1975 年起替 Blue Note 整理母帶，1978 年這一波與 1979 年的 LT 系列是同一條線；
**Cash Box 1977-08-20 p27 記「Donald Byrd, the new director of that soon-to-be 40-year-old jazz label」**——本組《Chant》的發行正好在他任內。）

**本組三筆的判定**：
| 盤 | 目錄號 | 錄音 | 首發 | 判定 |
|---|---|---|---|---|
| Art Blakey《Live Messengers》 | BN-LA473-J2（2LP，9 軌） | 1954-02-21 Birdland ＋ 1961-08-17 Village Gate ＋ 1962-03-18 The Renaissance | **1978** | Album，`live: true`，`secondary-types` 有 Live ✓ |
| Chick Corea《Circulus》 | BN-LA882-J2（2LP，5 軌） | 1970-04-08 ＋ 1970-08-19 ＋ 1970-08-21 A&R Studios | **1978** | Album |
| Jackie McLean《Hipnosis》 | 日本單片 GXF 3022／ST-83022（5 軌）；美版 BN-LA483-J2（2LP，11 軌） | 1967-02-03 Van Gelder | **1978** | Album（**推翻 Discogs 的 Compilation 標記**） |

## 第 783 條（同批，新立）：**LT 系列（1979 起）＝「Back to Blue Note」企劃，整段適用第 752 條的 previously-unreleased 判準；本層取得該企劃的兩份紙本**

派工信與 c-144 a 第 764 條都預告「1979 年後的 LT 系列 `year` 取首次商業發行年」。**本層把那一波的廠牌文件找齊了**：

1. **Cash Box 1979-09-15 p41**：「〔Capitol/UA〕a marketing campaign in support of its famed Blue Note catalog. The program, called **'Back to Blue Note,'** will focus on **10 albums culled from never-before-released masters produced by Michael Cuscuna**. Among the titles are: 'Sonic Boom' by Lee Morgan, 'The Soothsayer' by Wayne Shorter, 'Club House' by Dexter Gordon, **'Chant' by Donald Byrd**, 'Solid' by Grant Green, 'Confirmation' by Jimmy Smith, 'New Time Shuffle' by Stanley Turrentine, 'Consequences' by Jackie McLean, 'A Slice Of The Top' by Hank Mobley and Bobby Hutcheson's 'Spiral.' The campaign... runs through the end of the year」
2. **Cash Box 1979-11-10 p15**：同一波的續報，十張全名逐一列出，並註「Originally produced by Blue Note owner **Alfred Lion**, the LPs have been attractively packaged and beautifully produced by **Michael Cuscuna**」。

→ **判定**：LT 系列**不是**第 312 條的舊料重編，是庫存首發；`releaseType` 維持 Album、`year` 取首次商業發行年（1979 起）、錄音年只寫正文。
⚠ **一則檔期文件釘十張，不是十個獨立來源**（第 509c／614 條）——後批做到 LT-1001 以後那幾十張時，**這兩則只能各算一份**。
⚠ **給後批的名單**：上面那十張裡，**《Spiral》(Bobby Hutcherson)、《Consequences》(Jackie McLean)、《Sonic Boom》(Lee Morgan)、《The Soothsayer》(Wayne Shorter)、《Club House》(Dexter Gordon)、《Solid》(Grant Green)、《Confirmation》(Jimmy Smith)、《New Time Shuffle》(Stanley Turrentine)、《A Slice of the Top》(Hank Mobley)** 九張本批沒有，年份可直接用 1979。

## 第 784 條（同批）：**掛名——新掛名 4 位、群組收攏 2 張；第 611 條「群組掛名 vs 個人掛名」在同一批裡中了兩次**

| MB artist-credit | 卡上掛名 | 依據 |
|---|---|---|
| `Earl Klugh`（5c44b1b8 Person US 1953-09-16） | **`Earl Klugh`**（**新掛名**，本組 3 張同字串） | 池中 0 列。第 307 條同名撞擊核過：MB `artist:"Earl Klugh"` 只回本人與 `Earl Klugh Trio`（b3fb7437 Group）、`Bob James And Earl Klugh`，**無異人同名**，不必帶消歧 |
| `Robby Krieger`（b553f0ad Person US 1946-01-08，disambiguation「American guitarist, member of The Doors」） | **`Robby Krieger`**（**新掛名**） | 池中 0 列（`The Doors` 7 列是另一個掛名，不合併）。⚠ **盤面、Discogs 四筆、維基條目、jazzdisco 全部作 `Robbie Krieger`**；MB `artist:"Robbie Krieger"` 反查 **0 筆**。裁定見第 785 條 |
| `Willie Bobo`（dadec058 Person US 1934-02-28） | **`Willie Bobo`**（**新掛名**） | 池中 0 列。MB 只回本人與 `Willie Bobo & The Bo Gents`（3503549a Group GB），無異人同名 |
| `Noel Pointer`（7cf8a532 Person US 1954-12-26） | **`Noel Pointer`**（**新掛名**） | 池中 0 列。MB `artist:"Noel Pointer"` **只回一筆** |
| `Jackie McLean`（RG a0d48d4a 的 credit 字串） | **`Jackie McLean`**（池中 16 列） | 直接一致 |
| **`Jackie McLean Quintet`（RG 15de86ae 的 credit 字串，實體卻是 5b6993ef＝Jackie McLean Person）** | **`Jackie McLean`**（**群組收攏**） | ⚠ **第 611 條盲區**：MB 另有獨立的 Group 實體 **`Jackie McLean Quintet`（8ed76c7c，US，life-span begin 1956）**，**本 RG 用的不是它**，只是在 Person 上掛了一個 credited-as 字串。列舉檔照抄 credit 字串，所以 `slice.json` 的 `artist` 是 `Jackie McLean Quintet`——**卡上必須收攏成池中既有的 `Jackie McLean`，絕不新造分裂** |
| `Art Blakey`（601e7466 Person US 1919-10-11） | **`Art Blakey`**（池中 6 列） | MB RG credit 與 Discogs 唯一一筆條目都是 `Art Blakey`。⚠ 池中另有 `Art Blakey and the Jazz Messengers`／`& The Jazz Messengers` **23 列**，MB 也有 `Art Blakey & The Jazz Messengers`（209ddf15 Group US 1954）等六個團體實體——**兩個字串池中並存已久，本卡照 credit 取 Person 形，不合併、不推翻** |
| 其餘 14 張 | **全部沿用池中既有字串** | Marlena Shaw／Bobby Hutcherson／Gene Harris／Carmen McRae／`John Lee & Gerry Brown`（**與 c-144 a 第 754 條同字串**）／Eddie Henderson／Ronnie Laws／Horace Silver／Chick Corea／Donald Byrd |

⚠ **第 307 條預警（本批最危險的一筆）**：**《The Jackie McLean Quintet》是同名兩張碟**。
Discogs `artist=Jackie McLean, release_title=The Jackie McLean Quintet` 回 **19 筆，其中十七筆是 1957 年 Ad Lib AL 6601／Jubilee 1064 的另一張同名盤**
（Mono，Donald Byrd 參與，日本再發 UPS-511-J／1972、YW-7561-RO／1977、35C38-7218／1984、TOCJ-5360、UCCQ-5005／2014……）。
**本卡是 Blue Note LNJ-80118（1977 JP，Stereo，1962-06-14 錄音，原定 BLP 4116）**，與那張毫無關係。
⚠ 更麻煩的一層：**2002 年那筆日本 CD 的廠牌名是「Ad Lib Records」（TOCJ-9428）**——那是東芝的復刻副廠，**與 1957 年那張的原廠 Ad Lib Records 同名不同公司**，不得據此改判原盤廠牌。
**店面與紙本比對一律連 `LNJ-80118`／`ST-84116` 與 Stereo 標示。**

⚠ **`Chick Corea` 沒有收攏成 `Circle`**：《Circulus》的演出團體是 Circle（Corea／Braxton／Holland／Altschul），維基 infobox 甚至掛了兩條 chronology，
但盤面與 MB credit 都是 `Chick Corea`，池中 `Chick Corea` 7 列——照第 307 條取池中形，**Braxton／Holland／Altschul 寫進正文**。

## 第 785 條（同批）：**盤名三則改判**

1. **`Silver 'n Percussion`（小寫 n ＋ ASCII 直引號 ＋ 兩側空格），不是列舉檔的 `Silver'n Percussion`**——**執行 c-144 a 第 755 條第 2 點的指示**。
   依據：**MB 的 release 題本來就有空格**（RG 題才是無空格的那個）、池中 seed 第五部叫 `Silver 'n Strings Play the Music of the Spheres`、
   c-144 a 已把前兩部統一成 `Silver 'n Brass`／`Silver 'n Wood`——第 666 條「同一套的卡必須同一種命名法」。
   **五部曲至此：Brass(1975，c-144 a)／Wood(1976，c-144 a)／Voices(1977，BN-LA708-G，尚未有人收)／Percussion(1978，本組)／Strings(1979，池中 seed)。**
   ⚠ **給後批：Phase 3《Silver 'n Voices》BN-LA708-G 是這套唯一的缺口**，jazzdisco 記 1977（錄音 1976-09-24 ＋ overdub 1976-10-19／22）。
2. **`Tone Tantrum`（單數），推翻 jazzdisco 的「Tone Tantrums」**。
   MB／Discogs 八筆／維基／**Cash Box 1977-08-27 p26 評介標頭「TONE TANTRUM - Gene Harris - Blue Note LA760」**四邊都是單數。
   與 c-144 a 第 755 條第 3 點的「Silver 'N **Woods**」同形——**第 470 條：jazzdisco 在 BN-LA 段年份欄準、盤名欄照樣多加 s。**
3. **`Robby Krieger & Friends`（不是盤面的 `Robbie Krieger & Friends`）**，掛名 `Robby Krieger`。
   ⚠ **這一則與前兩則方向相反：這次是「推翻盤面」。** 盤面／Discogs 四筆／維基條目名／jazzdisco 都作 `Robbie`，
   MB 的 artist 實體、MB RG 題、**Cash Box 1977-06-04 p23 評介標頭「ROBBY KRIEGER & FRIENDS - Robby Krieger」**、1991 Capitol CD 都作 `Robby`；
   **MB `artist:"Robbie Krieger"` 反查 0 筆。**
   判準兩條：(a) **第 45 條「取現行流通名」**——他四十年來的通行寫法是 Robby；
   (b) **第 666 條「同一張卡的掛名與盤名必須同一種拼法」**——掛 `Robby Krieger` 卻題《Robbie Krieger & Friends》，卡面自相矛盾。
   **盤面拼法進 queryAlias 與 risk。可逆。**

## 第 786 條（同批）：**年份——22 張改判 0，但推翻了三個單一來源；「日本首發盤」是這條線的新年份形狀**

**22 張的 `year` 全部維持 enum 值。** 三處單一來源被推翻：

| 盤 | 被推翻的來源 | 取值依據 |
|---|---|---|
| 《The Jackie McLean Quintet》LNJ-80118 | **jazzdisco 的 Toshiba EMI 頁記 1976** | MB frd 1977 ＋ **Discogs 日本原壓兩筆（正盤與宣傳盤）皆 1977** ＋ 列舉檔 1977，三比一取 **1977** |
| 《Silver 'n Percussion》BN-LA853-H | **維基 infobox 記 1977** | 錄音 1977-11-12→11-30（**十一月底才疊完人聲**）＋ MB frd 1978 ＋ jazzdisco 1978 ＋ Discogs 六筆全 1978 ＋ **Cash Box 1978-03-11 p16「Horace Silver's latest Blue Note」** ＋ **Billboard 1978-04-08 p80 價目表**，五比一取 **1978** |
| 《Fever》 | **jazzdisco 的目錄號尾碼 BN-LA628-H** | MB／Discogs 十三筆／Billboard 三次都是 `BN-LA628-**G**`；**Discogs `catno=BN-LA628-H` 反查 0 筆**（第 787 條） |

⚠ **新形狀：「日本首發、美國隔年才發」**。
本組兩張 Jackie McLean 的卡都是**日本先發、美國後發**——LNJ-80118（1977 JP）與 GXF 3022（1978 JP），
美國要到 1978 年才以 BN-LA483-J2 一次發完。**`year` 取的是全世界的首次商業發行年（第 694 條），所以這兩張的年份由日本盤決定，不由美國盤決定。**
→ **給後批：1976–81 的東芝 EMI LNJ-80100／King GXF-3000 兩個系列裡有大量「日本首發的 Blue Note 庫存盤」**，
**jazzdisco 的 toshiba-king 頁只列了 GXF-3023 以後**（本組的 GXF 3022 那一條**它沒有**），**年份要靠 Discogs ＋ 維基補**。

⚠ **第 753 條的「同一次配號分兩年出」在本組拉到三年**：
**BN-LA473-J2《Live Messengers》的號屬於 1975 年 2 月一次配完的那一批**（同段的 LA474-H2《The Trio Sides》jazzdisco 記 1976、LA483-J2《Hipnosis》記 1978），
**本張要到 1978 年 10–11 月才上市。號段相鄰、年份差三年，兩邊都對。**
→ **第 753 條的判準在 BN-LA 高號段仍然成立且更強：以「哪一波檔期」定年，不要以「哪一段號」定年。**

## 第 787 條（同批）：**資料庫與紙本的錯誤清單（22 筆裡查出 26 處）**

**MB**（欄位錯與漏建）：
- **漏建美國原盤 1 張**：**《Silver 'n Percussion》MB 只建了加拿大壓（10ffb6c1，country `CA`，catno 登成「BN-LA **853**-H」中間多空格）**，Discogs 的三筆美國原壓一筆都沒有
  → **列舉檔的 `country: "CA"`／`countries: ["CA"]` 因此把一張美國盤標成加拿大盤**（第 664 條第 4 種形狀的最極端一例）。
- **目錄號整個空著 1 筆**：《Hipnosis》的 61338441（1978 JP）**label-info 只有「Blue Note」、catalog-number 空**——列舉檔的 `catno: []` 就是照抄這個空值（Discogs 補為 GXF 3022、維基作 ST-83022）。
- **欄位缺漏 7 處**：《Living Inside Your Love》b4e85e1d **date 欄空**；《Fever》dcf3b7e1 **date 空＋catno 空**；《Robby Krieger & Friends》aede5100 **country／catno／barcode 三空**；
  《Tone Tantrum》70caf52e **barcode 空**；《Can't Hide Love》2a7133d5 **label-info 整個空**；《Heritage》d2cba1ce **catno 空**；《Silver 'n Percussion》1634ad55 **date／country／label-info 全空**；《Chant》902a449a **country 空、catno 登成「[none]」**。
- **曲名錯 6 處**：**《Silver 'n Percussion》六軌中三軌把 Ascension 拼成「Ascencion」**；《Live Messengers》〈**Weet Dot**〉應為 Wee-Dot、〈**Its** Only a Paper Moon〉缺撇號；
  《Heritage》〈Acuphuncture〉／〈Dr. Mganga〉與 jazzdisco 的 Acupuncture／Dr. Manga 打架；《Living Inside Your Love》〈Captain **Caribė**〉帶重音符而盤面無。
- **漏建各國同年壓片 8 張以上**：Shaw（加／祕／澳）、Klugh 三張（菲／新馬港／加／英 UAG 20009／南非）、Heritage（加＋2025 全球再壓）、Fever（加／新／JP GP-3126）、
  Phantazia（加＋1993 CD＋TOCJ-50519）、In a Special Way（加＋兩張日本 CD）、Knucklebean（1978 JP GP 3137）、Circulus（**日本 GXF 3026／3027 與法國兩號的拆片版全缺**）。

**jazzdisco**（第 470 條：BN-LA 段年份欄準，其他欄照樣錯）：
- **年份錯 1 處**：LNJ-80118 記 1976（實際 1977，第 786 條）。**BN-LA 段 20 張的年份欄一張都沒錯。**
- **目錄號錯 1 處**：BN-LA628-**H**（實際 -G）。
- **盤名錯 2 處**：「Tone Tantrum**s**」（多 s）；「The View From Inside」（**少一個 the**）。
- **曲名錯 4 處**：「Keep On **Waling**」（少 k，應為 Walking）、「**Wicky** Tobacky」（MB 作 Wacky）、「Spare Change**s**」（多 s）、「Keep Your **Eyes** On The Sparrow」（複數）。
- **整條缺 1 處**：**Toshiba／King 頁沒有 GXF-3022**（該頁從 GXF-3023 起列），《Hipnosis》的日本號查不到。

**紙本**（第 509c 條，本組五處）：
- **Billboard 1976-07-10／07-24 的爵士榜把《Just a Matter of Time》印成「IT'S JUST A MATTER OF TIME」**（多 It's，連續兩週同一錯）。
- Billboard 1976-12-11 把《In a Special Way》印成「In A Special **Wry**」、目錄號印成「**891A6346**」。
- Billboard 1976-08-21 把《Waiting》印成「**Wai ti n'**」。
- **Billboard 1978-04-08 把 BN-LA853-H 印成「BNLA**B**53H」**（8→B）；1977-11-26 把 BN-LA736-H 印成「BN LA736**.0**」、1977-07-30 印成「**ON**-LA7368」。
- Cash Box 1976-11-06 把 BN-LA628-G 印成「**BNLA 828Q**」、1976-10-30 印成「BNLA 667**.**G」。

**維基**：
- **年份錯 1 處**：《Silver 'n Percussion》infobox 1977（第 786 條）。
- **姊妹頁互相打架 1 處**：《Waiting》條目的 `next_year` 把《The View From the Inside》標成 1976，**該頁自己的 infobox 寫 1977**。
- **目錄號錯 1 處**：《Hipnosis》infobox 作「BN-LA 483-**H2**」，jazzdisco 與 Discogs 都是 **-J2**。
- ⚠ **`Phantazia` 條目講的是 Marvel 漫畫《X-Force》#6（1992）的變種人 Eileen Harsaw**，不是本盤；`Phantazia (album)` 與 `Phantazia (Noel Pointer album)` 兩個條目名都不存在
  ——**c-144 a 第 754 條 `Waters (band)` 那種陷阱的第二例，寫作層不得引用。**

**Discogs**：
- **format 欄錯 1 處**：把 BN-LA483-J2《Hipnosis》標成 `Compilation`，**被 Billboard 1978-11-11 p98 的原文推翻**（第 782 條）。
- **同名混流 1 處**：`release_title=The Jackie McLean Quintet` 回的 19 筆裡十七筆是 1957 年 Ad Lib／Jubilee 那張（第 784 條）。

## 第 788 條（同批）：**店面與封面觀察（第 254 條，只寫觀察不寫結論）**

- **CAA 17/22 有圖，5 張 RG 層 HTTP 404、零圖**（皆 `redirect: 'follow'` ＋重試三次確認是真 404，第 589a 條第 2 點）：
  **Gene Harris《In a Special Way》、Willie Bobo《Tomorrow Is Here》、Noel Pointer《Phantazia》、Jackie McLean《The Jackie McLean Quintet》、Jackie McLean《Hipnosis》**
  ——前三張建議取 Discogs 美國原壓條目；後兩張只能取日本原壓條目，**且《Hipnosis》的日、美兩版封面完全不同**（維基載明日版「with a different cover」）。
- **17 張有圖的裡面，12 張的來源是美國原壓**；**5 張不是**：
  《Silver 'n Percussion》→1978 **加拿大**壓（10ffb6c1）、《Circulus》→1978 **瑞士**壓（e3e46d82）、
  《Can't Hide Love》→2012 日本 CD、《Still Can't Say Enough》→2013 日本 CD、《Tone Tantrum》→2013 日本 CD。
- **Apple us `search` 一種查法 22 張命中 17 張**。沒命中的五張：**`John Lee & Gerry Brown —《Still Can't Say Enough》`**（與 c-144 a 的《Mango Sunrise》同樣零命中）、
  **`Robby Krieger —《Robby Krieger & Friends》`**（回的八筆全是 The Doors）、**`Jackie McLean —《The Jackie McLean Quintet》`**（回他盤）、
  **`Art Blakey —《Live Messengers》`**（回《Moanin'》等）、**`Jackie McLean —《Hipnosis》`**（零命中）。
- **命中的 17 張裡 15 張軌數等於原盤**；兩張對不上的都是 **Earl Klugh**：《Earl Klugh》回 11 軌（＝2005 歐版 CD，原盤 8 軌）、《Living Inside Your Love》回 8 軌（＝2005 歐版，原盤 7 軌）。
- ⚠ **`releaseDate` 只有 2 張與紙本對得上**（第 484 條在本組再中一次）：
  **《Circulus》1978-11-01**（與 Billboard 1978-11-11 的報導同月）與 **《The View From the Inside》1977-11-01**（同季）。
  其餘 15 張是年頭佔位或偏移，**三張特別值得記**：
  **《Silver 'n Percussion》1977-01-01（＝維基那個被推翻的錯年，第 786 條）**、
  **《Tone Tantrum》1977-12-13（比 MB 的 1977-05 與紙本的 8 月評介都晚半年）**、
  **《Tomorrow Is Here》1977-10-06（比 Billboard 1977-03-12 的評介晚七個月）**。
- **`genres` 分派**：`['jazz','soul']` **12 張**（人聲盤、crossover、disco 向、jazz-funk）、`['jazz']` **9 張**（樂團盤、庫存首發、自由即興、hard bop）、
  **`['jazz','rock']` 1 張**（Robby Krieger《Robby Krieger & Friends》，見第 790 條）。

## 第 789 條（同批，**紙本入庫**）：**本層自抓 Billboard 1977-01→1979-12 共 153 期、Cash Box 同區間 157 期，兩刊至此 1955→1979 底無缺口**

| 檔案 | 來源 | 實際涵蓋 | 備註 |
|---|---|---|---|
| `batch-progress/enum/billboard-bn-1977-1979-ocr.txt`（33.2 MB） | Billboard | **1977-01-08 → 1979-12-22，157 期中 153 期的命中頁** | c-144 b 掃；缺 **1977-01-01／1977-12-31／1978-12-30／1979-12-29** 四期 |
| `batch-progress/enum/cashbox-bn-1977-1979-ocr.txt`（24.4 MB） | Cash Box | **1977-01-01 → 1979-12-29，157 期全中的命中頁** | c-144 b 掃；**一期不缺** |

- **檔名形狀（第 756 條的續測，結論一致）**：**1977–1979 三年，Billboard 一律 `Billboard%20YYYY-MM-DD.pdf`、Cash Box 一律 `CB-YYYY-MM-DD.pdf`。**
  抓取器仍對 Billboard 試三種、對 Cash Box 試兩種，**實測 313 期沒有一期落到備援形狀上**——**第 701 條的「同一年裡換形狀」亂象確定只發生在 1971–75。**
- **Billboard 缺的四期全部落在年末／年初那一週，而且是完整的規律**：**1977-01-01、1977-12-31、1978-12-30、1979-12-29**——**三年裡每一個「該年最後一個週六」與「1977 年第一個週六」全缺，其餘 153 期一期不漏**。三種檔名形狀各試兩輪皆 404、**逐期重試過**。
  → **判為 Billboard 的年終雙數合刊那一週不出單期**（與第 756 條的 1976-07-03 是不同成因：那次是兩刊同週停刊，這次只有 Billboard）。**Cash Box 那四週全部有出刊、157 期一期不缺**——**缺期規律得這麼乾淨，本身就是「不是檔名問題」的證據**（第 614／701 條的反面用法）。
- 關鍵字＝本組的 **20 個目錄號**（BN-LA473／483／596／606／615／628／634／635／636／664／667／701／710／711／736／737／760／789／853／882，含 `BN-LA`／`BNLA`／`BN LA`／`BN-EA`／`BN-LT` 五種前綴通配 ＋ `LT-991`／`LT 991`／`LT991` ＋ `LNJ-80118`）
  ＋**24 個盤名**＋**15 個人名**＋廠牌詞 `blue note`。**「blue note」是通配關鍵字，1977-01→1979-12 任何提到 Blue Note 的頁都在裡面**——查別的 Blue Note 碟大致夠用，**查 1980 以後或非 Blue Note 的碟仍須重抓。**
- 每期以 `######## BB-YYYY-MM-DD pages=N`／`######## CB-YYYY-MM-DD pages=N` 分隔，頁內以 `===== PAGE n =====` 分隔，
  **頁內文字已先 `' '.join(text.split())` 把換行摺成空白**（第 636 條），可直接跑跨行片語的正則。
- 兩刊 1977–79 的 PDF 都有文字層，`pymupdf` 直接讀；**四路並行跑 313 期約 12 分鐘**（比 1975–76 段快，因為期均頁數少）。

## 第 790 條（同批）：**`genres` 破例第二次：Robby Krieger《Robby Krieger & Friends》用 `['jazz','rock']`——並把第 763 條的界線收窄**

c-144 a 第 763 條為 Alphonse Mouzon《Mind Transplant》破例一次，並聲明「不擴張，c-144 b 的 Robby Krieger 形狀更極端，請 b 組自行判」。**本層判 `['jazz','rock']`。**

理由四條：
1. **維基 infobox 的 genre 欄直接寫 `Jazz rock`**（第 763 條那張是靠 Cash Box 的評介文字才判出來的，本張連資料庫欄位都已經這樣寫）。
2. **Cash Box 1977-06-04 p23 的評介**：「The same Robby Krieger that played such a stellar guitar for the Doors is in the forefront of **a very hot little jazz/rock combo** which makes up for the lack of vocal statement with a mostly melodic but sometimes progressive fusion」。
3. **領班本身是搖滾樂團吉他手**（The Doors），池中 `The Doors` 7 列全在 `rock` 底下；八軌全是電吉他主導的器樂。
4. 三條判準都過：**有先例**（第 763 條）、**可逆**（改的是卡單值）、**卡住整條線**（不決定就得塞進 `['jazz']`，與內容不符）。

⚠ **界線收窄（本條的重點）**：第 763 條與本條加起來，這條線上破例的只有兩張，**兩張的共同條件是「領班或核心編制本身來自搖滾，而且有同期紙本用 rock 這個字評它」**。
**不符合這兩個條件的一律不破例**——本組的 Ronnie Laws《Fever》、Earl Klugh 三張、Noel Pointer《Phantazia》、Gene Harris 兩張雖然都是 crossover，**全部維持 `['jazz','soul']`**。

## 第 791 條（同批，**訂正 c-144 a 第 757 條第 4 點**）：**1976–79 的 Blue Note 確實以 R&B 榜為主戰場——a 組那條結論只適用 1974–76**

c-144 a 第 757 條第 4 點的結論是「1974–76 的 Blue Note 雖然全面做 R&B／disco 的音樂，銷量仍然主要反映在爵士榜上，21 張裡只有 2 張進 Soul 榜」，並要 b 組重測。**本層重測結果：a 組那條在 1976 年年中就開始失效，1977 年起完全翻轉。**

| 盤 | Billboard Soul LPs | Best Selling Jazz LP's | Top LPs & Tape（主榜） |
|---|---|---|---|
| Ronnie Laws《Fever》（1976） | **✓ 1976-08-14 #32、08-28 #32、09-11** | — | **✓ 1976-06-12 新進、07-17 #48、08-14 #49、08-28 #66、09-11 #67** |
| Marlena Shaw《Just a Matter of Time》（1976） | — | ✓ 1976-06-26 #25 新進、07-10、07-24 | — |
| Earl Klugh《Earl Klugh》（1976） | — | ✓ Cash Box 爵士榜 1976-07-10 #31→10-02（13 週） | — |
| Earl Klugh《Living Inside Your Love》（1976–77） | — | ✓ Cash Box 1976-10-30 新進→1977-04-02 | — |
| Bobby Hutcherson《Waiting》（1976） | — | ✓ 1976-10-09 | — |
| **Noel Pointer《Phantazia》（1977）** | **✓ 1977-07-02** | **✓ 07-09 #12→12-24 #28（29 週）** | **✓ 07-02 #175、07-23 #144** |
| **Earl Klugh《Finger Paintings》（1977）** | **✓ 1977-09-10 #47** | **✓ 07-23→12-24 #25** | **✓ 1977-07-23（前百名）** |
| **Gene Harris《Tone Tantrum》（1977）** | **✓ Cash Box R&B LP 1977-09-24 #48** | **✗ 沒進** | — |
| Robby Krieger《Robby Krieger & Friends》（1977） | — | ✓ Cash Box 1977-07-30 #35→08-06 #33 | — |

→ **判準（本條）**：**1976 年年中起的 Blue Note，查榜一律 Soul LPs 先、Jazz LP's 次、主榜也要看**（第 710 條第 2 點的「先查 Soul 榜」在這一段完全成立）。
**a 組第 757 條第 4 點的結論不得往 1977 以後套用；本條也不得往 1974–75 回推。**
⚠ **《Tone Tantrum》是本組唯一「只進 R&B 榜、爵士榜零」的一張**——與 c-144 a 的《Spoonful》同形狀但成因相反（那張是藍調歌手，這張是 disco 編制的爵士鋼琴家）。

## 第 792 條（同批）：**四組 `chk-prop` 抓不到的同名／同碟關係——第 611 條盲區在本批的四種樣本**

1. **《The Jackie McLean Quintet》↔《Hipnosis》**：**同一套美國雙唱片 BN-LA483-J2 的兩半**，日本拆成兩張單片先後發行（LNJ-80118／1977、GXF 3022／1978）。
   兩張零軌重複，`chk-prop` 折出兩個不同鍵、跨組與跨批全部回 0。**兩卡 risk 已互指。**
2. **《The Jackie McLean Quintet》↔ 1957 年 Ad Lib／Jubilee 1064 的同名盤**：**同掛名、同盤名、差二十年、完全不同的錄音**（第 784 條）。
   池中目前 0 列，但 **Ad Lib／Jubilee 線一旦開，這兩張會在 `chk-prop` 裡撞成同一鍵**——**後批收那張時必須在盤名上加消歧**（建議照 Discogs 的 `Jubilee 1064` 或錄音年）。
3. **《Chant》↔ 池中 seed 的 `The Monks of Santo Domingo de Silos —《Chant》`（1994）**：同盤名、不同掛名，`chk-prop` 不亮燈。
4. **《Fever》↔ 池中五張同名碟**（Kylie Minogue 2001、Tenor Saw 1985、Con Funk Shun 1983、Little Willie John 1956、Roy Ayers 1979）：**盤名 `Fever` 池中已有 5 列**，掛名各異。
   ⚠ **Roy Ayers 那張（1979）與本張同樣是爵士／放克脈絡**，店面查詢最容易撞。
   另《Waiting》池中有 Suzukiski 同名盤（1995）、《In a Special Way》有 DeBarge 同名盤（1983）。
→ **四組都已寫進各卡 risk：店面查詢與上架比對一律連掛名帶 catno。**

## 第 793 條（同批）：**Dave Grusin／Larry Rosen 這條線是本批五張卡的交叉點——寫作層的互指清單**

**Dave Grusin 與 Larry Rosen 1976–77 在 Blue Note 做的新人線，本批佔五張，而且五張互相客席**：

| 卡 | 他們的角色 | 錄音 |
|---|---|---|
| `Earl Klugh —《Earl Klugh》`（BN-LA596-G，1976） | 製作＋Grusin 彈鍵盤 | 1976-01-12／14，Kendun Recorders, Burbank |
| `Earl Klugh —《Living Inside Your Love》`（BN-LA667-G，1976） | 同上；**Noel Pointer 在弦樂組裡拉小提琴** | 1976-07-26／27，Electric Lady, NYC |
| `Noel Pointer —《Phantazia》`（BN-LA736-H，1977） | Grusin 製作、編曲兼鍵盤；**Earl Klugh 彈原聲吉他** | 1977-01-10→12，Camp Colomby Studio, New City, NY |
| `Earl Klugh —《Finger Paintings》`（BN-LA737-H，1977） | 同上；Tom Scott 編銅管 | 1977-02-15，Kendun Recorders |
| （旁證）`Gene Harris —《In a Special Way》` | **不是 Grusin 線**，是 Jerry Peters 線 | 1976-03／04，Total Experience Studios, LA |

**節奏組高度重疊**（Steve Gadd、Ralph MacDonald、Francisco Centeno、Will Lee、Harvey Mason），
**但四張的錄音日、錄音室、編曲規模完全不同**——**正文不得把四張寫成同一個企劃，也不得把 Klugh 與 Pointer 寫成對方樂團的成員**（兩人是互相客席）。
⚠ 另一條平行線：**Jerry Peters ＋ Total Experience Studios ＋ Waters 三兄妹**串起 c-144 a 的《Nexus》、本組的《In a Special Way》與《Tone Tantrum》三張
——**這是 c-144 a 第 762 條那張 Waters 互指表的第五、第六格。**

## 第 794 條（同批）：**Bobby Hutcherson 的舊金山三部曲——三張的班底斷點**

本組收的三張是同一支樂團的連續紀錄，**但每一張都換了人，正文不得互抄**：

| 卡 | 錄音 | 鋼琴 | 客席／額外 |
|---|---|---|---|
| 《Waiting》BN-LA615-G（1976） | 1976-02-24／25／26，Different Fur Studios | **George Cables** | Kenneth Nash 康加；〈Prime Thought〉加兩支長笛 |
| 《The View From the Inside》BN-LA710-G（1977） | 1976-08-04／05／06，Wally Heider Recording | **Larry Nash** | **無打擊、無客席**（三張裡最精簡） |
| 《Knucklebean》BN-LA789-H（1977） | 1977-03-01／02，Wally Heider Recording | **George Cables**（回歸） | **Freddie Hubbard 小號 ＋ Hadley Caliman 次中音與長笛** |

三張的固定班底是 Emanuel Boyd（薩克斯）、James Leary III（貝斯）、Eddie Marshall（鼓），製作全部是 **Dale Oehler**。
⚠ **《Knucklebean》的六軌領班一首都沒寫**（出自 Cables／Marshall／Leary），**〈Little B's Poem〉是他 1965 年《Components》那首曲子的重訪**
——池中 seed 的《Components》與《Montara》都有這首曲子的別的版本，**正文必須寫明是哪一次錄音**。
⚠ 往前接：c-144 a 的《Cirrus》（1974）、《Linger Lane》（1975）與 c-143 b 的《Live at Montreux》（1974）、池中 seed 的《Montara》（1975）。

## 第 795 條（同批）：**交件數字、中間檔、給後批**

- **交件 22 張、16 位；退 0**（第 781 條）；**年份改判 0**（但推翻單一來源 3 處，第 786 條）；`label` 改他廠 0；
  **新掛名 4 位、群組收攏 2 張**（第 784 條）；**盤名改判 3 張**（第 785 條）；現場 1（`secondary-types` 有 Live ✓）、庫存／延遲發行 5（第 782／783 條）；
  **合輯 0**（`-J2` 兩筆與日本單片一筆全部覆核為庫存首發、LT 系列一筆同樣，**沒有一筆進 §5.6**）；CAA 17/22、店面 17/22。
- `chk-prop b`：**22 張 16 位、標記 0**；跨批 108 批 4,448 張撞卡 0、同 rgMbid 不同掛名 0。
- `why` 均長 **578**／`risk` **1,004**／`mbNote` **947** 字元（`c141/prop-b` 為 556／933／784）。
- 中間檔 `scratchpad/c144b/`：`mb-fetch.mjs`＋`caa-retry.mjs`＋`mb.json`（22 個 RG 的 rg／rel／caa 回傳）、`mbsum.mjs`／`mbsum.txt`、
  `poolscan.mjs`／`poolscan.txt`（實掃 25,366 列＝seed 16,450 ＋ 182 個卡單檔 ＋ 各批 prop）、
  `web/catalog-bn-la-series.txt`／`catalog-lt-series.txt`／`catalog-toshiba-king-series.txt`（jazzdisco 三個系列全頁）、
  `dg.mjs`／`dg2.mjs`＋`discogs.json`／`discogs2.json`（26 個 catno ＋ 7 組 artist+title 反查）、
  `wiki.mjs`＋`wiki.json`（41 查 33 中的原始 wikitext）、`art.mjs`＋`artists.json`（第 307 條同名反查）、
  `apple.mjs`＋`apple.json`、`np.py`＋`np/`（四支 shard 的抓取器，含 `.done` 續跑檔）、`srch.py`（命中頁檢索工具）、
  `b1.mjs`～`b4.mjs`（卡單產生，**每 6／6／6／4 張寫回磁碟一次**）。
- **給後批（1979 後與 LT 系列、以及日本首發那一段）**：
  1. **LT 系列整段照第 783 條**：「Back to Blue Note」企劃＝never-before-released masters，`year` 取首次商業發行年、`releaseType` Album。
     **1979 年那十張的名單已列在第 783 條**，年份可直接用 1979。
  2. **第 782 條的判準要連標題一起排除**：`-H2`／`-J2`／LT 看到「reissue」字樣不代表是舊料重編，**讀逐張文案**。
  3. **`Silver 'n Voices`（BN-LA708-G，1977）是 Silver 五部曲唯一的缺口**，命名法照第 785 條第 1 點。
  4. **日本首發盤**：東芝 EMI LNJ-80100 與 King GXF-3000 兩個系列有大量 Blue Note 庫存盤的日本首發，
     **jazzdisco 的 toshiba-king 頁只從 GXF-3023 起列**（本組的 GXF 3022 它就沒有），年份要靠 Discogs ＋ 維基補（第 786 條）。
  5. **紙本 1977–79 已入庫**（第 789 條），關鍵字含通配 `blue note`；**1980 年起還沒有人掃。**
  6. **查榜順序照第 791 條**：Soul LPs 先、Jazz LP's 次、主榜也要看——**不要照搬 c-144 a 第 757 條第 4 點。**
  7. **本組已預約的互指**：`Jackie McLean —《The Jackie McLean Quintet》`↔`《Hipnosis》`（同一套美版 2LP 的兩半）；
     `Earl Klugh` 三張 ↔ `Noel Pointer —《Phantazia》`（Grusin 線互相客席，第 793 條）；
     `Bobby Hutcherson` 三張互指（第 794 條）；`Gene Harris —《In a Special Way》`↔`《Tone Tantrum》`↔ c-144 a 的《Nexus》；
     `Horace Silver —《Silver 'n Percussion》`↔ c-144 a 的《Silver 'n Brass》《Silver 'n Wood》↔ 池中 seed《Silver 'n Strings...》；
     `Chick Corea —《Circulus》`↔ 池中 seed《A.R.C.》（同一支三重奏，早九個月）↔ c-147 b《Early Circle》；
     `John Lee & Gerry Brown —《Still Can't Say Enough》`↔ c-144 a 的《Mango Sunrise》；
     `Carmen McRae —《Can't Hide Love》`↔ c-144 a 的《I Am Music》。

## 第 796 條（主線 2026-09-16，研究層 a 組交件後）：**年份疑議 0；研究層訂正前層五處，其中兩處是「前層說查無、其實有」**

a 組 21 筆全 `full`、**年份疑議 0**（策展層的判斷一張都沒被推翻）、`src` 100 個網址逐一驗過全 200。

**訂正前層五處**：
1. ⚠ **第 752 條寫「BB 1976-07-24 的評介沒有評到《The Prime Element》」是錯的**
   ——那則評介的「前五張」就含 Elvin Jones，原文
   「Elvin Jones' entry ... **have never before been released** although all were recorded in 1969 and 1973」。
   **那句話本身就是庫存首發的第三方背書**；只有「沒有榜位」那半句成立。
2. ⚠ **第 757 條第 4 點把《Waters》算進「9 張進過爵士榜」是算錯的**——1975 全年爵士榜與 Soul 榜逐週掃過，
   **《Waters》一次都沒進榜**，只有評介與價目表。
3. **《Cheshire Cat》的 George Benson 不只是側人**——Discogs 美國原壓 credit 是
   「George Benson - Producer, Backing Vocals」，**他製作了整張碟**（掛名不動，正文寫法要改）。
4. **《Cirrus》的〈Even Later〉不是 William Henderson 寫的**——Discogs 原壓作曲欄：
   〈Rosewood〉是 Woody Shaw、其餘四軌全是 Hutcherson。
5. **《I Am Music》的製作人只有 Roger Kellaway 一個**（五處來源一致），Grusin 與 Olson 是編曲配器指揮。
另：策展層說《Live at Montreux》(Bobbi Humphrey) 的〈Virtue〉與池中 seed《Virtue》無關
——**Discogs 原壓作曲欄是 Alphonse Mouzon，兩者同人同字**。

## 第 797 條（同日）：⚠ **第 756 條「1975Q4–1976 兩刊各自單一檔名形狀」線上實測不成立**

研究層驗網址時抓到 **5 期只有備援形狀能開**：`Billboard-1975-10-18.pdf`（不是 `Billboard%20`）、
`Cash-Box-1972-09-23`／`-1976-01-17`／`-1976-04-03`／`-1976-05-08`（不是 `CB-`）。序列重試過，**是真 404 不是限流**。
**第 701／614／705 條的檔名亂象沒有在 1975Q4 結束——c-145 以後的抓取器一定要留備援形狀。**
（「失敗與正常長得一樣」家族：**這一期不存在，與這一期換了檔名，在 404 上長得一模一樣。**）

## 第 798 條（同日）：**兩份新的檔期文件；榜位補全；第 791 條在 1976 年不成立**

**新抓到兩份第 612 條檔期文件**（策展層沒有）：
- **Cash Box 1975-02-15 p14「February Is Blue Note Month」**——一篇同時把《Linger Lane》《Mind Transplant》
  《Silver 'n Brass》《Waters》釘在 1975 年 2 月，還講出「**Waters 是 Blue Note 史上第一支簽約的人聲團**」
  （Billboard 1977-06-11 p84 兩年後獨立又講一次，**兩則獨立，可寫**）。
- **Cash Box 1976-05-08 p20**「July has been declared Blue Note Month」——《Cosmos》《The Prime Element》
  1976-07 的**第二個獨立來源**。
另補 Cash Box 1975-06-14 p7 的 Carmen McRae 簽約稿、Billboard 1975-05-31 p6 的第二波九套全文
（「Nine more will bow June 15」）、Billboard 1975-10-18 p50 的英國開線報導（**一次釘住本組 5 張**）。

**榜位補全**：《Silver 'n Brass》從「七週」補到**十四週以上、最高第 15 名（1975-04-26）**；
另補 Linger Lane／I Am Music／Cheshire Cat／Nexus／Silver 'n Wood／The Man Incognito／Spoonful 的逐週名次。
⚠ **第 791 條在 1976 年不成立**：**《The Man Incognito》擺明做舞曲卻只進爵士榜、Soul 榜零命中**
——**「1977 年起主戰場是 R&B 榜」是 1977–79 的現象，1976 年還不是；c-144 b 的 1977–79 段要自己重測。**

## 第 799 條（同日）：**a 組試聽採信 3 張、查無 2 張；《Jacknife》的採信有條件**

**採信**：Ronnie Foster《Live at Montreux》`1444221296`、Bobbi Humphrey《Live at Montreux》`1396315411`、
Jackie McLean《Jacknife》`724760207`。**查無 2 張**（Andrew Hill《One for One》、
John Lee & Gerry Brown《Mango Sunrise》，都跑滿三種查法）。**c-144 試聽 36/43。**

⚠ **《Jacknife》的採信是有條件的**：那是 2002 年單片 CD 形、**只有 1965 那場的 5 軌（原盤 10 軌）**。
逐軌與 MB 的 2002 CD 相符、池中沒有第二張卡會用到這個 collectionId（第 646 條的邊界過得去），故採信；
**但正文與軌序不得拿五軌代表原盤**——**1966 那場從沒單獨數位化過**。

**封面 4 張缺口全部有替代圖**（Discogs master `images[0].uri`）：Silver 'n Brass `1002632`／
Carnival of the Spirits `904801`／Spoonful `607906`／The Prime Element `1398414`。

## 第 800 條（同日）：⚠ **訂正第 710 條的美術班底——1974–76 段是 Bob Cato 不是 Mike Salisbury**

第 710 條（c-143 立的）說 BN-LA 段的班底是「Mike Salisbury 美術總監＋Lloyd Ziff 設計」，
**但本組 21 張的原壓 credit 裡 Mike Salisbury 一次都沒出現**。
**1974–76 段的班底是 Bob Cato（藝術總監，12 張以上）**，
**Lloyd Ziff 只出現在 1975 年那四張**（Linger Lane／Waters／Silver 'n Brass／Mind Transplant），
設計常是 **John Kehe 或 Ria Lewerke**。
**通則：美術班底要按「批次實查的 credit」寫，不要把前一批的結論當成整個時期的通則。**

## 第 801 條（主線 2026-09-16，研究層 b 組交件後）：**b 組 22 筆年份退 0 改判 0，但六張的疑議是用紙本壓下來的**

b 組 22 筆全 `full`、QA 清、31 個 worldradiohistory PDF 逐一驗過全 200。**年份維持卡單，但六張有疑議、全部以紙本定案**：
- 《Silver 'n Percussion》**維基與 Apple 標 1977 是錯年**（Discogs 原壓 ©℗1978＋Cash Box 1978-03-11 評介 → **1978**）。
- 《Still Can't Say Enough》**1976-10 上市卻 1977-02 才進榜**（CB 1976-10-16 的標題就是「Blue Note Sets LP For October Release」）
  ——**進榜月不等於上市月**，這一段尤其明顯。
- 《Tone Tantrum》MB frd 1977-05 vs 兩刊 1977-08-27 評介（**年不變、月取 8 月**）。
- 《The Jackie McLean Quintet》jazzdisco 日本頁 1976 vs MB＋Discogs 三筆＋列舉檔 1977 → 取 1977。
- 《The View From the Inside》**兩刊 310 期零紙本**（⚠ **不是正則太緊——那份 OCR 的關鍵字集本來就含 BN-LA710 與盤名**，
  第 702／704 條形狀）。
- 《Hipnosis》GXF 3022 實測 **1978**。

**撞陳列 0 張**（無同錄音重複）。兩處「同曲不同錄音」已逐軌比對寫進 notes：
《Live Messengers》第四面 vs 池中《A Night at Birdland, Vol. 1》——**Vol. 1 六軌與本張零重疊**，
同名的〈Wee Dot〉在 Vol. 2 上而 **Vol. 2 不在池中**；《Knucklebean》的〈Little B's Poem〉是池中《Components》(1965) 那首的**十二年後重錄**。

## 第 802 條（同日）：⚠ **第 791 條的舉例是錯的，規則本身成立——換一個乾淨的例子**

**《Fever》不是「只進 Soul 榜」的例子**：實測 Billboard Best Selling Jazz LPs
**1976-06-12 新進第 22 → 09-11 第 3 名、在榜 14 週以上**；三榜形狀是爵士 3／Soul LPs 13／主榜約 46。
**查法（Soul 先、Jazz 次、主榜也看）仍成立**，但舉例要換成
**《Tone Tantrum》——只進 Cash Box R&B 榜（最高 47），兩刊爵士榜與主榜全零**。
（與第 798 條合看：**「1977 年起主戰場是 R&B 榜」是趨勢不是規律，每一張都要自己查三榜。**）

## 第 803 條（同日）：**抓取端與索引的三個新坑**

1. ⚠ **紙本檔名在 1976／1977 之間換過一次邊**：**Cash Box 1976 是 `Cash-Box-YYYY-MM-DD.pdf`（`CB-` 全 404），
   1977–79 反過來只有 `CB-`**；Billboard 1976–79 一律 `Billboard%20`。（第 705／797 條家族）
2. ⚠ **jazzdisco 的 BN-LA 頁有切塊陷阱**：**目錄號印在每段開頭**，照「號碼結尾」切會**整頁位移一格**
   （會把 Marlena Shaw 讀成 BN-LA615-G）。另 jazzdisco 把《Fever》的號印成 `BN-LA628-H`（**正確是 -G**，反查 Discogs 0 筆）。
3. ⚠ **OCR 裡的目錄號會被拆開**：**`LT-991` 在 OCR 裡是 `LT -991`／`LT991`**，直查回 0 筆
   ——要改查「Back to Blue Note」「Cuscuna」才撈得到 Cash Box 1979-09-15 p41 的十張名單。
   **（第 704 條家族：查無可能只是關鍵字的形狀不對。）**
4. **第 822 條的 GXF-30xx 起點要往前修到 1978**（原記載 1979–80）：《Hipnosis》的 King GXF 3022 實測 1978。

## 第 804 條（同日）：**b 組試聽採信 17 張、查無 5 張；c-144 試聽 36/43**

**兩張是合訂／加值版**：Earl Klugh `716200862`、Living Inside Your Love `715548856`
——**加值軌都來自 1976-06-28 Roxy 那場，已註明不得寫進曲目**。
**查無 5 張**（正是缺試聽那五張，三種查法逐一跑完明寫查無）。
**缺封面 5 張已在 notes 給替代圖 URL**（Discogs 原壓 `images[0].uri`）；
⚠ 其中**《Tomorrow Is Here》只有 336×338、《Hipnosis》只有 500×499**，各附備援條目。

**四張庫存首發**（Live Messengers／Circulus／Hipnosis／The Jackie McLean Quintet）的正文都寫死
「錄音年 vs 首次商業發行年」兩個年份，各自附上第 782 條原文。
⚠ **兩張 Jackie McLean 在 1978 年被美國併成同一張 2LP BN-LA483-J2**
（**Discogs 把該張 format 標成 Compilation 是錯的**，研究層引它自己的 notes 反證）。
