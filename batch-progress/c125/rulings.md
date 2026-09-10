# c-125 策展層裁定與交件紀錄（2026-09-08）

**批次**：伊比利半島——佛朗哥的西班牙與薩拉查的葡萄牙
**交件**：`prop-a.json` 25 張／25 位（1966–1984）、`prop-b.json` 20 張／19 位（1968–1980），合計 **45 張／44 位**。
**`chk-prop.mjs a b`：標記 0**（跨批去重 76 批、3,3xx 張候選——c-123／c-124 兩批並行中，候選總數每次跑都在長，跨批撞卡一律 0）。

`scene` 依體制段落切，不依曲風：
**a ＝ 西班牙（佛朗哥時期與過渡、la Movida）**、**b ＝ 葡萄牙（Estado Novo 與康乃馨革命後五年）**。

---

## 一、卡池實掃（`seed_cards.json` 全 14,424 列，帶與不帶變音符號兩種寫法都查）

**西班牙側，年份窗口 1965–1985 內池中共 7 張**：
Joan Manuel Serrat《Mediterráneo》1971、Paco de Lucía《Fuente y caudal》1973 與《Almoraima》1976、
Camarón de la Isla《La Leyenda del Tiempo》1979／《Como el agua》1981／《Calle Real》1983、
Esplendor Geométrico《Comisario de la luz》1985。
窗口外另有 Paco de Lucía 5 張、Camarón 1 張、Mecano 1 張、Enrique Morente & Lagartija Nick 1 張。
**本批 26 位骨幹藝人（含我方補上的 Ovidi Montllor、Maria del Mar Bonet、Fuxan os Ventos）池中全部為零。**

**葡萄牙側，年份窗口 1960–1980 內池中共 6 張**：
José Afonso《Cantigas do Maio》1971、Carlos Paredes《Guitarra Portuguesa》1967、
Amália Rodrigues《Busto》1962／《Fado português》1965／《Com que voz》1970／《Gostava de ser quem era》1980。
窗口外另有 Amália《Amália no Olympia》1957、Madredeus 2 張、Dulce Pontes 1 張。
**本批 20 位骨幹藝人扣掉 José Afonso 與 Carlos Paredes，池中全部為零。**

**盤名層級的撞卡**：本批 45 個盤名對池中 14,424 列做摺鍵比對，**命中 0 筆**。

**跨批**：`c-63` 已有 José Afonso《Cantigas do Maio》1971、`c-98` 已有 José Afonso《Venham mais cinco》1973。
第一版 `prop-b.json` 選了《Venham mais cinco》，被 `chk-prop` 的跨批去重擋下，改成《Traz outro amigo também》1970。
其餘 74 批對伊比利掛名的實掃只回 `c-50` 的 Amália 2 張與 `c-53` 的 Raimonds Pauls（拉脫維亞，非本批 Raimon）。

---

## 二、短掛名回問實測（裁定 179／250）

八個高風險短掛名共回問 **71 筆候選實體，擋下 65 個非目標實體**。**score 排序全面不可用**：

| 掛名 | MB 回筆數 | 目標實體 | 名次／score | 擋下 |
|---|---:|---|---|---:|
| `Smash` | 364 | `6f00fe08` disambiguation「Spanish prog」ES 1967 | **第 4／97** | 9 |
| `Triana` | 39 | `035813fb`「70s/80s Spanish progressive rock band」 | 第 1／100 | 9 |
| **`Gong`** | 331 | `be394596`「Spanish rock」ES | **第 10／79** | 9 |
| `Fausto` | 132 | `b5e11a13`「Portuguese singer-songwriter」PT | **第 2／99**（第 1 是 Fausto Papetti IT） | 9 |
| `Tantra` | 47 | `eb11ef6e`「Portuguese progressive rock band」PT | **第 2／99**（第 1 是 italo-disco 的 Tantra） | 9 |
| `Sheik` | 189 | 目標**不在前十**，要改查 `Os Sheiks` 才回得到 `e54d9edc` | — | 10 |
| `GAC` | 632 | 目標**不在前十**，要改查全稱 `Grupo de Acção Cultural` 才回得到 `2e6a2bec` | — | 10 |
| `Jarcha` | 1 | `53652abb` MB 全域唯一同名實體 | 第 1／100 | 0 |

