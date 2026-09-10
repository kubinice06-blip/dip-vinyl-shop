# c-110 德語搖滾／NDW／義大利搖滾流行：策展層裁定（2026-09-06）

依 2026-09-02 店主下放（「不用我裁定 你自己決定」），以下由策展層自決並記錄。
判準沿用三條：有先例照先例、可逆的直接定、卡住整條線就當場定。

交件：`prop-a.json` 22 張／18 位（德語圈），`prop-b.json` 22 張／16 位（義大利），
合計 **44 張、34 位**，`chk-prop.mjs` 標記 **0**（跨批去重掃 60 批、卡數 2,777、跨批撞卡 0）。
**§5.6 合輯 0 張**，44 張全部 `primary-type=Album` 且 `secondary-types` 空。

---

## 1. 派工信的池中張數：Franco Battiato 對、**Lucio Dalla 錯（是 0 不是 1）**

派工信寫「Lucio Dalla(池中 1)、Franco Battiato(2)」。實掃 `seed_cards.json` 全 14,424 列：

| 藝人 | 派工信 | 實掃 | 池中是哪幾張 |
|---|---:|---:|---|
| Franco Battiato | 2 | **2** | 《L'era del cinghiale bianco》(1979)、《La voce del padrone》(1981) |
| **Lucio Dalla** | 1 | **0** | 無——全池含 `Dalla` 的只有 `Jimmy Carter and Dallas County Green` 一筆，是子字串誤配 |

**裁定：以實掃為準。** Lucio Dalla 依「先確認第一張該有的在不在」補兩張（1977／1979）。
這是第 27 條（取樣只能排除、不能確認數量）又一次應驗，成因與 c-102 久石譲那次相同——
**用子字串抽測，`Dalla` 撞到 `Dallas`**。

**Battiato 那兩張的位置很關鍵**：池中已有的正好是 1979 與 1981，本批補的《Patriots》(1980)
**就夾在中間**，《Fisiognomica》(1988) 則把他的目錄往後拉八年。

## 2. 德語骨幹十三位的實掃結果：**九位零、四位有**

派工信說「德語七位抽測全零」。實掃十三位骨幹（每位都用原文與 ae／oe／ue 折音兩種寫法查）：

| 零張（9 位） | 池中已有（4 位） |
|---|---|
| Ton Steine Scherben、Rio Reiser、Ideal、Udo Lindenberg、Die Ärzte、Die Toten Hosen、Fehlfarben、Trio、Kraftklub | Falco 3（Falco 3 / Emotional / Data de Groove）、Rammstein 3（Mutter / [Rammstein] / Liebe ist für alle da）、Nena 2（Nena (1983) / Wenn alles richtig ist…）、Herbert Grönemeyer 1（4630 Bochum） |

**四位「有」的共同形狀：池中的都是後期的碟，最早的那幾張全部缺席。**
Falco 三張全在 1985 年之後（本批補 1982／1984）、Rammstein 三張全在 2001 年之後（本批補 1997）、
Nena 缺 1984–86 樂團時期（本批補《? (Fragezeichen)》）、Grönemeyer 只有 1984（本批補 2002）。

**池中整體的德國卡幾乎全在 krautrock 與金屬兩塊**（Can 5、Kraftwerk 5、Neu! 3、Faust 4、
Amon Düül II 3、Cluster 5、Harmonia 3、Popol Vuh 4、Tangerine Dream 6、Klaus Schulze 3、
Einstürzende Neubauten 9、Scorpions 4、Accept 2、Helloween 5、Kreator 3、Sodom 1），
**唱德語歌詞的搖滾只有上面那 9 張**。這批補完之後這一塊會從 9 張變成 31 張。

## 3. 短掛名回問 `area` 與 `disambiguation` 的結果（裁定 179 第 2 點）

八個高風險掛名全部回問 MB 藝人端點，**八個都有同名實體、其中三個是必撞的**：

