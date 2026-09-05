## 2026-09-05 — dip-vinyl-shop — c-100 策展提案（古典演奏家傳奇錄音目錄深度）

- **改動摘要**：新增 `batch-progress/c100/prop-a.json`（**40 張、32 位掛名**，單組 `g: "a"`），
  `lineType: 廣度`。全批 `genres` 一律 `classical`。
  - **只補演奏者卡，未新增任何作曲家卡形態**（藍圖 §五-6）：40 張的掛名全部是指揮／獨奏者／
    歌者／室內樂團，池中的 Mozart／Schubert／Bartók 那幾張作曲家卡自始未當基準。
    每一張都回問 MB 的 artist-credit 確認過；artist-credit 同時掛作曲家與演奏者的 32 張，
    卡片掛名一律取演奏者，完整 credit 字串逐字寫進 `mbNote`（見 `rulings.md` 第 3 條）。
  - **骨幹名單 16 位補了 15 位、共 26 張**：Toscanini 2（Respighi 羅馬三部曲 1990／Tchaikovsky 曼弗雷德 1991）、
    Schnabel 2（Complete Schubert Recordings 2005／Beethoven Piano Concertos 1993）、
    Cortot 1（Victor Recordings of 1919-1926, 1989）、Kreisler 2（Berlin HMV 1926-27, 1991／
    1926 & 1927 Victor Recordings, 1993）、Van Cliburn 2（Rachmaninoff PC3 1959／Prokofiev PC3 1961）、
    Milstein 1（Paganiniana 1984）、Mravinsky 2（Shostakovich 5 1992／Shostakovich 11 1994）、
    Budapest String Quartet 2（Mozart Haydn Quartets 1991／Ravel・Debussy 1953）、
    Busch Quartet 1（Schubert 死與少女・D 887, 1988）、Quartetto Italiano 2（Debussy・Ravel 1966／Schubert D 887 1978）、
    Grumiaux Trio 1（Beethoven Serenades op. 8 & 25, 1968）、Fischer-Dieskau 1（Schubert Lieder Volume 1, 1970）、
    Marian Anderson 1（The Lady From Philadelphia 1995）、Caruso 1（The Caruso Edition, Volume I 1990）、
    Sutherland 2（Operatic Arias 1959／La sonnambula 1963）、Wunderlich 1（Salzburger Liederabend 1984）。
  - **名單外自加 11 位、共 11 張**（每位都先實掃池中張數，結果寫進 `why`）：
    Alban Berg Quartett（池中 1）、Emerson String Quartet（1）、Erich Kleiber（1）、Amadeus Quartet（2）、
    Pablo Casals（2）、Sergiu Celibidache（2）、Elisabeth Schwarzkopf（2）、Kathleen Ferrier（3）、
    Emil Gilels（3）、Arturo Benedetti Michelangeli（3）、Arthur Rubinstein（3）、Karl Richter（3）、
    Jacqueline du Pré（2）。
  - **3 張併掛卡**讓池中只有 1–2 張的三位順帶補深：`Jacques Thibaud & Alfred Cortot`（Franck／Fauré／Debussy 奏鳴曲）、
    `Cortot / Thibaud / Casals`（Beethoven 大公三重奏／Schubert D 898，依第 16 條斜線併列）、
    `Elisabeth Schwarzkopf & Dietrich Fischer-Dieskau`（Mahler 少年魔號）。
    兩種併掛形態都有池中先例（Glenn Gould & Leonard Bernstein／Rubinstein / Heifetz / Feuermann）。
  - **§5.6 合輯 0 張**（見下）。
- **主要檔案**：`batch-progress/c100/prop-a.json`、`batch-progress/c100/rulings.md`（10 條裁定）、
  `batch-progress/memory-entries/c100-curation.md`（本檔）。
