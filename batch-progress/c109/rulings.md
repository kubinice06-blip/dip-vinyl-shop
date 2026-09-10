# c-109（法語搖滾與 80s 後流行）策展層裁定與未收清單

2026-09-06。輸出 `prop-a.json` 24 張 8 位、`prop-b.json` 21 張 10 位，**合計 45 張 18 位**。
`node batch-progress/c109/chk-prop.mjs` → **標記 0**（跨批去重掃 59 批 2,733 卡，撞卡 0）。
**釘住 release-group MBID：45／45＝100%**，全部逐筆回問
`release-group/<id>?fmt=json&inc=artist-credits+releases` 核過 title／artist-credit／
first-release-date／primary-type／secondary-types／轄下 release 的國別與 status。
**`releaseType: Compilation` 0 張，§5.6 一次都沒開**（呼應裁定 167：45 張全是
`primary-type=Album` ＋ `secondary-types` 空）。

---

## 一、實掃結果：池中法語線現況

實掃 `seed_cards.json` 全 **14,424** 列（非取樣，裁定 27）。

### 抽測的八位全零，本批全部補上

| 藝人 | 池中 | 本批收 |
|---|---:|---:|
| Alain Bashung | **0** | 5 |
| Noir Désir | **0** | 4 |
| Johnny Hallyday | **0** | 3 |
| Les Rita Mitsouko | **0** | 3 |
| -M-（Matthieu Chedid） | **0** | 2 |
| Dominique A | **0** | 2 |
| Claude François | **0** | 3 |
| Étienne Daho | **0** | 4 |

### 池中已有、本批補深的

| 藝人 | 池中已有（實掃） | 本批補 |
|---|---|---:|
| Téléphone | 《Crache ton venin》(1979) | 3 |
| Indochine | 《L'Aventurier》(1982) | 2 |
| Mylène Farmer | 《Ainsi soit je...》(1988) | 3 |
| Sébastien Tellier | 《Confection》(2013) | 3 |
| Celine Dion | 《Falling into You》《The Colour of My Love》《Let's Talk About Love》——**三張全是英語盤** | 2（法語盤） |
| PNL | 《Deux frères》(2019) | 2 |
| IAM | 《Ombre est lumière》《L'École du micro d'argent》《Revoir un printemps》——**缺首張** | 1 |
| Justice | 《Cross》《Woman》《Hyperdrama》——**四張正規盤只缺一張** | 1 |
| M83 | 6 張，**2011→2023 中間十二年是空的** | 1 |
| Angèle | 《Brol》(2018) | 1 |

### 池中法語線的其餘分布（供下一批參考）

- **香頌一代（c-47 那一段）**：Jacques Brel 4、Serge Gainsbourg 4、Françoise Hardy 4、
  Barbara 2、Georges Brassens 1、Léo Ferré 1、Juliette Gréco 1、France Gall 1、
  Michel Polnareff 1、Jacques Dutronc 1、Jane Birkin 1、Véronique Sanson 1、
  Michel Berger 1（《Starmania》）、Jacques Higelin 1、Renaud 1、Jean-Jacques Goldman 1。
- **搖滾／世界**：Gojira 5、Manu Chao 4、Alan Stivell 3、Magma 2。
- **電子與 French touch**：Air 6、Daft Punk 5、Laurent Garnier 4、Stromae 3、
  Phoenix 2、Cassius 2、St Germain 2、Gesaffelstein 2、David Guetta 2、
  Kavinsky 1、Breakbot 1、Bob Sinclar 1、Christine and the Queens 1。
- **rap**：MC Solaar 4、Suprême NTM 4、Booba 1、Nekfeu 1、Orelsan 1。

### c-47 與 c-98 已收的那幾張

- **線上池裡**（已上架）：Georges Brassens 1 張、Léo Ferré 1 張、Jacques Brel 4 張、
  Alan Stivell 3 張。
