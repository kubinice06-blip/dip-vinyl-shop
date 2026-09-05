# c-100 策展裁定（古典演奏家傳奇錄音目錄深度，單組 a）

2026-09-05。依 2026-09-02 店主下放，以下十條全由策展層自決，未上呈。
判準沿用三條：有先例照先例、可逆就直接定、卡住整條線就當場定。

---

## 1. §5.6 一張都沒開——`primary-type=Compilation` 實測 0 筆，與 c-95 的結論完全一致

派工信寫「歷史錄音的『專輯』多半是後世整編，§5.6 會用得很兇」。**實測結果是一張都沒用到。**

實掃 29 位演奏家名下 **2,742 個 release-group**（一律用
`release-group?artist=<MBID>&limit=100&offset=` 分頁全列，第 116 條），型別分佈：

| primary-type | 筆數 |
|---|---|
| Album（secondary-types 空） | 1,579 |
| **Album ＋ secondary Compilation** | **850** |
| Album ＋ secondary Live | 167 |
| Album ＋ Compilation ＋ Live | 34 |
| Single | 61 |
| EP | 13 |
| primary-type 欄為空 | 22（其中 4 筆帶 secondary Compilation） |
| Broadcast／Other／Audio drama／Soundtrack 等 | 12 |
| **`primary-type=Compilation`** | **0** |

古典歷史錄音的後世整編，MB 一律建成 `primary-type=Album` ＋ `secondary-types=[Compilation]`，
與 c-95 在 1,676 個藍調 release-group 上量到的形狀**完全相同**。

**裁定：依派工「判準是 `primary-type` 本身」與 §5.6 明文，全批 40 張 `releaseType` 一律填 `Album`、
`exceptionReason` 與 `exceptionEvidenceUrls` 一律留空。** 本批 40 張裡有 **4 張**帶 secondary Compilation
（Schnabel《Schnabel Plays the Beethoven Piano Concertos》、Kreisler 兩張、Caruso《The Caruso Edition, Volume I》），
四張都已在 `risk` 欄寫明「照一般 Album 寫法、不填例外欄位」的理由。

**這條要往後傳**：c-95（藍調）與 c-100（古典）兩批、合計 4,418 個 release-group，
`primary-type=Compilation` 都是 0 筆。**歷史錄音批不要預設會開 §5.6，先掃型別分佈再說。**

---

## 2. 古典卡的盤名沿用池中既有的「作曲家: 作品」慣例，不照抄 MB 的 release-group 標題

派工說「盤名是那張唱片的名字」。但古典的 release-group 標題大量是
《Symphony no. 5》《Violin Concertos》《Lieder》這種**只有作品名、沒有作曲家、也不唯一**的字串——
Toscanini 名下 197 筆裡有十幾筆叫《Symphony no. 5》或《Symphony no. 9》。直接照抄會造出一整批
無法識別、彼此互相吃掉的卡片盤名。

池中既有的 200 餘張古典演奏者卡走的是另一套：**`artist` 放演奏者、`album` 寫「作曲家: 作品（版本標記）」**
（`Arturo Toscanini`／《Beethoven: Symphony no. 3 Eroica (1953)》、`Karl Richter`／《Bach: Mass in B minor》），
與 `ALBUM_ONBOARDING` §0.6 的作曲家欄設計是同一套。

**裁定：分兩種情況——**
1. **MB 標題本身就是一個唱片名**（《The Lady From Philadelphia》《Paganiniana: Violin Recital》
   《Rubinstein Plays Liszt》《The Caruso Edition, Volume I》《Salzburger Liederabend》）→ **照抄**。
   池中本來就有這種形態（《Sofia Recital 1958》《Horowitz at the Met》《Song of the Birds》）。
2. **MB 標題只是作品清單**（《Symphony no. 5, op. 47》《Concerto no. 3》《Lieder Volume 1》）→
   **補上作曲家前綴，必要時加錄音年括號**，照池中慣例。

依第 91／95 條，**RG 標題與卡片盤名本來就不必相等**；每一張的 MB 原標題都逐字寫進了 `mbNote`，
下游要回查 MB 有完整字串可用。全批 40 張裡走第 1 種的 8 張、走第 2 種的 32 張。

---

## 3. artist-credit 同時掛作曲家與演奏者時取演奏者——但「取哪一個演奏者」需要第二層規則

派工已定「artist-credit 同時掛作曲家與演奏者時，卡片掛名取演奏者」。實作時發現
古典的 artist-credit **經常一次列出四到七個演奏方**（作曲家＋樂團＋指揮＋獨唱者），
派工沒說取哪一個。