- **驗證結果**：`node batch-progress/c100/chk-prop.mjs a` → **40 張、32 位、標記 0**；
  跨批去重掃到 51 批（其中 3 批讀 prop）、2,380 張卡，**跨批撞卡 0**。
  40 張全部釘住 release-group MBID 並**逐一回問
  `release-group/<id>?fmt=json&inc=artist-credits+releases`**，確認 title、artist-credit、
  first-release-date、primary-type、secondary-types 與轄下 release 的國別／status（第 41 條）：
  **合計 96 個 release，status 全數 `Official`**（第 43／57／65／78 條的授權判定；
  其中 4 筆 release 的 status 欄為空、非 Unofficial，已逐張在 `risk` 寫明，且每張都另有
  至少一筆 Official release 可依）。
  藝人目錄一律用 `release-group?artist=<MBID>&limit=100&offset=` 分頁（第 116 條）——
  本批這條踩得極兇：**Fischer-Dieskau 332 筆、Rubinstein 282、Toscanini 197、Gilels 161、
  Karl Richter 121、Schwarzkopf 116、Celibidache 114、Sutherland 113、Casals 111、
  Michelangeli 102、Kreisler 91、Caruso 90、Mravinsky 85、Alban Berg Quartett 81、
  Amadeus Quartet 77、Wunderlich 76、Milstein 71、du Pré 69、Schnabel 63**——
  十九位藝人的 RG 數超過 60，用 browse 預設的 25 筆會得出大量假查無。
  撞卡檢查在 `seed_cards.json` 全 14,424 列上做，另做「同掛名 × 盤名子字串」的鬆散比對，
  以及對 Mravinsky／Gilels／Casals 的西里爾原文與各種拉丁轉寫、Fischer-Dieskau 的
  U+2010／ASCII 兩種連字號、du Pré 的帶／不帶重音兩種寫法逐一實掃——**真撞卡 0**。

### `primary-type` 分佈（本批的頭號發現，要往後傳）

實掃 29 位演奏家名下 **2,742 個 release-group**：

| | 全部掃到的 RG | 本批收錄的 40 張 |
|---|---|---|
| Album（`secondary-types` 空） | 1,579 | **36** |
| **Album ＋ secondary Compilation** | **850** | **4** |
| Album ＋ secondary Live | 167 | 0 |
| Album ＋ Compilation ＋ Live | 34 | 0 |
| Single／EP | 61／13 | 0 |
| primary-type 欄為空 | 22 | 0 |
| **`primary-type=Compilation`** | **0** | **0** |

**§5.6 一張都沒開。** 派工預期「歷史錄音的專輯多半是後世整編，§5.6 會用得很兇」——
實測與 c-95（藍調，1,676 個 RG、Compilation 0 筆）**形狀完全相同**：MB 把歷史錄音的
後世整編一律建成 `primary-type=Album` ＋ `secondary-types=[Compilation]`，依 §5.6 明文
照一般 Album 寫、不填例外欄位。本批那 4 張（Schnabel 貝多芬協奏曲、Kreisler 兩張、Caruso）
已逐張在 `risk` 寫明理由。詳見 `batch-progress/c100/rulings.md` 第 1 條。

### 這批的裁定（策展層自決，依 2026-09-02 店主下放）

全文見 `batch-progress/c100/rulings.md`，十條摘要：

1. **§5.6 一張都沒開**——`primary-type=Compilation` 實測 0 筆，與 c-95 同形。
2. **古典盤名沿用池中「作曲家: 作品（版本）」慣例**，不照抄 MB 的 release-group 標題
   （Toscanini 名下有十幾筆叫《Symphony no. 5》）。MB 標題本身是唱片名的 8 張照抄，其餘 32 張補作曲家前綴。
3. **artist-credit 一次列四到七個演奏方時「取哪一位」**：協奏曲取獨奏者、歌劇取指揮或領銜歌者、
   實質對等者併掛（`&` 兩人／斜線三人以上）。
4. **封面落空就換釘：9/40 因 CAA 404 改釘**，最終 40 張 CAA 全數 200。
5. **Szigeti & Schnabel《The Legendary Frick Collection Recital》剔除**——封面鏈斷且無替代，
   依 §4 停止該筆；**不列 §1 候選**（它釘得住 MB，缺的是封面不是身分）。
6. **同曲不同人一律收**（古典的一張卡＝作品 × 演奏者 × 版本），但盤名必須能分辨：
   加錄音年括號／把同碟第二首寫進盤名／靠原盤曲序。
7. **「刻意不釘」在這批爆量**：40 張合計點名 180 個以上對照組 MBID，歷來最高密度。
   最危險的一種是「同一藝人同一曲目的二十年後重錄」（Sutherland 1962 vs 1982、
   Alban Berg Quartett 1983 錄音室 vs 1989 現場）——掛名與盤名都分不出來，只能核班底。
