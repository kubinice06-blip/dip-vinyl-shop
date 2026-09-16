# c-135 裁定（a 組 450 起、b 組 460 起，append）

## 第 450 條（2026-09-15，c-135 a 組）：**a 組 23 筆覆核結果——收 21、退 2；rgMbid 全部照 enum 檔，無一釘錯**

23 筆全部回問 `release-group`（inc=artist-credits+releases）與 `release?release-group=…&inc=media+labels`，
title／artist-credit／first-release-date／catno／載體／軌數逐筆對過，**enum 的 rgMbid 沒有一筆釘錯**。
實掃卡池（`seed_cards.json` 16,450 列＋`desc-tools/batches/cards/c1*.json`＋`batch-progress/c12x–c13x/prop-*.json`）
以子字串雙向比對 22 個掛名關鍵字，enum 的 `inPool: false` 23 筆全部成立（沒有假陰性）。

退掉的 2 筆：

| 筆 | 理由分類 | 說明 |
|---|---|---|
| Lou Donaldson, Clifford Brown《New Faces - New Sounds》BLP 5030（RG 415c20a3） | **12 吋重組已在池** | BLP 5030（1953-06-09 Donaldson–Brown 五重奏）1956 年併進 12 吋 BLP 1526《Memorial Album》（MB RG 83e340a1），**池中 `Clifford Brown — Memorial Album`（1956）就是它**。另見第 451 條：這個 RG 在 MB 是兩張碟被折成一個。 |
| Max Roach/James Moody/Art Blakey《New Sounds》BLP 5010（RG 92872d5b） | **判為合輯**（split 盤） | 六軌是兩個互不相干的 78 轉場拼成的 split：Max Roach Quintet 1949 巴黎（Prince Albert／Maximum／The Thin Man／Tomorrow）＋ Art Blakey 1947 Messengers（The Bop Alley 等），三段掛名。MB secondary-types 空、Discogs 也沒標，但形態是 enum 標「疑似合輯」那 16 張 Various Artists 的同型，只是 MB 用三個人名代替 VA。收進池會新造 `Max Roach/James Moody/Art Blakey` 這個三人字串（池中 Max Roach 5 張、Art Blakey 12 張都不會認它）。**退，列 §5.6 候補**：若店主要收，走 Compilation 舉證、掛名另議。 |

沒有撞池退件；沒有「原盤他廠改判」退件（Konitz 那張是改 label 不是退，見第 455 條）。

## 第 451 條（同批）：**MB 把 BLP 5021 與 BLP 5030 兩張不同的碟折在同一個 RG——退件的那一筆連帶記一個 MB 建檔錯誤**

RG 415c20a3《New Faces - New Sounds》掛「Lou Donaldson, Clifford Brown」，轄下三筆 release：
aa79aa88（**1952，BLP 5021，8 軌**：If I Love Again／Down Home／The Best Things in Life Are Free／Sweet Juice／Cheek to Cheek／Roccus／Things We Did Last Summer／Lou's Blues）、
2456e44f（**1953，BLP 5030，6 軌**）、4fe27950（2014 數位 6 軌）。
**BLP 5021 是 Lou Donaldson Quintet／Quartet 1952-11-20 那場（沒有 Clifford Brown），BLP 5030 才是 Donaldson–Brown 1953-06-09 那場**——
兩張同題不同碟，MB 折成一個 RG、掛名還取了 5030 的。enum 檔的 catno 欄同時列 BLP 5021／BLP 5030 就是這個折疊的痕跡。

後果：
- 5030 的內容在池中（Memorial Album），本批退。
- **5021（Donaldson 領班的第一張）不在池中、也沒有自己的 RG**——它的 12 吋重組是 BLP 1537《Quartet/Quintet/Sextet》（RG 0ba4e7f4，enum 1957、後批未收）。
  要收 5021 得先在 MB 把 aa79aa88 拆出去成獨立 RG；**本層不動 MB**，記為 §1 候選（rgMbid 缺），留給 1537 那一批一起判。
- 這是 c-131 第 364 條第一型（只建再發、原盤沒建）的變體：**不是漏建，是兩張碟共用一個 RG**，rgMbid 掃描抓不到（`chk-prop` 只報「同 rgMbid 不同掛名」）。

## 第 452 條（同批）：**7000 系列的「X's Blue Note Jazzmen／Hot Seven／with Wild Bill Davison」一律收攏到領班本名；`&` 只給兩位不同領班的聯名**

本批 1951 年的 Dixieland 10 吋盤全部是「領班＋編制」的 credit，MB 建成群組實體：
`Sidney Bechet's Blue Note Jazz Men with "Wild Bill" Davison`（群組 7e7a3dbd ＋ Person 9a28858b）、
`James P. Johnson’s Blue Note Jazzmen`（群組 a2952eb9，含 U+2019）、`Art Hodes's Hot Seven`（群組 c92ff6a5；MB 另有 Person 913e5c9f 與 Chicagoans／Hot Five／Blue Five 三個群組）、
`James Moody and His Modernists With Chano Pozo`（Person 用編制名當 credit-name ＋ Pozo）、`The Horace Silver Trio`（群組 e8c90011）、
`Howard McGhee All Stars / Howard McGhee`（群組 7724de80 ＋ Person 22b66dc2 兩段）。

裁定：**全部收攏到領班本名**——`Sidney Bechet`（池中 3 張 vs `Sidney Bechet All Stars` 1）、`James P. Johnson`（池中 2）、`James Moody`（池中 1）、`Horace Silver`（池中 8 vs `Horace Silver And The Jazz Messengers` 1）照第 363 條第二型是池中多數；
`Art Hodes`、`Howard McGhee` 池中零張、沒有多數可循，**依同一條的精神取 Person 實體名**（一位四種編制的 Hodes 若照群組字串收，第一張就製造分裂）。
編制字串、客座（Davison、Pozo）全部進 `queryAlias`，`risk` 標明 MB credit。

