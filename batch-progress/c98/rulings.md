# c-98 民謠／鄉村目錄深度：策展層裁定（2026-09-05）

依 2026-09-02 店主下放，本批所有策展／研究／管線裁定由策展層自決並記錄於此。

---

## 1. 本批 §5.6 用量為 0——判準改成看 `primary-type` 本身

派工信預期「§5.6 這批會用很兇」。實掃結果與 c-95（爵士與藍調）一致：

**MusicBrainz 不用 `primary-type=Compilation` 建 1940–50 年代的整編輯。**
本批掃過的 16 位 a 組藝人名下 release-group 合計 **2,051 筆**
（Hank Williams 214、Patsy Cline 355、Tammy Wynette 265、Marty Robbins 370、
Flatt & Scruggs 101、Pete Seeger 153、Joan Baez 159、Woody Guthrie 96、
Louvin Brothers 64、Odetta 44、Garth Brooks 73、Randy Travis 65、NGDB 62、
Dock Boggs 8、Elizabeth Cotten 5、J.D. Crowe and the New South 17），
逐筆統計 `primary-type` 的分佈是
**Album 1,471／Single 452／EP 108／Other 8／Broadcast 3／未填 9——`Compilation` 0 筆**；
整編輯一律建成 `primary-type=Album` ＋ `secondary-types=[Compilation]`。

依 §5.6 明文，這一型**照一般 Album 寫、`releaseType` 填 `Album`、
`exceptionReason` 與 `exceptionEvidenceUrls` 留空**——填了會被 `chk-prop` 判「非合輯卻帶例外欄位」。

**裁定：本批 44 張全部 `releaseType: "Album"`、例外欄位全空。**
其中 `secondary-types` 含 Compilation 的有 **2 張**：
Hank Williams《Hank Williams as "Luke the Drifter"》(1955) 與
Patsy Cline《Patsy Cline's Greatest Hits》(1967)。兩張的 secondary-type 都已寫進 `mbNote`，
並在 `mbNote` 裡註明「primary-type 是 Album，依 §5.6 明文不填例外欄位」，
免得下游看到 Compilation 字樣就以為漏填。

## 2. 第 43／57／65／78 條這批不必翻 Discogs 版本頁——44 張的 release status 全查過

派工信要求逐張判「這一次再發是不是 Official」。實查 44 張所有 release 的 status：

- **41 張全數 Official。**
- **3 張有非 Official 或未填的 release**，各自處理如下：
  - Woody Guthrie《Library of Congress Recordings》：5 筆裡 1 筆標 **Bootleg**（國別未填）。
    Elektra 1964 原盤與 Rounder 1988 再發都在 Official 那一側，背書只採那幾筆，
    已在 `risk` 明令行文不得引用該 Bootleg 版。
  - Joan Baez《Joan Baez, Vol. 2》：9 筆裡 1 筆 XW 標 **Bootleg**，其餘 8 筆 Official，同上處理。
  - The Louvin Brothers《My Baby's Gone》、Quilapayún《La Fragua》、
    Dock Boggs《Legendary Singer and Banjo Player》：各有 1–2 筆 **status 未填**。
    依第 66 條「有爭議就不採為背書」，這些筆一律不採，改由 Discogs 原盤 master
    （分別是 —／1338009／312449）與廠牌目錄延續性支撐。

**裁定：Bear Family／Rounder／Smithsonian Folkways 這一段在本批無未授權疑慮，
不必為第 43／57／65／78 條額外找 Discogs 版本頁。** 但上面三張的 `risk` 已逐張寫明狀態，
下游不得把「本批授權乾淨」當成通則往下傳（第 57 條：判定單位是這一次再發）。

## 3. 年份分歧五處，一律照第 86／127 條處理並寫進 `risk`