**裁定：取「這張唱片是誰的唱片」那一位**，判準是廠牌當年怎麼賣它：

- **協奏曲取獨奏者**：Van Cliburn 兩張（credit 依序是作曲家、樂團、指揮、鋼琴家）、
  Casals《Dvořák: Cello Concerto》（credit 是 Casals ＋ Szell）、du Pré《Dvořák》。
- **歌劇與大型聲樂取指揮或領銜歌者**：Erich Kleiber《Der Rosenkavalier》取指揮
  （credit 裡四位歌者排在指揮前面，但這張是「Kleiber 的玫瑰騎士」）；
  Sutherland《La sonnambula》與 Schwarzkopf《Die lustige Witwe》取領銜歌者
  （credit 裡指揮排最後，但這兩張是歌者的唱片）。
- **兩人以上實質對等時併掛**，用池中既有的兩種形態：
  `&` 連接（`Elisabeth Schwarzkopf & Dietrich Fischer-Dieskau`、`Jacques Thibaud & Alfred Cortot`，
  同池中的 `Glenn Gould & Leonard Bernstein`、`David Oistrakh & Lev Oborin`）；
  三人以上用斜線（`Cortot / Thibaud / Casals`，依第 16 條，同池中的
  `Rubinstein / Heifetz / Feuermann`、`Oistrakh / Rostropovich / Richter / Karajan`）。

**完整的 artist-credit 字串每一張都逐字寫進 `mbNote`**，取捨的理由寫在 `why` 或 `risk`。

**副作用是好的**：三張併掛卡讓 Jacques Thibaud（池中 1 張）、Pablo Casals（2 張）、
Elisabeth Schwarzkopf（2 張）各多一張，而不必為他們另找單人碟。

---

## 4. 封面落空就換釘——9/40 因 CAA 404 改釘，這是 c-95 第 4 條在古典線的第二次應驗

依 c-95 裁定第 4 條（「戰前與 1950 年代的碟，策展層應在定案前先打一次 CAA release-group 端點」），
本批在定案前對 **62 個候選 release-group** 打了 CAA。結果 **9 筆 404，全部換釘**：

| 原候選 | CAA | 改釘 |
|---|---|---|
| Toscanini《Falstaff》`ab8660f8` | 404 | Toscanini《Manfred Symphony / Romeo & Juliet》`3f6128b1`（200） |
| Szigeti & Schnabel《The Legendary Frick Collection Recital》`c0261b0b` | 404 | **整張剔除**（見第 5 條） |
| Cortot《Carnaval and Etudes Symphoniques》`3871cdec` | 404 | Cortot《Victor Recordings of 1919-1926》`d007350e`（200） |
| Kreisler《The 1928 Victor Recordings》`867b6d9f` | 404 | Kreisler《The 1926 & 1927 Victor Recordings》`bf952c10`（200） |
| Mravinsky《Legendary Concerts at Moscow Conservatory 1965》`4574c5b9` | 404 | Mravinsky《Symphony no. 11 "The Year 1905"》`be80ebe5`（200） |
| Budapest SQ《The Last Quartets of Mozart, Volume I》`fecf327e` | 404 | Budapest SQ《“Haydn” Quartets》`2acfd6f6`（200） |
| Quartetto Italiano《Haydn op. 76 nos. 3 & 4》`9a142d28` | 404 | Quartetto Italiano《String Quartet op. 161, D887》`bd835f1f`（200） |
| Fischer-Dieskau《Dichterliebe • Liederkreis Op. 24》`5effb631` | 404 | Fischer-Dieskau《Lieder Volume 1》`f5a517ee`（200） |
| Amadeus Quartet《String Quartets op. 59 no. 3 & op. 74》`4b37c9c0` | 404 | Amadeus Quartet《Streichquartette op. 71 op. 74 op. 77 op. 103》`4719f2d7`（200） |

**最終 40 張全部 CAA release-group 端點 200**，封面預估命中率 100%。

**Toscanini 那一格特別記一筆**：他名下**所有歌劇整編**（`ab8660f8` Falstaff、`01b94cb0` La traviata、
`a3655705` Messa da requiem、`73993697` Fidelio）**CAA 全部 404**。他 1946–1954 年的 NBC 歌劇廣播
是他目錄裡分量最重的一塊，卻在 CAA 上一張封面都沒有。這不是資料錯誤，是這塊在 MB／CAA 建檔太薄。

---