**`&` 聯名只用在兩位不同領班**：`Edmond Hall & Sidney De Paris`（MB credit「Edmond Hall - Sidney De Paris」，兩個 Person）。
MB 的 join phrase「 - 」改成池中雙人聯名通用的 `&`（先例 `Sonny Terry & Brownie McGhee`、`Milt Jackson & John Coltrane`），
因為「A - B」在店面會與「掛名 — 盤名」的分隔混淆；MB 原字串進 `queryAlias`。

## 第 453 條（同批）：**10 吋→12 吋重組的六組對應關係（本批只釘 10 吋原盤，12 吋一律「刻意不釘」並互指）**

| 10 吋（本批收） | 12 吋重組 | 12 吋在池中？ | MB 對 12 吋的處理 |
|---|---|---|---|
| Miles Davis《Young Man With a Horn》BLP 5013（1952） | 《Miles Davis, Volume 1》BLP 1501（1955-11，RG 948a4f0a） | 否 | **MB 標 Album+Compilation**——enum 濾 Compilation 時把它濾掉了，所以 12 吋 Vol. 1 不會出現在任何一批的 slice；要收得另判 |
| Miles Davis《Miles Davis, Vol. 2》BLP 5022（1953） | 《Miles Davis, Volume 2》BLP 1502（1956） | 否 | **折在同一個 RG**（CD 0777 7 81502 2 0 掛在 5022 的 RG 底下），本卡 `year` 取 10 吋 1953 |
| Thelonious Monk《Genius of Modern Music, Volume 2》BLP 5009（1952） | BLP 1511（1956） | 否（Vol. 1 是池中王牌） | 折在同一個 RG（4a9b7b33 1956 12" 12 軌），`year` 取 10 吋 1952 |
| Milt Jackson《Wizard of the Vibes》BLP 5011（1952） | 《Milt Jackson》BLP 1509（1955，RG 0ef5d410） | 否 | 獨立 RG，刻意不釘 |
| Fats Navarro《Memorial Album》BLP 5004（1951） | 《The Fabulous Fats Navarro》Vol. 1 BLP 1531（RG 0d37e500，enum 1957 後批）／Vol. 2 BLP 1532（RG 68658859，MB 標 Compilation） | 否 | Vol. 1 獨立 RG 在 enum 後批；Vol. 2 被 Compilation 濾掉 |
| Horace Silver《New Faces New Sounds》BLP 5018（1952） | 《Horace Silver Trio》BLP 1520（1956-10，RG bafa443c，enum 後批；與 BLP 5034《Vol. 2》RG 65b3cbe6 合併） | 否 | 三個 RG 各自獨立 |

**三種形狀要分開對待**：(a) 折在同一 RG（Miles Vol. 2、Monk Vol. 2）→ `year` 取 10 吋、行文軌數以 10 吋為準、12 吋當同碟的版本；
(b) 12 吋獨立 RG 且 secondary 空（Milt Jackson 1509、Navarro 1531、Silver 1520）→ 依簡報第二節第 3 點各算一張，後批照 enum 順序自然會遇到，本批 `risk` 已互指；
(c) **12 吋獨立 RG 但 MB 標 Compilation（Miles Vol. 1 1501、Navarro Vol. 2 1532）→ enum 已經把它們濾掉，這條線永遠不會排到它們**。
Miles Davis 12 吋 Volume 1 是 1500 系列的第一號，池中沒有；**要不要把「MB 標 Compilation 的 1500 系列重組盤」撈回來另判，留主線**（本批不補、不改清單）。

## 第 454 條（同批）：**年份：Blue Note 10 吋盤 MB 與 Discogs 差一年的有 4 張，照第 364 條取 MB，改判 0 張**

| 碟 | MB | Discogs | 錄音 | 卡單 |
|---|---|---|---|---|
| Miles Davis《Young Man With a Horn》BLP 5013 | 1952（兩筆 release 都標） | master 531795 與四筆 10 吋條目**全部 1953**；Apple EP 條目 1953-03-01 | 1952-05-09 | **1952**，1953 說寫進 risk |
| Horace Silver《New Faces New Sounds》BLP 5018 | 1952 | master 487897／2169167 標 1953 | 1952-10 | **1952** |
| James Moody《With Strings》BLP 5005 | 1952 | 10087023 標 1952、13251973 標 1953 | 1951？ | **1952** |
| James Moody《and His Modernists》BLP 5006 | 1952 | master 1952；21830869 標 1951 | 1948-10-25（Pozo 面） | **1952** |

其餘 17 張 MB 與 Discogs 一致或 Discogs 查無（Garner 四卷、Hodes、Bechet 7025、Quebec BN 102 只有 MB 一個來源，`risk` 已標「研究層補第二來源」）。
**5013 那張是四張裡最可能翻的**（Discogs 五個條目零個 1952、Apple 也 1953）——但依第 431 條，Discogs 條目與 Apple 都不是一手，
真要翻要拿 Blue Note 目錄頁或同期 Down Beat／Billboard 廣告；研究層有就改卡單值，不必回頭問。

⚠ 另記 78 轉整編盤的年份原則（派工信第 2 點）：本批 21 張裡 **13 張是 78 轉面整編**（Quebec、Bechet ×2、Navarro、Hall–De Paris、Johnson、Hodes、Moody ×2、Milt Jackson、McGhee、Monk Vol. 2 的 1947 面），
`year` 一律取整編盤的發行年，錄音年只寫 `risk`。Garner 四卷是 1944 私人公寓錄音（非現場、非錄音室），同樣取 1952／53 發行年。

## 第 455 條（同批）：**Konitz／Mulligan 那張的原盤是 Pacific Jazz PJLP-2（1953）——enum 的「原盤可能他廠」成立，`label` 改 Pacific Jazz、Blue Note 只是 2021 Tone Poet 再發方**