8. **西里爾與轉寫**：Mravinsky 池中兩張分裂成 `Evgeny`／`Yevgeny` 兩種寫法，本批統一用 `Yevgeny`；
   Gilels 用 `Emil Gilels`（非 DG 法語系列的 `Emil Guilels`）；Casals 用池中的 `Pablo Casals`（非 MB 主名 `Pau Casals`）；
   Fischer-Dieskau 用 ASCII 連字號（MB 用 U+2010）。**池中那兩張 Mravinsky 該併——本機待辦。**
9. **Toscanini 只收 2 張、Fischer-Dieskau 只收 1 張，是資料面不是名單問題**：
   名下 RG 多寡與可收的 RG 多寡是兩件事，中間隔著封面鏈、撞卡與分卷三道濾網。
10. **Wolf《Spanisches Liederbuch》(1967) 迴避**——與池中 Schwarzkopf《Wolf: Lieder》(1967)
    有同碟疑慮，改收《Des Knaben Wunderhorn》(1968)。

### §1 補遺候選（本批：0 筆）

**沒有任何一張因為「MB 查無」而未收。** 這是本批與台灣線、東南亞線最大的差別：
古典正典演奏家在 MB 上的建檔密度極高（29 位合計 2,742 個 release-group），
問題從來不是「找不到」，而是「太多、彼此重複、且標題無法識別」。
唯一被剔除的整張（Szigeti & Schnabel《The Legendary Frick Collection Recital》，
`c0261b0b`，1993 Pearl）**釘得住 MB，缺的是封面**，§1 解決不了這個問題，因此不列候選。

### 撞卡未收清單

