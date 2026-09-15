
## 第 480 條（2026-09-15，c-136 b 組）：**《Birks' Works》退——列舉假陽性，Blue Note 的關聯是 MB 把一張 Various Artists 合輯掛錯 RG**

列舉檔 note 標「BN 首發 1993，原盤 1957 可能他廠」。回問 release 端點：RG e7dfd8de 轄下 8 筆，原盤是 **Verve MGV 8222**（1957／58 US）、
其餘是 Verve 澳／法／日再發；唯一掛 Blue Note 的是 78586965（1993 GB CD，0777 7 89032 2 2）。
**Discogs 以 catno 反查：0777 7 89032 2 2 是「Various – Birks' Works」——Blue Note／EMI UK 1993 的合輯 CD**，
與 Gillespie 的 Verve 專輯只是同名。MB 把它掛進 Verve 專輯的 RG，列舉腳本因此把一張 Verve 盤算成 Blue Note 目錄。
**不是簡報第一節第 3 點「原盤他廠、取他廠年」那個形狀**（那是 Blue Note 確實再發過的 Pacific Jazz／Roulette 材料），
Blue Note 從未持有這張。**退掉，理由分類：列舉假陽性（MB release 掛錯 RG）。**
另記：這張本身值得收（Discogs master 591539 記 1958、維基 1958；池中 Gillespie 7 張、1957 Verve 大樂團只有 at Newport），
**留給 Verve 線當 §1 候選**，rgMbid e7dfd8de-c018-4c66-a0f4-b67047813593，年份要判 1957／1958。
掛名亦要處理：MB 建成獨立群組實體 `Dizzy Gillespie Big Band`（9ff4c13a），依第 363 條第 2 形應收攏到池中 `Dizzy Gillespie`。

## 第 481 條（同批）：**《Hank Mobley Quintet》同碟兩個 RG，掛 Cedar Walton 那個退**

4ce8c3f5（credit「Cedar Walton & Hank Mobley Quintet」，1 筆 release「BN 1550」Vinyl 6 軌）與 210fc978（credit「Hank Mobley」，
BLP 1550，4 筆 release）是同一張碟：同 catno、同 6 軌、同 1957。Cedar Walton 1957 年不在 Blue Note（Apple 上「The Cedar Walton/Hank Mobley Quintet」
是 1972 Cobblestone 的《Breakthrough!》），MB 那筆是把 1972 的聯名團當成 1957 的掛名建進去的錯 RG，連 `Hank Mobley Quintet` 群組實體（440b4265）都只掛它。
**釘 210fc978，4ce8c3f5 退，理由分類：同碟重複 RG（MB 掛名建錯）。** 簡報二.1 說「盤名＋掛名撞了先查是不是同一個 RG」——這次是**同盤名、不同掛名、不同 RG，仍是同一張碟**，
`chk-prop` 的 rgMbid 掃描抓不到（兩個 UUID 不同），要靠 catno＋軌數對。

## 第 482 條（同批）：**編制掛名一律收攏到池中多數寫法——本組四張，並提醒 a 組與 c-135 同形**

依第 363 條第 2 形：
| MB credit | 本卡掛名 | 池中依據 |
|---|---|---|
| `The Horace Silver Quintet`（群組實體 e9ac5139）《The Stylings of Silver》 | `Horace Silver` | 池中 8 張含 MB 同樣掛 Quintet 的《6 Pieces of Silver》 |
| `Hank Mobley Sextet`（群組實體 48bc1b2a）《Hank》 | `Hank Mobley` | 池中 10 張 |
| `Lou Donaldson Quintet with Donald Byrd, Herman Foster, John "Peck" Morrison & Art Taylor`《Wailing With Lou》 | `Lou Donaldson` | 池中 8 張，無 Quintet 字串 |
| `Art Blakey`《Orgy in Rhythm, Volume Two》 | `Art Blakey` | 照 MB；池中 `Art Blakey` 1 張先例（Child's Dance），**不掛進任一 Messengers 字串**（audits 第 1 組分裂形） |