RG f4aaec95 轄下有原盤 31df0459（1953 US 10" Pacific Jazz PJLP-2，8 軌；Discogs 4031209／master 499613 同）與法國 Swing M. 33.306（1953，題《The Gerry Mulligan Quartet, Vol. 3》），
Blue Note 那兩筆是 2021-09-17 Tone Poet（沿用 World Pacific PJM-406 號）與 2024 JP HQCD。**`year` 1953、`label` Pacific Jazz，Blue Note 版年份寫在 risk**。

順帶三件：
1. **掛名**：MB credit 是「Lee Konitz」＋ join phrase「 Plays With 」＋群組「Gerry Mulligan Quartet」，整串等於盤名。**取 `Lee Konitz`**（池中 4 張），
   不照第 363 條第一型寫聯名——那會新造一個等於盤名的掛名字串；也不改寫成 `&`（MB 的 join phrase 不是 &）。聯名各寫法全進 `queryAlias`，主線要改成 `Lee Konitz & Gerry Mulligan Quartet` 只改卡單值。
2. **部分現場**：1953-01-30 The Haig 的面是現場、其餘錄音室，MB secondary-types 空——**第 397 條「兩個方向都會漏」的實例**，`risk` 已標、正文只能寫「部分現場」。
3. 同錄音另有 RG 923a0faa《Konitz Meets Mulligan》1957（12 吋重編、盤名不同）——依第 45／363 條看現行流通名：Tone Poet 2021 與 JP 2024 都回到原名，本卡取原名、923a0faa 刻意不釘。

## 第 456 條（同批）：**MB 載體欄錯一張、Vol. 1 缺 RG 一張、Vol. 2 只有 MB 一個來源——三件留研究層的事**

- **《Jamming in Jazz》BLP 7007 的 MB release 37e4e0cb 把 media.format 登錄成 12" Vinyl**，但 7000 系列是 10 吋、Discogs 五個條目全標 10"。enum 檔的 `format: 12" Vinyl` 是照抄 MB 的。卡單正文寫 10 吋；**本層不改 MB**。
- **Bechet《Jazz Festival Concert, Paris 1952》Vol. 1（BLP 7024）MB 沒建 RG**（`releasegroup:"Jazz Festival Concert" AND artist:"Sidney Bechet"` 只回 Vol. 2）。本批只收 Vol. 2，Vol. 1 記 §1 候選；Vol. 2 的 `risk` 已寫明「不得寫成獨立的一場」。
- **Vol. 2 本身也只有 MB 一筆 release**，Discogs 以 catno 搜不到（catno 格式問題可能），演出日期／場地（一般記 1952 年初 Salle Pleyel、Claude Luter 樂團）本層沒核到一手，研究層補、補不到就不寫。
- 同形（只有 MB 一個來源）的還有：Ike Quebec《Tenor Sax》BN 102（78 轉套裝，Discogs 搜不到，**若查證不出實體套裝要退回 §1 候選**）、Art Hodes《Dixieland Clambake》（Discogs 只有 1954 重壓）、Garner Vol. 2／3／4。

## 第 457 條（同批）：**CAA 命中 19/23（退件 2 張含在內）、收件 21 張命中 17；四張 404 全是 7000 系列 Dixieland 盤**

RG 端點命中：Quebec、Navarro、Johnson、Hodes、Moody ×2、Garner ×4、New Sounds（退）、Milt Jackson、McGhee、Miles ×2、Silver、Donaldson–Brown（退）、Monk、Konitz——**10 吋盤的 CAA 命中率比派工信預期的高**，多半是 1999 年日本 TOJJ 復刻與 2014 美國復刻上傳的圖。
404 的四張：Bechet《with "Wild Bill" Davison》BLP 7001、Hall–De Paris《Jamming in Jazz》BLP 7007、Bechet《and His Blue Note Jazz Men》BLP 7009、Bechet《Jazz Festival Concert, Paris 1952, Vol. 2》BLP 7025——
可走的路（已寫進各卡 `risk`）：Discogs master 603985／601982／1737766 有封面圖；7025 只能靠研究層找同場錄音的法國版。

## 第 458 條（同批）：**店面觀察（第 254 條，只寫觀察）——Apple us `search` 一種查法命中 8 張，其中 3 張是 12 吋重組的形狀、2 張 Apple 標成 EP**

| 碟 | collectionId | 形狀 |
|---|---|---|
| Navarro《Memorial Album》 | 1442922434 | 7 軌、1951-01-01，與 10 吋一致 |
| Milt Jackson《Wizard of the Vibes》 | 1442981100／724474129 | 8 軌原盤形＋17 軌 RVG |
| McGhee《All Stars》 | 1657546156 | 8 軌、1952-01-01，一致 |
| Miles《Young Man With a Horn》 | 1886576377 | **Apple 標「- EP」**，6 軌、1953-03-01 |
| Miles《Vol. 2》 | 1443091489（11 軌＝12 吋 1502 形）／1890580519（**「Vol.2 - EP」**，6 軌＝10 吋形） | 兩種形狀並存 |
| Monk《Genius Vol. 2》 | 723556544（18 軌 RVG）／1459440210（13 軌、1956-08-01＝12 吋 1511 形） | 兩種形狀並存 |

**Apple 把 6 軌 10 吋盤標成 EP**——那是店面的長度規則，不是本專案的 EP 判定（MB primary Album）；上架時別被「- EP」擋掉。
其餘 13 張一種查法零命中（Dixieland 7000 系列全部、Garner 四卷、Moody ×2、Silver、Konitz、Bechet 7025）——**只是觀察，不是「未上架」**，研究層照第 254 條跑三種查法；
Blue Note 10 吋盤的數位版多半只以 12 吋重組或 CD 整編的形態存在，「前 N 軌對應原盤」的判法（c-130 Perfect 先例）在這一段會很常用。