| 藝人 | 專輯 | 情況 |
|---|---|---|
| Arturo Toscanini | Beethoven: Symphony no. 3 Eroica | 池中已有（1953）。`8e53ec3e`《Toscanini Conducts Beethoven: Eroica, Egmont, Leonore No. 3》是同一份錄音，刻意不釘 |
| Artur Schnabel | Beethoven: Complete Piano Sonatas | 池中已有（1932-35）。`f3ceecff`／`a193e4d7`／`bf7d5e1f` 三筆同錄音，刻意不釘 |
| Alfred Cortot | Chopin: 24 Préludes | 池中已有（1934）。`8d28afc4`／`a242e4c4`／`9a4e7c56` 三筆蕭邦整編有同碟疑慮 |
| Fritz Kreisler | The Complete Recordings | 池中已有（1946）。`42b3da0d`／`8b893ffb` 兩筆總集刻意不釘 |
| Van Cliburn | Tchaikovsky: Piano Concerto no. 1 | 池中已有（1958）。`ad1f0a13`／`e2c73b4e` 刻意不釘 |
| Nathan Milstein | Bach: Sonatas & Partitas／Mendelssohn: Violin Concerto | 池中已有 2 張。巴哈無伴奏在 MB 上有 **7 筆**同錄音建檔，全部刻意不釘 |
| Yevgeny Mravinsky | Tchaikovsky: Symphonies 4-6／Shostakovich: Symphony no. 8 | 池中已有 2 張。`5e3f4fa2`／`d7b46b56`／`23de0bed`／`7cdb9a86`／`5c71711f` 刻意不釘 |
| Budapest String Quartet | Beethoven: Late String Quartets | 池中已有（1962）。`a43c8fdb`／`5cedf780`／`18816c0f` 刻意不釘 |
| Busch Quartet | Beethoven: Late Quartets (1930s) | 池中已有（1941）。同錄音在 MB 上有 **5 筆**分卷建檔，全部刻意不釘 |
| Quartetto Italiano | Beethoven: Complete String Quartets／Brahms: Piano Quintet | 池中已有 2 張（後者與 Pollini 合掛）。`012e7d69`／`c0e8f1a1`／`c03b439d` 刻意不釘 |
| Grumiaux Trio | Mozart: Complete String Quintets | 池中已有（1973）。`faf25cfa`／`07f23c2c` 刻意不釘 |
| Dietrich Fischer-Dieskau | Winterreise／Die schöne Müllerin／Schwanengesang／Mahler: Kindertotenlieder | 池中已有 4 張（含 1 張與 Gerald Moore 合掛）。三大聯篇歌集全滿，`60cf5f2b`／`ca4502d5`／`f5b38364`／`949f76e7` 刻意不釘 |
| Marian Anderson | Spirituals | 池中已有（1956）。`4731421d`／`76829b2e`／`b64079c1` 三筆有同碟疑慮 |
| Enrico Caruso | The Complete Recordings | 池中已有（1920）。Naxos 的《The Complete Recordings, Volume 1–12》十二卷與 `6556d69d`《The Complete Caruso》全部刻意不釘 |
| Joan Sutherland | The Art of the Prima Donna／Donizetti: Lucia di Lammermoor | 池中已有 2 張。`04e9c262`／`a36af279`／`7c1ec59e` 刻意不釘 |
| Fritz Wunderlich | Schubert: Die schöne Müllerin／Schumann: Dichterliebe | 池中已有 2 張。`39c5d026`／`109cafb8`／`0f6df475`／`69799bfb` 刻意不釘 |
| Alban Berg Quartett | Mozart: The Late String Quartets | 池中已有（1994）。五筆莫札特分張刻意不釘 |
| Emerson String Quartet | Shostakovich: The String Quartets | 池中已有（1999）。`182dd5cf`／`39be36ad` 刻意不釘 |
| Erich Kleiber | Mozart: Le nozze di Figaro (1955) | 池中已有。同錄音在 MB 上有 **5 筆**（含西語與選段版），全部刻意不釘 |
| Amadeus Quartet | Haydn: String Quartets op. 76／Schubert: String Quintet | 池中已有 2 張。`1b477e8a`／`78e37293`／`56126f8a`／`056f1c4e`／`55ddddc4` 刻意不釘 |
| Pablo Casals | Bach: Cello Suites (1936-39)／Song of the Birds | 池中已有 2 張。大提琴組曲在 MB 上有 **7 筆**同錄音建檔，全部刻意不釘 |
| Sergiu Celibidache | Bruckner: Symphony no. 8／no. 4 | 池中已有 2 張。`b6aee0ec`／`9b36dbe2` 等布魯克納各筆刻意不釘 |
| Elisabeth Schwarzkopf | Wolf: Lieder／R. Strauss: Vier letzte Lieder | 池中已有 2 張。`b7ddec8a`《Spanisches Liederbuch》因與前者同碟疑慮而迴避（裁定第 10 條）、`e8c4a2c9`／`d520f2db`／`b414f2f3` 刻意不釘 |
| Kathleen Ferrier | Gluck: Orfeo ed Euridice／Bach & Handel Arias／Brahms: Alto Rhapsody | 池中已有 3 張。`8cc21f66`／`20a4b915`／`aeb0a873`／`3a0a8ff2` 刻意不釘 |
| Emil Gilels | Beethoven: Waldstein / Appassionata／Beethoven: Piano Concertos (Szell)／Brahms: PC2 | 池中已有 3 張。`362316b9`／`a8a5c578`／`4ab4cd60`／`38cc9c95`／`c2f4c3a2` 刻意不釘 |
| Arturo Benedetti Michelangeli | Debussy: Images／Beethoven Recital／Ravel・Rachmaninoff | 池中已有 3 張。`2a7d0dcb`／`917841c6`／`25aa932b` 刻意不釘 |
| Arthur Rubinstein | Chopin: Nocturnes／Ballades & Scherzos／Polonaises／Archduke Trio | 池中已有 4 張。`9b888bdd`／`f761c0a8`／`06b43e0b`／`1fd714ef`／`a0366d1c` 刻意不釘 |
| Karl Richter | Bach: Mass in B minor／St. Matthew Passion／Christmas Oratorio | 池中已有 3 張。`fe95965a`／`0dd20072`／`3d2342c6`／`690e4083`／`6c3e0d95` 刻意不釘 |
| Jacqueline du Pré | Elgar: Cello Concerto／Haydn: Cello Concertos／Brahms: Cello Sonatas | 池中已有 3 張。`d872a65a`／`08728b19`／`e9f0aa26` 刻意不釘 |
| Joseph Szigeti | （本批 0 張） | 池中 1 張（Bartók: Contrasts 1940）。唯一候選《The Legendary Frick Collection Recital》CAA 404，依 §4 剔除 |

**主動不收的名單外藝人**（實掃池中已達 4 張以上，本批優先補 1–3 張的）：
Herbert von Karajan（池中 23 筆）、Sviatoslav Richter（7）、Otto Klemperer（10）、
Wilhelm Furtwängler（7）、Leonard Bernstein（含 Elmer Bernstein 7）、Glenn Gould（6）、
Vladimir Horowitz（6）、Maria Callas（6）、Jascha Heifetz（6）、David Oistrakh（6）、
Mstislav Rostropovich（5）、Carlos Kleiber（4，另 Erich Kleiber 1 已補）。