| 掛名 | 命中實體 | area／disambiguation | 同名實體 |
|---|---|---|---|
| **Trio** | b013686b-0fa5-4e88-a5bc-f941efc7855a | **DE**、1979、「80s German band」 | ⚠ **`artist:Trio` 直搜回的前四筆全不是它**（[unknown] 特殊實體、The Kingston Trio、The Oscar Peterson Trio、Los Panchos），**要加 `country:DE AND type:group` 才命中** |
| **Ideal** | 4e3f4f52-968c-43ec-b165-741122d7cc28 | **DE**、1980、「German "Neue Deutsche Welle" group」 | e8532a2c（US 休士頓 R&B 四重唱）、fc0c2168、4f6282d8（UK）——三個 |
| **Litfiba** | e68a900e-4fae-493a-84a8-f76ab62d23e4 | **IT**、1980-10、Group | 813f7565「SpiritoLitfiba」 |
| Falco | dcd95aa4-f3ff-492d-a621-8518ada0f58b | **AT**、1957 生 | NL 的 Falco de Beer、葡萄牙 EDM 製作人、一位 producer——三個 |
| Spliff | dbec3b6d-a3f6-410b-9fc5-5cf62008c598 | **DE**、1980、「Neue Deutsche Welle」 | 葡萄牙 hip-hop 製作人、南方 rapper、Wicked Name——三個 |
| Afterhours | 70a709a1-8083-44c4-b61f-f7d10e1004d9 | **IT**、1986、「Italian alternative rock band」 | 2e91e607（UK Celtic band）、99026e96（電子藝人） |
| CCCP | fa08e509-aedb-48a0-bf85-d30034899156 | **IT**、1982 | acd3d634「CCCP」是**德國 synthpop 樂團**——同一批裡德義兩線都在跑，這個最危險 |
| Nena | c954d136（樂團 1982–87）／38bfaa7f（個人 1987 起） | 兩個都 **DE** | 60a066ae（葡萄牙歌手）、e0b74bc5（西班牙歌手） |

**`Trio` 那筆是整批最重要的發現**：搜尋端點對它是瞎的，不是「MB 沒有」。
往後任何三到五個字母、又是通用名詞的掛名，**一律先加 `country:` 再搜**，不要只回問 area。

## 4. Falco《Junge Roemer》：盤名取原盤的 `oe`，**不套「變音一律保留」那條**

派工信要求「德文與義大利文的變音一律照原文保留」「不要為了好查而改寫 ä→ae」。
這張是**例外，而且不是例外的例外，是那條規則本來就不管的情形**。

MB 的 release-group 標題是「Junge Römer」，但**轄下 10 筆 release 有 9 筆印的是「Junge Roemer」**
——1984 AT 原盤（GiG GIG 222 121）、1984 US（A&M SP-4993）、1987 DE（TELDEC）、1996、2016、2019
全部是 oe，只有 2024-04-19 一筆數位再發寫成 Römer。Apple at 1080464639 也作「Junge Roemer」。

**裁定：盤名取 `Junge Roemer`。** 依第 6／50 條「盤名採原始發行的寫法」——
**oe 是唱片封面自己印的，不是我們為了好查做的轉寫**，派工信那條禁的是後者。
第 95 條也明說 release-group 標題與卡片盤名不必相等。MB 的寫法進 `queryAlias`。

（反過來，掛名 `Die Ärzte`／`Måneskin`／`Herbert Grönemeyer`／`Abwärts` 全部保留變音，
ae／oe／ue 折音寫法一律進 `queryAlias`——那是派工信那條規則真正管的地方。）

## 5. 撇號一律取 ASCII `'`，MB 的 U+2019 進 `queryAlias`

本批有兩張的 MB release-group 標題用彎撇號：Måneskin《Teatro d’ira, Vol. I》與 Pino Daniele《Vai mo’》。

**實查池中：帶撇號的盤名 800 張，ASCII 774 張、U+2019 只有 26 張（3%）。**
而且 Pino Daniele 那張的 **1981 IT 原盤 release 標題本身就是 ASCII 撇號**「Vai mo'」，
Måneskin 那張的 JP 版 release 也是 ASCII。

**裁定：兩張都取 ASCII 撇號**，MB 的彎撇號寫法進 `queryAlias`。理由有二：
池中 97% 是 ASCII（不製造第二種鍵），且原盤／實體 release 這一層就是 ASCII（第 50 條）。

## 6. **非 ASCII 連字號不只出現在 `album` 欄——`artist` 欄也會有，而 `chk-prop` 不看**