**⚠ 同批 c-135 與 c-136 a 組的 slice 裡有 `The Horace Silver Trio`／`The Horace Silver Quintet`／`Horace Silver Trio And Art Blakey`／
`Lou Donaldson Sextet`／`Jutta Hipp Quintet`／`The Art Blakey Quintet`／`The Jazz Messengers` 等編制掛名**——若照 slice 字串直接交件，
池中會多出五六組新分裂。建議主線收件時統一：**個人編制（Trio／Quintet／Sextet）收攏到本人；`The Jazz Messengers`／`The Art Blakey Quintet` 另議**
（Messengers 那兩個字串在池中本來就分裂成 `and the`／`& The` 兩邊，第 362 條已記）。

**聯名維持**：`Cliff Jordan & John Gilmore`《Blowing in From Chicago》照 MB 聯名（第 363 條第 1 形），credited-name「Cliff」照 MB；
同組 BLP 1565 的本人卡掛 `Clifford Jordan`（池中字串），兩者 risk 互指、不算分裂。

## 第 483 條（同批）：**盤名照 MB RG title 逐字，變體全進 queryAlias——五張的坑列出來給研究層決定要不要改**

| 本卡盤名（MB RG title） | 店面／封面／維基寫法 |
|---|---|
| Jutta Hipp《With Zoot Sims》 | 全部寫「Jutta Hipp With Zoot Sims」（Discogs 連掛名都寫成這串） |
| Lee Morgan《Volume 2, Sextet》 | Apple「Lee Morgan Sextet, Vol. 2」、維基「Lee Morgan, Volume 2」、Discogs「Volume 2 - Sextet」 |
| Lee Morgan《Vol. 3》 | 1957 原盤 release title「Volume 3」、維基「Lee Morgan, Vol. 3」；池中同形先例 `Sonny Rollins, Volume 2`（盤名帶掛名） |
| Hank Mobley《Hank Mobley Quintet》 | 1957 原盤 release title「Hank Mobley With Farmer, Silver, Watkins, Blakey」、2019 Music Matters「Quintet」 |
| Jimmy Smith《Jimmy Smith at the Organ: Plays Pretty Just for You》 | Discogs／Apple／維基全用短名「Plays Pretty Just for You」（第 45 條「現行流通名」可能是短名） |

MBID 都已釘，改盤名不影響身分。**本組不自行改，留研究層／主線一次決定**（Blue Note 1500 系列前段 c-135／c-136 a 組同形很多，該一批一起定）。

## 第 484 條（同批）：**年份改判一張（City Lights 1957→1958），四張兩說維持 MB**

- **《City Lights》BLP 1575 改 1958**：MB first-release-date 1957 但原盤 release 無月日；Discogs master 298362 主版本 1958、
  維基「recorded August 25, 1957 and released the following year」、Apple 1958-06-01——三邊 1958，MB 的 1957 是錄音年形（第 364 條、第 366 條《Playboys》先例）。
  正文可寫 1957 年 8 月錄音、不得斷言發行月。
- **維持 MB 的四張**：《Indeed!》1957（MB 1957-02 帶月，維基說 1956）；《Jimmy Smith at the Organ, Volume 1》1957（MB＋維基 1957，Discogs 主版本 1958）；
  《Blowing in From Chicago》1957（MB 1957-05，維基說 7 月——年一致、月不寫）；《Quartet/Quintet/Sextet》1957（MB 的 1957-05-24 出自 2017 數位版、
  Apple 同日期是**同源不是交叉驗證**，第 431 條）。
- **Apple 的 releaseDate 在這批幾乎全是錄音日或 01-01 placeholder**（All Stars 1957-01-13、Stylings 1957-05-08、Plays Pretty 1957-05-08、
  Cliff Jordan 1957-06-02、Hank 1957-02-03 甚至早於錄音日）——**Blue Note 目錄的店面日期不能當年份來源**，只能當觀察。

