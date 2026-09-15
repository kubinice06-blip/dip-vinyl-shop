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