## 第 459 條（同批）：**chk-prop 標記 0；順帶記兩個同題撞名的坑給後批**

`node batch-progress/c135/chk-prop.mjs a`：21 張、14 位，欄位 0、線上池撞卡 0、跨組 0、跨批 0（三筆已知的舊帳是 c49b／cseab 的）、同 rgMbid 不同掛名 0。

後批要注意的同題：
1. **「New Faces – New Sounds」是 5000 系列的新人系列名**，enum 裡 Gil Mellé（5020）、Kenny Drew（5023）、Wynton Kelly（5025）、Julius Watkins（5053）、Jutta Hipp（5056）都同題，本批 Silver 5018 也是——
   `chk-prop` 的鍵是掛名＋盤名所以不會誤報，但**上架比對盤名時要連掛名一起看**，Apple 用盤名搜會全部混在一起。
2. Garner《Overture to Dawn》五卷分在 a 組（1–4）與 b 組（5，BLP 5016，RG e618993f）——b 組收 Vol. 5 時掛名照 `Erroll Garner`、`risk` 指回這四卷。

## 第 460 條（2026-09-15，c-135 b 組）：**22 筆覆核結果——實收 19、退 3；年份 0 改判；CAA 16/19**

`slice.json` 的 `g: "b"` 22 筆（1953–1955，BLP 5016–5066 ＋ 12 吋 BLP 1505）逐筆回問 MB `release-group`（inc=artist-credits+releases）
與 `release?release-group=…&inc=media+labels`，實掃 `seed_cards.json` 16,450 列＋`desc-tools/batches/cards/c1*.json`（掛名子字串雙向＋盤名卷號統一）。
**rgMbid 全部沿用列舉檔，無一筆釘錯。** 22 筆的 `first-release-date` 全部與 Discogs 首壓年逐筆相符（1953 ×7、1954 ×14、1955 ×1），**年份 0 改判**。
b 組 rgMbid 與 a 組 23 筆無一相同（派工信坑 4 已程式比對）。`node batch-progress/c135/chk-prop.mjs b` → 線上池撞卡 0、跨組 0、跨批 0、**標記 0**。

**退掉 3 張（逐筆）**：

| # | 列舉檔 | rgMbid | 理由分類 | 說明 |
|---|---|---|---|---|
| 1 | Jay Jay Johnson《The Eminent Jay Jay Johnson, Volume 1》1955（BLP 1505） | 84668b7b-46ab-4ea4-9ad7-3cc8d062e410 | **撞池（列舉檔假陰性）** | 池中 `J.J. Johnson — The Eminent Jay Jay Johnson, Volume 1 (1955)` 已有；列舉檔用 MB credit「Jay Jay Johnson」比對、沒摺到池中「J.J. Johnson」。同形：MB 這個 RG 的 artist 實體就是 J.J. Johnson（33e50556），只是 credit 字串不同。 |
| 2 | J.J. Johnson《Jay Jay Johnson with Clifford Brown, Jimmy Heath, John Lewis, Percy Heath, Kenny Clarke》1953（BLP 5028） | eab5c80e-a424-4a8c-9698-56aa79a5fd92 | **10 吋→12 吋重組，12 吋已在池中**（派工信坑 1） | 六軌（1953-06-22）全部重組進 12 吋 BLP 1505《The Eminent Jay Jay Johnson, Volume 1》（池中已有，見上列）。對應關係：BLP 1505 ＝ BLP 5028 六軌 ＋ BLP 5057 前段；BLP 1506 Vol. 2（RG 013b98d0，列舉檔 inPool false）＝ 5057 後段 ＋ 1955-06-06 場。 |
| 3 | The Horace Silver Quintet《Horace Silver Quintet (Volume 3)》1954（BLP 5058） | fcc2f4ec-2539-431f-8e04-e54767089f81 | **10 吋→12 吋重組，12 吋已在池中**（派工信坑 1） | 四軌（1954-11-13）與 BLP 5062 Vol. 4（1955-02-06）重組成 12 吋 BLP 1518《Horace Silver and the Jazz Messengers》（RG ea8ca1bb，列舉檔 inPool true，池中 `Horace Silver And The Jazz Messengers` **apex:hall**）。BLP 5062 不在本批 slice，下一批若出現同樣退。 |

**簡報第二節第 3 條（RG 分別建了就各算一張）與派工信坑 1（12 吋在池中就退）的取捨**：派工信是這一段的特定指示，
以它為準——**12 吋重組盤已在池中的退，尚未在池中的 10 吋保留、`risk` 互指**。本組保留並互指的三組：
- Horace Silver《Horace Silver Trio, Vol. 2》BLP 5034 ↔ 12 吋 BLP 1520《Horace Silver Trio》（RG bafa443c，inPool false，預期 c-136）＋ a 組 BLP 5018；
- Lou Donaldson《Lou Donaldson Sextet, Volume 2》BLP 5055 ↔ 12 吋 BLP 1537《Quartet/Quintet/Sextet》（RG 0ba4e7f4，inPool false，預期 c-136）；
- Miles Davis《Miles Davis, Vol. 3》BLP 5040 ↔ **a 組 RG 29393845《Miles Davis, Vol. 2》**——⚠ MB 已把 12 吋 BLP 1502／CD 11 軌併進那個 RG，
  其內容含本張 1954-03-06 全部六軌。**a 組那張的 release 清單有一半是重組盤，本機組 manifest 時要知道**（見第 463 條）。
**下一批收 1520／1537 時，`risk` 要回指本批這兩張 10 吋。**

## 第 461 條（同批）：**原盤他廠判定——本批 4 張 Vogue 授權盤，年份都不改、`label` 分三種寫法**