## 5. Szigeti & Schnabel《The Legendary Frick Collection Recital》剔除——封面鏈斷且無替代

`c0261b0b`（1993 Pearl GEMM CDS 9063 系列）是 1948 年 Frick Collection 的實況，
Szigeti 與 Schnabel 唯一的商業獨奏會錄音。CAA 404，Schnabel 名下的同型替代
（`a8fde530`《Artur Schnabel Plays Bach & Brahms》）CAA 也 404，Apple 七店面無確切條目。

**裁定：依 §4「抓不到可靠封面就停止該筆」剔除，不列 §1 補遺候選**——
它釘得住 MB（`rgMbid` 完好），缺的是封面不是身分，§1 解決不了這個問題。
Schnabel 本批仍收 2 張，Joseph Szigeti（池中 1 張）本批因此掛零，記進未收清單。

---

## 6. 「同一首曲子在池中已經有別人的版本」不是不收的理由——但盤名要能分辨

本批出現三組同曲不同人：

| 曲目 | 池中既有 | 本批新收 |
|---|---|---|
| 德弗札克大提琴協奏曲 | Rostropovich（Karajan 1969） | **Casals（Szell 1937）＋ du Pré（Barenboim 1970）** |
| 貝多芬《大公》三重奏 | Rubinstein / Heifetz / Feuermann（1941） | **Cortot / Thibaud / Casals（1926–28）** |
| 貝里尼《夢遊女》 | Maria Callas（1957） | **Joan Sutherland（1962）** |
| 德布西／拉威爾弦樂四重奏 | 無 | **Budapest SQ（1953）＋ Quartetto Italiano（1965）** |

**裁定：全部收。** 古典的一張卡＝**作品 × 演奏者 × 錄音版本**（§0.7 明文），
換演奏者就是換一張碟，不是重複。**但盤名必須能分辨**，做法有三種，本批都用上了：

1. **加錄音年括號**：《Bellini: La sonnambula (1962)》對池中的《Bellini: La sonnambula (1957)》、
   《R. Strauss: Der Rosenkavalier (1954)》對池中 Karajan 的《R. Strauss: Der Rosenkavalier (1956)》。
2. **把同碟的第二首曲目寫進盤名**：Casals 那張帶《Bruch: Kol Nidrei》、du Pré 那張帶《Waldesruhe》，
   兩張與池中 Rostropovich 那張三者字串互不包含。
3. **靠曲序**：Budapest 那張作《Ravel: ... / Debussy: ...》、Quartetto Italiano 那張作
   《Debussy: ... / Ravel: ...》，正好是兩張原盤各自印的曲序（第 6／50 條）。

---

## 7. 「刻意不釘」在這批爆量——同一份錄音的不同再發就是最強的假陽性

派工預告「同一份錄音的不同再發彼此就是對照組，這批會很多」。實況比預告更兇：
**40 張的 `mbNote` 合計點名了 180 個以上的「刻意不釘」MBID**，密度是歷來各批最高。
三種形狀：

1. **與池中既有卡是同一份錄音的不同再發**（最多）。例：Milstein 名下有 **7 筆**巴哈無伴奏
   （`1fbda302`／`18cc5bef`／`cea7ea4e`／`a691e196`／`fe4ed52c` 等），全部指向池中既有的
   《Bach: Sonatas & Partitas for Solo Violin》(1975)；Casals 名下有 **7 筆**巴哈大提琴組曲，
   全部指向池中的《Bach: Cello Suites (1936-39)》。
2. **同一藝人同一曲目的「二十年後重錄」**——**這批最危險的一種**。
   Sutherland《La sonnambula》1962 年翡冷翠版（本批收）與 1982 年 Pavarotti／National Philharmonic 版
   （`b66136ab`，Apple `1452561108`）**歌者與指揮完全相同、樂團與其餘班底完全不同**；
   Alban Berg Quartett 的貝多芬晚期四重奏 1982–83 錄音室版（本批收）與 1989 年維也納現場版
   （`f6e7b652`，Apple `726264114`）同理。
   **靠掛名與盤名都分不出來，只能核班底或核 Live 標記。** 兩張都已在 `risk` 明寫。
3. **廠牌大盒**（`The Complete RCA Collection`、`Complete Decca Recordings`、
   `The Complete Warner Recordings`、`Complete Recordings on Deutsche Grammophon`）——
   一收就會同時涵蓋池中既有的三五張卡，全部列為不釘。

依第 162 條，**「刻意不釘」的標記一律寫在 MBID 前面、一個標記帶多個 MBID 時中間不插入
正面的「釘住」字樣**，全批 40 張都照這個寫法。