**`Gong` 是本批最大的撞卡風險，已擋下**：
池中既有的 5 張 `Gong`（《Angel's Egg》《You》《Acid Motherhood》《Camembert Electrique》《Magick Brother》）
全部是法國／英國 Daevid Allen 那一支（`5927990e`，FR，1966）。
西班牙的 `Gong`（`be394596`）在 MB 上 **release-group 瀏覽回 0 筆**——沒有可收的碟，因此不收。
**即使日後要補，也必須先處理掛名層級的撞卡**，`chk-prop` 的摺鍵在 artist 層看不見這個差別。

另外五個掛名沒有 disambiguation、只有出生日與名下目錄可確認，
已在 `risk` 欄標為**不得由掛名反推背書本名**：`Raimon`、`Lluís Llach`、`Ovidi Montllor`、`Derribos Arias`、`Carlos Paredes`。

---

## 三、本批新立的裁定

### 255：**這批 §5.6 開 0 張**

硬規則 1 的年份窗口（西 1965–1985、葡 1960–1980）與 §5.6 的「年份取合輯首次出版年」直接衝突——
伊比利這條線的復刻合輯（Vampisoul／Guerssen／Munster／Mais 5／CNM／Musea）**全部出版於 2000 年之後**，
收了必然破窗口。而本批實測**原盤留存率高**：45 張裡 **41 張在 MB 上有 1965–1980 年的 release 建檔**，
不需要靠合輯當入口（這與簡報「這批合輯應該用得比較少」的預期一致，實際是「一張也不用」）。

唯一值得走 §5.6 的候選是 **Sheiks《Missing You - Integral 1965/1967》（2007，`6d3de717`）**——
1965–67 的單曲與 EP 只以這份 integral 存在。但它的出版年 2007 落在窗口外，
**改記入未收清單**，留給不受年份窗口限制的批次。

### 256：`primary-type=Album` ＋ `secondary-types` 含 `Compilation` 照一般 Album 寫

本批唯一一張：**Jarcha《Libertad sin ira》1976**（`6f83574b`）。
依 §5.6 明文與 c-90 裁定第 3 條，**不填** `exceptionReason`／`exceptionEvidenceUrls`——填了會被 `chk-prop`
判「非合輯卻帶例外欄位」。反方向的 **裁定 227** 也逐張寫進 `risk`：`secondary-types` 為空不代表是原盤，
本批有兩張特別標註（Kaka de Luxe《Las canciones malditas》1983、Alaska y los Pegamoides《Grandes éxitos》1982）。

### 257：MB `first-release-date` 與原盤年不符時，`year` 取原盤年（裁定 220 ＋ 裁定 91）

三張：

| 卡 | MB `first-release-date` | 本卡 `year` | MB 轄下最早 release |
|---|---|---:|---|
| Carlos Paredes《Movimento perpétuo》 | 1988 | **1971** | 1988 PT EMI 0777 7 91312 2 8 |
| José Mário Branco《Mudam-se os tempos, mudam-se as vontades》 | 2017 | **1971** | 2017 XE Warner 9029572365 |
| Grupo de Acção Cultural《Pois Canté !!》 | 2010 | **1975** | 2010 iPlay IPV-1422-2 |

三張的 **MB 都沒有原盤年的 release 建檔**。處置：`year` 取原盤年、MB 值寫進 `mbNote`、
`label` 欄**不填推測值**（寫「原盤發行方待研究層自壓片核」），並在 `risk` 明寫
**原盤年與發行方必須由研究層以壓片或 Discogs 條目覆核後才能寫進簡介**。
理由：裁定 91（rgMbid 是身分鍵不是年份來源）＋ 裁定 220（年份取原盤年），而年份窗口是硬規則，
取 MB 值會讓三張全部破窗口。

另有一張年份兩說：**Sérgio Godinho《Os Sobreviventes》**，MB 記 1972、部分葡萄牙資料記 1971。
取 MB 值 1972，兩說並存寫進 `risk`，交研究層覆核。

### 258：MB 藝人實體名的大小寫瑕疵，卡片取盤面／該語言資料的正式寫法

三個：**Banda do Casaco**（MB 實體名與 artist-credit 都作「Banda do casaco」）、
**Fuxan os Ventos**（MB 作「Fuxan os ventos」）、**Salada de Frutas**（artist-credit 作「Salada De Frutas」）。
MB 寫法一律進 `queryAlias` 與 `risk`，兩種寫法都要進撞卡掃描。
**這與「掛名兩說」不是同一件事**——不是藝人自名有兩種，是 MB 端的資料狀態；
記進 `risk` 是觀察，不下結論（裁定 254）。

