# c-98 民謠／鄉村目錄深度：策展層裁定（2026-09-05）

依 2026-09-02 店主下放，本批所有策展／研究／管線裁定由策展層自決並記錄於此。

---

## 1. 本批 §5.6 用量為 0——判準改成看 `primary-type` 本身

派工信預期「§5.6 這批會用很兇」。實掃結果與 c-95（爵士與藍調）一致：

**MusicBrainz 不用 `primary-type=Compilation` 建 1940–50 年代的整編輯。**
本批掃過的 16 位 a 組藝人名下 release-group 合計 **1,972 筆**
（Hank Williams 214、Patsy Cline 355、Tammy Wynette 265、Marty Robbins 370、
Flatt & Scruggs 101、Pete Seeger 153、Joan Baez 159、Woody Guthrie 96、
Louvin Brothers 64、Odetta 44、Garth Brooks 73、Randy Travis 65、NGDB 62、
Dock Boggs 8、Elizabeth Cotten 5、J.D. Crowe & The New South 17），
**`primary-type=Compilation` 是 0 筆**；整編輯一律建成 `primary-type=Album` ＋ `secondary-types=[Compilation]`。

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