`chk-prop.mjs` 的反模式檢查只掃 `x.album`。本批實測，**browse 回來的 RG 標題裡有 43 個帶非 ASCII 連字號**，
而且問題也出現在掛名上：

- **CCCP 的 MB artist-credit 是「CCCP – Fedeli alla linea」，用的是 U+2013。**
- Die Toten Hosen《Opel-Gang》轄下有兩筆 release 把標題寫成「Opel‐Gang」（**U+2010**）。
- Blumfeld《Ich‐Maschine》(1992) 的 **release-group 標題本身就是 U+2010**。
- Ligabue《Buon compleanno Elvis 1995–2025》(2025) 用 U+2013。

**裁定三條**：
1. **掛名照 `album` 欄同一個標準辦**：CCCP 取 ASCII 的「CCCP - Fedeli alla linea」，
   MB 的 U+2013 寫法與 Apple 的無連接號寫法（「CCCP Fedeli Alla Linea」）都進 `queryAlias`。
   `chk-prop` 抓不到這一格，只能人工守——**這一條要往上游提，建議 `chk-prop` 的
   非 ASCII 連字號檢查加掃 `artist` 欄**（一行的事，且本批已證明會踩到）。
2. **盤名取 release-group 標題的 ASCII 寫法**（Opel-Gang），不照抄個別 release 的 U+2010 寫法。
3. **release-group 標題本身就是 U+2010 的碟，本批不收**（Blumfeld《Ich-Maschine》）——
   改寫成 ASCII 會與 MB 對不上、照抄會踩 `chk-prop`，兩邊都不乾淨；
   這與第 118 條 Hafler Trio 那張是同一個形狀，記進未收清單留給本機處理。

理由是「可逆」那條：改的是 manifest 欄位，不是卡池結構。

## 7. 掛名的取用順序（裁定 177）在本批的三個實例

| 卡 | 走第幾步 | 定案掛名 | 為什麼 |
|---|---|---|---|
| **Udo Lindenberg &《Andrea Doria》** | **第 2 步**（池中 0 張 → 取 RG 的 artist-credit） | `Udo Lindenberg & Das Panikorchester` | MB 該 RG 的 credit 就是這串。Apple 上兩種語序都有（「Das Panikorchester & Udo Lindenberg」也存在），兩種與縮寫都進 `queryAlias` |
| **DAF《Gold und Liebe》** | **第 1 步**（池中已有 → 沿用池中寫法） | `Deutsch Amerikanische Freundschaft` | 池中《Alles ist gut》掛的是全寫。**Apple 三筆全部掛「DAF」**——若照 Apple 寫就當場生出第二個鍵，`DAF`／`D.A.F.` 進 `queryAlias` |
| **Nina Hagen Band《Nina Hagen Band》** | **第 2 步** | `Nina Hagen Band`（樂團實體 0c017e85） | 不是個人實體 e4d32f51。Apple 那筆的 artistName 是「Nina Hagen, Spliff & Nina Hagen Band」三個掛名串一起，不採 |

**Nena 是第 1 步的邊界案例**：MB 有樂團（1982–87）與個人（1987 起）兩個實體，
**池中兩張分屬兩個時期卻共用同一個鍵 `Nena`**。本批補的《? (Fragezeichen)》屬樂團時期，
仍沿用池中的 `Nena`——**不為了對齊 MB 而把池中一個鍵拆成兩個**（那正是
`audits/pool-artist-name-splits.md` 在警告的形狀）。

## 8. 裁定 173（Apple 兩個端點都要跑）在本批命中 **六次**，是至今最密集的一批

`search` 端點回查無、改打藝人頁 `lookup?id=<artistId>&entity=album` 才找到的：