- **c-98 待上架**（`prop-*.json` 還沒建卡單）：
  Georges Brassens 2 張（《Nº2 : Georges Brassens interprète ses dernières compositions》
  《Nº10 : Les Copains d'abord》）、Léo Ferré 2 張（《Verlaine et Rimbaud chantés par Léo Ferré》
  《Il n'y a plus rien》）、Alan Stivell 2 張（《Reflets》《E langonned (A Langonnet)》）。
  **`dedup-crossbatch` 已把這 6 張一起比過，本批與它們撞卡 0。**
  本批刻意**不碰 Brel／Brassens／Ferré／Gréco／Barbara 那一代**，只做它之後的整段。

---

## 二、短掛名回問 `area` 與 `disambiguation` 的結果（裁定 179 第 2 點）

六個短掛名**全部回問藝人端點**，**六個全是法國實體，沒有一個踩到 `cero*` 那種坑**；
但**四個有同名別實體**，都寫進了 `mbNote`。

| 掛名 | MBID | type | **area** | disambiguation | 同名別實體 |
|---|---|---|---|---|---|
| **-M-** | `99513c45` | Person | **France／Boulogne-Billancourt** | Matthieu Chedid | 無（但 MB 主名是 U+2010，見裁定 3） |
| **IAM** | `7aa4a16e` | Group | **France／Marseille** | French rap band | **3 個**：`IAM.`(Europe／dark ambient)、`IAM`(Germany)、`IAM`(United States) |
| **NTM** | `0135e5ec` | Group | **France／Paris** | —（MB 主名是 `Suprême NTM`） | **3 個**：`N.T.M.`(Italy)、`NTM`(Germany)、`The Famous NTM`(FR emo crust) |
| **PNL** | `da04991d` | Group | **France／Corbeil-Essonnes** | French rap duo | **2 個**：`pnl(a)`(Canada)、`PNLTYBX`(Raleigh NC) |
| **Justice** | `860b2707` | Group | **France／Paris** | French electro house, Gaspard Augé & Xavier de Rosnay | **3 個**：`Justice`(United Kingdom／drum & bass)、`Justice`(Germany／thrash-death metal)、`Justice`(Belgium／hardcore) |
| **M83** | `6d7b7cd4` | Group | **France／Antibes** | — | 無 |

**額外一筆**：**`Angèle` 的 area 是 Belgium／Linkebeek，不是 France**
（`dcd4701d`，disambiguation「Belgian female singer, Angèle Van Laeken」）。
店面組已含 `be`，不影響；但下游若以「法國藝人」為篩選條件會漏掉她。

---

## 三、本批立的裁定

### 裁定 1（c-109）：**Celine Dion 的掛名採池中既有的無重音寫法**

派工信寫「法文的重音一律照原文保留……`Céline Dion`」。**實掃後改採無重音的
`Celine Dion`**，理由是**裁定 177 的取用順序第 ① 步優先**：

- **池中已有三張，全部寫成 `Celine Dion`**（《Falling into You》《The Colour of My Love》
  《Let's Talk About Love》）。
- `chk-prop` 與 `dedup-crossbatch` 的正規化**保留字母**（`\p{L}`），
  `céline` 與 `celine` **不會摺成同一個鍵**——寫成 `Céline Dion` 會當場生出
  第二個掛名鍵、把池中那三張與新收的兩張切成兩位藝人，
  正是 `audits/pool-artist-name-splits.md` 在警告的形狀。
- MB 實體與 artist-credit 是 `Céline Dion`，已完整記進 `mbNote`，
  帶重音形也進了 `queryAlias`（外部服務兩種都認）。

**這不推翻裁定 26／70**：那兩條講的是「沒有池中先例時，用原文的寫法」。
本批其餘七位新掛名（`Noir Désir`、`Étienne Daho`、`Les Rita Mitsouko`、
`Claude François`、`Mylène Farmer`、`Sébastien Tellier`、`Angèle`）**全部保留重音**，
因為它們在池中不是零就是已經帶重音。

### 裁定 2（c-109）：**`-M-` 用 ASCII hyphen-minus，不用 MB 的 U+2010**

**MB 藝人實體的主名與兩張 release-group 的 `artist-credit` 都是 `‐M‐`，
用的是 U+2010 HYPHEN，不是 ASCII hyphen-minus。** 依裁定 177 ② 本該照抄 credit，
但這一筆做了**單一字元的正規化**，三個理由：