| 卡 | 分歧 | 取值 | 依據 |
|---|---|---|---|
| Hank Williams《Hank Williams Sings》 | MB 1949／Apple 1951／Discogs master 435297 記 1952 | **1952** | 第 127 條：Discogs 原盤直記覆蓋 MB |
| Woody Guthrie《Struggle》 | MB 1945（其下確有 1945 US Official 的《Documentary #1: Struggle》）／Discogs master 279605 與 Apple 記 1976（Folkways FA 2485 再發） | **1945** | 第 1／86 條：年份記唱片到達公眾那一年 |
| Georges Brassens《Nº2》 | MB 與 Apple 記 1953／Discogs master 191505 記 1954 | **1953** | 二比一 |
| Georges Brassens《Nº10》 | MB 與 Apple 記 1964／Discogs master 361365 記 1965（BE 壓片） | **1964** | Discogs 那筆是地區壓片不是原盤 |
| The Chieftains《The Chieftains》 | MB 記 1963／Discogs master 334099（Claddagh CC2）與 Apple 記 1964 | **1963** | 通行文獻與 MB 一致；Discogs 該筆的 catno 是 CC2 而非首發的 CC1，疑為再壓 |

五張的 `risk` 都已寫進各說法與來源，並依第 18／46 條**明令行文不得正面斷言發行年**。

另有三張的 Apple `releaseDate` 與卡單年份不同，但那是再發日期不是版本歧義，
依第 77 條只當訊號不當門檻，已在 `risk` 註明：
Elizabeth Cotten《Volume 3: When I'm Gone》（Apple 1965／卡單 1979）、
Violeta Parra《Recordando a Chile》（Apple 2022／卡單 1965）、
Atahualpa Yupanqui《Basta ya》（Apple 2006／卡單 1971）、
Chavela Vargas《La Llorona》（Apple 1996／卡單 1993）。

## 4. Patsy Cline 收精選，理由不是湊張數

Patsy Cline 生前只出過三張正規專輯，**三張池中全部都有**（《Patsy Cline》1957、
王牌卡《Showcase》1961、《Sentimentally Yours》1962）。照「先確認第一張該有的」這條判準，
她的正規目錄在池中已經飽和。

**裁定：收 1967 年 Decca 的《Patsy Cline's Greatest Hits》（MB 26239187，Album+Compilation）。**
理由是它不是後世的重複包裝，而是原廠在她過世四年後編成、此後半世紀持續在架上的那一版；
她這位藝人在唱片市場上的實際存在形態就是這一張。**不收**同型的
《Patsy Cline's Golden Hits》(1962)、《The Patsy Cline Story》(1963)、
1985／1988／1990 三筆《Greatest Hits》——依 §5.6「同一藝人同一批錄音的多種合輯只挑最權威的一種」。

## 5. Marty Robbins《Devil Woman》收，但要標「不得取搜尋第一筆」

這張的 MB release-group 轄下**只有 1 個 release**，是本批釘位證據最薄的一筆；
而它的盤名是兩個常用字，Apple us 搜尋回來的第一筆是 ProSource Karaoke Band 的同名伴唱單曲。

**裁定：收，但 `risk` 明寫「不得取搜尋第一筆」，試聽記 unavailable。**
理由是身分本身沒有疑義（primary-type、artist-credit、1962 年與 Columbia 三項都對得上），
薄的是 MB 的建檔而不是這張碟；而封面走 CAA 實測 200，不依賴 Apple。
這與第 44 條「通行名被佔用就剔除」不同——那裡是身分不可辨，這裡是身分明確、只是外部服務配不到。

## 6. 三張明知拿不到固定試聽仍然收

Garth Brooks《The Chase》、Marty Robbins《The Song of Robbins》與《Devil Woman》、
Nic Jones《The Noah's Ark Trap》、Inti-Illimani《Inti-Illimani 2》——
五張在各自該試的店面都實搜過（Garth Brooks 試了 us／ca／gb／au／de 五個，
Inti-Illimani 試了 cl／it／es／us 四個），本人條目一筆都沒有。