### 259：掛名取 MB 藝人實體名，不取 artist-credit

兩張：**Pau Riba《Dioptria》**（artist-credit 是「Pau Riba & OM」）、
**Canarios《Ciclos》**（MB 實體名是「Canarios」，樂評與盤面普遍寫「Los Canarios」）。
依裁定 6／70／120 取實體名，另一種寫法進 `queryAlias`。

### 260：`scene` 依體制段落切，不依曲風

a 組裡 Nova Cançó 的抗議歌曲（Raimon、Lluís Llach、Ovidi Montllor、Maria del Mar Bonet、Paco Ibáñez、
Aguaviva、Jarcha、Fuxan os Ventos）與 Zeleste／安達魯西亞的地下搖滾（Pau Riba、Sisa、Máquina!、Smash、
Triana、Vainica Doble）**刻意混編**——Triana《El patio》與 Lluís Llach《Com un arbre nu》
是同一個體制段落的兩種做法，不是兩個曲風批。la Movida 的七張（Kaka de Luxe 起）同組，
因為它們與前面那批的分界是體制段落（佛朗哥過世、獨立廠牌出現），不是曲風。

### 261：政治敘述的邊界，逐張寫進 `risk`

45 張**每一張**的 `risk` 欄末尾都帶一句固定提醒，兩種版本：

- 西班牙：「行文可寫佛朗哥時期審查制度存在／加泰隆尼亞語與加利西亞語出版受限這一可查證的史實，
  但**不得寫對該體制的價值判斷**。」
- 葡萄牙：「行文可寫 Estado Novo 時期送審制度存在、某張碟的禁售紀錄、
  〈Grândola, Vila Morena〉在 1974 年 4 月 25 日被用作行動信號這些**可查證的史實**，
  但**不得寫對該事件或對 Estado Novo 的價值判斷**，只寫發行年、廠牌、曲目與播放紀錄。」

另外三張帶額外的邊界提醒：
Paulo de Carvalho（〈E depois do adeus〉的廣播紀錄可寫，**但該曲是否收錄在這張 LP 必須由研究層以曲目核實**）、
Brigada Víctor Jara（**團名取自另一位真實人物，不得由團名反推對該人物的敘述**）、
Carlos do Carmo（**不得對 fado 與體制的關係作定性**）。

### 262：張數

`prop-a` 25 張（簡報建議 22–24，多 1）、`prop-b` 20 張，**合計 45 張＝簡報上限**。
多出的那一張換來的是 a 組「一張碟一位藝人」——25 張 25 位，沒有任何藝人重複，
對「西班牙 20 位標誌藝人有 18 位是零」這個開批理由最有效。
b 組 20 張 19 位（José Afonso 兩張，1968 與 1970）。

---

## 四、加泰隆尼亞語與加利西亞語的碟

**共 7 張，盤名全部照原文語言寫、未譯成西班牙語**（簡報分界第 4 條）：

| 語言 | 卡 |
|---|---|
| 加泰隆尼亞語 | Pau Riba《Dioptria》1969 |
| 加泰隆尼亞語（瓦倫西亞變體） | Raimon《Per destruir aquell qui l'ha desert》1970 |
| 加泰隆尼亞語（瓦倫西亞變體） | Ovidi Montllor《Un entre tants...》1972 |
| 加泰隆尼亞語 | Lluís Llach《Com un arbre nu》1972 |
| 加泰隆尼亞語 | Sisa《Qualsevol nit pot sortir el sol》1975 |
| 加泰隆尼亞語 | Maria del Mar Bonet《Alenar》1977 |
| **加利西亞語** | **Fuxan os Ventos《Fuxan os ventos》1976** |

加利西亞語只有一張，是因為 Nova Canción Galega 在 MB 上的建檔極薄：
Benedicto 0 筆 RG、Miro Casabella 唯一一張無年份、Bibiano 只有《Estamos Chegando Ó Mar》1976 一張
（合格但名額已滿，轉未收清單）。**下一批要補加利西亞線的話，四位裡只有兩位有碟可收。**

---

## 五、封面與店面預估（**這一節全部是觀察，不是結論**——裁定 254）