1. **MB 自己就登記了 ASCII 形**：該實體的 alias 表含 `-M-`、`Matthieu Chédid`、`Matthieu Chedid`。
   這不是自創寫法（裁定 26 禁的是自創），是 MB 提供的兩種寫法裡選一種。
2. **Apple fr 的 `artistName` 是 ASCII 的 `-M-`**，`queryAlias` 以外的每一條外部服務
   都拿卡片掛名字串去打，U+2010 一律落空。
3. **鍵不受影響**：`chk-prop` 的 `k()` 與 `dedup-crossbatch` 的 `strip()` 都把標點整個丟掉，
   `‐M‐` 與 `-M-` 都正規化成 `m`，不會製造分裂。**受影響的只有顯示與外查，兩者都指向 ASCII。**

已實掃確認：**池中沒有任何掛名正規化後等於 `m`**，這是一個乾淨的新鍵。
U+2010 形記在兩張卡的 `mbNote`，**不進 `queryAlias`**（裁定 25：alias 只填外部服務認得的字串）。

### 裁定 3（c-109）：**盤名裡的 U+2010、U+2019、U+2026 一律改 ASCII**

MB 的法語盤名大量使用排印字元。本批的處理一律是：**卡片用 ASCII，MB 原形記在 `mbNote`**。

| 字元 | 出現在 | 卡片寫法 |
|---|---|---|
| **U+2010 HYPHEN** | Angèle《Nonante‐cinq》 | `Nonante-cinq` |
| **U+2019 撇號** | Noir Désir《Veuillez rendre l’âme…》、Claude François《Comme d’habitude》、Céline Dion《S’il suffisait d’aimer》、Mylène Farmer《L’Autre…》、Sébastien Tellier《L’Incroyable Vérité》等 | ASCII `'` |
| **U+2026 刪節號** | Mylène Farmer《L’Autre…》、IAM《… de la planète Mars》 | ASCII `...` |

判準有二：
- **U+2010 是硬性的**：`chk-prop` 明文擋盤名裡的非 ASCII 連字號（c-50 反模式），不改就交不了件。
- **U+2019／U+2026 是池中先例**：池中既有的法語卡全部用 ASCII
  （`L'Aventurier`、`L'Homme à tête de chou`、`L'École du micro d'argent`、
  **`Ainsi soit je...`**——最後這張正是 MB 作《Ainsi soit je…》而池中作三點的直接先例）。
  依裁定 177 ①「池中已有就沿用池中寫法」，這裡沿用的是池中的**排印慣例**。

**重音不在此列**：重音是字母、不是標點，正規化摺不掉，一律保留（裁定 26／70）。

### 裁定 4（c-109）：**Johnny Hallyday 改收《Gang》與《Sang pour sang》，剔除《Hamlet》**

派工骨幹沒指定曲目。原先選《Vie》(1970)／《Hamlet》(1976)／《Rock'n'Roll Attitude》(1985)，
**實查後改成《Vie》(1970)／《Gang》(1986)／《Sang pour sang》(1999)**：

- **《Hamlet》（`a514a96f`，1976-11-07，MB 上 3 筆 FR／Official）在 Apple 的
  `fr`／`be`／`ch`／`ca`／`us`／`gb`／`de`／`nl` 八個店面、search 與藝人目錄兩個端點都查無。**
  MB 有建檔，所以**不是 §1 候選**；但封面與試聽兩條線同時落空，本批先不收。
- **《Rock'n'Roll Attitude》（`7dfa5e31`，1985）**有 Apple（fr 1444009075，10 軌），
  但與《Gang》(1986-12) 只差一年、同屬同一段；**《Gang》全碟由 Jean-Jacques Goldman 作曲填詞，
  而池中已有 Goldman《Entre gris clair et gris foncé》(1987)**，兩張互為上下游，選它。
- 《Sang pour sang》(1999) 補 90 年代那一格，三張落在 1970／1986／1999。

Hallyday 名下 **442 個 release-group**（`release-group?artist=…&limit=100&offset=` 五頁分頁全列）
是本批最大的一份目錄，剩下的整批都列在下面的未收清單。