**裁定：五張全收，試聽預估 `unavailable`、不留 URL。**
依 2026-09-04 店主對嘉手苅林昌那張的裁定——**「Apple 有沒有這張碟」不是收錄條件**；
身分由 `rgMbid` 釘死、封面由 CAA 實測 200 支撐，兩項都成立。
Garth Brooks 那張另外明令**不得取任何一筆致敬輯／伴唱帶的 collectionId 充數**
（實搜 40 筆全是這類），這正是 c-92 骨肉皮那個「反例識別碼被下游當成指定值」的形狀。

## 7. 五張 CAA 404 改走 §4 `apple-verified-collection`，並依第 134 條同時當試聽來源

| 卡 | CAA | 人工核對過的 collectionId | 核對依據 |
|---|---|---|---|
| The Louvin Brothers《My Baby's Gone》 | 404 | us **714643546** | artistName／collectionName／1960 三項相符 |
| Dock Boggs《…Legendary Singer and Banjo Player》 | 404 | us **175658461** | 15 軌，曲序 Down South Blues／Country Blues／Pretty Polly／Coal Creek March 與 Folkways FA 2351 相符 |
| Violeta Parra《Recordando a Chile: Una chilena en París》 | 404 | cl **1647764240** | 11 軌、首軌〈Defensa de V. Parra〉、皆有 previewUrl |

其餘兩張 CAA 404 的（Selda《Yeni Bir Dünya》、Ruhi Su《Yunus Emre》）
**兩路皆空**（CAA 404 ＋ Apple 該店面查無），依 §4「抓不到可靠封面就停止該筆」**本批不收**，
各自換成同一位藝人 CAA 200 的另一張（見第 8 條）。

## 8. 三處換片，理由都是「兩路皆空」不是資料面

- **Atahualpa Yupanqui**：原選《Una voz y una guitarra》(1953，MB 6a08a0aa) ——
  CAA 404 ＋ Apple ar／es／us／cl 四店面皆無 → 改收《Basta ya》(1971，ac41c4b4，CAA 200 ＋ Apple ar 1340696107)。
- **Selda Bağcan**：原選《Yeni Bir Dünya》(1981，5360dad5) —— CAA 404 ＋ Apple tr 查無
  → 改收《Özgürlük ve Demokrasiyi Çizmek》(1988，fbf80ad9，CAA 200 ＋ Apple tr 1646471470)。
  次選《Yürüyorum Dikenlerin Üstünde》(1987，c2ee9e0a) 是 CAA 404 ＋ Apple 有，兩者取封面較穩的那張。
- **Ruhi Su**：原選《Yunus Emre》(1972，6bde11d9) —— CAA 404
  → 改收同年同型的《Pir Sultan Abdal》(1972，403c1284，CAA 200)。
- **Inti-Illimani**：原選《Canto para una semilla》(1972，97b2ed05) —— CAA 404 ＋ Apple 四店面皆無
  → 改收《Inti-Illimani 2: La nueva canción chilena》(1974，0fef6dcb，CAA 200)。

三張被換掉的碟都已寫進各自那張卡的「刻意不釘」，附上未收理由，供 §1 補遺批取用。

## 9. 跨語言掛名：四組要兩種以上寫法查，`queryAlias` 一律填無變音符號版

依第 49 條實掃，本批有四組掛名在池中或 MB 上存在多種寫法：

1. **Víctor Jara／Victor Jara**——**池中兩種並存**：《El Derecho de Vivir en Paz》記 Victor Jara（無重音），
   《Pongo en Tus Manos Abiertas》與《La Población》記 Víctor Jara。Apple cl 的 artistName 也是無重音。
   卡片依 MB 實體取 Víctor Jara，無重音寫法進 `queryAlias`。
2. **Selda／Selda Bağcan**——**池中兩種並存**：「Selda」名下 1 張（《Selda (1976)》）、
   「Selda Bağcan」名下 3 張。MB 自己也兩種都用（1976 與 1981 那兩張的 artist-credit 是 Selda）。
   卡片取 Selda Bağcan，`queryAlias` 填 Selda 與無變音符號的 Selda Bagcan。