| 卡 | artistId | 目錄端點找到的 | 成因 |
|---|---|---|---|
| Die Toten Hosen《Ein kleines bisschen Horrorschau》 | 18469884 | 269733978「Ein kleines **bißchen** Horrorschau…」 | **MB 用 ss、Apple 用 ß** |
| Kraftklub《Mit K》 | 1445610005 | 1440778434「Mit K」1
2012、13 軌 | 盤名太短 |
| Spliff《85555》 | 985839019 | 1770960953「**Emergency Exit**」1982、9 軌 | **Apple 用的是美國促銷版的改名** |
| Rino Gaetano《Mio fratello è figlio unico》 | 27378288 | 269002720「Mio Fratello **E'** Figlio Unico」 | **Apple 把 è 寫成 ASCII 的 `E'`** |
| Gianna Nannini《Puzzle》 | 13497899 | 6768666818「Puzzle」1984、8 軌 | 盤名是英文通用詞 |
| Måneskin《Teatro d'ira, Vol. I》 | 1312874741 | 1556035498「Teatro d'Ira **-** Vol. I」 | **Apple 把逗號換成破折號** |

**六次裡有四次的成因是正字差異（ß／ss、è／E'、逗號／破折號、改名再發），不是 Apple 沒上架。**
往後的探測層對德語與義大利語線，**`search` 查無一律不算數，必跑目錄端點**。

另記：Apple 的 403／429 在本批出現 **40 餘次**（`de`／`it` 兩個店面最嚴重），
依第 98 條全部不當查無，已逐張改店面或降速重跑。

## 9. §5.6 一次都沒開——第 167 條第四批應驗

本批瀏覽 **34 位藝人、1,700 餘個 release-group**，`primary-type=Compilation` 的 **0 個**。
NDW（1979–84）那一段派工信預告「很多是小廠與再發，走 §5.6 要完整舉證」——
**實查的結果是那些碟在 MB 上全部建成 `primary-type=Album`**，44 張沒有一張要填例外欄位。

**這與 c-95／c-98／c-100 三批的結論一字不差**，是第 167 條的第四次獨立驗證。

## 10. 骨幹的增刪

**刪（骨幹點名但本批只收一張或不收）**：
- **Ideal 只收 1980 自我同名**（骨幹沒指定張數）——1981《Der Ernst des Lebens》留給下一輪。
- **Udo Lindenberg 只收《Alles klar auf der Andrea Doria》**——他名下 220 個 RG、40 張純 Album，
  一次收一張先建立錨點。
- **Grönemeyer 只收《Mensch》、Rammstein 只收《Sehnsucht》**——兩位池中都已有，補的是最缺的那一格。
- **Nena 只收《? (Fragezeichen)》**——《99 Luftballons》(1984) 是首張的國際版、與池中《Nena (1983)》
  同一批曲目，收了等於重複。

**增（骨幹沒列，本批加進來，全部池中 0 張）**：
- **Nina Hagen Band《Nina Hagen Band》(1978)**——NDW 的起點，班底就是後來的 Spliff。
- **Deutsch Amerikanische Freundschaft《Gold und Liebe》(1981)**——池中已有《Alles ist gut》，
  補 Virgin 三部曲的中間那張。
- **Spliff《85555》(1982)、Palais Schaumburg《Palais Schaumburg》(1981)**——NDW 的兩張核心盤。
- **Grauzone《Grauzone》(1981)**——**瑞士團**。派工信的店面組已含 `ch`，而**池中的瑞士德語區藝人是 0 張**；
  這是 Grauzone 名下 9 個 RG 裡唯一一張純 Album 型（他們只出過這一張專輯）。
- 義大利側加 **Rino Gaetano、Francesco Guccini、Francesco De Gregori、Antonello Venditti**
  （cantautore 四位，池中這條線只有 De André 5／Battisti 4／Paolo Conte 1）、
  **Gianna Nannini**（池中的義大利女性藝人只有 Mina 2 張）、
  **Diaframma**（與 Litfiba 同屬佛羅倫斯 IRA 廠牌，那條線池中全空）。

## 11. 與 c-61／c-55／c-56 的撞卡實掃結果：**零重疊**

派工信要求實掃這三批的義大利卡。逐筆比過 `desc-tools/batches/cards/` 底下全部 145 個檔（3,475 張卡）：

- **c-61（51 張）**的義大利段是 1969–78 的地下 prog（Alphataurus、Museo Rosenbach、
  Biglietto per l'Inferno、Il Rovescio della Medaglia、Metamorfosi、Cervello、Campo di Marte、
  Maxophone、Murple、Pholas Dactylus、Alusa Fallax、Il Paese dei Balocchi、Panna Fredda、
  Errata Corrige、Corte dei Miracoli、Opus Avantra、Raccomandata Ricevuta Ritorno），
  **一位都不在本批名單上**。
- **c-55（45 張）是土耳其／阿拉伯線、c-56（38 張）是捷克／匈牙利／波蘭線，兩批一張義大利卡都沒有。**
- `chk-prop` 的跨批去重（60 批、2,777 張）也回 **0**。

**結論：義大利這條線在池中是「1970 年代地下 prog 17 張 ＋ cantautore／流行 15 張」兩塊，
中間的搖滾主線（Vasco Rossi、Litfiba、Ligabue、CCCP、Afterhours、Diaframma、Marlene Kuntz、
Måneskin）整段是空的**——本批 22 張補的就是這一塊。

## 12. 釘 MBID 的比例：**44/44（100%）**

44 張全部釘住 release-group MBID，並逐張回問
`release-group/<id>?fmt=json&inc=artist-credits+releases` 確認
title／artist-credit／first-release-date／primary-type／secondary-types／轄下 release 的國別與 status。
另逐張跑 `release?release-group=<id>&inc=labels+media` 取廠牌、目錄號與軌數。

**依裁定 179 第 3 點逐張看 `inc=releases`**：本批**沒有一張是「唯一 release 是 Bootleg」**。
帶非 Official 的四張已在 `risk` 明寫：
Rammstein《Sehnsucht》25 筆裡 1 筆 Bootleg／1 筆 Promotion／1 筆未填（其餘 22 筆 Official）、
Ton Steine Scherben《Warum geht es mir so dreckig?》4 筆裡 1 筆 status 未填、
Herbert Grönemeyer《Mensch》11 筆裡 2 筆 Pseudo-Release、
DAF《Gold und Liebe》11 筆裡 1 筆 Pseudo-Release。
另有五張各含 1 筆 Promotion（Spliff、Lucio Dalla《Come è profondo il mare》、Vasco Rossi《Vado al massimo》、
Pino Daniele《Terra mia》、Rino Gaetano），De Gregori《Rimmel》含 2 筆。
**依第 167 條附帶那條，status 未填與 Bootleg 的那幾筆一律不採為「這次再發是 Official」的背書。**

## 13. 「刻意不釘」的對照組：22 張卡共點名 **31 個 MBID**

寫法一律照第 162 條固定成「刻意不釘：`<id>`《盤名》（理由）」，標記寫在 MBID 前面。
本批最危險的四組：

- **Fehlfarben《Monarchie und Alltag》**：MB 有**三個標題逐字相同**的 release-group
  ——1980 Album（本卡）、2000 Album＋Remix、2020 Album＋Live。
- **Trio《Trio》**：同名的還有 2003 Album＋Compilation、1981-02 EP、1982 EP 三個，**加上掛名等於盤名**。
- **Herbert Grönemeyer《Mensch》**：同名條目五個，**其中一個 2002-08-05 的單曲比專輯（08-30）早**
  ——第 179 條第 1 點「取最早那筆會選錯」的同形。
- **Marlene Kuntz《Catartica》**：`Catartica (Live 2024)` 的 `first-release-date` **被建成 1994-01-01**，
  比本卡的 1994-03-27 還早。**這是第 179 條第 1 點的新變形：假陽性的日期不是先行單曲，是建檔錯誤。**

另外三組同名雙胞胎：Lucio Dalla《Lucio Dalla》（1979 九軌 vs 1981 四軌，**只有軌數與目錄號分得出來**）、
Litfiba《El diablo》（同名單曲日期更精確）、Ligabue《Buon compleanno Elvis》（2025 年兩張超字串盤）。

---

## 未收清單

### A. MB 查無而未收：**0 張**

**本批沒有任何一位藝人在 MB 上查無**，34 位骨幹與增補全部命中、且都有 `primary-type=Album` 的正規盤。
**§1 補遺候選：無。** 這與 c-103／c-106 那種「MB 建檔率近零」的線相反——
**歐陸的德語與義大利語在 MB 上建檔非常完整**（本批瀏覽的 1,700 餘個 release-group 就是證據）。

### B. 有資料但本批額度不足、未收（下一輪可直接接手）

**德語（本批 22 張已到 a 組上限）**：
Extrabreit《Ihre größten Erfolge.》(1980，⚠ 盤名結尾有句點)、Abwärts《Amok Koma》(1980)、
Der Plan《Normalette Surprise》(1981)、Xmal Deutschland《Fetisch》(1983)、
Joachim Witt《Silberblick》(1980)、Malaria!《Emotion》(1982)、
Tocotronic《Digital ist besser》(1995)、Element of Crime《Weißes Papier》(1993)、
BAP《Für usszeschnigge!》(1981)、Marius Müller-Westernhagen《Mit Pfefferminz bin ich dein Prinz》(1978)、
Die Fantastischen Vier《Die 4. Dimension》(1993)、Andreas Dorau、Wir sind Helden、Die Sterne、Peter Maffay。
以及 Ideal《Der Ernst des Lebens》(1981)、Udo Lindenberg《Ball Pompös》(1974)、
Die Toten Hosen《Opium fürs Volk》(1996)、Rammstein《Herzeleid》(1995)、Grönemeyer《Ö》(1988)、
Falco《Wiener Blut》(1988)、Kraftklub《In Schwarz》(2014)。

**義大利（本批 22 張已到 b 組上限）**：
Ivano Fossati《La mia banda suona il rock》(1979)、Verdena《Solo un grande sasso》(2001)、
Subsonica《Microchip emozionale》(1999)、Bluvertigo《Metallo non metallo》(1997)、
Massimo Volume《Lungo i bordi》(1995)、Almamegretta《Animamigrante》(1993)、
99 Posse《Curre curre guagliò》(1993)、Consorzio Suonatori Indipendenti《Ko de mondo》(1994)、
Timoria《Viaggio senza vento》(1993)、Negrita《XXX》(1997)、
Elio e le Storie Tese《Eat the Phikis》(1996)、Baustelle《La malavita》(2005)、
Edoardo Bennato《Burattino senza fili》(1977)、Skiantos《Inascoltable》(1977)、
Enzo Jannacci、Giorgio Gaber、Le Orme。
以及 Litfiba《Terremoto》(1993)、Afterhours《Non è per sempre》(1999)、
Battiato《La voce del padrone》以外的 EMI 目錄、Pino Daniele《Bella 'mbriana》(1982)。

**⚠ 99 Posse《Curre curre guagliò》的盤名有兩說**：MB 作「Curre curre guaglió」（acute），
多數義大利來源作「guagliò」（grave）。下一輪收它時要先定，別讓兩種寫法各進一張卡。

### C. 有 MB 條目但**因技術原因**不收（不是查無）：1 張

- **Blumfeld《Ich-Maschine》(1992)**，release-group `304f416a-7905-3880-9bf6-5516d035a03e`。
  **MB 的 release-group 標題是「Ich‐Maschine」，中間是 U+2010（HYPHEN）**，
  照抄會踩 `chk-prop` 的非 ASCII 連字號反模式、改寫成 ASCII 又與 MB 對不上。
  形狀同第 118 條的 Hafler Trio（U+2013）。**這是本批唯一一張因工具面而非資料面拿掉的碟**，
  記在這裡免得日後誤以為「查無」；本機若決定放寬（例如比對時先折連字號），這張可以直接收。

### D. 與池中撞卡而未收：0 張

`chk-prop` 對線上池 14,424 列與跨批 60 批 2,777 張的比對都回 0。
挑碟階段就先避開了池中已有的六張（Battiato 兩張、Pino Daniele 兩張、Nena 首張、DAF《Alles ist gut》）。

---

## 給下游的三件事

1. **店面優先序照派工信的 `de it at ch fr us gb nl` 是對的，但實測有兩個修正**：
   Falco 兩張命中在 **at**（不是 de）、Grauzone 的 1981 原盤登記在 **GB**（EMI EMC 3408A）而不是 CH，
   義大利卡有一半是靠 **gb** 命中的（`it` 店面回 403 的比例最高）。
2. **`de` 與 `it` 兩個店面的 403／429 特別密集**，探測層對這兩個店面要降速（本批降到 2.5 秒／次才穩）。
3. **44 張的 CAA release-group 端點一次都沒實測**（時間全用在 MB 逐張回問與 Apple 兩個端點上），
   封面命中率無法預估，`probe-caa-generic` 要照跑。