### 裁定 5（c-109）：**MC Solaar 與 Suprême NTM 本批不收**

派工骨幹兩位都在名單上，**實掃後判定池中已經夠深**：

- **Suprême NTM 池中 4 張**（《Authentik》《1993... J'appuie sur la gâchette》
  《Paris sous les bombes》《Suprême NTM》）——**MB 上他們的 `primary-type=Album`
  且 `secondary-types` 為空的錄音室盤總共就是這 4 張**，其餘 8 筆是 Live、Remix
  （《Le Clash》四回合）與 Compilation。**目錄已經全在池中，沒有可補的。**
- **MC Solaar 池中 4 張**（《Qui sème le vent récolte le tempo》《Prose Combat》
  《Paradisiaque》《Cinquième as》），是法語 rap 這條線池中最深的一位；
  可補的《MC Solaar》(1998)／《Mach 6》(2003)／《Chapitre 7》(2007)／《Géopoétique》(2017)
  優先度低於 PNL（池中 1 張）與 IAM 的首張，且本批已到 45 張上限。**移進未收清單。**

### 裁定 6（c-109）：**Apple 的 search 端點對法語目錄漏了五張，全部靠藝人目錄端點救回**

裁定 173 第 N 次成立，這次的形狀集中在**標了 explicit 的法語 rap／rock**與**只剩再版在架上的老碟**：

| 碟 | search 端點回什麼 | 藝人目錄端點的正解 |
|---|---|---|
| Noir Désir《666.667 Club》 | **八個店面全空** | fr `1443159119`（13 軌，1996，explicit） |
| Noir Désir《Tostaky》 | 2022 年的〈Tostaky (Live)〉單曲 | fr `1443608935`（12 軌，1992，explicit） |
| PNL《Dans la légende》 | **八個店面全空** | fr `1663880916`（18 軌，2016，explicit） |
| Claude François《Magnolias for Ever》 | 2022 年的〈Fred Falke Remixes〉單曲 | fr `274663463`（10 軌） |
| Angèle《Nonante-cinq》 | 2022 年的《Nonante-Cinq La Suite (Deluxe)》19 軌 | fr `1597503852`（12 軌，2021 原版） |

**兩個端點都跑才拿得到 41→45 的覆蓋率。** 45 張裡 **44 張**查到了 Apple `collectionId`
（唯一的例外是被剔除的 Hallyday《Hamlet》，已不在提案內），
**全部命中 `fr` 店面，另有兩張只在 `be` 命中**（Mylène Farmer《L'Autre...》、
Étienne Daho《Mythomane》）——`be` 這個鄰接店面不是可有可無的。

### 裁定 7（c-109）：**`inc=releases` 抓到兩張的 Bootleg，但兩張都留**

依裁定 179 第 4 點逐筆看轄下 release：

- **Indochine《Paradize》**：8 筆 release 裡有一筆 RU 的 **Bootleg**（Columbia 5076362000）。
- **Mylène Farmer《Anamorphosée》**：12 筆 release 的 status 含 Official 與 **Bootleg**。

**兩張的 FR 原盤都是 Official，所以收**（裁定 179 剔除的是「**唯一** release 是 Bootleg」那種）；
但 `risk` 已明令**再發背書不採那兩筆**（裁定 43／57）。
另有五張帶 **NOSTATUS**（Téléphone《Au cœur de la nuit》《Dure Limite》的 2015 Parlophone、
Noir Désir《Des visages des figures》），主要壓片皆 Official，依裁定 167 附帶結論**不必再翻 Discogs 版本頁**。

---

## 四、未收清單

### A. MB 查無而未收：**0 張**

**本批 45 張候選外，另外評估過的每一張在 MB 上都有 `primary-type=Album` 的 release-group。**
→ **§1 補遺批候選 0 張。** 這與 c-103／c-106 那種東亞老碟批相反：
法語圈 1960 年代之後的商業發行在 MB 上建檔完整（本批 18 位藝人合計 **1,652 個 release-group**）。

### B. MB 有、本批因額度或優先度未收（下一批可直接接手，MBID 已備）