3. **Neşet Ertaş／Neset Ertas、Ruhi Su 的 Pir Sultan Abdal'dan**——ş／ğ／ö／İ 在 NFKD 摺疊下變形，
   `queryAlias` 全部填無變音符號版。
4. **Inti‐Illimani（MB 用 U+2010 連字號）／Inti-Illimani（池中與 Discogs 用 ASCII）**——
   卡片盤名與掛名一律用 **ASCII 連字號**，否則會踩 `chk-prop` 的非 ASCII 連字號檢查（c-50 反模式）。

另兩組是掛名層級的差異，不是文字系統問題，但同樣要兩種都掃：
**Flatt & Scruggs**（MB 實體名 Lester Flatt & Earl Scruggs，Apple 也用這個）、
**Hank Williams**（《Hank Williams Sings》的 artist-credit 是 Hank Williams with His Drifting Cowboys、
《Luke the Drifter》的是 Hank Williams as Luke the Drifter）。三張都依池中既有卡的寫法掛名。

## 10. 標點與符號：一律採 MB 實體文字，但撇號與引號改 ASCII

MB 對本批多張的標題用彎撇 `’` 與彎引號 `“ ”`（Ramblin’ Man、My Baby’s Gone、Hard Travelin’、
Patsy Cline’s Greatest Hits、Your Good Girl’s Gonna Go Bad、Hank Williams as “Luke the Drifter”、
Il n’y a plus rien）。

**裁定：盤名的字序與用字採 MB 實體文字，但撇號與引號一律改 ASCII，兩種寫法都寫進 `queryAlias`。**
依第 50 條——這類差異在外部服務的搜尋裡會被正規化掉、命中率不受影響，
與第 45 條那種「兩個不同的盤名」不是同一件事。池中既有卡（如《Ropin' the Wind》
《Flatt & Scruggs at Carnegie Hall!》）用的也是 ASCII，維持一致。

**例外是連字號**：`chk-prop` 明文擋非 ASCII 連字號，Tammy Wynette《D-I-V-O-R-C-E》
與 Inti-Illimani 的團名已逐字確認用的是 ASCII hyphen-minus。

## 11. Brassens 的編號前綴用序數指示符 Nº，與池中 Brel 卡的 N° 不同——這是刻意的

池中既有的 Jacques Brel 卡寫成《N°2 : Quand on n'a que l'amour》《N°4 : La Valse à mille temps》，
用的是**度數符 U+00B0**；MB 對 Brassens 兩張的標題用的是**序數指示符 U+00BA**（Nº2、Nº10）。

**裁定：依第 6／70／120 條採 MB 實體的文字（Nº），另一種寫法進 `queryAlias`。**
兩個字元在任何正規化下都不相等，去重與查詢兩邊都要掃——這一點已寫進兩張的 `risk`。
若店主日後要統一，改的是卡單一個欄位、`rgMbid` 不動，可逆。

## 12. 二合一套裝三處，全部標「刻意不釘」

第 140 條的形狀在本批出現三次，都在 b 組：

- Léo Ferré：1989 年 Barclay 把《Il n'y a plus rien》與《L'Espoir》併成
  《Vol. IX Il N'Y A Plus Rien - L'Espoir》（Discogs 1090661）。
- Ruhi Su：Apple tr 上《Pir Sultan Abdal》**只以併輯形式存在**——
  collectionId 902820680 的 collectionName 是《Karacaoğlan - Pir Sultan Abdal》。
  已在 `risk` 明令：上架前必須 lookup 確認取到的軌屬本張那一半，否則試聽記 unavailable。
  封面走 CAA（實測 200），不依賴這一筆。
- José Afonso：1993 年 Orfeu 把《Venham mais cinco》與《Com as minhas tamanquinhas》併成一筆
  （MB 438e674a）。

## 13. Chavela Vargas《La Llorona》是全批最危險的一組假陽性，仍然收