### CAA `release-group/<id>/front` 逐張實測（45/45 全跑）

| 組 | 200 | 404 |
|---|---:|---:|
| a | 21 | 4 |
| b | 16 | 4 |
| **合計** | **37** | **8** |

404 的八張：
a — Smash《Glorieta de los lotos》、Máquina!《Why?》、Vainica Doble《Vainica Doble》、Fuxan os Ventos《Fuxan os ventos》；
b — Vitorino《Semear Salsa Ao Reguinho》、Grupo de Acção Cultural《Pois Canté !!》、
Jorge Palma《Qualquer Coisa Pá Música》、Salada de Frutas《Sem Açúcar》。
**八張全部已在 `risk` 欄寫成「CAA release-group 端點 404（實測），封面解析要另尋來源」**，
沒有寫「無封面」這種結論。

### Apple `search` 端點（**只跑了一種查法**，依 es→pt→fr→gb→us→de→br→mx 順序）

| 組 | 有近似命中 | 全未命中 |
|---|---:|---:|
| a | 19 | 6 |
| b | 13 | 7 |
| **合計** | **32** | **13** |

**⚠ 32 筆命中裡有 10 筆命中的不是本張碟**，已逐張寫進 `risk`：
Vainica Doble→《Vainica Doble, Grandes Éxitos》（精選）、Jarcha→《…y Otros Exitos》（精選）、
Quarteto 1111→《A Lenda do Quarteto 1111》（合輯）、Sisa→同名「- Single」、
Paulo de Carvalho→《Leva-Me a Viajar》（別碟）、Ovidi Montllor→兩張併盤、
Triana→《El patio - 40 aniversario》、Alaska→《Grandes Éxitos - Edición Para Coleccionistas》、
Los Bravos→《Black Is Black (New Stereo Version)》、Radio Futura→盤名被截短。
**乾淨命中只有 22 筆。**

`es` 是最有效的 storefront（15 筆首命中），`pt` 只有 2 筆——
**葡萄牙側大量走 `fr`／`us`／`de` 才命中**，這是 c-119 那種「策展層先下結論」最容易翻車的地方。
**13 筆全未命中不等於未上架**，研究層要跑藝人目錄與候選 `collectionId` 直查兩種查法才能下判斷。

---

## 六、未收清單（分類）

### A. MB 有藝人實體、**release-group 為 0 筆**（可進 §1 補遺批）

- **`Gong`（ES，`be394596-f183-4a4b-9195-7336692cab37`）**——**且池中已有 5 張同名的法國 Gong**，見第二節。
- `Nuevos Tiempos`（ES，`3d6d2b2c-6185-483a-af73-ed8d88c5ceec`）
- `Objectivo`（PT，`bfdda161-c086-4ed4-b19a-494961ce841d`）
- `Benedicto`（加利西亞，`47feea7d-f8e2-41e5-a1fa-74c6f2f58c25`）

### B. MB 有碟、但全部落在年份窗口外或只有 EP／單曲（可進 §1 補遺批）

- `Xutos & Pontapés`（PT）——首張《78/82》1982，葡萄牙窗口 1960–1980 之外。
- `Sheiks`（PT，`e54d9edc`）——只有 2007《Missing You - Integral 1965/1967》與 2014《Essencial》兩張合輯；**§5.6 的最佳候選，但出版年破窗口**（見裁定 255）。
- `Filarmónica Fraude`（PT，`422ddce8`）——窗口內只有 1969 EP，唯一 Album《Epopeia》是 1998。
- `Manuel Freire`（PT，`63214df7`）——只有 1993 合輯與 1999 專輯。
- `Luís Cília`（PT，`130a6111`）——只有 1988《A regra do fogo》與 2024 全集；**1960–70 年代在巴黎的目錄完全未建檔，是本批 MB 缺口最大的一位**。
- `Pop Five Music Incorporated`（PT，`7eaf701b`）——只有 1970／1971 兩張單曲。
- `Beatnicks`（PT，`80ed4023`）——只有 1972 單曲。
- `Miro Casabella`（加利西亞，`2e539d1a`）——唯一 RG《Orvallo》無年份。
- `Kaka de Luxe`《Kaka de Luxe》1978（`7e14fd44`）——EP。
- `Lluís Llach`《Cançó sense fi / Cop de destral / Per un tros del teu cos / L'estaca》1968（`5b5b3e84`）——EP。