**a 組（搖滾）**

| 藝人 | 未收 | MB release-group |
|---|---|---|
| Alain Bashung | 《Roman photos》1977 / 《Pizza》1981 / 《Figure imposée》1983 / 《Passé le Rio Grande》1986 / 《Novice》1989 / 《Chatterton》1994 / 《L'Imprudence》2002 / 《La Ballade de Calamity Jane》2006 | `26b962d8` / `1791e1ba` / `7ab7249f` / `de78f795` / `012984d6` / `4bd765d3` / `b0eaf228` / `0bb4c7d5` |
| Noir Désir | 《Où veux-tu qu'je r'garde ?》1986 / 《Du ciment sous les plaines》1991 | `88ae77ce` / `30e206e1` |
| Johnny Hallyday | 《Hamlet》1976（見裁定 4）/ 《Rock'n'Roll Attitude》1985 / 《Flagrant délit》1971 / 《La Terre promise》1975 / 《Cadillac》1989 / 《Rough Town》1994 / 《Lorada》1995 | `a514a96f` / `7dfa5e31` / `b055d2e0` / `6b55674b` / `a0dc368f` / `dc375e6a` / `035080b0` |
| Téléphone | 《Un autre monde》1984（**五張正規盤裡池中將只缺這一張**） | `2d0f0328` |
| Indochine | 《Le Péril jaune》1983 / 《7000 danses》1987 / 《Le Baiser》1990 / 《Dancetaria》1999 / 《Alice & June》2005 / 《Black City Parade》2013 / 《13》2017 | `b85c6cda` / `52863f73` / `7588fbcb` / `25140b61` / `75741e09` / `e30601ad` / `062a2d9b` |
| Les Rita Mitsouko | 《Système D》1993 / 《Cool Frénésie》2000 / 《La Femme Trombone》2002 / 《Variéty》2007 | `ca47f639` / `87c63edc` / `3d6fdb8d` / `f6e7a3bc` |
| -M- | 《Je dis aime》1999 / 《Mister Mystère》2009 / 《Îl》2012 / 《Lettre infinie》2019 | `04bd84e4` / `a62f5170` / `fc95149b` / `6a48f86b` |
| Dominique A | 《Un disque sourd》1991 / 《Si je connais Harry》1993 / 《La Mémoire neuve》1995 / 《Auguri》2001 / 《L'Horizon》2006 / 《Vers les lueurs》2012 / 《Éléor》2015 | `2597f1fb` / `f082dd7d` / `ef56e384` / `dfdad801` / `f3af41ee` / `671f8980` / `14957dc5` |

**b 組（流行與 rap）**

| 藝人 | 未收 | MB release-group |
|---|---|---|
| Claude François | 《Éloïse》1968 / 《Le monde extraordinaire de Claude François》1970 / 《Le Mal-Aimé》1974 / 《Le Vagabond》1976 / 《Bordeaux Rosé》1978（身後） | `e8041518` / `512294e8` / `bcc93602` / `41d5aa1a` / `e16f6c59` |
| Mylène Farmer | 《Innamoramento》1999 / 《Avant que l'ombre…》2005 / 《Point de suture》2008 / 《Désobéissance》2018 | `a2e55b13` / `a0db2314` / `f2fecc64` / `266f2363` |
| Étienne Daho | 《Pour nos vies martiennes》1988 / 《Paris ailleurs》1991 / 《Corps & armes》2000 / 《L'Invitation》2007 / 《Blitz》2017 | `0a0efbd2` / `577bda5b` / `e85c77dc` / `ae3e4b07` / `5628f911` |
| Sébastien Tellier | 《My God Is Blue》2012 / 《L'aventura》2014 / 《Domesticated》2020 | `ef5ba13d` / `f0822f65` / `a2a8f820` |
| Celine Dion | 《Incognito》1987 / 《Dion chante Plamondon》1991 / 《1 fille & 4 types》2003 / 《D'elles》2007 / 《Sans attendre》2012 / 《Encore un soir》2016（**皆法語盤**） | `d6084692` / `49230064` / `d9d3c123` / `8a90f0f8` / `a814e997` / `51ba9ee7` |
| PNL | 《Que La Famille》2015-03（**首張，優先度最高**） | `2e1cc0aa` |
| IAM | 《Concept》1990 / 《Saison 5》2007 / 《Arts martiens》2013 / 《… IAM》2013 / 《Rêvolution》2017 / 《Yasuke》2019 | `e02ab2e8` / `d63b80be` / `3f6ead4d` / `730dfd10` / `f50a2e4f` / `e0029417` |
| M83 | 《Digital Shades [vol. I]》2007 / 《DSVII》2019 | `3e84bc0f` / `08f2cc79` |
| MC Solaar | 《MC Solaar》1998 / 《Mach 6》2003 / 《Chapitre 7》2007 / 《Géopoétique》2017（見裁定 5） | `2745863f` / `19b88649` / `6991bf74` / `677890b5` |
| Suprême NTM | **無**——四張錄音室盤池中已全有（見裁定 5） | — |