她名下有**五筆**盤名相同或幾乎相同的碟：1964 年 RCA Victor 的《La Llorona》（Discogs 1704192）、
1993 年 Turner 的本張（MB 1629ef12）、2017 年的三筆（5f09734d／19d6519f／382490e6，含一筆 Remastered）。
盤名完全相同、藝人相同，字串比對必配錯。

**裁定：收，但三道防線都要架**：(a) 釘位用 MBID；(b) `risk` 逐筆點名五個對照組；
(c) 上架前用 `lookup` 覆核 Apple mx 1674222184 的曲數與曲序，確認取到的不是 1964 年 RCA 那一版。
理由是這張是她 1990 年代第二段生涯的入口、池中那一段完全空白，收錄價值高於識別成本；
而識別成本已經被 MBID 吃掉了。

## 14. b 組骨幹只有五位，補進來的十二位怎麼挑的

派工信說 b 組骨幹（Brassens 1、Víctor Jara 3、Bothy Band 3、Alan Stivell 3、Selda 4）明顯不夠。
實掃 `seed_cards.json` 全 14,424 列，以「有明確正典地位、池中 1–3 張」為條件掃過 42 位候選，
結果如下（括號為池中實際張數）：

- **收進來的（1–3 張）**：Léo Ferré(1)、Violeta Parra(2)、Atahualpa Yupanqui(1)、Quilapayún(1)、
  Inti-Illimani(1)、Chavela Vargas(1)、Malicorne(1)、Planxty(3)、The Chieftains(3)、Nic Jones(1)、
  Ruhi Su(1)、Neşet Ertaş(2)、José Afonso(1)。
- **排除，因為池中已有 4 張以上**：Jacques Brel(4)、Mercedes Sosa(5)、Amália Rodrigues(5)、
  Silvio Rodríguez(5)、Fairport Convention(6)、Barbara(8)、Bert Jansch(6)、Steeleye Span(6)、
  Pentangle(5)、Shirley Collins(5)、Fabrizio De André(5)、Milton Nascimento(5)、Cesária Évora(4)。
- **骨幹中排除的**：The Bothy Band(3) —— MB 名下只剩 Live 與合輯可補，正規盤三張池中全有。
- **查過、條件符合但本批未收（留給下一批廣度線）**：Anne Briggs(2)、The Dubliners(1)、
  Christy Moore(2)、Clannad(3)、Horslips(1)、Sweeney's Men(2)、Mikis Theodorakis(1)、
  Los Jaivas(1)、Daniel Viglietti(1)、Carlos Paredes(1)、Joan Manuel Serrat(1)、Muzsikás(2)、
  Mari Boine(1)、Värttinä(2)、Hedningarna(2)、Garmarna(2)、Chico Buarque(3)。
  **零張的三位**：De Dannan、Nuova Compagnia di Canto Popolare、Maria Farantouri、
  Alfredo Zitarrosa、Paco Ibáñez、Lluís Llach、Âşık Veysel、Márta Sebestyén——
  這些是廣度線真正的洞，不是深度問題。

## 15. J.D. Crowe 不收——池中那張與 MB 的《The New South》是同一張碟

池中卡是「J.D. Crowe & The New South《J.D. Crowe & The New South》(1975)」，
MB 上對應的 release-group 是 3c4bb720《The New South》（Rounder 0044）。
**盤名兩種寫法、是同一張碟**，第 49 條的同型。本批因此沒有把它當成「還沒收」。
他名下其餘 16 個 release-group 裡值得補的是《Somewhere Between》(1982，6ea71285)，
本批因張數上限未收，記在這裡供下一批廣度線取用。

---

## （主線追加，2026-09-05）第 1 條：**探測層有一張配到別的藝人** —— Hank Williams《Ramblin' Man》

探測記 `ready`／us `815502171`。那筆是 **Hank Williams III**（孫子）2014 年 Curb 的 8 軌碟，
不是 1955 年 MGM 的那張。`titleOk` 過得了（盤名完全相等）、`artistOk` 也過得了
（`norm('Hank Williams')` 是 `norm('Hank Williams III')` 的子字串），**兩道都不擋祖孫同名**。