---

## 8. 掛名的西里爾與轉寫：Mravinsky 與 Gilels 都要沿用池中既有寫法，即使池中自己分裂

第 49 條要求非拉丁文字的卡要同時比對原文與羅馬拼音。本批兩位：

- **Mravinsky**：MB 藝人實體名是「Евгений Александрович Мравинский」（`1b19de02`）。
  實掃結果——**池中兩張卡用了兩種拉丁拼法**：`Evgeny Mravinsky`《Tchaikovsky: Symphonies 4-6》(1961)
  與 `Yevgeny Mravinsky`《Shostakovich: Symphony no. 8》(1982)。**這是既有的掛名分裂。**
  更麻煩的是 MB 自己也不一致：本批釘的 `9f9e2b3b` 其 artist-credit 用第三種 `Yevgeni Mravinsky`。
  **裁定：本批兩張都用 `Yevgeny Mravinsky`**（池中較新那張的寫法，也是英語圈最通行的一種），
  `Evgeny`／`Evgeni`／`Eugene`／西里爾原文全部進 `queryAlias`。
  **不合併池中那兩張**——那是 `seed_cards.json` 的事，雲端不碰，記進本機待辦
  （`audits/pool-artist-name-splits.md` 該加一筆）。
- **Gilels**：MB 主名是「Эмиль Гилельс」（`88b4ad33`），DG 法語系列用 `Emil Guilels`（MB 上就有
  《Edition Emil Guilels 3／4》兩筆）。池中三張一致用 `Emil Gilels`，沿用；其餘寫法進 `queryAlias`。
  西里爾原文在池中 0 筆。
- **Casals**：MB 主名是加泰隆尼亞文 `Pau Casals`，但本批釘的 release-group 其 artist-credit
  用 `Pablo Casals`，池中兩張也用 `Pablo Casals`。**沿用池中寫法**，`Pau Casals` 進 `queryAlias`。
- **Fischer-Dieskau**：MB 用 **U+2010 連字號**「Dietrich Fischer‐Dieskau」，池中用 ASCII 連字號。
  兩者在任何字串比對下都不相等（第 49 條的同型問題）。**卡片用 ASCII**，MB 原寫法記進 `mbNote`。

---

## 9. Toscanini 收 2 張而不是 3 張，Fischer-Dieskau 只收 1 張——不是名單問題，是資料面

派工的骨幹名單裡兩位「最該補深」的，實際能收的比預期少：

- **Toscanini**（池中 1 張）：名下 197 個 RG，但歌劇整編 CAA 全 404（見第 4 條），
  貝多芬那一線又會撞到池中既有的 Eroica。最後只收 Respighi 羅馬三部曲與柴可夫斯基《曼弗雷德》兩張。
- **Fischer-Dieskau**（池中 3 張＋1 張合掛）：名下 **332 個 RG，本批最大的目錄**，
  但他最核心的三大聯篇歌集（《冬之旅》《美麗的磨坊少女》《天鵝之歌》）池中全部已有，
  馬勒《亡兒之歌》也已有；剩下能收的是舒伯特歌曲全集第一輯（`f5a517ee`）一張，
  外加與 Schwarzkopf 合掛的《少年魔號》。

**裁定：照實收，不硬湊。** 「池中只有 1 張」不等於「還能補五張」——
名下 RG 多寡與**可收的 RG 多寡**是兩件事，中間隔著封面鏈、撞卡與分卷三道濾網。

---

## 10. Wolf《Spanisches Liederbuch》迴避——與池中 Schwarzkopf《Wolf: Lieder》(1967) 有同碟疑慮

`b7ddec8a`《Spanisches Liederbuch》(1967) 是 Schwarzkopf ＋ Fischer-Dieskau ＋ Gerald Moore 的
Wolf 歌曲集，CAA 200，本來是本批很好的併掛候選（可同時替兩位補深）。

**但池中已有 `Elisabeth Schwarzkopf`《Wolf: Lieder》(1967)——年份相同、作曲家相同、
盤名是上位詞。** 兩者很可能是同一份錄音的兩種命名，MB 這邊查不到足以否證的資訊。

**裁定：迴避，改收《Des Knaben Wunderhorn》(1968)。** 判準是第 2 條原則的反面用法——
**盤名被縮短過的既有卡，會把更長的新卡包進去**（第 162 條的鏡像）；
在無法證明是兩張碟時，寧可換一張沒有疑慮的。已在該卡 `mbNote` 明寫「刻意不釘」與理由。