### C. 與池中撞卡而未收（實掃確認，不重複收）

Téléphone《Crache ton venin》、Indochine《L'Aventurier》、Mylène Farmer《Ainsi soit je...》、
Angèle《Brol》、PNL《Deux frères》、Justice《Cross》《Woman》《Hyperdrama》、
M83 六張、IAM 三張、Sébastien Tellier《Confection》、
Celine Dion 三張英語盤、MC Solaar 四張、Suprême NTM 四張。

**一筆順帶回報（本批未動）**：池中 `Justice — Cross` 那張的年份欄記 **1992**，
但 Justice 該碟（MB `867d4882`《✝》）的 first-release-date 是 **2007-06-06**。
這是既有卡的年份問題，不是本批的撞卡，**留給本機處理**。

---

## 五、封面與試聽預估

- **Apple `collectionId` 命中 45／45**（全部走 `fr` 為主，`be` 補兩張），
  店面組 `fr be ch ca us gb de nl` 實測全部正常。
- **要人工指定 collectionId、不能靠字串配對的有 9 張**（`risk` 都已寫明）：
  Noir Désir《666.667 Club》《Tostaky》、PNL《Dans la légende》《Le Monde Chico》、
  Claude François《Magnolias for Ever》、Angèle《Nonante-cinq》、
  Indochine《Paradize》《3》、Johnny Hallyday《Vie》。
- **Apple 配到的是再版／豪華版、原盤軌數不同的有 7 張**（`risk` 都已註明原盤軌數，
  行文不得拿再版曲目當原盤——裁定 141）：
  Indochine《Paradize》(+10 Édition deluxe 28 軌／原盤 15)、
  Mylène Farmer《Anamorphosée》(Deluxe 24 軌／原盤 12)、
  Dominique A《La Fossette》(Édition spéciale 31 軌／原盤 13)、
  Dominique A《Remué》(Edition spéciale 27 軌／原盤 14)、
  Angèle《Nonante-cinq》(La Suite Deluxe 19 軌／原盤 12)、
  IAM《… de la planète Mars》(23 軌 CD／12 吋原盤 18)、
  Mylène Farmer《Cendres de lune》(12 軌／1986 原盤 9)。
- **explicit 版本要辨**（裁定 166／`audits/cleaned-previews-hiphop.md`）：
  PNL 兩張與 Noir Désir 兩張的 Apple 條目標 explicit；
  PNL《Le Monde Chico》**同一張碟有淨化與 explicit 兩個 collectionId**
  （`1048964879` 17 軌 vs `1455962586` 16 軌），建議取後者。

---

## 六、一句話結論

**這個場景在池中原本幾乎是空的**：rock français 的整條主脈（Bashung／Noir Désir／
Hallyday／Rita Mitsouko）與 80 年代法語流行的支柱（Daho／Claude François）**全部是零**，
池中只有香頌那一代（Brel／Gainsbourg／Hardy）與 2000 年後的 French touch 兩頭，中間整段斷開。
本批 45 張把 1967–2021 這條線接起來，但**每位藝人都還剩三到八張目錄**（見第四節 B），
**再開一批 40 張仍然收得滿**。