正解 us `1592563692`《Ramblin' Man (Undubbed Edition)》12 軌，與 MB 的 MGM E 3219 逐軌同名同序，
12 軌皆有 previewUrl。已改寫探測檔。

**這是「`ready` 不等於配對正確」的第十一張，也是第一次的形狀是「同姓氏的後代」。**
`artistOk` 的雙向子字串比對對 Jr./III/父子檔家族天生無效——鄉村、藍調、拉丁三條線都有這種家族，
往後這幾條線的研究層要把「藝人是不是同一個人」當獨立一項查。本批不改工具。

## 第 2 條：**七張誤記 unavailable，全部是盤名變形**（裁定 166 的第二次收成）

| 卡 | collectionId | 探測落空的原因 |
|---|---|---|
| Hank Williams《Hank Williams Sings》 | us 1591133640（8 軌） | Apple 盤名只作《Sings》 |
| Pete Seeger《Waist Deep in the Big Muddy…》 | us 181586787（15 軌） | MB 用 `&`、Apple 用 `and` |
| Marty Robbins《The Song of Robbins》 | us 1308728509（12 軌） | Apple 是複數《The **Songs** of Robbins》 |
| Flatt & Scruggs《Hard Travelin'》 | us 727363468（12 軌） | Apple 盤名帶班底副標「(with The Foggy Mountain Boys)」 |
| Dock Boggs《…Legendary Singer and Banjo Player》 | us 175658461（15 軌） | Apple／Discogs 只作《Dock Boggs》 |
| Elizabeth Cotten《Volume 3: When I'm Gone》 | us 154816804（13 軌） | Apple 盤名帶藝人名＋「Vol. 3」 |
| Nitty Gritty Dirt Band《Uncle Charlie…》 | us 723526039（23 軌） | **三重變形**：`&`／`and` ＋「Bonus Tracks Edition」副標 ＋「[2002 Remaster]」標記 |

七筆逐一以 `lookup?id=<collectionId>&entity=song` 覆核過**曲目列攤得開且每軌都有 previewUrl**
（c-97 第 11 條要的那道獨立檢查），才寫進探測檔。**c-98 試聽 26/44 → 33/44。**

**真的 unavailable 只有 2 張**：Marty Robbins《Devil Woman》（us/gb/ca/au/de 藝人目錄各 43–49 張、五份都沒有）、
Garth Brooks《The Chase》（artistId 329451 在五個店面**各只回 1 筆**，是 2021 年的單曲）。

## 第 3 條：**策展層的 catno 錯三處，一併更正**

研究層比對原盤資料時抓到，`prop-a.json` 與卡單都已改：

- The Louvin Brothers《My Baby's Gone》：**T 1385**（原寫 T 1834）
- Flatt & Scruggs《Hard Travelin'》：**CL 1951／CS 8751**（原寫 CL 2151／CS 8951，兩個都錯）
- Hank Williams《Luke the Drifter》：是**十吋 E-203（1953）與十二吋 E-3267（1955）兩種規格**，
  MB 把兩者混在一筆上。**Apple 那個 1953 不是年份漂移，是指向更早的十吋版。**

## 第 4 條：**軌數落差五張全部查清，沒有一張是二合一**

| 卡 | 落差 | 結論 |
|---|---|---|
| Luke the Drifter | 14 vs 12 | 原盤 12 軌全在＋〈No, No Joe〉〈Ramblin' Man〉兩首同掛名錄音，加曲版 |
| Library of Congress Recordings | 29 | **完整**：與 1964 Elektra 三片 11+10+8 逐軌同名同序 |
| American Favorite Ballads, Vol. 1 | 28 | **不是兩卷合併**（Vol.2 的識別曲一首都沒出現），是 2002 SFW CD 40140；但**也不是 1957 年 17 軌的超集**，〈Buffalo Gals〉被拿掉了 |
| Joan Baez, Vol. 2 | 17 vs 13 | **原盤是 14 軌不是 13**；17 ＝ 14 同序 ＋ 維基明載的三首未發表曲 |
| Uncle Charlie & His Dog Teddy | 23 vs 16 | 原盤 16 個索引點裡**五個本身是組曲**，拆開後 21 ＋ 2 首標記 (Bonus Track)。**行文不得說「這張碟有 23 首」** |