### 查過的所有掛名寫法

Arturo Toscanini／Toscanini／NBC Symphony Orchestra & Arturo Toscanini；
Artur Schnabel／Arthur Schnabel；Alfred Cortot／Cortot／Cartot（Apple 誤拼）；
Jacques Thibaud／Jaques Thibaud（Apple 誤拼）；Pablo Casals／Pau Casals（MB 主名）；
Fritz Kreisler；Van Cliburn；Nathan Milstein；
**Евгений Александрович Мравинский／Yevgeny Mravinsky／Evgeny Mravinsky／Evgeni Mravinsky／Eugene Mravinsky**；
Budapest String Quartet／Budapest Quartet／Budapester Streichquartett（並排除 Budapest Haydn Quartet、Budapest Strings）；
Busch Quartet／Busch Quartett／Busch String Quartet；Quartetto Italiano／Italian String Quartet
（並排除 Nuovo Quartetto Italiano、Quartetto Italiano di Tromboni）；
Grumiaux Trio／Trio Grumiaux／Arthur Grumiaux Trio；
**Dietrich Fischer‐Dieskau（U+2010）／Dietrich Fischer-Dieskau（ASCII）**；
Marian Anderson（並排除同名 punk 歌手 abb6ae12 與 Marian Anderson String Quartet 4c28440e）；
Enrico Caruso（並排除同名義大利製作人 5726230b 與美國 shoegaze 團 7c57d2fe）；
Joan Sutherland／Dame Joan Sutherland（並排除同名小提琴手 50476229）；
Fritz Wunderlich（並排除同名嘉年華歌手 525b2cbe 與 Klaus Wunderlich）；
Alban Berg Quartett／Alban Berg Quartet；Emerson String Quartet；
Erich Kleiber（並與 Carlos Kleiber 區隔）；Amadeus Quartet／Amadeus String Quartet
（並排除 Wolfgang Amadeus Mozart 與 Phoenix《Wolfgang Amadeus Phoenix》的單字誤中）；
Sergiu Celibidache／Sergu Celibidache（Apple 誤拼）／Serge Celibidache；
Elisabeth Schwarzkopf／Elisabeth Schwartzkopf（Apple 誤拼）；Kathleen Ferrier／Kathleen Ferrer；
**Эмиль Гилельс／Emil Gilels／Emil Guilels（DG 法語系列）／Emil Gilel**；
Arturo Benedetti Michelangeli／Benedetti Michelangeli／ABM（並排除 Umberto Benedetti Michelangeli）；
Arthur Rubinstein／Artur Rubinstein（並與作曲家 Anton Rubinstein 區隔）；
Karl Richter（並排除同名巴松管手 b613f4c6 與池中的 Max Richter 6 張、Sviatoslav Richter 7 張）；
**Jacqueline du Pré／Jacqueline du Pre**。

### 封面與試聽預估

- **封面：40 張全部 CAA release-group 端點實測 200，預估命中率 100%。**
  這是在定案前對 **62 個候選 release-group** 打過 CAA、把 9 筆 404 全部換釘之後的結果
  （裁定第 4 條）。**Toscanini 的 NBC 歌劇整編全線 404**（Falstaff／La traviata／
  Messa da requiem／Fidelio 四筆），是本批唯一整塊封面空白的區域。
- **試聽**：查到精確 Apple `collectionId` 的 **29 張**，**店面全部落在 `gb`**——
  本批店面序 `UKB`（gb→us→jp→de→fr→ie→ca→au），gb 第一順位即命中，
  EMI／Decca／DG／HMV 的歷史錄音目錄權在英德，這個序是對的。
  **預估 `unavailable` 11 張**：Cortot《Victor Recordings of 1919-1926》、
  Kreisler《The Berlin HMV Recordings, 1926-27》、Milstein《Paganiniana》、
  Budapest SQ 兩張、Quartetto Italiano《Schubert D 887》、Caruso《The Caruso Edition, Volume I》、
  Wunderlich《Salzburger Liederabend》、Schwarzkopf《Die lustige Witwe》、
  Rubinstein《Rubinstein Plays Liszt》、Schnabel《Beethoven Piano Concertos》——
  十一張的封面都有 CAA，只有試聽缺；七個店面（gb／us／jp／de／fr／it／ie）都試過。