列舉檔標「原盤可能他廠」的 108 張不含本批任何一張（BN 首發與原盤同年，note 判準抓不到），**但實查 Discogs 有 4 張錄音權屬 Vogue（巴黎）**：

| 盤 | Vogue 原盤 | BN 版 | 配置 | `label` 寫法 |
|---|---|---|---|---|
| Fats Sadi《"Fats" Sadi's Combo》BLP 5061 | Vogue L.D. 212（FR 1954，MB 有建） | 1954，改題《The Swinging Fats Sadi Combo》 | 八軌相同、曲序不同 | **Vogue 為原盤、BN 為授權版** |
| Clifford Brown《Clifford Brown Quartet》BLP 5047 | Vogue L.D. 179《Jazz Time Paris Vol. 13》（FR 1954，MB 未建；78 轉 V.5180 1953 先發） | 1954 | 六軌逐一相同（Discogs master 1133775） | **Vogue 為原盤、BN 為授權版** |
| Gigi Gryce & Clifford Brown《Gigi Gryce Clifford Brown Sextet》BLP 5048 | Vogue L.D. 175《Jazz Time Paris Vol. 11》（FR 無年；UK L.D.E. 048 1954） | 1954 | Vogue 5 軌、BN 4 軌——**配置不同** | BN 為主、Vogue 註為來源 |
| Dizzy Gillespie《Horn of Plenty》BLP 5017 | 78 轉 V.5129／5130／5140（FR 1952）；Vogue LD 077《Plays in Paris》（FR 1953，8 軌） | 1953 | LD 077 只與 BN 共 6 軌，**《Horn of Plenty》8 軌是 BN 自己的編法** | BN 為主、Vogue 註為錄音來源 |

**判準**：簡報第一節第 3 條「原盤他廠 → `year` 取他廠首發年、`label` 寫原廠」——**「原盤」指同一配置的專輯**，
不是同一批錄音的任何載體。同配置（Sadi、Brown Quartet）才寫 Vogue 為原盤；配置不同（Gryce–Brown、Gillespie）
釘的 RG 就是 BN 的配置，`label` 以 BN 為主。**四張的 Vogue LP 與 BN LP 同年，`year` 都不動。**
Jutta Hipp BLP 5056（法蘭克福錄音）實查 Discogs master 591917 之下全是 Blue Note 發行、無德國先發，不算他廠。
**MB 這四個 RG 只有 Sadi 建了 Vogue 原盤，其餘三張的 Vogue 原盤未建檔**——第 364 條第一型（只建了一邊）的變體，留本機。

## 第 462 條（同批）：**Blue Note 10 吋的編制掛名——群組實體一律收攏到本人，盤名保留編制；例外是對等聯名與側人並列**

MB 把這一段的 credit 幾乎全建成群組實體（Kenny Drew Trio、Sal Salvador Quintet、Elmo Hope Quintet、Clifford Brown Quartet、
Julius Watkins Sextet、Lou Donaldson Sextet、Jutta Hipp Quintet、"Fats" Sadi's Combo、The Horace Silver Trio／Quintet）。
依 c-131 第 363 條第 2 型（同一位不同編制 → 池中多數寫法）與池中先例（`Kenny Drew — Kenny Drew Trio`、`Elmo Hope Sextet` 之外 `Elmo Hope` 2 張、
`Clifford Brown` 2 張），**本組 19 張一律掛本人、編制留在盤名、MB 群組字串進 `queryAlias`**：
Kenny Drew（池中 4 vs Trio 3）、Elmo Hope（2 vs Sextet 1）、Clifford Brown、Lou Donaldson（8）、Horace Silver（8）、
Sal Salvador／Julius Watkins／Jutta Hipp／Fats Sadi（池中零張，MB 都另有 Person 實體，第 307 條反查無同字串不同人）。
**沒有往 `Kenny Drew Trio`／`Elmo Hope Sextet`／`Horace Silver Trio` 任一邊加卡。** 下一批 BLP 1515／1516 Jutta Hipp、1520 Horace Silver Trio 要沿用同字串。

三個例外：
1. **對等聯名**（第 363 條第 1 型）：`Gigi Gryce & Clifford Brown — Gigi Gryce Clifford Brown Sextet`，MB 群組實體名用 en dash「Gigi Gryce – Clifford Brown Sextet」，
   chk-prop 擋非 ASCII 連字號，改用池中聯名先例的 `&`（`Clifford Brown & Max Roach`、`Bill Evans & Jim Hall`）。
2. **側人並列不是聯名**：BLP 5026《Memorable Sessions in Jazz》MB credit 是五人「Edmond Hall / Charlie Christian / Meade Lux Lewis / Red Norvo / Teddy Wilson」，
   六軌全是 Edmond Hall 領銜的 1941 Celeste Quartet ×4 ＋ 1944 Quintet ×2，**不是 Various Artists 合輯**（MB secondary-types 空；形態同池中 Monk《Genius of Modern Music》、
   a 組 Ike Quebec 那種 78 轉首次 LP 化）。掛 `Edmond Hall`，五人串進 `queryAlias`，`year` 1953 取 LP 首發年。
   ⚠ a 組 BLP 7007《Jamming in Jazz》的「Edmond Hall - Sidney De Paris」是對等雙掛名，兩張處理方式不同，a 組要自己定。
3. **Horace Silver Trio And Art Blakey**（BLP 5034）：Blakey 是 B 面兩軌的鼓 feature（與 Sabu），不是對等聯名；
   12 吋 BLP 1520 的 MB credit 只掛「Horace Silver」——本卡掛 `Horace Silver`，盤名依第 91／95 條取「Horace Silver Trio, Vol. 2」（MB RG title 只有「Vol. 2」）。