## 第 5 條：**兩張缺封面是 CAA 真的沒有，不是釘錯 release**

Louvin《My Baby's Gone》的 release-group 與轄下 3 個 release **全 404**；
Dock Boggs 的 release-group 與轄下 2 個 release **全 404**。
策展層改走 §4 `apple-verified-collection` 正確，兩個 collectionId 另加驗過全曲序。

**這兩張正好落在收尾要問店主的那個議題上**（放寬 §4 讓釘住 MBID 的卡也能用
`apple-verified-collection` 取封面）——**它們是這個放寬的實例，不是特例**。

## 第 6 條：**擋下策展層說法 12 處，其中 5 處與來源相反**

- Tammy Wynette《D-I-V-O-R-C-E》寫「第三張」→ 維基是**第四張**
- Odetta《One Grain of Sand》寫「1960 年代 Vanguard 目錄的**入口**」→ 維基明寫是她為 Vanguard 錄的
  **最後一張**；且「愛爾蘭、以色列、非洲曲目」與曲目表不符（只有一首愛爾蘭曲）
- Louvin《Nearer My God to Thee》寫「福音在前、《Tragic Songs》在後」→ **後者 1956 早於本張 1957**
- Dock Boggs 寫「復出後的第一張」→ 維基只說錄了三張、沒給先後
- Garth Brooks《The Chase》寫「商業曲線的轉折點」→ 首週 403,000 張、雙榜冠軍、RIAA 鑽石

另擋下七處無來源的最高級／序數說法。**NGDB 那一處要特別記**：curatorWhy 稱
「第一次真正賣開的專輯」——**專輯層級不成立**（美國榜只到第 66 名），
有來源的是**單曲**〈Mr. Bojangles〉（Hot 100 第 9）。**行文要寫「第一次賣開」必須寫在單曲上。**

**累計：策展層的時序／序數主張被攻破第六次。**

---

## （主線追加）第 7 條：**b 組推翻探測層八筆，兩張是錯配**

**六張誤記 unavailable、全部救回**（都以 `lookup?id=<collectionId>&entity=song` 覆核過曲目列攤得開且每軌有 previewUrl）：

| 卡 | 正解 | 探測落空的原因 |
|---|---|---|
| Brassens《Nº2》 | fr 1442662491（11 軌） | Apple 把編號寫成**尾綴**「(N°2)」，卡片寫在前面 |
| Brassens《Nº10》 | fr 1442280345（11 軌） | 同上 |
| Ferré《Verlaine et Rimbaud…》 | fr 1442698879（24 軌） | Apple 作《Léo Ferré **chante** Verlaine et Rimbaud》——動詞在前、掛名在中 |
| Violeta Parra《Recordando a Chile》 | **cl** 1647764240（11 軌） | Apple 盤名無副標，且**只在 cl 店面** |
| Stivell《E langonned》 | fr 1677196014（16 軌） | Apple 只作《E Langonned》，無括號內的法文對照 |
| The Chieftains《The Chieftains》 | **ie** 1573288169（11 軌） | **Apple 盤名作《The Chieftains 1》** |

**兩張 ready 是錯配**：

- **Yupanqui《Basta ya》us 1340696107 → 改回 unavailable。** 那是 ℗2006 的 19 軌再編輯，
  **前八軌全屬別張碟、原盤兩首缺席**——依 c-97 第 10 條，這是「換了內容」不是「缺一段」。
- **Chavela《La Llorona》→ es 257207298。** 原記 us 951041210 是 ℗2014 的 17 軌再編輯（appleYear 1996）；
  策展層提示的 mx 1674222184（12 軌 ℗2017）也不是本張。正解 11 軌、℗1993，曲序與時長全對。