- **⚠ 六個必須在上架前處理的 Apple 陷阱**（已逐張寫進 `risk`）：
  1. **Sutherland《La sonnambula》**：Apple gb 同時有 1962 翡冷翠版（`1452382824`，本卡）與
     1982 Pavarotti 版（`1452561108`）——**同歌者、同指揮、不同樂團**，是本批最像的假陽性。
  2. **Alban Berg Quartett《Beethoven: The Late String Quartets》**：Apple gb 首位命中的
     `726264114` 是 1989 年維也納**現場**版，不是本卡的 1982–83 錄音室版。
  3. **Schwarzkopf《Die lustige Witwe》**：Apple 七店面只找得到 1953 Ackermann 版
     （`398212052`／`364138621`／`353062414`），本卡是 1962–63 Matačić 版，**三筆一律不得採用**。
  4. **Ferrier《Das Lied von der Erde》**：Apple `593986448` 同時包含池中既有的
     《Brahms: Alto Rhapsody》，會一碟撞兩卡。
  5. **du Pré《Dvořák》**：Apple gb 有 `1292699312` 與 `1623642269` **兩筆同名同年**，
     另有 `696896682`（含 Haydn，撞池中）與 `693626946`（含 Elgar，撞池中）。
  6. **Amadeus Quartet《Haydn op. 71/74/77/103》**：Apple `1452488474` 把 op. 76 併進來，
     會撞到池中既有的《Haydn: String Quartets op. 76》。
- **年份分歧**：**40 張裡有 24 張的出版年與錄音年落差 ≥10 年**，最大的是
  Caruso（錄 1902–1908、出 1990，八十二年）、Schnabel 舒伯特（錄 1932–1950、出 2005）、
  Cortot（錄 1919–1926、出 1989）、Kreisler 兩張（錄 1926–27、出 1991／1993）。
  **一律取 release-group 的 `first-release-date`**（第 91／95 條：rgMbid 是身分鍵不是年份來源），
  錄音年寫進 `why`、落差寫進 `risk`，行文明令不得把出版年當演出年。
  **唯一一張年份取捨有爭議的是 Ferrier《Das Lied von der Erde》**：MB 只建到 1961 年那筆
  Decca LXT 5576，1952 年的原始發行未建檔，依第 95 條本應改採原盤年，但 Decca 1952 年
  以 78 轉與早期 LP 分批發行、原盤年考據不一，**維持 MB 的 1961 並在卡片盤名加註 (1952)**。
- **三軸**：古典依 §0.7 一律**錨點制人工評分**（`manual:classical-rubric`），不得用 `/album-rating`
  的機器值；本批 40 張全部是 1902–1991 年的錄音、其中 **16 張是 1950 年前的歷史錄音**，
  §0.7 明文「1950 前歷史錄音音質 +1」的硬蕊修正會用到。
  **pearl 依 §0.7 古典特例不適用 listeners <300 門檻**，需人工判定＋兩個證據網址。

### 場景飽和度

**演奏者卡這個形態在池中還沒飽和，但已經從「空」進到「不平均」**——
指揮那一端明顯過重（Karajan 23、Klemperer 10、Furtwängler 7），而同級別的
Toscanini 補完後才 3 張、Mravinsky 4 張、Erich Kleiber 2 張、Celibidache 3 張；
室內樂那一端則整體偏薄（本批之前六個弦樂四重奏加起來只有 7 張，補完後 15 張）。
本批補完後仍明顯空的三塊：**1900–1930 年代的器樂獨奏（Busoni、Paderewski、Josef Hofmann、
Rachmaninoff 本人的鋼琴錄音全部 0 張）、二戰後的歐陸歌劇指揮（Karl Böhm、Georg Solti、
Rafael Kubelík、Fritz Reiner 幾乎全空）、以及古樂復興那一代
（Harnoncourt、Leonhardt、Hogwood、Gardiner、Herreweghe 池中都極少或 0 張）**。

- **未做**（依 `REMOTE_RUNBOOK.md`，雲端不碰）：三軸與 rarity（應照 §0.7 錨點制、
  `manual:classical-rubric`）、頂點資格評估、封面、簡介、固定試聽、作曲家欄（`seed_cards.json`
  第 8 欄）、Firestore／KV／`seed_cards.json`／`apex_pool.json` 寫入。