**掛名拼法一筆**：Gil Mellé——MB 這個 RG 的 credit 是「Gill Mellé」（實體 8353ae26，無 type／alias），MB 另有 Person「Gil Mellé」（6cde5a82，1931–2004），
疑為重複實體；早期 BN 封面確實印 Gill。本卡用通行「Gil Mellé」（12 吋 1517 與所有再發、Apple 皆此），「Gill Mellé」進 queryAlias，下一批 1517 沿用。

## 第 463 條（同批）：**盤名取法——MB RG title 只有「Vol. 2」「Vol. 3」的，依第 91／95 條補上主體名**

MB 把 BLP 5034 建成「Vol. 2」、BLP 5040 建成「Vol. 3」（RG 與 release title 都只有這幾個字）。卡片盤名照抄會在店面變成三張「Vol. N」。
本組取 `Horace Silver Trio, Vol. 2`、`Miles Davis, Vol. 3`（後者與 a 組 MB title「Miles Davis, Vol. 2」同形），MB 原題進 `queryAlias`。
同理 BLP 5044：MB RG title「Elmo Hope Quintet」，原盤封面與 Discogs 1954 條目、Apple 都題「Volume 2」（Vol. 1 是 BLP 5029 三重奏）——取 `Elmo Hope Quintet, Volume 2`。
其餘 16 張照 MB RG title；四張「New Faces – New Sounds」系列盤名把 en dash 改 ASCII 連字號（Wynton Kelly 與 Jutta Hipp 那兩個 RG 的 MB title 本來就是 ASCII）。
Wynton Kelly BLP 5025 的副題／再發名《Piano Interpretations》兩名並存（1991 CD 用副題、Apple 兩者併寫），照 MB RG title，副題進 queryAlias。

**⚠ 關鍵發現（寫進 a 組要看的地方）**：a 組 RG 29393845《Miles Davis, Vol. 2》轄下 7 個 release 只有 1 個是 10 吋 BLP 5022（6 軌），
其餘 6 個是 12 吋 BLP 1502／CD《Miles Davis, Volume 2》（11 軌）——**MB 把 10 吋原盤與 12 吋重組盤併成一個 RG**，
而重組盤的 11 軌含 b 組 BLP 5040 全部六軌。a 組那張的 `label`／軌數若照 CD 寫會寫成 11 軌重組盤。**b 組《Miles Davis, Vol. 3》保留、`risk` 已互指。**

## 第 464 條（同批）：**店面觀察——Apple 把 10 吋盤標成「EP」、年份欄填錄音日或數位再發年；CAA 16/19**

三種查法只寫觀察（第 254 條）。us `search` 一種查法直接命中原配置的 11 張：Mellé（1443170546）、Drew（1455162555）、McGhee（1511079369）、
Kelly（1455262618）、Salvador（1443269236）、Miles Vol. 3（1443804725，題「Modern Jazz Series, Vol. 3」）、Farlow（1455679648）、Hope（1442856742）、
Hipp（1443150915）、Mobley（1443139366）、Gryce–Brown（1154299500，Vogue 11 軌擴充版）。
**Apple 把 6 軌以下的 10 吋盤一律標「- EP」**（McGhee、Salvador、Farlow、Hope、Mobley 五張）——那是店面對 10 吋盤的標法，
`releaseType` 仍是 Album（MB primary-type Album、secondary-types 空）。**Apple 的 releaseDate 兩張失真**：Kelly 填 1951-07-28（錄音日，℗ 1951）、Hipp 填 2014-01-01（數位再發年）——
第 364 條的形狀，年份不採。
search 零命中、藝人目錄 `lookup` 也只見合集或 12 吋重組盤的 8 張：Garner Vol. 5、Gillespie（只有《Dizzy Digs Paris》41 軌）、Hall（只有 1998 CD《Profoundly Blue》17 軌）、
Silver Trio Vol. 2（只有 12 吋《Horace Silver Trio》16 軌）、Donaldson Sextet Vol. 2（只有 12 吋《Quartet/Quintet/Sextet》10 軌）、
Brown Quartet（只有 Vogue《Complete Paris Sessions Vol. 1》11 軌）、Watkins、Sadi（只有 Fresh Sound 回顧輯 23 軌）——**「前 N 軌／後 N 軌對應原盤」是否可採，留研究層逐軌比**。
CAA：16/19 有圖，無圖 3 張＝BLP 5026 Hall、5053 Watkins、5061 Sadi。

## 第 465 條（同批，收到 c-136 a 第 475 條後）：**四件交叉事項的處理**

1. 《The Eminent Jay Jay Johnson, Volume 1》——已退（第 460 條退表第 1 列，撞池）。
2. `Gill Mellé`——卡單已用 `Gil Mellé`（第 462 條末段），與 c-136 a 同字串，不分裂。
3. 編制掛名——`Kenny Drew`、`Jutta Hipp`、`Horace Silver` 已依第 363 條收攏（第 462 條）；《Horace Silver Quintet (Volume 3)》BLP 5058 因 12 吋 1518 已在池中整張退掉（第 460 條退表第 3 列）。
4. 10 吋↔12 吋互指——本組 10 吋側只有 **BLP 5034 ↔ c-136 a 的 BLP 1520**，`risk` 與 `mbNote` 已改成明指 c-136 a；
   Navarro 5004 與 Birdland 5037–39 在 a 組 slice（或不在本批），由 a 組處理。
   另 BLP 5055 ↔ 12 吋 1537《Quartet/Quintet/Sextet》仍寫「預期 c-136」——c-136 a 若已收 1537，請在那邊回指本張。
`node batch-progress/c135/chk-prop.mjs a b` 重跑見下。

---

## 第 466 條（主線 2026-09-16，研究層 a 組交件後）：**年份改四張、廠牌改一張——同期紙本全部找到了**