### C. artist-credit 是多人合掛，本批不收

- 《Cantigas De Ida E Volta》1975（`13ed2370`）——Fausto／Sérgio Godinho／Vitorino 等合掛。
- 《A Confederação》1978（`d77516f0`）——José Mário Branco／Sérgio Godinho／Fausto 合掛。
- Kaka de Luxe《Kaka de Luxe / Paraíso》1982（`f5938c1f`）——兩團合掛的分軌盤（本批改收 1983《Las canciones malditas》）。
- Carlos Paredes《Meu País》1970（`7633e6e1`）——artist-credit 是「Cecília de Melo & Carlos Paredes」。
- Parálisis Permanente／Gabinete Caligari《Parálisis Permanente / Gabinete Caligari》1982（`5e704eb8`）——EP 且兩團合掛。

### D. 碟本身合格，名額不足，**下一批優先**

**西班牙**（都在 1965–1985 窗口內、`primary-type=Album`、MBID 已查到）：
Iceberg《Tutankhamon》1975（`6293fc81`）、Nuestro Pequeño Mundo《El folklore de Nuestro Pequeño Mundo》1968（`5b1abc54`）、
Módulos《Realidad》1970（`3a9c0fd0`）、Barrabás《Soltad a Barrabas!》1974（`a8888786`）、
Fusioon《Minorisa》1975（`ff708eb1`）、Companyia Elèctrica Dharma《L'Oucomballa》1976（`4249dd2f`）、
Bibiano《Estamos Chegando Ó Mar》1976（`3a851527`，**加利西亞語**）、
Triana《Hijos del agobio》1977（`767dd87c`）、Lluís Llach《Campanades a morts》1977（`46df8d46`）、
Los Brincos《Mundo, demonio y carne》1970（`7ccb20c2`）、Sisa《Orgia》1971（`789e7658`）、
Vainica Doble《Heliotropo》1973（`800c2444`）、Radio Futura《Música moderna》1980（`4d913dbe`）、
Décima Víctima《Un hombre solo》1984（`14a5c6e7`）、Canarios《Libérate!》1970（`19933454`）。

**葡萄牙**（都在 1960–1980 窗口內）：
José Afonso《Coro dos tribunais》1974（`5a58f044`）與《Contos velhos, rumos novos》1969（`34aeab41`）、
Adriano Correia de Oliveira《Cantaremos》1970（`38cb8099`）與《Que Nunca Mais》1975（`9196a227`）、
Quarteto 1111《Bruma Azul Do Desejado》1973（`2374a4bb`）、Petrus Castrus《Ascenção E Queda》1978（`1cda0851`）、
Banda do Casaco《Coisas do Arco da Velha》1976（`b7c4127c`）、Tantra《Holocausto》1978（`214989b0`）、
Fausto《P'ro que der e vier》1974（`9d87fd59`）、Sérgio Godinho《À Queima Roupa》1974（`07445f7a`）、
Vitorino《Os malteses》1977（`41b5204a`）、Carlos do Carmo《Por morrer uma andorinha》1969（`c8acffb4`）、
Trovante《Em Nome Da Vida》1979（`79f40257`）、Paulo de Carvalho《Operários Do Natal》1976（`f6c48f33`）。

**D 類合計 29 張，全部已釘到 MBID、可直接開下一批。**

---

## 七、交件檢查

- `node batch-progress/c125/chk-prop.mjs a b` → **標記 0**（跨批去重 76 批、撞卡 0；候選總數因 c-123／c-124 並行而變動）。
- 45 張全部 `primary-type=Album`、全部釘 `rgMbid` 並逐一回問 `release-group?inc=artist-credits+releases`。
- `secondary-types` 含 `Live` 的一張：Paco Ibáñez《Paco Ibáñez en el Olympia (París)》1970（裁定 253 可收，
  `mbNote` 已記現場錄音年與地點：1969 年巴黎 Olympia）。
- `secondary-types` 含 `Compilation` 的一張：Jarcha《Libertad sin ira》1976（照一般 Album 寫，見裁定 256）。
- 年份窗口：a 全在 1966–1984、b 全在 1968–1980，**無一張破窗**。
- 連字號全部 ASCII `-`（`chk-prop` 已驗）。
- 「刻意不釘」的對照組 MBID 共 **178 個**（含同名別人的藝人 MBID），寫法照裁定 162 的固定格式。