**c-98 試聽：26/44 → 33/44（a 組）→ 38/44（b 組）。**

## 第 8 條：**《The Chieftains》這一張把三道防線同時打敗** —— 自我同名卡的最壞情形

Apple 上這張叫**《The Chieftains 1》**（後來為了與續作對齊而回頭加的序號），卡片叫《The Chieftains》。於是：

1. `titleOk` 的 **selfTitled 嚴格比對**——自我同名卡只接受完全相等，`The Chieftains 1` 不相等，擋掉。
2. **第 168 條的卷號記號**——卡片側沒有卷號、Apple 側有「1」，判成不同碟，擋掉。
3. **數字殘餘**（第 77 條那一族）——殘餘是「1」，含數字，擋掉。

**三道都是對的規則，三道都擋掉了正解。** 這不是要放寬哪一道，
而是：**「自我同名的首作」這個型態，探測層天生配不到，只能人工釘**——
因為「藝人名＋序號」既是最常見的續作命名，也是這一張的真實盤名。
往後排到系列首作（The Chieftains、Chicago、Led Zeppelin 這一類）**直接預期要人工**。

**順帶記兩個店面**：`cl`（智利）與 `ie`（愛爾蘭）都存在且回得出結果，
但**現行的 WLD／UKB 店面組都沒有它們**——本批兩張正解各只在其中一個店面上。
（對照：`cu` 不存在，加了會回 HTTP 400，見 c-99 策展層抓到的那筆。）本批不改店面組。

## 第 9 條：**b 組擋下策展層說法 19 處，其中 5 處與來源相反**

- **José Afonso《Venham mais cinco》「收錄〈Grândola, Vila Morena〉」——假的。**
  該曲 1971 年 10 月錄、收在《Cantigas do Maio》（1971-12，**池中已有那張**）。原盤十軌沒有它。
- Inti-Illimani 2「米蘭錄的第一張流亡專輯」→ es 維基明寫是義大利錄製發行的**第二張**
- Malicorne《Le Bestiaire》「第五張／四張自我同名之後第一張有獨立盤名」→ fr 維基記第**六**張，
  自我同名只有三張，《Almanach》(1976) 早就有獨立盤名
- Planxty「Tara 廠牌的創業盤」→ 廠牌首發是 Christy Moore《Prosperous》
- Neşet Ertaş「1990 年代末回到土耳其定居前後」→ 他 1979–2003 住德國，**2003 才回國**

另擋下九處無來源的最高級／評價、五處時序或事實需修正
（Chavela 是 1991 年**墨西哥城** El Hábito 復出不是西班牙、Violeta Parra 那五首錄於 1964 **聖地牙哥**
不是巴黎、Nic Jones 是五張不是六張、Selda 只有 1984-04-24 **一次**入獄不是三度）。

**兩處時序主張查證通過**：Jara《Canto por travesura》「生前最後一張」（限定錄音室專輯）、
Neşet Ertaş「Türkmen／Abdal 傳統最後一位大家」（tr 維基開頭原話）。

**累計：策展層的時序／序數主張被攻破第七次，本批一批就佔了兩次。**

## 第 10 條：兩處年份兩說，一律維持卡單值、禁止行文斷言（裁定 141）

- **The Chieftains 卡單 1963**：策展層原本的理由（「Discogs 那筆 catno 是 CC2、疑為再壓」）
  **已被推翻**——MB 自己的 1963 那筆 catno 也是 CC2，而 Claddagh 的 **CC1 是
  Leo Rowsome《Rí Na bPíobairí》(1959)**。1964 那一側有 en 維基＋Discogs master 334099＋Apple ℗1964 三個來源。
- **Ruhi Su 卡單 1972**：tr 維基的專屬條目與藝人唱片目錄**兩處都記 1973**
  （1972 那兩格是《Yunus Emre》與《Karacaoğlan》）。

兩張都維持卡單值，`yearVerified` 已寫明幾說，**行文一律不得正面斷言發行年**。