| 碟 | 原 | 改 | 依據 |
|---|---:|---:|---|
| Ike Quebec《Ike Quebec Tenor Sax》BN 102 | 1945 | **1946** | 同期紙本 1946-08-10 的新片預告欄與 08-17 的評論 |
| Miles Davis《Young Man With a Horn》BLP 5013 | 1952 | **1953** | 同期紙本 1953-03-21 新片評論（**第 454 條指名要的一手來源拿到了**） |
| Horace Silver《New Faces - New Sounds》BLP 5018 | 1952 | **1953** | 同期紙本 1953-03-07 新片評論 |
| Bechet《Jazz Festival Concert, Paris 1952, Volume 2》BLP 7025 | 1952 | **1953** | Vol.1／Vol.2 兩筆都是 1953；資料庫的 1952 是**演出年** |
| James Moody《With Strings》BLP 5005 | 1952／Blue Note | **1951／Vogue** | **原盤是 Vogue L.D. 018《Moody's Mood》**（法國 1951，同八首、同 10 吋、同 master）——**第 461 條「同配置才算原盤」的正面案例**，策展層完全沒提到 Vogue |

## 第 467 條（同日）⚠ **jazzdisco 的 Blue Note 7000 系列年份欄系統性晚 1–2 年，不得拿它推翻資料庫與 Discogs**

實證：它記 7001=1951、7005/7006=1952，但同期紙本 1950-09-30 已報導首批六張 10 吋、1950-11-11 就評了 7005/7006；
它記 7013/7014=1953，但同期紙本 1951-08-25 已預告。**這條擋住了 5 張本來會被誤改的年份**（7001／7007／7009／7012／7015）。
**它的 5000 系列年份欄則與紙本相符。** 與 c-141 第 58x 條（jazzdisco 在 84300 段與紙本站反邊）合為同一件事：
**jazzdisco 是好索引、不是單一可信來源，要按系列分段判它的可信度。**

## 第 468 條（同日）：**策展層第 455 條的現場日期錯，而且「部分現場」的範圍更小**

Konitz／Mulligan 那張的 The Haig 現場是 **1953-01-23**（不是 01-30）；
**PJLP-2 八軌裡只有一軌是現場，B 面四軌根本沒有 Konitz**（是 Mulligan–Chet Baker 四重奏）。
第 456 條的三件事全部補齊：Vol.1 有條目、7025 的場地與兩個演出日核到、**Garner 五卷外部條目全部存在**（只是沒建 master，要用盤名搜）。
**Ike Quebec 那張不必退回 §1 候選**（BN 102 三張裝 78 轉的條目有 8 張圖、逐面標母帶編號）；
同時擋下策展層三處無出處宣稱（「廠牌第一張賣座 78 轉」、「Monk、Powell 都經他引介」、Topsy 錄音日 1944-07 實為 1945-07-17）。

## 第 469 條（主線 2026-09-16，研究層 b 組交件後）：**b 組擋下策展層八處，全部採信；`year` 一張都不改，只改 Fats Sadi 的 `label` 年份**

研究層 b 組 19/19 全 `full`、年份異議 0。**擋下的八處逐條採信**（全是正文層級的事實錯，不動任何裁定結論）：
1. Gil Mellé BLP 5020 錄音日 → **1952-03-02 與 1953-01-31**（策展層寫 1952-12／1953-01）。
2. Howard McGhee BLP 5024 錄音日 → **1953-05-20**（策展層寫 1953-10-20，但 Billboard 1953-10-10 已刊評論，10-20 不可能）。
3. Sal Salvador BLP 5035 錄音日 → **1953-12-24**（策展層寫 1954-01-22）。
4. Edmond Hall BLP 5026：Charlie Christian 彈的是**原聲吉他**，不是電吉他——那正是這場被反覆提起的原因；「唯一一次原聲錄音」查無來源，退成「難得」。
5. Horace Silver BLP 5034：Sabu **只在〈Message From Kenya〉一軌**，〈Nothing But the Soul〉是 Blakey 一人。
6. Clifford Brown BLP 5047「生前唯一一組純四重奏錄音室錄音」查無出處 → 第 253 條擋。
7. Jutta Hipp BLP 5056「Blue Note 第一張非美國樂手領銜的盤」不成立（BLP 5019 1953、5052 1954 更早）→ 擋；
   **同時推翻英文維基「1956 年才在美國發行」**——Billboard 1955-01-29 就已評（61 分）。
   （Fats Sadi「10 吋唯一一張歐陸樂手領銜盤」同理擋——同批 Jutta Hipp 就是。）
8. Hank Mobley BLP 5066「5000 系列倒數第二張」不成立（系列到 **BLP 5070**）；「24 張領銜盤」查無來源 → 擋。

**卡單唯一要動的一筆**：Fats Sadi BLP 5061 的 `label` 欄 US 年份 **1954 → 1955**
（jazzdisco 5000 系列記 1955、Billboard 1955-06-18 才刊評 74 分）。**`year` 維持 1954**——原盤是 Vogue L.D. 212（FR 1954），
`year` 取原盤首發年不變。已改 `desc-tools/batches/cards/c135-cards.json` 與 `batch-progress/c135/prop-b.json`。

## 第 470 條（同日）：**jazzdisco 的 5000 系列年份欄可信，但它的曲名欄與編制歸屬會錯——欄位要分開評價，不能整份採信或整份不信**

第 467 條說 7000 系列年份欄系統性晚 1–2 年；b 組這次證實 **5000 系列的年份欄反而最準**
（Fats Sadi 那筆贏過 MB 與 Discogs 兩個資料庫）。但同一份目錄的**曲名欄會錯**
（Kenny Drew BLP 5023 記〈Spring Will Be A Little Late〉，MB 與店面都作〈It Might as Well Be Spring〉），
**編制欄也會被讀錯**（Sabu 只在一軌，策展層讀成整張）。
**通則：一份來源的可信度要按欄位評價，不是按來源評價。**「這份目錄準」與「這份目錄的這一欄準」是兩件事。