## 第 485 條（同批）：**《A Date With Jimmy Smith》Vol. 1／2 的 Live 標記存疑——Manhattan Towers 是錄音場地不是演出場所**

MB secondary-types 兩張都是 [Live]，列舉檔跟著標 live。但維基只記 1957-02-11～13 錄音日與人員、無場地與觀眾描述；
同三天錄出的《The Sounds of Jimmy Smith》《At the Organ Vol. 1》MB 都是錄音室盤；Discogs 把同月的《Orgy in Rhythm》主版本的 Manhattan Towers 記成 studio credit。
**本組照第 397 條兩邊都不下結論：卡單仍依列舉檔標 live，risk 寫明存疑，正文不得寫成演唱會，研究層以實體盤背面說明核定。**
這是 secondary-types 「非空不代表現場」的方向（第 253 條的鏡像方向、第 397 條）。

## 第 486 條（同批）：**同三天錄音拆成四張——正文要分清編制，不得互抄陣容**

1957-02-11～13 Manhattan Towers 三天，Blue Note 拆出 BLP 1547／1548（A Date Vol. 1／2，全員 jam＋二重奏／三重奏）、1551／1552（At the Organ Vol. 1／2，
Donaldson／Burrell／Blakey 四重奏）、1556（The Sounds of Jimmy Smith，McFadden／Bailey 三重奏）。本組收 1547／1548／1551／1556 四張、1552 落下一批。
各算一張（簡報一.6），risk 五向互指；**寫作層每張只寫自己那張的編制**。
另兩組同形：Orgy in Rhythm Vol. Two（Vol. One a81322c9 落下一批）；Sonny Rollins Vol. 1（Vol. 2 已在池、**不同場**，正文不得寫成同場拆賣）。

## 第 487 條（同批）：**10 吋重組 12 吋：《Quartet/Quintet/Sextet》與 c-135 的兩張 10 吋 RG 是同一批錄音**

BLP 1537 是 1952–54 三場 10 吋錄音（BLP 5021／5030／5055）的 12 吋合訂，c-135 已以 10 吋 RG 各算一張（415c20a3、7cd2823a）。
依簡報二.3 各算一張，risk 互指；**Discogs 把它標成 Compilation、MB 與 Apple 當一般專輯，本卡 releaseType 照 MB 記 Album 不走 §5.6**——
1500 系列前段的 12 吋合訂是通例，走 §5.6 會把 c-135／c-136 a 組十幾張全部拖進舉證。

## 第 488 條（同批）：**實掃與交件數字**

- 實掃卡池（seed 16,450 列＋ c100–c134 cards）：**本組 22 筆撞池 0**；掛名層 Jimmy Smith 11／Lee Morgan 12／Lou Donaldson 8／Sonny Rollins 17／
  Hank Mobley 10／Art Blakey 個人 1／Horace Silver 8／Clifford Jordan 2／Jutta Hipp 0／John Gilmore 0——**十位裡 1956–1957 的 Blue Note 領銜盤全部是零**。
- rgMbid 與 c-135（45）、c-136 a（23）交叉：重疊 0。
- **交件 20 張、退 2 張**（第 480、481 條）；年份改判 1（第 484 條）；**CAA RG 層封面 20/20 命中**（front 皆 true；其中 4 張來源是再發 CD／數位而非原盤圖：
  Sounds of Jimmy Smith、Volume 2 Sextet、Quartet/Quintet/Sextet、Cliff Jordan——研究層看版式）。
- 店面觀察（Apple us `search` 一種查法）：17/20 命中、3 張未命中（Sounds of Jimmy Smith、Sonny Rollins Vol. 1、Blowing in From Chicago）——只是觀察，研究層走藝人目錄與 collectionId。
- `chk-prop b`：標記 0（跨批撞卡 0、同 rgMbid 不同掛名 0）。
- MB 端點觀察：release-group 的 first-release-date 在 1957 這段幾乎都無月份；**《Quartet/Quintet/Sextet》兩筆數位 release 重複建檔**（05f06da8／9005dbba 同 barcode）。