## 第 471 條（同日）：⚠ **12 吋重組盤不一定收滿 10 吋的全部軌——「1537 ＝ 5021＋5055」這種算術式的回指要逐軌驗**

b 組實查：**BLP 1537 只收了 BLP 5055 四軌裡的三軌**（〈After You've Gone〉被拿掉），也漏了 5021 的〈Things We Did Last Summer〉。
**c-136 收 BLP 1537 時的回指寫法要改**，不得寫成「兩張 10 吋合起來就是這張 12 吋」。
反例（可以逐軌驗證的）：BLP 5034 與 12 吋 1520 → 店面 724469019 十六軌 ＝ 前 8 軌 BLP 5018（a 組）＋ 後 8 軌 BLP 5034；
BLP 5040 六軌全數併進 BLP 1502（a 組那張引軌數必須用 10 吋的 6 軌，不是 CD 的 11 軌）。
「失敗與正常長得一樣」家族：**兩張 10 吋的軌數加起來剛好等於 12 吋的軌數時，漏收與收滿長得一模一樣。**

## 第 472 條（同日）：**b 組 15 張的試聽來源已補進 `previews.json`；合訂版要指到本盤的那一軌**

19/19 全部有固定試聽來源（0 張無來源）。其中 4 張探測層本來就命中，**15 張由主線依第 254 條補入**。
合訂版的 `previewUrl` **不取第 1 軌，取本盤第一軌在該條目裡的軌序**：
Edmond Hall `1877197493` 第 1 軌、Horace Silver `724469019` **第 9 軌**、Fats Sadi `1661109180` **第 4 軌**、
Clifford Brown Quartet `1154299500` **第 6 軌**／Gryce–Brown 同一條目 **第 1 軌**、Lou Donaldson `1442286960` **第 7 軌**、
Julius Watkins `1854316164`（**gb**，策展層只查 us 所以說零命中）、Erroll Garner `305742218`（gb 公版廠）、
Dizzy Gillespie `418323034`（us，℗ Disques Vogue）**第 2 片第 1 軌〈Afro Paris〉**——
⚠ 這一張補的時候踩到：`lookup` 回的 song 陣列是**跨片連號**的，用「第 11 軌」取到的是第 1 片的〈Embraceable You〉，
**多片合訂版必須用 `discNumber` ＋ `trackNumber` 指定，不能用陣列索引**，已修正。
策展層猜的《Dizzy Digs Paris》實查**零重疊，不可採**。
c-135 全批試聽 **35/40**，剩 5 張（全在 a 組：Bechet、Edmond Hall & De Paris、James P. Johnson、Lee Konitz、Garner Vol. 3）走固定無來源狀態。

## 第 473 條（同日，Vogue 授權盤覆核）：**第 461 條四張全部維持原判，但「同年」的推定要寫清楚是推的**

用 a 組 James Moody 那把「同配置才算原盤」的尺覆核：
- **Sadi BLP 5061**：Vogue L.D. 212 與 BN 八軌全同、只有曲序不同 → **Vogue 原盤** ✓
- **Brown Quartet BLP 5047**：Discogs master 1133775 三筆（法 L.D. 179／英 L.D.E. 042／BN 5047）六軌完全相同 → **Vogue 原盤** ✓。
  補一筆策展層沒提的**英版 L.D.E. 042**（1954，jazzdisco 說它才是「originally released」）；三張同年、誰先無法判定，**正文只寫「原盤是 Vogue」**。
- **Gryce–Brown BLP 5048**：兩個 Vogue 版都是 **5 軌**（多〈No Start No End〉）、BN 是 **4 軌** → 配置不同，**BN 為主** ✓。
  另法版 L.D. 175 在 Discogs **無年份**，「同年」只能靠英版推——正文不得寫成查到的。
- **Gillespie BLP 5017**：Discogs 首壓 notes 明寫「US version with two different tracks」→ **BN 為主** ✓。

## 第 474 條（同日，給寫作層與後批）：**1953–55 全 156 期 Billboard 已掃完；10 吋末期的封面 credits 出現 Reid Miles**

b 組掃完 worldradiohistory 的 Billboard **1953–1955 全 156 期**，找到 **8 張的同期評論**：
BLP 5020（1953-10-03，68 分）、5023（同日，65）、5024（1953-10-10，66）、5025（1953-10-31，63）、
5034（1954-06-26，78）、5056（1955-01-29，61）、5061（1955-06-18，74）、5066（1955-11-12，77）。
其餘 11 張 Billboard 未評（含 Miles Vol. 3），年份靠 MB＋Discogs＋jazzdisco 三筆一致、無紙本反證。
**封面實線**：BLP 5055、5066 的封面 credits 已出現 **Reid Miles**（與 John Hermansader、Francis Wolff 並列）；
**Gil Mellé 本人畫了 BLP 5020、5025、5026 三張封面**——同一批裡的實線，寫作層可用。

## 第 475 條（主線 2026-09-16，鉤子層交件後）：**第 466 條漏改一筆——Horace Silver BLP 5018 的 `year` 仍是 1952，已補改 1953**

第 466 條的表列了五列，實際只改了四筆（Quebec／Moody／Miles 5013／Bechet 7025），
**Horace Silver《New Faces New Sounds》BLP 5018 那一列漏改**，鉤子層對卡單時抓到。
已改 `desc-tools/batches/cards/c135-cards.json` 與 `batch-progress/c135/prop-a.json` 的 `year` 與 `label` 欄（1952 → 1953）。

**這是主線自己的疏漏，記在這裡當程序教訓**：裁定表列 N 列、實際改 N-1 筆，**在檔案上與全改完長得一模一樣**
（「失敗與正常長得一樣」家族）。**通則：裁定表如果列了 N 列改動，commit 前要逐列回查卡單值，
commit 訊息的數字（當時寫「4 year fixes」）不能當成驗收依據——那個數字本身就是錯的那一半。**
